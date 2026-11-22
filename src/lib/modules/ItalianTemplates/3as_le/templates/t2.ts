import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildItalianClassificationTableBlock,
	buildItalianPassageBlock,
	buildItalianWordFamilyTableBlock,
	buildItalianWrittenProductionBlock
} from '../../italian-helpers';
import { saveItalianSvgAsset, svgItalianTenseTimeline } from '../../svg-italian';
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
 * Parameterized Exam & Quiz Templates — Trimestre 2 : Alimentazione, Artigianato, Scienza & Congiuntivo / Indiretto (6 templates)
 * Roles: 2 comprehension (7 pti) + 2 linguistic_competence (7 pti) + 2 written_expression (6 pti)
 */
export const TEMPLATES_3AS_LE_T2: ItalianParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPREHENSION (7 pti): Alimentazione sana mediterranea e artigianato
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_tpl_3as_le_t2_comp_alimentazione_artigianato',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'comprensione_testo',
		titleAr: 'فهم النص (7 نقاط — لغات أجنبية): التغذية الصحية الحلال والحرف اليدوية الراقية',
		curriculumLessonId: 'ita_lesson_3as_le_t2_alimentazione_artigianato_qualita',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'La dieta mediterranea naturale : salute quotidiana e sobrietà a tavola',
					source: 'Adattato da un opuscolo educativo sull’alimentazione equilibrata',
					paragraphs: [
						'Negli ultimi decenni, i ritmi veloci delle città hanno spinto molti giovani a preferire spuntini industriali ricchi di zuccheri e grassi raffinati. Eppure, la tradizione alimentare delle sponde mediterranee offre un modello molto più sano, semplice e conveniente: olio extravergine d’oliva, verdure fresche, legumi, cereali integrali, datteri e [[frutta di stagione]].',
						'I medici ricordano che nutrirsi con equilibrio non significa spendere molto, bensì scegliere ingredienti genuini, bere acqua pura e rispettare orari regolari per i pasti. La moderazione a tavola protegge l’organismo, favorisce la concentrazione durante lo studio e previene la stanchezza pomeridiana.',
						'Altrettanto urgente è educare le famiglie a combattere [[lo spreco alimentare]]. Pianificare la spesa settimanale e cucinare solo le porzioni necessarie esprime gratitudine verso i beni della terra e rispetto per il lavoro degli agricoltori.'
					],
					glossary: [
						{ term: 'genuino', meaning: 'naturale, puro e non alterato da additivi superflui' },
						{ term: 'sobrietà', meaning: 'senso della misura e assenza di sprechi o eccessi' }
					],
					mainIdeaHeader: '1. La tesi centrale del testo sostiene che :',
					mainIdeaOptions: [
						'La dieta mediterranea naturale, unita alla moderazione e alla lotta allo spreco, tutela salute e risorse',
						'I cibi industriali rapidi garantiscono migliore concentrazione rispetto agli alimenti freschi',
						'Seguire un’alimentazione equilibrata richiede sempre spese elevate e cibi rari'
					],
					mainIdeaCorrect:
						'La dieta mediterranea naturale, unita alla moderazione e alla lotta allo spreco, tutela salute e risorse',
					tfItems: [
						{
							q: 'I ritmi urbani recenti hanno favorito la diffusione di spuntini industriali ricchi di zuccheri.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'Secondo il testo, nutrirsi in modo sano impone di comprare cibi molto costosi.',
							a: 'Falso',
							c: 'Nutrirsi con equilibrio non significa spendere molto, bensì scegliere ingredienti genuini (§2).',
							mark: '0.5'
						},
						{
							q: 'La moderazione a tavola aiuta anche la concentrazione nello studio.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'Pianificare la spesa settimanale aumenta inutilmente lo spreco di cibo.',
							a: 'Falso',
							c: 'Pianificare la spesa e cucinare porzioni necessarie combatte lo spreco alimentare (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Cita quattro alimenti naturali della tradizione mediterranea menzionati nel paragrafo 1.',
							a: 'Olio extravergine d’oliva, verdure fresche, legumi, cereali integrali, datteri e frutta di stagione.',
							mark: '0.75'
						},
						{
							q: 'b) Quali tre abitudini sane raccomandano i medici nel paragrafo 2?',
							a: 'Scegliere ingredienti genuini, bere acqua pura e rispettare orari regolari per i pasti con moderazione.',
							mark: '1'
						},
						{
							q: 'c) Che cosa dimostra il rifiuto dello spreco alimentare secondo la conclusione (§3)?',
							a: 'Dimostra gratitudine verso i beni della terra e rispetto per il lavoro degli agricoltori.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «frutta di stagione» (§1)   b) «lo spreco alimentare» (§3)',
					refAnswer:
						'a) «frutta di stagione» indica i frutti maturati naturalmente nel proprio periodo dell’anno, come agrumi, fichi o datteri, senza forzature industriali.   b) «lo spreco alimentare» si riferisce all’abitudine di comprare o cucinare troppo cibo fino a gettarlo via.',
					synthPrompt:
						'Come può uno studente liceale migliorare la propria alimentazione quotidiana evitando il cibo spazzatura? Rispondi in quattro o cinque righe.',
					synthAnswer:
						'Uno studente può iniziare facendo una colazione equilibrata con pane integrale, olio d’oliva, datteri e frutta fresca, portando a scuola acqua pura invece di bibite zuccherate. Inoltre, evitare spuntini molto fritti aiuta a restare vigili durante le lezioni e a prevenire la stanchezza.',
					quizzes: {
						easy: {
							q: 'Quali alimenti rappresentano il modello sano descritto nel paragrafo 1?',
							correct: 'Olio d’oliva, verdure fresche, legumi, cereali integrali, datteri e frutta di stagione',
							wrong: [
								'Bibite gassate zuccherate e merendine industriali',
								'Alimenti ricchi di grassi raffinati e conservanti',
								'Esclusivamente piatti pronti surgelati'
							],
							explanation: 'تعدد الفقرة الأولى مكونات التغذية المتوسطية الصحية الطبيعية.'
						} as McqSpec,
						medium: {
							q: 'Quale beneficio scolastico viene collegato nel paragrafo 2 alla moderazione a tavola?',
							correct: 'Favorisce la concentrazione nello studio e previene la stanchezza pomeridiana',
							wrong: [
								'Elimina il bisogno di dormire a sufficienza',
								'Sostituisce la lettura dei manuali scolastici',
								'Raddoppia il consumo di zuccheri raffinati'
							],
							explanation: 'تربط الفقرة الثانية بين الاعتدال الغذائي والتركيز الذهني وتفادي الخمول.'
						} as McqSpec,
						hard: {
							q: 'Che cosa significa combattere lo spreco alimentare secondo la conclusione del brano?',
							correct: 'Pianificare gli acquisti ed esprimere gratitudine verso la terra e gli agricoltori',
							wrong: [
								'Acquistare scorte eccessive ogni settimana',
								'Abbandonare i mercati agricoli locali',
								'Cucinare porzioni doppie rispetto al bisogno'
							],
							explanation: 'تربط الخاتمة مكافحة التبذير الغذائي بالتخطيط والاعتراف بفضل الفلاحين ونعم الأرض.'
						} as McqSpec
					}
				},
				{
					title: 'Le botteghe dell’artigianato geometrico : pazienza, qualità e lavoro onesto',
					source: 'Adattato da un articolo sulle arti decorative e i mestieri tradizionali',
					paragraphs: [
						'In molte città algerine e italiane sopravvivono antiche botteghe dove maestri artigiani modellano l’argilla, intrecciano tappeti in lana naturale o lavorano il legno d’ulivo con motivi geometrici armoniosi. A differenza degli oggetti in plastica fabbricati in serie e presto gettati via, [[un manufatto artigianale]] nasce da gesti pazienti e dura per decenni.',
						'Dietro una ciotola in ceramica decorata con stelle e intrecci lineari o dietro un tessuto resistente ci sono ore di preparazione delle materie prime locali, precisione manuale e amore per il lavoro ben fatto. Ogni pezzo dimostra che la bellezza può nascere senza eccessi, unendo utilità quotidiana e rispetto dell’ambiente.',
						'Sostenere [[queste piccole officine]] e offrire ai giovani percorsi seri di apprendistato consente di preservare competenze rare, creare impiego dignitoso e trasmettere un patrimonio vivo alle future generazioni.'
					],
					glossary: [
						{ term: 'manufatto', meaning: 'oggetto realizzato a mano con cura da un artigiano' },
						{ term: 'apprendistato', meaning: 'periodo pratico di formazione presso un maestro esperto' }
					],
					mainIdeaHeader: '1. Il testo valorizza l’artigianato tradizionale perché :',
					mainIdeaOptions: [
						'Unisce qualità duratura, motivi geometrici rispettosi dell’ambiente e lavoro onesto per i giovani',
						'Costituisce una produzione in serie veloce fatta soltanto con materiali sintetici',
						'È destinato a scomparire senza alcuna utilità per l’economia locale'
					],
					mainIdeaCorrect:
						'Unisce qualità duratura, motivi geometrici rispettosi dell’ambiente e lavoro onesto per i giovani',
					tfItems: [
						{
							q: 'I manufatti artigianali tradizionali durano più a lungo degli oggetti usa e getta in plastica.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'La decorazione della ceramica descritta nel testo si ispira alla fantasia violenta.',
							a: 'Falso',
							c: 'Si basa su motivi geometrici armoniosi, stelle e intrecci lineari (§1 e §2).',
							mark: '0.5'
						},
						{
							q: 'Il lavoro artigianale impiega materie prime locali ed esige precisione manuale.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'L’autore scoraggia l’apprendistato dei giovani nelle botteghe artigiane.',
							a: 'Falso',
							c: 'Sostiene l’apprendistato per preservare competenze rare e creare impiego dignitoso (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Che cosa differenzia un manufatto artigianale da un oggetto prodotto in serie (§1)?',
							a: 'Nasce da gesti pazienti con materiali naturali e dura per decenni anziché essere gettato presto.',
							mark: '0.75'
						},
						{
							q: 'b) Quali qualità caratterizzano il lavoro dietro la ceramica geometrica e i tessuti artigianali (§2)?',
							a: 'La preparazione accurata delle materie prime locali, la precisione manuale e l’amore per il lavoro ben fatto.',
							mark: '1'
						},
						{
							q: 'c) Quali tre benefici porta il sostegno alle botteghe e all’apprendistato giovanile (§3)?',
							a: 'Preserva competenze rare, crea impiego dignitoso e trasmette un patrimonio vivo alle future generazioni.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «un manufatto artigianale» (§1)   b) «queste piccole officine» (§3)',
					refAnswer:
						'a) «un manufatto artigianale» indica un oggetto di qualità — come un vaso in ceramica o un tessuto — realizzato a mano da un maestro.   b) «queste piccole officine» rimanda alle botteghe tradizionali degli artigiani menzionate nei primi due paragrafi.',
					synthPrompt:
						'Perché l’acquisto di prodotti artigianali durevoli invece di oggetti usa e getta fa bene sia all’economia locale sia all’ambiente? Rispondi in quattro o cinque righe.',
					synthAnswer:
						'Preferire un oggetto artigianale durevole sostiene direttamente le famiglie dei lavoratori locali e mantiene vivi i mestieri tradizionali della regione. Inoltre, poiché dura molti anni ed è fabbricato con argilla, legno o lana naturale, riduce drasticamente la quantità di rifiuti plastici.',
					quizzes: {
						easy: {
							q: 'Quali materiali e tecniche caratterizzano le botteghe descritte nel paragrafo 1?',
							correct: 'Argilla, lana naturale e legno d’ulivo lavorati con motivi geometrici',
							wrong: [
								'Plastica industriale stampata rapidamente',
								'Tessuti sintetici usa e getta',
								'Oggetti privi di qualsiasi cura manuale'
							],
							explanation: 'تبرز الفقرة الأولى استعمال المواد الطبيعية والزخرفة الهندسية المتقنة.'
						} as McqSpec,
						medium: {
							q: 'Che cosa dimostra il lavoro minuzioso della ceramica e dei tessuti nel paragrafo 2?',
							correct: 'Che l’utilità quotidiana può unirsi alla bellezza geometrica e al rispetto ambientale',
							wrong: [
								'Che il lavoro manuale è sempre disordinato e frettoloso',
								'Che gli artigiani evitano le materie prime locali',
								'Che la qualità non conta quanto la quantità'
							],
							explanation: 'تجمع الحرفة الأصيلة بين النفع العملي والجمال الهندسي المتزن.'
						} as McqSpec,
						hard: {
							q: 'Quale ruolo assegna il paragrafo 3 all’apprendistato giovanile presso i maestri artigiani?',
							correct: 'Preservare competenze rare, offrire lavoro dignitoso e trasmettere un patrimonio vivo',
							wrong: [
								'Chiudere definitivamente i laboratori tradizionali',
								'Sostituire ogni scuola secondaria con fabbriche automatiche',
								'Limitare la qualità dei prodotti regionali'
							],
							explanation: 'تؤكد الخاتمة أن التكوين لدى المعلمين الحرفيين يصون الحرفة ويخلق فرص عمل شريفة.'
						} as McqSpec
					}
				},
				{
					title: 'Dall’uliveto al mercato locale : agricoltura sana e filiera corta',
					source: 'Adattato da una rivista sullo sviluppo agricolo mediterraneo',
					paragraphs: [
						'Lungo le colline della Cabilia, nelle pianure fertili del nord e nelle oasi del sud algerino, la raccolta delle olive, degli agrumi e dei datteri rappresenta molto più di una semplice attività economica. Da secoli, [[questi raccolti genuini]] assicurano alle famiglie alimenti ricchi di energia naturale e sostengono intere comunità rurali.',
						'Negli ultimi anni, numerosi giovani agronomi hanno affiancato i contadini esperti per migliorare la qualità dell’olio d’oliva mediante la spremitura a freddo, il risparmio dell’acqua di irrigazione e la vendita diretta nei mercati locali. Riducendo gli intermediari inutili attraverso la filiera corta, i prodotti arrivano freschi in tavola a prezzi giusti.',
						'Valorizzare [[l’agricoltura rispettosa della terra]] significa proteggere insieme la salute dei consumatori, l’equilibrio ecologico delle campagne e l’autonomia alimentare del Paese.'
					],
					glossary: [
						{ term: 'spremitura a freddo', meaning: 'estrazione naturale dell’olio senza riscaldamento chimico' },
						{ term: 'filiera corta', meaning: 'percorso breve dal produttore locale direttamente al consumatore' }
					],
					mainIdeaHeader: '1. Il messaggio principale del brano evidenzia :',
					mainIdeaOptions: [
						'I vantaggi sanitari, ecologici ed economici dell’agricoltura locale e della filiera corta',
						'La necessità di sostituire gli uliveti con prodotti importati da lontano',
						'L’impossibilità di collaborare tra giovani agronomi e contadini esperti'
					],
					mainIdeaCorrect:
						'I vantaggi sanitari, ecologici ed economici dell’agricoltura locale e della filiera corta',
					tfItems: [
						{
							q: 'Olive, agrumi e datteri rappresentano una risorsa nutrizionale ed economica storica per molte famiglie.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'I giovani agronomi rifiutano di collaborare con gli agricoltori tradizionali.',
							a: 'Falso',
							c: 'Affiancano i contadini esperti per migliorare la qualità e risparmiare acqua (§2).',
							mark: '0.5'
						},
						{
							q: 'La filiera corta riduce gli intermediari e mantiene freschi i prodotti a prezzi equi.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'Secondo la conclusione, l’agricoltura locale danneggia l’equilibrio ecologico.',
							a: 'Falso',
							c: 'Protegge insieme la salute dei consumatori, l’equilibrio ecologico e l’autonomia alimentare (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Quali tre produzioni agricole naturali cita il testo nel primo paragrafo?',
							a: 'Olive, agrumi e datteri.',
							mark: '0.75'
						},
						{
							q: 'b) Indica due miglioramenti tecnici introdotti insieme da agronomi e contadini (§2).',
							a: 'La spremitura a freddo dell’olio d’oliva, il risparmio dell’acqua di irrigazione e la vendita diretta.',
							mark: '1'
						},
						{
							q: 'c) Quali tre obiettivi raggiunge la valorizzazione dell’agricoltura locale (§3)?',
							a: 'Proteggere la salute dei consumatori, l’equilibrio ecologico delle campagne e l’autonomia alimentare.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «questi raccolti genuini» (§1)   b) «l’agricoltura rispettosa della terra» (§3)',
					refAnswer:
						'a) «questi raccolti genuini» si riferisce alle olive, agli agrumi e ai datteri coltivati naturalmente nelle diverse regioni.   b) «l’agricoltura rispettosa della terra» indica una coltivazione sana, attenta al risparmio idrico e alla qualità naturale dei cibi.',
					synthPrompt:
						'Perché la collaborazione tra i giovani laureati in agronomia e i contadini anziani è preziosa per il futuro alimentare del Paese? Rispondi in quattro o cinque righe.',
					synthAnswer:
						'L’esperienza dei contadini anziani conosce bene il clima, il terreno e i ritmi naturali delle stagioni, mentre i giovani agronomi portano tecniche moderne di irrigazione mirata e controllo qualitativo. Unendo sapere tradizionale e innovazione responsabile si ottiene un’agricoltura più sana e produttiva.',
					quizzes: {
						easy: {
							q: 'Che cosa garantisce la «filiera corta» descritta nel paragrafo 2?',
							correct: 'Prodotti freschi a prezzi equi riducendo gli intermediari superflui',
							wrong: [
								'Trasporti lunghi tra continenti diversi',
								'Aumento artificiale dei prezzi alimentari',
								'Sostituzione dei prodotti freschi con conserve'
							],
							explanation: 'توضح الفقرة الثانية أن البيع المباشر يختصر الوسطاء ويحافظ على طزاجة المنتجات وعدالة الأسعار.'
						} as McqSpec,
						medium: {
							q: 'Quale tecnica citata nel testo preserva la qualità naturale dell’olio d’oliva?',
							correct: 'La spremitura a freddo affiancata dal risparmio idrico',
							wrong: [
								'L’aggiunta di coloranti artificiali',
								'Il consumo eccessivo di acqua nei campi',
								'L’abbandono delle olive mature sugli alberi'
							],
							explanation: 'العصر على البارد (spremitura a freddo) يحافظ على الخصائص الغذائية الطبيعية لزيت الزيتون.'
						} as McqSpec,
						hard: {
							q: 'Quali tre pilastri collega la conclusione parlando di agricoltura rispettosa della terra?',
							correct: 'Salute dei consumatori, equilibrio ecologico e autonomia alimentare',
							wrong: [
								'Speculazione rapida, spreco idrico e importazioni massicce',
								'Inquinamento chimico, abbandono rurale e prezzi alti',
								'Esclusione dei mercati cittadini locali'
							],
							explanation: 'تجمع الخاتمة بين صحة المستهلك والتوازن البيئي والأمن الغذائي.'
						} as McqSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const spec = chosen.quizzes[difficulty];
			const { quizQuestion, finalAnswer } = buildMcqPayload(
				spec,
				`اقرأ الأسئلة حول التغذية الصحية والحرف الراقية واختر الإجابة الصحيحة: ${spec.q}`,
				'راجع معطيات الفقرة المذكورة وتجنب التعميمات المخالفة للنص.',
				rng
			);
			const openAnswer = chosen.openQuestions.map((x) => `${x.q.slice(0, 2)} ${x.a}`).join('\n');

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Comprensione del testo',
				points: 7,
				instruction:
					'Leggi attentamente il testo e rispondi alle domande seguenti (7 punti — BAC 3AS LE) :',
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
				trimesterId: 't2',
				difficulty,
				domain: 'comprensione_testo',
				examRole: 'comprehension',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تأكد من تعليل كل جملة «Falso» بإشارة دقيقة إلى الفقرة المناسبة.',
					'ميّز بين مزايا المنتجات الطبيعية والحرف اليدوية ومخاطر التسرع والاستهلاك المفرط.',
					'اكتب الرأي الشخصي في 4–5 أسطر بإيطالية سليمة مع جملة افتتاحية وسببين وخاتمة.'
				],
				solutionStepsAr: [
					'تحديد الفكرة الرئيسية للنص (0.5 نقطة).',
					'الحكم والتبرير النصي في عبارات الصواب والخطأ (2 نقطتان).',
					'الإجابة عن أسئلة الفهم الثلاثة (2.5 نقطة).',
					'فك الإحالات النصية وكتابة الرأي الشخصي (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. COMPREHENSION (7 pti): Scienza, tecnologia e informazione responsabile
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_tpl_3as_le_t2_comp_scienza_informazione',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'comprensione_testo',
		titleAr: 'فهم النص (7 نقاط — لغات أجنبية): العلوم، التكنولوجيا والإعلام الرقمي المسؤول',
		curriculumLessonId: 'ita_lesson_3as_le_t2_scienza_tecnologia_informazione',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Alfabetizzazione digitale e verifica delle fonti nell’era dell’informazione',
					source: 'Adattato da un saggio sull’educazione ai media e alle fonti scientifiche',
					paragraphs: [
						'Ogni giorno, studenti e cittadini consultano in pochi secondi enciclopedie online, archivi universitari e notiziari digitali. Questa rapidità facilita senza dubbio l’accesso al sapere, ma nasconde un rischio frequente: confondere la quantità di notizie circolanti con la loro [[affidabilità scientifica]].',
						'Per evitare gli inganni della disinformazione, la vera alfabetizzazione digitale insegna tre abitudini essenziali: controllare chi ha scritto un articolo, confrontare più fonti autorevoli e proteggere i propri dati personali con password sicure. Senza questo spirito critico, lo schermo distrae lo studio anziché arricchirlo.',
						'In definitiva, gli strumenti informatici rimangono ottimi alleati dell’intelligenza umana soltanto quando chi li usa conserva pazienza, curiosità onesta e [[autonomia di giudizio]].'
					],
					glossary: [
						{ term: 'disinformazione', meaning: 'diffusione di notizie false o non verificate' },
						{ term: 'autorevole', meaning: 'serio, riconosciuto e degno di fiducia' }
					],
					mainIdeaHeader: '1. Il testo mette in evidenza soprattutto che :',
					mainIdeaOptions: [
						'L’uso efficace delle risorse digitali richiede verifica delle fonti, sicurezza dei dati e spirito critico',
						'La rapidità di internet rende superfluo controllare l’autore di un articolo',
						'Gli studenti devono rinunciare a tutte le enciclopedie e agli archivi online'
					],
					mainIdeaCorrect:
						'L’uso efficace delle risorse digitali richiede verifica delle fonti, sicurezza dei dati e spirito critico',
					tfItems: [
						{
							q: 'L’accesso rapido alle risorse digitali garantisce automaticamente l’affidabilità di ogni notizia.',
							a: 'Falso',
							c: 'Nasconde il rischio di confondere la quantità di notizie con la loro affidabilità scientifica (§1).',
							mark: '0.5'
						},
						{
							q: 'Controllare l’autore e confrontare più fonti autorevoli fa parte dell’alfabetizzazione digitale.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'Proteggere i dati personali con password sicure è consigliato nel paragrafo 2.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'Secondo la conclusione, la tecnologia sostituisce l’autonomia di giudizio dello studente.',
							a: 'Falso',
							c: 'Gli strumenti informatici sono utili solo se chi li usa conserva autonomia di giudizio (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Quale rischio accompagna la facilità di accesso alle notizie digitali secondo il paragrafo 1?',
							a: 'Il rischio di confondere l’abbondanza di notizie circolanti con la loro affidabilità scientifica.',
							mark: '0.75'
						},
						{
							q: 'b) Elenca le tre abitudini essenziali dell’alfabetizzazione digitale indicate nel paragrafo 2.',
							a: 'Controllare l’autore dell’articolo, confrontare più fonti autorevoli e proteggere i dati personali con password sicure.',
							mark: '1'
						},
						{
							q: 'c) A quali condizioni gli strumenti informatici restano alleati dello studio (§3)?',
							a: 'Quando l’utente conserva pazienza, curiosità onesta e autonomia di giudizio.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «affidabilità scientifica» (§1)   b) «autonomia di giudizio» (§3)',
					refAnswer:
						'a) «affidabilità scientifica» indica la serietà, l’esattezza e la fondatezza documentata di un’informazione.   b) «autonomia di giudizio» rimanda alla capacità personale dello studente di valutare e pensare in modo indipendente senza subire influenze acritiche.',
					synthPrompt:
						'Quali criteri applichi personalmente prima di fidarti di una notizia scientifica letta su Internet? Rispondi in quattro o cinque righe.',
					synthAnswer:
						'Prima di accettare una notizia scientifica online, verifico sempre se proviene da un’università, da una rivista accreditata o da un manuale riconosciuto. Inoltre, confronto almeno due fonti indipendenti, controllo la data di pubblicazione e diffido dei titoli esagerati privi di dati verificabili.',
					quizzes: {
						easy: {
							q: 'Nel testo si afferma che controllare l’autore, confrontare fonti serie e proteggere i dati fanno parte dell’alfabetizzazione digitale.',
							correctAnswer: true,
							explanation: 'صحيح: تذكر الفقرة الثانية هذه العادات الثلاث ركائز للثقافة الرقمية.'
						} as TfSpec,
						medium: {
							q: 'Secondo il paragrafo 1, maggiore è la quantità di notizie circolanti in rete, maggiore è automaticamente la loro veridicità.',
							correctAnswer: false,
							explanation: 'خطأ: يحذر النص من الخلط بين كثرة المعلومات ومصداقيتها العلمية.'
						} as TfSpec,
						hard: {
							q: 'La conclusione sostiene che la tecnologia informatica serve l’intelligenza umana solo se guidata da pazienza e giudizio critico.',
							correctAnswer: true,
							explanation: 'صحيح: التقنية أداة مساعدة تتوقف فائدتها على استقلالية الفكر النقدي للمستعمل.'
						} as TfSpec
					}
				},
				{
					title: 'Da Ibn Al-Haytham ai laboratori moderni : il valore dell’esperimento e dell’etica',
					source: 'Adattato da una conferenza scolastica sulla storia del metodo scientifico',
					paragraphs: [
						'Molto prima dell’invenzione dei moderni laboratori elettronici, lo scienziato Ibn Al-Haytham — noto in latino come Alhazen — ricordava ai ricercatori che nessuna teoria merita fiducia finché non viene messa alla prova dell’osservazione ripetuta e del calcolo matematico. Nel suo trattato di ottica dimostrò come la luce viaggi in linea retta attraverso [[esperimenti controllati]].',
						'Oggi, nei centri di ricerca medica, ambientale e informatica, quel rigore metodologico resta più necessario che mai. Gli scienziati devono pubblicare dati trasparenti, riconoscere con onestà gli eventuali errori e collaborare affinché le scoperte migliorino la vita reale delle persone.',
						'Per questo motivo, insegnare alle nuove generazioni il rispetto della prova sperimentale e l’[[integrità intellettuale]] protegge la società sia dall’ignoranza sia dalla falsa scienza.'
					],
					glossary: [
						{ term: 'ottica', meaning: 'parte della fisica che studia la luce e la visione' },
						{ term: 'integrità', meaning: 'onestà morale e rifiuto di falsificare dati o fonti' }
					],
					mainIdeaHeader: '1. L’argomento centrale del testo illustra :',
					mainIdeaOptions: [
						'La continuità tra il metodo sperimentale di Ibn Al-Haytham e l’etica della ricerca scientifica attuale',
						'L’inutilità degli esperimenti controllati nella fisica moderna',
						'La separazione tra matematica e osservazione nei laboratori'
					],
					mainIdeaCorrect:
						'La continuità tra il metodo sperimentale di Ibn Al-Haytham e l’etica della ricerca scientifica attuale',
					tfItems: [
						{
							q: 'Ibn Al-Haytham invitava a verificare le teorie mediante osservazioni ripetute e calcoli.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'Nel suo trattato di ottica sostenne che la luce non può essere studiata con esperimenti.',
							a: 'Falso',
							c: 'Dimostrò come la luce viaggi in linea retta attraverso esperimenti controllati (§1).',
							mark: '0.5'
						},
						{
							q: 'I ricercatori moderni devono pubblicare dati trasparenti e ammettere eventuali errori.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'Secondo l’autore, l’integrità intellettuale non riguarda l’insegnamento ai giovani.',
							a: 'Falso',
							c: 'Insegnare il rispetto della prova e l’integrità protegge la società dalla falsa scienza (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Su quali due pilastri doveva fondarsi una teoria scientifica secondo Ibn Al-Haytham (§1)?',
							a: 'Sull’osservazione ripetuta (esperimenti controllati) e sul calcolo matematico.',
							mark: '0.75'
						},
						{
							q: 'b) Quali tre doveri etici deve rispettare uno scienziato moderno secondo il paragrafo 2?',
							a: 'Pubblicare dati trasparenti, riconoscere con onestà eventuali errori e collaborare per il bene comune.',
							mark: '1'
						},
						{
							q: 'c) Da quali due pericoli difende la società l’educazione al metodo e all’integrità (§3)?',
							a: 'Dall’ignoranza e dalla falsa scienza.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «esperimenti controllati» (§1)   b) «integrità intellettuale» (§3)',
					refAnswer:
						'a) «esperimenti controllati» indica prove pratiche preparate con rigore e ripetibili per verificare un fenomeno fisico.   b) «integrità intellettuale» significa onestà scientifica, citazione fedele delle fonti e rifiuto di manipolare i risultati.',
					synthPrompt:
						'Perché l’onestà e il riconoscimento degli errori sono fondamentali tanto nello studio scolastico quanto nella ricerca scientifica? Rispondi in quattro o cinque righe.',
					synthAnswer:
						'Riconoscere con sincerità un errore permette di individuarne la causa e di correggere il proprio metodo di lavoro. Al contrario, copiare o nascondere un dubbio impedisce di apprendere davvero; perciò, l’onestà intellettuale è la condizione prima di ogni progresso autentico.',
					quizzes: {
						easy: {
							q: 'Ibn Al-Haytham dimostrò le proprietà della luce attraverso esperimenti controllati e calcoli matematici.',
							correctAnswer: true,
							explanation: 'صحيح: أسّس ابن الهيثم المنهج التجريبي المنضبط في كتابه عن المناظر والضوء.'
						} as TfSpec,
						medium: {
							q: 'Il testo sostiene che gli scienziati moderni debbano nascondere i propri errori per proteggere la propria reputazione.',
							correctAnswer: false,
							explanation: 'خطأ: تؤكد الفقرة الثانية واجب الشفافية والاعتراف الصادق بالأخطاء.'
						} as TfSpec,
						hard: {
							q: 'L’insegnamento della prova sperimentale e dell’onestà intellettuale tutela i giovani sia dall’ignoranza sia dalla falsa scienza.',
							correctAnswer: true,
							explanation: 'صحيح: هذا ما تقرره خاتمة النص بدقة.'
						} as TfSpec
					}
				},
				{
					title: 'Il giornalismo responsabile e la tutela della privacy dei giovani',
					source: 'Adattato da una guida scolastica alla comunicazione responsabile',
					paragraphs: [
						'Un buon articolo giornalistico informa i lettori con chiarezza, distingue nettamente i fatti documentati dalle semplici opinioni e usa un linguaggio rispettoso della dignità delle persone. Quando i ragazzi imparano a leggere i giornali seri, scoprono come si costruisce [[una notizia verificata]].',
						'Allo stesso tempo, nell’uso quotidiano delle piattaforme digitali occorre vigilare sulla tutela dei dati personali. Pubblicare indirizzi, foto familiari o abitudini private senza prudenza espone a rischi evitabili, mentre un comportamento sobrio protegge la serenità della vita familiare.',
						'Promuovere nei licei laboratori di giornalismo scolastico abitua gli studenti a scrivere con precisione, a rispettare [[la riservatezza altrui]] e a comunicare in modo costruttivo.'
					],
					glossary: [
						{ term: 'riservatezza', meaning: 'protezione della vita privata e dei dati personali' },
						{ term: 'sobrio', meaning: 'misurato, prudente ed equilibrato' }
					],
					mainIdeaHeader: '1. Il documento invita i giovani soprattutto a :',
					mainIdeaOptions: [
						'Praticare un’informazione chiara e verificata proteggendo la privacy personale e familiare',
						'Diffondere liberamente dati familiari privati su ogni piattaforma',
						'Confondere le opinioni personali con i fatti documentati'
					],
					mainIdeaCorrect:
						'Praticare un’informazione chiara e verificata proteggendo la privacy personale e familiare',
					tfItems: [
						{
							q: 'Il giornalismo responsabile distingue con chiarezza i fatti documentati dalle opinioni.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'Il testo incoraggia i ragazzi a pubblicare online il proprio indirizzo e le foto familiari.',
							a: 'Falso',
							c: 'Avverte che pubblicare indirizzi e foto familiari espone a rischi evitabili (§2).',
							mark: '0.5'
						},
						{
							q: 'Un uso sobrio degli strumenti digitali protegge la serenità familiare.',
							a: 'Vero',
							mark: '0.5'
						},
						{
							q: 'I laboratori di giornalismo scolastico insegnano soltanto a copiare titoli sensazionali.',
							a: 'Falso',
							c: 'Abituano a scrivere con precisione, a rispettare la riservatezza e a comunicare costruttivamente (§3).',
							mark: '0.5'
						}
					],
					openQuestions: [
						{
							q: 'a) Quali tre caratteristiche definiscono un buon articolo giornalistico secondo il paragrafo 1?',
							a: 'Informa con chiarezza, distingue i fatti documentati dalle opinioni e rispetta la dignità delle persone.',
							mark: '0.75'
						},
						{
							q: 'b) Quali dati non devono essere esposti con imprudenza sulle piattaforme digitali (§2)?',
							a: 'Indirizzi, foto familiari e abitudini private.',
							mark: '1'
						},
						{
							q: 'c) Quali competenze sviluppano i laboratori di giornalismo nei licei (§3)?',
							a: 'Scrivere con precisione, rispettare la riservatezza altrui e comunicare in modo costruttivo.',
							mark: '0.75'
						}
					],
					refPrompt: 'a) «una notizia verificata» (§1)   b) «la riservatezza altrui» (§3)',
					refAnswer:
						'a) «una notizia verificata» indica un’informazione controllata nei fatti e nelle fonti prima di essere pubblicata.   b) «la riservatezza altrui» si riferisce al rispetto della sfera privata e dei dati personali delle altre persone.',
					synthPrompt:
						'In che modo la partecipazione al giornalino del tuo liceo aiuterebbe gli studenti a migliorare in lingua italiana? Rispondi in quattro o cinque righe.',
					synthAnswer:
						'Collaborare al giornalino scolastico stimola a scrivere articoli brevi e ben strutturati su cultura, ecologia e studio. Inoltre, la correzione collettiva con l’insegnante migliora la grammatica, l’ortografia e il senso di responsabilità verso ciò che si pubblica.',
					quizzes: {
						easy: {
							q: 'Un articolo giornalistico serio distingue nettamente i fatti accertati dalle opinioni personali.',
							correctAnswer: true,
							explanation: 'صحيح: هذا أساس الإعلام المسؤول المذكور في الفقرة الأولى.'
						} as TfSpec,
						medium: {
							q: 'Secondo il paragrafo 2, condividere informazioni familiari private online garantisce sempre maggiore sicurezza.',
							correctAnswer: false,
							explanation: 'خطأ: يحذر النص من تعريض الخصوصية والهدوء الأسري لمخاطر غير لازمة.'
						} as TfSpec,
						hard: {
							q: 'I laboratori di giornalismo scolastico allenano insieme la precisione linguistica, il rispetto della privacy e la comunicazione costruttiva.',
							correctAnswer: true,
							explanation: 'صحيح: تلخص الخاتمة هذه الفوائد التربوية الثلاث للصحافة المدرسية.'
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
					'Leggi attentamente il testo scientifico-informativo e rispondi alle domande (7 punti — BAC 3AS LE) :',
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
						content: `4. Spiega che cosa indicano nel testo le espressioni sottolineate :\n${chosen.refPrompt}`,
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
				trimesterId: 't2',
				difficulty,
				domain: 'comprensione_testo',
				examRole: 'comprehension',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تثبّت في التبرير من الموازنة بين المزايا الرقمية وشروط الحذر والتحقق العلمي.',
					'فك الإحالات بالعودة للجملة السابقة مباشرة لضمان الدقة السياقية.',
					'حافظ في الرأي الشخصي على 4–5 أسطر مترابطة بعيداً عن النسخ الحرفي.'
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
	// 3. LINGUISTIC COMPETENCE (7 pti): Congiuntivo nei 4 tempi & lessico T2
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_tpl_3as_le_t2_ling_congiuntivo_tempi',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'coniugazione_modi',
		titleAr: 'الكفاءة اللغوية (7 نقاط — لغات أجنبية): صيغة Congiuntivo بأزمنتها الأربعة والتوافق الزمني والاشتقاق',
		curriculumLessonId: 'ita_lesson_3as_le_t2_congiuntivo_quattro_tempi',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					classPrompt:
						'1. Classifica le seguenti espressioni reggenti secondo richiedano il modo Indicativo o il modo Congiuntivo : So con certezza che - Dubito che - È evidente che - Bisogna che - Benché - Poiché.',
					classCols: [
						{ header: 'Esigono Indicativo', items: ['So con certezza che', 'È evidente che', 'Poiché'], mark: '0.5' },
						{ header: 'Esigono Congiuntivo', items: ['Dubito che', 'Bisogna che', 'Benché'], mark: '0.5' }
					],
					wordRows: [
						{
							verbo: { given: true, value: 'nutrire' },
							sostantivo: { value: 'nutrizione', mark: '0.25' },
							aggettivo: { value: 'nutriente', mark: '0.25' }
						},
						{
							verbo: { value: 'verificare', mark: '0.25' },
							sostantivo: { given: true, value: 'verifica' },
							aggettivo: { value: 'verificabile', mark: '0.25' }
						},
						{
							verbo: { value: 'informare', mark: '0.25' },
							sostantivo: { value: 'informazione', mark: '0.25' },
							aggettivo: { given: true, value: 'informativo' }
						}
					],
					lexPrompt:
						'3. Lessico in contesto :\na) Trova un sinonimo di : genuino (agg.) - disinformazione (sost.).\nb) Forma il contrario con prefisso di : verificabile - sano - affidabile - prudente.',
					lexAnswer:
						'a) genuino = naturale / puro | disinformazione = falsificazione / inganno informativo.\nb) inverificabile, malsano (o insano), inaffidabile, imprudente.',
					grammarPrompt:
						'4. Coniuga i verbi tra parentesi nel tempo adatto del congiuntivo o dell’indicativo :\na) È necessario che ogni consumatore (scegliere) cibi naturali di stagione.\nb) Il professore sperava che gli studenti (consultare) già la fonte prima della lezione.\nc) Benché la ceramica geometrica (richiedere) molta pazienza, attira molti giovani apprendisti.\nd) È sicuro che l’olio d’oliva (proteggere) la salute quotidiana.',
					grammarAnswer:
						'a) scelga (congiuntivo presente).\nb) avessero consultato (congiuntivo trapassato per anteriorità rispetto a «sperava»).\nc) richieda (congiuntivo presente dopo «benché»).\nd) protegge (indicativo presente dopo certezza «è sicuro che»).',
					clozePrompt:
						'5. Completa le frasi con le forme corrette : avesse / abbia / fosse / possano.\nTutti desiderano che i ragazzi (1) .......... capire i rischi dello spreco alimentare. Sembra che ieri l’artigiano (2) .......... terminato il vaso geometrico. Il tecnico temeva che la rete non (3) .......... sicura e sperava che nessuno (4) .......... già condiviso la propria password.',
					clozeAnswer: '1) possano   2) abbia   3) fosse   4) avesse',
					quizzes: {
						easy: {
							q: 'Collega ogni espressione reggente al modo verbale corretto:',
							pairs: [
								{ left: 'È evidente che', right: 'Indicativo' },
								{ left: 'Bisogna che', right: 'Congiuntivo' },
								{ left: 'So per certo che', right: 'Indicativo' },
								{ left: 'Affinché', right: 'Congiuntivo' }
							],
							explanation: 'اليقين المثبت يتبع بـ Indicativo، بينما الضرورة والغاية مع affinché تأخذان Congiuntivo.'
						} as MatchingSpec,
						medium: {
							q: 'Associa ciascun verbo irregolare alla sua forma esatta di congiuntivo presente (3ª singolare):',
							pairs: [
								{ left: 'fare', right: 'faccia' },
								{ left: 'sapere', right: 'sappia' },
								{ left: 'potere', right: 'possa' },
								{ left: 'scegliere', right: 'scelga' }
							],
							explanation: 'تصريف الأفعال الشاذة في Congiuntivo presente أساسي في البكالوريا.'
						} as MatchingSpec,
						hard: {
							q: 'Abbina ciascuna relazione temporale alla forma del congiuntivo corrispondente:',
							pairs: [
								{ left: 'Presente + contemporaneità', right: 'Congiuntivo presente (studi)' },
								{ left: 'Presente + anteriorità', right: 'Congiuntivo passato (abbia studiato)' },
								{ left: 'Passato + contemporaneità', right: 'Congiuntivo imperfetto (studiasse)' },
								{ left: 'Passato + anteriorità', right: 'Congiuntivo trapassato (avesse studiato)' }
							],
							explanation: 'هذه القواعد الأربع تلخص جدول التوافق الزمني (consecutio temporum) كاملاً.'
						} as MatchingSpec
					}
				},
				{
					classPrompt:
						'1. Classifica le proposizioni secondo esprimano Anteriorità o Contemporaneità nella consecutio temporum : Credo che legga ora - Penso che abbia letto ieri - Pensavo che leggesse allora - Credevo che avesse già letto.',
					classCols: [
						{ header: 'Contemporaneità', items: ['Credo che legga ora', 'Pensavo che leggesse allora'], mark: '0.5' },
						{ header: 'Anteriorità', items: ['Penso che abbia letto ieri', 'Credevo che avesse già letto'], mark: '0.5' }
					],
					wordRows: [
						{
							verbo: { given: true, value: 'produrre' },
							sostantivo: { value: 'produzione', mark: '0.25' },
							aggettivo: { value: 'produttivo', mark: '0.25' }
						},
						{
							verbo: { value: 'artigianare', mark: '0.25' },
							sostantivo: { given: true, value: 'artigianato' },
							aggettivo: { value: 'artigianale', mark: '0.25' }
						},
						{
							verbo: { value: 'responsabilizzare', mark: '0.25' },
							sostantivo: { value: 'responsabilità', mark: '0.25' },
							aggettivo: { given: true, value: 'responsabile' }
						}
					],
					lexPrompt:
						'3. Lessico in contesto :\na) Indica un sinonimo di : sobrio (agg.) - apprendere (verbo).\nb) Forma il contrario con prefisso di : controllato - esperto - capace - ordinato.',
					lexAnswer:
						'a) sobrio = moderato / equilibrato | apprendere = imparare.\nb) incontrollato, inesperto, incapace, disordinato.',
					grammarPrompt:
						'4. Coniuga correttamente o trasforma al passato :\na) Sebbene l’articolo (sembrare) convincente, occorre verificarne la fonte.\nb) I genitori volevano che i figli (mangiare) verdure e frutta ogni giorno.\nc) Passa al passato sostituendo «Penso» con «Pensavo» : «Penso che i giovani artigiani abbiano preparato una bella mostra.»',
					grammarAnswer:
						'a) sembri (congiuntivo presente).\nb) mangiassero (congiuntivo imperfetto).\nc) Pensavo che i giovani artigiani avessero preparato una bella mostra.',
					clozePrompt:
						'5. Completa le frasi con : sia / avessero / faccia / dovessero.\nBisogna che ciascuno (1) .......... attenzione alla sicurezza dei dati. Spero che la dieta mediterranea (2) .......... apprezzata dai giovani. La docente dubitava che gli alunni (3) .......... già letto il manuale e temeva che (4) .......... riscrivere l’introduzione.',
					clozeAnswer: '1) faccia   2) sia   3) avessero   4) dovessero',
					quizzes: {
						easy: {
							q: 'Collega ogni congiunzione al suo significato logico (tutte esigono il congiuntivo):',
							pairs: [
								{ left: 'benché', right: 'concessione (nonostante)' },
								{ left: 'affinché', right: 'fine o scopo' },
								{ left: 'purché', right: 'condizione (a patto che)' },
								{ left: 'prima che', right: 'anteriorità temporale' }
							],
							explanation: 'هذه الروابط الأربع في الإيطالية تلزم Congiuntivo دائماً عند اختلاف الفاعلين.'
						} as MatchingSpec,
						medium: {
							q: 'Associa ciascun infinito alla sua forma irregolare di congiuntivo imperfetto (3ª singolare):',
							pairs: [
								{ left: 'essere', right: 'fosse' },
								{ left: 'fare', right: 'facesse' },
								{ left: 'dire', right: 'dicesse' },
								{ left: 'stare', right: 'stesse' }
							],
							explanation: 'تذكّر شواذ Congiuntivo imperfetto: fossi/fosse، facessi/facesse، dicessi/dicesse، stessi/stesse.'
						} as MatchingSpec,
						hard: {
							q: 'Abbina ciascuna frase reggente alla forma verbale corretta della subordinata:',
							pairs: [
								{ left: 'Spero che oggi tu...', right: 'venga in biblioteca' },
								{ left: 'Speravo che allora tu...', right: 'venissi in biblioteca' },
								{ left: 'Spero che ieri tu...', right: 'sia venuto in biblioteca' },
								{ left: 'Speravo che prima tu...', right: 'fossi venuto in biblioteca' }
							],
							explanation: 'تطبيق دقيق للأزمنة الأربعة لفعل الحركة «venire» مع المساعد essere.'
						} as MatchingSpec
					}
				},
				{
					classPrompt:
						'1. Distingui le frasi corrette con «di + infinito» (stesso soggetto) da quelle con «che + congiuntivo» (soggetti diversi) : Penso di capire il testo - Penso che tu capisca - Prima di uscire, controlla i dati - Prima che esca Nadia, salutala - Spero di finire presto - Spero che voi finiate presto.',
					classCols: [
						{ header: 'Stesso soggetto (infinito)', items: ['Penso di capire il testo', 'Prima di uscire, controlla i dati', 'Spero di finire presto'], mark: '0.5' },
						{ header: 'Soggetti diversi (congiuntivo)', items: ['Penso che tu capisca', 'Prima che esca Nadia, salutala', 'Spero che voi finiate presto'], mark: '0.5' }
					],
					wordRows: [
						{
							verbo: { given: true, value: 'sperimentare' },
							sostantivo: { value: 'esperimento', mark: '0.25' },
							aggettivo: { value: 'sperimentale', mark: '0.25' }
						},
						{
							verbo: { value: 'equilibrare', mark: '0.25' },
							sostantivo: { given: true, value: 'equilibrio' },
							aggettivo: { value: 'equilibrato', mark: '0.25' }
						},
						{
							verbo: { value: 'riservare', mark: '0.25' },
							sostantivo: { value: 'riservatezza', mark: '0.25' },
							aggettivo: { given: true, value: 'riservato' }
						}
					],
					lexPrompt:
						'3. Lessico in contesto :\na) Dai un sinonimo di : integrità (sost.) - evitare (verbo).\nb) Forma il contrario con prefisso di : controllato - esperto - fedele - naturale.',
					lexAnswer:
						'a) integrità = onestà / rettitudine | evitare = prevenire / schivare.\nb) incontrollato, inesperto, infedele, innaturale.',
					grammarPrompt:
						'4. Completa o trasforma usando congiuntivo o infinito :\na) La direttrice desidera che tutti gli allievi (rispettare) la riservatezza digitale.\nb) Prima che il mercato (chiudere), gli agricoltori avevano già venduto tutti i datteri.\nc) Unisci evitando la ripetizione di soggetto : «Io verifico sempre le fonti. Spero di non sbagliare.»',
					grammarAnswer:
						'a) rispettino (congiuntivo presente).\nb) chiudesse (congiuntivo imperfetto concordato con avevano venduto).\nc) Verifico sempre le fonti per non sbagliare / Spero di non sbagliare quando verifico le fonti.',
					clozePrompt:
						'5. Completa le frasi con : abbiano / potesse / sappia / lavorassero.\nNon credo che molti (1) .......... verificato quella notizia prima di condividerla. È importante che ogni giovane (2) .......... distinguere i fatti dalle opinioni. L’artigiano voleva che i suoi apprendisti (3) .......... con calma affinché la ceramica (4) .......... durare decenni.',
					clozeAnswer: '1) abbiano   2) sappia   3) lavorassero   4) potesse',
					quizzes: {
						easy: {
							q: 'Collega il verbo principale alla costruzione corretta (stesso soggetto vs soggetti diversi):',
							pairs: [
								{ left: 'Spero (io)... (io)', right: 'di riuscire all’esame' },
								{ left: 'Spero (io)... (voi)', right: 'che riusciate all’esame' },
								{ left: 'Prima (io)... (io)', right: 'di partire saluto tutti' },
								{ left: 'Prima (loro)... (noi)', right: 'che partano salutiamoli' }
							],
							explanation: 'عند تطابق الفاعل في الإيطالية نستعمل المصدر المسبوق بـ di/prima di بدل Congiuntivo.'
						} as MatchingSpec,
						medium: {
							q: 'Associa ciascuna coppia di congiuntivo presente (io / noi) al suo infinito:',
							pairs: [
								{ left: 'andare', right: 'vada / andiamo' },
								{ left: 'dare', right: 'dia / diamo' },
								{ left: 'dovere', right: 'debba / dobbiamo' },
								{ left: 'volere', right: 'voglia / vogliamo' }
							],
							explanation: 'تنتبه الإيطالية في ضمير noi إلى العودة للجذر القياسي (-iamo) حتى في الأفعال الشاذة.'
						} as MatchingSpec,
						hard: {
							q: 'Abbina ogni forma del congiuntivo passato/trapassato all’ausiliare corretto (essere vs avere):',
							pairs: [
								{ left: 'arrivare (presente)', right: 'che sia arrivato' },
								{ left: 'finire (passato)', right: 'che avesse finito' },
								{ left: 'uscire (passato)', right: 'che fosse uscita' },
								{ left: 'leggere (presente)', right: 'che abbia letto' }
							],
							explanation: 'أفعال الحركة والحالة (arrivare, uscire) تأخذ essere، والأفعال المتعدية (finire, leggere) تأخذ avere في المركب.'
						} as MatchingSpec
					}
				}
			];

			const chosen = rng.pick(pool);
			const { quizQuestion, finalAnswer } = buildMatchingPayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'II. Competenza linguistica — A) Congiuntivo e morfologia',
				points: 7,
				instruction:
					'Esegui con precisione gli esercizi sul congiuntivo, la derivazione e il lessico (7 punti — BAC 3AS LE) :',
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
				trimesterId: 't2',
				difficulty,
				domain: 'coniugazione_modi',
				examRole: 'linguistic_competence',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تحقق أولاً من الفعل أو الرابط في الجملة الرئيسية: يقين مثبت (Indicativo) أم رأي/شك/رغبة/benché/affinché (Congiuntivo).',
					'طبق التوافق الزمني: الحاضر يتبع بـ presente/passato، والماضي يتبع بـ imperfetto/trapassato.',
					'عند تطابق الفاعل بعد pensare / sperare / prima / senza نستخدم المصدر بدل Congiuntivo.'
				],
				solutionStepsAr: [
					'التصنيف النحوي في جدول العمودين (1 نقطة).',
					'إكمال جدول عائلة الكلمات الثلاثي (1.5 نقطة).',
					'المرادفات والأضداد بالسوابق المناسبة (1.5 نقطة).',
					'تصريف Congiuntivo في الأزمنة الأربعة وإكمال الفقرة (3 نقاط).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. LINGUISTIC COMPETENCE (7 pti): Discorso diretto & indiretto (with SVG)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_tpl_3as_le_t2_ling_discorso_indiretto',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'grammatica_sintassi',
		titleAr: 'الكفاءة اللغوية (7 نقاط — لغات أجنبية): الكلام المباشر وغير المباشر وتحويل الأزمنة والظروف',
		curriculumLessonId: 'ita_lesson_3as_le_t2_discorso_diretto_indiretto',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					svgTitle: 'Discorso Indiretto al Passato',
					svgTense: 'Slittamento dei tempi e deittici',
					svgFormula: 'Pres.->Impf. | Pass.->Trap. | Fut.->Cond.Pass.',
					svgExample: 'Disse: «Partirò domani» : Disse che sarebbe partito il giorno dopo.',
					svgMarkers: 'oggi/quel giorno, domani/il giorno dopo, ieri/il giorno prima',
					classPrompt:
						'1. Classifica le espressioni e le forme verbali seguenti secondo appartengano al Discorso diretto o al Discorso indiretto al passato : oggi - quel giorno - «Verificherò la fonte» - disse che avrebbe verificato - qui - lì.',
					classCols: [
						{ header: 'Discorso diretto', items: ['oggi', '«Verificherò la fonte»', 'qui'], mark: '0.75' },
						{ header: 'Discorso indiretto (passato)', items: ['quel giorno', 'disse che avrebbe verificato', 'lì'], mark: '0.75' }
					],
					directToIndirectPrompt:
						'2. Trasforma dal discorso diretto al discorso indiretto con verbo reggente al passato :\na) Il nutrizionista spiegò ai ragazzi : «Oggi prepariamo una merenda sana con datteri e olio d’oliva.»\nb) La ricercatrice promise : «Domani pubblicherò i risultati di questo esperimento.»\nc) L’insegnante disse agli studenti : «Controllate sempre l’autore prima di citare un articolo!»',
					directToIndirectAnswer:
						'a) Il nutrizionista spiegò ai ragazzi che quel giorno preparavano una merenda sana con datteri e olio d’oliva.\nb) La ricercatrice promise che il giorno dopo avrebbe pubblicato i risultati di quell’esperimento.\nc) L’insegnante disse agli studenti di controllare sempre l’autore prima di citare un articolo (o che controllassero sempre l’autore...).',
					interrogativePrompt:
						'3. Trasforma le interrogative al discorso indiretto o svolgi il passaggio inverso :\na) La giornalista chiese al contadino : «Avete già raccolto tutte le olive quest’anno?»\nb) Volgi al discorso diretto : «Il direttore domandò all’artigiano quando avrebbe consegnato i vasi in ceramica.»',
					interrogativeAnswer:
						'a) La giornalista chiese al contadino se avessero (o avevano) già raccolto tutte le olive quell’anno.\nb) Il direttore domandò all’artigiano : «Quando consegnerai (o consegnerà) i vasi in ceramica?»',
					clozePrompt:
						'4. Completa il testo trasformato al passato con : quel giorno / avrebbe presentato / aveva letto / di non condividere.\nNadia affermò che il giorno prima (1) .......... un trattato di Ibn Al-Haytham. Aggiunse che (2) .......... studiava le fonti storiche in biblioteca e che la settimana seguente (3) .......... la sua relazione. Infine, consigliò ai compagni (4) .......... notizie non verificate.',
					clozeAnswer: '1) aveva letto   2) quel giorno   3) avrebbe presentato   4) di non condividere',
					quizzes: {
						easy: {
							q: 'Scegli la forma verbale esatta nel passaggio al discorso indiretto al passato (Presente -> Imperfetto):',
							sentence: 'Marco disse : «Studio sempre con ordine.» : Marco disse che ___ sempre con ordine.',
							correct: 'studiava',
							distractors: ['studia', 'studierà', 'abbia studiato'],
							explanation: 'بعد فعل قول في الماضي «disse» يتحول Presente (studio) إلى Imperfetto (studiava).'
						} as ClozeSpec,
						medium: {
							q: 'Completa correttamente il futuro nel passato dopo un verbo reggente al passato:',
							sentence: 'La professoressa assicurò : «Domani correggerò i compiti.» : Assicurò che il giorno dopo ___ i compiti.',
							correct: 'avrebbe corretto',
							distractors: ['correggerebbe', 'correggerà', 'correggeva'],
							explanation: 'في الإيطالية القياسية يتحول Futuro semplice بعد فعل قول في الماضي إلى Condizionale passato: «avrebbe corretto».'
						} as ClozeSpec,
						hard: {
							q: 'Scegli la trasformazione esatta di una frase al passato prossimo nel discorso indiretto:',
							sentence: 'L’artigiano spiegò : «Ieri ho finito il tessuto.» : L’artigiano spiegò che il giorno prima ___ il tessuto.',
							correct: 'aveva finito',
							distractors: ['ha finito', 'finirà', 'finirebbe'],
							explanation: 'يتحول Passato prossimo بعد فعل قول في الماضي إلى Trapassato prossimo: «aveva finito».'
						} as ClozeSpec
					}
				},
				{
					svgTitle: 'Interrogative e Imperativo Indiretti',
					svgTense: 'Costruzioni con se, pronomi e di + infinito',
					svgFormula: 'Domanda totale->se | Imperativo->di + infinito',
					svgExample: 'Chiese: «Vieni?» / Disse: «Leggi!» : Chiese se venisse / Disse di leggere.',
					svgMarkers: 'ora/allora, ieri/il giorno prima, fra due giorni/due giorni dopo',
					classPrompt:
						'1. Classifica gli indicatori temporali e spaziali secondo appartengano al Discorso diretto o al Discorso indiretto al passato : adesso - allora - l’anno scorso - l’anno precedente - fra tre giorni - tre giorni dopo.',
					classCols: [
						{ header: 'Discorso diretto', items: ['adesso', 'l’anno scorso', 'fra tre giorni'], mark: '0.75' },
						{ header: 'Discorso indiretto (passato)', items: ['allora', 'l’anno precedente', 'tre giorni dopo'], mark: '0.75' }
					],
					directToIndirectPrompt:
						'2. Passa dal discorso diretto al discorso indiretto al passato :\na) Il maestro artigiano dichiarò : «L’anno scorso ho insegnato questo mestiere a cinque giovani.»\nb) Il medico consigliò alla classe : «Bevete acqua pura ed evitate gli spuntini industriali!»\nc) Gli studenti dissero : «Adesso prepariamo le schede per il giornalino scolastico.»',
					directToIndirectAnswer:
						'a) Il maestro artigiano dichiarò che l’anno precedente aveva insegnato quel mestiere a cinque giovani.\nb) Il medico consigliò alla classe di bere acqua pura ed evitare gli spuntini industriali.\nc) Gli studenti dissero che allora preparavano le schede per il giornalino scolastico.',
					interrogativePrompt:
						'3. Riscrivi passando dall’uno all’altro stile :\na) Al discorso indiretto : Il bibliotecario domandò a Karim : «Quale dizionario cerchi qui oggi?»\nb) Al discorso diretto : «La madre ricordò ai figli di ringraziare sempre gli agricoltori per il cibo sano.»',
					interrogativeAnswer:
						'a) Il bibliotecario domandò a Karim quale dizionario cercasse (o cercava) lì quel giorno.\nb) La madre disse ai figli : «Ricordatevi di ringraziare sempre gli agricoltori per il cibo sano!»',
					clozePrompt:
						'4. Completa il resoconto indiretto con : se / il giorno dopo / aveva scoperto / di non pubblicare.\nIl giornalista chiese allo studioso (1) .......... il laboratorio fosse aperto. Lo studioso rispose che (2) .......... un nuovo metodo ecologico e che (3) .......... avrebbe presentato i dati. Poi pregò i presenti (4) .......... notizie incomplete.',
					clozeAnswer: '1) se   2) aveva scoperto   3) il giorno dopo   4) di non pubblicare',
					quizzes: {
						easy: {
							q: 'Scegli la parola corretta per introdurre un’interrogativa indiretta totale (sì/no):',
							sentence: 'L’insegnante chiese agli studenti ___ avevano verificato la fonte.',
							correct: 'se',
							distractors: ['che', 'quale', 'perché'],
							explanation: 'الاستفهام الكلي غير المباشر يُربط دائماً بأداة «se» دون «che».'
						} as ClozeSpec,
						medium: {
							q: 'Completa la trasformazione corretta dell’imperativo negativo al discorso indiretto:',
							sentence: 'Il tecnico avvertì i ragazzi : «Non condividete i dati privati!» : Li avvertì ___.',
							correct: 'di non condividere i dati privati',
							distractors: ['che non condividete i dati privati', 'se non condividere i dati privati', 'di non condividessero i dati privati'],
							explanation: 'يتحول النهي المنقول إلى «di non + infinito»: «di non condividere».'
						} as ClozeSpec,
						hard: {
							q: 'Completa correttamente la trasformazione del deittico futuro e del verbo:',
							sentence: 'Spiegò : «Fra due giorni consegnerò i tessuti.» : Spiegò che ___ i tessuti.',
							correct: 'due giorni dopo avrebbe consegnato',
							distractors: ['fra due giorni consegnerà', 'due giorni prima aveva consegnato', 'due giorni dopo consegnerebbe'],
							explanation: 'تتحول «fra due giorni» إلى «due giorni dopo»، والمستقبل «consegnerò» إلى Condizionale passato «avrebbe consegnato».'
						} as ClozeSpec
					}
				},
				{
					svgTitle: 'Pronomi, Possessivi e Tempi Invariati',
					svgTense: 'Trasformazione completa di persona e tempo',
					svgFormula: 'mio/nostro -> suo/loro | Imperf./Trapass. invariati',
					svgExample: 'Disse: «Leggevo il mio libro» : Disse che leggeva il suo libro.',
					svgMarkers: 'questo/quello, qui/lì, venire/andare',
					classPrompt:
						'1. Distingui i tempi che subiscono slittamento nel discorso indiretto al passato da quelli che restano invariati : Presente indicativo - Imperfetto indicativo - Futuro semplice - Trapassato prossimo - Passato prossimo - Condizionale passato.',
					classCols: [
						{ header: 'Subiscono slittamento', items: ['Presente indicativo', 'Futuro semplice', 'Passato prossimo'], mark: '0.75' },
						{ header: 'Restano invariati', items: ['Imperfetto indicativo', 'Trapassato prossimo', 'Condizionale passato'], mark: '0.75' }
					],
					directToIndirectPrompt:
						'2. Trasforma al discorso indiretto cambiando tempi, possessivi e indicatori :\na) Sami affermò : «Ieri ho visitato il laboratorio dove mio fratello lavorava già da due anni.»\nb) I contadini ci dissero : «Quest’anno raccoglieremo molti agrumi nei nostri frutteti.»\nc) Il preside raccomandò : «Portate sempre con voi il vocabolario nella sala studio!»',
					directToIndirectAnswer:
						'a) Sami affermò che il giorno prima aveva visitato il laboratorio dove suo fratello lavorava già da due anni.\nb) I contadini ci dissero che quell’anno avrebbero raccolto molti agrumi nei loro frutteti.\nc) Il preside raccomandò di portare sempre con noi (o con loro) il vocabolario nella sala studio.',
					interrogativePrompt:
						'3. Svolgi le seguenti trasformazioni :\na) Al discorso indiretto : Amina chiese alla compagna : «Dove hai comprato questa ceramica artigianale?»\nb) Al discorso diretto : «Lo studioso disse che allora confrontava due mappe che aveva già copiato l’anno precedente.»',
					interrogativeAnswer:
						'a) Amina chiese alla compagna dove avesse (o aveva) comprato quella ceramica artigianale.\nb) Lo studioso disse : «Adesso confronto due mappe che ho già copiato (o avevo già copiato) l’anno scorso.»',
					clozePrompt:
						'4. Completa il brano trasformato al passato con : avrebbe aperto / aveva preparato / quel giorno / di rispettare.\nLa direttrice annunciò che (1) .......... inaugurava il corso di ceramica e che (2) .......... tutto il materiale naturale. Promise inoltre che il mese seguente (3) .......... un laboratorio di cucina sana e chiese ai partecipanti (4) .......... le regole d’igiene.',
					clozeAnswer: '1) quel giorno   2) aveva preparato   3) avrebbe aperto   4) di rispettare',
					quizzes: {
						easy: {
							q: 'Scegli il possessivo e il dimostrativo giusti nel passaggio al discorso indiretto:',
							sentence: 'Sofia disse : «Amo questo mio lavoro.» : Sofia disse che amava ___ lavoro.',
							correct: 'quel suo',
							distractors: ['questo mio', 'quello mio', 'questo suo'],
							explanation: 'تتبدل الإشارة القريبة «questo» إلى البعيدة «quel» والملكية «mio» إلى الغائبة «suo».'
						} as ClozeSpec,
						medium: {
							q: 'Quale forma mantiene invariato l’imperfetto indicativo nel discorso indiretto al passato?',
							sentence: 'Raccontò : «Da bambino leggevo ogni sera.» : Raccontò che da bambino ___ ogni sera.',
							correct: 'leggeva',
							distractors: ['avrà letto', 'leggerebbe', 'legga'],
							explanation: 'الزمن Imperfetto يبقى كما هو دون تراجع إضافي عند النقل، مع تغيير الضمير (leggevo -> leggeva).'
						} as ClozeSpec,
						hard: {
							q: 'Completa correttamente la trasformazione del futuro dopo verbo reggente al passato:',
							sentence: 'Il gruppo annunciò : «Pubblicheremo la guida la settimana prossima.» : Annunciò che ___ la guida la settimana seguente.',
							correct: 'avrebbe pubblicato',
							distractors: ['pubblicherebbe', 'pubblicherà', 'aveva pubblicato'],
							explanation: 'يتحول Futuro semplice إلى Condizionale passato مطابَقاً للفاعل المفرد «il gruppo»: «avrebbe pubblicato».'
						} as ClozeSpec
					}
				}
			];

			const vIdx = rng.int(0, pool.length - 1);
			const chosen = pool[vIdx];
			const svgStr = svgItalianTenseTimeline({
				title: chosen.svgTitle,
				tenseName: chosen.svgTense,
				formula: chosen.svgFormula,
				activeZone: 'two_past',
				example: chosen.svgExample,
				markers: chosen.svgMarkers
			});
			const svgPath = saveItalianSvgAsset(`3as_le_t2_indiretto_v${vIdx + 1}`, svgStr);

			const { quizQuestion, finalAnswer } = buildClozePayload(chosen.quizzes[difficulty], rng);

			const sujetExercise: ExerciseBlock = {
				customTitle: 'II. Competenza linguistica — B) Discorso diretto e indiretto',
				points: 7,
				instruction:
					'Osserva la linea temporale ed esegui le trasformazioni del discorso indiretto al passato (7 punti — BAC 3AS LE) :',
				content: [
					{
						type: 'image',
						src: svgPath,
						width: 'full',
						caption:
							'Schema temporale : Slittamento di tempi, pronomi e indicatori nel discorso indiretto al passato.'
					},
					{
						type: 'text',
						content: chosen.classPrompt
					},
					buildItalianClassificationTableBlock({ columns: chosen.classCols }),
					{
						type: 'text',
						content: chosen.directToIndirectPrompt,
						answer: chosen.directToIndirectAnswer,
						mark: '2.5'
					},
					{
						type: 'text',
						content: chosen.interrogativePrompt,
						answer: chosen.interrogativeAnswer,
						mark: '1.5'
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
				domain: 'grammatica_sintassi',
				examRole: 'linguistic_competence',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكّر التحويلات الأربع الأساسية في الإيطالية بعد فعل قول في الماضي: Presente -> Imperfetto، الماضي -> Trapassato prossimo، Futuro -> Condizionale passato، والأمر -> di + infinito.',
					'احذف علامتي التنصيص (« ») والاستفهام (؟)، وحوّل الضمائر وظروف الزمان والمكان.',
					'في الاستفهام الكلي (نعم/لا) استعمل «se»، وفي الجزئي احتفظ بأداة الاستفهام.'
				],
				solutionStepsAr: [
					'تصنيف الأزمنة والمؤشرات بين المباشر وغير المباشر (1.5 نقطة).',
					'تحويل الجمل الخبرية والأمرية إلى غير المباشر في الماضي (2.5 نقطة).',
					'تحويل الجمل الاستفهامية أو التحويل العكسي (1.5 نقطة).',
					'إكمال الفقرة المنقولة بالصيغ الصحيحة (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. WRITTEN EXPRESSION (6 pti — Integration): Alimentazione & artigianato
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_tpl_3as_le_t2_writ_alimentazione_artigianato',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'produzione_scritta',
		titleAr: 'الإنتاج الكتابي (6 نقاط — لغات أجنبية): التغذية الصحية الحلال والحرف اليدوية الراقية',
		curriculumLessonId: 'ita_lesson_3as_le_t2_alimentazione_artigianato_qualita',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					tracciaUnoPrompt:
						'Scrivi un articolo informativo-argomentativo (120–145 parole) per sensibilizzare i tuoi compagni sull’importanza della dieta mediterranea naturale e della lotta allo spreco alimentare.',
					tracciaUnoPunti: [
						'Confrontare i rischi degli spuntini industriali veloci con i benefici di olio d’oliva, verdure, legumi e datteri.',
						'Spiegare come una buona alimentazione aiuti la concentrazione durante la preparazione del BAC.',
						'Proporre abitudini concrete contro lo spreco di cibo a casa e a scuola.'
					],
					tracciaDuePrompt:
						'«Mangiare con sobrietà e scegliere prodotti freschi di stagione è un investimento diretto nella salute e nell’ambiente.» Esponi il tuo parere in 120–145 parole.',
					modelAnswer:
						'Oggigiorno, molti studenti consumano in fretta cibi industriali ricchi di zuccheri senza pensare alle conseguenze sulla propria salute. Eppure, la tradizione mediterranea offre un’alternativa semplice e preziosa per il benessere quotidiano.\nInnanzitutto, basare i pasti su olio extravergine d’oliva, verdure fresche, cereali integrali, legumi e datteri garantisce energia costante senza appesantire la mente. Gli esperti ricordano che bere acqua pura e rispettare orari regolari aiuta a mantenere viva la concentrazione durante le lunghe ore di ripasso per il BAC.\nInoltre, imparare la sobrietà a tavola significa combattere ogni giorno lo spreco alimentare. Pianificare gli acquisti con misura ed evitare porzioni eccessive esprime gratitudine verso i doni della terra e rispetto per il lavoro degli agricoltori.\nIn conclusione, scegliere prodotti naturali di stagione migliora la salute giovanile e tutela insieme le risorse del territorio.',
					rubricSummary:
						'Pertinenza e sviluppo dei punti (1.5) + Struttura in 4 paragrafi e connettivi (1.5) + Correttezza grammaticale e congiuntivo (1.5) + Lessico alimentare e ortografia (1.5).',
					quizzes: {
						easy: {
							q: 'Classifica questi alimenti in Dieta mediterranea sana o Cibi industriali da limitare:',
							categories: ['Dieta mediterranea sana', 'Cibi da limitare'],
							items: [
								{ text: 'Olio d’oliva e verdure', category: 0 },
								{ text: 'Cereali integrali e datteri', category: 0 },
								{ text: 'Bibite gassate zuccherate', category: 1 },
								{ text: 'Spuntini fritti confezionati', category: 1 }
							],
							explanation: 'ترتكز التغذية الصحية على المكونات الطبيعية وتقلل الأطعمة المصنعة والمحلاة.'
						} as DragDropSpec,
						medium: {
							q: 'Classifica questi argomenti in Benefici per la salute o Lotta allo spreco alimentare:',
							categories: ['Benefici per la salute', 'Lotta allo spreco'],
							items: [
								{ text: 'Favorisce la concentrazione', category: 0 },
								{ text: 'Fornisce vitamine naturali', category: 0 },
								{ text: 'Pianificare la spesa settimanale', category: 1 },
								{ text: 'Cucinare porzioni equilibrate', category: 1 }
							],
							explanation: 'يجمع المقال الجيد بين الفوائد الصحية والانضباط ضد التبذير الغذائي.'
						} as DragDropSpec,
						hard: {
							q: 'Classifica questi connettivi secondo introducano un Confronto o una Conclusione:',
							categories: ['Confronto o contrasto', 'Conclusione o sintesi'],
							items: [
								{ text: 'Eppure', category: 0 },
								{ text: 'Al contrario', category: 0 },
								{ text: 'In conclusione', category: 1 },
								{ text: 'Pertanto', category: 1 }
							],
							explanation: 'تفيد «Eppure / Al contrario» المقابلة، و«In conclusione / Pertanto» الخلاصة والاستنتاج.'
						} as DragDropSpec
					}
				},
				{
					tracciaUnoPrompt:
						'Redigi un testo argomentativo (120–145 parole) per valorizzare i mestieri dell’artigianato di qualità, come la ceramica geometrica e la tessitura tradizionale, come risorsa culturale ed economica per i giovani.',
					tracciaUnoPunti: [
						'Mettere a confronto la durata dei manufatti artigianali con gli oggetti usa e getta.',
						'Sottolineare il valore della pazienza, della precisione geometrica e delle materie locali.',
						'Spiegare l’importanza delle botteghe di apprendistato e delle cooperative giovanili.'
					],
					tracciaDuePrompt:
						'«Un manufatto lavorato a mano racconta la pazienza e l’identità di una comunità molto meglio di mille oggetti prodotti in serie.» Commenta in 120–145 parole.',
					modelAnswer:
						'In un mercato invaso da oggetti in plastica di breve durata, l’artigianato tradizionale conserva un valore culturale ed economico insostituibile. Perché conviene oggi incoraggiare i giovani a scoprire questi antichi mestieri?\nIn primo luogo, un vaso in ceramica geometrica o un tappeto intrecciato con lana naturale nascono da materie prime locali e durano per decenni. Ogni creazione esige pazienza, precisione manuale e rispetto per l’armonia delle forme senza inutili sprechi.\nBenché alcuni credano che il lavoro manuale appartenga soltanto al passato, creare botteghe di apprendistato e cooperative giovanili permette invece di trasformare il talento in un impiego onesto e rispettoso dell’ambiente.\nIn definitiva, sostenere gli artigiani locali significa difendere la qualità autentica, trasmettere competenze preziose e costruire un’economia più giusta per tutto il territorio.',
					rubricSummary:
						'Pertinenza tematica (1.5) + Coerenza e connettivi (1.5) + Uso corretto di congiuntivo e tempi verbali (1.5) + Lessico artigianale e ortografia (1.5).',
					quizzes: {
						easy: {
							q: 'Classifica le caratteristiche seguenti in Artigianato di qualità o Produzione usa e getta:',
							categories: ['Artigianato di qualità', 'Produzione usa e getta'],
							items: [
								{ text: 'Materie prime naturali locali', category: 0 },
								{ text: 'Motivi geometrici duraturi', category: 0 },
								{ text: 'Plastica fragile in serie', category: 1 },
								{ text: 'Oggetti subito scartati', category: 1 }
							],
							explanation: 'تمتاز الحرف التقليدية بالمواد الطبيعية والمتانة والزخرفة الهندسية الراقية.'
						} as DragDropSpec,
						medium: {
							q: 'Classifica queste proposte secondo riguardino la Formazione giovanile o il Sostegno economico:',
							categories: ['Formazione giovanile', 'Sostegno economico'],
							items: [
								{ text: 'Borse di apprendistato pratico', category: 0 },
								{ text: 'Insegnamento presso i maestri', category: 0 },
								{ text: 'Cooperative artigianali locali', category: 1 },
								{ text: 'Vendita diretta ai mercati', category: 1 }
							],
							explanation: 'ينجح دعم الحرف بالجمع بين التكوين التطبيقي والتعاونيات الاقتصادية.'
						} as DragDropSpec,
						hard: {
							q: 'Classifica questi verbi al congiuntivo o all’indicativo secondo seguano «Benché» o «Sappiamo che»:',
							categories: ['Dopo Benché (Congiuntivo)', 'Dopo Sappiamo che (Indicativo)'],
							items: [
								{ text: 'richieda molta pazienza', category: 0 },
								{ text: 'sia un mestiere antico', category: 0 },
								{ text: 'dura per decenni', category: 1 },
								{ text: 'aiuta l’economia locale', category: 1 }
							],
							explanation: 'تأخذ «Benché» صيغة Congiuntivo، بينما يأخذ اليقين «Sappiamo che» صيغة Indicativo.'
						} as DragDropSpec
					}
				},
				{
					tracciaUnoPrompt:
						'Scrivi una lettera formale al responsabile della mensa o del comune della tua città chiedendo di promuovere giornate dedicate ai prodotti agricoli locali (olio d’oliva, agrumi, datteri) e alle buone abitudini alimentari (120–145 parole).',
					tracciaUnoPunti: [
						'Rispettare luogo, data, apertura formale e pronome «Lei».',
						'Spiegare i benefici della filiera corta per i produttori locali e per la salute degli studenti.',
						'Proporre laboratori informativi semplici contro lo spreco alimentare.'
					],
					tracciaDuePrompt:
						'«Sostenere gli agricoltori locali attraverso scelte alimentari sane rafforza insieme la salute pubblica e l’economia nazionale.» Esponi i tuoi argomenti in 120–145 parole.',
					modelAnswer:
						'Tlemcen, 14 febbraio 2026.\nGentile Signor Direttore,\nLe scriviamo a nome degli studenti di 3AS LE per sottoporLe la proposta di organizzare presso il nostro liceo una settimana dedicata all’alimentazione sana e ai prodotti agricoli locali.\nSiamo convinti che far conoscere meglio il valore dell’olio extravergine d’oliva, degli agrumi, dei legumi e dei datteri della nostra terra aiuti i ragazzi ad abbandonare gli spuntini industriali. Inoltre, sostenere la filiera corta consente agli agricoltori della regione di vedere riconosciuto il proprio impegno onesto.\nDurante l’iniziativa potremmo invitare un nutrizionista e alcuni produttori locali per brevi incontri educativi sul risparmio idrico e sulla lotta allo spreco alimentare nelle famiglie.\nCerti che vorrà accogliere con favore questo progetto educativo, Le porgiamo i nostri più cordiali saluti.\nGli studenti di 3AS LE.',
					rubricSummary:
						'Formato della lettera formale con «Lei» (1.5) + Pertinenza delle proposte (1.5) + Correttezza grammaticale (1.5) + Registro cortese e ortografia (1.5).',
					quizzes: {
						easy: {
							q: 'Classifica questi elementi secondo appartengano al Registro formale (Lei) o al Registro familiare:',
							categories: ['Lettera formale (Lei)', 'Messaggio familiare (tu)'],
							items: [
								{ text: 'Gentile Signor Direttore', category: 0 },
								{ text: 'Le sottoponiamo la proposta', category: 0 },
								{ text: 'Ciao amico mio', category: 1 },
								{ text: 'Ti mando un messaggio veloce', category: 1 }
							],
							explanation: 'تتطلب الرسالة الموجهة للإدارة أو البلدية صيغة الاحترام «Lei».'
						} as DragDropSpec,
						medium: {
							q: 'Classifica questi effetti secondo riguardino la Salute dei giovani o l’Economia agricola:',
							categories: ['Salute dei giovani', 'Economia agricola'],
							items: [
								{ text: 'Riduce gli eccessi di zuccheri', category: 0 },
								{ text: 'Offre energia naturale genuina', category: 0 },
								{ text: 'Sostiene la filiera corta', category: 1 },
								{ text: 'Premia il lavoro dei contadini', category: 1 }
							],
							explanation: 'تبرز الرسالة الفائدة المزدوجة للمنتجات المحلية لصحة الشباب والفلاحين.'
						} as DragDropSpec,
						hard: {
							q: 'Classifica queste forme verbali secondo esprimano Cortesia al condizionale o Futuro semplice:',
							categories: ['Cortesia formale (Condizionale)', 'Azione futura (Futuro)'],
							items: [
								{ text: 'Potremmo invitare un esperto', category: 0 },
								{ text: 'Vorremmo proporLe un progetto', category: 0 },
								{ text: 'Presenteremo schede chiare', category: 1 },
								{ text: 'Parteciperanno tutte le classi', category: 1 }
							],
							explanation: 'يضفي الشرطي (potremmo, vorremmo) أدباً رفيعاً على الطلب الرسمي في الإيطالية.'
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
					'Scegli UNA delle due tracce proposte e redigi il testo con coesione e proprietà di linguaggio (6 punti — BAC 3AS LE) :',
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
				trimesterId: 't2',
				difficulty,
				domain: 'produzione_scritta',
				examRole: 'written_expression',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'التزم بالموضوع الواحد المختار (Traccia 1 أو Traccia 2) في حدود 120–145 كلمة.',
					'وظّف معجم التغذية الصحية الحلال أو الحرف الهندسية اليدوية بدقة.',
					'تجنب الأخطاء الشائعة في التوافق الزمني لصيغة Congiuntivo وفي الأسماء المختومة بشدة مثل qualità.'
				],
				solutionStepsAr: [
					'الالتزام بالتعليمة وبنية النص المطلوب (1.5 نقطة).',
					'تسلسل الفقرات الأربع والروابط الحجاجية (1.5 نقطة).',
					'سلامة النحو والصرف والأزمنة (1.5 نقطة).',
					'ثراء المفردات وسلامة الإملاء والترقيم (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 6. WRITTEN EXPRESSION (6 pti — Integration): Scienza, tecnologia & media
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'ita_tpl_3as_le_t2_writ_scienza_informazione',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'produzione_scritta',
		titleAr: 'الإنتاج الكتابي (6 نقاط — لغات أجنبية): العلوم، التكنولوجيا والإعلام المسؤول',
		curriculumLessonId: 'ita_lesson_3as_le_t2_scienza_tecnologia_informazione',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					tracciaUnoPrompt:
						'Scrivi un saggio argomentativo (120–145 parole) sul tema seguente : «Quali vantaggi offrono gli strumenti digitali allo studio delle lingue e delle scienze, e quali precauzioni occorre adottare contro la disinformazione e l’abuso degli schermi?»',
					tracciaUnoPunti: [
						'Presentare due vantaggi concreti delle biblioteche digitali e delle risorse scientifiche online.',
						'Avvertire contro le notizie non verificate, la perdita di concentrazione e i rischi per la privacy.',
						'Proporre un equilibrio pratico tra studio su carta e uso responsabile della rete.'
					],
					tracciaDuePrompt:
						'«La tecnologia è un’ottima alleata dello studente soltanto finché non sostituisce lo sforzo personale e il senso critico.» Commenta questa frase in 120–145 parole.',
					modelAnswer:
						'Oggigiorno, gli strumenti informatici occupano un posto centrale nello studio dei maturandi delle scuole superiori. Se da un lato facilitano l’accesso rapido al sapere, dall’altro pongono interrogativi seri sulla qualità dell’informazione e sull’attenzione scolastica.\nIn primo luogo, internet offre archivi scientifici, dizionari bilingui e biblioteche digitali che velocizzano la ricerca e arricchiscono lo studio delle lingue straniere. Uno studente curioso può consultare fonti internazionali autorevoli in pochi istanti.\nTuttavia, la rete diffonde anche notizie false e distrazioni continue. Affinché la tecnologia resti utile, bisogna verificare sempre l’autorevolezza di ogni fonte, proteggere i dati personali con password sicure e non sostituire la lettura calma su carta con la fretta degli schermi.\nIn definitiva, l’alfabetizzazione digitale autentica unisce strumenti moderni, senso critico ed impegno personale costante ogni giorno.',
					rubricSummary:
						'Equilibrio argomentativo (1.5) + Struttura in 4 paragrafi e connettivi (1.5) + Uso corretto di congiuntivo e tempi (1.5) + Lessico digitale e ortografia (1.5).',
					quizzes: {
						easy: {
							q: 'Ordina le quattro parti logiche di un saggio sull’uso responsabile della tecnologia:',
							orderedItems: [
								'Introduzione sul ruolo attuale degli strumenti digitali',
								'Vantaggi per la ricerca e lo studio delle lingue',
								'Rischi di disinformazione e precauzioni per la privacy',
								'Conclusione sull’equilibrio tra rete e senso critico'
							],
							explanation: 'التصميم القياسي المتوازن لمقال التكنولوجيا: مقدمة، ثم المزايا، ثم المخاطر والضوابط، ثم خاتمة.'
						} as OrderingSpec,
						medium: {
							q: 'Ordina le fasi di verifica di una notizia scientifica letta su Internet:',
							orderedItems: [
								'Leggere con attenzione l’intero articolo oltre il titolo',
								'Controllare chi ha firmato e pubblicato l’informazione',
								'Confrontare i dati con almeno due fonti autorevoli',
								'Decidere con giudizio critico se il dato sia affidabile'
							],
							explanation: 'منهجية التحقق الإعلامي تبدأ بالقراءة المتأنية ثم فحص الناشر ثم المقارنة ثم الحكم النقدي.'
						} as OrderingSpec,
						hard: {
							q: 'Ordina le frasi seguenti per costruire un paragrafo concessivo coerente:',
							orderedItems: [
								'Sebbene le piattaforme digitali offrano risposte immediate,',
								'nessun dispositivo può sostituire il ragionamento personale.',
								'Infatti, leggere libri completi allena la memoria e lo stile.',
								'Pertanto, conviene integrare lo schermo con lo studio su carta.'
							],
							explanation: 'ربط منطقي متكامل: اعتراض بـ Sebbene، ثم برهان بـ Infatti، ثم توصية بـ Pertanto.'
						} as OrderingSpec
					}
				},
				{
					tracciaUnoPrompt:
						'Scrivi una lettera formale al direttore della biblioteca municipale chiedendo di istituire un laboratorio settimanale di alfabetizzazione digitale e ricerca sicura per gli studenti del liceo (120–145 parole).',
					tracciaUnoPunti: [
						'Inserire città, data, saluto formale e registro con «Lei».',
						'Spiegare l’utilità di imparare a distinguere fonti affidabili e a tutelare i dati personali.',
						'Proporre un orario compatibile con le lezioni e il sostegno dei docenti.'
					],
					tracciaDuePrompt:
						'«Insegnare ai giovani a proteggere la propria riservatezza digitale è urgente quanto insegnare loro a leggere un testo scientifico.» Sviluppa questa idea in 120–145 parole.',
					modelAnswer:
						'Orano, 2 marzo 2026.\nGentile Signor Direttore,\nLe scriviamo a nome della classe 3AS LE per proporLe l’avvio di un breve laboratorio settimanale di alfabetizzazione digitale presso la biblioteca municipale.\nMolti studenti utilizzano quotidianamente la rete per preparare ricerche di storia e di lingue straniere, ma non sempre sanno distinguere una fonte scientifica autorevole da una notizia priva di verifica. Inoltre, occorre sensibilizzare i più giovani sulla tutela dei dati personali e sull’uso prudente delle password.\nUn incontro ogni martedì pomeriggio, guidato da un bibliotecario e da un nostro insegnante, aiuterebbe gli alunni a consultare cataloghi seri senza interferire con le lezioni ufficiali.\nRingraziandoLa per la Sua disponibilità verso i progetti scolastici, Le porgiamo i nostri più distinti saluti.\nI rappresentanti di 3AS LE.',
					rubricSummary:
						'Formato della lettera formale con «Lei» (1.5) + Chiarezza di bisogni e soluzioni (1.5) + Correttezza morfosintattica (1.5) + Lessico e punteggiatura (1.5).',
					quizzes: {
						easy: {
							q: 'Ordina dall’inizio alla fine la struttura formale di una richiesta al direttore:',
							orderedItems: [
								'Città, data e saluto formale iniziale',
								'Esposizione chiara del motivo della lettera',
								'Argomenti educativi e dettagli organizzativi',
								'Ringraziamento cortese, saluti distinti e firma'
							],
							explanation: 'القالب الرسمي المعتمد للرسالة الإدارية في البكالوريا.'
						} as OrderingSpec,
						medium: {
							q: 'Ordina logicamente le tappe di un progetto scolastico di educazione ai media:',
							orderedItems: [
								'Individuare la difficoltà nel distinguere le fonti online',
								'Proporre un laboratorio settimanale in biblioteca',
								'Definire le regole per proteggere la privacy degli alunni',
								'Valutare i progressi nelle ricerche scritte di fine anno'
							],
							explanation: 'تبدأ المبادرة بتشخيص الحاجة ثم الحل المقترح ثم الضوابط وأخيراً التقييم.'
						} as OrderingSpec,
						hard: {
							q: 'Ordina gli enunciati per ricostruire un argomento sulla tutela della privacy:',
							orderedItems: [
								'Spesso i giovani condividono dati familiari senza riflettere.',
								'Tuttavia, tale imprudenza espone a rischi evitabili in rete.',
								'Educare alla prudenza insegna a scegliere password sicure.',
								'Di conseguenza, la riservatezza digitale protegge la serenità di tutti.'
							],
							explanation: 'تدرج واضح من الملاحظة الواقعية إلى التحذير ثم الحل فالنتيجة.'
						} as OrderingSpec
					}
				},
				{
					tracciaUnoPrompt:
						'Redigi un testo espositivo-argomentativo (120–145 parole) sul tema della scienza al servizio dell’uomo, traendo esempio dal metodo sperimentale di Ibn Al-Haytham e dall’etica della ricerca moderna.',
					tracciaUnoPunti: [
						'Spiegare perché il metodo sperimentale richiede osservazione, prove e onestà nei risultati.',
						'Mostrare come la ricerca medica, energetica o informatica debba mirare al bene comune.',
						'Concludere invitando gli studenti a coltivare rigore scientifico e integrità morale.'
					],
					tracciaDuePrompt:
						'«La scienza senza coscienza morale può smarrire il proprio scopo; unita all’onestà e alla prova oggettiva, invece, illumina il progresso umano.» Commenta in 120–145 parole.',
					modelAnswer:
						'Fin dall’antichità, la ricerca scientifica autentica nasce dal desiderio sincero di comprendere i fenomeni naturali attraverso l’osservazione paziente e la prova oggettiva. Già Ibn Al-Haytham insegnava ai suoi allievi che nessuna affermazione va accettata senza esperimenti controllati e verifiche matematiche rigorose.\nOggi questo principio conserva tutto il suo valore nei laboratori moderni di medicina, ecologia e tecnologia. Uno scienziato responsabile non cerca risultati affrettati, bensì controlla i propri dati con trasparenza e riconosce con umiltà eventuali errori prima di pubblicarli.\nInoltre, l’innovazione tecnica diventa davvero utile soltanto quando rispetta la dignità umana, tutela l’ambiente e risponde ai bisogni reali delle comunità.\nIn conclusione, unire metodo sperimentale, integrità intellettuale e senso morale rappresenta il modello più alto che la scuola possa trasmettere con fiducia ai futuri ricercatori.',
					rubricSummary:
						'Pertinenza e precisione storica/scientifica (1.5) + Coesione e connettivi (1.5) + Correttezza grammaticale (1.5) + Lessico accademico e ortografia (1.5).',
					quizzes: {
						easy: {
							q: 'Ordina le quattro tappe del metodo sperimentale descritto nel testo:',
							orderedItems: [
								'Osservare con attenzione il fenomeno naturale',
								'Formulare un’ipotesi chiara e verificabile',
								'Eseguire esperimenti controllati e calcoli precisi',
								'Pubblicare con onestà e trasparenza i risultati ottenuti'
							],
							explanation: 'المراحل الأربع للمنهج التجريبي من الملاحظة إلى التوثيق الأمين.'
						} as OrderingSpec,
						medium: {
							q: 'Ordina le idee principali del saggio sul legame tra scienza ed etica:',
							orderedItems: [
								'Richiamare l’eredità sperimentale di Ibn Al-Haytham',
								'Evidenziare il dovere di trasparenza nei laboratori moderni',
								'Collegare le scoperte al rispetto dell’uomo e dell’ambiente',
								'Esortare gli studenti a coltivare rigore e integrità morale'
							],
							explanation: 'بناء حجاجي رصين ينطلق من التاريخ العلمي نحو التطبيق الأخلاقي المعاصر.'
						} as OrderingSpec,
						hard: {
							q: 'Ordina le frasi per formare una conclusione sintetica per il BAC:',
							orderedItems: [
								'Benché gli strumenti moderni moltiplichino la velocità di calcolo,',
								'il valore della ricerca dipende sempre dall’onestà dello studioso.',
								'Infatti, la prova oggettiva e la prudenza prevengono gravi errori.',
								'Perciò, scienza ed etica devono camminare sempre unite.'
							],
							explanation: 'خاتمة تركيبية محكمة باستخدام الاعتراض بـ Benché والتعليل بـ Infatti والاستنتاج بـ Perciò.'
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
					'Scegli UNA delle due tracce proposte e redigi il testo rispettando lunghezza e coerenza (6 punti — BAC 3AS LE) :',
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
				trimesterId: 't2',
				difficulty,
				domain: 'produzione_scritta',
				examRole: 'written_expression',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					'في الرسالة الرسمية استعمل ضمير الاحترام «Lei» والافتتاح والختام الرسميين.',
					'في المقال الحجاجي وازن بين منافع العلم والتقنية وشروط الأخلاق وحماية البيانات في 120–145 كلمة.',
					'راجع تصريف Congiuntivo بعد «benché / affinché / bisogna che» وعلامات النبْر.'
				],
				solutionStepsAr: [
					'الالتزام بالتعليمة والقالب المطلوب (1.5 نقطة).',
					'تماسك الأفكار في 4 فقرات مع الروابط المناسبة (1.5 نقطة).',
					'الدقة النحوية والصرفية (1.5 نقطة).',
					'ثراء المعجم وسلامة الإملاء والترقيم (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	}
];
