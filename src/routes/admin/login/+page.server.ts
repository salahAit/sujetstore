import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { usersDatabase, userSchema } from '#lib/server/db/index';
import { createSession, setSessionTokenCookie, verifyPassword, hashPassword, isStaffRole } from '#lib/server/auth';
import { eq, or } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, isStaffRole(locals.user.role) ? '/admin' : '/student');
	}
	return {};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const identifier = formData.get('username');
		const password = formData.get('password');

		if (
			typeof identifier !== 'string' ||
			identifier.trim().length < 3 ||
			typeof password !== 'string' ||
			password.length < 6
		) {
			return fail(400, {
				error: true,
				message: 'يجب إدخال اسم مستخدم أو بريد إلكتروني وكلمة مرور صالحة.'
			});
		}

		const trimmed = identifier.trim();
		const [existingUser] = await usersDatabase
			.select()
			.from(userSchema.users)
			.where(or(eq(userSchema.users.username, trimmed), eq(userSchema.users.email, trimmed)))
			.limit(1);

		if (!existingUser || !existingUser.isActive) {
			return fail(400, {
				error: true,
				message: 'بيانات الدخول غير صحيحة أو أن الحساب معطل.'
			});
		}

		if (!isStaffRole(existingUser.role)) {
			return fail(403, {
				error: true,
				message: 'هذا الدخول مخصص لفريق الإدارة والمحررين فقط. يمكنك الدخول من بوابة التلميذ.'
			});
		}

		const { valid, needsRehash } = await verifyPassword(password, existingUser.passwordHash);
		if (!valid) {
			return fail(400, {
				error: true,
				message: 'اسم المستخدم أو كلمة المرور غير صحيحة.'
			});
		}

		if (needsRehash) {
			const upgradedHash = await hashPassword(password);
			await usersDatabase
				.update(userSchema.users)
				.set({ passwordHash: upgradedHash, updatedAt: new Date().toISOString() })
				.where(eq(userSchema.users.id, existingUser.id));
		}

		const session = await createSession(existingUser.id);
		setSessionTokenCookie(event, session.id, new Date(session.expiresAt));

		throw redirect(302, '/admin');
	}
};
