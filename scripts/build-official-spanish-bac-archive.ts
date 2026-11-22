import { randomUUID } from 'node:crypto';
import { existsSync } from 'node:fs';
import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import {
	ALL_OFFICIAL_BAC_SPANISH_PAPERS,
	type OfficialSpanishBacPaperSpec
} from '../src/lib/data/official_bac_spanish';
import { SPANISH_DOCTRINAL_AND_CONTENT_BLOCKLIST } from '../src/lib/modules/SpanishTemplates/spanish-helpers';
import type { ContentBlock, TemplateId } from '../src/lib/modules/SujetBuilder/types';
import { resolveEffectivePrintStyle } from '../src/lib/server/print-style';
import { getMediaRoot, putMediaObject } from '../src/lib/server/storage';
import { sanitizeTypstDocument } from '../src/lib/server/typst';
import { syncRamWorkspace } from '../src/lib/server/typst-batch-ram';

const MIN_PDF_BYTES = 18_000;
const MANIFEST_PATH = resolve('pipeline/official_bac_spanish/official_bac_spanish_manifest.json');
const MEDIA_ROOT = getMediaRoot();

interface OfficialBacSpanishManifestItem {
	slug: string;
	grade: '3as_le';
	yearSubjectId: 793;
	subjectId: 'LAN-SPA';
	streamId: 'LE';
	academicYear: string;
	topicNumber: 1 | 2;
	sessionAr: string;
	coefficient: number;
	duration: string;
	titleAr: string;
	titleEs: string;
	themesEs: string[];
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

function assertCleanString(text: unknown, ctx: string): void {
	if (typeof text !== 'string') return;
	for (const rule of SPANISH_DOCTRINAL_AND_CONTENT_BLOCKLIST) {
		if (rule.pattern.test(text)) {
			throw new Error(`${ctx}: ${rule.reason} -> ${text.slice(0, 60)}`);
		}
	}
}

function sumBlockMarks(blocks: ContentBlock[], ctx: string): number {
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
		} else if (b.type === 'illustrated_figure') {
			if (Array.isArray(b.pins) && b.pins.length > 0) {
				throw new Error(`${ctx}: overlay pins forbidden in Spanish (${b.pins.length} pins)`);
			}
			for (const it of b.legend ?? []) {
				if (it.mark !== undefined && it.mark !== '') {
					sum += Number(String(it.mark).replace(',', '.'));
				}
			}
		} else if (b.type === 'image_grid') {
			for (const it of b.items ?? []) {
				if (it.mark) sum += Number(String(it.mark).replace(',', '.'));
			}
		} else if (b.type === 'columns' && Array.isArray(b.children)) {
			sum += sumBlockMarks(b.children, ctx);
		}
	}
	return sum;
}

function validatePaperSpec(spec: OfficialSpanishBacPaperSpec): void {
	const exList = spec.examDoc.exercises ?? [];
	const expected = [7, 7, 6];
	if (exList.length !== 3) {
		throw new Error(`${spec.slug}: expected 3 BAC parts [7, 7, 6], found ${exList.length}`);
	}

	let paperTotal = 0;
	for (let i = 0; i < exList.length; i++) {
		const ex = exList[i];
		const exPts = Number(String(ex.points).replace(',', '.'));
		const ctx = `${spec.slug} (${ex.id ?? ex.customTitle ?? `part${i + 1}`})`;
		if (Math.abs(exPts - expected[i]) > 1e-6) {
			throw new Error(`${ctx}: exercise points (${exPts}) != expected ${expected[i]}`);
		}
		const blockSum = sumBlockMarks(ex.content, ctx);
		if (Math.abs(blockSum - exPts) > 1e-6) {
			throw new Error(`${ctx}: block marks sum (${blockSum}) != exercise points (${exPts})`);
		}
		paperTotal += blockSum;

		assertCleanString(ex.customTitle, `${ctx}.customTitle`);
		assertCleanString(ex.instruction, `${ctx}.instruction`);
		for (const b of ex.content) {
			if (b.type === 'text') {
				assertCleanString(b.content, `${ctx}.text.content`);
				assertCleanString(b.answer, `${ctx}.text.answer`);
			} else if (b.type === 'table') {
				for (const row of b.rows ?? []) {
					for (const cell of row) {
						if (typeof cell === 'string') {
							assertCleanString(cell, `${ctx}.table.cell`);
						} else {
							assertCleanString(cell.content, `${ctx}.table.cell.content`);
							assertCleanString(cell.answer, `${ctx}.table.cell.answer`);
						}
					}
				}
			}
		}
	}

	if (Math.abs(paperTotal - 20) > 1e-6) {
		throw new Error(`${spec.slug}: total paper marks (${paperTotal}) != 20.0`);
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

async function compileInRam(opts: {
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
	const relDataFile = `.bac-spa-${runId}.json`;
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
	const records = ALL_OFFICIAL_BAC_SPANISH_PAPERS;
	if (records.length !== 6) {
		throw new Error(`Expected 6 official Spanish BAC papers (2023-2025 x 2), got ${records.length}`);
	}

	const ram = await syncRamWorkspace(true);
	const wsRoot = join(ram.root, 'workspace');
	const fontsDir = join(ram.root, 'fonts');

	const items: OfficialBacSpanishManifestItem[] = new Array(records.length);

	await Promise.all(
		records.map(async (rec, idx) => {
			validatePaperSpec(rec);

			const styledDoc = sanitizeTypstDocument({
				...(rec.examDoc as unknown as Record<string, any>),
				style: resolveEffectivePrintStyle({
					language: 'es',
					levelId: 'secondaire',
					yearId: '3as',
					subjectId: 'LAN-SPA',
					docType: 'exam'
				})
			});

			await stageDocMediaInRam(wsRoot, styledDoc);

			const [subBuf, solBuf] = await Promise.all([
				compileInRam({
					wsRoot,
					fontsDir,
					examDoc: styledDoc,
					templateId: rec.templateId,
					isSolution: false
				}),
				compileInRam({
					wsRoot,
					fontsDir,
					examDoc: styledDoc,
					templateId: rec.templateId,
					isSolution: true
				})
			]);

			const pdfUrl = `/generated/official-bac-spanish/${rec.slug}.pdf`;
			const solutionUrl = `/generated/official-bac-spanish/${rec.slug}-sol.pdf`;

			await Promise.all([
				putMediaObject(pdfUrl, subBuf, 'application/pdf'),
				putMediaObject(solutionUrl, solBuf, 'application/pdf')
			]);

			items[idx] = {
				slug: rec.slug,
				grade: rec.grade,
				yearSubjectId: rec.yearSubjectId,
				subjectId: rec.subjectId,
				streamId: rec.streamId,
				academicYear: rec.academicYear,
				topicNumber: rec.topicNumber,
				sessionAr: rec.sessionAr,
				coefficient: rec.coefficient,
				duration: rec.duration,
				titleAr: rec.titleAr,
				titleEs: rec.titleEs,
				themesEs: rec.themesEs,
				themesAr: rec.themesAr,
				pdfUrl,
				solutionUrl,
				fileSize: subBuf.length,
				solutionFileSize: solBuf.length
			};
			console.log(`Compiled & synced ${rec.slug} (subject=${subBuf.length}B, solution=${solBuf.length}B)`);
		})
	);

	items.sort((a, b) => a.slug.localeCompare(b.slug));

	await mkdir(dirname(MANIFEST_PATH), { recursive: true });
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
		),
		'utf-8'
	);

	console.log(
		JSON.stringify({ total_papers: items.length, total_pdfs: items.length * 2, manifestPath: MANIFEST_PATH })
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
