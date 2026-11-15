import type { PageServerLoad } from './$types';
import { contentSqlite } from '#lib/server/db';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const level = contentSqlite
		.query("SELECT * FROM education_levels WHERE slug = ? AND visibility IN ('published', 'coming_soon')")
		.get(params.level) as any;

	if (!level) {
		throw error(404, 'المرحلة غير موجودة أو مخفية حالياً');
	}

	const years =
		level.visibility === 'coming_soon'
			? []
			: contentSqlite
					.query(
						`
					SELECT y.*,
						(
							SELECT COUNT(DISTINCT ys.subject_id)
							FROM year_subjects ys
							WHERE ys.year_id = y.id AND ys.visibility = 'published'
						) as subjectCount,
						(
							SELECT COUNT(d.id)
							FROM documents d
							JOIN year_subjects ys ON d.year_subject_id = ys.id
							WHERE ys.year_id = y.id AND ys.visibility = 'published' AND d.is_published = 1
						) as docCount
					FROM years y
					WHERE y.level_id = ? AND y.visibility IN ('published', 'coming_soon')
					ORDER BY y."order"
				`
					)
					.all(level.id);

	return { level, years };
};
