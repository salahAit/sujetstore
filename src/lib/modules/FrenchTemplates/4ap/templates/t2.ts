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

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Compréhension 1 (4 pts) — L'Aïd El-Fitr et L'Aïd El-Adha (100% Halal)
// ═══════════════════════════════════════════════════════════════════════════════
const compAid4apT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4ap_t2_comp_aid',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب: عيد الفطر وعيد الأضحى المباركان',
	curriculumLessonId: 'fre_lesson_4ap_t2_fetes_partage',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const scenarios = [
			{
				title: "La joie de l'Aïd El-Fitr",
				fete: "L'Aïd El-Fitr",
				pupil: 'Anes',
				activity: 'La prière à la mosquée',
				sharing: 'Des gâteaux traditionnels',
				paragraphs: [
					"Après le mois béni de Ramadan, toute la famille d'[[Anes]] célèbre la belle fête de l'Aïd El-Fitr dans la joie.",
					"Très tôt le matin, Anes met ses habits neufs et accompagne son père à la mosquée pour [[la prière]]. Ensuite, ils visitent leurs grands-parents et partagent de délicieux gâteaux traditionnels avec les voisins. Aïd Moubarak !"
				],
				tf1Q: "L'Aïd El-Fitr arrive après le mois de Ramadan.",
				tf1A: 'Vrai',
				tf2Q: 'Anes reste seul à la maison le matin de l’Aïd.',
				tf2A: 'Faux',
				tf2C: 'Il accompagne son père à la mosquée puis visite ses grands-parents.',
				mcqQ: "Où va Anes très tôt le matin de l'Aïd El-Fitr ?",
				mcqCorrect: 'À la mosquée avec son père',
				mcqWrong: [
					{ text: 'À la plage avec ses amis', diagnosticFeedback: 'Le texte dit : accompagne son père à la mosquée.' },
					{ text: 'À la bibliothèque du quartier', diagnosticFeedback: 'Relis la première phrase du paragraphe 2.' },
					{ text: 'À la boulangerie', diagnosticFeedback: 'Le matin de l’Aïd, il va à la mosquée pour la prière.' }
				]
			},
			{
				title: "L'Aïd El-Adha : fête du partage",
				fete: "L'Aïd El-Adha",
				pupil: 'Sara',
				activity: 'Visiter la famille',
				sharing: 'Partager avec les pauvres',
				paragraphs: [
					"Le jour de [[l'Aïd El-Adha]], la maison de Sara à Sétif est remplie de paix et de fraternité.",
					"Après la prière de l'Aïd, le père de Sara prépare le partage pour les proches et les [[pauvres]]. Sara aide sa mère et félicite ses oncles et ses grands-parents. Quelle fête de solidarité !"
				],
				tf1Q: "L'Aïd El-Adha est une fête de solidarité et de partage.",
				tf1A: 'Vrai',
				tf2Q: "La famille de Sara oublie les pauvres le jour de l'Aïd.",
				tf2A: 'Faux',
				tf2C: 'Le père de Sara prépare le partage pour les proches et les pauvres.',
				mcqQ: "Quelle grande valeur islamique est mise en avant lors de l'Aïd El-Adha dans le texte ?",
				mcqCorrect: 'La solidarité et le partage',
				mcqWrong: [
					{ text: 'Le gaspillage', diagnosticFeedback: 'Le texte parle de solidarité et de partage.' },
					{ text: 'La tristesse', diagnosticFeedback: 'La maison est remplie de paix et de fraternité.' },
					{ text: 'La solitude', diagnosticFeedback: 'La famille se visite et partage avec les proches et les pauvres.' }
				]
			},
			{
				title: 'Les préparatifs de l’Aïd chez Bilal',
				fete: "L'Aïd El-Fitr",
				pupil: 'Bilal',
				activity: 'Préparer les gâteaux',
				sharing: 'Offrir un plateau aux voisins',
				paragraphs: [
					"À Oran, la veille de [[l'Aïd El-Fitr]], la mère de Bilal prépare du makrout et des gâteaux au miel.",
					"Bilal choisit sa tenue propre pour la prière du matin. Il offre un joli plateau de [[gâteaux]] à sa voisine âgée. Tout le quartier est heureux !"
				],
				tf1Q: 'La mère de Bilal prépare du makrout et des gâteaux au miel.',
				tf1A: 'Vrai',
				tf2Q: 'Bilal garde tous les gâteaux pour lui seul.',
				tf2A: 'Faux',
				tf2C: 'Bilal offre un joli plateau de gâteaux à sa voisine âgée.',
				mcqQ: 'À qui Bilal offre-t-il un plateau de gâteaux ?',
				mcqCorrect: 'À sa voisine âgée',
				mcqWrong: [
					{ text: 'Au boulanger', diagnosticFeedback: 'Le texte dit : à sa voisine âgée.' },
					{ text: 'À son directeur', diagnosticFeedback: 'Relis la deuxième phrase du paragraphe 2.' },
					{ text: 'Au berger', diagnosticFeedback: 'Il offre les gâteaux à sa voisine âgée.' }
				]
			}
		];

		const sc = rng.pick(scenarios);
		const mcq = buildUniqueMcqOptions(sc.mcqCorrect, sc.mcqWrong, rng);
		const plainText = sc.paragraphs.join(' ').replace(/\[\[|\]\]/g, '');

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `Lis le texte :\n« ${plainText} »\nQuestion : ${sc.mcqQ}`,
			questionTextAr: 'اقرأ النص واختر الإجابة الصحيحة حول عيد الفطر أو عيد الأضحى:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `من النص نستنتج أن الإجابة الصحيحة هي: «${sc.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: "I. Compréhension de l'écrit",
			points: 4,
			instruction: 'Lis le texte avec attention, puis réponds aux questions :',
			content: [
				buildFrenchPassageBlock({
					title: sc.title,
					paragraphs: sc.paragraphs,
					numberedParagraphs: false
				}),
				buildIllustratedFigureBlock('pri_lang_08_birthday_cake_party', {
					lang: 'fr',
					title: 'La joie des fêtes et du partage : gâteaux, ballons et cadeaux',
					maxHeight: 108,
					width: '58%'
				}),
				{
					type: 'text',
					content: '#strong[1)] Complète le tableau à partir du texte :'
				},
				{
					type: 'table',
					headers: ['Fête célébrée', 'Prénom', 'Action du matin', 'Geste de partage'],
					cells: [],
					rows: [
						[
							{ content: '............', answer: sc.fete, mark: '0.5' },
							{ content: '............', answer: sc.pupil, mark: '0.5' },
							{ content: '............', answer: sc.activity, mark: '0.5' },
							{ content: '............', answer: sc.sharing, mark: '0.5' }
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
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'استخرج اسم العيد واسم التلميذ من الفقرة الأولى.',
				'ابحث عن الأعمال الخيرية ومظاهر التضامن والمشاركة في الفقرة الثانية.',
				'راجع الجملتين في سؤال Vrai / Faux بعناية.'
			],
			solutionStepsAr: [
				`الجدول: Fête = ${sc.fete} | Prénom = ${sc.pupil} | Action = ${sc.activity} | Partage = ${sc.sharing}.`,
				`صحيح أو خطأ: (a) ${sc.tf1A} — (b) ${sc.tf2A} (${sc.tf2C}).`
			],
			finalAnswer: sc.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Compréhension 2 (4 pts) — Yaoum El-Ilm (16 Avril) & La fête de la réussite scolaire
// ═══════════════════════════════════════════════════════════════════════════════
const compScienceReussite4apT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4ap_t2_comp_science_reussite',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب: يوم العلم (16 أفريل) وحفل النجاح المدرسي',
	curriculumLessonId: 'fre_lesson_4ap_t2_fetes_partage',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const scenarios = [
			{
				title: 'Yaoum El-Ilm : la journée du savoir',
				paragraphs: [
					"Chaque année, le [[16 Avril]], les écoles algériennes célèbrent Yaoum El-Ilm en hommage au grand savant Cheikh Abdelhamid Ben Badis.",
					"Dans notre école à Constantine, les élèves organisent un concours de lecture et une exposition de [[livres]]. Le directeur félicite les meilleurs lecteurs et leur offre de beaux dictionnaires."
				],
				qcm1Header: 'a) Quelle est la date de Yaoum El-Ilm ?',
				qcm1Options: ['Le 16 Avril', 'Le 1er Janvier', 'Le 20 Août'],
				qcm1Correct: 'Le 16 Avril',
				qcm2Header: 'b) Que reçoit chaque meilleur lecteur ?',
				qcm2Options: ['Un beau dictionnaire', 'Un ballon', 'Un cartable noir'],
				qcm2Correct: 'Un beau dictionnaire',
				tf1Q: 'Yaoum El-Ilm rend hommage à Cheikh Abdelhamid Ben Badis.',
				tf1A: 'Vrai',
				tf2Q: 'Les élèves organisent une course de vélos.',
				tf2A: 'Faux',
				tf2C: 'Ils organisent un concours de lecture et une exposition de livres.',
				mcqQ: 'En hommage à quel grand savant algérien célèbre-t-on le 16 Avril ?',
				mcqCorrect: 'Cheikh Abdelhamid Ben Badis',
				mcqWrong: [
					{ text: 'Un voyageur étranger', diagnosticFeedback: 'Relis la première phrase du texte.' },
					{ text: 'Un boulanger du quartier', diagnosticFeedback: 'Le texte nomme Cheikh Abdelhamid Ben Badis.' },
					{ text: 'Un marin de Béjaïa', diagnosticFeedback: 'Le 16 Avril rend hommage à Cheikh Abdelhamid Ben Badis.' }
				]
			},
			{
				title: 'La fête de la réussite scolaire',
				paragraphs: [
					"En fin de trimestre, notre école à Tlemcen organise une belle fête de la [[réussite scolaire]] pour encourager les élèves sérieux.",
					"Khadidja est la première de sa classe de 4AP. Ses parents sont très fiers d'elle. La maîtresse lui remet un [[diplôme]] d'encouragement et une collection de livres utiles."
				],
				qcm1Header: 'a) Quelle fête organise l’école de Khadidja ?',
				qcm1Options: ['La fête de la réussite scolaire', 'Une sortie à la ferme', 'Un voyage en mer'],
				qcm1Correct: 'La fête de la réussite scolaire',
				qcm2Header: 'b) Que remet la maîtresse à Khadidja ?',
				qcm2Options: ['Un diplôme et des livres utiles', 'Des carottes et des pommes', 'Des crayons de couleur seulement'],
				qcm2Correct: 'Un diplôme et des livres utiles',
				tf1Q: 'Khadidja est la première de sa classe de 4AP.',
				tf1A: 'Vrai',
				tf2Q: 'Les parents de Khadidja sont tristes.',
				tf2A: 'Faux',
				tf2C: "Ses parents sont très fiers d'elle.",
				mcqQ: 'Pourquoi la maîtresse félicite-t-elle Khadidja ?',
				mcqCorrect: 'Parce qu’elle est la première de sa classe',
				mcqWrong: [
					{ text: 'Parce qu’elle arrive en retard', diagnosticFeedback: 'Khadidja est une élève sérieuse et la première de sa classe.' },
					{ text: 'Parce qu’elle a un grand jardin', diagnosticFeedback: 'Relis la première phrase du paragraphe 2.' },
					{ text: 'Parce qu’elle habite à Alger', diagnosticFeedback: 'Elle habite à Tlemcen et est la première de sa classe.' }
				]
			},
			{
				title: 'Un concours de lecture le 16 Avril',
				paragraphs: [
					"Pour Yaoum El-Ilm, le [[16 Avril]], les élèves de 4AP préparent de belles affiches sur l'importance de la science et de la lecture.",
					"Youssef choisit un texte sur les savants musulmans. Il finit sa lecture avec une voix claire et réussit le concours. Tous ses camarades le [[félicitent]] !"
				],
				qcm1Header: 'a) Sur quoi portent les affiches des élèves ?',
				qcm1Options: ["L'importance de la science et de la lecture", 'Les saisons de la campagne', 'Les animaux domestiques'],
				qcm1Correct: "L'importance de la science et de la lecture",
				qcm2Header: 'b) Comment Youssef lit-il son texte ?',
				qcm2Options: ['Avec une voix claire', 'Très vite sans ponctuation', 'À voix basse'],
				qcm2Correct: 'Avec une voix claire',
				tf1Q: 'Youssef réussit le concours de lecture.',
				tf1A: 'Vrai',
				tf2Q: 'Ses camarades ne le félicitent pas.',
				tf2A: 'Faux',
				tf2C: 'Tous ses camarades le félicitent.',
				mcqQ: 'Quel sujet Youssef choisit-il pour le concours de Yaoum El-Ilm ?',
				mcqCorrect: 'Les savants musulmans',
				mcqWrong: [
					{ text: 'Les animaux de la ferme', diagnosticFeedback: 'Le texte dit : un texte sur les savants musulmans.' },
					{ text: 'Les fruits du printemps', diagnosticFeedback: 'Relis la première phrase du paragraphe 2.' },
					{ text: 'La boulangerie du quartier', diagnosticFeedback: 'Youssef choisit un texte sur les savants musulmans.' }
				]
			}
		];

		const sc = rng.pick(scenarios);
		const mcq = buildUniqueMcqOptions(sc.mcqCorrect, sc.mcqWrong, rng);
		const plainText = sc.paragraphs.join(' ').replace(/\[\[|\]\]/g, '');

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `Lis le texte :\n« ${plainText} »\nQuestion : ${sc.mcqQ}`,
			questionTextAr: 'اقرأ النص واختر الإجابة الصحيحة حول يوم العلم أو حفل النجاح:',
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
			instruction: 'Lis le texte, puis réponds aux questions suivantes :',
			content: [
				buildFrenchPassageBlock({
					title: sc.title,
					paragraphs: sc.paragraphs,
					numberedParagraphs: false
				}),
				buildIllustratedFigureBlock('pri_ara_07_science_library_telescope', {
					lang: 'fr',
					title: 'Yaoum El-Ilm (16 Avril) : la lecture, le savoir et la réussite',
					customLegend: [
						{ num: '1', label: 'Les livres utiles, la loupe et le globe terrestre' },
						{ num: '2', label: 'Le télescope et la recherche scientifique' }
					],
					maxHeight: 108,
					width: '58%'
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
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'اقرأ النص وحدّد المناسبة التربوية وتاريخها.',
				'استخرج الجوائز أو الأنشطة التي نُظّمت في المدرسة.',
				'تحقق من كل عبارة قبل الإجابة بـ Vrai أو Faux.'
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
// 3. Fonctionnement de la langue 1 (3 pts) — Possessifs & Féminin (-e, -er/-ère)
// ═══════════════════════════════════════════════════════════════════════════════
const langPossessifsFeminin4apT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4ap_t2_lang_possessifs_feminin',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'orthographe_accords',
	titleAr: 'قواعد وإملاء: صفات الملكية وتأنيث الأسماء والصفات (-e و -er/-ère)',
	curriculumLessonId: 'fre_lesson_4ap_t2_possessifs',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				posPrompt: 'Je prépare ...... habit (m.), ...... famille (f.) et ...... cadeaux (pl.).',
				posAnswer: 'Je prépare mon habit, ma famille et mes cadeaux.',
				femPrompt: '1) un petit écolier : une ........................  |  2) le premier voisin : la ........................',
				femAnswer: '1) une petite écolière  |  2) la première voisine',
				mcqPrompt: 'Quel est le féminin de « un boulanger content » ?',
				mcqCorrect: 'une boulangère contente',
				mcqDistractors: [
					{ text: 'une boulangere content', diagnosticFeedback: 'Il faut l’accent grave sur è et ajouter -e à content.' },
					{ text: 'un boulangère contente', diagnosticFeedback: 'un devient une au féminin.' },
					{ text: 'une boulanger contente', diagnosticFeedback: 'Les noms en -er deviennent -ère au féminin.' }
				]
			},
			{
				posPrompt: 'Sara visite ...... oncle (m.), ...... grand-mère (f.) et ...... amies (pl.).',
				posAnswer: 'Sara visite son oncle, sa grand-mère et ses amies.',
				femPrompt: '1) un élève calme : une ........................  |  2) un sac léger : une tenue ........................',
				femAnswer: '1) une élève calme  |  2) une tenue légère',
				mcqPrompt: 'Complète correctement : « Le jour de Yaoum El-Ilm, j’aime ...... école. »',
				mcqCorrect: 'mon école',
				mcqDistractors: [
					{ text: 'ma école', diagnosticFeedback: 'Devant une voyelle (é), ma devient toujours mon.' },
					{ text: 'mes école', diagnosticFeedback: 'école est au singulier.' },
					{ text: 'sa école', diagnosticFeedback: 'Le sujet est je et école commence par une voyelle.' }
				]
			},
			{
				posPrompt: 'Tu ranges ...... cahier (m.), ...... trousse (f.) et ...... livres (pl.).',
				posAnswer: 'Tu ranges ton cahier, ta trousse et tes livres.',
				femPrompt: '1) le dernier écolier : la ........................  |  2) un grand jardin : une ........................ maison',
				femAnswer: '1) la dernière écolière  |  2) une grande maison',
				mcqPrompt: 'Complète avec le bon déterminant possessif : « Amine félicite ...... parents. »',
				mcqCorrect: 'ses parents',
				mcqDistractors: [
					{ text: 'son parents', diagnosticFeedback: 'parents est au pluriel : on utilise ses.' },
					{ text: 'sa parents', diagnosticFeedback: 'sa est au singulier féminin.' },
					{ text: 'mes parents', diagnosticFeedback: 'Le sujet est Amine (il), pas je.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.mcqCorrect, s.mcqDistractors, rng);

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: s.mcqPrompt,
			questionTextAr: 'اختر الإجابة الصحيحة في صفات الملكية والتأنيث:',
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
					content: `#strong[Activité 1 :] Complète avec le déterminant possessif qui convient (mon, ma, mes / ton, ta, tes / son, sa, ses) :\n${s.posPrompt}`,
					answer: `#strong[Activité 1 :] ${s.posAnswer}`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `#strong[Activité 2 :] Mets au féminin les groupes de mots suivants :\n${s.femPrompt}`,
					answer: `#strong[Activité 2 :] ${s.femAnswer}`,
					mark: '1.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'صفات الملكية تتبع الفاعل (je -> mon/ma/mes، tu -> ton/ta/tes، il/elle -> son/sa/ses) وتتطابق مع الاسم.',
				'للتأنيث نضيف -e عموماً، والكلمات المنتهية بـ -er تتحول إلى -ère (مع è).',
				'الكلمات المنتهية أصلاً بـ -e مثل élève و calme لا تتغير في المؤنث.'
			],
			solutionStepsAr: [
				`صفات الملكية: ${s.posAnswer}`,
				`التأنيث: ${s.femAnswer}`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Fonctionnement de la langue 2 (3 pts) — Présent : être, avoir et 2e groupe
// ═══════════════════════════════════════════════════════════════════════════════
const langPresent2g4apT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4ap_t2_lang_present_etre_avoir_2g',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'conjugaison_temps',
	titleAr: 'تصريف: فعلا être و avoir وأفعال الفوج الثاني في الحاضر',
	curriculumLessonId: 'fre_lesson_4ap_t2_present_etre_avoir_2g',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				ea1: "Nous (être) ............ heureux le jour de l'Aïd.",
				ea1Ans: "Nous sommes heureux le jour de l'Aïd.",
				ea2: 'Les enfants (avoir) ............ de beaux habits.',
				ea2Ans: 'Les enfants ont de beaux habits.',
				g21: 'Je (finir) ............ mes devoirs.',
				g21Ans: 'Je finis mes devoirs.',
				g22: 'Vous (choisir) ............ un livre utile.',
				g22Ans: 'Vous choisissez un livre utile.',
				g23: 'Les élèves (réussir) ............ leur examen.',
				g23Ans: 'Les élèves réussissent leur examen.',
				mcqPrompt: 'Conjugue au présent (2e groupe) : « Nous (réussir) ...... grâce au travail. »',
				mcqCorrect: 'réussissons',
				mcqDistractors: [
					{ text: 'réussisons', diagnosticFeedback: 'Les verbes du 2e groupe prennent toujours deux s (-issons) au pluriel !' },
					{ text: 'réussit', diagnosticFeedback: 'réussit s’emploie avec il ou elle.' },
					{ text: 'réussissez', diagnosticFeedback: 'réussissez s’emploie avec vous.' }
				]
			},
			{
				ea1: 'Vous (être) ............ fiers de votre réussite.',
				ea1Ans: 'Vous êtes fiers de votre réussite.',
				ea2: 'Nous (avoir) ............ des gâteaux au miel.',
				ea2Ans: 'Nous avons des gâteaux au miel.',
				g21: 'Tu (choisir) ............ un joli dictionnaire.',
				g21Ans: 'Tu choisis un joli dictionnaire.',
				g22: 'Elle (finir) ............ sa lecture à haute voix.',
				g22Ans: 'Elle finit sa lecture à haute voix.',
				g23: 'Nous (grandir) ............ vite.',
				g23Ans: 'Nous grandissons vite.',
				mcqPrompt: 'Conjugue « être » au présent : « Les parents (être) ...... fiers de leurs enfants. »',
				mcqCorrect: 'sont',
				mcqDistractors: [
					{ text: 'ont', diagnosticFeedback: 'ont vient du verbe avoir, pas être.' },
					{ text: 'sommes', diagnosticFeedback: 'sommes va avec le pronom nous.' },
					{ text: 'êtes', diagnosticFeedback: 'êtes va avec le pronom vous.' }
				]
			},
			{
				ea1: 'Ils (être) ............ solidaires avec les pauvres.',
				ea1Ans: 'Ils sont solidaires avec les pauvres.',
				ea2: 'Vous (avoir) ............ un beau diplôme.',
				ea2Ans: 'Vous avez un beau diplôme.',
				g21: 'Il (réussir) ............ le concours du 16 Avril.',
				g21Ans: 'Il réussit le concours du 16 Avril.',
				g22: 'Nous (finir) ............ la préparation de la fête.',
				g22Ans: 'Nous finissons la préparation de la fête.',
				g23: 'Elles (choisir) ............ de bons livres.',
				g23Ans: 'Elles choisissent de bons livres.',
				mcqPrompt: 'Conjugue au présent (2e groupe) : « Elles (choisir) ...... de beaux livres. »',
				mcqCorrect: 'choisissent',
				mcqDistractors: [
					{ text: 'choisit', diagnosticFeedback: 'choisit est au singulier (il/elle).' },
					{ text: 'choisissez', diagnosticFeedback: 'choisissez va avec le pronom vous.' },
					{ text: 'choisent', diagnosticFeedback: 'N’oublie pas -iss- : choisissent.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.mcqCorrect, s.mcqDistractors, rng);

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: s.mcqPrompt,
			questionTextAr: 'اختر التصريف الصحيح في الحاضر:',
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
			instruction: 'Conjugue les verbes au présent de l’indicatif :',
			content: [
				buildIllustratedFigureBlock('pri_ara_05_fresh_fruits_honey_basket', {
					lang: 'fr',
					title: "L'alimentation saine et le partage : fruits frais et miel pur",
					customLegend: [
						{ num: '1', label: 'Un panier de fruits et légumes frais' },
						{ num: '2', label: "Le miel pur et l'huile d'olive naturelle" }
					],
					maxHeight: 104,
					width: '56%'
				}),
				{
					type: 'text',
					content: `#strong[Activité 1 :] Conjugue « être » ou « avoir » au présent :\n1) ${s.ea1}\n2) ${s.ea2}`,
					answer: `#strong[Activité 1 :] 1) ${s.ea1Ans}  |  2) ${s.ea2Ans}`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `#strong[Activité 2 :] Conjugue ces verbes du 2e groupe au présent :\n1) ${s.g21}\n2) ${s.g22}\n3) ${s.g23}`,
					answer: `#strong[Activité 2 :] 1) ${s.g21Ans}  |  2) ${s.g22Ans}  |  3) ${s.g23Ans}`,
					mark: '1.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'être في الجمع: nous sommes, vous êtes, ils/elles sont — avoir: nous avons, vous avez, ils/elles ont.',
				'نهايات الفوج الثاني (-ir): -is, -is, -it, -issons, -issez, -issent.',
				'لا تنسَ حرفي -ss- في الجمع مع أفعال الفوج الثاني!'
			],
			solutionStepsAr: [
				`être / avoir: (1) ${s.ea1Ans} — (2) ${s.ea2Ans}.`,
				`الفوج الثاني: (1) ${s.g21Ans} — (2) ${s.g22Ans} — (3) ${s.g23Ans}.`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Production écrite (3 pts) — Raconter une belle fête algérienne / islamique (100% Halal)
// ═══════════════════════════════════════════════════════════════════════════════
const prodFeteIslamique4apT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4ap_t2_prod_fete_islamique',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'production_ecrite',
	titleAr: 'الوضعية الإدماجية: الحديث عن عيد الفطر أو الأضحى أو يوم العلم',
	curriculumLessonId: 'fre_lesson_4ap_t2_fetes_partage',
	defaultPoints: 3,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const prompts = [
			{
				prompt: "Écris 4 phrases simples pour raconter comment ta famille célèbre l'Aïd El-Fitr en utilisant la boîte à outils.",
				notes: [
					'Noms : la prière, la mosquée, mes habits neufs, les gâteaux traditionnels, ma famille',
					'Verbes au présent : célébrer, aller, visiter, partager, féliciter',
					'Utilise les déterminants possessifs (mon, ma, mes) et une belle formule : Aïd Moubarak !'
				],
				model: "Après Ramadan, ma famille célèbre l'Aïd El-Fitr dans la joie. Le matin, je mets mes habits neufs et je vais à la mosquée pour la prière. Ensuite, nous visitons mes grands-parents et nous partageons de bons gâteaux traditionnels. Aïd Moubarak à tous !",
				mcqQ: "Quelle phrase raconte correctement la fête de l'Aïd El-Fitr ?",
				mcqCorrect: "Le matin de l'Aïd, nous allons à la mosquée et nous partageons des gâteaux.",
				mcqDistractors: [
					{ text: "Le matin de l'Aïd, nous partage des gâteaux.", diagnosticFeedback: 'Avec nous, le verbe partager s’écrit partageons.' },
					{ text: "Je porte ma habit neuf le jour de l'Aïd.", diagnosticFeedback: 'habit est masculin : mon habit neuf.' },
					{ text: "Les enfants sont un gâteau.", diagnosticFeedback: 'Pour la possession, on utilise avoir (ont), pas être.' }
				]
			},
			{
				prompt: 'Écris 4 phrases pour raconter comment votre école célèbre Yaoum El-Ilm (le 16 Avril) avec la boîte à outils.',
				notes: [
					'Noms : Yaoum El-Ilm, le 16 Avril, Cheikh Abdelhamid Ben Badis, des livres, un concours de lecture',
					'Verbes au présent : célébrer, organiser, choisir, réussir, féliciter',
					'Pense aux majuscules et à la ponctuation.'
				],
				model: "Le 16 Avril, notre école célèbre Yaoum El-Ilm en hommage à Cheikh Abdelhamid Ben Badis. Les élèves organisent une exposition de livres et un concours de lecture. Je choisis un beau texte scientifique. Nos maîtres nous félicitent pour notre réussite !",
				mcqQ: 'Quelle phrase est correctement écrite pour Yaoum El-Ilm ?',
				mcqCorrect: 'Le 16 Avril, les élèves choisissent de beaux livres et réussissent le concours.',
				mcqDistractors: [
					{ text: 'Le 16 Avril, les élèves choisit des livres.', diagnosticFeedback: 'Les élèves est au pluriel : choisissent.' },
					{ text: 'Le 16 Avril, nous réussisons le concours.', diagnosticFeedback: 'Avec nous, le 2e groupe prend deux s : réussissons.' },
					{ text: 'le 16 avril les élèves lit un livre', diagnosticFeedback: 'Majuscule, conjugaison (lisent) et point manquent.' }
				]
			},
			{
				prompt: "Écris 4 phrases pour décrire la fête de la réussite scolaire à la fin de l'année dans ton école.",
				notes: [
					'Noms : la fête de la réussite, les parents, le directeur, un diplôme, des livres',
					'Verbes au présent : être, avoir, féliciter, offrir, réussir',
					'Adjectifs : fiers, contente, première, utiles'
				],
				model: "À la fin de l'année, mon école organise la fête de la réussite scolaire. Les élèves sérieux réussissent et ont de bonnes notes. Le directeur offre des diplômes et des livres utiles aux meilleurs élèves. Nos parents sont très fiers de nous !",
				mcqQ: 'Quelle phrase emploie correctement « être » et l’accord au féminin ?',
				mcqCorrect: 'Sara est la première de sa classe et sa mère est très contente.',
				mcqDistractors: [
					{ text: 'Sara est le premier de sa classe et sa mère est content.', diagnosticFeedback: 'Au féminin : la première, contente.' },
					{ text: 'Sara a la première de sa classe.', diagnosticFeedback: 'On emploie être (est), pas avoir.' },
					{ text: 'Les parents est fiers de leurs enfants.', diagnosticFeedback: 'Les parents est au pluriel : sont fiers.' }
				]
			}
		];

		const pr = rng.pick(prompts);
		const mcq = buildUniqueMcqOptions(pr.mcqCorrect, pr.mcqDistractors, rng);

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: pr.mcqQ,
			questionTextAr: 'اختر الجملة الصحيحة لكتابة فقرة عن المناسبة السعيدة:',
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
						'Respect du sujet et du vocabulaire (1 pt), présent de être/avoir/2e groupe et possessifs (1 pt), orthographe et ponctuation (1 pt).',
					mark: '3'
				})
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'استعمل الكلمات والأفعال المقترحة في صندوق الأدوات.',
				'احرص على تصريف أفعال الحاضر (être / avoir / الفوج الثاني) بدقة.',
				'لا تنسَ صفات الملكية والحروف الكبيرة وعلامات الترقيم.'
			],
			solutionStepsAr: [
				'توظيف رصيد العيد أو يوم العلم أو حفل النجاح.',
				'كتابة 4 جمل مترابطة وواضحة.',
				`الفقرة النموذجية: ${pr.model}`
			],
			finalAnswer: pr.mcqCorrect
		};
	}
};

export const TEMPLATES_4AP_T2: FrenchParameterizedTemplate[] = [
	compAid4apT2,
	compScienceReussite4apT2,
	langPossessifsFeminin4apT2,
	langPresent2g4apT2,
	prodFeteIslamique4apT2
];
