import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { saveValidatedUpload } from '#lib/server/uploads';
import { isStaffRole } from '#lib/server/auth';

const MAX_PDF_SIZE = 20 * 1024 * 1024; // 20MB

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user || !isStaffRole(locals.user.role)) {
		throw error(401, 'غير مصرح');
	}

	const formData = await request.formData();
	const file = formData.get('file');
	if (!(file instanceof File)) {
		throw error(400, 'لم يتم تحديد ملف');
	}

	try {
		const saved = await saveValidatedUpload({
			file,
			kind: 'documents',
			accept: 'pdf',
			maxBytes: MAX_PDF_SIZE
		});
		return json({
			url: saved.url,
			filename: saved.filename,
			size: saved.size
		});
	} catch (err: any) {
		throw error(400, err.message || 'فشل رفع الملف');
	}
};
