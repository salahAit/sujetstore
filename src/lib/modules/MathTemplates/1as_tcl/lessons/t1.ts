import type { InteractiveLessonData } from '../../types';

// ===========================================================================
// SVG Visual Helpers for 1AS TCL — Trimester 1
// ===========================================================================

const SVG_FONT = 'Cairo,Arial,sans-serif';

function svgWrap(w: number, h: number, body: string): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:${SVG_FONT}">${body}</svg>`;
}

const f1 = (n: number): string => n.toFixed(1);

/** Diagram showing prime factorization of 180 and 126 with PGCD & PPCM Venn overlap. */
function svgPrimeVennDiagram(): string {
	const parts: string[] = [];
	parts.push(`<rect x="8" y="8" width="364" height="204" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>`);
	parts.push(`<text x="190" y="30" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">العوامل الأولية المشتركة لـ 180 و 126</text>`);
	// Left ellipse: 180 = 2^2 * 3^2 * 5
	parts.push(`<ellipse cx="145" cy="118" rx="102" ry="64" fill="rgba(37,99,235,0.12)" stroke="#2563eb" stroke-width="2"/>`);
	// Right ellipse: 126 = 2 * 3^2 * 7
	parts.push(`<ellipse cx="235" cy="118" rx="102" ry="64" fill="rgba(22,163,74,0.12)" stroke="#16a34a" stroke-width="2"/>`);

	parts.push(`<text x="100" y="72" text-anchor="middle" font-size="12" font-weight="bold" fill="#1d4ed8">180</text>`);
	parts.push(`<text x="280" y="72" text-anchor="middle" font-size="12" font-weight="bold" fill="#15803d">126</text>`);

	// Left-only factors: 2, 5
	parts.push(`<text x="86" y="114" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">2 , 5</text>`);
	parts.push(`<text x="86" y="134" text-anchor="middle" font-size="10" fill="#475569">(خاصة بـ 180)</text>`);

	// Overlap (PGCD): 2, 3, 3
	parts.push(`<text x="190" y="106" text-anchor="middle" font-size="13" font-weight="bold" fill="#b91c1c">2 × 3 × 3</text>`);
	parts.push(`<text x="190" y="126" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">PGCD = 18</text>`);

	// Right-only factor: 7
	parts.push(`<text x="294" y="114" text-anchor="middle" font-size="13" font-weight="bold" fill="#166534">7</text>`);
	parts.push(`<text x="294" y="134" text-anchor="middle" font-size="10" fill="#475569">(خاص بـ 126)</text>`);

	parts.push(`<text x="190" y="198" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#334155">180 = 2² × 3² × 5   |   126 = 2 × 3² × 7   |   PPCM = 1260</text>`);
	return svgWrap(380, 220, parts.join(''));
}

/** Nested number sets N ⊂ Z ⊂ D ⊂ Q ⊂ R with simple witness numbers. */
function svgNumberSetsSimple(): string {
	const cx = 190;
	const cy = 112;
	const rings: Array<{ rx: number; ry: number; fill: string; stroke: string; letter: string; sample: string }> = [
		{ rx: 174, ry: 98, fill: '#fef2f2', stroke: '#dc2626', letter: 'R', sample: '√2' },
		{ rx: 138, ry: 78, fill: '#fff7ed', stroke: '#ea580c', letter: 'Q', sample: '2/3' },
		{ rx: 104, ry: 58, fill: '#fefce8', stroke: '#ca8a04', letter: 'D', sample: '1.5' },
		{ rx: 70, ry: 38, fill: '#f0fdf4', stroke: '#16a34a', letter: 'Z', sample: '-4' },
		{ rx: 38, ry: 19, fill: '#eff6ff', stroke: '#2563eb', letter: 'N', sample: '7' }
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
			parts.push(`<text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="13" font-weight="bold" fill="${r.stroke}">${r.letter}</text>`);
			parts.push(`<text x="${cx}" y="${cy + 13}" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${r.sample}</text>`);
		} else {
			parts.push(`<text x="${f1(cx - mid)}" y="${cy + 5}" text-anchor="middle" font-size="13" font-weight="bold" fill="${r.stroke}">${r.letter}</text>`);
			parts.push(`<text x="${f1(cx + mid)}" y="${cy + 5}" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${r.sample}</text>`);
		}
	}
	return svgWrap(380, 224, parts.join(''));
}

/** Powers of 10 scale for scientific notation and order of magnitude. */
function svgPowersScale(): string {
	const x0 = 42;
	const step = 44;
	const y = 104;
	const px = (e: number) => x0 + (e + 3) * step;
	const parts: string[] = [];
	parts.push(`<text x="190" y="22" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">سلم قوى العدد 10 والكتابة العلمية</text>`);
	parts.push(`<line x1="24" y1="${y}" x2="358" y2="${y}" stroke="#0f172a" stroke-width="2"/>`);
	parts.push(`<polygon points="366,${y} 357,${y - 4} 357,${y + 4}" fill="#0f172a"/>`);
	for (let e = -3; e <= 4; e++) {
		parts.push(`<line x1="${px(e)}" y1="${y - 6}" x2="${px(e)}" y2="${y + 6}" stroke="#0f172a" stroke-width="1.6"/>`);
		parts.push(`<text x="${px(e) - 2}" y="${y + 24}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">10<tspan dy="-6" font-size="8.5">${e}</tspan></text>`);
	}
	const marks: Array<{ v: number; label: string; color: string }> = [
		{ v: 0.0036, label: '3.6×10^-3', color: '#2563eb' },
		{ v: 2.4, label: '2.4×10^0', color: '#16a34a' },
		{ v: 7200, label: '7.2×10^3', color: '#dc2626' }
	];
	for (const m of marks) {
		const x = px(Math.log10(m.v));
		parts.push(`<line x1="${f1(x)}" y1="${y}" x2="${f1(x)}" y2="${y - 42}" stroke="${m.color}" stroke-width="1.6" stroke-dasharray="3,3"/>`);
		parts.push(`<circle cx="${f1(x)}" cy="${y}" r="4.5" fill="${m.color}"/>`);
		parts.push(`<text x="${f1(x)}" y="${y - 48}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${m.color}">${m.label}</text>`);
	}
	return svgWrap(380, 150, parts.join(''));
}

/** Diagram illustrating order of magnitude cutoff at a = 5. */
function svgOrderOfMagnitudeRule(): string {
	const parts: string[] = [];
	parts.push(`<rect x="10" y="10" width="360" height="145" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>`);
	parts.push(`<text x="190" y="34" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#1e293b">تحديد رتبة مقدار عدد مكتوب علمياً: a × 10ⁿ</text>`);
	parts.push(`<rect x="28" y="52" width="152" height="80" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>`);
	parts.push(`<text x="104" y="76" text-anchor="middle" font-size="12" font-weight="bold" fill="#1d4ed8">إذا كان a &lt; 5</text>`);
	parts.push(`<text x="104" y="98" text-anchor="middle" font-size="12" fill="#0f172a">رتبة المقدار: 10ⁿ</text>`);
	parts.push(`<text x="104" y="118" text-anchor="middle" font-size="10.5" fill="#475569">مثال: 3.4×10⁵ ⟶ 10⁵</text>`);

	parts.push(`<rect x="200" y="52" width="152" height="80" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="1.5"/>`);
	parts.push(`<text x="276" y="76" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">إذا كان a ≥ 5</text>`);
	parts.push(`<text x="276" y="98" text-anchor="middle" font-size="12" fill="#0f172a">رتبة المقدار: 10ⁿ⁺¹</text>`);
	parts.push(`<text x="276" y="118" text-anchor="middle" font-size="10.5" fill="#475569">مثال: 7.8×10⁵ ⟶ 10⁶</text>`);
	return svgWrap(380, 165, parts.join(''));
}

/** Visual comparison of squares of area 2, 9, and 18 showing sqrt(18) = 3*sqrt(2). */
function svgSquareRootAreas(): string {
	const parts: string[] = [];
	parts.push(`<text x="190" y="22" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">المعنى الهندسي للجذر التربيعي وتبسيط √18</text>`);
	// Small square area 2
	parts.push(`<rect x="26" y="64" width="52" height="52" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>`);
	parts.push(`<text x="52" y="94" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">S = 2</text>`);
	parts.push(`<text x="52" y="134" text-anchor="middle" font-size="11" font-weight="bold" fill="#2563eb">الضلع √2</text>`);

	// Medium square area 9
	parts.push(`<rect x="122" y="52" width="76" height="76" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>`);
	parts.push(`<text x="160" y="94" text-anchor="middle" font-size="12" font-weight="bold" fill="#166534">S = 9</text>`);
	parts.push(`<text x="160" y="146" text-anchor="middle" font-size="11" font-weight="bold" fill="#16a34a">الضلع √9 = 3</text>`);

	// Large square area 18 (3x3 grid of area-2 squares conceptually)
	parts.push(`<rect x="240" y="40" width="102" height="102" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>`);
	for (let k = 1; k <= 2; k++) {
		parts.push(`<line x1="${240 + k * 34}" y1="40" x2="${240 + k * 34}" y2="142" stroke="#f59e0b" stroke-width="1" stroke-dasharray="3,2"/>`);
		parts.push(`<line x1="240" y1="${40 + k * 34}" x2="342" y2="${40 + k * 34}" stroke="#f59e0b" stroke-width="1" stroke-dasharray="3,2"/>`);
	}
	parts.push(`<text x="291" y="95" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e">S = 18 = 9×2</text>`);
	parts.push(`<text x="291" y="160" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#b45309">الضلع √18 = 3√2</text>`);
	return svgWrap(380, 176, parts.join(''));
}

/** Geometric construction of sqrt(2) on the number line via unit square diagonal. */
function svgSqrt2Geometric(): string {
	const x0 = 54;
	const u = 76;
	const y = 158;
	const d = u * Math.SQRT2;
	const parts: string[] = [];
	parts.push(`<line x1="28" y1="${y}" x2="348" y2="${y}" stroke="#0f172a" stroke-width="1.8"/>`);
	parts.push(`<polygon points="354,${y} 345,${y - 4} 345,${y + 4}" fill="#0f172a"/>`);
	for (let k = 0; k <= 3; k++) {
		const px = x0 + k * u;
		parts.push(`<line x1="${px}" y1="${y - 5}" x2="${px}" y2="${y + 5}" stroke="#0f172a" stroke-width="1.5"/>`);
		parts.push(`<text x="${px}" y="${y + 20}" text-anchor="middle" font-size="11.5" fill="#0f172a">${k}</text>`);
	}
	parts.push(`<polygon points="${x0},${y} ${x0 + u},${y} ${x0 + u},${y - u} ${x0},${y - u}" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/>`);
	parts.push(`<line x1="${x0}" y1="${y}" x2="${x0 + u}" y2="${y - u}" stroke="#dc2626" stroke-width="2.2"/>`);
	parts.push(`<path d="M ${x0 + u} ${y - u} A ${f1(d)} ${f1(d)} 0 0 1 ${f1(x0 + d)} ${y}" fill="none" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="5,4"/>`);
	parts.push(`<circle cx="${f1(x0 + d)}" cy="${y}" r="4.5" fill="#dc2626"/>`);
	parts.push(`<text x="${f1(x0 + d)}" y="${y - 12}" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">√2 ≈ 1.41</text>`);
	parts.push(`<text x="${x0 + u / 2}" y="${y - u / 2 + 12}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1d4ed8">1</text>`);
	parts.push(`<text x="195" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">إنشاء √2 بقطر مربع طول ضلعه 1</text>`);
	return svgWrap(380, 192, parts.join(''));
}

type IntervalSeg = { from: number | null; to: number | null; closedFrom?: boolean; closedTo?: boolean };

function svgIntervalRows(opts: {
	min: number;
	max: number;
	rows: Array<{ label: string; color: string; segs: IntervalSeg[] }>;
}): string {
	const left = 78;
	const right = 352;
	const top = 16;
	const rowH = 32;
	const px = (v: number) => left + ((v - opts.min) / (opts.max - opts.min)) * (right - left);
	const axisY = top + opts.rows.length * rowH + 8;
	const h = axisY + 32;
	const parts: string[] = [];
	for (let v = Math.ceil(opts.min); v <= Math.floor(opts.max); v++) {
		parts.push(`<line x1="${f1(px(v))}" y1="${top - 4}" x2="${f1(px(v))}" y2="${axisY}" stroke="#e2e8f0" stroke-width="1"/>`);
		parts.push(`<line x1="${f1(px(v))}" y1="${axisY - 5}" x2="${f1(px(v))}" y2="${axisY + 5}" stroke="#0f172a" stroke-width="1.5"/>`);
		parts.push(`<text x="${f1(px(v))}" y="${axisY + 19}" text-anchor="middle" font-size="10.5" fill="#0f172a">${v}</text>`);
	}
	parts.push(`<line x1="${left - 12}" y1="${axisY}" x2="${right + 12}" y2="${axisY}" stroke="#0f172a" stroke-width="1.8"/>`);
	parts.push(`<polygon points="${right + 18},${axisY} ${right + 9},${axisY - 4} ${right + 9},${axisY + 4}" fill="#0f172a"/>`);
	opts.rows.forEach((row, i) => {
		const ry = top + i * rowH + rowH / 2;
		parts.push(`<text x="10" y="${ry + 4}" font-size="11.5" font-weight="bold" fill="${row.color}">${row.label}</text>`);
		for (const seg of row.segs) {
			const xa = seg.from === null ? left - 12 : px(seg.from);
			const xb = seg.to === null ? right + 12 : px(seg.to);
			parts.push(`<line x1="${f1(xa)}" y1="${ry}" x2="${f1(xb)}" y2="${ry}" stroke="${row.color}" stroke-width="5" stroke-opacity="0.78"/>`);
			if (seg.from === null) parts.push(`<polygon points="${f1(xa - 6)},${ry} ${f1(xa + 3)},${ry - 5} ${f1(xa + 3)},${ry + 5}" fill="${row.color}"/>`);
			else parts.push(`<circle cx="${f1(xa)}" cy="${ry}" r="4.8" fill="${seg.closedFrom ? row.color : '#ffffff'}" stroke="${row.color}" stroke-width="2"/>`);
			if (seg.to === null) parts.push(`<polygon points="${f1(xb + 6)},${ry} ${f1(xb - 3)},${ry - 5} ${f1(xb - 3)},${ry + 5}" fill="${row.color}"/>`);
			else parts.push(`<circle cx="${f1(xb)}" cy="${ry}" r="4.8" fill="${seg.closedTo ? row.color : '#ffffff'}" stroke="${row.color}" stroke-width="2"/>`);
		}
	});
	return svgWrap(380, h, parts.join(''));
}

/** Framing diagram for 2x + 1 on [1, 4]. */
function svgLinearFramingMap(): string {
	const yTop = 58;
	const yBot = 148;
	const pTop = (v: number) => 46 + v * 58;
	const pBot = (v: number) => 46 + v * 28;
	const parts: string[] = [];
	parts.push(`<text x="190" y="20" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">حصر عبارة: 1 ≤ x ≤ 4  ⟹  3 ≤ 2x + 1 ≤ 9</text>`);
	parts.push(`<line x1="28" y1="${yTop}" x2="346" y2="${yTop}" stroke="#0f172a" stroke-width="1.6"/>`);
	for (let v = 0; v <= 5; v++) {
		parts.push(`<line x1="${pTop(v)}" y1="${yTop - 5}" x2="${pTop(v)}" y2="${yTop + 5}" stroke="#0f172a" stroke-width="1.3"/>`);
		parts.push(`<text x="${pTop(v)}" y="${yTop - 10}" text-anchor="middle" font-size="10" fill="#475569">${v}</text>`);
	}
	parts.push(`<line x1="${pTop(1)}" y1="${yTop}" x2="${pTop(4)}" y2="${yTop}" stroke="#2563eb" stroke-width="6.5" stroke-opacity="0.8"/>`);
	parts.push(`<circle cx="${pTop(1)}" cy="${yTop}" r="4.8" fill="#2563eb"/><circle cx="${pTop(4)}" cy="${yTop}" r="4.8" fill="#2563eb"/>`);
	parts.push(`<text x="354" y="${yTop + 4}" font-size="11.5" font-weight="bold" fill="#2563eb">x</text>`);

	parts.push(`<line x1="28" y1="${yBot}" x2="346" y2="${yBot}" stroke="#0f172a" stroke-width="1.6"/>`);
	for (let v = 0; v <= 10; v += 2) {
		parts.push(`<line x1="${pBot(v)}" y1="${yBot - 5}" x2="${pBot(v)}" y2="${yBot + 5}" stroke="#0f172a" stroke-width="1.3"/>`);
		parts.push(`<text x="${pBot(v)}" y="${yBot + 19}" text-anchor="middle" font-size="10" fill="#475569">${v}</text>`);
	}
	parts.push(`<line x1="${pBot(3)}" y1="${yBot}" x2="${pBot(9)}" y2="${yBot}" stroke="#dc2626" stroke-width="6.5" stroke-opacity="0.8"/>`);
	parts.push(`<circle cx="${pBot(3)}" cy="${yBot}" r="4.8" fill="#dc2626"/><circle cx="${pBot(9)}" cy="${yBot}" r="4.8" fill="#dc2626"/>`);
	parts.push(`<text x="354" y="${yBot + 4}" font-size="11.5" font-weight="bold" fill="#dc2626">y</text>`);

	parts.push(`<line x1="${pTop(1)}" y1="${yTop + 6}" x2="${pBot(3)}" y2="${yBot - 6}" stroke="#7c3aed" stroke-width="1.5" stroke-dasharray="4,3"/>`);
	parts.push(`<line x1="${pTop(4)}" y1="${yTop + 6}" x2="${pBot(9)}" y2="${yBot - 6}" stroke="#7c3aed" stroke-width="1.5" stroke-dasharray="4,3"/>`);
	parts.push(`<text x="${pTop(1) - 6}" y="${yTop + 46}" text-anchor="end" font-size="10.5" font-weight="bold" fill="#7c3aed">x=1 ⟶ 3</text>`);
	parts.push(`<text x="${pTop(4) + 12}" y="${yTop + 46}" font-size="10.5" font-weight="bold" fill="#7c3aed">x=4 ⟶ 9</text>`);
	return svgWrap(380, 182, parts.join(''));
}

/** Number line for |x - 3| <= 2 showing center a=3, radius r=2, interval [1, 5]. */
function svgAbsValueDistanceLine(): string {
	const y = 96;
	const px = (v: number) => 42 + (v / 6) * 296;
	const parts: string[] = [];
	parts.push(`<text x="190" y="22" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">|x - 3| ≤ 2   ⟺   1 ≤ x ≤ 5   ⟺   x ∈ [1 ; 5]</text>`);
	parts.push(`<line x1="26" y1="${y}" x2="354" y2="${y}" stroke="#0f172a" stroke-width="1.8"/>`);
	parts.push(`<polygon points="362,${y} 353,${y - 4} 353,${y + 4}" fill="#0f172a"/>`);
	for (let v = 0; v <= 6; v++) {
		parts.push(`<line x1="${f1(px(v))}" y1="${y - 5}" x2="${f1(px(v))}" y2="${y + 5}" stroke="#0f172a" stroke-width="1.5"/>`);
		parts.push(`<text x="${f1(px(v))}" y="${y + 22}" text-anchor="middle" font-size="11" fill="#0f172a">${v}</text>`);
	}
	parts.push(`<line x1="${f1(px(1))}" y1="${y}" x2="${f1(px(5))}" y2="${y}" stroke="#2563eb" stroke-width="6.5" stroke-opacity="0.8"/>`);
	parts.push(`<circle cx="${f1(px(1))}" cy="${y}" r="5" fill="#2563eb"/>`);
	parts.push(`<circle cx="${f1(px(5))}" cy="${y}" r="5" fill="#2563eb"/>`);
	parts.push(`<circle cx="${f1(px(3))}" cy="${y}" r="4.5" fill="#dc2626"/>`);
	parts.push(`<text x="${f1(px(3))}" y="${y - 36}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#dc2626">المركز a = 3</text>`);
	parts.push(`<line x1="${f1(px(3))}" y1="${y - 30}" x2="${f1(px(3))}" y2="${y - 8}" stroke="#dc2626" stroke-width="1.4"/>`);
	parts.push(`<line x1="${f1(px(1))}" y1="${y - 16}" x2="${f1(px(3))}" y2="${y - 16}" stroke="#16a34a" stroke-width="1.8"/>`);
	parts.push(`<line x1="${f1(px(3))}" y1="${y - 16}" x2="${f1(px(5))}" y2="${y - 16}" stroke="#16a34a" stroke-width="1.8"/>`);
	parts.push(`<text x="${f1(px(2))}" y="${y - 22}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#16a34a">r = 2</text>`);
	parts.push(`<text x="${f1(px(4))}" y="${y - 22}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#16a34a">r = 2</text>`);
	parts.push(`<text x="190" y="144" text-anchor="middle" font-size="11" fill="#475569">الحلول |x - 3| = 2 هما الطرفان x = 1 و x = 5</text>`);
	return svgWrap(380, 158, parts.join(''));
}

/** Four equivalent views of a symmetric neighborhood around a. */
function svgAbsFourRepresentations(): string {
	const parts: string[] = [];
	parts.push(`<rect x="8" y="8" width="364" height="162" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>`);
	parts.push(`<text x="190" y="30" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">الانتقال بين الصيغ الأربع المتكافئة (r &gt; 0)</text>`);
	const boxes = [
		{ x: 20, y: 44, t: 'المجال', v: 'x ∈ [a - r ; a + r]', c: '#2563eb', bg: '#eff6ff' },
		{ x: 200, y: 44, t: 'الحصر', v: 'a - r ≤ x ≤ a + r', c: '#16a34a', bg: '#f0fdf4' },
		{ x: 20, y: 106, t: 'المسافة', v: 'd(x , a) ≤ r', c: '#d97706', bg: '#fefce8' },
		{ x: 200, y: 106, t: 'القيمة المطلقة', v: '|x - a| ≤ r', c: '#dc2626', bg: '#fef2f2' }
	];
	for (const b of boxes) {
		parts.push(`<rect x="${b.x}" y="${b.y}" width="160" height="48" rx="6" fill="${b.bg}" stroke="${b.c}" stroke-width="1.5"/>`);
		parts.push(`<text x="${b.x + 80}" y="${b.y + 18}" text-anchor="middle" font-size="11" font-weight="bold" fill="${b.c}">${b.t}</text>`);
		parts.push(`<text x="${b.x + 80}" y="${b.y + 37}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">${b.v}</text>`);
	}
	return svgWrap(380, 178, parts.join(''));
}

// ===========================================================================
// 1AS TCL — TRIMESTER 1 INTERACTIVE LESSONS (5 LESSONS)
// ===========================================================================

export const LESSONS_1AS_TCL_T1: InteractiveLessonData[] = [
	// -------------------------------------------------------------------------
	// LESSON 1: Divisors, Multiples, Prime Factorization, PGCD & PPCM
	// -------------------------------------------------------------------------
	{
		id: 'lesson_1as_tcl_t1_divisors_multiples_primes_pgcd_ppcm',
		slug: '1as-tcl-t1-divisors-multiples-primes-pgcd-ppcm',
		grade: '1as_tcl',
		yearSubjectId: 664,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: الأعداد والحساب',
		order: 1,
		titleAr: 'القواسم والمضاعفات وتحليل عدد طبيعي إلى جداء عوامل أولية و PGCD / PPCM',
		objectives: [
			'تحديد قواسم ومضاعفات عدد طبيعي والتمييز بين الأعداد الأولية وغير الأولية باستعمال قواعد قابلية القسمة',
			'تحليل عدد طبيعي إلى جداء عوامل أولية وتوظيفه لحساب القاسم المشترك الأكبر PGCD والمضاعف المشترك الأصغر PPCM',
			'اختزال الكسور إلى شكل غير قابل للاختزال وحل مشكلات توزيع وتقسيم متساوٍ من الحياة اليومية'
		],
		keywordsAr: [
			'القواسم والمضاعفات',
			'العدد الأولي',
			'التحليل إلى عوامل أولية',
			'القاسم المشترك الأكبر PGCD',
			'المضاعف المشترك الأصغر PPCM',
			'اختزال الكسور'
		],
		discover: {
			scenarioAr:
				'تملك مكتبة ثانوية $180$ كتاباً في الأدب العربي و $126$ قاموساً لغوياً، ويريد أمين المكتبة توزيعها في علب متماثلة تضم كل علبة نفس العدد من كتب الأدب ونفس العدد من القواميس دون أي باقٍ. كيف نجد أكبر عدد ممكن من العلب؟',
			svg: svgPrimeVennDiagram(),
			steps: [
				{
					promptAr: 'حلل العدد $180$ إلى جداء عوامل أولية بقسمته تباعاً على $2$ ثم $3$ ثم $5$.',
					hintAr: 'ابدأ بـ $180 \\div 2 = 90$ ثم $90 \\div 2 = 45$ ثم اقسم على $3$.',
					expectedInput: '2^2 x 3^2 x 5',
					revealAr: '$180 = 2 \\times 2 \\times 3 \\times 3 \\times 5 = 2^2 \\times 3^2 \\times 5$ .'
				},
				{
					promptAr: 'حلل العدد $126$ إلى جداء عوامل أولية بالطريقة نفسها.',
					hintAr: '$126$ عدد زوجي، اقسمه على $2$ فتحصل على $63$، ثم اقسم على $3$.',
					expectedInput: '2 x 3^2 x 7',
					revealAr: '$126 = 2 \\times 3 \\times 3 \\times 7 = 2 \\times 3^2 \\times 7$ .'
				},
				{
					promptAr: 'ما هو أكبر عدد ممكن من العلب المتماثلة $\\text{PGCD}(180, 126)$ ؟',
					hintAr: 'خذ العوامل الأولية المشتركة فقط بأصغر أس: هنا $2^1$ و $3^2$.',
					expectedInput: '18',
					revealAr: 'العوامل المشتركة بأصغر أس هي $2^1 \\times 3^2 = 2 \\times 9 = 18$ . إذن يمكن تكوين $18$ علبة على الأكثر، تحتوي كل علبة على $10$ كتب أدب و $7$ قواميس.'
				},
				{
					promptAr: 'باستعمال العوامل الأولية نفسها، احسب $\\text{PPCM}(180, 126)$ ثم اختزل الكسر $\\frac{126}{180}$.',
					hintAr: 'للمضاعف المشترك الأصغر خذ كل العوامل الأولية الظاهرة بأكبر أس، وللاختزال اقسم البسط والمقام على $18$.',
					expectedInput: '1260',
					revealAr: '$\\text{PPCM}(180, 126) = 2^2 \\times 3^2 \\times 5 \\times 7 = 1260$ . والكسر المختزل هو $\\frac{126 \\div 18}{180 \\div 18} = \\frac{7}{10}$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**القاسم والمضاعف**: نقول إن العدد الطبيعي غير المعدوم $b$ قاسم للعدد الطبيعي $a$ (ونكتب $b \\mid a$) إذا وجد عدد طبيعي $k$ بحيث $a = b \\times k$ ، وعندئذ يكون $a$ مضاعفاً لـ $b$ .',
				'**قواعد قابلية القسمة الأساسية**: يقبل عدد طبيعي القسمة على $2$ إذا كان رقم آحاده زوجياً، وعلى $5$ إذا كان رقم آحاده $0$ أو $5$ ، وعلى $3$ (أو $9$) إذا كان مجموع أرقامه مضاعفاً لـ $3$ (أو $9$).',
				'**العدد الأولي**: عدد طبيعي أكبر تماماً من $1$ لا يقبل إلا قاسمين هما $1$ ونفسه. الأعداد الأولية الأولى هي: $2, 3, 5, 7, 11, 13, 17, 19, 23$ . تنبيه: العدد $1$ ليس أولياً.',
				'**القاسم المشترك الأكبر و المضاعف المشترك الأصغر**:\n- $\\text{PGCD}(a, b)$ يساوي جداء العوامل الأولية المشتركة مرفوعة إلى **أصغر** أس.\n- $\\text{PPCM}(a, b)$ يساوي جداء جميع العوامل الأولية (المشتركة وغير المشتركة) مرفوعة إلى **أكبر** أس.\n- العلاقة المفيدة: $\\text{PGCD}(a, b) \\times \\text{PPCM}(a, b) = a \\times b$ .',
				'**اختزال الكسر وتصنيف الأعداد**: لاختزال كسر $\\frac{a}{b}$ نقسم كلاً من $a$ و $b$ على $\\text{PGCD}(a, b)$ . وتندرج المجموعات العددية كالآتي: $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$ .'
			],
			visualSvg: svgNumberSetsSimple(),
			visualCaptionAr: 'تداخل المجموعات العددية من الأعداد الطبيعية $\\mathbb{N}$ إلى الأعداد الحقيقية $\\mathbb{R}$ مع مثال لكل مجموعة',
			examples: [
				{
					problemAr: 'حلل العددين $84$ و $120$ إلى جداء عوامل أولية، ثم احسب $\\text{PGCD}(84, 120)$ و $\\text{PPCM}(84, 120)$ واختزل الكسر $\\frac{84}{120}$.',
					solutionAr:
						'لدينا $84 = 2^2 \\times 3 \\times 7$ و $120 = 2^3 \\times 3 \\times 5$ .\\n\\n- $\\text{PGCD}(84, 120) = 2^2 \\times 3 = 12$ .\\n\\n- $\\text{PPCM}(84, 120) = 2^3 \\times 3 \\times 5 \\times 7 = 840$ .\\n\\n- الكسر غير القابل للاختزال: $\\frac{84}{120} = \\frac{84 \\div 12}{120 \\div 12} = \\frac{7}{10} = 0.7 \\in \\mathbb{D}$ .'
				},
				{
					problemAr: 'تنطلق حافلتان من محطة واحدة في الساعة $08:00$ صباحاً؛ تعود الأولى كل $15$ دقيقة وتعود الثانية كل $20$ دقيقة. متى تلتقيان معاً في المحطة من جديد؟',
					solutionAr:
						'المدة الزمنية بين التقاءين متتاليين هي المضاعف المشترك الأصغر للعددين $15$ و $20$ .\\n\\n$15 = 3 \\times 5$ و $20 = 2^2 \\times 5$ ، إذن $\\text{PPCM}(15, 20) = 2^2 \\times 3 \\times 5 = 60$ دقيقة (أي ساعة كاملة).\\n\\nإذن تلتقي الحافلتان معاً في المحطة في الساعة $09:00$ صباحاً.'
				}
			],
			watchOutAr:
				'لا تخلط بين $\\text{PGCD}$ و $\\text{PPCM}$: القاسم المشترك الأكبر يكون دائماً أصغر من أو يساوي أصغر العددين (يستعمل في التوزيع والتقسيم المتساوي واختزال الكسور)، أما المضاعف المشترك الأصغر فيكون أكبر من أو يساوي أكبر العددين (يستعمل في تزامن الأحداث الدورية وتوحيد المقامات).'
		},
		practice: [
			{
				questionAr: 'ما هو التحليل الصحيح للعدد $140$ إلى جداء عوامل أولية؟',
				options: [
					'$4 \\times 5 \\times 7$',
					'$2^2 \\times 5 \\times 7$',
					'$2 \\times 5^2 \\times 7$',
					'$2^2 \\times 35$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'انتبه: العدد $4$ ليس عدداً أولياً، بل يجب كتابته على شكل $2^2$.',
					'إجابة صحيحة! $2^2 \\times 5 \\times 7 = 4 \\times 5 \\times 7 = 140$ وجميع العوامل أولية.',
					'خطأ: $2 \\times 5^2 \\times 7 = 350 \\neq 140$.',
					'انتبه: $35$ عدد غير أولي، فهو يساوي $5 \\times 7$.'
				],
				explanationAr: '$140 = 2 \\times 70 = 2 \\times 2 \\times 35 = 2^2 \\times 5 \\times 7$ .'
			},
			{
				questionAr: 'إذا كان $a = 2^3 \\times 3^2$ و $b = 2^2 \\times 3 \\times 5$ ، فإن $\\text{PGCD}(a, b)$ يساوي:',
				options: ['$12$', '$36$', '$60$', '$360$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! العوامل المشتركة بأصغر أس هي $2^2 \\times 3 = 4 \\times 3 = 12$.',
					'خطأ: $36 = 2^2 \\times 3^2$ ، لكن $b$ يحتوي على $3^1$ فقط وليس $3^2$.',
					'خطأ: العدد $5$ غير مشترك لأنه لا يقسم $a$.',
					'خطأ: $360 = 2^3 \\times 3^2 \\times 5$ يمثل $\\text{PPCM}(a, b)$ وليس $\\text{PGCD}(a, b)$.'
				],
				explanationAr: 'نأخذ العوامل الأولية المشتركة فقط وهي $2$ و $3$ بأصغر أس: $2^2 \\times 3^1 = 12$ .'
			},
			{
				questionAr: 'الكسر غير القابل للاختزال المساوي للكسر $\\frac{48}{72}$ هو:',
				options: ['$\\frac{4}{6}$', '$\\frac{3}{4}$', '$\\frac{2}{3}$', '$\\frac{6}{9}$'],
				correctIndex: 2,
				diagnosticFeedback: [
					'هذا الكسر لم يختزل إلى نهايته؛ يمكن قسمة البسط والمقام على $2$ مرة أخرى.',
					'تحقق من القسمة: $48 \\div 24 = 2$ و $72 \\div 24 = 3$.',
					'إجابة صحيحة! $\\text{PGCD}(48, 72) = 24$ ، وبقسمة البسط والمقام على $24$ نحصل على $\\frac{2}{3}$.',
					'هذا الكسر يقبل الاختزال على $3$ أيضاً.'
				],
				explanationAr: '$48 = 2^4 \\times 3$ و $72 = 2^3 \\times 3^2$ ، إذن $\\text{PGCD}(48, 72) = 2^3 \\times 3 = 24$ ومنه $\\frac{48}{72} = \\frac{2}{3}$ .'
			},
			{
				questionAr: 'أصغر مجموعة عددية من بين $\\mathbb{N}$ و $\\mathbb{Z}$ و $\\mathbb{D}$ و $\\mathbb{Q}$ ينتمي إليها العدد $\\frac{15}{6}$ هي:',
				options: ['$\\mathbb{N}$', '$\\mathbb{Z}$', '$\\mathbb{D}$', '$\\mathbb{Q}$'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: $\\frac{15}{6} = 2.5$ ليس عدداً طبيعياً لوجود جزء عشري غير معدوم.',
					'خطأ: $2.5$ ليس عدداً صحيحاً نسبياً.',
					'إجابة صحيحة! $\\frac{15}{6} = \\frac{5}{2} = 2.5 = \\frac{25}{10} \\in \\mathbb{D}$.',
					'العدد ناطق فعلاً، لكن توجد مجموعة أصغر منه تحتويه وهي مجموعة الأعداد العشرية $\\mathbb{D}$.'
				],
				explanationAr: 'بعد الاختزال: $\\frac{15}{6} = \\frac{5}{2} = 2.5$ وهو عدد عشري منتهٍ، لذا فأصغر مجموعة ينتمي إليها هي $\\mathbb{D}$ .'
			}
		]
	},

	// -------------------------------------------------------------------------
	// LESSON 2: Integer Powers, Scientific Notation & Order of Magnitude
	// -------------------------------------------------------------------------
	{
		id: 'lesson_1as_tcl_t1_powers_scientific_notation_order_magnitude',
		slug: '1as-tcl-t1-powers-scientific-notation-order-magnitude',
		grade: '1as_tcl',
		yearSubjectId: 664,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: الأعداد والحساب',
		order: 2,
		titleAr: 'القوى الصحيحة والكتابة العلمية ورتبة مقدار عدد',
		objectives: [
			'تطبيق قواعد الحساب على القوى ذات الأس الصحيح النسبي لتبسيط العبارات العددية',
			'كتابة أي عدد عشري موجب على الشكل العلمي a × 10^n مع 1 ≤ a < 10',
			'تحديد رتبة مقدار عدد واستعمالها لتقدير نتائج العمليات الحسابية وتدوير الأعداد إلى 10^(-n)'
		],
		keywordsAr: [
			'القوى الصحيحة',
			'قوى العدد 10',
			'الكتابة العلمية',
			'رتبة المقدار',
			'التدوير'
		],
		discover: {
			scenarioAr:
				'في مقال علمي حول مكتبة رقمية وطنية، ورد أن سعة تخزين أرشيف المخطوطات تبلغ $7200$ ميغابايت، بينما يبلغ حجم صفحة مخطوطة مضغوطة $0.0036$ غيغابايت. لتسهيل مقارنة هذه الأعداد الكبيرة جداً والصغيرة جداً نستخدم قوى العدد $10$ والكتابة العلمية.',
			svg: svgPowersScale(),
			steps: [
				{
					promptAr: 'بسّط العبارة $\\frac{10^5 \\times 10^{-2}}{10^2}$ على شكل قوة وحيدة للعدد $10$.',
					hintAr: 'في الضرب نجمع الأسس، وفي القسمة نطرح أس المقام من أس البسط.',
					expectedInput: '10^1',
					revealAr: '$\\frac{10^{5 + (-2)}}{10^2} = \\frac{10^3}{10^2} = 10^{3-2} = 10^1 = 10$ .'
				},
				{
					promptAr: 'اكتب العدد $7200$ على الشكل العلمي $a \\times 10^n$ حيث $1 \\leq a < 10$.',
					hintAr: 'نزيح الفاصلة $3$ مراتب نحو اليسار لتصبح بين $7$ و $2$.',
					expectedInput: '7.2 x 10^3',
					revealAr: '$7200 = 7.2 \\times 1000 = 7.2 \\times 10^3$ .'
				},
				{
					promptAr: 'اكتب العدد $0.0036$ على الشكل العلمي.',
					hintAr: 'نزيح الفاصلة $3$ مراتب نحو اليمين فتكون قوة $10$ سالبة.',
					expectedInput: '3.6 x 10^-3',
					revealAr: '$0.0036 = 3.6 \\times 10^{-3}$ .'
				},
				{
					promptAr: 'ما هي رتبة مقدار كل من $7.2 \\times 10^3$ و $3.6 \\times 10^{-3}$ ؟',
					hintAr: 'ندوّر المعامل $a$ إلى أقرب عدد: إذا كان $a < 5$ تصبح رتبة المقدار $10^n$ ، وإذا كان $a \\geq 5$ تصبح $10^{n+1}$.',
					expectedInput: '10^4 et 10^-3',
					revealAr: 'بما أن $7.2 \\geq 5$ فإن رتبة مقدار $7.2 \\times 10^3$ هي $10^{3+1} = 10^4$ . وبما أن $3.6 < 5$ فإن رتبة مقدار $3.6 \\times 10^{-3}$ هي $10^{-3}$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**قواعد القوى** (من أجل $a \\neq 0$ ، $b \\neq 0$ و $m, n \\in \\mathbb{Z}$):\n- $a^m \\times a^n = a^{m+n}$ و $\\frac{a^m}{a^n} = a^{m-n}$\n- $(a^m)^n = a^{m \\times n}$ و $(a \\times b)^n = a^n \\times b^n$\n- $a^{-n} = \\frac{1}{a^n}$ و $a^0 = 1$ و $\\left(\\frac{a}{b}\\right)^{-n} = \\left(\\frac{b}{a}\\right)^n$ .',
				'**انتبه للإشارات والأقواس**: $(-2)^4 = 16$ لأن الأس الزوجي يشمل الإشارة السالبة، بينما $-2^4 = -(2^4) = -16$ .',
				'**الكتابة العلمية**: يكتب كل عدد عشري موجب على الشكل $a \\times 10^n$ حيث $a$ عدد عشري يحقق $1 \\leq a < 10$ (أي رقم واحد غير معدوم قبل الفاصلة) و $n$ عدد صحيح نسبي.',
				'**رتبة مقدار عدد**: بعد كتابة العدد على الشكل العلمي $a \\times 10^n$ ، نحدد رتبة مقداره بـ $10^n$ إذا كان $a < 5$ ، وبـ $10^{n+1}$ إذا كان $a \\geq 5$ (أو بتدوير $a$ إلى الوحدة مضروباً في $10^n$).',
				'**المدور إلى $10^{-n}$**: نحتفظ بـ $n$ رقماً بعد الفاصلة؛ إذا كان الرقم الموالي أصغر من $5$ نتركه كما هو، وإذا كان $5$ أو أكبر نضيف $1$ للرقم الأخير المحتفظ به.'
			],
			visualSvg: svgOrderOfMagnitudeRule(),
			visualCaptionAr: 'قاعدة تحديد رتبة المقدار انطلاقاً من الكتابة العلمية $a \\times 10^n$',
			examples: [
				{
					problemAr: 'احسب واكتب على الشكل العلمي ثم استنتج رتبة مقدار العدد $A = \\frac{4.5 \\times 10^6 \\times 2 \\times 10^{-3}}{1.5 \\times 10^2}$.',
					solutionAr:
						'نفصل الأعداد عن قوى $10$ :\\n\\n$A = \\frac{4.5 \\times 2}{1.5} \\times \\frac{10^6 \\times 10^{-3}}{10^2} = \\frac{9}{1.5} \\times 10^{6 - 3 - 2} = 6 \\times 10^1$ .\\n\\nالكتابة العلمية: $A = 6 \\times 10^1$ (قيمته $60$).\\n\\nبما أن $6 \\geq 5$ فإن رتبة مقدار $A$ هي $10^{1+1} = 10^2$ .'
				},
				{
					problemAr: 'بسّط العبارة $B = \\frac{(3^2)^3 \\times 3^{-4}}{3^5}$ إلى قوة وحيدة للعدد $3$.',
					solutionAr:
						'$B = \\frac{3^{2 \\times 3} \\times 3^{-4}}{3^5} = \\frac{3^6 \\times 3^{-4}}{3^5} = \\frac{3^{6-4}}{3^5} = \\frac{3^2}{3^5} = 3^{2-5} = 3^{-3} = \\frac{1}{27}$ .'
				}
			],
			watchOutAr:
				'الكتابة $35 \\times 10^4$ أو $0.42 \\times 10^{-2}$ ليستا كتابتين علميتين لأن المعامل ليس محصوراً في المجال $[1, 10[$ . كذلك في التدوير إلى $10^{-2}$ للعدد $3.146$ نحصل على $3.15$ لأن الرقم الثالث بعد الفاصلة هو $6 \\geq 5$.'
		},
		practice: [
			{
				questionAr: 'قيمة العبارة $\\frac{2^5 \\times (2^{-1})^3}{2^4}$ تساوي:',
				options: ['$2^{-2}$', '$2^2$', '$2^4$', '$2^{-6}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $(2^{-1})^3 = 2^{-3}$ ، والبسط $2^{5-3} = 2^2$ ، والقسمة تعطي $2^{2-4} = 2^{-2}$.',
					'خطأ: لقد طرحت الأسس بعكس الترتيب ($4 - 2$ بدل $2 - 4$).',
					'تحقق من علامة الأس $-3$ في $(2^{-1})^3$.',
					'أخطأت في جمع أسس البسط؛ $5 + (-3) = 2$ وليس $-2$.'
				],
				explanationAr: '$\\frac{2^5 \\times 2^{-3}}{2^4} = \\frac{2^2}{2^4} = 2^{2-4} = 2^{-2} = \\frac{1}{4}$ .'
			},
			{
				questionAr: 'الكتابة العلمية للعدد $0.00048$ هي:',
				options: ['$48 \\times 10^{-5}$', '$4.8 \\times 10^{-4}$', '$4.8 \\times 10^{4}$', '$0.48 \\times 10^{-3}$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'العدد $48$ أكبر من $10$، لذا فهذه ليست كتابة علمية.',
					'إجابة صحيحة! نزيح الفاصلة $4$ مراتب يميناً لنحصل على $4.8$ بين $1$ و $10$ فيكون الأس $-4$.',
					'خطأ: الأس الموجب $10^4$ يعطي $48000$ وليس عدداً صغيراً.',
					'المعامل $0.48$ أصغر من $1$، فلا يحقق شرط الكتابة العلمية.'
				],
				explanationAr: 'نكتب $0.00048 = 4.8 \\times 10^{-4}$ لأن $1 \\leq 4.8 < 10$ والفاصلة أُزيحت $4$ مراتب لليمين.'
			},
			{
				questionAr: 'رتبة مقدار العدد $8.3 \\times 10^5$ هي:',
				options: ['$10^5$', '$10^6$', '$8 \\times 10^5$', '$10^4$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'نأخذ $10^5$ إذا كان المعامل أصغر من $5$، لكن هنا $8.3 \\geq 5$.',
					'إجابة صحيحة! بما أن $8.3 \\geq 5$ فإننا نقرب $8.3$ إلى $10$ فتصبح رتبة المقدار $10 \\times 10^5 = 10^6$.',
					'رتبة المقدار تكتب على شكل قوة وحيدة للعدد $10$ (دون معامل مختلف عن $1$).',
					'خطأ في الأس؛ هذا أصغر بكثير من العدد المعطى.'
				],
				explanationAr: 'بما أن $8.3 \\geq 5$ فإن رتبة مقدار $8.3 \\times 10^5$ هي $10^{5+1} = 10^6$ .'
			},
			{
				questionAr: 'المدور إلى $10^{-2}$ للعدد $5.3762$ هو:',
				options: ['$5.37$', '$5.38$', '$5.4$', '$5.376$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'$5.37$ هو البتر إلى $10^{-2}$ وليس المدور؛ انظر إلى الرقم الثالث بعد الفاصلة وهو $6$.',
					'إجابة صحيحة! الرقم الثالث بعد الفاصلة هو $6 \\geq 5$ لذا نضيف $1$ إلى $7$ فنحصل على $5.38$.',
					'هذا المدور إلى $10^{-1}$ وليس إلى $10^{-2}$.',
					'هذا المدور إلى $10^{-3}$ (ثلاثة أرقام بعد الفاصلة).'
				],
				explanationAr: 'التدوير إلى $10^{-2}$ يعني إبقاء رقمين بعد الفاصلة. وبما أن الرقم الثالث هو $6 \\geq 5$ فإننا نقرب بالزيادة إلى $5.38$ .'
			}
		]
	},

	// -------------------------------------------------------------------------
	// LESSON 3: Square Roots, Simplifying & Rationalizing Denominators
	// -------------------------------------------------------------------------
	{
		id: 'lesson_1as_tcl_t1_square_roots_simplifying_rationalizing',
		slug: '1as-tcl-t1-square-roots-simplifying-rationalizing',
		grade: '1as_tcl',
		yearSubjectId: 664,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: الأعداد والحساب',
		order: 3,
		titleAr: 'الجذور التربيعية وتبسيط العبارات الجذرية والمقام الناطق',
		objectives: [
			'توظيف خواص الجذور التربيعية في حساب وتبسيط العبارات الجذرية إلى الشكل a√b',
			'التحكم في قاعدة √(x^2) = |x| وتفادي الأخطاء الشائعة مع الجمع والطرح تحت الجذر',
			'كتابة نسبة مقامها غير ناطق على شكل نسبة مقامها عدد ناطق باستعمال المرافق'
		],
		keywordsAr: [
			'الجذر التربيعي',
			'تبسيط الجذور',
			'المرافق',
			'تنطيق المقام',
			'المربعات التامة'
		],
		discover: {
			scenarioAr:
				'قطعة أرض مربعة الشكل مساحتها $18\\text{ m}^2$ مخصصة لحديقة مدرسة، وبجانبها ساحة مربعة مساحتها $8\\text{ m}^2$ . نريد حساب مجموع طولي ضلعي المربعين بدقة ثم تبسيط النتيجة.',
			svg: svgSquareRootAreas(),
			steps: [
				{
					promptAr: 'ما هو طول ضلع المربع الأول الذي مساحته $18\\text{ m}^2$ ؟ اكتب النتيجة على شكل $a\\sqrt{2}$.',
					hintAr: 'فكّك $18$ إلى جداء مربع تام في عدد: $18 = 9 \\times 2$.',
					expectedInput: '3sqrt(2)',
					revealAr: 'طول الضلع هو $\\sqrt{18} = \\sqrt{9 \\times 2} = \\sqrt{9} \\times \\sqrt{2} = 3\\sqrt{2}$ متراً.'
				},
				{
					promptAr: 'بسّط طول ضلع المربع الثاني $\\sqrt{8}$ على شكل $b\\sqrt{2}$.',
					hintAr: 'اكتب $8 = 4 \\times 2$.',
					expectedInput: '2sqrt(2)',
					revealAr: '$\\sqrt{8} = \\sqrt{4 \\times 2} = \\sqrt{4} \\times \\sqrt{2} = 2\\sqrt{2}$ متراً.'
				},
				{
					promptAr: 'احسب المجموع $\\sqrt{18} + \\sqrt{8}$ على الشكل $k\\sqrt{2}$ . هل يساوي $\\sqrt{26}$ ؟',
					hintAr: 'اجمع المعاملين $3 + 2$ واحتفظ بـ $\\sqrt{2}$.',
					expectedInput: '5sqrt(2)',
					revealAr: '$3\\sqrt{2} + 2\\sqrt{2} = (3 + 2)\\sqrt{2} = 5\\sqrt{2}$ . تنبيه: $(5\\sqrt{2})^2 = 50 \\neq 26$ ، إذن $\\sqrt{18} + \\sqrt{8} \\neq \\sqrt{18 + 8}$ !'
				},
				{
					promptAr: 'كيف نجعل مقام الكسر $\\frac{4}{\\sqrt{2}}$ عدداً ناطقاً؟',
					hintAr: 'اضرب البسط والمقام في $\\sqrt{2}$.',
					expectedInput: '2sqrt(2)',
					revealAr: '$\\frac{4}{\\sqrt{2}} = \\frac{4 \\times \\sqrt{2}}{\\sqrt{2} \\times \\sqrt{2}} = \\frac{4\\sqrt{2}}{2} = 2\\sqrt{2}$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**تعريف الجذر التربيعي**: من أجل كل عدد حقيقي موجب $a \\geq 0$ ، العدد $\\sqrt{a}$ هو العدد الحقيقي الموجب الوحيد الذي مربعه يساوي $a$ : $(\\sqrt{a})^2 = a$ و $\\sqrt{a} \\geq 0$ .',
				'**خواص الجذور التربيعية** ($a \\geq 0$ ، $b \\geq 0$):\n- $\\sqrt{a \\times b} = \\sqrt{a} \\times \\sqrt{b}$\n- $\\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}}$ ($b > 0$)\n- $\\sqrt{x^2} = |x|$ لكل عدد حقيقي $x$ .',
				'**قاعدة التبسيط إلى الشكل $k\\sqrt{d}$**: نبحث عن أكبر مربع تام ($4, 9, 16, 25, 36, 49, \\dots$) يقسم العدد تحت الجذر، ثم نستعمل خاصية الضرب.',
				'**جعل المقام عدداً ناطقاً (تنطيق المقام)**:\n- حالة مقام وحيد الحد: $\\frac{c}{\\sqrt{a}} = \\frac{c\\sqrt{a}}{a}$ ($a > 0$).\n- حالة مجموع أو فرق: نضرب البسط والمقام في المرافق باستعمال المتطابقة $(u - v)(u + v) = u^2 - v^2$ ؛ فمثلاً مرافق $\\sqrt{a} + b$ هو $\\sqrt{a} - b$ .'
			],
			visualSvg: svgSqrt2Geometric(),
			visualCaptionAr: 'تمثيل $\\sqrt{2}$ على المستقيم العددي يثبت وجود أعداد حقيقية غير ناطقة',
			examples: [
				{
					problemAr: 'بسّط العبارة $A = \\sqrt{75} - 2\\sqrt{12} + \\sqrt{27}$ وبيّن أن $A^2$ عدد طبيعي.',
					solutionAr:
						'$\\sqrt{75} = \\sqrt{25 \\times 3} = 5\\sqrt{3}$ ، و $\\sqrt{12} = \\sqrt{4 \\times 3} = 2\\sqrt{3}$ ، و $\\sqrt{27} = \\sqrt{9 \\times 3} = 3\\sqrt{3}$ .\\n\\nإذن: $A = 5\\sqrt{3} - 2(2\\sqrt{3}) + 3\\sqrt{3} = (5 - 4 + 3)\\sqrt{3} = 4\\sqrt{3}$ .\\n\\nنحسب المربع: $A^2 = (4\\sqrt{3})^2 = 16 \\times 3 = 48 \\in \\mathbb{N}$ .'
				},
				{
					problemAr: 'اكتب الكسر $B = \\frac{6}{\\sqrt{5} - \\sqrt{2}}$ بمقام ناطق.',
					solutionAr:
						'مرافق المقام $\\sqrt{5} - \\sqrt{2}$ هو $\\sqrt{5} + \\sqrt{2}$ :\\n\\n$B = \\frac{6(\\sqrt{5} + \\sqrt{2})}{(\\sqrt{5} - \\sqrt{2})(\\sqrt{5} + \\sqrt{2})} = \\frac{6(\\sqrt{5} + \\sqrt{2})}{5 - 2} = \\frac{6(\\sqrt{5} + \\sqrt{2})}{3} = 2(\\sqrt{5} + \\sqrt{2}) = 2\\sqrt{5} + 2\\sqrt{2}$ .'
				}
			],
			watchOutAr:
				'احذر من الخلط بين الجداء والجمع: $\\sqrt{a + b} \\neq \\sqrt{a} + \\sqrt{b}$ (مثلاً $\\sqrt{9 + 16} = \\sqrt{25} = 5$ بينما $\\sqrt{9} + \\sqrt{16} = 3 + 4 = 7$). كما أن $\\sqrt{(-5)^2} = |-5| = 5$ وليس $-5$.'
		},
		practice: [
			{
				questionAr: 'العبارة المبسطة للمجموع $\\sqrt{50} + \\sqrt{18}$ هي:',
				options: ['$\\sqrt{68}$', '$8\\sqrt{2}$', '$16\\sqrt{2}$', '$7\\sqrt{2}$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ شائع: لا نجمع ما تحت الجذرين أبداً ($\\sqrt{a} + \\sqrt{b} \\neq \\sqrt{a+b}$).',
					'إجابة صحيحة! $\\sqrt{50} = 5\\sqrt{2}$ و $\\sqrt{18} = 3\\sqrt{2}$ ، ومجموعهما $8\\sqrt{2}$.',
					'انتبه: جذر $25$ هو $5$ وجذر $9$ هو $3$، وليس $13 + 3$.',
					'تحقق من $\\sqrt{50} = 5\\sqrt{2}$ و $\\sqrt{18} = 3\\sqrt{2}$؛ $5 + 3 = 8$.'
				],
				explanationAr: '$\\sqrt{50} + \\sqrt{18} = \\sqrt{25 \\times 2} + \\sqrt{9 \\times 2} = 5\\sqrt{2} + 3\\sqrt{2} = 8\\sqrt{2}$ .'
			},
			{
				questionAr: 'قيمة $\\sqrt{(-7)^2} + (\\sqrt{3})^2$ تساوي:',
				options: ['$-4$', '$10$', '$4$', '$16$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: $\\sqrt{(-7)^2} = |-7| = 7$ وليس $-7$، لأن الجذر التربيعي دوماً موجب.',
					'إجابة صحيحة! $\\sqrt{(-7)^2} = 7$ و $(\\sqrt{3})^2 = 3$ ، فالمجموع $7 + 3 = 10$.',
					'تحقق من حساب $\\sqrt{(-7)^2} = 7$.',
					'($\\sqrt{3})^2 = 3$ وليس $9$.'
				],
				explanationAr: '$\\sqrt{(-7)^2} = |-7| = 7$ و $(\\sqrt{3})^2 = 3$ ، إذن الناتج هو $7 + 3 = 10$ .'
			},
			{
				questionAr: 'بعد تنطيق المقام، يكتب الكسر $\\frac{10}{\\sqrt{5}}$ على الشكل:',
				options: ['$2\\sqrt{5}$', '$5\\sqrt{2}$', '$\\frac{\\sqrt{5}}{2}$', '$10\\sqrt{5}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $\\frac{10\\sqrt{5}}{\\sqrt{5} \\times \\sqrt{5}} = \\frac{10\\sqrt{5}}{5} = 2\\sqrt{5}$.',
					'تحقق من العدد الذي تحت الجذر: المقام هو $\\sqrt{5}$ وليس $\\sqrt{2}$.',
					'خطأ: المقام الجديد $5$ أصغر من البسط $10$، لذا الناتج $2\\sqrt{5}$ وليس كسراً.',
					'نسيت القسمة على المقام الجديد $\\sqrt{5} \\times \\sqrt{5} = 5$.'
				],
				explanationAr: '$\\frac{10}{\\sqrt{5}} = \\frac{10\\sqrt{5}}{5} = 2\\sqrt{5}$ .'
			},
			{
				questionAr: 'الكتابة ذات المقام الناطق للكسر $\\frac{4}{\\sqrt{6} - \\sqrt{2}}$ هي:',
				options: [
					'$\\sqrt{6} - \\sqrt{2}$',
					'$\\sqrt{6} + \\sqrt{2}$',
					'$2(\\sqrt{6} + \\sqrt{2})$',
					'$\\frac{\\sqrt{6} + \\sqrt{2}}{4}$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'مرافق $\\sqrt{6} - \\sqrt{2}$ هو $\\sqrt{6} + \\sqrt{2}$ بإشارة الجمع.',
					'إجابة صحيحة! نضرب في $\\sqrt{6} + \\sqrt{2}$ فيصبح المقام $6 - 2 = 4$ ويُختزل مع البسط $4$.',
					'المقام الجديد هو $6 - 2 = 4$ وليس $2$.',
					'نسيت أن البسط كان أصلاً $4$ فتم اختزاله مع المقام $4$.'
				],
				explanationAr: '$\\frac{4(\\sqrt{6} + \\sqrt{2})}{(\\sqrt{6} - \\sqrt{2})(\\sqrt{6} + \\sqrt{2})} = \\frac{4(\\sqrt{6} + \\sqrt{2})}{6 - 2} = \\sqrt{6} + \\sqrt{2}$ .'
			}
		]
	},

	// -------------------------------------------------------------------------
	// LESSON 4: Order, Comparison, Framing & Intervals in R
	// -------------------------------------------------------------------------
	{
		id: 'lesson_1as_tcl_t1_order_comparison_framing_intervals',
		slug: '1as-tcl-t1-order-comparison-framing-intervals',
		grade: '1as_tcl',
		yearSubjectId: 664,
		trimesterId: 't1',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: الترتيب، المجالات والقيمة المطلقة',
		order: 4,
		titleAr: 'الترتيب والمقارنة والحصر والمجالات في R',
		objectives: [
			'مقارنة عددين حقيقيين بدراسة إشارة الفرق أو بمقارنة مربعيهما إذا كانا موجبين',
			'تمثيل المجالات العددية بأنواعها على المستقيم العددي وتعيين تقاطع واتحاد مجالين',
			'تطبيق قواعد الحصر والعمليات على المتباينات (الجمع، الطرح عبر الجمع مع المعاكس، والضرب)'
		],
		keywordsAr: [
			'الترتيب في R',
			'المقارنة',
			'الحصر',
			'المجالات العددية',
			'التقاطع والاتحاد'
		],
		discover: {
			scenarioAr:
				'تفتح مكتبة الحي أبوابها من الساعة $8$ صباحاً إلى الساعة $16$ مساءً، أي المجال $I = [8, 16]$ ، بينما تتوافق أوقات فراغ التلميذ مع المجال $J = ]11, 18]$ . نريد تمثيل أوقات التلاقي الممكنة (التقاطع) وأوقات التغطية الكلية (الاتحاد) وحصر عبارة زمنية.',
			svg: svgIntervalRows({
				min: 6,
				max: 19,
				rows: [
					{ label: 'I = [8, 16]', color: '#2563eb', segs: [{ from: 8, to: 16, closedFrom: true, closedTo: true }] },
					{ label: 'J = ]11, 18]', color: '#16a34a', segs: [{ from: 11, to: 18, closedFrom: false, closedTo: true }] },
					{ label: 'I ∩ J', color: '#dc2626', segs: [{ from: 11, to: 16, closedFrom: false, closedTo: true }] },
					{ label: 'I ∪ J', color: '#7c3aed', segs: [{ from: 8, to: 18, closedFrom: true, closedTo: true }] }
				]
			}),
			steps: [
				{
					promptAr: 'قارن الكسرين $\\frac{5}{6}$ و $\\frac{7}{8}$ بحساب إشارة الفرق $\\frac{5}{6} - \\frac{7}{8}$.',
					hintAr: 'وحّد المقامين على $24$.',
					expectedInput: '5/6 < 7/8',
					revealAr: '$\\frac{5}{6} - \\frac{7}{8} = \\frac{20 - 21}{24} = -\\frac{1}{24} < 0$ ، إذن $\\frac{5}{6} < \\frac{7}{8}$ .'
				},
				{
					promptAr: 'ما هو تقاطع المجالين $I = [8, 16]$ و $J = ]11, 18]$ ، مع الانتباه لنوع القوس عند $11$ و $16$ ؟',
					hintAr: 'العنصر ينتمي إلى التقاطع إذا انتمى إلى $I$ وإلى $J$ في آن واحد. هل $11$ ينتمي إلى $J$ ؟',
					expectedInput: ']11, 16]',
					revealAr: '$I \\cap J = ]11, 16]$ لأن $11 \\notin J$ فالقوس عنده مفتوح، بينما $16 \\in I$ و $16 \\in J$ فالقوس عنده مغلق.'
				},
				{
					promptAr: 'ما هو اتحاد المجالين $I \\cup J$ ؟',
					hintAr: 'الاتحاد يضم كل الأعداد الموجودة في $I$ أو في $J$ من أصغر طرف إلى أكبر طرف.',
					expectedInput: '[8, 18]',
					revealAr: '$I \\cup J = [8, 18]$ .'
				},
				{
					promptAr: 'إذا علمت أن $1 \\leq x \\leq 4$ ، فأوجد حصراً للعبارة $2x + 1$.',
					hintAr: 'اضرب أطراف الحصر في $2$ (عدد موجب فلا يتغير الترتيب) ثم أضف $1$.',
					expectedInput: '3 <= 2x+1 <= 9',
					revealAr: '$2 \\leq 2x \\leq 8$ ومنه $3 \\leq 2x + 1 \\leq 9$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**مقارنة عددين حقيقيين**: $a \\leq b \\iff a - b \\leq 0$ . وإذا كان $a \\geq 0$ و $b \\geq 0$ فإن $a \\leq b \\iff a^2 \\leq b^2$ (مفيد لمقارنة الجذور).',
				'**المجالات في $\\mathbb{R}$**:\n- $[a, b] = \\{x \\in \\mathbb{R} : a \\leq x \\leq b\\}$ (مغلق).\n- $]a, b[ = \\{x \\in \\mathbb{R} : a < x < b\\}$ (مفتوح).\n- $[a, +\\infty[ = \\{x \\in \\mathbb{R} : x \\geq a\\}$ و $]-\\infty, b[ = \\{x \\in \\mathbb{R} : x < b\\}$ . القوس عند $\\pm\\infty$ مفتوح دائماً.',
				'**التقاطع والاتحاد**: تقاطع مجالين $I \\cap J$ هو مجموعة العناصر المشتركة بينهما، واتحادهما $I \\cup J$ هو مجموعة العناصر التي تنتمي إلى أحدهما على الأقل.',
				'**قواعد المتباينات والحصر**:\n- إضافة أو طرح نفس العدد يحافظ على اتجاه المتباينة.\n- الضرب في عدد **موجب تماماً** يحافظ على الاتجاه، والضرب في عدد **سالب تماماً** **يعكس** اتجاه المتباينة.\n- لحصر الفرق $x - y$ نكتب $x - y = x + (-y)$ : نحصر $-y$ بعكس المتباينة ثم نجمع طرفاً لطرف مع حصر $x$ .'
			],
			visualSvg: svgLinearFramingMap(),
			visualCaptionAr: 'حصر العبارة التآلفية $2x + 1$ انطلاقاً من حصر $x$ على المجال $[1, 4]$',
			examples: [
				{
					problemAr: 'قارن العددين $3\\sqrt{2}$ و $2\\sqrt{5}$.',
					solutionAr:
						'العددان موجبان، نقارن مربعيهما:\\n\\n$(3\\sqrt{2})^2 = 9 \\times 2 = 18$ و $(2\\sqrt{5})^2 = 4 \\times 5 = 20$ .\\n\\nبما أن $18 < 20$ والعددان موجبان فإن $3\\sqrt{2} < 2\\sqrt{5}$ .'
				},
				{
					problemAr: 'ليكن $2 \\leq x \\leq 5$ و $1 \\leq y \\leq 3$ . أوجد حصراً لكل من $x + y$ و $x - y$ و $3x - 2y$.',
					solutionAr:
						'- المجموع: $2 + 1 \\leq x + y \\leq 5 + 3$ أي $3 \\leq x + y \\leq 8$ .\\n\\n- الفرق: نضرب حصر $y$ في $-1$ فنجد $-3 \\leq -y \\leq -1$ ، ثم نجمع مع $x$ : $2 - 3 \\leq x - y \\leq 5 - 1$ أي $-1 \\leq x - y \\leq 4$ .\\n\\n- العبارة $3x - 2y$ : لدينا $6 \\leq 3x \\leq 15$ و $-6 \\leq -2y \\leq -2$ ، بالجمع نجد $0 \\leq 3x - 2y \\leq 13$ .'
				}
			],
			watchOutAr:
				'خطأ شائع جداً: لا يجوز أبداً طرح المتباينات طرفاً لطرف! يجب دائماً ضرب المتباينة الثانية في $-1$ (مع عكس اتجاهها) ثم الجمع طرفاً لطرف. كما لا يجوز وضع قوس مغلق عند $+\\infty$ أو $-\\infty$.'
		},
		practice: [
			{
				questionAr: 'تقاطع المجالين $I = [-3 ; 4]$ و $J = ]1 ; 7[$ هو:',
				options: ['$[-3 ; 7[$', '$]1 ; 4]$', '$[1 ; 4]$', '$[-3 ; 1[$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذا يمثل اتحاد المجالين $I \\cup J$ وليس تقاطعهما.',
					'إجابة صحيحة! العناصر المشتركة تبدأ بعد $1$ (مفتوح لأنه خارج $J$) وتنتهي عند $4$ (مغلق).',
					'انتبه: القوس عند $1$ في $J$ مفتوح، إذن $1 \\notin J$ ولا يمكن أن ينتمي إلى التقاطع.',
					'هذا الجزء ينتمي إلى $I$ فقط ولا ينتمي إلى $J$.'
				],
				explanationAr: 'العناصر المشتركة بين $[-3 ; 4]$ و $]1 ; 7[$ هي الأعداد التي تحقق $1 < x \\leq 4$ ، أي المجال $]1 ; 4]$ .'
			},
			{
				questionAr: 'إذا كان $3 \\leq x \\leq 7$ و $1 \\leq y \\leq 2$ ، فإن حصر الفرق $x - y$ هو:',
				options: [
					'$2 \\leq x - y \\leq 5$',
					'$1 \\leq x - y \\leq 6$',
					'$4 \\leq x - y \\leq 9$',
					'$-1 \\leq x - y \\leq 6$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ شائع: لقد طرحت طرفاً لطرف ($3-1$ و $7-2$). يجب الجمع مع المعاكس $-2 \\leq -y \\leq -1$.',
					'إجابة صحيحة! $-2 \\leq -y \\leq -1$ وبالجمع مع $3 \\leq x \\leq 7$ نجد $1 \\leq x - y \\leq 6$.',
					'هذا حصر المجموع $x + y$ وليس الفرق $x - y$.',
					'تحقق من الحد الأدنى: $3 + (-2) = 1$ وليس $-1$.'
				],
				explanationAr: 'لدينا $-2 \\leq -y \\leq -1$ ، وبجمع هذه المتباينة مع $3 \\leq x \\leq 7$ نحصل على $3 - 2 \\leq x - y \\leq 7 - 1$ أي $1 \\leq x - y \\leq 6$ .'
			},
			{
				questionAr: 'أي من العددين أكبر: $2\\sqrt{7}$ أم $5$ ؟',
				options: [
					'$2\\sqrt{7} < 5$',
					'$2\\sqrt{7} > 5$',
					'$2\\sqrt{7} = 5$',
					'لا يمكن المقارنة دون حاسبة'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'قارن المربعين: $(2\\sqrt{7})^2 = 4 \\times 7 = 28$ بينما $5^2 = 25$.',
					'إجابة صحيحة! $(2\\sqrt{7})^2 = 28 > 25 = 5^2$ والعددان موجبان، إذن $2\\sqrt{7} > 5$.',
					'مربعاهما غير متساويين ($28 \\neq 25$).',
					'يمكن المقارنة بدقة تامة بمقارنة مربعيهما لأن العددين موجبان.'
				],
				explanationAr: '$(2\\sqrt{7})^2 = 28$ و $5^2 = 25$ . بما أن $28 > 25$ والعددان موجبان فإن $2\\sqrt{7} > 5$ .'
			},
			{
				questionAr: 'المتباينة $-2x + 1 \\geq 5$ تكافئ:',
				options: ['$x \\geq -2$', '$x \\leq -2$', '$x \\leq 2$', '$x \\geq 3$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'نسيت عكس اتجاه المتباينة عند القسمة على العدد السالب $-2$.',
					'إجابة صحيحة! $-2x \\geq 4$ وبالقسمة على $-2 < 0$ تنعكس المتباينة فتصبح $x \\leq -2$.',
					'تحقق من الإشارة: $4 \\div (-2) = -2$ وليس $2$.',
					'راجع نقل الحد $+1$ إلى الطرف الآخر ($5 - 1 = 4$).'
				],
				explanationAr: '$-2x + 1 \\geq 5 \\iff -2x \\geq 4 \\iff x \\leq \\frac{4}{-2} \\iff x \\leq -2$ .'
			}
		]
	},

	// -------------------------------------------------------------------------
	// LESSON 5: Absolute Value, Distance on Number Line & |x - a| = r
	// -------------------------------------------------------------------------
	{
		id: 'lesson_1as_tcl_t1_absolute_value_distance_equations',
		slug: '1as-tcl-t1-absolute-value-distance-equations',
		grade: '1as_tcl',
		yearSubjectId: 664,
		trimesterId: 't1',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: الترتيب، المجالات والقيمة المطلقة',
		order: 5,
		titleAr: 'القيمة المطلقة والمسافة على المستقيم العددي وحل معادلات ومتراجحات |x - a| = r',
		objectives: [
			'حساب القيمة المطلقة لعدد حقيقي وكتابة عبارات بسيطة دون رمز القيمة المطلقة',
			'ربط القيمة المطلقة بالمسافة على المستقيم العددي والانتقال بين المجال والحصر والمسافة والقيمة المطلقة',
			'حل معادلات من الشكل |x - a| = r ومتراجحات من الشكل |x - a| ≤ r أو |x - a| < r'
		],
		keywordsAr: [
			'القيمة المطلقة',
			'المسافة على المستقيم العددي',
			'مركز المجال',
			'نصف قطر المجال',
			'معادلات القيمة المطلقة'
		],
		discover: {
			scenarioAr:
				'تحدد إدارة مخزن للتمور درجة حرارة التخزين المثالية عند $3^\\circ\\text{C}$ مع هامش مسموح لا يتعدى درجتين ($2^\\circ\\text{C}$) زيادة أو نقصاناً. نرمز لدرجة الحرارة بـ $x$ ، فنكتب الشرط: $|x - 3| \\leq 2$ .',
			svg: svgAbsValueDistanceLine(),
			steps: [
				{
					promptAr: 'ما هما القيمتان الحديتان لدرجة الحرارة التي تبعد عن $3$ بمسافة تساوي $2$ تماماً، أي حلول $|x - 3| = 2$ ؟',
					hintAr: 'إما $x - 3 = 2$ أو $x - 3 = -2$ .',
					expectedInput: '1 و 5',
					revealAr: '$x - 3 = 2 \\implies x = 5$ ، أو $x - 3 = -2 \\implies x = 1$ . إذن مجموعة الحلول هي $S = \\{1 ; 5\\}$ .'
				},
				{
					promptAr: 'ترجم المتراجحة $|x - 3| \\leq 2$ إلى حصر لـ $x$ ثم إلى مجال.',
					hintAr: '$|X| \\leq r \\iff -r \\leq X \\leq r$ ثم أضف $3$ إلى جميع الأطراف.',
					expectedInput: '[1, 5]',
					revealAr: '$-2 \\leq x - 3 \\leq 2 \\iff 1 \\leq x \\leq 5 \\iff x \\in [1 ; 5]$ .'
				},
				{
					promptAr: 'عكسياً، إذا كان لدينا المجال $[4 ; 10]$ ، فما مركزه $a$ وما نصف قطره $r$ ؟',
					hintAr: 'المركز $a = \\frac{\\alpha + \\beta}{2}$ ونصف القطر $r = \\frac{\\beta - \\alpha}{2}$ .',
					expectedInput: 'a=7, r=3',
					revealAr: '$a = \\frac{4 + 10}{2} = 7$ و $r = \\frac{10 - 4}{2} = 3$ ، إذن $x \\in [4 ; 10] \\iff |x - 7| \\leq 3$ .'
				},
				{
					promptAr: 'اكتب العبارة $|\\sqrt{5} - 3|$ دون رمز القيمة المطلقة.',
					hintAr: 'قارن $\\sqrt{5}$ و $3$ : بما أن $5 < 9$ فإن $\\sqrt{5} < 3$ ، إذن ما داخل القيمة المطلقة سالب.',
					expectedInput: '3 - sqrt(5)',
					revealAr: 'بما أن $\\sqrt{5} - 3 < 0$ فإن $|\\sqrt{5} - 3| = -(\\sqrt{5} - 3) = 3 - \\sqrt{5}$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**تعريف القيمة المطلقة**: من أجل كل عدد حقيقي $x$ :\n- $|x| = x$ إذا كان $x \\geq 0$ .\n- $|x| = -x$ إذا كان $x < 0$ .\nوتحقق دوماً $|x| \\geq 0$ و $|-x| = |x|$ و $\\sqrt{x^2} = |x|$ .',
				'**المسافة على المستقيم العددي**: المسافة بين العددين الحقيقيين $x$ و $a$ هي $d(x, a) = |x - a|$ .',
				'**حل المعادلة $|x - a| = r$**:\n- إذا كان $r > 0$ : للمعادلة حلان هما $x = a + r$ و $x = a - r$ .\n- إذا كان $r = 0$ : للمعادلة حل وحيد هو $x = a$ .\n- إذا كان $r < 0$ : المعادلة مستحيلة ($S = \\emptyset$).',
				'**حل المتراجحة $|x - a| \\leq r$ ($r > 0$)**:\n$|x - a| \\leq r \\iff a - r \\leq x \\leq a + r \\iff x \\in [a - r ; a + r]$ .\nوفي حالة التباين التام $|x - a| < r$ يصبح المجال مفتوحاً $]a - r ; a + r[$ .',
				'**الانتقال من المجال $[\\alpha ; \\beta]$ إلى القيمة المطلقة**: المركز $a = \\frac{\\alpha + \\beta}{2}$ ونصف القطر $r = \\frac{\\beta - \\alpha}{2}$ ، ويكافئ المجالُ المتراجحةَ $|x - a| \\leq r$ .'
			],
			visualSvg: svgAbsFourRepresentations(),
			visualCaptionAr: 'المكافئات الأربع الأساسية بين المجال والحصر والمسافة والقيمة المطلقة',
			examples: [
				{
					problemAr: 'حل في $\\mathbb{R}$ المعادلة $|x + 2| = 5$ ثم المتراجحة $|x + 2| < 5$.',
					solutionAr:
						'نكتب $x + 2 = x - (-2)$ فالمركز هو $a = -2$ ونصف القطر $r = 5$ .\\n\\n- **المعادلة**: $x + 2 = 5 \\implies x = 3$ أو $x + 2 = -5 \\implies x = -7$ ، إذن $S = \\{-7 ; 3\\}$ .\\n\\n- **المتراجحة**: $|x + 2| < 5 \\iff -5 < x + 2 < 5 \\iff -7 < x < 3$ ، إذن $S = ]-7 ; 3[$ .'
				},
				{
					problemAr: 'اكتب على شكل قيمة مطلقة الانتماء $x \\in [-1 ; 9]$.',
					solutionAr:
						'نحسب المركز $a = \\frac{-1 + 9}{2} = 4$ ونصف القطر $r = \\frac{9 - (-1)}{2} = 5$ .\\n\\nإذن $x \\in [-1 ; 9] \\iff |x - 4| \\leq 5$ .'
				}
			],
			watchOutAr:
				'احذر من الإشارة داخل القيمة المطلقة: في العبارة $|x + 4|$ يكون المركز هو $a = -4$ وليس $+4$ لأن $x + 4 = x - (-4)$ . وكذلك إذا كان الطرف الأيمن سالباً مثل $|x - 2| = -3$ فمجموعة الحلول هي $\\emptyset$ مباشرة لأن القيمة المطلقة لا تكون سالبة أبداً.'
		},
		practice: [
			{
				questionAr: 'ما هي المسافة بين النقطتين $A(-3)$ و $B(5)$ على المستقيم العددي؟',
				options: ['$2$', '$8$', '$-8$', '$4$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'لقد حسبت $5 + (-3)$ بدل حساب الفرق $5 - (-3)$.',
					'إجابة صحيحة! $AB = |5 - (-3)| = |8| = 8$.',
					'المسافة موجبة دائماً ولا يمكن أن تكون سالبة.',
					'العدد $4$ يمثل نصف المسافة (نصف القطر)، وليس المسافة الكاملة.'
				],
				explanationAr: 'المسافة بين $-3$ و $5$ هي $|5 - (-3)| = |5 + 3| = 8$ .'
			},
			{
				questionAr: 'مجموعة حلول المعادلة $|x - 4| = 3$ في $\\mathbb{R}$ هي:',
				options: ['$\\{7\\}$', '$\\{1 ; 7\\}$', '$\\{-7 ; -1\\}$', '$[1 ; 7]$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'أخذت الحل الموجب فقط ونسيت الحالة $x - 4 = -3$.',
					'إجابة صحيحة! $x = 4 + 3 = 7$ و $x = 4 - 3 = 1$، إذن $S = \\{1 ; 7\\}$.',
					'انتبه إلى أن المركز هو $+4$ وليس $-4$.',
					'المجال $[1 ; 7]$ هو حل المتراجحة $|x - 4| \\leq 3$ وليس المعادلة.'
				],
				explanationAr: '$|x - 4| = 3 \\iff x - 4 = 3$ أو $x - 4 = -3$ ، ومنه $x = 7$ أو $x = 1$ .'
			},
			{
				questionAr: 'المجال الموافق للمتراجحة $|x + 1| \\leq 4$ هو:',
				options: ['$[-3 ; 5]$', '$[-5 ; 3]$', '$]-5 ; 3[$', '$[-4 ; 4]$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'انتبه: في $|x + 1|$ المركز هو $a = -1$ وليس $+1$ ، لأن $x + 1 = x - (-1)$.',
					'إجابة صحيحة! $-4 \\leq x + 1 \\leq 4 \\iff -5 \\leq x \\leq 3$ ، أي $[-5 ; 3]$.',
					'المتراجحة تتضمن الرمز $\\leq$ وليس $<$ ، لذا فالمجال مغلق.',
					'نسيت طرح $1$ من أطراف الحصر.'
				],
				explanationAr: 'نكتب $|x + 1| \\leq 4 \\iff -4 \\leq x + 1 \\leq 4 \\iff -5 \\leq x \\leq 3$ ، فالحل هو $[-5 ; 3]$ .'
			},
			{
				questionAr: 'الكتابة البسيطة للعدد $|2 - \\sqrt{7}|$ دون رمز القيمة المطلقة هي:',
				options: ['$2 - \\sqrt{7}$', '$\\sqrt{7} - 2$', '$2 + \\sqrt{7}$', '$\\sqrt{7} + 2$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'بما أن $2^2 = 4 < 7$ فإن $2 < \\sqrt{7}$ ، إذن $2 - \\sqrt{7}$ عدد سالب ولا يمكن أن يساوي قيمة مطلقة.',
					'إجابة صحيحة! بما أن $2 - \\sqrt{7} < 0$ فإن $|2 - \\sqrt{7}| = -(2 - \\sqrt{7}) = \\sqrt{7} - 2$.',
					'القيمة المطلقة لفرق لا تتحول إلى مجموع الحدين إلا إذا كان أحدهما سالباً صراحة.',
					'راجع تعريف $|X| = -X$ عندما يكون $X < 0$.'
				],
				explanationAr: 'لأن $2 = \\sqrt{4} < \\sqrt{7}$ يكون $2 - \\sqrt{7} < 0$ ، وعليه $|2 - \\sqrt{7}| = \\sqrt{7} - 2$ .'
			}
		]
	}
];
