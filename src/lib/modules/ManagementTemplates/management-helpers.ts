import type { ContentBlock, TableBlock, TypstRawBlock } from '../SujetBuilder/types';

export const MANAGEMENT_CONTENT_BLOCKLIST: readonly {
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
		pattern: /(?:استهلاك القرض بفائدة|الفائدة المركبة|الفائدة البسيطة|خصم الأوراق التجارية بالفائدة|سندات بفائدة|فوائد ربوية)/u,
		reason: 'تطبيقات الفوائد الربوية محظورة شرعاً — استبدلها بالاهتلاكات أو التمويل الإسلامي المشروع (المرابحة، المشاركة، الإجارة)'
	},
	{
		pattern: /(?:وزارة التربية الوطنية|الديوان الوطني للامتحانات والمسابقات)/u,
		reason: 'استخدم ترويسة منصة SujetStore فقط في الوثائق المولدة'
	},
	{
		pattern: /(?:القرميد|الدجاجة الذهبية|آكلو الأعشاب|الشعراوي|البوطي|وهبة الزحيلي|ابن رشد|ابن سينا|الفارابي|الغزالي|ابن عربي)/u,
		reason: 'اسم أو تعبير غير مطابق لمعايير المنهاج المنقح في المنصة'
	}
];

export function formatDzd(n: number): string {
	const rounded = Math.round(n * 100) / 100;
	const parts = String(rounded).split('.');
	const intFormatted = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	return parts.length > 1 ? `${intFormatted}.${parts[1]}` : intFormatted;
}

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
 * Renders an economic/legal document excerpt (`سند اقتصادي` / `نص قانوني` / `قضية`)
 * inside a crisp teal-accented Typst box AND emits full `webMeta` so `SmartExamReader.svelte`
 * renders it natively with zero Typst directive leakage.
 */
export function buildManagementDocumentBlock(opts: {
	title?: string;
	text: string;
	source?: string;
}): TypstRawBlock {
	const titleLine = opts.title
		? `#text(size: 13pt, weight: "bold", fill: rgb("#0f766e"))[${escapeTypstMarkup(opts.title)}]\n#v(4pt)\n`
		: '';
	const sourceLine = opts.source
		? `\n#v(4pt)\n#align(left)[#text(style: "italic", size: 11.5pt, fill: rgb("#475569"))[— ${escapeTypstMarkup(opts.source)}]]`
		: '';
	const renderedBody = renderWithUnderlinedTermsTypst(opts.text);

	return {
		type: 'typst_raw',
		content: `#block(width: 100%, breakable: false, inset: (x: 11pt, y: 9pt), radius: 4pt, stroke: (right: 3pt + rgb("#0d9488"), rest: 0.7pt + rgb("#cbd5e1")), fill: rgb("#f0fdfa"))[\n${titleLine}${renderedBody}${sourceLine}\n]`,
		webMeta: {
			kind: 'passage_box',
			lang: 'ar',
			title: opts.title,
			paragraphs: [opts.text],
			source: opts.source,
			vocabulary: []
		}
	};
}

/**
 * Builds a structured accounting ledger, trial balance, functional balance sheet,
 * depreciation schedule, or management classification `TableBlock`.
 */
export function buildManagementTableBlock(
	headers: string[],
	rows: Array<Array<{ label?: string; answer?: string; mark?: string; bold?: boolean; colspan?: number }>>,
	align: 'right' | 'center' | 'left' = 'center'
): TableBlock {
	return {
		type: 'table',
		headers,
		cells: [],
		rows: rows.map((row) =>
			row.map((cell) => {
				if (cell.answer !== undefined) {
					return {
						content: cell.label ?? '........................',
						answer: cell.answer,
						mark: cell.mark,
						bold: cell.bold,
						...(cell.colspan ? { colspan: cell.colspan } : {})
					};
				}
				return {
					content: cell.label ?? '',
					bold: cell.bold,
					...(cell.colspan ? { colspan: cell.colspan } : {})
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
 * Renders an accounting journal entry table (`دفتر اليومية`) in SCF format.
 */
export function buildAccountingJournalTable(
	entries: Array<{
		dateLabel: string;
		debitCode: string;
		creditCode: string;
		debitName: string;
		creditName: string;
		amountStr: string;
		narrative: string;
		isSolutionTarget?: boolean;
		mark?: string;
	}>
): TableBlock {
	const headers = ['رقم الحساب (مدين)', 'رقم الحساب (دائن)', 'البيان / اسم الحساب', 'المبلغ المدين (دج)', 'المبلغ الدائن (دج)'];
	const rows: Array<Array<{ label?: string; answer?: string; mark?: string; bold?: boolean }>> = [];

	for (const e of entries) {
		if (e.isSolutionTarget) {
			rows.push([
				{ label: '........', answer: e.debitCode, mark: e.mark },
				{ label: '........', answer: e.creditCode },
				{ label: `بتاريخ ${e.dateLabel} — ........`, answer: `${e.debitName} ← ${e.creditName} (${e.narrative})` },
				{ label: '........', answer: e.amountStr },
				{ label: '........', answer: e.amountStr }
			]);
		} else {
			rows.push([
				{ label: e.debitCode, bold: true },
				{ label: '', bold: false },
				{ label: `من حـ/ ${e.debitName} (${e.dateLabel})`, bold: false },
				{ label: e.amountStr, bold: true },
				{ label: '' }
			]);
			rows.push([
				{ label: '' },
				{ label: e.creditCode, bold: true },
				{ label: `إلى حـ/ ${e.creditName} — ${e.narrative}` },
				{ label: '' },
				{ label: e.amountStr, bold: true }
			]);
		}
	}

	return buildManagementTableBlock(headers, rows, 'center');
}

/**
 * Renders a halal legal case study (`وضعية قضائية / دراسة حالة`) or management situation.
 */
export function buildCaseStudyBlocks(opts: {
	title: string;
	facts: string;
	questions: Array<{ q: string; a: string; mark: string }>;
}): ContentBlock[] {
	const blocks: ContentBlock[] = [
		buildManagementDocumentBlock({
			title: opts.title,
			text: opts.facts
		})
	];
	for (const item of opts.questions) {
		blocks.push({
			type: 'text',
			content: item.q,
			answer: item.a,
			mark: item.mark
		});
	}
	return blocks;
}
