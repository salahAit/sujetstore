import type { ContentBlock, TableBlock, TypstRawBlock } from '../SujetBuilder/types';

/**
 * Automated doctrinal & non-Muslim author blocklist (enforced by scripts/audit-arabic-content.ts).
 * Zero tolerance for:
 *  1) Any text, poem, or quote from a non-Muslim author/poet.
 *  2) Any heterodox/Sufi-ghuluw/pantheistic/istighatha, wine/mujun, or atheist/fatalist passages.
 */
export const DOCTRINAL_AND_AUTHOR_BLOCKLIST: readonly {
	pattern: RegExp;
	reason: string;
}[] = [
	// Non-Muslim Mahjar / Modern / Nahda / Classical authors strictly prohibited
	{ pattern: /إيليا\s*أبو\s*ماضي|أبو\s*ماضي/u, reason: 'كاتب غير مسلم (إيليا أبو ماضي)' },
	{ pattern: /ميخائيل\s*نعيمة|نعيمة/u, reason: 'كاتب غير مسلم (ميخائيل نعيمة)' },
	{ pattern: /جبران\s*خليل\s*جبران|\bجبران\b/u, reason: 'كاتب غير مسلم (جبران خليل جبران)' },
	{ pattern: /نسيب\s*عريضة/u, reason: 'كاتب غير مسلم (نسيب عريضة)' },
	{ pattern: /رشيد\s*سليم\s*الخوري|الشاعر\s*القروي/u, reason: 'كاتب غير مسلم (رشيد سليم الخوري)' },
	{ pattern: /فوزي\s*المعلوف|شفيق\s*المعلوف/u, reason: 'كاتب غير مسلم (المعلوف)' },
	{ pattern: /إلياس\s*فرحات/u, reason: 'كاتب غير مسلم (إلياس فرحات)' },
	{ pattern: /مارون\s*عبود/u, reason: 'كاتب غير مسلم (مارون عبود)' },
	{ pattern: /أمين\s*الريحاني/u, reason: 'كاتب غير مسلم (أمين الريحاني)' },
	{ pattern: /خليل\s*مطران/u, reason: 'كاتب غير مسلم (خليل مطران)' },
	{ pattern: /جورج\s*صيدح/u, reason: 'كاتب غير مسلم (جورج صيدح)' },
	{ pattern: /بطرس\s*البستاني/u, reason: 'كاتب غير مسلم (بطرس البستاني)' },
	{ pattern: /ناصيف\s*اليازجي|إبراهيم\s*اليازجي/u, reason: 'كاتب غير مسلم (اليازجي)' },
	{ pattern: /لويس\s*شيخو/u, reason: 'كاتب غير مسلم (لويس شيخو)' },
	{ pattern: /شكري\s*غانم/u, reason: 'كاتب غير مسلم (شكري غانم)' },
	{ pattern: /الأخطل\s*التغلبي|غياث\s*بن\s*غوث/u, reason: 'شاعر غير مسلم (الأخطل)' },
	{ pattern: /السموأل/u, reason: 'شاعر غير مسلم (السموأل)' },
	{ pattern: /أبو\s*نواس|أبي\s*نواس/u, reason: 'شعر خمر ومجون غير لائق (أبو نواس)' },
	{ pattern: /بشار\s*بن\s*برد/u, reason: 'شعر مجون وغزل فاحش (بشار بن برد)' },
	{ pattern: /الحلاج|ابن\s*عربي|محيي\s*الدين\s*بن\s*عربي|جلال\s*الدين\s*الرومي/u, reason: 'مخالف لمنهج أهل السنة والجماعة (وحدة الوجود والحلول)' },
	{ pattern: /أبو\s*العلاء\s*المعري|المعري/u, reason: 'شبهات عقدية وتشكيك (المعري)' },
	{ pattern: /يا\s*أكرم\s*الخلق\s*ما\s*لي\s*من\s*ألوذ\s*به|فإن\s*من\s*جودك\s*الدنيا\s*وضرتها/u, reason: 'غلو واستغاثة تخالف التوحيد على منهج أهل السنة والجماعة' },
	{ pattern: /فلا\s*بد\s*أن\s*يستجيب\s*القدر/u, reason: 'عبارة غير منضبطة في القدر' },
	// Pre-Islamic poets who died upon non-Islam (avoid attributing primary texts to them; use Sahabah Mukhadram poets instead)
	{ pattern: /امرؤ\s*القيس|امرئ\s*القيس/u, reason: 'شاعر مات على غير الإسلام (استبدله بالصحابة المخضرمين كلبيد أو كعب أو حسان)' },
	{ pattern: /عنترة\s*بن\s*شداد/u, reason: 'شاعر مات على غير الإسلام (استبدله بالصحابة المخضرمين)' },
	{ pattern: /زهير\s*بن\s*أبي\s*سلمى/u, reason: 'شاعر مات على غير الإسلام (استبدله بابنه كعب بن زهير رضي الله عنه أو لبيد رضي الله عنه)' },
	{ pattern: /طرفة\s*بن\s*العبد/u, reason: 'شاعر مات على غير الإسلام' },
	{ pattern: /عمرو\s*بن\s*كلثوم/u, reason: 'شاعر مات على غير الإسلام' },
	{ pattern: /الحارث\s*بن\s*حلزة/u, reason: 'شاعر مات على غير الإسلام' },
	{ pattern: /الأعشى\s*الكبير|ميمون\s*بن\s*قيس/u, reason: 'شاعر مات على غير الإسلام' },
	{ pattern: /النابغة\s*الذبياني/u, reason: 'شاعر مات على غير الإسلام (استبدله بالنابغة الجعدي الصحابي رضي الله عنه)' },
	{ pattern: /حاتم\s*الطائي/u, reason: 'شاعر مات على غير الإسلام' },
	{ pattern: /الشنفرى/u, reason: 'شاعر مات على غير الإسلام' },
	{ pattern: /دريد\s*بن\s*الصمة/u, reason: 'شاعر مات على غير الإسلام' },
	{ pattern: /أدونيس|علي\s*أحمد\s*سعيد/u, reason: 'مخالف لمنهج أهل السنة والجماعة' },
	{ pattern: /نزار\s*قباني/u, reason: 'غزل غير منضبط شرعا' },
	{ pattern: /خمر(?:ة|ا)?\s*تدار|كأس\s*المدام|اشرب\s*الراح/u, reason: 'وصف الخمر المخالف للشريعة' },
	// Non-Salafi / Sufi / Ikhwani / non-approved modern figures strictly excluded per user directive
	{ pattern: /علي\s*الطنطاوي|الطنطاوي/u, reason: 'مستبعد بطلب المستخدم (غير سلفي)' },
	{ pattern: /محمد\s*الغزالي|الغزالي/u, reason: 'مستبعد بطلب المستخدم (غير سلفي)' },
	{ pattern: /الأمير\s*عبد\s*القادر/u, reason: 'مستبعد حفاظا على نقاء المنهج السلفي (الانتساب الصوفي الأكبراني)' },
	{ pattern: /مالك\s*بن\s*نبي/u, reason: 'مستبعد — استبدله بعلماء جمعية العلماء المسلمين الجزائريين (ابن باديس، الإبراهيمي، الميلي)' },
	{ pattern: /محمد\s*إقبال|\bإقبال\b/u, reason: 'مستبعد — استبدله بشعراء جمعية العلماء المسلمين الجزائريين' },
	{ pattern: /عمر\s*بهاء\s*الدين\s*الأميري|الأميري/u, reason: 'مستبعد — استبدله بمحمد العيد آل خليفة أو أحمد سحنون أو مفدي زكرياء' },
	{ pattern: /علي\s*أحمد\s*باكثير|باكثير/u, reason: 'مستبعد — استبدله بأعلام جمعية العلماء المسلمين الجزائريين' },
	{ pattern: /سيد\s*قطب|حسن\s*البنا|القرضاوي/u, reason: 'مستبعد (غير سلفي)' },
	{ pattern: /مصطفى\s*صادق\s*الرافعي|الرافعي/u, reason: 'مستبعد — استبدله بالبشير الإبراهيمي وابن باديس والميلي' },
	{ pattern: /مصطفى\s*لطفي\s*المنفلوطي|المنفلوطي/u, reason: 'مستبعد — استبدله بالبشير الإبراهيمي وابن باديس والميلي' },
	{ pattern: /محمود\s*محمد\s*شاكر/u, reason: 'استبدله بعلماء جمعية العلماء المسلمين الجزائريين' },
	// User explicitly requested: benefit from Salafi scholars (Ibn al-Qayyim, Al-Uthaymeen, etc.) WITHOUT citing their names explicitly
	{ pattern: /ابن\s*القيم|ابن\s*قيم\s*الجوزية|ابن\s*تيمية|العثيمين|ابن\s*عثيمين|ابن\s*باز|الألباني|الفوزان/u, reason: 'طلب المستخدم الاستفادة من منهجهم دون ذكر أسمائهم صراحة' }
];

/**
 * Curated Muslim Algerian Salafi scholars (جمعية العلماء المسلمين الجزائريين),
 * all Sahabah (رضي الله عنهم), Hadith Imams (البخاري، مسلم، مالك، الشافعي، أحمد...),
 * and doctrinally clean classical/national curriculum authors.
 */
export const APPROVED_MUSLIM_AUTHORS = {
	algerianSalafiScholars: [
		'الإمام عبد الحميد بن باديس رحمه الله',
		'العلامة محمد البشير الإبراهيمي رحمه الله',
		'الشيخ مبارك بن محمد الميلي رحمه الله',
		'الشيخ العربي التبسي رحمه الله',
		'الشيخ الطيب العقبي رحمه الله',
		'الشيخ أحمد سحنون رحمه الله',
		'الشاعر محمد العيد آل خليفة رحمه الله',
		'الشاعر مفدي زكرياء رحمه الله',
		'الشاعر محمد الأخضر السائحي رحمه الله',
		'الشيخ أحمد حماني رحمه الله',
		'الشيخ عبد الرحمن شيبان رحمه الله',
		'المؤرخ أبو القاسم سعد الله رحمه الله',
		'الكاتب أحمد رضا حوحو رحمه الله'
	],
	sahabahAndHadithImams: [
		'أبو بكر الصديق رضي الله عنه',
		'عمر بن الخطاب رضي الله عنه',
		'عثمان بن عفان رضي الله عنه',
		'علي بن أبي طالب رضي الله عنه',
		'عبد الله بن عباس رضي الله عنهما',
		'أبو هريرة رضي الله عنه',
		'حسان بن ثابت رضي الله عنه',
		'كعب بن زهير رضي الله عنه',
		'لبيد بن ربيعة العامري رضي الله عنه',
		'عبد الله بن رواحة رضي الله عنه',
		'الخنساء رضي الله عنها',
		'النابغة الجعدي رضي الله عنه',
		'الإمام البخاري رحمه الله',
		'الإمام مسلم رحمه الله',
		'الإمام مالك بن أنس رحمه الله',
		'الإمام الشافعي رحمه الله',
		'الإمام أحمد بن حنبل رحمه الله'
	],
	curriculumLiterature: [
		'أبو العتاهية',
		'أبو تمام الطائي',
		'أبو عبادة البحتري',
		'أبو الطيب المتنبي',
		'الجاحظ',
		'عبد الحميد الكاتب',
		'عبد الرحمن بن خلدون',
		'أبو البقاء الرندي',
		'ابن الوردي',
		'ابن بطوطة',
		'ابن خفاجة الأندلسي',
		'لسان الدين بن الخطيب',
		'محمود سامي البارودي',
		'أحمد شوقي',
		'حافظ إبراهيم',
		'إبراهيم طوقان',
		'عبد الرحيم محمود',
		'هاشم الرفاعي',
		'عبد الرحمن العشماوي'
	]
} as const;

/** Escape prose safely for Typst markup inside `typst_raw` blocks without breaking explicit `#underline[...]` or `#strong[...]`. */
function escapeTypstLiteral(text: string): string {
	return text
		.replace(/\\/g, '\\\\')
		.replace(/#/g, '\\#')
		.replace(/\$/g, '\\$')
		.replace(/</g, '\\<')
		.replace(/>/g, '\\>')
		.replace(/@/g, '\\@')
		.replace(/(?<!:)\/\//g, '\\/\\/');
}

/**
 * Formats Arabic exam prose markup inside a `typst_raw` block:
 * - `[[كلمة]]` -> underlined bold word (`#underline[#strong[كلمة]]`) for إعراب المفردات!
 * - `((جملة))` -> parenthesized bold sentence (`(#strong[جملة])`) for إعراب الجمل!
 */
export function formatExamArabicMarkup(raw: string): string {
	let s = escapeTypstLiteral(raw);
	s = s.replace(/\[\[([^\]]+)\]\]/g, '#underline[#strong[$1]]');
	s = s.replace(/\(\(([^)]+)\)\)/g, '(#strong[$1])');
	return s;
}

/**
 * Renders an authentic Algerian Arabic exam prose passage (`السند النثري`) inside a clean dignified bordered box.
 * Supports `[[كلمة]]` for underlined parsing targets and `((جملة))` for bracketed clause parsing targets.
 */
export function buildProsePassageBlock(opts: {
	title?: string;
	paragraphs: string[];
	author?: string;
	source?: string;
	vocabulary?: Array<{ word: string; meaning: string }>;
}): TypstRawBlock {
	const titlePart = opts.title
		? `#align(center)[#text(weight: "bold")[${escapeTypstLiteral(opts.title)}]]\n#v(4pt)\n`
		: '';
	const bodyLines = opts.paragraphs
		.map((p) => `#h(14pt);${formatExamArabicMarkup(p)}`)
		.join('\n\n');
	const attributionPieces = [opts.author, opts.source].filter(Boolean).map((x) => escapeTypstLiteral(x!));
	const attribution = attributionPieces.length
		? `\n#v(4pt)\n#align(left)[#text(style: "italic", size: 12.5pt)[— ${attributionPieces.join('، ')}]]`
		: '';
	const vocab =
		opts.vocabulary && opts.vocabulary.length > 0
			? `\n#v(5pt)\n#line(length: 100%, stroke: 0.4pt + luma(170))\n#v(3pt)\n#text(size: 12.5pt)[#strong[شرح المفردات:] ${opts.vocabulary
					.map((v) => `#strong[${escapeTypstLiteral(v.word)}]: ${escapeTypstLiteral(v.meaning)}`)
					.join(' — ')}]`
			: '';

	return {
		type: 'typst_raw',
		content: `#block(width: 100%, inset: 10pt, radius: 4pt, stroke: 0.75pt + rgb("#334155"), fill: rgb("#f8fafc"))[\n${titlePart}${bodyLines}${attribution}${vocab}\n]`
	};
}

/**
 * Renders an authentic classical/modern Arabic poem (`السند الشعري`) with numbered two-column centered hemistichs (`صدر البيت` | `عجز البيت`).
 * Supports `[[كلمة]]` (underlined word) and `((جملة))` (bracketed clause) inside any hemistich.
 */
export function buildPoetryPassageBlock(opts: {
	title?: string;
	verses: Array<[string, string]>;
	author: string;
	source?: string;
	vocabulary?: Array<{ word: string; meaning: string }>;
	numbered?: boolean;
}): TypstRawBlock {
	const numbered = opts.numbered ?? true;
	const titlePart = opts.title
		? `#align(center)[#text(weight: "bold")[${escapeTypstLiteral(opts.title)}]]\n#v(5pt)\n`
		: '';

	const gridCells = opts.verses
		.map(([sadr, ajuz], idx) => {
			const s = formatExamArabicMarkup(sadr);
			const a = formatExamArabicMarkup(ajuz);
			if (numbered) {
				return `[#text(size: 11.5pt, fill: rgb("#64748b"))[${idx + 1}.]], [${s}], [${a}]`;
			}
			return `[${s}], [${a}]`;
		})
		.join(',\n  ');

	const colsSpec = numbered ? '(auto, 1fr, 1fr)' : '(1fr, 1fr)';
	const alignSpec = numbered ? '(right, center, center)' : '(center, center)';

	const attributionPieces = [opts.author, opts.source].filter(Boolean).map((x) => escapeTypstLiteral(x!));
	const attribution = `\n#v(6pt)\n#align(left)[#text(style: "italic", size: 12.5pt)[— ${attributionPieces.join('، ')}]]`;
	const vocab =
		opts.vocabulary && opts.vocabulary.length > 0
			? `\n#v(5pt)\n#line(length: 100%, stroke: 0.4pt + luma(170))\n#v(3pt)\n#text(size: 12.5pt)[#strong[شرح المفردات:] ${opts.vocabulary
					.map((v) => `#strong[${escapeTypstLiteral(v.word)}]: ${escapeTypstLiteral(v.meaning)}`)
					.join(' — ')}]`
			: '';

	return {
		type: 'typst_raw',
		content: `#block(width: 100%, inset: 10pt, radius: 4pt, stroke: 0.75pt + rgb("#334155"), fill: rgb("#f8fafc"))[\n${titlePart}#grid(\n  columns: ${colsSpec},\n  column-gutter: 14pt,\n  row-gutter: 5pt,\n  align: ${alignSpec},\n  ${gridCells}\n)${attribution}${vocab}\n]`
	};
}

/**
 * Renders a crisp Arabic grammar parsing (`الإعراب النموذجي`) table with blank exam slots and blue model answers.
 */
export function buildIrabTableBlock(
	entries: Array<{ target: string; irab: string; mark: string }>
): TableBlock {
	return {
		type: 'table',
		headers: ['الكلمة أو الجملة', 'إعرابها النموذجي'],
		cells: [],
		rows: entries.map((e) => [
			{ content: e.target, bold: true },
			{ content: '................................................................', answer: e.irab, mark: e.mark }
		]),
		align: 'right',
		borders: 'grid',
		headerBackground: true,
		width: 'full'
	};
}

/**
 * Renders a prosody scansion (`التقطيع العروضي`) block for Literary / Foreign Languages exams.
 */
export function buildArudScansionBlock(opts: {
	verseSadr: string;
	verseAjuz: string;
	arudWriting: string;
	symbols: string;
	tafilat: string;
	meterName: string;
	mark: string;
}): ContentBlock {
	return {
		type: 'text',
		content: `قطّع البيت الآتي تقطيعا عروضيا، واكتب رموزه وتفعيلاته، ثم سمّ بحره: «${opts.verseSadr} ... ${opts.verseAjuz}»`,
		answer: `الكتابة العروضية: ${opts.arudWriting}\nالرموز: ${opts.symbols}\nالتفعيلات: ${opts.tafilat}\nالبحر الشعري: ${opts.meterName}.`,
		mark: opts.mark
	};
}

/**
 * Renders an authentic ONEC written expression (`الوضعية الإدماجية`) prompt + model answer & rubric.
 */
export function buildWrittenProductionBlock(opts: {
	context: string;
	supportQuote?: string;
	instruction: string;
	rubricCriteria: string[];
	modelOutline: string;
	mark: string;
}): ContentBlock {
	const quoteLine = opts.supportQuote ? `\nالسند: «${opts.supportQuote}»` : '';
	return {
		type: 'text',
		content: `السياق: ${opts.context}${quoteLine}\nالتعليمة: ${opts.instruction}`,
		answer: `معايير التقويم (${opts.mark} ن): ${opts.rubricCriteria.join(' | ')}.\nعناصر الإجابة المقترحة: ${opts.modelOutline}`,
		mark: opts.mark
	};
}
