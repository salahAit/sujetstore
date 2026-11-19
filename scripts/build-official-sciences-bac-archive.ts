import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { compileTypstPdf } from '../src/lib/server/typst';
import { OFFICIAL_BAC_SCIENCES_3AS_SE } from '../src/lib/data/official_bac_sciences/3as_se';
import { OFFICIAL_BAC_SCIENCES_3AS_MATH } from '../src/lib/data/official_bac_sciences/3as_math';
import type { OfficialSciencesBacPaperSpec } from '../src/lib/data/official_bac_sciences/types';
import type { ContentBlock } from '../src/lib/modules/SujetBuilder/types';

const MIN_PDF_BYTES = 20_480;

interface OfficialBacSciencesManifestItem {
	slug: string;
	grade: OfficialSciencesBacPaperSpec['grade'];
	yearSubjectId: number;
	subjectId: 'SCI-SE' | 'SCI-MATH';
	streamId: 'SE' | 'MATH';
	academicYear: string;
	sessionAr: string;
	coefficient: number;
	duration: string;
	titleAr: string;
	themesAr: string[];
	pdfUrl: string;
	solutionUrl: string;
	fileSize: number;
	solutionFileSize: number;
	sourcePdfRelPath: string;
	sourceSha256: string | null;
}

function sha256IfExists(absPath: string): string | null {
	if (!existsSync(absPath)) return null;
	return createHash('sha256').update(readFileSync(absPath)).digest('hex');
}

function assertValidPdf(absPath: string): number {
	if (!existsSync(absPath)) {
		throw new Error(`Compiled official Sciences BAC PDF missing: ${absPath}`);
	}
	const buf = readFileSync(absPath);
	if (buf.length < MIN_PDF_BYTES) {
		throw new Error(
			`Compiled official Sciences BAC PDF too small (${buf.length} bytes): ${absPath}`
		);
	}
	if (buf.subarray(0, 5).toString('ascii') !== '%PDF-') {
		throw new Error(`Invalid %PDF- header on ${absPath}`);
	}
	return buf.length;
}

function sumBlockMarks(blocks: ContentBlock[]): number {
	let total = 0;
	for (const b of blocks) {
		if (b.type === 'text' || b.type === 'typst_raw') {
			if (b.mark && b.mark.trim() !== '') {
				const n = Number(b.mark.replace(',', '.'));
				if (!Number.isFinite(n)) {
					throw new Error(`Invalid mark "${b.mark}" in block`);
				}
				total += n;
			}
		} else if (b.type === 'true_false') {
			for (const it of b.items) total += Number(it.mark.replace(',', '.')) || 0;
		} else if (b.type === 'multiple_choice') {
			for (const g of b.groups) total += Number((g.mark ?? '0').replace(',', '.')) || 0;
		} else if (b.type === 'columns') {
			total += sumBlockMarks(b.children);
		}
	}
	return Math.round(total * 1000) / 1000;
}

function validatePaperSpec(spec: OfficialSciencesBacPaperSpec): void {
	const exList = spec.examDoc.exercises;
	if (spec.grade === '3as_se') {
		if (
			spec.yearSubjectId !== 684 ||
			spec.subjectId !== 'SCI-SE' ||
			spec.streamId !== 'SE' ||
			spec.coefficient !== 6 ||
			spec.duration !== '04 ساعات و30 دقيقة'
		) {
			throw new Error(`Invalid 3as_se metadata contract on ${spec.slug}`);
		}
		const expectedPts = [5, 7, 8];
		if (
			exList.length !== 3 ||
			!expectedPts.every((p, idx) => Number(exList[idx].points) === p)
		) {
			throw new Error(
				`${spec.slug}: expected 3 exercises with points [5, 7, 8], got [${exList.map((e) => e.points).join(', ')}]`
			);
		}
	} else {
		if (
			spec.yearSubjectId !== 704 ||
			spec.subjectId !== 'SCI-MATH' ||
			spec.streamId !== 'MATH' ||
			spec.coefficient !== 2 ||
			spec.duration !== '02 ساعة و30 دقيقة'
		) {
			throw new Error(`Invalid 3as_math metadata contract on ${spec.slug}`);
		}
		const expectedPts = [8, 12];
		if (
			exList.length !== 2 ||
			!expectedPts.every((p, idx) => Number(exList[idx].points) === p)
		) {
			throw new Error(
				`${spec.slug}: expected 2 exercises with points [8, 12], got [${exList.map((e) => e.points).join(', ')}]`
			);
		}
	}

	let paperTotal = 0;
	let imgCount = 0;
	for (const ex of exList) {
		const exPts = Number(ex.points);
		const blockSum = sumBlockMarks(ex.content);
		if (Math.abs(blockSum - exPts) > 1e-6) {
			throw new Error(
				`${spec.slug} (${ex.id ?? ex.num}): block marks sum (${blockSum}) != exercise points (${exPts})`
			);
		}
		paperTotal += blockSum;
		imgCount += ex.content.filter((b) => b.type === 'image').length;
	}
	if (Math.abs(paperTotal - 20) > 1e-6) {
		throw new Error(`${spec.slug}: total paper marks (${paperTotal}) != 20.0`);
	}
	if (imgCount < 2) {
		throw new Error(`${spec.slug}: expected at least 2 embedded vector SVG diagrams, got ${imgCount}`);
	}
}

async function main() {
	const records: OfficialSciencesBacPaperSpec[] = [
		...OFFICIAL_BAC_SCIENCES_3AS_SE,
		...OFFICIAL_BAC_SCIENCES_3AS_MATH
	];

	const items: OfficialBacSciencesManifestItem[] = [];

	for (const rec of records) {
		validatePaperSpec(rec);

		const outDir = resolve('static/documents/official_bac_sciences', rec.grade);
		mkdirSync(outDir, { recursive: true });

		const subjPath = resolve(outDir, `${rec.slug}.pdf`);
		const solPath = resolve(outDir, `${rec.slug}-sol.pdf`);

		const [subjRes, solRes] = await Promise.all([
			compileTypstPdf({
				examDoc: rec.examDoc as unknown as Record<string, any>,
				outputPath: subjPath,
				templateId: rec.templateId,
				isSolution: false
			}),
			compileTypstPdf({
				examDoc: rec.examDoc as unknown as Record<string, any>,
				outputPath: solPath,
				templateId: rec.templateId,
				isSolution: true
			})
		]);

		if (!subjRes.success) {
			throw new Error(`Failed compiling ${rec.slug} subject: ${subjRes.error}`);
		}
		if (!solRes.success) {
			throw new Error(`Failed compiling ${rec.slug} solution: ${solRes.error}`);
		}

		const fileSize = assertValidPdf(subjPath);
		const solutionFileSize = assertValidPdf(solPath);
		const sourceAbs = resolve(rec.sourcePdfRelPath);

		items.push({
			slug: rec.slug,
			grade: rec.grade,
			yearSubjectId: rec.yearSubjectId,
			subjectId: rec.subjectId,
			streamId: rec.streamId,
			academicYear: rec.academicYear,
			sessionAr: rec.sessionAr,
			coefficient: rec.coefficient,
			duration: rec.duration,
			titleAr: rec.titleAr,
			themesAr: rec.themesAr,
			pdfUrl: `/documents/official_bac_sciences/${rec.grade}/${rec.slug}.pdf`,
			solutionUrl: `/documents/official_bac_sciences/${rec.grade}/${rec.slug}-sol.pdf`,
			fileSize,
			solutionFileSize,
			sourcePdfRelPath: rec.sourcePdfRelPath,
			sourceSha256: sha256IfExists(sourceAbs)
		});
		console.log(`Compiled ${rec.slug} (subject=${fileSize}B, solution=${solutionFileSize}B)`);
	}

	const manifestPath = resolve(
		'pipeline/official_bac_sciences/official_bac_sciences_manifest.json'
	);
	mkdirSync(dirname(manifestPath), { recursive: true });
	writeFileSync(
		manifestPath,
		JSON.stringify(
			{
				generated_at: new Date().toISOString(),
				total_papers: items.length,
				total_pdfs: items.length * 2,
				items
			},
			null,
			2
		),
		'utf-8'
	);

	console.log(
		JSON.stringify({ total_papers: items.length, total_pdfs: items.length * 2, manifestPath })
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
