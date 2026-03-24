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

		// Pre-process document to fix image paths and sanitize content for Typst
		const processedDoc = JSON.parse(JSON.stringify(examDoc));

		const TYPST_MATH_WORDS = new Set([
			'sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'arcsin', 'arccos', 'arctan', 'sinh', 'cosh', 'tanh', 'log', 'ln', 'exp', 'lim', 'liminf', 'limsup', 'max', 'min', 'inf', 'sup', 'det', 'dim', 'ker', 'hom', 'mod', 'gcd', 'lcm', 'arg', 'deg',
			'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega',
			'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega',
			'cal', 'bb', 'frak', 'bold', 'italic', 'serif', 'sans', 'mono', 'text', 'op', 'upright', 'math', 'sqrt', 'root', 'abs', 'norm', 'floor', 'ceil', 'round', 'vec', 'hat', 'bar', 'tilde', 'dot', 'ddot', 
			'rightarrow', 'leftarrow', 'leftrightarrow', 'Rightarrow', 'Leftarrow', 'Leftrightarrow', 'times', 'div', 'approx', 'neq', 'leq', 'geq', 'in', 'notin', 'subset', 'supset', 'cup', 'cap', 'emptyset', 'infty', 'nabla', 'partial', 'sum', 'prod', 'int', 'oint'
		]);

		function sanitizeMathInner(inner: string): string {
			if (!inner) return inner;
			// 1. Handle Latin words (split if not known, e.g. "cm" -> "c m")
			let fixed = inner.replace(/[a-zA-Z]{2,}/g, (word: string) => {
				if (TYPST_MATH_WORDS.has(word)) return word;
				return word.split('').join(' ');
			});
			// 2. Handle Arabic words (wrap in quotes to treat as literal text in math mode)
			fixed = fixed.replace(/[\u0600-\u06FF]{2,}/g, (word: string) => {
				return `"${word}"`;
			});
			// 3. Spacing between numbers and units/letters
			fixed = fixed.replace(/(\d)([a-zA-Z\u0600-\u06FF])/g, '$1 $2');
			return fixed;
		}

		function sanitizeForTypst(text: string): string {
			if (!text || typeof text !== 'string') return text;
			return text.replace(/\$([^$]+)\$/g, (match, inner) => {
				return `$${sanitizeMathInner(inner)}$`;
			});
		}

		function sanitizeBlock(block: any) {
			if (block.type === 'math' && block.content && typeof block.content === 'string') {
				// Special case: math block is entirely math context
				block.content = sanitizeMathInner(block.content);
			} else {
				if (block.content && typeof block.content === 'string') {
					block.content = sanitizeForTypst(block.content);
				}
				if (block.answer && typeof block.answer === 'string') {
					block.answer = sanitizeForTypst(block.answer);
				}
			}
		}

		if (processedDoc.exercises) {
			processedDoc.exercises.forEach((ex: any) => {
				if (ex.instruction) ex.instruction = sanitizeForTypst(ex.instruction);
				const blocks = ex.blocks || ex.content || [];
				blocks.forEach((block: any) => {
					sanitizeBlock(block);
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
		const fontPath = join(process.cwd(), 'static', 'fonts');
		console.log('[generate-pdf] CWD:', process.cwd());
		console.log('[generate-pdf] Font path:', fontPath);
		console.log('[generate-pdf] Font in metadata:', processedDoc?.metadata?.font);
		console.log('[generate-pdf] templateId:', templateId);

		// Compile Typst to PDF
		const pdfResult = await new Promise<{ success: boolean; error?: string }>((res) => {
			const args = [
				'compile', 'main.typ', `${outputBase}.pdf`,
				'--root', process.cwd(),
				'--font-path', fontPath,
				'--input', `template-id=${templateId}`,
				'--input', `data=${dataJson}`,
				'--input', `is-solution=${!!isSolution}`
			];
			console.log('[generate-pdf] Typst args (no data):', args.filter(a => !a.startsWith('{')).join(' '));
			const proc = spawn('typst', args, { cwd: TYPST_ROOT, timeout: 15000 });
			let stderr = '';
			proc.stderr.on('data', (d) => stderr += d.toString());
			proc.on('close', (c) => c === 0 ? res({ success: true }) : res({ success: false, error: stderr }));
		});

		if (!pdfResult.success) return json({ success: false, error: pdfResult.error }, { status: 500 });
		
		const pdfBuffer = await readFile(`${outputBase}.pdf`);
		const pdfBase64 = pdfBuffer.toString('base64');
		await unlink(`${outputBase}.pdf`).catch(() => {});

		let responseData: any = { success: true, pdfBase64 };

		if (isSvg) {
			// Also compile to SVG for preview
			await new Promise((res) => {
				const proc = spawn('typst', [
					'compile', 'main.typ', `${outputBase}-{n}.svg`,
					'--root', PROJECT_ROOT,
					'--font-path', fontPath,
					'--input', `template-id=${templateId}`,
					'--input', `data=${dataJson}`,
					'--input', `is-solution=${!!isSolution}`
				], { cwd: TYPST_ROOT, timeout: 15000 });
				proc.on('close', res);
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
