import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	applyVisibilityPreset,
	getFullVisibilityTree,
	getSiteSettings,
	setSiteSetting,
	updateVisibilityNode
} from '#lib/server/visibility';
import type { VisibilityState } from '#lib/server/db/schema-content';

export const GET: RequestHandler = async () => {
	return json({
		tree: getFullVisibilityTree(),
		settings: getSiteSettings()
	});
};

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user || !['superadmin', 'admin'].includes(locals.user.role)) {
		return json({ error: 'صلاحيات غير كافية لتعديل ظهور المنصة' }, { status: 403 });
	}

	try {
		const body = await request.json();

		if (body.settingKey !== undefined) {
			await setSiteSetting(String(body.settingKey), String(body.settingValue ?? ''));
			return json({ success: true, settings: getSiteSettings() });
		}

		if (body.preset) {
			applyVisibilityPreset({ preset: body.preset, levelId: body.levelId });
			return json({ success: true, tree: getFullVisibilityTree() });
		}

		if (body.targetType && body.id !== undefined && body.visibility) {
			const res = updateVisibilityNode(
				body.targetType,
				body.id,
				body.visibility as VisibilityState
			);
			return json({ success: res.updated });
		}

		return json({ error: 'معطيات غير مكتملة' }, { status: 400 });
	} catch (err: any) {
		return json({ error: err.message || 'فشل تحديث حالة الظهور' }, { status: 500 });
	}
};
