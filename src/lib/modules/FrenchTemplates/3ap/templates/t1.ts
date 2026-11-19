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
// 1. Compréhension 1 (4 pts) — Saluer et se présenter à l'école
// ═══════════════════════════════════════════════════════════════════════════════
const compSalutations3apT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3ap_t1_comp_salutations',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب: التحية والتعريف بالنفس في المدرسة',
	curriculumLessonId: 'fre_lesson_3ap_t1_salutations',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const scenarios = [
			{
				title: 'Un nouvel élève en 3AP',
				name: 'Amine',
				age: '8 ans',
				city: 'Alger',
				friend: 'Karim',
				paragraphs: [
					"Bonjour ! Je m'appelle [[Amine]]. J'ai huit ans. Je suis élève en 3e année primaire à Alger.",
					"J'aime beaucoup mon école et ma maîtresse. Mon ami s'appelle [[Karim]]. Au revoir !"
				],
				tf1Q: 'Amine a huit ans.',
				tf1A: 'Vrai',
				tf2Q: "L'ami d'Amine s'appelle Bilal.",
				tf2A: 'Faux',
				tf2C: "Son ami s'appelle Karim.",
				wrongNames: [
					{ text: 'Youssef', diagnosticFeedback: "Le texte dit clairement : Je m'appelle Amine." },
					{ text: 'Bilal', diagnosticFeedback: 'Bilal ne figure pas dans le texte.' },
					{ text: 'Omar', diagnosticFeedback: 'Relis la première phrase du texte.' }
				]
			},
			{
				title: 'Bienvenue dans ma classe',
				name: 'Meriem',
				age: '8 ans',
				city: 'Oran',
				friend: 'Sara',
				paragraphs: [
					"Bonjour ! Je m'appelle [[Meriem]]. J'ai huit ans. J'habite dans la belle ville d'Oran.",
					"En classe, je salue ma maîtresse avec politesse. Mon amie s'appelle [[Sara]]. Merci !"
				],
				tf1Q: "Meriem habite à Oran.",
				tf1A: 'Vrai',
				tf2Q: "Meriem ne salue pas sa maîtresse.",
				tf2A: 'Faux',
				tf2C: 'Meriem salue sa maîtresse avec politesse.',
				wrongNames: [
					{ text: 'Ines', diagnosticFeedback: "L'élève qui se présente est Meriem." },
					{ text: 'Lina', diagnosticFeedback: 'Relis la phrase juste après Bonjour.' },
					{ text: 'Aya', diagnosticFeedback: 'Aya ne figure pas dans ce texte.' }
				]
			},
			{
				title: 'Mon premier jour en 3AP',
				name: 'Youssef',
				age: '9 ans',
				city: 'Constantine',
				friend: 'Adam',
				paragraphs: [
					"Salut ! Je m'appelle [[Youssef]]. J'ai neuf ans. Je vais à l'école primaire de Constantine.",
					"Dans la cour, je dis bonjour à mon ami [[Adam]]. Vive l'école !"
				],
				tf1Q: 'Youssef a neuf ans.',
				tf1A: 'Vrai',
				tf2Q: 'Youssef habite à Sétif.',
				tf2A: 'Faux',
				tf2C: "Youssef va à l'école à Constantine.",
				wrongNames: [
					{ text: 'Sami', diagnosticFeedback: "Le prénom écrit après Je m'appelle est Youssef." },
					{ text: 'Karim', diagnosticFeedback: 'Karim ne figure pas dans le texte.' },
					{ text: 'Anes', diagnosticFeedback: 'Relis la première ligne du texte.' }
				]
			}
		];

		const sc = rng.pick(scenarios);
		const mcq = buildUniqueMcqOptions(sc.name, sc.wrongNames, rng);
		const plainText = sc.paragraphs.join(' ').replace(/\[\[|\]\]/g, '');

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `Lis le texte puis choisis la bonne réponse :\n« ${plainText} »\nQuestion : Comment s'appelle l'élève qui parle ?`,
			questionTextAr: 'اقرأ النص القصير واختر اسم التلميذ الذي يتحدّث:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `في الجملة الأولى نقرأ: «Je m'appelle ${sc.name}.».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: "I. Compréhension de l'écrit",
			points: 4,
			instruction: 'Lis attentivement le texte, puis réponds aux questions :',
			content: [
				buildFrenchPassageBlock({
					title: sc.title,
					paragraphs: sc.paragraphs,
					numberedParagraphs: false
				}),
				{
					type: 'text',
					content: '#strong[1)] Complète le tableau à partir du texte :'
				},
				{
					type: 'table',
					headers: ['Prénom', 'Âge', 'Ville', 'Ami(e)'],
					cells: [],
					rows: [
						[
							{ content: '............', answer: sc.name, mark: '0.5' },
							{ content: '............', answer: sc.age, mark: '0.5' },
							{ content: '............', answer: sc.city, mark: '0.5' },
							{ content: '............', answer: sc.friend, mark: '0.5' }
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
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				"ابحث عن الاسم مباشرة بعد عبارة «Je m'appelle».",
				"ابحث عن العمر بعد عبارة «J'ai» وعن المدينة بعد «à» أو «d'».",
				'قارن كل جملة في سؤال Vrai / Faux مع جمل النص.'
			],
			solutionStepsAr: [
				`ملء الجدول: Prénom = ${sc.name} | Âge = ${sc.age} | Ville = ${sc.city} | Ami(e) = ${sc.friend}.`,
				`الجملة (a): ${sc.tf1A}.`,
				`الجملة (b): ${sc.tf2A} (${sc.tf2C}).`
			],
			finalAnswer: sc.name
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Compréhension 2 (4 pts) — Dans mon cartable (Fournitures scolaires)
// ═══════════════════════════════════════════════════════════════════════════════
const compCartable3apT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3ap_t1_comp_cartable',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب: في محفظتي المدرسية (الأدوات المدرسية)',
	curriculumLessonId: 'fre_lesson_3ap_t1_fournitures',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const scenarios = [
			{
				title: 'Le cartable de Sara',
				pupil: 'Sara',
				bagColor: 'vert',
				item1: 'un livre',
				item2: 'une trousse',
				item3: "l'ardoise",
				paragraphs: [
					"Bonjour ! Je m'appelle [[Sara]]. Aujourd'hui, je prépare mon beau cartable vert pour l'école.",
					"Dans mon cartable, je range [[un livre]], un cahier bleu, une trousse et l'ardoise. Je suis prête pour la classe !"
				],
				qcm1Header: 'a) Quelle est la couleur du cartable de Sara ?',
				qcm1Options: ['rouge', 'vert', 'jaune'],
				qcm1Correct: 'vert',
				qcm2Header: 'b) Où Sara range-t-elle son livre et sa trousse ?',
				qcm2Options: ['Dans son cartable', 'Dans le jardin', 'Sur le tapis'],
				qcm2Correct: 'Dans son cartable',
				tf1Q: 'Sara a un cahier bleu.',
				tf1A: 'Vrai',
				tf2Q: "Sara n'a pas d'ardoise.",
				tf2A: 'Faux',
				tf2C: "Sara range aussi l'ardoise dans son cartable.",
				wrongColors: [
					{ text: 'rouge', diagnosticFeedback: 'Le texte dit : mon beau cartable vert.' },
					{ text: 'noir', diagnosticFeedback: 'La couleur noir ne figure pas dans le texte.' },
					{ text: 'jaune', diagnosticFeedback: 'Relis la deuxième phrase du texte.' }
				]
			},
			{
				title: 'Les fournitures de Karim',
				pupil: 'Karim',
				bagColor: 'bleu',
				item1: 'un cahier',
				item2: 'une règle',
				item3: 'une gomme',
				paragraphs: [
					"Bonjour ! Je m'appelle [[Karim]]. Mon cartable est bleu et très propre.",
					"Dans ma trousse, j'ai un stylo, [[une règle]] et une gomme blanche. J'ai aussi un cahier neuf."
				],
				qcm1Header: 'a) Quelle est la couleur du cartable de Karim ?',
				qcm1Options: ['bleu', 'vert', 'marron'],
				qcm1Correct: 'bleu',
				qcm2Header: 'b) Que trouve-t-on dans la trousse de Karim ?',
				qcm2Options: ['Un stylo, une règle et une gomme', 'Une banane et une datte', 'Un tapis et un ballon'],
				qcm2Correct: 'Un stylo, une règle et une gomme',
				tf1Q: 'Karim a une gomme blanche.',
				tf1A: 'Vrai',
				tf2Q: 'Le cartable de Karim est sale.',
				tf2A: 'Faux',
				tf2C: 'Le cartable de Karim est très propre.',
				wrongColors: [
					{ text: 'vert', diagnosticFeedback: 'Le texte indique : Mon cartable est bleu.' },
					{ text: 'rouge', diagnosticFeedback: 'Le mot rouge ne figure pas dans le texte.' },
					{ text: 'blanc', diagnosticFeedback: 'Blanc est la couleur de la gomme, pas du cartable.' }
				]
			},
			{
				title: 'Dans ma classe propre',
				pupil: 'Anes',
				bagColor: 'noir',
				item1: 'un stylo',
				item2: 'un crayon',
				item3: 'un livre',
				paragraphs: [
					"Salut ! Je suis [[Anes]]. Le matin, je prends mon cartable noir et je vais à l'école.",
					"Sur ma table, je pose [[un livre]] de français, un stylo vert et un crayon. J'aime bien lire."
				],
				qcm1Header: "a) Quelle est la couleur du cartable d'Anes ?",
				qcm1Options: ['noir', 'jaune', 'rouge'],
				qcm1Correct: 'noir',
				qcm2Header: "b) Que pose Anes sur sa table ?",
				qcm2Options: ['Un livre, un stylo et un crayon', 'Un cartable et un tapis', 'Une pomme et une poire'],
				qcm2Correct: 'Un livre, un stylo et un crayon',
				tf1Q: 'Anes aime bien lire.',
				tf1A: 'Vrai',
				tf2Q: 'Le stylo de Anes est rouge.',
				tf2A: 'Faux',
				tf2C: 'Anes a un stylo vert.',
				wrongColors: [
					{ text: 'vert', diagnosticFeedback: 'Vert est la couleur du stylo, pas du cartable.' },
					{ text: 'bleu', diagnosticFeedback: 'Le texte dit : mon cartable noir.' },
					{ text: 'gris', diagnosticFeedback: 'Relis la première ligne du texte.' }
				]
			}
		];

		const sc = rng.pick(scenarios);
		const mcq = buildUniqueMcqOptions(sc.bagColor, sc.wrongColors, rng);
		const plainText = sc.paragraphs.join(' ').replace(/\[\[|\]\]/g, '');

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `Lis le texte :\n« ${plainText} »\nQuestion : Quelle est la couleur du cartable de ${sc.pupil} ?`,
			questionTextAr: `اقرأ النص واختر لون محفظة ${sc.pupil}:`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `نقرأ في النص أن لون المحفظة (le cartable) هو: «${sc.bagColor}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: "I. Compréhension de l'écrit",
			points: 4,
			instruction: 'Lis le texte, puis fais les activités suivantes :',
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
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'ابحث عن كلمة cartable لتجد لون المحفظة مباشرة بعدها.',
				'استخرج أسماء الأدوات المدرسية المذكورة في الفقرة الثانية.',
				'تأكد من مطابقة كل جملة في Vrai / Faux مع النص.'
			],
			solutionStepsAr: [
				`الاختيار الأول: ${sc.qcm1Correct} — الاختيار الثاني: ${sc.qcm2Correct}.`,
				`صحيح أو خطأ: (a) ${sc.tf1A} — (b) ${sc.tf2A} (${sc.tf2C}).`
			],
			finalAnswer: sc.bagColor
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Fonctionnement de la langue 1 (3 pts) — Alphabet, Voyelles & Syllabes
// ═══════════════════════════════════════════════════════════════════════════════
const langAlphabetSyllabes3apT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3ap_t1_lang_alphabet_syllabes',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'phonetique_lecture',
	titleAr: 'دراسة اللغة: الحروف المتحركة والساكنة والمقاطع الصوتية',
	curriculumLessonId: 'fre_lesson_3ap_t1_syllabes',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				letters: ['a', 'm', 'y', 'p', 'i', 't'],
				vowels: ['a', 'y', 'i'],
				consonants: ['m', 'p', 't'],
				syllTask: 'Complète avec la bonne syllabe (ma / ta / pa) : ....-man  |  ....-pis  |  ....-pa',
				syllAnswer: 'ma-man  |  ta-pis  |  pa-pa',
				capPrompt: 'bonjour, je suis amine.',
				capAnswer: 'Bonjour, je suis Amine.',
				mcqPrompt: 'Quelle lettre est une VOYELLE (حرف متحرك) en français ?',
				mcqCorrect: 'y',
				mcqDistractors: [
					{ text: 'm', diagnosticFeedback: 'm est une consonne.' },
					{ text: 'p', diagnosticFeedback: 'p est une consonne.' },
					{ text: 't', diagnosticFeedback: 't est une consonne. Les 6 voyelles sont a, e, i, o, u, y.' }
				]
			},
			{
				letters: ['e', 'b', 'o', 'd', 'u', 'n'],
				vowels: ['e', 'o', 'u'],
				consonants: ['b', 'd', 'n'],
				syllTask: 'Complète avec la bonne syllabe (ba / mi / da) : ....-nane  |  ....-di  |  ....-tte',
				syllAnswer: 'ba-nane  |  mi-di  |  da-tte',
				capPrompt: 'salut sara, bienvenue à oran.',
				capAnswer: 'Salut Sara, bienvenue à Oran.',
				mcqPrompt: 'Remets les syllabes en ordre pour former le nom du fruit : (ne / ba / na)',
				mcqCorrect: 'banane',
				mcqDistractors: [
					{ text: 'nabane', diagnosticFeedback: 'Le mot commence par la syllabe ba.' },
					{ text: 'banena', diagnosticFeedback: 'La syllabe na vient avant ne.' },
					{ text: 'nebana', diagnosticFeedback: 'La syllabe ne vient à la fin.' }
				]
			},
			{
				letters: ['a', 'n', 'i', 'b', 'o', 'd'],
				vowels: ['a', 'i', 'o'],
				consonants: ['n', 'b', 'd'],
				syllTask: 'Complète avec la bonne syllabe (a / pi / bi) : ....-mi  |  ....-le  |  ....-lle',
				syllAnswer: 'a-mi  |  pi-le  |  bi-lle',
				capPrompt: 'bonjour karim, au revoir !',
				capAnswer: 'Bonjour Karim, au revoir !',
				mcqPrompt: 'Quelle syllabe obtient-on en associant les lettres « d + i » ?',
				mcqCorrect: 'di',
				mcqDistractors: [
					{ text: 'da', diagnosticFeedback: 'da se forme avec d + a.' },
					{ text: 'ti', diagnosticFeedback: 'ti se forme avec t + i.' },
					{ text: 'bi', diagnosticFeedback: 'bi se forme avec b + i.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.mcqCorrect, s.mcqDistractors, rng);

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: s.mcqPrompt,
			questionTextAr: 'اختر الإجابة الصحيحة حول الحروف والمقاطع الصوتية:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي «${s.mcqCorrect}». تذكّر أن الحروف المتحركة في الفرنسية ستة: a, e, i, o, u, y.`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'II. Fonctionnement de la langue',
			points: 3,
			instruction: 'Fais les trois exercices suivants avec soin :',
			content: [
				{
					type: 'text',
					content: `#strong[Activité 1 :] Classe les lettres suivantes dans le tableau : ( ${s.letters.join(' - ')} )`
				},
				buildFrenchClassificationTableBlock({
					columns: [
						{ header: 'Voyelles (a, e, i, o, u, y)', items: s.vowels, mark: '0.5' },
						{ header: 'Consonnes', items: s.consonants, mark: '0.5' }
					]
				}),
				{
					type: 'text',
					content: `#strong[Activité 2 :] ${s.syllTask}`,
					answer: `#strong[Activité 2 :] ${s.syllAnswer}`,
					mark: '1'
				},
				{
					type: 'text',
					content: `#strong[Activité 3 :] Recopie la phrase en mettant les majuscules nécessaires : « ${s.capPrompt} »`,
					answer: `#strong[Activité 3 :] ${s.capAnswer}`,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'الحروف المتحركة في اللغة الفرنسية ستة: a, e, i, o, u, y.',
				'اقرأ الكلمات مقطّعة (ma-man, pa-pa, ba-na-ne) لاختيار المقطع المناسب.',
				'نضع الحرف الكبير في بداية الجملة وفي بداية أسماء الأشخاص والمدن.'
			],
			solutionStepsAr: [
				`تصنيف الحروف: Voyelles (${s.vowels.join(', ')}) — Consonnes (${s.consonants.join(', ')}).`,
				`إكمال المقاطع: ${s.syllAnswer}.`,
				`الحروف الكبيرة: ${s.capAnswer}`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Fonctionnement de la langue 2 (3 pts) — Déterminants (un/une, le/la/l') & Fournitures
// ═══════════════════════════════════════════════════════════════════════════════
const langDeterminants3apT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3ap_t1_lang_determinants',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'grammaire_syntaxe',
	titleAr: 'قواعد ورصيد: أدوات التنكير والتعريف والأدوات المدرسية',
	curriculumLessonId: 'fre_lesson_3ap_t1_fournitures',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				unUnePrompt: '...... cahier  |  ...... trousse  |  ...... stylo  |  ...... gomme',
				unUneAnswer: 'un cahier  |  une trousse  |  un stylo  |  une gomme',
				leLaPrompt: '...... livre  |  ...... règle  |  ...... ardoise  |  ...... cartable',
				leLaAnswer: "le livre  |  la règle  |  l'ardoise  |  le cartable",
				intrusList: 'cahier - stylo - banane - règle',
				intrusAns: 'banane',
				mcqPrompt: 'Choisis le bon déterminant devant le nom « trousse » :',
				mcqCorrect: 'une trousse',
				mcqDistractors: [
					{ text: 'un trousse', diagnosticFeedback: 'trousse est un nom féminin.' },
					{ text: 'le trousse', diagnosticFeedback: 'le est masculin.' },
					{ text: "l'trousse", diagnosticFeedback: 'trousse commence par une consonne (t).' }
				]
			},
			{
				unUnePrompt: '...... livre  |  ...... règle  |  ...... cartable  |  ...... ardoise',
				unUneAnswer: 'un livre  |  une règle  |  un cartable  |  une ardoise',
				leLaPrompt: '...... cahier  |  ...... gomme  |  ...... école  |  ...... stylo',
				leLaAnswer: "le cahier  |  la gomme  |  l'école  |  le stylo",
				intrusList: 'gomme - trousse - tapis - crayon',
				intrusAns: 'tapis',
				mcqPrompt: 'Comment écrit-on « ardoise » avec un article défini (le / la / l’) ?',
				mcqCorrect: "l'ardoise",
				mcqDistractors: [
					{ text: 'la ardoise', diagnosticFeedback: 'Devant une voyelle (a), la devient l’.' },
					{ text: 'le ardoise', diagnosticFeedback: 'ardoise est féminin et commence par une voyelle.' },
					{ text: 'un ardoise', diagnosticFeedback: 'un est un article indéfini masculin.' }
				]
			},
			{
				unUnePrompt: '...... crayon  |  ...... gomme  |  ...... cahier  |  ...... classe',
				unUneAnswer: 'un crayon  |  une gomme  |  un cahier  |  une classe',
				leLaPrompt: '...... stylo  |  ...... trousse  |  ...... ami  |  ...... table',
				leLaAnswer: "le stylo  |  la trousse  |  l'ami  |  la table",
				intrusList: 'cartable - livre - datte - stylo',
				intrusAns: 'datte',
				mcqPrompt: 'Quel mot est un intrus (الكلمة الدخيلة) dans les fournitures scolaires ?',
				mcqCorrect: 'datte',
				mcqDistractors: [
					{ text: 'cartable', diagnosticFeedback: 'cartable est une fourniture scolaire.' },
					{ text: 'livre', diagnosticFeedback: 'livre est une fourniture scolaire.' },
					{ text: 'stylo', diagnosticFeedback: 'stylo est une fourniture scolaire.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.mcqCorrect, s.mcqDistractors, rng);

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: s.mcqPrompt,
			questionTextAr: 'اختر الإجابة الصحيحة في الأدوات المدرسية والمحدّدات:',
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
			instruction: 'Réponds aux trois activités suivantes :',
			content: [
				{
					type: 'text',
					content: `#strong[Activité 1 :] Complète avec « un » ou « une » :\n${s.unUnePrompt}`,
					answer: `#strong[Activité 1 :] ${s.unUneAnswer}`,
					mark: '1'
				},
				{
					type: 'text',
					content: `#strong[Activité 2 :] Complète avec « le », « la » ou « l’ » :\n${s.leLaPrompt}`,
					answer: `#strong[Activité 2 :] ${s.leLaAnswer}`,
					mark: '1'
				},
				{
					type: 'text',
					content: `#strong[Activité 3 :] Barre le mot intrus (الكلمة الدخيلة) : ( ${s.intrusList} )`,
					answer: `#strong[Activité 3 :] Le mot intrus est : ${s.intrusAns}.`,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'نستعمل un / le للمذكر المفرد (cahier, stylo, livre, cartable).',
				'نستعمل une / la للمؤنث المفرد (trousse, règle, gomme)، ونضع l’ قبل الحرف المتحرك.',
				'ابحث عن الكلمة التي لا نضعها في المحفظة المدرسية.'
			],
			solutionStepsAr: [
				`un / une: ${s.unUneAnswer}.`,
				`le / la / l': ${s.leLaAnswer}.`,
				`الكلمة الدخيلة: ${s.intrusAns}.`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Production écrite (3 pts) — Se présenter à un nouvel ami (Carte d'identité)
// ═══════════════════════════════════════════════════════════════════════════════
const prodPresentation3apT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3ap_t1_prod_presentation',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'production_ecrite',
	titleAr: 'الوضعية الإدماجية: التعريف بالنفس من بطاقة التلميذ',
	curriculumLessonId: 'fre_lesson_3ap_t1_salutations',
	defaultPoints: 3,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const prompts = [
			{
				name: 'Bilal',
				age: '8 ans',
				city: 'Sétif',
				object: 'un cartable bleu',
				model: "Bonjour ! Je m'appelle Bilal. J'ai 8 ans. J'habite à Sétif. J'ai un cartable bleu.",
				mcqQ: 'Quelle phrase est correcte pour se présenter en français ?',
				mcqCorrect: "Bonjour ! Je m'appelle Bilal.",
				mcqDistractors: [
					{ text: 'Au revoir ! Je suis 8 ans.', diagnosticFeedback: 'Au revoir se dit à la fin et on dit J’ai 8 ans.' },
					{ text: "J'ai Bilal bonjour.", diagnosticFeedback: "Pour le prénom, on dit : Je m'appelle Bilal." },
					{ text: 'Cahier mon est Bilal.', diagnosticFeedback: 'La phrase n’a pas de sens.' }
				]
			},
			{
				name: 'Ines',
				age: '8 ans',
				city: 'Tlemcen',
				object: 'une trousse verte',
				model: "Bonjour ! Je m'appelle Ines. J'ai 8 ans. J'habite à Tlemcen. J'ai une trousse verte.",
				mcqQ: 'Quelle phrase exprime correctement son âge en français ?',
				mcqCorrect: "J'ai 8 ans.",
				mcqDistractors: [
					{ text: 'Je suis 8 ans.', diagnosticFeedback: "En français, on utilise le verbe avoir : J'ai 8 ans." },
					{ text: "Je m'appelle 8 ans.", diagnosticFeedback: "Je m'appelle sert à dire le prénom." },
					{ text: 'Bonjour 8 ans.', diagnosticFeedback: 'Il manque le verbe avoir.' }
				]
			},
			{
				name: 'Omar',
				age: '9 ans',
				city: 'Annaba',
				object: 'un livre de français',
				model: "Salut ! Je m'appelle Omar. J'ai 9 ans. J'habite à Annaba. J'ai un livre de français.",
				mcqQ: 'Quelle phrase utilise correctement les majuscules et le point ?',
				mcqCorrect: "J'habite à Annaba.",
				mcqDistractors: [
					{ text: "j'habite à annaba", diagnosticFeedback: 'Il manque les majuscules (J, A) et le point.' },
					{ text: "J'habite à annaba.", diagnosticFeedback: 'Annaba est un nom de ville : il faut une majuscule A.' },
					{ text: "j'habite à Annaba", diagnosticFeedback: 'Il manque la majuscule au début et le point final.' }
				]
			}
		];

		const pr = rng.pick(prompts);
		const mcq = buildUniqueMcqOptions(pr.mcqCorrect, pr.mcqDistractors, rng);

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: pr.mcqQ,
			questionTextAr: 'اختر الجملة الصحيحة لكتابة فقرة التعريف بالنفس:',
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
					sujetUnPrompt: `Aide-toi de la fiche ci-dessous pour écrire 3 à 4 phrases simples afin de présenter ${pr.name} à un(e) nouvel(le) ami(e).`,
					sujetUnNotes: [
						'Salutation : Bonjour ! / Salut !',
						`Prénom : ${pr.name} (Je m'appelle ...)`,
						`Âge : ${pr.age} (J'ai ...)`,
						`Ville : ${pr.city} (J'habite à ...)`,
						`Fourniture : ${pr.object} (J'ai ...)`
					],
					modelAnswer: pr.model,
					rubricSummary:
						'Respect de la fiche (1 pt), phrases simples correctes (1 pt), majuscules et points (1 pt).',
					mark: '3'
				})
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				"ابدأ بالتحية ثم عبارة «Je m'appelle ...».",
				"استعمل «J'ai ...» لذكر العمر والأداة المدرسية.",
				'لا تنسَ الحرف الكبير في بداية كل جملة والنقطة في نهايتها.'
			],
			solutionStepsAr: [
				'استخراج معطيات البطاقة (الاسم، العمر، المدينة، الأداة).',
				'كتابة 3 إلى 4 جمل قصيرة ومرتّبة.',
				`الفقرة النموذجية: ${pr.model}`
			],
			finalAnswer: pr.mcqCorrect
		};
	}
};

export const TEMPLATES_3AP_T1: FrenchParameterizedTemplate[] = [
	compSalutations3apT1,
	compCartable3apT1,
	langAlphabetSyllabes3apT1,
	langDeterminants3apT1,
	prodPresentation3apT1
];
