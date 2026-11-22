import { randomUUID } from 'node:crypto';
import { existsSync } from 'node:fs';
import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import {
	ALL_OFFICIAL_BAC_MANAGEMENT_PAPERS,
	type OfficialManagementBacPaperSpec
} from '../src/lib/data/official_bac_management';
import { MANAGEMENT_CONTENT_BLOCKLIST } from '../src/lib/modules/ManagementTemplates/management-helpers';
import type { ContentBlock, TemplateId } from '../src/lib/modules/SujetBuilder/types';
import { resolveEffectivePrintStyle } from '../src/lib/server/print-style';
import { getMediaRoot, putMediaObject } from '../src/lib/server/storage';
import { sanitizeTypstDocument } from '../src/lib/server/typst';
import { syncRamWorkspace } from '../src/lib/server/typst-batch-ram';

const MIN_PDF_BYTES = 18_000;
const MANIFEST_PATH = resolve('pipeline/official_bac_management/official_bac_management_manifest.json');
const MEDIA_ROOT = getMediaRoot();

interface OfficialBacManagementManifestItem {
	slug: string;
	grade: OfficialManagementBacPaperSpec['grade'];
	subjectId: OfficialManagementBacPaperSpec['subjectId'];
	yearSubjectId: number;
	academicYear: string;
	topicNumber: 1 | 2;
	sessionAr: string;
	coefficient: number;
	duration: string;
	titleAr: string;
	themesAr: string[];
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

function assertCleanTypstString(text: unknown, ctx: string): void {
	if (typeof text !== 'string') return;
	for (const rule of MANAGEMENT_CONTENT_BLOCKLIST) {
		if (rule.pattern.test(text)) {
			throw new Error(`${ctx}: ${rule.reason} -> ${text.slice(0, 80)}`);
		}
	}
}

function sumBlockMarks(blocks: ContentBlock[]): number {
	let sum = 0;
	for (const b of blocks) {
		if ((b.type === 'text' || b.type === 'typst_raw') && b.mark) {
			sum += Number(String(b.mark).replace(',', '.'));
		} else if (b.type === 'true_false') {
			for (const it of b.items ?? []) sum += Number(String(it.mark ?? '0').replace(',', '.'));
		} else if (b.type === 'multiple_choice') {
			for (const g of b.groups ?? []) {
				if (g.mark) sum += Number(String(g.mark).replace(',', '.'));
			}
		} else if (b.type === 'table') {
			for (const row of b.rows ?? []) {
				for (const cell of row) {
					if (typeof cell !== 'string' && cell.mark) {
						sum += Number(String(cell.mark).replace(',', '.'));
					}
				}
			}
		} else if (b.type === 'columns' && Array.isArray(b.children)) {
			sum += sumBlockMarks(b.children);
		}
	}
	return sum;
}

function validatePaperSpec(spec: OfficialManagementBacPaperSpec): void {
	const exList = spec.examDoc.exercises ?? [];
	const expected = [6, 6, 8];
	if (exList.length !== 3) {
		throw new Error(`${spec.slug}: expected 3 BAC parts, found ${exList.length}`);
	}
	let total = 0;
	for (let i = 0; i < exList.length; i++) {
		const ex = exList[i];
		const exPts = Number(ex.points);
		if (Math.abs(exPts - expected[i]) > 1e-6) {
			throw new Error(`${spec.slug} part ${i + 1}: points ${exPts} != ${expected[i]}`);
		}
		const sum = sumBlockMarks(ex.content);
		if (Math.abs(sum - exPts) > 1e-6) {
			throw new Error(`${spec.slug} part ${i + 1}: block mark sum ${sum} != ${exPts}`);
		}
		total += sum;
		assertCleanTypstString(ex.customTitle, `${spec.slug}.title`);
		assertCleanTypstString(ex.instruction, `${spec.slug}.instruction`);
		for (const b of ex.content) {
			if (b.type === 'text') {
				assertCleanTypstString(b.content, `${spec.slug}.text`);
				assertCleanTypstString(b.answer, `${spec.slug}.answer`);
			}
		}
	}
	if (Math.abs(total - 20) > 1e-6) {
		throw new Error(`${spec.slug}: total ${total} != 20`);
	}
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
	const relDataFile = `.bac-mgt-${runId}.json`;
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
	for (const spec of ALL_OFFICIAL_BAC_MANAGEMENT_PAPERS) {
		validatePaperSpec(spec);
	}

	const ram = await syncRamWorkspace(true);
	const wsRoot = join(ram.root, 'workspace');
	const fontsDir = join(ram.root, 'fonts');
	await mkdir(dirname(MANIFEST_PATH), { recursive: true });

	const items: OfficialBacManagementManifestItem[] = [];

	for (const spec of ALL_OFFICIAL_BAC_MANAGEMENT_PAPERS) {
		const styledDoc = sanitizeTypstDocument({
			...(spec.examDoc as unknown as Record<string, any>),
			style: resolveEffectivePrintStyle({
				language: 'ar',
				levelId: spec.examDoc.metadata.levelId,
				yearId: spec.examDoc.metadata.yearId,
				subjectId: spec.examDoc.metadata.subjectId,
				docType: 'exam'
			})
		});
		await stageDocMediaInRam(wsRoot, styledDoc);

		const [subBuf, solBuf] = await Promise.all([
			compileInRamToBuffer({
				wsRoot,
				fontsDir,
				examDoc: styledDoc,
				templateId: 'secondary/bac_official',
				isSolution: false
			}),
			compileInRamToBuffer({
				wsRoot,
				fontsDir,
				examDoc: styledDoc,
				templateId: 'secondary/bac_official',
				isSolution: true
			})
		]);

		const pdfUrl = `/documents/official_bac_management/${spec.subjectId.toLowerCase()}/${spec.slug}.pdf`;
		const solutionUrl = `/documents/official_bac_management/${spec.subjectId.toLowerCase()}/${spec.slug}-sol.pdf`;

		await Promise.all([
			putMediaObject(pdfUrl, subBuf, 'application/pdf'),
			putMediaObject(solutionUrl, solBuf, 'application/pdf')
		]);

		items.push({
			slug: spec.slug,
			grade: spec.grade,
			subjectId: spec.subjectId,
			yearSubjectId: spec.yearSubjectId,
			academicYear: spec.academicYear,
			topicNumber: spec.topicNumber,
			sessionAr: spec.sessionAr,
			coefficient: spec.coefficient,
			duration: spec.duration,
			titleAr: spec.titleAr,
			themesAr: spec.themesAr,
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
	console.log(`[official-bac-management] Done: ${items.length} papers (${items.length * 2} PDFs).`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
