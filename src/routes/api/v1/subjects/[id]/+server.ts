import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { contentSqlite } from '#lib/server/db';
import { isStaffRole } from '#lib/server/auth';

export const GET: RequestHandler = async ({ params, locals }) => {
	const yearSubjectId = Number(params.id);
	if (!Number.isInteger(yearSubjectId) || yearSubjectId <= 0) {
		return json({ ok: false, error: 'معرّف المادة غير صالح' }, { status: 400 });
	}

	const subjectRow = contentSqlite
		.query(
			`
			SELECT
				ys.id,
				ys.year_id AS yearId,
				y.level_id AS levelId,
				y.name_ar AS yearNameAr,
				y.slug AS yearSlug,
				el.name_ar AS levelNameAr,
				el.slug AS levelSlug,
				ys.subject_id AS subjectId,
				ys.stream_id AS streamId,
				st.name_ar AS streamNameAr,
				ys.coefficient,
				ys."order" AS "order",
				ys.visibility,
				el.visibility AS levelVisibility,
				y.visibility AS yearVisibility,
				s.name,
				s.name_ar AS nameAr,
				s.name_fr AS nameFr,
				s.slug,
				s.exam_group AS examGroup,
				s.icon,
				s.color
			FROM year_subjects ys
			JOIN years y ON ys.year_id = y.id
			JOIN education_levels el ON y.level_id = el.id
			JOIN subjects s ON ys.subject_id = s.id
			LEFT JOIN streams st ON ys.stream_id = st.id
			WHERE ys.id = ?
			LIMIT 1
		`
		)
		.get(yearSubjectId) as Record<string, any> | null;

	if (!subjectRow) {
		return json({ ok: false, error: 'المادة غير موجودة' }, { status: 404 });
	}

	const staff = isStaffRole(locals.user?.role);
	if (
		!staff &&
		(subjectRow.visibility !== 'published' ||
			subjectRow.yearVisibility !== 'published' ||
			subjectRow.levelVisibility !== 'published')
	) {
		return json({ ok: false, error: 'هذه المادة غير متاحة حالياً' }, { status: 404 });
	}

	// Lightweight documents list: intentionally omits heavy `content` JSON column
	const rawDocs = contentSqlite
		.query(
			`
			SELECT
				d.id,
				d.year_subject_id AS yearSubjectId,
				d.trimester_id AS trimesterId,
				d.title,
				d.title_ar AS titleAr,
				d.slug,
				d.public_token AS publicToken,
				d.type,
				CASE WHEN d.pdf_url IS NOT NULL AND d.pdf_url != '' THEN 1 ELSE 0 END AS hasPdf,
				CASE WHEN (d.solution_url IS NOT NULL AND d.solution_url != '') OR d.has_solution = 1 THEN 1 ELSE 0 END AS hasSolution,
				d.file_size AS fileSize,
				d.source,
				d.academic_year AS academicYear,
				d.difficulty,
				d.origin_type AS originType,
				d.download_count AS downloadCount,
				d.access_tier AS accessTier,
				d.created_at AS createdAt,
				d.updated_at AS updatedAt
			FROM documents d
			WHERE d.year_subject_id = ? AND d.is_published = 1
			ORDER BY d.trimester_id ASC, d.created_at DESC, d.id DESC
		`
		)
		.all(yearSubjectId) as Array<Record<string, any>>;

	const documents = rawDocs.map((doc) => ({
		...doc,
		hasPdf: Boolean(doc.hasPdf),
		hasSolution: Boolean(doc.hasSolution)
	}));

	const quizzes = contentSqlite
		.query(
			`
			SELECT
				q.id,
				q.year_subject_id AS yearSubjectId,
				q.trimester_id AS trimesterId,
				q.title,
				q.title_ar AS titleAr,
				q.slug,
				q.description,
				q.difficulty,
				q.time_limit AS timeLimit,
				q.question_count AS questionCount,
				q.passing_score AS passingScore,
				q.practice_mode AS practiceMode,
				q.access_tier AS accessTier,
				q.is_premium AS isPremium,
				q.created_at AS createdAt
			FROM quizzes q
			WHERE q.year_subject_id = ? AND q.is_published = 1
			ORDER BY q.trimester_id ASC, q.id DESC
		`
		)
		.all(yearSubjectId) as Array<Record<string, any>>;

	const videos = contentSqlite
		.query(
			`
			SELECT
				v.id,
				v.year_subject_id AS yearSubjectId,
				v.trimester_id AS trimesterId,
				v.lesson_id AS lessonId,
				v.slug,
				v.title,
				v.title_ar AS titleAr,
				v.description,
				v.provider,
				v.external_id AS externalId,
				v.embed_url AS embedUrl,
				v.duration_sec AS durationSec,
				v.thumbnail_url AS thumbnailUrl,
				v.access_tier AS accessTier,
				v.created_at AS createdAt
			FROM videos v
			WHERE v.year_subject_id = ? AND v.is_published = 1
			ORDER BY v.trimester_id ASC, v.id DESC
		`
		)
		.all(yearSubjectId) as Array<Record<string, any>>;

	return json(
		{
			ok: true,
			data: {
				subject: {
					id: subjectRow.id,
					yearId: subjectRow.yearId,
					levelId: subjectRow.levelId,
					yearNameAr: subjectRow.yearNameAr,
					yearSlug: subjectRow.yearSlug,
					levelNameAr: subjectRow.levelNameAr,
					levelSlug: subjectRow.levelSlug,
					subjectId: subjectRow.subjectId,
					streamId: subjectRow.streamId,
					streamNameAr: subjectRow.streamNameAr,
					coefficient: subjectRow.coefficient,
					order: subjectRow.order,
					name: subjectRow.name,
					nameAr: subjectRow.nameAr,
					nameFr: subjectRow.nameFr,
					slug: subjectRow.slug,
					examGroup: subjectRow.examGroup,
					icon: subjectRow.icon,
					color: subjectRow.color
				},
				documents,
				quizzes: quizzes.map((q) => ({
					...q,
					practiceMode: Boolean(q.practiceMode),
					isPremium: Boolean(q.isPremium)
				})),
				videos
			}
		},
		{
			headers: {
				'Cache-Control': 'public, max-age=60'
			}
		}
	);
};
