import { contentSqlite, pgAll, pgGet, pgRun, pgTx } from './db';

const PG_NOW_EXPR = "to_char(NOW() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS')";

export interface EarnedBadgeSummary {
	slug: string;
	name_ar: string;
	icon: string;
	color: string;
	points: number;
}

export interface GamificationOutcome {
	xpEarned: number;
	newBadges: EarnedBadgeSummary[];
	streakDays: number;
	totalPoints: number;
}

/** Award XP, update daily streak, track mistakes, and evaluate badges after a quiz submission. */
export async function awardQuizGamification(params: {
	userId: number | null;
	fingerprint: string;
	quizId: number;
	percentage: number;
	timeTaken: number;
	gradedDetails: { questionId: number; type: string; isCorrect: boolean }[];
}): Promise<GamificationOutcome> {
	const { userId, fingerprint, quizId, percentage, timeTaken, gradedDetails } = params;
	let xpEarned = 0;
	const newBadges: EarnedBadgeSummary[] = [];
	let streakDays = 0;

	await pgTx(async (tx) => {
		// 1. Base completion XP + performance bonus
		const completionXp = 10 + Math.round(Math.max(0, Math.min(100, percentage)) / 10);
		await pgRun(
			`INSERT INTO user_points (user_id, fingerprint, points, reason, quiz_id, earned_at)
			 VALUES ($1, $2, $3, 'quiz_complete', $4, ${PG_NOW_EXPR})`,
			[userId, fingerprint, completionXp, quizId],
			tx
		);
		xpEarned += completionXp;

		if (percentage >= 100) {
			await pgRun(
				`INSERT INTO user_points (user_id, fingerprint, points, reason, quiz_id, earned_at)
				 VALUES ($1, $2, 15, 'perfect_score', $3, ${PG_NOW_EXPR})`,
				[userId, fingerprint, quizId],
				tx
			);
			xpEarned += 15;
		}

		// 2. Update daily study streak for signed-in users
		if (userId) {
			const userRow = await pgGet<{ streak_days: number; last_active_date: string | null }>(
				'SELECT streak_days, last_active_date FROM users WHERE id = $1 FOR UPDATE',
				[userId],
				tx
			);

			const today = new Date().toISOString().slice(0, 10);
			const yesterday = new Date(Date.now() - 86400_000).toISOString().slice(0, 10);

			if (userRow) {
				if (userRow.last_active_date === today) {
					streakDays = userRow.streak_days || 1;
				} else if (userRow.last_active_date === yesterday) {
					streakDays = (userRow.streak_days || 0) + 1;
				} else {
					streakDays = 1;
				}
				await pgRun(
					'UPDATE users SET streak_days = $1, last_active_date = $2 WHERE id = $3',
					[streakDays, today, userId],
					tx
				);
			}
		}

		// 3. Mistake Notebook tracking (record wrongs, auto-resolve rights)
		for (const item of gradedDetails) {
			if (!item.questionId) continue;
			const existing = userId
				? await pgGet<{ id: number; wrong_count: number }>(
						'SELECT id, wrong_count FROM user_mistakes WHERE user_id = $1 AND question_id = $2 LIMIT 1',
						[userId, item.questionId],
						tx
					)
				: await pgGet<{ id: number; wrong_count: number }>(
						'SELECT id, wrong_count FROM user_mistakes WHERE user_id IS NULL AND fingerprint = $1 AND question_id = $2 LIMIT 1',
						[fingerprint, item.questionId],
						tx
					);

			if (!item.isCorrect) {
				if (existing) {
					await pgRun(
						`UPDATE user_mistakes
						 SET wrong_count = wrong_count + 1, resolved = FALSE, quiz_id = $1, last_attempt_at = ${PG_NOW_EXPR}
						 WHERE id = $2`,
						[quizId, existing.id],
						tx
					);
				} else {
					await pgRun(
						`INSERT INTO user_mistakes (user_id, fingerprint, question_id, quiz_id, wrong_count, last_attempt_at, resolved)
						 VALUES ($1, $2, $3, $4, 1, ${PG_NOW_EXPR}, FALSE)`,
						[userId, fingerprint, item.questionId, quizId],
						tx
					);
				}
			} else if (existing) {
				await pgRun(
					`UPDATE user_mistakes SET resolved = TRUE, last_attempt_at = ${PG_NOW_EXPR} WHERE id = $1`,
					[existing.id],
					tx
				);
			}
		}

		// 4. Evaluate badges
		const whereCol = userId ? 'user_id = $1' : 'user_id IS NULL AND fingerprint = $1';
		const whereArg = userId ?? fingerprint;

		const allBadges = await pgAll<any>('SELECT * FROM badge_definitions ORDER BY id', [], tx);
		const earnedRows = await pgAll<{ badge_id: number }>(
			`SELECT badge_id FROM user_badges WHERE ${whereCol}`,
			[whereArg],
			tx
		);
		const earnedSet = new Set(earnedRows.map((r) => r.badge_id));

		const attemptCountRow = await pgGet<{ c: number }>(
			`SELECT COUNT(*)::int as c FROM quiz_attempts WHERE ${whereCol}`,
			[whereArg],
			tx
		);
		const totalAttempts = attemptCountRow?.c || 0;

		const pointsSumRow = await pgGet<{ total: number }>(
			`SELECT COALESCE(SUM(points), 0)::int as total FROM user_points WHERE ${whereCol}`,
			[whereArg],
			tx
		);
		const currentPoints = pointsSumRow?.total || 0;

		const recentAttempts = await pgAll<{ percentage: number }>(
			`SELECT percentage FROM quiz_attempts WHERE ${whereCol} ORDER BY id DESC LIMIT 10`,
			[whereArg],
			tx
		);

		const answeredQRows = await pgAll<{ question_id: number }>(
			`SELECT DISTINCT aa.question_id
			 FROM attempt_answers aa
			 JOIN quiz_attempts qa ON aa.attempt_id = qa.id
			 WHERE qa.${whereCol}`,
			[whereArg],
			tx
		);

		let distinctTypeCount = 0;
		if (answeredQRows.length > 0) {
			const qIds = answeredQRows.map((r) => r.question_id);
			const ph = qIds.map(() => '?').join(',');
			const typeRow = contentSqlite
				.query(`SELECT COUNT(DISTINCT type) as c FROM questions WHERE id IN (${ph})`)
				.get(...qIds) as { c: number };
			distinctTypeCount = typeRow?.c || 0;
		}

		for (const badge of allBadges) {
			if (earnedSet.has(badge.id)) continue;
			let cond: { type?: string; threshold?: number } = {};
			try {
				cond = JSON.parse(badge.condition || '{}');
			} catch {
				continue;
			}
			const threshold = Number(cond.threshold ?? 1);
			let qualified = false;

			switch (cond.type) {
				case 'quiz_count':
					qualified = totalAttempts >= threshold;
					break;
				case 'perfect_score':
					qualified = percentage >= threshold;
					break;
				case 'time_under':
					qualified = timeTaken > 0 && timeTaken <= threshold && percentage >= 60;
					break;
				case 'streak':
					qualified =
						streakDays >= threshold ||
						(recentAttempts.length >= threshold &&
							recentAttempts.slice(0, threshold).every((a) => Number(a.percentage) >= 80));
					break;
				case 'question_types':
					qualified = distinctTypeCount >= threshold;
					break;
				case 'total_points':
					qualified = currentPoints >= threshold;
					break;
			}

			if (qualified) {
				await pgRun(
					`INSERT INTO user_badges (user_id, fingerprint, badge_id, earned_at)
					 VALUES ($1, $2, $3, ${PG_NOW_EXPR})`,
					[userId, fingerprint, badge.id],
					tx
				);

				const badgePoints = Number(badge.points || 0);
				if (badgePoints > 0) {
					await pgRun(
						`INSERT INTO user_points (user_id, fingerprint, points, reason, quiz_id, earned_at)
						 VALUES ($1, $2, $3, 'badge_earned', $4, ${PG_NOW_EXPR})`,
						[userId, fingerprint, badgePoints, quizId],
						tx
					);
					xpEarned += badgePoints;
				}
				newBadges.push({
					slug: badge.slug,
					name_ar: badge.name_ar,
					icon: badge.icon,
					color: badge.color || '#f59e0b',
					points: badgePoints
				});
			}
		}
	});

	const totalRow = await pgGet<{ total: number }>(
		userId
			? 'SELECT COALESCE(SUM(points), 0)::int as total FROM user_points WHERE user_id = $1'
			: 'SELECT COALESCE(SUM(points), 0)::int as total FROM user_points WHERE user_id IS NULL AND fingerprint = $1',
		[userId ?? fingerprint]
	);

	return {
		xpEarned,
		newBadges,
		streakDays,
		totalPoints: totalRow?.total || 0
	};
}

/** Read aggregated gamification stats for a signed-in user or anonymous fingerprint. */
export async function getUserGamificationStats(params: {
	userId: number | null;
	fingerprint: string;
}): Promise<{ totalPoints: number; quizCount: number; earnedBadgeIds: number[] }> {
	const whereCol = params.userId ? 'user_id = $1' : 'user_id IS NULL AND fingerprint = $1';
	const whereArg = params.userId ?? params.fingerprint;

	const [pointsRow, attemptsRow, badgesRows] = await Promise.all([
		pgGet<{ total: number }>(
			`SELECT COALESCE(SUM(points), 0)::int as total FROM user_points WHERE ${whereCol}`,
			[whereArg]
		),
		pgGet<{ c: number }>(
			`SELECT COUNT(*)::int as c FROM quiz_attempts WHERE ${whereCol}`,
			[whereArg]
		),
		pgAll<{ badge_id: number }>(
			`SELECT badge_id FROM user_badges WHERE ${whereCol}`,
			[whereArg]
		)
	]);

	return {
		totalPoints: pointsRow?.total || 0,
		quizCount: attemptsRow?.c || 0,
		earnedBadgeIds: badgesRows.map((r) => r.badge_id)
	};
}

/** Merge anonymous browser fingerprint history (`sujet_fp`) into a newly signed-in user account. */
export async function migrateAnonymousProgressToUser(
	fingerprint: string | null | undefined,
	userId: number
): Promise<void> {
	if (!fingerprint) return;

	await pgTx(async (tx) => {
		await pgRun(
			'UPDATE quiz_attempts SET user_id = $1 WHERE user_id IS NULL AND fingerprint = $2',
			[userId, fingerprint],
			tx
		);

		await pgRun(
			'UPDATE user_points SET user_id = $1 WHERE user_id IS NULL AND fingerprint = $2',
			[userId, fingerprint],
			tx
		);

		await pgRun(
			'UPDATE ratings SET user_id = $1 WHERE user_id IS NULL AND fingerprint = $2',
			[userId, fingerprint],
			tx
		);

		// Deduplicate badges before attaching user_id
		const existingBadges = await pgAll<{ badge_id: number }>(
			'SELECT badge_id FROM user_badges WHERE user_id = $1',
			[userId],
			tx
		);
		const ownedSet = new Set(existingBadges.map((b) => b.badge_id));

		const anonBadges = await pgAll<{ id: number; badge_id: number }>(
			'SELECT id, badge_id FROM user_badges WHERE user_id IS NULL AND fingerprint = $1',
			[fingerprint],
			tx
		);
		for (const ab of anonBadges) {
			if (ownedSet.has(ab.badge_id)) {
				await pgRun('DELETE FROM user_badges WHERE id = $1', [ab.id], tx);
			} else {
				await pgRun('UPDATE user_badges SET user_id = $1 WHERE id = $2', [userId, ab.id], tx);
				ownedSet.add(ab.badge_id);
			}
		}

		// Merge mistake counts if question already exists on user
		const anonMistakes = await pgAll<{
			id: number;
			question_id: number;
			wrong_count: number;
			quiz_id: number | null;
			resolved: boolean;
		}>(
			'SELECT id, question_id, wrong_count, quiz_id, resolved FROM user_mistakes WHERE user_id IS NULL AND fingerprint = $1',
			[fingerprint],
			tx
		);
		for (const am of anonMistakes) {
			const existing = await pgGet<{ id: number }>(
				'SELECT id FROM user_mistakes WHERE user_id = $1 AND question_id = $2 LIMIT 1',
				[userId, am.question_id],
				tx
			);
			if (existing) {
				await pgRun(
					`UPDATE user_mistakes
					 SET wrong_count = wrong_count + $1,
					     resolved = CASE WHEN $2 = FALSE THEN FALSE ELSE resolved END
					 WHERE id = $3`,
					[am.wrong_count, Boolean(am.resolved), existing.id],
					tx
				);
				await pgRun('DELETE FROM user_mistakes WHERE id = $1', [am.id], tx);
			} else {
				await pgRun('UPDATE user_mistakes SET user_id = $1 WHERE id = $2', [userId, am.id], tx);
			}
		}
	});
}

export const mergeAnonymousGamification = migrateAnonymousProgressToUser;
