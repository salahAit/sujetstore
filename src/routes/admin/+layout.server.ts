import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { platformRegistry } from '#lib/platform';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	if (url.pathname === '/admin/login') {
		return { user: null, enabledModules: [] as string[] };
	}

	if (!locals.user) {
		throw redirect(302, '/admin/login');
	}

	const snapshot = await platformRegistry.getSnapshot();
	const enabledModules = Array.from(snapshot.values())
		.filter((m) => m.enabled)
		.map((m) => m.moduleId);

	return {
		user: locals.user,
		enabledModules
	};
};
