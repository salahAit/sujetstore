import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { platformRegistry, type ModuleCategory } from '#lib/platform';

const CATEGORY_ORDER: ModuleCategory[] = [
	'core',
	'learning',
	'assessment',
	'authoring',
	'engagement',
	'tools',
	'commerce'
];

let syncedOnce = false;

export const load: PageServerLoad = async ({ locals }) => {
	if (!syncedOnce) {
		await platformRegistry.syncWithDatabase();
		syncedOnce = true;
	}

	const modules = await platformRegistry.getModulesView(true);
	const nameMap = Object.fromEntries(modules.map((m) => [m.manifest.id, m.manifest.nameAr]));

	const grouped = CATEGORY_ORDER.map((category) => ({
		category,
		items: modules.filter((m) => m.manifest.category === category)
	})).filter((g) => g.items.length > 0);

	const stats = {
		total: modules.length,
		enabled: modules.filter((m) => m.state.enabled).length,
		disabled: modules.filter((m) => !m.state.enabled).length,
		core: modules.filter((m) => m.manifest.tier === 'core').length,
		optional: modules.filter((m) => m.manifest.tier === 'optional').length
	};

	return {
		grouped,
		nameMap,
		stats,
		canManage: Boolean(locals.user && ['superadmin', 'admin'].includes(locals.user.role))
	};
};

export const actions: Actions = {
	toggle: async ({ request, locals }) => {
		if (!locals.user || !['superadmin', 'admin'].includes(locals.user.role)) {
			return fail(403, { error: 'غير مصرح لك بتعديل حالة وحدات المنصة.' });
		}

		const fd = await request.formData();
		const moduleId = String(fd.get('moduleId') || '').trim();
		const nextEnabled = String(fd.get('enabled') || '') === 'true';

		if (!moduleId) {
			return fail(400, { error: 'معرّف الوحدة مفقود.' });
		}

		try {
			const updated = await platformRegistry.setModuleEnabled(moduleId, nextEnabled, locals.user.id);
			const manifest = platformRegistry.get(moduleId);
			return {
				success: true,
				moduleId,
				message: `تم ${updated.enabled ? 'تفعيل' : 'تعطيل'} وحدة "${manifest?.nameAr ?? moduleId}" بنجاح.`
			};
		} catch (err) {
			const message = err instanceof Error ? err.message : 'تعذر تحديث حالة الوحدة.';
			return fail(400, { error: message, moduleId });
		}
	},

	saveConfig: async ({ request, locals }) => {
		if (!locals.user || !['superadmin', 'admin'].includes(locals.user.role)) {
			return fail(403, { error: 'غير مصرح لك بتعديل إعدادات الوحدات.' });
		}

		const fd = await request.formData();
		const moduleId = String(fd.get('moduleId') || '').trim();
		const rawJson = String(fd.get('configJson') || '{}').trim();

		if (!moduleId) {
			return fail(400, { error: 'معرّف الوحدة مفقود.' });
		}

		let parsed: unknown;
		try {
			parsed = JSON.parse(rawJson || '{}');
		} catch {
			return fail(400, {
				error: 'صيغة JSON غير صالحة. يرجى التحقق من الأقواس والفواصل.',
				moduleId
			});
		}

		if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
			return fail(400, {
				error: 'يجب أن يكون التكوين كائن JSON (مثال: {"key": true}).',
				moduleId
			});
		}

		try {
			await platformRegistry.updateModuleConfig(moduleId, parsed as Record<string, unknown>);
			const manifest = platformRegistry.get(moduleId);
			return {
				success: true,
				moduleId,
				message: `تم حفظ إعدادات وحدة "${manifest?.nameAr ?? moduleId}" بنجاح.`
			};
		} catch (err) {
			const message = err instanceof Error ? err.message : 'تعذر حفظ الإعدادات.';
			return fail(400, { error: message, moduleId });
		}
	},

	sync: async ({ locals }) => {
		if (!locals.user || !['superadmin', 'admin'].includes(locals.user.role)) {
			return fail(403, { error: 'غير مصرح لك بمزامنة الوحدات.' });
		}
		try {
			await platformRegistry.syncWithDatabase();
			return {
				success: true,
				message: 'تمت مزامنة جميع وحدات المنصة مع قاعدة البيانات وتحديث الذاكرة المؤقتة.'
			};
		} catch (err) {
			const message = err instanceof Error ? err.message : 'فشلت عملية المزامنة.';
			return fail(500, { error: message });
		}
	}
};
