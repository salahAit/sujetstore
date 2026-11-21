import { createHmac, timingSafeEqual } from 'node:crypto';
import { pgGet, pgRun } from '#lib/server/db';

export type MediaKind = 'subject' | 'solution';

export interface MediaSignatureCheck {
	valid: boolean;
	reason?: string;
}

export interface MediaQuotaResult {
	allowed: boolean;
	remaining: number;
	limit: number;
	windowLabel: string;
}

const DEFAULT_TTL_SECONDS = 600;
const GUEST_HOURLY_LIMIT = 25;
const FREE_DAILY_LIMIT = 60;
const PRO_DAILY_LIMIT = 150;
const STAFF_UNLIMITED = 999_999;

function getSigningSecret(): string {
	return process.env.MEDIA_SIGNING_SECRET?.trim() || 'sujetstore-dev-fallback-key';
}

function hmacSha256Base64Url(payload: string): string {
	return createHmac('sha256', getSigningSecret()).update(payload).digest('base64url');
}

/**
 * Hash a raw IP address with HMAC-SHA256 so raw IPs never appear in URLs or quota tables.
 */
export function hashMediaIp(ip: string): string {
	const normalized = (ip || '0.0.0.0').trim().toLowerCase();
	return hmacSha256Base64Url(`ip:${normalized}`).slice(0, 32);
}

/**
 * Build an opaque actor binding key for signed media URLs.
 * Uses user ID when authenticated, or HMAC-hashed IP for guests.
 */
export function buildMediaActorKey(userId: number | null | undefined, ip: string): string {
	if (typeof userId === 'number' && Number.isInteger(userId) && userId > 0) {
		return hmacSha256Base64Url(`user:${userId}`).slice(0, 32);
	}
	return hashMediaIp(ip);
}

/**
 * Generate a short-lived HMAC-SHA256 signed opaque media URL.
 */
export function signMediaUrl(params: {
	token: string;
	kind: MediaKind;
	actorKey: string;
	ttlSeconds?: number;
}): string {
	const { token, kind, actorKey } = params;
	const ttl =
		typeof params.ttlSeconds === 'number' && Number.isFinite(params.ttlSeconds)
			? Math.floor(params.ttlSeconds)
			: DEFAULT_TTL_SECONDS;
	const exp = Math.floor(Date.now() / 1000) + ttl;
	const sig = hmacSha256Base64Url(`${token}:${kind}:${exp}:${actorKey}`);
	return `/api/media/${encodeURIComponent(token)}/${kind}?exp=${exp}&sig=${encodeURIComponent(sig)}`;
}

/**
 * Constant-time HMAC verification for signed media URLs.
 */
export function verifyMediaSignature(
	token: string,
	kind: MediaKind,
	expStr: string | null,
	sig: string | null,
	actorKey: string
): MediaSignatureCheck {
	if (!token || !expStr || !sig || !actorKey) {
		return { valid: false, reason: 'missing_params' };
	}

	if (kind !== 'subject' && kind !== 'solution') {
		return { valid: false, reason: 'invalid_kind' };
	}

	if (!/^\d+$/.test(expStr)) {
		return { valid: false, reason: 'invalid_exp' };
	}

	const exp = Number(expStr);
	const nowSec = Math.floor(Date.now() / 1000);
	if (!Number.isSafeInteger(exp) || exp < nowSec) {
		return { valid: false, reason: 'expired' };
	}

	const expectedSig = hmacSha256Base64Url(`${token}:${kind}:${exp}:${actorKey}`);
	const providedBuf = Buffer.from(sig, 'utf8');
	const expectedBuf = Buffer.from(expectedSig, 'utf8');

	if (providedBuf.length !== expectedBuf.length) {
		return { valid: false, reason: 'invalid_signature' };
	}

	if (!timingSafeEqual(providedBuf, expectedBuf)) {
		return { valid: false, reason: 'invalid_signature' };
	}

	return { valid: true };
}

/**
 * Enforce per-tier PDF download/view quotas backed by PostgreSQL `media_download_logs`.
 * - Staff (superadmin/admin/editor): unlimited
 * - Guest (userId === null): 25 PDFs / hour per hashed IP
 * - Free registered: 60 PDFs / 24h per user_id
 * - Pro (isPremium): 150 PDFs / 24h per user_id
 */
export async function checkAndRecordMediaQuota(params: {
	userId: number | null;
	isPremium: boolean;
	isStaff: boolean;
	ip: string;
	documentId: number;
	kind: MediaKind;
}): Promise<MediaQuotaResult> {
	const { userId, isPremium, isStaff, ip, documentId, kind } = params;
	const ipHash = hashMediaIp(ip);

	if (isStaff) {
		await pgRun(
			`INSERT INTO media_download_logs (user_id, ip_hash, document_id, kind)
			 VALUES ($1, $2, $3, $4)`,
			[userId, ipHash, documentId, kind]
		);
		return {
			allowed: true,
			remaining: STAFF_UNLIMITED,
			limit: STAFF_UNLIMITED,
			windowLabel: 'unlimited'
		};
	}

	if (userId === null) {
		const row = await pgGet<{ cnt: number | string }>(
			`SELECT COUNT(*)::int AS cnt
			 FROM media_download_logs
			 WHERE user_id IS NULL
			   AND ip_hash = $1
			   AND created_at >= to_char((now() AT TIME ZONE 'UTC') - interval '1 hour', 'YYYY-MM-DD HH24:MI:SS')`,
			[ipHash]
		);
		const used = Number(row?.cnt ?? 0);
		if (used >= GUEST_HOURLY_LIMIT) {
			return {
				allowed: false,
				remaining: 0,
				limit: GUEST_HOURLY_LIMIT,
				windowLabel: '1h'
			};
		}

		await pgRun(
			`INSERT INTO media_download_logs (user_id, ip_hash, document_id, kind)
			 VALUES ($1, $2, $3, $4)`,
			[null, ipHash, documentId, kind]
		);

		return {
			allowed: true,
			remaining: Math.max(0, GUEST_HOURLY_LIMIT - used - 1),
			limit: GUEST_HOURLY_LIMIT,
			windowLabel: '1h'
		};
	}

	const limit = isPremium ? PRO_DAILY_LIMIT : FREE_DAILY_LIMIT;
	const row = await pgGet<{ cnt: number | string }>(
		`SELECT COUNT(*)::int AS cnt
		 FROM media_download_logs
		 WHERE user_id = $1
		   AND created_at >= to_char((now() AT TIME ZONE 'UTC') - interval '24 hours', 'YYYY-MM-DD HH24:MI:SS')`,
		[userId]
	);
	const used = Number(row?.cnt ?? 0);
	if (used >= limit) {
		return {
			allowed: false,
			remaining: 0,
			limit,
			windowLabel: '24h'
		};
	}

	await pgRun(
		`INSERT INTO media_download_logs (user_id, ip_hash, document_id, kind)
		 VALUES ($1, $2, $3, $4)`,
		[userId, ipHash, documentId, kind]
	);

	return {
		allowed: true,
		remaining: Math.max(0, limit - used - 1),
		limit,
		windowLabel: '24h'
	};
}
