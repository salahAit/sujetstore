import { Database } from 'bun:sqlite';
import { resolve } from 'node:path';

export interface SearchIndexBuildResult {
	total: number;
	documents: number;
	quizzes: number;
	durationMs: number;
}

const ARABIC_DIACRITICS_RE = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g;

/**
 * Strip Arabic tashkeel/tatweel and unify Alef, Alef Maksura, and Ta Marbuta variants
 * so Arabic queries match reliably regardless of hamza/diacritic spelling.
 */
export function normalizeArabicForSearch(input: string): string {
	return input
		.normalize('NFC')
		.replace(ARABIC_DIACRITICS_RE, '')
		.replace(/[أإآٱ]/g, 'ا')
		.replace(/ى/g, 'ي')
		.replace(/ة/g, 'ه');
}

const DOC_TYPE_SYNONYMS: Record<string, string> = {
	exam: 'اختبار اختبارات موضوع مواضيع examen sujet',
	test: 'فرض فروض devoir',
	lesson: 'درس دروس ملخص cours lecon',
	summary: 'ملخص ملخصات resume',
	exercise: 'تمرين تمارين exercice',
	solution: 'حل تصحيح correction',
	quiz: 'تمرين تفاعلي تمارين كويز quiz exercice'
};

interface DocumentIndexRow {
	id: number;
	title: string;
	title_ar: string | null;
	type: string;
	slug: string;
	content: string | null;
	source: string | null;
	academic_year: string | null;
	origin_type: string | null;
	access_tier: string | null;
	subject_id: string;
	subject_name: string;
	subject_name_fr: string | null;
	subject_slug: string;
	subject_icon: string | null;
	subject_color: string | null;
	year_id: string;
	year_name: string;
	year_name_fr: string | null;
	year_slug: string;
	stream_id: string | null;
	stream_name: string | null;
	stream_name_fr: string | null;
	level_id: string;
	level_name: string;
	level_name_fr: string | null;
	level_slug: string;
}

interface QuizIndexRow {
	id: number;
	title: string;
	title_ar: string | null;
	slug: string;
	description: string | null;
	access_tier: string | null;
	is_premium: number | null;
	subject_id: string;
	subject_name: string;
	subject_name_fr: string | null;
	subject_slug: string;
	subject_icon: string | null;
	subject_color: string | null;
	year_id: string;
	year_name: string;
	year_name_fr: string | null;
	year_slug: string;
	stream_id: string | null;
	stream_name: string | null;
	stream_name_fr: string | null;
	level_id: string;
	level_name: string;
	level_name_fr: string | null;
	level_slug: string;
}

function extractLessonKeywords(content: string | null): string[] {
	if (!content) return [];
	const trimmed = content.trim();
	if (!trimmed.startsWith('{')) return [];

	try {
		const parsed = JSON.parse(trimmed) as Record<string, unknown>;
		const parts: string[] = [];

		if (Array.isArray(parsed.keywordsAr)) {
			for (const kw of parsed.keywordsAr) {
				if (typeof kw === 'string' && kw.trim()) parts.push(kw.trim());
			}
		}

		if (Array.isArray(parsed.keywords)) {
			for (const kw of parsed.keywords) {
				if (typeof kw === 'string' && kw.trim()) parts.push(kw.trim());
			}
		}

		if (typeof parsed.sequenceTitleAr === 'string' && parsed.sequenceTitleAr.trim()) {
			parts.push(parsed.sequenceTitleAr.trim());
		}

		if (typeof parsed.domain === 'string' && parsed.domain.trim()) {
			parts.push(parsed.domain.trim());
		}

		return parts;
	} catch {
		return [];
	}
}

function getCertificateSynonyms(
	yearId: string,
	title: string,
	titleAr: string,
	slug: string,
	originType?: string | null
): string[] {
	const combined = `${title} ${titleAr} ${slug}`;
	const out: string[] = [];

	if (
		combined.includes('بكالوريا') ||
		/\bbac\b/i.test(combined) ||
		slug.toLowerCase().includes('bac') ||
		(originType === 'official_certificate' && yearId === '3as')
	) {
		out.push('بكالوريا BAC Baccalauréat');
	}

	if (
		combined.includes('شهادة التعليم المتوسط') ||
		/\bbem\b/i.test(combined) ||
		slug.toLowerCase().includes('bem') ||
		(originType === 'official_certificate' && yearId === '4am')
	) {
		out.push('شهادة التعليم المتوسط BEM Brevet');
	}

	if (
		combined.includes('تقييم المكتسبات') ||
		slug.toLowerCase().includes('competency') ||
		slug.toLowerCase().includes('maktasabat')
	) {
		out.push('تقييم المكتسبات Évaluation des Acquis');
	}

	return out;
}

function buildKeywordsField(
	keywordParts: Array<string | null | undefined>,
	indexedColumnsForNorm: Array<string | null | undefined>
): string {
	const rawKeywords = keywordParts
		.map((p) => (p ? p.trim() : ''))
		.filter(Boolean)
		.join(' ');

	// Collect ONLY Arabic tokens that change under normalization (tashkeel/alef/alef-maksura/ta-marbuta)
	// so we never bloat the FTS index with duplicate text while guaranteeing normalized Arabic matches.
	const normalizedExtras = new Set<string>();
	const allSourceText = [rawKeywords, ...indexedColumnsForNorm.map((p) => p || '')].join(' ');
	for (const token of allSourceText.split(/\s+/)) {
		if (!token) continue;
		const cleaned = token.replace(/[^\p{L}\p{N}\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]+/gu, '');
		if (!cleaned) continue;
		const norm = normalizeArabicForSearch(cleaned);
		if (norm && norm !== cleaned) {
			normalizedExtras.add(norm);
		}
	}

	if (normalizedExtras.size === 0) return rawKeywords;
	return rawKeywords
		? `${rawKeywords} ${Array.from(normalizedExtras).join(' ')}`
		: Array.from(normalizedExtras).join(' ');
}

export function assertFts5Available(db: Database): void {
	const row = db
		.query("SELECT sqlite_compileoption_used('ENABLE_FTS5') AS enabled")
		.get() as { enabled: number } | null;

	if (!row || row.enabled !== 1) {
		throw new Error('SQLite FTS5 extension (ENABLE_FTS5) is not enabled in this runtime.');
	}
}

/**
 * Rebuild the `search_fts` FTS5 virtual table inside `content.db` from all published
 * documents (lessons, exams, tests, summaries, exercises, solutions) and published quizzes.
 * Idempotent and safe to call from any pipeline seed script.
 */
export function rebuildSearchIndex(db: Database): SearchIndexBuildResult {
	const start = performance.now();
	assertFts5Available(db);

	const docs = db
		.query(
			`
			SELECT
				d.id,
				d.title,
				d.title_ar,
				d.type,
				d.slug,
				d.content,
				d.source,
				d.academic_year,
				d.origin_type,
				COALESCE(d.access_tier, 'public') AS access_tier,
				s.id AS subject_id,
				s.name_ar AS subject_name,
				s.name_fr AS subject_name_fr,
				s.slug AS subject_slug,
				s.icon AS subject_icon,
				s.color AS subject_color,
				y.id AS year_id,
				y.name_ar AS year_name,
				y.name_fr AS year_name_fr,
				y.slug AS year_slug,
				st.id AS stream_id,
				st.name_ar AS stream_name,
				st.name_fr AS stream_name_fr,
				el.id AS level_id,
				el.name_ar AS level_name,
				el.name_fr AS level_name_fr,
				el.slug AS level_slug
			FROM documents d
			JOIN year_subjects ys ON d.year_subject_id = ys.id
			JOIN years y ON ys.year_id = y.id
			JOIN education_levels el ON y.level_id = el.id
			JOIN subjects s ON ys.subject_id = s.id
			LEFT JOIN streams st ON ys.stream_id = st.id
			WHERE d.is_published = 1
				AND el.visibility = 'published'
				AND y.visibility = 'published'
				AND ys.visibility = 'published'
			ORDER BY el."order", y."order", d.id
		`
		)
		.all() as DocumentIndexRow[];

	const quizzes = db
		.query(
			`
			SELECT
				q.id,
				q.title,
				q.title_ar,
				q.slug,
				q.description,
				COALESCE(q.access_tier, CASE WHEN q.is_premium = 1 THEN 'premium' ELSE 'public' END) AS access_tier,
				q.is_premium,
				s.id AS subject_id,
				s.name_ar AS subject_name,
				s.name_fr AS subject_name_fr,
				s.slug AS subject_slug,
				s.icon AS subject_icon,
				s.color AS subject_color,
				y.id AS year_id,
				y.name_ar AS year_name,
				y.name_fr AS year_name_fr,
				y.slug AS year_slug,
				st.id AS stream_id,
				st.name_ar AS stream_name,
				st.name_fr AS stream_name_fr,
				el.id AS level_id,
				el.name_ar AS level_name,
				el.name_fr AS level_name_fr,
				el.slug AS level_slug
			FROM quizzes q
			JOIN year_subjects ys ON q.year_subject_id = ys.id
			JOIN years y ON ys.year_id = y.id
			JOIN education_levels el ON y.level_id = el.id
			JOIN subjects s ON ys.subject_id = s.id
			LEFT JOIN streams st ON ys.stream_id = st.id
			WHERE q.is_published = 1
				AND el.visibility = 'published'
				AND y.visibility = 'published'
				AND ys.visibility = 'published'
			ORDER BY el."order", y."order", q.id
		`
		)
		.all() as QuizIndexRow[];

	db.exec('BEGIN');
	try {
		db.exec('DROP TABLE IF EXISTS search_fts');
		db.exec(`
			CREATE VIRTUAL TABLE search_fts USING fts5(
				item_key UNINDEXED,
				item_id UNINDEXED,
				item_type UNINDEXED,
				title,
				title_ar,
				subject_name,
				year_name,
				stream_name,
				level_name,
				keywords,
				url_path UNINDEXED,
				academic_year UNINDEXED,
				access_tier UNINDEXED,
				subject_slug UNINDEXED,
				subject_icon UNINDEXED,
				subject_color UNINDEXED,
				year_slug UNINDEXED,
				level_slug UNINDEXED,
				slug UNINDEXED,
				tokenize = "unicode61 remove_diacritics 2"
			)
		`);

		const insertStmt = db.prepare(`
			INSERT INTO search_fts (
				item_key,
				item_id,
				item_type,
				title,
				title_ar,
				subject_name,
				year_name,
				stream_name,
				level_name,
				keywords,
				url_path,
				academic_year,
				access_tier,
				subject_slug,
				subject_icon,
				subject_color,
				year_slug,
				level_slug,
				slug
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		`);

		for (const doc of docs) {
			const displaySubjectName =
				doc.level_id === 'primaire' && doc.subject_id === 'SCI-B'
					? 'التربية العلمية والتكنولوجية'
					: doc.subject_name;
			const hasRealStream = Boolean(doc.stream_id && doc.stream_id.toUpperCase() !== 'GEN');
			const streamName = hasRealStream ? (doc.stream_name ?? '') : '';
			const streamNameFr = hasRealStream ? (doc.stream_name_fr ?? '') : '';
			const titleAr = doc.title_ar || doc.title;
			const urlPath = `/${doc.level_slug}/${doc.year_slug}/${doc.subject_slug}/${doc.slug}`;

			const lessonParts = doc.type === 'lesson' ? extractLessonKeywords(doc.content) : [];
			const certSynonyms = getCertificateSynonyms(
				doc.year_id,
				doc.title,
				titleAr,
				doc.slug,
				doc.origin_type
			);

			const keywords = buildKeywordsField(
				[
					doc.subject_name_fr,
					doc.year_name_fr,
					streamNameFr,
					doc.level_name_fr,
					DOC_TYPE_SYNONYMS[doc.type] ?? doc.type,
					doc.source,
					doc.academic_year,
					doc.slug.replace(/[-_]+/g, ' '),
					...certSynonyms,
					...lessonParts
				],
				[doc.title, titleAr, displaySubjectName, doc.year_name, streamName, doc.level_name]
			);

			insertStmt.run(
				`doc:${doc.id}`,
				String(doc.id),
				doc.type,
				doc.title,
				titleAr,
				displaySubjectName,
				doc.year_name,
				streamName,
				doc.level_name,
				keywords,
				urlPath,
				doc.academic_year ?? null,
				doc.access_tier ?? 'public',
				doc.subject_slug,
				doc.subject_icon ?? null,
				doc.subject_color ?? null,
				doc.year_slug,
				doc.level_slug,
				doc.slug
			);
		}

		for (const quiz of quizzes) {
			const displaySubjectName =
				quiz.level_id === 'primaire' && quiz.subject_id === 'SCI-B'
					? 'التربية العلمية والتكنولوجية'
					: quiz.subject_name;
			const hasRealStream = Boolean(quiz.stream_id && quiz.stream_id.toUpperCase() !== 'GEN');
			const streamName = hasRealStream ? (quiz.stream_name ?? '') : '';
			const streamNameFr = hasRealStream ? (quiz.stream_name_fr ?? '') : '';
			const titleAr = quiz.title_ar || quiz.title;
			const urlPath = `/quizzes/${quiz.slug}`;
			const certSynonyms = getCertificateSynonyms(quiz.year_id, quiz.title, titleAr, quiz.slug);

			const keywords = buildKeywordsField(
				[
					quiz.description,
					quiz.subject_name_fr,
					quiz.year_name_fr,
					streamNameFr,
					quiz.level_name_fr,
					DOC_TYPE_SYNONYMS.quiz,
					quiz.slug.replace(/[-_]+/g, ' '),
					...certSynonyms
				],
				[quiz.title, titleAr, displaySubjectName, quiz.year_name, streamName, quiz.level_name]
			);

			insertStmt.run(
				`quiz:${quiz.id}`,
				String(quiz.id),
				'quiz',
				quiz.title,
				titleAr,
				displaySubjectName,
				quiz.year_name,
				streamName,
				quiz.level_name,
				keywords,
				urlPath,
				null,
				quiz.access_tier ?? 'public',
				quiz.subject_slug,
				quiz.subject_icon ?? null,
				quiz.subject_color ?? null,
				quiz.year_slug,
				quiz.level_slug,
				quiz.slug
			);
		}

		// 3. Index published interactive videos & synchronized transcript segments (for ?t= timestamp search)
		try {
			const videos = db
				.query(
					`
					SELECT v.id, v.slug, v.title, v.title_ar, v.description, v.access_tier,
						s.name_ar AS subject_name, s.slug AS subject_slug, s.icon AS subject_icon, s.color AS subject_color,
						y.name_ar AS year_name, y.slug AS year_slug,
						st.name_ar AS stream_name,
						el.name_ar AS level_name, el.slug AS level_slug
					FROM videos v
					JOIN year_subjects ys ON v.year_subject_id = ys.id
					JOIN years y ON ys.year_id = y.id
					JOIN education_levels el ON y.level_id = el.id
					JOIN subjects s ON ys.subject_id = s.id
					LEFT JOIN streams st ON ys.stream_id = st.id
					WHERE v.is_published = 1
				`
				)
				.all() as any[];

			for (const v of videos) {
				const titleAr = v.title_ar || v.title;
				const urlPath = `/videos/${v.slug}`;
				const kw = buildKeywords(
					[v.description || '', 'فيديو درس مرئي video cours', v.slug.replace(/[-_]+/g, ' ')],
					[v.title, titleAr, v.subject_name, v.year_name, v.stream_name || '', v.level_name]
				);
				insertStmt.run(
					`video:${v.id}`,
					String(v.id),
					'video',
					v.title,
					titleAr,
					v.subject_name,
					v.year_name,
					v.stream_name || '',
					v.level_name,
					kw,
					urlPath,
					null,
					v.access_tier || 'public',
					v.subject_slug,
					v.subject_icon ?? null,
					v.subject_color ?? null,
					v.year_slug,
					v.level_slug,
					v.slug
				);

				const segs = db
					.query(
						'SELECT id, start_sec, text_ar, text_normalized FROM video_transcript_segments WHERE video_id = ? ORDER BY seq_index ASC'
					)
					.all(v.id) as Array<{ id: number; start_sec: number; text_ar: string; text_normalized: string }>;

				for (const seg of segs) {
					const mm = String(Math.floor(seg.start_sec / 60)).padStart(2, '0');
					const ss = String(seg.start_sec % 60).padStart(2, '0');
					const segTitle = `[${mm}:${ss}] ${seg.text_ar.slice(0, 90)}`;
					insertStmt.run(
						`vseg:${seg.id}`,
						String(seg.id),
						'video_segment',
						segTitle,
						`${titleAr} — ${segTitle}`,
						v.subject_name,
						v.year_name,
						v.stream_name || '',
						v.level_name,
						`${seg.text_ar} ${seg.text_normalized}`,
						`/videos/${v.slug}?t=${seg.start_sec}`,
						null,
						v.access_tier || 'public',
						v.subject_slug,
						v.subject_icon ?? null,
						v.subject_color ?? null,
						v.year_slug,
						v.level_slug,
						v.slug
					);
				}
			}
		} catch {
			// videos table optional on older snapshots
		}

		db.exec("INSERT INTO search_fts(search_fts) VALUES ('optimize')");
		db.exec('COMMIT');
	} catch (err) {
		db.exec('ROLLBACK');
		throw err;
	}

	const durationMs = Number((performance.now() - start).toFixed(2));
	return {
		total: docs.length + quizzes.length,
		documents: docs.length,
		quizzes: quizzes.length,
		durationMs
	};
}

function buildTestMatchExpr(query: string): string {
	const cleaned = query
		.normalize('NFC')
		.replace(ARABIC_DIACRITICS_RE, '')
		.replace(/[^\p{L}\p{N}\s]+/gu, ' ')
		.trim();
	const tokens = cleaned.split(/\s+/).filter(Boolean).slice(0, 10);
	return tokens
		.map((tok) => {
			const safe = tok.replace(/"/g, '');
			const norm = normalizeArabicForSearch(safe);
			return norm !== safe ? `("${safe}"* OR "${norm}"*)` : `"${safe}"*`;
		})
		.join(' AND ');
}

if (import.meta.main) {
	const dbPath = resolve(process.cwd(), 'data/content.db');
	const db = new Database(dbPath);
	db.exec('PRAGMA journal_mode = WAL');
	db.exec('PRAGMA busy_timeout = 5000');

	try {
		const stats = rebuildSearchIndex(db);
		console.log(
			`[FTS5] Rebuilt search_fts in ${stats.durationMs}ms — ${stats.total} items indexed (${stats.documents} documents + ${stats.quizzes} quizzes).`
		);

		const benchmarkQueries = ['الدوال', 'تقييم المكتسبات', 'comprehension', 'Baccalauréat'];
		const stmt = db.prepare(`
			SELECT
				item_type,
				title_ar,
				url_path,
				bm25(search_fts, 0, 0, 0, 10.0, 10.0, 4.0, 3.0, 3.0, 2.0, 2.0, 0, 0, 0, 0, 0, 0, 0, 0, 0) AS score
			FROM search_fts
			WHERE search_fts MATCH ?
			ORDER BY score
			LIMIT 20
		`);

		for (const q of benchmarkQueries) {
			const expr = buildTestMatchExpr(q);
			const t0 = performance.now();
			const rows = stmt.all(expr) as Array<{
				item_type: string;
				title_ar: string;
				url_path: string;
				score: number;
			}>;
			const elapsed = (performance.now() - t0).toFixed(3);
			const top = rows[0] ? `${rows[0].item_type}: ${rows[0].title_ar}` : '(no match)';
			console.log(`  Query "${q}" -> ${rows.length} hits in ${elapsed}ms | Top: ${top}`);
		}
	} finally {
		db.close();
	}
}
