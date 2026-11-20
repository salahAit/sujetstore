import type { RequestHandler } from './$types';
import { getSiteSettings } from '#lib/server/visibility';

const DEFAULT_SITE_ORIGIN = 'https://sujetstore.com';

function resolveSiteOrigin(): string {
	const settings = getSiteSettings();
	const candidate = (settings.public_portal_url || process.env.PUBLIC_SITE_URL || '').trim();
	if (/^https?:\/\//i.test(candidate)) {
		return candidate.replace(/\/+$/, '');
	}
	return DEFAULT_SITE_ORIGIN;
}

export const GET: RequestHandler = async () => {
	const siteOrigin = resolveSiteOrigin();
	const body = [
		'User-agent: *',
		'Allow: /',
		'Disallow: /admin',
		'Disallow: /api',
		'Disallow: /auth',
		'Disallow: /student',
		'',
		`Sitemap: ${siteOrigin}/sitemap.xml`,
		''
	].join('\n');

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=86400, s-maxage=86400'
		}
	});
};
