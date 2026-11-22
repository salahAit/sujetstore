import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildGermanClassificationTableBlock,
	buildGermanPassageBlock,
	buildGermanWordFamilyTableBlock,
	buildGermanWrittenProductionBlock
} from '../../german-helpers';
import { saveGermanSvgAsset, svgGermanConjugationChart } from '../../svg-german';
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
 * Parameterized Exam & Quiz Templates — Trimester 1 : Kultur, Kulturerbe, D-A-CH & Passiv (6 templates)
 */
export const TEMPLATES_3AS_LE_T1: GermanParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPREHENSION (7 Pkt.): Algerisches Kulturerbe & islamische Wissenschaft
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_tpl_3as_le_t1_comp_kulturerbe_baukunst',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'textverstaendnis',
		titleAr: 'فهم النص (7 نقاط — بكالوريا): التراث المعماري الجزائري والتقليد العلمي الإسلامي',
		curriculumLessonId: 'ger_lesson_3as_le_t1_kulturerbe_algerien_baukunst',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Lebendige Baukunst: Von der Kasbah von Algier bis zum M’Zab-Tal',
					source: 'Nach einem Fachartikel über nachhaltige Architektur in Algerien',
					paragraphs: [
						'Wer durch die engen, schattigen Gassen der Kasbah von Algier geht oder die fünf Ksour des M’Zab-Tals in Ghardaïa betrachtet, entdeckt weit mehr als malerische Ansichten. Hinter den schlichten Kalkwänden und den ruhigen Innenhöfen verbirgt sich eine jahrhundertealte [[Baukunst]], die gezielt auf Sonne, Wind und Wasserknappheit antwortet.',
						'Frühere Baumeister verzichteten bewusst auf verschwenderische Fassaden. Stattdessen bauten sie Häuser mit dicken Mauern aus lokalen Steinen und Lehm, damit die Räume im Sommer angenehm kühl bleiben. Auch das Regenwasser wurde über fein geplante Kanäle sorgfältig gesammelt und auf Palmgärten und Zisternen verteilt.',
						'Heute lernen junge Architektinnen und Architekten aus [[diesem überlieferten Wissen]], wie Städte umweltschonend gestaltet werden können. Historische Bauwerke zu pflegen bedeutet deshalb nicht, in der Vergangenheit stehen zu bleiben, sondern bewährte Prinzipien für die Zukunft zu nutzen.'
					],
					glossary: [
						{ term: 'schlicht', meaning: 'einfach, bescheiden und ohne überflüssigen Schmuck' },
						{ term: 'überliefert', meaning: 'von früheren Generationen weitergegeben' }
					],
					mainIdeaHeader: '1. Was ist das Hauptthema des Textes?',
					mainIdeaOptions: [
						'Die klimafreundliche Weisheit der traditionellen algerischen Architektur und ihr Nutzen für heute',
						'Der vollständige Abriss alter Stadtviertel zugunsten hoher Glasbauten',
						'Die Abschaffung von Palmgärten und Wasserkanälen in Ghardaïa'
					],
					mainIdeaCorrect:
						'Die klimafreundliche Weisheit der traditionellen algerischen Architektur und ihr Nutzen für heute',
					tfItems: [
						{
							q: 'Die traditionelle Architektur in der Kasbah und im M’Zab-Tal passt sich gezielt an das Klima an.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Frühere Baumeister bevorzugten möglichst verschwenderische Glasfassaden.',
							a: 'Falsch',
							c: 'Sie verzichteten bewusst auf verschwenderische Fassaden und nutzten dicke Mauern aus Stein und Lehm (§2).',
							mark: '0.5'
						},
						{
							q: 'Das Regenwasser wurde über geplante Kanäle in Gärten und Zisternen geleitet.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Für moderne Architekten hat das historische Wissen keinerlei praktische Bedeutung mehr.',
							a: 'Falsch',
							c: 'Sie lernen daraus, wie Städte heute umweltschonend gestaltet werden können (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Warum bleiben die traditionellen Häuser im M’Zab-Tal und in der Kasbah im Sommer kühl (§2)?',
							a: 'Wegen der schattigen Gassen, der Innenhöfe und der dicken Mauern aus lokalen Steinen und Lehm.',
							mark: '0.75'
						},
						{
							q: 'b) Wie wurde das knappe Regenwasser laut dem zweiten Absatz genutzt?',
							a: 'Es wurde über fein geplante Kanäle gesammelt und auf Palmgärten sowie Zisternen verteilt.',
							mark: '1'
						},
						{
							q: 'c) Was bedeutet die Pflege historischer Bauwerke gemäß dem letzten Satz (§3)?',
							a: 'Sie bedeutet, bewährte Prinzipien des nachhaltigen Bauens für die Gestaltung der Zukunft zu nutzen.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) Baukunst (§1 : Bedeutung im Kontext)   b) diesem überlieferten Wissen (§3 : Worauf bezieht sich der Ausdruck?)',
					refAnswer:
						'a) „Baukunst“ bezeichnet die planvolle, zugleich praktische und harmonische Gestaltung von Häusern und Stadtvierteln.   b) „diesem überlieferten Wissen“ verweist auf die beschriebenen Methoden der Klimaanpassung, der Lehm- und Steinbauweise sowie der Wasserspeicherung.',
					synthPrompt:
						'Warum sollten junge Menschen heute historische Stätten in Algerien besser kennenlernen und schützen? Antworten Sie in 4 bis 5 Sätzen.',
					synthAnswer:
						'Meines Erachtens stärkt die Kenntnis historischer Bauwerke das kulturelle Selbstbewusstsein der Jugend. Gleichzeitig zeigen Stätten wie die Kasbah oder das M’Zab-Tal praktische Lösungen für modernes, ressourcensparendes Bauen. Wer diese Denkmäler achtet und schützt, bewahrt wertvolle Erfahrung für künftige Generationen.',
					quizzes: {
						easy: {
							q: 'Welche Baumaterialien nutzten die früheren Baumeister laut Absatz 2, um die Räume kühl zu halten?',
							correct: 'Dicke Mauern aus lokalen Steinen und Lehm',
							wrong: [
								'Ungeschütztes Aluminium und Kunststoff',
								'Dünne Glasscheiben ohne Schattenschutz',
								'Ausschließlich importierten Stahl'
							],
							explanation: 'توضح الفقرة الثانية استعمال الحجارة المحلية والطين لبناء جدران سميكة تحفظ البرودة.'
						} as McqSpec,
						medium: {
							q: 'Worauf verweist der Ausdruck „diesem überlieferten Wissen“ in Absatz 3?',
							correct: 'Auf die traditionellen Techniken des klimafreundlichen Bauens und der Wasserverteilung',
							wrong: [
								'Auf reine Werbeflyer für neue Hochhäuser',
								'Auf das Vergessen früherer Baustile',
								'Auf moderne Klimaanlagen mit hohem Stromverbrauch'
							],
							explanation: 'يعود اسم الإشارة على خبرات البناء المتوارثة في الفقرتين السابقتين.'
						} as McqSpec,
						hard: {
							q: 'Welche Schlussfolgerung zieht der Autor am Ende des Textes über Denkmalschutz?',
							correct: 'Denkmalschutz verbindet historische Erfahrung mit nachhaltiger Zukunftsplanung',
							wrong: [
								'Denkmalschutz verhindert jede moderne Stadtentwicklung',
								'Alte Viertel lassen sich nicht erforschen',
								'Nur ausländische Städte benötigen Wasserschutz'
							],
							explanation: 'تختتم الفقرة الثالثة بأن صيانة التراث تعني استثمار مبادئه الناجحة لبناء المستقبل.'
						} as McqSpec
					}
				},
				{
					title: 'Al-Zahrawi, Al-Khwarizmi und Al-Idrisi: Pioniergeist in der Wissenschaft',
					source: 'Nach einem kulturhistorischen Essay über die islamische Wissenschaftstradition',
					paragraphs: [
						'Lange bevor moderne Labore entstanden, arbeiteten Gelehrte der islamischen Welt in Bibliotheken, Sternwarten und Krankenhäusern mit beeindruckender Präzision. Al-Zahrawi verfasste im 10. Jahrhundert ein umfassendes medizinisches Handbuch, in dem über zweihundert chirurgische Instrumente beschrieben und [[sorgfältig gezeichnet]] wurden.',
						'In der Mathematik ordnete Al-Khwarizmi klare Rechenschritte zur Lösung von Gleichungen; sein Name lebt noch heute im Fachwort Algorithmus fort. Ebenso schuf der Geograph Al-Idrisi detaillierte Weltkarten, weil er Berichte von Reisenden mit genauen Beobachtungen verglich und [[falsche Annahmen]] konsequent korrigierte.',
						'Diese Wissenschaftler verbanden theoretische Neugier mit praktischem Nutzen und geistiger Redlichkeit. Ihre Bücher wurden über Jahrhunderte hinweg übersetzt und studiert und zeigen Jugendlichen bis heute, dass echter Fortschritt aus Geduld, Methode und Fleiß erwächst.'
					],
					glossary: [
						{ term: 'Präzision', meaning: 'hohe Genauigkeit und Sorgfalt' },
						{ term: 'Redlichkeit', meaning: 'Ehrlichkeit und Treue zur Wahrheit' }
					],
					mainIdeaHeader: '1. Welche Aussage fasst den Text am besten zusammen?',
					mainIdeaOptions: [
						'Frühe Gelehrte wie Al-Zahrawi, Al-Khwarizmi und Al-Idrisi prägten die Wissenschaft durch Methode und Genauigkeit',
						'Medizin und Geographie wurden früher ohne Bücher oder Beobachtung gelehrt',
						'Mathematische Rechenschritte besitzen heute keinen Einfluss mehr'
					],
					mainIdeaCorrect:
						'Frühe Gelehrte wie Al-Zahrawi, Al-Khwarizmi und Al-Idrisi prägten die Wissenschaft durch Methode und Genauigkeit',
					tfItems: [
						{
							q: 'Al-Zahrawi beschrieb und zeichnete in seinem medizinischen Werk über zweihundert chirurgische Instrumente.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Das heutige Fachwort „Algorithmus“ hat keinen Bezug zu Al-Khwarizmi.',
							a: 'Falsch',
							c: 'Sein Name lebt noch heute im Fachwort Algorithmus fort (§2).',
							mark: '0.5'
						},
						{
							q: 'Al-Idrisi prüfte Reiseberichte kritisch und korrigierte ungenaue Vorstellungen auf seinen Karten.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Laut Absatz 3 beruht wissenschaftlicher Fortschritt allein auf Zufall ohne Fleiß.',
							a: 'Falsch',
							c: 'Der Text betont, dass echter Fortschritt aus Geduld, Methode und Fleiß erwächst (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Wodurch zeichnete sich das medizinische Handbuch von Al-Zahrawi aus (§1)?',
							a: 'Es war umfassend und enthielt Beschreibungen sowie sorgfältige Zeichnungen von über zweihundert chirurgischen Instrumenten.',
							mark: '1'
						},
						{
							q: 'b) Wie ging Al-Idrisi bei der Erstellung seiner Weltkarten vor (§2)?',
							a: 'Er verglich Berichte von Reisenden mit genauen Beobachtungen und korrigierte falsche Annahmen.',
							mark: '0.75'
						},
						{
							q: 'c) Welche drei Tugenden nennt der Autor am Ende als Quelle des wissenschaftlichen Fortschritts (§3)?',
							a: 'Geduld, Methode und Fleiß (verbunden mit geistiger Redlichkeit).',
							mark: '0.75'
						}
					],
					refPrompt: 'a) sorgfältig gezeichnet (§1 : Sinn im Text)   b) falsche Annahmen (§2 : Gemeint ist...)',
					refAnswer:
						'a) „sorgfältig gezeichnet“ unterstreicht die exakte, anschauliche Darstellung der Instrumente für Lernende.   b) „falsche Annahmen“ meint unbewiesene oder ungenaue geographische Vorstellungen früherer Zeit.',
					synthPrompt:
						'Was können heutige Schülerinnen und Schüler von der Arbeitsweise früher Gelehrter wie Al-Khwarizmi oder Ibn Al-Haytham für ihren Schulalltag lernen? Schreiben Sie 4 bis 5 Sätze.',
					synthAnswer:
						'Wir können von ihnen vor allem Systematik, Geduld und gründliches Überprüfen lernen. Statt oberflächlich auswendig zu lernen, sollten wir Schritt für Schritt logisch arbeiten und Fehler ehrlich korrigieren. Wer seine Notizen sauber ordnet und Behauptungen an Quellen prüft, erzielt verlässliche Ergebnisse.',
					quizzes: {
						easy: {
							q: 'Wofür war Al-Zahrawi gemäß dem ersten Absatz bekannt?',
							correct: 'Für ein medizinisches Handbuch mit über zweihundert chirurgischen Instrumenten',
							wrong: [
								'Für den Bau moderner Eisenbahnlinien',
								'Für die Erfindung von Kunststoffen',
								'Für die Abschaffung von Krankenhäusern'
							],
							explanation: 'تذكر الفقرة الأولى كتاب الزهراوي الطبي وما تضمنه من وصف ورسم للأدوات الجراحية.'
						} as McqSpec,
						medium: {
							q: 'Wie arbeitete der Geograph Al-Idrisi laut Absatz 2?',
							correct: 'Er verglich Reiseberichte mit genauen Beobachtungen und berichtigte Irrtümer',
							wrong: [
								'Er übernahm ungeprüft jedes Gerücht',
								'Er zeichnete Karten ohne geographische Daten',
								'Er lehnte Übersetzungen grundsätzlich ab'
							],
							explanation: 'تؤكد الفقرة الثانية مقارنة الإدريسي للروايات بالملاحظة الدقيقة وتصحيح الأخطاء.'
						} as McqSpec,
						hard: {
							q: 'Welche Haltung verbindet laut Absatz 3 Theorie und Praxis bei den genannten Gelehrten?',
							correct: 'Theoretische Neugier gepaart mit praktischem Nutzen und geistiger Redlichkeit',
							wrong: [
								'Geheimhaltung aller Forschungsergebnisse vor Studenten',
								'Ablehnung jeder schriftlichen Dokumentation',
								'Vernachlässigung von Genauigkeit bei Messungen'
							],
							explanation: 'تجمع الفقرة الثالثة بين الشغف العلمي والنفع العملي والأمانة الفكرية.'
						} as McqSpec
					}
				},
				{
					title: 'Die Große Moschee von Tlemcen und die Pflege der Handschriften',
					source: 'Nach einer Reportage über historische Bibliotheken im Westen Algeriens',
					paragraphs: [
						'In der geschichtsträchtigen Stadt Tlemcen zeugt die Große Moschee seit dem 11. Jahrhundert von feiner Geometrie, ruhigen Bögen und handwerklicher Meisterschaft. Neben ihrer religiösen Rolle bildeten solche Stätten jahrhundertelang Zentren des Lernens, in denen Grammatik, Recht, Astronomie und [[schöne Kalligraphie]] gepflegt wurden.',
						'Ebenso bewahren Museen und Stiftungen zwischen Constantine, Algier und Tlemcen kostbare Manuskripte auf Pergament und Papier. Um diese Dokumente vor Feuchtigkeit und Verfall zu schützen, werden sie heute von Fachleuten restauriert, klimatisiert gelagert und zusätzlich digital erfasst.',
						'Im 20. Jahrhundert erneuerten Pädagogen wie Scheich Abdelhamid Ben Badis und Scheich Mohamed Bachir El-Ibrahimi diese Bildungstradition, indem sie freie Schulen gründeten und [[das kulturelle Gedächtnis]] durch Zeitschriften und Unterricht lebendig hielten.'
					],
					glossary: [
						{ term: 'Kalligraphie', meaning: 'kunstvolle und sorgfältige Schreibkunst' },
						{ term: 'Manuskript', meaning: 'mit der Hand geschriebenes historisches Buch' }
					],
					mainIdeaHeader: '1. Worüber informiert dieser Text hauptsächlich?',
					mainIdeaOptions: [
						'Über die Bildungsrolle historischer Stätten in Tlemcen, den Schutz alter Handschriften und die pädagogische Erneuerung',
						'Über den vollständigen Ersatz von Bibliotheken durch leere Hallen',
						'Über moderne Autobahnprojekte ohne Bezug zur Kultur'
					],
					mainIdeaCorrect:
						'Über die Bildungsrolle historischer Stätten in Tlemcen, den Schutz alter Handschriften und die pädagogische Erneuerung',
					tfItems: [
						{
							q: 'Historische Moscheen wie jene in Tlemcen dienten früher auch als Orte der Bildung und Wissenschaft.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Alte Manuskripte werden heute ohne Klimaschutz im Freien aufbewahrt.',
							a: 'Falsch',
							c: 'Sie werden restauriert, klimatisiert gelagert und digital erfasst (§2).',
							mark: '0.5'
						},
						{
							q: 'Scheich Abdelhamid Ben Badis und Scheich Mohamed Bachir El-Ibrahimi setzten sich für freie Schulen und Bildung ein.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Die genannten Pädagogen verzichteten auf Zeitschriften und Unterricht.',
							a: 'Falsch',
							c: 'Sie hielten das kulturelle Gedächtnis durch Zeitschriften und Unterricht lebendig (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Welche Wissensgebiete wurden laut Absatz 1 neben der Kalligraphie in historischen Lernzentren gepflegt?',
							a: 'Grammatik, Recht und Astronomie.',
							mark: '0.75'
						},
						{
							q: 'b) Welche drei Schutzmaßnahmen ergreifen Fachleute heute für alte Manuskripte (§2)?',
							a: 'Sie restaurieren die Manuskripte, lagern sie klimatisiert und erfassen sie zusätzlich digital.',
							mark: '1'
						},
						{
							q: 'c) Auf welche Weise erneuerten Scheich Ben Badis und Scheich El-Ibrahimi die Bildungstradition (§3)?',
							a: 'Sie gründeten freie Schulen und pflegten das kulturelle Gedächtnis durch Zeitschriften und Unterricht.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) schöne Kalligraphie (§1 : Was bezeichnet dieser Begriff?)   b) das kulturelle Gedächtnis (§3 : Bedeutung im Zusammenhang)',
					refAnswer:
						'a) „schöne Kalligraphie“ bezeichnet die sorgfältige, ästhetische Schreibkunst in historischen Büchern und Inschriften.   b) „das kulturelle Gedächtnis“ umfasst Sprache, Geschichte, moralische Werte und wissenschaftliche Überlieferung einer Gesellschaft.',
					synthPrompt:
						'Warum ist die Digitalisierung alter Handschriften zusätzlich zur physischen Restaurierung sinnvoll? Begründen Sie Ihre Meinung in 4 bis 5 Sätzen.',
					synthAnswer:
						'Die Digitalisierung bietet aus meiner Sicht zwei große Vorteile. Erstens schont sie die empfindlichen Originalblätter, da Forscherinnen und Forscher hochauflösende Kopien am Bildschirm lesen können. Zweitens ermöglicht sie es Lernenden weltweit, seltene Quellen schnell und sicher für wissenschaftliche Studien einzusehen.',
					quizzes: {
						easy: {
							q: 'Wovor werden alte Manuskripte laut Absatz 2 durch Restaurierung und klimatisierte Lagerung geschützt?',
							correct: 'Vor Feuchtigkeit und Verfall',
							wrong: [
								'Vor jeder wissenschaftlichen Lektüre',
								'Vor der digitalen Erfassung',
								'Vor historischem Interesse'
							],
							explanation: 'تنص الفقرة الثانية على حماية المخطوطات من الرطوبة والتلف.'
						} as McqSpec,
						medium: {
							q: 'Welche zwei Aufgaben erfüllte die Große Moschee in Tlemcen laut Absatz 1?',
							correct: 'Sie war ein religiöses Bauwerk und zugleich ein Zentrum des Lernens',
							wrong: [
								'Sie diente ausschließlich dem Handel mit Metallen',
								'Sie wurde erst vor zehn Jahren eröffnet',
								'Sie schloss jede Beschäftigung mit Astronomie aus'
							],
							explanation: 'توضح الفقرة الأولى دورها الديني والعلمي في النحو والفقه والفلك والخط.'
						} as McqSpec,
						hard: {
							q: 'Wie verbindet der Text in Absatz 3 historische Bauwerke mit dem Wirken von Scheich Ben Badis und Scheich El-Ibrahimi?',
							correct: 'Er zeigt die Kontinuität von Wissen, Identität und verantwortungsvoller Bildungsarbeit',
							wrong: [
								'Er behauptet einen völligen Bruch mit der Geschichte',
								'Er lehnt die Einrichtung von Schulen im 20. Jahrhundert ab',
								'Er beschränkt Kultur allein auf leere Gebäude'
							],
							explanation: 'يربط النص بين عمارة العلم القديمة والنهضة التعليمية الإصلاحية في القرن العشرين.'
						} as McqSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const spec = chosen.quizzes[difficulty];
			const { quizQuestion, finalAnswer } = buildMcqPayload(
				spec,
				`فهم النص BAC 3AS LE («${chosen.title}»): اختر الإجابة الدقيقة`,
				'ارجع إلى الفقرة المشار إليها في النص وتحقق من المعنى الدقيق في السياق.',
				rng
			);

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
						content: `3. Beantworten Sie die folgenden Fragen präzise in eigenen Worten :\n\n${chosen.openQuestions.map((x) => x.q).join('\n\n')}`,
						answer: openAnswer,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `4. Textarbeit und Wortschatz im Kontext :\n\n${chosen.refPrompt}`,
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
				trimesterId: 't1',
				difficulty,
				domain: 'textverstaendnis',
				examRole: 'comprehension',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'في أسئلة Richtig / Falsch لا تنسَ إرفاق كل عبارة „Falsch“ بتعليل دقيق مستمد من النص.',
					'حاول في الأسئلة المفتوحة صياغة الجواب بأسلوبك الخاص مع الحفاظ على دقة المعطيات.',
					'في سؤال الرأي الشخصي (4–5 جمل)، افتتح بعبارة مثل „Meines Erachtens...“ وادعم موقفك بحجتين.'
				],
				solutionStepsAr: [
					'تحديد الفكرة المحورية للنص (0.5 نقطة).',
					'تصنيف عبارات الصواب والخطأ مع التبرير النصي (2 نقطتان).',
					'الإجابة التحليلية عن الأسئلة الثلاثة (2.5 نقطة).',
					'شرح الدلالة السياقية والإحالات وصياغة الرأي الشخصي (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. COMPREHENSION (7 Pkt.): D-A-CH-Länder, Wirtschaft & Bildungsaustausch
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_tpl_3as_le_t1_comp_dach_algerien',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'kultur_landeskunde',
		titleAr: 'فهم النص (7 نقاط — بكالوريا): بلدان D-A-CH، الاقتصاد والتعاون التعليمي مع الجزائر',
		curriculumLessonId: 'ger_lesson_3as_le_t1_deutschland_algerien_wirtschaft',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Der D-A-CH-Raum: Geographie, Vielfalt und wirtschaftliche Stärken',
					source: 'Nach einer landeskundlichen Übersicht über Mitteleuropa',
					paragraphs: [
						'In Mitteleuropa bilden Deutschland, Österreich und die Schweiz zusammen den sogenannten D-A-CH-Raum, in dem rund hundert Millionen Menschen Deutsch als Amts- oder Hauptsprache nutzen. Während Deutschland aus sechzehn Bundesländern besteht und für seinen starken Mittelstand bekannt ist, prägen in Österreich die Alpen und die Wasserkraft Landschaft und Wirtschaft.',
						'Die Schweiz wiederum zeichnet sich durch ihre Viersprachigkeit aus: Neben Deutsch werden dort Französisch, Italienisch und Rätoromanisch gesprochen. Trotz knapper eigener Rohstoffe erreichen alle drei Länder hohe Qualität in [[Präzisionstechnik]], Maschinenbau und umweltfreundlicher Energie.',
						'Entscheidend für [[diesen wirtschaftlichen Erfolg]] ist nicht allein moderne Technik, sondern vor allem eine solide Ausbildung junger Fachkräfte sowie enge Zusammenarbeit zwischen Schulen, Betrieben und Forschungsinstituten.'
					],
					glossary: [
						{ term: 'Mittelstand', meaning: 'kleine und mittlere, oft familiengeführte Unternehmen' },
						{ term: 'Rohstoffe', meaning: 'natürliche Materialien wie Erze, Holz oder Öl' }
					],
					mainIdeaHeader: '1. Worum geht es in diesem Text vor allem?',
					mainIdeaOptions: [
						'Um die geographischen Merkmale, Sprachen und Ausbildungsstärken der D-A-CH-Länder',
						'Um ein Verbot von Fremdsprachen in den Alpenländern',
						'Um den Verzicht auf jede technische Forschung in Mitteleuropa'
					],
					mainIdeaCorrect:
						'Um die geographischen Merkmale, Sprachen und Ausbildungsstärken der D-A-CH-Länder',
					tfItems: [
						{
							q: 'Deutschland besteht aus sechzehn Bundesländern und besitzt einen starken Mittelstand.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'In der Schweiz wird ausschließlich eine einzige Sprache gesprochen.',
							a: 'Falsch',
							c: 'Die Schweiz zeichnet sich durch ihre Viersprachigkeit aus: Deutsch, Französisch, Italienisch und Rätoromanisch (§2).',
							mark: '0.5'
						},
						{
							q: 'Die D-A-CH-Länder besitzen riesige eigene Erdöl- und Erzvorräte als Hauptquelle ihres Erfolgs.',
							a: 'Falsch',
							c: 'Sie haben knappe eigene Rohstoffe; entscheidend sind Qualität und eine solide Ausbildung (§2–§3).',
							mark: '0.5'
						},
						{
							q: 'Schulen, Betriebe und Forschungsinstitute arbeiten im D-A-CH-Raum eng zusammen.',
							a: 'Richtig',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Welche drei Staaten gehören zum D-A-CH-Raum und wie viele Menschen sprechen dort ungefähr Deutsch (§1)?',
							a: 'Deutschland, Österreich und die Schweiz; rund hundert Millionen Menschen.',
							mark: '0.75'
						},
						{
							q: 'b) Welche vier Sprachen werden in der Schweiz gesprochen und in welchen Branchen sind die drei Länder stark (§2)?',
							a: 'Deutsch, Französisch, Italienisch und Rätoromanisch; stark in Präzisionstechnik, Maschinenbau und umweltfreundlicher Energie.',
							mark: '1'
						},
						{
							q: 'c) Was bildet laut Absatz 3 die wichtigste Grundlage für den wirtschaftlichen Erfolg?',
							a: 'Eine solide Ausbildung junger Fachkräfte sowie die enge Kooperation zwischen Schulen, Betrieben und Forschung.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) Präzisionstechnik (§2 : Erklärung im Kontext)   b) diesen wirtschaftlichen Erfolg (§3 : Worauf verweist das?)',
					refAnswer:
						'a) „Präzisionstechnik“ bezeichnet die sehr genaue Herstellung hochwertiger technischer Geräte und Instrumente.   b) „diesen wirtschaftlichen Erfolg“ bezieht sich auf die hohe Leistungsfähigkeit in Maschinenbau, Präzisionstechnik und sauberer Energie trotz knapper Rohstoffe.',
					synthPrompt:
						'Warum spielt gut ausgebildetes Fachpersonal für ein Land oft eine größere Rolle als bloße Rohstoffe? Erklären Sie in 4 bis 5 Sätzen.',
					synthAnswer:
						'Meines Erachtens sind Wissen und handwerkliche Kompetenz nachhaltiger als bloße Rohstoffe, da natürliche Vorräte irgendwann erschöpft sind. Qualifizierte Fachkräfte entwickeln hingegen neue Technologien, sparen Energie und schaffen dauerhafte Qualität. Deshalb ist die Investition in Schulen und Berufsausbildung der sicherste Weg zu stabiler Entwicklung.',
					quizzes: {
						easy: {
							q: 'Die Schweiz hat neben Deutsch noch drei weitere Landessprachen: Französisch, Italienisch und Rätoromanisch.',
							correctAnswer: true,
							explanation: 'صحيح: تذكر الفقرة الثانية اللغات الأربع الرسمية في سويسرا.'
						} as TfSpec,
						medium: {
							q: 'Laut Text gründet der wirtschaftliche Erfolg der D-A-CH-Länder vor allem auf unbegrenzten eigenen Rohstoffen.',
							correctAnswer: false,
							explanation: 'خطأ: يؤكد النص ندرة الموارد الأولية واعتماد النجاح على التكوين والتقنية الدقيقة.'
						} as TfSpec,
						hard: {
							q: 'Im Text wird hervorgehoben, dass das Zusammenspiel von Schulen, Betrieben und Forschung eine zentrale Rolle für Fachkräfte spielt.',
							correctAnswer: true,
							explanation: 'صحيح: تربط الفقرة الثالثة النجاح الاقتصادي بالتعاون الوثيق بين المدرسة والمؤسسة والبحث العلمي.'
						} as TfSpec
					}
				},
				{
					title: 'Algerien und Deutschland: Brücken durch Bildung und saubere Energie',
					source: 'Nach einer Analyse über mediterrane Partnerschaften',
					paragraphs: [
						'Zwischen Algerien und den deutschsprachigen Ländern entwickelt sich seit Jahren eine vielfältige Partnerschaft, die weit über den klassischen Handel hinausgeht. Im Mittelpunkt stehen gemeinsame Programme für Ingenieurwesen, Wasserwirtschaft und [[erneuerbare Energien]], da Algeriens Süden über außergewöhnlich viel Sonnenlicht verfügt.',
						'Auch im Hochschulbereich gewinnen Stipendien, gemeinsame Workshops und Fachübersetzungen spürbar an Gewicht. Junge algerische Absolventinnen und Absolventen der Germanistik und der Naturwissenschaften arbeiten heute als [[wichtige Vermittler]], weil sie technische Berichte und Normen präzise übertragen können.',
						'Eine solche Kooperation auf Augenhöhe bringt beiden Seiten Gewinn: Sie schafft praxisnahe Lernchancen für die Jugend und stärkt den respektvollen Austausch über das Mittelmeer hinweg.'
					],
					glossary: [
						{ term: 'auf Augenhöhe', meaning: 'gleichberechtigt und auf gegenseitigem Respekt beruhend' },
						{ term: 'Vermittler', meaning: 'Person, die Verständnis und Kommunikation zwischen Partnern herstellt' }
					],
					mainIdeaHeader: '1. Welche Aussage gibt die Kernaussage des Textes wieder?',
					mainIdeaOptions: [
						'Algerien und Deutschland bauen eine respektvolle Partnerschaft in erneuerbaren Energien, Wissenschaft und Bildung auf',
						'Der Austausch beschränkt sich auf den einmaligen Verkauf alter Bücher',
						'Deutschkenntnisse haben für Naturwissenschaften und Übersetzung keinen Wert'
					],
					mainIdeaCorrect:
						'Algerien und Deutschland bauen eine respektvolle Partnerschaft in erneuerbaren Energien, Wissenschaft und Bildung auf',
					tfItems: [
						{
							q: 'Die Partnerschaft zwischen Algerien und Deutschland umfasst auch Ingenieurwesen, Wasserwirtschaft und saubere Energie.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Der Süden Algeriens bietet aufgrund geringer Sonneneinstrahlung kaum Möglichkeiten für Solarenergie.',
							a: 'Falsch',
							c: 'Algeriens Süden verfügt über außergewöhnlich viel Sonnenlicht (§1).',
							mark: '0.5'
						},
						{
							q: 'Absolventen mit Deutsch- und Fachkenntnissen können technische Berichte präzise übersetzen.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Laut Absatz 3 profitiert nur eine Seite von dieser Zusammenarbeit.',
							a: 'Falsch',
							c: 'Eine Kooperation auf Augenhöhe bringt beiden Seiten Gewinn (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Welche drei technischen Schwerpunktbereiche der Partnerschaft werden in Absatz 1 genannt?',
							a: 'Ingenieurwesen, Wasserwirtschaft und erneuerbare Energien.',
							mark: '0.75'
						},
						{
							q: 'b) Welche konkreten Formen nimmt der Hochschulaustausch laut Absatz 2 an?',
							a: 'Stipendien, gemeinsame Workshops und präzise Fachübersetzungen.',
							mark: '0.75'
						},
						{
							q: 'c) Warum gelten junge zweisprachige Fachleute heute als wertvolle Vermittler (§2–§3)?',
							a: 'Weil sie technische Berichte und Normen genau übersetzen und so einen respektvollen, praxisnahen Austausch auf Augenhöhe ermöglichen.',
							mark: '1'
						}
					],
					refPrompt: 'a) erneuerbare Energien (§1 : Beispiele nennen)   b) wichtige Vermittler (§2 : Auf wen bezieht sich das?)',
					refAnswer:
						'a) „erneuerbare Energien“ sind nachhaltige Energiequellen wie Sonnenenergie (Solarenergie) oder Windkraft.   b) „wichtige Vermittler“ bezieht sich auf die jungen algerischen Absolventinnen und Absolventen der Germanistik und Naturwissenschaften.',
					synthPrompt:
						'Inwiefern kann die Beherrschung der deutschen Sprache Ihnen später im Studium oder im Beruf konkret helfen? Antworten Sie in 4 bis 5 Sätzen.',
					synthAnswer:
						'Gute Deutschkenntnisse öffnen zunächst den Zugang zu verlässlicher Fachliteratur in Technik, Medizin und Geisteswissenschaften. Außerdem verbessern sie die Chancen auf ein Stipendium oder eine Arbeit als Übersetzerin, Lehrer oder Projektkoordinator in internationalen Unternehmen. Nicht zuletzt schult die deutsche Grammatik das logische und strukturierte Denken.',
					quizzes: {
						easy: {
							q: 'Laut Absatz 1 beschränkt sich die deutsch-algerische Partnerschaft ausschließlich auf den Handel ohne Bildungsprojekte.',
							correctAnswer: false,
							explanation: 'خطأ: تشمل الشراكة الهندسة وإدارة المياه والطاقات المتجددة والتعاون الجامعي.'
						} as TfSpec,
						medium: {
							q: 'Junge Absolventen der Germanistik und Naturwissenschaften leisten durch Fachübersetzungen einen wichtigen Beitrag zur Kommunikation.',
							correctAnswer: true,
							explanation: 'صحيح: تبرز الفقرة الثانية دور الخريجين كوسطاء علميين عبر الترجمة التقنية الدقيقة.'
						} as TfSpec,
						hard: {
							q: 'Der Ausdruck „Kooperation auf Augenhöhe“ in Absatz 3 bedeutet eine ungleiche Abhängigkeit eines Partners.',
							correctAnswer: false,
							explanation: 'خطأ: يعني التعاون المتكافئ القائم على الاحترام المتبادل والمنفعة للطرفين.'
						} as TfSpec
					}
				},
				{
					title: 'Das duale System: Lernen zwischen Klassenzimmer und Werkstatt',
					source: 'Nach einem Bildungsbericht über berufliche Qualifikation',
					paragraphs: [
						'Während in vielen Ländern die berufliche Ausbildung überwiegend theoretisch im Klassenzimmer stattfindet, setzt das duale System im deutschsprachigen Raum auf [[zwei Lernorte]]: An ein bis zwei Tagen pro Woche besuchen die Auszubildenden die Berufsschule, an den übrigen Tagen arbeiten sie direkt im Betrieb.',
						'Dort lernen sie unter Anleitung erfahrener Meisterinnen und Meister, Maschinen zu warten, Pläne zu lesen und Kundenaufträge zuverlässig auszuführen. Gleichzeitig festigt die Berufsschule ihr Wissen in Fachmathematik, Werkstoffkunde und Sprache, sodass Theorie und Alltag eng verzahnt bleiben.',
						'Dieses Modell erfordert Pünktlichkeit und Ausdauer, belohnt junge Menschen jedoch mit [[praktischer Sicherheit]] und hohen Chancen auf eine unbefristete Anstellung nach der Abschlussprüfung.'
					],
					glossary: [
						{ term: 'verzahnt', meaning: 'eng miteinander verbunden und aufeinander abgestimmt' },
						{ term: 'unbefristet', meaning: 'dauerhaft, ohne zeitliches Ablaufdatum' }
					],
					mainIdeaHeader: '1. Was beschreibt der Text am genauesten?',
					mainIdeaOptions: [
						'Aufbau, Praxisnähe und berufliche Vorteile der dualen Ausbildung',
						'Die Schließung aller Berufsschulen zugunsten langer Ferien',
						'Das Fehlen theoretischer Fächer in der technischen Ausbildung'
					],
					mainIdeaCorrect:
						'Aufbau, Praxisnähe und berufliche Vorteile der dualen Ausbildung',
					tfItems: [
						{
							q: 'In der dualen Ausbildung wechseln sich Unterricht in der Berufsschule und Praxis im Betrieb ab.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Im Betrieb bleiben die Lernenden völlig allein ohne erfahrene Anleitung.',
							a: 'Falsch',
							c: 'Sie lernen unter Anleitung erfahrener Meisterinnen und Meister (§2).',
							mark: '0.5'
						},
						{
							q: 'Die Berufsschule vermittelt unter anderem Fachmathematik, Werkstoffkunde und Sprache.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Nach bestandener Prüfung sinken die Chancen auf einen festen Arbeitsplatz deutlich.',
							a: 'Falsch',
							c: 'Es bestehen hohe Chancen auf eine unbefristete Anstellung (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Wie verteilt sich die Lernzeit in der dualen Ausbildung gemäß Absatz 1?',
							a: 'Ein bis zwei Tage pro Woche in der Berufsschule und die übrigen Tage direkt im Ausbildungsbetrieb.',
							mark: '0.75'
						},
						{
							q: 'b) Welche praktischen Aufgaben übernehmen Auszubildende im Betrieb (§2)?',
							a: 'Sie warten Maschinen, lesen technische Pläne und führen Kundenaufträge zuverlässig aus.',
							mark: '1'
						},
						{
							q: 'c) Welche zwei persönlichen Tugenden verlangt dieses Modell laut Absatz 3?',
							a: 'Pünktlichkeit und Ausdauer.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) zwei Lernorte (§1 : Welche sind gemeint?)   b) praktischer Sicherheit (§3 : Bedeutung im Zusammenhang)',
					refAnswer:
						'a) „zwei Lernorte“ sind die Berufsschule (für die Theorie) und der Betrieb (für die praktische Arbeit).   b) „praktischer Sicherheit“ beschreibt das Vertrauen in die eigene berufliche Fähigkeit dank echter Betriebserfahrung.',
					synthPrompt:
						'Warum sollte die praktische Berufsausbildung genauso hoch geachtet werden wie ein theoretisches Studium? Begründen Sie Ihre Ansicht in 4 bis 5 Sätzen.',
					synthAnswer:
						'Jede Gesellschaft benötigt sowohl Wissenschaftler als auch geschickte Handwerker und Techniker. Ohne gut ausgebildete Fachkräfte funktionieren weder Krankenhäuser noch Solaranlagen oder sichere Gebäude. Eine gründliche Berufsausbildung verdient daher vollen Respekt und bietet jungen Menschen wirtschaftliche Selbstständigkeit.',
					quizzes: {
						easy: {
							q: 'Im dualen System lernen junge Menschen sowohl in der Berufsschule als auch praktisch in einem Betrieb.',
							correctAnswer: true,
							explanation: 'صحيح: يتوزع التكوين المزدوج بين المدرسة المهنية والمؤسسة الإنتاجية.'
						} as TfSpec,
						medium: {
							q: 'In der Berufsschule werden ausschließlich fremde Gedichte gelesen, ohne Fachmathematik oder Werkstoffkunde.',
							correctAnswer: false,
							explanation: 'خطأ: تدرّس المدرسة المهنية الرياضيات التقنية وعلم المواد واللغة.'
						} as TfSpec,
						hard: {
							q: 'Die enge Verzahnung von Theorie und betrieblicher Praxis erhöht nach der Abschlussprüfung die Aussichten auf eine dauerhafte Stelle.',
							correctAnswer: true,
							explanation: 'صحيح: الخبرة الميدانية المرافقة للدراسة ترفع فرص التوظيف القار.'
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
				instruction: 'Lesen Sie den Text sorgfältig durch und bearbeiten Sie die Aufgaben (7 Punkte — BAC 3AS LE) :',
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
						content: `3. Antworten Sie genau auf die folgenden Textfragen :\n\n${chosen.openQuestions.map((x) => x.q).join('\n\n')}`,
						answer: openAnswer,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `4. Klären Sie die Bedeutung und den Bezug der unterstrichenen Ausdrücke :\n\n${chosen.refPrompt}`,
						answer: chosen.refAnswer,
						mark: '1'
					},
					{
						type: 'text',
						content: `5. Schriftliche Reflexion : ${chosen.synthPrompt}`,
						answer: chosen.synthAnswer,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't1',
				difficulty,
				domain: 'kultur_landeskunde',
				examRole: 'comprehension',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تحقق من الأرقام والنسب والمفردات المقارنة في النص قبل اختيار Richtig أو Falsch.',
					'في التعليل النصي لعبارة Falsch، أشر إلى الفقرة وصحح الفكرة الخاطئة بدقة.',
					'حافظ في السؤال الخامس على وضوح الفكرة والربط المنطقي بالألمانية.'
				],
				solutionStepsAr: [
					'اختيار الفكرة العامة الصحيحة (0.5 نقطة).',
					'الحكم والتبرير النصي في سؤال الصواب والخطأ (2 نقطتان).',
					'الإجابة عن أسئلة الفهم الثلاثة (2.5 نقطة).',
					'تفسير التعابير المرجعية وكتابة الموقف الشخصي (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. LINGUISTIC COMPETENCE (7 Pkt.): Wortbildung, Nominalisierung & Lexik
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_tpl_3as_le_t1_ling_wortbildung_lexik',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'wortschatz_wortbildung',
		titleAr: 'الكفاءة اللغوية (7 نقاط — بكالوريا): بناء الكلمات، عائلة الكلمات (Verb|Nomen|Adjektiv)، المرادفات والأضداد',
		curriculumLessonId: 'ger_lesson_3as_le_t1_wortbildung_nominalisierung',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					classPrompt:
						'1. Ordnen Sie die folgenden Begriffe in die passende Spalte ein : die Kasbah - das Handwerk - das M’Zab-Tal - die Berufsausbildung - die Moschee - der Mittelstand.',
					classCols: [
						{ header: 'Kulturerbe & Baukunst', items: ['die Kasbah', 'das M’Zab-Tal', 'die Moschee'], mark: '0.5' },
						{ header: 'Wirtschaft & Ausbildung', items: ['das Handwerk', 'die Berufsausbildung', 'der Mittelstand'], mark: '0.5' }
					],
					wordRows: [
						{
							verb: { given: true, value: 'bilden' },
							nomen: { value: 'die Bildung', mark: '0.25' },
							adjektiv: { value: 'gebildet', mark: '0.25' }
						},
						{
							verb: { value: 'verantworten', mark: '0.25' },
							nomen: { given: true, value: 'die Verantwortung' },
							adjektiv: { value: 'verantwortlich', mark: '0.25' }
						},
						{
							verb: { value: 'forschen', mark: '0.25' },
							nomen: { value: 'die Forschung', mark: '0.25' },
							adjektiv: { given: true, value: 'forschend' }
						}
					],
					lexPrompt:
						'3. Wortschatz und Gegenteile :\n\na) Geben Sie jeweils ein Synonym in derselben Wortart an : bewahren (Verb) — prächtig (Adjektiv).\n\nb) Bilden Sie das Antonym mit einem passenden Präfix oder Suffix : unabhängig — sinnvoll — Vertrauen — erfolgreich.',
					lexAnswer:
						'a) bewahren = erhalten / schützen | prächtig = eindrucksvoll / großartig.\n\nb) abhängig, sinnlos, Misstrauen, erfolglos.',
					grammarPrompt:
						'4. Nominalisierung und Komposita :\n\na) Nominalisieren Sie den Finalsatz mit „zur“ : „Man sammelt alte Handschriften, um das kulturelle Gedächtnis zu pflegen.“\n\nb) Verbinden Sie die Wörter zu einem korrekten Kompositum mit Artikel : (das Klima + der Schutz + das Projekt) / (die Bildung + der Austausch).\n\nc) Verbalisieren Sie : „Wegen der schnellen Entwicklung der Städte müssen Altstädte geschützt werden.“ (Beginnen Sie mit : Da sich die Städte...)',
					grammarAnswer:
						'a) Man sammelt alte Handschriften zur Pflege des kulturellen Gedächtnisses.\n\nb) das Klimaschutzprojekt / der Bildungsaustausch.\n\nc) Da sich die Städte schnell entwickeln, müssen Altstädte geschützt werden.',
					clozePrompt:
						'5. Ergänzen Sie die Lücken mit den passenden Wörtern : Sorgfalt — Quellen — Artikel — Kompositum.\n\nBei jedem (1) .......... bestimmt das letzte Wort den (2) .......... und die Pluralform. Zudem arbeiten gute Wissenschaftler stets mit (3) .......... und prüfen verlässliche (4) ........... genau.',
					clozeAnswer: '1) Kompositum   2) Artikel   3) Sorgfalt   4) Quellen',
					quizzes: {
						easy: {
							q: 'Ordnen Sie jedes Wort seinem korrekten morphologischen Antonym (Gegenteil) zu:',
							pairs: [
								{ left: 'abhängig', right: 'unabhängig' },
								{ left: 'sinnvoll', right: 'sinnlos' },
								{ left: 'das Vertrauen', right: 'das Misstrauen' },
								{ left: 'erfolgreich', right: 'erfolglos' }
							],
							explanation: 'تُشتق هذه الأضداد بإضافة un- أو miss- أو إبدال اللاحقة -voll بـ -los.'
						} as MatchingSpec,
						medium: {
							q: 'Verbinden Sie jedes Verb mit dem abgeleiteten Nomen (mit Artikel):',
							pairs: [
								{ left: 'bilden', right: 'die Bildung' },
								{ left: 'forschen', right: 'die Forschung' },
								{ left: 'erhalten', right: 'die Erhaltung' },
								{ left: 'übersetzen', right: 'die Übersetzung' }
							],
							explanation: 'الأسماء المشتقة بـ -ung مؤنثة دائماً وتأخذ الأداة „die“.'
						} as MatchingSpec,
						hard: {
							q: 'Ordnen Sie jedem BAC-Begriff das passende Synonym in derselben Wortart zu:',
							pairs: [
								{ left: 'bewahren (Verb)', right: 'erhalten (Verb)' },
								{ left: 'die Redlichkeit (Nomen)', right: 'die Ehrlichkeit (Nomen)' },
								{ left: 'schlicht (Adj.)', right: 'bescheiden (Adj.)' },
								{ left: 'überliefern (Verb)', right: 'weitergeben (Verb)' }
							],
							explanation: 'في البكالوريا يجب تطابق القسم الكلامي: فعل مع فعل، اسم مع اسم، صفة مع صفة.'
						} as MatchingSpec
					}
				},
				{
					classPrompt:
						'1. Klassifizieren Sie diese Wörter nach ihrer Wortbildung : die Baukunst - das Lesen - der Solarpark - die Wissenschaft - das Lernen - die Denkmalpflege.',
					classCols: [
						{ header: 'Komposita (Zusammensetzungen)', items: ['die Baukunst', 'der Solarpark', 'die Denkmalpflege'], mark: '0.5' },
						{ header: 'Substantivierte Verben / Suffixe', items: ['das Lesen', 'die Wissenschaft', 'das Lernen'], mark: '0.5' }
					],
					wordRows: [
						{
							verb: { given: true, value: 'entwickeln' },
							nomen: { value: 'die Entwicklung', mark: '0.25' },
							adjektiv: { value: 'entwicklungsfähig', mark: '0.25' }
						},
						{
							verb: { value: 'schützen', mark: '0.25' },
							nomen: { given: true, value: 'der Schutz' },
							adjektiv: { value: 'schützend', mark: '0.25' }
						},
						{
							verb: { value: 'pflegen', mark: '0.25' },
							nomen: { value: 'die Pflege', mark: '0.25' },
							adjektiv: { given: true, value: 'gepflegt' }
						}
					],
					lexPrompt:
						'3. Lexik im Kontext :\n\na) Nennen Sie ein Synonym zu : die Herkunft (Nomen) — gründlich (Adjektiv).\n\nb) Bilden Sie das Gegenteil : pünktlich — verständlich — wertvoll — tolerant.',
					lexAnswer:
						'a) die Herkunft = der Ursprung | gründlich = sorgfältig / genau.\n\nb) unpünktlich, unverständlich, wertlos, intolerant.',
					grammarPrompt:
						'4. Umformungen (Nominalstil und Verbalstil) :\n\na) Formen Sie in einen Konzessivsatz mit „obwohl“ um : „Trotz der knappen Rohstoffe erzielt die Region hohe Qualität.“\n\nb) Bilden Sie korrekte Komposita mit dem Grundwort : (die Sprache + die Kenntnis, im Plural!) / (die Kultur + das Erbe, im Singular mit Artikel).\n\nc) Nominalisieren Sie : „Weil man junge Fachkräfte gut ausbildet, steigt die Produktivität.“ (Beginnen Sie mit : Durch eine gute...)',
					grammarAnswer:
						'a) Obwohl die Rohstoffe knapp sind, erzielt die Region hohe Qualität.\n\nb) die Sprachkenntnisse / das Kulturerbe.\n\nc) Durch eine gute Ausbildung junger Fachkräfte steigt die Produktivität.',
					clozePrompt:
						'5. Setzen Sie die richtigen Wörter ein : Grundwort — Ausdauer — Genitiv — Fugenelement.\n\nBei dem Wort „Bildungsaustausch“ steht ein -s- als (1) .......... und „Austausch“ ist das (2) .......... Im Satz verlangt die Präposition „trotz“ den (3) .........., während Erfolg im Studium stets (4) .......... erfordert.',
					clozeAnswer: '1) Fugenelement   2) Grundwort   3) Genitiv   4) Ausdauer',
					quizzes: {
						easy: {
							q: 'Ordnen Sie jedem Adjektiv sein Antonym zu:',
							pairs: [
								{ left: 'pünktlich', right: 'unpünktlich' },
								{ left: 'wertvoll', right: 'wertlos' },
								{ left: 'tolerant', right: 'intolerant' },
								{ left: 'verständlich', right: 'unverständlich' }
							],
							explanation: 'تتكون الأضداد هنا بالسوابق un- / in- أو باللاحقة -los.'
						} as MatchingSpec,
						medium: {
							q: 'Verbinden Sie jedes Kompositum mit dem passenden Artikel (bestimmt durch das Grundwort):',
							pairs: [
								{ left: 'Kulturerbe (das Erbe)', right: 'das Kulturerbe' },
								{ left: 'Berufsausbildung (die Ausbildung)', right: 'die Berufsausbildung' },
								{ left: 'Bildungsaustausch (der Austausch)', right: 'der Bildungsaustausch' },
								{ left: 'Solarkraftwerk (das Werk)', right: 'das Solarkraftwerk' }
							],
							explanation: 'أداة التعريف في الأسماء المركبة يحددها دائماً الاسم الأخير (Grundwort).'
						} as MatchingSpec,
						hard: {
							q: 'Verbinden Sie die nominalen Ausdrücke mit den entsprechenden Nebensätzen:',
							pairs: [
								{ left: 'trotz der Hitze', right: 'obwohl es heiß ist' },
								{ left: 'wegen des Fleißes', right: 'weil man fleißig ist' },
								{ left: 'zur Erhaltung', right: 'um zu erhalten' },
								{ left: 'während des Lesens', right: 'während man liest' }
							],
							explanation: 'التحويل بين التركيب الاسمي (Nominalstil) والجملة الفعلية (Verbalstil) مهارة محورية في BAC.'
						} as MatchingSpec
					}
				},
				{
					classPrompt:
						'1. Ordnen Sie die Substantive ihrem passenden Artikel zu : Bildung — Wissenschaft — Lernen — Wissen — Überlieferung — Lesen.',
					classCols: [
						{ header: 'Artikel „die“ (-ung / -schaft)', items: ['Bildung', 'Wissenschaft', 'Überlieferung'], mark: '0.5' },
						{ header: 'Artikel „das“ (subst. Infinitiv)', items: ['Lernen', 'Wissen', 'Lesen'], mark: '0.5' }
					],
					wordRows: [
						{
							verb: { given: true, value: 'erhalten' },
							nomen: { value: 'die Erhaltung', mark: '0.25' },
							adjektiv: { value: 'erhaltenswert', mark: '0.25' }
						},
						{
							verb: { value: 'austauschen', mark: '0.25' },
							nomen: { given: true, value: 'der Austausch' },
							adjektiv: { value: 'austauschbar', mark: '0.25' }
						},
						{
							verb: { value: 'vermitteln', mark: '0.25' },
							nomen: { value: 'die Vermittlung', mark: '0.25' },
							adjektiv: { given: true, value: 'vermittelnd' }
						}
					],
					lexPrompt:
						'3. Wortschatzarbeit :\n\na) Finden Sie ein Synonym zu : die Methode (Nomen) — fördern (Verb).\n\nb) Bilden Sie das Gegenteil : ordentlich — möglich — verantwortungsvoll — der Erfolg.',
					lexAnswer:
						'a) die Methode = das Verfahren / die Arbeitsweise | fördern = unterstützen / stärken.\n\nb) unordentlich, unmöglich, verantwortungslos, der Misserfolg.',
					grammarPrompt:
						'4. Satzumformung und Wortbildung :\n\na) Ersetzen Sie „bei“ durch einen Temporalsatz mit „wenn“ : „Beim Lesen alter Schriften entdeckt man wichtige Gedanken.“\n\nb) Bilden Sie zu „die Natur + der Schutz + das Gesetz“ das korrekte Kompositum mit Artikel.\n\nc) Nominalisieren Sie : „Obwohl die Vorbereitung lange dauerte, gelang das Projekt.“ (Beginnen Sie mit : Trotz der...)',
					grammarAnswer:
						'a) Wenn man alte Schriften liest, entdeckt man wichtige Gedanken.\n\nb) das Naturschutzgesetz.\n\nc) Trotz der langen Vorbereitung gelang das Projekt.',
					clozePrompt:
						'5. Ergänzen Sie mit : Großschreibung — Verben — Endung — Artikel.\n\nIm Deutschen schreibt man alle Nomen am Anfang groß; diese (1) .......... gilt auch für substantivierte (2) .......... wie „das Lesen“. Nomen mit der (3) .......... „-heit“ tragen immer den (4) .......... „die“.',
					clozeAnswer: '1) Großschreibung   2) Verben   3) Endung   4) Artikel',
					quizzes: {
						easy: {
							q: 'Verbinden Sie jedes Substantiv-Suffix mit dem festen Genus/Artikel im Deutschen:',
							pairs: [
								{ left: '-ung (die Bildung)', right: 'Feminin (die)' },
								{ left: '-heit / -keit (die Klarheit)', right: 'Feminin (die)' },
								{ left: '-schaft (die Wissenschaft)', right: 'Feminin (die)' },
								{ left: 'Infinitiv-Nomen (das Lesen)', right: 'Neutrum (das)' }
							],
							explanation: 'اللواحق -ung / -heit / -keit / -schaft مؤنثة دائماً، والمصدر المحوّل لاسم محايد دائماً.'
						} as MatchingSpec,
						medium: {
							q: 'Ordnen Sie jedem Verb die zugehörige Wortfamilie (Nomen + Adjektiv) zu:',
							pairs: [
								{ left: 'erhalten', right: 'die Erhaltung / erhaltenswert' },
								{ left: 'vermitteln', right: 'die Vermittlung / vermittelnd' },
								{ left: 'gestalten', right: 'die Gestaltung / gestalterisch' },
								{ left: 'austauschen', right: 'der Austausch / austauschbar' }
							],
							explanation: 'الاشتقاق القياسي يحفظ الجذر ويضبط الصيغة النحوية.'
						} as MatchingSpec,
						hard: {
							q: 'Verbinden Sie jedes Wort mit seinem genauen Gegenteil:',
							pairs: [
								{ left: 'der Erfolg', right: 'der Misserfolg' },
								{ left: 'verantwortungsvoll', right: 'verantwortungslos' },
								{ left: 'ordentlich', right: 'unordentlich' },
								{ left: 'sparen', right: 'verschwenden' }
							],
							explanation: 'يميز المعجم الدقيق بين سوابق النفي الصرفية والأضداد المعجمية.'
						} as MatchingSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const { quizQuestion, finalAnswer } = buildMatchingPayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'II. Sprachfähigkeit — A) Wortschatz und Wortbildung',
				points: 7,
				instruction: 'Bearbeiten Sie die folgenden Aufgaben zu Wortschatz, Morphologie und Syntax (7 Punkte — BAC 3AS LE) :',
				content: [
					{
						type: 'text',
						content: chosen.classPrompt
					},
					buildGermanClassificationTableBlock({ columns: chosen.classCols }),
					{
						type: 'text',
						content: '2. Ergänzen Sie die Wortfamilie (Verb | Nomen mit Artikel | Adjektiv) :'
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
				trimesterId: 't1',
				difficulty,
				domain: 'wortschatz_wortbildung',
				examRole: 'linguistic_competence',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'في جدول عائلة الكلمات، اكتب كل اسم بحرف كبير في البداية مرفقاً بأداة التعريف (der / die / das).',
					'في المرادفات والأضداد، تأكد من تطابق النوع النحوي (فعل مقابل فعل، صفة مقابل صفة).',
					'في الأسماء المركبة، الكلمة الأخيرة (Grundwort) هي التي تقرر أداة التعريف.'
				],
				solutionStepsAr: [
					'التصنيف الدلالي والصرفي في جدول العمودين (1 نقطة).',
					'إكمال جدول عائلة الكلمات الثلاثي (1.5 نقطة).',
					'تقديم المرادفات والأضداد بالسوابق واللواحق الدقيقة (1.5 نقطة).',
					'التحويل الاسمي والفعلي والمركّبات وملء الفراغات (3 نقاط).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. LINGUISTIC COMPETENCE (7 Pkt.): Vorgangs- & Zustandspassiv (with SVG)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_tpl_3as_le_t1_ling_passiv_konstruktionen',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'grammatik_syntax',
		titleAr: 'الكفاءة اللغوية (7 نقاط — بكالوريا): المبني للمجهول (Vorgangs-/Zustandspassiv)، الأفعال الناقصة و von/durch',
		curriculumLessonId: 'ger_lesson_3as_le_t1_vorgangspassiv_zustandspassiv',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					svgTitle: 'Passiv-Zeiten und Modalverben (BAC)',
					svgSub: 'Vorgangspassiv vs. Zustandspassiv',
					svgCols: [
						{ header: 'Präsens / Prät.', rule: 'wird / wurde + P.II', examples: 'Die Moschee wird saniert.' },
						{ header: 'Perfekt Passiv', rule: 'ist + P.II + worden', examples: 'Der Text ist geprüft worden.' },
						{ header: 'Modal + Passiv', rule: 'muss/musste + P.II + werden', examples: 'Es muss geschützt werden.' }
					],
					classPrompt:
						'1. Ordnen Sie die Sätze nach Vorgangspassiv oder Zustandspassiv : Die Kasbah wird restauriert — Die Tür ist geöffnet — Der Brief wurde geschrieben — Das Museum ist sauber renoviert — Die Bücher werden sortiert — Die Aufgabe ist schon gelöst.',
					classCols: [
						{
							header: 'Vorgangspassiv (Handlung)',
							items: ['Die Kasbah wird restauriert', 'Der Brief wurde geschrieben', 'Die Bücher werden sortiert'],
							mark: '0.75'
						},
						{
							header: 'Zustandspassiv (Ergebnis)',
							items: ['Die Tür ist geöffnet', 'Das Museum ist sauber renoviert', 'Die Aufgabe ist schon gelöst'],
							mark: '0.75'
						}
					],
					conjPrompt:
						'2. Setzen Sie die richtige Passivform ein :\n\na) Das alte Manuskript (restaurieren, Präteritum Passiv) gestern im Labor .......... .\n\nb) Die neuen Solarmodule (müssen / installieren, Präsens Passiv) bis Herbst .......... .\n\nc) Der wichtige Vertrag (unterschreiben, Perfekt Passiv) bereits .......... .\n\nd) Heute (unterrichten, Präsens Passiv unpersönlich) in der Bibliothek fleißig .......... .',
					conjAnswer:
						'a) wurde ... restauriert.\n\nb) müssen ... installiert werden.\n\nc) ist ... unterschrieben worden.\n\nd) wird ... unterrichtet.',
					transformPrompt:
						'3. Formen Sie vom Aktiv ins Passiv (oder umgekehrt) um :\n\na) Aktiv zu Passiv : „Junge Architekten entwerfen ein nachhaltiges Wohnviertel.“\n\nb) Aktiv zu Passiv : „Starke Regenfälle beschädigten die alte Brücke.“ (Achten Sie auf von/durch!)\n\nc) Aktiv zu Passiv : „Man dankt den ehrenamtlichen Helfern herzlich.“\n\nd) Passiv zu Aktiv : „Die alten Quellen müssen von den Studierenden genau geprüft werden.“',
					transformAnswer:
						'a) Ein nachhaltiges Wohnviertel wird von jungen Architekten entworfen.\n\nb) Die alte Brücke wurde durch starke Regenfälle beschädigt.\n\nc) Den ehrenamtlichen Helfern wird herzlich gedankt.\n\nd) Die Studierenden müssen die alten Quellen genau prüfen.',
					clozePrompt:
						'4. Ergänzen Sie den Lückentext mit : von — durch — worden — müssen.\n\nDas Projekt ist rechtzeitig vorbereitet (1) .......... . Die Entwürfe (2) .......... nun noch (3) .......... der Fachkommission geprüft werden, damit die Sanierung nicht (4) .......... unerwartete Verzögerungen gestoppt wird.',
					clozeAnswer: '1) worden   2) müssen   3) von   4) durch',
					quizzes: {
						easy: {
							q: 'Wählen Sie die korrekte Perfekt-Passiv-Form:',
							sentence: 'Die Große Moschee von Tlemcen ist vor einigen Jahren sorgfältig restauriert ___.',
							correct: 'worden',
							distractors: ['geworden', 'werden', 'wurde'],
							explanation: 'في Perfekt Passiv يفقد الفعل werden البادئة ge- ويُستعمل بصيغة „worden“.'
						} as ClozeSpec,
						medium: {
							q: 'Wählen Sie die richtige Präposition für ein Naturereignis als Ursache im Passiv:',
							sentence: 'Die Küstenstraße wurde ___ einen starken Sturm teilweise beschädigt.',
							correct: 'durch',
							distractors: ['von', 'bei', 'seit'],
							explanation: 'نستعمل „durch + Akkusativ“ عند التعبير عن سبب طبيعي أو وسيلة غير عاقلة.'
						} as ClozeSpec,
						hard: {
							q: 'Ergänzen Sie die korrekte Passivform mit Modalverb im Präteritum:',
							sentence: 'Alle historischen Urkunden ___ vor dem Transport sicher verpackt werden.',
							correct: 'mussten',
							distractors: ['müssen', 'wurden', 'sind'],
							explanation: 'الجملة في الماضي والفاعل جمع (Alle historischen Urkunden)، لذا نختار „mussten“.'
						} as ClozeSpec
					}
				},
				{
					svgTitle: 'Agens und Kasus im Passiv (BAC)',
					svgSub: 'Akkusativ -> Nominativ | Dativ bleibt Dativ',
					svgCols: [
						{ header: 'von + Dativ', rule: 'Person / Institution', examples: 'von einer Forscherin' },
						{ header: 'durch + Akkusativ', rule: 'Mittel / Ursache', examples: 'durch saubere Technik' },
						{ header: 'Dativ-Verben', rule: 'helfen, danken, folgen', examples: 'Dem Gast wird gedankt.' }
					],
					classPrompt:
						'1. Klassifizieren Sie die Agens-Angaben nach „von + Dativ“ (Person/Institution) oder „durch + Akkusativ“ (Ursache/Mittel) : die Ingenieurin — ein Erdbeben — der Lehrer — digitale Archive — das Team — eine Überschwemmung.',
					classCols: [
						{ header: 'von (+ Dativ)', items: ['von der Ingenieurin', 'vom Lehrer', 'vom Team'], mark: '0.75' },
						{ header: 'durch (+ Akkusativ)', items: ['durch ein Erdbeben', 'durch digitale Archive', 'durch eine Überschwemmung'], mark: '0.75' }
					],
					conjPrompt:
						'2. Ergänzen Sie die richtige Verbform im Passiv :\n\na) Hier (sprechen, Präsens Passiv) drei Fremdsprachen .......... .\n\nb) Die Ergebnisse (veröffentlichen, Perfekt Passiv) heute Morgen .......... .\n\nc) Das Wasser (können / sparen, Präsens Passiv) durch moderne Bewässerung .......... .\n\nd) Die Werkstatt (schließen, Zustandspassiv Präteritum) gestern schon um 17 Uhr .......... .',
					conjAnswer:
						'a) werden ... gesprochen.\n\nb) sind ... veröffentlicht worden.\n\nc) kann ... gespart werden.\n\nd) war ... geschlossen.',
					transformPrompt:
						'3. Transformieren Sie genau nach den Passivregeln :\n\na) Aktiv zu Passiv : „Man musste die alten Lehmwände regelmäßig schützen.“\n\nb) Aktiv zu Passiv : „Der Professor hilft dem neuen Studenten bei der Übersetzung.“\n\nc) Aktiv zu Passiv : „Ein ruhiges Klima fördert die Konzentration in der Bibliothek.“\n\nd) Passiv zu Aktiv : „Von der Gemeinde wurden hundert Bäume gepflanzt.“',
					transformAnswer:
						'a) Die alten Lehmwände mussten regelmäßig geschützt werden.\n\nb) Dem neuen Studenten wird vom Professor bei der Übersetzung geholfen.\n\nc) Die Konzentration in der Bibliothek wird durch ein ruhiges Klima gefördert.\n\nd) Die Gemeinde pflanzte hundert Bäume.',
					clozePrompt:
						'4. Füllen Sie die Lücken aus : Dem — wird — worden — werden.\n\n(1) .......... Schüler (2) .......... im Unterricht genau erklärt, wie komplexe Sätze ins Passiv gesetzt (3) ........... Viele Übungen sind bereits gemeinsam gelöst (4) .......... .',
					clozeAnswer: '1) Dem   2) wird   3) werden   4) worden',
					quizzes: {
						easy: {
							q: 'Ergänzen Sie das korrekte Dativobjekt im Passivsatz:',
							sentence: '___ fleißigen Auszubildenden wird vom Meister herzlich gedankt.',
							correct: 'Den',
							distractors: ['Die', 'Der', 'Das'],
							explanation: 'الفعل „danken“ يطلب Dativ دائماً (هنا جمع: Den fleißigen Auszubildenden) ويبقى في Dativ عند البناء للمجهول.'
						} as ClozeSpec,
						medium: {
							q: 'Wählen Sie das richtige Verb für ein Zustandspassiv im Präsens:',
							sentence: 'Die Restaurierung ist beendet; die alte Bibliothek ___ ab heute wieder geöffnet.',
							correct: 'ist',
							distractors: ['wird', 'hat', 'wurde'],
							explanation: 'Zustandspassiv للحاضر يتكون من „ist + Partizip II“ للتعبير عن الحالة الجاهزة.'
						} as ClozeSpec,
						hard: {
							q: 'Wählen Sie das korrekte Hilfsverb im unpersönlichen Passiv mit Dativobjekt:',
							sentence: 'Den beiden Gruppen ___ bei der Vorbereitung auf das Abitur gezielt geholfen.',
							correct: 'wird',
							distractors: ['werden', 'sind', 'haben'],
							explanation: 'في المجهول مع Dativ لا يوجد فاعل جمع مرفوع، فيصرف الفعل المساعد دائماً في المفرد الغائب „wird“.'
						} as ClozeSpec
					}
				},
				{
					svgTitle: 'Aktiv -> Passiv im Präteritum & Perfekt',
					svgSub: 'Wegfall von „man“ & Verbendstellung',
					svgCols: [
						{ header: 'ohne „man“', rule: 'man streichen', examples: 'Hier wird sauber gearbeitet.' },
						{ header: 'Prät. Modalverb', rule: 'konnte + P.II + werden', examples: 'Es konnte gerettet werden.' },
						{ header: 'Nebensatz Passiv', rule: 'dass ... P.II + wird', examples: '..., dass es geprüft wird.' }
					],
					classPrompt:
						'1. Ordnen Sie die Sätze nach „Passiv Präsens“ oder „Passiv Vergangenheit (Präteritum / Perfekt)“ : Das Buch wird gedruckt — Der Plan wurde geändert — Die Regel ist erklärt worden — Solarstrom wird genutzt — Die Schule war renoviert — Die Texte werden übersetzt.',
					classCols: [
						{
							header: 'Passiv Präsens',
							items: ['Das Buch wird gedruckt', 'Solarstrom wird genutzt', 'Die Texte werden übersetzt'],
							mark: '0.75'
						},
						{
							header: 'Passiv Vergangenheit',
							items: ['Der Plan wurde geändert', 'Die Regel ist erklärt worden', 'Die Schule war renoviert'],
							mark: '0.75'
						}
					],
					conjPrompt:
						'2. Setzen Sie die Verben ins Passiv :\n\na) Im Jahr 1931 (gründen, Präteritum Passiv) freie Reformschulen in Algerien .......... .\n\nb) Diese wichtigen Quellen (sollen / zitieren, Präsens Passiv) korrekt .......... .\n\nc) Bis gestern (abschließen, Perfekt Passiv) alle Vorarbeiten .......... .\n\nd) Die Ausstellung (sein / vorbereiten, Zustandspassiv Präsens) bereits vollständig .......... .',
					conjAnswer:
						'a) wurden ... gegründet.\n\nb) sollen ... zitiert werden.\n\nc) sind ... abgeschlossen worden.\n\nd) ist ... vorbereitet.',
					transformPrompt:
						'3. Formen Sie die folgenden Sätze um :\n\na) Aktiv zu Passiv : „Die Bibliothekarin hat die alten Bücher sorgfältig geordnet.“\n\nb) Aktiv zu Passiv : „Man darf historische Mauern niemals beschädigen.“\n\nc) Aktiv zu Passiv im Nebensatz : „Es ist wichtig, dass man die Energiequellen schont.“\n\nd) Passiv zu Aktiv : „Durch ein Stipendium wurde dem jungen Forscher geholfen.“',
					transformAnswer:
						'a) Die alten Bücher sind von der Bibliothekarin sorgfältig geordnet worden.\n\nb) Historische Mauern dürfen niemals beschädigt werden.\n\nc) Es ist wichtig, dass die Energiequellen geschont werden.\n\nd) Ein Stipendium half dem jungen Forscher.',
					clozePrompt:
						'4. Ergänzen Sie die Lücken mit : wurden — dürfen — durch — worden.\n\nIm letzten Jahrhundert (1) .......... viele historische Schriften gesammelt und (2) .......... gedruckte Ausgaben verbreitet. Kulturelle Stätten (3) .......... niemals beschädigt werden, da sie mit Mühe erhalten (4) .......... sind.',
					clozeAnswer: '1) wurden   2) durch   3) dürfen   4) worden',
					quizzes: {
						easy: {
							q: 'Vervollständigen Sie den Passivsatz im Präteritum:',
							sentence: 'Die ersten Landkarten von Al-Idrisi ___ im Mittelalter mit großer Sorgfalt gezeichnet.',
							correct: 'wurden',
							distractors: ['werden', 'worden', 'sind'],
							explanation: 'فاعل جمع في الماضي البسيط (Präteritum Passiv) يتطلب „wurden + Partizip II“.'
						} as ClozeSpec,
						medium: {
							q: 'Welche Form steht im Nebensatz am Ende beim Passiv Präsens?',
							sentence: 'Die Lehrkraft wünscht, dass die Aufgabe rechtzeitig abgegeben ___.',
							correct: 'wird',
							distractors: ['werden', 'worden', 'ist'],
							explanation: 'الفاعل المفرد „die Aufgabe“ يتطلب „wird“ في آخر الجملة التابعة.'
						} as ClozeSpec,
						hard: {
							q: 'Wählen Sie die korrekte Passiv-Form mit „dürfen“ (man darf nicht):',
							sentence: 'Wertvolle Originalhandschriften ___ im Lesesaal nicht mit Tinte berührt werden.',
							correct: 'dürfen',
							distractors: ['darf', 'werden', 'wurden'],
							explanation: 'الفاعل جمع „Originalhandschriften“ يطابق الفعل الناقص „dürfen“.'
						} as ClozeSpec
					}
				}
			];

			const vIdx = rng.int(0, pool.length - 1);
			const chosen = pool[vIdx];
			const svgStr = svgGermanConjugationChart({
				title: chosen.svgTitle,
				subtitle: chosen.svgSub,
				columns: chosen.svgCols,
				width: 560
			});
			const svgPath = saveGermanSvgAsset(`3as_le_t1_passiv_v${vIdx + 1}`, svgStr);

			const { quizQuestion, finalAnswer } = buildClozePayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'II. Sprachfähigkeit — B) Grammatik und Syntax (Passiv)',
				points: 7,
				instruction: 'Betrachten Sie die Übersichtstafel und lösen Sie die Grammatikaufgaben (7 Punkte — BAC 3AS LE) :',
				content: [
					{
						type: 'image',
						src: svgPath,
						width: 'full',
						caption: 'Grammatikübersicht : Vorgangs- und Zustandspassiv, Modalverben und Agens (BAC 3AS LE).'
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
				trimesterId: 't1',
				difficulty,
				domain: 'grammatik_syntax',
				examRole: 'linguistic_competence',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'في Perfekt Passiv تذكّر دائماً الصيغة: „ist/sind + Partizip II + worden“ (بدون ge-).',
					'الضمير „man“ يُحذف كلياً عند التحويل إلى المبني للمجهول، والمفعول به Dativ يبقى في Dativ.',
					'ميّز بين „von + Dativ“ للعاقل والمؤسسات و„durch + Akkusativ“ للسبب أو الوسيلة.'
				],
				solutionStepsAr: [
					'تصنيف الجمل بين مجهول الحدث والحالة أو حروف الجر (1.5 نقطة).',
					'تصريف أفعال المبني للمجهول في الأزمنة ومع الأفعال الناقصة (2 نقطتان).',
					'تحويل الجمل بين المعلوم والمجهول بدقة (2 نقطتان).',
					'إكمال النص القصير بالكلمات النحوية المناسبة (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. WRITTEN EXPRESSION (6 Pkt. — Integration): Kulturerbe & Wissenschaft
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_tpl_3as_le_t1_writ_kulturerbe_identitaet',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'schriftlicher_ausdruck',
		titleAr: 'التعبير الكتابي (6 نقاط — بكالوريا): التراث المعماري، التراث العلمي الإسلامي والهوية الثقافية',
		curriculumLessonId: 'ger_lesson_3as_le_t1_kulturerbe_algerien_baukunst',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					themaEinsPrompt:
						'Schreiben Sie einen Meinungsartikel (120 bis 145 Wörter) für die Schülerzeitung über die Bedeutung des Schutzes historischer Stätten wie der Kasbah von Algier, der Großen Moschee von Tlemcen und des M’Zab-Tals.',
					themaEinsStichpunkte: [
						'Erklären Sie, warum alte Bauwerke mehr als alte Steine sind (Identität und nachhaltige Baukunst).',
						'Erwähnen Sie auch die Pflege historischer Handschriften und früher Gelehrter wie Al-Zahrawi und Al-Idrisi.',
						'Machen Sie einen konkreten Vorschlag, wie Jugendliche Denkmäler im Alltag schützen können.'
					],
					themaZweiPrompt:
						'„Wer seine kulturellen Wurzeln kennt, gestaltet die Zukunft sicherer und bewusster.“ Nehmen Sie zu dieser Aussage in einem klar gegliederten Aufsatz (120 bis 145 Wörter) Stellung.',
					modelAnswer:
						'Viele junge Menschen betrachten historische Bauwerke heute leider nur als alte Mauern ohne Bezug zur Gegenwart. Dabei stellt sich die wichtige Frage, warum der Schutz unseres Kulturerbes so bedeutsam bleibt.\n\nErstens bezeugen Stätten wie die Kasbah von Algier, die Große Moschee von Tlemcen oder das M’Zab-Tal den Fleiß und die reife Baukunst früherer Generationen. Wer diese Denkmäler studiert, versteht nachhaltiges Bauen und erkennt die eigene Geschichte.\n\nZweitens erinnert uns die Pflege historischer Handschriften an Gelehrte wie Al-Zahrawi, Al-Khwarizmi und Al-Idrisi, deren Genauigkeit bis heute hohen Respekt verdient. Natürlich kostet die Restaurierung Fachwissen und finanzielle Mittel, doch Vernachlässigung wäre ein unwiederbringlicher Verlust.\n\nZusammenfassend lässt sich sagen, dass ein lebendiges Geschichtsbewusstsein die Jugend stärkt. Wer seine kulturellen Wurzeln achtet, gestaltet auch die Zukunft verantwortungsvoll und selbstbewusst.',
					rubricSummary:
						'Aufgabenbezug & Inhalt (1.5) + Gliederung & Konnektoren (1.5) + Grammatik & Passiv/Nebensätze (1.5) + Wortschatz & Rechtschreibung (1.5).',
					quizzes: {
						easy: {
							q: 'Ordnen Sie die Redemittel den passenden Teilen eines BAC-Aufsatzes zu:',
							categories: ['Einleitung (مقدمة)', 'Schlussfolgerung (خاتمة)'],
							items: [
								{ text: 'In der heutigen Welt gewinnt dieses Thema an Bedeutung.', category: 0 },
								{ text: 'Dabei stellt sich die wichtige Frage, warum ...', category: 0 },
								{ text: 'Zusammenfassend lässt sich sagen, dass ...', category: 1 },
								{ text: 'Abschließend bin ich der Ansicht, dass ...', category: 1 }
							],
							explanation: 'العبارات الافتتاحية تقدم السياق والسؤال المحوري، بينما تلخص عبارات الخاتمة الموقف النهائي.'
						} as DragDropSpec,
						medium: {
							q: 'Ordnen Sie die Konnektoren nach ihrer logischen Funktion im Aufsatz:',
							categories: ['Aufzählung / Ergänzung', 'Einschränkung / Gegensatz'],
							items: [
								{ text: 'Erstens', category: 0 },
								{ text: 'Darüber hinaus', category: 0 },
								{ text: 'Obwohl', category: 1 },
								{ text: 'Trotzdem', category: 1 }
							],
							explanation: 'تستعمل „Erstens / Darüber hinaus“ لتسلسل الحجج، و„Obwohl / Trotzdem“ للموازنة والاستدراك.'
						} as DragDropSpec,
						hard: {
							q: 'Unterscheiden Sie zwischen gehobenem BAC-Stil und umgangssprachlichen Ausdrücken, die im Aufsatz vermieden werden:',
							categories: ['Gehobener BAC-Stil', 'Umgangssprache vermeiden'],
							items: [
								{ text: 'Meines Erachtens trägt Bildung entscheidend bei.', category: 0 },
								{ text: 'Aus diesem Grund sollten Denkmäler gepflegt werden.', category: 0 },
								{ text: 'Also ehrlich, das ist mir völlig egal.', category: 1 },
								{ text: 'Na ja, irgendwie macht das halt jeder so.', category: 1 }
							],
							explanation: 'يتطلب مقال البكالوريا أسلوباً فصيحاً رصيناً خالياً من التعابير العامية.'
						} as DragDropSpec
					}
				},
				{
					themaEinsPrompt:
						'Verfassen Sie einen strukturierten Beitrag (120 bis 145 Wörter) über die Vorbildrolle früher Wissenschaftler wie Al-Khwarizmi, Al-Zahrawi und Ibn Al-Haytham für heutige Schülerinnen und Schüler.',
					themaEinsStichpunkte: [
						'Nennen Sie zwei Fachgebiete, in denen diese Gelehrten Hervorragendes geleistet haben.',
						'Betonen Sie Werte wie genaue Beobachtung, Ehrlichkeit und Geduld beim Lernen.',
						'Zeigen Sie, wie Schulen und Bibliotheken dieses Erbe lebendig halten können.'
					],
					themaZweiPrompt:
						'„Methodische Geduld und gründliches Prüfen von Quellen sind heute wichtiger denn je.“ Erörtern Sie diese These in 120 bis 145 Wörtern mit passenden Beispielen.',
					modelAnswer:
						'In der modernen Wissenschaftsgeschichte wird manchmal übersehen, wie stark frühere Gelehrte den Fortschritt geprägt haben. Warum lohnt sich ein genauer Blick auf das Werk klassischer Denker?\n\nZunächst entwickelten Forscher wie Al-Khwarizmi in der Mathematik, Al-Zahrawi in der Medizin und Ibn Al-Haytham in der Optik verlässliche Arbeitsweisen. Ihre Schriften zeigen, dass sorgfältige Beobachtung, präzise Messungen und klare Dokumentation die Grundlage jeder wichtigen Entdeckung bilden.\n\nDarüber hinaus lehrt dieses reiche Erbe geistige Bescheidenheit und Ausdauer. Obwohl moderne Labore heute über schnelle Computer verfügen, bleiben Geduld, Redlichkeit und überprüfbare Beweise unverzichtbar. Schulen und Bibliotheken sollten diese historischen Quellen deshalb regelmäßig und anschaulich vermitteln.\n\nAbschließend meine ich, dass die Erinnerung an wissenschaftliche Vorbilder junge Lernende motiviert, selbst mit Fleiß, Neugier und Verantwortung zu forschen und ihr Wissen zum Wohle der gesamten Gesellschaft sinnvoll einzusetzen.',
					rubricSummary:
						'Thematische Treffsicherheit (1.5) + Logischer Aufbau in 4 Absätzen (1.5) + Satzbau & Grammatik (1.5) + Wortschatz & Großschreibung (1.5).',
					quizzes: {
						easy: {
							q: 'Ordnen Sie diese Verhaltensweisen den wissenschaftlichen Tugenden oder den Lernfehlern zu:',
							categories: ['Wissenschaftliche Tugenden', 'Lernfehler vermeiden'],
							items: [
								{ text: 'Quellen sorgfältig überprüfen', category: 0 },
								{ text: 'Geduldig und systematisch üben', category: 0 },
								{ text: 'Ohne Verständnis abschreiben', category: 1 },
								{ text: 'Ungeprüfte Gerüchte übernehmen', category: 1 }
							],
							explanation: 'المقال الرصين يربط التميز العلمي بالمنهجية والأمانة العلمية.'
						} as DragDropSpec,
						medium: {
							q: 'Klassifizieren Sie die Redemittel nach Begründung oder Schlussfolgerung:',
							categories: ['Begründung / Ursache', 'Folgerung / Ergebnis'],
							items: [
								{ text: 'weil / da', category: 0 },
								{ text: 'aufgrund + Genitiv', category: 0 },
								{ text: 'deshalb / folglich', category: 1 },
								{ text: 'sodass', category: 1 }
							],
							explanation: 'توضح أدوات التعليل السبب، بينما تعرض أدوات النتيجة الأثر المترتب.'
						} as DragDropSpec,
						hard: {
							q: 'Ordnen Sie die Sätze den Aufgaben der Einleitung oder des Hauptteils zu:',
							categories: ['Aufgabe der Einleitung', 'Aufgabe des Hauptteils'],
							items: [
								{ text: 'Das Thema knapp aktuell einordnen', category: 0 },
								{ text: 'Eine klare Leitfrage formulieren', category: 0 },
								{ text: 'Argumente mit Beispielen belegen', category: 1 },
								{ text: 'Ein Gegenargument sachlich abwägen', category: 1 }
							],
							explanation: 'تضع المقدمة الإطار والإشكالية، بينما يطور العرض الحجج والأمثلة والموازنة.'
						} as DragDropSpec
					}
				},
				{
					themaEinsPrompt:
						'Schreiben Sie einen Erörterungsaufsatz (120 bis 145 Wörter) zu folgendem Thema : „Wie lassen sich moderne Stadtentwicklung und der Schutz historischer Viertel in Algerien miteinander verbinden?“',
					themaEinsStichpunkte: [
						'Nennen Sie den Bedarf an modernen Schulen, Straßen und Wohnungen.',
						'Betonen Sie den Wert historischer Wahrzeichen (z. B. Constantine, Beni Hammad, Tlemcen).',
						'Schlagen Sie konkrete Maßnahmen zur Zusammenarbeit von Fachleuten und Jugend vor.'
					],
					themaZweiPrompt:
						'„Die Bewahrung historischer Bibliotheken und Denkmäler ist eine gemeinsame Aufgabe von Staat, Schule und Jugend.“ Schreiben Sie dazu Ihre begründete Stellungnahme (120 bis 145 Wörter).',
					modelAnswer:
						'Immer mehr Städte stehen vor der anspruchsvollen Aufgabe, moderne Infrastruktur zu schaffen, ohne historische Viertel zu gefährden. Wie lässt sich notwendiger Baufortschritt mit sorgfältigem Denkmalschutz sinnvoll verbinden?\n\nEinerseits brauchen wachsende Gemeinden sichere Straßen, Schulen und umweltfreundliche Wohnungen. Andererseits verleihen Wahrzeichen wie die Brücken von Constantine oder die Qal’a der Beni Hammad jeder Region ihr unverwechselbares Gesicht und fördern das historische Lernen im Alltag.\n\nDeshalb empfiehlt es sich, bewährte Handwerkstechniken genau zu dokumentieren und junge Menschen durch lokale Schulprojekte aktiv in die Pflege von Bibliotheken und Altstädten einzubinden. Auf diese Weise wächst echtes Verantwortungsgefühl.\n\nZusammenfassend bin ich überzeugt, dass kluge Stadtplanung beide Ziele erfolgreich vereinen kann: Sie bewahrt das wertvolle Erbe vergangener Jahrhunderte und bietet zugleich zeitgemäße Lebensqualität für kommende Generationen.',
					rubricSummary:
						'Ausgewogene Argumentation (1.5) + Absatzgliederung & Kohäsion (1.5) + Grammatische Korrektheit (1.5) + Wortschatz & Orthographie (1.5).',
					quizzes: {
						easy: {
							q: 'Ordnen Sie diese Begriffe den beiden Seiten der Stadtplanung zu:',
							categories: ['Moderne Infrastruktur', 'Denkmalschutz & Erbe'],
							items: [
								{ text: 'neue Schulen und sichere Wege', category: 0 },
								{ text: 'saubere Wasserversorgung', category: 0 },
								{ text: 'Restaurierung alter Mauern', category: 1 },
								{ text: 'Pflege historischer Bibliotheken', category: 1 }
							],
							explanation: 'الموازنة بين البنية الحديثة وصيانة المعالم التاريخية فكرة مركزية في هذا الموضوع.'
						} as DragDropSpec,
						medium: {
							q: 'Ordnen Sie die Ausdrücke nach „Zweck / Ziel“ oder „Vorschlag / Empfehlung“:',
							categories: ['Ziel / Zweck', 'Vorschlag / Empfehlung'],
							items: [
								{ text: 'um das Erbe zu bewahren', category: 0 },
								{ text: 'damit Altstädte erhalten bleiben', category: 0 },
								{ text: 'Es empfiehlt sich, ... zu ...', category: 1 },
								{ text: 'Man sollte Projekte fördern.', category: 1 }
							],
							explanation: 'تعبّر الجمل الغائية عن الهدف، بينما تقدم الأفعال الناقصة وعبارات التوصية الحلول العملية.'
						} as DragDropSpec,
						hard: {
							q: 'Unterscheiden Sie korrekte Großschreibung im Deutschen von fehlerhafter Kleinschreibung:',
							categories: ['Korrekt (BAC-reif)', 'Fehlerhaft (vermeiden)'],
							items: [
								{ text: 'das kulturelle Erbe schützen', category: 0 },
								{ text: 'beim Lesen historischer Quellen', category: 0 },
								{ text: 'die pflege alter bauwerke', category: 1 },
								{ text: 'mit großer sorgfalt arbeiten', category: 1 }
							],
							explanation: 'الكتابة الكبيرة للأسماء (Großschreibung) شرط أساسي في تصحيح مقالات البكالوريا.'
						} as DragDropSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const { quizQuestion, finalAnswer } = buildDragDropPayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'III. Schriftlicher Ausdruck',
				points: 6,
				instruction: 'Wählen Sie EINES der beiden folgenden Themen aus und verfassen Sie einen zusammenhängenden Text (6 Punkte — BAC 3AS LE) :',
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
				trimesterId: 't1',
				difficulty,
				domain: 'schriftlicher_ausdruck',
				examRole: 'written_expression',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'اختر موضوعاً واحداً فقط (الموضوع 1 الموجّه برؤوس الأقلام أو الموضوع 2 الحر).',
					'قسّم مقالك بوضوح إلى أربع فقرات (مقدمة، حجتان، موازنة اعتراضية، خاتمة) في حدود 120–145 كلمة.',
					'راجع قبل التسليم: الحرف الكبير في بداية كل اسم، موقع الفعل المصرف، والفاصلة قبل أدوات الربط.'
				],
				solutionStepsAr: [
					'الالتزام بالموضوع المختار وتغطية الأفكار المطلوبة (1.5 نقطة).',
					'انسجام التصميم الرباعي وحسن استخدام الروابط (1.5 نقطة).',
					'سلامة النحو وتوظيف المبني للمجهول والجمل التابعة (1.5 نقطة).',
					'ثراء المفردات وسلامة الإملاء والكتابة الكبيرة للأسماء (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 6. WRITTEN EXPRESSION (6 Pkt. — Integration): D-A-CH, Bildung & Zusammenarbeit
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_tpl_3as_le_t1_writ_dach_zusammenarbeit',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'schriftlicher_ausdruck',
		titleAr: 'التعبير الكتابي (6 نقاط — بكالوريا): التبادل العلمي مع D-A-CH والتكوين المهني المزدوج',
		curriculumLessonId: 'ger_lesson_3as_le_t1_deutschland_algerien_wirtschaft',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					themaEinsPrompt:
						'Schreiben Sie einen argumentativen Artikel (120 bis 145 Wörter) über die Vorteile der algerisch-deutschen Zusammenarbeit in Wissenschaft, Hochschulbildung und erneuerbaren Energien.',
					themaEinsStichpunkte: [
						'Zeigen Sie, wie Deutschkenntnisse den Zugang zu Fachliteratur und Übersetzung erleichtern.',
						'Nennen Sie konkrete Bereiche: Ingenieurwesen, Solarenergie und Stipendien.',
						'Schließen Sie mit einem Ausblick auf gegenseitigen Respekt und gemeinsame Zukunft.'
					],
					themaZweiPrompt:
						'„Fremdsprachen sind heute kein bloßes Schulfach mehr, sondern ein Schlüssel zu wissenschaftlicher Zusammenarbeit.“ Nehmen Sie dazu in 120 bis 145 Wörtern Stellung.',
					modelAnswer:
						'Im Zweig Fremdsprachen stellt sich häufig die Frage, welchen konkreten Nutzen der akademische und wirtschaftliche Austausch mit deutschsprachigen Ländern für junge Menschen bietet.\n\nErstens öffnen solide Deutschkenntnisse den direkten Zugang zu aktueller Fachliteratur in Ingenieurwesen, Medizin und erneuerbaren Energien. Darüber hinaus ermöglicht eine geordnete Hochschulkooperation gemeinsame Forschungsprojekte, präzise Fachübersetzungen und wertvolle Stipendien für engagierte Studierende beider Länder.\n\nZweitens beweist das Beispiel der dualen Berufsausbildung im D-A-CH-Raum, wie eng theoretisches Lernen und betriebliche Praxis zusammenwirken können. Obwohl das gründliche Erlernen einer anspruchsvollen Fremdsprache zunächst Geduld und Disziplin erfordert, zahlen sich Ausdauer und Sorgfalt langfristig vielfach aus.\n\nAbschließend lässt sich festhalten, dass sprachliche Bildung und faire Partnerschaften stabile Brücken über das Mittelmeer bauen. Sie stärken nicht nur berufliche Perspektiven, sondern auch das gegenseitige Verständnis zwischen jungen Generationen.',
					rubricSummary:
						'Inhaltliche Relevanz (1.5) + Struktur & Redemittel (1.5) + Grammatik & Satzstellung (1.5) + Lexik & Orthographie (1.5).',
					quizzes: {
						easy: {
							q: 'Bringen Sie die vier Grundschritte eines BAC-Meinungsartikels in die richtige Reihenfolge:',
							orderedItems: [
								'Einleitung mit Hinführung und Leitfrage',
								'Erstes Hauptargument mit klarem Beispiel',
								'Abwägung oder Einschränkung mit Obwohl',
								'Schlussfolgerung mit eigenem Fazit'
							],
							explanation: 'التصميم القياسي لمقال البكالوريا يتدرج من المقدمة إلى الحجج ثم الموازنة فالخاتمة.'
						} as OrderingSpec,
						medium: {
							q: 'Ordnen Sie die Argumentationskette zum Thema Bildungsaustausch logisch:',
							orderedItems: [
								'Sprachkompetenz öffnet den Zugang zu Fachliteratur.',
								'Stipendien und Workshops vertiefen das Fachwissen.',
								'Auch wenn das Lernen Mühe kostet, wächst die Erfahrung.',
								'Dadurch profitieren beide Partnerländer langfristig.'
							],
							explanation: 'تسلسل منطقي مترابط: السبب اللغوي ثم المبادرات العلمية ثم الاستدراك ثم النتيجة.'
						} as OrderingSpec,
						hard: {
							q: 'Ordnen Sie die vier Sätze zu einem stimmigen Absatz über die Partnerschaft:',
							orderedItems: [
								'Zwischen Algerien und Deutschland bestehen vielfältige Kontakte.',
								'Im Mittelpunkt stehen insbesondere Solarenergie und Ingenieurwesen.',
								'Deshalb spielen zweisprachige Fachkräfte eine vermittelnde Rolle.',
								'So entsteht eine verlässliche Zusammenarbeit auf Augenhöhe.'
							],
							explanation: 'تنتقل الفقرة من الفكرة العامة إلى المجالات ثم دور الكفاءات وأخيراً الخلاصة.'
						} as OrderingSpec
					}
				},
				{
					themaEinsPrompt:
						'Erörtern Sie in einem sachlichen Aufsatz (120 bis 145 Wörter), welche Chancen ein duales Ausbildungssystem im Vergleich zu einem rein theoretischen Studium bietet.',
					themaEinsStichpunkte: [
						'Beschreiben Sie kurz den Wert theoretischer Hochschulbildung für Wissenschaft und Lehre.',
						'Erklären Sie die Vorteile betrieblicher Praxis in der dualen Ausbildung.',
						'Formulieren Sie ein abgewogenes Urteil über Eignung und Weiterbildung.'
					],
					themaZweiPrompt:
						'„Praktisches Handwerk und akademische Forschung ergänzen einander und verdienen gleiche Achtung.“ Begründen Sie Ihre Meinung in 120 bis 145 Wörtern.',
					modelAnswer:
						'Auf dem Weg ins Berufsleben diskutieren viele Abiturientinnen und Abiturienten darüber, ob eine praxisnahe Berufsausbildung oder ein rein theoretisches Studium bessere Perspektiven eröffnet.\n\nEinerseits vermittelt ein Universitätsstudium breites Grundlagenwissen und bereitet gezielt auf Aufgaben in Forschung, Lehre und Übersetzung vor. Andererseits bietet die duale Berufsausbildung, wie sie im D-A-CH-Raum verbreitet ist, einen direkten Einstieg in die betriebliche Praxis unter Anleitung erfahrener Fachkräfte.\n\nMeines Erachtens hängt die klügste Wahl stets von den persönlichen Stärken und Interessen jedes Einzelnen ab. Wer handwerkliches Geschick mit technischem Verständnis verbindet, findet in moderner Industrietechnik oder Solarenergie ebenso sichere Wege wie Studierende an Universitäten.\n\nZusammenfassend verdient jede ehrliche Arbeit hohe gesellschaftliche Anerkennung, sofern gründliche Qualifikation und ständige Weiterbildung ernst genommen werden und jungen Talenten Verantwortung übertragen wird.',
					rubricSummary:
						'Ausgewogene Gegenüberstellung (1.5) + Kohäsion (1.5) + Sprachrichtigkeit (1.5) + Präziser Wortschatz (1.5).',
					quizzes: {
						easy: {
							q: 'Ordnen Sie die Arbeitsschritte während der Prüfung im Fach Deutsch:',
							orderedItems: [
								'Beide Themenstellungen genau durchlesen',
								'Ein Thema wählen und Stichpunkte ordnen',
								'Vier klare Absätze sauber ausformulieren',
								'Verben, Kasus und Großschreibung kontrollieren'
							],
							explanation: 'المنهجية المثالية: قراءة التعليمات، اختيار موضوع واحد وتخطيطه، التحرير، ثم المراجعة.'
						} as OrderingSpec,
						medium: {
							q: 'Bringen Sie die Gedanken eines Pro-Kontra-Absatzes in die logische Reihenfolge:',
							orderedItems: [
								'Einerseits liefert ein Studium tiefes Theoriewissen.',
								'Andererseits schult die duale Ausbildung direkt am Arbeitsplatz.',
								'Entscheidend bleiben jedoch die eigenen Neigungen und der Fleiß.',
								'Folglich ergänzen beide Wege die moderne Wirtschaft.'
							],
							explanation: 'يبنى العرض المقارن بثنائية Einerseits / Andererseits ثم المعيار الحاسم فالاستنتاج.'
						} as OrderingSpec,
						hard: {
							q: 'Ordnen Sie die Teilsätze zu einer grammatisch korrekten und flüssigen Schlussfolgerung:',
							orderedItems: [
								'Obwohl verschiedene Ausbildungswege unterschiedliche Schwerpunkte setzen,',
								'bleiben Zuverlässigkeit und Lernbereitschaft überall unverzichtbar.',
								'Wer seine Arbeit gewissenhaft ausübt,',
								'leistet einen wertvollen Beitrag zum gemeinsamen Wohl.'
							],
							explanation: 'تبدأ الخاتمة بجملة اعتراضية بـ Obwohl وتنتهي بحكمة جامعة بـ Wer ...'
						} as OrderingSpec
					}
				},
				{
					themaEinsPrompt:
						'Schreiben Sie einen formellen Brief (120 bis 145 Wörter) an die Schulleitung Ihres Gymnasiums, um einen Projektnachmittag über den D-A-CH-Raum und algerisch-deutsche Bildungsbrücken vorzuschlagen.',
					themaEinsStichpunkte: [
						'Beachten Sie die formelle Anrede („Sehr geehrte Frau Direktorin, sehr geehrter Herr Direktor,“) und die Höflichkeitsform „Sie“.',
						'Stellen Sie zwei Inhalte des Projekts vor (Landeskunde, Solarenergie, Fachübersetzung).',
						'Erklären Sie Ort und Zeit in der Schulbibliothek ohne Störung des regulären Unterrichts.'
					],
					themaZweiPrompt:
						'„Schulische Projekte und Ausstellungen machen Fremdsprachen lebendiger als bloße Grammatiklisten.“ Schreiben Sie einen Leserbrief oder Artikel dazu (120 bis 145 Wörter).',
					modelAnswer:
						'Sehr geehrte Frau Direktorin, sehr geehrter Herr Direktor,\n\nim Namen unserer Abschlussklasse der Fachrichtung Fremdsprachen bitten wir höflich um Unterstützung für ein schulisches Projekt über den D-A-CH-Raum und die algerisch-deutsche Zusammenarbeit.\n\nUnser Ziel besteht darin, in einer kleinen Ausstellung verlässliche Informationen zu Geographie, Berufsausbildung, Solarenergie und gemeinsamen Übersetzungsprojekten anschaulich darzustellen. Auf diese Weise können auch jüngere Schülerinnen und Schüler erkennen, wie eng Sprachkompetenz, moderne Wirtschaft und Wissenschaftsgeschichte heute zusammenhängen und welche neuen beruflichen Chancen sich dadurch ergeben.\n\nDie geplante Veranstaltung soll am kommenden Donnerstagnachmittag in der ruhigen Schulbibliothek stattfinden, sodass der reguläre Unterricht in keiner Weise gestört wird. Unser Deutschlehrer hat bereits zugesagt, die gesamte Vorbereitung sorgfältig zu begleiten.\n\nWir danken Ihnen herzlich für Ihr Vertrauen und hoffen auf eine positive Rückmeldung.\n\nMit freundlichen Grüßen\nDie Klasse 3AS LE',
					rubricSummary:
						'Formale Briefstruktur & „Sie“-Anrede (1.5) + Überzeugende Argumente (1.5) + Grammatik & Passiv/Nebensätze (1.5) + Stil & Rechtschreibung (1.5).',
					quizzes: {
						easy: {
							q: 'Ordnen Sie die Bausteine eines formellen deutschen Briefes von oben nach unten:',
							orderedItems: [
								'Formelle Anrede mit Titel und Nachnamen',
								'Darlegung des Anliegens im ersten Absatz',
								'Begründung, Organisation und Zeitvorschlag',
								'Dankesformel und höflicher Gruß mit Unterschrift'
							],
							explanation: 'هيكل الرسالة الرسمية بالألمانية: التحية الرسمية، عرض الطلب، التفاصيل والتعليل، ثم الشكر والختام.'
						} as OrderingSpec,
						medium: {
							q: 'Ordnen Sie die inhaltlichen Punkte des Antrags an die Schulleitung:',
							orderedItems: [
								'Vorstellung der Klasse und des Projektthemas',
								'Erklärung des sprachlichen und fachlichen Nutzens',
								'Hinweis auf Bibliothek, Zeit und Lehrerbegleitung',
								'Freundliche Bitte um baldige Genehmigung'
							],
							explanation: 'تتدرج الرسالة من التعريف بالمشروع إلى فوائده التربوية ثم الضمانات التنظيمية.'
						} as OrderingSpec,
						hard: {
							q: 'Ordnen Sie die Sätze für den organisatorischen Absatz eines Projektantrags:',
							orderedItems: [
								'Das Projekt könnte am Donnerstagnachmittag stattfinden,',
								'damit keine reguläre Unterrichtsstunde ausfällt.',
								'Zudem stehen alle Materialien geordnet bereit,',
								'sodass die Bibliothek stets ruhig und sauber bleibt.'
							],
							explanation: 'الربط المنطقي بجملتي الغاية (damit) والنتيجة (sodass) يعزز إقناع الإدارة.'
						} as OrderingSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const { quizQuestion, finalAnswer } = buildOrderingPayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'III. Schriftlicher Ausdruck',
				points: 6,
				instruction: 'Wählen Sie EINES der beiden folgenden Themen aus und bearbeiten Sie es sprachlich sauber (6 Punkte — BAC 3AS LE) :',
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
				trimesterId: 't1',
				difficulty,
				domain: 'schriftlicher_ausdruck',
				examRole: 'written_expression',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'عند كتابة رسالة رسمية لإدارة الثانوية، استعمل صيغة الاحترام „Sie / Ihr“ والتحية الرسمية „Mit freundlichen Grüßen“.',
					'نظّم الأفكار بالروابط المنطقية (Erstens, Darüber hinaus, Obwohl, Abschließend) والتزم بنحو 120–145 كلمة.',
					'تجنب الجمل الإنجليزية أو الفرنسية المتداخلة وحافظ على تناسق الأزمنة.'
				],
				solutionStepsAr: [
					'احترام نوع النص المطلوب (مقال أو رسالة رسمية) وتغطية المعطيات (1.5 نقطة).',
					'تسلسل الفقرات والأفكار باستخدام الروابط المناسبة (1.5 نقطة).',
					'دقة التراكيب النحوية وموضع الفعل المصرف (1.5 نقطة).',
					'جودة المعجم وسلامة الإملاء وعلامات الترقيم (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	}
];
