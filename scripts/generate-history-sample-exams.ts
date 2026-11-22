import { randomUUID } from 'node:crypto';
import { existsSync } from 'node:fs';
import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { cpus } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import {
	ALL_HISTORY_TRACK_IDS,
	HISTORY_GRADE_METADATA,
	type HistoryTrackId
} from '../src/lib/modules/HistoryGeoTemplates';
import type { ExamType, TemplateId, TrimesterId } from '../src/lib/modules/SujetBuilder/types';
import { assembleHistoryPaper, type HistoryExamVariant } from '../src/lib/server/assemblers/exam-history';
import { TRIMESTER_NAMES } from '../src/lib/server/assemblers/shared';
import { resolveEffectivePrintStyle } from '../src/lib/server/print-style';
import { getMediaRoot, putMediaObject } from '../src/lib/server/storage';
import { sanitizeTypstDocument } from '../src/lib/server/typst';
import { syncRamWorkspace } from '../src/lib/server/typst-batch-ram';

const CONCURRENCY = Math.min(8, Math.max(4, cpus().length));
const MIN_PDF_BYTES = 18_000;
const MANIFEST_PATH = resolve('pipeline/generated_exams_history/generated_history_manifest.json');
const MEDIA_ROOT = getMediaRoot();

interface SampleExamSpec {
	slug: string;
	grade: HistoryTrackId;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: HistoryExamVariant;
	difficulty: 'easy' | 'medium' | 'hard';
	seed: number;
	titleAr: string;
}

interface GeneratedManifestItem {
	slug: string;
	grade: HistoryTrackId;
	yearSubjectId: number;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: HistoryExamVariant;
	difficulty: 'easy' | 'medium' | 'hard';
	seed: number;
	totalPoints: number;
	titleAr: string;
	pdfUrl: string;
	solutionUrl: string;
	fileSize: number;
	solutionFileSize: number;
}

const stagePromises = new Map<string, Promise<void>>();

function ensureRamMediaStaged(wsRoot: string, rawPath: unknown): Promise<void> {
	if (typeof rawPath !== 'string' || !rawPath) return Promise.resolve();
	const clean = rawPath.split('#')[0].split('?')[0].trim();
	if (!clean.startsWith('/data/media/')) return Promise.resolve();
	const rel = clean.slice('/data/media/'.length).replace(/^\/+/, '');
	if (!rel || rel.includes('..')) return Promise.resolve();
	const existing = stagePromises.get(rel);
	if (existing) return existing;

	const p = (async () => {
		const src = join(MEDIA_ROOT, rel);
		const dst = join(wsRoot, 'data', 'media', rel);
		if (existsSync(src)) {
			await mkdir(dirname(dst), { recursive: true });
			await copyFile(src, dst);
		}
	})();
	stagePromises.set(rel, p);
	return p;
}

async function stageDocMediaInRam(wsRoot: string, examDoc: Record<string, any>): Promise<void> {
	const paths: string[] = [];
	const walkBlock = (b: any) => {
		if (!b || typeof b !== 'object') return;
		if (typeof b.src === 'string') paths.push(b.src);
		if (Array.isArray(b.items)) {
			for (const it of b.items) {
				if (typeof it?.src === 'string') paths.push(it.src);
			}
		}
		if (Array.isArray(b.children)) {
			for (const child of b.children) walkBlock(child);
		}
	};
	for (const ex of examDoc.exercises ?? []) {
		for (const b of ex.content ?? ex.blocks ?? []) walkBlock(b);
	}
	await Promise.all(paths.map((p) => ensureRamMediaStaged(wsRoot, p)));
}

function buildSampleSpecs(): SampleExamSpec[] {
	const specs: SampleExamSpec[] = [];
	const trimesters: TrimesterId[] = ['t1', 't2', 't3'];

	ALL_HISTORY_TRACK_IDS.forEach((grade, gradeIdx) => {
		const meta = HISTORY_GRADE_METADATA[grade];
		const slugGrade = grade.replace('_', '-');
		const trackTitle = meta.streamNameAr ? `${meta.yearName} (${meta.streamNameAr})` : meta.yearName;

		trimesters.forEach((trim, tIdx) => {
			const trimAr = TRIMESTER_NAMES[trim];
			const baseSeed = 80000 + gradeIdx * 100 + tIdx * 10;

			specs.push(
				{
					slug: `${slugGrade}-his-${trim}-exam-sample-1`,
					grade,
					trimesterId: trim,
					docType: 'exam',
					variant: 'trimester_exam',
					difficulty: 'medium',
					seed: baseSeed + 1,
					titleAr: `نموذج اختبار الفصل ${trim === 't1' ? 'الأول' : trim === 't2' ? 'الثاني' : 'الثالث'} (رقم 01) في التاريخ والجغرافيا — ${trackTitle}`
				},
				{
					slug: `${slugGrade}-his-${trim}-exam-sample-2`,
					grade,
					trimesterId: trim,
					docType: 'exam',
					variant: 'trimester_exam',
					difficulty: 'hard',
					seed: baseSeed + 2,
					titleAr: `نموذج اختبار ${trimAr} (رقم 02) في التاريخ والجغرافيا — ${trackTitle}`
				},
				{
					slug: `${slugGrade}-his-${trim}-test-sample-1`,
					grade,
					trimesterId: trim,
					docType: 'test',
					variant: 'supervised_test',
					difficulty: 'easy',
					seed: baseSeed + 3,
					titleAr: `فرض محروس في التاريخ والجغرافيا — ${trackTitle} (${trimAr})`
				}
			);
		});
	});

	specs.push({
		slug: '5ap-his-t3-competency-sample-1',
		grade: '5ap',
		trimesterId: 't3',
		docType: 'exam',
		variant: 'competency_eval',
		difficulty: 'hard',
		seed: 95101,
		titleAr: 'نموذج امتحان تقييم المكتسبات في التاريخ والجغرافيا — السنة الخامسة ابتدائي'
	});

	specs.push(
		{
			slug: '4am-his-t3-bem-sample-1',
			grade: '4am',
			trimesterId: 't3',
			docType: 'exam',
			variant: 'bem_mock',
			difficulty: 'hard',
			seed: 94201,
			titleAr: 'موضوع مقترح (01) لشهادة التعليم المتوسط (BEM) في التاريخ والجغرافيا'
		},
		{
			slug: '4am-his-t3-bem-sample-2',
			grade: '4am',
			trimesterId: 't3',
			docType: 'exam',
			variant: 'bem_mock',
			difficulty: 'hard',
			seed: 94202,
			titleAr: 'موضوع مقترح (02) لشهادة التعليم المتوسط (BEM) في التاريخ والجغرافيا'
		}
	);

	const bacTracks: HistoryTrackId[] = ['3as_se', '3as_math', '3as_tm', '3as_ge', '3as_lp', '3as_le'];
	bacTracks.forEach((grade, idx) => {
		const meta = HISTORY_GRADE_METADATA[grade];
		const slugGrade = grade.replace('_', '-');
		for (let n = 1; n <= 2; n++) {
			specs.push({
				slug: `${slugGrade}-his-t3-bac-sample-${n}`,
				grade,
				trimesterId: 't3',
				docType: 'exam',
				variant: 'bac_mock',
				difficulty: 'hard',
				seed: 96300 + idx * 10 + n,
				titleAr: `بكالوريا تجريبية (نموذج 0${n}) في التاريخ والجغرافيا — شعبة ${meta.streamNameAr}`
			});
		}
	});

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
	templateId: TemplateId;
	isSolution: boolean;
}): Promise<Buffer> {
	const typstRoot = join(opts.wsRoot, 'src/lib/modules/SujetBuilder/typst');
	const outDir = join(opts.wsRoot, 'out');
	await mkdir(outDir, { recursive: true });
	const runId = randomUUID();
	const relDataFile = `.gen-his-${runId}.json`;
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
		if (!res.success) throw new Error(res.error || 'Typst compile failed');
		const buf = await readFile(outPdfPath);
		if (buf.length < MIN_PDF_BYTES || buf.subarray(0, 5).toString('ascii') !== '%PDF-') {
			throw new Error(`Invalid or undersized PDF (${buf.length}B)`);
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
	const gradeArg = process.argv.find((a) => a.startsWith('--grade='));
	const filterGrades = gradeArg
		? new Set(
				gradeArg
					.slice('--grade='.length)
					.split(',')
					.map((s) => s.trim())
					.filter(Boolean)
			)
		: null;

	let specs = buildSampleSpecs();
	if (filterGrades) {
		specs = specs.filter((s) => filterGrades.has(s.grade));
	}
	if (specs.length === 0) {
		throw new Error('No History-Geo sample specs selected.');
	}

	const ram = await syncRamWorkspace(true);
	const wsRoot = join(ram.root, 'workspace');
	const fontsDir = join(ram.root, 'fonts');
	await mkdir(dirname(MANIFEST_PATH), { recursive: true });

	const t0 = Date.now();
	const results: GeneratedManifestItem[] = new Array(specs.length);
	let nextIdx = 0;
	let completed = 0;

	async function worker() {
		while (true) {
			const i = nextIdx++;
			if (i >= specs.length) break;
			const spec = specs[i];

			const paper = assembleHistoryPaper({
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

			await stageDocMediaInRam(wsRoot, styledDoc);

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

			const pdfUrl = `/documents/generated_samples_history/${spec.grade}/${spec.trimesterId}/${spec.slug}.pdf`;
			const solutionUrl = `/documents/generated_samples_history/${spec.grade}/${spec.trimesterId}/${spec.slug}-sol.pdf`;

			await Promise.all([
				putMediaObject(pdfUrl, subBuf, 'application/pdf'),
				putMediaObject(solutionUrl, solBuf, 'application/pdf')
			]);

			results[i] = {
				slug: spec.slug,
				grade: spec.grade,
				yearSubjectId: HISTORY_GRADE_METADATA[spec.grade].yearSubjectId,
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
		`[generate-history-sample-exams] DONE: ${finalItems.length} papers (${finalItems.length * 2} PDFs) in ${totalSec.toFixed(1)}s -> ${MANIFEST_PATH}`
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
