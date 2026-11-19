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
// 1. Compréhension 1 (4 pts) — En famille !
// ═══════════════════════════════════════════════════════════════════════════════
const compFamille3apT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3ap_t2_comp_famille',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب: عائلتي الجميلة (أفراد العائلة)',
	curriculumLessonId: 'fre_lesson_3ap_t2_famille',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const scenarios = [
			{
				title: 'La famille de Bilal',
				pupil: 'Bilal',
				father: 'Rachid',
				mother: 'Fatima',
				sibling: 'Aya (sœur)',
				pet: 'un chat blanc',
				paragraphs: [
					"Bonjour ! Je m'appelle [[Bilal]]. Voici ma gentille famille dans notre maison.",
					"Mon père s'appelle [[Rachid]] et ma mère s'appelle Fatima. J'ai une petite sœur : elle s'appelle Aya. Nous avons un chat blanc."
				],
				tf1Q: "Le père de Bilal s'appelle Rachid.",
				tf1A: 'Vrai',
				tf2Q: "Aya est la grand-mère de Bilal.",
				tf2A: 'Faux',
				tf2C: 'Aya est la petite sœur de Bilal.',
				wrongMothers: [
					{ text: 'Amina', diagnosticFeedback: "Le texte dit : ma mère s'appelle Fatima." },
					{ text: 'Nadia', diagnosticFeedback: 'Nadia ne figure pas dans le texte.' },
					{ text: 'Aya', diagnosticFeedback: 'Aya est la petite sœur, pas la mère.' }
				],
				motherAns: 'Fatima'
			},
			{
				title: 'Chez grand-mère',
				pupil: 'Khadidja',
				father: 'Ahmed',
				mother: 'Salma',
				sibling: 'Omar (frère)',
				pet: 'un oiseau',
				paragraphs: [
					"Bonjour ! Je suis [[Khadidja]]. Le vendredi, je visite ma grand-mère avec ma famille.",
					"Mon père s'appelle Ahmed et ma mère s'appelle [[Salma]]. Mon frère Omar est très gentil. Grand-mère a un joli oiseau."
				],
				tf1Q: 'Khadidja visite sa grand-mère le vendredi.',
				tf1A: 'Vrai',
				tf2Q: "Omar est le père de Khadidja.",
				tf2A: 'Faux',
				tf2C: 'Omar est le frère de Khadidja.',
				wrongMothers: [
					{ text: 'Fatima', diagnosticFeedback: "La mère de Khadidja s'appelle Salma." },
					{ text: 'Amina', diagnosticFeedback: 'Amina ne figure pas dans le texte.' },
					{ text: 'Meriem', diagnosticFeedback: 'Relis la première phrase du deuxième paragraphe.' }
				],
				motherAns: 'Salma'
			},
			{
				title: 'Une famille heureuse',
				pupil: 'Sami',
				father: 'Nabil',
				mother: 'Amina',
				sibling: 'Lina (sœur)',
				pet: 'un lapin gris',
				paragraphs: [
					"Salut ! Je m'appelle [[Sami]]. J'aime beaucoup mes parents et mes grands-parents.",
					"Mon père s'appelle Nabil et ma mère s'appelle [[Amina]]. Ma sœur Lina a un lapin gris dans le jardin."
				],
				tf1Q: 'Lina a un lapin gris.',
				tf1A: 'Vrai',
				tf2Q: "Le père de Sami s'appelle Karim.",
				tf2A: 'Faux',
				tf2C: "Le père de Sami s'appelle Nabil.",
				wrongMothers: [
					{ text: 'Lina', diagnosticFeedback: 'Lina est la sœur de Sami, pas sa mère.' },
					{ text: 'Salma', diagnosticFeedback: 'Relis la deuxième phrase : ma mère s’appelle Amina.' },
					{ text: 'Farida', diagnosticFeedback: 'Farida ne figure pas dans ce texte.' }
				],
				motherAns: 'Amina'
			}
		];

		const sc = rng.pick(scenarios);
		const mcq = buildUniqueMcqOptions(sc.motherAns, sc.wrongMothers, rng);
		const plainText = sc.paragraphs.join(' ').replace(/\[\[|\]\]/g, '');

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `Lis le texte :\n« ${plainText} »\nQuestion : Comment s'appelle la mère de ${sc.pupil} ?`,
			questionTextAr: `اقرأ النص واختر اسم أم ${sc.pupil}:`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `نقرأ في النص: «ma mère s'appelle ${sc.motherAns}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: "I. Compréhension de l'écrit",
			points: 4,
			instruction: 'Lis le texte attentivement, puis réponds aux questions :',
			content: [
				buildFrenchPassageBlock({
					title: sc.title,
					paragraphs: sc.paragraphs,
					numberedParagraphs: false
				}),
				{
					type: 'text',
					content: '#strong[1)] Complète le tableau de la famille à partir du texte :'
				},
				{
					type: 'table',
					headers: ['Père', 'Mère', 'Frère / Sœur', 'Animal'],
					cells: [],
					rows: [
						[
							{ content: '............', answer: sc.father, mark: '0.5' },
							{ content: '............', answer: sc.mother, mark: '0.5' },
							{ content: '............', answer: sc.sibling, mark: '0.5' },
							{ content: '............', answer: sc.pet, mark: '0.5' }
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
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'ابحث عن اسم الأب بعد عبارة Mon père، واسم الأم بعد عبارة ma mère.',
				'استخرج اسم الأخ أو الأخت والحيوان الأليف من الفقرة الثانية.',
				'تأكد من كل معلومة في سؤال Vrai / Faux بالعودة للنص.'
			],
			solutionStepsAr: [
				`الجدول: Père = ${sc.father} | Mère = ${sc.mother} | Frère/Sœur = ${sc.sibling} | Animal = ${sc.pet}.`,
				`صحيح أو خطأ: (a) ${sc.tf1A} — (b) ${sc.tf2A} (${sc.tf2C}).`
			],
			finalAnswer: sc.motherAns
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Compréhension 2 (4 pts) — Les animaux de la ferme
// ═══════════════════════════════════════════════════════════════════════════════
const compFerme3apT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3ap_t2_comp_ferme',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب: في مزرعة الجدّ (حيوانات المزرعة)',
	curriculumLessonId: 'fre_lesson_3ap_t2_animaux',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const scenarios = [
			{
				title: 'La ferme de grand-père',
				pupil: 'Lina',
				city: 'Blida',
				paragraphs: [
					"En vacances, [[Lina]] visite la grande ferme de son grand-père à Blida.",
					"Dans la ferme, il y a une [[vache]] qui donne du bon lait, un mouton blanc et des poules qui donnent des œufs."
				],
				qcm1Header: 'a) Que donne la vache ?',
				qcm1Options: ['du lait', 'des œufs', 'des poires'],
				qcm1Correct: 'du lait',
				qcm2Header: 'b) Que donnent les poules ?',
				qcm2Options: ['de la laine', 'des œufs', 'du pain'],
				qcm2Correct: 'des œufs',
				tf1Q: 'La ferme de grand-père est à Blida.',
				tf1A: 'Vrai',
				tf2Q: 'Le mouton est noir.',
				tf2A: 'Faux',
				tf2C: 'Le mouton est blanc.',
				mcqQ: 'Dans le texte, quel animal donne du lait ?',
				mcqCorrect: 'la vache',
				mcqWrong: [
					{ text: 'la poule', diagnosticFeedback: 'La poule donne des œufs.' },
					{ text: 'le mouton', diagnosticFeedback: 'Le texte dit que la vache donne du bon lait.' },
					{ text: 'le cheval', diagnosticFeedback: 'Le cheval ne figure pas dans ce texte.' }
				]
			},
			{
				title: 'Les animaux utiles',
				pupil: 'Youssef',
				city: 'Sétif',
				paragraphs: [
					"[[Youssef]] aime les animaux de la ferme de son oncle à Sétif.",
					"Le matin, il donne de l'eau au [[cheval]] rapide et du grain à la poule rousse. Le mouton donne de la laine chaude."
				],
				qcm1Header: 'a) Que donne Youssef au cheval ?',
				qcm1Options: ["de l'eau", 'du lait', 'des œufs'],
				qcm1Correct: "de l'eau",
				qcm2Header: 'b) Que donne le mouton ?',
				qcm2Options: ['des œufs', 'de la laine', 'du grain'],
				qcm2Correct: 'de la laine',
				tf1Q: 'Youssef donne du grain à la poule.',
				tf1A: 'Vrai',
				tf2Q: 'Le cheval est lent.',
				tf2A: 'Faux',
				tf2C: 'Le cheval est rapide.',
				mcqQ: 'Dans le texte, quel animal donne de la laine chaude ?',
				mcqCorrect: 'le mouton',
				mcqWrong: [
					{ text: 'la poule', diagnosticFeedback: 'La poule picore du grain et donne des œufs.' },
					{ text: 'le cheval', diagnosticFeedback: 'Le cheval boit de l’eau, c’est le mouton qui donne la laine.' },
					{ text: 'le chat', diagnosticFeedback: 'Le chat ne figure pas dans ce texte.' }
				]
			},
			{
				title: 'Mon petit lapin',
				pupil: 'Aya',
				city: 'Tlemcen',
				paragraphs: [
					"À Tlemcen, [[Aya]] a un petit lapin blanc et une chèvre grise dans le jardin de sa maison.",
					"Le [[lapin]] mange des carottes. La chèvre donne du lait frais chaque matin. Aya protège bien ses animaux."
				],
				qcm1Header: 'a) Que mange le lapin ?',
				qcm1Options: ['des carottes', 'des poissons', 'des bonbons'],
				qcm1Correct: 'des carottes',
				qcm2Header: 'b) Quel animal donne du lait frais ?',
				qcm2Options: ['le lapin', 'la chèvre', 'le chat'],
				qcm2Correct: 'la chèvre',
				tf1Q: 'Aya protège bien ses animaux.',
				tf1A: 'Vrai',
				tf2Q: 'Le lapin de Aya est noir.',
				tf2A: 'Faux',
				tf2C: 'Le lapin de Aya est blanc.',
				mcqQ: 'Dans le texte, que mange le lapin de Aya ?',
				mcqCorrect: 'des carottes',
				mcqWrong: [
					{ text: 'du lait', diagnosticFeedback: 'C’est la chèvre qui donne du lait.' },
					{ text: 'des œufs', diagnosticFeedback: 'Le lapin ne mange pas des œufs.' },
					{ text: 'des poires', diagnosticFeedback: 'Le texte dit : Le lapin mange des carottes.' }
				]
			}
		];

		const sc = rng.pick(scenarios);
		const mcq = buildUniqueMcqOptions(sc.mcqCorrect, sc.mcqWrong, rng);
		const plainText = sc.paragraphs.join(' ').replace(/\[\[|\]\]/g, '');

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `Lis le texte :\n« ${plainText} »\nQuestion : ${sc.mcqQ}`,
			questionTextAr: 'اقرأ النص القصير واختر الإجابة الصحيحة عن حيوانات المزرعة:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `بحسب النص، الإجابة الصحيحة هي «${sc.mcqCorrect}».`
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
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'اقرأ النص جيداً وحدّد أسماء الحيوانات المذكورة.',
				'انتبه لما يعطيه أو يأكله كل حيوان في الفقرة الثانية.',
				'تثبّت من الألوان والصفات قبل الإجابة بـ Vrai أو Faux.'
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
// 3. Fonctionnement de la langue 1 (3 pts) — Sons complexes (ou, on, oi, ch) & Animaux
// ═══════════════════════════════════════════════════════════════════════════════
const langSonsAnimaux3apT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3ap_t2_lang_sons_animaux',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'phonetique_lecture',
	titleAr: 'دراسة اللغة: الأصوات المركبة (ou, on, oi, ch) والحيوانات',
	curriculumLessonId: 'fre_lesson_3ap_t2_sons_complexes',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				words: ['poule', 'maison', 'poire', 'chat'],
				colOu: ['poule'],
				colOn: ['maison'],
				colOi: ['poire'],
				colCh: ['chat'],
				fillPrompt: 'Complète avec (ou / on / oi / ch) : un ....eval  |  un ball....  |  une p....le',
				fillAnswer: 'un cheval  |  un ballon  |  une poule',
				mcqPrompt: 'Quel mot contient le son « oi » (se lit « wa ») ?',
				mcqCorrect: 'poire',
				mcqDistractors: [
					{ text: 'poule', diagnosticFeedback: 'poule contient le son ou.' },
					{ text: 'chat', diagnosticFeedback: 'chat contient le son ch.' },
					{ text: 'maison', diagnosticFeedback: 'maison contient le son on.' }
				]
			},
			{
				words: ['rouge', 'ballon', 'oiseau', 'cheval'],
				colOu: ['rouge'],
				colOn: ['ballon'],
				colOi: ['oiseau'],
				colCh: ['cheval'],
				fillPrompt: 'Complète avec (ou / on / oi / ch) : une va....e  |  un p....sson  |  un m....ton',
				fillAnswer: 'une vache  |  un poisson  |  un mouton',
				mcqPrompt: 'Quel mot commence par le son « ch » ?',
				mcqCorrect: 'cheval',
				mcqDistractors: [
					{ text: 'rouge', diagnosticFeedback: 'rouge contient le son ou.' },
					{ text: 'ballon', diagnosticFeedback: 'ballon contient le son on.' },
					{ text: 'oiseau', diagnosticFeedback: 'oiseau commence par le son oi.' }
				]
			},
			{
				words: ['souris', 'bonbon', 'étoile', 'vache'],
				colOu: ['souris'],
				colOn: ['bonbon'],
				colOi: ['étoile'],
				colCh: ['vache'],
				fillPrompt: 'Complète avec (ou / on / oi / ch) : une mais....  |  un ....at  |  une p....re',
				fillAnswer: 'une maison  |  un chat  |  une poire',
				mcqPrompt: 'Quel mot contient le son « ou » ?',
				mcqCorrect: 'souris',
				mcqDistractors: [
					{ text: 'bonbon', diagnosticFeedback: 'bonbon contient le son on, pas ou.' },
					{ text: 'étoile', diagnosticFeedback: 'étoile contient le son oi.' },
					{ text: 'vache', diagnosticFeedback: 'vache contient le son ch.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.mcqCorrect, s.mcqDistractors, rng);

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: s.mcqPrompt,
			questionTextAr: 'اختر الكلمة الصحيحة حسب الصوت المركّب:',
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
			instruction: 'Fais les deux activités sur les sons complexes :',
			content: [
				{
					type: 'text',
					content: `#strong[Activité 1 :] Classe les mots dans le tableau selon le son : ( ${s.words.join(' - ')} )`
				},
				buildFrenchClassificationTableBlock({
					columns: [
						{ header: 'Son « ou »', items: s.colOu, mark: '0.5' },
						{ header: 'Son « on »', items: s.colOn, mark: '0.5' },
						{ header: 'Son « oi »', items: s.colOi, mark: '0.5' },
						{ header: 'Son « ch »', items: s.colCh, mark: '0.5' }
					]
				}),
				{
					type: 'text',
					content: `#strong[Activité 2 :] ${s.fillPrompt}`,
					answer: `#strong[Activité 2 :] ${s.fillAnswer}`,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'لاحظ الحرفين المركّبين داخل كل كلمة: ou أو on أو oi أو ch.',
				'لا تخلط بين «ou» (مثل poule) و«on» (مثل maison).',
				'انطق الكلمة بصوت واضح لتختار المقطع الناقص الصحيح.'
			],
			solutionStepsAr: [
				`تصنيف الأصوات: ou (${s.colOu[0]}) | on (${s.colOn[0]}) | oi (${s.colOi[0]}) | ch (${s.colCh[0]}).`,
				`إكمال الكلمات: ${s.fillAnswer}.`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Fonctionnement de la langue 2 (3 pts) — Féminin & Verbes être / avoir au présent
// ═══════════════════════════════════════════════════════════════════════════════
const langGenreEtreAvoir3apT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3ap_t2_lang_genre_etre_avoir',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'conjugaison_temps',
	titleAr: 'قواعد وتصريف: المؤنث وفعلا être و avoir في الحاضر',
	curriculumLessonId: 'fre_lesson_3ap_t2_genre_etre_avoir',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				femPrompt: 'un ami : une ............  |  un voisin : une ............',
				femAnswer: 'un ami : une amie  |  un voisin : une voisine',
				etrePrompt: 'Je ...... en 3AP.  |  Il ...... gentil.',
				etreAnswer: 'Je suis en 3AP.  |  Il est gentil.',
				avoirPrompt: "J'...... un chat.  |  Elle ...... une poule.",
				avoirAnswer: "J'ai un chat.  |  Elle a une poule.",
				mcqPrompt: 'Complète avec le verbe « être » au présent : « Elle ...... contente. »',
				mcqCorrect: 'est',
				mcqDistractors: [
					{ text: 'suis', diagnosticFeedback: 'suis va avec le pronom Je.' },
					{ text: 'es', diagnosticFeedback: 'es va avec le pronom Tu.' },
					{ text: 'a', diagnosticFeedback: 'a vient du verbe avoir, pas être.' }
				]
			},
			{
				femPrompt: 'un lapin : une ............  |  un cousin : une ............',
				femAnswer: 'un lapin : une lapine  |  un cousin : une cousine',
				etrePrompt: 'Tu ...... poli.  |  Elle ...... à la ferme.',
				etreAnswer: 'Tu es poli.  |  Elle est à la ferme.',
				avoirPrompt: 'Tu ...... un grand-père.  |  Il ...... un cheval.',
				avoirAnswer: 'Tu as un grand-père.  |  Il a un cheval.',
				mcqPrompt: 'Complète avec le verbe « avoir » au présent : « Tu ...... un joli lapin. »',
				mcqCorrect: 'as',
				mcqDistractors: [
					{ text: 'ai', diagnosticFeedback: "ai s'emploie avec J'." },
					{ text: 'a', diagnosticFeedback: "Avec Tu, on n'oublie pas le -s : Tu as." },
					{ text: 'es', diagnosticFeedback: 'es vient du verbe être.' }
				]
			},
			{
				femPrompt: 'le marchand : la ............  |  un ami : une ............',
				femAnswer: 'le marchand : la marchande  |  un ami : une amie',
				etrePrompt: 'Je ...... calme.  |  Le mouton ...... blanc.',
				etreAnswer: 'Je suis calme.  |  Le mouton est blanc.',
				avoirPrompt: "J'...... huit ans.  |  Sara ...... une sœur.",
				avoirAnswer: "J'ai huit ans.  |  Sara a une sœur.",
				mcqPrompt: 'Quel est le féminin de « un voisin » (جار) ?',
				mcqCorrect: 'une voisine',
				mcqDistractors: [
					{ text: 'un voisine', diagnosticFeedback: 'Il faut aussi changer un en une.' },
					{ text: 'une voisin', diagnosticFeedback: 'Il faut ajouter -e à la fin : voisine.' },
					{ text: 'le voisine', diagnosticFeedback: 'le est masculin.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.mcqCorrect, s.mcqDistractors, rng);

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: s.mcqPrompt,
			questionTextAr: 'اختر الإجابة الصحيحة في المؤنث وتصريف être و avoir:',
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
			instruction: 'Fais les trois exercices suivants :',
			content: [
				{
					type: 'text',
					content: `#strong[Activité 1 :] Mets au féminin (ajoute « -e ») :\n${s.femPrompt}`,
					answer: `#strong[Activité 1 :] ${s.femAnswer}`,
					mark: '1'
				},
				{
					type: 'text',
					content: `#strong[Activité 2 :] Complète avec le verbe « être » au présent (suis / es / est) :\n${s.etrePrompt}`,
					answer: `#strong[Activité 2 :] ${s.etreAnswer}`,
					mark: '1'
				},
				{
					type: 'text',
					content: `#strong[Activité 3 :] Complète avec le verbe « avoir » au présent (ai / as / a) :\n${s.avoirPrompt}`,
					answer: `#strong[Activité 3 :] ${s.avoirAnswer}`,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'لتحويل الاسم البسيط إلى المؤنث نغيّر un إلى une ونضيف الحرف -e في النهاية.',
				'فعل être في الحاضر: je suis, tu es, il/elle est.',
				"فعل avoir في الحاضر: j'ai, tu as, il/elle a."
			],
			solutionStepsAr: [
				`التأنيث: ${s.femAnswer}.`,
				`تصريف être: ${s.etreAnswer}.`,
				`تصريف avoir: ${s.avoirAnswer}.`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Production écrite (3 pts) — Présenter sa famille ou un animal de la ferme
// ═══════════════════════════════════════════════════════════════════════════════
const prodFamilleAnimal3apT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3ap_t2_prod_famille_animal',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'production_ecrite',
	titleAr: 'الوضعية الإدماجية: تقديم العائلة أو وصف حيوان من المزرعة',
	curriculumLessonId: 'fre_lesson_3ap_t2_famille',
	defaultPoints: 3,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const prompts = [
			{
				subject: 'ta famille',
				prompt: 'Écris 3 phrases simples pour présenter ta famille en utilisant la boîte à outils.',
				notes: [
					'Membres : mon père, ma mère, mon frère, ma sœur',
					'Verbes : est, a, aime',
					'Adjectifs : gentil, gentille, petite'
				],
				model: "Voici ma famille. Mon père est gentil et ma mère est douce. J'aime beaucoup ma petite sœur.",
				mcqQ: 'Quelle phrase présente correctement sa mère ?',
				mcqCorrect: 'Voici ma mère : elle est gentille.',
				mcqDistractors: [
					{ text: 'Voici mon mère : il est gentil.', diagnosticFeedback: 'mère est féminin : ma mère, elle est.' },
					{ text: 'Voici ma mère : elle a gentille.', diagnosticFeedback: 'Devant un adjectif (gentille), on utilise être (est).' },
					{ text: 'Mère ma voici gentille.', diagnosticFeedback: "L'ordre des mots est incorrect." }
				]
			},
			{
				subject: 'la vache de la ferme',
				prompt: 'Écris 3 phrases simples pour présenter la vache de la ferme à partir de la boîte à outils.',
				notes: [
					'Nom : La vache',
					'Verbes : est, mange, donne',
					'Mots utiles : un animal de la ferme, de l’herbe, du bon lait'
				],
				model: "La vache est un animal de la ferme. Elle mange de l'herbe verte. Elle donne du bon lait.",
				mcqQ: 'Quelle phrase est correcte pour décrire la vache ?',
				mcqCorrect: 'La vache donne du bon lait.',
				mcqDistractors: [
					{ text: 'La vache donne des œufs.', diagnosticFeedback: "C'est la poule qui donne des œufs." },
					{ text: 'Le vache est blanc.', diagnosticFeedback: 'vache est féminin : La vache.' },
					{ text: 'La vache suis grande.', diagnosticFeedback: 'Avec La vache (elle), on dit est.' }
				]
			},
			{
				subject: 'la poule de la ferme',
				prompt: 'Écris 3 phrases simples pour présenter la poule de la ferme avec la boîte à outils.',
				notes: [
					'Nom : La poule',
					'Verbes : est, picore, donne',
					'Mots utiles : un animal utile, du grain, des œufs frais'
				],
				model: 'La poule est un animal utile de la ferme. Elle picore du grain dans la cour. Elle donne des œufs frais.',
				mcqQ: 'Quelle phrase est juste pour décrire la poule ?',
				mcqCorrect: 'La poule donne des œufs frais.',
				mcqDistractors: [
					{ text: 'La poule donne de la laine.', diagnosticFeedback: "C'est le mouton qui donne de la laine." },
					{ text: 'Un poule est petit.', diagnosticFeedback: 'poule est féminin : Une poule est petite.' },
					{ text: 'La poule ai du grain.', diagnosticFeedback: 'Avec elle, on écrit a, pas ai.' }
				]
			}
		];

		const pr = rng.pick(prompts);
		const mcq = buildUniqueMcqOptions(pr.mcqCorrect, pr.mcqDistractors, rng);

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: pr.mcqQ,
			questionTextAr: 'اختر الجملة الصحيحة للاستعمال في الإنتاج الكتابي:',
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
						'Pertinence (1 pt), emploi correct de être/avoir et du vocabulaire (1 pt), majuscules et points (1 pt).',
					mark: '3'
				})
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'استعن بالكلمات والأفعال الموجودة في صندوق الكلمات (Boîte à outils).',
				'استعمل الجملة القصيرة: فاعل + فعل + مفعول.',
				'راجع الحرف الكبير في بداية كل جملة والنقطة في نهايتها.'
			],
			solutionStepsAr: [
				`اختيار كلمات صندوق الأدوات حول موضوع (${pr.subject}).`,
				'كتابة 3 جمل بسيطة وصحيحة.',
				`الفقرة النموذجية: ${pr.model}`
			],
			finalAnswer: pr.mcqCorrect
		};
	}
};

export const TEMPLATES_3AP_T2: FrenchParameterizedTemplate[] = [
	compFamille3apT2,
	compFerme3apT2,
	langSonsAnimaux3apT2,
	langGenreEtreAvoir3apT2,
	prodFamilleAnimal3apT2
];
