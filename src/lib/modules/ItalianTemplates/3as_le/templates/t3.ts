import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildItalianClassificationTableBlock,
	buildItalianPassageBlock,
	buildItalianWordFamilyTableBlock,
	buildItalianWrittenProductionBlock
} from '../../italian-helpers';
import {
	saveItalianSvgAsset,
	svgItalianGrammarMap,
	svgItalianWritingBlueprint
} from '../../svg-italian';
import type {
	Difficulty,
	ItalianGeneratedExerciseInstance,
	ItalianParameterizedTemplate,
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
		finalAnswer: spec.correctAnswer ? 'Vero' : 'Falso',
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
			questionTextAr: `اربط كل عنصر في اليمين بما يناسبه في اليسار: ${spec.q}`,
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
			questionTextAr: `أكمل الفراغ بالصيغة الدقيقة: ${spec.q}`,
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
			questionTextAr: `صنّف العبارات الآتية في الفئة المناسبة: ${spec.q}`,
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
			questionTextAr: `رتّب المراحل أو الجمل ترتيباً منطقياً من الأول إلى الأخير: ${spec.q}`,
			questionData: {
				items: shuffled,
				correctOrder
			},
			explanation: spec.explanation
		}
	};
}

/**
 * 3AS BAC Foreign Languages (لغات أجنبية — yearSubjectId: 795, coeff 4, 03h00, 7+7+6=20)
 * Parameterized Exam & Quiz Templates — Trimestre 3 : Ecologia, Algeria Verde, Lavoro, Periodo Ipotetico & Saggio BAC (6 templates)
 * Roles: 2 comprehension (7 pti) + 2 linguistic_competence (7 pti) + 2 written_expression (6 pti)
 */
export const TEMPLATES_3AS_LE_T3: ItalianParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPREHENSION (7 pti): Ambiente, energie rinnovabili & Algeria verde
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_tpl_3as_le_t3_comp_ecologia_algeria_verde',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'comprensione_testo',
		titleAr: 'فهم النص (7 نقاط — لغات أجنبية): البيئة، الطاقات المتجددة ومشروع الجزائر الخضراء',
		curriculumLessonId: 'ita_lesson_3as_le_t3_ambiente_energie_algeria_verde',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Energia solare ed eolica nel Mediterraneo : la svolta verso il futuro pulito',
					source: 'Adattato da una nota sulla transizione energetica in Algeria',
					paragraphs: [
						'Per lungo tempo, lo sviluppo industriale ha fatto affidamento quasi esclusivo sui combustibili fossili, provocando un forte aumento delle emissioni inquinanti e dell’instabilità climatica. Oggi, tuttavia, molti Paesi del bacino mediterraneo investono con decisione nell’[[energia solare]] e nell’energia eolica.',
						'L’Algeria dispone di un potenziale solare tra i più elevati al mondo grazie al soleggiamento costante degli altipiani e del Sahara. Installare impianti fotovoltaici moderni permette di produrre elettricità pulita, sostenere il pompaggio dell’acqua agricola e ridurre la dipendenza dalle risorse esauribili.',
						'Questa trasformazione tecnologica apre inoltre nuove opportunità professionali ai giovani tecnici formati nella manutenzione delle reti pulite, confermando che [[tutela ecologica]] e progresso economico possono camminare insieme.'
					],
					glossary: [
						{ term: 'soleggiamento', meaning: 'quantità regolare di luce solare ricevuta in una regione' },
						{ term: 'esauribile', meaning: 'risorsa limitata destinata prima o poi a finire' }
					],
					mainIdeaHeader: '1. L’idea centrale del testo evidenzia che :',
					mainIdeaOptions: [
						'L’investimento nell’energia solare ed eolica tutela il clima e crea nuove opportunità professionali',
						'I combustibili fossili sono fonti inesauribili e prive di rischi ambientali',
						'Il Sahara algerino non possiede risorse adatte alle energie pulite'
					],
					mainIdeaCorrect:
						'L’investimento nell’energia solare ed eolica tutela il clima e crea nuove opportunità professionali',
					tfItems: [
						{
							q: 'L’uso prolungato dei combustibili fossili ha accresciuto le emissioni inquinanti.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'Secondo il testo, l’Algeria possiede uno scarso soleggiamento per produrre energia solare.',
							a: 'Falso',
							c: 'Dispone di un potenziale solare tra i più elevati al mondo sugli altipiani e nel Sahara (§2).',
							mark: '0.5'
						},
						{
							q: 'Gli impianti fotovoltaici aiutano anche il pompaggio dell’acqua per l’agricoltura.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'La transizione energetica riduce qualsiasi possibilità di impiego per i giovani tecnici.',
							a: 'Falso',
							c: 'Apre nuove opportunità professionali ai giovani formati nella manutenzione delle reti pulite (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Quali due conseguenze negative ha provocato la dipendenza dai combustibili fossili (§1)?',
							a: 'Il forte aumento delle emissioni inquinanti e dell’instabilità climatica.',
							mark: '0.75'
						},
						{
							q: 'b) Indica due vantaggi pratici degli impianti fotovoltaici in Algeria secondo il paragrafo 2.',
							a: 'Producono elettricità pulita, sostengono il pompaggio dell’acqua agricola e riducono la dipendenza da fonti esauribili.',
							mark: '1'
						},
						{
							q: 'c) Quale legame tra ecologia ed economia mette in luce la conclusione (§3)?',
							a: 'Mostra che la tutela ambientale e il progresso economico possono procedere insieme creando lavoro qualificato.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «energia solare» (§1)   b) «tutela ecologica» (§3)',
					refAnswer:
						'a) «energia solare» indica l’energia pulita e rinnovabile ricavata dalla luce del sole tramite impianti fotovoltaici.   b) «tutela ecologica» si riferisce alla protezione dell’ambiente naturale e del clima attraverso la riduzione dell’inquinamento.',
					synthPrompt:
						'Perché lo sviluppo delle energie rinnovabili è una scelta strategica per il futuro dei giovani algerini? Rispondi in quattro o cinque righe.',
					synthAnswer:
						'Sviluppare l’energia solare ed eolica protegge l’aria e i terreni agricoli dall’inquinamento e conserva le risorse nazionali per le generazioni future. Allo stesso tempo, crea mestieri qualificati per ingegneri e tecnici nei settori verdi e sostenibili.',
					quizzes: {
						easy: {
							q: 'Quali due energie rinnovabili vengono indicate nel paragrafo 1 come alternative pulite?',
							correct: 'Energia solare ed energia eolica',
							wrong: [
								'Carbone minerale e petrolio greggio',
								'Gasolio pesante e legna bruciata',
								'Plastiche industriali e catrame'
							],
							explanation: 'تذكر الفقرة الأولى الطاقة الشمسية والريحية بوصفهما البديلين النظيفين.'
						} as McqSpec,
						medium: {
							q: 'Perché gli altipiani e il Sahara algerino sono favorevoli al fotovoltaico secondo il paragrafo 2?',
							correct: 'Per il soleggiamento elevato e costante durante l’anno',
							wrong: [
								'Per l’assenza totale di luce solare',
								'Perché impediscono il pompaggio dell’acqua agricola',
								'Per sostituire tutte le colture delle oasi'
							],
							explanation: 'يتمتع الجنوب والهضاب بإشعاع شمسي وفير ومستمر طوال السنة.'
						} as McqSpec,
						hard: {
							q: 'Quale conclusione trae il testo dall’espansione delle reti energetiche pulite nel paragrafo 3?',
							correct: 'La difesa dell’ambiente genera anche nuovi posti di lavoro qualificati per i giovani',
							wrong: [
								'L’ecologia impedisce qualsiasi progresso economico',
								'I tecnici non ricevono alcuna formazione nella manutenzione',
								'Le energie pulite aumentano la dipendenza dalle fonti fossili'
							],
							explanation: 'تجمع الخاتمة بين حماية البيئة وخلق المهن التقنية الخضراء للشباب.'
						} as McqSpec
					}
				},
				{
					title: 'La Diga Verde e la lotta contro la desertificazione : il valore di ogni albero',
					source: 'Adattato da un reportage ecologico sul rimboschimento in Algeria',
					paragraphs: [
						'Tra le steppe e il margine settentrionale del deserto, l’avanzata della siccità e la perdita di vegetazione rappresentano una minaccia reale per i terreni coltivabili. Da decenni, l’ambizioso progetto di rimboschimento noto come Diga Verde riunisce forestali, contadini e associazioni studentesche per ricostruire [[una barriera naturale viva]].',
						'Piantare alberi adatti al clima locale — come il pino d’Aleppo, il mandorlo, l’ulivo e l’argan — non migliora soltanto il paesaggio. Le radici trattengono il suolo fertile contro l’erosione del vento, favoriscono l’umidità del terreno e proteggono le colture familiari dalle tempeste di sabbia.',
						'Perché [[questo sforzo collettivo]] dia frutti duraturi, occorre però affiancare alla piantumazione la vigilanza estiva contro gli incendi e il rispetto severo del patrimonio boschivo.'
					],
					glossary: [
						{ term: 'erosione', meaning: 'progressiva perdita del suolo fertile causata da vento o piogge' },
						{ term: 'piantumazione', meaning: 'messa a dimora ordinata di giovani alberi nel terreno' }
					],
					mainIdeaHeader: '1. Il documento illustra principalmente :',
					mainIdeaOptions: [
						'Il ruolo ecologico e agricolo della Diga Verde e la necessità di proteggere i boschi dagli incendi',
						'L’inutilità di piantare ulivi e pini d’Aleppo nelle regioni aride',
						'L’abbandono completo delle foreste da parte dei forestali e degli studenti'
					],
					mainIdeaCorrect:
						'Il ruolo ecologico e agricolo della Diga Verde e la necessità di proteggere i boschi dagli incendi',
					tfItems: [
						{
							q: 'La Diga Verde coinvolge soltanto macchine automatiche senza l’aiuto di cittadini o studenti.',
							a: 'Falso',
							c: 'Riunisce forestali, contadini e associazioni studentesche (§1).',
							mark: '0.5'
						},
						{
							q: 'Le specie scelte per il rimboschimento sono adattate al clima locale.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'Le radici degli alberi difendono il terreno dall’erosione e proteggono le colture dalla sabbia.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'Dopo aver piantato gli alberi non serve più alcuna cura durante l’estate.',
							a: 'Falso',
							c: 'Occorre affiancare la vigilanza estiva contro gli incendi e il rispetto dei boschi (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Quale problema ambientale contrasta il progetto della Diga Verde (§1)?',
							a: 'L’avanzata della siccità, la perdita di vegetazione e la minaccia della desertificazione.',
							mark: '0.75'
						},
						{
							q: 'b) Indica due benefici ecologici concreti svolti dalle radici e dalle chiome degli alberi (§2).',
							a: 'Trattengono il suolo fertile contro l’erosione, favoriscono l’umidità e proteggono le colture dalle tempeste di sabbia.',
							mark: '1'
						},
						{
							q: 'c) Che cosa è necessario fare dopo la piantumazione per garantire il successo nel tempo (§3)?',
							a: 'Assicurare la vigilanza estiva contro gli incendi e il rispetto del patrimonio boschivo.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «una barriera naturale viva» (§1)   b) «questo sforzo collettivo» (§3)',
					refAnswer:
						'a) «una barriera naturale viva» si riferisce alla fascia di alberi e vegetazione piantati nella Diga Verde per frenare il deserto.   b) «questo sforzo collettivo» rimanda alla collaborazione tra forestali, contadini e studenti nelle campagne di rimboschimento.',
					synthPrompt:
						'Come può il tuo liceo partecipare concretamente alle campagne nazionali per un’Algeria più verde e pulita? Rispondi in quattro o cinque righe.',
					synthAnswer:
						'Il nostro liceo può organizzare ogni autunno una giornata di piantumazione nel cortile e nei giardini del quartiere insieme ai forestali locali. Inoltre, gli studenti possono preparare cartelli educativi contro gli incendi estivi e prendersi cura regolarmente dei giovani alberi piantati.',
					quizzes: {
						easy: {
							q: 'Quali categorie di persone collaborano al progetto della Diga Verde secondo il paragrafo 1?',
							correct: 'Forestali, contadini e associazioni studentesche',
							wrong: [
								'Soltanto turisti stranieri di passaggio',
								'Unicamente industrie chimiche pesanti',
								'Nessun cittadino volontario'
							],
							explanation: 'تؤكد الفقرة الأولى تضافر جهود أعوان الغابات والفلاحين والجمعيات الطلابية.'
						} as McqSpec,
						medium: {
							q: 'Quale azione protettiva esercitano le radici degli alberi descritta nel paragrafo 2?',
							correct: 'Trattengono il suolo fertile contro l’erosione e aumentano l’umidità del terreno',
							wrong: [
								'Asciugano completamente l’acqua delle oasi',
								'Facilitano le tempeste di sabbia sui campi',
								'Distruggono le coltivazioni vicine'
							],
							explanation: 'تثبّت الجذور التربة الخصبة ضد التعرية وتحفظ رطوبتها.'
						} as McqSpec,
						hard: {
							q: 'Quale condizione pone il paragrafo 3 affinché il rimboschimento dia risultati durevoli?',
							correct: 'Unire alla piantumazione la sorveglianza estiva antincendio e la cura continua',
							wrong: [
								'Tagliare i boschi giovani prima dell’estate',
								'Sostituire tutti gli alberi con asfalto urbano',
								'Abbandonare i terreni subito dopo l’inverno'
							],
							explanation: 'تشير الخاتمة إلى أن التشجير لا يكفي وحده بلا حماية صيفية مستمرة من الحرائق.'
						} as McqSpec
					}
				},
				{
					title: 'Economia circolare e risparmio idrico : gesti quotidiani nei licei algerini',
					source: 'Adattato da una guida ecologica per gli istituti scolastici',
					paragraphs: [
						'La protezione della natura non dipende soltanto dai grandi accordi internazionali, ma inizia nei gesti semplici della vita scolastica. In diversi licei dell’Algeria, club ecologici giovanili applicano ogni settimana la regola delle tre R: ridurre gli sprechi, riutilizzare i materiali in buono stato e [[riciclare]] carta, plastica e vetro.',
						'Particolare attenzione è rivolta all’acqua potabile. Riparare subito un rubinetto che perde, raccogliere l’acqua piovana dai tetti per innaffiare le aiuole dell’istituto e chiudere l’acqua mentre ci si insapona sono piccole scelte che evitano migliaia di litri sprecati ogni mese.',
						'Così facendo, la scuola si trasforma in un laboratorio pratico di [[cittadinanza ambientale]], dimostrando che la sobrietà rende il futuro più sicuro per tutti.'
					],
					glossary: [
						{ term: 'aiuola', meaning: 'piccola zona di terra coltivata con piante o fiori in un giardino' },
						{ term: 'rubinetto', meaning: 'dispositivo che regola l’uscita dell’acqua' }
					],
					mainIdeaHeader: '1. Il testo invita gli studenti soprattutto a :',
					mainIdeaOptions: [
						'Praticare economia circolare e risparmio idrico attraverso gesti quotidiani concreti a scuola',
						'Attendere soltanto le decisioni lontane senza agire nei propri istituti',
						'Consumare più carta e acqua possibile durante le attività scolastiche'
					],
					mainIdeaCorrect:
						'Praticare economia circolare e risparmio idrico attraverso gesti quotidiani concreti a scuola',
					tfItems: [
						{
							q: 'La tutela ambientale dipende esclusivamente dagli accordi internazionali e non dai gesti quotidiani.',
							a: 'Falso',
							c: 'Non dipende soltanto dai grandi accordi, ma inizia nei gesti semplici della vita scolastica (§1).',
							mark: '0.5'
						},
						{
							q: 'La regola delle tre R comprende ridurre, riutilizzare e riciclare.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'Raccogliere l’acqua piovana per le aiuole aiuta a evitare lo spreco d’acqua potabile.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'Secondo la conclusione, la sobrietà nelle risorse indebolisce la vita scolastica.',
							a: 'Falso',
							c: 'La scuola diventa laboratorio di cittadinanza ambientale e la sobrietà rende il futuro più sicuro (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Che cosa significano i tre verbi della regola ecologica citata nel paragrafo 1?',
							a: 'Ridurre gli sprechi, riutilizzare i materiali ancora buoni e riciclare carta, plastica e vetro.',
							mark: '0.75'
						},
						{
							q: 'b) Cita due azioni concrete per risparmiare acqua negli istituti scolastici (§2).',
							a: 'Riparare subito i rubinetti che perdono, raccogliere l’acqua piovana per le aiuole e chiudere il rubinetto mentre ci si insapona.',
							mark: '1'
						},
						{
							q: 'c) Come viene definita la scuola nella conclusione (§3)?',
							a: 'Come un laboratorio pratico di cittadinanza ambientale.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «riciclare» (§1)   b) «cittadinanza ambientale» (§3)',
					refAnswer:
						'a) «riciclare» significa trasformare i rifiuti differenziati come carta, plastica e vetro in nuovi materiali riutilizzabili.   b) «cittadinanza ambientale» indica l’impegno consapevole e attivo dello studente nella cura quotidiana delle risorse naturali comuni.',
					synthPrompt:
						'Quali ostacoli incontrano talvolta le campagne di riciclaggio nei quartieri e come superarli? Rispondi in quattro o cinque righe.',
					synthAnswer:
						'Talvolta mancano contenitori ben distinti per carta, plastica e vetro oppure manca l’informazione chiara per le famiglie. Per superare questi ostacoli, il comune e i club scolastici possono installare punti di raccolta accessibili e spiegare con esempi semplici i vantaggi economici e sanitari della raccolta differenziata.',
					quizzes: {
						easy: {
							q: 'Quali tre materiali sono citati nel paragrafo 1 per il riciclaggio nei club scolastici?',
							correct: 'Carta, plastica e vetro',
							wrong: [
								'Carbone, benzina e gasolio',
								'Sabbia, pietre e nuvole',
								'Acqua piovana e sole'
							],
							explanation: 'تذكر الفقرة الأولى تدوير الورق والبلاستيك والزجاج في النوادي البيئية.'
						} as McqSpec,
						medium: {
							q: 'A quale scopo si propone di raccogliere l’acqua piovana dai tetti nel paragrafo 2?',
							correct: 'Per innaffiare le aiuole dell’istituto risparmiando acqua potabile',
							wrong: [
								'Per sprecare più energia elettrica',
								'Per allagare le aule scolastiche',
								'Per sostituire la raccolta differenziata della carta'
							],
							explanation: 'يُستفاد من مياه الأمطار في سقي المساحات الخضراء بالمدرسة حفاظاً على الماء الشروب.'
						} as McqSpec,
						hard: {
							q: 'Che cosa dimostra la trasformazione del liceo in laboratorio di cittadinanza ambientale secondo la conclusione?',
							correct: 'Che la pratica quotidiana della sobrietà rende più sicuro il futuro comune',
							wrong: [
								'Che i ragazzi non possono influire sull’ecologia locale',
								'Che il risparmio idrico è inutile nelle scuole',
								'Che soltanto le leggi internazionali proteggono i giardini'
							],
							explanation: 'تؤكد الخاتمة أن الممارسة العملية للترشيد تبني مواطنة بيئية مسؤولة.'
						} as McqSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const spec = chosen.quizzes[difficulty];
			const { quizQuestion, finalAnswer } = buildMcqPayload(
				spec,
				`اقرأ الأسئلة حول حماية البيئة والجزائر الخضراء واختر الإجابة الدقيقة: ${spec.q}`,
				'راجع الفكرة الأساسية للفقرة المذكورة وتجنب التعميمات المتطرفة.',
				rng
			);
			const openAnswer = chosen.openQuestions.map((x) => `${x.q.slice(0, 2)} ${x.a}`).join('\n');

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Comprensione del testo',
				points: 7,
				instruction:
					'Leggi attentamente il testo ecologico e rispondi alle domande seguenti (7 punti — BAC 3AS LE) :',
				content: [
					buildItalianPassageBlock({
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
						content: `3. Rispondi alle seguenti domande di comprensione :\n${chosen.openQuestions.map((x) => x.q).join('\n')}`,
						answer: openAnswer,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `4. Spiega il significato contestuale o il referente delle espressioni sottolineate :\n${chosen.refPrompt}`,
						answer: chosen.refAnswer,
						mark: '1'
					},
					{
						type: 'text',
						content: `5. Riflessione personale : ${chosen.synthPrompt}`,
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
				domain: 'comprensione_testo',
				examRole: 'comprehension',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'في أسئلة Vero / Falso، برّر كل إجابة «Falso» بالإشارة الدقيقة إلى الفقرة المعنية.',
					'ميّز بين أسباب التدهور البيئي وحلوله العملية في النص.',
					'اكتب الرأي الشخصي في 4–5 أسطر بإيطالية واضحة ومعللة.'
				],
				solutionStepsAr: [
					'تحديد الفكرة الرئيسية للنص (0.5 نقطة).',
					'الحكم والتبرير النصي في الصواب والخطأ (2 نقطتان).',
					'الإجابة التحليلية عن أسئلة الفهم الثلاثة (2.5 نقطة).',
					'شرح الإحالات النصية وصياغة الرأي الشخصي (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. COMPREHENSION (7 pti): Geografia del Mediterraneo & mondo del lavoro
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_tpl_3as_le_t3_comp_mediterraneo_lavoro',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'cultura_civilta',
		titleAr: 'فهم النص (7 نقاط — لغات أجنبية): جغرافيا المتوسط، التكوين المهني وعالم الشغل والمبادرة',
		curriculumLessonId: 'ita_lesson_3as_le_t3_mediterraneo_mondo_lavoro',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Formazione professionale e imprenditoria giovanile : costruire il lavoro onesto',
					source: 'Adattato da un’inchiesta sui nuovi mestieri dei giovani nel Mediterraneo',
					paragraphs: [
						'Al termine degli studi secondari, molti giovani credono che soltanto un lungo percorso teorico garantisca l’inserimento lavorativo. In realtà, le economie dell’Algeria e dei Paesi affacciati sul Mar Mediterraneo richiedono sempre più tecnici specializzati, artigiani qualificati ed esperti di manutenzione solare e informatica formati attraverso la [[formazione professionale]].',
						'Accanto all’impiego dipendente, cresce la cultura dell’imprenditoria giovanile responsabile. Riunendosi in piccole cooperative agricole, artigianali o di traduzione tecnica, diversi neo-diplomati uniscono le proprie competenze, condividono le spese iniziali e offrono servizi utili al proprio territorio.',
						'Perché [[tali iniziative]] abbiano successo nel tempo, occorrono tre qualità morali e pratiche: aggiornamento continuo, puntualità negli impegni presi e onestà verso i clienti e i collaboratori.'
					],
					glossary: [
						{ term: 'inserimento lavorativo', meaning: 'ingresso efficace di un giovane nel mondo del lavoro' },
						{ term: 'impiego dipendente', meaning: 'lavoro svolto alle dipendenze di un ente o di un’azienda' }
					],
					mainIdeaHeader: '1. Il testo sottolinea principalmente che :',
					mainIdeaOptions: [
						'La formazione professionale, le cooperative giovanili e l’etica del lavoro favoriscono l’occupazione',
						'La formazione pratica tecnica è inutile rispetto agli studi teorici isolati',
						'I giovani diplomati non possono mai collaborare in piccoli progetti locali'
					],
					mainIdeaCorrect:
						'La formazione professionale, le cooperative giovanili e l’etica del lavoro favoriscono l’occupazione',
					tfItems: [
						{
							q: 'Le economie mediterranee hanno bisogno anche di tecnici specializzati e artigiani qualificati.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'Le cooperative giovanili impediscono ai diplomati di dividere le spese iniziali.',
							a: 'Falso',
							c: 'Riunendosi in cooperative condividono le spese iniziali e uniscono le competenze (§2).',
							mark: '0.5'
						},
						{
							q: 'L’aggiornamento continuo e la puntualità aiutano le iniziative a durare nel tempo.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'Secondo il paragrafo 3, l’onestà verso i clienti è superflua negli affari.',
							a: 'Falso',
							c: 'L’onestà verso i clienti e i collaboratori è una delle tre qualità essenziali (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Quali figure professionali richiede oggi l’economia mediterranea oltre ai laureati teorici (§1)?',
							a: 'Tecnici specializzati, artigiani qualificati ed esperti di manutenzione solare e informatica.',
							mark: '0.75'
						},
						{
							q: 'b) Quali vantaggi offre il lavoro in piccola cooperativa per i giovani diplomati (§2)?',
							a: 'Permette di unire competenze diverse, condividere le spese iniziali e offrire servizi utili al territorio.',
							mark: '1'
						},
						{
							q: 'c) Cita le tre qualità indicate nel paragrafo 3 per il successo duraturo di un progetto.',
							a: 'Aggiornamento continuo, puntualità negli impegni e onestà verso clienti e collaboratori.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «formazione professionale» (§1)   b) «tali iniziative» (§3)',
					refAnswer:
						'a) «formazione professionale» indica l’apprendimento pratico e tecnico che prepara direttamente a un mestiere qualificato.   b) «tali iniziative» si riferisce alle piccole cooperative agricole, artigianali o di traduzione avviate dai giovani.',
					synthPrompt:
						'Quale progetto lavorativo o professionale ti piacerebbe sviluppare dopo gli studi di Lingue Straniere? Argomenta in quattro o cinque righe.',
					synthAnswer:
						'Dopo gli studi universitari, mi piacerebbe avviare un ufficio di traduzione tecnica e culturale arabo-italiano-francese insieme ad alcuni compagni di classe. Questo servizio aiuterebbe le aziende locali, gli editori e gli istituti culturali a collaborare con chiarezza e professionalità.',
					quizzes: {
						easy: {
							q: 'Le cooperative giovanili permettono ai neo-diplomati di unire competenze diverse e condividere le spese iniziali.',
							correctAnswer: true,
							explanation: 'صحيح: هذا ما توضحه الفقرة الثانية حول فائدة التعاونيات الشبابية.'
						} as TfSpec,
						medium: {
							q: 'Secondo il brano, l’economia mediterranea ha bisogno esclusivamente di laureati teorici senza tecnici né artigiani.',
							correctAnswer: false,
							explanation: 'خطأ: تشدد الفقرة الأولى على الحاجة المتزايدة للتقنيين والحرفيين المؤهلين.'
						} as TfSpec,
						hard: {
							q: 'Il successo duraturo dell’imprenditoria giovanile si fonda su aggiornamento continuo, puntualità e onestà professionale.',
							correctAnswer: true,
							explanation: 'صحيح: تلخص الفقرة الثالثة هذه القيم الثلاث الضرورية للاستمرارية.'
						} as TfSpec
					}
				},
				{
					title: 'L’Italia e l’Algeria sul Mar Mediterraneo : geografia degli scambi leciti',
					source: 'Adattato da una scheda geografica ed economica sul bacino mediterraneo',
					paragraphs: [
						'Affacciate sullo stesso mare, l’Algeria a sud e la penisola italiana a nord condividono una posizione geografica strategica nel cuore del Mar Mediterraneo. Mentre la costa orientale italiana è bagnata dal Mar Adriatico, la grande isola di Sicilia si trova proprio di fronte alle rotte marittime del Nord Africa, favorendo da sempre contatti rapidi e [[scambi pacifici]].',
						'Oltre al commercio lecito di prodotti agricoli genuini, macchinari industriali e materiali per l’energia pulita, i porti mediterranei ospitano una cooperazione crescente nella formazione tecnica, nella ricerca agronomica e nella tutela marina contro l’inquinamento.',
						'In questo scenario, conoscere la geografia fisica e parlare fluentemente sia l’arabo sia l’italiano diventa [[una risorsa preziosa]] per i giovani che desiderano lavorare nella logistica, nell’insegnamento e nella mediazione culturale.'
					],
					glossary: [
						{ term: 'penisola', meaning: 'terra circondata dal mare su tre lati e unita al continente su un lato' },
						{ term: 'logistica', meaning: 'organizzazione ordinata dei trasporti e delle merci' }
					],
					mainIdeaHeader: '1. Il testo mette in luce soprattutto :',
					mainIdeaOptions: [
						'La posizione geografica mediterranea tra Algeria e Italia e il valore economico-linguistico della cooperazione',
						'L’isolamento completo della Sicilia dalle rotte marittime nordafricane',
						'L’inutilità di studiare l’italiano per i mestieri della cooperazione'
					],
					mainIdeaCorrect:
						'La posizione geografica mediterranea tra Algeria e Italia e il valore economico-linguistico della cooperazione',
					tfItems: [
						{
							q: 'La costa orientale della penisola italiana è bagnata dal Mar Adriatico.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'La Sicilia è completamente lontana dalle rotte marittime tra Nord Africa ed Europa.',
							a: 'Falso',
							c: 'La Sicilia si trova proprio di fronte alle rotte del Nord Africa favorendo contatti rapidi (§1).',
							mark: '0.5'
						},
						{
							q: 'La cooperazione include anche ricerca agronomica, energia pulita e tutela del mare.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'Parlare sia arabo sia italiano non offre vantaggi nei settori dell’insegnamento o della logistica.',
							a: 'Falso',
							c: 'Diventa una risorsa preziosa per lavorare nella logistica, nell’insegnamento e nella mediazione culturale (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Quali due mari e quale grande isola cita il testo descrivendo la posizione geografica dell’Italia (§1)?',
							a: 'Il Mar Mediterraneo, il Mar Adriatico e l’isola di Sicilia.',
							mark: '0.75'
						},
						{
							q: 'b) Menziona tre settori di cooperazione tra le due sponde indicati nel paragrafo 2.',
							a: 'Commercio di prodotti agricoli e macchinari, energia pulita, formazione tecnica, ricerca agronomica e tutela marina.',
							mark: '1'
						},
						{
							q: 'c) In quali tre ambiti professionali aiuta la conoscenza bilingue arabo-italiana (§3)?',
							a: 'Nella logistica, nell’insegnamento e nella mediazione culturale.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «scambi pacifici» (§1)   b) «una risorsa preziosa» (§3)',
					refAnswer:
						'a) «scambi pacifici» indica i rapporti commerciali, culturali e scientifici basati sul rispetto reciproco attraverso il Mediterraneo.   b) «una risorsa preziosa» si riferisce alla conoscenza della geografia mediterranea unita alla padronanza dell’arabo e dell’italiano.',
					synthPrompt:
						'Perché lo studio della geografia dei Paesi di cui impariamo la lingua completa la formazione in 3AS LE? Rispondi in quattro o cinque righe.',
					synthAnswer:
						'Conoscere la geografia dell’Italia e del Mediterraneo aiuta a collocare nello spazio la storia, l’economia e le città citate nei testi. Inoltre, collega l’apprendimento della lingua italiana alle reali prospettive di scambio scientifico, agricolo e professionale con l’Algeria.',
					quizzes: {
						easy: {
							q: 'Secondo il testo, l’isola di Sicilia occupa una posizione strategica lungo le rotte marittime tra Nord Africa e penisola italiana.',
							correctAnswer: true,
							explanation: 'صحيح: تبرز الفقرة الأولى موقع صقلية المحوري في حوض المتوسط.'
						} as TfSpec,
						medium: {
							q: 'Il brano afferma che la cooperazione mediterranea esclude la tutela marina e la ricerca agronomica.',
							correctAnswer: false,
							explanation: 'خطأ: الفقرة الثانية تذكر صراحة البحث الزراعي وحماية البحر من التلوث.'
						} as TfSpec,
						hard: {
							q: 'La padronanza congiunta di arabo e italiano rappresenta un vantaggio diretto per logistica, insegnamento e mediazione culturale.',
							correctAnswer: true,
							explanation: 'صحيح: هذه المهن الثلاث تذكرها الخاتمة بوصفها مجالات واعدة للخريجين.'
						} as TfSpec
					}
				},
				{
					title: 'I nuovi mestieri verdi e digitali : adattarsi con etica e competenza',
					source: 'Adattato da un articolo sull’orientamento scolastico e lavorativo',
					paragraphs: [
						'Il mondo del lavoro cambia rapidamente sotto la spinta della transizione ecologica e della trasformazione digitale. Accanto ai mestieri tradizionali dell’edilizia, dell’agricoltura e dell’artigianato, nascono oggi [[professioni emergenti]] legate al risparmio energetico, al riciclaggio organizzato, all’educazione online e alla sicurezza informatica.',
						'Di fronte a questi cambiamenti, l’orientamento scolastico ricorda agli studenti che nessun diploma finale chiude il tempo dello studio. Saper lavorare in gruppo, rispettare i tempi di consegna e continuare ad aggiornarsi rappresentano qualità richieste in qualsiasi impresa seria.',
						'Allo stesso tempo, la dignità del lavoro risiede sempre nella sua utilità sociale: servire con onestà la propria comunità nobilita tanto il lavoro manuale quanto [[la ricerca tecnologica]].'
					],
					glossary: [
						{ term: 'orientamento', meaning: 'guida che aiuta lo studente a scegliere gli studi e il futuro mestiere' },
						{ term: 'nobilitare', meaning: 'rendere degno di stima e di rispetto morale' }
					],
					mainIdeaHeader: '1. Il messaggio centrale del brano afferma che :',
					mainIdeaOptions: [
						'L’adattamento ai nuovi mestieri verdi e digitali esige apprendimento continuo, lavoro di squadra ed etica',
						'Una volta ottenuto il diploma non bisogna più aggiornare le proprie conoscenze',
						'Solo il lavoro digitale possiede dignità mentre i mestieri manuali sono inferiori'
					],
					mainIdeaCorrect:
						'L’adattamento ai nuovi mestieri verdi e digitali esige apprendimento continuo, lavoro di squadra ed etica',
					tfItems: [
						{
							q: 'La transizione ecologica e digitale fa nascere nuove professioni nel risparmio energetico e nella sicurezza dei dati.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'Secondo l’orientamento scolastico, dopo il diploma lo studente non ha più bisogno di aggiornarsi.',
							a: 'Falso',
							c: 'Nessun diploma finale chiude il tempo dello studio e occorre continuare ad aggiornarsi (§2).',
							mark: '0.5'
						},
						{
							q: 'Saper lavorare in gruppo e rispettare le scadenze è apprezzato in ogni impresa seria.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'Il testo disprezza il lavoro manuale rispetto alla ricerca tecnologica.',
							a: 'Falso',
							c: 'Servire con onestà la comunità nobilita tanto il lavoro manuale quanto la ricerca tecnologica (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Cita tre nuove professioni emergenti menzionate nel primo paragrafo.',
							a: 'Professioni legate al risparmio energetico, al riciclaggio organizzato, all’educazione online e alla sicurezza informatica.',
							mark: '0.75'
						},
						{
							q: 'b) Quali tre competenze trasversali richiede ogni impresa seria secondo il paragrafo 2?',
							a: 'Saper lavorare in gruppo, rispettare i tempi di consegna e continuare ad aggiornarsi.',
							mark: '1'
						},
						{
							q: 'c) Da che cosa dipende la vera dignità di qualsiasi mestiere nella conclusione (§3)?',
							a: 'Dalla sua utilità sociale e dall’onestà nel servire la propria comunità.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «professioni emergenti» (§1)   b) «la ricerca tecnologica» (§3)',
					refAnswer:
						'a) «professioni emergenti» indica i nuovi impieghi creati recentemente dallo sviluppo ambientale e informatico.   b) «la ricerca tecnologica» si riferisce allo studio scientifico applicato alle innovazioni tecniche e digitali, messo sullo stesso piano di dignità del lavoro manuale onesto.',
					synthPrompt:
						'Quali qualità personali ritieni più utili per affrontare con fiducia il passaggio dal liceo al mondo del lavoro? Rispondi in quattro o cinque righe.',
					synthAnswer:
						'Ritengo fondamentali la curiosità di imparare sempre cose nuove, la puntualità e la capacità di ascoltare i colleghi in un gruppo di lavoro. Inoltre, mantenere l’onestà e la cura dei dettagli aiuta ad acquisire fiducia e stabilità professionale in qualsiasi settore.',
					quizzes: {
						easy: {
							q: 'Le professioni emergenti citate nel paragrafo 1 riguardano anche il risparmio energetico, il riciclaggio e la sicurezza informatica.',
							correctAnswer: true,
							explanation: 'صحيح: تعدد الفقرة الأولى هذه المجالات الحديثة للعمل.'
						} as TfSpec,
						medium: {
							q: 'Il paragrafo 2 dichiara che dopo l’esame finale lo studio e l’aggiornamento non servono più.',
							correctAnswer: false,
							explanation: 'خطأ: يؤكد النص ضرورة التعلم والتحديث المستمر للمهارات بعد التخرج.'
						} as TfSpec,
						hard: {
							q: 'Nella conclusione si afferma che l’utilità sociale e l’onestà rendono ugualmente degni tanto il lavoro manuale quanto la ricerca tecnologica.',
							correctAnswer: true,
							explanation: 'صحيح: قيمة العمل تُقاس بالإتقان والأمانة ونفع المجتمع في كافة المهن.'
						} as TfSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const spec = chosen.quizzes[difficulty];
			const { quizQuestion, finalAnswer } = buildTfPayload(spec);
			const openAnswer = chosen.openQuestions.map((x) => `${x.q.slice(0, 2)} ${x.a}`).join('\n');

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Comprensione del testo',
				points: 7,
				instruction:
					'Leggi attentamente il testo e rispondi con precisione alle domande (7 punti — BAC 3AS LE) :',
				content: [
					buildItalianPassageBlock({
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
						content: `3. Rispondi alle seguenti domande di comprensione :\n${chosen.openQuestions.map((x) => x.q).join('\n')}`,
						answer: openAnswer,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `4. Spiega il referente o il senso contestuale delle espressioni sottolineate :\n${chosen.refPrompt}`,
						answer: chosen.refAnswer,
						mark: '1'
					},
					{
						type: 'text',
						content: `5. Riflessione personale : ${chosen.synthPrompt}`,
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
				domain: 'cultura_civilta',
				examRole: 'comprehension',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'راجع المعطيات الجغرافية والمهنية بدقة في الفقرتين الأولى والثانية.',
					'برّر كل جملة «Falso» بالمعلومة المقابلة من النص.',
					'في الرأي الشخصي، قدّم موقفاً واضحاً ومدعوماً بأمثلة واقعية في 4–5 أسطر.'
				],
				solutionStepsAr: [
					'تحديد الفكرة الرئيسية (0.5 نقطة).',
					'الحكم والتبرير النصي في الصواب والخطأ (2 نقطتان).',
					'الإجابة عن أسئلة الفهم الثلاثة (2.5 نقطة).',
					'شرح الإحالات النصية وصياغة الرأي الشخصي (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. LINGUISTIC COMPETENCE (7 pti): Lessico ecologia/lavoro + pronomi combinati
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_tpl_3as_le_t3_ling_lessico_ecologia_lavoro',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'lessico_morfologia',
		titleAr: 'الكفاءة اللغوية (7 نقاط — لغات أجنبية): معجم البيئة والعمل، الاشتقاق، والضمائر المركبة وCI/NE',
		curriculumLessonId: 'ita_lesson_3as_le_t3_ambiente_energie_algeria_verde',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					classPrompt:
						'1. Classifica le seguenti parole secondo appartengano al Campo dell’ecologia o al Mondo del lavoro : rimboschimento - cooperativa - riciclaggio - apprendistato - pannello solare - qualifica.',
					classCols: [
						{ header: 'Ecologia e ambiente', items: ['rimboschimento', 'riciclaggio', 'pannello solare'], mark: '0.5' },
						{ header: 'Mondo del lavoro', items: ['cooperativa', 'apprendistato', 'qualifica'], mark: '0.5' }
					],
					wordRows: [
						{
							verbo: { given: true, value: 'rinnovare' },
							sostantivo: { value: 'rinnovamento', mark: '0.25' },
							aggettivo: { value: 'rinnovabile', mark: '0.25' }
						},
						{
							verbo: { value: 'lavorare', mark: '0.25' },
							sostantivo: { given: true, value: 'lavoro' },
							aggettivo: { value: 'lavorativo', mark: '0.25' }
						},
						{
							verbo: { value: 'sostenere', mark: '0.25' },
							sostantivo: { value: 'sostenibilità', mark: '0.25' },
							aggettivo: { given: true, value: 'sostenibile' }
						}
					],
					lexPrompt:
						'3. Lessico in contesto :\na) Trova un sinonimo (stessa categoria) di : tutelare (verbo) - scarsità (sost.).\nb) Forma il contrario mediante un prefisso adatto : esauribile - inquinato - occupazione - utile.',
					lexAnswer:
						'a) tutelare = proteggere / difendere | scarsità = mancanza / carenza.\nb) inesauribile, disinquinato (o pulito / incontaminato), disoccupazione, inutile.',
					grammarPrompt:
						'4. Sostituisci le parole sottolineate con un pronome combinato oppure con CI / NE :\na) Ho portato gli appunti sul riciclaggio a Nadia. (Sostituisci «gli appunti» e «a Nadia»)\nb) Quanti alberi avete piantato nel cortile? — Abbiamo piantato dodici alberi.\nc) Pensi spesso al tuo futuro professionale? — Sì, penso sempre al mio futuro professionale.',
					grammarAnswer:
						'a) Glieli ho portati (accordo con gli appunti).\nb) Ne abbiamo piantati dodici (accordo del participio con alberi).\nc) Sì, ci penso sempre.',
					clozePrompt:
						'5. Completa il testo con i vocaboli esatti : acqua / solare / cooperative / deserto.\nSugli altipiani e nel (1) .........., l’energia (2) .......... alimenta il pompaggio dell’ (3) .......... agricola e sostiene le nuove (4) .......... di giovani tecnici.',
					clozeAnswer: '1) deserto   2) solare   3) acqua   4) cooperative',
					quizzes: {
						easy: {
							q: 'Collega ogni parola al suo contrario formato con il prefisso corretto:',
							pairs: [
								{ left: 'esauribile', right: 'inesauribile' },
								{ left: 'occupazione', right: 'disoccupazione' },
								{ left: 'utile', right: 'inutile' },
								{ left: 'sostenibile', right: 'insostenibile' }
							],
							explanation: 'السابقتان in- و dis- تشكلان الأضداد القياسية لمفردات البيئة والعمل.'
						} as MatchingSpec,
						medium: {
							q: 'Associa ciascun verbo alla famiglia lessicale corretta (Sostantivo / Aggettivo):',
							pairs: [
								{ left: 'rinnovare', right: 'rinnovamento / rinnovabile' },
								{ left: 'riciclare', right: 'riciclaggio / riciclabile' },
								{ left: 'cooperare', right: 'cooperazione / cooperativo' },
								{ left: 'inquinare', right: 'inquinamento / inquinante' }
							],
							explanation: 'إتقان اللواحق (-mento, -aggio, -zione, -bile, -ivo, -ante) يحسم جدول الاشتقاق.'
						} as MatchingSpec,
						hard: {
							q: 'Abbina ciascuna frase alla sostituzione pronominale corretta (pronomi combinati / CI / NE):',
							pairs: [
								{ left: 'Do il libro a Marco', right: 'Glielo do' },
								{ left: 'Ho letto tre articoli', right: 'Ne ho letti tre' },
								{ left: 'Vado in biblioteca', right: 'Ci vado' },
								{ left: 'Presto le penne a Sofia', right: 'Gliele presto' }
							],
							explanation: 'تذكر: «a lui/a lei» تصبح «glie-»، والكميات تأخذ «ne» مع مطابقة اسم المفعول، والمكان يأخذ «ci».'
						} as MatchingSpec
					}
				},
				{
					classPrompt:
						'1. Classifica le seguenti azioni secondo rappresentino Risparmio ecologico o Spreco dannoso : raccolta differenziata - rubinetto aperto invano - pannello fotovoltaico - taglio abusivo - irrigazione mirata - plastica abbandonata.',
					classCols: [
						{ header: 'Risparmio e tutela', items: ['raccolta differenziata', 'pannello fotovoltaico', 'irrigazione mirata'], mark: '0.5' },
						{ header: 'Spreco e degrado', items: ['rubinetto aperto invano', 'taglio abusivo', 'plastica abbandonata'], mark: '0.5' }
					],
					wordRows: [
						{
							verbo: { given: true, value: 'risparmiare' },
							sostantivo: { value: 'risparmio', mark: '0.25' },
							aggettivo: { value: 'risparmioso', mark: '0.25' }
						},
						{
							verbo: { value: 'formare', mark: '0.25' },
							sostantivo: { given: true, value: 'formazione' },
							aggettivo: { value: 'formativo', mark: '0.25' }
						},
						{
							verbo: { value: 'occupare', mark: '0.25' },
							sostantivo: { value: 'occupazione', mark: '0.25' },
							aggettivo: { given: true, value: 'occupazionale' }
						}
					],
					lexPrompt:
						'3. Lessico in contesto :\na) Dai un sinonimo di : mitigare (verbo) - mestiere (sost.).\nb) Forma il contrario con prefisso di : qualificato - puntuale - responsabile - ordinato.',
					lexAnswer:
						'a) mitigare = attenuare / ridurre | mestiere = professione / lavoro.\nb) squalificato (o non qualificato), impuntuale, irresponsabile, disordinato.',
					grammarPrompt:
						'4. Completa con i pronomi combinati e accorda i participi :\na) «Ragazzi, chi ha consegnato le schede verdi al preside?» — «......... abbiamo ......... noi stamattina.»\nb) «Hai parlato ai tuoi compagni del progetto agricolo?» — «Sì, ......... ho parlato ieri.»\nc) «Quante bottiglie di vetro avete riciclato?» — «......... abbiamo ......... venti.»',
					grammarAnswer:
						'a) Gliele abbiamo consegnate.\nb) gliene ho parlato (gli + ne = gliene).\nc) Ne abbiamo riciclate venti (accordo con bottiglie, f. pl.).',
					clozePrompt:
						'5. Completa le frasi con : Mediterraneo / squadra / risorse / eolica.\nL’energia (1) .......... sfrutta la forza del vento lungo le coste del (2) ........... Nei nuovi mestieri tecnici, lavorare in (3) .......... protegge meglio le (4) .......... naturali.',
					clozeAnswer: '1) eolica   2) Mediterraneo   3) squadra   4) risorse',
					quizzes: {
						easy: {
							q: 'Collega ogni sostantivo o aggettivo al suo contrario con prefisso:',
							pairs: [
								{ left: 'puntuale', right: 'impuntuale' },
								{ left: 'responsabile', right: 'irresponsabile' },
								{ left: 'ordinato', right: 'disordinato' },
								{ left: 'fedele', right: 'infedele' }
							],
							explanation: 'تُطبق قواعد التماثل الصوتي للسابقة in- (im-, ir-) والسابقة dis-.'
						} as MatchingSpec,
						medium: {
							q: 'Abbina ciascun pronome combinato alla sua coppia originaria corretta:',
							pairs: [
								{ left: 'me lo', right: 'a me + lo' },
								{ left: 'te la', right: 'a te + la' },
								{ left: 'glieli', right: 'a lui/lei/loro + li' },
								{ left: 'ce ne', right: 'a noi + ne' }
							],
							explanation: 'تتغير mi, ti, ci, vi إلى me, te, ce, ve، بينما تتحول gli/le إلى glie- دائماً.'
						} as MatchingSpec,
						hard: {
							q: 'Associa ciascun termine economico-ambientale alla sua definizione esatta:',
							pairs: [
								{ left: 'erosione', right: 'perdita progressiva dello strato fertile del suolo' },
								{ left: 'filiera corta', right: 'vendita dal produttore locale al consumatore' },
								{ left: 'apprendistato', right: 'formazione pratica guidata in bottega o azienda' },
								{ left: 'rimboschimento', right: 'piantumazione ordinata di nuovi boschi' }
							],
							explanation: 'الدقة الدلالية لهذه المصطلحات أساسية في أسئلة الفهم والتلخيص.'
						} as MatchingSpec
					}
				},
				{
					classPrompt:
						'1. Classifica i seguenti elementi secondo siano Misure ecologiche o Competenze lavorative : energia fotovoltaica - puntualità negli impegni - raccolta dell’acqua piovana - lavoro di squadra - tutela forestale - aggiornamento tecnico.',
					classCols: [
						{ header: 'Misure ecologiche', items: ['energia fotovoltaica', 'raccolta dell’acqua piovana', 'tutela forestale'], mark: '0.5' },
						{ header: 'Competenze lavorative', items: ['puntualità negli impegni', 'lavoro di squadra', 'aggiornamento tecnico'], mark: '0.5' }
					],
					wordRows: [
						{
							verbo: { given: true, value: 'proteggere' },
							sostantivo: { value: 'protezione', mark: '0.25' },
							aggettivo: { value: 'protettivo', mark: '0.25' }
						},
						{
							verbo: { value: 'riciclare', mark: '0.25' },
							sostantivo: { given: true, value: 'riciclaggio' },
							aggettivo: { value: 'riciclabile', mark: '0.25' }
						},
						{
							verbo: { value: 'impiegare', mark: '0.25' },
							sostantivo: { value: 'impiego', mark: '0.25' },
							aggettivo: { given: true, value: 'impiegabile' }
						}
					],
					lexPrompt:
						'3. Lessico in contesto :\na) Indica un sinonimo di : avviare (verbo) - duraturo (agg.).\nb) Forma il contrario aggiungendo un prefisso : abitabile - stabile - legale - adatto.',
					lexAnswer:
						'a) avviare = iniziare / lanciare | duraturo = durevole / permanente.\nb) inabitabile, instabile, illegale, inadatto.',
					grammarPrompt:
						'4. Completa scegliendo il pronome giusto e il connettivo adatto :\na) «Mi presti il manuale sulle energie pulite?» — «Sì, ......... presto subito!» (pronome combinato a «a te + lo»)\nb) Unisci con un connettivo concessivo adatto al congiuntivo : «Il lavoro iniziale è impegnativo. I giovani non si scoraggiano.»\nc) Sostituisci «delle energie pulite» con il pronome adatto : «Tutti parlano volentieri delle energie pulite.» diventa «Tutti ......... parlano volentieri.»',
					grammarAnswer:
						'a) te lo presto subito!\nb) Benché (o Sebbene) il lavoro iniziale sia impegnativo, i giovani non si scoraggiano.\nc) ne.',
					clozePrompt:
						'5. Completa le frasi con : futuro / radici / suolo / Sicilia.\nLa grande isola di (1) .......... guarda verso le coste del Maghreb. Sul continente, le (2) .......... degli alberi trattengono il (3) .......... fertile e proteggono il (4) .......... agricolo.',
					clozeAnswer: '1) Sicilia   2) radici   3) suolo   4) futuro',
					quizzes: {
						easy: {
							q: 'Collega ciascun aggettivo al suo contrario con prefisso:',
							pairs: [
								{ left: 'abitabile', right: 'inabitabile' },
								{ left: 'stabile', right: 'instabile' },
								{ left: 'legale', right: 'illegale' },
								{ left: 'adatto', right: 'inadatto' }
							],
							explanation: 'أمام الحرف l تصبح السابقة il- (illegale)، وتبقى in- أمام a و s.'
						} as MatchingSpec,
						medium: {
							q: 'Associa ciascun verbo al sostantivo derivato corrispondente:',
							pairs: [
								{ left: 'proteggere', right: 'protezione' },
								{ left: 'impiegare', right: 'impiego' },
								{ left: 'risparmiare', right: 'risparmio' },
								{ left: 'dirigere', right: 'direzione' }
							],
							explanation: 'انتبه لاشتقاقات الأسماء من الأفعال الشاذة مثل proteggere -> protezione و dirigere -> direzione.'
						} as MatchingSpec,
						hard: {
							q: 'Abbina ciascun connettivo alla sua struttura sintattica obbligatoria:',
							pairs: [
								{ left: 'Benché / Sebbene', right: 'Richiedono il congiuntivo' },
								{ left: 'Poiché / Siccome', right: 'Richiedono l’indicativo (causa)' },
								{ left: 'A causa di / Grazie a', right: 'Seguiti da sintagma nominale' },
								{ left: 'Pertanto / Quindi', right: 'Introducono la conseguenza logica' }
							],
							explanation: 'التفريق بين الروابط التي تتطلب Congiuntivo والتي تتطلب Indicativo أو اسماً أساسي في البكالوريا.'
						} as MatchingSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const { quizQuestion, finalAnswer } = buildMatchingPayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'II. Competenza linguistica — A) Lessico, derivazione e pronomi',
				points: 7,
				instruction:
					'Svolgi con rigore le seguenti attività lessicali, morfologiche e pronominali (7 punti — BAC 3AS LE) :',
				content: [
					{
						type: 'text',
						content: chosen.classPrompt
					},
					buildItalianClassificationTableBlock({ columns: chosen.classCols }),
					{
						type: 'text',
						content: '2. Completa la tabella morfologica (famiglia di parole) :'
					},
					buildItalianWordFamilyTableBlock(chosen.wordRows),
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
				domain: 'lessico_morfologia',
				examRole: 'linguistic_competence',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكر مطابقة اسم المفعول مع الضمائر المباشرة والضمير الكمي «ne» في الزمن المركب (Ne ho piantati dodici).',
					'في الضمائر المركبة: mi, ti, ci, vi تصبح me, te, ce, ve؛ و gli / le تصبح glie- قبل lo, la, li, le, ne.',
					'طابق الفئة النحوية في المرادفات والأضداد.'
				],
				solutionStepsAr: [
					'التصنيف المعجمي الصحيح في الجدول (1 نقطة).',
					'إكمال جدول عائلة الكلمات الثلاثي (1.5 نقطة).',
					'المرادفات والأضداد بالسوابق المناسبة (1.5 نقطة).',
					'توظيف الضمائر المركبة وCI/NE وإكمال الفقرة (3 نقاط).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. LINGUISTIC COMPETENCE (7 pti): Periodo ipotetico & connettivi (with SVG)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_tpl_3as_le_t3_ling_periodo_ipotetico_pronomi',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'grammatica_sintassi',
		titleAr: 'الكفاءة اللغوية (7 نقاط — لغات أجنبية): الجملة الشرطية بأنواعها الثلاثة، الضمائر المركبة والروابط الحجاجية',
		curriculumLessonId: 'ita_lesson_3as_le_t3_periodo_ipotetico_pronomi_connettivi',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					mapTitle: 'Periodo Ipotetico e Sintassi BAC (3AS LE)',
					mapRoot: 'I tre tipi del periodo ipotetico',
					mapSub: 'Mai usare il condizionale dopo il SE ipotetico',
					mapBranches: [
						{ label: '1º Realtà', rule: 'Se + Ind. -> Ind./Imp.', example: 'Se studi, riuscirai.' },
						{ label: '2º Possibilità', rule: 'Se + Cong.imp. -> Cond.pr.', example: 'Se studiassi, riusciresti.' },
						{ label: '3º Irrealtà', rule: 'Se + Cong.trap. -> Cond.pa.', example: 'Se avessi studiato...' },
						{ label: 'Connettivi', rule: 'Causa / Effetto / Conc.', example: 'Benché piova, parto.' }
					],
					classPrompt:
						'1. Classifica le seguenti frasi ipotetiche secondo appartengano al 1º tipo (realtà) o al 2º / 3º tipo (possibilità / irrealtà) : Se risparmiamo acqua, proteggiamo le oasi - Se avessimo piantato più pini, avremmo frenato l’erosione - Se imparassi un mestiere, apriresti una bottega - Se rispettate gli orari, finirete in tempo - Se avessi controllato i dati, non avresti sbagliato - Se studiassi con costanza, otterresti voti migliori.',
					classCols: [
						{
							header: '1º Tipo (Realtà)',
							items: ['Se risparmiamo acqua, proteggiamo le oasi', 'Se rispettate gli orari, finirete in tempo'],
							mark: '0.75'
						},
						{
							header: '2º e 3º Tipo (Possibilità / Irrealtà)',
							items: [
								'Se avessimo piantato più pini, avremmo frenato l’erosione',
								'Se imparassi un mestiere, apriresti una bottega',
								'Se avessi controllato i dati, non avresti sbagliato',
								'Se studiassi con costanza, otterresti voti migliori'
							],
							mark: '0.75'
						}
					],
					conjPrompt:
						'2. Coniuga i verbi tra parentesi rispettando i tre tipi del periodo ipotetico :\na) (1º tipo) Se il comune (installare) nuovi pannelli solari, risparmierà molta energia.\nb) (2º tipo) Se noi (collaborare) in una cooperativa, (ridurre) subito i costi iniziali.\nc) (3º tipo) Se gli studenti (verificare) quella notizia ieri, non la (condividere).\nd) (2º tipo) Se tu (essere) più paziente, capiresti meglio il testo.',
					conjAnswer:
						'a) installerà (o installa).\nb) collaborassimo / ridurremmo.\nc) avessero verificato / avrebbero condiviso.\nd) fossi.',
					transformPrompt:
						'3. Trasforma dal 1º tipo al 2º tipo e poi al 3º tipo, oppure inserisci il connettivo adatto :\na) «Se lavorerete in squadra, completerete il progetto verde.» (Passa al 2º tipo e al 3º tipo)\nb) Unisci con il connettivo opportuno (Poiché / Benché / Pertanto) : «......... i rubinetti perdessero acqua, nessuno li aveva ancora riparati.»',
					transformAnswer:
						'a) 2º tipo : Se lavoraste in squadra, completereste il progetto verde. | 3º tipo : Se aveste lavorato in squadra, avreste completato il progetto verde.\nb) Benché (congiuntivo imperfetto «perdessero»).',
					clozePrompt:
						'4. Completa il testo con : pertanto / avessero / glielo / fossi.\nSe io (1) .......... nel comitato scolastico, proporrei subito un punto di raccolta differenziata. Se l’anno scorso i ragazzi lo (2) .......... già creato, oggi il cortile sarebbe più pulito. Ho scritto l’idea al preside e (3) .......... ho consegnato stamattina; (4) .........., speriamo di cominciare presto.',
					clozeAnswer: '1) fossi   2) avessero   3) glielo   4) pertanto',
					quizzes: {
						easy: {
							q: 'Completa correttamente la protasi del 2º tipo del periodo ipotetico:',
							sentence: 'Se i cittadini ___ più acqua ogni giorno, le riserve durerebbero più a lungo.',
							correct: 'risparmiassero',
							distractors: ['risparmierebbero', 'risparmieranno', 'risparmiano'],
							explanation: 'النوع الثاني (Possibilità) يفرض Congiuntivo imperfetto بعد «Se»: «risparmiassero» (وممنوع Condizionale بعد Se).'
						} as ClozeSpec,
						medium: {
							q: 'Completa correttamente l’apodosi del 3º tipo (irrealtà nel passato):',
							sentence: 'Se avessi studiato con metodo tutto l’anno, ieri ___ un risultato eccellente.',
							correct: 'avresti ottenuto',
							distractors: ['otterrai', 'ottieni', 'otterresti'],
							explanation: 'مع الشرط المستحيل في الماضي «Se avessi studiato» نستخدم Condizionale passato في الجواب: «avresti ottenuto».'
						} as ClozeSpec,
						hard: {
							q: 'Scegli il connettivo concessivo compatibile con il congiuntivo imperfetto:',
							sentence: '___ il progetto richiedesse molto impegno, i giovani volontari lo portarono a termine.',
							correct: 'Benché',
							distractors: ['Poiché', 'Siccome', 'Pertanto'],
							explanation: 'الرابط الاعتراضي «Benché» يأخذ Congiuntivo (richiedesse)، أما Poiché و Siccome و Pertanto فتأخذ Indicativo.'
						} as ClozeSpec
					}
				},
				{
					mapTitle: 'Periodo Ipotetico Misto e Connettivi',
					mapRoot: 'Relazione tra condizione e conseguenza',
					mapSub: 'Attenzione al tempo espresso da ogni parte',
					mapBranches: [
						{ label: 'Passato -> Oggi', rule: 'Se + Cong.trap. -> Cond.pr.', example: 'Se avessi letto, sapresti.' },
						{ label: 'Imperativo (1º)', rule: 'Se + Pres. -> Imperativo', example: 'Se puoi, aiuta gli altri.' },
						{ label: 'A condizione che', rule: 'purché + Congiuntivo', example: 'Vengo purché tu studi.' },
						{ label: 'Pronomi combinati', rule: 'glielo, me ne, ce li', example: 'Ce li hanno mandati.' }
					],
					classPrompt:
						'1. Distingui i connettivi che esprimono Causa da quelli che esprimono Concessione o Opposizione : poiché - benché - siccome - sebbene - dato che - tuttavia.',
					classCols: [
						{ header: 'Causa', items: ['poiché', 'siccome', 'dato che'], mark: '0.75' },
						{ header: 'Concessione / Opposizione', items: ['benché', 'sebbene', 'tuttavia'], mark: '0.75' }
					],
					conjPrompt:
						'2. Completa rispettando i tipi ipotetici e il periodo ipotetico misto :\na) (3º tipo) Se ieri gli operai (riparare) il rubinetto, non (sprecarsi) tanta acqua.\nb) (Misto : condizione passata e risultato attuale) Se due anni fa Marco (imparare) l’italiano con serietà, oggi (parlare) con sicurezza.\nc) (1º tipo con imperativo) Se (trovare, tu) un errore nella bozza, (correggere, tu) subito!\nd) (2º tipo) Se il nostro liceo (avere) un giardino più ampio, vi pianteremmo dieci ulivi.',
					conjAnswer:
						'a) avessero riparato / si sarebbe sprecata.\nb) avesse imparato / parlerebbe.\nc) trovi / correggilo (o correggi).\nd) avesse.',
					transformPrompt:
						'3. Esegui le trasformazioni sintattiche richieste :\na) Sostituisci «Se» con «Purché» : «Ti presto il dizionario se me lo restituisci domani.»\nb) Sostituisci i complementi sottolineati : «Avete portato i vasi in ceramica alla mostra?» diventa «Sì, ......... abbiamo ......... stamattina.» (lì alla mostra + i vasi)',
					transformAnswer:
						'a) Ti presto il dizionario purché tu me lo restituisca domani (congiuntivo dopo purché).\nb) Sì, ce li abbiamo portati stamattina (ci per il luogo alla mostra e li per i vasi formano ce li).',
					clozePrompt:
						'4. Completa con : purché / ne / sarebbe / avessimo.\nSe (1) .......... cominciato il rimboschimento dieci anni fa, oggi la collina (2) .......... già coperta di pini. I volontari torneranno sabato prossimo, (3) .......... il tempo resti asciutto. Quante piantine mancano? — Credo che (4) .......... manchino ancora trenta.',
					clozeAnswer: '1) avessimo   2) sarebbe   3) purché   4) ne',
					quizzes: {
						easy: {
							q: 'Scegli il connettivo condizionale che richiede obbligatoriamente il congiuntivo:',
							sentence: 'Collaboreremo tutti al progetto ___ ciascuno rispetti le scadenze.',
							correct: 'purché',
							distractors: ['siccome', 'pertanto', 'quindi'],
							explanation: 'الرابط الشرطي «purché» (بشرط أن) يفرض Congiuntivo دائماً (rispetti).'
						} as ClozeSpec,
						medium: {
							q: 'Completa correttamente il periodo ipotetico misto (condizione passata -> risultato attuale oggi):',
							sentence: 'Se l’anno scorso aveste creato una cooperativa agricola, oggi ___ già in modo autonomo.',
							correct: 'lavorereste',
							distractors: ['lavorerete', 'lavoraste', 'lavoriate'],
							explanation: 'في الجملة الشرطية المختلطة: الشرط في الماضي المستحيل (Se aveste creato) والنتيجة في الحاضر «oggi» تأخذ Condizionale presente: «lavorereste».'
						} as ClozeSpec,
						hard: {
							q: 'Completa correttamente con «ci + lo/li» (luogo + oggetto diretto plurale):',
							sentence: 'Hai portato gli attrezzi in giardino? — Sì, ___ ho portati poco fa.',
							correct: 'ce li',
							distractors: ['ci li', 'glieli', 'ne li'],
							explanation: 'تتغير «ci» (بمعنى lì/in giardino) أمام «li» إلى «ce»: «ce li ho portati».'
						} as ClozeSpec
					}
				},
				{
					mapTitle: 'Accordo, Pronomi e Connettivi di Coesione',
					mapRoot: 'Precisione sintattica nella prova BAC',
					mapSub: 'Controllo tra periodo ipotetico e pronomi',
					mapBranches: [
						{ label: 'Senza SE', rule: 'A patto che + Cong.', example: 'Parto a patto che venga.' },
						{ label: 'Nesso casuale', rule: 'Dato che + Indicativo', example: 'Dato che piove, resto.' },
						{ label: 'Accordo con NE', rule: 'Ne + avere + -o/-a/-i/-e', example: 'Ne ho lette quattro.' },
						{ label: 'Pronomi glie-', rule: 'a lui/lei/loro -> glie-', example: 'Glielo spiego chiaramente.' }
					],
					classPrompt:
						'1. Classifica le seguenti espressioni secondo richiedano Indicativo o Congiuntivo : dato che - a patto che - purché - quindi - nonostante - siccome.',
					classCols: [
						{ header: 'Reggono Indicativo', items: ['dato che', 'quindi', 'siccome'], mark: '0.75' },
						{ header: 'Reggono Congiuntivo', items: ['a patto che', 'purché', 'nonostante'], mark: '0.75' }
					],
					conjPrompt:
						'2. Coniuga i verbi tra parentesi nel modo e tempo appropriati :\na) Se i ragazzi (impegnarsi) con serietà fin da settembre, supererebbero ogni esame con calma.\nb) Se non (piovere) molto questo inverno, dovremo adottare un’irrigazione più attenta.\nc) Se Al-Idrisi non (verificare) tutte le distanze, la sua mappa non (essere) così precisa.\nd) A patto che tu (correggere) gli errori di ortografia, il saggio sarà ottimo.',
					conjAnswer:
						'a) si impegnassero (2º tipo).\nb) piove / pioverà (1º tipo).\nc) avesse verificato / sarebbe stata (3º tipo).\nd) corregga (congiuntivo presente dopo a patto che).',
					transformPrompt:
						'3. Svolgi le trasformazioni seguenti :\na) Correggi l’errore ipotetico tipico : «Se avrei più dizionari nella mia stanza, tradurrei molto più facilmente.»\nb) Sostituisci i complementi : «La maestra ha dato ottimi consigli agli allievi.» diventa «La maestra ......... ha ......... ottimi.» (a loro + consigli con NE)',
					transformAnswer:
						'a) Se avessi più dizionari nella mia stanza, tradurrei molto più facilmente (mai condizionale dopo Se!).\nb) La maestra gliene ha dati ottimi (gli/loro + ne = gliene, con accordo «dati» su consigli).',
					clozePrompt:
						'4. Completa le frasi con : avessero / siccome / gliele / sarebbe.\n(1) .......... il tempo è sereno, pianteremo gli alberi stamattina. Se ieri gli studenti (2) .......... preparato gli attrezzi, adesso il lavoro (3) .......... già finito. Dove sono le palette? — Le ha chieste Sofia e (4) .......... ho portate subito.',
					clozeAnswer: '1) Siccome   2) avessero   3) sarebbe   4) gliele',
					quizzes: {
						easy: {
							q: 'Correggi la frase scegliendo la forma grammaticalmente valida dopo il «Se»:',
							sentence: 'Se ___ abbastanza tempo libero, imparerei a modellare la ceramica geometrica.',
							correct: 'avessi',
							distractors: ['avrei', 'ho avuto', 'avrò'],
							explanation: 'لا يُستعمل Condizionale («avrei») بعد «Se» الشرطية أبداً، بل Congiuntivo imperfetto («avessi»).'
						} as ClozeSpec,
						medium: {
							q: 'Completa correttamente la frase con il pronome combinato e l’accordo del participio:',
							sentence: 'Hai dato le istruzioni agli apprendisti? — Sì, ___ ho date subito.',
							correct: 'gliele',
							distractors: ['loro le', 'glie lo', 'ce le'],
							explanation: 'تُجمع «a loro + le (istruzioni)» في «gliele» دون تفرقة بين المفرد والجمع لضمير المخاطب الغائب.'
						} as ClozeSpec,
						hard: {
							q: 'Completa il 3º tipo ipotetico scegliendo ausiliare e concordanza corretti:',
							sentence: 'Se gli impianti solari fossero stati collegati in marzo, l’acqua agricola ___ estratta senza gasolio.',
							correct: 'sarebbe stata',
							distractors: ['avrebbe stato', 'sarebbe stato', 'fosse stata'],
							explanation: 'جواب الشرط في النوع الثالث المبني للمجهول يأخذ Condizionale passato لـ essere مع مطابقة المؤنث (l’acqua): «sarebbe stata».'
						} as ClozeSpec
					}
				}
			];

			const vIdx = rng.int(0, pool.length - 1);
			const chosen = pool[vIdx];
			const svgStr = svgItalianGrammarMap({
				title: chosen.mapTitle,
				rootLabel: chosen.mapRoot,
				rootSub: chosen.mapSub,
				branches: chosen.mapBranches,
				width: 580
			});
			const svgPath = saveItalianSvgAsset(`3as_le_t3_ipotetico_v${vIdx + 1}`, svgStr);

			const { quizQuestion, finalAnswer } = buildClozePayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'II. Competenza linguistica — B) Periodo ipotetico, pronomi e connettivi',
				points: 7,
				instruction:
					'Osserva la mappa grammaticale e risolvi gli esercizi sul periodo ipotetico, i pronomi e i connettivi (7 punti — BAC 3AS LE) :',
				content: [
					{
						type: 'image',
						src: svgPath,
						width: 'full',
						caption:
							'Sintesi grammaticale : Periodo ipotetico (1º, 2º, 3º tipo), pronomi combinati e connettivi.'
					},
					{
						type: 'text',
						content: chosen.classPrompt
					},
					buildItalianClassificationTableBlock({ columns: chosen.classCols }),
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
				domain: 'grammatica_sintassi',
				examRole: 'linguistic_competence',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكّر القاعدة الذهبية: يُمنع وضع Condizionale بعد أداة الشرط «Se» منعاً باتاً (*Se avrei خطأ جسيم)!',
					'في النوع الثالث المستحيل في الماضي: Se + congiuntivo trapassato -> condizionale passato.',
					'مع «gli / le» + ضمير مباشر أو «ne»، تندمج دائماً في «glielo, gliela, glieli, gliele, gliene».'
				],
				solutionStepsAr: [
					'التصنيف النحوي في جدول العمودين (1.5 نقطة).',
					'تصريف الجملة الشرطية بأنواعها الثلاثة بدقة (2 نقطتان).',
					'التحويل وتطبيق الضمائر المركبة والروابط (2 نقطتان).',
					'إكمال الفقرة بالصيغ الصحيحة (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. WRITTEN EXPRESSION (6 pti — Integration): Ambiente & mondo del lavoro
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_tpl_3as_le_t3_writ_ambiente_lavoro',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'produzione_scritta',
		titleAr: 'الإنتاج الكتابي (6 نقاط — لغات أجنبية): البيئة والجزائر الخضراء وعالم الشغل والمبادرة',
		curriculumLessonId: 'ita_lesson_3as_le_t3_ambiente_energie_algeria_verde',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					tracciaUnoPrompt:
						'Scrivi un articolo argomentativo (120–145 parole) per spiegare come l’energia solare, il rimboschimento e l’economia circolare possano proteggere l’ambiente algerino e creare lavori qualificati per i giovani.',
					tracciaUnoPunti: [
						'Ricordare l’importanza di ridurre la dipendenza dai combustibili fossili grazie al sole e al vento.',
						'Citare il valore ecologico del rimboschimento e della Diga Verde contro la desertificazione.',
						'Mostrare come i mestieri verdi offrano nuove opportunità ai tecnici formati.'
					],
					tracciaDuePrompt:
						'«La protezione della natura e lo sviluppo economico sano non sono nemici, bensì alleati indispensabili per l’avvenire.» Esprimi il tuo punto di vista in 120–145 parole.',
					modelAnswer:
						'Negli ultimi anni, la difesa dell’ambiente è diventata una priorità urgente per l’Algeria e per l’intero bacino del Mediterraneo. Di fronte alla siccità e all’inquinamento, occorre chiedersi come proteggere la natura promuovendo insieme un lavoro dignitoso.\nInnanzitutto, sfruttare l’elevato soleggiamento del nostro territorio tramite impianti solari ed energia eolica riduce le emissioni nocive e sostiene l’agricoltura. Allo stesso modo, progetti di rimboschimento come la Diga Verde trattengono il suolo fertile e frenano l’avanzata del deserto.\nInoltre, applicare nei quartieri e nei licei l’economia circolare — basata su ridurre, riutilizzare e riciclare — evita gli sprechi d’acqua e di materiali.\nIn conclusione, se investissimo con decisione nella formazione verde dei giovani, tuteleremmo le risorse naturali creando mestieri tecnici stabili e utili alla collettività.',
					rubricSummary:
						'Pertinenza tematica ed esempi algerini (1.5) + Struttura e connettivi (1.5) + Correttezza di periodo ipotetico e congiuntivo (1.5) + Lessico e ortografia (1.5).',
					quizzes: {
						easy: {
							q: 'Classifica le pratiche seguenti in Scelte ecologiche sostenibili o Comportamenti dannosi:',
							categories: ['Scelte sostenibili', 'Comportamenti dannosi'],
							items: [
								{ text: 'Installare pannelli solari', category: 0 },
								{ text: 'Piantare alberi resistenti', category: 0 },
								{ text: 'Sprecare acqua potabile', category: 1 },
								{ text: 'Bruciare rifiuti plastici', category: 1 }
							],
							explanation: 'يستبدل السلوك البيئي السليم الهدر والتلويث بالطاقة الشمسية والتشجير.'
						} as DragDropSpec,
						medium: {
							q: 'Classifica questi argomenti in Tutela ambientale o Beneficio occupazionale:',
							categories: ['Tutela ambientale', 'Beneficio occupazionale'],
							items: [
								{ text: 'Frena l’erosione del suolo', category: 0 },
								{ text: 'Riduce le emissioni inquinanti', category: 0 },
								{ text: 'Crea mestieri nella manutenzione', category: 1 },
								{ text: 'Avvia cooperative di riciclaggio', category: 1 }
							],
							explanation: 'تبرز الحجة المزدوجة كيف يحمي التحول البيئي الطبيعة ويخلق مناصب شغل.'
						} as DragDropSpec,
						hard: {
							q: 'Classifica le forme verbali secondo appartengano al Periodo ipotetico del 1º tipo o del 2º tipo:',
							categories: ['1º Tipo (Realtà)', '2º Tipo (Possibilità)'],
							items: [
								{ text: 'Se investiamo, risparmiamo', category: 0 },
								{ text: 'Se pianterete, raccoglierete', category: 0 },
								{ text: 'Se investissimo, risparmieremmo', category: 1 },
								{ text: 'Se piantaste, raccogliereste', category: 1 }
							],
							explanation: 'النوع الأول يربط الحاضر/المستقبل الإخباري، والنوع الثاني يربط Congiuntivo imperfetto بـ Condizionale presente.'
						} as DragDropSpec
					}
				},
				{
					tracciaUnoPrompt:
						'Scrivi una lettera formale all’assessore all’istruzione o al lavoro della tua città per proporre un programma di orientamento pratico che colleghi i licei alle botteghe artigianali e alle cooperative giovanili locali (120–145 parole).',
					tracciaUnoPunti: [
						'Includere città, data, saluto formale e uso costante del pronome «Lei».',
						'Spiegare l’importanza di valorizzare la formazione tecnica accanto agli studi universitari.',
						'Sottolineare i valori di collaborazione, puntualità e lavoro onesto.'
					],
					tracciaDuePrompt:
						'«I giovani non devono soltanto cercare un posto di lavoro, ma anche prepararsi con formazione e spirito cooperativo a crearlo.» Commenta in 120–145 parole.',
					modelAnswer:
						'Algeri, 28 marzo 2026.\nGentile Signor Assessore,\nLe scriviamo in rappresentanza degli studenti di 3AS LE per proporLe un breve percorso di orientamento pratico tra il nostro liceo, le botteghe artigianali e le cooperative locali.\nRiteniamo infatti che conoscere da vicino i mestieri tecnici, l’agricoltura moderna e l’artigianato di qualità aiuti i maturandi a scoprire nuove prospettive professionali oltre agli studi teorici. Durante incontri mensili guidati, i giovani potrebbero osservare come si gestisce una piccola cooperativa rispettando puntualità, risparmio delle risorse e onestà verso i clienti.\nQuesta collaborazione non disturberebbe le lezioni scolastiche, ma offrirebbe competenze concrete per favorire un futuro inserimento lavorativo dignitoso e solidale.\nRingraziandoLa per la Sua attenzione verso i bisogni della gioventù, Le porgiamo i più distinti saluti.\nGli studenti di 3AS LE.',
					rubricSummary:
						'Struttura della lettera formale con «Lei» (1.5) + Chiarezza di proposta e motivazioni (1.5) + Precisione grammaticale (1.5) + Lessico e punteggiatura (1.5).',
					quizzes: {
						easy: {
							q: 'Classifica le formule seguenti secondo siano adatte a una Lettera formale o da evitare:',
							categories: ['Adatte a lettera formale', 'Da evitare in lettera formale'],
							items: [
								{ text: 'Gentile Signor Assessore', category: 0 },
								{ text: 'Le porgiamo distinti saluti', category: 0 },
								{ text: 'Ehi, dimmi cosa ne pensi', category: 1 },
								{ text: 'Ciao a dopo', category: 1 }
							],
							explanation: 'تحافظ الرسالة الرسمية على السجل المهذب والاحترام المتبادل.'
						} as DragDropSpec,
						medium: {
							q: 'Classifica i concetti secondo appartengano alla Formazione pratica o ai Valori professionali:',
							categories: ['Formazione pratica', 'Valori professionali'],
							items: [
								{ text: 'Visite guidate nelle botteghe', category: 0 },
								{ text: 'Gestione tecnica dei progetti', category: 0 },
								{ text: 'Puntualità negli impegni', category: 1 },
								{ text: 'Onestà verso i clienti', category: 1 }
							],
							explanation: 'تتكامل المهارة العملية مع القيم الأخلاقية المهنية في بناء المشروع الناجح.'
						} as DragDropSpec,
						hard: {
							q: 'Classifica queste costruzioni secondo esprimano Fine (scopo) o Causa:',
							categories: ['Proposizioni finali (scopo)', 'Proposizioni causali (motivo)'],
							items: [
								{ text: 'per favorire l’inserimento', category: 0 },
								{ text: 'affinché i giovani crescano', category: 0 },
								{ text: 'poiché il mercato cambia', category: 1 },
								{ text: 'dato che servono tecnici', category: 1 }
							],
							explanation: 'تدل «per / affinché» على الغاية، و«poiché / dato che» على السبب.'
						} as DragDropSpec
					}
				},
				{
					tracciaUnoPrompt:
						'Redigi un saggio breve (120–145 parole) sui mestieri di mediazione linguistica, traduzione e cooperazione economica nel bacino del Mediterraneo tra Algeria e Italia.',
					tracciaUnoPunti: [
						'Richiamare i legami geografici e storici attraverso il Mar Mediterraneo e la Sicilia.',
						'Spiegare come la conoscenza di arabo e italiano faciliti il commercio lecito e gli scambi scientifici.',
						'Incoraggiare gli studenti di Lingue Straniere a unire padronanza linguistica e serietà.'
					],
					tracciaDuePrompt:
						'«Nel bacino del Mediterraneo, chi conosce bene più lingue costruisce ponti concreti di lavoro, cultura e rispetto reciproco.» Sviluppa questa idea in 120–145 parole.',
					modelAnswer:
						'Affacciate sullo stesso Mar Mediterraneo, l’Algeria e la penisola italiana intrattengono da secoli rapporti geografici, agricoli e scientifici resi ancora più vicini dall’isola di Sicilia. Oggi, questa vicinanza apre sbocchi professionali concreti a chi studia con serietà la lingua italiana.\nIn primo luogo, le imprese che collaborano nel settore dell’energia solare, dell’agricoltura sostenibile e dei macchinari cercano mediatori capaci di tradurre documenti tecnici con precisione tra l’arabo e l’italiano. Inoltre, la padronanza linguistica facilita la ricerca universitaria e gli scambi didattici tra i due Paesi.\nNaturalmente, parlare una lingua straniera non basta se mancano preparazione tecnica, puntualità e onestà morale.\nIn conclusione, gli studenti di Lingue Straniere che uniscono studio linguistico, conoscenza geografica e senso etico diventeranno attori preziosi di cooperazione pacifica e prospera nel Mediterraneo.',
					rubricSummary:
						'Pertinenza geografica ed economica (1.5) + Coesione e connettivi (1.5) + Correttezza grammaticale (1.5) + Lessico e ortografia (1.5).',
					quizzes: {
						easy: {
							q: 'Classifica questi elementi secondo appartengano alla Geografia mediterranea o ai Settori di cooperazione:',
							categories: ['Geografia mediterranea', 'Settori di cooperazione'],
							items: [
								{ text: 'Isola di Sicilia', category: 0 },
								{ text: 'Mar Adriatico', category: 0 },
								{ text: 'Energia solare pulita', category: 1 },
								{ text: 'Traduzione tecnica bilingue', category: 1 }
							],
							explanation: 'يربط المقال بين المعطيات الجغرافية الدقيقة ومجالات التعاون المشروع.'
						} as DragDropSpec,
						medium: {
							q: 'Classifica le abilità richieste in Competenze linguistiche o Qualità professionali:',
							categories: ['Competenze linguistiche', 'Qualità professionali'],
							items: [
								{ text: 'Tradurre testi tecnici', category: 0 },
								{ text: 'Padroneggiare arabo e italiano', category: 0 },
								{ text: 'Rispettare le scadenze', category: 1 },
								{ text: 'Agire con onestà morale', category: 1 }
							],
							explanation: 'يحتاج المترجم والوسيط الثقافي إلى الكفاءة اللغوية مع الانضباط المهني.'
						} as DragDropSpec,
						hard: {
							q: 'Classifica questi enunciati in Premessa argomentativa o Conclusione sintetica:',
							categories: ['Premessa introduttiva', 'Conclusione sintetica'],
							items: [
								{ text: 'Algeria e Italia condividono il Mediterraneo', category: 0 },
								{ text: 'Questa vicinanza crea nuovi sbocchi', category: 0 },
								{ text: 'In conclusione, i giovani preparati...', category: 1 },
								{ text: 'Diventeranno ponti di cooperazione pacifica', category: 1 }
							],
							explanation: 'تبدأ المقالة بالمعطيات التمهيدية وتُختتم باستخلاص الدور الإيجابي للشباب.'
						} as DragDropSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const { quizQuestion, finalAnswer } = buildDragDropPayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'III. Produzione scritta',
				points: 6,
				instruction:
					'Scegli UNA delle due tracce proposte e redigi il testo con chiarezza e proprietà lessicale (6 punti — BAC 3AS LE) :',
				content: [
					buildItalianWrittenProductionBlock({
						tracciaUnoTitle: 'Traccia 1 (Guidata — 6 pti) :',
						tracciaUnoPrompt: chosen.tracciaUnoPrompt,
						tracciaUnoPunti: chosen.tracciaUnoPunti,
						tracciaDuePrompt: chosen.tracciaDuePrompt,
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
				domain: 'produzione_scritta',
				examRole: 'written_expression',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'التزم بطول النص (120–145 كلمة) وبتقسيم الفقرات الأربع.',
					'وظّف الجملة الشرطية والضمائر المركبة والروابط المنطقية بوعي.',
					'في الرسالة الرسمية استعمل «Lei» ولا تخلطها مع ضمير «tu».'
				],
				solutionStepsAr: [
					'فهم التعليمة وملاءمة المضمون (1.5 نقطة).',
					'تنظيم التصميم والروابط المنطقية (1.5 نقطة).',
					'سلامة النحو والصرف (1.5 نقطة).',
					'ثراء المفردات وسلامة الإملاء والترقيم (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 6. WRITTEN EXPRESSION (6 pti — Integration): Metodologia & Saggio BAC (with SVG blueprint)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_tpl_3as_le_t3_writ_saggio_bac_strategia',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'produzione_scritta',
		titleAr: 'الإنتاج الكتابي (6 نقاط — لغات أجنبية): منهجية الساجو والمقال الحجاجي الشامل للبكالوريا',
		curriculumLessonId: 'ita_lesson_3as_le_t3_metodologia_prova_bac_scrittura',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					bpTitle: 'Piano BAC : Saggio Argomentativo (6 pti)',
					bpSteps: [
						{ stage: 'Introduzione', detail: 'Contesto attuale + domanda centrale (3 righe)' },
						{ stage: 'Argomenti', detail: 'Due ragioni ordinate + esempio algerino reale' },
						{ stage: 'Concessione', detail: 'Benché / Tuttavia + risposta equilibrata' },
						{ stage: 'Conclusione', detail: 'Sintesi chiara + invito costruttivo (120–145 parole)' }
					],
					tracciaUnoPrompt:
						'Alla vigilia dell’Esame di Maturità (BAC), scrivi un saggio argomentativo (120–145 parole) per consigliare ai futuri studenti di 3AS LE un metodo efficace che unisca lettura critica, gestione del tempo e serenità morale.',
					tracciaUnoPunti: [
						'Spiegare l’importanza di studiare con costanza fin dall’inizio dell’anno senza lasciare tutto alla fine.',
						'Mostrare come la lettura in biblioteca e la revisione grammaticale migliorino la scrittura.',
						'Ricordare il sostegno sereno della famiglia e la fiducia nel proprio lavoro onesto.'
					],
					tracciaDuePrompt:
						'«Preparare il BAC con metodo quotidiano non toglie gioia alla gioventù, ma insegna disciplina, pazienza e fiducia in se stessi.» Esponi il tuo pensiero in 120–145 parole.',
					modelAnswer:
						'Affrontare l’Esame di Maturità nella sezione di Lingue Straniere richiede non soltanto conoscenze grammaticali, ma anche un metodo di lavoro equilibrato fin dai primi mesi dell’anno. Come possono i maturandi prepararsi con efficacia e serenità?\nInnanzitutto, conviene sostituire la fretta dell’ultimo momento con un ripasso quotidiano regolare. Dedicare ogni giorno un’ora alla lettura di testi in italiano, al ripasso del congiuntivo e alla cura del lessico consolida la memoria senza provocare ansia inutile. Inoltre, frequentare la biblioteca e confrontarsi con gli insegnanti aiuta a correggere subito gli errori più frequenti.\nBenché gli esami sembrino impegnativi, l’ascolto dei genitori, un’alimentazione sana e il riposo notturno mantengono lucida la mente.\nIn conclusione, chi studia con costanza, onestà e fiducia nel proprio impegno trasforma la prova del BAC in una tappa serena di crescita umana.',
					rubricSummary:
						'Pertinenza metodologica (1.5) + Struttura in 4 paragrafi e connettivi (1.5) + Correttezza grammaticale (1.5) + Lessico e controllo ortografico (1.5).',
					quizzes: {
						easy: {
							q: 'Ordina le quattro fasi fondamentali di un saggio argomentativo BAC:',
							orderedItems: [
								'Introduzione con contesto e domanda centrale',
								'Sviluppo con due argomenti ed esempi concreti',
								'Concessione equilibrata con connettivo adatto',
								'Conclusione sintetica e proposta costruttiva'
							],
							explanation: 'التصميم الرباعي للمقال الحجاجي في امتحان البكالوريا.'
						} as OrderingSpec,
						medium: {
							q: 'Ordina le tappe della gestione delle tre ore durante la prova scritta di italiano al BAC:',
							orderedItems: [
								'Leggere il testo tre volte e rispondere alla Comprensione',
								'Risolvere con cura gli esercizi di Competenza linguistica',
								'Stendere la scaletta e redigere la Produzione scritta',
								'Rileggere accordi, accenti e tempi negli ultimi minuti'
							],
							explanation: 'التوزيع الذكي لثلاث ساعات الامتحان بين الفهم واللغة والتحرير والمراجعة النهائية.'
						} as OrderingSpec,
						hard: {
							q: 'Ordina le frasi per formare un paragrafo metodologico sul ripasso costante:',
							orderedItems: [
								'Sebbene molti studenti rimandino lo studio alla primavera,',
								'la fretta delle ultime settimane aumenta solo la stanchezza.',
								'Al contrario, un ripasso quotidiano fissa le regole con serenità.',
								'Di conseguenza, la costanza regolare garantisce risultati più sicuri.'
							],
							explanation: 'ربط برهاني متماسك بين خطأ التأجيل وفائدة المراجعة المنتظمة.'
						} as OrderingSpec
					}
				},
				{
					bpTitle: 'Piano BAC : Lettera Formale Argomentativa',
					bpSteps: [
						{ stage: 'Intestazione', detail: 'Città, data e saluto formale con Lei' },
						{ stage: 'Motivo chiaro', detail: 'Esporre subito lo scopo della richiesta' },
						{ stage: 'Argomenti', detail: 'Benefici educativi e organizzazione concreta' },
						{ stage: 'Chiusura', detail: 'Ringraziamento cortese, Distinti saluti e firma' }
					],
					tracciaUnoPrompt:
						'Scrivi una lettera formale al Preside del tuo liceo proponendo l’organizzazione di due giornate di simulazione e ripasso collettivo in preparazione all’esame scritto di Lingua Italiana (120–145 parole).',
					tracciaUnoPunti: [
						'Rispettare luogo, data, apertura formale e uso coerente di «Lei».',
						'Spiegare l’utilità di allenarsi su comprensione, morfologia e controllo finale in 3 ore.',
						'Proporre il coinvolgimento volontario dei docenti nella sala lettura senza costi.'
					],
					tracciaDuePrompt:
						'«Imparare a rileggere e correggere i propri errori scritti vale quanto apprendere nuove regole grammaticali.» Commenta questa frase in 120–145 parole.',
					modelAnswer:
						'Costantina, 10 maggio 2026.\nGentile Signor Preside,\nLe scriviamo a nome della classe 3AS LE per sottoporLe la proposta di organizzare due giornate di allenamento scritto in vista dell’imminente prova di Lingua Italiana.\nDurante il percorso scolastico abbiamo studiato temi ricchi come il patrimonio mediterraneo, la ricerca etica e la tutela ambientale; tuttavia, molti studenti avvertono il bisogno di esercitarsi concretamente nella gestione delle tre ore d’esame. In particolare, due simulazioni guidate nella sala della biblioteca ci aiuterebbero a perfezionare la comprensione del testo, il congiuntivo, il periodo ipotetico e la rilettura ortografica finale.\nI nostri insegnanti si sono già dichiarati disponibili ad accompagnare l’iniziativa il sabato mattina senza interferire con il calendario regolare delle lezioni.\nRingraziandoLa per la Sua costante attenzione verso la nostra preparazione, Le porgiamo i più distinti saluti.\nI maturandi di 3AS LE.',
					rubricSummary:
						'Formato della lettera formale con «Lei» (1.5) + Chiarezza di obiettivi e organizzazione (1.5) + Correttezza morfosintattica (1.5) + Lessico e ortografia (1.5).',
					quizzes: {
						easy: {
							q: 'Ordina dall’alto in basso le parti essenziali della lettera formale:',
							orderedItems: [
								'Città, data e formula di apertura',
								'Presentazione cortese del motivo della lettera',
								'Spiegazione dei benefici educativi e dell’organizzazione',
								'Ringraziamento, saluto formale e firma'
							],
							explanation: 'الهيكل الرسمي الدقيق للرسالة الموجهة لمدير الثانوية.'
						} as OrderingSpec,
						medium: {
							q: 'Ordina i controlli della lista di revisione finale prima di consegnare il foglio d’esame:',
							orderedItems: [
								'Verificare di aver svolto tutti i punti della traccia scelta',
								'Controllare l’accordo tra soggetto, verbo e participi passati',
								'Verificare congiuntivo, forma passiva e periodo ipotetico',
								'Correggere gli accenti (qual è, perché, più) e la punteggiatura'
							],
							explanation: 'قائمة المراجعة النهائية التي تنقذ العلامة في آخر عشر دقائق.'
						} as OrderingSpec,
						hard: {
							q: 'Ordina gli enunciati per ricostruire una motivazione formale coerente:',
							orderedItems: [
								'Le scriviamo per proporre due esercitazioni guidate di preparazione.',
								'Infatti, molti alunni necessitano di allenarsi sui tempi dell’esame.',
								'Inoltre, i docenti potranno correggere insieme gli errori più comuni.',
								'Pertanto, questa iniziativa rafforzerà la sicurezza di tutta la classe.'
							],
							explanation: 'تسلسل من الغرض إلى التعليل ثم الإضافة فالاستنتاج.'
						} as OrderingSpec
					}
				},
				{
					bpTitle: 'Sintesi Culturale : Algeria, Italia e Saperi',
					bpSteps: [
						{ stage: 'Apertura', detail: 'Valore del dialogo culturale e delle lingue' },
						{ stage: 'Esempi veri', detail: 'Casbah, Al-Idrisi, Ben Badis e scienza etica' },
						{ stage: 'Sfida attuale', detail: 'Tutela ambientale e lavoro onesto dei giovani' },
						{ stage: 'Conclusione', detail: 'Messaggio sereno di responsabilità e studio' }
					],
					tracciaUnoPrompt:
						'Redigi un saggio argomentativo (120–145 parole) per fare un bilancio formativo di tutto il percorso di Lingua Italiana nella sezione 3AS LE, unendo patrimonio culturale, etica scientifica e responsabilità verso il futuro.',
					tracciaUnoPunti: [
						'Richiamare i temi chiave dell’anno: educazione, patrimonio mediterraneo, scienza responsabile ed ecologia.',
						'Sottolineare l’importanza di mantenere salda la propria identità rispettando le altre culture.',
						'Concludere con un impegno personale allo studio continuo e al bene comune.'
					],
					tracciaDuePrompt:
						'«Studiare una lingua straniera non serve solo a superare un esame, ma educa a capire meglio il mondo e a servire con più competenza la propria comunità.» Sviluppa questa idea in 120–145 parole.',
					modelAnswer:
						'Al termine del percorso di terzo anno in Lingue Straniere, lo studio della lingua italiana si rivela molto più di una semplice materia d’esame. Attraverso i testi letti durante l’anno, abbiamo scoperto come la padronanza linguistica unisca cultura, scienza e responsabilità civile.\nIn primo luogo, esplorare la storia della Casbah di Algeri, le mappe mediterranee di Al-Idrisi e i trattati medici di Al-Zahrawi ci ha mostrato la profondità degli scambi scientifici tra le due sponde del mare. Inoltre, i temi dell’alimentazione sana, della ricerca rigorosa e della tutela ambientale hanno allenato la nostra capacità di argomentare con equilibrio.\nBenché il cammino verso l’università esiga impegno e costanza, ogni ora di lettura e di traduzione arricchisce il nostro giudizio critico.\nIn definitiva, chi impara una lingua con serietà e rispetto delle proprie radici diventa un cittadino preparato per il futuro.',
					rubricSummary:
						'Ampiezza della sintesi culturale (1.5) + Struttura e connettivi (1.5) + Correttezza grammaticale (1.5) + Ricchezza lessicale e ortografia (1.5).',
					quizzes: {
						easy: {
							q: 'Ordina i grandi nuclei tematici studiati durante i tre trimestri di 3AS LE:',
							orderedItems: [
								'Famiglia, istruzione, biblioteca e patrimonio storico',
								'Alimentazione sana, artigianato e scienza responsabile',
								'Tutela ambientale, energie pulite e mondo del lavoro',
								'Sintesi metodologica per la prova scritta del BAC'
							],
							explanation: 'التدرج السنوي لمحاور برنامج الإيطالية في السنة الثالثة ثانوي لغات أجنبية.'
						} as OrderingSpec,
						medium: {
							q: 'Ordina le fasi per redigere una sintesi culturale efficace al BAC:',
							orderedItems: [
								'Presentare il valore formativo dello studio delle lingue',
								'Richiamare esempi precisi di storia e civiltà studiati',
								'Collegare i temi ecologici ed etici alla vita odierna',
								'Chiudere unendo radici nazionali e competenza professionale'
							],
							explanation: 'تصميم متوازن يربط التراث بالعلم والبيئة وبناء المستقبل.'
						} as OrderingSpec,
						hard: {
							q: 'Ordina le proposizioni per formare un periodo complesso ben strutturato:',
							orderedItems: [
								'Poiché la conoscenza storica rafforza l’identità culturale,',
								'studiare autori come Al-Idrisi e Ben Badis ispira i giovani,',
								'benché le sfide tecnologiche ed ecologiche siano nuove,',
								'a servire la società con competenza, umiltà e onestà.'
							],
							explanation: 'تركيب نحوي متقدم يجمع السببية والاعتراض بـ Benché والغاية.'
						} as OrderingSpec
					}
				}
			];

			const vIdx = rng.int(0, pool.length - 1);
			const chosen = pool[vIdx];
			const svgStr = svgItalianWritingBlueprint({
				title: chosen.bpTitle,
				steps: chosen.bpSteps,
				width: 580
			});
			const svgPath = saveItalianSvgAsset(`3as_le_t3_scrittura_v${vIdx + 1}`, svgStr);

			const { quizQuestion, finalAnswer } = buildOrderingPayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'III. Produzione scritta',
				points: 6,
				instruction:
					'Osserva lo schema strutturale, scegli UNA delle due tracce proposte e redigi il testo con rigore (6 punti — BAC 3AS LE) :',
				content: [
					{
						type: 'image',
						src: svgPath,
						width: 'full',
						caption: 'Guida metodologica alla Produzione Scritta BAC 3AS LE (6 punti).'
					},
					buildItalianWrittenProductionBlock({
						tracciaUnoTitle: 'Traccia 1 (Guidata — 6 pti) :',
						tracciaUnoPrompt: chosen.tracciaUnoPrompt,
						tracciaUnoPunti: chosen.tracciaUnoPunti,
						tracciaDuePrompt: chosen.tracciaDuePrompt,
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
				domain: 'produzione_scritta',
				examRole: 'written_expression',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'اتبع الخطوات الأربع في المخطط البصري وحافظ على طول متوازن بين 120 و145 كلمة.',
					'تثبت من كتابة الأعلام والمواقع (Casbah, Tlemcen, M’Zab, Al-Idrisi, Al-Zahrawi, Ben Badis) دون خطأ.',
					'خصص الدقائق الأخيرة للمراجعة اللغوية: النبْر (qual è, perché, più)، وتوافق الأزمنة، والضمائر المركبة.'
				],
				solutionStepsAr: [
					'فهم الموضوع واحترام القالب المطلوب (1.5 نقطة).',
					'بناء الفقرات الأربع بالروابط الحجاجية السليمة (1.5 نقطة).',
					'الدقة النحوية والصرفية (1.5 نقطة).',
					'ثراء المفردات وسلامة الإملاء والترقيم (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	}
];
