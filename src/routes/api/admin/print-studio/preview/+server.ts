import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isStaffRole } from '#lib/server/auth';
import { normalizeStyleConfig } from '#lib/server/print-style';
import { compilePreviewInRam } from '#lib/server/typst-batch-ram';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user || !isStaffRole(locals.user.role)) {
		return json({ error: 'غير مصرح' }, { status: 401 });
	}

	let body: Record<string, unknown>;
	try {
		body = (await request.json()) as Record<string, unknown>;
	} catch {
		return json({ error: 'بيانات JSON غير صالحة' }, { status: 400 });
	}

	const style = normalizeStyleConfig(body.style ?? body);
	const rawLang = body.language;
	const language: 'ar' | 'fr' | 'en' | 'es' =
		rawLang === 'fr' || rawLang === 'en' || rawLang === 'es' ? rawLang : 'ar';
	const rawLevel = typeof body.levelId === 'string' ? body.levelId : 'moyen';
	const levelId =
		rawLevel === 'primaire' || rawLevel === 'secondaire' ? rawLevel : 'moyen';
	const includePdf = body.includePdf === true;

	const result = await compilePreviewInRam({
		style,
		language,
		levelId,
		includePdf
	});

	if (!result.success) {
		return json(result, { status: 422 });
	}

	return json(result);
};
