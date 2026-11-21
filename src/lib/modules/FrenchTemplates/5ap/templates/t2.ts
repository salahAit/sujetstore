import type {
	Difficulty,
	FrenchGeneratedExerciseInstance,
	FrenchParameterizedTemplate
} from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildFrenchPassageBlock,
	buildFrenchWrittenProductionBlock
} from '../../french-helpers';
import { buildIllustratedFigureBlock } from '../../../VisualAssets/illustrations-registry';

// ===============================================================================
// Parameterized Templates - 5AP French - Trimester 2
// Projet 2 : Au musée / Notre patrimoine algérien
// (Casbah d'Alger, Grande Mosquée de Tlemcen, Timgad, Jardin d'Essai)
// Split: 2 comprehension (4 pts) + 2 text_exploration (3 pts) + 1 written_expression (3 pts)
// ===============================================================================

// -------------------------------------------------------------------------------
// 1. Compréhension de l'écrit (4 pts): Découvrir notre patrimoine algérien
// -------------------------------------------------------------------------------
interface T2PatrimoinePack {
	title: string;
	site: string;
	paragraphs: string[];
	glossary: Array<{ term: string; meaning: string }>;
	qcmHeader: string;
	qcmOptions: string[];
	qcmCorrect: string;
	tfItems: Array<{ q: string; a: 'Vrai' | 'Faux'; mark: string }>;
	extractPrompt: string;
	extractAnswer: string;
	quizPrompt: string;
	quizCorrect: string;
	quizDistractors: Array<{ text: string; diagnosticFeedback: string }>;
}

const T2_PATRIMOINE_PASSAGES: readonly T2PatrimoinePack[] = [
	{
		title: 'Une excursion à la Casbah d’Alger',
		site: 'La Casbah d’Alger',
		paragraphs: [
			'La semaine dernière, les élèves de cinquième année ont visité la Casbah d’Alger avec leur enseignant. À huit heures, ils sont partis en bus scolaire.',
			'Dans cette vieille cité historique, ils ont parcouru les ruelles blanches, admiré les anciennes fontaines et visité la mosquée Ketchaoua. Le guide [[leur]] a raconté l’histoire des artisans d’autrefois.'
		],
		glossary: [
			{ term: 'ruelles', meaning: 'petites rues étroites et anciennes' },
			{ term: 'artisans', meaning: 'personnes qui fabriquent des objets à la main' }
		],
		qcmHeader: 'Choisis la bonne réponse : Quel site historique les élèves ont-ils visité ?',
		qcmOptions: ['La Casbah d’Alger', 'Le port d’Oran', 'Le mont Djurdjura'],
		qcmCorrect: 'La Casbah d’Alger',
		tfItems: [
			{ q: 'Les élèves ont visité la Casbah la semaine dernière.', a: 'Vrai', mark: '0.5' },
			{ q: 'Ils sont partis en train à midi.', a: 'Faux', mark: '0.5' },
			{ q: 'Ils ont admiré les ruelles blanches et la mosquée Ketchaoua.', a: 'Vrai', mark: '0.5' },
			{ q: 'Le guide leur a parlé de l’histoire des artisans.', a: 'Vrai', mark: '0.5' }
		],
		extractPrompt: 'Relève du texte : a) un indicateur de temps (CCT) ; b) un indicateur de lieu (CCL).',
		extractAnswer:
			'a) CCT : La semaine dernière / À huit heures (un au choix). b) CCL : à la Casbah d’Alger / Dans cette vieille cité historique.',
		quizPrompt: 'D’après le texte sur la Casbah d’Alger, que remplace le pronom souligné «leur» ?',
		quizCorrect: 'Aux élèves de cinquième année.',
		quizDistractors: [
			{ text: 'Aux ruelles blanches.', diagnosticFeedback: 'Le guide raconte l’histoire aux élèves, pas aux ruelles.' },
			{ text: 'À la mosquée Ketchaoua.', diagnosticFeedback: '«leur» est un pronom COI pluriel qui remplace des personnes.' },
			{ text: 'Au bus scolaire.', diagnosticFeedback: 'Relis la phrase : le guide parle aux élèves qui visitent la Casbah.' }
		]
	},
	{
		title: 'Visite à la Grande Mosquée de Tlemcen',
		site: 'La Grande Mosquée de Tlemcen',
		paragraphs: [
			'Samedi matin, Meriem et ses camarades sont allés à la Grande Mosquée de Tlemcen. Ce monument islamique très ancien date du onzième siècle.',
			'Dans la cour spacieuse, les élèves ont admiré les élégantes colonnes, les arcs finement sculptés et les beaux manuscrits calligraphiés. [[Ils]] sont rentrés fiers de ce riche patrimoine.'
		],
		glossary: [
			{ term: 'spacieuse', meaning: 'très grande et large' },
			{ term: 'manuscrits', meaning: 'anciens livres écrits à la main' }
		],
		qcmHeader: 'Choisis la bonne réponse : De quel siècle date la Grande Mosquée de Tlemcen ?',
		qcmOptions: ['Du onzième siècle', 'Du vingtième siècle', 'Du mois dernier'],
		qcmCorrect: 'Du onzième siècle',
		tfItems: [
			{ q: 'Meriem et ses camarades ont visité la Grande Mosquée samedi matin.', a: 'Vrai', mark: '0.5' },
			{ q: 'La cour de la mosquée est très petite.', a: 'Faux', mark: '0.5' },
			{ q: 'Les élèves ont admiré des colonnes élégantes et des manuscrits.', a: 'Vrai', mark: '0.5' },
			{ q: 'Les élèves sont rentrés tristes de la visite.', a: 'Faux', mark: '0.5' }
		],
		extractPrompt: 'Relève du texte : a) un indicateur de temps (CCT) ; b) un verbe conjugué au passé composé avec «être».',
		extractAnswer:
			'a) CCT : Samedi matin. b) Passé composé avec être : sont allés / sont rentrés.',
		quizPrompt: 'D’après le texte, qu’ont admiré les élèves dans la Grande Mosquée de Tlemcen ?',
		quizCorrect: 'Les élégantes colonnes, les arcs finement sculptés et les manuscrits calligraphiés.',
		quizDistractors: [
			{ text: 'Des animaux sauvages du Sahara.', diagnosticFeedback: 'Le texte porte sur un monument historique à Tlemcen, pas un zoo.' },
			{ text: 'Des bateaux dans un port.', diagnosticFeedback: 'Il s’agit de l’architecture et des manuscrits de la mosquée.' },
			{ text: 'Des camions de pompiers.', diagnosticFeedback: 'Les pompiers ne sont pas mentionnés dans ce texte.' }
		]
	},
	{
		title: 'Découverte de Timgad à Batna',
		site: 'Timgad (Batna)',
		paragraphs: [
			'Pendant les vacances de printemps, Bilal a visité le site historique de Timgad, près de Batna. Timgad est une ancienne cité connue dans le monde entier pour son plan géométrique.',
			'Sur place, les visiteurs ont marché sur les longues rues pavées de pierre et observé les grands arcs anciens ainsi que les vestiges de la bibliothèque antique. Bilal [[a]] pris de belles notes dans son cahier.'
		],
		glossary: [
			{ term: 'rues pavées', meaning: 'rues couvertes de pierres plates' },
			{ term: 'vestiges', meaning: 'restes anciens de bâtiments historiques' }
		],
		qcmHeader: 'Choisis la bonne réponse : Près de quelle ville se trouve le site de Timgad ?',
		qcmOptions: ['Près de Batna', 'Près d’Oran', 'Près de Béjaïa'],
		qcmCorrect: 'Près de Batna',
		tfItems: [
			{ q: 'Bilal a visité Timgad pendant les vacances de printemps.', a: 'Vrai', mark: '0.5' },
			{ q: 'Timgad est célèbre pour son plan géométrique.', a: 'Vrai', mark: '0.5' },
			{ q: 'Les visiteurs ont vu les vestiges de la bibliothèque antique.', a: 'Vrai', mark: '0.5' },
			{ q: 'Bilal n’a pris aucune note pendant la visite.', a: 'Faux', mark: '0.5' }
		],
		extractPrompt: 'Relève du texte : a) un indicateur de temps (CCT) ; b) un groupe nominal enrichi par un adjectif.',
		extractAnswer:
			'a) CCT : Pendant les vacances de printemps. b) GN enrichi : le site historique / une ancienne cité / les longues rues pavées / la bibliothèque antique.',
		quizPrompt: 'Pourquoi le site de Timgad est-il connu dans le monde entier selon le texte ?',
		quizCorrect: 'Pour son plan géométrique, ses rues pavées et sa bibliothèque antique.',
		quizDistractors: [
			{ text: 'Pour ses plages de sable doré.', diagnosticFeedback: 'Timgad est une cité historique située près de Batna, loin de la mer.' },
			{ text: 'Pour ses grands ponts suspendus.', diagnosticFeedback: 'Les grands ponts suspendus sont célèbres à Constantine.' },
			{ text: 'Pour son grand jardin de palmiers.', diagnosticFeedback: 'Le jardin de palmiers correspond au Jardin d’Essai du Hamma à Alger.' }
		]
	}
];

const tplCompPatrimoineT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_5ap_t2_comp_patrimoine_algerien',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب: معالم التراث الجزائري العريق (Compréhension : Patrimoine algérien)',
	curriculumLessonId: 'fre_lesson_5ap_t2_ccl_cct',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 43 + 11);
		const p = T2_PATRIMOINE_PASSAGES[Math.abs(seed - 1) % T2_PATRIMOINE_PASSAGES.length];
		const mcq = buildUniqueMcqOptions(p.quizCorrect, p.quizDistractors, rng);

		const content: ContentBlock[] = [
			buildFrenchPassageBlock({
				title: p.title,
				paragraphs: p.paragraphs,
				source: 'Texte pédagogique adapté — 5AP (Projet 2)',
				glossary: p.glossary
			}),
			buildIllustratedFigureBlock('pri_ara_04_algeria_flag_martyrs_memorial', {
				lang: 'fr',
				title: "Mon pays l'Algérie : Maqam Echahid, la Casbah et le drapeau national",
				customLegend: [
					{ num: '1', label: "Maqam Echahid et les monuments historiques d'Alger" },
					{ num: '2', label: 'Le drapeau national algérien, symbole de souveraineté' }
				],
				maxHeight: 108,
				width: '58%'
			}),
			{
				type: 'text',
				content: '1) Compréhension globale (1 pt) :'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: p.qcmHeader,
						options: [...p.qcmOptions],
						correct: p.qcmCorrect,
						mark: '1'
					}
				]
			},
			{
				type: 'text',
				content: '2) Réponds par Vrai ou Faux (2 pts) :'
			},
			{
				type: 'true_false',
				items: p.tfItems
			},
			{
				type: 'text',
				content: `3) ${p.extractPrompt} (1 pt) :\n    Réponse : ........................................................................`,
				answer: `3) ${p.extractAnswer}`,
				mark: '1'
			}
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'I. Compréhension de l’écrit',
			points: 4,
			instruction: 'Lis bien le texte puis réponds aux questions suivantes :',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `${p.paragraphs.map((s) => s.replace(/\[\[|\]\]/g, '')).join(' ')}\n\nQuestion : ${p.quizPrompt}`,
				questionTextAr: `اقرأ النص حول ${p.site} ثم اختر الإجابة الصحيحة:\n${p.quizPrompt}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Bonne réponse : ${p.quizCorrect}`
			},
			sujetExercise,
			hints: [
				'اقرأ النص مرتين واستخرج المكان (Où ? = CCL) والزمان (Quand ? = CCT).',
				'قارن كل عبارة في Vrai / Faux مع الجملة المقابلة لها في النص.',
				'تذكّر أن الماضي المركب مع être يستعمل أفعالاً مثل sont allés و sont rentrés.'
			],
			solutionStepsAr: [
				`الاختيار الصحيح: ${p.qcmCorrect}`,
				`صح أو خطأ: ${p.tfItems.map((t, i) => `${i + 1}) ${t.a}`).join(' | ')}`,
				`الاستخراج: ${p.extractAnswer}`
			],
			finalAnswer: p.quizCorrect
		};
	}
};

// -------------------------------------------------------------------------------
// 2. Compréhension de l'écrit (4 pts): Jardin d'Essai, Musée de Tlemcen & Constantine
// -------------------------------------------------------------------------------
interface T2VisitePack {
	title: string;
	place: string;
	paragraphs: string[];
	glossary: Array<{ term: string; meaning: string }>;
	q1: string;
	a1: string;
	tfItems: Array<{ q: string; a: 'Vrai' | 'Faux'; mark: string }>;
	q2: string;
	a2: string;
	quizPrompt: string;
	quizCorrect: string;
	quizDistractors: Array<{ text: string; diagnosticFeedback: string }>;
}

const T2_VISITE_PASSAGES: readonly T2VisitePack[] = [
	{
		title: 'Notre sortie au Jardin d’Essai du Hamma',
		place: 'Le Jardin d’Essai du Hamma',
		paragraphs: [
			'Hier matin, notre classe est allée au Jardin d’Essai du Hamma à Alger. Ce grand jardin botanique compte des milliers d’arbres et de plantes venus de plusieurs régions.',
			'Nous avons marché dans l’allée des palmiers et observé les bassins d’eau claire. Notre enseignante nous a demandé de respecter les fleurs et de ne laisser aucun papier par terre. Nous [[l’]] avons écoutée avec attention.'
		],
		glossary: [
			{ term: 'jardin botanique', meaning: 'grand parc qui rassemble de nombreuses espèces de plantes' },
			{ term: 'bassins', meaning: 'petits réservoirs d’eau décoratifs dans un parc' }
		],
		q1: 'Quand et où la classe est-elle allée ?',
		a1: 'Hier matin, la classe est allée au Jardin d’Essai du Hamma à Alger.',
		tfItems: [
			{ q: 'Le Jardin d’Essai se trouve dans la ville d’Alger.', a: 'Vrai', mark: '0.5' },
			{ q: 'Les élèves ont marché dans l’allée des palmiers.', a: 'Vrai', mark: '0.5' },
			{ q: 'L’enseignante a permis aux élèves de cueillir les fleurs.', a: 'Faux', mark: '0.5' },
			{ q: 'Les élèves ont écouté les conseils de leur enseignante.', a: 'Vrai', mark: '0.5' }
		],
		q2: 'Que remplace le pronom souligné «l’» dans la dernière phrase ?',
		a2: 'Le pronom «l’» remplace «notre enseignante».',
		quizPrompt: 'Quel conseil l’enseignante a-t-elle donné aux élèves au Jardin d’Essai ?',
		quizCorrect: 'De respecter les fleurs et de ne laisser aucun papier par terre.',
		quizDistractors: [
			{ text: 'De courir autour des bassins.', diagnosticFeedback: 'Le texte parle de respecter les fleurs et la propreté du jardin.' },
			{ text: 'De rentrer immédiatement en bus.', diagnosticFeedback: 'Les élèves ont marché dans l’allée des palmiers et observé les bassins.' },
			{ text: 'De couper des feuilles de palmier.', diagnosticFeedback: 'Au contraire, elle a demandé de respecter les plantes.' }
		]
	},
	{
		title: 'Au musée de la céramique et des manuscrits',
		place: 'Le musée de Tlemcen',
		paragraphs: [
			'Mardi dernier, Khadidja a visité le musée d’art islamique de Tlemcen avec son père. À l’entrée, un guide souriant [[les]] a accueillis chaleureusement.',
			'Dans les salles lumineuses, Khadidja a admiré des poteries décorées de motifs géométriques, des tapis traditionnels et des manuscrits anciens. Elle a beaucoup appris sur le savoir-faire algérien.'
		],
		glossary: [
			{ term: 'céramique', meaning: 'objets fabriqués en terre cuite et décorés' },
			{ term: 'savoir-faire', meaning: 'habileté d’un artisan dans son métier' }
		],
		q1: 'Avec qui Khadidja a-t-elle visité le musée ?',
		a1: 'Khadidja a visité le musée avec son père.',
		tfItems: [
			{ q: 'Khadidja a visité le musée mardi dernier.', a: 'Vrai', mark: '0.5' },
			{ q: 'Un guide souriant a accueilli Khadidja et son père.', a: 'Vrai', mark: '0.5' },
			{ q: 'Le musée présentait des poteries et des manuscrits anciens.', a: 'Vrai', mark: '0.5' },
			{ q: 'Khadidja s’est ennuyée pendant la visite.', a: 'Faux', mark: '0.5' }
		],
		q2: 'Que remplace le pronom souligné «les» dans le premier paragraphe ?',
		a2: 'Le pronom «les» remplace «Khadidja et son père».',
		quizPrompt: 'Qu’a admiré Khadidja dans les salles du musée ?',
		quizCorrect: 'Des poteries à motifs géométriques, des tapis traditionnels et des manuscrits anciens.',
		quizDistractors: [
			{ text: 'Des voitures modernes.', diagnosticFeedback: 'Il s’agit d’un musée d’art islamique et d’objets anciens.' },
			{ text: 'Des animaux du désert.', diagnosticFeedback: 'Le musée expose des poteries, des tapis et des manuscrits.' },
			{ text: 'Des avions et des trains.', diagnosticFeedback: 'Ces objets ne sont pas mentionnés dans le texte.' }
		]
	},
	{
		title: 'Une journée à Constantine, la ville des ponts',
		place: 'Constantine',
		paragraphs: [
			'Vendredi passé, Amine et sa famille sont arrivés à Constantine, la célèbre ville des ponts suspendus. Le matin, ils ont traversé le pont Sidi M’Cid au-dessus des gorges du Rhumel.',
			'L’après-midi, ils ont visité Djamaâ El-Kébir, la mosquée historique du vieux quartier, ainsi que le musée des traditions locales. Amine [[a]] gardé un souvenir inoubliable de cette sortie.'
		],
		glossary: [
			{ term: 'pont suspendu', meaning: 'pont tenu par de solides câbles en acier' },
			{ term: 'gorges', meaning: 'vallée très profonde entre deux rochers' }
		],
		q1: 'Comment appelle-t-on la ville de Constantine dans le texte ?',
		a1: 'On appelle Constantine la célèbre ville des ponts suspendus.',
		tfItems: [
			{ q: 'Amine est arrivé à Constantine vendredi passé.', a: 'Vrai', mark: '0.5' },
			{ q: 'Ils ont traversé le pont Sidi M’Cid au-dessus du Rhumel.', a: 'Vrai', mark: '0.5' },
			{ q: 'Amine a visité Constantine tout seul.', a: 'Faux', mark: '0.5' },
			{ q: 'Amine a gardé un souvenir inoubliable de cette journée.', a: 'Vrai', mark: '0.5' }
		],
		q2: 'À quel temps sont conjugués les verbes «sont arrivés», «ont traversé» et «a gardé» ?',
		a2: 'Ces verbes sont conjugués au passé composé.',
		quizPrompt: 'Quel célèbre pont Amine et sa famille ont-ils traversé le matin à Constantine ?',
		quizCorrect: 'Le pont Sidi M’Cid au-dessus des gorges du Rhumel.',
		quizDistractors: [
			{ text: 'Le pont du Sahara.', diagnosticFeedback: 'Le texte nomme précisément le pont Sidi M’Cid.' },
			{ text: 'L’allée des palmiers.', diagnosticFeedback: 'L’allée des palmiers se trouve au Jardin d’Essai d’Alger.' },
			{ text: 'La grande rue pavée de Timgad.', diagnosticFeedback: 'Timgad se trouve près de Batna, pas à Constantine.' }
		]
	}
];

const tplCompJardinMuseeT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_5ap_t2_comp_jardin_musee',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب: زيارة حديقة التجارب والمتاحف الجزائرية (Compréhension : Jardin et Musée)',
	curriculumLessonId: 'fre_lesson_5ap_t2_passe_compose',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 53 + 17);
		const p = T2_VISITE_PASSAGES[Math.abs(seed - 1) % T2_VISITE_PASSAGES.length];
		const mcq = buildUniqueMcqOptions(p.quizCorrect, p.quizDistractors, rng);

		const content: ContentBlock[] = [
			buildFrenchPassageBlock({
				title: p.title,
				paragraphs: p.paragraphs,
				source: 'Texte pédagogique adapté — 5AP (Au musée / Patrimoine)',
				glossary: p.glossary
			}),
			buildIllustratedFigureBlock('pri_lang_01_red_bus_train', {
				lang: 'fr',
				title: 'En sortie scolaire : le bus et le train',
				maxHeight: 106,
				width: '56%'
			}),
			{
				type: 'text',
				content: `1) ${p.q1} (1 pt) :\n    Réponse : ........................................................................`,
				answer: `1) ${p.a1}`,
				mark: '1'
			},
			{
				type: 'text',
				content: '2) Réponds par Vrai ou Faux d’après le texte (2 pts) :'
			},
			{
				type: 'true_false',
				items: p.tfItems
			},
			{
				type: 'text',
				content: `3) ${p.q2} (1 pt) :\n    Réponse : ........................................................................`,
				answer: `3) ${p.a2}`,
				mark: '1'
			}
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'I. Compréhension de l’écrit',
			points: 4,
			instruction: 'Lis attentivement le récit de visite puis réponds aux questions :',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `${p.paragraphs.map((s) => s.replace(/\[\[|\]\]/g, '')).join(' ')}\n\nQuestion : ${p.quizPrompt}`,
				questionTextAr: `اقرأ النص حول ${p.place} ثم اختر الإجابة الصحيحة:\n${p.quizPrompt}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Bonne réponse : ${p.quizCorrect}`
			},
			sujetExercise,
			hints: [
				'ابحث في الفقرة الأولى عن زمان الزيارة ومكانها والمرافقين.',
				'تأكّد من دقة كل عبارة في جدول Vrai / Faux بمراجعتها في النص.',
				'لمعرفة ما يعوّضه الضمير المسطّر، اقرأ الجملة السابقة مباشرة.'
			],
			solutionStepsAr: [
				`السؤال 1: ${p.a1}`,
				`صح أو خطأ: ${p.tfItems.map((t, i) => `${i + 1}) ${t.a}`).join(' | ')}`,
				`السؤال 3: ${p.a2}`
			],
			finalAnswer: p.quizCorrect
		};
	}
};

// -------------------------------------------------------------------------------
// 3. Fonctionnement de la langue (3 pts): CCL / CCT & Passé composé (avoir / être)
// -------------------------------------------------------------------------------
const CCL_CCT_POOL = [
	{
		sentence: '«La semaine dernière», nous avons visité la Casbah.',
		answer: 'CCT',
		options: ['CCL (Lieu)', 'CCT (Temps)'],
		correct: 'CCT (Temps)'
	},
	{
		sentence: 'Les élèves entrent «dans le musée de Tlemcen».',
		answer: 'CCL',
		options: ['CCL (Lieu)', 'CCT (Temps)'],
		correct: 'CCL (Lieu)'
	},
	{
		sentence: 'Le bus scolaire arrive «à huit heures».',
		answer: 'CCT',
		options: ['CCL (Lieu)', 'CCT (Temps)'],
		correct: 'CCT (Temps)'
	},
	{
		sentence: 'Nous avons admiré des palmiers «au Jardin d’Essai».',
		answer: 'CCL',
		options: ['CCL (Lieu)', 'CCT (Temps)'],
		correct: 'CCL (Lieu)'
	},
	{
		sentence: '«Pendant les vacances», Bilal est parti à Batna.',
		answer: 'CCT',
		options: ['CCL (Lieu)', 'CCT (Temps)'],
		correct: 'CCT (Temps)'
	},
	{
		sentence: 'Les visiteurs marchent «sur les rues pavées de Timgad».',
		answer: 'CCL',
		options: ['CCL (Lieu)', 'CCT (Temps)'],
		correct: 'CCL (Lieu)'
	}
] as const;

const PASSE_COMPOSE_POOL = [
	{
		prompt: 'Hier, nous ............ (visiter) la Grande Mosquée de Tlemcen.',
		answer: 'avons visité',
		explain: 'Avec «avoir» : pas d’accord avec le sujet (avons visité).'
	},
	{
		prompt: 'Meriem ............ (arriver) tôt devant l’école.',
		answer: 'est arrivée',
		explain: 'Avec «être» et le sujet féminin singulier «Meriem» : +e (est arrivée).'
	},
	{
		prompt: 'Les filles ............ (aller) au Jardin d’Essai.',
		answer: 'sont allées',
		explain: 'Avec «être» et le sujet féminin pluriel «Les filles» : +es (sont allées).'
	},
	{
		prompt: 'Les élèves ............ (choisir) de jolies cartes postales.',
		answer: 'ont choisi',
		explain: '2e groupe avec «avoir» : participe passé en -i sans accord (ont choisi).'
	},
	{
		prompt: 'Youssef et Amine ............ (partir) en bus à huit heures.',
		answer: 'sont partis',
		explain: 'Avec «être» et un sujet masculin pluriel : +s (sont partis).'
	},
	{
		prompt: 'Tu ............ (finir) ton compte rendu de visite.',
		answer: 'as fini',
		explain: '2e groupe avec «avoir» : tu as fini.'
	}
] as const;

const tplLangCclCctPasseComposeT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_5ap_t2_lang_ccl_cct_passe_compose',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'conjugaison_temps',
	titleAr: 'التحكم في اللغة: مؤشرات المكان والزمان (CCL/CCT) والماضي المركّب',
	curriculumLessonId: 'fre_lesson_5ap_t2_passe_compose',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 61 + 23);
		const pickedCirc = rng.pickDistinct(CCL_CCT_POOL, 3);
		const pickedPc = rng.pickDistinct(PASSE_COMPOSE_POOL, 3);
		const qPc = pickedPc[0];

		const distractors = qPc.answer.startsWith('est ') || qPc.answer.startsWith('sont ')
			? [
					{
						text: qPc.answer.replace(/^est /, 'a ').replace(/^sont /, 'ont '),
						diagnosticFeedback: 'Ce verbe de mouvement se conjugue avec l’auxiliaire «être», pas «avoir».'
					},
					{
						text: qPc.answer.replace(/ées?$|s$/, ''),
						diagnosticFeedback: 'Avec l’auxiliaire «être», le participe passé s’accorde en genre et en nombre avec le sujet.'
					},
					{
						text: `${qPc.answer}t`,
						diagnosticFeedback: 'Vérifie la forme exacte du participe passé.'
					}
				]
			: [
					{
						text: `${qPc.answer}s`,
						diagnosticFeedback: 'Avec l’auxiliaire «avoir», le participe passé ne s’accorde pas avec le sujet.'
					},
					{
						text: qPc.answer.replace(/^avons /, 'sommes ').replace(/^ont /, 'sont ').replace(/^as /, 'es '),
						diagnosticFeedback: 'Ce verbe se conjugue avec l’auxiliaire «avoir», pas «être».'
					},
					{
						text: qPc.answer.replace(/é$/, 'er').replace(/i$/, 'ir'),
						diagnosticFeedback: 'Il faut employer le participe passé (-é ou -i), pas l’infinitif.'
					}
				];

		const mcq = buildUniqueMcqOptions(qPc.answer, distractors, rng);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: 'Activité 1 : Indique si l’expression entre guillemets est un CCL (Lieu) ou un CCT (Temps) (1.5 pts) :'
			},
			{
				type: 'multiple_choice',
				groups: pickedCirc.map((c, idx) => ({
					header: `${idx + 1}) ${c.sentence}`,
					options: [...c.options],
					correct: c.correct,
					mark: '0.5'
				}))
			},
			{
				type: 'text',
				content: 'Activité 2 : Conjugue les verbes entre parenthèses au passé composé (attention à l’accord avec «être») (1.5 pts) :'
			},
			...pickedPc.map((p, idx) => ({
				type: 'text' as const,
				content: `${idx + 1}) ${p.prompt}`,
				answer: `${idx + 1}) ${p.prompt.replace('............', p.answer)}`,
				mark: '0.5'
			}))
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'II. Fonctionnement de la langue (CCL / CCT et Passé composé)',
			points: 3,
			instruction: 'Identifie les indicateurs de lieu et de temps, puis conjugue au passé composé :',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `Conjugue correctement au passé composé : "${qPc.prompt}"`,
				questionTextAr: `اختر التصريف الصحيح في الماضي المركّب للجملة التالية:\n"${qPc.prompt}"`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `${qPc.answer} — ${qPc.explain}`
			},
			sujetExercise,
			hints: [
				'اطرح السؤال Où ? لمعرفة CCL، واطرح Quand ? لمعرفة CCT.',
				'الماضي المركب = المساعد (avoir أو être في المضارع) + اسم المفعول (-é أو -i).',
				'مع المساعد être يتوافق اسم المفعول مع الفاعل (+e للمؤنث، +s للجمع، +es للمؤنث الجمع).'
			],
			solutionStepsAr: [
				...pickedCirc.map((c, i) => `النشاط 1 (${i + 1}): ${c.correct}`),
				...pickedPc.map((p, i) => `النشاط 2 (${i + 1}): ${p.answer} (${p.explain})`)
			],
			finalAnswer: qPc.answer
		};
	}
};

// -------------------------------------------------------------------------------
// 4. Fonctionnement de la langue (3 pts): Homophones grammaticaux & Pronoms compléments
// -------------------------------------------------------------------------------
const HOMOPHONES_POOL = [
	{
		prompt: 'Complète avec «a» ou «à» : Khadidja ............ visité le musée ............ dix heures.',
		answer: 'a / à',
		full: 'Khadidja a visité le musée à dix heures.',
		options: ['a / à', 'à / a', 'a / a']
	},
	{
		prompt: 'Complète avec «est» ou «et» : La Casbah ............ ancienne ............ très belle.',
		answer: 'est / et',
		full: 'La Casbah est ancienne et très belle.',
		options: ['est / et', 'et / est', 'est / est']
	},
	{
		prompt: 'Complète avec «on» ou «ont» : ............ admire les photos que les élèves ............ prises.',
		answer: 'On / ont',
		full: 'On admire les photos que les élèves ont prises.',
		options: ['On / ont', 'Ont / on', 'On / on']
	},
	{
		prompt: 'Complète avec «son» ou «sont» : Les jardins ............ propres et ............ allée est fleurie.',
		answer: 'sont / son',
		full: 'Les jardins sont propres et son allée est fleurie.',
		options: ['sont / son', 'son / sont', 'sont / sont']
	},
	{
		prompt: 'Complète avec «a» ou «à» : Amine ............ pris le bus pour aller ............ Timgad.',
		answer: 'a / à',
		full: 'Amine a pris le bus pour aller à Timgad.',
		options: ['a / à', 'à / a', 'à / à']
	},
	{
		prompt: 'Complète avec «est» ou «et» : Le guide ............ patient ............ il explique bien.',
		answer: 'est / et',
		full: 'Le guide est patient et il explique bien.',
		options: ['est / et', 'et / est', 'et / et']
	}
] as const;

const PRONOMS_COMPLEMENTS_POOL = [
	{
		raw: 'Nous visitons «la Casbah d’Alger».',
		answer: 'Nous la visitons.',
		pronoun: 'la'
	},
	{
		raw: 'Le guide parle «aux élèves».',
		answer: 'Le guide leur parle.',
		pronoun: 'leur'
	},
	{
		raw: 'Les visiteurs admirent «les anciens manuscrits».',
		answer: 'Les visiteurs les admirent.',
		pronoun: 'les'
	},
	{
		raw: 'L’enseignante répond «à Meriem».',
		answer: 'L’enseignante lui répond.',
		pronoun: 'lui'
	},
	{
		raw: 'Karim photographie «le grand minaret».',
		answer: 'Karim le photographie.',
		pronoun: 'le'
	},
	{
		raw: 'Le gardien sourit «aux touristes».',
		answer: 'Le gardien leur sourit.',
		pronoun: 'leur'
	}
] as const;

const tplLangHomophonesPronomsT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_5ap_t2_lang_homophones_pronoms',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'orthographe_accords',
	titleAr: 'التحكم في اللغة: المتجانسات النحوية (a/à, ont/on, son/sont, et/est) والضمائر المفعولية',
	curriculumLessonId: 'fre_lesson_5ap_t2_homophones_grammaticaux',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 79 + 31);
		const pickedHom = rng.pickDistinct(HOMOPHONES_POOL, 3);
		const pickedPro = rng.pickDistinct(PRONOMS_COMPLEMENTS_POOL, 3);
		const qPro = pickedPro[0];

		const allPronouns = ['le', 'la', 'les', 'lui', 'leur'] as const;
		const wrongPronouns = allPronouns.filter((pr) => pr !== qPro.pronoun).slice(0, 3);
		const mcq = buildUniqueMcqOptions(
			qPro.answer,
			wrongPronouns.map((wp) => ({
				text: qPro.answer.replace(` ${qPro.pronoun} `, ` ${wp} `),
				diagnosticFeedback:
					'Vérifie si le complément est COD (le/la/les) ou COI avec «à» (lui au singulier / leur au pluriel).'
			})),
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: 'Activité 1 : Choisis les bons homophones grammaticaux pour compléter chaque phrase (1.5 pts) :'
			},
			{
				type: 'multiple_choice',
				groups: pickedHom.map((h, idx) => ({
					header: `${idx + 1}) ${h.prompt}`,
					options: [...h.options],
					correct: h.answer,
					mark: '0.5'
				}))
			},
			{
				type: 'text',
				content: 'Activité 2 : Remplace le groupe entre guillemets par le pronom complément qui convient (le, la, les, lui, leur) (1.5 pts) :'
			},
			...pickedPro.map((p, idx) => ({
				type: 'text' as const,
				content: `${idx + 1}) ${p.raw}\n    Transformation : ........................................................................`,
				answer: `${idx + 1}) ${p.answer}`,
				mark: '0.5'
			}))
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'II. Fonctionnement de la langue (Homophones et pronoms compléments)',
			points: 3,
			instruction: 'Complète avec les bons homophones puis remplace chaque complément par un pronom :',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `Remplace le complément entre guillemets par le bon pronom : "${qPro.raw}"`,
				questionTextAr: `عوّض المفعول بين مزدوجتين بالضمير المفعولي المناسب:\n"${qPro.raw}"`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Bonne transformation : ${qPro.answer}`
			},
			sujetExercise,
			hints: [
				'استبدل بالماضي الناقص لاختبار الفعل: a (avait)، ont (avaient)، est (était)، sont (étaient).',
				'للمفعول المباشر COD نستعمل (le, la, les) قبل الفعل.',
				'للمفعول غير المباشر المسبوق بـ à نستعمل (lui) للمفرد و(leur) للجمع بلا s.'
			],
			solutionStepsAr: [
				...pickedHom.map((h, i) => `النشاط 1 (${i + 1}): ${h.full}`),
				...pickedPro.map((p, i) => `النشاط 2 (${i + 1}): ${p.answer}`)
			],
			finalAnswer: qPro.answer
		};
	}
};

// -------------------------------------------------------------------------------
// 5. Production écrite (3 pts): Raconter une visite scolaire à un site algérien
// -------------------------------------------------------------------------------
const T2_VISITE_WRITING_PROFILES = [
	{
		site: 'la Casbah d’Alger',
		title: 'Notre visite à la Casbah d’Alger',
		cct: 'La semaine dernière, à huit heures, le soir',
		ccl: 'à la Casbah d’Alger, dans les ruelles blanches, à la mosquée Ketchaoua',
		verbes: 'aller, prendre le bus, visiter, admirer, écouter le guide, rentrer',
		adjectifs: 'historique, anciennes, blanches, heureux, fiers',
		openingCorrect: 'La semaine dernière, notre classe est allée à la Casbah d’Alger en bus.',
		model:
			'La semaine dernière, notre classe est allée à la Casbah d’Alger en bus. À neuf heures, nous avons commencé la visite avec notre enseignant. Nous avons parcouru les ruelles blanches et admiré la mosquée Ketchaoua et les anciennes fontaines. Un guide accueillant nous a raconté l’histoire de la cité. Le soir, nous sommes rentrés très heureux.'
	},
	{
		site: 'la Grande Mosquée de Tlemcen',
		title: 'Notre excursion à la Grande Mosquée de Tlemcen',
		cct: 'Samedi matin, à neuf heures, à midi',
		ccl: 'à Tlemcen, dans la Grande Mosquée, dans la cour spacieuse',
		verbes: 'partir, visiter, observer, admirer, prendre des photos, revenir',
		adjectifs: 'ancienne, spacieuse, élégantes, fiers, contents',
		openingCorrect: 'Samedi matin, nous sommes partis en bus pour visiter la Grande Mosquée de Tlemcen.',
		model:
			'Samedi matin, nous sommes partis en bus pour visiter la Grande Mosquée de Tlemcen. Avec nos camarades et notre enseignant, nous sommes entrés dans la cour spacieuse. Nous avons admiré les élégantes colonnes et les anciens manuscrits. Nous avons aussi pris de belles photos souvenir. À midi, nous sommes rentrés fiers de notre patrimoine algérien.'
	},
	{
		site: 'le Jardin d’Essai du Hamma',
		title: 'Une belle sortie au Jardin d’Essai du Hamma',
		cct: 'Hier matin, à huit heures, l’après-midi',
		ccl: 'au Jardin d’Essai du Hamma, à Alger, dans l’allée des palmiers',
		verbes: 'aller, marcher, observer, découvrir, respecter les fleurs, rentrer',
		adjectifs: 'grand, vert, rares, calme, joyeux',
		openingCorrect: 'Hier matin, notre classe est allée au Jardin d’Essai du Hamma à Alger.',
		model:
			'Hier matin, notre classe est allée au Jardin d’Essai du Hamma à Alger. Nous avons pris le bus avec notre enseignante et nos camarades. Dans ce grand jardin vert, nous avons marché dans l’allée des palmiers et découvert des plantes rares. Nous avons respecté la propreté du parc. L’après-midi, nous sommes rentrés très contents.'
	}
] as const;

const tplWrittenVisitePatrimoineT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_5ap_t2_written_visite_patrimoine',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'production_ecrite',
	titleAr: 'الإنتاج الكتابي: سرد رحلة مدرسية إلى معلم تاريخي جزائري (Raconter une visite scolaire)',
	curriculumLessonId: 'fre_lesson_5ap_t2_raconter_visite_scolaire',
	defaultPoints: 3,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 89 + 43);
		const p = T2_VISITE_WRITING_PROFILES[Math.abs(seed - 1) % T2_VISITE_WRITING_PROFILES.length];

		const mcq = buildUniqueMcqOptions(
			p.openingCorrect,
			[
				{
					text: `Demain, nous visitons ${p.site} hier.`,
					diagnosticFeedback: 'Pour raconter une visite passée, il faut un CCT du passé et le passé composé.'
				},
				{
					text: `Hier, nous avons allé à ${p.site}.`,
					diagnosticFeedback: 'Le verbe «aller» se conjugue avec «être» : nous sommes allés.'
				},
				{
					text: `la semaine dernière nous sommes rentré content`,
					diagnosticFeedback: 'Attention à la majuscule, au point final et à l’accord au pluriel (rentrés contents).'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			buildIllustratedFigureBlock('pri_lang_02_airplane_ship', {
				lang: 'fr',
				title: "Découvrir l'Algérie en voyage : par avion et par bateau",
				maxHeight: 102,
				width: '54%'
			}),
			buildFrenchWrittenProductionBlock({
				sujetUnTitle: `Production écrite : Raconter une visite à ${p.site}`,
				sujetUnPrompt: `Ton école a organisé une sortie pédagogique à ${p.site}. Rédige un court récit de 4 à 5 phrases pour raconter cette visite à tes parents.`,
				sujetUnNotes: [
					'Emploie le pronom «nous» et conjugue les verbes au passé composé.',
					'Utilise des indicateurs de temps (CCT) et de lieu (CCL).',
					'N’oublie pas l’accord du participe passé avec «être», les majuscules et la ponctuation.',
					`CCT : ${p.cct}.`,
					`CCL : ${p.ccl}.`,
					`Verbes : ${p.verbes}.`,
					`Adjectifs : ${p.adjectifs}.`
				],
				modelAnswer: `${p.title}\n${p.model}`,
				rubricSummary:
					'Respect de la consigne et cohérence du récit (1 pt) | Passé composé, accords et CCT/CCL (1 pt) | Orthographe, ponctuation et soin (1 pt)',
				mark: '3'
			})
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'III. Production écrite',
			points: 3,
			instruction: 'Utilise la boîte à outils pour raconter la sortie scolaire au passé composé :',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `Quelle phrase d’ouverture convient le mieux pour raconter une sortie scolaire à ${p.site} ?`,
				questionTextAr: `اختر الجملة الافتتاحية الصحيحة لسرد رحلة مدرسية إلى ${p.site}:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Meilleure phrase : ${p.openingCorrect}`
			},
			sujetExercise,
			hints: [
				'ابدأ بمؤشر زمان (CCT) ومؤشر مكان (CCL) وحدّد مع من ذهبت وكيف.',
				'استعمل الماضي المركب بضمير «nous» لسرد ما شاهدتموه (avons admiré, avons découvert).',
				'اختم بشعور الفرح ولا تنسَ حرف «s» مع المساعد être: nous sommes rentrés heureux.'
			],
			solutionStepsAr: [
				`الافتتاحية (CCT + CCL): ${p.openingCorrect}`,
				`تفاصيل الزيارة بالماضي المركب باستعمال أفعال صندوق الأدوات (${p.verbes}).`,
				`النص النموذجي: ${p.model}`
			],
			finalAnswer: p.openingCorrect
		};
	}
};

export const TEMPLATES_5AP_T2: FrenchParameterizedTemplate[] = [
	tplCompPatrimoineT2,
	tplCompJardinMuseeT2,
	tplLangCclCctPasseComposeT2,
	tplLangHomophonesPronomsT2,
	tplWrittenVisitePatrimoineT2
];
