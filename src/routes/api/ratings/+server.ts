import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { usersDatabase, userSchema } from '#lib/server/db';
import { eq, and, avg, count, isNull } from 'drizzle-orm';
import { getOrCreateFingerprint } from '#lib/server/auth';

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

export const POST: RequestHandler = async (event) => {
	const body = await event.request.json();
	const docId = Number(body.docId);
	const rating = Number(body.rating);

	if (!docId || !rating || rating < 1 || rating > 5) {
		throw error(400, 'docId و rating (1-5) مطلوبة');
	}

	const userId = event.locals.user?.id ?? null;
	const fingerprint = getOrCreateFingerprint(event);

	const existing = await usersDatabase
		.select()
		.from(userSchema.ratings)
		.where(
			userId
				? and(eq(userSchema.ratings.documentId, docId), eq(userSchema.ratings.userId, userId))
				: and(
						eq(userSchema.ratings.documentId, docId),
						isNull(userSchema.ratings.userId),
						eq(userSchema.ratings.fingerprint, fingerprint)
					)
		)
		.get();

	if (existing) {
		await usersDatabase
			.update(userSchema.ratings)
			.set({ rating })
			.where(eq(userSchema.ratings.id, existing.id));
	} else {
		await usersDatabase.insert(userSchema.ratings).values({
			documentId: docId,
			userId,
			fingerprint,
			rating
		});
	}

	return json({ success: true });
};
