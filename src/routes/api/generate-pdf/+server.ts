import { json } from '@sveltejs/kit';
import { spawn } from 'child_process';
import { resolve, dirname, join } from 'path';
import { readFile, unlink, mkdir } from 'fs/promises';
import { randomUUID } from 'crypto';
import type { RequestHandler } from './$types';

// Use absolute paths to avoid CWD issues in SvelteKit
const PROJECT_ROOT = resolve('.');
const TYPST_ROOT = join(PROJECT_ROOT, 'src/lib/modules/SujetBuilder/typst');
const GENERATED_DIR = join(PROJECT_ROOT, 'static/generated');

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const { templateId, document: examDoc, isSolution, format = 'pdf' } = body;

		// Pre-process document to fix image paths for Typst
		const processedDoc = JSON.parse(JSON.stringify(examDoc));
		if (processedDoc.exercises) {
			processedDoc.exercises.forEach((ex: any) => {
				const blocks = ex.blocks || ex.content || [];
				blocks.forEach((block: any) => {
					if (block.type === 'image' && block.src?.startsWith('/uploads')) {
						block.src = join('static', block.src);
					}
					if (block.type === 'image_grid' && block.items) {
						block.items.forEach((it: any) => {
							if (it.src?.startsWith('/uploads')) {
								it.src = join('static', it.src);
							}
						});
					}
				});
			});
		}

		// Ensure output directory exists
		await mkdir(GENERATED_DIR, { recursive: true });

		// Generate unique output filename
		const fileId = randomUUID();
		const isSvg = format === 'svg';
		const outputBase = join(GENERATED_DIR, fileId);
		const outputFile = isSvg ? `${outputBase}-{n}.svg` : `${outputBase}.pdf`;
		const dataJson = JSON.stringify(processedDoc);

		const fontsDir = join(PROJECT_ROOT, 'book', 'fonts');

		// Compile Typst to PDF
		const pdfResult = await new Promise<{ success: boolean; error?: string }>((resolve) => {
			const args = [
				'compile', 'main.typ', `${outputBase}.pdf`,
				'--root', PROJECT_ROOT,
				'--font-path', fontsDir,
				'--input', `template-id=${templateId}`,
				'--input', `data=${dataJson}`,
				'--input', `is-solution=${!!isSolution}`
			];
			const proc = spawn('typst', args, { cwd: TYPST_ROOT, timeout: 15000 });
			let stderr = '';
			proc.stderr.on('data', (d) => stderr += d.toString());
			proc.on('close', (c) => c === 0 ? resolve({ success: true }) : resolve({ success: false, error: stderr }));
		});

		if (!pdfResult.success) return json({ success: false, error: pdfResult.error }, { status: 500 });
		
		const pdfBuffer = await readFile(`${outputBase}.pdf`);
		const pdfBase64 = pdfBuffer.toString('base64');
		await unlink(`${outputBase}.pdf`).catch(() => {});

		let responseData: any = { success: true, pdfBase64 };

		if (isSvg) {
			// Also compile to SVG for preview
			await new Promise((resolve) => {
				const proc = spawn('typst', [
					'compile', 'main.typ', `${outputBase}-{n}.svg`,
					'--root', PROJECT_ROOT,
					'--font-path', fontsDir,
					'--input', `template-id=${templateId}`,
					'--input', `data=${dataJson}`,
					'--input', `is-solution=${!!isSolution}`
				], { cwd: TYPST_ROOT, timeout: 15000 });
				proc.on('close', resolve);
			});

			const fs = await import('fs');
			const files = await fs.promises.readdir(GENERATED_DIR);
			const svgFiles = files
				.filter(f => f.startsWith(fileId) && f.endsWith('.svg'))
				.sort((a, b) => {
					const numA = parseInt(a.match(/-(\d+)\.svg$/)?.[1] || '0');
					const numB = parseInt(b.match(/-(\d+)\.svg$/)?.[1] || '0');
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
	}
};
