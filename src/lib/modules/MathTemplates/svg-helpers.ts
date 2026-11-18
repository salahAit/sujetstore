import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const SVG_DIR = resolve('static/generated/math-svg');

/**
 * Writes an SVG asset to static/generated/math-svg/ and returns the public path
 * (/generated/math-svg/<filename>.svg) compatible with both Web <img> and Typst ImageBlock.
 */
export function saveSvgAsset(filename: string, svgContent: string): string {
	const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/\.svg$/i, '') + '.svg';
	if (!existsSync(SVG_DIR)) {
		mkdirSync(SVG_DIR, { recursive: true });
	}
	const outPath = join(SVG_DIR, safeName);
	writeFileSync(outPath, svgContent.trim() + '\n', 'utf-8');
	return `/generated/math-svg/${safeName}`;
}

function escapeXml(str: string): string {
	return str
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

function wrapSvg(width: number, height: number, body: string): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="background:#ffffff;font-family:'Scheherazade New','Scheherazade',Arial,sans-serif">${body}</svg>`;
}

/** 2AP / 2AM Grid (المرصوفة) with optional marked cells or points */
export function svgGridPoints(opts: {
	cols: number;
	rows: number;
	colLabels?: string[];
	rowLabels?: string[];
	points?: { col: number; row: number; label: string; color?: string }[];
	shadedCells?: { col: number; row: number; color?: string }[];
	polygon?: { col: number; row: number }[];
}): string {
	const cell = 38;
	const padLeft = 42;
	const padTop = 34;
	const padRight = 24;
	const padBottom = 24;
	const w = padLeft + opts.cols * cell + padRight;
	const h = padTop + opts.rows * cell + padBottom;
	const parts: string[] = [];

	// Shaded cells
	for (const sc of opts.shadedCells || []) {
		const x = padLeft + sc.col * cell;
		const y = padTop + sc.row * cell;
		parts.push(`<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${sc.color || '#bae6fd'}"/>`);
	}

	// Grid lines
	for (let c = 0; c <= opts.cols; c++) {
		const x = padLeft + c * cell;
		parts.push(`<line x1="${x}" y1="${padTop}" x2="${x}" y2="${padTop + opts.rows * cell}" stroke="#64748b" stroke-width="1.2"/>`);
		if (opts.colLabels?.[c] && c < opts.cols) {
			parts.push(`<text x="${x + cell / 2}" y="${padTop - 10}" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escapeXml(opts.colLabels[c])}</text>`);
		}
	}
	for (let r = 0; r <= opts.rows; r++) {
		const y = padTop + r * cell;
		parts.push(`<line x1="${padLeft}" y1="${y}" x2="${padLeft + opts.cols * cell}" y2="${y}" stroke="#64748b" stroke-width="1.2"/>`);
		if (opts.rowLabels?.[r] && r < opts.rows) {
			parts.push(`<text x="${padLeft - 14}" y="${y + cell / 2 + 5}" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escapeXml(opts.rowLabels[r])}</text>`);
		}
	}

	// Optional polygon connecting node intersections
	if (opts.polygon && opts.polygon.length >= 2) {
		const pts = opts.polygon
			.map((p) => `${padLeft + p.col * cell},${padTop + p.row * cell}`)
			.join(' ');
		parts.push(`<polygon points="${pts}" fill="rgba(59,130,246,0.18)" stroke="#1d4ed8" stroke-width="2.2"/>`);
	}

	// Marked points
	for (const pt of opts.points || []) {
		const cx = padLeft + pt.col * cell;
		const cy = padTop + pt.row * cell;
		parts.push(`<circle cx="${cx}" cy="${cy}" r="5" fill="${pt.color || '#dc2626'}"/>`);
		parts.push(`<text x="${cx + 8}" y="${cy - 6}" font-size="13" font-weight="bold" fill="${pt.color || '#dc2626'}">${escapeXml(pt.label)}</text>`);
	}

	return wrapSvg(w, h, parts.join(''));
}

/** Analog clock (2AP / 5AP) */
export function svgAnalogClock(hours: number, minutes: number): string {
	const w = 180;
	const h = 180;
	const cx = 90;
	const cy = 90;
	const r = 72;
	const parts: string[] = [
		`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#f8fafc" stroke="#1e293b" stroke-width="3"/>`
	];

	for (let i = 1; i <= 12; i++) {
		const ang = ((i * 30 - 90) * Math.PI) / 180;
		const tx = cx + Math.cos(ang) * (r - 16);
		const ty = cy + Math.sin(ang) * (r - 16) + 4;
		const x1 = cx + Math.cos(ang) * (r - 5);
		const y1 = cy + Math.sin(ang) * (r - 5);
		const x2 = cx + Math.cos(ang) * r;
		const y2 = cy + Math.sin(ang) * r;
		parts.push(`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#334155" stroke-width="2"/>`);
		parts.push(`<text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">${i}</text>`);
	}

	const hAng = ((((hours % 12) + minutes / 60) * 30 - 90) * Math.PI) / 180;
	const mAng = ((minutes * 6 - 90) * Math.PI) / 180;
	const hx = cx + Math.cos(hAng) * 38;
	const hy = cy + Math.sin(hAng) * 38;
	const mx = cx + Math.cos(mAng) * 56;
	const my = cy + Math.sin(mAng) * 56;

	parts.push(`<line x1="${cx}" y1="${cy}" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="#dc2626" stroke-width="4" stroke-linecap="round"/>`);
	parts.push(`<line x1="${cx}" y1="${cy}" x2="${mx.toFixed(1)}" y2="${my.toFixed(1)}" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round"/>`);
	parts.push(`<circle cx="${cx}" cy="${cy}" r="4" fill="#0f172a"/>`);

	return wrapSvg(w, h, parts.join(''));
}

/** Algerian Dinar coins & notes (2AP) */
export function svgCoinsDinar(denominations: number[]): string {
	const itemW = 72;
	const pad = 16;
	const cols = Math.min(denominations.length, 5);
	const rows = Math.ceil(denominations.length / 5) || 1;
	const w = Math.max(160, pad * 2 + cols * itemW);
	const h = pad * 2 + rows * 58;
	const parts: string[] = [];

	denominations.forEach((val, idx) => {
		const c = idx % 5;
		const r = Math.floor(idx / 5);
		const x = pad + c * itemW + itemW / 2;
		const y = pad + r * 58 + 29;
		if (val >= 200) {
			parts.push(`<rect x="${x - 30}" y="${y - 17}" width="60" height="34" rx="4" fill="${val === 500 ? '#fce7f3' : '#dcfce7'}" stroke="${val === 500 ? '#be185d' : '#15803d'}" stroke-width="1.8"/>`);
			parts.push(`<text x="${x}" y="${y + 4}" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${val} DA</text>`);
		} else {
			const fill = val >= 100 ? '#fef3c7' : val >= 20 ? '#e2e8f0' : '#ffedd5';
			parts.push(`<circle cx="${x}" cy="${y}" r="22" fill="${fill}" stroke="#475569" stroke-width="1.8"/>`);
			parts.push(`<text x="${x}" y="${y + 4}" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${val} DA</text>`);
		}
	});

	return wrapSvg(w, h, parts.join(''));
}

/** Base-ten blocks (hundreds squares, tens rods, ones units) for 2AP */
export function svgBaseTenBlocks(hundreds: number, tens: number, ones: number): string {
	const hCount = Math.min(Math.max(0, hundreds), 9);
	const tCount = Math.min(Math.max(0, tens), 9);
	const oCount = Math.min(Math.max(0, ones), 9);
	const w = 380;
	const h = 110;
	const parts: string[] = [];

	let cursorX = 14;
	// Hundreds (squares)
	for (let i = 0; i < hCount; i++) {
		const x = cursorX + (i % 3) * 34;
		const y = 14 + Math.floor(i / 3) * 30;
		parts.push(`<rect x="${x}" y="${y}" width="26" height="26" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="1.3"/>`);
	}
	if (hCount > 0) cursorX += Math.min(hCount, 3) * 36 + 14;

	// Tens (rods)
	for (let i = 0; i < tCount; i++) {
		const x = cursorX + i * 11;
		parts.push(`<rect x="${x}" y="20" width="7" height="65" fill="#bbf7d0" stroke="#15803d" stroke-width="1.2"/>`);
	}
	if (tCount > 0) cursorX += tCount * 11 + 18;

	// Ones (unit cubes)
	for (let i = 0; i < oCount; i++) {
		const x = cursorX + (i % 3) * 14;
		const y = 26 + Math.floor(i / 3) * 14;
		parts.push(`<rect x="${x}" y="${y}" width="10" height="10" fill="#fde68a" stroke="#b45309" stroke-width="1.2"/>`);
	}

	return wrapSvg(w, h, parts.join(''));
}

/** Graduated number line / signed axis (2AP, 5AP, 2AM) */
export function svgNumberLine(opts: {
	min: number;
	max: number;
	step: number;
	subTicks?: number;
	marks?: { value: number; label: string; color?: string }[];
	hideTickLabels?: boolean;
}): string {
	const w = 440;
	const h = 84;
	const x0 = 32;
	const x1 = 408;
	const y = 46;
	const span = opts.max - opts.min || 1;
	const toX = (v: number) => x0 + ((v - opts.min) / span) * (x1 - x0);

	const parts: string[] = [
		`<line x1="${x0 - 10}" y1="${y}" x2="${x1 + 14}" y2="${y}" stroke="#1e293b" stroke-width="2"/>`,
		`<polygon points="${x1 + 18},${y} ${x1 + 10},${y - 4} ${x1 + 10},${y + 4}" fill="#1e293b"/>`
	];

	const steps = Math.round(span / opts.step);
	const sub = opts.subTicks || 1;
	for (let i = 0; i <= steps * sub; i++) {
		const val = opts.min + (i * opts.step) / sub;
		const x = toX(val);
		const isMajor = i % sub === 0;
		const tickH = isMajor ? 8 : 4;
		parts.push(`<line x1="${x.toFixed(1)}" y1="${y - tickH}" x2="${x.toFixed(1)}" y2="${y + tickH}" stroke="#334155" stroke-width="${isMajor ? 1.8 : 1}"/>`);
		if (isMajor && !opts.hideTickLabels) {
			const txt = Number.isInteger(val) ? String(val) : String(Number(val.toFixed(2)));
			parts.push(`<text x="${x.toFixed(1)}" y="${y + 24}" text-anchor="middle" font-size="11" fill="#0f172a">${txt}</text>`);
		}
	}

	for (const m of opts.marks || []) {
		const x = toX(m.value);
		const col = m.color || '#dc2626';
		parts.push(`<circle cx="${x.toFixed(1)}" cy="${y}" r="4.5" fill="${col}"/>`);
		parts.push(`<text x="${x.toFixed(1)}" y="${y - 16}" text-anchor="middle" font-size="13" font-weight="bold" fill="${col}">${escapeXml(m.label)}</text>`);
	}

	return wrapSvg(w, h, parts.join(''));
}

/** Fraction bar model (5AP / 2AM) */
export function svgFractionBar(shaded: number, total: number, caption?: string): string {
	const w = 360;
	const h = caption ? 76 : 56;
	const barX = 20;
	const barW = 320;
	const barY = 14;
	const barH = 28;
	const cellW = barW / Math.max(1, total);
	const parts: string[] = [];

	for (let i = 0; i < total; i++) {
		const fill = i < shaded ? '#60a5fa' : '#f1f5f9';
		parts.push(`<rect x="${(barX + i * cellW).toFixed(1)}" y="${barY}" width="${cellW.toFixed(1)}" height="${barH}" fill="${fill}" stroke="#1e293b" stroke-width="1.5"/>`);
	}
	if (caption) {
		parts.push(`<text x="${w / 2}" y="64" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">${escapeXml(caption)}</text>`);
	}
	return wrapSvg(w, h, parts.join(''));
}

/** Labeled rectangle or square (2AP, 5AP, 2AM) */
export function svgRectangle(opts: {
	lengthLabel: string;
	widthLabel: string;
	shapeLabel?: string;
	vertices?: [string, string, string, string];
}): string {
	const w = 280;
	const h = 155;
	const rx = 50;
	const ry = 28;
	const rw = 170;
	const rh = 86;
	const v = opts.vertices || ['A', 'B', 'C', 'D'];
	const body = [
		`<rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2.2"/>`,
		`<rect x="${rx}" y="${ry}" width="10" height="10" fill="none" stroke="#dc2626" stroke-width="1.5"/>`,
		`<text x="${rx - 10}" y="${ry - 6}" font-size="13" font-weight="bold" fill="#0f172a">${escapeXml(v[0])}</text>`,
		`<text x="${rx + rw + 6}" y="${ry - 6}" font-size="13" font-weight="bold" fill="#0f172a">${escapeXml(v[1])}</text>`,
		`<text x="${rx + rw + 6}" y="${ry + rh + 14}" font-size="13" font-weight="bold" fill="#0f172a">${escapeXml(v[2])}</text>`,
		`<text x="${rx - 10}" y="${ry + rh + 14}" font-size="13" font-weight="bold" fill="#0f172a">${escapeXml(v[3])}</text>`,
		`<text x="${rx + rw / 2}" y="${ry + rh + 22}" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e293b">${escapeXml(opts.lengthLabel)}</text>`,
		`<text x="${rx + rw + 28}" y="${ry + rh / 2 + 4}" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e293b">${escapeXml(opts.widthLabel)}</text>`,
		opts.shapeLabel
			? `<text x="${rx + rw / 2}" y="${ry + rh / 2 + 5}" text-anchor="middle" font-size="12" fill="#1d4ed8">${escapeXml(opts.shapeLabel)}</text>`
			: ''
	].join('');
	return wrapSvg(w, h, body);
}

/** Triangle diagram (2AM) */
export function svgTriangle(opts: {
	labels?: [string, string, string];
	sideAB?: string;
	sideBC?: string;
	sideAC?: string;
	angleLabels?: [string?, string?, string?];
	rightAngleAtA?: boolean;
	circumcircle?: boolean;
}): string {
	const w = 260;
	const h = 190;
	const A = opts.rightAngleAtA ? { x: 60, y: 145 } : { x: 130, y: 34 };
	const B = { x: 60, y: 145 };
	const C = { x: 205, y: 145 };
	const topPt = opts.rightAngleAtA ? { x: 60, y: 38 } : A;
	const pA = opts.rightAngleAtA ? B : topPt;
	const pB = opts.rightAngleAtA ? topPt : B;
	const pC = C;
	const lbl = opts.labels || ['A', 'B', 'C'];

	const parts: string[] = [];
	if (opts.circumcircle) {
		parts.push(`<circle cx="132" cy="108" r="76" fill="none" stroke="#94a3b8" stroke-dasharray="4 3" stroke-width="1.5"/>`);
	}
	parts.push(`<polygon points="${pA.x},${pA.y} ${pB.x},${pB.y} ${pC.x},${pC.y}" fill="#f0fdf4" stroke="#15803d" stroke-width="2.2"/>`);
	if (opts.rightAngleAtA) {
		parts.push(`<rect x="${pA.x}" y="${pA.y - 12}" width="12" height="12" fill="none" stroke="#dc2626" stroke-width="1.5"/>`);
	}
	parts.push(`<text x="${pA.x - 14}" y="${pA.y + (opts.rightAngleAtA ? 14 : -8)}" font-size="13" font-weight="bold" fill="#0f172a">${escapeXml(lbl[0])}</text>`);
	parts.push(`<text x="${pB.x - 14}" y="${pB.y + (opts.rightAngleAtA ? -6 : 14)}" font-size="13" font-weight="bold" fill="#0f172a">${escapeXml(lbl[1])}</text>`);
	parts.push(`<text x="${pC.x + 8}" y="${pC.y + 14}" font-size="13" font-weight="bold" fill="#0f172a">${escapeXml(lbl[2])}</text>`);

	if (opts.sideAB) parts.push(`<text x="${(pA.x + pB.x) / 2 - 26}" y="${(pA.y + pB.y) / 2}" font-size="11" font-weight="bold" fill="#1e293b">${escapeXml(opts.sideAB)}</text>`);
	if (opts.sideBC) parts.push(`<text x="${(pB.x + pC.x) / 2 + 12}" y="${(pB.y + pC.y) / 2 - 8}" font-size="11" font-weight="bold" fill="#1e293b">${escapeXml(opts.sideBC)}</text>`);
	if (opts.sideAC) parts.push(`<text x="${(pA.x + pC.x) / 2}" y="${pC.y + 24}" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e293b">${escapeXml(opts.sideAC)}</text>`);

	if (opts.angleLabels?.[0]) parts.push(`<text x="${pA.x + 14}" y="${pA.y + (opts.rightAngleAtA ? -16 : 24)}" font-size="11" fill="#dc2626">${escapeXml(opts.angleLabels[0])}</text>`);
	if (opts.angleLabels?.[1]) parts.push(`<text x="${pB.x + 16}" y="${pB.y - 8}" font-size="11" fill="#dc2626">${escapeXml(opts.angleLabels[1])}</text>`);
	if (opts.angleLabels?.[2]) parts.push(`<text x="${pC.x - 38}" y="${pC.y - 8}" font-size="11" fill="#dc2626">${escapeXml(opts.angleLabels[2])}</text>`);

	return wrapSvg(w, h, parts.join(''));
}

/** Parallel lines cut by a transversal (2AM) */
export function svgParallelAngles(opts: { angleTopLabel: string; angleBottomLabel: string; lineNames?: [string, string] }): string {
	const w = 280;
	const h = 165;
	const [l1, l2] = opts.lineNames || ['(d)', "(d')"];
	const parts = [
		`<line x1="25" y1="45" x2="245" y2="45" stroke="#1d4ed8" stroke-width="2.2"/>`,
		`<line x1="25" y1="120" x2="245" y2="120" stroke="#1d4ed8" stroke-width="2.2"/>`,
		`<line x1="85" y1="15" x2="185" y2="152" stroke="#0f172a" stroke-width="2"/>`,
		`<text x="250" y="49" font-size="12" font-weight="bold" fill="#1d4ed8">${escapeXml(l1)}</text>`,
		`<text x="250" y="124" font-size="12" font-weight="bold" fill="#1d4ed8">${escapeXml(l2)}</text>`,
		`<path d="M 122 45 A 16 16 0 0 0 116 58" fill="none" stroke="#dc2626" stroke-width="2"/>`,
		`<text x="132" y="64" font-size="12" font-weight="bold" fill="#dc2626">${escapeXml(opts.angleTopLabel)}</text>`,
		`<path d="M 178 120 A 16 16 0 0 0 172 106" fill="none" stroke="#15803d" stroke-width="2"/>`,
		`<text x="184" y="112" font-size="12" font-weight="bold" fill="#15803d">${escapeXml(opts.angleBottomLabel)}</text>`
	];
	return wrapSvg(w, h, parts.join(''));
}

/** Parallelogram with optional diagonals & height (2AM) */
export function svgParallelogram(opts: {
	baseLabel: string;
	heightLabel?: string;
	vertices?: [string, string, string, string];
	showDiagonals?: boolean;
}): string {
	const w = 280;
	const h = 160;
	const v = opts.vertices || ['A', 'B', 'C', 'D'];
	const A = { x: 75, y: 36 };
	const B = { x: 225, y: 36 };
	const C = { x: 190, y: 120 };
	const D = { x: 40, y: 120 };
	const parts = [
		`<polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}" fill="#fefce8" stroke="#ca8a04" stroke-width="2.2"/>`,
		`<text x="${A.x - 10}" y="${A.y - 8}" font-size="13" font-weight="bold" fill="#0f172a">${escapeXml(v[0])}</text>`,
		`<text x="${B.x + 6}" y="${B.y - 8}" font-size="13" font-weight="bold" fill="#0f172a">${escapeXml(v[1])}</text>`,
		`<text x="${C.x + 6}" y="${C.y + 14}" font-size="13" font-weight="bold" fill="#0f172a">${escapeXml(v[2])}</text>`,
		`<text x="${D.x - 14}" y="${D.y + 14}" font-size="13" font-weight="bold" fill="#0f172a">${escapeXml(v[3])}</text>`,
		`<text x="${(D.x + C.x) / 2}" y="${D.y + 22}" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">${escapeXml(opts.baseLabel)}</text>`
	];
	if (opts.heightLabel) {
		parts.push(`<line x1="${A.x}" y1="${A.y}" x2="${A.x}" y2="${D.y}" stroke="#dc2626" stroke-dasharray="4 3" stroke-width="1.8"/>`);
		parts.push(`<rect x="${A.x}" y="${D.y - 8}" width="8" height="8" fill="none" stroke="#dc2626" stroke-width="1.3"/>`);
		parts.push(`<text x="${A.x + 6}" y="${(A.y + D.y) / 2}" font-size="11" font-weight="bold" fill="#dc2626">${escapeXml(opts.heightLabel)}</text>`);
	}
	if (opts.showDiagonals) {
		parts.push(`<line x1="${A.x}" y1="${A.y}" x2="${C.x}" y2="${C.y}" stroke="#64748b" stroke-dasharray="3 3" stroke-width="1.5"/>`);
		parts.push(`<line x1="${B.x}" y1="${B.y}" x2="${D.x}" y2="${D.y}" stroke="#64748b" stroke-dasharray="3 3" stroke-width="1.5"/>`);
		parts.push(`<circle cx="132.5" cy="78" r="3.5" fill="#dc2626"/>`);
		parts.push(`<text x="137" y="74" font-size="12" font-weight="bold" fill="#dc2626">O</text>`);
	}
	return wrapSvg(w, h, parts.join(''));
}

/** Cylinder or triangular prism (2AM T3) */
export function svgPrismCylinder(opts: {
	kind: 'cylinder' | 'prism';
	radiusOrBaseLabel: string;
	heightLabel: string;
}): string {
	const w = 220;
	const h = 175;
	const parts: string[] = [];
	if (opts.kind === 'cylinder') {
		parts.push(
			`<ellipse cx="105" cy="36" rx="48" ry="15" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>`,
			`<line x1="57" y1="36" x2="57" y2="132" stroke="#0284c7" stroke-width="2"/>`,
			`<line x1="153" y1="36" x2="153" y2="132" stroke="#0284c7" stroke-width="2"/>`,
			`<path d="M 57 132 A 48 15 0 0 0 153 132" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>`,
			`<path d="M 57 132 A 48 15 0 0 1 153 132" fill="none" stroke="#0284c7" stroke-dasharray="4 3" stroke-width="1.5"/>`,
			`<line x1="105" y1="36" x2="153" y2="36" stroke="#dc2626" stroke-width="1.8"/>`,
			`<text x="129" y="30" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">${escapeXml(opts.radiusOrBaseLabel)}</text>`,
			`<text x="166" y="88" font-size="12" font-weight="bold" fill="#0f172a">${escapeXml(opts.heightLabel)}</text>`
		);
	} else {
		parts.push(
			`<polygon points="105,20 55,54 155,54" fill="#ede9fe" stroke="#6d28d9" stroke-width="2"/>`,
			`<line x1="55" y1="54" x2="55" y2="136" stroke="#6d28d9" stroke-width="2"/>`,
			`<line x1="155" y1="54" x2="155" y2="136" stroke="#6d28d9" stroke-width="2"/>`,
			`<line x1="105" y1="20" x2="105" y2="102" stroke="#6d28d9" stroke-dasharray="4 3" stroke-width="1.5"/>`,
			`<line x1="55" y1="136" x2="155" y2="136" stroke="#6d28d9" stroke-width="2"/>`,
			`<line x1="55" y1="136" x2="105" y2="102" stroke="#6d28d9" stroke-dasharray="4 3" stroke-width="1.5"/>`,
			`<line x1="155" y1="136" x2="105" y2="102" stroke="#6d28d9" stroke-dasharray="4 3" stroke-width="1.5"/>`,
			`<text x="105" y="155" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${escapeXml(opts.radiusOrBaseLabel)}</text>`,
			`<text x="166" y="96" font-size="12" font-weight="bold" fill="#0f172a">${escapeXml(opts.heightLabel)}</text>`
		);
	}
	return wrapSvg(w, h, parts.join(''));
}

/** Bar chart for 2AM Statistics */
export function svgBarChart(bars: { label: string; value: number }[], maxVal: number): string {
	const w = 360;
	const h = 175;
	const ox = 42;
	const oy = 140;
	const plotW = 290;
	const plotH = 110;
	const barSlot = plotW / Math.max(1, bars.length);
	const barW = Math.min(36, barSlot * 0.62);
	const parts = [
		`<line x1="${ox}" y1="${oy - plotH}" x2="${ox}" y2="${oy}" stroke="#1e293b" stroke-width="1.8"/>`,
		`<line x1="${ox}" y1="${oy}" x2="${ox + plotW}" y2="${oy}" stroke="#1e293b" stroke-width="1.8"/>`
	];

	bars.forEach((b, idx) => {
		const bh = (b.value / Math.max(1, maxVal)) * plotH;
		const bx = ox + idx * barSlot + (barSlot - barW) / 2;
		const by = oy - bh;
		parts.push(`<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${barW.toFixed(1)}" height="${bh.toFixed(1)}" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1.2"/>`);
		parts.push(`<text x="${(bx + barW / 2).toFixed(1)}" y="${(by - 4).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${b.value}</text>`);
		parts.push(`<text x="${(bx + barW / 2).toFixed(1)}" y="${oy + 16}" text-anchor="middle" font-size="11" fill="#334155">${escapeXml(b.label)}</text>`);
	});

	return wrapSvg(w, h, parts.join(''));
}

/** Visual counting groups (1AP / 2AP) */
export function svgCountingObjects(opts: {
	count: number;
	kind?: 'apple' | 'star' | 'ball' | 'pencil';
	perRow?: number;
	secondGroupCount?: number;
	operatorLabel?: string;
}): string {
	const count1 = Math.max(0, Math.min(opts.count, 30));
	const count2 = opts.secondGroupCount !== undefined ? Math.max(0, Math.min(opts.secondGroupCount, 30)) : null;
	const perRow = Math.max(1, Math.min(opts.perRow ?? 5, 10));
	const kind = opts.kind ?? 'apple';
	const cell = 30;

	const drawItem = (cx: number, cy: number): string => {
		if (kind === 'star') {
			return `<polygon points="${cx},${cy - 10} ${cx + 3},${cy - 3} ${cx + 10},${cy - 3} ${cx + 5},${cy + 2} ${cx + 7},${cy + 9} ${cx},${cy + 5} ${cx - 7},${cy + 9} ${cx - 5},${cy + 2} ${cx - 10},${cy - 3} ${cx - 3},${cy - 3}" fill="#facc15" stroke="#ca8a04" stroke-width="1.4"/>`;
		}
		if (kind === 'ball') {
			return `<circle cx="${cx}" cy="${cy}" r="10" fill="#60a5fa" stroke="#1d4ed8" stroke-width="1.5"/><path d="M ${cx - 8} ${cy} Q ${cx} ${cy - 7} ${cx + 8} ${cy}" fill="none" stroke="#eff6ff" stroke-width="1.5"/>`;
		}
		if (kind === 'pencil') {
			return `<rect x="${cx - 9}" y="${cy - 4}" width="14" height="8" rx="1.5" fill="#fb923c" stroke="#c2410c" stroke-width="1.2"/><polygon points="${cx + 5},${cy - 4} ${cx + 11},${cy} ${cx + 5},${cy + 4}" fill="#fde68a" stroke="#c2410c" stroke-width="1.2"/>`;
		}
		return `<circle cx="${cx}" cy="${cy + 1}" r="10" fill="#ef4444" stroke="#991b1b" stroke-width="1.4"/><line x1="${cx}" y1="${cy - 9}" x2="${cx}" y2="${cy - 13}" stroke="#713f12" stroke-width="2"/><ellipse cx="${cx + 4}" cy="${cy - 11}" rx="4" ry="2.2" fill="#22c55e"/>`;
	};

	const cols1 = Math.min(perRow, Math.max(1, count1));
	const rows1 = Math.max(1, Math.ceil(count1 / perRow));
	const box1W = cols1 * cell + 16;
	const cols2 = count2 !== null ? Math.min(perRow, Math.max(1, count2)) : 0;
	const rows2 = count2 !== null ? Math.max(1, Math.ceil(count2 / perRow)) : 0;
	const box2W = count2 !== null ? cols2 * cell + 16 : 0;
	const opW = count2 !== null ? 36 : 0;
	const totalRows = Math.max(rows1, rows2);
	const boxH = totalRows * cell + 18;
	const w = 24 + box1W + opW + box2W;
	const h = boxH + 24;

	const parts: string[] = [
		`<rect x="12" y="12" width="${box1W}" height="${boxH}" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"/>`
	];

	for (let i = 0; i < count1; i++) {
		const r = Math.floor(i / perRow);
		const c = i % perRow;
		parts.push(drawItem(20 + c * cell + cell / 2, 20 + r * cell + cell / 2));
	}

	if (count2 !== null) {
		const opX = 12 + box1W + opW / 2;
		const opY = 12 + boxH / 2 + 6;
		parts.push(`<text x="${opX}" y="${opY}" text-anchor="middle" font-size="22" font-weight="bold" fill="#1d4ed8">${escapeXml(opts.operatorLabel || '+')}</text>`);
		const bx2 = 12 + box1W + opW;
		parts.push(`<rect x="${bx2}" y="12" width="${box2W}" height="${boxH}" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"/>`);
		for (let i = 0; i < count2; i++) {
			const r = Math.floor(i / perRow);
			const c = i % perRow;
			parts.push(drawItem(bx2 + 8 + c * cell + cell / 2, 20 + r * cell + cell / 2));
		}
	}

	return wrapSvg(w, h, parts.join(''));
}

/** Basic geometric shapes strip (1AP / 2AP / 3AP) */
export function svgShapesStrip(opts: {
	shapes: ('square' | 'rectangle' | 'triangle' | 'circle')[];
	highlightIndex?: number;
	labels?: string[];
}): string {
	const slotW = 76;
	const pad = 16;
	const n = Math.max(1, opts.shapes.length);
	const w = pad * 2 + n * slotW;
	const h = opts.labels && opts.labels.length > 0 ? 102 : 84;
	const parts: string[] = [];

	opts.shapes.forEach((shape, idx) => {
		const cx = pad + idx * slotW + slotW / 2;
		const cy = 42;
		const isHi = opts.highlightIndex === idx;
		const fill = isHi ? '#fde68a' : '#dbeafe';
		const stroke = isHi ? '#b45309' : '#1d4ed8';
		const sw = isHi ? 2.6 : 1.8;

		if (shape === 'square') {
			parts.push(`<rect x="${cx - 22}" y="${cy - 22}" width="44" height="44" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`);
		} else if (shape === 'rectangle') {
			parts.push(`<rect x="${cx - 30}" y="${cy - 17}" width="60" height="34" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`);
		} else if (shape === 'triangle') {
			parts.push(`<polygon points="${cx},${cy - 23} ${cx - 26},${cy + 21} ${cx + 26},${cy + 21}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`);
		} else {
			parts.push(`<circle cx="${cx}" cy="${cy}" r="22" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`);
		}

		if (opts.labels?.[idx]) {
			parts.push(`<text x="${cx}" y="90" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escapeXml(opts.labels[idx])}</text>`);
		}
	});

	return wrapSvg(w, h, parts.join(''));
}

/** Thales configuration (3AM / 4AM): nested triangle or butterfly */
export function svgThalesConfig(opts: {
	mode: 'triangle' | 'butterfly';
	vertices?: [string, string, string, string, string];
	sideLabels?: Record<string, string>;
}): string {
	const v = opts.vertices || ['A', 'B', 'C', 'M', 'N'];
	const lbls = opts.sideLabels || {};
	const w = 280;
	const h = 195;
	const parts: string[] = [];

	if (opts.mode === 'triangle') {
		const A = { x: 140, y: 24 };
		const B = { x: 45, y: 168 };
		const C = { x: 235, y: 168 };
		const M = { x: 85, y: 108 };
		const N = { x: 195, y: 108 };
		parts.push(
			`<polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}" fill="#f0fdf4" stroke="#15803d" stroke-width="2.2"/>`,
			`<line x1="${M.x}" y1="${M.y}" x2="${N.x}" y2="${N.y}" stroke="#dc2626" stroke-width="2.2"/>`,
			`<text x="${A.x - 4}" y="${A.y - 7}" font-size="13" font-weight="bold" fill="#0f172a">${escapeXml(v[0])}</text>`,
			`<text x="${B.x - 16}" y="${B.y + 8}" font-size="13" font-weight="bold" fill="#0f172a">${escapeXml(v[1])}</text>`,
			`<text x="${C.x + 8}" y="${C.y + 8}" font-size="13" font-weight="bold" fill="#0f172a">${escapeXml(v[2])}</text>`,
			`<text x="${M.x - 18}" y="${M.y + 4}" font-size="13" font-weight="bold" fill="#dc2626">${escapeXml(v[3])}</text>`,
			`<text x="${N.x + 8}" y="${N.y + 4}" font-size="13" font-weight="bold" fill="#dc2626">${escapeXml(v[4])}</text>`
		);
		if (lbls.AM) parts.push(`<text x="95" y="64" font-size="11" font-weight="bold" fill="#1d4ed8">${escapeXml(lbls.AM)}</text>`);
		if (lbls.AN) parts.push(`<text x="176" y="64" font-size="11" font-weight="bold" fill="#1d4ed8">${escapeXml(lbls.AN)}</text>`);
		if (lbls.AB) parts.push(`<text x="48" y="138" font-size="11" font-weight="bold" fill="#0f172a">${escapeXml(lbls.AB)}</text>`);
		if (lbls.AC) parts.push(`<text x="218" y="138" font-size="11" font-weight="bold" fill="#0f172a">${escapeXml(lbls.AC)}</text>`);
		if (lbls.MN) parts.push(`<text x="140" y="102" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">${escapeXml(lbls.MN)}</text>`);
		if (lbls.BC) parts.push(`<text x="140" y="185" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">${escapeXml(lbls.BC)}</text>`);
	} else {
		const A = { x: 140, y: 98 };
		const B = { x: 52, y: 34 };
		const C = { x: 228, y: 34 };
		const M = { x: 222, y: 162 };
		const N = { x: 58, y: 162 };
		parts.push(
			`<line x1="${B.x}" y1="${B.y}" x2="${M.x}" y2="${M.y}" stroke="#0f172a" stroke-width="2"/>`,
			`<line x1="${C.x}" y1="${C.y}" x2="${N.x}" y2="${N.y}" stroke="#0f172a" stroke-width="2"/>`,
			`<line x1="${B.x}" y1="${B.y}" x2="${C.x}" y2="${C.y}" stroke="#15803d" stroke-width="2.2"/>`,
			`<line x1="${N.x}" y1="${N.y}" x2="${M.x}" y2="${M.y}" stroke="#dc2626" stroke-width="2.2"/>`,
			`<circle cx="${A.x}" cy="${A.y}" r="3.5" fill="#1d4ed8"/>`,
			`<text x="${A.x + 8}" y="${A.y + 4}" font-size="13" font-weight="bold" fill="#1d4ed8">${escapeXml(v[0])}</text>`,
			`<text x="${B.x - 16}" y="${B.y}" font-size="13" font-weight="bold" fill="#0f172a">${escapeXml(v[1])}</text>`,
			`<text x="${C.x + 8}" y="${C.y}" font-size="13" font-weight="bold" fill="#0f172a">${escapeXml(v[2])}</text>`,
			`<text x="${M.x + 8}" y="${M.y + 6}" font-size="13" font-weight="bold" fill="#dc2626">${escapeXml(v[3])}</text>`,
			`<text x="${N.x - 16}" y="${N.y + 6}" font-size="13" font-weight="bold" fill="#dc2626">${escapeXml(v[4])}</text>`
		);
		if (lbls.BC) parts.push(`<text x="140" y="24" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">${escapeXml(lbls.BC)}</text>`);
		if (lbls.MN) parts.push(`<text x="140" y="182" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">${escapeXml(lbls.MN)}</text>`);
		if (lbls.AB) parts.push(`<text x="82" y="72" font-size="11" font-weight="bold" fill="#0f172a">${escapeXml(lbls.AB)}</text>`);
		if (lbls.AM) parts.push(`<text x="188" y="132" font-size="11" font-weight="bold" fill="#dc2626">${escapeXml(lbls.AM)}</text>`);
	}

	return wrapSvg(w, h, parts.join(''));
}

/** Cartesian plane (1AM / 2AM / 4AM) with points, linear/affine lines, and vectors */
export function svgCartesianPlane(opts: {
	xMin?: number;
	xMax?: number;
	yMin?: number;
	yMax?: number;
	points?: { x: number; y: number; label: string; color?: string }[];
	lines?: { a: number; b: number; label?: string; color?: string }[];
	vectors?: { x1: number; y1: number; x2: number; y2: number; label?: string; color?: string }[];
}): string {
	const xMin = opts.xMin ?? -4;
	const xMax = opts.xMax ?? 4;
	const yMin = opts.yMin ?? -4;
	const yMax = opts.yMax ?? 4;
	const w = 280;
	const h = 250;
	const pad = 26;
	const spanX = Math.max(1, xMax - xMin);
	const spanY = Math.max(1, yMax - yMin);
	const toPxX = (x: number) => pad + ((x - xMin) / spanX) * (w - pad * 2);
	const toPxY = (y: number) => h - pad - ((y - yMin) / spanY) * (h - pad * 2);
	const parts: string[] = [];

	for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
		const px = toPxX(x);
		parts.push(`<line x1="${px.toFixed(1)}" y1="${pad}" x2="${px.toFixed(1)}" y2="${h - pad}" stroke="${x === 0 ? '#0f172a' : '#e2e8f0'}" stroke-width="${x === 0 ? 1.8 : 1}"/>`);
		if (x !== 0) {
			parts.push(`<text x="${px.toFixed(1)}" y="${(toPxY(0) + 13).toFixed(1)}" text-anchor="middle" font-size="9.5" fill="#475569">${x}</text>`);
		}
	}
	for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
		const py = toPxY(y);
		parts.push(`<line x1="${pad}" y1="${py.toFixed(1)}" x2="${w - pad}" y2="${py.toFixed(1)}" stroke="${y === 0 ? '#0f172a' : '#e2e8f0'}" stroke-width="${y === 0 ? 1.8 : 1}"/>`);
		if (y !== 0) {
			parts.push(`<text x="${(toPxX(0) - 8).toFixed(1)}" y="${(py + 3).toFixed(1)}" text-anchor="end" font-size="9.5" fill="#475569">${y}</text>`);
		}
	}

	parts.push(`<text x="${(toPxX(0) - 8).toFixed(1)}" y="${(toPxY(0) + 12).toFixed(1)}" text-anchor="end" font-size="10" font-weight="bold" fill="#0f172a">O</text>`);

	for (const ln of opts.lines || []) {
		const pts: [number, number][] = [];
		for (const x of [xMin, xMax]) {
			const y = ln.a * x + ln.b;
			if (y >= yMin && y <= yMax) pts.push([x, y]);
		}
		if (pts.length < 2 && ln.a !== 0) {
			for (const y of [yMin, yMax]) {
				const x = (y - ln.b) / ln.a;
				if (x >= xMin && x <= xMax) pts.push([x, y]);
			}
		}
		if (pts.length >= 2) {
			const [p1, p2] = [pts[0], pts[pts.length - 1]];
			const col = ln.color || '#2563eb';
			parts.push(`<line x1="${toPxX(p1[0]).toFixed(1)}" y1="${toPxY(p1[1]).toFixed(1)}" x2="${toPxX(p2[0]).toFixed(1)}" y2="${toPxY(p2[1]).toFixed(1)}" stroke="${col}" stroke-width="2.2"/>`);
			if (ln.label) {
				parts.push(`<text x="${toPxX(p2[0]).toFixed(1)}" y="${(toPxY(p2[1]) - 6).toFixed(1)}" font-size="10" font-weight="bold" fill="${col}">${escapeXml(ln.label)}</text>`);
			}
		}
	}

	for (const vec of opts.vectors || []) {
		const col = vec.color || '#15803d';
		const x1 = toPxX(vec.x1);
		const y1 = toPxY(vec.y1);
		const x2 = toPxX(vec.x2);
		const y2 = toPxY(vec.y2);
		const ang = Math.atan2(y2 - y1, x2 - x1);
		const ah = 8;
		const p1x = x2 - ah * Math.cos(ang - 0.45);
		const p1y = y2 - ah * Math.sin(ang - 0.45);
		const p2x = x2 - ah * Math.cos(ang + 0.45);
		const p2y = y2 - ah * Math.sin(ang + 0.45);
		parts.push(`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${col}" stroke-width="2.2"/>`);
		parts.push(`<polygon points="${x2.toFixed(1)},${y2.toFixed(1)} ${p1x.toFixed(1)},${p1y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)}" fill="${col}"/>`);
		if (vec.label) {
			parts.push(`<text x="${((x1 + x2) / 2 + 6).toFixed(1)}" y="${((y1 + y2) / 2 - 6).toFixed(1)}" font-size="11" font-weight="bold" fill="${col}">${escapeXml(vec.label)}</text>`);
		}
	}

	for (const pt of opts.points || []) {
		const px = toPxX(pt.x);
		const py = toPxY(pt.y);
		const col = pt.color || '#dc2626';
		parts.push(`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="4" fill="${col}"/>`);
		parts.push(`<text x="${(px + 6).toFixed(1)}" y="${(py - 5).toFixed(1)}" font-size="11" font-weight="bold" fill="${col}">${escapeXml(pt.label)}</text>`);
	}

	return wrapSvg(w, h, parts.join(''));
}

export * from './svg-secondary';
