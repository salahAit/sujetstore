import type { LayoutServerLoad } from './$types';
import { getPublicLevels, getSiteSettings } from '#lib/server/visibility';

export const load: LayoutServerLoad = async ({ locals }) => {
	const levels = getPublicLevels();
	const siteSettings = getSiteSettings();
	const user = locals.user
		? {
				id: locals.user.id,
				name: locals.user.name,
				email: locals.user.email,
				role: locals.user.role,
				subscriptionTier: locals.user.subscriptionTier,
				subscriptionExpiresAt: locals.user.subscriptionExpiresAt,
				yearId: locals.user.yearId,
				streamId: locals.user.streamId,
				streakDays: locals.user.streakDays
			}
		: null;

	return {
		levels,
		siteSettings,
		user,
		isStaticBuild: !!locals.isStaticBuild,
		locale: locals.locale || 'ar',
		siteLockActive: !!locals.siteLockActive,
		isMobileApp: !!locals.isMobileApp
	};
};
