import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ENGLISH_SVG_DIR = process.env.MEDIA_ROOT
	? resolve(process.env.MEDIA_ROOT, 'generated/english-svg')
	: existsSync('/var/lib/sujetstore-media')
		? resolve('/var/lib/sujetstore-media/generated/english-svg')
		: resolve('static/generated/english-svg');

export function saveEnglishSvgAsset(filename: string, svgContent: string): string {
	const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/\.svg$/i, '') + '.svg';
	if (!existsSync(ENGLISH_SVG_DIR)) {
		mkdirSync(ENGLISH_SVG_DIR, { recursive: true });
	}
	const outPath = join(ENGLISH_SVG_DIR, safeName);
	writeFileSync(outPath, svgContent.trim() + '\n', 'utf-8');
	return `/generated/english-svg/${safeName}`;
}

export function esc(str: string): string {
	return str
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

export function haloText(attrs: string, color: string, text: string): string {
	const inner = esc(text);
	return (
		`<text ${attrs} fill="#ffffff" stroke="#ffffff" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round">${inner}</text>` +
		`<text ${attrs} fill="${color}">${inner}</text>`
	);
}

function sanitizeRawSvgTextNodes(body: string): string {
	return body.replace(/(<text\b[^>]*>)([\s\S]*?)(<\/text>)/g, (_m, open, inner, close) => {
		const cleaned = inner
			.replaceAll('✓', '(+)')
			.replaceAll('✔', '(+)')
			.replaceAll('✕', 'x')
			.replaceAll('✖', 'x')
			.replaceAll('→', '->')
			.replaceAll('←', '<-')
			.replaceAll('•', '-');
		return `${open}${cleaned}${close}`;
	});
}

export function wrapEnglishSvg(width: number, height: number, body: string): string {
	const safeBody = sanitizeRawSvgTextNodes(body);
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" font-family="Arial, 'Arabic Transparent', sans-serif" style="background:#ffffff;font-family:Arial,'Arabic Transparent',sans-serif">${safeBody}</svg>`;
}

/**
 * 1. Visual English Tense Timeline (Past -> Present -> Future)
 */
export function svgEnglishTenseTimeline(opts: {
	title: string;
	tenseName: string;
	formula: string;
	activeZone: 'past' | 'present' | 'future' | 'past_to_present' | 'two_past';
	example: string;
	markers: string;
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 520;
	const h = opts.height ?? 215;
	const lineY = 104;

	let body = `<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>`;
	body += `<rect x="4" y="4" width="${w - 8}" height="32" rx="10" fill="#1e3a8a"/>`;
	body += `<rect x="4" y="22" width="${w - 8}" height="14" fill="#1e3a8a"/>`;
	body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#ffffff">${esc(opts.title)} — ${esc(opts.tenseName)}</text>`;

	body += `<rect x="28" y="44" width="${w - 56}" height="24" rx="6" fill="#eff6ff" stroke="#93c5fd" stroke-width="1"/>`;
	body += `<text x="${w / 2}" y="60" text-anchor="middle" font-size="12" font-weight="bold" fill="#1d4ed8">Formula: ${esc(opts.formula)}</text>`;

	// Timeline axis
	body += `<line x1="40" y1="${lineY}" x2="${w - 40}" y2="${lineY}" stroke="#64748b" stroke-width="2.4"/>`;
	body += `<polygon points="${w - 34},${lineY} ${w - 44},${lineY - 5} ${w - 44},${lineY + 5}" fill="#64748b"/>`;

	// Zones
	const xPast = 115;
	const xNow = w / 2;
	const xFut = w - 115;
	body += `<line x1="${xNow}" y1="${lineY - 18}" x2="${xNow}" y2="${lineY + 18}" stroke="#0f172a" stroke-width="2" stroke-dasharray="3,2"/>`;
	body += `<text x="${xPast}" y="${lineY + 30}" text-anchor="middle" font-size="11" font-weight="bold" fill="#475569">PAST</text>`;
	body += `<text x="${xNow}" y="${lineY + 30}" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">NOW</text>`;
	body += `<text x="${xFut}" y="${lineY + 30}" text-anchor="middle" font-size="11" font-weight="bold" fill="#475569">FUTURE</text>`;

	if (opts.activeZone === 'past') {
		body += `<circle cx="${xPast}" cy="${lineY}" r="9" fill="#2563eb" stroke="#ffffff" stroke-width="2"/>`;
	} else if (opts.activeZone === 'present') {
		body += `<circle cx="${xNow}" cy="${lineY}" r="9" fill="#059669" stroke="#ffffff" stroke-width="2"/>`;
	} else if (opts.activeZone === 'future') {
		body += `<circle cx="${xFut}" cy="${lineY}" r="9" fill="#d97706" stroke="#ffffff" stroke-width="2"/>`;
	} else if (opts.activeZone === 'past_to_present') {
		body += `<rect x="${xPast}" y="${lineY - 6}" width="${xNow - xPast}" height="12" rx="6" fill="#059669" fill-opacity="0.3" stroke="#059669" stroke-width="1.5"/>`;
		body += `<circle cx="${xPast}" cy="${lineY}" r="7" fill="#059669"/>`;
		body += `<circle cx="${xNow}" cy="${lineY}" r="7" fill="#059669"/>`;
	} else {
		body += `<circle cx="${xPast - 30}" cy="${lineY}" r="8" fill="#7c3aed"/>`;
		body += `<text x="${xPast - 30}" y="${lineY - 14}" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#7c3aed">1st Action</text>`;
		body += `<circle cx="${xPast + 45}" cy="${lineY}" r="8" fill="#2563eb"/>`;
		body += `<text x="${xPast + 45}" y="${lineY - 14}" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#2563eb">2nd Action</text>`;
	}

	body += `<rect x="20" y="${h - 62}" width="${w - 40}" height="24" rx="5" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>`;
	body += `<text x="${w / 2}" y="${h - 46}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">${esc(opts.example)}</text>`;
	body += `<text x="${w / 2}" y="${h - 18}" text-anchor="middle" font-size="10.8" fill="#475569">Time markers: ${esc(opts.markers)}</text>`;

	return wrapEnglishSvg(w, h, body);
}

/**
 * 2. Visual English Grammar Transformation / Connector Map (Conditionals, Passive, Reported Speech, Connectors)
 */
export function svgEnglishGrammarMap(opts: {
	title: string;
	rootLabel: string;
	rootSub?: string;
	branches: Array<{ label: string; rule: string; example: string; color?: string }>;
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 520;
	const h = opts.height ?? 255;
	const palette = ['#1d4ed8', '#047857', '#b45309', '#7c3aed'];
	const count = Math.max(1, Math.min(opts.branches.length, 4));
	const padX = 14;
	const gap = 10;
	const cardW = (w - padX * 2 - gap * (count - 1)) / count;
	const rootW = 260;
	const rootX = (w - rootW) / 2;
	const rootY = 36;
	const rootH = opts.rootSub ? 44 : 34;
	const branchTopY = rootY + rootH + 30;
	const branchH = h - branchTopY - 12;

	let body = `<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>`;
	body += `<text x="${w / 2}" y="23" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#0f172a">${esc(opts.title)}</text>`;

	body += `<rect x="${rootX}" y="${rootY}" width="${rootW}" height="${rootH}" rx="8" fill="#1e3a8a"/>`;
	body += `<text x="${w / 2}" y="${rootY + (opts.rootSub ? 19 : 22)}" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#ffffff">${esc(opts.rootLabel)}</text>`;
	if (opts.rootSub) {
		body += `<text x="${w / 2}" y="${rootY + 35}" text-anchor="middle" font-size="10.5" fill="#dbeafe">${esc(opts.rootSub)}</text>`;
	}

	const midY = rootY + rootH + 15;
	body += `<line x1="${w / 2}" y1="${rootY + rootH}" x2="${w / 2}" y2="${midY}" stroke="#64748b" stroke-width="1.6"/>`;

	const centers: number[] = [];
	for (let i = 0; i < count; i++) {
		centers.push(padX + i * (cardW + gap) + cardW / 2);
	}
	if (centers.length > 1) {
		body += `<line x1="${centers[0]}" y1="${midY}" x2="${centers[centers.length - 1]}" y2="${midY}" stroke="#64748b" stroke-width="1.6"/>`;
	}

	opts.branches.slice(0, count).forEach((b, i) => {
		const col = b.color ?? palette[i % palette.length];
		const x = padX + i * (cardW + gap);
		const cx = x + cardW / 2;

		body += `<line x1="${cx}" y1="${midY}" x2="${cx}" y2="${branchTopY}" stroke="${col}" stroke-width="1.6"/>`;
		body += `<rect x="${x}" y="${branchTopY}" width="${cardW}" height="${branchH}" rx="8" fill="#ffffff" stroke="${col}" stroke-width="1.4"/>`;
		body += `<rect x="${x}" y="${branchTopY}" width="${cardW}" height="26" rx="8" fill="${col}"/>`;
		body += `<rect x="${x}" y="${branchTopY + 16}" width="${cardW}" height="10" fill="${col}"/>`;
		body += `<text x="${cx}" y="${branchTopY + 17}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#ffffff">${esc(b.label)}</text>`;
		body += `<text x="${cx}" y="${branchTopY + 50}" text-anchor="middle" font-size="10.8" fill="#1e293b">${esc(b.rule)}</text>`;
		body += `<rect x="${x + 6}" y="${branchTopY + branchH - 36}" width="${cardW - 12}" height="26" rx="5" fill="#f1f5f9"/>`;
		body += `<text x="${cx}" y="${branchTopY + branchH - 19}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${col}">${esc(b.example)}</text>`;
	});

	return wrapEnglishSvg(w, h, body);
}

/**
 * 3. Visual English Phonetics & Pronunciation Rules Card (Final -ed, Final -s, Stress, Silent Letters)
 */
export function svgEnglishPhoneticsChart(opts: {
	title: string;
	subtitle?: string;
	columns: Array<{ sound: string; rule: string; examples: string; color?: string }>;
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 520;
	const h = opts.height ?? 210;
	const palette = ['#1d4ed8', '#047857', '#b45309'];
	const n = Math.max(1, Math.min(opts.columns.length, 3));
	const padX = 16;
	const gap = 12;
	const colW = (w - padX * 2 - gap * (n - 1)) / n;

	let body = `<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="10" fill="#fefce8" stroke="#ca8a04" stroke-width="1.2"/>`;
	body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#854d0e">${esc(opts.title)}</text>`;
	if (opts.subtitle) {
		body += `<text x="${w / 2}" y="43" text-anchor="middle" font-size="11" fill="#713f12">${esc(opts.subtitle)}</text>`;
	}

	const topY = opts.subtitle ? 54 : 38;
	const boxH = h - topY - 14;
	opts.columns.slice(0, n).forEach((c, i) => {
		const col = c.color ?? palette[i % palette.length];
		const x = padX + i * (colW + gap);
		const cx = x + colW / 2;

		body += `<rect x="${x}" y="${topY}" width="${colW}" height="${boxH}" rx="8" fill="#ffffff" stroke="${col}" stroke-width="1.5"/>`;
		body += `<rect x="${x}" y="${topY}" width="${colW}" height="32" rx="8" fill="${col}"/>`;
		body += `<rect x="${x}" y="${topY + 22}" width="${colW}" height="10" fill="${col}"/>`;
		body += `<text x="${cx}" y="${topY + 21}" text-anchor="middle" font-size="15" font-weight="bold" fill="#ffffff">${esc(c.sound)}</text>`;
		body += `<text x="${cx}" y="${topY + 58}" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e293b">${esc(c.rule)}</text>`;
		body += `<rect x="${x + 8}" y="${topY + boxH - 42}" width="${colW - 16}" height="30" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>`;
		body += `<text x="${cx}" y="${topY + boxH - 23}" text-anchor="middle" font-size="10.8" fill="${col}" font-weight="bold">${esc(c.examples)}</text>`;
	});

	return wrapEnglishSvg(w, h, body);
}

/**
 * 4. Visual Word Formation Tree (Prefix + Root + Suffix)
 */
export function svgEnglishWordFormation(opts: {
	title: string;
	prefix: string;
	root: string;
	suffix: string;
	derivedWord: string;
	meaningNote: string;
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 520;
	const h = opts.height ?? 185;

	let body = `<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2"/>`;
	body += `<text x="${w / 2}" y="26" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#0f172a">${esc(opts.title)}</text>`;

	const boxes = [
		{ x: 26, label: 'Prefix', val: opts.prefix || '—', col: '#b45309' },
		{ x: 190, label: 'Root', val: opts.root, col: '#1d4ed8' },
		{ x: 354, label: 'Suffix', val: opts.suffix || '—', col: '#047857' }
	];
	for (const b of boxes) {
		body += `<rect x="${b.x}" y="40" width="140" height="54" rx="8" fill="#ffffff" stroke="${b.col}" stroke-width="1.5"/>`;
		body += `<text x="${b.x + 70}" y="58" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${b.col}">${b.label}</text>`;
		body += `<text x="${b.x + 70}" y="82" text-anchor="middle" font-size="15" font-weight="bold" fill="#0f172a">${esc(b.val)}</text>`;
	}
	body += `<text x="178" y="72" text-anchor="middle" font-size="16" font-weight="bold" fill="#64748b">+</text>`;
	body += `<text x="342" y="72" text-anchor="middle" font-size="16" font-weight="bold" fill="#64748b">+</text>`;

	body += `<rect x="70" y="114" width="${w - 140}" height="32" rx="7" fill="#1e3a8a"/>`;
	body += `<text x="${w / 2}" y="135" text-anchor="middle" font-size="14" font-weight="bold" fill="#ffffff">${esc(opts.derivedWord)}</text>`;
	body += `<text x="${w / 2}" y="${h - 14}" text-anchor="middle" font-size="11" fill="#334155">${esc(opts.meaningNote)}</text>`;

	return wrapEnglishSvg(w, h, body);
}

/**
 * 5. Primary English Colorful Flashcards (3AP-5AP Vocabulary, Phonics, Jobs, Seasons, Algerian Cities)
 */
export function svgEnglishPrimaryCards(opts: {
	title: string;
	subtitle?: string;
	cards: Array<{ word: string; arabic: string; color?: string }>;
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 500;
	const h = opts.height ?? 185;
	const palette = ['#2563eb', '#059669', '#d97706', '#7c3aed', '#0284c7'];
	const n = Math.max(1, Math.min(opts.cards.length, 5));
	const padX = 14;
	const gap = 10;
	const cardW = (w - padX * 2 - gap * (n - 1)) / n;

	let body = `<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="12" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>`;
	body += `<text x="${w / 2}" y="27" text-anchor="middle" font-size="14.5" font-weight="bold" fill="#1e3a8a">${esc(opts.title)}</text>`;
	if (opts.subtitle) {
		body += `<text x="${w / 2}" y="46" text-anchor="middle" font-size="11.5" fill="#1e40af">${esc(opts.subtitle)}</text>`;
	}

	const topY = opts.subtitle ? 58 : 42;
	const cardH = h - topY - 14;
	opts.cards.slice(0, n).forEach((card, i) => {
		const col = card.color ?? palette[i % palette.length];
		const x = padX + i * (cardW + gap);
		const cx = x + cardW / 2;

		body += `<rect x="${x}" y="${topY}" width="${cardW}" height="${cardH}" rx="10" fill="#ffffff" stroke="${col}" stroke-width="1.6"/>`;
		body += `<rect x="${x}" y="${topY + cardH - 30}" width="${cardW}" height="30" rx="8" fill="${col}"/>`;
		body += `<text x="${cx}" y="${topY + (cardH - 30) / 2 + 6}" text-anchor="middle" font-size="14" font-weight="bold" fill="${col}">${esc(card.word)}</text>`;
		body += `<text x="${cx}" y="${topY + cardH - 10}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#ffffff">${esc(card.arabic)}</text>`;
	});

	return wrapEnglishSvg(w, h, body);
}

/**
 * 6. Visual Writing Blueprint (Paragraph / Essay / Formal Letter / Report Structure)
 */
export function svgEnglishWritingStructure(opts: {
	title: string;
	steps: Array<{ stage: string; detail: string; color?: string }>;
	width?: number;
	height?: number;
}): string {
	const w = opts.width ?? 520;
	const items = opts.steps.slice(0, 4);
	const h = opts.height ?? Math.max(180, 62 + items.length * 38);
	const palette = ['#1d4ed8', '#047857', '#b45309', '#7c3aed'];

	let body = `<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="10" fill="#f0fdf4" stroke="#15803d" stroke-width="1.2"/>`;
	body += `<rect x="4" y="4" width="${w - 8}" height="32" rx="10" fill="#15803d"/>`;
	body += `<rect x="4" y="22" width="${w - 8}" height="14" fill="#15803d"/>`;
	body += `<text x="${w / 2}" y="25" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#ffffff">${esc(opts.title)}</text>`;

	items.forEach((st, idx) => {
		const col = st.color ?? palette[idx % palette.length];
		const y = 48 + idx * 36;
		body += `<rect x="16" y="${y}" width="${w - 32}" height="28" rx="6" fill="#ffffff" stroke="${col}" stroke-width="1.3"/>`;
		body += `<rect x="16" y="${y}" width="150" height="28" rx="6" fill="${col}"/>`;
		body += `<text x="91" y="${y + 18}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#ffffff">${idx + 1}. ${esc(st.stage)}</text>`;
		body += `<text x="178" y="${y + 18}" text-anchor="start" font-size="11.2" fill="#0f172a">${esc(st.detail)}</text>`;
	});

	return wrapEnglishSvg(w, h, body);
}
