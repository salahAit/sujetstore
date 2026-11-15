import { json } from '@sveltejs/kit';
import { contentDatabase } from '#lib/server/db';
import { documents, yearSubjects, bankExercises } from '#lib/server/db/schema-content';
import { eq, and, isNull } from 'drizzle-orm';
import { resolve, join } from 'path';
import { mkdir } from 'fs/promises';
import { randomUUID } from 'crypto';
import slugify from 'slugify';
import { compileTypstPdf } from '#lib/server/typst';
import type { RequestHandler } from './$types';

const PROJECT_ROOT = resolve('.');
const UPLOADS_DIR = join(PROJECT_ROOT, 'data/uploads/documents');

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const {
			docId,
			templateId = 'middle/exam',
			document: examDoc,
			isPublished,
			accessTier = 'public',
			title
		} = body;

		if (!examDoc || !title) {
			return json({ success: false, error: 'بيانات الموضوع أو العنوان ناقصة' }, { status: 400 });
		}

		const metadata = examDoc.metadata;
		if (!metadata || !metadata.yearId || !metadata.subjectId || !metadata.docType || !metadata.trimesterId) {
			return json({ success: false, error: 'بيانات المنهج غير مكتملة' }, { status: 400 });
		}

		const conditions = [
			eq(yearSubjects.yearId, metadata.yearId),
			eq(yearSubjects.subjectId, metadata.subjectId)
		];
		if (metadata.streamId && metadata.streamId !== 'undefined' && metadata.streamId !== 'null') {
			conditions.push(eq(yearSubjects.streamId, metadata.streamId));
		} else {
			conditions.push(isNull(yearSubjects.streamId));
		}

		let [mapping] = await contentDatabase
			.select()
			.from(yearSubjects)
			.where(and(...conditions))
			.limit(1);

		if (!mapping) {
			[mapping] = await contentDatabase
				.select()
				.from(yearSubjects)
				.where(and(eq(yearSubjects.yearId, metadata.yearId), eq(yearSubjects.subjectId, metadata.subjectId)))
				.limit(1);
		}

		if (!mapping) {
			return json({ success: false, error: 'ربط السنة والمادة غير موجود' }, { status: 400 });
		}

		await mkdir(UPLOADS_DIR, { recursive: true });
		const pdfCode = randomUUID().slice(0, 8);
		const filename = `${metadata.docType}-${metadata.yearId}-${pdfCode}.pdf`;
		const solutionFilename = `${metadata.docType}-${metadata.yearId}-${pdfCode}-solution.pdf`;
		const outputFile = join(UPLOADS_DIR, filename);
		const solutionOutputFile = join(UPLOADS_DIR, solutionFilename);

		const subjectResult = await compileTypstPdf({
			examDoc,
			outputPath: outputFile,
			templateId,
			isSolution: false
		});
		if (!subjectResult.success) {
			return json({ success: false, error: subjectResult.error }, { status: 500 });
		}

		const solutionResult = await compileTypstPdf({
			examDoc,
			outputPath: solutionOutputFile,
			templateId,
			isSolution: true
		});

		const validTier =
			accessTier === 'registered' || accessTier === 'premium' ? accessTier : 'public';

		let savedDoc: typeof documents.$inferSelect | undefined;

		if (docId && Number.isInteger(Number(docId))) {
			const targetId = Number(docId);
			const [updated] = await contentDatabase
				.update(documents)
				.set({
					yearSubjectId: mapping.id,
					trimesterId: metadata.trimesterId,
					title,
					titleAr: title,
					type: metadata.docType,
					content: JSON.stringify(examDoc),
					pdfUrl: `/uploads/documents/${filename}`,
					solutionUrl: solutionResult.success ? `/uploads/documents/${solutionFilename}` : null,
					hasSolution: solutionResult.success,
					year: metadata.academicYear,
					accessTier: validTier,
					isPublished: isPublished ?? false,
					fileSize: subjectResult.size ?? 0,
					updatedAt: new Date().toISOString()
				})
				.where(eq(documents.id, targetId))
				.returning();
			savedDoc = updated;
			if (savedDoc) {
				await contentDatabase.delete(bankExercises).where(eq(bankExercises.documentId, savedDoc.id));
			}
		}

		if (!savedDoc) {
			const customSlug =
				slugify(`${title}-${pdfCode}`, { lower: true, strict: true }) || `sujet-${pdfCode}`;
			const [inserted] = await contentDatabase
				.insert(documents)
				.values({
					yearSubjectId: mapping.id,
					trimesterId: metadata.trimesterId,
					title,
					titleAr: title,
					slug: customSlug,
					type: metadata.docType,
					content: JSON.stringify(examDoc),
					pdfUrl: `/uploads/documents/${filename}`,
					solutionUrl: solutionResult.success ? `/uploads/documents/${solutionFilename}` : null,
					hasSolution: solutionResult.success,
					year: metadata.academicYear,
					accessTier: validTier,
					isPublished: isPublished ?? false,
					fileSize: subjectResult.size ?? 0,
					downloadCount: 0
				})
				.returning();
			savedDoc = inserted;
		}

		const ordinals = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن'];
		if (savedDoc && Array.isArray(examDoc.exercises) && examDoc.exercises.length > 0) {
			const bankInserts = examDoc.exercises.map((ex: any, idx: number) => ({
				yearSubjectId: mapping.id,
				documentId: savedDoc!.id,
				trimesterId: metadata.trimesterId || null,
				title: ex.title || `التمرين ${ordinals[idx] || idx + 1}`,
				content: ex.blocks || ex.content || [],
				points: typeof ex.points === 'string' ? parseInt(ex.points, 10) || 0 : ex.points || 0,
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
			document: savedDoc
		});
	} catch (err: any) {
		console.error('Publish API Error:', err);
		return json({ success: false, error: err.message || 'Unknown error' }, { status: 500 });
	}
};
