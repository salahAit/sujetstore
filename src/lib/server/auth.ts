import { eq } from 'drizzle-orm';
import { randomBytes, randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';
import { usersDatabase, userSchema } from './db/index';
import type { RequestEvent } from '@sveltejs/kit';

export const SESSION_COOKIE_NAME = 'sujet_session';
export const LEGACY_SESSION_COOKIE_NAME = 'admin_session';
export const FP_COOKIE_NAME = 'sujet_fp';
const SESSION_EXPIRY_DAYS = 30;

/** Cryptographically random URL-safe identifier. */
export function generateId(byteLength = 32): string {
	return randomBytes(byteLength).toString('base64url');
}

/** Hash a plaintext password using Argon2id (Bun native). */
export async function hashPassword(password: string): Promise<string> {
	return await Bun.password.hash(password, {
		algorithm: 'argon2id',
		memoryCost: 19456,
		timeCost: 2
	});
}

/** Verify password against Argon2id or legacy bcrypt hashes. */
export async function verifyPassword(
	password: string,
	storedHash: string
): Promise<{ valid: boolean; needsRehash: boolean }> {
	if (!storedHash) return { valid: false, needsRehash: false };
	if (storedHash.startsWith('$2a$') || storedHash.startsWith('$2b$') || storedHash.startsWith('$2y$')) {
		const valid = await bcrypt.compare(password, storedHash);
		return { valid, needsRehash: valid };
	}
	const valid = await Bun.password.verify(password, storedHash);
	return { valid, needsRehash: false };
}

/** Whether role belongs to admin/editorial staff. */
export function isStaffRole(role?: string | null): boolean {
	return role === 'superadmin' || role === 'admin' || role === 'editor';
}

/** Whether user currently holds an active premium subscription (or staff role). */
export function isEffectivePremium(user?: Pick<typeof userSchema.users.$inferSelect, 'role' | 'subscriptionTier' | 'subscriptionExpiresAt'> | null): boolean {
	if (!user) return false;
	if (isStaffRole(user.role)) return true;
	if (user.subscriptionTier !== 'premium') return false;
	if (!user.subscriptionExpiresAt) return true;
	const exp = Date.parse(user.subscriptionExpiresAt);
	return Number.isFinite(exp) && exp > Date.now();
}

/** Read active session cookie (supporting both current and legacy cookie names). */
export function getSessionCookie(event: RequestEvent): string | undefined {
	return event.cookies.get(SESSION_COOKIE_NAME) || event.cookies.get(LEGACY_SESSION_COOKIE_NAME);
}

/** Read or initialize an anonymous student fingerprint cookie (`sujet_fp`). */
export function getOrCreateFingerprint(event: RequestEvent): string {
	const existing = event.cookies.get(FP_COOKIE_NAME) || event.cookies.get('fingerprint');
	if (existing && /^[a-zA-Z0-9_-]{8,128}$/.test(existing)) {
		return existing;
	}
	const fp = `fp_${randomUUID()}`;
	event.cookies.set(FP_COOKIE_NAME, fp, {
		httpOnly: true,
		sameSite: 'lax',
		secure: event.url.protocol === 'https:',
		maxAge: 60 * 60 * 24 * 365,
		path: '/'
	});
	return fp;
}

export async function createSession(userId: number): Promise<typeof userSchema.sessions.$inferSelect> {
	const sessionId = generateId(32);
	const expiresAt = new Date();
	expiresAt.setDate(expiresAt.getDate() + SESSION_EXPIRY_DAYS);

	const session = {
		id: sessionId,
		userId,
		expiresAt: expiresAt.toISOString(),
		createdAt: new Date().toISOString()
	};

	await usersDatabase.insert(userSchema.sessions).values(session);
	return session;
}

export async function validateSession(sessionId: string) {
	const result = await usersDatabase
		.select()
		.from(userSchema.sessions)
		.where(eq(userSchema.sessions.id, sessionId))
		.get();

	if (!result) return null;

	const expiresAt = new Date(result.expiresAt);
	if (Date.now() >= expiresAt.getTime()) {
		await usersDatabase.delete(userSchema.sessions).where(eq(userSchema.sessions.id, sessionId));
		return null;
	}

	const user = await usersDatabase
		.select()
		.from(userSchema.users)
		.where(eq(userSchema.users.id, result.userId))
		.get();

	if (!user || !user.isActive) {
		await usersDatabase.delete(userSchema.sessions).where(eq(userSchema.sessions.id, sessionId));
		return null;
	}

	return { session: result, user };
}

export async function invalidateSession(sessionId: string) {
	await usersDatabase.delete(userSchema.sessions).where(eq(userSchema.sessions.id, sessionId));
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
	const secure = event.url.protocol === 'https:';
	event.cookies.set(SESSION_COOKIE_NAME, token, {
		httpOnly: true,
		sameSite: 'lax',
		secure,
		expires: expiresAt,
		path: '/'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent) {
	const secure = event.url.protocol === 'https:';
	for (const cookieName of [SESSION_COOKIE_NAME, LEGACY_SESSION_COOKIE_NAME]) {
		event.cookies.set(cookieName, '', {
			httpOnly: true,
			sameSite: 'lax',
			secure,
			maxAge: 0,
			path: '/'
		});
	}
}
