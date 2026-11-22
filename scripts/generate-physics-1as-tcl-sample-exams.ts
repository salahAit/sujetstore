import { randomUUID } from 'node:crypto';
import { existsSync } from 'node:fs';
import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import {
	PHYSICS_GRADE_METADATA,
	type Difficulty
} from '../src/lib/modules/PhysicsTemplates/types';
import type { ExamType, TemplateId, TrimesterId } from '../src/lib/modules/SujetBuilder/types';
import { assemblePhysicsSecondaryExam } from '../src/lib/server/assemblers/exam-physics-secondary';
import { resolveEffectivePrintStyle } from '../src/lib/server/print-style';
import { getMediaRoot, putMediaObject } from '../src/lib/server/storage';
import { sanitizeTypstDocument } from '../src/lib/server/typst';
import { syncRamWorkspace } from '../src/lib/server/typst-batch-ram';

const MIN_PDF_BYTES = 20_480;
const MANIFEST_PATH = resolve('pipeline/generated_exams_physics_tcl/generated_physics_tcl_manifest.json');
const MEDIA_ROOT = getMediaRoot();

interface SamplePaperSpec {
	slug: string;
	grade: '1as_tcl';
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: 'trimester_exam' | 'supervised_test';
	difficulty: Difficulty;
	seed: number;
	titleAr: string;
}

interface GeneratedManifestItem {
	slug: string;
	grade: '1as_tcl';
	yearSubjectId: number;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: 'trimester_exam' | 'supervised_test';
	difficulty: Difficulty;
	seed: number;
	totalPoints: number;
	titleAr: string;
	pdfUrl: string;
	solutionUrl: string;
	fileSize: number;
	solutionFileSize: number;
}

const TRIMESTER_LABELS_AR: Record<TrimesterId, string> = {
	t1: 'الفصل الأول',
	t2: 'الفصل الثاني',
	t3: 'الفصل الثالث'
};

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
	const relDataFile = `.gen-phy-tcl-${runId}.json`;
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

function buildSpecs(): SamplePaperSpec[] {
	const meta = PHYSICS_GRADE_METADATA['1as_tcl'];
	const specs: SamplePaperSpec[] = [];
	const trimesters: TrimesterId[] = ['t1', 't2', 't3'];
	trimesters.forEach((trimesterId, tIdx) => {
		const trimAr = TRIMESTER_LABELS_AR[trimesterId];
		const base = 7100 + tIdx * 100;
		specs.push(
			{
				slug: `1as-tcl-phy-${trimesterId}-exam-sample-1`,
				grade: '1as_tcl',
				trimesterId,
				docType: 'exam',
				variant: 'trimester_exam',
				difficulty: 'medium',
				seed: base + 1,
				titleAr: `اختبار ${trimAr} في ${meta.subjectName} — ${meta.yearName} (نموذج 1)`
			},
			{
				slug: `1as-tcl-phy-${trimesterId}-exam-sample-2`,
				grade: '1as_tcl',
				trimesterId,
				docType: 'exam',
				variant: 'trimester_exam',
				difficulty: 'hard',
				seed: base + 2,
				titleAr: `اختبار ${trimAr} في ${meta.subjectName} — ${meta.yearName} (نموذج 2)`
			},
			{
				slug: `1as-tcl-phy-${trimesterId}-test-sample-1`,
				grade: '1as_tcl',
				trimesterId,
				docType: 'test',
				variant: 'supervised_test',
				difficulty: 'easy',
				seed: base + 3,
				titleAr: `فرض محروس ${trimAr} في ${meta.subjectName} — ${meta.yearName} (نموذج 1)`
			}
		);
	});
	return specs;
}

async function main() {
	const specs = buildSpecs();
	const ram = await syncRamWorkspace(true);
	const wsRoot = join(ram.root, 'workspace');
	const fontsDir = join(ram.root, 'fonts');
	await mkdir(dirname(MANIFEST_PATH), { recursive: true });

	const items: GeneratedManifestItem[] = [];
	for (const spec of specs) {
		const paper = assemblePhysicsSecondaryExam({
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

		const pdfUrl = `/documents/generated_exams_physics_tcl/${spec.trimesterId}/${spec.slug}.pdf`;
		const solutionUrl = `/documents/generated_exams_physics_tcl/${spec.trimesterId}/${spec.slug}-sol.pdf`;

		await Promise.all([
			putMediaObject(pdfUrl, subBuf, 'application/pdf'),
			putMediaObject(solutionUrl, solBuf, 'application/pdf')
		]);

		items.push({
			slug: spec.slug,
			grade: spec.grade,
			yearSubjectId: PHYSICS_GRADE_METADATA['1as_tcl'].yearSubjectId,
			trimesterId: spec.trimesterId,
			docType: spec.docType,
			variant: spec.variant,
			difficulty: spec.difficulty,
			seed: spec.seed,
			totalPoints: paper.totalPoints,
			titleAr: spec.titleAr,
			pdfUrl,
			solutionUrl,
			fileSize: subBuf.byteLength,
			solutionFileSize: solBuf.byteLength
		});
		console.log(`Compiled ${spec.slug} (subj=${subBuf.byteLength}B, sol=${solBuf.byteLength}B)`);
	}

	await writeFile(
		MANIFEST_PATH,
		JSON.stringify(
			{
				generated_at: new Date().toISOString(),
				total_papers: items.length,
				total_pdfs: items.length * 2,
				items
			},
			null,
			2
		) + '\n',
		'utf-8'
	);
	console.log(`[generate-physics-1as-tcl] Done: ${items.length} papers (${items.length * 2} PDFs).`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
