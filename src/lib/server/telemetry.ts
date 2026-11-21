import type { RequestEvent } from '@sveltejs/kit';
import { pgRun } from '#lib/server/db';
import { getClientIp } from '#lib/server/rate-limit';

export type DeviceType = 'desktop' | 'mobile' | 'tablet' | 'bot';

export interface ParsedUserAgent {
	deviceType: DeviceType;
	osName: string;
	browserName: string;
}

export interface GeoInfo {
	countryCode: string;
	countryName: string;
	regionCity: string;
}

interface GeoCacheEntry {
	value: GeoInfo;
	expiresAt: number;
}

const GEO_CACHE_MAX_SIZE = 5_000;
const GEO_CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours
const GEO_LOOKUP_TIMEOUT_MS = 1_200;

const geoCache = new Map<string, GeoCacheEntry>();
const inFlightGeoLookups = new Set<string>();

let regionDisplayNames: Intl.DisplayNames | null = null;
try {
	regionDisplayNames = new Intl.DisplayNames(['en'], { type: 'region' });
} catch {
	regionDisplayNames = null;
}

const FALLBACK_COUNTRY_NAMES: Record<string, string> = {
	DZ: 'Algeria',
	FR: 'France',
	MA: 'Morocco',
	TN: 'Tunisia',
	EG: 'Egypt',
	SA: 'Saudi Arabia',
	AE: 'United Arab Emirates',
	QA: 'Qatar',
	KW: 'Kuwait',
	LY: 'Libya',
	MR: 'Mauritania',
	US: 'United States',
	GB: 'United Kingdom',
	CA: 'Canada',
	DE: 'Germany',
	ES: 'Spain',
	IT: 'Italy',
	BE: 'Belgium',
	CH: 'Switzerland',
	TR: 'Turkey',
	NL: 'Netherlands'
};

function getCountryNameFromCode(code: string): string {
	const upper = code.trim().toUpperCase();
	if (!upper || upper === 'XX' || upper === 'T1') return 'Unknown';
	if (FALLBACK_COUNTRY_NAMES[upper]) return FALLBACK_COUNTRY_NAMES[upper];
	try {
		const resolved = regionDisplayNames?.of(upper);
		if (resolved && resolved !== upper) return resolved;
	} catch {
		// Ignore invalid ISO codes
	}
	return upper;
}

function normalizeIp(rawIp: string): string {
	const trimmed = (rawIp || '').trim();
	if (!trimmed) return '127.0.0.1';
	if (trimmed.startsWith('::ffff:')) {
		return trimmed.slice(7);
	}
	return trimmed;
}

function isPrivateOrLoopbackIp(ip: string): boolean {
	const lower = ip.toLowerCase();
	if (
		lower === '127.0.0.1' ||
		lower === '::1' ||
		lower === 'localhost' ||
		lower === '0.0.0.0' ||
		lower.startsWith('127.') ||
		lower.startsWith('10.') ||
		lower.startsWith('192.168.') ||
		lower.startsWith('169.254.') ||
		lower.startsWith('fc') ||
		lower.startsWith('fd') ||
		lower.startsWith('fe80:')
	) {
		return true;
	}
	const m172 = /^172\.(\d+)\./.exec(lower);
	if (m172) {
		const second = Number(m172[1]);
		if (second >= 16 && second <= 31) return true;
	}
	return false;
}

function detectOs(ua: string): string {
	if (/Android/i.test(ua)) return 'Android';
	if (/iPad/i.test(ua)) return 'iOS';
	if (/iPhone|iPod|CPU (?:iPhone )?OS/i.test(ua)) return 'iOS';
	if (/Windows NT|Win64|WOW64|Windows Phone|Windows/i.test(ua)) return 'Windows';
	if (/CrOS/i.test(ua)) return 'ChromeOS';
	if (/Macintosh|Mac OS X/i.test(ua)) return 'macOS';
	if (/Linux|X11|Ubuntu|Debian|Fedora/i.test(ua)) return 'Linux';
	return 'Unknown';
}

/**
 * Zero-dependency fast User-Agent parser covering SujetStore apps, mobile/tablet/desktop browsers, and bots/CLI tools.
 */
export function parseUserAgent(uaRaw: string): ParsedUserAgent {
	const ua = (uaRaw || '').trim();
	if (!ua) {
		return { deviceType: 'desktop', osName: 'Unknown', browserName: 'Unknown' };
	}

	// 1. Official SujetStore apps
	if (/SujetStoreAndroidApp/i.test(ua)) {
		return {
			deviceType: /Tablet/i.test(ua) ? 'tablet' : 'mobile',
			osName: 'Android',
			browserName: 'SujetStoreAndroidApp'
		};
	}
	if (/SujetStoreDesktopApp/i.test(ua)) {
		const os = detectOs(ua);
		return {
			deviceType: 'desktop',
			osName: os === 'Unknown' ? 'Desktop' : os,
			browserName: 'SujetStoreDesktopApp'
		};
	}

	// 2. Bots, crawlers, scrapers, CLI HTTP clients
	const botMatchers: Array<[RegExp, string]> = [
		[/Googlebot/i, 'Googlebot'],
		[/Bingbot/i, 'Bingbot'],
		[/YandexBot/i, 'YandexBot'],
		[/DuckDuckBot/i, 'DuckDuckBot'],
		[/Baiduspider/i, 'Baiduspider'],
		[/Applebot/i, 'Applebot'],
		[/AhrefsBot/i, 'AhrefsBot'],
		[/SemrushBot/i, 'SemrushBot'],
		[/GPTBot/i, 'GPTBot'],
		[/ClaudeBot/i, 'ClaudeBot'],
		[/Bytespider/i, 'Bytespider'],
		[/facebookexternalhit/i, 'FacebookBot'],
		[/Twitterbot/i, 'Twitterbot'],
		[/TelegramBot/i, 'TelegramBot'],
		[/WhatsApp/i, 'WhatsApp'],
		[/Discordbot/i, 'Discordbot'],
		[/Scrapy/i, 'Scrapy'],
		[/\bcurl\b/i, 'curl'],
		[/\bwget\b/i, 'wget'],
		[/python-requests|python-urllib|python-httpx|aiohttp|\bpython\b/i, 'Python'],
		[/Go-http-client/i, 'Go-http-client'],
		[/HeadlessChrome|Playwright|Puppeteer|Selenium|PhantomJS/i, 'Headless Browser'],
		[/PostmanRuntime|Insomnia/i, 'API Client'],
		[/node-fetch|undici|axios/i, 'Node HTTP'],
		[/bot|crawler|spider|slurp|scraper|httpclient/i, 'Bot']
	];

	for (const [pattern, name] of botMatchers) {
		if (pattern.test(ua)) {
			const os = detectOs(ua);
			return {
				deviceType: 'bot',
				osName: os === 'Unknown' ? 'Bot' : os,
				browserName: name
			};
		}
	}

	// 3. OS & Device Type
	const osName = detectOs(ua);
	let deviceType: DeviceType = 'desktop';

	if (
		/iPad|Tablet|PlayBook|Silk\//i.test(ua) ||
		(/Android/i.test(ua) && !/Mobile/i.test(ua))
	) {
		deviceType = 'tablet';
	} else if (/Mobile|iPhone|iPod|Android|Windows Phone|BlackBerry|Opera Mini|IEMobile/i.test(ua)) {
		deviceType = 'mobile';
	}

	// 4. Browser detection (ordered from most specific to most generic)
	let browserName = 'Unknown';
	if (/SamsungBrowser\//i.test(ua)) {
		browserName = 'Samsung Internet';
	} else if (/OPR\/|Opera/i.test(ua)) {
		browserName = 'Opera';
	} else if (/Edg\/|EdgA\/|EdgiOS\/|Edge\//i.test(ua)) {
		browserName = 'Edge';
	} else if (/Firefox\/|FxiOS\//i.test(ua)) {
		browserName = 'Firefox';
	} else if (/YaBrowser\//i.test(ua)) {
		browserName = 'Yandex';
	} else if (/UCBrowser\//i.test(ua)) {
		browserName = 'UC Browser';
	} else if (/Vivaldi\//i.test(ua)) {
		browserName = 'Vivaldi';
	} else if (/Brave\//i.test(ua)) {
		browserName = 'Brave';
	} else if (/CriOS\/|Chrome\/|Chromium\//i.test(ua)) {
		browserName = 'Chrome';
	} else if (/Safari\//i.test(ua)) {
		browserName = 'Safari';
	}

	return { deviceType, osName, browserName };
}

function setGeoCache(ip: string, value: GeoInfo): void {
	const now = Date.now();
	if (geoCache.size >= GEO_CACHE_MAX_SIZE) {
		for (const [k, entry] of geoCache) {
			if (now >= entry.expiresAt) {
				geoCache.delete(k);
			}
		}
		if (geoCache.size >= GEO_CACHE_MAX_SIZE) {
			// Evict oldest entry (Map preserves insertion order)
			const firstKey = geoCache.keys().next().value;
			if (firstKey) geoCache.delete(firstKey);
		}
	}
	geoCache.set(ip, { value, expiresAt: now + GEO_CACHE_TTL_MS });
}

function triggerBackgroundGeoLookup(ip: string): void {
	if (inFlightGeoLookups.has(ip)) return;
	inFlightGeoLookups.add(ip);

	void (async () => {
		try {
			const res = await fetch(
				`http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,countryCode,country,regionName,city`,
				{ signal: AbortSignal.timeout(GEO_LOOKUP_TIMEOUT_MS) }
			);
			if (!res.ok) return;
			const data = (await res.json()) as {
				status?: string;
				countryCode?: string;
				country?: string;
				regionName?: string;
				city?: string;
			};
			if (data?.status === 'success') {
				const countryCode = (data.countryCode || 'XX').slice(0, 8).toUpperCase();
				const countryName = (data.country || getCountryNameFromCode(countryCode)).slice(0, 80);
				const parts = [data.city, data.regionName].filter(
					(p): p is string => Boolean(p && p.trim())
				);
				const uniqueParts = Array.from(new Set(parts.map((p) => p.trim())));
				const regionCity = (uniqueParts.join(', ') || 'Unknown').slice(0, 120);

				const resolved: GeoInfo = { countryCode, countryName, regionCity };
				setGeoCache(ip, resolved);

				// Best-effort async enrichment of recent Unknown rows for this IP
				await pgRun(
					`UPDATE activity_audit_logs
					 SET country_code = $1, country_name = $2, region_city = $3
					 WHERE ip_address = $4
					   AND (country_name IS NULL OR country_name = 'Unknown')
					   AND created_at >= to_char((now() AT TIME ZONE 'UTC') - interval '5 minutes', 'YYYY-MM-DD HH24:MI:SS')`,
					[countryCode, countryName, regionCity, ip]
				).catch(() => {});
			}
		} catch {
			// Never propagate network errors from telemetry enrichment
		} finally {
			inFlightGeoLookups.delete(ip);
		}
	})();
}

/**
 * Fast, non-blocking GeoIP resolution:
 * 1. Cloudflare headers (cf-ipcountry, cf-ipcity, cf-region)
 * 2. Private / loopback IP detection -> Local / Server
 * 3. In-memory TTL cache (5,000 entries, 6h TTL)
 * 4. Background async enrichment via ip-api.com (1200ms timeout, never blocks request)
 */
export function resolveGeoForIp(rawIp: string, headers?: Headers): GeoInfo {
	// 1. Cloudflare edge headers
	const cfCountry = headers?.get('cf-ipcountry')?.trim().toUpperCase();
	if (cfCountry && cfCountry !== 'XX' && cfCountry !== 'T1') {
		const cfCity = headers?.get('cf-ipcity')?.trim() || '';
		const cfRegion = headers?.get('cf-region')?.trim() || '';
		const parts = [cfCity, cfRegion].filter(Boolean);
		const uniqueParts = Array.from(new Set(parts));
		return {
			countryCode: cfCountry.slice(0, 8),
			countryName: getCountryNameFromCode(cfCountry),
			regionCity: (uniqueParts.join(', ') || 'Unknown').slice(0, 120)
		};
	}

	const ip = normalizeIp(rawIp);

	// 2. Private / loopback IPs
	if (isPrivateOrLoopbackIp(ip)) {
		return {
			countryCode: 'LOCAL',
			countryName: 'Local / Server',
			regionCity: 'Local / Server'
		};
	}

	// 3. In-memory TTL cache
	const now = Date.now();
	const cached = geoCache.get(ip);
	if (cached && now < cached.expiresAt) {
		return cached.value;
	}

	// 4. Kick off non-blocking background lookup and return immediate fallback
	const fallback: GeoInfo = {
		countryCode: 'XX',
		countryName: 'Unknown',
		regionCity: 'Unknown'
	};
	// Cache fallback briefly (30s) to avoid hammering external API on bursts before lookup finishes
	geoCache.set(ip, { value: fallback, expiresAt: now + 30_000 });
	triggerBackgroundGeoLookup(ip);
	return fallback;
}

/**
 * Strictly fire-and-forget audit event logger (0ms added to HTTP response latency).
 */
export function recordAuditEvent(params: {
	event: RequestEvent;
	eventType: string;
	statusCode?: number;
	resourceId?: string | null;
}): void {
	try {
		const { event, eventType } = params;
		const statusCode = params.statusCode ?? 200;
		const resourceId = params.resourceId ?? null;
		const user = event.locals?.user ?? null;
		const rawIp = getClientIp(event);
		const ip = normalizeIp(rawIp);
		const userAgent = (event.request.headers.get('user-agent') || '').slice(0, 500);
		const parsedUa = parseUserAgent(userAgent);
		const geo = resolveGeoForIp(ip, event.request.headers);
		const path = (event.url?.pathname || '/').slice(0, 500);

		void pgRun(
			`INSERT INTO activity_audit_logs (
				user_id, user_email, user_role, event_type, path, resource_id,
				ip_address, country_code, country_name, region_city,
				device_type, os_name, browser_name, user_agent, status_code
			) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
			[
				user?.id ?? null,
				user?.email ?? null,
				user?.role ?? null,
				eventType.slice(0, 64),
				path,
				resourceId ? resourceId.slice(0, 128) : null,
				ip.slice(0, 64),
				geo.countryCode,
				geo.countryName,
				geo.regionCity,
				parsedUa.deviceType,
				parsedUa.osName,
				parsedUa.browserName,
				userAgent || null,
				statusCode
			]
		).catch(() => {});
	} catch {
		// Telemetry must never throw into request handlers
	}
}
