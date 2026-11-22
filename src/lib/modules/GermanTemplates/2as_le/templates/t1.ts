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
	svgGermanTenseTimeline
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

export const TEMPLATES_2AS_LE_T1: GermanParameterizedTemplate[] = [
	// 1. Textverständnis (7 Pkt.) — true_false quiz
	{
		id: 'ger_tpl_2as_le_t1_comp_schulalltag_familie',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'textverstaendnis',
		titleAr: 'I. Textverständnis : Schulalltag, Familie und Lerngewohnheiten in Algerien (7 Pkt.)',
		curriculumLessonId: 'ger_lesson_2as_le_t1_persoenliches_leben_schule',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					useIllus: true,
					passageTitle: 'Mein Schulalltag in Constantine und die Unterstützung meiner Familie',
					paragraphs: [
						'Ich heiße Yassin, bin sechzehn Jahre alt und besuche das Gymnasium in Constantine im Zweig für Fremdsprachen. Neben Arabisch, Französisch und Englisch lerne ich seit diesem Schuljahr begeistert Deutsch. Jeden Morgen stehe ich um sechs Uhr auf, frühstücke mit meinen Eltern und meiner jüngeren Schwester und gehe pünktlich zur Schule.',
						'Der Unterricht fängt um acht Uhr an und verlangt viel Aufmerksamkeit. In der großen Pause treffe ich meine Mitschüler in der Schulbibliothek, wo wir gemeinsam schwierige Wörter im Wörterbuch nachschlagen. Unsere Deutschlehrerin ermutigt [[uns]], regelmäßig kurze Texte laut vorzulesen.',
						'Am Nachmittag bereite ich zuerst meine Hausaufgaben ordentlich vor und helfe danach meinem Vater im Gemüsegarten oder meiner Mutter in der Küche mit. Durch [[diese gute Tagesordnung]] bleibt mir am Abend noch Zeit für ein ruhiges Geschichtsbuch.'
					],
					source: 'Schülerzeitung für Fremdsprachen (gekürzt und bearbeitet)',
					glossary: [
						{ term: 'nachschlagen', meaning: 'ein Wort in einem Wörterbuch oder Buch suchen' },
						{ term: 'Tagesordnung', meaning: 'feste und vernünftige Einteilung des Tages' }
					],
					q1: '1. Wer ist Yassin, welche Sprachen lernt er und warum trifft er seine Mitschüler in der Pause?',
					a1: 'Yassin ist ein sechzehnjähriger Gymnasiast aus Constantine im Zweig Fremdsprachen. Er lernt Arabisch, Französisch, Englisch und Deutsch. In der Pause trifft er seine Mitschüler in der Schulbibliothek, um gemeinsam Wörter im Wörterbuch nachzuschlagen.',
					tfItems: [
						{
							q: 'Yassin schläft morgens lange und kommt oft zu spät ins Gymnasium.',
							a: 'Falsch',
							c: 'Er steht jeden Morgen um sechs Uhr auf und geht pünktlich zur Schule.',
							mark: '0.5'
						},
						{
							q: 'Die Deutschlehrerin empfiehlt den Schülern, regelmäßig laut vorzulesen.',
							a: 'Richtig',
							c: 'Im §2 steht, dass die Deutschlehrerin sie ermutigt, regelmäßig kurze Texte laut vorzulesen.',
							mark: '0.5'
						},
						{
							q: 'Nach den Hausaufgaben hilft Yassin seinen Eltern zu Hause mit.',
							a: 'Richtig',
							c: 'Er hilft seinem Vater im Gemüsegarten oder seiner Mutter in der Küche mit.',
							mark: '0.5'
						}
					],
					q3: '3. Suchen Sie im Text :\n  a) Das Synonym von „beginnt“ (§2) und das Antonym von „unpünktlich“ (§1).\n  b) Vier Wörter aus dem Wortfeld „Schule und Lernen“ (§1-§2).',
					a3: 'a) Synonym von beginnt : fängt ... an (anfangen) ; Antonym von unpünktlich : pünktlich. | b) Wortfeld Schule : Gymnasium, Fremdsprachen, Schuljahr, Unterricht, Pause, Schulbibliothek, Wörterbuch, Hausaufgaben.',
					q4: '4. Worauf beziehen sich die unterstrichenen Ausdrücke „uns“ (§2) und „diese gute Tagesordnung“ (§3)?',
					a4: '„uns“ bezieht sich auf Yassin und seine Mitschüler im Fremdsprachenzweig. „diese gute Tagesordnung“ bezieht sich auf das rechtzeitige Vorbereiten der Hausaufgaben und die Mithilfe bei den Eltern am Nachmittag.',
					quizStatement:
						'Laut dem Text schlägt Yassin in der Pause gemeinsam mit seinen Mitschülern Wörter in der Schulbibliothek nach und hilft nachmittags seiner Familie.',
					quizCorrect: true,
					quizExplanation:
						'العبارة صحيحة: النص يؤكد أن ياسين يراجع المفردات مع زملائه في مكتبة المدرسة خلال الاستراحة ويساعد والديه بعد الظهر.'
				},
				{
					useIllus: false,
					passageTitle: 'Ein neuer Sprachklub in der Schulbibliothek von Tlemcen',
					paragraphs: [
						'In diesem Trimester hat das Gymnasium in Tlemcen einen kleinen Sprachklub für die Klassen der 2AS eingerichtet. Jeden Dienstag nach dem Nachmittagsunterricht kommen fünfzehn Schülerinnen und Schüler in den ruhigen Lesesaal der Bibliothek, um Deutsch praktisch zu üben.',
						'Die Leiterin des Klubs, Frau Mansouri, bringt aktuelle Zeitungsartikel über Bildung, Natur und algerisches Kulturerbe mit. Zuerst lesen die Jugendlichen [[die kurzen Abschnitte]] still durch, danach stellen sie einander Fragen zu den wichtigsten Informationen und notieren neue Verben.',
						'Salma nimmt seit einem Monat an [[dieser AG]] teil und bemerkt bereits deutliche Fortschritte. Früher hatte sie beim Sprechen etwas Angst vor Fehlern, aber heute formuliert sie ganze Sätze mit viel mehr Selbstvertrauen.'
					],
					source: 'Schulchronik Tlemcen (leicht bearbeitet)',
					glossary: [
						{ term: 'einrichten', meaning: 'etwas neu schaffen und organisieren' },
						{ term: 'AG (Arbeitsgemeinschaft)', meaning: 'freiwillige schulische Lerngruppe nach dem Unterricht' }
					],
					q1: '1. Was hat das Gymnasium in Tlemcen eingerichtet und wie arbeiten die Schüler am Dienstagnachmittag?',
					a1: 'Das Gymnasium hat einen Sprachklub für die 2AS eingerichtet. Am Dienstagnachmittag lesen die Schüler kurze Artikel über Bildung, Natur und Kulturerbe still durch, stellen einander Fragen und notieren neue Verben.',
					tfItems: [
						{
							q: 'Der Sprachklub findet jeden Dienstag früh vor der ersten Unterrichtsstunde statt.',
							a: 'Falsch',
							c: 'Die Schüler treffen sich dienstags nach dem Nachmittagsunterricht.',
							mark: '0.5'
						},
						{
							q: 'Im Klub werden Texte über Bildung, Natur und algerisches Kulturerbe bearbeitet.',
							a: 'Richtig',
							c: 'Frau Mansouri bringt aktuelle Artikel zu genau diesen drei Themen mit.',
							mark: '0.5'
						},
						{
							q: 'Salma hat trotz ihrer Teilnahme noch keinen einzigen Fortschritt beim Sprechen gemacht.',
							a: 'Falsch',
							c: 'Im §3 steht, dass sie bereits deutliche Fortschritte bemerkt und mit mehr Selbstvertrauen spricht.',
							mark: '0.5'
						}
					],
					q3: '3. Finden Sie im Text :\n  a) Das Synonym von „lautlos / ruhig“ (§2) und das Antonym von „später / heute“ für „früher“ (§3).\n  b) Zwei trennbare Verben aus dem Text im Infinitiv.',
					a3: 'a) Synonym von ruhig : still ; Antonym von früher : heute. | b) Trennbare Verben : einrichten (eingerichtet), mitbringen (bringt ... mit), durchlesen (lesen ... durch), teilnehmen (nimmt ... teil).',
					q4: '4. Worauf beziehen sich die unterstrichenen Wörter „die kurzen Abschnitte“ (§2) und „dieser AG“ (§3)?',
					a4: '„die kurzen Abschnitte“ bezieht sich auf die Teile der aktuellen Zeitungsartikel von Frau Mansouri. „dieser AG“ bezieht sich auf den Sprachklub für Deutsch in der Schulbibliothek.',
					quizStatement:
						'Im Sprachklub in Tlemcen lernen die Schülerinnen und Schüler Deutsch, indem sie Artikel still durchlesen, Fragen stellen und neue Verben aufschreiben.',
					quizCorrect: true,
					quizExplanation:
						'العبارة صحيحة: تتضمن أنشطة النادي قراءة المقالات بتركيز وطرح الأسئلة وتدوين الأفعال الجديدة.'
				},
				{
					useIllus: true,
					passageTitle: 'Brief von Meriem über das neue Schuljahr in Algier',
					paragraphs: [
						'Liebe Amina, herzliche Grüße aus Algier! Unser neues Schuljahr hat vor drei Wochen angefangen, und mein Stundenplan in der 2AS gefällt mir sehr gut. Dieses Jahr haben wir fünf Stunden Deutsch pro Woche, weil wir den Zweig Fremdsprachen gewählt haben.',
						'Mein älterer Bruder Karim unterstützt mich oft beim Lernen, da er bereits Informatik studiert und sehr geduldig erklärt. Wenn ich neue Vokabeln lerne, schreibe ich [[jedes Wort]] mit seinem Artikel und einem Beispielsatz in mein rotes Heft.',
						'Am Wochenende besuche ich manchmal mit meinen Eltern meine Großeltern in Blida. Dort lesen wir gemeinsam oder arbeiten im Garten. Schreib mir bald zurück und erzähle mir, wie [[deine neue Klasse]] ist! Viele Grüße, deine Meriem.'
					],
					source: 'Jugendkorrespondenz aus Algerien (bearbeitet)',
					glossary: [
						{ term: 'Stundenplan', meaning: 'Übersicht über die wöchentlichen Unterrichtsstunden' },
						{ term: 'unterstützen', meaning: 'jemandem tatkräftig helfen' }
					],
					q1: '1. Wie viele Stunden Deutsch hat Meriem pro Woche und wie lernt sie neue Vokabeln?',
					a1: 'Meriem hat fünf Stunden Deutsch pro Woche. Sie schreibt jedes neue Wort mit seinem Artikel und einem Beispielsatz in ihr rotes Heft.',
					tfItems: [
						{
							q: 'Meriem hat vor genau drei Tagen mit dem neuen Schuljahr begonnen.',
							a: 'Falsch',
							c: 'Ihr neues Schuljahr hat vor drei Wochen angefangen.',
							mark: '0.5'
						},
						{
							q: 'Karim ist ungeduldig und will seiner Schwester nicht beim Lernen helfen.',
							a: 'Falsch',
							c: 'Im §2 heißt es, dass er sie oft unterstützt und sehr geduldig erklärt.',
							mark: '0.5'
						},
						{
							q: 'Am Wochenende besucht Meriem manchmal ihre Großeltern in Blida.',
							a: 'Richtig',
							c: 'Sie besucht sie mit ihren Eltern am Wochenende in Blida.',
							mark: '0.5'
						}
					],
					q3: '3. Suchen Sie im Text :\n  a) Das Synonym von „hilft“ (§2) und das Antonym von „jünger“ (§2).\n  b) Drei Familienmitglieder, die im Brief erwähnt werden.',
					a3: 'a) Synonym von hilft : unterstützt ; Antonym von jünger : älter (älterer). | b) Familienmitglieder : Bruder, Eltern, Großeltern.',
					q4: '4. Worauf beziehen sich die unterstrichenen Wörter „jedes Wort“ (§2) und „deine neue Klasse“ (§3)?',
					a4: '„jedes Wort“ bezieht sich auf die neuen deutschen Vokabeln, die Meriem lernt. „deine neue Klasse“ bezieht sich auf die Schulklasse der Brieffreundin Amina.',
					quizStatement:
						'Meriem schreibt in ihrem Brief, dass man neue Wörter ohne Artikel und ohne Beispielsätze lernen soll.',
					quizCorrect: false,
					quizExplanation:
						'العبارة خاطئة: مريم تكتب كل مفردة جديدة مع أداة التعريف وجملة توضيحية في دفترها الأحمر.'
				}
			];

			const v = rng.pick(variants);
			const content: ContentBlock[] = [];
			if (v.useIllus) {
				content.push(
					buildIllustratedFigureBlock('ger_03_bildung_sprachen_bibliothek', {
						lang: 'de',
						mode: 'labeled',
						pins: [],
						width: '62%',
						maxHeight: 118,
						caption: 'Bildung, Fremdsprachen und fleißiges Lernen in der Schulbibliothek'
					})
				);
			}
			content.push(
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
					content: '2. Entscheiden Sie : Richtig oder Falsch? Begründen Sie Ihre Antwort nach dem Text :',
					mark: ''
				},
				{ type: 'true_false', items: v.tfItems },
				{ type: 'text', content: v.q3, answer: v.a3, mark: '2.0' },
				{ type: 'text', content: v.q4, answer: v.a4, mark: '1.5' }
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'true_false',
					questionText: v.quizStatement,
					questionTextAr: 'حدّد صحة أو خطأ العبارة الآتية انطلاقاً من النص:',
					questionData: {
						correctAnswer: v.quizCorrect
					},
					explanation: v.quizExplanation
				},
				sujetExercise: {
					customTitle: 'I. Textverständnis',
					points: 7,
					instruction: 'Lesen Sie den Text aufmerksam durch und beantworten Sie die Fragen :',
					content
				},
				hints: [
					'اقرأ الفقرات الثلاث بدقة وحدّد موقع الإجابة في الفقرة المناسبة (§1، §2، §3).',
					'في أسئلة Richtig / Falsch علّل إجابتك دائماً بجملة دقيقة من النص.',
					'انتبه إلى جنس وعدد الكلمة المسطرة عند تحديد عائدها النحوي.'
				],
				solutionStepsAr: [
					'الإجابة الدقيقة عن سؤال الفهم الشامل (2.0 نقطة).',
					'تحديد صحة أو خطأ العبارات مع التعليل النصي (1.5 نقطة).',
					'استخراج المترادفات والأضداد والحقل المعجمي أو الأفعال المنفصلة (2.0 نقطة).',
					'تعيين عائد الكلمات المسطرة في النص (1.5 نقطة).'
				],
				finalAnswer: v.quizCorrect ? 'Richtig' : 'Falsch'
			};
		}
	},

	// 2. Textverständnis (7 Pkt.) — mcq quiz
	{
		id: 'ger_tpl_2as_le_t1_comp_tagesablauf_regeln',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'textverstaendnis',
		titleAr: 'I. Textverständnis : Tagesablauf, Schulregeln und Vergangenheitserlebnisse (7 Pkt.)',
		curriculumLessonId: 'ger_lesson_2as_le_t1_verben_praesens_modalverben',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					passageTitle: 'Disziplin und Zeitplanung: So gelingt der Tag',
					paragraphs: [
						'Bis zum letzten Schuljahr verbrachte Sami abends zu viele Stunden am Smartphone und ging oft erst nach Mitternacht schlafen. Am nächsten Morgen war er im Unterricht müde und konnte sich kaum auf [[die Grammatikübungen]] konzentrieren. Schließlich gab ihm sein älterer Bruder einen vernünftigen Rat.',
						'Seit zwei Monaten folgt Sami einem klaren Tagesplan: Um sechs Uhr muss er aufstehen, er wäscht sich, betet und frühstückt in Ruhe mit seinen Eltern. Nach der Schule legt er sein Handy in ein anderes Zimmer, damit er eine Stunde lang ohne Ablenkung lernen kann.',
						'Diese Woche hat Sami schon zwei Referate erfolgreich gehalten, und alle [[seine Lehrer]] haben seine neue Ausdauer gelobt. Heute fühlt er sich ruhiger, weil er Arbeit und Erholung sinnvoll verbindet.'
					],
					source: 'Pädagogisches Jugendmagazin (bearbeitet)',
					glossary: [
						{ term: 'Ablenkung', meaning: 'Störung der Konzentration durch nebensächliche Dinge' },
						{ term: 'Ausdauer', meaning: 'Beständigkeit und Geduld bei einer Aufgabe' }
					],
					q1: '1. Welches Problem hatte Sami bis zum letzten Schuljahr und welche zwei Gewohnheiten hat er geändert?',
					a1: 'Problem: Sami verbrachte abends zu viel Zeit am Smartphone, schlief spät und war im Unterricht müde. Änderungen: Er steht um sechs Uhr nach einem klaren Plan auf und legt beim Lernen nachmittags das Handy weg.',
					mcGroups: [
						{
							header: 'a) Warum legt Sami sein Smartphone nach der Schule in ein anderes Zimmer?',
							options: [
								'Weil das Gerät kaputt und unbrauchbar geworden ist',
								'Damit er eine Stunde lang ohne Ablenkung lernen kann',
								'Weil seine Mitschüler das Handy ausgeliehen haben'
							],
							correct: 'Damit er eine Stunde lang ohne Ablenkung lernen kann',
							mark: '1.0'
						},
						{
							header: 'b) Was bedeutet das Verb „muss“ in „Um sechs Uhr muss er aufstehen“?',
							options: [
								'Eine strenge Pflicht oder Notwendigkeit im Tagesplan',
								'Eine zukünftige Reise am kommenden Monat',
								'Ein Verbot durch die Schulleitung'
							],
							correct: 'Eine strenge Pflicht oder Notwendigkeit im Tagesplan',
							mark: '1.0'
						}
					],
					q3: '3. Finden Sie im Text :\n  a) Das Synonym von „schließlich / am Ende“ (§1) und das Antonym von „wach / munter“ (§1).\n  b) Zwei Modalverben in konjugierter Form aus dem Text (§1-§2).',
					a3: 'a) Synonym : schließlich ; Antonym von wach : müde. | b) Modalverben : konnte (Präteritum von können), muss (Präsens von müssen), kann (Präsens von können).',
					q4: '4. Worauf beziehen sich die Ausdrücke „die Grammatikübungen“ (§1) und „seine Lehrer“ (§3)?',
					a4: '„die Grammatikübungen“ bezieht sich auf die schulischen Aufgaben im Unterricht. „seine Lehrer“ bezieht sich auf die Lehrkräfte von Sami, die seine zwei Referate gelobt haben.',
					mcqQuestion: 'Warum verwendet der Text im dritten Absatz das Perfekt („hat ... gehalten“, „haben ... gelobt“)?',
					mcqQuestionAr: 'لماذا استُعمل زمن الماضي المركب (Perfekt) في الفقرة الثالثة؟',
					mcqCorrect: 'Um über abgeschlossene Erfolge in dieser Woche mit Bezug zur Gegenwart zu berichten',
					mcqDistractors: [
						{
							text: 'Um ein Verbot in der Schulbibliothek auszudrücken',
							diagnosticFeedback: 'خطأ: صيغة المنع تُعبّر بـ nicht dürfen لا بزمن الماضي المركب.'
						},
						{
							text: 'Um zukünftige Pläne für das nächste Jahr anzukündigen',
							diagnosticFeedback: 'خطأ: المستقبل يُصاغ بـ Futur I، أما عبارة Diese Woche ففي الماضي القريب.'
						},
						{
							text: 'Weil trennbare Verben im Perfekt nicht vorkommen dürfen',
							diagnosticFeedback: 'خطأ: الأفعال المنفصلة تُستعمل في Perfekt بشكل طبيعي.'
						}
					],
					mcqExplanation: 'يُستخدم زمن Perfekt في الألمانية لرواية أحداث منجزة قريبة ذات صلة بالحاضر (Diese Woche).'
				},
				{
					passageTitle: 'Ordnung und Respekt im Klassenzimmer',
					paragraphs: [
						'Eine gute Lernatmosphäre entsteht nicht von allein, sondern durch klare Regeln, die alle gemeinsam achten. In unserer Schule in Oran haben wir zu Beginn des Trimesters fünf einfache Grundsätze für [[unsere Klasse]] vereinbart.',
						'Erstens darf niemand den Unterricht stören, wenn ein Mitschüler spricht. Zweitens muss jeder pünktlich mit seinen Büchern und Heften im Raum sein. Drittens sollen die Schülerinnen und Schüler einander höflich zuhören und den Klassenraum am Ende des Tages sauber hinterlassen.',
						'Seitdem [[wir]] diese Regeln konsequent einhalten, verläuft jede Stunde deutlich ruhiger. Am vergangenen Donnerstag hat unser Direktor sogar die Ordnung unserer Klasse gelobt.'
					],
					source: 'Schulordnung und Klassengespräch (bearbeitet)',
					glossary: [
						{ term: 'vereinbaren', meaning: 'etwas gemeinsam festlegen und abmachen' },
						{ term: 'hinterlassen', meaning: 'einen Ort beim Weggehen in einem bestimmten Zustand lassen' }
					],
					q1: '1. Wann wurden die fünf Grundsätze vereinbart und welche drei Regeln nennt der zweite Absatz?',
					a1: 'Sie wurden zu Beginn des Trimesters vereinbart. Regeln: 1) Niemand darf beim Sprechen stören; 2) Jeder muss pünktlich mit Büchern und Heften kommen; 3) Alle sollen höflich zuhören und den Raum sauber hinterlassen.',
					mcGroups: [
						{
							header: 'a) Was drückt „darf niemand“ in der ersten Regel aus?',
							options: [
								'Ein klares Verbot im Klassenzimmer',
								'Eine freiwillige Freizeitaktivität',
								'Eine persönliche Vorliebe für Sprachen'
							],
							correct: 'Ein klares Verbot im Klassenzimmer',
							mark: '1.0'
						},
						{
							header: 'b) Wer hat am vergangenen Donnerstag die Ordnung der Klasse gelobt?',
							options: [
								'Der Direktor der Schule',
								'Ein fremder Besucher aus Berlin',
								'Nur die Schüler der ersten Klasse'
							],
							correct: 'Der Direktor der Schule',
							mark: '1.0'
						}
					],
					q3: '3. Suchen Sie im Text :\n  a) Das Synonym von „freundlich / respektvoll“ (§2) und das Antonym von „schmutzig“ (§2).\n  b) Drei verschiedene Modalverben aus dem zweiten Absatz.',
					a3: 'a) Synonym : höflich ; Antonym von schmutzig : sauber. | b) Modalverben : darf (dürfen), muss (müssen), sollen (sollen).',
					q4: '4. Worauf beziehen sich „unsere Klasse“ (§1) und „wir“ (§3)?',
					a4: 'Beide beziehen sich auf die Schülerinnen und Schüler der 2AS-Klasse in Oran.',
					mcqQuestion: 'Welche Bedeutung hat das Modalverb „sollen“ in „Drittens sollen die Schülerinnen und Schüler einander höflich zuhören“?',
					mcqQuestionAr: 'ما الدلالة الدقيقة للفعل الجهي «sollen» في القاعدة الثالثة من النص؟',
					mcqCorrect: 'Es drückt eine moralische Empfehlung und gemeinsam vereinbarte Verpflichtung aus',
					mcqDistractors: [
						{
							text: 'Es drückt eine rein körperliche Fähigkeit aus',
							diagnosticFeedback: 'خطأ: القدرة يُعبر عنها بالفعل können لا sollen.'
						},
						{
							text: 'Es verbietet den Schülern jedes Gespräch in der Pause',
							diagnosticFeedback: 'خطأ: المنع يُصاغ بـ nicht dürfen.'
						},
						{
							text: 'Es bezeichnet ein Ereignis vor hundert Jahren',
							diagnosticFeedback: 'خطأ: الجملة توجيه حاضر في الصف.'
						}
					],
					mcqExplanation: 'يُستعمل sollen في الإرشادات والقواعد الجماعية للتعبير عن الواجب الأخلاقي أو التوصية المتفق عليها.'
				},
				{
					passageTitle: 'Ein lehrreiches Wochenende in Ghardaïa',
					paragraphs: [
						'Letztes Wochenende bin ich mit meinem Vater und meinem Onkel nach Ghardaïa ins M’Zab-Tal gereist. Die Fahrt durch die weiten Hochebenen war sehr angenehm, und wir hatten genug Wasser sowie Datteln für unterwegs dabei.',
						'Am Freitagvormittag sind wir durch die ruhigen Gassen einer historischen Altstadt gegangen und haben gesehen, wie klug die alten Häuser vor der Hitze schützen. Mein Onkel hat mir erklärt, wie das traditionelle System [[das Regenwasser]] gerecht auf alle Palmenhaine verteilt.',
						'Am Samstagabend sind wir zufrieden nach Hause zurückgekehrt. Ich habe sofort Notizen über [[diese Reise]] in mein Deutschheft geschrieben, weil ich am Montag einen kleinen Bericht vortragen möchte.'
					],
					source: 'Reiseheft für junge Lerner (bearbeitet)',
					glossary: [
						{ term: 'Palmenhain', meaning: 'größeres Gebiet mit vielen Dattelpalmen' },
						{ term: 'vortragen', meaning: 'einen Bericht mündlich vor der Klasse präsentieren' }
					],
					q1: '1. Mit wem ist der Erzähler nach Ghardaïa gereist und was hat ihn bei der Besichtigung beeindruckt?',
					a1: 'Er ist mit seinem Vater und seinem Onkel gereist. Ihn hat beeindruckt, wie klug die alten Häuser vor Hitze schützen und wie das traditionelle System das Regenwasser gerecht auf die Palmenhaine verteilt.',
					mcGroups: [
						{
							header: 'a) Warum verwendet der Text „bin ... gereist“ und „sind ... gegangen“ mit SEIN?',
							options: [
								'Weil reisen und gehen eine Ortsveränderung (Bewegung) ausdrücken',
								'Weil beide Verben immer ein direktes Akkusativobjekt haben',
								'Weil es sich um Modalverben im Präsens handelt'
							],
							correct: 'Weil reisen und gehen eine Ortsveränderung (Bewegung) ausdrücken',
							mark: '1.0'
						},
						{
							header: 'b) Was möchte der Erzähler am Montag im Deutschunterricht tun?',
							options: [
								'Einen kleinen Bericht über seine Reise vortragen',
								'Seine Datteln im Klassenzimmer verkaufen',
								'Ein Buch über das Meer in Hamburg zurückgeben'
							],
							correct: 'Einen kleinen Bericht über seine Reise vortragen',
							mark: '1.0'
						}
					],
					q3: '3. Finden Sie im Text :\n  a) Das Synonym von „erläutert“ (§2) und das Antonym von „unzufrieden“ (§3).\n  b) Zwei Perfektformen mit dem Hilfsverb „sein“ aus dem Text.',
					a3: 'a) Synonym : erklärt ; Antonym von unzufrieden : zufrieden. | b) Perfekt mit sein : bin ... gereist, sind ... gegangen, sind ... zurückgekehrt.',
					q4: '4. Worauf beziehen sich „das Regenwasser“ (§2) und „diese Reise“ (§3)?',
					a4: '„das Regenwasser“ bezieht sich auf das Wasser, das durch das traditionelle System im M’Zab-Tal verteilt wird. „diese Reise“ bezieht sich auf den Wochenendbesuch des Erzählers mit Vater und Onkel in Ghardaïa.',
					mcqQuestion: 'Warum stehen „war“ und „hatten“ im ersten Absatz im Präteritum?',
					mcqQuestionAr: 'لماذا استُعمل فعلا «war» و«hatten» في الفقرة الأولى بصيغة Präteritum؟',
					mcqCorrect: 'Weil man bei „sein“ und „haben“ in der Vergangenheit meistens das kurze Präteritum bevorzugt',
					mcqDistractors: [
						{
							text: 'Weil man „sein“ und „haben“ niemals in der Gegenwart benutzen darf',
							diagnosticFeedback: 'خطأ: الحاضر من sein/haben يُستعمل بكثرة، وإنما يُفضل Präteritum لهما في الماضي.'
						},
						{
							text: 'Weil „war“ und „hatten“ Befehlsformen im Imperativ sind',
							diagnosticFeedback: 'خطأ: صيغ الأمر هي sei/seid و hab/habt.'
						},
						{
							text: 'Weil beide Verben im Futur I stehen',
							diagnosticFeedback: 'خطأ: الزمن هو الماضي (Letztes Wochenende).'
						}
					],
					mcqExplanation: 'في الماضي يفضل المتحدثون والكتّاب صيغة Präteritum المختصرة للفعلين sein (war) و haben (hatten).'
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
					content: '2. Kreuzen Sie die richtige Antwort nach dem Text an :',
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
				trimesterId: 't1',
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
					instruction: 'Lesen Sie den Text genau durch und lösen Sie die folgenden Aufgaben :',
					content
				},
				hints: [
					'تتبع المؤشرات الزمنية (bis zum letzten Jahr / seit zwei Monaten / diese Woche) لفهم تطور الأحداث.',
					'انتبه لدلالة الأفعال الجهية (muss, darf, soll, kann) في القواعد والنصائح.',
					'راجع الفرق بين المساعدين haben و sein في الماضي المركب.'
				],
				solutionStepsAr: [
					'استخراج الفكرة الرئيسية والتفاصيل الصريحة من النص (2.0 نقطة).',
					'اختيار الإجابتين الصحيحتين في الاختيار من متعدد (2.0 نقطة).',
					'استخراج المترادفات والأضداد والأفعال المستهدفة (1.5 نقطة).',
					'تعيين العائد النحوي للمسطرات في النص (1.5 نقطة).'
				],
				finalAnswer: v.mcqCorrect
			};
		}
	},

	// 3. Sprachfähigkeit (7 Pkt.) — matching quiz + saveGermanSvgAsset
	{
		id: 'ger_tpl_2as_le_t1_ling_verben_modal_perfekt',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'verben_zeiten',
		titleAr: 'II. Sprachfähigkeit : Trennbare Verben, Modalverben und Perfekt (7 Pkt.)',
		curriculumLessonId: 'ger_lesson_2as_le_t1_verben_praesens_modalverben',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					svgSlug: 'ger_2as_t1_ling_verben_v0',
					svgContent: svgGermanTenseTimeline({
						title: 'Satzklammer: Präsens vs Perfekt',
						tenseName: 'Position 2 & Ende',
						formula: 'Modalverb / Hilfsverb (Pos. 2) + ... + Infinitiv / Partizip II',
						activeZone: 'past_to_present',
						example: 'Ich muss früh aufstehen. / Ich bin früh aufgestanden.',
						markers: 'heute (Präsens) | gestern, letzte Woche (Perfekt)',
						width: 560
					}),
					svgCaption: 'Visuelle Übersicht zur Satzklammer bei Modalverben und im Perfekt',
					wfRows: [
						{
							verb: { given: true, value: 'lernen' },
							nomen: { value: 'das Lernen / der Lerner', mark: '0.5' },
							adjektiv: { value: 'lernfähig / gelehrt', mark: '0.5' }
						},
						{
							verb: { value: 'ordnen', mark: '0.5' },
							nomen: { given: true, value: 'die Ordnung' },
							adjektiv: { value: 'ordentlich / geordnet', mark: '0.5' }
						}
					],
					q2: '2. Ergänzen Sie die konjugierten Formen im Präsens (Modalverben und trennbare Verben) :\n  a) Jeden Morgen (aufstehen) Salma um 6.30 Uhr und (vorbereiten) ihre Schultasche ...........\n  b) Im Lesesaal (dürfen) man nicht laut sprechen; alle Schüler (müssen) leise lesen.\n  c) Mein Bruder (können) schon drei Fremdsprachen fließend sprechen.',
					a2: 'a) steht ... auf / bereitet ... vor.\n  b) darf / müssen.\n  c) kann.',
					q3: '3. Setzen Sie die folgenden Sätze ins Perfekt (mit haben oder sein) :\n  a) Gestern (fahren) unsere Klasse mit dem Bus nach Tlemcen.\n  b) Dort (besuchen) wir die historische Moschee und (schreiben) viele Notizen.',
					a3: 'a) Gestern ist unsere Klasse mit dem Bus nach Tlemcen gefahren.\n  b) Dort haben wir die historische Moschee besucht und viele Notizen geschrieben.',
					q4: '4. Bilden Sie das Gegenteil (Antonym) und ergänzen Sie das Präteritum von „sein“ oder „haben“ :\n  a) Gegenteil von : pünktlich (............) ; fleißig (............).\n  b) Am letzten Freitag (sein) wir in der Bibliothek und (haben) viel Zeit.',
					a4: 'a) unpünktlich ; faul.\n  b) waren / hatten.',
					pairs: [
						{ left: 'aufstehen (Perfekt)', right: 'ist aufgestanden' },
						{ left: 'verstehen (Perfekt)', right: 'hat verstanden' },
						{ left: 'müssen (er / sie / es)', right: 'muss' },
						{ left: 'dürfen (ich — Verbot)', right: 'ich darf nicht' }
					],
					explanation:
						'الفعل المنفصل الحركي يأخذ sein (ist aufgestanden)، وغير المنفصل يأخذ haben بدون ge- (hat verstanden)، وmüssen مع الغائب تصبح muss بلا نهاية.'
				},
				{
					svgSlug: 'ger_2as_t1_ling_verben_v1',
					svgContent: svgGermanConjugationChart({
						title: 'Modalverben & Perfekt (Hilfsverben)',
						subtitle: 'Sorgfältig unterscheiden: sein vs haben & Verbformen',
						width: 560,
						columns: [
							{
								header: 'Modalverben (Sg.)',
								rule: 'ich = er / sie / es',
								examples: 'kann, muss, darf, will, soll'
							},
							{
								header: 'Perfekt mit SEIN',
								rule: 'Bewegung / Zustand',
								examples: 'ist gefahren / geblieben'
							},
							{
								header: 'Ohne ge- (Part. II)',
								rule: 'be-, er-, ver-, -iert',
								examples: 'besucht, erklärt, studiert'
							}
						]
					}),
					svgCaption: 'Dreiteilige Übersicht über Modalverben, sein-Perfekt und Partizip II ohne ge-',
					wfRows: [
						{
							verb: { given: true, value: 'lesen' },
							nomen: { value: 'das Lesen / die Lektüre', mark: '0.5' },
							adjektiv: { value: 'lesbar / leserlich', mark: '0.5' }
						},
						{
							verb: { value: 'helfen', mark: '0.5' },
							nomen: { value: 'die Hilfe', mark: '0.5' },
							adjektiv: { given: true, value: 'hilfsbereit' }
						}
					],
					q2: '2. Wählen Sie das passende Modalverb im Präsens (müssen / dürfen / können / wollen) :\n  a) Du ............ im Unterricht nicht telefonieren; das ist verboten.\n  b) Amin übt täglich und ............ schon deutsche Aufsätze ohne Wörterbuch schreiben.\n  c) Morgen schreiben wir eine Klassenarbeit; deshalb ............ wir heute gut wiederholen.',
					a2: 'a) darfst (Verbot).\n  b) kann (Fähigkeit).\n  c) müssen (Notwendigkeit).',
					q3: '3. Schreiben Sie die Sätze im Perfekt mit dem richtigen Hilfsverb (haben oder sein) :\n  a) Letzte Woche (bleiben) meine Familie zu Hause und (studieren) mein Bruder für die Prüfung.\n  b) Am Samstagmorgen (aufstehen) ich früh und (anfangen) sofort mit der Lektüre.',
					a3: 'a) Letzte Woche ist meine Familie zu Hause geblieben und hat mein Bruder für die Prüfung studiert.\n  b) Am Samstagmorgen bin ich früh aufgestanden und habe sofort mit der Lektüre angefangen.',
					q4: '4. Korrigieren Sie den typischen Fehler in diesen drei Sätzen :\n  a) Mein Bruder kannt sehr gut Deutsch sprechen.\n  b) Gestern habe ich mit dem Zug nach Oran gefahrt.\n  c) Der Schüler hat die Grammatikregel geverstanden.',
					a4: 'a) Mein Bruder kann sehr gut Deutsch sprechen.\n  b) Gestern bin ich mit dem Zug nach Oran gefahren.\n  c) Der Schüler hat die Grammatikregel verstanden.',
					pairs: [
						{ left: 'fahren (Perfekt)', right: 'ist gefahren' },
						{ left: 'studieren (Perfekt)', right: 'hat studiert' },
						{ left: 'bleiben (Perfekt)', right: 'ist geblieben' },
						{ left: 'schreiben (Perfekt)', right: 'hat geschrieben' }
					],
					explanation:
						'fahren و bleiben تأخذان sein (ist gefahren / ist geblieben)، بينما studieren (-iert) و schreiben القوي تأخذان haben (hat studiert / hat geschrieben).'
				},
				{
					svgSlug: 'ger_2as_t1_ling_verben_v2',
					svgContent: svgGermanConjugationChart({
						title: 'Trennbare vs Untrennbare Verben',
						subtitle: 'Präfix-Verhalten im Präsens und im Partizip II',
						width: 560,
						columns: [
							{
								header: 'Trennbar (Präsens)',
								rule: 'Präfix ans Satzende',
								examples: 'fängt um 8 Uhr an'
							},
							{
								header: 'Trennbar (Part. II)',
								rule: 'Präfix + ge + Stamm',
								examples: 'angefangen, aufgestanden'
							},
							{
								header: 'Untrennbar',
								rule: 'Nie getrennt, kein ge-',
								examples: 'versteht / hat verstanden'
							}
						]
					}),
					svgCaption: 'Regeln der Verben mit Präfixen im Präsens und Perfekt',
					wfRows: [
						{
							verb: { given: true, value: 'schreiben' },
							nomen: { value: 'das Schreiben / die Schrift', mark: '0.5' },
							adjektiv: { value: 'schriftlich', mark: '0.5' }
						},
						{
							verb: { value: 'danken', mark: '0.5' },
							nomen: { given: true, value: 'der Dank / die Dankbarkeit' },
							adjektiv: { value: 'dankbar', mark: '0.5' }
						}
					],
					q2: '2. Bilden Sie Sätze im Präsens (achten Sie auf Vokalwechsel und trennbare Präfixe) :\n  a) Der Zug nach Algier / abfahren / pünktlich um sieben Uhr.\n  b) Meriem / lesen / am Nachmittag / ein Sachbuch.\n  c) Wann / anfangen / unsere Deutschstunde / am Montag?',
					a2: 'a) Der Zug nach Algier fährt pünktlich um sieben Uhr ab.\n  b) Meriem liest am Nachmittag ein Sachbuch.\n  c) Wann fängt unsere Deutschstunde am Montag an?',
					q3: '3. Ergänzen Sie das Partizip II der eingeklammerten Verben :\n  a) Unser Lehrer hat die neue Regel sehr klar (erklären) ............ .\n  b) Ich habe meine Freundin zu einer Lernstunde (einladen) ............ .\n  c) Um 18 Uhr sind alle Kinder müde nach Hause (zurückkommen) ............ .',
					a3: 'a) erklärt (ohne ge-).\n  b) eingeladen (ein-ge-laden).\n  c) zurückgekommen (mit sein).',
					q4: '4. Finden Sie das Synonym oder setzen Sie das Verb ins Präteritum :\n  a) Synonym von : beginnen (............) ; erklären / deutlich machen (............).\n  b) Als Kind (können) ich noch kein Deutsch, aber ich (wollen) viele Sprachen lernen.',
					a4: 'a) anfangen ; erläutern.\n  b) konnte / wollte.',
					pairs: [
						{ left: 'erklären (Partizip II)', right: 'erklärt (ohne ge-)' },
						{ left: 'einladen (Partizip II)', right: 'eingeladen (trennbar)' },
						{ left: 'zurückkommen (Hilfsverb)', right: 'sein (ist zurückgekommen)' },
						{ left: 'haben (Präteritum wir)', right: 'wir hatten' }
					],
					explanation:
						'الأفعال غير المنفصلة (erklären) لا تأخذ ge-، والمنفصلة (einladen) تدخل فيها ge- بالوسط، والحركية المنفصلة (zurückkommen) تأخذ sein.'
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
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'linguistic_competence',
				quizQuestion: {
					type: 'matching',
					questionText: 'Ordnen Sie jedes Element auf der linken Seite der passenden Form auf der rechten Seite zu:',
					questionTextAr: 'صل كل فعل أو صيغة في اليمين بالتركيب الصحيح الموافق له في اليسار:',
					questionData: {
						pairs: v.pairs
					},
					explanation: v.explanation
				},
				sujetExercise: {
					customTitle: 'II. Sprachfähigkeit',
					points: 7,
					instruction: 'Lösen Sie die folgenden Aufgaben zu Wortschatz, Verben und Zeitformen :',
					content
				},
				hints: [
					'في جدول عائلة الكلمات انتبه للواحق الأسماء (-ung, -heit, -keit) وكتابة كل اسم بحرف كبير.',
					'تذكّر أن الأفعال الجهية في المفرد (ich / er / sie / es) لا تأخذ أي نهاية (-e / -t).',
					'في الماضي المركب (Perfekt) تستعمل أفعال الانتقال وتغير الحالة الفعل المساعد sein.'
				],
				solutionStepsAr: [
					'إكمال جدول عائلة الكلمات بدقة إملائية (2.0 نقطة).',
					'تصريف الأفعال المنفصلة والأفعال الجهية في الحاضر (2.0 نقطة).',
					'بناء الماضي المركب مع اختيار haben أو sein وتشكيل Partizip II (1.5 نقطة).',
					'تحديد الأضداد أو المترادفات أو تصحيح الأخطاء والماضي البسيط (1.5 نقطة).'
				],
				finalAnswer: v.pairs.map((p) => `${p.left} = ${p.right}`).join(' | ')
			};
		}
	},

	// 4. Sprachfähigkeit (7 Pkt.) — drag_drop quiz + saveGermanSvgAsset
	{
		id: 'ger_tpl_2as_le_t1_ling_artikel_kasus_praep',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'grammatik_syntax',
		titleAr: 'II. Sprachfähigkeit : Artikel, Kasus (Nom./Akk./Dat.) und Wechselpräpositionen (7 Pkt.)',
		curriculumLessonId: 'ger_lesson_2as_le_t1_artikel_kasus_akkusativ_dativ',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					svgSlug: 'ger_2as_t1_ling_kasus_v0',
					svgContent: svgGermanGrammarMap({
						title: 'Kasus & Wechselpräpositionen',
						rootLabel: 'Richtiger Fall: Nom. / Akk. / Dat.',
						rootSub: 'Frage: Wer? Wen? Wem? und Wo? vs Wohin?',
						width: 560,
						branches: [
							{
								label: 'Nominativ (Wer?)',
								rule: 'der / die / das / die',
								example: 'Der Tisch ist groß.'
							},
							{
								label: 'Akkusativ (Wen?)',
								rule: 'den / die / das / die',
								example: 'Ich kaufe einen Stift.'
							},
							{
								label: 'Dativ (Wem?)',
								rule: 'dem / der / dem / den+n',
								example: 'Ich helfe dem Freund.'
							},
							{
								label: 'Wo? vs Wohin?',
								rule: 'Ort -> Dat | Ziel -> Akk',
								example: 'auf dem / auf den Tisch'
							}
						]
					}),
					svgCaption: 'Überblick über die drei Kasus und die Wechselpräpositionen',
					classPrompt:
						'1. Ordnen Sie diese sechs Wörter in die passenden Wortfelder ein (die Schulbibliothek, die Eltern, das Wörterbuch, die Geschwister, die Hausaufgaben, der Großvater) :',
					classCols: [
						{ header: 'Familie', items: ['die Eltern', 'die Geschwister', 'der Großvater'], mark: '0.5' },
						{ header: 'Lernort & Bücher', items: ['die Schulbibliothek', 'das Wörterbuch'], mark: '0.5' },
						{ header: 'Schulpflicht', items: ['die Hausaufgaben'], mark: '0.5' }
					],
					q2: '2. Ergänzen Sie den bestimmten oder unbestimmten Artikel im richtigen Kasus :\n  a) Der Schüler sucht (ein / einen / einem) neuen Kugelschreiber für (die / der) Deutschstunde.\n  b) Unsere Klasse dankt (der / die / den) geduldigen Lehrerin für ihre Hilfe.\n  c) Am Nachmittag besuche ich (mein / meinen / meinem) älteren Bruder und helfe (er -> ihm / ihn) beim Aufräumen.',
					a2: 'a) einen (Akk. mask.) / die (für + Akk. fem.).\n  b) der (danken + Dat. fem.).\n  c) meinen (Akk. mask.) / ihm (helfen + Dat.).',
					q3: '3. Entscheiden Sie bei den Wechselpräpositionen zwischen Dativ (Wo?) und Akkusativ (Wohin?) :\n  a) Nadia legt das Heft auf ............ Schreibtisch (der Schreibtisch).\n  b) Jetzt liegt das Heft ordentlich auf ............ Schreibtisch.\n  c) Die Schüler stellen ihre Taschen neben ............ Tafel (die Tafel) und arbeiten ruhig in ............ Klasse (die Klasse).',
					a3: 'a) den (Wohin? -> Akk. mask.).\n  b) dem (Wo? -> Dat. mask.).\n  c) die (Wohin? -> Akk. fem.) / der (Wo? -> Dat. fem.).',
					q4: '4. Ergänzen Sie die richtige Präposition mit Dativ oder Akkusativ (mit, für, seit, ohne) :\n  a) ............ zwei Jahren lerne ich begeistert Deutsch.\n  b) Dieser Kalender ist ein Geschenk ............ meinen Vater.\n  c) Am Morgen gehe ich ............ meinem Bruder zur Schule; ............ mein Wörterbuch arbeite ich nicht gern.',
					a4: 'a) Seit ; b) für ; c) mit / ohne.',
					ddStem: 'Ordnen Sie jeden Satz bzw. Ausdruck der richtigen Kasus-Regel zu:',
					ddCategories: ['Akkusativ (Wohin? / direktes Objekt / für)', 'Dativ (Wo? / mit / helfen)'],
					ddItems: [
						{ text: 'Ich lege das Buch auf den Tisch.', category: 0 },
						{ text: 'Wir kaufen einen neuen Füller für den Bruder.', category: 0 },
						{ text: 'Das Buch liegt auf dem Tisch.', category: 1 },
						{ text: 'Salma hilft ihrer Mutter in der Küche.', category: 1 }
					]
				},
				{
					svgSlug: 'ger_2as_t1_ling_kasus_v1',
					svgContent: svgGermanConjugationChart({
						title: 'Wechselpräpositionen: Wo? vs Wohin?',
						subtitle: 'Positionsverben vs Richtungsverben im Alltag',
						width: 560,
						columns: [
							{
								header: 'Wohin? (+ Akkusativ)',
								rule: 'legen / stellen / hängen',
								examples: 'stellt die Tasche ans Regal'
							},
							{
								header: 'Wo? (+ Dativ)',
								rule: 'liegen / stehen / sitzen',
								examples: 'Tasche steht am Regal'
							},
							{
								header: 'Dativ-Verben',
								rule: 'helfen, danken, gehören',
								examples: 'Das Heft gehört dem Kind.'
							}
						]
					}),
					svgCaption: 'Gegenüberstellung von Lage (Wo? -> Dativ) und Richtung (Wohin? -> Akkusativ)',
					classPrompt:
						'1. Klassifizieren Sie diese sechs Ausdrücke nach ihrem Kasus (mit den Schülern, für meinen Freund, bei der Arbeit, ohne einen Fehler, auf dem Stuhl, ans Meer) :',
					classCols: [
						{ header: 'Immer Akkusativ', items: ['für meinen Freund', 'ohne einen Fehler'], mark: '0.5' },
						{ header: 'Immer Dativ', items: ['mit den Schülern', 'bei der Arbeit'], mark: '0.5' },
						{ header: 'Wechselpräpositionen', items: ['auf dem Stuhl (Dat.)', 'ans Meer (Akk.)'], mark: '0.5' }
					],
					q2: '2. Setzen Sie die Wörter in Klammern in den richtigen Kasus (Nominativ, Akkusativ oder Dativ) :\n  a) (Mein Vater) arbeitet seit zehn Jahren in (eine Bibliothek).\n  b) Wem gehört (dieses Heft)? Es gehört (mein kleiner Bruder).\n  c) Am Montag schreibt (die Schülerin) (ein langer Brief) an ihre Brieffreundin.',
					a2: 'a) Mein Vater (Nom.) / einer Bibliothek (Dat.).\n  b) dieses Heft (Nom.) / meinem kleinen Bruder (Dat.).\n  c) die Schülerin (Nom.) / einen langen Brief (Akk.).',
					q3: '3. Wählen Sie das passende Verb (liegen/legen, stehen/stellen) und ergänzen Sie den Artikel :\n  a) Der Lehrer (steht / stellt) den Globus auf (dem / den) Schrank.\n  b) Jetzt (steht / stellt) der Globus auf (dem / den) Schrank.\n  c) Meine Bücher (liegen / legen) im Rucksack, aber mein Heft (liegt / legt) unter (dem / den) Wörterbuch.',
					a3: 'a) stellt / den (Wohin?).\n  b) steht / dem (Wo?).\n  c) liegen / liegt / dem (Wo?).',
					q4: '4. Bilden Sie den Dativ Plural korrekt (achten Sie auf das Plural-n) :\n  a) Ich spreche in der Pause mit (die Mitschüler) ............ .\n  b) In der Schulbibliothek arbeiten wir oft mit (die Wörterbücher) ............ .\n  c) Am Wochenende fahren die Kinder zu (die Großeltern) ............ .',
					a4: 'a) den Mitschülern ; b) den Wörterbüchern ; c) den Großeltern.',
					ddStem: 'Ordnen Sie jede Präposition bzw. jedes Verb der passenden Kasusgruppe zu:',
					ddCategories: ['Verlangt immer Akkusativ', 'Verlangt immer Dativ'],
					ddItems: [
						{ text: 'für / ohne / durch', category: 0 },
						{ text: 'kaufen / lesen / suchen', category: 0 },
						{ text: 'mit / bei / seit / aus', category: 1 },
						{ text: 'helfen / danken / gehören', category: 1 }
					]
				},
				{
					svgSlug: 'ger_2as_t1_ling_kasus_v2',
					svgContent: svgGermanConjugationChart({
						title: 'Artikel & Possessivartikel im Kasus',
						subtitle: 'Bestimmte, unbestimmte und Possessivartikel',
						width: 560,
						columns: [
							{
								header: 'Maskulin (der)',
								rule: 'Nom: der | Akk: den | Dat: dem',
								examples: 'ein / einen / einem Bruder'
							},
							{
								header: 'Feminin (die)',
								rule: 'Nom: die | Akk: die | Dat: der',
								examples: 'meine / meine / meiner Mutter'
							},
							{
								header: 'Neutral & Plural',
								rule: 'N: das -> dem | Pl: die -> den+n',
								examples: 'in dem (im) Haus / mit Eltern'
							}
						]
					}),
					svgCaption: 'Deklination der Artikel und Possessivartikel über alle Geschlechter',
					classPrompt:
						'1. Ordnen Sie diese sechs Verbformen und Phrasen den Kategorien zu (steht vor dem Haus, legt auf den Tisch, durch den Park, bei meiner Tante, sitzt neben der Tür, geht ins Zimmer) :',
					classCols: [
						{ header: 'Wo? (Dativ)', items: ['steht vor dem Haus', 'sitzt neben der Tür'], mark: '0.5' },
						{ header: 'Wohin? (Akkusativ)', items: ['legt auf den Tisch', 'geht ins Zimmer'], mark: '0.5' },
						{ header: 'Feste Präpositionen', items: ['durch den Park (Akk.)', 'bei meiner Tante (Dat.)'], mark: '0.5' }
					],
					q2: '2. Ergänzen Sie die Possessivartikel (mein-, dein-, sein-, ihr-) im korrekten Fall :\n  a) Tarik liebt (sein) ............ Schule und hilft (sein) ............ jüngeren Schwester täglich.\n  b) Meriem nimmt (ihr) ............ neuen Rucksack mit und geht mit (ihr) ............ Freundinnen ins Gymnasium.\n  c) Kinder, habt ihr (euer) ............ Vater schon für (sein) ............ Rat gedankt?',
					a2: 'a) seine (Akk. fem.) / seiner (Dat. fem.).\n  b) ihren (Akk. mask.) / ihren (Dat. Pl.).\n  c) eurem (Dat. mask. nach danken) / seinen (für + Akk. mask.).',
					q3: '3. Verbinden Sie Präposition und Artikel zur üblichen Kurzform (im, ins, am, ans, zum, zur) :\n  a) Am Samstag gehen wir zu + dem Sprachklub (............) und bleiben in + dem Lesesaal (............).\n  b) Danach fahren wir zu + der Großmutter (............) und gehen ans / an + das Ufer (............).',
					a3: 'a) zum / im.\n  b) zur / ans.',
					q4: '4. Finden Sie jeweils das passende Synonym oder Antonym :\n  a) Antonym : sauber / ............ ; laut / ............ .\n  b) Synonym : beginnen / ............ ; helfen / ............ .',
					a4: 'a) schmutzig ; leise.\n  b) anfangen ; unterstützen.',
					ddStem: 'Unterscheiden Sie richtige von fehlerhaften Kasusformen:',
					ddCategories: ['Grammatisch richtig', 'Grammatisch falsch'],
					ddItems: [
						{ text: 'Der Schüler hilft seinem Bruder in der Bibliothek.', category: 0 },
						{ text: 'Ich stelle den Stuhl neben den Schreibtisch.', category: 0 },
						{ text: 'Der Schüler hilft seinen Bruder in die Bibliothek.', category: 1 },
						{ text: 'Ich stelle der Stuhl neben dem Schreibtisch.', category: 1 }
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
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'linguistic_competence',
				quizQuestion: {
					type: 'drag_drop',
					questionText: v.ddStem,
					questionTextAr: 'اسحب كل عبارة إلى الفئة النحوية الصحيحة:',
					questionData: {
						categories: v.ddCategories,
						items: rng.shuffle(v.ddItems)
					},
					explanation:
						'تذكر: المذكر ينصب بالـ den/einen، وتأخذ أفعال السكون (Wo?) حالة Dativ، وأفعال الحركة والاتجاه (Wohin?) حالة Akkusativ، وأفعال مثل helfen و danken تطلب Dativ دائماً.'
				},
				sujetExercise: {
					customTitle: 'II. Sprachfähigkeit',
					points: 7,
					instruction: 'Bearbeiten Sie die folgenden Grammatik- und Wortschatzübungen :',
					content
				},
				hints: [
					'تحقق أولاً من جنس الاسم (der / die / das / Plural) قبل تصريف الأداة في Akkusativ أو Dativ.',
					'اسأل دائماً: Wo? (سكون -> Dativ) أم Wohin? (حركة واتجاه -> Akkusativ).',
					'في جمع Dativ لا تنسَ إضافة -n إلى نهاية الاسم إن لم ينتهِ بها أصلاً (mit den Schülern).'
				],
				solutionStepsAr: [
					'تصنيف المفردات أو التراكيب في الجدول الثلاثي (1.5 نقطة).',
					'تصريف الأدوات وضمائر الملكية عبر الحالات الإعرابية (2.0 نقطة).',
					'ضبط حروف الجر المتبادلة أو المختصرة والتمييز بين السكون والحركة (2.0 نقطة).',
					'بناء جمع Dativ أو المترادفات والأضداد بدقة (1.5 نقطة).'
				],
				finalAnswer: v.ddItems.map((it) => `${it.text} : ${v.ddCategories[it.category]}`).join(' | ')
			};
		}
	},

	// 5. Schriftlicher Ausdruck (6 Pkt., Integration) — ordering quiz
	{
		id: 'ger_tpl_2as_le_t1_writ_tagesablauf_schule',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'schriftlicher_ausdruck',
		titleAr: 'III. Schriftlicher Ausdruck : Tagesablauf, Schulleben und Pflichten (6 Pkt.)',
		curriculumLessonId: 'ger_lesson_2as_le_t1_persoenliches_leben_schule',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					themaEinsPrompt:
						'Schreiben Sie eine E-Mail (100 bis 120 Wörter) an Ihren deutschen Brieffreund Lukas. Stellen Sie sich vor und beschreiben Sie Ihren typischen Schulalltag sowie Ihre Aufgaben in der Familie.',
					themaEinsStichpunkte: [
						'Begrüßung, Name, Alter, Wohnort in Algerien und Fremdsprachenzweig (2AS LE).',
						'Ihr Morgen mit trennbaren Verben (aufstehen, frühstücken, losgehen, anfangen).',
						'Unterricht, Pause in der Schulbibliothek und Nachmittag (Hausaufgaben vorbereiten, den Eltern mithelfen).',
						'Abschluss mit einer Frage nach seinem Schulalltag und passendem Gruß.'
					],
					themaZweiPrompt:
						'Schreiben Sie einen kurzen Aufsatz (100 bis 120 Wörter) darüber, wie ein Gymnasiast der 2AS LE seine Lernzeit und seine Freizeit sinnvoll ohne ständige Handyablenkung organisieren kann.',
					modelAnswer:
						'Lieber Lukas,\n\nvielen Dank für deine letzte Nachricht! Heute möchte ich dir von meinem Schulalltag in Algier erzählen. Ich heiße Amin, bin sechzehn Jahre alt und besuche die zweite Klasse des Gymnasiums im Zweig Fremdsprachen.\n\nJeden Morgen stehe ich um halb sieben auf und frühstücke gemeinsam mit meinen Eltern und meiner Schwester. Um acht Uhr fängt unser Unterricht an. In der Pause gehe ich oft in die Schulbibliothek, um neue deutsche Wörter nachzuschlagen. Am Nachmittag bereite ich zuerst meine Hausaufgaben ordentlich vor und helfe danach meiner Mutter im Haushalt mit.\n\nWie sieht eigentlich dein Stundenplan in Deutschland aus? Schreib mir bald!\n\nViele Grüße\nDein Amin',
					rubricSummary:
						'Inhalt und alle Stichpunkte (2.0 Pkt.) / Grammatik: Präsens, trennbare Verben, Satzklammer (2.0 Pkt.) / Wortschatz, Briefform und Rechtschreibung (2.0 Pkt.)',
					orderedSteps: [
						'Lieber Lukas, vielen Dank für deine E-Mail aus Deutschland!',
						'Ich heiße Amin, bin sechzehn Jahre alt und besuche das Gymnasium in Algier.',
						'Jeden Morgen stehe ich früh auf, und nachmittags bereite ich meine Hausaufgaben vor.',
						'Wie sieht dein Schulalltag aus? Viele Grüße, dein Amin.'
					],
					orderExplanation:
						'تبدأ الرسالة بالتحية، يليها التقديم الشخصي، ثم وصف الروتين اليومي بالأفعال المنفصلة، وتختم بالسؤال والوداع.'
				},
				{
					themaEinsPrompt:
						'Verfassen Sie für Ihre Klassenwandzeitung einen kurzen Text (100 bis 120 Wörter) über gute Regeln für das Lernen und das respektvolle Zusammenleben im Klassenzimmer.',
					themaEinsStichpunkte: [
						'Warum klare Regeln für alle Schülerinnen und Schüler wichtig sind.',
						'Was man im Unterricht tun muss und soll (pünktlich kommen, aufmerksam zuhören, Notizen machen).',
						'Was man nicht darf (den Unterricht stören, das Handy benutzen) und wie man miteinander umgeht (einander helfen).',
						'Kurzes Fazit über Erfolg und Freude am Lernen.'
					],
					themaZweiPrompt:
						'Beschreiben Sie in einem kurzen Aufsatz (100 bis 120 Wörter) Ihre Familie und ein Familienmitglied, dessen Fleiß und Hilfsbereitschaft Sie besonders bewundern.',
					modelAnswer:
						'Eine ruhige und freundliche Lernatmosphäre im Klassenzimmer hilft uns allen, bessere Leistungen zu erzielen. Deshalb müssen wir klare Regeln achten.\n\nErstens soll jede Schülerin und jeder Schüler pünktlich in die Klasse kommen und seine Materialien ordentlich auf den Tisch legen. Während der Erklärung unserer Lehrerin müssen wir aufmerksam zuhören und dürfen nicht sprechen oder das Handy benutzen. Außerdem sollen wir höflich bleiben und schwächeren Mitschülern geduldig bei den Übungen helfen.\n\nWenn alle diese einfachen Regeln einhalten, verläuft der Unterricht angenehm, und wir lernen Fremdsprachen mit viel größerem Erfolg.',
					rubricSummary:
						'Themenbezug und Umsetzung der Stichpunkte (2.0 Pkt.) / Korrekte Modalverben, Satzklammer und Kasus (2.0 Pkt.) / Ausdruck, Kohärenz und Großschreibung (2.0 Pkt.)',
					orderedSteps: [
						'Eine gute Lernatmosphäre in der Schule braucht klare Regeln für alle.',
						'Erstens müssen die Schüler pünktlich sein und ihre Hefte auf den Tisch legen.',
						'Außerdem darf niemand den Unterricht stören, und alle sollen höflich bleiben.',
						'So lernen wir gemeinsam viel ruhiger und mit größerem Erfolg.'
					],
					orderExplanation:
						'يتدرج النص من أهمية النظام العام، إلى القاعدة الأولى، فالإضافة والمنع، ثم الخاتمة بالنتيجة الإيجابية.'
				},
				{
					themaEinsPrompt:
						'Berichten Sie in einem persönlichen Rückblick (100 bis 120 Wörter) über ein besonders gelungenes Wochenende mit Ihrer Familie oder in einer Schulbibliothek. Verwenden Sie das Perfekt und das Präteritum von „sein“ und „haben“.',
					themaEinsStichpunkte: [
						'Wann und wo das Erlebnis stattgefunden hat (am letzten Wochenende / mit wem).',
						'Was Sie gemacht und erlebt haben (aufstehen, fahren, besuchen, lesen, helfen — Perfekt mit haben und sein).',
						'Wie das Wetter oder Ihre Stimmung war (Präteritum: war / hatte).',
						'Warum dieses Wochenende unvergesslich bleibt.'
					],
					themaZweiPrompt:
						'Warum ist die Schulbibliothek ein wichtiger Ort für Jugendliche der 2AS LE? Schreiben Sie einen gegliederten Aufsatz (100 bis 120 Wörter) über Lesen, Wörterbücher und Konzentration.',
					modelAnswer:
						'Am letzten Wochenende hatte ich ein sehr schönes Erlebnis mit meiner Familie. Am Samstagmorgen bin ich schon um sieben Uhr aufgestanden, und das Wetter war sonnig und angenehm.\n\nNach dem Frühstück sind wir gemeinsam mit dem Bus nach Tlemcen gefahren. Dort haben wir die Große Moschee besucht und danach viele interessante Fotos von der alten Baukunst gemacht. Am Nachmittag haben wir im ruhigen Park frisches Obst und Datteln gegessen und viel über die Geschichte der Stadt gesprochen. Gegen Abend sind wir müde, aber sehr glücklich nach Hause zurückgekehrt.\n\nDieses lehrreiche Wochenende war für mich eine wunderbare Erinnerung an die gemeinsame Zeit mit meinen Eltern.',
					rubricSummary:
						'Vollständiger Erlebnisbericht und Logik (2.0 Pkt.) / Perfekt mit haben/sein und war/hatte (2.0 Pkt.) / Wortschatz und Rechtschreibung (2.0 Pkt.)',
					orderedSteps: [
						'Am letzten Wochenende hatte ich eine wunderbare Zeit mit meiner Familie.',
						'Am Samstagmorgen bin ich früh aufgestanden und mit meinen Eltern nach Tlemcen gefahren.',
						'Dort haben wir historische Bauten besucht und viel über die Geschichte gelernt.',
						'Am Abend sind wir glücklich nach Hause zurückgekehrt.'
					],
					orderExplanation:
						'يسير السرد الزمني من تمهيد الزمن والمزاج (hatte)، إلى الانطلاق والرحلة (bin aufgestanden / gefahren)، ثم الأنشطة (haben besucht)، فخاتمة العودة (sind zurückgekehrt).'
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
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'ordering',
					questionText: 'Ordnen Sie die vier Sätze zu einem logischen deutschen Text (von der Einleitung bis zum Schluss):',
					questionTextAr: 'رتّب الجمل الأربع الآتية لتكوين نص ألماني متسلسل من المقدمة إلى الخاتمة:',
					questionData: {
						items: scrambled.items,
						correctOrder: scrambled.correctOrder
					},
					explanation: v.orderExplanation
				},
				sujetExercise: {
					customTitle: 'III. Schriftlicher Ausdruck',
					points: 6,
					instruction: 'Wählen Sie EINES der beiden Themen und schreiben Sie einen zusammenhängenden Text (100 bis 120 Wörter) :',
					content: [block]
				},
				hints: [
					'قسم النص إلى ثلاث فقرات واضحة: مقدمة وجيزة، عرض منظم، وخاتمة لطيفة.',
					'في Thema 1 أدرج جميع النقاط الإرشادية (Stichpunkte) في جمل مترابطة ولا تنسخها كعوارض.',
					'راقب كتابة جميع الأسماء في الألمانية بحرف كبير، وتحقق من موقع الفعل الثاني والقوس الجملي.'
				],
				solutionStepsAr: [
					'استيفاء مضمون الموضوع المختار وتغطية جميع النقاط الموجّهة (2.0 نقطة).',
					'صحة تصريف الأفعال والأزمنة (Präsens, Modalverben, Perfekt) والحالات الإعرابية (2.0 نقطة).',
					'سلامة الإملاء وكتابة الأسماء بحرف كبير وتماسك النص (2.0 نقطة).'
				],
				finalAnswer: v.orderedSteps.join(' -> ')
			};
		}
	},

	// 6. Schriftlicher Ausdruck (6 Pkt., Integration) — cloze quiz
	{
		id: 'ger_tpl_2as_le_t1_writ_familie_brief',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'schriftlicher_ausdruck',
		titleAr: 'III. Schriftlicher Ausdruck : Familie, Fremdsprachen und Vergangenheitsbericht (6 Pkt.)',
		curriculumLessonId: 'ger_lesson_2as_le_t1_vergangenheit_perfekt_praeteritum',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					themaEinsPrompt:
						'Sie schreiben einen Brief (100 bis 120 Wörter) an eine neue Sprachpartnerin oder einen neuen Sprachpartner. Stellen Sie Ihre Familie vor und erzählen Sie, wie Sie zu Hause zusammenarbeiten und welche Hobbys Sie pflegen.',
					themaEinsStichpunkte: [
						'Begrüßung nach Briefform (Liebe/r ..., mit Kleinschreibung nach dem Komma).',
						'Vorstellung der Familienmitglieder (Eltern, Geschwister, Berufe oder Schule) mit richtigen Artikeln.',
						'Gegenseitige Hilfe in der Familie (aufräumen, im Garten arbeiten, den jüngeren Geschwistern bei Hausaufgaben helfen).',
						'Sinnvolle Freizeitaktivitäten (Lesen, Kalligraphie, Sport, Sprachen) und Abschiedsgruß.'
					],
					themaZweiPrompt:
						'Schreiben Sie einen kurzen Aufsatz (100 bis 120 Wörter) über die Frage: „Warum macht das Lernen von Fremdsprachen in der 2AS LE Spaß und welchen Nutzen hat ein Wörterbuch?“',
					modelAnswer:
						'Liebe Sara,\n\nich freue mich sehr, dir heute über meine Familie in Blida zu schreiben. Wir sind fünf Personen zu Hause: meine Eltern, mein älterer Bruder Sami, meine kleine Schwester Lina und ich. Mein Vater arbeitet als Lehrer und meine Mutter ist Ärztin.\n\nIn unserer Familie helfen wir einander jeden Tag. Nach der Schule räume ich mein Zimmer auf und helfe meiner kleinen Schwester bei ihren Hausaufgaben. Am Wochenende lesen wir oft zusammen in unserem Wohnzimmer oder gehen im nahen Park spazieren. In meiner Freizeit treibe ich gern Sport und übe arabische Kalligraphie.\n\nWie groß ist deine Familie und was machst du in deiner Freizeit?\n\nHerzliche Grüße\ndeine Meriem',
					rubricSummary:
						'Vollständige Briefstruktur und Inhalt (2.0 Pkt.) / Artikel, Dativ bei „helfen“ und Satzbau (2.0 Pkt.) / Wortschatz und Rechtschreibung (2.0 Pkt.)',
					clozeSentence: 'Nach dem Unterricht hilft Meriem ihrer kleinen Schwester ___ den Hausaufgaben.',
					clozeCorrect: 'bei',
					clozeDistractors: ['auf', 'durch', 'ohne'],
					clozeExplanation:
						'الفعل helfen يقترن بحرف الجر «bei» مع Dativ عند ذكر المهمة: jemandem bei den Hausaufgaben helfen.'
				},
				{
					themaEinsPrompt:
						'Schreiben Sie eine kurze Darstellung (100 bis 120 Wörter) für das Schulheft über ein gemeinsames Lernprojekt mit Ihren Mitschülern in der vergangenen Woche (Perfekt mit haben und sein).',
					themaEinsStichpunkte: [
						'Wann das Projekt stattgefunden hat und worum es ging (z.B. Plakat über Sprachen oder Bibliotheksbesuch).',
						'Wie Sie sich vorbereitet und die Arbeit verteilt haben (Präteritum war/hatte + Perfekt).',
						'Welche Rolle die Schulbibliothek und die Lehrerin dabei gespielt haben.',
						'Wie das Ergebnis war und was Sie gelernt haben.'
					],
					themaZweiPrompt:
						'Erzählen Sie in einem kurzen Text (100 bis 120 Wörter), wie Ihr erster Tag im Gymnasium vor einem Jahr verlaufen ist und wie Sie sich heute in der 2AS LE fühlen.',
					modelAnswer:
						'Letzte Woche hatten wir ein sehr interessantes Lernprojekt im Deutschunterricht. Unsere Lehrerin hat unsere Klasse in kleine Gruppen eingeteilt, und jede Gruppe hat ein Plakat über Lernstrategien gestaltet.\n\nAm Dienstag sind wir gemeinsam in die Schulbibliothek gegangen und haben dort nützliche Wörterbücher ausgeliehen. Mein Mitschüler Tarik hat die Hauptregeln sauber aufgeschrieben, während ich die passenden Beispiele im Heft vorbereitet habe. Unsere Lehrerin hat uns viele gute Tipps gegeben.\n\nAm Donnerstag haben wir unsere Arbeit vor der Klasse präsentiert. Alle waren sehr stolz, weil wir durch gute Zusammenarbeit viel Neues verstanden haben.',
					rubricSummary:
						'Logischer Ablauf des Berichts (2.0 Pkt.) / Sichere Verwendung von Perfekt (haben/sein) und Präteritum (2.0 Pkt.) / Rechtschreibung und Ausdruck (2.0 Pkt.)',
					clozeSentence: 'Am Dienstag ___ die ganze Klasse gemeinsam in die Schulbibliothek gegangen.',
					clozeCorrect: 'ist',
					clozeDistractors: ['hat', 'war', 'wird'],
					clozeExplanation:
						'الفعل gehen فعل حركة انتقالية يأخذ المساعد «sein» في الماضي المركب: die Klasse ist ... gegangen.'
				},
				{
					themaEinsPrompt:
						'Ein neuer Schüler kommt in Ihre Klasse der 2AS LE. Schreiben Sie ihm eine freundliche Orientierungsnachricht (100 bis 120 Wörter) über Räume, Lehrer und wichtige Pflichten in der Schule.',
					themaEinsStichpunkte: [
						'Herzliches Willkommen und kurze Vorstellung Ihrer Person.',
						'Beschreibung wichtiger Orte mit Wechselpräpositionen (Klassenzimmer neben der Treppe, Bibliothek im ersten Stock).',
						'Wichtige Tipps mit Modalverben (pünktlich kommen müssen, im Lesesaal leise sein sollen).',
						'Angebot zur Hilfe und freundlicher Schluss.'
					],
					themaZweiPrompt:
						'Schreiben Sie einen kurzen Text (100 bis 120 Wörter) darüber, was einen guten Freund und fleißigen Mitschüler im Schulalltag auszeichnet (Ehrlichkeit, Respekt, Hilfsbereitschaft).',
					modelAnswer:
						'Lieber Karim,\n\nherzlich willkommen in unserer Klasse der 2AS LE! Ich heiße Yassin und möchte dir am Anfang ein wenig Orientierung in unserem Gymnasium geben.\n\nUnser Klassenzimmer liegt im ersten Stock direkt neben dem Sprachlabor, und die ruhige Schulbibliothek befindet sich gegenüber dem Schulhof. Im Unterricht müssen wir alle unsere Bücher mitbringen und aufmerksam mitarbeiten. In der Bibliothek soll man sehr leise sprechen und jedes ausgeliehene Buch pünktlich auf den Tisch zurücklegen.\n\nWenn du Fragen zu den Hausaufgaben hast, kannst du mich jederzeit in der Pause ansprechen. Ich helfe dir sehr gern!\n\nViele Grüße\ndein Yassin',
					rubricSummary:
						'Freundlicher Ton und Abdeckung aller Stichpunkte (2.0 Pkt.) / Wechselpräpositionen und Modalverben (2.0 Pkt.) / Kohärenz und Rechtschreibung (2.0 Pkt.)',
					clozeSentence: 'In der Pause legt der Schüler sein Buch ordentlich auf ___ Tisch zurück.',
					clozeCorrect: 'den',
					clozeDistractors: ['dem', 'der', 'das'],
					clozeExplanation:
						'الفعل zurücklegen يدل على الاتجاه (Wohin?) مع المذكر der Tisch فيأخذ Akkusativ: auf den Tisch.'
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
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'cloze',
					questionText: 'Ergänzen Sie den Satz mit dem grammatisch richtigen Wort:',
					questionTextAr: 'أكمل الجملة الألمانية بالكلمة الصحيحة نحوياً:',
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
					instruction: 'Wählen Sie EINES der beiden Themen aus und verfassen Sie einen klaren Text (100 bis 120 Wörter) :',
					content: [block]
				},
				hints: [
					'في الرسائل تذكّر البدء بعد فاصلة التحية بحرف صغير (ما لم تكن الكلمة الأولى اسماً أو Sie).',
					'نوع بين الأفعال المنفصلة والأفعال الجهية والماضي المركب حسب زمن الموضوع المختار.',
					'تأكد من تطابق الأداة والصفة في Akkusativ و Dativ ومن كتابة الأسماء بحرف كبير.'
				],
				solutionStepsAr: [
					'تغطية محاور الموضوع المختار كاملة (2.0 نقطة).',
					'سلامة الصرف والنحو (الأزمنة، الحالات، حروف الجر) (2.0 نقطة).',
					'نظافة الأسلوب والإملاء وتنظيم الفقرات (2.0 نقطة).'
				],
				finalAnswer: v.clozeCorrect
			};
		}
	}
];
