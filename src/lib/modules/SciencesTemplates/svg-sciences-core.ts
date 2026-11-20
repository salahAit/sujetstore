import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const SCIENCES_SVG_DIR = process.env.MEDIA_ROOT
	? resolve(process.env.MEDIA_ROOT, 'generated/sciences-svg')
	: existsSync('/var/lib/sujetstore-media')
		? resolve('/var/lib/sujetstore-media/generated/sciences-svg')
		: resolve('static/generated/sciences-svg');

export function saveSciencesSvgAsset(filename: string, svgContent: string): string {
	const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/\.svg$/i, '') + '.svg';
	if (!existsSync(SCIENCES_SVG_DIR)) {
		mkdirSync(SCIENCES_SVG_DIR, { recursive: true });
	}
	const outPath = join(SCIENCES_SVG_DIR, safeName);
	writeFileSync(outPath, svgContent.trim() + '\n', 'utf-8');
	return `/generated/sciences-svg/${safeName}`;
}

export function esc(str: string): string {
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
 * Escapes XML and converts Unicode or `_`-delimited sub/superscripts into SVG tspans
 * so Typst's usvg renderer stays 100% in Arabic Transparent / Arial with zero FreeMono fallback.
 */
export function escRich(str: string): string {
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

/**
 * Two-pass white halo text helper: draws white rounded stroke underneath and crisp solid fill on top.
 * Guarantees razor-sharp typography in Typst usvg (which ignores CSS paint-order).
 */
export function haloText(attrs: string, color: string, text: string, alreadyRich = false): string {
	const inner = alreadyRich ? text : escRich(text);
	return (
		`<text ${attrs} fill="#ffffff" stroke="#ffffff" stroke-width="3.4" stroke-linejoin="round" stroke-linecap="round">${inner}</text>` +
		`<text ${attrs} fill="${color}">${inner}</text>`
	);
}

function sanitizeRawSvgTextNodes(body: string): string {
	return body.replace(/(<text\b[^>]*>)([\s\S]*?)(<\/text>)/g, (_m, open, inner, close) => {
		// Replace checkmark/cross glyphs missing from Arabic Transparent/Arial with native glyphs
		let cleaned = inner.replaceAll('✓', '(+)').replaceAll('✕', '×');
		// Convert any remaining raw Unicode sub/superscripts (outside existing tspans) into crisp tspans
		if (/[₀-₉₊₋⁰-⁹⁺⁻]/.test(cleaned)) {
			cleaned = cleaned.replace(
				/([₀-₉₊₋]+(?:\/[₀-₉]+)?|[⁰-⁹⁺⁻]+)/g,
				(tok: string, _g: string, offset: number, full: string) => {
					const isSup = /^[⁰-⁹⁺⁻]/.test(tok);
					const map = isSup ? SUP_MAP : SUB_MAP;
					const plain = tok
						.split('')
						.map((c) => map[c] ?? c)
						.join('');
					const dy = isSup ? '-4' : '3';
					const resetDy = isSup ? '4' : '-3';
					const isEnd = offset + tok.length >= full.length;
					return `<tspan dy="${dy}" font-size="72%">${plain}</tspan>${isEnd ? '' : `<tspan dy="${resetDy}">&#8203;</tspan>`}`;
				}
			);
		}
		return `${open}${cleaned}${close}`;
	});
}

export function wrapSciencesSvg(width: number, height: number, body: string): string {
	const safeBody = sanitizeRawSvgTextNodes(body);
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" font-family="Arabic Transparent" style="background:#ffffff;font-family:'Arabic Transparent',Arial,sans-serif">${safeBody}</svg>`;
}

/** Numbered badge callout helper for biology diagrams */
export function calloutBadge(x: number, y: number, num: string | number, color = '#1d4ed8'): string {
	return (
		`<circle cx="${x}" cy="${y}" r="9.5" fill="${color}" stroke="#ffffff" stroke-width="1.5"/>` +
		`<text x="${x}" y="${y + 3.8}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#ffffff">${esc(String(num))}</text>`
	);
}

/** 1. Precision Biological & Experimental Curve Plotter (Enzymes, Glycemia, Neuro, Immunology, Bioenergetics, DNA) */
export function svgBioCurvePlot(opts: {
	xMin?: number;
	xMax: number;
	yMin?: number;
	yMax: number;
	xLabel: string;
	yLabel: string;
	xStep?: number;
	yStep?: number;
	title?: string;
	shadedZones?: Array<{ x1: number; x2: number; fill: string; label?: string; textColor?: string }>;
	eventArrows?: Array<{ x: number; label: string; color?: string }>;
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
		labelPos?: 'top' | 'bottom' | 'left' | 'right';
	}>;
	points?: Array<{ x: number; y: number; label: string; color?: string; dx?: number; dy?: number }>;
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 440;
	const h = opts.height ?? 290;
	const padL = 60;
	const padR = 32;
	const hasEvents = (opts.eventArrows?.length ?? 0) > 0;
	const padT = opts.title ? (hasEvents ? 72 : 58) : hasEvents ? 48 : 34;
	const padB = 46;
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

	let body = `<defs><marker id="bioAxArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#1e293b"/></marker><marker id="bioEvtArr" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto"><path d="M0,0 L6,0 L3,6 Z" fill="#dc2626"/></marker></defs>`;

	if (opts.title) {
		body += `<text x="${w / 2}" y="20" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#0f172a">${escRich(opts.title)}</text>`;
	}

	// Shaded experimental phases (e.g. Light/Dark, Injection, Exercise)
	for (const z of opts.shadedZones ?? []) {
		const zx1 = Math.max(padL, sx(z.x1));
		const zx2 = Math.min(padL + pw, sx(z.x2));
		if (zx2 > zx1) {
			body += `<rect x="${zx1.toFixed(1)}" y="${padT}" width="${(zx2 - zx1).toFixed(1)}" height="${ph}" fill="${z.fill}"/>`;
			if (z.label) {
				body += haloText(
					`x="${((zx1 + zx2) / 2).toFixed(1)}" y="${padT + 14}" text-anchor="middle" font-size="10.5" font-weight="bold"`,
					z.textColor ?? '#334155',
					z.label
				);
			}
		}
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

	// Experimental event arrows above plot area
	for (const ev of opts.eventArrows ?? []) {
		const ex = sx(ev.x);
		const col = ev.color ?? '#dc2626';
		body += `<line x1="${ex.toFixed(1)}" y1="${padT - 18}" x2="${ex.toFixed(1)}" y2="${padT - 3}" stroke="${col}" stroke-width="1.6"/>`;
		body += `<polygon points="${(ex - 4).toFixed(1)},${padT - 7} ${(ex + 4).toFixed(1)},${padT - 7} ${ex.toFixed(1)},${padT}" fill="${col}"/>`;
		body += `<line x1="${ex.toFixed(1)}" y1="${padT}" x2="${ex.toFixed(1)}" y2="${padT + ph}" stroke="${col}" stroke-width="1" stroke-dasharray="3,3" opacity="0.6"/>`;
		body += haloText(
			`x="${ex.toFixed(1)}" y="${padT - 22}" text-anchor="middle" font-size="10.5" font-weight="bold"`,
			col,
			ev.label
		);
	}

	// Axes
	const yAxisX = xMin <= 0 && xMax >= 0 ? sx(0) : padL;
	const xAxisY = yMin <= 0 && yMax >= 0 ? sy(0) : padT + ph;
	body += `<line x1="${padL}" y1="${xAxisY.toFixed(1)}" x2="${padL + pw + 12}" y2="${xAxisY.toFixed(1)}" stroke="#1e293b" stroke-width="1.6" marker-end="url(#bioAxArr)"/>`;
	body += `<line x1="${yAxisX.toFixed(1)}" y1="${padT + ph}" x2="${yAxisX.toFixed(1)}" y2="${padT - 12}" stroke="#1e293b" stroke-width="1.6" marker-end="url(#bioAxArr)"/>`;
	body += haloText(
		`x="${padL + pw + 10}" y="${xAxisY - 8}" text-anchor="end" font-size="11.5" font-weight="bold"`,
		'#0f172a',
		opts.xLabel
	);
	body += haloText(
		`x="${(yAxisX + 8).toFixed(1)}" y="${padT - 10}" text-anchor="start" font-size="11.5" font-weight="bold"`,
		'#0f172a',
		opts.yLabel
	);

	// Dashed guides
	for (const g of opts.dashedGuides ?? []) {
		const x1 = sx(g.x1);
		const y1 = sy(g.y1);
		const x2 = sx(g.x2);
		const y2 = sy(g.y2);
		const col = g.color ?? '#475569';
		body += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${col}" stroke-width="1.35" stroke-dasharray="5,4"/>`;
		if (g.label) {
			const isHoriz = Math.abs(y1 - y2) < 1.5;
			const isVert = Math.abs(x1 - x2) < 1.5;
			let lx = (x1 + x2) / 2;
			let ly = (y1 + y2) / 2;
			let anchor = 'middle';
			if (isHoriz) {
				lx = padL + pw * 0.42;
				ly = g.labelPos === 'bottom' ? y1 + 14 : y1 - 7;
			} else if (isVert) {
				const nearRight = x1 > padL + pw * 0.76;
				anchor = nearRight ? 'end' : 'start';
				lx = nearRight ? x1 - 7 : x1 + 7;
				ly = (y1 + y2) / 2;
			}
			body += haloText(
				`x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="${anchor}" font-size="10.5" font-weight="bold"`,
				col,
				g.label
			);
		}
	}

	// Curves
	const samples = 180;
	body += `<clipPath id="bioPlotClip"><rect x="${padL - 2}" y="${padT - 2}" width="${pw + 4}" height="${ph + 4}"/></clipPath><g clip-path="url(#bioPlotClip)">`;
	for (const c of opts.curves) {
		const pts: string[] = [];
		for (let i = 0; i <= samples; i++) {
			const xv = xMin + (i / samples) * xSpan;
			const yv = c.fn(xv);
			if (!Number.isFinite(yv)) continue;
			pts.push(`${sx(xv).toFixed(1)},${sy(yv).toFixed(1)}`);
		}
		if (pts.length > 1) {
			body += `<polyline fill="none" stroke="${c.color ?? '#16a34a'}" stroke-width="${c.strokeWidth ?? 2.3}" ${c.dashed ? 'stroke-dasharray="6,4"' : ''} points="${pts.join(' ')}"/>`;
		}
	}
	body += `</g>`;

	// Points
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
		const nearRight = px > padL + pw * 0.72;
		const nearTop = py < padT + 22;
		const nearBottom = py > padT + ph - 20;
		const dx = pt.dx ?? (nearRight ? -8 : 8);
		const dy = pt.dy ?? (nearBottom ? -8 : nearTop ? 16 : slope > 0 ? 16 : -8);
		const anchor = nearRight && pt.dx === undefined ? 'end' : 'start';
		body += haloText(
			`x="${(px + dx).toFixed(1)}" y="${(py + dy).toFixed(1)}" text-anchor="${anchor}" font-size="10.5" font-weight="bold"`,
			col,
			pt.label
		);
	}

	// Legend
	const labeled = opts.curves.filter((c) => c.label);
	if (labeled.length > 0) {
		labeled.forEach((c, idx) => {
			const lx = padL + pw - 6;
			const ly = padT + 16 + idx * 17;
			body += `<line x1="${lx - 54}" y1="${ly - 4}" x2="${lx - 34}" y2="${ly - 4}" stroke="${c.color ?? '#16a34a'}" stroke-width="2.2" ${c.dashed ? 'stroke-dasharray="5,3"' : ''}/>`;
			body += haloText(
				`x="${lx - 60}" y="${ly}" text-anchor="end" font-size="10.5" font-weight="bold"`,
				'#1e293b',
				c.label!
			);
		});
	}

	return wrapSciencesSvg(w, h, body);
}

/** 2. Functional Summary Flowchart (المخطط التحصيلي الوظيفي — Signature of ONEC BAC SNV) */
export function svgBioFlowchart(opts: {
	title: string;
	steps: Array<{
		label: string;
		sublabel?: string;
		color?: string;
		bg?: string;
		arrowLabel?: string;
	}>;
	orientation?: 'vertical' | 'horizontal';
	width?: number;
}): string {
	const horizontal = opts.orientation === 'horizontal';
	if (horizontal) {
		const n = opts.steps.length;
		const w = opts.width ?? Math.max(460, n * 124 + 24);
		const h = 148;
		const boxW = Math.floor((w - 28 - (n - 1) * 26) / n);
		let body = `<defs><marker id="flArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#334155"/></marker></defs>`;
		body += `<rect x="6" y="6" width="${w - 12}" height="${h - 12}" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
		body += `<text x="${w / 2}" y="26" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts.title)}</text>`;
		// Right-to-left visual flow for Arabic!
		opts.steps.forEach((st, idx) => {
			const revIdx = n - 1 - idx;
			const x = 14 + revIdx * (boxW + 26);
			const y = 46;
			const bh = 78;
			const col = st.color ?? '#0f766e';
			const bg = st.bg ?? '#f0fdfa';
			body += `<rect x="${x}" y="${y}" width="${boxW}" height="${bh}" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.8"/>`;
			body += `<text x="${x + boxW / 2}" y="${st.sublabel ? y + 32 : y + 43}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="${col}">${escRich(st.label)}</text>`;
			if (st.sublabel) {
				body += `<text x="${x + boxW / 2}" y="${y + 54}" text-anchor="middle" font-size="10" fill="#334155">${escRich(st.sublabel)}</text>`;
			}
			if (idx < n - 1) {
				// Arrow pointing left from current box to next box
				const ax1 = x;
				const ax2 = x - 24;
				const ay = y + bh / 2;
				body += `<line x1="${ax1}" y1="${ay}" x2="${ax2}" y2="${ay}" stroke="#334155" stroke-width="1.8" marker-end="url(#flArr)"/>`;
				if (st.arrowLabel) {
					body += haloText(
						`x="${(ax1 + ax2) / 2}" y="${ay - 8}" text-anchor="middle" font-size="9.5" font-weight="bold"`,
						'#475569',
						st.arrowLabel
					);
				}
			}
		});
		return wrapSciencesSvg(w, h, body);
	}

	const n = opts.steps.length;
	const w = opts.width ?? 440;
	const boxH = 44;
	const gap = 24;
	const h = 48 + n * boxH + (n - 1) * gap + 18;
	let body = `<defs><marker id="flArrV" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#334155"/></marker></defs>`;
	body += `<rect x="8" y="8" width="${w - 16}" height="${h - 16}" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="${w / 2}" y="30" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts.title)}</text>`;
	opts.steps.forEach((st, idx) => {
		const y = 44 + idx * (boxH + gap);
		const col = st.color ?? '#0f766e';
		const bg = st.bg ?? '#f0fdfa';
		body += `<rect x="34" y="${y}" width="${w - 68}" height="${boxH}" rx="8" fill="${bg}" stroke="${col}" stroke-width="1.7"/>`;
		body += `<text x="${w / 2}" y="${st.sublabel ? y + 19 : y + 26}" text-anchor="middle" font-size="12" font-weight="bold" fill="${col}">${escRich(st.label)}</text>`;
		if (st.sublabel) {
			body += `<text x="${w / 2}" y="${y + 36}" text-anchor="middle" font-size="10.5" fill="#334155">${escRich(st.sublabel)}</text>`;
		}
		if (idx < n - 1) {
			const y1 = y + boxH;
			const y2 = y1 + gap - 2;
			body += `<line x1="${w / 2}" y1="${y1}" x2="${w / 2}" y2="${y2}" stroke="#334155" stroke-width="1.8" marker-end="url(#flArrV)"/>`;
			if (st.arrowLabel) {
				body += haloText(
					`x="${w / 2 + 10}" y="${y1 + gap / 2 + 3}" text-anchor="start" font-size="10" font-weight="bold"`,
					'#475569',
					st.arrowLabel
				);
			}
		}
	});
	return wrapSciencesSvg(w, h, body);
}

/** 3. Cell & Organelle Ultrastructure Vector Illustrations */
export function svgCellUltrastructure(
	kind: 'animal' | 'plant' | 'chloroplast' | 'mitochondria' | 'neuron' | 'synapse',
	opts?: { numbered?: boolean; title?: string }
): string {
	const numbered = opts?.numbered ?? false;
	const w = 460;
	const h = 265;
	let body = `<rect x="6" y="6" width="${w - 12}" height="${h - 12}" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;

	if (kind === 'animal' || kind === 'plant') {
		const isPlant = kind === 'plant';
		const title = opts?.title ?? (isPlant ? 'فوق بنية الخلية النباتية بالمجهر الإلكتروني' : 'فوق بنية الخلية الحيوانية بالمجهر الإلكتروني');
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(title)}</text>`;
		if (isPlant) {
			// Thick cellulose cell wall + inner plasma membrane
			body += `<rect x="115" y="42" width="230" height="196" rx="18" fill="#dcfce7" stroke="#15803d" stroke-width="6"/>`;
			body += `<rect x="123" y="50" width="214" height="180" rx="13" fill="#fefce8" stroke="#65a30d" stroke-width="1.6"/>`;
			// Large central vacuole
			body += `<ellipse cx="255" cy="145" rx="60" ry="52" fill="#dbeafe" stroke="#2563eb" stroke-width="1.6"/>`;
			body += `<text x="255" y="149" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">${numbered ? '2' : 'فجوة عصارية'}</text>`;
			// Nucleus pushed to side
			body += `<circle cx="165" cy="108" r="28" fill="#ede9fe" stroke="#6d28d9" stroke-width="2" stroke-dasharray="5,2"/>`;
			body += `<circle cx="165" cy="108" r="10" fill="#7c3aed"/>`;
			// Chloroplasts
			for (const [cx, cy] of [[168, 178], [218, 76], [298, 86]]) {
				body += `<ellipse cx="${cx}" cy="${cy}" rx="20" ry="11" fill="#86efac" stroke="#166534" stroke-width="1.5"/>`;
				body += `<line x1="${cx - 12}" y1="${cy}" x2="${cx + 12}" y2="${cy}" stroke="#14532d" stroke-width="1.2"/>`;
				body += `<line x1="${cx - 8}" y1="${cy - 4}" x2="${cx + 8}" y2="${cy - 4}" stroke="#14532d" stroke-width="1"/>`;
			}
			// Mitochondrion
			body += `<ellipse cx="290" cy="206" rx="19" ry="10" fill="#fed7aa" stroke="#c2410c" stroke-width="1.5"/>`;
			body += `<path d="M 276 206 Q 282 200 288 206 Q 294 212 302 206" fill="none" stroke="#9a3412" stroke-width="1.3"/>`;
			// Labels
			const lbls = [
				{ x1: 118, y1: 68, tx: 20, ty: 68, text: numbered ? '1' : 'جدار بكتوسليلوزي', align: 'start' },
				{ x1: 150, y1: 108, tx: 20, ty: 112, text: numbered ? '3' : 'نواة + نوية', align: 'start' },
				{ x1: 158, y1: 178, tx: 20, ty: 178, text: numbered ? '4' : 'صانعة خضراء', align: 'start' },
				{ x1: 308, y1: 206, tx: 440, ty: 208, text: numbered ? '5' : 'ميتوكوندري', align: 'end' },
				{ x1: 337, y1: 115, tx: 440, ty: 115, text: numbered ? '6' : 'غشاء هيولي', align: 'end' }
			];
			for (const l of lbls) {
				body += `<line x1="${l.x1}" y1="${l.y1}" x2="${l.align === 'start' ? 105 : 356}" y2="${l.ty - 3}" stroke="#475569" stroke-width="1.1"/>`;
				if (numbered) body += calloutBadge(l.align === 'start' ? 92 : 368, l.ty - 3, l.text, '#15803d');
				else body += `<text x="${l.align === 'start' ? 100 : 360}" y="${l.ty}" text-anchor="${l.align === 'start' ? 'end' : 'start'}" font-size="11" font-weight="bold" fill="#0f172a">${esc(l.text)}</text>`;
			}
		} else {
			// Animal cell oval membrane
			body += `<ellipse cx="230" cy="144" rx="112" ry="92" fill="#fefce8" stroke="#ca8a04" stroke-width="2.6"/>`;
			// Nucleus + nucleolus + chromatin
			body += `<circle cx="222" cy="136" r="34" fill="#ede9fe" stroke="#6d28d9" stroke-width="2.2" stroke-dasharray="6,2"/>`;
			body += `<circle cx="222" cy="136" r="12" fill="#7c3aed"/>`;
			// RER sacs around nucleus
			body += `<path d="M 182 110 Q 166 135 182 162" fill="none" stroke="#2563eb" stroke-width="3"/>`;
			body += `<path d="M 173 116 Q 158 138 173 158" fill="none" stroke="#3b82f6" stroke-width="2.5"/>`;
			// Golgi
			body += `<path d="M 270 112 Q 285 118 298 112 M 268 120 Q 285 126 300 120 M 272 128 Q 285 134 296 128" fill="none" stroke="#0d9488" stroke-width="2.4"/>`;
			// Mitochondria
			body += `<ellipse cx="278" cy="176" rx="22" ry="11" fill="#fed7aa" stroke="#c2410c" stroke-width="1.6"/>`;
			body += `<path d="M 262 176 Q 270 169 278 176 Q 286 183 294 176" fill="none" stroke="#9a3412" stroke-width="1.4"/>`;
			// Ribosomes dots
			for (const [rx, ry] of [[162, 126], [166, 146], [198, 86], [244, 88], [202, 194]]) {
				body += `<circle cx="${rx}" cy="${ry}" r="2.4" fill="#1e293b"/>`;
			}
			const lbls = [
				{ x1: 222, y1: 102, ex: 106, ty: 74, text: numbered ? '1' : 'نواة (مقر الـ ADN)', side: 'left' },
				{ x1: 170, y1: 138, ex: 106, ty: 138, text: numbered ? '2' : 'شبكة هيولية محببة', side: 'left' },
				{ x1: 162, y1: 196, ex: 106, ty: 198, text: numbered ? '3' : 'غشاء هيولي', side: 'left' },
				{ x1: 292, y1: 120, ex: 356, ty: 94, text: numbered ? '4' : 'جهاز غولجي', side: 'right' },
				{ x1: 298, y1: 176, ex: 356, ty: 176, text: numbered ? '5' : 'ميتوكوندري', side: 'right' },
				{ x1: 244, y1: 88, ex: 356, ty: 56, text: numbered ? '6' : 'ريبوزومات', side: 'right' }
			];
			for (const l of lbls) {
				body += `<line x1="${l.x1}" y1="${l.y1}" x2="${l.ex}" y2="${l.ty}" stroke="#475569" stroke-width="1.1"/>`;
				if (numbered) body += calloutBadge(l.side === 'left' ? l.ex - 12 : l.ex + 12, l.ty, l.text, '#2563eb');
				else body += `<text x="${l.side === 'left' ? l.ex - 6 : l.ex + 6}" y="${l.ty + 4}" text-anchor="${l.side === 'left' ? 'end' : 'start'}" font-size="10.8" font-weight="bold" fill="#0f172a">${escRich(l.text)}</text>`;
			}
		}
		return wrapSciencesSvg(w, h, body);
	}

	if (kind === 'chloroplast') {
		const title = opts?.title ?? 'بنية الصانعة الخضراء ومقر مرحلتي التركيب الضوئي';
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(title)}</text>`;
		// Double envelope
		body += `<ellipse cx="230" cy="145" rx="146" ry="86" fill="#dcfce7" stroke="#15803d" stroke-width="3"/>`;
		body += `<ellipse cx="230" cy="145" rx="138" ry="78" fill="#ecfdf5" stroke="#16a34a" stroke-width="1.6"/>`;
		// Grana stacks (thylakoids)
		const stacks = [155, 225, 295];
		for (const sx of stacks) {
			for (let k = 0; k < 5; k++) {
				body += `<rect x="${sx - 20}" y="${112 + k * 12}" width="40" height="8" rx="4" fill="#22c55e" stroke="#14532d" stroke-width="1.2"/>`;
			}
		}
		// Stroma lamellae
		body += `<line x1="175" y1="128" x2="205" y2="128" stroke="#166534" stroke-width="2.5"/>`;
		body += `<line x1="245" y1="152" x2="275" y2="152" stroke="#166534" stroke-width="2.5"/>`;
		// Starch grain & DNA
		body += `<ellipse cx="195" cy="192" rx="16" ry="9" fill="#fef08a" stroke="#ca8a04" stroke-width="1.3"/>`;
		body += `<circle cx="280" cy="96" r="9" fill="none" stroke="#7c3aed" stroke-width="1.5"/>`;
		const lbls = [
			{ x1: 118, y1: 92, ex: 78, ty: 72, text: numbered ? '1' : 'غشاء خارجي وداخلي', side: 'left' },
			{ x1: 155, y1: 140, ex: 78, ty: 140, text: numbered ? '2' : 'تيلاكوئيد (مرحلة كيموضوئية)', side: 'left' },
			{ x1: 195, y1: 192, ex: 78, ty: 208, text: numbered ? '3' : 'حبيبة نشاء', side: 'left' },
			{ x1: 280, y1: 96, ex: 382, ty: 82, text: numbered ? '4' : 'ADN حلقي', side: 'right' },
			{ x1: 315, y1: 168, ex: 382, ty: 175, text: numbered ? '5' : 'الحشوة (حلقة كالفن)', side: 'right' }
		];
		for (const l of lbls) {
			body += `<line x1="${l.x1}" y1="${l.y1}" x2="${l.ex}" y2="${l.ty}" stroke="#334155" stroke-width="1.1"/>`;
			if (numbered) body += calloutBadge(l.side === 'left' ? l.ex - 12 : l.ex + 12, l.ty, l.text, '#15803d');
			else body += `<text x="${l.side === 'left' ? l.ex - 4 : l.ex + 4}" y="${l.ty + 4}" text-anchor="${l.side === 'left' ? 'end' : 'start'}" font-size="10.2" font-weight="bold" fill="#0f172a">${escRich(l.text)}</text>`;
		}
		return wrapSciencesSvg(w, h, body);
	}

	if (kind === 'mitochondria') {
		const title = opts?.title ?? 'بنية الميتوكوندري ومقر الأكسدة التنفسية';
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(title)}</text>`;
		body += `<ellipse cx="230" cy="145" rx="142" ry="76" fill="#ffedd5" stroke="#c2410c" stroke-width="3"/>`;
		// Inner folded membrane (cristae)
		body += `<path d="M 105 145 C 105 95, 145 85, 165 112 C 175 128, 192 128, 195 100 C 198 85, 222 85, 226 118 C 230 138, 250 138, 255 102 C 260 85, 290 85, 300 118 C 312 140, 348 118, 355 145 C 355 186, 315 200, 295 174 C 282 158, 265 158, 260 186 C 254 202, 228 202, 222 170 C 215 154, 196 154, 190 186 C 182 204, 120 198, 105 145 Z" fill="#fef3c7" stroke="#9a3412" stroke-width="2.2"/>`;
		// ATP synthase spheres along cristae
		for (const [cx, cy] of [[182, 122], [238, 132], [274, 162], [206, 162]]) {
			body += `<circle cx="${cx}" cy="${cy}" r="4.5" fill="#dc2626"/>`;
		}
		const lbls = [
			{ x1: 118, y1: 100, ex: 80, ty: 72, text: numbered ? '1' : 'غشاء خارجي', side: 'left' },
			{ x1: 182, y1: 122, ex: 80, ty: 142, text: numbered ? '2' : 'أعراف (السلسلة التنفسية)', side: 'left' },
			{ x1: 230, y1: 152, ex: 382, ty: 146, text: numbered ? '3' : 'المادة الأساسية (كريبس)', side: 'right' },
			{ x1: 274, y1: 162, ex: 382, ty: 196, text: numbered ? '4' : 'كرية مذنبة ATP سينتاز', side: 'right' }
		];
		for (const l of lbls) {
			body += `<line x1="${l.x1}" y1="${l.y1}" x2="${l.ex}" y2="${l.ty}" stroke="#334155" stroke-width="1.1"/>`;
			if (numbered) body += calloutBadge(l.side === 'left' ? l.ex - 12 : l.ex + 12, l.ty, l.text, '#c2410c');
			else body += `<text x="${l.side === 'left' ? l.ex - 4 : l.ex + 4}" y="${l.ty + 4}" text-anchor="${l.side === 'left' ? 'end' : 'start'}" font-size="10.2" font-weight="bold" fill="#0f172a">${escRich(l.text)}</text>`;
		}
		return wrapSciencesSvg(w, h, body);
	}

	if (kind === 'neuron') {
		const title = opts?.title ?? 'بنية العصبون (الخلية العصبية) واتجاه السيالة';
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(title)}</text>`;
		// Cell body (soma) on right for RTL direction!
		body += `<polygon points="365,98 386,78 378,118 408,128 378,144 392,178 360,158 338,176 346,142 325,132 348,118 338,84" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>`;
		body += `<circle cx="364" cy="130" r="13" fill="#a855f7" stroke="#581c87" stroke-width="1.5"/>`;
		// Axon extending left
		body += `<line x1="330" y1="130" x2="96" y2="130" stroke="#ca8a04" stroke-width="5"/>`;
		// Myelin sheaths
		for (const mx of [274, 212, 150]) {
			body += `<rect x="${mx}" y="117" width="46" height="26" rx="10" fill="#bfdbfe" stroke="#2563eb" stroke-width="1.7"/>`;
		}
		// Axon terminals on left
		body += `<path d="M 96 130 L 66 102 M 96 130 L 60 130 M 96 130 L 66 158" stroke="#ca8a04" stroke-width="2.4"/>`;
		for (const [tx, ty] of [[63, 100], [57, 130], [63, 160]]) {
			body += `<circle cx="${tx}" cy="${ty}" r="5" fill="#dc2626"/>`;
		}
		// Direction arrow
		body += `<defs><marker id="neuArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626"/></marker></defs>`;
		body += `<line x1="318" y1="186" x2="112" y2="186" stroke="#dc2626" stroke-width="2" marker-end="url(#neuArr)"/>`;
		body += `<text x="215" y="205" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">اتجاه انتشار الرسالة العصبية</text>`;
		// Labels
		const lbls = [
			{ x: 364, y: 66, text: numbered ? '1' : 'جسم خلوي وزوائد شجيرية' },
			{ x: 235, y: 92, text: numbered ? '2' : 'غمد النخاعين' },
			{ x: 204, y: 162, text: numbered ? '3' : 'اختناق رانفييه' },
			{ x: 70, y: 76, text: numbered ? '4' : 'تفرعات نهائية' }
		];
		for (const l of lbls) {
			if (numbered) body += calloutBadge(l.x, l.y, l.text, '#2563eb');
			else body += haloText(`x="${l.x}" y="${l.y}" text-anchor="middle" font-size="10.8" font-weight="bold"`, '#0f172a', l.text);
		}
		return wrapSciencesSvg(w, h, body);
	}

	// Synapse ultrastructure (3AS / 2AS)
	const title = opts?.title ?? 'بنية المشبك الكيميائي وآلية النقل المشبكي';
	body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(title)}</text>`;
	// Presynaptic terminal (top)
	body += `<path d="M 190 42 L 190 88 C 145 102, 138 148, 170 156 L 290 156 C 322 148, 315 102, 270 88 L 270 42" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2.4"/>`;
	// Synaptic vesicles with ACh dots
	for (const [vx, vy] of [[200, 114], [244, 110], [222, 136], [264, 136]]) {
		body += `<circle cx="${vx}" cy="${vy}" r="11" fill="#fef08a" stroke="#b45309" stroke-width="1.5"/>`;
		body += `<circle cx="${vx - 3}" cy="${vy - 2}" r="2.2" fill="#dc2626"/><circle cx="${vx + 3}" cy="${vy + 2}" r="2.2" fill="#dc2626"/>`;
	}
	// Ca2+ voltage channel on presynaptic wall
	body += `<rect x="148" y="122" width="12" height="18" rx="3" fill="#16a34a" stroke="#14532d" stroke-width="1.2"/>`;
	// Released neurotransmitter dots in synaptic cleft
	for (const [nx, ny] of [[195, 168], [218, 172], [238, 166], [258, 173]]) {
		body += `<circle cx="${nx}" cy="${ny}" r="3" fill="#dc2626"/>`;
	}
	// Postsynaptic membrane (bottom) with chemically gated Na+ channels
	body += `<path d="M 122 192 L 338 192 L 338 242 L 122 242 Z" fill="#f0fdf4" stroke="#15803d" stroke-width="2.4"/>`;
	for (const rx of [185, 230, 275]) {
		body += `<rect x="${rx - 8}" y="182" width="16" height="22" rx="3" fill="#f97316" stroke="#9a3412" stroke-width="1.3"/>`;
	}
	const lbls = [
		{ x1: 200, y1: 114, ex: 108, ty: 78, text: numbered ? '1' : 'حويصلات مشبكية', side: 'left' },
		{ x1: 150, y1: 130, ex: 108, ty: 128, text: numbered ? '2' : 'قنوات Ca²⁺ الفولطية', side: 'left' },
		{ x1: 185, y1: 192, ex: 108, ty: 198, text: numbered ? '3' : 'مستقبلات قنوية (Na⁺)', side: 'left' },
		{ x1: 270, y1: 72, ex: 356, ty: 72, text: numbered ? '4' : 'نهاية قبل مشبكية', side: 'right' },
		{ x1: 258, y1: 173, ex: 356, ty: 168, text: numbered ? '5' : 'شق مشبكي + مبلغ عصبي', side: 'right' },
		{ x1: 315, y1: 220, ex: 356, ty: 222, text: numbered ? '6' : 'خلية بعد مشبكية', side: 'right' }
	];
	for (const l of lbls) {
		body += `<line x1="${l.x1}" y1="${l.y1}" x2="${l.ex}" y2="${l.ty}" stroke="#334155" stroke-width="1.1"/>`;
		if (numbered) body += calloutBadge(l.side === 'left' ? l.ex - 12 : l.ex + 12, l.ty, l.text, '#1d4ed8');
		else body += `<text x="${l.side === 'left' ? l.ex - 4 : l.ex + 4}" y="${l.ty + 4}" text-anchor="${l.side === 'left' ? 'end' : 'start'}" font-size="10.2" font-weight="bold" fill="#0f172a">${escRich(l.text)}</text>`;
	}
	return wrapSciencesSvg(w, h, body);
}

/** 4. Molecular Biology Diagrams (Transcription, Translation, Enzymes, Protein Folding, Electrophoresis) */
export function svgMolecularBiology(
	kind:
		| 'transcription'
		| 'translation'
		| 'dna_double_helix'
		| 'protein_folding'
		| 'enzyme_substrate'
		| 'enzyme_inhibition'
		| 'membrane_channels'
		| 'electrophoresis',
	opts?: {
		numbered?: boolean;
		title?: string;
		codons?: [string, string, string];
		aminoAcids?: [string, string, string];
		electrophoresis?: { pH: number; bands: Array<{ label: string; pos: -1 | 0 | 1; color?: string }> };
	}
): string {
	const numbered = opts?.numbered ?? false;
	const w = 460;
	const h = 250;
	let body = `<rect x="6" y="6" width="${w - 12}" height="${h - 12}" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;

	if (kind === 'transcription') {
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'آلية الاستنساخ داخل النواة')}</text>`;
		// DNA strands opening into transcription bubble
		body += `<path d="M 30 92 L 130 92 C 160 58, 280 58, 310 92 L 430 92" fill="none" stroke="#1d4ed8" stroke-width="3"/>`;
		body += `<path d="M 30 112 L 130 112 C 160 152, 280 152, 310 112 L 430 112" fill="none" stroke="#1e40af" stroke-width="3"/>`;
		// ARN polymerase oval
		body += `<ellipse cx="220" cy="116" rx="58" ry="38" fill="#dbeafe" fill-opacity="0.72" stroke="#2563eb" stroke-width="2" stroke-dasharray="5,3"/>`;
		// Growing ARNm strand
		body += `<path d="M 255 124 L 175 130 C 145 148, 120 184, 70 198" fill="none" stroke="#dc2626" stroke-width="3.2"/>`;
		// Labels
		body += `<text x="48" y="84" font-size="10" font-weight="bold" fill="#1d4ed8">5'</text><text x="415" y="84" font-size="10" font-weight="bold" fill="#1d4ed8">3'</text>`;
		body += `<text x="48" y="128" font-size="10" font-weight="bold" fill="#1e40af">3'</text><text x="415" y="128" font-size="10" font-weight="bold" fill="#1e40af">5'</text>`;
		body += `<text x="72" y="216" font-size="11" font-weight="bold" fill="#dc2626">${numbered ? '3' : "ARNm (5' ← 3')"}</text>`;
		body += `<text x="220" y="114" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">${numbered ? '2' : 'ARN بوليميراز'}</text>`;
		body += `<text x="360" y="68" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">${numbered ? '1' : 'مورثة (ADN)'}</text>`;
		body += `<text x="296" y="186" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f766e">${numbered ? '4' : 'نيكليوتيدات ريبية حرة (A, U, C, G)'}</text>`;
		return wrapSciencesSvg(w, h, body);
	}

	if (kind === 'translation') {
		const [c1, c2, c3] = opts?.codons ?? ['AUG', 'GCU', 'GAU'];
		const [a1, a2, a3] = opts?.aminoAcids ?? ['Met', 'Ala', 'Asp'];
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'آلية الترجمة على مستوى الريبوزوم')}</text>`;
		// Ribosome big & small subunits
		body += `<ellipse cx="230" cy="126" rx="76" ry="52" fill="#e0e7ff" stroke="#4338ca" stroke-width="2.2"/>`;
		body += `<ellipse cx="230" cy="186" rx="68" ry="26" fill="#c7d2fe" stroke="#4338ca" stroke-width="2"/>`;
		// ARNm strip across ribosome
		body += `<rect x="44" y="160" width="372" height="22" rx="4" fill="#fee2e2" stroke="#dc2626" stroke-width="1.8"/>`;
		body += `<text x="64" y="175" font-size="11" font-weight="bold" fill="#991b1b">5'</text>`;
		body += `<text x="394" y="175" font-size="11" font-weight="bold" fill="#991b1b">3'</text>`;
		body += `<text x="196" y="175" text-anchor="middle" font-size="11" font-weight="bold" fill="#7f1d1d">${esc(c1)}</text>`;
		body += `<text x="248" y="175" text-anchor="middle" font-size="11" font-weight="bold" fill="#7f1d1d">${esc(c2)}</text>`;
		body += `<text x="306" y="175" text-anchor="middle" font-size="11" font-weight="bold" fill="#7f1d1d">${esc(c3)}</text>`;
		// Sites P and A + ARNt + peptide chain
		body += `<rect x="180" y="106" width="32" height="48" rx="6" fill="#fef08a" stroke="#ca8a04" stroke-width="1.6"/>`;
		body += `<text x="196" y="124" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#854d0e">موقع P</text>`;
		body += `<rect x="232" y="106" width="32" height="48" rx="6" fill="#dcfce7" stroke="#15803d" stroke-width="1.6"/>`;
		body += `<text x="248" y="124" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#14532d">موقع A</text>`;
		// Growing polypeptide chain
		body += `<circle cx="196" cy="92" r="11" fill="#16a34a"/><text x="196" y="96" text-anchor="middle" font-size="9" font-weight="bold" fill="#ffffff">${esc(a1)}</text>`;
		body += `<circle cx="248" cy="92" r="11" fill="#0284c7"/><text x="248" y="96" text-anchor="middle" font-size="9" font-weight="bold" fill="#ffffff">${esc(a2)}</text>`;
		body += `<circle cx="170" cy="68" r="11" fill="#7c3aed"/><text x="170" y="72" text-anchor="middle" font-size="9" font-weight="bold" fill="#ffffff">${esc(a3)}</text>`;
		body += `<line x1="178" y1="76" x2="188" y2="85" stroke="#0f172a" stroke-width="2"/>`;
		// Callouts
		body += `<text x="92" y="76" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#6d28d9">${numbered ? '1' : 'سلسلة بيبتيدية'}</text>`;
		body += `<text x="372" y="114" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#4338ca">${numbered ? '2' : 'تحت وحدة كبرى'}</text>`;
		body += `<text x="372" y="212" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#4338ca">${numbered ? '3' : 'تحت وحدة صغرى'}</text>`;
		body += `<text x="230" y="232" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#dc2626">اتجاه قراءة الريبوزوم (5' ← 3')</text>`;
		return wrapSciencesSvg(w, h, body);
	}

	if (kind === 'enzyme_substrate' || kind === 'enzyme_inhibition') {
		const isInhib = kind === 'enzyme_inhibition';
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? (isInhib ? 'آلية التثبيط الإنزيمي التنافسي' : 'آلية عمل الإنزيم والتكامل البنيوي المحفّز'))}</text>`;
		if (!isInhib) {
			// Step 1: E + S -> Step 2: ES -> Step 3: E + P
			// Enzyme pac-man shape
			const drawE = (cx: number, cy: number, col = '#2563eb') =>
				`<path d="M ${cx + 28} ${cy - 14} A 34 34 0 1 0 ${cx + 28} ${cy + 14} L ${cx + 6} ${cy + 10} L ${cx + 6} ${cy - 10} Z" fill="#dbeafe" stroke="${col}" stroke-width="2.2"/>`;
			body += drawE(356, 128);
			body += `<polygon points="370,118 394,112 394,144 370,138" fill="#fde047" stroke="#b45309" stroke-width="1.8"/>`;
			body += `<text x="356" y="182" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">إنزيم E + ركيزة S</text>`;
			// Arrow RTL
			body += `<text x="298" y="132" text-anchor="middle" font-size="18" font-weight="bold" fill="#334155">←</text>`;
			// ES complex
			body += drawE(228, 128, '#0f766e');
			body += `<polygon points="234,118 258,112 258,144 234,138" fill="#fde047" stroke="#b45309" stroke-width="1.8"/>`;
			body += `<text x="228" y="182" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f766e">معقد (E-S)</text>`;
			body += `<text x="228" y="199" text-anchor="middle" font-size="10" fill="#475569">تكامل محفّز بالموقع الفعال</text>`;
			body += `<text x="164" y="132" text-anchor="middle" font-size="18" font-weight="bold" fill="#334155">←</text>`;
			// E + Products
			body += drawE(90, 128);
			body += `<polygon points="108,108 128,102 128,122 108,122" fill="#86efac" stroke="#15803d" stroke-width="1.6"/>`;
			body += `<polygon points="108,134 128,134 128,154 108,148" fill="#fca5a5" stroke="#b91c1c" stroke-width="1.6"/>`;
			body += `<text x="90" y="182" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">إنزيم E + نواتج P</text>`;
		} else {
			// Competitive inhibitor blocking active site
			body += `<path d="M 332 108 A 40 40 0 1 0 332 152 L 304 144 L 304 116 Z" fill="#dbeafe" stroke="#2563eb" stroke-width="2.2"/>`;
			body += `<polygon points="310,118 340,112 340,148 310,142" fill="#fde047" stroke="#b45309" stroke-width="1.8"/>`;
			body += `<text x="315" y="194" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">غياب المثبط: تشكل المعقد ES</text>`;

			body += `<path d="M 152 108 A 40 40 0 1 0 152 152 L 124 144 L 124 116 Z" fill="#dbeafe" stroke="#2563eb" stroke-width="2.2"/>`;
			body += `<polygon points="128,118 158,112 158,148 128,142" fill="#f87171" stroke="#991b1b" stroke-width="1.8"/>`;
			body += `<text x="142" y="134" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#ffffff">I</text>`;
			body += `<polygon points="186,94 214,88 214,122 186,116" fill="#fde047" stroke="#b45309" stroke-width="1.6" stroke-dasharray="3,2"/>`;
			body += `<text x="140" y="194" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">مثبط تنافسي I يحجب الموقع الفعال</text>`;
		}
		return wrapSciencesSvg(w, h, body);
	}

	if (kind === 'electrophoresis') {
		const el = opts?.electrophoresis ?? {
			pH: 6,
			bands: [
				{ label: 'Lys (pHi = 9.7)', pos: -1, color: '#2563eb' },
				{ label: 'Ala (pHi = 6.0)', pos: 0, color: '#16a34a' },
				{ label: 'Glu (pHi = 3.2)', pos: 1, color: '#dc2626' }
			]
		};
		body += `<text x="${w / 2}" y="26" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? `نتائج الهجرة الكهربائية عند pH = ${el.pH}`)}</text>`;
		// Gel paper strip
		body += `<rect x="60" y="56" width="340" height="126" rx="6" fill="#ffffff" stroke="#334155" stroke-width="2"/>`;
		// Poles
		body += `<rect x="24" y="96" width="32" height="44" rx="5" fill="#fee2e2" stroke="#dc2626" stroke-width="1.8"/>`;
		body += `<text x="40" y="124" text-anchor="middle" font-size="16" font-weight="bold" fill="#dc2626">+</text>`;
		body += `<text x="40" y="156" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#991b1b">أنود</text>`;
		body += `<rect x="404" y="96" width="32" height="44" rx="5" fill="#dbeafe" stroke="#2563eb" stroke-width="1.8"/>`;
		body += `<text x="420" y="124" text-anchor="middle" font-size="18" font-weight="bold" fill="#2563eb">−</text>`;
		body += `<text x="420" y="156" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#1e3a8a">كاثود</text>`;
		// Origin deposit line
		body += `<line x1="230" y1="56" x2="230" y2="182" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="5,4"/>`;
		body += `<text x="230" y="200" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#475569">خط وضع الخليط (المنتصف)</text>`;
		// Bands: pos=1 => moves toward + (left), pos=0 => center, pos=-1 => moves toward - (right)
		el.bands.forEach((b, i) => {
			const bx = b.pos === 1 ? 128 : b.pos === -1 ? 332 : 230;
			const by = 86 + i * 32;
			const col = b.color ?? '#0f172a';
			body += `<ellipse cx="${bx}" cy="${by}" rx="18" ry="7" fill="${col}" opacity="0.88"/>`;
			body += haloText(`x="${bx}" y="${by - 10}" text-anchor="middle" font-size="10" font-weight="bold"`, col, b.label);
		});
		body += `<text x="${w / 2}" y="226" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f766e">الوسط المنظم: pH = ${el.pH}</text>`;
		return wrapSciencesSvg(w, h, body);
	}

	if (kind === 'dna_double_helix' || kind === 'protein_folding' || kind === 'membrane_channels') {
		if (kind === 'dna_double_helix') {
			body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'البنية اللولبية المزدوجة لجزيئة الـ ADN')}</text>`;
			// Ladder with complementary base pairs
			const pairs: Array<[string, string, number, string, string]> = [
				['A', 'T', 2, '#16a34a', '#dc2626'],
				['G', 'C', 3, '#2563eb', '#d97706'],
				['C', 'G', 3, '#d97706', '#2563eb'],
				['T', 'A', 2, '#dc2626', '#16a34a'],
				['A', 'T', 2, '#16a34a', '#dc2626']
			];
			body += `<line x1="130" y1="48" x2="130" y2="218" stroke="#1e293b" stroke-width="5"/>`;
			body += `<line x1="330" y1="48" x2="330" y2="218" stroke="#1e293b" stroke-width="5"/>`;
			body += `<text x="130" y="42" text-anchor="middle" font-size="10.5" font-weight="bold">5'</text><text x="130" y="233" text-anchor="middle" font-size="10.5" font-weight="bold">3'</text>`;
			body += `<text x="330" y="42" text-anchor="middle" font-size="10.5" font-weight="bold">3'</text><text x="330" y="233" text-anchor="middle" font-size="10.5" font-weight="bold">5'</text>`;
			pairs.forEach(([b1, b2, bonds, c1, c2], idx) => {
				const y = 72 + idx * 32;
				body += `<rect x="134" y="${y - 10}" width="66" height="20" rx="4" fill="${c1}" opacity="0.2" stroke="${c1}" stroke-width="1.5"/>`;
				body += `<text x="167" y="${y + 4}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="${c1}">${b1}</text>`;
				body += `<rect x="260" y="${y - 10}" width="66" height="20" rx="4" fill="${c2}" opacity="0.2" stroke="${c2}" stroke-width="1.5"/>`;
				body += `<text x="293" y="${y + 4}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="${c2}">${b2}</text>`;
				// Hydrogen bonds
				for (let b = 0; b < bonds; b++) {
					const by = y - (bonds - 1) * 3 + b * 6;
					body += `<line x1="204" y1="${by}" x2="256" y2="${by}" stroke="#475569" stroke-width="1.5" stroke-dasharray="4,3"/>`;
				}
			});
			body += `<text x="64" y="134" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#334155">سلسلة سكر-فوسفات</text>`;
			body += `<text x="396" y="134" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#334155">روابط هيدروجينية</text>`;
			return wrapSciencesSvg(w, h, body);
		}
		if (kind === 'protein_folding') {
			body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'مستويات البنية الفراغية للبروتين')}</text>`;
			const cols = [
				{ x: 356, title: 'بنية أولية', sub: 'سلسلة أحماض أمينية خطية', col: '#2563eb', bg: '#eff6ff' },
				{ x: 252, title: 'بنية ثانوية', sub: 'حلزون α أو وريقات β', col: '#0f766e', bg: '#f0fdfa' },
				{ x: 148, title: 'بنية ثالثية', sub: 'انطواء + جسور S-S', col: '#b45309', bg: '#fffbeb' },
				{ x: 44, title: 'بنية رابعية', sub: 'تجمع تحت وحدات', col: '#7c3aed', bg: '#f5f3ff' }
			];
			for (const c of cols) {
				body += `<rect x="${c.x - 32}" y="44" width="92" height="174" rx="8" fill="${c.bg}" stroke="${c.col}" stroke-width="1.7"/>`;
				body += `<text x="${c.x + 14}" y="66" text-anchor="middle" font-size="11.5" font-weight="bold" fill="${c.col}">${esc(c.title)}</text>`;
				body += `<text x="${c.x + 14}" y="204" text-anchor="middle" font-size="9.2" fill="#334155">${esc(c.sub)}</text>`;
			}
			// Primary beads
			for (let k = 0; k < 4; k++) {
				body += `<circle cx="${370}" cy="${90 + k * 24}" r="8" fill="#3b82f6"/>`;
			}
			// Secondary helix wave
			body += `<path d="M 244 88 Q 288 100 244 114 Q 288 128 244 142 Q 288 156 244 170" fill="none" stroke="#0f766e" stroke-width="3.2"/>`;
			// Tertiary folded globule with S-S bridge
			body += `<path d="M 136 96 C 186 80, 192 142, 146 138 C 122 135, 134 178, 182 162" fill="none" stroke="#b45309" stroke-width="3.2"/>`;
			body += `<line x1="150" y1="108" x2="156" y2="150" stroke="#dc2626" stroke-width="2" stroke-dasharray="3,2"/>`;
			body += `<text x="166" y="132" font-size="8.5" font-weight="bold" fill="#dc2626">S-S</text>`;
			// Quaternary 2 subunits
			body += `<circle cx="46" cy="118" r="18" fill="#c4b5fd" stroke="#7c3aed" stroke-width="1.8"/>`;
			body += `<circle cx="72" cy="146" r="18" fill="#93c5fd" stroke="#2563eb" stroke-width="1.8"/>`;
			return wrapSciencesSvg(w, h, body);
		}
		// membrane_channels (Na+/K+ ATPase & voltage channels)
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'القنوات الغشائية ومضخة Na⁺/K⁺ أثناء كمون الراحة والعمل')}</text>`;
		body += `<rect x="28" y="108" width="404" height="36" rx="4" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>`;
		body += `<text x="58" y="64" font-size="11" font-weight="bold" fill="#1e3a8a">الوسط الخارجي (+)</text>`;
		body += `<text x="58" y="218" font-size="11" font-weight="bold" fill="#991b1b">الهيولى الداخلية (−)</text>`;
		// Na+ voltage channel
		body += `<rect x="112" y="96" width="38" height="60" rx="6" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2"/>`;
		body += `<text x="131" y="128" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e3a8a">Na⁺</text>`;
		body += `<text x="131" y="84" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">دخول Na⁺</text>`;
		// K+ voltage channel
		body += `<rect x="210" y="96" width="38" height="60" rx="6" fill="#dcfce7" stroke="#15803d" stroke-width="2"/>`;
		body += `<text x="229" y="128" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#14532d">K⁺</text>`;
		body += `<text x="229" y="178" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">خروج K⁺</text>`;
		// Na+/K+ ATPase pump
		body += `<ellipse cx="346" cy="126" rx="34" ry="28" fill="#ede9fe" stroke="#6d28d9" stroke-width="2.2"/>`;
		body += `<text x="346" y="122" text-anchor="middle" font-size="10" font-weight="bold" fill="#581c87">مضخة ATP</text>`;
		body += `<text x="346" y="138" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#581c87">3Na⁺ / 2K⁺</text>`;
		return wrapSciencesSvg(w, h, body);
	}

	return wrapSciencesSvg(w, h, body);
}

/** 5. Immunology Diagrams (Antibody/Immune Complex, Humoral/Cellular, HIV, CMH, Phagocytosis, Ouchterlony) */
export function svgImmunologyDiagram(
	kind:
		| 'antibody_complex'
		| 'humoral_response'
		| 'cellular_cytolysis'
		| 'hiv_cycle'
		| 'cmh_presentation'
		| 'phagocytosis'
		| 'ouchterlony',
	opts?: { numbered?: boolean; title?: string }
): string {
	const numbered = opts?.numbered ?? false;
	const w = 460;
	const h = 250;
	let body = `<rect x="6" y="6" width="${w - 12}" height="${h - 12}" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;

	if (kind === 'antibody_complex') {
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'بنية الجسم المضاد وتشكيل المعقد المناعي')}</text>`;
		// Heavy chains (Y shape)
		body += `<path d="M 222 204 L 222 128 L 178 76" fill="none" stroke="#1d4ed8" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>`;
		body += `<path d="M 238 204 L 238 128 L 282 76" fill="none" stroke="#1d4ed8" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>`;
		// Light chains
		body += `<path d="M 194 122 L 160 82" fill="none" stroke="#0d9488" stroke-width="5" stroke-linecap="round"/>`;
		body += `<path d="M 266 122 L 300 82" fill="none" stroke="#0d9488" stroke-width="5" stroke-linecap="round"/>`;
		// Disulfide bridges
		body += `<line x1="222" y1="144" x2="238" y2="144" stroke="#dc2626" stroke-width="2.5"/>`;
		body += `<line x1="222" y1="154" x2="238" y2="154" stroke="#dc2626" stroke-width="2.5"/>`;
		// Antigen bound at tips
		body += `<circle cx="164" cy="68" r="11" fill="#fde047" stroke="#b45309" stroke-width="1.8"/>`;
		body += `<circle cx="296" cy="68" r="11" fill="#fde047" stroke="#b45309" stroke-width="1.8"/>`;
		const lbls = [
			{ x1: 164, y1: 68, ex: 108, ty: 68, text: numbered ? '1' : 'محدد مستضدي', side: 'left' },
			{ x1: 170, y1: 96, ex: 108, ty: 112, text: numbered ? '2' : 'سلسلة خفيفة', side: 'left' },
			{ x1: 222, y1: 184, ex: 108, ty: 184, text: numbered ? '3' : 'موقع تثبيت على البالعة', side: 'left' },
			{ x1: 282, y1: 92, ex: 356, ty: 92, text: numbered ? '4' : 'منطقة متغيرة', side: 'right' },
			{ x1: 238, y1: 150, ex: 356, ty: 148, text: numbered ? '5' : 'سلسلة ثقيلة + جسور S-S', side: 'right' },
			{ x1: 238, y1: 196, ex: 356, ty: 196, text: numbered ? '6' : 'منطقة ثابتة', side: 'right' }
		];
		for (const l of lbls) {
			body += `<line x1="${l.x1}" y1="${l.y1}" x2="${l.ex}" y2="${l.ty}" stroke="#475569" stroke-width="1.1"/>`;
			if (numbered) body += calloutBadge(l.side === 'left' ? l.ex - 12 : l.ex + 12, l.ty, l.text, '#1d4ed8');
			else body += `<text x="${l.side === 'left' ? l.ex - 4 : l.ex + 4}" y="${l.ty + 4}" text-anchor="${l.side === 'left' ? 'end' : 'start'}" font-size="10.2" font-weight="bold" fill="#0f172a">${escRich(l.text)}</text>`;
		}
		return wrapSciencesSvg(w, h, body);
	}

	if (kind === 'ouchterlony') {
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'اختبار الانتشار المناعي (أوشتيرلوني)')}</text>`;
		// Agar dish
		body += `<circle cx="230" cy="140" r="88" fill="#f0f9ff" stroke="#0284c7" stroke-width="2.2"/>`;
		// Central well (serum with antibodies)
		body += `<circle cx="230" cy="140" r="16" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.8"/>`;
		body += `<text x="230" y="144" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">مصل</text>`;
		// Peripheral wells
		const wells = [
			{ cx: 230, cy: 76, label: 'A', arc: true, ax: 230, ay: 108, rot: 0 },
			{ cx: 288, cy: 172, label: 'B', arc: false, ax: 260, ay: 156, rot: 0 },
			{ cx: 172, cy: 172, label: 'C', arc: true, ax: 201, ay: 156, rot: -120 }
		];
		for (const wl of wells) {
			body += `<circle cx="${wl.cx}" cy="${wl.cy}" r="14" fill="#fef08a" stroke="#b45309" stroke-width="1.6"/>`;
			body += `<text x="${wl.cx}" y="${wl.cy + 4}" text-anchor="middle" font-size="11" font-weight="bold" fill="#854d0e">${wl.label}</text>`;
			if (wl.arc) {
				body += `<path d="M ${wl.ax - 15} ${wl.ay} Q ${wl.ax} ${wl.ay + 8} ${wl.ax + 15} ${wl.ay}" fill="none" stroke="#dc2626" stroke-width="3" transform="rotate(${wl.rot} ${wl.ax} ${wl.ay})"/>`;
			}
		}
		body += `<text x="380" y="106" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">قوس ترسيب</text>`;
		body += `<text x="380" y="122" text-anchor="middle" font-size="9.8" fill="#334155">(معقد مناعي نوعي)</text>`;
		body += `<text x="80" y="124" text-anchor="middle" font-size="10.2" fill="#334155">غياب القوس مع B</text>`;
		body += `<text x="80" y="140" text-anchor="middle" font-size="9.5" fill="#475569">(عدم وجود تكامل)</text>`;
		return wrapSciencesSvg(w, h, body);
	}

	if (kind === 'phagocytosis') {
		body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${escRich(opts?.title ?? 'مراحل البلعمة (الاستجابة المناعية اللانوعية)')}</text>`;
		const stages = [
			{ x: 378, num: '1', label: 'الانجذاب والالتصاق' },
			{ x: 280, num: '2', label: 'الإحاطة والابتلاع' },
			{ x: 182, num: '3', label: 'الهضم بالليزوزوم' },
			{ x: 84, num: '4', label: 'طرح الفضلات' }
		];
		for (const st of stages) {
			body += `<rect x="${st.x - 42}" y="44" width="84" height="174" rx="8" fill="#ffffff" stroke="#0d9488" stroke-width="1.6"/>`;
			body += calloutBadge(st.x, 62, st.num, '#0f766e');
			body += `<circle cx="${st.x}" cy="126" r="26" fill="#ccfbf1" stroke="#0f766e" stroke-width="1.8"/>`;
			body += `<ellipse cx="${st.x - 6}" cy="126" rx="9" ry="12" fill="#5eead4" stroke="#115e59" stroke-width="1.2"/>`;
			if (st.num === '1') {
				body += `<circle cx="${st.x + 28}" cy="116" r="6" fill="#dc2626"/>`;
			} else if (st.num === '2') {
				body += `<circle cx="${st.x + 14}" cy="120" r="6" fill="#dc2626"/>`;
			} else if (st.num === '3') {
				body += `<circle cx="${st.x + 12}" cy="124" r="9" fill="#fef08a" stroke="#ca8a04" stroke-width="1.2"/>`;
				body += `<circle cx="${st.x + 12}" cy="124" r="3" fill="#dc2626"/>`;
			} else {
				body += `<circle cx="${st.x + 30}" cy="112" r="2.8" fill="#94a3b8"/><circle cx="${st.x + 32}" cy="126" r="2.8" fill="#94a3b8"/>`;
			}
			body += `<text x="${st.x}" y="198" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#0f172a">${esc(st.label)}</text>`;
		}
		return wrapSciencesSvg(w, h, body);
	}

	// cellular_cytolysis / humoral_response / hiv_cycle / cmh_presentation
	const flowMap: Record<
		'humoral_response' | 'cellular_cytolysis' | 'hiv_cycle' | 'cmh_presentation',
		{ title: string; steps: Array<{ label: string; sublabel: string; color: string; bg: string }> }
	> = {
		humoral_response: {
			title: opts?.title ?? 'مراحل الاستجابة المناعية النوعية ذات الوساطة الخلطية',
			steps: [
				{ label: 'التعرف والانتقاء', sublabel: 'LB تمتلك BCR متكامل + CPA', color: '#2563eb', bg: '#eff6ff' },
				{ label: 'التحفيز والتكاثر', sublabel: 'إنترلوكين 2 (IL-2) من LTh', color: '#7c3aed', bg: '#f5f3ff' },
				{ label: 'التمايز والإفراز', sublabel: 'بلاسموسيت تفرز أجساماً مضادة', color: '#0f766e', bg: '#f0fdfa' },
				{ label: 'تشكيل معقد مناعي', sublabel: 'إبطال مفعول المستضد + بلعمة', color: '#15803d', bg: '#f0fdf4' }
			]
		},
		cellular_cytolysis: {
			title: opts?.title ?? 'آلية تخريب الخلية المصابة بواسطة LTc (الوساطة الخلوية)',
			steps: [
				{ label: 'التعرف المزدوج', sublabel: 'TCR على LTc + معقد (CMH I – ببتيد)', color: '#1d4ed8', bg: '#eff6ff' },
				{ label: 'إفراز البرفورين', sublabel: 'تشكيل قنوات حلولية بغشاء المصابة', color: '#b45309', bg: '#fffbeb' },
				{ label: 'انحلال الخلية المصابة', sublabel: 'دخول الماء والأملاح + بلعمة الأشلاء', color: '#dc2626', bg: '#fef2f2' }
			]
		},
		hiv_cycle: {
			title: opts?.title ?? 'آلية استهداف فيروس VIH للخلايا اللمفاوية LT4',
			steps: [
				{ label: 'التثبيت والاختراق', sublabel: 'تكامل gp120 مع مستقبل CD4', color: '#dc2626', bg: '#fef2f2' },
				{ label: 'الاستنساخ العكسي', sublabel: 'ARN فيروسي ← ADN فيروسي', color: '#b45309', bg: '#fffbeb' },
				{ label: 'الاندماج والتكاثر', sublabel: 'تخريب LT4 ← عجز مناعي (السيدا)', color: '#7c3aed', bg: '#f5f3ff' }
			]
		},
		cmh_presentation: {
			title: opts?.title ?? 'عرض الببتيد المستضدي رفقة جزيئات CMH',
			steps: [
				{ label: 'بلعمة وهضم جزئي', sublabel: 'خلية عارضة للمستضد CPA', color: '#0f766e', bg: '#f0fdfa' },
				{ label: 'تشكيل معقد CMH II', sublabel: 'عرض المحدد المستضدي على السطح', color: '#2563eb', bg: '#eff6ff' },
				{ label: 'تعارف مزدوج مع LT4', sublabel: 'تنشيط التعاون المناعي (IL-2)', color: '#15803d', bg: '#f0fdf4' }
			]
		}
	};
	const cfg = flowMap[kind];
	return svgBioFlowchart({ title: cfg.title, steps: cfg.steps, orientation: 'horizontal', width: 470 });
}
