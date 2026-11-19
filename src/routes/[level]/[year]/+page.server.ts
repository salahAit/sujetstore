import type { PageServerLoad } from './$types';
import { contentSqlite } from '#lib/server/db';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const level = contentSqlite
		.query("SELECT * FROM education_levels WHERE slug = ? AND visibility = 'published'")
		.get(params.level) as any;
	if (!level) {
		throw error(404, 'المرحلة غير متاحة حالياً');
	}

	const year = contentSqlite
		.query("SELECT * FROM years WHERE slug = ? AND level_id = ? AND visibility IN ('published', 'coming_soon')")
		.get(params.year, level.id) as any;
	if (!year) {
		throw error(404, 'السنة غير متاحة حالياً');
	}

	if (year.visibility === 'coming_soon') {
		return { level, year, streams: [], subjects: [], isSecondary: false, comingSoon: true };
	}

	const streams = contentSqlite
		.query(
			`
		SELECT s.* FROM streams s
		JOIN level_streams ls ON ls.stream_id = s.id
		WHERE ls.year_id = ? AND ls.visibility = 'published'
		ORDER BY s."order"
	`
		)
		.all(year.id) as any[];

	if (streams.length > 0 && streams[0].id !== 'GEN') {
		const streamsWithCounts = streams.map((stream: any) => {
			const subjectCount = contentSqlite
				.query(
					`
				SELECT COUNT(DISTINCT ss.subject_id) as count
				FROM stream_subjects ss
				WHERE ss.stream_id = ?
					AND (ss.year_id = ? OR ss.year_id IS NULL)
					AND ss.visibility = 'published'
			`
				)
				.get(stream.id, year.id) as any;
			return { ...stream, subjectCount: subjectCount?.count || 0 };
		});

		return { level, year, streams: streamsWithCounts, subjects: [], isSecondary: true, comingSoon: false };
	}

	const rawSubjects = contentSqlite
		.query(
			`
		SELECT s.*, ys.id as yearSubjectId, ys.coefficient,
			(SELECT COUNT(d.id) FROM documents d WHERE d.year_subject_id = ys.id AND d.is_published = 1) as docCount,
			(SELECT COUNT(q.id) FROM quizzes q WHERE q.year_subject_id = ys.id AND q.is_published = 1) as quizCount
		FROM year_subjects ys
		JOIN subjects s ON ys.subject_id = s.id
		WHERE ys.year_id = ? AND ys.visibility = 'published'
		ORDER BY ys."order"
	`
		)
		.all(year.id) as any[];

	const subjects = rawSubjects.map((s) =>
		level.id === 'primaire' && s.id === 'SCI-B'
			? { ...s, name_ar: 'التربية العلمية والتكنولوجية' }
			: s
	);

	return { level, year, subjects, streams: [], isSecondary: false, comingSoon: false };
};
