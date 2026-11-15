import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { usersSqlite } from '#lib/server/db';
import { getOrCreateFingerprint } from '#lib/server/auth';

export const GET: RequestHandler = async (event) => {
	const userId = event.locals.user?.id ?? null;
	const fingerprint = getOrCreateFingerprint(event);

	const whereClause = userId ? 'user_id = ?' : 'user_id IS NULL AND fingerprint = ?';
	const whereParam = userId ?? fingerprint;

	const allBadges = usersSqlite.query('SELECT * FROM badge_definitions ORDER BY id').all();

	const earnedBadges = usersSqlite
		.query(`SELECT badge_id FROM user_badges WHERE ${whereClause}`)
		.all(whereParam) as { badge_id: number }[];
	const earnedSet = new Set(earnedBadges.map((b) => b.badge_id));

	const pointsRow = usersSqlite
		.query(`SELECT COALESCE(SUM(points), 0) as total FROM user_points WHERE ${whereClause}`)
		.get(whereParam) as { total: number };

	const history = usersSqlite
		.query(`SELECT * FROM user_points WHERE ${whereClause} ORDER BY earned_at DESC LIMIT 20`)
		.all(whereParam);

	// Leaderboard joined with registered users (excludes legacy fake seed rows)
	const leaderboard = usersSqlite
		.query(
			`
		SELECT
			COALESCE(CAST(up.user_id AS TEXT), up.fingerprint) as player_key,
			up.fingerprint as fingerprint,
			CASE
				WHEN u.id IS NOT NULL THEN u.name
				ELSE 'زائر #' || substr(replace(up.fingerprint, 'fp_', ''), 1, 6)
			END as display_name,
			SUM(up.points) as total_points,
			COUNT(DISTINCT up.quiz_id) as quizzes
		FROM user_points up
		LEFT JOIN users u ON up.user_id = u.id
		WHERE up.fingerprint != 'example-user-fp'
		GROUP BY COALESCE('u:' || up.user_id, 'f:' || up.fingerprint)
		ORDER BY total_points DESC
		LIMIT 10
	`
		)
		.all();

	const attemptCount = usersSqlite
		.query(`SELECT COUNT(*) as c FROM quiz_attempts WHERE ${whereClause}`)
		.get(whereParam) as { c: number };

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
