import type {
	Difficulty,
	FrenchGeneratedExerciseInstance,
	FrenchParameterizedTemplate
} from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildFrenchClassificationTableBlock,
	buildFrenchPassageBlock,
	buildFrenchWrittenProductionBlock
} from '../../french-helpers';

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Compréhension 1 (4 pts) — À la campagne : fruits, légumes et saisons
// ═══════════════════════════════════════════════════════════════════════════════
const compCampagne3apT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3ap_t3_comp_campagne',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب: في الريف (الفواكه والخضر والفصول)',
	curriculumLessonId: 'fre_lesson_3ap_t3_fruits_saisons',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const scenarios = [
			{
				title: 'Le beau verger au printemps',
				pupil: 'Adam',
				season: 'le printemps',
				fruit: 'des oranges',
				veg: 'des carottes',
				paragraphs: [
					"C'est [[le printemps]] ! Adam va à la campagne avec son père. Le jardin est vert et plein de fleurs jaunes.",
					"Dans le verger, ils cueillent [[des oranges]] sucrées et des pommes rouges. Ils ramassent aussi des carottes pour le repas."
				],
				tf1Q: 'Adam va à la campagne en hiver.',
				tf1A: 'Faux',
				tf1C: 'Adam va à la campagne au printemps.',
				tf2Q: 'Ils ramassent des carottes pour le repas.',
				tf2A: 'Vrai',
				mcqCorrect: 'le printemps',
				mcqWrong: [
					{ text: "l'hiver", diagnosticFeedback: "La première phrase dit : C'est le printemps !" },
					{ text: "l'automne", diagnosticFeedback: "L'automne ne figure pas dans le texte." },
					{ text: "l'été", diagnosticFeedback: 'Relis la première phrase du texte.' }
				]
			},
			{
				title: 'En été à la campagne',
				pupil: 'Ines',
				season: "l'été",
				fruit: 'du raisin',
				veg: 'des tomates',
				paragraphs: [
					"En [[été]], il fait chaud et le soleil brille. Ines aide sa grand-mère dans le grand potager.",
					"Elles lavent [[des tomates]] rouges et mangent du raisin frais. Les oiseaux chantent dans les arbres."
				],
				tf1Q: 'En été, il fait froid et il neige.',
				tf1A: 'Faux',
				tf1C: 'En été, il fait chaud et le soleil brille.',
				tf2Q: 'Ines aide sa grand-mère dans le potager.',
				tf2A: 'Vrai',
				mcqCorrect: "l'été",
				mcqWrong: [
					{ text: 'le printemps', diagnosticFeedback: 'Le texte commence par : En été.' },
					{ text: "l'hiver", diagnosticFeedback: 'Il fait chaud et le soleil brille : c’est l’été.' },
					{ text: "l'automne", diagnosticFeedback: 'Relis le premier mot du texte.' }
				]
			},
			{
				title: 'Les bonnes dattes en automne',
				pupil: 'Mehdi',
				season: "l'automne",
				fruit: 'des dattes',
				veg: 'des pommes de terre',
				paragraphs: [
					"En [[automne]], les feuilles des arbres deviennent jaunes. Mehdi visite l'oasis de Biskra avec sa famille.",
					"Il mange [[des dattes]] délicieuses et aide son oncle à récolter des pommes de terre. Vive la nature !"
				],
				tf1Q: 'En automne, les feuilles deviennent jaunes.',
				tf1A: 'Vrai',
				tf2Q: 'Mehdi visite une école à Alger.',
				tf2A: 'Faux',
				tf2C: "Mehdi visite l'oasis de Biskra.",
				mcqCorrect: "l'automne",
				mcqWrong: [
					{ text: "l'été", diagnosticFeedback: 'Le texte parle de la saison en automne.' },
					{ text: 'le printemps', diagnosticFeedback: 'Relis le début de la première phrase.' },
					{ text: "l'hiver", diagnosticFeedback: 'En automne les feuilles deviennent jaunes.' }
				]
			}
		];

		const sc = rng.pick(scenarios);
		const mcq = buildUniqueMcqOptions(sc.mcqCorrect, sc.mcqWrong, rng);
		const plainText = sc.paragraphs.join(' ').replace(/\[\[|\]\]/g, '');

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `Lis le texte :\n« ${plainText} »\nQuestion : De quelle saison parle ce texte ?`,
			questionTextAr: 'اقرأ النص واختر الفصل الذي يتحدث عنه:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `يتحدّث النص عن فصل «${sc.season}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: "I. Compréhension de l'écrit",
			points: 4,
			instruction: 'Lis le texte, puis réponds aux questions :',
			content: [
				buildFrenchPassageBlock({
					title: sc.title,
					paragraphs: sc.paragraphs,
					numberedParagraphs: false
				}),
				{
					type: 'text',
					content: '#strong[1)] Relève du texte et complète le tableau :'
				},
				{
					type: 'table',
					headers: ['Prénom', 'Saison', 'Un fruit', 'Un légume'],
					cells: [],
					rows: [
						[
							{ content: '............', answer: sc.pupil, mark: '0.5' },
							{ content: '............', answer: sc.season, mark: '0.5' },
							{ content: '............', answer: sc.fruit, mark: '0.5' },
							{ content: '............', answer: sc.veg, mark: '0.5' }
						]
					],
					align: 'center',
					borders: 'grid',
					headerBackground: true,
					width: 'full'
				},
				{
					type: 'text',
					content: '#strong[2)] Écris « Vrai » ou « Faux » :'
				},
				{
					type: 'true_false',
					items: [
						{ q: `a) ${sc.tf1Q}`, a: sc.tf1A, c: sc.tf1C, mark: '1' },
						{ q: `b) ${sc.tf2Q}`, a: sc.tf2A, c: sc.tf2C, mark: '1' }
					]
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'استخرج اسم الفصل من الجملة الأولى في النص.',
				'ميّز بين الفاكهة (fruit) والخضار (légume) في الفقرة الثانية.',
				'راجع جمل النص جيداً للإجابة عن سؤال Vrai / Faux.'
			],
			solutionStepsAr: [
				`الجدول: Prénom = ${sc.pupil} | Saison = ${sc.season} | Fruit = ${sc.fruit} | Légume = ${sc.veg}.`,
				`صحيح أو خطأ: (a) ${sc.tf1A} — (b) ${sc.tf2A}.`
			],
			finalAnswer: sc.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Compréhension 2 (4 pts) — Protégeons la nature !
// ═══════════════════════════════════════════════════════════════════════════════
const compNature3apT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3ap_t3_comp_nature',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب: لنحمِ الطبيعة ونغرس الأشجار',
	curriculumLessonId: 'fre_lesson_3ap_t3_phrase_simple',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const scenarios = [
			{
				title: 'La journée de l’arbre',
				pupil: 'Salma',
				paragraphs: [
					"Samedi matin, [[Salma]] et ses camarades nettoient le jardin de l'école.",
					"Les élèves plantent [[des arbres]] et arrosent les fleurs avec de l'eau propre. La nature est un beau cadeau !"
				],
				qcm1Header: 'a) Que nettoient Salma et ses camarades ?',
				qcm1Options: ["Le jardin de l'école", 'La rue', 'La maison'],
				qcm1Correct: "Le jardin de l'école",
				qcm2Header: 'b) Que plantent les élèves ?',
				qcm2Options: ['des cahiers', 'des arbres', 'des cartables'],
				qcm2Correct: 'des arbres',
				tf1Q: 'Les élèves arrosent les fleurs.',
				tf1A: 'Vrai',
				tf2Q: 'Salma salit le jardin.',
				tf2A: 'Faux',
				tf2C: "Salma et ses camarades nettoient le jardin de l'école.",
				mcqQ: 'Que plantent les élèves dans le jardin ?',
				mcqCorrect: 'des arbres',
				mcqWrong: [
					{ text: 'des livres', diagnosticFeedback: 'Les élèves plantent des arbres.' },
					{ text: 'des crayons', diagnosticFeedback: 'Relis la première phrase du paragraphe 2.' },
					{ text: 'des tables', diagnosticFeedback: 'On plante des arbres dans un jardin.' }
				]
			},
			{
				title: 'Un jardin propre',
				pupil: 'Hamza',
				paragraphs: [
					"Dans son quartier, [[Hamza]] aime beaucoup les arbres verts et les oiseaux.",
					"Il ramasse les déchets dans une poubelle et il arrose [[les plantes]] chaque matin. Il protège la nature."
				],
				qcm1Header: 'a) Où Hamza jette-t-il les déchets ?',
				qcm1Options: ['Par terre', 'Dans une poubelle', 'Dans la rivière'],
				qcm1Correct: 'Dans une poubelle',
				qcm2Header: 'b) Quand Hamza arrose-t-il les plantes ?',
				qcm2Options: ['Chaque matin', 'La nuit', 'Jamais'],
				qcm2Correct: 'Chaque matin',
				tf1Q: 'Hamza protège la nature.',
				tf1A: 'Vrai',
				tf2Q: "Hamza n'aime pas les arbres.",
				tf2A: 'Faux',
				tf2C: 'Hamza aime beaucoup les arbres verts.',
				mcqQ: 'Où Hamza jette-t-il les déchets ?',
				mcqCorrect: 'Dans une poubelle',
				mcqWrong: [
					{ text: 'Par terre', diagnosticFeedback: 'Il ne faut jamais jeter les déchets par terre.' },
					{ text: 'Sur les fleurs', diagnosticFeedback: 'Hamza protège les plantes.' },
					{ text: 'Dans le cartable', diagnosticFeedback: 'Relis la deuxième phrase : dans une poubelle.' }
				]
			},
			{
				title: 'Sauvons l’eau et les fleurs',
				pupil: 'Nadia',
				paragraphs: [
					"[[Nadia]] aime cultiver des fleurs dans le jardin de sa famille au printemps.",
					"Elle ferme bien le robinet pour économiser [[l'eau]]. Les abeilles et les papillons aiment les fleurs propres."
				],
				qcm1Header: 'a) Que fait Nadia pour économiser l’eau ?',
				qcm1Options: ['Elle ferme bien le robinet', 'Elle laisse couler le robinet', 'Elle coupe les fleurs'],
				qcm1Correct: 'Elle ferme bien le robinet',
				qcm2Header: 'b) Quels petits insectes aiment les fleurs ?',
				qcm2Options: ['Les abeilles et les papillons', 'Les vaches et les moutons', 'Les chats et les lapins'],
				qcm2Correct: 'Les abeilles et les papillons',
				tf1Q: 'Nadia cultive des fleurs au printemps.',
				tf1A: 'Vrai',
				tf2Q: 'Nadia gaspille l’eau.',
				tf2A: 'Faux',
				tf2C: "Nadia ferme bien le robinet pour économiser l'eau.",
				mcqQ: "Que fait Nadia pour économiser l'eau ?",
				mcqCorrect: 'Elle ferme bien le robinet',
				mcqWrong: [
					{ text: 'Elle gaspille l’eau', diagnosticFeedback: 'Au contraire, elle économise l’eau.' },
					{ text: 'Elle coupe les arbres', diagnosticFeedback: 'Nadia aime et protège la nature.' },
					{ text: 'Elle jette des papiers', diagnosticFeedback: 'Relis la phrase avec le mot robinet.' }
				]
			}
		];

		const sc = rng.pick(scenarios);
		const mcq = buildUniqueMcqOptions(sc.mcqCorrect, sc.mcqWrong, rng);
		const plainText = sc.paragraphs.join(' ').replace(/\[\[|\]\]/g, '');

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `Lis le texte :\n« ${plainText} »\nQuestion : ${sc.mcqQ}`,
			questionTextAr: 'اقرأ النص واختر الإجابة الصحيحة حول حماية الطبيعة:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة من النص هي: «${sc.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: "I. Compréhension de l'écrit",
			points: 4,
			instruction: 'Lis le texte, puis fais les exercices suivants :',
			content: [
				buildFrenchPassageBlock({
					title: sc.title,
					paragraphs: sc.paragraphs,
					numberedParagraphs: false
				}),
				{
					type: 'text',
					content: '#strong[1)] Coche la bonne réponse :'
				},
				{
					type: 'multiple_choice',
					groups: [
						{ header: sc.qcm1Header, options: sc.qcm1Options, correct: sc.qcm1Correct, mark: '1' },
						{ header: sc.qcm2Header, options: sc.qcm2Options, correct: sc.qcm2Correct, mark: '1' }
					]
				},
				{
					type: 'text',
					content: '#strong[2)] Réponds par « Vrai » ou « Faux » :'
				},
				{
					type: 'true_false',
					items: [
						{ q: `a) ${sc.tf1Q}`, a: sc.tf1A, mark: '1' },
						{ q: `b) ${sc.tf2Q}`, a: sc.tf2A, c: sc.tf2C, mark: '1' }
					]
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'اقرأ النص بتركيز واستخرج الأعمال الحسنة التي يقوم بها التلميذ.',
				'اختر الإجابة المطابقة للنص في السؤال الأول.',
				'في سؤال Vrai / Faux تحقّق من الكلمات المثبتة والمنفية.'
			],
			solutionStepsAr: [
				`الاختيارات: (a) ${sc.qcm1Correct} — (b) ${sc.qcm2Correct}.`,
				`صحيح أو خطأ: (a) ${sc.tf1A} — (b) ${sc.tf2A} (${sc.tf2C}).`
			],
			finalAnswer: sc.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Fonctionnement de la langue 1 (3 pts) — Sons (an/en, in, eau/au) & Pluriel (-s)
// ═══════════════════════════════════════════════════════════════════════════════
const langSonsPluriel3apT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3ap_t3_lang_sons_pluriel',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'orthographe_accords',
	titleAr: 'دراسة اللغة: الأصوات (an/en, in, eau/au) والجمع بـ -s',
	curriculumLessonId: 'fre_lesson_3ap_t3_sons_nasaux',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				words: ['orange', 'jardin', 'oiseau', 'enfant', 'lapin', 'jaune'],
				colAn: ['orange', 'enfant'],
				colIn: ['jardin', 'lapin'],
				colEau: ['oiseau', 'jaune'],
				plurPrompt: 'une pomme : des ............  |  le jardin : les ............  |  un arbre : des ............',
				plurAnswer: 'des pommes  |  les jardins  |  des arbres',
				mcqPrompt: 'Quel est le pluriel de « une orange » ?',
				mcqCorrect: 'des oranges',
				mcqDistractors: [
					{ text: 'des orange', diagnosticFeedback: "N'oublie pas d'ajouter -s à la fin du nom au pluriel." },
					{ text: 'une oranges', diagnosticFeedback: 'Au pluriel, une devient des.' },
					{ text: 'les orange', diagnosticFeedback: 'une devient des et orange prend un -s.' }
				]
			},
			{
				words: ['maman', 'matin', 'gâteau', 'vent', 'raisin', 'automne'],
				colAn: ['maman', 'vent'],
				colIn: ['matin', 'raisin'],
				colEau: ['gâteau', 'automne'],
				plurPrompt: 'la fleur : les ............  |  un fruit : des ............  |  une datte : des ............',
				plurAnswer: 'les fleurs  |  des fruits  |  des dattes',
				mcqPrompt: 'Quel mot contient le son « eau / au » (se lit « o ») ?',
				mcqCorrect: 'gâteau',
				mcqDistractors: [
					{ text: 'matin', diagnosticFeedback: 'matin contient le son in.' },
					{ text: 'vent', diagnosticFeedback: 'vent contient le son en.' },
					{ text: 'raisin', diagnosticFeedback: 'raisin contient le son in.' }
				]
			},
			{
				words: ['tante', 'sapin', 'bateau', 'planter', 'chemin', 'chaud'],
				colAn: ['tante', 'planter'],
				colIn: ['sapin', 'chemin'],
				colEau: ['bateau', 'chaud'],
				plurPrompt: 'le lapin : les ............  |  une tomate : des ............  |  un légume : des ............',
				plurAnswer: 'les lapins  |  des tomates  |  des légumes',
				mcqPrompt: 'Quel mot contient le son « in » ?',
				mcqCorrect: 'sapin',
				mcqDistractors: [
					{ text: 'bateau', diagnosticFeedback: 'bateau contient le son eau.' },
					{ text: 'tante', diagnosticFeedback: 'tante contient le son an.' },
					{ text: 'chaud', diagnosticFeedback: 'chaud contient le son au.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.mcqCorrect, s.mcqDistractors, rng);

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: s.mcqPrompt,
			questionTextAr: 'اختر الإجابة الصحيحة حول الأصوات والجمع:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي «${s.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'II. Fonctionnement de la langue',
			points: 3,
			instruction: 'Fais les deux activités suivantes :',
			content: [
				{
					type: 'text',
					content: `#strong[Activité 1 :] Classe les mots dans le tableau selon le son : ( ${s.words.join(' - ')} )`
				},
				buildFrenchClassificationTableBlock({
					columns: [
						{ header: 'Son « an / en »', items: s.colAn, mark: '0.5' },
						{ header: 'Son « in »', items: s.colIn, mark: '0.5' },
						{ header: 'Son « eau / au »', items: s.colEau, mark: '0.5' }
					]
				}),
				{
					type: 'text',
					content: `#strong[Activité 2 :] Mets les noms suivants au pluriel (ajoute « -s ») :\n${s.plurPrompt}`,
					answer: `#strong[Activité 2 :] ${s.plurAnswer}`,
					mark: '1.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'المقطعان an و en لهما نفس الصوت، والمقطعان eau و au يُنطقان «o».',
				'في الجمع تتحول un / une إلى des، و le / la إلى les.',
				'لا تنسَ إضافة الحرف -s في آخر الاسم الجمع.'
			],
			solutionStepsAr: [
				`تصنيف الأصوات: an/en (${s.colAn.join(', ')}) | in (${s.colIn.join(', ')}) | eau/au (${s.colEau.join(', ')}).`,
				`الجمع: ${s.plurAnswer}.`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Fonctionnement de la langue 2 (3 pts) — Verbes du 1er groupe & Phrase simple
// ═══════════════════════════════════════════════════════════════════════════════
const langVerbesPhrase3apT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3ap_t3_lang_verbes_phrase',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'conjugaison_temps',
	titleAr: 'تصريف وتراكيب: أفعال الفوج الأول وبناء الجملة البسيطة',
	curriculumLessonId: 'fre_lesson_3ap_t3_pluriel_verbes1',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				v1: 'Je (planter) ............ un arbre.',
				v1A: 'Je plante un arbre.',
				v2: 'Tu (manger) ............ une datte.',
				v2A: 'Tu manges une datte.',
				v3: 'Les élèves (aimer) ............ la nature.',
				v3A: 'Les élèves aiment la nature.',
				scrambled: 'arrose / Sara / fleurs / les / .',
				ordered: 'Sara arrose les fleurs.',
				mcqPrompt: 'Conjugue le verbe « planter » au présent : « Les enfants ...... des arbres. »',
				mcqCorrect: 'plantent',
				mcqDistractors: [
					{ text: 'plante', diagnosticFeedback: 'plante est au singulier (je, il, elle).' },
					{ text: 'plantes', diagnosticFeedback: 'plantes va avec le pronom tu.' },
					{ text: 'plantez', diagnosticFeedback: 'plantez va avec le pronom vous.' }
				]
			},
			{
				v1: "J' (aimer) ............ le printemps.",
				v1A: "J'aime le printemps.",
				v2: 'Il (manger) ............ une orange.',
				v2A: 'Il mange une orange.',
				v3: 'Nous (planter) ............ des fleurs.',
				v3A: 'Nous plantons des fleurs.',
				scrambled: 'une / Le lapin / carotte / mange / .',
				ordered: 'Le lapin mange une carotte.',
				mcqPrompt: 'Conjugue le verbe « aimer » au présent : « Nous ...... la campagne. »',
				mcqCorrect: 'aimons',
				mcqDistractors: [
					{ text: 'aime', diagnosticFeedback: 'aime va avec je, il ou elle.' },
					{ text: 'aimez', diagnosticFeedback: 'aimez va avec vous.' },
					{ text: 'aiment', diagnosticFeedback: 'aiment va avec ils ou elles.' }
				]
			},
			{
				v1: 'Elle (planter) ............ une tomate.',
				v1A: 'Elle plante une tomate.',
				v2: 'Vous (aimer) ............ les fruits.',
				v2A: 'Vous aimez les fruits.',
				v3: 'Ils (manger) ............ des pommes.',
				v3A: 'Ils mangent des pommes.',
				scrambled: 'Amine / un / plante / oranger / .',
				ordered: 'Amine plante un oranger.',
				mcqPrompt: 'Remets les mots en ordre pour former une phrase correcte : (Amine / un / plante / arbre / .)',
				mcqCorrect: 'Amine plante un arbre.',
				mcqDistractors: [
					{ text: 'Plante Amine un arbre.', diagnosticFeedback: 'La phrase simple commence par le sujet (Amine).' },
					{ text: 'Amine un arbre plante.', diagnosticFeedback: 'Le verbe plante vient juste après le sujet.' },
					{ text: 'Un arbre plante Amine.', diagnosticFeedback: "C'est Amine qui fait l'action de planter." }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.mcqCorrect, s.mcqDistractors, rng);

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: s.mcqPrompt,
			questionTextAr: 'اختر الإجابة الصحيحة في تصريف الفوج الأول وترتيب الجملة:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي «${s.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'II. Fonctionnement de la langue',
			points: 3,
			instruction: 'Fais les deux activités suivantes :',
			content: [
				{
					type: 'text',
					content: `#strong[Activité 1 :] Conjugue les verbes entre parenthèses au présent :\n1) ${s.v1}\n2) ${s.v2}\n3) ${s.v3}`,
					answer: `#strong[Activité 1 :] 1) ${s.v1A}  |  2) ${s.v2A}  |  3) ${s.v3A}`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `#strong[Activité 2 :] Remets les mots en ordre pour écrire une phrase correcte (majuscule et point) :\n( ${s.scrambled} )`,
					answer: `#strong[Activité 2 :] ${s.ordered}`,
					mark: '1.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'نهايات الفوج الأول في الحاضر: je -e، tu -es، il/elle -e، nous -ons، vous -ez، ils/elles -ent.',
				'ابدأ الجملة بالفاعل الذي يحمل الحرف الكبير.',
				'ضع الفعل مباشرة بعد الفاعل ولا تنسَ النقطة في النهاية.'
			],
			solutionStepsAr: [
				`التصريف: ${s.v1A} — ${s.v2A} — ${s.v3A}.`,
				`ترتيب الجملة: ${s.ordered}`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Production écrite (3 pts) — Protéger la nature / Décrire une saison
// ═══════════════════════════════════════════════════════════════════════════════
const prodNature3apT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3ap_t3_prod_nature',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'production_ecrite',
	titleAr: 'الوضعية الإدماجية: وصف فصل أو حماية الطبيعة بجمل بسيطة',
	curriculumLessonId: 'fre_lesson_3ap_t3_phrase_simple',
	defaultPoints: 3,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const prompts = [
			{
				prompt: 'Écris 3 phrases simples pour parler du printemps et de la nature avec la boîte à outils.',
				notes: [
					'Noms : le printemps, les fleurs, les oiseaux, les arbres',
					'Verbes : arrive, poussent, chantent, aimons',
					'Adjectifs : beau, vert, jaunes'
				],
				model: 'Le printemps arrive et la nature est belle. Les fleurs jaunes poussent dans le jardin. Les oiseaux chantent dans les arbres verts.',
				mcqQ: 'Quelle phrase respecte la majuscule, le sens et le point ?',
				mcqCorrect: 'Les fleurs poussent dans le jardin.',
				mcqDistractors: [
					{ text: 'les fleurs poussent dans le jardin', diagnosticFeedback: 'Il manque la majuscule au début et le point final.' },
					{ text: 'Dans le jardin fleurs poussent les.', diagnosticFeedback: "L'ordre des mots est incorrect." },
					{ text: 'Les fleurs pousse dans le jardin.', diagnosticFeedback: 'Avec Les fleurs (elles), on écrit poussent.' }
				]
			},
			{
				prompt: "Écris 3 phrases simples pour expliquer comment protéger le jardin de l'école.",
				notes: [
					'Noms : les élèves, des arbres, les fleurs, la poubelle',
					'Verbes : nettoient, plantent, arrosent, jettent',
					'Pense à la majuscule au début et au point à la fin de chaque phrase.'
				],
				model: "Les élèves nettoient le jardin de l'école. Ils plantent des arbres et arrosent les fleurs. Ils jettent les papiers dans la poubelle.",
				mcqQ: 'Choisis la bonne phrase pour protéger la nature :',
				mcqCorrect: 'Les élèves plantent des arbres verts.',
				mcqDistractors: [
					{ text: 'Les élèves plante un arbre.', diagnosticFeedback: 'Avec Les élèves, on écrit plantent.' },
					{ text: 'les élèves plantent des arbre', diagnosticFeedback: 'Il manque la majuscule, le -s à arbres et le point.' },
					{ text: 'Des arbres plantent les élèves.', diagnosticFeedback: "Ce sont les élèves qui plantent les arbres." }
				]
			},
			{
				prompt: 'Écris 3 phrases simples pour présenter tes fruits préférés à la campagne.',
				notes: [
					'Noms : les pommes, les oranges, les dattes, le jardin',
					'Verbes : aime, mange, cueille',
					'Adjectifs : sucrées, délicieuses, rouges'
				],
				model: "J'aime beaucoup les fruits de la campagne. Je cueille des pommes rouges dans le jardin. Je mange aussi des dattes sucrées.",
				mcqQ: 'Quelle phrase est correctement écrite au pluriel ?',
				mcqCorrect: 'Je mange des oranges sucrées.',
				mcqDistractors: [
					{ text: 'Je mange des orange sucrée.', diagnosticFeedback: 'Après des, le nom et l’adjectif prennent -s.' },
					{ text: 'Je manges des oranges.', diagnosticFeedback: 'Avec Je, on écrit mange sans -s.' },
					{ text: 'je mange des oranges sucrées', diagnosticFeedback: 'Il manque la majuscule J et le point.' }
				]
			}
		];

		const pr = rng.pick(prompts);
		const mcq = buildUniqueMcqOptions(pr.mcqCorrect, pr.mcqDistractors, rng);

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: pr.mcqQ,
			questionTextAr: 'اختر الجملة الصحيحة لكتابة فقرة قصيرة عن الطبيعة:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الجملة الصحيحة هي: «${pr.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'III. Production écrite',
			points: 3,
			content: [
				buildFrenchWrittenProductionBlock({
					sujetUnTitle: "Situation d'intégration :",
					sujetUnPrompt: pr.prompt,
					sujetUnNotes: pr.notes,
					modelAnswer: pr.model,
					rubricSummary:
						'Respect du thème (1 pt), conjugaison et pluriel corrects (1 pt), majuscules et points (1 pt).',
					mark: '3'
				})
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'استعمل الكلمات والأفعال من صندوق الأدوات لتكوين 3 جمل واضحة.',
				'انتبه لنهاية الفعل في الحاضر وعلامة الجمع (-s).',
				'ابدأ كل جملة بحرف كبير وأنهها بنقطة.'
			],
			solutionStepsAr: [
				'قراءة التعليمة وصندوق الأدوات.',
				'كتابة 3 جمل بسيطة بترتيب (فاعل + فعل + مكمل).',
				`الفقرة النموذجية: ${pr.model}`
			],
			finalAnswer: pr.mcqCorrect
		};
	}
};

export const TEMPLATES_3AP_T3: FrenchParameterizedTemplate[] = [
	compCampagne3apT3,
	compNature3apT3,
	langSonsPluriel3apT3,
	langVerbesPhrase3apT3,
	prodNature3apT3
];
