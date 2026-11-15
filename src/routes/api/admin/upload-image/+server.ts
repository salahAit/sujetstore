import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { saveValidatedUpload } from '#lib/server/uploads';
import { isStaffRole } from '#lib/server/auth';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user || !isStaffRole(locals.user.role)) {
		return json({ error: 'غير مصرح' }, { status: 401 });
	}

	const formData = await request.formData();
	const file = formData.get('file');
	if (!(file instanceof File)) {
		return json({ error: 'لم يتم تحديد ملف' }, { status: 400 });
	}

	try {
		const saved = await saveValidatedUpload({
			file,
			kind: 'images',
			accept: 'image',
			maxBytes: MAX_IMAGE_SIZE
		});
		return json({ url: saved.url, filename: saved.filename, size: saved.size });
	} catch (err: any) {
		return json({ error: err.message || 'فشل رفع الصورة' }, { status: 400 });
	}
};
