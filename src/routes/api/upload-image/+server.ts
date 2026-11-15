import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { saveValidatedUpload } from '#lib/server/uploads';
import { isStaffRole } from '#lib/server/auth';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user || !isStaffRole(locals.user.role)) {
		return json({ success: false, error: 'غير مصرح' }, { status: 401 });
	}

	try {
		const formData = await request.formData();
		const file = formData.get('file');
		if (!(file instanceof File)) {
			return json({ success: false, error: 'لم يتم تحديد صورة' }, { status: 400 });
		}

		const saved = await saveValidatedUpload({
			file,
			kind: 'sujet',
			accept: 'image',
			maxBytes: MAX_IMAGE_SIZE
		});

		return json({
			success: true,
			url: saved.url,
			filename: saved.filename
		});
	} catch (err: any) {
		return json({ success: false, error: err.message || 'Upload failed' }, { status: 400 });
	}
};
