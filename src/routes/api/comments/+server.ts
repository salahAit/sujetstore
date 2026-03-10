import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { usersDatabase, userSchema } from '$lib/server/db';
import { eq, desc } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url }) => {
    const docId = url.searchParams.get('docId');
    if (!docId) throw error(400, 'docId مطلوب');

    const rows = await usersDatabase
        .select()
        .from(userSchema.comments)
        .where(eq(userSchema.comments.documentId, Number(docId)))
        .orderBy(desc(userSchema.comments.createdAt))
        .limit(50);

    return json({ comments: rows });
};

export const POST: RequestHandler = async ({ request }) => {
    const body = await request.json();
    const { docId, authorName, content } = body;

    if (!docId || !authorName?.trim() || !content?.trim()) {
        throw error(400, 'docId, authorName, content مطلوبة');
    }

    if (content.trim().length > 1000) {
        throw error(400, 'التعليق طويل جداً (حد 1000 حرف)');
    }

    const [row] = await usersDatabase
        .insert(userSchema.comments)
        .values({
            documentId: Number(docId),
            authorName: authorName.trim().slice(0, 50),
            content: content.trim()
        })
        .returning();

    return json({ comment: row }, { status: 201 });
};
