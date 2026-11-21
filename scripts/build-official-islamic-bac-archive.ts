import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import {
	ALL_OFFICIAL_BAC_ISLAMIC_PAPERS,
	type OfficialIslamicBacPaperSpec
} from '../src/lib/data/official_bac_islamic';
import { ISLAMIC_FULL_BLOCKLIST } from '../src/lib/modules/IslamicTemplates/islamic-helpers';
import { putMediaObject } from '../src/lib/server/storage';
import { syncRamWorkspace } from '../src/lib/server/typst-batch-ram';
import { sanitizeTypstDocument } from '../src/lib/server/typst';
import { resolveEffectivePrintStyle } from '../src/lib/server/print-style';
import type { ContentBlock, TableCell } from '../src/lib/modules/SujetBuilder/types';

const MIN_PDF_BYTES = 18_000;

interface OfficialBacIslamicManifestItem {
	slug: string;
	academicYear: '2023' | '2024' | '2025';
	topicNumber: 1 | 2;
	sessionAr: string;
	coefficient: 2;
	duration: string;
	titleAr: string;
	themesAr: string[];
	pdfUrl: string;
	solutionUrl: string;
	fileSize: number;
	solutionFileSize: number;
}

function parseMark(raw: string | undefined, context: string): number {
	if (!raw || raw.trim() === '') return 0;
	const n = Number(raw.replace(',', '.'));
	if (!Number.isFinite(n)) {
		throw new Error(`Invalid mark "${raw}" in ${context}`);
	}
	return n;
}

function sumTableCellMarks(cells: (string | TableCell)[], context: string): number {
	let sum = 0;
	for (const cell of cells) {
		if (cell && typeof cell === 'object' && cell.mark) {
			sum += parseMark(cell.mark, context);
		}
	}
	return sum;
}

function sumBlockMarks(blocks: ContentBlock[], context: string): number {
	let total = 0;
	for (const b of blocks) {
		if (b.type === 'text' || b.type === 'typst_raw') {
			total += parseMark(b.mark, context);
		} else if (b.type === 'table') {
			total += sumTableCellMarks(b.cells, context);
			if (b.rows) {
				for (const row of b.rows) {
					total += sumTableCellMarks(row, context);
				}
			}
		} else if (b.type === 'true_false') {
			for (const it of b.items) total += parseMark(it.mark, context);
		} else if (b.type === 'multiple_choice') {
			for (const g of b.groups) total += parseMark(g.mark, context);
		} else if (b.type === 'columns') {
			total += sumBlockMarks(b.children, context);
		}
	}
	return Math.round(total * 1000) / 1000;
}

function assertCleanTypstString(value: string | undefined, label: string): void {
	if (!value) return;
	const forbidden: Array<[RegExp, string]> = [
		[/\*/, 'raw asterisk *'],
		[/\$/, 'raw dollar $'],
		[/[<>]/, 'raw angle bracket < or >'],
		[/(?<!:)\/\//, 'raw double slash //'],
		[/[✓✕✗]/u, 'forbidden unicode checkmark/cross']
	];
	for (const [re, desc] of forbidden) {
		if (re.test(value)) {
			throw new Error(`Forbidden Typst sequence (${desc}) in ${label}: ${value.slice(0, 120)}`);
		}
	}
}

function validatePaperSpec(spec: OfficialIslamicBacPaperSpec): void {
	if (
		spec.coefficient !== 2 ||
		spec.duration !== '02 ساعة و30 دقيقة' ||
		spec.templateId !== 'secondary/bac_official' ||
		spec.examDoc.metadata.subjectId !== 'ISL-ALL' ||
		spec.examDoc.metadata.font !== 'Arabic Transparent'
	) {
		throw new Error(`Invalid metadata contract on ${spec.slug}`);
	}

	const serialized = JSON.stringify(spec);
	for (const rule of ISLAMIC_FULL_BLOCKLIST) {
		if (rule.pattern.test(serialized)) {
			throw new Error(`DOCTRINAL/HADITH VIOLATION on ${spec.slug}: ${rule.reason}`);
		}
	}

	const exList = spec.examDoc.exercises;
	const expectedPts = [12, 8];
	if (
		exList.length !== 2 ||
		Number(exList[0].points) !== expectedPts[0] ||
		Number(exList[1].points) !== expectedPts[1]
	) {
		throw new Error(
			`${spec.slug}: expected 2 exercises with points [12, 8], got [${exList.map((e) => e.points).join(', ')}]`
		);
	}

	let paperTotal = 0;
	for (const ex of exList) {
		const exPts = Number(ex.points);
		const ctx = `${spec.slug} (${ex.id ?? ex.customTitle ?? ex.num})`;
		const blockSum = sumBlockMarks(ex.content, ctx);
		if (Math.abs(blockSum - exPts) > 1e-6) {
			throw new Error(`${ctx}: block marks sum (${blockSum}) != exercise points (${exPts})`);
		}
		paperTotal += blockSum;

		assertCleanTypstString(ex.customTitle, `${ctx}.customTitle`);
		assertCleanTypstString(ex.instruction, `${ctx}.instruction`);
		for (const b of ex.content) {
			if (b.type === 'text') {
				assertCleanTypstString(b.content, `${ctx}.text.content`);
				assertCleanTypstString(b.answer, `${ctx}.text.answer`);
			} else if (b.type === 'table') {
				for (const row of b.rows ?? []) {
					for (const cell of row) {
						if (typeof cell === 'string') {
							assertCleanTypstString(cell, `${ctx}.table.cell`);
						} else {
							assertCleanTypstString(cell.content, `${ctx}.table.cell.content`);
							assertCleanTypstString(cell.answer, `${ctx}.table.cell.answer`);
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
	templateId: string;
	isSolution: boolean;
}): Promise<Buffer> {
	const typstRoot = join(opts.wsRoot, 'src/lib/modules/SujetBuilder/typst');
	const outDir = join(opts.wsRoot, 'out');
	const runId = randomUUID();
	const relDataFile = `.bac-isl-${runId}.json`;
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
	const records = ALL_OFFICIAL_BAC_ISLAMIC_PAPERS;
	if (records.length !== 6) {
		throw new Error(`Expected 6 official Islamic BAC papers (2023-2025, 2 topics/yr), got ${records.length}`);
	}

	const ram = await syncRamWorkspace(true);
	const wsRoot = join(ram.root, 'workspace');
	const fontsDir = join(ram.root, 'fonts');

	const items: OfficialBacIslamicManifestItem[] = [];

	await Promise.all(
		records.map(async (rec) => {
			validatePaperSpec(rec);

			const styledDoc = sanitizeTypstDocument({
				...(rec.examDoc as unknown as Record<string, any>),
				style: resolveEffectivePrintStyle({
					language: 'ar',
					levelId: 'secondaire',
					yearId: '3as',
					subjectId: 'ISL-ALL',
					docType: 'exam'
				})
			});

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

			const pdfUrl = `/generated/official-bac-islamic/${rec.slug}.pdf`;
			const solutionUrl = `/generated/official-bac-islamic/${rec.slug}-sol.pdf`;

			await Promise.all([
				putMediaObject(pdfUrl, subBuf, 'application/pdf'),
				putMediaObject(solutionUrl, solBuf, 'application/pdf')
			]);

			items.push({
				slug: rec.slug,
				academicYear: rec.academicYear,
				topicNumber: rec.topicNumber,
				sessionAr: rec.sessionAr,
				coefficient: rec.coefficient,
				duration: rec.duration,
				titleAr: rec.titleAr,
				themesAr: rec.themesAr,
				pdfUrl,
				solutionUrl,
				fileSize: subBuf.length,
				solutionFileSize: solBuf.length
			});
			console.log(`Compiled & synced ${rec.slug} (subject=${subBuf.length}B, solution=${solBuf.length}B)`);
		})
	);

	items.sort((a, b) => a.slug.localeCompare(b.slug));

	const manifestPath = resolve('pipeline/official_bac_islamic/official_bac_islamic_manifest.json');
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

	console.log(
		JSON.stringify({ total_papers: items.length, total_pdfs: items.length * 2, manifestPath })
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
