import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { compileTypstPdf } from '../src/lib/server/typst';
import {
	ALL_OFFICIAL_BAC_ARABIC_PAPERS,
	type ArabicBacTrackId,
	type OfficialArabicBacPaperSpec
} from '../src/lib/data/official_bac_arabic';
import { DOCTRINAL_AND_AUTHOR_BLOCKLIST } from '../src/lib/modules/ArabicTemplates/arabic-helpers';
import type { ContentBlock, TableCell } from '../src/lib/modules/SujetBuilder/types';

const MIN_PDF_BYTES = 20_480;

const TRACK_CONTRACTS: Record<
	ArabicBacTrackId,
	{
		yearSubjectId: number;
		subjectId: 'ARB-SCI' | 'ARB-LP' | 'ARB-LE';
		streamId: 'SE' | 'TM' | 'MATH' | 'GE' | 'LP' | 'LE';
		streamNameAr: string;
		coefficient: 3 | 5 | 6;
		duration: '02 ساعة و30 دقيقة' | '04 ساعات و30 دقيقة' | '04 ساعات';
		hasCriticalEvaluation: boolean;
		expectedExercisePoints: number[];
	}
> = {
	'3as_se': {
		yearSubjectId: 681,
		subjectId: 'ARB-SCI',
		streamId: 'SE',
		streamNameAr: 'علوم تجريبية',
		coefficient: 3,
		duration: '02 ساعة و30 دقيقة',
		hasCriticalEvaluation: false,
		expectedExercisePoints: [12, 8]
	},
	'3as_tm': {
		yearSubjectId: 724,
		subjectId: 'ARB-SCI',
		streamId: 'TM',
		streamNameAr: 'تقني رياضي',
		coefficient: 3,
		duration: '02 ساعة و30 دقيقة',
		hasCriticalEvaluation: false,
		expectedExercisePoints: [12, 8]
	},
	'3as_math': {
		yearSubjectId: 701,
		subjectId: 'ARB-SCI',
		streamId: 'MATH',
		streamNameAr: 'رياضيات',
		coefficient: 3,
		duration: '02 ساعة و30 دقيقة',
		hasCriticalEvaluation: false,
		expectedExercisePoints: [12, 8]
	},
	'3as_ge': {
		yearSubjectId: 748,
		subjectId: 'ARB-SCI',
		streamId: 'GE',
		streamNameAr: 'تسيير واقتصاد',
		coefficient: 3,
		duration: '02 ساعة و30 دقيقة',
		hasCriticalEvaluation: false,
		expectedExercisePoints: [12, 8]
	},
	'3as_lp': {
		yearSubjectId: 767,
		subjectId: 'ARB-LP',
		streamId: 'LP',
		streamNameAr: 'آداب وفلسفة',
		coefficient: 6,
		duration: '04 ساعات و30 دقيقة',
		hasCriticalEvaluation: true,
		expectedExercisePoints: [10, 6, 4]
	},
	'3as_le': {
		yearSubjectId: 786,
		subjectId: 'ARB-LE',
		streamId: 'LE',
		streamNameAr: 'لغات أجنبية',
		coefficient: 5,
		duration: '04 ساعات',
		hasCriticalEvaluation: true,
		expectedExercisePoints: [10, 6, 4]
	}
};

interface OfficialBacArabicManifestItem {
	slug: string;
	grade: ArabicBacTrackId;
	yearSubjectId: number;
	subjectId: 'ARB-SCI' | 'ARB-LP' | 'ARB-LE';
	streamId: 'SE' | 'TM' | 'MATH' | 'GE' | 'LP' | 'LE';
	streamNameAr: string;
	academicYear: string;
	sessionAr: string;
	coefficient: number;
	duration: string;
	hasCriticalEvaluation: boolean;
	passageKind: 'poetry' | 'prose';
	authorAr: string;
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
		throw new Error(`Compiled official Arabic BAC PDF missing: ${absPath}`);
	}
	const buf = readFileSync(absPath);
	if (buf.length < MIN_PDF_BYTES) {
		throw new Error(
			`Compiled official Arabic BAC PDF too small (${buf.length} bytes): ${absPath}`
		);
	}
	if (buf.subarray(0, 5).toString('ascii') !== '%PDF-') {
		throw new Error(`Invalid %PDF- header on ${absPath}`);
	}
	return buf.length;
}

function parseMark(raw: string | undefined, context: string): number {
	if (!raw || raw.trim() === '') return 0;
	const n = Number(raw.replace(',', '.'));
	if (!Number.isFinite(n)) {
		throw new Error(`Invalid mark "${raw}" in ${context}`);
	}
	return n;
}

function sumTableCellMarks(cells: (string | TableCell)[], context: string): number {
	let sum = 0;
	for (const cell of cells) {
		if (cell && typeof cell === 'object' && cell.mark) {
			sum += parseMark(cell.mark, context);
		}
	}
	return sum;
}

function sumBlockMarks(blocks: ContentBlock[], context: string): number {
	let total = 0;
	for (const b of blocks) {
		if (b.type === 'text' || b.type === 'typst_raw') {
			total += parseMark(b.mark, context);
		} else if (b.type === 'table') {
			total += sumTableCellMarks(b.cells, context);
			if (b.rows) {
				for (const row of b.rows) {
					total += sumTableCellMarks(row, context);
				}
			}
		} else if (b.type === 'true_false') {
			for (const it of b.items) total += parseMark(it.mark, context);
		} else if (b.type === 'multiple_choice') {
			for (const g of b.groups) total += parseMark(g.mark, context);
		} else if (b.type === 'columns') {
			total += sumBlockMarks(b.children, context);
		}
	}
	return Math.round(total * 1000) / 1000;
}

function assertCleanTypstString(value: string | undefined, label: string): void {
	if (!value) return;
	const forbidden: Array<[RegExp, string]> = [
		[/\*/, 'raw asterisk *'],
		[/\$/, 'raw dollar $'],
		[/[<>]/, 'raw angle bracket < or >'],
		[/(?<!:)\/\//, 'raw double slash //'],
		[/[✓✕]/u, 'forbidden unicode checkmark/cross']
	];
	for (const [re, desc] of forbidden) {
		if (re.test(value)) {
			throw new Error(`Forbidden Typst sequence (${desc}) in ${label}: ${value.slice(0, 120)}`);
		}
	}
}

function validatePaperSpec(spec: OfficialArabicBacPaperSpec): void {
	const contract = TRACK_CONTRACTS[spec.grade];
	if (!contract) {
		throw new Error(`Unknown Arabic BAC track: ${spec.grade}`);
	}

	if (
		spec.yearSubjectId !== contract.yearSubjectId ||
		spec.subjectId !== contract.subjectId ||
		spec.streamId !== contract.streamId ||
		spec.streamNameAr !== contract.streamNameAr ||
		spec.coefficient !== contract.coefficient ||
		spec.duration !== contract.duration ||
		spec.hasCriticalEvaluation !== contract.hasCriticalEvaluation ||
		spec.templateId !== 'secondary/bac_official' ||
		spec.examDoc.metadata.font !== 'Arabic Transparent' ||
		spec.examDoc.metadata.streamName !== contract.streamNameAr ||
		spec.examDoc.metadata.streamId !== contract.streamId ||
		spec.examDoc.metadata.coefficient !== contract.coefficient ||
		spec.examDoc.metadata.duration !== contract.duration
	) {
		throw new Error(`Invalid metadata contract on ${spec.slug}`);
	}

	// Doctrinal & non-Muslim author zero-tolerance scan
	const serialized = JSON.stringify(spec);
	for (const rule of DOCTRINAL_AND_AUTHOR_BLOCKLIST) {
		if (rule.pattern.test(serialized)) {
			throw new Error(`DOCTRINAL/AUTHOR VIOLATION on ${spec.slug}: ${rule.reason}`);
		}
	}

	// Exercise structure & marks validation
	const exList = spec.examDoc.exercises;
	if (
		exList.length !== contract.expectedExercisePoints.length ||
		!contract.expectedExercisePoints.every((p, idx) => Number(exList[idx].points) === p)
	) {
		throw new Error(
			`${spec.slug}: expected ${contract.expectedExercisePoints.length} exercises with points [${contract.expectedExercisePoints.join(', ')}], got [${exList.map((e) => e.points).join(', ')}]`
		);
	}

	let paperTotal = 0;
	for (const ex of exList) {
		const exPts = Number(ex.points);
		const ctx = `${spec.slug} (${ex.id ?? ex.customTitle ?? ex.num})`;
		const blockSum = sumBlockMarks(ex.content, ctx);
		if (Math.abs(blockSum - exPts) > 1e-6) {
			throw new Error(`${ctx}: block marks sum (${blockSum}) != exercise points (${exPts})`);
		}
		paperTotal += blockSum;

		assertCleanTypstString(ex.customTitle, `${ctx}.customTitle`);
		assertCleanTypstString(ex.instruction, `${ctx}.instruction`);
		for (const b of ex.content) {
			if (b.type === 'text') {
				assertCleanTypstString(b.content, `${ctx}.text.content`);
				assertCleanTypstString(b.answer, `${ctx}.text.answer`);
			} else if (b.type === 'table') {
				for (const row of b.rows ?? []) {
					for (const cell of row) {
						if (typeof cell === 'string') {
							assertCleanTypstString(cell, `${ctx}.table.cell`);
						} else {
							assertCleanTypstString(cell.content, `${ctx}.table.cell.content`);
							assertCleanTypstString(cell.answer, `${ctx}.table.cell.answer`);
						}
					}
				}
			}
		}
	}

	if (Math.abs(paperTotal - 20) > 1e-6) {
		throw new Error(`${spec.slug}: total paper marks (${paperTotal}) != 20.0`);
	}
}

async function main() {
	const records = ALL_OFFICIAL_BAC_ARABIC_PAPERS;
	if (records.length !== 18) {
		throw new Error(`Expected 18 official Arabic BAC papers, got ${records.length}`);
	}

	const outDir = resolve('static/generated/official-bac-arabic');
	mkdirSync(outDir, { recursive: true });

	const items: OfficialBacArabicManifestItem[] = [];

	for (const rec of records) {
		validatePaperSpec(rec);

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
			streamNameAr: rec.streamNameAr,
			academicYear: rec.academicYear,
			sessionAr: rec.sessionAr,
			coefficient: rec.coefficient,
			duration: rec.duration,
			hasCriticalEvaluation: rec.hasCriticalEvaluation,
			passageKind: rec.passageKind,
			authorAr: rec.authorAr,
			titleAr: rec.titleAr,
			themesAr: rec.themesAr,
			pdfUrl: `/generated/official-bac-arabic/${rec.slug}.pdf`,
			solutionUrl: `/generated/official-bac-arabic/${rec.slug}-sol.pdf`,
			fileSize,
			solutionFileSize,
			sourcePdfRelPath: rec.sourcePdfRelPath,
			sourceSha256: sha256IfExists(sourceAbs)
		});
		console.log(`Compiled ${rec.slug} (subject=${fileSize}B, solution=${solutionFileSize}B)`);
	}

	const manifestPath = resolve('pipeline/official_bac_arabic/official_bac_arabic_manifest.json');
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
