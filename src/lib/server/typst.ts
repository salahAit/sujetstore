import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { mkdir, readFile, rm, writeFile } from 'fs/promises';
import { join, resolve } from 'path';
import { randomUUID } from 'crypto';

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
		.replace(/\\(alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|pi|rho|sigma|tau|phi|chi|psi|omega|Delta|Gamma|Lambda|Phi|Psi|Omega)\b/g, '$1');

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

/** Sanitize inline `$...$` delimiters inside Arabic text blocks for Typst. */
export function sanitizeForTypst(text: string): string {
	if (!text || typeof text !== 'string') return text;
	return text.replace(/\$([^$]+)\$/g, (_match, inner) => `$${sanitizeMathInner(inner)}$`);
}

function sanitizeImagePath(src: unknown): unknown {
	if (typeof src !== 'string') return src;
	if (src.startsWith('/static/') || src.startsWith('/data/')) {
		return src;
	}
	if (src.startsWith('/uploads/')) {
		const dataCandidate = join(PROJECT_ROOT, 'data', src.slice(1));
		if (existsSync(dataCandidate)) return `/data/${src.slice(1)}`;
		return `/static/${src.slice(1)}`;
	}
	if (src.startsWith('/')) {
		const staticCandidate = join(PROJECT_ROOT, 'static', src.slice(1));
		if (existsSync(staticCandidate)) return `/static/${src.slice(1)}`;
	}
	return src;
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
		if (block.src) block.src = sanitizeImagePath(block.src);
		if (typeof block.caption === 'string') block.caption = sanitizeForTypst(block.caption);
	}
	if (block.type === 'image_grid' && Array.isArray(block.items)) {
		for (const it of block.items) {
			if (it?.src) it.src = sanitizeImagePath(it.src);
		}
	}
	if (block.type === 'columns' && Array.isArray(block.children)) {
		for (const child of block.children) {
			sanitizeBlock(child);
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
	const processedDoc = sanitizeTypstDocument(examDoc);

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
