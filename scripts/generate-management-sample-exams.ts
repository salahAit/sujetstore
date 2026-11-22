import { randomUUID } from 'node:crypto';
import { existsSync } from 'node:fs';
import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { cpus } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import {
	ALL_MANAGEMENT_TRACK_IDS,
	MANAGEMENT_GRADE_METADATA,
	type ManagementTrackId
} from '../src/lib/modules/ManagementTemplates';
import type { ExamType, TemplateId, TrimesterId } from '../src/lib/modules/SujetBuilder/types';
import {
	assembleManagementPaper,
	type ManagementExamVariant
} from '../src/lib/server/assemblers/exam-management';
import { TRIMESTER_NAMES } from '../src/lib/server/assemblers/shared';
import { resolveEffectivePrintStyle } from '../src/lib/server/print-style';
import { getMediaRoot, putMediaObject } from '../src/lib/server/storage';
import { sanitizeTypstDocument } from '../src/lib/server/typst';
import { syncRamWorkspace } from '../src/lib/server/typst-batch-ram';

const CONCURRENCY = Math.min(8, Math.max(4, cpus().length));
const MIN_PDF_BYTES = 18_000;
const MANIFEST_PATH = resolve('pipeline/generated_exams_management/generated_management_manifest.json');
const MEDIA_ROOT = getMediaRoot();

interface SampleExamSpec {
	slug: string;
	grade: ManagementTrackId;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: ManagementExamVariant;
	difficulty: 'easy' | 'medium' | 'hard';
	seed: number;
	topicNumber?: 1 | 2;
	titleAr: string;
}

interface GeneratedManifestItem {
	slug: string;
	grade: ManagementTrackId;
	yearSubjectId: number;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: ManagementExamVariant;
	difficulty: 'easy' | 'medium' | 'hard';
	seed: number;
	topicNumber?: 1 | 2;
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

	// 54 trimester papers (6 tracks x 3 trimesters x [2 exams + 1 test])
	ALL_MANAGEMENT_TRACK_IDS.forEach((grade, gradeIdx) => {
		const meta = MANAGEMENT_GRADE_METADATA[grade];
		const slugGrade = grade.replace('_', '-');
		trimesters.forEach((trim, tIdx) => {
			const trimAr = TRIMESTER_NAMES[trim];
			const baseSeed = 91000 + gradeIdx * 100 + tIdx * 10;
			specs.push(
				{
					slug: `${slugGrade}-mgt-${trim}-exam-sample-1`,
					grade,
					trimesterId: trim,
					docType: 'exam',
					variant: 'trimester_exam',
					difficulty: 'medium',
					seed: baseSeed + 1,
					titleAr: `اختبار ${trimAr} (نموذج 01) في ${meta.subjectName} — ${meta.yearName}`
				},
				{
					slug: `${slugGrade}-mgt-${trim}-exam-sample-2`,
					grade,
					trimesterId: trim,
					docType: 'exam',
					variant: 'trimester_exam',
					difficulty: 'hard',
					seed: baseSeed + 2,
					titleAr: `اختبار ${trimAr} (نموذج 02) في ${meta.subjectName} — ${meta.yearName}`
				},
				{
					slug: `${slugGrade}-mgt-${trim}-test-sample-1`,
					grade,
					trimesterId: trim,
					docType: 'test',
					variant: 'supervised_test',
					difficulty: 'easy',
					seed: baseSeed + 3,
					titleAr: `فرض محروس ${trimAr} في ${meta.subjectName} — ${meta.yearName}`
				}
			);
		});
	});

	// 12 BAC mock papers (3 3AS GE tracks x 4 models)
	const bacTracks: ManagementTrackId[] = ['3as_acc', '3as_eco', '3as_law'];
	bacTracks.forEach((grade, idx) => {
		const meta = MANAGEMENT_GRADE_METADATA[grade];
		const slugGrade = grade.replace('_', '-');
		for (let n = 1; n <= 4; n++) {
			specs.push({
				slug: `${slugGrade}-mgt-t3-bac-mock-${n}`,
				grade,
				trimesterId: 't3',
				docType: 'exam',
				variant: 'bac_mock',
				difficulty: 'hard',
				seed: 96000 + idx * 10 + n,
				topicNumber: n % 2 === 1 ? 1 : 2,
				titleAr: `موضوع بكالوريا تجريبية (رقم 0${n}) في ${meta.subjectName} — شعبة ${meta.streamNameAr}`
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
	const relDataFile = `.gen-mgt-${runId}.json`;
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
	const specs = buildSampleSpecs();
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

			const paper = assembleManagementPaper({
				grade: spec.grade,
				trimesterId: spec.trimesterId,
				seed: spec.seed,
				docType: spec.docType,
				variant: spec.variant,
				difficulty: spec.difficulty,
				topicNumber: spec.topicNumber
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

			const pdfUrl = `/documents/generated_exams_management/${spec.grade}/${spec.trimesterId}/${spec.slug}.pdf`;
			const solutionUrl = `/documents/generated_exams_management/${spec.grade}/${spec.trimesterId}/${spec.slug}-sol.pdf`;

			await Promise.all([
				putMediaObject(pdfUrl, subBuf, 'application/pdf'),
				putMediaObject(solutionUrl, solBuf, 'application/pdf')
			]);

			results[i] = {
				slug: spec.slug,
				grade: spec.grade,
				yearSubjectId: MANAGEMENT_GRADE_METADATA[spec.grade].yearSubjectId,
				trimesterId: spec.trimesterId,
				docType: spec.docType,
				variant: spec.variant,
				difficulty: spec.difficulty,
				seed: spec.seed,
				...(spec.topicNumber ? { topicNumber: spec.topicNumber } : {}),
				totalPoints: paper.totalPoints,
				titleAr: spec.titleAr,
				pdfUrl,
				solutionUrl,
				fileSize: subBuf.byteLength,
				solutionFileSize: solBuf.byteLength
			};

			completed++;
			if (completed % 12 === 0 || completed === specs.length) {
				console.log(`Progress: ${completed}/${specs.length} (${completed * 2} PDFs)`);
			}
		}
	}

	await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

	await writeFile(
		MANIFEST_PATH,
		JSON.stringify(
			{
				generated_at: new Date().toISOString(),
				total_papers: results.length,
				total_pdfs: results.length * 2,
				items: results
			},
			null,
			2
		) + '\n',
		'utf-8'
	);

	const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
	console.log(`[generate-management-sample-exams] Done: ${results.length} papers (${results.length * 2} PDFs) in ${elapsed}s.`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
