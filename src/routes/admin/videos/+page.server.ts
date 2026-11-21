import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { contentSqlite } from '#lib/server/db';
import { isStaffRole } from '#lib/server/auth';
import {
	parseTranscript,
	parseTimestampToSeconds,
	parseVideoUrl,
	serializeSegmentsToVtt
} from '#lib/modules/VideoStudio/transcript-parser';

function generateSlug(title: string): string {
	const ascii = title
		.toLowerCase()
		.replace(/[^\p{L}\p{N}\s-]/gu, '')
		.trim()
		.replace(/\s+/g, '-')
		.slice(0, 64);
	const suffix = Math.random().toString(36).slice(2, 7);
	return ascii ? `${ascii}-${suffix}` : `video-${Date.now()}`;
}

function normalizeTier(val: FormDataEntryValue | null): 'public' | 'registered' | 'premium' {
	if (val === 'registered' || val === 'premium') return val;
	return 'public';
}

export const load: PageServerLoad = async ({ url }) => {
	const rawVideos = contentSqlite
		.query(
			`SELECT v.*,
			        y.name_ar AS year_name_ar,
			        s.name_ar AS subject_name_ar,
			        st.name_ar AS stream_name_ar,
			        t.name_ar AS trimester_name_ar,
			        d.title_ar AS lesson_title_ar,
			        (SELECT COUNT(*) FROM video_transcript_segments seg WHERE seg.video_id = v.id) AS segment_count,
			        (SELECT COUNT(*) FROM video_cue_questions vcq WHERE vcq.video_id = v.id) AS cue_count
			 FROM videos v
			 JOIN year_subjects ys ON v.year_subject_id = ys.id
			 JOIN years y ON ys.year_id = y.id
			 JOIN subjects s ON ys.subject_id = s.id
			 LEFT JOIN streams st ON ys.stream_id = st.id
			 LEFT JOIN trimesters t ON v.trimester_id = t.id
			 LEFT JOIN documents d ON v.lesson_id = d.id
			 ORDER BY v.id DESC`
		)
		.all() as any[];

	const videos = rawVideos.map((v) => ({
		id: Number(v.id),
		yearSubjectId: Number(v.year_subject_id),
		trimesterId: (v.trimester_id as string | null) ?? null,
		lessonId: v.lesson_id ? Number(v.lesson_id) : null,
		slug: String(v.slug),
		title: String(v.title),
		titleAr: String(v.title_ar || v.title),
		description: (v.description as string | null) ?? '',
		provider: String(v.provider),
		externalId: String(v.external_id),
		embedUrl: String(v.embed_url),
		durationSec: Number(v.duration_sec || 0),
		thumbnailUrl: (v.thumbnail_url as string | null) ?? '',
		accessTier: String(v.access_tier || 'public'),
		isPublished: Boolean(v.is_published),
		createdAt: String(v.created_at || ''),
		yearNameAr: String(v.year_name_ar || ''),
		subjectNameAr: String(v.subject_name_ar || ''),
		streamNameAr: (v.stream_name_ar as string | null) ?? null,
		trimesterNameAr: (v.trimester_name_ar as string | null) ?? null,
		lessonTitleAr: (v.lesson_title_ar as string | null) ?? null,
		segmentCount: Number(v.segment_count || 0),
		cueCount: Number(v.cue_count || 0)
	}));

	const yearSubjects = contentSqlite
		.query(
			`SELECT ys.id, y.name_ar AS year_ar, s.name_ar AS subject_ar, st.name_ar AS stream_ar, el.name_ar AS level_ar
			 FROM year_subjects ys
			 JOIN years y ON ys.year_id = y.id
			 JOIN education_levels el ON y.level_id = el.id
			 JOIN subjects s ON ys.subject_id = s.id
			 LEFT JOIN streams st ON ys.stream_id = st.id
			 ORDER BY el."order", y."order", ys."order", s.name_ar`
		)
		.all() as Array<{
		id: number;
		year_ar: string;
		subject_ar: string;
		stream_ar: string | null;
		level_ar: string;
	}>;

	const trimesters = contentSqlite
		.query('SELECT id, name_ar FROM trimesters ORDER BY "order"')
		.all() as Array<{ id: string; name_ar: string }>;

	const lessons = contentSqlite
		.query(
			`SELECT id, year_subject_id, title_ar, title, slug
			 FROM documents
			 WHERE type = 'lesson'
			 ORDER BY id DESC
			 LIMIT 300`
		)
		.all() as Array<{
		id: number;
		year_subject_id: number;
		title_ar: string | null;
		title: string;
		slug: string;
	}>;

	const bankQuestions = contentSqlite
		.query(
			`SELECT q.id, q.type, q.difficulty, q.question_text, q.question_text_ar,
			        qc.name AS category_name, qc.year_subject_id
			 FROM questions q
			 LEFT JOIN question_categories qc ON q.category_id = qc.id
			 ORDER BY q.id DESC
			 LIMIT 500`
		)
		.all() as Array<{
		id: number;
		type: string;
		difficulty: string | null;
		question_text: string;
		question_text_ar: string | null;
		category_name: string | null;
		year_subject_id: number | null;
	}>;

	const rawCues = contentSqlite
		.query(
			`SELECT vcq.id, vcq.video_id, vcq.trigger_sec, vcq.question_id, vcq.is_mandatory, vcq.pause_video,
			        q.type, q.question_text, q.question_text_ar
			 FROM video_cue_questions vcq
			 JOIN questions q ON vcq.question_id = q.id
			 ORDER BY vcq.video_id, vcq.trigger_sec ASC`
		)
		.all() as any[];

	const cuesByVideo: Record<
		number,
		Array<{
			id: number;
			videoId: number;
			triggerSec: number;
			questionId: number;
			isMandatory: boolean;
			pauseVideo: boolean;
			type: string;
			questionPreview: string;
		}>
	> = {};

	for (const c of rawCues) {
		const vid = Number(c.video_id);
		if (!cuesByVideo[vid]) cuesByVideo[vid] = [];
		cuesByVideo[vid].push({
			id: Number(c.id),
			videoId: vid,
			triggerSec: Number(c.trigger_sec),
			questionId: Number(c.question_id),
			isMandatory: Boolean(c.is_mandatory),
			pauseVideo: Boolean(c.pause_video),
			type: String(c.type),
			questionPreview: String(c.question_text_ar || c.question_text || '').slice(0, 120)
		});
	}

	// If editing a specific video (?edit=<id>), preload its serialized transcript for editing
	const editIdParam = Number(url.searchParams.get('edit') || 0);
	let editingTranscriptVtt = '';
	if (editIdParam > 0) {
		const segs = contentSqlite
			.query(
				'SELECT start_sec, end_sec, text_ar FROM video_transcript_segments WHERE video_id = ? ORDER BY seq_index ASC'
			)
			.all(editIdParam) as Array<{ start_sec: number; end_sec: number; text_ar: string }>;
		editingTranscriptVtt = serializeSegmentsToVtt(
			segs.map((s) => ({
				startSec: Number(s.start_sec),
				endSec: Number(s.end_sec),
				textAr: String(s.text_ar)
			}))
		);
	}

	return {
		videos,
		yearSubjects,
		trimesters,
		lessons,
		bankQuestions,
		cuesByVideo,
		editingVideoId: editIdParam > 0 ? editIdParam : null,
		editingTranscriptVtt
	};
};

function saveSegmentsTx(videoId: number, rawTranscript: string): number {
	const segments = parseTranscript(rawTranscript);
	contentSqlite.exec('BEGIN');
	try {
		contentSqlite.query('DELETE FROM video_transcript_segments WHERE video_id = ?').run(videoId);
		const insertStmt = contentSqlite.query(
			`INSERT INTO video_transcript_segments (video_id, seq_index, start_sec, end_sec, text_ar, text_normalized)
			 VALUES (?, ?, ?, ?, ?, ?)`
		);
		for (const seg of segments) {
			insertStmt.run(
				videoId,
				seg.seqIndex,
				seg.startSec,
				seg.endSec,
				seg.textAr,
				seg.textNormalized
			);
		}
		contentSqlite.exec('COMMIT');
		return segments.length;
	} catch (err) {
		contentSqlite.exec('ROLLBACK');
		throw err;
	}
}

export const actions: Actions = {
	saveVideo: async ({ request, locals }) => {
		if (!isStaffRole(locals.user?.role)) {
			return fail(403, { error: 'غير مصرح لك بإدارة الفيديوهات.' });
		}

		const fd = await request.formData();
		const idRaw = Number(fd.get('id') || 0);
		const titleAr = String(fd.get('titleAr') || '').trim();
		const title = String(fd.get('title') || '').trim() || titleAr;
		const slugInput = String(fd.get('slug') || '').trim();
		const description = String(fd.get('description') || '').trim() || null;
		const yearSubjectId = Number(fd.get('yearSubjectId') || 0);
		const trimesterId = String(fd.get('trimesterId') || '').trim() || null;
		const lessonIdRaw = Number(fd.get('lessonId') || 0);
		const lessonId = lessonIdRaw > 0 ? lessonIdRaw : null;
		const videoUrl = String(fd.get('videoUrl') || '').trim();
		const durationInput = String(fd.get('durationSec') || '').trim();
		const manualThumb = String(fd.get('thumbnailUrl') || '').trim();
		const accessTier = normalizeTier(fd.get('accessTier'));
		const isPublished = fd.get('isPublished') === 'on' || fd.get('isPublished') === 'true';

		if (!titleAr || !yearSubjectId || !videoUrl) {
			return fail(400, {
				error: 'يرجى إدخال عنوان الفيديو، اختيار المادة/المستوى، ولصق رابط الفيديو.'
			});
		}

		const parsedUrl = parseVideoUrl(videoUrl);
		if (!parsedUrl) {
			return fail(400, {
				error: 'رابط الفيديو غير صالح. يرجى لصق رابط YouTube أو Cloudflare Stream أو رابط مباشر صالح.'
			});
		}

		const durationSec = parseTimestampToSeconds(durationInput) ?? 0;
		const thumbnailUrl = manualThumb || parsedUrl.thumbnailUrl || null;
		const slug = slugInput || generateSlug(title);

		// Read transcript from uploaded file (priority) or textarea
		let transcriptRaw = String(fd.get('transcriptRaw') || '');
		const uploadedFile = fd.get('transcriptFile');
		if (uploadedFile && typeof uploadedFile === 'object' && 'text' in uploadedFile && uploadedFile.size > 0) {
			transcriptRaw = await uploadedFile.text();
		}
		const replaceTranscript =
			fd.get('replaceTranscript') === 'true' || transcriptRaw.trim().length > 0;

		try {
			let savedVideoId = idRaw;

			if (idRaw > 0) {
				contentSqlite
					.query(
						`UPDATE videos
						 SET year_subject_id = ?, trimester_id = ?, lesson_id = ?, slug = ?,
						     title = ?, title_ar = ?, description = ?, provider = ?, external_id = ?,
						     embed_url = ?, duration_sec = ?, thumbnail_url = ?, access_tier = ?,
						     is_published = ?, updated_at = datetime('now')
						 WHERE id = ?`
					)
					.run(
						yearSubjectId,
						trimesterId,
						lessonId,
						slug,
						title,
						titleAr,
						description,
						parsedUrl.provider,
						parsedUrl.externalId,
						parsedUrl.embedUrl,
						durationSec,
						thumbnailUrl,
						accessTier,
						isPublished ? 1 : 0,
						idRaw
					);
			} else {
				const inserted = contentSqlite
					.query(
						`INSERT INTO videos (
							year_subject_id, trimester_id, lesson_id, slug, title, title_ar, description,
							provider, external_id, embed_url, duration_sec, thumbnail_url, access_tier,
							is_published, created_at, updated_at
						) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
						RETURNING id`
					)
					.get(
						yearSubjectId,
						trimesterId,
						lessonId,
						slug,
						title,
						titleAr,
						description,
						parsedUrl.provider,
						parsedUrl.externalId,
						parsedUrl.embedUrl,
						durationSec,
						thumbnailUrl,
						accessTier,
						isPublished ? 1 : 0
					) as { id: number };
				savedVideoId = Number(inserted.id);
			}

			let segCountMsg = '';
			if (replaceTranscript && savedVideoId > 0) {
				const count = saveSegmentsTx(savedVideoId, transcriptRaw);
				segCountMsg = ` (تم حفظ ${count} فقرة تفريغ نصي)`;
			}

			return {
				success: true,
				savedVideoId,
				message: `${idRaw > 0 ? 'تم تحديث الفيديو بنجاح' : 'تم إنشاء الفيديو التفاعلي بنجاح'}${segCountMsg}.`
			};
		} catch (err: any) {
			const msg = String(err?.message || '');
			if (msg.includes('UNIQUE constraint failed: videos.slug')) {
				return fail(400, { error: 'الرابط المختصر (Slug) مستخدم بالفعل لفيديو آخر.' });
			}
			console.error('[Admin Videos] saveVideo error:', err);
			return fail(500, { error: 'حدث خطأ أثناء حفظ الفيديو.' });
		}
	},

	deleteVideo: async ({ request, locals }) => {
		if (!isStaffRole(locals.user?.role)) {
			return fail(403, { error: 'غير مصرح لك بحذف الفيديوهات.' });
		}
		const fd = await request.formData();
		const id = Number(fd.get('id') || 0);
		if (!id) return fail(400, { error: 'معرف الفيديو مفقود.' });

		contentSqlite.query('DELETE FROM videos WHERE id = ?').run(id);
		return { success: true, message: 'تم حذف الفيديو وكافة فقراته وأسئلته التفاعلية.' };
	},

	saveTranscript: async ({ request, locals }) => {
		if (!isStaffRole(locals.user?.role)) {
			return fail(403, { error: 'غير مصرح لك بتعديل التفريغ النصي.' });
		}
		const fd = await request.formData();
		const videoId = Number(fd.get('videoId') || 0);
		if (!videoId) return fail(400, { error: 'معرف الفيديو مفقود.' });

		let raw = String(fd.get('transcriptRaw') || '');
		const uploadedFile = fd.get('transcriptFile');
		if (uploadedFile && typeof uploadedFile === 'object' && 'text' in uploadedFile && uploadedFile.size > 0) {
			raw = await uploadedFile.text();
		}

		const count = saveSegmentsTx(videoId, raw);
		return {
			success: true,
			message: `تم تحليل وحفظ ${count} فقرة في التفريغ النصي بنجاح.`
		};
	},

	addCue: async ({ request, locals }) => {
		if (!isStaffRole(locals.user?.role)) {
			return fail(403, { error: 'غير مصرح لك بإضافة أسئلة تفاعلية.' });
		}

		const fd = await request.formData();
		const videoId = Number(fd.get('videoId') || 0);
		const questionId = Number(fd.get('questionId') || 0);
		const triggerRaw = String(fd.get('triggerTime') || '').trim();
		const isMandatory = fd.get('isMandatory') === 'on' || fd.get('isMandatory') === 'true';
		const pauseVideo = fd.get('pauseVideo') === 'on' || fd.get('pauseVideo') === 'true';

		const triggerSec = parseTimestampToSeconds(triggerRaw);
		if (!videoId || !questionId || triggerSec === null) {
			return fail(400, {
				error: 'يرجى اختيار الفيديو، السؤال من بنك الأسئلة، وتحديد التوقيت بصيغة MM:SS (مثال 01:30).'
			});
		}

		contentSqlite
			.query(
				`INSERT INTO video_cue_questions (video_id, trigger_sec, question_id, is_mandatory, pause_video)
				 VALUES (?, ?, ?, ?, ?)`
			)
			.run(videoId, triggerSec, questionId, isMandatory ? 1 : 0, pauseVideo ? 1 : 0);

		return {
			success: true,
			message: `تم ربط السؤال التفاعلي عند الدقيقة ${triggerRaw} بنجاح.`
		};
	},

	deleteCue: async ({ request, locals }) => {
		if (!isStaffRole(locals.user?.role)) {
			return fail(403, { error: 'غير مصرح لك بحذف الأسئلة التفاعلية.' });
		}
		const fd = await request.formData();
		const cueId = Number(fd.get('cueId') || 0);
		if (!cueId) return fail(400, { error: 'معرف السؤال المربوط مفقود.' });

		contentSqlite.query('DELETE FROM video_cue_questions WHERE id = ?').run(cueId);
		return { success: true, message: 'تم فصل السؤال التفاعلي عن الفيديو.' };
	}
};
