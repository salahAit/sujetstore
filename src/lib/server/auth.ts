import { eq } from 'drizzle-orm';
import { usersDatabase, userSchema } from './db/index';
import type { RequestEvent } from '@sveltejs/kit';

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_EXPIRY_DAYS = 30;

export function generateId(length = 32): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

export async function createSession(userId: number): Promise<typeof userSchema.sessions.$inferSelect> {
    const sessionId = generateId();
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

    // Fetch user to attach to session
    const user = await usersDatabase
        .select()
        .from(userSchema.users)
        .where(eq(userSchema.users.id, result.userId))
        .get();

    if (!user) return null;

    return { session: result, user };
}

export async function invalidateSession(sessionId: string) {
    await usersDatabase.delete(userSchema.sessions).where(eq(userSchema.sessions.id, sessionId));
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
    event.cookies.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: 'lax',
        expires: expiresAt,
        path: '/'
    });
}

export function deleteSessionTokenCookie(event: RequestEvent) {
    event.cookies.set(SESSION_COOKIE_NAME, '', {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 0,
        path: '/'
    });
}
