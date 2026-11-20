import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { pgAll, pgGet } from '#lib/server/db';
import { getOrCreateFingerprint } from '#lib/server/auth';

export const GET: RequestHandler = async (event) => {
	const userId = event.locals.user?.id ?? null;
	const fingerprint = getOrCreateFingerprint(event);

	const whereClause = userId ? 'user_id = $1' : 'user_id IS NULL AND fingerprint = $1';
	const whereParam = userId ?? fingerprint;

	const [allBadges, earnedBadges, pointsRow, history, leaderboard, attemptCount] =
		await Promise.all([
			pgAll<any>('SELECT * FROM badge_definitions ORDER BY id'),
			pgAll<{ badge_id: number }>(`SELECT badge_id FROM user_badges WHERE ${whereClause}`, [
				whereParam
			]),
			pgGet<{ total: number }>(
				`SELECT COALESCE(SUM(points), 0)::int as total FROM user_points WHERE ${whereClause}`,
				[whereParam]
			),
			pgAll<any>(
				`SELECT * FROM user_points WHERE ${whereClause} ORDER BY earned_at DESC LIMIT 20`,
				[whereParam]
			),
			// Leaderboard joined with registered users (excludes legacy fake seed rows)
			pgAll<any>(
				`
				SELECT
					COALESCE(up.user_id::text, MAX(up.fingerprint)) as player_key,
					MAX(up.fingerprint) as fingerprint,
					CASE
						WHEN up.user_id IS NOT NULL THEN COALESCE(MAX(u.name), 'مستخدم')
						ELSE 'زائر #' || substr(replace(MAX(up.fingerprint), 'fp_', ''), 1, 6)
					END as display_name,
					COALESCE(SUM(up.points), 0)::int as total_points,
					COUNT(DISTINCT up.quiz_id)::int as quizzes
				FROM user_points up
				LEFT JOIN users u ON up.user_id = u.id
				WHERE up.fingerprint != 'example-user-fp'
				GROUP BY COALESCE('u:' || up.user_id::text, 'f:' || up.fingerprint), up.user_id
				ORDER BY total_points DESC
				LIMIT 10
			`
			),
			pgGet<{ c: number }>(`SELECT COUNT(*)::int as c FROM quiz_attempts WHERE ${whereClause}`, [
				whereParam
			])
		]);

	const earnedSet = new Set(earnedBadges.map((b) => b.badge_id));

	return json({
		badges: allBadges.map((b: any) => ({
			...b,
			earned: earnedSet.has(b.id),
			condition: JSON.parse(b.condition || '{}')
		})),
		totalPoints: pointsRow?.total || 0,
		history,
		leaderboard,
		quizCount: attemptCount?.c || 0
	});
};
