import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deleteSessionTokenCookie, invalidateSession } from '#lib/server/auth';

export const POST: RequestHandler = async (event) => {
	if (event.locals.session) {
		await invalidateSession(event.locals.session.id);
	}
	deleteSessionTokenCookie(event);
	throw redirect(302, '/');
};

export const GET: RequestHandler = async (event) => {
	if (event.locals.session) {
		await invalidateSession(event.locals.session.id);
	}
	deleteSessionTokenCookie(event);
	throw redirect(302, '/');
};
