import type { InteractiveLessonData } from '../../types';
import { svgFunctionCurvePlot } from '../../svg-secondary';

// ===========================================================================
// SVG visual helpers for 1AS TCST T1 (numbers, order, intervals, functions)
// ===========================================================================

const SVG_FONT = 'Cairo,Arial,sans-serif';

function svgWrap(w: number, h: number, body: string): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:${SVG_FONT}">${body}</svg>`;
}

const f1 = (n: number): string => n.toFixed(1);

/** Nested number sets N ⊂ Z ⊂ D ⊂ Q ⊂ R with one witness number per ring. */
function svgNumberSetsDiagram(): string {
	const cx = 190;
	const cy = 115;
	const rings: Array<{ rx: number; ry: number; fill: string; stroke: string; letter: string; sample: string }> = [
		{ rx: 175, ry: 105, fill: '#fef2f2', stroke: '#dc2626', letter: 'R', sample: '√2' },
		{ rx: 140, ry: 84, fill: '#fff7ed', stroke: '#ea580c', letter: 'Q', sample: '1/3' },
		{ rx: 105, ry: 63, fill: '#fefce8', stroke: '#ca8a04', letter: 'D', sample: '2.75' },
		{ rx: 72, ry: 42, fill: '#f0fdf4', stroke: '#16a34a', letter: 'Z', sample: '-3' },
		{ rx: 40, ry: 21, fill: '#eff6ff', stroke: '#2563eb', letter: 'N', sample: '5' }
	];
	const parts: string[] = [];
	for (const r of rings) {
		parts.push(`<ellipse cx="${cx}" cy="${cy}" rx="${r.rx}" ry="${r.ry}" fill="${r.fill}" stroke="${r.stroke}" stroke-width="1.8"/>`);
	}
	for (let i = 0; i < rings.length; i++) {
		const r = rings[i];
		const inner = i + 1 < rings.length ? rings[i + 1].rx : 0;
		const mid = (r.rx + inner) / 2;
		if (i === rings.length - 1) {
			parts.push(`<text x="${cx}" y="${cy - 3}" text-anchor="middle" font-size="14" font-weight="bold" fill="${r.stroke}">${r.letter}</text>`);
			parts.push(`<text x="${cx}" y="${cy + 14}" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">${r.sample}</text>`);
		} else {
			parts.push(`<text x="${f1(cx - mid)}" y="${cy + 5}" text-anchor="middle" font-size="14" font-weight="bold" fill="${r.stroke}">${r.letter}</text>`);
			parts.push(`<text x="${f1(cx + mid)}" y="${cy + 5}" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">${r.sample}</text>`);
		}
	}
	return svgWrap(380, 230, parts.join(''));
}

/** Geometric construction of sqrt(2) on the number line: diagonal of the unit square. */
function svgSqrt2Construction(): string {
	const x0 = 50;
	const u = 80;
	const y = 170;
	const d = u * Math.SQRT2;
	const parts: string[] = [];
	parts.push(`<line x1="30" y1="${y}" x2="350" y2="${y}" stroke="#0f172a" stroke-width="1.8"/>`);
	parts.push(`<polygon points="354,${y} 345,${y - 4} 345,${y + 4}" fill="#0f172a"/>`);
	for (let k = 0; k <= 3; k++) {
		const px = x0 + k * u;
		parts.push(`<line x1="${px}" y1="${y - 5}" x2="${px}" y2="${y + 5}" stroke="#0f172a" stroke-width="1.5"/>`);
		parts.push(`<text x="${px}" y="${y + 20}" text-anchor="middle" font-size="12" fill="#0f172a">${k}</text>`);
	}
	parts.push(`<polygon points="${x0},${y} ${x0 + u},${y} ${x0 + u},${y - u} ${x0},${y - u}" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/>`);
	parts.push(`<line x1="${x0}" y1="${y}" x2="${x0 + u}" y2="${y - u}" stroke="#dc2626" stroke-width="2.4"/>`);
	parts.push(`<path d="M ${x0 + u} ${y - u} A ${f1(d)} ${f1(d)} 0 0 1 ${f1(x0 + d)} ${y}" fill="none" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="5,4"/>`);
	parts.push(`<circle cx="${f1(x0 + d)}" cy="${y}" r="5" fill="#dc2626"/>`);
	parts.push(`<text x="${f1(x0 + d)}" y="${y - 12}" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">√2 ≈ 1.414</text>`);
	parts.push(`<text x="${x0 + u / 2}" y="${y - u / 2 + 4}" text-anchor="middle" font-size="12" font-weight="bold" fill="#1d4ed8">1</text>`);
	parts.push(`<text x="${x0 + u / 2 - 14}" y="${y - u / 2 - 14}" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">d</text>`);
	parts.push(`<text x="${x0 + 100}" y="40" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">d² = 1² + 1² = 2</text>`);
	parts.push(`<text x="${x0 + 100}" y="58" text-anchor="middle" font-size="11" fill="#475569">القطر d يمثل العدد √2 على المستقيم العددي</text>`);
	return svgWrap(380, 205, parts.join(''));
}

/** Logarithmic ruler of powers of ten with three scientific-notation markers. */
function svgPowersOfTenScale(): string {
	const x0 = 40;
	const step = 45;
	const y = 100;
	const px = (e: number) => x0 + (e + 3) * step;
	const parts: string[] = [];
	parts.push(`<line x1="25" y1="${y}" x2="360" y2="${y}" stroke="#0f172a" stroke-width="2"/>`);
	parts.push(`<polygon points="366,${y} 357,${y - 4} 357,${y + 4}" fill="#0f172a"/>`);
	for (let e = -3; e <= 4; e++) {
		parts.push(`<line x1="${px(e)}" y1="${y - 7}" x2="${px(e)}" y2="${y + 7}" stroke="#0f172a" stroke-width="1.8"/>`);
		parts.push(`<text x="${px(e) - 3}" y="${y + 26}" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">10<tspan dy="-6" font-size="9">${e}</tspan></text>`);
	}
	const marks: Array<{ v: number; label: string; color: string; up: number }> = [
		{ v: 0.0045, label: '4.5 × 10^-3', color: '#2563eb', up: 40 },
		{ v: 1.8, label: '1.8', color: '#16a34a', up: 40 },
		{ v: 6000, label: '6 × 10^3', color: '#dc2626', up: 40 }
	];
	for (const m of marks) {
		const x = px(Math.log10(m.v));
		parts.push(`<line x1="${f1(x)}" y1="${y}" x2="${f1(x)}" y2="${y - m.up}" stroke="${m.color}" stroke-width="1.6" stroke-dasharray="3,3"/>`);
		parts.push(`<circle cx="${f1(x)}" cy="${y}" r="4.5" fill="${m.color}"/>`);
		parts.push(`<text x="${f1(x)}" y="${y - m.up - 6}" text-anchor="middle" font-size="11" font-weight="bold" fill="${m.color}">${m.label}</text>`);
	}
	parts.push(`<text x="190" y="22" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">سلم قوى العدد 10 وموضع الأعداد بالكتابة العلمية</text>`);
	return svgWrap(380, 150, parts.join(''));
}

/** Spiral of right triangles that constructs sqrt(2), sqrt(3), ..., sqrt(7) with a ruler and a set square. */
function svgRadicalSpiral(): string {
	const s = 46;
	const cx = 190;
	const cy = 135;
	const toPx = (x: number, y: number): [number, number] => [cx + x * s, cy - y * s];
	const parts: string[] = [];
	let theta = 0;
	let prev: [number, number] = [1, 0];
	const pts: Array<[number, number]> = [prev];
	for (let k = 1; k <= 6; k++) {
		const r = Math.sqrt(k);
		theta += Math.atan(1 / r);
		const rr = Math.sqrt(k + 1);
		pts.push([rr * Math.cos(theta), rr * Math.sin(theta)]);
	}
	const o = toPx(0, 0);
	for (let k = 0; k < pts.length; k++) {
		const p = toPx(pts[k][0], pts[k][1]);
		parts.push(`<line x1="${f1(o[0])}" y1="${f1(o[1])}" x2="${f1(p[0])}" y2="${f1(p[1])}" stroke="#2563eb" stroke-width="1.4"/>`);
		if (k > 0) {
			const q = toPx(pts[k - 1][0], pts[k - 1][1]);
			parts.push(`<line x1="${f1(q[0])}" y1="${f1(q[1])}" x2="${f1(p[0])}" y2="${f1(p[1])}" stroke="#dc2626" stroke-width="2"/>`);
		}
	}
	parts.push(`<line x1="${f1(o[0])}" y1="${f1(o[1])}" x2="${f1(toPx(1, 0)[0])}" y2="${f1(toPx(1, 0)[1])}" stroke="#16a34a" stroke-width="2.4"/>`);
	parts.push(`<circle cx="${f1(o[0])}" cy="${f1(o[1])}" r="3.5" fill="#0f172a"/>`);
	parts.push(`<text x="${f1(o[0] - 12)}" y="${f1(o[1] + 14)}" font-size="11" font-weight="bold" fill="#0f172a">O</text>`);
	for (let k = 0; k < pts.length; k++) {
		const a = Math.atan2(pts[k][1], pts[k][0]);
		const rr = Math.sqrt(k + 1) + 0.28;
		const lp = toPx(rr * Math.cos(a), rr * Math.sin(a));
		const label = k === 0 ? '1' : `√${k + 1}`;
		parts.push(`<circle cx="${f1(toPx(pts[k][0], pts[k][1])[0])}" cy="${f1(toPx(pts[k][0], pts[k][1])[1])}" r="3" fill="#0f172a"/>`);
		parts.push(`<text x="${f1(lp[0])}" y="${f1(lp[1] + 4)}" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${label}</text>`);
	}
	parts.push(`<text x="190" y="18" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">حلزون فيثاغورس: الوتر ينشئ √2 ثم √3 ثم √4 ...</text>`);
	return svgWrap(380, 270, parts.join(''));
}

/** Tolerance band |d - 12| <= 0.05 drawn on a graduated number line. */
function svgToleranceLine(): string {
	const y = 100;
	const px = (v: number) => 40 + ((v - 11.9) / 0.2) * 300;
	const parts: string[] = [];
	parts.push(`<line x1="25" y1="${y}" x2="355" y2="${y}" stroke="#0f172a" stroke-width="2"/>`);
	parts.push(`<polygon points="361,${y} 352,${y - 4} 352,${y + 4}" fill="#0f172a"/>`);
	for (const v of [11.9, 11.95, 12, 12.05, 12.1]) {
		parts.push(`<line x1="${f1(px(v))}" y1="${y - 6}" x2="${f1(px(v))}" y2="${y + 6}" stroke="#0f172a" stroke-width="1.6"/>`);
		parts.push(`<text x="${f1(px(v))}" y="${y + 24}" text-anchor="middle" font-size="11" fill="#0f172a">${v}</text>`);
	}
	parts.push(`<line x1="${f1(px(11.95))}" y1="${y}" x2="${f1(px(12.05))}" y2="${y}" stroke="#2563eb" stroke-width="7" stroke-linecap="butt"/>`);
	parts.push(`<circle cx="${f1(px(11.95))}" cy="${y}" r="5.5" fill="#2563eb"/>`);
	parts.push(`<circle cx="${f1(px(12.05))}" cy="${y}" r="5.5" fill="#2563eb"/>`);
	parts.push(`<circle cx="${f1(px(12))}" cy="${y}" r="4.5" fill="#dc2626"/>`);
	parts.push(`<text x="${f1(px(12))}" y="${y - 40}" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">a = 12</text>`);
	parts.push(`<path d="M ${f1(px(12))} ${y - 34} L ${f1(px(12))} ${y - 10}" stroke="#dc2626" stroke-width="1.4" fill="none"/>`);
	parts.push(`<path d="M ${f1(px(12))} ${y - 18} L ${f1(px(12.05) - 4)} ${y - 18}" stroke="#16a34a" stroke-width="1.6" fill="none"/>`);
	parts.push(`<polygon points="${f1(px(12.05))},${y - 18} ${f1(px(12.05) - 8)},${y - 22} ${f1(px(12.05) - 8)},${y - 14}" fill="#16a34a"/>`);
	parts.push(`<path d="M ${f1(px(12))} ${y - 18} L ${f1(px(11.95) + 4)} ${y - 18}" stroke="#16a34a" stroke-width="1.6" fill="none"/>`);
	parts.push(`<polygon points="${f1(px(11.95))},${y - 18} ${f1(px(11.95) + 8)},${y - 22} ${f1(px(11.95) + 8)},${y - 14}" fill="#16a34a"/>`);
	parts.push(`<text x="${f1(px(12.03))}" y="${y - 24}" text-anchor="middle" font-size="11" font-weight="bold" fill="#16a34a">r = 0.05</text>`);
	parts.push(`<text x="190" y="22" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">|d - 12| ≤ 0.05  ⟺  d ∈ [11.95 , 12.05]</text>`);
	parts.push(`<text x="190" y="150" text-anchor="middle" font-size="11" fill="#475569">المسافة بين d و 12 لا تتجاوز 0.05 (مقاس القطر بالمليمتر)</text>`);
	return svgWrap(380, 165, parts.join(''));
}

type IntervalSeg = { from: number | null; to: number | null; closedFrom?: boolean; closedTo?: boolean };

/** Rows of intervals aligned on a shared graduated axis (null bound = unbounded side). */
function svgIntervalRows(opts: {
	min: number;
	max: number;
	rows: Array<{ label: string; color: string; segs: IntervalSeg[] }>;
}): string {
	const left = 78;
	const right = 350;
	const top = 18;
	const rowH = 34;
	const px = (v: number) => left + ((v - opts.min) / (opts.max - opts.min)) * (right - left);
	const axisY = top + opts.rows.length * rowH + 8;
	const h = axisY + 34;
	const parts: string[] = [];
	for (let v = Math.ceil(opts.min); v <= Math.floor(opts.max); v++) {
		parts.push(`<line x1="${f1(px(v))}" y1="${top - 6}" x2="${f1(px(v))}" y2="${axisY}" stroke="#e2e8f0" stroke-width="1"/>`);
		parts.push(`<line x1="${f1(px(v))}" y1="${axisY - 5}" x2="${f1(px(v))}" y2="${axisY + 5}" stroke="#0f172a" stroke-width="1.5"/>`);
		parts.push(`<text x="${f1(px(v))}" y="${axisY + 20}" text-anchor="middle" font-size="11" fill="#0f172a">${v}</text>`);
	}
	parts.push(`<line x1="${left - 14}" y1="${axisY}" x2="${right + 14}" y2="${axisY}" stroke="#0f172a" stroke-width="1.8"/>`);
	parts.push(`<polygon points="${right + 20},${axisY} ${right + 11},${axisY - 4} ${right + 11},${axisY + 4}" fill="#0f172a"/>`);
	opts.rows.forEach((row, i) => {
		const ry = top + i * rowH + rowH / 2;
		parts.push(`<text x="8" y="${ry + 4}" font-size="12" font-weight="bold" fill="${row.color}">${row.label}</text>`);
		for (const seg of row.segs) {
			const xa = seg.from === null ? left - 14 : px(seg.from);
			const xb = seg.to === null ? right + 14 : px(seg.to);
			parts.push(`<line x1="${f1(xa)}" y1="${ry}" x2="${f1(xb)}" y2="${ry}" stroke="${row.color}" stroke-width="5" stroke-opacity="0.75"/>`);
			if (seg.from === null) parts.push(`<polygon points="${f1(xa - 6)},${ry} ${f1(xa + 3)},${ry - 6} ${f1(xa + 3)},${ry + 6}" fill="${row.color}"/>`);
			else parts.push(`<circle cx="${f1(xa)}" cy="${ry}" r="5" fill="${seg.closedFrom ? row.color : '#ffffff'}" stroke="${row.color}" stroke-width="2"/>`);
			if (seg.to === null) parts.push(`<polygon points="${f1(xb + 6)},${ry} ${f1(xb - 3)},${ry - 6} ${f1(xb - 3)},${ry + 6}" fill="${row.color}"/>`);
			else parts.push(`<circle cx="${f1(xb)}" cy="${ry}" r="5" fill="${seg.closedTo ? row.color : '#ffffff'}" stroke="${row.color}" stroke-width="2"/>`);
		}
	});
	return svgWrap(380, h, parts.join(''));
}

/** Framing of 3x - 4 when 2 <= x <= 5: two aligned number lines linked by the map x -> 3x - 4. */
function svgFramingMap(): string {
	const yTop = 62;
	const yBot = 168;
	const pTop = (v: number) => 40 + v * 50;
	const pBot = (v: number) => 40 + v * 25;
	const parts: string[] = [];
	parts.push(`<text x="190" y="20" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">حصر عبارة: x ↦ 3x - 4 على المجال [2 , 5]</text>`);
	parts.push(`<line x1="25" y1="${yTop}" x2="350" y2="${yTop}" stroke="#0f172a" stroke-width="1.8"/>`);
	for (let v = 0; v <= 6; v++) {
		parts.push(`<line x1="${pTop(v)}" y1="${yTop - 5}" x2="${pTop(v)}" y2="${yTop + 5}" stroke="#0f172a" stroke-width="1.4"/>`);
		parts.push(`<text x="${pTop(v)}" y="${yTop - 10}" text-anchor="middle" font-size="10" fill="#475569">${v}</text>`);
	}
	parts.push(`<line x1="${pTop(2)}" y1="${yTop}" x2="${pTop(5)}" y2="${yTop}" stroke="#2563eb" stroke-width="7" stroke-opacity="0.8"/>`);
	parts.push(`<circle cx="${pTop(2)}" cy="${yTop}" r="5" fill="#2563eb"/><circle cx="${pTop(5)}" cy="${yTop}" r="5" fill="#2563eb"/>`);
	parts.push(`<text x="355" y="${yTop + 4}" font-size="12" font-weight="bold" fill="#2563eb">x</text>`);
	parts.push(`<line x1="25" y1="${yBot}" x2="350" y2="${yBot}" stroke="#0f172a" stroke-width="1.8"/>`);
	for (let v = 0; v <= 12; v += 2) {
		parts.push(`<line x1="${pBot(v)}" y1="${yBot - 5}" x2="${pBot(v)}" y2="${yBot + 5}" stroke="#0f172a" stroke-width="1.4"/>`);
		parts.push(`<text x="${pBot(v)}" y="${yBot + 20}" text-anchor="middle" font-size="10" fill="#475569">${v}</text>`);
	}
	parts.push(`<line x1="${pBot(2)}" y1="${yBot}" x2="${pBot(11)}" y2="${yBot}" stroke="#dc2626" stroke-width="7" stroke-opacity="0.8"/>`);
	parts.push(`<circle cx="${pBot(2)}" cy="${yBot}" r="5" fill="#dc2626"/><circle cx="${pBot(11)}" cy="${yBot}" r="5" fill="#dc2626"/>`);
	parts.push(`<text x="355" y="${yBot + 4}" font-size="12" font-weight="bold" fill="#dc2626">y</text>`);
	parts.push(`<line x1="${pTop(2)}" y1="${yTop + 6}" x2="${pBot(2)}" y2="${yBot - 6}" stroke="#7c3aed" stroke-width="1.6" stroke-dasharray="5,4"/>`);
	parts.push(`<line x1="${pTop(5)}" y1="${yTop + 6}" x2="${pBot(11)}" y2="${yBot - 6}" stroke="#7c3aed" stroke-width="1.6" stroke-dasharray="5,4"/>`);
	parts.push(`<text x="${pTop(2) - 8}" y="${yTop + 44}" text-anchor="end" font-size="11" font-weight="bold" fill="#7c3aed">x=2 ⟶ y=2</text>`);
	parts.push(`<text x="${pTop(5) + 56}" y="${yTop + 44}" text-anchor="middle" font-size="11" font-weight="bold" fill="#7c3aed">x=5 ⟶ y=11</text>`);
	parts.push(`<text x="190" y="${yBot + 42}" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">2 ≤ x ≤ 5  ⟹  2 ≤ 3x - 4 ≤ 11</text>`);
	return svgWrap(380, 232, parts.join(''));
}

/** Sign table of binomials ax + b. cells alternate interval / zero point: length = 2 * xs.length - 3. */
function svgSignTable(opts: { xs: string[]; rows: Array<{ label: string; cells: string[] }> }): string {
	const col0 = 92;
	const n = opts.xs.length;
	const stepW = Math.floor(240 / (n - 1));
	const xPos = (i: number) => col0 + 28 + i * stepW;
	const rowH = 36;
	const w = xPos(n - 1) + 36;
	const h = 8 + rowH * (opts.rows.length + 1) + 8;
	const parts: string[] = [];
	parts.push(`<rect x="4" y="4" width="${w - 8}" height="${h - 8}" fill="#ffffff" stroke="#0f172a" stroke-width="1.4"/>`);
	parts.push(`<line x1="${col0}" y1="4" x2="${col0}" y2="${h - 4}" stroke="#0f172a" stroke-width="1.4"/>`);
	for (let r = 0; r <= opts.rows.length; r++) {
		parts.push(`<line x1="4" y1="${8 + rowH * (r + 1) - 4}" x2="${w - 4}" y2="${8 + rowH * (r + 1) - 4}" stroke="#0f172a" stroke-width="1.2"/>`);
	}
	parts.push(`<text x="${col0 / 2 + 2}" y="${8 + rowH / 2 + 2}" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">x</text>`);
	for (let i = 0; i < n; i++) {
		parts.push(`<text x="${xPos(i)}" y="${8 + rowH / 2 + 2}" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">${opts.xs[i]}</text>`);
	}
	opts.rows.forEach((row, r) => {
		const cy = 8 + rowH * (r + 1) + rowH / 2 + 2;
		parts.push(`<text x="${col0 / 2 + 2}" y="${cy}" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e3a8a">${row.label}</text>`);
		row.cells.forEach((c, j) => {
			let x: number;
			if (j % 2 === 0) x = (xPos(j / 2) + xPos(j / 2 + 1)) / 2;
			else x = xPos((j + 1) / 2);
			if (c === '0') {
				parts.push(`<line x1="${x}" y1="${8 + rowH * (r + 1) - 4 - rowH + 6}" x2="${x}" y2="${8 + rowH * (r + 1) - 4}" stroke="#94a3b8" stroke-width="1.2"/>`);
				parts.push(`<text x="${x}" y="${cy}" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">0</text>`);
			} else if (c === '+' || c === '-') {
				parts.push(`<text x="${x}" y="${cy + 1}" text-anchor="middle" font-size="15" font-weight="bold" fill="${c === '+' ? '#15803d' : '#b91c1c'}">${c}</text>`);
			}
		});
	});
	for (let i = 1; i < n - 1; i++) {
		parts.push(`<line x1="${xPos(i)}" y1="${8 + rowH - 4}" x2="${xPos(i)}" y2="${h - 4}" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3,3"/>`);
	}
	return svgWrap(w, h, parts.join(''));
}

/** Variation table without limits: bounded domain, arrows follow the position of the values. */
function svgMonotonyTable(opts: {
	fnName: string;
	xs: string[];
	vals: Array<{ text: string; pos: 'top' | 'mid' | 'bottom' }>;
}): string {
	const col0 = 84;
	const n = opts.xs.length;
	const stepW = Math.floor(260 / (n - 1));
	const xPos = (i: number) => col0 + 34 + i * stepW;
	const rowH1 = 32;
	const rowH2 = 96;
	const w = xPos(n - 1) + 40;
	const h = 8 + rowH1 + rowH2 + 8;
	const topY = 8 + rowH1 + 22;
	const botY = 8 + rowH1 + rowH2 - 14;
	const midY = (topY + botY) / 2;
	const yOf = (p: 'top' | 'mid' | 'bottom') => (p === 'top' ? topY : p === 'bottom' ? botY : midY);
	const parts: string[] = [];
	parts.push(`<rect x="4" y="4" width="${w - 8}" height="${h - 8}" fill="#ffffff" stroke="#0f172a" stroke-width="1.4"/>`);
	parts.push(`<line x1="${col0}" y1="4" x2="${col0}" y2="${h - 4}" stroke="#0f172a" stroke-width="1.4"/>`);
	parts.push(`<line x1="4" y1="${8 + rowH1}" x2="${w - 4}" y2="${8 + rowH1}" stroke="#0f172a" stroke-width="1.2"/>`);
	parts.push(`<text x="${col0 / 2 + 2}" y="${8 + rowH1 / 2 + 4}" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">x</text>`);
	parts.push(`<text x="${col0 / 2 + 2}" y="${8 + rowH1 + rowH2 / 2 + 4}" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e3a8a">${opts.fnName}</text>`);
	for (let i = 0; i < n; i++) {
		parts.push(`<text x="${xPos(i)}" y="${8 + rowH1 / 2 + 4}" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">${opts.xs[i]}</text>`);
		parts.push(`<text x="${xPos(i)}" y="${yOf(opts.vals[i].pos) + 4}" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">${opts.vals[i].text}</text>`);
	}
	for (let i = 0; i < n - 1; i++) {
		const x1 = xPos(i) + 20;
		const x2 = xPos(i + 1) - 20;
		const dir = Math.sign(yOf(opts.vals[i + 1].pos) - yOf(opts.vals[i].pos));
		const y1 = yOf(opts.vals[i].pos) - 2 + dir * 8;
		const y2 = yOf(opts.vals[i + 1].pos) - 2 - dir * 8;
		const ang = Math.atan2(y2 - y1, x2 - x1);
		parts.push(`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="#1d4ed8" stroke-width="1.8"/>`);
		parts.push(`<polygon points="${f1(x2)},${f1(y2)} ${f1(x2 - 7 * Math.cos(ang - 0.45))},${f1(y2 - 7 * Math.sin(ang - 0.45))} ${f1(x2 - 7 * Math.cos(ang + 0.45))},${f1(y2 - 7 * Math.sin(ang + 0.45))}" fill="#1d4ed8"/>`);
	}
	return svgWrap(w, h, parts.join(''));
}

export const LESSONS_1AS_TCST_T1: InteractiveLessonData[] = [
	// =========================================================================
	// LESSON 1: NUMBER SETS, PRIMES, IRRATIONALITY OF SQRT(2)
	// =========================================================================
	{
		id: 'lesson_1as_tcst_t1_number_sets_primes',
		slug: '1as-tcst-t1-number-sets-primes-irrationality',
		grade: '1as_tcst',
		yearSubjectId: 654,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: الأعداد والحساب (المجموعات، القوى، الجذور، والكتابة العلمية)',
		order: 1,
		titleAr: 'مجموعات الأعداد N, Z, D, Q, R، الأعداد الأولية والتحليل إلى جداء عوامل أولية',
		objectives: [
			'التمييز بين مجموعات الأعداد (الأعداد الطبيعية، الصحيحة النسبية، العشرية، الناطقة، الحقيقية) وخاصية تمييز العدد العشري والناطق والأصم',
			'توظيف البرهان بالخلف لإثبات أن عدداً ليس ناطقاً (مثل إثبات أن √2 ليس عدداً ناطقاً) أو ليس عشرياً (مثل 1/3)',
			'التعرف على أولية عدد طبيعي، تفكيك عدد إلى جداء عوامل أولية واستعماله في حساب PGCD و PPCM وقواعد قابلية القسمة واختزال الكسور'
		],
		keywordsAr: [
			'مجموعات الأعداد',
			'الأعداد الحقيقية',
			'الأعداد الأولية',
			'التحليل إلى جداء عوامل أولية',
			'القاسم المشترك الأكبر PGCD',
			'المضاعف المشترك الأصغر PPCM',
			'البرهان بالخلف'
		],
		discover: {
			scenarioAr:
				'مربع طول ضلعه $1$ وحدة، وقطره $d$ . بتطبيق مبرهنة فيثاغورس نجد $d^2 = 1^2 + 1^2 = 2$ ، أي $d = \\sqrt{2}$ . هل يمكن كتابة هذا الطول على الشكل $\\frac{p}{q}$ حيث $p$ و $q$ عددان طبيعيان؟ سنستكشف مجموعات الأعداد المتداخلة $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$ ثم نبرهن بالخلف أن هذا القطر لا يقيس بعدد ناطق.',
			svg: svgNumberSetsDiagram(),
			steps: [
				{
					promptAr:
						'عيّن أصغر مجموعة عددية من بين $\\mathbb{N}$ ، $\\mathbb{Z}$ ، $\\mathbb{D}$ ، $\\mathbb{Q}$ تنتمي إليها الأعداد $7$ ، $-4$ ، $0.125$ ، $\\frac{1}{3}$ .',
					hintAr: 'العدد العشري يكتب على الشكل $\\frac{k}{10^n}$ حيث $k \\in \\mathbb{Z}$ و $n \\in \\mathbb{N}$ . جرّب كتابة كل عدد بهذا الشكل.',
					expectedInput: 'N, Z, D, Q',
					revealAr:
						'$7 \\in \\mathbb{N}$ ، و $-4 \\in \\mathbb{Z}$ لكنه ليس طبيعياً ، و $0.125 = \\frac{125}{10^3} \\in \\mathbb{D}$ لكنه ليس صحيحاً ، أما $\\frac{1}{3} \\in \\mathbb{Q}$ . والسؤال التالي يبين لماذا $\\frac{1}{3} \\notin \\mathbb{D}$ .'
				},
				{
					promptAr: 'نفترض أن $\\frac{1}{3} = \\frac{k}{10^n}$ مع $k$ و $n$ طبيعيين. أي تناقض ينتج عن ذلك فيما يخص العدد الأولي $3$ ؟',
					hintAr: 'اضرب طرفي المساواة في $3 \\times 10^n$ ثم فكّك $10^n$ إلى جداء عوامل أولية.',
					expectedInput: '10^n = 3k',
					revealAr:
						'من المساواة نحصل على $10^n = 3k$ . لكن $10^n = 2^n \\times 5^n$ ولا يظهر العامل الأولي $3$ في تحليله الوحيد إلى جداء عوامل أولية، بينما $3$ قاسم للطرف الأيمن. هذا تناقض، إذن $\\frac{1}{3} \\notin \\mathbb{D}$ . نكتب: $\\frac{1}{3} \\in \\mathbb{Q} \\setminus \\mathbb{D}$ .'
				},
				{
					promptAr: 'حلل $360$ و $84$ إلى جداء عوامل أولية، ثم استنتج $\\text{PGCD}(360, 84)$ و $\\text{PPCM}(360, 84)$ والكسر المختزل $\\frac{84}{360}$ .',
					hintAr: 'اقسم تباعاً على $2$ ثم $3$ ثم $5$ ثم $7$ . خذ العوامل المشتركة بأصغر أس للقاسم، وكل العوامل بأكبر أس للمضاعف.',
					expectedInput: '12',
					revealAr:
						'$360 = 2^3 \\times 3^2 \\times 5$ و $84 = 2^2 \\times 3 \\times 7$ . إذن $\\text{PGCD} = 2^2 \\times 3 = 12$ و $\\text{PPCM} = 2^3 \\times 3^2 \\times 5 \\times 7 = 2520$ . تحقق: $12 \\times 2520 = 30240 = 360 \\times 84$ . وبقسمة البسط والمقام على $12$ : $\\frac{84}{360} = \\frac{7}{30}$ .'
				},
				{
					promptAr: 'نفترض $\\sqrt{2} = \\frac{p}{q}$ كسراً غير قابل للاختزال ($p$ و $q$ طبيعيان، $q \\neq 0$). أثبت أن $p^2 = 2q^2$ ثم استنتج أن $p$ زوجي.',
					hintAr: 'ربّع الطرفين. ثم ادرس مربع عدد فردي $(2k+1)^2$ وبيّن أنه فردي.',
					expectedInput: 'p زوجي',
					revealAr:
						'بالتربيع: $2 = \\frac{p^2}{q^2}$ أي $p^2 = 2q^2$ ، فـ $p^2$ زوجي. لو كان $p$ فردياً $p = 2k+1$ لكان $p^2 = 4k^2 + 4k + 1$ فردياً، وهذا مستحيل. إذن $p$ زوجي، $p = 2m$ . في الملخص نكمل البرهان ونصل إلى التناقض النهائي.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**تداخل المجموعات**: $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$ . العدد **العشري** يكتب $\\frac{k}{10^n}$ ($k \\in \\mathbb{Z}$ ، $n \\in \\mathbb{N}$)، والعدد **الناطق** يكتب $\\frac{a}{b}$ ($a \\in \\mathbb{Z}$ ، $b \\in \\mathbb{Z}^*$)، والعدد **الأصم** هو عدد حقيقي غير ناطق، ومجموعتهم $\\mathbb{R} \\setminus \\mathbb{Q}$ .',
				'**تمييز العدد العشري**: الكسر المختزل $\\frac{a}{b}$ ($b \\geq 1$) يمثل عدداً عشرياً إذا وفقط إذا كان تحليل $b$ لا يحوي عوامل أولية غير $2$ و $5$ ، أي $b = 2^{\\alpha} \\times 5^{\\beta}$ . مثال: $\\frac{7}{40} \\in \\mathbb{D}$ لكن $\\frac{5}{12} \\notin \\mathbb{D}$ .',
				'**العدد الأولي**: عدد طبيعي $n \\geq 2$ لا يقبل إلا القاسمين $1$ و $n$ . العدد $1$ ليس أولياً، و $2$ هو العدد الأولي الزوجي الوحيد. لاختبار أولية $n$ يكفي اختبار قابلية قسمته على الأعداد الأولية $p$ التي تحقق $p^2 \\leq n$ .',
				'**التحليل الوحيد**: كل عدد طبيعي $n \\geq 2$ يكتب بطريقة وحيدة (إلى ترتيب العوامل) جداءً لعوامل أولية. $\\text{PGCD}(a, b)$ هو جداء العوامل المشتركة بأصغر أس، و $\\text{PPCM}(a, b)$ هو جداء كل العوامل بأكبر أس، ويحقق $\\text{PGCD}(a, b) \\times \\text{PPCM}(a, b) = a \\times b$ . اختزال كسر: القسمة على $\\text{PGCD}$ .',
				'**البرهان بالخلف**: لإثبات قضية $P$ نفترض نفيها ونستنتج تناقضاً مع معطى أو مع نتيجة معلومة، فتكون $P$ صحيحة. أمثلة معيارية: $\\frac{1}{3} \\notin \\mathbb{D}$ و $\\sqrt{2} \\notin \\mathbb{Q}$ .'
			],
			visualSvg: svgSqrt2Construction(),
			visualCaptionAr: 'إنشاء هندسي لـ $\\sqrt{2}$ : قطر مربع طول ضلعه $1$ ينقل بالفرجار إلى المستقيم العددي، فيوجد عدد حقيقي ليس ناطقاً على المستقيم',
			examples: [
				{
					problemAr: 'أثبت بالخلف أن $\\sqrt{2} \\notin \\mathbb{Q}$ ، ثم استنتج أن العدد $3 + 2\\sqrt{2}$ ليس ناطقاً.',
					solutionAr:
						'**البرهان.** نفترض أن $\\sqrt{2} \\in \\mathbb{Q}$ ، فيوجد عددان طبيعيان $p$ و $q \\neq 0$ مع $\\sqrt{2} = \\frac{p}{q}$ وكسر $\\frac{p}{q}$ غير قابل للاختزال، أي ليس للعددين $p$ و $q$ قاسم مشترك أكبر من $1$ .\\n\\n1) بالتربيع: $p^2 = 2q^2$ ، إذن $p^2$ زوجي.\\n\\n2) $p$ زوجي: لو كان $p = 2k + 1$ لكان $p^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$ فردياً، وهذا مستحيل. فنكتب $p = 2m$ .\\n\\n3) نعوض: $4m^2 = 2q^2$ أي $q^2 = 2m^2$ ، فـ $q^2$ زوجي، وبنفس الاستدلال $q$ زوجي.\\n\\n4) إذن $p$ و $q$ زوجيان معاً، فالعدد $2$ قاسم مشترك لهما، وهذا يناقض أن الكسر غير قابل للاختزال. وعليه $\\sqrt{2} \\notin \\mathbb{Q}$ .\\n\\n**الاستنتاج.** لو كان $r = 3 + 2\\sqrt{2} \\in \\mathbb{Q}$ لكان $\\sqrt{2} = \\frac{r - 3}{2} \\in \\mathbb{Q}$ لأن $\\mathbb{Q}$ مغلقة بالجمع والضرب والقسمة على عدد غير معدوم. وهذا يناقض ما سبق، إذن $3 + 2\\sqrt{2} \\in \\mathbb{R} \\setminus \\mathbb{Q}$ .'
				},
				{
					problemAr: 'حلل العددين $756$ و $1080$ إلى جداء عوامل أولية، ثم احسب $\\text{PGCD}$ و $\\text{PPCM}$ واختزل الكسر $\\frac{756}{1080}$ .',
					solutionAr:
						'$756 = 2^2 \\times 3^3 \\times 7$ و $1080 = 2^3 \\times 3^3 \\times 5$ .\\n\\n$\\text{PGCD}(756, 1080) = 2^2 \\times 3^3 = 108$ .\\n\\n$\\text{PPCM}(756, 1080) = 2^3 \\times 3^3 \\times 5 \\times 7 = 7560$ .\\n\\nتحقق: $108 \\times 7560 = 816480 = 756 \\times 1080$ .\\n\\nالكسر: $\\frac{756}{1080} = \\frac{756 \\div 108}{1080 \\div 108} = \\frac{7}{10} = 0.7 \\in \\mathbb{D}$ .'
				},
				{
					problemAr: 'بيّن هل العددان $\\frac{7}{40}$ و $\\frac{5}{12}$ عشريان، وإن كان الأول عشرياً فاكتبه بالشكل $\\frac{k}{10^n}$ .',
					solutionAr:
						'الكسر $\\frac{7}{40}$ مختزل و $40 = 2^3 \\times 5$ لا يحوي سوى العاملين $2$ و $5$ ، فهو عشري: $\\frac{7}{40} = \\frac{7 \\times 25}{40 \\times 25} = \\frac{175}{1000} = 0.175$ .\\n\\nالكسر $\\frac{5}{12}$ مختزل (لأن $\\text{PGCD}(5, 12) = 1$) و $12 = 2^2 \\times 3$ يحوي العامل الأولي $3$ ، فهو ليس عشرياً: $\\frac{5}{12} \\in \\mathbb{Q} \\setminus \\mathbb{D}$ .'
				}
			],
			watchOutAr:
				'$1.414$ ليس هو $\\sqrt{2}$ بل قيمة مقرّبة له: $\\sqrt{2}$ له كتابة عشرية غير منتهية وغير دورية. العدد $1$ ليس أولياً. لا يجوز اختزال كسر قبل التأكد من أن العامل المشترك هو فعلاً قاسم للبسط والمقام معاً. وفي البرهان بالخلف يجب أن تكون الفرضية «الكسر غير قابل للاختزال» مذكورة صراحة، لأنها مصدر التناقض.'
		},
		practice: [
			{
				questionAr: 'أصغر مجموعة عددية من بين $\\mathbb{N}$ ، $\\mathbb{Z}$ ، $\\mathbb{D}$ ، $\\mathbb{Q}$ تحتوي العدد $\\frac{21}{14}$ هي:',
				options: ['$\\mathbb{N}$', '$\\mathbb{Z}$', '$\\mathbb{D}$', '$\\mathbb{Q}$'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: $\\frac{21}{14} = \\frac{3}{2} = 1.5$ ليس عدداً طبيعياً لأن $14$ لا يقسم $21$ .',
					'خطأ: $1.5$ ليس عدداً صحيحاً نسبياً لأن له جزءاً عشرياً غير معدوم.',
					'إجابة صحيحة! $\\frac{21}{14} = \\frac{3}{2} = \\frac{15}{10} \\in \\mathbb{D}$ وهو ليس صحيحاً، فأصغر مجموعة هي $\\mathbb{D}$ .',
					'خطأ: العدد ينتمي فعلاً إلى $\\mathbb{Q}$ لكن توجد مجموعة أصغر منها تحتويه هي $\\mathbb{D}$ ، لأن مقام الكسر المختزل $2$ لا يحوي سوى العاملين $2$ و $5$ .'
				],
				explanationAr: 'نختزل أولاً: $\\frac{21}{14} = \\frac{3}{2}$ . بما أن $2 = 2^1$ فالكسر عشري: $\\frac{3}{2} = \\frac{15}{10} = 1.5 \\in \\mathbb{D}$ . وهو غير صحيح، فأصغر مجموعة من القائمة هي $\\mathbb{D}$ .'
			},
			{
				questionAr: 'قيمة $\\text{PGCD}(504, 630)$ علماً أن $504 = 2^3 \\times 3^2 \\times 7$ و $630 = 2 \\times 3^2 \\times 5 \\times 7$ هي:',
				options: ['$63$', '$126$', '$252$', '$2520$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: $63 = 3^2 \\times 7$ ، لقد أهملت العامل المشترك $2$ بأصغر أس وهو $2^1$ .',
					'إجابة صحيحة! $\\text{PGCD} = 2^1 \\times 3^2 \\times 7 = 126$ ، أي العوامل المشتركة بأصغر أس.',
					'خطأ: $252 = 2^2 \\times 3^2 \\times 7$ ، أخذت الأس $2$ للعامل $2$ مع أن أصغر أس مشترك هو $1$ (لأن $630$ يحوي $2^1$ فقط).',
					'خطأ: $2520 = 2^3 \\times 3^2 \\times 5 \\times 7$ هو $\\text{PPCM}$ وليس $\\text{PGCD}$ .'
				],
				explanationAr: '$\\text{PGCD}(504, 630) = 2^{\\min(3,1)} \\times 3^{\\min(2,2)} \\times 7^{\\min(1,1)} = 2 \\times 9 \\times 7 = 126$ . تحقق مع $\\text{PPCM} = 2520$ : $126 \\times 2520 = 317520 = 504 \\times 630$ .'
			},
			{
				questionAr: 'في البرهان بالخلف على أن $\\sqrt{2} \\notin \\mathbb{Q}$ مع الفرضية $\\sqrt{2} = \\frac{p}{q}$ كسراً غير قابل للاختزال، يظهر التناقض في:',
				options: [
					'$p^2 = 2q^2$ مستحيلة المساواة في $\\mathbb{N}$',
					'$p$ و $q$ زوجيان معاً رغم أن الكسر غير قابل للاختزال',
					'$q$ فردي بينما $p$ زوجي',
					'$\\sqrt{2}$ يساوي $1.414$ تماماً'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: المساواة $p^2 = 2q^2$ ليست مستحيلة بذاتها؛ هي نتيجة مباشرة للفرضية، والتناقض يأتي لاحقاً من استنتاج زوجية $p$ ثم $q$ .',
					'إجابة صحيحة! من $p^2 = 2q^2$ نستنتج $p$ زوجياً ثم $q$ زوجياً، فيقبل الكسر الاختزال على $2$ ، وهذا يناقض الفرضية.',
					'خطأ: لا يوجد في البرهان تناقض من هذا النوع؛ بل نستنتج أن $q$ أيضاً زوجي.',
					'خطأ: $1.414$ قيمة مقرّبة فقط، وليست طرفاً في البرهان.'
				],
				explanationAr: 'من $p^2 = 2q^2$ نحصل على $p = 2m$ ثم $q^2 = 2m^2$ ، فـ $q$ زوجي أيضاً. وجود القاسم المشترك $2$ يناقض فرضية عدم قابلية الكسر للاختزال، فالفرضية $\\sqrt{2} \\in \\mathbb{Q}$ باطلة.'
			}
		]
	},

	// =========================================================================
	// LESSON 2: POWERS, RADICALS, SCIENTIFIC NOTATION
	// =========================================================================
	{
		id: 'lesson_1as_tcst_t1_powers_radicals_scientific_notation',
		slug: '1as-tcst-t1-powers-radicals-scientific-notation',
		grade: '1as_tcst',
		yearSubjectId: 654,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: الأعداد والحساب (المجموعات، القوى، الجذور، والكتابة العلمية)',
		order: 2,
		titleAr: 'الحساب على القوى الصحيحة والجذور التربيعية، الكتابة العلمية ورتبة المقدار',
		objectives: [
			'ممارسة الحساب على قوى عدد حقيقي والجذور التربيعية والدمج بينها في تبسيط عبارات عددية وتنطيق مقامات الكسور',
			'التحويل بين الكتابة الكسرية والكتابة العشرية الدورية لعدد ناطق والتحكم في الحساب الحرفي',
			'كتابة عدد عشري على الشكل العلمي، تدويره إلى 10^(-n)، وتحديد رتبة مقداره لتقدير نتائج العمليات الحسابية والتحقق من معقوليتها'
		],
		keywordsAr: [
			'القوى الصحيحة',
			'الجذور التربيعية',
			'تنطيق المقام',
			'الكتابة العشرية الدورية',
			'الكتابة العلمية',
			'رتبة المقدار',
			'مدور عدد'
		],
		discover: {
			scenarioAr:
				'سرعة الضوء $c = 3 \\times 10^8$ م/ثا والمسافة بين الشمس والأرض $d = 1.496 \\times 10^{11}$ م. نريد حساب زمن وصول الضوء إلينا وتقدير النتيجة بسرعة للتحقق من معقوليتها. هذا يتطلب التحكم في قواعد القوى والجذور والكتابة العلمية ورتبة المقدار.',
			svg: svgPowersOfTenScale(),
			steps: [
				{
					promptAr: 'بسّط الكتابة $\\frac{(2^{-3})^2 \\times 2^5}{2^{-4}}$ وأعط النتيجة على شكل عدد صحيح.',
					hintAr: 'استعمل $(a^m)^n = a^{mn}$ ثم $a^m \\times a^n = a^{m+n}$ و $\\frac{a^m}{a^n} = a^{m-n}$ .',
					expectedInput: '8',
					revealAr: '$(2^{-3})^2 = 2^{-6}$ ، والبسط $2^{-6} \\times 2^5 = 2^{-1}$ ، ثم $\\frac{2^{-1}}{2^{-4}} = 2^{-1-(-4)} = 2^3 = 8$ .'
				},
				{
					promptAr: 'بسّط $A = \\sqrt{72} - \\sqrt{50} + \\sqrt{8}$ بكتابة $A = k\\sqrt{2}$ .',
					hintAr: 'اكتب $72 = 36 \\times 2$ و $50 = 25 \\times 2$ و $8 = 4 \\times 2$ ثم استعمل $\\sqrt{ab} = \\sqrt{a}\\sqrt{b}$ .',
					expectedInput: '3',
					revealAr: '$\\sqrt{72} = 6\\sqrt{2}$ و $\\sqrt{50} = 5\\sqrt{2}$ و $\\sqrt{8} = 2\\sqrt{2}$ ، إذن $A = (6 - 5 + 2)\\sqrt{2} = 3\\sqrt{2}$ .'
				},
				{
					promptAr: 'نطّق مقام الكسر $B = \\frac{1}{\\sqrt{5} - \\sqrt{3}}$ .',
					hintAr: 'اضرب البسط والمقام في العدد المرافق $\\sqrt{5} + \\sqrt{3}$ ثم استعمل $(a - b)(a + b) = a^2 - b^2$ .',
					expectedInput: '(sqrt5+sqrt3)/2',
					revealAr: '$B = \\frac{\\sqrt{5} + \\sqrt{3}}{(\\sqrt{5} - \\sqrt{3})(\\sqrt{5} + \\sqrt{3})} = \\frac{\\sqrt{5} + \\sqrt{3}}{5 - 3} = \\frac{\\sqrt{5} + \\sqrt{3}}{2}$ .'
				},
				{
					promptAr: 'احسب زمن وصول الضوء $t = \\frac{d}{c}$ بالكتابة العلمية، ثم قدّر النتيجة برتبة المقدار.',
					hintAr: 'اقسم المعاملين $\\frac{1.496}{3}$ ثم اطرح الأسين $11 - 8$ وأعد الكتابة بمعامل بين $1$ و $10$ .',
					expectedInput: '4.99 x 10^2',
					revealAr: '$t = \\frac{1.496 \\times 10^{11}}{3 \\times 10^8} \\approx 0.4987 \\times 10^3 \\approx 4.99 \\times 10^2$ ثانية، أي نحو $8.3$ دقيقة. رتبة المقدار: $1.5 \\times 10^{11}$ بالمقدار $10^{11}$ و $3 \\times 10^8$ بالمقدار $10^8$ فنتوقع نتيجة قرب $10^3$ ، وهو ما يتوافق مع القيمة الدقيقة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**القوى** ($a \\neq 0$ ، $m, n \\in \\mathbb{Z}$): $a^m \\times a^n = a^{m+n}$ ، $\\frac{a^m}{a^n} = a^{m-n}$ ، $(a^m)^n = a^{mn}$ ، $(ab)^n = a^n b^n$ ، $a^{-n} = \\frac{1}{a^n}$ ، $a^0 = 1$ . تنبيه: $-3^2 = -9$ بينما $(-3)^2 = 9$ .',
				'**الجذور التربيعية** ($a, b \\geq 0$): $(\\sqrt{a})^2 = a$ ، $\\sqrt{ab} = \\sqrt{a}\\sqrt{b}$ ، $\\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}}$ ($b > 0$). ولكل عدد حقيقي $x$ : $\\sqrt{x^2} = |x|$ . كذلك $\\sqrt{a + b} \\neq \\sqrt{a} + \\sqrt{b}$ في الحالة العامة.',
				'**تنطيق المقام**: $\\frac{1}{\\sqrt{a}} = \\frac{\\sqrt{a}}{a}$ ، و $\\frac{1}{a + \\sqrt{b}} = \\frac{a - \\sqrt{b}}{a^2 - b}$ بالضرب في المرافق (مع $a^2 \\neq b$).',
				'**الكتابة العشرية الدورية**: كل عدد ناطق يكتب عشرياً منتهياً أو دورياً، والعكس صحيح. لتحويل $x = 0.\\overline{27}$ إلى كسر: $100x - x = 27$ ، إذن $x = \\frac{27}{99} = \\frac{3}{11}$ .',
				'**الكتابة العلمية**: العدد الموجب $x$ يكتب $a \\times 10^n$ مع $1 \\leq a < 10$ و $n \\in \\mathbb{Z}$ . **رتبة المقدار**: $10^n$ إذا كان $a < 5$ و $10^{n+1}$ إذا كان $a \\geq 5$ . التدوير إلى $10^{-n}$ : نحتفظ بـ $n$ رقماً بعد الفاصلة ونزيد الرقم الأخير بواحد إذا كان الرقم الذي يليه $5$ أو أكبر.'
			],
			visualSvg: svgRadicalSpiral(),
			visualCaptionAr: 'الأعداد $\\sqrt{2}$ ، $\\sqrt{3}$ ، $\\sqrt{5}$ ... قابلة للإنشاء بالمسطرة والكوس: كل وتر جديد يحقق $\\sqrt{k}^{\\,2} + 1^2 = (\\sqrt{k+1})^2$',
			examples: [
				{
					problemAr: 'بسّط $A = \\sqrt{75} - 2\\sqrt{12} + \\sqrt{3}$ ، ثم نطّق مقام $B = \\frac{4}{3 - \\sqrt{5}}$ وتحقق من النتيجة.',
					solutionAr:
						'$A = 5\\sqrt{3} - 2 \\times 2\\sqrt{3} + \\sqrt{3} = (5 - 4 + 1)\\sqrt{3} = 2\\sqrt{3}$ .\\n\\n$B = \\frac{4(3 + \\sqrt{5})}{(3 - \\sqrt{5})(3 + \\sqrt{5})} = \\frac{4(3 + \\sqrt{5})}{9 - 5} = 3 + \\sqrt{5}$ .\\n\\nتحقق: $(3 - \\sqrt{5})(3 + \\sqrt{5}) = 9 - 5 = 4$ ، إذن $B \\times (3 - \\sqrt{5}) = 4$ ✓ .'
				},
				{
					problemAr: 'حوّل $x = 0.\\overline{27}$ و $y = 1.2\\overline{3}$ إلى كسرين مختزلين.',
					solutionAr:
						'لدينا $100x = 27.\\overline{27}$ ، فنطرح: $99x = 27$ ، إذن $x = \\frac{27}{99} = \\frac{3}{11}$ .\\n\\nأما $y = 1.2333\\ldots$ فنحسب $10y = 12.333\\ldots$ و $100y = 123.333\\ldots$ ، وبالطرح: $90y = 111$ ، إذن $y = \\frac{111}{90} = \\frac{37}{30}$ . تحقق: $\\frac{37}{30} = 1.2333\\ldots$ ✓ . وبما أن $30 = 2 \\times 3 \\times 5$ يحوي العامل $3$ فهو ليس عشرياً.'
				},
				{
					problemAr: 'احسب $K = \\frac{4.5 \\times 10^{-3} \\times 6 \\times 10^{7}}{1.5 \\times 10^{5}}$ بالكتابة العلمية، ثم قدّر النتيجة برتبة المقدار للتحقق.',
					solutionAr:
						'البسط: $4.5 \\times 6 = 27$ و $10^{-3} \\times 10^{7} = 10^4$ ، إذن البسط $27 \\times 10^4 = 2.7 \\times 10^5$ .\\n\\n$K = \\frac{2.7 \\times 10^5}{1.5 \\times 10^5} = 1.8 = 1.8 \\times 10^0$ .\\n\\nتقدير: رتبة مقدار $4.5 \\times 10^{-3}$ هي $10^{-3}$ و $6 \\times 10^7$ هي $10^8$ و $1.5 \\times 10^5$ هي $10^5$ ، فنقدر $K \\approx \\frac{10^{-3} \\times 10^{8}}{10^{5}} = 10^0 = 1$ ، وهو متوافق مع $1.8$ (من نفس رتبة المقدار).'
				}
			],
			watchOutAr:
				'$(a + b)^2 \\neq a^2 + b^2$ و $\\sqrt{x^2} = |x|$ وليس $x$ دائماً. لا تنطّق المقام بالضرب في عدد غير مرافق. العدد $27 \\times 10^4$ ليس بكتابة علمية لأن معامله أكبر من $10$ . والتدوير يختلف عن البتر: $0.0457$ مدوّراً إلى $10^{-3}$ يعطي $0.046$ ، بينما بتره يعطي $0.045$ .'
		},
		practice: [
			{
				questionAr: 'قيمة العبارة $\\frac{3^{-2} \\times 3^{5}}{3^{2}}$ هي:',
				options: ['$\\frac{1}{3}$', '$1$', '$3$', '$27$'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: هذه قيمة $3^{-1}$ ، لقد قمت بجمع الأسس بصورة خاطئة.',
					'خطأ: $3^0 = 1$ ينتج لو كان الأس النهائي صفراً، لكن $-2 + 5 - 2 = 1$ .',
					'إجابة صحيحة! $\\frac{3^{-2+5}}{3^2} = 3^{3-2} = 3^1 = 3$ .',
					'خطأ: $27 = 3^3$ هو قيمة البسط فقط ولم تقسم على $3^2$ .'
				],
				explanationAr: 'البسط: $3^{-2} \\times 3^5 = 3^{-2+5} = 3^3 = 27$ ثم القسمة على $3^2 = 9$ تعطي $\\frac{27}{9} = 3$ ، أي $3^{3-2} = 3^1 = 3$ .'
			},
			{
				questionAr: 'بعد تنطيق المقام يكتب العدد $\\frac{6}{\\sqrt{7} - 1}$ على الشكل:',
				options: ['$\\sqrt{7} - 1$', '$\\sqrt{7} + 1$', '$6\\sqrt{7} + 6$', '$\\frac{\\sqrt{7} + 1}{6}$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: $\\sqrt{7} - 1$ هو ناتج تنطيق العدد $\\frac{6}{\\sqrt{7} + 1}$ ، وهنا المقام هو $\\sqrt{7} - 1$ فالمرافق $\\sqrt{7} + 1$ .',
					'إجابة صحيحة! $\\frac{6(\\sqrt{7} + 1)}{(\\sqrt{7})^2 - 1^2} = \\frac{6(\\sqrt{7} + 1)}{6} = \\sqrt{7} + 1$ .',
					'خطأ: نسيت قسمة البسط على المقام الجديد $7 - 1 = 6$ .',
					'خطأ: أخطأت في وضع المقام الجديد؛ الناتج الصحيح لا يحوي كسراً.'
				],
				explanationAr: 'نضرب البسط والمقام في المرافق $\\sqrt{7} + 1$ : المقام الجديد $(\\sqrt{7} - 1)(\\sqrt{7} + 1) = 7 - 1 = 6$ ، فالنتيجة $\\frac{6(\\sqrt{7} + 1)}{6} = \\sqrt{7} + 1$ .'
			},
			{
				questionAr: 'الكتابة العلمية للعدد $0.00064 \\times 5 \\times 10^{7}$ هي:',
				options: ['$32 \\times 10^{3}$', '$3.2 \\times 10^{3}$', '$3.2 \\times 10^{5}$', '$3.2 \\times 10^{4}$'],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: العدد $32 \\times 10^3 = 32000$ صحيح القيمة لكنه ليس بالكتابة العلمية لأن المعامل $32$ أكبر من $10$ .',
					'خطأ: $3.2 \\times 10^3 = 3200$ ، لقد أخطأت في حساب الأس بعد التحويل.',
					'خطأ: $3.2 \\times 10^5 = 320000$ ، الأس أكبر بواحد مما يجب.',
					'إجابة صحيحة! $0.00064 = 6.4 \\times 10^{-4}$ ، فالجداء $6.4 \\times 5 \\times 10^{-4+7} = 32 \\times 10^3 = 3.2 \\times 10^4$ .'
				],
				explanationAr: '$0.00064 = 6.4 \\times 10^{-4}$ ، إذن الجداء $= 6.4 \\times 5 \\times 10^{-4} \\times 10^{7} = 32 \\times 10^{3}$ . وللحصول على معامل بين $1$ و $10$ نكتب $32 = 3.2 \\times 10$ ، فالنتيجة $3.2 \\times 10^4 = 32000$ .'
			}
		]
	},

	// =========================================================================
	// LESSON 3: ORDER, INTERVALS, ABSOLUTE VALUE
	// =========================================================================
	{
		id: 'lesson_1as_tcst_t1_order_intervals_absolute_value',
		slug: '1as-tcst-t1-order-intervals-absolute-value',
		grade: '1as_tcst',
		yearSubjectId: 654,
		trimesterId: 't1',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: الترتيب، المجالات، القيمة المطلقة والمتباينات والحصر',
		order: 3,
		titleAr: 'الترتيب في R، المجالات، القيمة المطلقة والمسافة على المستقيم العددي',
		objectives: [
			'مقارنة عددين حقيقيين باختيار المعيار المناسب (إشارة الفرق a - b أو مقارنة النسبة بالواحد للأعداد الموجبة)',
			'تعريف المجالات بأنواعها (المحدودة وغير المحدودة) وتمثيلها على المستقيم العددي وتعيين تقاطع واتحاد مجالات',
			'تعريف القيمة المطلقة |x| وربطها بالمسافة على المستقيم العددي d(x, a) = |x - a| وكتابة عبارات دون رمز القيمة المطلقة والانتقال بين الحصر والمجال والمسافة والقيمة المطلقة'
		],
		keywordsAr: [
			'الترتيب في R',
			'المجالات العددية',
			'تقاطع المجالات',
			'اتحاد المجالات',
			'القيمة المطلقة',
			'المسافة على المستقيم العددي'
		],
		discover: {
			scenarioAr:
				'في ورشة ميكانيكية، يُقبل مسمار قطره $d$ (بالمليمتر) إذا كان بعده عن القيمة الاسمية $12$ لا يتجاوز $0.05$ . هذه المسألة تلخص ثلاث أفكار: الترتيب بين الأعداد الحقيقية، والمجال الذي ينتمي إليه $d$ ، والقيمة المطلقة التي تقيس المسافة على المستقيم العددي.',
			svg: svgToleranceLine(),
			steps: [
				{
					promptAr: 'قارن العددين $\\frac{7}{9}$ و $\\frac{4}{5}$ باستعمال إشارة الفرق $a - b$ .',
					hintAr: 'وحّد المقامين: $\\frac{7}{9} - \\frac{4}{5} = \\frac{35 - 36}{45}$ .',
					expectedInput: '7/9 < 4/5',
					revealAr: '$\\frac{7}{9} - \\frac{4}{5} = \\frac{35 - 36}{45} = -\\frac{1}{45} < 0$ ، إذن $\\frac{7}{9} < \\frac{4}{5}$ . القاعدة: $a < b \\iff a - b < 0$ .'
				},
				{
					promptAr: 'اكتب بصيغة مجال المجموعة $\\{x \\in \\mathbb{R} : -2 < x \\leq 3\\}$ ، ثم عيّن تقاطع واتحاد $I = [-1, 5]$ و $J = ]2, 8[$ .',
					hintAr: 'القوس المفتوح يعني أن الطرف مستثنى، والقوس المغلق يعني أن الطرف محتواة. ارسم المجالين على مستقيم عددي.',
					expectedInput: ']2,5]',
					revealAr: 'المجموعة هي $]-2, 3]$ . أما $I \\cap J = ]2, 5]$ (الطرف $2$ مستثنى لأنه ليس في $J$ والطرف $5$ محتوى لأنه في $I$ و $J$) ، و $I \\cup J = [-1, 8[$ .'
				},
				{
					promptAr: 'احسب $|-7|$ و $|3 - \\pi|$ و $|\\sqrt{2} - 2|$ بدون رمز القيمة المطلقة (مع $\\pi > 3$ و $\\sqrt{2} < 2$).',
					hintAr: 'تذكر أن $|x| = x$ إذا كان $x \\geq 0$ و $|x| = -x$ إذا كان $x < 0$ .',
					expectedInput: '7',
					revealAr: '$|-7| = 7$ . بما أن $3 - \\pi < 0$ فإن $|3 - \\pi| = -(3 - \\pi) = \\pi - 3$ . وبما أن $\\sqrt{2} - 2 < 0$ فإن $|\\sqrt{2} - 2| = 2 - \\sqrt{2}$ .'
				},
				{
					promptAr: 'ترجم الشرط $|d - 12| \\leq 0.05$ إلى حصر ثم إلى مجال.',
					hintAr: '$|X| \\leq r \\iff -r \\leq X \\leq r$ . أضف $12$ إلى أطراف الحصر.',
					expectedInput: '[11.95,12.05]',
					revealAr: '$|d - 12| \\leq 0.05 \\iff -0.05 \\leq d - 12 \\leq 0.05 \\iff 11.95 \\leq d \\leq 12.05 \\iff d \\in [11.95, 12.05]$ . مركز المجال $12$ ونصف قطره $0.05$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**مقارنة عددين**: $a \\leq b \\iff b - a \\geq 0$ . وإذا كان $a > 0$ و $b > 0$ فإن $a < b \\iff \\frac{a}{b} < 1$ ، وكذلك $a < b \\iff a^2 < b^2$ للأعداد الموجبة. ولمقارنة عددين ننتقل أحياناً إلى عدد وسيط.',
				'**المجالات**: $[a, b]$ مغلق ، $]a, b[$ مفتوح ، $[a, b[$ و $]a, b]$ نصف مفتوحان ، و $[a, +\\infty[$ ، $]-\\infty, b]$ ، $]-\\infty, +\\infty[ = \\mathbb{R}$ غير محدودة. الرمز $\\infty$ يرافقه دائماً قوس مفتوح. التقاطع $I \\cap J$ هو المشترك، والاتحاد $I \\cup J$ هو المجموعة المضمومة.',
				'**القيمة المطلقة**: $|x| = x$ إذا كان $x \\geq 0$ و $|x| = -x$ إذا كان $x < 0$ . خواصها: $|x| \\geq 0$ ، $|x| = 0 \\iff x = 0$ ، $|-x| = |x|$ ، $|xy| = |x||y|$ ، $|x|^2 = x^2$ ، $\\sqrt{x^2} = |x|$ ، وكذلك $|x + y| \\leq |x| + |y|$ .',
				'**المسافة على المستقيم العددي**: إذا كانت $A(a)$ و $B(b)$ فإن $AB = |b - a|$ ، وعلى الخصوص $d(x, a) = |x - a|$ .',
				'**الانتقال بين التمثيلات** ($r > 0$): $|x - a| \\leq r \\iff a - r \\leq x \\leq a + r \\iff x \\in [a - r, a + r]$ ، وبالتعميم مع $<$ نحصل على مجال مفتوح. و $|x - a| \\geq r \\iff x \\leq a - r$ أو $x \\geq a + r$ . ويكافئ المجال $[\\alpha, \\beta]$ المركز $a = \\frac{\\alpha + \\beta}{2}$ ونصف القطر $r = \\frac{\\beta - \\alpha}{2}$ .'
			],
			visualSvg: svgIntervalRows({
				min: -4,
				max: 7,
				rows: [
					{ label: 'I', color: '#2563eb', segs: [{ from: -3, to: 2, closedFrom: true, closedTo: false }] },
					{ label: 'J', color: '#16a34a', segs: [{ from: -1, to: 6, closedFrom: false, closedTo: true }] },
					{ label: 'I ∩ J', color: '#dc2626', segs: [{ from: -1, to: 2, closedFrom: false, closedTo: false }] },
					{ label: 'I ∪ J', color: '#7c3aed', segs: [{ from: -3, to: 6, closedFrom: true, closedTo: true }] }
				]
			}),
			visualCaptionAr: 'تقاطع واتحاد المجالين $I = [-3, 2[$ و $J = ]-1, 6]$ : الدوائر المملوءة تعني أن الطرف محتوى والدوائر الفارغة تعني أنه مستثنى',
			examples: [
				{
					problemAr: 'قارن العددين $A = \\sqrt{11} - \\sqrt{10}$ و $B = \\sqrt{10} - 3$ .',
					solutionAr:
						'نستعمل المرافق: $A = \\frac{(\\sqrt{11} - \\sqrt{10})(\\sqrt{11} + \\sqrt{10})}{\\sqrt{11} + \\sqrt{10}} = \\frac{1}{\\sqrt{11} + \\sqrt{10}}$ و $B = \\frac{10 - 9}{\\sqrt{10} + 3} = \\frac{1}{\\sqrt{10} + 3}$ .\\n\\nبما أن $\\sqrt{11} > 3$ فإن $\\sqrt{11} + \\sqrt{10} > 3 + \\sqrt{10} > 0$ ، وبالتالي $\\frac{1}{\\sqrt{11} + \\sqrt{10}} < \\frac{1}{\\sqrt{10} + 3}$ لأن مقلوب عدد موجب أكبر يكون أصغر.\\n\\nإذن $A < B$ .'
				},
				{
					problemAr: 'ليكن $I = [-3, 2[$ و $J = ]-1, 6]$ . عيّن $I \\cap J$ و $I \\cup J$ و $I \\cap ]-\\infty, 0]$ .',
					solutionAr:
						'$x \\in I \\cap J \\iff -3 \\leq x < 2$ و $-1 < x \\leq 6 \\iff -1 < x < 2$ ، إذن $I \\cap J = ]-1, 2[$ .\\n\\nالمجالان متراكبان ($-1 < 2$) والعدد $2$ ينتمي إلى $J$ ، فلا يوجد فراغ بينهما: $I \\cup J = [-3, 6]$ .\\n\\n$I \\cap ]-\\infty, 0] = [-3, 0]$ لأن $-3 \\in I$ و $0 \\in I$ .'
				},
				{
					problemAr: 'أ) اكتب $E = |x - 3| + |x + 1|$ دون رمز القيمة المطلقة عندما $x \\in [-1, 3]$ . ب) حل $|2x - 1| \\leq 3$ ثم اعط المركز ونصف القطر.',
					solutionAr:
						'أ) إذا كان $-1 \\leq x \\leq 3$ فإن $x - 3 \\leq 0$ و $x + 1 \\geq 0$ ، إذن $|x - 3| = 3 - x$ و $|x + 1| = x + 1$ ، ومنه $E = (3 - x) + (x + 1) = 4$ ، وهي مسافة ثابتة مجموعها $AB$ حيث $A(3)$ و $B(-1)$ .\\n\\nب) $|2x - 1| \\leq 3 \\iff -3 \\leq 2x - 1 \\leq 3 \\iff -2 \\leq 2x \\leq 4 \\iff -1 \\leq x \\leq 2$ ، فـ $S = [-1, 2]$ . وبالقسمة: $2|x - \\frac{1}{2}| \\leq 3$ أي $|x - \\frac{1}{2}| \\leq \\frac{3}{2}$ ، فالمركز $\\frac{1}{2}$ ونصف القطر $\\frac{3}{2}$ .'
				}
			],
			watchOutAr:
				'$|x - 3|$ ليس $x - 3$ دائماً: يجب تحديد إشارة ما داخل القيمة المطلقة أولاً. $|x| \\leq r$ يعطي مجالاً واحداً، بينما $|x| \\geq r$ يعطي اتحاد مجالين. ولا يجوز كتابة $-3 > x > 5$ لأنه حصر مستحيل. وعند الضرب في عدد سالب ينعكس اتجاه المتباينة.'
		},
		practice: [
			{
				questionAr: 'إذا كان $I = [-2, 5[$ و $J = ]1, 7]$ فإن $I \\cap J$ يساوي:',
				options: ['$[1, 5]$', '$]1, 5[$', '$]1, 5]$', '$[-2, 7]$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: العدد $1$ ليس في $J$ لأن القوس عنده مفتوح، والعدد $5$ ليس في $I$ لأن القوس عنده مفتوح.',
					'إجابة صحيحة! $I \\cap J = ]1, 5[$ لأن $1 \\notin J$ و $5 \\notin I$ ، فيستثنى الطرفان.',
					'خطأ: العدد $5$ لا ينتمي إلى $I = [-2, 5[$ ، فلا يمكن أن يكون ضمن التقاطع.',
					'خطأ: هذا هو اتحاد المجالين $I \\cup J$ وليس التقاطع.'
				],
				explanationAr: 'التقاطع هو الأعداد التي تحقق $-2 \\leq x < 5$ و $1 < x \\leq 7$ معاً، أي $1 < x < 5$ . إذن $I \\cap J = ]1, 5[$ ، أما $I \\cup J = [-2, 7]$ .'
			},
			{
				questionAr: 'قيمة $|\\sqrt{3} - 2| + |\\sqrt{3} - 1|$ هي:',
				options: ['$3 - 2\\sqrt{3}$', '$2\\sqrt{3} - 3$', '$-1$', '$1$'],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: هذه قيمة $(2 - \\sqrt{3}) + (1 - \\sqrt{3})$ ، لكن $\\sqrt{3} - 1 > 0$ فلا يتغير إشارته.',
					'خطأ: هذه قيمة $(\\sqrt{3} - 2) + (\\sqrt{3} - 1)$ ، لكن $\\sqrt{3} - 2 < 0$ لأن $\\sqrt{3} \\approx 1.73 < 2$ .',
					'خطأ: مجموع قيمتين مطلقتين لا يمكن أن يكون سالباً.',
					'إجابة صحيحة! $|\\sqrt{3} - 2| = 2 - \\sqrt{3}$ و $|\\sqrt{3} - 1| = \\sqrt{3} - 1$ ، والمجموع $= 1$ .'
				],
				explanationAr: 'بما أن $1 < \\sqrt{3} < 2$ فإن $\\sqrt{3} - 2 < 0$ و $\\sqrt{3} - 1 > 0$ . إذن المجموع $= (2 - \\sqrt{3}) + (\\sqrt{3} - 1) = 1$ ، وهو المسافة بين العددين $1$ و $2$ .'
			},
			{
				questionAr: 'مجموعة حلول المتراجحة $|x - 2| < 3$ في $\\mathbb{R}$ هي:',
				options: ['$]-5, 1[$', '$]-3, 3[$', '$]-1, 5[$', '$]-\\infty, -1[ \\cup ]5, +\\infty[$'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: لقد طرحت $2$ بدل إضافتها: $|x - 2| < 3$ تعطي $-3 + 2 < x < 3 + 2$ .',
					'خطأ: هذا هو حل $|x| < 3$ ؛ المركز هنا هو $2$ وليس $0$ .',
					'إجابة صحيحة! $-3 < x - 2 < 3 \\iff -1 < x < 5$ ، أي المجال المفتوح المتمركز في $2$ بنصف قطر $3$ .',
					'خطأ: هذا حل المتراجحة المعاكسة $|x - 2| > 3$ .'
				],
				explanationAr: '$|x - 2| < 3$ تعني أن المسافة بين $x$ و $2$ أقل من $3$ ، أي $-3 < x - 2 < 3$ ، وبإضافة $2$ نجد $-1 < x < 5$ . إذن $S = ]-1, 5[$ .'
			}
		]
	},

	// =========================================================================
	// LESSON 4: INEQUALITIES, FRAMING, SIGN OF A BINOMIAL
	// =========================================================================
	{
		id: 'lesson_1as_tcst_t1_inequalities_framing_approximations',
		slug: '1as-tcst-t1-inequalities-framing-binomial-sign',
		grade: '1as_tcst',
		yearSubjectId: 654,
		trimesterId: 't1',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: الترتيب، المجالات، القيمة المطلقة والمتباينات والحصر',
		order: 4,
		titleAr: 'المتباينات وقواعد الحصر، دراسة إشارة ثنائي الحد وحل المتراجحات الأساسية',
		objectives: [
			'تطبيق خواص الترتيب والتلاؤم مع العمليات الرياضية (الجمع، الطرح، الضرب، المقلوب، المربع) لإيجاد حصر لعبارة جبرية',
			'دراسة إشارة ثنائي الحد من الدرجة الأولى ax + b وتلخيصها في جدول إشارة',
			'حل متراجحات من الدرجة الأولى بمجهول واحد ومتراجحات تتضمن القيمة المطلقة |x - a| ≤ r بيانياً وجبرياً وتمثيل مجموعة الحلول'
		],
		keywordsAr: [
			'المتباينات',
			'قواعد الحصر',
			'إشارة ثنائي الحد',
			'جدول الإشارة',
			'متراجحات الدرجة الأولى',
			'المتراجحات بالقيمة المطلقة'
		],
		discover: {
			scenarioAr:
				'قيس مزارع طول حديقته مستطيلة الشكل فوجد $L \\in [12.4, 12.6]$ متراً وعرضها $w \\in [7.9, 8.1]$ متراً. بسبب أخطاء القياس لا يمكنه معرفة المحيط والمساحة بدقة، لكنه يستطيع إيجاد **حصر** لهما. نستكشف قواعد الحصر ثم دراسة إشارة ثنائي الحد $ax + b$ لحل المتراجحات.',
			svg: svgFramingMap(),
			steps: [
				{
					promptAr: 'أوجد حصراً للمحيط $P = 2(L + w)$ .',
					hintAr: 'اجمع الحصرين طرفاً إلى طرف: $12.4 + 7.9 \\leq L + w \\leq 12.6 + 8.1$ ثم اضرب في العدد الموجب $2$ .',
					expectedInput: '[40.6,41.4]',
					revealAr: '$20.3 \\leq L + w \\leq 20.7$ ، وبالضرب في $2 > 0$ : $40.6 \\leq P \\leq 41.4$ . سعة الحصر $0.8$ .'
				},
				{
					promptAr: 'أوجد حصراً للمساحة $S = L \\times w$ . لماذا يمكن ضرب الحصرين طرفاً إلى طرف هنا؟',
					hintAr: 'كل الأعداد المعنية موجبة: $0 < a \\leq x \\leq b$ و $0 < c \\leq y \\leq d$ تعطي $ac \\leq xy \\leq bd$ .',
					expectedInput: '[97.96,102.06]',
					revealAr: '$12.4 \\times 7.9 \\leq S \\leq 12.6 \\times 8.1$ أي $97.96 \\leq S \\leq 102.06$ . الضرب طرفاً إلى طرف مشروع لأن كل الحدود موجبة.'
				},
				{
					promptAr: 'إذا كان $2 \\leq x \\leq 5$ فأوجد حصراً لكل من $3x - 4$ و $1 - 2x$ .',
					hintAr: 'الضرب في $3 > 0$ يحافظ على اتجاه المتباينة، أما الضرب في $-2 < 0$ فيعكسه.',
					expectedInput: '[2,11] و [-9,-3]',
					revealAr: '$6 \\leq 3x \\leq 15$ ثم $2 \\leq 3x - 4 \\leq 11$ . وأيضاً $-10 \\leq -2x \\leq -4$ (انعكس الاتجاه) ثم $-9 \\leq 1 - 2x \\leq -3$ .'
				},
				{
					promptAr: 'ادرس إشارة $2x - 6$ ثم حل المتراجحة $2x - 6 \\geq 0$ .',
					hintAr: 'عيّن جذر ثنائي الحد $x_0 = -\\frac{b}{a}$ ثم قارن إشارة $2x - 6$ مع إشارة $a = 2$ على جانبي $x_0$ .',
					expectedInput: '[3,+inf[',
					revealAr: 'جذر $2x - 6$ هو $x_0 = 3$ . بما أن $a = 2 > 0$ فالعبارة موجبة إذا كان $x > 3$ ومعدومة عند $3$ وسالبة إذا كان $x < 3$ . إذن حلول $2x - 6 \\geq 0$ هي $S = [3, +\\infty[$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**التلاؤم مع الجمع**: $a \\leq b \\iff a + c \\leq b + c$ . وإذا كان $a \\leq b$ و $c \\leq d$ فإن $a + c \\leq b + d$ . **التلاؤم مع الضرب**: إذا كان $c > 0$ فإن $a \\leq b \\iff ac \\leq bc$ ، وإذا كان $c < 0$ فإن $a \\leq b \\iff ac \\geq bc$ (ينعكس الاتجاه).',
				'**حصر عبارات**: إذا كان $a \\leq x \\leq b$ و $c \\leq y \\leq d$ فإن $a + c \\leq x + y \\leq b + d$ و $a - d \\leq x - y \\leq b - c$ . وإذا كانت الأعداد موجبة: $ac \\leq xy \\leq bd$ . ولمقلوب عدد موجب: $0 < a \\leq x \\leq b \\implies \\frac{1}{b} \\leq \\frac{1}{x} \\leq \\frac{1}{a}$ .',
				'**المربع**: إذا كان $0 \\leq a \\leq x \\leq b$ فإن $a^2 \\leq x^2 \\leq b^2$ . أما إذا كان المجال يحوي أعداداً سالبة فلا يجوز تربيع الحصر مباشرة: $-3 \\leq x \\leq 2$ يعطي $0 \\leq x^2 \\leq 9$ .',
				'**إشارة ثنائي الحد** $ax + b$ ($a \\neq 0$): تنعدم عند $x_0 = -\\frac{b}{a}$ ، ولها إشارة $a$ على يمين $x_0$ (أي من أجل $x > x_0$) وإشارة $-a$ على يسار $x_0$ . ونلخص ذلك في **جدول إشارة**.',
				'**المتراجحات**: لحل $ax + b \\leq 0$ نعزل $x$ ونقسم على $a$ مع عكس الاتجاه إذا كان $a < 0$ ، والحل مجال. وللقيمة المطلقة: $|x - a| \\leq r \\iff x \\in [a - r, a + r]$ و $|x - a| \\geq r \\iff x \\in ]-\\infty, a - r] \\cup [a + r, +\\infty[$ . إذا كان $|x - a| \\leq r$ فـ $a$ **قيمة مقربة** لـ $x$ بخطأ لا يتجاوز $r$ .'
			],
			visualSvg: svgSignTable({
				xs: ['-∞', '3/2', '3', '+∞'],
				rows: [
					{ label: '2x - 6', cells: ['-', '', '-', '0', '+'] },
					{ label: '3 - 2x', cells: ['+', '0', '-', '', '-'] }
				]
			}),
			visualCaptionAr: 'جدول إشارة ثنائيي الحد $2x - 6$ (جذره $3$ ومعامله موجب) و $3 - 2x$ (جذره $\\frac{3}{2}$ ومعامله سالب)',
			examples: [
				{
					problemAr: 'إذا كان $1 \\leq x \\leq 2$ و $3 \\leq y \\leq 5$ فأوجد حصراً لكل من $x + y$ و $x - y$ و $xy$ و $\\frac{x}{y}$ .',
					solutionAr:
						'$x + y$ : $1 + 3 \\leq x + y \\leq 2 + 5$ أي $4 \\leq x + y \\leq 7$ .\\n\\n$x - y$ : $1 - 5 \\leq x - y \\leq 2 - 3$ أي $-4 \\leq x - y \\leq -1$ (نطرح الحد الأكبر من $y$ من الحد الأصغر لـ $x$ ).\\n\\n$xy$ : الأعداد موجبة فـ $1 \\times 3 \\leq xy \\leq 2 \\times 5$ أي $3 \\leq xy \\leq 10$ .\\n\\n$\\frac{x}{y} = x \\times \\frac{1}{y}$ و $\\frac{1}{5} \\leq \\frac{1}{y} \\leq \\frac{1}{3}$ ، إذن $1 \\times \\frac{1}{5} \\leq \\frac{x}{y} \\leq 2 \\times \\frac{1}{3}$ أي $\\frac{1}{5} \\leq \\frac{x}{y} \\leq \\frac{2}{3}$ .'
				},
				{
					problemAr: 'ادرس إشارة $3 - 2x$ ثم حل في $\\mathbb{R}$ المتراجحة $3 - 2x \\geq x + 9$ .',
					solutionAr:
						'جذر $3 - 2x$ هو $\\frac{3}{2}$ وبما أن $a = -2 < 0$ فهي موجبة على $]-\\infty, \\frac{3}{2}[$ ومعدومة عند $\\frac{3}{2}$ وسالبة على $]\\frac{3}{2}, +\\infty[$ .\\n\\nالمتراجحة: $3 - 2x \\geq x + 9 \\iff -3x \\geq 6 \\iff x \\leq -2$ (قسمنا على $-3 < 0$ فانعكس الاتجاه).\\n\\nمجموعة الحلول $S = ]-\\infty, -2]$ . تحقق: من أجل $x = -3$ : $3 + 6 = 9 \\geq 6$ ✓ .'
				},
				{
					problemAr: 'أ) حل $|2x - 1| \\geq 5$ . ب) إذا كان $|x - 3| \\leq 0.1$ فبيّن أن $|(2x + 1) - 7| \\leq 0.2$ ثم فسّر النتيجة.',
					solutionAr:
						'أ) $|2x - 1| \\geq 5 \\iff 2x - 1 \\geq 5$ أو $2x - 1 \\leq -5 \\iff x \\geq 3$ أو $x \\leq -2$ ، إذن $S = ]-\\infty, -2] \\cup [3, +\\infty[$ .\\n\\nب) $(2x + 1) - 7 = 2x - 6 = 2(x - 3)$ ، وبالتالي $|(2x + 1) - 7| = 2|x - 3| \\leq 2 \\times 0.1 = 0.2$ . التفسير: إذا كان الخطأ على $x$ لا يتجاوز $0.1$ حول $3$ فإن $7$ قيمة مقربة لـ $2x + 1$ بخطأ لا يتجاوز $0.2$ ، أي $6.8 \\leq 2x + 1 \\leq 7.2$ .'
				}
			],
			watchOutAr:
				'لا يجوز طرح متباينتين طرفاً إلى طرف: نستعمل $a - d \\leq x - y \\leq b - c$ . عند الضرب أو القسمة على عدد سالب ينعكس الاتجاه. لا نقلب أو نربع حصراً إلا بعد التأكد من إشارة الحدود. وإشارة $ax + b$ تتبع إشارة $a$ **على يمين** الجذر وليس على يساره.'
		},
		practice: [
			{
				questionAr: 'إذا كان $-3 \\leq x \\leq 2$ فإن حصر $1 - 2x$ هو:',
				options: ['$-5 \\leq 1 - 2x \\leq 5$', '$-3 \\leq 1 - 2x \\leq 7$', '$-3 \\leq 1 - 2x \\leq 5$', '$-4 \\leq 1 - 2x \\leq 6$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: هذا هو حصر $1 + 2x$ ؛ لم تنتبه إلى أن معامل $x$ سالب فينعكس الحصر.',
					'إجابة صحيحة! $-4 \\leq -2x \\leq 6$ (انعكس الاتجاه) ثم بإضافة $1$ نجد $-3 \\leq 1 - 2x \\leq 7$ .',
					'خطأ: الطرف الأيمن $5$ غير صحيح؛ عند $x = -3$ نجد $1 - 2(-3) = 7$ .',
					'خطأ: هذا حصر $-2x$ بعد الضرب فقط، ونسيت إضافة $1$ إلى طرفي الحصر.'
				],
				explanationAr: 'من $-3 \\leq x \\leq 2$ نضرب في $-2 < 0$ فنعكس: $-4 \\leq -2x \\leq 6$ . ثم نضيف $1$ : $-3 \\leq 1 - 2x \\leq 7$ . تحقق: $x = 2$ يعطي $-3$ و $x = -3$ يعطي $7$ .'
			},
			{
				questionAr: 'مجموعة حلول المتراجحة $4 - 3x > 1 + x$ هي:',
				options: ['$]-\\infty, \\frac{3}{4}[$', '$]\\frac{3}{4}, +\\infty[$', '$]-\\infty, \\frac{3}{2}[$', '$]-\\infty, \\frac{5}{4}[$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $4 - 3x > 1 + x \\iff 3 > 4x \\iff x < \\frac{3}{4}$ . القسمة على $4 > 0$ لا تعكس الاتجاه.',
					'خطأ: انعكاس الاتجاه لا يحدث هنا لأن القسمة تتم على $4 > 0$ .',
					'خطأ: $3 > 4x$ تعطي $x < \\frac{3}{4}$ وليس $\\frac{3}{2}$ ؛ راجع معامل $x$ بعد جمع الحدود.',
					'خطأ: أخطأت في نقل $1$ ؛ يجب أن تكون $4 - 1 = 3$ وليس $4 + 1 = 5$ .'
				],
				explanationAr: 'ننقل الحدود: $4 - 1 > x + 3x$ أي $3 > 4x$ ، وبالقسمة على $4 > 0$ نجد $x < \\frac{3}{4}$ . إذن $S = ]-\\infty, \\frac{3}{4}[$ .'
			},
			{
				questionAr: 'مجموعة حلول المتراجحة $|x - 1| \\geq 2$ هي:',
				options: ['$[-1, 3]$', '$]-\\infty, -3] \\cup [1, +\\infty[$', '$]-1, 3[$', '$]-\\infty, -1] \\cup [3, +\\infty[$'],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: هذا حل المتراجحة المعاكسة $|x - 1| \\leq 2$ (المسافة عن $1$ أصغر من $2$).',
					'خطأ: المركز هو $1$ وليس $-1$ ؛ الحدان $1 - 2 = -1$ و $1 + 2 = 3$ .',
					'خطأ: هذا حل $|x - 1| < 2$ ، وهو مجال مفتوح.',
					'إجابة صحيحة! المسافة بين $x$ و $1$ أكبر من أو تساوي $2$ ، أي $x \\leq 1 - 2 = -1$ أو $x \\geq 1 + 2 = 3$ .'
				],
				explanationAr: '$|x - 1| \\geq 2 \\iff x - 1 \\leq -2$ أو $x - 1 \\geq 2 \\iff x \\leq -1$ أو $x \\geq 3$ . إذن $S = ]-\\infty, -1] \\cup [3, +\\infty[$ .'
			}
		]
	},

	// =========================================================================
	// LESSON 5: FUNCTIONS - DOMAIN, IMAGE, PREIMAGE, GRAPH, MONOTONICITY
	// =========================================================================
	{
		id: 'lesson_1as_tcst_t1_functions_generalities_graphs_monotonicity',
		slug: '1as-tcst-t1-functions-generalities-monotonicity',
		grade: '1as_tcst',
		yearSubjectId: 654,
		trimesterId: 't1',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: عموميات على الدوال، الشفعية، القيم الحدية والمعادلات البيانية',
		order: 5,
		titleAr: 'عموميات على الدوال: مفهوم الدالة، مجموعة التعريف، التمثيل البياني واتجاه التغير',
		objectives: [
			'تعريف الدالة العددية لمتغير حقيقي والتمييز بين f و f(x) وتعيين مجموعة التعريف Df من دستور أو بيان',
			'تعيين صورة عدد وسابقة عدد جبرياً وبيانياً والربط بين جدول قيم ودستور ومنحنى دالة في معلم',
			'وصف اتجاه تغير دالة (متزايدة تماماً، متناقصة تماماً، ثابتة) على مجال وتشكيل جدول التغيرات'
		],
		keywordsAr: [
			'الدالة العددية',
			'مجموعة التعريف',
			'التمثيل البياني',
			'صورة وسابقة',
			'اتجاه التغير',
			'جدول التغيرات'
		],
		discover: {
			scenarioAr:
				'الدالة العددية $f$ تقرن بكل عدد $x$ من مجموعة تعريفها عدداً وحيداً $f(x)$ . يمثل المنحنى المقابل الدالة $f(x) = x^2 - 2x - 1$ في معلم. سنقرأ الصور والسوابق من الجدول والمنحنى ثم نصف اتجاه تغير الدالة ونبرهنه جبرياً.',
			svg: svgFunctionCurvePlot({
				fn: (x) => x * x - 2 * x - 1,
				xMin: -3,
				xMax: 5,
				yMin: -3,
				yMax: 8,
				curveLabel: 'C_f',
				points: [
					{ x: -1, y: 2, label: '(-1,2)' },
					{ x: 0, y: -1, label: '(0,-1)' },
					{ x: 1, y: -2, label: '(1,-2)', color: '#dc2626' },
					{ x: 2, y: -1, label: '(2,-1)' },
					{ x: 3, y: 2, label: '(3,2)' }
				]
			}),
			steps: [
				{
					promptAr: 'ما مجموعة تعريف الدالة $f(x) = x^2 - 2x - 1$ ؟ احسب $f(3)$ و $f(-1)$ .',
					hintAr: 'العبارة كثيرة حدود؛ هل يوجد عدد يمنع حسابها؟',
					expectedInput: 'R',
					revealAr: 'مجموعة التعريف $\\mathcal{D}_f = \\mathbb{R}$ لأن كثيرة الحدود معرفة لكل عدد حقيقي. $f(3) = 9 - 6 - 1 = 2$ و $f(-1) = 1 + 2 - 1 = 2$ ، أي أن للعددين $3$ و $-1$ نفس الصورة.'
				},
				{
					promptAr: 'عيّن سوابق العدد $-1$ بالدالة $f$ جبرياً، ثم تحقق منها على المنحنى.',
					hintAr: 'حل المعادلة $f(x) = -1$ أي $x^2 - 2x = 0$ ، وحلّل بإخراج $x$ عاملاً مشتركاً.',
					expectedInput: '0 و 2',
					revealAr: '$x^2 - 2x - 1 = -1 \\iff x(x - 2) = 0 \\iff x = 0$ أو $x = 2$ . إذن للعدد $-1$ سابقتان هما $0$ و $2$ ، وهما فاصلتا نقطتي تقاطع المنحنى مع المستقيم $y = -1$ .'
				},
				{
					promptAr: 'هل للعدد $-3$ سابقة بالدالة $f$ ؟ أثبت ذلك باستعمال $f(x) = (x - 1)^2 - 2$ .',
					hintAr: 'ما أصغر قيمة يمكن أن يأخذها المربع $(x - 1)^2$ ؟',
					expectedInput: 'لا',
					revealAr: '$f(x) = -3 \\iff (x - 1)^2 = -1$ وهذا مستحيل لأن المربع موجب أو معدوم. إذن لا توجد سابقة للعدد $-3$ ، وهو ما يظهر على المنحنى الذي لا ينزل تحت $y = -2$ .'
				},
				{
					promptAr: 'احسب نسبة التزايد $T(a, b) = \\frac{f(b) - f(a)}{b - a}$ من أجل $a \\neq b$ ثم استنتج اتجاه تغير $f$ على $]-\\infty, 1]$ .',
					hintAr: 'استعمل $b^2 - a^2 = (b - a)(b + a)$ لتبسيط البسط.',
					expectedInput: 'a+b-2',
					revealAr: '$f(b) - f(a) = (b^2 - a^2) - 2(b - a) = (b - a)(a + b - 2)$ ، إذن $T(a, b) = a + b - 2$ . إذا كان $a < b \\leq 1$ فإن $a + b < 2$ أي $T(a, b) < 0$ ، فـ $f$ متناقصة تماماً على $]-\\infty, 1]$ . وإذا كان $1 \\leq a < b$ فإن $T(a, b) > 0$ ، فـ $f$ متزايدة تماماً على $[1, +\\infty[$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**الدالة العددية**: تقابل كل عنصر $x$ من $\\mathcal{D}_f$ بصورة وحيدة $f(x)$ . نفرّق بين $f$ (الدالة) و $f(x)$ (صورة العدد $x$). **مجموعة التعريف**: نستبعد الأعداد التي تعدم المقام ($\\frac{1}{g(x)}$ يتطلب $g(x) \\neq 0$) والأعداد التي تجعل ما تحت الجذر سالباً ($\\sqrt{g(x)}$ يتطلب $g(x) \\geq 0$).',
				'**الصورة والسابقة**: صورة $a \\in \\mathcal{D}_f$ هي $f(a)$ . سوابق عدد $k$ هي حلول المعادلة $f(x) = k$ ، وقد تكون معدومة أو وحيدة أو متعددة. بيانياً: الصورة تقرأ على محور التراتيب بدءاً من الفاصلة، والسوابق تقرأ على محور الفواصل عند تقاطع $C_f$ مع المستقيم $y = k$ .',
				'**التمثيل البياني**: $C_f = \\{M(x, y) : x \\in \\mathcal{D}_f ,\\ y = f(x)\\}$ . منحنى يمثل دالة إذا كان كل مستقيم عمودي على محور الفواصل يقطعه في نقطة على الأكثر.',
				'**اتجاه التغير**: $f$ متزايدة تماماً على المجال $I$ إذا كان $a < b \\implies f(a) < f(b)$ لكل $a, b \\in I$ ، ومتناقصة تماماً إذا كان $a < b \\implies f(a) > f(b)$ ، وثابتة إذا كان $f(a) = f(b)$ . معيار: نسبة التزايد $T(a, b) = \\frac{f(b) - f(a)}{b - a}$ موجبة تماماً لكل $a \\neq b$ في $I$ تعني متزايدة تماماً، وسالبة تماماً تعني متناقصة تماماً.',
				'**جدول التغيرات**: يلخص اتجاه التغير بأسهم تصاعدية ($\\nearrow$) أو تنازلية ($\\searrow$) بين قيم الدالة عند أطراف المجالات. دالة متزايدة تماماً تحافظ على الترتيب ($a < b \\implies f(a) < f(b)$) ومتناقصة تماماً تعكسه.'
			],
			visualSvg: svgMonotonyTable({
				fnName: 'f(x)',
				xs: ['-2', '1', '4'],
				vals: [
					{ text: '7', pos: 'top' },
					{ text: '-2', pos: 'bottom' },
					{ text: '7', pos: 'top' }
				]
			}),
			visualCaptionAr: 'جدول تغيرات $f(x) = x^2 - 2x - 1$ على المجال $[-2, 4]$ : متناقصة تماماً على $[-2, 1]$ ثم متزايدة تماماً على $[1, 4]$',
			examples: [
				{
					problemAr: 'عيّن مجموعة تعريف كل من: $f(x) = \\frac{\\sqrt{2x - 6}}{x - 5}$ ، $g(x) = \\frac{1}{x^2 - 4}$ ، $h(x) = \\sqrt{x + 1} + \\frac{1}{\\sqrt{3 - x}}$ .',
					solutionAr:
						'$f$ : نشترط $2x - 6 \\geq 0$ أي $x \\geq 3$ ، و $x - 5 \\neq 0$ أي $x \\neq 5$ . إذن $\\mathcal{D}_f = [3, 5[ \\cup ]5, +\\infty[$ .\\n\\n$g$ : $x^2 - 4 \\neq 0 \\iff (x - 2)(x + 2) \\neq 0 \\iff x \\neq 2$ و $x \\neq -2$ . إذن $\\mathcal{D}_g = \\mathbb{R} \\setminus \\{-2, 2\\}$ .\\n\\n$h$ : نشترط $x + 1 \\geq 0$ و $3 - x > 0$ (الجذر في المقام يجب ألا ينعدم). أي $x \\geq -1$ و $x < 3$ ، إذن $\\mathcal{D}_h = [-1, 3[$ .'
				},
				{
					problemAr: 'أ) ادرس اتجاه تغير $u(x) = 3x - 2$ على $\\mathbb{R}$ . ب) بيّن أن $v(x) = \\frac{1}{x}$ متناقصة تماماً على $]0, +\\infty[$ ، ثم بيّن أنها ليست متناقصة على $\\mathbb{R}^*$ .',
					solutionAr:
						'أ) $T(a, b) = \\frac{3b - 3a}{b - a} = 3 > 0$ ، إذن $u$ متزايدة تماماً على $\\mathbb{R}$ .\\n\\nب) من أجل $0 < a < b$ : $T(a, b) = \\frac{\\frac{1}{b} - \\frac{1}{a}}{b - a} = \\frac{a - b}{ab(b - a)} = -\\frac{1}{ab} < 0$ ، إذن $v$ متناقصة تماماً على $]0, +\\infty[$ . وكذلك على $]-\\infty, 0[$ حيث $ab > 0$ أيضاً.\\n\\nلكنها ليست متناقصة على $\\mathbb{R}^*$ : مثال مضاد $-1 < 1$ بينما $v(-1) = -1 < v(1) = 1$ ، فالاتجاه لم ينعكس.'
				},
				{
					problemAr: 'نعتبر $f(x) = x^2 - 2x - 1$ . عيّن صورة $4$ وسوابق العدد $2$ ، ثم ناقش حسب قيم $k$ عدد حلول $f(x) = k$ .',
					solutionAr:
						'$f(4) = 16 - 8 - 1 = 7$ .\\n\\n$f(x) = 2 \\iff x^2 - 2x - 3 = 0 \\iff (x - 3)(x + 1) = 0 \\iff x = 3$ أو $x = -1$ . سابقتا $2$ هما $-1$ و $3$ .\\n\\nالمناقشة: $f(x) = k \\iff (x - 1)^2 = k + 2$ . إذا كان $k < -2$ فلا حل. إذا كان $k = -2$ فالحل الوحيد $x = 1$ . إذا كان $k > -2$ فللمعادلة حلان $x = 1 \\pm \\sqrt{k + 2}$ .'
				}
			],
			watchOutAr:
				'$f$ و $f(x)$ ليسا نفس الشيء: الأولى دالة والثانية عدد. صورة العدد وحيدة لكن سوابقه قد تتعدد. جدول القيم لا يثبت اتجاه التغير مهما كثرت قيمه؛ البرهان يتطلب $T(a, b)$ لكل $a < b$ . ولا نقول «متناقصة على $\\mathbb{R}^*$ » للدالة $\\frac{1}{x}$ بل «على كل من المجالين».'
		},
		practice: [
			{
				questionAr: 'مجموعة تعريف الدالة $f(x) = \\frac{\\sqrt{x + 3}}{x - 1}$ هي:',
				options: ['$[-3, +\\infty[$', '$]-3, 1[ \\cup ]1, +\\infty[$', '$\\mathbb{R} \\setminus \\{1\\}$', '$[-3, 1[ \\cup ]1, +\\infty[$'],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: نسيت استبعاد العدد $1$ الذي يعدم المقام.',
					'خطأ: العدد $-3$ يجعل $x + 3 = 0$ والجذر معرف عنده ($\\sqrt{0} = 0$)، فلا يستبعد.',
					'خطأ: نسيت شرط الجذر $x + 3 \\geq 0$ ، فالأعداد الأصغر من $-3$ مستبعدة.',
					'إجابة صحيحة! $x + 3 \\geq 0$ تعطي $x \\geq -3$ ، و $x \\neq 1$ ، فـ $\\mathcal{D}_f = [-3, 1[ \\cup ]1, +\\infty[$ .'
				],
				explanationAr: 'شرطان: $x + 3 \\geq 0$ (الجذر التربيعي) و $x - 1 \\neq 0$ (المقام). الأول يعطي $[-3, +\\infty[$ ونستبعد منه $1$ ، فنحصل على $[-3, 1[ \\cup ]1, +\\infty[$ .'
			},
			{
				questionAr: 'نعتبر منحنى $f(x) = x^2 - 2x - 1$ الممثل جانباً. عدد سوابق العدد $1$ بالدالة $f$ هو:',
				svg: svgFunctionCurvePlot({
					fn: (x) => x * x - 2 * x - 1,
					xMin: -3,
					xMax: 5,
					yMin: -3,
					yMax: 8,
					curveLabel: 'C_f',
					asymptotes: [{ kind: 'horizontal', value: 1, label: 'y = 1', color: '#dc2626' }]
				}),
				options: ['لا توجد سابقة', 'سابقة واحدة', 'سابقتان', 'ثلاث سوابق'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: القيمة $1$ أكبر من القيمة الدنيا $-2$ ، فالمستقيم $y = 1$ يقطع المنحنى.',
					'خطأ: سابقة وحيدة لا تحدث إلا عند ذروة المنحنى $y = -2$ .',
					'إجابة صحيحة! المستقيم $y = 1$ يقطع المنحنى في نقطتين: $(x - 1)^2 = 3$ أي $x = 1 \\pm \\sqrt{3}$ .',
					'خطأ: دالة بهذا الشكل (قطع مكافئ) لا تقبل ثلاث سوابق لنفس القيمة.'
				],
				explanationAr: '$f(x) = 1 \\iff (x - 1)^2 - 2 = 1 \\iff (x - 1)^2 = 3 \\iff x = 1 + \\sqrt{3}$ أو $x = 1 - \\sqrt{3}$ . إذن للعدد $1$ سابقتان.'
			},
			{
				questionAr: 'لتكن $g(x) = x^2$ . أي العبارات الآتية صحيحة؟',
				options: [
					'$g$ متزايدة تماماً على $]-\\infty, 0]$ لأن $0$ أكبر من كل عدد سالب',
					'$g$ متناقصة تماماً على $]-\\infty, 0]$ لأن $T(a, b) = a + b < 0$ لكل $a < b \\leq 0$',
					'$g$ متناقصة تماماً على $\\mathbb{R}$ لأن $g(-2) > g(0)$',
					'$g$ ثابتة على $]-\\infty, 0]$ لأن $g(-1) = g(1)$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: مثال مضاد $-2 < -1$ و $g(-2) = 4 > g(-1) = 1$ ، فالدالة لم تحافظ على الترتيب.',
					'إجابة صحيحة! $T(a, b) = \\frac{b^2 - a^2}{b - a} = a + b$ وهي سالبة تماماً عندما $a < b \\leq 0$ ، فـ $g$ متناقصة تماماً على $]-\\infty, 0]$ .',
					'خطأ: على $[0, +\\infty[$ الدالة متزايدة، مثال $g(1) = 1 < g(2) = 4$ ، فهي ليست متناقصة على كل $\\mathbb{R}$ .',
					'خطأ: $g(-1) = g(1)$ تخص عددين من جانبين مختلفين من $0$ ، ولا تعني الثبات على مجال.'
				],
				explanationAr: 'من أجل $a < b \\leq 0$ لدينا $T(a, b) = \\frac{b^2 - a^2}{b - a} = a + b < 0$ ، إذن $g$ متناقصة تماماً على $]-\\infty, 0]$ . وعلى $[0, +\\infty[$ يكون $a + b > 0$ فهي متزايدة تماماً.'
			}
		]
	},

	// =========================================================================
	// LESSON 6: PARITY AND EXTREMA
	// =========================================================================
	{
		id: 'lesson_1as_tcst_t1_functions_parity_extrema',
		slug: '1as-tcst-t1-functions-parity-extrema',
		grade: '1as_tcst',
		yearSubjectId: 654,
		trimesterId: 't1',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: عموميات على الدوال، الشفعية، القيم الحدية والمعادلات البيانية',
		order: 6,
		titleAr: 'شفعية دالة (الزوجية والفردية) والقيم الحدية المحلية والمطلقة',
		objectives: [
			'دراسة شفعية دالة جبرياً (التحقق من تماثل مجموعة التعريف بالنسبة للمبدأ وحساب f(-x)) وتوظيف البرهان بمثال مضاد',
			'التعرف على شفعية دالة بيانياً انطلاقاً من تناظر منحناها بالنسبة لمحور التراتيب (دالة زوجية) أو بالنسبة للمبدأ (دالة فردية)',
			'تعيين القيم الحدية (العظمى والصغرى) لدالة على مجال قراءة من جدول التغيرات والمنحنى البياني والبرهان الجبري عليها بالمقارنة'
		],
		keywordsAr: [
			'شفعية دالة',
			'الدالة الزوجية',
			'الدالة الفردية',
			'التناظر المحوري والمركزي للمنحنى',
			'القيمة الحدية العظمى',
			'القيمة الحدية الصغرى'
		],
		discover: {
			scenarioAr:
				'عند طي ورقة شفافة على طول محور التراتيب ينطبق نصفا بعض المنحنيات على بعضهما، وعند تدوير منحنيات أخرى بنصف دورة حول المبدأ $O$ ينطبق المنحنى على نفسه. هذه الظواهر تُترجم جبرياً بشفعية الدالة. يمثل المنحنى المقابل الدالة $f(x) = x^4 - 2x^2$ ، وسنستكشف شفعيتها وقيمها الحدية.',
			svg: svgFunctionCurvePlot({
				fn: (x) => Math.pow(x, 4) - 2 * x * x,
				xMin: -3,
				xMax: 3,
				yMin: -2,
				yMax: 9,
				curveLabel: 'C_f',
				points: [
					{ x: -2, y: 8, label: '(-2,8)' },
					{ x: 2, y: 8, label: '(2,8)' },
					{ x: -1, y: -1, label: '(-1,-1)', color: '#dc2626' },
					{ x: 1, y: -1, label: '(1,-1)', color: '#dc2626' },
					{ x: 0, y: 0, label: 'O', color: '#7c3aed' }
				]
			}),
			steps: [
				{
					promptAr: 'احسب $f(2)$ و $f(-2)$ ثم $f(1)$ و $f(-1)$ من أجل $f(x) = x^4 - 2x^2$ . ماذا تلاحظ؟ ثم أثبت العلاقة العامة بين $f(-x)$ و $f(x)$ .',
					hintAr: 'القوى الزوجية لا تتأثر بإشارة العدد: $(-x)^4 = x^4$ و $(-x)^2 = x^2$ .',
					expectedInput: 'f(-x)=f(x)',
					revealAr: '$f(2) = 16 - 8 = 8 = f(-2)$ و $f(1) = -1 = f(-1)$ . وبصفة عامة $f(-x) = (-x)^4 - 2(-x)^2 = x^4 - 2x^2 = f(x)$ لكل $x \\in \\mathbb{R}$ ، إذن $f$ **دالة زوجية** ومنحناها متناظر بالنسبة لمحور التراتيب.'
				},
				{
					promptAr: 'لتكن $g(x) = x^3 - 3x$ . احسب $g(2)$ و $g(-2)$ ثم قارن $g(-x)$ مع $g(x)$ .',
					hintAr: 'القوى الفردية تحافظ على الإشارة: $(-x)^3 = -x^3$ . احسب $g(-x)$ وقارنه بـ $-g(x)$ .',
					expectedInput: 'g(-x)=-g(x)',
					revealAr: '$g(2) = 8 - 6 = 2$ و $g(-2) = -8 + 6 = -2$ . عموماً $g(-x) = -x^3 + 3x = -(x^3 - 3x) = -g(x)$ ، إذن $g$ **دالة فردية** ومنحناها متناظر بالنسبة لمبدأ المعلم $O$ .'
				},
				{
					promptAr: 'لتكن $h(x) = x^2 + x$ . هل $h$ زوجية؟ هل هي فردية؟ برّر بمثال مضاد.',
					hintAr: 'احسب $h(1)$ و $h(-1)$ ثم قارنهما مع $h(1)$ ومع $-h(1)$ .',
					expectedInput: 'لا زوجية ولا فردية',
					revealAr: '$h(1) = 2$ و $h(-1) = 0$ . بما أن $h(-1) \\neq h(1)$ فـ $h$ ليست زوجية، وبما أن $h(-1) \\neq -h(1) = -2$ فهي ليست فردية. مثال مضاد واحد يكفي لنفي الخاصية.'
				},
				{
					promptAr: 'هل الدالة $k(x) = \\frac{1}{x - 1}$ زوجية أو فردية؟ تأمل مجموعة تعريفها.',
					hintAr: 'اشترط أولاً أن يكون $\\mathcal{D}_k$ متناظراً بالنسبة للصفر: $x \\in \\mathcal{D}_k \\implies -x \\in \\mathcal{D}_k$ .',
					expectedInput: 'لا',
					revealAr: '$\\mathcal{D}_k = \\mathbb{R} \\setminus \\{1\\}$ . العدد $-1$ ينتمي إليها بينما $-(-1) = 1$ لا ينتمي. مجموعة التعريف غير متناظرة بالنسبة للصفر، فلا يمكن أن تكون $k$ زوجية ولا فردية.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**الدالة الزوجية**: مجموعة تعريفها $\\mathcal{D}$ **متناظرة** (إذا كان $x \\in \\mathcal{D}$ فإن $-x \\in \\mathcal{D}$) و $f(-x) = f(x)$ لكل $x \\in \\mathcal{D}$ . منحناها متناظر بالنسبة لمحور التراتيب. أمثلة: $x \\mapsto x^2$ ، $x \\mapsto |x|$ .',
				'**الدالة الفردية**: $\\mathcal{D}$ متناظرة و $f(-x) = -f(x)$ لكل $x \\in \\mathcal{D}$ . منحناها متناظر بالنسبة للمبدأ $O$ ، وإذا كان $0 \\in \\mathcal{D}$ فإن $f(0) = 0$ . أمثلة: $x \\mapsto x^3$ ، $x \\mapsto \\frac{1}{x}$ .',
				'**منهج دراسة الشفعية**: (1) نتحقق من تناظر $\\mathcal{D}$ ؛ (2) نحسب $f(-x)$ ؛ (3) نقارنه بـ $f(x)$ ثم بـ $-f(x)$ . إذا لم تتحقق أي من المقارنتين نكتفي بمثال مضاد، وقد لا تكون الدالة زوجية ولا فردية. الدالة المعدومة وحدها زوجية وفردية معاً.',
				'**الشفعية والتغير**: إذا كانت $f$ زوجية فإن اتجاهي تغيرها على مجالين متناظرين بالنسبة للصفر متعاكسان، وإذا كانت فردية فاتجاها التغير متطابقان. جداء دالتين فرديتين زوجي، ومجموع دالتين فرديتين فردي.',
				'**القيم الحدية**: $f(a)$ قيمة حدية **عظمى مطلقة** على $I$ إذا كان $f(x) \\leq f(a)$ لكل $x \\in I$ ، و **صغرى مطلقة** إذا كان $f(x) \\geq f(a)$ . وتكون **محلية** إذا تحقق الشرط على مجال مفتوح يحوي $a$ فقط. نبرهن جبرياً بدراسة إشارة $f(x) - f(a)$ (غالباً بتحليلها أو بكتابتها مربعاً كاملاً)، ونقرأها من جدول التغيرات عند تغير اتجاه التغير.'
			],
			visualSvg: svgMonotonyTable({
				fnName: 'f(x)',
				xs: ['-2', '-1', '0', '1', '2'],
				vals: [
					{ text: '8', pos: 'top' },
					{ text: '-1', pos: 'bottom' },
					{ text: '0', pos: 'mid' },
					{ text: '-1', pos: 'bottom' },
					{ text: '8', pos: 'top' }
				]
			}),
			visualCaptionAr: 'جدول تغيرات الدالة الزوجية $f(x) = x^4 - 2x^2$ على $[-2, 2]$ : قيمتان حديتان صغريان $f(-1) = f(1) = -1$ وقيمة حدية عظمى محلية $f(0) = 0$',
			examples: [
				{
					problemAr: 'ادرس شفعية الدوال: $f(x) = x^4 - 2x^2 + 3$ ، $g(x) = \\frac{x}{x^2 + 1}$ ، $h(x) = x^2 + x$ ، $k(x) = \\sqrt{4 - x^2}$ .',
					solutionAr:
						'$f$ : $\\mathcal{D}_f = \\mathbb{R}$ متناظرة و $f(-x) = x^4 - 2x^2 + 3 = f(x)$ ، فهي **زوجية**.\\n\\n$g$ : $x^2 + 1 > 0$ فـ $\\mathcal{D}_g = \\mathbb{R}$ متناظرة، و $g(-x) = \\frac{-x}{(-x)^2 + 1} = -\\frac{x}{x^2 + 1} = -g(x)$ ، فهي **فردية**.\\n\\n$h$ : $\\mathcal{D}_h = \\mathbb{R}$ لكن $h(1) = 2$ و $h(-1) = 0$ ، فلا $h(-1) = h(1)$ ولا $h(-1) = -h(1)$ ، إذن **لا زوجية ولا فردية**.\\n\\n$k$ : $4 - x^2 \\geq 0 \\iff x \\in [-2, 2]$ متناظرة، و $k(-x) = \\sqrt{4 - (-x)^2} = k(x)$ ، فهي **زوجية**.'
				},
				{
					problemAr: 'أ) بيّن أن $f(x) = -x^2 + 4x - 1$ تقبل قيمة حدية عظمى مطلقة على $\\mathbb{R}$ . ب) من أجل $\\varphi(x) = x^4 - 2x^2$ بيّن أن $\\varphi(x) + 1 = (x^2 - 1)^2$ واستنتج قيمة حدية صغرى مطلقة، ثم بيّن أن $\\varphi(0) = 0$ قيمة حدية عظمى محلية.',
					solutionAr:
						'أ) $f(x) = -(x^2 - 4x + 4) + 4 - 1 = 3 - (x - 2)^2$ . بما أن $(x - 2)^2 \\geq 0$ فإن $f(x) \\leq 3 = f(2)$ لكل $x$ ، إذن $f(2) = 3$ قيمة حدية عظمى مطلقة تبلغ عند $x = 2$ فقط.\\n\\nب) $(x^2 - 1)^2 = x^4 - 2x^2 + 1 = \\varphi(x) + 1$ ، وهو أكبر من أو يساوي $0$ ، إذن $\\varphi(x) \\geq -1$ لكل $x$ وتتحقق المساواة عند $x = 1$ و $x = -1$ : القيمة الحدية الصغرى المطلقة $-1$ .\\n\\nمن أجل $x \\in ]-1, 1[$ : $\\varphi(0) - \\varphi(x) = 2x^2 - x^4 = x^2(2 - x^2) \\geq 0$ لأن $x^2 < 1 < 2$ ، فـ $\\varphi(x) \\leq \\varphi(0) = 0$ على $]-1, 1[$ ، وهي قيمة حدية عظمى **محلية** وليست مطلقة لأن $\\varphi(2) = 8 > 0$ .'
				},
				{
					problemAr: 'دالة فردية $f$ معرفة على $[-3, 3]$ ، علماً أن $f(1) = 2$ و $f(3) = -1$ . أكمل قيم $f(-1)$ و $f(-3)$ و $f(0)$ ، ثم إذا كانت $f$ متزايدة تماماً على $[0, 1]$ فما اتجاه تغيرها على $[-1, 0]$ ؟',
					solutionAr:
						'لأن $f$ فردية: $f(-1) = -f(1) = -2$ و $f(-3) = -f(3) = 1$ . وبما أن $0 \\in [-3, 3]$ فإن $f(0) = -f(0)$ أي $2f(0) = 0$ ، إذن $f(0) = 0$ .\\n\\nدالة فردية لها نفس اتجاه التغير على مجالين متناظرين: فهي متزايدة تماماً على $[-1, 0]$ أيضاً. تحقق: من $-1 < 0$ نجد $f(-1) = -2 < f(0) = 0$ ✓ .'
				}
			],
			watchOutAr:
				'تناظر مجموعة التعريف شرط أول لا بد منه: $\\frac{1}{x - 1}$ ليست فردية رغم أن $\\frac{1}{x}$ فردية. التحقق من $f(-a) = f(a)$ عند عدد واحد لا يثبت الزوجية، لكن مثالاً مضاداً واحداً ينفيها. ولا نخلط بين **القيمة** الحدية (الصورة $f(a)$) و **النقطة** $a$ التي تبلغها. وقد تكون الدالة زوجية ولا فردية بسبب $f(0) \\neq 0$ ، مثل $x \\mapsto x^2 + 1$ .'
		},
		practice: [
			{
				questionAr: 'أي الدوال الآتية دالة فردية على مجموعة تعريفها؟',
				options: ['$h(x) = |x| + x^2$', '$k(x) = \\sqrt{x}$', '$g(x) = \\frac{x^3}{x^2 + 1}$', '$f(x) = x^3 + 1$'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: $h(-x) = |-x| + (-x)^2 = h(x)$ ، فهي زوجية وليست فردية.',
					'خطأ: مجموعة تعريفها $[0, +\\infty[$ غير متناظرة (فالعدد $1$ فيها ولا يوجد $-1$)، فليست زوجية ولا فردية.',
					'إجابة صحيحة! $\\mathcal{D}_g = \\mathbb{R}$ متناظرة و $g(-x) = \\frac{-x^3}{x^2 + 1} = -g(x)$ .',
					'خطأ: $f(1) = 2$ و $f(-1) = 0$ ؛ ليست فردية لأن $f(-1) \\neq -f(1)$ ، وليست زوجية أيضاً.'
				],
				explanationAr: 'الدالة $g$ معرفة على $\\mathbb{R}$ (متناظرة) و $g(-x) = \\frac{(-x)^3}{(-x)^2 + 1} = \\frac{-x^3}{x^2 + 1} = -g(x)$ ، فهي فردية. الباقية: $h$ زوجية، $k$ مجموعة تعريفها غير متناظرة، $f$ لا زوجية ولا فردية.'
			},
			{
				questionAr: 'دالة فردية $f$ معرفة على $\\mathbb{R}$ وتحقق $f(2) = -3$ . قيمة $f(-2) + 2f(0)$ هي:',
				options: ['$-3$', '$0$', '$6$', '$3$'],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: هذه قيمة $f(2)$ ؛ في الدالة الفردية $f(-2) = -f(2)$ وليس $f(2)$ .',
					'خطأ: $f(0) = 0$ فعلاً لكن $f(-2) = 3$ غير معدومة، فالمجموع لا ينعدم.',
					'خطأ: لا يوجد ما يبرر مضاعفة $f(-2)$ ؛ القيمة $2f(0) = 0$ .',
					'إجابة صحيحة! $f(-2) = -f(2) = 3$ و $f(0) = 0$ (لأن $f(0) = -f(0)$) ، فالمجموع $3 + 0 = 3$ .'
				],
				explanationAr: 'الدالة فردية: $f(-2) = -f(2) = 3$ . وبما أن $0 \\in \\mathbb{R}$ فإن $f(0) = -f(0)$ ، إذن $f(0) = 0$ . النتيجة: $f(-2) + 2f(0) = 3$ .'
			},
			{
				questionAr: 'القيمة الحدية الصغرى المطلقة للدالة $f(x) = x^4 - 2x^2$ على $\\mathbb{R}$ هي:',
				svg: svgFunctionCurvePlot({
					fn: (x) => Math.pow(x, 4) - 2 * x * x,
					xMin: -3,
					xMax: 3,
					yMin: -2,
					yMax: 9,
					curveLabel: 'C_f'
				}),
				options: ['$0$', '$1$', '$-1$', '$-2$'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: $f(0) = 0$ قيمة حدية عظمى **محلية** عند $x = 0$ ، وليست صغرى (القيم المجاورة سالبة).',
					'خطأ: لا يوجد في الرسم ما يشير إلى القيمة $1$ كأصغر قيمة؛ والمنحنى يهبط تحتها.',
					'إجابة صحيحة! $f(x) + 1 = (x^2 - 1)^2 \\geq 0$ ، إذن $f(x) \\geq -1$ مع المساواة عند $x = \\pm 1$ .',
					'خطأ: $-2$ هي مجرد حد أدنى المحور في الرسم، والدالة لا تنزل تحت $-1$ .'
				],
				explanationAr: 'نكتب $f(x) + 1 = x^4 - 2x^2 + 1 = (x^2 - 1)^2 \\geq 0$ ، فـ $f(x) \\geq -1$ لكل $x \\in \\mathbb{R}$ ، وتتحقق المساواة عند $x = 1$ و $x = -1$ . القيمة الحدية الصغرى المطلقة هي $-1$ .'
			}
		]
	},

	// =========================================================================
	// LESSON 7: x -> ax^2, x -> a/x AND GRAPHICAL SOLVING
	// =========================================================================
	{
		id: 'lesson_1as_tcst_t1_quadratic_homographic_intro_equations',
		slug: '1as-tcst-t1-quadratic-homographic-graphical-solving',
		grade: '1as_tcst',
		yearSubjectId: 654,
		trimesterId: 't1',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: عموميات على الدوال، الشفعية، القيم الحدية والمعادلات البيانية',
		order: 7,
		titleAr: 'مقدمة الدوال كثيرات الحدود من الدرجة الثانية والدوال التناظرية وحل المعادلات بيانياً',
		objectives: [
			'الاستكشاف الأولي لسلوك ومنحنيات دوال كثيرات الحدود من الدرجة الثانية (x ↦ ax²) والدوال التناظرية (x ↦ a/x)',
			'الحل البياني لمعادلات ومتراجحات من الشكل f(x) = k و f(x) ≤ k بتعيين فواصل نقط تقاطع ووضعية المنحنى مع المستقيم y = k',
			'الحل البياني لمعادلات ومتراجحات من الشكل f(x) = g(x) و f(x) ≤ g(x) بتحديد الوضع النسبي لمنحنيين وفواصل نقط تقاطعهما'
		],
		keywordsAr: [
			'دوال كثيرات الحدود',
			'الدالة التناظرية',
			'الحل البياني لمعادلة',
			'الحل البياني لمتراجحة',
			'الوضع النسبي لمنحنيين',
			'تقاطع منحنيات'
		],
		discover: {
			scenarioAr:
				'مساحة مربع ضلعه $x$ هي $x^2$ ، وضغط غاز عند ثبوت درجة الحرارة يتناسب عكساً مع حجمه: $P = \\frac{a}{V}$ . هاتان الدالتان $x \\mapsto ax^2$ و $x \\mapsto \\frac{a}{x}$ هما أبسط دالة من الدرجة الثانية وأبسط دالة تناظرية. سنستعمل منحنياتهما لحل معادلات ومتراجحات بيانياً بمقارنة المنحنى بمستقيم أفقي أو بمنحنى آخر.',
			svg: svgFunctionCurvePlot({
				fn: (x) => x * x,
				xMin: -4,
				xMax: 4,
				yMin: -1,
				yMax: 9,
				curveLabel: 'y = x²',
				asymptotes: [{ kind: 'horizontal', value: 4, label: 'y = 4', color: '#dc2626' }],
				points: [
					{ x: -2, y: 4, label: '(-2,4)' },
					{ x: 2, y: 4, label: '(2,4)' }
				]
			}),
			steps: [
				{
					promptAr: 'اعتماداً على المنحنى، حل بيانياً $x^2 = 4$ ثم $x^2 \\leq 4$ .',
					hintAr: 'الحلول هي فواصل نقاط تقاطع المنحنى مع المستقيم $y = 4$ ، والمتراجحة تعني أن المنحنى تحت المستقيم أو عليه.',
					expectedInput: '[-2,2]',
					revealAr: 'المنحنى يقطع المستقيم $y = 4$ عند الفاصلتين $-2$ و $2$ ، فحلا المعادلة $x^2 = 4$ هما $\\{-2, 2\\}$ . والمنحنى تحت المستقيم أو عليه من أجل $x \\in [-2, 2]$ ، فمجموعة حلول $x^2 \\leq 4$ هي $[-2, 2]$ .'
				},
				{
					promptAr: 'احسب صور العدد $2$ بالدوال $x \\mapsto 2x^2$ ، $x \\mapsto x^2$ ، $x \\mapsto \\frac{1}{2}x^2$ ، $x \\mapsto -x^2$ . كيف يؤثر المعامل $a$ في شكل المنحنى؟',
					hintAr: 'قارن القيم $8$ ، $4$ ، $2$ ، $-4$ : أين يقع المنحنى وإلى أي جهة يفتح؟',
					expectedInput: '8, 4, 2, -4',
					revealAr: 'الصور هي $8$ و $4$ و $2$ و $-4$ . إذا كان $a > 0$ فالقطع المكافئ في الأعلى ويفتح نحو الأعلى، وإذا كان $a < 0$ فهو في الأسفل. كلما كبر $|a|$ ضاق القطع المكافئ (أقرب إلى محور التراتيب). ذروته دائماً $O(0, 0)$ .'
				},
				{
					promptAr: 'لتكن $h(x) = \\frac{2}{x}$ . احسب $h(1)$ و $h(2)$ و $h(-1)$ ثم حل بيانياً ثم جبرياً $h(x) = 1$ و $h(x) \\leq 1$ .',
					hintAr: 'ارسم المستقيم $y = 1$ مع القطع الزائد واستبعد الصفر لأن $h$ غير معرفة عنده. من أجل $x < 0$ الكسر $\\frac{2}{x}$ سالب.',
					expectedInput: ']-inf,0[ U [2,+inf[',
					revealAr: '$h(1) = 2$ و $h(2) = 1$ و $h(-1) = -2$ . المعادلة $\\frac{2}{x} = 1$ تعطي $x = 2$ . والمتراجحة $\\frac{2}{x} \\leq 1$ : من أجل $x < 0$ المنحنى تحت المستقيم دائماً، ومن أجل $x > 0$ يكون تحته عندما $x \\geq 2$ . إذن $S = ]-\\infty, 0[ \\cup [2, +\\infty[$ ، ولاحظ أن $0$ مستبعد.'
				},
				{
					promptAr: 'عيّن بيانياً فواصل نقط تقاطع منحنى $f(x) = x^2$ والمستقيم $g(x) = x + 2$ ثم حل $f(x) \\leq g(x)$ .',
					hintAr: 'اقرأ فاصلتي نقطتي التقاطع ثم حدد المجال الذي يقع فيه $C_f$ تحت $C_g$ ، وتحقق جبرياً بحل $x^2 = x + 2$ .',
					expectedInput: '[-1,2]',
					revealAr: 'التقاطع عند الفاصلتين $-1$ و $2$ : النقطتان $(-1, 1)$ و $(2, 4)$ . تحقق: $x^2 - x - 2 = (x - 2)(x + 1) = 0$ . المنحنى $C_f$ يقع تحت المستقيم أو عليه من أجل $x \\in [-1, 2]$ ، فمجموعة حلول $f(x) \\leq g(x)$ هي $[-1, 2]$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**دالة المربع المضروبة في معامل** $f(x) = ax^2$ ($a \\neq 0$): معرفة على $\\mathbb{R}$ ، زوجية، منحناها **قطع مكافئ** ذروته $O$ ومحور تناظره محور التراتيب. نسبة تزايدها $T(u, v) = a(u + v)$ . إذا كان $a > 0$ : متناقصة تماماً على $]-\\infty, 0]$ ومتزايدة تماماً على $[0, +\\infty[$ وقيمتها الحدية الصغرى $0$ . وإذا كان $a < 0$ : العكس وقيمتها الحدية العظمى $0$ .',
				'**الدالة التناظرية** $h(x) = \\frac{a}{x}$ ($a \\neq 0$): معرفة على $\\mathbb{R}^*$ ، فردية، منحناها **قطع زائد** مركز تناظره $O$ ومقاربه محورا الإحداثيات. نسبة تزايدها $T(u, v) = -\\frac{a}{uv}$ . إذا كان $a > 0$ : متناقصة تماماً على كل من $]-\\infty, 0[$ و $]0, +\\infty[$ ومنحناها في الربعين الأول والثالث. وإذا كان $a < 0$ : متزايدة تماماً على كل منهما ومنحناها في الربعين الثاني والرابع.',
				'**الحل البياني لـ $f(x) = k$ و $f(x) \\leq k$** : حلول المعادلة هي فواصل نقط تقاطع $C_f$ مع المستقيم الأفقي $y = k$ ، وحلول $f(x) \\leq k$ هي فواصل نقط $C_f$ التي تقع تحت المستقيم أو عليه (وتقع فوقه من أجل $f(x) \\geq k$ ).',
				'**الحل البياني لـ $f(x) = g(x)$ و $f(x) \\leq g(x)$** : حلول المعادلة هي فواصل نقط تقاطع $C_f$ و $C_g$ ، وحلول المتراجحة هي فواصل النقط التي يكون فيها $C_f$ تحت $C_g$ أو عليه (الوضع النسبي للمنحنيين).',
				'**الدقة والتحقق**: القراءة البيانية قيمة تقريبية، فنتحقق جبرياً بالتعويض في الدالتين. وفي المتراجحة غير الصارمة ($\\leq$ و $\\geq$) تدخل الفواصل التي تعطي المساواة، وفي الصارمة ($<$ و $>$) لا تدخل. ولا ننسى استبعاد القيم التي تنعدم عندها المقامات.'
			],
			visualSvg: svgFunctionCurvePlot({
				fn: (x) => 2 / x,
				xMin: -4,
				xMax: 4,
				yMin: -4,
				yMax: 5,
				curveLabel: 'y = 2/x',
				asymptotes: [
					{ kind: 'vertical', value: 0, label: 'x = 0', color: '#94a3b8' },
					{ kind: 'oblique', a: 1, b: 1, label: 'y = x + 1', color: '#dc2626' }
				],
				points: [
					{ x: 1, y: 2, label: '(1,2)' },
					{ x: -2, y: -1, label: '(-2,-1)' }
				]
			}),
			visualCaptionAr: 'القطع الزائد $y = \\frac{2}{x}$ والمستقيم $y = x + 1$ يتقاطعان في $(1, 2)$ و $(-2, -1)$ ، ومنه $\\frac{2}{x} \\leq x + 1$ على $[-2, 0[ \\cup [1, +\\infty[$',
			examples: [
				{
					problemAr: 'لتكن $f(x) = \\frac{1}{2}x^2$ . حل بيانياً ثم جبرياً $f(x) = 8$ و $f(x) \\leq 8$ ، ثم ناقش عدد حلول $f(x) = k$ حسب $k$ .',
					solutionAr:
						'$f(x) = 8 \\iff x^2 = 16 \\iff x = -4$ أو $x = 4$ . المنحنى يقطع $y = 8$ في $(-4, 8)$ و $(4, 8)$ ، ويقع تحت المستقيم بينهما: $f(x) \\leq 8 \\iff -4 \\leq x \\leq 4$ ، أي $S = [-4, 4]$ . وبالتالي $f(x) > 8$ على $]-\\infty, -4[ \\cup ]4, +\\infty[$ .\\n\\nالمناقشة: $f(x) = k \\iff x^2 = 2k$ . إذا كان $k < 0$ فلا حل. إذا كان $k = 0$ فالحل $x = 0$ . وإذا كان $k > 0$ فالحلان $x = \\pm\\sqrt{2k}$ .'
				},
				{
					problemAr: 'لتكن $h(x) = \\frac{6}{x}$ . حل في $\\mathbb{R}^*$ المعادلة $h(x) = 3$ والمتراجحة $h(x) \\geq 3$ . وتحقق بعدد من كل مجال.',
					solutionAr:
						'$h(x) = 3 \\iff x = 2$ . المتراجحة $\\frac{6}{x} \\geq 3$ : إذا كان $x < 0$ فإن $h(x) < 0 < 3$ ، فلا حل. وإذا كان $x > 0$ فبالضرب في $x > 0$ : $6 \\geq 3x \\iff x \\leq 2$ . إذن $S = ]0, 2]$ .\\n\\nبيانياً: الفرع الأول من القطع الزائد يقع فوق المستقيم $y = 3$ أو عليه من أجل $0 < x \\leq 2$ فقط.\\n\\nتحقق: $x = 1$ : $h(1) = 6 \\geq 3$ ✓ ، $x = 3$ : $h(3) = 2 < 3$ (خارج $S$) ✓ ، $x = -1$ : $h(-1) = -6 < 3$ (خارج $S$) ✓ .'
				},
				{
					problemAr: 'ادرس الوضع النسبي لمنحنى $f(x) = x^2$ والمستقيم $g(x) = x + 2$ بيانياً ثم جبرياً.',
					solutionAr:
						'نقط التقاطع: $x^2 = x + 2 \\iff x^2 - x - 2 = 0 \\iff (x - 2)(x + 1) = 0$ ، فالفاصلتان $x = 2$ و $x = -1$ والنقطتان $(2, 4)$ و $(-1, 1)$ .\\n\\nالوضع النسبي: $f(x) - g(x) = (x - 2)(x + 1)$ سالب بين الجذرين وموجب خارجهما. إذن:\\n- $C_f$ تحت $C_g$ على $]-1, 2[$ ،\\n- $C_f$ فوق $C_g$ على $]-\\infty, -1[ \\cup ]2, +\\infty[$ ،\\n- ويتقاطعان عند $x = -1$ و $x = 2$ .'
				}
			],
			watchOutAr:
				'لا نقول إن $x \\mapsto \\frac{a}{x}$ متناقصة على $\\mathbb{R}^*$ بل على كل من المجالين $]-\\infty, 0[$ و $]0, +\\infty[$ . حلول $\\frac{4}{x} \\leq 2$ تتضمن كل الأعداد السالبة وليس فقط الموجبة، مع استبعاد $0$ . المستقيم $y = k$ أفقي، والمستقيم $x = k$ عمودي: لا نخلط بينهما. والقراءة البيانية لا تعوض التحقق الجبري عندما تكون الفواصل غير واضحة على الرسم.'
		},
		practice: [
			{
				questionAr: 'اعتماداً على منحنى $f(x) = x^2$ والمستقيم $y = 9$ ، حل المتراجحة $x^2 < 9$ يعطي:',
				svg: svgFunctionCurvePlot({
					fn: (x) => x * x,
					xMin: -4,
					xMax: 4,
					yMin: -1,
					yMax: 10,
					curveLabel: 'y = x²',
					asymptotes: [{ kind: 'horizontal', value: 9, label: 'y = 9', color: '#dc2626' }],
					points: [
						{ x: -3, y: 9, label: '(-3,9)' },
						{ x: 3, y: 9, label: '(3,9)' }
					]
				}),
				options: ['$]-\\infty, 3[$', '$]-3, 3[$', '$[-3, 3]$', '$]-\\infty, -3[ \\cup ]3, +\\infty[$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: العدد $-4$ مثلاً يحقق $(-4)^2 = 16 > 9$ ، فهو ليس حلاً؛ يجب أيضاً $x > -3$ .',
					'إجابة صحيحة! المنحنى تحت المستقيم $y = 9$ تماماً (دون الفاصلتين) عندما $-3 < x < 3$ .',
					'خطأ: المتراجحة صارمة ($<$) فالفاصلتان $-3$ و $3$ حيث $x^2 = 9$ مستثناتان.',
					'خطأ: هذه مجموعة حلول المتراجحة المعاكسة $x^2 > 9$ ، حيث يكون المنحنى فوق المستقيم.'
				],
				explanationAr: '$x^2 < 9$ تعني أن المنحنى يقع تحت المستقيم $y = 9$ تماماً. نقطتا التقاطع فاصلتاهما $-3$ و $3$ ، فالحل $]-3, 3[$ (الطرفان مستثنيان لأن المتراجحة صارمة).'
			},
			{
				questionAr: 'مجموعة حلول المتراجحة $\\frac{4}{x} \\leq 2$ في $\\mathbb{R}^*$ هي:',
				options: ['$[2, +\\infty[$', '$]0, 2]$', '$]-\\infty, 0[ \\cup [2, +\\infty[$', '$]-\\infty, 2]$'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: أهملت الأعداد السالبة؛ فمن أجل $x < 0$ يكون $\\frac{4}{x} < 0 \\leq 2$ وهي تحقق المتراجحة.',
					'خطأ: على $]0, 2[$ مثلاً $x = 1$ : $\\frac{4}{1} = 4 > 2$ فهذا المجال لا يحقق المتراجحة.',
					'إجابة صحيحة! من أجل $x < 0$ المتراجحة محققة دائماً، ومن أجل $x > 0$ : $4 \\leq 2x \\iff x \\geq 2$ .',
					'خطأ: هذا المجال يحوي $0$ حيث $\\frac{4}{x}$ غير معرفة، كما يحوي $]0, 2[$ حيث المتراجحة غير محققة.'
				],
				explanationAr: 'ندرس حالتين: إذا كان $x < 0$ فإن $\\frac{4}{x} < 0 < 2$ فالمتراجحة محققة. وإذا كان $x > 0$ فبالضرب في $x$ : $4 \\leq 2x$ أي $x \\geq 2$ . إذن $S = ]-\\infty, 0[ \\cup [2, +\\infty[$ .'
			},
			{
				questionAr: 'مجموعة حلول المتراجحة $x^2 \\geq x + 2$ في $\\mathbb{R}$ هي (انظر الرسم):',
				svg: svgFunctionCurvePlot({
					fn: (x) => x * x,
					xMin: -3,
					xMax: 4,
					yMin: -1,
					yMax: 10,
					curveLabel: 'y = x²',
					asymptotes: [{ kind: 'oblique', a: 1, b: 2, label: 'y = x + 2', color: '#dc2626' }],
					points: [
						{ x: -1, y: 1, label: '(-1,1)' },
						{ x: 2, y: 4, label: '(2,4)' }
					]
				}),
				options: ['$[-1, 2]$', '$]-1, 2[$', '$\\{-1, 2\\}$', '$]-\\infty, -1] \\cup [2, +\\infty[$'],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: على $[-1, 2]$ المنحنى $y = x^2$ تحت المستقيم، وهذا يوافق $x^2 \\leq x + 2$ وليس $\\geq$ .',
					'خطأ: على $]-1, 2[$ المنحنى تحت المستقيم تماماً، وهذا يوافق $x^2 < x + 2$ .',
					'خطأ: $\\{-1, 2\\}$ هما حلا المعادلة $x^2 = x + 2$ فقط، أما المتراجحة فتشمل مجالات.',
					'إجابة صحيحة! المنحنى فوق المستقيم أو عليه خارج الفاصلتين: $x \\leq -1$ أو $x \\geq 2$ .'
				],
				explanationAr: '$x^2 - x - 2 = (x - 2)(x + 1) \\geq 0$ خارج الجذرين $-1$ و $2$ (وعندهما). إذن $S = ]-\\infty, -1] \\cup [2, +\\infty[$ ، وهو ما يوافق وقوع $C_f$ فوق المستقيم أو عليه.'
			}
		]
	}
];
