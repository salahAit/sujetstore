import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildItalianClassificationTableBlock,
	buildItalianPassageBlock,
	buildItalianWordFamilyTableBlock,
	buildItalianWrittenProductionBlock
} from '../../italian-helpers';
import { saveItalianSvgAsset, svgItalianConjugationChart } from '../../svg-italian';
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
 * Parameterized Exam & Quiz Templates — Trimestre 1 : Famiglia, Istruzione, Patrimonio & Morfologia / Passivo (6 templates)
 * Roles: 2 comprehension (7 pti) + 2 linguistic_competence (7 pti) + 2 written_expression (6 pti)
 */
export const TEMPLATES_3AS_LE_T1: ItalianParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPREHENSION (7 pti): Famiglia, istruzione, biblioteca e solidarietà
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_tpl_3as_le_t1_comp_famiglia_istruzione',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'comprensione_testo',
		titleAr: 'فهم النص (7 نقاط — لغات أجنبية): الأسرة، التعليم، المطالعة والتضامن الشبابي',
		curriculumLessonId: 'ita_lesson_3as_le_t1_famiglia_educazione_solidarieta',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Famiglia, disciplina e studio: costruire il futuro con costanza',
					source: 'Adattato da una riflessione educativa per studenti liceali',
					paragraphs: [
						'In una società spesso attratta dai risultati immediati, molti giovani rischiano di scambiare un semplice desiderio con un traguardo già raggiunto. Eppure, gli insegnanti e i genitori ricordano che nessun percorso solido nasce dall’improvvisazione: dietro ogni competenza reale si nascondono ore silenziose di lettura, esercizio e [[costanza]].',
						'Lontana dal soffocare l’entusiasmo giovanile, la disciplina quotidiana lo protegge e lo orienta. Chi organizza con ordine la propria giornata scolastica, ascolta con gratitudine i consigli della famiglia e accetta di correggere i propri errori sviluppa una serenità capace di superare ogni ostacolo.',
						'Inoltre, il valore autentico di uno studente non si misura soltanto dai voti individuali, ma dal suo [[spirito solidale]] verso i compagni e verso il quartiere. Unendo rigore intellettuale ed educazione morale, i giovani diventano un sostegno sicuro per l’intera collettività.'
					],
					glossary: [
						{ term: 'traguardo', meaning: 'obiettivo importante raggiunto con impegno' },
						{ term: 'improvvisazione', meaning: 'azione fatta in fretta senza preparazione' }
					],
					mainIdeaHeader: '1. L’idea principale del testo evidenzia che :',
					mainIdeaOptions: [
						'La costanza quotidiana, il dialogo familiare e la solidarietà trasformano lo studio in successo duraturo',
						'Gli studenti dovrebbero abbandonare i libri alle prime difficoltà',
						'I voti individuali valgono più di qualsiasi comportamento etico'
					],
					mainIdeaCorrect:
						'La costanza quotidiana, il dialogo familiare e la solidarietà trasformano lo studio in successo duraturo',
					tfItems: [
						{
							q: 'Alcuni giovani confondono il semplice desiderio con un risultato già conquistato.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'Secondo il testo, la disciplina quotidiana distrugge l’entusiasmo degli studenti.',
							a: 'Falso',
							c: 'La disciplina quotidiana protegge e orienta l’entusiasmo giovanile (§2).',
							mark: '0.5'
						},
						{
							q: 'Ascoltare i consigli familiari e correggere gli errori aiuta a superare gli ostacoli.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'Per l’autore, i voti scolastici sono l’unico criterio del valore di uno studente.',
							a: 'Falso',
							c: 'Conta anche il suo spirito solidale verso i compagni e il quartiere (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Che cosa distingue un percorso solido dalla semplice improvvisazione secondo il primo paragrafo?',
							a: 'Dietro ogni competenza reale ci sono ore silenziose di lettura, esercizio e costanza, non risultati immediati.',
							mark: '0.75'
						},
						{
							q: 'b) Indica due atteggiamenti concreti che aiutano lo studente a maturare (§2).',
							a: 'Organizzare con ordine la giornata scolastica, ascoltare con gratitudine i genitori e correggere i propri errori.',
							mark: '1'
						},
						{
							q: 'c) Perché l’autore associa il rigore intellettuale all’educazione morale nella conclusione (§3)?',
							a: 'Perché insieme rendono i giovani cittadini affidabili e un sostegno per tutta la collettività.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «costanza» (indica il senso nel §1)   b) «spirito solidale» (§3)',
					refAnswer:
						'a) «costanza» indica la perseveranza continua e paziente nello studio e nel lavoro.   b) «spirito solidale» rimanda alla disponibilità ad aiutare i compagni e la comunità con generosità.',
					synthPrompt:
						'Secondo te, perché la costanza quotidiana è più decisiva del talento isolato per superare l’Esame di Maturità? Rispondi in quattro o cinque righe.',
					synthAnswer:
						'Dal mio punto di vista, la costanza quotidiana è decisiva perché il talento senza metodo si indebolisce davanti alla stanchezza. Al contrario, chi ripassa ogni giorno con ordine consolida le regole linguistiche, corregge le proprie lacune in tempo e affronta l’esame con serenità.',
					quizzes: {
						easy: {
							q: 'Secondo il paragrafo 1, che cosa si trova dietro ogni competenza reale?',
							correct: 'Ore silenziose di lettura, esercizio e costanza',
							wrong: [
								'Improvvisazione rapida senza piano di lavoro',
								'Attesa passiva di risultati immediati',
								'Rinuncia totale alla guida dei genitori'
							],
							explanation: 'توضح الفقرة الأولى أن المهارة الحقيقية ثمرة المطالعة والتمرين والمثابرة الصابرة.'
						} as McqSpec,
						medium: {
							q: 'Quale funzione svolge la disciplina quotidiana secondo il paragrafo 2?',
							correct: 'Proteggere e orientare l’entusiasmo sviluppando serenità davanti agli ostacoli',
							wrong: [
								'Soffocare la curiosità scientifica degli alunni',
								'Impedire il dialogo con la famiglia',
								'Sostituire lo studio con la memorizzazione meccanica'
							],
							explanation: 'تؤكد الفقرة الثانية أن الانضباط اليومي يحمي الحماس ويوجهه ويمنح الثبات.'
						} as McqSpec,
						hard: {
							q: 'Quale legame concettuale stabilisce il paragrafo 3 tra risultati scolastici ed educazione morale?',
							correct: 'Sono complementari: il sapere acquisisce pieno valore quando si unisce alla solidarietà sociale',
							wrong: [
								'L’educazione morale rende inutili gli esami scolastici',
								'I voti individuali impediscono di aiutare i compagni',
								'La scuola deve occuparsi soltanto di voti isolati'
							],
							explanation: 'تجمع الخاتمة بين الرصانة الفكرية والتضامن الأخلاقي لبناء مواطن نافع.'
						} as McqSpec
					}
				},
				{
					title: 'La biblioteca scolastica e l’importanza delle lingue straniere',
					source: 'Adattato da un articolo pedagogico sul plurilinguismo liceale',
					paragraphs: [
						'Nonostante la diffusione delle informazioni rapide sugli schermi, nulla sostituisce la calma operosa della biblioteca scolastica. Aprire un libro completo e consultare un dizionario cartaceo permette allo studente di seguire un ragionamento articolato, osservando le sfumature precise della [[scrittura argomentativa]].',
						'Nelle classi di Lingue Straniere, l’incontro tra l’arabo, l’italiano e le altre lingue arricchisce profondamente la mente. Contrariamente a chi teme un indebolimento delle radici, confrontare strutture sintattiche diverse affina la coscienza della propria lingua madre e prepara traduttori attenti.',
						'Perciò, potenziare le biblioteche dei licei e organizzare laboratori settimanali di lettura e traduzione costituisce [[un investimento educativo]] prezioso per formare giovani colti, rispettosi della propria identità e aperti al dialogo scientifico.'
					],
					glossary: [
						{ term: 'sfumatura', meaning: 'piccola differenza di significato o di stile' },
						{ term: 'potenziare', meaning: 'rendere più ricco, moderno ed efficace' }
					],
					mainIdeaHeader: '1. Il testo ha come scopo principale quello di :',
					mainIdeaOptions: [
						'Difendere la lettura approfondita in biblioteca e il valore formativo delle lingue straniere',
						'Vietare l’uso di qualsiasi strumento digitale negli istituti scolastici',
						'Dimostrare che imparare nuove lingue cancella la lingua materna'
					],
					mainIdeaCorrect:
						'Difendere la lettura approfondita in biblioteca e il valore formativo delle lingue straniere',
					tfItems: [
						{
							q: 'Consultare libri completi in biblioteca aiuta a seguire un ragionamento articolato.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'Lo studio delle lingue straniere danneggia sempre la padronanza della lingua madre.',
							a: 'Falso',
							c: 'Confrontare strutture diverse affina la coscienza della propria lingua madre (§2).',
							mark: '0.5'
						},
						{
							q: 'La traduzione attenta trae beneficio dal confronto tra sistemi linguistici diversi.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'L’autore consiglia di chiudere le biblioteche dei licei perché superate.',
							a: 'Falso',
							c: 'Propone di potenziarle e di organizzare laboratori settimanali di lettura e traduzione (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Che cosa offre la biblioteca scolastica rispetto alla lettura rapida sugli schermi (§1)?',
							a: 'Offre calma operosa, ragionamenti articolati e attenzione alle sfumature della scrittura.',
							mark: '0.75'
						},
						{
							q: 'b) Spiega perché l’apprendimento dell’italiano migliora anche la conoscenza della lingua materna (§2).',
							a: 'Perché il confronto tra strutture sintattiche e lessicali diverse rende più chiare le regole della propria lingua.',
							mark: '1'
						},
						{
							q: 'c) Quale iniziativa concreta propone la conclusione del brano (§3)?',
							a: 'Potenziare le biblioteche scolastiche e organizzare laboratori settimanali di lettura e traduzione.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «scrittura argomentativa» (§1)   b) «un investimento educativo» (§3)',
					refAnswer:
						'a) «scrittura argomentativa» indica il modo ordinato e ragionato di esporre tesi ed esempi nei testi.   b) «un investimento educativo» si riferisce al rafforzamento delle biblioteche e ai laboratori di lettura e traduzione.',
					synthPrompt:
						'Come studente di Lingue Straniere, quali vantaggi concreti ti offre la lettura regolare di testi in italiano? Argomenta in quattro o cinque righe.',
					synthAnswer:
						'Leggere regolarmente testi in italiano amplia il mio vocabolario attivo e consolida l’uso naturale del congiuntivo e dei connettivi. Inoltre, mi permette di consultare direttamente studi culturali e scientifici sul bacino del Mediterraneo e di migliorare la mia capacità di traduzione.',
					quizzes: {
						easy: {
							q: 'Che cosa favorisce la consultazione di libri completi e dizionari nella biblioteca scolastica?',
							correct: 'Seguire un ragionamento articolato cogliendo le sfumature lessicali',
							wrong: [
								'Leggere soltanto titoli isolati in fretta',
								'Dimenticare l’ortografia delle parole',
								'Evitare qualsiasi confronto tra le lingue'
							],
							explanation: 'تبرز الفقرة الأولى أن المكتبة تدرّب الطالب على تتبع الاستدلال الطويل وفهم الفروق الدقيقة.'
						} as McqSpec,
						medium: {
							q: 'Che cosa afferma il paragrafo 2 sul rapporto tra lingua madre e lingue straniere?',
							correct: 'Il confronto sintattico e lessicale affina la padronanza della stessa lingua madre',
							wrong: [
								'Le lingue straniere cancellano rapidamente le radici culturali',
								'È impossibile tradurre correttamente da una lingua all’altra',
								'La sintassi italiana e quella araba sono identiche in tutto'
							],
							explanation: 'تؤكد الفقرة الثانية أن مقارنة الأنساق اللغوية تصقل الوعي باللغة الأم.'
						} as McqSpec,
						hard: {
							q: 'Quale finalità attribuisce l’autore ai laboratori settimanali di lettura e traduzione nel paragrafo 3?',
							correct: 'Formare studenti colti, radicati nella propria identità e aperti al dialogo scientifico',
							wrong: [
								'Sostituire tutte le materie scientifiche del liceo',
								'Ridurre l’orario di studio della lingua nazionale',
								'Eliminare gli esami scritti di fine anno'
							],
							explanation: 'تربط الخاتمة بين التكوين الثقافي المتين والحوار العلمي المتزن.'
						} as McqSpec
					}
				},
				{
					title: 'L’eredità educativa di Cheikh Ben Badis e il volontariato studentesco',
					source: 'Adattato da una rassegna sulla storia educativa dell’Algeria',
					paragraphs: [
						'All’inizio del Novecento, quando l’accesso a un’istruzione libera incontrava gravi ostacoli, lo studioso algerino Cheikh Abdelhamid Ben Badis comprese che la dignità di un popolo nasce nelle aule scolastiche. A Costantina, insieme a educatori integri come Cheikh Mohamed Bachir El-Ibrahimi, diede impulso a scuole dove i giovani studiavano la lingua araba, la storia nazionale, le scienze e [[i valori morali]].',
						'Accanto all’insegnamento in classe, questi maestri svilupparono una stampa educativa rigorosa per formare coscienze responsabili e unite. Oggi questo stesso spirito vive nei progetti di [[volontariato studentesco]], in cui ragazzi e ragazze organizzano ripetizioni gratuite per i più piccoli e raccolte di libri nei quartieri.',
						'Ricordare quella dedizione invita ogni studente contemporaneo a custodire il privilegio dello studio con gratitudine, umiltà e impegno quotidiano.'
					],
					glossary: [
						{ term: 'integro', meaning: 'onesto, coerente e fedele ai propri principi' },
						{ term: 'dedizione', meaning: 'impegno generoso e costante verso una nobile causa' }
					],
					mainIdeaHeader: '1. Il filo conduttore del testo mette in luce :',
					mainIdeaOptions: [
						'Il legame vivo tra l’impegno educativo di Cheikh Ben Badis e la solidarietà degli studenti di oggi',
						'La scomparsa delle scuole e delle biblioteche a Costantina',
						'L’inutilità della collaborazione tra studenti e associazioni locali'
					],
					mainIdeaCorrect:
						'Il legame vivo tra l’impegno educativo di Cheikh Ben Badis e la solidarietà degli studenti di oggi',
					tfItems: [
						{
							q: 'Cheikh Abdelhamid Ben Badis e Cheikh Mohamed Bachir El-Ibrahimi promossero scuole libere in Algeria.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'In quelle scuole si trascuravano completamente le scienze e la storia nazionale.',
							a: 'Falso',
							c: 'I giovani vi studiavano la lingua araba, la storia nazionale, le scienze e i valori morali (§1).',
							mark: '0.5'
						},
						{
							q: 'I progetti attuali di volontariato studentesco includono ripetizioni gratuite e raccolta di libri.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'La conclusione ritiene che la storia educativa non offra insegnamenti ai giovani moderni.',
							a: 'Falso',
							c: 'Invita ogni studente a custodire lo studio con gratitudine, umiltà e impegno (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Quali discipline venivano insegnate nelle scuole avviate a Costantina (§1)?',
							a: 'La lingua araba, la storia nazionale, le scienze e i valori morali.',
							mark: '0.75'
						},
						{
							q: 'b) In quali attività concrete si manifesta oggi il volontariato studentesco secondo il paragrafo 2?',
							a: 'Nell’organizzazione di ripetizioni gratuite per i più piccoli e di raccolte di libri nei quartieri.',
							mark: '1'
						},
						{
							q: 'c) Con quali tre atteggiamenti deve rispondere oggi lo studente al privilegio dell’istruzione (§3)?',
							a: 'Con gratitudine, umiltà e impegno quotidiano.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «i valori morali» (§1)   b) «volontariato studentesco» (§2)',
					refAnswer:
						'a) «i valori morali» indica i principi etici di onestà, rispetto e rettitudine trasmessi insieme alle materie scientifiche.   b) «volontariato studentesco» si riferisce alle iniziative solidali gratuite promosse dagli studenti fuori dall’orario scolastico.',
					synthPrompt:
						'In che modo la conoscenza dell’impegno di educatori storici algerini può motivarti nella preparazione del BAC? Rispondi in quattro o cinque righe.',
					synthAnswer:
						'Conoscere la tenacia di educatori come Cheikh Abdelhamid Ben Badis e Cheikh El-Ibrahimi mi ispira serietà e rispetto verso la scuola. Se essi diffusero il sapere tra mille difficoltà materiali, oggi abbiamo il dovere morale di valorizzare i nostri libri, i docenti e ogni ora di studio.',
					quizzes: {
						easy: {
							q: 'Che cosa studiavano i giovani nelle scuole libere promosse da Cheikh Ben Badis a Costantina?',
							correct: 'Lingua araba, storia nazionale, scienze e valori morali',
							wrong: [
								'Soltanto esercizi ginnici senza libri',
								'Unicamente commercio internazionale',
								'Materie prive di attenzione etica'
							],
							explanation: 'تذكر الفقرة الأولى المواد الأساسية والقيم الأخلاقية في مدارس جمعية العلماء.'
						} as McqSpec,
						medium: {
							q: 'Quale ponte ideale traccia il paragrafo 2 tra il passato e il presente?',
							correct: 'Lo spirito di servizio educativo prosegue nel volontariato studentesco odierno',
							wrong: [
								'La stampa educativa è stata vietata nelle scuole moderne',
								'I giovani attuali rifiutano di aiutare i bambini',
								'Le ripetizioni scolastiche sono sempre a pagamento'
							],
							explanation: 'يربط النص بين روح الإصلاح التعليمي والعمل التطوعي الطلابي اليوم.'
						} as McqSpec,
						hard: {
							q: 'Quale dovere morale suggerisce la chiusura del brano agli studenti contemporanei?',
							correct: 'Onorare il privilegio dello studio con gratitudine, umiltà e costanza quotidiana',
							wrong: [
								'Dimenticare il passato educativo perché superato',
								'Studiare soltanto poche settimane prima dell’esame',
								'Evitare la collaborazione con le biblioteche locali'
							],
							explanation: 'تدعو الخاتمة التلميذ إلى شكر نعمة التعليم بالاجتهاد والتواضع.'
						} as McqSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const spec = chosen.quizzes[difficulty];
			const { quizQuestion, finalAnswer } = buildMcqPayload(
				spec,
				`اقرأ الأسئلة المرتبطة بمحور الأسرة والتعليم والتضامن واختر الجواب الدقيق: ${spec.q}`,
				'راجع الفكرة الأساسية للفقرة المشار إليها وتجنب الخيارات المتطرفة أو المخالفة للنص.',
				rng
			);
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
						content: `4. Spiega il significato o il referente contestuale delle espressioni sottolineate :\n${chosen.refPrompt}`,
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
				trimesterId: 't1',
				difficulty,
				domain: 'comprensione_testo',
				examRole: 'comprehension',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'في سؤال Vero / Falso، لا تنس إرفاق كل عبارة «Falso» بتعليل دقيق مستخرج من النص.',
					'ميّز أدوات الاستدراك (eppure, tuttavia, invece) لاستخلاص الموقف المركزي للكاتب.',
					'في سؤال الرأي الشخصي (4–5 أسطر)، استعمل عبارة رأي رصينة وادعمها بحجتين واضحتين.'
				],
				solutionStepsAr: [
					'تحديد الفكرة الرئيسية للنص (0.5 نقطة).',
					'الحكم والتبرير النصي في عبارات الصواب والخطأ (2 نقطتان).',
					'الإجابة التحليلية عن أسئلة الفهم الثلاثة (2.5 نقطة).',
					'تحديد الإحالات النصية وصياغة الرأي الشخصي (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. COMPREHENSION (7 pti): Patrimonio mediterraneo & cartografia / medicina
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_tpl_3as_le_t1_comp_patrimonio_mediterraneo',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'cultura_civilta',
		titleAr: 'فهم النص (7 نقاط — لغات أجنبية): التراث المعماري الجزائري والمتوسطي والخرائط العلمية',
		curriculumLessonId: 'ita_lesson_3as_le_t1_patrimonio_mediterraneo_cartografia',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'La Casbah di Algeri e la Valle dello M’Zab : lezioni di architettura sostenibile',
					source: 'Adattato da uno studio sul patrimonio urbano nordafricano',
					paragraphs: [
						'Dalle alture affacciate sul Mediterraneo fino alle oasi del Sahara, il patrimonio architettonico algerino custodisce soluzioni pratiche sorprendentemente moderne. Nella Casbah di Algeri, le vie strette e ombreggiate e le case raccolte attorno a un cortile interno temperano il calore estivo e favoriscono il [[vicinato solidale]].',
						'Più a sud, nella Valle dello M’Zab a Ghardaïa, i borghi storici costruiti in pietra e calce si adattano con intelligenza al clima arido. Le finestre ridotte limitano l’ingresso della sabbia, mentre un ingegnoso sistema di canali raccoglie ogni goccia d’acqua piovana per irrigare i palmeti.',
						'Proteggere oggi [[questi monumenti]] attraverso un restauro conservativo attento significa non soltanto salvare la memoria storica, ma anche imparare modelli preziosi di urbanistica rispettosa dell’ambiente.'
					],
					glossary: [
						{ term: 'cortile', meaning: 'spazio interno scoperto al centro della casa tradizionale' },
						{ term: 'calce', meaning: 'materiale naturale tradizionale usato per imbiancare e proteggere i muri' }
					],
					mainIdeaHeader: '1. Il testo sottolinea principalmente che :',
					mainIdeaOptions: [
						'La Casbah di Algeri e la Valle dello M’Zab uniscono memoria storica e architettura sostenibile',
						'Le costruzioni moderne dovrebbero demolire le oasi tradizionali',
						'Il clima del Sahara rende impossibile qualsiasi organizzazione urbana'
					],
					mainIdeaCorrect:
						'La Casbah di Algeri e la Valle dello M’Zab uniscono memoria storica e architettura sostenibile',
					tfItems: [
						{
							q: 'Nella Casbah di Algeri, le strade strette e i cortili interni aiutano a mitigare il caldo.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'I borghi della Valle dello M’Zab sono costruiti esclusivamente con vetro e metallo.',
							a: 'Falso',
							c: 'Sono costruiti in pietra e calce per adattarsi al clima arido (§2).',
							mark: '0.5'
						},
						{
							q: 'Un sistema tradizionale di canali nello M’Zab raccoglie l’acqua piovana per i palmeti.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'Secondo l’autore, il restauro dei monumenti storici non ha alcuna utilità per il presente.',
							a: 'Falso',
							c: 'Permette di salvare la memoria storica e di imparare modelli di urbanistica ecologica (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Quali due funzioni svolgono le vie strette e il cortile interno nella Casbah di Algeri (§1)?',
							a: 'Temperano il calore estivo e favoriscono il vicinato solidale.',
							mark: '0.75'
						},
						{
							q: 'b) Indica due accorgimenti climatici presenti nell’architettura della Valle dello M’Zab (§2).',
							a: 'L’uso di pietra e calce, le finestre ridotte contro la sabbia e i canali per raccogliere l’acqua piovana.',
							mark: '1'
						},
						{
							q: 'c) Che cosa insegna oggi il restauro conservativo di questi centri antichi (§3)?',
							a: 'Insegna modelli preziosi di urbanistica rispettosa dell’ambiente oltre a tutelare la memoria storica.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «vicinato solidale» (§1)   b) «questi monumenti» (§3)',
					refAnswer:
						'a) «vicinato solidale» indica i rapporti fraterni, di aiuto reciproco e rispetto tra le famiglie del quartiere.   b) «questi monumenti» si riferisce alla Casbah di Algeri e ai borghi storici della Valle dello M’Zab.',
					synthPrompt:
						'Quali iniziative concrete possono aiutare i giovani a conoscere e rispettare meglio i siti storici dell’Algeria? Rispondi in quattro o cinque righe.',
					synthAnswer:
						'Le scuole possono organizzare visite guidate regolari alla Casbah di Algeri, alla Grande Moschea di Tlemcen o ai Ponti di Costantina, accompagnate da ricerche documentate. Inoltre, coinvolgere gli studenti in campagne di pulizia e sensibilizzazione rafforza il senso di responsabilità verso il patrimonio comune.',
					quizzes: {
						easy: {
							q: 'Nella Casbah di Algeri, i cortili interni e le vie ombreggiate temperano il calore estivo e favoriscono il vicinato solidale.',
							correctAnswer: true,
							explanation: 'صحيح: الفقرة الأولى تبرز الدور المناخي والاجتماعي لتصميم القصبة.'
						} as TfSpec,
						medium: {
							q: 'I costruttori tradizionali dello M’Zab sprecavano l’acqua piovana senza raccoglierla per le oasi.',
							correctAnswer: false,
							explanation: 'خطأ: الفقرة الثانية تشرح وجود شبكة قنوات ذكية لتجميع مياه الأمطار وسقي النخيل.'
						} as TfSpec,
						hard: {
							q: 'Secondo la conclusione del brano, il restauro conservativo dei siti storici trasmette criteri validi anche per l’urbanistica ecologica odierna.',
							correctAnswer: true,
							explanation: 'صحيح: العمارة التراثية تقدم نماذج عملية للتخطيط العمراني الصديق للبيئة.'
						} as TfSpec
					}
				},
				{
					title: 'Al-Idrisi e la cartografia del Mediterraneo : viaggi, misure e dialogo scientifico',
					source: 'Adattato da una pagina di storia della geografia mediterranea',
					paragraphs: [
						'Nel XII secolo, mentre le rotte marittime collegavano le città del Nord Africa alle coste della Sicilia e della penisola italiana, il celebre geografo e cartografo Al-Idrisi realizzò una descrizione precisa delle terre allora conosciute. Anziché ripetere leggende non verificate, raccolse testimonianze dirette di mercanti, navigatori e studiosi, controllando con rigore distanze e porti.',
						'Il frutto di [[quell’impresa metodica]] fu una grande mappa geografica accompagnata da un ampio trattato scritto in arabo, in cui compaiono regioni del Maghreb, città costiere dell’Algeria e numerose località della Sicilia e dell’Italia. Ogni luogo vi era descritto nei suoi aspetti agricoli, artigianali e marittimi.',
						'L’opera di Al-Idrisi dimostra che la scienza progredisce quando la curiosità intellettuale si unisce all’[[osservazione oggettiva]] e allo scambio rispettoso fra tradizioni culturali diverse.'
					],
					glossary: [
						{ term: 'rotta marittima', meaning: 'percorso seguito dalle navi sul mare' },
						{ term: 'impresa', meaning: 'progetto grande e impegnativo portato a termine' }
					],
					mainIdeaHeader: '1. Il documento mette in evidenza soprattutto :',
					mainIdeaOptions: [
						'Il metodo rigoroso di Al-Idrisi nel descrivere e cartografare il bacino del Mediterraneo',
						'L’assenza totale di contatti commerciali tra Nord Africa e Sicilia nel XII secolo',
						'La sostituzione della geografia scientifica con racconti fantastici'
					],
					mainIdeaCorrect:
						'Il metodo rigoroso di Al-Idrisi nel descrivere e cartografare il bacino del Mediterraneo',
					tfItems: [
						{
							q: 'Al-Idrisi si accontentò di copiare vecchie leggende senza controllare le distanze.',
							a: 'Falso',
							c: 'Raccolse testimonianze dirette e controllò con rigore distanze e porti (§1).',
							mark: '0.5'
						},
						{
							q: 'Nel trattato di Al-Idrisi figurano località sia del Maghreb sia della Sicilia e dell’Italia.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'L’opera geografica descriveva soltanto i nomi delle stelle senza citare l’agricoltura o l’artigianato.',
							a: 'Falso',
							c: 'Ogni luogo vi era descritto nei suoi aspetti agricoli, artigianali e marittimi (§2).',
							mark: '0.5'
						},
						{
							q: 'Secondo la conclusione, lo scambio culturale e l’osservazione oggettiva favoriscono la scienza.',
							a: 'Vero',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Su quali fonti si basò Al-Idrisi per elaborare le sue carte geografiche (§1)?',
							a: 'Su testimonianze dirette di mercanti, navigatori e studiosi, verificando distanze e porti.',
							mark: '0.75'
						},
						{
							q: 'b) Che cosa descriveva il trattato di Al-Idrisi oltre ai confini geografici delle città (§2)?',
							a: 'Gli aspetti agricoli, artigianali e marittimi di ciascuna regione.',
							mark: '1'
						},
						{
							q: 'c) Quale lezione metodologica ricava l’autore dall’opera del cartografo (§3)?',
							a: 'Che la scienza avanza unendo la curiosità intellettuale all’osservazione oggettiva e allo scambio rispettoso.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «quell’impresa metodica» (§2)   b) «osservazione oggettiva» (§3)',
					refAnswer:
						'a) «quell’impresa metodica» rimanda al lungo lavoro di raccolta, verifica diretta e misurazione geografica svolto da Al-Idrisi.   b) «osservazione oggettiva» indica l’esame attento dei fatti reali, basato su prove concrete anziché su leggende.',
					synthPrompt:
						'Perché lo studio della geografia storica e di figure come Al-Idrisi aiuta a comprendere i legami tra Algeria e Italia? Rispondi in quattro o cinque righe.',
					synthAnswer:
						'Lo studio di Al-Idrisi mostra che il Mar Mediterraneo è stato per secoli uno spazio di scambi commerciali e scientifici tra le due sponde. Conoscere queste mappe storiche aiuta i giovani a rispettare il rigore della ricerca e a valorizzare il dialogo culturale tra Maghreb e Italia.',
					quizzes: {
						easy: {
							q: 'Al-Idrisi verificava le testimonianze di mercanti e navigatori invece di ripetere leggende prive di controllo.',
							correctAnswer: true,
							explanation: 'صحيح: اعتمد الإدريسي التحقق الميداني والمقارنة الدقيقة بين روايات البحارة والتجار.'
						} as TfSpec,
						medium: {
							q: 'L’opera geografica di Al-Idrisi ignorava completamente le regioni dell’Algeria e dell’Italia.',
							correctAnswer: false,
							explanation: 'خطأ: تضمن الكتاب وصفاً مفصلاً لمناطق المغرب العربي والجزائر وصقلية وإيطاليا.'
						} as TfSpec,
						hard: {
							q: 'Il testo associa il progresso scientifico all’unione tra rigore empirico e scambio rispettoso di conoscenze.',
							correctAnswer: true,
							explanation: 'صحيح: تبرز الخاتمة أن الملاحظة الموضوعية والتعاون المعرفي يدفعان العلم للأمام.'
						} as TfSpec
					}
				},
				{
					title: 'Da Tlemcen alla medicina di Al-Zahrawi : artigianato geometrico e rigore scientifico',
					source: 'Adattato da un saggio sulla civiltà mediterranea classica',
					paragraphs: [
						'Chi visita la Grande Moschea di Tlemcen o i resti della Qal’a dei Beni Hammad resta colpito dalla precisione geometrica delle volte, degli archi e delle decorazioni scolpite. Quella stessa ricerca di ordine e armonia guidava gli studiosi medievali nei laboratori di medicina, ottica e matematica.',
						'Tra essi spicca il medico e chirurgo Al-Zahrawi, noto in Europa con il nome di Abulcasis. Nel suo celebre trattato illustrato descrisse con chiarezza centinaia di strumenti chirurgici, insistendo sull’igiene delle cure, sulla prudenza del medico e sul dovere etico di non nuocere al paziente. Molti dei suoi manuali furono tradotti in latino e studiati nelle università italiane.',
						'Tanto la pietra intagliata di Tlemcen quanto [[i testi medici di Al-Zahrawi]] ricordano ai maturandi di oggi che la vera civiltà unisce [[bellezza geometrica]], utilità pratica e responsabilità morale.'
					],
					glossary: [
						{ term: 'volta', meaning: 'copertura architettonica curva di un edificio storico' },
						{ term: 'trattato', meaning: 'opera scritta estesa e ordinata su una scienza' }
					],
					mainIdeaHeader: '1. Il messaggio centrale del brano evidenzia :',
					mainIdeaOptions: [
						'L’unione tra precisione geometrica nell’architettura e rigore etico nella medicina di Al-Zahrawi',
						'Il rifiuto della traduzione dei testi medici nelle università mediterranee',
						'L’assenza di strumenti chirurgici illustrati prima dell’età moderna'
					],
					mainIdeaCorrect:
						'L’unione tra precisione geometrica nell’architettura e rigore etico nella medicina di Al-Zahrawi',
					tfItems: [
						{
							q: 'La Grande Moschea di Tlemcen si distingue per l’ordine geometrico di archi e decorazioni.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'Al-Zahrawi trascurò di illustrare gli strumenti chirurgici nel suo trattato medico.',
							a: 'Falso',
							c: 'Nel suo trattato illustrato descrisse con chiarezza centinaia di strumenti chirurgici (§2).',
							mark: '0.5'
						},
						{
							q: 'I manuali di Al-Zahrawi furono tradotti in latino e studiati anche in Italia.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'Secondo il testo, Al-Zahrawi riteneva secondaria l’igiene durante le cure.',
							a: 'Falso',
							c: 'Insisteva sull’igiene delle cure, sulla prudenza e sul dovere di non nuocere (§2).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Quale caratteristica accomuna i monumenti di Tlemcen e il lavoro degli studiosi medievali (§1)?',
							a: 'La ricerca di ordine, precisione geometrica e armonia.',
							mark: '0.75'
						},
						{
							q: 'b) Su quali tre principi insisteva Al-Zahrawi nella pratica medica (§2)?',
							a: 'Sull’igiene delle cure, sulla prudenza del medico e sul dovere etico di non nuocere al paziente.',
							mark: '1'
						},
						{
							q: 'c) Quali tre elementi definiscono la vera civiltà nella frase conclusiva (§3)?',
							a: 'La bellezza geometrica, l’utilità pratica e la responsabilità morale.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «i testi medici di Al-Zahrawi» (§3)   b) «bellezza geometrica» (§3)',
					refAnswer:
						'a) «i testi medici di Al-Zahrawi» rimanda ai trattati chirurgici illustrati dell’autore tradotti in latino e diffusi nel Mediterraneo.   b) «bellezza geometrica» si riferisce alle proporzioni armoniose e alle decorazioni non figurative di monumenti come Tlemcen.',
					synthPrompt:
						'Perché l’etica e l’igiene insegnate da Al-Zahrawi rimangono attuali anche nella scienza moderna? Rispondi in quattro o cinque righe.',
					synthAnswer:
						'Il progresso tecnico perde valore se non è guidato dalla prudenza e dal rispetto della vita umana. L’esempio di Al-Zahrawi ricorda a medici e ricercatori moderni che la competenza pratica deve sempre accompagnarsi alla coscienza morale, alla pulizia e alla chiarezza dell’insegnamento.',
					quizzes: {
						easy: {
							q: 'Quale opera scientifica rese celebre Al-Zahrawi anche nelle università italiane medievali?',
							correctAnswer: true,
							explanation: 'صحيح: تُرجمت كتب الزهراوي الطبية والجراحية المزودة بالرسوم التوضيحية إلى اللاتينية ودُرست في إيطاليا.'
						} as TfSpec,
						medium: {
							q: 'Secondo il brano, l’architettura della Grande Moschea di Tlemcen è priva di simmetria e di proporzioni geometriche.',
							correctAnswer: false,
							explanation: 'خطأ: يشيد النص بالدقة الهندسية للأقواس والقباب والزخارف المنحوتة في جامع تلمسان.'
						} as TfSpec,
						hard: {
							q: 'Al-Zahrawi legava la descrizione dettagliata degli strumenti chirurgici a precisi doveri etici e igienici del medico.',
							correctAnswer: true,
							explanation: 'صحيح: جمع الزهراوي بين الدقة التقنية والالتزام بالنظافة والأمانة الطبية.'
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
					'Leggi attentamente il brano culturale e rispondi alle domande seguenti (7 punti — BAC 3AS LE) :',
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
						content: `4. Precisa il referente o il senso contestuale delle espressioni sottolineate :\n${chosen.refPrompt}`,
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
				trimesterId: 't1',
				difficulty,
				domain: 'cultura_civilta',
				examRole: 'comprehension',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'في أسئلة التبرير، اقتبس الجملة الدالة من الفقرة المشار إليها أو أعد صياغتها بإيطالية سليمة.',
					'راجع دلالة الإحالات (questi monumenti, quell’impresa) بالعودة إلى الجمل السابقة.',
					'التزم بحجم الإجابة المطلوب في سؤال الرأي (4 إلى 5 أسطر) بأسلوب متماسك.'
				],
				solutionStepsAr: [
					'تحديد الفكرة المحورية للنص (0.5 نقطة).',
					'تصنيف وتصويب عبارات الصواب والخطأ (2 نقطتان).',
					'الإجابة عن أسئلة الفهم الثلاثة (2.5 نقطة).',
					'فك الإحالات النصية وكتابة الرأي المعلل (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. LINGUISTIC COMPETENCE (7 pti): Morfologia BAC, derivazione & lessico
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_tpl_3as_le_t1_ling_morfologia_lessico',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'lessico_morfologia',
		titleAr: 'الكفاءة اللغوية (7 نقاط — لغات أجنبية): الاشتقاق الثلاثي، السوابق واللواحق، المرادفات والأضداد',
		curriculumLessonId: 'ita_lesson_3as_le_t1_morfologia_derivazione_sinonimi',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					classPrompt:
						'1. Classifica le seguenti parole nelle due colonne corrispondenti : costanza - biblioteca - onestà - dizionario - solidarietà - traduzione.',
					classCols: [
						{ header: 'Valori morali', items: ['costanza', 'onestà', 'solidarietà'], mark: '0.5' },
						{ header: 'Strumenti educativi', items: ['biblioteca', 'dizionario', 'traduzione'], mark: '0.5' }
					],
					wordRows: [
						{
							verbo: { given: true, value: 'educare' },
							sostantivo: { value: 'educazione', mark: '0.25' },
							aggettivo: { value: 'educativo', mark: '0.25' }
						},
						{
							verbo: { value: 'rispettare', mark: '0.25' },
							sostantivo: { given: true, value: 'rispetto' },
							aggettivo: { value: 'rispettoso', mark: '0.25' }
						},
						{
							verbo: { value: 'costruire', mark: '0.25' },
							sostantivo: { value: 'costruzione', mark: '0.25' },
							aggettivo: { given: true, value: 'costruttivo' }
						}
					],
					lexPrompt:
						'3. Lessico in contesto :\na) Trova un sinonimo (stessa categoria) di : meta (sost.) - incoraggiare (verbo).\nb) Forma il contrario aggiungendo un prefisso adeguato : possibile - legale - regolare - ordinato.',
					lexAnswer:
						'a) meta = traguardo / obiettivo | incoraggiare = promuovere / stimolare.\nb) impossibile, illegale, irregolare, disordinato.',
					grammarPrompt:
						'4. Completa o trasforma con rigore grammaticale :\na) La grande biblioteca (essere / visitare) ogni mattina da centinaia di liceali. (Presente passivo)\nb) I trattati di Al-Idrisi (venire / tradurre) nel Medioevo in tutta l’area mediterranea. (Passato remoto passivo)\nc) Volgi alla forma attiva : «Questi testi storici sono stati conservati con cura dai bibliotecari.»',
					grammarAnswer:
						'a) è visitata (o viene visitata).\nb) vennero tradotti.\nc) I bibliotecari hanno conservato con cura questi testi storici.',
					clozePrompt:
						'5. Completa il testo con le parole adatte : costanza - dizionario - biblioteca - errori.\nChi frequenta regolarmente la (1) .......... del liceo consulta un buon (2) .........., corregge i propri (3) .......... ortografici e scopre il valore della (4) .......... quotidiana.',
					clozeAnswer: '1) biblioteca   2) dizionario   3) errori   4) costanza',
					quizzes: {
						easy: {
							q: 'Collega ciascun aggettivo al suo contrario formato con il prefisso corretto:',
							pairs: [
								{ left: 'possibile', right: 'impossibile' },
								{ left: 'legale', right: 'illegale' },
								{ left: 'regolare', right: 'irregolare' },
								{ left: 'ordinato', right: 'disordinato' }
							],
							explanation: 'تتماثل السابقة in- لتصبح im- قبل b/p، و il- قبل l، و ir- قبل r، بينما يأخذ ordinato السابقة dis-.'
						} as MatchingSpec,
						medium: {
							q: 'Associa ogni verbo al suo sostantivo derivato corretto per il BAC:',
							pairs: [
								{ left: 'educare', right: 'educazione' },
								{ left: 'comprendere', right: 'comprensione' },
								{ left: 'costruire', right: 'costruzione' },
								{ left: 'conoscere', right: 'conoscenza' }
							],
							explanation: 'تشتق الأسماء المجردة في الإيطالية بلواحق قياسية مثل -zione و -sione و -enza.'
						} as MatchingSpec,
						hard: {
							q: 'Abbina ogni termine di livello BAC al suo sinonimo della medesima categoria grammaticale:',
							pairs: [
								{ left: 'traguardo (sost.)', right: 'obiettivo (sost.)' },
								{ left: 'promuovere (verbo)', right: 'incoraggiare (verbo)' },
								{ left: 'integro (agg.)', right: 'onesto (agg.)' },
								{ left: 'costanza (sost.)', right: 'perseveranza (sost.)' }
							],
							explanation: 'المرادف الصحيح في البكالوريا يطابق المعنى والفئة النحوية معاً.'
						} as MatchingSpec
					}
				},
				{
					classPrompt:
						'1. Classifica i termini seguenti secondo l’ambito tematico : architettura - chirurgia - cartografia - restauro - ospedale - mappa.',
					classCols: [
						{ header: 'Patrimonio e architettura', items: ['architettura', 'restauro'], mark: '0.5' },
						{ header: 'Scienza, medicina e geografia', items: ['chirurgia', 'cartografia', 'ospedale', 'mappa'], mark: '0.5' }
					],
					wordRows: [
						{
							verbo: { given: true, value: 'studiare' },
							sostantivo: { value: 'studio', mark: '0.25' },
							aggettivo: { value: 'studioso', mark: '0.25' }
						},
						{
							verbo: { value: 'collaborare', mark: '0.25' },
							sostantivo: { given: true, value: 'collaborazione' },
							aggettivo: { value: 'collaborativo', mark: '0.25' }
						},
						{
							verbo: { value: 'responsabilizzare', mark: '0.25' },
							sostantivo: { value: 'responsabilità', mark: '0.25' },
							aggettivo: { given: true, value: 'responsabile' }
						}
					],
					lexPrompt:
						'3. Lessico in contesto :\na) Dai un sinonimo appropriato di : custodire (verbo) - prezioso (agg.).\nb) Forma il contrario mediante un prefisso : prudente - giusto - leggibile - onesto.',
					lexAnswer:
						'a) custodire = proteggere / conservare | prezioso = pregevole / inestimabile.\nb) imprudente, ingiusto, illeggibile, disonesto.',
					grammarPrompt:
						'4. Trasforma o completa rispettando tempi e accordi :\na) Volgi al passivo : «Un saggio geografico molto accurato descrive le città della Sicilia.»\nb) Completa con il verbo al passivo : «L’anno scorso, due porte antiche della Casbah (venire / restaurare) dagli artigiani.»\nc) Identifica la funzione di «dalle piogge invernali» nella frase : «Le terrazze antiche furono rinfrescate dalle piogge invernali.»',
					grammarAnswer:
						'a) Le città della Sicilia sono (o vengono) descritte da un saggio geografico molto accurato.\nb) vennero restaurate.\nc) Complemento di causa efficiente.',
					clozePrompt:
						'5. Completa le lacune con : restauro - monumenti - memoria - impegno.\nTutelare i (1) .......... storici con un (2) .......... serio richiede (3) .......... collettivo per trasmettere viva la (4) .......... delle generazioni passate.',
					clozeAnswer: '1) monumenti   2) restauro   3) impegno   4) memoria',
					quizzes: {
						easy: {
							q: 'Collega ogni parola al suo contrario formato con prefisso:',
							pairs: [
								{ left: 'prudente', right: 'imprudente' },
								{ left: 'giusto', right: 'ingiusto' },
								{ left: 'leggibile', right: 'illeggibile' },
								{ left: 'onesto', right: 'disonesto' }
							],
							explanation: 'تذكّر im- قبل p، و il- قبل l، و in- قبل g/j، و dis- مع onesto.'
						} as MatchingSpec,
						medium: {
							q: 'Abbina ciascun verbo alla propria famiglia lessicale (Sostantivo / Aggettivo):',
							pairs: [
								{ left: 'collaborare', right: 'collaborazione / collaborativo' },
								{ left: 'studiare', right: 'studio / studioso' },
								{ left: 'informare', right: 'informazione / informativo' },
								{ left: 'organizzare', right: 'organizzazione / organizzato' }
							],
							explanation: 'التحكم في عائلة الكلمات الثلاثية يسهل ملء جدول الصرف في البكالوريا.'
						} as MatchingSpec,
						hard: {
							q: 'Collega ogni termine culturale o etico alla sua definizione precisa:',
							pairs: [
								{ left: 'restauro conservativo', right: 'cura di un edificio senza alterarne l’autenticità' },
								{ left: 'cartografia', right: 'scienza ed arte di disegnare mappe geografiche' },
								{ left: 'dedizione', right: 'impegno generoso e costante verso una causa' },
								{ left: 'sfumatura', right: 'piccola differenza di senso o di stile' }
							],
							explanation: 'فهم هذه المصطلحات بدقة يرفع جودة الفهم والتعبير الكتابي.'
						} as MatchingSpec
					}
				},
				{
					classPrompt:
						'1. Classifica le parole seguenti in atteggiamenti positivi per lo studio o ostacoli da evitare : concentrazione - distrazione - perseveranza - negligenza - ordine - pigrizia.',
					classCols: [
						{ header: 'Abitudini positive', items: ['concentrazione', 'perseveranza', 'ordine'], mark: '0.5' },
						{ header: 'Ostacoli allo studio', items: ['distrazione', 'negligenza', 'pigrizia'], mark: '0.5' }
					],
					wordRows: [
						{
							verbo: { given: true, value: 'organizzare' },
							sostantivo: { value: 'organizzazione', mark: '0.25' },
							aggettivo: { value: 'organizzato', mark: '0.25' }
						},
						{
							verbo: { value: 'solidarizzare', mark: '0.25' },
							sostantivo: { given: true, value: 'solidarietà' },
							aggettivo: { value: 'solidale', mark: '0.25' }
						},
						{
							verbo: { value: 'accessibilizzare', mark: '0.25' },
							sostantivo: { value: 'accessibilità', mark: '0.25' },
							aggettivo: { given: true, value: 'accessibile' }
						}
					],
					lexPrompt:
						'3. Lessico in contesto :\na) Indica un sinonimo di : superare (verbo) - essenziale (agg.).\nb) Forma il contrario con prefisso di : capace - corretto - razionale - fidato.',
					lexAnswer:
						'a) superare = vincere / oltrepassare | essenziale = fondamentale / indispensabile.\nb) incapace, scorretto, irrazionale, sfidato (o diffidente / infido).',
					grammarPrompt:
						'4. Completa e trasforma :\na) I ragazzi hanno pulito il cortile della scuola. (Passa al passivo)\nb) «In questa sala (leggere / si passivante) molti libri ogni pomeriggio.»\nc) Correggi l’errore nella frase : «La ricerca è venuta approvata dal consiglio.»',
					grammarAnswer:
						'a) Il cortile della scuola è stato pulito dai ragazzi.\nb) si leggono (verbo al plurale concordato con molti libri).\nc) La ricerca è stata approvata dal consiglio (nei tempi composti si usa essere, mai venire).',
					clozePrompt:
						'5. Completa le lacune con : pazienza - fonti - successo - metodo.\nLavorare con (1) .......... e verificare le (2) .......... storiche con (3) .......... permette allo studente di raggiungere un (4) .......... meritato.',
					clozeAnswer: '1) metodo   2) fonti   3) pazienza   4) successo',
					quizzes: {
						easy: {
							q: 'Collega ogni parola al suo contrario morfologico:',
							pairs: [
								{ left: 'capace', right: 'incapace' },
								{ left: 'corretto', right: 'scorretto' },
								{ left: 'razionale', right: 'irrazionale' },
								{ left: 'mobile', right: 'immobile' }
							],
							explanation: 'السوابق in-, s-, ir-, im- تنفي الصفات مع احترام القاعدة الإملائية.'
						} as MatchingSpec,
						medium: {
							q: 'Abbina ogni verbo al corrispondente sostantivo astratto:',
							pairs: [
								{ left: 'organizzare', right: 'organizzazione' },
								{ left: 'migliorare', right: 'miglioramento' },
								{ left: 'decidere', right: 'decisione' },
								{ left: 'perseverare', right: 'perseveranza' }
							],
							explanation: 'تذكّر اللواحق الاسمية الأساسية: -zione, -mento, -sione, -anza.'
						} as MatchingSpec,
						hard: {
							q: 'Associa ogni struttura passiva alla sua regola grammaticale esatta:',
							pairs: [
								{ left: 'Tempi composti passivi', right: 'Solo ausiliare essere (è stato fatto)' },
								{ left: 'Ausiliare venire passivo', right: 'Ammesso solo nei tempi semplici' },
								{ left: 'Si passivante + nome plurale', right: 'Verbo obbligatoriamente alla 3ª plurale' },
								{ left: 'Da + forza naturale', right: 'Complemento di causa efficiente' }
							],
							explanation: 'التمييز الدقيق بين هذه القواعد الأربع يمنع أكثر أخطاء المبني للمجهول شيوعاً.'
						} as MatchingSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const { quizQuestion, finalAnswer } = buildMatchingPayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'II. Competenza linguistica — A) Lessico e morfologia',
				points: 7,
				instruction:
					'Svolgi con attenzione le seguenti attività lessicali e grammaticali (7 punti — BAC 3AS LE) :',
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
				trimesterId: 't1',
				difficulty,
				domain: 'lessico_morfologia',
				examRole: 'linguistic_competence',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'في المرادفات والأضداد، التزم بالفئة النحوية نفسها (اسم باسم، فعل بفعل، صفة بصفة).',
					'تذكّر تغيّر السابقة in- إلى im- قبل (b/p/m)، و il- قبل l، و ir- قبل r.',
					'في المبني للمجهول، لا تستعمل المساعد venire في الأزمنة المركبة أبداً.'
				],
				solutionStepsAr: [
					'التصنيف الدلالي الصحيح في الجدول (1 نقطة).',
					'إكمال جدول عائلة الكلمات الثلاثي (1.5 نقطة).',
					'المرادفات والأضداد بالسوابق المناسبة (1.5 نقطة).',
					'التحويل إلى المبني للمجهول وإكمال الفقرة (3 نقاط).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. LINGUISTIC COMPETENCE (7 pti): Forma attiva & passiva (with SVG chart)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_tpl_3as_le_t1_ling_forma_passiva',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'grammatica_sintassi',
		titleAr: 'الكفاءة اللغوية (7 نقاط — لغات أجنبية): المبني للمعلوم والمبني للمجهول مع essere و venire و si passivante',
		curriculumLessonId: 'ita_lesson_3as_le_t1_forma_attiva_passiva',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					svgTitle: 'Forma Attiva e Passiva BAC 3AS LE',
					svgSub: 'Ausiliari essere / venire e accordo del participio',
					svgCols: [
						{ header: 'Tempi semplici', rule: 'essere o venire + part.', examples: 'La mappa viene letta.' },
						{ header: 'Tempi composti', rule: 'SOLO essere + stato + part.', examples: 'È stata tradotta ieri.' },
						{ header: 'Si passivante', rule: 'si + 3ª sing. o plur.', examples: 'Si consultano molti testi.' }
					],
					classPrompt:
						'1. Classifica le seguenti espressioni secondo la presenza del complemento d’agente (persona/ente) o del complemento di causa efficiente (cosa/fenomeno naturale) : scritto da Al-Zahrawi - eroso dal vento - restaurata dagli artigiani - danneggiato dal gelo - tradotta dagli studenti - illuminata dal sole.',
					classCols: [
						{
							header: 'Complemento d’agente',
							items: ['scritto da Al-Zahrawi', 'restaurata dagli artigiani', 'tradotta dagli studenti'],
							mark: '0.75'
						},
						{
							header: 'Causa efficiente',
							items: ['eroso dal vento', 'danneggiato dal gelo', 'illuminata dal sole'],
							mark: '0.75'
						}
					],
					transformPrompt:
						'2. Volgi le frasi dalla forma attiva alla forma passiva mantenendo esattamente lo stesso tempo :\na) Gli studenti hanno riordinato tutti i dizionari della biblioteca.\nb) Il geografo Al-Idrisi descrisse molte città del Mediterraneo.\nc) La pioggia abbondante nutre i campi di ulivi.\nd) Il comune inaugurerà due nuove sale di lettura.',
					transformAnswer:
						'a) Tutti i dizionari della biblioteca sono stati riordinati dagli studenti.\nb) Molte città del Mediterraneo furono descritte dal geografo Al-Idrisi.\nc) I campi di ulivi sono (o vengono) nutriti dalla pioggia abbondante.\nd) Due nuove sale di lettura saranno (o verranno) inaugurate dal comune.',
					reversePrompt:
						'3. Riscrivi passando alla forma attiva o applicando il si passivante :\na) Dalla passiva all’attiva : «L’antico manoscritto era stato custodito con cura dai docenti.»\nb) Correggi la frase rispetto al si passivante : «In questo corso si studia tre lingue straniere.»',
					reverseAnswer:
						'a) I docenti avevano custodito con cura l’antico manoscritto.\nb) In questo corso si studiano tre lingue straniere (verbo plurale concordato con tre lingue).',
					clozePrompt:
						'4. Completa le frasi passive con la forma verbale corretta : viene / sono stati / saranno / si conservano.\nNella biblioteca scolastica (1) .......... molti volumi rari. Ogni settimana il catalogo (2) .......... aggiornato dal personale. I testi danneggiati (3) .......... riparati il mese scorso e presto (4) .......... digitalizzati anche gli archivi storici.',
					clozeAnswer: '1) si conservano   2) viene   3) sono stati   4) saranno',
					quizzes: {
						easy: {
							q: 'Scegli l’ausiliare corretto per il passato prossimo passivo:',
							sentence: 'Le pagine del trattato ___ tradotte con grande attenzione dagli allievi.',
							correct: 'sono state',
							distractors: ['sono venute', 'hanno stato', 'vennero state'],
							explanation: 'في الزمن المركب Passato prossimo للمبني للمجهول نستعمل «essere» حصراً: «sono state».'
						} as ClozeSpec,
						medium: {
							q: 'Completa correttamente la frase con il si passivante e soggetto plurale:',
							sentence: 'In questa biblioteca ___ ogni anno decine di dizionari bilingui.',
							correct: 'si consultano',
							distractors: ['si consulta', 'è consultato', 'viene consultati'],
							explanation: 'مع الفاعل الجمع «decine di dizionari» يجب جمع الفعل في صيغة si passivante: «si consultano».'
						} as ClozeSpec,
						hard: {
							q: 'Scegli la forma esatta dell’ausiliare al trapassato prossimo passivo:',
							sentence: 'Prima dell’inaugurazione, tutte le sale ___ preparate dai volontari.',
							correct: 'erano state',
							distractors: ['erano venute', 'avevano state', 'furono venute'],
							explanation: 'زمن Trapassato prossimo للمبني للمجهول يتكون من imperfetto di essere (erano) + state + participio.'
						} as ClozeSpec
					}
				},
				{
					svgTitle: 'Accordo del Participio nella Forma Passiva',
					svgSub: 'Genere e numero del soggetto paziente (-o / -a / -i / -e)',
					svgCols: [
						{ header: 'Maschile / Femm.', rule: 'sing.: -o / -a | plur.: -i / -e', examples: 'le lettere sono state scritte' },
						{ header: 'Venire = azione', rule: 'Solo in tempi semplici', examples: 'Il museo viene visitato spesso.' },
						{ header: 'Andare = dovere', rule: 'andare + part. = bisogna che', examples: 'I testi vanno verificati.' }
					],
					classPrompt:
						'1. Classifica queste frasi in Passive con ausiliare (essere/venire) o Passive con si passivante : La porta è chiusa dal custode - Si rispettano le regole - Le carte vennero disegnate allora - Si riparano i tetti antichi - Il libro fu letto da molti - Si leggono volentieri i saggi storici.',
					classCols: [
						{
							header: 'Passiva con essere/venire',
							items: ['La porta è chiusa dal custode', 'Le carte vennero disegnate allora', 'Il libro fu letto da molti'],
							mark: '0.75'
						},
						{
							header: 'Si passivante',
							items: ['Si rispettano le regole', 'Si riparano i tetti antichi', 'Si leggono volentieri i saggi storici'],
							mark: '0.75'
						}
					],
					transformPrompt:
						'2. Trasforma alla forma passiva concordando esattamente il participio passato :\na) I volontari distribuiranno i quaderni ai bambini del quartiere.\nb) La professoressa aveva spiegato la regola del participio prima del compito.\nc) Molti studiosi apprezzano le opere di Al-Zahrawi.\nd) Un vento forte piegò i giovani alberi del cortile.',
					transformAnswer:
						'a) I quaderni saranno (o verranno) distribuiti ai bambini del quartiere dai volontari.\nb) La regola del participio era stata spiegata dalla professoressa prima del compito.\nc) Le opere di Al-Zahrawi sono (o vengono) apprezzate da molti studiosi.\nd) I giovani alberi del cortile furono piegati da un vento forte.',
					reversePrompt:
						'3. Risolvi le trasformazioni inverse e le correzioni :\na) Passa all’attiva : «La Grande Moschea di Tlemcen è ammirata dai visitatori di tutto il mondo.»\nb) Indica la differenza di senso tra «La porta è chiusa alle 18» e «La porta viene chiusa alle 18».',
					reverseAnswer:
						'a) I visitatori di tutto il mondo ammirano la Grande Moschea di Tlemcen.\nb) «è chiusa» può descrivere uno stato già compiuto, mentre «viene chiusa» sottolinea l’azione dinamica della chiusura.',
					clozePrompt:
						'4. Completa con : vanno verificati / è stata costruita / vengono accolti / fu composta.\nLa Casbah (1) .......... sui pendii di Algeri nel corso dei secoli. L’opera di Al-Idrisi (2) .......... nel XII secolo. Oggi gli studenti (3) .......... con cortesia in biblioteca e tutti i dati storici (4) .......... con serietà.',
					clozeAnswer: '1) è stata costruita   2) fu composta   3) vengono accolti   4) vanno verificati',
					quizzes: {
						easy: {
							q: 'Scegli il participio passato concordato esattamente con il soggetto femminile plurale:',
							sentence: 'Le fonti storiche sono state ___ prima della pubblicazione.',
							correct: 'verificate',
							distractors: ['verificato', 'verificati', 'verificata'],
							explanation: 'الفاعل «Le fonti storiche» مؤنث جمع، ولذلك ينتهي اسم المفعول بـ -e: «verificate».'
						} as ClozeSpec,
						medium: {
							q: 'Completa correttamente la frase passiva al presente sottolineando il ripetersi dell’azione:',
							sentence: 'Ogni mattina le aule ___ pulite e ordinate prima delle otto.',
							correct: 'vengono',
							distractors: ['sono venute', 'venivano state', 'saranno venute'],
							explanation: 'في الزمن البسيط (presente) يجوز ويفضل استعمال «vengono» لإبراز تكرار الفعل.'
						} as ClozeSpec,
						hard: {
							q: 'Esprimi l’idea di dovere/necessità utilizzando il passivo con «andare»:',
							sentence: 'Le parole straniere ___ tradotte con fedeltà al contesto.',
							correct: 'vanno',
							distractors: ['vengono state', 'andavano state', 'sono venute'],
							explanation: 'التركيب «andare + participio» في الأزمنة البسيطة يعني الوجوب (devono essere tradotte): «vanno tradotte».'
						} as ClozeSpec
					}
				},
				{
					svgTitle: 'Passaggio Attivo / Passivo nei Tempi Composti',
					svgSub: 'Mai usare venire nei tempi composti!',
					svgCols: [
						{ header: 'Pass. prossimo', rule: 'ha scritto : è stato scritto', examples: 'Le note sono state prese.' },
						{ header: 'Trapassato', rule: 'aveva letto : era stato letto', examples: 'Il libro era stato letto.' },
						{ header: 'Futuro ant.', rule: 'avrà finito : sarà stato finito', examples: 'Il testo sarà stato rivisto.' }
					],
					classPrompt:
						'1. Distingui le frasi che ammettono il passivo (verbi transitivi con oggetto diretto) da quelle che NON lo ammettono (verbi intransitivi) : Il maestro corregge il tema - Gli alunni arrivano puntuali - Tutti rispettano i genitori - Il treno parte alle sette - La squadra ha vinto la gara - L’acqua scorre nel canale.',
					classCols: [
						{
							header: 'Ammettono il passivo',
							items: ['Il maestro corregge il tema', 'Tutti rispettano i genitori', 'La squadra ha vinto la gara'],
							mark: '0.75'
						},
						{
							header: 'Non ammettono il passivo',
							items: ['Gli alunni arrivano puntuali', 'Il treno parte alle sette', 'L’acqua scorre nel canale'],
							mark: '0.75'
						}
					],
					transformPrompt:
						'2. Trasforma alla forma passiva solo dove possibile, rispettando tempi e pronomi :\na) Gli studenti avevano consultato i trattati di Al-Zahrawi.\nb) Il vento del sud sposta le dune sabbiose.\nc) Domani mattina i docenti consegneranno i diplomi.\nd) Un’associazione locale ha fondato la nuova biblioteca di quartiere.',
					transformAnswer:
						'a) I trattati di Al-Zahrawi erano stati consultati dagli studenti.\nb) Le dune sabbiose sono (o vengono) spostate dal vento del sud.\nc) Domani mattina i diplomi saranno (o verranno) consegnati dai docenti.\nd) La nuova biblioteca di quartiere è stata fondata da un’associazione locale.',
					reversePrompt:
						'3. Volgi alla forma attiva le frasi seguenti :\na) «I ponti di Costantina furono ammirati da generazioni di viaggiatori.»\nb) «Le lezioni sulla morfologia sono spiegate con chiarezza dal nostro professore.»',
					reverseAnswer:
						'a) Generazioni di viaggiatori ammirarono i ponti di Costantina.\nb) Il nostro professore spiega con chiarezza le lezioni sulla morfologia.',
					clozePrompt:
						'4. Completa con la forma passiva corretta : furono raccolte / verrà aperta / è stato restaurato / si studiano.\nL’antico portale (1) .......... l’anno scorso. Le testimonianze dei viaggiatori (2) .......... da Al-Idrisi nel suo trattato. In questa scuola (3) .......... quattro lingue e presto (4) .......... una nuova sala di lettura.',
					clozeAnswer: '1) è stato restaurato   2) furono raccolte   3) si studiano   4) verrà aperta',
					quizzes: {
						easy: {
							q: 'Scegli il tempo esatto per trasformare al passivo «L’associazione ha aperto la biblioteca»:',
							sentence: 'La biblioteca ___ dall’associazione.',
							correct: 'è stata aperta',
							distractors: ['fu aperta', 'veniva aperta', 'sarà aperta'],
							explanation: 'الفعل الأصلي «ha aperto» في Passato prossimo، ولذلك يظل المبني للمجهول في الزمن نفسه: «è stata aperta».'
						} as ClozeSpec,
						medium: {
							q: 'Completa mantenendo il tempo passato remoto nella trasformazione passiva:',
							sentence: 'Le carte geografiche ___ disegnate da Al-Idrisi nel XII secolo.',
							correct: 'furono',
							distractors: ['sono state', 'saranno', 'vengono'],
							explanation: 'الحدث التاريخي المنجز في القرن الثاني عشر يأخذ Passato remoto: «furono disegnate».'
						} as ClozeSpec,
						hard: {
							q: 'Completa con il si passivante concordato correttamente al passato prossimo:',
							sentence: 'Durante l’anno scolastico ___ molti saggi sulla tutela del patrimonio.',
							correct: 'si sono letti',
							distractors: ['si è letto', 'si sono letto', 'si ha letti'],
							explanation: 'في Passato prossimo مع si passivante يُستعمل المساعد essere دائماً ويتطابق مع الفاعل الجمع المذكر (molti saggi): «si sono letti».'
						} as ClozeSpec
					}
				}
			];

			const vIdx = rng.int(0, pool.length - 1);
			const chosen = pool[vIdx];
			const svgStr = svgItalianConjugationChart({
				title: chosen.svgTitle,
				subtitle: chosen.svgSub,
				columns: chosen.svgCols
			});
			const svgPath = saveItalianSvgAsset(`3as_le_t1_passivo_v${vIdx + 1}`, svgStr);

			const { quizQuestion, finalAnswer } = buildClozePayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'II. Competenza linguistica — B) Grammatica: forma attiva e passiva',
				points: 7,
				instruction:
					'Osserva lo schema riassuntivo e risolvi gli esercizi sulla forma passiva (7 punti — BAC 3AS LE) :',
				content: [
					{
						type: 'image',
						src: svgPath,
						width: 'full',
						caption: 'Sintesi visiva : La forma passiva con essere, venire e si passivante (BAC 3AS LE).'
					},
					{
						type: 'text',
						content: chosen.classPrompt
					},
					buildItalianClassificationTableBlock({ columns: chosen.classCols }),
					{
						type: 'text',
						content: chosen.transformPrompt,
						answer: chosen.transformAnswer,
						mark: '2'
					},
					{
						type: 'text',
						content: chosen.reversePrompt,
						answer: chosen.reverseAnswer,
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
				domain: 'grammatica_sintassi',
				examRole: 'linguistic_competence',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'حافظ دائماً على الزمن الأصلي للفعل عند التحويل بين المبني للمعلوم والمبني للمجهول.',
					'المساعد venire مسموح في الأزمنة البسيطة فقط؛ أما في الأزمنة المركبة فنستعمل essere دائماً.',
					'طابق اسم المفعول (participio passato) مع الفاعل المريض في الجنس والعدد (-o, -a, -i, -e).'
				],
				solutionStepsAr: [
					'التصنيف الدقيق في جدول العمودين (1.5 نقطة).',
					'التحويل من المبني للمعلوم إلى المبني للمجهول مع حفظ الزمن والمطابقة (2 نقطتان).',
					'التحويل العكسي وضبط صيغة si passivante (2 نقطتان).',
					'إكمال الجمل بالصيغ الصحيحة (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. WRITTEN EXPRESSION (6 pti — Integration): Famiglia, educazione e solidarietà
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_tpl_3as_le_t1_writ_educazione_solidarieta',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'produzione_scritta',
		titleAr: 'الإنتاج الكتابي (6 نقاط — لغات أجنبية): الأسرة، التعليم، المطالعة والتضامن الشبابي',
		curriculumLessonId: 'ita_lesson_3as_le_t1_famiglia_educazione_solidarieta',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					tracciaUnoPrompt:
						'Scrivi un breve saggio argomentativo (120–145 parole) per il giornalino del tuo liceo spiegando come i giovani possano unire l’impegno scolastico quotidiano ai valori morali e al rispetto familiare.',
					tracciaUnoPunti: [
						'Distinguere tra il semplice desiderio di riuscire e la costanza nello studio.',
						'Sottolineare il ruolo del dialogo con i genitori e dell’onestà in classe.',
						'Proporre esempi concreti di solidarietà verso i compagni e la comunità.'
					],
					tracciaDuePrompt:
						'«Il volontariato scolastico forma cittadini più responsabili senza ostacolare il rendimento negli studi.» Sei d’accordo? Esponi la tua opinione in 120–145 parole.',
					modelAnswer:
						'Al giorno d’oggi, molti giovani desiderano ottenere brillanti risultati scolastici, ma dimenticano talvolta che il vero successo non si regge senza solidi valori morali. Come conciliare, dunque, le ambizioni personali con l’onestà e il rispetto familiare?\nInnanzitutto, occorre distinguere tra un sogno passeggero e la costanza quotidiana. Chi organizza con ordine la propria giornata ed evita la fretta superficiale dimostra serietà verso i docenti e verso se stesso. Inoltre, ascoltare con gratitudine i consigli dei genitori rafforza l’equilibrio interiore necessario per superare le difficoltà.\nBenché gli impegni scolastici siano intensi, aiutare i compagni in difficoltà o partecipare a piccole azioni solidali nel quartiere insegna umiltà, empatia e senso del dovere.\nIn conclusione, unire lo studio rigoroso alla rettitudine morale e alla generosità costituisce la via più sicura per costruire un futuro sereno e utile alla società.',
					rubricSummary:
						'Pertinenza e sviluppo dei punti (1.5) + Struttura in 4 paragrafi e connettivi (1.5) + Correttezza grammaticale e passivo/congiuntivo (1.5) + Lessico e ortografia (1.5).',
					quizzes: {
						easy: {
							q: 'Classifica le espressioni seguenti in Formule di apertura o Formule di conclusione di un saggio:',
							categories: ['Formule di apertura', 'Formule di conclusione'],
							items: [
								{ text: 'Al giorno d’oggi', category: 0 },
								{ text: 'Negli ultimi anni', category: 0 },
								{ text: 'In conclusione', category: 1 },
								{ text: 'In definitiva', category: 1 }
							],
							explanation: 'تُستعمل «Al giorno d’oggi / Negli ultimi anni» للافتتاح، و«In conclusione / In definitiva» للختام.'
						} as DragDropSpec,
						medium: {
							q: 'Classifica questi connettivi secondo il loro valore di Aggiunta o di Opposizione:',
							categories: ['Connettivi di aggiunta', 'Connettivi di opposizione'],
							items: [
								{ text: 'Inoltre', category: 0 },
								{ text: 'Per di più', category: 0 },
								{ text: 'Tuttavia', category: 1 },
								{ text: 'Eppure', category: 1 }
							],
							explanation: '«Inoltre / Per di più» تفيدان الإضافة، بينما «Tuttavia / Eppure» تفيدان الاستدراك.'
						} as DragDropSpec,
						hard: {
							q: 'Distingui le espressioni di Registro formale BAC da quelle colloquiali da evitare:',
							categories: ['Registro formale BAC', 'Registro colloquiale da evitare'],
							items: [
								{ text: 'Dal mio punto di vista', category: 0 },
								{ text: 'Occorre sottolineare che', category: 0 },
								{ text: 'Boh, alla fine fa niente', category: 1 },
								{ text: 'Insomma, roba così', category: 1 }
							],
							explanation: 'يتطلب التعبير الكتابي في البكالوريا أسلوباً إيطالياً فصيحاً رصيناً.'
						} as DragDropSpec
					}
				},
				{
					tracciaUnoPrompt:
						'Scrivi una lettera formale al Preside del tuo liceo proponendo la creazione di un circolo settimanale di volontariato scolastico e aiuto allo studio in biblioteca (120–145 parole).',
					tracciaUnoPunti: [
						'Inserire luogo, data, formula di apertura formale e uso coerente del pronome «Lei».',
						'Indicare due attività concrete (ripetizioni per i più giovani, cura dei libri in biblioteca).',
						'Spiegare come il progetto promuova la solidarietà senza disturbare le lezioni ufficiali.'
					],
					tracciaDuePrompt:
						'«La vera maturità di uno studente si riconosce nella responsabilità verso i genitori e la propria scuola.» Sviluppa questa idea in un saggio di 120–145 parole.',
					modelAnswer:
						'Algeri, 15 novembre 2025.\nGentile Signor Preside,\nLe scriviamo con rispetto a nome della classe 3AS LE per sottoporLe la proposta di avviare un circolo settimanale di volontariato scolastico presso la nostra biblioteca.\nRiteniamo che questa iniziativa completi la formazione liceale attraverso gesti concreti di solidarietà. In particolare, potremmo organizzare brevi sessioni di ripasso per gli alunni del primo anno, collaborare al riordino dei dizionari e promuovere campagne di scambio gratuito di testi usati prima degli esami.\nBenché alcuni temano che tali attività tolgano tempo allo studio individuale, un calendario equilibrato del sabato mattina permetterà ai volontari di svolgere tutti i compiti con rigore, sviluppando spirito di squadra, puntualità e senso civico.\nRingraziandoLa per la Sua cortese attenzione, Le porgiamo i nostri più distinti saluti.\nGli studenti di 3AS LE.',
					rubricSummary:
						'Formato della lettera formale con «Lei» (1.5) + Chiarezza di argomenti e proposte (1.5) + Morfologia e tempi verbali (1.5) + Lessico e ortografia (1.5).',
					quizzes: {
						easy: {
							q: 'Classifica queste parti secondo appartengano all’apertura o alla chiusura di una lettera formale:',
							categories: ['Apertura della lettera', 'Chiusura della lettera'],
							items: [
								{ text: 'Gentile Signor Preside', category: 0 },
								{ text: 'Le scriviamo con rispetto', category: 0 },
								{ text: 'Distinti saluti', category: 1 },
								{ text: 'RingraziandoLa per l’attenzione', category: 1 }
							],
							explanation: 'تُفتتح الرسالة الرسمية بالتحية المهذبة وتُختتم بالشكر وعبارة الختام الرسمية.'
						} as DragDropSpec,
						medium: {
							q: 'Classifica le frasi secondo esprimano il Trattamento formale (Lei) o quello familiare (tu):',
							categories: ['Registro formale (Lei)', 'Registro familiare (tu)'],
							items: [
								{ text: 'Le porgo i miei saluti', category: 0 },
								{ text: 'Sottopongo alla Sua attenzione', category: 0 },
								{ text: 'Ti scrivo subito dopo cena', category: 1 },
								{ text: 'Passa pure da me domani', category: 1 }
							],
							explanation: 'في المراسلات المدرسية والإدارية بالإيطالية يُستعمل ضمير الاحترام «Lei / Sua / Le».'
						} as DragDropSpec,
						hard: {
							q: 'Classifica questi argomenti in Benefici del circolo o Cautele organizzative:',
							categories: ['Benefici educativi', 'Cautele organizzative'],
							items: [
								{ text: 'Promuove lo spirito di squadra', category: 0 },
								{ text: 'Aiuta gli alunni più giovani', category: 0 },
								{ text: 'Rispetta gli orari ufficiali', category: 1 },
								{ text: 'Non trascura il ripasso personale', category: 1 }
							],
							explanation: 'الرسالة المقنعة تجمع بين إبراز الفوائد والالتزام بضوابط التنظيم المدرسي.'
						} as DragDropSpec
					}
				},
				{
					tracciaUnoPrompt:
						'Redigi un articolo d’opinione (120–145 parole) sul ruolo della lettura profonda e dello studio delle lingue straniere per rafforzare la cultura personale senza dimenticare le proprie radici.',
					tracciaUnoPunti: [
						'Mostrare perché la lettura di libri interi migliora attenzione, lessico e scrittura.',
						'Spiegare come il confronto tra l’arabo e l’italiano perfezioni la capacità di traduzione.',
						'Ricordare l’esempio educativo di studiosi storici algerini dedicati alla scuola.'
					],
					tracciaDuePrompt:
						'«Imparare una lingua straniera significa aprire una finestra sul sapere mantenendo salde le proprie radici.» Commenta questa affermazione in 120–145 parole.',
					modelAnswer:
						'In un’epoca dominata da messaggi rapidissimi, leggere un libro completo e studiare con serietà le lingue straniere rappresentano due risorse indispensabili per gli studenti di 3AS LE. Sorge però spesso un dubbio: imparare altre lingue indebolisce la propria cultura?\nAl contrario, la pratica dimostra che confrontare l’italiano con l’arabo chiarisce le regole della grammatica e affina il senso delle parole. Nessuno può tradurre con fedeltà un testo scientifico o storico se non possiede prima una solida conoscenza della propria lingua materna. Inoltre, frequentare la biblioteca educa alla calma e al pensiero critico.\nCome insegnavano gli educatori riformisti algerini guidati da Cheikh Ben Badis, il sapere autentico unisce sempre radici profonde e apertura costruttiva.\nPertanto, leggere con attenzione e studiare più lingue arricchisce la mente e prepara traduttori e docenti competenti.',
					rubricSummary:
						'Pertinenza tematica e riferimento culturale (1.5) + Progressione logica in 4 paragrafi (1.5) + Precisione morfosintattica (1.5) + Ricchezza lessicale e accenti (1.5).',
					quizzes: {
						easy: {
							q: 'Classifica i comportamenti seguenti in Abitudini di lettura seria o Abitudini da evitare:',
							categories: ['Lettura seria', 'Abitudine da evitare'],
							items: [
								{ text: 'Consultare il dizionario', category: 0 },
								{ text: 'Annotare le parole nuove', category: 0 },
								{ text: 'Leggere solo titoli frettolosi', category: 1 },
								{ text: 'Rimandare tutto alla vigilia', category: 1 }
							],
							explanation: 'الاستعداد الجاد في اللغات يقوم على الفهم والتدوين والمراجعة المنتظمة.'
						} as DragDropSpec,
						medium: {
							q: 'Classifica questi connettivi secondo introducano una Causa o una Conseguenza:',
							categories: ['Causa o spiegazione', 'Conseguenza o risultato'],
							items: [
								{ text: 'Poiché', category: 0 },
								{ text: 'Siccome', category: 0 },
								{ text: 'Pertanto', category: 1 },
								{ text: 'Di conseguenza', category: 1 }
							],
							explanation: 'تستعمل «Poiché / Siccome» للتعليل، و«Pertanto / Di conseguenza» لاستخلاص النتيجة.'
						} as DragDropSpec,
						hard: {
							q: 'Classifica le funzioni seguenti secondo appartengano all’Introduzione o allo Sviluppo del saggio:',
							categories: ['Funzione dell’Introduzione', 'Funzione dello Sviluppo'],
							items: [
								{ text: 'Presentare il contesto generale', category: 0 },
								{ text: 'Porre la domanda centrale', category: 0 },
								{ text: 'Esporre due argomenti chiari', category: 1 },
								{ text: 'Citare un esempio storico preciso', category: 1 }
							],
							explanation: 'تضع المقدمة الإطار والإشكالية، بينما يبني العرض الحجج والأمثلة.'
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
					'Scegli UNA delle due tracce proposte e redigi il testo con chiarezza e correttezza (6 punti — BAC 3AS LE) :',
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
				trimesterId: 't1',
				difficulty,
				domain: 'produzione_scritta',
				examRole: 'written_expression',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'اختر الموضوع الذي تتقن مفرداته وتراكيبه (المقال الحجاجي أو الرسالة الرسمية).',
					'نظّم النص في 4 فقرات واضحة بين 120 و145 كلمة باستخدام الروابط المناسبة.',
					'راجع قبل التسليم: مطابقة اسم المفعول، النبْر الصحيح (perché, più, qualità)، وصيغة «qual è».'
				],
				solutionStepsAr: [
					'فهم التعليمة والالتزام بالنوع المطلوب وعدد الكلمات (1.5 نقطة).',
					'تنظيم الفقرات الأربع وتوظيف الروابط المنطقية (1.5 نقطة).',
					'سلامة النحو والصرف والأزمنة (1.5 نقطة).',
					'ثراء المعجم ودقة الإملاء والترقيم (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 6. WRITTEN EXPRESSION (6 pti — Integration): Patrimonio mediterraneo & scienza
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_tpl_3as_le_t1_writ_patrimonio_culturale',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'produzione_scritta',
		titleAr: 'الإنتاج الكتابي (6 نقاط — لغات أجنبية): التراث المعماري المتوسطي والخرائط العلمية',
		curriculumLessonId: 'ita_lesson_3as_le_t1_patrimonio_mediterraneo_cartografia',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					tracciaUnoPrompt:
						'Redigi un testo espositivo-argomentativo (120–145 parole) sull’importanza di tutelare il patrimonio architettonico algerino, come la Casbah di Algeri, la Grande Moschea di Tlemcen e la Valle dello M’Zab.',
					tracciaUnoPunti: [
						'Spiegare perché i centri storici trasmettono memoria culturale e soluzioni ecologiche.',
						'Ricordare l’equilibrio tra pietra, luce e acqua nell’architettura tradizionale.',
						'Proporre misure concrete per coinvolgere i giovani nella protezione dei monumenti.'
					],
					tracciaDuePrompt:
						'«Restaurare i monumenti antichi non riguarda soltanto il passato, ma illumina anche il modo di progettare le città di domani.» Commenta questa frase in 120–145 parole.',
					modelAnswer:
						'L’Algeria possiede un patrimonio architettonico straordinario che testimonia l’ingegno costruttivo delle generazioni passate. Siti come la Casbah di Algeri, la Grande Moschea di Tlemcen e la Valle dello M’Zab non sono semplici ricordi silenziosi, bensì lezioni vive di equilibrio.\nIn primo luogo, queste città storiche mostrano un adattamento esemplare al clima mediterraneo e desertico. Le strade strette offrono ombra naturale, i materiali locali come pietra e calce proteggono dal caldo e gli antichi canali conservano con cura l’acqua piovana. Inoltre, i cortili interni educano al rispetto del vicinato e alla vita comunitaria.\nBenché l’espansione urbana moderna sia rapida, trascurare tali monumenti sarebbe una perdita irreparabile. Perciò, occorrono restauri conservativi seri e visite scolastiche guidate.\nIn definitiva, custodire il nostro patrimonio significa onorare la memoria collettiva e costruire città più armoniose e sostenibili.',
					rubricSummary:
						'Pertinenza ed esempi precisi (1.5) + Coerenza e connettivi (1.5) + Correttezza grammaticale (1.5) + Lessico architettonico e ortografia (1.5).',
					quizzes: {
						easy: {
							q: 'Ordina le quattro fasi fondamentali di un testo argomentativo sul patrimonio BAC:',
							orderedItems: [
								'Introduzione e presentazione dei siti storici',
								'Primo argomento sulle qualità climatiche e costruttive',
								'Concessione equilibrata sull’urbanistica moderna',
								'Conclusione con proposta concreta per la tutela'
							],
							explanation: 'التصميم الرباعي للمقال: مقدمة، ثم حجج معمارية وبيئية، ثم موازنة مع الحاضر، ثم خاتمة.'
						} as OrderingSpec,
						medium: {
							q: 'Ordina le frasi per formare un paragrafo coerente sulla Valle dello M’Zab:',
							orderedItems: [
								'La Valle dello M’Zab offre un modello antico di urbanistica sostenibile.',
								'Infatti, le sue case in pietra e calce resistono al caldo del deserto.',
								'Inoltre, canali ingegnosi raccolgono l’acqua piovana per i palmeti.',
								'Pertanto, studiare questi borghi ispira soluzioni moderne rispettose della natura.'
							],
							explanation: 'تسلسل منطقي عبر الروابط: عرض الفكرة، ثم «Infatti»، ثم «Inoltre»، فالنتيجة بـ «Pertanto».'
						} as OrderingSpec,
						hard: {
							q: 'Ordina i passi logici di un argomento concessivo sul restauro dei monumenti:',
							orderedItems: [
								'Sebbene il restauro conservativo richieda risorse e tempo,',
								'lasciare degradare la Casbah causerebbe una perdita storica grave.',
								'Un intervento attento preserva invece la memoria e il sapere antico.',
								'Di conseguenza, la tutela dei siti storici è un dovere prioritario.'
							],
							explanation: 'بناء الاعتراض الحجاجي: طرح التحدي بـ Sebbene، ثم التحذير، ثم المقابلة بـ invece، ثم النتيجة.'
						} as OrderingSpec
					}
				},
				{
					tracciaUnoPrompt:
						'Scrivi una lettera formale al responsabile della cultura della tua città proponendo l’organizzazione di una mostra scolastica sulla cartografia di Al-Idrisi e sulla medicina di Al-Zahrawi (120–145 parole).',
					tracciaUnoPunti: [
						'Usare intestazione formale (città, data, saluto e trattamento con «Lei»).',
						'Spiegare due obiettivi culturali della mostra per gli studenti di 3AS LE.',
						'Proporre pannelli chiari e conferenze nella biblioteca comunale senza costi elevati.'
					],
					tracciaDuePrompt:
						'«La scienza e l’artigianato fioriscono dove regnano l’osservazione rigorosa e lo scambio rispettoso tra i popoli.» Sviluppa questa riflessione in 120–145 parole.',
					modelAnswer:
						'Costantina, 22 novembre 2025.\nGentile Signor Direttore,\nLe scriviamo a nome degli studenti di terzo anno di Lingue Straniere per chiedere la Sua collaborazione nell’organizzare una mostra didattica dedicata alla cartografia di Al-Idrisi e alla scienza medica di Al-Zahrawi.\nIl nostro obiettivo principale è avvicinare i giovani al patrimonio scientifico mediterraneo attraverso mappe storiche, schede bilingui arabo-italiane e modelli di strumenti descritti nei trattati antichi. In questo modo, gli alunni potranno scoprire come l’osservazione rigorosa e l’etica professionale abbiano favorito i contatti culturali tra il Maghreb e la Sicilia.\nL’esposizione potrebbe svolgersi per tre giorni presso la sala della biblioteca municipale, con la guida volontaria dei nostri insegnanti di storia e di italiano.\nRingraziandoLa fin d’ora per il Suo sostegno alle attività giovanili, Le porgiamo i più distinti saluti.\nI maturandi di 3AS LE.',
					rubricSummary:
						'Struttura della lettera formale (1.5) + Chiarezza di obiettivi e organizzazione (1.5) + Uso corretto di «Lei» e tempi verbali (1.5) + Ortografia e registro (1.5).',
					quizzes: {
						easy: {
							q: 'Ordina dall’alto verso il basso le sezioni obbligatorie di una lettera formale:',
							orderedItems: [
								'Luogo e data in alto',
								'Formula di apertura rivolta al destinatario',
								'Corpo con la richiesta e gli argomenti principali',
								'Ringraziamento, saluto formale e firma'
							],
							explanation: 'الترتيب القياسي للرسالة الرسمية: المكان والتاريخ، التحية، المتن، ثم الشكر والختام.'
						} as OrderingSpec,
						medium: {
							q: 'Ordina le idee del corpo della lettera indirizzata al responsabile culturale:',
							orderedItems: [
								'Presentare subito lo scopo della richiesta',
								'Descrivere i contenuti della mostra su Al-Idrisi e Al-Zahrawi',
								'Precisare il luogo, i giorni e la guida dei docenti',
								'Ringraziare con cortesia prima della firma'
							],
							explanation: 'تبدأ الرسالة بالغرض ثم التفاصيل العلمية ثم التنظيم اللوجستي وأخيراً الشكر.'
						} as OrderingSpec,
						hard: {
							q: 'Ordina le frasi per ricostruire un ragionamento sullo scambio scientifico mediterraneo:',
							orderedItems: [
								'Nel XII secolo, le mappe di Al-Idrisi collegarono conoscenze diverse.',
								'Infatti, egli verificò con rigore le rotte e le città del Mediterraneo.',
								'Allo stesso modo, i manuali di Al-Zahrawi furono tradotti e studiati a lungo.',
								'Perciò, la storia della scienza insegna oggi l’importanza dell’osservazione seria.'
							],
							explanation: 'تسلسل برهاني متماسك حول الإدريسي والزهراوي وأثر المنهج العلمي.'
						} as OrderingSpec
					}
				},
				{
					tracciaUnoPrompt:
						'Scrivi un breve saggio (120–145 parole) spiegando cosa possono imparare gli studenti di oggi dal metodo scientifico di Al-Idrisi, Al-Zahrawi e Ibn Al-Haytham.',
					tracciaUnoPunti: [
						'Ricordare l’importanza di verificare i fatti prima di accettare un’informazione.',
						'Sottolineare il legame tra competenza tecnica ed etica morale verso gli altri.',
						'Incoraggiare la serietà e la pazienza nello studio liceale.'
					],
					tracciaDuePrompt:
						'«La conoscenza autentica unisce sempre curiosità intellettuale, prova oggettiva e responsabilità morale.» Sviluppa questa tesi in 120–145 parole.',
					modelAnswer:
						'Spesso si pensa che i grandi studiosi del passato appartengano a un mondo lontano dalle nostre esigenze quotidiane. Tuttavia, l’esempio di Al-Idrisi, Al-Zahrawi e Ibn Al-Haytham offre insegnamenti molto attuali a ogni studente delle scuole superiori.\nInnanzitutto, il loro metodo si fondava sull’osservazione attenta e sulla verifica delle fonti. Al-Idrisi controllava distanze e rotte prima di tracciare una mappa, mentre Ibn Al-Haytham sperimentava ogni ipotesi invece di accettarla passivamente. Allo stesso modo, oggi occorre verificare sempre i dati prima di citarli in una ricerca.\nIn secondo luogo, Al-Zahrawi ricordava che la conoscenza medica esige prudenza e rispetto della dignità umana.\nIn conclusione, studiare la storia scientifica del Mediterraneo educa i giovani alla pazienza, al rigore metodico e alla responsabilità morale in qualsiasi professione futura.',
					rubricSummary:
						'Pertinenza e accuratezza dei riferimenti (1.5) + Coesione logica (1.5) + Precisione grammaticale (1.5) + Lessico e ortografia (1.5).',
					quizzes: {
						easy: {
							q: 'Ordina le fasi corrette di lavorazione del testo durante l’Esame di Maturità:',
							orderedItems: [
								'Leggere con calma entrambe le tracce proposte',
								'Sceglierne una e tracciare la scaletta in brutta copia',
								'Redigere i quattro paragrafi con connettivi chiari',
								'Rileggere accenti, accordi e tempi verbali alla fine'
							],
							explanation: 'الخطوات الأربع المثلى لإنجاز التعبير الكتابي يوم الامتحان.'
						} as OrderingSpec,
						medium: {
							q: 'Ordina le tappe concettuali del saggio sui pionieri della scienza mediterranea:',
							orderedItems: [
								'Introdurre l’attualità degli studiosi classici per i giovani',
								'Spiegare l’importanza della verifica empirica nei lavori di Al-Idrisi',
								'Collegare la competenza medica di Al-Zahrawi alla responsabilità etica',
								'Concludere esortando allo studio serio e paziente'
							],
							explanation: 'تدرج منهجي من الفكرة التمهيدية إلى الأمثلة العلمية والأخلاقية ثم الخاتمة.'
						} as OrderingSpec,
						hard: {
							q: 'Ordina gli enunciati per ricostruire un paragrafo sul metodo sperimentale e l’etica:',
							orderedItems: [
								'Sebbene oggi le informazioni circolino con grande rapidità,',
								'la fretta non sostituisce la verifica rigorosa dei fatti.',
								'Come dimostra Ibn Al-Haytham, occorre provare ogni ipotesi con metodo.',
								'Così facendo, lo studente coltiva autonomia critica e serietà intellettuale.'
							],
							explanation: 'ربط محكم بين الواقع الرقمي السريع والمنهج التجريبي عند ابن الهيثم.'
						} as OrderingSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const { quizQuestion, finalAnswer } = buildOrderingPayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'III. Produzione scritta',
				points: 6,
				instruction:
					'Scegli UNA delle due tracce proposte e redigi un testo coerente rispettando lunghezza e registro (6 punti — BAC 3AS LE) :',
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
				trimesterId: 't1',
				difficulty,
				domain: 'produzione_scritta',
				examRole: 'written_expression',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تأكد من الكتابة السليمة للأعلام والمواقع: Casbah di Algeri, Grande Moschea di Tlemcen, Valle dello M’Zab, Al-Idrisi, Al-Zahrawi, Ibn Al-Haytham.',
					'حافظ على تقسيم واضح من 4 فقرات في حدود 120–145 كلمة.',
					'في الرسالة الرسمية استعمل «Lei» وافتتاحاً وختاماً رسميين دون اختلاط بضمير «tu».'
				],
				solutionStepsAr: [
					'الالتزام بالموضوع والقالب الشكلي المطلوب (1.5 نقطة).',
					'تماسك الأفكار واستثمار الروابط الحجاجية (1.5 نقطة).',
					'الدقة النحوية والصرفية (1.5 نقطة).',
					'ثراء المفردات وسلامة الإملاء والترقيم (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	}
];
