import { error } from '@sveltejs/kit';
import { readFile } from 'fs/promises';
import { resolveSafeUploadFile } from '#lib/server/uploads';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const resolved = resolveSafeUploadFile(params.path || '');
	if (!resolved) {
		throw error(404, 'الملف غير موجود');
	}

	const data = await readFile(resolved.path);
	return new Response(new Uint8Array(data), {
		headers: {
			'Content-Type': resolved.mime,
			'X-Content-Type-Options': 'nosniff',
			'Cache-Control': 'public, max-age=604800'
		}
	});
};
