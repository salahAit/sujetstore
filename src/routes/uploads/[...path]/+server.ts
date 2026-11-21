import { error } from '@sveltejs/kit';
import { readFile } from 'fs/promises';
import { resolveSafeUploadFile } from '#lib/server/uploads';
import { ensurePdfPagesRendered, getRenderedPdfPage } from '#lib/server/pdf-pages';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, url }) => {
	const resolved = resolveSafeUploadFile(params.path || '');
	if (!resolved) {
		throw error(404, 'الملف غير موجود');
	}

	const data = await readFile(resolved.path);
	const bytes = new Uint8Array(data);

	if (resolved.mime === 'application/pdf') {
		const renderMode = url.searchParams.get('render');
		const pageParam = url.searchParams.get('page');
		const cacheKey = `upload:${resolved.path}:${bytes.byteLength}`;

		if (renderMode === 'pages') {
			const pageCount = await ensurePdfPagesRendered(cacheKey, bytes);
			return new Response(
				JSON.stringify({
					pageCount,
					pages: Array.from({ length: pageCount }, (_, i) => i + 1)
				}),
				{
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						'Cache-Control': 'private, max-age=300'
					}
				}
			);
		}

		if (pageParam && /^\d+$/.test(pageParam)) {
			const rendered = await getRenderedPdfPage(cacheKey, bytes, parseInt(pageParam, 10));
			if (!rendered) throw error(404, 'الصفحة غير موجودة');
			return new Response(new Uint8Array(rendered.bytes), {
				headers: {
					'Content-Type': 'image/jpeg',
					'Content-Length': String(rendered.bytes.byteLength),
					'Cache-Control': 'private, max-age=300',
					'X-Content-Type-Options': 'nosniff'
				}
			});
		}
	}

	return new Response(bytes, {
		headers: {
			'Content-Type': resolved.mime,
			'X-Content-Type-Options': 'nosniff',
			'Cache-Control': 'public, max-age=604800'
		}
	});
};
