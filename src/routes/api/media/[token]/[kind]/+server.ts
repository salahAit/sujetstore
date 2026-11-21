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
import {
	ensurePdfPagesRendered,
	getCachedPdfPage,
	getCachedPdfPageCount,
	getRenderedPdfPage
} from '#lib/server/pdf-pages';

interface DocumentMediaRow {
	id: number;
	slug: string | null;
	pdf_url: string | null;
	solution_url: string | null;
	access_tier: string | null;
	is_published: number | null;
	updated_at: string | null;
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
	const renderMode = url.searchParams.get('render');
	const pageParam = url.searchParams.get('page');
	const isPageImageRequest = Boolean(pageParam && /^\d+$/.test(pageParam));

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
			`SELECT id, slug, pdf_url, solution_url, access_tier, is_published, updated_at
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

	// 5. Enforce per-tier download/view quota in PostgreSQL (skip re-counting individual page images of the same view)
	let quotaRemaining = 9999;
	if (!isPageImageRequest) {
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
		quotaRemaining = quota.remaining;
	}

	const wmKeyPart = accessTier !== 'public' ? `wm:${locals.user?.id ?? 'm'}` : 'pub';
	const renderCacheKey = `${doc.id}:${kind}:${relKey}:${doc.updated_at || 'v1'}:${wmKeyPart}`;

	// 5b. ULTRA-FAST /dev/shm RAM Cache Fast-Path BEFORE touching RustFS S3! (< 2ms!)
	if (isPageImageRequest) {
		const pageNum = parseInt(pageParam!, 10);
		const ramHit = await getCachedPdfPage(renderCacheKey, pageNum);
		if (ramHit) {
			return new Response(new Uint8Array(ramHit.bytes), {
				status: 200,
				headers: {
					'Content-Type': 'image/jpeg',
					'Content-Length': String(ramHit.bytes.byteLength),
					'Cache-Control': 'private, max-age=600',
					'X-Content-Type-Options': 'nosniff',
					'X-Storage-Backend': 'ram-cache'
				}
			});
		}
	}

	if (renderMode === 'pages') {
		const cachedCount = await getCachedPdfPageCount(renderCacheKey);
		if (cachedCount) {
			recordAuditEvent({
				event,
				eventType: 'pdf_view',
				statusCode: 200,
				resourceId: `${doc.id}:${kind}`
			});
			return new Response(
				JSON.stringify({
					pageCount: cachedCount,
					pages: Array.from({ length: cachedCount }, (_, i) => i + 1)
				}),
				{
					status: 200,
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						'Cache-Control': 'private, max-age=300',
						'X-Storage-Backend': 'ram-cache'
					}
				}
			);
		}
	}

	// 6. Read bytes from RustFS / local mirror (only on RAM cache miss or full PDF download)
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

	// 7b. Ultra-fast Server-Rendered Crisp Page Preview (0 KB pdf.js, 100% native Poppler Arabic fonts!)
	if (renderMode === 'pages') {
		const pageCount = await ensurePdfPagesRendered(renderCacheKey, pdfBytes);
		recordAuditEvent({
			event,
			eventType: 'pdf_view',
			statusCode: 200,
			resourceId: `${doc.id}:${kind}`
		});
		return new Response(
			JSON.stringify({
				pageCount,
				pages: Array.from({ length: pageCount }, (_, i) => i + 1)
			}),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Cache-Control': 'private, max-age=300',
					'X-Storage-Backend': obj.backend
				}
			}
		);
	}

	if (isPageImageRequest) {
		const pageNum = parseInt(pageParam!, 10);
		const rendered = await getRenderedPdfPage(renderCacheKey, pdfBytes, pageNum);
		if (!rendered) {
			return jsonError(404, 'الصفحة غير موجودة');
		}
		return new Response(new Uint8Array(rendered.bytes), {
			status: 200,
			headers: {
				'Content-Type': 'image/jpeg',
				'Content-Length': String(rendered.bytes.byteLength),
				'Cache-Control': 'private, max-age=600',
				'X-Content-Type-Options': 'nosniff',
				'X-Storage-Backend': obj.backend
			}
		});
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
			'X-Quota-Remaining': String(quotaRemaining)
		}
	});
};
