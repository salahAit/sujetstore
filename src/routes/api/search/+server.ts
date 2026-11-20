import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { contentSqlite } from '#lib/server/db';

const SEARCH_CACHE_HEADERS = {
	'Cache-Control': 'public, max-age=120, s-maxage=600'
};

const ARABIC_DIACRITICS_RE = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g;

interface SearchResultRow {
	id: number;
	title: string;
	title_ar: string | null;
	type: string;
	slug: string;
	academic_year: string | null;
	access_tier: string | null;
	subject_name: string;
	subject_slug: string;
	subject_icon: string | null;
	subject_color: string | null;
	year_name: string;
	year_slug: string;
	stream_name: string | null;
	level_name: string;
	level_slug: string;
	url_path: string;
}

function normalizeArabicLetters(input: string): string {
	return input
		.replace(/[أإآٱ]/g, 'ا')
		.replace(/ى/g, 'ي')
		.replace(/ة/g, 'ه');
}

/**
 * Sanitize user search input into a safe SQLite FTS5 MATCH expression:
 * - Strips Arabic tashkeel/tatweel and FTS5 syntax characters (" * : ^ ( ) - etc.)
 * - Uses prefix matching ("token"*) with Arabic alef/tashkeel normalization
 * - Quotes tokens so FTS5 operators (AND/OR/NOT/NEAR) are treated safely as literals
 */
function buildFts5Query(rawQuery: string): string | null {
	const cleaned = rawQuery
		.normalize('NFC')
		.replace(ARABIC_DIACRITICS_RE, '')
		.replace(/[^\p{L}\p{N}\s]+/gu, ' ')
		.trim();

	if (!cleaned || cleaned.length < 2) return null;

	const tokens = cleaned
		.split(/\s+/)
		.filter((token) => token.length > 0)
		.slice(0, 10);

	if (tokens.length === 0) return null;

	return tokens
		.map((token) => {
			const safe = token.replace(/"/g, '');
			const normalized = normalizeArabicLetters(safe);
			if (normalized !== safe) {
				return `("${safe}"* OR "${normalized}"*)`;
			}
			return `"${safe}"*`;
		})
		.join(' AND ');
}

function runLikeFallbackSearch(q: string): SearchResultRow[] {
	const pattern = `%${q}%`;
	return contentSqlite
		.query(
			`
		SELECT
			d.id,
			d.title,
			d.title_ar,
			d.type,
			d.slug,
			d.academic_year,
			COALESCE(d.access_tier, 'public') AS access_tier,
			CASE
				WHEN el.id = 'primaire' AND s.id = 'SCI-B' THEN 'التربية العلمية والتكنولوجية'
				ELSE s.name_ar
			END AS subject_name,
			s.slug AS subject_slug,
			s.icon AS subject_icon,
			s.color AS subject_color,
			y.name_ar AS year_name,
			y.slug AS year_slug,
			CASE WHEN st.id IS NOT NULL AND UPPER(st.id) != 'GEN' THEN st.name_ar ELSE NULL END AS stream_name,
			el.name_ar AS level_name,
			el.slug AS level_slug,
			'/' || el.slug || '/' || y.slug || '/' || s.slug || '/' || d.slug AS url_path
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
			AND (d.title LIKE ? OR d.title_ar LIKE ? OR s.name_ar LIKE ?)

		UNION ALL

		SELECT
			q.id,
			q.title,
			q.title_ar,
			'quiz' AS type,
			q.slug,
			NULL AS academic_year,
			COALESCE(q.access_tier, CASE WHEN q.is_premium = 1 THEN 'premium' ELSE 'public' END) AS access_tier,
			CASE
				WHEN el.id = 'primaire' AND s.id = 'SCI-B' THEN 'التربية العلمية والتكنولوجية'
				ELSE s.name_ar
			END AS subject_name,
			s.slug AS subject_slug,
			s.icon AS subject_icon,
			s.color AS subject_color,
			y.name_ar AS year_name,
			y.slug AS year_slug,
			CASE WHEN st.id IS NOT NULL AND UPPER(st.id) != 'GEN' THEN st.name_ar ELSE NULL END AS stream_name,
			el.name_ar AS level_name,
			el.slug AS level_slug,
			'/quizzes/' || q.slug AS url_path
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
			AND (q.title LIKE ? OR q.title_ar LIKE ? OR s.name_ar LIKE ?)

		ORDER BY title_ar
		LIMIT 20
	`
		)
		.all(pattern, pattern, pattern, pattern, pattern, pattern) as SearchResultRow[];
}

export const GET: RequestHandler = async ({ url }) => {
	const q = url.searchParams.get('q')?.trim();
	if (!q || q.length < 2) {
		return json({ results: [] }, { headers: SEARCH_CACHE_HEADERS });
	}

	const matchExpr = buildFts5Query(q);
	if (!matchExpr) {
		return json({ results: [] }, { headers: SEARCH_CACHE_HEADERS });
	}

	try {
		const rawRows = contentSqlite
			.query(
				`
			SELECT
				CAST(item_id AS INTEGER) AS id,
				title,
				title_ar,
				item_type AS type,
				slug,
				NULLIF(academic_year, '') AS academic_year,
				access_tier,
				subject_name,
				subject_slug,
				NULLIF(subject_icon, '') AS subject_icon,
				NULLIF(subject_color, '') AS subject_color,
				year_name,
				year_slug,
				NULLIF(stream_name, '') AS stream_name,
				level_name,
				level_slug,
				url_path
			FROM search_fts
			WHERE search_fts MATCH ?
			ORDER BY bm25(search_fts, 0, 0, 0, 10.0, 10.0, 4.0, 3.0, 3.0, 2.0, 2.0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
			LIMIT 20
		`
			)
			.all(matchExpr) as SearchResultRow[];

		if (rawRows.length > 0) {
			return json({ results: rawRows }, { headers: SEARCH_CACHE_HEADERS });
		}

		// If FTS returned 0 hits, verify whether search_fts is empty; if so, fall back to LIKE
		const hasAnyIndexed = contentSqlite.query('SELECT 1 FROM search_fts LIMIT 1').get();
		if (!hasAnyIndexed) {
			const fallbackResults = runLikeFallbackSearch(q);
			return json({ results: fallbackResults }, { headers: SEARCH_CACHE_HEADERS });
		}

		return json({ results: [] }, { headers: SEARCH_CACHE_HEADERS });
	} catch {
		// Graceful fallback if search_fts virtual table does not exist yet or query fails
		const fallbackResults = runLikeFallbackSearch(q);
		return json({ results: fallbackResults }, { headers: SEARCH_CACHE_HEADERS });
	}
};
