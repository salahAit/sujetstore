import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const TYPST_DIR = join(process.cwd(), 'src/lib/modules/SujetBuilder/typst');

function gatherFiles(dir: string, base: string = ''): Record<string, string> {
	const result: Record<string, string> = {};
	const entries = readdirSync(dir);
	for (const entry of entries) {
		const fullPath = join(dir, entry);
		const relPath = base ? `${base}/${entry}` : entry;
		const stat = statSync(fullPath);
		if (stat.isDirectory()) {
			Object.assign(result, gatherFiles(fullPath, relPath));
		} else if (entry.endsWith('.typ')) {
			result[relPath] = readFileSync(fullPath, 'utf-8');
		}
	}
	return result;
}

function gatherBinaryFiles(dir: string, base: string = ''): Record<string, string> {
	const result: Record<string, string> = {};
	const entries = readdirSync(dir);
	for (const entry of entries) {
		const fullPath = join(dir, entry);
		const relPath = base ? `${base}/${entry}` : entry;
		const stat = statSync(fullPath);
		if (stat.isDirectory()) {
			Object.assign(result, gatherBinaryFiles(fullPath, relPath));
		} else if (/\.(png|jpg|jpeg|svg|webp|pdf)$/i.test(entry)) {
			const buf = readFileSync(fullPath);
			result[relPath] = buf.toString('base64');
		}
	}
	return result;
}

export const GET: RequestHandler = async () => {
	try {
		const typFiles = gatherFiles(TYPST_DIR);
		const binaryFiles = gatherBinaryFiles(TYPST_DIR);
		
		return json({
			success: true,
			typFiles,
			binaryFiles
		});
	} catch (err: any) {
		return json({ success: false, error: err.message }, { status: 500 });
	}
};
