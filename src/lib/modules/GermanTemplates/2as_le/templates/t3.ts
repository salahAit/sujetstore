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
	svgGermanGrammarMap,
	svgGermanTenseTimeline,
	svgGermanWritingBlueprint
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

export const TEMPLATES_2AS_LE_T3: GermanParameterizedTemplate[] = [
	// 1. Textverständnis (7 Pkt.) — true_false quiz + quiz map (5 * 0.2 = 1.0 + 6.0 = 7.0)
	{
		id: 'ger_tpl_2as_le_t3_comp_dach_reisen',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'kultur_landeskunde',
		titleAr: 'I. Textverständnis : D-A-CH-Länder, Reisen und Mittelmeerbrücken (7 Pkt.)',
		curriculumLessonId: 'ger_lesson_2as_le_t3_dach_laender_reisen',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					passageTitle: 'Die D-A-CH-Länder und Brücken über das Mittelmeer',
					paragraphs: [
						'Wenn Schülerinnen und Schüler in Algerien Deutsch lernen, begegnen sie zuerst den drei D-A-CH-Ländern im Herzen Europas: Deutschland mit der Hauptstadt Berlin, Österreich mit der Donaustadt Wien und der Schweiz, deren Hauptstadt Bern heißt. Jedes dieser Länder besitzt eigene geographische Besonderheiten zwischen Meeresküsten und hohen Alpen.',
						'Über das Mittelmeer hinweg bestanden schon vor vielen Jahrhunderten wissenschaftliche und geographische Verbindungen nach Nordafrika. Der berühmte Geograph Al-Idrisi befragte erfahrene Seeleute und Kaufleute, um genaue Landkarten des Mittelmeerraums, Italiens und Nordafrikas zu zeichnen. Heute besuchen algerische Sprachschüler sowohl heimische Kulturorte wie [[die Kasbah von Algier]] und das M’Zab-Tal als auch deutsche Universitätsbibliotheken.',
						'Wer eine Bildungsreise plant, kann umweltfreundlich mit dem Zug reisen, um Landschaften ruhig zu beobachten. So werden [[Sprachkenntnisse]] zu einer lebendigen Brücke des Wissens und des gegenseitigen Respekts.'
					],
					source: 'Landeskunde im Fremdsprachenunterricht (bearbeitet)',
					glossary: [
						{ term: 'Alpen', meaning: 'hohes Gebirge in Mitteleuropa (Schweiz, Österreich, Süddeutschland)' },
						{ term: 'Bildungsreise', meaning: 'Reise mit dem Ziel, Sprachen, Geschichte oder Natur zu studieren' }
					],
					q1: '1. Welche drei Länder gehören zur Gruppe D-A-CH und welches Ziel verfolgte der Geograph Al-Idrisi bei seinen Karten?',
					a1: 'D-A-CH steht für Deutschland (Berlin), Österreich (Wien) und die Schweiz (Bern). Al-Idrisi befragte erfahrene Seeleute und Kaufleute, um genaue Landkarten des Mittelmeerraums und Nordafrikas zu zeichnen.',
					tfItems: [
						{
							q: 'Die Hauptstadt der Schweiz heißt Zürich und Österreich liegt am Atlantik.',
							a: 'Falsch',
							c: 'Die Hauptstadt der Schweiz heißt Bern, und Österreich liegt im Herzen Europas und in den Alpen.',
							mark: '0.5'
						},
						{
							q: 'Al-Idrisi stützte sich bei seinen Landkarten auf Berichte erfahrener Reisender.',
							a: 'Richtig',
							c: 'Im §2 steht, dass er erfahrene Seeleute und Kaufleute befragte, um genaue Karten zu zeichnen.',
							mark: '0.5'
						},
						{
							q: 'Eine Reise mit dem Zug gilt im Text als umweltfreundliche Reisemöglichkeit.',
							a: 'Richtig',
							c: 'Im §3 empfiehlt der Text, umweltfreundlich mit dem Zug zu reisen.',
							mark: '0.5'
						}
					],
					q3: '3. Finden Sie im Text :\n  a) Das Synonym von „bekannt“ (§2) und das Antonym von „ungenau / falsch“ (§2).\n  b) Zwei lokale Präpositionen aus dem Text mit einem Beispiel.',
					a3: 'a) Synonym von bekannt : berühmt ; Antonym von ungenau : genau (genaue). | b) Lokale Präpositionen : im Herzen Europas, über das Mittelmeer, nach Nordafrika, in den Alpen (mit dem Zug = modal).',
					q4: '4. Worauf beziehen sich die unterstrichenen Wörter „die Kasbah von Algier“ (welches Land?) und „Sprachkenntnisse“ (§3)?',
					a4: '„die Kasbah von Algier“ bezeichnet ein berühmtes historisches Kulturviertel in der Hauptstadt Algeriens. „Sprachkenntnisse“ bezieht sich auf die erworbenen Fremdsprachen wie Deutsch, mit denen man Wissen und Respekt teilt.',
					quizStatement:
						'Nach dem Text steht die Abkürzung D-A-CH für die drei deutschsprachigen Länder Deutschland, Österreich und die Schweiz.',
					quizCorrect: true,
					quizExplanation:
						'العبارة صحيحة: الرمز D-A-CH يجمع البلدان الثلاثة الناطقة بالألمانية: ألمانيا (Berlin)، النمسا (Wien)، وسويسرا (Bern).'
				},
				{
					passageTitle: 'Unterwegs mit dem Zug: Städte und Natur in Mitteleuropa',
					paragraphs: [
						'Nächstes Jahr wird eine Gruppe engagierter Sprachschüler nach Beendigung der Schulprüfungen an einem europäischen Schulaustausch teilnehmen. Auf dem Programm steht eine Fahrt nach Deutschland, an der der Lehrer großen Wert auf pünktliche Organisation legt, und ein kurzer Abstecher in [[die Schweiz]].',
						'Zuerst fahren die Jugendlichen nach Berlin, wo sie historische Bibliotheken und Wissenschaftsmuseen besichtigen. Danach geht die Reise weiter mit dem Zug entlang des Rheins nach Süden bis nach Wien an der Donau und weiter in die Schweizer Alpen. Vom Zugfenster aus sieht man grüne Wälder, saubere Bahnhöfe und hohe schneebedeckte Gipfel.',
						'Vor der Abfahrt hat jeder Schüler eine kleine Mappe vorbereitet, um [[seine Eindrücke]] genau festzuhalten. Nach der Rückkehr nach Algerien werden die Jugendlichen ihren Mitschülern einen spannenden Reisebericht präsentieren.'
					],
					source: 'Jugendjournal für Sprachen und Reisen (bearbeitet)',
					glossary: [
						{ term: 'Abstecher', meaning: 'kurzer Besuch an einem nahegelegenen Ort während einer Reise' },
						{ term: 'Mappe', meaning: 'Ordner aus Karton oder Kunststoff für Notizen und Blätter' }
					],
					q1: '1. Welche Städte und Flüsse besuchen die Sprachschüler während ihrer Reise und was werden sie nach der Rückkehr tun?',
					a1: 'Sie besuchen Berlin, fahren entlang des Rheins nach Wien an der Donau und weiter in die Schweizer Alpen. Nach der Rückkehr nach Algerien werden sie ihren Mitschülern einen Reisebericht präsentieren.',
					tfItems: [
						{
							q: 'Berlin und Wien liegen beide an den Küsten der Nordsee.',
							a: 'Falsch',
							c: 'Wien liegt an der Donau und auf dem Weg fahren sie entlang des Rheins in Richtung Süden und Alpen.',
							mark: '0.5'
						},
						{
							q: 'Die Schüler reisen während der Tour durch Mitteleuropa mit dem Zug.',
							a: 'Richtig',
							c: 'Im §2 steht, dass die Reise weiter mit dem Zug entlang des Rheins geht.',
							mark: '0.5'
						},
						{
							q: 'Jeder Schüler bereitet eine Mappe vor, um seine Reiseeindrücke festzuhalten.',
							a: 'Richtig',
							c: 'Im §3 heißt es, dass jeder Schüler eine kleine Mappe vorbereitet hat.',
							mark: '0.5'
						}
					],
					q3: '3. Suchen Sie im Text :\n  a) Das Synonym von „interessant / fesselnd“ (§3) und das Antonym von „Abfahrt“ (§3).\n  b) Zwei Verben im Futur I aus dem Text.',
					a3: 'a) Synonym : spannend ; Antonym von Abfahrt : Rückkehr. | b) Futur I : wird ... teilnehmen (§1), werden ... präsentieren (§3).',
					q4: '4. Worauf beziehen sich „die Schweiz“ (welcher Artikel / Präposition?) und „seine Eindrücke“ (§3)?',
					a4: '„die Schweiz“ ist ein Land mit femininem Artikel (Wohin? -> in die Schweiz, Wo? -> in der Schweiz). „seine Eindrücke“ bezieht sich auf die Beobachtungen und Erfahrungen jedes einzelnen Schülers während der Reise.',
					quizStatement:
						'Wenn man in die Schweiz reist, gebraucht man im Deutschen die Präposition „nach Schweiz“ ohne Artikel.',
					quizCorrect: false,
					quizExplanation:
						'العبارة خاطئة: اسم «die Schweiz» مؤنث بأداة تعريف، فنقول دائماً «in die Schweiz» عند السفر إليها و«in der Schweiz» عند الإقامة فيها.'
				},
				{
					passageTitle: 'Reisen bildet: Vom Mittelmeer über Tlemcen bis in die Alpen',
					paragraphs: [
						'Seit jeher reisen Menschen, um Neues zu entdecken, Sprachen praktisch anzuwenden und andere Kulturen besser zu verstehen. Schon der mittelalterliche Reisende Ibn Battuta legte tausende Kilometer zurück, um Städte, Gelehrte und Handelswege präzise zu beschreiben.',
						'Auch heute verbindet das Mittelmeer Regionen mit reicher Baukunst und Natur. In Algerien bewundern Gäste aus aller Welt die Brücken von Constantine sowie [[die Große Moschee von Tlemcen]], während Reisende in Österreich und der Schweiz gut ausgebaute Bergbahnen und gepflegte Nationalparks schätzen.',
						'Damit eine Reise wirklich gelingt, muss man die Kultur und Natur des Gastlandes achten. Wer höflich fragt, lokale Bräuche respektiert und keinen Müll hinterlässt, gewinnt überall wertvolle Erfahrungen.'
					],
					source: 'Kultur und Reisen im Vergleich (bearbeitet)',
					glossary: [
						{ term: 'Bräuche', meaning: 'traditionelle Sitten und Gewohnheiten eines Landes' },
						{ term: 'Nationalpark', meaning: 'großes, gesetzlich geschütztes Naturgebiet' }
					],
					q1: '1. Aus welchen Gründen reisen Menschen seit jeher und welche kulturellen Sehenswürdigkeiten nennt der zweite Absatz für Algerien?',
					a1: 'Gründe: Um Neues zu entdecken, Sprachen anzuwenden und andere Kulturen besser zu verstehen. Sehenswürdigkeiten in Algerien: die Brücken von Constantine und die Große Moschee von Tlemcen.',
					tfItems: [
						{
							q: 'Ibn Battuta reiste nur innerhalb einer einzigen kleinen Stadt.',
							a: 'Falsch',
							c: 'Im §1 steht, dass er tausende Kilometer zurücklegte, um Städte, Gelehrte und Handelswege zu beschreiben.',
							mark: '0.5'
						},
						{
							q: 'In Österreich und der Schweiz schätzen Besucher gepflegte Nationalparks und Bergbahnen.',
							a: 'Richtig',
							c: 'Das steht ausdrücklich am Ende des zweiten Absatzes.',
							mark: '0.5'
						},
						{
							q: 'Ein guter Reisender achtet lokale Bräuche und hinterlässt keinen Müll.',
							a: 'Richtig',
							c: 'Im §3 wird genau dieses respektvolle und saubere Verhalten beschrieben.',
							mark: '0.5'
						}
					],
					q3: '3. Finden Sie im Text :\n  a) Das Synonym von „genau“ (§1) und das Antonym von „unhöflich“ (§3).\n  b) Einen finalen Ausdruck mit „um ... zu“ und einen finalen Nebensatz mit „damit“.',
					a3: 'a) Synonym : präzise ; Antonym von unhöflich : höflich. | b) um ... zu : um Neues zu entdecken / praktisch anzuwenden / zu verstehen / zu beschreiben ; damit : Damit eine Reise wirklich gelingt.',
					q4: '4. Worauf bezieht sich „die Große Moschee von Tlemcen“ und warum steht „um ... zu“ im §1 statt „damit“?',
					a4: '„die Große Moschee von Tlemcen“ ist ein bedeutendes historisches Bauwerk im Westen Algeriens. Im §1 steht „um ... zu“, weil in beiden Satzteilen dasselbe Subjekt („Menschen“ bzw. „Ibn Battuta“) handelt.',
					quizStatement:
						'Laut dem Text ist der Respekt vor lokalen Bräuchen und der Schutz der Natur beim Reisen unverzichtbar.',
					quizCorrect: true,
					quizExplanation:
						'العبارة صحيحة: تؤكد الفقرة الثالثة أن احترام العادات المحلية والطبيعة وعدم ترك النفايات أساس السفر الراقي.'
				}
			];

			const v = rng.pick(variants);
			const content: ContentBlock[] = [
				buildIllustratedFigureBlock('ger_01_deutschsprachige_laender_stummkarte', {
					lang: 'de',
					mode: 'quiz',
					pins: [],
					width: '62%',
					maxHeight: 118,
					markPerItem: '0.2',
					caption: 'Stummkarte der D-A-CH-Länder und des Mittelmeerraums : Benennen Sie die Nummern 1 bis 5 auf Deutsch (5 x 0.2 = 1.0 Pkt.).'
				}),
				buildGermanPassageBlock({
					title: v.passageTitle,
					paragraphs: v.paragraphs,
					source: v.source,
					numberedParagraphs: true,
					glossary: v.glossary
				}),
				{ type: 'text', content: v.q1, answer: v.a1, mark: '1.5' },
				{
					type: 'text',
					content: '2. Entscheiden Sie : Richtig oder Falsch? Begründen Sie mit dem Text :',
					mark: ''
				},
				{ type: 'true_false', items: v.tfItems },
				{ type: 'text', content: v.q3, answer: v.a3, mark: '1.5' },
				{ type: 'text', content: v.q4, answer: v.a4, mark: '1.5' }
			];

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'true_false',
					questionText: v.quizStatement,
					questionTextAr: 'حدّد صحة أو خطأ العبارة الآتية حسب النص وقواعد الجغرافيا الألمانية:',
					questionData: {
						correctAnswer: v.quizCorrect
					},
					explanation: v.quizExplanation
				},
				sujetExercise: {
					customTitle: 'I. Textverständnis',
					points: 7,
					instruction: 'Identifizieren Sie die fünf Nummern auf der Karte, lesen Sie den Text und beantworten Sie die Fragen :',
					content
				},
				hints: [
					'تذكر أسماء البلدان على الخريطة الصماء: 1 Deutschland، 2 Österreich، 3 Schweiz، 4 Algerien، 5 Mittelmeer.',
					'علل دائماً إجابات Richtig / Falsch انطلاقاً من جملة دقيقة في النص.',
					'ميّز بين um ... zu (فاعل واحد) و damit (فاعلان مختلفان) وبين nach و in die.'
				],
				solutionStepsAr: [
					'تسمية الأرقام الخمسة على الخريطة الصماء بالألمانية (5 × 0.2 = 1.0 نقطة).',
					'الإجابة عن سؤال الفهم الثقافي والجغرافي (1.5 نقطة).',
					'تحديد صحة أو خطأ العبارات الثلاث مع التعليل (1.5 نقطة).',
					'استخراج المترادفات والأضداد والظواهر النحوية (1.5 نقطة) وتعيين العائد (1.5 نقطة).'
				],
				finalAnswer: v.quizCorrect ? 'Richtig' : 'Falsch'
			};
		}
	},

	// 2. Textverständnis (7 Pkt.) — mcq quiz
	{
		id: 'ger_tpl_2as_le_t3_comp_medien_technik',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'textverstaendnis',
		titleAr: 'I. Textverständnis : Medien, Lesen und verantwortungsvolle Techniknutzung (7 Pkt.)',
		curriculumLessonId: 'ger_lesson_2as_le_t3_medien_lesen_wissen',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					passageTitle: 'Digitale Medien klug nutzen, ohne das Lesen zu verlernen',
					paragraphs: [
						'Smartphones, Tablets und digitale Lernplattformen gehören heute selbstverständlich zum Schulalltag vieler Jugendlichen. Mit einem schnellen Klick lassen sich Online-Wörterbücher öffnen, Hörtexte abspielen oder wissenschaftliche Fakten nachschlagen. Trotzdem warnen Pädagogen davor, [[diese Werkzeuge]] ohne klare Grenzen zu gebrauchen.',
						'Wer nämlich stundenlang unkonzentriert von einem Video zum nächsten springt, verliert oft die Geduld für längere, anspruchsvolle Texte. Eine Studie zeigt, dass gedruckte Bücher und handschriftliche Notizen das tiefe Verständnis stärken, weil das Gehirn ruhiger arbeitet und weniger abgelenkt wird.',
						'Deshalb lohnt sich eine bewusste Medienkompetenz: Man sollte täglich feste Zeiten für gedruckte Bücher einplanen und digitale Quellen stets kritisch prüfen, statt ungeprüfte Meldungen sofort weiterzuleiten. Auf diese Weise bleibt Technik ein nützlicher Diener des Menschen, der [[unser Wissen]] sinnvoll bereichert.'
					],
					source: 'Medienpädagogik in der Sekundarstufe (bearbeitet)',
					glossary: [
						{ term: 'anspruchsvoll', meaning: 'schwierig und geistig fordernd' },
						{ term: 'ungeprüft', meaning: 'ohne vorherige Kontrolle auf Wahrheit und Richtigkeit' }
					],
					q1: '1. Welche Vorteile bieten digitale Medien beim Lernen und welches Risiko nennen Pädagogen bei unkontrollierter Nutzung?',
					a1: 'Vorteile: Man kann schnell Online-Wörterbücher öffnen, Hörtexte abspielen und Fakten nachschlagen. Risiko: Langes, unkonzentriertes Springen zwischen Videos schwächt die Geduld für längere Texte und lenkt das Gehirn ab.',
					mcGroups: [
						{
							header: 'a) Warum stärken gedruckte Bücher und handschriftliche Notizen das tiefe Verständnis?',
							options: [
								'Weil das Gehirn dabei ruhiger arbeitet und weniger abgelenkt wird',
								'Weil gedruckte Bücher überhaupt keine Fakten enthalten',
								'Weil man dabei ständig neue Videos ansehen muss'
							],
							correct: 'Weil das Gehirn dabei ruhiger arbeitet und weniger abgelenkt wird',
							mark: '1.0'
						},
						{
							header: 'b) Welche Bedeutung hat „statt ungeprüfte Meldungen sofort weiterzuleiten“ im §3?',
							options: [
								'Man soll Nachrichten kritisch prüfen, anstatt sie blind zu teilen',
								'Man darf digitale Wörterbücher niemals öffnen',
								'Man soll alle Nachrichten aus dem Internet ohne Lesen drucken'
							],
							correct: 'Man soll Nachrichten kritisch prüfen, anstatt sie blind zu teilen',
							mark: '1.0'
						}
					],
					q3: '3. Finden Sie im Text :\n  a) Das Synonym von „kontrollieren / überprüfen“ (§3) und das Antonym von „unnütz / schädlich“ (§3).\n  b) Einen Relativsatz aus dem dritten Absatz.',
					a3: 'a) Synonym : prüfen ; Antonym von unnütz : nützlich. | b) Relativsatz : ..., der unser Wissen sinnvoll bereichert.',
					q4: '4. Worauf beziehen sich „diese Werkzeuge“ (§1) und „unser Wissen“ (§3)?',
					a4: '„diese Werkzeuge“ bezieht sich auf Smartphones, Tablets und digitale Lernplattformen. „unser Wissen“ bezieht sich auf das gründliche, geprüfte Wissen der Lernenden.',
					mcqQuestion: 'Warum steht im Relativsatz „..., der unser Wissen sinnvoll bereichert“ das Relativpronomen „der“?',
					mcqQuestionAr: 'لماذا استُعمل ضمير الوصل «der» في نهاية الفقرة الثالثة: «..., der unser Wissen sinnvoll bereichert»؟',
					mcqCorrect: 'Weil das Bezugswort „Diener“ maskulin Singular ist und im Relativsatz als Subjekt (Nominativ) steht',
					mcqDistractors: [
						{
							text: 'Weil „Technik“ feminin Singular ist und im Dativ steht',
							diagnosticFeedback: 'خطأ: المرجع النحوي هو الكلمة الأقرب المناسبة: ein nützlicher Diener (مذكر مرفوع).'
						},
						{
							text: 'Weil nach „der“ kein konjugiertes Verb am Satzende steht',
							diagnosticFeedback: 'خطأ: الفعل «bereichert» جاء في نهاية جملة الوصل.'
						},
						{
							text: 'Weil „Wissen“ ein Pluralwort im Akkusativ ist',
							diagnosticFeedback: 'خطأ: المرجع هو Diener (فاعل مرفوع) وليس Wissen.'
						}
					],
					mcqExplanation: 'الاسم المرجع هو «ein nützlicher Diener» (مذكر مفرد) ووظيفة الضمير داخل جملة الوصل هي الفاعل (Nominativ)، لذا نختار «der».'
				},
				{
					passageTitle: 'Sicherheit im Netz und Schutz persönlicher Daten',
					paragraphs: [
						'Das Internet öffnet heute Türen zu digitalen Archiven, Sprachkursen und internationalen Bibliotheken. Damit junge Nutzer jedoch keine bösen Überraschungen erleben, müssen [[sie]] die wichtigsten Regeln des Datenschutzes und der digitalen Sicherheit kennen.',
						'Eine erste Regel lautet, persönliche Daten wie die eigene Adresse, Telefonnummer oder vertrauliche Passwörter niemals öffentlich zu teilen. Außerdem sollte man starke Passwörter aus Buchstaben und Zahlen wählen, um fremden Zugriff auf das eigene Konto zu verhindern. Wer vorsichtig handelt, schützt seine Privatsphäre, ohne auf nützliche Lernangebote verzichten zu müssen.',
						'Darüber hinaus prüfen kluge Schülerinnen und Schüler immer den Absender einer unbekannten Nachricht, bevor sie auf einen Link klicken. Verantwortungsbewusstsein im digitalen Raum ist genauso wichtig wie Höflichkeit im realen Klassenzimmer.'
					],
					source: 'Leitfaden für sichere Mediennutzung (bearbeitet)',
					glossary: [
						{ term: 'Datenschutz', meaning: 'Schutz persönlicher Informationen vor Missbrauch' },
						{ term: 'Privatsphäre', meaning: 'persönlicher Lebensbereich, der nicht für alle öffentlich ist' }
					],
					q1: '1. Welche drei Regeln zum Schutz persönlicher Daten und zur digitalen Sicherheit nennt der Text?',
					a1: '1) Persönliche Daten (Adresse, Telefonnummer, Passwörter) nie öffentlich teilen; 2) Starke Passwörter aus Buchstaben und Zahlen wählen; 3) Den Absender unbekannter Nachrichten prüfen, bevor man auf einen Link klickt.',
					mcGroups: [
						{
							header: 'a) Wozu wählt man starke Passwörter aus Buchstaben und Zahlen?',
							options: [
								'Um fremden Zugriff auf das eigene Konto zu verhindern',
								'Um den Computer schneller auszuschalten',
								'Um persönliche Adressen öffentlich anzuzeigen'
							],
							correct: 'Um fremden Zugriff auf das eigene Konto zu verhindern',
							mark: '1.0'
						},
						{
							header: 'b) Womit vergleicht der Schluss des Textes das Verantwortungsbewusstsein im digitalen Raum?',
							options: [
								'Mit der Höflichkeit im realen Klassenzimmer',
								'Mit langen Ferien auf einer einsamen Insel',
								'Mit dem Kauf teurer Videospiele'
							],
							correct: 'Mit der Höflichkeit im realen Klassenzimmer',
							mark: '1.0'
						}
					],
					q3: '3. Finden Sie im Text :\n  a) Das Synonym von „privat / geheim“ (§2) und das Antonym von „bekannt“ (§3).\n  b) Zwei verschiedene Infinitivkonstruktionen mit „um ... zu“ und „ohne ... zu“.',
					a3: 'a) Synonym : vertraulich ; Antonym von bekannt : unbekannt (unbekannten). | b) um ... zu : um fremden Zugriff ... zu verhindern ; ohne ... zu : ohne auf nützliche Lernangebote verzichten zu müssen.',
					q4: '4. Worauf bezieht sich „sie“ (§1) und warum wurde im §1 „Damit“ statt „um ... zu“ verwendet?',
					a4: '„sie“ bezieht sich auf die jungen Nutzer aus dem Nebensatz. Im §1 musste „damit“ stehen, wenn man zwei verschiedene Perspektiven oder den Fokus auf das Subjekt im Nebensatz hervorhebt (hier gleiches Subjekt „junge Nutzer“ mit bewusster Hervorhebung vor dem Hauptsatz: Damit junge Nutzer..., müssen sie...).',
					mcqQuestion: 'Was bedeutet die Infinitivgruppe „ohne auf nützliche Lernangebote verzichten zu müssen“ im zweiten Absatz?',
					mcqQuestionAr: 'ما المعنى الدقيق للتركيب المصدري «ohne ... verzichten zu müssen» في الفقرة الثانية؟',
					mcqCorrect: 'Man schützt seine Daten, und dabei muss man NICHT auf gute Lernangebote verzichten',
					mcqDistractors: [
						{
							text: 'Man muss alle digitalen Lernangebote sofort löschen',
							diagnosticFeedback: 'خطأ: «ohne ... zu» تنفي الاضطرار إلى التخلي عن العروض التعليمية.'
						},
						{
							text: 'Man teilt sein Passwort, um mehr Lernangebote zu erhalten',
							diagnosticFeedback: 'خطأ: هذا مناقض تماماً لنصيحة النص.'
						},
						{
							text: 'Man benutzt das Internet nur ohne Wissen der Eltern',
							diagnosticFeedback: 'خطأ: لا علاقة له بمضمون الجملة.'
						}
					],
					mcqExplanation: 'التركيب «ohne ... zu» يفيد انتفاء الشرط المرافق (دون أن تضطر إلى التخلي عن المصادر التعليمية المفيدة).'
				},
				{
					passageTitle: 'Wissenschaftsgeschichte und moderne Technik: Vom Experiment zur Informatik',
					paragraphs: [
						'Große wissenschaftliche Durchbrüche entstehen nicht durch Zufall, sondern durch geduldige Beobachtung und sorgfältiges Prüfen. Bereits vor tausend Jahren begründete der Gelehrte Ibn Al-Haytham in seinem berühmten Buch über die Optik die experimentelle Methode: Jede Behauptung musste durch klare Versuche bewiesen werden.',
						'Auf genau [[diesem wissenschaftlichen Geist]] baut auch die heutige Informationstechnologie auf. In modernen Laboren entwickeln Ingenieure leistungsfähige Mikrochips und sichere Netzwerke, die komplexe Daten in Sekunden verarbeiten. Gleichzeitig erinnert uns die Wissenschaftsgeschichte daran, dass Technik kein Selbstzweck ist, sondern dem Wohl der Gesellschaft dienen soll.',
						'Für junge Sprachschülerinnen und Sprachschüler bedeutet [[dieser Gedanke]], neue Technologien neugierig zu erforschen, aber stets ethisch und kritisch zu denken. In Zukunft werden gut ausgebildete Fachleute beide Welten — Sprachkultur und Naturwissenschaft — erfolgreich verbinden.'
					],
					source: 'Technik, Wissenschaft und Ethik (bearbeitet)',
					glossary: [
						{ term: 'Durchbruch', meaning: 'wichtiger neuer Fortschritt in Wissenschaft oder Technik' },
						{ term: 'Selbstzweck', meaning: 'etwas, das nur um seiner selbst willen existiert ohne höheren Nutzen' }
					],
					q1: '1. Worauf beruhte die Methode von Ibn Al-Haytham und welchem Ziel soll Technik laut dem zweiten Absatz dienen?',
					a1: 'Methode: geduldige Beobachtung, sorgfältiges Prüfen und experimentelle Beweise durch klare Versuche. Ziel der Technik: Sie soll kein Selbstzweck sein, sondern dem Wohl der Gesellschaft dienen.',
					mcGroups: [
						{
							header: 'a) Was entwickeln Ingenieure laut §2 in modernen Laboren?',
							options: [
								'Leistungsfähige Mikrochips und sichere Netzwerke',
								'Alte Pergamente aus dem Mittelalter',
								'Unterhaltungsfilme ohne wissenschaftlichen Inhalt'
							],
							correct: 'Leistungsfähige Mikrochips und sichere Netzwerke',
							mark: '1.0'
						},
						{
							header: 'b) Welche zwei Welten werden junge Fachleute in Zukunft laut §3 verbinden?',
							options: [
								'Sprachkultur und Naturwissenschaft',
								'Ungeprüfte Gerüchte und Zufall',
								'Schlafmangel und Überlastung'
							],
							correct: 'Sprachkultur und Naturwissenschaft',
							mark: '1.0'
						}
					],
					q3: '3. Finden Sie im Text :\n  a) Das Synonym von „zeigen / nachweisen“ (§1) und das Antonym von „unsicher“ (§2).\n  b) Einen Satz im Futur I aus dem dritten Absatz.',
					a3: 'a) Synonym : beweisen (bewiesen) ; Antonym von unsicher : sicher (sichere). | b) Futur I : In Zukunft werden gut ausgebildete Fachleute beide Welten ... erfolgreich verbinden.',
					q4: '4. Worauf beziehen sich „diesem wissenschaftlichen Geist“ (§2) und „dieser Gedanke“ (§3)?',
					a4: '„diesem wissenschaftlichen Geist“ bezieht sich auf die experimentelle Methode der geduldigen Beobachtung und Prüfung nach Ibn Al-Haytham. „dieser Gedanke“ bezieht sich auf die Idee, dass Technik kein Selbstzweck ist, sondern dem Wohl der Gesellschaft dient.',
					mcqQuestion: 'Welche Zeitform und Satzklammer enthält der letzte Satz: „In Zukunft werden gut ausgebildete Fachleute beide Welten erfolgreich verbinden“?',
					mcqQuestionAr: 'ما الزمن المستعمل وتركيبته في الجملة الأخيرة من النص؟',
					mcqCorrect: 'Futur I: konjugiertes Hilfsverb „werden“ auf Position 2 und Infinitiv „verbinden“ am Satzende',
					mcqDistractors: [
						{
							text: 'Perfekt: „werden“ + Partizip II am Satzende',
							diagnosticFeedback: 'خطأ: الماضي المركب يستعمل haben أو sein + Partizip II، وليس werden + Infinitiv.'
						},
						{
							text: 'Präteritum eines Modalverbs ohne zweiten Verbteil',
							diagnosticFeedback: 'خطأ: يوجد فعلان: werden (مصرف) و verbinden (مصدر في النهاية).'
						},
						{
							text: 'Relativsatz im Dativ Plural mit „denen“',
							diagnosticFeedback: 'خطأ: هذه جملة رئيسية مستقلة لا جملة وصل.'
						}
					],
					mcqExplanation: 'المستقبل البسيط (Futur I) يُصاغ بوضع الفعل المساعد werden في الموقع الثاني والمصدر في آخر الجملة.'
				}
			];

			const v = rng.pick(variants);
			const mcq = buildUniqueMcqOptions(v.mcqCorrect, v.mcqDistractors, rng);
			const content: ContentBlock[] = [
				buildIllustratedFigureBlock('ger_05_wissenschaft_technologie_innovation', {
					lang: 'de',
					mode: 'labeled',
					pins: [],
					width: '62%',
					maxHeight: 118,
					caption: 'Wissenschaftliche Forschung, sichere Netze und verantwortungsvolle Technik'
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
					content: '2. Kreuzen Sie die richtige Antwort gemäß dem Text an :',
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
				trimesterId: 't3',
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
					instruction: 'Schauen Sie sich die Abbildung an, lesen Sie den Text sorgfältig und lösen Sie die Aufgaben :',
					content
				},
				hints: [
					'اربط مضمون النص بمفاهيم اللوحة التوضيحية (البحث، الرقائق، أمن المعلومات، والمسؤولية).',
					'لاحظ في النص الجمل المصدرية (um...zu, ohne...zu, statt...zu) وجمل الوصل (Relativsätze) والمستقبل (Futur I).',
					'تحقق من عائد الضمائر والعبارات الإشارية بقراءة الجملة السابقة مباشرة.'
				],
				solutionStepsAr: [
					'تحديد الفكرة المركزية أو المنهج العلمي من النص (2.0 نقطة).',
					'اختيار الإجابتين الصحيحتين في الاختيار من متعدد (2.0 نقطة).',
					'استخراج المترادفات والأضداد والظواهر التركيبية (1.5 نقطة).',
					'تحديد العائد النحوي للعبارات المسطرة (1.5 نقطة).'
				],
				finalAnswer: v.mcqCorrect
			};
		}
	},

	// 3. Sprachfähigkeit (7 Pkt.) — matching quiz + saveGermanSvgAsset
	{
		id: 'ger_tpl_2as_le_t3_ling_futur_relativsaetze',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'grammatik_syntax',
		titleAr: 'II. Sprachfähigkeit : Futur I, Relativsätze und finale Konnektoren (7 Pkt.)',
		curriculumLessonId: 'ger_lesson_2as_le_t3_futur_relativsaetze',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					svgSlug: 'ger_2as_t3_ling_futur_rel_v0',
					svgContent: svgGermanTenseTimeline({
						title: 'Zukunft ausdrücken: Futur I',
						tenseName: 'werden + Infinitiv',
						formula: 'Subjekt + werden (Pos. 2) + ... + Infinitiv (Ende)',
						activeZone: 'future',
						example: 'Nächstes Jahr werden wir viel über Technik lernen.',
						markers: 'bald, morgen, nächstes Jahr, in Zukunft',
						width: 560
					}),
					svgCaption: 'Zeitstrahl und Bildungsformel für Futur I im Deutschen',
					wfRows: [
						{
							verb: { given: true, value: 'reisen' },
							nomen: { value: 'die Reise / der Reisende', mark: '0.5' },
							adjektiv: { value: 'reiselustig', mark: '0.5' }
						},
						{
							verb: { value: 'informieren', mark: '0.5' },
							nomen: { given: true, value: 'die Information' },
							adjektiv: { value: 'informativ', mark: '0.5' }
						}
					],
					q2: '2. Setzen Sie die folgenden Sätze ins Futur I (werden + Infinitiv) :\n  a) Im nächsten Schuljahr (besuchen) ich eine Sprachausstellung in Algier.\n  b) Mein Bruder (studieren) Informatik, und meine Schwestern (lesen) deutsche Fachbücher.\n  c) (schaffen) du diese Übersetzung bis morgen Abend?',
					a2: 'a) Im nächsten Schuljahr werde ich eine Sprachausstellung in Algier besuchen.\n  b) Mein Bruder wird Informatik studieren, und meine Schwestern werden deutsche Fachbücher lesen.\n  c) Wirst du diese Übersetzung bis morgen Abend schaffen?',
					q3: '3. Ergänzen Sie das passende Relativpronomen (der, die, das, den, dem, denen) :\n  a) Das Wörterbuch, ............ auf meinem Schreibtisch liegt, ist sehr genau.\n  b) Der Reiseführer, ............ ich gestern ausgeliehen habe, beschreibt Wien und Bern.\n  c) Die Mitschüler, ............ wir bei der Projektarbeit helfen, sind sehr dankbar.',
					a3: 'a) das (Nom. neutral).\n  b) den (Akk. mask. nach ausleihen).\n  c) denen (Dat. Plural nach helfen).',
					q4: '4. Verbinden Sie final mit „um ... zu“ oder „damit“ (Subjekt prüfen!) :\n  a) Salma spart Geld. Sie möchte im Sommer mit dem Zug reisen.\n  b) Der Lehrer erklärt die Relativsätze genau. Alle Schüler sollen fehlerfrei schreiben.',
					a4: 'a) Salma spart Geld, um im Sommer mit dem Zug zu reisen. (gleiches Subjekt).\n  b) Der Lehrer erklärt die Relativsätze genau, damit alle Schüler fehlerfrei schreiben. (zwei Subjekte).',
					pairs: [
						{ left: 'ich / er (Futur I)', right: 'werde / wird + Infinitiv' },
						{ left: 'Relativpronomen (Dativ Plural)', right: 'denen' },
						{ left: 'gleiches Subjekt (Zweck)', right: 'um ... zu + Infinitiv' },
						{ left: 'verschiedene Subjekte (Zweck)', right: 'damit + Verb am Ende' }
					],
					explanation:
						'Futur I يستعمل werden + Infinitiv (er wird)، وضمير الوصل في جمع Dativ هو denen، وعند اختلاف الفاعلين نستخدم damit بدل um...zu.'
				},
				{
					svgSlug: 'ger_2as_t3_ling_futur_rel_v1',
					svgContent: svgGermanGrammarMap({
						title: 'Relativpronomen in Nom. / Akk. / Dat.',
						rootLabel: 'Genus & Zahl vom Bezugswort + Kasus vom Verb',
						rootSub: 'Besonderheit im Dativ Plural: denen!',
						width: 560,
						branches: [
							{
								label: 'Nominativ',
								rule: 'der / die / das / die',
								example: 'Der Zug, der abfährt...'
							},
							{
								label: 'Akkusativ',
								rule: 'den / die / das / die',
								example: 'Der Text, den wir lesen...'
							},
							{
								label: 'Dativ Sg.',
								rule: 'dem / der / dem',
								example: 'Der Freund, dem ich danke'
							},
							{
								label: 'Dativ Pl.',
								rule: 'denen (mit -en!)',
								example: 'Die Bücher, mit denen...'
							}
						]
					}),
					svgCaption: 'Entscheidungsschema zur Wahl des genauen Relativpronomens',
					wfRows: [
						{
							verb: { given: true, value: 'forschen' },
							nomen: { value: 'die Forschung / der Forscher', mark: '0.5' },
							adjektiv: { value: 'forschend', mark: '0.5' }
						},
						{
							verb: { value: 'entwickeln', mark: '0.5' },
							nomen: { value: 'die Entwicklung', mark: '0.5' },
							adjektiv: { given: true, value: 'entwicklungsfähig' }
						}
					],
					q2: '2. Bilden Sie vollständige Sätze im Futur I mit der passenden Verbform von „werden“ :\n  a) Bald / werden / unsere Klasse / die Bibliothek von Constantine / besuchen.\n  b) Du / werden / in den Ferien / viele Seiten / auf Deutsch / schreiben.\n  c) Wer / werden / morgen / das Referat über Al-Idrisi / halten?',
					a2: 'a) Bald wird unsere Klasse die Bibliothek von Constantine besuchen.\n  b) Du wirst in den Ferien viele Seiten auf Deutsch schreiben.\n  c) Wer wird morgen das Referat über Al-Idrisi halten?',
					q3: '3. Setzen Sie die Präposition und das richtige Relativpronomen ein :\n  a) Das ist die ruhige Bibliothek, (in + Wo?) ............ wir uns auf das Abitur vorbereiten.\n  b) Das ist der sichere Zug, (mit) ............ wir nach Oran gefahren sind.\n  c) Die Stadt, (in + Wohin?) ............ meine Familie im Sommer reist, heißt Tlemcen.',
					a3: 'a) in der (Dat. fem.).\n  b) mit dem (Dat. mask.).\n  c) in die (Akk. fem.).',
					q4: '4. Ergänzen Sie „um“, „damit“, „ohne“ oder „statt“ sinnvoll :\n  a) Ich prüfe immer die Quelle, ............ blinde Gerüchte zu teilen.\n  b) Die Eltern unterstützen ihre Kinder, ............ sie ruhig lernen können.\n  c) Er öffnet das Wörterbuch, ............ ein neues Verb nachzuschlagen.',
					a4: 'a) ohne ; b) damit ; c) um.',
					pairs: [
						{ left: 'die Bibliothek, in ... wir lesen (Wo?)', right: 'in der' },
						{ left: 'die Stadt, in ... wir fahren (Wohin?)', right: 'in die' },
						{ left: 'der Zug, mit ... er reist', right: 'mit dem' },
						{ left: 'die Kinder, ... wir helfen', right: 'denen' }
					],
					explanation:
						'حروف الجر المتبادلة تحفظ قواعدها داخل جملة الوصل: مع السكون (lesen -> in der) ومع الحركة (fahren -> in die)، و mit و helfen يأخذان Dativ.'
				},
				{
					svgSlug: 'ger_2as_t3_ling_futur_rel_v2',
					svgContent: svgGermanGrammarMap({
						title: 'Finalsätze: um ... zu vs damit',
						rootLabel: 'Absicht und Ziel ausdrücken (Wozu?)',
						rootSub: 'Subjektvergleich bestimmt die Konstruktion',
						width: 560,
						branches: [
							{
								label: 'Gleiches Subjekt',
								rule: 'um ... zu + Infinitiv',
								example: 'Ich übe, um gut zu sprechen.'
							},
							{
								label: 'Trennbares Verb',
								rule: 'zu nach dem Präfix',
								example: '... um das Wort nachzuschlagen'
							},
							{
								label: 'Zwei Subjekte',
								rule: 'damit + Subj. + Verb (Ende)',
								example: '... damit ihr es versteht.'
							},
							{
								label: 'Verbotener Fehler',
								rule: 'Kein Subjekt nach um!',
								example: 'Falsch: um ich zu lernen'
							}
						]
					}),
					svgCaption: 'Klares Unterscheidungsmodell zwischen finalem um ... zu und damit',
					wfRows: [
						{
							verb: { given: true, value: 'verbinden' },
							nomen: { value: 'die Verbindung', mark: '0.5' },
							adjektiv: { value: 'verbindend / verbindlich', mark: '0.5' }
						},
						{
							verb: { value: 'schützen', mark: '0.5' },
							nomen: { given: true, value: 'der Datenschutz' },
							adjektiv: { value: 'geschützt', mark: '0.5' }
						}
					],
					q2: '2. Verbinden Sie jedes Satzpaar zu einem einzigen Relativsatz (Kommas setzen!) :\n  a) Wir lesen ein Buch. Es erklärt die Geschichte der Wissenschaft.\n  b) Ich treffe einen Freund. Ich habe ihm mein Wörterbuch geliehen.\n  c) Dort stehen die neuen Computer. Wir benutzen sie für sichere Recherchen.',
					a2: 'a) Wir lesen ein Buch, das die Geschichte der Wissenschaft erklärt.\n  b) Ich treffe einen Freund, dem ich mein Wörterbuch geliehen habe.\n  c) Dort stehen die neuen Computer, die wir für sichere Recherchen benutzen.',
					q3: '3. Formen Sie die Absichtssätze in Futur I oder finale Strukturen um :\n  a) Wir planen für nächstes Jahr: Wir lernen noch mehr Konnektoren. (Futur I)\n  b) Tarik geht früh ins Bett. Er möchte morgen im Training fit sein. (um ... zu)',
					a3: 'a) Nächstes Jahr werden wir noch mehr Konnektoren lernen.\n  b) Tarik geht früh ins Bett, um morgen im Training fit zu sein.',
					q4: '4. Korrigieren Sie den Fehler in diesen drei Sätzen :\n  a) Der Schüler lernt fleißig, damit das Abitur zu bestehen.\n  b) In der Zukunft wirdt mein Bruder eine sichere Software entwickeln.\n  c) Das sind die Artikel, die ich habe gestern genau geprüft.',
					a4: 'a) Der Schüler lernt fleißig, um das Abitur zu bestehen.\n  b) In der Zukunft wird mein Bruder eine sichere Software entwickeln.\n  c) Das sind die Artikel, die ich gestern genau geprüft habe.',
					pairs: [
						{ left: 'du + werden (Futur I)', right: 'du wirst + Infinitiv' },
						{ left: 'er / sie / es + werden (Futur I)', right: 'er wird + Infinitiv' },
						{ left: 'nachschlagen mit um ... zu', right: 'um ... nachzuschlagen' },
						{ left: 'Verbstellung im Relativsatz', right: 'Hilfsverb ganz am Ende' }
					],
					explanation:
						'تصريف werden الشاذ مع du و er هو wirst و wird، وفي الجملة الموصولة والمصدرية تقع أداة zu وسط الفعل المنفصل ويختم الفعل المساعد جملة الوصل.'
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
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'linguistic_competence',
				quizQuestion: {
					type: 'matching',
					questionText: 'Ordnen Sie jedes Element der linken Seite der grammatisch richtigen Form rechts zu:',
					questionTextAr: 'صل كل بنية في اليمين بالصيغة النحوية الصحيحة الموافقة لها في اليسار:',
					questionData: {
						pairs: v.pairs
					},
					explanation: v.explanation
				},
				sujetExercise: {
					customTitle: 'II. Sprachfähigkeit',
					points: 7,
					instruction: 'Lösen Sie die folgenden Aufgaben zu Wortbildung, Futur I, Relativsätzen und Finalsätzen :',
					content
				},
				hints: [
					'انتبه لتصريف werden في المستقبل: ich werde, du wirst, er/sie/es wird (بدون t!).',
					'في جملة الوصل يتبع الجنس والعدد الاسم المرجع، وتتبع الحالة الإعرابية الفعل داخل جملة الوصل (Dativ Plural: denen).',
					'تذكر: um ... zu لفاعل واحد متطابق، و damit عند وجود فاعلين مختلفين.'
				],
				solutionStepsAr: [
					'إكمال جدول عائلة الكلمات بدقة (2.0 نقطة).',
					'صياغة زمن المستقبل Futur I أو ربط جمل الوصل (2.0 نقطة).',
					'اختيار ضمائر الوصل الدقيقة مع حروف الجر (1.5 نقطة).',
					'التمييز بين um ... zu و damit وتصحيح الأخطاء التركيبية (1.5 نقطة).'
				],
				finalAnswer: v.pairs.map((p) => `${p.left} = ${p.right}`).join(' | ')
			};
		}
	},

	// 4. Sprachfähigkeit (7 Pkt.) — drag_drop quiz + saveGermanSvgAsset
	{
		id: 'ger_tpl_2as_le_t3_ling_konnektoren_medien',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'kultur_landeskunde',
		titleAr: 'II. Sprachfähigkeit : Lokale Präpositionen, Infinitivsätze und Redemittel (7 Pkt.)',
		curriculumLessonId: 'ger_lesson_2as_le_t3_medien_lesen_wissen',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					svgSlug: 'ger_2as_t3_ling_konnektoren_v0',
					svgContent: svgGermanWritingBlueprint({
						title: 'Redemittel & Konnektoren für Aufsätze',
						steps: [
							{
								stage: 'Einleitung',
								detail: 'In der heutigen Welt stellt sich die Frage...'
							},
							{
								stage: 'Abwägung',
								detail: 'Einerseits ... andererseits (Verb auf Pos. 2!)'
							},
							{
								stage: 'Folge & Zweck',
								detail: 'Deshalb + Verb | um ... zu / damit'
							},
							{
								stage: 'Fazit & Meinung',
								detail: 'Meiner Meinung nach / Zusammenfassend...'
							}
						],
						width: 560
					}),
					svgCaption: 'Strukturierte Redemittel für Erörterungen und Stellungnahmen',
					classPrompt:
						'1. Ordnen Sie diese sechs Begriffe richtig in die Wortfelder ein (die Fahrkarte, der Datenschutz, der Bahnhof, die Suchmaschine, das Wörterbuch, die Sehenswürdigkeit) :',
					classCols: [
						{ header: 'Reisen & Tourismus', items: ['die Fahrkarte', 'der Bahnhof', 'die Sehenswürdigkeit'], mark: '0.5' },
						{ header: 'Digitale Medien', items: ['der Datenschutz', 'die Suchmaschine'], mark: '0.5' },
						{ header: 'Lesen & Lernen', items: ['das Wörterbuch'], mark: '0.5' }
					],
					q2: '2. Ergänzen Sie die richtige Infinitivkonstruktion (um ... zu, ohne ... zu, statt ... zu) :\n  a) Viele Schüler öffnen ein Wörterbuch, ............ neue Begriffe nachzuschlagen.\n  b) ............ den ganzen Abend fernzusehen, liest Meriem ein interessantes Geschichtsbuch.\n  c) Man darf keine Nachricht teilen, ............ vorher ihre Quelle zu überprüfen.',
					a2: 'a) um ... nachzuschlagen.\n  b) Statt ... fernzusehen (oder Anstatt ... fernzusehen).\n  c) ohne ... zu überprüfen.',
					q3: '3. Verbinden Sie die Sätze mit „einerseits ... andererseits“, „deshalb“ oder „trotzdem“ (V2-Regel beachten!) :\n  a) Digitale Medien bieten schnelle Informationen. Lange Bildschirmzeit ermüdet die Augen. (Einerseits ... andererseits)\n  b) Es hat heute Morgen stark geregnet. Die Klasse hat die Exkursion nach Tipaza unternommen. (trotzdem)\n  c) Schutz persönlicher Daten ist wichtig. Wir benutzen sichere Passwörter. (deshalb)',
					a3: 'a) Einerseits bieten digitale Medien schnelle Informationen, andererseits ermüdet lange Bildschirmzeit die Augen.\n  b) Es hat heute Morgen stark geregnet; trotzdem hat die Klasse die Exkursion nach Tipaza unternommen.\n  c) Der Schutz persönlicher Daten ist wichtig; deshalb benutzen wir sichere Passwörter.',
					q4: '4. Ergänzen Sie die lokalen Präpositionen für Länder und Ziele (nach, in die, in der, ans, am) :\n  a) Im Juli reist Tarik ............ Deutschland, und im August fährt er weiter ............ Schweiz.\n  b) Seine Familie wohnt direkt ............ Mittelmeer, und nächste Woche fahren sie wieder ............ Meer.',
					a4: 'a) nach / in die.\n  b) am / ans.',
					ddStem: 'Ordnen Sie jeden Satz der passenden semantischen Funktion zu:',
					ddCategories: ['Zweck (um ... zu / damit)', 'Gegensatz oder Verzicht (statt ... zu / ohne ... zu)'],
					ddItems: [
						{ text: 'Wir lernen Deutsch, um Texte sicher zu übersetzen.', category: 0 },
						{ text: 'Der Lehrer gibt Beispiele, damit alle es verstehen.', category: 0 },
						{ text: 'Statt lange zu spielen, wiederholt Amin seine Vokabeln.', category: 1 },
						{ text: 'Man darf nichts abschreiben, ohne die Quelle zu prüfen.', category: 1 }
					]
				},
				{
					svgSlug: 'ger_2as_t3_ling_konnektoren_v1',
					svgContent: svgGermanGrammarMap({
						title: 'Reisepräpositionen: D-A-CH & Mittelmeer',
						rootLabel: 'Richtung (Wohin?) vs Lage (Wo?)',
						rootSub: 'Länder ohne Artikel vs Länder mit Artikel',
						width: 560,
						branches: [
							{
								label: 'Ohne Artikel',
								rule: 'Wohin: nach | Wo: in',
								example: 'nach Wien / in Österreich'
							},
							{
								label: 'Die Schweiz (f.)',
								rule: 'Wohin: in die | Wo: in der',
								example: 'in die Schweiz / in der'
							},
							{
								label: 'Das Meer (n.)',
								rule: 'ans Meer / am Meer',
								example: 'Wir fahren ans Mittelmeer.'
							},
							{
								label: 'Verkehrsmittel',
								rule: 'mit dem ... / zu Fuß',
								example: 'mit dem Zug / zu Fuß'
							}
						]
					}),
					svgCaption: 'Lokale und modale Präpositionen bei Länder- und Reiseangaben',
					classPrompt:
						'1. Klassifizieren Sie diese sechs Ausdrücke nach ihrer grammatischen Rolle (nach Österreich, in der Schweiz, einerseits ... andererseits, ohne zu fragen, mit dem Schiff, um zu lernen) :',
					classCols: [
						{ header: 'Lokale Angaben', items: ['nach Österreich', 'in der Schweiz'], mark: '0.5' },
						{ header: 'Modal / Verkehr', items: ['mit dem Schiff'], mark: '0.5' },
						{ header: 'Konnektoren & Infinitiv', items: ['einerseits ... andererseits', 'ohne zu fragen', 'um zu lernen'], mark: '0.5' }
					],
					q2: '2. Ergänzen Sie die richtige Reisepräposition mit oder ohne Artikel :\n  a) Meine Großeltern verbringen eine Woche ............ Bergen (die Berge Pl. — Wo?), während wir ............ Stadt (die Stadt — Wohin?) fahren.\n  b) Von Algier aus reist mein Onkel ............ Schiff nach Marseille und dann ............ Zug ............ Bern.\n  c) Die Schweiz liegt ............ Herzen Europas; unsere Cousine studiert seit zwei Jahren ............ Schweiz.',
					a2: 'a) in den Bergen / in die Stadt.\n  b) mit dem Schiff / mit dem Zug / nach Bern.\n  c) im Herzen / in der Schweiz.',
					q3: '3. Verbinden Sie die Sätze mit „ohne ... zu“ oder „statt ... zu“ (achten Sie auf das gleiche Subjekt!) :\n  a) Viele klicken auf unbekannte Links. Sie prüfen den Absender nicht. (ohne ... zu)\n  b) Am Wochenende solltest du im Wald wandern. Du sitzt nicht nur am Smartphone. (statt ... zu)',
					a3: 'a) Viele klicken auf unbekannte Links, ohne den Absender zu prüfen.\n  b) Am Wochenende solltest du im Wald wandern, statt nur am Smartphone zu sitzen.',
					q4: '4. Finden Sie das Gegenteil (Antonym) und setzen Sie „einerseits“ / „andererseits“ richtig ein :\n  a) Antonym : seriös (............) ; öffentlich (............) ; gedruckt (............).\n  b) Ergänzen Sie die Wortstellung : Deshalb (wir / müssen) ............ kritisch lesen.',
					a4: 'a) unseriös ; privat / vertraulich ; digital.\n  b) Deshalb müssen wir kritisch lesen.',
					ddStem: 'Ordnen Sie jede Ortsangabe der richtigen Präpositionsregel zu:',
					ddCategories: ['Länder & Städte ohne Artikel (nach / in)', 'Länder & Orte mit Artikel (in die / in der / ans / am)'],
					ddItems: [
						{ text: 'nach Deutschland reisen', category: 0 },
						{ text: 'in Algerien und in Wien wohnen', category: 0 },
						{ text: 'in die Schweiz fahren', category: 1 },
						{ text: 'am Mittelmeer Urlaub machen', category: 1 }
					]
				},
				{
					svgSlug: 'ger_2as_t3_ling_konnektoren_v2',
					svgContent: svgGermanGrammarMap({
						title: 'Stellung nach Konnektoren (V2 vs Ende)',
						rootLabel: 'Welchen Satzbau verlangt der Konnektor?',
						rootSub: 'Koordination (0/2) vs Adverb (1) vs Subordination (Ende)',
						width: 560,
						branches: [
							{
								label: 'Position 0 (denn/aber)',
								rule: 'Subjekt + Verb (Pos. 2)',
								example: '..., denn das Buch hilft.'
							},
							{
								label: 'Pos. 1 (deshalb/trotzdem)',
								rule: 'Konnektor + Verb + Subjekt',
								example: 'Deshalb lesen wir viel.'
							},
							{
								label: 'Nebensatz (weil/damit)',
								rule: 'Konj. + ... + Verb (Ende)',
								example: '..., damit alle es wissen.'
							},
							{
								label: 'Infinitiv (um/ohne/statt)',
								rule: 'Kein Subjekt, zu + Infinitiv',
								example: '..., um Neues zu lernen.'
							}
						]
					}),
					svgCaption: 'Vergleich der vier Satzbaumuster deutscher Konnektoren',
					classPrompt:
						'1. Ordnen Sie diese sechs Konnektoren der exakten Position des konjugierten Verbs zu (weil, deshalb, denn, damit, trotzdem, aber) :',
					classCols: [
						{ header: 'Position 0 (dann Subj.+Verb)', items: ['denn', 'aber'], mark: '0.5' },
						{ header: 'Position 1 (sofort Verb+Subj.)', items: ['deshalb', 'trotzdem'], mark: '0.5' },
						{ header: 'Nebensatz (Verb am Ende)', items: ['weil', 'damit'], mark: '0.5' }
					],
					q2: '2. Korrigieren Sie die Wortstellung nach den Redemitteln und Konnektoren :\n  a) Meiner Meinung nach das Internet ist ein hilfreiches Werkzeug.\n  b) Deshalb wir müssen unsere Passwörter geheim halten.\n  c) Erstens man spart Zeit, zweitens man findet viele Quellen.',
					a2: 'a) Meiner Meinung nach ist das Internet ein hilfreiches Werkzeug.\n  b) Deshalb müssen wir unsere Passwörter geheim halten.\n  c) Erstens spart man Zeit, zweitens findet man viele Quellen.',
					q3: '3. Formen Sie die beiden Sätze mit „sowohl ... als auch“ oder „zwar ..., aber“ um :\n  a) Gedruckte Bücher fördern die Konzentration. Digitale Archive erleichtern schnelle Recherchen. (zwar ..., aber)\n  b) In der Schweiz spricht man Deutsch. Dort spricht man auch Französisch und Italienisch. (sowohl ... als auch)',
					a3: 'a) Zwar erleichtern digitale Archive schnelle Recherchen, aber gedruckte Bücher fördern die Konzentration.\n  b) In der Schweiz spricht man sowohl Deutsch als auch Französisch und Italienisch.',
					q4: '4. Ergänzen Sie das passende Wort aus dem Wortfeld Medien und Wissen (Quelle, Falschmeldung, Bildschirmzeit, Datenschutz) :\n  a) Eine ungeprüfte Nachricht ohne Beweise nennt man eine ............ .\n  b) Der ............ schützt persönliche Informationen vor fremdem Zugriff.\n  c) Zu lange ............ schadet den Augen; jede ............ muss seriös sein.',
					a4: 'a) Falschmeldung ; b) Datenschutz ; c) Bildschirmzeit / Quelle.',
					ddStem: 'Ordnen Sie jeden Satz je nachdem ein, ob der Konnektor grammatisch richtig oder falsch verwendet wurde:',
					ddCategories: ['Korrekter Satzbau (V2 / Ende eingehalten)', 'Fehlerhafter Satzbau'],
					ddItems: [
						{ text: 'Deshalb prüfen wir jede Meldung sorgfältig.', category: 0 },
						{ text: 'Wir gehen in die Bibliothek, um Fachbücher auszuleihen.', category: 0 },
						{ text: 'Deshalb wir prüfen jede Meldung sorgfältig.', category: 1 },
						{ text: 'Wir gehen in die Bibliothek, um Fachbücher ausleihen zu.', category: 1 }
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
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'linguistic_competence',
				quizQuestion: {
					type: 'drag_drop',
					questionText: v.ddStem,
					questionTextAr: 'اسحب كل جملة أو عبارة إلى الفئة النحوية المناسبة:',
					questionData: {
						categories: v.ddCategories,
						items: rng.shuffle(v.ddItems)
					},
					explanation:
						'انتبه للروابط الظرفية (deshalb, trotzdem, meiner Meinung nach) التي تفرض الفعل في الموقع 2 قبل الفاعل، وإلى وضع zu داخل الفعل المنفصل في الجمل المصدرية.'
				},
				sujetExercise: {
					customTitle: 'II. Sprachfähigkeit',
					points: 7,
					instruction: 'Bearbeiten Sie die Übungen zu Infinitivsätzen, Konnektoren und Reisepräpositionen :',
					content
				},
				hints: [
					'تذكر موضع الفعل المصرف مباشرة بعد deshalb / trotzdem / einerseits / meiner Meinung nach.',
					'مع البلدان ذات الأداة مثل die Schweiz نستعمل in die (اتجاه) و in der (موقع).',
					'في الجمل المصدرية مع الأفعال المنفصلة تدخل zu بين السابقة والجذر: auszuleihen / fernzusehen.'
				],
				solutionStepsAr: [
					'تصنيف المفردات أو الروابط في الجدول الثلاثي (1.5 نقطة).',
					'توظيف التراكيب المصدرية أو حروف الجر المحلية للبلدان (2.0 نقطة).',
					'الربط الدقيق بالروابط الظرفية والمزدوجة مع احترام V2 (2.0 نقطة).',
					'ضبط الأضداد ومعجم الإعلام والسفر (1.5 نقطة).'
				],
				finalAnswer: v.ddItems.map((it) => `${it.text} : ${v.ddCategories[it.category]}`).join(' | ')
			};
		}
	},

	// 5. Schriftlicher Ausdruck (6 Pkt., Integration) — ordering quiz
	{
		id: 'ger_tpl_2as_le_t3_writ_reisen_dach',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'schriftlicher_ausdruck',
		titleAr: 'III. Schriftlicher Ausdruck : Reisen, D-A-CH-Länder und Kulturaustausch (6 Pkt.)',
		curriculumLessonId: 'ger_lesson_2as_le_t3_dach_laender_reisen',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					themaEinsPrompt:
						'Schreiben Sie einen Zukunftsplan (115 bis 140 Wörter) über eine Bildungsreise, die Sie nach dem Abitur in eines der D-A-CH-Länder (Deutschland, Österreich oder die Schweiz) unternehmen möchten.',
					themaEinsStichpunkte: [
						'Welches D-A-CH-Land und welche Stadt Sie besuchen werden (Futur I: werden + Infinitiv) und mit welchem Verkehrsmittel.',
						'Welche Sehenswürdigkeiten, Bibliotheken oder Naturlandschaften Sie besichtigen wollen (Relativsatz einsetzen).',
						'Warum Sie diese Reise machen möchten (um ... zu oder damit).',
						'Was Sie einem deutschen oder österreichischen Gast über Algerien (z.B. Kasbah von Algier, Tlemcen, M’Zab-Tal) erzählen werden.'
					],
					themaZweiPrompt:
						'Sie führen einen deutschsprachigen Gast durch zwei historische Orte Algeriens (z.B. Constantine, Tlemcen, Ghardaïa oder die Kasbah von Algier). Stellen Sie beide Orte in einem lebendigen Text (115 bis 140 Wörter) vor.',
					modelAnswer:
						'Nach meinem Abitur werde ich eine spannende Bildungsreise nach Deutschland und in die Schweiz unternehmen. Zuerst werde ich mit dem Zug nach Berlin fahren, um berühmte Bibliotheken und historische Bauwerke zu entdecken. Danach reise ich weiter in die Schweiz, die durch ihre hohen Alpen und sauberen Seen beeindruckt.\n\nEinerseits möchte ich dort meine Deutschkenntnisse praktisch anwenden, andererseits werde ich den Menschen dort gern unsere algerische Heimat vorstellen. Ich werde ihnen Fotos von der Kasbah von Algier, der Großen Moschee von Tlemcen und dem M’Zab-Tal zeigen, damit sie die reiche Baukunst Nordafrikas kennenlernen.\n\nZusammenfassend lässt sich sagen, dass eine solche Reise nicht nur das Sprachgefühl stärkt, sondern auch gegenseitigen Respekt zwischen den Kulturen fördert.',
					rubricSummary:
						'Erfüllung aller Stichpunkte und Kulturbezug (2.0 Pkt.) / Futur I, Präpositionen (nach / in die), Relativsatz und Finalsatz (2.0 Pkt.) / Wortschatz und Orthographie (2.0 Pkt.)',
					orderedSteps: [
						'Nach dem Abitur werde ich eine Bildungsreise nach Deutschland und in die Schweiz unternehmen.',
						'In Berlin werde ich historische Bibliotheken besuchen, um meine Sprachkenntnisse zu verbessern.',
						'Außerdem werde ich dort von der Kasbah von Algier und Tlemcen berichten, damit die Gastgeber Algerien kennenlernen.',
						'Solche Reisen bauen lebendige Brücken des Wissens und des gegenseitigen Respekts.'
					],
					orderExplanation:
						'يتدرج النص من الخطة المستقبلية (Futur I)، إلى الهدف الشخصي (um...zu)، فالتبادل الثقافي مع الغاية (damit)، ويُختم بالخلاصة.'
				},
				{
					themaEinsPrompt:
						'Schreiben Sie einen Erlebnis- und Vergleichsaufsatz (115 bis 140 Wörter) zum Thema: „Warum lohnt sich umweltfreundliches Reisen mit dem Zug durch bekannte Städte und Landschaften?“',
					themaEinsStichpunkte: [
						'Einleitung über das Reisen als Mittel zum Lernen und Entdecken (Verweis auf berühmte Reisende wie Ibn Battuta oder Al-Idrisi).',
						'Vorteile einer Zugreise im Vergleich zum Auto oder Flugzeug (Komparativ / Superlativ, ruhige Beobachtung, Umweltschutz).',
						'Worauf ein verantwortungsbewusster Reisender achten muss (Respekt vor Bräuchen, Sauberkeit in Nationalparks).',
						'Schlussfolgerung mit eigenem Urteil.'
					],
					themaZweiPrompt:
						'Schreiben Sie eine E-Mail (115 bis 140 Wörter) an einen Freund aus Wien und berichten Sie, wie man in Algerien Gastfreundschaft pflegt und welche Stadt Sie ihm besonders empfehlen.',
					modelAnswer:
						'Reisen gehört seit Jahrhunderten zu den besten Möglichkeiten, die Welt zu verstehen. Schon historische Forscher und Reisende wie Al-Idrisi und Ibn Battuta zeigten, wie viel man durch aufmerksames Beobachten lernen kann.\n\nHeutzutage ist eine Fahrt mit dem Zug deutlich umweltfreundlicher als eine lange Autofahrt. Während man entspannt am Fenster sitzt, genießt man schöne Landschaften und erreicht die Bahnhöfe großer Städte ohne Stau. Zudem trägt man aktiv zum Klimaschutz bei, weil moderne Züge weniger Abgase verursachen.\n\nAllerdings sollte jeder Reisende lokale Bräuche mit Respekt behandeln und in Bergen oder am Meer keinen Müll hinterlassen. Meiner Meinung nach bereichert faires und sauberes Reisen sowohl den Gast als auch die Natur.',
					rubricSummary:
						'Klarer Aufbau in drei Teilen (2.0 Pkt.) / Komparativ, Konnektoren und korrekte Präpositionen (2.0 Pkt.) / Präzises Reisevokabular und Rechtschreibung (2.0 Pkt.)',
					orderedSteps: [
						'Schon große Gelehrte wie Al-Idrisi und Ibn Battuta zeigten, dass Reisen den Horizont erweitert.',
						'Heute ist eine Reise mit dem Zug deutlich umweltfreundlicher und ruhiger als das Auto.',
						'Dabei muss ein guter Reisender lokale Bräuche respektieren und die Natur sauber halten.',
						'Deshalb bereichert verantwortungsvolles Reisen unser Wissen ohne Schaden für die Umwelt.'
					],
					orderExplanation:
						'يبدأ المقال بالمدخل التاريخي، ثم المقارنة البيئية (umweltfreundlicher als)، فالواجب الأخلاقي أثناء السفر، ويُختم بالاستنتاج.'
				},
				{
					themaEinsPrompt:
						'Stellen Sie in einem Informationsartikel (115 bis 140 Wörter) die drei D-A-CH-Länder für Mitschüler vor, die neu mit der deutschen Sprache beginnen.',
					themaEinsStichpunkte: [
						'Namen der drei Länder und ihrer Hauptstädte (Berlin, Wien, Bern).',
						'Typische geographische Merkmale (Flüsse wie Rhein und Donau, die Alpen, Mehrsprachigkeit in der Schweiz).',
						'Korrekte Verwendung lokaler Präpositionen (in Deutschland, nach Österreich, in der Schweiz) und mindestens eines Relativsatzes.',
						'Motivationssatz für das Deutschlernen in der 2AS LE.'
					],
					themaZweiPrompt:
						'Schreiben Sie einen kurzen Aufsatz (115 bis 140 Wörter) über Ihren Traumort für eine Studienreise in Algerien oder im Ausland und begründen Sie Ihre Wahl ausführlich.',
					modelAnswer:
						'Wer in der 2AS LE Deutsch lernt, entdeckt nicht nur eine Sprache, sondern drei interessante Länder in Mitteleuropa: Deutschland, Österreich und die Schweiz, die zusammen als D-A-CH bezeichnet werden.\n\nDeutschland liegt zwischen Nordsee und Alpen und hat Berlin als lebendige Hauptstadt. In Österreich fließt die bekannte Donau durch die Hauptstadt Wien, die für ihre Geschichte und großen Bibliotheken geschätzt wird. Die Schweiz, deren Hauptstadt Bern heißt, fasziniert durch die hohen Alpen und ihre vier Landessprachen. Wenn man in die Schweiz reist, darf man den Artikel nicht vergessen: Man sagt „in der Schweiz“.\n\nDiese Vielfalt macht das Deutschlernen spannend und eröffnet später viele Chancen für Studium und Beruf.',
					rubricSummary:
						'Korrekte Landeskunde-Fakten und Stichpunkte (2.0 Pkt.) / Lokale Präpositionen und Relativsatz (2.0 Pkt.) / Klarer Stil und Großschreibung (2.0 Pkt.)',
					orderedSteps: [
						'Die Abkürzung D-A-CH fasst die drei deutschsprachigen Länder Deutschland, Österreich und Schweiz zusammen.',
						'Die Hauptstädte dieser drei Staaten heißen Berlin, Wien an der Donau und Bern.',
						'In der Schweiz, die durch die hohen Alpen bekannt ist, spricht man sogar vier Sprachen.',
						'Wer sich mit dieser Region beschäftigt, versteht die deutsche Sprache im Unterricht viel lebendiger.'
					],
					orderExplanation:
						'ينطلق التقديم من تعريف D-A-CH، ثم تحديد العواصم الثلاث، فإضافة معلومة عن سويسرا بجملة وصل، والختم بأهمية ذلك للمتعلم.'
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
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'ordering',
					questionText: 'Ordnen Sie die vier Sätze zu einem logischen Text über Reisen und die D-A-CH-Länder:',
					questionTextAr: 'رتّب الجمل الأربع الآتية لتكوين فقرة متماسكة حول السفر وبلدان D-A-CH:',
					questionData: {
						items: scrambled.items,
						correctOrder: scrambled.correctOrder
					},
					explanation: v.orderExplanation
				},
				sujetExercise: {
					customTitle: 'III. Schriftlicher Ausdruck',
					points: 6,
					instruction: 'Wählen Sie EINES der beiden Themen und schreiben Sie einen gegliederten Text (115 bis 140 Wörter) :',
					content: [block]
				},
				hints: [
					'تأكد من كتابة أسماء البلدان والعواصم بدقة (Deutschland / Berlin, Österreich / Wien, die Schweiz / Bern).',
					'وظف زمن المستقبل Futur I (werden + Infinitiv) وجملة وصل واحدة على الأقل ورابطاً غائياً.',
					'راجع حروف الجر المحلية قبل تقديم ورقتك: nach Berlin، in die / in der Schweiz، am Mittelmeer.'
				],
				solutionStepsAr: [
					'استيفاء جميع العناصر الثقافية والجغرافية المطلوبة (2.0 نقطة).',
					'ضبط زمن المستقبل وجمل الوصل وحروف الجر المحلية (2.0 نقطة).',
					'نظافة الأسلوب والإملاء وتماسك الفقرات الثلاث (2.0 نقطة).'
				],
				finalAnswer: v.orderedSteps.join(' -> ')
			};
		}
	},

	// 6. Schriftlicher Ausdruck (6 Pkt., Integration) — cloze quiz
	{
		id: 'ger_tpl_2as_le_t3_writ_medien_zukunft',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'schriftlicher_ausdruck',
		titleAr: 'III. Schriftlicher Ausdruck : Medienkompetenz, Lesen und Zukunftspläne (6 Pkt.)',
		curriculumLessonId: 'ger_lesson_2as_le_t3_schriftlicher_ausdruck_methodik',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): GermanGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					themaEinsPrompt:
						'Verfassen Sie eine gegliederte Stellungnahme (115 bis 140 Wörter) zum Thema: „Gedruckte Bücher oder digitale Medien — wie lernt man in der 2AS LE am besten?“',
					themaEinsStichpunkte: [
						'Einleitung: Bedeutung von Lesen und Information in unserer digitalen Zeit.',
						'Hauptteil mit „Einerseits ... andererseits“: Vorteile digitaler Suchmaschinen und Wörterbücher vs Vorteile gedruckter Bücher für tiefe Konzentration.',
						'Kritischer Umgang: Quellen prüfen, Datenschutz beachten, statt Zeit zu verschwenden (ohne ... zu / statt ... zu).',
						'Schluss mit „Meiner Meinung nach...“ oder „Zusammenfassend...“.'
					],
					themaZweiPrompt:
						'Welche Rolle werden Fremdsprachen und digitale Kompetenz in Ihrer eigenen beruflichen oder akademischen Zukunft spielen? Schreiben Sie einen kurzen Aufsatz (115 bis 140 Wörter) im Futur I.',
					modelAnswer:
						'In der heutigen Informationsgesellschaft stellt sich oft die Frage, ob digitale Werkzeuge gedruckte Bücher beim Lernen vollständig ersetzen können.\n\nEinerseits erleichtern Online-Wörterbücher und digitale Archive die schnelle Suche nach Begriffen, andererseits lenken soziale Netzwerke junge Leser häufig ab. Gedruckte Bücher stärken dagegen das tiefe Verständnis und die Geduld. Deshalb sollte man gedruckte Lektüre regelmäßig pflegen, statt stundenlang ziellos auf den Bildschirm zu schauen. Außerdem gilt im Netz immer Vorsicht: Man darf keine Information teilen, ohne vorher ihre Quelle sorgfältig zu überprüfen.\n\nZusammenfassend lässt sich sagen, dass die kluge Verbindung von gedrucktem Buch und geprüfter Technik am besten zum Lernerfolg führt.',
					rubricSummary:
						'Dreigliedriger Aufbau (Einleitung-Hauptteil-Schluss) und alle Stichpunkte (2.0 Pkt.) / Konnektoren (Einerseits... andererseits, deshalb) und Infinitivsätze (2.0 Pkt.) / Präziser Wortschatz und Orthographie (2.0 Pkt.)',
					clozeSentence: '___ erleichtern digitale Wörterbücher die Recherche, andererseits fördern gedruckte Bücher die Konzentration.',
					clozeCorrect: 'Einerseits',
					clozeDistractors: ['Deshalb', 'Trotzdem', 'Damit'],
					clozeExplanation:
						'الثنائية المقابلة لإظهار وجهي الموضوع هي: Einerseits ... andererseits (من جهة ... ومن جهة أخرى).'
				},
				{
					themaEinsPrompt:
						'Schreiben Sie einen persönlichen Zukunftsaufsatz (115 bis 140 Wörter) über Ihre Vorhaben für das kommende Schuljahr (3AS / BAC) und darüber, wie Sie sich wissenschaftlich und sprachlich vorbereiten werden.',
					themaEinsStichpunkte: [
						'Einleitung: Übergang von der 2AS in das Abschlussjahr.',
						'Konkrete Lernpläne im Futur I (werden + Infinitiv): Wortschatz erweitern, täglich lesen, Aufsätze nach dem Dreischritt schreiben.',
						'Wie Sie Technik klug einsetzen und Ablenkungen vermeiden (um ... zu / ohne ... zu).',
						'Motivationsschluss über Fleiß, Ehrlichkeit und Ausdauer.'
					],
					themaZweiPrompt:
						'Stellen Sie in einem kurzen Aufsatz (115 bis 140 Wörter) dar, was wir vom wissenschaftlichen Geist eines Gelehrten wie Ibn Al-Haytham für den kritischen Umgang mit Nachrichten im Internet lernen können.',
					modelAnswer:
						'Mit dem Ende des zweiten Schuljahres rückt das wichtige Abschlussjahr immer näher. Deshalb habe ich mir schon heute klare Ziele für meine sprachliche Vorbereitung gesetzt.\n\nIm nächsten Jahr werde ich jeden Tag mindestens zwanzig Minuten auf Deutsch lesen, um meinen Wortschatz sicher zu erweitern. Außerdem werde ich meine Aufsätze immer zuerst in Einleitung, Hauptteil und Schluss gliedern, bevor ich mit dem Schreiben beginne. Digitale Plattformen werde ich nur gezielt nutzen, um Aussprache und Grammatik zu üben, ohne meine wertvolle Lernzeit unnötig zu verlieren.\n\nMeiner Meinung nach führen nicht Zufall oder Eile, sondern nur täglicher Fleiß, Geduld und Vertrauen in eigene Anstrengung zu einem erfolgreichen Abitur.',
					rubricSummary:
						'Schlüssige Zukunftsplanung und Abdeckung der Stichpunkte (2.0 Pkt.) / Sicheres Futur I, Konnektoren und Infinitivsätze (2.0 Pkt.) / Ausdruck, Kohärenz und Rechtschreibung (2.0 Pkt.)',
					clozeSentence: 'Im kommenden Schuljahr ___ ich meine Aufsätze immer mit Einleitung, Hauptteil und Schluss gliedern.',
					clozeCorrect: 'werde',
					clozeDistractors: ['wird', 'wirst', 'wurde'],
					clozeExplanation:
						'مع المتكلم المفرد «ich» في المستقبل البسيط (Futur I) نصرف werden إلى «werde».'
				},
				{
					themaEinsPrompt:
						'Eine Schülerzeitung bittet um Tipps für mehr Sicherheit und Ehrlichkeit bei digitalen Schulrecherchen. Schreiben Sie einen informativen Beitrag (115 bis 140 Wörter).',
					themaEinsStichpunkte: [
						'Bedeutung digitaler Recherchen für Referate und Hausaufgaben.',
						'Drei goldene Regeln: Quellen vergleichen, keine Texte blind kopieren, Datenschutz schützen.',
						'Verwendung mindestens eines Relativsatzes und eines finalen Konnektors (um ... zu oder damit).',
						'Kurze Zusammenfassung für alle Schülerinnen und Schüler.'
					],
					themaZweiPrompt:
						'Warum sollte man beim Schreiben von Aufsätzen zuerst Stichpunkte sammeln und konsequent auf die deutsche Rechtschreibung achten? Schreiben Sie eine methodische Anleitung (115 bis 140 Wörter).',
					modelAnswer:
						'Digitale Suchmaschinen und elektronische Enzyklopädien helfen Schülerinnen und Schülern heute schnell bei Referaten. Dennoch erfordert jede Recherche im Internet klare Regeln für Sicherheit und wissenschaftliche Ehrlichkeit.\n\nErstens sollte man stets seriöse Quellen wählen, die von Fachleuten geprüft wurden, statt den ersten beliebigen Text zu übernehmen. Zweitens darf man niemals fremde Absätze einfach abschreiben, sondern muss eigene Sätze formulieren, um das Thema wirklich zu verstehen. Drittens schützt jeder kluge Nutzer seine persönlichen Daten und Passwörter, damit niemand seine Konten missbrauchen kann.\n\nZusammenfassend gilt: Wer kritisch prüft und ehrlich arbeitet, lernt dauerhaft und bewegt sich sicher in der digitalen Welt.',
					rubricSummary:
						'Inhaltliche Präzision und Erfüllung der Stichpunkte (2.0 Pkt.) / Relativsatz, finaler Konnektor und V2-Stellung (2.0 Pkt.) / Fachwortschatz und Rechtschreibung (2.0 Pkt.)',
					clozeSentence: 'Man sollte immer seriöse Quellen vergleichen, die von Fachleuten geprüft ___.',
					clozeCorrect: 'wurden',
					clozeDistractors: ['werden zu', 'hatten zu', 'bist'],
					clozeExplanation:
						'تأتي الصيغة المصرفة الصحيحة للجمع الغائب في نهاية جملة الوصل المبدوءة بـ die (جمع): «wurden».'
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
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'cloze',
					questionText: 'Ergänzen Sie die Lücke mit dem passenden Konnektor oder Verb:',
					questionTextAr: 'أكمل الفراغ بالرابط المنطقي أو الفعل الصحيح نحوياً:',
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
					instruction: 'Wählen Sie EINES der beiden Themen und schreiben Sie einen gut strukturierten Text (115 bis 140 Wörter) :',
					content: [block]
				},
				hints: [
					'اتبع مخطط التحرير المكون من ثلاث فقرات واضحة: Einleitung - Hauptteil - Schluss.',
					'وظف أدوات التنظيم والمقابلة (Erstens, Außerdem, Einerseits... andererseits, Deshalb, Meiner Meinung nach) مع احترام قاعدة الفعل في الموقع 2.',
					'راجع الفواصل قبل الجمل الجانبية والمصدرية وكتابة جميع الأسماء الألمانية بحرف كبير.'
				],
				solutionStepsAr: [
					'الالتزام بالبنية المنهجية الثلاثية وتغطية كافة الرؤوس (2.0 نقطة).',
					'دقة المستقبل البسيط والروابط والجمل الموصولة والمصدرية (2.0 نقطة).',
					'جودة الأسلوب والإملاء والترقيم الألماني (2.0 نقطة).'
				],
				finalAnswer: v.clozeCorrect
			};
		}
	}
];
