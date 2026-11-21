// ============================================================================
// Deterministic Typst Math DSL -> KaTeX LaTeX Transpiler for SmartExamReader
// Uses recursive balanced-parenthesis parsing (NOT fragile regexes) so nested
// `frac(frac(1, 2), x + 1)`, `sqrt(...)`, `cases(...)`, `mat(...)`, `vec(...)`,
// `upright("...")`, and `_(...)` / `^(...)` convert with 100% mathematical fidelity.
// ============================================================================

const GREEK_WORDS = [
	'varepsilon', 'vartheta', 'varpi', 'varrho', 'varsigma', 'varphi',
	'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta',
	'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'pi', 'rho', 'sigma',
	'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega',
	'Gamma', 'Delta', 'Theta', 'Lambda', 'Xi', 'Pi', 'Sigma', 'Upsilon', 'Phi', 'Psi', 'Omega'
] as const;

const STANDARD_OPS = [
	'arcsin', 'arccos', 'arctan', 'sinh', 'cosh', 'tanh',
	'sin', 'cos', 'tan', 'cot', 'sec', 'csc',
	'liminf', 'limsup', 'lim', 'ln', 'log', 'exp',
	'max', 'min', 'sup', 'inf', 'det', 'dim', 'ker', 'gcd', 'lcm', 'arg', 'deg', 'mod'
] as const;

const DOTTED_AND_SYMBOL_MAP: Array<[RegExp, string]> = [
	[/(?<!\\)\barrow\.l\.r\.double\b/g, '\\Longleftrightarrow '],
	[/(?<!\\)\barrow\.r\.double\b/g, '\\Longrightarrow '],
	[/(?<!\\)\barrow\.l\.double\b/g, '\\Longleftarrow '],
	[/(?<!\\)\barrow\.l\.r\b/g, '\\longleftrightarrow '],
	[/(?<!\\)\barrow\.r\.bar\b/g, '\\mapsto '],
	[/(?<!\\)\barrow\.r\b/g, '\\longrightarrow '],
	[/(?<!\\)\barrow\.l\b/g, '\\longleftarrow '],
	[/(?<!\\)\barrow\.t\b/g, '\\uparrow '],
	[/(?<!\\)\barrow\.b\b/g, '\\downarrow '],
	[/(?<!\\)\bharpoons\.rtlb\b/g, '\\rightleftharpoons '],
	[/(?<!\\)\bharpoons\.ltbr\b/g, '\\leftrightharpoons '],
	[/(?<!\\)\bplus\.minus\b/g, '\\pm '],
	[/(?<!\\)\bminus\.plus\b/g, '\\mp '],
	[/(?<!\\)\bdots\.h\.c\b/g, '\\cdots '],
	[/(?<!\\)\bdots\.c\b/g, '\\cdots '],
	[/(?<!\\)\bdots\.v\b/g, '\\vdots '],
	[/(?<!\\)\bdots\b/g, '\\dots '],
	[/(?<!\\)\beq\.triple\b/g, '\\equiv '],
	[/(?<!\\)\beq\.not\b/g, '\\neq '],
	[/(?<!\\)\blt\.eq\b/g, '\\leq '],
	[/(?<!\\)\bgt\.eq\b/g, '\\geq '],
	[/(?<!\\)\bin\.not\b/g, '\\notin '],
	[/(?<!\\)\bsubset\.eq\b/g, '\\subseteq '],
	[/(?<!\\)\bsupset\.eq\b/g, '\\supseteq '],
	[/<==>/g, '\\Longleftrightarrow '],
	[/<=>/g, '\\Longleftrightarrow '],
	[/==>/g, '\\Longrightarrow '],
	[/=>/g, '\\Longrightarrow '],
	[/\|->/g, '\\mapsto '],
	[/<->/g, '\\leftrightarrow '],
	[/->/g, '\\to '],
	[/<-/g, '\\leftarrow '],
	[/!=/g, '\\neq '],
	[/<=/g, '\\leq '],
	[/>=/g, '\\geq '],
	[/(?<!\\)\binfinity\b/g, '\\infty '],
	[/(?<!\\)\binfty\b/g, '\\infty '],
	[/(?<!\\)\boo\b/g, '\\infty '],
	[/(?<!\\)\btimes\b/g, '\\times '],
	[/(?<!\\)\bdot\b(?!\s*\()/g, '\\cdot '],
	[/(?<!\\)\bdiv\b/g, '\\div '],
	[/(?<!\\)\bpm\b/g, '\\pm '],
	[/(?<!\\)\bapprox\b/g, '\\approx '],
	[/(?<!\\)\bequiv\b/g, '\\equiv '],
	[/(?<!\\)\bprop\b/g, '\\propto '],
	[/(?<!\\)\bleq\b/g, '\\leq '],
	[/(?<!\\)\bgeq\b/g, '\\geq '],
	[/(?<!\\)\bneq\b/g, '\\neq '],
	[/(?<!\\)\bnotin\b/g, '\\notin '],
	[/(?<!\\)\bin\b/g, '\\in '],
	[/(?<!\\)\bsubset\b/g, '\\subset '],
	[/(?<!\\)\bsupset\b/g, '\\supset '],
	[/(?<!\\)\b(?:cup|union)\b/g, '\\cup '],
	[/(?<!\\)\b(?:cap|sect|inter)\b/g, '\\cap '],
	[/(?<!\\)\bemptyset\b/g, '\\varnothing '],
	[/(?<!\\)\bforall\b/g, '\\forall '],
	[/(?<!\\)\bexists\b/g, '\\exists '],
	[/(?<!\\)\bparallel\b/g, '\\parallel '],
	[/(?<!\\)\bperp\b/g, '\\perp '],
	[/(?<!\\)\bdegree\b/g, '^\\circ '],
	[/(?<!\\)\bcircle\b/g, '\\circ '],
	[/(?<!\\)\bpartial\b/g, '\\partial '],
	[/(?<!\\)\bnabla\b/g, '\\nabla '],
	[/(?<!\\)\bdif\b/g, '\\mathrm{d}'],
	[/(?<!\\)\b(?:integral|int)\b/g, '\\int '],
	[/(?<!\\)\boint\b/g, '\\oint '],
	[/(?<!\\)\bsum\b/g, '\\sum '],
	[/(?<!\\)\bprod\b/g, '\\prod '],
	[/(?<!\\)\bwide\b/g, '\\qquad '],
	[/(?<!\\)\bquad\b/g, '\\quad '],
	[/(?<!\\)\bhbar\b/g, '\\hbar '],
	[/(?<!\\)\bell\b/g, '\\ell '],
	[/(?<!\\)\bstar\b/g, '\\star '],
	[/(?<!\\)\b(?:PGCD|pgcd)\b/g, '\\operatorname{PGCD}'],
	[/(?<!\\)\b(?:PPCM|ppcm)\b/g, '\\operatorname{PPCM}'],
	[/(?<!\\)\b(?:Card|card)\b/g, '\\operatorname{Card}']
];

function findMatchingParen(s: string, openIdx: number): number {
	let depth = 0;
	for (let i = openIdx; i < s.length; i++) {
		const ch = s[i];
		if (ch === '\\') {
			i++;
			continue;
		}
		if (ch === '(') depth++;
		else if (ch === ')') {
			depth--;
			if (depth === 0) return i;
		}
	}
	return -1;
}

function splitTopLevel(s: string, sep: ',' | ';'): string[] {
	const parts: string[] = [];
	let depthParen = 0;
	let depthBrace = 0;
	let depthBracket = 0;
	let start = 0;
	for (let i = 0; i < s.length; i++) {
		const ch = s[i];
		if (ch === '\\') {
			i++;
			continue;
		}
		if (ch === '(') depthParen++;
		else if (ch === ')') depthParen = Math.max(0, depthParen - 1);
		else if (ch === '{') depthBrace++;
		else if (ch === '}') depthBrace = Math.max(0, depthBrace - 1);
		else if (ch === '[') depthBracket++;
		else if (ch === ']') depthBracket = Math.max(0, depthBracket - 1);
		else if (ch === sep && depthParen === 0 && depthBrace === 0 && depthBracket === 0) {
			parts.push(s.slice(start, i));
			start = i + 1;
		}
	}
	parts.push(s.slice(start));
	return parts;
}

const KNOWN_FUNCS = new Set([
	'frac',
	'binom',
	'sqrt',
	'root',
	'vec',
	'arrow',
	'vect',
	'hat',
	'overline',
	'underline',
	'bar',
	'tilde',
	'dot',
	'ddot',
	'cancel',
	'overbrace',
	'underbrace',
	'abs',
	'norm',
	'floor',
	'ceil',
	'round',
	'lr',
	'bb',
	'cal',
	'frak',
	'bold',
	'italic',
	'upright',
	'text',
	'op',
	'cases',
	'mat',
	'attach',
	'limits'
]);

function convertFuncCall(fnName: string, rawInner: string, restoreStrings: (x: string) => string): string {
	switch (fnName) {
		case 'frac': {
			const args = splitTopLevel(rawInner, ',');
			if (args.length >= 2) {
				const num = transpileCore(args[0].trim(), restoreStrings);
				const den = transpileCore(args.slice(1).join(',').trim(), restoreStrings);
				return `\\frac{${num}}{${den}}`;
			}
			return `(${transpileCore(rawInner, restoreStrings)})`;
		}
		case 'binom': {
			const args = splitTopLevel(rawInner, ',');
			if (args.length >= 2) {
				return `\\binom{${transpileCore(args[0].trim(), restoreStrings)}}{${transpileCore(args[1].trim(), restoreStrings)}}`;
			}
			return `(${transpileCore(rawInner, restoreStrings)})`;
		}
		case 'root': {
			const args = splitTopLevel(rawInner, ',');
			if (args.length >= 2) {
				return `\\sqrt[${transpileCore(args[0].trim(), restoreStrings)}]{${transpileCore(args[1].trim(), restoreStrings)}}`;
			}
			return `\\sqrt{${transpileCore(rawInner.trim(), restoreStrings)}}`;
		}
		case 'sqrt':
			return `\\sqrt{${transpileCore(rawInner.trim(), restoreStrings)}}`;
		case 'vec':
		case 'arrow':
		case 'vect': {
			const inner = transpileCore(rawInner.trim(), restoreStrings);
			const compact = inner.replace(/\s+/g, '');
			if (/^[A-Za-z]{2,}$/.test(compact)) {
				return `\\overrightarrow{${compact}}`;
			}
			return `\\vec{${inner}}`;
		}
		case 'hat': {
			const inner = transpileCore(rawInner.trim(), restoreStrings);
			const compact = inner.replace(/\s+/g, '');
			if (/^[A-Za-z]{2,}$/.test(compact)) {
				return `\\widehat{${compact}}`;
			}
			return `\\hat{${inner}}`;
		}
		case 'overline':
			return `\\overline{${transpileCore(rawInner.trim(), restoreStrings)}}`;
		case 'underline':
			return `\\underline{${transpileCore(rawInner.trim(), restoreStrings)}}`;
		case 'bar':
			return `\\bar{${transpileCore(rawInner.trim(), restoreStrings)}}`;
		case 'tilde':
			return `\\tilde{${transpileCore(rawInner.trim(), restoreStrings)}}`;
		case 'dot':
			return `\\dot{${transpileCore(rawInner.trim(), restoreStrings)}}`;
		case 'ddot':
			return `\\ddot{${transpileCore(rawInner.trim(), restoreStrings)}}`;
		case 'cancel':
			return `{${transpileCore(rawInner.trim(), restoreStrings)}}`;
		case 'overbrace': {
			const args = splitTopLevel(rawInner, ',');
			const base = transpileCore(args[0].trim(), restoreStrings);
			if (args.length >= 2) {
				return `\\overbrace{${base}}^{${transpileCore(args[1].trim(), restoreStrings)}}`;
			}
			return `\\overbrace{${base}}`;
		}
		case 'underbrace': {
			const args = splitTopLevel(rawInner, ',');
			const base = transpileCore(args[0].trim(), restoreStrings);
			if (args.length >= 2) {
				return `\\underbrace{${base}}_{${transpileCore(args[1].trim(), restoreStrings)}}`;
			}
			return `\\underbrace{${base}}`;
		}
		case 'abs':
			return `\\left|${transpileCore(rawInner.trim(), restoreStrings)}\\right|`;
		case 'norm':
			return `\\left\\|${transpileCore(rawInner.trim(), restoreStrings)}\\right\\|`;
		case 'floor':
			return `\\left\\lfloor ${transpileCore(rawInner.trim(), restoreStrings)} \\right\\rfloor`;
		case 'ceil':
			return `\\left\\lceil ${transpileCore(rawInner.trim(), restoreStrings)} \\right\\rceil`;
		case 'round':
			return `\\left\\lfloor ${transpileCore(rawInner.trim(), restoreStrings)} \\right\\rceil`;
		case 'lr':
			return transpileCore(rawInner.trim(), restoreStrings);
		case 'bb':
			return `\\mathbb{${transpileCore(rawInner.trim(), restoreStrings)}}`;
		case 'cal':
			return `\\mathcal{${transpileCore(rawInner.trim(), restoreStrings)}}`;
		case 'frak':
			return `\\mathfrak{${transpileCore(rawInner.trim(), restoreStrings)}}`;
		case 'bold':
			return `\\mathbf{${transpileCore(rawInner.trim(), restoreStrings)}}`;
		case 'italic':
			return `\\mathit{${transpileCore(rawInner.trim(), restoreStrings)}}`;
		case 'upright':
		case 'text': {
			if (/^@@STR\d+@@$/.test(rawInner.trim())) {
				return rawInner.trim();
			}
			return `\\mathrm{${transpileCore(rawInner.trim(), restoreStrings)}}`;
		}
		case 'op': {
			const inner = restoreStrings(rawInner.trim()).replace(/^\\text\{([^{}]*)\}$/, '$1');
			return `\\operatorname{${inner}}`;
		}
		case 'limits':
			return transpileCore(rawInner.trim(), restoreStrings);
		case 'cases': {
			const rawRows = rawInner.includes(';')
				? splitTopLevel(rawInner, ';')
				: splitTopLevel(rawInner, ',');
			const rows = rawRows
				.map((r) => r.trim())
				.filter((r) => r !== '' && !/^delim\s*:/.test(r))
				.map((r) => transpileCore(r, restoreStrings));
			return `\\begin{cases} ${rows.join(' \\\\ ')} \\end{cases}`;
		}
		case 'mat': {
			let env = 'pmatrix';
			const semiRows = splitTopLevel(rawInner, ';');
			const cleanRows: string[] = [];
			for (const sr of semiRows) {
				const cells = splitTopLevel(sr, ',')
					.map((c) => c.trim())
					.filter((c) => {
						const dm = c.match(/^delim\s*:\s*(.+)$/);
						if (dm) {
							const dval = restoreStrings(dm[1].trim());
							if (dval.includes('[')) env = 'bmatrix';
							else if (dval.includes('|')) env = 'vmatrix';
							else if (dval.includes('{')) env = 'Bmatrix';
							return false;
						}
						return c !== '';
					})
					.map((c) => transpileCore(c, restoreStrings));
				if (cells.length > 0) cleanRows.push(cells.join(' & '));
			}
			return `\\begin{${env}} ${cleanRows.join(' \\\\ ')} \\end{${env}}`;
		}
		case 'attach': {
			const parts = splitTopLevel(rawInner, ',').map((p) => p.trim());
			const base = parts[0] ? transpileCore(parts[0], restoreStrings) : '';
			let tl = '';
			let bl = '';
			let tr = '';
			let br = '';
			for (const p of parts.slice(1)) {
				const m = p.match(/^(tl|bl|tr|br|t|b)\s*:\s*(.+)$/);
				if (!m) continue;
				const val = transpileCore(m[2].trim(), restoreStrings);
				if (m[1] === 'tl') tl = val;
				else if (m[1] === 'bl') bl = val;
				else if (m[1] === 'tr' || m[1] === 't') tr = val;
				else if (m[1] === 'br' || m[1] === 'b') br = val;
			}
			const leftPart = tl || bl ? `{}${tl ? `^{${tl}}` : ''}${bl ? `_{${bl}}` : ''}` : '';
			const rightPart = `${tr ? `^{${tr}}` : ''}${br ? `_{${br}}` : ''}`;
			return `${leftPart}${base}${rightPart}`;
		}
		default:
			return `${fnName}(${transpileCore(rawInner, restoreStrings)})`;
	}
}

function replaceKnownFunctions(input: string, restoreStrings: (x: string) => string): string {
	let out = '';
	let i = 0;
	while (i < input.length) {
		// Never touch LaTeX commands starting with `\`
		if (input[i] === '\\') {
			let j = i + 1;
			while (j < input.length && /[A-Za-z]/.test(input[j])) j++;
			out += input.slice(i, Math.max(i + 2, j));
			i = Math.max(i + 2, j);
			continue;
		}
		if (/[A-Za-z]/.test(input[i])) {
			let j = i;
			while (j < input.length && /[A-Za-z0-9.]/.test(input[j])) j++;
			const ident = input.slice(i, j);
			let k = j;
			while (k < input.length && input[k] === ' ') k++;
			if (KNOWN_FUNCS.has(ident) && input[k] === '(') {
				const closeIdx = findMatchingParen(input, k);
				if (closeIdx !== -1) {
					const inner = input.slice(k + 1, closeIdx);
					out += convertFuncCall(ident, inner, restoreStrings);
					i = closeIdx + 1;
					continue;
				}
			}
			out += ident;
			i = j;
			continue;
		}
		out += input[i];
		i++;
	}
	return out;
}

function replaceParenSubSup(input: string, restoreStrings: (x: string) => string): string {
	let out = '';
	let i = 0;
	while (i < input.length) {
		if ((input[i] === '_' || input[i] === '^') && input[i + 1] === '(') {
			const op = input[i];
			const closeIdx = findMatchingParen(input, i + 1);
			if (closeIdx !== -1) {
				const inner = input.slice(i + 2, closeIdx);
				out += `${op}{${transpileCore(inner, restoreStrings)}}`;
				i = closeIdx + 1;
				continue;
			}
		}
		out += input[i];
		i++;
	}
	return out;
}

function transpileCore(expr: string, restoreStrings: (x: string) => string): string {
	let s = expr;
	// 1. Known Typst functions with balanced parens
	s = replaceKnownFunctions(s, restoreStrings);
	// 2. Parenthesized subscripts/superscripts `_(...)` and `^(...)`
	s = replaceParenSubSup(s, restoreStrings);
	// 3. Dotted symbols & multi-char operators
	for (const [re, rep] of DOTTED_AND_SYMBOL_MAP) {
		s = s.replace(re, rep);
	}
	// 4. Standard math operators (not preceded by `\`)
	for (const op of STANDARD_OPS) {
		s = s.replace(new RegExp(`(?<!\\\\)\\b${op}\\b`, 'g'), `\\${op}`);
	}
	// 5. Bare Greek words (not preceded by `\`)
	for (const g of GREEK_WORDS) {
		s = s.replace(new RegExp(`(?<!\\\\)\\b${g}\\b`, 'g'), `\\${g} `);
	}
	// 6. Typst escaped characters inside math (`\/`, `\[`, `\]`, `\{`, `\}`)
	s = s.replace(/\\\//g, '/');
	// 7. Leading isotope / pre-script `^14_6 X` at start or after whitespace/operator -> `{}^{14}_{6} X`
	s = s.replace(/(^|[\s(+=-])(\^(?:\{[^{}]*\}|[0-9+-]+)(?:_(?:\{[^{}]*\}|[0-9+-]+))?)/g, '$1{}$2');
	return s;
}

/**
 * Converts a single Typst math inner expression (without surrounding `$...$`) into valid KaTeX LaTeX.
 */
export function typstMathToKatex(rawMath: string): string {
	if (!rawMath) return '';
	let s = rawMath.trim();
	if (!s) return '';

	// Extract `"..."` string literals AND existing `\text{...}` blocks first so operators/symbols never touch prose inside `\text{...}`!
	const strSlots: string[] = [];
	s = s.replace(/\\text\{([^{}]*)\}/g, (m) => {
		const idx = strSlots.length;
		strSlots.push(m);
		return `@@STR${idx}@@`;
	});
	s = s.replace(/"((?:\\.|[^"\\])*)"/g, (_m, inner: string) => {
		const unescaped = inner
			.replace(/\\"/g, '"')
			.replace(/\\\\/g, '\\')
			.replace(/([#%&_])/g, '\\$1');
		const idx = strSlots.length;
		strSlots.push(`\\text{${unescaped}}`);
		return `@@STR${idx}@@`;
	});

	const restoreStrings = (val: string): string =>
		val.replace(/@@STR(\d+)@@/g, (_m, d) => strSlots[Number(d)] ?? '');

	let out = restoreStrings(transpileCore(s, restoreStrings));

	// Clean redundant spaces and safeguard primed-subscript + superscript (`v'_\text{lim}^2` -> `{v'_\text{lim}}^2`)
	out = out
		.replace(/([A-Za-z]+'+_(?:\{[^{}]*\}|\\text\{[^{}]*\}|[A-Za-z0-9]+))\^/g, '{$1}^')
		.replace(/\^\{\\circ\s*\}/g, '^\\circ')
		.replace(/\s{2,}/g, ' ')
		.trim();

	return out;
}

/**
 * Converts all inline `$ ... $` Typst math expressions inside a prose string into KaTeX-ready `$...$` Markdown,
 * plus Typst inline markup (`#strong[...]`, `#underline[...]`, `#emph[...]`, `[[word]]`, `((phrase))`, dotted blanks).
 */
export function typstProseToWebMarkdown(raw: string | undefined | null): string {
	if (!raw || typeof raw !== 'string') return '';
	let s = raw;

	// 1. Convert `$ ... $` inline math segments
	s = s.replace(/\$([^$]+)\$/g, (_m, inner: string) => {
		const converted = typstMathToKatex(inner);
		return converted ? `$${converted}$` : '';
	});

	// 2. Convert non-math prose segments (preserving `$...$` untouched)
	const parts = s.split(/(\$[^$]+\$)/g);
	return parts
		.map((part, idx) => {
			if (idx % 2 === 1) return part; // math token
			let p = part
				.replace(/\\([#$<>@])/g, '$1')
				.replace(/\\\/\\\//g, '//')
				.replace(/#underline\[#strong\[([^\]]+)\]\]/g, '<u>**$1**</u>')
				.replace(/#emph\[#strong\[([^\]]+)\]\]/g, '_**$1**_')
				.replace(/#underline\[([^\]]+)\]/g, '<u>$1</u>')
				.replace(/#strong\[([^\]]+)\]/g, '**$1**')
				.replace(/#emph\[([^\]]+)\]/g, '_$1_')
				.replace(/\[\[([^\]]+)\]\]/g, '<u>**$1**</u>')
				.replace(/\(\(([^)]+)\)\)/g, '(**$1**)')
				// Single `*bold*` in Typst markup -> `**bold**` in Markdown (avoiding `**` already doubled)
				.replace(/(?<!\*)\*([^\s*\n](?:[^*\n]*?[^\s*\n])?)\*(?!\*)/g, '**$1**')
				// Long dot sequences `............` -> clean compact ASCII dotted blank (safe across all fonts incl. UthmanTN)
				.replace(/\.{8,}/g, ' ............ ');
			return p;
		})
		.join('');
}
