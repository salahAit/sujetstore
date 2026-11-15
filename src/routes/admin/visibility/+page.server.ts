import type { PageServerLoad } from './$types';
import { getFullVisibilityTree, getSiteSettings } from '#lib/server/visibility';
import { contentSqlite } from '#lib/server/db';

export const load: PageServerLoad = async () => {
	const tree = getFullVisibilityTree();
	const settings = getSiteSettings();
	const summary = contentSqlite
		.query(
			`
		SELECT
			(SELECT COUNT(*) FROM education_levels WHERE visibility = 'published') as pubLevels,
			(SELECT COUNT(*) FROM years WHERE visibility = 'published') as pubYears,
			(SELECT COUNT(*) FROM year_subjects WHERE visibility = 'published') as pubSubjects,
			(SELECT COUNT(*) FROM documents WHERE is_published = 1) as pubDocs,
			(SELECT COUNT(*) FROM quizzes WHERE is_published = 1) as pubQuizzes
	`
		)
		.get() as Record<string, number>;

	return { tree, settings, summary };
};
