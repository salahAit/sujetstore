import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { usersSqlite } from '#lib/server/db';
import { isEffectivePremium } from '#lib/server/auth';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	if (!locals.user) {
		throw redirect(302, `/auth/login?next=${encodeURIComponent(url.pathname + url.search)}`);
	}

	const user = locals.user;
	const pointsRow = usersSqlite
		.query('SELECT COALESCE(SUM(points), 0) as total FROM user_points WHERE user_id = ?')
		.get(user.id) as { total: number };

	const mistakesRow = usersSqlite
		.query('SELECT COUNT(*) as c FROM user_mistakes WHERE user_id = ? AND resolved = 0')
		.get(user.id) as { c: number };

	const attemptsRow = usersSqlite
		.query('SELECT COUNT(*) as c FROM quiz_attempts WHERE user_id = ?')
		.get(user.id) as { c: number };

	return {
		studentUser: {
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
			yearId: user.yearId,
			streamId: user.streamId,
			wilaya: user.wilaya,
			subscriptionTier: user.subscriptionTier,
			subscriptionExpiresAt: user.subscriptionExpiresAt,
			streakDays: user.streakDays || 0
		},
		isPremium: isEffectivePremium(user),
		totalXp: pointsRow?.total || 0,
		unresolvedMistakesCount: mistakesRow?.c || 0,
		attemptsCount: attemptsRow?.c || 0
	};
};
