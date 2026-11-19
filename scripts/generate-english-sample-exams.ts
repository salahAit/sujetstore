import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import {
	assembleEnglishExam,
	compileAssembledExamPdf,
	type AssembleEnglishExamOptions
} from '../src/lib/server/exam-assembler';
import {
	ALL_ENGLISH_TRACK_IDS,
	ENGLISH_GRADE_METADATA,
	type Difficulty,
	type EnglishTrackId
} from '../src/lib/modules/EnglishTemplates/types';
import type { ExamType, TrimesterId } from '../src/lib/modules/SujetBuilder/types';

type EnglishExamVariant = NonNullable<AssembleEnglishExamOptions['variant']>;

interface SamplePaperSpec {
	slug: string;
	grade: EnglishTrackId;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: EnglishExamVariant;
	difficulty: Difficulty;
	seed: number;
	titleAr: string;
}

interface GeneratedManifestItem {
	slug: string;
	grade: EnglishTrackId;
	yearSubjectId: number;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: EnglishExamVariant;
	difficulty: Difficulty;
	seed: number;
	totalPoints: number;
	titleAr: string;
	pdfUrl: string;
	solutionUrl: string;
	fileSize: number;
	solutionFileSize: number;
}

const GRADES: readonly EnglishTrackId[] = ALL_ENGLISH_TRACK_IDS;
const TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];
const TRIMESTER_LABELS: Record<TrimesterId, string> = {
	t1: 'الفصل الأول',
	t2: 'الفصل الثاني',
	t3: 'الفصل الثالث'
};

const OUT_STATIC_ROOT = resolve('static/documents/generated_samples_english');
const MANIFEST_PATH = resolve('pipeline/generated_exams_english/generated_english_manifest.json');
const CONCURRENCY = Math.max(2, Math.min(8, Number(process.env.GEN_CONCURRENCY || '8')));

function parseFilterGrades(): Set<EnglishTrackId> | null {
	const idx = process.argv.indexOf('--grades');
	if (idx === -1 || !process.argv[idx + 1]) return null;
	const raw = process.argv[idx + 1]
		.split(',')
		.map((s) => s.trim())
		.filter(Boolean) as EnglishTrackId[];
	return new Set(raw);
}

function buildSpecs(filterGrades: Set<EnglishTrackId> | null): SamplePaperSpec[] {
	const specs: SamplePaperSpec[] = [];
	const selectedGrades = filterGrades ? GRADES.filter((g) => filterGrades.has(g)) : GRADES;

	for (const grade of selectedGrades) {
		const meta = ENGLISH_GRADE_METADATA[grade];
		const isPrimary = meta.levelId === 'primaire';
		const testWord = isPrimary ? 'تقويم مرحلي' : 'فرض محروس';

		for (const trimesterId of TRIMESTERS) {
			const trimAr = TRIMESTER_LABELS[trimesterId];
			for (const t of [
				{ idx: 1, seed: 6401, difficulty: 'easy' as Difficulty },
				{ idx: 2, seed: 6502, difficulty: 'medium' as Difficulty }
			]) {
				specs.push({
					slug: `${grade}-eng-${trimesterId}-test-sample-${t.idx}`,
					grade,
					trimesterId,
					docType: 'test',
					variant: 'supervised_test',
					difficulty: t.difficulty,
					seed: t.seed,
					titleAr: `${testWord} (${t.idx}) لـ${trimAr} في اللغة الإنجليزية — ${meta.yearNameAr}`
				});
			}

			for (const e of [
				{ idx: 1, seed: 6101, difficulty: 'medium' as Difficulty },
				{ idx: 2, seed: 6202, difficulty: 'hard' as Difficulty }
			]) {
				specs.push({
					slug: `${grade}-eng-${trimesterId}-exam-sample-${e.idx}`,
					grade,
					trimesterId,
					docType: 'exam',
					variant: 'trimester_exam',
					difficulty: e.difficulty,
					seed: e.seed,
					titleAr: `اختبار ${trimAr} النموذجي (${e.idx}) في اللغة الإنجليزية — ${meta.yearNameAr}`
				});
			}
		}
	}

	// 5AP Competency Evaluation (امتحان تقييم المكتسبات 2025)
	if (!filterGrades || filterGrades.has('5ap')) {
		for (const idx of [1, 2] as const) {
			specs.push({
				slug: `5ap-eng-t3-competency-eval-${idx}`,
				grade: '5ap',
				trimesterId: 't3',
				docType: 'exam',
				variant: 'competency_eval',
				difficulty: idx === 1 ? 'medium' : 'hard',
				seed: 6700 + idx,
				titleAr: `موضوع امتحان تقييم المكتسبات (${idx}) في اللغة الإنجليزية — الخامسة ابتدائي`
			});
		}
	}

	// 4AM BEM Mocks
	if (!filterGrades || filterGrades.has('4am')) {
		for (const idx of [1, 2, 3] as const) {
			specs.push({
				slug: `4am-eng-t3-bem-mock-${idx}`,
				grade: '4am',
				trimesterId: 't3',
				docType: 'exam',
				variant: 'bem_mock',
				difficulty: idx === 1 ? 'medium' : 'hard',
				seed: 6900 + idx,
				titleAr: `امتحان تجريبي لشهادة التعليم المتوسط (BEM) نموذج ${idx} — اللغة الإنجليزية`
			});
		}
	}

	// 3AS BAC Mocks across all 6 BAC streams
	for (const grade of ['3as_se', '3as_tm', '3as_math', '3as_ge', '3as_lp', '3as_le'] as const) {
		if (filterGrades && !filterGrades.has(grade)) continue;
		const streamName = ENGLISH_GRADE_METADATA[grade].streamNameAr || grade;
		for (const idx of [1, 2, 3] as const) {
			specs.push({
				slug: `${grade}-eng-t3-bac-mock-${idx}`,
				grade,
				trimesterId: 't3',
				docType: 'exam',
				variant: 'bac_mock',
				difficulty: idx === 1 ? 'medium' : 'hard',
				seed: 7100 + idx,
				titleAr: `بكالوريا تجريبية نموذج ${idx} في اللغة الإنجليزية — شعبة ${streamName}`
			});
		}
	}

	return specs;
}

async function main() {
	const filterGrades = parseFilterGrades();
	const specs = buildSpecs(filterGrades);
	const t0 = Date.now();

	await mkdir(OUT_STATIC_ROOT, { recursive: true });
	await mkdir(dirname(MANIFEST_PATH), { recursive: true });

	console.log(
		`[generate-english-sample-exams] Compiling ${specs.length} papers (${specs.length * 2} LTR PDFs) with concurrency=${CONCURRENCY}...`
	);

	const results: GeneratedManifestItem[] = new Array(specs.length);
	let cursor = 0;
	let completed = 0;

	async function worker() {
		while (true) {
			const i = cursor++;
			if (i >= specs.length) return;
			const spec = specs[i];
			const paper = assembleEnglishExam({
				grade: spec.grade,
				trimesterId: spec.trimesterId,
				seed: spec.seed,
				docType: spec.docType,
				variant: spec.variant,
				difficulty: spec.difficulty
			});

			const subDir = resolve(OUT_STATIC_ROOT, spec.grade, spec.trimesterId);
			await mkdir(subDir, { recursive: true });

			const subjectOutPath = resolve(subDir, `${spec.slug}.pdf`);
			const solutionOutPath = resolve(subDir, `${spec.slug}-sol.pdf`);

			const { subjectResult, solutionResult } = await compileAssembledExamPdf(paper, {
				subjectOutPath,
				solutionOutPath
			});

			if (!subjectResult.success || !solutionResult.success) {
				throw new Error(
					`Typst compile failed for ${spec.slug}: subject=${subjectResult.error ?? 'ok'} | solution=${solutionResult.error ?? 'ok'}`
				);
			}

			const subBuf = await readFile(subjectOutPath);
			const solBuf = await readFile(solutionOutPath);
			if (subBuf.subarray(0, 5).toString('ascii') !== '%PDF-' || solBuf.subarray(0, 5).toString('ascii') !== '%PDF-') {
				throw new Error(`Invalid PDF header generated for ${spec.slug}`);
			}

			results[i] = {
				slug: spec.slug,
				grade: spec.grade,
				yearSubjectId: ENGLISH_GRADE_METADATA[spec.grade].yearSubjectId,
				trimesterId: spec.trimesterId,
				docType: spec.docType,
				variant: spec.variant,
				difficulty: spec.difficulty,
				seed: spec.seed,
				totalPoints: paper.totalPoints,
				titleAr: spec.titleAr,
				pdfUrl: `/documents/generated_samples_english/${spec.grade}/${spec.trimesterId}/${spec.slug}.pdf`,
				solutionUrl: `/documents/generated_samples_english/${spec.grade}/${spec.trimesterId}/${spec.slug}-sol.pdf`,
				fileSize: subBuf.length,
				solutionFileSize: solBuf.length
			};

			completed++;
			if (completed % 25 === 0 || completed === specs.length) {
				console.log(`  [${completed}/${specs.length}] compiled (${((Date.now() - t0) / 1000).toFixed(1)}s)`);
			}
		}
	}

	await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

	let finalItems = results;
	if (filterGrades && existsSync(MANIFEST_PATH)) {
		const prev = JSON.parse(await readFile(MANIFEST_PATH, 'utf-8')) as {
			items: GeneratedManifestItem[];
		};
		const kept = prev.items.filter((it) => !filterGrades.has(it.grade));
		finalItems = [...kept, ...results];
	}

	await writeFile(
		MANIFEST_PATH,
		JSON.stringify(
			{
				generatedAt: new Date().toISOString(),
				totalPapers: finalItems.length,
				totalPdfs: finalItems.length * 2,
				items: finalItems
			},
			null,
			2
		),
		'utf-8'
	);

	console.log(
		`[generate-english-sample-exams] DONE: ${finalItems.length} papers (${finalItems.length * 2} PDFs) in ${((Date.now() - t0) / 1000).toFixed(1)}s -> ${MANIFEST_PATH}`
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
