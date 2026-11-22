import type { ContentBlock, TableBlock, TypstRawBlock } from '../SujetBuilder/types';

/**
 * Automated doctrinal, pure Salafi methodology, halal-content, non-Muslim-author,
 * and institutional-header blocklist for ALL Spanish Language content.
 */
export const SPANISH_DOCTRINAL_AND_CONTENT_BLOCKLIST: readonly {
	pattern: RegExp;
	reason: string;
}[] = [
	// Haram celebrations, lifestyle, entertainment, magic, and pagan mythology
	{
		pattern: /\b(navidad|pap[aá]\s+noel|nochebuena|nochevieja|reyes\s+magos|halloween|san\s+valent[ií]n|semana\s+santa|pascua\s+florida|d[ií]a\s+de\s+los\s+muertos)\b/i,
		reason: 'Non-Islamic religious or pagan celebration prohibited'
	},
	{
		pattern: /\b(feliz\s+cumplea[nñ]os|fiesta\s+de\s+cumplea[nñ]os|tarta\s+de\s+cumplea[nñ]os|celebrar\s+(?:su|mi|tu)\s+cumplea[nñ]os)\b/i,
		reason: 'Birthday celebration avoided for Islamic compliance'
	},
	{
		pattern: /\b(vino\s+(?:tinto|blanco)|botella\s+de\s+vino|cerveza|whisky|vodka|champ[aá]n|alcoholismo|bodega\s+de\s+vinos|casino|loter[ií]a|apuestas|discoteca|club\s+nocturno)\b/i,
		reason: 'Haram intoxicants / gambling / nightclub prohibited'
	},
	{
		pattern: /\b(mi\s+novi[oa]|tu\s+novi[oa]|cita\s+rom[aá]ntica|cita\s+amorosa|historia\s+de\s+amor)\b/i,
		reason: 'Un-Islamic romantic context prohibited'
	},
	{
		pattern: /\b(guitarra|piano|viol[ií]n|bater[ií]a\s+musical|flauta|concierto\s+de\s+m[uú]sica|tocar\s+(?:la\s+)?m[uú]sica|escuchar\s+m[uú]sica|bailar\s+en\s+la\s+fiesta|baile\s+flamenco)\b/i,
		reason: 'Musical instruments and dancing entertainment prohibited'
	},
	{
		pattern: /\b(bruja|hada\s+m[aá]gica|varita\s+m[aá]gica|magia\s+negra|astrolog[ií]a|hor[oó]scopo|adivinaci[oó]n|zod[ií]aco)\b/i,
		reason: 'Magic / astrology / fortune-telling prohibited'
	},
	{
		pattern: /\b(darwinismo|charles\s+darwin|teor[ií]a\s+de\s+la\s+evoluci[oó]n|descender\s+del\s+mono)\b/i,
		reason: 'Darwinian evolution contradicting Islamic creation'
	},
	{
		pattern: /\b(zeus|apolo|atenea|osiris|diosa\s+isis|mitolog[ií]a\s+griega|adorar\s+[ií]dolos)\b/i,
		reason: 'Pagan mythology glorification prohibited'
	},
	// Non-Muslim literary authors / philosophers / artists (ZERO non-Muslim authors in generated texts)
	{
		pattern:
			/\b(miguel\s+de\s+cervantes|cervantes|federico\s+garc[ií]a\s+lorca|lorca|g[oó]ngora|quevedo|lope\s+de\s+vega|calder[oó]n\s+de\s+la\s+barca|unamuno|antonio\s+machado|juan\s+ram[oó]n\s+jim[eé]nez|garc[ií]a\s+m[aá]rquez|pablo\s+neruda|neruda|borges|cort[aá]zar|mario\s+vargas\s+llosa|isabel\s+allende|pablo\s+picasso|picasso|salvador\s+dal[ií]|goya|vel[aá]zquez|victor\s+hugo|voltaire|rousseau|shakespeare|arist[oó]teles|plat[oó]n|s[oó]crates|descartes)\b/i,
		reason: 'Non-Muslim literary author/philosopher/artist prohibited in generated texts'
	},
	// Excluded heterodox / non-Salafi figures
	{
		pattern:
			/\b(averroes|ibn\s+rushd|avicena|ibn\s+sina|al-?ghazali|algazel|ibn\s+arabi|al-?hallaj|rumi|mowlana|sayyid\s+qutb|hassan\s+al-?banna|qaradawi|malek\s+bennabi|emir\s+abdelkader|khalil\s+gibran|kateb\s+yacine|mouloud\s+feraoun)\b/i,
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
	// Late/contemporary Salafi scholars not to be named explicitly per user request
	{
		pattern: /\b(ibn\s+taymiyy?ah?|ibn\s+al-?qayyim|ibn\s+qayyim|al-?uthaymeen|ibn\s+baz|al-?albani|al-?fawzan)\b/i,
		reason: 'Benefiting from scholars without naming them explicitly'
	},
	// Official Ministry / ONEC headers strictly excluded from generated papers
	{
		pattern: /\b(ministerio\s+de\s+educaci[oó]n\s+nacional|oficina\s+nacional\s+de\s+ex[aá]menes|ONEC)\b/i,
		reason: 'Official Ministry / ONEC header removed per legal policy'
	},
	{
		pattern: /وزارة\s*التربية|الديوان\s*الوطني/u,
		reason: 'ترويسة رسمية مستبعدة من المواضيع المولّدة'
	}
];

/** Approved Islamic, Andalusi & Algerian cultural heritage references for Spanish lessons & exams. */
export const APPROVED_SPANISH_HERITAGE = {
	algerianFiguresAndLandmarks: [
		'Cheikh Abdelhamid Ben Badis',
		'Cheikh Mohamed Bachir El-Ibrahimi',
		'Cheikh Moubarek El-Mili',
		'Moufdi Zakaria',
		'Larbi Ben M’hidi',
		'La Casbah de Argel',
		'La Gran Mezquita de Tremecén (Tlemcen)',
		'El Valle del M’Zab (Ghardaïa)',
		'Tassili n’Ajjer',
		'Los Puentes de Constantina',
		'La Qal’a de los Beni Hammad'
	],
	andalusiAndIslamicHeritage: [
		'La Mezquita de Córdoba',
		'Medina Azahara (Córdoba)',
		'La Alhambra de Granada',
		'La Giralda de Sevilla',
		'Al-Zahrawi (Abulcasis)',
		'Al-Idrisi',
		'Ibn Jaldún (Ibn Khaldoun)',
		'Ibn Battuta',
		'Al-Juarismi (Al-Khwarizmi)',
		'Ibn Al-Haytham (Alhacén)',
		'Al-Biruni',
		'Fátima Al-Fihriya'
	]
} as const;

export function escapeTypstEs(text: string): string {
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
 * Formats Spanish exam passage markup inside `typst_raw`:
 * - `[[palabra]]` -> underlined bold reference word (`#underline[#strong[palabra]]`)
 * - `((expresión))` -> italicized bold highlight (`#emph[#strong[expresión]]`)
 */
export function formatExamSpanishMarkup(raw: string): string {
	let s = escapeTypstEs(raw);
	s = s.replace(/\[\[([^\]]+)\]\]/g, '#underline[#strong[$1]]');
	s = s.replace(/\(\(([^)]+)\)\)/g, '#emph[#strong[$1]]');
	return s;
}

/**
 * Renders an authentic Algerian Spanish exam reading passage inside a clean LTR bordered box.
 * Supports numbered paragraphs (§1..§4), underlined bold references `[[palabra]]`, source, and Glosario.
 */
export function buildSpanishPassageBlock(opts: {
	title?: string;
	paragraphs: string[];
	source?: string;
	numberedParagraphs?: boolean;
	glossary?: Array<{ term: string; meaning: string }>;
}): TypstRawBlock {
	const numbered = opts.numberedParagraphs ?? opts.paragraphs.length > 1;
	const titlePart = opts.title
		? `#align(center)[#text(weight: "bold", size: 12pt)[${escapeTypstEs(opts.title)}]]\n#v(4pt)\n`
		: '';
	const bodyLines = opts.paragraphs
		.map((p, idx) => {
			const prefix = numbered ? `#strong[(§${idx + 1})] ` : '#h(12pt);';
			return `${prefix}${formatExamSpanishMarkup(p)}`;
		})
		.join('\n\n');

	const sourceLine = opts.source
		? `\n#v(4pt)\n#align(right)[#text(style: "italic", size: 9.5pt, fill: rgb("475569"))[— ${escapeTypstEs(opts.source)}]]`
		: '';

	const glossaryLine =
		opts.glossary && opts.glossary.length > 0
			? `\n#v(4pt)\n#line(length: 100%, stroke: 0.4pt + luma(170))\n#v(3pt)\n#text(size: 9.5pt)[#strong[Glosario :] ${opts.glossary
					.map((g) => `#strong[${escapeTypstEs(g.term)}] : ${escapeTypstEs(g.meaning)}`)
					.join(' | ')}]`
			: '';

	return {
		type: 'typst_raw',
		content: `#block(width: 100%, inset: 10pt, radius: 4pt, stroke: 0.75pt + rgb("334155"), fill: rgb("F8FAFC"))[\n${titlePart}${bodyLines}${sourceLine}${glossaryLine}\n]`,
		webMeta: {
			kind: 'passage_box',
			lang: 'es',
			title: opts.title,
			paragraphs: opts.paragraphs,
			numberedParagraphs: numbered,
			source: opts.source,
			glossary: opts.glossary ?? []
		}
	};
}

/**
 * Renders an authentic Algerian Spanish classification table (Campos léxicos, Causa/Consecuencia, Ventajas/Riesgos).
 */
export function buildSpanishClassificationTableBlock(opts: {
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
 * Renders an authentic Algerian Spanish Word Family morphology table (`Verbo | Sustantivo | Adjetivo`).
 */
export function buildSpanishWordFamilyTableBlock(
	rows: Array<{
		verbo: { given?: boolean; value: string; mark?: string };
		sustantivo: { given?: boolean; value: string; mark?: string };
		adjetivo: { given?: boolean; value: string; mark?: string };
	}>
): TableBlock {
	const mk = (c: { given?: boolean; value: string; mark?: string }) =>
		c.given
			? { content: c.value, bold: true }
			: { content: '....................', answer: c.value, mark: c.mark };
	return {
		type: 'table',
		headers: ['Verbo', 'Sustantivo', 'Adjetivo'],
		cells: [],
		rows: rows.map((r) => [mk(r.verbo), mk(r.sustantivo), mk(r.adjetivo)]),
		align: 'center',
		borders: 'grid',
		headerBackground: true,
		width: 'full'
	};
}

/**
 * Renders an authentic Algerian Spanish BAC / 2AS Written Production prompt (`Expresión escrita`):
 * Dual choice (`Tema 1 (Guiado)` + `Tema 2 (Libre)`) with full model essay & marking rubric.
 */
export function buildSpanishWrittenProductionBlock(opts: {
	temaUnoTitle?: string;
	temaUnoPrompt: string;
	temaUnoNotas: string[];
	temaDosPrompt?: string;
	modelAnswer: string;
	rubricSummary: string;
	mark: string;
}): ContentBlock {
	const title1 = opts.temaUnoTitle ?? 'Tema 1 (Guiado) :';
	const notesBlock = opts.temaUnoNotas.map((n) => `  - ${n}`).join('\n');
	const topicTwoPart = opts.temaDosPrompt
		? `\n\n#strong[Tema 2 (Libre) :] ${opts.temaDosPrompt}`
		: '';
	const headerPrompt = opts.temaDosPrompt
		? '#strong[Elige UNO de los dos temas propuestos :]\n'
		: '';

	return {
		type: 'text',
		content: `${headerPrompt}#strong[${title1}] ${opts.temaUnoPrompt}\n#strong[Pautas y recursos léxicos :]\n${notesBlock}${topicTwoPart}`,
		answer: `#strong[Baremo de evaluación (${opts.mark} pts) :] ${opts.rubricSummary}\n\n#strong[Propuesta de corrección modelo :]\n${opts.modelAnswer}`,
		mark: opts.mark
	};
}
