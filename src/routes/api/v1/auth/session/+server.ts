import { createHash } from 'node:crypto';
import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';
import { eq, or } from 'drizzle-orm';
import { pgGet, pgRun, usersDatabase, userSchema } from '#lib/server/db';
import {
	deleteSessionTokenCookie,
	generateId,
	getSessionCookie,
	hashPassword,
	invalidateSession,
	isEffectivePremium,
	verifyPassword
} from '#lib/server/auth';
import { checkRateLimit, getClientIp } from '#lib/server/rate-limit';

const TOKEN_EXPIRY_DAYS = 30;
const NO_STORE_HEADERS = { 'Cache-Control': 'no-store' };

function hashToken(rawToken: string): string {
	return createHash('sha256').update(rawToken).digest('hex');
}

function extractBearerToken(request: Request): string | null {
	const header = request.headers.get('authorization');
	if (!header) return null;
	const match = header.match(/^Bearer\s+(.+)$/i);
	const token = match?.[1]?.trim();
	return token && token.length >= 16 ? token : null;
}

function serializeUser(u: {
	id: number;
	username: string | null;
	email: string;
	name: string;
	role: string;
	avatar: string | null;
	yearId: string | null;
	streamId: string | null;
	wilaya: string | null;
	subscriptionTier: 'free' | 'premium';
	subscriptionExpiresAt: string | null;
	streakDays: number;
	lastActiveDate: string | null;
	createdAt: string;
}) {
	return {
		id: u.id,
		username: u.username,
		email: u.email,
		name: u.name,
		role: u.role,
		avatar: u.avatar,
		yearId: u.yearId,
		streamId: u.streamId,
		wilaya: u.wilaya,
		subscriptionTier: u.subscriptionTier,
		subscriptionExpiresAt: u.subscriptionExpiresAt,
		isPremium: isEffectivePremium(u as any),
		streakDays: u.streakDays,
		lastActiveDate: u.lastActiveDate,
		createdAt: u.createdAt
	};
}

async function resolveBearerUser(event: RequestEvent) {
	const token = extractBearerToken(event.request);
	if (!token) return null;

	const tokenHash = hashToken(token);
	const row = await pgGet<{
		token_id: number;
		expires_at: string;
		id: number;
		username: string | null;
		email: string;
		name: string;
		role: string;
		avatar: string | null;
		is_active: boolean;
		year_id: string | null;
		stream_id: string | null;
		wilaya: string | null;
		subscription_tier: 'free' | 'premium';
		subscription_expires_at: string | null;
		streak_days: number;
		last_active_date: string | null;
		created_at: string;
	}>(
		`SELECT
			t.id AS token_id,
			t.expires_at,
			u.id,
			u.username,
			u.email,
			u.name,
			u.role,
			u.avatar,
			u.is_active,
			u.year_id,
			u.stream_id,
			u.wilaya,
			u.subscription_tier,
			u.subscription_expires_at,
			u.streak_days,
			u.last_active_date,
			u.created_at
		FROM api_tokens t
		JOIN users u ON u.id = t.user_id
		WHERE t.token_hash = $1
		LIMIT 1`,
		[tokenHash]
	);

	if (!row) return null;

	const expiresMs = Date.parse(row.expires_at);
	if (!Number.isFinite(expiresMs) || Date.now() >= expiresMs || !row.is_active) {
		await pgRun('DELETE FROM api_tokens WHERE id = $1', [row.token_id]).catch(() => {});
		return null;
	}

	await pgRun(
		`UPDATE api_tokens
		 SET last_used_at = to_char(NOW() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS')
		 WHERE id = $1`,
		[row.token_id]
	).catch(() => {});

	return {
		id: row.id,
		username: row.username,
		email: row.email,
		name: row.name,
		role: row.role,
		avatar: row.avatar,
		yearId: row.year_id,
		streamId: row.stream_id,
		wilaya: row.wilaya,
		subscriptionTier: row.subscription_tier,
		subscriptionExpiresAt: row.subscription_expires_at,
		streakDays: row.streak_days,
		lastActiveDate: row.last_active_date,
		createdAt: row.created_at
	};
}

export const POST: RequestHandler = async (event) => {
	const ip = getClientIp(event);
	const limit = checkRateLimit(`v1_auth_login:${ip}`, 15, 15 * 60 * 1000);
	if (!limit.allowed) {
		return json(
			{ ok: false, error: 'محاولات تسجيل دخول كثيرة، يرجى المحاولة لاحقاً' },
			{ status: 429, headers: NO_STORE_HEADERS }
		);
	}

	let body: Record<string, unknown>;
	try {
		body = (await event.request.json()) as Record<string, unknown>;
	} catch {
		return json(
			{ ok: false, error: 'تنسيق JSON غير صالح' },
			{ status: 400, headers: NO_STORE_HEADERS }
		);
	}

	const rawIdentifier =
		(typeof body.identifier === 'string' && body.identifier) ||
		(typeof body.email === 'string' && body.email) ||
		(typeof body.username === 'string' && body.username) ||
		'';
	const identifier = rawIdentifier.trim();
	const password = typeof body.password === 'string' ? body.password : '';
	const rawLabel = typeof body.label === 'string' ? body.label.trim().slice(0, 64) : '';
	const label = rawLabel || 'mobile-client';

	if (!identifier || !password) {
		return json(
			{ ok: false, error: 'يرجى إدخال البريد الإلكتروني أو اسم المستخدم وكلمة المرور' },
			{ status: 400, headers: NO_STORE_HEADERS }
		);
	}

	const [user] = await usersDatabase
		.select()
		.from(userSchema.users)
		.where(
			or(
				eq(userSchema.users.email, identifier.toLowerCase()),
				eq(userSchema.users.username, identifier)
			)
		)
		.limit(1);

	if (!user) {
		return json(
			{ ok: false, error: 'بيانات الدخول غير صحيحة' },
			{ status: 401, headers: NO_STORE_HEADERS }
		);
	}

	if (!user.isActive) {
		return json(
			{ ok: false, error: 'تم إيقاف هذا الحساب مؤقتاً' },
			{ status: 403, headers: NO_STORE_HEADERS }
		);
	}

	const verified = await verifyPassword(password, user.passwordHash);
	if (!verified.valid) {
		return json(
			{ ok: false, error: 'بيانات الدخول غير صحيحة' },
			{ status: 401, headers: NO_STORE_HEADERS }
		);
	}

	if (verified.needsRehash) {
		const upgradedHash = await hashPassword(password);
		await usersDatabase
			.update(userSchema.users)
			.set({ passwordHash: upgradedHash })
			.where(eq(userSchema.users.id, user.id));
	}

	const token = `sb_${generateId(32)}`;
	const tokenHash = hashToken(token);
	const expiresAtDate = new Date();
	expiresAtDate.setDate(expiresAtDate.getDate() + TOKEN_EXPIRY_DAYS);
	const expiresAt = expiresAtDate.toISOString();

	await usersDatabase.insert(userSchema.apiTokens).values({
		userId: user.id,
		tokenHash,
		label,
		expiresAt
	});

	return json(
		{
			ok: true,
			data: {
				token,
				expiresAt,
				user: serializeUser(user)
			}
		},
		{ status: 200, headers: NO_STORE_HEADERS }
	);
};

export const GET: RequestHandler = async (event) => {
	const bearerUser = await resolveBearerUser(event);
	if (bearerUser) {
		return json(
			{
				ok: true,
				data: {
					authMode: 'bearer',
					user: serializeUser(bearerUser)
				}
			},
			{ headers: NO_STORE_HEADERS }
		);
	}

	if (event.locals.user) {
		return json(
			{
				ok: true,
				data: {
					authMode: 'cookie',
					user: serializeUser(event.locals.user)
				}
			},
			{ headers: NO_STORE_HEADERS }
		);
	}

	return json(
		{ ok: false, error: 'غير مصرح بالدخول' },
		{ status: 401, headers: NO_STORE_HEADERS }
	);
};

export const DELETE: RequestHandler = async (event) => {
	const token = extractBearerToken(event.request);
	if (token) {
		const tokenHash = hashToken(token);
		const res = await pgRun('DELETE FROM api_tokens WHERE token_hash = $1', [tokenHash]);
		return json(
			{
				ok: true,
				data: {
					revoked: res.count > 0,
					authMode: 'bearer'
				}
			},
			{ headers: NO_STORE_HEADERS }
		);
	}

	const cookieSessionId = getSessionCookie(event);
	if (cookieSessionId) {
		await invalidateSession(cookieSessionId);
		deleteSessionTokenCookie(event);
		return json(
			{
				ok: true,
				data: {
					revoked: true,
					authMode: 'cookie'
				}
			},
			{ headers: NO_STORE_HEADERS }
		);
	}

	return json(
		{ ok: false, error: 'لا توجد جلسة أو رمز وصول لإلغائه' },
		{ status: 401, headers: NO_STORE_HEADERS }
	);
};
