import type { ContentBlock } from '../SujetBuilder/types';

export type ChemState = 'aq' | 's' | 'l' | 'g';

export interface DualText {
	katex: string;
	typst: string;
}

/**
 * Converts a compact chemical formula string (e.g. "MnO4-", "Cr2O7^2-", "H3O+", "Fe2O3", "CH3COOH")
 * into clean KaTeX (`\ce{...}`) and Typst (`"MnO"_4^-` with upright elements).
 */
export function typstChemFormula(formula: string): string {
	let s = formula.trim();
	// Handle explicit ionic charge after '^' (e.g. "Cr2O7^2-", "Mn^2+") or single trailing +/- (e.g. "MnO4-", "H3O+")
	let charge = '';
	const explicitCharge = s.match(/\^([0-9]*[+-])$/);
	if (explicitCharge) {
		charge = explicitCharge[1];
		s = s.slice(0, explicitCharge.index);
	} else if (/[+-]$/.test(s)) {
		charge = s.slice(-1);
		s = s.slice(0, -1);
	}

	// Quote runs of element letters / dashes while converting numbers to subscripts
	let out = '';
	let i = 0;
	while (i < s.length) {
		const ch = s[i];
		if (/[A-Za-z-]/.test(ch)) {
			let run = '';
			while (i < s.length && /[A-Za-z-]/.test(s[i])) {
				run += s[i];
				i++;
			}
			out += `"${run}"`;
		} else if (/[0-9]/.test(ch)) {
			let num = '';
			while (i < s.length && /[0-9]/.test(s[i])) {
				num += s[i];
				i++;
			}
			// Parenthesis or element followed by stoichiometric count -> subscript
			if (out.length > 0 && !out.endsWith('(')) {
				out += `_${num}`;
			} else {
				out += num;
			}
		} else {
			out += ch;
			i++;
		}
	}

	if (charge) {
		const typstCharge = charge.length > 1 ? `^(${charge})` : `^${charge}`;
		out += typstCharge;
	}
	return out;
}

/**
 * Produces dual KaTeX and Typst inline representations for a chemical species with optional physical state.
 */
export function chemSpecies(formula: string, state?: ChemState): DualText {
	const katexState = state ? `(${state})` : '';
	const katex = `$\\ce{${formula}${katexState}}$`;
	const typstBase = typstChemFormula(formula);
	const typst = state ? `$${typstBase} ("${state}")$` : `$${typstBase}$`;
	return { katex, typst };
}

/**
 * Produces dual KaTeX and Typst math-inner representations (without outer `$...$`) for a nuclide ^{A}_{Z}X.
 */
export function nuclideInner(A: number | string, Z: number | string, symbol: string): DualText {
	return {
		katex: `{}^{${A}}_{${Z}}\\mathrm{${symbol}}`,
		typst: `""_${Z}^${A} "${symbol}"`
	};
}

export function nuclide(A: number | string, Z: number | string, symbol: string): DualText {
	const inner = nuclideInner(A, Z, symbol);
	return {
		katex: `$${inner.katex}$`,
		typst: `$${inner.typst}$`
	};
}

export interface ChemTerm {
	coeff?: number | string;
	formula: string;
	state?: ChemState;
}

/**
 * Builds a complete chemical reaction equation in both KaTeX (`\ce{...}`) and Typst (`arrow.r` or `harpoons.rtlb`).
 */
export function chemEquation(
	lhs: ChemTerm[],
	rhs: ChemTerm[],
	opts?: { reversible?: boolean; display?: boolean }
): DualText {
	const formatKatexTerm = (t: ChemTerm) =>
		`${t.coeff && Number(t.coeff) !== 1 ? `${t.coeff}` : ''}${t.formula}${t.state ? `(${t.state})` : ''}`;
	const formatTypstTerm = (t: ChemTerm) =>
		`${t.coeff && Number(t.coeff) !== 1 ? `${t.coeff} ` : ''}${typstChemFormula(t.formula)}${t.state ? ` ("${t.state}")` : ''}`;

	const katexArrow = opts?.reversible ? '<=>' : '->';
	const typstArrow = opts?.reversible ? 'harpoons.rtlb' : 'arrow.r';
	const katexBody = `\\ce{${lhs.map(formatKatexTerm).join(' + ')} ${katexArrow} ${rhs.map(formatTypstTermCompat(formatKatexTerm)).join(' + ')}}`;
	const typstBody = `${lhs.map(formatTypstTerm).join(' + ')} ${typstArrow} ${rhs.map(formatTypstTerm).join(' + ')}`;

	if (opts?.display) {
		return {
			katex: `$$\n${katexBody}\n$$`,
			typst: `$ ${typstBody} $`
		};
	}
	return {
		katex: `$${katexBody}$`,
		typst: `$${typstBody}$`
	};
}

function formatTypstTermCompat<T>(fn: (t: T) => string): (t: T) => string {
	return fn;
}

/**
 * Builds a nuclear reaction equation in both KaTeX and Typst.
 */
export function nuclearEquation(
	lhs: Array<{ coeff?: number; A: number | string; Z: number | string; symbol: string }>,
	rhs: Array<{ coeff?: number; A: number | string; Z: number | string; symbol: string }>,
	opts?: { display?: boolean; extraTypst?: string; extraKatex?: string }
): DualText {
	const fmtK = (t: { coeff?: number; A: number | string; Z: number | string; symbol: string }) =>
		`${t.coeff && t.coeff !== 1 ? t.coeff : ''}${nuclideInner(t.A, t.Z, t.symbol).katex}`;
	const fmtT = (t: { coeff?: number; A: number | string; Z: number | string; symbol: string }) =>
		`${t.coeff && t.coeff !== 1 ? `${t.coeff} ` : ''}${nuclideInner(t.A, t.Z, t.symbol).typst}`;

	const kBody = `${lhs.map(fmtK).join(' + ')} \\rightarrow ${rhs.map(fmtK).join(' + ')}${opts?.extraKatex ? ` ${opts.extraKatex}` : ''}`;
	const tBody = `${lhs.map(fmtT).join(' + ')} arrow.r ${rhs.map(fmtT).join(' + ')}${opts?.extraTypst ? ` ${opts.extraTypst}` : ''}`;

	if (opts?.display) {
		return { katex: `$$\n${kBody}\n$$`, typst: `$ ${tBody} $` };
	}
	return { katex: `$${kBody}$`, typst: `$${tBody}$` };
}

export interface IceTableSpec {
	equation: DualText;
	speciesHeaders: DualText[];
	initial: DualText[];
	intermediate: DualText[];
	final: DualText[];
	finalAnswers?: DualText[];
}

/**
 * Builds a Tableau d'Avancement (جدول تقدم التفاعل) for BOTH Typst (`ContentBlock` table) and Browser Markdown/KaTeX.
 */
export function buildIceTable(spec: IceTableSpec): {
	typstBlock: ContentBlock;
	markdownTable: string;
} {
	const headers = ['الحالة', 'التقدم', ...spec.speciesHeaders.map((s) => s.typst)];
	const rows = [
		['ابتدائية', '$0$', ...spec.initial.map((c) => c.typst)],
		['انتقالية', '$x$', ...spec.intermediate.map((c) => c.typst)],
		spec.finalAnswers
			? [
					'نهائية',
					'$x_f$',
					...spec.final.map((c, idx) => ({
						content: c.typst,
						answer: spec.finalAnswers![idx]?.typst ?? c.typst
					}))
				]
			: ['نهائية', '$x_f$', ...spec.final.map((c) => c.typst)]
	];

	const typstBlock: ContentBlock = {
		type: 'table',
		headers,
		rows,
		headerBackground: true,
		borders: 'grid',
		width: 'full'
	} as unknown as ContentBlock;

	const mdHeader = `| الحالة | التقدم | ${spec.speciesHeaders.map((s) => s.katex).join(' | ')} |`;
	const mdSep = `| :--- | :---: | ${spec.speciesHeaders.map(() => ':---:').join(' | ')} |`;
	const mdR1 = `| ابتدائية | $0$ | ${spec.initial.map((c) => c.katex).join(' | ')} |`;
	const mdR2 = `| انتقالية | $x$ | ${spec.intermediate.map((c) => c.katex).join(' | ')} |`;
	const mdR3 = `| نهائية | $x_f$ | ${spec.final.map((c) => c.katex).join(' | ')} |`;

	return {
		typstBlock,
		markdownTable: [mdHeader, mdSep, mdR1, mdR2, mdR3].join('\n')
	};
}
