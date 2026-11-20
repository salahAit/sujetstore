import type { RequestHandler } from './$types';
import { serveProtectedMedia } from '#lib/server/storage';

export const GET: RequestHandler = async ({ params, locals }) => {
	return serveProtectedMedia('documents', params.path || '', locals);
};
