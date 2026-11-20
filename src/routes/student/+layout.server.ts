import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { pgGet } from '#lib/server/db';
import { isEffectivePremium } from '#lib/server/auth';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	if (!locals.user) {
		throw redirect(302, `/auth/login?next=${encodeURIComponent(url.pathname + url.search)}`);
	}

	const user = locals.user;
	const [pointsRow, mistakesRow, attemptsRow] = await Promise.all([
		pgGet<{ total: number }>(
			'SELECT COALESCE(SUM(points), 0)::int as total FROM user_points WHERE user_id = $1',
			[user.id]
		),
		pgGet<{ c: number }>(
			'SELECT COUNT(*)::int as c FROM user_mistakes WHERE user_id = $1 AND resolved = FALSE',
			[user.id]
		),
		pgGet<{ c: number }>('SELECT COUNT(*)::int as c FROM quiz_attempts WHERE user_id = $1', [
			user.id
		])
	]);

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
