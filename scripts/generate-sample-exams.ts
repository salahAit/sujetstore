import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import {
	assembleExam,
	compileAssembledExamPdf,
	type AssembleExamOptions
} from '../src/lib/server/exam-assembler';
import {
	GRADE_METADATA,
	type Difficulty,
	type GradeId
} from '../src/lib/modules/MathTemplates/types';
import type { ExamType, TrimesterId } from '../src/lib/modules/SujetBuilder/types';

type ExamVariant = NonNullable<AssembleExamOptions['variant']>;

interface SamplePaperSpec {
	slug: string;
	grade: GradeId;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: ExamVariant;
	difficulty: Difficulty;
	seed: number;
	titleAr: string;
}

interface GeneratedManifestItem {
	slug: string;
	grade: GradeId;
	yearSubjectId: 586 | 606 | 624;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: ExamVariant;
	difficulty: Difficulty;
	seed: number;
	totalPoints: number;
	titleAr: string;
	pdfUrl: string;
	solutionUrl: string;
	fileSize: number;
	solutionFileSize: number;
}

interface GeneratedManifest {
	generated_at: string;
	total_papers: number;
	total_pdfs: number;
	items: GeneratedManifestItem[];
}

const CONCURRENCY_LIMIT = 4;
const MIN_PDF_BYTES = 20_480;

const GRADES: readonly GradeId[] = ['2ap', '5ap', '2am'];
const TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];

const TRIMESTER_LABELS_AR: Record<TrimesterId, string> = {
	t1: 'الفصل الأول',
	t2: 'الفصل الثاني',
	t3: 'الفصل الثالث'
};

const DIFFICULTY_LABELS_AR: Record<Difficulty, string> = {
	easy: 'سهل',
	medium: 'متوسط',
	hard: 'صعب'
};

const EXAM_SAMPLES: readonly {
	sampleNum: 1 | 2 | 3;
	seed: number;
	difficulty: Difficulty;
	labelAr: string;
}[] = [
	{ sampleNum: 1, seed: 101, difficulty: 'easy', labelAr: 'نموذج 1' },
	{ sampleNum: 2, seed: 202, difficulty: 'medium', labelAr: 'نموذج 2' },
	{ sampleNum: 3, seed: 303, difficulty: 'hard', labelAr: 'نموذج 3' }
];

const TEST_SEEDS_2AM: Record<TrimesterId, number> = {
	t1: 401,
	t2: 402,
	t3: 403
};

function buildPaperSpecs(): SamplePaperSpec[] {
	const specs: SamplePaperSpec[] = [];

	// 27 required trimester exams (3 grades x 3 trimesters x 3 samples)
	for (const grade of GRADES) {
		const yearName = GRADE_METADATA[grade].yearName;
		for (const trimesterId of TRIMESTERS) {
			const trimesterName = TRIMESTER_LABELS_AR[trimesterId];
			for (const sample of EXAM_SAMPLES) {
				specs.push({
					slug: `${grade}-math-${trimesterId}-exam-sample-${sample.sampleNum}`,
					grade,
					trimesterId,
					docType: 'exam',
					variant: 'trimester_exam',
					difficulty: sample.difficulty,
					seed: sample.seed,
					titleAr: `اختبار ${trimesterName} في الرياضيات — ${yearName} (${sample.labelAr} — مستوى ${DIFFICULTY_LABELS_AR[sample.difficulty]})`
				});
			}
		}
	}

	// 3 supervised tests (فرض محروس) for 2AM
	for (const trimesterId of TRIMESTERS) {
		const trimesterName = TRIMESTER_LABELS_AR[trimesterId];
		specs.push({
			slug: `2am-math-${trimesterId}-test-sample-1`,
			grade: '2am',
			trimesterId,
			docType: 'test',
			variant: 'supervised_test',
			difficulty: 'medium',
			seed: TEST_SEEDS_2AM[trimesterId],
			titleAr: `فرض ${trimesterName} في الرياضيات — ${GRADE_METADATA['2am'].yearName} (نموذج 1 — مستوى ${DIFFICULTY_LABELS_AR.medium})`
		});
	}

	// 2 end-of-cycle 5AP papers (T3)
	specs.push({
		slug: '5ap-math-t3-cinq-mock-1',
		grade: '5ap',
		trimesterId: 't3',
		docType: 'exam',
		variant: 'cinq_mock',
		difficulty: 'hard',
		seed: 505,
		titleAr: 'امتحان تجريبي لنهاية مرحلة التعليم الابتدائي (Cinq) في الرياضيات — النموذج 1'
	});

	specs.push({
		slug: '5ap-math-t3-competency-eval-1',
		grade: '5ap',
		trimesterId: 't3',
		docType: 'exam',
		variant: 'competency_eval',
		difficulty: 'medium',
		seed: 606,
		titleAr: 'موضوع تقييم المكتسبات في الرياضيات — السنة الخامسة ابتدائي'
	});

	if (specs.length !== 32) {
		throw new Error(`Expected 32 sample exam specs, built ${specs.length}`);
	}

	return specs;
}

async function verifyCompiledPdf(filePath: string, label: string): Promise<number> {
	if (!existsSync(filePath)) {
		throw new Error(`Compiled PDF missing on disk (${label}): ${filePath}`);
	}
	const buf = await readFile(filePath);
	if (buf.subarray(0, 5).toString('ascii') !== '%PDF-') {
		throw new Error(`Compiled file is not a valid PDF (${label}): ${filePath}`);
	}
	if (buf.length <= MIN_PDF_BYTES) {
		throw new Error(
			`Compiled PDF smaller than ${MIN_PDF_BYTES} bytes (${label}): ${buf.length} bytes at ${filePath}`
		);
	}
	return buf.length;
}

async function runWithConcurrency<T, R>(
	items: readonly T[],
	concurrency: number,
	worker: (item: T, index: number) => Promise<R>
): Promise<R[]> {
	const results = new Array<R>(items.length);
	let nextIndex = 0;

	async function runWorker(): Promise<void> {
		while (nextIndex < items.length) {
			const idx = nextIndex++;
			results[idx] = await worker(items[idx], idx);
		}
	}

	const workerCount = Math.min(concurrency, items.length);
	await Promise.all(Array.from({ length: workerCount }, () => runWorker()));
	return results;
}

async function processSpec(spec: SamplePaperSpec): Promise<GeneratedManifestItem> {
	const paper = assembleExam({
		grade: spec.grade,
		trimesterId: spec.trimesterId,
		seed: spec.seed,
		docType: spec.docType,
		variant: spec.variant,
		difficulty: spec.difficulty
	});

	const jsonOutPath = resolve('pipeline/generated_exams', spec.grade, `${spec.slug}.json`);
	await mkdir(dirname(jsonOutPath), { recursive: true });
	await writeFile(jsonOutPath, JSON.stringify(paper.examDoc, null, 2) + '\n', 'utf-8');

	const subjectOutPath = resolve(
		'static/documents/generated_samples',
		spec.grade,
		`${spec.slug}.pdf`
	);
	const solutionOutPath = resolve(
		'static/documents/generated_samples',
		spec.grade,
		`${spec.slug}-sol.pdf`
	);

	const { subjectResult, solutionResult } = await compileAssembledExamPdf(paper, {
		subjectOutPath,
		solutionOutPath
	});

	if (!subjectResult.success) {
		throw new Error(`Typst compilation failed for ${spec.slug}.pdf: ${subjectResult.error}`);
	}
	if (!solutionResult.success) {
		throw new Error(`Typst compilation failed for ${spec.slug}-sol.pdf: ${solutionResult.error}`);
	}

	const fileSize = await verifyCompiledPdf(subjectOutPath, `${spec.slug}.pdf`);
	const solutionFileSize = await verifyCompiledPdf(solutionOutPath, `${spec.slug}-sol.pdf`);

	console.log(
		`[ok] ${spec.slug} (${spec.grade}/${spec.trimesterId}, seed=${spec.seed}) -> ${fileSize}B / ${solutionFileSize}B`
	);

	return {
		slug: spec.slug,
		grade: spec.grade,
		yearSubjectId: GRADE_METADATA[spec.grade].yearSubjectId,
		trimesterId: spec.trimesterId,
		docType: paper.docType,
		variant: paper.variant,
		difficulty: spec.difficulty,
		seed: spec.seed,
		totalPoints: paper.totalPoints,
		titleAr: spec.titleAr,
		pdfUrl: `/documents/generated_samples/${spec.grade}/${spec.slug}.pdf`,
		solutionUrl: `/documents/generated_samples/${spec.grade}/${spec.slug}-sol.pdf`,
		fileSize,
		solutionFileSize
	};
}

async function main(): Promise<void> {
	const specs = buildPaperSpecs();
	console.log(
		`Generating and compiling ${specs.length} exam papers (${specs.length * 2} PDFs) with concurrency ${CONCURRENCY_LIMIT}...`
	);

	const items = await runWithConcurrency(specs, CONCURRENCY_LIMIT, (spec) => processSpec(spec));

	const manifest: GeneratedManifest = {
		generated_at: new Date().toISOString(),
		total_papers: items.length,
		total_pdfs: items.length * 2,
		items
	};

	const manifestPath = resolve('pipeline/generated_exams/generated_manifest.json');
	await mkdir(dirname(manifestPath), { recursive: true });
	await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');

	console.log(`Manifest written to ${manifestPath} (${manifest.total_papers} papers, ${manifest.total_pdfs} PDFs).`);
}

main().catch((err) => {
	console.error('Failed to generate sample exams:', err);
	process.exit(1);
});
