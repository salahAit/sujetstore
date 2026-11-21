import type { ContentBlock, TableBlock, TypstRawBlock } from '../SujetBuilder/types';
import {
	APPROVED_MUSLIM_AUTHORS,
	DOCTRINAL_AND_AUTHOR_BLOCKLIST
} from '../ArabicTemplates/arabic-helpers';

export { APPROVED_MUSLIM_AUTHORS, DOCTRINAL_AND_AUTHOR_BLOCKLIST };

/**
 * Automated Weak & Fabricated Hadith Blocklist (enforced by scripts/audit-islamic-content.ts).
 * Zero tolerance for citing weak (ضعيف) or fabricated (موضوع) narrations as prophetic Hadith.
 */
export const WEAK_HADITH_BLOCKLIST: readonly {
	pattern: RegExp;
	reason: string;
}[] = [
	{
		pattern: /اطلبوا\s*العلم\s*ولو\s*بالصين/u,
		reason: 'حديث باطل/موضوع (استبدله بحديث مسلم: من سلك طريقا يلتمس فيه علما سهل الله له به طريقا إلى الجنة)'
	},
	{
		pattern: /النظافة\s*من\s*الإيمان/u,
		reason: 'حديث ضعيف بهذا اللفظ (استبدله بحديث مسلم الصحيح: الطهور شطر الإيمان)'
	},
	{
		pattern: /الجنة\s*تحت\s*أقدام\s*الأمهات/u,
		reason: 'حديث ضعيف بهذا اللفظ (استبدله بحديث النسائي الصحيح: فالزمها فإن الجنة تحت رجليها)'
	},
	{
		pattern: /اختلاف\s*أمتي\s*رحمة/u,
		reason: 'لا أصل له (حديث موضوع)'
	},
	{
		pattern: /حب\s*الوطن\s*من\s*الإيمان/u,
		reason: 'حديث موضوع لا يصح نسبته إلى النبي صلى الله عليه وسلم'
	},
	{
		pattern: /أبغض\s*الحلال\s*إلى\s*الله\s*الطلاق/u,
		reason: 'حديث ضعيف الإسناد لا يُستشهد به كحديث نبوي ثابت'
	},
	{
		pattern: /اعمل\s*لدنياك\s*كأنك\s*تعيش\s*أبدا/u,
		reason: 'لا يصح مرفوعا إلى النبي صلى الله عليه وسلم'
	},
	{
		pattern: /الساكت\s*عن\s*الحق\s*شيطان\s*أخرس/u,
		reason: 'ليس حديثا نبويا ثابتا (استبدله بحديث مسلم: من رأى منكم منكرا فليغيره بيده...)'
	},
	{
		pattern: /أدبني\s*ربي\s*فأحسن\s*تأديبي/u,
		reason: 'حديث ضعيف الإسناد لا يُنسب للنبي صلى الله عليه وسلم'
	},
	{
		pattern: /لولاك\s*(?:لما|ما)\s*خلقت\s*الأفلاك/u,
		reason: 'حديث موضوع باطل يخالف العقيدة الصحيحة'
	},
	{
		pattern: /توسلوا\s*بجاهي|بحق\s*جاه\s*نبيك/u,
		reason: 'حديث موضوع وتوسل بدعي غير مشروع'
	},
	{
		pattern: /المعدة\s*بيت\s*الداء/u,
		reason: 'ليس حديثا نبويا (قول مأثور عن الأطباء لا يُنسب للنبي صلى الله عليه وسلم)'
	},
	{
		pattern: /أصحابي\s*كالنجوم\s*بأيهم\s*اقتديتم/u,
		reason: 'حديث موضوع/ضعيف جدا'
	},
	{
		pattern: /رجعنا\s*من\s*الجهاد\s*الأصغر\s*إلى\s*الجهاد\s*الأكبر/u,
		reason: 'حديث ضعيف لا يصح مرفوعا'
	},
	{
		pattern: /تفكر\s*ساعة\s*خير\s*من\s*عبادة\s*ستين\s*سنة/u,
		reason: 'حديث موضوع'
	}
];

/**
 * Automated Aqeedah & Methodology Blocklist (pure Ahl al-Sunnah / Salafi standard).
 * Zero tolerance for Ash'ari/Mu'tazili ta'wil of Allah's attributes, Sufi ghuluw, bid'ah endorsement,
 * or non-approved contemporary/partisan figures.
 */
export const AQEEDAH_DEVIATION_BLOCKLIST: readonly {
	pattern: RegExp;
	reason: string;
}[] = [
	{
		pattern: /الاستواء\s*(?:بمعنى|يعني|هو)\s*الاستيلاء|استوى\s*بمعنى\s*استولى/u,
		reason: 'تأويل كلامي مخالف لمنهج أهل السنة والجماعة في صفة الاستواء'
	},
	{
		pattern: /يد\s*الله\s*(?:بمعنى|تؤول\s*بـ?)\s*(?:القدرة|النعمة)/u,
		reason: 'تأويل كلامي مخالف لمنهج السلف في إثبات الصفات دون تحريف ولا تعطيل'
	},
	{
		pattern: /النزول\s*(?:بمعنى|يعني)\s*نزول\s*الرحمة/u,
		reason: 'تأويل كلامي مخالف لمنهج السلف في إثبات صفة النزول'
	},
	{
		pattern: /وحدة\s*الوجود|الحلول\s*والاتحاد|الكلام\s*النفسي/u,
		reason: 'انحراف عقدي مخالف لمنهج أهل السنة والجماعة'
	},
	{
		pattern: /الاستغاثة\s*بالأولياء|دعاء\s*الأولياء\s*والصالحين|التبرك\s*بالقبور|الذبح\s*للأولياء/u,
		reason: 'شركيات وغلو مخالف للتوحيد الخالص'
	},
	{
		pattern: /بدعة\s*حسنة/u,
		reason: 'تقرير بدعي مخالف لحديث النبي صلى الله عليه وسلم: وكل بدعة ضلالة'
	},
	{
		pattern: /المولد\s*النبوي\s*(?:شعيرة|مستحب|عيد|احتفال\s*مشروع)/u,
		reason: 'ترويج لاحتفال بدعي لم يثبت عن السلف الصالح'
	},
	{
		pattern: /الشعراوي|البوطي|وهبة\s*الزحيلي|عمرو\s*خالد|طارق\s*السويدان|عدنان\s*إبراهيم|راغب\s*السرجاني|عمر\s*عبد\s*الكافي|سلمان\s*العودة|عائض\s*القرني|محمد\s*العريفي/u,
		reason: 'شخصية معاصرة مستبعدة — نقتصر على القرآن والسنة الصحيحة والصحابة والأئمة الأربعة وعلماء جمعية العلماء المسلمين الجزائريين'
	},
	{
		pattern: /الشيخ\s*محمد\s*بن\s*عبد\s*الوهاب|محمد\s*بن\s*عبد\s*الوهاب|الشوكاني|الصنعاني|عبد\s*الرحمن\s*السعدي|(?<!حليمة\s)السعدي(?!ة)/u,
		reason: 'الاستفادة من تحريرات أهل العلم دون التصريح بأسماء المتأخرين والمعاصرين التزاما بتوجيه المستخدم'
	}
];

/** Complete combined blocklist checked automatically by scripts/audit-islamic-content.ts */
export const ISLAMIC_FULL_BLOCKLIST: readonly {
	pattern: RegExp;
	reason: string;
}[] = [
	...DOCTRINAL_AND_AUTHOR_BLOCKLIST,
	...WEAK_HADITH_BLOCKLIST,
	...AQEEDAH_DEVIATION_BLOCKLIST
];

/** Escape string safely for Typst quoted string literal `"...""` and normalize `ﷺ` to full phrase. */
function escapeTypstQuoted(s: string): string {
	return s
		.replace(/ﷺ/g, 'صلى الله عليه وسلم')
		.replace(/\\/g, '\\\\')
		.replace(/"/g, '\\"');
}

/** Escape prose safely for Typst markup inside `typst_raw` blocks and normalize `ﷺ`. */
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

function serializeVocabTypst(vocab?: Array<{ word: string; meaning: string }>): string {
	if (!vocab || vocab.length === 0) return '()';
	const entries = vocab.map(
		(v) => `("${escapeTypstQuoted(v.word)}", "${escapeTypstQuoted(v.meaning)}")`
	);
	return `(${entries.join(', ')},)`;
}

/**
 * Renders an authentic Quranic verse passage inside `#quran-box(...)` using
 * `KFGQPC Uthman Taha Naskh` (`static/fonts/UthmanTN_v2-0.ttf`) enclosed in `﴿ ... ﴾`.
 */
export function buildQuranPassageBlock(opts: {
	verses: string;
	surah: string;
	ayahRange?: string;
	label?: string;
	vocabulary?: Array<{ word: string; meaning: string }>;
}): TypstRawBlock {
	const cleanVerses = opts.verses.replace(/^[﴿\s]+|[﴾\s]+$/g, '');
	const label = opts.label ?? 'قال الله تعالى:';
	const ayahRange = opts.ayahRange ?? '';
	return {
		type: 'typst_raw',
		content: `#quran-box(\n  label: "${escapeTypstQuoted(label)}",\n  verses: "${escapeTypstQuoted(cleanVerses)}",\n  surah: "${escapeTypstQuoted(opts.surah)}",\n  ayah-range: "${escapeTypstQuoted(ayahRange)}",\n  vocabulary: ${serializeVocabTypst(opts.vocabulary)},\n)`,
		webMeta: {
			kind: 'quran_box',
			label,
			verses: cleanVerses,
			surah: opts.surah,
			ayahRange,
			vocabulary: opts.vocabulary ?? []
		}
	};
}

/**
 * Renders an authentic verified Prophetic Hadith inside `#hadith-box(...)`
 * with explicit Sahabi narrator and verified Takhrij (`متفق عليه` / `رواه البخاري` / `رواه مسلم`...).
 */
export function buildHadithPassageBlock(opts: {
	narrator: string;
	text: string;
	source: string;
	label?: string;
	vocabulary?: Array<{ word: string; meaning: string }>;
}): TypstRawBlock {
	const cleanText = opts.text.replace(/^[«"\s]+|[»"\s]+$/g, '');
	const label = opts.label ?? 'السند النبوي الشريف:';
	return {
		type: 'typst_raw',
		content: `#hadith-box(\n  label: "${escapeTypstQuoted(label)}",\n  narrator: "${escapeTypstQuoted(opts.narrator)}",\n  text-body: "${escapeTypstQuoted(cleanText)}",\n  source: "${escapeTypstQuoted(opts.source)}",\n  vocabulary: ${serializeVocabTypst(opts.vocabulary)},\n)`,
		webMeta: {
			kind: 'hadith_box',
			label,
			narrator: opts.narrator,
			text: cleanText,
			source: opts.source,
			vocabulary: opts.vocabulary ?? []
		}
	};
}

/**
 * Renders a dignified contextual Islamic case study / Fiqh or Aqeedah scenario box (`السند`).
 */
export function buildIslamicContextBlock(opts: {
	title?: string;
	text: string;
	source?: string;
}): TypstRawBlock {
	const titleLine = opts.title
		? `#text(size: 13pt, weight: "bold", fill: rgb("#1e3a8a"))[${escapeTypstMarkup(opts.title)}]\n#v(4pt)\n`
		: '';
	const sourceLine = opts.source
		? `\n#v(4pt)\n#align(left)[#text(style: "italic", size: 11.5pt, fill: rgb("#475569"))[— ${escapeTypstMarkup(opts.source)}]]`
		: '';
	return {
		type: 'typst_raw',
		content: `#block(width: 100%, breakable: false, inset: (x: 11pt, y: 9pt), radius: 4pt, stroke: (right: 3pt + rgb("#1e3a8a"), rest: 0.7pt + rgb("#cbd5e1")), fill: rgb("#f8fafc"))[\n${titleLine}${escapeTypstMarkup(opts.text)}${sourceLine}\n]`,
		webMeta: {
			kind: 'passage_box',
			lang: 'ar',
			title: opts.title,
			paragraphs: [opts.text],
			source: opts.source
		}
	};
}

/**
 * Renders the classic Algerian BAC Islamic Sciences «الأحكام والفوائد» table
 * with responsive dotted fills (auto-rendered via `#repeat(gap: 1.8pt)[.]` in `exercises.typ`).
 */
export function buildRulingsBenefitsTableBlock(entries: {
	rulings: [string, string];
	benefits: [string, string];
	markPerItem?: string;
}): TableBlock {
	const m = entries.markPerItem ?? '0.5';
	return {
		type: 'table',
		headers: ['الأحكام الشرعية (حكمان)', 'الفوائد والإرشادات (فائدتان)'],
		cells: [],
		rows: [
			[
				{ content: '................................................', answer: `1) ${entries.rulings[0]}`, mark: m },
				{ content: '................................................', answer: `1) ${entries.benefits[0]}`, mark: m }
			],
			[
				{ content: '................................................', answer: `2) ${entries.rulings[1]}`, mark: m },
				{ content: '................................................', answer: `2) ${entries.benefits[1]}`, mark: m }
			]
		],
		align: 'right',
		borders: 'grid',
		headerBackground: true,
		width: 'full'
	};
}

/**
 * Renders a structured Islamic classification / comparison table (Maqasid, Riba, Mirath, Tajwid, Fiqh).
 */
export function buildIslamicTableBlock(
	headers: string[],
	rows: Array<Array<{ label?: string; answer?: string; mark?: string; bold?: boolean }>>
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
		align: 'right',
		borders: 'grid',
		headerBackground: true,
		width: 'full'
	};
}

/**
 * Renders an authentic ONEC Islamic Education written integration situation (`الوضعية الإدماجية`).
 */
export function buildIslamicIntegrationBlock(opts: {
	context: string;
	supportQuote?: string;
	instruction: string;
	rubricCriteria: string[];
	modelOutline: string;
	mark: string;
}): ContentBlock {
	const quoteLine = opts.supportQuote ? `\nالسند: ${opts.supportQuote}` : '';
	return {
		type: 'text',
		content: `السياق: ${opts.context}${quoteLine}\nالتعليمة: ${opts.instruction}`,
		answer: `معايير التقويم (${opts.mark} ن): ${opts.rubricCriteria.join(' | ')}.\nعناصر الإجابة النموذجية: ${opts.modelOutline}`,
		mark: opts.mark
	};
}
