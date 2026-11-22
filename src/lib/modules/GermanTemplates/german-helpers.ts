import type { ContentBlock, TableBlock, TypstRawBlock } from '../SujetBuilder/types';

/**
 * Automated doctrinal, pure Salafi methodology, halal-content, non-Muslim-author,
 * and institutional-header blocklist for ALL German Language content.
 */
export const GERMAN_DOCTRINAL_AND_CONTENT_BLOCKLIST: readonly {
	pattern: RegExp;
	reason: string;
}[] = [
	// Haram celebrations, lifestyle, entertainment, magic, and pagan mythology
	{
		pattern:
			/\b(weihnacht(?:en|sfest|sbaum|smann)?|heiligabend|ostern|osterfest|osterhase|karneval|fasching|oktoberfest|valentinstag|halloween|nikolaustag|allerseelen|silvesterparty)\b/i,
		reason: 'Non-Islamic religious or pagan celebration prohibited'
	},
	{
		pattern:
			/\b(alles\s+gute\s+zum\s+geburtstag|geburtstagsparty|geburtstagsfeier|geburtstagstorte|(?:meinen|seinen|ihren)\s+geburtstag\s+feiern)\b/i,
		reason: 'Birthday celebration avoided for Islamic compliance'
	},
	{
		pattern:
			/\b(rotwein|weißwein|weisswein|weinflasche|weinglas|biergarten|bierfass|bierflasche|schweinefleisch|schinken|alkoholismus|sekt|champagner|whisky|wodka|kasino|lotterie|glücksspiel|diskothek|nachtclub)\b/i,
		reason: 'Haram intoxicants / pork / gambling / nightclub prohibited'
	},
	{
		pattern: /\b(mein\s+fester\s+freund|meine\s+feste\s+freundin|romantische[ns]?\s+date|liebesgeschichte)\b/i,
		reason: 'Un-Islamic romantic context prohibited'
	},
	{
		pattern:
			/\b(gitarre|klavier|geige|violine|flöte|schlagzeug|rockkonzert|popkonzert|musikkonzert|opernhaus|musik\s+(?:hören|spielen)|tanzen\s+(?:auf|bei)\s+der\s+party)\b/i,
		reason: 'Musical instruments and dancing entertainment prohibited'
	},
	{
		pattern: /\b(hexe|zauberstab|schwarze\s+magie|astrologie|horoskop|wahrsagerei|tierkreiszeichen)\b/i,
		reason: 'Magic / astrology / fortune-telling prohibited'
	},
	{
		pattern: /\b(darwinismus|charles\s+darwin|evolutionstheorie|vom\s+affen\s+abstammen)\b/i,
		reason: 'Darwinian evolution contradicting Islamic creation'
	},
	{
		pattern: /\b(zeus|apollon|athene|osiris|göttin\s+isis|griechische\s+mythologie|götzenanbetung)\b/i,
		reason: 'Pagan mythology glorification prohibited'
	},
	// Non-Muslim literary authors / philosophers / composers / artists
	{
		pattern:
			/\b(johann\s+wolfgang\s+von\s+goethe|goethe|friedrich\s+schiller|schiller|franz\s+kafka|kafka|bertolt\s+brecht|brecht|thomas\s+mann|heinrich\s+heine|hermann\s+hesse|gotthold\s+ephraim\s+lessing|theodor\s+fontane|rainer\s+maria\s+rilke|heinrich\s+böll|friedrich\s+dürrenmatt|immanuel\s+kant|kant|friedrich\s+nietzsche|nietzsche|hegel|schopenhauer|karl\s+marx|sigmund\s+freud|wolfgang\s+amadeus\s+mozart|mozart|ludwig\s+van\s+beethoven|beethoven|johann\s+sebastian\s+bach|richard\s+wagner|shakespeare|voltaire|rousseau|cervantes|aristoteles|platon|sokrates|descartes)\b/i,
		reason: 'Non-Muslim literary author/philosopher/composer prohibited in generated texts'
	},
	// Excluded heterodox / non-Salafi figures
	{
		pattern:
			/\b(averroes|ibn\s+rushd|avicenna|ibn\s+sina|al-?ghazali|ibn\s+arabi|al-?hallaj|rumi|mowlana|sayyid\s+qutb|hassan\s+al-?banna|qaradawi|malek\s+bennabi|emir\s+abdelkader|khalil\s+gibran|kateb\s+yacine|mouloud\s+feraoun)\b/i,
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
		pattern: /\b(ministerium\s+für\s+nationale\s+bildung|nationales\s+prüfungsamt|ONEC)\b/i,
		reason: 'Official Ministry / ONEC header removed per legal policy'
	},
	{
		pattern: /وزارة\s*التربية|الديوان\s*الوطني/u,
		reason: 'ترويسة رسمية مستبعدة من المواضيع المولّدة'
	}
];

/** Approved Islamic & Algerian cultural/scientific heritage references for German lessons & exams. */
export const APPROVED_GERMAN_HERITAGE = {
	algerianFiguresAndLandmarks: [
		'Scheich Abdelhamid Ben Badis',
		'Scheich Mohamed Bachir El-Ibrahimi',
		'Scheich Moubarek El-Mili',
		'Moufdi Zakaria',
		'Larbi Ben M’hidi',
		'Die Kasbah von Algier',
		'Die Große Moschee von Tlemcen',
		'Das M’Zab-Tal (Ghardaïa)',
		'Tassili n’Ajjer',
		'Die Brücken von Constantine',
		'Die Qal’a der Beni Hammad'
	],
	islamicScientificHeritage: [
		'Al-Zahrawi (Abulcasis)',
		'Al-Idrisi',
		'Ibn Khaldoun',
		'Ibn Battuta',
		'Al-Khwarizmi',
		'Ibn Al-Haytham (Alhazen)',
		'Al-Biruni',
		'Fatima Al-Fihriya'
	]
} as const;

export function escapeTypstDe(text: string): string {
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
 * Formats German exam passage markup inside `typst_raw`:
 * - `[[Wort]]` -> underlined bold reference word (`#underline[#strong[Wort]]`)
 * - `((Ausdruck))` -> italicized bold highlight (`#emph[#strong[Ausdruck]]`)
 */
export function formatExamGermanMarkup(raw: string): string {
	let s = escapeTypstDe(raw);
	s = s.replace(/\[\[([^\]]+)\]\]/g, '#underline[#strong[$1]]');
	s = s.replace(/\(\(([^)]+)\)\)/g, '#emph[#strong[$1]]');
	return s;
}

/**
 * Renders an authentic Algerian German exam reading passage inside a clean LTR bordered box.
 * Supports numbered paragraphs (§1..§4), underlined bold references `[[Wort]]`, source, and Worterklärung.
 */
export function buildGermanPassageBlock(opts: {
	title?: string;
	paragraphs: string[];
	source?: string;
	numberedParagraphs?: boolean;
	glossary?: Array<{ term: string; meaning: string }>;
}): TypstRawBlock {
	const numbered = opts.numberedParagraphs ?? opts.paragraphs.length > 1;
	const titlePart = opts.title
		? `#align(center)[#text(weight: "bold", size: 12pt)[${escapeTypstDe(opts.title)}]]\n#v(4pt)\n`
		: '';
	const bodyLines = opts.paragraphs
		.map((p, idx) => {
			const prefix = numbered ? `#strong[(§${idx + 1})] ` : '#h(12pt);';
			return `${prefix}${formatExamGermanMarkup(p)}`;
		})
		.join('\n\n');

	const sourceLine = opts.source
		? `\n#v(4pt)\n#align(right)[#text(style: "italic", size: 9.5pt, fill: rgb("475569"))[— ${escapeTypstDe(opts.source)}]]`
		: '';

	const glossaryLine =
		opts.glossary && opts.glossary.length > 0
			? `\n#v(4pt)\n#line(length: 100%, stroke: 0.4pt + luma(170))\n#v(3pt)\n#text(size: 9.5pt)[#strong[Worterklärung :] ${opts.glossary
					.map((g) => `#strong[${escapeTypstDe(g.term)}] : ${escapeTypstDe(g.meaning)}`)
					.join(' | ')}]`
			: '';

	return {
		type: 'typst_raw',
		content: `#block(width: 100%, inset: 10pt, radius: 4pt, stroke: 0.75pt + rgb("334155"), fill: rgb("F8FAFC"))[\n${titlePart}${bodyLines}${sourceLine}${glossaryLine}\n]`,
		webMeta: {
			kind: 'passage_box',
			lang: 'de',
			title: opts.title,
			paragraphs: opts.paragraphs,
			numberedParagraphs: numbered,
			source: opts.source,
			glossary: opts.glossary ?? []
		}
	};
}

/**
 * Renders an authentic Algerian German classification table (Wortfelder, Ursache/Wirkung, Vorteile/Nachteile).
 */
export function buildGermanClassificationTableBlock(opts: {
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
 * Renders an authentic Algerian German Word Family morphology table (`Verb | Nomen | Adjektiv`).
 */
export function buildGermanWordFamilyTableBlock(
	rows: Array<{
		verb: { given?: boolean; value: string; mark?: string };
		nomen: { given?: boolean; value: string; mark?: string };
		adjektiv: { given?: boolean; value: string; mark?: string };
	}>
): TableBlock {
	const mk = (c: { given?: boolean; value: string; mark?: string }) =>
		c.given
			? { content: c.value, bold: true }
			: { content: '....................', answer: c.value, mark: c.mark };
	return {
		type: 'table',
		headers: ['Verb', 'Nomen', 'Adjektiv'],
		cells: [],
		rows: rows.map((r) => [mk(r.verb), mk(r.nomen), mk(r.adjektiv)]),
		align: 'center',
		borders: 'grid',
		headerBackground: true,
		width: 'full'
	};
}

/**
 * Renders an authentic Algerian German BAC / 2AS Written Production prompt (`Schriftlicher Ausdruck`):
 * Dual choice (`Thema 1 (Gelenkt)` + `Thema 2 (Frei)`) with full model essay & marking rubric.
 */
export function buildGermanWrittenProductionBlock(opts: {
	themaEinsTitle?: string;
	themaEinsPrompt: string;
	themaEinsStichpunkte: string[];
	themaZweiPrompt?: string;
	modelAnswer: string;
	rubricSummary: string;
	mark: string;
}): ContentBlock {
	const title1 = opts.themaEinsTitle ?? 'Thema 1 (Gelenkt) :';
	const notesBlock = opts.themaEinsStichpunkte.map((n) => `  - ${n}`).join('\n');
	const topicTwoPart = opts.themaZweiPrompt
		? `\n\n#strong[Thema 2 (Frei) :] ${opts.themaZweiPrompt}`
		: '';
	const headerPrompt = opts.themaZweiPrompt
		? '#strong[Wählen Sie EINES der beiden folgenden Themen aus :]\n'
		: '';

	return {
		type: 'text',
		content: `${headerPrompt}#strong[${title1}] ${opts.themaEinsPrompt}\n#strong[Stichpunkte und Redemittel :]\n${notesBlock}${topicTwoPart}`,
		answer: `#strong[Bewertungsskala (${opts.mark} Pkt.) :] ${opts.rubricSummary}\n\n#strong[Musterlösung (Aufsatzvorschlag) :]\n${opts.modelAnswer}`,
		mark: opts.mark
	};
}
