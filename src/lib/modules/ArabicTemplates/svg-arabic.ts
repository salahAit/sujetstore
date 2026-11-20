import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ARABIC_SVG_DIR = process.env.MEDIA_ROOT
	? resolve(process.env.MEDIA_ROOT, 'generated/arabic-svg')
	: existsSync('/var/lib/sujetstore-media')
		? resolve('/var/lib/sujetstore-media/generated/arabic-svg')
		: resolve('static/generated/arabic-svg');

export function saveArabicSvgAsset(filename: string, svgContent: string): string {
	const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/\.svg$/i, '') + '.svg';
	if (!existsSync(ARABIC_SVG_DIR)) {
		mkdirSync(ARABIC_SVG_DIR, { recursive: true });
	}
	const outPath = join(ARABIC_SVG_DIR, safeName);
	writeFileSync(outPath, svgContent.trim() + '\n', 'utf-8');
	return `/generated/arabic-svg/${safeName}`;
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
 * Two-pass white halo text helper (never relies on CSS paint-order, which Typst usvg ignores).
 */
export function haloText(attrs: string, color: string, text: string): string {
	const inner = esc(text);
	return (
		`<text ${attrs} fill="#ffffff" stroke="#ffffff" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round">${inner}</text>` +
		`<text ${attrs} fill="${color}">${inner}</text>`
	);
}

function sanitizeRawSvgTextNodes(body: string): string {
	return body.replace(/(<text\b[^>]*>)([\s\S]*?)(<\/text>)/g, (_m, open, inner, close) => {
		let cleaned = inner
			.replaceAll('✓', '(+)')
			.replaceAll('✔', '(+)')
			.replaceAll('✕', '×')
			.replaceAll('✖', '×')
			.replaceAll('←', '<-')
			.replaceAll('→', '->')
			.replaceAll('•', '-');
		if (/[₀-₉₊₋⁰-⁹⁺⁻]/.test(cleaned)) {
			cleaned = cleaned.replace(
				/([₀-₉₊₋]+|[⁰-⁹⁺⁻]+)/g,
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

export function wrapArabicSvg(width: number, height: number, body: string): string {
	const safeBody = sanitizeRawSvgTextNodes(body);
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" font-family="Arabic Transparent" style="background:#ffffff;font-family:'Arabic Transparent',Arial,sans-serif">${safeBody}</svg>`;
}

/**
 * 1. Grammar / Morphology Mind-Map Tree (خريطة ذهنية نحوية أو صرفية)
 * Root box on top, 2 to 4 color-coded branches below with concise rules & crisp example.
 */
export function svgGrammarTree(opts: {
	title: string;
	rootLabel: string;
	rootSub?: string;
	branches: Array<{
		label: string;
		detail: string;
		example?: string;
		color?: string;
	}>;
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 520;
	const h = opts.height ?? 255;
	const palette = ['#1d4ed8', '#047857', '#b45309', '#7c3aed'];
	const count = Math.max(1, Math.min(opts.branches.length, 4));
	const marginX = 16;
	const gap = 12;
	const cardW = (w - marginX * 2 - gap * (count - 1)) / count;
	const rootW = 240;
	const rootX = (w - rootW) / 2;
	const rootY = 38;
	const rootH = opts.rootSub ? 46 : 36;
	const branchTopY = rootY + rootH + 34;
	const branchH = h - branchTopY - 14;

	let body = `<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>`;
	body += `<text x="${w / 2}" y="24" text-anchor="middle" font-size="14" font-weight="bold" fill="#0f172a">${esc(opts.title)}</text>`;

	// Root node
	body += `<rect x="${rootX}" y="${rootY}" width="${rootW}" height="${rootH}" rx="8" fill="#1e3a8a" stroke="#1e40af" stroke-width="1.4"/>`;
	body += `<text x="${w / 2}" y="${rootY + (opts.rootSub ? 20 : 23)}" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#ffffff">${esc(opts.rootLabel)}</text>`;
	if (opts.rootSub) {
		body += `<text x="${w / 2}" y="${rootY + 37}" text-anchor="middle" font-size="11" fill="#dbeafe">${esc(opts.rootSub)}</text>`;
	}

	// Trunk + horizontal connector
	const midY = rootY + rootH + 17;
	body += `<line x1="${w / 2}" y1="${rootY + rootH}" x2="${w / 2}" y2="${midY}" stroke="#64748b" stroke-width="1.8"/>`;

	// Place branches RTL (index 0 on the right!)
	const centers: number[] = [];
	for (let i = 0; i < count; i++) {
		const x = w - marginX - (i + 1) * cardW - i * gap;
		centers.push(x + cardW / 2);
	}
	if (centers.length > 1) {
		const minC = Math.min(...centers);
		const maxC = Math.max(...centers);
		body += `<line x1="${minC}" y1="${midY}" x2="${maxC}" y2="${midY}" stroke="#64748b" stroke-width="1.8"/>`;
	}

	opts.branches.slice(0, count).forEach((b, i) => {
		const col = b.color ?? palette[i % palette.length];
		const x = w - marginX - (i + 1) * cardW - i * gap;
		const cx = x + cardW / 2;

		body += `<line x1="${cx}" y1="${midY}" x2="${cx}" y2="${branchTopY}" stroke="${col}" stroke-width="1.8"/>`;
		body += `<polygon points="${cx - 4.5},${branchTopY - 5} ${cx + 4.5},${branchTopY - 5} ${cx},${branchTopY}" fill="${col}"/>`;

		body += `<rect x="${x}" y="${branchTopY}" width="${cardW}" height="${branchH}" rx="8" fill="#ffffff" stroke="${col}" stroke-width="1.4"/>`;
		body += `<rect x="${x}" y="${branchTopY}" width="${cardW}" height="28" rx="8" fill="${col}"/>`;
		body += `<rect x="${x}" y="${branchTopY + 18}" width="${cardW}" height="10" fill="${col}"/>`;
		body += `<text x="${cx}" y="${branchTopY + 19}" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#ffffff">${esc(b.label)}</text>`;
		body += `<text x="${cx}" y="${branchTopY + 50}" text-anchor="middle" font-size="11.5" fill="#1e293b">${esc(b.detail)}</text>`;
		if (b.example) {
			body += `<rect x="${x + 8}" y="${branchTopY + branchH - 34}" width="${cardW - 16}" height="24" rx="5" fill="#f1f5f9"/>`;
			body += `<text x="${cx}" y="${branchTopY + branchH - 18}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="${col}">${esc(b.example)}</text>`;
		}
	});

	return wrapArabicSvg(w, h, body);
}

/**
 * 2. Visual Sentence Parsing Diagram (بطاقة إعراب تخطيطية بصرية)
 * Displays an Arabic sentence split into colored word tokens (RTL) with grammatical function & case below each token.
 */
export function svgIrabBox(opts: {
	title: string;
	tokens: Array<{
		word: string;
		role: string;
		sign: string;
		color?: string;
	}>;
	note?: string;
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 520;
	const h = opts.height ?? 195;
	const palette = ['#1d4ed8', '#047857', '#b45309', '#7c3aed', '#be123c'];
	const n = Math.max(1, Math.min(opts.tokens.length, 5));
	const padX = 18;
	const gap = 10;
	const boxW = (w - padX * 2 - gap * (n - 1)) / n;

	let body = `<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="10" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2"/>`;
	body += `<rect x="4" y="4" width="${w - 8}" height="32" rx="10" fill="#0f172a"/>`;
	body += `<rect x="4" y="22" width="${w - 8}" height="14" fill="#0f172a"/>`;
	body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#ffffff">${esc(opts.title)}</text>`;

	opts.tokens.slice(0, n).forEach((t, i) => {
		const col = t.color ?? palette[i % palette.length];
		// RTL ordering: token 0 on far right
		const x = w - padX - (i + 1) * boxW - i * gap;
		const cx = x + boxW / 2;

		body += `<rect x="${x}" y="48" width="${boxW}" height="36" rx="7" fill="${col}" fill-opacity="0.12" stroke="${col}" stroke-width="1.5"/>`;
		body += `<text x="${cx}" y="71" text-anchor="middle" font-size="15" font-weight="bold" fill="${col}">${esc(t.word)}</text>`;
		body += `<line x1="${cx}" y1="84" x2="${cx}" y2="104" stroke="${col}" stroke-width="1.5"/>`;
		body += `<polygon points="${cx - 4},${99} ${cx + 4},${99} ${cx},${105}" fill="${col}"/>`;
		body += `<rect x="${x}" y="106" width="${boxW}" height="48" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.1"/>`;
		body += `<text x="${cx}" y="126" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">${esc(t.role)}</text>`;
		body += `<text x="${cx}" y="145" text-anchor="middle" font-size="11" fill="#475569">${esc(t.sign)}</text>`;
	});

	if (opts.note) {
		body += `<text x="${w / 2}" y="${h - 14}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#334155">${esc(opts.note)}</text>`;
	}

	return wrapArabicSvg(w, h, body);
}

/**
 * 3. Rhetoric / Imagery Analysis Schema (مخطط البلاغة والصور البيانية والمحسنات)
 */
export function svgBalaghaSchema(opts: {
	title: string;
	figureType: string;
	expression: string;
	elements: Array<{ label: string; value: string; color?: string }>;
	effect: string;
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 520;
	const h = opts.height ?? 230;
	const palette = ['#0369a1', '#047857', '#b45309', '#7c3aed'];
	const n = Math.max(1, Math.min(opts.elements.length, 4));
	const padX = 18;
	const gap = 10;
	const boxW = (w - padX * 2 - gap * (n - 1)) / n;

	let body = `<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="10" fill="#fefce8" stroke="#ca8a04" stroke-width="1.2"/>`;
	body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#854d0e">${esc(opts.title)} — ${esc(opts.figureType)}</text>`;

	body += `<rect x="34" y="36" width="${w - 68}" height="34" rx="7" fill="#ffffff" stroke="#eab308" stroke-width="1.3"/>`;
	body += `<text x="${w / 2}" y="58" text-anchor="middle" font-size="14" font-weight="bold" fill="#0f172a">${esc(opts.expression)}</text>`;

	opts.elements.slice(0, n).forEach((el, i) => {
		const col = el.color ?? palette[i % palette.length];
		const x = w - padX - (i + 1) * boxW - i * gap;
		const cx = x + boxW / 2;

		body += `<line x1="${cx}" y1="70" x2="${cx}" y2="90" stroke="${col}" stroke-width="1.4"/>`;
		body += `<rect x="${x}" y="90" width="${boxW}" height="64" rx="7" fill="#ffffff" stroke="${col}" stroke-width="1.4"/>`;
		body += `<text x="${cx}" y="112" text-anchor="middle" font-size="11.5" font-weight="bold" fill="${col}">${esc(el.label)}</text>`;
		body += `<line x1="${x + 10}" y1="120" x2="${x + boxW - 10}" y2="120" stroke="#e2e8f0" stroke-width="1"/>`;
		body += `<text x="${cx}" y="140" text-anchor="middle" font-size="12" fill="#1e293b">${esc(el.value)}</text>`;
	});

	body += `<rect x="24" y="${h - 52}" width="${w - 48}" height="36" rx="7" fill="#047857"/>`;
	body += `<text x="${w / 2}" y="${h - 29}" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#ffffff">أثرها في المعنى: ${esc(opts.effect)}</text>`;

	return wrapArabicSvg(w, h, body);
}

/**
 * 4. Prosody Scansion Diagram (مخطط التقطيع العروضي والبحور الشعرية — للآداب واللغات)
 */
export function svgArudMeter(opts: {
	meterName: string;
	keyVerse?: string;
	feet: Array<{ arudText: string; symbols: string; tafila: string }>;
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 520;
	const h = opts.height ?? 215;
	const n = Math.max(1, Math.min(opts.feet.length, 4));
	const padX = 16;
	const gap = 10;
	const boxW = (w - padX * 2 - gap * (n - 1)) / n;

	let body = `<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="10" fill="#f8fafc" stroke="#475569" stroke-width="1.2"/>`;
	body += `<rect x="4" y="4" width="${w - 8}" height="34" rx="10" fill="#1e293b"/>`;
	body += `<rect x="4" y="24" width="${w - 8}" height="14" fill="#1e293b"/>`;
	body += `<text x="${w / 2}" y="26" text-anchor="middle" font-size="14" font-weight="bold" fill="#ffffff">التقطيع العروضي — ${esc(opts.meterName)}</text>`;

	if (opts.keyVerse) {
		body += `<text x="${w / 2}" y="58" text-anchor="middle" font-size="12.5" fill="#334155">${esc(opts.keyVerse)}</text>`;
	}

	const topY = opts.keyVerse ? 70 : 52;
	const boxH = h - topY - 18;
	opts.feet.slice(0, n).forEach((f, i) => {
		const x = w - padX - (i + 1) * boxW - i * gap;
		const cx = x + boxW / 2;

		body += `<rect x="${x}" y="${topY}" width="${boxW}" height="${boxH}" rx="7" fill="#ffffff" stroke="#1d4ed8" stroke-width="1.3"/>`;
		body += `<text x="${cx}" y="${topY + 26}" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${esc(f.arudText)}</text>`;
		body += `<line x1="${x + 10}" y1="${topY + 38}" x2="${x + boxW - 10}" y2="${topY + 38}" stroke="#e2e8f0" stroke-width="1"/>`;
		body += `<text x="${cx}" y="${topY + 62}" text-anchor="middle" font-size="14" font-weight="bold" fill="#b45309">${esc(f.symbols)}</text>`;
		body += `<rect x="${x + 8}" y="${topY + boxH - 36}" width="${boxW - 16}" height="26" rx="5" fill="#eff6ff" stroke="#93c5fd" stroke-width="1"/>`;
		body += `<text x="${cx}" y="${topY + boxH - 18}" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#1d4ed8">${esc(f.tafila)}</text>`;
	});

	return wrapArabicSvg(w, h, body);
}

/**
 * 5. Text Pattern & Indicators Map (خريطة أنماط النصوص ومؤشراتها)
 */
export function svgTextPatternMap(opts: {
	title: string;
	patternName: string;
	goal: string;
	indicators: string[];
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 520;
	const items = opts.indicators.slice(0, 5);
	const h = opts.height ?? Math.max(190, 92 + items.length * 28);

	let body = `<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="10" fill="#f0fdf4" stroke="#15803d" stroke-width="1.2"/>`;
	body += `<rect x="4" y="4" width="${w - 8}" height="34" rx="10" fill="#15803d"/>`;
	body += `<rect x="4" y="24" width="${w - 8}" height="14" fill="#15803d"/>`;
	body += `<text x="${w / 2}" y="26" text-anchor="middle" font-size="14" font-weight="bold" fill="#ffffff">${esc(opts.title)}: ${esc(opts.patternName)}</text>`;

	body += `<rect x="20" y="48" width="${w - 40}" height="28" rx="6" fill="#dcfce7" stroke="#86efac" stroke-width="1"/>`;
	body += `<text x="${w / 2}" y="66" text-anchor="middle" font-size="12" font-weight="bold" fill="#166534">الهدف: ${esc(opts.goal)}</text>`;

	items.forEach((ind, idx) => {
		const y = 90 + idx * 27;
		body += `<circle cx="${w - 28}" cy="${y + 8}" r="9" fill="#15803d"/>`;
		body += `<text x="${w - 28}" y="${y + 12}" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">${idx + 1}</text>`;
		body += `<text x="${w - 46}" y="${y + 12}" text-anchor="end" font-size="12.5" fill="#1e293b">${esc(ind)}</text>`;
	});

	return wrapArabicSvg(w, h, body);
}

/**
 * 6. Literary History Timeline (خط زمني للعصور والمدارس الأدبية)
 */
export function svgLiteraryTimeline(opts: {
	title: string;
	eras: Array<{ name: string; period: string; landmark: string; color?: string }>;
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 520;
	const h = opts.height ?? 195;
	const palette = ['#1d4ed8', '#047857', '#b45309', '#7c3aed', '#0f766e'];
	const n = Math.max(1, Math.min(opts.eras.length, 5));
	const padX = 24;
	const span = w - padX * 2;
	const lineY = 92;

	let body = `<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>`;
	body += `<text x="${w / 2}" y="26" text-anchor="middle" font-size="14" font-weight="bold" fill="#0f172a">${esc(opts.title)}</text>`;
	body += `<line x1="${padX}" y1="${lineY}" x2="${w - padX}" y2="${lineY}" stroke="#64748b" stroke-width="2.6"/>`;
	// RTL arrow on far left
	body += `<polygon points="${padX - 6},${lineY} ${padX + 4},${lineY - 5} ${padX + 4},${lineY + 5}" fill="#64748b"/>`;

	opts.eras.slice(0, n).forEach((era, i) => {
		const col = era.color ?? palette[i % palette.length];
		const frac = n === 1 ? 0.5 : i / (n - 1);
		// RTL: earliest era (index 0) on the right
		const cx = w - padX - 36 - frac * (span - 72);

		body += `<circle cx="${cx}" cy="${lineY}" r="9" fill="${col}" stroke="#ffffff" stroke-width="2"/>`;
		body += `<text x="${cx}" y="${lineY + 3.5}" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">${i + 1}</text>`;
		body += `<text x="${cx}" y="${lineY - 30}" text-anchor="middle" font-size="12" font-weight="bold" fill="${col}">${esc(era.name)}</text>`;
		body += `<text x="${cx}" y="${lineY - 14}" text-anchor="middle" font-size="10.5" fill="#64748b">${esc(era.period)}</text>`;
		body += `<rect x="${cx - 44}" y="${lineY + 18}" width="88" height="44" rx="6" fill="#f8fafc" stroke="${col}" stroke-width="1"/>`;
		body += `<text x="${cx}" y="${lineY + 44}" text-anchor="middle" font-size="10.8" fill="#1e293b">${esc(era.landmark)}</text>`;
	});

	return wrapArabicSvg(w, h, body);
}

/**
 * 7. Visual Spelling / Orthography Card (بطاقة إملاء بصرية واضحة)
 */
export function svgSpellingCard(opts: {
	title: string;
	ruleSummary: string;
	cases: Array<{ condition: string; examples: string; color?: string }>;
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 520;
	const rows = opts.cases.slice(0, 4);
	const h = opts.height ?? Math.max(185, 86 + rows.length * 36);
	const palette = ['#1d4ed8', '#047857', '#b45309', '#7c3aed'];

	let body = `<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>`;
	body += `<rect x="4" y="4" width="${w - 8}" height="32" rx="10" fill="#1d4ed8"/>`;
	body += `<rect x="4" y="22" width="${w - 8}" height="14" fill="#1d4ed8"/>`;
	body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#ffffff">${esc(opts.title)}</text>`;
	body += `<text x="${w / 2}" y="56" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e3a8a">${esc(opts.ruleSummary)}</text>`;

	rows.forEach((c, i) => {
		const col = c.color ?? palette[i % palette.length];
		const y = 70 + i * 35;
		body += `<rect x="16" y="${y}" width="${w - 32}" height="28" rx="6" fill="#ffffff" stroke="${col}" stroke-width="1.2"/>`;
		body += `<rect x="${w - 196}" y="${y}" width="180" height="28" rx="6" fill="${col}"/>`;
		body += `<text x="${w - 106}" y="${y + 18}" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">${esc(c.condition)}</text>`;
		body += `<text x="${(w - 212) / 2 + 16}" y="${y + 18}" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">${esc(c.examples)}</text>`;
	});

	return wrapArabicSvg(w, h, body);
}

/**
 * 8. Primary Arabic Colorful Learning Cards (بطاقات ملونة للطور الابتدائي: حروف، مدود، أقسام الكلمة، جمل)
 */
export function svgPrimaryArabicVisual(opts: {
	title: string;
	subtitle?: string;
	cards: Array<{ bigText: string; label: string; color?: string }>;
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 500;
	const h = opts.height ?? 185;
	const palette = ['#2563eb', '#059669', '#d97706', '#7c3aed', '#dc2626'];
	const n = Math.max(1, Math.min(opts.cards.length, 5));
	const padX = 16;
	const gap = 10;
	const cardW = (w - padX * 2 - gap * (n - 1)) / n;

	let body = `<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="12" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/>`;
	body += `<text x="${w / 2}" y="28" text-anchor="middle" font-size="15" font-weight="bold" fill="#92400e">${esc(opts.title)}</text>`;
	if (opts.subtitle) {
		body += `<text x="${w / 2}" y="47" text-anchor="middle" font-size="12" fill="#78350f">${esc(opts.subtitle)}</text>`;
	}

	const topY = opts.subtitle ? 60 : 44;
	const cardH = h - topY - 16;
	opts.cards.slice(0, n).forEach((card, i) => {
		const col = card.color ?? palette[i % palette.length];
		// RTL ordering
		const x = w - padX - (i + 1) * cardW - i * gap;
		const cx = x + cardW / 2;

		body += `<rect x="${x}" y="${topY}" width="${cardW}" height="${cardH}" rx="10" fill="#ffffff" stroke="${col}" stroke-width="1.8"/>`;
		body += `<rect x="${x}" y="${topY + cardH - 30}" width="${cardW}" height="30" rx="8" fill="${col}"/>`;
		body += `<text x="${cx}" y="${topY + (cardH - 30) / 2 + 8}" text-anchor="middle" font-size="22" font-weight="bold" fill="${col}">${esc(card.bigText)}</text>`;
		body += `<text x="${cx}" y="${topY + cardH - 10}" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">${esc(card.label)}</text>`;
	});

	return wrapArabicSvg(w, h, body);
}
