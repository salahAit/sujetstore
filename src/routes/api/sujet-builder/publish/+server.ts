import { json } from '@sveltejs/kit';
import { contentDatabase } from '$lib/server/db';
import { documents, yearSubjects } from '$lib/server/db/schema-content';
import { eq, and, isNull } from 'drizzle-orm';
import { spawn } from 'child_process';
import { resolve, join } from 'path';
import { readFile, mkdir } from 'fs/promises';
import { randomUUID } from 'crypto';
import slugify from 'slugify';
import type { RequestHandler } from './$types';

const PROJECT_ROOT = resolve('.');
const TYPST_ROOT = join(PROJECT_ROOT, 'src/lib/modules/SujetBuilder/typst');
const UPLOADS_DIR = join(PROJECT_ROOT, 'static/uploads/documents');

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const { templateId, document: examDoc, isPublished, title } = body;

		if (!templateId || !examDoc || !title) {
			return json({ success: false, error: 'Missing required fields' }, { status: 400 });
		}

		const metadata = examDoc.metadata;
		if (!metadata || !metadata.yearId || !metadata.subjectId || !metadata.docType || !metadata.trimesterId) {
			return json({ success: false, error: 'Invalid document metadata' }, { status: 400 });
		}

		// Find yearSubjectId
		let conditions = [
			eq(yearSubjects.yearId, metadata.yearId),
			eq(yearSubjects.subjectId, metadata.subjectId)
		];

		if (metadata.streamId && metadata.streamId !== 'undefined' && metadata.streamId !== 'null') {
			conditions.push(eq(yearSubjects.streamId, metadata.streamId));
		} else {
			conditions.push(isNull(yearSubjects.streamId));
		}

		const [mapping] = await contentDatabase
			.select()
			.from(yearSubjects)
			.where(and(...conditions))
			.limit(1);

		if (!mapping) {
			return json({ success: false, error: 'Invalid curriculum mapping' }, { status: 400 });
		}

		// Pre-process document to fix image paths and sanitize content for Typst
		const processedDoc = JSON.parse(JSON.stringify(examDoc));

		const TYPST_MATH_WORDS = new Set([
			'sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'arcsin', 'arccos', 'arctan', 'sinh', 'cosh', 'tanh', 'log', 'ln', 'exp', 'lim', 'liminf', 'limsup', 'max', 'min', 'inf', 'sup', 'det', 'dim', 'ker', 'hom', 'mod', 'gcd', 'lcm', 'arg', 'deg',
			'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega',
			'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega',
			'cal', 'bb', 'frak', 'bold', 'italic', 'serif', 'sans', 'mono', 'text', 'op', 'upright', 'math', 'sqrt', 'root', 'abs', 'norm', 'floor', 'ceil', 'round', 'vec', 'hat', 'bar', 'tilde', 'dot', 'ddot', 
			'rightarrow', 'leftarrow', 'leftrightarrow', 'Rightarrow', 'Leftarrow', 'Leftrightarrow', 'times', 'div', 'approx', 'neq', 'leq', 'geq', 'in', 'notin', 'subset', 'supset', 'cup', 'cap', 'emptyset', 'infty', 'nabla', 'partial', 'sum', 'prod', 'int', 'oint'
		]);

		function sanitizeForTypst(text: string): string {
			if (!text || typeof text !== 'string') return text;
			return text.replace(/\$([^$]+)\$/g, (match, inner) => {
				let fixed = inner.replace(/[a-zA-Z]{2,}/g, (word: string) => {
					if (TYPST_MATH_WORDS.has(word)) return word;
					return word.split('').join(' ');
				});
				fixed = fixed.replace(/(\d)([a-zA-Z])/g, '$1 $2');
				return `$${fixed}$`;
			});
		}

		function sanitizeBlock(block: any) {
			if (block.content && typeof block.content === 'string') {
				block.content = sanitizeForTypst(block.content);
			}
			if (block.answer && typeof block.answer === 'string') {
				block.answer = sanitizeForTypst(block.answer);
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
		await mkdir(UPLOADS_DIR, { recursive: true });

		// Generate unique output filename
		const pdfCode = randomUUID().slice(0, 8);
		const filename = `${metadata.docType}-${metadata.yearId}-${pdfCode}.pdf`;
		const outputFile = join(UPLOADS_DIR, filename);
		const dataJson = JSON.stringify(processedDoc);

		// Compile Typst to PDF
		const result = await new Promise<{ success: boolean; error?: string }>((resolvePromise) => {
			const args = [
				'compile',
				'main.typ',
				outputFile,
				'--root', PROJECT_ROOT,
				'--font-path', join(PROJECT_ROOT, 'static', 'fonts'),
				'--input', `template-id=${templateId}`,
				'--input', `data=${dataJson}`,
				'--input', `is-solution=false`
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
					resolvePromise({ success: true });
				} else {
					resolvePromise({ success: false, error: stderr || `Typst exited with code ${code}` });
				}
			});

			proc.on('error', (err) => {
				resolvePromise({ success: false, error: `Failed to spawn typst: ${err.message}` });
			});
		});

		if (!result.success) {
			return json({ success: false, error: result.error }, { status: 500 });
		}

		// Measure file size
		let size = 0;
		try {
			const pdfBuffer = await readFile(outputFile);
			size = pdfBuffer.length;
		} catch (e) {
			console.warn('Could not read PDF size', e);
		}

		// Add random code to slug to prevent collision
		const customSlug = slugify(`${title}-${pdfCode}`, { lower: true, strict: true, locale: 'ar' });

		const newDoc = await contentDatabase.insert(documents).values({
			yearSubjectId: mapping.id,
			trimesterId: metadata.trimesterId,
			title: title,
			slug: customSlug,
			type: metadata.docType,
			content: JSON.stringify(examDoc),
			pdfUrl: `/uploads/documents/${filename}`,
			year: metadata.academicYear,
			isPublished: isPublished ?? false,
			fileSize: size,
			downloadCount: 0
		}).returning();

		return json({
			success: true,
			document: newDoc[0]
		});

	} catch (err: any) {
		console.error('Publish API Error:', err);
		return json({ success: false, error: err.message || 'Unknown error' }, { status: 500 });
	}
};
