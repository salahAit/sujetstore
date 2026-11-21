import type { RequestHandler } from './$types';
import { contentSqlite } from '#lib/server/db';
import { readMediaObject, sanitizeObjectKey } from '#lib/server/storage';
import { canAccessTier } from '#lib/server/visibility';
import { isEffectivePremium, isStaffRole } from '#lib/server/auth';
import { getClientIp } from '#lib/server/rate-limit';
import {
	buildMediaActorKey,
	checkAndRecordMediaQuota,
	verifyMediaSignature,
	type MediaKind
} from '#lib/server/media-signing';
import { recordAuditEvent } from '#lib/server/telemetry';
import { watermarkPdfViaRust } from '#lib/server/rust-worker';

interface DocumentMediaRow {
	id: number;
	slug: string | null;
	pdf_url: string | null;
	solution_url: string | null;
	access_tier: string | null;
	is_published: number | null;
}

function jsonError(status: number, errorMessage: string, extraHeaders?: Record<string, string>): Response {
	return new Response(JSON.stringify({ error: errorMessage }), {
		status,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Cache-Control': 'private, no-store',
			'X-Content-Type-Options': 'nosniff',
			...extraHeaders
		}
	});
}

function buildSafeFilename(slug: string | null | undefined, docId: number, kind: MediaKind): string {
	const base = (slug || `document-${docId}`)
		.replace(/[^a-zA-Z0-9_-]+/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '')
		.slice(0, 80);
	const cleanBase = base || `document-${docId}`;
	return kind === 'solution' ? `${cleanBase}-solution` : cleanBase;
}

function extractRelativeKey(rawUrl: string): string | null {
	const withoutQuery = rawUrl.split('?')[0]?.trim() || '';
	if (!withoutQuery) return null;
	let decoded = withoutQuery;
	try {
		decoded = decodeURIComponent(withoutQuery);
	} catch {
		// Keep raw value if malformed percent-encoding
	}
	return sanitizeObjectKey(decoded);
}

export const GET: RequestHandler = async (event) => {
	const { params, url, locals } = event;
	const token = (params.token || '').trim();
	const rawKind = (params.kind || '').trim();

	if (!token || (rawKind !== 'subject' && rawKind !== 'solution')) {
		return jsonError(400, 'طلب غير صالح');
	}
	const kind: MediaKind = rawKind;

	const ip = getClientIp(event);
	const actorKey = buildMediaActorKey(locals.user?.id, ip);
	const expStr = url.searchParams.get('exp');
	const sig = url.searchParams.get('sig');
	const isDownload = url.searchParams.get('download') === '1';

	// 1. Validate HMAC signature bound to actor (userId or hashed IP)
	const sigCheck = verifyMediaSignature(token, kind, expStr, sig, actorKey);
	if (!sigCheck.valid) {
		recordAuditEvent({
			event,
			eventType: 'blocked_invalid_sig',
			statusCode: 403,
			resourceId: `${token}:${kind}`
		});
		return jsonError(403, 'رابط الملف غير صالح أو منتهي الصلاحية');
	}

	// 2. Lookup document by opaque public_token
	const doc = contentSqlite
		.query(
			`SELECT id, slug, pdf_url, solution_url, access_tier, is_published
			 FROM documents
			 WHERE public_token = ?
			 LIMIT 1`
		)
		.get(token) as DocumentMediaRow | null;

	const staff = isStaffRole(locals.user?.role);

	if (!doc || (!doc.is_published && !staff)) {
		recordAuditEvent({
			event,
			eventType: 'media_not_found',
			statusCode: 404,
			resourceId: `${token}:${kind}`
		});
		return jsonError(404, 'الوثيقة غير موجودة');
	}

	// 3. Enforce access tier (public / registered / premium)
	const accessTier = doc.access_tier || 'public';
	const access = canAccessTier(accessTier, locals.user, false);
	if (!access.allowed) {
		const status = locals.user ? 403 : 401;
		recordAuditEvent({
			event,
			eventType: 'blocked_tier',
			statusCode: status,
			resourceId: `${doc.id}:${kind}`
		});
		return jsonError(
			status,
			access.reason === 'premium_required'
				? 'هذه الوثيقة متاحة لمشتركي SujetStore Pro فقط'
				: 'يرجى تسجيل الدخول للوصول إلى هذه الوثيقة'
		);
	}

	// 4. Resolve storage object key
	const rawMediaUrl = kind === 'solution' ? doc.solution_url : doc.pdf_url;
	if (!rawMediaUrl) {
		return jsonError(404, 'ملف PDF غير متوفر لهذه الوثيقة');
	}
	const relKey = extractRelativeKey(rawMediaUrl);
	if (!relKey) {
		return jsonError(404, 'مسار الملف غير صالح');
	}

	// 5. Enforce per-tier download/view quota in PostgreSQL
	const quota = await checkAndRecordMediaQuota({
		userId: locals.user?.id ?? null,
		isPremium: isEffectivePremium(locals.user),
		isStaff: staff,
		ip,
		documentId: doc.id,
		kind
	});

	if (!quota.allowed) {
		recordAuditEvent({
			event,
			eventType: 'blocked_quota',
			statusCode: 429,
			resourceId: `${doc.id}:${kind}`
		});
		return jsonError(
			429,
			`لقد تجاوزت الحد المسموح به لتحميل الملفات (${quota.limit} ملف / ${quota.windowLabel}). يرجى المحاولة لاحقاً.`,
			{ 'Retry-After': '3600' }
		);
	}

	// 6. Read bytes from RustFS / local mirror
	const obj = await readMediaObject(relKey);
	if (!obj) {
		return jsonError(404, 'الملف غير موجود في التخزين');
	}

	let pdfBytes: Uint8Array = obj.bytes;

	// 7. Best-effort dynamic watermarking for non-public documents via Rust worker (with LRU cache)
	if (accessTier !== 'public') {
		const watermarkText = `SujetStore Pro | ${locals.user?.email || 'member'} | ${new Date().toISOString().slice(0, 10)}`;
		const wm = await watermarkPdfViaRust(obj.bytes, watermarkText, actorKey);
		pdfBytes = wm.bytes;
	}

	// 8. Record successful PDF view / download telemetry (fire-and-forget)
	recordAuditEvent({
		event,
		eventType: isDownload ? 'pdf_download' : 'pdf_view',
		statusCode: 200,
		resourceId: `${doc.id}:${kind}`
	});

	const safeSlug = buildSafeFilename(doc.slug, doc.id, kind);
	const disposition = isDownload ? 'attachment' : 'inline';

	return new Response(new Uint8Array(pdfBytes), {
		status: 200,
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Length': String(pdfBytes.byteLength),
			'Content-Disposition': `${disposition}; filename="${safeSlug}.pdf"`,
			'X-Storage-Backend': obj.backend,
			'X-Content-Type-Options': 'nosniff',
			'Cache-Control': 'private, no-store',
			'X-Quota-Remaining': String(quota.remaining)
		}
	});
};
