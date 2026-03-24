import { json } from '@sveltejs/kit';
import { contentDatabase } from '$lib/server/db';
import { documents } from '$lib/server/db/schema-content';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
    const id = url.searchParams.get('id');
    if (!id) {
        return json({ success: false, error: 'Missing ID' }, { status: 400 });
    }

    try {
        const [doc] = await contentDatabase
            .select()
            .from(documents)
            .where(eq(documents.id, parseInt(id)))
            .limit(1);

        if (!doc || !doc.content) {
            return json({ success: false, error: 'Document not found or has no builder content' }, { status: 404 });
        }

        return json({
            success: true,
            document: JSON.parse(doc.content)
        });
    } catch (err: any) {
        return json({ success: false, error: err.message }, { status: 500 });
    }
};
