import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import {
	assemblePhysicsExam,
	compileAssembledExamPdf,
	type AssemblePhysicsExamOptions
} from '../src/lib/server/exam-assembler';
import {
	ALL_PHYSICS_TRACK_IDS,
	PHYSICS_GRADE_METADATA,
	type Difficulty,
	type PhysicsTrackId
} from '../src/lib/modules/PhysicsTemplates/types';
import type { ExamType, TrimesterId } from '../src/lib/modules/SujetBuilder/types';

type PhysicsExamVariant = NonNullable<AssemblePhysicsExamOptions['variant']>;

interface SamplePaperSpec {
	slug: string;
	grade: PhysicsTrackId;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: PhysicsExamVariant;
	difficulty: Difficulty;
	seed: number;
	titleAr: string;
}

interface GeneratedManifestItem {
	slug: string;
	grade: PhysicsTrackId;
	yearSubjectId: number;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: PhysicsExamVariant;
	difficulty: Difficulty;
	seed: number;
	totalPoints: number;
	titleAr: string;
	pdfUrl: string;
	solutionUrl: string;
	fileSize: number;
	solutionFileSize: number;
}

const CONCURRENCY_LIMIT = 8;
const MIN_PDF_BYTES = 20_480;

const GRADES: readonly PhysicsTrackId[] = ALL_PHYSICS_TRACK_IDS;
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
	{ sampleNum: 1, seed: 1101, difficulty: 'easy', labelAr: 'نموذج 1' },
	{ sampleNum: 2, seed: 1202, difficulty: 'medium', labelAr: 'نموذج 2' },
	{ sampleNum: 3, seed: 1303, difficulty: 'hard', labelAr: 'نموذج 3' }
];

const TEST_SAMPLES: readonly SampleVariantSpec[] = [
	{ sampleNum: 1, seed: 1401, difficulty: 'easy', labelAr: 'نموذج 1' },
	{ sampleNum: 2, seed: 1502, difficulty: 'medium', labelAr: 'نموذج 2' },
	{ sampleNum: 3, seed: 1603, difficulty: 'hard', labelAr: 'نموذج 3' }
];

function buildPaperSpecs(): SamplePaperSpec[] {
	const specs: SamplePaperSpec[] = [];

	// 198 trimester exams + supervised tests (11 tracks x 3 trimesters x 6 papers)
	for (const grade of GRADES) {
		const meta = PHYSICS_GRADE_METADATA[grade];
		const trackLabel = meta.streamNameAr ? `${meta.yearName}` : meta.yearName;
		const subjectLabel = meta.levelId === 'moyen' ? 'العلوم الفيزيائية والتكنولوجيا' : 'العلوم الفيزيائية';
		for (const trimesterId of TRIMESTERS) {
			const trimesterName = TRIMESTER_LABELS_AR[trimesterId];
			for (const sample of EXAM_SAMPLES) {
				specs.push({
					slug: `${grade}-phy-${trimesterId}-exam-sample-${sample.sampleNum}`,
					grade,
					trimesterId,
					docType: 'exam',
					variant: 'trimester_exam',
					difficulty: sample.difficulty,
					seed: sample.seed,
					titleAr: `اختبار ${trimesterName} في ${subjectLabel} — ${trackLabel} (${sample.labelAr} — مستوى ${DIFFICULTY_LABELS_AR[sample.difficulty]})`
				});
			}
			for (const sample of TEST_SAMPLES) {
				specs.push({
					slug: `${grade}-phy-${trimesterId}-test-sample-${sample.sampleNum}`,
					grade,
					trimesterId,
					docType: 'test',
					variant: 'supervised_test',
					difficulty: sample.difficulty,
					seed: sample.seed,
					titleAr: `فرض محروس ${trimesterName} في ${subjectLabel} — ${trackLabel} (${sample.labelAr} — مستوى ${DIFFICULTY_LABELS_AR[sample.difficulty]})`
				});
			}
		}
	}

	// 3 BEM mock exams for 4AM (T3)
	const bemConfigs: readonly { n: 1 | 2 | 3; seed: number; difficulty: Difficulty }[] = [
		{ n: 1, seed: 1901, difficulty: 'medium' },
		{ n: 2, seed: 1902, difficulty: 'hard' },
		{ n: 3, seed: 1903, difficulty: 'hard' }
	];
	for (const cfg of bemConfigs) {
		specs.push({
			slug: `4am-phy-t3-bem-mock-${cfg.n}`,
			grade: '4am',
			trimesterId: 't3',
			docType: 'exam',
			variant: 'bem_mock',
			difficulty: cfg.difficulty,
			seed: cfg.seed,
			titleAr: `امتحان تجريبي لشهادة التعليم المتوسط (BEM) في العلوم الفيزيائية والتكنولوجيا — النموذج ${cfg.n}`
		});
	}

	// 15 proposed BAC mock exams for 3AS Scientific Streams (5 each x 3 streams)
	const bacGrades: readonly PhysicsTrackId[] = ['3as_se', '3as_tm', '3as_math'];
	const bacConfigs: readonly { n: 1 | 2 | 3 | 4 | 5; seed: number; difficulty: Difficulty }[] = [
		{ n: 1, seed: 2901, difficulty: 'medium' },
		{ n: 2, seed: 2902, difficulty: 'medium' },
		{ n: 3, seed: 2903, difficulty: 'hard' },
		{ n: 4, seed: 2904, difficulty: 'hard' },
		{ n: 5, seed: 2905, difficulty: 'hard' }
	];
	for (const grade of bacGrades) {
		const streamName = PHYSICS_GRADE_METADATA[grade].streamNameAr || PHYSICS_GRADE_METADATA[grade].yearName;
		for (const cfg of bacConfigs) {
			specs.push({
				slug: `${grade}-phy-t3-bac-mock-${cfg.n}`,
				grade,
				trimesterId: 't3',
				docType: 'exam',
				variant: 'bac_mock',
				difficulty: cfg.difficulty,
				seed: cfg.seed,
				titleAr: `امتحان بكالوريا تجريبي مقترح في العلوم الفيزيائية — شعبة ${streamName} (النموذج ${cfg.n})`
			});
		}
	}

	if (specs.length !== 216) {
		throw new Error(`Expected 216 Physics sample exam specs, built ${specs.length}`);
	}
	return specs;
}

async function verifyCompiledPdf(filePath: string, label: string): Promise<number> {
	if (!existsSync(filePath)) {
		throw new Error(`Compiled PDF missing (${label}): ${filePath}`);
	}
	const buf = await readFile(filePath);
	if (buf.subarray(0, 5).toString('ascii') !== '%PDF-') {
		throw new Error(`Compiled file is not a valid PDF (${label}): ${filePath}`);
	}
	if (buf.length <= MIN_PDF_BYTES) {
		throw new Error(`Compiled PDF smaller than ${MIN_PDF_BYTES} bytes (${label}): ${buf.length} bytes at ${filePath}`);
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
	const paper = assemblePhysicsExam({
		grade: spec.grade,
		trimesterId: spec.trimesterId,
		seed: spec.seed,
		docType: spec.docType,
		variant: spec.variant,
		difficulty: spec.difficulty
	});

	const gradeDir = resolve('static/documents/generated_samples_physics', spec.grade);
	await mkdir(gradeDir, { recursive: true });

	const subjectOutPath = resolve(gradeDir, `${spec.slug}.pdf`);
	const solutionOutPath = resolve(gradeDir, `${spec.slug}-sol.pdf`);

	const { subjectResult, solutionResult } = await compileAssembledExamPdf(paper, {
		subjectOutPath,
		solutionOutPath
	});

	if (!subjectResult.success) {
		throw new Error(`Typst subject compilation failed for ${spec.slug}: ${subjectResult.error}`);
	}
	if (!solutionResult.success) {
		throw new Error(`Typst solution compilation failed for ${spec.slug}: ${solutionResult.error}`);
	}

	const [fileSize, solutionFileSize] = await Promise.all([
		verifyCompiledPdf(subjectOutPath, `${spec.slug} subject`),
		verifyCompiledPdf(solutionOutPath, `${spec.slug} solution`)
	]);

	console.log(`[ok] ${spec.slug} (${spec.grade}/${spec.trimesterId}, seed=${spec.seed}) -> ${fileSize}B / ${solutionFileSize}B`);

	return {
		slug: spec.slug,
		grade: spec.grade,
		yearSubjectId: PHYSICS_GRADE_METADATA[spec.grade].yearSubjectId,
		trimesterId: spec.trimesterId,
		docType: spec.docType,
		variant: spec.variant,
		difficulty: spec.difficulty,
		seed: spec.seed,
		totalPoints: paper.totalPoints,
		titleAr: spec.titleAr,
		pdfUrl: `/documents/generated_samples_physics/${spec.grade}/${spec.slug}.pdf`,
		solutionUrl: `/documents/generated_samples_physics/${spec.grade}/${spec.slug}-sol.pdf`,
		fileSize,
		solutionFileSize
	};
}

async function main() {
	const specs = buildPaperSpecs();
	console.log(`Generating and compiling ${specs.length} Physics exam papers (${specs.length * 2} PDFs) with concurrency ${CONCURRENCY_LIMIT}...`);
	const items = await runWithConcurrency(specs, CONCURRENCY_LIMIT, (spec) => processSpec(spec));

	const manifestPath = resolve('pipeline/generated_exams_physics/generated_physics_manifest.json');
	await mkdir(dirname(manifestPath), { recursive: true });
	await writeFile(
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

	console.log(`Physics manifest written to ${manifestPath} (${items.length} papers, ${items.length * 2} PDFs).`);
}

main().catch((err) => {
	console.error('Physics exam generation failed:', err);
	process.exit(1);
});
