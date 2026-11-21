import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { contentSqlite, pgGet } from '#lib/server/db';
import { isStaffRole } from '#lib/server/auth';
import { canAccessTier, getSiteSettings } from '#lib/server/visibility';
import { parseTimestampToSeconds, type VideoProvider } from '#lib/modules/VideoStudio/transcript-parser';

function stripAnswers(type: string, qd: any) {
	if (!qd || typeof qd !== 'object') return qd;
	const clone = JSON.parse(JSON.stringify(qd));
	if (type === 'mcq' && Array.isArray(clone.options)) {
		clone.options = clone.options.map((o: any) =>
			typeof o === 'object' ? { id: o.id, text: o.text, imageUrl: o.imageUrl } : o
		);
		delete clone.correctIndexes;
		delete clone.correctIndices;
	}
	delete clone.correctAnswer;
	delete clone.correct;
	delete clone.answer;
	delete clone.answers;
	delete clone.acceptedAnswers;
	delete clone.correctIndex;
	delete clone.correctOrder;
	delete clone.correctZone;
	delete clone.correctAnswers;
	delete clone.keywords;
	delete clone.acceptedKeywords;
	if (Array.isArray(clone.labels)) {
		clone.labels = clone.labels.map((l: any) => ({ text: l.text }));
	}
	return clone;
}

function parseAnsweredCueIds(raw: string | null | undefined): number[] {
	if (!raw) return [];
	try {
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		const ids: number[] = [];
		for (const item of parsed) {
			if (typeof item === 'number') {
				ids.push(item);
			} else if (item && typeof item === 'object' && typeof item.cueId === 'number' && item.isCorrect) {
				ids.push(item.cueId);
			}
		}
		return ids;
	} catch {
		return [];
	}
}

export const load: PageServerLoad = async ({ params, url, locals }) => {
	const slug = params.slug;
	const siteSettings = getSiteSettings();
	const dynamicPortalUrl = (siteSettings.dynamic_portal_url || '').replace(/\/$/, '');

	const row = contentSqlite
		.query(
			`SELECT v.*,
			        ys.visibility AS ys_visibility,
			        s.id AS subject_id, s.name_ar AS subject_name_ar, s.slug AS subject_slug,
			        y.id AS year_id, y.name_ar AS year_name_ar, y.slug AS year_slug, y.visibility AS year_visibility,
			        el.id AS level_id, el.name_ar AS level_name_ar, el.slug AS level_slug, el.visibility AS level_visibility,
			        t.name_ar AS trimester_name_ar,
			        d.id AS linked_lesson_id, d.title_ar AS linked_lesson_title_ar, d.title AS linked_lesson_title, d.slug AS linked_lesson_slug
			 FROM videos v
			 JOIN year_subjects ys ON v.year_subject_id = ys.id
			 JOIN subjects s ON ys.subject_id = s.id
			 JOIN years y ON ys.year_id = y.id
			 JOIN education_levels el ON y.level_id = el.id
			 LEFT JOIN trimesters t ON v.trimester_id = t.id
			 LEFT JOIN documents d ON v.lesson_id = d.id
			 WHERE v.slug = ?
			 LIMIT 1`
		)
		.get(slug) as any;

	if (!row) {
		throw error(404, 'الفيديو غير موجود');
	}

	const staff = isStaffRole(locals.user?.role);
	if (
		!staff &&
		(!row.is_published ||
			row.level_visibility !== 'published' ||
			row.year_visibility !== 'published' ||
			row.ys_visibility !== 'published')
	) {
		throw error(404, 'هذا الفيديو غير متاح حالياً');
	}

	const video = {
		id: Number(row.id),
		yearSubjectId: Number(row.year_subject_id),
		trimesterId: row.trimester_id as string | null,
		trimesterNameAr: row.trimester_name_ar as string | null,
		slug: String(row.slug),
		title: String(row.title),
		titleAr: String(row.title_ar || row.title),
		description: (row.description as string | null) ?? null,
		provider: (row.provider as VideoProvider) || 'youtube',
		externalId: String(row.external_id),
		embedUrl: String(row.embed_url),
		durationSec: Number(row.duration_sec || 0),
		thumbnailUrl: (row.thumbnail_url as string | null) ?? null,
		accessTier: String(row.access_tier || 'public'),
		isPublished: Boolean(row.is_published),
		createdAt: String(row.created_at || '')
	};

	const breadcrumb = {
		level: { id: String(row.level_id), nameAr: String(row.level_name_ar), slug: String(row.level_slug) },
		year: { id: String(row.year_id), nameAr: String(row.year_name_ar), slug: String(row.year_slug) },
		subject: {
			id: String(row.subject_id),
			nameAr: String(row.subject_name_ar),
			slug: String(row.subject_slug)
		}
	};

	const linkedLesson = row.linked_lesson_slug
		? {
				id: Number(row.linked_lesson_id),
				title: String(row.linked_lesson_title_ar || row.linked_lesson_title || 'الدرس التفاعلي'),
				href: `/${breadcrumb.level.slug}/${breadcrumb.year.slug}/${breadcrumb.subject.slug}/${row.linked_lesson_slug}`
			}
		: null;

	const accessCheck = canAccessTier(video.accessTier, locals.user, locals.isStaticBuild);
	if (!accessCheck.allowed) {
		return {
			video,
			breadcrumb,
			linkedLesson,
			segments: [],
			cueQuestions: [],
			relatedVideos: [],
			initialStartSec: 0,
			initialAnsweredCueIds: [] as number[],
			isLocked: true,
			lockReason: accessCheck.reason ?? 'auth_required',
			dynamicPortalUrl,
			isAuthenticated: Boolean(locals.user)
		};
	}

	const rawSegments = contentSqlite
		.query(
			`SELECT id, seq_index, start_sec, end_sec, text_ar, text_normalized
			 FROM video_transcript_segments
			 WHERE video_id = ?
			 ORDER BY seq_index ASC, start_sec ASC`
		)
		.all(video.id) as any[];

	const segments = rawSegments.map((s) => ({
		id: Number(s.id),
		seqIndex: Number(s.seq_index),
		startSec: Number(s.start_sec),
		endSec: Number(s.end_sec),
		textAr: String(s.text_ar),
		textNormalized: String(s.text_normalized || '')
	}));

	const rawCues = contentSqlite
		.query(
			`SELECT vcq.id, vcq.trigger_sec, vcq.question_id, vcq.is_mandatory, vcq.pause_video,
			        q.type, q.difficulty, q.question_text, q.question_text_ar,
			        q.image_url, q.image_caption, q.question_data
			 FROM video_cue_questions vcq
			 JOIN questions q ON vcq.question_id = q.id
			 WHERE vcq.video_id = ?
			 ORDER BY vcq.trigger_sec ASC, vcq.id ASC`
		)
		.all(video.id) as any[];

	const cueQuestions = rawCues.map((c) => {
		let parsedData = c.question_data;
		if (typeof parsedData === 'string') {
			try {
				parsedData = JSON.parse(parsedData);
			} catch {
				parsedData = {};
			}
		}
		return {
			id: Number(c.id),
			triggerSec: Number(c.trigger_sec),
			questionId: Number(c.question_id),
			isMandatory: Boolean(c.is_mandatory),
			pauseVideo: Boolean(c.pause_video),
			type: String(c.type),
			difficulty: (c.difficulty as string | null) ?? null,
			questionText: String(c.question_text || ''),
			questionTextAr: (c.question_text_ar as string | null) ?? null,
			imageUrl: (c.image_url as string | null) ?? null,
			imageCaption: (c.image_caption as string | null) ?? null,
			questionData: stripAnswers(String(c.type), parsedData)
		};
	});

	let savedPositionSec = 0;
	let initialAnsweredCueIds: number[] = [];

	if (locals.user && !locals.isStaticBuild) {
		try {
			const progress = await pgGet<{
				last_position_sec: number;
				completed: boolean;
				answered_cues_json: string;
			}>(
				'SELECT last_position_sec, completed, answered_cues_json FROM video_watch_progress WHERE user_id = $1 AND video_id = $2 LIMIT 1',
				[locals.user.id, video.id]
			);
			if (progress) {
				savedPositionSec = Number(progress.last_position_sec || 0);
				initialAnsweredCueIds = parseAnsweredCueIds(progress.answered_cues_json);
			}
		} catch {
			// Continue cleanly without progress if DB query fails
		}
	}

	const tParam = parseTimestampToSeconds(url.searchParams.get('t'));
	const initialStartSec = tParam !== null ? tParam : savedPositionSec;

	const relatedRaw = contentSqlite
		.query(
			`SELECT id, slug, title_ar, title, duration_sec, thumbnail_url, provider
			 FROM videos
			 WHERE year_subject_id = ? AND id != ? AND is_published = 1
			 ORDER BY id DESC
			 LIMIT 6`
		)
		.all(video.yearSubjectId, video.id) as any[];

	const relatedVideos = relatedRaw.map((r) => ({
		id: Number(r.id),
		slug: String(r.slug),
		titleAr: String(r.title_ar || r.title),
		durationSec: Number(r.duration_sec || 0),
		thumbnailUrl: (r.thumbnail_url as string | null) ?? null,
		provider: String(r.provider || 'youtube')
	}));

	return {
		video,
		breadcrumb,
		linkedLesson,
		segments,
		cueQuestions,
		relatedVideos,
		initialStartSec,
		initialAnsweredCueIds,
		isLocked: false,
		lockReason: null,
		dynamicPortalUrl,
		isAuthenticated: Boolean(locals.user)
	};
};
