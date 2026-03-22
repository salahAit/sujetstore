import { json } from '@sveltejs/kit';
import { resolve, join } from 'path';
import { mkdir, writeFile } from 'fs/promises';
import { randomUUID } from 'crypto';
import type { RequestHandler } from './$types';

const UPLOAD_DIR = resolve('static/uploads/sujet');

export const POST: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData();
		const file = formData.get('file') as File;

		if (!file || !file.size) {
			return json({ success: false, error: 'No file provided' }, { status: 400 });
		}

		// Validate file type
		const allowedTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'];
		if (!allowedTypes.includes(file.type)) {
			return json({ success: false, error: 'نوع الملف غير مدعوم. يُسمح بـ PNG, JPEG, WebP, SVG' }, { status: 400 });
		}

		// Limit file size (5MB)
		if (file.size > 5 * 1024 * 1024) {
			return json({ success: false, error: 'حجم الملف يتجاوز 5 ميغابايت' }, { status: 400 });
		}

		// Ensure upload directory exists
		await mkdir(UPLOAD_DIR, { recursive: true });

		// Generate unique filename
		const ext = file.name.split('.').pop() || 'png';
		const filename = `${randomUUID()}.${ext}`;
		const filepath = join(UPLOAD_DIR, filename);

		// Write file
		const buffer = Buffer.from(await file.arrayBuffer());
		await writeFile(filepath, buffer);

		// Return the public URL
		const url = `/uploads/sujet/${filename}`;

		return json({
			success: true,
			url,
			filename
		});
	} catch (err: any) {
		return json({ success: false, error: err.message || 'Upload failed' }, { status: 500 });
	}
};
