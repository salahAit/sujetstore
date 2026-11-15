import { randomUUID } from 'crypto';
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { join, resolve } from 'path';

export type UploadKind = 'documents' | 'images' | 'sujet' | 'receipts';

const DATA_UPLOADS_ROOT = resolve('data/uploads');
const STATIC_UPLOADS_ROOT = resolve('static/uploads');

const IMAGE_MIMES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif']);

interface MagicSignature {
	mime: string;
	ext: string;
	match: (buf: Buffer) => boolean;
}

const SIGNATURES: MagicSignature[] = [
	{
		mime: 'application/pdf',
		ext: '.pdf',
		match: (b) => b.length >= 5 && b.subarray(0, 5).toString('ascii') === '%PDF-'
	},
	{
		mime: 'image/png',
		ext: '.png',
		match: (b) =>
			b.length >= 8 &&
			b[0] === 0x89 &&
			b[1] === 0x50 &&
			b[2] === 0x4e &&
			b[3] === 0x47 &&
			b[4] === 0x0d &&
			b[5] === 0x0a &&
			b[6] === 0x1a &&
			b[7] === 0x0a
	},
	{
		mime: 'image/jpeg',
		ext: '.jpg',
		match: (b) => b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff
	},
	{
		mime: 'image/webp',
		ext: '.webp',
		match: (b) =>
			b.length >= 12 &&
			b.subarray(0, 4).toString('ascii') === 'RIFF' &&
			b.subarray(8, 12).toString('ascii') === 'WEBP'
	},
	{
		mime: 'image/gif',
		ext: '.gif',
		match: (b) => {
			if (b.length < 6) return false;
			const hdr = b.subarray(0, 6).toString('ascii');
			return hdr === 'GIF87a' || hdr === 'GIF89a';
		}
	}
];

/** Detect file type strictly by leading magic bytes (SVG intentionally excluded to prevent stored XSS). */
export function detectSafeMime(buffer: Buffer): { mime: string; ext: string } | null {
	for (const sig of SIGNATURES) {
		if (sig.match(buffer)) {
			return { mime: sig.mime, ext: sig.ext };
		}
	}
	return null;
}

/** Validate and persist an uploaded file into `data/uploads/<kind>/`. */
export async function saveValidatedUpload(options: {
	file: File;
	kind: UploadKind;
	accept: 'pdf' | 'image';
	maxBytes: number;
}): Promise<{ url: string; filename: string; size: number; mime: string }> {
	const { file, kind, accept, maxBytes } = options;

	if (!file || !(file instanceof File) || file.size <= 0) {
		throw new Error('لم يتم تحديد ملف صالح');
	}
	if (file.size > maxBytes) {
		const mb = Math.round((maxBytes / (1024 * 1024)) * 10) / 10;
		throw new Error(`حجم الملف يتجاوز الحد الأقصى (${mb} ميجابايت)`);
	}

	const buffer = Buffer.from(await file.arrayBuffer());
	const detected = detectSafeMime(buffer);
	if (!detected) {
		throw new Error('نوع الملف غير مدعوم أو غير صالح (SVG غير مسموح لأسباب أمنية)');
	}
	if (accept === 'pdf' && detected.mime !== 'application/pdf') {
		throw new Error('يُسمح فقط بملفات PDF الصالحة');
	}
	if (accept === 'image' && !IMAGE_MIMES.has(detected.mime)) {
		throw new Error('يُسمح فقط بالصور الآمنة: PNG, JPEG, WebP, GIF');
	}

	const targetDir = join(DATA_UPLOADS_ROOT, kind);
	await mkdir(targetDir, { recursive: true });
	const filename = `${randomUUID()}${detected.ext}`;
	await writeFile(join(targetDir, filename), buffer);

	return {
		url: `/uploads/${kind}/${filename}`,
		filename: file.name,
		size: buffer.length,
		mime: detected.mime
	};
}

/** Resolve an upload URL path safely inside `data/uploads/` (or legacy `static/uploads/`). */
export function resolveSafeUploadFile(relPath: string): { path: string; mime: string } | null {
	const normalized = relPath.replace(/^\/+/, '');
	if (!normalized || normalized.includes('..') || normalized.includes('\\')) {
		return null;
	}

	const candidates = [resolve(DATA_UPLOADS_ROOT, normalized), resolve(STATIC_UPLOADS_ROOT, normalized)];
	const roots = [DATA_UPLOADS_ROOT, STATIC_UPLOADS_ROOT];

	for (let i = 0; i < candidates.length; i++) {
		const candidate = candidates[i];
		if (!candidate.startsWith(roots[i] + '/')) continue;
		if (existsSync(candidate)) {
			const lower = candidate.toLowerCase();
			let mime = 'application/octet-stream';
			if (lower.endsWith('.pdf')) mime = 'application/pdf';
			else if (lower.endsWith('.png')) mime = 'image/png';
			else if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) mime = 'image/jpeg';
			else if (lower.endsWith('.webp')) mime = 'image/webp';
			else if (lower.endsWith('.gif')) mime = 'image/gif';
			return { path: candidate, mime };
		}
	}
	return null;
}
