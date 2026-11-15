import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { usersDatabase, userSchema } from '#lib/server/db';
import { eq, or } from 'drizzle-orm';
import {
	createSession,
	getOrCreateFingerprint,
	hashPassword,
	isStaffRole,
	setSessionTokenCookie,
	verifyPassword
} from '#lib/server/auth';
import { migrateAnonymousProgressToUser } from '#lib/server/gamification';

function safeNext(next: string | null): string {
	if (next && next.startsWith('/') && !next.startsWith('//')) return next;
	return '/student';
}

export const load: PageServerLoad = async ({ locals, url }) => {
	const next = url.searchParams.get('next');
	if (locals.user) {
		throw redirect(302, isStaffRole(locals.user.role) ? '/admin' : safeNext(next));
	}
	return { next: safeNext(next) };
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const identifier = (formData.get('identifier') as string | null)?.trim() || '';
		const password = (formData.get('password') as string | null) || '';
		const next = safeNext(formData.get('next') as string | null);

		if (!identifier || !password) {
			return fail(400, { error: 'يرجى إدخال البريد الإلكتروني وكلمة المرور', identifier });
		}

		const user = await usersDatabase
			.select()
			.from(userSchema.users)
			.where(
				or(
					eq(userSchema.users.email, identifier.toLowerCase()),
					eq(userSchema.users.username, identifier)
				)
			)
			.get();

		if (!user) {
			return fail(401, { error: 'بيانات الدخول غير صحيحة', identifier });
		}
		if (!user.isActive) {
			return fail(403, { error: 'تم إيقاف هذا الحساب مؤقتاً. تواصل مع الإدارة.', identifier });
		}

		const verified = await verifyPassword(password, user.passwordHash);
		if (!verified.valid) {
			return fail(401, { error: 'بيانات الدخول غير صحيحة', identifier });
		}

		if (verified.needsRehash) {
			const upgradedHash = await hashPassword(password);
			await usersDatabase
				.update(userSchema.users)
				.set({ passwordHash: upgradedHash })
				.where(eq(userSchema.users.id, user.id));
		}

		const fp = getOrCreateFingerprint(event);
		migrateAnonymousProgressToUser(fp, user.id);

		const session = await createSession(user.id);
		setSessionTokenCookie(event, session.id, new Date(session.expiresAt));

		if (isStaffRole(user.role) && next === '/student') {
			throw redirect(302, '/admin');
		}
		throw redirect(302, next);
	}
};
