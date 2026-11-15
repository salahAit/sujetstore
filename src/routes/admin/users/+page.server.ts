import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { usersDatabase, userSchema, usersSqlite } from '#lib/server/db';
import { eq } from 'drizzle-orm';
import { hashPassword } from '#lib/server/auth';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (locals.user?.role !== 'superadmin') {
		throw redirect(302, '/admin');
	}

	const q = (url.searchParams.get('q') || '').trim().toLowerCase();
	const roleFilter = (url.searchParams.get('role') || '').trim();

	let sql = `
		SELECT id, username, email, name, role, is_active, year_id, stream_id, wilaya,
			subscription_tier, subscription_expires_at, streak_days, created_at
		FROM users
		WHERE 1=1
	`;
	const params: any[] = [];
	if (q) {
		sql += ' AND (LOWER(name) LIKE ? OR LOWER(email) LIKE ?)';
		params.push(`%${q}%`, `%${q}%`);
	}
	if (['superadmin', 'admin', 'editor', 'student'].includes(roleFilter)) {
		sql += ' AND role = ?';
		params.push(roleFilter);
	}
	sql += ' ORDER BY id DESC LIMIT 100';

	const users = usersSqlite.query(sql).all(...params);

	return {
		users,
		q,
		roleFilter,
		currentUserId: locals.user.id
	};
};

export const actions: Actions = {
	createUser: async ({ request, locals }) => {
		if (locals.user?.role !== 'superadmin') return fail(403, { error: 'محصور بالمدير العام فقط' });
		const fd = await request.formData();
		const name = ((fd.get('name') as string | null) || '').trim();
		const email = ((fd.get('email') as string | null) || '').trim().toLowerCase();
		const password = (fd.get('password') as string | null) || '';
		const roleRaw = (fd.get('role') as string | null) || 'student';
		const role = (['superadmin', 'admin', 'editor', 'student'].includes(roleRaw)
			? roleRaw
			: 'student') as 'superadmin' | 'admin' | 'editor' | 'student';
		const tierRaw = (fd.get('subscriptionTier') as string | null) || 'free';
		const subscriptionTier = tierRaw === 'premium' ? 'premium' : 'free';
		const planDays = Math.max(0, Number(fd.get('planDays') || 0));

		if (name.length < 2 || !email.includes('@') || password.length < 6) {
			return fail(400, { error: 'يرجى التحقق من الاسم، البريد، وكلمة المرور (6 أحرف+)' });
		}

		const exists = await usersDatabase
			.select({ id: userSchema.users.id })
			.from(userSchema.users)
			.where(eq(userSchema.users.email, email))
			.get();
		if (exists) {
			return fail(400, { error: 'البريد الإلكتروني مستخدم بالفعل' });
		}

		const passwordHash = await hashPassword(password);
		const subscriptionExpiresAt =
			subscriptionTier === 'premium' && planDays > 0
				? new Date(Date.now() + planDays * 86400_000).toISOString()
				: null;

		await usersDatabase.insert(userSchema.users).values({
			name,
			email,
			passwordHash,
			role,
			isActive: true,
			subscriptionTier,
			subscriptionExpiresAt
		});

		return { userCreated: true };
	},

	updateUser: async ({ request, locals }) => {
		if (locals.user?.role !== 'superadmin') return fail(403, { error: 'محصور بالمدير العام فقط' });
		const fd = await request.formData();
		const id = Number(fd.get('id'));
		if (!id) return fail(400, { error: 'معرف المستخدم مفقود' });

		const roleRaw = (fd.get('role') as string | null) || 'student';
		const role = (['superadmin', 'admin', 'editor', 'student'].includes(roleRaw)
			? roleRaw
			: 'student') as 'superadmin' | 'admin' | 'editor' | 'student';
		const isActive = fd.get('isActive') === '1' || fd.get('isActive') === 'true';
		const tierRaw = (fd.get('subscriptionTier') as string | null) || 'free';
		const subscriptionTier = tierRaw === 'premium' ? 'premium' : 'free';
		const expiresRaw = ((fd.get('subscriptionExpiresAt') as string | null) || '').trim();
		const subscriptionExpiresAt =
			subscriptionTier === 'premium' && expiresRaw ? new Date(expiresRaw).toISOString() : null;

		if (id === locals.user.id && (role !== 'superadmin' || !isActive)) {
			return fail(400, { error: 'لا يمكنك تخفيض صلاحيتك أو تعطيل حسابك الحالي' });
		}

		await usersDatabase
			.update(userSchema.users)
			.set({
				role,
				isActive,
				subscriptionTier,
				subscriptionExpiresAt,
				updatedAt: new Date().toISOString()
			})
			.where(eq(userSchema.users.id, id));

		return { userUpdated: true };
	},

	resetPassword: async ({ request, locals }) => {
		if (locals.user?.role !== 'superadmin') return fail(403, { error: 'محصور بالمدير العام فقط' });
		const fd = await request.formData();
		const id = Number(fd.get('id'));
		const newPassword = (fd.get('newPassword') as string | null) || '';
		if (!id || newPassword.length < 6) {
			return fail(400, { error: 'كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل' });
		}

		const passwordHash = await hashPassword(newPassword);
		await usersDatabase
			.update(userSchema.users)
			.set({ passwordHash, updatedAt: new Date().toISOString() })
			.where(eq(userSchema.users.id, id));

		return { passwordReset: true };
	}
};
