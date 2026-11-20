import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const PHYSICS_SVG_DIR = process.env.MEDIA_ROOT
	? resolve(process.env.MEDIA_ROOT, 'generated/physics-svg')
	: existsSync('/var/lib/sujetstore-media')
		? resolve('/var/lib/sujetstore-media/generated/physics-svg')
		: resolve('static/generated/physics-svg');

export function savePhysicsSvgAsset(filename: string, svgContent: string): string {
	const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/\.svg$/i, '') + '.svg';
	if (!existsSync(PHYSICS_SVG_DIR)) {
		mkdirSync(PHYSICS_SVG_DIR, { recursive: true });
	}
	const outPath = join(PHYSICS_SVG_DIR, safeName);
	writeFileSync(outPath, svgContent.trim() + '\n', 'utf-8');
	return `/generated/physics-svg/${safeName}`;
}

function esc(str: string): string {
	return str
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

const SUB_MAP: Record<string, string> = {
	'₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
	'₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
	'₊': '+', '₋': '-'
};
const SUP_MAP: Record<string, string> = {
	'⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
	'⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
	'⁺': '+', '⁻': '-'
};

/**
 * Escapes XML and turns Unicode or `_`-delimited sub/superscripts (including ₁/₂, _max, _C)
 * into crisp SVG tspans so Typst SVG renderer never falls back to FreeMono or shows raw underscores.
 */
function escRich(str: string): string {
	const tokenRe =
		/((?<=[A-Za-zΔσλτ])_\{[^}]+\}|(?<=[A-Za-zΔσλτ])_[A-Za-z0-9]+(?:\/[0-9]+)?|[₀-₉₊₋]+(?:\/[₀-₉]+)?|[⁰-⁹⁺⁻]+)/g;
	let out = '';
	let lastIdx = 0;
	for (const m of str.matchAll(tokenRe)) {
		const idx = m.index ?? 0;
		if (idx > lastIdx) out += esc(str.slice(lastIdx, idx));
		const tok = m[0];
		const isSup = /^[⁰-⁹⁺⁻]/.test(tok);
		const isLast = idx + tok.length >= str.length;
		if (isSup) {
			const plain = tok
				.split('')
				.map((c) => SUP_MAP[c] ?? c)
				.join('');
			out += `<tspan dy="-4" font-size="72%">${esc(plain)}</tspan>`;
			if (!isLast) out += `<tspan dy="4">&#8203;</tspan>`;
		} else {
			let plain = tok;
			if (plain.startsWith('_{') && plain.endsWith('}')) {
				plain = plain.slice(2, -1);
			} else if (plain.startsWith('_')) {
				plain = plain.slice(1);
			} else {
				plain = plain
					.split('')
					.map((c) => SUB_MAP[c] ?? c)
					.join('');
			}
			out += `<tspan dy="3" font-size="72%">${esc(plain)}</tspan>`;
			if (!isLast) out += `<tspan dy="-3">&#8203;</tspan>`;
		}
		lastIdx = idx + tok.length;
	}
	if (lastIdx < str.length) out += esc(str.slice(lastIdx));
	return out;
}

export function wrapPhysicsSvg(width: number, height: number, body: string): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" font-family="Arabic Transparent" style="background:#ffffff;font-family:'Arabic Transparent',Arial,sans-serif">${body}</svg>`;
}

/** 1. Precision Physics Curve Plotter (RC, RL, RLC, Kinetics, pH Titration, Conductimetry, Radioactive Decay, Kinematics) */
export function svgPhysicsCurvePlot(opts: {
	xMin?: number;
	xMax: number;
	yMin?: number;
	yMax: number;
	xLabel: string;
	yLabel: string;
	xStep?: number;
	yStep?: number;
	curves: Array<{
		fn: (x: number) => number;
		color?: string;
		label?: string;
		dashed?: boolean;
		strokeWidth?: number;
	}>;
	dashedGuides?: Array<{
		x1: number;
		y1: number;
		x2: number;
		y2: number;
		color?: string;
		label?: string;
		labelPos?: 'top' | 'right' | 'left' | 'bottom';
	}>;
	points?: Array<{ x: number; y: number; label: string; color?: string; dx?: number; dy?: number }>;
	title?: string;
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 420;
	const h = opts.height ?? 275;
	const padL = 56;
	const padR = 32;
	const padT = opts.title ? 58 : 34;
	const padB = 44;
	const pw = w - padL - padR;
	const ph = h - padT - padB;

	const xMin = opts.xMin ?? 0;
	const xMax = opts.xMax;
	const yMin = opts.yMin ?? 0;
	const yMax = opts.yMax;
	const xSpan = xMax - xMin || 1;
	const ySpan = yMax - yMin || 1;

	const sx = (x: number) => padL + ((x - xMin) / xSpan) * pw;
	const sy = (y: number) => padT + ((yMax - y) / ySpan) * ph;

	const xStep = opts.xStep ?? xSpan / 5;
	const yStep = opts.yStep ?? ySpan / 5;
	// Two-pass white halo: paint-order="stroke" is ignored by Typst's usvg renderer,
	// which otherwise strokes white OVER the dark glyph fill.
	const haloText = (attrs: string, color: string, richHtml: string) =>
		`<text ${attrs} fill="#ffffff" stroke="#ffffff" stroke-width="3.6" stroke-linejoin="round" stroke-linecap="round">${richHtml}</text>` +
		`<text ${attrs} fill="${color}">${richHtml}</text>`;

	let body = '';
	if (opts.title) {
		body += `<text x="${w / 2}" y="20" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#0f172a">${escRich(opts.title)}</text>`;
	}

	// Gridlines & ticks
	for (let xv = xMin; xv <= xMax + xStep * 1e-6; xv += xStep) {
		const px = sx(xv);
		body += `<line x1="${px.toFixed(1)}" y1="${padT}" x2="${px.toFixed(1)}" y2="${padT + ph}" stroke="#e2e8f0" stroke-width="1"/>`;
		const lbl = Number.isInteger(Number(xv.toFixed(4))) ? xv.toFixed(0) : Number(xv.toFixed(2)).toString();
		body += `<text x="${px.toFixed(1)}" y="${padT + ph + 16}" text-anchor="middle" font-size="11" fill="#475569">${lbl}</text>`;
	}
	for (let yv = yMin; yv <= yMax + yStep * 1e-6; yv += yStep) {
		const py = sy(yv);
		body += `<line x1="${padL}" y1="${py.toFixed(1)}" x2="${padL + pw}" y2="${py.toFixed(1)}" stroke="#e2e8f0" stroke-width="1"/>`;
		const lbl = Number.isInteger(Number(yv.toFixed(4))) ? yv.toFixed(0) : Number(yv.toFixed(2)).toString();
		body += `<text x="${padL - 8}" y="${(py + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#475569">${lbl}</text>`;
	}

	// Axes
	const yAxisX = xMin <= 0 && xMax >= 0 ? sx(0) : padL;
	const xAxisY = yMin <= 0 && yMax >= 0 ? sy(0) : padT + ph;
	const yLabelOnLeft = yAxisX > padL + pw * 0.72;
	body += `<defs><marker id="axArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#1e293b"/></marker></defs>`;
	body += `<line x1="${padL}" y1="${xAxisY.toFixed(1)}" x2="${padL + pw + 12}" y2="${xAxisY.toFixed(1)}" stroke="#1e293b" stroke-width="1.6" marker-end="url(#axArr)"/>`;
	body += `<line x1="${yAxisX.toFixed(1)}" y1="${padT + ph}" x2="${yAxisX.toFixed(1)}" y2="${padT - 12}" stroke="#1e293b" stroke-width="1.6" marker-end="url(#axArr)"/>`;
	body += haloText(`x="${padL + pw + 10}" y="${xAxisY - 8}" text-anchor="end" font-size="12" font-weight="bold"`, '#0f172a', escRich(opts.xLabel));
	body += haloText(`x="${(yLabelOnLeft ? yAxisX - 10 : yAxisX + 10).toFixed(1)}" y="${padT - 10}" text-anchor="${yLabelOnLeft ? 'end' : 'start'}" font-size="12" font-weight="bold"`, '#0f172a', escRich(opts.yLabel));

	// Dashed guides (tangents, half-lives, asymptotes, equivalence lines)
	for (const g of opts.dashedGuides ?? []) {
		const x1 = sx(g.x1);
		const y1 = sy(g.y1);
		const x2 = sx(g.x2);
		const y2 = sy(g.y2);
		const col = g.color ?? '#dc2626';
		body += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${col}" stroke-width="1.4" stroke-dasharray="5,4"/>`;
		if (g.label) {
			const isHoriz = Math.abs(y1 - y2) < 1.5;
			const isVert = Math.abs(x1 - x2) < 1.5;
			let lx = (x1 + x2) / 2;
			let ly = (y1 + y2) / 2;
			let anchor = 'middle';
			let rotateAttr = '';
			if (isHoriz) {
				lx = padL + pw * 0.42;
				ly = g.labelPos === 'bottom' ? y1 + 15 : y1 - 8;
			} else if (isVert) {
				const nearRight = x1 > padL + pw * 0.78;
				anchor = nearRight ? 'end' : 'start';
				lx = nearRight ? x1 - 7 : x1 + 7;
				ly = (y1 + y2) / 2;
			} else {
				const [ax, ay, bx, by] = x1 <= x2 ? [x1, y1, x2, y2] : [x2, y2, x1, y1];
				const segDx = bx - ax;
				const segDy = by - ay;
				const segLen = Math.max(1, Math.hypot(segDx, segDy));
				const ux = segDx / segLen;
				const uy = segDy / segLen;
				const angle = (Math.atan2(segDy, segDx) * 180) / Math.PI;
				// Place label parallel to the diagonal tangent on the curve-free side
				const normOffset = 9;
				const nx = segDy < 0 ? uy : -uy;
				const ny = segDy < 0 ? -ux : ux;
				lx = (ax + bx) / 2 + nx * normOffset;
				ly = (ay + by) / 2 + ny * normOffset;
				anchor = 'middle';
				rotateAttr = ` transform="rotate(${angle.toFixed(1)}, ${lx.toFixed(1)}, ${ly.toFixed(1)})"`;
			}
			body += haloText(`x="${lx.toFixed(1)}" y="${ly.toFixed(1)}"${rotateAttr} text-anchor="${anchor}" font-size="11" font-weight="bold"`, col, escRich(g.label));
		}
	}

	// Curves (clipped to plot box)
	const samples = 160;
	body += `<clipPath id="plotClip"><rect x="${padL - 2}" y="${padT - 2}" width="${pw + 4}" height="${ph + 4}"/></clipPath><g clip-path="url(#plotClip)">`;
	for (const c of opts.curves) {
		const pts: string[] = [];
		for (let i = 0; i <= samples; i++) {
			const xv = xMin + (i / samples) * xSpan;
			const yv = c.fn(xv);
			if (!Number.isFinite(yv)) continue;
			pts.push(`${sx(xv).toFixed(1)},${sy(yv).toFixed(1)}`);
		}
		if (pts.length > 1) {
			body += `<polyline fill="none" stroke="${c.color ?? '#2563eb'}" stroke-width="${c.strokeWidth ?? 2.3}" ${c.dashed ? 'stroke-dasharray="6,4"' : ''} points="${pts.join(' ')}"/>`;
		}
	}
	body += `</g>`;

	// Highlighted points with smart slope-aware non-overlapping placement
	const primaryFn = opts.curves[0]?.fn;
	for (const pt of opts.points ?? []) {
		const px = sx(pt.x);
		const py = sy(pt.y);
		const col = pt.color ?? '#dc2626';
		body += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="4" fill="${col}" stroke="#ffffff" stroke-width="1.2"/>`;

		let slope = 0;
		if (primaryFn) {
			const eps = xSpan * 0.025;
			const yPrev = primaryFn(Math.max(xMin, pt.x - eps));
			const yNext = primaryFn(Math.min(xMax, pt.x + eps));
			if (Number.isFinite(yPrev) && Number.isFinite(yNext)) slope = yNext - yPrev;
		}
		const nearRight = px > padL + pw * 0.74;
		const nearTop = py < padT + 22;
		const nearBottom = py > padT + ph - 20;
		const defaultDx = nearRight ? -8 : 8;
		const defaultDy = nearBottom ? -8 : nearTop ? 16 : slope > 0 ? 16 : -8;
		const dx = pt.dx ?? defaultDx;
		const dy = pt.dy ?? defaultDy;
		const anchor = nearRight && pt.dx === undefined ? 'end' : 'start';
		body += haloText(`x="${(px + dx).toFixed(1)}" y="${(py + dy).toFixed(1)}" text-anchor="${anchor}" font-size="11" font-weight="bold"`, col, escRich(pt.label));
	}

	// Legend if multiple named curves
	const labeled = opts.curves.filter((c) => c.label);
	if (labeled.length > 0) {
		labeled.forEach((c, idx) => {
			const lx = padL + pw - 8;
			const ly = padT + 14 + idx * 17;
			body += `<line x1="${lx - 58}" y1="${ly - 4}" x2="${lx - 38}" y2="${ly - 4}" stroke="${c.color ?? '#2563eb'}" stroke-width="2.2" ${c.dashed ? 'stroke-dasharray="5,3"' : ''}/>`;
			body += haloText(`x="${lx - 64}" y="${ly}" text-anchor="end" font-size="11" font-weight="bold"`, '#1e293b', escRich(c.label!));
		});
	}

	return wrapPhysicsSvg(w, h, body);
}

/** 2. IEC Electrical & RC / RL / RLC / Household Safety Circuit Diagrams */
export function svgCircuitDiagram(opts: {
	kind:
		| 'simple_lamp'
		| 'series'
		| 'parallel'
		| 'short_circuit'
		| 'rc'
		| 'rl'
		| 'rlc'
		| 'household_safety';
	labels?: {
		e?: string;
		r?: string;
		r2?: string;
		c?: string;
		l?: string;
		lamp1?: string;
		lamp2?: string;
		switchLabel?: string;
		ammeter?: boolean;
		voltmeter?: boolean;
	};
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 360;
	const h = opts.height ?? 210;
	const L = opts.labels ?? {};
	let body = '';

	const drawLamp = (cx: number, cy: number, r = 14, label = '') => {
		let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" stroke="#0f172a" stroke-width="1.8"/>`;
		const d = r * 0.707;
		s += `<line x1="${cx - d}" y1="${cy - d}" x2="${cx + d}" y2="${cy + d}" stroke="#0f172a" stroke-width="1.6"/>`;
		s += `<line x1="${cx - d}" y1="${cy + d}" x2="${cx + d}" y2="${cy - d}" stroke="#0f172a" stroke-width="1.6"/>`;
		if (label) s += `<text x="${cx}" y="${cy - r - 6}" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e3a8a">${esc(label)}</text>`;
		return s;
	};

	const drawResistor = (cx: number, cy: number, horizontal = true, label = 'R') => {
		if (horizontal) {
			let s = `<rect x="${cx - 24}" y="${cy - 9}" width="48" height="18" fill="#ffffff" stroke="#0f172a" stroke-width="1.8"/>`;
			s += `<text x="${cx}" y="${cy - 14}" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e3a8a">${esc(label)}</text>`;
			return s;
		}
		let s = `<rect x="${cx - 9}" y="${cy - 24}" width="18" height="48" fill="#ffffff" stroke="#0f172a" stroke-width="1.8"/>`;
		s += `<text x="${cx + 16}" y="${cy + 4}" text-anchor="start" font-size="12" font-weight="bold" fill="#1e3a8a">${esc(label)}</text>`;
		return s;
	};

	const drawCapacitor = (cx: number, cy: number, vertical = true, label = 'C') => {
		if (vertical) {
			let s = `<rect x="${cx - 12}" y="${cy - 6}" width="24" height="12" fill="#ffffff" stroke="none"/>`;
			s += `<line x1="${cx - 14}" y1="${cy - 5}" x2="${cx + 14}" y2="${cy - 5}" stroke="#0f172a" stroke-width="2.2"/>`;
			s += `<line x1="${cx - 14}" y1="${cy + 5}" x2="${cx + 14}" y2="${cy + 5}" stroke="#0f172a" stroke-width="2.2"/>`;
			s += `<text x="${cx - 18}" y="${cy + 4}" text-anchor="end" font-size="12" font-weight="bold" fill="#1e3a8a">${esc(label)}</text>`;
			return s;
		}
		let s = `<rect x="${cx - 6}" y="${cy - 14}" width="12" height="28" fill="#ffffff" stroke="none"/>`;
		s += `<line x1="${cx - 5}" y1="${cy - 14}" x2="${cx - 5}" y2="${cy + 14}" stroke="#0f172a" stroke-width="2.2"/>`;
		s += `<line x1="${cx + 5}" y1="${cy - 14}" x2="${cx + 5}" y2="${cy + 14}" stroke="#0f172a" stroke-width="2.2"/>`;
		s += `<text x="${cx}" y="${cy - 19}" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e3a8a">${esc(label)}</text>`;
		return s;
	};

	const drawCoil = (cx: number, cy: number, horizontal = true, label = '(L, r)') => {
		let s = '';
		if (horizontal) {
			s += `<rect x="${cx - 26}" y="${cy - 10}" width="52" height="20" fill="#ffffff" stroke="none"/>`;
			for (let k = -24; k < 24; k += 12) {
				s += `<path d="M ${cx + k} ${cy} A 6 9 0 0 1 ${cx + k + 12} ${cy}" fill="none" stroke="#0f172a" stroke-width="1.8"/>`;
			}
			s += `<text x="${cx}" y="${cy - 14}" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e3a8a">${esc(label)}</text>`;
		} else {
			s += `<rect x="${cx - 10}" y="${cy - 24}" width="20" height="48" fill="#ffffff" stroke="none"/>`;
			for (let k = -24; k < 24; k += 12) {
				s += `<path d="M ${cx} ${cy + k} A 9 6 0 0 1 ${cx} ${cy + k + 12}" fill="none" stroke="#0f172a" stroke-width="1.8"/>`;
			}
			s += `<text x="${cx + 16}" y="${cy + 4}" text-anchor="start" font-size="12" font-weight="bold" fill="#1e3a8a">${esc(label)}</text>`;
		}
		return s;
	};

	const drawCell = (cx: number, cy: number, label = 'E') => {
		let s = `<rect x="${cx - 16}" y="${cy - 8}" width="32" height="16" fill="#ffffff" stroke="none"/>`;
		s += `<line x1="${cx - 16}" y1="${cy - 4}" x2="${cx + 16}" y2="${cy - 4}" stroke="#0f172a" stroke-width="2"/>`;
		s += `<line x1="${cx - 8}" y1="${cy + 4}" x2="${cx + 8}" y2="${cy + 4}" stroke="#0f172a" stroke-width="3.2"/>`;
		s += `<text x="${cx - 22}" y="${cy - 6}" text-anchor="end" font-size="12" font-weight="bold" fill="#dc2626">+</text>`;
		s += `<text x="${cx - 22}" y="${cy + 12}" text-anchor="end" font-size="12" font-weight="bold" fill="#2563eb">-</text>`;
		s += `<text x="${cx + 22}" y="${cy + 4}" text-anchor="start" font-size="12" font-weight="bold" fill="#1e3a8a">${esc(label)}</text>`;
		return s;
	};

	const drawMeter = (cx: number, cy: number, sym: 'A' | 'V') => {
		return `<circle cx="${cx}" cy="${cy}" r="13" fill="#ffffff" stroke="#0f172a" stroke-width="1.7"/><text x="${cx}" y="${cy + 4.5}" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${sym}</text>`;
	};

	const drawTwoWaySwitch = (x: number, y: number, label = 'K') => {
		let s = `<rect x="${x - 22}" y="${y - 16}" width="44" height="32" fill="#ffffff" stroke="none"/>`;
		s += `<circle cx="${x - 18}" cy="${y}" r="2.8" fill="#0f172a"/>`;
		s += `<circle cx="${x + 14}" cy="${y - 12}" r="2.8" fill="#0f172a"/>`;
		s += `<circle cx="${x + 14}" cy="${y + 12}" r="2.8" fill="#0f172a"/>`;
		s += `<line x1="${x - 18}" y1="${y}" x2="${x + 12}" y2="${y - 11}" stroke="#dc2626" stroke-width="2"/>`;
		s += `<text x="${x + 18}" y="${y - 12}" font-size="11" font-weight="bold" fill="#0f172a">1</text>`;
		s += `<text x="${x + 18}" y="${y + 16}" font-size="11" font-weight="bold" fill="#0f172a">2</text>`;
		s += `<text x="${x - 4}" y="${y - 18}" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e3a8a">${esc(label)}</text>`;
		return s;
	};

	if (opts.kind === 'simple_lamp' || opts.kind === 'series' || opts.kind === 'short_circuit') {
		body += `<rect x="65" y="45" width="230" height="120" fill="none" stroke="#0f172a" stroke-width="1.8"/>`;
		body += drawCell(65, 105, L.e ?? 'G');
		// Open/closed switch on top left
		body += `<rect x="112" y="38" width="36" height="14" fill="#ffffff"/>`;
		body += `<circle cx="115" cy="45" r="2.5" fill="#0f172a"/><circle cx="145" cy="45" r="2.5" fill="#0f172a"/>`;
		body += `<line x1="115" y1="45" x2="142" y2="33" stroke="#0f172a" stroke-width="1.8"/>`;
		body += `<text x="130" y="28" text-anchor="middle" font-size="12" font-weight="bold">${esc(L.switchLabel ?? 'K')}</text>`;
		if (opts.kind === 'simple_lamp') {
			body += drawLamp(225, 45, 14, L.lamp1 ?? 'L');
		} else {
			body += drawLamp(195, 45, 13, L.lamp1 ?? 'L1');
			body += drawLamp(258, 45, 13, L.lamp2 ?? 'L2');
			if (opts.kind === 'short_circuit') {
				body += `<polyline fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="4,3" points="175,45 175,78 215,78 215,45"/>`;
				body += `<text x="195" y="92" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">سلك ناقل (استقصار)</text>`;
			}
		}
		if (L.ammeter) body += drawMeter(180, 165, 'A');
	} else if (opts.kind === 'parallel') {
		body += `<rect x="65" y="42" width="230" height="126" fill="none" stroke="#0f172a" stroke-width="1.8"/>`;
		body += `<line x1="150" y1="105" x2="295" y2="105" stroke="#0f172a" stroke-width="1.8"/>`;
		body += `<circle cx="150" cy="105" r="3" fill="#0f172a"/><circle cx="295" cy="105" r="3" fill="#0f172a"/>`;
		body += `<line x1="150" y1="42" x2="150" y2="168" stroke="#0f172a" stroke-width="1.8"/>`;
		body += drawCell(65, 105, L.e ?? 'G');
		body += drawLamp(225, 42, 13, L.lamp1 ?? 'L1');
		body += drawLamp(225, 105, 13, L.lamp2 ?? 'L2');
		if (L.ammeter) body += drawMeter(110, 42, 'A');
	} else if (opts.kind === 'rc') {
		// Left loop: generator E, top wire to switch pos 1, middle wire with R & C, pos 2 shorting wire
		body += `<rect x="60" y="45" width="240" height="125" fill="none" stroke="#0f172a" stroke-width="1.8"/>`;
		body += `<line x1="165" y1="69" x2="165" y2="170" stroke="#0f172a" stroke-width="1.8"/>`;
		body += drawCell(60, 108, L.e ?? 'E');
		// Two-way switch centered at (165, 57): common on right -> R & C, pos 1 on left -> E, pos 2 on bottom -> return wire
		body += `<rect x="132" y="34" width="44" height="38" fill="#ffffff" stroke="none"/>`;
		body += `<circle cx="136" cy="45" r="2.8" fill="#0f172a"/>`;
		body += `<circle cx="165" cy="69" r="2.8" fill="#0f172a"/>`;
		body += `<circle cx="176" cy="45" r="2.8" fill="#0f172a"/>`;
		body += `<line x1="176" y1="45" x2="138" y2="45" stroke="#dc2626" stroke-width="2"/>`;
		body += `<text x="132" y="35" font-size="11" font-weight="bold">1</text>`;
		body += `<text x="172" y="74" font-size="11" font-weight="bold">2</text>`;
		body += `<text x="156" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e3a8a">${esc(L.switchLabel ?? 'K')}</text>`;
		body += drawResistor(240, 45, true, L.r ?? 'R');
		body += drawCapacitor(300, 108, true, L.c ?? 'C');
		if (L.voltmeter) {
			body += `<polyline fill="none" stroke="#2563eb" stroke-width="1.3" points="300,72 338,72 338,144 300,144"/>`;
			body += drawMeter(338, 108, 'V');
		}
	} else if (opts.kind === 'rl') {
		body += `<rect x="65" y="45" width="230" height="120" fill="none" stroke="#0f172a" stroke-width="1.8"/>`;
		body += drawCell(65, 105, L.e ?? 'E');
		body += `<rect x="115" y="38" width="32" height="14" fill="#ffffff"/>`;
		body += `<circle cx="118" cy="45" r="2.5" fill="#0f172a"/><circle cx="144" cy="45" r="2.5" fill="#0f172a"/>`;
		body += `<line x1="118" y1="45" x2="144" y2="35" stroke="#dc2626" stroke-width="1.9"/>`;
		body += `<text x="131" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e3a8a">${esc(L.switchLabel ?? 'K')}</text>`;
		body += drawResistor(218, 45, true, L.r ?? 'R');
		body += drawCoil(295, 105, false, L.l ?? '(L, r)');
	} else if (opts.kind === 'rlc') {
		body += `<rect x="55" y="45" width="250" height="125" fill="none" stroke="#0f172a" stroke-width="1.8"/>`;
		body += `<line x1="150" y1="69" x2="150" y2="170" stroke="#0f172a" stroke-width="1.8"/>`;
		body += drawCell(55, 108, L.e ?? 'E');
		body += drawTwoWaySwitch(135, 57, L.switchLabel ?? 'K');
		body += drawCapacitor(150, 118, true, L.c ?? 'C');
		body += drawResistor(228, 45, true, L.r ?? 'R');
		body += drawCoil(305, 108, false, L.l ?? '(L, r)');
	} else if (opts.kind === 'household_safety') {
		// Phase (red), Neutral (blue), Earth (green dashed)
		body += `<text x="32" y="54" font-size="12" font-weight="bold" fill="#dc2626">Ph</text>`;
		body += `<text x="32" y="109" font-size="12" font-weight="bold" fill="#2563eb">N</text>`;
		body += `<text x="32" y="164" font-size="12" font-weight="bold" fill="#059669">T</text>`;
		// Main wires
		body += `<line x1="55" y1="50" x2="320" y2="50" stroke="#dc2626" stroke-width="2"/>`;
		body += `<line x1="55" y1="105" x2="320" y2="105" stroke="#2563eb" stroke-width="2"/>`;
		body += `<line x1="55" y1="160" x2="290" y2="160" stroke="#059669" stroke-width="1.8" stroke-dasharray="5,3"/>`;
		// Main Breaker box
		body += `<rect x="75" y="38" width="44" height="80" rx="4" fill="#f8fafc" stroke="#0f172a" stroke-width="1.6"/>`;
		body += `<text x="97" y="82" text-anchor="middle" font-size="10" font-weight="bold">قاطع تفاضلي</text>`;
		// Fuse on Phase + Switch + Lamp
		body += `<rect x="148" y="44" width="24" height="12" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>`;
		body += `<line x1="148" y1="50" x2="172" y2="50" stroke="#dc2626" stroke-width="1.2"/>`;
		body += `<text x="160" y="37" text-anchor="middle" font-size="10" fill="#dc2626">منصهرة</text>`;
		body += `<line x1="205" y1="50" x2="205" y2="105" stroke="#0f172a" stroke-width="1.6"/>`;
		body += drawLamp(205, 78, 12, 'L');
		// Socket + Earth on appliance
		body += `<rect x="260" y="64" width="48" height="46" rx="4" fill="#f1f5f9" stroke="#334155" stroke-width="1.6"/>`;
		body += `<text x="284" y="90" text-anchor="middle" font-size="11" font-weight="bold">غسالة</text>`;
		body += `<line x1="274" y1="50" x2="274" y2="64" stroke="#dc2626" stroke-width="1.6"/>`;
		body += `<line x1="294" y1="105" x2="294" y2="110" stroke="#2563eb" stroke-width="1.6"/>`;
		body += `<line x1="284" y1="110" x2="284" y2="160" stroke="#059669" stroke-width="1.6"/>`;
	}

	return wrapPhysicsSvg(w, h, body);
}

/** 3. AC Oscilloscope Screen Diagram (4AM / 3AS) */
export function svgOscilloscopeTrace(opts: {
	amplitudeDivs: number;
	periodDivs: number;
	svLabel: string;
	shLabel: string;
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 360;
	const h = opts.height ?? 220;
	const gx = 40;
	const gy = 20;
	const cols = 10;
	const rows = 8;
	const cell = 22;
	const gw = cols * cell;
	const gh = rows * cell;
	const cx = gx + gw / 2;
	const cy = gy + gh / 2;

	let body = `<rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" rx="6" fill="#0f172a" stroke="#334155" stroke-width="2.2"/>`;
	for (let c = 1; c < cols; c++) {
		const x = gx + c * cell;
		body += `<line x1="${x}" y1="${gy}" x2="${x}" y2="${gy + gh}" stroke="${c === cols / 2 ? '#64748b' : '#334155'}" stroke-width="${c === cols / 2 ? 1.4 : 0.8}"/>`;
	}
	for (let r = 1; r < rows; r++) {
		const y = gy + r * cell;
		body += `<line x1="${gx}" y1="${y}" x2="${gx + gw}" y2="${y}" stroke="${r === rows / 2 ? '#64748b' : '#334155'}" stroke-width="${r === rows / 2 ? 1.4 : 0.8}"/>`;
	}

	const pts: string[] = [];
	const ampPx = opts.amplitudeDivs * cell;
	const periodPx = opts.periodDivs * cell;
	for (let dx = 0; dx <= gw; dx += 2) {
		const y = cy - ampPx * Math.sin((2 * Math.PI * dx) / periodPx);
		pts.push(`${gx + dx},${y.toFixed(1)}`);
	}
	body += `<polyline fill="none" stroke="#22c55e" stroke-width="2.4" points="${pts.join(' ')}"/>`;
	body += `<text x="${gx + gw / 2}" y="${gy + gh + 18}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">${esc(opts.svLabel)}  |  ${esc(opts.shLabel)}</text>`;
	void cx;
	return wrapPhysicsSvg(w, h, body);
}

/** 4. Mechanics Free-Body Diagram on Horizontal or Inclined Plane */
export function svgInclinedPlaneForces(opts: {
	angleDeg?: number;
	showFriction?: boolean;
	showTraction?: boolean;
	angleLabel?: string;
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 360;
	const h = opts.height ?? 210;
	const ang = opts.angleDeg ?? 25;
	const rad = (ang * Math.PI) / 180;
	const x0 = 55;
	const y0 = 175;
	const len = 250;
	const xTop = x0 + len * Math.cos(rad);
	const yTop = y0 - len * Math.sin(rad);

	let body = `<defs><marker id="vecArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626"/></marker></defs>`;
	// Ground & inclined ramp
	body += `<line x1="35" y1="${y0}" x2="325" y2="${y0}" stroke="#334155" stroke-width="2"/>`;
	body += `<polygon points="${x0},${y0} ${xTop.toFixed(1)},${y0} ${xTop.toFixed(1)},${yTop.toFixed(1)}" fill="#f1f5f9" stroke="#0f172a" stroke-width="1.8"/>`;
	body += `<text x="${x0 + 44}" y="${y0 - 8}" font-size="12" font-weight="bold" fill="#0f172a">${esc(opts.angleLabel ?? 'α')}</text>`;

	// Block at midpoint of slope
	const mx = (x0 + xTop) / 2;
	const my = (y0 + yTop) / 2;
	const bw = 38;
	const bh = 24;
	const nx = -Math.sin(rad);
	const ny = -Math.cos(rad);
	const gx = mx + nx * (bh / 2);
	const gy = my + ny * (bh / 2);

	body += `<g transform="translate(${mx.toFixed(1)},${my.toFixed(1)}) rotate(${-ang})"><rect x="${-bw / 2}" y="${-bh}" width="${bw}" height="${bh}" rx="3" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.8"/><text x="0" y="${-bh / 2 + 4}" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">S</text></g>`;

	// Weight P (vertical down)
	body += `<line x1="${gx.toFixed(1)}" y1="${gy.toFixed(1)}" x2="${gx.toFixed(1)}" y2="${(gy + 58).toFixed(1)}" stroke="#dc2626" stroke-width="2" marker-end="url(#vecArr)"/>`;
	body += `<text x="${(gx + 10).toFixed(1)}" y="${(gy + 54).toFixed(1)}" font-size="12" font-weight="bold" fill="#dc2626">P</text>`;

	// Normal Reaction R_N
	body += `<line x1="${gx.toFixed(1)}" y1="${gy.toFixed(1)}" x2="${(gx + nx * 48).toFixed(1)}" y2="${(gy + ny * 48).toFixed(1)}" stroke="#059669" stroke-width="2" marker-end="url(#vecArr)"/>`;
	body += `<text x="${(gx + nx * 56).toFixed(1)}" y="${(gy + ny * 56).toFixed(1)}" font-size="12" font-weight="bold" fill="#059669">R_N</text>`;

	if (opts.showFriction) {
		const tx = Math.cos(rad);
		const ty = -Math.sin(rad);
		body += `<line x1="${mx.toFixed(1)}" y1="${my.toFixed(1)}" x2="${(mx + tx * 45).toFixed(1)}" y2="${(my + ty * 45).toFixed(1)}" stroke="#d97706" stroke-width="2" marker-end="url(#vecArr)"/>`;
		body += `<text x="${(mx + tx * 52).toFixed(1)}" y="${(my + ty * 52 - 4).toFixed(1)}" font-size="12" font-weight="bold" fill="#d97706">f</text>`;
	}
	if (opts.showTraction) {
		const tx = Math.cos(rad);
		const ty = -Math.sin(rad);
		body += `<line x1="${gx.toFixed(1)}" y1="${gy.toFixed(1)}" x2="${(gx + tx * 54).toFixed(1)}" y2="${(gy + ty * 54).toFixed(1)}" stroke="#2563eb" stroke-width="2" marker-end="url(#vecArr)"/>`;
		body += `<text x="${(gx + tx * 60).toFixed(1)}" y="${(gy + ty * 60 - 4).toFixed(1)}" font-size="12" font-weight="bold" fill="#2563eb">F</text>`;
	}

	return wrapPhysicsSvg(w, h, body);
}

/** 5. Parabolic Projectile Trajectory Diagram (1AS / 3AS Mechanics) */
export function svgProjectileTrajectory(opts: {
	angleLabel?: string;
	v0Label?: string;
	showApex?: boolean;
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 360;
	const h = opts.height ?? 210;
	const ox = 48;
	const oy = 175;
	let body = `<defs><marker id="pArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#1e293b"/></marker></defs>`;
	body += `<line x1="${ox - 15}" y1="${oy}" x2="${w - 22}" y2="${oy}" stroke="#1e293b" stroke-width="1.6" marker-end="url(#pArr)"/>`;
	body += `<line x1="${ox}" y1="${oy + 12}" x2="${ox}" y2="22" stroke="#1e293b" stroke-width="1.6" marker-end="url(#pArr)"/>`;
	body += `<text x="${w - 22}" y="${oy + 16}" font-size="12" font-weight="bold">x</text>`;
	body += `<text x="${ox - 16}" y="28" font-size="12" font-weight="bold">y</text>`;
	body += `<text x="${ox - 12}" y="${oy + 15}" font-size="12" font-weight="bold">O</text>`;

	// Parabola from (ox, oy) apex (185, 55) impact (322, oy)
	const pts: string[] = [];
	for (let t = 0; t <= 1; t += 0.025) {
		const x = ox + t * (322 - ox);
		const y = oy - 4 * 120 * t * (1 - t);
		pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
	}
	body += `<polyline fill="none" stroke="#2563eb" stroke-width="2.2" points="${pts.join(' ')}"/>`;
	// Initial velocity vector v0
	body += `<line x1="${ox}" y1="${oy}" x2="${ox + 58}" y2="${oy - 68}" stroke="#dc2626" stroke-width="2.1" marker-end="url(#pArr)"/>`;
	body += `<text x="${ox + 62}" y="${oy - 72}" font-size="12" font-weight="bold" fill="#dc2626">${esc(opts.v0Label ?? 'v₀')}</text>`;
	body += `<text x="${ox + 26}" y="${oy - 8}" font-size="11.5" font-weight="bold" fill="#0f172a">${esc(opts.angleLabel ?? 'α')}</text>`;

	if (opts.showApex !== false) {
		body += `<circle cx="185" cy="55" r="3.5" fill="#dc2626"/>`;
		body += `<line x1="185" y1="55" x2="185" y2="${oy}" stroke="#94a3b8" stroke-dasharray="4,3" stroke-width="1.2"/>`;
		body += `<text x="185" y="45" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#dc2626">S (الذروة)</text>`;
		body += `<circle cx="322" cy="${oy}" r="3.5" fill="#059669"/>`;
		body += `<text x="322" y="${oy + 16}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#059669">P (المدى)</text>`;
	}
	return wrapPhysicsSvg(w, h, body);
}

/** 6. Titration Burette & Beaker Setup (2AS / 3AS Chemistry) */
export function svgTitrationSetup(opts: {
	titrantLabel: string;
	analyteLabel: string;
	sensorLabel?: string;
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 320;
	const h = opts.height ?? 230;
	let body = '';
	// Stand
	body += `<rect x="42" y="198" width="150" height="8" rx="2" fill="#475569"/>`;
	body += `<rect x="64" y="22" width="6" height="176" fill="#64748b"/>`;
	body += `<rect x="64" y="64" width="62" height="5" fill="#64748b"/>`;
	// Burette
	body += `<rect x="122" y="24" width="16" height="92" fill="#eff6ff" stroke="#1e293b" stroke-width="1.6"/>`;
	for (let y = 34; y < 108; y += 10) {
		body += `<line x1="122" y1="${y}" x2="128" y2="${y}" stroke="#334155" stroke-width="1"/>`;
	}
	body += `<polygon points="127,116 133,116 130,130" fill="#2563eb"/>`;
	body += `<text x="148" y="62" font-size="11.5" font-weight="bold" fill="#1d4ed8">${escRich(opts.titrantLabel)}</text>`;
	// Beaker on magnetic stirrer
	body += `<rect x="96" y="176" width="68" height="22" rx="3" fill="#e2e8f0" stroke="#334155" stroke-width="1.5"/>`;
	body += `<rect x="104" y="138" width="52" height="38" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/>`;
	body += `<rect x="105" y="154" width="50" height="21" fill="#dbeafe"/>`;
	body += `<rect x="122" y="170" width="16" height="4" rx="2" fill="#0f172a"/>`;
	body += `<text x="172" y="166" font-size="11.5" font-weight="bold" fill="#0f172a">${escRich(opts.analyteLabel)}</text>`;
	if (opts.sensorLabel) {
		body += `<rect x="112" y="128" width="5" height="36" fill="#059669"/>`;
		body += `<text x="172" y="136" font-size="11" font-weight="bold" fill="#059669">${escRich(opts.sensorLabel)}</text>`;
	}
	return wrapPhysicsSvg(w, h, body);
}

/** 7. Nuclear Energy Level / Mass Defect Diagram (3AS Nuclear) */
export function svgNuclearEnergyDiagram(opts: {
	topLabel: string;
	reactantsLabel: string;
	productsLabel: string;
	deltaELabel?: string;
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 360;
	const h = opts.height ?? 210;
	let body = `<defs><marker id="eArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#0f172a"/></marker></defs>`;
	body += `<line x1="45" y1="185" x2="45" y2="20" stroke="#0f172a" stroke-width="1.8" marker-end="url(#eArr)"/>`;
	body += `<text x="38" y="28" text-anchor="end" font-size="12" font-weight="bold">E (MeV)</text>`;

	// Top separated nucleons
	body += `<line x1="75" y1="45" x2="295" y2="45" stroke="#dc2626" stroke-width="2.2"/>`;
	body += `<text x="185" y="37" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#dc2626">${esc(opts.topLabel)}</text>`;
	// Reactants level
	body += `<line x1="75" y1="108" x2="175" y2="108" stroke="#1d4ed8" stroke-width="2.2"/>`;
	body += `<text x="125" y="100" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1d4ed8">${esc(opts.reactantsLabel)}</text>`;
	// Products level
	body += `<line x1="195" y1="158" x2="295" y2="158" stroke="#059669" stroke-width="2.2"/>`;
	body += `<text x="245" y="150" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#059669">${esc(opts.productsLabel)}</text>`;

	// Arrows
	body += `<line x1="125" y1="108" x2="125" y2="49" stroke="#475569" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#eArr)"/>`;
	body += `<line x1="245" y1="45" x2="245" y2="154" stroke="#475569" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#eArr)"/>`;
	body += `<line x1="185" y1="108" x2="185" y2="154" stroke="#d97706" stroke-width="2" marker-end="url(#eArr)"/>`;
	body += `<text x="180" y="135" text-anchor="end" font-size="11" font-weight="bold" fill="#d97706">${esc(opts.deltaELabel ?? '|ΔE_lib|')}</text>`;
	return wrapPhysicsSvg(w, h, body);
}

/** 8. Buoyancy / Submerged Body in Beaker (1AM / 4AM Archimedes Thrust) */
export function svgArchimedesBeaker(opts: {
	liquidLabel?: string;
	showVectors?: boolean;
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 300;
	const h = opts.height ?? 210;
	let body = `<defs><marker id="bArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626"/></marker></defs>`;
	body += `<polyline fill="none" stroke="#0f172a" stroke-width="2" points="85,35 85,185 215,185 215,35"/>`;
	body += `<rect x="86" y="75" width="128" height="109" fill="#dbeafe"/>`;
	body += `<line x1="85" y1="75" x2="215" y2="75" stroke="#2563eb" stroke-width="1.6"/>`;
	body += `<text x="224" y="135" font-size="11.5" font-weight="bold" fill="#1d4ed8">${esc(opts.liquidLabel ?? 'سائل')}</text>`;
	// Submerged solid
	body += `<rect x="128" y="102" width="44" height="44" rx="4" fill="#fde68a" stroke="#b45309" stroke-width="1.8"/>`;
	body += `<text x="150" y="128" text-anchor="middle" font-size="12" font-weight="bold" fill="#78350f">S</text>`;
	if (opts.showVectors !== false) {
		body += `<line x1="150" y1="124" x2="150" y2="174" stroke="#dc2626" stroke-width="2" marker-end="url(#bArr)"/>`;
		body += `<text x="158" y="172" font-size="12" font-weight="bold" fill="#dc2626">P</text>`;
		body += `<line x1="150" y1="124" x2="150" y2="62" stroke="#059669" stroke-width="2" marker-end="url(#bArr)"/>`;
		body += `<text x="158" y="66" font-size="12" font-weight="bold" fill="#059669">F_A</text>`;
	}
	return wrapPhysicsSvg(w, h, body);
}

/** 9. Electrolysis / Voltameter Cell (3AM / 4AM) */
export function svgElectrolysisCell(opts: {
	solutionLabel: string;
	anodeGas?: string;
	cathodeLabel?: string;
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 320;
	const h = opts.height ?? 210;
	let body = '';
	body += `<polyline fill="none" stroke="#0f172a" stroke-width="2" points="85,60 85,175 235,175 235,60"/>`;
	body += `<rect x="86" y="92" width="148" height="82" fill="#e0f2fe"/>`;
	// Electrodes
	body += `<rect x="115" y="75" width="10" height="82" fill="#334155"/>`;
	body += `<rect x="195" y="75" width="10" height="82" fill="#334155"/>`;
	// Generator connection on top
	body += `<polyline fill="none" stroke="#0f172a" stroke-width="1.6" points="120,75 120,30 150,30"/>`;
	body += `<polyline fill="none" stroke="#0f172a" stroke-width="1.6" points="200,75 200,30 170,30"/>`;
	body += `<line x1="155" y1="18" x2="155" y2="42" stroke="#dc2626" stroke-width="2.4"/>`;
	body += `<line x1="165" y1="24" x2="165" y2="36" stroke="#2563eb" stroke-width="3.2"/>`;
	body += `<text x="142" y="24" font-size="11" font-weight="bold" fill="#dc2626">+</text>`;
	body += `<text x="174" y="24" font-size="11" font-weight="bold" fill="#2563eb">-</text>`;
	body += `<text x="160" y="160" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0369a1">${esc(opts.solutionLabel)}</text>`;
	if (opts.anodeGas) body += `<text x="108" y="88" text-anchor="end" font-size="10.5" font-weight="bold" fill="#0f172a">${esc(opts.anodeGas)}</text>`;
	if (opts.cathodeLabel) body += `<text x="212" y="88" text-anchor="start" font-size="10.5" font-weight="bold" fill="#0f172a">${esc(opts.cathodeLabel)}</text>`;
	return wrapPhysicsSvg(w, h, body);
}

/** 10. Thin Converging Lens Ray Diagram (2AS / Optics) */
export function svgConvergingLens(opts: {
	fLabel?: string;
	objLabel?: string;
	imgLabel?: string;
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 360;
	const h = opts.height ?? 190;
	const cx = 180;
	const cy = 100;
	let body = `<defs><marker id="optArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#dc2626"/></marker></defs>`;
	body += `<line x1="20" y1="${cy}" x2="${w - 20}" y2="${cy}" stroke="#334155" stroke-width="1.4" stroke-dasharray="6,3"/>`;
	// Thin converging lens double arrow
	body += `<line x1="${cx}" y1="24" x2="${cx}" y2="${h - 24}" stroke="#1d4ed8" stroke-width="2.2"/>`;
	body += `<polyline fill="none" stroke="#1d4ed8" stroke-width="2" points="${cx - 6},32 ${cx},22 ${cx + 6},32"/>`;
	body += `<polyline fill="none" stroke="#1d4ed8" stroke-width="2" points="${cx - 6},${h - 32} ${cx},${h - 22} ${cx + 6},${h - 32}"/>`;
	// F and F'
	body += `<circle cx="${cx - 55}" cy="${cy}" r="2.5" fill="#0f172a"/><text x="${cx - 55}" y="${cy + 16}" text-anchor="middle" font-size="11.5" font-weight="bold">F</text>`;
	body += `<circle cx="${cx + 55}" cy="${cy}" r="2.5" fill="#0f172a"/><text x="${cx + 55}" y="${cy + 16}" text-anchor="middle" font-size="11.5" font-weight="bold">F'</text>`;
	body += `<text x="${cx + 6}" y="${cy + 15}" font-size="11" font-weight="bold">O</text>`;
	// Object AB at x = cx - 95, height = 42
	const ox = cx - 95;
	const oy = cy - 42;
	body += `<line x1="${ox}" y1="${cy}" x2="${ox}" y2="${oy}" stroke="#059669" stroke-width="2.2" marker-end="url(#optArr)"/>`;
	body += `<text x="${ox}" y="${oy - 6}" text-anchor="middle" font-size="11" font-weight="bold" fill="#059669">${esc(opts.objLabel ?? 'B')}</text>`;
	// Real inverted image A'B'
	const ix = cx + 130;
	const iy = cy + 57;
	body += `<line x1="${ix}" y1="${cy}" x2="${ix}" y2="${iy}" stroke="#7c3aed" stroke-width="2.2" marker-end="url(#optArr)"/>`;
	body += `<text x="${ix}" y="${iy + 14}" text-anchor="middle" font-size="11" font-weight="bold" fill="#7c3aed">${esc(opts.imgLabel ?? "B'")}</text>`;
	// Rays
	body += `<polyline fill="none" stroke="#dc2626" stroke-width="1.3" points="${ox},${oy} ${cx},${oy} ${ix},${iy}"/>`;
	body += `<line x1="${ox}" y1="${oy}" x2="${ix}" y2="${iy}" stroke="#dc2626" stroke-width="1.3"/>`;
	void opts.fLabel;
	return wrapPhysicsSvg(w, h, body);
}
