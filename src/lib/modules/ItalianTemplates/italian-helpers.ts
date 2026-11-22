import type { ContentBlock, TableBlock, TypstRawBlock } from '../SujetBuilder/types';

/**
 * Automated doctrinal, pure Salafi methodology, halal-content, non-Muslim-author,
 * and institutional-header blocklist for ALL Italian Language content.
 */
export const ITALIAN_DOCTRINAL_AND_CONTENT_BLOCKLIST: readonly {
	pattern: RegExp;
	reason: string;
}[] = [
	// Haram celebrations, lifestyle, entertainment, magic, and pagan mythology
	{
		pattern:
			/\b(natale|babbo\s+natale|pasqua|carnevale|san\s+valentino|halloween|vigilia\s+di\s+natale|epifania|capodanno\s+notturno|ferragosto\s+pagano)\b/i,
		reason: 'Non-Islamic religious or pagan celebration prohibited'
	},
	{
		pattern:
			/\b(buon\s+compleanno|festa\s+di\s+compleanno|torta\s+di\s+compleanno|festeggiare\s+(?:il\s+)?(?:suo|mio|tuo)\s+compleanno)\b/i,
		reason: 'Birthday celebration avoided for Islamic compliance'
	},
	{
		pattern:
			/\b(vino(?:\s+(?:rosso|bianco))?|bottiglia\s+di\s+vino|bicchiere\s+di\s+vino|birra|champagne|prosecco|spumante|whisky|vodka|prosciutto|carne\s+di\s+maiale|pancetta|salame|casin[oò]|lotteria|scommesse|discoteca|locale\s+notturno)\b/i,
		reason: 'Haram intoxicants / pork / gambling / nightclub prohibited'
	},
	{
		pattern: /\b(il\s+mio\s+fidanzato|la\s+mia\s+fidanzata|appuntamento\s+romantico|storia\s+d[’']amore)\b/i,
		reason: 'Un-Islamic romantic context prohibited'
	},
	{
		pattern:
			/\b(chitarra|pianoforte|violino|flauto|batteria\s+musicale|concerto\s+di\s+musica|teatro\s+d[’']opera|suonare\s+la\s+musica|ascoltare\s+musica|ballare\s+alla\s+festa|sfilata\s+di\s+moda)\b/i,
		reason: 'Musical instruments / opera / dancing entertainment / fashion runway prohibited'
	},
	{
		pattern: /\b(strega|fata\s+maga|magia\s+nera|astrologia|oroscopo|divinazione|zodiaco)\b/i,
		reason: 'Magic / astrology / fortune-telling prohibited'
	},
	{
		pattern: /\b(darwinismo|charles\s+darwin|teoria\s+dell[’']evoluzione|discendere\s+dalla\s+scimmia)\b/i,
		reason: 'Darwinian evolution contradicting Islamic creation'
	},
	{
		pattern: /\b(zeus|apollo|aten[ea]|osiride|dea\s+iside|giove|venere|minerva|mitologia\s+(?:greca|romana)|adorare\s+idoli)\b/i,
		reason: 'Pagan mythology glorification prohibited'
	},
	// Non-Muslim literary authors / philosophers / composers / painters
	{
		pattern:
			/\b(dante\s+alighieri|dante|petrarca|boccaccio|machiavelli|alessandro\s+manzoni|manzoni|giacomo\s+leopardi|leopardi|luigi\s+pirandello|pirandello|giovanni\s+pascoli|giosu[eè]\s+carducci|gabriele\s+d[’']annunzio|italo\s+calvino|umberto\s+eco|leonardo\s+da\s+vinci|michelangelo|raffaello|giuseppe\s+verdi|puccini|rossini|vivaldi|shakespeare|cervantes|goethe|voltaire|rousseau|aristotele|platone|socrate|cartesio)\b/i,
		reason: 'Non-Muslim literary author/philosopher/composer prohibited in generated texts'
	},
	// Excluded heterodox / non-Salafi figures
	{
		pattern:
			/\b(averro[eè]|ibn\s+rushd|avicenna|ibn\s+sina|al-?ghazali|ibn\s+arabi|al-?hallaj|rumi|mowlana|sayyid\s+qutb|hassan\s+al-?banna|qaradawi|malek\s+bennabi|emir\s+abdelkader|khalil\s+gibran|kateb\s+yacine|mouloud\s+feraoun)\b/i,
		reason: 'Excluded non-Salafi, heterodox, or secular figure'
	},
	{
		pattern: /ﷺ/u,
		reason: 'رمز ﷺ محظور — اكتب صلى الله عليه وسلم كاملة'
	},
	{
		pattern: /[✓✕✗]/u,
		reason: 'Unicode check/cross symbol forbidden in Typst'
	},
	// Late/contemporary Salafi scholars not to be named explicitly
	{
		pattern: /\b(ibn\s+taymiyy?ah?|ibn\s+al-?qayyim|ibn\s+qayyim|al-?uthaymeen|ibn\s+baz|al-?albani|al-?fawzan)\b/i,
		reason: 'Benefiting from scholars without naming them explicitly'
	},
	// Official Ministry / ONEC headers strictly excluded from generated papers
	{
		pattern: /\b(ministero\s+dell[’']educazione\s+nazionale|ufficio\s+nazionale\s+degli\s+esami|ONEC)\b/i,
		reason: 'Official Ministry / ONEC header removed per legal policy'
	},
	{
		pattern: /وزارة\s*التربية|الديوان\s*الوطني/u,
		reason: 'ترويسة رسمية مستبعدة من المواضيع المولّدة'
	}
];

/** Approved Islamic & Algerian cultural/scientific heritage references for Italian lessons & exams. */
export const APPROVED_ITALIAN_HERITAGE = {
	algerianFiguresAndLandmarks: [
		'Cheikh Abdelhamid Ben Badis',
		'Cheikh Mohamed Bachir El-Ibrahimi',
		'Cheikh Moubarek El-Mili',
		'Moufdi Zakaria',
		'Larbi Ben M’hidi',
		'La Casbah di Algeri',
		'La Grande Moschea di Tlemcen',
		'La Valle dello M’Zab (Ghardaïa)',
		'Tassili n’Ajjer',
		'I Ponti di Costantina',
		'La Qal’a dei Beni Hammad'
	],
	mediterraneanAndIslamicHeritage: [
		'Al-Idrisi (cartografo in Sicilia)',
		'Al-Zahrawi (Abulcasis)',
		'Ibn Khaldoun',
		'Ibn Battuta',
		'Al-Khwarizmi',
		'Ibn Al-Haytham (Alhazen)',
		'Al-Biruni',
		'Fatima Al-Fihriya'
	]
} as const;

export function escapeTypstIt(text: string): string {
	return text
		.replace(/ﷺ/g, 'صلى الله عليه وسلم')
		.replace(/\\/g, '\\\\')
		.replace(/#/g, '\\#')
		.replace(/\$/g, '\\$')
		.replace(/</g, '\\<')
		.replace(/>/g, '\\>')
		.replace(/@/g, '\\@')
		.replace(/(?<!:)\/\//g, '\\/\\/');
}

/**
 * Formats Italian exam passage markup inside `typst_raw`:
 * - `[[parola]]` -> underlined bold reference word (`#underline[#strong[parola]]`)
 * - `((espressione))` -> italicized bold highlight (`#emph[#strong[espressione]]`)
 */
export function formatExamItalianMarkup(raw: string): string {
	let s = escapeTypstIt(raw);
	s = s.replace(/\[\[([^\]]+)\]\]/g, '#underline[#strong[$1]]');
	s = s.replace(/\(\(([^)]+)\)\)/g, '#emph[#strong[$1]]');
	return s;
}

/**
 * Renders an authentic Algerian Italian exam reading passage inside a clean LTR bordered box.
 * Supports numbered paragraphs (§1..§4), underlined bold references `[[parola]]`, source, and Glossario.
 */
export function buildItalianPassageBlock(opts: {
	title?: string;
	paragraphs: string[];
	source?: string;
	numberedParagraphs?: boolean;
	glossary?: Array<{ term: string; meaning: string }>;
}): TypstRawBlock {
	const numbered = opts.numberedParagraphs ?? opts.paragraphs.length > 1;
	const titlePart = opts.title
		? `#align(center)[#text(weight: "bold", size: 12pt)[${escapeTypstIt(opts.title)}]]\n#v(4pt)\n`
		: '';
	const bodyLines = opts.paragraphs
		.map((p, idx) => {
			const prefix = numbered ? `#strong[(§${idx + 1})] ` : '#h(12pt);';
			return `${prefix}${formatExamItalianMarkup(p)}`;
		})
		.join('\n\n');

	const sourceLine = opts.source
		? `\n#v(4pt)\n#align(right)[#text(style: "italic", size: 9.5pt, fill: rgb("475569"))[— ${escapeTypstIt(opts.source)}]]`
		: '';

	const glossaryLine =
		opts.glossary && opts.glossary.length > 0
			? `\n#v(4pt)\n#line(length: 100%, stroke: 0.4pt + luma(170))\n#v(3pt)\n#text(size: 9.5pt)[#strong[Glossario :] ${opts.glossary
					.map((g) => `#strong[${escapeTypstIt(g.term)}] : ${escapeTypstIt(g.meaning)}`)
					.join(' | ')}]`
			: '';

	return {
		type: 'typst_raw',
		content: `#block(width: 100%, inset: 10pt, radius: 4pt, stroke: 0.75pt + rgb("334155"), fill: rgb("F8FAFC"))[\n${titlePart}${bodyLines}${sourceLine}${glossaryLine}\n]`,
		webMeta: {
			kind: 'passage_box',
			lang: 'it',
			title: opts.title,
			paragraphs: opts.paragraphs,
			numberedParagraphs: numbered,
			source: opts.source,
			glossary: opts.glossary ?? []
		}
	};
}

/**
 * Renders an authentic Algerian Italian classification table (Campi lessicali, Causa/Effetto, Vantaggi/Rischi).
 */
export function buildItalianClassificationTableBlock(opts: {
	columns: Array<{ header: string; items: string[]; mark?: string }>;
}): TableBlock {
	return {
		type: 'table',
		headers: opts.columns.map((c) => c.header),
		cells: [],
		rows: [
			opts.columns.map((c) => ({
				content: '....................',
				answer: c.items.join(' ; '),
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
 * Renders an authentic Algerian Italian Word Family morphology table (`Verbo | Sostantivo | Aggettivo`).
 */
export function buildItalianWordFamilyTableBlock(
	rows: Array<{
		verbo: { given?: boolean; value: string; mark?: string };
		sostantivo: { given?: boolean; value: string; mark?: string };
		aggettivo: { given?: boolean; value: string; mark?: string };
	}>
): TableBlock {
	const mk = (c: { given?: boolean; value: string; mark?: string }) =>
		c.given
			? { content: c.value, bold: true }
			: { content: '....................', answer: c.value, mark: c.mark };
	return {
		type: 'table',
		headers: ['Verbo', 'Sostantivo', 'Aggettivo'],
		cells: [],
		rows: rows.map((r) => [mk(r.verbo), mk(r.sostantivo), mk(r.aggettivo)]),
		align: 'center',
		borders: 'grid',
		headerBackground: true,
		width: 'full'
	};
}

/**
 * Renders an authentic Algerian Italian BAC / 2AS Written Production prompt (`Produzione scritta`):
 * Dual choice (`Traccia 1 (Guidata)` + `Traccia 2 (Libera)`) with full model essay & marking rubric.
 */
export function buildItalianWrittenProductionBlock(opts: {
	tracciaUnoTitle?: string;
	tracciaUnoPrompt: string;
	tracciaUnoPunti: string[];
	tracciaDuePrompt?: string;
	modelAnswer: string;
	rubricSummary: string;
	mark: string;
}): ContentBlock {
	const title1 = opts.tracciaUnoTitle ?? 'Traccia 1 (Guidata) :';
	const notesBlock = opts.tracciaUnoPunti.map((n) => `  - ${n}`).join('\n');
	const topicTwoPart = opts.tracciaDuePrompt
		? `\n\n#strong[Traccia 2 (Libera) :] ${opts.tracciaDuePrompt}`
		: '';
	const headerPrompt = opts.tracciaDuePrompt
		? '#strong[Scegli UNA delle due tracce proposte :]\n'
		: '';

	return {
		type: 'text',
		content: `${headerPrompt}#strong[${title1}] ${opts.tracciaUnoPrompt}\n#strong[Punti di riflessione e lessico utile :]\n${notesBlock}${topicTwoPart}`,
		answer: `#strong[Griglia di valutazione (${opts.mark} pti) :] ${opts.rubricSummary}\n\n#strong[Proposta di correzione modello :]\n${opts.modelAnswer}`,
		mark: opts.mark
	};
}
