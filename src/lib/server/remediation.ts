import { contentSqlite } from './db';

export type TrimesterCode = 't1' | 't2' | 't3';

export interface MistakeInputRow {
	id?: number;
	question_id?: number;
	questionId?: number;
	quiz_id?: number | null;
	quizId?: number | null;
	wrong_count?: number;
	wrongCount?: number;
	last_attempt_at?: string | Date | null;
	lastAttemptAt?: string | Date | null;
	resolved?: boolean | number | null;
}

export interface LessonMatch {
	lessonSlug: string;
	lessonTitle: string;
	lessonUrl: string;
}

export interface RecommendedLesson extends LessonMatch {
	titleAr: string;
	url: string;
}

export interface QuizPlayerQuestion {
	id: number;
	questionId: number;
	points: number;
	order: number;
	type: string;
	difficulty: string | null;
	questionText: string;
	questionTextAr: string | null;
	imageUrl: string | null;
	imageCaption: string | null;
	questionData: Record<string, any>;
	explanation: string | null;
}

export interface EnrichedMistakeMeta {
	id: number | null;
	questionId: number;
	quizId: number | null;
	wrongCount: number;
	lastAttemptAt: string | null;
	yearSubjectId: number | null;
	trimesterId: TrimesterCode | null;
	trimesterName: string | null;
	categoryName: string | null;
	subjectName: string | null;
	yearName: string | null;
	streamName: string | null;
	levelSlug: string | null;
	yearSlug: string | null;
	subjectSlug: string | null;
	lessonSlug: string | null;
	lessonTitle: string | null;
	lessonUrl: string | null;
}

export interface WeaknessArea {
	key: string;
	yearSubjectId: number | null;
	trimesterId: TrimesterCode | null;
	trimesterName: string | null;
	subjectName: string;
	yearName: string;
	streamName: string | null;
	levelSlug: string | null;
	yearSlug: string | null;
	subjectSlug: string | null;
	mistakeCount: number;
	totalWrongCount: number;
	recommendedLesson: RecommendedLesson | null;
	remediationQuestionIds: number[];
	remediationQuestions: QuizPlayerQuestion[];
}

export interface RemediationSummary {
	weaknessAreas: WeaknessArea[];
	enrichedMistakes: EnrichedMistakeMeta[];
	enrichedByQuestionId: Record<number, EnrichedMistakeMeta>;
	totalUnresolvedMistakes: number;
	totalWrongCount: number;
}

interface NormalizedMistake {
	id: number | null;
	questionId: number;
	quizId: number | null;
	wrongCount: number;
	lastAttemptAt: string | null;
}

interface RawQuestionContextRow {
	id: number;
	type: string;
	difficulty: string | null;
	questionText: string;
	questionTextAr: string | null;
	imageUrl: string | null;
	imageCaption: string | null;
	questionData: unknown;
	explanation: string | null;
	categoryName: string | null;
	yearSubjectId: number | null;
	streamId: string | null;
	streamName: string | null;
	yearId: string | null;
	yearSlug: string | null;
	yearName: string | null;
	levelId: string | null;
	levelSlug: string | null;
	subjectId: string | null;
	subjectSlug: string | null;
	subjectName: string | null;
}

interface QuizContextRow {
	quizId: number;
	questionId?: number;
	trimesterId: string | null;
	yearSubjectId: number | null;
	streamId: string | null;
	streamName: string | null;
	yearId: string | null;
	yearSlug: string | null;
	yearName: string | null;
	levelId: string | null;
	levelSlug: string | null;
	subjectId: string | null;
	subjectSlug: string | null;
	subjectName: string | null;
}

interface CandidateLessonRow {
	id: number;
	yearSubjectId: number;
	trimesterId: string | null;
	slug: string;
	title: string;
	titleAr: string | null;
}

const TRIMESTER_LABELS: Record<TrimesterCode, string> = {
	t1: 'الفصل الأول',
	t2: 'الفصل الثاني',
	t3: 'الفصل الثالث'
};

const STOP_WORDS = new Set([
	// Arabic common prompt/function words
	'من',
	'في',
	'على',
	'الي',
	'عن',
	'مع',
	'هذا',
	'هذه',
	'التي',
	'الذي',
	'الذين',
	'ما',
	'هو',
	'هي',
	'هم',
	'بين',
	'بعد',
	'قبل',
	'عند',
	'ثم',
	'او',
	'لا',
	'نعم',
	'ان',
	'كان',
	'تكون',
	'يكون',
	'كل',
	'اي',
	'كيف',
	'لماذا',
	'هل',
	'اذا',
	'اذن',
	'حيث',
	'بما',
	'فان',
	'عبارة',
	'السؤال',
	'الصحيح',
	'الصحيحه',
	'التاليه',
	'التالي',
	'الصوره',
	'اختر',
	'اكمل',
	'احسب',
	'اكتب',
	'تامل',
	'ضع',
	'اذكر',
	'بينما',
	'الاجابه',
	'فقط',
	// French / English common function words
	'the',
	'and',
	'for',
	'with',
	'that',
	'this',
	'from',
	'what',
	'which',
	'are',
	'was',
	'were',
	'les',
	'des',
	'une',
	'dans',
	'pour',
	'est',
	'sont',
	'que',
	'qui',
	'sur',
	'par',
	'avec',
	'pas',
	'plus'
]);

function normalizeTrimester(val: string | null | undefined): TrimesterCode | null {
	if (!val) return null;
	const lower = val.trim().toLowerCase();
	if (lower === 't1' || lower === 't2' || lower === 't3') {
		return lower;
	}
	return null;
}

/**
 * Extracts trimester code ('t1' | 't2' | 't3') from a question category name such as:
 * `بنك تمارين الرياضيات التوليدية — السنة الثانية ابتدائي (الفصل الأول) [math_pipeline:2ap:t1]`
 */
export function extractTrimesterFromCategory(categoryName: string | null | undefined): TrimesterCode | null {
	if (!categoryName) return null;

	const pipelineMatch = categoryName.match(/\[[^:\]]+:[^:\]]+:(t[123])\]/i);
	if (pipelineMatch?.[1]) {
		return normalizeTrimester(pipelineMatch[1]);
	}

	const bracketMatch = categoryName.match(/:(t[123])\]/i);
	if (bracketMatch?.[1]) {
		return normalizeTrimester(bracketMatch[1]);
	}

	if (categoryName.includes('الفصل الأول') || categoryName.includes('الفصل الاول')) return 't1';
	if (categoryName.includes('الفصل الثاني')) return 't2';
	if (categoryName.includes('الفصل الثالث')) return 't3';

	return null;
}

function parseQuestionData(raw: unknown): Record<string, any> {
	if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
		return raw as Record<string, any>;
	}
	if (typeof raw === 'string') {
		try {
			const parsed = JSON.parse(raw);
			if (parsed && typeof parsed === 'object') return parsed;
		} catch {
			return {};
		}
	}
	return {};
}

function normalizeTimestamp(val: string | Date | null | undefined): string | null {
	if (!val) return null;
	if (val instanceof Date) {
		return Number.isNaN(val.getTime()) ? null : val.toISOString();
	}
	return String(val);
}

function resolveDisplaySubjectName(
	levelId: string | null,
	subjectId: string | null,
	subjectName: string | null
): string | null {
	if (levelId === 'primaire' && subjectId === 'SCI-B') {
		return 'التربية العلمية والتكنولوجية';
	}
	return subjectName;
}

function resolveDisplayStreamName(streamId: string | null, streamName: string | null): string | null {
	if (!streamId || streamId === 'GEN' || !streamName) return null;
	return streamName;
}

function tokenizeForMatch(text: string): Set<string> {
	const cleaned = text
		.replace(/\$[^$]*\$/g, ' ') // strip inline LaTeX formulas
		.replace(/[\u064B-\u065F\u0670\u0640]/g, '') // strip Arabic diacritics & tatweel
		.replace(/[أإآ]/g, 'ا')
		.replace(/ة/g, 'ه')
		.replace(/ى/g, 'ي')
		.toLowerCase();

	const matches = cleaned.match(/[\u0621-\u064A]{2,}|[a-z]{3,}/g) ?? [];
	const tokens = new Set<string>();

	for (const rawTok of matches) {
		if (STOP_WORDS.has(rawTok)) continue;
		tokens.add(rawTok);
		if (rawTok.startsWith('ال') && rawTok.length >= 5) {
			const stripped = rawTok.slice(2);
			if (!STOP_WORDS.has(stripped)) {
				tokens.add(stripped);
			}
		}
	}

	return tokens;
}

function pickBestLesson(params: {
	yearSubjectId: number | null;
	trimesterId: TrimesterCode | null;
	levelSlug: string | null;
	yearSlug: string | null;
	subjectSlug: string | null;
	weightedTexts: Array<{ text: string; weight: number }>;
	lessonsByYearSubject: Map<number, CandidateLessonRow[]>;
}): LessonMatch | null {
	const {
		yearSubjectId,
		trimesterId,
		levelSlug,
		yearSlug,
		subjectSlug,
		weightedTexts,
		lessonsByYearSubject
	} = params;

	if (!yearSubjectId || !levelSlug || !yearSlug || !subjectSlug) {
		return null;
	}

	const allForYs = lessonsByYearSubject.get(yearSubjectId);
	if (!allForYs || allForYs.length === 0) {
		return null;
	}

	const trimesterMatches = trimesterId
		? allForYs.filter((doc) => normalizeTrimester(doc.trimesterId) === trimesterId)
		: [];
	const candidates = trimesterMatches.length > 0 ? trimesterMatches : allForYs;

	// Build weighted keyword map from mistake question texts & explanations
	const tokenWeights = new Map<string, number>();
	for (const entry of weightedTexts) {
		if (!entry.text) continue;
		const w = Math.max(1, entry.weight);
		for (const tok of tokenizeForMatch(entry.text)) {
			tokenWeights.set(tok, (tokenWeights.get(tok) ?? 0) + w);
		}
	}

	let bestDoc = candidates[0];
	let bestScore = -1;

	for (const doc of candidates) {
		const titleText = `${doc.titleAr || doc.title} ${doc.slug.replace(/-/g, ' ')}`;
		const lessonTokens = tokenizeForMatch(titleText);

		let score = 0;
		for (const tok of lessonTokens) {
			const weight = tokenWeights.get(tok);
			if (weight) {
				score += weight;
			}
		}

		// Slight penalty for generic end-of-trimester integration summary on ties
		const isIntegration = doc.slug.includes('integration') || (doc.titleAr || '').includes('إدماج وحصيلة');
		const adjustedScore = score > 0 ? score - (isIntegration ? 0.1 : 0) : isIntegration ? -0.1 : 0;

		if (adjustedScore > bestScore) {
			bestScore = adjustedScore;
			bestDoc = doc;
		}
	}

	const lessonTitle = bestDoc.titleAr || bestDoc.title;
	return {
		lessonSlug: bestDoc.slug,
		lessonTitle,
		lessonUrl: `/${levelSlug}/${yearSlug}/${subjectSlug}/${bestDoc.slug}`
	};
}

function toQuizPlayerQuestion(row: {
	id: number;
	type: string;
	difficulty: string | null;
	questionText: string;
	questionTextAr: string | null;
	imageUrl: string | null;
	imageCaption: string | null;
	questionData: unknown;
	explanation: string | null;
}, order: number): QuizPlayerQuestion {
	return {
		id: row.id,
		questionId: row.id,
		points: 1,
		order,
		type: row.type,
		difficulty: row.difficulty ?? null,
		questionText: row.questionText,
		questionTextAr: row.questionTextAr ?? null,
		imageUrl: row.imageUrl ?? null,
		imageCaption: row.imageCaption ?? null,
		questionData: parseQuestionData(row.questionData),
		explanation: row.explanation ?? null
	};
}

/**
 * Fetches formatted QuizPlayer-ready questions from read-only contentSqlite,
 * preserving the caller's requested question ID order.
 */
export function getRemediationQuizQuestions(questionIds: number[]): QuizPlayerQuestion[] {
	const uniqueIds: number[] = [];
	const seen = new Set<number>();

	for (const rawId of questionIds || []) {
		const id = Number(rawId);
		if (Number.isInteger(id) && id > 0 && !seen.has(id)) {
			seen.add(id);
			uniqueIds.push(id);
		}
	}

	if (uniqueIds.length === 0) {
		return [];
	}

	const placeholders = uniqueIds.map(() => '?').join(',');
	const rows = contentSqlite
		.query(
			`
			SELECT
				q.id,
				q.type,
				q.difficulty,
				q.question_text as questionText,
				q.question_text_ar as questionTextAr,
				q.image_url as imageUrl,
				q.image_caption as imageCaption,
				q.question_data as questionData,
				q.explanation
			FROM questions q
			WHERE q.id IN (${placeholders})
		`
		)
		.all(...uniqueIds) as Array<{
			id: number;
			type: string;
			difficulty: string | null;
			questionText: string;
			questionTextAr: string | null;
			imageUrl: string | null;
			imageCaption: string | null;
			questionData: unknown;
			explanation: string | null;
		}>;

	const byId = new Map<number, (typeof rows)[number]>();
	for (const row of rows) {
		byId.set(row.id, row);
	}

	const formatted: QuizPlayerQuestion[] = [];
	for (const id of uniqueIds) {
		const row = byId.get(id);
		if (!row) continue;
		formatted.push(toQuizPlayerQuestion(row, formatted.length + 1));
	}

	return formatted;
}

/**
 * Enriches unresolved mistake rows against content.db (read-only), finds the best
 * matching interactive lesson per mistake & topic, and groups mistakes into prioritized
 * adaptive weakness areas with targeted remediation question IDs (up to 5 per area).
 */
export function buildRemediationSummary(mistakes: MistakeInputRow[]): RemediationSummary {
	if (!Array.isArray(mistakes) || mistakes.length === 0) {
		return {
			weaknessAreas: [],
			enrichedMistakes: [],
			enrichedByQuestionId: {},
			totalUnresolvedMistakes: 0,
			totalWrongCount: 0
		};
	}

	// Normalize & deduplicate unresolved mistakes by questionId
	const mistakeMap = new Map<number, NormalizedMistake>();
	for (const raw of mistakes) {
		if (!raw || Boolean(raw.resolved)) continue;

		const questionId = Number(raw.question_id ?? raw.questionId);
		if (!Number.isInteger(questionId) || questionId <= 0) continue;

		const rawQuizId = raw.quiz_id ?? raw.quizId;
		const quizId =
			rawQuizId !== null && rawQuizId !== undefined && Number(rawQuizId) > 0
				? Number(rawQuizId)
				: null;
		const wrongCount = Math.max(1, Number(raw.wrong_count ?? raw.wrongCount ?? 1) || 1);
		const lastAttemptAt = normalizeTimestamp(raw.last_attempt_at ?? raw.lastAttemptAt);
		const id = raw.id !== undefined && raw.id !== null ? Number(raw.id) : null;

		const existing = mistakeMap.get(questionId);
		if (!existing) {
			mistakeMap.set(questionId, {
				id,
				questionId,
				quizId,
				wrongCount,
				lastAttemptAt
			});
		} else {
			existing.wrongCount += wrongCount;
			if (!existing.quizId && quizId) existing.quizId = quizId;
			if (
				lastAttemptAt &&
				(!existing.lastAttemptAt || lastAttemptAt > existing.lastAttemptAt)
			) {
				existing.lastAttemptAt = lastAttemptAt;
			}
		}
	}

	const normalizedMistakes = [...mistakeMap.values()];
	if (normalizedMistakes.length === 0) {
		return {
			weaknessAreas: [],
			enrichedMistakes: [],
			enrichedByQuestionId: {},
			totalUnresolvedMistakes: 0,
			totalWrongCount: 0
		};
	}

	const questionIds = normalizedMistakes.map((m) => m.questionId);
	const qPlaceholders = questionIds.map(() => '?').join(',');

	const qRows = contentSqlite
		.query(
			`
			SELECT
				q.id,
				q.type,
				q.difficulty,
				q.question_text as questionText,
				q.question_text_ar as questionTextAr,
				q.image_url as imageUrl,
				q.image_caption as imageCaption,
				q.question_data as questionData,
				q.explanation,
				qc.name as categoryName,
				ys.id as yearSubjectId,
				ys.stream_id as streamId,
				st.name_ar as streamName,
				y.id as yearId,
				y.slug as yearSlug,
				y.name_ar as yearName,
				el.id as levelId,
				el.slug as levelSlug,
				s.id as subjectId,
				s.slug as subjectSlug,
				s.name_ar as subjectName
			FROM questions q
			JOIN question_categories qc ON q.category_id = qc.id
			LEFT JOIN year_subjects ys ON qc.year_subject_id = ys.id
			LEFT JOIN years y ON ys.year_id = y.id
			LEFT JOIN education_levels el ON y.level_id = el.id
			LEFT JOIN subjects s ON ys.subject_id = s.id
			LEFT JOIN streams st ON ys.stream_id = st.id
			WHERE q.id IN (${qPlaceholders})
		`
		)
		.all(...questionIds) as RawQuestionContextRow[];

	const questionRowById = new Map<number, RawQuestionContextRow>();
	for (const row of qRows) {
		questionRowById.set(row.id, row);
	}

	// Fallback lookup via quizzes for questions whose category has year_subject_id IS NULL
	// or to infer trimester_id from quiz_id when category has no [pipeline:grade:tX] tag
	const quizIdsToLookup = [
		...new Set(
			normalizedMistakes
				.map((m) => m.quizId)
				.filter((qid): qid is number => qid !== null && qid > 0)
		)
	];
	const quizContextByQuizId = new Map<number, QuizContextRow>();

	if (quizIdsToLookup.length > 0) {
		const ph = quizIdsToLookup.map(() => '?').join(',');
		const quizRows = contentSqlite
			.query(
				`
				SELECT
					qz.id as quizId,
					qz.trimester_id as trimesterId,
					ys.id as yearSubjectId,
					ys.stream_id as streamId,
					st.name_ar as streamName,
					y.id as yearId,
					y.slug as yearSlug,
					y.name_ar as yearName,
					el.id as levelId,
					el.slug as levelSlug,
					s.id as subjectId,
					s.slug as subjectSlug,
					s.name_ar as subjectName
				FROM quizzes qz
				JOIN year_subjects ys ON qz.year_subject_id = ys.id
				JOIN years y ON ys.year_id = y.id
				JOIN education_levels el ON y.level_id = el.id
				JOIN subjects s ON ys.subject_id = s.id
				LEFT JOIN streams st ON ys.stream_id = st.id
				WHERE qz.id IN (${ph})
			`
			)
			.all(...quizIdsToLookup) as QuizContextRow[];

		for (const qr of quizRows) {
			quizContextByQuizId.set(qr.quizId, qr);
		}
	}

	const orphanQuestionIds = normalizedMistakes
		.filter((m) => {
			const qRow = questionRowById.get(m.questionId);
			if (!qRow || qRow.yearSubjectId) return false;
			if (m.quizId && quizContextByQuizId.has(m.quizId)) return false;
			return true;
		})
		.map((m) => m.questionId);

	const quizContextByQuestionId = new Map<number, QuizContextRow>();
	if (orphanQuestionIds.length > 0) {
		const ph = orphanQuestionIds.map(() => '?').join(',');
		const fallbackRows = contentSqlite
			.query(
				`
				SELECT
					qq.question_id as questionId,
					qz.id as quizId,
					qz.trimester_id as trimesterId,
					ys.id as yearSubjectId,
					ys.stream_id as streamId,
					st.name_ar as streamName,
					y.id as yearId,
					y.slug as yearSlug,
					y.name_ar as yearName,
					el.id as levelId,
					el.slug as levelSlug,
					s.id as subjectId,
					s.slug as subjectSlug,
					s.name_ar as subjectName
				FROM quiz_questions qq
				JOIN quizzes qz ON qq.quiz_id = qz.id
				JOIN year_subjects ys ON qz.year_subject_id = ys.id
				JOIN years y ON ys.year_id = y.id
				JOIN education_levels el ON y.level_id = el.id
				JOIN subjects s ON ys.subject_id = s.id
				LEFT JOIN streams st ON ys.stream_id = st.id
				WHERE qq.question_id IN (${ph})
				ORDER BY qz.is_published DESC, qz.id ASC
			`
			)
			.all(...orphanQuestionIds) as QuizContextRow[];

		for (const fr of fallbackRows) {
			if (fr.questionId && !quizContextByQuestionId.has(fr.questionId)) {
				quizContextByQuestionId.set(fr.questionId, fr);
			}
		}
	}

	// Resolve unified educational context for every existing mistake question
	interface ResolvedMistakeRecord {
		mistake: NormalizedMistake;
		qRow: RawQuestionContextRow;
		yearSubjectId: number | null;
		trimesterId: TrimesterCode | null;
		trimesterName: string | null;
		subjectName: string | null;
		yearName: string | null;
		streamName: string | null;
		levelSlug: string | null;
		yearSlug: string | null;
		subjectSlug: string | null;
		textForMatch: string;
	}

	const resolvedRecords: ResolvedMistakeRecord[] = [];
	const yearSubjectIdSet = new Set<number>();

	for (const m of normalizedMistakes) {
		const qRow = questionRowById.get(m.questionId);
		if (!qRow) continue;

		const directQuizCtx = m.quizId ? quizContextByQuizId.get(m.quizId) : undefined;
		const linkedQuizCtx = quizContextByQuestionId.get(m.questionId);
		const ctx = qRow.yearSubjectId ? qRow : (directQuizCtx ?? linkedQuizCtx ?? qRow);

		const yearSubjectId = ctx.yearSubjectId ?? null;
		if (yearSubjectId) {
			yearSubjectIdSet.add(yearSubjectId);
		}

		const trimesterId =
			extractTrimesterFromCategory(qRow.categoryName) ??
			normalizeTrimester(directQuizCtx?.trimesterId) ??
			normalizeTrimester(linkedQuizCtx?.trimesterId) ??
			null;

		const subjectName = resolveDisplaySubjectName(ctx.levelId, ctx.subjectId, ctx.subjectName);
		const streamName = resolveDisplayStreamName(ctx.streamId, ctx.streamName);
		const textForMatch = `${qRow.questionTextAr || qRow.questionText || ''} ${qRow.explanation || ''}`.trim();

		resolvedRecords.push({
			mistake: m,
			qRow,
			yearSubjectId,
			trimesterId,
			trimesterName: trimesterId ? TRIMESTER_LABELS[trimesterId] : null,
			subjectName,
			yearName: ctx.yearName ?? null,
			streamName,
			levelSlug: ctx.levelSlug ?? null,
			yearSlug: ctx.yearSlug ?? null,
			subjectSlug: ctx.subjectSlug ?? null,
			textForMatch
		});
	}

	// Single batch query for all published interactive lessons across affected year_subject_ids
	const lessonsByYearSubject = new Map<number, CandidateLessonRow[]>();
	if (yearSubjectIdSet.size > 0) {
		const ysIds = [...yearSubjectIdSet];
		const ysPh = ysIds.map(() => '?').join(',');
		const lessonRows = contentSqlite
			.query(
				`
				SELECT
					id,
					year_subject_id as yearSubjectId,
					trimester_id as trimesterId,
					slug,
					title,
					title_ar as titleAr
				FROM documents
				WHERE type = 'lesson'
					AND is_published = 1
					AND year_subject_id IN (${ysPh})
				ORDER BY id ASC
			`
			)
			.all(...ysIds) as CandidateLessonRow[];

		for (const doc of lessonRows) {
			const bucket = lessonsByYearSubject.get(doc.yearSubjectId);
			if (bucket) {
				bucket.push(doc);
			} else {
				lessonsByYearSubject.set(doc.yearSubjectId, [doc]);
			}
		}
	}

	// Build enriched per-mistake metadata AND group into weakness areas
	const enrichedMistakes: EnrichedMistakeMeta[] = [];
	const enrichedByQuestionId: Record<number, EnrichedMistakeMeta> = {};

	interface AreaAccumulator {
		key: string;
		yearSubjectId: number | null;
		trimesterId: TrimesterCode | null;
		trimesterName: string | null;
		subjectName: string;
		yearName: string;
		streamName: string | null;
		levelSlug: string | null;
		yearSlug: string | null;
		subjectSlug: string | null;
		totalWrongCount: number;
		records: ResolvedMistakeRecord[];
	}

	const areaMap = new Map<string, AreaAccumulator>();

	for (const rec of resolvedRecords) {
		const lessonMatch = pickBestLesson({
			yearSubjectId: rec.yearSubjectId,
			trimesterId: rec.trimesterId,
			levelSlug: rec.levelSlug,
			yearSlug: rec.yearSlug,
			subjectSlug: rec.subjectSlug,
			weightedTexts: [{ text: rec.textForMatch, weight: rec.mistake.wrongCount }],
			lessonsByYearSubject
		});

		const meta: EnrichedMistakeMeta = {
			id: rec.mistake.id,
			questionId: rec.mistake.questionId,
			quizId: rec.mistake.quizId,
			wrongCount: rec.mistake.wrongCount,
			lastAttemptAt: rec.mistake.lastAttemptAt,
			yearSubjectId: rec.yearSubjectId,
			trimesterId: rec.trimesterId,
			trimesterName: rec.trimesterName,
			categoryName: rec.qRow.categoryName ?? null,
			subjectName: rec.subjectName,
			yearName: rec.yearName,
			streamName: rec.streamName,
			levelSlug: rec.levelSlug,
			yearSlug: rec.yearSlug,
			subjectSlug: rec.subjectSlug,
			lessonSlug: lessonMatch?.lessonSlug ?? null,
			lessonTitle: lessonMatch?.lessonTitle ?? null,
			lessonUrl: lessonMatch?.lessonUrl ?? null
		};

		enrichedMistakes.push(meta);
		enrichedByQuestionId[meta.questionId] = meta;

		const groupKey = rec.yearSubjectId
			? `ys:${rec.yearSubjectId}:${rec.trimesterId ?? 'all'}`
			: rec.qRow.categoryName
				? `cat:${rec.qRow.categoryName}`
				: 'general';

		let acc = areaMap.get(groupKey);
		if (!acc) {
			acc = {
				key: groupKey,
				yearSubjectId: rec.yearSubjectId,
				trimesterId: rec.trimesterId,
				trimesterName: rec.trimesterName,
				subjectName: rec.subjectName || rec.qRow.categoryName || 'مراجعة عامة',
				yearName: rec.yearName || 'بنك الأسئلة',
				streamName: rec.streamName,
				levelSlug: rec.levelSlug,
				yearSlug: rec.yearSlug,
				subjectSlug: rec.subjectSlug,
				totalWrongCount: 0,
				records: []
			};
			areaMap.set(groupKey, acc);
		}

		acc.totalWrongCount += rec.mistake.wrongCount;
		acc.records.push(rec);
	}

	const weaknessAreas: WeaknessArea[] = [...areaMap.values()]
		.map((acc) => {
			// Prioritize the most frequently missed & most recent questions for the 5-question drill
			const sortedRecords = [...acc.records].sort((a, b) => {
				if (b.mistake.wrongCount !== a.mistake.wrongCount) {
					return b.mistake.wrongCount - a.mistake.wrongCount;
				}
				const timeA = a.mistake.lastAttemptAt ?? '';
				const timeB = b.mistake.lastAttemptAt ?? '';
				if (timeB !== timeA) {
					return timeB.localeCompare(timeA);
				}
				return a.mistake.questionId - b.mistake.questionId;
			});

			const topRecords = sortedRecords.slice(0, 5);
			const remediationQuestionIds = topRecords.map((r) => r.mistake.questionId);
			const remediationQuestions = topRecords.map((r, idx) => toQuizPlayerQuestion(r.qRow, idx + 1));

			const areaLesson = pickBestLesson({
				yearSubjectId: acc.yearSubjectId,
				trimesterId: acc.trimesterId,
				levelSlug: acc.levelSlug,
				yearSlug: acc.yearSlug,
				subjectSlug: acc.subjectSlug,
				weightedTexts: sortedRecords.map((r) => ({
					text: r.textForMatch,
					weight: r.mistake.wrongCount
				})),
				lessonsByYearSubject
			});

			const recommendedLesson: RecommendedLesson | null = areaLesson
				? {
						titleAr: areaLesson.lessonTitle,
						url: areaLesson.lessonUrl,
						lessonSlug: areaLesson.lessonSlug,
						lessonTitle: areaLesson.lessonTitle,
						lessonUrl: areaLesson.lessonUrl
					}
				: null;

			return {
				key: acc.key,
				yearSubjectId: acc.yearSubjectId,
				trimesterId: acc.trimesterId,
				trimesterName: acc.trimesterName,
				subjectName: acc.subjectName,
				yearName: acc.yearName,
				streamName: acc.streamName,
				levelSlug: acc.levelSlug,
				yearSlug: acc.yearSlug,
				subjectSlug: acc.subjectSlug,
				mistakeCount: acc.records.length,
				totalWrongCount: acc.totalWrongCount,
				recommendedLesson,
				remediationQuestionIds,
				remediationQuestions
			};
		})
		.sort((a, b) => {
			if (b.totalWrongCount !== a.totalWrongCount) {
				return b.totalWrongCount - a.totalWrongCount;
			}
			if (b.mistakeCount !== a.mistakeCount) {
				return b.mistakeCount - a.mistakeCount;
			}
			return a.key.localeCompare(b.key);
		});

	const totalWrongCount = enrichedMistakes.reduce((sum, m) => sum + m.wrongCount, 0);

	return {
		weaknessAreas,
		enrichedMistakes,
		enrichedByQuestionId,
		totalUnresolvedMistakes: enrichedMistakes.length,
		totalWrongCount
	};
}
