import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import {
	assembleSciencesExam,
	compileAssembledExamPdf,
	type AssembleSciencesExamOptions
} from '../src/lib/server/exam-assembler';
import {
	ALL_SCIENCES_TRACK_IDS,
	SCIENCES_GRADE_METADATA,
	type Difficulty,
	type SciencesTrackId
} from '../src/lib/modules/SciencesTemplates/types';
import type { ExamType, TrimesterId } from '../src/lib/modules/SujetBuilder/types';

type SciencesExamVariant = NonNullable<AssembleSciencesExamOptions['variant']>;

interface SamplePaperSpec {
	slug: string;
	grade: SciencesTrackId;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: SciencesExamVariant;
	difficulty: Difficulty;
	seed: number;
	titleAr: string;
}

interface GeneratedManifestItem {
	slug: string;
	grade: SciencesTrackId;
	yearSubjectId: number;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: SciencesExamVariant;
	difficulty: Difficulty;
	seed: number;
	totalPoints: number;
	titleAr: string;
	pdfUrl: string;
	solutionUrl: string;
	fileSize: number;
	solutionFileSize: number;
}

const GRADES: readonly SciencesTrackId[] = ALL_SCIENCES_TRACK_IDS;
const TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];
const TRIMESTER_LABELS: Record<TrimesterId, string> = {
	t1: 'الفصل الأول',
	t2: 'الفصل الثاني',
	t3: 'الفصل الثالث'
};

const OUT_STATIC_ROOT = resolve('static/documents/generated_samples_sciences');
const MANIFEST_PATH = resolve('pipeline/generated_exams_sciences/generated_sciences_manifest.json');
const CONCURRENCY = Math.max(2, Math.min(8, Number(process.env.GEN_CONCURRENCY || '8')));

function parseFilterGrades(): Set<SciencesTrackId> | null {
	const idx = process.argv.indexOf('--grades');
	if (idx === -1 || !process.argv[idx + 1]) return null;
	const raw = process.argv[idx + 1]
		.split(',')
		.map((s) => s.trim())
		.filter(Boolean) as SciencesTrackId[];
	return new Set(raw);
}

function buildSpecs(filterGrades: Set<SciencesTrackId> | null): SamplePaperSpec[] {
	const specs: SamplePaperSpec[] = [];
	const selectedGrades = filterGrades ? GRADES.filter((g) => filterGrades.has(g)) : GRADES;

	for (const grade of selectedGrades) {
		const meta = SCIENCES_GRADE_METADATA[grade];
		const isPrimary = meta.levelId === 'primaire';
		const subjLabel = isPrimary ? 'التربية العلمية' : 'علوم الطبيعة والحياة';
		const testWord = isPrimary ? 'تقويم مرحلي' : 'فرض محروس';

		for (const trimesterId of TRIMESTERS) {
			const trimAr = TRIMESTER_LABELS[trimesterId];
			const examSeeds: Array<{ idx: number; seed: number; difficulty: Difficulty }> = [
				{ idx: 1, seed: 3101, difficulty: 'easy' },
				{ idx: 2, seed: 3202, difficulty: 'medium' },
				{ idx: 3, seed: 3303, difficulty: 'hard' }
			];
			for (const e of examSeeds) {
				specs.push({
					slug: `${grade}-sci-${trimesterId}-exam-sample-${e.idx}`,
					grade,
					trimesterId,
					docType: 'exam',
					variant: 'trimester_exam',
					difficulty: e.difficulty,
					seed: e.seed,
					titleAr: `اختبار ${trimAr} النموذجي (${e.idx}) في ${subjLabel} — ${meta.yearName}`
				});
			}

			const testSeeds: Array<{ idx: number; seed: number; difficulty: Difficulty }> = [
				{ idx: 1, seed: 3401, difficulty: 'easy' },
				{ idx: 2, seed: 3502, difficulty: 'medium' },
				{ idx: 3, seed: 3603, difficulty: 'hard' }
			];
			for (const t of testSeeds) {
				specs.push({
					slug: `${grade}-sci-${trimesterId}-test-sample-${t.idx}`,
					grade,
					trimesterId,
					docType: 'test',
					variant: 'supervised_test',
					difficulty: t.difficulty,
					seed: t.seed,
					titleAr: `${testWord} (${t.idx}) لـ${trimAr} في ${subjLabel} — ${meta.yearName}`
				});
			}
		}
	}

	// 5AP Competency Evaluation (تقييم المكتسبات)
	if (!filterGrades || filterGrades.has('5ap')) {
		for (const idx of [1, 2] as const) {
			specs.push({
				slug: `5ap-sci-t3-competency-eval-${idx}`,
				grade: '5ap',
				trimesterId: 't3',
				docType: 'exam',
				variant: 'competency_eval',
				difficulty: idx === 1 ? 'medium' : 'hard',
				seed: 3700 + idx,
				titleAr: `موضوع تقييم المكتسبات (${idx}) في التربية العلمية والتكنولوجية — الخامسة ابتدائي`
			});
		}
	}

	// 4AM BEM Mocks
	if (!filterGrades || filterGrades.has('4am')) {
		for (const idx of [1, 2, 3] as const) {
			specs.push({
				slug: `4am-sci-t3-bem-mock-${idx}`,
				grade: '4am',
				trimesterId: 't3',
				docType: 'exam',
				variant: 'bem_mock',
				difficulty: idx === 1 ? 'medium' : 'hard',
				seed: 3900 + idx,
				titleAr: `امتحان تجريبي لشهادة التعليم المتوسط (BEM) نموذج ${idx} — علوم الطبيعة والحياة`
			});
		}
	}

	// 3AS BAC Mocks (SE & MATH)
	for (const grade of ['3as_se', '3as_math'] as const) {
		if (filterGrades && !filterGrades.has(grade)) continue;
		const streamName = SCIENCES_GRADE_METADATA[grade].streamNameAr || grade;
		for (const idx of [1, 2, 3, 4, 5] as const) {
			specs.push({
				slug: `${grade}-sci-t3-bac-mock-${idx}`,
				grade,
				trimesterId: 't3',
				docType: 'exam',
				variant: 'bac_mock',
				difficulty: idx <= 2 ? 'medium' : 'hard',
				seed: 4900 + idx,
				titleAr: `بكالوريا تجريبية مقترحة (${idx}) في علوم الطبيعة والحياة — ${streamName}`
			});
		}
	}

	return specs;
}

async function runPool<T, R>(
	items: T[],
	concurrency: number,
	worker: (item: T) => Promise<R>
): Promise<R[]> {
	const results: R[] = new Array(items.length);
	let nextIdx = 0;
	async function runWorker() {
		while (true) {
			const idx = nextIdx++;
			if (idx >= items.length) break;
			results[idx] = await worker(items[idx]);
		}
	}
	await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => runWorker()));
	return results;
}

async function processSpec(spec: SamplePaperSpec): Promise<GeneratedManifestItem> {
	const paper = assembleSciencesExam({
		grade: spec.grade,
		trimesterId: spec.trimesterId,
		seed: spec.seed,
		docType: spec.docType,
		variant: spec.variant,
		difficulty: spec.difficulty
	});

	const gradeDir = resolve(OUT_STATIC_ROOT, spec.grade);
	await mkdir(gradeDir, { recursive: true });

	const subjectOutPath = resolve(gradeDir, `${spec.slug}.pdf`);
	const solutionOutPath = resolve(gradeDir, `${spec.slug}-sol.pdf`);

	const { subjectResult, solutionResult } = await compileAssembledExamPdf(paper, {
		subjectOutPath,
		solutionOutPath
	});

	if (!subjectResult.success || !solutionResult.success) {
		throw new Error(
			`Failed to compile ${spec.slug}: subject=${subjectResult.error ?? 'ok'} | solution=${solutionResult.error ?? 'ok'}`
		);
	}

	console.log(
		`[ok] ${spec.slug} (${spec.grade}/${spec.trimesterId}, seed=${spec.seed}) -> ${subjectResult.size}B / ${solutionResult.size}B`
	);

	return {
		slug: spec.slug,
		grade: spec.grade,
		yearSubjectId: SCIENCES_GRADE_METADATA[spec.grade].yearSubjectId,
		trimesterId: spec.trimesterId,
		docType: spec.docType,
		variant: spec.variant,
		difficulty: spec.difficulty,
		seed: spec.seed,
		totalPoints: paper.totalPoints,
		titleAr: spec.titleAr,
		pdfUrl: `/documents/generated_samples_sciences/${spec.grade}/${spec.slug}.pdf`,
		solutionUrl: `/documents/generated_samples_sciences/${spec.grade}/${spec.slug}-sol.pdf`,
		fileSize: subjectResult.size ?? 0,
		solutionFileSize: solutionResult.size ?? 0
	};
}

async function main() {
	const filterGrades = parseFilterGrades();
	const specs = buildSpecs(filterGrades);
	console.log(
		`Generating and compiling ${specs.length} Natural Sciences exam papers (${specs.length * 2} PDFs) with concurrency ${CONCURRENCY}...`
	);

	const newItems = await runPool(specs, CONCURRENCY, processSpec);

	let mergedItems = newItems;
	if (filterGrades && existsSync(MANIFEST_PATH)) {
		const prev = JSON.parse(await readFile(MANIFEST_PATH, 'utf-8')) as {
			items: GeneratedManifestItem[];
		};
		const newSlugs = new Set(newItems.map((i) => i.slug));
		mergedItems = [...prev.items.filter((i) => !newSlugs.has(i.slug)), ...newItems];
	}

	await mkdir(dirname(MANIFEST_PATH), { recursive: true });
	await writeFile(
		MANIFEST_PATH,
		JSON.stringify(
			{
				generatedAt: new Date().toISOString(),
				totalPapers: mergedItems.length,
				totalPdfs: mergedItems.length * 2,
				items: mergedItems
			},
			null,
			2
		),
		'utf-8'
	);

	console.log(
		`Sciences manifest written to ${MANIFEST_PATH} (${mergedItems.length} papers, ${mergedItems.length * 2} PDFs).`
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
