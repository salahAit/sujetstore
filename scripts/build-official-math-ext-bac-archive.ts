import { randomUUID } from 'node:crypto';
import { existsSync } from 'node:fs';
import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { ALL_OFFICIAL_BAC_MATH_EXT_PAPERS } from '../src/lib/data/official_bac_math_ext';
import type { ContentBlock } from '../src/lib/modules/SujetBuilder/types';
import { resolveEffectivePrintStyle } from '../src/lib/server/print-style';
import { getMediaRoot, putMediaObject } from '../src/lib/server/storage';
import { sanitizeTypstDocument } from '../src/lib/server/typst';
import { syncRamWorkspace } from '../src/lib/server/typst-batch-ram';

const MIN_PDF_BYTES = 18_000;
const MANIFEST_PATH = resolve('pipeline/official_bac_math_ext/official_bac_math_ext_manifest.json');
const MEDIA_ROOT = getMediaRoot();

const BLOCKLIST: readonly { pattern: RegExp; reason: string }[] = [
	{ pattern: /ﷺ/u, reason: 'Prohibited ligature ﷺ' },
	{ pattern: /[✓✕✗]/u, reason: 'Prohibited Unicode checkmark/cross' },
	{ pattern: /(?:فائدة\s+(?:بسيطة|مركبة)|قرض\s+بفائدة|ربوية)/u, reason: 'Prohibited riba reference' },
	{ pattern: /(?:وزارة التربية الوطنية|الديوان الوطني للامتحانات والمسابقات)/u, reason: 'Prohibited ministry header' }
];

interface ManifestItem {
	slug: string;
	trackGroup: '3as_ge' | '3as_lit';
	subjectId: 'MAT-GE' | 'MAT-LIT';
	academicYear: string;
	topicNumber: 1 | 2;
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
		if (typeof b.answer === 'string') {
			for (const m of b.answer.matchAll(/#image\("([^"]+)"/g)) {
				if (m[1]) paths.push(m[1]);
			}
		}
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

function scanClean(obj: unknown, ctx: string) {
	if (typeof obj === 'string') {
		for (const r of BLOCKLIST) {
			if (r.pattern.test(obj)) throw new Error(`${ctx}: ${r.reason} -> ${obj.slice(0, 80)}`);
		}
	} else if (Array.isArray(obj)) {
		obj.forEach((x, idx) => scanClean(x, `${ctx}[${idx}]`));
	} else if (obj && typeof obj === 'object') {
		for (const [k, v] of Object.entries(obj)) scanClean(v, `${ctx}.${k}`);
	}
}

function sumMarks(blocks: ContentBlock[]): number {
	let s = 0;
	for (const b of blocks) {
		if ((b.type === 'text' || b.type === 'typst_raw') && b.mark) {
			s += Number(String(b.mark).replace(',', '.'));
		} else if (b.type === 'true_false') {
			for (const it of b.items ?? []) s += Number(String(it.mark ?? '0').replace(',', '.'));
		} else if (b.type === 'multiple_choice') {
			for (const g of b.groups ?? []) if (g.mark) s += Number(String(g.mark).replace(',', '.'));
		} else if (b.type === 'table') {
			for (const row of b.rows ?? []) {
				for (const c of row) {
					if (typeof c !== 'string' && c.mark) s += Number(String(c.mark).replace(',', '.'));
				}
			}
		} else if (b.type === 'columns' && Array.isArray(b.children)) {
			s += sumMarks(b.children);
		}
	}
	return s;
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
	isSolution: boolean;
}): Promise<Buffer> {
	const typstRoot = join(opts.wsRoot, 'src/lib/modules/SujetBuilder/typst');
	const outDir = join(opts.wsRoot, 'out');
	await mkdir(outDir, { recursive: true });
	const runId = randomUUID();
	const relDataFile = `.bac-math-ext-${runId}.json`;
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
				'template-id=secondary/bac_official',
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
	const ram = await syncRamWorkspace(true);
	const wsRoot = join(ram.root, 'workspace');
	const fontsDir = join(ram.root, 'fonts');
	await mkdir(dirname(MANIFEST_PATH), { recursive: true });

	const items: ManifestItem[] = [];

	for (const paper of ALL_OFFICIAL_BAC_MATH_EXT_PAPERS) {
		const exList = paper.examDoc.exercises ?? [];
		const totalPts = exList.reduce((s, e) => s + Number(e.points), 0);
		if (Math.abs(totalPts - 20) > 1e-6) {
			throw new Error(`${paper.slug}: total points ${totalPts} != 20`);
		}
		for (const ex of exList) {
			const blockSum = sumMarks(ex.content);
			if (Math.abs(blockSum - Number(ex.points)) > 1e-6) {
				throw new Error(`${paper.slug} (${ex.num ?? ex.customTitle}): block sum ${blockSum} != ${ex.points}`);
			}
		}
		scanClean(paper.examDoc, paper.slug);

		const isGe = paper.slug.includes('3as-ge');
		const trackGroup = isGe ? '3as_ge' : '3as_lit';
		const subjectId = isGe ? 'MAT-GE' : 'MAT-LIT';

		const styledDoc = sanitizeTypstDocument({
			...(paper.examDoc as unknown as Record<string, any>),
			style: resolveEffectivePrintStyle({
				language: 'ar',
				levelId: 'secondaire',
				yearId: '3as',
				subjectId,
				docType: 'exam'
			})
		});
		await stageDocMediaInRam(wsRoot, styledDoc);

		const [subBuf, solBuf] = await Promise.all([
			compileInRamToBuffer({ wsRoot, fontsDir, examDoc: styledDoc, isSolution: false }),
			compileInRamToBuffer({ wsRoot, fontsDir, examDoc: styledDoc, isSolution: true })
		]);

		const pdfUrl = `/documents/official_bac_math_ext/${trackGroup}/${paper.slug}.pdf`;
		const solutionUrl = `/documents/official_bac_math_ext/${trackGroup}/${paper.slug}-sol.pdf`;

		await Promise.all([
			putMediaObject(pdfUrl, subBuf, 'application/pdf'),
			putMediaObject(solutionUrl, solBuf, 'application/pdf')
		]);

		items.push({
			slug: paper.slug,
			trackGroup,
			subjectId,
			academicYear: paper.academicYear,
			topicNumber: paper.examDoc.metadata.topicNumber ?? 1,
			titleAr: paper.titleAr,
			pdfUrl,
			solutionUrl,
			fileSize: subBuf.byteLength,
			solutionFileSize: solBuf.byteLength
		});
		console.log(`Compiled ${paper.slug} (subj=${subBuf.byteLength}B, sol=${solBuf.byteLength}B)`);
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
	console.log(`[official-bac-math-ext] Done: ${items.length} papers (${items.length * 2} PDFs).`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
