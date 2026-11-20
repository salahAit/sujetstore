import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { contentSqlite, usersDatabase, userSchema } from '#lib/server/db';
import { and, eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url, locals }) => {
	const idsParam = url.searchParams.get('ids');
	let ids: number[] = [];

	if (idsParam) {
		ids = idsParam
			.split(',')
			.map((id) => parseInt(id, 10))
			.filter((id) => !isNaN(id));
	} else if (locals.user) {
		const saved = await usersDatabase
			.select()
			.from(userSchema.userBookmarks)
			.where(
				and(
					eq(userSchema.userBookmarks.userId, locals.user.id),
					eq(userSchema.userBookmarks.itemType, 'document')
				)
			);
		ids = saved.map((s) => s.itemId);
	}

	if (ids.length === 0) return json({ documents: [] });

	const placeholders = ids.map(() => '?').join(',');
	const documents = contentSqlite
		.query(
			`
		SELECT
			d.id, d.title, d.title_ar, d.type, d.slug, d.pdf_url, d.solution_url, d.access_tier,
			s.name_ar as subject_name, s.slug as subject_slug,
			y.name_ar as year_name, y.slug as year_slug,
			el.name_ar as level_name, el.slug as level_slug
		FROM documents d
		JOIN year_subjects ys ON d.year_subject_id = ys.id
		JOIN years y ON ys.year_id = y.id
		JOIN education_levels el ON y.level_id = el.id
		JOIN subjects s ON ys.subject_id = s.id
		WHERE d.id IN (${placeholders})
			AND d.is_published = 1
			AND el.visibility = 'published'
			AND y.visibility = 'published'
			AND ys.visibility = 'published'
	`
		)
		.all(...ids);

	return json({ documents });
};

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		return json({ error: 'غير مصرح' }, { status: 401 });
	}

	const body = await request.json();
	const itemId = Number(body.itemId);
	const itemType = body.itemType === 'quiz' ? 'quiz' : 'document';
	if (!Number.isInteger(itemId) || itemId <= 0) {
		return json({ error: 'معرف العنصر غير صالح' }, { status: 400 });
	}

	const [existing] = await usersDatabase
		.select()
		.from(userSchema.userBookmarks)
		.where(
			and(
				eq(userSchema.userBookmarks.userId, locals.user.id),
				eq(userSchema.userBookmarks.itemType, itemType),
				eq(userSchema.userBookmarks.itemId, itemId)
			)
		)
		.limit(1);

	if (existing) {
		await usersDatabase
			.delete(userSchema.userBookmarks)
			.where(eq(userSchema.userBookmarks.id, existing.id));
		return json({ saved: false });
	}

	await usersDatabase.insert(userSchema.userBookmarks).values({
		userId: locals.user.id,
		itemType,
		itemId
	});

	return json({ saved: true });
};
