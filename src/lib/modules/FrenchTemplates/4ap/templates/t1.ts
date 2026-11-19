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
// 1. Compréhension 1 (4 pts) — C'est notre quartier ! (Situer sa maison)
// ═══════════════════════════════════════════════════════════════════════════════
const compQuartier4apT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4ap_t1_comp_quartier',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب: هذا حيّنا (تحديد موقع المنزل والمرافق)',
	curriculumLessonId: 'fre_lesson_4ap_t1_quartier',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const scenarios = [
			{
				title: 'Mon beau quartier à Constantine',
				pupil: 'Youssef',
				city: 'Constantine',
				opposite: 'la mosquée',
				beside: 'la boulangerie',
				paragraphs: [
					"Bonjour ! Je m'appelle [[Youssef]] et j'habite dans un quartier calme et propre à Constantine.",
					"Ma maison se trouve en face de [[la mosquée]] et à côté de la boulangerie. L'école primaire et la bibliothèque sont tout près de chez moi. J'aime beaucoup mon quartier !"
				],
				tf1Q: 'La maison de Youssef est en face de la mosquée.',
				tf1A: 'Vrai',
				tf2Q: "L'école primaire est loin de la maison de Youssef.",
				tf2A: 'Faux',
				tf2C: "L'école primaire est tout près de chez lui.",
				mcqQ: 'Où se trouve la maison de Youssef ?',
				mcqCorrect: 'En face de la mosquée',
				mcqWrong: [
					{ text: 'Loin de la mosquée', diagnosticFeedback: 'Le texte dit : en face de la mosquée.' },
					{ text: 'Dans une forêt', diagnosticFeedback: 'Youssef habite dans un quartier à Constantine.' },
					{ text: 'À côté de la gare', diagnosticFeedback: 'La gare ne figure pas dans le texte.' }
				]
			},
			{
				title: 'Le quartier de Meriem',
				pupil: 'Meriem',
				city: 'Blida',
				opposite: 'la bibliothèque',
				beside: 'le jardin public',
				paragraphs: [
					"Je suis [[Meriem]] et j'habite avec ma famille dans un joli quartier de la ville de Blida.",
					"Notre maison est en face de [[la bibliothèque]] et à côté du jardin public. Chaque matin, je vais à pied à l'école avec mon frère Bilal."
				],
				tf1Q: 'Meriem va à pied à l’école avec son frère.',
				tf1A: 'Vrai',
				tf2Q: 'Meriem habite à Annaba.',
				tf2A: 'Faux',
				tf2C: 'Meriem habite dans la ville de Blida.',
				mcqQ: 'Quel lieu se trouve juste à côté de la maison de Meriem ?',
				mcqCorrect: 'Le jardin public',
				mcqWrong: [
					{ text: 'La boulangerie', diagnosticFeedback: 'La boulangerie ne figure pas dans le texte.' },
					{ text: 'La poste', diagnosticFeedback: 'La poste ne figure pas dans ce texte.' },
					{ text: 'Le stade', diagnosticFeedback: 'Relis la première phrase du paragraphe 2 : à côté du jardin public.' }
				]
			},
			{
				title: 'Notre rue propre à Tlemcen',
				pupil: 'Karim',
				city: 'Tlemcen',
				opposite: "l'école",
				beside: 'la pharmacie',
				paragraphs: [
					"À Tlemcen, [[Karim]] habite dans une belle maison blanche au milieu d'un quartier tranquille.",
					"Sa maison est en face de [[l'école]] et à côté de la pharmacie. Les voisins nettoient la rue et arrosent les arbres près de la mosquée."
				],
				tf1Q: 'Les voisins nettoient la rue et arrosent les arbres.',
				tf1A: 'Vrai',
				tf2Q: 'La maison de Karim est loin de son école.',
				tf2A: 'Faux',
				tf2C: "Sa maison est juste en face de l'école.",
				mcqQ: 'Dans quelle ville habite Karim ?',
				mcqCorrect: 'Tlemcen',
				mcqWrong: [
					{ text: 'Blida', diagnosticFeedback: 'Le premier mot du texte indique : À Tlemcen.' },
					{ text: 'Oran', diagnosticFeedback: 'Oran ne figure pas dans le texte.' },
					{ text: 'Sétif', diagnosticFeedback: 'Relis le début du premier paragraphe.' }
				]
			}
		];

		const sc = rng.pick(scenarios);
		const mcq = buildUniqueMcqOptions(sc.mcqCorrect, sc.mcqWrong, rng);
		const plainText = sc.paragraphs.join(' ').replace(/\[\[|\]\]/g, '');

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `Lis le texte :\n« ${plainText} »\nQuestion : ${sc.mcqQ}`,
			questionTextAr: 'اقرأ النص واختر الإجابة الصحيحة حول الحيّ:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `بحسب النص، الإجابة الصحيحة هي: «${sc.mcqCorrect}».`
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
					headers: ['Prénom', 'Ville', 'En face de...', 'À côté de...'],
					cells: [],
					rows: [
						[
							{ content: '............', answer: sc.pupil, mark: '0.5' },
							{ content: '............', answer: sc.city, mark: '0.5' },
							{ content: '............', answer: sc.opposite, mark: '0.5' },
							{ content: '............', answer: sc.beside, mark: '0.5' }
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
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'استخرج اسم التلميذ واسم المدينة من الفقرة الأولى.',
				'ابحث عن مؤشرات المكان «en face de» و«à côté de» في الفقرة الثانية.',
				'تأكد من كل معلومة في سؤال Vrai / Faux بالرجوع إلى النص.'
			],
			solutionStepsAr: [
				`الجدول: Prénom = ${sc.pupil} | Ville = ${sc.city} | En face de = ${sc.opposite} | À côté de = ${sc.beside}.`,
				`صحيح أو خطأ: (a) ${sc.tf1A} — (b) ${sc.tf2A} (${sc.tf2C}).`
			],
			finalAnswer: sc.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Compréhension 2 (4 pts) — Les lieux utiles du quartier
// ═══════════════════════════════════════════════════════════════════════════════
const compBibliotheque4apT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4ap_t1_comp_bibliotheque',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب: مرافق حينا المفيدة (المكتبة والحديقة والمخبزة)',
	curriculumLessonId: 'fre_lesson_4ap_t1_quartier',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const scenarios = [
			{
				title: 'La bibliothèque de notre quartier',
				paragraphs: [
					"Dans notre quartier, il y a une grande [[bibliothèque]] près de l'école primaire. Elle est lumineuse et très calme.",
					"Chaque samedi matin, Amine et sa sœur Sara visitent la bibliothèque pour lire des livres scientifiques et emprunter de belles histoires."
				],
				qcm1Header: 'a) Où se trouve la bibliothèque ?',
				qcm1Options: ["Près de l'école primaire", 'Loin du quartier', 'Dans une ferme'],
				qcm1Correct: "Près de l'école primaire",
				qcm2Header: 'b) Quand Amine et Sara visitent-ils la bibliothèque ?',
				qcm2Options: ['Chaque samedi matin', 'Chaque soir', 'En hiver seulement'],
				qcm2Correct: 'Chaque samedi matin',
				tf1Q: 'La bibliothèque est calme et lumineuse.',
				tf1A: 'Vrai',
				tf2Q: 'Amine va à la bibliothèque pour acheter du pain.',
				tf2A: 'Faux',
				tf2C: 'Il va à la bibliothèque pour lire des livres et emprunter des histoires.',
				mcqQ: 'Pourquoi Amine et Sara vont-ils à la bibliothèque ?',
				mcqCorrect: 'Pour lire des livres et emprunter des histoires',
				mcqWrong: [
					{ text: 'Pour acheter du pain chaud', diagnosticFeedback: 'On achète le pain à la boulangerie.' },
					{ text: 'Pour jouer au football', diagnosticFeedback: 'La bibliothèque est un lieu calme pour lire.' },
					{ text: 'Pour cueillir des oranges', diagnosticFeedback: 'Relis la dernière phrase du texte.' }
				]
			},
			{
				title: 'La boulangerie du quartier',
				paragraphs: [
					"Très tôt le matin, une bonne odeur de pain chaud sort de [[la boulangerie]] située en face de la poste.",
					"Le boulanger, monsieur Ahmed, travaille avec sérieux. Il salue toujours ses voisins avec un grand sourire."
				],
				qcm1Header: 'a) Où est située la boulangerie ?',
				qcm1Options: ['En face de la poste', 'Loin du quartier', 'Dans la forêt'],
				qcm1Correct: 'En face de la poste',
				qcm2Header: 'b) Comment s’appelle le boulanger ?',
				qcm2Options: ['Monsieur Ahmed', 'Monsieur Karim', 'Monsieur Nabil'],
				qcm2Correct: 'Monsieur Ahmed',
				tf1Q: 'Monsieur Ahmed travaille avec sérieux.',
				tf1A: 'Vrai',
				tf2Q: 'La boulangerie vend des livres et des cahiers.',
				tf2A: 'Faux',
				tf2C: 'La boulangerie prépare et vend du pain chaud.',
				mcqQ: 'Que vend-on à la boulangerie de monsieur Ahmed ?',
				mcqCorrect: 'Du pain chaud',
				mcqWrong: [
					{ text: 'Des cahiers scolaires', diagnosticFeedback: 'On achète les cahiers à la librairie.' },
					{ text: 'Des médicaments', diagnosticFeedback: 'On achète les médicaments à la pharmacie.' },
					{ text: 'Des jouets', diagnosticFeedback: 'Le boulanger prépare du pain chaud.' }
				]
			},
			{
				title: 'Le jardin public de notre ville',
				paragraphs: [
					"Entre la mosquée et l'école, il y a un magnifique [[jardin public]] avec de grands arbres verts et des bancs propres.",
					"Les familles aiment marcher dans ses allées calmes. Les enfants respectent les fleurs et jettent leurs déchets dans les poubelles."
				],
				qcm1Header: 'a) Où se situe le jardin public ?',
				qcm1Options: ["Entre la mosquée et l'école", 'Loin de la ville', 'Dans la boulangerie'],
				qcm1Correct: "Entre la mosquée et l'école",
				qcm2Header: 'b) Que font les enfants pour garder le jardin propre ?',
				qcm2Options: [
					'Ils jettent leurs déchets dans les poubelles',
					'Ils coupent les fleurs',
					'Ils salissent les bancs'
				],
				qcm2Correct: 'Ils jettent leurs déchets dans les poubelles',
				tf1Q: 'Le jardin public a de grands arbres verts.',
				tf1A: 'Vrai',
				tf2Q: 'Les enfants arrachent les fleurs du jardin.',
				tf2A: 'Faux',
				tf2C: 'Les enfants respectent les fleurs.',
				mcqQ: 'Entre quels deux lieux se trouve le jardin public ?',
				mcqCorrect: "Entre la mosquée et l'école",
				mcqWrong: [
					{ text: 'Entre la poste et la mer', diagnosticFeedback: 'Relis la première phrase du texte.' },
					{ text: 'Entre la boulangerie et la gare', diagnosticFeedback: 'La gare ne figure pas dans le texte.' },
					{ text: 'Entre deux montagnes', diagnosticFeedback: 'Le texte dit : Entre la mosquée et l’école.' }
				]
			}
		];

		const sc = rng.pick(scenarios);
		const mcq = buildUniqueMcqOptions(sc.mcqCorrect, sc.mcqWrong, rng);
		const plainText = sc.paragraphs.join(' ').replace(/\[\[|\]\]/g, '');

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `Lis le texte :\n« ${plainText} »\nQuestion : ${sc.mcqQ}`,
			questionTextAr: 'اقرأ النص واختر الإجابة الصحيحة عن مرفق الحيّ:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `من النص نجد أن الإجابة الصحيحة هي: «${sc.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: "I. Compréhension de l'écrit",
			points: 4,
			instruction: 'Lis le texte, puis fais les deux activités suivantes :',
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
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'اقرأ النص جيداً وحدّد موقع المرفق المذكور.',
				'استخرج سبب زيارة الناس أو الأطفال لهذا المرفق.',
				'تحقق من كل معلومة قبل اختيار Vrai أو Faux.'
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
// 3. Fonctionnement de la langue 1 (3 pts) — Types de phrases, Noms propres/communs & Ponctuation
// ═══════════════════════════════════════════════════════════════════════════════
const langPhrasesNoms4apT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4ap_t1_lang_phrases_noms',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'grammaire_syntaxe',
	titleAr: 'قواعد: الجملة الخبرية والاستفهامية وأسماء العلم والجنس والترقيم',
	curriculumLessonId: 'fre_lesson_4ap_t1_types_phrases',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				words: ['Alger', 'mosquée', 'Youssef', 'jardin'],
				propres: ['Alger', 'Youssef'],
				communs: ['mosquée', 'jardin'],
				decl: 'Tu habites près de la bibliothèque.',
				interro: 'Est-ce que tu habites près de la bibliothèque ?',
				ponctPrompt: 'a) Où se trouve la poste ......  |  b) Quel beau quartier ......',
				ponctAnswer: 'a) Où se trouve la poste ?  |  b) Quel beau quartier !',
				mcqPrompt: 'Transforme en phrase interrogative avec « Est-ce que » : « Tu aimes ton quartier. »',
				mcqCorrect: 'Est-ce que tu aimes ton quartier ?',
				mcqDistractors: [
					{ text: 'Est-ce que tu aimes ton quartier.', diagnosticFeedback: 'La phrase interrogative se termine par un point d’interrogation (?).' },
					{ text: 'Tu est-ce que aimes ton quartier ?', diagnosticFeedback: 'Est-ce que se place au début de la phrase.' },
					{ text: 'Est-ce que aimes tu ton quartier ?', diagnosticFeedback: 'Avec Est-ce que, on garde le sujet avant le verbe.' }
				]
			},
			{
				words: ['Oran', 'boulangerie', 'Khadidja', 'école'],
				propres: ['Oran', 'Khadidja'],
				communs: ['boulangerie', 'école'],
				decl: 'Vous marchez vers la mosquée.',
				interro: 'Est-ce que vous marchez vers la mosquée ?',
				ponctPrompt: 'a) Comment tu t’appelles ......  |  b) Notre rue est très propre ......',
				ponctAnswer: "a) Comment tu t'appelles ?  |  b) Notre rue est très propre.",
				mcqPrompt: 'Quel mot est un NOM PROPRE (اسم علم) ?',
				mcqCorrect: 'Khadidja',
				mcqDistractors: [
					{ text: 'boulangerie', diagnosticFeedback: 'boulangerie est un nom commun.' },
					{ text: 'école', diagnosticFeedback: 'école est un nom commun.' },
					{ text: 'quartier', diagnosticFeedback: 'quartier est un nom commun.' }
				]
			},
			{
				words: ['Constantine', 'rue', 'Bilal', 'bibliothèque'],
				propres: ['Constantine', 'Bilal'],
				communs: ['rue', 'bibliothèque'],
				decl: 'Amine lit un livre calme.',
				interro: "Est-ce qu'Amine lit un livre calme ?",
				ponctPrompt: 'a) Où est la pharmacie ......  |  b) Quelle belle mosquée ......',
				ponctAnswer: 'a) Où est la pharmacie ?  |  b) Quelle belle mosquée !',
				mcqPrompt: 'Quel type de phrase est : « La bibliothèque est près de l’école. » ?',
				mcqCorrect: 'Une phrase déclarative',
				mcqDistractors: [
					{ text: 'Une phrase interrogative', diagnosticFeedback: 'Elle ne pose pas de question et se termine par un point (.).' },
					{ text: 'Une phrase exclamative', diagnosticFeedback: 'Elle ne se termine pas par un point d’exclamation (!).' },
					{ text: 'Une liste de mots', diagnosticFeedback: 'C’est une vraie phrase avec sujet, verbe et sens complet.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.mcqCorrect, s.mcqDistractors, rng);

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: s.mcqPrompt,
			questionTextAr: 'اختر الإجابة الصحيحة في أنواع الجمل والأسماء:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي: «${s.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'II. Fonctionnement de la langue',
			points: 3,
			instruction: 'Fais les trois exercices suivants :',
			content: [
				{
					type: 'text',
					content: `#strong[Activité 1 :] Classe les mots dans le tableau : ( ${s.words.join(' - ')} )`
				},
				buildFrenchClassificationTableBlock({
					columns: [
						{ header: 'Noms propres', items: s.propres, mark: '0.5' },
						{ header: 'Noms communs', items: s.communs, mark: '0.5' }
					]
				}),
				{
					type: 'text',
					content: `#strong[Activité 2 :] Transforme cette phrase déclarative en phrase interrogative avec « Est-ce que » :\n« ${s.decl} »`,
					answer: `#strong[Activité 2 :] ${s.interro}`,
					mark: '1'
				},
				{
					type: 'text',
					content: `#strong[Activité 3 :] Complète par le bon signe de ponctuation (. / ? / !) :\n${s.ponctPrompt}`,
					answer: `#strong[Activité 3 :] ${s.ponctAnswer}`,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'اسم العلم يخصّ شخصاً أو مدينة أو بلداً ويبدأ دائماً بحرف كبير.',
				"لتحويل جملة خبرية إلى استفهامية نضيف «Est-ce que» (أو «Est-ce qu'» قبل حرف متحرك) ونختم بـ (?)",
				'ضع (?) للسؤال، و(!) للتعجب، و(.) للجملة الخبرية.'
			],
			solutionStepsAr: [
				`تصنيف الأسماء: Noms propres (${s.propres.join(', ')}) — Noms communs (${s.communs.join(', ')}).`,
				`التحويل للاستفهام: ${s.interro}`,
				`الترقيم: ${s.ponctAnswer}`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Fonctionnement de la langue 2 (3 pts) — Pronoms sujets & 1er groupe au présent
// ═══════════════════════════════════════════════════════════════════════════════
const langPronomsVerbes4apT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4ap_t1_lang_pronoms_verbes1',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'conjugaison_temps',
	titleAr: 'تصريف: ضمائر الفاعل وأفعال الفوج الأول في الحاضر',
	curriculumLessonId: 'fre_lesson_4ap_t1_pronoms_verbes1',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				sub1: 'La maison est près du jardin.',
				sub1Ans: 'Elle est près du jardin.',
				sub2: 'Amine et Bilal aiment leur quartier.',
				sub2Ans: 'Ils aiment leur quartier.',
				conj1: 'Nous (habiter) ............ à Sétif.',
				conj1Ans: 'Nous habitons à Sétif.',
				conj2: 'Vous (marcher) ............ sur le trottoir.',
				conj2Ans: 'Vous marchez sur le trottoir.',
				conj3: 'Les filles (étudier) ............ à la bibliothèque.',
				conj3Ans: 'Les filles étudient à la bibliothèque.',
				mcqPrompt: 'Remplace le sujet par un pronom : « Sara et Ines aiment lire. »',
				mcqCorrect: 'Elles aiment lire.',
				mcqDistractors: [
					{ text: 'Elle aiment lire.', diagnosticFeedback: 'Il y a deux filles : c’est du pluriel (Elles).' },
					{ text: 'Ils aiment lire.', diagnosticFeedback: 'Sara et Ines sont deux noms féminins : on écrit Elles.' },
					{ text: 'Nous aimons lire.', diagnosticFeedback: 'Sara et Ines correspondent à la 3e personne du pluriel.' }
				]
			},
			{
				sub1: 'Le voisin nettoie le trottoir.',
				sub1Ans: 'Il nettoie le trottoir.',
				sub2: 'Sara et Meriem visitent la bibliothèque.',
				sub2Ans: 'Elles visitent la bibliothèque.',
				conj1: "J' (aimer) ............ mon école propre.",
				conj1Ans: "J'aime mon école propre.",
				conj2: 'Tu (habiter) ............ en face de la mosquée.',
				conj2Ans: 'Tu habites en face de la mosquée.',
				conj3: 'Nous (nettoyer) ............ la cour de l’école.',
				conj3Ans: "Nous nettoyons la cour de l'école.",
				mcqPrompt: 'Conjugue au présent : « Vous (habiter) ...... dans un quartier calme. »',
				mcqCorrect: 'habitez',
				mcqDistractors: [
					{ text: 'habite', diagnosticFeedback: 'habite s’emploie au singulier (je, il, elle).' },
					{ text: 'habitons', diagnosticFeedback: 'habitons s’emploie avec le pronom nous.' },
					{ text: 'habitent', diagnosticFeedback: 'habitent s’emploie avec ils ou elles.' }
				]
			},
			{
				sub1: 'La boulangerie ouvre le matin.',
				sub1Ans: 'Elle ouvre le matin.',
				sub2: 'Karim et sa sœur marchent ensemble.',
				sub2Ans: 'Ils marchent ensemble.',
				conj1: 'Tu (étudier) ............ tes leçons avec soin.',
				conj1Ans: 'Tu étudies tes leçons avec soin.',
				conj2: 'Nous (aimer) ............ notre belle ville.',
				conj2Ans: 'Nous aimons notre belle ville.',
				conj3: 'Les voisins (planter) ............ des arbres.',
				conj3Ans: 'Les voisins plantent des arbres.',
				mcqPrompt: 'Conjugue au présent : « Les voisins (planter) ...... des arbres dans la rue. »',
				mcqCorrect: 'plantent',
				mcqDistractors: [
					{ text: 'plante', diagnosticFeedback: 'Les voisins est au pluriel (Ils).' },
					{ text: 'plantes', diagnosticFeedback: 'plantes va avec le pronom tu.' },
					{ text: 'plantons', diagnosticFeedback: 'plantons va avec le pronom nous.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.mcqCorrect, s.mcqDistractors, rng);

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: s.mcqPrompt,
			questionTextAr: 'اختر الإجابة الصحيحة في ضمائر الفاعل وتصريف الفوج الأول:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي: «${s.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'II. Fonctionnement de la langue',
			points: 3,
			instruction: 'Fais les deux activités suivantes :',
			content: [
				{
					type: 'text',
					content: `#strong[Activité 1 :] Remplace le sujet par le pronom personnel convenable (Il / Elle / Ils / Elles) :\n1) ${s.sub1}\n2) ${s.sub2}`,
					answer: `#strong[Activité 1 :] 1) ${s.sub1Ans}  |  2) ${s.sub2Ans}`,
					mark: '1'
				},
				{
					type: 'text',
					content: `#strong[Activité 2 :] Conjugue les verbes entre parenthèses au présent de l'indicatif :\n1) ${s.conj1}\n2) ${s.conj2}\n3) ${s.conj3}`,
					answer: `#strong[Activité 2 :] 1) ${s.conj1Ans}  |  2) ${s.conj2Ans}  |  3) ${s.conj3Ans}`,
					mark: '2'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'مفرد مذكر -> Il | مفرد مؤنث -> Elle | جمع مذكر أو مختلط -> Ils | جمع مؤنث -> Elles.',
				'نحذف -er من مصدر الفوج الأول ونضيف: -e, -es, -e, -ons, -ez, -ent.',
				'انتبه للفاعل الجمع «Les voisins / Les filles» فإنه يأخذ النهاية -ent.'
			],
			solutionStepsAr: [
				`التعويض بالضمير: (1) ${s.sub1Ans} — (2) ${s.sub2Ans}.`,
				`التصريف: (1) ${s.conj1Ans} — (2) ${s.conj2Ans} — (3) ${s.conj3Ans}.`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Production écrite (3 pts) — Présenter son quartier et situer sa maison
// ═══════════════════════════════════════════════════════════════════════════════
const prodQuartier4apT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4ap_t1_prod_quartier',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'production_ecrite',
	titleAr: 'الوضعية الإدماجية: وصف حيّي وتحديد موقع منزلي',
	curriculumLessonId: 'fre_lesson_4ap_t1_quartier',
	defaultPoints: 3,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const prompts = [
			{
				city: 'Alger',
				prompt: 'Écris un petit paragraphe de 4 phrases pour présenter ton quartier et situer ta maison à ton ami qui vient te rendre visite.',
				notes: [
					'Lieux : la mosquée, la bibliothèque, la boulangerie, le jardin, l’école',
					'Indicateurs de lieu : près de, en face de, à côté de',
					'Verbes au présent : habiter, se trouver, aimer',
					'N’oublie pas les majuscules (noms propres) et la ponctuation (. / !).'
				],
				model: "J'habite dans un quartier calme et propre à Alger. Ma maison se trouve en face de la mosquée et à côté de la boulangerie. L'école et la bibliothèque sont tout près du jardin public. J'aime beaucoup notre quartier !",
				mcqQ: 'Quelle phrase situe correctement une maison dans un quartier ?',
				mcqCorrect: "Ma maison se trouve en face de la mosquée et près de l'école.",
				mcqDistractors: [
					{ text: 'Ma maison se trouve près de le jardin.', diagnosticFeedback: 'de + le devient toujours du : près du jardin.' },
					{ text: 'ma maison est à côté de la poste', diagnosticFeedback: 'Il manque la majuscule au début et le point final.' },
					{ text: 'Ma maison habitent près de la boulangerie.', diagnosticFeedback: 'Avec Ma maison (singulier), on dit est ou se trouve.' }
				]
			},
			{
				city: 'Oran',
				prompt: "Ton camarade veut emprunter un livre. Écris 4 phrases pour décrire ton quartier et indiquer où se trouve la bibliothèque.",
				notes: [
					'Lieux : notre quartier, la bibliothèque, la mosquée, le jardin',
					'Indicateurs : entre... et..., près de, en face de',
					'Verbes : se trouver, aimer, lire, respecter'
				],
				model: "Notre quartier à Oran est grand et accueillant. La bibliothèque se trouve entre la mosquée et le jardin public. Elle est juste en face de notre école primaire. Les élèves aiment y lire des livres utiles.",
				mcqQ: 'Choisis la phrase bien écrite avec un indicateur de lieu :',
				mcqCorrect: 'La bibliothèque se trouve près du jardin public.',
				mcqDistractors: [
					{ text: 'La bibliothèque se trouve près de le jardin.', diagnosticFeedback: 'On contracte de + le en du.' },
					{ text: 'la bibliothèque est en face de l’école', diagnosticFeedback: 'Il manque la majuscule et le point final.' },
					{ text: 'La bibliothèque trouvent près de la poste.', diagnosticFeedback: 'La bibliothèque est au singulier : se trouve.' }
				]
			},
			{
				city: 'Sétif',
				prompt: 'Écris 4 phrases pour décrire la propreté de ton quartier et les lieux importants qui entourent ta maison.',
				notes: [
					'Lieux : la maison, l’école, la boulangerie, le jardin',
					'Indicateurs : à côté de, près de, en face de',
					'Verbes au présent : habiter, nettoyer, planter, protéger'
				],
				model: "J'habite à Sétif dans un beau quartier très propre. Ma maison est à côté de l'école et en face d'un joli jardin. Chaque semaine, les voisins nettoient la rue et plantent des fleurs. Quel magnifique quartier !",
				mcqQ: 'Quelle phrase conjugue correctement le verbe au présent ?',
				mcqCorrect: 'Les voisins nettoient la rue et plantent des arbres.',
				mcqDistractors: [
					{ text: 'Les voisins nettoie la rue et plante des arbres.', diagnosticFeedback: 'Le sujet Les voisins est au pluriel : -ent.' },
					{ text: 'Les voisins nettoyons la rue.', diagnosticFeedback: '-ons est la terminaison de nous.' },
					{ text: 'les voisins nettoient la rue', diagnosticFeedback: 'Il manque la majuscule et le point.' }
				]
			}
		];

		const pr = rng.pick(prompts);
		const mcq = buildUniqueMcqOptions(pr.mcqCorrect, pr.mcqDistractors, rng);

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: pr.mcqQ,
			questionTextAr: 'اختر الجملة الصحيحة لكتابة فقرة عن حيّك:',
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
						'Pertinence et indicateurs de lieu (1 pt), conjugaison au présent (1 pt), noms propres, majuscules et ponctuation (1 pt).',
					mark: '3'
				})
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'ابدأ بتقديم حيّك ومدينتك بحرف كبير.',
				'استعمل مؤشرات المكان (en face de, à côté de, près du) لتحديد موقع بيتك.',
				'تأكد من تصريف أفعال الفوج الأول في الحاضر وعلامات الترقيم.'
			],
			solutionStepsAr: [
				'توظيف مرافق الحي ومؤشرات المكان من صندوق الأدوات.',
				'ربط 4 جمل بسيطة ومرتبة.',
				`الفقرة النموذجية: ${pr.model}`
			],
			finalAnswer: pr.mcqCorrect
		};
	}
};

export const TEMPLATES_4AP_T1: FrenchParameterizedTemplate[] = [
	compQuartier4apT1,
	compBibliotheque4apT1,
	langPhrasesNoms4apT1,
	langPronomsVerbes4apT1,
	prodQuartier4apT1
];
