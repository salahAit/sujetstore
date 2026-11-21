import { error } from '@sveltejs/kit';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import type { RequestHandler } from './$types';

const APK_CANDIDATES = [
	'/var/lib/sujetstore-infra/releases/sujetstore-v1.0.0-release.apk',
	'/var/lib/sujetstore-infra/releases/sujetstore-release.apk'
];

export const GET: RequestHandler = async () => {
	const apkPath = APK_CANDIDATES.find((p) => existsSync(p));
	if (!apkPath) {
		throw error(404, 'حزمة تطبيق الأندرويد غير متوفرة حالياً');
	}

	const bytes = await readFile(apkPath);
	return new Response(new Uint8Array(bytes), {
		status: 200,
		headers: {
			'Content-Type': 'application/vnd.android.package-archive',
			'Content-Length': String(bytes.byteLength),
			'Content-Disposition': 'attachment; filename="SujetStore-v1.0.0.apk"',
			'Cache-Control': 'public, max-age=3600',
			'X-Content-Type-Options': 'nosniff'
		}
	});
};
