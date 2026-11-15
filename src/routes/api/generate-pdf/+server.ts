import { json } from '@sveltejs/kit';
import { spawn } from 'child_process';
import { resolve, join } from 'path';
import { readFile, unlink, mkdir, writeFile } from 'fs/promises';
import { randomUUID } from 'crypto';
import { sanitizeTypstDocument } from '#lib/server/typst';
import type { RequestHandler } from './$types';

const PROJECT_ROOT = resolve('.');
const TYPST_ROOT = join(PROJECT_ROOT, 'src/lib/modules/SujetBuilder/typst');
const GENERATED_DIR = join(PROJECT_ROOT, 'static/generated');

export const POST: RequestHandler = async ({ request }) => {
	const fileId = randomUUID();
	const outputBase = join(GENERATED_DIR, fileId);
	const dataFileAbs = `${outputBase}.json`;

	try {
		const body = await request.json();
		const { templateId = 'middle/exam', document: examDoc, isSolution, format = 'pdf' } = body;
		if (!examDoc) {
			return json({ success: false, error: 'Missing document payload' }, { status: 400 });
		}

		const processedDoc = sanitizeTypstDocument(examDoc);
		await mkdir(GENERATED_DIR, { recursive: true });
		await writeFile(dataFileAbs, JSON.stringify(processedDoc), 'utf-8');

		const isSvg = format === 'svg';
		const dataFileRel = `/static/generated/${fileId}.json`;
		const fontPath = join(PROJECT_ROOT, 'static', 'fonts');

		const pdfResult = await new Promise<{ success: boolean; error?: string }>((res) => {
			const args = [
				'compile',
				'main.typ',
				`${outputBase}.pdf`,
				'--root',
				PROJECT_ROOT,
				'--font-path',
				fontPath,
				'--input',
				`template-id=${templateId}`,
				'--input',
				`data-file=${dataFileRel}`,
				'--input',
				`is-solution=${!!isSolution}`
			];
			const proc = spawn('typst', args, { cwd: TYPST_ROOT, timeout: 15000 });
			let stderr = '';
			proc.stderr.on('data', (d) => (stderr += d.toString()));
			proc.on('close', (c) => (c === 0 ? res({ success: true }) : res({ success: false, error: stderr })));
			proc.on('error', (err) => res({ success: false, error: err.message }));
		});

		if (!pdfResult.success) {
			return json({ success: false, error: pdfResult.error }, { status: 500 });
		}

		const pdfBuffer = await readFile(`${outputBase}.pdf`);
		const pdfBase64 = pdfBuffer.toString('base64');
		await unlink(`${outputBase}.pdf`).catch(() => {});

		const responseData: Record<string, any> = { success: true, pdfBase64 };

		if (isSvg) {
			await new Promise((res) => {
				const proc = spawn(
					'typst',
					[
						'compile',
						'main.typ',
						`${outputBase}-{n}.svg`,
						'--root',
						PROJECT_ROOT,
						'--font-path',
						fontPath,
						'--input',
						`template-id=${templateId}`,
						'--input',
						`data-file=${dataFileRel}`,
						'--input',
						`is-solution=${!!isSolution}`
					],
					{ cwd: TYPST_ROOT, timeout: 15000 }
				);
				proc.on('close', res);
				proc.on('error', res);
			});

			const { readdir } = await import('fs/promises');
			const files = await readdir(GENERATED_DIR);
			const svgFiles = files
				.filter((f) => f.startsWith(fileId) && f.endsWith('.svg'))
				.sort((a, b) => {
					const numA = parseInt(a.match(/-(\d+)\.svg$/)?.[1] || '0', 10);
					const numB = parseInt(b.match(/-(\d+)\.svg$/)?.[1] || '0', 10);
					return numA - numB;
				});

			responseData.svgPages = await Promise.all(
				svgFiles.map(async (f) => {
					const p = join(GENERATED_DIR, f);
					const b = await readFile(p);
					await unlink(p).catch(() => {});
					return b.toString('base64');
				})
			);
		}

		return json(responseData);
	} catch (err: any) {
		return json({ success: false, error: err.message || 'Unknown error' }, { status: 500 });
	} finally {
		await unlink(dataFileAbs).catch(() => {});
	}
};
