import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate } from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../rng';
import { saveSvgAsset, svgNumberLine } from '../../svg-helpers';

// ═══════════════════════════════════════════════════════════════════════════════
// Precision-Safe Decimal & Dual-Renderer (KaTeX / Typst) Formatting Helpers
// ═══════════════════════════════════════════════════════════════════════════════

const POW10 = [1, 10, 100, 1000, 10000, 100000] as const;

/** Formats a positive integer scaled by 10^decimals as a canonical decimal string without trailing zeros. */
function formatScaledDec(intVal: number, decimals: 0 | 1 | 2 | 3 | 4 | 5): string {
	const clean = Math.round(Math.abs(intVal));
	if (decimals === 0) return String(clean);
	const scale = POW10[decimals];
	const whole = Math.floor(clean / scale);
	const fracNum = clean % scale;
	if (fracNum === 0) return String(whole);
	const fracStr = String(fracNum).padStart(decimals, '0').replace(/0+$/, '');
	return `${whole}.${fracStr}`;
}

/** Formats a positive integer scaled by 10^decimals with fixed trailing zeros (for alignment/comparison). */
function formatScaledFixed(intVal: number, decimals: 1 | 2 | 3): string {
	const clean = Math.round(Math.abs(intVal));
	const scale = POW10[decimals];
	const whole = Math.floor(clean / scale);
	const fracNum = clean % scale;
	return `${whole}.${String(fracNum).padStart(decimals, '0')}`;
}

/** Shifts decimal point of `digits / 10^decPlaces` by `rightShift` places cleanly without float drift. */
function shiftDecimalExact(digits: number, decPlaces: number, rightShift: number): string {
	const newDec = decPlaces - rightShift;
	if (newDec <= 0) {
		return String(digits * Math.pow(10, -newDec));
	}
	const scale = Math.pow(10, newDec);
	const whole = Math.floor(digits / scale);
	const fracNum = digits % scale;
	if (fracNum === 0) return String(whole);
	const fracStr = String(fracNum).padStart(newDec, '0').replace(/0+$/, '');
	return `${whole}.${fracStr}`;
}

function toCommaDecimal(dotStr: string): string {
	return dotStr.replace('.', ',');
}

function acceptedDecimalForms(dotStr: string): string[] {
	const comma = toCommaDecimal(dotStr);
	return comma === dotStr ? [dotStr] : [dotStr, comma];
}

function formatSpaceAscii(n: number): string {
	return Math.trunc(n)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function formatKatexInt(n: number): string {
	return Math.trunc(n)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,');
}

function formatTypstInt(n: number): string {
	const s = formatSpaceAscii(n);
	return s.includes(' ') ? `"${s}"` : s;
}

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

// ═══════════════════════════════════════════════════════════════════════════════
// Custom 1AM T1 SVG Builders (Saved via saveSvgAsset)
// ═══════════════════════════════════════════════════════════════════════════════

/** Perpendicular & parallel lines with segment midpoint and off-line point */
function svgPerpParallelLines(opts: {
	lineMain: string;
	line1: string;
	line2: string;
	pts: [string, string, string, string]; // [A, M, B, K]
	halfLenLabel: string;
}): string {
	const w = 320;
	const h = 195;
	const [pA, pM, pB, pK] = opts.pts;
	const yMain = 142;
	const xA = 80;
	const xM = 155;
	const xB = 230;
	const xK = 278;
	const yK = 46;

	const parts = [
		// Main horizontal line (Delta)
		`<line x1="20" y1="${yMain}" x2="300" y2="${yMain}" stroke="#0f172a" stroke-width="2.2"/>`,
		// Perpendicular lines (d1) and (d2)
		`<line x1="${xA}" y1="22" x2="${xA}" y2="178" stroke="#2563eb" stroke-width="2.1"/>`,
		`<line x1="${xB}" y1="22" x2="${xB}" y2="178" stroke="#16a34a" stroke-width="2.1"/>`,
		// Right-angle markers
		`<rect x="${xA}" y="${yMain - 12}" width="12" height="12" fill="none" stroke="#dc2626" stroke-width="1.6"/>`,
		`<rect x="${xB}" y="${yMain - 12}" width="12" height="12" fill="none" stroke="#dc2626" stroke-width="1.6"/>`,
		// Equal segment tick marks on [AM] and [MB]
		`<line x1="${(xA + xM) / 2 - 2}" y1="${yMain - 5}" x2="${(xA + xM) / 2 + 2}" y2="${yMain + 5}" stroke="#dc2626" stroke-width="2"/>`,
		`<line x1="${(xM + xB) / 2 - 2}" y1="${yMain - 5}" x2="${(xM + xB) / 2 + 2}" y2="${yMain + 5}" stroke="#dc2626" stroke-width="2"/>`,
		// Points A, M, B, K
		`<circle cx="${xA}" cy="${yMain}" r="3.8" fill="#0f172a"/>`,
		`<circle cx="${xM}" cy="${yMain}" r="4.2" fill="#dc2626"/>`,
		`<circle cx="${xB}" cy="${yMain}" r="3.8" fill="#0f172a"/>`,
		`<circle cx="${xK}" cy="${yK}" r="4.2" fill="#7c3aed"/>`,
		// Labels
		`<text x="${xA - 14}" y="${yMain + 18}" font-size="12" font-weight="bold" fill="#0f172a">${escapeXml(pA)}</text>`,
		`<text x="${xM - 4}" y="${yMain + 18}" font-size="12" font-weight="bold" fill="#dc2626">${escapeXml(pM)}</text>`,
		`<text x="${xB + 8}" y="${yMain + 18}" font-size="12" font-weight="bold" fill="#0f172a">${escapeXml(pB)}</text>`,
		`<text x="${xK + 8}" y="${yK + 4}" font-size="12" font-weight="bold" fill="#7c3aed">${escapeXml(pK)}</text>`,
		`<text x="28" y="${yMain - 8}" font-size="12" font-weight="bold" fill="#0f172a">${escapeXml(opts.lineMain)}</text>`,
		`<text x="${xA - 28}" y="34" font-size="12" font-weight="bold" fill="#2563eb">${escapeXml(opts.line1)}</text>`,
		`<text x="${xB + 8}" y="34" font-size="12" font-weight="bold" fill="#16a34a">${escapeXml(opts.line2)}</text>`,
		`<text x="${(xA + xM) / 2}" y="${yMain - 14}" text-anchor="middle" font-size="11" font-weight="bold" fill="#475569">${escapeXml(opts.halfLenLabel)}</text>`
	];
	return wrapSvg(w, h, parts.join(''));
}

/** Circle (C) with diameter [AB], radius [OM], chord [EF], highlighted arc EF, and point K */
function svgCircleElements(opts: {
	center: string;
	diamPts: [string, string];
	radPt: string;
	chordPts: [string, string];
	extraPt: string;
	diamLabel: string;
	extraDistLabel: string;
	extraInside: boolean;
}): string {
	const w = 320;
	const h = 210;
	const cx = 158;
	const cy = 104;
	const r = 68;
	const [pA, pB] = opts.diamPts;
	const [pE, pF] = opts.chordPts;

	// M at -45 deg (upper right)
	const mx = cx + r * Math.cos((-45 * Math.PI) / 180);
	const my = cy + r * Math.sin((-45 * Math.PI) / 180);

	// Chord EF across lower part (138 deg to 32 deg)
	const ex = cx + r * Math.cos((138 * Math.PI) / 180);
	const ey = cy + r * Math.sin((138 * Math.PI) / 180);
	const fx = cx + r * Math.cos((32 * Math.PI) / 180);
	const fy = cy + r * Math.sin((32 * Math.PI) / 180);

	// Extra point K inside (r=40, -135 deg) or outside (r=88, -142 deg)
	const rk = opts.extraInside ? 42 : 88;
	const angK = ((opts.extraInside ? -135 : -144) * Math.PI) / 180;
	const kx = cx + rk * Math.cos(angK);
	const ky = cy + rk * Math.sin(angK);

	const parts = [
		// Circle (C)
		`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#eff6ff" fill-opacity="0.35" stroke="#2563eb" stroke-width="2.1"/>`,
		// Highlighted arc EF (bottom arc, sweep-flag 0)
		`<path d="M ${ex.toFixed(1)} ${ey.toFixed(1)} A ${r} ${r} 0 0 0 ${fx.toFixed(1)} ${fy.toFixed(1)}" fill="none" stroke="#ea580c" stroke-width="4"/>`,
		// Diameter [AB]
		`<line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="#dc2626" stroke-width="2"/>`,
		// Radius [OM]
		`<line x1="${cx}" y1="${cy}" x2="${mx.toFixed(1)}" y2="${my.toFixed(1)}" stroke="#7c3aed" stroke-width="2"/>`,
		// Chord [EF]
		`<line x1="${ex.toFixed(1)}" y1="${ey.toFixed(1)}" x2="${fx.toFixed(1)}" y2="${fy.toFixed(1)}" stroke="#16a34a" stroke-width="2"/>`,
		// Segment [OK]
		`<line x1="${cx}" y1="${cy}" x2="${kx.toFixed(1)}" y2="${ky.toFixed(1)}" stroke="#d97706" stroke-width="1.6" stroke-dasharray="4 3"/>`,
		// Points
		`<circle cx="${cx}" cy="${cy}" r="3.8" fill="#0f172a"/>`,
		`<circle cx="${cx - r}" cy="${cy}" r="3.5" fill="#dc2626"/>`,
		`<circle cx="${cx + r}" cy="${cy}" r="3.5" fill="#dc2626"/>`,
		`<circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="3.5" fill="#7c3aed"/>`,
		`<circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="3.5" fill="#16a34a"/>`,
		`<circle cx="${fx.toFixed(1)}" cy="${fy.toFixed(1)}" r="3.5" fill="#16a34a"/>`,
		`<circle cx="${kx.toFixed(1)}" cy="${ky.toFixed(1)}" r="3.8" fill="#d97706"/>`,
		// Labels
		`<text x="${cx + 4}" y="${cy + 15}" font-size="12" font-weight="bold" fill="#0f172a">${escapeXml(opts.center)}</text>`,
		`<text x="${cx - r - 15}" y="${cy + 4}" font-size="12" font-weight="bold" fill="#dc2626">${escapeXml(pA)}</text>`,
		`<text x="${cx + r + 8}" y="${cy + 4}" font-size="12" font-weight="bold" fill="#dc2626">${escapeXml(pB)}</text>`,
		`<text x="${(mx + 6).toFixed(1)}" y="${(my - 4).toFixed(1)}" font-size="12" font-weight="bold" fill="#7c3aed">${escapeXml(opts.radPt)}</text>`,
		`<text x="${(ex - 14).toFixed(1)}" y="${(ey + 10).toFixed(1)}" font-size="12" font-weight="bold" fill="#16a34a">${escapeXml(pE)}</text>`,
		`<text x="${(fx + 7).toFixed(1)}" y="${(fy + 10).toFixed(1)}" font-size="12" font-weight="bold" fill="#16a34a">${escapeXml(pF)}</text>`,
		`<text x="${(kx - 14).toFixed(1)}" y="${(ky - 5).toFixed(1)}" font-size="12" font-weight="bold" fill="#d97706">${escapeXml(opts.extraPt)}</text>`,
		`<text x="${cx + 26}" y="${cy - 8}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">${escapeXml(opts.diamLabel)}</text>`,
		`<text x="${((cx + kx) / 2 - 14).toFixed(1)}" y="${((cy + ky) / 2 + 12).toFixed(1)}" font-size="10" font-weight="bold" fill="#b45309">${escapeXml(opts.extraDistLabel)}</text>`,
		`<text x="${cx - r + 8}" y="44" font-size="12" font-weight="bold" fill="#2563eb">(C)</text>`,
		`<text x="${cx}" y="196" text-anchor="middle" font-size="11" font-weight="bold" fill="#ea580c">القوس ${escapeXml(pE)}${escapeXml(pF)}</text>`
	];
	return wrapSvg(w, h, parts.join(''));
}

/** Protractor measuring angle xOy in [10..170] with both inner & outer scale labels */
function svgProtractorAngle(opts: {
	deg: number;
	vertex: string;
	ray1: string;
	ray2: string;
}): string {
	const w = 320;
	const h = 185;
	const ox = 160;
	const oy = 148;
	const R = 104;
	const rIn = 58;
	const rad = (opts.deg * Math.PI) / 180;
	const rx2 = ox + 122 * Math.cos(rad);
	const ry2 = oy - 122 * Math.sin(rad);
	const arcR = 32;
	const ax = ox + arcR * Math.cos(rad);
	const ay = oy - arcR * Math.sin(rad);

	const parts: string[] = [
		`<path d="M ${ox - R} ${oy} A ${R} ${R} 0 0 1 ${ox + R} ${oy} Z" fill="#eff6ff" stroke="#64748b" stroke-width="1.6"/>`,
		`<path d="M ${ox - rIn} ${oy} A ${rIn} ${rIn} 0 0 1 ${ox + rIn} ${oy}" fill="none" stroke="#94a3b8" stroke-width="1"/>`
	];

	// Degree ticks every 10 deg
	for (let a = 0; a <= 180; a += 10) {
		const ar = (a * Math.PI) / 180;
		const tickIn = a % 30 === 0 ? R - 11 : R - 6;
		const x1 = ox + tickIn * Math.cos(ar);
		const y1 = oy - tickIn * Math.sin(ar);
		const x2 = ox + R * Math.cos(ar);
		const y2 = oy - R * Math.sin(ar);
		parts.push(`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#475569" stroke-width="${a % 30 === 0 ? 1.5 : 1}"/>`);
	}

	// Base ray [Ox) and second ray [Oy)
	parts.push(
		`<line x1="${ox}" y1="${oy}" x2="${ox + 128}" y2="${oy}" stroke="#0f172a" stroke-width="2.4"/>`,
		`<line x1="${ox}" y1="${oy}" x2="${rx2.toFixed(1)}" y2="${ry2.toFixed(1)}" stroke="#dc2626" stroke-width="2.4"/>`,
		`<path d="M ${ox + arcR} ${oy} A ${arcR} ${arcR} 0 0 0 ${ax.toFixed(1)} ${ay.toFixed(1)}" fill="none" stroke="#dc2626" stroke-width="2"/>`,
		`<circle cx="${ox}" cy="${oy}" r="3.8" fill="#0f172a"/>`,
		`<text x="${ox}" y="62" text-anchor="middle" font-size="10" font-weight="bold" fill="#475569">90°</text>`,
		`<text x="${ox + R - 18}" y="${oy - 7}" font-size="10" font-weight="bold" fill="#16a34a">0°</text>`,
		`<text x="${ox + R - 20}" y="${oy + 13}" font-size="9" fill="#64748b">180°</text>`,
		`<text x="${ox - R + 6}" y="${oy - 7}" font-size="10" font-weight="bold" fill="#16a34a">180°</text>`,
		// Inner and outer scale readings near [Oy)
		`<text x="${(ox + 76 * Math.cos(rad)).toFixed(1)}" y="${(oy - 76 * Math.sin(rad) + (opts.deg > 90 ? 12 : -4)).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="bold" fill="#16a34a">${opts.deg}°</text>`,
		`<text x="${(ox + (R + 13) * Math.cos(rad)).toFixed(1)}" y="${(oy - (R + 13) * Math.sin(rad) + 3).toFixed(1)}" text-anchor="middle" font-size="10" font-weight="bold" fill="#64748b">${180 - opts.deg}°</text>`,
		`<text x="${ox - 4}" y="${oy + 18}" font-size="12" font-weight="bold" fill="#0f172a">${escapeXml(opts.vertex)}</text>`,
		`<text x="${ox + 132}" y="${oy + 4}" font-size="12" font-weight="bold" fill="#0f172a">${escapeXml(opts.ray1)}</text>`,
		`<text x="${(rx2 + (opts.deg >= 90 ? -12 : 8)).toFixed(1)}" y="${(ry2 - 6).toFixed(1)}" font-size="12" font-weight="bold" fill="#dc2626">${escapeXml(opts.ray2)}</text>`
	);

	return wrapSvg(w, h, parts.join(''));
}

/** Straight angle AOB = 180 deg with ray [OC) and bisector [OD) of COB */
function svgStraightAngleBisector(opts: {
	alphaDeg: number;
	pts: [string, string, string, string, string]; // [A, O, B, C, D]
}): string {
	const w = 310;
	const h = 168;
	const ox = 155;
	const oy = 132;
	const [pA, pO, pB, pC, pD] = opts.pts;

	const angC = ((180 - opts.alphaDeg) * Math.PI) / 180;
	const angD = (((180 - opts.alphaDeg) / 2) * Math.PI) / 180;
	const rayLen = 96;

	const cx = ox + rayLen * Math.cos(angC);
	const cy = oy - rayLen * Math.sin(angC);
	const dx = ox + rayLen * Math.cos(angD);
	const dy = oy - rayLen * Math.sin(angD);

	// Arcs: AOC (red, r=36), COD and DOB (green, r=46)
	const r1 = 36;
	const c1x = ox + r1 * Math.cos(angC);
	const c1y = oy - r1 * Math.sin(angC);

	const r2 = 46;
	const c2x = ox + r2 * Math.cos(angC);
	const c2y = oy - r2 * Math.sin(angC);
	const d2x = ox + r2 * Math.cos(angD);
	const d2y = oy - r2 * Math.sin(angD);

	// Tick marks on COD and DOB arcs
	const angTick1 = (((180 - opts.alphaDeg) * 0.75) * Math.PI) / 180;
	const angTick2 = (((180 - opts.alphaDeg) * 0.25) * Math.PI) / 180;
	const drawTick = (ang: number) => {
		const x1 = ox + (r2 - 5) * Math.cos(ang);
		const y1 = oy - (r2 - 5) * Math.sin(ang);
		const x2 = ox + (r2 + 5) * Math.cos(ang);
		const y2 = oy - (r2 + 5) * Math.sin(ang);
		return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#16a34a" stroke-width="2"/>`;
	};

	const labelAng = ((180 - opts.alphaDeg / 2) * Math.PI) / 180;
	const lx = ox + 55 * Math.cos(labelAng);
	const ly = oy - 55 * Math.sin(labelAng);

	const parts = [
		`<line x1="25" y1="${oy}" x2="285" y2="${oy}" stroke="#0f172a" stroke-width="2.2"/>`,
		`<line x1="${ox}" y1="${oy}" x2="${cx.toFixed(1)}" y2="${cy.toFixed(1)}" stroke="#0f172a" stroke-width="2.2"/>`,
		`<line x1="${ox}" y1="${oy}" x2="${dx.toFixed(1)}" y2="${dy.toFixed(1)}" stroke="#16a34a" stroke-width="2.2" stroke-dasharray="5 3"/>`,
		// Red arc AOC (from A side angle pi to angC -> sweep-flag 1)
		`<path d="M ${ox - r1} ${oy} A ${r1} ${r1} 0 0 1 ${c1x.toFixed(1)} ${c1y.toFixed(1)}" fill="none" stroke="#dc2626" stroke-width="2"/>`,
		// Green arcs COD and DOB
		`<path d="M ${c2x.toFixed(1)} ${c2y.toFixed(1)} A ${r2} ${r2} 0 0 1 ${d2x.toFixed(1)} ${d2y.toFixed(1)}" fill="none" stroke="#16a34a" stroke-width="2"/>`,
		`<path d="M ${d2x.toFixed(1)} ${d2y.toFixed(1)} A ${r2} ${r2} 0 0 1 ${ox + r2} ${oy}" fill="none" stroke="#16a34a" stroke-width="2"/>`,
		drawTick(angTick1),
		drawTick(angTick2),
		`<circle cx="${ox}" cy="${oy}" r="3.8" fill="#0f172a"/>`,
		`<text x="15" y="${oy + 4}" font-size="12" font-weight="bold" fill="#0f172a">${escapeXml(pA)}</text>`,
		`<text x="${ox - 4}" y="${oy + 19}" font-size="12" font-weight="bold" fill="#0f172a">${escapeXml(pO)}</text>`,
		`<text x="290" y="${oy + 4}" font-size="12" font-weight="bold" fill="#0f172a">${escapeXml(pB)}</text>`,
		`<text x="${(cx - 10).toFixed(1)}" y="${(cy - 6).toFixed(1)}" font-size="12" font-weight="bold" fill="#0f172a">${escapeXml(pC)}</text>`,
		`<text x="${(dx + 6).toFixed(1)}" y="${(dy - 6).toFixed(1)}" font-size="12" font-weight="bold" fill="#16a34a">${escapeXml(pD)}</text>`,
		`<text x="${(lx - 12).toFixed(1)}" y="${(ly + 4).toFixed(1)}" font-size="11" font-weight="bold" fill="#dc2626">${opts.alphaDeg}°</text>`,
		`<text x="${(ox + 64 * Math.cos(angTick2)).toFixed(1)}" y="${(oy - 64 * Math.sin(angTick2) + 4).toFixed(1)}" font-size="11" font-weight="bold" fill="#16a34a">?</text>`
	];

	return wrapSvg(w, h, parts.join(''));
}

/** Garden integration diagram: rectangular plot ABCD with gate + circular basin (C) + perpendiculars + angle bisector */
function svgGardenPlan(opts: {
	lengthLabel: string;
	widthLabel: string;
	gateLabel: string;
	diamLabel: string;
	alphaDeg: number;
}): string {
	const w = 360;
	const h = 215;
	// Left side: rectangle ABCD with gate gap on bottom
	const rx = 22;
	const ry = 34;
	const rw = 128;
	const rh = 112;

	// Right side: circular basin (C) on walkway (Delta) with (d1) perp at E, (d2) perp at F, [MH), [Mz)
	const cx = 258;
	const cy = 114;
	const cr = 46;
	const ex = cx - cr;
	const fx = cx + cr;
	const angH = ((180 - opts.alphaDeg) * Math.PI) / 180;
	const angZ = (((180 - opts.alphaDeg) / 2) * Math.PI) / 180;
	const hx = cx + 62 * Math.cos(angH);
	const hy = cy - 62 * Math.sin(angH);
	const zx = cx + 66 * Math.cos(angZ);
	const zy = cy - 66 * Math.sin(angZ);

	const parts = [
		// Rectangle ABCD (with gap for gate on bottom edge)
		`<rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" fill="#f0fdf4" stroke="none"/>`,
		`<line x1="${rx}" y1="${ry}" x2="${rx + rw}" y2="${ry}" stroke="#15803d" stroke-width="2.2"/>`,
		`<line x1="${rx}" y1="${ry}" x2="${rx}" y2="${ry + rh}" stroke="#15803d" stroke-width="2.2"/>`,
		`<line x1="${rx + rw}" y1="${ry}" x2="${rx + rw}" y2="${ry + rh}" stroke="#15803d" stroke-width="2.2"/>`,
		`<line x1="${rx}" y1="${ry + rh}" x2="${rx + 44}" y2="${ry + rh}" stroke="#15803d" stroke-width="2.2"/>`,
		`<line x1="${rx + 84}" y1="${ry + rh}" x2="${rx + rw}" y2="${ry + rh}" stroke="#15803d" stroke-width="2.2"/>`,
		`<line x1="${rx + 44}" y1="${ry + rh}" x2="${rx + 84}" y2="${ry + rh}" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="3 3"/>`,
		`<rect x="${rx}" y="${ry}" width="9" height="9" fill="none" stroke="#15803d" stroke-width="1.4"/>`,
		`<text x="${rx - 10}" y="${ry - 6}" font-size="11" font-weight="bold" fill="#0f172a">A</text>`,
		`<text x="${rx + rw + 4}" y="${ry - 6}" font-size="11" font-weight="bold" fill="#0f172a">B</text>`,
		`<text x="${rx + rw + 4}" y="${ry + rh + 12}" font-size="11" font-weight="bold" fill="#0f172a">C</text>`,
		`<text x="${rx - 10}" y="${ry + rh + 12}" font-size="11" font-weight="bold" fill="#0f172a">D</text>`,
		`<text x="${rx + rw / 2}" y="${ry - 8}" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">${escapeXml(opts.lengthLabel)}</text>`,
		`<text x="${rx + rw / 2}" y="${ry + rh / 2 + 4}" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">${escapeXml(opts.widthLabel)}</text>`,
		`<text x="${rx + 64}" y="${ry + rh + 16}" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">المدخل ${escapeXml(opts.gateLabel)}</text>`,

		// Right side: Basin (C), (Delta), (d1), (d2), [MH), [Mz)
		`<circle cx="${cx}" cy="${cy}" r="${cr}" fill="#eff6ff" fill-opacity="0.55" stroke="#2563eb" stroke-width="2"/>`,
		`<line x1="${ex - 26}" y1="${cy}" x2="${fx + 32}" y2="${cy}" stroke="#0f172a" stroke-width="2"/>`,
		`<line x1="${ex}" y1="30" x2="${ex}" y2="184" stroke="#2563eb" stroke-width="1.9"/>`,
		`<line x1="${fx}" y1="30" x2="${fx}" y2="184" stroke="#2563eb" stroke-width="1.9"/>`,
		`<rect x="${ex}" y="${cy - 9}" width="9" height="9" fill="none" stroke="#dc2626" stroke-width="1.4"/>`,
		`<rect x="${fx}" y="${cy - 9}" width="9" height="9" fill="none" stroke="#dc2626" stroke-width="1.4"/>`,
		`<line x1="${cx}" y1="${cy}" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="#0f172a" stroke-width="2"/>`,
		`<line x1="${cx}" y1="${cy}" x2="${zx.toFixed(1)}" y2="${zy.toFixed(1)}" stroke="#16a34a" stroke-width="2" stroke-dasharray="4 3"/>`,
		`<path d="M ${cx - 22} ${cy} A 22 22 0 0 1 ${(cx + 22 * Math.cos(angH)).toFixed(1)} ${(cy - 22 * Math.sin(angH)).toFixed(1)}" fill="none" stroke="#dc2626" stroke-width="1.8"/>`,
		`<circle cx="${ex}" cy="${cy}" r="3.2" fill="#0f172a"/>`,
		`<circle cx="${cx}" cy="${cy}" r="3.2" fill="#0f172a"/>`,
		`<circle cx="${fx}" cy="${cy}" r="3.2" fill="#0f172a"/>`,
		`<text x="${ex - 11}" y="${cy + 13}" font-size="11" font-weight="bold" fill="#0f172a">E</text>`,
		`<text x="${cx - 4}" y="${cy + 14}" font-size="11" font-weight="bold" fill="#0f172a">M</text>`,
		`<text x="${fx + 5}" y="${cy + 13}" font-size="11" font-weight="bold" fill="#0f172a">F</text>`,
		`<text x="${ex - 18}" y="26" font-size="10.5" font-weight="bold" fill="#2563eb">(d1)</text>`,
		`<text x="${fx + 5}" y="26" font-size="10.5" font-weight="bold" fill="#2563eb">(d2)</text>`,
		`<text x="${fx + 14}" y="${cy - 6}" font-size="10.5" font-weight="bold" fill="#0f172a">(Δ)</text>`,
		`<text x="${(hx - 10).toFixed(1)}" y="${(hy - 4).toFixed(1)}" font-size="11" font-weight="bold" fill="#0f172a">H</text>`,
		`<text x="${(zx + 4).toFixed(1)}" y="${(zy - 4).toFixed(1)}" font-size="11" font-weight="bold" fill="#16a34a">z</text>`,
		`<text x="${cx - 26}" y="${cy - 18}" font-size="10" font-weight="bold" fill="#dc2626">${opts.alphaDeg}°</text>`,
		`<text x="${cx}" y="196" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#2563eb">القطر EF = ${escapeXml(opts.diamLabel)}</text>`
	];

	return wrapSvg(w, h, parts.join(''));
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Decimal Writing, Decimal Fractions Decomposition & Half-Line Comparison
// ═══════════════════════════════════════════════════════════════════════════════
const decimalWritingComparingTemplate: ParameterizedTemplate = {
	id: '1am_t1_decimal_writing_comparing',
	grade: '1am',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'الكتابة العشرية والكسرية والتفكيك والمقارنة على نصف مستقيم مدرج',
	curriculumLessonId: 'lesson_1am_t1_natural_decimal_writing_comparing',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// 1) Number line parameters (tenths for easy, hundredths for medium/hard)
		let nlMin: number;
		let nlMax: number;
		let nlStep: number;
		let mVal: number;
		let mStr: string;
		let frameLow: string;
		let frameHigh: string;
		let frameUnitLow: number;
		let frameUnitHigh: number;

		if (difficulty === 'easy') {
			const baseInt = rng.int(1, 7);
			const offsetTenths = rng.pick([2, 3, 4, 6, 7, 8, 9, 12, 13, 14, 16, 17, 18, 22, 23, 24, 26, 27]);
			const mTenths = baseInt * 10 + offsetTenths;
			nlMin = baseInt;
			nlMax = baseInt + 3;
			nlStep = 1;
			mVal = mTenths / 10;
			mStr = formatScaledDec(mTenths, 1);
			frameUnitLow = Math.floor(mTenths / 10);
			frameUnitHigh = frameUnitLow + 1;
			frameLow = String(frameUnitLow);
			frameHigh = String(frameUnitHigh);
		} else {
			const baseTenth = rng.int(12, 64);
			const offsetH = rng.pick([3, 4, 6, 7, 8, 12, 13, 14, 16, 17, 18, 22, 23, 24, 26, 27]);
			const mHundredths = baseTenth * 10 + offsetH;
			nlMin = baseTenth / 10;
			nlMax = (baseTenth + 3) / 10;
			nlStep = 0.1;
			mVal = mHundredths / 100;
			mStr = formatScaledDec(mHundredths, 2);
			const lowTenth = Math.floor(mHundredths / 10);
			frameLow = formatScaledDec(lowTenth, 1);
			frameHigh = formatScaledDec(lowTenth + 1, 1);
			frameUnitLow = Math.floor(mHundredths / 100);
			frameUnitHigh = frameUnitLow + 1;
		}

		const nlSvg = svgNumberLine({
			min: nlMin,
			max: nlMax,
			step: nlStep,
			subTicks: 10,
			marks: [{ value: mVal, label: 'M', color: '#dc2626' }]
		});
		const imageUrl = saveSvgAsset(`1am_t1_numberline_${difficulty}_${seed}`, nlSvg);

		// 2) Canonical decomposition with a missing zero in tenths or hundredths
		const tens = rng.int(1, 6);
		const ones = rng.int(2, 9);
		const whole = tens * 10 + ones;
		const missingTenths = seed % 2 === 0;
		const d1 = missingTenths ? 0 : rng.int(1, 8);
		const d2 = missingTenths ? rng.int(1, 8) : 0;
		const d3 = rng.int(1, 9);
		const decompScaled = whole * 1000 + d1 * 100 + d2 * 10 + d3;
		const decompStr = formatScaledDec(decompScaled, 3);

		// Extra conversion & unnecessary zeros for SujetBuilder
		const fracDigits = rng.int(12, 78) * 100 + rng.int(1, 8) * 10 + rng.int(1, 9);
		const fracDecStr = formatScaledDec(fracDigits, 3);
		const paddedRaw = `0${whole}.${d1}${d2}0`;
		const trimmedDecStr = formatScaledDec(whole * 100 + d1 * 10 + d2, 2);

		// 3) Four comparison decimals (classic digit-count trap)
		const cmpW = rng.int(2, 8);
		const aDig = rng.int(2, 7);
		const c1 = cmpW * 1000 + aDig * 100 + rng.int(1, 7); // e.g. 4.503
		const c2 = cmpW * 1000 + aDig * 100; // e.g. 4.5
		const c3 = cmpW * 1000 + (aDig - 1) * 100 + 90; // e.g. 4.49
		const c4 = cmpW * 1000 + aDig * 10 + rng.int(1, 9); // e.g. 4.056
		const cmpOrdered = [c1, c2, c3, c4].map((v) => formatScaledDec(v, 3));
		const cmpShuffled = rng.shuffle(cmpOrdered);

		// Build canonical decomposition strings in KaTeX and Typst
		const decompKatex = missingTenths
			? `(${tens} \\times 10) + (${ones} \\times 1) + \\frac{${d2}}{100} + \\frac{${d3}}{1000}`
			: `(${tens} \\times 10) + (${ones} \\times 1) + \\frac{${d1}}{10} + \\frac{${d3}}{1000}`;
		const decompTypst = missingTenths
			? `(${tens} times 10) + (${ones} times 1) + frac(${d2}, 100) + frac(${d3}, 1000)`
			: `(${tens} times 10) + (${ones} times 1) + frac(${d1}, 10) + frac(${d3}, 1000)`;

		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;

		if (difficulty === 'easy') {
			const wholePart = Math.floor(mVal);
			const decDigit = Math.round((mVal - wholePart) * 10);
			const wrongHundredth = `${wholePart}.0${decDigit}`;
			const wrongSwapped = `${decDigit}.${wholePart}`;
			const wrongOffTick = formatScaledDec(Math.round(mVal * 10) + 1, 1);

			const mcq = buildUniqueMcqOptions(
				`$${mStr}$`,
				[
					{
						text: `$${wrongHundredth}$`,
						diagnosticFeedback: 'كل تدريجة صغيرة هنا تمثل $0.1$ (عُشراً واحداً) وليس $0.01$!'
					},
					{
						text: `$${wrongSwapped}$`,
						diagnosticFeedback: 'عكست الجزء الصحيح مع رقم الأعشار! العدد يقع بين $' + frameLow + '$ و $' + frameHigh + '$.'
					},
					{
						text: `$${wrongOffTick}$`,
						diagnosticFeedback: 'أعد عدّ التدريجات الصغيرة بعد العدد الطبيعي $' + wholePart + '$ بدقة.'
					}
				],
				rng
			);

			finalAnswer = mStr;
			quizQuestion = {
				type: 'mcq',
				questionText: `تأمّل نصف المستقيم المدرج المقابل (المسافة بين كل عددين طبيعيين مقسمة إلى $10$ أجزاء متساوية). ما هي فاصلة النقطة $M$؟`,
				questionTextAr: `ما هي فاصلة النقطة $M$ على نصف المستقيم المدرج المقابل؟`,
				imageUrl,
				imageCaption: 'نصف مستقيم مدرج بالأعشار',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `كل تدريجة صغيرة تمثل $0.1$. تقع النقطة $M$ عند $${decDigit}$ تدريجات بعد $${wholePart}$، إذن فاصلتها هي $${mStr}$.`
			};
			hints = [
				'لاحظ أن الوحدة بين كل عددين طبيعيين متتاليين مقسمة إلى $10$ أجزاء متساوية، أي كل تدريجة تساوي $0.1$.',
				`حدّد العدد الطبيعي الذي يسبق النقطة $M$ مباشرة ($${wholePart}$).`,
				`عدّ التدريجات الصغيرة انطلاقاً من $${wholePart}$ لتصل إلى $M$.`
			];
			solutionStepsAr = [
				`قيمة التدريجة الصغيرة الواحدة هي $\\frac{1}{10} = 0.1$.`,
				`النقطة $M$ تقع بعد $${wholePart}$ بـ $${decDigit}$ تدريجات، أي $M(${mStr})$.`
			];
		} else if (difficulty === 'medium') {
			finalAnswer = mStr;
			quizQuestion = {
				type: 'fill_blank',
				questionText: `انظر إلى نصف المستقيم المدرج المقابل (المسافة بين كل عشرين مقسمة إلى $10$ أجزاء متساوية، أي كل تدريجة صغيرة تساوي $0.01$). اكتب فاصلة النقطة $M$ بالكتابة العشرية:`,
				questionTextAr: `ما فاصلة النقطة $M$ على نصف المستقيم المدرج المقابل؟`,
				imageUrl,
				imageCaption: 'نصف مستقيم مدرج بأجزاء المئة',
				questionData: {
					sentence: 'فاصلة النقطة M هي: ___',
					acceptedAnswers: acceptedDecimalForms(mStr),
					answers: acceptedDecimalForms(mStr)
				},
				explanation: `كل تدريجة صغيرة تمثل $0.01$. تقع النقطة $M$ بين $${frameLow}$ و $${frameHigh}$ بـ $${Math.round((mVal - Number(frameLow)) * 100)}$ تدريجات صغيرة، إذن $M(${mStr})$.`
			};
			hints = [
				'المسافة بين كل عشرين (مثل $' + frameLow + '$ و $' + frameHigh + '$) مقسمة إلى $10$ تدريجات، فكل تدريجة تمثل $0.01$.',
				`تقع النقطة $M$ مباشرة بعد العُشر $${frameLow}$ (أي $${frameLow}0$).`,
				'عدّ التدريجات الصغيرة بعد $' + frameLow + '$ وضع الرقم الناتج في مرتبة أجزاء المئة.'
			];
			solutionStepsAr = [
				`العشر الذي يسبق النقطة $M$ هو $${frameLow}$.`,
				`عدد التدريجات الصغيرة بعد $${frameLow}$ هو $${Math.round((mVal - Number(frameLow)) * 100)}$، وقيمة كل تدريجة $0.01$.`,
				`إذن فاصلة $M$ هي $${mStr}$ (ويمكن كتابتها بالفاصلة $${toCommaDecimal(mStr)}$).`
			];
		} else {
			const wrongDroppedZero = `${whole}.${missingTenths ? d2 : d1}${d3}`;
			const wrongSwappedZero = `${whole}.${missingTenths ? d2 : 0}${missingTenths ? 0 : d1}${d3}`;
			const wrongShiftedPoint = `${tens}.${ones}${d1}${d2}${d3}`;

			const mcq = buildUniqueMcqOptions(
				`$${decompStr}$`,
				[
					{
						text: `$${wrongDroppedZero}$`,
						diagnosticFeedback: missingTenths
							? 'نسيت وضع الصفر في مرتبة الأعشار! الكسر مقامه $100$ وليس $10$.'
							: 'نسيت وضع الصفر في مرتبة أجزاء المئة! الكسر الأخير مقامه $1000$ وليس $100$.'
					},
					{
						text: `$${wrongSwappedZero}$`,
						diagnosticFeedback: 'تحقق من مواضع المراتب: الأعشار مقامها $10$ وأجزاء المئة مقامها $100$ وأجزاء الألف مقامها $1000$.'
					},
					{
						text: `$${wrongShiftedPoint}$`,
						diagnosticFeedback: `الجزء الصحيح هو $(${tens} \\times 10) + (${ones} \\times 1) = ${whole}$ وليس $${tens}$.`
					}
				],
				rng
			);

			finalAnswer = decompStr;
			quizQuestion = {
				type: 'mcq',
				questionText: `ما هي الكتابة العشرية الصحيحة للعدد المفكك:\n\n$$${decompKatex}$$`,
				questionTextAr: `ما هي الكتابة العشرية للعدد: $${decompKatex}$؟`,
				imageUrl,
				imageCaption: 'نصف مستقيم مدرج للتمرين المرافق',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الجزء الصحيح هو $${whole}$. ${missingTenths ? `لا يوجد عُشر فنضع $0$ في الأعشار و$${d2}$ في أجزاء المئة و$${d3}$ في أجزاء الألف` : `رقم الأعشار $${d1}$، ولا يوجد أجزاء مئة فنضع $0$ فيها، ورقم أجزاء الألف $${d3}$`}، فالناتج هو $${decompStr}$.`
			};
			hints = [
				`احسب أولاً الجزء الصحيح: $(${tens} \\times 10) + (${ones} \\times 1) = ${whole}$.`,
				'راقب المقامات: الأعشار ($10$)، أجزاء المئة ($100$)، أجزاء الألف ($1000$).',
				'إذا غابت مرتبة بعد الفاصلة (مثل الأعشار أو أجزاء المئة)، نضع في مكانها الرقم $0$.'
			];
			solutionStepsAr = [
				`الجزء الصحيح يساوي $${whole}$.`,
				`ترتيب الأرقام بعد الفاصلة: الأعشار ($${d1}$)، أجزاء المئة ($${d2}$)، أجزاء الألف ($${d3}$).`,
				`إذن الكتابة العشرية هي $${decompStr}$.`
			];
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: 'أجب عن الأسئلة الآتية حول الأعداد العشرية ونصف المستقيم المدرج:',
			content: [
				{
					type: 'columns',
					widths: ['1.45fr', '1.1fr'],
					children: [
						{
							type: 'text',
							content: `1) لاحظ نصف المستقيم المدرج المقابل:\n\nأ) اقرأ فاصلة النقطة $M$.\n\nب) أعطِ حصراً لفاصلة $M$ بين عددين طبيعيين متتاليين${difficulty === 'easy' ? '' : '، ثم حصراً لها إلى $0.1$'}.`,
							answer: `1) أ) فاصلة النقطة هي $M(${mStr})$.\n\nب) الحصر إلى الوحدة: $${frameUnitLow} < ${mStr} < ${frameUnitHigh}$${difficulty === 'easy' ? '' : `، والحصر إلى $0.1$: $${frameLow} < ${mStr} < ${frameHigh}$`}.`,
							mark: '1'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'نصف المستقيم المدرج'
						}
					]
				},
				{
					type: 'text',
					content: `2) أ) اكتب العدد التالي كتابة عشرية: $${decompTypst}$\n\nب) اكتب الكسر العشري $frac(${fracDigits}, 1000)$ على شكل عدد عشري، واحذف الأصفار غير الضرورية من العدد $${paddedRaw}$.`,
					answer: `2) أ) $${decompStr}$.\n\nب) $frac(${fracDigits}, 1000) = ${fracDecStr}$ ، وحذف الأصفار غير الضرورية يعطي: $${paddedRaw} = ${trimmedDecStr}$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) رتّب الأعداد العشرية الآتية ترتيباً تنازلياً (من الأكبر إلى الأصغر) باستعمال الرمز المناسب:\n\n$${cmpShuffled.join(' \\ ; \\ ')}$`,
					answer: `3) الترتيب التنازلي: $${cmpOrdered.join(' > ')}$`,
					mark: '1'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Decimal Addition/Subtraction, Order of Magnitude & Missing Operand (a + □ = b)
// ═══════════════════════════════════════════════════════════════════════════════
const addSubMagnitudeMissingTemplate: ParameterizedTemplate = {
	id: '1am_t1_add_sub_magnitude_missing',
	grade: '1am',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'جمع وطرح الأعداد العشرية، رتبة مقدار وإيجاد العدد المجهول',
	curriculumLessonId: 'lesson_1am_t1_addition_subtraction_magnitude',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// 1) Mental grouping sum (complementary decimal parts summing to 1)
		const cPair = rng.pick([
			[25, 75],
			[15, 85],
			[35, 65],
			[45, 55]
		]);
		const g1Whole = rng.int(12, 34);
		const g2Whole = rng.int(5, 19);
		const gMid = rng.int(14, 38);
		const g1Str = `${g1Whole}.${cPair[0]}`;
		const g2Str = `${g2Whole}.${cPair[1]}`;
		const g12Sum = g1Whole + g2Whole + 1;
		const gTotal = g12Sum + gMid;

		// 2) Order of magnitude of 3 decimal numbers near hundreds
		const h1 = rng.int(1, 5);
		const h2 = rng.int(2, 6);
		const h3 = rng.int(1, 3);
		const e1H = (h1 * 100 - rng.int(2, 5)) * 100 + rng.int(1, 9) * 10;
		const e2H = (h2 * 100 + rng.int(1, 4)) * 100 + rng.int(1, 9) * 10;
		const e3H = (h3 * 100 - rng.int(1, 4)) * 100 + rng.int(2, 8) * 10;
		const e1Str = formatScaledDec(e1H, 2);
		const e2Str = formatScaledDec(e2H, 2);
		const e3Str = formatScaledDec(e3H, 2);
		const magAns = (h1 + h2 + h3) * 100;
		let exactMagSumH = e1H + e2H + e3H;
		if (exactMagSumH === magAns * 100) exactMagSumH += 10;
		const exactMagSumStr = formatScaledDec(exactMagSumH, 2);

		// 3) Vertical addition & subtraction with unequal decimal places (a > b, positive result)
		const add1T = rng.int(24, 68) * 10 + rng.int(1, 9); // 1 decimal
		const add2H = rng.int(12, 38) * 100 + rng.int(1, 9) * 10 + rng.int(1, 9); // 2 decimals
		const addSumH = add1T * 10 + add2H;
		const add1Str = formatScaledDec(add1T, 1);
		const add2Str = formatScaledDec(add2H, 2);
		const addSumStr = formatScaledDec(addSumH, 2);

		const subAT = rng.int(55, 92) * 10 + rng.int(1, 4); // tenths in 1..4
		const subBTenth = rng.int(6, 9); // > subAT tenths so borrow is guaranteed
		const subBHund = rng.int(2, 9); // non-zero hundredths
		const subBWhole = rng.int(14, Math.floor(subAT / 10) - 12);
		const subAH = subAT * 10;
		const subBH = subBWhole * 100 + subBTenth * 10 + subBHund;
		const subDiffH = subAH - subBH; // guaranteed > 10.00 and ends in (10 - subBHund) != 0
		const subAStr = formatScaledDec(subAH, 2);
		const subBStr = formatScaledDec(subBH, 2);
		const subDiffStr = formatScaledDec(subDiffH, 2);

		// 4) Missing operands: a + □ = b  and  c - □ = d (strictly positive!)
		const m1A_H = rng.int(16, 42) * 100 + rng.pick([25, 45, 65, 75, 35, 85]);
		const m1B_H = rng.int(58, 94) * 100 + rng.pick([20, 40, 50, 80]);
		const m1Box_H = m1B_H - m1A_H;
		const m1AStr = formatScaledDec(m1A_H, 2);
		const m1BStr = formatScaledDec(m1B_H, 2);
		const m1BoxStr = formatScaledDec(m1Box_H, 2);

		const m2C_H = rng.int(48, 86) * 100 + rng.pick([0, 20, 40, 60]);
		const m2D_H = rng.int(12, 34) * 100 + rng.pick([15, 35, 65, 85]);
		const m2Box_H = m2C_H - m2D_H;
		const m2CStr = formatScaledDec(m2C_H, 2);
		const m2DStr = formatScaledDec(m2D_H, 2);
		const m2BoxStr = formatScaledDec(m2Box_H, 2);

		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;

		if (difficulty === 'easy') {
			const mcq = buildUniqueMcqOptions(
				`$${magAns}$`,
				[
					{
						text: `$${magAns - 100}$`,
						diagnosticFeedback: `قربت أحد الأعداد إلى مئة أصغر من قيمته! لاحظ أن $${e1Str} \\approx ${h1 * 100}$ و$${e2Str} \\approx ${h2 * 100}$ و$${e3Str} \\approx ${h3 * 100}$.`
					},
					{
						text: `$${magAns + 100}$`,
						diagnosticFeedback: 'أعطيت تقديراً أكبر من اللازم: اختر أقرب مئة لكل حد من الحدود الثلاثة.'
					},
					{
						text: `$${exactMagSumStr}$`,
						diagnosticFeedback: 'هذا هو المجموع الدقيق، بينما السؤال يطلب **رتبة مقدار** (قيمة تقريبية سهلة الحساب ذهنياً).'
					}
				],
				rng
			);

			finalAnswer = String(magAns);
			quizQuestion = {
				type: 'mcq',
				questionText: `بدون إجراء الحساب العمودي الدقيق، ما هي **رتبة مقدار** المجموع الآتي:\n\n$$${e1Str} + ${e2Str} + ${e3Str}$$`,
				questionTextAr: `ما هي رتبة مقدار المجموع $${e1Str} + ${e2Str} + ${e3Str}$؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نقرّب كل حدّ إلى أقرب مئة سهلة الحساب: $${e1Str} \\approx ${h1 * 100}$، و$${e2Str} \\approx ${h2 * 100}$، و$${e3Str} \\approx ${h3 * 100}$. ومنه رتبة المقدار هي $${h1 * 100} + ${h2 * 100} + ${h3 * 100} = ${magAns}$.`
			};
			hints = [
				'لتحديد رتبة مقدار مجموع، عوّض كل عدد بعدد قريب منه يسهل حسابه ذهنياً (أقرب مئة).',
				`قرّب الحدود: $${e1Str} \\approx ${h1 * 100}$، و$${e2Str} \\approx ${h2 * 100}$، و$${e3Str} \\approx ${h3 * 100}$.`,
				'اجمع القيم المقربة الثلاث ذهنياً.'
			];
			solutionStepsAr = [
				`نعوّض كل عدد بأقرب مئة: $${h1 * 100}$ و$${h2 * 100}$ و$${h3 * 100}$.`,
				`نحسب المجموع التقريبي: $${h1 * 100} + ${h2 * 100} + ${h3 * 100} = ${magAns}$.`
			];
		} else if (difficulty === 'medium') {
			finalAnswer = m1BoxStr;
			quizQuestion = {
				type: 'calculated',
				questionText: `أوجد قيمة العدد المجهول $\\square$ الذي يحقق المساواة الآتية:\n\n$$${m1AStr} + \\square = ${m1BStr}$$`,
				questionTextAr: `أوجد العدد المجهول $\\square$ حيث $${m1AStr} + \\square = ${m1BStr}$`,
				questionData: {
					answer: m1Box_H / 100,
					displayTemplate: `$${m1AStr} + \\square = ${m1BStr}$`,
					variables: [],
					tolerance: 0.001
				},
				explanation: `لإيجاد الحد المجهول في عملية الجمع ننجز الطرح: $\\square = ${m1BStr} - ${m1AStr} = ${m1BoxStr}$.`
			};
			hints = [
				'في المساواة من الشكل $a + \\square = b$، العدد المجهول $\\square$ هو الفرق بين المجموع $b$ والحد المعلوم $a$.',
				`نحسب $\\square = ${m1BStr} - ${m1AStr}$.`,
				`ضع الفاصلة تحت الفاصلة واكتب $${m1BStr}$ على شكل $${formatScaledFixed(m1B_H, 2)}$ قبل الطرح.`
			];
			solutionStepsAr = [
				`بمعنى عملية الجمع والطرح: $\\square = ${m1BStr} - ${m1AStr}$.`,
				`بإنجاز الطرح عمودياً (مع الفاصلة تحت الفاصلة) نجد: $\\square = ${m1BoxStr}$.`
			];
		} else {
			// hard: vertical subtraction with unequal decimal places (append 0 & borrow)
			const wrongBringDownH =
				(Math.floor(subAH / 100) - Math.floor(subBH / 100)) * 100 +
				Math.abs((subAH % 100) - (subBH % 100));
			const wrongForgotPaybackH = subDiffH + 100;
			const wrongAddedH = subAH + subBH;

			const mcq = buildUniqueMcqOptions(
				`$${subDiffStr}$`,
				[
					{
						text: `$${formatScaledDec(wrongBringDownH, 2)}$`,
						diagnosticFeedback: `خطأ شائع: طرحت الأرقام الأصغر من الأكبر دون استلاف أو لم تضع صفراً في $${formatScaledFixed(subAH, 2)}$!`
					},
					{
						text: `$${formatScaledDec(wrongForgotPaybackH, 2)}$`,
						diagnosticFeedback: 'استلفت في الأعشار أو أجزاء المئة ولكنك نسيت إرجاع الواحد المستعار إلى المرتبة الموالية!'
					},
					{
						text: `$${formatScaledDec(wrongAddedH, 2)}$`,
						diagnosticFeedback: 'العملية المطلوبة هي **طرح** وليست جمعاً!'
					}
				],
				rng
			);

			finalAnswer = subDiffStr;
			quizQuestion = {
				type: 'mcq',
				questionText: `أنجز عملية الطرح العمودي الآتية بدقة:\n\n$$${subAStr} - ${subBStr}$$`,
				questionTextAr: `ما ناتج عملية الطرح: $${subAStr} - ${subBStr}$؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نكتب $${subAStr}$ على شكل $${formatScaledFixed(subAH, 2)}$ ونضع الفاصلة تحت الفاصلة، ثم نطرح مع الاستلاف والإرجاع: $${formatScaledFixed(subAH, 2)} - ${subBStr} = ${subDiffStr}$.`
			};
			hints = [
				`اكتب $${subAStr}$ على شكل $${formatScaledFixed(subAH, 2)}$ بإضافة صفر في مرتبة أجزاء المئة.`,
				'ضع الفاصلة تحت الفاصلة، ولا تنسَ الاستلاف في مرتبة أجزاء المئة والأعشار.',
				`تحقّق بالجمع: الناتج + $${subBStr} = ${subAStr}$.`
			];
			solutionStepsAr = [
				`نوحّد عدد الأرقام بعد الفاصلة: $${formatScaledFixed(subAH, 2)} - ${subBStr}$.`,
				`بالطرح العمودي مع الاستلاف والإرجاع نجد $${subDiffStr}$.`
			];
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: 'أجب عن الأسئلة الآتية دون استعمال الآلة الحاسبة:',
			content: [
				{
					type: 'text',
					content: `1) أ) احسب ذهنياً بتجميع الحدود المناسبة: $A = ${g1Str} + ${gMid} + ${g2Str}$\n\nب) حدّد رتبة مقدار المجموع التالي: $B = ${e1Str} + ${e2Str} + ${e3Str}$`,
					answer: `1) أ) $A = (${g1Str} + ${g2Str}) + ${gMid} = ${g12Sum} + ${gMid} = ${gTotal}$\n\nب) رتبة مقدار $B$: $${h1 * 100} + ${h2 * 100} + ${h3 * 100} = ${magAns}$`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) ضع وأنجز عمودياً العمليتين التاليتين:\n\n$${add1Str} + ${add2Str}$  و  $${subAStr} - ${subBStr}$`,
					answer: `2) $${add1Str} + ${add2Str} = ${addSumStr}$  ،  $${formatScaledFixed(subAH, 2)} - ${subBStr} = ${subDiffStr}$`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) اعتماداً على معنى الجمع والطرح، أوجد العدد المجهول $□$ في كل حالة:\n\nأ) $${m1AStr} + □ = ${m1BStr}$     ب) $${m2CStr} - □ = ${m2DStr}$`,
					answer: `3) أ) $□ = ${m1BStr} - ${m1AStr} = ${m1BoxStr}$\n\nب) $□ = ${m2CStr} - ${m2DStr} = ${m2BoxStr}$`,
					mark: '1'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Decimal Multiplication (× 10, 100, 0.1, 0.01 & Vertical Decimal × Decimal)
// ═══════════════════════════════════════════════════════════════════════════════
const decimalMultiplicationTemplate: ParameterizedTemplate = {
	id: '1am_t1_decimal_multiplication_powers10',
	grade: '1am',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'الضرب والقسمة على 10 و 0.1 وضرب عددين عشريين',
	curriculumLessonId: 'lesson_1am_t1_decimal_multiplication_powers10',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// 1) Mental decimal-point shifts (4 table items for SujetBuilder + easy/hard quiz)
		const baseDigits = rng.int(12, 89) * 10 + rng.pick([1, 3, 4, 6, 7, 8, 9]);
		const n1Str = shiftDecimalExact(baseDigits, 2, 0); // e.g. 4.73
		const n1Times100 = shiftDecimalExact(baseDigits, 2, 2); // 473
		const n2Str = shiftDecimalExact(baseDigits, 1, 0); // e.g. 47.3
		const n2Times001 = shiftDecimalExact(baseDigits, 1, -2); // 0.473
		const n3Digits = rng.int(12, 79) * 10 + rng.pick([2, 3, 4, 6, 7, 8, 9]);
		const n3Str = shiftDecimalExact(n3Digits, 1, 0); // e.g. 34.6
		const n3Div10 = shiftDecimalExact(n3Digits, 1, -1); // 3.46
		const n4Digits = rng.int(12, 68) * 100 + rng.int(1, 9) * 10 + rng.pick([2, 3, 7, 9]);
		const n4Str = shiftDecimalExact(n4Digits, 3, 0); // e.g. 2.473
		const n4Div001 = shiftDecimalExact(n4Digits, 3, 2); // 247.3
		const n4Div01 = shiftDecimalExact(n4Digits, 3, 1); // 24.73

		// 2) Vertical decimal x decimal: guarantee non-zero last digit so shifts are all distinct
		const lastD1 = rng.pick([3, 7, 9]);
		const lastD2 = rng.pick([3, 4, 6, 7, 8, 9]);
		const f1Int = rng.int(1, 4) * 100 + rng.int(1, 8) * 10 + lastD1; // 2 decimal places
		const f2Int = rng.int(1, 3) * 10 + lastD2; // 1 decimal place
		const f1Str = formatScaledDec(f1Int, 2);
		const f2Str = formatScaledDec(f2Int, 1);
		const prodInt = f1Int * f2Int; // exact integer, 3 decimal places
		const prodStr = shiftDecimalExact(prodInt, 3, 0);

		// 3) Word problem: multiplying by < 1 shrinks the value
		const qTenth = rng.pick([4, 6, 7, 8]); // 0.4, 0.6, 0.7, 0.8
		const qStr = `0.${qTenth}`;
		const pTenth = rng.int(22, 68) * 10 + rng.pick([3, 5, 7, 9]);
		const pStr = formatScaledDec(pTenth, 1);
		const costScaled100 = qTenth * pTenth;
		const costStr = formatScaledDec(costScaled100, 2);

		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;

		if (difficulty === 'easy') {
			const ansStr = n2Times001;
			const wrongRight2 = shiftDecimalExact(baseDigits, 1, 2);
			const wrongLeft1 = shiftDecimalExact(baseDigits, 1, -1);
			const wrongLeft3 = shiftDecimalExact(baseDigits, 1, -3);

			const mcq = buildUniqueMcqOptions(
				`$${ansStr}$`,
				[
					{
						text: `$${wrongRight2}$`,
						diagnosticFeedback: 'الضرب في $0.01$ يصغّر العدد (يزيح الفاصلة **يساراً**)، وليس يميناً!'
					},
					{
						text: `$${wrongLeft1}$`,
						diagnosticFeedback: 'أزحت الفاصلة مرتبة واحدة فقط (مثل الضرب في $0.1$)؛ الضرب في $0.01$ يزيحها بمرتبتين!'
					},
					{
						text: `$${wrongLeft3}$`,
						diagnosticFeedback: 'أزحت الفاصلة بثلاث مراتب بدلاً من مرتبتين.'
					}
				],
				rng
			);

			finalAnswer = ansStr;
			quizQuestion = {
				type: 'mcq',
				questionText: `احسب ذهنياً نتيجة العملية الآتية:\n\n$$${n2Str} \\times 0.01$$`,
				questionTextAr: `ما قيمة الجداء: $${n2Str} \\times 0.01$؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الضرب في $0.01$ يكافئ القسمة على $100$، فنزيح الفاصلة بمرتبتين نحو اليسار: $${n2Str} \\times 0.01 = ${ansStr}$.`
			};
			hints = [
				'الضرب في $0.01$ يصغّر العدد لأن $0.01 < 1$، وهو يكافئ القسمة على $100$.',
				'نزيح الفاصلة نحو اليسار بمرتبتين (لوجود رقمين بعد الفاصلة في $0.01$).',
				'أضف صفراً على يسار الجزء الصحيح عند الحاجة لوضع الفاصلة.'
			];
			solutionStepsAr = [
				`الضرب في $0.01$ يعني إزاحة الفاصلة مرتبتين نحو اليسار.`,
				`إذن $${n2Str} \\times 0.01 = ${ansStr}$.`
			];
		} else if (difficulty === 'medium') {
			const wrong2Dec = shiftDecimalExact(prodInt, 2, 0);
			const wrong4Dec = shiftDecimalExact(prodInt, 4, 0);
			const wrong1Dec = shiftDecimalExact(prodInt, 1, 0);

			const mcq = buildUniqueMcqOptions(
				`$${prodStr}$`,
				[
					{
						text: `$${wrong2Dec}$`,
						diagnosticFeedback: `عدّ جميع الأرقام بعد الفاصلة في العاملين معاً: رقمان في $${f1Str}$ ورقم في $${f2Str}$، المجموع $3$ أرقام وليس $2$!`
					},
					{
						text: `$${wrong4Dec}$`,
						diagnosticFeedback: `مجموع الأرقام العشرية في العاملين هو $2 + 1 = 3$ وليس $4$.`
					},
					{
						text: `$${wrong1Dec}$`,
						diagnosticFeedback: 'وضعت الفاصلة بعد رقم واحد فقط! يجب جمع عدد الأرقام بعد الفاصلة في كلا العاملين.'
					}
				],
				rng
			);

			finalAnswer = prodStr;
			quizQuestion = {
				type: 'mcq',
				questionText: `أنجز عمودياً عملية ضرب العددين العشريين:\n\n$$${f1Str} \\times ${f2Str}$$`,
				questionTextAr: `ما ناتج الجداء: $${f1Str} \\times ${f2Str}$؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نحسب دون فاصلة: $${f1Int} \\times ${f2Int} = ${formatKatexInt(prodInt)}$. وبما أن مجموع الأرقام بعد الفاصلة في العاملين هو $2 + 1 = 3$، نضع الفاصلة بعد $3$ أرقام من اليمين فنجد $${prodStr}$.`
			};
			hints = [
				`أنجز الضرب العمودي أولاً كما في الأعداد الطبيعية: $${f1Int} \\times ${f2Int}$.`,
				`عدّ الأرقام بعد الفاصلة: في $${f1Str}$ يوجد رقمان وفي $${f2Str}$ يوجد رقم واحد.`,
				'ضع الفاصلة في الناتج بحيث يكون فيه $3$ أرقام بعد الفاصلة.'
			];
			solutionStepsAr = [
				`نحسب الجداء دون فواصل: $${f1Int} \\times ${f2Int} = ${formatKatexInt(prodInt)}$.`,
				`نعدّ $2 + 1 = 3$ أرقام بعد الفاصلة من اليمين فنحصل على $${prodStr}$.`
			];
		} else {
			finalAnswer = n4Div001;
			quizQuestion = {
				type: 'fill_blank',
				questionText: `احسب ذهنياً نتيجة القسمة الآتية (تذكّر اتجاه إزاحة الفاصلة عند القسمة على $0.01$):\n\n$$${n4Str} \\div 0.01 = ?$$`,
				questionTextAr: `احسب ذهنياً: $${n4Str} \\div 0.01$`,
				questionData: {
					sentence: `${n4Str} ÷ 0.01 = ___`,
					acceptedAnswers: acceptedDecimalForms(n4Div001),
					answers: acceptedDecimalForms(n4Div001)
				},
				explanation: `القسمة على $0.01$ تكافئ الضرب في $100$، لذا نزيح الفاصلة بمرتبتين نحو اليمين: $${n4Str} \\div 0.01 = ${n4Div001}$.`
			};
			hints = [
				'تذكّر أن القسمة على $0.01$ تكافئ الضرب في $100$.',
				'عند الضرب في $100$ يكبُر العدد، فنزيح الفاصلة نحو اليمين.',
				`أزح الفاصلة في $${n4Str}$ بمرتبتين نحو اليمين.`
			];
			solutionStepsAr = [
				`القسمة على $0.01$ تكافئ الضرب في $100$.`,
				`نزيح الفاصلة مرتبتين يميناً: $${n4Str} \\div 0.01 = ${n4Div001}$.`
			];
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: 'أجب عن الأسئلة الآتية بدقة:',
			content: [
				{
					type: 'text',
					content: '1) أكمل الجدول الآتي ذهنياً دون إجراء عمليات عمودية:'
				},
				{
					type: 'table',
					headers: ['العملية', 'النتيجة'],
					cells: [],
					rows: [
						[
							`$${n1Str} times 100$`,
							{ content: '....................', answer: `$${n1Times100}$`, mark: '0.25' }
						],
						[
							`$${n2Str} times 0.01$`,
							{ content: '....................', answer: `$${n2Times001}$`, mark: '0.25' }
						],
						[
							`$${n3Str} div 10$`,
							{ content: '....................', answer: `$${n3Div10}$`, mark: '0.25' }
						],
						[
							`$${n4Str} div 0.01$`,
							{ content: '....................', answer: `$${n4Div001}$`, mark: '0.25' }
						]
					],
					align: 'center',
					borders: 'grid',
					headerBackground: true
				},
				{
					type: 'text',
					content: `2) ضع وأنجز عمودياً الجداء: $${f1Str} times ${f2Str}$`,
					answer: `2) $${f1Int} times ${f2Int} = ${formatTypstInt(prodInt)}$، وبوضع الفاصلة بعد $3$ أرقام نجد: $${f1Str} times ${f2Str} = ${prodStr}$`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) اشترى خياط $${qStr}$ م من شريط تزيين بسعر $${pStr}$ دج للمتر الواحد.\n\nأ) احسب ثمن الشريط بالدينار.\n\nب) قارن الثمن المدفوع مع سعر المتر الواحد ($${pStr}$ دج)، وفسّر لماذا جاء الناتج أصغر من $${pStr}$.`,
					answer: `3) أ) الثمن: $${pStr} times ${qStr} = ${costStr}$ دج.\n\nب) نلاحظ أن $${costStr} < ${pStr}$ لأننا ضربنا في عدد أصغر من $1$ ($${qStr} < 1$)، فالضرب لا يُكبّر دوماً.`,
					mark: '1'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Parallel/Perpendicular Lines, Midpoint & Circle (Arc, Chord, Radius/Diameter)
// ═══════════════════════════════════════════════════════════════════════════════
const linesAndCircleTemplate: ParameterizedTemplate = {
	id: '1am_t1_lines_and_circle_geometry',
	grade: '1am',
	trimesterId: 't1',
	domain: 'geometry',
	titleAr: 'المستقيمات المتعامدة والمتوازية والدائرة (القطر والوتر والقوس)',
	curriculumLessonId: 'lesson_1am_t1_lines_parallel_perpendicular_segments',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		if (difficulty === 'easy') {
			const halfT = rng.int(22, 48); // 2.2 to 4.8 cm
			const halfStr = formatScaledDec(halfT, 1);
			const fullStr = formatScaledDec(halfT * 2, 1);
			const isTrue = seed % 2 === 0;
			const askPerpParallel = seed % 4 < 2;

			const svg = svgPerpParallelLines({
				lineMain: '(Δ)',
				line1: '(d1)',
				line2: '(d2)',
				pts: ['A', 'M', 'B', 'K'],
				halfLenLabel: `${halfStr} cm`
			});
			const imageUrl = saveSvgAsset(`1am_t1_lines_circle_${difficulty}_${seed}`, svg);

			const statement = askPerpParallel
				? isTrue
					? 'المستقيمان $(d_1)$ و $(d_2)$ عموديان على نفس المستقيم $(\\Delta)$، إذن هما متوازيان: $(d_1) \\parallel (d_2)$.'
					: 'المستقيمان $(d_1)$ و $(d_2)$ عموديان على نفس المستقيم $(\\Delta)$، إذن هما متعامدان: $(d_1) \\perp (d_2)$.'
				: isTrue
					? `النقطة $M$ منتصف القطعة $[AB]$ وطول $AM = ${halfStr}\\text{ cm}$، إذن طول القطعة $AB = ${fullStr}\\text{ cm}$ و $K \\notin (\\Delta)$.`
					: `النقطة $M$ منتصف القطعة $[AB]$ وطول $AM = ${halfStr}\\text{ cm}$، إذن طول القطعة $AB = ${halfStr}\\text{ cm}$ و $K \\in (\\Delta)$.`;

			const explanation = askPerpParallel
				? isTrue
					? 'صحيح: المستقيمان العموديان على نفس المستقيم $(\\Delta)$ يكونان متوازيين $(d_1) \\parallel (d_2)$.'
					: 'خطأ: المستقيمان العموديان على نفس المستقيم متوازيان $(d_1) \\parallel (d_2)$ وليسا متعامدين.'
				: isTrue
					? `صحيح: $M$ منتصف $[AB]$ معناه $M \\in [AB]$ و $AB = 2 \\times AM = ${fullStr}\\text{ cm}$، والنقطة $K$ لا تنتمي إلى $(\\Delta)$.`
					: `خطأ: بما أن $M$ منتصف $[AB]$ فإن $AB = 2 \\times ${halfStr} = ${fullStr}\\text{ cm}$، كما أن $K \\notin (\\Delta)$.`;

			return {
				templateId: this.id,
				seed,
				grade: '1am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'true_false',
					questionText: `تأمّل الشكل الهندسي المقابل، ثم أجب بـ **صحيح** أو **خطأ**:\n\n${statement}`,
					questionTextAr: statement,
					imageUrl,
					imageCaption: 'مستقيمان عموديان على مستقيم (Δ) ومنتصف قطعة',
					questionData: {
						correctAnswer: isTrue
					},
					explanation
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'تأمّل الشكل المقابل حيث $(d_1) ⊥ (Delta)$ في $A$، و $(d_2) ⊥ (Delta)$ في $B$، و $M$ منتصف القطعة $[A B]$ بحيث $A M = ' + halfStr + '$ سم:',
					content: [
						{
							type: 'columns',
							widths: ['1.5fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) أكمل بالرمز المناسب ($∈$ ، $∉$ ، $⊥$ ، $∥$):\n\n$M ...... [A B]$  ؛  $K ...... (Delta)$  ؛  $(d_1) ...... (Delta)$  ؛  $(d_1) ...... (d_2)$\n\n2) ما الوضعية النسبية للمستقيمين $(d_1)$ و $(d_2)$؟ علّل إجابتك.\n\n3) احسب طول القطعة $[A B]$، ثم استنتج نصف قطر الدائرة $(cal(C))$ التي قطرها $[A B]$ ومركزها $M$.`,
									answer: `1) $M ∈ [A B]$  ؛  $K ∉ (Delta)$  ؛  $(d_1) ⊥ (Delta)$  ؛  $(d_1) ∥ (d_2)$.\n\n2) المستقيمان $(d_1)$ و $(d_2)$ متوازيان لأن المستقيمين العموديين على نفس المستقيم $(Delta)$ متوازيان.\n\n3) $A B = 2 times ${halfStr} = ${fullStr}$ سم، ونصف قطر الدائرة $(cal(C))$ هو $M A = ${halfStr}$ سم.`,
									mark: '3'
								},
								{
									type: 'image',
									src: imageUrl,
									caption: 'الشكل الهندسي'
								}
							]
						}
					]
				},
				hints: [
					'تذكّر خاصية التوازي والتعامد: المستقيمان العموديان على نفس المستقيم هما مستقيمان متوازيان.',
					'الرمز $\\in$ يعني الانتماء، و $\\notin$ يعني عدم الانتماء، والطول يُكتب $AB$ بدون عارضتين.',
					`المنتصف $M$ يقسم القطعة $[AB]$ إلى قطعتين متقايستين، فطول $[AB]$ هو ضعف $AM$.`
				],
				solutionStepsAr: [
					`بما أن $(d_1) \\perp (\\Delta)$ و $(d_2) \\perp (\\Delta)$ فإن $(d_1) \\parallel (d_2)$.`,
					`بما أن $M$ منتصف $[AB]$ فإن $AB = 2 \\times ${halfStr} = ${fullStr}\\text{ cm}$، والنقطة $K \\notin (\\Delta)$.`
				],
				finalAnswer: isTrue ? 'صحيح' : 'خطأ'
			};
		}

		// medium & hard: Circle elements SVG
		const diamT = rng.pick([64, 72, 84, 92, 96, 108, 114, 126]); // even tenths -> exact radius r = diam / 2
		const radT = diamT / 2;
		const diamStr = formatScaledDec(diamT, 1);
		const radStr = formatScaledDec(radT, 1);
		const kInside = seed % 2 === 0;
		const kDistT = kInside ? radT - rng.int(8, 14) : radT + rng.int(8, 16);
		const kDistStr = formatScaledDec(kDistT, 1);

		const svg = svgCircleElements({
			center: 'O',
			diamPts: ['A', 'B'],
			radPt: 'M',
			chordPts: ['E', 'F'],
			extraPt: 'K',
			diamLabel: `AB = ${diamStr} cm`,
			extraDistLabel: `${kDistStr} cm`,
			extraInside: kInside
		});
		const imageUrl = saveSvgAsset(`1am_t1_lines_circle_${difficulty}_${seed}`, svg);

		if (difficulty === 'medium') {
			const mcq = buildUniqueMcqOptions(
				`نصف القطر $OM = ${radStr}\\text{ cm}$ و $K \\notin (\\mathcal{C})$`,
				[
					{
						text: `نصف القطر $OM = ${diamStr}\\text{ cm}$ و $K \\in (\\mathcal{C})$`,
						diagnosticFeedback: `العدد $${diamStr}\\text{ cm}$ هو طول القطر $[AB]$ وليس نصف القطر! كما أن $OK = ${kDistStr}\\text{ cm} \\neq ${radStr}\\text{ cm}$.`
					},
					{
						text: `القطعة $[EF]$ قطر للدائرة و $OK = ${radStr}\\text{ cm}$`,
						diagnosticFeedback: 'القطعة $[EF]$ لا تمر من المركز $O$، فهي **وتر** وليست قطراً!'
					},
					{
						text: `المسافة $OE = ${diamStr}\\text{ cm}$ لأن $E \\in (\\mathcal{C})$`,
						diagnosticFeedback: `النقطة $E$ تقع على الدائرة، لذا $OE$ يساوي نصف القطر $${radStr}\\text{ cm}$ وليس القطر $${diamStr}\\text{ cm}$.`
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '1am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `في الشكل المقابل، دائرة $(\\mathcal{C})$ مركزها $O$ وقطرها $AB = ${diamStr}\\text{ cm}$، و $M \\in (\\mathcal{C})$، و $OK = ${kDistStr}\\text{ cm}$. أيّ عبارة صحيحة؟`,
					questionTextAr: `دائرة مركزها $O$ وقطرها $AB = ${diamStr}\\text{ cm}$ و $OK = ${kDistStr}\\text{ cm}$. أيّ عبارة صحيحة؟`,
					imageUrl,
					imageCaption: 'عناصر الدائرة (القطر، نصف القطر، الوتر، القوس)',
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `نصف القطر $r = ${diamStr} \\div 2 = ${radStr}\\text{ cm}$، إذن $OM = ${radStr}\\text{ cm}$. وبما أن $OK = ${kDistStr}\\text{ cm} \\neq ${radStr}\\text{ cm}$ فإن $K \\notin (\\mathcal{C})$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: `تأمّل الشكل المقابل حيث $(cal(C))$ دائرة مركزها $O$ وقطرها $[A B]$ طوله $A B = ${diamStr}$ سم، و $O K = ${kDistStr}$ سم:`,
					content: [
						{
							type: 'columns',
							widths: ['1.5fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) احسب نصف قطر الدائرة $(cal(C))$، وما هي فتحة المدور اللازمة لرسمها؟\n\n2) سمّ من الشكل: وتراً غير مار بالمركز، وقوساً من الدائرة، وأطول وتر في الدائرة.\n\n3) هل تنتمي النقطة $K$ إلى الدائرة $(cal(C))$؟ برّر إجابتك بالرمز المناسب ($∈$ أو $∉$).`,
									answer: `1) نصف القطر $r = ${diamStr} div 2 = ${radStr}$ سم، فتكون فتحة المدور مساوية لنصف القطر أي $${radStr}$ سم.\n\n2) الوتر: $[E F]$؛ القوس: القوس $E F$؛ أطول وتر هو القطر $[A B]$.\n\n3) لدينا $O K = ${kDistStr}$ سم $≠ ${radStr}$ سم، إذن $K ∉ (cal(C))$ (${kInside ? 'تقع داخل الدائرة' : 'تقع خارج الدائرة'}).`,
									mark: '3'
								},
								{
									type: 'image',
									src: imageUrl,
									caption: 'الدائرة وعناصرها'
								}
							]
						}
					]
				},
				hints: [
					'نصف قطر الدائرة يساوي نصف القطرين: $r = d \\div 2$.',
					'تنتمي النقطة إلى الدائرة $(\\mathcal{C})$ إذا وفقط إذا كانت مسافتها عن المركز $O$ تساوي نصف القطر $r$ تماماً.',
					'الوتر $[EF]$ يصل نقطتين من الدائرة دون المرور بالمركز $O$.'
				],
				solutionStepsAr: [
					`نصف القطر: $r = ${diamStr} \\div 2 = ${radStr}\\text{ cm}$، ومنه $OM = ${radStr}\\text{ cm}$.`,
					`بما أن $OK = ${kDistStr}\\text{ cm} \\neq ${radStr}\\text{ cm}$ فإن النقطة $K$ لا تنتمي إلى الدائرة ($K \\notin (\\mathcal{C})$).`
				],
				finalAnswer: `OM = ${radStr} cm`
			};
		}

		// hard: calculated radius from decimal diameter
		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `في الشكل المقابل، دائرة $(\\mathcal{C})$ مركزها $O$ وقطرها $AB = ${diamStr}\\text{ cm}$، والنقطة $M \\in (\\mathcal{C})$. ما هو طول نصف القطر $OM$ بالسنتيمتر؟`,
				questionTextAr: `دائرة مركزها $O$ وقطرها $AB = ${diamStr}\\text{ cm}$. احسب طول نصف القطر $OM$ بالسنتيمتر.`,
				imageUrl,
				imageCaption: 'حساب نصف القطر انطلاقاً من القطر',
				questionData: {
					answer: radT / 10,
					displayTemplate: `$AB = ${diamStr}\\text{ cm} \\implies OM = ?$`,
					variables: [],
					tolerance: 0.01
				},
				explanation: `بما أن $[AB]$ قطر للدائرة و $M \\in (\\mathcal{C})$، فإن المركز $O$ منتصف $[AB]$، وبالتالي $OM = r = ${diamStr} \\div 2 = ${radStr}\\text{ cm}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `تأمّل الشكل المقابل حيث $(cal(C))$ دائرة مركزها $O$ وقطرها $[A B]$ طوله $A B = ${diamStr}$ سم، و $O K = ${kDistStr}$ سم:`,
				content: [
					{
						type: 'columns',
						widths: ['1.5fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) احسب طول نصف القطر $O M$ مع التعليل، ثم حدّد وضعية النقطتين $M$ و $K$ بالنسبة للدائرة $(cal(C))$.\n\n2) صف خطوات إنشاء مثيل للقوس $E F$ باستعمال المدور والمسطرة غير المدرجة فقط.\n\n3) أنشئ المستقيم $(d)$ العمودي على $(A B)$ في $A$، والمستقيم $(d')$ العمودي على $(A B)$ في $B$. ماذا تقول عن $(d)$ و $(d')$؟ علّل.`,
								answer: `1) $O M = ${diamStr} div 2 = ${radStr}$ سم لأن المركز $O$ منتصف القطر $[A B]$. لدينا $M ∈ (cal(C))$ بينما $K ∉ (cal(C))$ لأن $O K = ${kDistStr} ≠ ${radStr}$ سم.\n\n2) نرسم قوساً مركزه $O'$ بنفس نصف القطر $r = ${radStr}$ سم ونعيّن عليه نقطة $E'$، ثم ننقل طول الوتر $E F$ بالمدور انطلاقاً من $E'$ لنحصل على $F'$.\n\n3) بما أن $(d) ⊥ (A B)$ و $(d') ⊥ (A B)$ فإن $(d) ∥ (d')$ (عموديان على نفس المستقيم).`,
								mark: '3'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الدائرة وعناصرها'
							}
						]
					}
				]
			},
			hints: [
				'المركز $O$ هو منتصف القطر $[AB]$، إذن القطر يساوي ضعف نصف القطر.',
				`لحساب نصف القطر، نقسم طول القطر $${diamStr}$ على $2$.`,
				`$${diamStr} \\div 2 = ${radStr}\\text{ cm}$.`
			],
			solutionStepsAr: [
				`نصف القطر يساوي نصف القطرين: $r = AB \\div 2$.`,
				`نحسب $OM = ${diamStr} \\div 2 = ${radStr}\\text{ cm}$.`
			],
			finalAnswer: `${radStr} cm`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Angles: Naming, Classification, Protractor Measure (0°..180°) & Bisector
// ═══════════════════════════════════════════════════════════════════════════════
const anglesMeasureBisectorTemplate: ParameterizedTemplate = {
	id: '1am_t1_angles_measure_classify_bisector',
	grade: '1am',
	trimesterId: 't1',
	domain: 'geometry',
	titleAr: 'الزوايا: التسمية والتصنيف والقياس بالدرجات والمنصف',
	curriculumLessonId: 'lesson_1am_t1_angles_measure_classify_bisector',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Angle measure for protractor (never 45 or 90 so distractors stay cleanly distinct)
		const protDeg = rng.pick([30, 35, 40, 50, 55, 65, 70, 75, 110, 115, 125, 130, 140, 145, 150]);
		const protTypeAr = protDeg < 90 ? 'حادة' : 'منفرجة';
		const protWrongTypeAr = protDeg < 90 ? 'منفرجة' : 'حادة';
		const protOtherScale = 180 - protDeg;
		const protOtherTypeAr = protOtherScale < 90 ? 'حادة' : 'منفرجة';

		// Straight-angle + bisector parameters (never alpha=60 so alpha !== (180-alpha)/2)
		const alphaDeg = rng.pick([36, 42, 48, 52, 56, 64, 68, 74, 78, 84]);
		const cobDeg = 180 - alphaDeg;
		const dobDeg = cobDeg / 2;
		const aodDeg = alphaDeg + dobDeg;

		if (difficulty === 'easy') {
			const svg = svgProtractorAngle({ deg: protDeg, vertex: 'O', ray1: 'x', ray2: 'y' });
			const imageUrl = saveSvgAsset(`1am_t1_angles_${difficulty}_${seed}`, svg);

			const compDiff = Math.abs(90 - protDeg);
			const thirdDistractorDeg = compDiff === protDeg || compDiff === protOtherScale ? protDeg + 10 : compDiff;
			const mcq = buildUniqueMcqOptions(
				`$${protDeg}^\\circ$ وهي زاوية ${protTypeAr}`,
				[
					{
						text: `$${protOtherScale}^\\circ$ وهي زاوية ${protOtherTypeAr}`,
						diagnosticFeedback: `قرأت التدريج الخارجي ($${protOtherScale}^\\circ$) بدلاً من التدريج الداخلي الذي يبدأ من $0^\\circ$ على الضلع $[Ox)$!`
					},
					{
						text: `$${protDeg}^\\circ$ وهي زاوية ${protWrongTypeAr}`,
						diagnosticFeedback: `القيس $${protDeg}^\\circ$ صحيح، لكن ${protDeg < 90 ? 'كل زاوية أصغر من $90^\\circ$ هي زاوية حادة' : 'كل زاوية محصورة بين $90^\\circ$ و $180^\\circ$ هي زاوية منفرجة'}.`
					},
					{
						text: `$${thirdDistractorDeg}^\\circ$ وهي زاوية حادة`,
						diagnosticFeedback: 'انتبه لقراءة التدريجة الموافقة للضلع $[Oy)$ انطلاقاً من $0^\\circ$ الموضوع على $[Ox)$.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '1am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: 'اقرأ قيس الزاوية $\\widehat{xOy}$ على المنقلة المقابلة وحدّد نوعها بدقة:',
					questionTextAr: 'ما قيس الزاوية $\\widehat{xOy}$ على المنقلة المقابلة وما نوعها؟',
					imageUrl,
					imageCaption: 'قياس زاوية باستعمال المنقلة',
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `نقرأ على التدريج الذي يبدأ من $0^\\circ$ على الضلع $[Ox)$ فنقرأ $${protDeg}^\\circ$. وبما أن ${protDeg < 90 ? `$0^\\circ < ${protDeg}^\\circ < 90^\\circ$` : `$90^\\circ < ${protDeg}^\\circ < 180^\\circ$`} فهي زاوية ${protTypeAr}.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'لاحظ المنقلة المقابلة ثم أجب عن الأسئلة الآتية:',
					content: [
						{
							type: 'columns',
							widths: ['1.45fr', '1.05fr'],
							children: [
								{
									type: 'text',
									content: `1) أ) سمّ رأس وضلعَي الزاوية $hat(x O y)$.\n\nب) اقرأ قيس الزاوية $hat(x O y)$ على المنقلة، وحدّد نوعها.\n\n2) صنّف الزوايا الآتية (حادة، قائمة، منفرجة، مستقيمة): $90°$ ، $180°$ ، $38°$ ، $142°$.\n\n3) إذا رسمنا نصف المستقيم $[O z)$ منصفاً للزاوية $hat(x O y)$، فما هو قيس الزاوية $hat(x O z)$؟`,
									answer: `1) أ) الرأس هو $O$، والضلعان هما نصفا المستقيم $[O x)$ و $[O y)$.\n\nب) قيس الزاوية $hat(x O y) = ${protDeg}°$ وهي زاوية ${protTypeAr}.\n\n2) $90°$: قائمة؛ $180°$: مستقيمة؛ $38°$: حادة؛ $142°$: منفرجة.\n\n3) بما أن $[O z)$ منصف $hat(x O y)$ فإن $hat(x O z) = ${protDeg}° div 2 = ${formatScaledDec(protDeg * 5, 1)}°$.`,
									mark: '3'
								},
								{
									type: 'image',
									src: imageUrl,
									caption: 'قراءة قيس الزاوية بالمنقلة'
								}
							]
						}
					]
				},
				hints: [
					'للمنقلة تدريجان: تدريج يبدأ من $0^\\circ$ على الضلع $[Ox)$ وتدريج معاكس يبدأ من $180^\\circ$.',
					'اقرأ دائماً على التدريج الذي ينطلق من $0^\\circ$ الموضوع على الضلع الأول $[Ox)$.',
					'الزاوية الحادة أصغر من $90^\\circ$، والقائمة تساوي $90^\\circ$، والمنفرجة بين $90^\\circ$ و $180^\\circ$.'
				],
				solutionStepsAr: [
					`ننطلق من تدريجة $0^\\circ$ على الضلع $[Ox)$ (التدريج الداخلي) فنقرأ عند $[Oy)$ القيس $${protDeg}^\\circ$.`,
					`بما أن ${protDeg < 90 ? `$${protDeg}^\\circ < 90^\\circ$` : `$90^\\circ < ${protDeg}^\\circ < 180^\\circ$`} فإن الزاوية **${protTypeAr}**.`
				],
				finalAnswer: `${protDeg}° (${protTypeAr})`
			};
		}

		// medium & hard: straight angle AOB + bisector [OD) of COB
		const svg = svgStraightAngleBisector({ alphaDeg, pts: ['A', 'O', 'B', 'C', 'D'] });
		const imageUrl = saveSvgAsset(`1am_t1_angles_${difficulty}_${seed}`, svg);

		if (difficulty === 'medium') {
			const mcq = buildUniqueMcqOptions(
				`$${dobDeg}^\\circ$`,
				[
					{
						text: `$${cobDeg}^\\circ$`,
						diagnosticFeedback: `$${cobDeg}^\\circ$ هو قيس الزاوية الكلية $\\widehat{COB}$ ($180^\\circ - ${alphaDeg}^\\circ$) قبل تنصيفها بالمنصف $[OD)$!`
					},
					{
						text: `$${alphaDeg / 2}^\\circ$`,
						diagnosticFeedback: `قسّمتَ قيس الزاوية $\\widehat{AOC}$ على $2$ بدلاً من تنصيف الزاوية $\\widehat{COB}$!`
					},
					{
						text: `$${alphaDeg}^\\circ$`,
						diagnosticFeedback: `القيس $${alphaDeg}^\\circ$ يمثّل الزاوية $\\widehat{AOC}$ المعطاة وليس نصف $\\widehat{COB}$.`
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '1am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `في الشكل المقابل، النقط $A$ و $O$ و $B$ في استقامية ($\\widehat{AOB} = 180^\\circ$)، وقيس $\\widehat{AOC} = ${alphaDeg}^\\circ$، ونصف المستقيم $[OD)$ منصف للزاوية $\\widehat{COB}$. ما قيس الزاوية $\\widehat{DOB}$؟`,
					questionTextAr: `النقط $A, O, B$ في استقامية، $\\widehat{AOC} = ${alphaDeg}^\\circ$، و$[OD)$ منصف $\\widehat{COB}$. ما قيس $\\widehat{DOB}$؟`,
					imageUrl,
					imageCaption: 'زاوية مستقيمة ومنصف الزاوية المجاورة',
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `الزاوية المستقيمة $\\widehat{AOB} = 180^\\circ$، إذن $\\widehat{COB} = 180^\\circ - ${alphaDeg}^\\circ = ${cobDeg}^\\circ$. وبما أن $[OD)$ منصف $\\widehat{COB}$ فإن $\\widehat{DOB} = ${cobDeg}^\\circ \\div 2 = ${dobDeg}^\\circ$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: `في الشكل المقابل، النقط $A$ و $O$ و $B$ في استقامية، و $hat(A O C) = ${alphaDeg}°$، ونصف المستقيم $[O D)$ منصف للزاوية $hat(C O B)$:`,
					content: [
						{
							type: 'columns',
							widths: ['1.5fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) احسب قيس الزاوية $hat(C O B)$ مع التعليل، ثم حدّد نوعها.\n\n2) استنتج قيس كلّ من الزاويتين $hat(D O B)$ و $hat(A O D)$.\n\n3) اذكر خطوات إنشاء المنصف $[O D)$ للزاوية $hat(C O B)$ باستعمال المدور والمسطرة فقط.`,
									answer: `1) بما أن $A$ و $O$ و $B$ في استقامية فإن $hat(A O B) = 180°$، ومنه $hat(C O B) = 180° - ${alphaDeg}° = ${cobDeg}°$ (زاوية منفرجة).\n\n2) $[O D)$ منصف $hat(C O B)$ إذن $hat(D O B) = hat(C O D) = ${cobDeg}° div 2 = ${dobDeg}°$، ومنه $hat(A O D) = ${alphaDeg}° + ${dobDeg}° = ${aodDeg}°$.\n\n3) نضع شوكة المدور في $O$ ونرسم قوساً يقطع $[O C)$ و $[O B)$ في نقطتين، ثم من النقطتين وبنفس الفتحة نرسم قوسين يتقاطعان داخل الزاوية، ونصل الرأس $O$ بنقطة التقاطع.`,
									mark: '3'
								},
								{
									type: 'image',
									src: imageUrl,
									caption: 'الزاوية المستقيمة والمنصف'
								}
							]
						}
					]
				},
				hints: [
					'تشكّل النقط المستقيمة $A$ و $O$ و $B$ زاوية مستقيمة قيسها $180^\\circ$.',
					`احسب أولاً قيس الزاوية $\\widehat{COB} = 180^\\circ - ${alphaDeg}^\\circ$.`,
					'منصف الزاوية يقسمها إلى زاويتين متجاورتين متقايستين، فنقسم على $2$.'
				],
				solutionStepsAr: [
					`قيس الزاوية المستقيمة $\\widehat{AOB} = 180^\\circ$، إذن $\\widehat{COB} = 180^\\circ - ${alphaDeg}^\\circ = ${cobDeg}^\\circ$.`,
					`بما أن $[OD)$ منصف $\\widehat{COB}$ فإن $\\widehat{DOB} = ${cobDeg}^\\circ \\div 2 = ${dobDeg}^\\circ$.`
				],
				finalAnswer: `${dobDeg}°`
			};
		}

		// hard: calculated angle AOD
		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `في الشكل المقابل، النقط $A$ و $O$ و $B$ في استقامية، وقيس $\\widehat{AOC} = ${alphaDeg}^\\circ$، ونصف المستقيم $[OD)$ منصف للزاوية $\\widehat{COB}$. احسب قيس الزاوية $\\widehat{AOD}$ بالدرجات:`,
				questionTextAr: `النقط $A, O, B$ في استقامية، $\\widehat{AOC} = ${alphaDeg}^\\circ$، و$[OD)$ منصف $\\widehat{COB}$. احسب قيس $\\widehat{AOD}$ بالدرجات.`,
				imageUrl,
				imageCaption: 'الزاوية المستقيمة ومنصف الزاوية المجاورة',
				questionData: {
					answer: aodDeg,
					displayTemplate: `$\\widehat{AOD} = \\widehat{AOC} + \\widehat{COD} = ?$`,
					variables: [],
					tolerance: 0
				},
				explanation: `نجد أولاً $\\widehat{COB} = 180^\\circ - ${alphaDeg}^\\circ = ${cobDeg}^\\circ$. وبما أن $[OD)$ منصفها فإن $\\widehat{COD} = ${cobDeg}^\\circ \\div 2 = ${dobDeg}^\\circ$. إذن $\\widehat{AOD} = ${alphaDeg}^\\circ + ${dobDeg}^\\circ = ${aodDeg}^\\circ$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `في الشكل المقابل، النقط $A$ و $O$ و $B$ في استقامية، و $hat(A O C) = ${alphaDeg}°$، ونصف المستقيم $[O D)$ منصف للزاوية $hat(C O B)$:`,
				content: [
					{
						type: 'columns',
						widths: ['1.5fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) احسب قيس الزاوية $hat(C O B)$ مع التعليل، ثم استنتج قيس $hat(C O D)$.\n\n2) احسب قيس الزاوية $hat(A O D)$ وحدّد نوعها.\n\n3) هل الزاويتان $hat(A O C)$ و $hat(C O D)$ حادتان أم منفرجتان؟ برّر إجابتك.`,
								answer: `1) $hat(A O B) = 180°$ إذن $hat(C O B) = 180° - ${alphaDeg}° = ${cobDeg}°$. وبما أن $[O D)$ منصفها فإن $hat(C O D) = ${cobDeg}° div 2 = ${dobDeg}°$.\n\n2) $hat(A O D) = hat(A O C) + hat(C O D) = ${alphaDeg}° + ${dobDeg}° = ${aodDeg}°$، وهي زاوية منفرجة ($90° < ${aodDeg}° < 180°$).\n\n3) كلاهما حادتان لأن $0° < ${alphaDeg}° < 90°$ و $0° < ${dobDeg}° < 90°$.`,
								mark: '3'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الزاوية المستقيمة والمنصف'
							}
						]
					}
				]
			},
			hints: [
				`احسب أولاً $\\widehat{COB} = 180^\\circ - ${alphaDeg}^\\circ = ${cobDeg}^\\circ$.`,
				`اقسم $\\widehat{COB}$ على $2$ لتجد قيس $\\widehat{COD}$.`,
				`اجمع $\\widehat{AOC} + \\widehat{COD}$ لإيجاد قيس $\\widehat{AOD}$.`
			],
			solutionStepsAr: [
				`$\\widehat{COB} = 180^\\circ - ${alphaDeg}^\\circ = ${cobDeg}^\\circ$.`,
				`$\\widehat{COD} = ${cobDeg}^\\circ \\div 2 = ${dobDeg}^\\circ$.`,
				`$\\widehat{AOD} = ${alphaDeg}^\\circ + ${dobDeg}^\\circ = ${aodDeg}^\\circ$.`
			],
			finalAnswer: `${aodDeg}°`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. T1 Integration Situation (الوضعية الإدماجية - 8 pts, 3 Parts)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationT1Template: ParameterizedTemplate = {
	id: '1am_t1_integration',
	grade: '1am',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية: تهيئة حديقة وساحة المتوسطة',
	curriculumLessonId: 'lesson_1am_t1_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Part 1: Decimal pricing & budget (B > totalCost strictly)
		const budget = rng.pick([5000, 5500, 6000]);
		const pTileH = rng.int(18, 28) * 100 + rng.pick([25, 45, 65, 75]); // 18.25 .. 28.75 DA
		const pTileStr = formatScaledDec(pTileH, 2);
		const costTiles = pTileH; // 100 * (pTileH / 100) = pTileH exact integer!

		const qSeedT = rng.pick([24, 25, 32, 35, 45]); // 2.4 .. 4.5 kg
		const pSeedT = rng.int(14, 24) * 100 + rng.pick([2, 4, 6, 8]); // 140.2 .. 240.8 DA
		const qSeedStr = formatScaledDec(qSeedT, 1);
		const pSeedStr = formatScaledDec(pSeedT, 1);
		const costSeedsH = qSeedT * pSeedT; // scaled by 100
		const costSeedsStr = formatScaledDec(costSeedsH, 2);

		const totalCostH = costTiles * 100 + costSeedsH;
		const totalCostStr = formatScaledDec(totalCostH, 2);
		const remBudgetH = budget * 100 - totalCostH;
		const remBudgetStr = formatScaledDec(remBudgetH, 2);

		// Order of magnitude rounding
		const pTileRound = Math.round(pTileH / 100);
		const qSeedRound = Math.round(qSeedT / 10);
		const pSeedRound = Math.round(pSeedT / 1000) * 100;
		const magEstimate = 100 * pTileRound + qSeedRound * pSeedRound;

		// Part 2: Rectangular flowerbed perimeter minus gate + circular basin radius
		const L_T = rng.int(11, 18) * 10 + rng.pick([2, 4, 6, 8]); // 11.2 .. 18.8 m
		const W_T = rng.int(6, 9) * 10 + rng.pick([3, 4, 5, 7]); // 6.3 .. 9.7 m
		const gateT = rng.pick([12, 14, 15, 16, 18]); // 1.2 .. 1.8 m
		const LStr = formatScaledDec(L_T, 1);
		const WStr = formatScaledDec(W_T, 1);
		const gateStr = formatScaledDec(gateT, 1);
		const halfPerimT = L_T + W_T;
		const perimT = 2 * halfPerimT;
		const wireLenT = perimT - gateT;
		const halfPerimStr = formatScaledDec(halfPerimT, 1);
		const perimStr = formatScaledDec(perimT, 1);
		const wireLenStr = formatScaledDec(wireLenT, 1);

		const diamT = rng.int(4, 8) * 10 + rng.pick([2, 4, 6, 8]); // even tenths -> exact r
		const radT = diamT / 2;
		const diamStr = formatScaledDec(diamT, 1);
		const radStr = formatScaledDec(radT, 1);

		// Part 3: Parallel/perpendicular paths & straight angle bisector
		const alphaDeg = rng.pick([44, 48, 52, 56, 64, 68, 72, 76]);
		const fmhDeg = 180 - alphaDeg;
		const fmzDeg = fmhDeg / 2;

		const svg = svgGardenPlan({
			lengthLabel: `${LStr} m`,
			widthLabel: `${WStr} m`,
			gateLabel: `${gateStr} m`,
			diamLabel: `${diamStr} m`,
			alphaDeg
		});
		const imageUrl = saveSvgAsset(`1am_t1_integration_${difficulty}_${seed}`, svg);

		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;

		if (difficulty === 'easy') {
			const wrongShift10H = (pTileH / 10) * 100 + costSeedsH;
			const wrongMulDecH = costTiles * 100 + costSeedsH * 10;
			const wrongOnlyTiles = costTiles;

			const mcq = buildUniqueMcqOptions(
				`$${totalCostStr}\\text{ DA}$`,
				[
					{
						text: `$${formatScaledDec(wrongShift10H, 2)}\\text{ DA}$`,
						diagnosticFeedback: `عند حساب ثمن $100$ بلاطة ($100 \\times ${pTileStr}$)، نزيح الفاصلة **مرتبتين** يميناً وليس مرتبة واحدة!`
					},
					{
						text: `$${formatScaledDec(wrongMulDecH, 2)}\\text{ DA}$`,
						diagnosticFeedback: `في جداء ثمن البذور ($${qSeedStr} \\times ${pSeedStr}$)، يوجد رقمان بعد الفاصلة في العاملين معاً.`
					},
					{
						text: `$${wrongOnlyTiles}\\text{ DA}$`,
						diagnosticFeedback: 'هذا ثمن البلاطات فقط، نسيت إضافة ثمن بذور العشب!'
					}
				],
				rng
			);

			finalAnswer = `${totalCostStr} DA`;
			quizQuestion = {
				type: 'mcq',
				questionText: `لتهيئة حديقة المتوسطة، اشترت الإدارة $100$ بلاطة بسعر $${pTileStr}\\text{ DA}$ للبلاطة الواحدة، و$${qSeedStr}\\text{ kg}$ من بذور العشب بسعر $${pSeedStr}\\text{ DA}$ للكيلوغرام الواحد. ما هي **الكلفة الإجمالية** للمشتريات؟`,
				questionTextAr: `اشترت الإدارة $100$ بلاطة بسعر $${pTileStr}\\text{ DA}$ للواحدة و$${qSeedStr}\\text{ kg}$ بذوراً بسعر $${pSeedStr}\\text{ DA/kg}$. ما الكلفة الإجمالية؟`,
				imageUrl,
				imageCaption: 'مخطط تهيئة حديقة المتوسطة',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `ثمن البلاطات: $100 \\times ${pTileStr} = ${costTiles}\\text{ DA}$. ثمن البذور: $${qSeedStr} \\times ${pSeedStr} = ${costSeedsStr}\\text{ DA}$. الكلفة الإجمالية: $${costTiles} + ${costSeedsStr} = ${totalCostStr}\\text{ DA}$.`
			};
			hints = [
				`احسب أولاً ثمن البلاطات بإزاحة الفاصلة مرتبتين إلى اليمين: $100 \\times ${pTileStr}$.`,
				`احسب ثانياً ثمن البذور بالضرب العمودي $${qSeedStr} \\times ${pSeedStr}$ ثم ضع الفاصلة بعد رقمين.`,
				'اجمع الثمنين مع احترام وضع الفاصلة تحت الفاصلة.'
			];
			solutionStepsAr = [
				`ثمن البلاطات: $100 \\times ${pTileStr} = ${costTiles}\\text{ DA}$.`,
				`ثمن البذور: $${qSeedStr} \\times ${pSeedStr} = ${costSeedsStr}\\text{ DA}$.`,
				`الكلفة الإجمالية: $${costTiles} + ${costSeedsStr} = ${totalCostStr}\\text{ DA}$.`
			];
		} else if (difficulty === 'medium') {
			const wrongNoDouble = formatScaledDec(halfPerimT - gateT, 1);
			const wrongAddGate = formatScaledDec(perimT + gateT, 1);
			const wrongNoGate = perimStr;

			const mcq = buildUniqueMcqOptions(
				`$${wireLenStr}\\text{ m}$`,
				[
					{
						text: `$${wrongNoDouble}\\text{ m}$`,
						diagnosticFeedback: 'محيط المستطيل هو ضعف مجموع الطول والعرض $(L + l) \\times 2$، نسيت الضرب في $2$!'
					},
					{
						text: `$${wrongAddGate}\\text{ m}$`,
						diagnosticFeedback: `عرض المدخل ($${gateStr}\\text{ m}$) يُترك مفتوحاً، لذا **نطرحه** من المحيط ولا نضيفه!`
					},
					{
						text: `$${wrongNoGate}\\text{ m}$`,
						diagnosticFeedback: `هذا هو المحيط الكامل للمستطيل، نسيت طرح عرض المدخل $${gateStr}\\text{ m}$.`
					}
				],
				rng
			);

			finalAnswer = `${wireLenStr} m`;
			quizQuestion = {
				type: 'mcq',
				questionText: `في المخطط المقابل، حوض أزهار مستطيل $ABCD$ طوله $${LStr}\\text{ m}$ وعرضه $${WStr}\\text{ m}$. نريد تسييجه بالكامل مع ترك مدخل عرضه $${gateStr}\\text{ m}$. ما طول السياج اللازم بالمتر؟`,
				questionTextAr: `حوض مستطيل طوله $${LStr}\\text{ m}$ وعرضه $${WStr}\\text{ m}$ بمدخل عرضه $${gateStr}\\text{ m}$. ما طول السياج اللازم؟`,
				imageUrl,
				imageCaption: 'مخطط حوض الأزهار المستطيل والحوض الدائري',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `محيط المستطيل: $(${LStr} + ${WStr}) \\times 2 = ${halfPerimStr} \\times 2 = ${perimStr}\\text{ m}$. نطرح عرض المدخل: $${perimStr} - ${gateStr} = ${wireLenStr}\\text{ m}$.`
			};
			hints = [
				`احسب أولاً نصف المحيط (الطول + العرض): $${LStr} + ${WStr} = ${halfPerimStr}\\text{ m}$.`,
				'اضرب نصف المحيط في $2$ لتحصل على محيط الحوض المستطيل كاملاً.',
				`اطرح عرض المدخل ($${gateStr}\\text{ m}$) من المحيط لتحصل على طول السياج.`
			];
			solutionStepsAr = [
				`محيط المستطيل $ABCD$: $(${LStr} + ${WStr}) \\times 2 = ${perimStr}\\text{ m}$.`,
				`طول السياج بعد طرح المدخل: $${perimStr} - ${gateStr} = ${wireLenStr}\\text{ m}$.`
			];
		} else {
			// hard: calculated remaining budget after both decimal expenses
			finalAnswer = `${remBudgetStr} DA`;
			quizQuestion = {
				type: 'calculated',
				questionText: `خصّصت إدارة المتوسطة ميزانية قدرها $${budget}\\text{ DA}$، فاشترت $100$ بلاطة بسعر $${pTileStr}\\text{ DA}$ للواحدة، و$${qSeedStr}\\text{ kg}$ من بذور العشب بسعر $${pSeedStr}\\text{ DA/kg}$. احسب المبلغ **المتبقي** من الميزانية بالدينار:`,
				questionTextAr: `من ميزانية $${budget}\\text{ DA}$، اُشتري $100$ بلاطة بسعر $${pTileStr}\\text{ DA}$ و$${qSeedStr}\\text{ kg}$ بذوراً بسعر $${pSeedStr}\\text{ DA/kg}$. ما المبلغ المتبقي بالدينار؟`,
				imageUrl,
				imageCaption: 'مخطط تهيئة حديقة المتوسطة',
				questionData: {
					answer: remBudgetH / 100,
					displayTemplate: `$${budget} - (100 \\times ${pTileStr} + ${qSeedStr} \\times ${pSeedStr}) = ?$`,
					variables: [],
					tolerance: 0.01
				},
				explanation: `ثمن البلاطات $= ${costTiles}\\text{ DA}$، وثمن البذور $= ${costSeedsStr}\\text{ DA}$، والمجموع $= ${totalCostStr}\\text{ DA}$. المبلغ المتبقي $= ${budget} - ${totalCostStr} = ${remBudgetStr}\\text{ DA}$.`
			};
			hints = [
				`احسب ثمن البلاطات ($100 \\times ${pTileStr} = ${costTiles}\\text{ DA}$) ثم ثمن البذور ($${qSeedStr} \\times ${pSeedStr}$).`,
				'اجمع المصروفين لإيجاد الكلفة الإجمالية.',
				`اطرح الكلفة الإجمالية من الميزانية $${budget}\\text{ DA}$ مع وضع الفاصلة تحت الفاصلة.`
			];
			solutionStepsAr = [
				`ثمن البلاطات: $100 \\times ${pTileStr} = ${costTiles}\\text{ DA}$.`,
				`ثمن البذور: $${qSeedStr} \\times ${pSeedStr} = ${costSeedsStr}\\text{ DA}$.`,
				`المجموع: $${totalCostStr}\\text{ DA}$، والمتبقي: $${budget} - ${totalCostStr} = ${remBudgetStr}\\text{ DA}$.`
			];
		}

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 8,
			instruction: `لتهيئة ساحة وحديقة المتوسطة، خصّصت الإدارة ميزانية قدرها $${formatTypstInt(budget)}$ دج. يبيّن الشكل المقابل مخطط حوض الأزهار المستطيل $A B C D$ والحوض الدائري $(cal(C))$ الذي مركزه $M$ وقطره $[E F]$.`,
			content: [
				{
					type: 'columns',
					widths: ['1.45fr', '1.15fr'],
					children: [
						{
							type: 'text',
							content: `الجزء الأول (الميزانية والأعداد العشرية):\n\nاشترت الإدارة $100$ بلاطة صغيرة بسعر $${pTileStr}$ دج للبلاطة الواحدة، و $${qSeedStr}$ كغ من بذور العشب بسعر $${pSeedStr}$ دج للكيلوغرام الواحد.\n\n1) أعطِ رتبة مقدار تقريبية للكلفة الإجمالية.\n\n2) احسب ثمن البلاطات، وثمن البذور، ثم الكلفة الإجمالية الدقيقة والمبلغ المتبقي من الميزانية.`,
							answer: `الجزء الأول:\n\n1) رتبة مقدار: $100 times ${pTileRound} + ${qSeedRound} times ${pSeedRound} = ${formatTypstInt(magEstimate)}$ دج.\n\n2) ثمن البلاطات: $100 times ${pTileStr} = ${formatTypstInt(costTiles)}$ دج. ثمن البذور: $${qSeedStr} times ${pSeedStr} = ${costSeedsStr}$ دج. الكلفة الإجمالية: $${costTiles} + ${costSeedsStr} = ${totalCostStr}$ دج. المبلغ المتبقي: $${budget} - ${totalCostStr} = ${remBudgetStr}$ دج.`,
							mark: '3'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'مخطط الحوض المستطيل والحوض الدائري'
						}
					]
				},
				{
					type: 'text',
					content: `الجزء الثاني (المحيط والدائرة):\n\nأبعاد الحوض المستطيل $A B C D$ هي: الطول $${LStr}$ م والعرض $${WStr}$ م، ونريد تسييجه مع ترك مدخل عرضه $${gateStr}$ م. أمّا الحوض الدائري $(cal(C))$ فقطره $E F = ${diamStr}$ م.\n\n1) احسب بالمتر طول السياج اللازم لإحاطة الحوض $A B C D$.\n\n2) احسب نصف قطر الحوض الدائري $(cal(C))$.`,
					answer: `الجزء الثاني:\n\n1) محيط المستطيل: $(${LStr} + ${WStr}) times 2 = ${halfPerimStr} times 2 = ${perimStr}$ م. طول السياج اللازم: $${perimStr} - ${gateStr} = ${wireLenStr}$ م.\n\n2) نصف قطر الدائرة $(cal(C))$: $r = ${diamStr} div 2 = ${radStr}$ م.`,
					mark: '2.5'
				},
				{
					type: 'text',
					content: `الجزء الثالث (الهندسة والزوايا):\n\nعلى الممر المستقيم $(Delta)$ المار بالقطر $[E F]$، رُسم ممرّان $(d_1)$ و $(d_2)$ عموديان على $(Delta)$ في $E$ و $F$ على الترتيب. كما رُسم الممر $[M H)$ حيث $hat(E M H) = ${alphaDeg}°$، ونصف المستقيم $[M z)$ منصف الزاوية $hat(F M H)$.\n\n1) ما هي الوضعية النسبية للمستقيمين $(d_1)$ و $(d_2)$؟ علّل.\n\n2) احسب قيس الزاوية $hat(F M H)$، ثم استنتج قيس الزاوية $hat(F M z)$ وحدّد نوعها.`,
					answer: `الجزء الثالث:\n\n1) لدينا $(d_1) ⊥ (Delta)$ و $(d_2) ⊥ (Delta)$، إذن $(d_1) ∥ (d_2)$ لأن المستقيمين العموديين على نفس المستقيم متوازيان.\n\n2) النقط $E$ و $M$ و $F$ في استقامية فـ $hat(E M F) = 180°$، ومنه $hat(F M H) = 180° - ${alphaDeg}° = ${fmhDeg}°$. وبما أن $[M z)$ منصفها فإن $hat(F M z) = ${fmhDeg}° div 2 = ${fmzDeg}°$ وهي زاوية حادة ($0° < ${fmzDeg}° < 90°$).`,
					mark: '2.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

export const TEMPLATES_1AM_T1: ParameterizedTemplate[] = [
	decimalWritingComparingTemplate,
	addSubMagnitudeMissingTemplate,
	decimalMultiplicationTemplate,
	linesAndCircleTemplate,
	anglesMeasureBisectorTemplate,
	integrationT1Template
];
