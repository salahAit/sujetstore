import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getSiteLockConfig, saveSiteLockConfig, type SiteLockMode } from '#lib/server/site-lock';
import { pgGet, pgRun } from '#lib/server/db';

export const load: PageServerLoad = async () => {
	const config = await getSiteLockConfig(true);
	const stats = await pgGet<{ usersCount: number; sessionsCount: number }>(
		`SELECT (SELECT COUNT(*)::int FROM users) AS "usersCount",
		        (SELECT COUNT(*)::int FROM sessions) AS "sessionsCount"`
	);
	return {
		config,
		stats: stats ?? { usersCount: 0, sessionsCount: 0 }
	};
};

export const actions: Actions = {
	save: async ({ request, locals }) => {
		if (!locals.user || !['superadmin', 'admin'].includes(locals.user.role)) {
			return fail(403, { error: 'غير مصرح لك بتعديل قفل الموقع' });
		}
		const fd = await request.formData();
		const modeRaw = String(fd.get('mode') || 'live');
		const mode: SiteLockMode =
			modeRaw === 'relaunch' || modeRaw === 'app_only' ? modeRaw : 'live';

		await saveSiteLockConfig({
			mode,
			titleAr: String(fd.get('titleAr') || ''),
			titleFr: String(fd.get('titleFr') || ''),
			titleEn: String(fd.get('titleEn') || ''),
			messageAr: String(fd.get('messageAr') || ''),
			messageFr: String(fd.get('messageFr') || ''),
			messageEn: String(fd.get('messageEn') || ''),
			launchDate: String(fd.get('launchDate') || ''),
			apkDownloadUrl: String(fd.get('apkDownloadUrl') || '')
		});

		return { success: true, message: 'تم تحديث حالة قفل الموقع فوراً' };
	},

	terminateSessions: async ({ locals }) => {
		if (!locals.user || locals.user.role !== 'superadmin') {
			return fail(403, { error: 'هذه العملية مخصّصة للمدير العام فقط' });
		}
		await pgRun(
			`DELETE FROM sessions
			 WHERE user_id IN (SELECT id FROM users WHERE role NOT IN ('superadmin', 'admin'))`
		);
		return { success: true, message: 'تم إنهاء جميع جلسات غير الإداريين فوراً' };
	}
};
