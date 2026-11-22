import type { ContentBlock, TableBlock, TypstRawBlock } from '../SujetBuilder/types';

export const HISTORY_CONTENT_BLOCKLIST: readonly {
	pattern: RegExp;
	reason: string;
}[] = [
	{
		pattern: /ﷺ/u,
		reason: 'رمز ﷺ قد يسقط خط FreeMono في Typst — اكتب «صلى الله عليه وسلم» كاملة'
	},
	{
		pattern: /[✓✕✗]/u,
		reason: 'رمز يونيكود محظور في Typst — استخدم عبارات عربية واضحة'
	},
	{
		pattern: /(?:القرميد|الدجاجة الذهبية|آكلو الأعشاب|الشعراوي|البوطي|وهبة الزحيلي)/u,
		reason: 'اسم أو تعبير غير مطابق لمعايير المنهاج المنقح في المنصة'
	}
];

function escapeTypstMarkup(s: string): string {
	return s
		.replace(/ﷺ/g, 'صلى الله عليه وسلم')
		.replace(/\\/g, '\\\\')
		.replace(/#/g, '\\#')
		.replace(/\$/g, '\\$')
		.replace(/</g, '\\<')
		.replace(/>/g, '\\>')
		.replace(/@/g, '\\@')
		.replace(/(?<!:)\/\//g, '\\/\\/');
}

function renderWithUnderlinedTermsTypst(raw: string): string {
	const parts = raw.split(/(\[\[[^\]]+\]\])/g);
	return parts
		.map((part) => {
			const m = part.match(/^\[\[([^\]]+)\]\]$/);
			if (m) {
				return `#underline[#strong[${escapeTypstMarkup(m[1])}]]`;
			}
			return escapeTypstMarkup(part);
		})
		.join('');
}

/**
 * Renders a historical or geographical source document (`السند التاريخي` / `السند الجغرافي`)
 * inside a crisp Typst box with optional underlined terminology (`[[term]]`)
 * AND full `webMeta` so `SmartExamReader.svelte` renders it natively with 0 parsing loss.
 */
export function buildHistoricalDocumentBlock(opts: {
	title?: string;
	text: string;
	source?: string;
	vocabulary?: Array<{ word: string; meaning: string }>;
}): TypstRawBlock {
	const titleLine = opts.title
		? `#text(size: 13pt, weight: "bold", fill: rgb("#1e3a8a"))[${escapeTypstMarkup(opts.title)}]\n#v(4pt)\n`
		: '';
	const sourceLine = opts.source
		? `\n#v(4pt)\n#align(left)[#text(style: "italic", size: 11.5pt, fill: rgb("#475569"))[— ${escapeTypstMarkup(opts.source)}]]`
		: '';
	const renderedBody = renderWithUnderlinedTermsTypst(opts.text);

	return {
		type: 'typst_raw',
		content: `#block(width: 100%, breakable: false, inset: (x: 11pt, y: 9pt), radius: 4pt, stroke: (right: 3pt + rgb("#1e3a8a"), rest: 0.7pt + rgb("#cbd5e1")), fill: rgb("#f8fafc"))[\n${titleLine}${renderedBody}${sourceLine}\n]`,
		webMeta: {
			kind: 'passage_box',
			lang: 'ar',
			title: opts.title,
			paragraphs: [opts.text],
			source: opts.source,
			vocabulary: opts.vocabulary ?? []
		}
	};
}

/**
 * Renders a structured History/Geography classification or statistical table.
 */
export function buildHistoryTableBlock(
	headers: string[],
	rows: Array<Array<{ label?: string; answer?: string; mark?: string; bold?: boolean }>>,
	align: 'right' | 'center' = 'right'
): TableBlock {
	return {
		type: 'table',
		headers,
		cells: [],
		rows: rows.map((row) =>
			row.map((cell) => {
				if (cell.answer !== undefined) {
					return {
						content: cell.label ?? '................................................',
						answer: cell.answer,
						mark: cell.mark,
						bold: cell.bold
					};
				}
				return {
					content: cell.label ?? '',
					bold: cell.bold
				};
			})
		),
		align,
		borders: 'grid',
		headerBackground: true,
		width: 'full'
	};
}

/**
 * Renders an authentic ONEC Middle School written integration situation (`الوضعية الإدماجية` — 3–4 pts).
 */
export function buildHistoryIntegrationBlock(opts: {
	context: string;
	supportDocuments?: string[];
	instruction: string;
	rubricCriteria: string[];
	modelOutline: string;
	mark: string;
}): ContentBlock {
	const docsBlock =
		opts.supportDocuments && opts.supportDocuments.length > 0
			? `\n${opts.supportDocuments.map((d, i) => `السند ${i + 1}: ${d}`).join('\n')}`
			: '';
	return {
		type: 'text',
		content: `السياق: ${opts.context}${docsBlock}\nالتعليمة: ${opts.instruction}`,
		answer: `معايير التقويم (${opts.mark} ن): ${opts.rubricCriteria.join(' | ')}.\nعناصر الإجابة النموذجية (مقدمة — عرض — خاتمة): ${opts.modelOutline}`,
		mark: opts.mark
	};
}

/**
 * Renders an authentic ONEC Secondary/BAC Essay Part (`الجزء الثاني: المقال التاريخي أو الجغرافي` — 4 pts).
 */
export function buildBacEssayPartBlock(opts: {
	context: string;
	supportPoints?: string[];
	instruction: string;
	intro: string;
	bodyPoints: string[];
	conclusion: string;
	introMark?: string;
	bodyMark?: string;
	conclusionMark?: string;
}): ContentBlock[] {
	const supports =
		opts.supportPoints && opts.supportPoints.length > 0
			? `\n${opts.supportPoints.map((s, idx) => `• ${idx === 0 ? 'السند الأول' : idx === 1 ? 'السند الثاني' : `السند ${idx + 1}`}: ${s}`).join('\n')}`
			: '';
	const introM = opts.introMark ?? '0.5';
	const bodyM = opts.bodyMark ?? '3';
	const conclM = opts.conclusionMark ?? '0.5';

	const fullAnswer = [
		`مقدمة (${introM} ن): ${opts.intro}`,
		`العرض (${bodyM} ن):\n${opts.bodyPoints.map((p) => `- ${p}`).join('\n')}`,
		`خاتمة (${conclM} ن): ${opts.conclusion}`
	].join('\n');

	const totalMark = String(
		Math.round((Number(introM) + Number(bodyM) + Number(conclM)) * 100) / 100
	);

	return [
		{
			type: 'text',
			content: `الوضعية: ${opts.context}${supports}\nالتعليمة: ${opts.instruction}`,
			answer: fullAnswer,
			mark: totalMark
		}
	];
}
