import type { Handle } from '@sveltejs/kit/hooks';
import { json, redirect } from '@sveltejs/kit';
import {
	validateSession,
	getSessionCookie,
	setSessionTokenCookie,
	deleteSessionTokenCookie,
	isStaffRole
} from '#lib/server/auth';
import { checkRateLimit, getClientIp } from '#lib/server/rate-limit';
import { getSiteLockConfig, renderSiteLockHtml } from '#lib/server/site-lock';
import { recordAuditEvent } from '#lib/server/telemetry';
import { platformRegistry } from '#lib/platform';

function resolveLocale(event: Parameters<Handle>[0]['event']): 'ar' | 'fr' | 'en' {
	const q = event.url.searchParams.get('lang');
	if (q === 'ar' || q === 'fr' || q === 'en') {
		event.cookies.set('site_lang', q, {
			path: '/',
			maxAge: 60 * 60 * 24 * 365,
			sameSite: 'lax'
		});
		return q;
	}
	const c = event.cookies.get('site_lang');
	if (c === 'fr' || c === 'en') return c;
	return 'ar';
}

export const handle: Handle = async ({ event, resolve }) => {
	const isInternalStaticBuild =
		process.env.SUJET_STATIC_BUILD === '1' &&
		event.request.headers.get('x-sujet-static-export') === '1';
	event.locals.isStaticBuild = isInternalStaticBuild;

	if (isInternalStaticBuild) {
		event.locals.session = null;
		event.locals.user = null;
	} else {
		const sessionId = getSessionCookie(event);
		if (sessionId) {
			const { session, user } = (await validateSession(sessionId)) ?? {
				session: null,
				user: null
			};
			if (session) {
				setSessionTokenCookie(event, session.id, new Date(session.expiresAt));
			} else {
				deleteSessionTokenCookie(event);
			}
			event.locals.session = session;
			event.locals.user = user;
		} else {
			event.locals.session = null;
			event.locals.user = null;
		}
	}

	const path = event.url.pathname;
	const method = event.request.method;
	const locale = resolveLocale(event);
	const ua = event.request.headers.get('user-agent') || '';
	const isMobileApp =
		ua.includes('SujetStoreAndroidApp') ||
		ua.includes('SujetStoreDesktopApp') ||
		event.url.searchParams.get('app_ui') === '1';

	event.locals.locale = locale;
	event.locals.isMobileApp = isMobileApp;

	// Phase 0 Urgent Site Lock Shield (blocks public pages, PDFs, APIs, sitemap with HTTP 503 while Staff bypass 100%)
	if (!isInternalStaticBuild) {
		const siteLock = await getSiteLockConfig();
		const isLocked = siteLock.mode !== 'live';
		event.locals.siteLockActive = isLocked;

		const isAdminBypass = Boolean(
			event.locals.user && ['superadmin', 'admin'].includes(event.locals.user.role)
		);
		const isAppAllowed = siteLock.mode === 'app_only' && isMobileApp;

		if (isLocked && !isAdminBypass && !isAppAllowed) {
			const isAllowedPublicAsset =
				path === '/admin/login' ||
				path === '/admin/logout' ||
				path.startsWith('/_app/') ||
				path.startsWith('/logo') ||
				path.startsWith('/favicon') ||
				path.startsWith('/icon-') ||
				path === '/apple-touch-icon.png' ||
				path === '/manifest.json' ||
				path === '/service-worker.js' ||
				(siteLock.mode === 'app_only' && path.startsWith('/app/'));

			if (!isAllowedPublicAsset) {
				const isApiOrMedia =
					path.startsWith('/api/') ||
					path.startsWith('/documents/') ||
					path.startsWith('/generated/') ||
					path.startsWith('/uploads/') ||
					path === '/sitemap.xml' ||
					path === '/robots.txt';

				if (isApiOrMedia) {
					recordAuditEvent({ event, eventType: 'blocked_site_lock', statusCode: 503 });
					return new Response(
						JSON.stringify({
							error: 'المنصة مغلقة مؤقتاً للتحديث — يرجى العودة قريباً',
							mode: siteLock.mode
						}),
						{
							status: 503,
							headers: {
								'Content-Type': 'application/json; charset=utf-8',
								'Cache-Control': 'private, no-store',
								'Retry-After': '3600'
							}
						}
					);
				}

				recordAuditEvent({ event, eventType: 'site_lock_view', statusCode: 503 });
				return new Response(renderSiteLockHtml(siteLock, locale), {
					status: 503,
					headers: {
						'Content-Type': 'text/html; charset=utf-8',
						'Cache-Control': 'private, no-store',
						'Retry-After': '3600'
					}
				});
			}
		}
	}

	// Rate limit abusive GET media/PDF scraping (non-staff; skip individual ?page=N preview images)
	if (
		!isInternalStaticBuild &&
		method === 'GET' &&
		!isStaffRole(event.locals.user?.role) &&
		(path.startsWith('/documents/') || path.startsWith('/generated/') || path.startsWith('/api/media/')) &&
		!path.toLowerCase().endsWith('.svg') &&
		!event.url.searchParams.has('page')
	) {
		const ip = getClientIp(event);
		const rl = checkRateLimit(`media-get:${ip}`, 45, 60 * 60 * 1000);
		if (!rl.allowed) {
			recordAuditEvent({ event, eventType: 'blocked_rate_limit', statusCode: 429 });
			return json(
				{ error: 'تم تجاوز الحد المسموح لتحميل الملفات. يرجى الانتظار قليلاً.' },
				{
					status: 429,
					headers: {
						'Retry-After': String(Math.max(60, Math.ceil((rl.resetAt - Date.now()) / 1000)))
					}
				}
			);
		}
	}

	// Rate limit abusive POST endpoints
	if (!isInternalStaticBuild && method === 'POST') {
		const ip = getClientIp(event);
		let limitRule: { bucket: string; max: number; windowMs: number } | null = null;
		if (path === '/admin/login' || path === '/auth/login' || path === '/auth/register') {
			limitRule = { bucket: 'auth', max: 20, windowMs: 10 * 60 * 1000 };
		} else if (path === '/api/comments' || path === '/api/ratings') {
			limitRule = { bucket: 'feedback', max: 30, windowMs: 10 * 60 * 1000 };
		} else if (path.startsWith('/api/quizzes/') && path.endsWith('/submit')) {
			limitRule = { bucket: 'quiz-submit', max: 40, windowMs: 10 * 60 * 1000 };
		} else if (path === '/student/activate') {
			limitRule = { bucket: 'voucher', max: 15, windowMs: 10 * 60 * 1000 };
		}

		if (limitRule) {
			const rl = checkRateLimit(`${limitRule.bucket}:${ip}`, limitRule.max, limitRule.windowMs);
			if (!rl.allowed) {
				return json(
					{ error: 'تم تجاوز الحد المسموح من المحاولات. يرجى الانتظار قليلاً ثم المحاولة مرة أخرى.' },
					{ status: 429 }
				);
			}
		}
	}

	// Protect staff-only APIs unconditionally
	const isProtectedAdminApi =
		path.startsWith('/api/admin') ||
		path.startsWith('/api/sujet-builder') ||
		path === '/api/upload-image' ||
		path === '/api/generate-pdf';

	if (isProtectedAdminApi) {
		if (!event.locals.user) {
			return json({ error: 'غير مصرح — يرجى تسجيل الدخول أولاً' }, { status: 401 });
		}
		if (!isStaffRole(event.locals.user.role)) {
			return json({ error: 'ليس لديك صلاحية الوصول إلى هذه الواجهة' }, { status: 403 });
		}
		if (path.startsWith('/api/admin/users') && event.locals.user.role !== 'superadmin') {
			return json({ error: 'هذه الصلاحية محصورة بالمدير العام فقط' }, { status: 403 });
		}
		if (method === 'DELETE' && event.locals.user.role === 'editor') {
			return json({ error: 'المحرّر لا يملك صلاحية الحذف' }, { status: 403 });
		}
	}

	// Protect /admin UI pages
	if (path.startsWith('/admin')) {
		if (path === '/admin/login') {
			if (event.locals.user) {
				if (isStaffRole(event.locals.user.role)) {
					throw redirect(302, '/admin');
				}
				throw redirect(302, '/student');
			}
		} else {
			if (!event.locals.user) {
				throw redirect(302, '/admin/login');
			}
			const role = event.locals.user.role;
			if (!isStaffRole(role)) {
				throw redirect(302, '/');
			}
			if (path.startsWith('/admin/users') && role !== 'superadmin') {
				throw redirect(302, '/admin');
			}
		}
	}

	// Protect /student UI & authenticated student/bookmark APIs
	const requiresStudentAuth =
		path.startsWith('/student') ||
		path.startsWith('/api/student') ||
		(path.startsWith('/api/bookmarks') && method !== 'GET');

	if (!isInternalStaticBuild && requiresStudentAuth) {
		if (!event.locals.user) {
			if (path.startsWith('/api/')) {
				return json({ error: 'يرجى تسجيل الدخول للمتابعة' }, { status: 401 });
			}
			const nextUrl = encodeURIComponent(path + event.url.search);
			throw redirect(302, `/auth/login?next=${nextUrl}`);
		}
	}

	// Platform Feature Module Route Guard (blocks disabled optional modules cleanly)
	if (
		!isInternalStaticBuild &&
		!path.startsWith('/admin/modules') &&
		!path.startsWith('/admin/site-lock') &&
		!path.startsWith('/admin/login') &&
		!path.startsWith('/_app/')
	) {
		const routeEnabled = await platformRegistry.isRouteEnabled(path);
		if (!routeEnabled) {
			if (path.startsWith('/api/')) {
				return json({ error: 'هذه الإضافة معطّلة حالياً من لوحة التحكم' }, { status: 503 });
			}
			return new Response('هذه الميزة غير مفعّلة حالياً', {
				status: 404,
				headers: { 'Content-Type': 'text/plain; charset=utf-8' }
			});
		}
	}

	const response = await resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace(
				'<html lang="ar" dir="rtl">',
				`<html lang="${locale}" dir="${locale === 'ar' ? 'rtl' : 'ltr'}">`
			)
	});

	// Fire-and-forget telemetry for HTML page views & auth/quiz actions (0ms latency impact)
	if (!isInternalStaticBuild && !path.startsWith('/_app/') && !path.startsWith('/api/admin/')) {
		const ct = response.headers.get('content-type') || '';
		if (method === 'GET' && ct.includes('text/html') && !path.startsWith('/admin')) {
			recordAuditEvent({ event, eventType: 'page_view', statusCode: response.status });
		} else if (method === 'POST' && (path === '/auth/login' || path === '/admin/login')) {
			recordAuditEvent({ event, eventType: 'login_attempt', statusCode: response.status });
		} else if (method === 'POST' && path === '/auth/register') {
			recordAuditEvent({ event, eventType: 'register', statusCode: response.status });
		} else if (method === 'POST' && path === '/api/generator') {
			recordAuditEvent({ event, eventType: 'generator_request', statusCode: response.status });
		} else if (method === 'POST' && path.startsWith('/api/quizzes/') && path.endsWith('/submit')) {
			recordAuditEvent({ event, eventType: 'quiz_submit', statusCode: response.status });
		}
	}

	// Smart HTTP edge/browser caching for HTML GET/HEAD responses (non-static runtime)
	if (!isInternalStaticBuild && (method === 'GET' || method === 'HEAD') && response.status === 200) {
		const contentType = response.headers.get('content-type') || '';
		if (contentType.includes('text/html')) {
			const isPrivatePath =
				path === '/admin' ||
				path.startsWith('/admin/') ||
				path === '/student' ||
				path.startsWith('/student/') ||
				path === '/auth' ||
				path.startsWith('/auth/');

			const isNonCacheablePath =
				isPrivatePath ||
				path === '/api' ||
				path.startsWith('/api/') ||
				path === '/bookmarks' ||
				path.startsWith('/bookmarks/') ||
				path === '/progress' ||
				path.startsWith('/progress/');

			if (event.locals.user || isPrivatePath || response.headers.has('set-cookie')) {
				response.headers.set('Cache-Control', 'private, no-store');
			} else if (!isNonCacheablePath) {
				response.headers.set(
					'Cache-Control',
					'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400'
				);
				const existingVary = response.headers.get('Vary');
				if (!existingVary) {
					response.headers.set('Vary', 'Cookie');
				} else {
					const varyParts = existingVary
						.split(',')
						.map((part) => part.trim().toLowerCase())
						.filter(Boolean);
					if (!varyParts.includes('cookie')) {
						response.headers.set('Vary', `${existingVary}, Cookie`);
					}
				}
			}
		}
	}

	return response;
};
