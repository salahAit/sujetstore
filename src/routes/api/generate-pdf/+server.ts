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
		const { templateId, document: examDoc, isSolution } = body;

		// Pre-process document to fix image paths for Typst
		// Typst needs paths relative to the --root (project root)
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

		// Generate unique output filename (absolute path)
		const pdfName = `sujet-${randomUUID()}.pdf`;
		const outputFile = join(GENERATED_DIR, pdfName);
		const dataJson = JSON.stringify(processedDoc);

		// Compile Typst to PDF from the typst root directory
		const result = await new Promise<{ success: boolean; error?: string }>((resolve) => {
			const args = [
				'compile',
				'main.typ',
				outputFile,
				'--root', PROJECT_ROOT,
				'--input', `template-id=${templateId}`,
				'--input', `data=${dataJson}`,
				'--input', `is-solution=${!!isSolution}`
			];

			const proc = spawn('typst', args, {
				cwd: TYPST_ROOT,
				timeout: 15000,
				stdio: ['ignore', 'pipe', 'pipe']
			});

			let stderr = '';
			proc.stderr.on('data', (data) => { stderr += data.toString(); });

			proc.on('close', (code) => {
				if (code === 0) {
					resolve({ success: true });
				} else {
					resolve({ success: false, error: stderr || `Typst exited with code ${code}` });
				}
			});

			proc.on('error', (err) => {
				resolve({ success: false, error: `Failed to spawn typst: ${err.message}` });
			});
		});

		if (!result.success) {
			return json({ success: false, error: result.error }, { status: 500 });
		}

		// Read the generated PDF
		const pdfBuffer = await readFile(outputFile);
		const pdfBase64 = pdfBuffer.toString('base64');

		// Cleanup temp file
		await unlink(outputFile).catch(() => {});

		return json({
			success: true,
			pdfBase64
		});

	} catch (err: any) {
		return json({ success: false, error: err.message || 'Unknown error' }, { status: 500 });
	}
};
