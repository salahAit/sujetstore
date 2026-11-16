import type { PageServerLoad } from './$types';
import { contentSqlite } from '#lib/server/db';

export const load: PageServerLoad = async () => {
	const yearSubjects = contentSqlite
		.query(
			`
		SELECT
			ys.id as yearSubjectId, ys.year_id as yearId, ys.subject_id as subjectId,
			ys.stream_id as streamId, ys.coefficient as coefficient,
			st.name_ar as streamName,
			y.name_ar as yearName, y.slug as yearSlug,
			el.id as levelId, el.name_ar as levelName,
			s.name_ar as subjectName, s.slug as subjectSlug,
			(
				SELECT COUNT(*) FROM bank_exercises be WHERE be.year_subject_id = ys.id
			) as bankCount,
			(
				SELECT COUNT(DISTINCT q.id)
				FROM questions q
				JOIN question_categories qc ON q.category_id = qc.id
				WHERE qc.year_subject_id = ys.id
			) as questionCount
		FROM year_subjects ys
		JOIN years y ON ys.year_id = y.id
		JOIN education_levels el ON y.level_id = el.id
		JOIN subjects s ON ys.subject_id = s.id
		LEFT JOIN streams st ON ys.stream_id = st.id
		WHERE el.visibility = 'published'
			AND y.visibility = 'published'
			AND ys.visibility = 'published'
		GROUP BY ys.id
		ORDER BY el."order", y."order", ys."order", s.name_ar
	`
		)
		.all();

	const trimesters = contentSqlite.query('SELECT id, name_ar FROM trimesters ORDER BY "order"').all();

	return {
		yearSubjects,
		trimesters
	};
};
