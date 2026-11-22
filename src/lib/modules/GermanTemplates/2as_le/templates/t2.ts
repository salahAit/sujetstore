import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	GermanGeneratedExerciseInstance,
	GermanParameterizedTemplate
} from '../../types';
import {
	buildGermanClassificationTableBlock,
	buildGermanPassageBlock,
	buildGermanWordFamilyTableBlock,
	buildGermanWrittenProductionBlock
} from '../../german-helpers';
import {
	saveGermanSvgAsset,
	svgGermanConjugationChart,
	svgGermanGrammarMap,
	svgGermanWordFormation
} from '../../svg-german';
import { buildIllustratedFigureBlock } from '../../../VisualAssets/illustrations-registry';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';

function scrambleOrdering(
	orderedItems: string[],
	rng: SeededRng
): {
	items: string[];
	correctOrder: number[];
} {
	const n = orderedItems.length;
	const indices = Array.from({ length: n }, (_, i) => i);
	let perm = rng.shuffle(indices);
	if (perm.every((v, i) => v === i) && n >= 2) {
		perm = [...indices.slice(1), indices[0]];
	}
	const items = perm.map((i) => orderedItems[i]);
	const correctOrder = indices.map((orig) => perm.indexOf(orig));
	return { items, correctOrder };
}

export const TEMPLATES_2AS_LE_T2: GermanParameterizedTemplate[] = [
	// 1. Textverständnis (7 Pkt.) — true_false quiz
	{
		id: 'ger_tpl_2as_le_t2_comp_umweltschutz_schule',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'textverstaendnis',
		titleAr: 'I. Textverständnis : Umweltschutz an der Schule, Wassersparen und erneuerbare Energien (7 Pkt.)',
		curriculumLessonId: 'ger_lesson_2as_le_t2_umweltschutz_natur',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					passageTitle: 'Ein grünes Projekt an unserem Gymnasium',
					paragraphs: [
						'Letzten Monat hat der Umweltklub unseres Gymnasiums eine praktische Aktion unter dem Motto „Saubere Schule, gesunde Zukunft“ gestartet. Weil jeden Tag viel Papierabfall und Plastikflaschen im Schulhof entstehen, wollten die Schülerinnen und Schüler ein deutliches Zeichen für [[die Natur]] setzen.',
						'Zuerst haben wir farbige Behälter für die Mülltrennung aufgestellt, damit Papier, Glas und Kunststoff getrennt gesammelt und recycelt werden können. Danach haben zwanzig Freiwillige fünfzehn junge Olivenbäume entlang des Sportplatzes gepflanzt. Unser Biologielehrer erklärte uns, dass [[diese Bäume]] Schatten spenden und die Luft reinigen.',
						'Wenn jede Klasse Wasser spart, Abfälle vermeidet und den Schulhof sauber hält, wird unser Gymnasium zu einem Vorbild für die ganze Nachbarschaft. Sauberkeit ist schließlich nicht nur eine ökologische Aufgabe, sondern auch ein wichtiger moralischer Wert.'
					],
					source: 'Umweltprojekt algerischer Gymnasien (bearbeitet)',
					glossary: [
						{ term: 'Mülltrennung', meaning: 'Sortieren von Abfall nach Papier, Glas, Plastik und Bio' },
						{ term: 'Vorbild', meaning: 'gutes Beispiel, an dem sich andere orientieren' }
					],
					q1: '1. Warum hat der Umweltklub das Projekt gestartet und welche zwei konkreten Maßnahmen haben die Schüler umgesetzt?',
					a1: 'Grund: Jeden Tag entstanden viel Papierabfall und Plastikflaschen im Schulhof. Maßnahmen: Sie haben farbige Behälter für die Mülltrennung aufgestellt und fünfzehn junge Olivenbäume entlang des Sportplatzes gepflanzt.',
					tfItems: [
						{
							q: 'Die Schüler haben alle Abfälle einfach zusammen in eine einzige Tonne geworfen.',
							a: 'Falsch',
							c: 'Sie haben farbige Behälter aufgestellt, um Papier, Glas und Kunststoff getrennt zu sammeln.',
							mark: '0.5'
						},
						{
							q: 'Zwanzig freiwillige Jugendliche haben fünfzehn junge Olivenbäume gepflanzt.',
							a: 'Richtig',
							c: 'Im §2 steht, dass zwanzig Freiwillige fünfzehn junge Olivenbäume entlang des Sportplatzes gepflanzt haben.',
							mark: '0.5'
						},
						{
							q: 'Der Text betrachtet Sauberkeit ausschließlich als eine technische Pflicht ohne moralischen Wert.',
							a: 'Falsch',
							c: 'Im §3 heißt es, Sauberkeit sei sowohl eine ökologische Aufgabe als auch ein wichtiger moralischer Wert.',
							mark: '0.5'
						}
					],
					q3: '3. Suchen Sie im Text :\n  a) Das Synonym von „Abfall“ (§1) und das Antonym von „schmutzig“ (§1 oder §3).\n  b) Vier Nomen aus dem Wortfeld „Umweltschutz“.',
					a3: 'a) Synonym : Abfall / Müll (Papierabfall) ; Antonym von schmutzig : sauber. | b) Wortfeld Umweltschutz : Umweltklub, Natur, Mülltrennung, Kunststoff, Olivenbäume, Schatten, Luft, Sauberkeit.',
					q4: '4. Worauf beziehen sich die unterstrichenen Ausdrücke „die Natur“ (§1) und „diese Bäume“ (§2)?',
					a4: '„die Natur“ bezieht sich auf die Umwelt und die pflanzliche Umgebung der Schule. „diese Bäume“ bezieht sich auf die fünfzehn jungen Olivenbäume entlang des Sportplatzes.',
					quizStatement:
						'Laut dem Text spenden die gepflanzten Olivenbäume Schatten und helfen dabei, die Luft auf dem Schulgelände zu reinigen.',
					quizCorrect: true,
					quizExplanation:
						'العبارة صحيحة: يؤكد أستاذ العلوم في الفقرة الثانية أن أشجار الزيتون المغروسة توفر الظل وتنقي الهواء.'
				},
				{
					passageTitle: 'Jeder Tropfen zählt: Wasser sparen aus Überzeugung',
					paragraphs: [
						'In vielen Regionen rund um das Mittelmeer ist frisches Trinkwasser ein kostbarer Schatz, weil die Sommer immer heißer und trockener werden. Da sauberes Wasser lebensnotwendig für Menschen, Tiere und Pflanzen ist, darf niemand [[dieses Geschenk]] leichtsinnig verschwenden.',
						'In unserem Alltag lassen sich mit kleinen Gewohnheiten große Mengen sparen: Beim Zähneputzen oder Händewaschen sollte man den Wasserhahn sofort schließen, und kaputte Leitungen müssen schnell repariert werden. Außerdem lernen schon Kinder, dass Sauberkeit und Sparsamkeit eng zusammengehören, denn auch unsere ethischen und islamischen Werte verbieten jede Verschwendung.',
						'In der Landwirtschaft hilft moderne Tröpfchenbewässerung, weil sie das Wasser direkt an die Wurzeln leitet. Wenn alle Familien und Bauern verantwortungsvoll handeln, sichern [[wir]] die Wasserreserven für die kommenden Generationen.'
					],
					source: 'Bildungsheft für Nachhaltigkeit (leicht bearbeitet)',
					glossary: [
						{ term: 'verschwenden', meaning: 'etwas Wertvolles unnütz verbrauchen' },
						{ term: 'Tröpfchenbewässerung', meaning: 'sparsames Bewässern direkt an der Pflanzenwurzel' }
					],
					q1: '1. Warum ist Wasser im Mittelmeerraum besonders kostbar und welche zwei Alltagstipps nennt der zweite Absatz?',
					a1: 'Grund: Die Sommer werden heißer und trockener, und sauberes Wasser ist lebensnotwendig. Tipps: Beim Zähneputzen und Händewaschen den Wasserhahn schließen und kaputte Leitungen sofort reparieren.',
					tfItems: [
						{
							q: 'Die Sommer im Mittelmeerraum werden laut Text immer kälter und feuchter.',
							a: 'Falsch',
							c: 'Im §1 steht, dass die Sommer immer heißer und trockener werden.',
							mark: '0.5'
						},
						{
							q: 'Unsere ethischen und islamischen Werte ermutigen zur Sauberkeit ohne Wasserverschwendung.',
							a: 'Richtig',
							c: 'Im §2 wird erklärt, dass Sauberkeit und Sparsamkeit zusammengehören und jede Verschwendung verboten ist.',
							mark: '0.5'
						},
						{
							q: 'Die Tröpfchenbewässerung verbraucht viel mehr Wasser als offene Kanäle.',
							a: 'Falsch',
							c: 'Sie hilft beim Sparen, weil sie das Wasser direkt an die Wurzeln leitet.',
							mark: '0.5'
						}
					],
					q3: '3. Finden Sie im Text :\n  a) Das Synonym von „wertvoll“ (§1) und das Antonym von „sparen“ (§1).\n  b) Einen Kausalsatz mit „weil“ und einen Objektsatz mit „dass“.',
					a3: 'a) Synonym : kostbar ; Antonym von sparen : verschwenden. | b) Kausalsatz : weil die Sommer immer heißer und trockener werden (oder weil sie das Wasser direkt an die Wurzeln leitet) ; Objektsatz : dass Sauberkeit und Sparsamkeit eng zusammengehören.',
					q4: '4. Worauf beziehen sich „dieses Geschenk“ (§1) und „wir“ (§3)?',
					a4: '„dieses Geschenk“ bezieht sich auf das frische, saubere Trinkwasser. „wir“ bezieht sich auf alle Bürger, Familien und Bauern in der Gesellschaft.',
					quizStatement:
						'Die Tröpfchenbewässerung leitet das Wasser direkt an die Wurzeln der Pflanzen, um Verschwendung zu vermeiden.',
					quizCorrect: true,
					quizExplanation:
						'العبارة صحيحة: الفقرة الثالثة تذكر أن الري بالتنقيط يوصل الماء مباشرة إلى الجذور لتجنب الضياع.'
				},
				{
					passageTitle: 'Sonne und Wind: Erneuerbare Energien für unsere Zukunft',
					paragraphs: [
						'Lange Zeit verließen sich die meisten Länder fast ausschließlich auf fossile Brennstoffe wie Kohle und Öl, doch diese Energien verursachen schädliche Abgase und verstärken den Klimawandel. Deshalb investieren heute viele Staaten verstärkt in saubere Energiequellen wie Solarenergie und Windkraft.',
						'Gerade im Süden Algeriens scheint die Sonne mehr als dreitausend Stunden im Jahr, sodass große Solarparks sauberen Strom für Schulen, Krankenhäuser und Haushalte liefern können. Gleichzeitig entstehen in windreichen Küsten- und Bergregionen moderne Windkraftanlagen, die ohne Rauch arbeiten.',
						'Natürlich ist der Übergang zu [[diesen grünen Technologien]] eine große technische Aufgabe, weil Stromnetze modernisiert und junge Ingenieure ausgebildet werden müssen. Dennoch sind sich Experten einig, dass [[erneuerbare Energien]] die sauberste Lösung für kommende Jahrzehnte bleiben.'
					],
					source: 'Technik und Umwelt im Unterricht (bearbeitet)',
					glossary: [
						{ term: 'Abgase', meaning: 'schädliche Gase aus Motoren, Fabriken oder Heizungen' },
						{ term: 'Übergang', meaning: 'schrittweiser Wechsel von einem alten zu einem neuen System' }
					],
					q1: '1. Welche Nachteile haben fossile Brennstoffe und warum besitzt besonders der Süden Algeriens großes Potenzial für Solarenergie?',
					a1: 'Nachteile: Fossile Brennstoffe verursachen schädliche Abgase und verstärken den Klimawandel. Potenzial im Süden: Dort scheint die Sonne mehr als dreitausend Stunden im Jahr.',
					tfItems: [
						{
							q: 'Kohle und Öl verursachen überhaupt keine schädlichen Abgase.',
							a: 'Falsch',
							c: 'Im §1 steht, dass fossile Brennstoffe schädliche Abgase verursachen.',
							mark: '0.5'
						},
						{
							q: 'Windkraftanlagen arbeiten ohne Rauch in windreichen Regionen.',
							a: 'Richtig',
							c: 'Der §2 erwähnt moderne Windkraftanlagen in windreichen Küsten- und Bergregionen, die ohne Rauch arbeiten.',
							mark: '0.5'
						},
						{
							q: 'Für die Energiewende braucht man weder moderne Stromnetze noch ausgebildete Ingenieure.',
							a: 'Falsch',
							c: 'Im §3 heißt es, dass Stromnetze modernisiert und junge Ingenieure ausgebildet werden müssen.',
							mark: '0.5'
						}
					],
					q3: '3. Suchen Sie im Text :\n  a) Das Synonym von „umweltfreundlich / sauber“ (§1 oder §3) und das Antonym von „nützlich / unschädlich“ für „schädlich“ (§1).\n  b) Drei Zusammensetzungen (Komposita) aus dem Bereich Energie und Technik.',
					a3: 'a) Synonym : sauber / grün ; Antonym von nützlich : schädlich. | b) Komposita : Brennstoffe, Klimawandel, Solarenergie, Windkraft, Solarparks, Windkraftanlagen, Stromnetze.',
					q4: '4. Worauf beziehen sich „diesen grünen Technologien“ (§3) und „erneuerbare Energien“ (§3)?',
					a4: '„diesen grünen Technologien“ bezieht sich auf die Solarparks und Windkraftanlagen aus dem §2. „erneuerbare Energien“ bezieht sich auf die sauberen, sich natürlich erneuernden Energiequellen aus Sonne und Wind.',
					quizStatement:
						'Nach dem Text arbeiten Windkraftanlagen und Solarparks sauber ohne schädlichen Rauch.',
					quizCorrect: true,
					quizExplanation:
						'العبارة صحيحة: تؤكد الفقرة الثانية أن محطات الطاقة الشمسية والريحية تنتج كهرباء نظيفة بدون أدخنة.'
				}
			];

			const v = rng.pick(variants);
			const content: ContentBlock[] = [
				buildIllustratedFigureBlock('ger_04_umweltschutz_erneuerbare_energien', {
					lang: 'de',
					mode: 'labeled',
					pins: [],
					width: '62%',
					maxHeight: 118,
					caption: 'Umweltschutz, Recycling, Aufforstung und saubere Energiequellen'
				}),
				buildGermanPassageBlock({
					title: v.passageTitle,
					paragraphs: v.paragraphs,
					source: v.source,
					numberedParagraphs: true,
					glossary: v.glossary
				}),
				{ type: 'text', content: v.q1, answer: v.a1, mark: '2.0' },
				{
					type: 'text',
					content: '2. Entscheiden Sie : Richtig oder Falsch? Begründen Sie mit dem Text :',
					mark: ''
				},
				{ type: 'true_false', items: v.tfItems },
				{ type: 'text', content: v.q3, answer: v.a3, mark: '2.0' },
				{ type: 'text', content: v.q4, answer: v.a4, mark: '1.5' }
			];

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'true_false',
					questionText: v.quizStatement,
					questionTextAr: 'حدّد صحة أو خطأ الفكرة الآتية استناداً إلى النص:',
					questionData: {
						correctAnswer: v.quizCorrect
					},
					explanation: v.quizExplanation
				},
				sujetExercise: {
					customTitle: 'I. Textverständnis',
					points: 7,
					instruction: 'Betrachten Sie das Bild, lesen Sie den Text sorgfältig und beantworten Sie die Fragen :',
					content
				},
				hints: [
					'اربط اللوحة التوضيحية (الطاقة الشمسية، الرياح، التدوير، التشجير) بأفكار النص.',
					'علل دائماً إجابات Richtig / Falsch بجملة دقيقة من النص.',
					'راجع الجمل الجانبية بـ weil و dass و wenn لفهم العلاقات السببية والشرطية في النص.'
				],
				solutionStepsAr: [
					'استخلاص الأسباب والحلول البيئية من النص (2.0 نقطة).',
					'الحكم على العبارات بالصواب أو الخطأ مع التعليل النصي (1.5 نقطة).',
					'استخراج المترادفات والأضداد والمركبات البيئية أو الجمل الجانبية (2.0 نقطة).',
					'تحديد العائد النحوي الدقيق للمسطرات (1.5 نقطة).'
				],
				finalAnswer: v.quizCorrect ? 'Richtig' : 'Falsch'
			};
		}
	},

	// 2. Textverständnis (7 Pkt.) — mcq quiz
	{
		id: 'ger_tpl_2as_le_t2_comp_gesunde_ernaehrung',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'textverstaendnis',
		titleAr: 'I. Textverständnis : Gesunde halal Ernährung, Bewegung und Lernbalance (7 Pkt.)',
		curriculumLessonId: 'ger_lesson_2as_le_t2_gesunde_ernaehrung_sport',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					passageTitle: 'Naturkraft auf dem Teller: Olivenöl, Datteln und klares Wasser',
					paragraphs: [
						'Viele Jugendliche greifen in den Schulpausen schnell zu zuckerhaltigen Limonaden und fettigen Snacks, weil das bequem erscheint. Doch Ernährungsberater warnen davor, dass zu viel Zucker schnell müde macht und [[die Konzentration]] im Unterricht deutlich schwächt.',
						'Eine gesunde, reine und ausgewogene Ernährung stärkt dagegen Körper und Geist. Im Mittelmeerraum gehören frisches Obst, grünes Gemüse, Hülsenfrüchte, Vollkornbrot, hochwertiges Olivenöl und süße Datteln seit Jahrhunderten auf den Tisch. Datteln liefern natürliche Energie für das Gehirn, und klares Wasser oder ungesüßter Kräutertee löschen den Durst viel besser als künstliche Getränke.',
						'Wer sich regelmäßig bewegt und morgens ausreichend frühstückt, fühlt sich tagsüber ausgeglichener und leistungsfähiger. Deshalb ist es sinnvoll, schon in jungen Jahren gute Essgewohnheiten einzuüben, weil [[sie]] ein ganzes Leben lang schützen.'
					],
					source: 'Ratgeber für Jugendgesundheit (bearbeitet)',
					glossary: [
						{ term: 'ausgewogen', meaning: 'gut gemischt und in den richtigen Mengen zusammengestellt' },
						{ term: 'leistungsfähig', meaning: 'fähig, gute geistige oder körperliche Arbeit zu erbringen' }
					],
					q1: '1. Warum warnen Ernährungsberater vor zuckerhaltigen Snacks und welche gesunden Lebensmittel empfiehlt der Text?',
					a1: 'Warnung: Zu viel Zucker macht schnell müde und schwächt die Konzentration. Empfehlung: frisches Obst, grünes Gemüse, Hülsenfrüchte, Vollkornbrot, Olivenöl, Datteln, klares Wasser und ungesüßter Kräutertee.',
					mcGroups: [
						{
							header: 'a) Welchen Vorteil haben Datteln laut dem zweiten Absatz?',
							options: [
								'Sie liefern natürliche Energie für das Gehirn',
								'Sie ersetzen den Nachtschlaf vollständig',
								'Sie enthalten viele künstliche Farbstoffe'
							],
							correct: 'Sie liefern natürliche Energie für das Gehirn',
							mark: '1.0'
						},
						{
							header: 'b) Welche Wirkung hat regelmäßige Bewegung zusammen mit einem guten Frühstück?',
							options: [
								'Man wird tagsüber ausgeglichener und leistungsfähiger',
								'Man verliert die Lust am Lernen und Lesen',
								'Man braucht überhaupt kein Wasser mehr zu trinken'
							],
							correct: 'Man wird tagsüber ausgeglichener und leistungsfähiger',
							mark: '1.0'
						}
					],
					q3: '3. Finden Sie im Text :\n  a) Das Synonym von „schützt / stärkt“ (§2) und das Antonym von „natürlich“ (§2).\n  b) Zwei Adjektive im Komparativ aus dem Text.',
					a3: 'a) Synonym von schützt : stärkt ; Antonym von natürlich : künstlich (künstliche). | b) Komparative : besser, ausgeglichener, leistungsfähiger.',
					q4: '4. Worauf beziehen sich „die Konzentration“ (§1) und „sie“ (§3)?',
					a4: '„die Konzentration“ bezieht sich auf die geistige Aufmerksamkeit der Schüler im Unterricht. „sie“ bezieht sich auf die guten Essgewohnheiten aus dem Hauptsatz.',
					mcqQuestion: 'Was drückt der Satz im Text aus: „Klares Wasser oder ungesüßter Kräutertee löschen den Durst viel besser als künstliche Getränke“?',
					mcqQuestionAr: 'ما الصيغة النحوية المستعملة في مقارنة الماء والمرطبات الصناعية في الفقرة الثانية؟',
					mcqCorrect: 'Einen unregelmäßigen Komparativ von „gut“ mit der Vergleichskonjunktion „als“',
					mcqDistractors: [
						{
							text: 'Einen Gleichheitsvergleich im Positiv mit der Konjunktion „wie“',
							diagnosticFeedback: 'خطأ: المساواة تستعمل wie، بينما هنا تفاوت بـ besser als.'
						},
						{
							text: 'Einen Superlativ mit der Endung „am -sten“',
							diagnosticFeedback: 'خطأ: صيغة التفضيل هي am besten، أما هنا فـ besser للمقارنة بين طرفين.'
						},
						{
							text: 'Einen Nebensatz im Perfekt mit dem Hilfsverb „sein“',
							diagnosticFeedback: 'خطأ: الجملة في الحاضر ولا توجد صيغة ماضٍ مركب.'
						}
					],
					mcqExplanation: '«besser» هي صيغة المقارنة الشاذة للصفة «gut» وتقترن بأداة المقارنة «als».'
				},
				{
					passageTitle: 'Bewegung statt Dauerstress: Sport als Ausgleich zum Lernen',
					paragraphs: [
						'Schülerinnen und Schüler der Oberstufe sitzen oft viele Stunden am Schreibtisch, um Grammatikregeln zu wiederholen und Aufsätze zu schreiben. Wenn [[sie]] sich danach nicht bewegen, entstehen leicht Rückenschmerzen, Kopfschmerzen und innere Unruhe.',
						'Dabei braucht niemand teure Geräte, um aktiv zu bleiben. Schon dreißig Minuten zügiges Gehen im Freien, Radfahren oder regelmäßiges Schwimmen verbessern die Durchblutung und machen den Kopf wieder frei. Besonders das Wandern in den Bergen oder ein gemeinsames Ballspiel im Schulhof stärkt zusätzlich den Teamgeist.',
						'Wichtig ist allerdings das richtige Maß: Extreme Überlastung schadet dem Körper ebenso wie völlige Bequemlichkeit. Wer Sport klug in seinen Wochenplan einbaut, schläft nachts tiefer und lernt am nächsten Morgen konzentrierter als zuvor.'
					],
					source: 'Schulsport und Prävention (bearbeitet)',
					glossary: [
						{ term: 'Durchblutung', meaning: 'Kreislauf des Blutes durch den ganzen Körper' },
						{ term: 'Teamgeist', meaning: 'gutes Zusammenarbeiten und gegenseitige Rücksicht in einer Gruppe' }
					],
					q1: '1. Welche Beschwerden können durch langes Sitzen ohne Bewegung entstehen und welche einfachen Sportarten schlägt der Text vor?',
					a1: 'Beschwerden: Rückenschmerzen, Kopfschmerzen und innere Unruhe. Sportarten: zügiges Gehen im Freien, Radfahren, Schwimmen, Wandern in den Bergen oder ein Ballspiel im Schulhof.',
					mcGroups: [
						{
							header: 'a) Warum braucht man laut §2 keine teuren Geräte für regelmäßige Bewegung?',
							options: [
								'Weil schon dreißig Minuten Gehen, Radfahren oder Schwimmen genügen',
								'Weil Sport für Schülerinnen und Schüler verboten ist',
								'Weil man durch bloßes Sitzen am Schreibtisch fit bleibt'
							],
							correct: 'Weil schon dreißig Minuten Gehen, Radfahren oder Schwimmen genügen',
							mark: '1.0'
						},
						{
							header: 'b) Welche zwei Extreme lehnt der dritte Absatz ab?',
							options: [
								'Extreme Überlastung und völlige Bequemlichkeit',
								'Ausreichenden Schlaf und konzentriertes Lernen',
								'Frisches Wasser und gesunde Schulpausen'
							],
							correct: 'Extreme Überlastung und völlige Bequemlichkeit',
							mark: '1.0'
						}
					],
					q3: '3. Suchen Sie im Text :\n  a) Das Synonym von „schnell / flott“ (§2) und das Antonym von „billig / preiswert“ (§2).\n  b) Zwei substantivierte Infinitive (Verben als Nomen) aus dem zweiten Absatz.',
					a3: 'a) Synonym von schnell : zügig ; Antonym von billig : teuer (teure). | b) Substantivierte Infinitive : (das) Gehen, Radfahren, Schwimmen, Wandern.',
					q4: '4. Worauf beziehen sich „sie“ (§1) und der Ausdruck „das richtige Maß“ (§3)?',
					a4: '„sie“ bezieht sich auf die Schülerinnen und Schüler der Oberstufe aus dem ersten Satz. „das richtige Maß“ bezieht sich auf das gesunde Gleichgewicht zwischen ausreichender Bewegung ohne Überlastung.',
					mcqQuestion: 'Warum steht das Verb „schadet“ im dritten Absatz mit „dem Körper“ im Dativ?',
					mcqQuestionAr: 'لماذا جاءت عبارة «dem Körper» في الفقرة الثالثة في حالة Dativ بعد الفعل «schaden»؟',
					mcqCorrect: 'Weil das Verb „schaden“ im Deutschen immer ein Dativobjekt verlangt',
					mcqDistractors: [
						{
							text: 'Weil „Körper“ ein feminines Nomen im Plural ist',
							diagnosticFeedback: 'خطأ: Körper اسم مذكر مفرد (der Körper -> dem Körper في Dativ).'
						},
						{
							text: 'Weil der Satz im Futur I steht',
							diagnosticFeedback: 'خطأ: الفعل في الحاضر وليس المستقبل.'
						},
						{
							text: 'Weil vor „Körper“ die Präposition „für“ steht',
							diagnosticFeedback: 'خطأ: لا يوجد حرف جر، وإنما الفعل schaden يطلب Dativ مباشرة.'
						}
					],
					mcqExplanation: 'الفعل schaden (يضر بـ) من الأفعال التي تطلب مفعولاً في حالة Dativ مثل helfen و danken.'
				},
				{
					passageTitle: 'Ein gesundes Frühstück für einen erfolgreichen Schultag',
					paragraphs: [
						'Manche Jugendlichen verlassen morgens das Haus ohne Frühstück, weil sie spät aufgestanden sind oder keinen Appetit verspüren. Im Laufe des Vormittags sinkt jedoch [[ihr Blutzuckerspiegel]], sodass sie sich schwach fühlen und dem Unterricht kaum folgen können.',
						'Ein gutes Frühstück dauert gar nicht lange und liefert dem Körper wertvolle Vitamine sowie Ballaststoffe. Schon eine Schale Haferflocken mit Milch und Datteln oder eine Scheibe Vollkornbrot mit Olivenöl, Käse und einer Tomate hält viele Stunden satt.',
						'Außerdem sollten Schülerinnen und Schüler ausreichend schlafen, denn Schlafmangel stört das Gedächtnis genauso stark wie eine einseitige Ernährung. Wer abends pünktlich ruht und morgens gesund isst, meistert [[den Schultag]] mit deutlich mehr Energie.'
					],
					source: 'Schulgesundheitsdienst (bearbeitet)',
					glossary: [
						{ term: 'Ballaststoffe', meaning: 'pflanzliche Fasern, die für eine gesunde Verdauung wichtig sind' },
						{ term: 'einseitig', meaning: 'nicht abwechslungsreich, immer nur das Gleiche' }
					],
					q1: '1. Was passiert am Vormittag, wenn man ohne Frühstück zur Schule geht, und welche zwei Frühstücksvorschläge nennt der Text?',
					a1: 'Folge: Der Blutzuckerspiegel sinkt, man fühlt sich schwach und kann dem Unterricht kaum folgen. Vorschläge: Haferflocken mit Milch und Datteln oder Vollkornbrot mit Olivenöl, Käse und einer Tomate.',
					mcGroups: [
						{
							header: 'a) Warum verträgt sich Schlafmangel nicht mit gutem Lernerfolg?',
							options: [
								'Weil Schlafmangel das Gedächtnis stark stört',
								'Weil man dann nachts zu viel Vollkornbrot isst',
								'Weil man im Unterricht nicht sprechen darf'
							],
							correct: 'Weil Schlafmangel das Gedächtnis stark stört',
							mark: '1.0'
						},
						{
							header: 'b) Welche Konjunktion wird in „Schlafmangel stört das Gedächtnis genauso stark wie eine einseitige Ernährung“ benutzt?',
							options: [
								'Ein Gleichheitsvergleich im Positiv (genauso ... wie)',
								'Ein Komparativ der Ungleichheit (stärker als)',
								'Ein Kausalsatz mit Verb am Satzende'
							],
							correct: 'Ein Gleichheitsvergleich im Positiv (genauso ... wie)',
							mark: '1.0'
						}
					],
					q3: '3. Finden Sie im Text :\n  a) Das Synonym von „genügend“ (§3) und das Antonym von „früh“ (§1).\n  b) Zwei zusammengesetzte Nomen (Komposita) aus dem Bereich Gesundheit und Schule.',
					a3: 'a) Synonym : ausreichend ; Antonym von früh : spät. | b) Komposita : Blutzuckerspiegel, Ballaststoffe, Haferflocken, Vollkornbrot, Olivenöl, Schlafmangel, Schultag.',
					q4: '4. Worauf beziehen sich „ihr Blutzuckerspiegel“ (§1) und „den Schultag“ (§3)?',
					a4: '„ihr Blutzuckerspiegel“ bezieht sich auf den Blutzuckerspiegel der Jugendlichen, die ohne Frühstück zur Schule gehen. „den Schultag“ bezieht sich auf den gesamten Unterrichts- und Lernalltag in der Schule.',
					mcqQuestion: 'Warum steht das Verb „sollten“ in „Außerdem sollten Schülerinnen und Schüler ausreichend schlafen“ vor dem Subjekt?',
					mcqQuestionAr: 'لماذا تقدم الفعل «sollten» على الفاعل في الجملة الأولى من الفقرة الثالثة؟',
					mcqCorrect: 'Weil das Adverb „Außerdem“ Position 1 besetzt und das konjugierte Verb Position 2 einnimmt',
					mcqDistractors: [
						{
							text: 'Weil „Außerdem“ eine subordinierende Konjunktion wie „weil“ ist',
							diagnosticFeedback: 'خطأ: لو كانت أداة تبعية لذهب الفعل إلى آخر الجملة.'
						},
						{
							text: 'Weil es sich um eine direkte Entscheidungsfrage handelt',
							diagnosticFeedback: 'خطأ: الجملة خبرية ليست استفهامية وتنتهي بنقطة.'
						},
						{
							text: 'Weil Modalverben niemals nach einem Subjekt stehen dürfen',
							diagnosticFeedback: 'خطأ: تأتي بعد الفاعل إذا شغل الفاعل الموقع 1.'
						}
					],
					mcqExplanation: 'الظرف الرابط «Außerdem» يشغل الموقع 1، فيستلزم وجود الفعل المصرف في الموقع 2 قبل الفاعل (Inversion).'
				}
			];

			const v = rng.pick(variants);
			const mcq = buildUniqueMcqOptions(v.mcqCorrect, v.mcqDistractors, rng);
			const content: ContentBlock[] = [
				buildGermanPassageBlock({
					title: v.passageTitle,
					paragraphs: v.paragraphs,
					source: v.source,
					numberedParagraphs: true,
					glossary: v.glossary
				}),
				{ type: 'text', content: v.q1, answer: v.a1, mark: '2.0' },
				{
					type: 'text',
					content: '2. Wählen Sie die zutreffende Aussage gemäß dem Text aus :',
					mark: ''
				},
				{ type: 'multiple_choice', groups: v.mcGroups },
				{ type: 'text', content: v.q3, answer: v.a3, mark: '1.5' },
				{ type: 'text', content: v.q4, answer: v.a4, mark: '1.5' }
			];

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'mcq',
					questionText: v.mcqQuestion,
					questionTextAr: v.mcqQuestionAr,
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: v.mcqExplanation
				},
				sujetExercise: {
					customTitle: 'I. Textverständnis',
					points: 7,
					instruction: 'Lesen Sie den Gesundheitstext aufmerksam durch und beantworten Sie die Fragen :',
					content
				},
				hints: [
					'ميز بين الأطعمة الصحية الطبيعية (Vollkornbrot, Datteln, Olivenöl, Wasser) والمضرة بالتركيز.',
					'انتبه لدرجات المقارنة (genauso ... wie / besser als) وحالاتها الإعرابية.',
					'تأكد من مطابقة عائد الضمير (sie / ihr) في العدد والجنس مع الاسم السابق.'
				],
				solutionStepsAr: [
					'تحديد الفكرة المركزية والبدائل الصحية من النص (2.0 نقطة).',
					'اختيار الإجابتين الصحيحتين في الاختيار من متعدد (2.0 نقطة).',
					'استخراج المترادفات والأضداد والمركبات الاسمية أو المقارنات (1.5 نقطة).',
					'تحديد العائد النحوي للعبارات المسطرة (1.5 نقطة).'
				],
				finalAnswer: v.mcqCorrect
			};
		}
	},

	// 3. Sprachfähigkeit (7 Pkt.) — matching quiz + saveGermanSvgAsset
	{
		id: 'ger_tpl_2as_le_t2_ling_nebensaetze_syntax',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'grammatik_syntax',
		titleAr: 'II. Sprachfähigkeit : Nebensätze (weil, da, dass, wenn), Inversion und Gesundheit/Umwelt (7 Pkt.)',
		curriculumLessonId: 'ger_lesson_2as_le_t2_nebensaetze_weil_dass_wenn',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					svgSlug: 'ger_2as_t2_ling_nebensaetze_v0',
					svgContent: svgGermanGrammarMap({
						title: 'Nebensätze: weil, da, dass, wenn',
						rootLabel: 'Verb am Satzende (Satzklammer)',
						rootSub: 'Inversion bei Nebensatz am Satzanfang',
						width: 560,
						branches: [
							{
								label: 'weil / da',
								rule: 'Grund angeben (Kausal)',
								example: '... weil ich Wasser spare.'
							},
							{
								label: 'dass',
								rule: 'Nach wissen / meinen',
								example: 'Ich weiß, dass Obst hilft.'
							},
							{
								label: 'wenn',
								rule: 'Bedingung / wiederholt',
								example: 'Wenn du übst, bleibst fit.'
							},
							{
								label: 'Verb + Subjekt',
								rule: 'Nach Nebensatz am Anfang',
								example: 'Da es regnet, bleibe ich.'
							}
						]
					}),
					svgCaption: 'Struktur der kausalen, objektiven und konditionalen Nebensätze',
					classPrompt:
						'1. Ordnen Sie diese sechs Konjunktionen und Sätze richtig in die Tabelle ein (denn das ist gesund ; weil wir Bäume pflanzen ; dass man sauber bleibt ; aber er schläft wenig ; wenn die Sonne scheint ; und ich trinke Wasser) :',
					classCols: [
						{ header: 'Hauptsatz (Verb Pos. 2)', items: ['denn das ist gesund', 'aber er schläft wenig', 'und ich trinke Wasser'], mark: '0.5' },
						{ header: 'Nebensatz Kausal/Objekt', items: ['weil wir Bäume pflanzen', 'dass man sauber bleibt'], mark: '0.5' },
						{ header: 'Nebensatz Konditional', items: ['wenn die Sonne scheint'], mark: '0.5' }
					],
					q2: '2. Verbinden Sie jeweils die beiden Hauptsätze mit der angegebenen Konjunktion (achten Sie auf das Verb am Ende!) :\n  a) Ich esse täglich frisches Obst und Datteln. Ich möchte konzentriert lernen. (weil)\n  b) Alle Experten sind sich einig: Bewegung beugt Stress vor. (dass)\n  c) Du stehst rechtzeitig auf. Du kannst in Ruhe frühstücken. (wenn — beginnen Sie mit „Wenn...“)',
					a2: 'a) Ich esse täglich frisches Obst und Datteln, weil ich konzentriert lernen möchte.\n  b) Alle Experten sind sich einig, dass Bewegung Stress vorbeugt.\n  c) Wenn du rechtzeitig aufstehst, kannst du in Ruhe frühstücken.',
					q3: '3. Formen Sie die Sätze um, indem Sie den Nebensatz an die erste Stelle setzen (Inversion beachten!) :\n  a) Wir sparen Wasser und Strom, weil wir die Umwelt schützen wollen.\n  b) Der Schüler fühlt sich fit, wenn er abends rechtzeitig schläft.',
					a3: 'a) Weil wir die Umwelt schützen wollen, sparen wir Wasser und Strom.\n  b) Wenn der Schüler abends rechtzeitig schläft, fühlt er sich fit.',
					q4: '4. Ergänzen Sie das Reflexivpronomen oder bilden Sie den Imperativ (du) :\n  a) Meine Freunde und ich bewegen ............ regelmäßig im Park.\n  b) Imperativ (du) : frisches Gemüse essen -> ............ ; viel Wasser trinken -> ............ .',
					a4: 'a) uns.\n  b) Iss frisches Gemüse! / Trink viel Wasser!',
					pairs: [
						{ left: 'weil / da', right: 'Kausalsatz (Verb am Ende)' },
						{ left: 'denn', right: 'Hauptsatz-Konjunktion (Verb Pos. 2)' },
						{ left: 'wenn', right: 'Konditionalsatz (Verb am Ende)' },
						{ left: 'Nebensatz zuerst ->', right: 'Komma + Verb + Subjekt' }
					],
					explanation:
						'weil و da و wenn تجعل الفعل المصرف في نهاية الجملة، بينما denn تبقي الفعل في الموقع 2، وتقديم Nebensatz يفرض قلب الفعل والفاعل.'
				},
				{
					svgSlug: 'ger_2as_t2_ling_nebensaetze_v1',
					svgContent: svgGermanConjugationChart({
						title: 'Verbstellung bei Modal- & trennbaren Verben',
						subtitle: 'Besonderheiten am Ende des Nebensatzes',
						width: 560,
						columns: [
							{
								header: 'Trennbares Verb',
								rule: 'Wird nicht getrennt!',
								examples: '... weil er um 6 Uhr aufsteht.'
							},
							{
								header: 'Modalverb + Infinitiv',
								rule: 'Infinitiv vor Modalverb',
								examples: '... dass wir Müll trennen müssen.'
							},
							{
								header: 'Perfekt im Nebensatz',
								rule: 'Partizip II vor Hilfsverb',
								examples: '... weil sie viel geübt hat.'
							}
						]
					}),
					svgCaption: 'Wortstellung zusammengesetzter Verben im Nebensatz',
					classPrompt:
						'1. Klassifizieren Sie diese sechs Begriffe in die drei Themenfelder (Olivenöl, Mülltrennung, Radfahren, Solarenergie, Vollkornbrot, Schwimmen) :',
					classCols: [
						{ header: 'Gesunde Ernährung', items: ['Olivenöl', 'Vollkornbrot'], mark: '0.5' },
						{ header: 'Sport & Bewegung', items: ['Radfahren', 'Schwimmen'], mark: '0.5' },
						{ header: 'Umweltschutz', items: ['Mülltrennung', 'Solarenergie'], mark: '0.5' }
					],
					q2: '2. Setzen Sie die eingeklammerten Verben im Nebensatz an der richtigen Stelle ein :\n  a) Der Lehrer betont, dass alle Schüler die Flaschen (trennen müssen) ............ .\n  b) Wir bleiben drinnen, weil das Training heute früher (anfangen) ............ .\n  c) Salma ist zufrieden, weil sie gestern zehn Kilometer Rad (fahren -> Perfekt) ............ .',
					a2: 'a) trennen müssen.\n  b) anfängt (trennbares Verb bleibt zusammen).\n  c) gefahren ist (Partizip II + Hilfsverb sein).',
					q3: '3. Ersetzen Sie „denn“ durch „weil“ (oder umgekehrt) und passen Sie die Verbstellung an :\n  a) Ich trinke klares Wasser, denn Zucker macht schnell müde.\n  b) Da wir im Süden viel Sonne haben, bauen wir neue Solarparks.',
					a3: 'a) Ich trinke klares Wasser, weil Zucker schnell müde macht.\n  b) Wir bauen neue Solarparks, denn wir haben im Süden viel Sonne.',
					q4: '4. Ergänzen Sie „das“ oder „dass“ sinnvoll :\n  a) ............ Vollkornbrot, ............ auf dem Tisch liegt, ist sehr frisch.\n  b) Ich hoffe, ............ wir bald zwanzig neue Bäume pflanzen.',
					a4: 'a) Das / das (Artikel + Relativpronomen).\n  b) dass (Konjunktion).',
					pairs: [
						{ left: 'trennbares Verb nach weil', right: 'nicht getrennt (z.B. anfängt)' },
						{ left: 'Modalverb nach dass', right: 'Infinitiv + Modalverb am Ende' },
						{ left: 'Perfekt nach weil', right: 'Partizip II + haben/sein am Ende' },
						{ left: 'das vs dass', right: 'Artikel vs Konjunktion' }
					],
					explanation:
						'في الجملة الجانبية لا ينفصل الفعل المنفصل، ويأتي المصدر أو اسم المفعول قبل الفعل المساعد في النهاية، وتكتب dass بأداة الربط بحرفي s.'
				},
				{
					svgSlug: 'ger_2as_t2_ling_nebensaetze_v2',
					svgContent: svgGermanConjugationChart({
						title: 'Reflexive Verben & Imperativ (Gesundheit)',
						subtitle: 'Pronomen & Befehlsformen korrekt bilden',
						width: 560,
						columns: [
							{
								header: 'Reflexiv (Akkusativ)',
								rule: 'mich / dich / sich / uns / euch',
								examples: 'Ihr ruht euch heute aus.'
							},
							{
								header: 'Imperativ (du)',
								rule: 'e -> i bleibt | ä -> a weg',
								examples: 'Iss Obst! Fahr vorsichtig!'
							},
							{
								header: 'Imperativ (ihr / Sie)',
								rule: 'Trennbare Präfixe ans Ende',
								examples: 'Ruht euch aus! Schließen Sie!'
							}
						]
					}),
					svgCaption: 'Reflexivpronomen und Imperativformen für Gesundheitstipps',
					classPrompt:
						'1. Ordnen Sie diese sechs Sätze nach ihrer Satzstruktur ein (Ich hoffe, dass du kommst ; Trink viel Wasser! ; Wenn wir sparen, schützen wir die Natur ; Iss jeden Tag Obst! ; Er lernt, weil er Fragen hat ; Da es heiß ist, trinken wir Tee) :',
					classCols: [
						{ header: 'Hauptsatz + Nebensatz', items: ['Ich hoffe, dass du kommst', 'Er lernt, weil er Fragen hat'], mark: '0.5' },
						{ header: 'Nebensatz + Inversion', items: ['Wenn wir sparen, schützen wir die Natur', 'Da es heiß ist, trinken wir Tee'], mark: '0.5' },
						{ header: 'Imperativsätze', items: ['Trink viel Wasser!', 'Iss jeden Tag Obst!'], mark: '0.5' }
					],
					q2: '2. Korrigieren Sie jeweils den Wortstellungsfehler im Nebensatz oder bei der Inversion :\n  a) Wenn man jeden Tag zu lange sitzt, man bekommt Rückenschmerzen.\n  b) Ich denke, dass die Mülltrennung ist sehr wichtig für unsere Schule.\n  c) Weil die Klasse fängt um acht Uhr an, stehe ich früh auf.',
					a2: 'a) Wenn man jeden Tag zu lange sitzt, bekommt man Rückenschmerzen.\n  b) Ich denke, dass die Mülltrennung sehr wichtig für unsere Schule ist.\n  c) Weil die Klasse um acht Uhr anfängt, stehe ich früh auf.',
					q3: '3. Verbinden Sie die Satzpaare sinnvoll mit „da“, „weil“ oder „wenn“ :\n  a) Das Leitungswasser ist kostbar. Man soll den Hahn beim Waschen schließen. (Da...)\n  b) Die Schüler bewegen sich im Hof. Sie fühlen sich nachher frischer. (Wenn...)',
					a3: 'a) Da das Leitungswasser kostbar ist, soll man den Hahn beim Waschen schließen.\n  b) Wenn die Schüler sich im Hof bewegen, fühlen sie sich nachher frischer.',
					q4: '4. Bilden Sie aus den Verben den Imperativ (du und Sie) und ergänzen Sie das Reflexivpronomen :\n  a) sich gut konzentrieren (du) -> ............ !\n  b) den Wasserhahn rechtzeitig schließen (Sie) -> ............ !',
					a4: 'a) Konzentriere dich gut!\n  b) Schließen Sie den Wasserhahn rechtzeitig!',
					pairs: [
						{ left: 'wir + sich ausruhen', right: 'wir ruhen uns aus' },
						{ left: 'du + essen (Imperativ)', right: 'Iss!' },
						{ left: 'du + fahren (Imperativ)', right: 'Fahr!' },
						{ left: 'Sie + sparen (Imperativ)', right: 'Sparen Sie!' }
					],
					explanation:
						'تصريف الضمائر الانعكاسية يطابق الفاعل (wir -> uns)، وفي أمر du يحتفظ essen بـ i (Iss!) ويسقط Umlaut في fahren (Fahr!).'
				}
			];

			const v = rng.pick(variants);
			const svgPath = saveGermanSvgAsset(v.svgSlug, v.svgContent);

			const content: ContentBlock[] = [
				{
					type: 'image',
					src: svgPath,
					width: '76%',
					caption: v.svgCaption
				},
				{ type: 'text', content: v.classPrompt, mark: '' },
				buildGermanClassificationTableBlock({ columns: v.classCols }),
				{ type: 'text', content: v.q2, answer: v.a2, mark: '2.0' },
				{ type: 'text', content: v.q3, answer: v.a3, mark: '2.0' },
				{ type: 'text', content: v.q4, answer: v.a4, mark: '1.5' }
			];

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'linguistic_competence',
				quizQuestion: {
					type: 'matching',
					questionText: 'Ordnen Sie jedes grammatische Element der linken Spalte der passenden Struktur rechts zu:',
					questionTextAr: 'صل كل أداة أو بنية في اليمين بالقاعدة الصحيحة الموافقة لها في اليسار:',
					questionData: {
						pairs: v.pairs
					},
					explanation: v.explanation
				},
				sujetExercise: {
					customTitle: 'II. Sprachfähigkeit',
					points: 7,
					instruction: 'Lösen Sie die folgenden Grammatik- und Wortschatzaufgaben :',
					content
				},
				hints: [
					'تأكد في الجمل الجانبية (weil, da, dass, wenn) من نقل الفعل المصرف إلى آخر الجملة تماماً.',
					'عند البدء بالطرف الجانبي لا تنسَ وضع الفاصلة ثم الفعل المصرف مباشرة في الموقع الثاني (Inversion).',
					'انتبه لعدم انفصال الفعل المنفصل داخل الجملة الجانبية (anfängt, aufsteht).'
				],
				solutionStepsAr: [
					'تصنيف التراكيب أو المفردات في الجدول الثلاثي (1.5 نقطة).',
					'توظيف الجمل الجانبية بترتيب الفعل المصرف في النهاية (2.0 نقطة).',
					'إنجاز القلب النحوي أو التحويل بين denn و weil أو التصحيح (2.0 نقطة).',
					'ضبط الأفعال الانعكاسية والأمر أو التمييز بين das و dass (1.5 نقطة).'
				],
				finalAnswer: v.pairs.map((p) => `${p.left} = ${p.right}`).join(' | ')
			};
		}
	},

	// 4. Sprachfähigkeit (7 Pkt.) — drag_drop quiz + saveGermanSvgAsset
	{
		id: 'ger_tpl_2as_le_t2_ling_komparativ_wortbildung',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'wortschatz_wortbildung',
		titleAr: 'II. Sprachfähigkeit : Komparativ, Superlativ und Wortbildung (7 Pkt.)',
		curriculumLessonId: 'ger_lesson_2as_le_t2_komparativ_superlativ_wortbildung',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					svgSlug: 'ger_2as_t2_ling_wortbildung_v0',
					svgContent: svgGermanWordFormation({
						title: 'Wortbildung: Präfix + Stamm + Suffix',
						prefix: 'ver-',
						root: 'antwort',
						suffix: '-lich',
						derivedWord: 'verantwortlich (Adjektiv)',
						meaningNote: 'Familie: verantworten | die Verantwortung | verantwortlich'
					}),
					svgCaption: 'Beispiel für Wortbildung durch Präfix und Suffix im Themenfeld Umwelt & Ethik',
					wfRows: [
						{
							verb: { given: true, value: 'ernähren' },
							nomen: { value: 'die Ernährung', mark: '0.5' },
							adjektiv: { value: 'nahrhaft / ernährungsreich', mark: '0.5' }
						},
						{
							verb: { value: 'schützen', mark: '0.5' },
							nomen: { given: true, value: 'der Schutz' },
							adjektiv: { value: 'schützend / geschützt', mark: '0.5' }
						}
					],
					q2: '2. Ergänzen Sie Positiv (mit wie), Komparativ (mit als) oder Superlativ :\n  a) Frisches Obst ist (gesund) ............ Süßigkeiten mit viel Zucker.\n  b) Wasser ist für den Körper genauso (wichtig) ............ gute Luft.\n  c) Von allen erneuerbaren Energien arbeitet die Sonne im Süden (effektiv) ............ ; und Sport treibe ich (gern) ............ am frühen Morgen.',
					a2: 'a) gesünder als (Umlaut u->ü + als).\n  b) wichtig wie (Gleichheit mit wie).\n  c) am effektivsten / am liebsten (Superlativ von gern).',
					q3: '3. Bilden Sie aus den Adjektiven oder Verben Nomen mit „-ung“, „-heit“ oder „-keit“ (mit Artikel!) :\n  a) trennen -> ............ ; b) sauber -> ............ ; c) gesund -> ............ .',
					a3: 'a) die Trennung ; b) die Sauberkeit ; c) die Gesundheit.',
					q4: '4. Bilden Sie das Gegenteil mit dem Präfix „un-“ oder dem Suffix „-los“ :\n  a) gesund -> ............ ; möglich -> ............ .\n  b) mit Verantwortung -> ............ ; ohne Kosten -> ............ .',
					a4: 'a) ungesund ; unmöglich.\n  b) verantwortungsvoll / (Gegenteil: verantwortungslos) ; kostenlos.',
					ddStem: 'Ordnen Sie jede Vergleichsform der passenden Stufe zu:',
					ddCategories: ['Komparativ (mit als)', 'Superlativ (am ...-sten)'],
					ddItems: [
						{ text: 'gesünder als', category: 0 },
						{ text: 'besser als', category: 0 },
						{ text: 'höher als', category: 0 },
						{ text: 'am gesündesten', category: 1 },
						{ text: 'am besten', category: 1 },
						{ text: 'am liebsten', category: 1 }
					]
				},
				{
					svgSlug: 'ger_2as_t2_ling_wortbildung_v1',
					svgContent: svgGermanConjugationChart({
						title: 'Steigerung der Adjektive (2AS LE)',
						subtitle: 'Regelmäßig, Umlaut und unregelmäßige Formen',
						width: 560,
						columns: [
							{
								header: 'Gleichheit (Positiv)',
								rule: 'so / genauso ... wie',
								examples: 'so sauber wie früher'
							},
							{
								header: 'Komparativ (-er + als)',
								rule: 'Oft Umlaut: a->ä, u->ü',
								examples: 'älter als / gesünder als'
							},
							{
								header: 'Unregelmäßig',
								rule: 'gut / viel / gern / hoch',
								examples: 'besser, mehr, lieber, höher'
							}
						]
					}),
					svgCaption: 'Übersicht über Positiv, Komparativ, Umlaut und unregelmäßige Steigerung',
					wfRows: [
						{
							verb: { given: true, value: 'bewegen' },
							nomen: { value: 'die Bewegung', mark: '0.5' },
							adjektiv: { value: 'beweglich / bewegt', mark: '0.5' }
						},
						{
							verb: { value: 'sauber machen / säubern', mark: '0.5' },
							nomen: { value: 'die Sauberkeit', mark: '0.5' },
							adjektiv: { given: true, value: 'sauber' }
						}
					],
					q2: '2. Setzen Sie die unregelmäßigen Adjektive oder Umlaut-Adjektive in Komparativ oder Superlativ :\n  a) Mein Vater trinkt (viel) ............ Kräutertee als früher, aber Wasser trinkt er (viel) ............ .\n  b) Der alte Olivenbaum ist (alt) ............ als der junge Baum, und ein Zug fährt (schnell) ............ als ein Fahrrad.\n  c) Die Gipfel des Atlasgebirges sind (hoch) ............ als die Hügel an der Küste.',
					a2: 'a) mehr / am meisten.\n  b) älter / schneller.\n  c) höher (ohne c bei hoch -> höher!).',
					q3: '3. Zerlegen Sie diese Komposita und bestimmen Sie ihren Artikel (Grundwort entscheidet!) :\n  a) ...... Umweltschutz = die Umwelt + ............ .\n  b) ...... Vollkornbrot = das volle Korn + ............ .\n  c) ...... Solarenergie = die Sonne + ............ .',
					a3: 'a) der Umweltschutz (der Schutz).\n  b) das Vollkornbrot (das Brot).\n  c) die Solarenergie (die Energie).',
					q4: '4. Finden Sie jeweils ein passendes Synonym aus dem Wortfeld Gesundheit oder Umwelt :\n  a) sparen / wirtschaftlich nutzen -> ............ (mit Maß umgehen).\n  b) gesund und abwechslungsreich -> ............ .',
					a4: 'a) schonen / haushalten (nicht verschwenden).\n  b) ausgewogen.',
					ddStem: 'Ordnen Sie jedes abgeleitete Nomen seinem richtigen Suffix-Muster zu:',
					ddCategories: ['Nomen auf -ung (von Verben)', 'Nomen auf -heit / -keit (von Adjektiven)'],
					ddItems: [
						{ text: 'die Ernährung', category: 0 },
						{ text: 'die Bewegung', category: 0 },
						{ text: 'die Mülltrennung', category: 0 },
						{ text: 'die Gesundheit', category: 1 },
						{ text: 'die Sauberkeit', category: 1 },
						{ text: 'die Freundlichkeit', category: 1 }
					]
				},
				{
					svgSlug: 'ger_2as_t2_ling_wortbildung_v2',
					svgContent: svgGermanWordFormation({
						title: 'Substantivierung auf -heit / -keit',
						prefix: '—',
						root: 'sauber',
						suffix: '-keit',
						derivedWord: 'die Sauberkeit (feminin)',
						meaningNote: 'Adjektive auf -er, -el, -ig, -lich bilden Nomen mit -keit.'
					}),
					svgCaption: 'Wortbildungsschema für feminine abstrakte Nomen auf -keit',
					wfRows: [
						{
							verb: { given: true, value: 'sparen' },
							nomen: { value: 'die Sparsamkeit / das Sparen', mark: '0.5' },
							adjektiv: { value: 'sparsam', mark: '0.5' }
						},
						{
							verb: { value: 'verschmutzen', mark: '0.5' },
							nomen: { given: true, value: 'die Verschmutzung' },
							adjektiv: { value: 'schmutzig / verschmutzt', mark: '0.5' }
						}
					],
					q2: '2. Korrigieren Sie die fehlerhaften Vergleichsformen in diesen vier Sätzen :\n  a) Olivenöl ist gesunder wie künstliches Fett.\n  b) Diese Übung ist genau so leicht als die gestrige.\n  c) Im Sommer schmecken kühle Datteln am gutsten.\n  d) Mein jüngerer Bruder hat viel mehr Bücher wie ich.',
					a2: 'a) Olivenöl ist gesünder als künstliches Fett.\n  b) Diese Übung ist genauso leicht wie die gestrige.\n  c) Im Sommer schmecken kühle Datteln am besten.\n  d) Mein jüngerer Bruder hat viel mehr Bücher als ich.',
					q3: '3. Verbinden Sie je zwei Wörter zu sinnvollen deutschen Komposita (mit Artikel) :\n  a) das Wasser + der Hahn -> ............\n  b) die Umwelt + das Problem -> ............\n  c) der Sport + der Platz -> ............',
					a3: 'a) der Wasserhahn ; b) das Umweltproblem ; c) der Sportplatz.',
					q4: '4. Ergänzen Sie die Lücken mit einem passenden Adjektiv auf -los, -voll oder mit un- :\n  a) Wer Abfälle auf den Boden wirft, handelt ............ (ohne Verantwortung).\n  b) Der Eintritt in die Schulbibliothek ist für alle Schüler ............ (ohne Kosten).\n  c) Frisches Gemüse ist sehr ............ (reich an Wert/Vitaminen) für unsere Gesundheit.',
					a4: 'a) verantwortungslos ; b) kostenlos ; c) wertvoll.',
					ddStem: 'Unterscheiden Sie korrekte von falschen Vergleichsformen im Deutschen:',
					ddCategories: ['Grammatisch richtig', 'Grammatisch falsch'],
					ddItems: [
						{ text: 'Fahrradfahren ist gesünder als langes Sitzen.', category: 0 },
						{ text: 'Wasser ist genauso wichtig wie gesunde Luft.', category: 0 },
						{ text: 'Fahrradfahren ist gesunder wie langes Sitzen.', category: 1 },
						{ text: 'Wasser ist genauso wichtig als gesunde Luft.', category: 1 }
					]
				}
			];

			const v = rng.pick(variants);
			const svgPath = saveGermanSvgAsset(v.svgSlug, v.svgContent);

			const content: ContentBlock[] = [
				{
					type: 'image',
					src: svgPath,
					width: '76%',
					caption: v.svgCaption
				},
				{
					type: 'text',
					content: '1. Ergänzen Sie die Wortfamilien-Tabelle (Verb / Nomen / Adjektiv) :',
					mark: ''
				},
				buildGermanWordFamilyTableBlock(v.wfRows),
				{ type: 'text', content: v.q2, answer: v.a2, mark: '2.0' },
				{ type: 'text', content: v.q3, answer: v.a3, mark: '1.5' },
				{ type: 'text', content: v.q4, answer: v.a4, mark: '1.5' }
			];

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'linguistic_competence',
				quizQuestion: {
					type: 'drag_drop',
					questionText: v.ddStem,
					questionTextAr: 'اسحب كل كلمة أو عبارة إلى التصنيف النحوي أو الصرفي الصحيح:',
					questionData: {
						categories: v.ddCategories,
						items: rng.shuffle(v.ddItems)
					},
					explanation:
						'للمساواة نستخدم so/genauso + Positiv + wie، وللمقارنة نستخدم -er + als، وفي الاشتقاق تتبع -ung الأفعال و -heit/-keit الصفات لتشكيل أسماء مؤنثة (die).'
				},
				sujetExercise: {
					customTitle: 'II. Sprachfähigkeit',
					points: 7,
					instruction: 'Bearbeiten Sie die Aufgaben zu Komparativ, Superlativ und Wortbildung :',
					content
				},
				hints: [
					'المقارنة غير المتساوية تأخذ als دائماً (gesünder als)، والمساواة تأخذ wie (so wichtig wie).',
					'تذكّر الصيغ الشاذة: gut -> besser -> am besten | viel -> mehr -> am meisten | gern -> lieber -> am liebsten.',
					'الأسماء المركبة (Komposita) واللواحق (-ung, -heit, -keit) تحدد الأداة دائماً حسب الكلمة الأخيرة.'
				],
				solutionStepsAr: [
					'إكمال جدول عائلة الكلمات (2.0 نقطة).',
					'استعمال درجات المقارنة والتفضيل وتصحيح الأخطاء (2.0 نقطة).',
					'تشكيل الأسماء المشتقة أو المركبة مع تحديد الأداة (1.5 نقطة).',
					'إنتاج الأضداد بالسوابق واللواحق أو المترادفات (1.5 نقطة).'
				],
				finalAnswer: v.ddItems.map((it) => `${it.text} : ${v.ddCategories[it.category]}`).join(' | ')
			};
		}
	},

	// 5. Schriftlicher Ausdruck (6 Pkt., Integration) — ordering quiz
	{
		id: 'ger_tpl_2as_le_t2_writ_gesund_leben',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'schriftlicher_ausdruck',
		titleAr: 'III. Schriftlicher Ausdruck : Gesunde Ernährung, Sport und Lebensweise (6 Pkt.)',
		curriculumLessonId: 'ger_lesson_2as_le_t2_gesunde_ernaehrung_sport',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					themaEinsPrompt:
						'Schreiben Sie einen Ratgeber-Artikel (110 bis 135 Wörter) für junge Gymnasiasten über gesunde Ernährung und regelmäßige Bewegung im Schulalltag.',
					themaEinsStichpunkte: [
						'Warum ein gesundes Frühstück (Vollkornbrot, Olivenöl, Datteln, Obst) und viel Wasser für die Konzentration wichtig sind.',
						'Welche ungesunden Gewohnheiten man vermeiden sollte (zu viel Zucker, Fast Food, langes Sitzen vor Bildschirmen).',
						'Wie regelmäßiger Sport (Schwimmen, Radfahren, Wandern) und genug Schlaf helfen.',
						'Verwendung von Nebensätzen (weil, dass, wenn) und mindestens einem Komparativ.'
					],
					themaZweiPrompt:
						'Verfassen Sie einen kurzen Aufsatz (110 bis 135 Wörter) darüber, warum ein geordneter Schlafrhythmus und Pausen an der frischen Luft besser für den Schulerfolg sind als nächtliches Pauken.',
					modelAnswer:
						'Viele Schülerinnen und Schüler möchten im Gymnasium gute Leistungen erzielen, vergessen dabei aber oft ihre körperliche Gesundheit. Dabei weiß jeder, dass gesunde Ernährung und regelmäßige Bewegung unsere Konzentration direkt stärken.\n\nErstens sollten wir morgens nie ohne Frühstück das Haus verlassen. Vollkornbrot mit Olivenöl, frisches Obst und Datteln geben dem Gehirn viel länger Kraft als zuckerhaltige Snacks. Außerdem ist klares Wasser gesünder als künstliche Limonaden. Zweitens müssen wir uns nach dem Unterricht regelmäßig bewegen, weil Sport wie Radfahren, Schwimmen oder Wandern Müdigkeit abbaut.\n\nWenn wir zusätzlich auf ausreichend Schlaf achten, fühlen wir uns tagsüber ausgeglichener und lernen deutlich leichter.',
					rubricSummary:
						'Umsetzung aller Stichpunkte und Klarheit (2.0 Pkt.) / Nebensätze (weil, dass, wenn) und Komparativ (2.0 Pkt.) / Gesundheitswortschatz und Rechtschreibung (2.0 Pkt.)',
					orderedSteps: [
						'Gesunde Ernährung und Sport sind entscheidend für den Erfolg im Gymnasium.',
						'Erstens liefert ein gutes Frühstück mit Vollkornbrot, Olivenöl und Datteln natürliche Kraft.',
						'Außerdem sollten wir regelmäßig Sport treiben, weil Bewegung Müdigkeit und Stress abbaut.',
						'Wenn wir gesund essen und genug schlafen, lernen wir viel konzentrierter.'
					],
					orderExplanation:
						'يتدرج المقال الإرشادي من الفكرة العامة إلى النصيحة الغذائية الأولى، فالإضافة حول الرياضة، ويُختم بالنتيجة الشرطية.'
				},
				{
					themaEinsPrompt:
						'Ihr jüngerer Cousin isst häufig Fast Food und bewegt sich kaum. Schreiben Sie ihm eine freundliche, aber überzeugende E-Mail (110 bis 135 Wörter) mit praktischen Gesundheitstipps.',
					themaEinsStichpunkte: [
						'Freundliche Anrede und Sorge um seine Gesundheit.',
						'Kritik an zu viel Zucker und Bewegungsmangel (mit weil / dass).',
						'Drei konkrete Vorschläge im Imperativ oder mit sollten (Wasser trinken, Obst essen, Rad fahren).',
						'Ermutigender Schluss und Gruß.'
					],
					themaZweiPrompt:
						'Vergleichen Sie in einem Aufsatz (110 bis 135 Wörter) die traditionelle algerische Familienküche (Olivenöl, Linsensuppe, Gemüse, Datteln) mit modernen Fertiggerichten unter gesundheitlichen Gesichtspunkten.',
					modelAnswer:
						'Lieber Sami,\n\nich habe gehört, dass du in letzter Zeit sehr oft Fast Food isst und abends lange vor dem Bildschirm sitzt. Da mir deine Gesundheit am Herzen liegt, möchte ich dir heute ein paar einfache Tipps geben.\n\nErstens ist frisches Essen von zu Hause viel gesünder und günstiger als Fertiggerichte. Iss jeden Tag frisches Obst, Gemüse und Datteln, und trink statt süßer Limonaden lieber Wasser oder Kräutertee! Zweitens solltest du dich jeden Nachmittag mindestens dreißig Minuten bewegen. Fahr mit dem Fahrrad oder geh mit Freunden spazieren, weil frische Luft sofort wach macht.\n\nWenn du nächste Woche damit anfängst, wirst du dich schon bald viel fitter fühlen!\n\nViele Grüße\ndein Tarik',
					rubricSummary:
						'Adressatenbezug, Briefform und Ratschläge (2.0 Pkt.) / Imperativ, Komparativ und Nebensätze (2.0 Pkt.) / Ausdruck und Orthographie (2.0 Pkt.)',
					orderedSteps: [
						'Lieber Sami, da mir deine Gesundheit wichtig ist, schreibe ich dir heute ein paar Tipps.',
						'Frische Hausmannskost mit Obst und Olivenöl ist viel gesünder als Fast Food.',
						'Trink jeden Tag genug Wasser und fahr am Nachmittag regelmäßig Fahrrad!',
						'Wenn du diese Gewohnheiten übst, fühlst du dich bald deutlich fitter.'
					],
					orderExplanation:
						'تنتقل الرسالة من السبب (da) إلى المقارنة الصحية (gesünder als)، فالأمر المباشر بالنصائح، فالخاتمة التشجيعية.'
				},
				{
					themaEinsPrompt:
						'Schreiben Sie einen gegliederten Aufsatz (110 bis 135 Wörter) zum Thema: „Warum ist der richtige Ausgleich zwischen Lernen, Sport und Ruhe am besten für junge Sprachschüler?“',
					themaEinsStichpunkte: [
						'Einleitung: Anforderungen der 2AS LE und Gefahr von Erschöpfung.',
						'Vorteile regelmäßiger Pausen und sportlicher Aktivität (Reflexive Verben: sich bewegen, sich ausruhen, sich konzentrieren).',
						'Vergleich zwischen geplanter Tagesordnung und unorganisiertem Lernen (Komparativ / Superlativ).',
						'Schlussfolgerung mit persönlicher Empfehlung.'
					],
					themaZweiPrompt:
						'Welche Rolle spielt gemeinsamer Schulsport für Fairness, Gesundheit und Respekt unter Mitschülern? Schreiben Sie einen kurzen Aufsatz (110 bis 135 Wörter).',
					modelAnswer:
						'In der zweiten Klasse des Gymnasiums haben wir viele Aufgaben in verschiedenen Sprachen zu erledigen. Deshalb fragen sich viele Jugendliche, wie sie gleichzeitig fleißig lernen und gesund bleiben können.\n\nEinerseits muss man sich im Unterricht und bei den Hausaufgaben konzentrieren. Andererseits braucht jeder Mensch Pausen, um sich richtig auszuruhen. Wenn Schüler eine halbe Stunde spazieren gehen oder schwimmen, erholen sich ihre Augen und ihr Gedächtnis arbeitet nachher besser als vorher. Ein klarer Tagesplan mit Bewegung und gutem Essen ist am besten geeignet, um Stress zu vermeiden.\n\nMeiner Meinung nach gehören geistige Arbeit und körperliche Pflege untrennbar zusammen.',
					rubricSummary:
						'Ausgewogene Argumentation und Stichpunkte (2.0 Pkt.) / Reflexive Verben, Konnektoren und Komparation (2.0 Pkt.) / Stil und Rechtschreibung (2.0 Pkt.)',
					orderedSteps: [
						'In der Oberstufe brauchen Jugendliche einen guten Ausgleich zwischen Lernen und Erholung.',
						'Einerseits muss man konzentriert üben, andererseits braucht der Körper regelmäßige Pausen.',
						'Wenn man sich im Freien bewegt, arbeitet das Gedächtnis nachher besser als vorher.',
						'Deshalb gehören fleißiges Studium und körperliche Gesundheit untrennbar zusammen.'
					],
					orderExplanation:
						'ينطلق العرض من طرح الإشكالية، ثم المقابلة بين شقين (einerseits / andererseits)، فالشرط والنتيجة (wenn)، ويُختم بالخلاصة (deshalb).'
				}
			];

			const v = rng.pick(variants);
			const scrambled = scrambleOrdering(v.orderedSteps, rng);

			const block = buildGermanWrittenProductionBlock({
				themaEinsTitle: 'Thema 1 (Gelenkt) :',
				themaEinsPrompt: v.themaEinsPrompt,
				themaEinsStichpunkte: v.themaEinsStichpunkte,
				themaZweiPrompt: v.themaZweiPrompt,
				modelAnswer: v.modelAnswer,
				rubricSummary: v.rubricSummary,
				mark: '6'
			});

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'ordering',
					questionText: 'Ordnen Sie die vier Sätze zu einem stimmigen deutschen Text über Gesundheit und Sport:',
					questionTextAr: 'رتّب الجمل الأربع الآتية لتكوين نص ألماني متماسك حول الصحة والرياضة:',
					questionData: {
						items: scrambled.items,
						correctOrder: scrambled.correctOrder
					},
					explanation: v.orderExplanation
				},
				sujetExercise: {
					customTitle: 'III. Schriftlicher Ausdruck',
					points: 6,
					instruction: 'Wählen Sie EINES der beiden Themen und schreiben Sie einen gut gegliederten Text (110 bis 135 Wörter) :',
					content: [block]
				},
				hints: [
					'احترم البنية الثلاثية (مقدمة، عرض بالحجج والروابط، وخاتمة بالتوصية).',
					'استثمر قواعد الفصل الثاني: الجمل الجانبية (weil, dass, wenn)، درجات المقارنة، والأفعال الانعكاسية.',
					'احرص على التزام الأطعمة والمشروبات الصحية المباحة وتجنب الحشو والتكرار.'
				],
				solutionStepsAr: [
					'استيفاء مضمون الموضوع وتوظيف جميع المعطيات الموجّهة (2.0 نقطة).',
					'سلامة النحو في الجمل الجانبية والمقارنات والانعكاس والأمر (2.0 نقطة).',
					'ثراء المعجم الصحي وسلامة الإملاء الألماني (2.0 نقطة).'
				],
				finalAnswer: v.orderedSteps.join(' -> ')
			};
		}
	},

	// 6. Schriftlicher Ausdruck (6 Pkt., Integration) — cloze quiz
	{
		id: 'ger_tpl_2as_le_t2_writ_umweltschutz_aktion',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'schriftlicher_ausdruck',
		titleAr: 'III. Schriftlicher Ausdruck : Umweltschutz, Aufforstung und Nachhaltigkeit (6 Pkt.)',
		curriculumLessonId: 'ger_lesson_2as_le_t2_umweltschutz_natur',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					themaEinsPrompt:
						'Ihre Schule organisiert einen Umwelttag. Schreiben Sie einen Aufruf (110 bis 135 Wörter) an alle Schülerinnen und Schüler, damit sich möglichst viele an der Baumpflanzung und am Wassersparen beteiligen.',
					themaEinsStichpunkte: [
						'Begründung der Aktion (Umweltverschmutzung, Hitze im Sommer, Plastikabfall).',
						'Konkrete Aufgaben am Projekttag (Olivenbäume pflanzen, Schulhof reinigen, Mülltrennungsbehälter aufstellen).',
						'Ethischer Wert von Sauberkeit und Sparsamkeit mit Wasser.',
						'Einsatz von weil / da / dass und einem Appell im Imperativ.'
					],
					themaZweiPrompt:
						'Schreiben Sie einen Aufsatz (110 bis 135 Wörter) über die Frage: „Welche Vorteile bieten erneuerbare Energien (Sonne und Wind) für Algerien und die Umwelt im Vergleich zu fossilen Brennstoffen?“',
					modelAnswer:
						'Liebe Mitschülerinnen und Mitschüler,\n\nam kommenden Samstag veranstaltet unser Gymnasium einen großen Umwelttag, weil wir unsere Schule grüner und sauberer gestalten möchten. Da Bäume für saubere Luft und Schatten sorgen, wollen wir gemeinsam zwanzig junge Bäume im Schulhof pflanzen.\n\nJede Klasse übernimmt eine klare Aufgabe: Eine Gruppe sammelt den Plastikabfall und stellt neue Behälter für die Mülltrennung auf, während eine andere Gruppe den Schulgarten gießt und Hinweisschilder zum Wassersparen gestaltet. Schließlich lehrt uns unsere ethische und religiöse Verantwortung, dass Sauberkeit zur Hälfte des Glaubens gehört und wir kein Wasser verschwenden dürfen.\n\nKommt am Samstag um acht Uhr mit und helft tatkräftig mit!',
					rubricSummary:
						'Überzeugender Aufruf und Abdeckung aller Stichpunkte (2.0 Pkt.) / Kausal-, Objekt- und Imperativsätze (2.0 Pkt.) / Umweltvokabular und Orthographie (2.0 Pkt.)',
					clozeSentence: 'Wir pflanzen viele junge Bäume, ___ sie Schatten spenden und die Luft reinigen.',
					clozeCorrect: 'weil',
					clozeDistractors: ['denn', 'aber', 'wie'],
					clozeExplanation:
						'جاء الفعل المصرف في نهاية الجملة (spenden ... reinigen)، وللسببية مع فعل في النهاية نستعمل «weil» وليس denn.'
				},
				{
					themaEinsPrompt:
						'Schreiben Sie einen sachlichen Brief (110 bis 135 Wörter) an die Schulleitung Ihres Gymnasiums und schlagen Sie zwei umweltfreundliche Verbesserungen vor (z.B. Mülltrennung in jedem Klassenraum und Energiesparlampen).',
					themaEinsStichpunkte: [
						'Höfliche Anrede („Sehr geehrte Frau Direktorin / Sehr geehrter Herr Direktor,“) und klares Anliegen.',
						'Darstellung des aktuellen Problems und zwei konkrete, kostengünstige Vorschläge.',
						'Nutzen für die Schule (weniger Abfall, saubere Umwelt, Vorbildfunktion) mit Nebensätzen und Komparativ.',
						'Bereitschaft der Schüler zur Mithilfe und höfliche Grußformel („Mit freundlichen Grüßen“).'
					],
					themaZweiPrompt:
						'Warum gehört der Schutz des Wassers heute zu den wichtigsten Aufgaben jedes Bürgers? Verfassen Sie einen gegliederten Aufsatz (110 bis 135 Wörter) mit praktischen Sparbeispielen für Familie und Landwirtschaft.',
					modelAnswer:
						'Sehr geehrter Herr Direktor,\n\nim Namen unserer Klasse der 2AS LE wenden wir uns höflich an Sie, weil wir ein Umweltprojekt in unserem Gymnasium vorschlagen möchten. Wir haben beobachtet, dass täglich viel Papier und Plastik im selben Mülleimer landet und manche Klassenräume unnötig beleuchtet bleiben.\n\nDeshalb schlagen wir vor, dass wir in jedem Stockwerk getrennte Behälter für Papier und Kunststoff aufstellen. Außerdem wäre es sparsamer und umweltfreundlicher, ältere Lampen schrittweise durch moderne Energiesparlampen zu ersetzen. Unsere Klasse ist gern bereit, Informationsplakate zu gestalten, damit alle Schülerinnen und Schüler sorgsam mit Strom und Papier umgehen.\n\nWir hoffen, dass unser Vorschlag Ihre Zustimmung findet.\n\nMit freundlichen Grüßen\ndie Klasse 2AS LE',
					rubricSummary:
						'Formeller Briefstil und klare Vorschläge (2.0 Pkt.) / Nebensätze (weil, dass), Komparativ und Höflichkeitsform „Sie“ (2.0 Pkt.) / Präziser Ausdruck und Rechtschreibung (2.0 Pkt.)',
					clozeSentence: 'Es wäre viel ___, wenn jede Klasse Papier und Plastik getrennt sammelt.',
					clozeCorrect: 'umweltfreundlicher',
					clozeDistractors: ['umweltfreundlichste', 'umweltfreundlich', 'umweltfreundlich wie'],
					clozeExplanation:
						'الظرف «viel» يعزز صيغة المقارنة (Komparativ): viel umweltfreundlicher.'
				},
				{
					themaEinsPrompt:
						'Verfassen Sie einen Informations- und Meinungsartikel (110 bis 135 Wörter) über das Thema „Wie schützt jeder Einzelne im Alltag die Natur?“',
					themaEinsStichpunkte: [
						'Einleitung über die Verantwortung jedes Bürgers gegenüber Boden, Luft und Wasser.',
						'Konkrete Beispiele für zu Hause und den Schulweg (Wasserhahn schließen, Stofftaschen statt Plastiktüten, zu Fuß gehen oder Bus nehmen).',
						'Einsatz von weil / wenn und abgeleiteten Nomen auf -ung, -heit oder -keit.',
						'Abschließende eigene Meinung.'
					],
					themaZweiPrompt:
						'Stellen Sie in einem kurzen Aufsatz (110 bis 135 Wörter) das algerische Aufforstungsprojekt „Grüner Damm“ (Barrage Vert) und die Bedeutung von Wäldern gegen die Wüstenbildung vor.',
					modelAnswer:
						'Der Schutz der Umwelt beginnt nicht erst bei großen Fabriken, sondern im eigenen Alltag zu Hause und auf dem Schulweg. Wenn jeder Mensch kleine Schritte geht, erreichen wir gemeinsam große Veränderungen für die Natur.\n\nErstens sollten wir beim Einkaufen immer wiederverwendbare Stofftaschen mitnehmen, weil Plastiktüten unsere Böden und Flüsse stark belasten. Zweitens spart das Schließen des Wasserhahns beim Waschen jeden Tag viele Liter Trinkwasser. Auf kurzen Wegen ist das Gehen zu Fuß oder die Fahrt mit dem Fahrrad nicht nur umweltfreundlicher, sondern auch am gesündesten für den Körper.\n\nZusammenfassend lässt sich sagen, dass Sauberkeit, Mülltrennung und Sparsamkeit die besten Mittel für eine lebenswerte Zukunft sind.',
					rubricSummary:
						'Alltagsnahe Beispiele und klare Gliederung (2.0 Pkt.) / Korrekte Nebensätze und Komparativ/Superlativ (2.0 Pkt.) / Wortbildung und Rechtschreibung (2.0 Pkt.)',
					clozeSentence: '___ wir im Alltag konsequent Wasser sparen, sichern wir die Vorräte für die Zukunft.',
					clozeCorrect: 'Wenn',
					clozeDistractors: ['Dass', 'Denn', 'Als'],
					clozeExplanation:
						'أداة الشرط في الحاضر أو المستقبل هي «Wenn» ويتبعها الفعل المصرف في نهاية الطرف الأول ثم قلب في الطرف الثاني.'
				}
			];

			const v = rng.pick(variants);
			const clozeOptions = rng.shuffle([v.clozeCorrect, ...v.clozeDistractors]);
			const clozeCorrectIndex = clozeOptions.indexOf(v.clozeCorrect);

			const block = buildGermanWrittenProductionBlock({
				themaEinsTitle: 'Thema 1 (Gelenkt) :',
				themaEinsPrompt: v.themaEinsPrompt,
				themaEinsStichpunkte: v.themaEinsStichpunkte,
				themaZweiPrompt: v.themaZweiPrompt,
				modelAnswer: v.modelAnswer,
				rubricSummary: v.rubricSummary,
				mark: '6'
			});

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'cloze',
					questionText: 'Vervollständigen Sie den Satz aus dem Umweltaufsatz mit der richtigen Form:',
					questionTextAr: 'أكمل الجملة البيئية بالصيغة النحوية الصحيحة:',
					questionData: {
						sentence: v.clozeSentence,
						options: clozeOptions,
						correctIndex: clozeCorrectIndex
					},
					explanation: v.clozeExplanation
				},
				sujetExercise: {
					customTitle: 'III. Schriftlicher Ausdruck',
					points: 6,
					instruction: 'Wählen Sie EINES der beiden Themen und schreiben Sie einen zusammenhängenden Text (110 bis 135 Wörter) :',
					content: [block]
				},
				hints: [
					'في الرسالة الرسمية إلى المدير استعمل ضمير الاحترام Sie والفعل المرافق مع تحية مناسبة.',
					'ادمج روابط التبعية (weil, da, dass, wenn) مع مراعاة إرسال الفعل المصرف لنهاية الجملة.',
					'وظف المفردات البيئية المشتقة (-ung, -keit, -heit) وتجنب الأخطاء الإملائية في الأسماء.'
				],
				solutionStepsAr: [
					'احترام نوع النص (نداء / رسالة رسمية / مقال) واستيفاء المعطيات (2.0 نقطة).',
					'دقة الجمل الجانبية والمقارنات والمخاطبة الرسمية (2.0 نقطة).',
					'جودة المعجم البيئي وسلامة الترقيم والتهجئة (2.0 نقطة).'
				],
				finalAnswer: v.clozeCorrect
			};
		}
	}
];
