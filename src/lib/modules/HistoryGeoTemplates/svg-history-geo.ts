import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

/**
 * Precision RTL Arabic SVG Visual Builders for History & Geography:
 * - Chronological timelines (`سلّم زمني`)
 * - Vertical bar charts (`أعمدة بيانية`)
 * - Multi-series trend curves (`منحنى بياني لتطور الظاهرة الاقتصادية`)
 * - Concept classification cards (`خريطة ذهنية`)
 * Safe fonts across both Web/Mobile and Typst 0.14 (`Arabic Transparent`, `Cairo`, sans-serif).
 */

const HISTORY_SVG_DIR = process.env.MEDIA_ROOT
	? resolve(process.env.MEDIA_ROOT, 'generated/history-svg')
	: existsSync('/var/lib/sujetstore-media')
		? resolve('/var/lib/sujetstore-media/generated/history-svg')
		: resolve('static/generated/history-svg');

export function saveHistorySvgAsset(filename: string, svgContent: string): string {
	const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/\.svg$/i, '') + '.svg';
	if (!existsSync(HISTORY_SVG_DIR)) {
		mkdirSync(HISTORY_SVG_DIR, { recursive: true });
	}
	writeFileSync(join(HISTORY_SVG_DIR, safeName), svgContent.trim() + '\n', 'utf-8');
	return `/generated/history-svg/${safeName}`;
}

function escXml(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

const WEB_FONT = "'Cairo', 'Noto Naskh Arabic', 'Arabic Transparent', sans-serif";
const EXAM_FONT = "'Arabic Transparent', Arial, sans-serif";

/**
 * Renders a chronological historical timeline (`سلّم زمني`) for Lessons (`svgIslamic...` style).
 */
export function svgHistoryTimeline(opts: {
	title: string;
	events: Array<{ date: string; label: string; color?: string }>;
}): string {
	const items = opts.events.slice(0, 6);
	const W = 640;
	const H = 220;
	const padX = 36;
	const lineY = 112;
	const span = W - padX * 2;
	const step = items.length > 1 ? span / (items.length - 1) : 0;
	const palette = ['#1d4ed8', '#047857', '#b45309', '#7c3aed', '#be123c', '#0f766e'];

	const nodesSvg = items
		.map((ev, i) => {
			// RTL chronological flow from right to left
			const cx = items.length === 1 ? W / 2 : W - padX - i * step;
			const isAbove = i % 2 === 0;
			const col = ev.color || palette[i % palette.length];
			const stemY2 = isAbove ? lineY - 38 : lineY + 38;
			const boxY = isAbove ? 40 : lineY + 40;
			return `<g>
  <line x1="${cx}" y1="${lineY}" x2="${cx}" y2="${stemY2}" stroke="${col}" stroke-width="2"/>
  <circle cx="${cx}" cy="${lineY}" r="7.5" fill="${col}" stroke="#ffffff" stroke-width="2"/>
  <rect x="${cx - 56}" y="${boxY}" width="112" height="44" rx="8" fill="#ffffff" stroke="${col}" stroke-width="1.4"/>
  <text x="${cx}" y="${boxY + 16}" text-anchor="middle" direction="rtl" font-family="${WEB_FONT}" font-size="11.5" font-weight="700" fill="${col}">${escXml(ev.date)}</text>
  <text x="${cx}" y="${boxY + 34}" text-anchor="middle" direction="rtl" font-family="${WEB_FONT}" font-size="10.5" fill="#1e293b">${escXml(ev.label)}</text>
</g>`;
		})
		.join('\n');

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${escXml(opts.title)}">
  <rect width="${W}" height="${H}" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>
  <text x="${W / 2}" y="25" text-anchor="middle" direction="rtl" font-family="${WEB_FONT}" font-size="15" font-weight="700" fill="#0f172a">${escXml(opts.title)}</text>
  <line x1="${padX - 14}" y1="${lineY}" x2="${W - padX + 14}" y2="${lineY}" stroke="#334155" stroke-width="3" stroke-linecap="round"/>
  <polygon points="${padX - 18},${lineY} ${padX - 6},${lineY - 6} ${padX - 6},${lineY + 6}" fill="#334155"/>
  ${nodesSvg}
</svg>`;
}

/**
 * Renders a crisp horizontal or vertical economic bar chart (`أعمدة بيانية`) compatible with Typst A4 PDFs and Web.
 */
export function svgGeoBarChart(opts: {
	title: string;
	unitLabel: string;
	bars: Array<{ label: string; value: number; color?: string }>;
}): string {
	const W = 500;
	const H = 235;
	const padLeft = 58;
	const padRight = 24;
	const padBottom = 42;
	const padTop = 38;
	const chartW = W - padLeft - padRight;
	const chartH = H - padTop - padBottom;
	const maxVal = Math.max(...opts.bars.map((b) => b.value), 1) * 1.15;
	const palette = ['#2563eb', '#059669', '#d97706', '#7c3aed', '#dc2626', '#0891b2'];

	const n = Math.max(1, opts.bars.length);
	const slotW = chartW / n;
	const barW = Math.min(48, slotW * 0.56);

	const gridLines = [0.25, 0.5, 0.75, 1]
		.map((f) => {
			const y = padTop + chartH * (1 - f);
			const valLabel = Math.round(maxVal * f);
			return `<line x1="${padLeft}" y1="${y}" x2="${W - padRight}" y2="${y}" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3,3"/>
<text x="${padLeft - 6}" y="${y + 4}" text-anchor="end" font-family="${EXAM_FONT}" font-size="9.5" fill="#475569">${valLabel}</text>`;
		})
		.join('\n');

	const barsSvg = opts.bars
		.map((b, i) => {
			const x = padLeft + i * slotW + (slotW - barW) / 2;
			const h = Math.max(4, (b.value / maxVal) * chartH);
			const y = padTop + chartH - h;
			const col = b.color || palette[i % palette.length];
			return `<rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="4" fill="${col}" opacity="0.9"/>
<text x="${x + barW / 2}" y="${y - 5}" text-anchor="middle" font-family="${EXAM_FONT}" font-size="10" font-weight="bold" fill="${col}">${b.value}</text>
<text x="${x + barW / 2}" y="${H - padBottom + 16}" text-anchor="middle" direction="rtl" font-family="${EXAM_FONT}" font-size="10" font-weight="bold" fill="#0f172a">${escXml(b.label)}</text>`;
		})
		.join('\n');

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="background:#ffffff">
  <rect x="4" y="4" width="${W - 8}" height="${H - 8}" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="${W / 2}" y="23" text-anchor="middle" direction="rtl" font-family="${EXAM_FONT}" font-size="12.5" font-weight="bold" fill="#0f172a">${escXml(opts.title)}</text>
  <text x="${padLeft + 4}" y="35" text-anchor="start" direction="rtl" font-family="${EXAM_FONT}" font-size="9.5" fill="#475569">${escXml(opts.unitLabel)}</text>
  ${gridLines}
  <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${padTop + chartH}" stroke="#334155" stroke-width="1.5"/>
  <line x1="${padLeft}" y1="${padTop + chartH}" x2="${W - padRight}" y2="${padTop + chartH}" stroke="#334155" stroke-width="1.5"/>
  ${barsSvg}
</svg>`;
}

/**
 * Renders a crisp Geography/History trend line chart (`منحنى تطوّر`) suitable for BAC Part 1 statistical tasks.
 */
export function svgGeoTrendCurve(opts: {
	title: string;
	unitLabel: string;
	points: Array<{ label: string; value: number }>;
	lineColor?: string;
}): string {
	const W = 500;
	const H = 225;
	const padLeft = 56;
	const padRight = 26;
	const padTop = 38;
	const padBottom = 38;
	const chartW = W - padLeft - padRight;
	const chartH = H - padTop - padBottom;
	const maxVal = Math.max(...opts.points.map((p) => p.value), 1) * 1.15;
	const minVal = 0;
	const col = opts.lineColor || '#1d4ed8';

	const coords = opts.points.map((p, idx) => {
		const x =
			opts.points.length > 1
				? padLeft + (idx / (opts.points.length - 1)) * chartW
				: padLeft + chartW / 2;
		const y = padTop + chartH - ((p.value - minVal) / (maxVal - minVal)) * chartH;
		return { ...p, x, y };
	});

	const polyPoints = coords.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');
	const areaPoints = `${padLeft},${padTop + chartH} ${polyPoints} ${coords[coords.length - 1]?.x.toFixed(1) ?? padLeft},${padTop + chartH}`;

	const dotsAndLabels = coords
		.map(
			(c) => `<circle cx="${c.x}" cy="${c.y}" r="4.2" fill="${col}" stroke="#ffffff" stroke-width="1.5"/>
<text x="${c.x}" y="${c.y - 8}" text-anchor="middle" font-family="${EXAM_FONT}" font-size="9.5" font-weight="bold" fill="${col}">${c.value}</text>
<text x="${c.x}" y="${H - 18}" text-anchor="middle" font-family="${EXAM_FONT}" font-size="9.5" font-weight="bold" fill="#0f172a">${escXml(c.label)}</text>`
		)
		.join('\n');

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="background:#ffffff">
  <rect x="4" y="4" width="${W - 8}" height="${H - 8}" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="${W / 2}" y="23" text-anchor="middle" direction="rtl" font-family="${EXAM_FONT}" font-size="12.5" font-weight="bold" fill="#0f172a">${escXml(opts.title)}</text>
  <text x="${padLeft + 4}" y="35" text-anchor="start" direction="rtl" font-family="${EXAM_FONT}" font-size="9.5" fill="#475569">${escXml(opts.unitLabel)}</text>
  <polygon points="${areaPoints}" fill="${col}" opacity="0.1"/>
  <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${padTop + chartH}" stroke="#334155" stroke-width="1.5"/>
  <line x1="${padLeft}" y1="${padTop + chartH}" x2="${W - padRight}" y2="${padTop + chartH}" stroke="#334155" stroke-width="1.5"/>
  <polyline fill="none" stroke="${col}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round" points="${polyPoints}"/>
  ${dotsAndLabels}
</svg>`;
}

/**
 * Renders 3–6 crisp summary cards for History & Geography interactive lessons.
 */
export function svgHistoryCards(opts: {
	title: string;
	subtitle?: string;
	cards: Array<{ badge?: string; title: string; detail: string; color?: string }>;
	columns?: number;
}): string {
	const cols = opts.columns ?? Math.min(opts.cards.length, 3);
	const rows = Math.ceil(opts.cards.length / cols);
	const W = 620;
	const headerH = opts.subtitle ? 64 : 46;
	const padX = 18;
	const gap = 12;
	const cardW = (W - padX * 2 - gap * (cols - 1)) / cols;
	const cardH = 84;
	const H = headerH + rows * cardH + (rows - 1) * gap + 20;
	const palette = ['#1d4ed8', '#047857', '#b45309', '#6d28d9', '#be123c', '#0f766e'];

	const cardsSvg = opts.cards
		.map((c, idx) => {
			const r = Math.floor(idx / cols);
			const colIdx = cols - 1 - (idx % cols);
			const x = padX + colIdx * (cardW + gap);
			const y = headerH + r * (cardH + gap);
			const accent = c.color || palette[idx % palette.length];
			const badge = c.badge
				? `<rect x="${x + cardW - 34}" y="${y + 8}" width="26" height="22" rx="6" fill="${accent}"/><text x="${x + cardW - 21}" y="${y + 23}" text-anchor="middle" font-family="${WEB_FONT}" font-size="11.5" font-weight="700" fill="#ffffff">${escXml(c.badge)}</text>`
				: '';
			const titleX = c.badge ? x + cardW - 42 : x + cardW - 12;
			return `<g>
  <rect x="${x}" y="${y}" width="${cardW}" height="${cardH}" rx="10" fill="#ffffff" stroke="${accent}" stroke-width="1.6"/>
  <rect x="${x + cardW - 5}" y="${y}" width="5" height="${cardH}" rx="2" fill="${accent}"/>
  ${badge}
  <text x="${titleX}" y="${y + 25}" text-anchor="end" direction="rtl" font-family="${WEB_FONT}" font-size="13.5" font-weight="700" fill="#0f172a">${escXml(c.title)}</text>
  <text x="${x + cardW - 14}" y="${y + 52}" text-anchor="end" direction="rtl" font-family="${WEB_FONT}" font-size="11.5" fill="#334155">${escXml(c.detail)}</text>
</g>`;
		})
		.join('\n');

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${escXml(opts.title)}">
  <rect width="${W}" height="${H}" rx="14" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.4"/>
  <text x="${W / 2}" y="28" text-anchor="middle" direction="rtl" font-family="${WEB_FONT}" font-size="15.5" font-weight="700" fill="#1e3a8a">${escXml(opts.title)}</text>
  ${opts.subtitle ? `<text x="${W / 2}" y="49" text-anchor="middle" direction="rtl" font-family="${WEB_FONT}" font-size="12" fill="#475569">${escXml(opts.subtitle)}</text>` : ''}
  ${cardsSvg}
</svg>`;
}
