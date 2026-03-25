import { json } from '@sveltejs/kit';
import { contentDatabase } from '$lib/server/db';
import { documents, yearSubjects, bankExercises } from '$lib/server/db/schema-content';
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
		await mkdir(UPLOADS_DIR, { recursive: true });

		// Generate unique output filenames
		const pdfCode = randomUUID().slice(0, 8);
		const filename = `${metadata.docType}-${metadata.yearId}-${pdfCode}.pdf`;
		const solutionFilename = `${metadata.docType}-${metadata.yearId}-${pdfCode}-solution.pdf`;
		const outputFile = join(UPLOADS_DIR, filename);
		const solutionOutputFile = join(UPLOADS_DIR, solutionFilename);
		const dataJson = JSON.stringify(processedDoc);
		const fontPath = join(PROJECT_ROOT, 'static', 'fonts');

		// Helper: compile Typst to PDF
		function compileTypst(output: string, isSolution: boolean): Promise<{ success: boolean; error?: string }> {
			return new Promise((resolvePromise) => {
				const args = [
					'compile', 'main.typ', output,
					'--root', PROJECT_ROOT,
					'--font-path', fontPath,
					'--input', `template-id=${templateId}`,
					'--input', `data=${dataJson}`,
					'--input', `is-solution=${isSolution}`
				];
				const proc = spawn('typst', args, {
					cwd: TYPST_ROOT, timeout: 15000,
					stdio: ['ignore', 'pipe', 'pipe']
				});
				let stderr = '';
				proc.stderr.on('data', (d) => { stderr += d.toString(); });
				proc.on('close', (code) => {
					code === 0
						? resolvePromise({ success: true })
						: resolvePromise({ success: false, error: stderr || `Typst exited with code ${code}` });
				});
				proc.on('error', (err) => {
					resolvePromise({ success: false, error: `Failed to spawn typst: ${err.message}` });
				});
			});
		}

		// 1. Compile subject PDF
		const subjectResult = await compileTypst(outputFile, false);
		if (!subjectResult.success) {
			return json({ success: false, error: subjectResult.error }, { status: 500 });
		}

		// 2. Compile solution PDF
		const solutionResult = await compileTypst(solutionOutputFile, true);
		if (!solutionResult.success) {
			console.warn('Solution PDF failed:', solutionResult.error);
			// Continue anyway — subject PDF is more important
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
			solutionUrl: solutionResult.success ? `/uploads/documents/${solutionFilename}` : null,
			hasSolution: solutionResult.success,
			year: metadata.academicYear,
			isPublished: isPublished ?? false,
			fileSize: size,
			downloadCount: 0
		}).returning();

		const docId = newDoc[0].id;

		// Sync exercises to the bank
		const ordinals = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن'];
		if (examDoc.exercises && examDoc.exercises.length > 0) {
			const bankInserts = examDoc.exercises.map((ex: any, idx: number) => ({
				yearSubjectId: mapping.id,
				documentId: docId,
				trimesterId: metadata.trimesterId || null,
				title: ex.title || `التمرين ${ordinals[idx] || (idx + 1)}`,
				content: ex.blocks || ex.content || [],
				points: typeof ex.points === 'string' ? parseInt(ex.points) || 0 : (ex.points || 0),
				tags: null
			}));
			try {
				await contentDatabase.insert(bankExercises).values(bankInserts);
			} catch (bankErr) {
				console.warn('Failed to sync exercises to bank:', bankErr);
			}
		}

		return json({
			success: true,
			document: newDoc[0]
		});

	} catch (err: any) {
		console.error('Publish API Error:', err);
		return json({ success: false, error: err.message || 'Unknown error' }, { status: 500 });
	}
};
