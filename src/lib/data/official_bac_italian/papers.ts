import type { ExerciseBlock } from '../../modules/SujetBuilder/types';
import {
	buildItalianClassificationTableBlock,
	buildItalianPassageBlock,
	buildItalianWordFamilyTableBlock,
	buildItalianWrittenProductionBlock
} from '../../modules/ItalianTemplates/italian-helpers';
import { saveItalianSvgAsset, svgItalianGrammarMap } from '../../modules/ItalianTemplates/svg-italian';
import { buildIllustratedFigureBlock } from '../../modules/VisualAssets/illustrations-registry';
import { buildOfficialItalianBacPaper, type OfficialItalianBacPaperSpec } from './types';

// ============================================================================
// 1. BAC 2023 — Traccia 1 (bac-2023-3as-le-italian-t1)
// La famiglia, l’istruzione e il valore della lettura tra i giovani
// ============================================================================

function buildBac2023ItalianT1(): OfficialItalianBacPaperSpec {
	const comp: ExerciseBlock = {
		id: 'it_2023_t1_comp',
		customTitle: 'I. Comprensione del testo',
		points: 7,
		instruction: 'Leggi attentamente il testo seguente e rispondi con precisione alle domande.',
		content: [
			buildItalianPassageBlock({
				title: 'La famiglia, la biblioteca e il valore della lettura nella formazione dei giovani',
				paragraphs: [
					'Fin dai primi anni della scuola secondaria, il dialogo sereno in famiglia e il sostegno morale dei genitori rappresentano una guida preziosa per gli studenti. Quando l’ambiente domestico incoraggia la curiosità intellettuale, il ragazzo scopre che studiare le lingue straniere e coltivare la lettura quotidiana aprono prospettive concrete verso la traduzione, la ricerca e la comprensione tra i popoli. Tuttavia, i docenti ricordano che [[questa preparazione]] diventa davvero solida solo se poggia su una padrona conoscenza della propria lingua materna.',
					'Frequentare la biblioteca scolastica, consultare il dizionario bilingue e sfogliare libri stampati richiede pazienza, silenzio e spirito critico. A differenza dello scorrimento rapido di messaggi brevi sugli schermi, la lettura attenta di un saggio o di un testo informativo permette allo studente di fermarsi davanti a ogni ragionamento, ampliare il proprio lessico con esattezza e annotare le idee principali sul quaderno.',
					'In Algeria, gli alunni dell’indirizzo Lingue Straniere imparano l’italiano come ponte culturale affacciato sul bacino del Mediterraneo. [[Chi]] esercita con costanza la scrittura ordinata e confronta i testi originali con le traduzioni acquisisce sicurezza espressiva, rispetto per i propri insegnanti e capacità di argomentare con garbo.',
					'Pertanto, educare una generazione consapevole non significa limitarsi a superare una singola verifica, bensì seminare costanza nello studio, gratitudine verso i genitori e desiderio autentico di sapere. Quando scuola e famiglia collaborano con fiducia, la lettura si trasforma in uno strumento duraturo di crescita personale e di servizio utile alla società.'
				],
				source: 'Quaderni di Pedagogia e Lingue del Mediterraneo, Edizione SujetStore',
				numberedParagraphs: true,
				glossary: [
					{
						term: 'spirito critico',
						meaning: 'capacità di analizzare idee e testi con attenzione, equilibrio e chiarezza'
					},
					{
						term: 'costanza',
						meaning: 'dedizione continua, pazienza e impegno regolare nello studio'
					},
					{
						term: 'garbo',
						meaning: 'cortesia, misura e rispetto nel modo di parlare o scrivere'
					}
				]
			}),
			buildIllustratedFigureBlock('ita_03_istruzione_lingue_biblioteca', {
				lang: 'it',
				mode: 'labeled',
				pins: [],
				width: '62%',
				maxHeight: 128,
				caption: 'Documento visivo : Il dizionario bilingue, la biblioteca scolastica e il successo educativo.'
			}),
			{
				type: 'text',
				content: '#strong[1.] Scegli la risposta corretta segnando con una croce la casella corrispondente.'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: 'Secondo il testo, una preparazione linguistica davvero solida si fonda soprattutto su :',
						options: [
							'la sostituzione definitiva dei libri cartacei con brevi messaggi digitali',
							'il sostegno familiare, la lettura attenta in biblioteca e il buon dominio della lingua materna',
							'la memorizzazione veloce finalizzata soltanto a una singola verifica'
						],
						correct:
							'il sostegno familiare, la lettura attenta in biblioteca e il buon dominio della lingua materna',
						mark: '1'
					}
				]
			},
			{
				type: 'text',
				content:
					'#strong[2.] Indica se le seguenti affermazioni sono Vere o False e giustifica ogni risposta con il testo.'
			},
			{
				type: 'true_false',
				items: [
					{
						q: 'a) Per imparare bene una lingua straniera bisogna trascurare la propria lingua materna.',
						a: 'Falso',
						c: 'Il testo afferma che questa preparazione diventa davvero solida solo se poggia sulla conoscenza della propria lingua materna (§1).',
						mark: '0.5'
					},
					{
						q: 'b) Leggere libri stampati in biblioteca favorisce il lessico preciso e la concentrazione.',
						a: 'Vero',
						c: 'La lettura attenta di un libro stampato richiede pazienza e silenzio e permette di ampliare il lessico con esattezza (§2).',
						mark: '0.5'
					},
					{
						q: 'c) L’esercizio costante della scrittura aiuta gli studenti a esprimersi con chiarezza e rispetto.',
						a: 'Vero',
						c: 'Chi esercita con costanza la scrittura ordinata acquisisce sicurezza espressiva e capacità di argomentare con garbo (§3).',
						mark: '0.5'
					},
					{
						q: 'd) La formazione dei giovani si riduce esclusivamente al superamento di un esame scolastico.',
						a: 'Falso',
						c: 'Educare una generazione consapevole non significa limitarsi a superare una singola verifica, ma seminare costanza, gratitudine e desiderio di sapere (§4).',
						mark: '0.5'
					}
				]
			},
			{
				type: 'text',
				content: '#strong[3.] Rispondi in modo completo e personale alle seguenti domande di comprensione.'
			},
			{
				type: 'text',
				content:
					'a) Quale differenza mette in luce il secondo paragrafo tra i libri stampati e la lettura veloce sugli schermi ?',
				answer:
					'a) Mentre sugli schermi si scorrono messaggi brevi in modo rapido, il libro stampato richiede pazienza e silenzio, aiuta a seguire ogni ragionamento, arricchisce il lessico e favorisce gli appunti sul quaderno.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'b) Che cosa accade quando la scuola e la famiglia collaborano secondo il quarto paragrafo ?',
				answer:
					'b) La lettura diventa uno strumento duraturo di crescita personale, maturità intellettuale e servizio utile alla società.',
				mark: '1'
			},
			{
				type: 'text',
				content: '#strong[4.] A che cosa o a chi si riferiscono le parole sottolineate nel testo ?'
			},
			{
				type: 'text',
				content: 'a) « questa preparazione » (§1) si riferisce a : ............................',
				answer:
					'a) Si riferisce allo studio delle lingue straniere e alla pratica della lettura quotidiana.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) « Chi » (§3) si riferisce a : ............................',
				answer:
					'b) Si riferisce agli alunni algerini dell’indirizzo Lingue Straniere che studiano l’italiano con impegno.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[5.] Completa la seguente tabella di sintesi con le informazioni del testo.'
			},
			{
				type: 'table',
				headers: ['Elemento educativo', 'Effetto positivo indicato nel testo'],
				cells: [],
				rows: [
					[
						{ content: 'Dialogo e sostegno della famiglia', bold: true },
						{
							content: '....................',
							answer: 'Incoraggia la curiosità intellettuale, la gratitudine e la costanza nello studio.',
							mark: '0.5'
						}
					],
					[
						{ content: 'Biblioteca scolastica e dizionario bilingue', bold: true },
						{
							content: '....................',
							answer: 'Sviluppa pazienza, spirito critico, ampiezza lessicale e precisione nella scrittura.',
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
		id: 'it_2023_t1_ling',
		customTitle: 'II. Competenza linguistica',
		points: 7,
		instruction: 'Svolgi con attenzione gli esercizi di lessico, derivazione e morfosintassi.',
		content: [
			{
				type: 'text',
				content: '#strong[A. Lessico (3 punti)]'
			},
			{
				type: 'text',
				content: '#strong[1.] Cerca nel testo :'
			},
			{
				type: 'text',
				content: 'a) il sinonimo di « precisione / accuratezza » (§2) : ............................',
				answer: 'a) esattezza',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) il contrario di « incostanza / abbandono » (§3) : ............................',
				answer: 'b) costanza',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[2.] Completa la tabella della famiglia di parole secondo il modello italiano.'
			},
			buildItalianWordFamilyTableBlock([
				{
					verbo: { given: true, value: 'istruire' },
					sostantivo: { value: 'istruzione', mark: '0.25' },
					aggettivo: { value: 'istruito / istruttivo', mark: '0.25' }
				},
				{
					verbo: { value: 'leggere', mark: '0.25' },
					sostantivo: { given: true, value: 'lettura' },
					aggettivo: { value: 'leggibile / letto', mark: '0.25' }
				}
			]),
			{
				type: 'text',
				content:
					'#strong[3.] Classifica le espressioni nella tabella : #emph[dizionario bilingue ; gratitudine verso i genitori ; biblioteca scolastica ; costanza nello studio ; quaderno di appunti ; rispetto per gli insegnanti].'
			},
			buildItalianClassificationTableBlock({
				columns: [
					{
						header: 'Strumenti e luoghi dello studio',
						items: ['dizionario bilingue', 'biblioteca scolastica', 'quaderno di appunti'],
						mark: '0.5'
					},
					{
						header: 'Valori familiari ed educativi',
						items: ['gratitudine verso i genitori', 'costanza nello studio', 'rispetto per gli insegnanti'],
						mark: '0.5'
					}
				]
			}),
			{
				type: 'text',
				content: '#strong[B. Grammatica e morfosintassi (4 punti)]'
			},
			{
				type: 'text',
				content:
					'#strong[4.] Coniuga i verbi tra parentesi al congiuntivo presente :'
			},
			{
				type: 'text',
				content:
					'a) È fondamentale che i giovani #strong[(leggere)] testi formativi in biblioteca ogni settimana.',
				answer: 'a) È fondamentale che i giovani leggano testi formativi in biblioteca ogni settimana.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) I genitori desiderano che i loro figli #strong[(acquisire)] una solida preparazione culturale.',
				answer:
					'b) I genitori desiderano che i loro figli acquisiscano una solida preparazione culturale.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[5.] Trasforma le seguenti frasi dalla forma attiva alla forma passiva :'
			},
			{
				type: 'text',
				content:
					'a) La biblioteca scolastica organizza laboratori settimanali di lettura.',
				answer:
					'a) Laboratori settimanali di lettura sono (o vengono) organizzati dalla biblioteca scolastica.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Gli insegnanti hanno guidato gli studenti nella ricerca lessicale.',
				answer:
					'b) Gli studenti sono stati guidati dagli insegnanti nella ricerca lessicale.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[6.] Scegli il modo verbale adatto (congiuntivo presente o indicativo presente) :'
			},
			{
				type: 'text',
				content:
					'a) Sebbene gli schermi #strong[(offrire)] notizie veloci, il libro stampato sviluppa maggiore riflessione.',
				answer:
					'a) Sebbene gli schermi offrano notizie veloci, il libro stampato sviluppa maggiore riflessione.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Sappiamo con certezza che il dizionario bilingue #strong[(arricchire)] il nostro vocabolario.',
				answer:
					'b) Sappiamo con certezza che il dizionario bilingue arricchisce il nostro vocabolario.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[7.] Unisci le due frasi usando « affinché + congiuntivo presente » :\n« La famiglia sostiene i ragazzi nello studio. I ragazzi sviluppano uno spirito critico maturo. »',
				answer:
					'La famiglia sostiene i ragazzi nello studio affinché sviluppino uno spirito critico maturo.',
				mark: '1'
			}
		]
	};

	const expr: ExerciseBlock = {
		id: 'it_2023_t1_expr',
		customTitle: 'III. Produzione scritta',
		points: 6,
		instruction: 'Scegli UNA delle due tracce proposte e redigi un testo coerente di 120–150 parole.',
		content: [
			buildItalianWrittenProductionBlock({
				tracciaUnoTitle: 'Traccia 1 (Guidata) :',
				tracciaUnoPrompt:
					'In occasione della settimana del libro nel tuo liceo, scrivi un articolo per il giornalino scolastico (120–150 parole) spiegando come il sostegno della famiglia, la biblioteca e lo studio delle lingue straniere preparino i giovani al successo culturale.',
				tracciaUnoPunti: [
					'Confronta la lettura riflessiva di libri stampati con la consultazione frettolosa sugli schermi.',
					'Indica due benefici concreti dello studio serio delle lingue straniere.',
					'Usa almeno una frase alla forma passiva e una subordinata con congiuntivo presente.'
				],
				tracciaDuePrompt:
					'« Chi ama la lettura e rispetta la guida di genitori e insegnanti costruisce un futuro più saggio e utile alla società. » Sviluppa questa affermazione in un testo argomentativo (120–150 parole) con esempi educativi chiari.',
				rubricSummary:
					'Aderenza alla traccia e ricchezza dei contenuti (2 pti) ; coerenza strutturale e uso dei connettivi (1.5 pto) ; correttezza morfosintattica, forma passiva, congiuntivo presente e lessico (1.5 pto) ; ortografia e presentazione (1 pto).',
				modelAnswer:
					'Nella formazione dei giovani, il sostegno costante della famiglia e la lettura quotidiana costituiscono due pilastri fondamentali per la crescita culturale. Anche se gli schermi offrono risposte rapide, soltanto i libri stampati e i dizionari della biblioteca scolastica educano la concentrazione, arricchiscono il lessico e sviluppano lo spirito critico.\n\nIn primo luogo, i genitori incoraggiano i figli affinché acquisiscano abitudini di studio ordinate e rispettose dei propri insegnanti. In secondo luogo, imparare le lingue straniere nell’indirizzo Lingue Straniere apre le porte della traduzione e dei testi scientifici del Mediterraneo. In molti licei algerini, laboratori di lettura vengono organizzati settimanalmente dai docenti per guidare gli studenti verso una scrittura chiara, precisa e ragionata.\n\nIn conclusione, quando scuola e famiglia collaborano con fiducia e costanza, l’istruzione diventa uno strumento duraturo di maturità intellettuale, gratitudine e servizio utile alla comunità.',
				mark: '6'
			})
		]
	};

	return buildOfficialItalianBacPaper({
		slug: 'bac-2023-3as-le-italian-t1',
		academicYear: '2023',
		topicNumber: 1,
		ambitoIt: 'Famiglia, Istruzione e Lettura',
		titleTopicIt: 'La famiglia, l’istruzione e il valore della lettura tra i giovani',
		titleTopicAr: 'الأسرة والتعليم وقيمة المطالعة لدى الشباب',
		themesIt: [
			'Famiglia e sostegno educativo',
			'Biblioteca scolastica e lettura',
			'Apprendimento delle lingue straniere',
			'Forma passiva, famiglia di parole e congiuntivo presente'
		],
		themesAr: [
			'الأسرة والدعم التربوي',
			'المكتبة المدرسية والمطالعة',
			'تعلّم اللغات الأجنبية',
			'المبني للمجهول واشتقاق الكلمات والحاضر المنصوب'
		],
		exercises: [comp, ling, expr]
	});
}

// ============================================================================
// 2. BAC 2023 — Traccia 2 (bac-2023-3as-le-italian-t2)
// Tecnologia dell’informazione, giornalismo serio e tutela dei dati + SVG
// ============================================================================

function buildBac2023ItalianT2(): OfficialItalianBacPaperSpec {
	const svgCongiuntivoMediaUrl = saveItalianSvgAsset(
		'bac-2023-ita-t2-congiuntivo-media',
		svgItalianGrammarMap({
			title: 'Congiuntivo e connettivi nel giornalismo e nei media',
			rootLabel: 'Comunicazione e tutela dei dati',
			rootSub: 'Dovere, finalità e concessione nei testi informativi',
			branches: [
				{
					label: 'Necessità',
					rule: 'Bisogna che + cong.',
					example: 'verifichino le fonti',
					color: '#0f766e'
				},
				{
					label: 'Finalità',
					rule: 'affinché + congiuntivo',
					example: 'tutelino i dati privati',
					color: '#047857'
				},
				{
					label: 'Concessione',
					rule: 'sebbene + congiuntivo',
					example: 'circolino notizie false',
					color: '#1d4ed8'
				}
			],
			width: 560,
			height: 245
		})
	);

	const comp: ExerciseBlock = {
		id: 'it_2023_t2_comp',
		customTitle: 'I. Comprensione del testo',
		points: 7,
		instruction: 'Leggi con attenzione il seguente articolo divulgativo e rispondi alle domande.',
		content: [
			buildItalianPassageBlock({
				title: 'Informazione seria e sicurezza digitale : l’etica della comunicazione moderna',
				paragraphs: [
					'Negli ultimi anni, la tecnologia dell’informazione, le biblioteche digitali e i laboratori scientifici hanno accelerato in modo straordinario la diffusione delle conoscenze. Attraverso [[queste piattaforme]], uno studente o un ricercatore può consultare archivi universitari, confrontare dati sperimentali e seguire aggiornamenti educativi da qualsiasi regione senza ostacoli geografici.',
					'Tuttavia, la velocità della rete perde il suo valore formativo se manca la verifica rigorosa delle fonti. Il giornalismo serio si distingue dalla circolazione frettolosa di voci prive di fondamento proprio perché controlla i documenti, cita esperti qualificati e corregge eventuali errori con trasparenza. Chi diffonde notizie senza accertarne l’attendibilità favorisce la disinformazione e indebolisce la fiducia dei lettori.',
					'Accanto alla qualità dell’informazione, un altro dovere centrale riguarda la tutela dei dati personali. Nelle comunicazioni elettroniche è indispensabile che cittadini e scuole proteggano la riservatezza mediante password robuste, aggiornamenti regolari e rispetto del lavoro intellettuale altrui. Difendere [[tale sicurezza]] significa salvaguardare la dignità delle persone nell’ambiente digitale.',
					'In definitiva, gli strumenti informatici offrono un sostegno prezioso alla ricerca scientifica e all’educazione soltanto quando rimangono guidati dal senso critico e dall’onestà morale. La vera competenza digitale unisce quindi padronanza tecnica, verifica delle notizie e rispetto costante per l’interlocutore.'
				],
				source: 'Osservatorio di Scienza, Media ed Etica Digitale, Edizione SujetStore',
				numberedParagraphs: true,
				glossary: [
					{
						term: 'attendibilità',
						meaning: 'affidabilità e veridicità di una fonte o di una notizia documentata'
					},
					{
						term: 'disinformazione',
						meaning: 'diffusione di notizie inesatte o non verificate che traggono in inganno il pubblico'
					},
					{
						term: 'riservatezza',
						meaning: 'protezione delle informazioni personali e private da accessi non autorizzati'
					}
				]
			}),
			buildIllustratedFigureBlock('ita_05_scienza_tecnologia_informazione', {
				lang: 'it',
				mode: 'labeled',
				pins: [],
				width: '62%',
				maxHeight: 128,
				caption: 'Documento visivo : Ricerca scientifica, apprendimento digitale, sicurezza dei dati e giornalismo serio.'
			}),
			{
				type: 'text',
				content: '#strong[1.] Scegli l’opzione che riassume fedelmente il messaggio principale del testo.'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: 'L’autore del testo sostiene principalmente che :',
						options: [
							'le scuole devono vietare del tutto l’uso di biblioteche digitali e archivi online',
							'la tecnologia dell’informazione è utile allo studio solo se accompagnata da verifica delle fonti e tutela dei dati',
							'la velocità di pubblicazione conta più dell’attendibilità dei fatti riportati'
						],
						correct:
							'la tecnologia dell’informazione è utile allo studio solo se accompagnata da verifica delle fonti e tutela dei dati',
						mark: '1'
					}
				]
			},
			{
				type: 'text',
				content:
					'#strong[2.] Indica se le affermazioni sono Vere o False e motiva ciascuna risposta con il testo.'
			},
			{
				type: 'true_false',
				items: [
					{
						q: 'a) Le biblioteche digitali permettono di consultare archivi universitari superando le distanze geografiche.',
						a: 'Vero',
						c: 'Attraverso queste piattaforme uno studente può consultare archivi universitari e dati sperimentali da qualsiasi regione senza ostacoli geografici (§1).',
						mark: '0.5'
					},
					{
						q: 'b) Il giornalismo serio pubblica subito le voci non controllate senza citare fonti qualificate.',
						a: 'Falso',
						c: 'Il giornalismo serio si distingue proprio perché controlla i documenti, cita esperti qualificati e corregge eventuali errori con trasparenza (§2).',
						mark: '0.5'
					},
					{
						q: 'c) La protezione delle password e della riservatezza fa parte della tutela dei dati personali.',
						a: 'Vero',
						c: 'È indispensabile che cittadini e scuole proteggano la riservatezza mediante password robuste e aggiornamenti regolari (§3).',
						mark: '0.5'
					},
					{
						q: 'd) La competenza digitale consiste unicamente nella rapidità tecnica senza controllo morale.',
						a: 'Falso',
						c: 'La vera competenza digitale unisce padronanza tecnica, verifica delle notizie e rispetto costante per l’interlocutore (§4).',
						mark: '0.5'
					}
				]
			},
			{
				type: 'text',
				content: '#strong[3.] Rispondi con frasi complete alle seguenti domande.'
			},
			{
				type: 'text',
				content:
					'a) Quali tre caratteristiche definiscono il giornalismo serio secondo il secondo paragrafo ?',
				answer:
					'a) Il giornalismo serio controlla rigorosamente i documenti, cita esperti qualificati e corregge eventuali errori con trasparenza.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'b) Perché la tutela dei dati personali è considerata un dovere importante nel paragrafo 3 ?',
				answer:
					'b) Perché difendere la riservatezza e proteggere gli account con password robuste significa salvaguardare la dignità delle persone nell’ambiente digitale.',
				mark: '1'
			},
			{
				type: 'text',
				content: '#strong[4.] Precisa a che cosa rimandano le espressioni sottolineate nel testo :'
			},
			{
				type: 'text',
				content: 'a) « queste piattaforme » (§1) rimanda a : ............................',
				answer:
					'a) Rimanda alle tecnologie dell’informazione, alle biblioteche digitali e alle risorse dei laboratori scientifici.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) « tale sicurezza » (§3) rimanda a : ............................',
				answer:
					'b) Rimanda alla tutela dei dati personali e alla difesa della riservatezza elettronica.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[5.] Completa la tabella riassuntiva con gli elementi del testo.'
			},
			{
				type: 'table',
				headers: ['Ambito digitale', 'Comportamento responsabile richiesto'],
				cells: [],
				rows: [
					[
						{ content: 'Informazione e giornalismo', bold: true },
						{
							content: '....................',
							answer: 'Controllare le fonti, citare esperti qualificati ed evitare la disinformazione.',
							mark: '0.5'
						}
					],
					[
						{ content: 'Sicurezza dei dati personali', bold: true },
						{
							content: '....................',
							answer: 'Usare password robuste, eseguire aggiornamenti regolari e rispettare il lavoro altrui.',
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
		id: 'it_2023_t2_ling',
		customTitle: 'II. Competenza linguistica',
		points: 7,
		instruction: 'Osserva la mappa grammaticale e risolvi con precisione le attività delle sezioni A e B.',
		content: [
			{
				type: 'text',
				content: '#strong[A. Lessico (3 punti)]'
			},
			{
				type: 'text',
				content: '#strong[1.] Individua nel testo :'
			},
			{
				type: 'text',
				content: 'a) il sinonimo di « protezione / difesa » (§3) : ............................',
				answer: 'a) tutela (o salvaguardia)',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) il contrario di « rafforza / consolida » (§2) : ............................',
				answer: 'b) indebolisce',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[2.] Completa la seguente tabella morfologica.'
			},
			buildItalianWordFamilyTableBlock([
				{
					verbo: { given: true, value: 'informare' },
					sostantivo: { value: 'informazione', mark: '0.25' },
					aggettivo: { value: 'informativo / informato', mark: '0.25' }
				},
				{
					verbo: { value: 'proteggere', mark: '0.25' },
					sostantivo: { given: true, value: 'protezione' },
					aggettivo: { value: 'protettivo / protetto', mark: '0.25' }
				}
			]),
			{
				type: 'text',
				content:
					'#strong[3.] Classifica le espressioni nella tabella : #emph[verifica delle fonti ; notizie false ; biblioteche digitali ; violazione della privacy ; password robuste ; disinformazione].'
			},
			buildItalianClassificationTableBlock({
				columns: [
					{
						header: 'Pratiche serie e sicure',
						items: ['verifica delle fonti', 'biblioteche digitali', 'password robuste'],
						mark: '0.5'
					},
					{
						header: 'Rischi da evitare in rete',
						items: ['notizie false', 'violazione della privacy', 'disinformazione'],
						mark: '0.5'
					}
				]
			}),
			{
				type: 'text',
				content: '#strong[B. Grammatica e morfosintassi (4 punti)]'
			},
			{
				type: 'image',
				src: svgCongiuntivoMediaUrl,
				width: 'full',
				caption: 'Figura : Schema dell’uso del congiuntivo presente e dei connettivi nel giornalismo.'
			},
			{
				type: 'text',
				content:
					'#strong[4.] Completa le frasi coniugando i verbi tra parentesi al congiuntivo presente :'
			},
			{
				type: 'text',
				content:
					'a) Bisogna che i giornalisti #strong[(verificare)] sempre i documenti prima di pubblicare un servizio.',
				answer:
					'a) Bisogna che i giornalisti verifichino sempre i documenti prima di pubblicare un servizio.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Il liceo aggiorna i sistemi informatici affinché gli studenti #strong[(tutelare)] i propri dati.',
				answer:
					'b) Il liceo aggiorna i sistemi informatici affinché gli studenti tutelino i propri dati.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[5.] Completa ogni frase con il connettivo logico corretto : #emph[tuttavia / perciò].'
			},
			{
				type: 'text',
				content:
					'a) Le reti digitali trasmettono migliaia di notizie ogni minuto ; ............, occorre verificare ogni fonte con attenzione.',
				answer: 'a) tuttavia',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Nadia ha protetto il proprio account con una password sicura ; ............, ha evitato ogni accesso indesiderato.',
				answer: 'b) perciò',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[6.] Trasforma la frase dal discorso diretto al discorso indiretto :\nIl direttore del giornale scolastico annunciò : « La piattaforma adotterà nuovi controlli e proteggerà tutti gli archivi. »',
				answer:
					'Il direttore del giornale scolastico annunciò che la piattaforma avrebbe adottato nuovi controlli e avrebbe protetto tutti gli archivi.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'#strong[7.] Unisci le due proposizioni con la congiunzione concessiva « sebbene + congiuntivo presente » :\n« Circolano molti messaggi non verificati. Un lettore attento controlla sempre le fonti scientifiche. »',
				answer:
					'Sebbene circolino molti messaggi non verificati, un lettore attento controlla sempre le fonti scientifiche.',
				mark: '1'
			}
		]
	};

	const expr: ExerciseBlock = {
		id: 'it_2023_t2_expr',
		customTitle: 'III. Produzione scritta',
		points: 6,
		instruction: 'Scegli UNA delle due tracce e scrivi un testo ben strutturato di 120–150 parole.',
		content: [
			buildItalianWrittenProductionBlock({
				tracciaUnoTitle: 'Traccia 1 (Guidata) :',
				tracciaUnoPrompt:
					'Il club scientifico del tuo liceo organizza un incontro dedicato a « Giornalismo serio e protezione dei dati ». Redigi un breve articolo informativo (120–150 parole) per spiegare ai compagni come sfruttare le risorse digitali senza cadere nella disinformazione.',
				tracciaUnoPunti: [
					'Ricorda due vantaggi delle biblioteche digitali per lo studio e la ricerca.',
					'Proponi tre regole pratiche per verificare le fonti e proteggere i dati personali.',
					'Impiega almeno due connettivi logici (tuttavia, perciò, inoltre) e una proposizione con affinché.'
				],
				tracciaDuePrompt:
					'« La velocità dell’informazione digitale non può mai sostituire la serietà della verifica e il rispetto della riservatezza personale. » Esponi la tua opinione motivata in un saggio breve di 120–150 parole.',
				rubricSummary:
					'Pertinenza dei contenuti e rispetto della consegna (2 pti) ; progressione logica e uso dei connettivi (1.5 pto) ; padronanza del congiuntivo, discorso indiretto e lessico tecnologico (1.5 pto) ; ortografia e chiarezza (1 pto).',
				modelAnswer:
					'Le tecnologie dell’informazione e le biblioteche digitali offrono oggi agli studenti un accesso rapido a dizionari, archivi universitari e ricerche scientifiche di valore. Tuttavia, la velocità della rete diventa rischiosa quando circolano notizie prive di controllo o si trascura la sicurezza informatica nelle scuole.\n\nPer usare la rete con maturità e discernimento, bisogna seguire poche regole chiare. In primo luogo, è necessario verificare sempre l’autorevolezza e le fonti di ogni documento prima di citarlo in un lavoro scolastico. Inoltre, conviene adottare password robuste e aggiornare regolarmente i dispositivi affinché i dati personali rimangano tutelati da accessi indesiderati. Perciò, il giornalismo serio e la scuola collaborano per educare lettori attenti e rispettosi della verità.\n\nIn conclusione, la competenza digitale autentica non consiste nella sola rapidità tecnica, ma nell’unione costante tra metodo scientifico, riservatezza e responsabilità morale.',
				mark: '6'
			})
		]
	};

	return buildOfficialItalianBacPaper({
		slug: 'bac-2023-3as-le-italian-t2',
		academicYear: '2023',
		topicNumber: 2,
		ambitoIt: 'Scienza, Tecnologia e Informazione',
		titleTopicIt: 'Tecnologia dell’informazione, giornalismo serio e tutela dei dati',
		titleTopicAr: 'تكنولوجيا الإعلام والصحافة الجادة وحماية البيانات',
		themesIt: [
			'Tecnologia dell’informazione',
			'Giornalismo serio e verifica delle fonti',
			'Tutela dei dati personali',
			'Congiuntivo, discorso indiretto e connettivi'
		],
		themesAr: [
			'تكنولوجيا الإعلام والاتصال',
			'الصحافة الجادة والتحقق من المصادر',
			'حماية البيانات الشخصية',
			'المنصوب والأسلوب غير المباشر والروابط المنطقية'
		],
		exercises: [comp, ling, expr]
	});
}

// ============================================================================
// 3. BAC 2024 — Traccia 1 (bac-2024-3as-le-italian-t1)
// Tutela dell’ambiente, energie rinnovabili e il progetto Algeria Verde
// ============================================================================

function buildBac2024ItalianT1(): OfficialItalianBacPaperSpec {
	const comp: ExerciseBlock = {
		id: 'it_2024_t1_comp',
		customTitle: 'I. Comprensione del testo',
		points: 7,
		instruction: 'Leggi attentamente il testo ecologico e rispondi con chiarezza alle domande.',
		content: [
			buildItalianPassageBlock({
				title: 'Algeria Verde e fonti rinnovabili : un impegno concreto per il futuro ambientale',
				paragraphs: [
					'Le ondate di calore prolungate, la scarsità delle piogge e l’avanzata della desertificazione impongono oggi alle regioni mediterranee e sahariane scelte ecologiche coraggiose. Proteggere il suolo fertile e salvaguardare le riserve d’acqua dolce non è più un semplice tema teorico, bensì una priorità scientifica urgente per garantire la qualità della vita alle prossime generazioni.',
					'In questa prospettiva, il progetto « Algeria Verde » rilancia il rimboschimento su larga scala lungo le alte pianure e ai margini del Sahara attraverso il rafforzamento della Diga Verde. Se le scuole, le associazioni locali e i comuni piantassero specie vegetali resistenti come l’olivo e il pino d’Aleppo, frenerebbero l’erosione del vento e proteggerebbero [[questi territori fragili]] dalla siccità.',
					'Parallelamente, la transizione verso le energie rinnovabili rappresenta una risorsa decisiva per ridurre le emissioni inquinanti. I parchi solari fotovoltaici nel Sud algerino e le turbine eoliche nelle zone ventose permettono di produrre elettricità pulita sfruttando beni naturali abbondanti. [[Tali impianti]] contribuiscono inoltre a dissalare l’acqua marina e a sostenere un’irrigazione agricola più razionale.',
					'Tuttavia, le grandi opere tecniche non basterebbero senza la responsabilità quotidiana di ogni cittadino. Praticare la raccolta differenziata di carta, vetro e plastica, chiudere i rubinetti per evitare sprechi d’acqua e rispettare i boschi durante le escursioni sono gesti semplici che esprimono riconoscenza verso il creato e senso civico.'
				],
				source: 'Quaderni di Ecologia Mediterranea e Sviluppo Sostenibile, Edizione SujetStore',
				numberedParagraphs: true,
				glossary: [
					{
						term: 'rimboschimento',
						meaning: 'piantagione organizzata di nuovi alberi per ripristinare boschi e proteggere il suolo'
					},
					{
						term: 'erosione',
						meaning: 'consumo progressivo dello strato fertile del terreno causato dal vento o dall’acqua'
					},
					{
						term: 'raccolta differenziata',
						meaning: 'separazione dei rifiuti secondo il materiale per favorirne il riciclaggio'
					}
				]
			}),
			buildIllustratedFigureBlock('ita_04_ambiente_energie_rinnovabili', {
				lang: 'it',
				mode: 'labeled',
				pins: [],
				width: '62%',
				maxHeight: 128,
				caption: 'Documento visivo : Energia solare, energia eolica, riciclaggio e progetto Algeria Verde.'
			}),
			{
				type: 'text',
				content: '#strong[1.] Scegli l’affermazione che sintetizza correttamente l’idea centrale del testo.'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: 'Il messaggio fondamentale del brano afferma che :',
						options: [
							'la tutela dell’ambiente dipende soltanto dalle piogge stagionali senza intervento umano',
							'il progetto Algeria Verde, le energie rinnovabili e i gesti ecologici quotidiani difendono insieme il futuro ambientale',
							'le energie fossili non hanno alcuna influenza sul clima del bacino mediterraneo'
						],
						correct:
							'il progetto Algeria Verde, le energie rinnovabili e i gesti ecologici quotidiani difendono insieme il futuro ambientale',
						mark: '1'
					}
				]
			},
			{
				type: 'text',
				content:
					'#strong[2.] Indica se le frasi sono Vere o False e giustifica ogni scelta mediante il testo.'
			},
			{
				type: 'true_false',
				items: [
					{
						q: 'a) La difesa del suolo fertile e delle riserve idriche riguarda soltanto un futuro molto lontano.',
						a: 'Falso',
						c: 'Non è più un semplice tema teorico, bensì una priorità scientifica urgente per garantire la qualità della vita alle prossime generazioni (§1).',
						mark: '0.5'
					},
					{
						q: 'b) Il rafforzamento della Diga Verde mira a fermare l’erosione attraverso la piantagione di alberi adatti.',
						a: 'Vero',
						c: 'Il progetto Algeria Verde rilancia il rimboschimento rafforzando la Diga Verde con specie resistenti per frenare l’erosione del vento (§2).',
						mark: '0.5'
					},
					{
						q: 'c) Le energie solare ed eolica producono elettricità pulita e possono aiutare l’irrigazione agricola.',
						a: 'Vero',
						c: 'I parchi fotovoltaici e le turbine eoliche producono elettricità pulita, aiutano a dissalare l’acqua e sostengono un’irrigazione più razionale (§3).',
						mark: '0.5'
					},
					{
						q: 'd) La raccolta differenziata e il risparmio d’acqua domestico sono inutili se esistono impianti solari.',
						a: 'Falso',
						c: 'Le grandi opere tecniche non basterebbero senza la responsabilità quotidiana di ogni cittadino (§4).',
						mark: '0.5'
					}
				]
			},
			{
				type: 'text',
				content: '#strong[3.] Rispondi alle domande seguenti con parole tue.'
			},
			{
				type: 'text',
				content:
					'a) Che ruolo svolgono le energie rinnovabili nel terzo paragrafo oltre alla produzione elettrica ?',
				answer:
					'a) Oltre a ridurre le emissioni inquinanti generando elettricità pulita, sostengono la dissalazione dell’acqua marina e un’irrigazione agricola più razionale.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'b) Quali tre comportamenti civici quotidiani sono raccomandati nel quarto paragrafo ?',
				answer:
					'b) Fare la raccolta differenziata, chiudere i rubinetti per evitare sprechi d’acqua e rispettare i boschi durante le escursioni.',
				mark: '1'
			},
			{
				type: 'text',
				content: '#strong[4.] Indica a che cosa si riferiscono le espressioni sottolineate nel testo :'
			},
			{
				type: 'text',
				content: 'a) « questi territori fragili » (§2) si riferisce a : ............................',
				answer:
					'a) Si riferisce alle alte pianure e alle zone ai margini del Sahara esposte al vento e alla siccità.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) « Tali impianti » (§3) si riferisce a : ............................',
				answer:
					'b) Si riferisce ai parchi solari fotovoltaici e alle turbine eoliche.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[5.] Completa la tabella comparativa in base al testo.'
			},
			{
				type: 'table',
				headers: ['Sfida ecologica', 'Soluzione sostenibile citata'],
				cells: [],
				rows: [
					[
						{ content: 'Avanzata della desertificazione ed erosione', bold: true },
						{
							content: '....................',
							answer: 'Rimboschimento del progetto Algeria Verde e Diga Verde con olivi e pini d’Aleppo.',
							mark: '0.5'
						}
					],
					[
						{ content: 'Inquinamento energetico e spreco dei rifiuti', bold: true },
						{
							content: '....................',
							answer: 'Parchi solari, energia eolica, raccolta differenziata e risparmio idrico.',
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
		id: 'it_2024_t1_ling',
		customTitle: 'II. Competenza linguistica',
		points: 7,
		instruction: 'Esegui con precisione gli esercizi di lessico, congiuntivo imperfetto e periodo ipotetico.',
		content: [
			{
				type: 'text',
				content: '#strong[A. Lessico (3 punti)]'
			},
			{
				type: 'text',
				content: '#strong[1.] Cerca nel testo :'
			},
			{
				type: 'text',
				content: 'a) il sinonimo di « abbondanza » in senso contrario, cioè « mancanza / carenza » (§1) : ............................',
				answer: 'a) scarsità',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) il contrario di « risparmio / economia » (§4) : ............................',
				answer: 'b) sprechi (spreco)',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[2.] Completa la tabella della famiglia di parole.'
			},
			buildItalianWordFamilyTableBlock([
				{
					verbo: { given: true, value: 'rinnovare' },
					sostantivo: { value: 'rinnovamento', mark: '0.25' },
					aggettivo: { value: 'rinnovabile / rinnovato', mark: '0.25' }
				},
				{
					verbo: { value: 'inquinare', mark: '0.25' },
					sostantivo: { given: true, value: 'inquinamento' },
					aggettivo: { value: 'inquinante / inquinato', mark: '0.25' }
				}
			]),
			{
				type: 'text',
				content:
					'#strong[3.] Classifica le espressioni nella tabella : #emph[energia solare ; siccità ; raccolta differenziata ; desertificazione ; rimboschimento ; emissioni inquinanti].'
			},
			buildItalianClassificationTableBlock({
				columns: [
					{
						header: 'Soluzioni ed energie pulite',
						items: ['energia solare', 'raccolta differenziata', 'rimboschimento'],
						mark: '0.5'
					},
					{
						header: 'Minacce ambientali',
						items: ['siccità', 'desertificazione', 'emissioni inquinanti'],
						mark: '0.5'
					}
				]
			}),
			{
				type: 'text',
				content: '#strong[B. Grammatica e morfosintassi (4 punti)]'
			},
			{
				type: 'text',
				content:
					'#strong[4.] Coniuga i verbi tra parentesi al congiuntivo imperfetto :'
			},
			{
				type: 'text',
				content:
					'a) Sarebbe auspicabile che ogni liceo #strong[(installare)] pannelli fotovoltaici sul proprio tetto.',
				answer: 'a) Sarebbe auspicabile che ogni liceo installasse pannelli fotovoltaici sul proprio tetto.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Gli agronomi speravano che i cittadini #strong[(ridurre)] il consumo inutile di acqua dolce.',
				answer:
					'b) Gli agronomi speravano che i cittadini riducessero il consumo inutile di acqua dolce.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[5.] Completa correttamente i periodi ipotetici (1º tipo della realtà e 2º tipo della possibilità) :'
			},
			{
				type: 'text',
				content:
					'a) (1º tipo) Se le classi #strong[(partecipare)] alla campagna di rimboschimento, il cortile #strong[(diventare)] più fresco e verde.',
				answer:
					'a) Se le classi parteciperanno (o partecipano) alla campagna di rimboschimento, il cortile diventerà più fresco e verde.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) (2º tipo) Se tutti #strong[(separare)] con attenzione plastica e carta, #strong[(proteggere)] meglio i nostri fiumi.',
				answer:
					'b) Se tutti separassero con attenzione plastica e carta, proteggerebbero meglio i nostri fiumi.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[6.] Trasforma il seguente periodo ipotetico dal 1º tipo (realtà) al 2º tipo (possibilità) :\n« Se risparmieremo l’acqua potabile e useremo l’energia solare, freneremo la desertificazione. »',
				answer:
					'Se risparmiassimo l’acqua potabile e usassimo l’energia solare, freneremmo la desertificazione.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'#strong[7.] Completa le frasi con il connettivo causale o consecutivo adatto : #emph[poiché / perciò].'
			},
			{
				type: 'text',
				content:
					'a) Le piogge sono diminuite negli ultimi anni ; ............, conviene adottare un’irrigazione agricola razionale.',
				answer: 'a) perciò',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Il Sahara offre un’ottima resa per i pannelli solari ............ gode di un’abbondante irradiazione tutto l’anno.',
				answer: 'b) poiché',
				mark: '0.5'
			}
		]
	};

	const expr: ExerciseBlock = {
		id: 'it_2024_t1_expr',
		customTitle: 'III. Produzione scritta',
		points: 6,
		instruction: 'Scegli UNA delle due tracce proposte e redigi un testo di 120–150 parole.',
		content: [
			buildItalianWrittenProductionBlock({
				tracciaUnoTitle: 'Traccia 1 (Guidata) :',
				tracciaUnoPrompt:
					'A nome del club ecologico del tuo liceo, scrivi una lettera formale al dirigente scolastico (120–150 parole) per proporre una « Giornata dell’Algeria Verde » dedicata al rimboschimento del cortile e alla raccolta differenziata.',
				tracciaUnoPunti: [
					'Rispetta le formule della lettera formale (destinatario, apertura, corpo e saluto finale).',
					'Proponi due azioni concrete (piantare alberi adatti, installare contenitori per il riciclaggio e cartelli per il risparmio d’acqua).',
					'Inserisci almeno un periodo ipotetico del 2º tipo (Se + congiuntivo imperfetto, condizionale).'
				],
				tracciaDuePrompt:
					'« Passare alle energie rinnovabili e rispettare l’acqua non è una scelta secondaria, ma un dovere morale verso chi verrà dopo di noi. » Esponi il tuo punto di vista in un testo argomentativo (120–150 parole).',
				rubricSummary:
					'Aderenza alla tipologia testuale e ricchezza di proposte (2 pti) ; coerenza e connettivi (1.5 pto) ; periodo ipotetico 1º/2º tipo, congiuntivo imperfetto e lessico ambientale (1.5 pto) ; ortografia e presentazione (1 pto).',
				modelAnswer:
					'Egregio Signor Dirigente,\n\na nome del club ecologico del terzo anno, Le scrivo per proporre l’organizzazione di una « Giornata dell’Algeria Verde » nel nostro liceo durante il prossimo mese. Di fronte alla scarsità delle piogge e all’aumento del calore, riteniamo urgente educare tutti gli studenti alla tutela concreta dell’ambiente.\n\nSe ottenessimo la Sua autorizzazione, pianteremmo quindici giovani ulivi lungo il giardino scolastico e collocheremmo contenitori separati per carta, vetro e plastica. Inoltre, prepareremmo brevi avvisi sul risparmio dell’acqua potabile e un pannello informativo sulle energie rinnovabili solare ed eolica, poiché anche i piccoli gesti quotidiani costruiscono il senso civico.\n\nRingraziandoLa anticipatamente per la Sua attenzione e per il costante sostegno alle iniziative studentesche, Le porgo i miei più rispettosi saluti.\n\nIl rappresentante del club ecologico',
				mark: '6'
			})
		]
	};

	return buildOfficialItalianBacPaper({
		slug: 'bac-2024-3as-le-italian-t1',
		academicYear: '2024',
		topicNumber: 1,
		ambitoIt: 'Tutela dell’Ambiente e Sviluppo Sostenibile',
		titleTopicIt: 'Tutela dell’ambiente, energie rinnovabili e il progetto Algeria Verde',
		titleTopicAr: 'حماية البيئة والطاقات المتجددة ومشروع الجزائر الخضراء',
		themesIt: [
			'Progetto Algeria Verde e Diga Verde',
			'Energie rinnovabili solare ed eolica',
			'Raccolta differenziata e risparmio idrico',
			'Periodo ipotetico 1º/2º tipo e congiuntivo imperfetto'
		],
		themesAr: [
			'مشروع الجزائر الخضراء والسد الأخضر',
			'الطاقات المتجددة الشمسية والريحية',
			'الفرز الانتقائي وترشيد استهلاك المياه',
			'الجملة الشرطية (النوع 1 و2) والمنصوب الناقص'
		],
		exercises: [comp, ling, expr]
	});
}

// ============================================================================
// 4. BAC 2024 — Traccia 2 (bac-2024-3as-le-italian-t2)
// Patrimonio architettonico mediterraneo e cartografia storica
// (Casbah di Algeri, Moschea di Tlemcen, M’Zab, Al-Idrisi, Al-Zahrawi)
// ============================================================================

function buildBac2024ItalianT2(): OfficialItalianBacPaperSpec {
	const comp: ExerciseBlock = {
		id: 'it_2024_t2_comp',
		customTitle: 'I. Comprensione del testo',
		points: 7,
		instruction: 'Leggi attentamente questo testo storico-culturale e rispondi alle domande.',
		content: [
			buildItalianPassageBlock({
				title: 'Capolavori di pietra e mappe antiche : l’eredità scientifica e architettonica del Mediterraneo',
				paragraphs: [
					'Tra le sponde dell’Africa settentrionale e dell’Europa meridionale sorgono città storiche che testimoniano una lunga tradizione di ingegneria, geometria e armonia urbana. Chi percorre le stradine ombreggiate della Casbah di Algeri, ammira gli archi scolpiti della Grande Moschea di Tlemcen oppure osserva le abitazioni in pietra calcarea della Valle dello M’Zab scopre come gli antichi costruttori adattassero ogni edificio al clima, alla luce e alla vita comunitaria.',
					'La ricchezza di [[questo patrimonio]] non risplende soltanto nelle cupole, nei cortili freschi e nei sistemi idraulici delle oasi, ma anche nei manoscritti custoditi nelle antiche biblioteche. Nel XII secolo, il celebre geografo Al-Idrisi operò in Sicilia e realizzò un’opera cartografica di straordinaria precisione, descrivendo mari, porti e rotte commerciali con un rigore matematico che stupì gli studiosi di tutto il Mediterraneo.',
					'Nello stesso orizzonte scientifico si distinse il medico e chirurgo Al-Zahrawi, noto in Europa come Abulcasis. Egli redasse trattati medici sistematici e disegnò oltre duecento strumenti chirurgici, i quali furono studiati per secoli nelle facoltà mediche europee. Accanto alle [[sue ricerche]], l’esempio delle scuole aperte alla conoscenza dimostra quanto il metodo sperimentale e la cura della precisione abbiano guidato quei maestri.',
					'Custodire oggi la Casbah di Algeri, la Grande Moschea di Tlemcen, la Valle dello M’Zab e la memoria di studiosi come Al-Idrisi e Al-Zahrawi non equivale a guardare il passato con immobilità. Al contrario, conoscere queste radici ispira i giovani algerini a coltivare lo studio serio, l’etica professionale e il dialogo rispettoso tra le civiltà del Mediterraneo.'
				],
				source: 'Archivio Storico dell’Architettura e delle Scienze Mediterranee, Edizione SujetStore',
				numberedParagraphs: true,
				glossary: [
					{
						term: 'cartografica',
						meaning: 'relativa all’arte e alla scienza di disegnare mappe geografiche esatte'
					},
					{
						term: 'sistemi idraulici',
						meaning: 'opere ingegneristiche per raccogliere, dividere e distribuire l’acqua con equilibrio'
					},
					{
						term: 'metodo sperimentale',
						meaning: 'procedimento scientifico fondato sull’osservazione accurata e sulla verifica pratica'
					}
				]
			}),
			buildIllustratedFigureBlock('ita_02_patrimonio_architettonico_mediterraneo', {
				lang: 'it',
				mode: 'labeled',
				pins: [],
				width: '62%',
				maxHeight: 128,
				caption: 'Documento visivo : Casbah di Algeri, Grande Moschea di Tlemcen, cartografia di Al-Idrisi e geometria storica.'
			}),
			{
				type: 'text',
				content: '#strong[1.] Scegli la risposta corretta tra le tre opzioni proposte.'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: 'Il tema centrale del testo riguarda :',
						options: [
							'l’abbandono delle città storiche a favore delle costruzioni metalliche moderne',
							'il legame tra il patrimonio architettonico algerino-mediterraneo e i contributi scientifici di Al-Idrisi e Al-Zahrawi',
							'lo sviluppo dei trasporti ferroviari nel diciannovesimo secolo'
						],
						correct:
							'il legame tra il patrimonio architettonico algerino-mediterraneo e i contributi scientifici di Al-Idrisi e Al-Zahrawi',
						mark: '1'
					}
				]
			},
			{
				type: 'text',
				content:
					'#strong[2.] Stabilisci se ogni enunciato è Vero o Falso e giustifica la risposta con elementi del testo.'
			},
			{
				type: 'true_false',
				items: [
					{
						q: 'a) Le costruzioni della Casbah di Algeri e della Valle dello M’Zab furono progettate senza tenere conto del clima.',
						a: 'Falso',
						c: 'Gli antichi costruttori adattarono ogni edificio al clima, alla luce e alla vita comunitaria (§1).',
						mark: '0.5'
					},
					{
						q: 'b) Nel XII secolo Al-Idrisi lavorò in Sicilia e compose una cartografia molto precisa del Mediterraneo.',
						a: 'Vero',
						c: 'Al-Idrisi operò in Sicilia e realizzò un’opera cartografica di straordinaria precisione descrivendo mari, porti e rotte commerciali (§2).',
						mark: '0.5'
					},
					{
						q: 'c) I trattati e gli strumenti chirurgici disegnati da Al-Zahrawi rimasero sconosciuti fuori dalla sua città.',
						a: 'Falso',
						c: 'I suoi trattati e oltre duecento strumenti chirurgici furono studiati per secoli nelle facoltà mediche europee (§3).',
						mark: '0.5'
					},
					{
						q: 'd) Studiare il patrimonio storico incoraggia i giovani all’impegno scientifico e al dialogo rispettoso.',
						a: 'Vero',
						c: 'Conoscere queste radici ispira i giovani algerini a coltivare lo studio serio, l’etica professionale e il dialogo rispettoso (§4).',
						mark: '0.5'
					}
				]
			},
			{
				type: 'text',
				content: '#strong[3.] Rispondi con precisione alle seguenti domande.'
			},
			{
				type: 'text',
				content:
					'a) Quali tre luoghi architettonici algerini vengono citati nel primo paragrafo e quale principio li accomuna ?',
				answer:
					'a) Vengono citati la Casbah di Algeri, la Grande Moschea di Tlemcen e la Valle dello M’Zab ; li accomuna l’armonia geometrica e l’adattamento attento al clima, alla luce e alla vita della comunità.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'b) Quale contributo specifico lasciò Al-Zahrawi nella storia della medicina secondo il terzo paragrafo ?',
				answer:
					'b) Redasse trattati medici sistematici e disegnò oltre duecento strumenti chirurgici che furono studiati a lungo anche nelle università europee.',
				mark: '1'
			},
			{
				type: 'text',
				content: '#strong[4.] A che cosa o a chi si riferiscono le parole sottolineate nel testo ?'
			},
			{
				type: 'text',
				content: 'a) « questo patrimonio » (§2) si riferisce a : ............................',
				answer:
					'a) Si riferisce all’eredità architettonica e urbana rappresentata dalla Casbah di Algeri, dalla Grande Moschea di Tlemcen e dalla Valle dello M’Zab.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) « sue ricerche » (§3) si riferisce a : ............................',
				answer: 'b) Si riferisce alle ricerche mediche e chirurgiche di Al-Zahrawi (Abulcasis).',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[5.] Completa la scheda storica con i dati dei paragrafi 2 e 3.'
			},
			{
				type: 'table',
				headers: ['Studioso citato', 'Disciplina e opera principale'],
				cells: [],
				rows: [
					[
						{ content: 'Al-Idrisi', bold: true },
						{
							content: '....................',
							answer: 'Geografia e cartografia in Sicilia : descrizione precisa di mari, porti e rotte.',
							mark: '0.5'
						}
					],
					[
						{ content: 'Al-Zahrawi', bold: true },
						{
							content: '....................',
							answer: 'Medicina e chirurgia : trattati sistematici e oltre duecento strumenti disegnati.',
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
		id: 'it_2024_t2_ling',
		customTitle: 'II. Competenza linguistica',
		points: 7,
		instruction: 'Completa gli esercizi di lessico e grammatica storica (passato remoto, imperfetto e forma passiva).',
		content: [
			{
				type: 'text',
				content: '#strong[A. Lessico (3 punti)]'
			},
			{
				type: 'text',
				content: '#strong[1.] Estrai dal testo :'
			},
			{
				type: 'text',
				content: 'a) il sinonimo di « eredità storica » (§2) : ............................',
				answer: 'a) patrimonio',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) il contrario di « approssimazione / imprecisione » (§3) : ............................',
				answer: 'b) precisione (o rigore)',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[2.] Completa la tabella di derivazione lessicale.'
			},
			buildItalianWordFamilyTableBlock([
				{
					verbo: { given: true, value: 'costruire' },
					sostantivo: { value: 'costruzione', mark: '0.25' },
					aggettivo: { value: 'costruttivo / costruito', mark: '0.25' }
				},
				{
					verbo: { value: 'progettare', mark: '0.25' },
					sostantivo: { given: true, value: 'progetto' },
					aggettivo: { value: 'progettuale / progettato', mark: '0.25' }
				}
			]),
			{
				type: 'text',
				content:
					'#strong[3.] Classifica le espressioni nella tabella : #emph[Casbah di Algeri ; mappe di Al-Idrisi ; Grande Moschea di Tlemcen ; strumenti di Al-Zahrawi ; Valle dello M’Zab ; trattati medici].'
			},
			buildItalianClassificationTableBlock({
				columns: [
					{
						header: 'Patrimonio architettonico algerino',
						items: ['Casbah di Algeri', 'Grande Moschea di Tlemcen', 'Valle dello M’Zab'],
						mark: '0.5'
					},
					{
						header: 'Scienza e cartografia storica',
						items: ['mappe di Al-Idrisi', 'strumenti di Al-Zahrawi', 'trattati medici'],
						mark: '0.5'
					}
				]
			}),
			{
				type: 'text',
				content: '#strong[B. Grammatica e morfosintassi (4 punti)]'
			},
			{
				type: 'text',
				content:
					'#strong[4.] Coniuga i verbi tra parentesi al passato remoto o all’imperfetto indicativo secondo il contesto storico :'
			},
			{
				type: 'text',
				content:
					'a) Mentre i copisti #strong[(trascrivere)] con cura i codici nelle biblioteche, Al-Idrisi #strong[(completare)] in Sicilia la sua celebre mappa.',
				answer:
					'a) Mentre i copisti trascrivevano con cura i codici nelle biblioteche, Al-Idrisi completò in Sicilia la sua celebre mappa.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Nel periodo in cui l’acqua #strong[(scorrere)] nei canali della Valle dello M’Zab, gli abitanti #strong[(costruire)] città ordinate e fresche.',
				answer:
					'b) Nel periodo in cui l’acqua scorreva nei canali della Valle dello M’Zab, gli abitanti costruirono città ordinate e fresche.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[5.] Trasforma le seguenti frasi alla forma passiva :'
			},
			{
				type: 'text',
				content:
					'a) Nel secolo scorso gli architetti restaurarono con attenzione diverse case della Casbah di Algeri.',
				answer:
					'a) Nel secolo scorso diverse case della Casbah di Algeri furono restaurate con attenzione dagli architetti.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Gli studiosi moderni analizzano con ammirazione la Grande Moschea di Tlemcen.',
				answer:
					'b) La Grande Moschea di Tlemcen è (o viene) analizzata con ammirazione dagli studiosi moderni.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[6.] Coniuga i verbi tra parentesi al congiuntivo imperfetto :'
			},
			{
				type: 'text',
				content:
					'a) I maestri desideravano che gli allievi #strong[(custodire)] i trattati di Al-Zahrawi con fedeltà.',
				answer:
					'a) I maestri desideravano che gli allievi custodissero i trattati di Al-Zahrawi con fedeltà.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Era indispensabile che i cartografi #strong[(avere)] misurazioni rigorose dei porti mediterranei.',
				answer:
					'b) Era indispensabile che i cartografi avessero misurazioni rigorose dei porti mediterranei.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[7.] Volgi al discorso indiretto :\nLa guida del museo spiegò ai liceali : « La Casbah di Algeri e la Valle dello M’Zab mostrano ancora oggi l’ingegno costruttivo dei nostri antenati. »',
				answer:
					'La guida del museo spiegò ai liceali che la Casbah di Algeri e la Valle dello M’Zab mostravano ancora allora (o mostrano ancora oggi) l’ingegno costruttivo dei loro antenati.',
				mark: '1'
			}
		]
	};

	const expr: ExerciseBlock = {
		id: 'it_2024_t2_expr',
		customTitle: 'III. Produzione scritta',
		points: 6,
		instruction: 'Scegli UNA delle due tracce proposte e redigi un testo di 120–150 parole.',
		content: [
			buildItalianWrittenProductionBlock({
				tracciaUnoTitle: 'Traccia 1 (Guidata) :',
				tracciaUnoPrompt:
					'Per la rivista culturale del tuo istituto, scrivi un articolo divulgativo (120–150 parole) che presenti la ricchezza del patrimonio architettonico algerino (Casbah di Algeri, Grande Moschea di Tlemcen, Valle dello M’Zab) e il ruolo storico di scienziati come Al-Idrisi e Al-Zahrawi.',
				tracciaUnoPunti: [
					'Cita almeno due monumenti algerini evidenziandone l’armonia con l’ambiente.',
					'Ricorda i meriti geografici di Al-Idrisi e quelli medici di Al-Zahrawi usando passato remoto e imperfetto.',
					'Concludi spiegando perché i giovani devono proteggere questo patrimonio.'
				],
				tracciaDuePrompt:
					'« Conoscere la storia della scienza e proteggere i monumenti antichi rafforza la nostra identità e illumina il dialogo con gli altri popoli. » Sviluppa questa idea in un testo argomentativo (120–150 parole).',
				rubricSummary:
					'Esattezza storica e aderenza alla traccia (2 pti) ; organizzazione in tre parti e coesione (1.5 pto) ; uso corretto di passato remoto, imperfetto, forma passiva e lessico storico (1.5 pto) ; ortografia e punteggiatura (1 pto).',
				modelAnswer:
					'Nel cuore del Mediterraneo, la storia architettonica e scientifica unisce monumenti ammirati e studiosi di straordinario rigore intellettuale. Chi visita la Casbah di Algeri, la Grande Moschea di Tlemcen oppure la Valle dello M’Zab osserva edifici armoniosi che rispondevano con intelligenza al clima, alla luce naturale e ai bisogni idraulici delle città storiche.\n\nAccanto alla pietra scolpita, brillò la ricerca nei manoscritti custoditi nelle biblioteche. Nel XII secolo, mentre i copisti trascrivevano i codici antichi, Al-Idrisi disegnò in Sicilia carte geografiche di notevole precisione. Allo stesso modo, Al-Zahrawi elaborò trattati medici sistematici e oltre duecento strumenti chirurgici che furono studiati a lungo in tutto il bacino mediterraneo.\n\nIn conclusione, proteggere questo patrimonio non significa chiudersi nel passato, ma trarre esempio dalla serietà dei nostri predecessori per coltivare oggi la scienza e il dialogo culturale.',
				mark: '6'
			})
		]
	};

	return buildOfficialItalianBacPaper({
		slug: 'bac-2024-3as-le-italian-t2',
		academicYear: '2024',
		topicNumber: 2,
		ambitoIt: 'Patrimonio Storico e Scienza Mediterranea',
		titleTopicIt: 'Patrimonio architettonico mediterraneo e cartografia storica',
		titleTopicAr: 'التراث المعماري المتوسطي والخرائط العلمية التاريخية',
		themesIt: [
			'Casbah di Algeri, Tlemcen e Valle dello M’Zab',
			'Cartografia di Al-Idrisi e medicina di Al-Zahrawi',
			'Architettura storica del Mediterraneo',
			'Passato remoto, imperfetto e forma passiva'
		],
		themesAr: [
			'قصبة الجزائر وتلمسان ووادي ميزاب',
			'خرائط الإدريسي وطب الزهراوي',
			'العمارة التاريخية المتوسطية',
			'الماضي البعيد والناقص والمبني للمجهول'
		],
		exercises: [comp, ling, expr]
	});
}

// ============================================================================
// 5. BAC 2025 — Traccia 1 (bac-2025-3as-le-italian-t1)
// Alimentazione mediterranea sana, sport e artigianato di qualità
// (Strictly halal: olio d’oliva, verdure, frutta, grano, agrumi, ceramica)
// ============================================================================

function buildBac2025ItalianT1(): OfficialItalianBacPaperSpec {
	const comp: ExerciseBlock = {
		id: 'it_2025_t1_comp',
		customTitle: 'I. Comprensione del testo',
		points: 7,
		instruction: 'Leggi attentamente il seguente testo sulla salute e sul lavoro artigianale, poi rispondi alle domande.',
		content: [
			buildItalianPassageBlock({
				title: 'Dieta mediterranea equilibrata, sport e artigianato di qualità : strade di benessere',
				paragraphs: [
					'Sempre più medici e nutrizionisti raccomandano di riscoprire l’alimentazione mediterranea tradizionale per proteggere la salute dei giovani. Questo modello alimentare privilegia l’olio extravergine d’oliva, le verdure fresche di stagione, i legumi, il grano duro e i cereali integrali, accompagnati da frutta secca, datteri, agrumi profumati e abbondante acqua pura. Evitare gli alimenti industriali ricchi di zuccheri raffinati aiuta gli studenti a mantenere energia costante durante tutta la giornata scolastica.',
					'Tuttavia, una buona tavola non basta da sola senza un esercizio fisico regolare. Praticare lo sport, camminare all’aria aperta o dedicarsi al nuoto migliora la respirazione, rafforza il cuore e favorisce la serenità mentale prima delle prove d’esame. Gli allenatori ricordano spesso che [[questa disciplina]] quotidiana insegna il rispetto delle regole, la pazienza e la collaborazione con i compagni.',
					'Accanto al benessere fisico, le società mediterranee valorizzano da secoli l’artigianato di qualità come espressione di lavoro onesto e creatività ordinata. Nei laboratori di ceramica geometrica, nella lavorazione del legno di ulivo e nella tessitura manuale di tappeti tradizionali, ogni artigiano trasforma materie prime naturali in oggetti utili e durevoli. Acquistare [[tali manufatti]] sostiene l’economia familiare e mantiene vivi mestieri rispettosi dell’ambiente.',
					'Per questo motivo, alimentazione sana, attività sportiva e maestria artigianale condividono gli stessi valori fondamentali : equilibrio, misura, cura dei dettagli e riconoscenza per le risorse naturali offerte dalla nostra terra.'
				],
				source: 'Rivista Mediterranea di Salute, Sport e Artigianato, Edizione SujetStore',
				numberedParagraphs: true,
				glossary: [
					{
						term: 'cereali integrali',
						meaning: 'chicchi di grano o orzo lavorati senza togliere le fibre e i sali minerali naturali'
					},
					{
						term: 'maestria',
						meaning: 'abilità tecnica raffinata acquisita con lungo esercizio e pazienza nel mestiere'
					},
					{
						term: 'manufatti',
						meaning: 'oggetti realizzati a mano dall’artigiano con cura e qualità'
					}
				]
			}),
			buildIllustratedFigureBlock('ita_06_alimentazione_sana_artigianato', {
				lang: 'it',
				mode: 'labeled',
				pins: [],
				width: '62%',
				maxHeight: 128,
				caption: 'Documento visivo : Olio d’oliva, cereali integrali, frutta di stagione e ceramica artigianale.'
			}),
			{
				type: 'text',
				content: '#strong[1.] Scegli la risposta corretta segnando la casella appropriata.'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: 'Secondo il testo, qual è il legame tra dieta mediterranea, sport e artigianato ?',
						options: [
							'Sono attività opposte che non hanno alcun valore educativo per gli studenti',
							'Condividono i valori dell’equilibrio, della misura, della salute e del rispetto delle risorse naturali',
							'Consistono nel sostituire i cibi freschi con spuntini industriali zuccherati'
						],
						correct:
							'Condividono i valori dell’equilibrio, della misura, della salute e del rispetto delle risorse naturali',
						mark: '1'
					}
				]
			},
			{
				type: 'text',
				content:
					'#strong[2.] Indica se le affermazioni seguenti sono Vere o False e giustifica ogni risposta con il testo.'
			},
			{
				type: 'true_false',
				items: [
					{
						q: 'a) L’alimentazione mediterranea tradizionale si basa su cibi freschi come olio d’oliva, verdure, agrumi e cereali integrali.',
						a: 'Vero',
						c: 'Questo modello alimentare privilegia l’olio extravergine d’oliva, le verdure fresche di stagione, i legumi, il grano duro, i cereali integrali e gli agrumi (§1).',
						mark: '0.5'
					},
					{
						q: 'b) I prodotti industriali molto zuccherati sono consigliati per avere energia equilibrata a scuola.',
						a: 'Falso',
						c: 'Il testo precisa che evitare gli alimenti industriali ricchi di zuccheri raffinati aiuta a mantenere energia costante (§1).',
						mark: '0.5'
					},
					{
						q: 'c) L’attività sportiva migliora sia il fisico sia la concentrazione mentale prima degli esami.',
						a: 'Vero',
						c: 'Praticare lo sport migliora la respirazione, rafforza il cuore e favorisce la serenità mentale prima delle prove d’esame (§2).',
						mark: '0.5'
					},
					{
						q: 'd) L’artigianato tradizionale danneggia l’economia locale e spreca materie sintetiche.',
						a: 'Falso',
						c: 'Ogni artigiano trasforma materie prime naturali in oggetti durevoli, e acquistare tali manufatti sostiene l’economia familiare (§3).',
						mark: '0.5'
					}
				]
			},
			{
				type: 'text',
				content: '#strong[3.] Rispondi con frasi complete alle seguenti domande.'
			},
			{
				type: 'text',
				content:
					'a) Quali valori morali e sociali insegna la pratica regolare dello sport secondo il secondo paragrafo ?',
				answer:
					'a) Lo sport insegna la disciplina quotidiana, il rispetto delle regole, la pazienza e la collaborazione leale con i compagni.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'b) Quali settori dell’artigianato di qualità vengono citati nel terzo paragrafo e con quali materie lavorano ?',
				answer:
					'b) Vengono citati i laboratori di ceramica geometrica, la lavorazione del legno di ulivo e la tessitura manuale di tappeti, che usano materie prime naturali.',
				mark: '1'
			},
			{
				type: 'text',
				content: '#strong[4.] A che cosa si riferiscono le parole sottolineate nel testo ?'
			},
			{
				type: 'text',
				content: 'a) « questa disciplina » (§2) si riferisce a : ............................',
				answer:
					'a) Si riferisce all’esercizio fisico regolare e alla pratica costante dello sport.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) « tali manufatti » (§3) si riferisce a : ............................',
				answer:
					'b) Si riferisce agli oggetti durevoli realizzati nei laboratori di ceramica, legno di ulivo e tessitura artigianale.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[5.] Completa la tabella di sintesi con le informazioni del testo.'
			},
			{
				type: 'table',
				headers: ['Pilastro del benessere', 'Beneficio indicato nel testo'],
				cells: [],
				rows: [
					[
						{ content: 'Dieta mediterranea naturale', bold: true },
						{
							content: '....................',
							answer: 'Protegge la salute e mantiene energia costante durante la giornata scolastica.',
							mark: '0.5'
						}
					],
					[
						{ content: 'Artigianato di qualità', bold: true },
						{
							content: '....................',
							answer: 'Sostiene l’economia familiare e valorizza mestieri onesti e rispettosi dell’ambiente.',
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
		id: 'it_2025_t1_ling',
		customTitle: 'II. Competenza linguistica',
		points: 7,
		instruction: 'Svolgi con precisione gli esercizi di lessico, pronomi combinati, particelle ci/ne e comparativi.',
		content: [
			{
				type: 'text',
				content: '#strong[A. Lessico (3 punti)]'
			},
			{
				type: 'text',
				content: '#strong[1.] Trova nel testo :'
			},
			{
				type: 'text',
				content: 'a) il sinonimo di « abitudine alimentare / regime sano » (§1) : ............................',
				answer: 'a) alimentazione (o modello alimentare)',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) il contrario di « artificiali / sintetici » (§3) : ............................',
				answer: 'b) naturali',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[2.] Completa la tabella della famiglia di parole.'
			},
			buildItalianWordFamilyTableBlock([
				{
					verbo: { given: true, value: 'nutrire' },
					sostantivo: { value: 'nutrizione / nutrimento', mark: '0.25' },
					aggettivo: { value: 'nutritivo / nutriente', mark: '0.25' }
				},
				{
					verbo: { value: 'creare', mark: '0.25' },
					sostantivo: { given: true, value: 'creatività / creazione' },
					aggettivo: { value: 'creativo / creato', mark: '0.25' }
				}
			]),
			{
				type: 'text',
				content:
					'#strong[3.] Classifica le espressioni nella tabella : #emph[olio extravergine d’oliva ; nuoto regolare ; agrumi e grano duro ; ceramica geometrica ; verdure fresche ; tessitura manuale].'
			},
			buildItalianClassificationTableBlock({
				columns: [
					{
						header: 'Alimentazione mediterranea sana',
						items: ['olio extravergine d’oliva', 'agrumi e grano duro', 'verdure fresche'],
						mark: '0.5'
					},
					{
						header: 'Sport e artigianato di qualità',
						items: ['nuoto regolare', 'ceramica geometrica', 'tessitura manuale'],
						mark: '0.5'
					}
				]
			}),
			{
				type: 'text',
				content: '#strong[B. Grammatica e morfosintassi (4 punti)]'
			},
			{
				type: 'text',
				content: '#strong[4.] Completa le frasi con il pronome combinato corretto :'
			},
			{
				type: 'text',
				content:
					'a) Il maestro vasaio mostra #underline[il piatto di ceramica] #underline[ai visitatori]. -> Il maestro vasaio ............ mostra in laboratorio.',
				answer: 'a) glielo',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) « Professoressa, ci consiglia questi manuali di nutrizione sana ? » « Sì, ............ consiglio volentieri. »',
				answer: 'b) ve li',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[5.] Completa con la particella pronominale adatta (#emph[ci] oppure #emph[ne]) :'
			},
			{
				type: 'text',
				content:
					'a) Quante porzioni di frutta e verdura fresca mangi ogni giorno ? ............ mangio cinque.',
				answer: 'a) Ne',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Vai spesso al campo sportivo del quartiere con i tuoi compagni ? Sì, ............ vado tre volte a settimana.',
				answer: 'b) ci',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[6.] Completa le frasi con i comparativi di maggioranza o di uguaglianza :'
			},
			{
				type: 'text',
				content:
					'a) (Maggioranza) Le arance fresche di stagione sono ............ salutari ............ merendine industriali.',
				answer: 'a) più ... delle',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) (Uguaglianza) La qualità delle materie prime è ............ importante ............ pazienza dell’artigiano.',
				answer: 'b) tanto ... quanto la (oppure : così ... come la)',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[7.] Riscrivi la frase sostituendo l’espressione sottolineata con il comparativo sintetico « migliore / migliori » :\n« L’olio d’oliva naturale e il grano duro garantiscono risultati #underline[più buoni] dei prodotti raffinati. »',
				answer:
					'L’olio d’oliva naturale e il grano duro garantiscono risultati migliori dei prodotti raffinati.',
				mark: '1'
			}
		]
	};

	const expr: ExerciseBlock = {
		id: 'it_2025_t1_expr',
		customTitle: 'III. Produzione scritta',
		points: 6,
		instruction: 'Scegli UNA delle due tracce proposte e scrivi un testo di 120–150 parole.',
		content: [
			buildItalianWrittenProductionBlock({
				tracciaUnoTitle: 'Traccia 1 (Guidata) :',
				tracciaUnoPrompt:
					'Il tuo liceo organizza una giornata dedicata a « Salute giovanile e mestieri artigianali ». Redigi un breve articolo per il giornale dell’istituto (120–150 parole) presentando i benefici della dieta mediterranea, dello sport e dell’artigianato di qualità.',
				tracciaUnoPunti: [
					'Cita almeno quattro alimenti naturali della dieta mediterranea (olio d’oliva, verdure, agrumi, cereali integrali).',
					'Spiega come lo sport e i laboratori di ceramica o tessitura educhino alla pazienza e all’equilibrio.',
					'Inserisci almeno un comparativo e un pronome combinato o la particella ne.'
				],
				tracciaDuePrompt:
					'« Mangiare in modo sano, muoversi ogni giorno e apprezzare il lavoro artigianale onesto rendono i giovani più forti e responsabili. » Argomenta questa affermazione in un tema di 120–150 parole.',
				rubricSummary:
					'Aderenza al tema e ricchezza degli esempi (2 pti) ; struttura chiara in tre parti (1.5 pto) ; uso corretto di pronomi combinati, ci/ne, comparativi e lessico (1.5 pto) ; ortografia e presentazione (1 pto).',
				modelAnswer:
					'Curare il proprio benessere durante gli anni del liceo significa scegliere abitudini equilibrate ogni giorno. La dieta mediterranea tradizionale offre già tutto ciò che serve : olio extravergine d’oliva, verdure fresche, grano duro, legumi e agrumi ricchi di vitamine. Questi prodotti naturali sono molto più nutrienti delle merendine industriali, e i medici ce ne ricordano spesso il valore preventivo.\n\nAccanto a una tavola sana, lo sport regolare rafforza il corpo e rende la mente più serena prima degli esami. Allo stesso modo, visitare un laboratorio di ceramica geometrica o di tessitura artigianale ci insegna che la qualità nasce dalla pazienza e dal lavoro onesto.\n\nIn conclusione, chi unisce alimentazione naturale, esercizio fisico e rispetto per i mestieri tradizionali conquista una salute migliore e valorizza le risorse della propria terra.',
				mark: '6'
			})
		]
	};

	return buildOfficialItalianBacPaper({
		slug: 'bac-2025-3as-le-italian-t1',
		academicYear: '2025',
		topicNumber: 1,
		ambitoIt: 'Alimentazione Sana, Sport e Artigianato',
		titleTopicIt: 'Alimentazione mediterranea sana, sport e artigianato di qualità',
		titleTopicAr: 'التغذية المتوسطية الصحية والرياضة والحرف التقليدية الراقية',
		themesIt: [
			'Alimentazione mediterranea sana e naturale',
			'Sport e benessere giovanile',
			'Artigianato artistico di qualità',
			'Pronomi combinati, ci/ne e comparativi'
		],
		themesAr: [
			'التغذية المتوسطية الصحية والطبيعية',
			'الرياضة وتوازن الشباب',
			'الحرف اليدوية والفنية الأصيلة',
			'الضمائر المركبة وci/ne وصيغ المقارنة'
		],
		exercises: [comp, ling, expr]
	});
}

// ============================================================================
// 6. BAC 2025 — Traccia 2 (bac-2025-3as-le-italian-t2)
// Il bacino del Mediterraneo: geografia, lingue e scambi culturali + Carta muta
// ============================================================================

function buildBac2025ItalianT2(): OfficialItalianBacPaperSpec {
	const comp: ExerciseBlock = {
		id: 'it_2025_t2_comp',
		customTitle: 'I. Comprensione del testo',
		points: 7,
		instruction:
			'Leggi il testo sul bacino del Mediterraneo, rispondi alle domande e completa la carta muta geografica.',
		content: [
			buildItalianPassageBlock({
				title: 'Il bacino del Mediterraneo : geografia condivisa, lingue e scambi culturali',
				paragraphs: [
					'Fin dall’antichità, il Mar Mediterraneo non ha rappresentato un confine chiuso, bensì una grande via di collegamento tra l’Africa settentrionale e l’Europa meridionale. Al centro di [[questo bacino]], la Penisola Italiana si protende verso le coste del Nord Africa, separata appena dal breve tratto di mare che avvicina l’isola di Sicilia alle sponde maghrebine, mentre a est si estende il Mar Adriatico.',
					'Per gli studenti algerini dell’indirizzo Lingue Straniere, conoscere la geografia e la lingua dell’Italia significa scoprire secoli di scambi fecondi. Nel corso della storia, le città portuali delle due rive si trasmisero termini marinareschi, tecniche agricole per la coltivazione dell’olivo e degli agrumi, nonché numerosi vocaboli scientifici passati dall’arabo alle lingue romanze. Oggi le università di [[entrambe le sponde]] promuovono progetti di traduzione, borse di studio e convegni sulla storia mediterranea.',
					'Tuttavia, un autentico dialogo culturale prospera soltanto sulla base della stima reciproca e dell’onestà intellettuale. Imparare l’italiano non vuol dire imitare passivamente abitudini estranee, ma comprendere il patrimonio dell’interlocutore portando al tempo stesso la ricchezza della nostra identità algerina e araba.',
					'In futuro, i giovani che padroneggiano più lingue sapranno costruire ponti solidi di ricerca e cooperazione economica. Lo studio serio dell’italiano trasforma così la geografia mediterranea in un’opportunità concreta di conoscenza, rispetto e sviluppo condiviso tra i popoli.'
				],
				source: 'Annuario di Geografia Culturale e Studi Mediterranei, Edizione SujetStore',
				numberedParagraphs: true,
				glossary: [
					{
						term: 'bacino',
						meaning: 'ampia regione geografica raccolta attorno a un mare interno e alle sue coste'
					},
					{
						term: 'lingue romanze',
						meaning: 'famiglia di lingue derivate dal latino, tra cui l’italiano, il francese e lo spagnolo'
					},
					{
						term: 'stima reciproca',
						meaning: 'rispetto leale e riconoscimento del valore altrui da entrambe le parti'
					}
				]
			}),
			{
				type: 'text',
				content: '#strong[1.] Scegli l’opzione corretta per completare l’affermazione.'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: 'La tesi centrale difesa nel testo è che lo studio dell’italiano e della geografia mediterranea :',
						options: [
							'costringe i giovani a dimenticare la propria lingua e identità nazionale',
							'rafforza la cooperazione accademica e il dialogo rispettoso tra Algeria, Italia e tutto il bacino mediterraneo',
							'riguarda unicamente gli scambi commerciali del Mar Adriatico senza interesse universitario'
						],
						correct:
							'rafforza la cooperazione accademica e il dialogo rispettoso tra Algeria, Italia e tutto il bacino mediterraneo',
						mark: '1'
					}
				]
			},
			{
				type: 'text',
				content:
					'#strong[2.] Indica se le affermazioni sono Vere o False e giustifica ogni risposta con il testo.'
			},
			{
				type: 'true_false',
				items: [
					{
						q: 'a) Il Mar Mediterraneo ha sempre impedito qualsiasi contatto tra il Nord Africa e l’Europa meridionale.',
						a: 'Falso',
						c: 'Il Mar Mediterraneo non ha rappresentato un confine chiuso, bensì una grande via di collegamento tra l’Africa settentrionale e l’Europa meridionale (§1).',
						mark: '0.5'
					},
					{
						q: 'b) Diversi vocaboli scientifici e agricoli passarono dall’arabo alle lingue europee grazie agli scambi marittimi.',
						a: 'Vero',
						c: 'Le città portuali si trasmisero tecniche agricole e numerosi vocaboli scientifici passati dall’arabo alle lingue romanze (§2).',
						mark: '0.5'
					},
					{
						q: 'c) Parlare una lingua straniera impone di rinunciare ai propri valori culturali.',
						a: 'Falso',
						c: 'Imparare l’italiano non vuol dire imitare passivamente abitudini estranee, ma portare anche la ricchezza della nostra identità algerina e araba (§3).',
						mark: '0.5'
					},
					{
						q: 'd) La conoscenza delle lingue aiuterà i giovani a sviluppare progetti di ricerca e cooperazione.',
						a: 'Vero',
						c: 'In futuro i giovani che padroneggiano più lingue sapranno costruire ponti solidi di ricerca e cooperazione economica (§4).',
						mark: '0.5'
					}
				]
			},
			{
				type: 'text',
				content: '#strong[3.] Rispondi in modo completo alle seguenti domande.'
			},
			{
				type: 'text',
				content:
					'a) Quali ambiti di scambio storico e universitario sono citati nel secondo paragrafo ?',
				answer:
					'a) Storicamente cita termini marinareschi, tecniche agricole per olivi e agrumi e vocaboli scientifici arabi ; oggi cita progetti universitari di traduzione, borse di studio e convegni storici.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'b) A quali condizioni il dialogo culturale risulta autentico secondo il terzo paragrafo ?',
				answer:
					'b) Quando si fonda sulla stima reciproca e sull’onestà intellettuale, comprendendo l’altro senza imitarlo passivamente e valorizzando l’identità algerina e araba.',
				mark: '1'
			},
			{
				type: 'text',
				content: '#strong[4.] A che cosa rimandano le espressioni sottolineate nel testo ?'
			},
			{
				type: 'text',
				content: 'a) « questo bacino » (§1) rimanda a : ............................',
				answer: 'a) Rimanda al bacino del Mar Mediterraneo.',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) « entrambe le sponde » (§2) rimanda a : ............................',
				answer:
					'b) Rimanda alla riva settentrionale (Italia / Europa meridionale) e alla riva meridionale (Algeria / Nord Africa).',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[5.] Osserva la carta muta dell’Italia e del bacino del Mediterraneo e identifica i cinque elementi geografici numerati da (1) a (5) :'
			},
			buildIllustratedFigureBlock('ita_01_italia_mediterraneo_carta_muta', {
				lang: 'it',
				mode: 'quiz',
				pins: [],
				width: '66%',
				maxHeight: 142,
				markPerItem: '0.2'
			})
		]
	};

	const ling: ExerciseBlock = {
		id: 'it_2025_t2_ling',
		customTitle: 'II. Competenza linguistica',
		points: 7,
		instruction: 'Risolvi gli esercizi di lessico, preposizioni articolate, futuro semplice e discorso indiretto.',
		content: [
			{
				type: 'text',
				content: '#strong[A. Lessico (3 punti)]'
			},
			{
				type: 'text',
				content: '#strong[1.] Cerca nel testo :'
			},
			{
				type: 'text',
				content: 'a) il sinonimo di « rispetto / considerazione » (§3) : ............................',
				answer: 'a) stima',
				mark: '0.5'
			},
			{
				type: 'text',
				content: 'b) il contrario di « aperto / libero » (§1) : ............................',
				answer: 'b) chiuso',
				mark: '0.5'
			},
			{
				type: 'text',
				content: '#strong[2.] Completa la tabella della famiglia di parole.'
			},
			buildItalianWordFamilyTableBlock([
				{
					verbo: { given: true, value: 'comunicare' },
					sostantivo: { value: 'comunicazione', mark: '0.25' },
					aggettivo: { value: 'comunicativo', mark: '0.25' }
				},
				{
					verbo: { value: 'tradurre', mark: '0.25' },
					sostantivo: { given: true, value: 'traduzione' },
					aggettivo: { value: 'traducibile / tradotto', mark: '0.25' }
				}
			]),
			{
				type: 'text',
				content:
					'#strong[3.] Classifica le espressioni nella tabella : #emph[Penisola Italiana ; borse di studio ; isola di Sicilia ; progetti di traduzione ; Mar Adriatico ; convegni universitari].'
			},
			buildItalianClassificationTableBlock({
				columns: [
					{
						header: 'Spazi geografici mediterranei',
						items: ['Penisola Italiana', 'isola di Sicilia', 'Mar Adriatico'],
						mark: '0.5'
					},
					{
						header: 'Iniziative di scambio culturale',
						items: ['borse di studio', 'progetti di traduzione', 'convegni universitari'],
						mark: '0.5'
					}
				]
			}),
			{
				type: 'text',
				content: '#strong[B. Grammatica e morfosintassi (4 punti)]'
			},
			{
				type: 'text',
				content:
					'#strong[4.] Completa le frasi scegliendo le preposizioni articolate corrette :'
			},
			{
				type: 'text',
				content:
					'a) La Sicilia è situata ............ centro ............ Mar Mediterraneo, di fronte alle coste nordafricane. (in / di)',
				answer: 'a) nel ... del',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Gli studenti algerini collaborano con i ricercatori ............ università italiane ............ progetti di traduzione scientifica. (di + le / su + i)',
				answer: 'b) delle ... sui',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[5.] Coniuga i verbi tra parentesi al futuro semplice :'
			},
			{
				type: 'text',
				content:
					'a) Nei prossimi anni, le facoltà delle due rive #strong[(avviare)] nuovi laboratori comuni di ricerca.',
				answer: 'a) Nei prossimi anni, le facoltà delle due rive avvieranno nuovi laboratori comuni di ricerca.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'b) Lo studio rigoroso della lingua italiana #strong[(aprire)] ai maturandi ampie prospettive accademiche.',
				answer:
					'b) Lo studio rigoroso della lingua italiana aprirà ai maturandi ampie prospettive accademiche.',
				mark: '0.5'
			},
			{
				type: 'text',
				content:
					'#strong[6.] Completa usando il futuro anteriore e il futuro semplice secondo il rapporto temporale :\n« Quando gli studenti #strong[(completare)] il corso di traduzione, #strong[(potere)] partecipare al convegno mediterraneo. »',
				answer:
					'Quando gli studenti avranno completato il corso di traduzione, potranno partecipare al convegno mediterraneo.',
				mark: '1'
			},
			{
				type: 'text',
				content:
					'#strong[7.] Trasforma la frase al discorso indiretto :\nLa professoressa d’italiano affermò : « Il bacino del Mediterraneo continuerà a unire i nostri popoli attraverso lo studio delle lingue e della scienza. »',
				answer:
					'La professoressa d’italiano affermò che il bacino del Mediterraneo avrebbe continuato a unire i loro (o i nostri) popoli attraverso lo studio delle lingue e della scienza.',
				mark: '1'
			}
		]
	};

	const expr: ExerciseBlock = {
		id: 'it_2025_t2_expr',
		customTitle: 'III. Produzione scritta',
		points: 6,
		instruction: 'Scegli UNA delle due tracce proposte e redigi un testo ordinato di 120–150 parole.',
		content: [
			buildItalianWrittenProductionBlock({
				tracciaUnoTitle: 'Traccia 1 (Guidata) :',
				tracciaUnoPrompt:
					'Il tuo liceo accoglie una delegazione di studenti e docenti italiani per una giornata di studio sulla geografia del Mediterraneo e sulla traduzione scientifica. Scrivi un breve discorso di benvenuto (120–150 parole).',
				tracciaUnoPunti: [
					'Saluta cordialmente gli ospiti e descrivi la posizione dell’Algeria di fronte alla Sicilia e alla Penisola Italiana.',
					'Cita due ambiti di futura collaborazione universitaria (traduzione, energie pulite o studi mediterranei).',
					'Usa correttamente almeno due preposizioni articolate e due verbi al futuro semplice.'
				],
				tracciaDuePrompt:
					'« Imparare una lingua del Mediterraneo permette di conoscere altri popoli senza mai dimenticare le proprie radici culturali. » Spiega e argomenta questa idea in una composizione di 120–150 parole.',
				rubricSummary:
					'Efficacia comunicativa e tono rispettoso (2 pti) ; organizzazione in introduzione, sviluppo e chiusura (1.5 pto) ; preposizioni articolate, futuro semplice, discorso indiretto e lessico geografico (1.5 pto) ; ortografia e chiarezza (1 pto).',
				modelAnswer:
					'Gentili ospiti, docenti e studenti,\n\nè per noi un grande onore accogliervi oggi nel nostro liceo in Algeria, sulle sponde meridionali del Mar Mediterraneo. Tra le coste del Nord Africa, la vicina isola di Sicilia e la Penisola Italiana esiste da molti secoli uno scambio vivo di parole, tecniche agricole e testi scientifici di valore.\n\nPer noi studenti dell’indirizzo Lingue Straniere, lo studio della lingua italiana costituisce un ponte culturale prezioso verso le vostre biblioteche e i centri universitari affacciati sul Mar Adriatico e sul Tirreno. Nei prossimi anni, la traduzione di opere storiche e la ricerca comune sulle energie rinnovabili apriranno nuove strade di collaborazione proficua tra i nostri atenei. Saremo lieti di ascoltare le vostre esperienze mantenendo viva la fierezza della nostra identità algerina.\n\nVi auguriamo un soggiorno fecondo e sereno tra noi.',
				mark: '6'
			})
		]
	};

	return buildOfficialItalianBacPaper({
		slug: 'bac-2025-3as-le-italian-t2',
		academicYear: '2025',
		topicNumber: 2,
		ambitoIt: 'Geografia e Dialogo Culturale nel Mediterraneo',
		titleTopicIt: 'Il bacino del Mediterraneo : geografia, lingue e scambi culturali',
		titleTopicAr: 'حوض البحر الأبيض المتوسط: الجغرافيا واللغات والتبادل الثقافي',
		themesIt: [
			'Geografia dell’Italia e del Mediterraneo',
			'Scambi linguistici e scientifici storici',
			'Dialogo culturale e identità algerina',
			'Carta muta, preposizioni articolate e futuro semplice'
		],
		themesAr: [
			'جغرافية إيطاليا وحوض المتوسط',
			'التبادلات اللغوية والعلمية التاريخية',
			'الحوار الثقافي والهوية الجزائرية',
			'الخريطة الصماء وحروف الجر المركبة والمستقبل البسيط'
		],
		exercises: [comp, ling, expr]
	});
}

export const OFFICIAL_BAC_ITALIAN_PAPERS: OfficialItalianBacPaperSpec[] = [
	buildBac2023ItalianT1(),
	buildBac2023ItalianT2(),
	buildBac2024ItalianT1(),
	buildBac2024ItalianT2(),
	buildBac2025ItalianT1(),
	buildBac2025ItalianT2()
];
