import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { contentSqlite } from '#lib/server/db';

export const GET: RequestHandler = async () => {
	const levels = contentSqlite
		.query(
			`
			SELECT
				el.id,
				el.name,
				el.name_ar AS nameAr,
				el.name_fr AS nameFr,
				el.slug,
				el.description,
				el.icon,
				el.color,
				el."order" AS "order",
				el.visibility,
				(
					SELECT COUNT(DISTINCT y.id)
					FROM years y
					WHERE y.level_id = el.id AND y.visibility = 'published'
				) AS yearCount,
				(
					SELECT COUNT(d.id)
					FROM documents d
					JOIN year_subjects ys ON d.year_subject_id = ys.id
					JOIN years y ON ys.year_id = y.id
					WHERE y.level_id = el.id
						AND el.visibility = 'published'
						AND y.visibility = 'published'
						AND ys.visibility = 'published'
						AND d.is_published = 1
				) AS docCount,
				(
					SELECT COUNT(q.id)
					FROM quizzes q
					JOIN year_subjects ys ON q.year_subject_id = ys.id
					JOIN years y ON ys.year_id = y.id
					WHERE y.level_id = el.id
						AND el.visibility = 'published'
						AND y.visibility = 'published'
						AND ys.visibility = 'published'
						AND q.is_published = 1
				) AS quizCount
			FROM education_levels el
			WHERE el.visibility IN ('published', 'coming_soon')
			ORDER BY el."order" ASC
		`
		)
		.all() as Array<Record<string, unknown>>;

	const years = contentSqlite
		.query(
			`
			SELECT
				y.id,
				y.level_id AS levelId,
				y.name,
				y.name_ar AS nameAr,
				y.name_fr AS nameFr,
				y.slug,
				y."order" AS "order",
				y.stream,
				y.visibility
			FROM years y
			JOIN education_levels el ON y.level_id = el.id
			WHERE el.visibility IN ('published', 'coming_soon')
				AND y.visibility IN ('published', 'coming_soon')
			ORDER BY el."order" ASC, y."order" ASC
		`
		)
		.all() as Array<Record<string, unknown>>;

	const streams = contentSqlite
		.query(
			`
			SELECT
				st.id,
				st.name,
				st.name_ar AS nameAr,
				st.name_fr AS nameFr,
				st."order" AS "order"
			FROM streams st
			ORDER BY st."order" ASC
		`
		)
		.all() as Array<Record<string, unknown>>;

	const subjects = contentSqlite
		.query(
			`
			SELECT
				ys.id,
				ys.year_id AS yearId,
				y.level_id AS levelId,
				ys.subject_id AS subjectId,
				ys.stream_id AS streamId,
				ys.coefficient,
				ys."order" AS "order",
				ys.visibility,
				s.name,
				s.name_ar AS nameAr,
				s.name_fr AS nameFr,
				s.slug,
				s.exam_group AS examGroup,
				s.icon,
				s.color,
				(
					SELECT COUNT(*)
					FROM documents d
					WHERE d.year_subject_id = ys.id AND d.is_published = 1
				) AS docCount,
				(
					SELECT COUNT(*)
					FROM quizzes q
					WHERE q.year_subject_id = ys.id AND q.is_published = 1
				) AS quizCount,
				(
					SELECT COUNT(*)
					FROM videos v
					WHERE v.year_subject_id = ys.id AND v.is_published = 1
				) AS videoCount
			FROM year_subjects ys
			JOIN years y ON ys.year_id = y.id
			JOIN education_levels el ON y.level_id = el.id
			JOIN subjects s ON ys.subject_id = s.id
			WHERE el.visibility = 'published'
				AND y.visibility = 'published'
				AND ys.visibility = 'published'
			ORDER BY el."order" ASC, y."order" ASC, ys."order" ASC, s.name_ar ASC
		`
		)
		.all() as Array<Record<string, unknown>>;

	return json(
		{
			ok: true,
			data: {
				levels,
				years,
				streams,
				publishedSubjectsCount: subjects.length,
				subjects
			}
		},
		{
			headers: {
				'Cache-Control': 'public, max-age=120'
			}
		}
	);
};
