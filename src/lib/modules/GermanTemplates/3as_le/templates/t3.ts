import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildGermanClassificationTableBlock,
	buildGermanPassageBlock,
	buildGermanWordFamilyTableBlock,
	buildGermanWrittenProductionBlock
} from '../../german-helpers';
import {
	saveGermanSvgAsset,
	svgGermanTenseTimeline,
	svgGermanWritingBlueprint
} from '../../svg-german';
import type {
	Difficulty,
	GermanGeneratedExerciseInstance,
	GermanParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';

interface McqSpec {
	q: string;
	correct: string;
	wrong: [string, string, string];
	explanation: string;
}

interface TfSpec {
	q: string;
	correctAnswer: boolean;
	explanation: string;
}

interface MatchingSpec {
	q: string;
	pairs: Array<{ left: string; right: string }>;
	explanation: string;
}

interface ClozeSpec {
	q: string;
	sentence: string;
	correct: string;
	distractors: [string, string, string];
	explanation: string;
}

interface DragDropSpec {
	q: string;
	categories: [string, string];
	items: Array<{ text: string; category: 0 | 1 }>;
	explanation: string;
}

interface OrderingSpec {
	q: string;
	orderedItems: [string, string, string, string];
	explanation: string;
}

function buildMcqPayload(
	spec: McqSpec,
	questionTextAr: string,
	feedbackWrong: string,
	rng: SeededRng
): { quizQuestion: QuizQuestionPayload; finalAnswer: string } {
	const mcq = buildUniqueMcqOptions(
		spec.correct,
		spec.wrong.map((w) => ({ text: w, diagnosticFeedback: feedbackWrong })),
		rng
	);
	return {
		finalAnswer: spec.correct,
		quizQuestion: {
			type: 'mcq',
			questionText: spec.q,
			questionTextAr,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: spec.explanation
		}
	};
}

function buildTfPayload(spec: TfSpec): { quizQuestion: QuizQuestionPayload; finalAnswer: string } {
	return {
		finalAnswer: spec.correctAnswer ? 'Richtig' : 'Falsch',
		quizQuestion: {
			type: 'true_false',
			questionText: spec.q,
			questionTextAr: `صحيح أم خطأ حسب النص والمحور: ${spec.q}`,
			questionData: {
				correctAnswer: spec.correctAnswer
			},
			explanation: spec.explanation
		}
	};
}

function buildMatchingPayload(
	spec: MatchingSpec,
	rng: SeededRng
): { quizQuestion: QuizQuestionPayload; finalAnswer: string } {
	const pairs = rng.shuffle(spec.pairs);
	return {
		finalAnswer: pairs.map((p) => `${p.left} = ${p.right}`).join(' | '),
		quizQuestion: {
			type: 'matching',
			questionText: spec.q,
			questionTextAr: `اربط كل عنصر في اليسار بما يناسبه في اليمين: ${spec.q}`,
			questionData: { pairs },
			explanation: spec.explanation
		}
	};
}

function buildClozePayload(
	spec: ClozeSpec,
	rng: SeededRng
): { quizQuestion: QuizQuestionPayload; finalAnswer: string } {
	const distractors = spec.distractors.filter((d) => d !== spec.correct).slice(0, 3);
	const options = rng.shuffle([spec.correct, ...distractors]);
	const correctIndex = options.indexOf(spec.correct);
	return {
		finalAnswer: spec.correct,
		quizQuestion: {
			type: 'cloze',
			questionText: spec.q,
			questionTextAr: `أكمل الفراغ بالصيغة الألمانية الدقيقة: ${spec.q}`,
			questionData: {
				sentence: spec.sentence,
				options,
				correctIndex
			},
			explanation: spec.explanation
		}
	};
}

function buildDragDropPayload(
	spec: DragDropSpec,
	rng: SeededRng
): { quizQuestion: QuizQuestionPayload; finalAnswer: string } {
	const items = rng.shuffle(spec.items);
	return {
		finalAnswer: spec.items.map((it) => `${it.text} (${spec.categories[it.category]})`).join(' | '),
		quizQuestion: {
			type: 'drag_drop',
			questionText: spec.q,
			questionTextAr: `صنّف العبارات الآتية في الخانة المناسبة: ${spec.q}`,
			questionData: {
				categories: spec.categories,
				items
			},
			explanation: spec.explanation
		}
	};
}

function buildOrderingPayload(
	spec: OrderingSpec,
	rng: SeededRng
): { quizQuestion: QuizQuestionPayload; finalAnswer: string } {
	const shuffled = rng.shuffle(spec.orderedItems);
	if (shuffled.length > 1 && shuffled.every((x, i) => x === spec.orderedItems[i])) {
		[shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
	}
	const correctOrder = spec.orderedItems.map((item) => shuffled.indexOf(item));
	return {
		finalAnswer: spec.orderedItems.join(' | '),
		quizQuestion: {
			type: 'ordering',
			questionText: spec.q,
			questionTextAr: `رتّب مراحل التحرير أو الأفكار ترتيباً منهجياً من الأول إلى الأخير: ${spec.q}`,
			questionData: {
				items: shuffled,
				correctOrder
			},
			explanation: spec.explanation
		}
	};
}

/**
 * 3AS BAC Foreign Languages (لغات أجنبية — yearSubjectId: 794, coeff 4, 03h00, 7+7+6=20)
 * Parameterized Exam & Quiz Templates — Trimester 3 : Arbeitswelt, Bildung, Konjunktiv II & BAC-Training (6 templates)
 */
export const TEMPLATES_3AS_LE_T3: GermanParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPREHENSION (7 Pkt.): Arbeitswelt, Berufsausbildung & Unternehmertum
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_tpl_3as_le_t3_comp_arbeitswelt_zukunft',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'textverstaendnis',
		titleAr: 'فهم النص (7 نقاط — بكالوريا): عالم الشغل، التكوين المهني وريادة المشاريع الشبابية',
		curriculumLessonId: 'ger_lesson_3as_le_t3_arbeitswelt_unternehmertum',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Junge Gründerinnen und Gründer: Eigeninitiative und Solidarität',
					source: 'Nach einer Reportage über jugendliche Projektinitiativen in Nordafrika',
					paragraphs: [
						'Immer mehr Absolventinnen und Absolventen warten nach dem Abschluss nicht mehr passiv auf eine ausgeschriebene Stelle, sondern entwickeln eigene wirtschaftliche Ideen. Ob Wartungsservice für Solaranlagen, nachhaltige Landwirtschaft oder ein Fachbüro für Übersetzungen: Kluge [[Eigeninitiative]] beginnt stets mit einem echten Bedarf in der eigenen Region.',
						'Da ein einzelner Berufseinsteiger selten über genügend Kapital und alle nötigen Erfahrungen verfügt, schließen sich junge Fachkräfte häufig zu kleinen Genossenschaften zusammen. Auf diese Weise teilen sie Kosten für Werkzeuge und Räume, beraten sich gegenseitig und überwinden erste Schwierigkeiten mit [[solidarischem Teamgeist]].',
						'Wirtschaftsfachleute betonen jedoch, dass Begeisterung allein nicht reicht: Dauerhafter Erfolg verlangt eine ehrliche Kalkulation, Pünktlichkeit und verlässliche Qualität für jede Kundin und jeden Kunden.'
					],
					glossary: [
						{ term: 'Genossenschaft', meaning: 'gemeinsamer Betrieb mehrerer gleichberechtigter Partner' },
						{ term: 'Kalkulation', meaning: 'sorgfältige Berechnung von Kosten und Einnahmen' }
					],
					mainIdeaHeader: '1. Welche Aussage fasst den Inhalt des Textes treffend zusammen?',
					mainIdeaOptions: [
						'Junge Menschen gründen solidarisch eigene Betriebe, brauchen dafür aber Planung und Zuverlässigkeit',
						'Absolventen sollten alle Werkzeuge allein ohne Teamarbeit kaufen',
						'Begeisterung allein garantiert wirtschaftlichen Erfolg ohne Finanzplan'
					],
					mainIdeaCorrect:
						'Junge Menschen gründen solidarisch eigene Betriebe, brauchen dafür aber Planung und Zuverlässigkeit',
					tfItems: [
						{
							q: 'Erfolgreiche Eigeninitiative orientiert sich laut Absatz 1 an einem echten regionalen Bedarf.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Junge Berufseinsteiger meiden Genossenschaften, weil sie Kosten nicht teilen möchten.',
							a: 'Falsch',
							c: 'Sie schließen sich häufig zu kleinen Genossenschaften zusammen, um Kosten zu teilen und sich gegenseitig zu beraten (§2).',
							mark: '0.5'
						},
						{
							q: 'Durch Zusammenarbeit im Team lassen sich Anfangsschwierigkeiten leichter überwinden.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Nach Ansicht von Wirtschaftsfachleuten sind Kalkulation und Pünktlichkeit nebensächlich.',
							a: 'Falsch',
							c: 'Dauerhafter Erfolg verlangt eine ehrliche Kalkulation, Pünktlichkeit und verlässliche Qualität (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Welche drei konkreten Gründungsfelder nennt Absatz 1 als Beispiele?',
							a: 'Wartungsservice für Solaranlagen, nachhaltige Landwirtschaft und ein Fachbüro für Übersetzungen.',
							mark: '0.75'
						},
						{
							q: 'b) Warum entscheiden sich viele junge Fachkräfte für eine Genossenschaft (§2)?',
							a: 'Weil sie allein selten über genug Kapital und Erfahrung verfügen; gemeinsam teilen sie Kosten für Werkzeuge und Räume und beraten sich gegenseitig.',
							mark: '1'
						},
						{
							q: 'c) Welche drei Bedingungen nennen Wirtschaftsfachleute für dauerhaften Erfolg (§3)?',
							a: 'Ehrliche Kalkulation, Pünktlichkeit und verlässliche Qualität.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) Eigeninitiative (§1 : Erklärung im Kontext)   b) solidarischem Teamgeist (§2 : Was drückt dieser Ausdruck aus?)',
					refAnswer:
						'a) „Eigeninitiative“ bedeutet die selbstständige Bereitschaft junger Menschen, eigene Projekte zu planen und Probleme aktiv zu lösen.   b) „solidarischem Teamgeist“ beschreibt das faire, hilfsbereite Miteinander innerhalb einer Gruppe zum gemeinsamen Erfolg.',
					synthPrompt:
						'Könnten Sie sich vorstellen, nach dem Studium gemeinsam mit Studienfreundinnen oder -freunden ein eigenes Projekt aufzubauen? Begründen Sie in 4 bis 5 Sätzen.',
					synthAnswer:
						'Ja, ich halte ein gemeinsames Projekt nach dem Studium für sehr sinnvoll, besonders in den Bereichen Übersetzung, Sprachunterricht oder Umweltberatung. Durch eine faire Aufgabenverteilung bringt jedes Teammitglied seine besonderen Stärken ein. Entscheidend wären für mich jedoch klare Regeln, Verlässlichkeit und ein solider Finanzplan vor dem Start.',
					quizzes: {
						easy: {
							q: 'Womit beginnt laut Absatz 1 eine sinnvolle berufliche Eigeninitiative?',
							correct: 'Mit dem Blick auf einen echten Bedarf in der eigenen Region',
							wrong: [
								'Mit jahrelangem passivem Abwarten ohne Plan',
								'Mit dem Verzicht auf jede Fachkenntnis',
								'Mit sofortigen hohen Schulden ohne Berechnung'
							],
							explanation: 'تذكر الفقرة الأولى أن المبادرة الذكية تبدأ برصد حاجة حقيقية في المحيط المحلي.'
						} as McqSpec,
						medium: {
							q: 'Welchen Vorteil haben Genossenschaften für junge Absolventen gemäß Absatz 2?',
							correct: 'Sie ermöglichen es, Kosten für Werkzeuge zu teilen und Erfahrungen auszutauschen',
							wrong: [
								'Sie verbieten jedes Gespräch zwischen den Partnern',
								'Sie machen Pünktlichkeit und Qualität überflüssig',
								'Sie schließen praktische Berufe völlig aus'
							],
							explanation: 'توضح الفقرة الثانية أن التعاونيات تخفف الأعباء المالية وتتيح المشورة المتبادلة.'
						} as McqSpec,
						hard: {
							q: 'Welche Einschränkung formulieren Wirtschaftsfachleute im Schlussabsatz (§3)?',
							correct: 'Begeisterung allein trägt keinen Betrieb ohne solide Kalkulation, Pünktlichkeit und Qualität',
							wrong: [
								'Junge Fachkräfte dürften niemals eigene Ideen umsetzen',
								'Kundenzufriedenheit spiele keine wirtschaftliche Rolle',
								'Übersetzungen und Landwirtschaft hätten keine Zukunft'
							],
							explanation: 'تنبه الخاتمة إلى أن الحماس وحده لا يكفي دون حساب مالي دقيق وانضباط وجودة.'
						} as McqSpec
					}
				},
				{
					title: 'Handwerk, Technik und grüne Berufe im Wandel',
					source: 'Nach einer Studie über Berufsorientierung für Jugendliche',
					paragraphs: [
						'Lange Zeit galt für viele Familien allein ein klassisches Universitätsstudium als erstrebenswert, während handwerkliche und technische Berufe unterschätzt wurden. Heute zeigt die Praxis jedoch ein anderes Bild: Qualifizierte Elektriker, Kältetechniker, Schreiner und Solarmonteure werden dringend gesucht und sichern [[unverzichtbare Leistungen]] des Alltags.',
						'Gleichzeitig haben sich diese Tätigkeiten stark modernisiert. Wer heute eine Heizungs- oder Bewässerungsanlage installiert, liest digitale Schaltpläne, prüft Sensoren und achtet auf geringen Energieverbrauch. Dadurch entstehen zahlreiche [[grüne Berufe]], in denen handwerkliches Geschick direkt zum Umweltschutz beiträgt.',
						'Entscheidend für jede Berufswahl bleibt deshalb nicht gesellschaftliches Vorurteil, sondern die ehrliche Prüfung der eigenen Neigungen, verbunden mit der Bereitschaft zu sorgfältiger Ausbildung und Weiterbildung.'
					],
					glossary: [
						{ term: 'erstrebenswert', meaning: 'etwas, das man besonders zu erreichen wünscht' },
						{ term: 'Schaltplan', meaning: 'technische Zeichnung der elektrischen Verbindungen einer Anlage' }
					],
					mainIdeaHeader: '1. Wofür plädiert der Autor in diesem Artikel?',
					mainIdeaOptions: [
						'Für die höhere Wertschätzung moderner technischer und handwerklicher Berufe nach eigener Eignung',
						'Für die Abschaffung jeder praktischen Berufsausbildung',
						'Gegen die Nutzung moderner Messgeräte und Schaltpläne im Handwerk'
					],
					mainIdeaCorrect:
						'Für die höhere Wertschätzung moderner technischer und handwerklicher Berufe nach eigener Eignung',
					tfItems: [
						{
							q: 'Früher wurden handwerkliche Berufe im Vergleich zum Studium häufig unterschätzt.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Moderne Handwerker kommen heute völlig ohne digitale Schaltpläne und Energiekenntnisse aus.',
							a: 'Falsch',
							c: 'Sie lesen digitale Schaltpläne, prüfen Sensoren und achten auf geringen Energieverbrauch (§2).',
							mark: '0.5'
						},
						{
							q: 'Durch umweltfreundliche Technik entstehen neue grüne Berufe.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Bei der Berufswahl sollte man sich vor allem nach Vorurteilen statt nach eigenen Neigungen richten.',
							a: 'Falsch',
							c: 'Entscheidend sind nicht Vorurteile, sondern die Prüfung eigener Neigungen sowie Ausbildung und Weiterbildung (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Wie hat sich die Bedeutung handwerklicher Berufe laut Absatz 1 gewandelt?',
							a: 'Während sie früher oft unterschätzt wurden, sind qualifizierte Fachkräfte heute dringend gesucht und leisten im Alltag Unverzichtbares.',
							mark: '0.75'
						},
						{
							q: 'b) Warum erfordert modernes Handwerk heute technisches Wissen (§2)?',
							a: 'Weil Fachkräfte digitale Schaltpläne lesen, Sensoren prüfen und auf energiesparende, umweltfreundliche Anlagen achten müssen.',
							mark: '1'
						},
						{
							q: 'c) Welche Kriterien sollten Jugendliche bei der Berufswahl anlegen (§3)?',
							a: 'Sie sollten ihre eigenen Neigungen ehrlich prüfen und zur gründlichen Ausbildung sowie Weiterbildung bereit sein.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) unverzichtbare Leistungen (§1 : Bedeutung im Text)   b) grüne Berufe (§2 : Was ist damit gemeint?)',
					refAnswer:
						'a) „unverzichtbare Leistungen“ bezeichnet lebenswichtige alltägliche Arbeiten wie Strom-, Wasser-, Bau- und Solartechnik, ohne die Städte nicht funktionieren.   b) „grüne Berufe“ sind Tätigkeiten, die technisches Können mit Klima-, Wasser- und Energieschutz verbinden.',
					synthPrompt:
						'Warum verdient ein geschickter Handwerker oder Techniker im Alltag denselben Respekt wie ein Akademiker? Schreiben Sie 4 bis 5 Sätze.',
					synthAnswer:
						'Meines Erachtens hängt die Würde eines Berufs nicht vom akademischen Titel ab, sondern von der Nützlichkeit und Sorgfalt der geleisteten Arbeit. Ein erfahrener Techniker löst reale Probleme in Schulen, Krankenhäusern und Haushalten. Ohne das Zusammenspiel von Handwerk, Technik und Wissenschaft könnte keine Gesellschaft funktionieren.',
					quizzes: {
						easy: {
							q: 'Welche Aussage über moderne Handwerker trifft laut Absatz 2 zu?',
							correct: 'Sie nutzen digitale Schaltpläne, Sensoren und achten auf Energieeinsparung',
							wrong: [
								'Sie lehnen jede technische Erneuerung grundsätzlich ab',
								'Sie arbeiten ausschließlich ohne Ausbildung',
								'Sie haben keinerlei Einfluss auf den Umweltschutz'
							],
							explanation: 'تبرز الفقرة الثانية تطور الحرفيين التقنيين واعتمادهم على المخططات الرقمية وكفاءة الطاقة.'
						} as McqSpec,
						medium: {
							q: 'Was versteht der Text in Absatz 2 unter „grünen Berufen“?',
							correct: 'Berufe, in denen handwerkliches und technisches Können direkt dem Umweltschutz dient',
							wrong: [
								'Berufe, die nur grüne Schreibstifte verwenden',
								'Tätigkeiten ohne jede berufliche Qualifikation',
								'Büroarbeit ganz ohne Praxisbezug'
							],
							explanation: 'المهن الخضراء تجمع بين المهارة التقنية والحفاظ على الماء والطاقة والبيئة.'
						} as McqSpec,
						hard: {
							q: 'Welchen Rat gibt der Autor im letzten Absatz zur persönlichen Berufswahl?',
							correct: 'Vorurteile ablegen, eigene Neigungen prüfen und lebenslang weiterlernen',
							wrong: [
								'Immer den Beruf wählen, der die wenigste Übung erfordert',
								'Nach Abschluss der Schule nie wieder dazuzulernen',
								'Eigene Talente bei der Entscheidung ignorieren'
							],
							explanation: 'توصي الفقرة الثالثة بتجاوز الأحكام المسبقة ومراجعة الميول مع الالتزام بالتكوين المستمر.'
						} as McqSpec
					}
				},
				{
					title: 'Zuverlässigkeit und Weiterbildung: Schlüssel in der modernen Arbeitswelt',
					source: 'Nach einer Übersicht der Berufsberatung für Abschlussklassen',
					paragraphs: [
						'Wer ein Vorstellungsgespräch führt oder ein Praktikum beginnt, merkt schnell, dass Schulnoten zwar Türen öffnen, aber keineswegs alles entscheiden. Personalverantwortliche achten ebenso auf [[soziale Kompetenzen]] wie Pünktlichkeit, höflichen Umgang im Team und die Bereitschaft, Verantwortung für eigene Fehler zu übernehmen.',
						'Darüber hinaus verändert der technische Fortschritt zahlreiche Arbeitsabläufe innerhalb weniger Jahre. Programme, Normen und Fremdsprachenanforderungen entwickeln sich weiter, sodass berufliche Qualifikation kein abgeschlossener Zustand mehr ist. Wer durch Kurse, Fachlektüre oder betriebliche Schulungen regelmäßig dazulernt, sichert sich [[dauerhafte Anpassungsfähigkeit]].',
						'So wird deutlich, dass fachliches Können, moralische Redlichkeit und lebenslanges Lernen gemeinsam das Fundament eines erfüllten Berufslebens bilden.'
					],
					glossary: [
						{ term: 'Personalverantwortliche', meaning: 'Personen im Betrieb, die neue Mitarbeiter auswählen und betreuen' },
						{ term: 'Normen', meaning: 'verbindliche fachliche Standards und Qualitätsregeln' }
					],
					mainIdeaHeader: '1. Welche Kernaussage vermittelt der vorliegende Text?',
					mainIdeaOptions: [
						'Neben Fachwissen entscheiden Zuverlässigkeit, Teamgeist und lebenslange Weiterbildung über beruflichen Erfolg',
						'Nach dem Schulabschluss sollte man auf jedes weitere Lernen verzichten',
						'Schulnoten garantieren lebenslange Beschäftigung ohne Teamfähigkeit'
					],
					mainIdeaCorrect:
						'Neben Fachwissen entscheiden Zuverlässigkeit, Teamgeist und lebenslange Weiterbildung über beruflichen Erfolg',
					tfItems: [
						{
							q: 'Bei einem Praktikum oder Vorstellungsgespräch zählen ausschließlich Schulnoten und nichts sonst.',
							a: 'Falsch',
							c: 'Personalverantwortliche achten ebenso auf soziale Kompetenzen wie Pünktlichkeit, Höflichkeit und Verantwortungsbewusstsein (§1).',
							mark: '0.5'
						},
						{
							q: 'Zuverlässigkeit und ein respektvoller Umgang im Team spielen im Betrieb eine wichtige Rolle.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Durch den schnellen technischen Wandel ist einmal erworbenes Wissen für immer ausreichend.',
							a: 'Falsch',
							c: 'Programme, Normen und Anforderungen entwickeln sich weiter, sodass regelmäßige Weiterbildung nötig bleibt (§2).',
							mark: '0.5'
						},
						{
							q: 'Fachkönnen, Redlichkeit und lebenslanges Lernen bilden zusammen die Grundlage eines guten Berufslebens.',
							a: 'Richtig',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Welche drei sozialen Kompetenzen erwarten Betriebe laut Absatz 1 von jungen Bewerbern?',
							a: 'Pünktlichkeit, höflichen Umgang im Team und die Bereitschaft, Verantwortung für eigene Fehler zu übernehmen.',
							mark: '0.75'
						},
						{
							q: 'b) Warum genügt eine einmal abgeschlossene Ausbildung heute oft nicht mehr (§2)?',
							a: 'Weil sich Programme, fachliche Normen und Sprachanforderungen durch den technischen Fortschritt rasch verändern.',
							mark: '1'
						},
						{
							q: 'c) Auf welchen drei Wegen kann man sich im Beruf weiterbilden (§2)?',
							a: 'Durch Kurse, Fachlektüre und betriebliche Schulungen.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) soziale Kompetenzen (§1 : Beispiele aus dem Text)   b) dauerhafte Anpassungsfähigkeit (§2 : Bedeutung im Zusammenhang)',
					refAnswer:
						'a) „soziale Kompetenzen“ umfasst hier Pünktlichkeit, respektvolles Miteinander im Team und ehrliche Fehlerverantwortung.   b) „dauerhafte Anpassungsfähigkeit“ meint die Fähigkeit, dank Weiterbildung auf neue Technologien und Berufsaufgaben sicher zu reagieren.',
					synthPrompt:
						'Welche Ihrer persönlichen Eigenschaften möchten Sie noch vor dem Einstieg ins Studium oder Berufsleben besonders stärken? Antworten Sie in 4 bis 5 Sätzen.',
					synthAnswer:
						'Vor meinem Studium möchte ich vor allem mein Zeitmanagement und die selbstständige Arbeit mit Fachliteratur weiter stärken. Außerdem lege ich großen Wert darauf, im Team geduldig zuzuhören und Aufgaben stets zuverlässig zum vereinbarten Termin abzugeben. Wer früh Disziplin und Sorgfalt übt, meistert spätere Herausforderungen viel gelassener.',
					quizzes: {
						easy: {
							q: 'Worauf achten Betriebe laut Absatz 1 neben den Schulnoten besonders?',
							correct: 'Auf Pünktlichkeit, Höflichkeit im Team und Fehlerverantwortung',
							wrong: [
								'Auf das absichtliche Zuspätkommen',
								'Auf das Vermeiden jeder Zusammenarbeit',
								'Auf das Verschweigen von Fehlern'
							],
							explanation: 'تذكر الفقرة الأولى الالتزام بالوقت، الأدب في الفريق، وتحمل مسؤولية الأخطاء.'
						} as McqSpec,
						medium: {
							q: 'Warum spricht Absatz 2 davon, dass Qualifikation „kein abgeschlossener Zustand“ sei?',
							correct: 'Weil technische Abläufe, Normen und Sprachanforderungen ständige Weiterbildung verlangen',
							wrong: [
								'Weil niemand jemals eine Prüfung bestehen kann',
								'Weil Fachbücher verboten werden',
								'Weil Betriebe keine erfahrenen Fachkräfte brauchen'
							],
							explanation: 'توضح الفقرة الثانية ضرورة التكوين المستمر لمواكبة تغير المعايير والتقنيات.'
						} as McqSpec,
						hard: {
							q: 'Welche drei Pfeiler bilden laut Absatz 3 das Fundament des Berufslebens?',
							correct: 'Fachliches Können, moralische Redlichkeit und lebenslanges Lernen',
							wrong: [
								'Reiner Zufall, Übermut und Ungeduld',
								'Ausschließlich theoretische Titel ohne Praxis',
								'Isolierte Arbeit ohne Team und Kommunikation'
							],
							explanation: 'تجمع الخاتمة بين الكفاءة المهنية، الأمانة الأخلاقية، والتعلم مدى الحياة.'
						} as McqSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const spec = chosen.quizzes[difficulty];
			const { quizQuestion, finalAnswer } = buildMcqPayload(
				spec,
				`فهم النص BAC 3AS LE («${chosen.title}»): اختر الإجابة الدقيقة`,
				'عد إلى الفقرة المشار إليها وتحقق من التفاصيل المهنية والأخلاقية المذكورة.',
				rng
			);

			const openAnswer = chosen.openQuestions.map((x) => `${x.q.slice(0, 2)} ${x.a}`).join('\n\n');

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Textverständnis',
				points: 7,
				instruction: 'Lesen Sie den Text aufmerksam und bearbeiten Sie alle Fragen (7 Punkte — BAC 3AS LE) :',
				content: [
					buildGermanPassageBlock({
						title: chosen.title,
						paragraphs: chosen.paragraphs,
						source: chosen.source,
						numberedParagraphs: true,
						glossary: chosen.glossary
					}),
					{
						type: 'multiple_choice',
						groups: [
							{
								header: chosen.mainIdeaHeader,
								options: chosen.mainIdeaOptions,
								correct: chosen.mainIdeaCorrect,
								mark: '0.5'
							}
						]
					},
					{
						type: 'true_false',
						items: chosen.tfItems
					},
					{
						type: 'text',
						content: `3. Beantworten Sie die folgenden Fragen in ganzen Sätzen :\n\n${chosen.openQuestions.map((x) => x.q).join('\n\n')}`,
						answer: openAnswer,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `4. Bestimmen Sie Bedeutung und Textbezug der hervorgehobenen Wendungen :\n\n${chosen.refPrompt}`,
						answer: chosen.refAnswer,
						mark: '1'
					},
					{
						type: 'text',
						content: `5. Persönliche Stellungnahme : ${chosen.synthPrompt}`,
						answer: chosen.synthAnswer,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't3',
				difficulty,
				domain: 'textverstaendnis',
				examRole: 'comprehension',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تأمل أسباب نجاح المشاريع الشبابية المذكورة في النص (التخطيط، الأمانة، العمل التعاوني، التكوين المستمر).',
					'في أسئلة Falsch، اقتبس الفكرة الصحيحة أو أعد صياغتها مع الإشارة لرقم الفقرة.',
					'اكتب 4 إلى 5 جمل منظمة ومتماسكة في سؤال الرأي الشخصي.'
				],
				solutionStepsAr: [
					'تحديد الفكرة العامة الصحيحة (0.5 نقطة).',
					'الحكم والتبرير النصي في الصواب والخطأ (2 نقطتان).',
					'الإجابة الدقيقة عن الأسئلة الثلاثة (2.5 نقطة).',
					'بيان الإحالات النصية وكتابة الموقف الشخصي (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. COMPREHENSION (7 Pkt.): Mehrsprachigkeit, Schulbibliothek & Studienkompetenz
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_tpl_3as_le_t3_comp_bildung_mehrsprachigkeit',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'textverstaendnis',
		titleAr: 'فهم النص (7 نقاط — بكالوريا): تعدد اللغات، المكتبة المدرسية وكفاءة التعليم الجامعي',
		curriculumLessonId: 'ger_lesson_3as_le_t3_bildung_sprachen_zukunft',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Mehrsprachigkeit als Brücke: Warum Fremdsprachen die Muttersprache stärken',
					source: 'Nach einem sprachdidaktischen Essay über den Zweig Fremdsprachen',
					paragraphs: [
						'Jedes Jahr entscheiden sich zahlreiche Schülerinnen und Schüler für den Zweig Fremdsprachen, um neben Arabisch und Französisch auch Englisch, Deutsch oder Spanisch gründlich zu erlernen. Manche Beobachter befürchten zwar, das parallele Lernen mehrerer Sprachen könne [[die eigene Muttersprache]] verdrängen, doch die Sprachwissenschaft zeigt genau das Gegenteil.',
						'Wer etwa einen deutschen Fachtext ins Arabische übersetzen möchte, muss zunächst den genauen Bau seiner Muttersprache und die feinen Unterschiede einzelner Wörter kennen. Durch [[diesen bewussten Vergleich]] erkennt der Lernende grammatische Strukturen klarer, formuliert präziser und vermeidet unklare Aussagen.',
						'So bildet gelebte Mehrsprachigkeit keinen Verlust kultureller Identität, sondern eine geistige Bereicherung, die junge Menschen auf Übersetzung, Lehre und internationalen wissenschaftlichen Austausch vorbereitet.'
					],
					glossary: [
						{ term: 'verdrängen', meaning: 'etwas langsam aus seinem Platz wegdrücken' },
						{ term: 'präzise', meaning: 'sehr genau, klar und eindeutig' }
					],
					mainIdeaHeader: '1. Welche Hauptthese verteidigt der Autor in diesem Text?',
					mainIdeaOptions: [
						'Das Erlernen von Fremdsprachen vertieft das Bewusstsein für die Muttersprache und bereichert die Bildung',
						'Fremdsprachenunterricht zerstört die grammatische Sicherheit in der Muttersprache',
						'Für gute Übersetzungen genügt oberflächliches Auswendiglernen ohne Sprachvergleich'
					],
					mainIdeaCorrect:
						'Das Erlernen von Fremdsprachen vertieft das Bewusstsein für die Muttersprache und bereichert die Bildung',
					tfItems: [
						{
							q: 'Einige Beobachter äußern die Sorge, mehrere Fremdsprachen könnten die Muttersprache schwächen.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Die Sprachwissenschaft bestätigt, dass Fremdsprachen die eigene Muttersprache unbrauchbar machen.',
							a: 'Falsch',
							c: 'Die Sprachwissenschaft zeigt genau das Gegenteil: Der Vergleich schärft den Blick für die Muttersprache (§1–§2).',
							mark: '0.5'
						},
						{
							q: 'Für eine genaue Übersetzung aus dem Deutschen ins Arabische braucht man solide Kenntnisse in beiden Sprachen.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Laut Absatz 3 schadet Mehrsprachigkeit der kulturellen Identität.',
							a: 'Falsch',
							c: 'Sie bildet keinen Verlust kultureller Identität, sondern eine geistige Bereicherung (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Welche Befürchtung einiger Beobachter nennt Absatz 1 und wie reagiert die Sprachwissenschaft darauf?',
							a: 'Sie befürchten eine Verdrängung der Muttersprache; die Sprachwissenschaft beweist jedoch genau das Gegenteil.',
							mark: '0.75'
						},
						{
							q: 'b) Warum verbessert das Übersetzen vom Deutschen ins Arabische die sprachliche Präzision (§2)?',
							a: 'Weil man dabei den genauen Bau und feine Wortunterschiede der eigenen Muttersprache kennen muss und Strukturen bewusster vergleicht.',
							mark: '1'
						},
						{
							q: 'c) Auf welche drei Tätigkeitsfelder bereitet Mehrsprachigkeit laut Absatz 3 besonders vor?',
							a: 'Auf Übersetzung, Lehre und internationalen wissenschaftlichen Austausch.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) die eigene Muttersprache (§1 : Welchen Status hat sie laut Text?)   b) diesen bewussten Vergleich (§2 : Worauf bezieht sich das?)',
					refAnswer:
						'a) „die eigene Muttersprache“ bezeichnet die Ausgangssprache (hier Arabisch), deren Kenntnis durch Sprachvergleich sogar gestärkt wird.   b) „diesen bewussten Vergleich“ verweist auf das genaue Gegenüberstellen von Bau und Wortschatz zweier Sprachen beim Übersetzen.',
					synthPrompt:
						'Welche Vorteile sehen Sie persönlich darin, im Zweig Fremdsprachen mehrere Sprachen parallel zu lernen? Schreiben Sie 4 bis 5 Sätze.',
					synthAnswer:
						'Das parallele Lernen mehrerer Sprachen trainiert das Gedächtnis und macht grammatische Zusammenhänge sichtbar. Wer Deutsch, Französisch, Englisch und Arabisch miteinander vergleicht, erkennt leichter Wortfamilien, Satzstrukturen und kulturelle Feinheiten. Dadurch verbessert sich nicht nur das Textverständnis, sondern auch die eigene Ausdrucksfähigkeit in Aufsätzen.',
					quizzes: {
						easy: {
							q: 'Die Sprachwissenschaft bestätigt laut Text die Sorge, dass Fremdsprachen die Muttersprache verdrängen.',
							correctAnswer: false,
							explanation: 'خطأ: يؤكد النص أن علم اللغة يثبت العكس، فالمقارنة اللغوية تقوّي التمكن من اللغة الأم.'
						} as TfSpec,
						medium: {
							q: 'Laut Absatz 2 setzt eine genaue Übersetzung ins Arabische voraus, dass man die eigenen sprachlichen Strukturen sicher beherrscht.',
							correctAnswer: true,
							explanation: 'صحيح: الترجمة الدقيقة تتطلب فهماً عميقاً لبنية اللغة الأم وفروق ألفاظها.'
						} as TfSpec,
						hard: {
							q: 'Am Ende des Textes (§3) wird Mehrsprachigkeit als Verlust der eigenen Identität bewertet.',
							correctAnswer: false,
							explanation: 'خطأ: تصف الخاتمة تعدد اللغات بأنه إثراء فكري يصون الهوية ويؤهل للترجمة والتعليم.'
						} as TfSpec
					}
				},
				{
					title: 'Die Schulbibliothek: Ort der Ruhe und des tiefgehenden Lesens',
					source: 'Nach einer Zeitschrift für Gymnasialpädagogik',
					paragraphs: [
						'Obwohl digitale Geräte rasche Antworten versprechen, bleibt eine gepflegte Schulbibliothek für Abschlussklassen unersetzlich. Während man am Bildschirm oft nur flüchtig über kurze Überschriften gleitet, lädt ein ganzes Buch im ruhigen Lesesaal zu [[tiefgehendem Lesen]] und gesammelter Aufmerksamkeit ein.',
						'Deutschlehrkräfte beobachten regelmäßig, dass Jugendliche, die häufig Sachbücher, Wörterbücher und längere Artikel in der Bibliothek nutzen, flüssiger schreiben, weniger Rechtschreibfehler machen und Argumente sicherer ordnen. Gründliches Lesen ist somit keine verlorene Zeit vor der Prüfung, sondern das beste Training für [[klaren Gedankenaufbau]].',
						'Deshalb lohnt es sich, Schulbibliotheken lebendig zu halten, aktuelle Fachwerke anzuschaffen und wöchentliche Lesekreise zur Textbesprechung einzurichten.'
					],
					glossary: [
						{ term: 'flüchtig', meaning: 'sehr schnell und oberflächlich, ohne Tiefgang' },
						{ term: 'Lesekreis', meaning: 'regelmäßiges Treffen von Lernenden zur Besprechung von Texten' }
					],
					mainIdeaHeader: '1. Was möchte der Autor mit diesem Beitrag verdeutlichen?',
					mainIdeaOptions: [
						'Dass die Schulbibliothek durch ruhiges, tiefes Lesen die Schreib- und Denkfähigkeit entscheidend stärkt',
						'Dass Wörterbücher und Fachwerke aus Gymnasien entfernt werden sollten',
						'Dass flüchtiges Überfliegen kurzer Überschriften völlig ausreicht'
					],
					mainIdeaCorrect:
						'Dass die Schulbibliothek durch ruhiges, tiefes Lesen die Schreib- und Denkfähigkeit entscheidend stärkt',
					tfItems: [
						{
							q: 'Im Gegensatz zum flüchtigen Lesen am Bildschirm fördert die Schulbibliothek konzentriertes, tiefes Lesen.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Schülerinnen und Schüler, die oft in der Bibliothek lesen, machen meist mehr Rechtschreibfehler.',
							a: 'Falsch',
							c: 'Sie schreiben flüssiger, machen weniger Rechtschreibfehler und ordnen Argumente sicherer (§2).',
							mark: '0.5'
						},
						{
							q: 'Gründliches Lesen gilt im Text als wirksames Training für einen klaren Gedankenaufbau.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Der Verfasser empfiehlt am Schluss, alle Lesekreise abzuschaffen.',
							a: 'Falsch',
							c: 'Er empfiehlt, Schulbibliotheken lebendig zu halten und wöchentliche Lesekreise einzurichten (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Welchen Unterschied beschreibt Absatz 1 zwischen dem Lesen auf Bildschirmen und einem Buch in der Bibliothek?',
							a: 'Auf Bildschirmen gleitet man oft flüchtig über kurze Überschriften, während ein Buch im ruhigen Lesesaal zu tiefem Lesen und Konzentration einlädt.',
							mark: '1'
						},
						{
							q: 'b) Nennen Sie drei konkrete Fortschritte, die Lehrkräfte bei fleißigen Bibliotheksbesuchern feststellen (§2).',
							a: 'Sie schreiben flüssiger, machen weniger Rechtschreibfehler und ordnen Argumente sicherer.',
							mark: '0.75'
						},
						{
							q: 'c) Welche Maßnahmen schlägt der Autor im letzten Absatz vor (§3)?',
							a: 'Schulbibliotheken lebendig halten, aktuelle Fachwerke anschaffen und wöchentliche Lesekreise gründen.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) tiefgehendem Lesen (§1 : Bedeutung laut Text)   b) klaren Gedankenaufbau (§2 : Erklärung im Kontext)',
					refAnswer:
						'a) „tiefgehendem Lesen“ bedeutet langsames, aufmerksames Lesen vollständiger Texte mit Verständnis für Argumente und Details.   b) „klaren Gedankenaufbau“ bezeichnet die Fähigkeit, eigene Ideen im Aufsatz logisch und geordnet darzustellen.',
					synthPrompt:
						'Wie ließe sich die Bibliothek Ihres Gymnasiums noch attraktiver für die Vorbereitung auf das Abitur gestalten? Antworten Sie in 4 bis 5 Sätzen.',
					synthAnswer:
						'Um die Schulbibliothek attraktiver zu machen, könnte man eine ruhige Leseecke speziell für Fremdsprachen mit zweisprachigen Wörterbüchern und Prüfungsheften einrichten. Außerdem wäre ein wöchentlicher Austauschkreis hilfreich, in dem Schülerinnen und Schüler gemeinsam deutsche Texte analysieren und Redemittel sammeln. So wird die Bibliothek zu einem lebendigen Lernort.',
					quizzes: {
						easy: {
							q: 'Laut Absatz 2 schreiben Jugendliche, die regelmäßig in der Bibliothek lesen, flüssiger und machen weniger Rechtschreibfehler.',
							correctAnswer: true,
							explanation: 'صحيح: ترصد الفقرة الثانية تحسن التعبير والإملاء وتنظيم الحجج لدى مرتادي المكتبة.'
						} as TfSpec,
						medium: {
							q: 'Der Autor bezeichnet gründliches Lesen in Absatz 2 als verlorene Zeit vor dem Abitur.',
							correctAnswer: false,
							explanation: 'خطأ: يؤكد الكاتب أنها ليست مضيعة للوقت بل أفضل تدريب لبناء الأفكار بوضوح.'
						} as TfSpec,
						hard: {
							q: 'Im Schlussabsatz (§3) empfiehlt der Text den Kauf aktueller Fachwerke sowie wöchentliche Lesekreise.',
							correctAnswer: true,
							explanation: 'صحيح: تختتم الفقرة الثالثة بتوصيتين عمليتين لإحياء المكتبة المدرسية.'
						} as TfSpec
					}
				},
				{
					title: 'Studienkompetenz: Vom Gymnasium sicher in die Universität',
					source: 'Nach einem Ratgeber für angehende Abiturientinnen und Abiturienten',
					paragraphs: [
						'Der Übergang vom Gymnasium zur Universität bringt für junge Menschen mehr Freiheit, aber auch deutlich höhere Verantwortung mit sich. Während im Schulalltag feste Stundenpläne und häufige Kontrollen Struktur geben, erwartet das Studium [[selbstständige Zeiteinteilung]] und ausdauerndes Arbeiten in Bibliotheken und Seminaren.',
						'Zur wichtigen Studienkompetenz gehört vor allem die Fähigkeit, längere Fachtexte strukturiert zusammenzufassen, verlässliche Quellen korrekt zu zitieren und eigene Fragen sachlich zu begründen. Ebenso entscheidend bleibt die Kunst, nach kleinen Rückschlägen nicht aufzugeben, sondern [[methodisch nachzubessern]].',
						'Wer bereits im letzten Schuljahr pünktlich wiederholt, Notizen ordentlich führt und regelmäßig übt, betritt den Hörsaal später mit Gelassenheit und Freude am Wissen.'
					],
					glossary: [
						{ term: 'Hörsaal', meaning: 'großer Unterrichtsraum an einer Universität' },
						{ term: 'Rückschlag', meaning: 'vorübergehender Misserfolg oder unerwartete Schwierigkeit' }
					],
					mainIdeaHeader: '1. Worüber klärt dieser Ratgebertext vor allem auf?',
					mainIdeaOptions: [
						'Über die Fähigkeiten und Lerngewohnheiten, die den sicheren Übergang vom Gymnasium zur Universität ermöglichen',
						'Über den Verzicht auf jede Zeiteinteilung nach dem Abitur',
						'Über die Abschaffung von Quellenangaben an Hochschulen'
					],
					mainIdeaCorrect:
						'Über die Fähigkeiten und Lerngewohnheiten, die den sicheren Übergang vom Gymnasium zur Universität ermöglichen',
					tfItems: [
						{
							q: 'An der Universität genießen Studierende mehr Freiheit, tragen aber auch höhere Eigenverantwortung.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Feste tägliche Stundenpläne und ständige Kontrollen sind an der Universität noch strenger als in der Schule.',
							a: 'Falsch',
							c: 'Im Schulalltag geben feste Stundenpläne Struktur; das Studium erwartet selbstständige Zeiteinteilung (§1).',
							mark: '0.5'
						},
						{
							q: 'Das sachliche Zusammenfassen von Texten und das korrekte Zitieren von Quellen gehören zur Studienkompetenz.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Bei kleinen Rückschlägen empfiehlt der Text, sofort das Studium abzubrechen.',
							a: 'Falsch',
							c: 'Man soll nicht aufgeben, sondern methodisch nachbessern (§2).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Wodurch unterscheidet sich der Studienalltag laut Absatz 1 vom gewohnten Schulalltag?',
							a: 'Das Studium bietet mehr Freiheit, verlangt jedoch selbstständige Zeiteinteilung und ausdauerndes Arbeiten statt ständiger Kontrollen.',
							mark: '0.75'
						},
						{
							q: 'b) Nennen Sie drei Kernfähigkeiten der Studienkompetenz aus Absatz 2.',
							a: 'Fachtexte strukturiert zusammenfassen, verlässliche Quellen korrekt zitieren und eigene Fragen sachlich begründen (sowie methodisch nachbessern).',
							mark: '1'
						},
						{
							q: 'c) Welche drei Gewohnheiten im Abschlussjahr bereiten laut Absatz 3 gut auf den Hörsaal vor?',
							a: 'Pünktlich wiederholen, Notizen ordentlich führen und regelmäßig üben.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) selbstständige Zeiteinteilung (§1 : Bedeutung im Studienalltag)   b) methodisch nachzubessern (§2 : Was bedeutet das?)',
					refAnswer:
						'a) „selbstständige Zeiteinteilung“ meint die Fähigkeit, Lernzeiten, Bibliothek und Prüfungsplanung ohne äußere Kontrolle eigenverantwortlich zu organisieren.   b) „methodisch nachzubessern“ bedeutet, Fehler systematisch zu analysieren und die eigene Lerntechnik gezielt zu korrigieren.',
					synthPrompt:
						'Welche Arbeitsmethode aus Ihrem Abiturjahr hilft Ihnen am meisten bei der Vorbereitung auf das künftige Hochschulstudium? Erklären Sie in 4 bis 5 Sätzen.',
					synthAnswer:
						'Am meisten hilft mir das tägliche Anfertigen kurzer, übersichtlicher Zusammenfassungen in eigenen Worten. Wenn ich eine Grammatikregel oder einen Fachtext strukturiert notiere, merke ich sofort, welche Punkte ich noch einmal nachschlagen muss. Diese Gewohnheit wird mir auch in der Universität viel Zeit und Stress ersparen.',
					quizzes: {
						easy: {
							q: 'Der Übergang zur Universität erfordert laut Absatz 1 eine selbstständige Zeiteinteilung und höhere Eigenverantwortung.',
							correctAnswer: true,
							explanation: 'صحيح: الانتقال من الثانوية إلى الجامعة يتطلب تنظيماً ذاتياً للوقت ومسؤولية أكبر.'
						} as TfSpec,
						medium: {
							q: 'Zur Studienkompetenz (§2) gehört das Weglassen aller Quellenangaben beim Zitieren.',
							correctAnswer: false,
							explanation: 'خطأ: توثيق المصادر الموثوقة بدقة ركيزة أساسية في المنهجية الجامعية.'
						} as TfSpec,
						hard: {
							q: 'Wer im letzten Schuljahr regelmäßig übt und Notizen ordentlich führt, geht gelassener in das Hochschulstudium (§3).',
							correctAnswer: true,
							explanation: 'صحيح: الاستمرارية وتنظيم المذكرات في البكالوريا يهيئان الطالب بهدوء للجامعة.'
						} as TfSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const spec = chosen.quizzes[difficulty];
			const { quizQuestion, finalAnswer } = buildTfPayload(spec);
			const openAnswer = chosen.openQuestions.map((x) => `${x.q.slice(0, 2)} ${x.a}`).join('\n\n');

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Textverständnis',
				points: 7,
				instruction: 'Lesen Sie den folgenden Text aufmerksam und beantworten Sie die Fragen (7 Punkte — BAC 3AS LE) :',
				content: [
					buildGermanPassageBlock({
						title: chosen.title,
						paragraphs: chosen.paragraphs,
						source: chosen.source,
						numberedParagraphs: true,
						glossary: chosen.glossary
					}),
					{
						type: 'multiple_choice',
						groups: [
							{
								header: chosen.mainIdeaHeader,
								options: chosen.mainIdeaOptions,
								correct: chosen.mainIdeaCorrect,
								mark: '0.5'
							}
						]
					},
					{
						type: 'true_false',
						items: chosen.tfItems
					},
					{
						type: 'text',
						content: `3. Antworten Sie auf die Textfragen in eigenen, vollständigen Sätzen :\n\n${chosen.openQuestions.map((x) => x.q).join('\n\n')}`,
						answer: openAnswer,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `4. Erläutern Sie die Bedeutung bzw. den Bezug der markierten Ausdrücke :\n\n${chosen.refPrompt}`,
						answer: chosen.refAnswer,
						mark: '1'
					},
					{
						type: 'text',
						content: `5. Persönliche Stellungnahme : ${chosen.synthPrompt}`,
						answer: chosen.synthAnswer,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't3',
				difficulty,
				domain: 'textverstaendnis',
				examRole: 'comprehension',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'انتبه لروابط الاستدراك والمقابلة (Zwar ... doch, Während ..., Im Gegensatz dazu) لفهم أطروحة الكاتب.',
					'علّل كل إجابة Falsch بالعودة الدقيقة إلى الفقرة المعنية.',
					'حافظ على وضوح الحجة وتماسك الأسلوب في السؤال الخامس.'
				],
				solutionStepsAr: [
					'تحديد الفكرة العامة الصحيحة (0.5 نقطة).',
					'الحكم والتبرير النصي في الصواب والخطأ (2 نقطتان).',
					'الإجابة التحليلية عن الأسئلة الثلاثة (2.5 نقطة).',
					'شرح الدلالة السياقية وكتابة الرأي المعلل (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. LINGUISTIC COMPETENCE (7 Pkt.): Wortbildung & Adjektivdeklination
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_tpl_3as_le_t3_ling_wortbildung_adjektive',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'wortschatz_wortbildung',
		titleAr: 'الكفاءة اللغوية (7 نقاط — بكالوريا): بناء الكلمات، المرادفات والأضداد وإعراب الصفات (Adjektivdeklination)',
		curriculumLessonId: 'ger_lesson_3as_le_t3_konjunktiv2_adjektivdeklination',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					classPrompt:
						'1. Ordnen Sie die folgenden Nominalgruppen nach dem Artikeltyp : der kluge Plan — ein fleißiger Azubi — mit großem Fleiß — das neue Projekt — frische Ideen — eine gute Stelle.',
					classCols: [
						{ header: 'Schwache / Gemischte Deklination', items: ['der kluge Plan', 'ein fleißiger Azubi', 'das neue Projekt', 'eine gute Stelle'], mark: '0.5' },
						{ header: 'Starke Deklination (Nullartikel)', items: ['mit großem Fleiß', 'frische Ideen'], mark: '0.5' }
					],
					wordRows: [
						{
							verb: { given: true, value: 'ausbilden' },
							nomen: { value: 'die Ausbildung', mark: '0.25' },
							adjektiv: { value: 'ausgebildet', mark: '0.25' }
						},
						{
							verb: { value: 'beraten', mark: '0.25' },
							nomen: { given: true, value: 'die Beratung' },
							adjektiv: { value: 'beratend', mark: '0.25' }
						},
						{
							verb: { value: 'zuverlässig bleiben', mark: '0.25' },
							nomen: { value: 'die Zuverlässigkeit', mark: '0.25' },
							adjektiv: { given: true, value: 'zuverlässig' }
						}
					],
					lexPrompt:
						'3. Wortschatz und Gegenteile :\n\na) Geben Sie ein Synonym derselben Wortart an : erstrebenswert (Adj.) — stärken (Verb).\n\nb) Bilden Sie das Antonym : selbstständig — pünktlich — befristet — die Arbeitslosigkeit.',
					lexAnswer:
						'a) erstrebenswert = wünschenswert / lohnend | stärken = fördern / festigen.\n\nb) unselbstständig, unpünktlich, unbefristet, die Beschäftigung (oder Arbeit).',
					grammarPrompt:
						'4. Ergänzen Sie die exakten Adjektivendungen :\n\na) Ein (erfahren) .......... Meister erklärt den (jung) .......... Lernenden einen (neu) .......... Schaltplan.\n\nb) Mit (groß) .......... Geduld und (ruhig) .......... Konzentration schreiben wir einen (klar) .......... Aufsatz.\n\nc) Alle (fleißig) .......... Abiturientinnen freuen sich über die (gut) .......... Ergebnisse.\n\nd) Wegen des (stark) .......... Windes braucht man (stabil) .......... Bäume.',
					grammarAnswer:
						'a) erfahrener / jungen / neuen.\n\nb) großer / ruhiger / klaren.\n\nc) fleißigen / guten.\n\nd) starken / stabile.',
					clozePrompt:
						'5. Ergänzen Sie sinnvoll : guten — fleißiger — neues — wichtiger.\n\nEin (1) .......... Schüler bereitet sich mit (2) .......... Methode auf das Studium vor. Im Betrieb übernimmt er ein (3) .......... Projekt und lernt dank (4) .......... Ratschläge rasch dazu.',
					clozeAnswer: '1) fleißiger   2) guter   3) neues   4) wichtiger',
					quizzes: {
						easy: {
							q: 'Ordnen Sie jede Nominalgruppe ihrem korrekten Kasus und Artikeltyp zu:',
							pairs: [
								{ left: 'ein erfahrener Meister', right: 'Nominativ Maskulin (ein)' },
								{ left: 'einen neuen Schaltplan', right: 'Akkusativ Maskulin (ein)' },
								{ left: 'mit großer Geduld', right: 'Dativ Feminin (Nullartikel)' },
								{ left: 'alle fleißigen Schüler', right: 'Nominativ Plural (alle)' }
							],
							explanation: 'تحديد الحالة الإعرابية ونوع الأداة هما الأساس في اختيار نهاية الصفة.'
						} as MatchingSpec,
						medium: {
							q: 'Verbinden Sie jedes Verb oder Adjektiv mit dem abgeleiteten Nomen samt Artikel:',
							pairs: [
								{ left: 'zuverlässig', right: 'die Zuverlässigkeit' },
								{ left: 'selbstständig', right: 'die Selbstständigkeit' },
								{ left: 'ausbilden', right: 'die Ausbildung' },
								{ left: 'gründen', right: 'die Gründung' }
							],
							explanation: 'الصفات المنتهية بـ -ig تشتق اسمها غالباً بـ -keit (مؤنث: die).'
						} as MatchingSpec,
						hard: {
							q: 'Verbinden Sie die nominalen Ausdrücke mit der exakt deklinierten Adjektivendung:',
							pairs: [
								{ left: 'wegen des (stark) Windes', right: 'starken' },
								{ left: 'aus (frisch) Mut', right: 'frischem' },
								{ left: 'trotz (hoch) Kosten', right: 'hoher' },
								{ left: 'für das (eigen) Projekt', right: 'eigene' }
							],
							explanation: 'في حالة Genitiv مع des نضيف -en، وبعد aus بدون أداة Dativ Maskulin نضيف -em، ومع trotz بلا أداة للجمع Genitiv Plural نضيف -er.'
						} as MatchingSpec
					}
				},
				{
					classPrompt:
						'1. Klassifizieren Sie die Ausdrücke nach der Endung des Adjektivs („-e“ oder „-en“) : der neue Plan — dem neuen Plan — die alte Bibliothek — den fleißigen Schülern — ein gutes Buch — einen klugen Rat.',
					classCols: [
						{ header: 'Endung „-e“ (oder „-es“)', items: ['der neue Plan', 'die alte Bibliothek', 'ein gutes Buch'], mark: '0.5' },
						{ header: 'Endung „-en“', items: ['dem neuen Plan', 'den fleißigen Schülern', 'einen klugen Rat'], mark: '0.5' }
					],
					wordRows: [
						{
							verb: { given: true, value: 'gründen' },
							nomen: { value: 'die Gründung', mark: '0.25' },
							adjektiv: { value: 'gründlich', mark: '0.25' }
						},
						{
							verb: { value: 'wiederholen', mark: '0.25' },
							nomen: { given: true, value: 'die Wiederholung' },
							adjektiv: { value: 'wiederholt', mark: '0.25' }
						},
						{
							verb: { value: 'beherrschen', mark: '0.25' },
							nomen: { value: 'die Beherrschung', mark: '0.25' },
							adjektiv: { given: true, value: 'beherrscht' }
						}
					],
					lexPrompt:
						'3. Wortschatz und Gegenteile :\n\na) Geben Sie ein Synonym derselben Wortart an : der Rückschlag (Nomen) — gründlich (Adjektiv).\n\nb) Bilden Sie das Antonym : ordentlich — flüchtig — unbefugt — die Sicherheit.',
					lexAnswer:
						'a) der Rückschlag = das Hindernis / der Misserfolg | gründlich = sorgfältig / tiefgehend.\n\nb) unordentlich, gründlich / tiefgehend, befugt, die Unsicherheit.',
					grammarPrompt:
						'4. Setzen Sie die richtigen Adjektivendungen ein :\n\na) In der (ruhig) .......... Bibliothek lesen wir (interessant) .......... Fachbücher und (alt) .......... Handschriften.\n\nb) Ein (gut) .......... Wörterbuch hilft jedem (aufmerksam) .......... Schüler beim Übersetzen.\n\nc) Während des (lang) .......... Praktikums zeigte sie (groß) .......... Zuverlässigkeit.\n\nd) Wir brauchen (qualifiziert) .......... Handwerker und (kreativ) .......... Ingenieurinnen.',
					grammarAnswer:
						'a) ruhigen / interessante / alte.\n\nb) gutes / aufmerksamen.\n\nc) langen / große.\n\nd) qualifizierte / kreative.',
					clozePrompt:
						'5. Ergänzen Sie : ruhigen — kluge — ehrlichen — praktischen.\n\nIn einer (1) .......... Genossenschaft arbeiten junge Fachkräfte auf Basis einer (2) .......... Kalkulation zusammen. Durch den Austausch von (3) .......... Erfahrungen entstehen (4) .......... Lösungen für den Alltag.',
					clozeAnswer: '1) ruhigen   2) ehrlichen   3) praktischen   4) kluge',
					quizzes: {
						easy: {
							q: 'Ordnen Sie jedes Wort seinem passenden Antonym zu:',
							pairs: [
								{ left: 'flüchtig', right: 'tiefgehend' },
								{ left: 'pünktlich', right: 'unpünktlich' },
								{ left: 'befristet', right: 'unbefristet' },
								{ left: 'die Sicherheit', right: 'die Unsicherheit' }
							],
							explanation: 'تتنوع الأضداد بين التضاد المعجمي (flüchtig/tiefgehend) والسابقة الصرفية un-.'
						} as MatchingSpec,
						medium: {
							q: 'Verbinden Sie jede Adjektivphrase mit dem passenden Kasus nach Präposition:',
							pairs: [
								{ left: 'mit großem Mut', right: 'Dativ Maskulin (ohne Artikel)' },
								{ left: 'ohne langes Zögern', right: 'Akkusativ Neutrum (ohne Artikel)' },
								{ left: 'in der neuen Schule', right: 'Dativ Feminin (mit Artikel)' },
								{ left: 'trotz des heißen Windes', right: 'Genitiv Maskulin (mit Artikel)' }
							],
							explanation: 'مراعاة حالة حرف الجر (mit/Dativ, ohne/Akkusativ, trotz/Genitiv) أساس إعراب الصفة.'
						} as MatchingSpec,
						hard: {
							q: 'Verbinden Sie jede Lücke im Plural mit der richtigen Adjektivendung:',
							pairs: [
								{ left: 'die (jung) Menschen (Nom.)', right: 'jungen' },
								{ left: 'viele (jung) Menschen (Nom.)', right: 'junge' },
								{ left: 'meine (gut) Freunde (Nom.)', right: 'guten' },
								{ left: 'mit (gut) Freunden (Dat.)', right: 'guten' }
							],
							explanation: 'بعد die/meine/keine في الجمع نضيف -en، أما بعد viele أو بلا أداة في Nominativ/Akkusativ Plural فنضيف -e!'
						} as MatchingSpec
					}
				},
				{
					classPrompt:
						'1. Ordnen Sie die Begriffe nach ihrem Lernfeld : Fachwortschatz — Schaltplan — Kalkulation — Lesekreis — Zitat — Genossenschaft.',
					classCols: [
						{ header: 'Studium & Bibliothek', items: ['Fachwortschatz', 'Lesekreis', 'Zitat'], mark: '0.5' },
						{ header: 'Beruf & Wirtschaft', items: ['Schaltplan', 'Kalkulation', 'Genossenschaft'], mark: '0.5' }
					],
					wordRows: [
						{
							verb: { given: true, value: 'zitieren' },
							nomen: { value: 'das Zitat', mark: '0.25' },
							adjektiv: { value: 'zitierfähig', mark: '0.25' }
						},
						{
							verb: { value: 'einigen / eignen', mark: '0.25' },
							nomen: { given: true, value: 'die Eignung' },
							adjektiv: { value: 'geeignet', mark: '0.25' }
						},
						{
							verb: { value: 'entscheiden', mark: '0.25' },
							nomen: { value: 'die Entscheidung', mark: '0.25' },
							adjektiv: { given: true, value: 'entscheidend' }
						}
					],
					lexPrompt:
						'3. Wortschatz und Gegenteile :\n\na) Finden Sie ein Synonym zu : die Gelassenheit (Nomen) — flüssig (Adjektiv im Schreiben).\n\nb) Bilden Sie das Gegenteil : selbstständig — belastbar — erreichbar — der Vorteil.',
					lexAnswer:
						'a) die Gelassenheit = die Ruhe / die Besonnenheit | flüssig = gewandt / leicht lesbar.\n\nb) unselbstständig, unzuverlässig / instabil, unerreichbar, der Nachteil.',
					grammarPrompt:
						'4. Ergänzen Sie die fehlenden Adjektivendungen :\n\na) Für (gut) .......... Studienleistungen braucht man (klar) .......... Ziele und (fest) .......... Disziplin.\n\nb) Unsere (erfolgreich) .......... Absolventen beraten die (neu) .......... Schülerinnen im (groß) .......... Hörsaal.\n\nc) Trotz des (hoch) .......... Aufwands lohnte sich die (genau) .......... Vorbereitung.\n\nd) Ich wünsche dir (viel) .......... Erfolg und ein (glücklich) .......... Studienjahr.',
					grammarAnswer:
						'a) gute / klare / feste.\n\nb) erfolgreichen / neuen / großen.\n\nc) hohen / genaue.\n\nd) viel / glückliches.',
					clozePrompt:
						'5. Ergänzen Sie : sorgfältiger — künftigen — moderne — neuen.\n\nEine (1) .......... Berufsausbildung verbindet (2) .......... Fachwissen mit (3) .......... Arbeit im Betrieb und bereitet Jugendliche sicher auf ihre (4) .......... Aufgaben vor.',
					clozeAnswer: '1) moderne   2) neues   3) sorgfältiger   4) künftigen',
					quizzes: {
						easy: {
							q: 'Ordnen Sie jedes Wort seinem passenden Antonym zu:',
							pairs: [
								{ left: 'der Vorteil', right: 'der Nachteil' },
								{ left: 'erreichbar', right: 'unerreichbar' },
								{ left: 'geeignet', right: 'ungeeignet' },
								{ left: 'selbstständig', right: 'unselbstständig' }
							],
							explanation: 'تتشكل أضداد هذه الصفات بالسابقة un-، بينما يقابل Vorteil كلمة Nachteil.'
						} as MatchingSpec,
						medium: {
							q: 'Verbinden Sie jede Adjektivgruppe mit der exakten Endung:',
							pairs: [
								{ left: 'ein (neu) Buch (Nom.)', right: 'neues' },
								{ left: 'das (neu) Buch (Nom.)', right: 'neue' },
								{ left: 'mit einem (neu) Buch (Dat.)', right: 'neuen' },
								{ left: 'trotz (neu) Bücher (Gen. Pl.)', right: 'neuer' }
							],
							explanation: 'في المرفوع المحايد: بعد das نضع -e، بعد ein نضع -es، وفي المجرور نضع -en.'
						} as MatchingSpec,
						hard: {
							q: 'Verbinden Sie jedes Verb mit seinem abstrakten Nomen auf -ung oder -heit:',
							pairs: [
								{ left: 'entscheiden', right: 'die Entscheidung' },
								{ left: 'bewerben', right: 'die Bewerbung' },
								{ left: 'eignen', right: 'die Eignung' },
								{ left: 'gelassen (Adj.)', right: 'die Gelassenheit' }
							],
							explanation: 'اللواحق -ung و-heit تنتج أسماء مؤنثة أداتها „die“.'
						} as MatchingSpec
					}
				}
			];

			const chosen = rng.pick(pool);

			const { quizQuestion, finalAnswer } = buildMatchingPayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'II. Sprachfähigkeit — A) Wortbildung und Adjektivdeklination',
				points: 7,
				instruction: 'Bearbeiten Sie die Aufgaben zu Wortschatz, Wortfamilie und Adjektivdeklination (7 Punkte — BAC 3AS LE) :',
				content: [
					{
						type: 'text',
						content: chosen.classPrompt
					},
					buildGermanClassificationTableBlock({ columns: chosen.classCols }),
					{
						type: 'text',
						content: '2. Vervollständigen Sie die Wortfamilie (Verb | Nomen mit Artikel | Adjektiv) :'
					},
					buildGermanWordFamilyTableBlock(chosen.wordRows),
					{
						type: 'text',
						content: chosen.lexPrompt,
						answer: chosen.lexAnswer,
						mark: '1.5'
					},
					{
						type: 'text',
						content: chosen.grammarPrompt,
						answer: chosen.grammarAnswer,
						mark: '2'
					},
					{
						type: 'text',
						content: chosen.clozePrompt,
						answer: chosen.clozeAnswer,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't3',
				difficulty,
				domain: 'wortschatz_wortbildung',
				examRole: 'linguistic_competence',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'لضبط نهاية الصفة حدّد بالترتيب: الحالة الإعرابية (Kasus) -> الجنس أو الجمع -> نوع الأداة (der / ein / Nullartikel).',
					'بعد أداة التعريف أو ملكية الجمع (meine/alle) تكون النهاية غالباً -en، عدا المرفوع المفرد والمنصوب المؤنث/المحايد فتكون -e.',
					'حافظ على تطابق القسم الكلامي في المرادفات والأضداد.'
				],
				solutionStepsAr: [
					'تصنيف التراكيب الاسمية أو الدلالية (1 نقطة).',
					'إكمال جدول عائلة الكلمات (1.5 نقطة).',
					'استخراج المرادفات والأضداد (1.5 نقطة).',
					'ضبط نهايات الصفات وملء الفراغات (3 نقاط).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. LINGUISTIC COMPETENCE (7 Pkt.): Konjunktiv II & Irreale Konditionalsätze (with SVG)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_tpl_3as_le_t3_ling_konjunktiv2_konditional',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'verben_zeiten',
		titleAr: 'الكفاءة اللغوية (7 نقاط — بكالوريا): صيغة الافتراض والندم (Konjunktiv II) والشرط غير الواقعي',
		curriculumLessonId: 'ger_lesson_3as_le_t3_konjunktiv2_adjektivdeklination',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					svgTitle: 'Konjunktiv II: Gegenwart vs. Vergangenheit',
					svgTense: 'Irreale Bedingungs- und Wunschsätze',
					svgFormula: 'wäre/hätte/würde+Inf. | hätte/wäre+Partizip II',
					svgExample: 'Hätte er früher geübt, wäre der Erfolg sicher gewesen.',
					svgMarkers: 'wenn, falls, doch nur, sonst, beinahe, fast',
					classPrompt:
						'1. Ordnen Sie die Sätze nach „Irreal in der Gegenwart“ oder „Irreal in der Vergangenheit“ : Wenn ich mehr Zeit hätte, würde ich mehr lesen — Hätte sie rechtzeitig gefragt, hätte sie keinen Fehler gemacht — Könnten wir doch alle Quellen prüfen — Wären wir früher losgefahren, wären wir pünktlich angekommen — Er wäre heute ein guter Übersetzer — Sie hätte das Praktikum bekommen können.',
					classCols: [
						{
							header: 'Konjunktiv II Gegenwart',
							items: ['Wenn ich mehr Zeit hätte, würde ich mehr lesen', 'Könnten wir doch alle Quellen prüfen', 'Er wäre heute ein guter Übersetzer'],
							mark: '0.75'
						},
						{
							header: 'Konjunktiv II Vergangenheit',
							items: ['Hätte sie rechtzeitig gefragt, hätte sie keinen Fehler gemacht', 'Wären wir früher losgefahren, wären wir pünktlich angekommen', 'Sie hätte das Praktikum bekommen können'],
							mark: '0.75'
						}
					],
					conjPrompt:
						'2. Setzen Sie die Verben im richtigen Konjunktiv II ein :\n\na) Wenn der Student heute einen ruhigen Lesesaal (haben) .........., (können) .......... er schneller übersetzen.\n\nb) Wenn die Klasse gestern alle Hinweise gelesen (haben) .........., (machen) .......... sie keine Flüchtigkeitsfehler.\n\nc) Wenn wir noch aufmerksamer gewesen (sein) .........., (erreichen) .......... wir das Ziel schon letztes Jahr.\n\nd) Ach, (wiederholen) .......... ich doch nur jede Lektion täglich!',
					conjAnswer:
						'a) hätte / könnte.\n\nb) hätte / hätte ... gemacht.\n\nc) wären / hätten ... erreicht.\n\nd) würde ... wiederholen (oder: wiederholte).',
					transformPrompt:
						'3. Formen Sie reale Aussagen in irreale Konditionalsätze um (und lassen Sie in c/d „wenn“ weg!) :\n\na) Real (Gegenwart) : „Er hat keinen festen Lernplan, deshalb vergisst er wichtige Vokabeln.“\n\nb) Real (Vergangenheit) : „Die Gruppe kalkulierte die Kosten nicht genau, darum scheiterte das Projekt.“\n\nc) Ohne „wenn“ : „Wenn du das Wörterbuch benutzt hättest, hättest du den Artikel besser verstanden.“\n\nd) Wunschsatz (Vergangenheit) : „Leider bin ich gestern nicht in die Bibliothek gegangen.“ (Wenn ich doch...)',
					transformAnswer:
						'a) Wenn er einen festen Lernplan hätte, würde er wichtige Vokabeln nicht vergessen.\n\nb) Wenn die Gruppe die Kosten genau kalkuliert hätte, wäre das Projekt nicht gescheitert.\n\nc) Hättest du das Wörterbuch benutzt, hättest du den Artikel besser verstanden.\n\nd) Wenn ich doch gestern in die Bibliothek gegangen wäre! (oder: Wäre ich doch gestern in die Bibliothek gegangen!)',
					clozePrompt:
						'4. Ergänzen Sie : wäre — hätte — hätten — würden.\n\nWenn jedes Gymnasium eine moderne Bibliothek (1) .........., (2) .......... viele Lernende noch ruhiger arbeiten. (3) .......... wir schon vor Monaten mit den Übungen begonnen, (4) .......... die Abiturvorbereitung jetzt ganz entspannt.',
					clozeAnswer: '1) hätte   2) würden   3) Hätten   4) wäre',
					quizzes: {
						easy: {
							q: 'Ergänzen Sie die korrekte Konjunktiv-II-Form der Gegenwart:',
							sentence: 'Wenn wir ein größeres Labor ___, könnten wir mehr Solarversuche durchführen.',
							correct: 'hätten',
							distractors: ['haben', 'wären', 'hatten'],
							explanation: 'في الحاضر الافتراضي نشتق من haben صيغة Konjunktiv II: „hätten“.'
						} as ClozeSpec,
						medium: {
							q: 'Wählen Sie das richtige Hilfsverb im irrealen Bedingungssatz der Vergangenheit (Bewegungsverb):',
							sentence: 'Wenn der Techniker früher abgereist ___, hätte er die Anlage rechtzeitig geprüft.',
							correct: 'wäre',
							distractors: ['hätte', 'würde', 'ist'],
							explanation: 'الفعل „abreisen“ فعل حركة يأخذ sein في الماضي، لذا يصبح في Konjunktiv II للماضي: „abgereist wäre“.'
						} as ClozeSpec,
						hard: {
							q: 'Wählen Sie die korrekte Spitzenstellung des Verbs ohne „wenn“:',
							sentence: '___ ich die wichtige Regel gestern noch einmal wiederholt, hätte ich volle Punktzahl erreicht.',
							correct: 'Hätte',
							distractors: ['Wenn', 'Würde', 'Wäre'],
							explanation: 'الفعل „wiederholen“ يأخذ haben، وعند حذف wenn يتصدر „Hätte“ أول الجملة.'
						} as ClozeSpec
					}
				},
				{
					svgTitle: 'Irreale Konditionalsätze ohne „wenn“',
					svgTense: 'Verb-Erst-Stellung & Real -> Irreal',
					svgFormula: 'Hätte/Wäre/Könnte + Subjekt ..., (so) wäre/hätte ...',
					svgExample: 'Wären alle Pumpen gewartet worden, gäbe es kein Problem.',
					svgMarkers: 'hätte, wäre, könnte, müsste, würde, hätte ... werden können',
					classPrompt:
						'1. Ordnen Sie nach „Irrealer Bedingungssatz“ oder „Irrealer Wunschsatz“ : Hätte ich doch nur besser aufgepasst! — Wenn er fleißig wäre, bestünde er die Prüfung — Wäre doch schon Sommer! — Hätten wir gespart, könnten wir jetzt gründen — Wenn sie doch pünktlich gekommen wäre! — Würden sie zusammenarbeiten, ginge es schneller.',
					classCols: [
						{
							header: 'Irrealer Bedingungssatz',
							items: [
								'Wenn er fleißig wäre, bestünde er die Prüfung',
								'Hätten wir gespart, könnten wir jetzt gründen',
								'Würden sie zusammenarbeiten, ginge es schneller'
							],
							mark: '0.75'
						},
						{
							header: 'Irrealer Wunschsatz',
							items: [
								'Hätte ich doch nur besser aufgepasst!',
								'Wäre doch schon Sommer!',
								'Wenn sie doch pünktlich gekommen wäre!'
							],
							mark: '0.75'
						}
					],
					conjPrompt:
						'2. Bilden Sie den passenden Konjunktiv II (Passiv oder Modalverb in der Vergangenheit beachten!) :\n\na) Wenn die Handschrift früher geschützt worden (sein) .........., (gehen) .......... kein Blatt verloren.\n\nb) Wenn du mich angerufen (haben) .........., (können) .......... ich dir sofort helfen.\n\nc) Er (sollen) .......... den Bericht gestern zweimal korrigieren. (Vorwurf in der Vergangenheit!)\n\nd) Ohne dein Wörterbuch (sein) .......... diese Übersetzung kaum möglich gewesen.',
					conjAnswer:
						'a) wäre / wäre ... gegangen.\n\nb) hättest / hätte ... helfen können.\n\nc) hätte ... korrigieren sollen.\n\nd) wäre.',
					transformPrompt:
						'3. Formen Sie real zu irreal (und umgekehrt) um :\n\na) Real zu irreal (Gegenwart) : „Weil sie zu schnell liest, übersieht sie kleine Hinweise.“\n\nb) Real zu irreal (Vergangenheit) : „Die Schüler trennten den Abfall nicht, sodass der Hof schmutzig blieb.“\n\nc) Mit „ohne wenn“ umformen : „Wenn wir unsere Muttersprache nicht achteten, würden wir auch schlecht übersetzen.“\n\nd) Höfliche Bitte mit Konjunktiv II : „Geben Sie mir bitte einen kurzen Rat zur Studienwahl!“ (Könnten Sie...)',
					transformAnswer:
						'a) Wenn sie nicht so schnell lesen würde (oder: läse), würde sie kleine Hinweise nicht übersehen.\n\nb) Wenn die Schüler den Abfall getrennt hätten, wäre der Hof nicht schmutzig geblieben.\n\nc) Achteten wir unsere Muttersprache nicht (oder: Würden wir unsere Muttersprache nicht achten), würden wir auch schlecht übersetzen.\n\nd) Könnten Sie mir bitte einen kurzen Rat zur Studienwahl geben?',
					clozePrompt:
						'4. Ergänzen Sie : wäre — hätte — können — würden.\n\n(1) .......... der Bewerber seine Unterlagen rechtzeitig abgeschickt, so (2) .......... er das Stipendium erhalten (3) .......... . Auch heute (4) .......... viele junge Talente davon profitieren, wenn sie mutiger nachfragen.',
					clozeAnswer: '1) Hätte   2) hätte   3) können   4) würden',
					quizzes: {
						easy: {
							q: 'Ergänzen Sie die höfliche Bitte im Konjunktiv II:',
							sentence: '___ Sie mir bitte erklären, wie man dieses Passivbeispiel umformt?',
							correct: 'Könnten',
							distractors: ['Können', 'Konnten', 'Kennen'],
							explanation: 'تُصاغ الطلبات المهذبة في الألمانية باستعمال „Könnten Sie ... / Würden Sie ...“.'
						} as ClozeSpec,
						medium: {
							q: 'Wählen Sie die korrekte Vergangenheit des Modalverbs im Konjunktiv II (Ersatzinfinitiv):',
							sentence: 'Sie ___ die Fachbegriffe schon vor dem Seminar genau nachschlagen müssen.',
							correct: 'hätte',
							distractors: ['wäre', 'würde', 'hat'],
							explanation: 'في Konjunktiv II للماضي مع الأفعال الناقصة نستخدم دائماً „hätte + Infinitiv + Modalverb im Infinitiv“.'
						} as ClozeSpec,
						hard: {
							q: 'Wählen Sie die korrekte Passivform im Konjunktiv II der Vergangenheit:',
							sentence: 'Wenn die Bäume früher gegossen worden ___, hätten sie die Trockenheit überstanden.',
							correct: 'wären',
							distractors: ['hätten', 'würden', 'sind'],
							explanation: 'الفاعل جمع „die Bäume“ في المبني للمجهول للماضي الافتراضي يتطلب „worden wären“.'
						} as ClozeSpec
					}
				},
				{
					svgTitle: 'Real -> Irreal & Wunschsätze (BAC)',
					svgTense: 'Negationswechsel beachten!',
					svgFormula: 'Real (positiv) -> Irreal (negativ) | Real (negativ) -> Irreal (positiv)',
					svgExample: 'Er übt nicht -> Wenn er üben würde (oder: Übte er) ...',
					svgMarkers: 'wenn ... doch, nur, bloß, beinahe, fast, sonst',
					classPrompt:
						'1. Ordnen Sie nach „Konjunktiv II der Hilfs-/Modalverben“ oder „würde + Infinitiv“ : wäre — würde lesen — hätte — könnte — würde übersetzen — müsste.',
					classCols: [
						{ header: 'Direkte Form (Hilfs-/Modalverb)', items: ['wäre', 'hätte', 'könnte', 'müsste'], mark: '0.75' },
						{ header: 'Umschreibung (würde + Infinitiv)', items: ['würde lesen', 'würde übersetzen'], mark: '0.75' }
					],
					conjPrompt:
						'2. Setzen Sie die richtige Konjunktiv-II-Form ein :\n\na) Beinahe (vergessen, Vergangenheit) der Praktikant gestern seinen Ausweis .......... .\n\nb) Wenn du mehr Geduld (haben) .........., (fühlen) .......... du dich vor der Prüfung sicherer.\n\nc) Hätten die Jugendlichen früher zusammengefunden, (gründen) .......... sie schon eine Genossenschaft .......... .\n\nd) Ohne regelmäßiges Lesen (bleiben) .......... der Wortschatz begrenzt.',
					conjAnswer:
						'a) hätte ... vergessen.\n\nb) hättest / würdest ... fühlen.\n\nc) hätten ... gegründet.\n\nd) bliebe (oder: würde ... bleiben).',
					transformPrompt:
						'3. Bilden Sie irreale Sätze aus den realen Gegebenheiten :\n\na) Real : „Da das Wetter zu heiß war, vertrockneten die jungen Pflanzen.“\n\nb) Real : „Ich beherrsche drei Fremdsprachen, deshalb verstehe ich die Fachartikel leicht.“ (Irreal!)\n\nc) Lassen Sie „wenn“ weg : „Wenn wir heute noch begännen, könnten wir den Aufsatz rechtzeitig prüfen.“\n\nd) Irrealer Wunschsatz : „Es ist schade, dass wir keine größere Schulbibliothek haben.“',
					transformAnswer:
						'a) Wenn das Wetter nicht so heiß gewesen wäre, wären die jungen Pflanzen nicht vertrocknet.\n\nb) Wenn ich nicht drei Fremdsprachen beherrschen würde, würde ich die Fachartikel nicht so leicht verstehen.\n\nc) Begännen wir heute noch (oder: Würden wir heute noch beginnen), könnten wir den Aufsatz rechtzeitig prüfen.\n\nd) Hätten wir doch nur eine größere Schulbibliothek! (oder: Wenn wir doch eine größere Schulbibliothek hätten!)',
					clozePrompt:
						'4. Ergänzen Sie : wäre — hätten — doch — würden.\n\nAch, (1) .......... wir (2) .......... früher an die Gruppenarbeit gedacht! Ohne deine sorgfältige Notiz (3) .......... unsere Präsentation nicht so überzeugend gewesen; alle Gäste (4) .......... sich heute darüber freuen.',
					clozeAnswer: '1) hätten   2) doch   3) wäre   4) würden',
					quizzes: {
						easy: {
							q: 'Wählen Sie das Signalwort für ein knapp vermiedenes Ereignis in der Vergangenheit (mit Konjunktiv II):',
							sentence: '___ hätte der Auszubildende das wichtige Werkzeug auf der Baustelle vergessen.',
							correct: 'Beinahe',
							distractors: ['Trotzdem', 'Deshalb', 'Obwohl'],
							explanation: 'كلمتا „Beinahe“ و„Fast“ تعبّران عن حدث كاد يقع ولم يقع، وتُستعملان مع Konjunktiv II للماضي.'
						} as ClozeSpec,
						medium: {
							q: 'Beachten Sie den Negationswechsel von Real zu Irreal: „Er hat keine Zeit, also hilft er nicht.“',
							sentence: 'Wenn er Zeit ___, würde er uns sofort helfen.',
							correct: 'hätte',
							distractors: ['nicht hätte', 'hat', 'wäre'],
							explanation: 'عند التحويل من الحقيقة المنفية إلى الافتراض نسقط النفي (keine Zeit -> Zeit hätte).'
						} as ClozeSpec,
						hard: {
							q: 'Ergänzen Sie den zweiten Teil eines irrealen Bedingungssatzes der Vergangenheit (Intransitives Verb):',
							sentence: 'Wären wir pünktlich aufgebrochen, ___ wir ohne Eile angekommen.',
							correct: 'wären',
							distractors: ['hätten', 'würden', 'sind'],
							explanation: 'الفعل „ankommen“ يأخذ sein في الماضي، فتصبح الصيغة الافتراضية في الماضي „wären ... angekommen“.'
						} as ClozeSpec
					}
				}
			];

			const vIdx = rng.int(0, pool.length - 1);
			const chosen = pool[vIdx];
			const svgStr = svgGermanTenseTimeline({
				title: chosen.svgTitle,
				tenseName: chosen.svgTense,
				formula: chosen.svgFormula,
				activeZone: 'past',
				example: chosen.svgExample,
				markers: chosen.svgMarkers
			});
			const svgPath = saveGermanSvgAsset(`3as_le_t3_konjunktiv2_v${vIdx + 1}`, svgStr);

			const { quizQuestion, finalAnswer } = buildClozePayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'II. Sprachfähigkeit — B) Konjunktiv II und irreale Bedingungssätze',
				points: 7,
				instruction: 'Studieren Sie den Zeitstrahl und lösen Sie die Aufgaben zum Konjunktiv II (7 Punkte — BAC 3AS LE) :',
				content: [
					{
						type: 'image',
						src: svgPath,
						width: 'full',
						caption: 'Zeitstrahl : Konjunktiv II der Gegenwart und Vergangenheit sowie irreale Sätze (BAC 3AS LE).'
					},
					{
						type: 'text',
						content: chosen.classPrompt
					},
					buildGermanClassificationTableBlock({ columns: chosen.classCols }),
					{
						type: 'text',
						content: chosen.conjPrompt,
						answer: chosen.conjAnswer,
						mark: '2'
					},
					{
						type: 'text',
						content: chosen.transformPrompt,
						answer: chosen.transformAnswer,
						mark: '2'
					},
					{
						type: 'text',
						content: chosen.clozePrompt,
						answer: chosen.clozeAnswer,
						mark: '1.5'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't3',
				difficulty,
				domain: 'verben_zeiten',
				examRole: 'linguistic_competence',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'في Konjunktiv II للماضي انتبه لاختيار „hätte“ أو „wäre“ حسب الفعل الأساسي (الحركة والتحول والمبني للمجهول يأخذون wäre!).',
					'عند التحويل من الحقيقة إلى الافتراض (Real -> Irreal) نعكس النفي والإثبات دائماً.',
					'عند حذف „wenn“ يبدأ الشرط مباشرة بالفعل المصرف (Hätte / Wäre / Würde / Könnte).'
				],
				solutionStepsAr: [
					'التصنيف الزمني والأسلوبي لجمل Konjunktiv II (1.5 نقطة).',
					'تصريف الأفعال في الحاضر والماضي الافتراضي (2 نقطتان).',
					'التحويل من الجمل الحقيقية إلى الافتراضية وحذف wenn (2 نقطتان).',
					'تعبئة الفراغات بالصيغ الصحيحة (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. WRITTEN EXPRESSION (6 Pkt. — Integration): Arbeitswelt & Unternehmertum
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_tpl_3as_le_t3_writ_arbeitswelt_beruf',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'schriftlicher_ausdruck',
		titleAr: 'التعبير الكتابي (6 نقاط — بكالوريا): عالم الشغل، التكوين المهني وريادة الأعمال التضامنية',
		curriculumLessonId: 'ger_lesson_3as_le_t3_arbeitswelt_unternehmertum',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					themaEinsPrompt:
						'Schreiben Sie einen Meinungsartikel (120 bis 145 Wörter) über die Chancen von Eigeninitiative und Genossenschaften für junge Absolventinnen und Absolventen in Algerien.',
					themaEinsStichpunkte: [
						'Zeigen Sie konkrete Tätigkeitsfelder (z. B. Solartechnik, nachhaltige Landwirtschaft, Fachübersetzung).',
						'Erklären Sie, wie Genossenschaften Kosten teilen und Anfangsrisiken senken.',
						'Betonen Sie die Rolle von ehrlicher Kalkulation, Geduld und Zuverlässigkeit.'
					],
					themaZweiPrompt:
						'„Wer gemeinsam in einer fairen Genossenschaft gründet, teilt nicht nur Kosten, sondern verdoppelt die Erfahrung.“ Nehmen Sie dazu in 120 bis 145 Wörtern Stellung.',
					modelAnswer:
						'Viele junge Absolventinnen und Absolventen warten nach dem Studium lange auf eine sichere Stelle im öffentlichen Dienst. Dabei stellt sich die Frage, welche Chancen ein eigenes kleines Unternehmen bietet.\n\nErstens erlaubt unternehmerische Initiative jungen Fachkräften, konkrete Bedürfnisse ihrer Region rasch aufzugreifen, etwa in der Wartung von Solaranlagen, in moderner Landwirtschaft oder im Fachübersetzungsbüro. Wer sorgfältig plant und eine Marktlücke erkennt, schafft sinnvolle Arbeit für sich und andere.\n\nZweitens stärken Genossenschaften den Zusammenhalt: Wenn mehrere Absolventen Kapital, Werkzeuge und Fachwissen teilen, sinkt das Risiko beim Start erheblich. Obwohl der Aufbau eines Betriebs anfangs Geduld, Fleiß und finanzielle Disziplin verlangt, wächst daraus wirtschaftliche Selbstständigkeit.\n\nZusammenfassend bin ich überzeugt, dass mutiges, aber realistisch geplantes Unternehmertum verbunden mit Ehrlichkeit und Solidarität der Jugend vielversprechende Zukunftsperspektiven eröffnet.',
					rubricSummary:
						'Thematische Erfüllung (1.5) + Gliederung in 4 Absätze (1.5) + Grammatik & Nebensätze (1.5) + Wortschatz & Großschreibung (1.5).',
					quizzes: {
						easy: {
							q: 'Ordnen Sie diese Faktoren nach „Grundlagen der Gründung“ oder „Gefahren für ein junges Projekt“:',
							categories: ['Grundlagen des Erfolgs', 'Gefahren vermeiden'],
							items: [
								{ text: 'Ehrliche Finanzkalkulation vor dem Start', category: 0 },
								{ text: 'Solidarische Zusammenarbeit in der Genossenschaft', category: 0 },
								{ text: 'Ungeplantes Handeln ohne Bedarfsprüfung', category: 1 },
								{ text: 'Unpünktlichkeit bei Kundenaufträgen', category: 1 }
							],
							explanation: 'يقوم نجاح المشاريع الشبابية على التخطيط المالي، التكافل التعاوني، والانضباط في المواعيد.'
						} as DragDropSpec,
						medium: {
							q: 'Klassifizieren Sie die Konnektoren nach ihrer Funktion im wirtschaftlichen Aufsatz:',
							categories: ['Bedingung oder Zweck', 'Einräumung oder Folge'],
							items: [
								{ text: 'sofern / wenn', category: 0 },
								{ text: 'um Arbeitsplätze zu schaffen', category: 0 },
								{ text: 'obwohl es Mühe kostet', category: 1 },
								{ text: 'sodass Selbstständigkeit wächst', category: 1 }
							],
							explanation: 'الربط بين الشرط والغاية والاعتراض والنتيجة يمنح الفقرات تماسكاً حجاجياً.'
						} as DragDropSpec,
						hard: {
							q: 'Ordnen Sie die Sätze nach korrektem Konjunktiv-II-Gebrauch oder Grammatikfehler:',
							categories: ['Korrekter Konjunktiv II', 'Grammatikfehler vermeiden'],
							items: [
								{ text: 'Hätten wir besser kalkuliert, wäre das Projekt gelungen.', category: 0 },
								{ text: 'Wenn sie mehr Kapital hätten, würden sie gründen.', category: 0 },
								{ text: 'Wenn sie mehr Kapital hätten, sie würden gründen.', category: 1 },
								{ text: 'Hätten wir kalkuliert, hätte das Projekt gelungen.', category: 1 }
							],
							explanation: 'في جواب الشرط يأتي الفعل المصرف قبل الفاعل، و„gelingen“ يأخذ sein في الماضي: „wäre gelungen“.'
						} as DragDropSpec
					}
				},
				{
					themaEinsPrompt:
						'Erörtern Sie in einem sachlichen Aufsatz (120 bis 145 Wörter), warum lebenslange Weiterbildung und praktische Berufe heute so hohe Bedeutung besitzen.',
					themaEinsStichpunkte: [
						'Beschreiben Sie den raschen Wandel durch neue Technik und Umweltstandards.',
						'Würdigen Sie sowohl Handwerk als auch akademische Berufe ohne Vorurteil.',
						'Heben Sie Zuverlässigkeit, Teamgeist und Lernbereitschaft hervor.'
					],
					themaZweiPrompt:
						'„Ausgelernt hat man im modernen Beruf nie.“ Erklären Sie diesen Satz anhand konkreter Beispiele in 120 bis 145 Wörtern.',
					modelAnswer:
						'Die moderne Arbeitswelt verändert sich in Industrie und Handwerk durch neue Werkzeuge, Umweltvorschriften und digitale Abläufe rascher als früher. Deshalb reicht eine einmal abgeschlossene Ausbildung oft nicht mehr für das ganze Berufsleben aus.\n\nZunächst bietet regelmäßige Weiterbildung berufstätigen Menschen die Chance, ihre Kenntnisse aktuell zu halten und verantwortungsvollere Aufgaben zu übernehmen. Ebenso zeigt sich im modernen Handwerk, dass praktische Erfahrung und technische Präzision heute eng zusammengehören.\n\nNatürlich kostet abendliches oder berufsbegleitendes Lernen zusätzliche Zeit und Energie. Dennoch zahlt sich diese Mühe aus, weil verlässliche Fachkräfte mit breiter Qualifikation seltener von Arbeitslosigkeit betroffen sind und stolz auf sorgfältige Arbeit blicken können.\n\nAbschließend lässt sich festhalten, dass berufliche Würde nicht vom bloßen Titel abhängt, sondern von Zuverlässigkeit, Teamgeist, ehrlichem Fleiß und der Bereitschaft, ein Leben lang dazuzulernen.',
					rubricSummary:
						'Sachliche Tiefe (1.5) + Absatzgliederung (1.5) + Grammatik & Adjektivdeklination (1.5) + Wortschatz & Rechtschreibung (1.5).',
					quizzes: {
						easy: {
							q: 'Ordnen Sie diese Haltungen nach „Berufsethos“ oder „Schädliche Einstellung“:',
							categories: ['Berufsethos & Reife', 'Schädliche Einstellung'],
							items: [
								{ text: 'Regelmäßige Teilnahme an Fachkursen', category: 0 },
								{ text: 'Sorgfältige und pünktliche Arbeit im Team', category: 0 },
								{ text: 'Geringschätzung praktischer Handwerksberufe', category: 1 },
								{ text: 'Weigerung, neue Verfahren zu lernen', category: 1 }
							],
							explanation: 'تقدير كل مهنة نافعة والتعلم المستمر من ركائز النجاح المهني.'
						} as DragDropSpec,
						medium: {
							q: 'Ordnen Sie die Redemittel den Abschnitten des Aufsatzes zu:',
							categories: ['Argumentation im Hauptteil', 'Synthese im Schluss'],
							items: [
								{ text: 'Zunächst bietet regelmäßige Weiterbildung ...', category: 0 },
								{ text: 'Dennoch zahlt sich diese Mühe aus, weil ...', category: 0 },
								{ text: 'Abschließend lässt sich festhalten, dass ...', category: 1 },
								{ text: 'Berufliche Würde beruht auf Zuverlässigkeit.', category: 1 }
							],
							explanation: 'تستعمل „Zunächst / Dennoch“ في العرض، و„Abschließend lässt sich festhalten“ في الخاتمة.'
						} as DragDropSpec,
						hard: {
							q: 'Unterscheiden Sie korrekt deklinierte Nominalgruppen von fehlerhaften Formen:',
							categories: ['Korrekte Deklination', 'Fehlerhafte Deklination'],
							items: [
								{ text: 'eine ehrliche Arbeit', category: 0 },
								{ text: 'mit großem Fleiß', category: 0 },
								{ text: 'mit großer Fleiß', category: 1 },
								{ text: 'ein modernes Handwerker (Nom.)', category: 1 }
							],
							explanation: '„der Fleiß“ مذكر فمجروره بلا أداة „großem Fleiß“؛ و„Handwerker“ مذكر فيأخذ „ein moderner Handwerker“.'
						} as DragDropSpec
					}
				},
				{
					themaEinsPrompt:
						'Schreiben Sie ein formelles Bewerbungsschreiben (120 bis 145 Wörter) um einen Praktikumsplatz im Übersetzungs- und Kundenbereich eines Unternehmens während der Sommerferien.',
					themaEinsStichpunkte: [
						'Beachten Sie die formelle Anrede („Sehr geehrte Frau Direktorin, sehr geehrter Herr Direktor,“) und „Sie“.',
						'Nennen Sie Ihre sprachlichen Stärken in Deutsch, Arabisch, Französisch und Englisch.',
						'Betonen Sie Ihre persönlichen Stärken (Pünktlichkeit, Zuverlässigkeit, Teamfähigkeit) und die Bitte um ein Gespräch.'
					],
					themaZweiPrompt:
						'„Ein kurzes Praktikum vor dem Studium zeigt deutlicher als jede Broschüre, welcher Beruf zu einem passt.“ Nehmen Sie dazu in 120 bis 145 Wörtern Stellung.',
					modelAnswer:
						'Sehr geehrte Frau Direktorin, sehr geehrter Herr Direktor,\n\nmit großem Interesse bewerbe ich mich um einen vierwöchigen Praktikumsplatz im Übersetzungs- und Kundenbereich Ihres Unternehmens während der Sommerferien.\n\nDerzeit besuche ich die Abschlussklasse 3AS der Fachrichtung Fremdsprachen und erwerbe solide Kenntnisse in Deutsch, Arabisch, Französisch und Englisch. Durch ein Schülerprojekt zur algerisch-deutschen Zusammenarbeit im Bereich Solartechnik habe ich bereits geübt, kurze Fachtexte strukturiert zusammenzufassen. Zudem arbeite ich sicher mit Wörterbüchern und gängigen Schreibprogrammen.\n\nNach dem Abitur möchte ich Fachübersetzung studieren. In Ihrem Betrieb möchte ich erste praktische Erfahrungen sammeln und mich verlässlich im Team einbringen. Pünktlichkeit und sorgfältiges Arbeiten gehören zu meinen persönlichen Stärken.\n\nÜber eine Einladung zu einem persönlichen Gespräch würde ich mich sehr freuen.\n\nMit freundlichen Grüßen\nKarim Mansouri',
					rubricSummary:
						'Formelle Bewerbungsstruktur (1.5) + Überzeugende Qualifikation (1.5) + Grammatik & Konjunktiv II (1.5) + Stil & Rechtschreibung (1.5).',
					quizzes: {
						easy: {
							q: 'Ordnen Sie die Bestandteile einer Bewerbung nach „Pflichtinhalt“ oder „Unpassender Angabe“:',
							categories: ['Pflichtinhalt einer Bewerbung', 'Unpassend im Anschreiben'],
							items: [
								{ text: 'Nennung der gewünschten Praktikumszeit', category: 0 },
								{ text: 'Darstellung sprachlicher Stärken und Projekte', category: 0 },
								{ text: 'Abwertende Bemerkungen über frühere Lehrer', category: 1 },
								{ text: 'Umgangssprachliche Begrüßung mit „Hey!“', category: 1 }
							],
							explanation: 'رسالة الترشح الرسمية تبرز المهارات والدوافع بلباقة واحترافية.'
						} as DragDropSpec,
						medium: {
							q: 'Ordnen Sie die Bewerbungsabschnitte ihrer genauen Funktion zu:',
							categories: ['Eröffnung & Qualifikation', 'Motivation & Abschluss'],
							items: [
								{ text: 'Klares Ziel der Bewerbung im ersten Satz', category: 0 },
								{ text: 'Hinweis auf Sprachkenntnisse und Schulprojekt', category: 0 },
								{ text: 'Wunsch nach Praxiserfahrung im Team', category: 1 },
								{ text: 'Höfliche Bitte um ein Vorstellungsgespräch', category: 1 }
							],
							explanation: 'تبدأ الرسالة بالغرض والمؤهلات ثم الدافع للانضمام فالطلب المهذب للمقابلة.'
						} as DragDropSpec,
						hard: {
							q: 'Unterscheiden Sie höfliche Schlussformeln im Konjunktiv II von fehlerhaften oder unhöflichen Sätzen:',
							categories: ['Höflich & korrekt (BAC)', 'Unhöflich oder fehlerhaft'],
							items: [
								{ text: 'Über eine Einladung würde ich mich sehr freuen.', category: 0 },
								{ text: 'Ich stünde Ihnen gern ab Juli zur Verfügung.', category: 0 },
								{ text: 'Laden Sie mich sofort morgen früh ein!', category: 1 },
								{ text: 'Ich will bei euch arbeiten, bis bald.', category: 1 }
							],
							explanation: 'صيغة Konjunktiv II مع „würde mich freuen“ و„stünde zur Verfügung“ تعبر عن التهذيب الرسمي.'
						} as DragDropSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const { quizQuestion, finalAnswer } = buildDragDropPayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'III. Schriftlicher Ausdruck',
				points: 6,
				instruction: 'Wählen Sie EINES der beiden folgenden Themen aus und bearbeiten Sie es sorgfältig (6 Punkte — BAC 3AS LE) :',
				content: [
					buildGermanWrittenProductionBlock({
						themaEinsTitle: 'Thema 1 (Gelenkt — 6 Pkt.) :',
						themaEinsPrompt: chosen.themaEinsPrompt,
						themaEinsStichpunkte: chosen.themaEinsStichpunkte,
						themaZweiPrompt: chosen.themaZweiPrompt,
						modelAnswer: chosen.modelAnswer,
						rubricSummary: chosen.rubricSummary,
						mark: '6'
					})
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't3',
				difficulty,
				domain: 'schriftlicher_ausdruck',
				examRole: 'written_expression',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'في رسالة الترشح لتربص مهني التزم بصيغة „Sie“ وبذكر المؤهلات اللغوية والمشروعات المدرسية بواقعية.',
					'في مقال الرأي اربط بين المبادرة الشبابية والتعاون التضامني والتكوين المستمر.',
					'حافظ على 4 فقرات وطول بين 120 و 145 كلمة مع مراجعة نهايات الصفات.'
				],
				solutionStepsAr: [
					'استيفاء مضمون الموضوع المختار وتطبيق القالب المناسب (1.5 نقطة).',
					'تسلسل الفقرات وترابطها بالروابط المنطقية (1.5 نقطة).',
					'الدقة النحوية في الصفة والشرط والتصريف (1.5 نقطة).',
					'غنى المفردات وسلامة الإملاء والكتابة الكبيرة (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 6. WRITTEN EXPRESSION (6 Pkt. — Integration, with Writing Blueprint SVG):
	//    BAC-Aufsatztraining: Mehrsprachigkeit, Bibliothek & Studienkompetenz
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_tpl_3as_le_t3_writ_bac_eroerterung_sprachen',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'schriftlicher_ausdruck',
		titleAr: 'التعبير الكتابي (6 نقاط — بكالوريا): تدريب منهجي على مقال البكالوريا — اللغات، المكتبة والنجاح الجامعي',
		curriculumLessonId: 'ger_lesson_3as_le_t3_bac_aufsatz_methodik',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					bpTitle: 'BAC-Schreibplan: Erörterung (Sprachen & Identität)',
					bpSteps: [
						{ stage: 'Einleitung', detail: 'Debatte um Mehrsprachigkeit & Leitfrage formulieren' },
						{ stage: 'Argument 1', detail: 'Sprachvergleich & Übersetzung schärfen Muttersprache' },
						{ stage: 'Argument 2', detail: 'Zugang zu Fachbibliotheken trotz Übungsaufwand' },
						{ stage: 'Schluss', detail: 'Synthese: Identität & wissenschaftliche Brücke' }
					],
					themaEinsPrompt:
						'Verfassen Sie mithilfe des Schreibplans einen gut gegliederten Aufsatz (120 bis 145 Wörter) zu dem Thema : „Warum stärkt das Erlernen mehrerer Fremdsprachen zugleich unsere Muttersprache und unsere Bildung?“',
					themaEinsStichpunkte: [
						'Widerlegen Sie die Sorge, Fremdsprachen könnten die eigene Sprache verdrängen.',
						'Zeigen Sie, wie präzises Übersetzen das Bewusstsein für Grammatik und Stil schärft.',
						'Betonen Sie den Nutzen für Fachbibliotheken und internationale Forschung.'
					],
					themaZweiPrompt:
						'„Jede neue Sprache öffnet ein zusätzliches Fenster zur Wissenschaft, ohne das eigene Haus zu verlassen.“ Nehmen Sie zu diesem Gedanken in 120 bis 145 Wörtern Stellung.',
					modelAnswer:
						'In einer vernetzten Welt wird oft gefragt, ob das Erlernen mehrerer Fremdsprachen die eigene Muttersprache schwächt oder sie vielmehr bereichert.\n\nErstens schärft der Vergleich zwischen Arabisch und Deutsch den Blick für genaue Bedeutungen und klaren Satzbau. Wer einen anspruchsvollen Fachtext zuverlässig übersetzen möchte, muss zunächst die feinen Ausdrucksmöglichkeiten seiner eigenen Sprache gründlich beherrschen und sicher anwenden.\n\nZweitens öffnen Deutsch, Englisch und Französisch den unmittelbaren Zugang zu Fachbibliotheken, medizinischen Berichten und technischen Normen ohne Umwege. Natürlich verlangt das gleichzeitige Üben mehrerer Sprachen geduldige Wiederholung und regelmäßiges Lesen ganzer Bücher statt bloßer Kurznachrichten.\n\nZusammenfassend lässt sich sagen, dass gelebte Mehrsprachigkeit unsere kulturelle Identität keineswegs verdrängt. Vielmehr bildet sie eine stabile Brücke zwischen den eigenen Wurzeln und dem weltweiten wissenschaftlichen Austausch zum Wohle aller.',
					rubricSummary:
						'Schreibplan-Umsetzung (1.5) + Kohärenz & Redemittel (1.5) + Grammatik & Satzstellung (1.5) + Wortschatz & Rechtschreibung (1.5).',
					quizzes: {
						easy: {
							q: 'Ordnen Sie die vier Bausteine einer BAC-Erörterung über Mehrsprachigkeit:',
							orderedItems: [
								'Einleitung zur Debatte über Fremdsprachen und Muttersprache',
								'Erklärung, wie Sprachvergleich das eigene Ausdrucksvermögen schärft',
								'Hinweis auf Fachliteratur und nötigen Übungsfleiß',
								'Fazit über Identität und wissenschaftlichen Austausch'
							],
							explanation: 'تصميم رباعي واضح ينتقل من طرح الإشكالية إلى الحجتين ثم الخلاصة.'
						} as OrderingSpec,
						medium: {
							q: 'Bringen Sie diese Argumentationsschritte zur Rolle des Übersetzens in die richtige Reihenfolge:',
							orderedItems: [
								'Man liest einen anspruchsvollen deutschen Fachtext.',
								'Dabei sucht man genaue Entsprechungen in der Muttersprache.',
								'Durch diesen Vergleich werden grammatische Feinheiten sichtbar.',
								'Folglich gewinnt auch der Ausdruck im Arabischen an Klarheit.'
							],
							explanation: 'تدرج منطقي يبيّن كيف تنعكس الترجمة إيجاباً على اللغة الأم.'
						} as OrderingSpec,
						hard: {
							q: 'Ordnen Sie die vier Sätze zu einer flüssigen Schlussfolgerung:',
							orderedItems: [
								'Obwohl mehrere Sprachen tägliche Disziplin verlangen,',
								'lohnt sich dieser Einsatz auf dem gesamten Bildungsweg.',
								'Denn Mehrsprachigkeit verdrängt die eigene Kultur nicht,',
								'sondern verbindet nationale Wurzeln mit internationaler Wissenschaft.'
							],
							explanation: 'تبدأ الخاتمة بالاعتراض المتزن وتنتهي بربط الهوية بالعلم العالمي.'
						} as OrderingSpec
					}
				},
				{
					bpTitle: 'BAC-Schreibplan: Stellungnahme (Schulbibliothek)',
					bpSteps: [
						{ stage: 'Einleitung', detail: 'Kontrast: schnelle Bildschirme vs. ruhige Bibliothek' },
						{ stage: 'Pro-Argumente', detail: 'Tiefes Lesen stärkt Rechtschreibung & Logik' },
						{ stage: 'Verbesserung', detail: 'Aktuelle Zeitschriften, Lesekreise & Beratung' },
						{ stage: 'Schluss', detail: 'Bibliothek als Investition in Studienkompetenz' }
					],
					themaEinsPrompt:
						'Schreiben Sie einen Meinungsartikel (120 bis 145 Wörter) für die Schulzeitschrift über den Wert der Schulbibliothek im digitalen Zeitalter.',
					themaEinsStichpunkte: [
						'Vergleichen Sie flüchtiges Scrollen mit dem ruhigen Lesen ganzer Bücher.',
						'Nennen Sie konkrete Wirkungen auf Rechtschreibung, Wortschatz und Gedankenführung.',
						'Schlagen Sie vor, wie Lesekreise und aktuelle Fachwerke die Bibliothek beleben.'
					],
					themaZweiPrompt:
						'„Ein ruhiger Lesesaal formt den Geist tiefer als tausend flüchtige Kurzmeldungen.“ Begründen Sie Ihre Meinung in 120 bis 145 Wörtern.',
					modelAnswer:
						'Obwohl schnelle Suchmaschinen heute auf dem Weg zum Abitur jede Antwort sofort versprechen, bleibt eine gut gepflegte Schulbibliothek ein unverzichtbarer Lernort für Schülerinnen und Schüler.\n\nEinerseits ermöglicht die ruhige Atmosphäre im Lesesaal jenes tiefe, konzentrierte Lesen, das beim flüchtigen Betrachten kurzer Nachrichten verloren geht. Wer ein ganzes Sachbuch oder einen längeren Aufsatz durcharbeitet, verbessert automatisch seine Rechtschreibung, erweitert seinen Wortschatz und schult das logische Denken.\n\nAndererseits darf eine moderne Bibliothek nicht verstaubt wirken. Wenn gedruckte Wörterbücher durch aktuelle Zeitschriften, Lesekreise und sachliche Empfehlungen der Lehrkräfte ergänzt werden, besuchen Jugendliche den Raum gern und finden dort verlässliche Quellen für ihre Referate.\n\nAbschließend bin ich überzeugt, dass jede Stunde in der Bibliothek eine wertvolle Investition in die eigene Studienkompetenz und geistige Selbstständigkeit darstellt.',
					rubricSummary:
						'Aufgabenbezug (1.5) + Pro/Verbesserung-Struktur (1.5) + Grammatik & Konjunktiv/Nebensätze (1.5) + Stil & Rechtschreibung (1.5).',
					quizzes: {
						easy: {
							q: 'Ordnen Sie die vier Teile dieses Artikels über die Schulbibliothek:',
							orderedItems: [
								'Hinführung zum Gegensatz zwischen Suchmaschine und Lesesaal',
								'Nutzen des tiefen Lesens für Rechtschreibung und Wortschatz',
								'Vorschläge für Lesekreise und aktuelle Fachliteratur',
								'Zusammenfassendes Urteil über Studienkompetenz'
							],
							explanation: 'التسلسل الرباعي الكامل: مقدمة، مزايا القراءة العميقة، مقترحات عملية، وخاتمة.'
						} as OrderingSpec,
						medium: {
							q: 'Ordnen Sie die Sätze eines logischen Absatzes über die Aufwertung der Bibliothek:',
							orderedItems: [
								'Eine Schulbibliothek sollte zugleich ruhig und einladend sein.',
								'Deshalb gehören neben Wörterbüchern auch aktuelle Zeitschriften ins Regal.',
								'Ebenso motivieren wöchentliche Lesekreise zum gemeinsamen Gespräch.',
								'So wird der Lesesaal zum beliebten Treffpunkt für Abiturientinnen.'
							],
							explanation: 'تربط الفقرة بين الشرط التنظيمي والوسائل العملية والنتيجة التربوية.'
						} as OrderingSpec,
						hard: {
							q: 'Ordnen Sie die Schritte des tiefgehenden Lesens in der Prüfungsvorbereitung:',
							orderedItems: [
								'Einen vollständigen Fachtext ruhig bis zum Ende lesen',
								'Schlüsselbegriffe und Konnektoren am Rand notieren',
								'Unbekannte Wörter im gedruckten Wörterbuch nachschlagen',
								'Die Kerngedanken klar in eigenen Worten zusammenfassen'
							],
							explanation: 'منهجية القراءة التحليلية تبدأ بالاستيعاب الكلي ثم التحديد المعجمي ثم التلخيص الذاتي.'
						} as OrderingSpec
					}
				},
				{
					bpTitle: 'BAC-Schreibplan: Erfolgreich zum Abitur',
					bpSteps: [
						{ stage: 'Einleitung', detail: 'Frage nach den Grundlagen des Prüfungserfolgs' },
						{ stage: 'Vorbereitung', detail: 'Tägliches Wiederholen statt hektischer letzter Nacht' },
						{ stage: 'Prüfungstag', detail: 'Aufgaben genau lesen, gliedern, korrigieren' },
						{ stage: 'Schluss', detail: 'Ausdauer & Methode bereiten auf das Studium vor' }
					],
					themaEinsPrompt:
						'Verfassen Sie einen strukturierten Ratgeberartikel (120 bis 145 Wörter) für jüngere Mitschülerinnen und Mitschüler über eine kluge und ruhige Vorbereitung auf das Abitur.',
					themaEinsStichpunkte: [
						'Vergleichen Sie tägliches Wiederholen mit hektischem Auswendiglernen kurz vor dem Termin.',
						'Erklären Sie die drei Schritte in der Prüfung: genau lesen, gliedern und Korrektur lesen.',
						'Schließen Sie mit einem ermutigenden Ausblick auf Gelassenheit und Studienkompetenz.'
					],
					themaZweiPrompt:
						'„Nicht Hektik in der letzten Woche, sondern stille Regelmäßigkeit führt zum sicheren Erfolg.“ Kommentieren Sie diese Erfahrung in 120 bis 145 Wörtern.',
					modelAnswer:
						'Kurz vor den Abschlussprüfungen fragen sich viele Abiturientinnen und Abiturienten, worin das eigentliche Geheimnis eines sicheren Prüfungserfolgs liegt.\n\nErstens beweist die Erfahrung vieler Jahrgänge, dass ruhige tägliche Planung weit wirksamer ist als hektisches Lernen in den letzten Nächten. Wer jeden Tag ein überschaubares Pensum wiederholt, schwierige Grammatikregeln rechtzeitig klärt und mit eigenen Beispielen einübt, bewahrt am Prüfungstag kühlen Kopf.\n\nZweitens spielen in der Prüfung selbst sorgfältiges Lesen der Aufgabenstellung, saubere Gliederung und abschließendes Korrekturlesen eine entscheidende Rolle. Auch wenn anspruchsvolle Texte manchmal Unsicherheit auslösen können, helfen strukturierte Notizen und klarer Satzbau zuverlässig weiter.\n\nZusammenfassend lässt sich feststellen, dass das Abitur weniger vom Zufall abhängt als von Ausdauer, kluger Methode, redlicher Vorbereitung und dem ruhigen Vertrauen in die eigene Leistung vor dem Hochschulstudium.',
					rubricSummary:
						'Methodische Klarheit (1.5) + Gliederung & Konnektoren (1.5) + Grammatik & Rechtschreibung (1.5) + Sprachlicher Ausdruck (1.5).',
					quizzes: {
						easy: {
							q: 'Ordnen Sie die vier Arbeitsschritte bei der schriftlichen BAC-Prüfung im Fach Deutsch:',
							orderedItems: [
								'Text und alle Aufgabenstellungen gründlich lesen',
								'Stichpunkte und Gliederung auf dem Konzeptblatt ordnen',
								'Antworten und Aufsatz sauber in vier Absätzen ausformulieren',
								'In den letzten zehn Minuten Verbstellung, Kasus und Großschreibung prüfen'
							],
							explanation: 'هذه هي الخطوات الذهبية الأربع لإدارة ورقة امتحان البكالوريا بنجاح.'
						} as OrderingSpec,
						medium: {
							q: 'Bringen Sie die Ratschläge für die langfristige Prüfungsvorbereitung in eine sinnvolle Folge:',
							orderedItems: [
								'Einen realistischen Wochenplan ohne Überlastung erstellen',
								'Grammatik und Wortschatz täglich in kleinen Einheiten üben',
								'Eigene Fehler aus Probeaufgaben gezielt nacharbeiten',
								'Mit Ruhe, Schlaf und Selbstvertrauen in die Prüfung gehen'
							],
							explanation: 'التدرج المنتظم والمراجعة الدورية للأخطاء يقيان من الارتباك قبيل الامتحان.'
						} as OrderingSpec,
						hard: {
							q: 'Ordnen Sie die vier Prüfpunkte beim abschließenden Korrekturlesen (Korrekturlesen) logisch:',
							orderedItems: [
								'Prüfen, ob genau eines der beiden Themen vollständig bearbeitet wurde',
								'Kontrollieren, ob alle konjugierten Verben an der richtigen Position stehen',
								'Artikel, Adjektivendungen und Großschreibung der Nomen überprüfen',
								'Kommas vor Nebensätzen (dass, weil, obwohl, um...zu) ergänzen'
							],
							explanation: 'قائمة التدقيق النهائية تشمل الملاءمة أولاً ثم موضع الفعل ثم الإعراب والكتابة الكبيرة ثم الفواصل.'
						} as OrderingSpec
					}
				}
			];

			const vIdx = rng.int(0, pool.length - 1);
			const chosen = pool[vIdx];
			const svgStr = svgGermanWritingBlueprint({
				title: chosen.bpTitle,
				steps: chosen.bpSteps,
				width: 560
			});
			const svgPath = saveGermanSvgAsset(`3as_le_t3_writing_v${vIdx + 1}`, svgStr);

			const { quizQuestion, finalAnswer } = buildOrderingPayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'III. Schriftlicher Ausdruck',
				points: 6,
				instruction: 'Orientieren Sie sich am Schreibplan, wählen Sie EINES der beiden Themen aus und verfassen Sie Ihren Text (6 Punkte — BAC 3AS LE) :',
				content: [
					{
						type: 'image',
						src: svgPath,
						width: 'full',
						caption: 'BAC-Schreibplan : Strukturierter Aufbau für den Schriftlichen Ausdruck (6 Punkte).'
					},
					buildGermanWrittenProductionBlock({
						themaEinsTitle: 'Thema 1 (Gelenkt — 6 Pkt.) :',
						themaEinsPrompt: chosen.themaEinsPrompt,
						themaEinsStichpunkte: chosen.themaEinsStichpunkte,
						themaZweiPrompt: chosen.themaZweiPrompt,
						modelAnswer: chosen.modelAnswer,
						rubricSummary: chosen.rubricSummary,
						mark: '6'
					})
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't3',
				difficulty,
				domain: 'schriftlicher_ausdruck',
				examRole: 'written_expression',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'اتبع مخطط التحرير البصري: مقدمة إشكالية، عرض بحجتين ومثال، موازنة اعتراضية، وخاتمة تركيبية.',
					'اختر موضوعاً واحداً فقط (Thema 1 أو Thema 2) والتزم بطول 120–145 كلمة.',
					'راجع في النهاية: الحرف الكبير لكل اسم، موقع الفعل المصرف، والفاصلة قبل الجمل التابعة.'
				],
				solutionStepsAr: [
					'الالتزام بالموضوع المختار وتغطية عناصر المخطط البصري (1.5 نقطة).',
					'تسلسل الفقرات الأربع وحسن توظيف الروابط (1.5 نقطة).',
					'سلامة النحو ومواضع الأفعال وإعراب الصفات (1.5 نقطة).',
					'دقة المعجم والإملاء وعلامات الترقيم (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	}
];
