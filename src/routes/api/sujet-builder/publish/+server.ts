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
