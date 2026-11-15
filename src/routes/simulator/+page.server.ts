import type { PageServerLoad } from './$types';
import { contentSqlite } from '#lib/server/db';

export const load: PageServerLoad = async () => {
	const years = contentSqlite
		.query(
			`
		SELECT y.id, y.name_ar, y.level_id, el.name_ar as level_name
		FROM years y
		JOIN education_levels el ON y.level_id = el.id
		ORDER BY el."order", y."order"
	`
		)
		.all();

	const yearSubjects = contentSqlite
		.query(
			`
		SELECT ys.year_id, ys.stream_id, ys.subject_id, ys.coefficient, s.name_ar as subject_name
		FROM year_subjects ys
		JOIN subjects s ON ys.subject_id = s.id
		ORDER BY ys.year_id, s.name_ar
	`
		)
		.all();

	const streams = contentSqlite.query("SELECT id, name_ar FROM streams WHERE id != 'GEN' ORDER BY \"order\"").all();

	return {
		years,
		yearSubjects,
		streams
	};
};
