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
	svgItalianConjugationChart,
	svgItalianGrammarMap,
	svgItalianTenseTimeline
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

export const TEMPLATES_2AS_LE_T2: ItalianParameterizedTemplate[] = [
	// 1. Comprensione del testo (7 pti) — true_false quiz
	{
		id: 'ita_tpl_2as_le_t2_comp_alimentazione_sana',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'comprensione_testo',
		titleAr: 'I. Comprensione del testo : Alimentazione sana mediterranea, sport e buone abitudini (7 pti)',
		curriculumLessonId: 'ita_lesson_2as_le_t2_alimentazione_sana_sport',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					passageTitle: 'La dieta mediterranea genuina: salute sulle due rive',
					paragraphs: [
						'L’alimentazione mediterranea tradizionale rappresenta uno dei modelli nutrizionali più equilibrati del mondo. Sia in Algeria sia nell’Italia meridionale, la cucina familiare valorizza prodotti naturali e leciti: l’olio d’oliva extravergine, il grano integrale, i legumi, le verdure fresche di stagione, i datteri e molta acqua pura.',
						'Molti medici scolastici ricordano agli studenti che una colazione sana migliora la memoria e la concentrazione in aula. Mangiare pane fatto in casa con un filo d’olio d’oliva, del miele e [[un frutto fresco]] dà energia costante senza appesantire l’organismo, a differenza degli snack troppo zuccherati.',
						'Naturalmente, il cibo sano funziona ancora meglio se è accompagnato da un’attività fisica regolare. Camminare ogni giorno, praticare il nuoto o fare escursioni nella natura aiuta i giovani a crescere forti e a mantenere [[questo equilibrio prezioso]] tutto l’anno.'
					],
					source: 'Quaderno di Educazione Alimentare Mediterranea (testo adattato)',
					glossary: [
						{ term: 'genuino', meaning: 'naturale, puro, privo di additivi artificiali' },
						{ term: 'appesantire', meaning: 'rendere lento e difficile il lavoro dello stomaco' }
					],
					q1: '1. Quali alimenti principali caratterizzano la dieta mediterranea descritta nel testo e perché una buona colazione è utile agli studenti?',
					a1: 'È caratterizzata da olio d’oliva extravergine, grano integrale, legumi, verdure fresche di stagione, datteri e molta acqua pura. Una buona colazione migliora la memoria e la concentrazione in aula dando energia costante.',
					tfItems: [
						{
							q: 'Secondo il §1, l’olio d’oliva e i legumi fanno parte dell’alimentazione mediterranea tradizionale.',
							a: 'Vero',
							c: 'La cucina familiare valorizza olio d’oliva, grano integrale, legumi, verdure, datteri e acqua pura (§1).',
							mark: '0.5'
						},
						{
							q: 'I medici consigliano agli alunni di sostituire la colazione con snack molto zuccherati.',
							a: 'Falso',
							c: 'Affermano che pane fatto in casa, olio d’oliva, miele e frutta danno energia senza appesantire, a differenza degli snack zuccherati (§2).',
							mark: '0.5'
						},
						{
							q: 'L’attività fisica regolare completa i benefici di un’alimentazione sana.',
							a: 'Vero',
							c: 'Camminare, nuotare o fare escursioni aiuta i giovani a crescere forti e mantenere l’equilibrio (§3).',
							mark: '0.5'
						}
					],
					q3: '3. Cerca nel testo :\n  a) Il sinonimo di «regolare / abituale» (§3) e il contrario di «artificiali» (§1).\n  b) Quattro parole appartenenti al campo lessicale dell’alimentazione sana.',
					a3: 'a) Sinonimo: «regolare»; Contrario di artificiali: «naturali» (o «genuina»). | b) Alimentazione: olio d’oliva, grano, legumi, verdure, datteri, acqua, pane, miele, frutto.',
					q4: '4. A che cosa si riferiscono le espressioni sottolineate «un frutto fresco» (§2) e «questo equilibrio prezioso» (§3)?',
					a4: '«un frutto fresco» indica un alimento naturale consigliato per la colazione insieme a pane, olio d’oliva e miele; «questo equilibrio prezioso» si riferisce all’armonia tra alimentazione sana e attività fisica regolare.',
					quizStatement:
						'Secondo il testo, abbinare cibi naturali come olio d’oliva, cereali e verdure a uno sport regolare favorisce la crescita e la concentrazione scolastica.',
					quizCorrect: true,
					quizExplanation:
						'العبارة صحيحة: يوضح النص أن الجمع بين التغذية المتوسطية الطبيعية (زيت الزيتون والحبوب والخضر) والنشاط الرياضي المنتظم يقوي النمو والتركيز.'
				},
				{
					passageTitle: 'Come ho cambiato le mie abitudini alimentari e sportive',
					paragraphs: [
						'Fino all’anno scorso, Yassin saltava spesso la colazione prima di uscire per il liceo e, durante la ricreazione, comprava soltanto biscotti industriali e bibite troppo dolci. Di conseguenza, verso mezzogiorno si sentiva sempre stanco e faticava a seguire le spiegazioni dell’insegnante.',
						'Un giorno, dopo una lezione di scienze sull’igiene di vita, Yassin ha deciso di cambiare abitudini. Ha cominciato a svegliarsi venti minuti prima per bere un bicchiere di latte caldo con pane integrale, miele e datteri. A pranzo ha scelto piatti semplici cucinati dalla madre con ceci, verdure e [[pesce fresco]].',
						'Inoltre, tre volte alla settimana ha iniziato ad allenarsi nella squadra di atletica del quartiere. In pochi mesi Yassin è diventato più resistente, più sereno e più attento in classe: [[quel cambiamento]] ha trasformato positivamente tutta la sua giornata.'
					],
					source: 'Storie di salute giovanile (testo adattato)',
					glossary: [
						{ term: 'saltare un pasto', meaning: 'non mangiare uno dei pasti principali della giornata' },
						{ term: 'resistente', meaning: 'che sopporta bene la fatica fisica e mentale' }
					],
					q1: '1. Quale errore commetteva Yassin fino all’anno scorso e quali tre cambiamenti concreti ha introdotto nella sua vita?',
					a1: 'Errore: saltava la colazione e comprava biscotti industriali e bibite zuccherate, sentendosi stanco. Cambiamenti: 1) si sveglia prima per fare una colazione sana; 2) pranza con piatti casalinghi di ceci, verdure e pesce; 3) si allena tre volte alla settimana in atletica.',
					tfItems: [
						{
							q: 'L’anno scorso Yassin mangiava sempre pane integrale e datteri a colazione.',
							a: 'Falso',
							c: 'Saltava spesso la colazione e comprava biscotti industriali e bibite dolci (§1).',
							mark: '0.5'
						},
						{
							q: 'Una lezione di scienze sull’igiene di vita ha motivato Yassin a migliorare la propria alimentazione.',
							a: 'Vero',
							c: 'Dopo una lezione di scienze ha deciso di cambiare abitudini (§2).',
							mark: '0.5'
						},
						{
							q: 'Oggi Yassin si allena nella squadra di atletica e si sente più attento a scuola.',
							a: 'Vero',
							c: 'Si allena tre volte alla settimana ed è diventato più resistente, sereno e attento (§3).',
							mark: '0.5'
						}
					],
					q3: '3. Trova nel testo :\n  a) Il sinonimo di «riposato / tranquillo» (§3) e il contrario di «riposato / pieno di energia» (§1).\n  b) Due verbi all’Imperfetto nel §1 e due al Passato Prossimo nel §2.',
					a3: 'a) Sinonimo: «sereno»; Contrario di pieno di energia: «stanco». | b) Imperfetto (§1): saltava, comprava, si sentiva, faticava; Passato Prossimo (§2): ha deciso, ha cominciato, ha scelto.',
					q4: '4. A che cosa si riferiscono «pesce fresco» (§2) e «quel cambiamento» (§3)?',
					a4: '«pesce fresco» è uno degli alimenti sani cucinati dalla madre di Yassin per il pranzo; «quel cambiamento» si riferisce alla trasformazione delle abitudini alimentari e sportive di Yassin.',
					quizStatement:
						'Fino all’anno scorso Yassin si sentiva pieno di energia a mezzogiorno grazie alle bibite troppo dolci che comprava a ricreazione.',
					quizCorrect: false,
					quizExplanation:
						'العبارة خاطئة: تؤكد الفقرة الأولى أن تلك العادة السيئة كانت تجعله متعباً وعاجزاً عن المتابعة عند منتصف النهار.'
				},
				{
					passageTitle: 'Saper fare della tavola un momento di salute e tradizione',
					paragraphs: [
						'Tra la sponda algerina e quella italiana esistono molte somiglianze nell’arte della tavola semplice e sana. In molte case si prepara ancora il pane con semola di grano duro, si condiscono le insalate con olio d’oliva spremuto a freddo e si servono stoviglie di ceramica geometrica realizzate da abili artigiani.',
						'Mangiare seduti con la famiglia, senza fretta e senza guardare gli schermi, aiuta a digerire meglio e rafforza il dialogo tra genitori e figli. Anche una semplice merenda con arance, mandorle e [[una tazza di tè alla menta]] offre vitamine naturali e buon umore.',
						'Proteggere queste tradizioni alimentari e artigianali significa curare insieme la salute del corpo e il rispetto del lavoro onesto. Perciò, conservare [[le ricette genuine dei nostri nonni]] è un dono prezioso per il futuro.'
					],
					source: 'Rivista di cultura e artigianato mediterraneo (testo adattato)',
					glossary: [
						{ term: 'spremuto a freddo', meaning: 'estratto senza riscaldamento industriale per conservare le vitamine' },
						{ term: 'stoviglie', meaning: 'piatti, ciotole e contenitori usati a tavola' }
					],
					q1: '1. Quali somiglianze alimentari e artigianali avvicinano la sponda algerina e quella italiana secondo il §1?',
					a1: 'La preparazione del pane con semola di grano duro, il condimento delle insalate con olio d’oliva spremuto a freddo e l’uso di stoviglie di ceramica geometrica realizzate da abili artigiani.',
					tfItems: [
						{
							q: 'Il testo incoraggia a mangiare sempre in fretta davanti alla televisione.',
							a: 'Falso',
							c: 'Afferma che mangiare seduti in famiglia senza fretta e senza schermi aiuta a digerire meglio (§2).',
							mark: '0.5'
						},
						{
							q: 'Le arance e le mandorle sono indicate nel §2 come una merenda ricca di vitamine naturali.',
							a: 'Vero',
							c: 'Una merenda con arance, mandorle e tè alla menta offre vitamine naturali (§2).',
							mark: '0.5'
						},
						{
							q: 'Le tradizioni artigianali e culinarie dei nonni sono giudicate inutili per il futuro.',
							a: 'Falso',
							c: 'Il §3 definisce le ricette genuine dei nonni un dono prezioso per il futuro.',
							mark: '0.5'
						}
					],
					q3: '3. Cerca nel testo :\n  a) Il sinonimo di «affinità / punti in comune» (§1) e il contrario di «artificiali» (§2).\n  b) Tre parole appartenenti al campo dell’artigianato o della tavola.',
					a3: 'a) Sinonimo: «somiglianze»; Contrario di artificiali: «naturali» (o «genuine»). | b) Campo lessicale: tavola, pane, stoviglie, ceramica geometrica, artigiani, ricette.',
					q4: '4. A che cosa si riferiscono «una tazza di tè alla menta» (§2) e «le ricette genuine dei nostri nonni» (§3)?',
					a4: '«una tazza di tè alla menta» completa la merenda sana di arance e mandorle; «le ricette genuine dei nostri nonni» si riferisce alle preparazioni alimentari tradizionali e naturali tramandate in famiglia.',
					quizStatement:
						'Consumare i pasti insieme alla famiglia senza fretta e senza schermi migliora sia la digestione sia il dialogo familiare.',
					quizCorrect: true,
					quizExplanation:
						'العبارة صحيحة: تؤكد الفقرة الثانية أن تناول الطعام مع الأسرة بهدوء ودون شاشات يساعد على الهضم ويقوي الحوار.'
				}
			];

			const v = rng.pick(variants);
			const content: ContentBlock[] = [
				buildIllustratedFigureBlock('ita_06_alimentazione_sana_artigianato', {
					lang: 'it',
					mode: 'labeled',
					pins: [],
					width: '62%',
					maxHeight: 118,
					caption: 'Alimentazione sana mediterranea, olio d’oliva, cereali e artigianato'
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
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'true_false',
					questionText: v.quizStatement,
					questionTextAr: 'حدد صحة أو خطأ العبارة الآتية حسب النص:',
					questionData: {
						correctAnswer: v.quizCorrect
					},
					explanation: v.quizExplanation
				},
				sujetExercise: {
					customTitle: 'I. Comprensione del testo',
					points: 7,
					instruction: 'Osserva la tavola illustrata, leggi il testo con attenzione e rispondi alle domande :',
					content
				},
				hints: [
					'اربط معطيات اللوحة الغذائية (زيت الزيتون، الحبوب، الفواكه، الماء) بأفكار النص.',
					'علل دائماً عبارات Vero / Falso بجملة دقيقة من النص.',
					'انتبه إلى أزمنة الماضي (Imperfetto و Passato Prossimo) الواردة في النص.'
				],
				solutionStepsAr: [
					'الإجابة عن سؤال الفهم الرئيسي (2.0 نقطة).',
					'الحكم بالصواب والخطأ مع التعليل النصي (1.5 نقطة).',
					'استخراج المترادفات والأضداد والحقل المعجمي (2.0 نقطة).',
					'تحديد العائد النصي بدقة (1.5 نقطة).'
				],
				finalAnswer: v.quizCorrect ? 'Vero' : 'Falso'
			};
		}
	},

	// 2. Comprensione del testo (7 pti) — mcq quiz + Carta muta quiz mode (5 x 0.2 = 1.0 + 6.0 = 7.0!)
	{
		id: 'ita_tpl_2as_le_t2_comp_viaggio_mediterraneo',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'cultura_civilta',
		titleAr: 'I. Comprensione del testo : Un viaggio di studio nel Mediterraneo e carta muta (7 pti)',
		curriculumLessonId: 'ita_lesson_2as_le_t2_viaggi_geografia_mediterraneo',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					passageTitle: 'Un viaggio di studio nel Mediterraneo sulle tracce di Al-Idrisi',
					paragraphs: [
						'La primavera scorsa, un gruppo di studenti algerini di 2AS LE ha partecipato a uno scambio educativo tra Algeri e la Sicilia. Prima di partire da Algeri, gli alunni hanno studiato la geografia della penisola italiana, circondata dal Mar Mediterraneo e bagnata a est dal Mar Adriatico.',
						'Arrivati a Palermo, i ragazzi hanno visitato antiche biblioteche dove si conservano memorie del grande cartografo Al-Idrisi, che nel XII secolo disegnò mappe celebri del bacino mediterraneo. Mentre ammiravano [[i vecchi portolani]], l’insegnante spiegava quante parole italiane come dogana, tariffa e arsenale abbiano radici arabe.',
						'Durante il soggiorno, i giovani hanno scoperto che la Sicilia è un ponte storico tra l’Africa del Nord e l’Europa. Al ritorno in Algeria, ogni partecipante ha scritto una relazione ordinata su [[questa esperienza indimenticabile]].'
					],
					source: 'Diario di scambi mediterranei (testo adattato)',
					glossary: [
						{ term: 'portolano', meaning: 'antica carta marittima che descrive porti e coste' },
						{ term: 'soggiorno', meaning: 'permanenza temporanea in una città durante un viaggio' }
					],
					q1: '1. Qual era la destinazione del viaggio di studio e quale figura scientifica storica hanno scoperto gli studenti a Palermo?',
					a1: 'La destinazione era la Sicilia (Palermo), partendo da Algeri. Hanno scoperto il grande cartografo Al-Idrisi, che nel XII secolo disegnò mappe celebri del Mediterraneo.',
					mcGroups: [
						{
							header: 'a) Che cosa faceva l’insegnante mentre gli studenti osservavano i vecchi portolani?',
							options: [
								'Spiegava le radici arabe di parole come dogana e tariffa',
								'Prenotava soltanto i biglietti di ritorno',
								'Insegnava esclusivamente fisica nucleare'
							],
							correct: 'Spiegava le radici arabe di parole come dogana e tariffa',
							mark: '1.0'
						},
						{
							header: 'b) Perché nella frase «Arrivati a Palermo» il viaggio usa «in Sicilia» ma «a Palermo»?',
							options: [
								'Perché Palermo è una città (a) mentre la Sicilia è una grande isola (in)',
								'Perché Palermo è più grande dell’intera Italia',
								'Perché in italiano tutte le città usano sempre «in»'
							],
							correct: 'Perché Palermo è una città (a) mentre la Sicilia è una grande isola (in)',
							mark: '1.0'
						}
					],
					q3: '3. Cerca nel testo :\n  a) Il sinonimo di «famosa / illustre» (§2) e il contrario di «partenza» (§3).\n  b) Tre parole appartenenti al campo lessicale della geografia e dei viaggi.',
					a3: 'a) Sinonimo: «celebri» (celebre); Contrario di partenza: «ritorno». | b) Geografia e viaggi: penisola, mare, mappe, soggiorno, porti/portolani.',
					q4: '4. A che cosa si riferiscono «i vecchi portolani» (§2) e «questa esperienza indimenticabile» (§3)?',
					a4: '«i vecchi portolani» si riferisce alle mappe e carte storiche conservate nelle biblioteche legate a Al-Idrisi; «questa esperienza indimenticabile» indica lo scambio educativo e il viaggio di studio tra Algeri e la Sicilia.',
					mcqQuestion: 'Che cosa dimostra la presenza di parole come «dogana», «tariffa» e «arsenale» nella lingua italiana?',
					mcqQuestionAr: 'على ماذا يدل وجود كلمات مثل dogana و tariffa و arsenale في اللغة الإيطالية؟',
					mcqCorrect: 'Riflette secoli di scambi commerciali, marittimi e scientifici tra il mondo arabo e l’Italia nel Mediterraneo',
					mcqDistractors: [
						{
							text: 'Dimostra che non è mai esistito alcun contatto tra le due sponde del Mediterraneo',
							diagnosticFeedback: 'خطأ: بل يؤكد عمق التبادل التجاري والعلمي.'
						},
						{
							text: 'Indica che queste parole sono state inventate soltanto l’anno scorso',
							diagnosticFeedback: 'خطأ: هي مفردات تاريخية عريقة من العصور الوسطى.'
						},
						{
							text: 'Significa che l’arabo e l’italiano appartengono alla stessa identica famiglia grammaticale',
							diagnosticFeedback: 'خطأ: هما لغتان من عائلتين مختلفتين لكن بينهما اقتراض معجمي وتاريخي.'
						}
					],
					mcqExplanation:
						'تبرهن هذه الكلمات ذات الأصل العربي على قرون من التبادل العلمي والملاحي والتجاري في حوض المتوسط.'
				},
				{
					passageTitle: 'Gemellaggio scolastico tra Costantina e Firenze',
					paragraphs: [
						'L’autunno scorso, due licei di Costantina e di Firenze hanno organizzato un progetto di corrispondenza culturale dedicato alla geografia mediterranea e all’architettura storica. Gli studenti algerini hanno presentato i celebri ponti di Costantina e la Grande Moschea di Tlemcen.',
						'A loro volta, i ragazzi toscani hanno descritto i monti Appennini, la posizione centrale della loro regione in Italia e l’importanza dell’artigianato in legno e ceramica. Quando gli allievi leggevano [[le lettere dei corrispondenti]], scoprivano con entusiasmo valori comuni di ospitalità e rispetto.',
						'Al termine del progetto, entrambe le classi hanno disegnato una carta geografica con i porti principali del Mediterraneo e hanno promesso di continuare [[questo dialogo costruttivo]] anche nel terzo anno.'
					],
					source: 'Bollettino dei gemellaggi scolastici (testo adattato)',
					glossary: [
						{ term: 'gemellaggio', meaning: 'accordo educativo e culturale tra due scuole o città' },
						{ term: 'corrispondente', meaning: 'persona con cui si scambiano lettere o messaggi' }
					],
					q1: '1. Quali monumenti algerini hanno presentato gli studenti di Costantina e che cosa hanno descritto gli studenti toscani?',
					a1: 'Gli studenti algerini hanno presentato i celebri ponti di Costantina e la Grande Moschea di Tlemcen; i ragazzi toscani hanno descritto gli Appennini, la posizione della Toscana in Italia e l’artigianato in legno e ceramica.',
					mcGroups: [
						{
							header: 'a) Quali valori umani scoprivano i ragazzi leggendo le lettere ricevute?',
							options: [
								'Ospitalità e rispetto reciproco',
								'Competizione aggressiva e isolamento',
								'Indifferenza verso la geografia'
							],
							correct: 'Ospitalità e rispetto reciproco',
							mark: '1.0'
						},
						{
							header: 'b) Che cosa hanno realizzato insieme le due classi alla fine del progetto?',
							options: [
								'Una carta geografica con i porti del Mediterraneo',
								'Un manuale di meccanica industriale',
								'Una gara di corse automobilistiche'
							],
							correct: 'Una carta geografica con i porti del Mediterraneo',
							mark: '1.0'
						}
					],
					q3: '3. Cerca nel testo :\n  a) Il sinonimo di «studenti» (§2) e il contrario di «inizio» (§3).\n  b) Due verbi all’Imperfetto nel §2 e due nomi propri geografici nel §1.',
					a3: 'a) Sinonimo: «allievi» o «ragazzi»; Contrario di inizio: «termine». | b) Imperfetto (§2): leggevano, scoprivano; Nomi geografici (§1): Costantina, Firenze, Mediterraneo, Tlemcen.',
					q4: '4. A che cosa si riferiscono «le lettere dei corrispondenti» (§2) e «questo dialogo costruttivo» (§3)?',
					a4: '«le lettere dei corrispondenti» indica i messaggi culturali inviati dagli studenti partner di Firenze e Costantina; «questo dialogo costruttivo» si riferisce allo scambio educativo tra i due licei.',
					mcqQuestion: 'Quale tempo verbale è usato in «Quando gli allievi leggevano..., scoprivano...» e perché?',
					mcqQuestionAr: 'أي زمن استُعمل في «leggevano / scoprivano» ولماذا؟',
					mcqCorrect: 'L’Imperfetto, perché esprime azioni abituali e ripetute durante lo scambio culturale nel passato',
					mcqDistractors: [
						{
							text: 'Il Futuro Semplice, perché parla di progetti del prossimo anno',
							diagnosticFeedback: 'خطأ: الجملة تصف ما كان يحدث في الخريف الماضي.'
						},
						{
							text: 'Il Presente Indicativo, perché esprime un ordine immediato',
							diagnosticFeedback: 'خطأ: الصيغة المنتهية بـ -vano زمن ماضٍ مستمر.'
						},
						{
							text: 'L’Infinito presente, perché non ha soggetto',
							diagnosticFeedback: 'خطأ: الفعل مصرف مع الضمير الجمع الغائب gli allievi.'
						}
					],
					mcqExplanation:
						'نهاية `-vano` تدل على زمن Imperfetto لوصف أفعال متكررة أو متزامنة في الماضي (عندما كانوا يقرؤون، كانوا يكتشفون).'
				},
				{
					passageTitle: 'Da Orano a Napoli: appunti di geografia e ospitalità',
					paragraphs: [
						'Durante le vacanze invernali, il padre di Nadia ha portato la sua famiglia in viaggio culturale da Orano a Napoli per visitare alcuni amici di lavoro. Prima della partenza, Nadia aveva controllato l’itinerario sulla carta geografica e preparato con cura la sua valigia.',
						'Arrivati al porto, tutti sono rimasti colpiti dalla somiglianza del clima mite e dei limoneti lungo la costa. La guida ha mostrato [[la baia luminosa]] e ha spiegato che anche l’Italia è circondata dal Mar Mediterraneo e dal Mar Adriatico a est.',
						'La sera, le due famiglie hanno cenato insieme con piatti semplici di pesce, verdure e olio d’oliva. Nadia ha annotato nel suo taccuino che viaggiare con curiosità e rispetto fa scoprire quanto siamo vicini su [[queste due coste]].'
					],
					source: 'Appunti di viaggio mediterranei (testo adattato)',
					glossary: [
						{ term: 'limoneto', meaning: 'terreno coltivato con alberi di limoni' },
						{ term: 'taccuino', meaning: 'piccolo quaderno tascabile per appunti di viaggio' }
					],
					q1: '1. Da quale città è partita la famiglia di Nadia, come si è preparata lei prima del viaggio e quale clima ha trovato lungo la costa?',
					a1: 'La famiglia è partita da Orano verso Napoli. Prima di partire, Nadia ha controllato l’itinerario sulla carta geografica e preparato la valigia. Lungo la costa hanno trovato un clima mite e limoneti simili a quelli algerini.',
					mcGroups: [
						{
							header: 'a) Quali due mari circondano la penisola italiana secondo il §2?',
							options: [
								'Il Mar Mediterraneo e il Mar Adriatico',
								'L’Oceano Pacifico e il Mar Rosso',
								'Il Mar del Nord e il Mar Baltico'
							],
							correct: 'Il Mar Mediterraneo e il Mar Adriatico',
							mark: '1.0'
						},
						{
							header: 'b) Che cosa ha imparato Nadia durante questa esperienza culturale?',
							options: [
								'Che viaggiare con rispetto fa scoprire la vicinanza tra le due sponde',
								'Che è inutile preparare la valigia prima di partire',
								'Che nessuno coltiva agrumi nel Mediterraneo'
							],
							correct: 'Che viaggiare con rispetto fa scoprire la vicinanza tra le due sponde',
							mark: '1.0'
						}
					],
					q3: '3. Cerca nel testo :\n  a) Il sinonimo di «dolce / temperato» riferito al clima (§2) e il contrario di «lontani» (§3).\n  b) Tre parole appartenenti al campo lessicale del viaggio.',
					a3: 'a) Sinonimo: «mite»; Contrario di lontani: «vicini». | b) Campo lessicale: viaggio, partenza, itinerario, carta geografica, valigia, porto, guida, taccuino.',
					q4: '4. A che cosa si riferiscono «la baia luminosa» (§2) e «queste due coste» (§3)?',
					a4: '«la baia luminosa» si riferisce al golfo costiero di Napoli mostrato dalla guida; «queste due coste» indica la costa nordafricana dell’Algeria e la costa meridionale dell’Italia.',
					mcqQuestion: 'Quale preposizione completa correttamente la frase «Il padre di Nadia ha viaggiato ...... Orano ...... Napoli»?',
					mcqQuestionAr: 'ما حرفا الجر الصحيحان لإكمال جملة السفر من وهران إلى نابولي؟',
					mcqCorrect: 'da / a (da Orano a Napoli)',
					mcqDistractors: [
						{
							text: 'in / in (in Orano in Napoli)',
							diagnosticFeedback: 'خطأ: المدن لا تأخذ in، ونقطة الانطلاق تأخذ da.'
						},
						{
							text: 'su / di (su Orano di Napoli)',
							diagnosticFeedback: 'خطأ: su و di لا تعبران عن الانطلاق والوصول.'
						},
						{
							text: 'con / tra (con Orano tra Napoli)',
							diagnosticFeedback: 'خطأ: لا تعبران عن نقطة البداية والوجهة.'
						}
					],
					mcqExplanation:
						'نستعمل `da` لنقطة الانطلاق (`da Orano`) و`a` للمدينة المقصودة (`a Napoli`).'
				}
			];

			const v = rng.pick(variants);
			const mcq = buildUniqueMcqOptions(v.mcqCorrect, v.mcqDistractors, rng);
			const content: ContentBlock[] = [
				buildIllustratedFigureBlock('ita_01_italia_mediterraneo_carta_muta', {
					lang: 'it',
					mode: 'quiz',
					pins: [],
					width: '62%',
					maxHeight: 118,
					markPerItem: '0.2',
					caption: 'Carta muta dell’Italia e del Mediterraneo : identifica i numeri da 1 a 5 in italiano (5 x 0.2 = 1.0 pto).'
				}),
				buildItalianPassageBlock({
					title: v.passageTitle,
					paragraphs: v.paragraphs,
					source: v.source,
					numberedParagraphs: true,
					glossary: v.glossary
				}),
				{ type: 'text', content: v.q1, answer: v.a1, mark: '1.5' },
				{
					type: 'text',
					content: '2. Scegli l’opzione esatta in base al testo :',
					mark: ''
				},
				{ type: 'multiple_choice', groups: v.mcGroups },
				{ type: 'text', content: v.q3, answer: v.a3, mark: '1.5' },
				{ type: 'text', content: v.q4, answer: v.a4, mark: '1.0' }
			];

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't2',
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
					instruction: 'Identifica i cinque elementi geografici sulla carta muta, poi leggi il testo e rispondi alle domande :',
					content
				},
				hints: [
					'تذكر معالم الخريطة الصماء: 1 Italia، 2 Algeria، 3 Sicilia، 4 Mar Mediterraneo، 5 Mar Adriatico (5 × 0.2 = 1.0 نقطة).',
					'انتبه لحروف الجر الجغرافية: in للدول والجزر الكبرى و a للمدن.',
					'ابحث عن المترادفات والأضداد بدقة داخل الفقرة المشار إليها.'
				],
				solutionStepsAr: [
					'تسمية المعالم الخمسة على الخريطة الصماء بالإيطالية (5 × 0.2 = 1.0 نقطة).',
					'الإجابة عن سؤال الفهم الجغرافي والثقافي (1.5 نقطة).',
					'اختيار الإجابتين الصحيحتين في الاختيار من متعدد (2.0 نقطة).',
					'استخراج المترادفات والأضداد والحقل المعجمي (1.5 نقطة) وتعيين العائد (1.0 نقطة).'
				],
				finalAnswer: v.mcqCorrect
			};
		}
	},

	// 3. Competenza linguistica (7 pti) — matching quiz + saveItalianSvgAsset
	{
		id: 'ita_tpl_2as_le_t2_ling_passato_imperfetto',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'coniugazione_modi',
		titleAr: 'II. Competenza linguistica : Passato prossimo, ausiliari, imperfetto e derivazione (7 pti)',
		curriculumLessonId: 'ita_lesson_2as_le_t2_passato_prossimo_vs_imperfetto',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					svgSlug: 'ita_2as_t2_ling_passati_v0',
					svgContent: svgItalianTenseTimeline({
						title: 'Narrazione al passato (2AS LE)',
						tenseName: 'Passato Prossimo vs Imperfetto',
						formula: 'essere/avere + participio | -vo/-vi/-va (descrizione)',
						activeZone: 'two_past',
						example: 'Mentre studiavamo, è arrivato mio zio da Orano.',
						markers: 'ieri, l’anno scorso (P. Pross.) | sempre, da piccolo (Imperf.)',
						width: 560
					}),
					svgCaption: 'Contrasto narrativo tra Imperfetto e Passato Prossimo',
					wfRows: [
						{
							verbo: { given: true, value: 'viaggiare' },
							sostantivo: { value: 'viaggio / viaggiatore', mark: '0.5' },
							aggettivo: { value: 'viaggiante / turistico', mark: '0.5' }
						},
						{
							verbo: { value: 'nutrire', mark: '0.5' },
							sostantivo: { given: true, value: 'nutrizione' },
							aggettivo: { value: 'nutritivo/a', mark: '0.5' }
						}
					],
					q2: '2. Coniuga i verbi tra parentesi al Passato Prossimo scegliendo l’ausiliare giusto e concordando il participio quando necessario :\n  a) Ieri mia sorella (partire) per Palermo e (scrivere) subito un messaggio.\n  b) Sabato scorso io e Karim (visitare) la biblioteca e poi (tornare) a casa a piedi.\n  c) Stamattina le studentesse (svegliarsi) alle sei e (fare) colazione insieme.',
					a2: 'a) è partita / ha scritto.\n  b) abbiamo visitato / siamo tornati.\n  c) si sono svegliate / hanno fatto.',
					q3: '3. Completa combinando l’Imperfetto e il Passato Prossimo secondo il senso :\n  a) Quando (essere, io) bambino, (mangiare) sempre frutta fresca dal giardino.\n  b) Mentre noi (leggere) l’articolo in classe, la campanella (suonare).\n  c) Ieri il cielo (essere) limpido, così tutta la famiglia (uscire) per una passeggiata.',
					a3: 'a) ero / mangiavo.\n  b) leggevamo / è suonata.\n  c) era / è uscita.',
					q4: '4. Scrivi il participio passato irregolare di ciascuno di questi verbi e usane due in brevi frasi :\n  leggere -> ............ ; vedere -> ............ ; prendere -> ............ ; aprire -> ............ .',
					a4: 'leggere -> letto ; vedere -> visto ; prendere -> preso ; aprire -> aperto. (Es.: Ho letto un libro utile. La biblioteca è aperta dalle otto.)',
					pairs: [
						{ left: 'partire (lei, Passato Prossimo)', right: 'è partita' },
						{ left: 'scrivere (noi, Passato Prossimo)', right: 'abbiamo scritto' },
						{ left: 'alzarsi (loro F., Passato Prossimo)', right: 'si sono alzate' },
						{ left: 'essere (noi, Imperfetto)', right: 'eravamo' }
					],
					explanation:
						'تطابق اسم المفعول مع essere (è partita, si sono alzate)، واستعمال avere دون تغيير مع scrivere (abbiamo scritto)، وتصريف Imperfetto لـ essere (eravamo).'
				},
				{
					svgSlug: 'ita_2as_t2_ling_passati_v1',
					svgContent: svgItalianConjugationChart({
						title: 'Ausiliari e Participi Irregolari',
						subtitle: 'Regole chiave del Passato Prossimo',
						width: 560,
						columns: [
							{
								header: 'Con AVERE',
								rule: 'Transitivo: resta in -o',
								examples: 'ho letto, abbiamo visto'
							},
							{
								header: 'Con ESSERE',
								rule: 'Moto / stato / riflessivi (-o/-a/-i/-e)',
								examples: 'è andata, sono partiti'
							},
							{
								header: 'Irregolari chiave',
								rule: 'Particolarità del participio',
								examples: 'fatto, detto, preso, aperto'
							}
						]
					}),
					svgCaption: 'Tavola degli ausiliari e dei principali participi irregolari',
					wfRows: [
						{
							verbo: { given: true, value: 'alimentare' },
							sostantivo: { value: 'alimentazione', mark: '0.5' },
							aggettivo: { value: 'alimentare', mark: '0.5' }
						},
						{
							verbo: { value: 'esplorare', mark: '0.5' },
							sostantivo: { given: true, value: 'esplorazione' },
							aggettivo: { value: 'esplorativo/a', mark: '0.5' }
						}
					],
					q2: '2. Volgi queste frasi dal Presente al Passato Prossimo (cambia «oggi» in «ieri») :\n  a) Oggi Nadia esce alle sette e prende l’autobus per la scuola.\n  b) Oggi noi leggiamo un testo sulla Sicilia e facciamo gli esercizi.\n  c) Oggi i ragazzi si preparano presto e vanno allo stadio.',
					a2: 'a) Ieri Nadia è uscita alle sette e ha preso l’autobus per la scuola.\n  b) Ieri noi abbiamo letto un testo sulla Sicilia e abbiamo fatto gli esercizi.\n  c) Ieri i ragazzi si sono preparati presto e sono andati allo stadio.',
					q3: '3. Coniuga i verbi tra parentesi all’Imperfetto Indicativo per descrivere ricordi d’infanzia :\n  a) Da piccolo io e mia sorella (andare) spesso al mare ad agosto.\n  b) La casa dei nonni (avere) un grande cortile dove (crescere) molti alberi.\n  c) Mio nonno (dire) sempre la verità e (fare) lunghe passeggiate con noi.',
					a3: 'a) andavamo.\n  b) aveva / crescevano.\n  c) diceva / faceva.',
					q4: '4. Correggi l’errore nella scelta dell’ausiliare o nell’accordo del participio passato :\n  a) Le mie compagne hanno arrivate in orario.\n  b) Tu ti hai alzato molto presto questa mattina.\n  c) Ho leggeto tre pagine e ho veduto una mappa antica.',
					a4: 'a) Le mie compagne sono arrivate in orario.\n  b) Tu ti sei alzato molto presto questa mattina.\n  c) Ho letto tre pagine e ho visto una mappa antica.',
					pairs: [
						{ left: 'venire (loro M., Passato Prossimo)', right: 'sono venuti' },
						{ left: 'fare (tu, Imperfetto)', right: 'facevi' },
						{ left: 'dire (io, Passato Prossimo)', right: 'ho detto' },
						{ left: 'rimanere (lei, Passato Prossimo)', right: 'è rimasta' }
					],
					explanation:
						'venire و rimanere يأخذان essere مع المطابقة (sono venuti, è rimasta)، و fare في Imperfetto يصبح facevi، و dire في اسم المفعول detto.'
				},
				{
					svgSlug: 'ita_2as_t2_ling_passati_v2',
					svgContent: svgItalianConjugationChart({
						title: 'Imperfetto e Passato Prossimo in pratica',
						subtitle: 'Abitudine / descrizione vs Evento concluso',
						width: 560,
						columns: [
							{
								header: 'Imperfetto (-avo/-evo)',
								rule: 'Azioni ripetute e descrizione',
								examples: 'sempre studiavo, era calmo'
							},
							{
								header: 'Passato Prossimo',
								rule: 'Azione compiuta e precisa',
								examples: 'sabato siamo arrivati'
							},
							{
								header: 'Riflessivi passati',
								rule: 'SEMPRE con ESSERE',
								examples: 'mi sono preparata, ci siamo visti'
							}
						]
					}),
					svgCaption: 'Usi dell’Imperfetto e dei riflessivi al Passato Prossimo',
					wfRows: [
						{
							verbo: { given: true, value: 'salutare' },
							sostantivo: { value: 'saluto / salute', mark: '0.5' },
							aggettivo: { value: 'salutare', mark: '0.5' }
						},
						{
							verbo: { value: 'equilibrare', mark: '0.5' },
							sostantivo: { value: 'equilibrio', mark: '0.5' },
							aggettivo: { given: true, value: 'equilibrato/a' }
						}
					],
					q2: '2. Completa il racconto con il Passato Prossimo o l’Imperfetto dei verbi tra parentesi :\n  «Domenica scorsa (fare, noi) ............ un’escursione in montagna. Quando (partire) ............ la mattina, l’aria (essere) ............ fresca e gli uccelli (cantare) ............ sugli alberi. A mezzogiorno (pranzare, noi) ............ con pane, olive e arance e poi (tornare) ............ contenti.»',
					a2: 'abbiamo fatto / siamo partiti (o partite) / era / cantavano / abbiamo pranzato / siamo tornati (o tornate).',
					q3: '3. Forma frasi corrette al Passato Prossimo con i verbi riflessivi seguenti :\n  a) Sara / prepararsi / per il viaggio a Tlemcen.\n  b) Noi (ragazze) / vestirsi / e uscire di casa alle otto.\n  c) Voi / divertirsi / durante la visita guidata al museo?',
					a3: 'a) Sara si è preparata per il viaggio a Tlemcen.\n  b) Noi ci siamo vestite e siamo uscite di casa alle otto.\n  c) Vi siete divertiti (o divertite) durante la visita guidata al museo?',
					q4: '4. Completa con l’articolo partitivo corretto (del, dell’, della, dei, delle) :\n  a) Nel cestino ci sono ............ grano integrale, ............ olio d’oliva e ............ datteri dolci.\n  b) Per pranzo prepariamo ............ insalata verde con ............ verdure fresche.',
					a4: 'a) del / dell’ / dei.\n  b) dell’ / delle.',
					pairs: [
						{ left: 'aprire (participio irregolare)', right: 'aperto' },
						{ left: 'prendere (participio irregolare)', right: 'preso' },
						{ left: 'bere (lui, Imperfetto)', right: 'beveva' },
						{ left: 'nascere (lei, Passato Prossimo)', right: 'è nata' }
					],
					explanation:
						'أسماء المفعول الشاذة: aperto و preso، و bere في Imperfetto هو beveva، و nascere يأخذ essere مع المطابقة (è nata).'
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
					content: '1. Completa la tabella di derivazione lessicale (Verbo | Sostantivo | Aggettivo) :',
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
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'linguistic_competence',
				quizQuestion: {
					type: 'matching',
					questionText: 'Abbina ciascun elemento a sinistra con la forma verbale o il participio esatto a destra:',
					questionTextAr: 'صل كل عنصر في العمود الأول بالصيغة الفعلية الدقيقة الموافقة له في الماضي:',
					questionData: {
						pairs: v.pairs
					},
					explanation: v.explanation
				},
				sujetExercise: {
					customTitle: 'II. Competenza linguistica',
					points: 7,
					instruction: 'Completa gli esercizi di morfologia, tempi del passato e partitivo :',
					content
				},
				hints: [
					'تذكّر أن جميع الأفعال الانعكاسية وأفعال الحركة والبقاء تأخذ دائماً المساعد essere مع مطابقة اسم المفعول.',
					'استعمل Imperfetto لوصف الطقس والمكان والعادة الطفولية، و Passato Prossimo للحدث المنجز المحدد.',
					'راجع أسماء المفعول الشاذة: fatto, scritto, letto, visto, detto, preso, aperto, nato, stato.'
				],
				solutionStepsAr: [
					'إكمال جدول الاشتقاق اللغوي (2.0 نقطة).',
					'تصريف الأفعال في الماضي المركب مع ضبط المساعد والمطابقة (2.0 نقطة).',
					'التمييز السردي بين Imperfetto و Passato Prossimo أو الأفعال الانعكاسية (1.5 نقطة).',
					'إتقان أسماء المفعول الشاذة أو أدوات التجزئة وتصحيح الأخطاء (1.5 نقطة).'
				],
				finalAnswer: v.pairs.map((p) => `${p.left} = ${p.right}`).join(' | ')
			};
		}
	},

	// 4. Competenza linguistica (7 pti) — drag_drop quiz + saveItalianSvgAsset
	{
		id: 'ita_tpl_2as_le_t2_ling_possessivi_comparativi',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'grammatica_sintassi',
		titleAr: 'II. Competenza linguistica : Possessivi con nomi di famiglia, comparativo e superlativo (7 pti)',
		curriculumLessonId: 'ita_lesson_2as_le_t2_possessivi_comparativo_superlativo',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					svgSlug: 'ita_2as_t2_ling_posscomp_v0',
					svgContent: svgItalianGrammarMap({
						title: 'Possessivi e Gradi dell’Aggettivo',
						rootLabel: 'Famiglia e Confronto (2AS LE)',
						rootSub: 'Articolo coi possessivi + Comparativo/Superlativo',
						width: 560,
						branches: [
							{
								label: 'Famiglia sing. pura',
								rule: 'Senza articolo',
								example: 'mio padre, sua sorella'
							},
							{
								label: 'Plurale / Loro / Mod.',
								rule: 'Sempre CON articolo',
								example: 'i miei nonni, il loro zio'
							},
							{
								label: 'Comparativo',
								rule: 'di (2 nomi) | che (2 agg.)',
								example: 'più sano del burro'
							},
							{
								label: 'Superlativo',
								rule: 'il più... di | -issimo',
								example: 'il più antico della città'
							}
						]
					}),
					svgCaption: 'Mappa grammaticale dei possessivi, comparativi e superlativi',
					classPrompt:
						'1. Classifica le sei espressioni seguenti nella tabella secondo la regola dell’articolo davanti ai possessivi (mio padre, i miei fratelli, il loro cugino, sua madre, la mia cara nonna, mio zio) :',
					classCols: [
						{ header: 'Senza articolo (sing. puro)', items: ['mio padre', 'sua madre', 'mio zio'], mark: '0.5' },
						{ header: 'Con articolo (plurale / loro)', items: ['i miei fratelli', 'il loro cugino'], mark: '0.5' },
						{ header: 'Con articolo (aggettivo)', items: ['la mia cara nonna'], mark: '0.5' }
					],
					q2: '2. Inserisci l’aggettivo possessivo adatto, con o senza articolo determinativo :\n  a) (Io) ............ genitori abitano ad Algeri, mentre (io) ............ sorella studia a Tlemcen.\n  b) (Loro) ............ zio è un bravo artigiano e (lui) ............ figlia aiuta sempre in casa.\n  c) (Noi) ............ nonni coltivano gli ulivi e (tu) ............ cara zia prepara il pane integrale.',
					a2: 'a) I miei / mia.\n  b) Il loro / sua.\n  c) I nostri / la tua.',
					q3: '3. Completa le frasi comparative scegliendo esattamente tra «di / del / della», «che», «come» e «quanto» :\n  a) L’olio d’oliva è molto più salutare ............ burro industriale.\n  b) Imparare l’italiano è più piacevole ............ difficile.\n  c) La biblioteca comunale è grande ............ il giardino centrale.\n  d) Leggere un buon libro è utile ............ ascoltare una conferenza seria.',
					a3: 'a) del (di + il).\n  b) che (due aggettivi).\n  c) quanto (oppure come).\n  d) quanto (oppure come).',
					q4: '4. Trasforma secondo la richiesta tra parentesi (superlativo relativo o assoluto) :\n  a) Questa città è molto antica. (superlativo assoluto in -issimo) -> ............\n  b) Il Nilo è un fiume lungo dell’Africa. (superlativo relativo) -> ............\n  c) Il tuo riassunto è molto buono. (superlativo assoluto organico) -> ............',
					a4: 'a) Questa città è antichissima.\n  b) Il Nilo è il fiume più lungo dell’Africa.\n  c) Il tuo riassunto è ottimo.',
					ddStem: 'Classifica ciascuna espressione familiare secondo l’obbligo o l’assenza dell’articolo determinativo:',
					ddCategories: ['Senza articolo (corretto)', 'Con articolo obbligatorio'],
					ddItems: [
						{ text: 'mio fratello minore no — mio fratello', category: 0 },
						{ text: 'sua nonna', category: 0 },
						{ text: 'i miei cugini', category: 1 },
						{ text: 'il loro padre', category: 1 }
					]
				},
				{
					svgSlug: 'ita_2as_t2_ling_posscomp_v1',
					svgContent: svgItalianConjugationChart({
						title: 'Comparativo e Superlativo irregolari',
						subtitle: 'Forme regolari e forme organiche di uso frequente',
						width: 560,
						columns: [
							{
								header: 'DI vs CHE',
								rule: 'Confronto nomi vs aggettivi',
								examples: 'più alto di me / più utile che lungo'
							},
							{
								header: 'Sup. Relativo',
								rule: 'articolo + più/meno + agg. + di',
								examples: 'la città più verde del paese'
							},
							{
								header: 'Forme speciali',
								rule: 'buono / cattivo / grande',
								examples: 'migliore / ottimo, peggiore / pessimo'
							}
						]
					}),
					svgCaption: 'Quadro del comparativo e delle forme organiche del superlativo',
					classPrompt:
						'1. Classifica queste sei forme nella tabella (ottimo, più interessante che facile, il più antico d’Algeria, più caldo della sera, chiarissima, peggiore) :',
					classCols: [
						{ header: 'Comparativo', items: ['più interessante che facile', 'più caldo della sera', 'peggiore'], mark: '0.5' },
						{ header: 'Superlativo relativo', items: ['il più antico d’Algeria'], mark: '0.5' },
						{ header: 'Superlativo assoluto', items: ['ottimo', 'chiarissima'], mark: '0.5' }
					],
					q2: '2. Completa con la forma corretta del possessivo (con articolo solo dove serve) :\n  a) (Noi) ............ madre cucina legumi e verdure fresche, e (noi) ............ cugini mangiano con noi.\n  b) (Loro) ............ sorella minore frequenta il liceo e (loro) ............ padre lavora a Costantina.\n  c) Dove sono (tu) ............ libri e (tu) ............ fratellino?',
					a2: 'a) Nostra / i nostri.\n  b) La loro / il loro.\n  c) i tuoi / il tuo (diminutivo -> articolo!).',
					q3: '3. Costruisci frasi comparative corrette collegando gli elementi con «più... di», «più... che» o «meno... di» :\n  a) La Sicilia / essere / grande / la Sardegna.\n  b) Preparare pasti sani in casa / essere / salutare / comprare snack.\n  c) Questo sentiero di montagna / essere / ripido / pericoloso.',
					a3: 'a) La Sicilia è più grande della Sardegna.\n  b) Preparare pasti sani in casa è più salutare che comprare snack (due verbi all’infinito!).\n  c) Questo sentiero di montagna è più ripido che pericoloso (oppure meno pericoloso che ripido).',
					q4: '4. Correggi i tre errori presenti nelle frasi seguenti :\n  a) Il miele è più migliore dello zucchero raffinato.\n  b) Questo è il libro più interessante nella biblioteca.\n  c) Mio nonno racconta storie molto bellissime.',
					a4: 'a) Il miele è migliore dello zucchero raffinato.\n  b) Questo è il libro più interessante della biblioteca.\n  c) Mio nonno racconta storie bellissime (oppure molto belle).',
					ddStem: 'Classifica le frasi secondo la preposizione comparativa corretta («di» oppure «che»):',
					ddCategories: ['Richiede «di / del / della»', 'Richiede «che»'],
					ddItems: [
						{ text: 'La frutta è più leggera ...... dolci industriali.', category: 0 },
						{ text: 'Algeri è più popolosa ...... Orano.', category: 0 },
						{ text: 'Camminare è più rilassante ...... faticoso.', category: 1 },
						{ text: 'Studio volentieri più in biblioteca ...... in soggiorno.', category: 1 }
					]
				},
				{
					svgSlug: 'ita_2as_t2_ling_posscomp_v2',
					svgContent: svgItalianGrammarMap({
						title: 'Preposizioni geografiche e Lessico mediterraneo',
						rootLabel: 'Viaggi, luoghi e paragoni',
						rootSub: 'in / a / da / per + Aggettivi descrittivi',
						width: 560,
						branches: [
							{
								label: 'IN + Paesi / Isole',
								rule: 'Stati, regioni, grandi isole',
								example: 'in Algeria, in Italia, in Sicilia'
							},
							{
								label: 'A + Città',
								rule: 'Centri urbani',
								example: 'a Costantina, a Roma, ad Algeri'
							},
							{
								label: 'DA / PER',
								rule: 'Origine vs Meta (partire)',
								example: 'parto da Algeri per Palermo'
							},
							{
								label: 'Comparativi',
								rule: 'Maggioranza e uguaglianza',
								example: 'tanto utile quanto chiaro'
							}
						]
					}),
					svgCaption: 'Sintesi di preposizioni geografiche e comparazione',
					classPrompt:
						'1. Classifica questi sei nomi geografici o di cibo sano nelle tre colonne (Sicilia, datteri, Costantina, olio d’oliva, Palermo, cereali integrali) :',
					classCols: [
						{ header: 'Città (con «a»)', items: ['Costantina', 'Palermo'], mark: '0.5' },
						{ header: 'Grande isola (con «in»)', items: ['Sicilia'], mark: '0.5' },
						{ header: 'Alimentazione sana', items: ['datteri', 'olio d’oliva', 'cereali integrali'], mark: '0.5' }
					],
					q2: '2. Completa con la preposizione geografica adatta (in, a, ad, da, per) :\n  a) Mio zio abita ............ Firenze, ............ Italia, ma è nato ............ Orano, ............ Algeria.\n  b) Domani la nostra classe parte ............ Costantina ............ andare ............ Tlemcen.\n  c) I turisti hanno trascorso tre giorni ............ Sicilia e due giorni ............ Roma.',
					a2: 'a) a / in / a / in.\n  b) da / per / a.\n  c) in / a.',
					q3: '3. Sostituisci le parole sottolineate con i possessivi esatti (con o senza articolo) :\n  a) La famiglia di Marco -> ............ famiglia.\n  b) I cugini di Marco e Lucia -> ............ cugini.\n  c) La madre di te -> ............ madre.\n  d) La sorellina di me -> ............ sorellina.',
					a3: 'a) la sua famiglia.\n  b) i loro cugini.\n  c) tua madre (senza articolo).\n  d) la mia sorellina (diminutivo -> con articolo!).',
					q4: '4. Completa con il superlativo relativo o assoluto adatto :\n  a) Il Mar Mediterraneo è il mare ............ (importante) ............ nostra regione (di+la).\n  b) L’acqua pura è ............ (necessario, sup. assoluto) per chi fa sport.\n  c) La nostra gita scolastica è stata ............ (buono, sup. assoluto organico).',
					a4: 'a) più importante / della.\n  b) necessarissima (o molto necessaria).\n  c) ottima.',
					ddStem: 'Classifica i luoghi geografici secondo la preposizione corretta («in» oppure «a»):',
					ddCategories: ['Preposizione «in»', 'Preposizione «a / ad»'],
					ddItems: [
						{ text: 'Algeria (paese)', category: 0 },
						{ text: 'Sicilia (grande isola)', category: 0 },
						{ text: 'Palermo (città)', category: 1 },
						{ text: 'Costantina (città)', category: 1 }
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
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'linguistic_competence',
				quizQuestion: {
					type: 'drag_drop',
					questionText: v.ddStem,
					questionTextAr: 'صنف العبارات الآتية بسحب كل منها إلى الفئة النحوية المناسبة:',
					questionData: {
						categories: v.ddCategories,
						items: rng.shuffle(v.ddItems)
					},
					explanation:
						'تسقط أداة التعريف مع صفة الملكية فقط في اسم القرابة المفرد المجرد دون loro؛ ونميز بين di و che في المقارنة، وبين in و a في الأسماء الجغرافية.'
				},
				sujetExercise: {
					customTitle: 'II. Competenza linguistica',
					points: 7,
					instruction: 'Risolvi gli esercizi seguenti su possessivi, comparativi, superlativi e geografia :',
					content
				},
				hints: [
					'تأكد في صفات الملكية من وجود أداة التعريف مع الجمع ومع loro ومع الصفة أو التصغير (la mia cara sorella, il mio fratellino).',
					'في المقارنة: di بين اسمين أو ضميرين، و che بين صفتين أو مصدرين أو عبارتي جر.',
					'في التفضيل النسبي نربط المجموعة بـ di (وليس in): il libro più bello della biblioteca.'
				],
				solutionStepsAr: [
					'التصنيف في الجدول الثلاثي (1.5 نقطة).',
					'ضبط صفات الملكية أو حروف الجر الجغرافية (2.0 نقطة).',
					'إتقان أساليب المقارنة di vs che (2.0 نقطة).',
					'تطبيق صيغ التفضيل النسبي والمطلق أو تصحيح الأخطاء (1.5 نقطة).'
				],
				finalAnswer: v.ddItems.map((it) => `${it.text} : ${v.ddCategories[it.category]}`).join(' | ')
			};
		}
	},

	// 5. Produzione scritta (6 pti, integration) — ordering quiz
	{
		id: 'ita_tpl_2as_le_t2_writ_alimentazione_sport',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'produzione_scritta',
		titleAr: 'III. Produzione scritta : Alimentazione sana mediterranea e sport (6 pti)',
		curriculumLessonId: 'ita_lesson_2as_le_t2_alimentazione_sana_sport',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					tracciaUnoPrompt:
						'Scrivi un articolo per la rivista scolastica (100-130 parole) spiegando ai tuoi compagni come seguire una dieta mediterranea sana e naturale unita allo sport.',
					tracciaUnoPunti: [
						'Importanza di fare una colazione completa e di bere molta acqua pura ogni giorno.',
						'Alimenti genuini consigliati: olio d’oliva, pane integrale, verdure, legumi, frutta di stagione, datteri e miele.',
						'Ruolo dell’attività fisica regolare (nuoto, corsa, camminata) per l’energia scolastica.',
						'Conclusione invitando a evitare cibi industriali troppo zuccherati o grassi.'
					],
					tracciaDuePrompt:
						'Descrivi un pasto tradizionale sano cucinato dalla tua famiglia (100-130 parole), indicando gli ingredienti naturali usati e il valore del mangiare insieme.',
					modelAnswer:
						'Mangiare in modo sano e muoversi ogni giorno sono abitudini essenziali per il benessere di ogni studente. Spesso, per la fretta del mattino, alcuni giovani trascurano la colazione o scelgono merendine industriali poco nutrienti.\n\nInnanzitutto, la dieta mediterranea ci offre ingredienti naturali e genuini: possiamo iniziare la giornata con pane integrale, olio d’oliva extravergine, miele e datteri, accompagnati da frutta fresca. A pranzo è ottimo scegliere legumi, verdure di stagione e pesce, bevendo abbondante acqua pura. Inoltre, praticare sport come il nuoto, la corsa o una semplice camminata pomeridiana migliora sia la forza fisica sia la concentrazione nello studio.\n\nIn conclusione, evitare l’eccesso di zuccheri e curare ciò che portiamo a tavola ci rende più forti e sereni.',
					rubricSummary:
						'Rispetto delle linee guida e struttura in tre parti (2.0 pti) | Uso esatto di partitivi, comparativi e lessico alimentare sano (2.0 pti) | Coerenza, ortografia e registro chiaro (2.0 pti)',
					orderedSteps: [
						'Mangiare in modo equilibrato e praticare sport sono scelte essenziali per la salute dei giovani.',
						'Innanzitutto, conviene iniziare la giornata con pane integrale, olio d’oliva, miele e datteri.',
						'Inoltre, a pranzo è ottimo preferire legumi, verdure fresche e abbondante acqua pura.',
						'In conclusione, uno stile di vita sano migliora sia il benessere fisico sia i risultati scolastici.'
					],
					orderExplanation:
						'يتدرج المقال الصحي من طرح الفكرة العامة إلى اقتراح الفطور الصحي ثم وجبة الغداء المتوازنة ويختم بالنتيجة الدراسية والبدنية.'
				},
				{
					tracciaUnoPrompt:
						'Racconta in un diario personale (100-130 parole) come hai migliorato le tue abitudini alimentari e sportive dall’anno scorso a oggi, confrontando il passato e il presente.',
					tracciaUnoPunti: [
						'Situazione precedente all’Imperfetto (cibi poco sani, scarso movimento).',
						'Decisione presa e primi cambiamenti al Passato Prossimo (colazione genuina, iscrizione a uno sport).',
						'Confronto tra prima e oggi con il comparativo (più leggero, più resistente di prima).',
						'Benefici attuali sulla salute e sull’attenzione al liceo.'
					],
					tracciaDuePrompt:
						'Scrivi una lettera a un amico (100-130 parole) per incoraggiarlo a praticare uno sport di squadra o il nuoto e dargli tre consigli su alimentazione e riposo.',
					modelAnswer:
						'Fino all’anno scorso le mie abitudini quotidiane non erano molto equilibrate. Mangiavo troppo spesso snack industriali, bevevo poche bottiglie d’acqua e passavo quasi tutto il pomeriggio seduto alla scrivania senza fare movimento.\n\nAll’inizio di questo trimestre ho deciso di cambiare ritmo. Ho cominciato a fare una colazione completa con latte, pane integrale e frutta fresca, e mi sono iscritto al corso di nuoto della piscina comunale. All’inizio è stato faticoso, ma mia madre mi ha preparato piatti molto più sani di prima.\n\nOggi mi sento molto più energico che stanco durante le lezioni del pomeriggio. Ho capito che la salute è più preziosa di qualsiasi comodità momentanea.',
					rubricSummary:
						'Aderenza alla traccia e sviluppo temporale chiaro (2.0 pti) | Alternanza corretta di Imperfetto, Passato Prossimo e comparativi (2.0 pti) | Lessico preciso e correttezza ortografica (2.0 pti)',
					orderedSteps: [
						'Fino all’anno scorso mangiavo pochi legumi e non praticavo alcuno sport regolare.',
						'All’inizio di questo trimestre ho deciso di seguire un’alimentazione più equilibrata.',
						'Ho iniziato a fare nuoto e a consumare ogni giorno verdure fresche, frutta e acqua pura.',
						'Oggi mi sento molto più forte e concentrato durante tutte le lezioni al liceo.'
					],
					orderExplanation:
						'يتسلسل النص السردي من العادة السابقة (Imperfetto) إلى لحظة القرار والتغيير (Passato Prossimo) فالنتيجة الإيجابية في الحاضر.'
				},
				{
					tracciaUnoPrompt:
						'Confronta la cucina casalinga tradizionale con il cibo veloce industriale in un testo argomentativo breve (100-130 parole) utilizzando comparativi e superlativi.',
					tracciaUnoPunti: [
						'Ingredienti della cucina familiare (olio d’oliva, grano, verdure, frutta) rispetto al cibo veloce.',
						'Uso preciso di comparativi (più genuino di, meno grasso di, più utile che) e almeno un superlativo.',
						'Valore sociale ed educativo del pranzo condiviso in famiglia.',
						'Raccomandazione finale rivolta agli studenti.'
					],
					tracciaDuePrompt:
						'Presenta la festa o giornata scolastica dedicata alla salute e all’artigianato tradizionale organizzata nel tuo liceo (100-130 parole).',
					modelAnswer:
						'Oggi molti giovani preferiscono i pasti veloci perché sembrano più pratici, ma la cucina casalinga tradizionale rimane di gran lunga la scelta migliore per la nostra salute.\n\nInnanzitutto, i piatti preparati in casa con olio d’oliva, verdure fresche, grano e legumi sono molto più genuini e leggeri dei panini industriali ricchi di grassi e sale. Inoltre, cucinare con prodotti di stagione è spesso più economico che comprare bibite e merendine confezionate. Anche la tavola familiare è importantissima perché unisce genitori e figli in un momento sereno di ascolto e rispetto.\n\nIn sintesi, riscoprire i sapori naturali delle nostre famiglie è il modo più intelligente per proteggere il corpo e crescere con energia.',
					rubricSummary:
						'Coerenza dell’argomentazione e copertura delle pautas (2.0 pti) | Precisione su comparativi (di/che) e superlativi (2.0 pti) | Ricchezza lessicale e ortografia (2.0 pti)',
					orderedSteps: [
						'Sebbene il cibo veloce sembri pratico, la cucina casalinga resta la scelta migliore per la salute.',
						'Infatti, i piatti preparati con olio d’oliva e verdure sono più genuini dei cibi industriali.',
						'Inoltre, mangiare a tavola con la famiglia rafforza il dialogo e il rispetto quotidiano.',
						'Pertanto, conviene valorizzare sempre le ricette naturali e tradizionali.'
					],
					orderExplanation:
						'تنتقل الفقرة الحجاجية من أطروحة التفوق الصحي للطبخ المنزلي إلى التعليل الغذائي ثم القيمة الأسرية وتختم بالاستنتاج.'
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
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'ordering',
					questionText: 'Riordina le quattro frasi seguenti per comporre un testo coerente sull’alimentazione sana:',
					questionTextAr: 'رتب الجمل الأربع الآتية لتكوين فقرة متناسقة حول التغذية الصحية:',
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
					'وظف مفردات التغذية الطبيعية الحلال (olio d’oliva, legumi, verdure, frutta, datteri, acqua pura) وتجنب تماماً كل ما يخالف القيم.',
					'استخدم المقارنات (più genuino di / più salutare che) أو التوازن بين الماضي والحاضر حسب الموضوع.',
					'نظّم موضوعك في مقدمة وعرض وخاتمة مع روابط واضحة.'
				],
				solutionStepsAr: [
					'استيفاء مضمون الموضوع المختار وتغطية نقاط التوجيه (2.0 نقطة).',
					'توظيف أدوات التجزئة والمقارنة والتفضيل أو أزمنة الماضي بدقة (2.0 نقطة).',
					'سلامة الإملاء والربط المنطقي وتنظيم الفقرات (2.0 نقطة).'
				],
				finalAnswer: v.orderedSteps.join(' / ')
			};
		}
	},

	// 6. Produzione scritta (6 pti, integration) — cloze quiz
	{
		id: 'ita_tpl_2as_le_t2_writ_diario_viaggio_passato',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'produzione_scritta',
		titleAr: 'III. Produzione scritta : Racconto di viaggio nel Mediterraneo tra passato e descrizione (6 pti)',
		curriculumLessonId: 'ita_lesson_2as_le_t2_viaggi_geografia_mediterraneo',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					tracciaUnoPrompt:
						'Scrivi una pagina di diario (100-130 parole) per raccontare una visita culturale o una gita familiare in una città storica algerina o mediterranea, alternando Passato Prossimo e Imperfetto.',
					tracciaUnoPunti: [
						'Partenza, mezzo di trasporto e destinazione usando esattamente le preposizioni geografiche (da, per, a, in).',
						'Descrizione del paesaggio, del clima e dell’atmosfera all’Imperfetto (era, faceva, c’erano).',
						'Azioni compiute durante la visita al Passato Prossimo (siamo arrivati, abbiamo visitato, ho visto).',
						'Impressione finale e confronto con altre città conosciute.'
					],
					tracciaDuePrompt:
						'Presenta la tua famiglia e descrivi il legame con le origini di tuo padre, tua madre o dei tuoi nonni in 100-130 parole usando correttamente gli aggettivi possessivi.',
					modelAnswer:
						'Sabato scorso mia madre, mio fratello e io siamo partiti presto da Algeri per visitare la città storica di Tlemcen. Quando siamo scesi dal treno, il cielo era azzurrissimo e l’aria profumava di fiori d’arancio e alberi verdi.\n\nDurante la mattinata abbiamo visitato la Grande Moschea e siamo rimasti incantati dall’eleganza della sua architettura geometrica. Mentre passeggiavamo vicino alle antiche mura, una guida gentile ci spiegava la storia culturale della regione. Poi abbiamo comprato due piatti di ceramica artigianale per i nostri nonni.\n\nIn questa città l’ospitalità è ancora più calorosa di quanto immaginassi. Siamo tornati a casa la sera stanchi ma felicissimi di questa giornata indimenticabile.',
					rubricSummary:
						'Coerenza narrativa e rispetto dei dettagli richiesti (2.0 pti) | Uso esatto di Passato Prossimo (ausiliari/accordi) e Imperfetto (2.0 pti) | Precisione nelle preposizioni geografiche, possessivi e ortografia (2.0 pti)',
					clozeSentence: 'L’anno scorso le mie sorelle ___ partite da Costantina per visitare una città storica.',
					clozeCorrect: 'sono',
					clozeDistractors: ['hanno', 'erano', 'avranno'],
					clozeExplanation:
						'الفعل partire يأخذ المساعد essere في Passato Prossimo ويتطابق اسم المفعول مع جمع المؤنث (sono partite).'
				},
				{
					tracciaUnoPrompt:
						'Scrivi un’email a un amico italiano (100-130 parole) per invitarlo a conoscere due belle città dell’Algeria, descrivendo la loro posizione geografica e ciò che le rende speciali.',
					tracciaUnoPunti: [
						'Saluto amichevole e presentazione breve di Costantina e Ghardaïa o Algeri e Tlemcen.',
						'Uso preciso di preposizioni geografiche (in Algeria, a Costantina) e possessivi familiari.',
						'Impiego di almeno due comparativi e un superlativo per valorizzarne il patrimonio.',
						'Chiusura cordiale con invito al rispetto delle usanze locali.'
					],
					tracciaDuePrompt:
						'Racconta un ricordo d’infanzia legato alle vacanze estive presso i tuoi nonni (100-130 parole), impiegando l’Imperfetto descrittivo e i possessivi con i nomi di parentela.',
					modelAnswer:
						'Caro Luca, come stai? Ti scrivo per invitarti a scoprire due città algerine che conservano un patrimonio straordinario. Innanzitutto, Costantina si trova nell’est del paese ed è celebre per i suoi ponti sospesi che offrono un panorama stupendo. È molto più antica di tante città moderne e la sua storia è affascinante.\n\nSe invece ami l’architettura tradizionale del deserto, devi visitare Ghardaïa nella Valle dello M’Zab, che è una delle regioni più originali di tutta l’Algeria. Lì mia zia e i miei cugini accolgono sempre gli ospiti con datteri dolci e tè alla menta.\n\nSpero che un giorno visiterai il nostro paese: ti accoglieremo con grande rispetto e amicizia. Un caro saluto!',
					rubricSummary:
						'Efficacia comunicativa dell’email e sviluppo ordinato (2.0 pti) | Correttezza su preposizioni geografiche, possessivi e gradi dell’aggettivo (2.0 pti) | Lessico culturale curato e ortografia (2.0 pti)',
					clozeSentence: 'Nel XII secolo il cartografo Al-Idrisi lavorò ___ Sicilia e disegnò celebri mappe del Mediterraneo.',
					clozeCorrect: 'in',
					clozeDistractors: ['a', 'su', 'tra'],
					clozeExplanation:
						'الجزيرة الكبرى Sicilia تأخذ دائماً حرف الجر `in` (`in Sicilia`).'
				},
				{
					tracciaUnoPrompt:
						'Descrivi il ponte culturale e storico del Mediterraneo (100-130 parole) citando il ruolo della cartografia di Al-Idrisi e le parole arabe entrate nell’italiano.',
					tracciaUnoPunti: [
						'Posizione dell’Algeria e dell’Italia sulle due rive del Mar Mediterraneo.',
						'Contributo scientifico di Al-Idrisi in Sicilia nel XII secolo.',
						'Esempi di parole condivise (zucchero, limone, dogana, tariffa, arsenale).',
						'Conclusione sull’importanza dello studio delle lingue per il dialogo rispettoso.'
					],
					tracciaDuePrompt:
						'Confronta la vita di campagna e la vita di città attraverso l’esperienza della tua famiglia (100-130 parole), usando comparativi di maggioranza, minoranza e uguaglianza.',
					modelAnswer:
						'Il Mar Mediterraneo non divide l’Africa dall’Europa, ma unisce da secoli le rive dell’Algeria e dell’Italia attraverso gli scambi scientifici e linguistici. Già nel XII secolo, il grande geografo Al-Idrisi soggiornò in Sicilia e disegnò carte geografiche tra le più precise della sua epoca.\n\nGrazie a questi contatti continui, numerose parole arabe sono entrate stabilmente nella lingua italiana quotidiana, come zucchero, limone, zafferano, dogana, tariffa e arsenale. Quando noi studenti di 2AS LE scopriamo questi vocaboli, capiamo quanto sia profonda la nostra memoria condivisa.\n\nIn conclusione, studiare la lingua e la geografia del Mediterraneo ci aiuta a coltivare il dialogo, la curiosità intellettuale e il rispetto reciproco.',
					rubricSummary:
						'Chiarezza espositiva e precisione storica e geografica (2.0 pti) | Controllo di Passato Prossimo, Imperfetto, preposizioni e superlativi (2.0 pti) | Coesione lessicale e assenza di errori ortografici (2.0 pti)',
					clozeSentence: 'Questo dizionario bilingue è molto più completo ___ vecchio manuale scolastico.',
					clozeCorrect: 'del',
					clozeDistractors: ['che', 'nel', 'sul'],
					clozeExplanation:
						'عند المقارنة بين اسمين (questo dizionario و il vecchio manuale) نستعمل di التي تندمج مع il لتصبح del.'
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
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'cloze',
					questionText: 'Completa la frase con la parola grammaticale corretta:',
					questionTextAr: 'أكمل الجملة الإيطالية بالكلمة النحوية الصحيحة:',
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
					instruction: 'Scegli UNA delle due tracce e scrivi una produzione coerente e curata (100-130 parole) :',
					content: [block]
				},
				hints: [
					'في السرد الماضي اجمع بين Imperfetto للوصف والطقس و Passato Prossimo للأحداث المنجزة.',
					'تأكد من حذف أداة التعريف أمام صفات الملكية مع المفرد القرابي المجرد دون loro.',
					'راجع حروف الجر الجغرافية (in للدول والجزر الكبرى و a للمدن) قبل تسليم الورقة.'
				],
				solutionStepsAr: [
					'استيفاء الموضوع المختار والالتزام بالتوجيهات (2.0 نقطة).',
					'الاستعمال السليم لأزمنة الماضي والملكية وحروف الجر (2.0 نقطة).',
					'سلامة اللغة والترقيم وتنظيم الفقرات (2.0 نقطة).'
				],
				finalAnswer: v.clozeCorrect
			};
		}
	}
];
