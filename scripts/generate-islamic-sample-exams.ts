import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import {
	assembleIslamicExam,
	type AssembleIslamicExamOptions
} from '../src/lib/server/exam-assembler';
import {
	ALL_ISLAMIC_TRACK_IDS,
	ISLAMIC_GRADE_METADATA,
	type Difficulty,
	type IslamicTrackId
} from '../src/lib/modules/IslamicTemplates/types';
import { putMediaObject } from '../src/lib/server/storage';
import { syncRamWorkspace } from '../src/lib/server/typst-batch-ram';
import { sanitizeTypstDocument } from '../src/lib/server/typst';
import { resolveEffectivePrintStyle } from '../src/lib/server/print-style';
import type { ExamType, TrimesterId } from '../src/lib/modules/SujetBuilder/types';

type IslamicExamVariant = NonNullable<AssembleIslamicExamOptions['variant']>;

interface SamplePaperSpec {
	slug: string;
	grade: IslamicTrackId;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: IslamicExamVariant;
	difficulty: Difficulty;
	seed: number;
	titleAr: string;
}

interface GeneratedManifestItem {
	slug: string;
	grade: IslamicTrackId;
	yearSubjectId: number;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: IslamicExamVariant;
	difficulty: Difficulty;
	seed: number;
	totalPoints: number;
	titleAr: string;
	pdfUrl: string;
	solutionUrl: string;
	fileSize: number;
	solutionFileSize: number;
}

const GRADES: readonly IslamicTrackId[] = ALL_ISLAMIC_TRACK_IDS;
const TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];
const TRIMESTER_LABELS: Record<TrimesterId, string> = {
	t1: 'الفصل الأول',
	t2: 'الفصل الثاني',
	t3: 'الفصل الثالث'
};

const MANIFEST_PATH = resolve('pipeline/generated_exams_islamic/generated_islamic_manifest.json');
const CONCURRENCY = Math.max(2, Math.min(12, Number(process.env.GEN_CONCURRENCY || '10')));

function parseFilterGrades(): Set<IslamicTrackId> | null {
	const idx = process.argv.indexOf('--grades');
	if (idx === -1 || !process.argv[idx + 1]) return null;
	const raw = process.argv[idx + 1]
		.split(',')
		.map((s) => s.trim())
		.filter(Boolean) as IslamicTrackId[];
	return new Set(raw);
}

function buildSpecs(filterGrades: Set<IslamicTrackId> | null): SamplePaperSpec[] {
	const specs: SamplePaperSpec[] = [];
	const selectedGrades = filterGrades ? GRADES.filter((g) => filterGrades.has(g)) : GRADES;

	for (const grade of selectedGrades) {
		const meta = ISLAMIC_GRADE_METADATA[grade];
		const isPrimary = meta.levelId === 'primaire';
		const isFirstPrimary = grade === '1ap';
		const subjLabel = meta.subjectName;
		const testWord = isFirstPrimary
			? 'تقويم تشخيصي وتكويني'
			: isPrimary
				? 'تقويم مرحلي'
				: 'فرض محروس';
		const examWord = isFirstPrimary ? 'تقييم فصلي تكويني' : 'اختبار';

		for (const trimesterId of TRIMESTERS) {
			const trimAr = TRIMESTER_LABELS[trimesterId];
			const testSeeds: Array<{ idx: number; seed: number; difficulty: Difficulty }> = [
				{ idx: 1, seed: 7401, difficulty: 'easy' },
				{ idx: 2, seed: 7502, difficulty: 'medium' }
			];
			for (const t of testSeeds) {
				specs.push({
					slug: `${grade}-isl-${trimesterId}-test-sample-${t.idx}`,
					grade,
					trimesterId,
					docType: 'test',
					variant: 'supervised_test',
					difficulty: t.difficulty,
					seed: t.seed,
					titleAr: `${testWord} (${t.idx}) لـ${trimAr} في ${subjLabel} — ${meta.yearName}`
				});
			}

			const examSeeds: Array<{ idx: number; seed: number; difficulty: Difficulty }> = [
				{ idx: 1, seed: 7101, difficulty: 'medium' },
				{ idx: 2, seed: 7202, difficulty: 'hard' }
			];
			for (const e of examSeeds) {
				specs.push({
					slug: `${grade}-isl-${trimesterId}-exam-sample-${e.idx}`,
					grade,
					trimesterId,
					docType: 'exam',
					variant: 'trimester_exam',
					difficulty: e.difficulty,
					seed: e.seed,
					titleAr: `${examWord} ${trimAr} النموذجي (${e.idx}) في ${subjLabel} — ${meta.yearName}`
				});
			}
		}
	}

	// 5AP Competency Evaluation (امتحان تقييم المكتسبات)
	if (!filterGrades || filterGrades.has('5ap')) {
		for (const idx of [1, 2] as const) {
			specs.push({
				slug: `5ap-isl-t3-competency-eval-${idx}`,
				grade: '5ap',
				trimesterId: 't3',
				docType: 'exam',
				variant: 'competency_eval',
				difficulty: idx === 1 ? 'medium' : 'hard',
				seed: 7700 + idx,
				titleAr: `موضوع امتحان تقييم المكتسبات (${idx}) في التربية الإسلامية — الخامسة ابتدائي`
			});
		}
	}

	// 4AM BEM Mocks (معامل 2)
	if (!filterGrades || filterGrades.has('4am')) {
		for (const idx of [1, 2, 3] as const) {
			specs.push({
				slug: `4am-isl-t3-bem-mock-${idx}`,
				grade: '4am',
				trimesterId: 't3',
				docType: 'exam',
				variant: 'bem_mock',
				difficulty: idx === 1 ? 'medium' : 'hard',
				seed: 7900 + idx,
				titleAr: `امتحان تجريبي لشهادة التعليم المتوسط (BEM) نموذج ${idx} — التربية الإسلامية`
			});
		}
	}

	// 3AS BAC Mocks across all 6 BAC streams (unified العلوم الإسلامية, coeff 2)
	for (const grade of ['3as_se', '3as_tm', '3as_math', '3as_ge', '3as_lp', '3as_le'] as const) {
		if (filterGrades && !filterGrades.has(grade)) continue;
		const streamName = ISLAMIC_GRADE_METADATA[grade].streamNameAr || grade;
		for (const idx of [1, 2, 3] as const) {
			specs.push({
				slug: `${grade}-isl-t3-bac-mock-${idx}`,
				grade,
				trimesterId: 't3',
				docType: 'exam',
				variant: 'bac_mock',
				difficulty: idx === 1 ? 'medium' : 'hard',
				seed: 8100 + idx,
				titleAr: `بكالوريا تجريبية نموذج ${idx} في العلوم الإسلامية — شعبة ${streamName}`
			});
		}
	}

	return specs;
}

function runTypst(args: string[], cwd: string): Promise<{ success: boolean; error?: string }> {
	return new Promise((resolvePromise) => {
		const proc = spawn('typst', args, {
			cwd,
			timeout: 25000,
			stdio: ['ignore', 'pipe', 'pipe']
		});
		let stderr = '';
		proc.stderr.on('data', (chunk) => {
			stderr += chunk.toString();
		});
		proc.on('close', (code) => {
			if (code === 0) resolvePromise({ success: true });
			else resolvePromise({ success: false, error: stderr.trim() || `exit ${code}` });
		});
		proc.on('error', (err) => {
			resolvePromise({ success: false, error: err.message });
		});
	});
}

async function compileInRamToBuffer(opts: {
	wsRoot: string;
	fontsDir: string;
	examDoc: Record<string, any>;
	templateId: string;
	isSolution: boolean;
}): Promise<Buffer> {
	const typstRoot = join(opts.wsRoot, 'src/lib/modules/SujetBuilder/typst');
	const outDir = join(opts.wsRoot, 'out');
	const runId = randomUUID();
	const relDataFile = `.isl-${runId}.json`;
	const dataFilePath = join(typstRoot, relDataFile);
	const outPdfPath = join(outDir, `${runId}.pdf`);

	await writeFile(dataFilePath, JSON.stringify(opts.examDoc), 'utf-8');
	try {
		const res = await runTypst(
			[
				'compile',
				'main.typ',
				outPdfPath,
				'--root',
				opts.wsRoot,
				'--font-path',
				opts.fontsDir,
				'--input',
				`template-id=${opts.templateId}`,
				'--input',
				`data-file=${relDataFile}`,
				'--input',
				`is-solution=${opts.isSolution}`
			],
			typstRoot
		);
		if (!res.success) {
			throw new Error(res.error || 'Typst compile failed');
		}
		const buf = await readFile(outPdfPath);
		if (buf.length < 16 || buf.subarray(0, 5).toString('ascii') !== '%PDF-') {
			throw new Error('Invalid %PDF- header');
		}
		return buf;
	} finally {
		await Promise.all([
			rm(dataFilePath, { force: true }).catch(() => {}),
			rm(outPdfPath, { force: true }).catch(() => {})
		]);
	}
}

async function main() {
	const filterGrades = parseFilterGrades();
	const specs = buildSpecs(filterGrades);
	const t0 = Date.now();

	await mkdir(dirname(MANIFEST_PATH), { recursive: true });
	const ram = await syncRamWorkspace(true);
	const wsRoot = join(ram.root, 'workspace');
	const fontsDir = join(ram.root, 'fonts');

	console.log(
		`[generate-islamic-sample-exams] Compiling ${specs.length} papers (${specs.length * 2} PDFs) in ${ram.root} (${ram.isRamDisk ? 'RAM tmpfs' : 'disk'}) with concurrency=${CONCURRENCY}...`
	);

	const results: GeneratedManifestItem[] = new Array(specs.length);
	let cursor = 0;
	let completed = 0;

	async function worker() {
		while (true) {
			const i = cursor++;
			if (i >= specs.length) return;
			const spec = specs[i];
			const paper = assembleIslamicExam({
				grade: spec.grade,
				trimesterId: spec.trimesterId,
				seed: spec.seed,
				docType: spec.docType,
				variant: spec.variant,
				difficulty: spec.difficulty
			});

			const styledDoc = sanitizeTypstDocument({
				...(paper.examDoc as unknown as Record<string, any>),
				style: resolveEffectivePrintStyle({
					language: 'ar',
					levelId: paper.examDoc.metadata.levelId,
					yearId: paper.examDoc.metadata.yearId,
					subjectId: paper.examDoc.metadata.subjectId,
					docType: paper.examDoc.metadata.docType
				})
			});

			const [subBuf, solBuf] = await Promise.all([
				compileInRamToBuffer({
					wsRoot,
					fontsDir,
					examDoc: styledDoc,
					templateId: paper.templateId,
					isSolution: false
				}),
				compileInRamToBuffer({
					wsRoot,
					fontsDir,
					examDoc: styledDoc,
					templateId: paper.templateId,
					isSolution: true
				})
			]);

			const pdfUrl = `/documents/generated_samples_islamic/${spec.grade}/${spec.trimesterId}/${spec.slug}.pdf`;
			const solutionUrl = `/documents/generated_samples_islamic/${spec.grade}/${spec.trimesterId}/${spec.slug}-sol.pdf`;

			await Promise.all([
				putMediaObject(pdfUrl, subBuf, 'application/pdf'),
				putMediaObject(solutionUrl, solBuf, 'application/pdf')
			]);

			results[i] = {
				slug: spec.slug,
				grade: spec.grade,
				yearSubjectId: ISLAMIC_GRADE_METADATA[spec.grade].yearSubjectId,
				trimesterId: spec.trimesterId,
				docType: spec.docType,
				variant: spec.variant,
				difficulty: spec.difficulty,
				seed: spec.seed,
				totalPoints: paper.totalPoints,
				titleAr: spec.titleAr,
				pdfUrl,
				solutionUrl,
				fileSize: subBuf.length,
				solutionFileSize: solBuf.length
			};

			completed++;
			if (completed % 25 === 0 || completed === specs.length) {
				const elapsed = (Date.now() - t0) / 1000;
				const rate = ((completed * 2) / Math.max(elapsed, 0.1)).toFixed(1);
				console.log(
					`  [${completed}/${specs.length}] compiled & synced to RustFS (${elapsed.toFixed(1)}s, ${rate} PDF/s)`
				);
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

	const totalSec = (Date.now() - t0) / 1000;
	console.log(
		`[generate-islamic-sample-exams] DONE: ${finalItems.length} papers (${finalItems.length * 2} PDFs) in ${totalSec.toFixed(1)}s (${((finalItems.length * 2) / Math.max(totalSec, 0.1)).toFixed(1)} PDF/s) -> ${MANIFEST_PATH}`
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
