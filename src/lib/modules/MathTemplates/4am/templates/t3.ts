import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';
import { SeededRng, buildUniqueMcqOptions, roundTo } from '../../rng';
import { saveSvgAsset, svgBarChart, svgCartesianPlane } from '../../svg-helpers';

const PI_APPROX = 3.14;

const DIFF_SALT: Record<Difficulty, number> = {
	easy: 11,
	medium: 37,
	hard: 73
};

function makeRng(seed: number, salt: number, difficulty: Difficulty): SeededRng {
	const s = Math.trunc(seed);
	return new SeededRng(((s * 977 + salt * 131 + DIFF_SALT[difficulty]) >>> 0) || 1);
}

function fmtNum(n: number): string {
	const r = roundTo(n, 2);
	return Object.is(r, -0) ? '0' : String(r);
}

function escapeXml(str: string): string {
	return str
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

function wrapLocalSvg(width: number, height: number, body: string): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="background:#ffffff;font-family:Arial,sans-serif">${body}</svg>`;
}

/** Formats ax + by = c cleanly for both KaTeX and Typst math blocks */
function fmtLinearEq(a: number, b: number, c: number, vx = 'x', vy = 'y'): string {
	const first = a === 1 ? vx : a === -1 ? `-${vx}` : `${a}${vx}`;
	let second = '';
	if (b === 1) second = `+ ${vy}`;
	else if (b === -1) second = `- ${vy}`;
	else if (b > 0) second = `+ ${b}${vy}`;
	else if (b < 0) second = `- ${-b}${vy}`;
	return `${first} ${second} = ${c}`;
}

/** Formats ax + b cleanly (a != 0) */
function fmtAffineExpr(a: number, b: number, vx = 'x'): string {
	const ax = a === 1 ? vx : a === -1 ? `-${vx}` : `${a}${vx}`;
	if (b === 0) return ax;
	return b > 0 ? `${ax} + ${b}` : `${ax} - ${-b}`;
}

/** Computes safe integer bounds for svgCartesianPlane avoiding corner-clipping degenerate lines */
function computeCartesianBounds(
	lines: { a: number; b: number }[],
	keyPoints: { x: number; y: number }[]
): { xMin: number; xMax: number; yMin: number; yMax: number } {
	let xMin = -2;
	let xMax = 5;
	let yMin = -3;
	let yMax = 6;
	for (const pt of keyPoints) {
		xMin = Math.min(xMin, Math.floor(pt.x) - 2);
		xMax = Math.max(xMax, Math.ceil(pt.x) + 2);
		yMin = Math.min(yMin, Math.floor(pt.y) - 2);
		yMax = Math.max(yMax, Math.ceil(pt.y) + 2);
	}
	// Ensure no line hits the exact boundary corner (xMin, yMin/yMax) or (xMax, yMin/yMax)
	for (let guard = 0; guard < 5; guard++) {
		let conflict = false;
		for (const ln of lines) {
			const yl = ln.a * xMin + ln.b;
			const yr = ln.a * xMax + ln.b;
			if (yl === yMin || yl === yMax || yr === yMin || yr === yMax) {
				conflict = true;
				break;
			}
		}
		if (!conflict) break;
		yMax += 1;
		yMin -= 1;
	}
	return { xMin, xMax, yMin, yMax };
}

// ═══════════════════════════════════════════════════════════════════════════════
// Local Typst-safe SVG generators for 4AM T3 geometry & space measurement
// ═══════════════════════════════════════════════════════════════════════════════

function svgCircleRotationPolygon(opts:
	| {
			mode: 'angles_rotation';
			centralDeg: number;
			radiusLabel: string;
	  }
	| {
			mode: 'regular_polygon';
			sides: 3 | 4 | 6;
			centralDeg: number;
			radiusLabel: string;
	  }
	| {
			mode: 'diameter_right';
			thetaDeg: 60 | 90 | 120;
			diameterLabel: string;
	  }
): string {
	const w = 280;
	const h = 215;
	const cx = 140;
	const cy = 108;
	const r = 74;
	const parts: string[] = [
		`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#f8fafc" stroke="#334155" stroke-width="1.8"/>`
	];

	const ptOnCircle = (deg: number, rad = r) => {
		const radAngle = (deg * Math.PI) / 180;
		return {
			x: cx + rad * Math.cos(radAngle),
			y: cy - rad * Math.sin(radAngle)
		};
	};

	if (opts.mode === 'angles_rotation') {
		const phiA = 15;
		const phiB = 15 + opts.centralDeg;
		const phiM = 222;
		const phiN = 288;
		const A = ptOnCircle(phiA);
		const B = ptOnCircle(phiB);
		const M = ptOnCircle(phiM);
		const N = ptOnCircle(phiN);

		// Central radii O-A, O-B
		parts.push(
			`<line x1="${cx}" y1="${cy}" x2="${A.x.toFixed(1)}" y2="${A.y.toFixed(1)}" stroke="#dc2626" stroke-width="2"/>`,
			`<line x1="${cx}" y1="${cy}" x2="${B.x.toFixed(1)}" y2="${B.y.toFixed(1)}" stroke="#dc2626" stroke-width="2"/>`
		);
		// Inscribed chords M-A, M-B and N-A, N-B
		parts.push(
			`<line x1="${M.x.toFixed(1)}" y1="${M.y.toFixed(1)}" x2="${A.x.toFixed(1)}" y2="${A.y.toFixed(1)}" stroke="#2563eb" stroke-width="1.7"/>`,
			`<line x1="${M.x.toFixed(1)}" y1="${M.y.toFixed(1)}" x2="${B.x.toFixed(1)}" y2="${B.y.toFixed(1)}" stroke="#2563eb" stroke-width="1.7"/>`,
			`<line x1="${N.x.toFixed(1)}" y1="${N.y.toFixed(1)}" x2="${A.x.toFixed(1)}" y2="${A.y.toFixed(1)}" stroke="#059669" stroke-width="1.6" stroke-dasharray="4 3"/>`,
			`<line x1="${N.x.toFixed(1)}" y1="${N.y.toFixed(1)}" x2="${B.x.toFixed(1)}" y2="${B.y.toFixed(1)}" stroke="#059669" stroke-width="1.6" stroke-dasharray="4 3"/>`
		);

		// Central angle arc
		const arcR = 22;
		const aStart = ptOnCircle(phiA, arcR);
		const aEnd = ptOnCircle(phiB, arcR);
		parts.push(
			`<path d="M ${aStart.x.toFixed(1)} ${aStart.y.toFixed(1)} A ${arcR} ${arcR} 0 0 0 ${aEnd.x.toFixed(1)} ${aEnd.y.toFixed(1)}" fill="none" stroke="#dc2626" stroke-width="2"/>`
		);
		const midAng = (phiA + phiB) / 2;
		const lblCentral = ptOnCircle(midAng, arcR + 15);
		parts.push(
			`<text x="${lblCentral.x.toFixed(1)}" y="${(lblCentral.y + 4).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">${opts.centralDeg}°</text>`
		);

		// Rotation arrow outside A -> B
		const rotR = r + 11;
		const rStart = ptOnCircle(phiA + 4, rotR);
		const rEnd = ptOnCircle(phiB - 4, rotR);
		parts.push(
			`<path d="M ${rStart.x.toFixed(1)} ${rStart.y.toFixed(1)} A ${rotR} ${rotR} 0 0 0 ${rEnd.x.toFixed(1)} ${rEnd.y.toFixed(1)}" fill="none" stroke="#d97706" stroke-width="1.6" stroke-dasharray="3 2"/>`
		);

		// Points & Labels
		const lblA = ptOnCircle(phiA, r + 13);
		const lblB = ptOnCircle(phiB, r + 13);
		const lblM = ptOnCircle(phiM, r + 14);
		const lblN = ptOnCircle(phiN, r + 14);
		parts.push(
			`<circle cx="${cx}" cy="${cy}" r="3.5" fill="#0f172a"/>`,
			`<text x="${cx - 12}" y="${cy + 14}" font-size="11" font-weight="bold" fill="#0f172a">O</text>`,
			`<circle cx="${A.x.toFixed(1)}" cy="${A.y.toFixed(1)}" r="3.5" fill="#dc2626"/>`,
			`<text x="${lblA.x.toFixed(1)}" y="${(lblA.y + 4).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">A</text>`,
			`<circle cx="${B.x.toFixed(1)}" cy="${B.y.toFixed(1)}" r="3.5" fill="#dc2626"/>`,
			`<text x="${lblB.x.toFixed(1)}" y="${(lblB.y + 4).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">B</text>`,
			`<circle cx="${M.x.toFixed(1)}" cy="${M.y.toFixed(1)}" r="3.5" fill="#2563eb"/>`,
			`<text x="${lblM.x.toFixed(1)}" y="${(lblM.y + 4).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="bold" fill="#2563eb">M</text>`,
			`<circle cx="${N.x.toFixed(1)}" cy="${N.y.toFixed(1)}" r="3.5" fill="#059669"/>`,
			`<text x="${lblN.x.toFixed(1)}" y="${(lblN.y + 4).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="bold" fill="#059669">N</text>`,
			`<text x="14" y="20" font-size="10.5" font-weight="bold" fill="#334155">${escapeXml(opts.radiusLabel)}</text>`
		);
	} else if (opts.mode === 'regular_polygon') {
		const startDeg = opts.sides === 4 ? 45 : opts.sides === 3 ? 90 : 0;
		const names = ['A', 'B', 'C', 'D', 'E', 'F'];
		const vertices: { x: number; y: number; deg: number; name: string }[] = [];
		for (let i = 0; i < opts.sides; i++) {
			const deg = startDeg + i * (360 / opts.sides);
			const p = ptOnCircle(deg);
			vertices.push({ ...p, deg, name: names[i] });
		}
		const polyPts = vertices.map((v) => `${v.x.toFixed(1)},${v.y.toFixed(1)}`).join(' ');
		parts.push(`<polygon points="${polyPts}" fill="#eff6ff" fill-opacity="0.7" stroke="#2563eb" stroke-width="2"/>`);

		// Highlight central sector O-A-B
		const v0 = vertices[0];
		const v1 = vertices[1];
		parts.push(
			`<line x1="${cx}" y1="${cy}" x2="${v0.x.toFixed(1)}" y2="${v0.y.toFixed(1)}" stroke="#dc2626" stroke-width="1.8"/>`,
			`<line x1="${cx}" y1="${cy}" x2="${v1.x.toFixed(1)}" y2="${v1.y.toFixed(1)}" stroke="#dc2626" stroke-width="1.8"/>`
		);
		const arcR = 20;
		const a0 = ptOnCircle(v0.deg, arcR);
		const a1 = ptOnCircle(v1.deg, arcR);
		parts.push(
			`<path d="M ${a0.x.toFixed(1)} ${a0.y.toFixed(1)} A ${arcR} ${arcR} 0 0 0 ${a1.x.toFixed(1)} ${a1.y.toFixed(1)}" fill="none" stroke="#dc2626" stroke-width="1.8"/>`
		);
		const midV = ptOnCircle((v0.deg + v1.deg) / 2, arcR + 14);
		parts.push(
			`<text x="${midV.x.toFixed(1)}" y="${(midV.y + 4).toFixed(1)}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">${opts.centralDeg}°</text>`
		);

		// Inscribed line for hexagon / square
		if (opts.sides === 6) {
			const v3 = vertices[3];
			parts.push(
				`<line x1="${v3.x.toFixed(1)}" y1="${v3.y.toFixed(1)}" x2="${v0.x.toFixed(1)}" y2="${v0.y.toFixed(1)}" stroke="#059669" stroke-width="1.5" stroke-dasharray="4 3"/>`,
				`<line x1="${v3.x.toFixed(1)}" y1="${v3.y.toFixed(1)}" x2="${v1.x.toFixed(1)}" y2="${v1.y.toFixed(1)}" stroke="#059669" stroke-width="1.5"/>`
			);
		} else if (opts.sides === 4) {
			const v2 = vertices[2];
			parts.push(
				`<line x1="${v2.x.toFixed(1)}" y1="${v2.y.toFixed(1)}" x2="${v0.x.toFixed(1)}" y2="${v0.y.toFixed(1)}" stroke="#059669" stroke-width="1.5" stroke-dasharray="4 3"/>`
			);
		}

		for (const v of vertices) {
			const lbl = ptOnCircle(v.deg, r + 14);
			parts.push(
				`<circle cx="${v.x.toFixed(1)}" cy="${v.y.toFixed(1)}" r="3.4" fill="#2563eb"/>`,
				`<text x="${lbl.x.toFixed(1)}" y="${(lbl.y + 4).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${v.name}</text>`
			);
		}
		parts.push(
			`<circle cx="${cx}" cy="${cy}" r="3.5" fill="#0f172a"/>`,
			`<text x="${cx - 10}" y="${cy + 14}" font-size="11" font-weight="bold" fill="#0f172a">O</text>`,
			`<text x="12" y="20" font-size="10.5" font-weight="bold" fill="#334155">${escapeXml(opts.radiusLabel)}</text>`
		);
	} else {
		// diameter_right
		const A = ptOnCircle(0);
		const B = ptOnCircle(180);
		const M = ptOnCircle(opts.thetaDeg);

		parts.push(
			`<line x1="${B.x.toFixed(1)}" y1="${B.y.toFixed(1)}" x2="${A.x.toFixed(1)}" y2="${A.y.toFixed(1)}" stroke="#0f172a" stroke-width="2"/>`,
			`<line x1="${cx}" y1="${cy}" x2="${M.x.toFixed(1)}" y2="${M.y.toFixed(1)}" stroke="#dc2626" stroke-width="1.8"/>`,
			`<line x1="${A.x.toFixed(1)}" y1="${A.y.toFixed(1)}" x2="${M.x.toFixed(1)}" y2="${M.y.toFixed(1)}" stroke="#2563eb" stroke-width="2"/>`,
			`<line x1="${B.x.toFixed(1)}" y1="${B.y.toFixed(1)}" x2="${M.x.toFixed(1)}" y2="${M.y.toFixed(1)}" stroke="#059669" stroke-width="2"/>`
		);

		// Right-angle square marker at M using orthogonal unit vectors M->A and M->B
		const lenMA = Math.hypot(A.x - M.x, A.y - M.y) || 1;
		const lenMB = Math.hypot(B.x - M.x, B.y - M.y) || 1;
		const ux = (A.x - M.x) / lenMA;
		const uy = (A.y - M.y) / lenMA;
		const vx = (B.x - M.x) / lenMB;
		const vy = (B.y - M.y) / lenMB;
		const sq = 9;
		const p1 = { x: M.x + sq * ux, y: M.y + sq * uy };
		const p2 = { x: M.x + sq * (ux + vx), y: M.y + sq * (uy + vy) };
		const p3 = { x: M.x + sq * vx, y: M.y + sq * vy };
		parts.push(
			`<polyline points="${p1.x.toFixed(1)},${p1.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)} ${p3.x.toFixed(1)},${p3.y.toFixed(1)}" fill="none" stroke="#dc2626" stroke-width="1.4"/>`
		);

		// Central angle arc AOM
		const arcR = 20;
		const arcStart = ptOnCircle(0, arcR);
		const arcEnd = ptOnCircle(opts.thetaDeg, arcR);
		parts.push(
			`<path d="M ${arcStart.x.toFixed(1)} ${arcStart.y.toFixed(1)} A ${arcR} ${arcR} 0 0 0 ${arcEnd.x.toFixed(1)} ${arcEnd.y.toFixed(1)}" fill="none" stroke="#dc2626" stroke-width="2"/>`
		);
		const lblCentral = ptOnCircle(opts.thetaDeg / 2, arcR + 15);
		parts.push(
			`<text x="${lblCentral.x.toFixed(1)}" y="${(lblCentral.y + 4).toFixed(1)}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">${opts.thetaDeg}°</text>`
		);

		const lblM = ptOnCircle(opts.thetaDeg, r + 14);
		parts.push(
			`<circle cx="${cx}" cy="${cy}" r="3.4" fill="#0f172a"/>`,
			`<text x="${cx}" y="${cy + 15}" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">O</text>`,
			`<circle cx="${A.x.toFixed(1)}" cy="${A.y.toFixed(1)}" r="3.5" fill="#0f172a"/>`,
			`<text x="${A.x + 12}" y="${A.y + 4}" font-size="11" font-weight="bold" fill="#0f172a">A</text>`,
			`<circle cx="${B.x.toFixed(1)}" cy="${B.y.toFixed(1)}" r="3.5" fill="#0f172a"/>`,
			`<text x="${B.x - 16}" y="${B.y + 4}" font-size="11" font-weight="bold" fill="#0f172a">B</text>`,
			`<circle cx="${M.x.toFixed(1)}" cy="${M.y.toFixed(1)}" r="3.5" fill="#2563eb"/>`,
			`<text x="${lblM.x.toFixed(1)}" y="${(lblM.y + 4).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="bold" fill="#2563eb">M</text>`,
			`<text x="${cx}" y="${cy + r + 24}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#334155">${escapeXml(opts.diameterLabel)}</text>`
		);
	}

	return wrapLocalSvg(w, h, parts.join(''));
}

function svgSphereSection(opts: {
	showSection: boolean;
	radiusLabel: string;
	dLabel?: string;
	rLabel?: string;
}): string {
	const w = 250;
	const h = 195;
	const cx = 122;
	const cy = 104;
	const R = 70;
	const parts: string[] = [
		`<circle cx="${cx}" cy="${cy}" r="${R}" fill="#eff6ff" fill-opacity="0.65" stroke="#2563eb" stroke-width="2"/>`,
		`<path d="M ${cx - R} ${cy} A ${R} 18 0 0 0 ${cx + R} ${cy}" fill="none" stroke="#2563eb" stroke-width="1.4"/>`,
		`<path d="M ${cx - R} ${cy} A ${R} 18 0 0 1 ${cx + R} ${cy}" fill="none" stroke="#93c5fd" stroke-width="1.2" stroke-dasharray="4 3"/>`
	];

	if (opts.showSection) {
		const dy = 42;
		const hx = cx;
		const hy = cy - dy;
		const rx = Math.sqrt(R * R - dy * dy);
		const mx = cx + rx;
		const my = hy;
		parts.push(
			`<ellipse cx="${hx}" cy="${hy}" rx="${rx.toFixed(1)}" ry="13" fill="#dcfce7" fill-opacity="0.75" stroke="#059669" stroke-width="1.8"/>`,
			`<line x1="${cx}" y1="${cy}" x2="${hx}" y2="${hy}" stroke="#dc2626" stroke-width="1.9"/>`,
			`<line x1="${hx}" y1="${hy}" x2="${mx.toFixed(1)}" y2="${my}" stroke="#059669" stroke-width="2"/>`,
			`<line x1="${cx}" y1="${cy}" x2="${mx.toFixed(1)}" y2="${my}" stroke="#1e40af" stroke-width="1.9"/>`,
			`<polyline points="${hx},${hy + 8} ${hx + 8},${hy + 8} ${hx + 8},${hy}" fill="none" stroke="#dc2626" stroke-width="1.4"/>`,
			`<circle cx="${cx}" cy="${cy}" r="3.2" fill="#0f172a"/>`,
			`<circle cx="${hx}" cy="${hy}" r="3" fill="#dc2626"/>`,
			`<circle cx="${mx.toFixed(1)}" cy="${my}" r="3.2" fill="#059669"/>`,
			`<text x="${cx - 12}" y="${cy + 14}" font-size="11" font-weight="bold" fill="#0f172a">O</text>`,
			`<text x="${hx - 12}" y="${hy + 3}" font-size="11" font-weight="bold" fill="#dc2626">H</text>`,
			`<text x="${(mx + 6).toFixed(1)}" y="${my + 3}" font-size="11" font-weight="bold" fill="#059669">M</text>`,
			`<text x="${cx - 28}" y="${(cy + hy) / 2 + 4}" font-size="10" font-weight="bold" fill="#dc2626">${escapeXml(opts.dLabel || 'd')}</text>`,
			`<text x="${((hx + mx) / 2).toFixed(1)}" y="${hy - 6}" text-anchor="middle" font-size="10" font-weight="bold" fill="#059669">${escapeXml(opts.rLabel || 'r = ?')}</text>`,
			`<text x="${((cx + mx) / 2 + 12).toFixed(1)}" y="${(cy + my) / 2 + 12}" font-size="10" font-weight="bold" fill="#1e40af">${escapeXml(opts.radiusLabel)}</text>`
		);
	} else {
		parts.push(
			`<line x1="${cx}" y1="${cy}" x2="${cx + R}" y2="${cy}" stroke="#dc2626" stroke-width="2"/>`,
			`<circle cx="${cx}" cy="${cy}" r="3.4" fill="#0f172a"/>`,
			`<circle cx="${cx + R}" cy="${cy}" r="3" fill="#dc2626"/>`,
			`<text x="${cx - 11}" y="${cy + 14}" font-size="11" font-weight="bold" fill="#0f172a">O</text>`,
			`<text x="${cx + R / 2}" y="${cy - 8}" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">${escapeXml(opts.radiusLabel)}</text>`
		);
	}

	return wrapLocalSvg(w, h, parts.join(''));
}

function svgPyramidSection(opts: {
	hLabel: string;
	hPrimeLabel: string;
	baseSideLabel: string;
	ratioFraction: number;
}): string {
	const w = 250;
	const h = 195;
	const S = { x: 125, y: 24 };
	const A = { x: 46, y: 156 };
	const B = { x: 158, y: 168 };
	const C = { x: 204, y: 132 };
	const D = { x: 94, y: 122 };
	const H = { x: 125, y: 145 };

	const lerp = (p1: { x: number; y: number }, p2: { x: number; y: number }, t: number) => ({
		x: p1.x + (p2.x - p1.x) * t,
		y: p1.y + (p2.y - p1.y) * t
	});
	const t = Math.min(0.75, Math.max(0.32, opts.ratioFraction));
	const Ap = lerp(S, A, t);
	const Bp = lerp(S, B, t);
	const Cp = lerp(S, C, t);
	const Dp = lerp(S, D, t);
	const Hp = lerp(S, H, t);

	const parts = [
		// Back hidden edges
		`<line x1="${S.x}" y1="${S.y}" x2="${D.x}" y2="${D.y}" stroke="#94a3b8" stroke-width="1.3" stroke-dasharray="4 3"/>`,
		`<line x1="${A.x}" y1="${A.y}" x2="${D.x}" y2="${D.y}" stroke="#94a3b8" stroke-width="1.3" stroke-dasharray="4 3"/>`,
		`<line x1="${C.x}" y1="${C.y}" x2="${D.x}" y2="${D.y}" stroke="#94a3b8" stroke-width="1.3" stroke-dasharray="4 3"/>`,
		// Base front edges
		`<polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}" fill="#eff6ff" fill-opacity="0.5" stroke="#2563eb" stroke-width="1.8"/>`,
		// Visible pyramid edges
		`<line x1="${S.x}" y1="${S.y}" x2="${A.x}" y2="${A.y}" stroke="#1e293b" stroke-width="1.8"/>`,
		`<line x1="${S.x}" y1="${S.y}" x2="${B.x}" y2="${B.y}" stroke="#1e293b" stroke-width="1.8"/>`,
		`<line x1="${S.x}" y1="${S.y}" x2="${C.x}" y2="${C.y}" stroke="#1e293b" stroke-width="1.8"/>`,
		// Cut section square
		`<polygon points="${Ap.x.toFixed(1)},${Ap.y.toFixed(1)} ${Bp.x.toFixed(1)},${Bp.y.toFixed(1)} ${Cp.x.toFixed(1)},${Cp.y.toFixed(1)} ${Dp.x.toFixed(1)},${Dp.y.toFixed(1)}" fill="#bbf7d0" fill-opacity="0.75" stroke="#059669" stroke-width="1.8"/>`,
		// Height line
		`<line x1="${S.x}" y1="${S.y}" x2="${H.x}" y2="${H.y}" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="4 3"/>`,
		`<circle cx="${S.x}" cy="${S.y}" r="3" fill="#0f172a"/>`,
		`<circle cx="${Hp.x.toFixed(1)}" cy="${Hp.y.toFixed(1)}" r="2.8" fill="#059669"/>`,
		`<circle cx="${H.x}" cy="${H.y}" r="2.8" fill="#dc2626"/>`,
		`<text x="${S.x}" y="${S.y - 7}" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">S</text>`,
		`<text x="${A.x - 10}" y="${A.y + 12}" font-size="10.5" font-weight="bold" fill="#0f172a">A</text>`,
		`<text x="${B.x + 4}" y="${B.y + 13}" font-size="10.5" font-weight="bold" fill="#0f172a">B</text>`,
		`<text x="${C.x + 6}" y="${C.y + 4}" font-size="10.5" font-weight="bold" fill="#0f172a">C</text>`,
		`<text x="12" y="42" font-size="10" font-weight="bold" fill="#059669">${escapeXml(opts.hPrimeLabel)}</text>`,
		`<text x="12" y="58" font-size="10" font-weight="bold" fill="#dc2626">${escapeXml(opts.hLabel)}</text>`,
		`<text x="${(A.x + B.x) / 2 - 4}" y="${B.y + 18}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e40af">${escapeXml(opts.baseSideLabel)}</text>`
	];

	return wrapLocalSvg(w, h, parts.join(''));
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Numeric: 2x2 Linear Systems Solving (Substitution, Elimination & Word Problem)
// ═══════════════════════════════════════════════════════════════════════════════

const linearSystemsTemplate: ParameterizedTemplate = {
	id: '4am_t3_linear_systems',
	grade: '4am',
	trimesterId: 't3',
	domain: 'numeric',
	titleAr: 'جملة معادلتين من الدرجة الأولى بمجهولين والترييض',
	curriculumLessonId: 'lesson_4am_t3_linear_systems_substitution_elimination',
	defaultPoints: 3,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 1, difficulty);

		if (difficulty === 'easy') {
			const x0 = rng.int(4, 14);
			let y0 = rng.int(2, 11);
			if (y0 === x0) y0 = x0 + 1;

			const b1 = rng.pick([2, 3, 4]);
			const a2 = rng.pick([2, 3]);
			const b2Pool = [1, 2, 3, 4, 5].filter((v) => v !== a2 * b1);
			const b2 = rng.pick(b2Pool);

			const c1 = x0 + b1 * y0;
			const c2 = a2 * x0 + b2 * y0;

			// Test pair satisfies eq1 only: x_t = x0 + b1, y_t = y0 - 1
			const xt = x0 + b1;
			const yt = y0 - 1;
			const checkEq2Test = a2 * xt + b2 * yt;

			const eq1Str = fmtLinearEq(1, b1, c1);
			const eq2Str = fmtLinearEq(a2, b2, c2);

			const contexts = [
				{
					intro: `في مخبزة، يتطلب صنع علبة كبيرة $x$ كغ من الدقيق وصنع علبة صغيرة $y$ كغ. تستهلك طلبية أولى علبة كبيرة و $${b1}$ علب صغيرة بمجموع $${c1}$ كغ، وتستهلك طلبية ثانية $${a2}$ علب كبيرة و ${b2 === 1 ? 'علبة صغيرة واحدة' : `$${b2}$ علب صغيرة`} بمجموع $${c2}$ كغ.`,
					ask: 'أوجد كتلة الدقيق $x$ في العلبة الكبيرة والكتلة $y$ في العلبة الصغيرة.',
					unit: 'كغ'
				},
				{
					intro: `في قاعة عرض، سجل منظم بيع تذكرة كبار (بسعر $x$ عشرات دنانير) و $${b1}$ تذاكر صغار (بسعر $y$ عشرات دنانير) بمجموع $${c1}$ وحدة نقدية، بينما بيعت في الفترة الثانية $${a2}$ تذاكر كبار و ${b2 === 1 ? 'تذكرة صغار واحدة' : `$${b2}$ تذاكر صغار`} بمجموع $${c2}$ وحدة نقدية.`,
					ask: 'أوجد قيمة كل من $x$ و $y$.',
					unit: 'وحدة'
				}
			];
			const ctx = rng.pick(contexts);

			const mcq = buildUniqueMcqOptions(
				`$(${x0} ; ${y0})$`,
				[
					{
						text: `$(${y0} ; ${x0})$`,
						diagnosticFeedback: 'عكست ترتيب الثنائية! نكتب دوماً $(x ; y)$ بحيث $x$ أولاً و$y$ ثانياً.'
					},
					{
						text: `$(${xt} ; ${yt})$`,
						diagnosticFeedback: `الثنائية $(${xt} ; ${yt})$ تحقق المعادلة الأولى فقط ($${xt} + ${b1}(${yt}) = ${c1}$) ولا تحقق المعادلة الثانية!`
					},
					{
						text: `$(${x0 + 2} ; ${Math.max(1, y0 - 1)})$`,
						diagnosticFeedback: 'راجع خطوة التعويض والحساب عند عزل $x = c_1 - b_1 y$.'
					}
				],
				rng
			);

			const coeffYSub = b2 - a2 * b1;
			const rhsSub = c2 - a2 * c1;
			const qText = `ما هو حل جملة المعادلتين:\n\n$$\\begin{cases} ${eq1Str} \\\\ ${eq2Str} \\end{cases}$$`;

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: `ما هو حل جملة المعادلتين $\\begin{cases} ${eq1Str} \\\\ ${eq2Str} \\end{cases}$؟`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `من المعادلة (1): $x = ${c1} - ${b1}y$. نعوّض في (2): $${a2}(${c1} - ${b1}y) + ${b2}y = ${c2} \\implies ${coeffYSub}y = ${rhsSub} \\implies y = ${y0}$، ومنه $x = ${c1} - ${b1}(${y0}) = ${x0}$. الحل هو $(${x0} ; ${y0})$.`
				},
				sujetExercise: {
					points: 3,
					instruction: 'لتكن جملة المعادلتين $(S)$ الآتية:',
					content: [
						{
							type: 'text',
							content: `المعادلة (1): $${eq1Str}$\n\nالمعادلة (2): $${eq2Str}$`
						},
						{
							type: 'text',
							content: `1) هل الثنائية $(${xt} ; ${yt})$ حلٌّ للجملة $(S)$؟ علّل إجابتك.`,
							answer: `1) نختبر $(${xt} ; ${yt})$:\n\nفي (1): $${xt} + ${b1} times ${yt} = ${c1}$ (محققة).\n\nفي (2): $${a2} times ${xt} + ${b2} times ${yt} = ${checkEq2Test} != ${c2}$ (غير محققة). إذن الثنائية $(${xt} ; ${yt})$ ليست حلاً للجملة $(S)$.`,
							mark: '0.5'
						},
						{
							type: 'text',
							content: '2) حل الجملة $(S)$ جبرياً بطريقة التعويض.',
							answer: `2) من (1) نكتب: $x = ${c1} - ${b1}y$. نعوّض في (2):\n\n$${a2}(${c1} - ${b1}y) + ${b2}y = ${c2}$\n\n$${a2 * c1} - ${a2 * b1}y + ${b2}y = ${c2}$\n\n$${coeffYSub}y = ${rhsSub}$ ومنه $y = ${y0}$.\n\nنعوّض $y = ${y0}$ فنجد: $x = ${c1} - ${b1} times ${y0} = ${x0}$.\n\nإذن حل الجملة $(S)$ هو الثنائية $(${x0} ; ${y0})$.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `3) ${ctx.intro} ${ctx.ask}`,
							answer: `3) بترييض المسألة نتحصل على نفس الجملة $(S)$، ومنه $x = ${x0}$ ${ctx.unit} و $y = ${y0}$ ${ctx.unit}.`,
							mark: '1'
						}
					]
				},
				hints: [
					'لكي تكون ثنائية حلاً لجملة معادلتين، يجب أن تحقق المعادلتين معاً في آن واحد.',
					`في طريقة التعويض، استخرج $x = ${c1} - ${b1}y$ من المعادلة (1) ثم عوّضه في المعادلة (2).`,
					'بعد إيجاد قيمة $y$، ارجع إلى عبارة $x$ لحسابها ولا تنسَ كتابة الثنائية بالترتيب $(x ; y)$.'
				],
				solutionStepsAr: [
					`نختبر الثنائية $(${xt} ; ${yt})$: تحقق (1) لكنها في (2) تعطي $${checkEq2Test} \\neq ${c2}$ فهي ليست حلاً.`,
					`من المعادلة (1): $x = ${c1} - ${b1}y$.`,
					`بالتعويض في (2): $${coeffYSub}y = ${rhsSub} \\implies y = ${y0}$ ثم $x = ${x0}$.`,
					`حل الجملة هو الثنائية $(${x0} ; ${y0})$، وهو حل المشكلة المطروحة.`
				],
				finalAnswer: `(${x0} ; ${y0})`
			};
		}

		if (difficulty === 'medium') {
			// Elimination (طريقة الجمع) with realistic DA ticket/stationery prices
			const coeffSets: [number, number, number, number][] = [
				[2, 3, 4, 5],
				[3, 2, 2, 5],
				[2, 3, 3, 4],
				[3, 4, 2, 3],
				[4, 3, 2, 5]
			];
			const [a1, b1, a2, b2] = rng.pick(coeffSets);
			const x0 = rng.priceDA(100, 350, 50);
			let y0 = rng.priceDA(40, 140, 20);
			if (y0 === x0) y0 += 20;

			const c1 = a1 * x0 + b1 * y0;
			const c2 = a2 * x0 + b2 * y0;
			const eq1Str = fmtLinearEq(a1, b1, c1);
			const eq2Str = fmtLinearEq(a2, b2, c2);

			// Word problem uses 2 * Eq1 & Eq2 (or direct Eq1 & Eq2)
			const scale = 2;
			const scA1 = scale * a1;
			const scB1 = scale * b1;
			const scC1 = scale * c1;

			// Elimination by multiplying (1) by a2 and (2) by -a1
			const elimYCoeff = a2 * b1 - a1 * b2;
			const elimRhs = a2 * c1 - a1 * c2;

			const scenarios = [
				{
					text: `اشترى صاحب مكتبة في الدفعة الأولى $${scA1}$ كراساً و $${scB1}$ قلماً بمبلغ $${scC1}$ دج، وفي الدفعة الثانية $${a2}$ كراريس و $${b2}$ أقلام من نفس النوع بمبلغ $${c2}$ دج. ما ثمن الكراس الواحد وثمن القلم الواحد؟`,
					textKaTeX: `اشترى مكتبي $${scA1}$ كراساً و$${scB1}$ قلماً بمبلغ $${scC1}\\text{ DA}$، ثم اشترى $${a2}$ كراريس و$${b2}$ أقلام بمبلغ $${c2}\\text{ DA}$. ما ثمن الكراس الواحد $x$ وثمن القلم الواحد $y$؟`
				},
				{
					text: `دخلت عائلة أولى تضم $${scA1}$ كبار و $${scB1}$ صغار إلى حديقة فدفعت $${scC1}$ دج، ودفعت عائلة ثانية تضم $${a2}$ كبار و $${b2}$ صغار مبلغ $${c2}$ دج. أوجد سعر تذكرة الكبار وسعر تذكرة الصغار.`,
					textKaTeX: `دفعت عائلة تضم $${scA1}$ كبار و$${scB1}$ صغار مبلغ $${scC1}\\text{ DA}$، ودفعت عائلة أخرى تضم $${a2}$ كبار و$${b2}$ صغار مبلغ $${c2}\\text{ DA}$. ما سعر تذكرة الكبار $x$ وتذكرة الصغار $y$؟`
				}
			];
			const sc = rng.pick(scenarios);

			const mcq = buildUniqueMcqOptions(
				`$x = ${x0}\\text{ DA}$ و $y = ${y0}\\text{ DA}$`,
				[
					{
						text: `$x = ${y0}\\text{ DA}$ و $y = ${x0}\\text{ DA}$`,
						diagnosticFeedback: 'عكست بين المجهولين $x$ و$y$ عند استنتاج الثمنين!'
					},
					{
						text: `$x = ${x0 + 50}\\text{ DA}$ و $y = ${Math.max(10, y0 - 20)}\\text{ DA}$`,
						diagnosticFeedback: 'تأكد من ضرب الطرف الثاني للمعادلة أيضاً عند توحيد المعاملات في طريقة الجمع.'
					},
					{
						text: `$x = ${x0 * 2}\\text{ DA}$ و $y = ${y0}\\text{ DA}$`,
						diagnosticFeedback: 'لم تقسم المعادلة الأولى للوضعية على $2$ للربط مع الجملة $(S)$.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: sc.textKaTeX,
					questionTextAr: sc.textKaTeX,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `تترجم الوضعية إلى $\\begin{cases} ${scA1}x + ${scB1}y = ${scC1} \\\\ ${eq2Str} \\end{cases}$، وبقسمة المعادلة الأولى على $2$ نحصل على $\\begin{cases} ${eq1Str} \\\\ ${eq2Str} \\end{cases}$. بطريقة الجمع نحذف $x$: $(${a2 * b1 - a1 * b2})y = ${elimRhs} \\implies y = ${y0}\\text{ DA}$، ثم $x = ${x0}\\text{ DA}$.`
				},
				sujetExercise: {
					points: 3,
					instruction: 'يتكون هذا التمرين من جزأين مرتبطين:',
					content: [
						{
							type: 'text',
							content: `1) حل جملة المعادلتين الآتية جبرياً بطريقة الجمع:\n\nالمعادلة (1): $${eq1Str}$\n\nالمعادلة (2): $${eq2Str}$`,
							answer: `1) نضرب طرفي المعادلة (1) في $${a2}$ وطرفي المعادلة (2) في $-${a1}$ لنحذف $x$:\n\n$${a2 * a1}x + ${a2 * b1}y = ${a2 * c1}$ و $-${a1 * a2}x - ${a1 * b2}y = -${a1 * c2}$.\n\nبالجمع طرفاً لطرف: $(${elimYCoeff})y = ${elimRhs}$ ومنه $y = ${y0}$.\n\nنعوّض $y = ${y0}$ في (1): $${a1}x + ${b1} times ${y0} = ${c1}$ أي $${a1}x = ${a1 * x0}$ ومنه $x = ${x0}$.\n\nإذن حل الجملة هو الثنائية $(${x0} ; ${y0})$.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `2) ${sc.text}`,
							answer: `2) نرمز للنوع الأول بـ $x$ وللنوع الثاني بـ $y$، فنكتب:\n\n$${scA1}x + ${scB1}y = ${scC1}$ و $${eq2Str}$.\n\nبقسمة المعادلة الأولى على $2$ نعود إلى الجملة السابقة تماماً، ومنه $x = ${x0}$ دج و $y = ${y0}$ دج.`,
							mark: '1.5'
						}
					]
				},
				hints: [
					`في طريقة الجمع، اضرب المعادلة (1) في $${a2}$ والمعادلة (2) في $-${a1}$ لتصبح معاملا $x$ متعاكسين.`,
					'لا تنسَ ضرب الطرف الأيمن أيضاً عند ضرب أي معادلة في عدد غير معدوم.',
					'في السؤال الثاني، لاحظ أن قسمة المعادلة الأولى على $2$ تعيدك مباشرة إلى الجملة المحلولة في السؤال الأول.'
				],
				solutionStepsAr: [
					`نضرب المعادلة (1) في $${a2}$ والمعادلة (2) في $-${a1}$ ثم نجمع طرفاً لطرف لحذف $x$.`,
					`نجد $(${elimYCoeff})y = ${elimRhs} \\implies y = ${y0}$.`,
					`بالتعويض في (1) نجد $${a1}x = ${a1 * x0} \\implies x = ${x0}$.`,
					`تُختزل الوضعية بقسمة معادلتها الأولى على $2$ إلى نفس الجملة، إذن $x = ${x0}\\text{ DA}$ و $y = ${y0}\\text{ DA}$.`
				],
				finalAnswer: `(${x0} ; ${y0})`
			};
		}

		// Hard: Algebraic signed system + Rectangle perimeter/dimensions word problem
		const xSys = rng.int(2, 6);
		const ySys = -rng.int(2, 5); // Negative y for algebraic challenge
		const pA1 = rng.pick([2, 3, 4]);
		const pB1 = -rng.pick([2, 3]);
		const pA2 = rng.pick([3, 5]);
		const pB2 = rng.pick([2, 4]);
		const pC1 = pA1 * xSys + pB1 * ySys;
		const pC2 = pA2 * xSys + pB2 * ySys;

		const sysEq1 = fmtLinearEq(pA1, pB1, pC1);
		const sysEq2 = fmtLinearEq(pA2, pB2, pC2);

		// Part 2: Rectangle length L > width W
		const W = rng.int(6, 14);
		const diff = rng.int(3, 8);
		const L = W + diff;
		const halfP = L + W;
		const P = 2 * halfP;
		const area = L * W;

		const mcq = buildUniqueMcqOptions(
			`$L = ${L}\\text{ cm}$ و $\\ell = ${W}\\text{ cm}$`,
			[
				{
					text: `$L = ${W}\\text{ cm}$ و $\\ell = ${L}\\text{ cm}$`,
					diagnosticFeedback: 'الطول $L$ أكبر من العرض $\\ell$ ($L - \\ell = ' + diff + '$).'
				},
				{
					text: `$L = ${Math.round((P + diff) / 2)}\\text{ cm}$ و $\\ell = ${Math.round((P - diff) / 2)}\\text{ cm}$`,
					diagnosticFeedback: `انتبه! المحيط هو $2(L + \\ell) = ${P}$، إذن نصف المحيط $L + \\ell = ${halfP}$ وليس ${P}!`
				},
				{
					text: `$L = ${L + 2}\\text{ cm}$ و $\\ell = ${W - 2}\\text{ cm}$`,
					diagnosticFeedback: 'تحقق من الفرق $L - \\ell$: يجب أن يساوي $' + diff + '\\text{ cm}$ تماماً.'
				}
			],
			rng
		);

		const qText = `محيط مستطيل يساوي $${P}\\text{ cm}$، وطوله $L$ يزيد عن عرضه $\\ell$ بـ $${diff}\\text{ cm}$. ما هما بُعدا هذا المستطيل؟`;

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نكتب الجملة $\\begin{cases} 2(L + \\ell) = ${P} \\\\ L - \\ell = ${diff} \\end{cases}$ أي $\\begin{cases} L + \\ell = ${halfP} \\\\ L - \\ell = ${diff} \\end{cases}$. بالجمع: $2L = ${halfP + diff} \\implies L = ${L}\\text{ cm}$ و$\\ell = ${halfP} - ${L} = ${W}\\text{ cm}$.`
			},
			sujetExercise: {
				points: 3,
				instruction: 'أجب عن الجزأين الآتيين مع إبراز خطوات الحل:',
				content: [
					{
						type: 'text',
						content: `1) حل بطريقة الجمع الجملة الآتية:\n\nالمعادلة (1): $${sysEq1}$\n\nالمعادلة (2): $${sysEq2}$`,
						answer: `1) نضرب (1) في $${pB2}$ و(2) في $${-pB1}$ لنحصل على معاملَي $y$ متعاكسين ($${pB1 * pB2}y$ و $+${-pB1 * pB2}y$):\n\nبالجمع نجد: $(${pA1 * pB2 - pA2 * pB1})x = ${pC1 * pB2 - pC2 * pB1}$ ومنه $x = ${xSys}$.\n\nبالتعويض في (2): $${pA2} times ${xSys} + ${pB2}y = ${pC2}$ أي $${pB2}y = ${pC2 - pA2 * xSys}$ ومنه $y = ${ySys}$.\n\nحل الجملة هو $(${xSys} ; ${ySys})$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) مستطيل محيطه $${P}$ سم وطوله $L$ يزيد عن عرضه $l$ بـ $${diff}$ سم. اكتب جملة معادلتين توافق الوضعية، ثم احسب بعدي المستطيل ومساحته.`,
						answer: `2) الجملة: $2(L + l) = ${P}$ (أي $L + l = ${halfP}$) و $L - l = ${diff}$.\n\nبجمع المعادلتين: $2L = ${halfP + diff}$ ومنه $L = ${L}$ سم و $l = ${halfP} - ${L} = ${W}$ سم.\n\nالمساحة: $S = ${L} times ${W} = ${area}$ سم².`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'في الجملة الأولى، انتبه لإشارات الأعداد السالبة عند ضرب المعادلة والتعويض.',
				`في مسألة المستطيل، المحيط $P = 2(L + \\ell) = ${P}$ يعطي أولاً نصف المحيط $L + \\ell = ${halfP}$.`,
				`اجمع المعادلتين $L + \\ell = ${halfP}$ و$L - \\ell = ${diff}$ طرفاً لطرف لحذف $\\ell$ مباشرة.`
			],
			solutionStepsAr: [
				`في الجملة (1)-(2): بتوحيد معاملي $y$ والجمع نحصل على $x = ${xSys}$ ثم $y = ${ySys}$، فالحل $(${xSys} ; ${ySys})$.`,
				`في المستطيل: $2(L + \\ell) = ${P} \\implies L + \\ell = ${halfP}$، ومع $L - \\ell = ${diff}$ بالجمع نجد $2L = ${halfP + diff} \\implies L = ${L}\\text{ cm}$.`,
				`نعوّض فنجد $\\ell = ${W}\\text{ cm}$، والمساحة $S = ${L} \\times ${W} = ${area}\\text{ cm}^2$.`
			],
			finalAnswer: `(${xSys} ; ${ySys}) | L=${L}, l=${W}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Proportionality: Linear & Affine Functions + Intersection (svgCartesianPlane)
// ═══════════════════════════════════════════════════════════════════════════════

const linearAffineFunctionsTemplate: ParameterizedTemplate = {
	id: '4am_t3_linear_affine_functions',
	grade: '4am',
	trimesterId: 't3',
	domain: 'proportionality',
	titleAr: 'الدالة الخطية والدالة التآلفية والتمثيل البياني',
	curriculumLessonId: 'lesson_4am_t3_affine_functions_graphs_modeling',
	defaultPoints: 3,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 2, difficulty);

		// Pick integer intersection I(x0, y0) with f(x) = a1*x and g(x) = a2*x + b2
		let a1: number;
		let a2: number;
		let x0: number;

		if (difficulty === 'easy') {
			a1 = rng.pick([2, 3]);
			a2 = rng.pick([1, -1]);
			x0 = rng.pick([1, 2, 3]);
		} else if (difficulty === 'medium') {
			a1 = rng.pick([-2, -1, 2, 3]);
			const a2Pool = [-2, -1, 1, 2].filter((v) => v !== a1);
			a2 = rng.pick(a2Pool);
			x0 = rng.pick([-2, -1, 1, 2, 3]);
		} else {
			a1 = rng.pick([2, 3, -2]);
			const a2Pool = [-2, -1, 1].filter((v) => v !== a1);
			a2 = rng.pick(a2Pool);
			x0 = rng.pick([-2, 1, 2, 3]);
		}

		const y0 = a1 * x0;
		const b2 = y0 - a2 * x0; // Guaranteed non-zero since a1 != a2 and x0 != 0

		const fExpr = fmtAffineExpr(a1, 0);
		const gExpr = fmtAffineExpr(a2, b2);

		const bounds = computeCartesianBounds(
			[
				{ a: a1, b: 0 },
				{ a: a2, b: b2 }
			],
			[
				{ x: 0, y: 0 },
				{ x: 0, y: b2 },
				{ x: x0, y: y0 }
			]
		);

		const svg = svgCartesianPlane({
			...bounds,
			lines: [
				{ a: a1, b: 0, label: '(df)', color: '#2563eb' },
				{ a: a2, b: b2, label: '(dg)', color: '#059669' }
			],
			points: [
				{ x: x0, y: y0, label: 'I', color: '#dc2626' },
				{ x: 0, y: b2, label: 'B', color: '#059669' }
			]
		});
		const svgPath = saveSvgAsset(`4am_t3_func_${difficulty}_s${seed}`, svg);

		if (difficulty === 'easy') {
			const xGivenF = rng.pick([2, 3]);
			const yGivenF = a1 * xGivenF;
			const xGivenG = rng.pick([2, 3]);
			const yGivenG = a2 * xGivenG + b2;
			const xEval = 4;
			const yEvalF = a1 * xEval;
			const xPreG = rng.pick([-1, 4]);
			const yPreG = a2 * xPreG + b2;

			const mcq = buildUniqueMcqOptions(
				`$I(${x0} ; ${y0})$`,
				[
					{
						text: `$I(${y0} ; ${x0})$`,
						diagnosticFeedback: 'عكست ترتيب الإحداثيين! نكتب دوماً (الفاصلة $x$ ; الترتيب $y$).'
					},
					{
						text: `$I(0 ; ${b2})$`,
						diagnosticFeedback: `النقطة $(0 ; ${b2})$ هي تقاطع المستقيم $(d_g)$ مع محور التراتيب وليست تقاطع المستقيمين $(d_f)$ و$(d_g)$.`
					},
					{
						text: `$I(${x0 + 1} ; ${a1 * (x0 + 1)})$`,
						diagnosticFeedback: `تحقق من حل المعادلة $${fExpr} = ${gExpr}$؛ عند $x = ${x0 + 1}$ تتساوى القيمتان أم لا؟`
					}
				],
				rng
			);

			const qText = `لتكن الدالة الخطية $f(x) = ${fExpr}$ والدالة التآلفية $g(x) = ${gExpr}$. ما هما إحداثيا نقطة تقاطع تمثيليهما البيانيين $(d_f)$ و$(d_g)$؟`;

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: 'التمثيل البياني للدالتين (df) و (dg)',
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `نحل المعادلة $f(x) = g(x)$ أي $${fExpr} = ${gExpr} \\implies (${a1 - a2})x = ${b2} \\implies x = ${x0}$، ثم $f(${x0}) = ${y0}$. إذن نقطة التقاطع هي $I(${x0} ; ${y0})$.`
				},
				sujetExercise: {
					points: 3,
					instruction: `في المعلم المتعامد والمتجانس المرفق، يمثل $(d_f)$ الدالة الخطية $f$ بحيث $f(${xGivenF}) = ${yGivenF}$، ويمثل $(d_g)$ الدالة التآلفية $g$ بحيث $g(0) = ${b2}$ و $g(${xGivenG}) = ${yGivenG}$.`,
					content: [
						{
							type: 'columns',
							widths: ['1.35fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) عيّن العبارة الجبرية لكل من $f(x)$ و $g(x)$.\n\n2) احسب $f(${xEval})$ ثم أوجد العدد الذي صورته بالدالة $g$ هي $${yPreG}$.`,
									answer: `1) $f$ خطية: $a_1 = frac(${yGivenF}, ${xGivenF}) = ${a1}$ إذن $f(x) = ${fExpr}$.\n\n$g$ تآلفية: $b = g(0) = ${b2}$ و $a_2 = frac(${yGivenG} - (${b2}), ${xGivenG} - 0) = ${a2}$ إذن $g(x) = ${gExpr}$.\n\n2) $f(${xEval}) = ${a1} times ${xEval} = ${yEvalF}$.\n\nنحل $g(x) = ${yPreG}$: $${gExpr} = ${yPreG}$ ومنه $x = ${xPreG}$.`,
									mark: '2'
								},
								{
									type: 'image',
									src: svgPath,
									caption: 'المستقيمان (df) و (dg)'
								}
							]
						},
						{
							type: 'text',
							content: `3) حل المعادلة $f(x) = g(x)$، ثم استنتج إحداثيي نقطة التقاطع $I$ الظاهرة على البيان.`,
							answer: `3) $${fExpr} = ${gExpr}$ ومنه $(${a1 - a2})x = ${b2}$ أي $x = ${x0}$، و $y = f(${x0}) = ${y0}$. إذن $I(${x0} ; ${y0})$.`,
							mark: '1'
						}
					]
				},
				hints: [
					'لإيجاد معامل الدالة الخطية $f(x) = ax$ نقسم الصورة على العدد: $a = \\frac{f(x)}{x}$.',
					'في الدالة التآلفية $g(x) = ax + b$، الترتيب عند المبدأ هو $b = g(0)$، ومعامل التوجيه $a = \\frac{g(x) - g(0)}{x}$.',
					'إحداثيا نقطة التقاطع $I(x_0 ; y_0)$ يحققان $f(x_0) = g(x_0) = y_0$.'
				],
				solutionStepsAr: [
					`معامل الدالة الخطية $f$: $a_1 = \\frac{${yGivenF}}{${xGivenF}} = ${a1} \\implies f(x) = ${fExpr}$.`,
					`الدالة التآلفية $g$: $b = ${b2}$ و$a_2 = \\frac{${yGivenG} - (${b2})}{${xGivenG}} = ${a2} \\implies g(x) = ${gExpr}$.`,
					`نحل $f(x) = g(x)$ فنجد $x_0 = ${x0}$ و$y_0 = ${y0}$، إذن $I(${x0} ; ${y0})$.`
				],
				finalAnswer: `f(x)=${fExpr}, g(x)=${gExpr}, I(${x0};${y0})`
			};
		}

		if (difficulty === 'medium') {
			const xGivenF = rng.pick([-2, 2, 3]);
			const yGivenF = a1 * xGivenF;
			const p = rng.pick([-2, -1]);
			const q = rng.pick([1, 2, 3]);
			const gp = a2 * p + b2;
			const gq = a2 * q + b2;

			// Test point A belonging to (dg)? Make it NOT belong on half the seeds, or belong!
			const xA = rng.pick([3, 4]);
			const yAExpected = a2 * xA + b2;
			const belongs = seed % 2 === 1;
			const yA = belongs ? yAExpected : yAExpected + 2;

			const wrongSwappedFrac = fmtAffineExpr(a2, -b2);
			const wrongDenom = fmtAffineExpr(-a2, gp - (-a2) * p);
			const wrongB = fmtAffineExpr(a2, b2 + (a2 > 0 ? 2 : -2));

			const mcq = buildUniqueMcqOptions(
				`$g(x) = ${gExpr}$`,
				[
					{
						text: `$g(x) = ${wrongSwappedFrac}$`,
						diagnosticFeedback: 'تحقق من إشارة الترتيب عند المبدأ $b = g(p) - a \\cdot p$!'
					},
					{
						text: `$g(x) = ${wrongDenom}$`,
						diagnosticFeedback: 'انتبه لترتيب الطرح في معامل التوجيه $a = \\frac{g(q) - g(p)}{q - p}$: يجب حفظ نفس الترتيب في البسط والمقام!'
					},
					{
						text: `$g(x) = ${wrongB}$`,
						diagnosticFeedback: 'معامل التوجيه $a$ صحيح، لكن أخطأت عند تعويض النقطة لإيجاد $b$.'
					}
				],
				rng
			);

			const qText = `$g$ دالة تآلفية تحقق $g(${p}) = ${gp}$ و $g(${q}) = ${gq}$. ما هي العبارة الجبرية للدالة $g$؟`;

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `باستعمال تناسبية التزايدات: $a = \\frac{g(${q}) - g(${p})}{${q} - (${p})} = \\frac{${gq - gp}}{${q - p}} = ${a2}$، ثم $b = g(${q}) - ${a2}(${q}) = ${b2}$. إذن $g(x) = ${gExpr}$.`
				},
				sujetExercise: {
					points: 3,
					instruction: `لتكن $f$ دالة خطية بحيث $f(${xGivenF}) = ${yGivenF}$، و $g$ دالة تآلفية بحيث $g(${p}) = ${gp}$ و $g(${q}) = ${gq}$.`,
					content: [
						{
							type: 'columns',
							widths: ['1.35fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) عيّن العبارة الجبرية للدالتين $f$ و $g$.\n\n2) هل النقطة $A(${xA} ; ${yA})$ تنتمي إلى التمثيل البياني $(d_g)$؟ علّل.`,
									answer: `1) $f$ خطية: $a_1 = frac(${yGivenF}, ${xGivenF}) = ${a1}$ ومنه $f(x) = ${fExpr}$.\n\n$g$ تآلفية: $a_2 = frac(${gq} - (${gp}), ${q} - (${p})) = frac(${gq - gp}, ${q - p}) = ${a2}$، و $b = ${gq} - (${a2}) times (${q}) = ${b2}$، إذن $g(x) = ${gExpr}$.\n\n2) نحسب $g(${xA}) = ${a2} times ${xA} + (${b2}) = ${yAExpected}$. ${belongs ? `بما أن $g(${xA}) = ${yA}$ فإن $A$ تنتمي إلى $(d_g)$.` : `بما أن $g(${xA}) = ${yAExpected} != ${yA}$ فإن $A$ لا تنتمي إلى $(d_g)$.`}`,
									mark: '1.5'
								},
								{
									type: 'image',
									src: svgPath,
									caption: 'التمثيل البياني لـ (df) و (dg)'
								}
							]
						},
						{
							type: 'text',
							content: `3) احسب إحداثيي نقطة تقاطع المستقيمين $(d_f)$ و $(d_g)$ جبرياً، وتحقق من القراءة على البيان المرفق.`,
							answer: `3) نحل $f(x) = g(x)$ أي $${fExpr} = ${gExpr}$ فنجد $(${a1 - a2})x = ${b2}$ أي $x = ${x0}$، و $y = f(${x0}) = ${y0}$. نقطة التقاطع هي $I(${x0} ; ${y0})$.`,
							mark: '1.5'
						}
					]
				},
				hints: [
					'احسب معامل التوجيه للدالة التآلفية بقانون تناسبية التزايدات: $a = \\frac{g(x_2) - g(x_1)}{x_2 - x_1}$.',
					`للتحقق من انتماء $A(${xA} ; ${yA})$ إلى $(d_g)$، احسب $g(${xA})$ وقارنه بالترتيب ${yA}.`,
					'نقطة تقاطع $(d_f)$ و $(d_g)$ توافق الحل المشترك للمعادلة $f(x) = g(x)$.'
				],
				solutionStepsAr: [
					`نجد $f(x) = ${fExpr}$ من النسبة $\\frac{${yGivenF}}{${xGivenF}} = ${a1}$.`,
					`نجد معامل توجيه $g$: $a_2 = \\frac{${gq - gp}}{${q - p}} = ${a2}$ ثم $b = ${b2}$، أي $g(x) = ${gExpr}$.`,
					`التحقق من النقطة $A$: ${belongs ? `$g(${xA}) = ${yAExpected} = ${yA}$ (تنتمي)` : `$g(${xA}) = ${yAExpected} \\neq ${yA}$ (لا تنتمي)`}.`,
					`التقاطع عند $f(x) = g(x)$ يعطي $I(${x0} ; ${y0})$.`
				],
				finalAnswer: `g(x)=${gExpr}, I(${x0};${y0})`
			};
		}

		// Hard: Graphical reading + inequality f(x) <= g(x) + graphical solution of system
		const xPtF = x0 !== 1 ? 1 : 2;
		const yPtF = a1 * xPtF;
		const ineqSign = a1 - a2 > 0 ? '\\le' : '\\ge';
		const ineqSignTypst = a1 - a2 > 0 ? '<=' : '>=';

		const mcq = buildUniqueMcqOptions(
			`$(${x0} ; ${y0})$`,
			[
				{
					text: `$(${y0} ; ${x0})$`,
					diagnosticFeedback: 'عكست الفاصلة $x$ والترتيب $y$ في إحداثيي نقطة التقاطع $I$.'
				},
				{
					text: `$(0 ; ${b2})$`,
					diagnosticFeedback: `النقطة $(0 ; ${b2})$ هي تقاطع $(d_g)$ مع محور التراتيب فقط.`
				},
				{
					text: `$(${x0} ; ${b2})$`,
					diagnosticFeedback: 'الفاصلة صحيحة، لكن الترتيب $y_0$ هو قيمة $f(x_0) = g(x_0)$ وليس $b_2$.'
				}
			],
			rng
		);

		const sysLine1 = a1 >= 0 ? `${a1}x - y = 0` : `${-a1}x + y = 0`;
		const sysLine2 = `${a2 === 1 ? '' : a2 === -1 ? '-' : a2}x - y = ${-b2}`;
		const qText = `في المعلم المقابل، يمثل المستقيمان $(d_f)$ و$(d_g)$ الدالتين $f(x) = ${fExpr}$ و$g(x) = ${gExpr}$. ما هو الحل البياني لجملة المعادلتين $\\begin{cases} y = ${fExpr} \\\\ y = ${gExpr} \\end{cases}$؟`;

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: 'الحل البياني لجملة معادلتين عند نقطة التقاطع I',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الحل البياني للجملة هو إحداثيا نقطة تقاطع المستقيمين $(d_f)$ و$(d_g)$ أي النقطة $I(${x0} ; ${y0})$، ونتحقق حسابياً: $f(${x0}) = ${y0}$ و$g(${x0}) = ${y0}$.`
			},
			sujetExercise: {
				points: 3,
				instruction: `يمثل البيان المقابل المستقيم $(d_f)$ المار بالمبدأ $O$ والنقطة $(${xPtF} ; ${yPtF})$، والمستقيم $(d_g)$ المار بالنقطتين $B(0 ; ${b2})$ و $I(${x0} ; ${y0})$.`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) انطلاقاً من البيان، عيّن العبارة الجبرية للدالة الخطية $f$ وللدالة التآلفية $g$.\n\n2) حل المتراجحة $f(x) <= g(x)$ حسابياً ثم فسّر النتيجة بيانياً.`,
								answer: `1) $(d_f)$ يمر بـ $O$ و $(${xPtF} ; ${yPtF})$ إذن $f(x) = ${fExpr}$.\n\n$(d_g)$ يقطع محور التراتيب في $B(0 ; ${b2})$ إذن $b = ${b2}$، ويمر بـ $I(${x0} ; ${y0})$ إذن $a_2 = frac(${y0} - (${b2}), ${x0} - 0) = ${a2}$، ومنه $g(x) = ${gExpr}$.\n\n2) $${fExpr} <= ${gExpr}$ تعطي $(${a1 - a2})x <= ${b2}$، ومنه $x ${ineqSignTypst} ${x0}$ (أي في هذا المجال يقع $(d_f)$ تحت $(d_g)$ أو يتقاطعان).`,
								mark: '2'
							},
							{
								type: 'image',
								src: svgPath,
								caption: 'المستقيمان (df) و (dg) ونقطة التقاطع I'
							}
						]
					},
					{
						type: 'text',
						content: `3) استنتج الحل البياني ثم التحقق الجبري لجملة المعادلتين: $(1) : ${sysLine1}$ و $(2) : ${sysLine2}$.`,
						answer: `3) تؤول المعادلتان إلى $y = ${fExpr}$ و $y = ${gExpr}$، إذن الحل البياني هو إحداثيا نقطة التقاطع $I(${x0} ; ${y0})$، وهو يحقق المعادلتين معاً.`,
						mark: '1'
					}
				]
			},
			hints: [
				'معامل الدالة الخطية هو ترتيب النقطة ذات الفاصلة 1 (أو النسبة $y/x$)، والترتيب عند المبدأ $b$ لـ $g$ يُقرأ عند $x = 0$.',
				`انتبه لاتجاه المتباينة عند القسمة على معامل $x$ (${a1 - a2}) إذا كان سالباً!`,
				'الحل البياني لجملة معادلتين مكتوبتين على الشكل $y = ax + b$ هو إحداثيا نقطة تقاطع مستقيميهما.'
			],
			solutionStepsAr: [
				`من البيان نجد $f(x) = ${fExpr}$ و$g(x) = ${gExpr}$.`,
				`بحل $f(x) \\le g(x)$: $(${a1 - a2})x \\le ${b2} \\implies x ${ineqSign} ${x0}$.`,
				`تُمثل الجملة بالمستقيمين $(d_f)$ و$(d_g)$ وحلّها البياني هو الثنائية $(${x0} ; ${y0})$.`
			],
			finalAnswer: `I(${x0} ; ${y0}), x ${a1 - a2 > 0 ? '<=' : '>='} ${x0}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Geometry: Rotation, Central/Inscribed Angles & Regular Polygons
// ═══════════════════════════════════════════════════════════════════════════════

const rotationAnglesPolygonsTemplate: ParameterizedTemplate = {
	id: '4am_t3_rotation_angles_polygons',
	grade: '4am',
	trimesterId: 't3',
	domain: 'geometry',
	titleAr: 'الدوران، الزاوية المركزية والمحيطية والمضلعات المنتظمة',
	curriculumLessonId: 'lesson_4am_t3_rotation_angles_regular_polygons',
	defaultPoints: 3,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 3, difficulty);

		if (difficulty === 'easy') {
			const alpha = rng.pick([26, 30, 32, 35, 38, 40, 44, 48, 52, 56, 60]);
			const centralDeg = 2 * alpha;
			const radius = rng.int(4, 9);

			const svg = svgCircleRotationPolygon({
				mode: 'angles_rotation',
				centralDeg,
				radiusLabel: `R = ${radius} cm`
			});
			const svgPath = saveSvgAsset(`4am_t3_rot_ang_${difficulty}_s${seed}`, svg);

			const isEquilateral = centralDeg === 60;
			const mcq = buildUniqueMcqOptions(
				`$${alpha}^\\circ$`,
				[
					{
						text: `$${centralDeg}^\\circ$`,
						diagnosticFeedback: 'هذا قيس الزاوية المركزية $\\widehat{AOB}$! الزاوية المحيطية تساوي نصف الزاوية المركزية.'
					},
					{
						text: `$${centralDeg * 2}^\\circ$`,
						diagnosticFeedback: 'عكست العلاقة: الزاوية المحيطية هي الأصغر (تساوي النصف وليس الضعف).'
					},
					{
						text: `$${180 - centralDeg}^\\circ$`,
						diagnosticFeedback: 'الزاوية المحيطية والمركزية اللتان تحصران نفس القوس ليستا متكاملتين، بل إحداهما نصف الأخرى.'
					}
				],
				rng
			);

			const qText = `في الدائرة المقابلة التي مركزها $O$، قيس الزاوية المركزية $\\widehat{AOB} = ${centralDeg}^\\circ$. ما قيس الزاوية المحيطية $\\widehat{AMB}$ التي تحصر نفس القوس $AB$؟`;

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: `دائرة مركزها O والزاوية المركزية ${centralDeg}°`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `الزاوية المحيطية $\\widehat{AMB}$ والزاوية المركزية $\\widehat{AOB}$ تحصران نفس القوس $AB$، إذن $\\widehat{AMB} = \\frac{1}{2}\\widehat{AOB} = \\frac{${centralDeg}^\\circ}{2} = ${alpha}^\\circ$.`
				},
				sujetExercise: {
					points: 3,
					instruction: `$(C)$ دائرة مركزها $O$ ونصف قطرها $R = ${radius}$ سم، و $A, B, M, N$ أربع نقط من $(C)$ بحيث $B$ صورة $A$ بالدوران الذي مركزه $O$ وزاويته $${centralDeg}°$ في الاتجاه المباشر (انظر الشكل).`,
					content: [
						{
							type: 'columns',
							widths: ['1.35fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) استنتج الطول $O B$ وما طبيعة المثلث $O A B$؟ علّل.\n\n2) احسب قيس الزاوية المحيطية $hat(A M B)$ مع ذكر الخاصية.`,
									answer: `1) بما أن $B$ صورة $A$ بالدوران الذي مركزه $O$، فإن الدوران يحفظ الأطوال وبالتالي $O B = O A = ${radius}$ سم. إذن المثلث $O A B$ متساوي الساقين رأسه $O$${isEquilateral ? ` (وبما أن $hat(A O B) = 60°$ فهو متقايس الأضلاع)` : ''}.\n\n2) الزاوية المحيطية $hat(A M B)$ تحصر نفس القوس $A B$ مع الزاوية المركزية $hat(A O B) = ${centralDeg}°$، إذن: $hat(A M B) = frac(${centralDeg}°, 2) = ${alpha}°$.`,
									mark: '2'
								},
								{
									type: 'image',
									src: svgPath,
									caption: 'الزاوية المركزية والمحيطية والدوران'
								}
							]
						},
						{
							type: 'text',
							content: `3) استنتج قيس الزاوية $hat(A N B)$ مع التعليل.`,
							answer: `3) الزاويتان المحيطيتان $hat(A N B)$ و $hat(A M B)$ تحصران نفس القوس $A B$، إذن هما متقايستان: $hat(A N B) = hat(A M B) = ${alpha}°$.`,
							mark: '1'
						}
					]
				},
				hints: [
					'الدوران الذي مركزه $O$ يحفظ المسافات انطلاقاً من $O$، إذن $OB = OA = R$.',
					'قيس الزاوية المحيطية يساوي نصف قيس الزاوية المركزية التي تحصر معها نفس القوس.',
					'كل زاويتين محيطيتين في دائرة تحصران نفس القوس تكونان متقايستين.'
				],
				solutionStepsAr: [
					`من خواص الدوران: $OB = OA = ${radius}\\text{ cm}$، فالمثلث $OAB$ متساوي الساقين${isEquilateral ? ' بل متقايس الأضلاع لأن زاوية رأسه $60^\\circ$' : ''}.`,
					`الزاوية المحيطية $\\widehat{AMB} = \\frac{1}{2}\\widehat{AOB} = \\frac{${centralDeg}^\\circ}{2} = ${alpha}^\\circ$.`,
					`الزاوية المحيطية $\\widehat{ANB}$ تحصر نفس القوس $AB$، إذن $\\widehat{ANB} = ${alpha}^\\circ$.`
				],
				finalAnswer: `${alpha}°`
			};
		}

		if (difficulty === 'medium') {
			const polyChoice = rng.pick([
				{ sides: 6 as const, nameAr: 'سداسي منتظم', verticesAr: 'A B C D E F', centralDeg: 60 },
				{ sides: 4 as const, nameAr: 'مربع', verticesAr: 'A B C D', centralDeg: 90 },
				{ sides: 3 as const, nameAr: 'مثلث متقايس الأضلاع', verticesAr: 'A B C', centralDeg: 120 }
			]);
			const R = rng.int(4, 10);
			const svg = svgCircleRotationPolygon({
				mode: 'regular_polygon',
				sides: polyChoice.sides,
				centralDeg: polyChoice.centralDeg,
				radiusLabel: polyChoice.sides === 6 ? `R = ${R} cm` : polyChoice.sides === 4 ? `AB = ${R} cm` : `BC = ${R} cm`
			});
			const svgPath = saveSvgAsset(`4am_t3_poly_${difficulty}_s${seed}`, svg);

			// For hexagon: perimeter = 6*R; for square: perimeter = 4*R (where R here is side c); for triangle: perimeter = 3*R (where side = R)
			const perim = polyChoice.sides * R;
			const inscribedHalf = polyChoice.centralDeg / 2;

			if (polyChoice.sides === 6) {
				const qText = `سداسي منتظم $ABCDEF$ مرسوم داخل دائرة مركزها $O$ ونصف قطرها $R = ${R}\\text{ cm}$. احسب محيطه $P$ بالسنتيمتر (أدخل العدد فقط).`;
				return {
					templateId: this.id,
					seed,
					grade: '4am',
					trimesterId: 't3',
					difficulty,
					domain: this.domain,
					titleAr: this.titleAr,
					quizQuestion: {
						type: 'calculated',
						questionText: qText,
						questionTextAr: qText,
						imageUrl: svgPath,
						imageCaption: 'سداسي منتظم مرسوم داخل دائرة',
						questionData: {
							answer: perim,
							displayTemplate: `طول ضلع السداسي المنتظم يساوي $R = ${R}$، والمحيط $P = 6 \\times ${R}$`,
							variables: [],
							tolerance: 0
						},
						explanation: `الزاوية المركزية للسداسي المنتظم هي $\\frac{360^\\circ}{6} = 60^\\circ$، إذن المثلث $OAB$ متقايس الأضلاع وطول ضلعه $AB = R = ${R}\\text{ cm}$. وبالتالي محيطه $P = 6 \\times ${R} = ${perim}\\text{ cm}$.`
					},
					sujetExercise: {
						points: 3,
						instruction: `لإنشاء سداسي منتظم $A B C D E F$ داخل دائرة $(C)$ مركزها $O$ ونصف قطرها $R = ${R}$ سم، ننشئ الرؤوس المتتالية بدوران مركزه $O$ في الاتجاه المباشر.`,
						content: [
							{
								type: 'columns',
								widths: ['1.35fr', '1fr'],
								children: [
									{
										type: 'text',
										content: `1) احسب زاوية الدوران (الزاوية المركزية $hat(A O B)$) التي تحول $A$ إلى $B$.\n\n2) بيّن أن المثلث $O A B$ متقايس الأضلاع، ثم استنتج طول الضلع $A B$ ومحيط السداسي.`,
										answer: `1) زاوية الدوران هي $hat(A O B) = frac(360°, 6) = 60°$.\n\n2) في المثلث $O A B$ لدينا $O A = O B = R = ${R}$ سم (متساوي الساقين) وإحدى زواياه $60°$، إذن هو متقايس الأضلاع. ومنه $A B = R = ${R}$ سم، والمحيط: $P = 6 times ${R} = ${perim}$ سم.`,
										mark: '2'
									},
									{
										type: 'image',
										src: svgPath,
										caption: 'إنشاء السداسي المنتظم داخل دائرة'
									}
								]
							},
							{
								type: 'text',
								content: `3) احسب قيس الزاوية المحيطية $hat(A D B)$ مع التعليل.`,
								answer: `3) الزاوية المحيطية $hat(A D B)$ تحصر القوس $A B$ مع الزاوية المركزية $hat(A O B) = 60°$، إذن $hat(A D B) = frac(60°, 2) = 30°$.`,
								mark: '1'
							}
						]
					},
					hints: [
						'زاوية الدورة الكاملة $360^\\circ$ تُقسم بالتساوي على عدد أضلاع المضلع المنتظم ($n = 6$).',
						'كل مثلث متساوي الساقين إحدى زواياه $60^\\circ$ هو مثلث متقايس الأضلاع، لذا $AB = OA = R$.',
						'الزاوية المحيطية تساوي نصف الزاوية المركزية الموافقة لها.'
					],
					solutionStepsAr: [
						`الزاوية المركزية: $\\widehat{AOB} = \\frac{360^\\circ}{6} = 60^\\circ$.`,
						`المثلث $OAB$ متساوي الساقين وزاوية رأسه $60^\\circ$ فهو متقايس الأضلاع، أي $AB = ${R}\\text{ cm}$ والمحيط $6 \\times ${R} = ${perim}\\text{ cm}$.`,
						`الزاوية المحيطية $\\widehat{ADB} = \\frac{60^\\circ}{2} = 30^\\circ$.`
					],
					finalAnswer: `${perim} cm`
				};
			}

			// Square (n=4) or Equilateral triangle (n=3)
			const side = R;
			const qText = `${polyChoice.nameAr} $${polyChoice.verticesAr.replaceAll(' ', '')}$ مركزه $O$، طول ضلعه $${side}\\text{ cm}$. ما هو محيطه بالسنتيمتر (أدخل العدد فقط)؟`;

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: `${polyChoice.nameAr} مرسوم داخل دائرة`,
					questionData: {
						answer: perim,
						displayTemplate: `المحيط $P = ${polyChoice.sides} \\times ${side}$`,
						variables: [],
						tolerance: 0
					},
					explanation: `المضلع المنتظم له $${polyChoice.sides}$ أضلاع متقايسة طول كل منها $${side}\\text{ cm}$، إذن محيطه $P = ${polyChoice.sides} \\times ${side} = ${perim}\\text{ cm}$، وزاويته المركزية $\\frac{360^\\circ}{${polyChoice.sides}} = ${polyChoice.centralDeg}^\\circ$.`
				},
				sujetExercise: {
					points: 3,
					instruction: `$${polyChoice.verticesAr}$ ${polyChoice.nameAr} مرسوم داخل دائرة مركزها $O$، طول ضلعه $${side}$ سم (انظر الشكل).`,
					content: [
						{
							type: 'columns',
							widths: ['1.35fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) احسب قيس الزاوية المركزية $hat(A O B)$، ثم عيّن صورة القطعة $[A B]$ بالدوران الذي مركزه $O$ وزاويته $${polyChoice.centralDeg}°$ في الاتجاه المباشر.\n\n2) احسب محيط هذا المضلع المنتظم.`,
									answer: `1) قيس الزاوية المركزية: $hat(A O B) = frac(360°, ${polyChoice.sides}) = ${polyChoice.centralDeg}°$.\n\nبهذا الدوران صورة $A$ هي $B$ وصورة $B$ هي $C$، إذن صورة $[A B]$ هي القطعة $[B C]$، وبما أن الدوران يحفظ الأطوال فإن $B C = A B = ${side}$ سم.\n\n2) المحيط: $P = ${polyChoice.sides} times ${side} = ${perim}$ سم.`,
									mark: '2'
								},
								{
									type: 'image',
									src: svgPath,
									caption: `${polyChoice.nameAr} وزاويته المركزية`
								}
							]
						},
						{
							type: 'text',
							content: `3) احسب قيس الزاوية المحيطية $hat(A C B)$ التي تحصر القوس $A B$.`,
							answer: `3) الزاوية المحيطية $hat(A C B)$ تحصر نفس القوس $A B$ مع $hat(A O B) = ${polyChoice.centralDeg}°$، إذن $hat(A C B) = frac(${polyChoice.centralDeg}°, 2) = ${inscribedHalf}°$.`,
							mark: '1'
						}
					]
				},
				hints: [
					`في المضلع المنتظم ذي $${polyChoice.sides}$ أضلاع، الزاوية المركزية تساوي $\\frac{360^\\circ}{${polyChoice.sides}}$.`,
					'صورة قطعة مستقيم بدوران هي قطعة مستقيم تقايسها.',
					'الزاوية المحيطية تساوي نصف قيس الزاوية المركزية التي تحصر معها نفس القوس.'
				],
				solutionStepsAr: [
					`الزاوية المركزية $\\widehat{AOB} = \\frac{360^\\circ}{${polyChoice.sides}} = ${polyChoice.centralDeg}^\\circ$.`,
					`صورة $[AB]$ بالدوران $(O ; ${polyChoice.centralDeg}^\\circ)$ هي $[BC]$، والمحيط $P = ${polyChoice.sides} \\times ${side} = ${perim}\\text{ cm}$.`,
					`الزاوية المحيطية $\\widehat{ACB} = \\frac{${polyChoice.centralDeg}^\\circ}{2} = ${inscribedHalf}^\\circ$.`
				],
				finalAnswer: `${perim} cm`
			};
		}

		// Hard: Diameter [AB] = 2R, point M by rotation theta in {60, 90, 120}
		const R = rng.int(3, 8);
		const D = 2 * R;
		const thetaDeg = rng.pick([60, 90, 120] as const);
		const svg = svgCircleRotationPolygon({
			mode: 'diameter_right',
			thetaDeg,
			diameterLabel: `AB = ${D} cm`
		});
		const svgPath = saveSvgAsset(`4am_t3_diam_rot_${difficulty}_s${seed}`, svg);

		const angleABM = thetaDeg / 2;
		const angleBAM = 90 - angleABM;

		let exactAskKaTeX: string;
		let exactWrong1: string;
		let exactWrong2: string;
		let exactWrong3: string;
		let explanationHard: string;
		let answerPart2Typst: string;
		let answerPart3Typst: string;
		let finalAnsHard: string;

		if (thetaDeg === 60) {
			exactAskKaTeX = `$${R}\\sqrt{3}\\text{ cm}$`;
			exactWrong1 = `$${R}\\text{ cm}$`;
			exactWrong2 = `$${D}\\text{ cm}$`;
			exactWrong3 = `$${R}\\sqrt{2}\\text{ cm}$`;
			explanationHard = `بما أن $[AB]$ قطر فإن $ABM$ قائم في $M$. المثلث $OAM$ متساوي الساقين ($OA=OM=${R}\\text{ cm}$) وزاوية رأسه $60^\\circ$ فهو متقايس الأضلاع أي $AM = ${R}\\text{ cm}$. بفيثاغورس: $BM = \\sqrt{${D}^2 - ${R}^2} = \\sqrt{${3 * R * R}} = ${R}\\sqrt{3}\\text{ cm}$.`;
			answerPart2Typst = `2) في المثلث $O A M$: $O A = O M = ${R}$ سم و $hat(A O M) = 60°$، إذن المثلث $O A M$ متقايس الأضلاع، ومنه $A M = ${R}$ سم.`;
			answerPart3Typst = `3) بتطبيق مبرهنة فيثاغورس في $A B M$ القائم في $M$:\n\n$B M^2 = A B^2 - A M^2 = ${D}^2 - ${R}^2 = ${D * D - R * R} = 3 times ${R * R}$\n\nإذن $B M = ${R} sqrt(3)$ سم، والمساحة: $S = frac(${R} times ${R} sqrt(3), 2) = frac(${R * R} sqrt(3), 2)$ سم².`;
			finalAnsHard = `${R}√3 cm`;
		} else if (thetaDeg === 120) {
			exactAskKaTeX = `$${R}\\sqrt{3}\\text{ cm}$`;
			exactWrong1 = `$${R}\\text{ cm}$`;
			exactWrong2 = `$${D}\\text{ cm}$`;
			exactWrong3 = `$${R}\\sqrt{2}\\text{ cm}$`;
			explanationHard = `بما أن $[AB]$ قطر فإن $ABM$ قائم في $M$، و$\\widehat{BOM} = 180^\\circ - 120^\\circ = 60^\\circ$. المثلث $OBM$ متقايس الأضلاع إذن $BM = ${R}\\text{ cm}$. بفيثاغورس: $AM = \\sqrt{${D}^2 - ${R}^2} = ${R}\\sqrt{3}\\text{ cm}$.`;
			answerPart2Typst = `2) لدينا $hat(B O M) = 180° - 120° = 60°$ و $O B = O M = ${R}$ سم، إذن المثلث $O B M$ متقايس الأضلاع ومنه $B M = ${R}$ سم.`;
			answerPart3Typst = `3) بتطبيق مبرهنة فيثاغورس في $A B M$ القائم في $M$:\n\n$A M^2 = A B^2 - B M^2 = ${D}^2 - ${R}^2 = 3 times ${R * R}$\n\nإذن $A M = ${R} sqrt(3)$ سم، والمساحة: $S = frac(${R} times ${R} sqrt(3), 2) = frac(${R * R} sqrt(3), 2)$ سم².`;
			finalAnsHard = `${R}√3 cm`;
		} else {
			// thetaDeg === 90 -> AM = BM = R*sqrt(2)
			exactAskKaTeX = `$${R}\\sqrt{2}\\text{ cm}$`;
			exactWrong1 = `$${R}\\text{ cm}$`;
			exactWrong2 = `$${D}\\text{ cm}$`;
			exactWrong3 = `$${R}\\sqrt{3}\\text{ cm}$`;
			explanationHard = `بما أن $[AB]$ قطر فإن $ABM$ قائم في $M$، ولدينا $\\widehat{AOM} = 90^\\circ$ أي $OM \\perp AB$ وفي المثلث القائم $OAM$: $AM = \\sqrt{${R}^2 + ${R}^2} = ${R}\\sqrt{2}\\text{ cm}$ (وبما أن $\\widehat{ABM} = 45^\\circ$ فإن $BM = AM = ${R}\\sqrt{2}\\text{ cm}$).`;
			answerPart2Typst = `2) في المثلث $O A M$ القائم في $O$ (لأن زاوية الدوران $90°$) والمتساوي الساقين ($O A = O M = ${R}$ سم): $A M = ${R} sqrt(2)$ سم.`;
			answerPart3Typst = `3) بما أن $hat(A B M) = frac(90°, 2) = 45°$ فإن المثلث $A B M$ قائم ومتساوي الساقين في $M$، ومنه $B M = A M = ${R} sqrt(2)$ سم، ومساحته $S = frac(A M times B M, 2) = frac(2 times ${R * R}, 2) = ${R * R}$ سم².`;
			finalAnsHard = `${R}√2 cm`;
		}

		const targetSideAsk = thetaDeg === 120 ? 'AM' : 'BM';
		const mcq = buildUniqueMcqOptions(
			exactAskKaTeX,
			[
				{ text: exactWrong1, diagnosticFeedback: `القيمة $${R}\\text{ cm}$ هي نصف القطر (طول الضلع المقابل لزاوية $30^\\circ$)، وليس طول $${targetSideAsk}$!` },
				{ text: exactWrong2, diagnosticFeedback: `القيمة $${D}\\text{ cm}$ هي طول الوتر (القطر $[AB]$) وليس الضلع القائم $${targetSideAsk}$.` },
				{ text: exactWrong3, diagnosticFeedback: 'تحقق من تطبيق مبرهنة فيثاغورس وتبسيط الجذر التربيعي إلى الشكل $a\\sqrt{b}$.' }
			],
			rng
		);

		const qText = `في الدائرة المقابلة مركزها $O$ وقطرها $AB = ${D}\\text{ cm}$، النقطة $M$ صورة $A$ بالدوران الذي مركزه $O$ وزاويته $${thetaDeg}^\\circ$ في الاتجاه المباشر. ما هي القيمة المضبوطة للطول $${targetSideAsk}$؟`;

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: `دائرة قطرها AB = ${D} cm ودوران بزاوية ${thetaDeg}°`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: explanationHard
			},
			sujetExercise: {
				points: 3,
				instruction: `$[A B]$ قطر لدائرة $(C)$ مركزها $O$ وطوله $A B = ${D}$ سم. النقطة $M$ هي صورة $A$ بالدوران الذي مركزه $O$ وزاويته $${thetaDeg}°$ في الاتجاه المباشر.`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) بيّن أن المثلث $A B M$ قائم في $M$، ثم احسب قيس الزاويتين $hat(A B M)$ و $hat(B A M)$.`,
								answer: `1) أحد أضلاع المثلث $A B M$ هو قطر للدائرة المحيطة به ($[A B]$)، إذن المثلث $A B M$ قائم في $M$.\n\nالزاوية المحيطية $hat(A B M)$ تحصر القوس $A M$ مع المركزية $hat(A O M) = ${thetaDeg}°$، إذن $hat(A B M) = ${angleABM}°$ و $hat(B A M) = 90° - ${angleABM}° = ${angleBAM}°$.`,
								mark: '1'
							},
							{
								type: 'image',
								src: svgPath,
								caption: 'المثلث القائم والزاوية المركزية'
							}
						]
					},
					{
						type: 'text',
						content:
							thetaDeg === 90
								? `2) استنتج القيمة المضبوطة للطول $A M$ من المثلث القائم $O A M$.`
								: `2) ما نوع المثلث ${thetaDeg === 60 ? '$O A M$' : '$O B M$'}؟ استنتج طول الضلع ${thetaDeg === 60 ? '$A M$' : '$B M$'}.`,
						answer: answerPart2Typst,
						mark: '1'
					},
					{
						type: 'text',
						content:
							thetaDeg === 90
								? `3) استنتج الطول المضبوط $B M$ واحسب مساحة المثلث $A B M$.`
								: `3) احسب القيمة المضبوطة للطول $${targetSideAsk}$ ثم المساحة المضبوطة للمثلث $A B M$.`,
						answer: answerPart3Typst,
						mark: '1'
					}
				]
			},
			hints: [
				'تذكّر خاصية الدائرة المحيطة بمثلث: إذا كان أحد أضلاع مثلث قطراً لدائرته المحيطة فهو مثلث قائم.',
				'الزاوية المحيطية $\\widehat{ABM}$ تساوي نصف الزاوية المركزية $\\widehat{AOM}$.',
				`استعمل مبرهنة فيثاغورس في المثلث القائم $ABM$ حيث الوتر $AB = ${D}\\text{ cm}$ لتبسيط $${targetSideAsk}$ على الشكل $a\\sqrt{b}$.`
			],
			solutionStepsAr: [
				`بما أن $[AB]$ قطر والدائرة تشمل $M$ فالمثلث $ABM$ قائم في $M$، و$\\widehat{ABM} = \\frac{${thetaDeg}^\\circ}{2} = ${angleABM}^\\circ$.`,
				`المثلث المرجعي يعطي طول الضلع الأول، وبفيثاغورس في $ABM$ نجد $${targetSideAsk} = ${finalAnsHard}$.`,
				`المساحة المضبوطة تُحسب بالعلاقة $S = \\frac{AM \\times BM}{2}$.`
			],
			finalAnswer: finalAnsHard
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Measurement: Sphere Area (4 pi R^2), Ball Volume (4/3 pi R^3), Plane Sections & Scaling
// ═══════════════════════════════════════════════════════════════════════════════

const sphereSectionsScalingTemplate: ParameterizedTemplate = {
	id: '4am_t3_sphere_sections_scaling',
	grade: '4am',
	trimesterId: 't3',
	domain: 'measurement',
	titleAr: 'الكرة والجلة، المقاطع المستوية والتكبير والتصغير',
	curriculumLessonId: 'lesson_4am_t3_sphere_ball_plane_sections_scaling',
	defaultPoints: 3,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 4, difficulty);

		if (difficulty === 'easy') {
			const R = rng.pick([3, 6, 9]);
			const useDiam = seed % 2 === 0;
			const D = 2 * R;
			const areaCoeff = 4 * R * R;
			const volCoeff = (4 * R * R * R) / 3; // exact integer since 3 | R
			const perimCoeff = 2 * R;
			const areaApprox = roundTo(areaCoeff * PI_APPROX, 2);
			const volApprox = roundTo(volCoeff * PI_APPROX, 2);

			const svg = svgSphereSection({
				showSection: false,
				radiusLabel: useDiam ? `d = ${D} cm` : `R = ${R} cm`
			});
			const svgPath = saveSvgAsset(`4am_t3_sphere_${difficulty}_s${seed}`, svg);

			const askArea = seed % 3 === 0;

			const mcq = askArea
				? buildUniqueMcqOptions(
						`$${areaCoeff}\\pi\\text{ cm}^2$`,
						[
							{
								text: `$${volCoeff}\\pi\\text{ cm}^2$`,
								diagnosticFeedback: 'استعملت قانون حجم الجلة ($\\frac{4}{3}\\pi R^3$) بدلاً من قانون مساحة الكرة ($4\\pi R^2$).'
							},
							{
								text: `$${4 * D * D}\\pi\\text{ cm}^2$`,
								diagnosticFeedback: 'انتبه: استعملت القطر بدلاً من نصف القطر $R = \\frac{d}{2}$ في القانون $4\\pi R^2$.'
							},
							{
								text: `$${R * R}\\pi\\text{ cm}^2$`,
								diagnosticFeedback: 'نسيت الضرب في $4$! مساحة الكرة تساوي $4\\pi R^2$ (أربعة أضعاف مساحة القرص الكبير).'
							}
						],
						rng
					)
				: buildUniqueMcqOptions(
						`$${volCoeff}\\pi\\text{ cm}^3$`,
						[
							{
								text: `$${areaCoeff}\\pi\\text{ cm}^3$`,
								diagnosticFeedback: 'هذا ناتج مساحة الكرة ($4\\pi R^2$) وليس حجم الجلة ($\\frac{4}{3}\\pi R^3$).'
							},
							{
								text: `$${Math.round((4 * R * R) / 3)}\\pi\\text{ cm}^3$`,
								diagnosticFeedback: 'في قانون حجم الجلة نرفع نصف القطر إلى القوة $3$ ($R^3 = R \\times R \\times R$) وليس $R^2$.'
							},
							{
								text: `$${4 * R * R * R}\\pi\\text{ cm}^3$`,
								diagnosticFeedback: 'نسيت القسمة على $3$ في قانون حجم الجلة $V = \\frac{4}{3}\\pi R^3$.'
							}
						],
						rng
					);

			const dimKaTeX = useDiam ? `قطرها $d = ${D}\\text{ cm}$` : `نصف قطرها $R = ${R}\\text{ cm}$`;
			const dimTypst = useDiam ? `قطرها $d = ${D}$ سم` : `نصف قطرها $R = ${R}$ سم`;
			const qText = `جلة مركزها $O$ و${dimKaTeX}. ما هي القيمة المضبوطة ${askArea ? 'لمساحة سطح الكرة' : 'لحجم الجلة'} بدلالة $\\pi$؟`;

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: 'الكرة والجلة',
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `${useDiam ? `نصف القطر $R = \\frac{${D}}{2} = ${R}\\text{ cm}$. ` : ''}${askArea ? `مساحة الكرة $A = 4\\pi R^2 = 4\\pi \\times ${R}^2 = ${areaCoeff}\\pi\\text{ cm}^2$.` : `حجم الجلة $V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi \\times ${R}^3 = ${volCoeff}\\pi\\text{ cm}^3$.`}`
				},
				sujetExercise: {
					points: 3,
					instruction: `كرة مركزها $O$ و${dimTypst} (نأخذ $pi approx 3.14$).`,
					content: [
						{
							type: 'columns',
							widths: ['1.35fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) احسب القيمة المضبوطة لمساحة الكرة بدلالة $pi$، ثم استنتج قيمتها المقربة.\n\n2) احسب القيمة المضبوطة لحجم الجلة الموافقة بدلالة $pi$، ثم قيمته المقربة.`,
									answer: `1) ${useDiam ? `نصف القطر: $R = ${D} div 2 = ${R}$ سم. ` : ''}المساحة: $A = 4 pi R^2 = 4 pi times ${R}^2 = ${areaCoeff} pi$ سم² $approx ${fmtNum(areaApprox)}$ سم².\n\n2) الحجم: $V = frac(4, 3) pi R^3 = frac(4, 3) pi times ${R}^3 = ${volCoeff} pi$ سم³ $approx ${fmtNum(volApprox)}$ سم³.`,
									mark: '2'
								},
								{
									type: 'image',
									src: svgPath,
									caption: 'الكرة مركزها O'
								}
							]
						},
						{
							type: 'text',
							content: `3) نقطع هذه الكرة بمستوٍ يمر بمركزها $O$. ما اسم المقطع الناتج وما القيمة المضبوطة لمحيطه؟`,
							answer: `3) المقطع الناتج هو الدائرة الكبرى للكرة (نصف قطرها $R = ${R}$ سم)، ومحيطها $P = 2 pi R = ${perimCoeff} pi$ سم.`,
							mark: '1'
						}
					]
				},
				hints: [
					`${useDiam ? `احسب أولاً نصف القطر $R = \\frac{${D}}{2} = ${R}\\text{ cm}$. ` : ''}قانون مساحة الكرة هو $A = 4\\pi R^2$.`,
					'قانون حجم الجلة هو $V = \\frac{4}{3}\\pi R^3$ حيث $R^3 = R \\times R \\times R$.',
					'عندما يمر مستوي القطع بمركز الكرة $O$ نحصل على دائرة كبرى نصف قطرها $R$.'
				],
				solutionStepsAr: [
					`${useDiam ? `نصف القطر $R = ${R}\\text{ cm}$. ` : ''}مساحة الكرة: $A = 4\\pi \\times ${R}^2 = ${areaCoeff}\\pi\\text{ cm}^2 \\approx ${fmtNum(areaApprox)}\\text{ cm}^2$.`,
					`حجم الجلة: $V = \\frac{4}{3}\\pi \\times ${R}^3 = ${volCoeff}\\pi\\text{ cm}^3 \\approx ${fmtNum(volApprox)}\\text{ cm}^3$.`,
					`المقطع المار بالمركز هو الدائرة الكبرى ومحيطها $2\\pi R = ${perimCoeff}\\pi\\text{ cm}$.`
				],
				finalAnswer: askArea ? `${areaCoeff}π cm²` : `${volCoeff}π cm³`
			};
		}

		if (difficulty === 'medium') {
			// Plane section of a sphere at distance d = OH using exact Pythagorean triples
			const triples: [number, number, number][] = [
				[3, 4, 5],
				[4, 3, 5],
				[6, 8, 10],
				[8, 6, 10],
				[5, 12, 13],
				[12, 5, 13],
				[9, 12, 15],
				[12, 9, 15]
			];
			const [d, rSec, R] = rng.pick(triples);
			const secAreaCoeff = rSec * rSec;
			const sphereAreaCoeff = 4 * R * R;

			const svg = svgSphereSection({
				showSection: true,
				radiusLabel: `R = ${R} cm`,
				dLabel: `${d} cm`,
				rLabel: 'r = ?'
			});
			const svgPath = saveSvgAsset(`4am_t3_sphere_sec_${difficulty}_s${seed}`, svg);

			const qText = `كرة مركزها $O$ ونصف قطرها $R = ${R}\\text{ cm}$، قُطعت بمستوٍ يبعد عن المركز بالمسافة $OH = ${d}\\text{ cm}$. احسب نصف قطر دائرة المقطع $r = HM$ بالسنتيمتر (أدخل العدد فقط).`;

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: 'مقطع كرة بمستوٍ يبعد d عن المركز',
					questionData: {
						answer: rSec,
						displayTemplate: `بتطبيق فيثاغورس في المثلث القائم $OHM$: $r = \\sqrt{${R}^2 - ${d}^2}$`,
						variables: [],
						tolerance: 0
					},
					explanation: `المثلث $OHM$ قائم في $H$، ومنه $r^2 = OM^2 - OH^2 = ${R}^2 - ${d}^2 = ${R * R - d * d}$، أي $r = \\sqrt{${rSec * rSec}} = ${rSec}\\text{ cm}$.`
				},
				sujetExercise: {
					points: 3,
					instruction: `كرة مركزها $O$ ونصف قطرها $R = ${R}$ سم. نقطع هذه الكرة بمستوٍ يبعد عن مركزها بالمسافة $O H = ${d}$ سم (حيث $H$ المسقط العمودي لـ $O$ على مستوي القطع).`,
					content: [
						{
							type: 'columns',
							widths: ['1.35fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) ما طبيعة المقطع الناتج؟\n\n2) احسب نصف قطر هذا المقطع $r = H M$، ثم استنتج المساحة المضبوطة لقرص المقطع بدلالة $pi$.`,
									answer: `1) بما أن $d = ${d}$ سم $< R = ${R}$ سم، فالمقطع هو دائرة مركزها $H$ (أو قرص بالنسبة للجلة).\n\n2) المثلث $O H M$ قائم في $H$ ووتره $O M = R = ${R}$ سم. بتطبيق مبرهنة فيثاغورس:\n\n$H M^2 = O M^2 - O H^2 = ${R}^2 - ${d}^2 = ${R * R} - ${d * d} = ${rSec * rSec}$\n\nإذن $r = H M = ${rSec}$ سم، ومساحة قرص المقطع: $S = pi r^2 = ${secAreaCoeff} pi$ سم².`,
									mark: '2'
								},
								{
									type: 'image',
									src: svgPath,
									caption: 'المقطع المستوي للكرة'
								}
							]
						},
						{
							type: 'text',
							content: `3) احسب المساحة المضبوطة للكرة $A = 4 pi R^2$، وتحقق أنها تساوي $4$ أضعاف مساحة القرص الكبير $pi R^2$.`,
							answer: `3) $A = 4 pi times ${R}^2 = ${sphereAreaCoeff} pi$ سم²، ومساحة القرص الكبير هي $${R * R} pi$ سم²، وبالفعل $4 times ${R * R} pi = ${sphereAreaCoeff} pi$.`,
							mark: '1'
						}
					]
				},
				hints: [
					'مقطع كرة بمستوٍ يبعد عن مركزها بمسافة $d < R$ هو دائرة مركزها $H$.',
					'استعمل مبرهنة فيثاغورس في المثلث القائم $OHM$ حيث الوتر $OM = R$ وأحد الضلعين القائمين $OH = d$.',
					'مساحة القرص تُحسب بالقانون $\\pi r^2$، ومساحة الكرة بالقانون $4\\pi R^2$.'
				],
				solutionStepsAr: [
					`طبيعة المقطع: دائرة مركزها $H$ لأن $d = ${d} < R = ${R}$.`,
					`في المثلث القائم $OHM$: $r = \\sqrt{${R}^2 - ${d}^2} = \\sqrt{${rSec * rSec}} = ${rSec}\\text{ cm}$.`,
					`مساحة قرص المقطع $= ${secAreaCoeff}\\pi\\text{ cm}^2$، ومساحة الكرة $= ${sphereAreaCoeff}\\pi\\text{ cm}^2$.`
				],
				finalAnswer: `${rSec} cm`
			};
		}

		// Hard: Plane section of square pyramid parallel to base + scaling (k, k^2, k^3) + sphere scaling
		const configs = [
			{ p: 1, q: 2, c: 6, h: 12 },
			{ p: 1, q: 2, c: 8, h: 12 },
			{ p: 1, q: 2, c: 10, h: 6 },
			{ p: 1, q: 3, c: 6, h: 9 },
			{ p: 1, q: 3, c: 9, h: 18 },
			{ p: 2, q: 3, c: 6, h: 9 },
			{ p: 2, q: 3, c: 9, h: 18 }
		];
		const cfg = rng.pick(configs);
		const hPrime = (cfg.h * cfg.p) / cfg.q;
		const B = cfg.c * cfg.c;
		const V = (B * cfg.h) / 3;
		const BPrime = (B * cfg.p * cfg.p) / (cfg.q * cfg.q);
		const VPrime = (V * cfg.p * cfg.p * cfg.p) / (cfg.q * cfg.q * cfg.q);
		const cPrime = (cfg.c * cfg.p) / cfg.q;

		// Also part 3: Enlargement of a ball by factor k2 in {2, 3}
		const rBall = rng.pick([3, 6]);
		const vBallCoeff = (4 * rBall * rBall * rBall) / 3;
		const k2 = rng.pick([2, 3]);
		const vBallScaledCoeff = vBallCoeff * k2 * k2 * k2;

		const kTypst = `frac(${cfg.p}, ${cfg.q})`;
		const kKatex = `\\frac{${cfg.p}}{${cfg.q}}`;

		const svg = svgPyramidSection({
			hLabel: `h = ${cfg.h} cm`,
			hPrimeLabel: `h' = ${hPrime} cm`,
			baseSideLabel: `c = ${cfg.c} cm`,
			ratioFraction: cfg.p / cfg.q
		});
		const svgPath = saveSvgAsset(`4am_t3_pyr_scale_${difficulty}_s${seed}`, svg);

		const wrongLinearScale = Math.round((V * cfg.p) / cfg.q);
		const wrongAreaScale = Math.round((V * cfg.p * cfg.p) / (cfg.q * cfg.q));
		const wrongAddDiv = Math.round(V / cfg.q) === VPrime ? VPrime + 12 : Math.round(V / cfg.q);

		const mcq = buildUniqueMcqOptions(
			`$${VPrime}\\text{ cm}^3$`,
			[
				{
					text: `$${wrongLinearScale}\\text{ cm}^3$`,
					diagnosticFeedback: `استعملت معامل التصغير $k = ${kKatex}$ مباشرة بدلاً من $k^3$! في الحجوم نضرب في $k^3$.`
				},
				{
					text: `$${wrongAreaScale}\\text{ cm}^3$`,
					diagnosticFeedback: `استعملت $k^2$ (الخاص بالمساحات) بدلاً من $k^3$ (الخاص بالحجوم).`
				},
				{
					text: `$${wrongAddDiv === wrongLinearScale || wrongAddDiv === wrongAreaScale ? VPrime + 18 : wrongAddDiv}\\text{ cm}^3$`,
					diagnosticFeedback: `احسب أولاً الحجم الأصلي $V = \\frac{1}{3} B \\times h$ ثم اضربه في $k^3 = \\left(${kKatex}\\right)^3$.`
				}
			],
			rng
		);

		const qText = `هرم قاعدته مربعة طول ضلعها $c = ${cfg.c}\\text{ cm}$ وارتفاعه $h = ${cfg.h}\\text{ cm}$. قُطع بمستوٍ موازٍ للقاعدة على مسافة $h' = ${hPrime}\\text{ cm}$ من رأسه $S$. ما هو حجم الهرم المصغّر الناتج $V'$؟`;

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: 'مقطع هرم بمستوٍ موازٍ للقاعدة',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `حجم الهرم الأصلي $V = \\frac{1}{3} \\times ${cfg.c}^2 \\times ${cfg.h} = ${V}\\text{ cm}^3$. معامل التصغير $k = \\frac{${hPrime}}{${cfg.h}} = ${kKatex}$، ومنه $V' = k^3 \\times V = \\left(${kKatex}\\right)^3 \\times ${V} = ${VPrime}\\text{ cm}^3$.`
			},
			sujetExercise: {
				points: 3,
				instruction: `هرم منتظم رأسه $S$، قاعدته مربع طول ضلعه $c = ${cfg.c}$ سم وارتفاعه $h = ${cfg.h}$ سم. نقطع هذا الهرم بمستوٍ موازٍ لقاعدته على مسافة $h' = ${hPrime}$ سم من الرأس $S$.`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) احسب مساحة القاعدة $B$ وحجم الهرم الأصلي $V$، ثم استنتج معامل التصغير $k = frac(h', h)$.`,
								answer: `1) مساحة القاعدة: $B = ${cfg.c}^2 = ${B}$ سم².\n\nالحجم الأصلي: $V = frac(1, 3) times B times h = frac(1, 3) times ${B} times ${cfg.h} = ${V}$ سم³.\n\nمعامل التصغير: $k = frac(${hPrime}, ${cfg.h}) = ${kTypst}$.`,
								mark: '1'
							},
							{
								type: 'image',
								src: svgPath,
								caption: 'تصغير الهرم بالمقطع الموازي للقاعدة'
							}
						]
					},
					{
						type: 'text',
						content: `2) ما طبيعة المقطع الناتج؟ احسب طول ضلعه $c'$ ومساحته $B'$ ثم حجم الهرم المصغّر $V'$.`,
						answer: `2) المقطع هو مربع مصغّر بنسبة $k = ${kTypst}$، طول ضلعه $c' = ${kTypst} times ${cfg.c} = ${cPrime}$ سم.\n\nمساحة المقطع: $B' = (${kTypst})^2 times ${B} = ${BPrime}$ سم².\n\nحجم الهرم المصغّر: $V' = (${kTypst})^3 times ${V} = ${VPrime}$ سم³.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) جلة نصف قطرها $R = ${rBall}$ سم، نكبرها بنسبة $k_2 = ${k2}$. احسب القيمة المضبوطة لحجم الجلة الأصلية ثم لحجم الجلة المكبرة بدلالة $pi$.`,
						answer: `3) حجم الجلة الأصلية: $V_0 = frac(4, 3) pi times ${rBall}^3 = ${vBallCoeff} pi$ سم³.\n\nحجم الجلة المكبرة بنسبة $k_2 = ${k2}$: $V_1 = ${k2}^3 times ${vBallCoeff} pi = ${k2 * k2 * k2} times ${vBallCoeff} pi = ${vBallScaledCoeff} pi$ سم³.`,
						mark: '1'
					}
				]
			},
			hints: [
				`حجم الهرم $V = \\frac{1}{3} B \\times h$، ومعامل التصغير هو النسبة $k = \\frac{h'}{h}$.`,
				'عند التصغير أو التكبير بنسبة $k$، تُضرب الأطوال في $k$ والمساحات في $k^2$ والحجوم في $k^3$.',
				`في السؤال الثالث، احسب حجم الجلة $\\frac{4}{3}\\pi R^3$ ثم اضربه في $${k2}^3 = ${k2 * k2 * k2}$.`
			],
			solutionStepsAr: [
				`مساحة القاعدة $B = ${B}\\text{ cm}^2$، الحجم $V = ${V}\\text{ cm}^3$، ومعامل التصغير $k = ${kKatex}$.`,
				`المساحة المصغّرة $B' = k^2 B = ${BPrime}\\text{ cm}^2$، والحجم المصغّر $V' = k^3 V = ${VPrime}\\text{ cm}^3$.`,
				`حجم الجلة الأصلية $${vBallCoeff}\\pi\\text{ cm}^3$، وبعد التكبير بنسبة $${k2}$ يصبح $${vBallScaledCoeff}\\pi\\text{ cm}^3$.`
			],
			finalAnswer: `${VPrime} cm³`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Proportionality: Statistics (Cumulative Freq, Weighted Mean, Median, Range + svgBarChart)
// ═══════════════════════════════════════════════════════════════════════════════

const statisticsTemplate: ParameterizedTemplate = {
	id: '4am_t3_statistics',
	grade: '4am',
	trimesterId: 't3',
	domain: 'proportionality',
	titleAr: 'الإحصاء: التكرار والتواتر المجمع، المتوسط، الوسيط والمدى',
	curriculumLessonId: 'lesson_4am_t3_statistics_cumulative_mean_median_range',
	defaultPoints: 3,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 5, difficulty);

		if (difficulty === 'easy') {
			// N = 25 (odd), 5 sorted values, exact 2-decimal mean & cumulative relative freq
			const startVal = rng.pick([7, 8, 9, 10]);
			const gaps = rng.pick([
				[2, 2, 2, 2],
				[2, 2, 3, 2],
				[1, 3, 2, 2],
				[2, 3, 2, 1]
			]);
			const vals = [startVal];
			for (const g of gaps) vals.push(vals[vals.length - 1] + g);

			const freqPools = [
				[2, 5, 8, 6, 4],
				[3, 4, 9, 5, 4],
				[2, 6, 7, 6, 4],
				[4, 5, 7, 5, 4],
				[3, 6, 8, 4, 4]
			];
			const freqs = rng.pick(freqPools);
			const N = 25;
			const cumAsc: number[] = [];
			let running = 0;
			for (const f of freqs) {
				running += f;
				cumAsc.push(running);
			}
			const relCumAsc = cumAsc.map((c) => fmtNum(c / N));
			const weightedSum = vals.reduce((s, v, i) => s + v * freqs[i], 0);
			const mean = roundTo(weightedSum / N, 2);

			// Median rank = (25+1)/2 = 13
			const medRank = 13;
			const medIdx = cumAsc.findIndex((c) => c >= medRank);
			const median = vals[medIdx];
			const range = vals[vals.length - 1] - vals[0];

			const maxFreq = Math.max(...freqs) + 1;
			const svg = svgBarChart(
				vals.map((v, i) => ({ label: String(v), value: freqs[i] })),
				maxFreq
			);
			const svgPath = saveSvgAsset(`4am_t3_stat_${difficulty}_s${seed}`, svg);

			const qText = `يضم قسم $25$ تلميذاً تحصلوا على العلامات المرتبة: $${vals.join(' ; ')}$ بتكرارات موافقة هي على الترتيب: $${freqs.join(' ; ')}$. احسب المتوسط الحسابي المتوازن $\\overline{x}$ (اكتب القيمة العشرية المضبوطة).`;

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: 'مخطط الأعمدة لتوزيع علامات القسم',
					questionData: {
						answer: mean,
						displayTemplate: `$\\overline{x} = \\frac{${weightedSum}}{${N}}$`,
						variables: [],
						tolerance: 0.01
					},
					explanation: `المتوسط الحسابي المتوازن هو $\\overline{x} = \\frac{${vals.map((v, i) => `${v} \\times ${freqs[i]}`).join(' + ')}}{${N}} = \\frac{${weightedSum}}{${N}} = ${fmtNum(mean)}$.`
				},
				sujetExercise: {
					points: 3,
					instruction: `يلخص المخطط بالأعمدة والجدول الآتي علامات $${N}$ تلميذاً في اختبار الرياضيات:`,
					content: [
						{
							type: 'columns',
							widths: ['1.35fr', '1fr'],
							children: [
								{
									type: 'table',
									headerBackground: true,
									headers: ['العلامة', ...vals.map((v) => `$${v}$`), 'المجموع'],
									cells: [],
									rows: [
										['التكرار', ...freqs.map((f) => `$${f}$`), `$${N}$`],
										[
											'ت. م. صاعد',
											`$${cumAsc[0]}$`,
											...cumAsc.slice(1).map((c) => ({ content: '...', answer: `$${c}$`, mark: '0.25' })),
											'—'
										],
										[
											'تواتر م. صاعد',
											`$${relCumAsc[0]}$`,
											{ content: '...', answer: `$${relCumAsc[1]}$` },
											{ content: '...', answer: `$${relCumAsc[2]}$` },
											{ content: '...', answer: `$${relCumAsc[3]}$` },
											`$${relCumAsc[4]}$`,
											'—'
										]
									]
								},
								{
									type: 'image',
									src: svgPath,
									caption: 'مخطط الأعمدة للتكرارات'
								}
							]
						},
						{
							type: 'text',
							content: `1) أتمم سطري التكرار المجمع الصاعد والتواتر المجمع الصاعد في الجدول، ثم احسب المتوسط الحسابي المتوازن $bar(x)$ للعلامات.`,
							answer: `1) التكرارات المجمعة الصاعدة: ${cumAsc.join(' ، ')}، والتواترات المجمعة الصاعدة (بقسمة كل تكرار مجمع على $${N}$): ${relCumAsc.join(' ، ')}.\n\nالمتوسط المتوازن: $bar(x) = frac(${weightedSum}, ${N}) = ${fmtNum(mean)}$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) عيّن وسيط هذه السلسلة $M$ واحسب مداها $e$.`,
							answer: `2) بما أن $N = ${N}$ فردي، فالوسيط هو العلامة ذات الرتبة $frac(${N} + 1, 2) = ${medRank}$. من التكرار المجمع الصاعد، تقع الرتبة $${medRank}$ عند العلامة $M = ${median}$.\n\nالمدى: $e = ${vals[vals.length - 1]} - ${vals[0]} = ${range}$.`,
							mark: '1'
						}
					]
				},
				hints: [
					'التكرار المجمع الصاعد لقيمة يساوي مجموع تكرارها وتكرارات القيم الأصغر منها، والتواتر المجمع الصاعد = التكرار المجمع ÷ 25.',
					`احسب المتوسط المتوازن بضرب كل علامة في تكرارها ثم قسمة المجموع على $${N}$.`,
					`بما أن $N = ${N}$ فردي، رتب القيم (هي مرتبة تصاعدياً) وابحث عن القيمة ذات الرتبة $13$ للوسيط، والمدى = أكبر قيمة $-$ أصغر قيمة.`
				],
				solutionStepsAr: [
					`التكرارات المجمعة الصاعدة هي: ${cumAsc.join(' ; ')}، والتواترات المجمعة الصاعدة: ${relCumAsc.join(' ; ')}.`,
					`المتوسط المتوازن: $\\overline{x} = \\frac{${weightedSum}}{${N}} = ${fmtNum(mean)}$.`,
					`الوسيط هو العلامة ذات الرتبة $13$ أي $M = ${median}$، والمدى $e = ${vals[vals.length - 1]} - ${vals[0]} = ${range}$.`
				],
				finalAnswer: `x̄=${fmtNum(mean)}, M=${median}, e=${range}`
			};
		}

		if (difficulty === 'medium') {
			// Even N = 20, descending cumulative frequency + median of even population
			const startVal = rng.pick([1, 2, 3]);
			const vals = [startVal, startVal + 1, startVal + 2, startVal + 3, startVal + 4];
			const freqPools = [
				[3, 7, 5, 3, 2], // cum: 3, 10, 15 -> rank 10=v1, rank 11=v2 -> median = (v1+v2)/2!
				[4, 6, 4, 4, 2], // cum: 4, 10, 14 -> rank 10=v1, rank 11=v2
				[2, 5, 7, 4, 2], // cum: 2, 7, 14 -> both rank 10 & 11 = v2
				[3, 5, 6, 4, 2], // cum: 3, 8, 14 -> both rank 10 & 11 = v2
				[4, 4, 6, 4, 2]
			];
			const freqs = rng.pick(freqPools);
			const N = 20;
			const cumAsc: number[] = [];
			let runAsc = 0;
			for (const f of freqs) {
				runAsc += f;
				cumAsc.push(runAsc);
			}
			const cumDesc: number[] = [];
			let runDesc = N;
			for (let i = 0; i < freqs.length; i++) {
				cumDesc.push(runDesc);
				runDesc -= freqs[i];
			}
			const pctAsc = cumAsc.map((c) => Math.round((c / N) * 100));
			const weightedSum = vals.reduce((s, v, i) => s + v * freqs[i], 0);
			const mean = roundTo(weightedSum / N, 2);

			const valRank10 = vals[cumAsc.findIndex((c) => c >= 10)];
			const valRank11 = vals[cumAsc.findIndex((c) => c >= 11)];
			const median = roundTo((valRank10 + valRank11) / 2, 1);
			const range = vals[vals.length - 1] - vals[0];

			const svg = svgBarChart(
				vals.map((v, i) => ({ label: String(v), value: freqs[i] })),
				Math.max(...freqs) + 1
			);
			const svgPath = saveSvgAsset(`4am_t3_stat_${difficulty}_s${seed}`, svg);

			const wrongMeanAsMed = fmtNum(mean) === fmtNum(median) ? fmtNum(median + 0.5) : fmtNum(mean);
			const wrongRange = range + 1;

			const mcq = buildUniqueMcqOptions(
				`$M = ${fmtNum(median)}$ و $e = ${range}$`,
				[
					{
						text: `$M = ${fmtNum(median)}$ و $e = ${wrongRange}$`,
						diagnosticFeedback: 'الوسيط صحيح، لكن المدى يحسب الفرق بين أكبر قيمة وأصغر قيمة ($x_{\\max} - x_{\\min}$).'
					},
					{
						text: `$M = ${wrongMeanAsMed}$ و $e = ${range}$`,
						diagnosticFeedback: 'انتبه: لا تخلط بين الوسيط $M$ والمتوسط الحسابي! الوسيط يعتمد على الرتبتين $10$ و$11$.'
					},
					{
						text: `$M = ${vals[0]}$ و $e = ${range}$`,
						diagnosticFeedback: 'تحقق من الرتبتين الوسطيين $\\frac{N}{2} = 10$ و$\\frac{N}{2}+1 = 11$ في التكرار المجمع.'
					}
				],
				rng
			);

			const qText = `أُحصي عدد الكتب التي قرأها $${N}$ تلميذاً خلال الشهر، والموضّح في المخطط المقابل (القيم: $${vals.join(' ; ')}$ بتكرارات $${freqs.join(' ; ')}$). ما هما الوسيط $M$ والمدى $e$ لهذه السلسلة؟`;

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: 'توزيع عدد الكتب المقروءة',
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `بما أن $N = ${N}$ زوجي، فالوسيط هو معدل القيمتين ذاتي الرتبتين $10$ ($${valRank10}$) و$11$ ($${valRank11}$): $M = \\frac{${valRank10} + ${valRank11}}{2} = ${fmtNum(median)}$، والمدى $e = ${vals[4]} - ${vals[0]} = ${range}$.`
				},
				sujetExercise: {
					points: 3,
					instruction: `سُجّل عدد الكتب التي قرأها $${N}$ تلميذاً في العطلة (انظر المخطط والجدول):`,
					content: [
						{
							type: 'columns',
							widths: ['1.35fr', '1fr'],
							children: [
								{
									type: 'table',
									headerBackground: true,
									headers: ['عدد الكتب', ...vals.map((v) => `$${v}$`), 'المجموع'],
									cells: [],
									rows: [
										['عدد التلاميذ', ...freqs.map((f) => `$${f}$`), `$${N}$`],
										[
											'ت. م. نازل',
											`$${cumDesc[0]}$`,
											...cumDesc.slice(1, 3).map((c) => ({ content: '...', answer: `$${c}$`, mark: '0.25' })),
											`$${cumDesc[3]}$`,
											{ content: '...', answer: `$${cumDesc[4]}$`, mark: '0.25' },
											'—'
										],
										[
											'تواتر م. صاعد (%)',
											`$${pctAsc[0]}$%`,
											{ content: '...', answer: `$${pctAsc[1]}$%`, mark: '0.25' },
											`$${pctAsc[2]}$%`,
											{ content: '...', answer: `$${pctAsc[3]}$%` },
											`$${pctAsc[4]}$%`,
											'—'
										]
									]
								},
								{
									type: 'image',
									src: svgPath,
									caption: 'مخطط عدد الكتب والتكرارات'
								}
							]
						},
						{
							type: 'text',
							content: `1) أتمم الجدول، ثم احسب المتوسط الحسابي المتوازن $bar(x)$ لعدد الكتب المقروءة.`,
							answer: `1) التكرارات المجمعة النازلة: ${cumDesc.join(' ، ')}، والتواترات المجمعة الصاعدة: ${pctAsc.map((p) => `${p}%`).join(' ، ')}.\n\nالمتوسط المتوازن: $bar(x) = frac(${weightedSum}, ${N}) = ${fmtNum(mean)}$ كتاب.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) عيّن الوسيط $M$ واحسب المدى $e$، ثم فسر معنى التكرار المجمع النازل الموافق للقيمة $${vals[2]}$.`,
							answer: `2) بما أن $N = ${N}$ زوجي، فالوسيط هو معدل الرتبتين $10$ ($${valRank10}$) و $11$ ($${valRank11}$): $M = frac(${valRank10} + ${valRank11}, 2) = ${fmtNum(median)}$. والمدى $e = ${vals[4]} - ${vals[0]} = ${range}$.\n\nالتكرار المجمع النازل للقيمة $${vals[2]}$ هو $${cumDesc[2]}$ يعني أن $${cumDesc[2]}$ تلميذاً قرؤوا $${vals[2]}$ كتب على الأقل.`,
							mark: '1'
						}
					]
				},
				hints: [
					'التكرار المجمع النازل يبدأ بـ $N = 20$ وينقص في كل عمود بتكرار القيمة السابقة.',
					'عندما يكون التكرار الكلي $N = 20$ زوجياً، الوسيط هو معدل القيمتين ذاتي الرتبتين $10$ و $11$.',
					'المدى يساوي الفرق بين أكبر قيمة وأصغر قيمة في السلسلة ($e = x_{\\max} - x_{\\min}$).'
				],
				solutionStepsAr: [
					`التكرارات المجمعة النازلة: ${cumDesc.join(' ; ')}، والتواترات المجمعة الصاعدة: ${pctAsc.map((p) => `${p}\\%`).join(' ; ')}.`,
					`المتوسط المتوازن: $\\overline{x} = \\frac{${weightedSum}}{${N}} = ${fmtNum(mean)}$.`,
					`الوسيط $M = \\frac{${valRank10} + ${valRank11}}{2} = ${fmtNum(median)}$، والمدى $e = ${range}$.`
				],
				finalAnswer: `M=${fmtNum(median)}, e=${range}`
			};
		}

		// Hard: Grouped classes [10;20[, [20;30[, [30;40[, [40;50] with N = 20 or 50
		const classLabelsSvg = ['10-20', '20-30', '30-40', '40-50'];
		const classLabelsDisplay = ['$[10 ; 20[$', '$[20 ; 30[$', '$[30 ; 40[$', '$[40 ; 50]$'];
		const centers = [15, 25, 35, 45];
		const groupedSets = [
			{ N: 20, freqs: [4, 9, 5, 2] },
			{ N: 20, freqs: [3, 8, 6, 3] },
			{ N: 20, freqs: [5, 7, 5, 3] },
			{ N: 50, freqs: [8, 22, 14, 6] },
			{ N: 50, freqs: [10, 18, 15, 7] }
		];
		const gCfg = rng.pick(groupedSets);
		const freqs = gCfg.freqs;
		const N = gCfg.N;
		const cumAsc: number[] = [];
		let r = 0;
		for (const f of freqs) {
			r += f;
			cumAsc.push(r);
		}
		const weightedSum = centers.reduce((s, c, i) => s + c * freqs[i], 0);
		const mean = roundTo(weightedSum / N, 2);
		const unweightedMean = 30; // (15+25+35+45)/4

		const halfN = N / 2;
		const medClassIdx = cumAsc.findIndex((c) => c >= halfN + 1);
		const medClassKatex = classLabelsDisplay[medClassIdx];
		const otherClassIdx = medClassIdx === 1 ? 2 : 1;
		const ge30Count = freqs[2] + freqs[3];
		const ge30Pct = roundTo((ge30Count / N) * 100, 1);

		const svg = svgBarChart(
			classLabelsSvg.map((lbl, i) => ({ label: lbl, value: freqs[i] })),
			Math.max(...freqs) + 2
		);
		const svgPath = saveSvgAsset(`4am_t3_stat_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`المتوسط $${fmtNum(mean)}$ والفئة الوسيطية ${medClassKatex}`,
			[
				{
					text: `المتوسط $${fmtNum(mean)}$ والفئة الوسيطية ${classLabelsDisplay[otherClassIdx]}`,
					diagnosticFeedback: `المتوسط صحيح، لكن نصف التكرار الكلي ($${halfN}$) يتحقق في الفئة ${medClassKatex}.`
				},
				{
					text: `المتوسط $${unweightedMean}$ والفئة الوسيطية ${medClassKatex}`,
					diagnosticFeedback: 'حسبت متوسط مراكز الفئات دون ترجيحها بالتكرارات! اضرب كل مركز فئة في تكراره ثم اقسم على $N$.'
				},
				{
					text: `المتوسط $${fmtNum(roundTo(mean + 2, 2))}$ والفئة الوسيطية ${classLabelsDisplay[0]}`,
					diagnosticFeedback: 'مراكز الفئات هي $15, 25, 35, 45$، ثم اجمع التكرارات تصاعدياً لتحديد الفئة الوسيطية.'
				}
			],
			rng
		);

		const qText = `في إحصاء لمدة المراجعة اليومية (بالدقائق) لـ $${N}$ تلميذاً في الفئات $[10 ; 20[$، $[20 ; 30[$، $[30 ; 40[$، $[40 ; 50]$، كانت التكرارات على الترتيب: $${freqs.join(' ; ')}$. ما هما المتوسط الحسابي المتوازن والفئة الوسيطية؟`;

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: 'المدرج/المخطط التكراري للفئات',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `مراكز الفئات هي $15, 25, 35, 45$. المتوسط $\\overline{x} = \\frac{${weightedSum}}{${N}} = ${fmtNum(mean)}$. التكرار المجمع الصاعد هو $${cumAsc.join(', ')}$، ونصف التكرار الكلي هو $${halfN}$، إذن الفئة الوسيطية هي ${medClassKatex}.`
			},
			sujetExercise: {
				points: 3,
				instruction: `رُصدت مدة استعمال الإنترنت اليومية (بالدقائق) لعينة من $${N}$ تلميذاً في الجدول والمخطط الآتيين:`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'table',
								headerBackground: true,
								headers: ['الفئة (دقيقة)', ...classLabelsDisplay, 'المجموع'],
								cells: [],
								rows: [
									[
										'مركز الفئة',
										`$15$`,
										{ content: '...', answer: `$25$`, mark: '0.25' },
										{ content: '...', answer: `$35$`, mark: '0.25' },
										`$45$`,
										'—'
									],
									['التكرار', ...freqs.map((f) => `$${f}$`), `$${N}$`],
									[
										'ت. م. صاعد',
										`$${cumAsc[0]}$`,
										{ content: '...', answer: `$${cumAsc[1]}$`, mark: '0.25' },
										{ content: '...', answer: `$${cumAsc[2]}$`, mark: '0.25' },
										`$${cumAsc[3]}$`,
										'—'
									]
								]
							},
							{
								type: 'image',
								src: svgPath,
								caption: 'تمثيل التكرارات حسب الفئات'
							}
						]
					},
					{
						type: 'text',
						content: `1) أتمم الجدول، ثم احسب المتوسط الحسابي التقريبي $bar(x)$ باستعمال مراكز الفئات.`,
						answer: `1) مراكز الفئات: $15, 25, 35, 45$. التكرارات المجمعة الصاعدة: ${cumAsc.join(' ، ')}.\n\nالمتوسط: $bar(x) = frac(${centers.map((c, i) => `${c} times ${freqs[i]}`).join(' + ')}, ${N}) = frac(${weightedSum}, ${N}) = ${fmtNum(mean)}$ دقيقة.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) حدّد الفئة الوسيطية، ثم احسب النسبة المئوية للتلاميذ الذين يستعملون الإنترنت $30$ دقيقة فأكثر.`,
						answer: `2) نصف التكرار الكلي هو $frac(${N}, 2) = ${halfN}$. من سطر التكرار المجمع الصاعد تقع الرتبتان $${halfN}$ و $${halfN + 1}$ في الفئة الوسيطية ${classLabelsDisplay[medClassIdx]}.\n\nعدد التلاميذ ($>= 30$ د): $${freqs[2]} + ${freqs[3]} = ${ge30Count}$ تلميذاً، ونسبتهم $frac(${ge30Count}, ${N}) times 100 = ${fmtNum(ge30Pct)}$%.`,
						mark: '1'
					}
				]
			},
			hints: [
				'مركز الفئة $[a ; b[$ يُحسب بالعلاقة $\\frac{a + b}{2}$.',
				`لحساب المتوسط المتوازن في حالة فئات، اضرب مركز كل فئة في تكرارها واقسم المجموع على $${N}$.`,
				`الفئة الوسيطية هي أول فئة يبلغ أو يتجاوز فيها التكرار المجمع الصاعد نصف التكرار الكلي ($${halfN}$).`
			],
			solutionStepsAr: [
				`مراكز الفئات: $15, 25, 35, 45$، والتكرارات المجمعة الصاعدة: ${cumAsc.join(' ; ')}.`,
				`المتوسط المتوازن: $\\overline{x} = \\frac{${weightedSum}}{${N}} = ${fmtNum(mean)}$ دقيقة.`,
				`الفئة الوسيطية هي ${medClassKatex}، ونسبة التلاميذ بمدة $\\ge 30$ دقيقة هي $${fmtNum(ge30Pct)}\\%$.`
			],
			finalAnswer: `x̄=${fmtNum(mean)}, الفئة ${classLabelsSvg[medClassIdx]}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Integration (8-pt BEM Situation): 2-Tariffs Affine vs Linear Comparison + svgCartesianPlane
// ═══════════════════════════════════════════════════════════════════════════════

const integrationTariffsTemplate: ParameterizedTemplate = {
	id: '4am_t3_integration_tariffs',
	grade: '4am',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية: مقارنة تسعيرتين والدوال والتمثيل البياني',
	curriculumLessonId: 'lesson_4am_t3_integration',
	defaultPoints: 8,
	isIntegration: true,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 6, difficulty);

		// Curated exact integer-intersection 2-tariff parameters with clean vertical axis scales
		const tariffConfigs = [
			{ p1: 200, p2: 100, x0: 4, scaleY: 100 }, // b=400, y0=800 -> plot y0=8, bPlot=4
			{ p1: 200, p2: 100, x0: 6, scaleY: 200 }, // b=600, y0=1200 -> plot y0=6, bPlot=3
			{ p1: 300, p2: 150, x0: 4, scaleY: 200 }, // b=600, y0=1200 -> plot y0=6, bPlot=3
			{ p1: 300, p2: 150, x0: 6, scaleY: 300 }, // b=900, y0=1800 -> plot y0=6, bPlot=3
			{ p1: 400, p2: 200, x0: 5, scaleY: 200 }, // b=1000, y0=2000 -> plot y0=10, bPlot=5
			{ p1: 500, p2: 250, x0: 4, scaleY: 500 }, // b=1000, y0=2000 -> plot y0=4, bPlot=2
			{ p1: 500, p2: 300, x0: 5, scaleY: 500 }, // b=1000, y0=2500 -> plot y0=5, bPlot=2
			{ p1: 600, p2: 300, x0: 4, scaleY: 300 }, // b=1200, y0=2400 -> plot y0=8, bPlot=4
			{ p1: 150, p2: 100, x0: 6, scaleY: 100 }  // b=300, y0=900 -> plot y0=9, bPlot=3
		];
		const cfg = rng.pick(tariffConfigs);
		const b = (cfg.p1 - cfg.p2) * cfg.x0;
		const y0 = cfg.p1 * cfg.x0;

		const y0Plot = y0 / cfg.scaleY;
		const bPlot = b / cfg.scaleY;
		const a1Plot = cfg.p1 / cfg.scaleY;
		const a2Plot = cfg.p2 / cfg.scaleY;

		const xLow = cfg.x0 - 2;
		const xHigh = cfg.x0 + 3;
		const fLow = cfg.p1 * xLow;
		const gLow = cfg.p2 * xLow + b;
		const fHigh = cfg.p1 * xHigh;
		const gHigh = cfg.p2 * xHigh + b;

		// Budget M DA: exact affordable xM under Tariff B (xM > x0)
		const xBudgetB = cfg.x0 + 4;
		const budgetM = cfg.p2 * xBudgetB + b;
		const xBudgetA = Math.floor(budgetM / cfg.p1);
		const budgetAFull = xBudgetA * cfg.p1;

		const xMax = cfg.x0 + 3;
		const yMax = y0Plot + 3;

		const svg = svgCartesianPlane({
			xMin: 0,
			xMax,
			yMin: 0,
			yMax,
			lines: [
				{ a: a1Plot, b: 0, label: '(df)', color: '#2563eb' },
				{ a: a2Plot, b: bPlot, label: '(dg)', color: '#059669' }
			],
			points: [
				{ x: cfg.x0, y: y0Plot, label: 'I', color: '#dc2626' },
				{ x: 0, y: bPlot, label: 'B', color: '#059669' }
			]
		});
		const svgPath = saveSvgAsset(`4am_t3_integ_${difficulty}_s${seed}`, svg);

		const contexts = [
			{
				place: 'نادٍ رياضي',
				unitSing: 'حصة',
				unitPlur: 'حصص',
				xDesc: 'عدد الحصص خلال الشهر'
			},
			{
				place: 'مكتبة للمطالعة',
				unitSing: 'كتاب',
				unitPlur: 'كتب',
				xDesc: 'عدد الكتب المستعارة خلال السنة'
			},
			{
				place: 'فضاء ثقافي وعلمي',
				unitSing: 'زيارة',
				unitPlur: 'زيارات',
				xDesc: 'عدد الزيارات خلال الفصل'
			}
		];
		const ctx = rng.pick(contexts);

		const fExpr = `${cfg.p1}x`;
		const gExpr = `${cfg.p2}x + ${b}`;

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			const wrongDiv = Math.round(b / cfg.p1);
			const wrongSum = Math.round(b / (cfg.p1 + cfg.p2));
			const wrongPlus = cfg.x0 + 2;
			const mcq = buildUniqueMcqOptions(
				`$x = ${cfg.x0}$ (${y0}\\text{ DA})`,
				[
					{
						text: `$x = ${wrongDiv === cfg.x0 ? cfg.x0 + 1 : wrongDiv}$ (${cfg.p1 * (wrongDiv === cfg.x0 ? cfg.x0 + 1 : wrongDiv)}\\text{ DA})`,
						diagnosticFeedback: `قسمت مبلغ الاشتراك على $${cfg.p1}$ مباشرة بدلاً من طرح $${cfg.p2}x$ من $${cfg.p1}x$ أولاً!`
					},
					{
						text: `$x = ${wrongSum === cfg.x0 || wrongSum === wrongDiv ? cfg.x0 - 1 : wrongSum}$ (${y0 - cfg.p1}\\text{ DA})`,
						diagnosticFeedback: 'عند نقل $p_2 x$ إلى الطرف الآخر نطرحه من $p_1 x$ ولا نجمعهما!'
					},
					{
						text: `$x = ${wrongPlus}$ (${cfg.p1 * wrongPlus}\\text{ DA})`,
						diagnosticFeedback: 'تحقق من نقطة تقاطع المستقيمين $I$ على البيان أو حل المعادلة $f(x) = g(x)$.'
					}
				],
				rng
			);
			const qText = `يقترح ${ctx.place} صيغتين: الصيغة (أ) $f(x) = ${fExpr}$ والصيغة (ب) $g(x) = ${gExpr}$ (بالدينار). عند أي عدد $x$ يتساوى مبلغ الصيغتين؟`;
			quizQuestion = {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: `مقارنة الصيغتين بيانياً (كل وحدة على محور التراتيب = ${cfg.scaleY} DA)`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `يتساوى المبلغان عندما $f(x) = g(x)$، أي $${fExpr} = ${gExpr} \\implies ${cfg.p1 - cfg.p2}x = ${b} \\implies x = ${cfg.x0}$، بمبلغ $${y0}\\text{ DA}$.`
			};
			finalAnswer = `x = ${cfg.x0} (${y0} DA)`;
		} else if (difficulty === 'medium') {
			const wrongDivP2 = Math.round(b / cfg.p2);
			const mcq = buildUniqueMcqOptions(
				`$x > ${cfg.x0}$`,
				[
					{
						text: `$x < ${cfg.x0}$`,
						diagnosticFeedback: `عندما $x < ${cfg.x0}$ يكون $f(x) < g(x)$، أي أن الصيغة (أ) هي الأوفر وليس الصيغة (ب)!`
					},
					{
						text: `$x = ${cfg.x0}$`,
						diagnosticFeedback: `عند $x = ${cfg.x0}$ تتساوى الصيغتان تماماً ($${y0}\\text{ DA}$)، والمطلوب متى تكون الصيغة (ب) أوفر تماماً.`
					},
					{
						text: `$x > ${wrongDivP2 === cfg.x0 ? cfg.x0 + 2 : wrongDivP2}$`,
						diagnosticFeedback: `احل المتراجحة $${gExpr} < ${fExpr}$ بطرح $${cfg.p2}x$ من الطرفين: $${b} < ${cfg.p1 - cfg.p2}x$.`
					}
				],
				rng
			);
			const qText = `يقترح ${ctx.place} الصيغة (أ) $f(x) = ${fExpr}$ والصيغة (ب) $g(x) = ${gExpr}$ (بالدينار). متى تكون الصيغة **(ب) أوفر تماماً** من الصيغة (أ)؟`;
			quizQuestion = {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: `مقارنة الصيغتين بيانياً (كل وحدة على محور التراتيب = ${cfg.scaleY} DA)`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `تكون الصيغة (ب) أوفر تماماً عندما $g(x) < f(x)$، أي $${gExpr} < ${fExpr} \\implies ${b} < ${cfg.p1 - cfg.p2}x \\implies x > ${cfg.x0}$. (بيانياً: المستقيم $(d_g)$ يقع تحت $(d_f)$ من أجل $x > ${cfg.x0}$).`
			};
			finalAnswer = `x > ${cfg.x0}`;
		} else {
			// Hard: budget maximization
			const wrongForgetSub = Math.floor(budgetM / cfg.p2);
			const wrongUseA = xBudgetA;
			const wrongAddOne = xBudgetB + 1;
			const mcq = buildUniqueMcqOptions(
				`$${xBudgetB}$ ${ctx.unitPlur} (بالصيغة ب)`,
				[
					{
						text: `$${wrongUseA}$ ${ctx.unitPlur} (بالصيغة أ)`,
						diagnosticFeedback: `استعملت الصيغة (أ)؛ لكن بما أن المبلغ يتجاوز $${y0}\\text{ DA}$ فإن الصيغة (ب) تمنح عدداً أكبر!`
					},
					{
						text: `$${wrongForgetSub === xBudgetB ? xBudgetB + 2 : wrongForgetSub}$ ${ctx.unitPlur} (بالصيغة ب)`,
						diagnosticFeedback: `نسيت طرح مبلغ الاشتراك الثابت ($${b}\\text{ DA}$) من الميزانية قبل القسمة على $${cfg.p2}$!`
					},
					{
						text: `$${wrongAddOne}$ ${ctx.unitPlur} (بالصيغة ب)`,
						diagnosticFeedback: `تحقق من الحساب: $g(${wrongAddOne}) = ${cfg.p2 * wrongAddOne + b}\\text{ DA} > ${budgetM}\\text{ DA}$!`
					}
				],
				rng
			);
			const qText = `يمتلك زبون ميزانية قدرها $${budgetM}\\text{ DA}$ ويريد الحصول على أكبر عدد ممكن من الـ${ctx.unitPlur} بين الصيغة (أ) $f(x) = ${fExpr}$ والصيغة (ب) $g(x) = ${gExpr}$. ما هو أكبر عدد ممكن يمكنه الحصول عليه؟`;
			quizQuestion = {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: `التمثيل البياني للمقارنة (1 وحدة عمودية = ${cfg.scaleY} DA)`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `بالصيغة (أ): $\\frac{${budgetM}}{${cfg.p1}} \\approx ${fmtNum(budgetM / cfg.p1)}$ أي $${xBudgetA}$ على الأكثر. بالصيغة (ب): نحل $${gExpr} = ${budgetM} \\implies ${cfg.p2}x = ${budgetM - b} \\implies x = ${xBudgetB}$. إذن أكبر عدد هو $${xBudgetB}$ بالصيغة (ب).`
			};
			finalAnswer = `${xBudgetB} ${ctx.unitPlur}`;
		}

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `يقترح ${ctx.place} على زبائنه صيغتين للدفع خلال فترة معينة:\n- الصيغة (أ): دفع مبلغ $${cfg.p1}$ دج لكل ${ctx.unitSing} واحدة دون اشتراك.\n- الصيغة (ب): دفع مبلغ اشتراك ثابت قدره $${b}$ دج، ثم $${cfg.p2}$ دج لكل ${ctx.unitSing} واحدة.`,
				content: [
					{
						type: 'text',
						content: 'الجزء الأول: الجدول والتعبير الجبري\n\n1) انقل وأتمم الجدول الآتي لحساب التكلفة بكل صيغة:'
					},
					{
						type: 'table',
						headerBackground: true,
						headers: [`${ctx.xDesc} ($x$)`, `$${xLow}$`, `$${xHigh}$`],
						cells: [],
						rows: [
							[
								'التكلفة بالصيغة (أ) بالدج',
								{ content: '......', answer: `$${fLow}$`, mark: '0.5' },
								{ content: '......', answer: `$${fHigh}$`, mark: '0.5' }
							],
							[
								'التكلفة بالصيغة (ب) بالدج',
								{ content: '......', answer: `$${gLow}$`, mark: '0.5' },
								{ content: '......', answer: `$${gHigh}$`, mark: '0.5' }
							]
						]
					},
					{
						type: 'text',
						content: `2) نضع $x$ ${ctx.xDesc}. عبّر بدلالة $x$ عن المبلغ المدفوع $f(x)$ بالصيغة (أ)، والمبلغ المدفوع $g(x)$ بالصيغة (ب)، وحدّد طبيعة كل دالة.`,
						answer: `2) بالصيغة (أ): $f(x) = ${fExpr}$ (دالة خطية معاملها $${cfg.p1}$).\n\nبالصيغة (ب): $g(x) = ${gExpr}$ (دالة تآلفية معامل توجيهها $${cfg.p2}$ وترتيبها عند المبدأ $${b}$).`,
						mark: '1'
					},
					{
						type: 'text',
						content: `الجزء الثاني: المقارنة الجبرية\n\n1) حل المعادلة $g(x) = f(x)$ ثم المتراجحة $g(x) < f(x)$.\n\n2) فسّر الحلّين لاختيار الصيغة الأوفر حسب عدد الـ${ctx.unitPlur} $x$.`,
						answer: `1) المعادلة $g(x) = f(x)$: $${gExpr} = ${fExpr}$ ومنه $${cfg.p1 - cfg.p2}x = ${b}$ أي $x = ${cfg.x0}$.\n\nالمتراجحة $g(x) < f(x)$: $${gExpr} < ${fExpr}$ ومنه $${b} < ${cfg.p1 - cfg.p2}x$ أي $x > ${cfg.x0}$.\n\n2) التفسير: يتساوى المبلغان عند $${cfg.x0}$ ${ctx.unitPlur} ($${y0}$ دج). الصيغة (ب) أوفر عندما $x > ${cfg.x0}$، والصيغة (أ) أوفر عندما $x < ${cfg.x0}$.`,
						mark: '1.5'
					},
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `الجزء الثالث: القراءة البيانية والميزانية\n\nيمثل المعلم المرفق المستقيمين $(d_f)$ و $(d_g)$ الممثلين للدالتين $f$ و $g$ بحيث كل وحدة على محور الفواصل تمثّل $1$ ${ctx.unitSing}، وكل وحدة على محور التراتيب تمثّل $${cfg.scaleY}$ دج.\n\n1) اقرأ من البيان إحداثيي نقطة التقاطع $I$، واستنتج من البيان متى يقع $(d_g)$ أسفل $(d_f)$ وما معنى ذلك.`,
								answer: `1) إحداثيا نقطة التقاطع على المعلم هما $(${cfg.x0} ; ${y0Plot})$، أي أن عند $x = ${cfg.x0}$ ${ctx.unitPlur} يتساوى المبلغان ويساويان $${y0Plot} times ${cfg.scaleY} = ${y0}$ دج.\n\nيقع المستقيم $(d_g)$ أسفل $(d_f)$ ابتداءً من الفاصلة $x > ${cfg.x0}$، مما يؤكد أن الصيغة (ب) هي الأوفر عندما يتجاوز العدد $${cfg.x0}$.`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: svgPath,
								caption: `التمثيل البياني (1 وحدة عمودية = ${cfg.scaleY} دج)`
							}
						]
					},
					{
						type: 'text',
						content: `2) خصّص زبون مبلغاً قدره $${budgetM}$ دج للاستفادة من أكبر عدد ممكن من الـ${ctx.unitPlur}. ما هو أكبر عدد يمكنه الحصول عليه، وبأي صيغة؟ برّر حسابياً.`,
						answer: `2) بالصيغة (أ): نحل $${fExpr} <= ${budgetM}$ فنجد $x <= frac(${budgetM}, ${cfg.p1}) = ${fmtNum(budgetM / cfg.p1)}$، أي $${xBudgetA}$ ${ctx.unitPlur} على الأكثر (بتكلفة $${budgetAFull}$ دج).\n\nبالصيغة (ب): نحل $${gExpr} <= ${budgetM}$ أي $${cfg.p2}x <= ${budgetM - b}$ ومنه $x <= ${xBudgetB}$.\n\nبما أن $${xBudgetB} > ${xBudgetA}$، يختار الزبون الصيغة (ب) للحصول على $${xBudgetB}$ ${ctx.unitPlur}.`,
						mark: '2'
					}
				]
			},
			hints: [
				`الدالة الخطية لا تتضمن مبلغاً ثابتاً ($f(x) = ${fExpr}$)، بينما الدالة التآلفية تضيف الاشتراك الثابت ($g(x) = ${gExpr}$).`,
				`المستقيم الذي يقع أسفل الآخر في التمثيل البياني هو الذي يمثل التسعيرة الأقل تكلفة (الأوفر).`,
				`لحساب أكبر عدد من الـ${ctx.unitPlur} بمبلغ $${budgetM}\\text{ DA}$، قارن بين حل المتراجحتين $f(x) \\le ${budgetM}$ و$g(x) \\le ${budgetM}$.`
			],
			solutionStepsAr: [
				`الدالتان هما $f(x) = ${fExpr}$ (خطية) و$g(x) = ${gExpr}$ (تآلفية).`,
				`يتساوى العرضان عند $f(x) = g(x) \\implies x = ${cfg.x0}$ بمبلغ $${y0}\\text{ DA}$، وتكون (ب) أوفر عندما $x > ${cfg.x0}$.`,
				`نقطة التقاطع على المعلم هي $I(${cfg.x0} ; ${y0Plot})$ بترتيب يوافق $${y0}\\text{ DA}$ (السلم $1 \\leftrightarrow ${cfg.scaleY}\\text{ DA}$).`,
				`بميزانية $${budgetM}\\text{ DA}$ نحصل بالصيغة (أ) على $${xBudgetA}$ وبالصيغة (ب) على $${xBudgetB}$، إذن الأفضل الصيغة (ب) لـ $${xBudgetB}$ ${ctx.unitPlur}.`
			],
			finalAnswer
		};
	}
};

export const TEMPLATES_4AM_T3: ParameterizedTemplate[] = [
	linearSystemsTemplate,
	linearAffineFunctionsTemplate,
	rotationAnglesPolygonsTemplate,
	sphereSectionsScalingTemplate,
	statisticsTemplate,
	integrationTariffsTemplate
];
