import type { RequestHandler } from './$types';
import { contentSqlite } from '#lib/server/db';
import { getSiteSettings } from '#lib/server/visibility';

interface SitemapEntry {
	path: string;
	lastmod?: string;
	changefreq?: 'daily' | 'weekly' | 'monthly';
	priority?: string;
}

const DEFAULT_SITE_ORIGIN = 'https://sujetstore.com';

function resolveSiteOrigin(): string {
	const settings = getSiteSettings();
	const candidate = (settings.public_portal_url || process.env.PUBLIC_SITE_URL || '').trim();
	if (/^https?:\/\//i.test(candidate)) {
		return candidate.replace(/\/+$/, '');
	}
	return DEFAULT_SITE_ORIGIN;
}

function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function formatLastMod(raw: string | null | undefined, fallbackDate: string): string {
	if (!raw) return fallbackDate;
	const match = raw.match(/^\d{4}-\d{2}-\d{2}/);
	if (match) return match[0];
	const parsed = Date.parse(raw);
	if (Number.isFinite(parsed)) {
		return new Date(parsed).toISOString().slice(0, 10);
	}
	return fallbackDate;
}

export const GET: RequestHandler = async () => {
	const siteOrigin = resolveSiteOrigin();
	const today = new Date().toISOString().slice(0, 10);
	const entries = new Map<string, SitemapEntry>();

	const addEntry = (entry: SitemapEntry) => {
		if (!entries.has(entry.path)) {
			entries.set(entry.path, entry);
		}
	};

	// 1. Static core pages
	addEntry({ path: '/', lastmod: today, changefreq: 'daily', priority: '1.0' });
	addEntry({ path: '/about', lastmod: today, changefreq: 'monthly', priority: '0.5' });
	addEntry({ path: '/quizzes', lastmod: today, changefreq: 'weekly', priority: '0.8' });
	addEntry({ path: '/simulator', lastmod: today, changefreq: 'monthly', priority: '0.7' });

	// 2. All published education_levels (/[level])
	const levels = contentSqlite
		.query(
			`
			SELECT slug
			FROM education_levels
			WHERE visibility = 'published'
			ORDER BY "order", slug
		`
		)
		.all() as Array<{ slug: string }>;

	for (const lvl of levels) {
		addEntry({ path: `/${lvl.slug}`, lastmod: today, changefreq: 'weekly', priority: '0.9' });
	}

	// 3. All published years (/[level]/[year])
	const years = contentSqlite
		.query(
			`
			SELECT el.slug AS level_slug, y.slug AS year_slug
			FROM years y
			JOIN education_levels el ON y.level_id = el.id
			WHERE el.visibility = 'published'
				AND y.visibility = 'published'
			ORDER BY el."order", y."order"
		`
		)
		.all() as Array<{ level_slug: string; year_slug: string }>;

	for (const yr of years) {
		addEntry({
			path: `/${yr.level_slug}/${yr.year_slug}`,
			lastmod: today,
			changefreq: 'weekly',
			priority: '0.8'
		});
	}

	// 4. All published level_streams (/[level]/[year]/[stream])
	const levelStreams = contentSqlite
		.query(
			`
			SELECT DISTINCT el.slug AS level_slug, y.slug AS year_slug, LOWER(st.id) AS stream_slug
			FROM level_streams ls
			JOIN years y ON ls.year_id = y.id
			JOIN education_levels el ON y.level_id = el.id
			JOIN streams st ON ls.stream_id = st.id
			WHERE el.visibility = 'published'
				AND y.visibility = 'published'
				AND ls.visibility = 'published'
				AND UPPER(st.id) != 'GEN'
			ORDER BY el."order", y."order", st."order"
		`
		)
		.all() as Array<{ level_slug: string; year_slug: string; stream_slug: string }>;

	for (const stream of levelStreams) {
		addEntry({
			path: `/${stream.level_slug}/${stream.year_slug}/${stream.stream_slug}`,
			lastmod: today,
			changefreq: 'weekly',
			priority: '0.8'
		});
	}

	// 5. All published year_subjects (/[level]/[year]/[subject] + ?stream=... for secondary streams)
	const yearSubjects = contentSqlite
		.query(
			`
			SELECT DISTINCT
				el.slug AS level_slug,
				y.slug AS year_slug,
				s.slug AS subject_slug,
				ys.stream_id AS stream_id
			FROM year_subjects ys
			JOIN years y ON ys.year_id = y.id
			JOIN education_levels el ON y.level_id = el.id
			JOIN subjects s ON ys.subject_id = s.id
			LEFT JOIN level_streams ls ON ls.year_id = y.id AND ls.stream_id = ys.stream_id
			WHERE el.visibility = 'published'
				AND y.visibility = 'published'
				AND ys.visibility = 'published'
				AND (ys.stream_id IS NULL OR UPPER(ys.stream_id) = 'GEN' OR ls.visibility = 'published')
			ORDER BY el."order", y."order", ys."order", s.slug
		`
		)
		.all() as Array<{
		level_slug: string;
		year_slug: string;
		subject_slug: string;
		stream_id: string | null;
	}>;

	for (const ys of yearSubjects) {
		const hasSecondaryStream = Boolean(ys.stream_id && ys.stream_id.toUpperCase() !== 'GEN');
		const path = hasSecondaryStream
			? `/${ys.level_slug}/${ys.year_slug}/${ys.subject_slug}?stream=${encodeURIComponent(ys.stream_id!)}`
			: `/${ys.level_slug}/${ys.year_slug}/${ys.subject_slug}`;
		addEntry({ path, lastmod: today, changefreq: 'weekly', priority: '0.8' });
	}

	// 6. All published interactive lessons (/[level]/[year]/[subject]/[slug])
	const lessons = contentSqlite
		.query(
			`
			SELECT
				el.slug AS level_slug,
				y.slug AS year_slug,
				s.slug AS subject_slug,
				d.slug AS doc_slug,
				d.updated_at,
				d.created_at
			FROM documents d
			JOIN year_subjects ys ON d.year_subject_id = ys.id
			JOIN years y ON ys.year_id = y.id
			JOIN education_levels el ON y.level_id = el.id
			JOIN subjects s ON ys.subject_id = s.id
			WHERE d.is_published = 1
				AND d.type = 'lesson'
				AND COALESCE(d.access_tier, 'public') = 'public'
				AND el.visibility = 'published'
				AND y.visibility = 'published'
				AND ys.visibility = 'published'
			ORDER BY el."order", y."order", d.id
		`
		)
		.all() as Array<{
		level_slug: string;
		year_slug: string;
		subject_slug: string;
		doc_slug: string;
		updated_at: string | null;
		created_at: string | null;
	}>;

	for (const lesson of lessons) {
		addEntry({
			path: `/${lesson.level_slug}/${lesson.year_slug}/${lesson.subject_slug}/${lesson.doc_slug}`,
			lastmod: formatLastMod(lesson.updated_at || lesson.created_at, today),
			changefreq: 'monthly',
			priority: '0.7'
		});
	}

	// 7. All published public quizzes (/quizzes/[slug])
	const quizzes = contentSqlite
		.query(
			`
			SELECT q.slug, q.updated_at, q.created_at
			FROM quizzes q
			JOIN year_subjects ys ON q.year_subject_id = ys.id
			JOIN years y ON ys.year_id = y.id
			JOIN education_levels el ON y.level_id = el.id
			WHERE q.is_published = 1
				AND COALESCE(q.access_tier, 'public') = 'public'
				AND COALESCE(q.is_premium, 0) = 0
				AND el.visibility = 'published'
				AND y.visibility = 'published'
				AND ys.visibility = 'published'
			ORDER BY q.id
		`
		)
		.all() as Array<{
		slug: string;
		updated_at: string | null;
		created_at: string | null;
	}>;

	for (const quiz of quizzes) {
		addEntry({
			path: `/quizzes/${quiz.slug}`,
			lastmod: formatLastMod(quiz.updated_at || quiz.created_at, today),
			changefreq: 'monthly',
			priority: '0.7'
		});
	}

	const urlBlocks: string[] = [];
	for (const entry of entries.values()) {
		const loc = escapeXml(entry.path === '/' ? `${siteOrigin}/` : `${siteOrigin}${entry.path}`);
		const lines = [`  <url>`, `    <loc>${loc}</loc>`];
		if (entry.lastmod) lines.push(`    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`);
		if (entry.changefreq) lines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
		if (entry.priority) lines.push(`    <priority>${entry.priority}</priority>`);
		lines.push(`  </url>`);
		urlBlocks.push(lines.join('\n'));
	}

	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlBlocks.join('\n')}\n</urlset>\n`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, s-maxage=86400'
		}
	});
};
