import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { compileTypstPdf } from '../src/lib/server/typst';
import {
	ALL_OFFICIAL_BAC_ENGLISH_PAPERS,
	type EnglishBacTrackId,
	type OfficialEnglishBacPaperSpec
} from '../src/lib/data/official_bac_english';
import { ENGLISH_DOCTRINAL_AND_CONTENT_BLOCKLIST } from '../src/lib/modules/EnglishTemplates/english-helpers';
import type { ContentBlock, TableCell } from '../src/lib/modules/SujetBuilder/types';

const MIN_PDF_BYTES = 16_384;

const TRACK_CONTRACTS: Record<
	EnglishBacTrackId,
	{
		yearSubjectId: number;
		subjectId: 'ENG-SEC';
		streamId: 'SE' | 'TM' | 'MATH' | 'GE' | 'LP' | 'LE';
		streamNameAr: string;
		streamNameEn: string;
		coefficient: 2 | 3 | 5;
		duration: '02 Hours 30 Min' | '03 Hours 30 Min';
		expectedExercisePoints: [number, number, number];
	}
> = {
	'3as_se': {
		yearSubjectId: 686,
		subjectId: 'ENG-SEC',
		streamId: 'SE',
		streamNameAr: 'علوم تجريبية',
		streamNameEn: 'Experimental Sciences',
		coefficient: 2,
		duration: '02 Hours 30 Min',
		expectedExercisePoints: [8, 7, 5]
	},
	'3as_tm': {
		yearSubjectId: 728,
		subjectId: 'ENG-SEC',
		streamId: 'TM',
		streamNameAr: 'تقني رياضي',
		streamNameEn: 'Technical Mathematics',
		coefficient: 2,
		duration: '02 Hours 30 Min',
		expectedExercisePoints: [8, 7, 5]
	},
	'3as_math': {
		yearSubjectId: 706,
		subjectId: 'ENG-SEC',
		streamId: 'MATH',
		streamNameAr: 'رياضيات',
		streamNameEn: 'Mathematics',
		coefficient: 2,
		duration: '02 Hours 30 Min',
		expectedExercisePoints: [8, 7, 5]
	},
	'3as_ge': {
		yearSubjectId: 751,
		subjectId: 'ENG-SEC',
		streamId: 'GE',
		streamNameAr: 'تسيير واقتصاد',
		streamNameEn: 'Management & Economics',
		coefficient: 2,
		duration: '02 Hours 30 Min',
		expectedExercisePoints: [8, 7, 5]
	},
	'3as_lp': {
		yearSubjectId: 770,
		subjectId: 'ENG-SEC',
		streamId: 'LP',
		streamNameAr: 'آداب وفلسفة',
		streamNameEn: 'Literature & Philosophy',
		coefficient: 3,
		duration: '02 Hours 30 Min',
		expectedExercisePoints: [7, 8, 5]
	},
	'3as_le': {
		yearSubjectId: 789,
		subjectId: 'ENG-SEC',
		streamId: 'LE',
		streamNameAr: 'لغات أجنبية',
		streamNameEn: 'Foreign Languages',
		coefficient: 5,
		duration: '03 Hours 30 Min',
		expectedExercisePoints: [7, 7, 6]
	}
};

interface OfficialBacEnglishManifestItem {
	slug: string;
	grade: EnglishBacTrackId;
	yearSubjectId: number;
	subjectId: 'ENG-SEC';
	streamId: 'SE' | 'TM' | 'MATH' | 'GE' | 'LP' | 'LE';
	streamNameAr: string;
	streamNameEn: string;
	academicYear: string;
	sessionEn: string;
	sessionAr: string;
	coefficient: number;
	duration: string;
	pointsSplit: readonly [number, number, number];
	unitThemeEn: string;
	titleEn: string;
	titleAr: string;
	themesEn: string[];
	themesAr: string[];
	templateId: 'english/bac_official';
	pdfUrl: string;
	solutionUrl: string;
	fileSize: number;
	solutionFileSize: number;
	fonts: string[];
	solutionFonts: string[];
}

function assertValidPdf(absPath: string): number {
	if (!existsSync(absPath)) {
		throw new Error(`Compiled official English BAC PDF missing: ${absPath}`);
	}
	const buf = readFileSync(absPath);
	if (buf.length < MIN_PDF_BYTES) {
		throw new Error(
			`Compiled official English BAC PDF too small (${buf.length} bytes): ${absPath}`
		);
	}
	if (buf.subarray(0, 5).toString('ascii') !== '%PDF-') {
		throw new Error(`Invalid %PDF- header on ${absPath}`);
	}
	return buf.length;
}

function auditPdfFonts(absPath: string): string[] {
	const out = execFileSync('pdffonts', [absPath], { encoding: 'utf-8' });
	const lines = out.split(/\r?\n/).slice(2).filter((line) => line.trim().length > 0);
	const fonts = lines.map((line) => line.trim().split(/\s+/)[0]);
	for (const fontName of fonts) {
		if (/freemono/i.test(fontName)) {
			throw new Error(`pdffonts audit FAILED — FreeMono detected in ${absPath}: ${fonts.join(', ')}`);
		}
	}
	return Array.from(new Set(fonts));
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

function hasUnmatchedBrackets(value: string): boolean {
	let depth = 0;
	for (const ch of value) {
		if (ch === '[') depth++;
		else if (ch === ']') {
			depth--;
			if (depth < 0) return true;
		}
	}
	return depth !== 0;
}

function assertCleanTypstString(value: string | undefined, label: string): void {
	if (!value) return;
	const forbidden: Array<[RegExp, string]> = [
		[/\*/, 'raw asterisk *'],
		[/\$/, 'raw dollar $'],
		[/[<>]/, 'raw angle bracket < or >'],
		[/(?<!:)\/\//, 'raw double slash //'],
		[/@/, 'raw at-sign @'],
		[/_/, 'raw underscore _'],
		[/[✓✕]/u, 'forbidden unicode checkmark/cross'],
		[/#(?!strong\[|emph\[|underline\[)/, 'raw hash # outside allowed helper markup']
	];
	for (const [re, desc] of forbidden) {
		if (re.test(value)) {
			throw new Error(`Forbidden Typst sequence (${desc}) in ${label}: ${value.slice(0, 140)}`);
		}
	}
	if (hasUnmatchedBrackets(value)) {
		throw new Error(`Unmatched square brackets [ / ] in ${label}: ${value.slice(0, 140)}`);
	}
}

function validatePaperSpec(spec: OfficialEnglishBacPaperSpec): void {
	const contract = TRACK_CONTRACTS[spec.grade];
	if (!contract) {
		throw new Error(`Unknown English BAC track: ${spec.grade}`);
	}

	if (
		spec.yearSubjectId !== contract.yearSubjectId ||
		spec.subjectId !== contract.subjectId ||
		spec.streamId !== contract.streamId ||
		spec.streamNameAr !== contract.streamNameAr ||
		spec.streamNameEn !== contract.streamNameEn ||
		spec.coefficient !== contract.coefficient ||
		spec.duration !== contract.duration ||
		spec.templateId !== 'english/bac_official' ||
		spec.examDoc.metadata.font !== 'Arial' ||
		spec.examDoc.metadata.streamName !== contract.streamNameEn ||
		spec.examDoc.metadata.streamId !== contract.streamId ||
		spec.examDoc.metadata.coefficient !== contract.coefficient ||
		spec.examDoc.metadata.duration !== contract.duration ||
		spec.pointsSplit.length !== 3 ||
		!contract.expectedExercisePoints.every((p, idx) => spec.pointsSplit[idx] === p)
	) {
		throw new Error(`Invalid metadata contract on ${spec.slug}`);
	}

	// Doctrinal, Salafi methodology, halal content, and zero Ministry/ONEC scan
	const serialized = JSON.stringify(spec);
	for (const rule of ENGLISH_DOCTRINAL_AND_CONTENT_BLOCKLIST) {
		const m = serialized.match(rule.pattern);
		if (m) {
			throw new Error(
				`DOCTRINAL/CONTENT VIOLATION on ${spec.slug} (matched "${m[0]}"): ${rule.reason}`
			);
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
			} else if (b.type === 'true_false') {
				for (const item of b.items) {
					assertCleanTypstString(item.q, `${ctx}.true_false.q`);
					assertCleanTypstString(item.a, `${ctx}.true_false.a`);
					assertCleanTypstString(item.c, `${ctx}.true_false.c`);
				}
			} else if (b.type === 'multiple_choice') {
				for (const g of b.groups) {
					assertCleanTypstString(g.header, `${ctx}.mc.header`);
					assertCleanTypstString(g.correct, `${ctx}.mc.correct`);
					for (const opt of g.options) {
						assertCleanTypstString(opt, `${ctx}.mc.option`);
					}
				}
			} else if (b.type === 'table') {
				for (const h of b.headers) {
					if (typeof h === 'string') assertCleanTypstString(h, `${ctx}.table.header`);
					else assertCleanTypstString(h.content, `${ctx}.table.header.content`);
				}
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
	const records = ALL_OFFICIAL_BAC_ENGLISH_PAPERS;
	if (records.length !== 18) {
		throw new Error(`Expected 18 official English BAC papers, got ${records.length}`);
	}

	const outDir = resolve('static/generated/official-bac-english');
	mkdirSync(outDir, { recursive: true });

	const items: OfficialBacEnglishManifestItem[] = [];
	const allFontsUsed = new Set<string>();

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
		const fonts = auditPdfFonts(subjPath);
		const solutionFonts = auditPdfFonts(solPath);
		for (const f of [...fonts, ...solutionFonts]) allFontsUsed.add(f);

		items.push({
			slug: rec.slug,
			grade: rec.grade,
			yearSubjectId: rec.yearSubjectId,
			subjectId: rec.subjectId,
			streamId: rec.streamId,
			streamNameAr: rec.streamNameAr,
			streamNameEn: rec.streamNameEn,
			academicYear: rec.academicYear,
			sessionEn: rec.sessionEn,
			sessionAr: rec.sessionAr,
			coefficient: rec.coefficient,
			duration: rec.duration,
			pointsSplit: rec.pointsSplit,
			unitThemeEn: rec.unitThemeEn,
			titleEn: rec.titleEn,
			titleAr: rec.titleAr,
			themesEn: rec.themesEn,
			themesAr: rec.themesAr,
			templateId: rec.templateId,
			pdfUrl: `/generated/official-bac-english/${rec.slug}.pdf`,
			solutionUrl: `/generated/official-bac-english/${rec.slug}-sol.pdf`,
			fileSize,
			solutionFileSize,
			fonts,
			solutionFonts
		});
		console.log(
			`Compiled ${rec.slug} (subject=${fileSize}B, solution=${solutionFileSize}B, fonts=${fonts.join(',')})`
		);
	}

	const manifestPath = resolve('pipeline/official_bac_english/official_bac_english_manifest.json');
	mkdirSync(dirname(manifestPath), { recursive: true });
	writeFileSync(
		manifestPath,
		JSON.stringify(
			{
				generated_at: new Date().toISOString(),
				total_papers: items.length,
				total_pdfs: items.length * 2,
				blocklist_hits: 0,
				freemono_hits: 0,
				fonts_used: Array.from(allFontsUsed).sort(),
				items
			},
			null,
			2
		),
		'utf-8'
	);

	console.log(
		JSON.stringify({
			total_papers: items.length,
			total_pdfs: items.length * 2,
			blocklist_hits: 0,
			freemono_hits: 0,
			fonts_used: Array.from(allFontsUsed).sort(),
			manifestPath
		})
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
