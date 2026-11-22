import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildGermanClassificationTableBlock,
	buildGermanPassageBlock,
	buildGermanWordFamilyTableBlock,
	buildGermanWrittenProductionBlock
} from '../../german-helpers';
import { saveGermanSvgAsset, svgGermanTenseTimeline } from '../../svg-german';
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
 * Parameterized Exam & Quiz Templates — Trimester 2 : Wissenschaft, Medien, Umwelt & Komplexe Nebensätze (6 templates)
 */
export const TEMPLATES_3AS_LE_T2: GermanParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPREHENSION (7 Pkt.): Wissenschaft, Medizin & digitale Verantwortung
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_tpl_3as_le_t2_comp_wissenschaft_medien',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'textverstaendnis',
		titleAr: 'فهم النص (7 نقاط — بكالوريا): العلوم، الابتكار الطبي والوعي الرقمي المسؤول',
		curriculumLessonId: 'ger_lesson_3as_le_t2_wissenschaft_technologie',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Medizinische Innovation und menschliche Verantwortung',
					source: 'Nach einem medizinethischen Beitrag für junge Leserinnen und Leser',
					paragraphs: [
						'In modernen Kliniken unterstützen hochpräzise Geräte, automatische Laboranalysen und digitale Patientenakten das medizinische Personal täglich. Dank [[dieser technischen Hilfsmittel]] werden Entzündungen oder Stoffwechselstörungen oft viel früher erkannt als noch vor dreißig Jahren, sodass Therapien gezielter und schonender beginnen können.',
						'Dennoch betonen erfahrene Ärztinnen und Ärzte, dass selbst die beste Technik das persönliche Gespräch und die sorgfältige Untersuchung nicht ersetzt. Ein Bildschirm misst zwar Werte und vergleicht Daten, doch nur ein Mensch erkennt Sorgen im Blick des Patienten, hört geduldig zu und trifft im Zweifel [[verantwortungsvolle Entscheidungen]].',
						'Gleichzeitig wächst die Pflicht zum Datenschutz, weil vertrauliche Gesundheitsdaten niemals in unbefugte Hände geraten dürfen. Wissenschaftlicher Fortschritt entfaltet also nur dann seinen wahren Wert, wenn technische Präzision Hand in Hand mit ethischer Sorgfalt geht.'
					],
					glossary: [
						{ term: 'schonend', meaning: 'sanft, den Körper möglichst wenig belastend' },
						{ term: 'unbefugt', meaning: 'ohne Erlaubnis oder Berechtigung' }
					],
					mainIdeaHeader: '1. Welche Aussage trifft den Hauptgedanken des Textes?',
					mainIdeaOptions: [
						'Moderne Medizintechnik hilft bei früher Diagnose, erfordert aber weiterhin menschliche Fürsorge und Datenschutz',
						'Digitale Messgeräte machen Ärztinnen und Ärzte in Kliniken völlig überflüssig',
						'Vertrauliche Patientendaten sollten frei im Internet veröffentlicht werden'
					],
					mainIdeaCorrect:
						'Moderne Medizintechnik hilft bei früher Diagnose, erfordert aber weiterhin menschliche Fürsorge und Datenschutz',
					tfItems: [
						{
							q: 'Moderne Diagnosegeräte ermöglichen es oft, Krankheiten früher zu erkennen als vor dreißig Jahren.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Laut Absatz 2 kann ein Bildschirm das persönliche Gespräch und die Aufmerksamkeit des Arztes vollständig ersetzen.',
							a: 'Falsch',
							c: 'Selbst die beste Technik ersetzt nicht das persönliche Gespräch und die sorgfältige Untersuchung (§2).',
							mark: '0.5'
						},
						{
							q: 'Der Schutz vertraulicher Gesundheitsdaten gewinnt durch digitale Akten an Bedeutung.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Wissenschaftlicher Fortschritt genügt sich allein ohne ethische Sorgfalt.',
							a: 'Falsch',
							c: 'Er entfaltet seinen wahren Wert nur dann, wenn technische Präzision mit ethischer Sorgfalt Hand in Hand geht (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Welchen Vorteil bieten moderne Diagnoseverfahren und Laboranalysen gemäß Absatz 1?',
							a: 'Krankheiten werden früher erkannt, sodass Behandlungen gezielter und schonender beginnen können.',
							mark: '0.75'
						},
						{
							q: 'b) Welche drei Aufgaben bleiben laut Absatz 2 ausschließlich menschlich?',
							a: 'Sorgen im Blick erkennen, geduldig zuhören und verantwortungsvolle Entscheidungen treffen.',
							mark: '1'
						},
						{
							q: 'c) Warum spielt der Datenschutz in modernen Kliniken eine so wichtige Rolle (§3)?',
							a: 'Weil vertrauliche Gesundheitsdaten geschützt werden müssen und niemals in unbefugte Hände geraten dürfen.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) dieser technischen Hilfsmittel (§1 : Was ist gemeint?)   b) verantwortungsvolle Entscheidungen (§2 : Bedeutung im Zusammenhang)',
					refAnswer:
						'a) „dieser technischen Hilfsmittel“ bezieht sich auf die präzisen Diagnosegeräte, automatischen Laboranalysen und digitalen Patientenakten.   b) „verantwortungsvolle Entscheidungen“ meint abgewogene, ethische ärztliche Urteile zum Wohl des einzelnen Patienten.',
					synthPrompt:
						'Warum sollte technischer Fortschritt in Medizin und Wissenschaft immer an feste moralische Regeln gebunden bleiben? Begründen Sie in 4 bis 5 Sätzen.',
					synthAnswer:
						'Technik besitzt von sich aus kein Gewissen, sondern dient lediglich als Werkzeug. Wenn medizinische Forschung und digitale Systeme nicht durch klare ethische Regeln und Datenschutz geleitet werden, könnten Fehler oder Datenmissbrauch den Menschen schaden. Deshalb schützt eine verantwortungsvolle Ethik die Würde und Sicherheit jedes Einzelnen.',
					quizzes: {
						easy: {
							q: 'Wozu tragen moderne Diagnosegeräte und Laboranalysen laut Absatz 1 bei?',
							correct: 'Zu früherer Erkennung von Krankheiten sowie gezielteren und schonenderen Therapien',
							wrong: [
								'Zum Verzicht auf jedes Krankenhaus',
								'Zur Abschaffung von Vertraulichkeit',
								'Zur Verlangsamung jeder Behandlung'
							],
							explanation: 'توضح الفقرة الأولى أن التشخيص المبكر يمهد لعلاج أدق وأكثر رفقاً بالمريض.'
						} as McqSpec,
						medium: {
							q: 'Was kann laut Absatz 2 selbst das beste digitale Gerät niemals leisten?',
							correct: 'Mitfühlend zuhören und menschliche Verantwortung für Entscheidungen tragen',
							wrong: [
								'Zahlen und Laborwerte auf einem Bildschirm anzeigen',
								'Daten innerhalb eines Labors vergleichen',
								'Akten elektronisch speichern'
							],
							explanation: 'تؤكد الفقرة الثانية أن الإصغاء الصبور وتحمل المسؤولية الأخلاقية حكراً على الإنسان.'
						} as McqSpec,
						hard: {
							q: 'Welche Verbindung stellt der Schluss des Textes (§3) zwischen Technik und Ethik her?',
							correct: 'Technischer Fortschritt entfaltet seinen wahren Wert erst im Einklang mit ethischer Sorgfalt und Datenschutz',
							wrong: [
								'Datenschutz verhindert jede sinnvolle medizinische Forschung',
								'Präzision und Ethik schließen einander grundsätzlich aus',
								'Patientenakten dürfen ungeschützt weitergegeben werden'
							],
							explanation: 'تربط الخاتمة قيمة التقدم العلمي بوجوب اقترانه بالأمانة الأخلاقية وحماية البيانات.'
						} as McqSpec
					}
				},
				{
					title: 'Quellen prüfen statt blind vertrauen: Medienkompetenz im Schulalltag',
					source: 'Nach einem pädagogischen Leitfaden für Oberstufenschüler',
					paragraphs: [
						'Noch nie standen Lernenden so viele Informationen auf Knopfdruck zur Verfügung wie heute. Ob historische Daten, Sprachbeispiele oder naturwissenschaftliche Grafiken: Innerhalb von Sekunden erscheinen hunderte Treffer. Doch gerade diese Fülle verlangt eine geschulte [[Medienkompetenz]], damit Fakten sicher von bloßen Gerüchten unterschieden werden.',
						'Wer eine seriöse Arbeit vorbereitet, verlässt sich niemals auf eine einzige anonyme Seite. Stattdessen vergleicht man Autoren, prüft das Erscheinungsdatum und gleicht zentrale Aussagen mit anerkannten Fachbüchern oder Wörterbüchern ab. Zudem schützt eine bewusste Zurückhaltung im Netz vor [[leichtfertiger Preisgabe]] privater Daten.',
						'Lehrerinnen und Lehrer raten deshalb dazu, digitale Recherche stets mit ruhigem Lesen auf Papier zu verbinden. So wird das Internet zum hilfreichen Archiv, ohne das eigenständige Denken zu schwächen.'
					],
					glossary: [
						{ term: 'seriös', meaning: 'glaubwürdig, fachlich geprüft und verlässlich' },
						{ term: 'Preisgabe', meaning: 'unvorsichtiges Weitergeben vertraulicher Informationen' }
					],
					mainIdeaHeader: '1. Was ist das zentrale Anliegen dieses Textes?',
					mainIdeaOptions: [
						'Zu erklären, wie Schülerinnen und Schüler Informationen kritisch prüfen und digitale Medien bewusst nutzen',
						'Das Lesen von Fachbüchern und Wörterbüchern vollständig abzuschaffen',
						'Jede Nutzung des Internets für schulische Recherchen zu verbieten'
					],
					mainIdeaCorrect:
						'Zu erklären, wie Schülerinnen und Schüler Informationen kritisch prüfen und digitale Medien bewusst nutzen',
					tfItems: [
						{
							q: 'Die große Menge an schnellen Suchtreffern macht Medienkompetenz zur Unterscheidung von Fakten und Gerüchten nötig.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Für eine zuverlässige Arbeit reicht der ungeprüfte Blick auf eine einzige anonyme Webseite.',
							a: 'Falsch',
							c: 'Man verlässt sich niemals auf eine einzige anonyme Seite, sondern vergleicht Autoren, Datum und Fachbücher (§2).',
							mark: '0.5'
						},
						{
							q: 'Zurückhaltung im Netz hilft, private Daten vor unvorsichtiger Preisgabe zu schützen.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Lehrkräfte empfehlen, gedruckte Bücher komplett durch schnelle Suchmaschinen zu ersetzen.',
							a: 'Falsch',
							c: 'Sie raten dazu, digitale Recherche mit ruhigem Lesen auf Papier zu verbinden (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Warum genügt schneller Zugang zu vielen Suchergebnissen allein noch nicht für gutes Lernen (§1)?',
							a: 'Weil die große Informationsfülle kritische Medienkompetenz verlangt, um Fakten von Gerüchten sicher zu trennen.',
							mark: '0.75'
						},
						{
							q: 'b) Nennen Sie drei Prüfschritte, die eine seriöse Recherche laut Absatz 2 auszeichnen.',
							a: 'Autoren vergleichen, das Erscheinungsdatum prüfen und Aussagen mit Fachbüchern oder Wörterbüchern abgleichen.',
							mark: '1'
						},
						{
							q: 'c) Warum soll digitale Recherche durch ruhiges Lesen auf Papier ergänzt werden (§3)?',
							a: 'Damit das Internet ein hilfreiches Archiv bleibt, ohne das eigenständige Denken zu schwächen.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) Medienkompetenz (§1 : Definition laut Text)   b) leichtfertiger Preisgabe (§2 : Bedeutung im Zusammenhang)',
					refAnswer:
						'a) „Medienkompetenz“ bezeichnet hier die geschulte Fähigkeit, Informationen kritisch zu bewerten, Fakten von Gerüchten zu unterscheiden und Daten zu schützen.   b) „leichtfertiger Preisgabe“ meint die unbedachte Veröffentlichung privater Angaben im Internet.',
					synthPrompt:
						'Welche Regeln helfen Ihnen persönlich bei der Prüfung einer Nachricht oder Information für ein Referat? Schreiben Sie 4 bis 5 Sätze.',
					synthAnswer:
						'Wenn ich Informationen für ein Referat suche, prüfe ich zuerst, ob ein verlässlicher Autor oder ein bekanntes Institut genannt wird. Danach vergleiche ich wichtige Zahlen und Daten mit mindestens einer zweiten unabhängigen Quelle oder einem gedruckten Lexikon. Außerdem achte ich darauf, selbst keine privaten Daten auf unbekannten Seiten einzugeben.',
					quizzes: {
						easy: {
							q: 'Welche Merkmale prüft man laut Absatz 2 bei einer seriösen Online-Quelle?',
							correct: 'Autoren, Erscheinungsdatum und Übereinstimmung mit anerkannten Fachbüchern',
							wrong: [
								'Nur bunte Farben und große Werbebanner',
								'Ausschließlich die Geschwindigkeit des Seitenaufbaus',
								'Anonyme Kommentare ohne jeden Beleg'
							],
							explanation: 'تحدد الفقرة الثانية فحص المؤلف وتاريخ النشر ومطابقة الكتب العلمية الموثوقة.'
						} as McqSpec,
						medium: {
							q: 'Warum erwähnt der Autor in Absatz 2 den Ausdruck „leichtfertige Preisgabe“?',
							correct: 'Um vor unvorsichtigem Teilen persönlicher Daten im Internet zu warnen',
							wrong: [
								'Um den Kauf teurer Druckbücher zu kritisieren',
								'Um das Kopieren fremder Aufsätze zu empfehlen',
								'Um das Lernen von Wörterbüchern zu verbieten'
							],
							explanation: 'تحذر العبارة من التفريط المتسرع في المعطيات الشخصية على الشبكة.'
						} as McqSpec,
						hard: {
							q: 'Welche Rolle weist Absatz 3 dem Internet im Zusammenspiel mit dem Lesen auf Papier zu?',
							correct: 'Es soll ein ergänzendes Archiv sein, das eigenständiges Denken unterstützt statt verdrängt',
							wrong: [
								'Es soll jede gedruckte Bibliothek überflüssig machen',
								'Es verhindert automatisch alle sachlichen Irrtümer',
								'Es ersetzt die Prüfung durch Lehrerinnen und Lehrer'
							],
							explanation: 'توازن الفقرة الثالثة بين البحث الرقمي والقراءة الهادئة على الورق لصون التفكير المستقل.'
						} as McqSpec
					}
				},
				{
					title: 'Digitale Assistenzsysteme im Unterricht: Werkzeug oder Denkersatz?',
					source: 'Nach einer bildungswissenschaftlichen Diskussion zur digitalen Schule',
					paragraphs: [
						'Automatisierte Sprachprogramme und digitale Lernsysteme können heute innerhalb weniger Augenblicke Grammatikregeln zusammenfassen oder Beispielsätze vorschlagen. Viele Lernende schätzen [[diese schnelle Hilfe]], weil sie bei komplexen Themen unmittelbare Rückmeldung erhalten.',
						'Erfahrene Didaktiker warnen jedoch vor einer gefährlichen Bequemlichkeit: Wer eine Aufgabe vollständig von einem Programm lösen lässt, spart zwar kurzfristig Mühe, trainiert aber weder seinen eigenen Wortschatz noch seine sprachliche Urteilsfähigkeit. Erst wenn man selbst formuliert, überarbeitet und aus Fehlern lernt, entsteht [[belastbares Wissen]].',
						'Aus diesem Grund gehören automatisierte Werkzeuge in der Prüfungsvorbereitung nur als kontrollierte Lernhilfe auf den Schreibtisch — nicht als Ersatz für das eigene Gehirn.'
					],
					glossary: [
						{ term: 'Didaktiker', meaning: 'Fachleute für Lehrmethoden und Unterricht' },
						{ term: 'belastbar', meaning: 'stabil, zuverlässig und in Prüfungen sicher abrufbar' }
					],
					mainIdeaHeader: '1. Welche Position vertritt der Verfasser in diesem Text?',
					mainIdeaOptions: [
						'Digitale Assistenzsysteme können beim Üben helfen, dürfen aber eigenes Formulieren und Denken nicht ersetzen',
						'Schülerinnen und Schüler sollten niemals selbst einen Satz formulieren',
						'Automatisierte Programme machen jede Prüfungsvorbereitung unnötig'
					],
					mainIdeaCorrect:
						'Digitale Assistenzsysteme können beim Üben helfen, dürfen aber eigenes Formulieren und Denken nicht ersetzen',
					tfItems: [
						{
							q: 'Digitale Lernsysteme können schnell Grammatikregeln zusammenfassen und Rückmeldung geben.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Wer Aufgaben komplett von einem Programm lösen lässt, stärkt dadurch automatisch seinen eigenen Wortschatz.',
							a: 'Falsch',
							c: 'Er trainiert dabei weder seinen eigenen Wortschatz noch seine sprachliche Urteilsfähigkeit (§2).',
							mark: '0.5'
						},
						{
							q: 'Durch eigenes Formulieren, Überarbeiten und Lernen aus Fehlern entsteht stabiles Wissen.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Der Text schlägt vor, digitale Hilfsmittel als Ersatz für das eigene Denken einzusetzen.',
							a: 'Falsch',
							c: 'Sie sollen nur als kontrollierte Lernhilfe dienen, nicht als Ersatz für das eigene Gehirn (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Warum schätzen viele Schülerinnen und Schüler digitale Lernprogramme laut Absatz 1?',
							a: 'Weil sie Regeln rasch zusammenfassen, Beispielsätze vorschlagen und unmittelbare Rückmeldung geben.',
							mark: '0.75'
						},
						{
							q: 'b) Welche negative Folge hat es, wenn man komplette Aufgaben von Software erledigen lässt (§2)?',
							a: 'Man trainiert weder den eigenen Wortschatz noch die sprachliche Urteilsfähigkeit und erwirbt kein belastbares Wissen.',
							mark: '1'
						},
						{
							q: 'c) Unter welcher Bedingung sind digitale Werkzeuge vor dem Abitur sinnvoll (§3)?',
							a: 'Nur als kontrollierte Lernhilfe auf dem Schreibtisch, niemals als Ersatz für das eigene Denken.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) diese schnelle Hilfe (§1 : Worauf bezieht sich das?)   b) belastbares Wissen (§2 : Erklärung im Kontext)',
					refAnswer:
						'a) „diese schnelle Hilfe“ verweist auf automatisierte Sprachprogramme und digitale Lernsysteme mit sofortiger Rückmeldung.   b) „belastbares Wissen“ bezeichnet sichere, durch eigenes Üben und Korrigieren gefestigte Kenntnisse, die in der Prüfung selbstständig abrufbar sind.',
					synthPrompt:
						'Warum lohnt es sich gerade im Fach Deutsch, eigene Sätze selbst zu schreiben und Fehler eigenständig zu verbessern? Antworten Sie in 4 bis 5 Sätzen.',
					synthAnswer:
						'Eine Sprache lernt man nur aktiv durch eigenes Nachdenken, Sprechen und Schreiben. Wenn ich einen Satz selbst konstruiere, prägen sich Artikel, Kasus und Verbstellung dauerhaft im Gedächtnis ein. Außerdem verlangt die schriftliche Abiturprüfung, dass man ohne elektronische Geräte klar, sicher und selbstständig argumentieren kann.',
					quizzes: {
						easy: {
							q: 'Wovor warnen Didaktiker laut Absatz 2 im Umgang mit automatisierten Programmen?',
							correct: 'Vor Bequemlichkeit, bei der man Aufgaben nicht mehr selbst formuliert und prüft',
							wrong: [
								'Vor dem Lesen gedruckter Grammatikbücher',
								'Vor dem Erlernen neuer Vokabeln',
								'Vor regelmäßigen schriftlichen Übungen'
							],
							explanation: 'يحذر التربويون من الكسل الذهني الناتج عن ترك البرمجيات تحل التمارين كاملة.'
						} as McqSpec,
						medium: {
							q: 'Wie entsteht gemäß Absatz 2 „belastbares Wissen“?',
							correct: 'Indem man selbst formuliert, überarbeitet und aus eigenen Fehlern lernt',
							wrong: [
								'Indem man fertige Lösungen ungeprüft kopiert',
								'Indem man auf jede Übung verzichtet',
								'Indem man ausschließlich schnelle Schlagzeilen liest'
							],
							explanation: 'تربط الفقرة الثانية رسوخ المعرفة بالصياغة الذاتية والمراجعة والتعلم من الأخطاء.'
						} as McqSpec,
						hard: {
							q: 'Welche Metapher benutzt der Autor in Absatz 3 zur Beschreibung der richtigen Rolle digitaler Systeme?',
							correct: 'Kontrollierte Lernhilfe statt Ersatz für das eigene Gehirn',
							wrong: [
								'Vollkommener Ersatz für Lehrerinnen, Bücher und Prüfungen',
								'Unbrauchbares Hindernis für jedes naturwissenschaftliche Fach',
								'Pflichtwerkzeug während der offiziellen schriftlichen Prüfung'
							],
							explanation: 'تختتم الفقرة الثالثة بأن الأداة الرقمية وسيلة مساعدة مضبوطة لا بديل عن العقل.'
						} as McqSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const spec = chosen.quizzes[difficulty];
			const { quizQuestion, finalAnswer } = buildMcqPayload(
				spec,
				`فهم النص BAC 3AS LE («${chosen.title}»): اختر الإجابة الدقيقة`,
				'تأمل الحجة المذكورة في الفقرة المشار إليها وميّز بين المنافع والضوابط.',
				rng
			);

			const openAnswer = chosen.openQuestions.map((x) => `${x.q.slice(0, 2)} ${x.a}`).join('\n\n');

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Textverständnis',
				points: 7,
				instruction: 'Lesen Sie den Text aufmerksam und beantworten Sie die Fragen (7 Punkte — BAC 3AS LE) :',
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
						content: `3. Beantworten Sie die folgenden Textfragen genau :\n\n${chosen.openQuestions.map((x) => x.q).join('\n\n')}`,
						answer: openAnswer,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `4. Bestimmen Sie Bedeutung und Textbezug der hervorgehobenen Ausdrücke :\n\n${chosen.refPrompt}`,
						answer: chosen.refAnswer,
						mark: '1'
					},
					{
						type: 'text',
						content: `5. Schriftliche Stellungnahme : ${chosen.synthPrompt}`,
						answer: chosen.synthAnswer,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't2',
				difficulty,
				domain: 'textverstaendnis',
				examRole: 'comprehension',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'انتبه إلى أدوات الاستدراك (Dennoch, Jedoch, Aber) التي تفصل بين فوائد التقنية وحدودها الأخلاقية.',
					'في أسئلة Falsch، اذكر العبارة النصية المصحِّحة من الفقرة المحددة.',
					'حافظ على موقف متوازن في سؤال الرأي الشخصي بعيداً عن التطرف.'
				],
				solutionStepsAr: [
					'تحديد الفكرة العامة الصحيحة (0.5 نقطة).',
					'الحكم والتبرير النصي في الصواب والخطأ (2 نقطتان).',
					'الإجابة التحليلية عن الأسئلة الثلاثة (2.5 نقطة).',
					'تفسير الإحالات النصية وصياغة الرأي الشخصي (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. COMPREHENSION (7 Pkt.): Klimaschutz, Solarenergie in der Sahara & Nachhaltigkeit
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_tpl_3as_le_t2_comp_umwelt_solarenergie',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'textverstaendnis',
		titleAr: 'فهم النص (7 نقاط — بكالوريا): حماية البيئة، الطاقة الشمسية في الصحراء والاستدامة',
		curriculumLessonId: 'ger_lesson_3as_le_t2_umweltschutz_energien',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Solarenergie in der algerischen Sahara: Kraftquelle für eine saubere Zukunft',
					source: 'Nach einem Bericht über erneuerbare Energien in Nordafrika',
					paragraphs: [
						'Mit mehr als dreitausend Sonnenstunden pro Jahr gehört die algerische Sahara zu den sonnenreichsten Regionen der Erde. Während fossile Brennstoffe begrenzt sind und beim Verbrennen das Klima belasten, liefert [[die Photovoltaik]] saubere Energie direkt aus dem Sonnenlicht — ohne Rauch und ohne schädlichen CO2-Ausstoß im Betrieb.',
						'In mehreren Provinzen Südalgeriens versorgen Solarkraftwerke heute bereits Gemeinden, Schulen und landwirtschaftliche Bewässerungspumpen mit stabilem Strom. Zudem eröffnet die Erzeugung von grünem Wasserstoff durch Sonnenenergie langfristig neue Wege für saubere Industrie und regionale Zusammenarbeit.',
						'Damit [[dieses enorme Potenzial]] dauerhaft gelingt, braucht das Land neben modernen Anlagen vor allem gut ausgebildete Technikerinnen und Ingenieure vor Ort, die Module warten, Sandablagerungen reinigen und Netze klug steuern.'
					],
					glossary: [
						{ term: 'Photovoltaik', meaning: 'Technik zur direkten Umwandlung von Sonnenlicht in elektrischen Strom' },
						{ term: 'Ausstoß', meaning: 'Freisetzung von Abgasen in die Luft' }
					],
					mainIdeaHeader: '1. Welche Kernaussage vermittelt der Text?',
					mainIdeaOptions: [
						'Die algerische Sahara besitzt riesiges Solarpotenzial, das saubere Energie liefert und qualifizierte Fachkräfte braucht',
						'Fossile Brennstoffe seien sauberer und unbegrenzter als die Sonnenenergie',
						'Solarkraftwerke funktionieren ganz ohne Wartung oder Fachpersonal'
					],
					mainIdeaCorrect:
						'Die algerische Sahara besitzt riesiges Solarpotenzial, das saubere Energie liefert und qualifizierte Fachkräfte braucht',
					tfItems: [
						{
							q: 'Die algerische Sahara zählt zu den sonnenreichsten Gebieten der Welt.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Solarenergie verursacht im Betrieb genauso viel Rauch und CO2 wie das Verbrennen von Kohle.',
							a: 'Falsch',
							c: 'Die Photovoltaik liefert saubere Energie ohne Rauch und ohne schädlichen CO2-Ausstoß im Betrieb (§1).',
							mark: '0.5'
						},
						{
							q: 'Solarkraftwerke werden in Südalgerien bereits für Gemeinden, Schulen und Wasserpumpen genutzt.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Für den Erfolg der Solaranlagen sind keine ausgebildeten Techniker vor Ort erforderlich.',
							a: 'Falsch',
							c: 'Das Land braucht gut ausgebildete Technikerinnen und Ingenieure zur Wartung, Reinigung und Netzsteuerung (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Welchen doppelten Vorteil besitzt die Photovoltaik gegenüber fossilen Brennstoffen (§1)?',
							a: 'Sonnenlicht ist im Gegensatz zu begrenzten fossilen Brennstoffen nachhaltig, und Photovoltaik erzeugt Strom ohne Rauch oder schädlichen CO2-Ausstoß im Betrieb.',
							mark: '1'
						},
						{
							q: 'b) Wofür wird Solarstrom laut Absatz 2 heute schon eingesetzt und welche Perspektive bietet grüner Wasserstoff?',
							a: 'Für die Versorgung von Gemeinden, Schulen und landwirtschaftlichen Pumpen; grüner Wasserstoff eröffnet Perspektiven für saubere Industrie und regionale Kooperation.',
							mark: '0.75'
						},
						{
							q: 'c) Welche Aufgaben übernehmen lokale Technikerinnen und Ingenieure bei Solaranlagen (§3)?',
							a: 'Sie warten die Module, reinigen Sandablagerungen und steuern die Stromnetze.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) die Photovoltaik (§1 : Erklärung laut Text)   b) dieses enorme Potenzial (§3 : Worauf verweist das?)',
					refAnswer:
						'a) „die Photovoltaik“ bezeichnet die direkte Gewinnung von sauberem elektrischem Strom aus Sonnenlicht.   b) „dieses enorme Potenzial“ verweist auf die hohe Sonneneinstrahlung der Sahara für Solarstrom und grünen Wasserstoff.',
					synthPrompt:
						'Warum sollte der Ausbau der Solarenergie Hand in Hand mit der Ausbildung junger algerischer Fachkräfte gehen? Antworten Sie in 4 bis 5 Sätzen.',
					synthAnswer:
						'Moderne Solarkraftwerke brauchen regelmäßige Wartung, technische Planung und kluge Speicherlösungen unter anspruchsvollen Wüstenbedingungen. Wenn junge Menschen vor Ort durch Berufsausbildung und Studium dafür qualifiziert werden, bleibt das Fachwissen im Land und es entstehen sichere, zukunftsfähige Arbeitsplätze.',
					quizzes: {
						easy: {
							q: 'Laut Absatz 1 zählt die algerische Sahara mit über dreitausend Sonnenstunden pro Jahr zu den sonnenreichsten Gebieten der Erde.',
							correctAnswer: true,
							explanation: 'صحيح: تذكر الفقرة الأولى أكثر من ثلاثة آلاف ساعة سطوع شمسي سنوياً في الصحراء الجزائرية.'
						} as TfSpec,
						medium: {
							q: 'Der Text behauptet in Absatz 2, dass Solarkraftwerke lediglich für Privatgärten und nicht für Schulen oder Pumpen geeignet seien.',
							correctAnswer: false,
							explanation: 'خطأ: تزوّد المحطات الشمسية بالفعل الجماعات والمدارس ومضخات الري الفلاحي بالكهرباء.'
						} as TfSpec,
						hard: {
							q: 'Im dritten Absatz wird betont, dass neben der technischen Ausstattung auch qualifizierte Techniker zur Wartung und Netzsteuerung entscheidend sind.',
							correctAnswer: true,
							explanation: 'صحيح: تربط الفقرة الثالثة نجاح الطاقة الشمسية بتأهيل المهندسين والتقنيين المحليين.'
						} as TfSpec
					}
				},
				{
					title: 'Der Grüne Damm: Aufforstung gegen Wüstenbildung und Bodenerosion',
					source: 'Nach einer umweltgeographischen Studie über das algerische Hochplateau',
					paragraphs: [
						'Seit den 1970er-Jahren bildet der sogenannte Grüne Damm (Barrage Vert) einen gewaltigen Schutzgürtel aus Bäumen und robusten Sträuchern zwischen Ost und West durch die algerischen Steppen. Sein Hauptziel besteht darin, fruchtbaren Ackerboden vor Wind, Erosion und [[dem Vordringen der Wüste]] zu bewahren.',
						'Ein einzelner Waldstreifen leistet erstaunlich viel: Die Wurzeln halten lockere Erde fest, die Kronen brechen heiße Winde, und herabfallendes Laub bildet neuen Humus, der Regenwasser besser speichert. Auf diese Weise bleiben Weiden und kleine landwirtschaftliche Flächen auch für künftige Generationen nutzbar.',
						'Heute wird [[das historische Projekt]] mit neuen Baumarten, wassersparender Tropfbewässerung und der aktiven Mithilfe von Schulen und Umweltvereinen fortgeführt und modernisiert.'
					],
					glossary: [
						{ term: 'Erosion', meaning: 'Abtragung von fruchtbarem Boden durch Wind oder Wasser' },
						{ term: 'Humus', meaning: 'nährstoffreiche obere Bodenschicht aus verrotteten Pflanzen' }
					],
					mainIdeaHeader: '1. Worum geht es hauptsächlich in diesem Artikel?',
					mainIdeaOptions: [
						'Um die ökologische Funktion und moderne Weiterentwicklung des Grünen Damms in Algerien',
						'Um das Abholzen von Wäldern zugunsten schneller Autobahnen',
						'Um die Unwirksamkeit von Wurzeln bei heißem Steppenwind'
					],
					mainIdeaCorrect:
						'Um die ökologische Funktion und moderne Weiterentwicklung des Grünen Damms in Algerien',
					tfItems: [
						{
							q: 'Der Grüne Damm wurde angelegt, um fruchtbaren Boden vor Erosion und Wüstenbildung zu schützen.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Baumwurzeln und Laub verhindern laut Absatz 2 jede Speicherung von Regenwasser.',
							a: 'Falsch',
							c: 'Wurzeln halten die Erde fest und neues Laub bildet Humus, der Regenwasser besser speichert (§2).',
							mark: '0.5'
						},
						{
							q: 'Der Baumgürtel schützt Weiden und landwirtschaftliche Flächen für kommende Generationen.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Heute wird der Grüne Damm komplett aufgegeben und nicht mehr gepflegt.',
							a: 'Falsch',
							c: 'Er wird mit neuen Baumarten, Tropfbewässerung und Mithilfe von Schulen und Vereinen modernisiert (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Welches Hauptziel verfolgt der Grüne Damm laut Absatz 1?',
							a: 'Er soll fruchtbaren Ackerboden vor Wind, Erosion und der Ausbreitung der Wüste bewahren.',
							mark: '0.75'
						},
						{
							q: 'b) Nennen Sie drei konkrete Wirkungen eines Waldstreifens aus Absatz 2.',
							a: 'Die Wurzeln festigen den Boden, die Baumkronen bremsen heiße Winde und das Laub bildet Humus zur Wasserspeicherung.',
							mark: '1'
						},
						{
							q: 'c) Wie wird das Projekt in der Gegenwart modernisiert (§3)?',
							a: 'Durch angepasste Baumarten, wassersparende Tropfbewässerung und die Beteiligung von Schulen und Umweltvereinen.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) dem Vordringen der Wüste (§1 : Sinn im Zusammenhang)   b) das historische Projekt (§3 : Worauf verweist das?)',
					refAnswer:
						'a) „dem Vordringen der Wüste“ beschreibt die schleichende Versteppung und Austrocknung fruchtbarer Böden (Desertifikation).   b) „das historische Projekt“ bezieht sich auf den seit den 1970er-Jahren aufgebauten Grünen Damm (Barrage Vert).',
					synthPrompt:
						'Wie können Schulklassen vor Ort zum Erfolg von Aufforstungsprojekten praktisch beitragen? Geben Sie konkrete Ideen in 4 bis 5 Sätzen.',
					synthAnswer:
						'Schulklassen können gemeinsam mit Forstfachleuten jährliche Pflanzaktionen auf dem Schulhof oder am Stadtrand organisieren. Wichtig ist jedoch, die jungen Bäume nicht nur zu setzen, sondern sie danach im Wechsel regelmäßig zu gießen und vor Beschädigung zu schützen. Gleichzeitig stärken solche Projekte den Teamgeist und das Umweltbewusstsein.',
					quizzes: {
						easy: {
							q: 'Der Grüne Damm (Barrage Vert) schützt fruchtbare Böden vor Wind, Erosion und Wüstenbildung.',
							correctAnswer: true,
							explanation: 'صحيح: هذا هو الهدف الرئيسي لمشروع السد الأخضر منذ السبعينيات.'
						} as TfSpec,
						medium: {
							q: 'Laut Absatz 2 verschlechtert herabfallendes Laub die Qualität des Bodens und trocknet ihn aus.',
							correctAnswer: false,
							explanation: 'خطأ: الأوراق المتساقطة تكوّن الدبال (Humus) الذي يحفظ ماء المطر ويخصّب التربة.'
						} as TfSpec,
						hard: {
							q: 'Bei der Modernisierung des Grünen Damms (§3) spielen Tropfbewässerung sowie Schulen und Vereine eine aktive Rolle.',
							correctAnswer: true,
							explanation: 'صحيح: يُحدَّث المشروع اليوم بالري بالتنقيط وأصناف شجرية متكيفة ومشاركة المدارس والجمعيات.'
						} as TfSpec
					}
				},
				{
					title: 'Nachhaltiger Alltag: Wasser sparen, Müll trennen und wiederverwerten',
					source: 'Nach einer Umweltfibel für Jugendliche',
					paragraphs: [
						'Umweltschutz beginnt nicht erst bei internationalen Gipfeln, sondern jeden Morgen im eigenen Haushalt und im Klassenzimmer. Wer beim Händewaschen den Wasserhahn nicht unnötig laufen lässt und tropfende Leitungen meldet, schützt eine [[kostbare Lebensgrundlage]], die besonders in trockenen Sommern knapp wird.',
						'Ebenso entscheidend ist der bewusste Umgang mit Abfällen. Wenn Papier, Glas, Metall und Kunststoffe getrennt gesammelt werden, lassen sich wertvolle Rohstoffe recyceln, sodass weniger Energie verbraucht wird und Landschaften sauber bleiben. Noch besser als Recycling ist jedoch [[Vermeidung]]: Eine wiederverwendbare Trinkflasche ersetzt hunderte Wegwerfflaschen.',
						'So zeigt sich, dass viele kleine Gewohnheiten zusammengenommen eine große Wirkung entfalten und echte Nachhaltigkeit im Alltag verankern.'
					],
					glossary: [
						{ term: 'Wegwerfflasche', meaning: 'Flasche, die nach einmaligem Gebrauch im Müll landet' },
						{ term: 'verankern', meaning: 'fest und dauerhaft im Denken und Handeln verwurzeln' }
					],
					mainIdeaHeader: '1. Was will der Text den Leserinnen und Lesern nahebringen?',
					mainIdeaOptions: [
						'Dass einfache Alltagsgewohnheiten beim Wasser- und Müllsparen wirksame Nachhaltigkeit ermöglichen',
						'Dass der Einzelne ohne internationale Konferenzen überhaupt nichts tun kann',
						'Dass Wegwerfprodukte umweltfreundlicher seien als Mehrwegflaschen'
					],
					mainIdeaCorrect:
						'Dass einfache Alltagsgewohnheiten beim Wasser- und Müllsparen wirksame Nachhaltigkeit ermöglichen',
					tfItems: [
						{
							q: 'Umweltschutz fängt laut dem Text bereits im eigenen Haushalt und in der Schule an.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Beim Recycling von getrennt gesammeltem Glas oder Papier wird mehr Energie verschwendet als bei neuer Produktion.',
							a: 'Falsch',
							c: 'Durch das Recycling wertvoller Rohstoffe wird weniger Energie verbraucht (§2).',
							mark: '0.5'
						},
						{
							q: 'Eine wiederverwendbare Trinkflasche kann hunderte Einwegflaschen ersetzen.',
							a: 'Richtig',
							mark: '0.5'
						},
						{
							q: 'Kleine alltägliche Gewohnheiten haben laut dem Schluss des Textes keinerlei Gesamtwirkung.',
							a: 'Falsch',
							c: 'Viele kleine Gewohnheiten entfalten zusammengenommen eine große Wirkung (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Wie kann man laut Absatz 1 im Alltag sparsam mit Wasser umgehen?',
							a: 'Indem man den Wasserhahn beim Waschen nicht unnötig laufen lässt und tropfende Leitungen rechtzeitig meldet.',
							mark: '0.75'
						},
						{
							q: 'b) Welche zwei Vorteile bringt das getrennte Sammeln von Papier, Glas und Metall (§2)?',
							a: 'Wertvolle Rohstoffe lassen sich recyceln, sodass weniger Energie verbraucht wird und die Landschaft sauber bleibt.',
							mark: '1'
						},
						{
							q: 'c) Warum stuft Absatz 2 die Abfallvermeidung noch höher ein als das Recycling?',
							a: 'Weil etwa eine wiederverwendbare Trinkflasche von vornherein hunderte Wegwerfflaschen überflüssig macht.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) kostbare Lebensgrundlage (§1 : Welches Wort ist gemeint?)   b) Vermeidung (§2 : Was bedeutet das im Kontext?)',
					refAnswer:
						'a) „kostbare Lebensgrundlage“ bezieht sich auf das lebenswichtige, oft knappe Trinkwasser.   b) „Vermeidung“ bedeutet, Müll gar nicht erst entstehen zu lassen, etwa durch langlebige Mehrwegprodukte.',
					synthPrompt:
						'Welche konkrete Maßnahme würden Sie in Ihrem Gymnasium als Erstes umsetzen, um Ressourcen zu schonen? Schreiben Sie 4 bis 5 Sätze.',
					synthAnswer:
						'In meinem Gymnasium würde ich zuerst deutlich beschriftete Behälter für Papier und Plastik auf jedem Flur einführen. So könnten Hefte, Blätter und Flaschen sauber getrennt statt gemischt entsorgt werden. Ergänzend sollte man nach Schulschluss konsequent prüfen, ob alle Lichter und Wasserhähne abgedreht sind.',
					quizzes: {
						easy: {
							q: 'Im Text wird empfohlen, eine wiederverwendbare Trinkflasche zu benutzen, um hunderte Wegwerfflaschen zu vermeiden.',
							correctAnswer: true,
							explanation: 'صحيح: القارورة القابلة لإعادة الاستخدام تمنع تراكم مئات القارورات البلاستيكية.'
						} as TfSpec,
						medium: {
							q: 'Laut Absatz 2 lässt sich Mülltrennung nur in großen Fabriken und nicht im Haushalt durchführen.',
							correctAnswer: false,
							explanation: 'خطأ: يبدأ فرز الورق والزجاج والمعادن والبلاستيك من البيت والمدرسة.'
						} as TfSpec,
						hard: {
							q: 'Der Verfasser ordnet Müllvermeidung noch vor Recycling ein, weil gar nicht erst entstandener Abfall am meisten Ressourcen spart.',
							correctAnswer: true,
							explanation: 'صحيح: „Vermeidung“ (تفادي النفاية أصلاً) أفضل بيئياً من تدويرها بعد إنتاجها.'
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
				instruction: 'Lesen Sie den folgenden Text aufmerksam und bearbeiten Sie die Aufgaben (7 Punkte — BAC 3AS LE) :',
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
						content: `3. Beantworten Sie die Textfragen präzise :\n\n${chosen.openQuestions.map((x) => x.q).join('\n\n')}`,
						answer: openAnswer,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `4. Erläutern Sie Sinn und Textbezug der hervorgehobenen Stellen :\n\n${chosen.refPrompt}`,
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
				trimesterId: 't2',
				difficulty,
				domain: 'textverstaendnis',
				examRole: 'comprehension',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'ركز في أسئلة Richtig / Falsch على التفاصيل الكمية والبيئية الدقيقة في كل فقرة.',
					'عند صياغة الجواب المفتوح، اربط السبب بالنتيجة بوضوح مستعملاً الروابط المناسبة.',
					'في الرأي الشخصي قدّم مقترحات عملية ملموسة في المدرسة والحي.'
				],
				solutionStepsAr: [
					'اختيار الفكرة المحورية للنص (0.5 نقطة).',
					'تصنيف عبارات الصواب والخطأ وتبرير الخطأ من النص (2 نقطتان).',
					'الإجابة عن الأسئلة المفتوحة الثلاثة (2.5 نقطة).',
					'بيان الإحالات النصية وكتابة الموقف المعلل (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. LINGUISTIC COMPETENCE (7 Pkt.): Wortbildung, Finalsatz, Konzessiv & Konsekutiv
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_tpl_3as_le_t2_ling_wortbildung_nebensaetze',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'grammatik_syntax',
		titleAr: 'الكفاءة اللغوية (7 نقاط — بكالوريا): بناء الكلمات والجمل الغائية والاعتراضية والنتائجية',
		curriculumLessonId: 'ger_lesson_3as_le_t2_finalsatz_konzessivsatz_konsekutive',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					classPrompt:
						'1. Klassifizieren Sie die Konnektoren nach ihrer Funktion : um ... zu — obwohl — damit — trotzdem — zum Zweck — dennoch.',
					classCols: [
						{ header: 'Final (Zweck / Ziel)', items: ['um ... zu', 'damit', 'zum Zweck'], mark: '0.5' },
						{ header: 'Konzessiv (Gegengrund)', items: ['obwohl', 'trotzdem', 'dennoch'], mark: '0.5' }
					],
					wordRows: [
						{
							verb: { given: true, value: 'schützen' },
							nomen: { value: 'der Schutz', mark: '0.25' },
							adjektiv: { value: 'schützend', mark: '0.25' }
						},
						{
							verb: { value: 'sparen', mark: '0.25' },
							nomen: { given: true, value: 'die Sparsamkeit' },
							adjektiv: { value: 'sparsam', mark: '0.25' }
						},
						{
							verb: { value: 'erneuern', mark: '0.25' },
							nomen: { value: 'die Erneuerung', mark: '0.25' },
							adjektiv: { given: true, value: 'erneuerbar' }
						}
					],
					lexPrompt:
						'3. Wortschatz (Synonyme und Antonyme) :\n\na) Geben Sie ein Synonym derselben Wortart an : vertraulich (Adj.) — überprüfen (Verb).\n\nb) Bilden Sie das Antonym : erneuerbar — seriös — unbefugt — verschwenden.',
					lexAnswer:
						'a) vertraulich = geheim / privat | überprüfen = kontrollieren / nachsehen.\n\nb) nicht erneuerbar (fossil), unseriös, befugt, sparen.',
					grammarPrompt:
						'4. Verbinden Sie die Sätze mit dem angegebenen Konnektor :\n\na) (um ... zu) : Wir schalten ungenutzte Lampen aus. Wir wollen Strom einsparen.\n\nb) (damit) : Die Gemeinde stellt Sammelbehälter auf. Die Jugendlichen sollen Abfälle trennen.\n\nc) (obwohl) : Die Solaranlagen erfordern anfangs Investitionen. Sie lohnen sich langfristig sehr.\n\nd) (sodass) : Die Forscherin erklärte die Methode sehr klar. Alle Zuhörer verstanden das Prinzip sofort.',
					grammarAnswer:
						'a) Wir schalten ungenutzte Lampen aus, um Strom einzusparen.\n\nb) Die Gemeinde stellt Sammelbehälter auf, damit die Jugendlichen Abfälle trennen.\n\nc) Obwohl die Solaranlagen anfangs Investitionen erfordern, lohnen sie sich langfristig sehr.\n\nd) Die Forscherin erklärte die Methode sehr klar, sodass alle Zuhörer das Prinzip sofort verstanden.',
					clozePrompt:
						'5. Ergänzen Sie die Lücken mit : damit — trotzdem — einzusparen — sodass.\n\nViele Haushalte nutzen LED-Lampen, um Energie (1) .......... . Die Umstellung kostet zunächst etwas Zeit; (2) .......... sinkt der Verbrauch spürbar, (3) .......... monatlich Kosten gesenkt werden. Eltern beraten ihre Kinder, (4) .......... auch die nächste Generation nachhaltig handelt.',
					clozeAnswer: '1) einzusparen   2) trotzdem   3) sodass   4) damit',
					quizzes: {
						easy: {
							q: 'Ordnen Sie jeden Konnektor der passenden syntaktischen Wortstellung zu:',
							pairs: [
								{ left: 'obwohl (Subjunktion)', right: 'Verb am Ende des Nebensatzes' },
								{ left: 'trotzdem (Adverb)', right: 'Verb auf Position 2 im Hauptsatz' },
								{ left: 'um ... zu', right: 'Infinitiv mit „zu“ bei gleichem Subjekt' },
								{ left: 'trotz + Nomen', right: 'Präposition mit Genitiv' }
							],
							explanation: 'التفريق بين موضع الفعل في Nebensatz و Hauptsatz و Infinitivsatz هو مفتاح قواعد الفصل الثاني.'
						} as MatchingSpec,
						medium: {
							q: 'Verbinden Sie jeden umweltbezogenen Begriff mit seinem Gegenteil:',
							pairs: [
								{ left: 'sparen', right: 'verschwenden' },
								{ left: 'sauber', right: 'verschmutzt' },
								{ left: 'schädlich', right: 'nützlich' },
								{ left: 'seriös', right: 'unseriös' }
							],
							explanation: 'أضداد معجمية وصرفية أساسية في نصوص البيئة والإعلام.'
						} as MatchingSpec,
						hard: {
							q: 'Ordnen Sie jeden Finalsatz oder Konsekutivsatz der exakten deutschen Form zu:',
							pairs: [
								{ left: 'abschalten (mit um...zu)', right: 'um Licht abzuschalten' },
								{ left: 'prüfen (mit um...zu)', right: 'um Quellen zu prüfen' },
								{ left: 'gleiche Subjekte (Final)', right: 'um ... zu + Infinitiv' },
								{ left: 'verschiedene Subjekte (Final)', right: 'damit + konjugiertes Verb' }
							],
							explanation: 'الأفعال المنفصلة مثل abschalten تدخل „zu“ في وسطها (abzuschalten).'
						} as MatchingSpec
					}
				},
				{
					classPrompt:
						'1. Ordnen Sie die Sätze nach ihrer Bedeutung : Trotzdem sparen wir Strom — Obwohl der Weg weit ist — Deshalb bleibt das Wasser sauber — Folglich sinkt der Verbrauch — Dennoch wächst das Projekt — Sodass alle profitieren.',
					classCols: [
						{ header: 'Konzessiv (Einräumung)', items: ['Trotzdem sparen wir Strom', 'Obwohl der Weg weit ist', 'Dennoch wächst das Projekt'], mark: '0.5' },
						{ header: 'Konsekutiv (Folge)', items: ['Deshalb bleibt das Wasser sauber', 'Folglich sinkt der Verbrauch', 'Sodass alle profitieren'], mark: '0.5' }
					],
					wordRows: [
						{
							verb: { given: true, value: 'beobachten' },
							nomen: { value: 'die Beobachtung', mark: '0.25' },
							adjektiv: { value: 'beobachtend', mark: '0.25' }
						},
						{
							verb: { value: 'nachhalten', mark: '0.25' },
							nomen: { given: true, value: 'die Nachhaltigkeit' },
							adjektiv: { value: 'nachhaltig', mark: '0.25' }
						},
						{
							verb: { value: 'vermeiden', mark: '0.25' },
							nomen: { value: 'die Vermeidung', mark: '0.25' },
							adjektiv: { given: true, value: 'unvermeidbar' }
						}
					],
					lexPrompt:
						'3. Wortschatz und Wortbildung :\n\na) Geben Sie ein Synonym im selben Worttyp an : belegen (Verb) — knapp (Adjektiv).\n\nb) Bilden Sie das Gegenteil : zuverlässig — legal — verantwortungsvoll — die Wahrheit.',
					lexAnswer:
						'a) belegen = beweisen / nachweisen | knapp = selten / gering.\n\nb) unzuverlässig, illegal, verantwortungslos, die Lüge (oder Unwahrheit).',
					grammarPrompt:
						'4. Transformationen zwischen Nebensatz, Hauptsatz und Nominalstil :\n\na) Ersetzen Sie „trotz“ durch „obwohl“ : „Trotz der heißen Winde wachsen die jungen Bäume im Grünen Damm weiter.“\n\nb) Ersetzen Sie „obwohl“ durch „trotzdem“ : „Obwohl das Lehrbuch anspruchsvoll ist, verstehen die Schüler alle Regeln.“\n\nc) Verbinden Sie mit „so ..., dass“ : „Die Daten wurden sehr geheim gespeichert. Kein Fremder konnte sie lesen.“\n\nd) Formen Sie mit „um ... zu“ um : „Wir vergleichen zwei Quellen. Wir möchten Fehler vermeiden.“',
					grammarAnswer:
						'a) Obwohl die Winde heiß sind, wachsen die jungen Bäume im Grünen Damm weiter.\n\nb) Das Lehrbuch ist anspruchsvoll; trotzdem verstehen die Schüler alle Regeln.\n\nc) Die Daten wurden so geheim gespeichert, dass kein Fremder sie lesen konnte.\n\nd) Wir vergleichen zwei Quellen, um Fehler zu vermeiden.',
					clozePrompt:
						'5. Setzen Sie passend ein : obwohl — deshalb — um — dass.\n\n(1) .......... digitale Lexika praktisch sind, prüfen wir jede Zahl zweimal. Die Quelle war so verlässlich, (2) .......... wir sie zitieren konnten. Wir arbeiten ordentlich, (3) .......... Fehler auszuschließen; (4) .......... gewinnen unsere Aufsätze an Qualität.',
					clozeAnswer: '1) Obwohl   2) dass   3) um   4) deshalb',
					quizzes: {
						easy: {
							q: 'Ordnen Sie jedes Wort seinem passenden Antonym zu:',
							pairs: [
								{ left: 'zuverlässig', right: 'unzuverlässig' },
								{ left: 'vermeidbar', right: 'unvermeidbar' },
								{ left: 'die Wahrheit', right: 'die Unwahrheit' },
								{ left: 'nachhaltig', right: 'kurzlebig' }
							],
							explanation: 'تشكّل السابقة un- أضداداً قياسية للصفات والأسماء.'
						} as MatchingSpec,
						medium: {
							q: 'Verbinden Sie jeden Satzanfang mit der grammatisch richtigen Fortsetzung:',
							pairs: [
								{ left: 'Obwohl es trocken war,', right: 'blieben die Pflanzen gesund.' },
								{ left: 'Es war trocken; trotzdem', right: 'blieben die Pflanzen gesund.' },
								{ left: 'Es regnete stark, sodass', right: 'die Zisternen voll wurden.' },
								{ left: 'Wir pflanzen Bäume, um', right: 'den Boden zu schützen.' }
							],
							explanation: 'انتبه لاختلاف موقع الفعل المصرف بعد „trotzdem“ (في الموقع الثاني) عنه بعد „obwohl / sodass“ (في النهاية).'
						} as MatchingSpec,
						hard: {
							q: 'Ordnen Sie jedem Verb sein abgeleitetes Nomen samt Artikel zu:',
							pairs: [
								{ left: 'vermeiden', right: 'die Vermeidung' },
								{ left: 'beobachten', right: 'die Beobachtung' },
								{ left: 'entsalzen', right: 'die Entsalzung' },
								{ left: 'speichern', right: 'die Speicherung' }
							],
							explanation: 'تنتهي كل هذه المصادر المشتقة بـ -ung وتأخذ الأداة المؤنثة die.'
						} as MatchingSpec
					}
				},
				{
					classPrompt:
						'1. Klassifizieren Sie nach der Satzstellung des konjugierten Verbs nach dem Konnektor : obwohl — deshalb — sodass — folglich — damit — trotzdem.',
					classCols: [
						{ header: 'Verb am Satzende (Nebensatz)', items: ['obwohl', 'sodass', 'damit'], mark: '0.5' },
						{ header: 'Verb auf Pos. 2 (Inversion)', items: ['deshalb', 'folglich', 'trotzdem'], mark: '0.5' }
					],
					wordRows: [
						{
							verb: { given: true, value: 'prüfen' },
							nomen: { value: 'die Prüfung', mark: '0.25' },
							adjektiv: { value: 'prüfbar', mark: '0.25' }
						},
						{
							verb: { value: 'messen', mark: '0.25' },
							nomen: { given: true, value: 'die Messung' },
							adjektiv: { value: 'messbar', mark: '0.25' }
						},
						{
							verb: { value: 'nützen', mark: '0.25' },
							nomen: { value: 'der Nutzen', mark: '0.25' },
							adjektiv: { given: true, value: 'nützlich' }
						}
					],
					lexPrompt:
						'3. Wortschatz und Gegenteile :\n\na) Finden Sie ein Synonym zu : die Fülle (Nomen) — belastbar (Adjektiv).\n\nb) Bilden Sie das Gegenteil : schädlich — ordentlich — bewusst — die Verschwendung.',
					lexAnswer:
						'a) die Fülle = der Reichtum / die Menge | belastbar = stabil / zuverlässig.\n\nb) unschädlich / nützlich, unordentlich, unbewusst, die Sparsamkeit.',
					grammarPrompt:
						'4. Verbinden und umformen Sie genau :\n\na) (damit) : Die Lehrkraft erklärt das Thema anschaulich. Alle Schülerinnen verstehen den Text.\n\nb) (um ... zu, trennbares Verb!) : Wir nehmen eine Mehrwegflasche mit. Wir möchten Plastikabfall abbauen.\n\nc) (deshalb) : Die Sonneneinstrahlung in Adrar ist sehr hoch. Man baut dort große Solarkraftwerke.\n\nd) (mit „trotzdem“) : Obwohl das Projekt anspruchsvoll war, gelang es pünktlich.',
					grammarAnswer:
						'a) Die Lehrkraft erklärt das Thema anschaulich, damit alle Schülerinnen den Text verstehen.\n\nb) Wir nehmen eine Mehrwegflasche mit, um Plastikabfall abzubauen.\n\nc) Die Sonneneinstrahlung in Adrar ist sehr hoch; deshalb baut man dort große Solarkraftwerke.\n\nd) Das Projekt war anspruchsvoll; trotzdem gelang es pünktlich.',
					clozePrompt:
						'5. Ergänzen Sie sinnvoll : abzuschalten — obwohl — folglich — damit.\n\nEs ist wichtig, Geräte nach Gebrauch (1) .........., (2) .......... kein Strom unnötig verloren geht. (3) .......... ein einzelner Schalter klein wirkt, spart gemeinsames Handeln viel Energie; (4) .......... sinken Emissionen nachhaltig.',
					clozeAnswer: '1) abzuschalten   2) damit   3) Obwohl   4) folglich',
					quizzes: {
						easy: {
							q: 'Ordnen Sie die trennbaren Verben ihrer korrekten „zu“-Infinitivform zu:',
							pairs: [
								{ left: 'abschalten', right: 'abzuschalten' },
								{ left: 'einsparen', right: 'einzusparen' },
								{ left: 'aufstellen', right: 'aufzustellen' },
								{ left: 'weitergeben', right: 'weiterzugeben' }
							],
							explanation: 'تتوسط „zu“ بين البادئة المنفصلة وجذر الفعل في كلمة واحدة.'
						} as MatchingSpec,
						medium: {
							q: 'Verbinden Sie jeden deutschen Konnektor mit seiner logischen Bedeutung:',
							pairs: [
								{ left: 'damit / um...zu', right: 'Zweck / Absicht (Final)' },
								{ left: 'obwohl / trotzdem', right: 'Gegengrund (Konzessiv)' },
								{ left: 'sodass / deshalb', right: 'Folge / Wirkung (Konsekutiv)' },
								{ left: 'weil / da', right: 'Grund / Ursache (Kausal)' }
							],
							explanation: 'إتقان دلالات الروابط الأربعة (الغائية، الاعتراضية، النتائجية، السببية) أساس بناء الجمل.'
						} as MatchingSpec,
						hard: {
							q: 'Verbinden Sie die Wörter der Wortfamilie rund um Wissenschaft und Nutzen:',
							pairs: [
								{ left: 'prüfen', right: 'die Prüfung / prüfbar' },
								{ left: 'messen', right: 'die Messung / messbar' },
								{ left: 'nützen', right: 'der Nutzen / nützlich' },
								{ left: 'forschen', right: 'die Forschung / forschend' }
							],
							explanation: 'لاحقة الصفات -bar تفيد القابلية للتحقق (prüfbar, messbar).'
						} as MatchingSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const { quizQuestion, finalAnswer } = buildMatchingPayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'II. Sprachfähigkeit — A) Wortbildung und komplexe Konnektoren',
				points: 7,
				instruction: 'Lösen Sie die folgenden Aufgaben zu Wortbildung, Wortschatz und Satzverknüpfung (7 Punkte — BAC 3AS LE) :',
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
				trimesterId: 't2',
				difficulty,
				domain: 'grammatik_syntax',
				examRole: 'linguistic_competence',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكر حذف الفعل الناقص (wollen / möchten) عند استعمال „um ... zu + Infinitiv“، وضع „zu“ وسط الأفعال المنفصلة.',
					'فرّق بين أدوات الجمل التابعة (obwohl, sodass, damit -> الفعل في النهاية) وأدوات الجمل الرئيسية (trotzdem, deshalb, folglich -> الفعل في الموقع 2).',
					'في جدول عائلة الكلمات حافظ على كتابة الأداة والحرف الكبير لكل اسم.'
				],
				solutionStepsAr: [
					'التصنيف الدلالي والنحوي للروابط (1 نقطة).',
					'إكمال جدول عائلة الكلمات الثلاثي (1.5 نقطة).',
					'المرادفات والأضداد بنفس القسم الكلامي (1.5 نقطة).',
					'الربط والتحويل بين الجمل وتعبئة الفراغات (3 نقاط).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. LINGUISTIC COMPETENCE (7 Pkt.): Indirekte Rede & Komplexe Relativsätze (with SVG)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_tpl_3as_le_t2_ling_indirekte_rede_relativ',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'grammatik_syntax',
		titleAr: 'الكفاءة اللغوية (7 نقاط — بكالوريا): الكلام المنقول (dass / Konjunktiv I) وجمل الموصول بحروف الجر',
		curriculumLessonId: 'ger_lesson_3as_le_t2_indirekte_rede_relativsaetze',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					svgTitle: 'Indirekte Rede & Konjunktiv I',
					svgTense: 'Berichtsstil im BAC 3AS',
					svgFormula: 'er sei/habe/könne | Ersatz Plural: hätten/wären/würden',
					svgExample: 'Der Arzt erklärt, das neue Verfahren sei zuverlässig.',
					svgMarkers: 'dass, ob, wann, wie, warum, sollen (Aufforderung)',
					classPrompt:
						'1. Ordnen Sie die markierten Sätze nach „Indirekte Aussage / Frage“ oder „Relativsatz“ : Er fragt, ob das Labor offen sei — Das Gerät, mit dem wir messen — Sie erklärt, dass sie forsche — Die Stadt, deren Erbe lebt — Man berichtete, er habe gewonnen — Das Thema, worüber wir sprechen.',
					classCols: [
						{
							header: 'Indirekte Rede / Frage',
							items: ['Er fragt, ob das Labor offen sei', 'Sie erklärt, dass sie forsche', 'Man berichtete, er habe gewonnen'],
							mark: '0.75'
						},
						{
							header: 'Relativsatz',
							items: ['Das Gerät, mit dem wir messen', 'Die Stadt, deren Erbe lebt', 'Das Thema, worüber wir sprechen'],
							mark: '0.75'
						}
					],
					conjPrompt:
						'2. Setzen Sie in die indirekte Rede (Konjunktiv I oder Ersatzform Konjunktiv II) :\n\na) Die Forscherin betont: „Das neue Solarmodul ist sehr leistungsfähig.“\n\nb) Der Lehrer fragt die Klasse: „Habt ihr alle Quellen genau überprüft?“ (mit „ob“)\n\nc) Die Techniker berichten: „Wir installieren morgen zehn weitere Anlagen.“\n\nd) Die Ärztin rät dem Patienten: „Trinken Sie täglich ausreichend Wasser!“ (mit „sollen“)',
					conjAnswer:
						'a) Die Forscherin betont, dass das neue Solarmodul sehr leistungsfähig sei (oder: ..., es sei sehr leistungsfähig).\n\nb) Der Lehrer fragt die Klasse, ob sie alle Quellen genau überprüft habe.\n\nc) Die Techniker berichten, sie würden am nächsten Tag (oder morgen) zehn weitere Anlagen installieren (oder: ..., dass sie ... installieren würden).\n\nd) Die Ärztin rät dem Patienten, er solle täglich ausreichend Wasser trinken.',
					transformPrompt:
						'3. Verbinden Sie die Sätze jeweils durch einen passenden Relativsatz (mit Genitiv oder Präposition) :\n\na) Das ist die bekannte Wissenschaftlerin. Ihre Entdeckung half vielen Menschen. (deren)\n\nb) Dort steht das moderne Labor. In diesem Labor testen die Studierenden Wasserproben.\n\nc) Wir lesen einen interessanten Bericht. Alle sprechen heute über diesen Bericht.\n\nd) Es gibt vieles. Wir müssen über dieses Thema noch genau nachdenken. (worüber)',
					transformAnswer:
						'a) Das ist die bekannte Wissenschaftlerin, deren Entdeckung vielen Menschen half.\n\nb) Dort steht das moderne Labor, in dem die Studierenden Wasserproben testen.\n\nc) Wir lesen einen interessanten Bericht, über den alle heute sprechen.\n\nd) Es gibt vieles, worüber wir noch genau nachdenken müssen.',
					clozePrompt:
						'4. Ergänzen Sie die Lücken mit : sei — ob — deren — mit der.\n\nDie Expertin erklärte, Solarenergie (1) .......... für den Süden ideal. Sie fragte zudem, (2) .......... genügend junge Fachkräfte ausgebildet würden. Die Methode, (3) .......... wir Energie speichern, interessiert vor allem Jugendliche, (4) .......... Berufsziel die Umwelttechnik ist.',
					clozeAnswer: '1) sei   2) ob   3) mit der   4) deren',
					quizzes: {
						easy: {
							q: 'Ergänzen Sie die korrekte Form von „sein“ im Konjunktiv I:',
							sentence: 'Der Ingenieur berichtete, die neue Anlage ___ bereits vollständig betriebsbereit.',
							correct: 'sei',
							distractors: ['ist', 'war', 'bin'],
							explanation: 'صيغة Konjunktiv I للفعل sein في الغائب المفرد هي „sei“.'
						} as ClozeSpec,
						medium: {
							q: 'Wählen Sie das passende Relativpronomen im Genitiv:',
							sentence: 'Die Autorin, ___ Buch über nachhaltige Städte gestern vorgestellt wurde, hielt einen Vortrag.',
							correct: 'deren',
							distractors: ['dessen', 'denen', 'die'],
							explanation: 'الاسم المرجعي مؤنث مفرد „Die Autorin“، لذلك يأخذ اسم الموصول في الإضافة „deren“.'
						} as ClozeSpec,
						hard: {
							q: 'Ergänzen Sie die korrekte Präposition + Relativpronomen:',
							sentence: 'Das Forschungsprojekt, ___ sich viele Studierende beteiligen, schützt das Grundwasser.',
							correct: 'an dem',
							distractors: ['an das', 'an die', 'an dessen'],
							explanation: 'الفعل „sich beteiligen an“ في السكون/المشاركة يطلب Dativ، و„das Projekt“ محايد، فتصبح „an dem“.'
						} as ClozeSpec
					}
				},
				{
					svgTitle: 'Relativsätze mit Präposition & Genitiv',
					svgTense: 'Kasusbestimmung im Nebensatz',
					svgFormula: 'Bezugswort (Genus/Zahl) + Verb/Präposition (Kasus)',
					svgExample: 'Das Projekt, über das wir forschen, wächst stetig.',
					svgMarkers: 'dessen, deren, in dem, mit der, für die, worüber',
					classPrompt:
						'1. Bestimmen Sie, ob die indirekte Rede im Konjunktiv I (eindeutig) oder in der Ersatzform (Konjunktiv II) steht : er sei krank — sie hätten Zeit — sie habe gelesen — wir würden helfen — es gebe Lösungen — sie wären bereit.',
					classCols: [
						{ header: 'Konjunktiv I (eindeutig)', items: ['er sei krank', 'sie habe gelesen', 'es gebe Lösungen'], mark: '0.75' },
						{ header: 'Ersatzform (Konjunktiv II)', items: ['sie hätten Zeit', 'wir würden helfen', 'sie wären bereit'], mark: '0.75' }
					],
					conjPrompt:
						'2. Formen Sie in die indirekte Rede um :\n\na) Der Journalist meldet: „Die neue Solaranlage erzeugt seit Montag sauberen Strom.“\n\nb) Die Schülerin fragt den Bibliothekar: „Wann schließt der Lesesaal heute?“\n\nc) Die Professoren erklärten: „Wir haben die Ergebnisse zweimal kontrolliert.“\n\nd) Der Meister sagt zu dem Auszubildenden: „Prüfen Sie jedes Kabel vor dem Start!“',
					conjAnswer:
						'a) Der Journalist meldet, die neue Solaranlage erzeuge seit Montag sauberen Strom (oder: ..., dass sie ... erzeuge).\n\nb) Die Schülerin fragt den Bibliothekar, wann der Lesesaal an jenem Tag (oder heute) schließe.\n\nc) Die Professoren erklärten, sie hätten die Ergebnisse zweimal kontrolliert.\n\nd) Der Meister sagt zu dem Auszubildenden, er solle jedes Kabel vor dem Start prüfen.',
					transformPrompt:
						'3. Verbinden Sie die Satzpaare mit einem Relativpronomen :\n\na) Der Botaniker berät die Jugendgruppe. Sein Wissen über Wüstenpflanzen ist groß. (dessen)\n\nb) Die Brücke verbindet zwei Stadtteile. Über diese Brücke fahren täglich Schulbusse.\n\nc) Die Werkzeuge liegen auf dem Tisch. Mit diesen Werkzeugen reparieren wir die Pumpe.\n\nd) Nichts war so lehrreich wie das Gespräch. Ich habe lange über dieses Gespräch nachgedacht. (über das)',
					transformAnswer:
						'a) Der Botaniker, dessen Wissen über Wüstenpflanzen groß ist, berät die Jugendgruppe.\n\nb) Die Brücke, über die täglich Schulbusse fahren, verbindet zwei Stadtteile.\n\nc) Die Werkzeuge, mit denen wir die Pumpe reparieren, liegen auf dem Tisch.\n\nd) Nichts war so lehrreich wie das Gespräch, über das ich lange nachgedacht habe.',
					clozePrompt:
						'4. Füllen Sie aus : dessen — hätte — mit denen — wann.\n\nDer Forscher, (1) .......... Studie viele Fragen beantwortet, erklärte auf der Tagung, er (2) .......... die Messungen drei Monate lang wiederholt. Eine Studentin fragte ihn, (3) .......... die Daten veröffentlicht würden und (4) .......... Geräten das Team gearbeitet habe.',
					clozeAnswer: '1) dessen   2) hätte   3) wann   4) mit denen (oder: mit welchen)',
					quizzes: {
						easy: {
							q: 'Wählen Sie das richtige Fragewort für eine indirekte Ja/Nein-Frage:',
							sentence: 'Die Lehrerin fragt, ___ alle Schülerinnen den Artikel über Solarenergie gelesen haben.',
							correct: 'ob',
							distractors: ['dass', 'wann', 'warum'],
							explanation: 'الأسئلة المغلقة التي تبدأ بالفعل وتُجاب بـ Ja/Nein تُنقل باستخدام „ob“.'
						} as ClozeSpec,
						medium: {
							q: 'Ergänzen Sie die korrekte Ersatzform im Plural (indirekte Rede):',
							sentence: 'Die Ingenieure teilten mit, sie ___ das alte Rohrnetz vollständig erneuert.',
							correct: 'hätten',
							distractors: ['haben', 'wären', 'seien'],
							explanation: 'في الجمع يتطابق Konjunktiv I (haben) مع الحاضر، فنستبدله بـ Konjunktiv II: „hätten“.'
						} as ClozeSpec,
						hard: {
							q: 'Wählen Sie den exakten präpositionalen Relativanschluss:',
							sentence: 'Die Kollegen, ___ der Meister gestern zusammengearbeitet hat, stammen aus Oran.',
							correct: 'mit denen',
							distractors: ['mit die', 'mit deren', 'mit dem'],
							explanation: 'حرف الجر „mit“ يطلب Dativ، والاسم المرجعي جمع „Die Kollegen“ -> Dativ Plural „denen“.'
						} as ClozeSpec
					}
				},
				{
					svgTitle: 'Indirekte Fragen & Relativadverb „wo(r)-“',
					svgTense: 'Berichts- und Bezugsregeln',
					svgFormula: 'Ja/Nein -> ob | W-Frage -> W-Wort | alles/nichts -> was/wor-',
					svgExample: 'Alles, wofür wir heute üben, stärkt die Zukunft.',
					svgMarkers: 'ob, wie, warum, wofür, worauf, worüber, dessen, deren',
					classPrompt:
						'1. Ordnen Sie nach „Relativpronomen mit Präposition (Person/Sache)“ oder „Relativadverb wo(r)+Präposition (alles/etwas/nichts)“ : der Plan, auf den wir bauen — alles, worauf es ankommt — die Quelle, aus der wir zitieren — vieles, wofür wir danken — das Buch, in dem ich lese — nichts, worüber man streitet.',
					classCols: [
						{
							header: 'Präposition + Relativpronomen',
							items: ['der Plan, auf den wir bauen', 'die Quelle, aus der wir zitieren', 'das Buch, in dem ich lese'],
							mark: '0.75'
						},
						{
							header: 'wo(r) + Präposition',
							items: ['alles, worauf es ankommt', 'vieles, wofür wir danken', 'nichts, worüber man streitet'],
							mark: '0.75'
						}
					],
					conjPrompt:
						'2. Übertragen Sie in die indirekte Rede :\n\na) Der Umweltverein teilte mit: „Wir haben im Herbst fünfhundert Bäume gepflanzt.“\n\nb) Ein Schüler fragt: „Wie funktioniert eine moderne Photovoltaikanlage?“\n\nc) Die Direktorin sagte: „Die Schulbibliothek bleibt ab Montag länger geöffnet.“\n\nd) Die Ärztin betonte: „Schlafen Sie regelmäßig und meiden Sie Stress!“ (mit „sollen“)',
					conjAnswer:
						'a) Der Umweltverein teilte mit, er habe im Herbst fünfhundert Bäume gepflanzt (oder: ..., dass er ... gepflanzt habe).\n\nb) Ein Schüler fragt, wie eine moderne Photovoltaikanlage funktioniere (oder funktioniert).\n\nc) Die Direktorin sagte, die Schulbibliothek bleibe ab Montag länger geöffnet.\n\nd) Die Ärztin betonte, man solle (oder der Patient solle) regelmäßig schlafen und Stress meiden.',
					transformPrompt:
						'3. Bilden Sie präzise Relativsätze :\n\na) Das ist der junge Ingenieur. Seine Ideen überzeugten das gesamte Team. (dessen)\n\nb) Das sind die Schülerinnen. Wir haben gemeinsam mit ihnen das Plakat gestaltet.\n\nc) Es gibt vieles. Wir sollten uns für diese Dinge engagieren. (wofür)\n\nd) Die Bibliothek bietet ruhige Räume. In diesen Räumen lernt man konzentriert.',
					transformAnswer:
						'a) Das ist der junge Ingenieur, dessen Ideen das gesamte Team überzeugten.\n\nb) Das sind die Schülerinnen, mit denen wir gemeinsam das Plakat gestaltet haben.\n\nc) Es gibt vieles, wofür wir uns engagieren sollten.\n\nd) Die Bibliothek bietet ruhige Räume, in denen man konzentriert lernt.',
					clozePrompt:
						'4. Ergänzen Sie : worauf — habe — deren — in dem.\n\nDer Bericht, (1) .......... viele Zahlen zum Wassersparen stehen, stammt von einer Gruppe, (2) .......... Mitglieder aus drei Klassen kommen. Die Sprecherin sagte, jede Schule (3) .......... eine Verantwortung; das sei etwas, (4) .......... man täglich achten müsse.',
					clozeAnswer: '1) in dem   2) deren   3) habe   4) worauf',
					quizzes: {
						easy: {
							q: 'Wählen Sie das passende Relativadverb nach dem unbestimmten Wort „alles“:',
							sentence: 'Er erklärte uns alles, ___ wir für das naturwissenschaftliche Projekt achten müssen.',
							correct: 'worauf',
							distractors: ['auf dem', 'dessen', 'deren'],
							explanation: 'بعد الضمائر غير المحددة مثل „alles / etwas / nichts“ نستخدم „worauf / wofür / worüber“ (مع r قبل حرف العلة).'
						} as ClozeSpec,
						medium: {
							q: 'Ergänzen Sie die korrekte Konjunktiv-I-Form für „haben“ (3. Person Singular):',
							sentence: 'Die Reporterin schrieb, der Verein ___ im letzten Monat ein neues Schulprojekt gestartet.',
							correct: 'habe',
							distractors: ['hat', 'hätte', 'haben'],
							explanation: 'في الغائب المفرد صيغة Konjunktiv I من haben هي „habe“ (تختلف عن hat).'
						} as ClozeSpec,
						hard: {
							q: 'Wählen Sie die richtige Kombination aus Präposition und Relativpronomen:',
							sentence: 'Die Fachbücher, ___ sich die Schülerinnen vorbereiten, liegen im Lesesaal.',
							correct: 'mit denen',
							distractors: ['mit die', 'mit deren', 'mit welchem'],
							explanation: 'الاسم المرجعي جمع „Die Fachbücher“ وحرف الجر „mit“ يستلزم Dativ Plural „denen“.'
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
				activeZone: 'present',
				example: chosen.svgExample,
				markers: chosen.svgMarkers
			});
			const svgPath = saveGermanSvgAsset(`3as_le_t2_indirekte_rede_v${vIdx + 1}`, svgStr);

			const { quizQuestion, finalAnswer } = buildClozePayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'II. Sprachfähigkeit — B) Indirekte Rede und Relativsätze',
				points: 7,
				instruction: 'Analysieren Sie die Übersicht und bearbeiten Sie die Grammatikaufgaben (7 Punkte — BAC 3AS LE) :',
				content: [
					{
						type: 'image',
						src: svgPath,
						width: 'full',
						caption: 'Sprachübersicht : Indirekte Rede (Konjunktiv I) und komplexe Relativsätze (BAC 3AS LE).'
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
				trimesterId: 't2',
				difficulty,
				domain: 'grammatik_syntax',
				examRole: 'linguistic_competence',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'في الكلام المنقول للغائب المفرد نستخدم „sei, habe, könne, werde“؛ وعند التطابق مع المضارع (في الجمع غالباً) نستبدلها بـ „hätten, wären, würden + Infinitiv“.',
					'في الأسئلة المنقولة: سؤال Ja/Nein يأخذ „ob“، وسؤال الاستفهام يحتفظ بأداة السؤال (wann, wie, warum)، والفعل المصرف في الأخير.',
					'في جمل الموصول: المضاف إليه (dessen للمذكر/المحايد و deren للمؤنث/الجمع) يتبع المالك السابق.'
				],
				solutionStepsAr: [
					'التصنيف النحوي لأساليب الكلام المنقول والموصول (1.5 نقطة).',
					'تحويل الجمل المباشرة إلى غير المباشرة بضبط Konjunktiv I (2 نقطتان).',
					'ربط الجمل بضمائر الموصول المضافة والمجرورة (2 نقطتان).',
					'ملء الفراغات بالصيغ النحوية الدقيقة (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. WRITTEN EXPRESSION (6 Pkt. — Integration): Wissenschaft & Medienethik
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_tpl_3as_le_t2_writ_digitalisierung_ethik',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'schriftlicher_ausdruck',
		titleAr: 'التعبير الكتابي (6 نقاط — بكالوريا): التكنولوجيا، الكفاءة الإعلامية والأخلاق العلمية',
		curriculumLessonId: 'ger_lesson_3as_le_t2_wissenschaft_technologie',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					themaEinsPrompt:
						'Schreiben Sie eine Erörterung (120 bis 145 Wörter) über den sinnvollen Einsatz digitaler Lernhilfen bei der Vorbereitung auf das Abitur.',
					themaEinsStichpunkte: [
						'Nennen Sie konkrete Vorteile (Wörterbücher, Online-Bibliotheken, schnelles Nachschlagen).',
						'Warnen Sie vor Bequemlichkeit, Quellenfehlern und Ablenkung am Bildschirm.',
						'Formulieren Sie praktische Regeln für eigenständiges Denken und Datenschutz.'
					],
					themaZweiPrompt:
						'„Die Technik ist ein nützlicher Diener, aber ein schlechter Herr.“ Erklären Sie diese Aussage anhand von Beispielen aus dem Schulalltag (120 bis 145 Wörter).',
					modelAnswer:
						'Digitale Werkzeuge und Online-Bibliotheken gehören heute fest zum Schulalltag vieler Jugendlicher. Dennoch stellt sich die Frage, ob Bildschirme das klassische Lernen ersetzen können.\n\nEinerseits erleichtern geprüfte Fachportale, Wörterbücher und naturwissenschaftliche Simulationen die schnelle Recherche. Wer gezielt Informationen vergleicht, versteht komplexe Zusammenhänge oft rascher und gründlicher.\n\nAndererseits birgt die ständige Nutzung digitaler Geräte klare Gefahren für Konzentration und Eigenständigkeit. Obwohl automatische Programme Texte sofort zusammenfassen können, entwickelt nur eigenes Lesen, Exzerpieren und Nachdenken echte Urteilskraft. Außerdem muss jeder junge Mensch sorgfältig auf den Schutz persönlicher Daten achten und unseriöse Meldungen kritisch zurückweisen.\n\nZusammenfassend lässt sich sagen, dass digitale Technik ein nützlicher Diener, aber ein schlechter Herr ist. Wenn Schülerinnen und Schüler feste Lernzeiten ohne Bildschirm einhalten und Quellen prüfen, gelingt der Erfolg sicher.',
					rubricSummary:
						'Thematische Erfüllung (1.5) + Pro-Kontra-Gliederung (1.5) + Syntax & Nebensätze (1.5) + Fachwortschatz & Rechtschreibung (1.5).',
					quizzes: {
						easy: {
							q: 'Ordnen Sie die Aussagen den Chancen oder den Risiken digitaler Medien beim Lernen zu:',
							categories: ['Chancen beim Lernen', 'Risiken vermeiden'],
							items: [
								{ text: 'Gezielter Zugang zu Online-Wörterbüchern', category: 0 },
								{ text: 'Anschauliche naturwissenschaftliche Grafiken', category: 0 },
								{ text: 'Ungeprüftes Abschreiben automatischer Texte', category: 1 },
								{ text: 'Unvorsichtige Weitergabe privater Daten', category: 1 }
							],
							explanation: 'المقال الحجاجي المتوازن يميّز بدقة بين فوائد البحث العلمي ومخاطر الاتكال وانتهاك الخصوصية.'
						} as DragDropSpec,
						medium: {
							q: 'Klassifizieren Sie diese Konnektoren nach ihrer Rolle in der Erörterung:',
							categories: ['Gegenüberstellung (Pro/Kontra)', 'Folge oder Zweck'],
							items: [
								{ text: 'Einerseits ... andererseits', category: 0 },
								{ text: 'Dennoch / Obwohl', category: 0 },
								{ text: 'sodass / deshalb', category: 1 },
								{ text: 'um ... zu / damit', category: 1 }
							],
							explanation: 'توازن أدوات المقابلة بين الإيجابيات والحدود، بينما تربط أدوات الغاية والنتيجة الحلول بالهدف.'
						} as DragDropSpec,
						hard: {
							q: 'Ordnen Sie die Ausdrücke nach sachlich-akademischem BAC-Register oder unpassendem Stil:',
							categories: ['Akademisches BAC-Register', 'Unpassender Stil'],
							items: [
								{ text: 'Die Quellenkritik bildet eine Grundregel.', category: 0 },
								{ text: 'Meines Erachtens überwiegt das Gleichgewicht.', category: 0 },
								{ text: 'Ehrlich gesagt klicke ich einfach drauflos.', category: 1 },
								{ text: 'Das ist total egal, Hauptsache schnell.', category: 1 }
							],
							explanation: 'يتطلب التحرير الرسمي في البكالوريا أسلوباً رصيناً وموضوعياً.'
						} as DragDropSpec
					}
				},
				{
					themaEinsPrompt:
						'Verfassen Sie einen Artikel für die Schulzeitschrift (120 bis 145 Wörter) zum Thema : „Medienkompetenz und Quellenprüfung im Zeitalter schneller Nachrichten“.',
					themaEinsStichpunkte: [
						'Beschreiben Sie, warum sich falsche Meldungen im Netz so rasch verbreiten.',
						'Nennen Sie drei konkrete Prüfschritte (Autor, Datum, zweites Fachbuch).',
						'Betonen Sie Respekt und Ehrlichkeit auch in der digitalen Kommunikation.'
					],
					themaZweiPrompt:
						'„Nicht jede schnelle Information ist auch wahr.“ Warum braucht jeder Bürger heute geschulte Medienkompetenz? Begründen Sie in 120 bis 145 Wörtern.',
					modelAnswer:
						'In den sozialen Netzen verbreiten sich Nachrichten heute innerhalb weniger Sekunden weltweit. Deshalb wird Medienkompetenz zu einer zentralen Fähigkeit für Jugendliche in Schule und Gesellschaft.\n\nErstens zeigt die Erfahrung, dass nicht jede Meldung auf gesicherten Tatsachen beruht. Wer Überschriften ohne Nachprüfung weiterleitet, trägt ungewollt zur Verwirrung bei und gefährdet sachliche Diskussionen. Stattdessen sollte man stets prüfen, wer hinter einer Aussage steht und welche Belege genannt werden.\n\nZweitens spielt auch die Höflichkeit in der digitalen Kommunikation eine wichtige Rolle. Obwohl ein Bildschirm Distanz schafft, gelten dort dieselben Regeln von Respekt und Ehrlichkeit wie im direkten Gespräch.\n\nAbschließend bin ich überzeugt, dass aufmerksame Leserinnen und Leser den Unterschied machen: Wer Quellen kritisch vergleicht, schützt die Wahrheit, bewahrt die eigene Privatsphäre und stärkt das gegenseitige Vertrauen.',
					rubricSummary:
						'Aufgabenbezug (1.5) + Struktur & Kohäsion (1.5) + Grammatik & Relativ-/Nebensätze (1.5) + Lexik & Zeichensetzung (1.5).',
					quizzes: {
						easy: {
							q: 'Ordnen Sie die Verhaltensweisen nach „Verantwortungsvoll im Netz“ oder „Unvorsichtig“:',
							categories: ['Verantwortungsvoll im Netz', 'Unvorsichtig handeln'],
							items: [
								{ text: 'Autor und Erscheinungsdatum prüfen', category: 0 },
								{ text: 'Zahlen mit Fachbüchern vergleichen', category: 0 },
								{ text: 'Gerüchte sofort ohne Prüfung teilen', category: 1 },
								{ text: 'Vertrauliche Daten öffentlich posten', category: 1 }
							],
							explanation: 'التحقق المزدوج وحماية الخصوصية جوهر الكفاءة الإعلامية.'
						} as DragDropSpec,
						medium: {
							q: 'Ordnen Sie diese Bausteine den Teilen eines Artikels zu:',
							categories: ['Hauptteil (Argumente)', 'Schluss (Appell / Fazit)'],
							items: [
								{ text: 'Erstens zeigt die Erfahrung, dass ...', category: 0 },
								{ text: 'Stattdessen sollte man Belege prüfen.', category: 0 },
								{ text: 'Abschließend bin ich überzeugt, dass ...', category: 1 },
								{ text: 'So stärken wir gegenseitiges Vertrauen.', category: 1 }
							],
							explanation: 'يتضمن العرض الحجج والحلول، بينما يلخص الختام الرسالة التوجيهية.'
						} as DragDropSpec,
						hard: {
							q: 'Ordnen Sie die Satzmuster nach korrektem Konnektorgebrauch oder häufigem Fehler:',
							categories: ['Korrekter Satzbau', 'Typischer Fehler (vermeiden)'],
							items: [
								{ text: 'Obwohl Zeitdruck herrscht, prüfen wir Fakten.', category: 0 },
								{ text: 'Es fehlt Beleg; deshalb teilen wir nichts.', category: 0 },
								{ text: 'Obwohl herrscht Zeitdruck, wir prüfen Fakten.', category: 1 },
								{ text: 'Deshalb wir nichts teilen ohne Beleg.', category: 1 }
							],
							explanation: 'تذكر دائماً الفعل في نهاية جملة obwohl، والفعل في الموقع الثاني بعد deshalb!'
						} as DragDropSpec
					}
				},
				{
					themaEinsPrompt:
						'Schreiben Sie eine Stellungnahme (120 bis 145 Wörter) über das Verhältnis zwischen medizinischer Technik und menschlicher Verantwortung im Krankenhaus.',
					themaEinsStichpunkte: [
						'Würdigen Sie präzise Diagnosegeräte und schnellere Laboranalysen.',
						'Erklären Sie, warum das persönliche Gespräch und Geduld unverzichtbar bleiben.',
						'Betonen Sie den strengen Schutz vertraulicher Patientendaten.'
					],
					themaZweiPrompt:
						'„Wissenschaftlicher Fortschritt dient dem Menschen nur dann, wenn ethische Verantwortung ihn begleitet.“ Nehmen Sie zu diesem Grundsatz Stellung (120 bis 145 Wörter).',
					modelAnswer:
						'Moderne Krankenhäuser nutzen heute präzise Messgeräte, digitale Patientenakten und bildgebende Verfahren, die früher unvorstellbar schienen. Doch wie weit reicht der Wert technischer Mittel in der Medizin?\n\nZunächst helfen exakte Diagnoseverfahren Ärztinnen und Ärzten dabei, Krankheiten frühzeitig zu erkennen und passende Therapien einzuleiten. Dadurch steigen die Heilungschancen spürbar, während Fehlerquellen bei Laboranalysen deutlich sinken und der Alltag im Krankenhaus entlastet wird.\n\nTrotzdem ersetzt kein Computer das vertrauensvolle Gespräch und die menschliche Fürsorge am Krankenbett. Obwohl schnelle Datenauswertung wertvolle Zeit spart, brauchen Patientinnen und Patienten Aufmerksamkeit, Geduld und moralische Verantwortung. Ebenso müssen sensible Gesundheitsdaten streng vor unbefugtem Zugriff geschützt bleiben.\n\nZusammenfassend ergänzt moderne Medizintechnik die ärztliche Kunst sinnvoll, solange der Mensch stets im Mittelpunkt steht und wissenschaftlicher Fortschritt von ethischer Sorgfalt sowie aufrichtiger Hilfsbereitschaft begleitet wird.',
					rubricSummary:
						'Klarheit der Stellungnahme (1.5) + Logische Verknüpfung (1.5) + Grammatik & Indirekte/Passivstrukturen (1.5) + Wortschatz & Orthographie (1.5).',
					quizzes: {
						easy: {
							q: 'Ordnen Sie die Aspekte der Medizintechnik oder der menschlichen Ethik zu:',
							categories: ['Technische Unterstützung', 'Menschliche Ethik & Schutz'],
							items: [
								{ text: 'frühe und präzise Labordiagnose', category: 0 },
								{ text: 'geordnete digitale Patientenakten', category: 0 },
								{ text: 'geduldiges Zuhören am Krankenbett', category: 1 },
								{ text: 'strenger Schutz vertraulicher Daten', category: 1 }
							],
							explanation: 'يتكامل الأداء التقني الدقيق مع الضمير الإنساني وحفظ أسرار المرضى.'
						} as DragDropSpec,
						medium: {
							q: 'Ordnen Sie die Redemittel nach „Zustimmung / Vorteil“ oder „Einschränkung / Bedingung“:',
							categories: ['Vorteil / Zustimmung', 'Einschränkung / Bedingung'],
							items: [
								{ text: 'Zunächst helfen exakte Verfahren dabei ...', category: 0 },
								{ text: 'Dadurch steigen die Heilungschancen.', category: 0 },
								{ text: 'Trotzdem ersetzt kein Computer ...', category: 1 },
								{ text: '... solange der Mensch im Mittelpunkt steht.', category: 1 }
							],
							explanation: 'تسلسل الحجج يحتاج إلى عبارات إثبات ثم أدوات تقييد واشتراط.'
						} as DragDropSpec,
						hard: {
							q: 'Unterscheiden Sie korrekte Relativsätze von fehlerhaften Anschlüssen:',
							categories: ['Korrekter Relativsatz', 'Fehlerhafter Anschluss'],
							items: [
								{ text: 'Geräte, mit denen Labore arbeiten', category: 0 },
								{ text: 'Daten, deren Schutz Pflicht bleibt', category: 0 },
								{ text: 'Geräte, mit die Labore arbeiten', category: 1 },
								{ text: 'Daten, dessen Schutz Pflicht bleibt', category: 1 }
							],
							explanation: '„mit“ يطلب Dativ Plural „denen“، و„Daten“ جمع فتأخذ في الإضافة „deren“ لا „dessen“.'
						} as DragDropSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const { quizQuestion, finalAnswer } = buildDragDropPayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'III. Schriftlicher Ausdruck',
				points: 6,
				instruction: 'Wählen Sie EINES der beiden folgenden Themen aus und schreiben Sie einen geordneten Text (6 Punkte — BAC 3AS LE) :',
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
				trimesterId: 't2',
				difficulty,
				domain: 'schriftlicher_ausdruck',
				examRole: 'written_expression',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'وازن دائماً في مواضيع التكنولوجيا بين فوائد البحث والطب وضرورة الوعي وحماية البيانات.',
					'وظّف أدوات الربط التي درستها في هذا الفصل: um...zu, damit, obwohl, trotzdem, sodass.',
					'حافظ على 4 فقرات واضحة وطول بين 120 و 145 كلمة.'
				],
				solutionStepsAr: [
					'تغطية عناصر الموضوع المختار بوضوح (1.5 نقطة).',
					'تماسك الفقرات وتدرج الحجج بالروابط (1.5 نقطة).',
					'سلامة النحو والصرف وموضع الأفعال (1.5 نقطة).',
					'دقة المعجم وعلامات الترقيم والكتابة الكبيرة (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 6. WRITTEN EXPRESSION (6 Pkt. — Integration): Umweltschutz & Solarenergie
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ger_tpl_3as_le_t2_writ_umwelt_solarenergie',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'schriftlicher_ausdruck',
		titleAr: 'التعبير الكتابي (6 نقاط — بكالوريا): الطاقة الشمسية في الصحراء، التشجير وحماية البيئة',
		curriculumLessonId: 'ger_lesson_3as_le_t2_umweltschutz_energien',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					themaEinsPrompt:
						'Verfassen Sie einen Sachaufsatz (120 bis 145 Wörter) über die Chancen der Solarenergie in der algerischen Sahara für Klimaschutz und Jugendbeschäftigung.',
					themaEinsStichpunkte: [
						'Vergleichen Sie begrenzte fossile Brennstoffe mit sauberem Sonnenstrom.',
						'Nennen Sie Einsatzfelder wie Wasserpumpen, Schulen und grünen Wasserstoff.',
						'Zeigen Sie, warum Ausbildung junger Fachkräfte für die Wartung nötig ist.'
					],
					themaZweiPrompt:
						'„Die Wende zu erneuerbaren Energien ist zugleich eine ökologische Pflicht und eine wirtschaftliche Chance.“ Nehmen Sie dazu in 120 bis 145 Wörtern Stellung.',
					modelAnswer:
						'Angesichts des weltweiten Klimawandels gewinnt der Ausbau sauberer Energiequellen zunehmend an Bedeutung. Warum besitzt gerade Algerien dafür außergewöhnliche Voraussetzungen?\n\nErstens bietet die algerische Sahara durch intensive Sonneneinstrahlung und weite Flächen ein enormes Potenzial für moderne Solarkraftwerke. Im Gegensatz zu fossilen Brennstoffen verursacht Sonnenstrom im Betrieb kaum schädliche Abgase und schont endliche Vorräte.\n\nZweitens schafft die Energiewende neue berufliche Chancen für junge Ingenieurinnen, Techniker und Handwerker in den Bereichen Wartung, Speicherung und Wasserentsalzung. Obwohl der Aufbau großer Anlagen anfangs hohe Investitionen und Fachwissen erfordert, lohnt sich dieser Schritt langfristig für Umwelt und Wirtschaft gleichermaßen.\n\nAbschließend lässt sich festhalten, dass Investitionen in Solarenergie und Ausbildung eine doppelte Brücke bauen: Sie schützen die Natur für kommende Generationen und stärken nachhaltige Arbeitsplätze im eigenen Land.',
					rubricSummary:
						'Thematische Dichte (1.5) + Struktur in 4 Absätzen (1.5) + Grammatik & Konnektoren (1.5) + Fachlexik & Rechtschreibung (1.5).',
					quizzes: {
						easy: {
							q: 'Ordnen Sie die Schritte des Aufsatzes zur Solarenergie in die logische Reihenfolge:',
							orderedItems: [
								'Klimawandel und Sonnenpotenzial der Sahara vorstellen',
								'Vorteile sauberer Energie gegenüber Kohle und Öl erklären',
								'Berufschancen und Ausbildungsbedarf trotz Anfangskosten zeigen',
								'Mit dem Nutzen für kommende Generationen schließen'
							],
							explanation: 'التدرج يبدأ بالإشكالية المناخية ثم المزايا البيئية ثم فرص العمل والتكوين فالخاتمة.'
						} as OrderingSpec,
						medium: {
							q: 'Bringen Sie diese Kausal- und Folgekette in eine sinnvolle Reihenfolge:',
							orderedItems: [
								'Die Sahara erhält über dreitausend Sonnenstunden pro Jahr.',
								'Dadurch lassen sich leistungsstarke Solarparks betreiben.',
								'Um die Anlagen zu warten, werden junge Techniker ausgebildet.',
								'Folglich entstehen saubere Energie und sichere Arbeitsplätze.'
							],
							explanation: 'سلسلة منطقية من المعطى الطبيعي إلى المشروع التقني إلى التكوين فالنتيجة الاقتصادية.'
						} as OrderingSpec,
						hard: {
							q: 'Ordnen Sie die vier Teilsätze zu einer abwägenden Schlussfolgerung:',
							orderedItems: [
								'Obwohl Solaranlagen zunächst hohe Mittel beanspruchen,',
								'überwiegen auf lange Sicht saubere Luft und regionale Wertschöpfung.',
								'Deshalb sollten Technik und Berufsausbildung gemeinsam wachsen,',
								'damit das Land nachhaltig von der Sonne profitiert.'
							],
							explanation: 'تجمع الخاتمة بين الاعتراض (Obwohl) والاستنتاج (Deshalb) والغاية (damit).'
						} as OrderingSpec
					}
				},
				{
					themaEinsPrompt:
						'Schreiben Sie einen Beitrag (120 bis 145 Wörter) über das Zusammenwirken großer Projekte wie des Grünen Damms und kleiner Alltagsgewohnheiten im Umweltschutz.',
					themaEinsStichpunkte: [
						'Erklären Sie die Schutzfunktion von Bäumen gegen Erosion und Wüstenbildung.',
						'Nennen Sie drei tägliche Sparmaßnahmen bei Wasser, Strom und Müll.',
						'Motivieren Sie junge Menschen zur Teilnahme an schulischen Umweltaktionen.'
					],
					themaZweiPrompt:
						'„Umweltschutz beginnt im eigenen Zimmer und Klassenzimmer.“ Begründen Sie diese Ansicht mit konkreten Beispielen in 120 bis 145 Wörtern.',
					modelAnswer:
						'Viele Menschen verbinden Umweltschutz vor allem mit großen internationalen Konferenzen und teuren Industrieanlagen. Dabei stellt sich die Frage, welchen konkreten Beitrag Schulen und Jugendliche vor Ort leisten können.\n\nEinerseits zeigt das Beispiel des Grünen Damms gegen die Wüstenbildung, wie wirksam Bäume fruchtbaren Boden festhalten und das lokale Klima verbessern. Wenn Schülerinnen und Schüler an regionalen Pflanzaktionen teilnehmen, erleben sie unmittelbar, wie Geduld und gemeinsame Arbeit die Natur schützen.\n\nAndererseits beginnt echte Nachhaltigkeit schon im Alltag bei kleinen Gewohnheiten. Wer Wasser beim Zähneputzen spart, unnötiges Licht ausschaltet, Abfälle trennt und Hefte beidseitig nutzt, vermeidet unnötige Verschwendung.\n\nZusammenfassend bin ich der Ansicht, dass große Umweltprojekte und tägliches Verantwortungsbewusstsein einander brauchen. Jeder einzelne Beitrag zählt, damit wir unseren Lebensraum sauber, grün und lebenswert bewahren.',
					rubricSummary:
						'Inhaltliche Ausgewogenheit (1.5) + Absatzgliederung (1.5) + Grammatik & Satzstellung (1.5) + Wortschatz & Orthographie (1.5).',
					quizzes: {
						easy: {
							q: 'Ordnen Sie die vier Bausteine eines Meinungsartikels über Umweltbildung:',
							orderedItems: [
								'Kontrast zwischen großen Konferenzen und lokalem Handeln',
								'Nutzen gemeinsamer Baumpflanzaktionen wie beim Grünen Damm',
								'Konkrete Spargewohnheiten im Schulalltag und Haushalt',
								'Synthese aus Gesamtprojekten und persönlicher Verantwortung'
							],
							explanation: 'تصميم رباعي متوازن ينتقل من العام إلى الميدان ثم السلوك الفردي فالخلاصة.'
						} as OrderingSpec,
						medium: {
							q: 'Ordnen Sie die ökologische Wirkungskette eines gepflanzten Baumes:',
							orderedItems: [
								'Schülerinnen und Schüler pflanzen gemeinsam junge Bäume.',
								'Die Wurzeln halten den fruchtbaren Boden gegen Wind fest.',
								'Herabfallendes Laub bildet mit der Zeit nährstoffreichen Humus.',
								'So bleibt das Wasser im Boden und die Wüste dringt nicht vor.'
							],
							explanation: 'تتابع بيئي طبيعي يفسر كيف تكافح الأشجار التصحر والتعرية.'
						} as OrderingSpec,
						hard: {
							q: 'Ordnen Sie die Sätze für einen kohärenten Alltags-Absatz mit „um...zu“ und „sodass“:',
							orderedItems: [
								'Im Alltag lassen sich wertvolle Ressourcen leicht schützen.',
								'Dazu drehen wir den Wasserhahn rechtzeitig zu, um Trinkwasser zu sparen.',
								'Außerdem sammeln wir Papier getrennt, sodass es recycelt wird.',
								'Diese einfachen Schritte stärken nachhaltiges Bewusstsein in der Schule.'
							],
							explanation: 'تسلسل من الجملة المحورية إلى مثال الغاية (um...zu) ومثال النتيجة (sodass) ثم التلخيص.'
						} as OrderingSpec
					}
				},
				{
					themaEinsPrompt:
						'Schreiben Sie einen höflichen Vorschlagbrief an die Gemeindeleitung (120 bis 145 Wörter), in dem Ihre Klasse ein lokales Recycling- und Baumpflanzprojekt vorschlägt.',
					themaEinsStichpunkte: [
						'Verwenden Sie die formelle Anrede und die Höflichkeitsform „Sie“.',
						'Schildern Sie das Problem achtlos weggeworfener Flaschen und Papiere vor dem Gymnasium.',
						'Bieten Sie tatkräftige Mithilfe Ihrer Klasse am Samstagvormittag an.'
					],
					themaZweiPrompt:
						'„Abfallvermeidung ist besser als jede Müllhalde.“ Erörtern Sie Maßnahmen gegen Verpackungsmüll in Städten (120 bis 145 Wörter).',
					modelAnswer:
						'Sehr geehrte Frau Bürgermeisterin, sehr geehrter Herr Bürgermeister,\n\nals engagierte Schülerinnen und Schüler der Klasse 3AS LE möchten wir Ihnen einen konkreten Vorschlag zur besseren Mülltrennung und zur Begrünung rund um unser Gymnasium unterbreiten.\n\nIn den letzten Monaten haben wir beobachtet, dass auf den Schulwegen oft Plastikflaschen und Papier achtlos weggeworfen werden. Wenn vor dem Schultor deutlich beschriftete Sammelbehälter für Papier, Glas und Kunststoff aufgestellt würden, könnten Abfälle geordnet gesammelt und wiederverwertet werden.\n\nDarüber hinaus sind wir bereit, an einem Samstagvormittag gemeinsam mit unseren Lehrkräften dreißig junge Schattenbäume entlang der Straße zu pflanzen, sofern die Gemeinde uns Setzlinge und einfaches Gartenwerkzeug zur Verfügung stellt.\n\nWir danken Ihnen herzlich für Ihre Aufmerksamkeit und freuen uns über Ihre Unterstützung.\n\nMit freundlichen Grüßen\nDie Umweltgruppe der Klasse 3AS LE',
					rubricSummary:
						'Briefkonvention & „Sie“-Anrede (1.5) + Konkrete Argumentation (1.5) + Grammatik & Passiv/Konditional (1.5) + Wortschatz & Rechtschreibung (1.5).',
					quizzes: {
						easy: {
							q: 'Ordnen Sie die Abschnitte des Projektbriefes an die Gemeinde von oben nach unten:',
							orderedItems: [
								'Höfliche Anrede an die Bürgermeisterin oder den Bürgermeister',
								'Vorstellung der Klasse und des doppelten Umweltvorschlags',
								'Beschreibung des Müllproblems und Vorschlag für Sammelbehälter',
								'Angebot zur Baumpflanzaktion sowie Dank und Grußformel'
							],
							explanation: 'ترتيب منطقي ومقنع لرسالة الاقتراح الرسمية.'
						} as OrderingSpec,
						medium: {
							q: 'Ordnen Sie die Lösungsschritte gegen Abfall rund um die Schule:',
							orderedItems: [
								'Beobachtung achtenlos weggeworfener Flaschen und Papiere',
								'Aufstellung beschrifteter Behälter für getrennte Sammlung',
								'Ordentliche Wiederverwertung der gesammelten Rohstoffe',
								'Saubere Umgebung und mehr Umweltbewusstsein im Viertel'
							],
							explanation: 'من التشخيص الميداني إلى التجهيز ثم التدوير فالأثر البيئي الإيجابي.'
						} as OrderingSpec,
						hard: {
							q: 'Ordnen Sie die Bestandteile eines höflichen Kooperationsangebots mit „sofern“:',
							orderedItems: [
								'Unsere Klasse möchte dreißig Schattenbäume pflanzen,',
								'indem wir am Samstagvormittag tatkräftig mithelfen,',
								'sofern die Gemeinde Setzlinge und Werkzeuge bereitstellt,',
								'damit der Schulweg künftig grüner und angenehmer wird.'
							],
							explanation: 'تركيب مترابط يجمع بين المبادرة (indem) والشرط المهذب (sofern) والغاية (damit).'
						} as OrderingSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const { quizQuestion, finalAnswer } = buildOrderingPayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'III. Schriftlicher Ausdruck',
				points: 6,
				instruction: 'Wählen Sie EINES der beiden folgenden Themen aus und formulieren Sie einen klaren Text (6 Punkte — BAC 3AS LE) :',
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
				trimesterId: 't2',
				difficulty,
				domain: 'schriftlicher_ausdruck',
				examRole: 'written_expression',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'في مواضيع البيئة استثمر مفردات المنهج بدقة: Solarenergie, Nachhaltigkeit, Aufforstung, Mülltrennung, Ressourcen schonen.',
					'احرص على التناوب بين الحلول الوطنية (الطاقة الشمسية، السد الأخضر) والسلوك الفردي اليومي.',
					'التزم بطول 120–145 كلمة وتصميم منظم مع مراجعة الأخطاء الإملائية والنحوية.'
				],
				solutionStepsAr: [
					'تحديد الفكرة والالتزام بتعليمة الموضوع المختار (1.5 نقطة).',
					'تسلسل الحجج والأمثلة والروابط المنطقية (1.5 نقطة).',
					'سلامة النحو واستعمال الجمل التابعة والمبني للمجهول (1.5 نقطة).',
					'ثراء المفردات ودقة الإملاء والترقيم (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	}
];
