import type { Handle } from '@sveltejs/kit';
import { validateSession, setSessionTokenCookie, deleteSessionTokenCookie } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('admin_session');

	if (sessionId) {
		const { session, user } = (await validateSession(sessionId)) ?? { session: null, user: null };
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

	// Protect /admin routes, allow /admin/login
	const path = event.url.pathname;
	if (path.startsWith('/admin')) {
		if (path === '/admin/login') {
			if (event.locals.user) {
				throw redirect(302, '/admin');
			}
		} else {
			if (!event.locals.user) {
				throw redirect(302, '/admin/login');
			}
		}
	}

	const response = await resolve(event);
	return response;
};
