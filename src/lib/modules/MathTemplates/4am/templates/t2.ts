import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';
import { buildUniqueMcqOptions, gcd, SeededRng, simplifyFraction } from '../../rng';
import { saveSvgAsset, svgCartesianPlane } from '../../svg-helpers';

// ═══════════════════════════════════════════════════════════════════════════════
// Shared Helpers (KaTeX vs Typst Strict Separation + Algebraic Formatters)
// ═══════════════════════════════════════════════════════════════════════════════

function escapeXml(str: string): string {
	return str
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

function wrapSvg(width: number, height: number, body: string): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="background:#ffffff;font-family:Arial,sans-serif">${body}</svg>`;
}

/** Formats constant term `+ c` or `- c` (empty if 0). */
function fmtConstTerm(c: number): string {
	if (c === 0) return '';
	return c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`;
}

/** Formats `ax + b` cleanly (handles a = ±1, b = 0). */
function fmtLinear(a: number, b: number, varName = 'x'): string {
	let head = '';
	if (a === 1) head = varName;
	else if (a === -1) head = `-${varName}`;
	else if (a !== 0) head = `${a}${varName}`;

	if (head === '') return `${b}`;
	return `${head}${fmtConstTerm(b)}`;
}

/** Formats `Ax^2 + Bx + C` cleanly without `1x^2`, `+ -`, or `0x`. */
function fmtQuadratic(A: number, B: number, C: number, varName = 'x'): string {
	const parts: string[] = [];

	if (A !== 0) {
		if (A === 1) parts.push(`${varName}^2`);
		else if (A === -1) parts.push(`-${varName}^2`);
		else parts.push(`${A}${varName}^2`);
	}

	if (B !== 0) {
		const absB = Math.abs(B);
		const term = absB === 1 ? varName : `${absB}${varName}`;
		if (parts.length === 0) {
			parts.push(B < 0 ? `-${term}` : term);
		} else {
			parts.push(B < 0 ? `- ${term}` : `+ ${term}`);
		}
	}

	if (C !== 0 || parts.length === 0) {
		const absC = Math.abs(C);
		if (parts.length === 0) {
			parts.push(`${C}`);
		} else {
			parts.push(C < 0 ? `- ${absC}` : `+ ${absC}`);
		}
	}

	return parts.join(' ');
}

function fmtFracKatex(num: number, den: number): string {
	const [n, d] = simplifyFraction(num, den);
	if (d === 1) return `${n}`;
	if (n < 0) return `-\\frac{${Math.abs(n)}}{${d}}`;
	return `\\frac{${n}}{${d}}`;
}

function fmtFracTypst(num: number, den: number): string {
	const [n, d] = simplifyFraction(num, den);
	if (d === 1) return `${n}`;
	if (n < 0) return `-frac(${Math.abs(n)}, ${d})`;
	return `frac(${n}, ${d})`;
}

function fmtRootValKatex(rad: number): string {
	const root = Math.round(Math.sqrt(rad));
	if (root * root === rad) return `${root}`;
	return `\\sqrt{${rad}}`;
}

function fmtRootValTypst(rad: number): string {
	const root = Math.round(Math.sqrt(rad));
	if (root * root === rad) return `${root}`;
	return `sqrt(${rad})`;
}

function fmtVecKatex(a: string, b: string): string {
	return `\\overrightarrow{${a}${b}}`;
}

function fmtVecTypst(a: string, b: string): string {
	return `arrow(${a} ${b})`;
}

function fmtColVecKatex(x: number, y: number): string {
	return `\\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix}`;
}

function fmtColVecTypst(x: number, y: number): string {
	return `vec(${x}, ${y})`;
}

type IneqOp = '<' | '<=' | '>' | '>=';

function flipIneqOp(op: IneqOp): IneqOp {
	switch (op) {
		case '<':
			return '>';
		case '<=':
			return '>=';
		case '>':
			return '<';
		case '>=':
			return '<=';
	}
}

function toggleStrictIneqOp(op: IneqOp): IneqOp {
	switch (op) {
		case '<':
			return '<=';
		case '<=':
			return '<';
		case '>':
			return '>=';
		case '>=':
			return '>';
	}
}

function opToKatex(op: IneqOp): string {
	switch (op) {
		case '<':
			return '<';
		case '<=':
			return '\\le';
		case '>':
			return '>';
		case '>=':
			return '\\ge';
	}
}

function opToTypst(op: IneqOp): string {
	switch (op) {
		case '<':
			return '<';
		case '<=':
			return '<=';
		case '>':
			return '>';
		case '>=':
			return '>=';
	}
}

function opDescAr(op: IneqOp): string {
	switch (op) {
		case '<':
			return 'الأصغر تماماً من';
		case '<=':
			return 'الأصغر من أو تساوي';
		case '>':
			return 'الأكبر تماماً من';
		case '>=':
			return 'الأكبر من أو تساوي';
	}
}

// ═══════════════════════════════════════════════════════════════════════════════
// Custom SVG Generators (>= 2 self-contained Typst-safe SVG generators)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Custom SVG Generator #1:
 * 4AM Algerian BEM Inequality Number Line (without 1AS interval/infinity notation).
 * Blue thick ray + arrow = accepted solutions, red hatched segment = rejected values,
 * bracket facing solutions for <=/>= or facing rejected side for </>.
 */
function svgInequalityNumberLine(opts: {
	bound: number;
	op: IneqOp;
	showLabel?: boolean;
}): string {
	const w = 440;
	const h = 96;
	const min = Math.min(-2, opts.bound - 3);
	const max = Math.max(2, opts.bound + 3);
	const span = Math.max(4, max - min);
	const x0 = 36;
	const x1 = 404;
	const y = 46;
	const toX = (v: number) => x0 + ((v - min) / span) * (x1 - x0);
	const bx = toX(opts.bound);
	const isRight = opts.op === '>' || opts.op === '>=';
	const isInclusive = opts.op === '<=' || opts.op === '>=';
	const parts: string[] = [];

	// Subtle outer frame
	parts.push(
		`<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>`
	);

	// Optional math label (ASCII only)
	if (opts.showLabel) {
		const opSym =
			opts.op === '<=' ? '≤' : opts.op === '>=' ? '≥' : opts.op === '<' ? '<' : '>';
		parts.push(
			`<text x="${w / 2}" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e40af">x ${opSym} ${opts.bound}</text>`
		);
	}

	// Base axis line
	parts.push(
		`<line x1="${x0 - 10}" y1="${y}" x2="${x1 + 14}" y2="${y}" stroke="#64748b" stroke-width="1.6"/>`
	);

	// Solution ray (blue) & rejected hatched ray (red)
	if (isRight) {
		// Rejected left side [x0-10 .. bx]
		parts.push(
			`<line x1="${x0 - 10}" y1="${y}" x2="${bx.toFixed(1)}" y2="${y}" stroke="#dc2626" stroke-width="2.2"/>`
		);
		for (let hx = x0 - 4; hx < bx - 4; hx += 12) {
			parts.push(
				`<line x1="${(hx + 5).toFixed(1)}" y1="${y - 6}" x2="${(hx - 3).toFixed(1)}" y2="${y + 6}" stroke="#dc2626" stroke-width="1.4"/>`
			);
		}
		// Accepted right side [bx .. x1+10]
		parts.push(
			`<line x1="${bx.toFixed(1)}" y1="${y}" x2="${x1 + 10}" y2="${y}" stroke="#2563eb" stroke-width="4.2"/>`,
			`<polygon points="${x1 + 17},${y} ${x1 + 7},${y - 5} ${x1 + 7},${y + 5}" fill="#2563eb"/>`
		);
	} else {
		// Accepted left side [x0-4 .. bx]
		parts.push(
			`<line x1="${x0 - 4}" y1="${y}" x2="${bx.toFixed(1)}" y2="${y}" stroke="#2563eb" stroke-width="4.2"/>`,
			`<polygon points="${x0 - 13},${y} ${x0 - 3},${y - 5} ${x0 - 3},${y + 5}" fill="#2563eb"/>`
		);
		// Rejected right side [bx .. x1+12]
		parts.push(
			`<line x1="${bx.toFixed(1)}" y1="${y}" x2="${x1 + 12}" y2="${y}" stroke="#dc2626" stroke-width="2.2"/>`
		);
		for (let hx = bx + 8; hx < x1 + 8; hx += 12) {
			parts.push(
				`<line x1="${(hx + 4).toFixed(1)}" y1="${y - 6}" x2="${(hx - 4).toFixed(1)}" y2="${y + 6}" stroke="#dc2626" stroke-width="1.4"/>`
			);
		}
	}

	// Bracket orientation at boundary
	// Faces right if (isRight && isInclusive) or (!isRight && !isInclusive)
	const openRight = (isRight && isInclusive) || (!isRight && !isInclusive);
	const arm = openRight ? 6 : -6;
	const bColor = isInclusive ? '#2563eb' : '#dc2626';
	parts.push(
		`<path d="M ${(bx + arm).toFixed(1)} ${y - 11} L ${bx.toFixed(1)} ${y - 11} L ${bx.toFixed(1)} ${y + 11} L ${(bx + arm).toFixed(1)} ${y + 11}" fill="none" stroke="${bColor}" stroke-width="2.6"/>`
	);

	// Integer tick marks and numbers
	for (let v = min; v <= max; v++) {
		const tx = toX(v);
		const isBound = v === opts.bound;
		const isOrigin = v === 0;
		parts.push(
			`<line x1="${tx.toFixed(1)}" y1="${y - 4}" x2="${tx.toFixed(1)}" y2="${y + 4}" stroke="#334155" stroke-width="${isBound || isOrigin ? 1.8 : 1.1}"/>`
		);
		const lblCol = isBound ? bColor : isOrigin ? '#0f172a' : '#475569';
		const fw = isBound || isOrigin ? 'bold' : 'normal';
		parts.push(
			`<text x="${tx.toFixed(1)}" y="${y + 26}" text-anchor="middle" font-size="${isBound ? 12 : 10.5}" font-weight="${fw}" fill="${lblCol}">${v}</text>`
		);
	}

	return wrapSvg(w, h, parts.join(''));
}

/**
 * Custom SVG Generator #2:
 * Grid vector figure (parallelogram, Chasles triangle, or same-origin parallelogram rule).
 */
function svgVectorGridFigure(opts: {
	mode: 'parallelogram' | 'chasles_triangle' | 'same_origin';
	labels: [string, string, string, string];
	centerLabel?: string;
}): string {
	const w = 310;
	const h = 210;
	const cell = 26;
	const ox = 25;
	const oy = 18;
	const cols = 10;
	const rows = 6;
	const parts: string[] = [];

	// Grid background
	parts.push(
		`<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>`
	);
	for (let c = 0; c <= cols; c++) {
		const x = ox + c * cell;
		parts.push(
			`<line x1="${x}" y1="${oy}" x2="${x}" y2="${oy + rows * cell}" stroke="#e2e8f0" stroke-width="1"/>`
		);
	}
	for (let r = 0; r <= rows; r++) {
		const y = oy + r * cell;
		parts.push(
			`<line x1="${ox}" y1="${y}" x2="${ox + cols * cell}" y2="${y}" stroke="#e2e8f0" stroke-width="1"/>`
		);
	}

	const px = (gx: number) => ox + gx * cell;
	const py = (gy: number) => oy + gy * cell;

	const drawArrow = (
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		color: string,
		dashed = false
	) => {
		const ang = Math.atan2(y2 - y1, x2 - x1);
		const ah = 9;
		const sx = x2 - ah * Math.cos(ang);
		const sy = y2 - ah * Math.sin(ang);
		const p1x = x2 - ah * Math.cos(ang - 0.42);
		const p1y = y2 - ah * Math.sin(ang - 0.42);
		const p2x = x2 - ah * Math.cos(ang + 0.42);
		const p2y = y2 - ah * Math.sin(ang + 0.42);
		parts.push(
			`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${sx.toFixed(1)}" y2="${sy.toFixed(1)}" stroke="${color}" stroke-width="2.5"${dashed ? ' stroke-dasharray="5 3"' : ''}/>`,
			`<polygon points="${x2.toFixed(1)},${y2.toFixed(1)} ${p1x.toFixed(1)},${p1y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)}" fill="${color}"/>`
		);
	};

	const drawPoint = (x: number, y: number, label: string, dx: number, dy: number, col = '#0f172a') => {
		parts.push(
			`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${col}"/>`,
			`<text x="${(x + dx).toFixed(1)}" y="${(y + dy).toFixed(1)}" font-size="13" font-weight="bold" fill="${col}">${escapeXml(label)}</text>`
		);
	};

	const [L0, L1, L2, L3] = opts.labels;

	if (opts.mode === 'parallelogram') {
		const A = { x: px(2), y: py(1) };
		const B = { x: px(8), y: py(1) };
		const C = { x: px(7), y: py(5) };
		const D = { x: px(1), y: py(5) };
		const O = { x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 };

		// Sides AD, BC and diagonals
		parts.push(
			`<line x1="${A.x}" y1="${A.y}" x2="${D.x}" y2="${D.y}" stroke="#475569" stroke-width="1.8"/>`,
			`<line x1="${B.x}" y1="${B.y}" x2="${C.x}" y2="${C.y}" stroke="#475569" stroke-width="1.8"/>`,
			`<line x1="${A.x}" y1="${A.y}" x2="${C.x}" y2="${C.y}" stroke="#94a3b8" stroke-width="1.3" stroke-dasharray="4 3"/>`,
			`<line x1="${B.x}" y1="${B.y}" x2="${D.x}" y2="${D.y}" stroke="#94a3b8" stroke-width="1.3" stroke-dasharray="4 3"/>`
		);
		drawArrow(A.x, A.y, B.x, B.y, '#2563eb');
		drawArrow(D.x, D.y, C.x, C.y, '#16a34a');

		drawPoint(A.x, A.y, L0, -14, -6, '#1e40af');
		drawPoint(B.x, B.y, L1, 7, -6, '#1e40af');
		drawPoint(C.x, C.y, L2, 7, 14, '#15803d');
		drawPoint(D.x, D.y, L3, -15, 14, '#15803d');
		if (opts.centerLabel) {
			drawPoint(O.x, O.y, opts.centerLabel, 5, -7, '#dc2626');
		}
	} else if (opts.mode === 'chasles_triangle') {
		const A = { x: px(1), y: py(5) };
		const B = { x: px(5), y: py(1) };
		const C = { x: px(9), y: py(4) };
		drawArrow(A.x, A.y, B.x, B.y, '#2563eb');
		drawArrow(B.x, B.y, C.x, C.y, '#16a34a');
		drawArrow(A.x, A.y, C.x, C.y, '#dc2626');
		drawPoint(A.x, A.y, L0, -14, 14, '#0f172a');
		drawPoint(B.x, B.y, L1, -4, -10, '#0f172a');
		drawPoint(C.x, C.y, L2, 8, 12, '#0f172a');
	} else {
		// same_origin: AB + AC = AD (parallelogram ABDC)
		const A = { x: px(1), y: py(5) };
		const B = { x: px(4), y: py(1) };
		const C = { x: px(6), y: py(5) };
		const D = { x: px(9), y: py(1) };
		parts.push(
			`<line x1="${B.x}" y1="${B.y}" x2="${D.x}" y2="${D.y}" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3"/>`,
			`<line x1="${C.x}" y1="${C.y}" x2="${D.x}" y2="${D.y}" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3"/>`
		);
		drawArrow(A.x, A.y, B.x, B.y, '#2563eb');
		drawArrow(A.x, A.y, C.x, C.y, '#16a34a');
		drawArrow(A.x, A.y, D.x, D.y, '#dc2626');
		drawPoint(A.x, A.y, L0, -14, 14, '#0f172a');
		drawPoint(B.x, B.y, L1, -8, -9, '#1e40af');
		drawPoint(C.x, C.y, L2, -4, 16, '#15803d');
		drawPoint(D.x, D.y, L3, 8, -8, '#dc2626');
	}

	return wrapSvg(w, h, parts.join(''));
}

/**
 * Custom SVG Generator #3:
 * Integration Part 1 & 2 Area Comparison Plot:
 * S1 = (ax + b)^2 - e^2 vs S2 = (ax + m)^2 (ASCII/math labels only for Typst safety).
 */
function svgAreaComparisonPlot(opts: { a: number; b: number; m: number; e: number }): string {
	const w = 390;
	const h = 190;
	const s1Side = fmtLinear(opts.a, opts.b);
	const s2Side = fmtLinear(opts.a, opts.m);
	const parts: string[] = [
		`<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>`,
		// Left box: Plot 1 = (ax + b)^2 - e^2
		`<rect x="14" y="14" width="175" height="162" rx="6" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>`,
		`<rect x="44" y="34" width="106" height="106" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>`,
		`<rect x="112" y="102" width="38" height="38" fill="#fee2e2" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="4 3"/>`,
		`<text x="97" y="27" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">${escapeXml(s1Side)}</text>`,
		`<text x="27" y="91" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">${escapeXml(s1Side)}</text>`,
		`<text x="131" y="124" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">${opts.e} x ${opts.e}</text>`,
		`<text x="80" y="76" text-anchor="middle" font-size="13" font-weight="bold" fill="#1d4ed8">S1</text>`,
		`<text x="101" y="164" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">S1 = (${escapeXml(s1Side)})² - ${opts.e}²</text>`,
		// Right box: Plot 2 = (ax + m)^2
		`<rect x="201" y="14" width="175" height="162" rx="6" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>`,
		`<rect x="242" y="42" width="94" height="94" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>`,
		`<text x="289" y="34" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">${escapeXml(s2Side)}</text>`,
		`<text x="223" y="93" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">${escapeXml(s2Side)}</text>`,
		`<text x="289" y="93" text-anchor="middle" font-size="13" font-weight="bold" fill="#15803d">S2</text>`,
		`<text x="289" y="164" text-anchor="middle" font-size="11" font-weight="bold" fill="#166534">S2 = (${escapeXml(s2Side)})²</text>`
	];
	return wrapSvg(w, h, parts.join(''));
}

// ═══════════════════════════════════════════════════════════════════════════════
// Curated Orthonormal Frame Geometry Helper (4AM T2)
// ═══════════════════════════════════════════════════════════════════════════════

type FrameShapeKind = 'square' | 'rectangle' | 'rhombus';

interface FrameConfig {
	kind: FrameShapeKind;
	A: [number, number];
	B: [number, number];
	C: [number, number];
	D: [number, number];
	abSq: number;
	bcSq: number;
	acSq: number;
}

const FRAME_TEMPLATES: { kind: FrameShapeKind; u: [number, number]; v: [number, number] }[] = [
	// Squares (AB = BC, AB^2 + BC^2 = AC^2)
	{ kind: 'square', u: [2, 1], v: [-1, 2] },
	{ kind: 'square', u: [1, 2], v: [-2, 1] },
	{ kind: 'square', u: [3, 1], v: [-1, 3] },
	{ kind: 'square', u: [2, 3], v: [-3, 2] },
	{ kind: 'square', u: [3, 2], v: [-2, 3] },
	{ kind: 'square', u: [3, -1], v: [1, 3] },
	{ kind: 'square', u: [2, -1], v: [1, 2] },
	// Rectangles (AB != BC, AB^2 + BC^2 = AC^2, clean AC = 5)
	{ kind: 'rectangle', u: [2, 1], v: [-2, 4] },
	{ kind: 'rectangle', u: [4, 2], v: [-1, 2] },
	{ kind: 'rectangle', u: [1, 2], v: [-4, 2] },
	{ kind: 'rectangle', u: [2, -1], v: [2, 4] },
	{ kind: 'rectangle', u: [4, -2], v: [1, 2] },
	// Rhombuses (AB = BC, AB^2 + BC^2 != AC^2)
	{ kind: 'rhombus', u: [2, 1], v: [1, 2] },
	{ kind: 'rhombus', u: [3, 1], v: [1, 3] },
	{ kind: 'rhombus', u: [2, 3], v: [3, 2] },
	{ kind: 'rhombus', u: [2, -1], v: [1, -2] }
];

function buildFrameConfig(rng: SeededRng, allowedKinds: FrameShapeKind[]): FrameConfig {
	const pool = FRAME_TEMPLATES.filter((t) => allowedKinds.includes(t.kind));
	const chosen = rng.pick(pool);
	const [ux, uy] = chosen.u;
	const [vx, vy] = chosen.v;

	const validOrigins: [number, number][] = [];
	for (let ax = -4; ax <= 4; ax++) {
		for (let ay = -4; ay <= 4; ay++) {
			const bx = ax + ux;
			const by = ay + uy;
			const cx = bx + vx;
			const cy = by + vy;
			const dx = ax + vx;
			const dy = ay + vy;
			const pts: [number, number][] = [
				[ax, ay],
				[bx, by],
				[cx, cy],
				[dx, dy]
			];
			const inBounds = pts.every(([x, y]) => x >= -4 && x <= 4 && y >= -4 && y <= 4);
			const awayFromOrigin = pts.every(([x, y]) => !(x === 0 && y === 0));
			if (inBounds && awayFromOrigin) {
				validOrigins.push([ax, ay]);
			}
		}
	}

	const [ax, ay] = validOrigins.length > 0 ? rng.pick(validOrigins) : [-1, -2];
	const A: [number, number] = [ax, ay];
	const B: [number, number] = [ax + ux, ay + uy];
	const C: [number, number] = [ax + ux + vx, ay + uy + vy];
	const D: [number, number] = [ax + vx, ay + vy];
	const abSq = ux * ux + uy * uy;
	const bcSq = vx * vx + vy * vy;
	const acSq = (C[0] - A[0]) ** 2 + (C[1] - A[1]) ** 2;

	return { kind: chosen.kind, A, B, C, D, abSq, bcSq, acSq };
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Expansion & Simplification via Remarkable Identities (numeric, 3 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const expansionIdentitiesTemplate: ParameterizedTemplate = {
	id: '4am_t2_expansion_identities',
	grade: '4am',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'النشر والتبسيط بالمتطابقات الشهيرة والحساب المتمعن فيه',
	curriculumLessonId: 'lesson_4am_t2_expansion_remarkable_identities',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		if (difficulty === 'easy') {
			const a = rng.int(2, 4);
			const b = rng.int(1, 6);
			const sign = rng.pick([1, -1]);
			const binStr = fmtLinear(a, sign * b);
			const A2 = a * a;
			const B2 = 2 * a * sign * b;
			const C2 = b * b;
			const ansExpr = fmtQuadratic(A2, B2, C2);

			const a2 = rng.int(2, 5);
			const b2 = rng.int(1, 7);
			const ansB = `${a2 * a2}x^2 - ${b2 * b2}`;

			const base = rng.pick([50, 100]);
			const delta = rng.int(1, 4);
			const isPlus = rng.int(0, 1) === 1;
			const numVal = isPlus ? base + delta : base - delta;
			const smartAns = numVal * numVal;
			const smartExprTypst = isPlus ? `(${base} + ${delta})^2` : `(${base} - ${delta})^2`;
			const smartExpandTypst = isPlus
				? `${base}^2 + 2 times ${base} times ${delta} + ${delta}^2 = ${base * base} + ${2 * base * delta} + ${delta * delta}`
				: `${base}^2 - 2 times ${base} times ${delta} + ${delta}^2 = ${base * base} - ${2 * base * delta} + ${delta * delta}`;

			const xEval = rng.int(1, 4);
			const evalRes = A2 * xEval * xEval + B2 * xEval + C2;

			const mcq = buildUniqueMcqOptions(
				`$${ansExpr}$`,
				[
					{
						text: `$${fmtQuadratic(A2, 0, sign > 0 ? C2 : -C2)}$`,
						diagnosticFeedback:
							'خطأ شائع: أهملتَ الحد المضاعف $\\pm 2ab$ عند نشر مربع مجموع أو مربع فرق!'
					},
					{
						text: `$${fmtQuadratic(a, B2, C2)}$`,
						diagnosticFeedback:
							`تذكّر تربيع المعامل العددي أيضاً: $(${a}x)^2 = ${A2}x^2$ وليس $${a}x^2$.`
					},
					{
						text: `$${fmtQuadratic(A2, a * sign * b, C2)}$`,
						diagnosticFeedback:
							'في المتطابقة الشهيرة، الحد الأوسط هو ضعف الجداء $2ab$ وليس $ab$ فقط.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `انشر وبسّط العبارة الجبرية الآتية باستعمال المتطابقة الشهيرة المناسبة:\n\n$$A = (${binStr})^2$$`,
					questionTextAr: `انشر وبسّط العبارة الآتية: $A = (${binStr})^2$`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `نطبق متطابقة ${sign > 0 ? 'مربع مجموع' : 'مربع فرق'}: $(${binStr})^2 = (${a}x)^2 ${sign > 0 ? '+' : '-'} 2 \\times ${a}x \\times ${b} + ${b}^2 = ${ansExpr}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'أنجز العمليات الآتية باستعمال المتطابقات الشهيرة دون آلة حاسبة:',
					content: [
						{
							type: 'text',
							content: `1) انشر وبسّط العبارتين: $A = (${binStr})^2$ و $B = (${a2}x + ${b2})(${a2}x - ${b2})$.`,
							answer: `1) $A = (${a}x)^2 ${sign > 0 ? '+' : '-'} 2 times ${a}x times ${b} + ${b}^2 = ${ansExpr}$ ، و $B = (${a2}x)^2 - ${b2}^2 = ${ansB}$.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `2) احسب بتمعّن العدد $C = ${numVal}^2$ بتوظيف متطابقة شهيرة.`,
							answer: `2) $C = ${smartExprTypst} = ${smartExpandTypst} = ${smartAns}$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) احسب قيمة العبارة $A$ من أجل $x = ${xEval}$.`,
							answer: `3) من أجل $x = ${xEval}$: $A = ${A2} times ${xEval}^2 ${B2 >= 0 ? `+ ${B2}` : `- ${Math.abs(B2)}`} times ${xEval} + ${C2} = ${evalRes}$.`,
							mark: '0.5'
						}
					]
				},
				hints: [
					sign > 0
						? 'طبّق متطابقة مربع مجموع: $(u + v)^2 = u^2 + 2uv + v^2$.'
						: 'طبّق متطابقة مربع فرق: $(u - v)^2 = u^2 - 2uv + v^2$.',
					`انتبه عند التربيع: $(${a}x)^2 = ${A2}x^2$ (نربع العدد والحرف معاً).`,
					`الحد الأوسط هو $${sign > 0 ? '+' : '-'} 2 \\times ${a}x \\times ${b} = ${B2}x$.`
				],
				solutionStepsAr: [
					`نطبّق المتطابقة الشهيرة على $A = (${binStr})^2$: نحصل على $(${a}x)^2 ${sign > 0 ? '+' : '-'} 2 \\times ${a}x \\times ${b} + ${b}^2$.`,
					`نبسّط القوى والجداءات فنجد $A = ${ansExpr}$.`,
					`في $B$ نطبّق فرق مربعين فنجد $B = ${ansB}$، وفي الحساب المتمعن $C = ${numVal}^2 = ${smartAns}$.`
				],
				finalAnswer: ansExpr
			};
		}

		if (difficulty === 'medium') {
			const a1 = rng.int(2, 4);
			const b1 = rng.int(1, 5);
			const s1 = rng.pick([1, -1]);
			const a2 = rng.pick([1, 2, 3].filter((v) => v !== a1));
			const b2 = rng.int(2, 6);

			const bin1 = fmtLinear(a1, s1 * b1);
			const bin2p = fmtLinear(a2, b2);
			const bin2m = fmtLinear(a2, -b2);

			const A = a1 * a1 - a2 * a2;
			const B = 2 * a1 * s1 * b1;
			const C = b1 * b1 + b2 * b2;
			const ansE = fmtQuadratic(A, B, C);

			const base = rng.pick([50, 100, 200]);
			const d = rng.int(1, 4);
			const pLeft = base + d;
			const pRight = base - d;
			const smartM = pLeft * pRight;

			const xVal = rng.pick([-2, -1, 2, 3]);
			const eVal = A * xVal * xVal + B * xVal + C;

			const mcq = buildUniqueMcqOptions(
				`$${ansE}$`,
				[
					{
						text: `$${fmtQuadratic(A, B, b1 * b1 - b2 * b2)}$`,
						diagnosticFeedback:
							'انتبه لإشارة الطرح قبل القوس الثاني: $-(' +
							fmtQuadratic(a2 * a2, 0, -b2 * b2) +
							')$ يعطي $+' +
							b2 * b2 +
							'$ وليس $-' +
							b2 * b2 +
							'$.'
					},
					{
						text: `$${fmtQuadratic(A, 0, C)}$`,
						diagnosticFeedback:
							'نسيتَ الحد المضاعف $2ab$ عند نشر مربع القوس الأول!'
					},
					{
						text: `$${fmtQuadratic(a1 - a2, B, C)}$`,
						diagnosticFeedback:
							'يجب تربيع المعاملات قبل الطرح: $(a x)^2 = a^2 x^2$ وليس $a x^2$.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `لتكن العبارة الجبرية الآتية:\n\n$$E = (${bin1})^2 - (${bin2p})(${bin2m})$$\n\nما هي العبارة المنشورة والمبسطة لـ $E$؟`,
					questionTextAr: `انشر وبسّط العبارة: $E = (${bin1})^2 - (${bin2p})(${bin2m})$`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `ننشر كل جزء بين قوسين: $E = (${fmtQuadratic(a1 * a1, B, b1 * b1)}) - (${fmtQuadratic(a2 * a2, 0, -b2 * b2)}) = ${ansE}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'لتكن العبارة الجبرية $E = (' + bin1 + ')^2 - (' + bin2p + ')(' + bin2m + ')$:',
					content: [
						{
							type: 'text',
							content: '1) انشر وبسّط العبارة $E$.',
							answer: `1) $E = (${fmtQuadratic(a1 * a1, B, b1 * b1)}) - (${fmtQuadratic(a2 * a2, 0, -b2 * b2)}) = ${fmtQuadratic(a1 * a1, B, b1 * b1)} - ${a2 * a2 === 1 ? 'x^2' : `${a2 * a2}x^2`} + ${b2 * b2} = ${ansE}$.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `2) احسب بتمعّن الجداء $M = ${pLeft} times ${pRight}$ باستعمال متطابقة شهيرة.`,
							answer: `2) $M = (${base} + ${d})(${base} - ${d}) = ${base}^2 - ${d}^2 = ${base * base} - ${d * d} = ${smartM}$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) احسب القيمة العددية للعبارة $E$ من أجل $x = ${xVal}$.`,
							answer: `3) من أجل $x = ${xVal}$ نجد $E = ${A} times (${xVal})^2 ${B >= 0 ? `+ ${B}` : `- ${Math.abs(B)}`} times (${xVal}) + ${C} = ${eVal}$.`,
							mark: '0.5'
						}
					]
				},
				hints: [
					'انشر القوس الأول بمربع مجموع أو مربع فرق، وانشر الجداء الثاني بمتطابقة $(u + v)(u - v) = u^2 - v^2$.',
					'احتفظ بالأقواس حول نتيجة الجداء الثاني لأنه مسبوق بإشارة الطرح $(-)$.',
					'عند حذف القوس المسبوق بـ $(-)$، نعكس إشارة كل حد داخله فتصبح $-' +
						b2 * b2 +
						'$ موجبة $+' +
						b2 * b2 +
						'$.'
				],
				solutionStepsAr: [
					`نشر القوس الأول: $(${bin1})^2 = ${fmtQuadratic(a1 * a1, B, b1 * b1)}$.`,
					`نشر الجداء الثاني: $(${bin2p})(${bin2m}) = ${fmtQuadratic(a2 * a2, 0, -b2 * b2)}$.`,
					`بطرح الثاني من الأول وتبسيط الحدود المتشابهة نجد: $E = ${ansE}$.`,
					`في الحساب المتمعن: $${pLeft} \\times ${pRight} = (${base} + ${d})(${base} - ${d}) = ${smartM}$.`
				],
				finalAnswer: ansE
			};
		}

		// hard
		const a1 = rng.int(2, 4);
		const b1 = rng.int(1, 4);
		const s1 = rng.pick([1, -1]);
		const c1 = rng.int(1, 3); // a1^2 >= 4 > c1 so A >= 1
		const d1 = rng.int(1, 4);
		const d2 = rng.int(1, 4);

		const bin1 = fmtLinear(a1, s1 * b1);
		const binL = fmtLinear(c1, d1);
		const binR = fmtLinear(1, -d2);

		const A = a1 * a1 - c1;
		const B1 = 2 * a1 * s1 * b1;
		const B2 = d1 - c1 * d2;
		const B = B1 - B2;
		const C = b1 * b1 + d1 * d2;
		const ansE = fmtQuadratic(A, B, C);

		const rad = rng.pick([2, 3, 5]);
		const constPart = A * rad + C;

		const base = rng.pick([50, 100, 200]);
		const delta = rng.int(2, 6);
		const uNum = base + delta;
		const vNum = base - delta;
		const smartAns = 4 * base * delta;

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `باستعمال المتطابقات الشهيرة في الحساب المتمعن فيه (دون آلة حاسبة)، احسب قيمة العدد الآتي:\n\n$$N = ${uNum}^2 - ${vNum}^2$$`,
				questionTextAr: `احسب بتمعّن باستعمال المتطابقات الشهيرة: $N = ${uNum}^2 - ${vNum}^2$`,
				questionData: {
					answer: smartAns,
					displayTemplate: `${uNum}^2 - ${vNum}^2 = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `نلاحظ أن ${uNum} = ${base} + ${delta} و ${vNum} = ${base} - ${delta}، أو باستعمال فرق مربعين: (${uNum} - ${vNum})(${uNum} + ${vNum}) = ${2 * delta} × ${2 * base} = ${smartAns}.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `لتكن العبارة الجبرية $E = (${bin1})^2 - (${binL})(${binR})$:`,
				content: [
					{
						type: 'text',
						content: '1) انشر وبسّط العبارة $E$.',
						answer: `1) $E = (${fmtQuadratic(a1 * a1, B1, b1 * b1)}) - (${fmtQuadratic(c1, B2, -d1 * d2)}) = ${ansE}$.`,
						mark: '1.25'
					},
					{
						type: 'text',
						content: `2) احسب القيمة المضبوطة للعبارة $E$ من أجل $x = sqrt(${rad})$ واكتبها على الشكل $m + n sqrt(${rad})$ (أو $m - n sqrt(${rad})$).`,
						answer: `2) بالتعويض في الصيغة المنشورة: $E = ${A}(sqrt(${rad}))^2 ${B >= 0 ? `+ ${B}` : `- ${Math.abs(B)}`}sqrt(${rad}) + ${C} = ${A * rad} + ${C} ${B >= 0 ? `+ ${B}` : `- ${Math.abs(B)}`}sqrt(${rad}) = ${constPart}${B === 0 ? '' : B > 0 ? ` + ${B === 1 ? '' : B}sqrt(${rad})` : ` - ${Math.abs(B) === 1 ? '' : Math.abs(B)}sqrt(${rad})`}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) احسب بتمعّن العدد $N = ${uNum}^2 - ${vNum}^2$ بتوظيف متطابقة شهيرة.`,
						answer: `3) $N = (${uNum} - ${vNum})(${uNum} + ${vNum}) = ${2 * delta} times ${2 * base} = ${smartAns}$.`,
						mark: '0.75'
					}
				]
			},
			hints: [
				`اكتب $${uNum} = ${base} + ${delta}$ و$${vNum} = ${base} - ${delta}$ أو طبّق متطابقة فرق مربعين $a^2 - b^2 = (a - b)(a + b)$.`,
				`الفرق $${uNum} - ${vNum} = ${2 * delta}$ والمجموع $${uNum} + ${vNum} = ${2 * base}$.`,
				`اضرب الناتجين: $${2 * delta} \\times ${2 * base} = ${smartAns}$.`
			],
			solutionStepsAr: [
				`نطبّق متطابقة فرق مربعين: $N = (${uNum} - ${vNum})(${uNum} + ${vNum}) = ${2 * delta} \\times ${2 * base} = ${smartAns}$.`,
				`في النشر: $(${bin1})^2 = ${fmtQuadratic(a1 * a1, B1, b1 * b1)}$ و$(${binL})(${binR}) = ${fmtQuadratic(c1, B2, -d1 * d2)}$، ومنه $E = ${ansE}$.`,
				`من أجل $x = \\sqrt{${rad}}$ نجد $E = ${constPart}${B === 0 ? '' : B > 0 ? ` + ${B}\\sqrt{${rad}}` : ` - ${Math.abs(B)}\\sqrt{${rad}}`}$.`
			],
			finalAnswer: String(smartAns)
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Factorization via Common Factor & A^2 - B^2 (BEM Classic, numeric, 3 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const factorizationBemTemplate: ParameterizedTemplate = {
	id: '4am_t2_factorization_bem',
	grade: '4am',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'التحليل إلى جداء عاملين بالعامل المشترك والمتطابقات الشهيرة',
	curriculumLessonId: 'lesson_4am_t2_factorization_common_factor_identities',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		if (difficulty === 'easy') {
			const a = rng.int(1, 3);
			const b = rng.int(1, 5);
			const s = rng.pick([1, -1]);
			const cPool = [2, 3, 4, 5, 6].filter((v) => v !== b);
			const c = rng.pick(cPool);

			const inner = fmtLinear(a, s * b);
			const f1 = fmtLinear(a, s * b - c);
			const f2 = fmtLinear(a, s * b + c);
			const factoredStr = `(${f1})(${f2})`;

			const expA = a * a;
			const expB = 2 * a * s * b;
			const expC = b * b - c * c;
			const expandedStr = fmtQuadratic(expA, expB, expC);

			// Auxiliary F = p^2 x^2 - q^2
			const p = rng.int(2, 5);
			const q = rng.pick([3, 4, 5, 7].filter((v) => gcd(p, v) === 1));
			const auxExpr = `${p * p}x^2 - ${q * q}`;
			const auxFactored = `(${p}x - ${q})(${p}x + ${q})`;

			const mcq = buildUniqueMcqOptions(
				`$${factoredStr}$`,
				[
					{
						text: `$(${fmtLinear(a, s * b - c * c)})(${fmtLinear(a, s * b + c * c)})$`,
						diagnosticFeedback:
							`خطأ شائع: نسيتَ أخذ الجذر التربيعي للحد الثابت $${c * c} = ${c}^2$، فوضعت $${c * c}$ بدل $${c}$!`
					},
					{
						text: `$(${f1})^2$`,
						diagnosticFeedback:
							'خلطتَ بين متطابقة فرق مربعين $A^2 - B^2 = (A - B)(A + B)$ ومتطابقة مربع فرق $(A - B)^2$.'
					},
					{
						text: `$(${fmtLinear(a, -s * b - c)})(${fmtLinear(a, -s * b + c)})$`,
						diagnosticFeedback:
							'تحقق من إشارة القوس الأول $A = ' + inner + '$ عند التعويض في $(A - B)(A + B)$.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `حلّل العبارة الآتية إلى جداء عاملين من الدرجة الأولى:\n\n$$E = (${inner})^2 - ${c * c}$$`,
					questionTextAr: `حلّل العبارة $E = (${inner})^2 - ${c * c}$ إلى جداء عاملين.`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `نكتب $${c * c} = ${c}^2$ ثم نطبق متطابقة فرق مربعين: $E = ((${inner}) - ${c})((${inner}) + ${c}) = ${factoredStr}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: `لتكن العبارة الجبرية $E = (${inner})^2 - ${c * c}$:`,
					content: [
						{
							type: 'text',
							content: '1) انشر وبسّط العبارة $E$.',
							answer: `1) $E = ${fmtQuadratic(expA, expB, b * b)} - ${c * c} = ${expandedStr}$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: '2) حلّل العبارة $E$ إلى جداء عاملين من الدرجة الأولى.',
							answer: `2) $E = (${inner})^2 - ${c}^2 = [(${inner}) - ${c}][(${inner}) + ${c}] = ${factoredStr}$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) حلّل العبارة $F = ${auxExpr}$، ثم احسب $E$ من أجل $x = 0$.`,
							answer: `3) $F = (${p}x)^2 - ${q}^2 = ${auxFactored}$ ، ومن أجل $x = 0$: $E = ${expC}$.`,
							mark: '1'
						}
					]
				},
				hints: [
					`اكتب العبارة على شكل فرق مربعين $A^2 - B^2$ بملاحظة أن $${c * c} = ${c}^2$.`,
					`ضع $A = ${inner}$ و$B = ${c}$ في القاعدة $A^2 - B^2 = (A - B)(A + B)$.`,
					`بسّط الحدود الثابتة داخل كل قوس للحصول على ${factoredStr}.`
				],
				solutionStepsAr: [
					`نكتب $${c * c} = ${c}^2$ فتصبح العبارة $E = (${inner})^2 - ${c}^2$.`,
					`نطبّق متطابقة فرق مربعين: $E = (${inner} - ${c})(${inner} + ${c}) = ${factoredStr}$.`,
					`النشر يعطي $E = ${expandedStr}$، وقيمة $E$ عند $x = 0$ هي $${expC}$.`
				],
				finalAnswer: factoredStr
			};
		}

		if (difficulty === 'medium') {
			const a = rng.int(2, 4);
			const sb = rng.pick([1, -1]) * rng.int(1, 5);
			const c = rng.pick([1, 2, 3].filter((v) => v !== a));
			const sdPool = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].filter((v) => v !== sb && v !== -sb);
			const sd = rng.pick(sdPool);

			const common = fmtLinear(a, sb);
			const second = fmtLinear(c, sd);
			const remCoeff = a - c;
			const remConst = sb - sd;
			const remFactor = fmtLinear(remCoeff, remConst);
			const factoredStr = `(${common})(${remFactor})`;

			const expA = a * remCoeff;
			const expB = a * remConst + sb * remCoeff;
			const expC = sb * remConst;
			const expandedStr = fmtQuadratic(expA, expB, expC);

			const rad = rng.pick([2, 3, 5]);
			const evalRadConst = expA * rad + expC;

			const mcq = buildUniqueMcqOptions(
				`$${factoredStr}$`,
				[
					{
						text: `$(${common})(${fmtLinear(remCoeff, sb + sd)})$`,
						diagnosticFeedback:
							'خطأ شائع جداً: عند حذف الأقواس المسبوقة بعلامة الطرح $-(' +
							second +
							')$ نسيتَ عكس إشارة الحد الثاني!'
					},
					{
						text: `$(${common})(${fmtLinear(a + c, sb + sd)})$`,
						diagnosticFeedback:
							'انتبه للعملية بين الحدين: هي طرح $(-)$ وليست جمعاً $(+)$!'
					},
					{
						text: `$(${common})(${fmtLinear(-c, -sd)})$`,
						diagnosticFeedback:
							`عند استخراج $(${common})$ من $(${common})^2$ يتبقى $(${common})$ وليس $0$!`
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `حلّل العبارة الجبرية الآتية إلى جداء عاملين:\n\n$$E = (${common})^2 - (${common})(${second})$$`,
					questionTextAr: `حلّل العبارة $E = (${common})^2 - (${common})(${second})$ إلى جداء عاملين.`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `نستخرج العامل المشترك $(${common})$: $E = (${common})[(${common}) - (${second})] = (${common})(${common} - ${c}x ${sd > 0 ? `- ${sd}` : `+ ${Math.abs(sd)}`}) = ${factoredStr}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: `لتكن العبارة الجبرية $E = (${common})^2 - (${common})(${second})$:`,
					content: [
						{
							type: 'text',
							content: '1) انشر وبسّط العبارة $E$.',
							answer: `1) $E = ${expandedStr}$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: '2) حلّل العبارة $E$ إلى جداء عاملين من الدرجة الأولى.',
							answer: `2) $E = (${common})[(${common}) - (${second})] = ${factoredStr}$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) احسب $E$ بالصيغة الأنسب من أجل $x = ${fmtFracTypst(-sb, a)}$ ومن أجل $x = sqrt(${rad})$.`,
							answer: `3) من أجل $x = ${fmtFracTypst(-sb, a)}$ (بالصيغة المحللة): $E = 0$.\n\nمن أجل $x = sqrt(${rad})$ (بالصيغة المنشورة): $E = ${evalRadConst}${expB === 0 ? '' : expB > 0 ? ` + ${expB}sqrt(${rad})` : ` - ${Math.abs(expB)}sqrt(${rad})`}$.`,
							mark: '1'
						}
					]
				},
				hints: [
					`استخرج العامل المشترك الظاهر $(${common})$ بكتابة $(${common})^2 = (${common})(${common})$.`,
					`ضع ما يتبقى داخل عارضتين: $(${common})[(${common}) - (${second})]$.`,
					`انتبه عند نزع القوسين بعد إشارة الطرح $(-)$ لعكس إشارة كل من $${c}x$ و$${sd}$.`
				],
				solutionStepsAr: [
					`نستخرج العامل المشترك $(${common})$: $E = (${common})[(${common}) - (${second})]$.`,
					`نبسط ما بداخل العارضتين مع عكس الإشارات بعد الطرح: $(${common} - ${c}x ${sd > 0 ? `- ${sd}` : `+ ${Math.abs(sd)}`}) = (${remFactor})$.`,
					`إذن الصيغة المحللة هي $E = ${factoredStr}$ والصيغة المنشورة هي $E = ${expandedStr}$.`
				],
				finalAnswer: factoredStr
			};
		}

		// hard: Two-step BEM factorization (p^2 x^2 - q^2) ± (p x - q)(r x + s)
		const p = rng.int(2, 4);
		const q = rng.pick([1, 3, 5].filter((v) => gcd(p, v) === 1));
		const opSign = rng.pick([1, -1]);
		const r = rng.pick([1, 2, 3].filter((v) => opSign > 0 || v !== p));
		const s = rng.pick([1, 2, 3, 4].filter((v) => opSign > 0 || v !== q));

		const partDiffSq = `${p * p}x^2 - ${q * q}`;
		const fCommon = fmtLinear(p, -q);
		const fConj = fmtLinear(p, q);
		const fTail = fmtLinear(r, s);
		const secondCoeff = opSign > 0 ? p + r : p - r;
		const secondConst = opSign > 0 ? q + s : q - s;
		const fSecond = fmtLinear(secondCoeff, secondConst);
		const factoredStr = `(${fCommon})(${fSecond})`;

		const expA = p * secondCoeff;
		const expB = p * secondConst - q * secondCoeff;
		const expC = -q * secondConst;
		const expandedStr = fmtQuadratic(expA, expB, expC);

		const rad = rng.pick([2, 3, 5]);
		const radConst = expA * rad + expC;

		const mcq = buildUniqueMcqOptions(
			`$${factoredStr}$`,
			[
				{
					text: `$(${fConj})(${fmtLinear(opSign > 0 ? p + r : p - r, opSign > 0 ? s - q : -q - s)})$`,
					diagnosticFeedback:
						`تحقّق من تحليل $${partDiffSq}$: العامل المشترك مع $(${fCommon})$ هو $(${fCommon})$ وليس $(${fConj})$.`
				},
				{
					text: `$(${fCommon})(${fmtLinear(opSign > 0 ? p + r : p - r, opSign > 0 ? q - s : q + s)})$`,
					diagnosticFeedback:
						opSign < 0
							? 'انتبه لعكس إشارات القوس الثاني عند الطرح: $-[(r x + s)] = -r x - s$!'
							: 'راجع جمع الثوابت داخل العارضتين بدقة.'
				},
				{
					text: `$(${p * p}x - ${q})(${fmtLinear(p * p + r, q + s)})$`,
					diagnosticFeedback:
						`انتبه: $${p * p}x^2 = (${p}x)^2$ وليس $(${p * p}x)^2$!`
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `حلّل العبارة الجبرية الآتية إلى جداء عاملين من الدرجة الأولى (على مرحلتين):\n\n$$E = (${partDiffSq}) ${opSign > 0 ? '+' : '-'} (${fCommon})(${fTail})$$`,
				questionTextAr: `حلّل العبارة $E = (${partDiffSq}) ${opSign > 0 ? '+' : '-'} (${fCommon})(${fTail})$ على مرحلتين.`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نحلل أولاً $${partDiffSq} = (${fCommon})(${fConj})$، ثم نستخرج العامل المشترك $(${fCommon})$ فنجد $E = ${factoredStr}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `لتكن العبارة الجبرية $E = (${partDiffSq}) ${opSign > 0 ? '+' : '-'} (${fCommon})(${fTail})$:`,
				content: [
					{
						type: 'text',
						content: `1) حلّل الجزء $(${partDiffSq})$، ثم استنتج تحليلاً للعبارة $E$ إلى جداء عاملين من الدرجة الأولى.`,
						answer: `1) لدينا $${partDiffSq} = (${fCommon})(${fConj})$.\n\nإذن $E = (${fCommon})[(${fConj}) ${opSign > 0 ? '+' : '-'} (${fTail})] = ${factoredStr}$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '2) انشر وبسّط العبارة $E$.',
						answer: `2) $E = ${expandedStr}$.`,
						mark: '0.75'
					},
					{
						type: 'text',
						content: `3) احسب $E$ بالصيغة الأنسب من أجل $x = ${fmtFracTypst(q, p)}$ ومن أجل $x = sqrt(${rad})$.`,
						answer: `3) من أجل $x = ${fmtFracTypst(q, p)}$ (بالصيغة المحللة): $E = 0$.\n\nمن أجل $x = sqrt(${rad})$ (بالصيغة المنشورة): $E = ${radConst}${expB === 0 ? '' : expB > 0 ? ` + ${expB}sqrt(${rad})` : ` - ${Math.abs(expB)}sqrt(${rad})`}$.`,
						mark: '0.75'
					}
				]
			},
			hints: [
				`ابدأ بتحليل $${partDiffSq} = (${p}x)^2 - ${q}^2$ باستعمال متطابقة فرق مربعين.`,
				`بعد المرحلة الأولى يظهر العامل المشترك $(${fCommon})$، استخرجه.`,
				opSign < 0
					? `انتبه لإشارة الطرح قبل $(${fTail})$ عند جمع الحدود داخل العارضتين.`
					: `بسّط مجموع القوسين $(${fConj}) + (${fTail})$ داخل العارضتين.`
			],
			solutionStepsAr: [
				`المرحلة 1: نحلّل $${partDiffSq} = (${fCommon})(${fConj})$.`,
				`المرحلة 2: نستخرج العامل المشترك $(${fCommon})$ فنحصل على $E = (${fCommon})[(${fConj}) ${opSign > 0 ? '+' : '-'} (${fTail})] = ${factoredStr}$.`,
				`النشر يعطي $E = ${expandedStr}$، وعند $x = ${fmtFracKatex(q, p)}$ تنعدم $E = 0$.`
			],
			finalAnswer: factoredStr
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Zero-Product Equations & 1st-Degree Inequalities + Number Line (numeric, 3 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const zeroProductInequalitiesTemplate: ParameterizedTemplate = {
	id: '4am_t2_zero_product_inequalities',
	grade: '4am',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'معادلة الجداء المعدوم والمتراجحات من الدرجة الأولى وتمثيل حلولها',
	curriculumLessonId: 'lesson_4am_t2_zero_product_equations_inequalities',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Secondary number line figure for Sujet Part 3 (reading inequality from graph)
		const figBound = rng.int(-3, 4);
		const figOp: IneqOp = rng.pick(['>=', '>', '<=', '<']);
		const figSvg = svgInequalityNumberLine({ bound: figBound, op: figOp, showLabel: false });
		const figUrl = saveSvgAsset(`4am_t2_ineq_fig_${difficulty}_${seed}`, figSvg);
		const figIncluded = figOp === '>=' || figOp === '<=';

		if (difficulty === 'easy') {
			const r1 = rng.int(-4, 4);
			const r2 = rng.pick([-4, -3, -2, -1, 1, 2, 3, 4].filter((v) => v !== r1));
			const a1 = rng.pick([1, 2]);
			const eqF1 = fmtLinear(a1, -a1 * r1);
			const eqF2 = fmtLinear(1, -r2);

			const k = rng.int(2, 4);
			const bound = rng.int(-3, 4);
			const op: IneqOp = rng.pick(['>=', '<=', '>', '<']);
			const c = rng.pick([-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6]);
			const rhs = k * bound + c;

			// Quiz SVG shows a clean inequality number line for identification
			const qBound = rng.int(-3, 4);
			const qOp: IneqOp = rng.pick(['>=', '>', '<=', '<']);
			const qSvg = svgInequalityNumberLine({ bound: qBound, op: qOp, showLabel: false });
			const qUrl = saveSvgAsset(`4am_t2_ineq_quiz_${difficulty}_${seed}`, qSvg);

			const opsAll: IneqOp[] = ['>=', '>', '<=', '<'];
			const correctText = `$x ${opToKatex(qOp)} ${qBound}$`;
			const distractorOps = opsAll.filter((o) => o !== qOp);
			const mcq = buildUniqueMcqOptions(
				correctText,
				distractorOps.map((dOp) => ({
					text: `$x ${opToKatex(dOp)} ${qBound}$`,
					diagnosticFeedback:
						(dOp === '>' || dOp === '>=') !== (qOp === '>' || qOp === '>=')
							? 'انظر إلى الجهة الملوّنة بالأزرق (الحلول) وإلى الجهة المشطوبة بالأحمر!'
							: `تحقق من اتجاه العارضة عند $${qBound}$: إذا فُتحت نحو الحلول فالقيمة مقبولة ($\\le$ أو $\\ge$)، وإذا فُتحت نحو الجزء المشطوب فهي مرفوضة ($<$ أو $>$).`
				})),
				rng
			);

			const qBoundaryIncluded = qOp === '>=' || qOp === '<=';

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText:
						'يمثّل الجزء الأزرق على المستقيم المدرج المقابل (مع شطب الجزء الأحمر) مجموعة حلول إحدى المتراجحات الآتية. أي متراجحة يمثلها؟',
					questionTextAr:
						'ما هي المتباينة التي يمثلها الجزء الأزرق على المستقيم المدرج المقابل؟',
					imageUrl: qUrl,
					imageCaption: 'تمثيل مجموعة حلول متراجحة على مستقيم مدرج',
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `الجزء الأزرق يشمل القيم ${opDescAr(qOp)} ${qBound}، والعارضة موجهة نحو ${qBoundaryIncluded ? 'الحلول (القيمة الحدية مقبولة)' : 'الجزء المشطوب (القيمة الحدية مرفوضة)'}، إذن الحلول هي $x ${opToKatex(qOp)} ${qBound}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'أجب عن الأسئلة الآتية مع توضيح خطوات الحل:',
					content: [
						{
							type: 'text',
							content: `1) حل المعادلة: $(${eqF1})(${eqF2}) = 0$.`,
							answer: `1) معادلة جداء معدوم: إما $${eqF1} = 0$ ومنه $x = ${r1}$ ، أو $${eqF2} = 0$ ومنه $x = ${r2}$. للمعادلة حلان هما $${r1}$ و $${r2}$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) حل المتراجحة الآتية ثم مثّل مجموعة حلولها على مستقيم مدرج: $${fmtLinear(k, c)} ${opToTypst(op)} ${rhs}$.`,
							answer: `2) $${k}x ${opToTypst(op)} ${rhs - c}$ ، وبالقسمة على $${k} > 0$ نجد $x ${opToTypst(op)} ${bound}$.\n\nالتمثيل: على مستقيم مدرج نُعلّم $${bound}$، نلوّن جهة القيم ${opDescAr(op)} $${bound}$ كحلول ونشطب الجهة الأخرى، ونفتح العارضة نحو ${op === '>=' || op === '<=' ? 'الحلول' : 'الجزء المشطوب'}.`,
							mark: '1'
						},
						{
							type: 'columns',
							widths: ['1.2fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `3) يمثّل الجزء الأزرق في الشكل المقابل مجموعة حلول متراجحة. اكتب المتباينة الموافقة بدلالة $x$، وهل العدد $${figBound}$ حلّ لها؟`,
									answer: `3) المتباينة هي $x ${opToTypst(figOp)} ${figBound}$، والعدد $${figBound}$ ${figIncluded ? 'حلّ لها لأن العارضة موجهة نحو الحلول' : 'ليس حلاً لها لأن العارضة موجهة نحو الجزء المشطوب'}.`,
									mark: '1'
								},
								{
									type: 'image',
									src: figUrl,
									caption: 'مستقيم مدرج (الأزرق: الحلول، الأحمر: مرفوض)'
								}
							]
						}
					]
				},
				hints: [
					'حدّد أولاً اتجاه الجزء الأزرق (يمين العدد الحدي يعني أكبر، ويساره يعني أصغر).',
					`تحقق من القيمة الحدية $${qBound}$: العارضة المفتوحة نحو الأزرق تعني أن $${qBound}$ ينتمي إلى الحلول.`,
					'العارضة المفتوحة نحو الجزء الأحمر المشطوب تعني أن القيمة الحدية مرفوضة ($<$ أو $>$).'
				],
				solutionStepsAr: [
					`على المستقيم المدرج، اللون الأزرق يقع ${qOp === '>' || qOp === '>=' ? `على يمين $${qBound}$` : `على يسار $${qBound}$`}.`,
					`العارضة عند $${qBound}$ موجهة نحو ${qBoundaryIncluded ? 'الحلول الزرقاء، إذن العلامة تشمل المساواة' : 'الجزء المشطوب، إذن العلامة قطعية دون مساواة'}.`,
					`وبالتالي مجموعة الحلول الممثلة هي كل قيم $x$ التي تحقق $x ${opToKatex(qOp)} ${qBound}$.`
				],
				finalAnswer: `x ${opToKatex(qOp)} ${qBound}`
			};
		}

		if (difficulty === 'medium') {
			// Negative coefficient inequality (flips sign!)
			const k = rng.int(2, 5);
			const bound = rng.pick([-4, -3, -2, -1, 1, 2, 3, 4]);
			const initOp: IneqOp = rng.pick(['>=', '<=', '>', '<']);
			const finalOp = flipIneqOp(initOp);
			const c = rng.pick([-9, -7, -5, -3, -2, 2, 3, 5, 7, 9]);
			const rhs = -k * bound + c;

			// Zero-product equation with one irreducible fraction
			const a1 = rng.pick([2, 3, 4]);
			const b1 = rng.pick([-5, -3, -1, 1, 3, 5].filter((v) => gcd(a1, Math.abs(v)) === 1));
			const r2 = rng.pick([-4, -3, -2, 1, 2, 3, 4]);
			const eqF1 = fmtLinear(a1, b1);
			const eqF2 = fmtLinear(1, -r2);

			const correctKatex = `$x ${opToKatex(finalOp)} ${bound}$`;
			const mcq = buildUniqueMcqOptions(
				correctKatex,
				[
					{
						text: `$x ${opToKatex(initOp)} ${bound}$`,
						diagnosticFeedback:
							`خطأ شائع جداً: عند قسمة طرفي المتراجحة على العدد السالب $-${k}$ يجب **عكس اتجاه المتباينة**!`
					},
					{
						text: `$x ${opToKatex(finalOp)} ${-bound}$`,
						diagnosticFeedback:
							'عكستَ اتجاه المتباينة بشكل صحيح، لكن تحقق من إشارة القسمة على العدد السالب.'
					},
					{
						text: `$x ${opToKatex(initOp)} ${-bound}$`,
						diagnosticFeedback:
							'تحقق من إشارة الناتج ومن عكس اتجاه المتباينة عند القسمة على عدد سالب تماماً.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `حل المتراجحة الآتية من الدرجة الأولى بمجهول واحد:\n\n$$${fmtLinear(-k, c)} ${opToKatex(initOp)} ${rhs}$$`,
					questionTextAr: `ما هي مجموعة حلول المتراجحة $${fmtLinear(-k, c)} ${opToKatex(initOp)} ${rhs}$؟`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `ننقل ${c} إلى الطرف الآخر: $-${k}x ${opToKatex(initOp)} ${-k * bound}$. نقسم على العدد السالب $-${k}$ مع عكس اتجاه المتباينة: $x ${opToKatex(finalOp)} ${bound}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'حل المعادلة والمتراجحة الآتيتين بدقة:',
					content: [
						{
							type: 'text',
							content: `1) حل معادلة الجداء المعدوم: $(${eqF1})(${eqF2}) = 0$.`,
							answer: `1) إما $${eqF1} = 0$ ومنه $x = ${fmtFracTypst(-b1, a1)}$ ، أو $${eqF2} = 0$ ومنه $x = ${r2}$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) حل المتراجحة $${fmtLinear(-k, c)} ${opToTypst(initOp)} ${rhs}$، ثم مثّل حلولها على مستقيم مدرج.`,
							answer: `2) $-${k}x ${opToTypst(initOp)} ${-k * bound}$ ، وبقسمة الطرفين على $-${k} < 0$ ينعكس الاتجاه إلى $x ${opToTypst(finalOp)} ${bound}$.\n\nعلى المستقيم المدرج: نحتفظ بالقيم ${opDescAr(finalOp)} $${bound}$ ونشطب الجزء الآخر (العارضة موجهة نحو ${finalOp === '>=' || finalOp === '<=' ? 'الحلول' : 'الجزء المشطوب'}).`,
							mark: '1.25'
						},
						{
							type: 'columns',
							widths: ['1.2fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `3) يمثّل الشكل المقابل مجموعة حلول متراجحة. اكتب المتباينة التي يمثلها، واذكر أكبر أو أصغر قيمة حدية فيها وهل العدد $${figBound}$ مقبول.`,
									answer: `3) المتباينة هي $x ${opToTypst(figOp)} ${figBound}$، والعدد $${figBound}$ ${figIncluded ? 'مقبول' : 'مرفوض'}.`,
									mark: '0.75'
								},
								{
									type: 'image',
									src: figUrl,
									caption: 'تمثيل مجموعة حلول متراجحة'
								}
							]
						}
					]
				},
				hints: [
					`اعزل الحد $-${k}x$ بنقل $${c}$ إلى الطرف الثاني بعكس إشارته: $-${k}x ${opToKatex(initOp)} ${rhs - c}$.`,
					`انتبه! معامل $x$ سالب تماماً ($-${k} < 0$).`,
					'عند القسمة على عدد سالب تماماً نعكس اتجاه المتباينة.'
				],
				solutionStepsAr: [
					`نطرح $${c}$ من الطرفين: $-${k}x ${opToKatex(initOp)} ${-k * bound}$.`,
					`نقسم الطرفين على $-${k} < 0$ مع عكس اتجاه المتباينة: $x ${opToKatex(finalOp)} ${bound}$.`,
					`تمثيل الحلول: كل الأعداد ${opDescAr(finalOp)} $${bound}$.`
				],
				finalAnswer: `x ${opToKatex(finalOp)} ${bound}`
			};
		}

		// hard: Reducible equation (ax + b)^2 - c^2 = 0 + two-sided inequality with negative resulting coeff
		const a = rng.int(1, 3);
		const b = rng.int(1, 5);
		const c = rng.pick([2, 3, 4, 5, 6].filter((v) => v !== b));
		const f1 = fmtLinear(a, b - c);
		const f2 = fmtLinear(a, b + c);

		const p = rng.int(2, 4);
		const deltaCoeff = rng.int(2, 4);
		const r = p + deltaCoeff; // p - r = -deltaCoeff < 0
		const bound = rng.int(-3, 3);
		const initOp: IneqOp = rng.pick(['<=', '<', '>=', '>']);
		const finalOp = flipIneqOp(initOp);
		const q = rng.int(-5, 6);
		const s = q - deltaCoeff * bound; // (p - r)x op s - q => -deltaCoeff x op -deltaCoeff * bound => x finalOp bound

		let extremeInt: number;
		let extremePromptAr: string;
		if (finalOp === '>=') {
			extremeInt = bound;
			extremePromptAr = 'أصغر عدد صحيح نسبي يحقق هذه المتراجحة';
		} else if (finalOp === '>') {
			extremeInt = bound + 1;
			extremePromptAr = 'أصغر عدد صحيح نسبي يحقق هذه المتراجحة';
		} else if (finalOp === '<=') {
			extremeInt = bound;
			extremePromptAr = 'أكبر عدد صحيح نسبي يحقق هذه المتراجحة';
		} else {
			extremeInt = bound - 1;
			extremePromptAr = 'أكبر عدد صحيح نسبي يحقق هذه المتراجحة';
		}

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `حل المتراجحة الآتية، ثم أوجد ${extremePromptAr}:\n\n$$${fmtLinear(p, q)} ${opToKatex(initOp)} ${fmtLinear(r, s)}$$`,
				questionTextAr: `حل المتراجحة $${fmtLinear(p, q)} ${opToKatex(initOp)} ${fmtLinear(r, s)}$ ثم عيّن ${extremePromptAr}.`,
				questionData: {
					answer: extremeInt,
					displayTemplate: `${extremePromptAr} = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `ننقل ${r}x إلى اليسار و${q} إلى اليمين: -${deltaCoeff}x ${opToKatex(initOp)} ${-deltaCoeff * bound}. بالقسمة على -${deltaCoeff} ينعكس الاتجاه إلى x ${opToKatex(finalOp)} ${bound}، إذن ${extremePromptAr} هو ${extremeInt}.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'حل المعادلة والمتراجحة الآتيتين مع التبرير:',
				content: [
					{
						type: 'text',
						content: `1) حلّل العبارة $E = (${fmtLinear(a, b)})^2 - ${c * c}$، ثم حل المعادلة $E = 0$.`,
						answer: `1) $E = (${f1})(${f2})$.\n\nالمعادلة $E = 0$ تكافئ $${f1} = 0$ أو $${f2} = 0$، إذن الحلان هما $x = ${fmtFracTypst(c - b, a)}$ و $x = ${fmtFracTypst(-c - b, a)}$.`,
						mark: '1.25'
					},
					{
						type: 'text',
						content: `2) حل المتراجحة $${fmtLinear(p, q)} ${opToTypst(initOp)} ${fmtLinear(r, s)}$ ثم عيّن ${extremePromptAr}.`,
						answer: `2) $${p}x - ${r}x ${opToTypst(initOp)} ${s} - ${q}$ أي $-${deltaCoeff}x ${opToTypst(initOp)} ${-deltaCoeff * bound}$.\n\nبقسمة الطرفين على $-${deltaCoeff} < 0$ ينعكس الاتجاه إلى $x ${opToTypst(finalOp)} ${bound}$، و${extremePromptAr} هو $${extremeInt}$.`,
						mark: '1'
					},
					{
						type: 'columns',
						widths: ['1.2fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `3) يمثّل المستقيم المدرج المقابل حلول متراجحة. اكتبها بدلالة $x$، وهل العدد $${figBound}$ ينتمي إلى مجموعة حلولها؟`,
								answer: `3) الحلول الممثلة هي $x ${opToTypst(figOp)} ${figBound}$، والعدد $${figBound}$ ${figIncluded ? 'ينتمي إلى الحلول' : 'لا ينتمي إلى الحلول'}.`,
								mark: '0.75'
							},
							{
								type: 'image',
								src: figUrl,
								caption: 'تمثيل مجموعة حلول على مستقيم مدرج'
							}
						]
					}
				]
			},
			hints: [
				`انقل حدود $x$ إلى طرف واحد والثوابت إلى الطرف الآخر لتحصل على $-${deltaCoeff}x ${opToKatex(initOp)} ${-deltaCoeff * bound}$.`,
				`اقسم على $-${deltaCoeff}$ ولا تنسَ قلب اتجاه المتباينة من $${opToKatex(initOp)}$ إلى $${opToKatex(finalOp)}$.`,
				`تأكد هل القيمة الحدية $${bound}$ مقبولة (عند $\\le$ أو $\\ge$) أم مرفوضة (عند $<$ أو $>$) قبل تحديد العدد الصحيح.`
			],
			solutionStepsAr: [
				`عزل المجهول: $${p}x - ${r}x ${opToKatex(initOp)} ${s} - ${q} \\implies -${deltaCoeff}x ${opToKatex(initOp)} ${-deltaCoeff * bound}$.`,
				`القسمة على $-${deltaCoeff} < 0$ تعطي $x ${opToKatex(finalOp)} ${bound}$.`,
				`وبالتالي ${extremePromptAr} هو $${extremeInt}$.`
			],
			finalAnswer: String(extremeInt)
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Vectors, Equality, Chasles & Parallelogram (geometry, 3 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const vectorsChaslesTemplate: ParameterizedTemplate = {
	id: '4am_t2_vectors_chasles_parallelogram',
	grade: '4am',
	trimesterId: 't2',
	domain: 'geometry',
	titleAr: 'الأشعة والانسحاب: تساوي شعاعين، علاقة شال ومتوازي الأضلاع',
	curriculumLessonId: 'lesson_4am_t2_vector_addition_chasles_proofs',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const letterSets: [string, string, string, string, string][] = [
			['A', 'B', 'C', 'D', 'E'],
			['E', 'F', 'G', 'H', 'K'],
			['M', 'N', 'P', 'Q', 'R'],
			['I', 'J', 'K', 'L', 'S']
		];
		const [L0, L1, L2, L3, L4] = rng.pick(letterSets);
		const centerLbl = L0 === 'O' ? 'I' : 'O';

		if (difficulty === 'easy') {
			const svg = svgVectorGridFigure({
				mode: 'parallelogram',
				labels: [L0, L1, L2, L3],
				centerLabel: centerLbl
			});
			const imageUrl = saveSvgAsset(`4am_t2_vec_para_${difficulty}_${seed}`, svg);

			const correctEq = `$${fmtVecKatex(L0, L1)} = ${fmtVecKatex(L3, L2)}$`;
			const mcq = buildUniqueMcqOptions(
				correctEq,
				[
					{
						text: `$${fmtVecKatex(L0, L1)} = ${fmtVecKatex(L2, L3)}$`,
						diagnosticFeedback:
							`الشعاعان $${fmtVecKatex(L0, L1)}$ و$${fmtVecKatex(L2, L3)}$ متعاكسان في الاتجاه! الصحيح هو $${fmtVecKatex(L3, L2)}$.`
					},
					{
						text: `$${fmtVecKatex(L0, L3)} = ${fmtVecKatex(L2, L1)}$`,
						diagnosticFeedback:
							`انتبه للاتجاه: $${fmtVecKatex(L0, L3)}$ يتجه من $${L0}$ نحو $${L3}$ بينما $${fmtVecKatex(L2, L1)}$ يتجه في الاتجاه المعاكس!`
					},
					{
						text: `$${fmtVecKatex(L0, L2)} = ${fmtVecKatex(L1, L3)}$`,
						diagnosticFeedback:
							`القطعتان $[${L0}${L2}]$ و$[${L1}${L3}]$ هما قطرا متوازي الأضلاع، ولا يتوازيان ولا يتساويان شعاعياً.`
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `في الشكل المقابل، الرباعي $${L0}${L1}${L2}${L3}$ متوازي أضلاع مركزه $${centerLbl}$. أيٌّ من المساويات الشعاعية الآتية **صحيحة**؟`,
					questionTextAr: `في متوازي الأضلاع $${L0}${L1}${L2}${L3}$، أيّ مساواة شعاعية صحيحة؟`,
					imageUrl,
					imageCaption: `متوازي الأضلاع ${L0}${L1}${L2}${L3} مركزه ${centerLbl}`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `في متوازي الأضلاع $${L0}${L1}${L2}${L3}$، الضلعان المتقابلان $[${L0}${L1}]$ و$[${L3}${L2}]$ متوازيان ومتقايسان ولهما نفس الاتجاه، إذن $${fmtVecKatex(L0, L1)} = ${fmtVecKatex(L3, L2)}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: `ليكن $${L0} ${L1} ${L2} ${L3}$ متوازي أضلاع مركزه $${centerLbl}$ كما في الشكل المقابل:`,
					content: [
						{
							type: 'columns',
							widths: ['1.4fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) اذكر شعاعاً يساوي $${fmtVecTypst(L0, L1)}$، وشعاعاً يعاكس $${fmtVecTypst(L0, L3)}$، ثم بسّط المجموع $${fmtVecTypst(centerLbl, L0)} + ${fmtVecTypst(centerLbl, L2)}$.\n\n2) بسّط باستعمال علاقة شال أو قاعدة متوازي الأضلاع:\n$u = ${fmtVecTypst(L0, L1)} + ${fmtVecTypst(L1, L2)}$ و $v = ${fmtVecTypst(L0, L1)} + ${fmtVecTypst(L0, L3)}$.\n\n3) لتكن $${L4}$ نظيرة $${L0}$ بالنسبة إلى $${L1}$. بيّن أن $${fmtVecTypst(L1, L4)} = ${fmtVecTypst(L3, L2)}$ واستنتج طبيعة الرباعي $${L1} ${L4} ${L2} ${L3}$.`,
									answer: `1) $${fmtVecTypst(L0, L1)} = ${fmtVecTypst(L3, L2)}$، ويعاكس $${fmtVecTypst(L0, L3)}$ هو $${fmtVecTypst(L3, L0)}$ (أو $${fmtVecTypst(L2, L1)}$)، وبما أن $${centerLbl}$ منتصف $[${L0} ${L2}]$ فإن $${fmtVecTypst(centerLbl, L0)} + ${fmtVecTypst(centerLbl, L2)} = arrow(0)$.\n\n2) $u = ${fmtVecTypst(L0, L2)}$ (علاقة شال)، و $v = ${fmtVecTypst(L0, L2)}$ (قاعدة متوازي الأضلاع).\n\n3) بما أن $${L1}$ منتصف $[${L0} ${L4}]$ فإن $${fmtVecTypst(L1, L4)} = ${fmtVecTypst(L0, L1)}$، ولدينا $${fmtVecTypst(L0, L1)} = ${fmtVecTypst(L3, L2)}$، إذن $${fmtVecTypst(L1, L4)} = ${fmtVecTypst(L3, L2)}$، ومنه الرباعي $${L1} ${L4} ${L2} ${L3}$ متوازي أضلاع.`,
									mark: '3'
								},
								{
									type: 'image',
									src: imageUrl,
									caption: `متوازي الأضلاع ${L0}${L1}${L2}${L3}`
								}
							]
						}
					]
				},
				hints: [
					'تساوي شعاعين يعني أن لهما نفس المنحى (التوازي)، نفس الطول، ونفس الاتجاه.',
					`لاحظ في متوازي الأضلاع $${L0}${L1}${L2}${L3}$ اتجاه السهم من $${L0}$ نحو $${L1}$ يوافق الاتجاه من $${L3}$ نحو $${L2}$.`,
					`في متوازي الأضلاع، القطران غير متساويين شعاعياً، والضلعان المتقابلان المأخوذان في اتجاهين متعاكسين يعطيان شعاعين متعاكسين.`
				],
				solutionStepsAr: [
					`الضلعان $[${L0}${L1}]$ و$[${L3}${L2}]$ متقابلان في متوازي الأضلاع $${L0}${L1}${L2}${L3}$، إذن هما متوازيان ومتقايسان.`,
					`الاتجاه من $${L0}$ إلى $${L1}$ يطابق الاتجاه من $${L3}$ إلى $${L2}$، وبالتالي $${fmtVecKatex(L0, L1)} = ${fmtVecKatex(L3, L2)}$.`
				],
				finalAnswer: `${fmtVecKatex(L0, L1)} = ${fmtVecKatex(L3, L2)}`
			};
		}

		if (difficulty === 'medium') {
			const svg = svgVectorGridFigure({
				mode: 'chasles_triangle',
				labels: [L0, L1, L2, L3]
			});
			const imageUrl = saveSvgAsset(`4am_t2_vec_chasles_${difficulty}_${seed}`, svg);

			// Build randomized 3-term Chasles chain with subtractions
			const pts = rng.shuffle([L0, L1, L2, L3]);
			const [p0, p1, p2, p3] = pts;
			// Chain: p0->p1 + p1->p2 + p2->p3 = p0->p3
			// Express middle term as - (p2 p1) to test vector subtraction
			const exprU_Katex = `${fmtVecKatex(p0, p1)} - ${fmtVecKatex(p2, p1)} + ${fmtVecKatex(p2, p3)}`;
			const exprU_Typst = `${fmtVecTypst(p0, p1)} - ${fmtVecTypst(p2, p1)} + ${fmtVecTypst(p2, p3)}`;
			const ansU_Katex = fmtVecKatex(p0, p3);
			const ansU_Typst = fmtVecTypst(p0, p3);

			const exprV_Katex = `${fmtVecKatex(p0, p1)} - ${fmtVecKatex(p2, p1)} - ${fmtVecKatex(p0, p2)}`;
			const exprV_Typst = `${fmtVecTypst(p0, p1)} - ${fmtVecTypst(p2, p1)} - ${fmtVecTypst(p0, p2)}`;

			// Matching pairs (all distinct left and right strings!)
			const distinctPairs = [
				{
					left: `$${fmtVecKatex(p0, p1)} + ${fmtVecKatex(p1, p2)}$`,
					right: `$${fmtVecKatex(p0, p2)}$`
				},
				{
					left: `$${fmtVecKatex(p1, p0)} - ${fmtVecKatex(p2, p0)}$`,
					right: `$${fmtVecKatex(p1, p2)}$`
				},
				{
					left: `$${fmtVecKatex(p0, p1)} + ${fmtVecKatex(p1, p0)}$`,
					right: `$\\vec{0}$`
				},
				{
					left: `$${exprU_Katex}$`,
					right: `$${ansU_Katex}$`
				}
			];

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'matching',
					questionText:
						'اربط كل عبارة شعاعية في العمود الأول بتبسيطها الصحيح باستعمال علاقة شال وخواص الأشعة المتعاكسة:',
					questionTextAr: 'اربط كل عبارة شعاعية بتبسيطها الصحيح.',
					questionData: {
						pairs: distinctPairs
					},
					explanation: `باستعمال علاقة شال وتعويض الطرح بجمع الشعاع المعاكس: $-${fmtVecKatex(p2, p0)} = +${fmtVecKatex(p0, p2)}$، ومنه $${fmtVecKatex(p1, p0)} + ${fmtVecKatex(p0, p2)} = ${fmtVecKatex(p1, p2)}$، و$${exprU_Katex} = ${ansU_Katex}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'أجب عن الأسئلة الآتية باستعمال علاقة شال وخواص الأشعة:',
					content: [
						{
							type: 'columns',
							widths: ['1.4fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) انطلاقاً من الشكل المقابل، اكتب المساواة الشعاعية المعبرة عن علاقة شال بين النقط $${L0}$ و $${L1}$ و $${L2}$.\n\n2) بسّط العبارتين الشعاعيتين الآتيتين:\n$u = ${exprU_Typst}$\n$v = ${exprV_Typst}$\n\n3) أنشئ النقطة $${L4}$ بحيث $${fmtVecTypst(L0, L4)} = ${fmtVecTypst(L0, L1)} + ${fmtVecTypst(L0, L2)}$، وما نوع الرباعي $${L0} ${L1} ${L4} ${L2}$؟`,
									answer: `1) $${fmtVecTypst(L0, L1)} + ${fmtVecTypst(L1, L2)} = ${fmtVecTypst(L0, L2)}$.\n\n2) $u = ${fmtVecTypst(p0, p1)} + ${fmtVecTypst(p1, p2)} + ${fmtVecTypst(p2, p3)} = ${ansU_Typst}$.\n\n$v = ${fmtVecTypst(p0, p1)} + ${fmtVecTypst(p1, p2)} + ${fmtVecTypst(p2, p0)} = ${fmtVecTypst(p0, p2)} + ${fmtVecTypst(p2, p0)} = arrow(0)$.\n\n3) الرباعي $${L0} ${L1} ${L4} ${L2}$ متوازي أضلاع (قاعدة متوازي الأضلاع).`,
									mark: '3'
								},
								{
									type: 'image',
									src: imageUrl,
									caption: `تركيب انسحابين (علاقة شال)`
								}
							]
						}
					]
				},
				hints: [
					'لتحويل طرح شعاع إلى جمع، نعكس ترتيب الحرفين: $-\\overrightarrow{XY} = +\\overrightarrow{YX}$.',
					'في علاقة شال، إذا كانت نهاية الأول هي نفسها بداية الثاني فإن $\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$.',
					'مجموع شعاعين متعاكسين $\\overrightarrow{AB} + \\overrightarrow{BA}$ يساوي دائماً الشعاع المعدوم $\\vec{0}$.'
				],
				solutionStepsAr: [
					`في الأولى: $${fmtVecKatex(p0, p1)} + ${fmtVecKatex(p1, p2)} = ${fmtVecKatex(p0, p2)}$.`,
					`في الثانية: $${fmtVecKatex(p1, p0)} - ${fmtVecKatex(p2, p0)} = ${fmtVecKatex(p1, p0)} + ${fmtVecKatex(p0, p2)} = ${fmtVecKatex(p1, p2)}$.`,
					`في الرابعة: $${exprU_Katex} = ${fmtVecKatex(p0, p1)} + ${fmtVecKatex(p1, p2)} + ${fmtVecKatex(p2, p3)} = ${ansU_Katex}$.`
				],
				finalAnswer: ansU_Katex
			};
		}

		// hard: Parallelogram rule + translation midpoint proof
		const svg = svgVectorGridFigure({
			mode: 'same_origin',
			labels: [L0, L1, L2, L3]
		});
		const imageUrl = saveSvgAsset(`4am_t2_vec_rule_${difficulty}_${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`النقطة $${L2}$ منتصف القطعة $[${L3}${L4}]$`,
			[
				{
					text: `النقطة $${L3}$ منتصف القطعة $[${L2}${L4}]$`,
					diagnosticFeedback:
						`تحقق من المساواتين: لدينا $${fmtVecKatex(L3, L2)} = ${fmtVecKatex(L1, L0)}$ و$${fmtVecKatex(L2, L4)} = ${fmtVecKatex(L1, L0)}$، إذن $${L2}$ هي المنتصف!`
				},
				{
					text: `الرباعي $${L0}${L1}${L2}${L4}$ متوازي أضلاع`,
					diagnosticFeedback:
						`انتبه إلى علاقة الانسحاب: $${fmtVecKatex(L2, L4)} = ${fmtVecKatex(L1, L0)}$ وليس $${fmtVecKatex(L0, L1)}$؛ فالرباعي متوازي أضلاع هو $${L0}${L1}${L2}${L4}$ فقط إذا كان $${fmtVecKatex(L0, L1)} = ${fmtVecKatex(L4, L2)}$ وهو هنا $${L0}${L1}${L2}${L4}$... انتبه! $${fmtVecKatex(L1, L0)} = ${fmtVecKatex(L2, L4)}$ يعطي $${L1}${L0}${L4}${L2}$ متوازي أضلاع وليس $${L0}${L1}${L2}${L4}$!`
				},
				{
					text: `$${fmtVecKatex(L3, L4)} = \\vec{0}$`,
					diagnosticFeedback:
						`بما أن $${fmtVecKatex(L3, L2)} = ${fmtVecKatex(L2, L4)}$، فإن $${fmtVecKatex(L3, L4)} = ${fmtVecKatex(L3, L2)} + ${fmtVecKatex(L2, L4)} \\neq \\vec{0}$.`
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `ليكن $${L0}${L1}${L2}$ مثلثاً. نعتبر النقطة $${L3}$ بحيث $${fmtVecKatex(L0, L3)} = ${fmtVecKatex(L0, L1)} + ${fmtVecKatex(L0, L2)}$، والنقطة $${L4}$ صورة $${L2}$ بالانسحاب الذي يحوّل $${L1}$ إلى $${L0}$. ماذا نستنتج عن النقطة $${L2}$؟`,
				questionTextAr: `في المعطيات $${fmtVecKatex(L0, L3)} = ${fmtVecKatex(L0, L1)} + ${fmtVecKatex(L0, L2)}$ و$${fmtVecKatex(L2, L4)} = ${fmtVecKatex(L1, L0)}$، ماذا تمثل $${L2}$؟`,
				imageUrl,
				imageCaption: `قاعدة متوازي الأضلاع في الشكل`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `من $${fmtVecKatex(L0, L3)} = ${fmtVecKatex(L0, L1)} + ${fmtVecKatex(L0, L2)}$ فإن $${L0}${L1}${L3}${L2}$ متوازي أضلاع ومنه $${fmtVecKatex(L3, L2)} = ${fmtVecKatex(L1, L0)}$. ومن الانسحاب $${fmtVecKatex(L2, L4)} = ${fmtVecKatex(L1, L0)}$. إذن $${fmtVecKatex(L3, L2)} = ${fmtVecKatex(L2, L4)}$ أي $${L2}$ منتصف $[${L3}${L4}]$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `ليكن $${L0} ${L1} ${L2}$ مثلثاً كيفياً (انظر الشكل المقابل حيث $${fmtVecTypst(L0, L3)} = ${fmtVecTypst(L0, L1)} + ${fmtVecTypst(L0, L2)}$):`,
				content: [
					{
						type: 'columns',
						widths: ['1.4fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) بسّط العبارة الشعاعية: $w = ${fmtVecTypst(L1, L0)} + ${fmtVecTypst(L0, L3)} - ${fmtVecTypst(L1, L2)}$.\n\n2) استنتج من المساواة المعطاة طبيعة الرباعي $${L0} ${L1} ${L3} ${L2}$ ثم اكتب شعاعاً يساوي $${fmtVecTypst(L1, L0)}$.\n\n3) لتكن $${L4}$ صورة $${L2}$ بالانسحاب الذي يحوّل $${L1}$ إلى $${L0}$. برهن أن $${L2}$ منتصف القطعة $[${L3} ${L4}]$.`,
								answer: `1) $w = ${fmtVecTypst(L1, L3)} + ${fmtVecTypst(L2, L1)} = ${fmtVecTypst(L2, L1)} + ${fmtVecTypst(L1, L3)} = ${fmtVecTypst(L2, L3)}$.\n\n2) حسب قاعدة متوازي الأضلاع، $${L0} ${L1} ${L3} ${L2}$ متوازي أضلاع، ومنه $${fmtVecTypst(L0, L1)} = ${fmtVecTypst(L2, L3)}$ وبأخذ المعاكس $${fmtVecTypst(L1, L0)} = ${fmtVecTypst(L3, L2)}$.\n\n3) من الانسحاب لدينا $${fmtVecTypst(L2, L4)} = ${fmtVecTypst(L1, L0)}$، وبمقارنتها مع $${fmtVecTypst(L3, L2)} = ${fmtVecTypst(L1, L0)}$ نستنتج $${fmtVecTypst(L3, L2)} = ${fmtVecTypst(L2, L4)}$، إذن $${L2}$ منتصف $[${L3} ${L4}]$.`,
								mark: '3'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: `قاعدة متوازي الأضلاع`
							}
						]
					}
				]
			},
			hints: [
				`من قاعدة متوازي الأضلاع، $${fmtVecKatex(L0, L3)} = ${fmtVecKatex(L0, L1)} + ${fmtVecKatex(L0, L2)}$ تعني أن الرباعي $${L0}${L1}${L3}${L2}$ متوازي أضلاع.`,
				`استخرج من متوازي الأضلاع المساواة $${fmtVecKatex(L3, L2)} = ${fmtVecKatex(L1, L0)}$.`,
				`الانسحاب الذي يحوّل $${L1}$ إلى $${L0}$ ويُرفق $${L2}$ بـ $${L4}$ يعطي $${fmtVecKatex(L2, L4)} = ${fmtVecKatex(L1, L0)}$.`
			],
			solutionStepsAr: [
				`الرباعي $${L0}${L1}${L3}${L2}$ متوازي أضلاع، إذن $${fmtVecKatex(L3, L2)} = ${fmtVecKatex(L1, L0)}$.`,
				`النقطة $${L4}$ صورة $${L2}$ بالانسحاب الذي يحوّل $${L1}$ إلى $${L0}$، إذن $${fmtVecKatex(L2, L4)} = ${fmtVecKatex(L1, L0)}$.`,
				`من المساواتين نستنتج $${fmtVecKatex(L3, L2)} = ${fmtVecKatex(L2, L4)}$، وبالتالي $${L2}$ منتصف القطعة $[${L3}${L4}]$.`
			],
			finalAnswer: `${L2} منتصف [${L3}${L4}]`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Orthonormal Frame: Components, Midpoint, Distance & Nature (geometry, 3 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const orthonormalFrameTemplate: ParameterizedTemplate = {
	id: '4am_t2_orthonormal_frame_distance',
	grade: '4am',
	trimesterId: 't2',
	domain: 'geometry',
	titleAr: 'المعالم: مركبتا شعاع، منتصف قطعة، المسافة وطبيعة الأشكال',
	curriculumLessonId: 'lesson_4am_t2_orthonormal_frame_components_midpoint_distance',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const allowedKinds: FrameShapeKind[] =
			difficulty === 'easy'
				? ['square', 'rectangle']
				: difficulty === 'medium'
					? ['square', 'rectangle']
					: ['square', 'rectangle', 'rhombus'];
		const cfg = buildFrameConfig(rng, allowedKinds);
		const [ax, ay] = cfg.A;
		const [bx, by] = cfg.B;
		const [cx, cy] = cfg.C;
		const [dx, dy] = cfg.D;

		const vx = bx - ax;
		const vy = by - ay;
		const mxNum = ax + cx;
		const myNum = ay + cy;

		const svg = svgCartesianPlane({
			xMin: -5,
			xMax: 5,
			yMin: -5,
			yMax: 5,
			points: [
				{ x: ax, y: ay, label: 'A', color: '#1d4ed8' },
				{ x: bx, y: by, label: 'B', color: '#15803d' },
				{ x: cx, y: cy, label: 'C', color: '#dc2626' }
			],
			vectors: [{ x1: ax, y1: ay, x2: bx, y2: by, color: '#2563eb' }]
		});
		const imageUrl = saveSvgAsset(`4am_t2_frame_${difficulty}_${seed}`, svg);

		const abKatex = fmtRootValKatex(cfg.abSq);
		const bcKatex = fmtRootValKatex(cfg.bcSq);
		const acKatex = fmtRootValKatex(cfg.acSq);
		const abTypst = fmtRootValTypst(cfg.abSq);
		const bcTypst = fmtRootValTypst(cfg.bcSq);
		const acTypst = fmtRootValTypst(cfg.acSq);

		const midKatex = `(${fmtFracKatex(mxNum, 2)} \\,;\\, ${fmtFracKatex(myNum, 2)})`;
		const midTypst = `(${fmtFracTypst(mxNum, 2)} ; ${fmtFracTypst(myNum, 2)})`;

		let triNatureAr: string;
		let quadNatureAr: string;
		if (cfg.kind === 'square') {
			triNatureAr = 'قائم في $B$ ومتساوي الساقين';
			quadNatureAr = 'مربع';
		} else if (cfg.kind === 'rectangle') {
			triNatureAr = 'قائم في $B$';
			quadNatureAr = 'مستطيل';
		} else {
			triNatureAr = 'متساوي الساقين رأسه $B$';
			quadNatureAr = 'معين';
		}

		let quizQuestion: QuizQuestionPayload;
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;

		if (difficulty === 'easy') {
			const correctVec = `$${fmtColVecKatex(vx, vy)}$`;
			const mcq = buildUniqueMcqOptions(
				correctVec,
				[
					{
						text: `$${fmtColVecKatex(-vx, -vy)}$`,
						diagnosticFeedback:
							'انتبه للترتيب: مركبتا $\\overrightarrow{AB}$ هما (إحداثيا النهاية $B$ ناقص إحداثيا البداية $A$) وليس العكس!'
					},
					{
						text: `$${fmtColVecKatex(vy, vx)}$`,
						diagnosticFeedback:
							'بدّلتَ بين المركبة الأفقية ($x_B - x_A$) والمركبة العمودية ($y_B - y_A$).'
					},
					{
						text: `$${fmtColVecKatex(ax + bx, ay + by)}$`,
						diagnosticFeedback:
							'لحساب مركبتي شعاع نطرح الإحداثيات $(x_B - x_A)$ ولا نجمعها!'
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `في المعلم المتعامد والمتجانس المقابل $(O; I, J)$، لتكن النقطتان $A(${ax}; ${ay})$ و $B(${bx}; ${by})$. ما هما مركبتا الشعاع $\\overrightarrow{AB}$؟`,
				questionTextAr: `احسب مركبتي الشعاع $\\overrightarrow{AB}$ علماً أن $A(${ax}; ${ay})$ و $B(${bx}; ${by})$.`,
				imageUrl,
				imageCaption: 'النقط A و B و C في معلم متعامد ومتجانس',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نطبق قاعدة مركبتي شعاع: $x_{\\overrightarrow{AB}} = x_B - x_A = ${bx} - (${ax}) = ${vx}$، و $y_{\\overrightarrow{AB}} = y_B - y_A = ${by} - (${ay}) = ${vy}$.`
			};
			hints = [
				'مركبتا الشعاع $\\overrightarrow{AB}$ هما $(x_B - x_A \\,;\\, y_B - y_A)$: دائماً النهاية ناقص البداية.',
				`احسب الفاصلة: $${bx} - (${ax}) = ${vx}$.`,
				`احسب الترتيب: $${by} - (${ay}) = ${vy}$.`
			];
			solutionStepsAr = [
				`المركبة الأولى: $x_B - x_A = ${bx} - (${ax}) = ${vx}$.`,
				`المركبة الثانية: $y_B - y_A = ${by} - (${ay}) = ${vy}$، إذن $\\overrightarrow{AB}${fmtColVecKatex(vx, vy)}$.`,
				`المسافة $AB = \\sqrt{(${vx})^2 + (${vy})^2} = ${abKatex}$، ومنتصف $[AC]$ هو $M${midKatex}$.`
			];
			finalAnswer = `(${vx} ; ${vy})`;
		} else if (difficulty === 'medium') {
			quizQuestion = {
				type: 'calculated',
				questionText: `في المعلم المتعامد والمتجانس المقابل، لدينا $A(${ax}; ${ay})$ و $B(${bx}; ${by})$ و $C(${cx}; ${cy})$. أوجد **فاصلة** النقطة $D$ ($x_D$) بحيث يكون الرباعي $ABCD$ متوازي أضلاع (أي $\\overrightarrow{AD} = \\overrightarrow{BC}$).`,
				questionTextAr: `أوجد فاصلة النقطة $D$ بحيث يكون $ABCD$ متوازي أضلاع علماً أن $A(${ax}; ${ay})$، $B(${bx}; ${by})$، $C(${cx}; ${cy})$.`,
				imageUrl,
				imageCaption: 'معلم متعامد ومتجانس (O; I, J)',
				questionData: {
					answer: dx,
					displayTemplate: 'x_D = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `من $\\overrightarrow{AB} = \\overrightarrow{DC}$ لدينا $x_C - x_D = x_B - x_A = ${vx}$، ومنه $x_D = ${cx} - (${vx}) = ${dx}$ (وكذلك $y_D = ${dy}$).`
			};
			hints = [
				'يكون $ABCD$ متوازي أضلاع إذا وفقط إذا تساوى الشعاعان $\\overrightarrow{AB} = \\overrightarrow{DC}$.',
				`احسب أولاً المركبة الأولى لـ $\\overrightarrow{AB}$: $x_B - x_A = ${vx}$.`,
				`حل المعادلة $x_C - x_D = ${vx}$ (أي $${cx} - x_D = ${vx}$) لإيجاد $x_D$.`
			];
			solutionStepsAr = [
				`مركبتا $\\overrightarrow{AB}$ هما $(${vx} \\,;\\, ${vy})$.`,
				`بما أن $\\overrightarrow{AB} = \\overrightarrow{DC}$ فإن $${cx} - x_D = ${vx}$، ومنه $x_D = ${dx}$.`,
				`وبالمثل $${cy} - y_D = ${vy}$ أي $y_D = ${dy}$، إذن $D(${dx}; ${dy})$.`
			];
			finalAnswer = String(dx);
		} else {
			// hard: exact nature of quadrilateral ABCD
			const correctNat =
				cfg.kind === 'square'
					? 'مربع'
					: cfg.kind === 'rectangle'
						? 'مستطيل (غير مربع)'
						: 'معين (غير مربع)';
			const mcq = buildUniqueMcqOptions(
				correctNat,
				[
					{
						text: 'مربع',
						diagnosticFeedback:
							cfg.kind === 'rectangle'
								? `لدينا زاوية قائمة ($AB^2 + BC^2 = AC^2$)، لكن الطولين مختلفان ($AB = ${abKatex} \\neq BC = ${bcKatex}$)، فهو مستطيل وليس مربعاً.`
								: `الأضلاع متقايسة ($AB = BC = ${abKatex}$)، لكن $AB^2 + BC^2 = ${cfg.abSq + cfg.bcSq} \\neq AC^2 = ${cfg.acSq}$، فلا توجد زاوية قائمة فهو معين وليس مربعاً.`
					},
					{
						text: 'مستطيل (غير مربع)',
						diagnosticFeedback:
							cfg.kind === 'square'
								? `بالإضافة إلى الزاوية القائمة، الضلعان المتتاليان متقايسان ($AB = BC = ${abKatex}$)، فهو مربع!`
								: `تحقق من عكس فيثاغورس: $AB^2 + BC^2 = ${cfg.abSq + cfg.bcSq} \\neq AC^2 = ${cfg.acSq}$، إذن لا توجد زاوية قائمة.`
					},
					{
						text: 'معين (غير مربع)',
						diagnosticFeedback:
							cfg.kind === 'square'
								? `تحقق من عكس فيثاغورس: $AB^2 + BC^2 = ${cfg.abSq + cfg.bcSq} = AC^2$، فتوجد زاوية قائمة تجعله مربعاً!`
								: `الضلعان المتتاليان غير متقايسين ($AB = ${abKatex}$ و $BC = ${bcKatex}$)، بل توجد زاوية قائمة.`
					},
					{
						text: 'متوازي أضلاع كيفي',
						diagnosticFeedback:
							'تحقق من تقايس الأضلاع المتتالية ومن الخاصية العكسية لفيثاغورس في المثلث $ABC$!'
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `في المعلم المتعامد والمتجانس المقابل، لدينا $A(${ax}; ${ay})$ و $B(${bx}; ${by})$ و $C(${cx}; ${cy})$، والنقطة $D(${dx}; ${dy})$ تحقق $\\overrightarrow{AD} = \\overrightarrow{BC}$. ما هي الطبيعة الدقيقة للرباعي $ABCD$؟`,
				questionTextAr: `ما الطبيعة الدقيقة للرباعي $ABCD$ حيث $A(${ax}; ${ay})$، $B(${bx}; ${by})$، $C(${cx}; ${cy})$، $D(${dx}; ${dy})$؟`,
				imageUrl,
				imageCaption: 'النقط A و B و C في معلم متعامد ومتجانس',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نحسب مربعات الأطوال: $AB^2 = ${cfg.abSq}$ و $BC^2 = ${cfg.bcSq}$ و $AC^2 = ${cfg.acSq}$. ${cfg.abSq + cfg.bcSq === cfg.acSq ? 'حسب عكس فيثاغورس المثلث $ABC$ قائم في $B$' : 'المثلث $ABC$ ليس قائماً في $B$'}، و${cfg.abSq === cfg.bcSq ? '$AB = BC$' : '$AB \\neq BC$'}، إذن $ABCD$ هو ${correctNat}.`
			};
			hints = [
				'بما أن $\\overrightarrow{AD} = \\overrightarrow{BC}$، فإن الرباعي $ABCD$ متوازي أضلاع أولاً.',
				`احسب الأطوال $AB = ${abKatex}$ و$BC = ${bcKatex}$ و$AC = ${acKatex}$ باستعمال قاعدة المسافة.`,
				'قارن $AB$ مع $BC$ واختبر المساواة $AB^2 + BC^2 = AC^2$ بالخاصية العكسية لفيثاغورس.'
			];
			solutionStepsAr = [
				`نحسب: $AB^2 = (${vx})^2 + (${vy})^2 = ${cfg.abSq}$، و$BC^2 = (${cx - bx})^2 + (${cy - by})^2 = ${cfg.bcSq}$، و$AC^2 = (${cx - ax})^2 + (${cy - ay})^2 = ${cfg.acSq}$.`,
				cfg.abSq + cfg.bcSq === cfg.acSq
					? `بما أن $AB^2 + BC^2 = ${cfg.abSq} + ${cfg.bcSq} = ${cfg.acSq} = AC^2$ فالمثلث $ABC$ قائم في $B$.`
					: `بما أن $AB = BC = ${abKatex}$ و$AB^2 + BC^2 \\neq AC^2$ فالمثلث متساوي الساقين في $B$ وغير قائم.`,
				`مع تساوي الشعاعين $\\overrightarrow{AD} = \\overrightarrow{BC}$، نستنتج أن الرباعي $ABCD$ هو ${correctNat}.`
			];
			finalAnswer = correctNat;
		}

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `المستوي منسوب إلى معلم متعامد ومتجانس $(O ; I, J)$ كما في الشكل المقابل، نعتبر النقط $A(${ax}; ${ay})$ ، $B(${bx}; ${by})$ ، $C(${cx}; ${cy})$:`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) احسب مركبتي الشعاع $${fmtVecTypst('A', 'B')}$ ثم احسب الأطوال المضبوطة $A B$ و $B C$ و $A C$.\n\n2) استنتج طبيعة المثلث $A B C$ مع التبرير، ثم احسب إحداثيتي $M$ منتصف القطعة $[A C]$.\n\n3) عيّن إحداثيتي النقطة $D$ بحيث يكون $${fmtVecTypst('A', 'B')} = ${fmtVecTypst('D', 'C')}$، واستنتج الطبيعة الدقيقة للرباعي $A B C D$.`,
								answer: `1) $${fmtVecTypst('A', 'B')} ${fmtColVecTypst(vx, vy)}$ ، والأطوال: $A B = ${abTypst}$ ، $B C = ${bcTypst}$ ، $A C = ${acTypst}$.\n\n2) ${cfg.abSq + cfg.bcSq === cfg.acSq ? `بما أن $A B^2 + B C^2 = ${cfg.abSq} + ${cfg.bcSq} = ${cfg.acSq} = A C^2$ فإن المثلث $A B C$ ${triNatureAr} (الخاصية العكسية لفيثاغورس).` : `بما أن $A B = B C = ${abTypst}$ فإن المثلث $A B C$ متساوي الساقين رأسه $B$.`}\n\nمنتصف $[A C]$: $M${midTypst}$.\n\n3) من $${fmtVecTypst('A', 'B')} = ${fmtVecTypst('D', 'C')}$ نجد $D(${dx}; ${dy})$، وبما أن $A B C D$ متوازي أضلاع فإن طبيعته الدقيقة هي *${quadNatureAr}*.`,
								mark: '3'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'المعلم المتعامد والمتجانس (O; I, J)'
							}
						]
					}
				]
			},
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. T2 Integration Situation (الوضعية الإدماجية - 8 pts, 3 Parts)
// ═══════════════════════════════════════════════════════════════════════════════

interface AreaTuple {
	a: number;
	b: number;
	m: number;
	e: number;
	xLim: number;
}

const INTEGRATION_TUPLES: AreaTuple[] = [
	{ a: 1, b: 6, m: 5, e: 5, xLim: 7 },
	{ a: 1, b: 7, m: 5, e: 6, xLim: 3 },
	{ a: 1, b: 7, m: 6, e: 5, xLim: 6 },
	{ a: 1, b: 8, m: 6, e: 6, xLim: 2 },
	{ a: 1, b: 8, m: 7, e: 5, xLim: 5 },
	{ a: 1, b: 9, m: 7, e: 8, xLim: 8 },
	{ a: 1, b: 9, m: 8, e: 5, xLim: 4 },
	{ a: 1, b: 10, m: 7, e: 9, xLim: 5 },
	{ a: 1, b: 10, m: 8, e: 8, xLim: 7 },
	{ a: 1, b: 10, m: 9, e: 5, xLim: 3 },
	{ a: 1, b: 11, m: 8, e: 9, xLim: 4 },
	{ a: 1, b: 11, m: 9, e: 8, xLim: 6 },
	{ a: 1, b: 12, m: 9, e: 9, xLim: 3 },
	{ a: 1, b: 12, m: 10, e: 8, xLim: 5 },
	{ a: 2, b: 9, m: 8, e: 5, xLim: 2 },
	{ a: 2, b: 9, m: 7, e: 8, xLim: 4 },
	{ a: 2, b: 12, m: 10, e: 10, xLim: 7 }
];

const integrationT2Template: ParameterizedTemplate = {
	id: '4am_t2_integration',
	grade: '4am',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية: تهيئة فضاء هندسي بالمتطابقات الشهيرة والمتراجحات والمعالم',
	curriculumLessonId: 'lesson_4am_t2_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Part 1 & 2: Algebraic area comparison (S1 vs S2)
		const tuplePool =
			difficulty === 'easy'
				? INTEGRATION_TUPLES.filter((t) => t.a === 1)
				: INTEGRATION_TUPLES;
		const { a, b, m, e, xLim } = rng.pick(tuplePool);
		const side1 = fmtLinear(a, b);
		const side2 = fmtLinear(a, m);

		const s1A = a * a;
		const s1B = 2 * a * b;
		const s1C = b * b - e * e;
		const s1Expanded = fmtQuadratic(s1A, s1B, s1C);
		const s1F1 = fmtLinear(a, b - e);
		const s1F2 = fmtLinear(a, b + e);
		const s1Factored = `(${s1F1})(${s1F2})`;

		const s2B = 2 * a * m;
		const s2C = m * m;
		const s2Expanded = fmtQuadratic(s1A, s2B, s2C);

		// Inequality condition:
		// easy/medium: S1(x) >= S2(x) -> x >= xLim (min integer = xLim)
		// hard: S1(x) > S2(x) -> x > xLim (min integer = xLim + 1)
		const strict = difficulty === 'hard';
		const minIntX = strict ? xLim + 1 : xLim;
		const ineqOpKatex = strict ? '>' : '\\ge';
		const ineqOpTypst = strict ? '>' : '>=';
		const diffCoeff = 2 * a * (b - m);
		const diffRhs = m * m + e * e - b * b; // = diffCoeff * xLim > 0

		const areaSvg = svgAreaComparisonPlot({ a, b, m, e });
		const areaUrl = saveSvgAsset(`4am_t2_integ_areas_${difficulty}_${seed}`, areaSvg);

		// Part 3: Coordinate / vector geometry (orthonormal frame)
		const allowedFrame: FrameShapeKind[] =
			difficulty === 'easy' ? ['square'] : ['square', 'rectangle'];
		const frameCfg = buildFrameConfig(rng, allowedFrame);
		const [ex, ey] = frameCfg.A;
		const [fx, fy] = frameCfg.B;
		const [gx, gy] = frameCfg.C;
		const [hx, hy] = frameCfg.D;
		const efX = fx - ex;
		const efY = fy - ey;
		const efKatex = fmtRootValKatex(frameCfg.abSq);
		const fgKatex = fmtRootValKatex(frameCfg.bcSq);
		const egKatex = fmtRootValKatex(frameCfg.acSq);
		const efTypst = fmtRootValTypst(frameCfg.abSq);
		const fgTypst = fmtRootValTypst(frameCfg.bcSq);
		const egTypst = fmtRootValTypst(frameCfg.acSq);

		const kxTypst = fmtFracTypst(ex + gx, 2);
		const kyTypst = fmtFracTypst(ey + gy, 2);
		const kxKatex = fmtFracKatex(ex + gx, 2);
		const kyKatex = fmtFracKatex(ey + gy, 2);

		const quadLabel = frameCfg.kind === 'square' ? 'مربع' : 'مستطيل';

		const frameSvg = svgCartesianPlane({
			xMin: -5,
			xMax: 5,
			yMin: -5,
			yMax: 5,
			points: [
				{ x: ex, y: ey, label: 'E', color: '#1d4ed8' },
				{ x: fx, y: fy, label: 'F', color: '#15803d' },
				{ x: gx, y: gy, label: 'G', color: '#dc2626' }
			],
			vectors: [{ x1: ex, y1: ey, x2: fx, y2: fy, color: '#2563eb' }]
		});
		const frameUrl = saveSvgAsset(`4am_t2_integ_frame_${difficulty}_${seed}`, frameSvg);

		let quizQuestion: QuizQuestionPayload;
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;

		if (difficulty === 'easy') {
			const mcq = buildUniqueMcqOptions(
				`$${s1Factored}$`,
				[
					{
						text: `$(${fmtLinear(a, b - e * e)})(${fmtLinear(a, b + e * e)})$`,
						diagnosticFeedback:
							`خطأ شائع: نسيتَ أخذ الجذر التربيعي للعدد $${e * e} = ${e}^2$، فكتبتَ $${e * e}$ بدل $${e}$!`
					},
					{
						text: `$(${s1F1})^2$`,
						diagnosticFeedback:
							'فرّق بين $A^2 - B^2 = (A - B)(A + B)$ وبين مربع فرق $(A - B)^2$.'
					},
					{
						text: `$(${fmtLinear(a, b - e)})(${fmtLinear(a, m)})$`,
						diagnosticFeedback:
							'في فرق مربعين نستعمل الجذرين $A = ' + side1 + '$ و$B = ' + e + '$ مرتين: $(A - B)(A + B)$.'
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `خصّصت بلدية قطعتي أرض مهيأتين بدلالة $x > 0$ كما في المخطط المقابل: القطعة الأولى مساحتها $S_1 = (${side1})^2 - ${e * e}$ (بالمتر المربع). ما هي الصيغة المحللة للعبارة $S_1$ إلى جداء عاملين؟`,
				questionTextAr: `ما هو التحليل الصحيح للعبارة $S_1 = (${side1})^2 - ${e * e}$ إلى جداء عاملين؟`,
				imageUrl: areaUrl,
				imageCaption: 'مخطط القطعتين S1 و S2',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نكتب $${e * e} = ${e}^2$ ونطبّق متطابقة فرق مربعين: $S_1 = (${side1} - ${e})(${side1} + ${e}) = ${s1Factored}$.`
			};
			hints = [
				`اكتب $S_1$ على شكل فرق مربعين: $(${side1})^2 - ${e}^2$.`,
				'طبّق المتطابقة الشهيرة الثالثة: $A^2 - B^2 = (A - B)(A + B)$.',
				`بسّط كل قوس: $(${side1} - ${e}) = ${s1F1}$ و$(${side1} + ${e}) = ${s1F2}$.`
			];
			solutionStepsAr = [
				`نكتب $S_1 = (${side1})^2 - ${e}^2 = (${side1} - ${e})(${side1} + ${e}) = ${s1Factored}$.`,
				`النشر يعطي $S_1 = ${s1Expanded}$ و$S_2 = ${s2Expanded}$، والمتراجحة $S_1 \\ge S_2$ تعطي $x \\ge ${xLim}$.`,
				`في المعلم: $\\overrightarrow{EF}${fmtColVecKatex(efX, efY)}$، والنقطة $H(${hx}; ${hy})$، والرباعي $EFGH$ ${quadLabel} مركزه $K(${kxKatex}; ${kyKatex})$.`
			];
			finalAnswer = s1Factored;
		} else if (difficulty === 'medium') {
			quizQuestion = {
				type: 'calculated',
				questionText: `تُعبّر البلدية عن مساحتي ساحتين (بـ $\\text{m}^2$) بدلالة $x > 0$ كما في المخطط المقابل:\n\n$$S_1 = (${side1})^2 - ${e * e} \\quad,\\quad S_2 = (${side2})^2$$\n\nما هو **أصغر عدد طبيعي** لـ $x$ يجعل مساحة الساحة الأولى أكبر من أو تساوي مساحة الساحة الثانية ($S_1 \\ge S_2$)؟`,
				questionTextAr: `أوجد أصغر عدد طبيعي $x$ يحقق $S_1 \\ge S_2$ حيث $S_1 = (${side1})^2 - ${e * e}$ و$S_2 = (${side2})^2$.`,
				imageUrl: areaUrl,
				imageCaption: 'مقارنة المساحتين S1 و S2',
				questionData: {
					answer: minIntX,
					displayTemplate: 'x >= ?',
					variables: [],
					tolerance: 0
				},
				explanation: `ننشر: $S_1 = ${s1Expanded}$ و$S_2 = ${s2Expanded}$. المتراجحة $S_1 \\ge S_2$ تؤول إلى $${diffCoeff}x \\ge ${diffRhs}$ ومنه $x \\ge ${xLim}$، إذن أصغر عدد طبيعي هو ${minIntX}.`
			};
			hints = [
				'انشر وبسّط كلاً من $S_1$ و$S_2$ باستعمال المتطابقات الشهيرة.',
				`عند كتابة $S_1 \\ge S_2$ يختزل الحد التربيعي $${s1A === 1 ? 'x^2' : `${s1A}x^2`}$ من الطرفين.`,
				`تحصل على المتراجحة $${diffCoeff}x \\ge ${diffRhs}$ فتجد الحد الأدنى لـ $x$.`
			];
			solutionStepsAr = [
				`النشر: $S_1 = ${s1Expanded}$ و $S_2 = ${s2Expanded}$.`,
				`المقارنة: $S_1 \\ge S_2 \\implies ${diffCoeff}x \\ge ${diffRhs} \\implies x \\ge ${xLim}$.`,
				`إذن أصغر عدد طبيعي يحقق الشرط هو $x = ${minIntX}$.`
			];
			finalAnswer = String(minIntX);
		} else {
			const correctH = `$H(${hx}; ${hy})$ والرباعي $EFGH$ ${quadLabel}`;
			const wrongShift =
				frameCfg.kind === 'square'
					? `$H(${hx}; ${hy})$ والرباعي $EFGH$ معين غير قائم`
					: `$H(${hx}; ${hy})$ والرباعي $EFGH$ مربع`;
			const mcq = buildUniqueMcqOptions(
				correctH,
				[
					{
						text: wrongShift,
						diagnosticFeedback:
							frameCfg.kind === 'square'
								? `تحقق من الخاصية العكسية لفيثاغورس: $EF^2 + FG^2 = ${frameCfg.abSq + frameCfg.bcSq} = EG^2$، فالزاوية في $F$ قائمة والرباعي مربع!`
								: `لاحظ الأطوال: $EF = ${efKatex}$ و$FG = ${fgKatex}$ غير متساويين، والزاوية قائمة في $F$، فالرباعي مستطيل وليس مربعاً.`
					},
					{
						text: `$H(${ex + fx - gx}; ${ey + fy - gy})$ والرباعي $EFGH$ ${quadLabel}`,
						diagnosticFeedback:
							'عكستَ اتجاه الشعاعين عند إيجاد $H$! الشرط هو $\\overrightarrow{EH} = \\overrightarrow{FG}$ وليس $\\overrightarrow{EH} = \\overrightarrow{GF}$.'
					},
					{
						text: `$H(${gx + efX}; ${gy + efY})$ والرباعي $EFGH$ متوازي أضلاع كيفي`,
						diagnosticFeedback:
							'انتبه لترتيب الحروف في $\\overrightarrow{EF} = \\overrightarrow{HG}$: الرأس $H$ يسبق $G$ في الشعاع $\\overrightarrow{HG}$.'
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `في مخطط التهيئة المزود بمعلم متعامد ومتجانس المقابل، حُدّدت النقط $E(${ex}; ${ey})$ و$F(${fx}; ${fy})$ و$G(${gx}; ${gy})$، وتُعيّن النقطة $H$ بحيث يكون $\\overrightarrow{EF} = \\overrightarrow{HG}$. ما هما إحداثيا $H$ وما طبيعة الرباعي $EFGH$؟`,
				questionTextAr: `عيّن إحداثيي $H$ بحيث $\\overrightarrow{EF} = \\overrightarrow{HG}$ واستنتج طبيعة $EFGH$.`,
				imageUrl: frameUrl,
				imageCaption: 'مخطط الجناح EFGH في المعلم المتعامد والمتجانس',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `مركبتا $\\overrightarrow{EF}$ هما $(${efX}; ${efY})$. من $\\overrightarrow{EF} = \\overrightarrow{HG}$ نجد $H(${hx}; ${hy})$. وبما أن $EF^2 + FG^2 = ${frameCfg.abSq} + ${frameCfg.bcSq} = ${frameCfg.acSq} = EG^2$ فالمثلث $EFG$ قائم في $F$، و${frameCfg.kind === 'square' ? '$EF = FG$ إذن $EFGH$ مربع' : '$EF \\neq FG$ إذن $EFGH$ مستطيل'}.`
			};
			hints = [
				`احسب مركبتي الشعاع $\\overrightarrow{EF}$: $(x_F - x_E \\,;\\, y_F - y_E) = (${efX}; ${efY})$.`,
				`طبّق تساوي الشعاعين $\\overrightarrow{EF} = \\overrightarrow{HG}$ أي $x_G - x_H = ${efX}$ و$y_G - y_H = ${efY}$.`,
				'احسب الأطوال $EF$ و$FG$ و$EG$ للتحقق من الزاوية القائمة في $F$ وتحديد طبيعة $EFGH$.'
			];
			solutionStepsAr = [
				`مركبتا $\\overrightarrow{EF}$ هما $(${efX}; ${efY})$، ومن $\\overrightarrow{EF} = \\overrightarrow{HG}$ نجد $H(${hx}; ${hy})$.`,
				`الأطوال: $EF = ${efKatex}$، و$FG = ${fgKatex}$، و$EG = ${egKatex}$.`,
				`بما أن $EF^2 + FG^2 = EG^2$ فالزاوية $\\widehat{EFG} = 90^\\circ$، وبما أن $EFGH$ متوازي أضلاع فهو ${quadLabel}.`
			];
			finalAnswer = `H(${hx}; ${hy}) ، ${quadLabel}`;
		}

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `تعتزم بلدية تهيئة فضاء ثقافي يضم ساحتين مربعتين (مع اقتطاع كشك مربع من الساحة الأولى) وجناحاً إدارياً، حيث $x$ طول موجب تماماً بالمتر ($x > 0$):`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `الجزء الأول (الحساب الحرفي والمتطابقات الشهيرة):\n\nمساحة الساحة الأولى الصافية هي $S_1 = (${side1})^2 - ${e * e}$، ومساحة الساحة الثانية هي $S_2 = (${side2})^2$ (انظر المخطط).\n\n1) انشر وبسّط كلاً من العبارتين $S_1$ و $S_2$.\n\n2) حلّل العبارة $S_1$ إلى جداء عاملين من الدرجة الأولى.`,
								answer: `الجزء الأول:\n\n1) $S_1 = (${fmtQuadratic(s1A, s1B, b * b)}) - ${e * e} = ${s1Expanded}$ ، و $S_2 = ${s2Expanded}$.\n\n2) $S_1 = (${side1})^2 - ${e}^2 = (${side1} - ${e})(${side1} + ${e}) = ${s1Factored}$.`,
								mark: '3'
							},
							{
								type: 'image',
								src: areaUrl,
								caption: 'مخطط الساحتين S1 و S2'
							}
						]
					},
					{
						type: 'text',
						content: `الجزء الثاني (المتراجحات والتمثيل البياني):\n\nتريد البلدية أن تكون مساحة الساحة الأولى الصافية ${strict ? 'أكبر تماماً من' : 'أكبر من أو تساوي'} مساحة الساحة الثانية ($S_1 ${ineqOpTypst} S_2$).\n\n1) اكتب المتراجحة الموافقة، ثم حلّها مبيناً مراحل التبسيط.\n\n2) مثّل مجموعة حلولها على مستقيم مدرج، وما هو أصغر عدد طبيعي $x$ يحقق هذا الشرط؟`,
						answer: `الجزء الثاني:\n\n1) $${s1Expanded} ${ineqOpTypst} ${s2Expanded}$ ومنه $${s1B}x ${s1C >= 0 ? `+ ${s1C}` : `- ${Math.abs(s1C)}`} ${ineqOpTypst} ${s2B}x + ${s2C}$، أي $${diffCoeff}x ${ineqOpTypst} ${diffRhs}$، وبالقسمة على $${diffCoeff} > 0$ نجد $x ${ineqOpTypst} ${xLim}$.\n\n2) على المستقيم المدرج: نلوّن جهة القيم ${opDescAr(strict ? '>' : '>=')} $${xLim}$ ونشطب القيم الأصغر منها، والعارضة عند $${xLim}$ موجهة نحو ${strict ? 'الجزء المشطوب' : 'الحلول'}. أصغر عدد طبيعي هو $${minIntX}$.`,
						mark: '2'
					},
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `الجزء الثالث (الأشعة والمعالم في المستوي):\n\nعلى مخطط التهيئة المزوّد بمعلم متعامد ومتجانس $(O ; I, J)$ (الوحدة $1$ م)، حُدّدت ثلاث زوايا للجناح الإداري بالنقط $E(${ex}; ${ey})$ ، $F(${fx}; ${fy})$ ، $G(${gx}; ${gy})$.\n\n1) احسب مركبتي الشعاع $${fmtVecTypst('E', 'F')}$، ثم احسب الأطوال المضبوطة $E F$ و $F G$ و $E G$ مبيّناً نوع المثلث $E F G$.\n\n2) أوجد إحداثيي النقطة $H$ بحيث يكون $${fmtVecTypst('E', 'F')} = ${fmtVecTypst('H', 'G')}$، ثم استنتج الطبيعة الدقيقة للرباعي $E F G H$ وإحداثيي مركزه $K$.`,
								answer: `الجزء الثالث:\n\n1) $${fmtVecTypst('E', 'F')} ${fmtColVecTypst(efX, efY)}$ ، والأطوال: $E F = ${efTypst}$ ، $F G = ${fgTypst}$ ، $E G = ${egTypst}$.\n\nبما أن $E F^2 + F G^2 = ${frameCfg.abSq} + ${frameCfg.bcSq} = ${frameCfg.acSq} = E G^2$ فالمثلث $E F G$ قائم في $F$${frameCfg.kind === 'square' ? ' ومتساوي الساقين' : ''}.\n\n2) من $${fmtVecTypst('E', 'F')} = ${fmtVecTypst('H', 'G')}$ نجد $H(${hx}; ${hy})$.\n\nالرباعي $E F G H$ متوازي أضلاع فيه زاوية قائمة${frameCfg.kind === 'square' ? ' وضلعان متتاليان متقايسان ($E F = F G$)' : ''}، إذن هو *${quadLabel}*، ومركزه $K$ منتصف $[E G]$ إحداثياه هما $K(${kxTypst} ; ${kyTypst})$.`,
								mark: '3'
							},
							{
								type: 'image',
								src: frameUrl,
								caption: 'موقع النقط E و F و G في المعلم'
							}
						]
					}
				]
			},
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

export const TEMPLATES_4AM_T2: ParameterizedTemplate[] = [
	expansionIdentitiesTemplate,
	factorizationBemTemplate,
	zeroProductInequalitiesTemplate,
	vectorsChaslesTemplate,
	orthonormalFrameTemplate,
	integrationT2Template
];
