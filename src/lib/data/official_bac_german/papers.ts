import type { ExerciseBlock } from '../../modules/SujetBuilder/types';
import {
	buildGermanClassificationTableBlock,
	buildGermanPassageBlock,
	buildGermanWordFamilyTableBlock,
	buildGermanWrittenProductionBlock
} from '../../modules/GermanTemplates/german-helpers';
import { saveGermanSvgAsset, svgGermanGrammarMap } from '../../modules/GermanTemplates/svg-german';
import { buildIllustratedFigureBlock } from '../../modules/VisualAssets/illustrations-registry';
import { buildOfficialGermanBacPaper, type OfficialGermanBacPaperSpec } from './types';

// ============================================================================
// 1. BAC 2023 — Thema 1 (bac-2023-3as-le-german-t1)
// Bildung, Mehrsprachigkeit und Bibliotheken als Schlüssel zur Zukunft
// ============================================================================

function buildBac2023GermanT1(): OfficialGermanBacPaperSpec {
	const comp: ExerciseBlock = {
		id: 'de_2023_t1_comp',
		customTitle: 'I. Textverständnis',
		points: 7,
		instruction: 'Lesen Sie den folgenden Text aufmerksam und beantworten Sie die Fragen genau.',
		content: [
			buildGermanPassageBlock({
				title: 'Bildung, Mehrsprachigkeit und Bibliotheken als Schlüssel zur Zukunft',
				paragraphs: [
					'In einer stark vernetzten Welt eröffnet das gründliche Erlernen von Fremdsprachen den Lernenden im Zweig Fremdsprachen neue Wege zu Wissenschaft, Übersetzung und internationaler Zusammenarbeit. Dennoch betonen erfahrene Lehrkräfte in algerischen Gymnasien, dass [[diese sprachliche Kompetenz]] nur dann dauerhaft fruchtbar wird, wenn sie auf einer soliden Allgemeinbildung und einer sorgfältigen Beherrschung der Muttersprache aufbaut.',
					'In ruhigen Schulbibliotheken werden gedruckte Fachbücher, zweisprachige Wörterbücher und historische Quellentexte bewusst gepflegt und regelmäßig genutzt. Im Gegensatz zum hastigen Überfliegen kurzer Nachrichten auf Bildschirmen verlangt das aufmerksame Lesen eines Buches Ausdauer, Konzentrationsfähigkeit und präzises Nachdenken. Dabei wird der Wortschatz Schritt für Schritt erweitert und das logische Textverständnis geschärft.',
					'Gleichzeitig leistet die Mehrsprachigkeit einen wertvollen Beitrag zum gegenseitigen Respekt zwischen den Völkern des Mittelmeerraums und Europas. Wer wissenschaftliche Beiträge in verschiedenen Sprachen liest und [[sie]] verantwortungsbewusst in der eigenen Forschung verwendet, erkennt rasch, dass wahre Bildung niemals bloß dem Bestehen einer Prüfung dient. Vielmehr befähigt sie junge Menschen dazu, Verantwortung in Beruf und Gesellschaft zu übernehmen.',
					'Damit dieses Ziel gelingt, arbeiten Schule, Elternhaus und öffentliche Bibliotheken eng zusammen. Zahlreiche Lesewettbewerbe und Schreibwerkstätten werden von engagierten Pädagogen organisiert, um Jugendliche zum eigenen Urteil und zur sorgfältigen Ausdrucksweise zu ermutigen. So bleiben Lesen und Sprachenlernen lebendige Werkzeuge für Fortschritt, Bescheidenheit und geistige Reife.'
				],
				source: 'Studienhefte für Pädagogik und Fremdsprachendidaktik, Ausgabe SujetStore',
				numberedParagraphs: true,
				glossary: [
					{
						term: 'Ausdauer',
						meaning: 'beharrliche Geduld und konsequente Anstrengung beim Lernen'
					},
					{
						term: 'beherrschen',
						meaning: 'eine Sprache oder Fähigkeit sicher und korrekt anwenden können'
					},
					{
						term: 'geistige Reife',
						meaning: 'verantwortungsbewusstes, klares und ruhiges Urteilsvermögen'
					}
				]
			}),
			buildIllustratedFigureBlock('ger_03_bildung_sprachen_bibliothek', {
				lang: 'de',
				mode: 'labeled',
				pins: [],
				width: '62%',
				maxHeight: 128,
				caption: 'Bilddokument : Mehrsprachigkeit, Wörterbücher und konzentriertes Lesen in der Bibliothek.'
			}),
			{
				type: 'text',
				content: '#strong[1.] Wählen Sie die richtige Antwort aus und kreuzen Sie das entsprechende Kästchen an.'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: 'Welche Aussage fasst den Hauptgedanken des Textes zutreffend zusammen ?',
						options: [
							'Sprachenlernen macht gedruckte Bücher und Bibliotheken heute völlig überflüssig.',
							'Aufmerksames Lesen in Bibliotheken und solide Sprachbildung fördern Urteilsvermögen und Verantwortung.',
							'Das Bestehen schulischer Prüfungen ist der einzige Zweck von Mehrsprachigkeit.'
						],
						correct:
							'Aufmerksames Lesen in Bibliotheken und solide Sprachbildung fördern Urteilsvermögen und Verantwortung.',
						mark: '1'
					}
				]
			},
			{
				type: 'text',
				content:
					'#strong[2.] Geben Sie an, ob die folgenden Aussagen Richtig oder Falsch sind, und begründen Sie jede Antwort mithilfe des Textes.'
			},
			{
				type: 'true_false',
				items: [
					{
						q: 'a) Laut Absatz 1 genügt das Erlernen einer Fremdsprache ohne gute Kenntnis der Muttersprache.',
						a: 'Falsch',
						c: 'Diese sprachliche Kompetenz wird nur dann dauerhaft fruchtbar, wenn sie auf einer soliden Allgemeinbildung und einer sorgfältigen Beherrschung der Muttersprache aufbaut (§1).',
						mark: '0.5'
					},
					{
						q: 'b) Das Lesen gedruckter Bücher schult die Konzentration und erweitert den Wortschatz.',
						a: 'Richtig',
						c: 'Das aufmerksame Lesen eines Buches verlangt Ausdauer und Konzentrationsfähigkeit ; dabei wird der Wortschatz erweitert und das Textverständnis geschärft (§2).',
						mark: '0.5'
					},
					{
						q: 'c) Wahre Bildung hat ausschließlich das Bestehen einer einzelnen Prüfung zum Ziel.',
						a: 'Falsch',
						c: 'Wahre Bildung dient niemals bloß dem Bestehen einer Prüfung, sondern befähigt junge Menschen dazu, Verantwortung in Beruf und Gesellschaft zu übernehmen (§3).',
						mark: '0.5'
					},
					{
						q: 'd) Schulen und Bibliotheken organisieren Wettbewerbe, um Jugendliche zum klaren Ausdruck zu motivieren.',
						a: 'Richtig',
						c: 'Zahlreiche Lesewettbewerbe und Schreibwerkstätten werden organisiert, um Jugendliche zum eigenen Urteil und zur sorgfältigen Ausdrucksweise zu ermutigen (§4).',
						mark: '0.5'
					}
				]
			},
			{
				type: 'text',
				content: '#strong[3.] Beantworten Sie die folgenden Verständnisfragen in ganzen Sätzen.'
			},
			{
				type: 'text',
				content:
					'a) Worin unterscheidet sich laut dem zweiten Absatz das Lesen eines Buches vom Lesen auf Bildschirmen ?',
				answer:
					'a) Während kurze Bildschirmnachrichten oft hastig überflogen werden, verlangt das aufmerksame Lesen eines gedruckten Buches Ausdauer, Konzentrationsfähigkeit sowie präzises Nachdenken und erweitert den Wortschatz.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'b) Welche Rolle übernehmen Schule, Elternhaus und öffentliche Bibliotheken im vierten Absatz ?',
				answer:
					'b) Sie arbeiten eng zusammen und organisieren Lesewettbewerbe sowie Schreibwerkstätten, um Jugendliche zum eigenen Urteil, zu sorgfältiger Ausdrucksweise und zu geistiger Reife zu ermutigen.',
				mark: '1'
			},
			{
				type: 'text',
				content: '#strong[4.] Worauf beziehen sich die unterstrichenen Wörter im Text ?'
			},
			{
				type: 'text',
				content: 'a) „diese sprachliche Kompetenz“ (§1) bezieht sich auf : ............................',
				answer: 'a) Bezieht sich auf das gründliche Erlernen von Fremdsprachen.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) „sie“ (§3) bezieht sich auf : ............................',
				answer: 'b) Bezieht sich auf wissenschaftliche Beiträge in verschiedenen Sprachen.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[5.] Vervollständigen Sie die folgende Übersichtstabelle mit Informationen aus dem Text.'
			},
			{
				type: 'table',
				headers: ['Lernbereich', 'Wirkung laut Text'],
				cells: [],
				rows: [
					[
						{ content: 'Gedruckte Fachbücher und Wörterbücher', bold: true },
						{
							content: '....................',
							answer: 'Schulen Ausdauer sowie Konzentration, erweitern den Wortschatz und schärfen das Textverständnis.',
							mark: '0.5'
						}
					],
					[
						{ content: 'Mehrsprachigkeit und Schreibwerkstätten', bold: true },
						{
							content: '....................',
							answer: 'Fördern gegenseitigen Respekt, eigenes Urteilsvermögen und verantwortungsbewussten Ausdruck.',
							mark: '0.5'
						}
					]
				],
				align: 'center',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			}
		]
	};

	const ling: ExerciseBlock = {
		id: 'de_2023_t1_ling',
		customTitle: 'II. Sprachfähigkeit',
		points: 7,
		instruction: 'Bearbeiten Sie die Aufgaben zu Wortschatz, Wortbildung und Grammatik sorgfältig.',
		content: [
			{
				type: 'text',
				content: '#strong[A. Wortschatz und Wortbildung (3 Punkte)]'
			},
			{
				type: 'text',
				content: '#strong[1.] Suchen Sie im Text :'
			},
			{
				type: 'text',
				content: 'a) das Synonym zu „eilig / flüchtig“ (§2) : ............................',
				answer: 'a) hastig (hastigen)',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) das Antonym zu „oberflächlich / nachlässig“ (§1) : ............................',
				answer: 'b) gründlich (gründliche) / sorgfältig (sorgfältigen)',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[2.] Ergänzen Sie die Wortbildungstabelle sinngemäß.'
			},
			buildGermanWordFamilyTableBlock([
				{
					verb: { given: true, value: 'übersetzen' },
					nomen: { value: 'die Übersetzung', mark: '0.25' },
					adjektiv: { value: 'übersetzbar / übersetzt', mark: '0.25' }
				},
				{
					verb: { value: 'lesen', mark: '0.25' },
					nomen: { given: true, value: 'die Lektüre / das Lesen' },
					adjektiv: { value: 'lesbar / lesenswert', mark: '0.25' }
				}
			]),
			{
				type: 'text',
				content:
					'#strong[3.] Ordnen Sie folgende Begriffe den passenden Spalten zu : #emph[zweisprachige Wörterbücher ; Ausdauer ; Fachbücher ; Bescheidenheit ; Schreibwerkstätten ; Verantwortungsbewusstsein].'
			},
			buildGermanClassificationTableBlock({
				columns: [
					{
						header: 'Hilfsmittel und Orte des Lernens',
						items: ['zweisprachige Wörterbücher', 'Fachbücher', 'Schreibwerkstätten'],
						mark: '0.5'
					},
					{
						header: 'Charakterliche und geistige Tugenden',
						items: ['Ausdauer', 'Bescheidenheit', 'Verantwortungsbewusstsein'],
						mark: '0.5'
					}
				]
			}),
			{
				type: 'text',
				content: '#strong[B. Grammatik und Satzbau (4 Punkte)]'
			},
			{
				type: 'text',
				content: '#strong[4.] Setzen Sie die Sätze ins Vorgangspassiv (Präsens oder Präteritum) :'
			},
			{
				type: 'text',
				content: 'a) Die Schülerinnen und Schüler nutzen die Schulbibliothek täglich.',
				answer: 'a) Die Schulbibliothek wird (von den Schülerinnen und Schülern) täglich genutzt.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) Engagierte Lehrkräfte organisierten im Mai eine Schreibwerkstatt.',
				answer: 'b) Eine Schreibwerkstatt wurde im Mai (von engagierten Lehrkräften) organisiert.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[5.] Verbinden Sie die Satzpaare zu Finalsätzen mit „um ... zu“ oder „damit“ :'
			},
			{
				type: 'text',
				content:
					'a) Amira schlägt unbekannte Begriffe im Wörterbuch nach. Sie möchte ihren Ausdruck verbessern. (um ... zu)',
				answer:
					'a) Amira schlägt unbekannte Begriffe im Wörterbuch nach, um ihren Ausdruck zu verbessern.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Das Gymnasium richtet ruhige Lesesäle ein. Alle Jugendlichen können dort konzentriert lernen. (damit)',
				answer:
					'b) Das Gymnasium richtet ruhige Lesesäle ein, damit alle Jugendlichen dort konzentriert lernen können.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[6.] Ergänzen Sie die passenden Konnektoren : #emph[während / deshalb].'
			},
			{
				type: 'text',
				content:
					'a) ............ digitale Kurznachrichten rasch überflogen werden, erfordert ein Fachbuch ruhige Geduld.',
				answer: 'a) Während',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Eine gute Bibliothek stärkt das Nachdenken ; ............, besuchen viele Lernende sie mehrmals pro Woche.',
				answer: 'b) deshalb',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[7.] Formen Sie den „damit“-Satz in eine Infinitivkonstruktion mit „um ... zu“ um :\n„Der Abiturient wiederholt die Grammatikregeln systematisch, damit er im Aufsatz sicher formuliert.“',
				answer:
					'Der Abiturient wiederholt die Grammatikregeln systematisch, um im Aufsatz sicher zu formulieren.',
				mark: '1'
			}
		]
	};

	const expr: ExerciseBlock = {
		id: 'de_2023_t1_expr',
		customTitle: 'III. Schriftlicher Ausdruck',
		points: 6,
		instruction: 'Wählen Sie EINES der beiden Themen und verfassen Sie einen zusammenhängenden Text (ca. 130–145 Wörter).',
		content: [
			buildGermanWrittenProductionBlock({
				themaEinsTitle: 'Thema 1 (Gelenkt) :',
				themaEinsPrompt:
					'Anlässlich der Kulturwoche Ihres Gymnasiums schreiben Sie einen Artikel für die Schülerzeitung, in dem Sie erklären, warum das Lesen gedruckter Bücher in der Bibliothek und das Erlernen von Fremdsprachen für die akademische Bildung unverzichtbar sind.',
				themaEinsStichpunkte: [
					'Vergleichen Sie das aufmerksame Lesen eines Buches mit der schnellen Bildschirmlektüre.',
					'Nennen Sie zwei konkrete Vorteile der Mehrsprachigkeit (Wissenschaft, Übersetzung, Respekt).',
					'Verwenden Sie mindestens einen Finalsatz (um ... zu / damit) und einen Passivsatz.'
				],
				themaZweiPrompt:
					'„Wer seine Muttersprache pflegt und Fremdsprachen gründlich erlernt, erweitert seinen geistigen Horizont, ohne seine eigenen Wurzeln zu verlieren.“ Nehmen Sie in einem argumentativen Aufsatz mit klaren Beispielen Stellung zu dieser Aussage.',
				rubricSummary:
					'Themenbezug und Umsetzung der Leitpunkte (2 Pkt.) ; logischer Aufbau und Kohärenz (1.5 Pkt.) ; grammatische Korrektheit, Passiv, Finalsätze und Wortschatz (1.5 Pkt.) ; Rechtschreibung und Zeichensetzung (1 Pkt.).',
				modelAnswer:
					'In unserer digital geprägten Schulzeit bleiben die Schulbibliothek und das gezielte Erlernen von Fremdsprachen zentrale Säulen einer gründlichen Bildung. Während kurze Texte auf Bildschirmen häufig nur hastig überflogen werden, schult ein gedrucktes Buch die Ausdauer und die Konzentrationsfähigkeit der Lernenden.\n\nWer regelmäßig Fachbücher und zweisprachige Wörterbücher in der Bibliothek nutzt, erweitert seinen Wortschatz und gewinnt ein klares Urteilsvermögen. Gleichzeitig eröffnet die Beherrschung mehrerer Sprachen den direkten Zugang zu internationalen Forschungsergebnissen und Übersetzungsprojekten. In vielen algerischen Gymnasien werden deshalb ruhige Lesewettbewerbe veranstaltet, um Jugendliche zu präziser Ausdrucksweise zu ermutigen. Jeder Schüler sollte täglich eine halbe Stunde lesen, damit sein Denken geordnet und reif bleibt.\n\nZusammenfassend lässt sich sagen, dass Geduld beim Lesen und solide Sprachkenntnisse junge Menschen auf ein verantwortungsbewusstes Berufsleben sowie auf den respektvollen Dienst an der Gemeinschaft vorbereiten.',
				mark: '6'
			})
		]
	};

	return buildOfficialGermanBacPaper({
		slug: 'bac-2023-3as-le-german-t1',
		academicYear: '2023',
		topicNumber: 1,
		themenbereichDe: 'Bildung und Mehrsprachigkeit',
		titleTopicDe: 'Bildung, Mehrsprachigkeit und Bibliotheken als Schlüssel zur Zukunft',
		titleTopicAr: 'التعليم والتعدد اللغوي والمكتبات كمفتاح للمستقبل',
		themesDe: [
			'Bildung und Jugend',
			'Mehrsprachigkeit',
			'Schulbibliotheken',
			'Vorgangspassiv, Wortbildung und Finalsätze'
		],
		themesAr: [
			'التعليم والشباب',
			'التعدد اللغوي',
			'المكتبات المدرسية',
			'المبني للمجهول واشتقاق الكلمات وجمل الغاية'
		],
		exercises: [comp, ling, expr]
	});
}

// ============================================================================
// 2. BAC 2023 — Thema 2 (bac-2023-3as-le-german-t2)
// Künstliche Intelligenz, Wissenschaft und ethische Verantwortung + SVG
// ============================================================================

function buildBac2023GermanT2(): OfficialGermanBacPaperSpec {
	const svgKonjunktivUrl = saveGermanSvgAsset(
		'bac-2023-ger-t2-konjunktiv-technik',
		svgGermanGrammarMap({
			title: 'Konjunktiv II und Relativsätze im Technik-Kontext',
			rootLabel: 'Hypothese, Ethik und genaue Definition',
			rootSub: 'Bedingungen und präzise Bezüge formulieren',
			branches: [
				{
					label: 'Konjunktiv II',
					rule: 'wäre / hätte / würde + Inf.',
					example: 'Man würde Daten prüfen.',
					color: '#b45309'
				},
				{
					label: 'Modalverben (K. II)',
					rule: 'könnte / müsste / sollte',
					example: 'Technik müsste nützen.',
					color: '#047857'
				},
				{
					label: 'Relativsätze',
					rule: 'der / die / das / denen',
					example: 'ein System, das hilft',
					color: '#1d4ed8'
				}
			],
			width: 560,
			height: 245
		})
	);

	const comp: ExerciseBlock = {
		id: 'de_2023_t2_comp',
		customTitle: 'I. Textverständnis',
		points: 7,
		instruction: 'Lesen Sie den Sachtext aufmerksam durch und lösen Sie die folgenden Aufgaben.',
		content: [
			buildGermanPassageBlock({
				title: 'Künstliche Intelligenz zwischen wissenschaftlichem Nutzen und ethischer Verantwortung',
				paragraphs: [
					'Moderne Labore, digitale Simulationen und Systeme der Künstlichen Intelligenz haben die naturwissenschaftliche Forschung sowie die medizinische Diagnostik in den letzten Jahren spürbar verändert. Mithilfe leistungsfähiger Algorithmen können große Datenmengen innerhalb weniger Sekunden ausgewertet und komplexe Modelle überprüft werden. Dadurch gewinnen Forscherinnen und Forscher wertvolle Zeit für Experimente, die früher Jahre gedauert hätten.',
					'Dennoch warnen erfahrene Ingenieure und Pädagogen davor, [[diese Werkzeuge]] unkritisch anzuwenden. Wer sich beim Lernen oder im Labor blind auf automatische Programme verlässt, verliert allmählich die Fähigkeit zur selbstständigen Kontrolle. Zudem bergen ungeschützte Netzwerke Risiken für den Datenschutz, wenn vertrauliche Forschungsdaten oder persönliche Angaben ohne ausreichende Sicherheitsvorkehrungen gespeichert werden.',
					'Aus diesem Grund erfordert der wissenschaftliche Fortschritt klare ethische Regeln. Jedes technische Verfahren sollte der Wahrheit, der Transparenz und dem Wohl der Menschen dienen. Eine Künstliche Intelligenz, deren Ergebnisse sich nicht nachvollziehen lassen, darf in sensiblen Bereichen wie dem Gesundheitswesen oder der Rechtsprechung nicht ohne menschliche Prüfung entscheiden.',
					'Verantwortungsvolle Innovation entsteht also erst dort, wo technisches Fachwissen auf sittliche Reife trifft. Wenn Universitäten und Schulen junge Talente sowohl in Informatik als auch in wissenschaftlicher Redlichkeit ausbilden, bleibt der Mensch stets der souveräne Gestalter [[seiner Technik]] und verliert niemals die Achtung vor moralischen Maßstäben.'
				],
				source: 'Jahrbuch für Wissenschaftsethik und digitale Bildung, Ausgabe SujetStore',
				numberedParagraphs: true,
				glossary: [
					{
						term: 'Datenschutz',
						meaning: 'Schutz persönlicher und vertraulicher Daten vor Missbrauch'
					},
					{
						term: 'Transparenz',
						meaning: 'Nachvollziehbarkeit und Offenheit eines Verfahrens oder Ergebnisses'
					},
					{
						term: 'Redlichkeit',
						meaning: 'Ehrlichkeit, Sorgfalt und moralische Zuverlässigkeit in der Wissenschaft'
					}
				]
			}),
			buildIllustratedFigureBlock('ger_05_wissenschaft_technologie_innovation', {
				lang: 'de',
				mode: 'labeled',
				pins: [],
				width: '62%',
				maxHeight: 128,
				caption: 'Bilddokument : Wissenschaftliche Forschung, Mikroelektronik und verantwortungsvolle Innovation.'
			}),
			{
				type: 'text',
				content: '#strong[1.] Kreuzen Sie die Aussage an, welche die Kernaussage des Textes wiedergibt.'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: 'Der Verfasser des Textes betont vor allem, dass :',
						options: [
							'Künstliche Intelligenz die menschliche Prüfung in allen Lebensbereichen ersetzen muss.',
							'wissenschaftliche Innovation nur im Einklang mit ethischer Verantwortung, Datenschutz und menschlicher Kontrolle sinnvoll ist.',
							'moderne Labore vollständig auf digitale Simulationen verzichten sollten.'
						],
						correct:
							'wissenschaftliche Innovation nur im Einklang mit ethischer Verantwortung, Datenschutz und menschlicher Kontrolle sinnvoll ist.',
						mark: '1'
					}
				]
			},
			{
				type: 'text',
				content:
					'#strong[2.] Entscheiden Sie, ob die Aussagen Richtig oder Falsch sind, und belegen Sie jede Antwort mit Textstellen.'
			},
			{
				type: 'true_false',
				items: [
					{
						q: 'a) Algorithmen beschleunigen die Auswertung großer Datenmengen in Forschung und Medizin.',
						a: 'Richtig',
						c: 'Mithilfe leistungsfähiger Algorithmen können große Datenmengen in wenigen Sekunden ausgewertet und Modelle überprüft werden (§1).',
						mark: '0.5'
					},
					{
						q: 'b) Blindes Vertrauen in automatische Programme stärkt das selbstständige Denken der Lernenden.',
						a: 'Falsch',
						c: 'Wer sich blind auf automatische Programme verlässt, verliert allmählich die Fähigkeit zur selbstständigen Kontrolle (§2).',
						mark: '0.5'
					},
					{
						q: 'c) Nicht nachvollziehbare KI-Ergebnisse dürfen in der Medizin allein über den Menschen entscheiden.',
						a: 'Falsch',
						c: 'Eine KI, deren Ergebnisse sich nicht nachvollziehen lassen, darf in sensiblen Bereichen wie dem Gesundheitswesen nicht ohne menschliche Prüfung entscheiden (§3).',
						mark: '0.5'
					},
					{
						q: 'd) Gute Hochschulbildung verbindet technisches Wissen mit wissenschaftlicher Ehrlichkeit.',
						a: 'Richtig',
						c: 'Wenn Universitäten und Schulen junge Talente sowohl in Informatik als auch in wissenschaftlicher Redlichkeit ausbilden, bleibt der Mensch souveräner Gestalter (§4).',
						mark: '0.5'
					}
				]
			},
			{
				type: 'text',
				content: '#strong[3.] Antworten Sie in vollständigen Sätzen auf die folgenden Fragen.'
			},
			{
				type: 'text',
				content:
					'a) Welche zwei Gefahren einer unkritischen Nutzung digitaler Systeme nennt der zweite Absatz ?',
				answer:
					'a) Zum einen droht der allmähliche Verlust der Fähigkeit zur selbstständigen Kontrolle, zum anderen entstehen Risiken für den Datenschutz in ungeschützten Netzwerken.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'b) Welche moralischen Grundsätze muss technischer Fortschritt nach dem dritten Absatz einhalten ?',
				answer:
					'b) Jedes technische Verfahren muss der Wahrheit, der Transparenz sowie dem Wohl der Menschen dienen und in sensiblen Bereichen durch Menschen geprüft werden.',
				mark: '1'
			},
			{
				type: 'text',
				content: '#strong[4.] Worauf verweisen die unterstrichenen Ausdrücke im Text ?'
			},
			{
				type: 'text',
				content: 'a) „diese Werkzeuge“ (§2) verweist auf : ............................',
				answer:
					'a) Verweist auf moderne Labore, digitale Simulationen, Systeme der Künstlichen Intelligenz und Algorithmen.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) „seiner Technik“ (§4) verweist auf : ............................',
				answer: 'b) Verweist auf die Technik des Menschen (der souveräne Gestalter seiner Technik).',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[5.] Ergänzen Sie das folgende Schema mit Angaben aus dem Text.'
			},
			{
				type: 'table',
				headers: ['Bereich', 'Chancen oder notwendige Regeln'],
				cells: [],
				rows: [
					[
						{ content: 'Wissenschaftliche Forschung', bold: true },
						{
							content: '....................',
							answer: 'Schnelle Auswertung großer Datenmengen und Zeitgewinn für Experimente.',
							mark: '0.5'
						}
					],
					[
						{ content: 'Ethische Sicherheit', bold: true },
						{
							content: '....................',
							answer: 'Datenschutz gewährleisten, Transparenz wahren und menschliche Prüfung sichern.',
							mark: '0.5'
						}
					]
				],
				align: 'center',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			}
		]
	};

	const ling: ExerciseBlock = {
		id: 'de_2023_t2_ling',
		customTitle: 'II. Sprachfähigkeit',
		points: 7,
		instruction: 'Beachten Sie die Übersichtskarte und lösen Sie die Aufgaben zu Wortschatz und Grammatik.',
		content: [
			{
				type: 'text',
				content: '#strong[A. Wortschatz und Wortbildung (3 Punkte)]'
			},
			{
				type: 'text',
				content: '#strong[1.] Finden Sie im Text :'
			},
			{
				type: 'text',
				content: 'a) das Antonym zu „öffentlich / allgemein zugänglich“ (§2) : ............................',
				answer: 'a) vertraulich (vertrauliche) / persönlich (persönliche)',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) das Synonym zu „sicherstellen / bewerten / kontrollieren“ (§1) : ............................',
				answer: 'b) überprüfen (überprüft)',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[2.] Vervollständigen Sie die Wortfamilien-Tabelle.'
			},
			buildGermanWordFamilyTableBlock([
				{
					verb: { given: true, value: 'forschen' },
					nomen: { value: 'die Forschung', mark: '0.25' },
					adjektiv: { value: 'forschungsnah / erforschbar', mark: '0.25' }
				},
				{
					verb: { value: 'verantworten', mark: '0.25' },
					nomen: { given: true, value: 'die Verantwortung' },
					adjektiv: { value: 'verantwortlich / verantwortungsvoll', mark: '0.25' }
				}
			]),
			{
				type: 'text',
				content:
					'#strong[3.] Ordnen Sie folgende Ausdrücke richtig ein : #emph[schnelle Datenauswertung ; unkritische Nutzung ; Datenschutzlücken ; medizinische Diagnostik ; fehlende Transparenz ; digitale Simulationen].'
			},
			buildGermanClassificationTableBlock({
				columns: [
					{
						header: 'Wissenschaftliche Chancen',
						items: ['schnelle Datenauswertung', 'medizinische Diagnostik', 'digitale Simulationen'],
						mark: '0.5'
					},
					{
						header: 'Ethische und technische Risiken',
						items: ['unkritische Nutzung', 'Datenschutzlücken', 'fehlende Transparenz'],
						mark: '0.5'
					}
				]
			}),
			{
				type: 'text',
				content: '#strong[B. Grammatik und Satzbau (4 Punkte)]'
			},
			{
				type: 'image',
				src: svgKonjunktivUrl,
				width: 'full',
				caption: 'Abbildung : Grammatische Strukturen für Konjunktiv II und Relativsätze im Technik-Kontext.'
			},
			{
				type: 'text',
				content: '#strong[4.] Bilden Sie irreale Bedingungssätze im Konjunktiv II der Gegenwart :'
			},
			{
				type: 'text',
				content:
					'a) Wenn die Studierenden jedes Ergebnis selbst prüften, #strong[(haben)] sie weniger Fehler in ihren Berichten.',
				answer:
					'a) Wenn die Studierenden jedes Ergebnis selbst prüften, hätten sie weniger Fehler in ihren Berichten.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Wenn ein System ohne klare Regeln arbeitete, #strong[(sein)] der Schutz vertraulicher Daten gefährdet.',
				answer:
					'b) Wenn ein System ohne klare Regeln arbeitete, wäre der Schutz vertraulicher Daten gefährdet.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[5.] Verbinden Sie die Sätze jeweils mithilfe eines passenden Relativsatzes :'
			},
			{
				type: 'text',
				content:
					'a) Das Programm wertet Labordaten aus. Es hilft den Forschenden bei der Analyse.',
				answer: 'a) Das Programm, das Labordaten auswertet, hilft den Forschenden bei der Analyse.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Die Ingenieure entwickeln sichere Netze. Wir verdanken ihnen verlässlichen Datenschutz.',
				answer:
					'b) Die Ingenieure, denen wir verlässlichen Datenschutz verdanken, entwickeln sichere Netze.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[6.] Formulieren Sie die Empfehlung mithilfe des Konjunktivs II von „müssen“ höflich und eindringlich um :\n„Man überprüft jede automatische Übersetzung vor der Veröffentlichung.“',
				answer: 'Man müsste jede automatische Übersetzung vor der Veröffentlichung überprüfen.',
				mark: '1'
			},
			{
				type: 'text',
				content: '#strong[7.] Ergänzen Sie das korrekte Relativpronomen (mit Präposition oder im Genitiv) :'
			},
			{
				type: 'text',
				content:
					'a) Eine Künstliche Intelligenz, ............ Ergebnisse niemand erklären kann, bleibt unzuverlässig.',
				answer: 'a) deren',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Die ethischen Maßstäbe, auf ............ ein Forschungsteam aufbaut, sichern wissenschaftliche Redlichkeit.',
				answer: 'b) denen',
				mark: '0.5'
			}
		]
	};

	const expr: ExerciseBlock = {
		id: 'de_2023_t2_expr',
		customTitle: 'III. Schriftlicher Ausdruck',
		points: 6,
		instruction: 'Wählen Sie EINES der beiden Themen und verfassen Sie einen strukturierten Text (ca. 130–145 Wörter).',
		content: [
			buildGermanWrittenProductionBlock({
				themaEinsTitle: 'Thema 1 (Gelenkt) :',
				themaEinsPrompt:
					'Für den Wissenschaftstag Ihres Gymnasiums verfassen Sie einen kurzen Diskussionsbeitrag über Chancen und Grenzen der Künstlichen Intelligenz beim schulischen Lernen und in der Forschung.',
				themaEinsStichpunkte: [
					'Nennen Sie zwei Vorteile moderner digitaler Werkzeuge für Unterricht und Forschung.',
					'Warnen Sie vor Risiken wie Denkfaulheit oder fehlendem Datenschutz.',
					'Setzen Sie mindestens einen Satz im Konjunktiv II und einen Relativsatz ein.'
				],
				themaZweiPrompt:
					'„Technik ist ein hervorragender Diener, aber ein schlechter Herr.“ Erläutern Sie diese Aussage mit Blick auf die digitale Welt und die Bedeutung ethischer Werte.',
				rubricSummary:
					'Erfüllung der Aufgabenstellung und Argumentationskraft (2 Pkt.) ; Textgliederung und Konnektoren (1.5 Pkt.) ; Beherrschung von Konjunktiv II, Relativsätzen und Fachwortschatz (1.5 Pkt.) ; Rechtschreibung und Stil (1 Pkt.).',
				modelAnswer:
					'Systeme der Künstlichen Intelligenz verändern derzeit unsere Lerngewohnheiten, die medizinische Diagnostik und die wissenschaftliche Forschung in großem Tempo. Einerseits erleichtern digitale Werkzeuge, die riesige Datenmengen blitzschnell ordnen, die Auswertung komplexer Experimente sowie das genaue Verständnis fremdsprachiger Fachartikel im täglichen Schulalltag.\n\nAndererseits darf bequeme Technik niemals die eigene Denkarbeit ersetzen. Wenn Schülerinnen und Schüler jede Aufgabe automatisch lösen ließen, würden sie rasch ihre Urteilsfähigkeit und wissenschaftliche Selbstständigkeit einbüßen. Darüber hinaus müsste jedes Schulnetzwerk vertrauliche Angaben konsequent schützen, damit im digitalen Raum kein Missbrauch persönlicher Daten entsteht. Eine Software, deren Herkunft oder Begründung unklar bleibt, sollte daher stets kritisch von erfahrenen Lehrkräften und Lernenden geprüft werden.\n\nAbschließend gilt, dass digitale Innovation nur dann wahren gesellschaftlichen Fortschritt bringt, wenn sittliche Verantwortung, wissenschaftliche Redlichkeit und menschliches Augenmaß bei jeder Anwendung immer an erster Stelle stehen.',
				mark: '6'
			})
		]
	};

	return buildOfficialGermanBacPaper({
		slug: 'bac-2023-3as-le-german-t2',
		academicYear: '2023',
		topicNumber: 2,
		themenbereichDe: 'Wissenschaft, Künstliche Intelligenz und Technikethik',
		titleTopicDe: 'Künstliche Intelligenz, Wissenschaft und ethische Verantwortung',
		titleTopicAr: 'الذكاء الاصطناعي والعلوم والمسؤولية الأخلاقية',
		themesDe: [
			'Wissenschaft und Technologie',
			'Künstliche Intelligenz',
			'Datenschutz und Ethik',
			'Konjunktiv II und Relativsätze'
		],
		themesAr: [
			'العلوم والتكنولوجيا',
			'الذكاء الاصطناعي',
			'الأمن الرقمي والأخلاقيات',
			'صيغة الشرط الافتراضي (Konjunktiv II) وجمل الوصل'
		],
		exercises: [comp, ling, expr]
	});
}

// ============================================================================
// 3. BAC 2024 — Thema 1 (bac-2024-3as-le-german-t1)
// Erneuerbare Energien und nachhaltiger Umweltschutz
// ============================================================================

function buildBac2024GermanT1(): OfficialGermanBacPaperSpec {
	const comp: ExerciseBlock = {
		id: 'de_2024_t1_comp',
		customTitle: 'I. Textverständnis',
		points: 7,
		instruction: 'Lesen Sie den Text zum Umweltschutz gründlich und beantworten Sie alle Fragen.',
		content: [
			buildGermanPassageBlock({
				title: 'Sonnenkraft, Windenergie und Wasserschutz : Wege zu einer nachhaltigen Zukunft',
				paragraphs: [
					'Längere Hitzeperioden, sinkende Grundwasserspiegel und zunehmende Luftverschmutzung stellen die Länder rund um das Mittelmeer heute vor drängende ökologische Aufgaben. Obwohl viele Bürgerinnen und Bürger die Folgen des Klimawandels täglich spüren, werden im Alltag immer noch zu viele Ressourcen verschwendet. Eine nachhaltige Wende verlangt deshalb sowohl kluge Technik als auch ein Umdenken im eigenen Verhalten.',
					'Im Energiebereich bieten vor allem Photovoltaikanlagen und Windkraftwerke verlässliche Alternativen zu fossilen Brennstoffen. Gerade in sonnenreichen Regionen Algeriens steht kostenlose Sonnenenergie das ganze Jahr über zur Verfügung. Da [[diese saubere Energie]] bei der Stromerzeugung kaum schädliche Abgase freisetzt, bleiben Luft und Böden deutlich gesünder, während abgelegene Ortschaften sicher versorgt werden.',
					'Ebenso unverzichtbar sind der sorgsame Umgang mit Trinkwasser und gezielte Programme zur Aufforstung. In vielen Gemeinden sind inzwischen moderne Tropfbewässerungssysteme installiert, sodass auf den Feldern kein kostbares Wasser verdunstet. Gleichzeitig pflanzen Freiwillige widerstandsfähige Oliven- und Pinienbäume, um das Vordringen der Wüste aufzuhalten und den Boden vor Erosion zu schützen.',
					'Technische Lösungen allein reichen jedoch nicht aus, wenn der Müll nicht getrennt und Energie im Haushalt gedankenlos verbraucht wird. Wo Jugendliche an Schulen für Recycling, Baumpflanzungen und sparsamen Wasserverbrauch begeistert werden, entstehen [[nachhaltige Gewohnheiten]]. So wird Umweltschutz zu einer praktischen Form der Dankbarkeit gegenüber der Schöpfung und der Verantwortung für kommende Generationen.'
				],
				source: 'Mittelmeer-Forum für Ökologie und Nachhaltige Energie, Ausgabe SujetStore',
				numberedParagraphs: true,
				glossary: [
					{
						term: 'Photovoltaikanlage',
						meaning: 'technische Anlage, die Sonnenlicht direkt in elektrischen Strom umwandelt'
					},
					{
						term: 'Aufforstung',
						meaning: 'planmäßige Wiederbepflanzung von Flächen mit Bäumen zum Schutz des Bodens'
					},
					{
						term: 'Erosion',
						meaning: 'Abtragung fruchtbarer Erde durch Wind oder Wasser'
					}
				]
			}),
			buildIllustratedFigureBlock('ger_04_umweltschutz_erneuerbare_energien', {
				lang: 'de',
				mode: 'labeled',
				pins: [],
				width: '62%',
				maxHeight: 128,
				caption: 'Bilddokument : Solarenergie, Windkraft, Mülltrennung und Aufforstung für den Umweltschutz.'
			}),
			{
				type: 'text',
				content: '#strong[1.] Wählen Sie die passende Antwort zur Hauptaussage des Textes aus.'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: 'Der Text vermittelt als zentrale Botschaft, dass :',
						options: [
							'erneuerbare Energien wie Sonne und Wind in Nordafrika ungeeignet sind.',
							'wirksamer Umweltschutz saubere Energien, Wasserschutz, Aufforstung und bewusstes Bürgerhandeln verbindet.',
							'Aufforstung und Mülltrennung keinen Einfluss auf den Boden haben.'
						],
						correct:
							'wirksamer Umweltschutz saubere Energien, Wasserschutz, Aufforstung und bewusstes Bürgerhandeln verbindet.',
						mark: '1'
					}
				]
			},
			{
				type: 'text',
				content:
					'#strong[2.] Geben Sie an, ob die Aussagen Richtig oder Falsch sind, und begründen Sie anhand des Textes.'
			},
			{
				type: 'true_false',
				items: [
					{
						q: 'a) Alle Menschen gehen im Alltag bereits vollkommen sparsam mit natürlichen Ressourcen um.',
						a: 'Falsch',
						c: 'Obwohl viele die Folgen des Klimawandels spüren, werden im Alltag immer noch zu viele Ressourcen verschwendet (§1).',
						mark: '0.5'
					},
					{
						q: 'b) Photovoltaikanlagen liefern Strom und belasten die Luft dabei kaum mit schädlichen Abgasen.',
						a: 'Richtig',
						c: 'Da diese saubere Energie bei der Stromerzeugung kaum schädliche Abgase freisetzt, bleiben Luft und Böden deutlich gesünder (§2).',
						mark: '0.5'
					},
					{
						q: 'c) Tropfbewässerungssysteme verhindern, dass auf landwirtschaftlichen Feldern unnötig viel Wasser verdunstet.',
						a: 'Richtig',
						c: 'In vielen Gemeinden sind moderne Tropfbewässerungssysteme installiert, sodass auf den Feldern kein kostbares Wasser verdunstet (§3).',
						mark: '0.5'
					},
					{
						q: 'd) Technische Anlagen lösen alle Umweltprobleme auch ohne persönliches Mitwirken der Bürger.',
						a: 'Falsch',
						c: 'Technische Lösungen allein reichen nicht aus, wenn der Müll nicht getrennt und Energie im Haushalt gedankenlos verbraucht wird (§4).',
						mark: '0.5'
					}
				]
			},
			{
				type: 'text',
				content: '#strong[3.] Beantworten Sie die Fragen in vollständigen Sätzen.'
			},
			{
				type: 'text',
				content:
					'a) Warum eignet sich gerade Sonnenenergie besonders gut für abgelegene Regionen in Algerien (§2) ?',
				answer:
					'a) Weil in sonnenreichen Regionen Algeriens das ganze Jahr über Sonnenenergie zur Verfügung steht, die Luft und Böden schont und auch abgelegene Orte zuverlässig mit Strom versorgt.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'b) Welche zwei Maßnahmen gegen Wasserverlust und Wüstenausbreitung beschreibt der dritte Absatz ?',
				answer:
					'b) Der dritte Absatz nennt den Einsatz moderner Tropfbewässerungssysteme auf Feldern sowie die gezielte Aufforstung mit widerstandsfähigen Oliven- und Pinienbäumen.',
				mark: '1'
			},
			{
				type: 'text',
				content: '#strong[4.] Worauf beziehen sich die unterstrichenen Ausdrücke im Text ?'
			},
			{
				type: 'text',
				content: 'a) „diese saubere Energie“ (§2) bezieht sich auf : ............................',
				answer: 'a) Bezieht sich auf die Sonnenenergie (und Windkraft / erneuerbare Energien).',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) „nachhaltige Gewohnheiten“ (§4) bezieht sich auf : ............................',
				answer: 'b) Bezieht sich auf Recycling, Baumpflanzungen und sparsamen Wasserverbrauch.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[5.] Ergänzen Sie die Übersichtstabelle mithilfe von Informationen aus dem Text.'
			},
			{
				type: 'table',
				headers: ['Ökologisches Problem', 'Gegenmaßnahme im Text'],
				cells: [],
				rows: [
					[
						{ content: 'Schädliche Abgase fossiler Brennstoffe', bold: true },
						{
							content: '....................',
							answer: 'Ausbau von Photovoltaikanlagen und Windkraftwerken.',
							mark: '0.5'
						}
					],
					[
						{ content: 'Wasserverlust und Bodenerosion', bold: true },
						{
							content: '....................',
							answer: 'Tropfbewässerungssysteme installieren und widerstandsfähige Bäume aufforsten.',
							mark: '0.5'
						}
					]
				],
				align: 'center',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			}
		]
	};

	const ling: ExerciseBlock = {
		id: 'de_2024_t1_ling',
		customTitle: 'II. Sprachfähigkeit',
		points: 7,
		instruction: 'Lösen Sie die Übungen zu Wortfeldern, Konzessivsätzen und Zustandspassiv präzise.',
		content: [
			{
				type: 'text',
				content: '#strong[A. Wortschatz und Wortbildung (3 Punkte)]'
			},
			{
				type: 'text',
				content: '#strong[1.] Suchen Sie im Text :'
			},
			{
				type: 'text',
				content: 'a) ein Synonym für „dringend / eilig“ (§1) : ............................',
				answer: 'a) drängend (drängende)',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) ein Antonym für „wertlos / billig“ (§3) : ............................',
				answer: 'b) kostbar (kostbares)',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[2.] Ergänzen Sie die Wortbildungstabelle.'
			},
			buildGermanWordFamilyTableBlock([
				{
					verb: { given: true, value: 'schützen' },
					nomen: { value: 'der Schutz', mark: '0.25' },
					adjektiv: { value: 'geschützt / schützend', mark: '0.25' }
				},
				{
					verb: { value: 'erneuern', mark: '0.25' },
					nomen: { given: true, value: 'die Erneuerung' },
					adjektiv: { value: 'erneuerbar / erneuert', mark: '0.25' }
				}
			]),
			{
				type: 'text',
				content:
					'#strong[3.] Ordnen Sie die Begriffe zwei Wortfeldern zu : #emph[Photovoltaik ; Luftverschmutzung ; Aufforstung ; Bodenerosion ; Tropfbewässerung ; Ressourcenverschwendung].'
			},
			buildGermanClassificationTableBlock({
				columns: [
					{
						header: 'Wortfeld : Nachhaltige Schutzmaßnahmen',
						items: ['Photovoltaik', 'Aufforstung', 'Tropfbewässerung'],
						mark: '0.5'
					},
					{
						header: 'Wortfeld : Umweltbelastungen',
						items: ['Luftverschmutzung', 'Bodenerosion', 'Ressourcenverschwendung'],
						mark: '0.5'
					}
				]
			}),
			{
				type: 'text',
				content: '#strong[B. Grammatik und Satzbau (4 Punkte)]'
			},
			{
				type: 'text',
				content: '#strong[4.] Ergänzen Sie „obwohl“ oder „trotzdem“ (achten Sie auf die Verbstellung) :'
			},
			{
				type: 'text',
				content:
					'a) ............ moderne Solaranlagen sauberen Strom erzeugen, muss jeder Haushalt Energie sparen.',
				answer: 'a) Obwohl',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Es regnete im Frühjahr nur selten ; ............, blieben die jungen Olivenbäume durch Tropfbewässerung gesund.',
				answer: 'b) trotzdem',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[5.] Wandeln Sie die Sätze vom Vorgangspassiv ins Zustandspassiv (sein + Partizip II) um :'
			},
			{
				type: 'text',
				content: 'a) Die Schuldächer werden mit Solarmodulen ausgestattet. -> Jetzt :',
				answer: 'a) Die Schuldächer sind jetzt mit Solarmodulen ausgestattet.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) Der neue Stadtpark wurde mit hundert Pinien bepflanzt. -> Nun :',
				answer: 'b) Der neue Stadtpark ist nun mit hundert Pinien bepflanzt.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[6.] Formen Sie die Präpositionalphrase mit „trotz + Genitiv“ in einen Konzessivsatz mit „obwohl“ um :\n„Trotz der starken Sommerhitze versorgt die Anlage die Gemeinde sicher mit Strom.“',
				answer:
					'Obwohl im Sommer starke Hitze herrscht (oder : Obwohl es im Sommer sehr heiß ist), versorgt die Anlage die Gemeinde sicher mit Strom.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'#strong[7.] Formen Sie den „obwohl“-Satz in eine Satzverbindung mit „trotzdem“ um :\n„Obwohl viele Jugendliche den Wert des Wassers kennen, lassen manche den Wasserhahn offen.“',
				answer:
					'Viele Jugendliche kennen den Wert des Wassers ; trotzdem lassen manche den Wasserhahn offen.',
				mark: '1'
			}
		]
	};

	const expr: ExerciseBlock = {
		id: 'de_2024_t1_expr',
		customTitle: 'III. Schriftlicher Ausdruck',
		points: 6,
		instruction: 'Wählen Sie EINES der beiden Themen und schreiben Sie einen klaren Text (ca. 130–145 Wörter).',
		content: [
			buildGermanWrittenProductionBlock({
				themaEinsTitle: 'Thema 1 (Gelenkt) :',
				themaEinsPrompt:
					'Im Namen der Umweltgruppe Ihrer Schule verfassen Sie einen Brief an die Schulleitung, in dem Sie einen „Grünen Aktionstag“ mit Baumpflanzung, Mülltrennung und Wassersparkampagne vorschlagen.',
				themaEinsStichpunkte: [
					'Begründen Sie Ihr Anliegen mit konkreten Umweltproblemen (Hitze, Wasserknappheit).',
					'Nennen Sie drei praktische Maßnahmen auf dem Schulhof und in den Klassenräumen.',
					'Verwenden Sie mindestens einen Konzessivsatz (obwohl / trotzdem) und ein Zustandspassiv.'
				],
				themaZweiPrompt:
					'„Erneuerbare Energien wie Sonnen- und Windkraft sind kein Luxus, sondern eine Lebensgrundlage für die kommenden Generationen.“ Erörtern Sie diese Aussage anhand konkreter Beispiele.',
				rubricSummary:
					'Textsorte und inhaltliche Relevanz (2 Pkt.) ; logische Verknüpfung (1.5 Pkt.) ; korrekter Gebrauch von Konzessivsätzen, Zustandspassiv und Umweltwortschatz (1.5 Pkt.) ; Rechtschreibung und Ausdruck (1 Pkt.).',
				modelAnswer:
					'Sehr geehrte Schulleitung,\n\nim Namen unserer engagierten Schulumweltgruppe schlagen wir vor, im kommenden Monat einen „Grünen Aktionstag“ an unserem Gymnasium zu veranstalten. Obwohl viele Schülerinnen und Schüler die Bedeutung des Klimaschutzes kennen, landet auf dem Schulhof noch zu oft Kunststoff im gewöhnlichen Restmüll.\n\nDeshalb möchten wir auf dem Hof getrennte Sammelbehälter aufstellen und entlang der Mauer zwanzig junge, widerstandsfähige Olivenbäume pflanzen. Wenn alle Wasserhähne rechtzeitig überprüft sind, lässt sich zudem im Alltag viel kostbares Trinkwasser einsparen. Gleichzeitig sollen auf dem Dach bereits montierte Photovoltaikmodule im Physikunterricht praktisch vorgestellt werden. Trotz des engen Stundenplans sind schon dreißig freiwillige Lernende zur aktiven Mithilfe bereit.\n\nWir hoffen auf Ihre geschätzte Zustimmung, damit unsere Schule zu einem lebendigen Vorbild für nachhaltige Umweltverantwortung und Dankbarkeit gegenüber der Schöpfung wird.\n\nMit freundlichen Grüßen\nDie Schulumweltgruppe',
				mark: '6'
			})
		]
	};

	return buildOfficialGermanBacPaper({
		slug: 'bac-2024-3as-le-german-t1',
		academicYear: '2024',
		topicNumber: 1,
		themenbereichDe: 'Umweltschutz und erneuerbare Energien',
		titleTopicDe: 'Erneuerbare Energien und nachhaltiger Umweltschutz',
		titleTopicAr: 'الطاقات المتجددة وحماية البيئة المستدامة',
		themesDe: [
			'Umweltschutz',
			'Erneuerbare Energien',
			'Wasserschutz und Aufforstung',
			'Konzessivsätze und Zustandspassiv'
		],
		themesAr: [
			'حماية البيئة',
			'الطاقات المتجددة',
			'ترشيد المياه والتشجير',
			'جمل التنازل والمبني للمجهول للحالة'
		],
		exercises: [comp, ling, expr]
	});
}

// ============================================================================
// 4. BAC 2024 — Thema 2 (bac-2024-3as-le-german-t2)
// Algerisches Kulturerbe und islamische Wissenschaftsgeschichte
// ============================================================================

function buildBac2024GermanT2(): OfficialGermanBacPaperSpec {
	const comp: ExerciseBlock = {
		id: 'de_2024_t2_comp',
		customTitle: 'I. Textverständnis',
		points: 7,
		instruction: 'Lesen Sie diesen kulturhistorischen Text aufmerksam und beantworten Sie die Fragen.',
		content: [
			buildGermanPassageBlock({
				title: 'Steine voller Weisheit : Algerisches Kulturerbe und islamische Wissenschaftsgeschichte',
				paragraphs: [
					'Wer heute durch die weißen Gassen der Kasbah von Algier geht, die kunstvollen Bögen der Großen Moschee von Tlemcen betrachtet oder die harmonischen Oasensiedlungen des M’Zab-Tals in Ghardaïa besucht, erkennt eine tiefe Verbindung zwischen Baukunst, Mathematik und Lebenspraxis. Schon vor Jahrhunderten wurden [[diese historischen Stätten]] so geplant, dass Licht, Luftzirkulation und der sparsame Umgang mit Regenwasser optimal aufeinander abgestimmt waren.',
					'Doch das geistige Erbe beschränkte sich keineswegs auf Architektur. In Bibliotheken und Lehranstalten der islamischen Welt forschten Gelehrte unermüdlich nach verlässlichen Erkenntnissen. Der Arzt Al-Zahrawi entwarf über zweihundert chirurgische Instrumente und beschrieb medizinische Verfahren in einem klaren Handbuch, während der Mathematiker Al-Khwarizmi systematische Rechenmethoden schuf, auf denen noch heute die moderne Algebra beruht.',
					'Auch zwei große Namen der Geografie und Geschichtswissenschaft blieben eng mit Nordafrika verbunden. Der Kartograf Al-Idrisi erstellte im zwölften Jahrhundert erstaunlich genaue Weltkarten und Länderbeschreibungen. Später verfasste Ibn Khaldoun in der Region nahe Tlemcen und Tiaret entscheidende Teile seines Geschichtswerkes, in dem er [[eine kritische Methode]] zur Untersuchung von Gesellschaften, Wirtschaftskreisläufen und dem Aufstieg von Kulturen entwickelte.',
					'Historikerinnen und Historiker betonen heute, dass dieses Erbe nicht bloß als Museumsstück betrachtet werden dürfe. Wenn junge Menschen Handschriften restaurieren und Baudenkmäler pflegen, schöpfen sie aus der eigenen Geschichte Mut, Disziplin und Freude an seriöser Wissenschaft.'
				],
				source: 'Beiträge zur algerischen Kultur- und Wissenschaftsgeschichte, Ausgabe SujetStore',
				numberedParagraphs: true,
				glossary: [
					{
						term: 'Baukunst',
						meaning: 'Architektur und kunstvolle Gestaltung von Gebäuden'
					},
					{
						term: 'Kartograf',
						meaning: 'Fachmann für das wissenschaftliche Zeichnen von Land- und Seekarten'
					},
					{
						term: 'restaurieren',
						meaning: 'ein beschädigtes Bauwerk oder altes Dokument fachgerecht wiederherstellen'
					}
				]
			}),
			buildIllustratedFigureBlock('ger_02_algerisches_kulturerbe_architektur', {
				lang: 'de',
				mode: 'labeled',
				pins: [],
				width: '62%',
				maxHeight: 128,
				caption: 'Bilddokument : Kasbah von Algier, Große Moschee von Tlemcen, M’Zab-Tal und Kalligraphie.'
			}),
			{
				type: 'text',
				content: '#strong[1.] Kreuzen Sie die zutreffende Aussage über das Hauptthema des Textes an.'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: 'Im Mittelpunkt des Textes steht :',
						options: [
							'die moderne Industriegeschichte europäischer Hafenstädte.',
							'die Verbindung von algerischer Baukunst und großen Beiträgen islamischer Gelehrter zur Wissenschaft.',
							'der Verlust sämtlicher historischer Bauwerke in Nordafrika.'
						],
						correct:
							'die Verbindung von algerischer Baukunst und großen Beiträgen islamischer Gelehrter zur Wissenschaft.',
						mark: '1'
					}
				]
			},
			{
				type: 'text',
				content:
					'#strong[2.] Geben Sie an, ob die Aussagen Richtig oder Falsch sind, und belegen Sie jede Antwort.'
			},
			{
				type: 'true_false',
				items: [
					{
						q: 'a) Die Planung des M’Zab-Tals und der Kasbah berücksichtigte bereits Luftzirkulation und Wassernutzung.',
						a: 'Richtig',
						c: 'Diese historischen Stätten wurden so geplant, dass Licht, Luftzirkulation und der sparsame Umgang mit Regenwasser optimal aufeinander abgestimmt waren (§1).',
						mark: '0.5'
					},
					{
						q: 'b) Al-Zahrawi beschäftigte sich ausschließlich mit der Zeichnung von Seekarten.',
						a: 'Falsch',
						c: 'Der Arzt Al-Zahrawi entwarf über zweihundert chirurgische Instrumente und beschrieb medizinische Verfahren in einem Handbuch (§2).',
						mark: '0.5'
					},
					{
						q: 'c) Ibn Khaldoun schrieb einen wesentlichen Teil seines Werkes in der Gegend von Tlemcen und Tiaret.',
						a: 'Richtig',
						c: 'Ibn Khaldoun verfasste in der Region nahe Tlemcen und Tiaret entscheidende Teile seines Geschichtswerkes (§3).',
						mark: '0.5'
					},
					{
						q: 'd) Laut Absatz 4 soll das Kulturerbe nur ungenutzt in Museen stehen, ohne die Jugend zu inspirieren.',
						a: 'Falsch',
						c: 'Historiker betonen, dass dieses Erbe nicht bloß als Museumsstück betrachtet werden dürfe, sondern der Jugend Mut, Disziplin und Freude an Wissenschaft gebe (§4).',
						mark: '0.5'
					}
				]
			},
			{
				type: 'text',
				content: '#strong[3.] Beantworten Sie die folgenden Fragen in ganzen Sätzen.'
			},
			{
				type: 'text',
				content:
					'a) Welche zwei wissenschaftlichen Verdienste von Al-Zahrawi und Al-Khwarizmi erwähnt der zweite Absatz ?',
				answer:
					'a) Al-Zahrawi entwarf über zweihundert chirurgische Instrumente und verfasste ein medizinisches Handbuch, während Al-Khwarizmi systematische Rechenmethoden als Grundlage der Algebra schuf.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'b) Worin bestand der wissenschaftliche Beitrag von Al-Idrisi und Ibn Khaldoun laut Absatz 3 ?',
				answer:
					'b) Al-Idrisi zeichnete im zwölften Jahrhundert genaue Weltkarten und verfasste Länderbeschreibungen ; Ibn Khaldoun entwickelte eine kritische Methode zur Analyse von Gesellschaften und Kulturen.',
				mark: '1'
			},
			{
				type: 'text',
				content: '#strong[4.] Worauf beziehen sich die unterstrichenen Textstellen ?'
			},
			{
				type: 'text',
				content: 'a) „diese historischen Stätten“ (§1) bezieht sich auf : ............................',
				answer:
					'a) Bezieht sich auf die Kasbah von Algier, die Große Moschee von Tlemcen und die Oasensiedlungen des M’Zab-Tals.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) „eine kritische Methode“ (§3) bezieht sich auf : ............................',
				answer:
					'b) Bezieht sich auf Ibn Khaldouns wissenschaftliches Verfahren zur Untersuchung von Gesellschaften, Wirtschaftskreisläufen und Kulturen.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[5.] Vervollständigen Sie die Tabelle mit Informationen aus den Absätzen 2 und 3.'
			},
			{
				type: 'table',
				headers: ['Gelehrter', 'Fachgebiet und Leistung'],
				cells: [],
				rows: [
					[
						{ content: 'Al-Idrisi', bold: true },
						{
							content: '....................',
							answer: 'Geografie / Kartografie : genaue Weltkarten und Länderbeschreibungen.',
							mark: '0.5'
						}
					],
					[
						{ content: 'Ibn Khaldoun', bold: true },
						{
							content: '....................',
							answer: 'Geschichts- und Gesellschaftswissenschaft : kritische Methode zur Analyse von Kulturen.',
							mark: '0.5'
						}
					]
				],
				align: 'center',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			}
		]
	};

	const ling: ExerciseBlock = {
		id: 'de_2024_t2_ling',
		customTitle: 'II. Sprachfähigkeit',
		points: 7,
		instruction: 'Lösen Sie die Übungen zu Wortschatz, Präteritum, Passiv mit Modalverben und indirekter Rede.',
		content: [
			{
				type: 'text',
				content: '#strong[A. Wortschatz und Wortbildung (3 Punkte)]'
			},
			{
				type: 'text',
				content: '#strong[1.] Suchen Sie im Text :'
			},
			{
				type: 'text',
				content: 'a) das Synonym zu „schreiben / abfassen“ (§3) : ............................',
				answer: 'a) verfassen (verfasste)',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) das Antonym zu „verschwenderisch“ (§1) : ............................',
				answer: 'b) sparsam (sparsame)',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[2.] Vervollständigen Sie die Wortfamilien-Tabelle.'
			},
			buildGermanWordFamilyTableBlock([
				{
					verb: { given: true, value: 'erhalten' },
					nomen: { value: 'die Erhaltung', mark: '0.25' },
					adjektiv: { value: 'erhalten / erhaltenswert', mark: '0.25' }
				},
				{
					verb: { value: 'bauen', mark: '0.25' },
					nomen: { given: true, value: 'die Baukunst / der Bau' },
					adjektiv: { value: 'baulich / bebaubar', mark: '0.25' }
				}
			]),
			{
				type: 'text',
				content:
					'#strong[3.] Ordnen Sie die Ausdrücke richtig ein : #emph[Kasbah von Algier ; chirurgische Instrumente ; Große Moschee von Tlemcen ; präzise Weltkarten ; M’Zab-Tal ; systematische Algebra].'
			},
			buildGermanClassificationTableBlock({
				columns: [
					{
						header: 'Architektonisches Kulturerbe',
						items: ['Kasbah von Algier', 'Große Moschee von Tlemcen', 'M’Zab-Tal'],
						mark: '0.5'
					},
					{
						header: 'Wissenschaftliche Leistungen',
						items: ['chirurgische Instrumente', 'präzise Weltkarten', 'systematische Algebra'],
						mark: '0.5'
					}
				]
			}),
			{
				type: 'text',
				content: '#strong[B. Grammatik und Satzbau (4 Punkte)]'
			},
			{
				type: 'text',
				content: '#strong[4.] Setzen Sie die eingeklammerten Verben ins Präteritum :'
			},
			{
				type: 'text',
				content:
					'a) Im zwölften Jahrhundert #strong[(zeichnen)] Al-Idrisi genaue Weltkarten und #strong[(beschreiben)] zahlreiche Küsten.',
				answer:
					'a) Im zwölften Jahrhundert zeichnete Al-Idrisi genaue Weltkarten und beschrieb zahlreiche Küsten.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Al-Khwarizmi #strong[(schaffen)] klare Rechenregeln, und viele Schüler #strong[(studieren)] seine Bücher.',
				answer:
					'b) Al-Khwarizmi schuf klare Rechenregeln, und viele Schüler studierten seine Bücher.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[5.] Bilden Sie Sätze im Passiv mit den angegebenen Modalverben :'
			},
			{
				type: 'text',
				content:
					'a) Alte Handschriften / sorgfältig / aufbewahren / #strong[(müssen, Präsens)].',
				answer: 'a) Alte Handschriften müssen sorgfältig aufbewahrt werden.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Die historischen Tore der Kasbah / im letzten Jahr / restaurieren / #strong[(können, Präteritum)].',
				answer: 'b) Die historischen Tore der Kasbah konnten im letzten Jahr restauriert werden.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[6.] Setzen Sie die Aussage in die indirekte Rede (Konjunktiv I) :\nDer Historiker erklärt : „Das M’Zab-Tal ist ein Vorbild für nachhaltiges Bauen, und Ibn Khaldoun hat die Geschichtsschreibung erneuert.“',
				answer:
					'Der Historiker erklärt, das M’Zab-Tal sei ein Vorbild für nachhaltiges Bauen, und Ibn Khaldoun habe die Geschichtsschreibung erneuert.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'#strong[7.] Wandeln Sie den Aktivsatz ins Passiv mit Modalverb um :\n„Fachleute mussten die alten Bewässerungskanäle im M’Zab-Tal regelmäßig pflegen.“',
				answer:
					'Die alten Bewässerungskanäle im M’Zab-Tal mussten von Fachleuten regelmäßig gepflegt werden.',
				mark: '1'
			}
		]
	};

	const expr: ExerciseBlock = {
		id: 'de_2024_t2_expr',
		customTitle: 'III. Schriftlicher Ausdruck',
		points: 6,
		instruction: 'Wählen Sie EINES der beiden Themen und schreiben Sie einen zusammenhängenden Text (ca. 130–145 Wörter).',
		content: [
			buildGermanWrittenProductionBlock({
				themaEinsTitle: 'Thema 1 (Gelenkt) :',
				themaEinsPrompt:
					'Sie berichten in der Schulzeitung über eine Kulturfahrt zur Kasbah von Algier oder zur Großen Moschee von Tlemcen und würdigen dabei das wissenschaftliche Erbe von Gelehrten wie Al-Zahrawi, Al-Idrisi und Ibn Khaldoun.',
				themaEinsStichpunkte: [
					'Beschreiben Sie zwei architektonische Merkmale der besuchten Stätte.',
					'Stellen Sie die wissenschaftliche Leistung eines berühmten Gelehrten kurz vor.',
					'Verwenden Sie Präteritum, Passiv mit Modalverb sowie mindestens eine indirekte Rede.'
				],
				themaZweiPrompt:
					'„Wer sein eigenes kulturelles und wissenschaftliches Erbe kennt, begegnet anderen Kulturen mit Selbstvertrauen und Respekt.“ Verfassen Sie dazu eine Erörterung.',
				rubricSummary:
					'Sachliche Treue und Erfüllung der Leitpunkte (2 Pkt.) ; Aufbau und flüssige Übergänge (1.5 Pkt.) ; Präteritum, Passiv mit Modalverb, Konjunktiv I und Kulturwortschatz (1.5 Pkt.) ; Rechtschreibung (1 Pkt.).',
				modelAnswer:
					'Während unserer spannenden Studienfahrt nach Tlemcen bewunderte unsere Klasse die Große Moschee, deren kunstvolle Bögen und ruhige Innenhöfe bis heute von hoher mathematischer Baukunst zeugen. Unser Geschichtslehrer erklärte vor Ort, schon vor Jahrhunderten habe man dort Tageslicht und natürliche Belüftung genau berechnet, ebenso wie in den alten Häusern der Kasbah von Algier oder im sonnigen M’Zab-Tal.\n\nBesonders beeindruckte uns das reiche geistige Vermächtnis großer islamischer Gelehrter. Während Al-Idrisi exakte Weltkarten zeichnete und der Arzt Al-Zahrawi moderne chirurgische Instrumente entwarf, entwickelte Ibn Khaldoun nahe Tlemcen eine kritische Methode für die Geschichtswissenschaft. Unser Lehrer betonte, dieses Wissen müsse durch sorgfältige Forschung bewahrt und jungen Generationen anschaulich vermittelt werden.\n\nSo wurde uns bewusst, dass die Pflege historischer Denkmäler kein bloßer Blick zurück ist, sondern Kraft, Selbstvertrauen und Lernfreude für die Zukunft schenkt.',
				mark: '6'
			})
		]
	};

	return buildOfficialGermanBacPaper({
		slug: 'bac-2024-3as-le-german-t2',
		academicYear: '2024',
		topicNumber: 2,
		themenbereichDe: 'Kulturerbe und islamische Wissenschaftsgeschichte',
		titleTopicDe: 'Algerisches Kulturerbe und islamische Wissenschaftsgeschichte',
		titleTopicAr: 'التراث الثقافي الجزائري وتاريخ العلوم الإسلامية',
		themesDe: [
			'Algerisches Kulturerbe',
			'Kasbah, Tlemcen und M’Zab',
			'Al-Zahrawi, Al-Idrisi und Ibn Khaldoun',
			'Präteritum, Passiv mit Modalverben und indirekte Rede'
		],
		themesAr: [
			'التراث الثقافي الجزائري',
			'القصبة وتلمسان وميزاب',
			'الزهراوي والإدريسي وابن خلدون',
			'الماضي السردي والمبني للمجهول مع الأفعال الناقصة والكلام المنقول'
		],
		exercises: [comp, ling, expr]
	});
}

// ============================================================================
// 5. BAC 2025 — Thema 1 (bac-2025-3as-le-german-t1)
// Moderne Arbeitswelt, Berufsausbildung und Unternehmertum
// ============================================================================

function buildBac2025GermanT1(): OfficialGermanBacPaperSpec {
	const comp: ExerciseBlock = {
		id: 'de_2025_t1_comp',
		customTitle: 'I. Textverständnis',
		points: 7,
		instruction: 'Lesen Sie den Artikel über Berufsbildung und Unternehmertum aufmerksam und lösen Sie die Aufgaben.',
		content: [
			buildGermanPassageBlock({
				title: 'Zwischen Handwerk, Ingenieurwesen und Initiative : Chancen in der modernen Arbeitswelt',
				paragraphs: [
					'Auf dem heutigen Arbeitsmarkt suchen Betriebe und Werkstätten zunehmend Fachkräfte, die theoretisches Verständnis mit praktischer Handfertigkeit verbinden. Daher gewinnt die duale Berufsausbildung weltweit an Anerkennung : Auszubildende lernen an einigen Tagen im Betrieb unter Anleitung erfahrener Meister und vertiefen an anderen Tagen ihr Wissen in der Berufsschule. Viele Fachleute sind überzeugt, dass [[dieses praxisnahe Modell]] jungen Menschen einen sicheren Einstieg ins Berufsleben verschafft.',
					'Gleichzeitig ergreifen immer mehr Absolventinnen und Absolventen in Algerien selbst die Initiative und gründen kleine Handwerks-, Solar- oder Softwarebetriebe. Um ein tragfähiges Projekt aufzubauen, bedarf es klarer technischer Planung, sorgfältiger Kostenrechnung und digitaler Projektorganisation. Wer von Beginn an sauber kalkuliert, vermeidet unnötige Schulden und gewinnt das Vertrauen seiner Kunden.',
					'Langfristiger beruflicher Erfolg beruht jedoch nicht allein auf modernen Geräten, sondern vor allem auf Verlässlichkeit, Pünktlichkeit und fairer Zusammenarbeit im Team. Betriebe, in denen [[diese beruflichen Tugenden]] gepflegt werden, liefern gleichbleibende Qualität und meistern wirtschaftliche Schwankungen deutlich besser als Unternehmen, die lediglich auf raschen Gewinn achten.',
					'Für die kommenden Jahre zeichnen sich besonders im Bereich nachhaltiger Produktion, der Gebäudetechnik und der landwirtschaftlichen Verarbeitung vielfältige Berufsbilder ab. Wer bereit ist, ein Leben lang dazuzulernen, wird auch in einer sich wandelnden Wirtschaft sinnvolle Arbeit leisten und einen wichtigen Dienst an der Gesellschaft erfüllen.'
				],
				source: 'Zeitschrift für Berufsbildung, Handwerk und Wirtschaft, Ausgabe SujetStore',
				numberedParagraphs: true,
				glossary: [
					{
						term: 'duale Berufsausbildung',
						meaning: 'Ausbildungssystem, das praktische Arbeit im Betrieb und Unterricht in der Berufsschule verbindet'
					},
					{
						term: 'kalkulieren',
						meaning: 'Kosten, Zeitaufwand und Ertrag eines Projekts genau vorausberechnen'
					},
					{
						term: 'Verlässlichkeit',
						meaning: 'Zuverlässigkeit und treue Erfüllung gegebener Zusagen im Beruf'
					}
				]
			}),
			buildIllustratedFigureBlock('ger_06_arbeitswelt_berufsausbildung', {
				lang: 'de',
				mode: 'labeled',
				pins: [],
				width: '62%',
				maxHeight: 128,
				caption: 'Bilddokument : Technische Planung, duale Berufsausbildung, Projektmanagement und Produktion.'
			}),
			{
				type: 'text',
				content: '#strong[1.] Kreuzen Sie die Aussage an, die den Inhalt des Textes am besten zusammenfasst.'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: 'Nach Aussage des Artikels gelingt der Einstieg in die moderne Arbeitswelt vor allem durch :',
						options: [
							'reine Theorie ohne jede praktische Werkstatterfahrung.',
							'praxisnahe Berufsausbildung, sorgfältige Projektplanung, Weiterbildung und Verlässlichkeit.',
							'kurzfristiges Streben nach schnellem Gewinn ohne Qualitätskontrolle.'
						],
						correct:
							'praxisnahe Berufsausbildung, sorgfältige Projektplanung, Weiterbildung und Verlässlichkeit.',
						mark: '1'
					}
				]
			},
			{
				type: 'text',
				content:
					'#strong[2.] Geben Sie an, ob die Sätze Richtig oder Falsch sind, und begründen Sie jede Antwort mit dem Text.'
			},
			{
				type: 'true_false',
				items: [
					{
						q: 'a) Die duale Berufsausbildung verbindet praktische Arbeit im Betrieb mit schulischem Unterricht.',
						a: 'Richtig',
						c: 'Auszubildende lernen im Betrieb unter Anleitung erfahrener Meister und vertiefen ihr Wissen in der Berufsschule (§1).',
						mark: '0.5'
					},
					{
						q: 'b) Für die Gründung eines eigenen Kleinbetriebs genügen gute Ideen ohne finanzielle Planung.',
						a: 'Falsch',
						c: 'Um ein tragfähiges Projekt aufzubauen, bedarf es klarer technischer Planung, sorgfältiger Kostenrechnung und digitaler Projektorganisation (§2).',
						mark: '0.5'
					},
					{
						q: 'c) Pünktlichkeit und Teamarbeit helfen Betrieben, schwierige wirtschaftliche Zeiten besser zu bewältigen.',
						a: 'Richtig',
						c: 'Betriebe, in denen diese beruflichen Tugenden gepflegt werden, liefern gleichbleibende Qualität und meistern wirtschaftliche Schwankungen deutlich besser (§3).',
						mark: '0.5'
					},
					{
						q: 'd) Mit dem Abschluss der Ausbildung ist das Lernen im Berufsleben endgültig beendet.',
						a: 'Falsch',
						c: 'Wer bereit ist, ein Leben lang dazuzulernen, wird auch in einer sich wandelnden Wirtschaft sinnvolle Arbeit leisten (§4).',
						mark: '0.5'
					}
				]
			},
			{
				type: 'text',
				content: '#strong[3.] Beantworten Sie die Fragen in vollständigen Sätzen.'
			},
			{
				type: 'text',
				content:
					'a) Was braucht ein junger Gründer laut Absatz 2, um ein eigenes Projekt erfolgreich aufzubauen ?',
				answer:
					'a) Ein junger Gründer braucht klare technische Planung, eine sorgfältige Kostenrechnung, digitale Projektorganisation und saubere Kalkulation.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'b) Welche Zukunftsbranchen werden im vierten Absatz als besonders aussichtsreich genannt ?',
				answer:
					'b) Der vierte Absatz nennt die nachhaltige Produktion, die Gebäudetechnik sowie die landwirtschaftliche Verarbeitung.',
				mark: '1'
			},
			{
				type: 'text',
				content: '#strong[4.] Worauf beziehen sich die unterstrichenen Ausdrücke im Text ?'
			},
			{
				type: 'text',
				content: 'a) „dieses praxisnahe Modell“ (§1) bezieht sich auf : ............................',
				answer: 'a) Bezieht sich auf die duale Berufsausbildung.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) „diese beruflichen Tugenden“ (§3) bezieht sich auf : ............................',
				answer: 'b) Bezieht sich auf Verlässlichkeit, Pünktlichkeit und faire Zusammenarbeit im Team.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[5.] Ergänzen Sie die Tabelle mit Informationen aus dem Text.'
			},
			{
				type: 'table',
				headers: ['Erfolgsfaktor im Beruf', 'Konkrete Wirkung laut Text'],
				cells: [],
				rows: [
					[
						{ content: 'Saubere Kalkulation', bold: true },
						{
							content: '....................',
							answer: 'Vermeidet unnötige Schulden und schafft Vertrauen bei den Kunden.',
							mark: '0.5'
						}
					],
					[
						{ content: 'Lebenslanges Lernen', bold: true },
						{
							content: '....................',
							answer: 'Ermöglicht sinnvolle Arbeit in einer sich wandelnden Wirtschaft und Dienst an der Gesellschaft.',
							mark: '0.5'
						}
					]
				],
				align: 'center',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			}
		]
	};

	const ling: ExerciseBlock = {
		id: 'de_2025_t1_ling',
		customTitle: 'II. Sprachfähigkeit',
		points: 7,
		instruction: 'Bearbeiten Sie die Aufgaben zu Wortschatz, Futur I, Adjektivdeklination und Nominalisierung.',
		content: [
			{
				type: 'text',
				content: '#strong[A. Wortschatz und Wortbildung (3 Punkte)]'
			},
			{
				type: 'text',
				content: '#strong[1.] Suchen Sie im Text :'
			},
			{
				type: 'text',
				content: 'a) das Synonym zu „stabil / solide / zukunftsfähig“ (§2) : ............................',
				answer: 'a) tragfähig (tragfähiges)',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) das Antonym zu „kurzfristig / vorübergehend“ (§3) : ............................',
				answer: 'b) langfristig (langfristiger)',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[2.] Ergänzen Sie die Wortbildungstabelle.'
			},
			buildGermanWordFamilyTableBlock([
				{
					verb: { given: true, value: 'ausbilden' },
					nomen: { value: 'die Ausbildung', mark: '0.25' },
					adjektiv: { value: 'ausgebildet / ausbildungsfähig', mark: '0.25' }
				},
				{
					verb: { value: 'produzieren', mark: '0.25' },
					nomen: { given: true, value: 'die Produktion' },
					adjektiv: { value: 'produktiv / produziert', mark: '0.25' }
				}
			]),
			{
				type: 'text',
				content:
					'#strong[3.] Ordnen Sie die Ausdrücke richtig ein : #emph[technische Planung ; Pünktlichkeit ; Kostenrechnung ; Teamgeist ; digitale Projektorganisation ; Verlässlichkeit].'
			},
			buildGermanClassificationTableBlock({
				columns: [
					{
						header: 'Fachliche Kompetenzen',
						items: ['technische Planung', 'Kostenrechnung', 'digitale Projektorganisation'],
						mark: '0.5'
					},
					{
						header: 'Berufliche Arbeitstugenden',
						items: ['Pünktlichkeit', 'Teamgeist', 'Verlässlichkeit'],
						mark: '0.5'
					}
				]
			}),
			{
				type: 'text',
				content: '#strong[B. Grammatik und Satzbau (4 Punkte)]'
			},
			{
				type: 'text',
				content: '#strong[4.] Setzen Sie die folgenden Aussagen ins Futur I (werden + Infinitiv) :'
			},
			{
				type: 'text',
				content:
					'a) Im kommenden Jahr #strong[(eröffnen)] zwei junge Techniker eine Solarwerkstatt in ihrer Stadt.',
				answer:
					'a) Im kommenden Jahr werden zwei junge Techniker eine Solarwerkstatt in ihrer Stadt eröffnen.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Eine sorgfältige Berufsausbildung #strong[(verbessern)] die Zukunftschancen der Jugend spürbar.',
				answer:
					'b) Eine sorgfältige Berufsausbildung wird die Zukunftschancen der Jugend spürbar verbessern.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[5.] Ergänzen Sie die korrekten Endungen der Adjektive :'
			},
			{
				type: 'text',
				content:
					'a) Ein erfahren............ Meister zeigt dem jung............ Lehrling das modern............ Werkzeug.',
				answer: 'a) Ein erfahrener Meister zeigt dem jungen Lehrling das moderne Werkzeug.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Mit einer gründlich............ Vorbereitung gelingt jedes nachhaltig............ Handwerksprojekt.',
				answer: 'b) Mit einer gründlichen Vorbereitung gelingt jedes nachhaltige Handwerksprojekt.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[6.] Nominalisieren Sie die Finalkonstruktion mit „um ... zu“ mithilfe von „zur + Nomen“ :\n„Die Gemeinde richtet eine Lehrwerkstatt ein, um junge Fachkräfte gezielt auszubilden.“',
				answer:
					'Die Gemeinde richtet eine Lehrwerkstatt zur gezielten Ausbildung junger Fachkräfte ein.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'#strong[7.] Verwandeln Sie den Nebensatz in eine Nominalphrase mit Präposition („durch“ oder „vor“) :\n„Wenn man Fachkräfte regelmäßig weiterbildet, steigt die Qualität in den Betrieben.“',
				answer:
					'Durch die regelmäßige Weiterbildung von Fachkräften steigt die Qualität in den Betrieben.',
				mark: '1'
			}
		]
	};

	const expr: ExerciseBlock = {
		id: 'de_2025_t1_expr',
		customTitle: 'III. Schriftlicher Ausdruck',
		points: 6,
		instruction: 'Wählen Sie EINES der beiden Themen und schreiben Sie einen gut gegliederten Text (ca. 130–145 Wörter).',
		content: [
			buildGermanWrittenProductionBlock({
				themaEinsTitle: 'Thema 1 (Gelenkt) :',
				themaEinsPrompt:
					'Sie nehmen an einem Jugendforum für Berufsorientierung teil und verfassen einen kurzen Projektvorschlag zur Gründung einer gemeinschaftlichen Werkstatt für handwerkliche Reparatur und nachhaltige Solartechnik.',
				themaEinsStichpunkte: [
					'Stellen Sie das Ziel der Werkstatt sowie zwei praktische Ausbildungsbereiche vor.',
					'Erklären Sie, welche Rolle Pünktlichkeit, Kostenrechnung und Teamarbeit spielen.',
					'Verwenden Sie mindestens eine Zukunftsprognose im Futur I und eine Nominalisierung oder „um ... zu“.'
				],
				themaZweiPrompt:
					'„Eine solide Berufsausbildung und ehrliche Handwerksarbeit sind für die Gesellschaft genauso wertvoll wie ein akademisches Studium.“ Nehmen Sie begründet Stellung.',
				rubricSummary:
					'Ideengehalt und Umsetzung der Vorgaben (2 Pkt.) ; logische Struktur (1.5 Pkt.) ; Futur I, Adjektivdeklination, Nominalisierung und Berufswortschatz (1.5 Pkt.) ; Rechtschreibung (1 Pkt.).',
				modelAnswer:
					'Ein gelungener Einstieg in das moderne Berufsleben verlangt heute praktische Erfahrung, sorgfältige Planung und hohe berufliche Verlässlichkeit. Deshalb schlagen wir für unsere Heimatstadt eine gemeinschaftliche Lehrwerkstatt vor, die solides Handwerk mit nachhaltiger Solartechnik verbindet.\n\nIn dieser Einrichtung werden erfahrene Meister kleine Lerngruppen anleiten, um einfache Solarlampen zu warten und ältere Schulgeräte fachgerecht zu reparieren. Zur sicheren wirtschaftlichen Entwicklung des Projekts brauchen alle Beteiligten eine klare Kostenrechnung sowie eine geordnete Projektorganisation. Zudem werden die Lernenden im täglichen Umgang mit Kunden Pünktlichkeit, Ehrlichkeit und Teamgeist üben, weil dauerhafter Erfolg auf gegenseitigem Vertrauen beruht. Durch diese praxisnahe Ausbildung werden viele junge Absolventinnen und Absolventen bald einen eigenen Betrieb aufbauen und sinnvolle Arbeitsplätze schaffen.\n\nZusammenfassend zeigt sich, dass solide Berufsbildung und redliche Arbeit Würde verleihen und unsere gesamte Gemeinschaft nachhaltig stärken.',
				mark: '6'
			})
		]
	};

	return buildOfficialGermanBacPaper({
		slug: 'bac-2025-3as-le-german-t1',
		academicYear: '2025',
		topicNumber: 1,
		themenbereichDe: 'Arbeitswelt, Berufsausbildung und Unternehmertum',
		titleTopicDe: 'Moderne Arbeitswelt, Berufsausbildung und Unternehmertum',
		titleTopicAr: 'عالم الشغل الحديث والتكوين المهني وريادة الأعمال',
		themesDe: [
			'Moderne Arbeitswelt',
			'Duale Berufsausbildung',
			'Unternehmertum und Handwerk',
			'Futur I, Adjektivdeklination und Nominalisierung'
		],
		themesAr: [
			'عالم الشغل الحديث',
			'التكوين المهني المزدوج',
			'المبادرة المقاولاتية',
			'المستقبل البسيط وإعراب الصفات والاسمية'
		],
		exercises: [comp, ling, expr]
	});
}

// ============================================================================
// 6. BAC 2025 — Thema 2 (bac-2025-3as-le-german-t2)
// Geographie des D-A-CH-Raums und der Mittelmeerraum + Stummkarte Quiz
// ============================================================================

function buildBac2025GermanT2(): OfficialGermanBacPaperSpec {
	const comp: ExerciseBlock = {
		id: 'de_2025_t2_comp',
		customTitle: 'I. Textverständnis',
		points: 7,
		instruction:
			'Lesen Sie den Landeskunde-Text aufmerksam, beantworten Sie die Fragen und ergänzen Sie die Stummkarte.',
		content: [
			buildGermanPassageBlock({
				title: 'Zwischen Alpen, Rhein und Mittelmeer : Die D-A-CH-Länder im Austausch mit Nordafrika',
				paragraphs: [
					'Wer in Algerien Deutsch lernt, beschäftigt sich nicht nur mit einer einzigen Nation, sondern mit dem gesamten D-A-CH-Raum in Mitteleuropa. Zu [[diesem Sprachraum]] zählen Deutschland, Österreich und die Schweiz, in denen Deutsch als gemeinsame Amtssprache dient. Geografisch erstreckt sich dieses Gebiet von der Nord- und Ostsee über fruchtbare Flusslandschaften an Rhein und Donau bis hin zu den hohen Gipfeln der Alpen.',
					'Obwohl die drei Länder gemeinsame sprachliche Wurzeln teilen, besitzen sie jeweils eigene geografische und wirtschaftliche Stärken. Deutschland ist flächenmäßig sowie nach der Bevölkerungszahl der größte der drei Staaten und verfügt über bedeutende Forschungszentren und Industriehäfen. Österreich liegt als Alpenrepublik im Herzen Europas, während die vielsprachige Schweiz für ihre Gebirgspässe, ihre Präzisionsindustrie und ihre internationalen Fachhochschulen bekannt ist.',
					'Zwischen Mitteleuropa und Nordafrika liegt das Mittelmeer nicht als trennende Mauer, sondern als verbindende Wasserstraße. Dank [[dieser geografischen Nähe]] tauschen Universitäten beider Kontinente seit Langem Fachwissen in den Bereichen Übersetzung, erneuerbare Solarenergie, Wasserwirtschaft und Medizingeschichte aus. Für algerische Abiturientinnen und Abiturienten im Zweig Fremdsprachen eröffnet die deutsche Sprache somit direkte Brücken zu wissenschaftlichen Studiengängen.',
					'Ein sachlicher interkultureller Austausch gelingt jedoch nur auf der Grundlage gegenseitiger Achtung. Wer fremde Länder kennenlernt, muss keineswegs die eigenen Traditionen aufgeben ; vielmehr verknüpft er die Offenheit für neue Erkenntnisse mit einer klaren Treue zu seiner Heimat.'
				],
				source: 'Landeskundliche Studienblätter D-A-CH und Mittelmeerraum, Ausgabe SujetStore',
				numberedParagraphs: true,
				glossary: [
					{
						term: 'D-A-CH-Raum',
						meaning: 'Sammelbegriff für die deutschsprachigen Länder Deutschland (D), Österreich (A) und Schweiz (CH)'
					},
					{
						term: 'Alpenrepublik',
						meaning: 'Bezeichnung für Österreich aufgrund seiner zentralen Lage im Alpengebirge'
					},
					{
						term: 'Amtssprache',
						meaning: 'offiziell anerkannte Sprache von Verwaltung, Schulen und Gesetzgebung eines Staates'
					}
				]
			}),
			{
				type: 'text',
				content: '#strong[1.] Wählen Sie die Aussage aus, die den Kerngedanken des Textes genau trifft.'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: 'Der Text zeigt vor allem, dass :',
						options: [
							'die deutsche Sprache ausschließlich in Norddeutschland gesprochen wird.',
							'der vielfältige D-A-CH-Raum und Nordafrika über das Mittelmeer hinweg in respektvollem wissenschaftlichem Austausch stehen.',
							'das Mittelmeer jede kulturelle oder universitäre Zusammenarbeit unmöglich macht.'
						],
						correct:
							'der vielfältige D-A-CH-Raum und Nordafrika über das Mittelmeer hinweg in respektvollem wissenschaftlichem Austausch stehen.',
						mark: '1'
					}
				]
			},
			{
				type: 'text',
				content:
					'#strong[2.] Geben Sie an, ob die Aussagen Richtig oder Falsch sind, und begründen Sie jede Antwort mit Textstellen.'
			},
			{
				type: 'true_false',
				items: [
					{
						q: 'a) Zum D-A-CH-Raum gehören Deutschland, Österreich und die Schweiz.',
						a: 'Richtig',
						c: 'Zu diesem Sprachraum zählen Deutschland, Österreich und die Schweiz, in denen Deutsch als gemeinsame Amtssprache dient (§1).',
						mark: '0.5'
					},
					{
						q: 'b) Österreich ist flächenmäßig größer und bevölkerungsreicher als Deutschland.',
						a: 'Falsch',
						c: 'Deutschland ist flächenmäßig sowie nach der Bevölkerungszahl der größte der drei Staaten (§2).',
						mark: '0.5'
					},
					{
						q: 'c) Die Schweiz ist unter anderem für ihre Gebirgspässe und ihre Präzisionsindustrie bekannt.',
						a: 'Richtig',
						c: 'Die vielsprachige Schweiz ist für ihre Gebirgspässe, ihre Präzisionsindustrie und ihre internationalen Fachhochschulen bekannt (§2).',
						mark: '0.5'
					},
					{
						q: 'd) Das Erlernen einer europäischen Sprache verlangt, dass man seine eigene Identität ablegt.',
						a: 'Falsch',
						c: 'Wer fremde Länder kennenlernt, muss keineswegs die eigenen Traditionen aufgeben, sondern verknüpft Offenheit mit Treue zu seiner Heimat (§4).',
						mark: '0.5'
					}
				]
			},
			{
				type: 'text',
				content: '#strong[3.] Beantworten Sie folgende Fragen in vollständigen Sätzen.'
			},
			{
				type: 'text',
				content:
					'a) Wie erstreckt sich der D-A-CH-Raum geografisch nach dem ersten Absatz ?',
				answer:
					'a) Er erstreckt sich von der Nord- und Ostsee über die Flusslandschaften an Rhein und Donau bis zu den hohen Gipfeln der Alpen.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'b) Auf welchen Gebieten arbeiten Universitäten aus Mitteleuropa und Nordafrika zusammen (§3) ?',
				answer:
					'b) Sie tauschen Fachwissen in den Bereichen Übersetzung, erneuerbare Solarenergie, Wasserwirtschaft und Medizingeschichte aus.',
				mark: '1'
			},
			{
				type: 'text',
				content: '#strong[4.] Worauf beziehen sich die unterstrichenen Ausdrücke im Text ?'
			},
			{
				type: 'text',
				content: 'a) „diesem Sprachraum“ (§1) bezieht sich auf : ............................',
				answer: 'a) Bezieht sich auf den gesamten D-A-CH-Raum (Deutschland, Österreich und die Schweiz).',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) „dieser geografischen Nähe“ (§3) bezieht sich auf : ............................',
				answer:
					'b) Bezieht sich auf die Lage des Mittelmeers als verbindende Wasserstraße zwischen Mitteleuropa und Nordafrika.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[5.] Betrachten Sie die Stummkarte des D-A-CH-Raums und des Mittelmeers und benennen Sie die fünf nummerierten geografischen Einheiten (1) bis (5) :'
			},
			buildIllustratedFigureBlock('ger_01_deutschsprachige_laender_stummkarte', {
				lang: 'de',
				mode: 'quiz',
				pins: [],
				width: '66%',
				maxHeight: 142,
				markPerItem: '0.2'
			})
		]
	};

	const ling: ExerciseBlock = {
		id: 'de_2025_t2_ling',
		customTitle: 'II. Sprachfähigkeit',
		points: 7,
		instruction: 'Bearbeiten Sie die Aufgaben zu Wortschatz, Wechselpräpositionen und Steigerungsformen.',
		content: [
			{
				type: 'text',
				content: '#strong[A. Wortschatz und Wortbildung (3 Punkte)]'
			},
			{
				type: 'text',
				content: '#strong[1.] Suchen Sie im Text :'
			},
			{
				type: 'text',
				content: 'a) das Synonym zu „Respekt / Wertschätzung“ (§4) : ............................',
				answer: 'a) Achtung',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) das Antonym zu „trennend“ (§3) : ............................',
				answer: 'b) verbindend (verbindende)',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[2.] Vervollständigen Sie die Wortfamilien-Tabelle.'
			},
			buildGermanWordFamilyTableBlock([
				{
					verb: { given: true, value: 'verbinden' },
					nomen: { value: 'die Verbindung', mark: '0.25' },
					adjektiv: { value: 'verbindend / verbunden', mark: '0.25' }
				},
				{
					verb: { value: 'grenzen', mark: '0.25' },
					nomen: { given: true, value: 'die Grenze' },
					adjektiv: { value: 'grenzüberschreitend / begrenzt', mark: '0.25' }
				}
			]),
			{
				type: 'text',
				content:
					'#strong[3.] Ordnen Sie die Begriffe in die Tabelle ein : #emph[Alpen ; Solarenergie ; Rhein und Donau ; Übersetzung ; Mittelmeerküste ; Wasserwirtschaft].'
			},
			buildGermanClassificationTableBlock({
				columns: [
					{
						header: 'Geografische Räume und Merkmale',
						items: ['Alpen', 'Rhein und Donau', 'Mittelmeerküste'],
						mark: '0.5'
					},
					{
						header: 'Bereiche der Zusammenarbeit',
						items: ['Solarenergie', 'Übersetzung', 'Wasserwirtschaft'],
						mark: '0.5'
					}
				]
			}),
			{
				type: 'text',
				content: '#strong[B. Grammatik und Satzbau (4 Punkte)]'
			},
			{
				type: 'text',
				content:
					'#strong[4.] Ergänzen Sie die Wechselpräpositionen mit dem richtigen Artikel (Dativ oder Akkusativ) :'
			},
			{
				type: 'text',
				content:
					'a) Wo liegen die Gebirgspässe ? Die meisten hohen Pässe liegen #strong[(in)] ............ Alpen zwischen Österreich und der Schweiz.',
				answer: 'a) in den Alpen',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Wohin reist die Delegation ? Die Studierenden reisen nächste Woche #strong[(in)] ............ Hauptstadt von Österreich.',
				answer: 'b) in die Hauptstadt',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[5.] Setzen Sie die eingeklammerten Adjektive in den Komparativ oder Superlativ :'
			},
			{
				type: 'text',
				content:
					'a) Deutschland hat eine #strong[(groß)] Bevölkerungszahl als Österreich und die Schweiz zusammen.',
				answer: 'a) größere',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) In der Schweiz verlaufen einige der #strong[(hoch)] Gebirgsstraßen Europas.',
				answer: 'b) höchsten',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[6.] Bilden Sie mit den Stichwörtern zwei Vergleichssätze („als“ bzw. „so ... wie“) :'
			},
			{
				type: 'text',
				content:
					'a) Die Donau (2 857 km) / lang / der Rhein (1 233 km).',
				answer: 'a) Die Donau ist länger als der Rhein.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Wissenschaftliche Ehrlichkeit / wichtig / technisches Wissen.',
				answer: 'b) Wissenschaftliche Ehrlichkeit ist genauso (ebenso) wichtig wie technisches Wissen.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[7.] Wandeln Sie die Aussage von der Frage „Wo ?“ (Dativ) in die Bewegung „Wohin ?“ (Akkusativ) um :\n„Die Landkarte hängt schon an der Tafel im Klassenraum.“ -> Wohin hängt der Lehrer die Landkarte ?',
				answer: 'Der Lehrer hängt die Landkarte an die Tafel im Klassenraum.',
				mark: '1'
			}
		]
	};

	const expr: ExerciseBlock = {
		id: 'de_2025_t2_expr',
		customTitle: 'III. Schriftlicher Ausdruck',
		points: 6,
		instruction: 'Wählen Sie EINES der beiden Themen und schreiben Sie einen gut aufgebauten Text (ca. 130–145 Wörter).',
		content: [
			buildGermanWrittenProductionBlock({
				themaEinsTitle: 'Thema 1 (Gelenkt) :',
				themaEinsPrompt:
					'Ihr Gymnasium empfängt eine akademische Delegation aus den D-A-CH-Ländern zu einem Seminar über Solarenergie, Übersetzung und Mittelmeer-Kooperation. Verfassen Sie eine kurze Begrüßungsrede.',
				themaEinsStichpunkte: [
					'Heißen Sie die Gäste herzlich willkommen und stellen Sie die Lage Algeriens am Mittelmeer vor.',
					'Nennen Sie zwei konkrete Gebiete der Zusammenarbeit (Solarenergie, Wasserwirtschaft oder Universitätsaustausch).',
					'Verwenden Sie mindestens eine Wechselpräposition (wo/wohin) und einen Komparativ oder Superlativ.'
				],
				themaZweiPrompt:
					'„Fremdsprachen bauen Brücken über Meere und Grenzen hinweg, wenn man andere Kulturen achtet und der eigenen Identität treu bleibt.“ Erläutern Sie diesen Gedanken.',
				rubricSummary:
					'Angemessenheit der Textsorte und Leitpunkte (2 Pkt.) ; Kohärenz und Gliederung (1.5 Pkt.) ; Wechselpräpositionen, Komparativ/Superlativ und Landeskunde-Wortschatz (1.5 Pkt.) ; Rechtschreibung (1 Pkt.).',
				modelAnswer:
					'Sehr geehrte Gäste aus Deutschland, Österreich und der Schweiz,\n\nes ist uns eine große Ehre, Sie an unserem Gymnasium in Algerien willkommen zu heißen. Unsere Heimat liegt an der südlichen Küste des Mittelmeers und blickt seit Jahrhunderten auf einen lebendigen Wissensaustausch mit Europa zurück.\n\nWenn Sie in unseren Lesesaal treten, sehen Sie an der Wand die Karte des gesamten D-A-CH-Raums neben Werken über unsere eigene Geschichte. Für den Zweig Fremdsprachen stellt die deutsche Sprache eine der wichtigsten Brücken zu Ihren Universitäten dar. Gerade bei erneuerbarer Solarenergie und moderner Wasserwirtschaft liefert eine enge Zusammenarbeit bessere Ergebnisse als jedes isolierte Projekt. Dabei schätzen wir einen sachlichen Dialog, der andere Lebensweisen respektiert und zugleich unsere eigenen kulturellen Werte bewahrt.\n\nWir wünschen Ihnen einen fruchtbaren Aufenthalt und hoffen, dass aus diesem Seminar viele dauerhafte Partnerschaften entstehen.',
				mark: '6'
			})
		]
	};

	return buildOfficialGermanBacPaper({
		slug: 'bac-2025-3as-le-german-t2',
		academicYear: '2025',
		topicNumber: 2,
		themenbereichDe: 'Landeskunde D-A-CH und Mittelmeerraum',
		titleTopicDe: 'Geographie des D-A-CH-Raums und der Mittelmeerraum',
		titleTopicAr: 'جغرافية الفضاء الناطق بالألمانية (D-A-CH) وحوض المتوسط',
		themesDe: [
			'Landeskunde D-A-CH',
			'Deutschland, Österreich und Schweiz',
			'Algerien und der Mittelmeerraum',
			'Stummkarte, Wechselpräpositionen und Steigerung'
		],
		themesAr: [
			'جغرافية البلدان الناطقة بالألمانية',
			'ألمانيا والنمسا وسويسرا',
			'الجزائر وحوض المتوسط',
			'الخريطة الصماء وحروف الجر المتغيرة وصيغ التفضيل'
		],
		exercises: [comp, ling, expr]
	});
}

export const OFFICIAL_BAC_GERMAN_PAPERS: OfficialGermanBacPaperSpec[] = [
	buildBac2023GermanT1(),
	buildBac2023GermanT2(),
	buildBac2024GermanT1(),
	buildBac2024GermanT2(),
	buildBac2025GermanT1(),
	buildBac2025GermanT2()
];
