import { createHash } from 'node:crypto';
import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';
import { contentSqlite, pgAll, pgGet, pgRun } from '#lib/server/db';
import { isEffectivePremium } from '#lib/server/auth';

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store' };

interface AuthUserSummary {
	id: number;
	username: string | null;
	email: string;
	name: string;
	role: string;
	avatar: string | null;
	yearId: string | null;
	streamId: string | null;
	wilaya: string | null;
	subscriptionTier: 'free' | 'premium';
	subscriptionExpiresAt: string | null;
	streakDays: number;
	lastActiveDate: string | null;
	createdAt: string;
}

async function resolveAuthenticatedUser(event: RequestEvent): Promise<AuthUserSummary | null> {
	const authHeader = event.request.headers.get('authorization');
	if (authHeader) {
		const match = authHeader.match(/^Bearer\s+(.+)$/i);
		const rawToken = match?.[1]?.trim();
		if (rawToken && rawToken.length >= 16) {
			const tokenHash = createHash('sha256').update(rawToken).digest('hex');
			const row = await pgGet<{
				token_id: number;
				expires_at: string;
				id: number;
				username: string | null;
				email: string;
				name: string;
				role: string;
				avatar: string | null;
				is_active: boolean;
				year_id: string | null;
				stream_id: string | null;
				wilaya: string | null;
				subscription_tier: 'free' | 'premium';
				subscription_expires_at: string | null;
				streak_days: number;
				last_active_date: string | null;
				created_at: string;
			}>(
				`SELECT
					t.id AS token_id,
					t.expires_at,
					u.id,
					u.username,
					u.email,
					u.name,
					u.role,
					u.avatar,
					u.is_active,
					u.year_id,
					u.stream_id,
					u.wilaya,
					u.subscription_tier,
					u.subscription_expires_at,
					u.streak_days,
					u.last_active_date,
					u.created_at
				FROM api_tokens t
				JOIN users u ON u.id = t.user_id
				WHERE t.token_hash = $1
				LIMIT 1`,
				[tokenHash]
			);

			if (row) {
				const exp = Date.parse(row.expires_at);
				if (Number.isFinite(exp) && Date.now() < exp && row.is_active) {
					await pgRun(
						`UPDATE api_tokens
						 SET last_used_at = to_char(NOW() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS')
						 WHERE id = $1`,
						[row.token_id]
					).catch(() => {});

					return {
						id: row.id,
						username: row.username,
						email: row.email,
						name: row.name,
						role: row.role,
						avatar: row.avatar,
						yearId: row.year_id,
						streamId: row.stream_id,
						wilaya: row.wilaya,
						subscriptionTier: row.subscription_tier,
						subscriptionExpiresAt: row.subscription_expires_at,
						streakDays: row.streak_days,
						lastActiveDate: row.last_active_date,
						createdAt: row.created_at
					};
				}
			}
		}
	}

	if (event.locals.user) {
		const u = event.locals.user;
		return {
			id: u.id,
			username: u.username,
			email: u.email,
			name: u.name,
			role: u.role,
			avatar: u.avatar,
			yearId: u.yearId,
			streamId: u.streamId,
			wilaya: u.wilaya,
			subscriptionTier: u.subscriptionTier,
			subscriptionExpiresAt: u.subscriptionExpiresAt,
			streakDays: u.streakDays,
			lastActiveDate: u.lastActiveDate,
			createdAt: u.createdAt
		};
	}

	return null;
}

export const GET: RequestHandler = async (event) => {
	const user = await resolveAuthenticatedUser(event);
	if (!user) {
		return json(
			{ ok: false, error: 'يجب تسجيل الدخول لمزامنة بيانات التلميذ' },
			{ status: 401, headers: NO_STORE_HEADERS }
		);
	}

	const [xpRow, badgeRows, mistakesRow, attemptRows, videoRows] = await Promise.all([
		pgGet<{ total: number }>(
			'SELECT COALESCE(SUM(points), 0)::int AS total FROM user_points WHERE user_id = $1',
			[user.id]
		),
		pgAll<{
			id: number;
			slug: string;
			name: string;
			name_ar: string;
			icon: string;
			color: string | null;
			points: number | null;
			earned_at: string;
		}>(
			`SELECT
				bd.id,
				bd.slug,
				bd.name,
				bd.name_ar,
				bd.icon,
				bd.color,
				bd.points,
				ub.earned_at
			FROM user_badges ub
			JOIN badge_definitions bd ON bd.id = ub.badge_id
			WHERE ub.user_id = $1
			ORDER BY ub.earned_at DESC`,
			[user.id]
		),
		pgGet<{ c: number }>(
			'SELECT COUNT(*)::int AS c FROM user_mistakes WHERE user_id = $1 AND resolved = FALSE',
			[user.id]
		),
		pgAll<{
			id: number;
			quiz_id: number;
			score: number | null;
			total_points: number | null;
			percentage: number | null;
			time_taken: number | null;
			completed_at: string | null;
			created_at: string;
		}>(
			`SELECT
				id,
				quiz_id,
				score,
				total_points,
				percentage,
				time_taken,
				completed_at,
				created_at
			FROM quiz_attempts
			WHERE user_id = $1
			ORDER BY id DESC
			LIMIT 15`,
			[user.id]
		),
		pgAll<{
			video_id: number;
			last_position_sec: number;
			completed: boolean;
			answered_cues_json: string;
			updated_at: string;
		}>(
			`SELECT
				video_id,
				last_position_sec,
				completed,
				answered_cues_json,
				updated_at
			FROM video_watch_progress
			WHERE user_id = $1
			ORDER BY updated_at DESC
			LIMIT 50`,
			[user.id]
		)
	]);

	// Enrich attempts & video progress with titles from content.db
	const quizMetaMap = new Map<number, { title: string; titleAr: string | null; slug: string }>();
	if (attemptRows.length > 0) {
		const quizIds = [...new Set(attemptRows.map((a) => a.quiz_id))];
		const ph = quizIds.map(() => '?').join(',');
		const qRows = contentSqlite
			.query(`SELECT id, title, title_ar AS titleAr, slug FROM quizzes WHERE id IN (${ph})`)
			.all(...quizIds) as Array<{ id: number; title: string; titleAr: string | null; slug: string }>;
		for (const q of qRows) quizMetaMap.set(q.id, q);
	}

	const videoMetaMap = new Map<
		number,
		{ slug: string; title: string; titleAr: string; durationSec: number }
	>();
	if (videoRows.length > 0) {
		const vidIds = [...new Set(videoRows.map((v) => v.video_id))];
		const ph = vidIds.map(() => '?').join(',');
		const vRows = contentSqlite
			.query(
				`SELECT id, slug, title, title_ar AS titleAr, duration_sec AS durationSec FROM videos WHERE id IN (${ph})`
			)
			.all(...vidIds) as Array<{
			id: number;
			slug: string;
			title: string;
			titleAr: string;
			durationSec: number;
		}>;
		for (const v of vRows) videoMetaMap.set(v.id, v);
	}

	const badges = badgeRows.map((b) => ({
		id: b.id,
		slug: b.slug,
		name: b.name,
		nameAr: b.name_ar,
		icon: b.icon,
		color: b.color || '#3b82f6',
		points: b.points ?? 0,
		earnedAt: b.earned_at
	}));

	const recentAttempts = attemptRows.map((a) => {
		const meta = quizMetaMap.get(a.quiz_id);
		return {
			id: a.id,
			quizId: a.quiz_id,
			quizTitle: meta?.titleAr || meta?.title || null,
			quizSlug: meta?.slug || null,
			score: a.score ?? 0,
			totalPoints: a.total_points ?? 0,
			percentage: a.percentage ?? 0,
			timeTaken: a.time_taken ?? 0,
			completedAt: a.completed_at,
			createdAt: a.created_at
		};
	});

	const videoProgress = videoRows.map((v) => {
		const meta = videoMetaMap.get(v.video_id);
		let answeredCues: number[] = [];
		try {
			const parsed = JSON.parse(v.answered_cues_json || '[]');
			if (Array.isArray(parsed)) answeredCues = parsed;
		} catch {
			answeredCues = [];
		}
		return {
			videoId: v.video_id,
			slug: meta?.slug || null,
			title: meta?.titleAr || meta?.title || null,
			durationSec: meta?.durationSec ?? 0,
			lastPositionSec: v.last_position_sec,
			completed: Boolean(v.completed),
			answeredCues,
			updatedAt: v.updated_at
		};
	});

	return json(
		{
			ok: true,
			data: {
				user: {
					...user,
					isPremium: isEffectivePremium(user as any)
				},
				totalXp: xpRow?.total ?? 0,
				badges,
				unresolvedMistakesCount: mistakesRow?.c ?? 0,
				recentAttempts,
				videoProgress,
				syncedAt: new Date().toISOString()
			}
		},
		{ headers: NO_STORE_HEADERS }
	);
};
