/**
 * Pure RTL Arabic SVG Educational Diagrams for Islamic Education & Sciences Interactive Lessons.
 * Clean emerald / gold / deep-navy palette with generous spacing so text never clips.
 */

function escXml(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

const FONT = "'Cairo', 'Noto Naskh Arabic', 'Arabic Transparent', sans-serif";

/**
 * Renders a vibrant card grid (ideal for Pillars of Islam, Pillars of Iman, Surah cards, Values, Primary 1AP–5AP).
 */
export function svgIslamicCards(opts: {
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
	const cardH = 82;
	const H = headerH + rows * cardH + (rows - 1) * gap + 20;
	const palette = ['#047857', '#0f766e', '#b45309', '#1d4ed8', '#6d28d9', '#be123c'];

	const cardsSvg = opts.cards
		.map((c, idx) => {
			const r = Math.floor(idx / cols);
			const colFromRight = idx % cols;
			// RTL layout: first card on the right
			const colIdx = cols - 1 - colFromRight;
			const x = padX + colIdx * (cardW + gap);
			const y = headerH + r * (cardH + gap);
			const accent = c.color || palette[idx % palette.length];
			const badge = c.badge
				? `<rect x="${x + cardW - 34}" y="${y + 8}" width="26" height="22" rx="6" fill="${accent}"/><text x="${x + cardW - 21}" y="${y + 23}" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="700" fill="#ffffff">${escXml(c.badge)}</text>`
				: '';
			const titleX = c.badge ? x + cardW - 42 : x + cardW - 12;
			return `<g>
  <rect x="${x}" y="${y}" width="${cardW}" height="${cardH}" rx="10" fill="#ffffff" stroke="${accent}" stroke-width="1.6"/>
  <rect x="${x + cardW - 5}" y="${y}" width="5" height="${cardH}" rx="2" fill="${accent}"/>
  ${badge}
  <text x="${titleX}" y="${y + 25}" text-anchor="end" direction="rtl" font-family="${FONT}" font-size="14" font-weight="700" fill="#0f172a">${escXml(c.title)}</text>
  <text x="${x + cardW - 14}" y="${y + 52}" text-anchor="end" direction="rtl" font-family="${FONT}" font-size="12" fill="#334155">${escXml(c.detail)}</text>
</g>`;
		})
		.join('\n');

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${escXml(opts.title)}">
  <rect width="${W}" height="${H}" rx="14" fill="#f0fdf4" stroke="#a7f3d0" stroke-width="1.4"/>
  <text x="${W / 2}" y="28" text-anchor="middle" direction="rtl" font-family="${FONT}" font-size="16" font-weight="700" fill="#065f46">${escXml(opts.title)}</text>
  ${opts.subtitle ? `<text x="${W / 2}" y="49" text-anchor="middle" direction="rtl" font-family="${FONT}" font-size="12" fill="#475569">${escXml(opts.subtitle)}</text>` : ''}
  ${cardsSvg}
</svg>`;
}

/**
 * Renders a clean Arabic concept tree (root node at top connected to 2–5 branches below).
 * Ideal for Maqasid al-Shariah, Qiyas pillars, Usul al-Fiqh sources, Tajwid rules, Riba types, Aqeedah.
 */
export function svgIslamicConceptTree(opts: {
	title: string;
	rootLabel: string;
	rootSub?: string;
	branches: Array<{ label: string; detail: string; example?: string; color?: string }>;
}): string {
	const n = Math.max(1, opts.branches.length);
	const W = Math.max(580, n * 138 + 36);
	const H = 258;
	const palette = ['#047857', '#1d4ed8', '#b45309', '#7c3aed', '#0f766e'];
	const rootW = 240;
	const rootX = (W - rootW) / 2;
	const rootY = 42;
	const rootH = 48;

	const padX = 16;
	const gap = 10;
	const boxW = (W - padX * 2 - gap * (n - 1)) / n;
	const boxY = 128;
	const boxH = 110;

	const linesAndBoxes = opts.branches
		.map((b, i) => {
			// RTL: branch 0 on rightmost column
			const col = n - 1 - i;
			const x = padX + col * (boxW + gap);
			const cx = x + boxW / 2;
			const accent = b.color || palette[i % palette.length];
			return `<g>
  <path d="M ${W / 2} ${rootY + rootH} L ${W / 2} ${rootY + rootH + 18} L ${cx} ${rootY + rootH + 18} L ${cx} ${boxY}" fill="none" stroke="${accent}" stroke-width="1.8"/>
  <rect x="${x}" y="${boxY}" width="${boxW}" height="${boxH}" rx="10" fill="#ffffff" stroke="${accent}" stroke-width="1.6"/>
  <rect x="${x}" y="${boxY}" width="${boxW}" height="28" rx="9" fill="${accent}"/>
  <text x="${cx}" y="${boxY + 19}" text-anchor="middle" direction="rtl" font-family="${FONT}" font-size="13" font-weight="700" fill="#ffffff">${escXml(b.label)}</text>
  <text x="${cx}" y="${boxY + 56}" text-anchor="middle" direction="rtl" font-family="${FONT}" font-size="11.5" fill="#1e293b">${escXml(b.detail)}</text>
  ${b.example ? `<text x="${cx}" y="${boxY + 86}" text-anchor="middle" direction="rtl" font-family="${FONT}" font-size="11" font-weight="600" fill="${accent}">${escXml(b.example)}</text>` : ''}
</g>`;
		})
		.join('\n');

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${escXml(opts.title)}">
  <rect width="${W}" height="${H}" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>
  <text x="${W / 2}" y="26" text-anchor="middle" direction="rtl" font-family="${FONT}" font-size="15.5" font-weight="700" fill="#065f46">${escXml(opts.title)}</text>
  <rect x="${rootX}" y="${rootY}" width="${rootW}" height="${rootH}" rx="10" fill="#065f46"/>
  <text x="${W / 2}" y="${rootY + (opts.rootSub ? 21 : 30)}" text-anchor="middle" direction="rtl" font-family="${FONT}" font-size="14" font-weight="700" fill="#ffffff">${escXml(opts.rootLabel)}</text>
  ${opts.rootSub ? `<text x="${W / 2}" y="${rootY + 39}" text-anchor="middle" direction="rtl" font-family="${FONT}" font-size="11" fill="#d1fae5">${escXml(opts.rootSub)}</text>` : ''}
  ${linesAndBoxes}
</svg>`;
}

/**
 * Renders a vertical hierarchical / sequential flowchart (ideal for Seerah timeline,
 * Maqasid hierarchy: الضروريات -> الحاجيات -> التحسينيات, Hajj rituals, Wudu sequence).
 */
export function svgIslamicSequence(opts: {
	title: string;
	steps: Array<{ step: string; detail: string; color?: string }>;
}): string {
	const W = 600;
	const stepH = 50;
	const gap = 12;
	const startY = 48;
	const H = startY + opts.steps.length * (stepH + gap) + 12;
	const palette = ['#047857', '#0f766e', '#1d4ed8', '#b45309', '#6d28d9', '#be123c'];

	const itemsSvg = opts.steps
		.map((s, idx) => {
			const y = startY + idx * (stepH + gap);
			const accent = s.color || palette[idx % palette.length];
			const connector =
				idx < opts.steps.length - 1
					? `<line x1="${W - 44}" y1="${y + stepH}" x2="${W - 44}" y2="${y + stepH + gap}" stroke="#94a3b8" stroke-width="2" stroke-dasharray="3,2"/>`
					: '';
			return `<g>
  ${connector}
  <rect x="20" y="${y}" width="${W - 40}" height="${stepH}" rx="10" fill="#ffffff" stroke="${accent}" stroke-width="1.5"/>
  <circle cx="${W - 44}" cy="${y + stepH / 2}" r="14" fill="${accent}"/>
  <text x="${W - 44}" y="${y + stepH / 2 + 5}" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="700" fill="#ffffff">${idx + 1}</text>
  <text x="${W - 70}" y="${y + 21}" text-anchor="end" direction="rtl" font-family="${FONT}" font-size="13.5" font-weight="700" fill="#0f172a">${escXml(s.step)}</text>
  <text x="${W - 70}" y="${y + 40}" text-anchor="end" direction="rtl" font-family="${FONT}" font-size="11.5" fill="#475569">${escXml(s.detail)}</text>
</g>`;
		})
		.join('\n');

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${escXml(opts.title)}">
  <rect width="${W}" height="${H}" rx="14" fill="#fffbeb" stroke="#fde68a" stroke-width="1.4"/>
  <text x="${W / 2}" y="30" text-anchor="middle" direction="rtl" font-family="${FONT}" font-size="15.5" font-weight="700" fill="#92400e">${escXml(opts.title)}</text>
  ${itemsSvg}
</svg>`;
}

/**
 * Renders a side-by-side comparison diagram (e.g., ربا الفضل vs ربا النسيئة, التبني vs الكفالة,
 * الإجماع vs القياس, المكي vs المدني, الحدود vs القصاص vs التعزير).
 */
export function svgIslamicCompare(opts: {
	title: string;
	rightCol: { heading: string; points: string[]; color?: string };
	leftCol: { heading: string; points: string[]; color?: string };
}): string {
	const W = 620;
	const maxPts = Math.max(opts.rightCol.points.length, opts.leftCol.points.length);
	const colW = 282;
	const boxY = 48;
	const boxH = 44 + maxPts * 28 + 14;
	const H = boxY + boxH + 16;
	const rColor = opts.rightCol.color || '#047857';
	const lColor = opts.leftCol.color || '#b45309';

	const renderCol = (x: number, col: { heading: string; points: string[] }, accent: string) => {
		const pts = col.points
			.map(
				(p, i) =>
					`<text x="${x + colW - 14}" y="${boxY + 56 + i * 28}" text-anchor="end" direction="rtl" font-family="${FONT}" font-size="12" fill="#1e293b">• ${escXml(p)}</text>`
			)
			.join('\n');
		return `<g>
  <rect x="${x}" y="${boxY}" width="${colW}" height="${boxH}" rx="10" fill="#ffffff" stroke="${accent}" stroke-width="1.6"/>
  <rect x="${x}" y="${boxY}" width="${colW}" height="32" rx="9" fill="${accent}"/>
  <text x="${x + colW / 2}" y="${boxY + 21}" text-anchor="middle" direction="rtl" font-family="${FONT}" font-size="13.5" font-weight="700" fill="#ffffff">${escXml(col.heading)}</text>
  ${pts}
</g>`;
	};

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${escXml(opts.title)}">
  <rect width="${W}" height="${H}" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>
  <text x="${W / 2}" y="29" text-anchor="middle" direction="rtl" font-family="${FONT}" font-size="15.5" font-weight="700" fill="#0f172a">${escXml(opts.title)}</text>
  ${renderCol(W - 18 - colW, opts.rightCol, rColor)}
  ${renderCol(18, opts.leftCol, lColor)}
</svg>`;
}
