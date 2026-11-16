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
	yearSubjectId: number;
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

const CONCURRENCY_LIMIT = 8;
const MIN_PDF_BYTES = 20_480;

const GRADES: readonly GradeId[] = ['1ap', '2ap', '3ap', '4ap', '5ap', '1am', '2am', '3am', '4am'];
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

interface SampleVariantSpec {
	sampleNum: 1 | 2 | 3;
	seed: number;
	difficulty: Difficulty;
	labelAr: string;
}

const EXAM_SAMPLES: readonly SampleVariantSpec[] = [
	{ sampleNum: 1, seed: 101, difficulty: 'easy', labelAr: 'نموذج 1' },
	{ sampleNum: 2, seed: 202, difficulty: 'medium', labelAr: 'نموذج 2' },
	{ sampleNum: 3, seed: 303, difficulty: 'hard', labelAr: 'نموذج 3' }
];

const TEST_SAMPLES: readonly SampleVariantSpec[] = [
	{ sampleNum: 1, seed: 401, difficulty: 'easy', labelAr: 'نموذج 1' },
	{ sampleNum: 2, seed: 502, difficulty: 'medium', labelAr: 'نموذج 2' },
	{ sampleNum: 3, seed: 603, difficulty: 'hard', labelAr: 'نموذج 3' }
];

function buildPaperSpecs(): SamplePaperSpec[] {
	const specs: SamplePaperSpec[] = [];

	// 81 trimester exams + 81 supervised tests (9 grades x 3 trimesters x 3 exclusive models each)
	for (const grade of GRADES) {
		const yearName = GRADE_METADATA[grade].yearName;
		const testLabelAr = grade.endsWith('ap') ? 'تقويم مرحلي' : 'فرض محروس';
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
			for (const sample of TEST_SAMPLES) {
				specs.push({
					slug: `${grade}-math-${trimesterId}-test-sample-${sample.sampleNum}`,
					grade,
					trimesterId,
					docType: 'test',
					variant: 'supervised_test',
					difficulty: sample.difficulty,
					seed: sample.seed,
					titleAr: `${testLabelAr} ${trimesterName} في الرياضيات — ${yearName} (${sample.labelAr} — مستوى ${DIFFICULTY_LABELS_AR[sample.difficulty]})`
				});
			}
		}
	}

	// 5 end-of-cycle 5AP papers (3 Cinq mock exams + 2 competency evaluations)
	const cinqConfigs: readonly { n: 1 | 2 | 3; seed: number; difficulty: Difficulty }[] = [
		{ n: 1, seed: 701, difficulty: 'medium' },
		{ n: 2, seed: 702, difficulty: 'hard' },
		{ n: 3, seed: 703, difficulty: 'hard' }
	];
	for (const cfg of cinqConfigs) {
		specs.push({
			slug: `5ap-math-t3-cinq-mock-${cfg.n}`,
			grade: '5ap',
			trimesterId: 't3',
			docType: 'exam',
			variant: 'cinq_mock',
			difficulty: cfg.difficulty,
			seed: cfg.seed,
			titleAr: `امتحان تجريبي لنهاية مرحلة التعليم الابتدائي (Cinq) في الرياضيات — النموذج ${cfg.n}`
		});
	}

	const competencyConfigs: readonly { n: 1 | 2; seed: number; difficulty: Difficulty }[] = [
		{ n: 1, seed: 801, difficulty: 'medium' },
		{ n: 2, seed: 802, difficulty: 'hard' }
	];
	for (const cfg of competencyConfigs) {
		specs.push({
			slug: `5ap-math-t3-competency-eval-${cfg.n}`,
			grade: '5ap',
			trimesterId: 't3',
			docType: 'exam',
			variant: 'competency_eval',
			difficulty: cfg.difficulty,
			seed: cfg.seed,
			titleAr: `موضوع تقييم المكتسبات في الرياضيات — السنة الخامسة ابتدائي (النموذج ${cfg.n})`
		});
	}

	// 3 BEM mock exams for 4AM (T3)
	const bemConfigs: readonly { n: 1 | 2 | 3; seed: number; difficulty: Difficulty }[] = [
		{ n: 1, seed: 901, difficulty: 'medium' },
		{ n: 2, seed: 902, difficulty: 'hard' },
		{ n: 3, seed: 903, difficulty: 'hard' }
	];
	for (const cfg of bemConfigs) {
		specs.push({
			slug: `4am-math-t3-bem-mock-${cfg.n}`,
			grade: '4am',
			trimesterId: 't3',
			docType: 'exam',
			variant: 'bem_mock',
			difficulty: cfg.difficulty,
			seed: cfg.seed,
			titleAr: `امتحان تجريبي لشهادة التعليم المتوسط (BEM) في الرياضيات — النموذج ${cfg.n}`
		});
	}

	if (specs.length !== 170) {
		throw new Error(`Expected 170 sample exam specs, built ${specs.length}`);
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
