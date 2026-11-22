import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	ItalianGeneratedExerciseInstance,
	ItalianParameterizedTemplate
} from '../../types';
import {
	buildItalianClassificationTableBlock,
	buildItalianPassageBlock,
	buildItalianWordFamilyTableBlock,
	buildItalianWrittenProductionBlock
} from '../../italian-helpers';
import {
	saveItalianSvgAsset,
	svgItalianGrammarMap,
	svgItalianTenseTimeline,
	svgItalianWordFormation,
	svgItalianWritingBlueprint
} from '../../svg-italian';
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

export const TEMPLATES_2AS_LE_T3: ItalianParameterizedTemplate[] = [
	// 1. Comprensione del testo (7 pti) — true_false quiz
	{
		id: 'ita_tpl_2as_le_t3_comp_ambiente_energie',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'comprensione_testo',
		titleAr: 'I. Comprensione del testo : Tutela della natura, riciclaggio ed energie pulite (7 pti)',
		curriculumLessonId: 'ita_lesson_2as_le_t3_natura_tutela_ambiente',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					passageTitle: 'Proteggere la natura comincia da gesti quotidiani',
					paragraphs: [
						'La difesa dell’ambiente è una delle sfide più urgenti del nostro secolo. Anche se molti pensano che soltanto i grandi governi possano cambiare le cose, ogni cittadino e ogni studente può proteggere la natura attraverso abitudini semplici: risparmiare l’acqua in casa, spegnere le luci inutili e ridurre l’uso della plastica.',
						'Nel nostro liceo il club ecologico ha installato contenitori colorati per la raccolta differenziata di carta, plastica e vetro. Gli alunni non buttano più i fogli usati per terra, ma [[li]] raccolgono con ordine affinché possano essere trasformati grazie al riciclaggio.',
						'Inoltre, in Algeria grandi progetti come il rilancio della Diga Verde e gli impianti di energia solare ed eolica dimostrano che la sostenibilità è possibile. L’anno prossimo i nostri studenti pianteranno cinquanta nuovi alberi e prepareranno [[una campagna di sensibilizzazione]] nel quartiere.'
					],
					source: 'Quaderno di Educazione Ambientale (testo adattato)',
					glossary: [
						{ term: 'raccolta differenziata', meaning: 'separazione dei rifiuti per favorirne il riciclaggio' },
						{ term: 'sostenibilità', meaning: 'sviluppo che rispetta le risorse naturali future' }
					],
					q1: '1. Quali tre gesti quotidiani di tutela ambientale cita il §1 e quale iniziativa concreta ha avviato il club ecologico del liceo?',
					a1: 'I tre gesti quotidiani sono risparmiare l’acqua, spegnere le luci inutili e ridurre l’uso della plastica. Il club ecologico ha installato contenitori colorati per la raccolta differenziata di carta, plastica e vetro.',
					tfItems: [
						{
							q: 'Secondo il §1, soltanto i grandi governi possono fare qualcosa per l’ambiente.',
							a: 'Falso',
							c: 'Ogni cittadino e ogni studente può proteggere la natura con abitudini semplici (§1).',
							mark: '0.5'
						},
						{
							q: 'La Diga Verde e gli impianti solari ed eolici in Algeria rappresentano progetti sostenibili.',
							a: 'Vero',
							c: 'Il §3 cita il rilancio della Diga Verde e le centrali solari ed eoliche come esempi concreti.',
							mark: '0.5'
						},
						{
							q: 'L’anno prossimo gli studenti del liceo taglieranno gli alberi del quartiere.',
							a: 'Falso',
							c: 'Pianteranno cinquanta nuovi alberi e prepareranno una campagna di sensibilizzazione (§3).',
							mark: '0.5'
						}
					],
					q3: '3. Cerca nel testo :\n  a) Il sinonimo di «tutela / protezione» (§1) e il contrario di «aumentare» (§1).\n  b) Quattro parole appartenenti al campo lessicale dell’ambiente e dell’ecologia.',
					a3: 'a) Sinonimo: «difesa»; Contrario di aumentare: «ridurre». | b) Campo lessicale: ambiente, natura, acqua, raccolta differenziata, riciclaggio, Diga Verde, energia solare, alberi.',
					q4: '4. A che cosa si riferiscono le parole sottolineate «li» (§2) e «una campagna di sensibilizzazione» (§3)? Indica anche due verbi al Futuro Semplice nel §3.',
					a4: '«li» (pronome diretto) si riferisce ai «fogli usati»; «una campagna di sensibilizzazione» indica l’iniziativa informativa futura nel quartiere. Due verbi al Futuro Semplice (§3): «pianteranno» e «prepareranno».',
					quizStatement:
						'Secondo il testo, separare i rifiuti e risparmiare l’acqua a scuola e in casa sono gesti concreti che aiutano a tutelare l’ambiente.',
					quizCorrect: true,
					quizExplanation:
						'العبارة صحيحة: تؤكد الفقرتان الأولى والثانية أن الفرز الانتقائي والاقتصاد في الماء وتقليل البلاستيك خطوات عملية لحماية الطبيعة.'
				},
				{
					passageTitle: 'L’acqua è un bene prezioso da custodire insieme',
					paragraphs: [
						'Senza acqua pulita nessuna pianta può crescere e nessuna comunità può vivere con serenità. Nel bacino del Mediterraneo, dove le estati sono lunghe e spesso aride, la tutela delle risorse idriche diventa una priorità morale ed educativa per tutti.',
						'Molto spesso, però, nelle case o negli spazi pubblici si spreca acqua senza accorgersene: un rubinetto che perde goccia dopo goccia può consumare decine di litri al giorno. Gli esperti raccomandano di controllare subito [[questi guasti domestici]], di preferire docce brevi e di innaffiare i giardini la sera per evitare l’evaporazione.',
						'Anche la scuola svolge un ruolo fondamentale. Durante le lezioni di scienze e lingue, i ragazzi imparano a rispettare i fiumi e le coste pulite; in futuro, molti giovani cittadini useranno tecnologie più efficienti per proteggere [[questo tesoro naturale]].'
					],
					source: 'Bollettino mediterraneo sull’ambiente (testo adattato)',
					glossary: [
						{ term: 'risorse idriche', meaning: 'riserve d’acqua disponibili in natura' },
						{ term: 'evaporazione', meaning: 'passaggio dell’acqua dallo stato liquido a vapore con il caldo' }
					],
					q1: '1. Perché la tutela dell’acqua è particolarmente urgente nel Mediterraneo e quali soluzioni pratiche indicano gli esperti nel §2?',
					a1: 'Perché le estati mediterranee sono lunghe e spesso aride. Gli esperti raccomandano di riparare subito i rubinetti che perdono, preferire docce brevi e innaffiare i giardini la sera per evitare l’evaporazione.',
					tfItems: [
						{
							q: 'Un rubinetto che perde poche gocce non consuma quasi nessuna acqua.',
							a: 'Falso',
							c: 'Un rubinetto che perde goccia dopo goccia può consumare decine di litri al giorno (§2).',
							mark: '0.5'
						},
						{
							q: 'Conviene innaffiare i giardini la sera piuttosto che nelle ore più calde.',
							a: 'Vero',
							c: 'Innaffiare la sera evita l’evaporazione rapida (§2).',
							mark: '0.5'
						},
						{
							q: 'La scuola non ha alcun ruolo nell’educazione al rispetto dell’acqua.',
							a: 'Falso',
							c: 'La scuola svolge un ruolo fondamentale insegnando a rispettare fiumi e coste (§3).',
							mark: '0.5'
						}
					],
					q3: '3. Trova nel testo :\n  a) Il sinonimo di «secche / prive di pioggia» (§1) e il contrario di «risparmiare / custodire» (un verbo nel §2).\n  b) Tre parole o espressioni legate all’acqua.',
					a3: 'a) Sinonimo: «aride»; Contrario di risparmiare: «si spreca» (sprecare). | b) Acqua: acqua pulita, risorse idriche, rubinetto, litri, fiumi, evaporazione.',
					q4: '4. A che cosa si riferiscono «questi guasti domestici» (§2) e «questo tesoro naturale» (§3)?',
					a4: '«questi guasti domestici» si riferisce ai rubinetti che perdono acqua in casa; «questo tesoro naturale» indica l’acqua pulita e le risorse idriche.',
					quizStatement:
						'Secondo gli esperti del testo, innaffiare i giardini nelle ore serali aiuta a ridurre la perdita d’acqua per evaporazione.',
					quizCorrect: true,
					quizExplanation:
						'العبارة صحيحة: الفقرة الثانية تنصح بسقي الحدائق مساءً لتفادي التبخر.'
				},
				{
					passageTitle: 'Sole, vento e boschi: il futuro dell’energia pulita',
					paragraphs: [
						'Per molti decenni le città hanno prodotto elettricità quasi esclusivamente con combustibili fossili che emettono fumi e aumentano l’inquinamento atmosferico. Oggi, tuttavia, la transizione verso le energie rinnovabili apre prospettive più sane per il pianeta.',
						'Nel sud dell’Algeria, l’abbondanza di luce solare permette di generare energia pulita mediante pannelli fotovoltaici, mentre nelle zone ventose le pale eoliche trasformano la forza del vento in elettricità senza consumare acqua. Allo stesso tempo, i programmi di rimboschimento proteggono i terreni fertili dall’avanzata del deserto.',
						'Presto gli studenti di oggi diventeranno ingegneri, insegnanti e cittadini attivi. Se uniranno la ricerca scientifica alla coscienza morale, costruiranno [[città più pulite]] e lasceranno ai propri figli [[un ambiente sano e verde]].'
					],
					source: 'Rivista di ecologia e sviluppo (testo adattato)',
					glossary: [
						{ term: 'combustibili fossili', meaning: 'petrolio, gas e carbone formatisi nel sottosuolo' },
						{ term: 'rimboschimento', meaning: 'azione di piantare nuovi alberi per ricostituire i boschi' }
					],
					q1: '1. Quali vantaggi offrono l’energia solare, l’energia eolica e il rimboschimento secondo il §2?',
					a1: 'I pannelli fotovoltaici generano energia pulita sfruttando la luce solare; le pale eoliche trasformano il vento in elettricità senza consumare acqua; il rimboschimento protegge i terreni fertili dall’avanzata del deserto.',
					tfItems: [
						{
							q: 'I combustibili fossili tradizionali non producono alcun inquinamento atmosferico.',
							a: 'Falso',
							c: 'Emettono fumi e aumentano l’inquinamento atmosferico (§1).',
							mark: '0.5'
						},
						{
							q: 'Le pale eoliche producono elettricità sfruttando il vento senza consumare acqua.',
							a: 'Vero',
							c: 'Trasformano la forza del vento in elettricità senza consumare acqua (§2).',
							mark: '0.5'
						},
						{
							q: 'Il rimboschimento serve a proteggere i terreni fertili dalla desertificazione.',
							a: 'Vero',
							c: 'Protegge i terreni fertili dall’avanzata del deserto (§2).',
							mark: '0.5'
						}
					],
					q3: '3. Cerca nel testo :\n  a) Il sinonimo di «chiare / non inquinanti» (§2) e il contrario di «riducono» (§1).\n  b) Tre verbi coniugati al Futuro Semplice nel §3.',
					a3: 'a) Sinonimo: «pulita»; Contrario di riducono: «aumentano». | b) Futuro Semplice (§3): diventeranno, uniranno, costruiranno, lasceranno.',
					q4: '4. A che cosa si riferiscono «città più pulite» (§3) e «un ambiente sano e verde» (§3)?',
					a4: '«città più pulite» indica i centri urbani sostenibili che gli studenti di oggi costruiranno in futuro unendo scienza e coscienza morale; «un ambiente sano e verde» indica la natura protetta lasciata alle generazioni future.',
					quizStatement:
						'Secondo il testo, il rimboschimento aggrava l’avanzata del deserto e distrugge i terreni fertili.',
					quizCorrect: false,
					quizExplanation:
						'العبارة خاطئة: تؤكد الفقرة الثانية أن برامج التشجير تحمي الأراضي الخصبة من زحف الصحراء (التصحر).'
				}
			];

			const v = rng.pick(variants);
			const content: ContentBlock[] = [
				buildIllustratedFigureBlock('ita_04_ambiente_energie_rinnovabili', {
					lang: 'it',
					mode: 'labeled',
					pins: [],
					width: '62%',
					maxHeight: 118,
					caption: 'Tutela dell’ambiente, energie rinnovabili e Algeria verde (2AS LE)'
				}),
				buildItalianPassageBlock({
					title: v.passageTitle,
					paragraphs: v.paragraphs,
					source: v.source,
					numberedParagraphs: true,
					glossary: v.glossary
				}),
				{ type: 'text', content: v.q1, answer: v.a1, mark: '2.0' },
				{
					type: 'text',
					content: '2. Indica se le seguenti affermazioni sono Vere (Vero) o False (Falso) e giustifica secondo il testo :',
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
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'true_false',
					questionText: v.quizStatement,
					questionTextAr: 'حدد صحة أو خطأ العبارة الآتية بناءً على النص:',
					questionData: {
						correctAnswer: v.quizCorrect
					},
					explanation: v.quizExplanation
				},
				sujetExercise: {
					customTitle: 'I. Comprensione del testo',
					points: 7,
					instruction: 'Osserva la tavola illustrata, leggi il testo con cura e rispondi alle domande :',
					content
				},
				hints: [
					'اربط أفكار النص بعناصر اللوحة البيئية (الطاقة الشمسية، طاقة الرياح، الفرز، والتشجير).',
					'علل دائماً إجابات Vero / Falso بجملة واضحة من النص.',
					'انتبه لأفعال المستقبل البسيط والضمائر المباشرة الواردة في النص.'
				],
				solutionStepsAr: [
					'الإجابة عن سؤال الفهم الصريح (2.0 نقطة).',
					'تحديد صحة أو خطأ العبارات الثلاث مع التعليل النصي (1.5 نقطة).',
					'استخراج المترادفات والأضداد والحقل المعجمي أو الأفعال المستقبلية (2.0 نقطة).',
					'تعيين العائد النصي بدقة (1.5 نقطة).'
				],
				finalAnswer: v.quizCorrect ? 'Vero' : 'Falso'
			};
		}
	},

	// 2. Comprensione del testo (7 pti) — mcq quiz
	{
		id: 'ita_tpl_2as_le_t3_comp_lettura_digitale',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'comprensione_testo',
		titleAr: 'I. Comprensione del testo : Lettura, scienza e tecnologia responsabile (7 pti)',
		curriculumLessonId: 'ita_lesson_2as_le_t3_lettura_tecnologia_responsabile',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					passageTitle: 'Il valore del libro cartaceo nell’era dei dispositivi digitali',
					paragraphs: [
						'In un’epoca ricca di schermi veloci e biblioteche virtuali, molti si chiedono se il libro di carta conservi ancora la sua utilità. Numerose ricerche scolastiche dimostrano che leggere su carta favorisce la concentrazione profonda, aiuta a ricordare meglio i concetti e protegge gli occhi dall’affaticamento prolungato.',
						'Naturalmente, i computer e le piattaforme educative offrono risorse preziose quando sono usati con criterio: permettono di consultare dizionari aggiornati, verificare date storiche e seguire corsi di lingue. Tuttavia, prima di fidarsi di una notizia letta in rete, uno studente attento verifica sempre [[l’affidabilità della fonte]].',
						'Per questo motivo, gli insegnanti consigliano di unire i due mondi: cercare dati scientifici online con responsabilità e dedicare almeno venti minuti ogni sera alla lettura calma di [[un buon volume stampato]].'
					],
					source: 'Quaderni di Didattica e Lettura (testo adattato)',
					glossary: [
						{ term: 'affaticamento', meaning: 'stanchezza fisica o visiva dovuta a uno sforzo prolungato' },
						{ term: 'affidabilità', meaning: 'qualità di ciò che è serio, verificato e degno di fiducia' }
					],
					q1: '1. Quali vantaggi specifici offre la lettura su carta secondo il §1 e quando risultano utili gli strumenti digitali secondo il §2?',
					a1: 'La lettura su carta favorisce la concentrazione profonda, aiuta a ricordare meglio i concetti e protegge gli occhi dall’affaticamento. Gli strumenti digitali sono utili quando servono a consultare dizionari, verificare date e seguire corsi con criterio.',
					mcGroups: [
						{
							header: 'a) Che cosa fa uno studente attento prima di fidarsi di un’informazione letta in rete?',
							options: [
								'La condivide immediatamente senza leggerla',
								'Verifica sempre l’affidabilità della fonte',
								'Chiude per sempre ogni libro scolastico'
							],
							correct: 'Verifica sempre l’affidabilità della fonte',
							mark: '1.0'
						},
						{
							header: 'b) Che cosa consigliano gli insegnanti nel §3 per unire lettura e tecnologia?',
							options: [
								'Cercare dati online con responsabilità e leggere su carta venti minuti la sera',
								'Passare tutta la notte davanti al computer',
								'Sostituire il dizionario con messaggi brevi'
							],
							correct: 'Cercare dati online con responsabilità e leggere su carta venti minuti la sera',
							mark: '1.0'
						}
					],
					q3: '3. Cerca nel testo :\n  a) Il sinonimo di «utilità / beneficio» o «preziose / utili» (§1-§2) e il contrario di «superficiale» (§1).\n  b) Tre parole appartenenti al campo lessicale della tecnologia e dell’informazione.',
					a3: 'a) Sinonimo di utili: «preziose»; Contrario di superficiale: «profonda». | b) Campo lessicale: schermi, biblioteche virtuali, computer, piattaforme educative, rete, fonte, dati scientifici.',
					q4: '4. A che cosa si riferiscono «l’affidabilità della fonte» (§2) e «un buon volume stampato» (§3)?',
					a4: '«l’affidabilità della fonte» indica la serietà e la verifica dell’origine di una notizia letta online; «un buon volume stampato» si riferisce al libro di carta consigliato per la lettura calma serale.',
					mcqQuestion: 'Qual è l’idea centrale difesa dall’autore nel testo?',
					mcqQuestionAr: 'ما الفكرة المركزية التي يدافع عنها الكاتب في النص؟',
					mcqCorrect: 'Unire in modo equilibrato i vantaggi della ricerca digitale responsabile con la lettura calma su carta',
					mcqDistractors: [
						{
							text: 'Proibire l’uso del computer anche per consultare i dizionari educativi',
							diagnosticFeedback: 'خطأ: الكاتب يقر بقيمة الأدوات الرقمية عند توظيفها بعقلانية.'
						},
						{
							text: 'Eliminare i libri cartacei da tutte le biblioteche scolastiche',
							diagnosticFeedback: 'خطأ: يؤكد النص أن الكتاب الورقي يحمي البصر ويقوي التركيز.'
						},
						{
							text: 'Accettare qualsiasi notizia pubblicata online senza alcun controllo',
							diagnosticFeedback: 'خطأ: يدعو النص للتحقق الدائم من موثوقية المصدر.'
						}
					],
					mcqExplanation:
						'يدعو النص إلى التوازن بين الاستعمال المسؤول للتكنولوجيا التعليمية والمطالعة الهادئة للكتاب الورقي.'
				},
				{
					passageTitle: 'Sicurezza dei dati e spirito critico per i giovani lettori',
					paragraphs: [
						'Oggi lo studente di Lingue Straniere può visitare in pochi secondi gli archivi digitali delle grandi biblioteche del mondo. Questa possibilità straordinaria, però, richiede senso di responsabilità, attenzione alla sicurezza informatica e capacità di distinguere i fatti reali dalle voci infondate.',
						'Molti esperti di educazione digitale ricordano tre regole d’oro: non pubblicare mai dati personali sensibili online, usare password sicure e controllare sempre chi ha scritto un articolo scientifico prima di citarlo in un lavoro scolastico. Quando riceviamo un messaggio allarmante, non dobbiamo inoltrar[[lo]] senza averne verificato l’origine.',
						'Se i giovani coltiveranno insieme la curiosità scientifica e la prudenza digitale, la tecnologia resterà sempre al servizio dello studio e della crescita umana, senza mai sostituire [[il dialogo familiare]].'
					],
					source: 'Manuale di cittadinanza digitale per il liceo (testo adattato)',
					glossary: [
						{ term: 'voci infondate', meaning: 'notizie false prive di prove o documenti seri' },
						{ term: 'inoltrare', meaning: 'inviare ad altre persone un messaggio ricevuto' }
					],
					q1: '1. Quali tre regole d’oro di sicurezza e rigore informativo indicano gli esperti nel §2?',
					a1: '1) Non pubblicare mai dati personali sensibili online; 2) usare password sicure; 3) controllare sempre l’autore e la fonte di un articolo prima di citarlo o inoltrare un messaggio.',
					mcGroups: [
						{
							header: 'a) Che cosa permette oggi allo studente di 2AS LE l’accesso digitale Responsabile?',
							options: [
								'Visitare in pochi secondi gli archivi digitali delle biblioteche',
								'Evitare completamente di leggere qualsiasi testo',
								'Dimenticare le regole della grammatica'
							],
							correct: 'Visitare in pochi secondi gli archivi digitali delle biblioteche',
							mark: '1.0'
						},
						{
							header: 'b) Secondo il §3, la tecnologia non deve mai sostituire :',
							options: [
								'Il dialogo familiare',
								'L’uso delle password sicure',
								'Gli archivi delle biblioteche'
							],
							correct: 'Il dialogo familiare',
							mark: '1.0'
						}
					],
					q3: '3. Trova nel testo :\n  a) Il sinonimo di «prudenza / cura» (§1-§3) e il contrario di «vere / documentate» (§1).\n  b) Due connettivi logici presenti nel §1 o nel §3.',
					a3: 'a) Sinonimo: «prudenza»; Contrario di vere: «infondate». | b) Connettivi: però (§1), se (§3).',
					q4: '4. A che cosa si riferiscono «lo» in «inoltrarlo» (§2) e «il dialogo familiare» (§3)?',
					a4: '«lo» (pronome diretto enclitico) si riferisce a «un messaggio allarmante»; «il dialogo familiare» indica la comunicazione diretta e rispettosa tra i membri della famiglia.',
					mcqQuestion: 'Che cosa sostituisce il pronome diretto «lo» nella parola «inoltrarlo» del §2?',
					mcqQuestionAr: 'ما الذي يعوضه الضمير المباشر «lo» في كلمة «inoltrarlo» في الفقرة الثانية؟',
					mcqCorrect: 'Un messaggio allarmante ricevuto online',
					mcqDistractors: [
						{
							text: 'Un articolo scientifico verificato in biblioteca',
							diagnosticFeedback: 'خطأ: المقال العلمي ذُكر في الجملة السابقة، والجملة تعود على «un messaggio allarmante».'
						},
						{
							text: 'I dati personali sensibili e le password',
							diagnosticFeedback: 'خطأ: dati و password جمع، بينما lo للمفرد المذكر.'
						},
						{
							text: 'Gli esperti di educazione digitale',
							diagnosticFeedback: 'خطأ: esperti جمع مذكر (li).'
						}
					],
					mcqExplanation:
						'الضمير المباشر المفرد المذكر `lo` الملتصق بالمصدر `inoltrare` يعود على `un messaggio allarmante`.'
				},
				{
					passageTitle: 'La settimana della scienza e della lettura al nostro liceo',
					paragraphs: [
						'La settimana scorsa il nostro liceo ha organizzato quattro laboratori interattivi dedicati alla scienza, alla stampa scolastica e alla lettura critica. Nel laboratorio di biologia e fisica gli alunni hanno osservato al microscopio alcune cellule vegetali e hanno redatto schede chiare in italiano e in arabo.',
						'In un’altra aula, il gruppo di giornalismo ha spiegato come scrivere un testo informativo corretto: innanzitutto bisogna scegliere fatti verificati; inoltre occorre strutturare il discorso in introduzione, svolgimento e conclusione; infine è necessario controllare la lingua prima di pubblicare [[l’articolo definitivo]].',
						'Alla cerimonia di chiusura, la preside ha elogiato il lavoro ordinato dei ragazzi e ha annunciato che l’anno prossimo la scuola arricchirà la biblioteca con nuovi testi scientifici e dizionari bilingui per sostenere [[la formazione degli studenti]].'
					],
					source: 'Gazzetta studentesca di 2AS (testo adattato)',
					glossary: [
						{ term: 'laboratorio', meaning: 'spazio attrezzato per esperimenti o attività pratiche' },
						{ term: 'redigere', meaning: 'scrivere in forma ordinata e corretta un testo o documento' }
					],
					q1: '1. Quali tre regole di scrittura giornalistica ha presentato il gruppo nel §2?',
					a1: '1) Scegliere innanzitutto fatti verificati; 2) strutturare il testo in introduzione, svolgimento e conclusione; 3) controllare la lingua prima di pubblicare.',
					mcGroups: [
						{
							header: 'a) Che cosa hanno osservato gli studenti nel laboratorio scientifico (§1)?',
							options: [
								'Alcune cellule vegetali al microscopio',
								'Soltanto vecchie mappe stradali',
								'Un torneo di videogiochi'
							],
							correct: 'Alcune cellule vegetali al microscopio',
							mark: '1.0'
						},
						{
							header: 'b) Che cosa ha annunciato la preside per l’anno prossimo (§3)?',
							options: [
								'Arricchirà la biblioteca con nuovi testi scientifici e dizionari bilingui',
								'Chiuderà la biblioteca scolastica tutto l’inverno',
								'Sopprimerà i laboratori di giornalismo e lingue'
							],
							correct: 'Arricchirà la biblioteca con nuovi testi scientifici e dizionari bilingui',
							mark: '1.0'
						}
					],
					q3: '3. Cerca nel testo :\n  a) Il sinonimo di «scritto» (participio nel §1) e il contrario di «apertura» (§3).\n  b) Tre connettivi di ordine presenti nel §2.',
					a3: 'a) Sinonimo: «redatto»; Contrario di apertura: «chiusura». | b) Connettivi di ordine (§2): innanzitutto, inoltre, infine.',
					q4: '4. A che cosa si riferiscono «l’articolo definitivo» (§2) e «la formazione degli studenti» (§3)?',
					a4: '«l’articolo definitivo» indica il testo informativo pronto per la pubblicazione dopo la revisione linguistica; «la formazione degli studenti» si riferisce all’educazione culturale e scientifica degli alunni del liceo.',
					mcqQuestion: 'Quale tempo verbale è usato in «la scuola arricchirà la biblioteca» e che cosa esprime?',
					mcqQuestionAr: 'ما الزمن المستعمل في «arricchirà» وما دلالته؟',
					mcqCorrect: 'Il Futuro Semplice, che esprime un progetto programmato per l’anno prossimo',
					mcqDistractors: [
						{
							text: 'L’Imperfetto, che descrive un’abitudine dell’anno passato',
							diagnosticFeedback: 'خطأ: صيغة Imperfetto تنتهي بـ -iva، أما -irà فهي مستقبل.'
						},
						{
							text: 'Il Passato Prossimo, che indica un’azione già conclusa ieri',
							diagnosticFeedback: 'خطأ: الفعل غير مسبوق بمساعد، والمؤشر الزمني هو l’anno prossimo.'
						},
						{
							text: 'Un nome plurale senza verbo',
							diagnosticFeedback: 'خطأ: arricchirà فعل مصرف من arricchire.'
						}
					],
					mcqExplanation:
						'الفعل `arricchirà` في زمن المستقبل البسيط (Futuro Semplice) مع المؤشر `l’anno prossimo`.'
				}
			];

			const v = rng.pick(variants);
			const mcq = buildUniqueMcqOptions(v.mcqCorrect, v.mcqDistractors, rng);
			const content: ContentBlock[] = [
				buildIllustratedFigureBlock('ita_05_scienza_tecnologia_informazione', {
					lang: 'it',
					mode: 'labeled',
					pins: [],
					width: '62%',
					maxHeight: 118,
					caption: 'Scienza, lettura critica e tecnologia dell’informazione responsabile'
				}),
				buildItalianPassageBlock({
					title: v.passageTitle,
					paragraphs: v.paragraphs,
					source: v.source,
					numberedParagraphs: true,
					glossary: v.glossary
				}),
				{ type: 'text', content: v.q1, answer: v.a1, mark: '2.0' },
				{
					type: 'text',
					content: '2. Scegli la risposta corretta in base al testo :',
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
					customTitle: 'I. Comprensione del testo',
					points: 7,
					instruction: 'Leggi con attenzione il brano e rispondi alle domande seguenti :',
					content
				},
				hints: [
					'تأمّل اللوحة العلمية والرقمية لربطها بأفكار القراءة وأمن المعلومات في النص.',
					'في أسئلة الاختيار تحقق دائماً من الفقرة المشار إليها قبل الجزم.',
					'انتبه للروابط المنطقية (innanzitutto, inoltre, tuttavia, infine) ولأفعال المستقبل.'
				],
				solutionStepsAr: [
					'الإجابة عن سؤال الفهم الرئيسي (2.0 نقطة).',
					'اختيار الإجابتين الصحيحتين في الاختيار من متعدد (2.0 نقطة).',
					'استخراج المترادفات والأضداد والرصيد اللغوي أو الروابط (1.5 نقطة).',
					'تحديد العائد النصي بدقة (1.5 نقطة).'
				],
				finalAnswer: v.mcqCorrect
			};
		}
	},

	// 3. Competenza linguistica (7 pti) — matching quiz + saveItalianSvgAsset
	{
		id: 'ita_tpl_2as_le_t3_ling_futuro_morfologia',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'lessico_morfologia',
		titleAr: 'II. Competenza linguistica : Futuro semplice, derivazione morfologica e pronomi (7 pti)',
		curriculumLessonId: 'ita_lesson_2as_le_t3_futuro_pronomi_diretti_indiretti',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					svgSlug: 'ita_2as_t3_ling_futuro_v0',
					svgContent: svgItalianTenseTimeline({
						title: 'Progetti e previsioni (2AS LE)',
						tenseName: 'Futuro Semplice',
						formula: '-are -> -erò | -ere/-ire -> -erò/-irò (accento su io e lui/lei)',
						activeZone: 'future',
						example: 'L’anno prossimo faremo nuovi progetti e pianteremo alberi.',
						markers: 'domani, presto, tra poco, l’anno prossimo, in futuro',
						width: 560
					}),
					svgCaption: 'Linea temporale e formazione del Futuro Semplice',
					wfRows: [
						{
							verbo: { given: true, value: 'proteggere' },
							sostantivo: { value: 'protezione', mark: '0.5' },
							aggettivo: { value: 'protettivo/a', mark: '0.5' }
						},
						{
							verbo: { value: 'informare', mark: '0.5' },
							sostantivo: { given: true, value: 'informazione' },
							aggettivo: { value: 'informativo/a', mark: '0.5' }
						}
					],
					q2: '2. Coniuga i verbi tra parentesi al Futuro Semplice (attenzione alle forme irregolari e ortografiche) :\n  a) Domani io (cercare) fonti sicure in biblioteca e (scrivere) la relazione.\n  b) L’anno prossimo noi (fare) un progetto ecologico e (andare) al parco naturale.\n  c) Presto gli studenti (avere) nuovi dizionari e (potere) leggere meglio.',
					a2: 'a) cercherò (con h!) / scriverò.\n  b) faremo / andremo (irregolari).\n  c) avranno / potranno (irregolari).',
					q3: '3. Trasforma le parole sottolineate usando il pronome diretto adatto (lo, la, li, le) e attento al participio passato :\n  a) Leggerò il libro di storia domani -> ............ leggerò domani.\n  b) Ho riciclato le bottiglie di plastica -> ............ ho riciclat............ ieri.\n  c) Abbiamo comprato nuovi quaderni -> ............ abbiamo comprat............ in libreria.',
					a3: 'a) Lo leggerò domani.\n  b) Le ho riciclate ieri.\n  c) Li abbiamo comprati in libreria.',
					q4: '4. Aggiungi il prefisso negativo o ripetitivo adatto (in-, ir-, dis-, ri-) a ciascuna parola :\n  a) responsabile -> ............ ; b) ordinato -> ............ ; c) utilizzare -> ............ .',
					a4: 'a) irresponsabile ; b) disordinato ; c) riutilizzare.',
					pairs: [
						{ left: 'essere (noi, Futuro Semplice)', right: 'saremo' },
						{ left: 'fare (io, Futuro Semplice)', right: 'farò' },
						{ left: 'cercare (io, Futuro Semplice)', right: 'cercherò' },
						{ left: 'venire (loro, Futuro Semplice)', right: 'verranno' }
					],
					explanation:
						'جذور المستقبل الشاذة: essere -> saremo، fare -> farò، venire -> verranno؛ وإضافة h في cercare -> cercherò.'
				},
				{
					svgSlug: 'ita_2as_t3_ling_futuro_v1',
					svgContent: svgItalianWordFormation({
						title: 'Formazione delle parole : Famiglia lessicale',
						prefix: 'ri-',
						root: 'cicl-',
						suffix: '-abile',
						derivedWord: 'riciclabile (aggettivo)',
						meaningNote: 'Verbo: riciclare | Sostantivo: riciclaggio',
						width: 560
					}),
					svgCaption: 'Schema morfologico di prefissazione e suffissazione in italiano',
					wfRows: [
						{
							verbo: { given: true, value: 'inquinare' },
							sostantivo: { value: 'inquinamento', mark: '0.5' },
							aggettivo: { value: 'inquinante / inquinato', mark: '0.5' }
						},
						{
							verbo: { value: 'risparmiare', mark: '0.5' },
							sostantivo: { value: 'risparmio', mark: '0.5' },
							aggettivo: { given: true, value: 'risparmioso/a' }
						}
					],
					q2: '2. Volgi queste frasi dal Presente al Futuro Semplice (sostituisci «oggi» con «domani») :\n  a) Oggi io comincio il nuovo tema e pago la tessera della biblioteca.\n  b) Oggi mia sorella viene a scuola presto e vede la nuova mostra.\n  c) Oggi voi dovete finire la scheda e sapere tutte le risposte.',
					a2: 'a) Domani io comincerò (senza i!) il nuovo tema e pagherò (con h!) la tessera della biblioteca.\n  b) Domani mia sorella verrà a scuola presto e vedrà la nuova mostra.\n  c) Domani voi dovrete finire la scheda e saprete tutte le risposte.',
					q3: '3. Scegli il pronome diretto o indiretto esatto per completare ogni frase :\n  a) Quando vedo mio padre la sera, ............ racconto la mia giornata (a lui).\n  b) Ho incontrato Sara nel cortile e ............ ho prestato il dizionario (a lei).\n  c) Questa rivista scientifica è ottima: ............ consiglio a tutti voi (la rivista).',
					a3: 'a) gli.\n  b) le.\n  c) la.',
					q4: '4. Volgi al plurale queste espressioni tecnologiche e ambientali :\n  a) il computer veloce -> ............\n  b) l’energia pulita -> ............\n  c) la ricerca seria -> ............',
					a4: 'a) i computer veloci.\n  b) le energie pulite.\n  c) le ricerche serie.',
					pairs: [
						{ left: 'andare (io, Futuro Semplice)', right: 'andrò' },
						{ left: 'pagare (noi, Futuro Semplice)', right: 'pagheremo' },
						{ left: 'cominciare (tu, Futuro Semplice)', right: 'comincerai' },
						{ left: 'volere (loro, Futuro Semplice)', right: 'vorranno' }
					],
					explanation:
						'تغييرات المستقبل: andare -> andrò، pagare -> pagheremo (إضافة h)، cominciare -> comincerai (حذف i)، volere -> vorranno.'
				},
				{
					svgSlug: 'ita_2as_t3_ling_futuro_v2',
					svgContent: svgItalianWordFormation({
						title: 'Derivazione nominale e aggettivale',
						prefix: 'in-',
						root: 'affid-',
						suffix: '-abile',
						derivedWord: 'affidabile / inaffidabile',
						meaningNote: 'Verbo: affidare | Sostantivo: affidabilità',
						width: 560
					}),
					svgCaption: 'Derivazione lessicale con prefissi e suffissi produttivi',
					wfRows: [
						{
							verbo: { given: true, value: 'rinnovare' },
							sostantivo: { value: 'rinnovamento', mark: '0.5' },
							aggettivo: { value: 'rinnovabile', mark: '0.5' }
						},
						{
							verbo: { value: 'leggere', mark: '0.5' },
							sostantivo: { given: true, value: 'lettura / lettore' },
							aggettivo: { value: 'leggibile', mark: '0.5' }
						}
					],
					q2: '2. Coniuga i verbi tra parentesi al Futuro Semplice :\n  a) Se tutti noi (collaborare), la città (essere) più verde e pulita.\n  b) Tra due settimane Karim (dare) l’esame e (rimanere) sereno grazie allo studio.\n  c) La nostra classe (tenere) un diario ecologico e (leggere) un libro al mese.',
					a2: 'a) collaboreremo / sarà.\n  b) darà (non si abbrevia in da-) / rimarrà.\n  c) terrà / leggerà.',
					q3: '3. Riscrivi le frasi sostituendo il complemento con il pronome corretto :\n  a) Chiediamo informazioni al bibliotecario -> ............ chiediamo informazioni.\n  b) Hai spento le luci prima di uscire? -> ............ hai spent............ prima di uscire?\n  c) Porterò i quaderni ai miei compagni -> ............ porterò i quaderni.',
					a3: 'a) Gli chiediamo informazioni.\n  b) Le hai spente prima di uscire?\n  c) Gli porterò i quaderni.',
					q4: '4. Correggi i tre errori presenti nelle frasi seguenti :\n  a) Domani io faro una passeggiata e lui andra al parco.\n  b) Ho comprato questi fiori e le ho messi sul balcone.\n  c) I nuovi computers della scuola sono molto utili.',
					a4: 'a) Domani io farò una passeggiata e lui andrà al parco.\n  b) Ho comprato questi fiori e li ho messi sul balcone.\n  c) I nuovi computer della scuola sono molto utili.',
					pairs: [
						{ left: 'dare (lui, Futuro Semplice)', right: 'darà' },
						{ left: 'rimanere (io, Futuro Semplice)', right: 'rimarrò' },
						{ left: 'sapere (noi, Futuro Semplice)', right: 'sapremo' },
						{ left: 'tenere (tu, Futuro Semplice)', right: 'terrai' }
					],
					explanation:
						'الشواذ في المستقبل: dare -> darà (ببقاء a)، rimanere -> rimarrò، sapere -> sapremo، tenere -> terrai.'
				}
			];

			const v = rng.pick(variants);
			const svgPath = saveItalianSvgAsset(v.svgSlug, v.svgContent);

			const content: ContentBlock[] = [
				{
					type: 'image',
					src: svgPath,
					width: '76%',
					caption: v.svgCaption
				},
				{
					type: 'text',
					content: '1. Completa la tabella morfologica di derivazione lessicale (Verbo | Sostantivo | Aggettivo) :',
					mark: ''
				},
				buildItalianWordFamilyTableBlock(v.wfRows),
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
					questionText: 'Abbina ciascun verbo e pronome soggetto a sinistra con la forma esatta al Futuro Semplice a destra:',
					questionTextAr: 'صل كل فعل وضمير فاعل في العمود الأول بصيغته الصحيحة في المستقبل البسيط:',
					questionData: {
						pairs: v.pairs
					},
					explanation: v.explanation
				},
				sujetExercise: {
					customTitle: 'II. Competenza linguistica',
					points: 7,
					instruction: 'Completa gli esercizi di morfologia, Futuro Semplice e pronomi :',
					content
				},
				hints: [
					'تذكر أن أفعال -are تتحول إلى -erò في المستقبل، ما عدا fare/dare/stare التي تحتفظ بحرف a (farò, darò, starò).',
					'لا تنسَ النبرة المائلة (`accento grave`) على صيغتي io و lui/lei في المستقبل (-ò, -à).',
					'مع الضمائر المباشرة lo/la/li/le في الماضي المركب تتطابق نهاية اسم المفعول وجوباً (Li ho comprati / Le ho spente).'
				],
				solutionStepsAr: [
					'إكمال جدول العائلة اللغوية (2.0 نقطة).',
					'تصريف الأفعال القياسية والشاذة في المستقبل البسيط (2.0 نقطة).',
					'توظيف الضمائر المباشرة وغير المباشرة مع المطابقة (1.5 نقطة).',
					'إتقان السوابق الصرفية أو جمع الأسماء التقنية أو تصحيح الأخطاء (1.5 نقطة).'
				],
				finalAnswer: v.pairs.map((p) => `${p.left} = ${p.right}`).join(' | ')
			};
		}
	},

	// 4. Competenza linguistica (7 pti) — drag_drop quiz + saveItalianSvgAsset
	{
		id: 'ita_tpl_2as_le_t3_ling_pronomi_connettivi',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'grammatica_sintassi',
		titleAr: 'II. Competenza linguistica : Pronomi diretti e indiretti, connettivi e struttura del testo (7 pti)',
		curriculumLessonId: 'ita_lesson_2as_le_t3_metodologia_produzione_scritta',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					svgSlug: 'ita_2as_t3_ling_pronomi_v0',
					svgContent: svgItalianGrammarMap({
						title: 'Pronomi diretti vs Pronomi indiretti',
						rootLabel: 'Sostituire un nome nella frase',
						rootSub: 'Chi / Che cosa (diretto) vs A chi (indiretto)',
						width: 560,
						branches: [
							{
								label: 'Diretti (3ª pers.)',
								rule: 'lo, la, li, le (senza prep.)',
								example: 'Leggo i testi -> Li leggo.'
							},
							{
								label: 'Accordo P. Pross.',
								rule: 'Obbligatorio con lo/la/li/le',
								example: 'Li ho letti. L’ho letta.'
							},
							{
								label: 'Indiretti (3ª pers.)',
								rule: 'gli (M e pl.) | le (F sing.)',
								example: 'Scrivo a Sara -> Le scrivo.'
							},
							{
								label: 'Nessun accordo',
								rule: 'Invariato con gli / le ind.',
								example: 'Le ho telefonato ieri.'
							}
						]
					}),
					svgCaption: 'Mappa contrastiva tra pronomi diretti e indiretti in italiano',
					classPrompt:
						'1. Classifica questi sei connettivi logici nella tabella secondo la loro funzione testuale (innanzitutto, tuttavia, in conclusione, inoltre, però, in sintesi) :',
					classCols: [
						{ header: 'Ordine e aggiunta', items: ['innanzitutto', 'inoltre'], mark: '0.5' },
						{ header: 'Contrasto / Opposizione', items: ['tuttavia', 'però'], mark: '0.5' },
						{ header: 'Conclusione', items: ['in conclusione', 'in sintesi'], mark: '0.5' }
					],
					q2: '2. Completa ogni dialogo con il pronome diretto o indiretto esatto (lo, la, li, le, gli) :\n  a) Hai scritto un’email a tuo cugino? — Sì, ............ ho scritto ieri sera.\n  b) Hai verificato le notizie su quel sito? — Sì, ............ ho verificate subito.\n  c) Parlate spesso con vostra madre delle lezioni? — Sì, ............ parliamo ogni giorno.\n  d) Quando comprerai il nuovo atlante? — ............ comprerò domani mattina.',
					a2: 'a) gli (a tuo cugino -> indiretto).\n  b) le (le notizie -> diretto F. pl. con accordo verificate).\n  c) le (a/con vostra madre -> indiretto F. sing.).\n  d) Lo (il nuovo atlante -> diretto M. sing.).',
					q3: '3. Collega ogni coppia di frasi usando il connettivo logico più adatto tra (Tuttavia, Pertanto, Poiché, Inoltre) :\n  a) ............ gli alberi purificano l’aria, dobbiamo proteggere tutti i boschi.\n  b) Le fonti digitali sono rapidissime. ............ , bisogna sempre controllarne l’autore.\n  c) Karim ha studiato con impegno e metodo; ............ , ha ottenuto un ottimo voto.\n  d) La biblioteca offre libri utili; ............ , organizza incontri di lettura ogni giovedì.',
					a3: 'a) Poiché.\n  b) Tuttavia.\n  c) pertanto.\n  d) inoltre.',
					q4: '4. Riscrivi le frasi posizionando il pronome unito all’infinito oppure davanti al verbo modale :\n  a) Dobbiamo rispettare la natura -> Dobbiamo rispettar............ / ............ dobbiamo rispettare.\n  b) Posso aiutare i miei compagni -> Posso aiutar............ / ............ posso aiutare.',
					a4: 'a) Dobbiamo rispettarla / La dobbiamo rispettare.\n  b) Posso aiutarli / Li posso aiutare.',
					ddStem: 'Classifica ciascuna frase secondo il tipo di pronome utilizzato («diretto» oppure «indiretto»):',
					ddCategories: ['Pronome diretto (chi / che cosa)', 'Pronome indiretto (a chi)'],
					ddItems: [
						{ text: 'Compro i libri e li leggo subito.', category: 0 },
						{ text: 'Ho visto mia zia e l’ho salutata.', category: 0 },
						{ text: 'Telefono a mio fratello e gli chiedo un libro.', category: 1 },
						{ text: 'Scrivo a mia sorella e le mando gli auguri.', category: 1 }
					]
				},
				{
					svgSlug: 'ita_2as_t3_ling_pronomi_v1',
					svgContent: svgItalianWritingBlueprint({
						title: 'Struttura e Connettivi del Testo (2AS LE)',
						width: 560,
						steps: [
							{
								stage: 'Introduzione',
								detail: 'Presentazione chiara del tema (Poiché / Oggi...)'
							},
							{
								stage: 'Svolgimento 1',
								detail: 'Primo argomento ordinato (Innanzitutto, In primo luogo)'
							},
							{
								stage: 'Svolgimento 2',
								detail: 'Aggiunta o contrasto (Inoltre / Tuttavia, Però)'
							},
							{
								stage: 'Conclusione',
								detail: 'Sintesi finale e proposta (Pertanto, In conclusione)'
							}
						]
					}),
					svgCaption: 'Struttura metodologica e connettivi logici per la produzione scritta',
					classPrompt:
						'1. Classifica queste sei espressioni nei tre campi lessicali della tabella (raccolta differenziata, fonti affidabili, sicurezza dei dati, energia eolica, libro cartaceo, rimboschimento) :',
					classCols: [
						{ header: 'Tutela ambientale', items: ['raccolta differenziata', 'energia eolica', 'rimboschimento'], mark: '0.5' },
						{ header: 'Lettura e ricerca', items: ['libro cartaceo', 'fonti affidabili'], mark: '0.5' },
						{ header: 'Sicurezza digitale', items: ['sicurezza dei dati'], mark: '0.5' }
					],
					q2: '2. Completa con i pronomi diretti o indiretti (mi, ti, ci, vi, lo, la, gli, le) e accorda il participio dove necessario :\n  a) Ragazzi, se avete dubbi, il professore ............ aiuterà volentieri (voi).\n  b) Dove hai messo le schede di italiano? — ............ ho lasciate sulla scrivania.\n  c) Quando incontro i miei zii, ............ porto sempre dei datteri freschi (a loro).\n  d) Nadia ha preparato una bella presentazione e ............ ha mostrata alla classe.',
					a2: 'a) vi.\n  b) Le (lasciate).\n  c) gli (a loro -> gli).\n  d) l’ (la presentazione -> mostrata).',
					q3: '3. Sostituisci le ripetizioni con un connettivo logico preciso (In primo luogo, Perciò, Nonostante ciò, In sintesi) :\n  a) Pioveva molto forte. ............ , i volontari hanno ripulito il cortile del liceo.\n  b) ............ , dobbiamo verificare la sicurezza dei dati prima di usare un nuovo sito.\n  c) Non hai portato il dizionario; ............ , lavorerai in coppia con il tuo compagno.\n  d) ............ , la lettura e il rispetto delle regole costruiscono cittadini consapevoli.',
					a3: 'a) Nonostante ciò.\n  b) In primo luogo.\n  c) perciò.\n  d) In sintesi.',
					q4: '4. Trasforma i tre aggettivi in sostantivi astratti e inseriscili in brevi frasi o definizioni :\n  responsabile -> ............ ; sostenibile -> ............ ; sicuro -> ............ .',
					a4: 'responsabilità ; sostenibilità ; sicurezza. (Es.: La sicurezza dei dati è fondamentale in rete.)',
					ddStem: 'Classifica i connettivi logici italiani secondo la loro funzione nel testo:',
					ddCategories: ['Causa o Conseguenza', 'Ordine, Contrasto o Conclusione'],
					ddItems: [
						{ text: 'Poiché / Siccome (causa)', category: 0 },
						{ text: 'Pertanto / Quindi (conseguenza)', category: 0 },
						{ text: 'Tuttavia / Però (contrasto)', category: 1 },
						{ text: 'In conclusione / Infine (chiusura)', category: 1 }
					]
				},
				{
					svgSlug: 'ita_2as_t3_ling_pronomi_v2',
					svgContent: svgItalianGrammarMap({
						title: 'Accordo con i Pronomi Diretti al Passato',
						rootLabel: 'Pronome diretto + Passato Prossimo',
						rootSub: 'Con lo / la / li / le il participio concorda sempre',
						width: 560,
						branches: [
							{
								label: 'LO -> -O / L’',
								rule: 'Maschile singolare',
								example: 'Il libro -> L’ho letto.'
							},
							{
								label: 'LA -> -A / L’',
								rule: 'Femminile singolare',
								example: 'La rivista -> L’ho letta.'
							},
							{
								label: 'LI -> -I',
								rule: 'Maschile plurale',
								example: 'I giornali -> Li ho letti.'
							},
							{
								label: 'LE -> -E',
								rule: 'Femminile plurale',
								example: 'Le lettere -> Le ho lette.'
							}
						]
					}),
					svgCaption: 'Regola dell’accordo del participio passato con i pronomi diretti',
					classPrompt:
						'1. Classifica queste sei frasi nella tabella secondo la struttura usata (L’ho letta, Gli ho scritto, Scegliere con cura, Li ho comprati, Le ho telefonato, Dobbiamo studiare) :',
					classCols: [
						{ header: 'Pronome diretto + P. Pross.', items: ['L’ho letta', 'Li ho comprati'], mark: '0.5' },
						{ header: 'Pronome indiretto + P. Pross.', items: ['Gli ho scritto', 'Le ho telefonato'], mark: '0.5' },
						{ header: 'Dovere / Infinito', items: ['Scegliere con cura', 'Dobbiamo studiare'], mark: '0.5' }
					],
					q2: '2. Rispondi alle domande usando il pronome diretto corretto e il participio passato accordato :\n  a) Avete visitato la biblioteca comunale ieri? — Sì, ............ abbiamo visitat............ .\n  b) Hai spedito gli inviti ai compagni? — Sì, ............ ho spedit............ stamattina.\n  c) Avete raccolto le bottiglie di plastica nel cortile? — Sì, ............ abbiamo raccolt............ .\n  d) Hai finito il riassunto di scienze? — Sì, ............ ho finit............ un’ora fa.',
					a2: 'a) l’ / visitata.\n  b) li / spediti.\n  c) le / raccolte.\n  d) l’ / finito.',
					q3: '3. Inserisci le formule adatte per una lettera formale o amichevole e completa i due connettivi :\n  a) Saluto iniziale per una lettera amichevole : «............ Marco, come stai?»\n  b) Saluto finale per un professore : «............ saluti, Karim.»\n  c) Completa : «............ il tempo è poco, organizzeremo il lavoro in gruppo; ............ consegneremo tutto in orario.»',
					a3: 'a) Caro / Ciao.\n  b) Cordiali / Distinti.\n  c) Poiché (o Siccome) / pertanto (o così).',
					q4: '4. Trova il sinonimo e il contrario nel registro educativo :\n  a) Sinonimo di «serio e degno di fiducia» (riferito a una fonte) = ............\n  b) Contrario di «inquinamento» = ............ ; Contrario di «disordine» = ............ .',
					a4: 'a) affidabile / autorevole.\n  b) tutela / pulizia ; ordine.',
					ddStem: 'Classifica ciascuna risposta secondo l’accordo esatto del participio con il pronome diretto o indiretto:',
					ddCategories: ['Accordo corretto', 'Errore di accordo'],
					ddItems: [
						{ text: 'Ho comprato le mele e le ho mangiate.', category: 0 },
						{ text: 'Ho scritto a Sara e le ho raccontato tutto.', category: 0 },
						{ text: 'Ho comprato le mele e le ho mangiato.', category: 1 },
						{ text: 'Ho scritto a Sara e le ho raccontata tutto.', category: 1 }
					]
				}
			];

			const v = rng.pick(variants);
			const svgPath = saveItalianSvgAsset(v.svgSlug, v.svgContent);

			const content: ContentBlock[] = [
				{
					type: 'image',
					src: svgPath,
					width: '76%',
					caption: v.svgCaption
				},
				{ type: 'text', content: v.classPrompt, mark: '' },
				buildItalianClassificationTableBlock({ columns: v.classCols }),
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
					questionTextAr: 'صنف العبارات الآتية بسحب كل منها إلى الفئة المناسبة:',
					questionData: {
						categories: v.ddCategories,
						items: rng.shuffle(v.ddItems)
					},
					explanation:
						'الضمير المباشر (lo/la/li/le) يعوّض مفعولاً مباشراً ويفرض مطابقة اسم المفعول؛ أما الضمير غير المباشر (gli/le) فيعوّض «a + شخص» ولا يغير اسم المفعول؛ والروابط المنطقية تنظم الحجاج بدقة.'
				},
				sujetExercise: {
					customTitle: 'II. Competenza linguistica',
					points: 7,
					instruction: 'Svolgi con attenzione gli esercizi su pronomi, connettivi e lessico :',
					content
				},
				hints: [
					'تذكر الفرق الحاسم بين `le` المباشرة (للجمع المؤنث -> تطابق: le ho lette) و `le` غير المباشرة (للمفرد المؤنث -> لا تطابق: le ho scritto).',
					'لتعويض «a loro» في الإيطالية المعاصرة نستعمل الضمير غير المباشر `gli` (Gli ho chiesto).',
					'تجنب البدء بـ `Perché` في الجملة السببية واستعمل `Poiché` أو `Siccome`.'
				],
				solutionStepsAr: [
					'تصنيف العناصر في الجدول الثلاثي (1.5 نقطة).',
					'ضبط الضمائر المباشرة وغير المباشرة ومطابقة اسم المفعول (2.0 نقطة).',
					'الربط المنطقي الدقيق بالروابط النصية (2.0 نقطة).',
					'تحويل الاشتقاق أو تركيب الضمير أو إيجاد المترادفات والأضداد (1.5 نقطة).'
				],
				finalAnswer: v.ddItems.map((it) => `${it.text} : ${v.ddCategories[it.category]}`).join(' | ')
			};
		}
	},

	// 5. Produzione scritta (6 pti, integration) — ordering quiz
	{
		id: 'ita_tpl_2as_le_t3_writ_ambiente_futuro',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'produzione_scritta',
		titleAr: 'III. Produzione scritta : Tutela dell’ambiente e progetti ecologici futuri (6 pti)',
		curriculumLessonId: 'ita_lesson_2as_le_t3_natura_tutela_ambiente',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					tracciaUnoPrompt:
						'Scrivi un articolo per il giornalino scolastico (100-130 parole) invitando gli studenti a proteggere la natura e a promuovere la raccolta differenziata e il risparmio dell’acqua al liceo.',
					tracciaUnoPunti: [
						'Introduzione chiara sul problema dei rifiuti plastici e dello spreco idrico.',
						'Proposte pratiche per il liceo usando il Futuro Semplice (pianteremo, separeremo, risparmieremo) e verbi modali.',
						'Uso ordinato di connettivi logici (Innanzitutto, Inoltre, Tuttavia, In conclusione).',
						'Chiusura motivante sul futuro di una città pulita e verde.'
					],
					tracciaDuePrompt:
						'Scrivi un’email a un compagno di un altro liceo (100-130 parole) raccontando un’iniziativa ecologica che la tua classe organizzerà il mese prossimo.',
					modelAnswer:
						'La tutela dell’ambiente riguarda ogni studente responsabile, dentro e fuori dal liceo. Spesso notiamo bottiglie di plastica abbandonate nei cortili o rubinetti lasciati aperti senza attenzione.\n\nInnanzitutto, nella nostra scuola possiamo cambiare queste abitudini con gesti concreti: il mese prossimo installeremo contenitori colorati per la raccolta differenziata di carta, plastica e vetro. Inoltre, controlleremo ogni giorno i rubinetti per risparmiare l’acqua e pianteremo nuovi alberi vicino al cancello. Tuttavia, questi progetti riusciranno soltanto se tutti collaboreremo con costanza.\n\nIn conclusione, proteggere oggi la natura con piccoli gesti ci assicurerà domani un quartiere più sano, pulito e accogliente.',
					rubricSummary:
						'Sviluppo completo in tre parti e pertinenza ambientale (2.0 pti) | Precisione sul Futuro Semplice, modali e connettivi (2.0 pti) | Ricchezza lessicale e correttezza ortografica (2.0 pti)',
					orderedSteps: [
						'La tutela dell’ambiente è una responsabilità condivisa da ogni studente consapevole.',
						'Innanzitutto, il mese prossimo avvieremo nel liceo la raccolta differenziata di carta e plastica.',
						'Inoltre, risparmieremo l’acqua ogni giorno e pianteremo nuovi alberi nel cortile.',
						'In conclusione, questi gesti responsabili garantiranno un ambiente più pulito per il futuro.'
					],
					orderExplanation:
						'يتبع المقال البنية المنهجية: المقدمة التمهيدية -> الفكرة الأولى بالترتيب (Innanzitutto) -> الإضافة (Inoltre) -> الخاتمة المستقبلية (In conclusione).'
				},
				{
					tracciaUnoPrompt:
						'Redigi un testo espositivo-argomentativo (100-130 parole) sull’importanza delle energie rinnovabili (energia solare ed eolica) e del rimboschimento per il futuro dell’Algeria.',
					tracciaUnoPunti: [
						'Limiti e inquinamento dei combustibili tradizionali rispetto alle energie pulite.',
						'Vantaggi del sole e del vento insieme a progetti di rimboschimento come la Diga Verde.',
						'Impiego del Futuro Semplice e di almeno due pronomi diretti o indiretti.',
						'Conclusione sul ruolo dell’educazione scientifica nella protezione della terra.'
					],
					tracciaDuePrompt:
						'Descrivi il tuo quartiere ideale tra vent’anni (100-130 parole): spazi verdi, trasporti puliti, biblioteche e solidarietà tra vicini.',
					modelAnswer:
						'Il futuro energetico del nostro pianeta richiede scelte coraggiose e rispettose della natura. Poiché i combustibili fossili aumentano l’inquinamento atmosferico, oggi molti paesi investono con decisione nelle energie rinnovabili.\n\nIn Algeria, il clima offre una grande risorsa naturale: l’energia solare fotovoltaica e le pale eoliche permetteranno di produrre elettricità pulita senza danneggiare l’aria né sprecare acqua. Inoltre, i programmi di rimboschimento come la Diga Verde proteggeranno i terreni fertili dall’avanzata del deserto, e i giovani scienziati li miglioreranno con nuove ricerche.\n\nIn sintesi, unire il progresso tecnico alla responsabilità ecologica renderà il nostro paese più verde e sostenibile.',
					rubricSummary:
						'Chiarezza espositiva e sviluppo dei quattro punti (2.0 pti) | Uso esatto di Futuro Semplice, pronomi e connettivi causali (2.0 pti) | Lessico ecologico preciso e ortografia (2.0 pti)',
					orderedSteps: [
						'Poiché i combustibili tradizionali inquinano l’aria, bisogna sviluppare energie rinnovabili pulite.',
						'Innanzitutto, i pannelli solari e le pale eoliche produrranno elettricità senza danneggiare la natura.',
						'Inoltre, il rimboschimento proteggerà le terre fertili dal rischio della desertificazione.',
						'Pertanto, ricerca scientifica ed educazione ecologica costruiranno un futuro sostenibile.'
					],
					orderExplanation:
						'يبدأ النص بالتعليل السببي (Poiché) ثم الطاقة المتجددة فالتشجير ويختم بالنتيجة المنطقية (Pertanto).'
				},
				{
					tracciaUnoPrompt:
						'Scrivi una lettera formale al preside del tuo liceo (100-130 parole) per proporre una giornata verde di pulizia, giardinaggio e sensibilizzazione ambientale nel cortile scolastico.',
					tracciaUnoPunti: [
						'Formula di apertura formale e presentazione chiara dello scopo della lettera.',
						'Programma delle attività future (Futuro Semplice: ripuliremo, pianteremo, prepareremo cartelloni).',
						'Benefici educativi per gli studenti e collaborazione tra classi.',
						'Formula di chiusura cortese e formale.'
					],
					tracciaDuePrompt:
						'Racconta in 100-130 parole un gesto concreto che hai compiuto recentemente (al Passato Prossimo) per risparmiare acqua o riciclare materiali a casa o a scuola.',
					modelAnswer:
						'Gentile Preside,\nle scriviamo a nome degli studenti del secondo anno di Lingue Straniere per proporre l’organizzazione di una giornata verde nel nostro liceo durante la prossima settimana.\n\nPoiché desideriamo rendere più accoglienti i nostri spazi comuni, abbiamo preparato un programma ordinato. Innanzitutto, ripuliremo il cortile e sistemeremo nuovi contenitori per la raccolta differenziata. Inoltre, pianteremo dieci giovani alberi lungo il viale d’ingresso e realizzeremo cartelloni bilingui sul risparmio dell’acqua. Tutti i compagni vi parteciperanno con serietà dopo l’orario delle lezioni.\n\nSperiamo che questa proposta incontri il Suo favore e Le porgiamo i nostri più cordiali saluti.',
					rubricSummary:
						'Rispetto del formato della lettera formale e tono cortese (2.0 pti) | Precisione su Futuro Semplice, pronomi formali e connettivi (2.0 pti) | Coesione, punteggiatura e ortografia (2.0 pti)',
					orderedSteps: [
						'Gentile Preside, le scriviamo per proporre una giornata verde nel cortile del liceo.',
						'Innanzitutto, organizzeremo la pulizia degli spazi e installeremo contenitori per il riciclaggio.',
						'Inoltre, pianteremo nuovi alberi e prepareremo schede educative sul risparmio idrico.',
						'Speriamo che accolga questa iniziativa e Le porgiamo cordiali saluti.'
					],
					orderExplanation:
						'تلتزم الرسالة الرسمية بالتحية وطرح الهدف ثم خطة العمل المستقبلية بالروابط وتختم بعبارة التقدير والاحترام.'
				}
			];

			const v = rng.pick(variants);
			const scrambled = scrambleOrdering(v.orderedSteps, rng);

			const block = buildItalianWrittenProductionBlock({
				tracciaUnoTitle: 'Traccia 1 (Guidata) :',
				tracciaUnoPrompt: v.tracciaUnoPrompt,
				tracciaUnoPunti: v.tracciaUnoPunti,
				tracciaDuePrompt: v.tracciaDuePrompt,
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
					questionText: 'Metti in ordine logico le quattro frasi seguenti per formare un testo coerente sull’ambiente:',
					questionTextAr: 'رتب الجمل الأربع الآتية لتكوين نص إيطالي متناسق حول البيئة:',
					questionData: {
						items: scrambled.items,
						correctOrder: scrambled.correctOrder
					},
					explanation: v.orderExplanation
				},
				sujetExercise: {
					customTitle: 'III. Produzione scritta',
					points: 6,
					instruction: 'Scegli UNA delle due tracce e scrivi un testo ben strutturato (100-130 parole) :',
					content: [block]
				},
				hints: [
					'احترم البنية الثلاثية: Introduzione -> Svolgimento -> Conclusione (100 إلى 130 كلمة).',
					'وظف المستقبل البسيط للمشاريع القادمة والروابط المنطقية (Innanzitutto, Inoltre, Tuttavia, In conclusione).',
					'انتبه لعدم استعمال * أو رموز غير سليمة وراجع النبرة على -ò / -à في المستقبل.'
				],
				solutionStepsAr: [
					'استيفاء الموضوع المختار وتغطية جميع النقاط التوجيهية (2.0 نقطة).',
					'سلامة التصريف في المستقبل البسيط والضمائر والروابط المنطقية (2.0 نقطة).',
					'وضوح الأسلوب والإملاء وتنظيم الفقرات (2.0 نقطة).'
				],
				finalAnswer: v.orderedSteps.join(' / ')
			};
		}
	},

	// 6. Produzione scritta (6 pti, integration) — cloze quiz
	{
		id: 'ita_tpl_2as_le_t3_writ_lettura_digitale_scrittura',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'produzione_scritta',
		titleAr: 'III. Produzione scritta : Lettura, uso responsabile del digitale e metodologia (6 pti)',
		curriculumLessonId: 'ita_lesson_2as_le_t3_lettura_tecnologia_responsabile',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					tracciaUnoPrompt:
						'Scrivi un tema espositivo-argomentativo (100-130 parole) sull’equilibrio tra lettura su carta e strumenti digitali nello studio di uno studente di 2AS LE.',
					tracciaUnoPunti: [
						'Introduzione sull’ampia diffusione dei computer e delle risorse digitali tra i giovani.',
						'Vantaggi della tecnologia seria (dizionari, archivi) e ruolo insostituibile del libro cartaceo per la concentrazione.',
						'Impiego preciso di connettivi (Innanzitutto, Tuttavia, Pertanto, In conclusione) e di almeno due pronomi diretti o indiretti.',
						'Conclusione pratica con una regola quotidiana equilibrata.'
					],
					tracciaDuePrompt:
						'Redigi una breve guida di sicurezza digitale (100-130 parole) spiegando ai compagni come proteggere i propri dati personali e verificare l’affidabilità delle informazioni online.',
					modelAnswer:
						'Oggi gli strumenti digitali accompagnano ogni giornata scolastica degli studenti di Lingue Straniere. Con un computer o un tablet possiamo accedere rapidamente a dizionari bilingui, enciclopedie e testi di scienze.\n\nInnanzitutto, la tecnologia facilita la ricerca quando la usiamo con serietà e spirito critico. Tuttavia, leggere soltanto su uno schermo provoca spesso stanchezza visiva e distrazione continua. Al contrario, il libro cartaceo resta fondamentale per allenare la memoria e la riflessione calma: quando trovo un buon volume in biblioteca, lo leggo sempre prendendo appunti a mano.\n\nIn conclusione, l’equilibrio tra ricerca digitale responsabile e lettura quotidiana su carta ci aiuterà a studiare con maggiore profondità.',
					rubricSummary:
						'Pertinenza argomentativa ed equilibrio tra i due aspetti (2.0 pti) | Controllo di connettivi, pronomi e tempi verbali (2.0 pti) | Lessico appropriato e assenza di errori ortografici (2.0 pti)',
					clozeSentence: 'Quando trovi un buon libro educativo in biblioteca, ___ leggi con molta calma e prendi appunti.',
					clozeCorrect: 'lo',
					clozeDistractors: ['gli', 'le', 'la'],
					clozeExplanation:
						'«un buon libro educativo» مفعول به مباشر مفرد مذكر، فيعوضه الضمير المباشر `lo`.'
				},
				{
					tracciaUnoPrompt:
						'Scrivi una lettera amichevole a un compagno di classe (100-130 parole) per consigliargli un buon metodo di preparazione all’esame finale di italiano, usando connettivi e Futuro Semplice.',
					tracciaUnoPunti: [
						'Apertura affettuosa e incoraggiamento sereno prima delle verifiche finali.',
						'Consigli concreti: ripassare i verbi al Presente, Passato Prossimo e Futuro, controllare gli accordi e leggere ad alta voce.',
						'Uso chiaro della struttura in tre tappe per la produzione scritta (introduzione, svolgimento, conclusione).',
						'Chiusura cordiale con auguri di buon lavoro.'
					],
					tracciaDuePrompt:
						'Presenta il tuo libro o articolo divulgativo preferito letto quest’anno scolastico (100-130 parole), spiegandone il tema principale e ciò che hai imparato.',
					modelAnswer:
						'Caro Yassin, come stai? Mancano poche settimane alla fine dell’anno scolastico e ti scrivo per condividere un metodo semplice che ti aiuterà a preparare bene l’esame di italiano.\n\nInnanzitutto, rivedremo insieme le tavole dei verbi al Presente, al Passato Prossimo e al Futuro Semplice, prestando particolare attenzione agli ausiliari e ai pronomi diretti. Inoltre, per la produzione scritta dovremo sempre dividere il testo in introduzione, svolgimento e conclusione, collegando le idee con connettivi chiari come tuttavia e pertanto. Infine, ti consiglio di leggere ogni sera un testo breve e di verificarne i vocaboli sul dizionario.\n\nSono sicuro che con calma e costanza otterremo ottimi risultati. Un caro saluto!',
					rubricSummary:
						'Tono amichevole e utilità metodologica dei consigli (2.0 pti) | Uso corretto di Futuro Semplice, pronomi e connettivi (2.0 pti) | Coesione, ortografia e punteggiatura (2.0 pti)',
					clozeSentence: 'Prima di citare una notizia letta su un sito web, dobbiamo sempre verificarne l’___ delle fonti.',
					clozeCorrect: 'affidabilità',
					clozeDistractors: ['inquinamento', 'evaporazione', 'partenza'],
					clozeExplanation:
						'المصطلح المعجمي الدقيق في المجال الرقمي هو «affidabilità delle fonti» (موثوقية المصادر).'
				},
				{
					tracciaUnoPrompt:
						'Racconta in 100-130 parole quali competenze hai acquisito quest’anno in 2AS LE di italiano e quali obiettivi ti proponi per il terzo anno (BAC).',
					tracciaUnoPunti: [
						'Bilancio dei progressi compiuti al Passato Prossimo (ho imparato, abbiamo letto, ho migliorato).',
						'Argomenti preferiti tra vita quotidiana, alimentazione sana, geografia mediterranea e ambiente.',
						'Progetti per l’anno prossimo al Futuro Semplice (approfondirò, scriverò, leggerò).',
						'Conclusione fiduciosa sul valore dello studio serio delle lingue straniere.'
					],
					tracciaDuePrompt:
						'Scrivi un breve saggio (100-130 parole) sul ruolo delle biblioteche scolastiche e della lettura scientifica nella formazione di cittadini onesti e informati.',
					modelAnswer:
						'Questo secondo anno di Lingue Straniere è stato per me un percorso davvero arricchente. All’inizio conoscevo poche parole di italiano, ma grazie allo studio costante ho fatto molti progressi.\n\nDurante i tre trimestri ho imparato a descrivere la vita scolastica, a raccontare viaggi nel Mediterraneo con il Passato Prossimo e a riflettere sull’alimentazione sana e sulla tutela dell’ambiente. Inoltre, gli esercizi di scrittura mi hanno insegnato a organizzare le idee con connettivi logici e a evitare le distrazioni digitali.\n\nL’anno prossimo frequenterò il terzo anno e lavorerò con ancora più metodo: leggerò articoli più lunghi e curerò ogni dettaglio grammaticale per prepararmi serenamente alle sfide future.',
					rubricSummary:
						'Coerenza del bilancio personale e chiarezza espressiva (2.0 pti) | Padronanza integrata di Passato Prossimo, Imperfetto e Futuro (2.0 pti) | Lessico vario, sintassi e ortografia (2.0 pti)',
					clozeSentence: '___ il libro cartaceo aiuta la concentrazione profonda, gli insegnanti consigliano di leggere ogni giorno.',
					clozeCorrect: 'Poiché',
					clozeDistractors: ['Tuttavia', 'In sintesi', 'Infine'],
					clozeExplanation:
						'لتقديم السبب في بداية الجملة نستعمل الرابط السببي `Poiché` (بما أن).'
				}
			];

			const v = rng.pick(variants);
			const clozeOptions = rng.shuffle([v.clozeCorrect, ...v.clozeDistractors]);
			const clozeCorrectIndex = clozeOptions.indexOf(v.clozeCorrect);

			const block = buildItalianWrittenProductionBlock({
				tracciaUnoTitle: 'Traccia 1 (Guidata) :',
				tracciaUnoPrompt: v.tracciaUnoPrompt,
				tracciaUnoPunti: v.tracciaUnoPunti,
				tracciaDuePrompt: v.tracciaDuePrompt,
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
					questionText: 'Completa la frase con la parola o il connettivo più adeguato:',
					questionTextAr: 'أكمل الجملة الإيطالية بالكلمة أو الرابط الأنسب:',
					questionData: {
						sentence: v.clozeSentence,
						options: clozeOptions,
						correctIndex: clozeCorrectIndex
					},
					explanation: v.clozeExplanation
				},
				sujetExercise: {
					customTitle: 'III. Produzione scritta',
					points: 6,
					instruction: 'Scegli UNA delle due tracce proposte e redigi un testo coerente e curato (100-130 parole) :',
					content: [block]
				},
				hints: [
					'قسّم موضوعك بوضوح إلى مقدمة وعرض وخاتمة مع توظيف الروابط المنطقية المناسبة.',
					'إذا كتبت رسالة فاحرص على صيغة التحية في البداية وعبارة الختام في النهاية.',
					'راجع قبل التسليم: تطابق الفعل مع الفاعل، الضمائر المباشرة وغير المباشرة، والنبرة على أفعال المستقبل.'
				],
				solutionStepsAr: [
					'تحديد الموضوع والالتزام بكل عناصره المطلوبة (2.0 نقطة).',
					'توظيف القواعد والضمائر والأزمنة والروابط بدقة (2.0 نقطة).',
					'سلامة الإملاء والترقيم وتماسك الفقرات (2.0 نقطة).'
				],
				finalAnswer: v.clozeCorrect
			};
		}
	}
];
