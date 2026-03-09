import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { usersDatabase, userSchema } from '$lib/server/db/index';
import { createSession, setSessionTokenCookie } from '$lib/server/auth';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const load: PageServerLoad = async ({ locals }) => {
    // Already caught in hooks.server.ts but just in case
    if (locals.user) throw redirect(302, '/admin');
    return {};
};

export const actions: Actions = {
    default: async (event) => {
        const formData = await event.request.formData();
        const username = formData.get('username');
        const password = formData.get('password');

        if (
            typeof username !== 'string' ||
            username.length < 3 ||
            typeof password !== 'string' ||
            password.length < 6
        ) {
            return fail(400, {
                error: true,
                message: 'يجب إدخال اسم مستخدم وكلمة مرور صالحة.'
            });
        }

        const existingUser = await usersDatabase
            .select()
            .from(userSchema.users)
            .where(eq(userSchema.users.username, username))
            .get();

        if (!existingUser) {
            return fail(400, {
                error: true,
                message: 'اسم المستخدم أو كلمة المرور غير صحيحة.'
            });
        }

        const validPassword = await bcrypt.compare(password, existingUser.passwordHash);
        if (!validPassword) {
            return fail(400, {
                error: true,
                message: 'اسم المستخدم أو كلمة المرور غير صحيحة.'
            });
        }

        const session = await createSession(existingUser.id);
        setSessionTokenCookie(event, session.id, new Date(session.expiresAt));

        throw redirect(302, '/admin');
    }
};
