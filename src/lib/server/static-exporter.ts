import {
	cpSync,
	existsSync,
	mkdirSync,
	readdirSync,
	rmSync,
	statSync,
	writeFileSync
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { contentSqlite, usersSqlite } from '#lib/server/db';
import { getSiteSettings } from '#lib/server/visibility';

export interface StaticExportResult {
	success: true;
	outputDir: string;
	pagesCount: number;
	dataFilesCount: number;
	assetsCount: number;
	searchItemsCount: number;
	routes: string[];
	warnings: string[];
}

function collectLocalUrlsFromQuestionData(raw: string | null | undefined, out: Set<string>) {
	if (!raw) return;
	try {
		const parsed = JSON.parse(raw);
		const walk = (node: unknown) => {
			if (!node) return;
			if (typeof node === 'string') {
				if (node.startsWith('/uploads/') || node.startsWith('/images/') || node.startsWith('/documents/')) {
					out.add(node);
				}
				return;
			}
			if (Array.isArray(node)) {
				for (const item of node) walk(item);
				return;
			}
			if (typeof node === 'object') {
				for (const value of Object.values(node as Record<string, unknown>)) {
					walk(value);
				}
			}
		};
		walk(parsed);
	} catch {
		// Ignore malformed question JSON
	}
}

function copyDirectoryCount(srcDir: string, destDir: string): number {
	if (!existsSync(srcDir)) return 0;
	mkdirSync(destDir, { recursive: true });
	let count = 0;

	for (const entry of readdirSync(srcDir, { withFileTypes: true })) {
		const srcPath = join(srcDir, entry.name);
		const destPath = join(destDir, entry.name);
		if (entry.isDirectory()) {
			count += copyDirectoryCount(srcPath, destPath);
		} else if (entry.isFile()) {
			mkdirSync(dirname(destPath), { recursive: true });
			cpSync(srcPath, destPath);
			count++;
		}
	}
	return count;
}

function resolvePublicLocalAsset(urlPath: string): string | null {
	if (!urlPath || !urlPath.startsWith('/')) return null;
	const rel = urlPath.split('?')[0].replace(/^\/+/, '');
	if (!rel || rel.includes('..')) return null;

	const staticCandidate = resolve('static', rel);
	if (existsSync(staticCandidate) && statSync(staticCandidate).isFile()) {
		return staticCandidate;
	}

	if (rel.startsWith('uploads/')) {
		const dataCandidate = resolve('data', rel);
		if (existsSync(dataCandidate) && statSync(dataCandidate).isFile()) {
			return dataCandidate;
		}
	}

	return null;
}

function collectPublishedRoutes(): string[] {
	const routes = new Set<string>([
		'/',
		'/about',
		'/quizzes',
		'/simulator',
		'/progress',
		'/bookmarks',
		'/achievements'
	]);

	// Published or coming_soon education levels
	const levels = contentSqlite
		.query(
			"SELECT id, slug, visibility FROM education_levels WHERE visibility IN ('published', 'coming_soon') ORDER BY \"order\""
		)
		.all() as Array<{ id: string; slug: string; visibility: string }>;

	for (const lvl of levels) {
		routes.add(`/${lvl.slug}`);
	}

	// Published or coming_soon years inside published levels
	const years = contentSqlite
		.query(
			`
			SELECT y.id, y.slug, y.visibility, el.slug as level_slug
			FROM years y
			JOIN education_levels el ON y.level_id = el.id
			WHERE el.visibility = 'published'
				AND y.visibility IN ('published', 'coming_soon')
			ORDER BY el."order", y."order"
		`
		)
		.all() as Array<{ id: string; slug: string; visibility: string; level_slug: string }>;

	for (const yr of years) {
		routes.add(`/${yr.level_slug}/${yr.slug}`);
	}

	// Published streams for secondary/published years
	const streamRoutes = contentSqlite
		.query(
			`
			SELECT DISTINCT el.slug as level_slug, y.slug as year_slug, LOWER(st.id) as stream_slug
			FROM level_streams ls
			JOIN years y ON ls.year_id = y.id
			JOIN education_levels el ON y.level_id = el.id
			JOIN streams st ON ls.stream_id = st.id
			WHERE el.visibility = 'published'
				AND y.visibility = 'published'
				AND ls.visibility = 'published'
				AND UPPER(st.id) != 'GEN'
		`
		)
		.all() as Array<{ level_slug: string; year_slug: string; stream_slug: string }>;

	for (const sr of streamRoutes) {
		routes.add(`/${sr.level_slug}/${sr.year_slug}/${sr.stream_slug}`);
	}

	// Published subjects within published levels & years
	const subjectRoutes = contentSqlite
		.query(
			`
			SELECT DISTINCT el.slug as level_slug, y.slug as year_slug, s.slug as subject_slug
			FROM year_subjects ys
			JOIN years y ON ys.year_id = y.id
			JOIN education_levels el ON y.level_id = el.id
			JOIN subjects s ON ys.subject_id = s.id
			WHERE el.visibility = 'published'
				AND y.visibility = 'published'
				AND ys.visibility = 'published'
		`
		)
		.all() as Array<{ level_slug: string; year_slug: string; subject_slug: string }>;

	for (const sub of subjectRoutes) {
		routes.add(`/${sub.level_slug}/${sub.year_slug}/${sub.subject_slug}`);
	}

	// Published documents inside published levels, years & year_subjects
	const docRoutes = contentSqlite
		.query(
			`
			SELECT el.slug as level_slug, y.slug as year_slug, s.slug as subject_slug, d.slug as doc_slug
			FROM documents d
			JOIN year_subjects ys ON d.year_subject_id = ys.id
			JOIN years y ON ys.year_id = y.id
			JOIN education_levels el ON y.level_id = el.id
			JOIN subjects s ON ys.subject_id = s.id
			WHERE d.is_published = 1
				AND el.visibility = 'published'
				AND y.visibility = 'published'
				AND ys.visibility = 'published'
		`
		)
		.all() as Array<{ level_slug: string; year_slug: string; subject_slug: string; doc_slug: string }>;

	for (const doc of docRoutes) {
		routes.add(`/${doc.level_slug}/${doc.year_slug}/${doc.subject_slug}/${doc.doc_slug}`);
	}

	// Published quizzes inside published levels, years & year_subjects
	const quizRoutes = contentSqlite
		.query(
			`
			SELECT q.slug
			FROM quizzes q
			JOIN year_subjects ys ON q.year_subject_id = ys.id
			JOIN years y ON ys.year_id = y.id
			JOIN education_levels el ON y.level_id = el.id
			WHERE q.is_published = 1
				AND el.visibility = 'published'
				AND y.visibility = 'published'
				AND ys.visibility = 'published'
		`
		)
		.all() as Array<{ slug: string }>;

	for (const quiz of quizRoutes) {
		routes.add(`/quizzes/${quiz.slug}`);
	}

	return Array.from(routes);
}

function collectPublicAssets(): string[] {
	const assetPaths = new Set<string>();

	const publicDocs = contentSqlite
		.query(
			`
			SELECT d.pdf_url, d.solution_url
			FROM documents d
			JOIN year_subjects ys ON d.year_subject_id = ys.id
			JOIN years y ON ys.year_id = y.id
			JOIN education_levels el ON y.level_id = el.id
			WHERE d.is_published = 1
				AND COALESCE(d.access_tier, 'public') = 'public'
				AND el.visibility = 'published'
				AND y.visibility = 'published'
				AND ys.visibility = 'published'
		`
		)
		.all() as Array<{ pdf_url: string | null; solution_url: string | null }>;

	for (const doc of publicDocs) {
		if (doc.pdf_url && doc.pdf_url.startsWith('/')) assetPaths.add(doc.pdf_url);
		if (doc.solution_url && doc.solution_url.startsWith('/')) assetPaths.add(doc.solution_url);
	}

	const publicQuestionAssets = contentSqlite
		.query(
			`
			SELECT qu.image_url, qu.question_data
			FROM questions qu
			JOIN quiz_questions qq ON qq.question_id = qu.id
			JOIN quizzes q ON qq.quiz_id = q.id
			JOIN year_subjects ys ON q.year_subject_id = ys.id
			JOIN years y ON ys.year_id = y.id
			JOIN education_levels el ON y.level_id = el.id
			WHERE q.is_published = 1
				AND COALESCE(q.access_tier, 'public') = 'public'
				AND COALESCE(q.is_premium, 0) = 0
				AND el.visibility = 'published'
				AND y.visibility = 'published'
				AND ys.visibility = 'published'
		`
		)
		.all() as Array<{ image_url: string | null; question_data: string | null }>;

	for (const qItem of publicQuestionAssets) {
		if (qItem.image_url && qItem.image_url.startsWith('/')) {
			assetPaths.add(qItem.image_url);
		}
		collectLocalUrlsFromQuestionData(qItem.question_data, assetPaths);
	}

	return Array.from(assetPaths);
}

function generateSearchIndex(): Array<Record<string, unknown>> {
	const docs = contentSqlite
		.query(
			`
			SELECT
				d.id, d.title, d.title_ar, d.type, d.slug, d.academic_year, d.access_tier,
				s.name_ar as subject_name, s.slug as subject_slug, s.icon as subject_icon, s.color as subject_color,
				y.name_ar as year_name, y.slug as year_slug,
				el.name_ar as level_name, el.slug as level_slug
			FROM documents d
			JOIN year_subjects ys ON d.year_subject_id = ys.id
			JOIN years y ON ys.year_id = y.id
			JOIN education_levels el ON y.level_id = el.id
			JOIN subjects s ON ys.subject_id = s.id
			WHERE d.is_published = 1
				AND el.visibility = 'published'
				AND y.visibility = 'published'
				AND ys.visibility = 'published'
			ORDER BY el."order", y."order", d.title_ar
		`
		)
		.all() as Array<Record<string, unknown>>;

	const quizzes = contentSqlite
		.query(
			`
			SELECT
				q.id, q.title, q.title_ar, 'quiz' as type, q.slug, NULL as academic_year,
				COALESCE(q.access_tier, CASE WHEN q.is_premium = 1 THEN 'premium' ELSE 'public' END) as access_tier,
				s.name_ar as subject_name, s.slug as subject_slug, s.icon as subject_icon, s.color as subject_color,
				y.name_ar as year_name, y.slug as year_slug,
				el.name_ar as level_name, el.slug as level_slug
			FROM quizzes q
			JOIN year_subjects ys ON q.year_subject_id = ys.id
			JOIN years y ON ys.year_id = y.id
			JOIN education_levels el ON y.level_id = el.id
			JOIN subjects s ON ys.subject_id = s.id
			WHERE q.is_published = 1
				AND el.visibility = 'published'
				AND y.visibility = 'published'
				AND ys.visibility = 'published'
			ORDER BY el."order", y."order", q.title_ar
		`
		)
		.all() as Array<Record<string, unknown>>;

	return [...docs, ...quizzes];
}

function generateNotificationsList(): Array<Record<string, unknown>> {
	try {
		return usersSqlite
			.query(
				`
				SELECT id, title, body, type, document_id as documentId, created_at as createdAt
				FROM notifications
				ORDER BY created_at DESC
				LIMIT 20
			`
			)
			.all() as Array<Record<string, unknown>>;
	} catch {
		return [];
	}
}

function buildSitemapXml(routes: string[], siteOrigin: string): string {
	const today = new Date().toISOString().split('T')[0];
	const cleanOrigin = siteOrigin.replace(/\/$/, '');
	const urlEntries = routes
		.map((route) => {
			const loc = route === '/' ? `${cleanOrigin}/` : `${cleanOrigin}${route}`;
			return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`;
		})
		.join('\n');

	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
}

export async function exportStaticPublicSite(options?: {
	outputDir?: string;
}): Promise<StaticExportResult> {
	const outputDir = resolve(options?.outputDir ?? 'build-static');
	const buildServerEntry = resolve('build/server/server.js');
	const buildClientApp = resolve('build/client/_app');

	if (!existsSync(buildServerEntry) || !existsSync(buildClientApp)) {
		throw new Error('ملفات البناء غير موجودة. يرجى تشغيل bun run build أولاً.');
	}

	process.env.SUJET_STATIC_BUILD = '1';

	rmSync(outputDir, { recursive: true, force: true });
	mkdirSync(outputDir, { recursive: true });

	const serverModule = await import(
		/* @vite-ignore */ pathToFileURL(buildServerEntry).href
	);
	const svelteServer = serverModule.server as {
		init: (opts: {
			env: Record<string, string>;
			read: (file: string) => ReadableStream | null;
		}) => Promise<void>;
		respond: (
			request: Request,
			options: { getClientAddress: () => string }
		) => Promise<Response>;
	};

	await svelteServer.init({
		env: { ...(process.env as Record<string, string>), SUJET_STATIC_BUILD: '1' },
		read: (file: string) => {
			const clean = file.replace(/^\/+/, '');
			const candidates = [
				resolve('build/client', clean),
				resolve('build/server', clean),
				resolve('static', clean)
			];
			for (const candidate of candidates) {
				if (existsSync(candidate) && statSync(candidate).isFile()) {
					return Bun.file(candidate).stream() as unknown as ReadableStream;
				}
			}
			return null;
		}
	});

	const routes = collectPublishedRoutes();
	const renderedRoutes: string[] = [];
	const warnings: string[] = [];
	let pagesCount = 0;
	let dataFilesCount = 0;

	for (const route of routes) {
		const url = `http://sujetstore.local${route}`;
		const htmlRes = await svelteServer.respond(
			new Request(url, {
				headers: {
					'x-sujet-static-export': '1',
					accept: 'text/html'
				}
			}),
			{ getClientAddress: () => '127.0.0.1' }
		);

		if (htmlRes.status !== 200) {
			warnings.push(`Route ${route} returned HTTP ${htmlRes.status}`);
			continue;
		}

		const html = await htmlRes.text();
		const targetHtml =
			route === '/'
				? join(outputDir, 'index.html')
				: join(outputDir, route.replace(/^\/+/, ''), 'index.html');
		mkdirSync(dirname(targetHtml), { recursive: true });
		writeFileSync(targetHtml, html, 'utf-8');
		renderedRoutes.push(route);
		pagesCount++;

		const dataPathUrl =
			route === '/' ? 'http://sujetstore.local/__data.json' : `http://sujetstore.local${route}/__data.json`;
		const dataRes = await svelteServer.respond(
			new Request(dataPathUrl, {
				headers: {
					'x-sujet-static-export': '1',
					accept: 'application/json'
				}
			}),
			{ getClientAddress: () => '127.0.0.1' }
		);

		if (dataRes.status === 200) {
			const dataBody = await dataRes.text();
			const targetData =
				route === '/'
					? join(outputDir, '__data.json')
					: join(outputDir, route.replace(/^\/+/, ''), '__data.json');
			mkdirSync(dirname(targetData), { recursive: true });
			writeFileSync(targetData, dataBody, 'utf-8');
			dataFilesCount++;
		}
	}

	// Render static 404 fallback page
	const notFoundRes = await svelteServer.respond(
		new Request('http://sujetstore.local/__sujet_not_found_fallback__', {
			headers: {
				'x-sujet-static-export': '1',
				accept: 'text/html'
			}
		}),
		{ getClientAddress: () => '127.0.0.1' }
	);
	const notFoundHtml = await notFoundRes.text();
	if (notFoundHtml) {
		writeFileSync(join(outputDir, '404.html'), notFoundHtml, 'utf-8');
	}

	// Copy framework runtime assets & safe static assets ONLY (excluding wasm/, generated/, hidden/gated PDFs)
	let assetsCount = 0;
	assetsCount += copyDirectoryCount(buildClientApp, join(outputDir, '_app'));
	assetsCount += copyDirectoryCount(resolve('static/fonts'), join(outputDir, 'fonts'));
	assetsCount += copyDirectoryCount(resolve('static/images'), join(outputDir, 'images'));

	const rootStaticFiles = [
		'favicon.ico',
		'favicon.png',
		'apple-touch-icon.png',
		'icon-192.png',
		'icon-512.png',
		'logo.png',
		'logo.webp',
		'logo-192.png',
		'sujetstore.png',
		'manifest.json'
	];

	for (const fileName of rootStaticFiles) {
		const src = resolve('static', fileName);
		if (existsSync(src) && statSync(src).isFile()) {
			cpSync(src, join(outputDir, fileName));
			assetsCount++;
		}
	}

	const serviceWorkerBuilt = resolve('build/client/service-worker.js');
	if (existsSync(serviceWorkerBuilt)) {
		cpSync(serviceWorkerBuilt, join(outputDir, 'service-worker.js'));
		assetsCount++;
	}

	// Copy ONLY public tier asset files belonging to published curriculum nodes
	const publicAssetUrls = collectPublicAssets();
	for (const assetUrl of publicAssetUrls) {
		const src = resolvePublicLocalAsset(assetUrl);
		if (!src) {
			warnings.push(`Public asset missing on disk: ${assetUrl}`);
			continue;
		}
		const rel = assetUrl.split('?')[0].replace(/^\/+/, '');
		const dest = join(outputDir, rel);
		mkdirSync(dirname(dest), { recursive: true });
		cpSync(src, dest);
		assetsCount++;
	}

	// Generate static-api JSON feeds
	const staticApiDir = join(outputDir, 'static-api');
	mkdirSync(staticApiDir, { recursive: true });

	const searchIndex = generateSearchIndex();
	writeFileSync(
		join(staticApiDir, 'search-index.json'),
		JSON.stringify({ results: searchIndex }),
		'utf-8'
	);

	const notifications = generateNotificationsList();
	writeFileSync(
		join(staticApiDir, 'notifications.json'),
		JSON.stringify({ notifications }),
		'utf-8'
	);

	// Generate sitemap.xml and robots.txt
	const settings = getSiteSettings();
	const siteOrigin = (
		settings.public_portal_url ||
		process.env.PUBLIC_SITE_URL ||
		'https://sujetstore.dz'
	).replace(/\/$/, '');

	writeFileSync(
		join(outputDir, 'sitemap.xml'),
		buildSitemapXml(renderedRoutes, siteOrigin),
		'utf-8'
	);

	const robotsTxt = [
		'User-agent: *',
		'Allow: /',
		'Disallow: /admin',
		'Disallow: /student',
		'Disallow: /api',
		`Sitemap: ${siteOrigin}/sitemap.xml`,
		''
	].join('\n');
	writeFileSync(join(outputDir, 'robots.txt'), robotsTxt, 'utf-8');

	return {
		success: true,
		outputDir,
		pagesCount,
		dataFilesCount,
		assetsCount,
		searchItemsCount: searchIndex.length,
		routes: renderedRoutes,
		warnings
	};
}
