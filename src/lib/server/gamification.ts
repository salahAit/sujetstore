import { contentSqlite, usersSqlite } from './db';

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
export function awardQuizGamification(params: {
	userId: number | null;
	fingerprint: string;
	quizId: number;
	percentage: number;
	timeTaken: number;
	gradedDetails: { questionId: number; type: string; isCorrect: boolean }[];
}): GamificationOutcome {
	const { userId, fingerprint, quizId, percentage, timeTaken, gradedDetails } = params;
	let xpEarned = 0;
	const newBadges: EarnedBadgeSummary[] = [];
	let streakDays = 0;

	const tx = usersSqlite.transaction(() => {
		// 1. Base completion XP + performance bonus
		const completionXp = 10 + Math.round(Math.max(0, Math.min(100, percentage)) / 10);
		usersSqlite
			.query(
				"INSERT INTO user_points (user_id, fingerprint, points, reason, quiz_id, earned_at) VALUES (?, ?, ?, 'quiz_complete', ?, datetime('now'))"
			)
			.run(userId, fingerprint, completionXp, quizId);
		xpEarned += completionXp;

		if (percentage >= 100) {
			usersSqlite
				.query(
					"INSERT INTO user_points (user_id, fingerprint, points, reason, quiz_id, earned_at) VALUES (?, ?, 15, 'perfect_score', ?, datetime('now'))"
				)
				.run(userId, fingerprint, quizId);
			xpEarned += 15;
		}

		// 2. Update daily study streak for signed-in users
		if (userId) {
			const userRow = usersSqlite
				.query('SELECT streak_days, last_active_date FROM users WHERE id = ?')
				.get(userId) as { streak_days: number; last_active_date: string | null } | null;

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
				usersSqlite
					.query('UPDATE users SET streak_days = ?, last_active_date = ? WHERE id = ?')
					.run(streakDays, today, userId);
			}
		}

		// 3. Mistake Notebook tracking (record wrongs, auto-resolve rights)
		for (const item of gradedDetails) {
			if (!item.questionId) continue;
			const existing = (
				userId
					? usersSqlite
							.query('SELECT id, wrong_count FROM user_mistakes WHERE user_id = ? AND question_id = ? LIMIT 1')
							.get(userId, item.questionId)
					: usersSqlite
							.query(
								'SELECT id, wrong_count FROM user_mistakes WHERE user_id IS NULL AND fingerprint = ? AND question_id = ? LIMIT 1'
							)
							.get(fingerprint, item.questionId)
			) as { id: number; wrong_count: number } | null;

			if (!item.isCorrect) {
				if (existing) {
					usersSqlite
						.query(
							"UPDATE user_mistakes SET wrong_count = wrong_count + 1, resolved = 0, quiz_id = ?, last_attempt_at = datetime('now') WHERE id = ?"
						)
						.run(quizId, existing.id);
				} else {
					usersSqlite
						.query(
							"INSERT INTO user_mistakes (user_id, fingerprint, question_id, quiz_id, wrong_count, last_attempt_at, resolved) VALUES (?, ?, ?, ?, 1, datetime('now'), 0)"
						)
						.run(userId, fingerprint, item.questionId, quizId);
				}
			} else if (existing) {
				usersSqlite
					.query("UPDATE user_mistakes SET resolved = 1, last_attempt_at = datetime('now') WHERE id = ?")
					.run(existing.id);
			}
		}

		// 4. Evaluate badges
		const whereCol = userId ? 'user_id = ?' : 'user_id IS NULL AND fingerprint = ?';
		const whereArg = userId ?? fingerprint;

		const allBadges = usersSqlite.query('SELECT * FROM badge_definitions ORDER BY id').all() as any[];
		const earnedRows = usersSqlite
			.query(`SELECT badge_id FROM user_badges WHERE ${whereCol}`)
			.all(whereArg) as { badge_id: number }[];
		const earnedSet = new Set(earnedRows.map((r) => r.badge_id));

		const attemptCountRow = usersSqlite
			.query(`SELECT COUNT(*) as c FROM quiz_attempts WHERE ${whereCol}`)
			.get(whereArg) as { c: number };
		const totalAttempts = attemptCountRow?.c || 0;

		const pointsSumRow = usersSqlite
			.query(`SELECT COALESCE(SUM(points), 0) as total FROM user_points WHERE ${whereCol}`)
			.get(whereArg) as { total: number };
		const currentPoints = pointsSumRow?.total || 0;

		const recentAttempts = usersSqlite
			.query(`SELECT percentage FROM quiz_attempts WHERE ${whereCol} ORDER BY id DESC LIMIT 10`)
			.all(whereArg) as { percentage: number }[];

		const answeredQRows = usersSqlite
			.query(
				`SELECT DISTINCT aa.question_id FROM attempt_answers aa JOIN quiz_attempts qa ON aa.attempt_id = qa.id WHERE qa.${whereCol}`
			)
			.all(whereArg) as { question_id: number }[];

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
				usersSqlite
					.query(
						"INSERT INTO user_badges (user_id, fingerprint, badge_id, earned_at) VALUES (?, ?, ?, datetime('now'))"
					)
					.run(userId, fingerprint, badge.id);

				const badgePoints = Number(badge.points || 0);
				if (badgePoints > 0) {
					usersSqlite
						.query(
							"INSERT INTO user_points (user_id, fingerprint, points, reason, quiz_id, earned_at) VALUES (?, ?, ?, 'badge_earned', ?, datetime('now'))"
						)
						.run(userId, fingerprint, badgePoints, quizId);
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

	tx();

	const totalRow = usersSqlite
		.query(
			userId
				? 'SELECT COALESCE(SUM(points), 0) as total FROM user_points WHERE user_id = ?'
				: 'SELECT COALESCE(SUM(points), 0) as total FROM user_points WHERE user_id IS NULL AND fingerprint = ?'
		)
		.get(userId ?? fingerprint) as { total: number };

	return {
		xpEarned,
		newBadges,
		streakDays,
		totalPoints: totalRow?.total || 0
	};
}

/** Merge anonymous browser fingerprint history (`sujet_fp`) into a newly signed-in user account. */
export function migrateAnonymousProgressToUser(fingerprint: string | null | undefined, userId: number) {
	if (!fingerprint) return;

	const tx = usersSqlite.transaction(() => {
		usersSqlite
			.query('UPDATE quiz_attempts SET user_id = ? WHERE user_id IS NULL AND fingerprint = ?')
			.run(userId, fingerprint);

		usersSqlite
			.query('UPDATE user_points SET user_id = ? WHERE user_id IS NULL AND fingerprint = ?')
			.run(userId, fingerprint);

		usersSqlite
			.query('UPDATE ratings SET user_id = ? WHERE user_id IS NULL AND fingerprint = ?')
			.run(userId, fingerprint);

		// Deduplicate badges before attaching user_id
		const existingBadges = usersSqlite
			.query('SELECT badge_id FROM user_badges WHERE user_id = ?')
			.all(userId) as { badge_id: number }[];
		const ownedSet = new Set(existingBadges.map((b) => b.badge_id));

		const anonBadges = usersSqlite
			.query('SELECT id, badge_id FROM user_badges WHERE user_id IS NULL AND fingerprint = ?')
			.all(fingerprint) as { id: number; badge_id: number }[];
		for (const ab of anonBadges) {
			if (ownedSet.has(ab.badge_id)) {
				usersSqlite.query('DELETE FROM user_badges WHERE id = ?').run(ab.id);
			} else {
				usersSqlite.query('UPDATE user_badges SET user_id = ? WHERE id = ?').run(userId, ab.id);
				ownedSet.add(ab.badge_id);
			}
		}

		// Merge mistake counts if question already exists on user
		const anonMistakes = usersSqlite
			.query('SELECT id, question_id, wrong_count, quiz_id, resolved FROM user_mistakes WHERE user_id IS NULL AND fingerprint = ?')
			.all(fingerprint) as { id: number; question_id: number; wrong_count: number; quiz_id: number | null; resolved: number }[];
		for (const am of anonMistakes) {
			const existing = usersSqlite
				.query('SELECT id FROM user_mistakes WHERE user_id = ? AND question_id = ? LIMIT 1')
				.get(userId, am.question_id) as { id: number } | null;
			if (existing) {
				usersSqlite
					.query(
						'UPDATE user_mistakes SET wrong_count = wrong_count + ?, resolved = CASE WHEN ? = 0 THEN 0 ELSE resolved END WHERE id = ?'
					)
					.run(am.wrong_count, am.resolved, existing.id);
				usersSqlite.query('DELETE FROM user_mistakes WHERE id = ?').run(am.id);
			} else {
				usersSqlite.query('UPDATE user_mistakes SET user_id = ? WHERE id = ?').run(userId, am.id);
			}
		}
	});

	tx();
}
