import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { usersDatabase, userSchema } from '$lib/server/db';
import { eq, and, avg, count } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url }) => {
    const docId = url.searchParams.get('docId');
    if (!docId) throw error(400, 'docId مطلوب');

    const [stats] = await usersDatabase
        .select({
            average: avg(userSchema.ratings.rating),
            total: count(userSchema.ratings.id)
        })
        .from(userSchema.ratings)
        .where(eq(userSchema.ratings.documentId, Number(docId)));

    return json({
        average: stats?.average ? parseFloat(String(stats.average)) : 0,
        total: stats?.total || 0
    });
};

export const POST: RequestHandler = async ({ request, cookies }) => {
    const body = await request.json();
    const { docId, rating } = body;

    if (!docId || !rating || rating < 1 || rating > 5) {
        throw error(400, 'docId و rating (1-5) مطلوبة');
    }

    // Use cookie-based fingerprint for uniqueness
    let fingerprint = cookies.get('_fp');
    if (!fingerprint) {
        fingerprint = crypto.randomUUID();
        cookies.set('_fp', fingerprint, {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 365, // 1 year
            sameSite: 'lax'
        });
    }

    // Upsert: update if exists, insert if not
    const existing = await usersDatabase
        .select()
        .from(userSchema.ratings)
        .where(
            and(
                eq(userSchema.ratings.documentId, Number(docId)),
                eq(userSchema.ratings.fingerprint, fingerprint)
            )
        )
        .get();

    if (existing) {
        await usersDatabase
            .update(userSchema.ratings)
            .set({ rating: Number(rating) })
            .where(eq(userSchema.ratings.id, existing.id));
    } else {
        await usersDatabase.insert(userSchema.ratings).values({
            documentId: Number(docId),
            fingerprint,
            rating: Number(rating)
        });
    }

    return json({ success: true });
};
