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

export const TEMPLATES_2AS_LE_T1: ItalianParameterizedTemplate[] = [
	// 1. Comprensione del testo (7 pti) — true_false quiz
	{
		id: 'ita_tpl_2as_le_t1_comp_giornata_liceo',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'comprensione_testo',
		titleAr: 'I. Comprensione del testo : La giornata scolastica al liceo e la famiglia (7 pti)',
		curriculumLessonId: 'ita_lesson_2as_le_t1_vita_quotidiana_scuola',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					useIllus: true,
					passageTitle: 'La giornata scolastica di Karim a Costantina',
					paragraphs: [
						'Mi chiamo Karim, ho sedici anni e frequento il secondo anno di Lingue Straniere in un liceo di Costantina. Vivo con i miei genitori e mia sorella minore Salma in una casa tranquilla vicino alla biblioteca comunale. Ogni mattina mi sveglio alle sei e mezza, mi alzo subito e faccio una colazione semplice insieme alla mia famiglia.',
						'Alle otto meno dieci arrivo al liceo a piedi con il mio compagno di classe Yassin. Durante le lezioni ascoltiamo con attenzione i professori, leggiamo dialoghi in italiano e consultiamo il [[dizionario]] bilingue per imparare nuovi vocaboli senza tradurre alla lettera.',
						'Il pomeriggio torno a casa alle quattro, riordino la mia scrivania e dedico due ore ai compiti. Nel tempo libero preferisco leggere testi storici, praticare il nuoto e aiutare i miei genitori nei lavori domestici, perché una buona organizzazione rende sereno [[ogni giorno]].'
					],
					source: 'Diario scolastico di 2AS LE (testo adattato)',
					glossary: [
						{ term: 'compagno di classe', meaning: 'studente che frequenta la stessa aula' },
						{ term: 'sereno', meaning: 'calmo, equilibrato e privo di agitazione' }
					],
					q1: '1. Chi è Karim (età, città, indirizzo scolastico) e come si svolge la sua mattina prima di entrare in classe?',
					a1: 'Karim ha sedici anni, vive a Costantina e frequenta il secondo anno di Lingue Straniere. La mattina si sveglia alle sei e mezza, si alza subito, fa colazione in famiglia e va al liceo a piedi con il suo compagno Yassin.',
					tfItems: [
						{
							q: 'Karim abita da solo lontano dalla sua famiglia.',
							a: 'Falso',
							c: 'Vive con i suoi genitori e sua sorella minore Salma (§1).',
							mark: '0.5'
						},
						{
							q: 'In classe gli studenti usano il dizionario bilingue per capire le nuove parole.',
							a: 'Vero',
							c: 'Consultano il dizionario bilingue per imparare nuovi vocaboli (§2).',
							mark: '0.5'
						},
						{
							q: 'Nel tempo libero Karim evita completamente lo sport e la lettura.',
							a: 'Falso',
							c: 'Preferisce leggere testi storici, praticare il nuoto e aiutare i genitori (§3).',
							mark: '0.5'
						}
					],
					q3: '3. Cerca nel testo :\n  a) Il sinonimo di «abitare / risiedere» (§1) e il contrario di «rumorosa» (§1).\n  b) Quattro parole appartenenti al campo lessicale della scuola (§2-§3).',
					a3: 'a) Sinonimo: «vivo» (vivere); Contrario di rumorosa: «tranquilla». | b) Campo lessicale: liceo, lezioni, professori, dizionario, vocaboli, compiti.',
					q4: '4. A che cosa si riferiscono le parole sottolineate nel testo «dizionario» (§2) e «ogni giorno» (§3)? Indica anche due verbi riflessivi presenti nel §1.',
					a4: '«dizionario» è lo strumento bilingue consultato in classe per imparare nuovi vocaboli; «ogni giorno» indica tutte le giornate rese serene da una buona organizzazione. Due verbi riflessivi del §1: «mi sveglio» (svegliarsi) e «mi alzo» (alzarsi).',
					quizStatement:
						'Secondo il testo, Karim arriva al liceo a piedi insieme al compagno Yassin e organizza con ordine il pomeriggio tra studio, lettura, sport e famiglia.',
					quizCorrect: true,
					quizExplanation:
						'العبارة صحيحة: تؤكد الفقرتان الثانية والثالثة أن كريم يذهب مشياً مع زميله ياسين وينظم مساءه بين المراجعة والمطالعة والسباحة ومساعدة والديه.'
				},
				{
					useIllus: false,
					passageTitle: 'Una settimana equilibrata tra famiglia e liceo',
					paragraphs: [
						'Per uno studente del secondo anno di Lingue Straniere, l’equilibrio tra studio e vita familiare è il segreto principale del successo. Amina vive ad Algeri con i suoi nonni e i suoi genitori: in casa tutti collaborano con rispetto affinché l’ambiente resti ordinato e accogliente.',
						'Ogni mattina Amina si prepara con calma: controlla l’orario scolastico, mette nello zaino i quaderni, l’astuccio e l’agenda, poi saluta la famiglia con un sorriso. A scuola partecipa attivamente alle lezioni di arabo, inglese e italiano e prende appunti precisi su [[ogni argomento]].',
						'Alla fine della settimana, Amina rivede le regole grammaticali insieme a sua cugina Nadia, prepara un riassunto chiaro e lascia spazio al riposo e a una passeggiata nel parco. Secondo [[lei]], la costanza vale molto più della fretta dell’ultimo momento.'
					],
					source: 'Quaderno pedagogico giovanile (testo adattato)',
					glossary: [
						{ term: 'appunti', meaning: 'note scritte rapidamente durante la spiegazione del professore' },
						{ term: 'costanza', meaning: 'impegno continuo e regolare nel tempo' }
					],
					q1: '1. Che cosa mette Amina nello zaino prima di uscire e con quali gesti dimostra responsabilità verso lo studio?',
					a1: 'Mette nello zaino i quaderni, l’astuccio e l’agenda. Dimostra responsabilità controllando l’orario, partecipando attivamente alle lezioni, prendendo appunti precisi e rivedendo la grammatica a fine settimana con metodo.',
					tfItems: [
						{
							q: 'Nella famiglia di Amina nessuno collabora nelle attività di casa.',
							a: 'Falso',
							c: 'In casa tutti collaborano con rispetto per mantenere un ambiente ordinato (§1).',
							mark: '0.5'
						},
						{
							q: 'Amina studia tre lingue tra cui l’arabo, l’inglese e l’italiano.',
							a: 'Vero',
							c: 'Partecipa attivamente alle lezioni di arabo, inglese e italiano (§2).',
							mark: '0.5'
						},
						{
							q: 'Amina preferisce studiare soltanto la sera prima della verifica.',
							a: 'Falso',
							c: 'Crede che la costanza valga molto più della fretta dell’ultimo momento (§3).',
							mark: '0.5'
						}
					],
					q3: '3. Trova nel testo :\n  a) Il sinonimo di «calma / serenità» (§2) e il contrario di «disordinato» (§1).\n  b) Tre nomi di parentela citati nel testo.',
					a3: 'a) Sinonimo: «calma»; Contrario di disordinato: «ordinato». | b) Nomi di parentela: nonni, genitori, cugina.',
					q4: '4. A che cosa si riferiscono le espressioni sottolineate «ogni argomento» (§2) e «lei» (§3)?',
					a4: '«ogni argomento» si riferisce ai temi trattati nelle lezioni di arabo, inglese e italiano; «lei» si riferisce ad Amina.',
					quizStatement:
						'Secondo Amina, studiare tutto in fretta all’ultimo momento garantisce risultati migliori rispetto alla costanza settimanale.',
					quizCorrect: false,
					quizExplanation:
						'العبارة خاطئة: تؤكد الفقرة الثالثة أن أمينة ترى أن المواظبة المنتظمة أفضل بكثير من التسرع في اللحظة الأخيرة.'
				},
				{
					useIllus: true,
					passageTitle: 'Il dialogo di accoglienza nel corso di italiano',
					paragraphs: [
						'All’inizio dell’anno scolastico, la professoressa di italiano invita la classe a presentare le proprie abitudini quotidiane. Il primo a parlare è Sami: spiega che abita a Orano, ha diciassette anni e si alza alle sei per studiare con la mente fresca prima che inizi il traffico cittadino.',
						'Subito dopo interviene Meriem, che descrive il suo quartiere: davanti alla sua casa c’è una piazza alberata e dietro al palazzo si trova la [[fermata]] dell’autobus per andare al liceo. In aula gli alunni ascoltano le risposte dei compagni con grande attenzione ed educazione.',
						'Alla fine dell’ora, la docente scrive alla lavagna tre regole semplici: preparare sempre il materiale la sera prima, chiedere chiarimenti quando non si capisce una regola e coltivare [[l’amicizia sincera]] tra compagni di scuola.'
					],
					source: 'Manuale scolastico di dialogo e civiltà (testo adattato)',
					glossary: [
						{ term: 'piazza alberata', meaning: 'spazio pubblico urbano piantato con alberi' },
						{ term: 'lavagna', meaning: 'superficie scura o bianca su cui si scrive in classe' }
					],
					q1: '1. Perché Sami preferisce svegliarsi alle sei del mattino e quali tre consigli dà la professoressa alla fine della lezione?',
					a1: 'Sami si sveglia alle sei per studiare con la mente fresca prima del traffico cittadino. La professoressa consiglia di preparare il materiale la sera prima, chiedere chiarimenti quando non si capisce una regola e coltivare l’amicizia sincera tra compagni.',
					tfItems: [
						{
							q: 'Sami abita a Costantina e si sveglia sempre alle nove.',
							a: 'Falso',
							c: 'Sami abita a Orano e si sveglia alle sei del mattino (§1).',
							mark: '0.5'
						},
						{
							q: 'Dietro al palazzo dove vive Meriem c’è la fermata dell’autobus per il liceo.',
							a: 'Vero',
							c: 'Lo afferma chiaramente nel §2 descrivendo il quartiere.',
							mark: '0.5'
						},
						{
							q: 'La docente incoraggia gli studenti a chiedere spiegazioni in caso di dubbi.',
							a: 'Vero',
							c: 'Scrive alla lavagna di chiedere chiarimenti quando non si capisce una regola (§3).',
							mark: '0.5'
						}
					],
					q3: '3. Cerca nel testo :\n  a) Il sinonimo di «studenti» (§2) e il contrario di «silenzio / caos» o «alla fine» (§1-§3).\n  b) Due preposizioni di luogo presenti nel §2.',
					a3: 'a) Sinonimo di studenti: «alunni» o «compagni»; Contrario di «alla fine» (§3): «all’inizio» (§1). | b) Preposizioni di luogo: davanti a, dietro a.',
					q4: '4. A che cosa si riferiscono «fermata» (§2) e «l’amicizia sincera» (§3)? Indica il significato dell’espressione «con la mente fresca» (§1).',
					a4: '«fermata» è il punto di sosta dell’autobus dietro al palazzo di Meriem; «l’amicizia sincera» è il legame di rispetto e lealtà tra compagni di classe. «Con la mente fresca» significa con lucidità e riposo mentale per concentrarsi meglio.',
					quizStatement:
						'Nel corso di italiano, la docente consiglia agli studenti di preparare il materiale scolastico la sera prima e di chiedere chiarimenti in classe.',
					quizCorrect: true,
					quizExplanation:
						'العبارة صحيحة: تكتب الأستاذة على السبورة في الفقرة الثالثة ثلاث قواعد من بينها تحضير الأدوات مساءً وطلب التوضيح عند عدم الفهم.'
				}
			];

			const v = rng.pick(variants);
			const content: ContentBlock[] = [];
			if (v.useIllus) {
				content.push(
					buildIllustratedFigureBlock('ita_03_istruzione_lingue_biblioteca', {
						lang: 'it',
						mode: 'labeled',
						pins: [],
						width: '62%',
						maxHeight: 118,
						caption: 'Istruzione, lingue straniere e vita scolastica al liceo (2AS LE)'
					})
				);
			}
			content.push(
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
					questionTextAr: 'حدد صحة أو خطأ العبارة الآتية حسب النص:',
					questionData: {
						correctAnswer: v.quizCorrect
					},
					explanation: v.quizExplanation
				},
				sujetExercise: {
					customTitle: 'I. Comprensione del testo',
					points: 7,
					instruction: 'Leggi attentamente il testo e rispondi con precisione alle domande :',
					content
				},
				hints: [
					'اقرأ الفقرات الثلاث بتأنٍّ وحدد موقع الإجابة في كل فقرة (§1، §2، §3).',
					'في أسئلة Vero / Falso استشهد دائماً بالعبارة الدقيقة من النص في التعليل.',
					'تأكد من عائد الكلمة المسطرة بقراءة الجملة التي تسبقها مباشرة.'
				],
				solutionStepsAr: [
					'الإجابة عن سؤال الفهم الصريح من النص (2.0 نقطة).',
					'تحديد الصواب والخطأ مع التعليل النصي (1.5 نقطة).',
					'استخراج المترادفات والأضداد والحقل المعجمي (2.0 نقطة).',
					'تحديد العائد النصي والظواهر الصرفية أو المكانية (1.5 نقطة).'
				],
				finalAnswer: v.quizCorrect ? 'Vero' : 'Falso'
			};
		}
	},

	// 2. Comprensione del testo (7 pti) — mcq quiz
	{
		id: 'ita_tpl_2as_le_t1_comp_biblioteca_studio',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'cultura_civilta',
		titleAr: 'I. Comprensione del testo : La biblioteca, la casa e il valore dello studio (7 pti)',
		curriculumLessonId: 'ita_lesson_2as_le_t1_casa_citta_abitudini',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					useIllus: true,
					passageTitle: 'La biblioteca comunale e il valore dello studio',
					paragraphs: [
						'Nel cuore del nostro quartiere, proprio di fronte a un giardino pieno di alberi, c’è una biblioteca comunale luminosa e accogliente. All’interno ci sono lunghi tavoli di legno, scaffali ben ordinati e centinaia di libri di storia, scienze e lingue straniere.',
						'Ogni martedì e giovedì pomeriggio, dopo le lezioni, Tariq e i suoi compagni vanno in [[questa sala silenziosa]] per fare ricerche e preparare le schede di lettura. Invece di perdere tempo davanti al telefono, i ragazzi si scambiano i dizionari, confrontano gli appunti e si aiutano con rispetto.',
						'Secondo il bibliotecario, leggere venti minuti al giorno arricchisce il pensiero e migliora anche la scrittura. Così la biblioteca non è soltanto un deposito di volumi, ma una vera scuola di metodo, pazienza e [[impegno personale]].'
					],
					source: 'Rivista culturale giovanile (testo adattato)',
					glossary: [
						{ term: 'scaffale', meaning: 'mobile con ripiani orizzontali su cui si sistemano i libri' },
						{ term: 'deposito', meaning: 'luogo chiuso dove si conservano oggetti senza usarli' }
					],
					q1: '1. Dove si trova la biblioteca descritta nel testo e quali elementi si trovano al suo interno?',
					a1: 'La biblioteca si trova nel cuore del quartiere, di fronte a un giardino pieno di alberi. Al suo interno ci sono lunghi tavoli di legno, scaffali ordinati e centinaia di libri di storia, scienze e lingue straniere.',
					mcGroups: [
						{
							header: 'a) Quando vanno in biblioteca Tariq e i suoi compagni?',
							options: [
								'Solo durante le vacanze estive',
								'Ogni martedì e giovedì pomeriggio dopo le lezioni',
								'La mattina presto prima dell’alba'
							],
							correct: 'Ogni martedì e giovedì pomeriggio dopo le lezioni',
							mark: '1.0'
						},
						{
							header: 'b) Quale valore educativo attribuisce il testo alla lettura quotidiana?',
							options: [
								'Arricchisce il pensiero e migliora la scrittura',
								'Sostituisce completamente tutti i professori',
								'Serve solo a memorizzare numeri di telefono'
							],
							correct: 'Arricchisce il pensiero e migliora la scrittura',
							mark: '1.0'
						}
					],
					q3: '3. Cerca nel testo :\n  a) Il sinonimo di «migliorano / rendono più ricco» (un verbo nel §3) e il contrario di «rumorosa» (§2).\n  b) Tre parole legate ai libri e alla ricerca.',
					a3: 'a) Sinonimo: «arricchisce» (arricchire); Contrario di rumorosa: «silenziosa». | b) Campo lessicale: biblioteca, scaffali, libri, ricerche, schede di lettura, dizionari, scrittura.',
					q4: '4. A che cosa si riferiscono le espressioni sottolineate «questa sala silenziosa» (§2) e «impegno personale» (§3)?',
					a4: '«questa sala silenziosa» si riferisce alla biblioteca comunale descritta nel §1; «impegno personale» indica la serietà e la dedizione individuale di chi studia con costanza.',
					mcqQuestion: 'Perché il testo afferma che la biblioteca non è soltanto un semplice deposito di volumi?',
					mcqQuestionAr: 'لماذا يؤكد النص أن المكتبة ليست مجرد مستودع للكتب؟',
					mcqCorrect: 'Perché educa gli studenti al metodo, alla pazienza, alla collaborazione e alla scrittura chiara',
					mcqDistractors: [
						{
							text: 'Perché vi si vendono telefoni e videogiochi agli studenti',
							diagnosticFeedback: 'خطأ: النص يثمن البعد عن تضييع الوقت أمام الهاتف.'
						},
						{
							text: 'Perché gli scaffali sono vuoti e non contengono dizionari',
							diagnosticFeedback: 'خطأ: تحتوي على مئات الكتب والقواميس.'
						},
						{
							text: 'Perché vi entrano soltanto gli insegnanti di educazione fisica',
							diagnosticFeedback: 'خطأ: يرتادها التلاميذ للمطالعة والبحث.'
						}
					],
					mcqExplanation:
						'تبيّن الفقرة الثالثة أن المكتبة مدرسة للمنهجية والصبر والاجتهاد الشخصي وتبادل المعرفة.'
				},
				{
					useIllus: false,
					passageTitle: 'La nostra casa e la camera da studio di Salma',
					paragraphs: [
						'La famiglia di Salma abita in una casa spaziosa in un quartiere calmo di Tlemcen. Al piano terra ci sono un soggiorno luminoso, dove genitori e figli conversano la sera, e una cucina pulita che dà su un piccolo cortile fiorito.',
						'Al primo piano c’è la camera da studio di Salma: vicino alla finestra si trova una scrivania in ordine con una lampada, un dizionario d’italiano e una libreria piena di atlanti e racconti. Su [[quelle mensole]] ogni oggetto ha un posto preciso perché Salma capisce l’importanza dell’ordine.',
						'Prima di cenare, Salma finisce sempre i suoi esercizi e prepara lo zaino per il giorno dopo. [[Questa buona abitudine]] le permette di dormire serena e di arrivare a scuola puntuale.'
					],
					source: 'Pagine di vita quotidiana (testo adattato)',
					glossary: [
						{ term: 'cortile fiorito', meaning: 'spazio interno aperto decorato con fiori e piante' },
						{ term: 'mensole', meaning: 'ripiani fissati al muro per appoggiare libri' }
					],
					q1: '1. Descrivi gli spazi principali della casa di Salma al piano terra e al primo piano.',
					a1: 'Al piano terra ci sono un soggiorno luminoso e una cucina pulita affacciata su un cortile fiorito; al primo piano c’è la camera da studio di Salma con una scrivania vicino alla finestra, una lampada, un dizionario e una libreria.',
					mcGroups: [
						{
							header: 'a) Che cosa fa la famiglia la sera nel soggiorno?',
							options: [
								'Genitori e figli conversano insieme',
								'Preparano le valigie per partire ogni sera',
								'Riparano le automobili del quartiere'
							],
							correct: 'Genitori e figli conversano insieme',
							mark: '1.0'
						},
						{
							header: 'b) Perché Salma sistema con cura ogni libro sulle mensole?',
							options: [
								'Perché capisce il valore dell’ordine nello studio',
								'Perché vuole nascondere i suoi compiti',
								'Perché non ha una scrivania in camera'
							],
							correct: 'Perché capisce il valore dell’ordine nello studio',
							mark: '1.0'
						}
					],
					q3: '3. Trova nel testo :\n  a) Il sinonimo di «ampia / grande» (§1) e il contrario di «in ritardo» (§3).\n  b) Quattro parole appartenenti al campo lessicale della casa.',
					a3: 'a) Sinonimo: «spaziosa»; Contrario di in ritardo: «puntuale». | b) Campo lessicale: casa, piano terra, soggiorno, cucina, cortile, camera, finestra, scrivania.',
					q4: '4. A che cosa si riferiscono «quelle mensole» (§2) e «Questa buona abitudine» (§3)?',
					a4: '«quelle mensole» si riferisce ai ripiani della libreria nella camera di Salma; «Questa buona abitudine» si riferisce al finire gli esercizi e preparare lo zaino la sera prima di cenare.',
					mcqQuestion: 'Quale effetto positivo produce l’abitudine serale di Salma descritta nel §3?',
					mcqQuestionAr: 'ما الأثر الإيجابي لعادة سلمى المسائية الموصوفة في الفقرة الثالثة؟',
					mcqCorrect: 'Le consente di riposare con serenità e di presentarsi a scuola in orario',
					mcqDistractors: [
						{
							text: 'La obbliga a studiare fino alle due di notte',
							diagnosticFeedback: 'خطأ: هي تنهي واجباتها قبل العشاء لتنام مطمئنة.'
						},
						{
							text: 'Le impedisce di parlare con i suoi genitori',
							diagnosticFeedback: 'خطأ: تتحاور الأسرة مساءً في غرفة الجلوس.'
						},
						{
							text: 'Rende disordinata la sua scrivania',
							diagnosticFeedback: 'خطأ: مكتبها منظم ومرتب.'
						}
					],
					mcqExplanation:
						'إنهاء الواجبات وتحضير المحفظة قبل العشاء يضمنان نوماً هادئاً ووصولاً منتظماً في الوقت المحدد.'
				},
				{
					useIllus: true,
					passageTitle: 'Studiare le lingue straniere con metodo al liceo',
					paragraphs: [
						'Frequentare l’indirizzo di Lingue Straniere apre agli studenti una finestra preziosa sulla cultura e sulla comunicazione internazionale. Tuttavia, imparare bene una lingua come l’italiano richiede esercizi regolari di ascolto, lettura ad alta voce e scrittura.',
						'Nel laboratorio linguistico del liceo, gli allievi leggono brevi testi sulla vita quotidiana, annotano le preposizioni articolate e coniugano i verbi riflessivi al presente. Ogni gruppo prepara poi una breve scheda su [[un argomento scolastico]] per presentarla con chiarezza davanti ai compagni.',
						'Quando si studia insieme con rispetto e serietà, gli errori diventano occasioni utili per capire meglio. In [[questo clima costruttivo]], tutti gli studenti acquisiscono fiducia e migliorano settimana dopo settimana.'
					],
					source: 'Bollettino scolastico di Lingue Straniere (testo adattato)',
					glossary: [
						{ term: 'allievi', meaning: 'studenti, alunni di una scuola' },
						{ term: 'acquisire fiducia', meaning: 'diventare più sicuri delle proprie capacità' }
					],
					q1: '1. Che cosa richiede lo studio efficace dell’italiano secondo il §1 e quali attività svolgono gli allievi nel laboratorio linguistico?',
					a1: 'Richiede esercizi regolari di ascolto, lettura ad alta voce e scrittura. Nel laboratorio gli allievi leggono testi sulla vita quotidiana, annotano le preposizioni articolate, coniugano i verbi riflessivi e preparano schede da presentare in gruppo.',
					mcGroups: [
						{
							header: 'a) Come vengono considerati gli errori durante lo studio serio in gruppo?',
							options: [
								'Occasioni utili per capire meglio la regola',
								'Motivo per abbandonare la lettura',
								'Prove impossibili da correggere'
							],
							correct: 'Occasioni utili per capire meglio la regola',
							mark: '1.0'
						},
						{
							header: 'b) Su quale tema grammaticale si esercitano gli alunni nel §2?',
							options: [
								'Preposizioni articolate e verbi riflessivi al presente',
								'Soltanto numeri telefonici e prezzi',
								'Nomi di animali marini esotici'
							],
							correct: 'Preposizioni articolate e verbi riflessivi al presente',
							mark: '1.0'
						}
					],
					q3: '3. Cerca nel testo :\n  a) Il sinonimo di «studenti» (§2) e il contrario di «distruggere / peggiorano» (un verbo nel §3).\n  b) Tre espressioni legate all’apprendimento linguistico (§1-§2).',
					a3: 'a) Sinonimo: «allievi» o «alunni»; Contrario di peggiorano: «migliorano». | b) Apprendimento: ascolto, lettura ad alta voce, scrittura, preposizioni articolate, verbi riflessivi.',
					q4: '4. A che cosa si riferiscono «un argomento scolastico» (§2) e «questo clima costruttivo» (§3)?',
					a4: '«un argomento scolastico» indica il tema scelto da ciascun gruppo per la propria scheda educativa; «questo clima costruttivo» si riferisce all’ambiente di lavoro serio, rispettoso e collaborativo in cui gli errori aiutano a imparare.',
					mcqQuestion: 'Quale atteggiamento favorisce i progressi settimanali degli studenti secondo l’ultimo paragrafo?',
					mcqQuestionAr: 'ما السلوك الذي يدعم التقدم الأسبوعي للتلاميذ حسب الفقرة الأخيرة؟',
					mcqCorrect: 'Collaborare con rispetto e trasformare ogni errore in una lezione per capire meglio',
					mcqDistractors: [
						{
							text: 'Evitare qualsiasi esercizio di scrittura o lettura ad alta voce',
							diagnosticFeedback: 'خطأ: القراءة الجهرية والكتابة ركيزتان أساسيتان في الفقرة الأولى.'
						},
						{
							text: 'Lavorare senza mai confrontarsi con il professore né coi compagni',
							diagnosticFeedback: 'خطأ: العمل الجماعي المحترم أساس الجو البنّاء.'
						},
						{
							text: 'Abbandonare la scheda al primo sbaglio grammaticale',
							diagnosticFeedback: 'خطأ: الخطأ فرصة مفيدة للفهم.'
						}
					],
					mcqExplanation:
						'توضح الفقرة الثالثة أن التعاون المحترم وتحويل الأخطاء إلى فرص للفهم يبنيان الثقة والتقدم المستمر.'
				}
			];

			const v = rng.pick(variants);
			const mcq = buildUniqueMcqOptions(v.mcqCorrect, v.mcqDistractors, rng);
			const content: ContentBlock[] = [];
			if (v.useIllus) {
				content.push(
					buildIllustratedFigureBlock('ita_03_istruzione_lingue_biblioteca', {
						lang: 'it',
						mode: 'labeled',
						pins: [],
						width: '62%',
						maxHeight: 118,
						caption: 'Biblioteca, studio delle lingue e buone abitudini (2AS LE)'
					})
				);
			}
			content.push(
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
					content: '2. Scegli la risposta corretta secondo il testo :',
					mark: ''
				},
				{ type: 'multiple_choice', groups: v.mcGroups },
				{ type: 'text', content: v.q3, answer: v.a3, mark: '1.5' },
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
					instruction: 'Leggi con attenzione il brano e svolgi le attività di comprensione :',
					content
				},
				hints: [
					'اربط بين المعجم الوارد في النص والفقرة المعنية قبل اختيار الجواب الصحيح.',
					'ابحث عن المترادفات والأضداد في النص ضمن نفس الفئة الصرفية (اسم لاسم وفعل لفعل).',
					'انتبه لحروف الجر المكانية وتعبيرات التنظيم الدراسي.'
				],
				solutionStepsAr: [
					'الإجابة عن سؤال الفهم الافتتاحي (2.0 نقطة).',
					'اختيار الإجابتين الصحيحتين في الاختيار من متعدد (2.0 نقطة).',
					'استخراج المترادفات والأضداد والحقل المعجمي (1.5 نقطة).',
					'تحديد العائد النصي بدقة (1.5 نقطة).'
				],
				finalAnswer: v.mcqCorrect
			};
		}
	},

	// 3. Competenza linguistica (7 pti) — matching quiz + saveItalianSvgAsset
	{
		id: 'ita_tpl_2as_le_t1_ling_presente_riflessivi',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'coniugazione_modi',
		titleAr: 'II. Competenza linguistica : Presente indicativo, verbi riflessivi e derivazione (7 pti)',
		curriculumLessonId: 'ita_lesson_2as_le_t1_presente_verbi_riflessivi',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					svgSlug: 'ita_2as_t1_ling_presente_v0',
					svgContent: svgItalianTenseTimeline({
						title: 'Routine quotidiana e studi',
						tenseName: 'Presente Indicativo',
						formula: '-are / -ere / -ire (-isc-) + riflessivi (mi, ti, si, ci, vi, si)',
						activeZone: 'present',
						example: 'Ogni giorno mi alzo presto, vado al liceo e finisco i compiti.',
						markers: 'ogni mattina, sempre, di solito, spesso, adesso',
						width: 560
					}),
					svgCaption: 'Schema del Presente Indicativo e dei verbi riflessivi nella routine',
					wfRows: [
						{
							verbo: { given: true, value: 'organizzare' },
							sostantivo: { value: 'organizzazione', mark: '0.5' },
							aggettivo: { value: 'organizzato/a', mark: '0.5' }
						},
						{
							verbo: { value: 'educare', mark: '0.5' },
							sostantivo: { given: true, value: 'educazione' },
							aggettivo: { value: 'educato/a', mark: '0.5' }
						}
					],
					q2: '2. Coniuga i verbi tra parentesi al Presente Indicativo (attenzione ai verbi in -isc- e irregolari) :\n  a) Gli studenti di 2AS (finire) il riassunto prima di pranzo.\n  b) Noi (capire) sempre l’importanza della lettura quotidiana.\n  c) La mattina io (fare) colazione e poi (andare) a scuola a piedi.',
					a2: 'a) finiscono (verbo in -isc- alla 3ª plurale).\n  b) capiamo (senza -isc- con noi).\n  c) faccio / vado (irregolari alla 1ª singolare).',
					q3: '3. Trasforma le frasi coniugando correttamente i verbi riflessivi al Presente :\n  a) Io (alzarsi) alle sei e (lavarsi) la faccia con acqua fresca.\n  b) Tu e tuo fratello (prepararsi) sempre con ordine la sera.\n  c) I miei compagni (svegliarsi) presto per arrivare puntuali.',
					a3: 'a) mi alzo / mi lavo.\n  b) vi preparate (voi).\n  c) si svegliano (loro).',
					q4: '4. Completa con i verbi modali (dovere, potere, volere) e il verbo «uscire» al Presente :\n  a) Ogni mattina mia madre (uscire) di casa alle otto.\n  b) Noi (dovere) rispettare le regole della biblioteca.\n  c) Voi (potere) consultare il dizionario bilingue durante la lettura.',
					a4: 'a) esce.\n  b) dobbiamo.\n  c) potete.',
					pairs: [
						{ left: 'alzarsi (io, Presente)', right: 'mi alzo' },
						{ left: 'capire (noi, Presente)', right: 'capiamo' },
						{ left: 'finire (loro, Presente)', right: 'finiscono' },
						{ left: 'uscire (io, Presente)', right: 'esco' }
					],
					explanation:
						'يتصرف alzarsi مع mi (mi alzo)، وتسقط -isc- في noi (capiamo) وتعود في loro (finiscono)، بينما uscire يصبح esco مع io.'
				},
				{
					svgSlug: 'ita_2as_t1_ling_presente_v1',
					svgContent: svgItalianConjugationChart({
						title: 'Verbi chiave del Presente Indicativo',
						subtitle: 'Regolari, gruppo -isc- e irregolari quotidiani',
						width: 560,
						columns: [
							{
								header: 'Gruppo -isc-',
								rule: 'isc solo in io/tu/lui/loro',
								examples: 'finisco, capisci, finiamo'
							},
							{
								header: 'Irregolari (io/noi)',
								rule: 'Radici variabili',
								examples: 'vado/andiamo, faccio/facciamo'
							},
							{
								header: 'Riflessivi',
								rule: 'mi, ti, si, ci, vi, si',
								examples: 'mi preparo, ci alziamo'
							}
						]
					}),
					svgCaption: 'Tavola riassuntiva del Presente Indicativo e dei riflessivi',
					wfRows: [
						{
							verbo: { given: true, value: 'rispettare' },
							sostantivo: { value: 'rispetto', mark: '0.5' },
							aggettivo: { value: 'rispettoso/a', mark: '0.5' }
						},
						{
							verbo: { value: 'studiare', mark: '0.5' },
							sostantivo: { value: 'studio / studente', mark: '0.5' },
							aggettivo: { given: true, value: 'studioso/a' }
						}
					],
					q2: '2. Completa le frasi coniugando i verbi al Presente Indicativo :\n  a) A scuola io e Nadia (preferire) leggere nella biblioteca silenziosa.\n  b) Il professore (dire) sempre che la lettura migliora la scrittura.\n  c) Voi (venire) in aula in orario e (aprire) subito i quaderni.',
					a2: 'a) preferiamo (noi, senza -isc-).\n  b) dice (dire irregolare).\n  c) venite / aprite.',
					q3: '3. Inserisci il verbo riflessivo adatto al Presente (svegliarsi, vestirsi, pettinarsi, addormentarsi) :\n  a) La mattina Sara ............ alle sei e mezzo.\n  b) Poi noi ............ velocemente prima di fare colazione.\n  c) La sera i bambini ............ presto dopo aver letto un racconto.',
					a3: 'a) si sveglia.\n  b) ci vestiamo (o ci prepariamo / ci pettiniamo).\n  c) si addormentano.',
					q4: '4. Scegli la forma esatta tra «essere» e «avere» al Presente :\n  a) Io ............ sedici anni e ............ molto contento del mio liceo.\n  b) I miei zii ............ una casa luminosa vicino al mare.\n  c) Tu e Marco ............ amici sinceri da molti anni.',
					a4: 'a) ho / sono.\n  b) hanno.\n  c) siete.',
					pairs: [
						{ left: 'fare (noi, Presente)', right: 'facciamo' },
						{ left: 'andare (loro, Presente)', right: 'vanno' },
						{ left: 'prepararsi (noi, Presente)', right: 'ci prepariamo' },
						{ left: 'preferire (tu, Presente)', right: 'preferisci' }
					],
					explanation:
						'الأفعال الشاذة الأساسية: fare -> facciamo، andare -> vanno؛ والانعكاسي مع noi يأخذ ci (ci prepariamo)؛ و preferire يأخذ -isc- مع tu (preferisci).'
				},
				{
					svgSlug: 'ita_2as_t1_ling_presente_v2',
					svgContent: svgItalianConjugationChart({
						title: 'Pronomi riflessivi e irregolari',
						subtitle: 'La giornata tipo dello studente responsabile',
						width: 560,
						columns: [
							{
								header: 'Singolare riflessivo',
								rule: 'io mi / tu ti / lui-lei si',
								examples: 'mi sveglio, ti vesti, si lava'
							},
							{
								header: 'Plurale riflessivo',
								rule: 'noi ci / voi vi / loro si',
								examples: 'ci alziamo, vi preparate'
							},
							{
								header: 'Modali + Infinito',
								rule: 'dovere / potere / volere',
								examples: 'devo studiare, posso leggere'
							}
						]
					}),
					svgCaption: 'Coniugazione dei verbi riflessivi e modali al Presente',
					wfRows: [
						{
							verbo: { given: true, value: 'collaborare' },
							sostantivo: { value: 'collaborazione', mark: '0.5' },
							aggettivo: { value: 'collaborativo/a', mark: '0.5' }
						},
						{
							verbo: { value: 'ordinare', mark: '0.5' },
							sostantivo: { given: true, value: 'ordine' },
							aggettivo: { value: 'ordinato/a', mark: '0.5' }
						}
					],
					q2: '2. Coniuga i verbi tra parentesi al Presente Indicativo :\n  a) Ogni sera io (scrivere) le parole nuove nel mio quaderno.\n  b) Mio padre (lavorare) con serietà e (tornare) a casa alle cinque.\n  c) Gli alunni (pulire) i banchi e (chiudere) i libri dopo la verifica.',
					a2: 'a) scrivo.\n  b) lavora / torna.\n  c) puliscono (verbo in -isc-) / chiudono.',
					q3: '3. Riscrivi le frasi al plurale cambiando il soggetto (io -> noi ; lui -> loro) :\n  a) Io mi alzo alle sette ed esco con mio fratello.\n  b) Lui finisce i compiti e va in biblioteca.',
					a3: 'a) Noi ci alziamo alle sette e usciamo con i nostri fratelli (o nostro fratello).\n  b) Loro finiscono i compiti e vanno in biblioteca.',
					q4: '4. Correggi l’errore ortografico o grammaticale presente in ciascuna frase :\n  a) Mio cugino è diciassette anni.\n  b) Noi finisciamo sempre gli esercizi in tempo.\n  c) Io e Karim si prepariamo per l’esame.',
					a4: 'a) Mio cugino ha diciassette anni.\n  b) Noi finiamo sempre gli esercizi in tempo.\n  c) Io e Karim ci prepariamo per l’esame.',
					pairs: [
						{ left: 'venire (io, Presente)', right: 'vengo' },
						{ left: 'dire (noi, Presente)', right: 'diciamo' },
						{ left: 'pulire (loro, Presente)', right: 'puliscono' },
						{ left: 'vestirsi (tu, Presente)', right: 'ti vesti' }
					],
					explanation:
						'تصريف الحاضر: venire -> vengo، dire -> diciamo، pulire -> puliscono (-isc-)، vestirsi -> ti vesti.'
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
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'linguistic_competence',
				quizQuestion: {
					type: 'matching',
					questionText: 'Collega ogni verbo e pronome soggetto a sinistra con la forma coniugata corretta al Presente Indicativo a destra:',
					questionTextAr: 'صل كل فعل وضمير فاعل في العمود الأول بالتصريف الصحيح في المضارع:',
					questionData: {
						pairs: v.pairs
					},
					explanation: v.explanation
				},
				sujetExercise: {
					customTitle: 'II. Competenza linguistica',
					points: 7,
					instruction: 'Svolgi con precisione i seguenti esercizi di lessico e grammatica :',
					content
				},
				hints: [
					'في جدول العائلة اللغوية، لاحظ نهايات الاسم (-zione, -o, -e) ونهايات الصفة (-ato, -oso, -ivo).',
					'تذكّر أن اللاحقة -isc- لا تدخل أبداً على ضميري الجمع الأول والثاني (noi / voi).',
					'طابق الضمير الانعكاسي دائماً مع الفاعل (io mi, noi ci, loro si).'
				],
				solutionStepsAr: [
					'إكمال جدول العائلة اللغوية (2.0 نقطة).',
					'تصريف الأفعال القياسية و-isc- والشاذة في المضارع (2.0 نقطة).',
					'تصريف الأفعال الانعكاسية أو التحويل إلى الجمع (1.5 نقطة).',
					'إتقان الأفعال الناقصة أو تصحيح الأخطاء الشائعة (1.5 نقطة).'
				],
				finalAnswer: v.pairs.map((p) => `${p.left} = ${p.right}`).join(' | ')
			};
		}
	},

	// 4. Competenza linguistica (7 pti) — drag_drop quiz + saveItalianSvgAsset
	{
		id: 'ita_tpl_2as_le_t1_ling_articoli_preposizioni',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'grammatica_sintassi',
		titleAr: 'II. Competenza linguistica : Articoli, preposizioni articolate, c’è / ci sono e accordo (7 pti)',
		curriculumLessonId: 'ita_lesson_2as_le_t1_articoli_preposizioni_semplici_articolate',
		defaultPoints: 7,
		examRole: 'linguistic_competence',
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					svgSlug: 'ita_2as_t1_ling_artprep_v0',
					svgContent: svgItalianGrammarMap({
						title: 'Articoli e Preposizioni Articolate',
						rootLabel: 'Scelta dell’articolo e fusione',
						rootSub: 'il/lo/la/l’ + preposizioni di, a, da, in, su',
						width: 560,
						branches: [
							{
								label: 'IL -> I / UN',
								rule: 'Consonante semplice',
								example: 'il libro, nel banco'
							},
							{
								label: 'LO -> GLI / UNO',
								rule: 's+cons, z, gn, ps',
								example: 'lo zaino, degli studenti'
							},
							{
								label: 'L’ -> GLI / LE',
								rule: 'Vocale (M: un | F: un’)',
								example: 'un amico / un’aula'
							},
							{
								label: 'C’È / CI SONO',
								rule: 'Esistenza e luogo',
								example: 'C’è un parco. Ci sono alberi.'
							}
						]
					}),
					svgCaption: 'Mappa riassuntiva di articoli, preposizioni articolate ed esistenza',
					classPrompt:
						'1. Classifica queste nove parole o espressioni secondo l’articolo determinativo esatto al singolare (zaino, aula, quaderno, studente, amica, dizionario, esercizio, biblioteca, sport) :',
					classCols: [
						{ header: 'il (M consonante)', items: ['quaderno', 'dizionario'], mark: '0.5' },
						{ header: 'lo (M s+cons / z)', items: ['zaino', 'studente', 'sport'], mark: '0.5' },
						{ header: 'la / l’ (F o vocale)', items: ['aula', 'amica', 'esercizio', 'biblioteca'], mark: '0.5' }
					],
					q2: '2. Completa con la preposizione articolata corretta combinando gli elementi tra parentesi :\n  a) I quaderni (di + gli) ............ studenti sono (su + il) ............ tavolo (in + la) ............ biblioteca.\n  b) Ogni mattina vado (a + il) ............ liceo e torno (da + la) ............ scuola alle quattro.\n  c) Metto sempre il dizionario (in + lo) ............ zaino prima di uscire.',
					a2: 'a) degli / sul / nella.\n  b) al / dalla.\n  c) nello.',
					q3: '3. Inserisci l’articolo indeterminativo esatto (un, uno, una, un’) e poi volgi le espressioni al plurale con l’articolo determinativo :\n  a) ............ amico fedele -> ............\n  b) ............ aula spaziosa -> ............\n  c) ............ zaino ordinato -> ............\n  d) ............ biblioteca antica -> ............',
					a3: 'a) un amico fedele -> gli amici fedeli.\n  b) un’aula spaziosa -> le aule spaziose.\n  c) uno zaino ordinato -> gli zaini ordinati.\n  d) una biblioteca antica -> le biblioteche antiche.',
					q4: '4. Completa con «c’è» o «ci sono» e la preposizione di luogo adatta :\n  a) Nel nostro quartiere ............ una bella moschea davanti ............ giardino pubblico.\n  b) Nella mia stanza ............ due librerie piene di testi vicino ............ finestra.\n  c) Dietro ............ liceo ............ un campo sportivo pulito.',
					a4: 'a) c’è / al.\n  b) ci sono / alla.\n  c) al / c’è.',
					ddStem: 'Classifica ciascun sostantivo secondo l’articolo indeterminativo corretto al singolare («un / uno» oppure «una / un’»):',
					ddCategories: ['Maschile : un / uno', 'Femminile : una / un’'],
					ddItems: [
						{ text: 'un orologio nuovo', category: 0 },
						{ text: 'uno studente diligente', category: 0 },
						{ text: 'un’agenda ordinata', category: 1 },
						{ text: 'una città storica', category: 1 }
					]
				},
				{
					svgSlug: 'ita_2as_t1_ling_artprep_v1',
					svgContent: svgItalianConjugationChart({
						title: 'Preposizioni semplici vs articolate',
						subtitle: 'Uso con città, paesi, scuola e oggetti',
						width: 560,
						columns: [
							{
								header: 'Città vs Paesi',
								rule: 'a + città | in + paese',
								examples: 'a Costantina, in Algeria'
							},
							{
								header: 'DI, A, DA, IN, SU',
								rule: 'Si uniscono all’articolo',
								examples: 'del, al, dal, nel, sul'
							},
							{
								header: 'CON, PER, TRA, FRA',
								rule: 'Restano separate',
								examples: 'con lo zaino, per gli amici'
							}
						]
					}),
					svgCaption: 'Tavola delle preposizioni semplici e articolate in italiano',
					classPrompt:
						'1. Classifica queste sei espressioni geografiche e scolastiche nella tabella (in Italia, a Roma, nella biblioteca, in Algeria, a Orano, sul banco) :',
					classCols: [
						{ header: 'in + Paese / Nazione', items: ['in Italia', 'in Algeria'], mark: '0.5' },
						{ header: 'a + Città', items: ['a Roma', 'a Orano'], mark: '0.5' },
						{ header: 'Preposizione articolata', items: ['nella biblioteca', 'sul banco'], mark: '0.5' }
					],
					q2: '2. Completa con la preposizione semplice o articolata giusta (a, in, da, di, sul, nella, degli, alla) :\n  a) Abito ............ Tlemcen, ............ Algeria, e studio ............ liceo di Lingue Straniere.\n  b) Il quaderno ............ mio compagno è ............ scrivania ............ sua stanza.\n  c) Partiamo ............ casa alle sette e mezzo per arrivare in orario ............ lezione.',
					a2: 'a) a / in / al (o nel).\n  b) del / sulla / della.\n  c) da / a (o alla).',
					q3: '3. Correggi i quattro errori relativi ad articoli e concordanza nelle seguenti frasi :\n  a) Ho comprato un’esercizio nuovo per la classe.\n  b) Nel cortile c’è molti alberi verdi.\n  c) Gli zaini sono sopra i scienze naturali.\n  d) Le strade di questo quartiere sono lungi e pulite.',
					a3: 'a) un esercizio nuovo (maschile senza apostrofo).\n  b) ci sono molti alberi verdi (plurale).\n  c) gli scaffali / i libri di scienze (oppure: i libri sono sugli scaffali).\n  d) lunghe e pulite (-ga -> -ghe).',
					q4: '4. Volgi al plurale completo le seguenti espressioni :\n  a) la città accogliente -> ............\n  b) la casa bianca -> ............\n  c) lo strumento utile -> ............',
					a4: 'a) le città accoglienti.\n  b) le case bianche.\n  c) gli strumenti utili.',
					ddStem: 'Classifica ogni espressione nella categoria grammaticale corretta:',
					ddCategories: ['Preposizione articolata esatta', 'Preposizione semplice corretta'],
					ddItems: [
						{ text: 'sul tavolo della cucina', category: 0 },
						{ text: 'degli studenti seri', category: 0 },
						{ text: 'vivo a Costantina', category: 1 },
						{ text: 'studio in Italia', category: 1 }
					]
				},
				{
					svgSlug: 'ita_2as_t1_ling_artprep_v2',
					svgContent: svgItalianGrammarMap({
						title: 'La casa, il quartiere e l’accordo',
						rootLabel: 'Descrivere e localizzare',
						rootSub: 'C’è / ci sono + Locuzioni di luogo + Plurale',
						width: 560,
						branches: [
							{
								label: 'Singolare -> C’è',
								rule: 'Un solo elemento',
								example: 'C’è una finestra grande.'
							},
							{
								label: 'Plurale -> Ci sono',
								rule: 'Due o più elementi',
								example: 'Ci sono tre stanze.'
							},
							{
								label: 'Luogo (a / da)',
								rule: 'vicino a / lontano da',
								example: 'vicino al parco, lontano dal centro'
							},
							{
								label: 'Plurale -ca/-ga',
								rule: 'Aggiunge h (-che/-ghe)',
								example: 'amica -> amiche, lunga -> lunghe'
							}
						]
					}),
					svgCaption: 'Guida visiva per descrivere la casa e il quartiere',
					classPrompt:
						'1. Classifica questi nove vocaboli nei tre campi lessicali della tabella (soggiorno, biblioteca, scrivania, cucina, farmacia, dizionario, balcone, piazza, quaderno) :',
					classCols: [
						{ header: 'La casa', items: ['soggiorno', 'cucina', 'balcone'], mark: '0.5' },
						{ header: 'Il quartiere', items: ['biblioteca', 'farmacia', 'piazza'], mark: '0.5' },
						{ header: 'Lo studio', items: ['scrivania', 'dizionario', 'quaderno'], mark: '0.5' }
					],
					q2: '2. Completa il testo descrittivo con «c’è», «ci sono» e le preposizioni articolate (al, alla, dal, nella, sul) :\n  «............ mio appartamento ............ un soggiorno luminoso e ............ tre camere ordinate. La nostra casa è vicino ............ moschea e non è lontana ............ liceo. ............ tavolo della mia stanza ............ sempre un dizionario aperto.»',
					a2: 'Nel / c’è / ci sono / alla / dal / Sul / c’è.',
					q3: '3. Forma la preposizione articolata adatta e trasforma al plurale i nomi tra parentesi :\n  a) I libri sono (su + il) ............ (tavolo) ............ della sala.\n  b) Parlo (con + il) ............ (compagno) ............ davanti (a + la) ............ (scuola) ............ .\n  c) Cerchiamo le definizioni (in + il) ............ (dizionario) ............ (di + la) ............ (biblioteca) ............ .',
					a3: 'a) sui tavoli.\n  b) con i compagni / davanti alle scuole.\n  c) nei dizionari / delle biblioteche.',
					q4: '4. Trova il contrario delle seguenti parole della casa e della routine :\n  a) vicino a = ............ ; b) rumoroso = ............ ; c) tardi = ............ .',
					a4: 'a) lontano da ; b) silenzioso / calmo ; c) presto.',
					ddStem: 'Classifica le espressioni secondo la struttura corretta con «c’è» oppure «ci sono»:',
					ddCategories: ['Richiede «c’è» (singolare)', 'Richiede «ci sono» (plurale)'],
					ddItems: [
						{ text: 'una scrivania vicino alla finestra', category: 0 },
						{ text: 'un giardino pubblico davanti a casa', category: 0 },
						{ text: 'tre camere da letto luminose', category: 1 },
						{ text: 'molti dizionari sullo scaffale', category: 1 }
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
				trimesterId: 't1',
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
						'ننتبه لاختيار أداة التعريف والتنكير حسب الحرف الأول والنوع والعدد، ولدخول حروف الجر الخمسة (di, a, da, in, su) في التركيب، ولاستعمال c’è للمفرد و ci sono للجمع.'
				},
				sujetExercise: {
					customTitle: 'II. Competenza linguistica',
					points: 7,
					instruction: 'Completa con precisione le attività di grammatica e lessico seguenti :',
					content
				},
				hints: [
					'تذكر أن un المذكر لا يأخذ فاصلة عليا قبل الحرف المتحرك (un amico)، بينما تأخذها un’ للمؤنث (un’amica).',
					'حروف الجر الخمسة di, a, da, in, su تندمج دائماً مع أداة التعريف، بينما con, per, tra, fra تبقى غالباً منفصلة.',
					'في جمع المؤنث المختوم بـ -ca / -ga نضيف حرف h لتصير -che / -ghe (biblioteche, lunghe).'
				],
				solutionStepsAr: [
					'تصنيف الكلمات في الجدول الثلاثي (1.5 نقطة).',
					'ضبط حروف الجر البسيطة والمركبة و c’è / ci sono (2.0 نقطة).',
					'إتقان التحويل إلى الجمع والمطابقة أو تصحيح الأخطاء (2.0 نقطة).',
					'توظيف محددات المكان أو إيجاد الأضداد (1.5 نقطة).'
				],
				finalAnswer: v.ddItems.map((it) => `${it.text} : ${v.ddCategories[it.category]}`).join(' | ')
			};
		}
	},

	// 5. Produzione scritta (6 pti, integration) — ordering quiz
	{
		id: 'ita_tpl_2as_le_t1_writ_presentazione_giornata',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'produzione_scritta',
		titleAr: 'III. Produzione scritta : Presentazione personale, famiglia e routine al liceo (6 pti)',
		curriculumLessonId: 'ita_lesson_2as_le_t1_vita_quotidiana_scuola',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					tracciaUnoPrompt:
						'Scrivi un messaggio di presentazione (100-130 parole) a uno studente corrispondente per presentarti e descrivere la tua giornata scolastica equilibrata.',
					tracciaUnoPunti: [
						'Saluto cordiale e dati personali completi (nome, età con avere, città algerina, indirizzo di Lingue Straniere).',
						'Breve presentazione della tua famiglia e di due qualità positive del tuo carattere.',
						'Descrizione della tua routine con verbi riflessivi (svegliarsi, alzarsi, prepararsi) e abitudini sane di studio.',
						'Chiusura cortese con una domanda sulla sua giornata al liceo.'
					],
					tracciaDuePrompt:
						'Presenta in un breve testo (100-130 parole) la tua materia preferita al liceo e spiega come organizzi il tuo tempo libero in modo sano tra lettura, sport e famiglia.',
					modelAnswer:
						'Ciao Marco! Mi chiamo Karim, ho sedici anni e abito a Costantina con i miei genitori e mia sorella minore Salma. Frequento il secondo anno del liceo nell’indirizzo di Lingue Straniere perché amo molto l’arabo, il francese, l’inglese e l’italiano.\n\nMi considero una persona ordinata, paziente e collaborativa. Ogni mattina mi sveglio alle sei e mezzo, mi preparo con calma e faccio colazione in famiglia prima di andare a scuola. Alle otto cominciano le lezioni e prendo appunti precisi. Il pomeriggio torno a casa, finisco i compiti sulla mia scrivania e poi vado in biblioteca o faccio nuoto.\n\nE tu, come organizzi la tua giornata scolastica? Un caro saluto, aspetto presto una tua risposta!',
					rubricSummary:
						'Rispetto della consegna e delle quattro indicazioni (2.0 pti) | Uso esatto di Presente, verbi riflessivi e preposizioni articolate (2.0 pti) | Coerenza testuale, lessico e ortografia italiana (2.0 pti)',
					orderedSteps: [
						'Ciao Marco! Mi chiamo Karim, ho sedici anni e vivo a Costantina con la mia famiglia.',
						'Frequento il secondo anno di Lingue Straniere perché mi piace molto imparare le lingue.',
						'Ogni giorno mi sveglio presto, vado al liceo e il pomeriggio studio nella biblioteca.',
						'E tu, come organizzi la tua giornata scolastica? Un caro saluto!'
					],
					orderExplanation:
						'تبدأ رسالة التعارف بالتحية والاسم والعمر والمدينة، ثم الشعبة الدراسية، فالروتين اليومي، وتختم بسؤال ودي وتحية.'
				},
				{
					tracciaUnoPrompt:
						'Redigi un breve articolo (100-130 parole) per il giornale del liceo spiegando quali buone abitudini aiutano uno studente di 2AS LE a studiare con serenità ed evitare la distrazione.',
					tracciaUnoPunti: [
						'Importanza di svegliarsi presto e preparare lo zaino la sera precedente.',
						'Organizzazione di un angolo di studio ordinato (scrivania, dizionario, assenza di schermi inutili).',
						'Uso corretto di verbi al Presente, almeno due verbi modali (dovere, potere) e preposizioni articolate.',
						'Conclusione positiva sul valore della costanza quotidiana.'
					],
					tracciaDuePrompt:
						'Descrivi in 100-130 parole un compagno di classe o un membro della tua famiglia che ammiri per la sua educazione e il suo impegno quotidiano.',
					modelAnswer:
						'Organizzare bene la giornata è fondamentale per ottenere buoni risultati nel secondo anno di Lingue Straniere. Molti ragazzi perdono tempo prezioso davanti al telefono, ma tutti possono migliorare le proprie abitudini con ordine.\n\nInnanzitutto, bisogna prepararsi con calma: dobbiamo sistemare lo zaino la sera prima e alzarci presto la mattina per avere la mente riposata. Inoltre, nel pomeriggio conviene studiare su una scrivania ordinata, con il dizionario bilingue vicino e senza distrazioni digitali. Dopo i compiti, è sano dedicare tempo alla lettura o a una camminata all’aria aperta.\n\nIn conclusione, la costanza di ogni giorno garantisce progressi sicuri e una vita scolastica serena.',
					rubricSummary:
						'Pertinenza e sviluppo ordinato in tre parti (2.0 pti) | Correttezza grammaticale su Presente, modali e articoli (2.0 pti) | Ricchezza lessicale, punteggiatura e chiarezza (2.0 pti)',
					orderedSteps: [
						'Organizzare bene il tempo è essenziale per studiare con serenità al liceo.',
						'Innanzitutto, dobbiamo alzarci presto e preparare lo zaino la sera precedente.',
						'Inoltre, conviene studiare su una scrivania ordinata e senza distrazioni digitali.',
						'In conclusione, la costanza quotidiana assicura risultati scolastici eccellenti.'
					],
					orderExplanation:
						'يتدرج المقال المدرسي من المقدمة العامة إلى النصيحة الأولى (Innanzitutto) ثم الإضافة (Inoltre) فالخاتمة (In conclusione).'
				},
				{
					tracciaUnoPrompt:
						'Presenta la tua famiglia e racconta come collaborate insieme durante il fine settimana a casa (100-130 parole).',
					tracciaUnoPunti: [
						'Presentazione dei componenti della famiglia (genitori, fratelli o nonni).',
						'Attività mattutine e pomeridiane in casa con c’è / ci sono e verbi riflessivi.',
						'Momenti di lettura, dialogo rispettoso e aiuto domestico.',
						'Riflessione finale sull’importanza dell’unità familiare.'
					],
					tracciaDuePrompt:
						'Racconta come si svolge una tua mattinata tipo dalla sveglia fino all’inizio della prima ora di italiano al liceo (100-130 parole).',
					modelAnswer:
						'Nella mia famiglia siamo in cinque: i miei genitori, i miei due fratelli e io. Abitiamo ad Algeri in un appartamento luminoso dove regnano rispetto e collaborazione. Durante la settimana ognuno segue i propri impegni, mentre il fine settimana trascorriamo molte ore insieme.\n\nLa mattina ci alziamo verso le sette e facciamo colazione tutti intorno al tavolo del soggiorno. Poi io e mio fratello riordiniamo le nostre camere e aiutiamo nostra madre in cucina. Nel pomeriggio in salotto c’è sempre un momento tranquillo dedicato alla lettura, mentre mio padre ci aiuta a verificare i compiti di lingue.\n\nCredo che questo clima familiare unito renda ogni settimana più piacevole e costruttiva.',
					rubricSummary:
						'Rispetto della traccia e chiarezza dei contenuti (2.0 pti) | Uso esatto di c’è/ci sono, riflessivi e articoli (2.0 pti) | Coesione, ortografia e registro appropriato (2.0 pti)',
					orderedSteps: [
						'Nella mia famiglia siamo in cinque e abitiamo in un appartamento luminoso ad Algeri.',
						'La mattina del fine settimana ci alziamo presto e facciamo colazione tutti insieme.',
						'Poi noi fratelli riordiniamo le camere e aiutiamo i nostri genitori nei lavori di casa.',
						'Questo clima familiare sereno rende ogni settimana più armoniosa e produttiva.'
					],
					orderExplanation:
						'يتسلسل النص من التعريف بالأسرة والسكن إلى روتين الصباح ثم التعاون العائلي ويُختم بالأثر التربوي.'
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
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'ordering',
					questionText: 'Metti in ordine logico le quattro frasi seguenti per ottenere un testo italiano coerente (dall’inizio alla conclusione):',
					questionTextAr: 'رتب الجمل الأربع الآتية لتكوين نص إيطالي منسجم من المقدمة إلى الخاتمة:',
					questionData: {
						items: scrambled.items,
						correctOrder: scrambled.correctOrder
					},
					explanation: v.orderExplanation
				},
				sujetExercise: {
					customTitle: 'III. Produzione scritta',
					points: 6,
					instruction: 'Scegli UNA delle due tracce e scrivi un testo coerente e corretto (100-130 parole) :',
					content: [block]
				},
				hints: [
					'قسّم موضوعك بوضوح إلى ثلاث فقرات: مقدمة وجيزة، عرض منظم، وخاتمة لطيفة.',
					'إذا اخترت Traccia 1 فادمج النقاط التوجيهية في جمل مترابطة وتجنب كتابتها كقائمة منفصلة.',
					'تأكد من كتابة العمر بـ avere ومن مطابقة الضمير الانعكاسي وحروف الجر المركبة.'
				],
				solutionStepsAr: [
					'الالتزام بالموضوع المختار وتغطية العناصر المطلوبة (2.0 نقطة).',
					'صحة التصريف في المضارع والانعكاس والأدوات وحروف الجر (2.0 نقطة).',
					'سلامة الإملاء والربط بين الجمل وتنظيم الفقرات (2.0 نقطة).'
				],
				finalAnswer: v.orderedSteps.join(' / ')
			};
		}
	},

	// 6. Produzione scritta (6 pti, integration) — cloze quiz
	{
		id: 'ita_tpl_2as_le_t1_writ_casa_quartiere_studio',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'produzione_scritta',
		titleAr: 'III. Produzione scritta : La casa, il quartiere e i consigli di studio (6 pti)',
		curriculumLessonId: 'ita_lesson_2as_le_t1_casa_citta_abitudini',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): ItalianGeneratedExerciseInstance {
			const rng = new SeededRng(seed);

			const variants = [
				{
					tracciaUnoPrompt:
						'Descrivi la tua casa e la tua stanza da studio in un testo di 100-130 parole, spiegando dove si trovano gli arredi principali e perché ti piace studiare lì.',
					tracciaUnoPunti: [
						'Tipo di abitazione e stanze principali usando «c’è» e «ci sono».',
						'Posizione dei mobili nella tua camera con preposizioni di luogo (vicino alla finestra, sulla scrivania, davanti a).',
						'Accordo corretto di nomi e aggettivi qualificativi (luminosa, ordinato, silenziose).',
						'Conclusione sulle buone abitudini di studio in quello spazio.'
					],
					tracciaDuePrompt:
						'Descrivi il tuo quartiere e i servizi pubblici utili che si trovano vicino a casa tua (biblioteca, giardino, scuola, moschea, fermata dell’autobus) in 100-130 parole.',
					modelAnswer:
						'La mia famiglia vive in una casa accogliente e luminosa nella città di Blida. Al piano terra c’è un grande soggiorno dove riceviamo i parenti con calore, e accanto all’ingresso ci sono la cucina e un piccolo cortile verde.\n\nLa mia camera da studio si trova al primo piano ed è molto silenziosa. Vicino alla finestra c’è una scrivania ordinata con una lampada e due quaderni nuovi; davanti alla porta ci sono gli scaffali della libreria dove sistemo i dizionari bilingui e i libri di lettura. Sul tavolo non lascio mai oggetti inutili per mantenere sempre la concentrazione.\n\nAmo studiare in questa stanza perché l’ordine e la quiete mi aiutano a preparare bene tutte le lezioni di italiano.',
					rubricSummary:
						'Rispetto del tema e descrizione ordinata dello spazio (2.0 pti) | Impiego esatto di c’è/ci sono, preposizioni articolate e accordi (2.0 pti) | Lessico vario, ortografia e punteggiatura (2.0 pti)',
					clozeSentence: 'Nella mia stanza da studio ___ una scrivania ordinata e due scaffali pieni di libri.',
					clozeCorrect: 'c’è',
					clozeDistractors: ['sono', 'hanno', 'stanno'],
					clozeExplanation:
						'عند تتابع عدة عناصر يكون العنصر الأول فيها مفرداً (una scrivania) أو للدلالة على الوجود المفرد نستعمل c’è.'
				},
				{
					tracciaUnoPrompt:
						'Immagina che un nuovo studente arrivi nel tuo quartiere. Scrivi una breve guida (100-130 parole) per presentargli i luoghi più utili attorno al liceo e come raggiungerli.',
					tracciaUnoPunti: [
						'Posizione della scuola e delle fermate dei trasporti con preposizioni di luogo.',
						'Descrizione della biblioteca comunale e di un giardino pubblico vicino.',
						'Uso corretto delle preposizioni articolate (al, alla, nel, nella, sul, davanti al).',
						'Invito cortese a rispettare la pulizia e la tranquillità del quartiere.'
					],
					tracciaDuePrompt:
						'Scrivi una lettera (100-130 parole) a un cugino che inizia lo studio dell’italiano e dagli quattro consigli pratici su pronuncia, articoli e dizionario.',
					modelAnswer:
						'Benvenuto nel nostro quartiere! È una zona tranquilla e ben organizzata, ideale per studiare con serenità. Il liceo si trova nella via principale, proprio di fronte a un giardino pubblico pieno di alberi verdi.\n\nSe esci dalla scuola e giri a destra, a duecento metri c’è la biblioteca comunale: al suo interno ci sono sale luminose e dizionari molto utili per i corsi di Lingue Straniere. Vicino al giardino si trovano inoltre una farmacia, una libreria per acquistare quaderni e la fermata dell’autobus per tornare facilmente verso il centro.\n\nIn ogni strada del quartiere rispettiamo la pulizia e la quiete, così tutti possono camminare e studiare in un ambiente piacevole.',
					rubricSummary:
						'Chiarezza orientativa e copertura dei luoghi richiesti (2.0 pti) | Uso esatto delle preposizioni articolate e locuzioni di luogo (2.0 pti) | Coesione testuale e ortografia (2.0 pti)',
					clozeSentence: 'La biblioteca comunale si trova proprio davanti ___ giardino pubblico del quartiere.',
					clozeCorrect: 'al',
					clozeDistractors: ['nel', 'dal', 'sul'],
					clozeExplanation:
						'عبارة المكان «davanti» تُتبع بحرف الجر a، ومع المذكر giardino (il) تندمج a + il لتصبح «al».'
				},
				{
					tracciaUnoPrompt:
						'Scrivi un testo di consigli pratici (100-130 parole) rivolto a uno studente di primo anno che vuole imparare bene l’italiano fin dal primo trimestre.',
					tracciaUnoPunti: [
						'Importanza di distinguere i suoni dolci e duri (c/g e ch/gh) fin dall’inizio.',
						'Attenzione agli articoli (il, lo, l’, un, uno, un’) e ai verbi regolari e riflessivi al Presente.',
						'Utilità di tenere un quaderno ordinato e di leggere brevi testi ogni giorno.',
						'Incoraggiamento finale basato sul lavoro regolare e sul rispetto in classe.'
					],
					tracciaDuePrompt:
						'Racconta un pomeriggio di studio produttivo trascorso nella biblioteca scolastica insieme a due tuoi compagni (100-130 parole).',
					modelAnswer:
						'Caro amico, sono felice che tu inizi a studiare la lingua italiana! Se desideri fare progressi rapidi fin dal primo trimestre, puoi seguire alcune regole semplici ma molto efficaci.\n\nIn primo luogo, presta attenzione alla pronuncia corretta di lettere come c, g e sc davanti alle vocali, leggendo ad alta voce dieci minuti ogni giorno. Inoltre, esercitati spesso sugli articoli davanti a parole come studente o amico, e ripassa bene i verbi riflessivi della routine quotidiana. Quando incontri un termine nuovo, annotalo subito in un quaderno ordinato insieme a un esempio chiaro.\n\nInfine, non avere paura di chiedere spiegazioni al professore: con metodo e costanza parlerai italiano con sicurezza!',
					rubricSummary:
						'Pertinenza dei consigli metodologici e struttura (2.0 pti) | Precisione grammaticale negli esempi e nei verbi (2.0 pti) | Chiarezza espressiva e ortografia (2.0 pti)',
					clozeSentence: 'Per imparare nuovi vocaboli ogni settimana, gli studenti ___ un dizionario bilingue in classe.',
					clozeCorrect: 'consultano',
					clozeDistractors: ['consultiamo', 'consulto', 'consultate'],
					clozeExplanation:
						'الفاعل الجمع الغائب «gli studenti» (= loro) يأخذ النهاية القياسية `-ano` في المجموعة الأولى (`consultano`).'
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
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'cloze',
					questionText: 'Completa la frase italiana con l’elemento grammaticale corretto:',
					questionTextAr: 'أكمل الجملة الإيطالية بالعنصر النحوي الصحيح:',
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
					instruction: 'Scegli UNA delle due tracce e redigi un testo chiaro e ordinato (100-130 parole) :',
					content: [block]
				},
				hints: [
					'التزم بعدد الكلمات المطلوب (100 إلى 130 كلمة) واكتب بجمل واضحة مترابطة.',
					'استثمر الروابط البسيطة: In primo luogo, Inoltre, Poi, Infine.',
					'تحقق من مطابقة الأسماء والصفات وحروف الجر المركبة قبل إنهاء التحرير.'
				],
				solutionStepsAr: [
					'تحديد الفكرة والالتزام بمحتوى الموضوع المختار (2.0 نقطة).',
					'توظيف القواعد المقررة في الفصل الأول بدقة (2.0 نقطة).',
					'التماسك النصي وسلامة الإملاء وعلامات الترقيم (2.0 نقطة).'
				],
				finalAnswer: v.clozeCorrect
			};
		}
	}
];
