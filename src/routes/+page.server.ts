import type { PageServerLoad } from './$types';
import { contentSqlite } from '#lib/server/db';
import { getPublicLevels } from '#lib/server/visibility';

export const load: PageServerLoad = async () => {
	const levels = getPublicLevels();

	const stats = contentSqlite
		.query(
			`
		SELECT
			(
				SELECT COUNT(*) FROM documents d
				JOIN year_subjects ys ON d.year_subject_id = ys.id
				JOIN years y ON ys.year_id = y.id
				JOIN education_levels el ON y.level_id = el.id
				WHERE d.type = 'exam' AND d.is_published = 1
					AND el.visibility = 'published' AND y.visibility = 'published' AND ys.visibility = 'published'
			) as examCount,
			(
				SELECT COUNT(*) FROM documents d
				JOIN year_subjects ys ON d.year_subject_id = ys.id
				JOIN years y ON ys.year_id = y.id
				JOIN education_levels el ON y.level_id = el.id
				WHERE d.type = 'test' AND d.is_published = 1
					AND el.visibility = 'published' AND y.visibility = 'published' AND ys.visibility = 'published'
			) as testCount,
			(
				SELECT COUNT(*) FROM quizzes q
				JOIN year_subjects ys ON q.year_subject_id = ys.id
				JOIN years y ON ys.year_id = y.id
				JOIN education_levels el ON y.level_id = el.id
				WHERE q.is_published = 1
					AND el.visibility = 'published' AND y.visibility = 'published' AND ys.visibility = 'published'
			) as quizCount,
			(
				SELECT COUNT(*) FROM documents d
				JOIN year_subjects ys ON d.year_subject_id = ys.id
				JOIN years y ON ys.year_id = y.id
				JOIN education_levels el ON y.level_id = el.id
				WHERE d.is_published = 1
					AND el.visibility = 'published' AND y.visibility = 'published' AND ys.visibility = 'published'
			) as totalDocs,
			(
				SELECT COUNT(DISTINCT ys.subject_id) FROM year_subjects ys
				JOIN years y ON ys.year_id = y.id
				JOIN education_levels el ON y.level_id = el.id
				WHERE el.visibility = 'published' AND y.visibility = 'published' AND ys.visibility = 'published'
			) as subjectCount
	`
		)
		.get();

	return { levels, stats };
};
