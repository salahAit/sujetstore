import type { PageServerLoad } from './$types';
import { contentSqlite } from '#lib/server/db';
import { canAccessTier, getSiteSettings } from '#lib/server/visibility';
import { buildMediaActorKey, signMediaUrl } from '#lib/server/media-signing';
import { getClientIp } from '#lib/server/rate-limit';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const { params, url, locals } = event;
	const db = contentSqlite;
	const actorKey = buildMediaActorKey(locals.user?.id, getClientIp(event));
	const siteSettings = getSiteSettings();
	const dynamicPortalUrl = (siteSettings.dynamic_portal_url || '').replace(/\/$/, '');

	const level = db
		.query("SELECT * FROM education_levels WHERE slug = ? AND visibility = 'published'")
		.get(params.level) as any;
	if (!level) throw error(404, 'المرحلة غير متاحة حالياً');

	const year = db
		.query("SELECT * FROM years WHERE slug = ? AND level_id = ? AND visibility = 'published'")
		.get(params.year, level.id) as any;
	if (!year) throw error(404, 'السنة غير متاحة حالياً');

	const streamCheck = db
		.query(
			`
		SELECT s.*, ls.visibility as link_visibility
		FROM streams s
		JOIN level_streams ls ON ls.stream_id = s.id
		WHERE LOWER(s.id) = LOWER(?) AND ls.year_id = ? AND ls.visibility = 'published'
	`
		)
		.get(params.subject, year.id) as any;

	if (streamCheck) {
		const subjects = db
			.query(
				`
			SELECT s.*, ss.coefficient, ss."order" as sort_order,
				(
					SELECT COUNT(d.id) FROM documents d
					JOIN year_subjects ys ON d.year_subject_id = ys.id
					WHERE ys.year_id = ? AND ys.subject_id = s.id
						AND (ys.stream_id = ? OR ys.stream_id IS NULL)
						AND ys.visibility = 'published'
						AND d.is_published = 1
				) as docCount,
				(
					SELECT COUNT(q.id) FROM quizzes q
					JOIN year_subjects ys ON q.year_subject_id = ys.id
					WHERE ys.year_id = ? AND ys.subject_id = s.id
						AND (ys.stream_id = ? OR ys.stream_id IS NULL)
						AND ys.visibility = 'published'
						AND q.is_published = 1
				) as quizCount
			FROM stream_subjects ss
			JOIN subjects s ON ss.subject_id = s.id
			WHERE ss.stream_id = ? AND (ss.year_id = ? OR ss.year_id IS NULL) AND ss.visibility = 'published'
			ORDER BY ss."order"
		`
			)
			.all(year.id, streamCheck.id, year.id, streamCheck.id, streamCheck.id, year.id);

		return {
			mode: 'stream' as const,
			level,
			year,
			stream: streamCheck,
			subjects,
			dynamicPortalUrl
		};
	}

	const subject = db.query('SELECT * FROM subjects WHERE slug = ?').get(params.subject) as any;
	if (!subject) throw error(404, 'المادة غير موجودة');

	const streamParam = url.searchParams.get('stream')?.trim() || null;

	const yearSubjectRows = (
		streamParam
			? db
					.query(
						"SELECT * FROM year_subjects WHERE year_id = ? AND subject_id = ? AND (LOWER(stream_id) = LOWER(?) OR stream_id IS NULL) AND visibility = 'published'"
					)
					.all(year.id, subject.id, streamParam)
			: db
					.query("SELECT * FROM year_subjects WHERE year_id = ? AND subject_id = ? AND visibility = 'published'")
					.all(year.id, subject.id)
	) as any[];

	if (yearSubjectRows.length === 0) {
		throw error(404, 'المادة غير متاحة حالياً لهذه السنة');
	}

	const ysIds = yearSubjectRows.map((r) => r.id);
	const placeholders = ysIds.map(() => '?').join(',');
	const primaryYearSubject = yearSubjectRows[0];
	const resolvedStreamId = streamParam || (primaryYearSubject.stream_id && primaryYearSubject.stream_id !== 'GEN' ? primaryYearSubject.stream_id : null);
	const streamInfo = resolvedStreamId
		? (db.query('SELECT * FROM streams WHERE LOWER(id) = LOWER(?) LIMIT 1').get(resolvedStreamId) as any)
		: null;

	const trimesters = db.query('SELECT * FROM trimesters ORDER BY "order"').all();

	const rawDocuments = db
		.query(
			`
		SELECT id, year_subject_id, trimester_id, title, title_ar, slug, public_token, type,
			pdf_url, solution_url, file_size, source, academic_year, difficulty,
			origin_type, download_count, created_at, updated_at,
			is_published, is_published as isPublished,
			has_solution, has_solution as hasSolution,
			access_tier, access_tier as accessTier,
			CASE WHEN content IS NOT NULL AND LENGTH(content) > 2 THEN 1 ELSE 0 END as hasContent
		FROM documents
		WHERE year_subject_id IN (${placeholders}) AND is_published = 1
		ORDER BY trimester_id,
			CASE type
				WHEN 'test' THEN 1
				WHEN 'exam' THEN 2
				WHEN 'lesson' THEN 3
				WHEN 'summary' THEN 4
				WHEN 'exercise' THEN 5
				WHEN 'solution' THEN 6
				ELSE 7
			END,
			CASE WHEN origin_type = 'official_certificate' THEN 1 ELSE 0 END,
			id ASC
	`
		)
		.all(...ysIds) as any[];

	const documents = rawDocuments.map((d) => {
		const check = canAccessTier(d.accessTier, locals.user, locals.isStaticBuild);
		if (!check.allowed) {
			return {
				...d,
				pdf_url: null,
				solution_url: null,
				content: null,
				isLocked: true,
				lockReason: check.reason
			};
		}
		// Replace predictable PDF filenames with short-lived opaque HMAC-signed URLs
		const useOpaque = !locals.isStaticBuild && Boolean(d.public_token);
		return {
			...d,
			pdf_url:
				useOpaque && d.pdf_url
					? signMediaUrl({ token: d.public_token, kind: 'subject', actorKey, ttlSeconds: 900 })
					: d.pdf_url,
			solution_url:
				useOpaque && d.solution_url
					? signMediaUrl({ token: d.public_token, kind: 'solution', actorKey, ttlSeconds: 900 })
					: d.solution_url,
			isLocked: false,
			lockReason: null
		};
	});

	const rawQuizzes = db
		.query(
			`
		SELECT id, title, title_ar, slug, description, difficulty, time_limit, question_count, passing_score, trimester_id,
			is_premium as isPremium, is_published as isPublished, access_tier as accessTier
		FROM quizzes
		WHERE year_subject_id IN (${placeholders}) AND is_published = 1
		ORDER BY trimester_id, id DESC
	`
		)
		.all(...ysIds) as any[];

	const quizzes = rawQuizzes.map((q) => {
		const check = canAccessTier(q.accessTier || (q.isPremium ? 'premium' : 'public'), locals.user, locals.isStaticBuild);
		return {
			...q,
			isLocked: !check.allowed,
			lockReason: check.reason ?? null
		};
	});

	const displaySubject =
		level.id === 'primaire' && subject.id === 'SCI-B'
			? { ...subject, name_ar: 'التربية العلمية والتكنولوجية' }
			: subject;

	return {
		mode: 'subject' as const,
		level,
		year,
		subject: displaySubject,
		yearSubject: primaryYearSubject,
		streamFilter: streamParam,
		streamInfo,
		trimesters,
		documents,
		quizzes,
		dynamicPortalUrl,
		user: locals.user ? { role: locals.user.role, subscriptionTier: locals.user.subscriptionTier } : null
	};
};
