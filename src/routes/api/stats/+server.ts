import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { contentDatabase, contentSchema, usersDatabase, userSchema } from '#lib/server/db';
import { eq, and, sql } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const { docId, action } = body;

	const idNum = Number(docId);
	if (!Number.isInteger(idNum) || idNum <= 0 || !['view', 'download'].includes(action)) {
		throw error(400, 'docId و action (view|download) مطلوبة');
	}

	const today = new Date().toISOString().split('T')[0];

	const [existing] = await usersDatabase
		.select()
		.from(userSchema.viewStats)
		.where(and(eq(userSchema.viewStats.documentId, idNum), eq(userSchema.viewStats.date, today)))
		.limit(1);

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
			documentId: idNum,
			date: today,
			views: action === 'view' ? 1 : 0,
			downloads: action === 'download' ? 1 : 0
		});
	}

	if (action === 'download') {
		await contentDatabase
			.update(contentSchema.documents)
			.set({ downloadCount: sql`COALESCE(download_count, 0) + 1` })
			.where(eq(contentSchema.documents.id, idNum));
	}

	return json({ success: true });
};
