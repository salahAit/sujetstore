function escXml(str: string): string {
	return str
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

function wrapSecSvg(width: number, height: number, body: string): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="background:#ffffff;font-family:Arial,sans-serif">${body}</svg>`;
}

/** 1. Analytical function curve plotter with discontinuity splitting, asymptotes, extrema & tangents */
export function svgFunctionCurvePlot(opts: {
	xMin?: number;
	xMax?: number;
	yMin?: number;
	yMax?: number;
	fn: (x: number) => number;
	curveLabel?: string;
	asymptotes?: Array<{ kind: 'vertical' | 'horizontal' | 'oblique'; value?: number; a?: number; b?: number; label?: string; color?: string }>;
	points?: Array<{ x: number; y: number; label: string; color?: string }>;
	tangents?: Array<{ x: number; y: number; slope: number; halfSpan?: number; color?: string }>;
	shadedIntegral?: { a: number; b: number; color?: string };
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 380;
	const h = opts.height ?? 260;
	const padL = 34;
	const padR = 22;
	const padT = 22;
	const padB = 26;
	const xMin = opts.xMin ?? -4;
	const xMax = opts.xMax ?? 5;
	const yMin = opts.yMin ?? -3;
	const yMax = opts.yMax ?? 5;

	const plotW = w - padL - padR;
	const plotH = h - padT - padB;
	const toPxX = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * plotW;
	const toPxY = (y: number) => padT + ((yMax - y) / (yMax - yMin)) * plotH;

	const parts: string[] = [];
	const clipId = 'plot-clip';
	parts.push(`<defs><clipPath id="${clipId}"><rect x="${padL}" y="${padT}" width="${plotW}" height="${plotH}"/></clipPath></defs>`);
	parts.push(`<rect x="${padL}" y="${padT}" width="${plotW}" height="${plotH}" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>`);

	// Grid
	for (let gx = Math.ceil(xMin); gx <= Math.floor(xMax); gx++) {
		const px = toPxX(gx);
		parts.push(`<line x1="${px.toFixed(1)}" y1="${padT}" x2="${px.toFixed(1)}" y2="${padT + plotH}" stroke="#e2e8f0" stroke-width="1"/>`);
		if (gx !== 0) {
			parts.push(`<text x="${px.toFixed(1)}" y="${(padT + plotH + 14).toFixed(1)}" text-anchor="middle" font-size="10" fill="#475569">${gx}</text>`);
		}
	}
	for (let gy = Math.ceil(yMin); gy <= Math.floor(yMax); gy++) {
		const py = toPxY(gy);
		parts.push(`<line x1="${padL}" y1="${py.toFixed(1)}" x2="${padL + plotW}" y2="${py.toFixed(1)}" stroke="#e2e8f0" stroke-width="1"/>`);
		if (gy !== 0) {
			parts.push(`<text x="${padL - 6}" y="${(py + 3).toFixed(1)}" text-anchor="end" font-size="10" fill="#475569">${gy}</text>`);
		}
	}

	// Shaded area under curve
	if (opts.shadedIntegral) {
		const { a, b, color = 'rgba(59,130,246,0.18)' } = opts.shadedIntegral;
		const aClamped = Math.max(xMin, Math.min(xMax, a));
		const bClamped = Math.max(xMin, Math.min(xMax, b));
		if (bClamped > aClamped && 0 >= yMin && 0 <= yMax) {
			const steps = 60;
			const areaPts: string[] = [`${toPxX(aClamped).toFixed(1)},${toPxY(0).toFixed(1)}`];
			for (let i = 0; i <= steps; i++) {
				const x = aClamped + ((bClamped - aClamped) * i) / steps;
				const y = opts.fn(x);
				if (Number.isFinite(y)) {
					const yc = Math.max(yMin, Math.min(yMax, y));
					areaPts.push(`${toPxX(x).toFixed(1)},${toPxY(yc).toFixed(1)}`);
				}
			}
			areaPts.push(`${toPxX(bClamped).toFixed(1)},${toPxY(0).toFixed(1)}`);
			parts.push(`<polygon points="${areaPts.join(' ')}" fill="${color}" clip-path="url(#${clipId})"/>`);
		}
	}

	// Axes
	if (yMin <= 0 && yMax >= 0) {
		const y0 = toPxY(0);
		parts.push(`<line x1="${padL}" y1="${y0.toFixed(1)}" x2="${padL + plotW}" y2="${y0.toFixed(1)}" stroke="#0f172a" stroke-width="1.5"/>`);
		parts.push(`<polygon points="${padL + plotW},${y0.toFixed(1)} ${padL + plotW - 7},${(y0 - 3.5).toFixed(1)} ${padL + plotW - 7},${(y0 + 3.5).toFixed(1)}" fill="#0f172a"/>`);
		parts.push(`<text x="${padL + plotW - 4}" y="${(y0 - 7).toFixed(1)}" text-anchor="end" font-size="11" font-weight="bold" fill="#0f172a">x</text>`);
	}
	if (xMin <= 0 && xMax >= 0) {
		const x0 = toPxX(0);
		parts.push(`<line x1="${x0.toFixed(1)}" y1="${padT}" x2="${x0.toFixed(1)}" y2="${padT + plotH}" stroke="#0f172a" stroke-width="1.5"/>`);
		parts.push(`<polygon points="${x0.toFixed(1)},${padT} ${(x0 - 3.5).toFixed(1)},${padT + 7} ${(x0 + 3.5).toFixed(1)},${padT + 7}" fill="#0f172a"/>`);
		parts.push(`<text x="${(x0 + 8).toFixed(1)}" y="${padT + 12}" font-size="11" font-weight="bold" fill="#0f172a">y</text>`);
	}
	if (xMin <= 0 && xMax >= 0 && yMin <= 0 && yMax >= 0) {
		parts.push(`<text x="${(toPxX(0) - 8).toFixed(1)}" y="${(toPxY(0) + 13).toFixed(1)}" font-size="10" font-weight="bold" fill="#0f172a">O</text>`);
	}

	// Asymptotes
	for (const asym of opts.asymptotes || []) {
		const col = asym.color || '#dc2626';
		if (asym.kind === 'vertical' && asym.value !== undefined) {
			const px = toPxX(asym.value);
			if (asym.value >= xMin && asym.value <= xMax) {
				parts.push(`<line x1="${px.toFixed(1)}" y1="${padT}" x2="${px.toFixed(1)}" y2="${padT + plotH}" stroke="${col}" stroke-width="1.4" stroke-dasharray="5,4"/>`);
				if (asym.label) parts.push(`<text x="${(px + 4).toFixed(1)}" y="${padT + 14}" font-size="10" font-weight="bold" fill="${col}">${escXml(asym.label)}</text>`);
			}
		} else if (asym.kind === 'horizontal' && asym.value !== undefined) {
			const py = toPxY(asym.value);
			if (asym.value >= yMin && asym.value <= yMax) {
				parts.push(`<line x1="${padL}" y1="${py.toFixed(1)}" x2="${padL + plotW}" y2="${py.toFixed(1)}" stroke="${col}" stroke-width="1.4" stroke-dasharray="5,4"/>`);
				if (asym.label) parts.push(`<text x="${padL + 6}" y="${(py - 5).toFixed(1)}" font-size="10" font-weight="bold" fill="${col}">${escXml(asym.label)}</text>`);
			}
		} else if (asym.kind === 'oblique' && asym.a !== undefined && asym.b !== undefined) {
			const y1 = asym.a * xMin + asym.b;
			const y2 = asym.a * xMax + asym.b;
			parts.push(`<line x1="${toPxX(xMin).toFixed(1)}" y1="${toPxY(y1).toFixed(1)}" x2="${toPxX(xMax).toFixed(1)}" y2="${toPxY(y2).toFixed(1)}" stroke="${col}" stroke-width="1.4" stroke-dasharray="5,4" clip-path="url(#${clipId})"/>`);
			if (asym.label) {
				const lx = xMax - 0.6;
				const ly = asym.a * lx + asym.b;
				if (ly >= yMin + 0.3 && ly <= yMax - 0.3) {
					parts.push(`<text x="${toPxX(lx).toFixed(1)}" y="${(toPxY(ly) - 6).toFixed(1)}" text-anchor="end" font-size="10" font-weight="bold" fill="${col}">${escXml(asym.label)}</text>`);
				}
			}
		}
	}

	// Smooth sampled curve with jump discontinuity protection
	const N = 260;
	const yRange = yMax - yMin;
	let segments: string[] = [];
	let currentPath: string[] = [];
	let prevY: number | null = null;
	for (let i = 0; i <= N; i++) {
		const x = xMin + ((xMax - xMin) * i) / N;
		const y = opts.fn(x);
		if (!Number.isFinite(y) || y < yMin - yRange * 0.5 || y > yMax + yRange * 0.5) {
			if (currentPath.length >= 2) segments.push(currentPath.join(' '));
			currentPath = [];
			prevY = null;
			continue;
		}
		if (prevY !== null && Math.abs(y - prevY) > yRange * 0.65) {
			if (currentPath.length >= 2) segments.push(currentPath.join(' '));
			currentPath = [];
		}
		currentPath.push(`${toPxX(x).toFixed(1)},${toPxY(y).toFixed(1)}`);
		prevY = y;
	}
	if (currentPath.length >= 2) segments.push(currentPath.join(' '));
	for (const seg of segments) {
		parts.push(`<polyline points="${seg}" fill="none" stroke="#1d4ed8" stroke-width="2.4" clip-path="url(#${clipId})"/>`);
	}

	// Tangents
	for (const tg of opts.tangents || []) {
		const span = tg.halfSpan ?? 1.0;
		const col = tg.color || '#059669';
		const x1 = tg.x - span;
		const y1 = tg.y - tg.slope * span;
		const x2 = tg.x + span;
		const y2 = tg.y + tg.slope * span;
		parts.push(`<line x1="${toPxX(x1).toFixed(1)}" y1="${toPxY(y1).toFixed(1)}" x2="${toPxX(x2).toFixed(1)}" y2="${toPxY(y2).toFixed(1)}" stroke="${col}" stroke-width="1.8" clip-path="url(#${clipId})"/>`);
	}

	// Highlighted points
	for (const pt of opts.points || []) {
		const col = pt.color || '#15803d';
		const px = toPxX(pt.x);
		const py = toPxY(pt.y);
		parts.push(`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="4" fill="${col}" stroke="#ffffff" stroke-width="1"/>`);
		parts.push(`<text x="${(px + 6).toFixed(1)}" y="${(py - 6).toFixed(1)}" font-size="10.5" font-weight="bold" fill="${col}">${escXml(pt.label)}</text>`);
	}

	if (opts.curveLabel) {
		parts.push(`<rect x="${padL + 6}" y="${padT + 6}" width="72" height="18" rx="4" fill="rgba(255,255,255,0.9)" stroke="#93c5fd"/>`);
		parts.push(`<text x="${padL + 42}" y="${padT + 19}" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">${escXml(opts.curveLabel)}</text>`);
	}

	return wrapSecSvg(w, h, parts.join(''));
}

/** 2. Authentic Algerian Variation Table (جدول التغيرات) SVG */
export function svgVariationTable(opts: {
	xValues: string[];
	derivativeRow: Array<{ kind: 'sign'; value: '+' | '-' | '0' | '||' }>;
	variations: Array<{ value: string; position: 'top' | 'bottom' | 'mid' | 'forbidden' }>;
	fnName?: string;
	derivName?: string;
}): string {
	const col0 = 84;
	const nX = opts.xValues.length;
	const stepW = Math.max(54, Math.floor(320 / Math.max(1, nX - 1)));
	const w = col0 + (nX - 1) * stepW + 44;
	const rowH1 = 30;
	const rowH2 = 34;
	const rowH3 = 82;
	const h = rowH1 + rowH2 + rowH3 + 12;
	const fnName = opts.fnName || 'f(x)';
	const derivName = opts.derivName || "f'(x)";

	const parts: string[] = [];
	parts.push(`<rect x="4" y="4" width="${w - 8}" height="${h - 8}" fill="#ffffff" stroke="#0f172a" stroke-width="1.4"/>`);
	parts.push(`<line x1="${col0}" y1="4" x2="${col0}" y2="${h - 4}" stroke="#0f172a" stroke-width="1.4"/>`);
	parts.push(`<line x1="4" y1="${4 + rowH1}" x2="${w - 4}" y2="${4 + rowH1}" stroke="#0f172a" stroke-width="1.2"/>`);
	parts.push(`<line x1="4" y1="${4 + rowH1 + rowH2}" x2="${w - 4}" y2="${4 + rowH1 + rowH2}" stroke="#0f172a" stroke-width="1.2"/>`);

	parts.push(`<text x="${col0 / 2 + 2}" y="${4 + rowH1 / 2 + 4}" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">x</text>`);
	parts.push(`<text x="${col0 / 2 + 2}" y="${4 + rowH1 + rowH2 / 2 + 4}" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e3a8a">${escXml(derivName)}</text>`);
	parts.push(`<text x="${col0 / 2 + 2}" y="${4 + rowH1 + rowH2 + rowH3 / 2 + 4}" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">${escXml(fnName)}</text>`);

	const xPos = (i: number) => col0 + 22 + i * stepW;
	for (let i = 0; i < nX; i++) {
		parts.push(`<text x="${xPos(i)}" y="${4 + rowH1 / 2 + 4}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">${escXml(opts.xValues[i])}</text>`);
	}

	const derivMidY = 4 + rowH1 + rowH2 / 2 + 5;
	const hasBoundarySep = opts.derivativeRow.some((item) => item.value === '0' || item.value === '||');
	const startsAtBoundary = opts.derivativeRow[0]?.value === '0' || opts.derivativeRow[0]?.value === '||';
	const intervalOnly = !hasBoundarySep && opts.derivativeRow.length === nX - 1;

	for (let i = 0; i < opts.derivativeRow.length; i++) {
		const item = opts.derivativeRow[i];
		const slot = intervalOnly ? 2 * i + 1 : startsAtBoundary ? i : i + 1;
		const px = col0 + 22 + (slot * stepW) / 2;
		if (item.value === '||') {
			parts.push(`<line x1="${px - 2}" y1="${4 + rowH1}" x2="${px - 2}" y2="${h - 4}" stroke="#dc2626" stroke-width="1.3"/>`);
			parts.push(`<line x1="${px + 2}" y1="${4 + rowH1}" x2="${px + 2}" y2="${h - 4}" stroke="#dc2626" stroke-width="1.3"/>`);
		} else if (item.value === '0') {
			parts.push(`<text x="${px}" y="${derivMidY}" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">0</text>`);
		} else {
			const col = item.value === '+' ? '#15803d' : '#b91c1c';
			parts.push(`<text x="${px}" y="${derivMidY}" text-anchor="middle" font-size="14" font-weight="bold" fill="${col}">${item.value}</text>`);
		}
	}

	const topY = 4 + rowH1 + rowH2 + 18;
	const botY = 4 + rowH1 + rowH2 + rowH3 - 12;
	const midY = (topY + botY) / 2;
	const varY = (pos: 'top' | 'bottom' | 'mid' | 'forbidden') =>
		pos === 'top' ? topY : pos === 'bottom' ? botY : midY;

	const leadingDoubleBar = opts.derivativeRow[0]?.value === '||';
	for (let i = 0; i < opts.variations.length; i++) {
		const v = opts.variations[i];
		const textX = i === 0 && leadingDoubleBar ? xPos(i) + 18 : xPos(i);
		if (v.position !== 'forbidden') {
			parts.push(`<text x="${textX}" y="${varY(v.position)}" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${escXml(v.value)}</text>`);
		}
		if (i < opts.variations.length - 1) {
			const next = opts.variations[i + 1];
			if (v.position !== 'forbidden' && next.position !== 'forbidden') {
				const x1 = textX + 16;
				const y1 = varY(v.position) - 4;
				const x2 = xPos(i + 1) - 16;
				const y2 = varY(next.position) - 4;
				const ang = Math.atan2(y2 - y1, x2 - x1);
				const ah = 7;
				parts.push(`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#1d4ed8" stroke-width="1.8"/>`);
				parts.push(`<polygon points="${x2.toFixed(1)},${y2.toFixed(1)} ${(x2 - ah * Math.cos(ang - 0.45)).toFixed(1)},${(y2 - ah * Math.sin(ang - 0.45)).toFixed(1)} ${(x2 - ah * Math.cos(ang + 0.45)).toFixed(1)},${(y2 - ah * Math.sin(ang + 0.45)).toFixed(1)}" fill="#1d4ed8"/>`);
			}
		}
	}

	return wrapSecSvg(w, h, parts.join(''));
}

/** 3. Cobweb / staircase diagram for u_{n+1} = f(u_n) and y = x */
export function svgCobwebSequencePlot(opts: {
	xMin?: number;
	xMax?: number;
	yMin?: number;
	yMax?: number;
	fn: (x: number) => number;
	u0: number;
	steps?: number;
	fixedPoint?: number;
}): string {
	const w = 320;
	const h = 250;
	const padL = 32;
	const padR = 18;
	const padT = 18;
	const padB = 26;
	const xMin = opts.xMin ?? 0;
	const xMax = opts.xMax ?? 5;
	const yMin = opts.yMin ?? 0;
	const yMax = opts.yMax ?? 5;
	const plotW = w - padL - padR;
	const plotH = h - padT - padB;
	const toPxX = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * plotW;
	const toPxY = (y: number) => padT + ((yMax - y) / (yMax - yMin)) * plotH;

	const parts: string[] = [];
	parts.push(`<rect x="${padL}" y="${padT}" width="${plotW}" height="${plotH}" fill="#f8fafc" stroke="#cbd5e1"/>`);
	// y = x line
	const dMin = Math.max(xMin, yMin);
	const dMax = Math.min(xMax, yMax);
	parts.push(`<line x1="${toPxX(dMin).toFixed(1)}" y1="${toPxY(dMin).toFixed(1)}" x2="${toPxX(dMax).toFixed(1)}" y2="${toPxY(dMax).toFixed(1)}" stroke="#64748b" stroke-width="1.5" stroke-dasharray="5,4"/>`);

	// y = f(x)
	const curvePts: string[] = [];
	for (let i = 0; i <= 120; i++) {
		const x = xMin + ((xMax - xMin) * i) / 120;
		const y = opts.fn(x);
		if (Number.isFinite(y) && y >= yMin && y <= yMax) {
			curvePts.push(`${toPxX(x).toFixed(1)},${toPxY(y).toFixed(1)}`);
		}
	}
	if (curvePts.length >= 2) {
		parts.push(`<polyline points="${curvePts.join(' ')}" fill="none" stroke="#1d4ed8" stroke-width="2.2"/>`);
	}

	// Cobweb steps
	let u = opts.u0;
	const steps = opts.steps ?? 4;
	const webPts: string[] = [`${toPxX(u).toFixed(1)},${toPxY(yMin).toFixed(1)}`];
	parts.push(`<circle cx="${toPxX(u).toFixed(1)}" cy="${toPxY(yMin).toFixed(1)}" r="3.5" fill="#dc2626"/>`);
	parts.push(`<text x="${toPxX(u).toFixed(1)}" y="${(toPxY(yMin) + 14).toFixed(1)}" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">u0</text>`);
	for (let k = 0; k < steps; k++) {
		const v = opts.fn(u);
		if (!Number.isFinite(v)) break;
		webPts.push(`${toPxX(u).toFixed(1)},${toPxY(v).toFixed(1)}`);
		webPts.push(`${toPxX(v).toFixed(1)},${toPxY(v).toFixed(1)}`);
		if (k < 3) {
			parts.push(`<text x="${toPxX(v).toFixed(1)}" y="${(toPxY(yMin) + 14).toFixed(1)}" text-anchor="middle" font-size="10" font-weight="bold" fill="#0f172a">u${k + 1}</text>`);
			parts.push(`<line x1="${toPxX(v).toFixed(1)}" y1="${toPxY(v).toFixed(1)}" x2="${toPxX(v).toFixed(1)}" y2="${toPxY(yMin).toFixed(1)}" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2,2"/>`);
		}
		u = v;
	}
	parts.push(`<polyline points="${webPts.join(' ')}" fill="none" stroke="#dc2626" stroke-width="1.6"/>`);

	if (opts.fixedPoint !== undefined) {
		const fx = opts.fixedPoint;
		parts.push(`<circle cx="${toPxX(fx).toFixed(1)}" cy="${toPxY(fx).toFixed(1)}" r="4" fill="#15803d"/>`);
		parts.push(`<text x="${(toPxX(fx) + 6).toFixed(1)}" y="${(toPxY(fx) - 6).toFixed(1)}" font-size="10.5" font-weight="bold" fill="#15803d">L</text>`);
	}
	return wrapSecSvg(w, h, parts.join(''));
}

/** 4. Conditional Probability Weighted Tree (شجرة الاحتمالات) */
export function svgProbabilityTree(opts: {
	rootLabel?: string;
	firstLevel: Array<{
		label: string;
		probLabel: string;
		children?: Array<{ label: string; probLabel: string }>;
	}>;
}): string {
	const branches = opts.firstLevel;
	const leafCount = branches.reduce((s, b) => s + Math.max(1, b.children?.length ?? 1), 0);
	const w = 360;
	const h = Math.max(170, leafCount * 44 + 28);
	const x0 = 36;
	const x1 = 175;
	const x2 = 316;
	const y0 = h / 2;

	const parts: string[] = [];
	parts.push(`<circle cx="${x0}" cy="${y0}" r="5" fill="#1e3a8a"/>`);
	if (opts.rootLabel) {
		parts.push(`<text x="${x0 - 14}" y="${y0 + 4}" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${escXml(opts.rootLabel)}</text>`);
	}

	let cursorY = 28;
	const rowGap = (h - 56) / Math.max(1, leafCount - 1);
	for (const b1 of branches) {
		const ch = b1.children && b1.children.length > 0 ? b1.children : [{ label: '', probLabel: '' }];
		const startY = cursorY;
		const endY = cursorY + (ch.length - 1) * rowGap;
		const y1 = (startY + endY) / 2;

		parts.push(`<line x1="${x0}" y1="${y0}" x2="${x1 - 16}" y2="${y1}" stroke="#334155" stroke-width="1.6"/>`);
		parts.push(`<rect x="${((x0 + x1 - 16) / 2 - 20).toFixed(1)}" y="${((y0 + y1) / 2 - 14).toFixed(1)}" width="40" height="15" rx="3" fill="#eff6ff"/>`);
		parts.push(`<text x="${((x0 + x1 - 16) / 2).toFixed(1)}" y="${((y0 + y1) / 2 - 3).toFixed(1)}" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">${escXml(b1.probLabel)}</text>`);
		parts.push(`<circle cx="${x1}" cy="${y1}" r="13" fill="#ffffff" stroke="#1e3a8a" stroke-width="1.5"/>`);
		parts.push(`<text x="${x1}" y="${y1 + 4}" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${escXml(b1.label)}</text>`);

		for (const leaf of ch) {
			if (leaf.label) {
				parts.push(`<line x1="${x1 + 13}" y1="${y1}" x2="${x2 - 14}" y2="${cursorY}" stroke="#475569" stroke-width="1.4"/>`);
				parts.push(`<rect x="${((x1 + 13 + x2 - 14) / 2 - 20).toFixed(1)}" y="${((y1 + cursorY) / 2 - 14).toFixed(1)}" width="40" height="15" rx="3" fill="#f0fdf4"/>`);
				parts.push(`<text x="${((x1 + 13 + x2 - 14) / 2).toFixed(1)}" y="${((y1 + cursorY) / 2 - 3).toFixed(1)}" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">${escXml(leaf.probLabel)}</text>`);
				parts.push(`<circle cx="${x2}" cy="${cursorY}" r="13" fill="#ffffff" stroke="#0f766e" stroke-width="1.4"/>`);
				parts.push(`<text x="${x2}" y="${cursorY + 4}" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${escXml(leaf.label)}</text>`);
			}
			cursorY += rowGap;
		}
	}

	return wrapSecSvg(w, h, parts.join(''));
}

/** 5. Trigonometric Unit Circle (الدائرة المثلثية) */
export function svgTrigonometricCircle(opts: {
	anglesRad?: Array<{ rad: number; label: string; color?: string }>;
}): string {
	const w = 230;
	const h = 230;
	const cx = 115;
	const cy = 115;
	const r = 78;
	const parts: string[] = [];

	parts.push(`<line x1="16" y1="${cy}" x2="${w - 16}" y2="${cy}" stroke="#475569" stroke-width="1.2"/>`);
	parts.push(`<line x1="${cx}" y1="${h - 16}" x2="${cx}" y2="16" stroke="#475569" stroke-width="1.2"/>`);
	parts.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="rgba(59,130,246,0.05)" stroke="#1d4ed8" stroke-width="2"/>`);
	parts.push(`<text x="${cx + r + 8}" y="${cy + 4}" font-size="10.5" font-weight="bold" fill="#0f172a">1</text>`);
	parts.push(`<text x="${cx + 4}" y="${cy - r - 6}" font-size="10.5" font-weight="bold" fill="#0f172a">1</text>`);

	for (const a of opts.anglesRad || [{ rad: Math.PI / 4, label: 'pi/4' }]) {
		const col = a.color || '#dc2626';
		const px = cx + r * Math.cos(a.rad);
		const py = cy - r * Math.sin(a.rad);
		parts.push(`<line x1="${cx}" y1="${cy}" x2="${px.toFixed(1)}" y2="${py.toFixed(1)}" stroke="${col}" stroke-width="1.8"/>`);
		parts.push(`<line x1="${px.toFixed(1)}" y1="${py.toFixed(1)}" x2="${px.toFixed(1)}" y2="${cy}" stroke="${col}" stroke-width="1" stroke-dasharray="3,3"/>`);
		parts.push(`<line x1="${px.toFixed(1)}" y1="${py.toFixed(1)}" x2="${cx}" y2="${py.toFixed(1)}" stroke="${col}" stroke-width="1" stroke-dasharray="3,3"/>`);
		parts.push(`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="4" fill="${col}"/>`);
		const lx = cx + (r + 18) * Math.cos(a.rad);
		const ly = cy - (r + 16) * Math.sin(a.rad);
		parts.push(`<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" font-size="10" font-weight="bold" fill="${col}">${escXml(a.label)}</text>`);
	}

	return wrapSecSvg(w, h, parts.join(''));
}

/** 6. Orthonormal Complex Plane (المستوي المركب) */
export function svgComplexPlane(opts: {
	points: Array<{ re: number; im: number; label: string; color?: string }>;
	segments?: Array<{ from: [number, number]; to: [number, number]; color?: string }>;
	circles?: Array<{ cx: number; cy: number; r: number; color?: string }>;
	range?: number;
}): string {
	const range = opts.range ?? 4;
	const w = 260;
	const h = 240;
	const pad = 26;
	const plotW = w - 2 * pad;
	const plotH = h - 2 * pad;
	const toPxX = (x: number) => pad + ((x + range) / (2 * range)) * plotW;
	const toPxY = (y: number) => pad + ((range - y) / (2 * range)) * plotH;

	const parts: string[] = [];
	parts.push(`<rect x="${pad}" y="${pad}" width="${plotW}" height="${plotH}" fill="#f8fafc" stroke="#cbd5e1"/>`);
	for (let k = -range; k <= range; k++) {
		parts.push(`<line x1="${toPxX(k).toFixed(1)}" y1="${pad}" x2="${toPxX(k).toFixed(1)}" y2="${pad + plotH}" stroke="#e2e8f0" stroke-width="1"/>`);
		parts.push(`<line x1="${pad}" y1="${toPxY(k).toFixed(1)}" x2="${pad + plotW}" y2="${toPxY(k).toFixed(1)}" stroke="#e2e8f0" stroke-width="1"/>`);
	}
	parts.push(`<line x1="${pad}" y1="${toPxY(0).toFixed(1)}" x2="${pad + plotW}" y2="${toPxY(0).toFixed(1)}" stroke="#0f172a" stroke-width="1.5"/>`);
	parts.push(`<line x1="${toPxX(0).toFixed(1)}" y1="${pad}" x2="${toPxX(0).toFixed(1)}" y2="${pad + plotH}" stroke="#0f172a" stroke-width="1.5"/>`);
	parts.push(`<text x="${toPxX(range) - 6}" y="${toPxY(0) - 6}" text-anchor="end" font-size="10" font-weight="bold" fill="#0f172a">Re(z)</text>`);
	parts.push(`<text x="${toPxX(0) + 6}" y="${toPxY(range) + 12}" font-size="10" font-weight="bold" fill="#0f172a">Im(z)</text>`);

	for (const c of opts.circles || []) {
		const rx = (c.r / (2 * range)) * plotW;
		parts.push(`<circle cx="${toPxX(c.cx).toFixed(1)}" cy="${toPxY(c.cy).toFixed(1)}" r="${rx.toFixed(1)}" fill="none" stroke="${c.color || '#2563eb'}" stroke-width="1.5" stroke-dasharray="4,3"/>`);
	}
	for (const s of opts.segments || []) {
		parts.push(`<line x1="${toPxX(s.from[0]).toFixed(1)}" y1="${toPxY(s.from[1]).toFixed(1)}" x2="${toPxX(s.to[0]).toFixed(1)}" y2="${toPxY(s.to[1]).toFixed(1)}" stroke="${s.color || '#0f766e'}" stroke-width="1.8"/>`);
	}
	for (const pt of opts.points) {
		const px = toPxX(pt.re);
		const py = toPxY(pt.im);
		const col = pt.color || '#dc2626';
		parts.push(`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="4.2" fill="${col}"/>`);
		parts.push(`<text x="${(px + 6).toFixed(1)}" y="${(py - 5).toFixed(1)}" font-size="10.5" font-weight="bold" fill="${col}">${escXml(pt.label)}</text>`);
	}
	return wrapSecSvg(w, h, parts.join(''));
}

/** 7. Isometric 3D Space Geometry Sketch (الهندسة الفضائية) */
export function svgSpace3DScene(opts: {
	points?: Array<{ x: number; y: number; z: number; label: string; color?: string }>;
	showPlanePatch?: boolean;
	planeLabel?: string;
	normalVector?: { x: number; y: number; z: number; label?: string };
}): string {
	const w = 260;
	const h = 230;
	const ox = 110;
	const oy = 148;
	const scale = 24;
	const proj = (x: number, y: number, z: number): [number, number] => [
		ox + (-x * 0.72 + y * 0.95) * scale,
		oy + (x * 0.42 - z * 0.92 + y * 0.14) * scale
	];

	const parts: string[] = [];
	const [xx, xy] = proj(4, 0, 0);
	const [yx, yy] = proj(0, 4, 0);
	const [zx, zy] = proj(0, 0, 4);

	parts.push(`<line x1="${ox}" y1="${oy}" x2="${xx.toFixed(1)}" y2="${xy.toFixed(1)}" stroke="#475569" stroke-width="1.4"/>`);
	parts.push(`<line x1="${ox}" y1="${oy}" x2="${yx.toFixed(1)}" y2="${yy.toFixed(1)}" stroke="#475569" stroke-width="1.4"/>`);
	parts.push(`<line x1="${ox}" y1="${oy}" x2="${zx.toFixed(1)}" y2="${zy.toFixed(1)}" stroke="#475569" stroke-width="1.4"/>`);
	parts.push(`<text x="${(xx - 8).toFixed(1)}" y="${(xy + 12).toFixed(1)}" font-size="10" font-weight="bold" fill="#0f172a">x</text>`);
	parts.push(`<text x="${(yx + 6).toFixed(1)}" y="${(yy + 4).toFixed(1)}" font-size="10" font-weight="bold" fill="#0f172a">y</text>`);
	parts.push(`<text x="${(zx + 6).toFixed(1)}" y="${(zy + 4).toFixed(1)}" font-size="10" font-weight="bold" fill="#0f172a">z</text>`);

	if (opts.showPlanePatch) {
		const p1 = proj(2.8, 0.2, 0.4);
		const p2 = proj(0.2, 3.2, 0.4);
		const p3 = proj(0.2, 3.2, 2.2);
		const p4 = proj(2.8, 0.2, 2.2);
		parts.push(`<polygon points="${p1.join(',')} ${p2.join(',')} ${p3.join(',')} ${p4.join(',')}" fill="rgba(59,130,246,0.16)" stroke="#2563eb" stroke-width="1.5"/>`);
		if (opts.planeLabel) {
			parts.push(`<text x="${p4[0].toFixed(1)}" y="${(p4[1] - 6).toFixed(1)}" font-size="10.5" font-weight="bold" fill="#1d4ed8">${escXml(opts.planeLabel)}</text>`);
		}
	}

	if (opts.normalVector) {
		const base = proj(1.4, 1.4, 1.2);
		const tip = proj(1.4 + opts.normalVector.x, 1.4 + opts.normalVector.y, 1.2 + opts.normalVector.z);
		parts.push(`<line x1="${base[0].toFixed(1)}" y1="${base[1].toFixed(1)}" x2="${tip[0].toFixed(1)}" y2="${tip[1].toFixed(1)}" stroke="#15803d" stroke-width="2.2"/>`);
		parts.push(`<circle cx="${tip[0].toFixed(1)}" cy="${tip[1].toFixed(1)}" r="3.5" fill="#15803d"/>`);
		if (opts.normalVector.label) {
			parts.push(`<text x="${(tip[0] + 6).toFixed(1)}" y="${(tip[1] - 4).toFixed(1)}" font-size="10.5" font-weight="bold" fill="#15803d">${escXml(opts.normalVector.label)}</text>`);
		}
	}

	for (const pt of opts.points || []) {
		const [px, py] = proj(pt.x, pt.y, pt.z);
		const col = pt.color || '#dc2626';
		parts.push(`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="4" fill="${col}"/>`);
		parts.push(`<text x="${(px + 6).toFixed(1)}" y="${(py - 5).toFixed(1)}" font-size="10.5" font-weight="bold" fill="${col}">${escXml(pt.label)}</text>`);
	}

	return wrapSecSvg(w, h, parts.join(''));
}
