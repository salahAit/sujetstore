import { S3Client } from 'bun';
import { existsSync, mkdirSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, extname, normalize, resolve } from 'node:path';
import { error } from '@sveltejs/kit';
import { contentSqlite } from './db';
import { canAccessTier } from './visibility';

const MIME_TYPES: Record<string, string> = {
	'.pdf': 'application/pdf',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.webp': 'image/webp',
	'.gif': 'image/gif',
	'.json': 'application/json; charset=utf-8',
	'.txt': 'text/plain; charset=utf-8'
};

export function getMimeType(filePath: string): string {
	return MIME_TYPES[extname(filePath).toLowerCase()] || 'application/octet-stream';
}

let _s3Client: S3Client | null | undefined;

export function getRustfsClient(): S3Client | null {
	if (_s3Client !== undefined) return _s3Client;
	const endpoint = process.env.RUSTFS_ENDPOINT?.trim();
	const bucket = process.env.RUSTFS_BUCKET?.trim() || 'sujetstore-media';
	const accessKeyId = process.env.RUSTFS_ACCESS_KEY?.trim();
	const secretAccessKey = process.env.RUSTFS_SECRET_KEY?.trim();
	const region = process.env.RUSTFS_REGION?.trim() || 'us-east-1';

	if (!endpoint || !accessKeyId || !secretAccessKey) {
		_s3Client = null;
		return null;
	}

	_s3Client = new S3Client({
		endpoint,
		bucket,
		accessKeyId,
		secretAccessKey,
		region
	});
	return _s3Client;
}

export function isRustfsEnabled(): boolean {
	return getRustfsClient() !== null;
}

export function getMediaRoot(): string {
	return resolve(process.env.MEDIA_ROOT?.trim() || '/var/lib/sujetstore-media');
}

export function sanitizeObjectKey(rawKey: string): string | null {
	const cleaned = rawKey.replace(/^\/+/, '').replace(/\\/g, '/');
	if (!cleaned || cleaned.includes('\0') || cleaned.includes('..')) return null;
	const norm = normalize(cleaned).replace(/^\/+/, '');
	if (!norm || norm.startsWith('..') || norm.includes('/../')) return null;
	return norm;
}

/**
 * Uploads an object to RustFS S3 (if configured) and mirrors it to MEDIA_ROOT locally.
 */
export async function putMediaObject(
	rawKey: string,
	data: Uint8Array | Buffer | string,
	contentType?: string
): Promise<{ key: string; backend: 'rustfs-s3' | 'local-media' }> {
	const key = sanitizeObjectKey(rawKey);
	if (!key) throw new Error(`Invalid object key: ${rawKey}`);

	const mime = contentType || getMimeType(key);
	const localPath = resolve(getMediaRoot(), key);
	mkdirSync(dirname(localPath), { recursive: true });
	await writeFile(localPath, data);

	const s3 = getRustfsClient();
	if (s3) {
		await s3.file(key).write(data, { type: mime });
		return { key, backend: 'rustfs-s3' };
	}
	return { key, backend: 'local-media' };
}

/**
 * Generates a short-lived S3 SigV4 presigned URL (default 5 min) for protected/premium media.
 */
export function getPresignedMediaUrl(rawKey: string, expiresInSeconds = 300): string | null {
	const key = sanitizeObjectKey(rawKey);
	const s3 = getRustfsClient();
	if (!key || !s3) return null;
	return s3.file(key).presign({ expiresIn: expiresInSeconds });
}

/**
 * Reads a media object from RustFS S3 first, falling back to MEDIA_ROOT then ./static.
 */
export async function readMediaObject(
	rawKey: string
): Promise<{ bytes: Uint8Array; mime: string; backend: 'rustfs-s3' | 'local-media' | 'static-fallback' } | null> {
	const key = sanitizeObjectKey(rawKey);
	if (!key) return null;
	const mime = getMimeType(key);

	const s3 = getRustfsClient();
	if (s3) {
		try {
			const f = s3.file(key);
			if (await f.exists()) {
				const buf = await f.arrayBuffer();
				return { bytes: new Uint8Array(buf), mime, backend: 'rustfs-s3' };
			}
		} catch {
			// Fall through to local mirror on transient S3 error
		}
	}

	const mediaCandidate = resolve(getMediaRoot(), key);
	if (mediaCandidate.startsWith(getMediaRoot() + '/') && existsSync(mediaCandidate)) {
		const buf = await readFile(mediaCandidate);
		return { bytes: new Uint8Array(buf), mime, backend: 'local-media' };
	}

	const staticRoot = resolve('static');
	const staticCandidate = resolve(staticRoot, key);
	if (staticCandidate.startsWith(staticRoot + '/') && existsSync(staticCandidate)) {
		const buf = await readFile(staticCandidate);
		return { bytes: new Uint8Array(buf), mime, backend: 'static-fallback' };
	}

	return null;
}

/**
 * Checks if a media file exists in MEDIA_ROOT, static/, or RustFS S3.
 */
export async function mediaObjectExists(rawKey: string): Promise<boolean> {
	const key = sanitizeObjectKey(rawKey);
	if (!key) return false;
	if (existsSync(resolve(getMediaRoot(), key))) return true;
	if (existsSync(resolve('static', key))) return true;
	const s3 = getRustfsClient();
	if (s3) {
		try {
			return await s3.file(key).exists();
		} catch {
			return false;
		}
	}
	return false;
}

/**
 * Streams a public or tier-protected PDF/SVG asset from RustFS S3 (with local mirror fallback).
 * Enforces `documents.access_tier` for premium/free-registered content!
 */
export async function serveProtectedMedia(
	prefix: 'documents' | 'generated',
	rawRelPath: string,
	locals: App.Locals
): Promise<Response> {
	const key = sanitizeObjectKey(`${prefix}/${rawRelPath}`);
	if (!key) {
		throw error(400, 'مسار ملف غير صالح');
	}

	const publicUrl = `/${key}`;
	const docMeta = contentSqlite
		.query(
			`SELECT access_tier as accessTier, is_published as isPublished
			 FROM documents
			 WHERE pdf_url = ? OR solution_url = ?
			 LIMIT 1`
		)
		.get(publicUrl, publicUrl) as { accessTier?: string; isPublished?: number } | null;

	let isProtected = false;
	if (docMeta) {
		const tier = docMeta.accessTier || 'public';
		if (tier !== 'public') {
			isProtected = true;
			const access = canAccessTier(tier, locals.user, locals.isStaticBuild);
			if (!access.allowed) {
				throw error(locals.user ? 403 : 401, access.reason || 'هذا الملف متاح للحسابات المشتركة فقط');
			}
		}
	}

	const obj = await readMediaObject(key);
	if (!obj) {
		throw error(404, 'الملف غير موجود');
	}

	return new Response(new Uint8Array(obj.bytes), {
		status: 200,
		headers: {
			'Content-Type': obj.mime,
			'Content-Length': String(obj.bytes.byteLength),
			'Accept-Ranges': 'bytes',
			'X-Content-Type-Options': 'nosniff',
			'X-Storage-Backend': obj.backend,
			'Cache-Control': isProtected
				? 'private, no-store'
				: 'public, max-age=86400, stale-while-revalidate=604800'
		}
	});
}
