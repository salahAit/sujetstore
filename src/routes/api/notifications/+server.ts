import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { usersDatabase, userSchema } from '$lib/server/db';
import { desc } from 'drizzle-orm';

export const GET: RequestHandler = async () => {
    const rows = await usersDatabase
        .select()
        .from(userSchema.notifications)
        .orderBy(desc(userSchema.notifications.createdAt))
        .limit(20);

    return json({ notifications: rows });
};

export const POST: RequestHandler = async ({ request, locals }) => {
    if (!locals.user || !['superadmin', 'admin'].includes(locals.user.role)) {
        throw error(403, 'غير مصرح');
    }

    const body = await request.json();
    const { title, bodyText, type, documentId } = body;

    if (!title?.trim()) {
        throw error(400, 'العنوان مطلوب');
    }

    const [row] = await usersDatabase
        .insert(userSchema.notifications)
        .values({
            title: title.trim(),
            body: bodyText?.trim() || null,
            type: type || 'announcement',
            documentId: documentId || null
        })
        .returning();

    return json({ notification: row }, { status: 201 });
};
