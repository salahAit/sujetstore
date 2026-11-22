import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { mkdir, readFile, rm, writeFile } from 'fs/promises';
import { join, resolve } from 'path';
import { randomUUID } from 'crypto';
import { resolveEffectivePrintStyle } from './print-style';

const PROJECT_ROOT = resolve('.');
const TYPST_ROOT = join(PROJECT_ROOT, 'src/lib/modules/SujetBuilder/typst');
const FONT_PATH = join(PROJECT_ROOT, 'static', 'fonts');

const TYPST_MATH_WORDS = new Set([
	'sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'arcsin', 'arccos', 'arctan', 'sinh', 'cosh', 'tanh',
	'log', 'ln', 'exp', 'lim', 'liminf', 'limsup', 'max', 'min', 'inf', 'sup', 'det', 'dim', 'ker',
	'hom', 'mod', 'gcd', 'lcm', 'arg', 'deg',
	'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda',
	'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega',
	'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda',
	'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega',
	'cal', 'bb', 'frak', 'bold', 'italic', 'serif', 'sans', 'mono', 'text', 'op', 'upright', 'math',
	'sqrt', 'root', 'abs', 'norm', 'floor', 'ceil', 'round', 'vec', 'hat', 'bar', 'tilde', 'dot', 'ddot',
	'rightarrow', 'leftarrow', 'leftrightarrow', 'Rightarrow', 'Leftarrow', 'Leftrightarrow', 'times',
	'div', 'approx', 'neq', 'leq', 'geq', 'in', 'notin', 'subset', 'supset', 'cup', 'cap', 'emptyset',
	'infty', 'infinity', 'oo', 'nabla', 'partial', 'sum', 'prod', 'int', 'integral', 'oint', 'frac',
	'binom', 'cases', 'mat', 'cancel', 'lr', 'overbrace', 'underbrace', 'dif', 'equiv', 'Re', 'Im',
	'PGCD', 'PPCM', 'pgcd', 'ppcm', 'Card', 'card', 'conj', 'arrow', 'plus', 'minus', 'double',
	'mapsto', 'to', 'implies', 'iff', 'forall', 'exists', 'over',
	'not', 'eq', 'sect', 'union', 'inter', 'parallel', 'perp', 'degree', 'vect',
	'harpoons', 'rtlb', 'ltbr', 'overline', 'underline', 'attach', 'limits', 'accent',
	'underbracket', 'overbracket', 'hbar', 'ell', 'prop', 'star', 'dots', 'quad', 'wide'
]);

/** Sanitize math tokens inside Typst `$ ... $` expressions while preserving quoted chemical/unit literals. */
export function sanitizeMathInner(inner: string): string {
	if (!inner) return inner;
	let normalized = inner
		.replace(/\\(?:text|mathrm|textbf|operatorname)\{([^}]+)\}/g, '"$1"')
		.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, 'frac($1, $2)')
		.replace(/\\sqrt\{([^}]+)\}/g, 'sqrt($1)')
		.replace(/\\times\b/g, 'times')
		.replace(/\\cdot\b/g, 'dot')
		.replace(/\\div\b/g, 'div')
		.replace(/\\approx\b/g, 'approx')
		.replace(/\\mathbb\{([RNZCQ])\}/g, 'bb($1)')
		.replace(/\\mathcal\{([A-Z])\}/g, 'cal($1)')
		.replace(/\\infty\b/g, 'infinity')
		.replace(/\\equiv\b/g, 'equiv')
		.replace(/\\neq\b/g, '!=')
		.replace(/\\leq\b/g, '<=')
		.replace(/\\geq\b/g, '>=')
		.replace(/\\pm\b/g, 'plus.minus')
		.replace(/\\mp\b/g, 'minus.plus')
		.replace(/\\mapsto\b/g, 'arrow.r.bar')
		.replace(/\\implies\b/g, 'arrow.r.double')
		.replace(/\\iff\b/g, 'arrow.l.r.double')
		.replace(/\\rightleftharpoons\b/g, 'harpoons.rtlb')
		.replace(/\\to\b/g, 'arrow.r')
		.replace(/\\int\b/g, 'integral')
		.replace(/\\det\b/g, 'det')
		.replace(/\\vec\{([^}]+)\}/g, 'arrow($1)')
		.replace(/\\overline\{([^}]+)\}/g, 'overline($1)')
		.replace(/\\(alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|pi|rho|sigma|tau|phi|chi|psi|omega|Delta|Gamma|Lambda|Phi|Psi|Omega)\b/g, '$1')
		.replace(/\/\//g, ' "//" ');

	// Temporarily mask already-quoted literals ("Fe", "aq", "mol", etc.) so they are never split
	const quotedLiterals: string[] = [];
	let masked = normalized.replace(/"[^"]*"/g, (m) => {
		const idx = quotedLiterals.push(m) - 1;
		return `__Q${idx}__`;
	});

	masked = masked.replace(/[a-zA-Z]{2,}/g, (word: string) => {
		if (/^__Q\d+__$/.test(word) || TYPST_MATH_WORDS.has(word)) return word;
		return word.split('').join(' ');
	});
	masked = masked.replace(/[\u0600-\u06FF]{2,}/g, (word: string) => `"${word}"`);
	masked = masked.replace(/(\d)([a-zA-Z\u0600-\u06FF])/g, '$1 $2');

	return masked.replace(/__Q(\d+)__/g, (_m, idx) => quotedLiterals[Number(idx)] ?? '');
}

/** Sanitize prose + inline `$...$` delimiters inside Arabic text blocks for Typst. */
export function sanitizeForTypst(text: string): string {
	if (!text || typeof text !== 'string') return text;
	const parts = text.split(/(\$[^$]+\$)/g);
	return parts
		.map((part) => {
			if (part.startsWith('$') && part.endsWith('$') && part.length >= 2) {
				return `$${sanitizeMathInner(part.slice(1, -1))}$`;
			}
			// Prose segment outside math:
			// 1. Escape `//` (e.g. genetic allele notation `P//P`, `HbA//HbS`) so Typst never treats it as a comment
			// 2. Convert Markdown `**bold**` and Arabic-prefixed `*bold*` (like `و*الأوردة*`) into `#strong[...]`
			//    so Typst never fails with `unclosed delimiter` on word-attached asterisks.
			let out = part
				.replace(/ﷺ/g, 'صلى الله عليه وسلم')
				.replace(/(?<!:)\/\//g, '\\/\\/');
			out = out.replace(/\*\*([^\s*\n](?:[^*\n]*?[^\s*\n])?)\*\*/g, '#strong[$1]');
			out = out.replace(/(?<!\\)\*([^\s*\n](?:[^*\n]*?[^\s*\n])?)\*/g, '#strong[$1]');
			return out;
		})
		.join('');
}

function sanitizeImagePath(src: unknown): unknown {
	if (typeof src !== 'string') return src;
	const cleanSrc = src.includes('#') ? src.slice(0, src.indexOf('#')) : src;
	if (cleanSrc.startsWith('/static/') || cleanSrc.startsWith('/data/')) {
		return cleanSrc;
	}
	if (cleanSrc.startsWith('/uploads/')) {
		const dataCandidate = join(PROJECT_ROOT, 'data', cleanSrc.slice(1));
		if (existsSync(dataCandidate)) return `/data/${cleanSrc.slice(1)}`;
		return `/static/${cleanSrc.slice(1)}`;
	}
	if (cleanSrc.startsWith('/')) {
		const staticCandidate = join(PROJECT_ROOT, 'static', cleanSrc.slice(1));
		if (existsSync(staticCandidate)) return `/static/${cleanSrc.slice(1)}`;
		const mediaCandidate = join(PROJECT_ROOT, 'data/media', cleanSrc.slice(1));
		if (existsSync(mediaCandidate)) return `/data/media/${cleanSrc.slice(1)}`;
	}
	return cleanSrc;
}

function sanitizeBlock(block: any) {
	if (!block || typeof block !== 'object') return;
	if (block.type === 'math' && typeof block.content === 'string') {
		block.content = sanitizeMathInner(block.content);
	} else {
		if (typeof block.content === 'string') block.content = sanitizeForTypst(block.content);
		if (typeof block.answer === 'string') block.answer = sanitizeForTypst(block.answer);
	}
	if (block.type === 'image') {
		if (typeof block.src === 'string' && block.src.includes('#fig=')) {
			const hashIdx = block.src.indexOf('#fig=');
			const baseSrc = block.src.slice(0, hashIdx);
			const rawMeta = block.src.slice(hashIdx + 5);
			try {
				const parsed = JSON.parse(decodeURIComponent(rawMeta)) as {
					title?: string;
					pins?: Array<{ num: string | number; xPct: number; yPct: number; color?: string }>;
					legend?: Array<{ num: string | number; label: string }>;
				};
				block.type = 'illustrated_figure';
				block.src = sanitizeImagePath(baseSrc);
				block.title = parsed.title ? sanitizeForTypst(parsed.title) : undefined;
				block.width = block.width || '66%';
				block.maxHeight = block.maxHeight || 132;
				block.pins = Array.isArray(parsed.pins) ? parsed.pins : [];
				block.legend = Array.isArray(parsed.legend)
					? parsed.legend.map((it) => ({
							num: it.num,
							label: sanitizeForTypst(String(it.label ?? ''))
						}))
					: [];
				if (typeof block.caption === 'string') {
					block.caption = sanitizeForTypst(block.caption);
				}
				return;
			} catch {
				block.src = sanitizeImagePath(baseSrc);
			}
		} else if (block.src) {
			block.src = sanitizeImagePath(block.src);
		}
		if (typeof block.caption === 'string') block.caption = sanitizeForTypst(block.caption);
	}
	if (block.type === 'illustrated_figure') {
		if (block.src) block.src = sanitizeImagePath(block.src);
		if (typeof block.title === 'string') block.title = sanitizeForTypst(block.title);
		if (typeof block.caption === 'string') block.caption = sanitizeForTypst(block.caption);
		if (Array.isArray(block.legend)) {
			for (const it of block.legend) {
				if (it && typeof it.label === 'string') {
					it.label = sanitizeForTypst(it.label);
				}
			}
		}
	}
	if (block.type === 'image_grid' && Array.isArray(block.items)) {
		for (const it of block.items) {
			if (it?.src) it.src = sanitizeImagePath(it.src);
			if (typeof it?.label === 'string') it.label = sanitizeForTypst(it.label);
			if (typeof it?.answer === 'string') it.answer = sanitizeForTypst(it.answer);
		}
	}
	if (block.type === 'columns' && Array.isArray(block.children)) {
		for (const child of block.children) {
			sanitizeBlock(child);
		}
	}
	if (block.type === 'true_false' && Array.isArray(block.items)) {
		for (const item of block.items) {
			if (typeof item?.q === 'string') item.q = sanitizeForTypst(item.q);
			if (typeof item?.a === 'string') item.a = sanitizeForTypst(item.a);
			if (typeof item?.c === 'string') item.c = sanitizeForTypst(item.c);
		}
	}
	if (block.type === 'table') {
		const sanitizeCell = (c: any) => {
			if (typeof c === 'string') return sanitizeForTypst(c);
			if (c && typeof c === 'object') {
				if (typeof c.content === 'string') c.content = sanitizeForTypst(c.content);
				if (typeof c.answer === 'string') c.answer = sanitizeForTypst(c.answer);
			}
			return c;
		};
		if (Array.isArray(block.headers)) block.headers = block.headers.map(sanitizeCell);
		if (Array.isArray(block.cells)) block.cells = block.cells.map(sanitizeCell);
		if (Array.isArray(block.rows)) {
			block.rows = block.rows.map((r: any) => (Array.isArray(r) ? r.map(sanitizeCell) : r));
		}
	}
}

/** Deep-clone and prepare a SujetBuilder document payload for Typst compilation. */
export function sanitizeTypstDocument<T extends Record<string, any>>(examDoc: T): T {
	const processed = JSON.parse(JSON.stringify(examDoc)) as T;
	if (Array.isArray(processed.exercises)) {
		for (const ex of processed.exercises) {
			if (typeof ex.instruction === 'string') {
				ex.instruction = sanitizeForTypst(ex.instruction);
			}
			const blocks = ex.blocks || ex.content || [];
			for (const block of blocks) {
				sanitizeBlock(block);
			}
		}
	}
	return processed;
}

/**
 * Compile a SujetBuilder document JSON to PDF (subject and optionally solution) using Typst CLI.
 */
export async function compileTypstPdf(options: {
	examDoc: Record<string, any>;
	outputPath: string;
	templateId?: string;
	isSolution?: boolean;
}): Promise<{ success: boolean; size?: number; error?: string }> {
	const { examDoc, outputPath, templateId = 'middle/exam', isSolution = false } = options;
	const payloadWithStyle = examDoc?.style
		? examDoc
		: {
				...examDoc,
				style: resolveEffectivePrintStyle({
					language: templateId.startsWith('french/')
						? 'fr'
						: templateId.startsWith('english/')
							? 'en'
							: templateId.startsWith('spanish/')
								? 'es'
								: templateId.startsWith('german/')
									? 'de'
									: templateId.startsWith('italian/')
										? 'it'
										: 'ar',
					levelId: examDoc?.metadata?.levelId,
					yearId: examDoc?.metadata?.yearId,
					subjectId: examDoc?.metadata?.subjectId,
					docType: examDoc?.metadata?.docType
				})
			};
	const processedDoc = sanitizeTypstDocument(payloadWithStyle);

	await mkdir(join(outputPath, '..'), { recursive: true });
	const tempDataFile = join(TYPST_ROOT, `.tmp-${randomUUID()}.json`);
	await writeFile(tempDataFile, JSON.stringify(processedDoc), 'utf-8');
	const relDataFile = tempDataFile.slice(TYPST_ROOT.length + 1);

	try {
		const compileResult = await new Promise<{ success: boolean; error?: string }>((resolvePromise) => {
			const args = [
				'compile',
				'main.typ',
				outputPath,
				'--root',
				PROJECT_ROOT,
				'--font-path',
				FONT_PATH,
				'--input',
				`template-id=${templateId}`,
				'--input',
				`data-file=${relDataFile}`,
				'--input',
				`is-solution=${isSolution}`
			];
			const proc = spawn('typst', args, {
				cwd: TYPST_ROOT,
				timeout: 20000,
				stdio: ['ignore', 'pipe', 'pipe']
			});
			let stderr = '';
			proc.stderr.on('data', (d) => {
				stderr += d.toString();
			});
			proc.on('close', (code) => {
				resolvePromise(
					code === 0
						? { success: true }
						: { success: false, error: stderr || `Typst exited with code ${code}` }
				);
			});
			proc.on('error', (err) => {
				resolvePromise({ success: false, error: `Failed to spawn typst: ${err.message}` });
			});
		});

		if (!compileResult.success) return compileResult;
		const buf = await readFile(outputPath);
		return { success: true, size: buf.length };
	} finally {
		await rm(tempDataFile, { force: true }).catch(() => {});
	}
}
