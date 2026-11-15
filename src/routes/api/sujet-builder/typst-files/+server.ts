import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const TYPST_DIR = join(process.cwd(), 'src/lib/modules/SujetBuilder/typst');
const FONTS_DIR = join(process.cwd(), 'static/fonts');

let cachedPayload: { typFiles: Record<string, string>; binaryFiles: Record<string, string> } | null = null;

function gatherFiles(dir: string, base: string = ''): Record<string, string> {
	const result: Record<string, string> = {};
	for (const entry of readdirSync(dir)) {
		const fullPath = join(dir, entry);
		const relPath = base ? `${base}/${entry}` : entry;
		if (statSync(fullPath).isDirectory()) {
			Object.assign(result, gatherFiles(fullPath, relPath));
		} else if (entry.endsWith('.typ')) {
			result[relPath] = readFileSync(fullPath, 'utf-8');
		}
	}
	return result;
}

function gatherBinaryFiles(dir: string, base: string = ''): Record<string, string> {
	const result: Record<string, string> = {};
	for (const entry of readdirSync(dir)) {
		const fullPath = join(dir, entry);
		const relPath = base ? `${base}/${entry}` : entry;
		if (statSync(fullPath).isDirectory()) {
			Object.assign(result, gatherBinaryFiles(fullPath, relPath));
		} else if (/\.(png|jpg|jpeg|webp|pdf|ttf|otf|woff|woff2)$/i.test(entry)) {
			result[relPath] = readFileSync(fullPath).toString('base64');
		}
	}
	return result;
}

export const GET: RequestHandler = async () => {
	try {
		if (!cachedPayload) {
			cachedPayload = {
				typFiles: gatherFiles(TYPST_DIR),
				binaryFiles: {
					...gatherBinaryFiles(TYPST_DIR),
					...gatherBinaryFiles(FONTS_DIR)
				}
			};
		}

		return json(
			{
				success: true,
				typFiles: cachedPayload.typFiles,
				binaryFiles: cachedPayload.binaryFiles
			},
			{
				headers: {
					'Cache-Control': 'private, max-age=300'
				}
			}
		);
	} catch (err: any) {
		return json({ success: false, error: err.message }, { status: 500 });
	}
};
