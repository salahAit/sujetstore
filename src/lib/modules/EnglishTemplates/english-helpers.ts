import type { ContentBlock, TableBlock, TypstRawBlock } from '../SujetBuilder/types';

/**
 * Automated doctrinal, pure Salafi methodology, halal-content, non-Muslim-author,
 * and institutional-header blocklist for ALL English Language content (enforced by scripts/audit-english-content.ts).
 */
export const ENGLISH_DOCTRINAL_AND_CONTENT_BLOCKLIST: readonly {
	pattern: RegExp;
	reason: string;
}[] = [
	// Haram celebrations, lifestyle, entertainment, and pagan mythology glorification
	{ pattern: /\b(christmas|halloween|valentine'?s?|easter|santa\s*claus)\b/i, reason: 'Non-Islamic religious celebration' },
	{ pattern: /\b(birthday\s+party|happy\s+birthday|celebrat\w*\s+(?:his|her|my|their)\s+birthday)\b/i, reason: 'Birthday celebration (avoid per Islamic compliance)' },
	{ pattern: /\b(wine|alcohol|beer|whisky|whiskey|vodka|champagne|nightclub|casino|gambling|lottery)\b/i, reason: 'Haram intoxicants / gambling' },
	{ pattern: /\b(boyfriend|girlfriend|dating|romantic\s+date)\b/i, reason: 'Un-Islamic relationship context' },
	{ pattern: /\b(rock\s+music|pop\s+music|music\s+concert|play(?:s|ing|ed)?\s+the\s+(?:guitar|piano|violin|drums)|listen(?:s|ing|ed)?\s+to\s+music|singing\s+and\s+dancing|danc(?:e|ing)\s+party)\b/i, reason: 'Musical instruments / dancing entertainment' },
	{ pattern: /\b(darwin(?:ism)?|theory\s+of\s+evolution|evolved\s+from\s+apes?)\b/i, reason: 'Darwinian evolution contradicting Islamic creation' },
	{ pattern: /\b(zeus|apollo|athena|osiris|isis\s+goddess|worshipped?\s+idols?|pagan\s+gods?\s+blessed)\b/i, reason: 'Pagan mythology glorification' },
	// Non-Muslim literary authors / philosophers (ZERO non-Muslim literary excerpts or quotes)
	{ pattern: /\b(shakespeare|charles\s+dickens|hemingway|george\s+orwell|mark\s+twain|jane\s+austen|j\.?\s*k\.?\s*rowling|kahlil\s+gibran|iliya\s+abu\s+madi|mikhail\s+naima|victor\s+hugo|voltaire|rousseau|aristotle|plato|socrates|charles\s+darwin)\b/i, reason: 'Non-Muslim author/philosopher prohibited in generated texts' },
	// Excluded non-Salafi modern/heterodox figures (English & Arabic)
	{ pattern: /\b(ali\s+al-?tantawi|tantawi|muhammad\s+al-?ghazali|al-?ghazali|emir\s+abdelkader|malek\s+bennabi|muhammad\s+iqbal|al-?rafii|al-?manfaluti|sayyid\s+qutb|hassan\s+al-?banna|qaradawi|ibn\s+arabi|al-?hallaj|rumi|abu\s+nuwas|al-?maarri)\b/i, reason: 'Excluded non-Salafi or heterodox figure' },
	{ pattern: /علي\s*الطنطاوي|الطنطاوي|محمد\s*الغزالي|الغزالي|الأمير\s*عبد\s*القادر|مالك\s*بن\s*نبي|محمد\s*إقبال|الرافعي|المنفلوطي|سيد\s*قطب|حسن\s*البنا|القرضاوي|ابن\s*عربي|الحلاج|أبو\s*نواس|المعري/u, reason: 'شخصية مستبعدة حفاظا على نقاء المنهج السلفي' },
	// Explicit names of Salafi scholars requested NOT to be stated explicitly
	{ pattern: /\b(ibn\s+al-?qayyim|ibn\s+taymiyyah|al-?uthaymeen|uthaymin|ibn\s+baz|al-?albani|al-?fawzan)\b/i, reason: 'User requested benefiting from Salafi scholars WITHOUT naming them explicitly' },
	{ pattern: /ابن\s*القيم|ابن\s*قيم\s*الجوزية|ابن\s*تيمية|العثيمين|ابن\s*عثيمين|ابن\s*باز|الألباني|الفوزان/u, reason: 'طلب المستخدم عدم التصريح بأسماء المشايخ السلفيين المعاصرين/المتأخرين' },
	// Official Ministry / ONEC institutional headers strictly removed from all generated material
	{ pattern: /\b(ministry\s+of\s+national\s+education|national\s+office\s+of\s+examinations|ONEC)\b/i, reason: 'Official Ministry / ONEC header removed per legal policy' },
	{ pattern: /وزارة\s*التربية|الديوان\s*الوطني/u, reason: 'ترويسة رسمية مستبعدة من المواضيع المولّدة' }
];

/**
 * Approved Algerian & Islamic heritage figures / landmarks for English reading passages & 4AM/3AS units.
 */
export const APPROVED_ENGLISH_HERITAGE = {
	algerianScholarsAndPatriots: [
		'Imam Abdelhamid Ben Badis',
		'Sheikh Mohamed Bachir El Ibrahimi',
		'Sheikh Moubarek El Mili',
		'Sheikh Larbi Tebessi',
		'Sheikh Ahmed Sahnoun',
		'Poet Mohamed El Aid Al Khalifa',
		'Poet Moufdi Zakaria',
		'Historian Abou El Kacem Saadallah'
	],
	muslimScientistsAndScholars: [
		'Imam Al-Bukhari',
		'Imam Muslim',
		'Imam Malik',
		'Imam Al-Shafii',
		'Imam Ahmad ibn Hanbal',
		'Muhammad ibn Musa al-Khwarizmi',
		'Abdurrahman Ibn Khaldun',
		'Ibn Battuta',
		'Al-Jazari',
		'Al-Idrisi',
		'Al-Biruni',
		'Ibn al-Haytham',
		'Al-Zahrawi',
		'Fatima al-Fihri'
	],
	algerianLandmarks: [
		'The Casbah of Algiers',
		'The Great Mosque of Tlemcen',
		'The Great Mosque of Algiers (Djamaa El Djazair)',
		'Timgad (Batna)',
		'Tassili n-Ajjer',
		'The Bridges of Constantine',
		'Beni Hammad Fort (M-Sila)',
		'M-Zab Valley (Ghardaia)'
	]
} as const;

function escapeTypstEn(text: string): string {
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
 * Formats English exam passage markup inside `typst_raw`:
 * - `[[word]]` -> underlined bold reference word (`#underline[#strong[word]]`) for pronoun-reference/synonym questions!
 * - `((phrase))` -> italicized bold highlight (`#emph[#strong[phrase]]`)!
 */
export function formatExamEnglishMarkup(raw: string): string {
	let s = escapeTypstEn(raw);
	s = s.replace(/\[\[([^\]]+)\]\]/g, '#underline[#strong[$1]]');
	s = s.replace(/\(\(([^)]+)\)\)/g, '#emph[#strong[$1]]');
	return s;
}

/**
 * Renders an authentic Algerian English exam reading passage in a clean LTR bordered box.
 * Supports numbered paragraphs (§1, §2, §3), underlined bold reference words `[[word]]`, and clean source attribution.
 */
export function buildEnglishPassageBlock(opts: {
	title?: string;
	paragraphs: string[];
	source?: string;
	numberedParagraphs?: boolean;
	glossary?: Array<{ term: string; meaning: string }>;
}): TypstRawBlock {
	const numbered = opts.numberedParagraphs ?? opts.paragraphs.length > 1;
	const titlePart = opts.title
		? `#align(center)[#text(weight: "bold", size: 12pt)[${escapeTypstEn(opts.title)}]]\n#v(4pt)\n`
		: '';
	const bodyLines = opts.paragraphs
		.map((p, idx) => {
			const prefix = numbered ? `#strong[(§${idx + 1})] ` : '#h(12pt);';
			return `${prefix}${formatExamEnglishMarkup(p)}`;
		})
		.join('\n\n');

	const sourceLine = opts.source
		? `\n#v(4pt)\n#align(right)[#text(style: "italic", size: 9.5pt, fill: rgb("475569"))[— ${escapeTypstEn(opts.source)}]]`
		: '';

	const glossaryLine =
		opts.glossary && opts.glossary.length > 0
			? `\n#v(4pt)\n#line(length: 100%, stroke: 0.4pt + luma(170))\n#v(3pt)\n#text(size: 9.5pt)[#strong[Glossary:] ${opts.glossary
					.map((g) => `#strong[${escapeTypstEn(g.term)}]: ${escapeTypstEn(g.meaning)}`)
					.join(' | ')}]`
			: '';

	return {
		type: 'typst_raw',
		content: `#block(width: 100%, inset: 10pt, radius: 4pt, stroke: 0.75pt + rgb("334155"), fill: rgb("F8FAFC"))[\n${titlePart}${bodyLines}${sourceLine}${glossaryLine}\n]`
	};
}

/**
 * Renders an authentic Algerian English Phonology classification table (`/s/ /z/ /iz/`, `/t/ /d/ /id/`, syllable count, or stress).
 */
export function buildEnglishPhonologyTableBlock(opts: {
	columns: Array<{ header: string; words: string[]; mark?: string }>;
}): TableBlock {
	return {
		type: 'table',
		headers: opts.columns.map((c) => c.header),
		cells: [],
		rows: [
			opts.columns.map((c) => ({
				content: '....................',
				answer: c.words.join(' , '),
				mark: c.mark
			}))
		],
		align: 'center',
		borders: 'grid',
		headerBackground: true,
		width: 'full'
	};
}

/**
 * Renders an authentic Algerian BAC Word-Building (Morphology) table (`Verb | Noun | Adjective`).
 */
export function buildEnglishWordBuildingTableBlock(
	rows: Array<{
		verb: { given?: boolean; value: string; mark?: string };
		noun: { given?: boolean; value: string; mark?: string };
		adjective: { given?: boolean; value: string; mark?: string };
	}>
): TableBlock {
	const mk = (c: { given?: boolean; value: string; mark?: string }) =>
		c.given
			? { content: c.value, bold: true }
			: { content: '....................', answer: c.value, mark: c.mark };
	return {
		type: 'table',
		headers: ['Verb', 'Noun', 'Adjective'],
		cells: [],
		rows: rows.map((r) => [mk(r.verb), mk(r.noun), mk(r.adjective)]),
		align: 'center',
		borders: 'grid',
		headerBackground: true,
		width: 'full'
	};
}

/**
 * Renders an authentic Algerian BEM / BAC Written Expression block (Topic One guided + Topic Two free essay)
 * with complete model paragraph & scoring rubric in solution mode.
 */
export function buildEnglishWrittenExpressionBlock(opts: {
	topicOnePrompt: string;
	topicOneNotes: string[];
	topicTwoPrompt?: string;
	modelAnswer: string;
	rubricSummary: string;
	mark: string;
}): ContentBlock {
	const notesBlock = opts.topicOneNotes.map((n) => `  - ${n}`).join('\n');
	const topicTwoPart = opts.topicTwoPrompt
		? `\n\n#strong[Topic Two (Free):] ${opts.topicTwoPrompt}`
		: '';

	return {
		type: 'text',
		content: `#strong[Choose ONE of the following topics:]\n#strong[Topic One (Guided):] ${opts.topicOnePrompt}\n#strong[Use the following notes:]\n${notesBlock}${topicTwoPart}`,
		answer: `#strong[Marking Criteria (${opts.mark} pts):] ${opts.rubricSummary}\n\n#strong[Suggested Model Answer (Topic One):]\n${opts.modelAnswer}`,
		mark: opts.mark
	};
}
