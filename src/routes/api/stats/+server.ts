import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { usersDatabase, userSchema } from '$lib/server/db';
import { eq, and, sql } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request }) => {
    const body = await request.json();
    const { docId, action } = body;

    if (!docId || !['view', 'download'].includes(action)) {
        throw error(400, 'docId و action (view|download) مطلوبة');
    }

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // Check if row exists for this doc+date
    const existing = await usersDatabase
        .select()
        .from(userSchema.viewStats)
        .where(
            and(
                eq(userSchema.viewStats.documentId, Number(docId)),
                eq(userSchema.viewStats.date, today)
            )
        )
        .get();

    if (existing) {
        if (action === 'view') {
            await usersDatabase
                .update(userSchema.viewStats)
                .set({ views: sql`views + 1` })
                .where(eq(userSchema.viewStats.id, existing.id));
        } else {
            await usersDatabase
                .update(userSchema.viewStats)
                .set({ downloads: sql`downloads + 1` })
                .where(eq(userSchema.viewStats.id, existing.id));
        }
    } else {
        await usersDatabase.insert(userSchema.viewStats).values({
            documentId: Number(docId),
            date: today,
            views: action === 'view' ? 1 : 0,
            downloads: action === 'download' ? 1 : 0
        });
    }

    return json({ success: true });
};
