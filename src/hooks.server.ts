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

	return await resolve(event);
};
