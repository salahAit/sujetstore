import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { contentSqlite, usersDatabase, userSchema } from '#lib/server/db';
import { eq } from 'drizzle-orm';
import {
	createSession,
	getOrCreateFingerprint,
	hashPassword,
	isStaffRole,
	setSessionTokenCookie
} from '#lib/server/auth';
import { migrateAnonymousProgressToUser } from '#lib/server/gamification';
import { ALGERIAN_WILAYAS } from '#lib/data/wilayas';

function safeNext(next: string | null): string {
	if (next && next.startsWith('/') && !next.startsWith('//')) return next;
	return '/student';
}

export const load: PageServerLoad = async ({ locals, url }) => {
	const next = url.searchParams.get('next');
	if (locals.user) {
		throw redirect(302, isStaffRole(locals.user.role) ? '/admin' : safeNext(next));
	}

	const years = contentSqlite
		.query(
			`
		SELECT y.id, y.name_ar, y.level_id, el.name_ar as level_name, y.visibility
		FROM years y
		JOIN education_levels el ON y.level_id = el.id
		ORDER BY el."order", y."order"
	`
		)
		.all();
	const streams = contentSqlite.query("SELECT id, name_ar FROM streams WHERE id != 'GEN' ORDER BY \"order\"").all();

	return {
		years,
		streams,
		wilayas: ALGERIAN_WILAYAS,
		next: safeNext(next)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const name = (formData.get('name') as string | null)?.trim() || '';
		const email = (formData.get('email') as string | null)?.trim().toLowerCase() || '';
		const password = (formData.get('password') as string | null) || '';
		const yearId = (formData.get('yearId') as string | null)?.trim() || null;
		const streamId = (formData.get('streamId') as string | null)?.trim() || null;
		const wilaya = (formData.get('wilaya') as string | null)?.trim() || null;
		const next = safeNext(formData.get('next') as string | null);

		if (name.length < 2) {
			return fail(400, { error: 'يرجى إدخال الاسم الكامل (حرفان على الأقل)', name, email });
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, { error: 'يرجى إدخال بريد إلكتروني صحيح', name, email });
		}
		if (password.length < 6) {
			return fail(400, { error: 'كلمة المرور يجب أن لا تقل عن 6 أحرف', name, email });
		}

		const existing = await usersDatabase
			.select({ id: userSchema.users.id })
			.from(userSchema.users)
			.where(eq(userSchema.users.email, email))
			.get();

		if (existing) {
			return fail(400, { error: 'هذا البريد الإلكتروني مسجل مسبقاً', name, email });
		}

		const passwordHash = await hashPassword(password);
		const created = await usersDatabase
			.insert(userSchema.users)
			.values({
				email,
				name,
				passwordHash,
				role: 'student',
				isActive: true,
				yearId,
				streamId,
				wilaya,
				subscriptionTier: 'free'
			})
			.returning()
			.get();

		const fp = getOrCreateFingerprint(event);
		migrateAnonymousProgressToUser(fp, created.id);

		const session = await createSession(created.id);
		setSessionTokenCookie(event, session.id, new Date(session.expiresAt));

		throw redirect(302, next);
	}
};
