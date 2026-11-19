import type { ContentBlock, TableBlock, TypstRawBlock } from '../SujetBuilder/types';

/**
 * Automated doctrinal, pure Salafi methodology, halal-content, non-Muslim-author,
 * and institutional-header blocklist for ALL French Language content (enforced by scripts/audit-french-content.ts).
 */
export const FRENCH_DOCTRINAL_AND_CONTENT_BLOCKLIST: readonly {
	pattern: RegExp;
	reason: string;
}[] = [
	// Haram celebrations, lifestyle, entertainment, magic, and pagan mythology
	{ pattern: /\b(no[eë]l|p[eè]re\s+no[eë]l|halloween|saint[- ]valentin|p[aâ]ques|r[eé]veillon)\b/i, reason: 'Non-Islamic religious/secular celebration' },
	{ pattern: /\b(joyeux\s+anniversaire|f[eê]te\s+d'anniversaire|g[aâ]teau\s+d'anniversaire|f[eê]ter\s+(?:son|mon|ton|leur)\s+anniversaire)\b/i, reason: 'Birthday celebration (avoid per Islamic compliance)' },
	{ pattern: /\b(vin\s+rouge|vin\s+blanc|bouteille\s+de\s+vin|alcool|bi[eè]re|whisky|vodka|champagne|casino|loterie|bo[iî]te\s+de\s+nuit|discoth[eè]que)\b/i, reason: 'Haram intoxicants / gambling / nightclub' },
	{ pattern: /\b(petit\s+ami|petite\s+amie|rendez-vous\s+amoureux|histoire\s+d'amour)\b/i, reason: 'Un-Islamic romantic context' },
	{ pattern: /\b(guitare|piano|violon|batterie|concert\s+de\s+musique|jouer\s+de\s+la\s+musique|[eé]couter\s+de\s+la\s+musique|danser\s+en\s+soir[eé]e|bal\s+dansant)\b/i, reason: 'Musical instruments / dancing entertainment' },
	{ pattern: /\b(sorci[eè]re|f[eé]e\s+magique|baguette\s+magique|magie\s+noire|astrologie|horoscope|voyante|fant[oô]me\s+maudit)\b/i, reason: 'Magic / sorcery / astrology prohibited' },
	{ pattern: /\b(darwin(?:isme)?|th[eé]orie\s+de\s+l'[eé]volution|descend\w*\s+du\s+singe)\b/i, reason: 'Darwinian evolution contradicting Islamic creation' },
	{ pattern: /\b(zeus|apollon|ath[eé]na|osiris|d[eé]esse\s+isis|adorer\s+des\s+idoles)\b/i, reason: 'Pagan mythology glorification' },
	// Non-Muslim literary authors / philosophers (ZERO non-Muslim authors in generated texts)
	{
		pattern:
			/\b(victor\s+hugo|voltaire|rousseau|moli[eè]re|balzac|emile\s+zola|\bzola\b|flaubert|maupassant|albert\s+camus|\bcamus\b|saint[- ]exup[eé]ry|la\s+fontaine|charles\s+perrault|perrault|baudelaire|rimbaud|verlaine|corneille|racine|descartes|montaigne|montesquieu|diderot|sartre|simone\s+de\s+beauvoir|stendhal|proust|jules\s+verne|alexandre\s+dumas|shakespeare|charles\s+dickens|george\s+orwell|mark\s+twain|hemingway|kahlil\s+gibran|gibran|aristote|platon|socrate|charles\s+darwin)\b/i,
		reason: 'Non-Muslim author/philosopher prohibited in generated texts'
	},
	// Excluded non-Salafi modern/heterodox figures (French & Arabic)
	{
		pattern:
			/\b(ali\s+al-?tantawi|tantawi|mohamed\s+al-?ghazali|muhammad\s+al-?ghazali|al-?ghazali|[eé]mir\s+abdelkader|malek\s+bennabi|mohamed\s+iqbal|muhammad\s+iqbal|al-?rafii|al-?manfaluti|sayyid\s+qutb|hassan\s+al-?banna|qaradawi|ibn\s+arabi|al-?hallaj|roumi|rumi|abou\s+nouwas|abu\s+nuwas|al-?maarri|kateb\s+yacine|mouloud\s+feraoun|assia\s+djebar|mohammed\s+dib)\b/i,
		reason: 'Excluded non-Salafi, secular, or heterodox figure'
	},
	{
		pattern:
			/علي\s*الطنطاوي|الطنطاوي|محمد\s*الغزالي|الغزالي|الأمير\s*عبد\s*القادر|مالك\s*بن\s*نبي|محمد\s*إقبال|الرافعي|المنفلوطي|سيد\s*قطب|حسن\s*البنا|القرضاوي|ابن\s*عربي|الحلاج|أبو\s*نواس|المعري|كاتب\s*ياسين|مولود\s*فرعون/u,
		reason: 'شخصية مستبعدة حفاظا على نقاء المنهج السلفي'
	},
	// Explicit names of Salafi scholars requested NOT to be stated explicitly
	{
		pattern: /\b(ibn\s+al-?qayyim|ibn\s+qayyim|ibn\s+taymiyy?ah?|al-?uthaymeen|uthaymin|otha[iî]mine|ibn\s+baz|al-?albani|al-?fawzan)\b/i,
		reason: 'User requested benefiting from Salafi scholars WITHOUT naming them explicitly'
	},
	{
		pattern: /ابن\s*القيم|ابن\s*قيم\s*الجوزية|ابن\s*تيمية|العثيمين|ابن\s*عثيمين|ابن\s*باز|الألباني|الفوزان/u,
		reason: 'طلب المستخدم عدم التصريح بأسماء المشايخ السلفيين المعاصرين/المتأخرين'
	},
	// Official Ministry / ONEC institutional headers strictly removed from all generated material
	{
		pattern: /\b(minist[eè]re\s+de\s+l'[eé]ducation\s+nationale|office\s+national\s+des\s+examens|ONEC)\b/i,
		reason: 'Official Ministry / ONEC header removed per legal policy'
	},
	{
		pattern: /وزارة\s*التربية|الديوان\s*الوطني/u,
		reason: 'ترويسة رسمية مستبعدة من المواضيع المولّدة'
	}
];

/**
 * Approved Algerian & Islamic heritage figures / landmarks for French reading passages & 3AM/4AM/3AS units.
 */
export const APPROVED_FRENCH_HERITAGE = {
	algerianScholarsAndPatriots: [
		'Cheikh Abdelhamid Ben Badis',
		'Cheikh Mohamed Bachir El-Ibrahimi',
		'Cheikh Moubarek El-Mili',
		'Cheikh Larbi Tebessi',
		'Cheikh Ahmed Sahnoun',
		'Le poète Mohamed El-Aïd Al-Khalifa',
		'Le poète Moufdi Zakaria',
		'L’historien Abou El-Kacem Saadallah',
		'Larbi Ben M’hidi',
		'Didouche Mourad',
		'Ahmed Zabana',
		'Hassiba Ben Bouali'
	],
	muslimScientistsAndScholars: [
		'L’Imam Al-Boukhari',
		'L’Imam Mouslim',
		'L’Imam Malik',
		'L’Imam Al-Chafii',
		'L’Imam Ahmad ibn Hanbal',
		'Al-Khwarizmi',
		'Ibn Khaldoun',
		'Ibn Battouta',
		'Al-Jazari',
		'Al-Idrisi',
		'Al-Birouni',
		'Ibn Al-Haytham',
		'Al-Zahrawi',
		'Fatima Al-Fihriya'
	],
	algerianLandmarks: [
		'La Casbah d’Alger',
		'La Grande Mosquée de Tlemcen',
		'Djamaâ El-Djazaïr (La Grande Mosquée d’Alger)',
		'Timgad (Batna)',
		'Le Tassili n’Ajjer',
		'Les Ponts de Constantine',
		'La Kalâa des Béni Hammad (M’Sila)',
		'La Vallée du M’Zab (Ghardaïa)',
		'Le Jardin d’Essai du Hamma (Alger)'
	]
} as const;

function escapeTypstFr(text: string): string {
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
 * Formats French exam passage markup inside `typst_raw`:
 * - `[[mot]]` -> underlined bold reference word (`#underline[#strong[mot]]`) for substituts grammaticaux / synonymes!
 * - `((expression))` -> italicized bold highlight (`#emph[#strong[expression]]`)!
 */
export function formatExamFrenchMarkup(raw: string): string {
	let s = escapeTypstFr(raw);
	s = s.replace(/\[\[([^\]]+)\]\]/g, '#underline[#strong[$1]]');
	s = s.replace(/\(\(([^)]+)\)\)/g, '#emph[#strong[$1]]');
	return s;
}

/**
 * Renders an authentic Algerian French exam reading passage in a clean LTR bordered box.
 * Supports numbered paragraphs (§1, §2, §3), underlined bold reference words `[[mot]]`, source line, and Lexique.
 */
export function buildFrenchPassageBlock(opts: {
	title?: string;
	paragraphs: string[];
	source?: string;
	numberedParagraphs?: boolean;
	glossary?: Array<{ term: string; meaning: string }>;
}): TypstRawBlock {
	const numbered = opts.numberedParagraphs ?? opts.paragraphs.length > 1;
	const titlePart = opts.title
		? `#align(center)[#text(weight: "bold", size: 12pt)[${escapeTypstFr(opts.title)}]]\n#v(4pt)\n`
		: '';
	const bodyLines = opts.paragraphs
		.map((p, idx) => {
			const prefix = numbered ? `#strong[(§${idx + 1})] ` : '#h(12pt);';
			return `${prefix}${formatExamFrenchMarkup(p)}`;
		})
		.join('\n\n');

	const sourceLine = opts.source
		? `\n#v(4pt)\n#align(right)[#text(style: "italic", size: 9.5pt, fill: rgb("475569"))[— ${escapeTypstFr(opts.source)}]]`
		: '';

	const glossaryLine =
		opts.glossary && opts.glossary.length > 0
			? `\n#v(4pt)\n#line(length: 100%, stroke: 0.4pt + luma(170))\n#v(3pt)\n#text(size: 9.5pt)[#strong[Lexique :] ${opts.glossary
					.map((g) => `#strong[${escapeTypstFr(g.term)}] : ${escapeTypstFr(g.meaning)}`)
					.join(' | ')}]`
			: '';

	return {
		type: 'typst_raw',
		content: `#block(width: 100%, inset: 10pt, radius: 4pt, stroke: 0.75pt + rgb("334155"), fill: rgb("F8FAFC"))[\n${titlePart}${bodyLines}${sourceLine}${glossaryLine}\n]`
	};
}

/**
 * Renders an authentic Algerian French Classification Table (Champ lexical, Arguments/Exemples, Thèse/Antithèse, Sons, Procédés explicatifs).
 */
export function buildFrenchClassificationTableBlock(opts: {
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
 * Renders an authentic Algerian French Nominalisation / Famille de mots table (`Verbe | Nom | Adjectif`).
 */
export function buildFrenchWordFamilyTableBlock(
	rows: Array<{
		verbe: { given?: boolean; value: string; mark?: string };
		nom: { given?: boolean; value: string; mark?: string };
		adjectif: { given?: boolean; value: string; mark?: string };
	}>
): TableBlock {
	const mk = (c: { given?: boolean; value: string; mark?: string }) =>
		c.given
			? { content: c.value, bold: true }
			: { content: '....................', answer: c.value, mark: c.mark };
	return {
		type: 'table',
		headers: ['Verbe', 'Nom', 'Adjectif'],
		cells: [],
		rows: rows.map((r) => [mk(r.verbe), mk(r.nom), mk(r.adjectif)]),
		align: 'center',
		borders: 'grid',
		headerBackground: true,
		width: 'full'
	};
}

/**
 * Renders an authentic Algerian BEM / BAC Written Production block:
 * - For Primary/Middle: Situation d'intégration with Consigne + Boîte à outils / Critères.
 * - For BAC/Secondary: Sujet 1 (Compte rendu objectif / critique) + Sujet 2 (Production libre)
 * with complete model production & Barème in solution mode.
 */
export function buildFrenchWrittenProductionBlock(opts: {
	sujetUnTitle?: string;
	sujetUnPrompt: string;
	sujetUnNotes: string[];
	sujetDeuxPrompt?: string;
	modelAnswer: string;
	rubricSummary: string;
	mark: string;
}): ContentBlock {
	const title1 = opts.sujetUnTitle ?? 'Sujet 1 (Guidé / Compte rendu) :';
	const notesBlock = opts.sujetUnNotes.map((n) => `  - ${n}`).join('\n');
	const topicTwoPart = opts.sujetDeuxPrompt
		? `\n\n#strong[Sujet 2 (Production libre) :] ${opts.sujetDeuxPrompt}`
		: '';
	const headerPrompt = opts.sujetDeuxPrompt
		? '#strong[Traitez l’UN des deux sujets au choix :]\n'
		: '';

	return {
		type: 'text',
		content: `${headerPrompt}#strong[${title1}] ${opts.sujetUnPrompt}\n#strong[Consignes et boîte à outils :]\n${notesBlock}${topicTwoPart}`,
		answer: `#strong[Barème d’évaluation (${opts.mark} pts) :] ${opts.rubricSummary}\n\n#strong[Proposition de corrigé modèle :] \n${opts.modelAnswer}`,
		mark: opts.mark
	};
}
