import { json } from '@sveltejs/kit';
import { mkdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import type { RequestHandler } from './$types';
import { isStaffRole } from '#lib/server/auth';
import {
	extractFontFamilyNameFromBuffer,
	listAvailableFonts,
	listAvailableLogos
} from '#lib/server/print-style';
import { syncRamWorkspace } from '#lib/server/typst-batch-ram';

const MAX_FONT_BYTES = 15 * 1024 * 1024; // 15 MB
const MAX_LOGO_BYTES = 5 * 1024 * 1024; // 5 MB

const STATIC_FONTS_DIR = resolve('static/fonts');
const STATIC_PRINT_IMAGES_DIR = resolve('static/images/print');

function detectFontMagic(buf: Buffer): { ext: '.ttf' | '.otf'; format: string } | null {
	if (buf.length < 12) return null;
	const b0 = buf[0];
	const b1 = buf[1];
	const b2 = buf[2];
	const b3 = buf[3];
	// TrueType: 00 01 00 00 or 'true' (74 72 75 65)
	if (
		(b0 === 0x00 && b1 === 0x01 && b2 === 0x00 && b3 === 0x00) ||
		(b0 === 0x74 && b1 === 0x72 && b2 === 0x75 && b3 === 0x65)
	) {
		return { ext: '.ttf', format: 'truetype' };
	}
	// OpenType CFF: 'OTTO' (4F 54 54 4F)
	if (b0 === 0x4f && b1 === 0x54 && b2 === 0x54 && b3 === 0x4f) {
		return { ext: '.otf', format: 'opentype' };
	}
	return null;
}

function detectLogoMagic(buf: Buffer): { ext: '.png' | '.webp'; mime: string } | null {
	// PNG: 89 50 4E 47 0D 0A 1A 0A
	if (
		buf.length >= 8 &&
		buf[0] === 0x89 &&
		buf[1] === 0x50 &&
		buf[2] === 0x4e &&
		buf[3] === 0x47 &&
		buf[4] === 0x0d &&
		buf[5] === 0x0a &&
		buf[6] === 0x1a &&
		buf[7] === 0x0a
	) {
		return { ext: '.png', mime: 'image/png' };
	}
	// WebP: RIFF....WEBP
	if (
		buf.length >= 12 &&
		buf.subarray(0, 4).toString('ascii') === 'RIFF' &&
		buf.subarray(8, 12).toString('ascii') === 'WEBP'
	) {
		return { ext: '.webp', mime: 'image/webp' };
	}
	return null;
}

function sanitizeBaseName(originalName: string, fallback: string): string {
	const withoutExt = originalName.replace(/\.[^.]+$/, '');
	const cleaned = withoutExt
		.normalize('NFKD')
		.replace(/[^a-zA-Z0-9_-]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 64);
	return cleaned || fallback;
}

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user || !isStaffRole(locals.user.role)) {
		return json({ error: 'غير مصرح' }, { status: 401 });
	}

	const formData = await request.formData();
	const kindRaw = String(formData.get('kind') || '').trim().toLowerCase();
	const file = formData.get('file');

	if (kindRaw !== 'font' && kindRaw !== 'logo') {
		return json({ error: 'نوع الملف المطلوب يجب أن يكون font أو logo' }, { status: 400 });
	}
	if (!(file instanceof File) || file.size <= 0) {
		return json({ error: 'لم يتم تحديد ملف صالح' }, { status: 400 });
	}

	if (kindRaw === 'font') {
		if (file.size > MAX_FONT_BYTES) {
			return json({ error: 'حجم الخط يتجاوز الحد الأقصى (15 ميجابايت)' }, { status: 400 });
		}
		const buf = Buffer.from(await file.arrayBuffer());
		const magic = detectFontMagic(buf);
		if (!magic) {
			return json(
				{ error: 'ملف الخط غير صالح — يُسمح فقط بملفات TrueType (.ttf) أو OpenType (.otf) الأصلية' },
				{ status: 400 }
			);
		}

		const safeBase = sanitizeBaseName(file.name, `custom-font-${Date.now()}`);
		const filename = `${safeBase}${magic.ext}`;
		await mkdir(STATIC_FONTS_DIR, { recursive: true });
		await writeFile(join(STATIC_FONTS_DIR, filename), buf);

		// Immediately mirror new font into /dev/shm RAM disk so live previews can use it right away
		await syncRamWorkspace(true);

		const fontFamily = extractFontFamilyNameFromBuffer(buf) || safeBase.replace(/[-_]+/g, ' ');
		return json({
			ok: true,
			kind: 'font',
			filename,
			fontFamily,
			size: buf.length,
			fonts: listAvailableFonts()
		});
	}

	// kindRaw === 'logo'
	if (file.size > MAX_LOGO_BYTES) {
		return json({ error: 'حجم الشعار يتجاوز الحد الأقصى (5 ميجابايت)' }, { status: 400 });
	}
	const buf = Buffer.from(await file.arrayBuffer());
	const magic = detectLogoMagic(buf);
	if (!magic) {
		return json(
			{ error: 'صورة الشعار غير صالحة — يُسمح فقط بملفات PNG أو WebP الأصلية' },
			{ status: 400 }
		);
	}

	const safeBase = sanitizeBaseName(file.name, `print-logo-${Date.now()}`);
	const filename = `${safeBase}-${Date.now().toString(36)}${magic.ext}`;
	await mkdir(STATIC_PRINT_IMAGES_DIR, { recursive: true });
	await writeFile(join(STATIC_PRINT_IMAGES_DIR, filename), buf);

	await syncRamWorkspace(true);

	const publicPath = `/images/print/${filename}`;
	return json({
		ok: true,
		kind: 'logo',
		filename,
		path: publicPath,
		size: buf.length,
		logos: listAvailableLogos()
	});
};
