import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { contentSqlite, usersDatabase, userSchema, pgAll } from '#lib/server/db';
import { eq } from 'drizzle-orm';
import { ALGERIAN_WILAYAS } from '#lib/data/wilayas';

export const load: PageServerLoad = async ({ parent }) => {
	const { studentUser } = await parent();

	const [rawAttempts, badges, rawBookmarks] = await Promise.all([
		pgAll<any>(
			`
			SELECT id, quiz_id, score, total_points, percentage, time_taken, completed_at, created_at
			FROM quiz_attempts
			WHERE user_id = $1
			ORDER BY id DESC
			LIMIT 15
		`,
			[studentUser.id]
		),
		pgAll<any>(
			`
			SELECT bd.slug, bd.name_ar, bd.description, bd.icon, bd.color, bd.points, ub.earned_at
			FROM user_badges ub
			JOIN badge_definitions bd ON ub.badge_id = bd.id
			WHERE ub.user_id = $1
			ORDER BY ub.earned_at DESC
		`,
			[studentUser.id]
		),
		pgAll<any>(
			'SELECT id, item_type, item_id, created_at FROM user_bookmarks WHERE user_id = $1 ORDER BY id DESC LIMIT 20',
			[studentUser.id]
		)
	]);

	const quizIds = [...new Set(rawAttempts.map((a) => a.quiz_id).filter(Boolean))];
	const quizMap = new Map<number, any>();
	if (quizIds.length > 0) {
		const ph = quizIds.map(() => '?').join(',');
		const qRows = contentSqlite
			.query(
				`
			SELECT q.id, q.title_ar, q.title, q.slug, s.name_ar as subject_name, y.name_ar as year_name
			FROM quizzes q
			JOIN year_subjects ys ON q.year_subject_id = ys.id
			JOIN subjects s ON ys.subject_id = s.id
			JOIN years y ON ys.year_id = y.id
			WHERE q.id IN (${ph})
		`
			)
			.all(...quizIds) as any[];
		for (const r of qRows) quizMap.set(r.id, r);
	}

	const attempts = rawAttempts.map((a) => ({
		...a,
		quiz: quizMap.get(a.quiz_id) || null
	}));

	const docIds = rawBookmarks.filter((b) => b.item_type === 'document').map((b) => b.item_id);
	const bmQuizIds = rawBookmarks.filter((b) => b.item_type === 'quiz').map((b) => b.item_id);
	const docMap = new Map<number, any>();
	const bmQuizMap = new Map<number, any>();

	if (docIds.length > 0) {
		const ph = docIds.map(() => '?').join(',');
		const rows = contentSqlite
			.query(
				`
			SELECT d.id, d.title_ar, d.title, d.slug, d.type,
				el.slug as level_slug, y.slug as year_slug, s.slug as subject_slug, s.name_ar as subject_name
			FROM documents d
			JOIN year_subjects ys ON d.year_subject_id = ys.id
			JOIN years y ON ys.year_id = y.id
			JOIN education_levels el ON y.level_id = el.id
			JOIN subjects s ON ys.subject_id = s.id
			WHERE d.id IN (${ph})
		`
			)
			.all(...docIds) as any[];
		for (const r of rows) docMap.set(r.id, r);
	}

	if (bmQuizIds.length > 0) {
		const ph = bmQuizIds.map(() => '?').join(',');
		const rows = contentSqlite
			.query('SELECT id, title_ar, title, slug FROM quizzes WHERE id IN (' + ph + ')')
			.all(...bmQuizIds) as any[];
		for (const r of rows) bmQuizMap.set(r.id, r);
	}

	const bookmarks = rawBookmarks
		.map((b) => ({
			...b,
			item: b.item_type === 'document' ? docMap.get(b.item_id) : bmQuizMap.get(b.item_id)
		}))
		.filter((b) => b.item);

	const years = contentSqlite
		.query('SELECT id, name_ar, level_id FROM years ORDER BY "order"')
		.all();
	const streams = contentSqlite.query("SELECT id, name_ar FROM streams WHERE id != 'GEN' ORDER BY \"order\"").all();

	return {
		attempts,
		badges,
		bookmarks,
		years,
		streams,
		wilayas: ALGERIAN_WILAYAS
	};
};

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { error: 'غير مصرح' });
		const fd = await request.formData();
		const name = (fd.get('name') as string | null)?.trim() || '';
		const yearId = (fd.get('yearId') as string | null)?.trim() || null;
		const streamId = (fd.get('streamId') as string | null)?.trim() || null;
		const wilaya = (fd.get('wilaya') as string | null)?.trim() || null;

		if (name.length < 2) {
			return fail(400, { error: 'يرجى إدخال اسم صحيح' });
		}

		await usersDatabase
			.update(userSchema.users)
			.set({
				name,
				yearId,
				streamId,
				wilaya,
				updatedAt: new Date().toISOString()
			})
			.where(eq(userSchema.users.id, locals.user.id));

		return { profileSaved: true };
	}
};
