import type {
	Difficulty,
	FrenchGeneratedExerciseInstance,
	FrenchParameterizedTemplate
} from '../../types';
import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildFrenchClassificationTableBlock,
	buildFrenchPassageBlock,
	buildFrenchWrittenProductionBlock
} from '../../french-helpers';

// ═══════════════════════════════════════════════════════════════════════════════
// Template 1 : Compréhension de l'écrit (07 pts) — Hygiène & Propreté
// ═══════════════════════════════════════════════════════════════════════════════
const comp1amT1Hygiene: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1am_t1_comp_hygiene',
	grade: '1am',
	trimesterId: 't1',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (1): النظافة الجسدية وغسل اليدين والأسنان (L’hygiène et la santé)',
	curriculumLessonId: 'fre_lesson_1am_t1_procedes_explicatifs',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'Pourquoi se laver les mains ?',
				source: 'Texte explicatif adapté — Hygiène et santé (1AM)',
				paragraphs: [
					'Le lavage des mains est un geste d’hygiène simple qui consiste à nettoyer les paumes, les doigts et les ongles avec de l’eau propre et du savon. [[Il]] élimine les microbes invisibles que nous touchons chaque jour.',
					'En effet, des mains sales transmettent plusieurs maladies, comme les maux de ventre et la grippe. C’est pourquoi les médecins conseillent de se laver les mains à des moments précis : avant chaque repas, après avoir utilisé les toilettes et en rentrant de l’école. Grâce à cette ((bonne habitude)), l’enfant grandit en bonne santé.'
				],
				glossary: [
					{ term: 'microbes', meaning: 'êtres minuscules invisibles qui causent des maladies' },
					{ term: 'paumes', meaning: 'intérieur des mains' }
				],
				qcmHeader: '1) Dans ce texte, l’auteur :',
				qcmOptions: ['raconte une aventure', 'explique l’importance du lavage des mains', 'décrit un voyage'],
				qcmCorrect: 'explique l’importance du lavage des mains',
				tf: [
					{ q: 'Le lavage des mains se fait avec de l’eau propre et du savon.', a: 'Vrai', mark: '1' },
					{ q: 'Les microbes sont toujours visibles à l’œil nu.', a: 'Faux', c: 'Ce sont des microbes invisibles.', mark: '1' },
					{ q: 'Il faut se laver les mains avant chaque repas.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes d’après le texte (02 pts) :\n\na) Que transmettent des mains sales ? Cite deux exemples du texte.\n\nb) À quoi renvoie le pronom souligné « Il » dans le premier paragraphe ?',
				compA: 'a) Des mains sales transmettent les maux de ventre et la grippe.\n\nb) Le pronom « Il » renvoie au « lavage des mains ».',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Une définition du lavage des mains.\n\nb) Un synonyme de « propre » ou l’antonyme de « propres » dans le paragraphe 2.',
				lexA: 'a) Définition : « Le lavage des mains est un geste d’hygiène simple qui consiste à nettoyer les paumes, les doigts et les ongles avec de l’eau propre et du savon. »\n\nb) Antonyme de « propres » : « sales ».',
				quizQ: 'Selon le texte « Pourquoi se laver les mains ? », quel procédé est employé dans « comme les maux de ventre et la grippe » ?',
				correctOpt: 'Une illustration (un exemple)',
				distractors: [
					{ text: 'Une définition', diagnosticFeedback: 'La définition utilise « est » ou « consiste à », pas « comme ».' },
					{ text: 'Une négation', diagnosticFeedback: 'Il n’y a aucune marque de négation ici.' },
					{ text: 'Une question', diagnosticFeedback: 'Cette expression n’est pas interrogative.' }
				]
			},
			{
				title: 'Le brossage des dents, un geste essentiel',
				source: 'Texte explicatif adapté — Santé bucco-dentaire (1AM)',
				paragraphs: [
					'La carie dentaire est une maladie qui attaque l’émail des dents lorsque des restes d’aliments sucrés restent longtemps dans la bouche. Pour éviter cette douleur, le brossage régulier est indispensable.',
					'Les dentistes recommandent trois éléments essentiels : une brosse souple, un dentifrice au fluor et un verre d’eau propre. [[Ils]] conseillent de se brosser les dents pendant deux minutes après chaque repas, par exemple le matin, à midi et le soir. Ainsi, une bouche ((propre)) protège le sourire et la santé générale.'
				],
				glossary: [
					{ term: 'émail', meaning: 'couche dure qui recouvre et protège la dent' },
					{ term: 'fluor', meaning: 'substance minérale qui renforce les dents' }
				],
				qcmHeader: '1) Quel est le thème principal de ce texte ?',
				qcmOptions: ['La pratique de la natation', 'La protection des dents par le brossage', 'La fabrication du pain'],
				qcmCorrect: 'La protection des dents par le brossage',
				tf: [
					{ q: 'La carie dentaire attaque l’émail des dents.', a: 'Vrai', mark: '1' },
					{ q: 'Il suffit de se brosser les dents une fois par semaine.', a: 'Faux', c: 'Les dentistes conseillent de se brosser les dents après chaque repas.', mark: '1' },
					{ q: 'Le dentifrice au fluor aide à renforcer les dents.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes d’après le texte (02 pts) :\n\na) Quels sont les trois éléments recommandés par les dentistes ?\n\nb) Qui remplace le pronom souligné « Ils » dans le deuxième paragraphe ?',
				compA: 'a) Une brosse souple, un dentifrice au fluor et un verre d’eau propre.\n\nb) Le pronom « Ils » remplace « Les dentistes ».',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Une énumération dans le deuxième paragraphe.\n\nb) Un synonyme de « nécessaire » dans le premier paragraphe.',
				lexA: 'a) Énumération : « une brosse souple, un dentifrice au fluor et un verre d’eau propre ».\n\nb) Synonyme de « nécessaire » : « indispensable ».',
				quizQ: 'Dans le texte « Le brossage des dents, un geste essentiel », qui remplace le pronom « Ils » ?',
				correctOpt: 'Les dentistes',
				distractors: [
					{ text: 'Les aliments sucrés', diagnosticFeedback: 'Relis le début du paragraphe 2 : ce sont les dentistes qui conseillent.' },
					{ text: 'Les trois éléments', diagnosticFeedback: 'Des objets ne peuvent pas donner de conseils.' },
					{ text: 'Les dents', diagnosticFeedback: '« Les dents » est un nom féminin pluriel (elles), pas masculin (ils).' }
				]
			},
			{
				title: 'L’hygiène corporelle au quotidien',
				source: 'Texte explicatif adapté — Éducation à la santé (1AM)',
				paragraphs: [
					'L’hygiène corporelle désigne l’ensemble des soins quotidiens qui permettent de garder le corps propre et sain. [[Elle]] comprend la douche régulière, le soin des ongles et le changement de vêtements propres.',
					'En effet, la transpiration et la poussière favorisent le développement des bactéries sur la peau. Par exemple, un enfant qui ne se lave pas après le sport risque des irritations cutanées. Une propreté ((constante)) apporte donc du bien-être et du respect envers soi-même et envers les autres.'
				],
				glossary: [
					{ term: 'bactéries', meaning: 'micro-organismes qui peuvent provoquer des infections' },
					{ term: 'irritations cutanées', meaning: 'rougeurs ou démangeaisons de la peau' }
				],
				qcmHeader: '1) Ce texte est de type :',
				qcmOptions: ['narratif', 'explicatif', 'poétique'],
				qcmCorrect: 'explicatif',
				tf: [
					{ q: 'L’hygiène corporelle aide à garder le corps propre et sain.', a: 'Vrai', mark: '1' },
					{ q: 'La transpiration empêche le développement des bactéries.', a: 'Faux', c: 'La transpiration et la poussière favorisent les bactéries.', mark: '1' },
					{ q: 'Changer régulièrement de vêtements fait partie de l’hygiène.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes d’après le texte (02 pts) :\n\na) Que risque un enfant qui ne se lave pas après le sport ?\n\nb) Que remplace le pronom souligné « Elle » dans le premier paragraphe ?',
				compA: 'a) Il risque des irritations cutanées.\n\nb) Le pronom « Elle » remplace « L’hygiène corporelle ».',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Une phrase déclarative à la forme négative.\n\nb) Le verbe qui introduit la définition au début du texte.',
				lexA: 'a) « un enfant qui ne se lave pas après le sport ».\n\nb) Le verbe « désigne ».',
				quizQ: 'Dans le texte « L’hygiène corporelle au quotidien », quel verbe introduit la définition ?',
				correctOpt: 'désigne',
				distractors: [
					{ text: 'risque', diagnosticFeedback: '« risque » indique un danger, pas une définition.' },
					{ text: 'favorisent', diagnosticFeedback: '« favorisent » exprime une conséquence ou une cause.' },
					{ text: 'apporte', diagnosticFeedback: '« apporte » exprime un bienfait dans la conclusion.' }
				]
			}
		];

		const v = rng.pick(variants);
		const passage = buildFrenchPassageBlock({
			title: v.title,
			paragraphs: v.paragraphs,
			source: v.source,
			glossary: v.glossary
		});
		const mcq = buildUniqueMcqOptions(v.correctOpt, v.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'I — Compréhension de l’écrit',
			points: 7,
			instruction: 'Lis attentivement le texte ci-dessous puis réponds aux questions :',
			content: [
				passage,
				{
					type: 'multiple_choice',
					groups: [
						{
							header: v.qcmHeader,
							options: v.qcmOptions,
							correct: v.qcmCorrect,
							mark: '1'
						}
					]
				},
				{ type: 'text', content: '2) Réponds par « Vrai » ou « Faux » en justifiant lorsque c’est faux (03 pts) :' },
				{ type: 'true_false', items: v.tf },
				{ type: 'text', content: v.compQ, answer: v.compA, mark: '2' },
				{ type: 'text', content: v.lexQ, answer: v.lexA, mark: '1' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: 'comprehension_ecrit',
			titleAr: `${this.titleAr} — ${v.title}`,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizQ,
				questionTextAr: v.quizQ,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Réponse correcte : ${v.correctOpt}`
			},
			sujetExercise,
			hints: [
				'اقرأ النص التفسيري مرتين وحدّد الموضوع الرئيسي ووسائل الشرح (التعريف، التعداد، التمثيل).',
				'في سؤال Vrai / Faux تحقق من كل معلومة بمقارنتها حرفيا مع النص.',
				'للإجابة عن الضمير المسطّر، ارجع إلى الاسم السابق له وتأكد من الجنس والعدد.'
			],
			solutionStepsAr: [
				`1) ${v.qcmCorrect}`,
				`2) ${v.tf.map((it, i) => `${i + 1}. ${it.a}${it.c ? ` (${it.c})` : ''}`).join(' | ')}`,
				`3) ${v.compA}`,
				`4) ${v.lexA}`
			],
			finalAnswer: v.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 2 : Compréhension de l'écrit (07 pts) — Alimentation équilibrée & Sport
// ═══════════════════════════════════════════════════════════════════════════════
const comp1amT1AlimentationSport: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1am_t1_comp_alimentation_sport',
	grade: '1am',
	trimesterId: 't1',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (2): التغذية المتوازنة وفوائد الرياضة (Alimentation saine et sport)',
	curriculumLessonId: 'fre_lesson_1am_t1_substituts',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'Manger équilibré pour bien grandir',
				source: 'Texte explicatif adapté — Nutrition de l’élève (1AM)',
				paragraphs: [
					'Une alimentation équilibrée consiste à consommer chaque jour des aliments variés en quantités raisonnables. [[Elle]] fournit à l’organisme l’énergie nécessaire pour étudier, marcher et grandir.',
					'Pour composer un repas sain, il faut réunir plusieurs groupes d’aliments : des fruits et des légumes frais, des céréales, des produits laitiers et de l’eau pure. Par exemple, les dattes et les oranges apportent des vitamines naturelles, alors que l’excès de sucreries ne nourrit pas correctement le corps. Ainsi, une ((nourriture saine)) protège contre la fatigue.'
				],
				glossary: [
					{ term: 'organisme', meaning: 'ensemble du corps humain' },
					{ term: 'excès', meaning: 'quantité trop grande, dépassement de la limite' }
				],
				qcmHeader: '1) Quel est le but principal de ce texte ?',
				qcmOptions: ['Expliquer les bienfaits d’une alimentation équilibrée', 'Présenter une recette de gâteau', 'Raconter une sortie au stade'],
				qcmCorrect: 'Expliquer les bienfaits d’une alimentation équilibrée',
				tf: [
					{ q: 'Une alimentation équilibrée apporte l’énergie pour étudier et grandir.', a: 'Vrai', mark: '1' },
					{ q: 'L’excès de sucreries nourrit correctement le corps.', a: 'Faux', c: 'L’excès de sucreries ne nourrit pas correctement le corps.', mark: '1' },
					{ q: 'Les dattes et les oranges contiennent des vitamines naturelles.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Cite trois éléments d’un repas sain mentionnés dans le paragraphe 2.\n\nb) Que remplace le pronom souligné « Elle » au début du texte ?',
				compA: 'a) Les fruits et légumes frais, les céréales, les produits laitiers et l’eau pure (trois au choix).\n\nb) Le pronom « Elle » remplace « Une alimentation équilibrée ».',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Un substitut lexical de « alimentation équilibrée » dans la dernière phrase.\n\nb) Une phrase contenant une illustration.',
				lexA: 'a) Substitut lexical : « une nourriture saine ».\n\nb) « Par exemple, les dattes et les oranges apportent des vitamines naturelles. »',
				quizQ: 'Dans le texte « Manger équilibré pour bien grandir », quel substitut lexical reprend « une alimentation équilibrée » ?',
				correctOpt: 'une nourriture saine',
				distractors: [
					{ text: 'la fatigue', diagnosticFeedback: 'La fatigue est ce contre quoi l’alimentation protège.' },
					{ text: 'l’excès de sucreries', diagnosticFeedback: 'C’est le contraire d’une alimentation équilibrée.' },
					{ text: 'des quantités', diagnosticFeedback: '« des quantités » ne remplace pas « alimentation équilibrée ».' }
				]
			},
			{
				title: 'Les bienfaits du sport chez les jeunes',
				source: 'Texte explicatif adapté — Sport et santé (1AM)',
				paragraphs: [
					'Le sport est une activité physique régulière qui renforce le corps et améliore la concentration scolaire. [[Cette activité]] aide le cœur à bien fonctionner et fortifie les os et les muscles.',
					'Il existe de nombreux sports bénéfiques pour les collégiens, comme la natation, la course à pied, le football et la gymnastique. En pratiquant trente minutes d’exercice par jour, l’élève dort mieux et n’éprouve pas de paresse. De plus, le sport collectif apprend ((le respect)) des règles et l’esprit d’équipe.'
				],
				glossary: [
					{ term: 'fortifie', meaning: 'rend plus fort et plus solide' },
					{ term: 'paresse', meaning: 'manque d’envie de faire un effort' }
				],
				qcmHeader: '1) Dans le texte, combien de minutes d’exercice quotidien sont conseillées ?',
				qcmOptions: ['Cinq minutes', 'Trente minutes', 'Cinq heures'],
				qcmCorrect: 'Trente minutes',
				tf: [
					{ q: 'Le sport renforce le cœur, les os et les muscles.', a: 'Vrai', mark: '1' },
					{ q: 'Le sport empêche les collégiens de bien dormir.', a: 'Faux', c: 'L’élève qui fait du sport dort mieux.', mark: '1' },
					{ q: 'Le sport collectif développe l’esprit d’équipe.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Cite deux exemples de sports mentionnés dans le texte.\n\nb) Quel mot reprend le substitut lexical souligné « Cette activité » ?',
				compA: 'a) La natation, la course à pied, le football ou la gymnastique (deux au choix).\n\nb) « Cette activité » reprend « Le sport ».',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Un verbe conjugué au présent de vérité générale dans le premier paragraphe.\n\nb) Un synonyme de « utiles » dans le deuxième paragraphe.',
				lexA: 'a) « est », « renforce », « améliore », « aide » ou « fortifie ».\n\nb) Synonyme de « utiles » : « bénéfiques ».',
				quizQ: 'Quelle est la nature grammaticale du substitut « Cette activité » dans « Les bienfaits du sport chez les jeunes » ?',
				correctOpt: 'Un substitut lexical',
				distractors: [
					{ text: 'Un pronom personnel sujet', diagnosticFeedback: '« Cette activité » est un groupe nominal, pas un pronom.' },
					{ text: 'Une négation', diagnosticFeedback: 'Il n’y a aucune négation dans « Cette activité ».' },
					{ text: 'Un verbe du 2e groupe', diagnosticFeedback: '« activité » est un nom féminin.' }
				]
			},
			{
				title: 'L’importance du petit-déjeuner',
				source: 'Texte explicatif adapté — Hygiène alimentaire (1AM)',
				paragraphs: [
					'Le petit-déjeuner est le premier repas de la journée pris après une longue nuit de sommeil. [[Il]] recharge le cerveau en énergie et prépare l’élève à suivre attentivement ses cours du matin.',
					'Un petit-déjeuner complet comprend généralement : un verre de lait, du pain complet ou des céréales, un fruit de saison et parfois quelques dattes ou du miel. Un collégien qui ne prend pas ce repas se sent vite fatigué en classe. Il convient donc de ne jamais négliger ((ce repas matinal)).'
				],
				glossary: [
					{ term: 'recharge', meaning: 'redonne de la force et de l’énergie' },
					{ term: 'négliger', meaning: 'oublier volontairement, ne pas accorder d’importance' }
				],
				qcmHeader: '1) Pourquoi le petit-déjeuner est-il essentiel pour l’élève ?',
				qcmOptions: ['Il recharge le cerveau pour les cours du matin', 'Il remplace le sommeil de la nuit', 'Il sert uniquement en vacances'],
				qcmCorrect: 'Il recharge le cerveau pour les cours du matin',
				tf: [
					{ q: 'Le petit-déjeuner est le premier repas de la journée.', a: 'Vrai', mark: '1' },
					{ q: 'Un élève qui saute le petit-déjeuner reste toujours très dynamique.', a: 'Faux', c: 'Il se sent vite fatigué en classe.', mark: '1' },
					{ q: 'Le lait, le pain complet et un fruit forment un bon petit-déjeuner.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Que ressent un collégien qui ne prend pas de petit-déjeuner ?\n\nb) Que remplace « ce repas matinal » à la fin du texte ?',
				compA: 'a) Il se sent vite fatigué en classe.\n\nb) « ce repas matinal » remplace « Le petit-déjeuner ».',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Une marque de négation dans le deuxième paragraphe.\n\nb) Une énumération des composants du petit-déjeuner.',
				lexA: 'a) « ne ... pas » ou « ne ... jamais ».\n\nb) « un verre de lait, du pain complet ou des céréales, un fruit de saison et parfois quelques dattes ou du miel ».',
				quizQ: 'Dans le texte « L’importance du petit-déjeuner », quel procédé explicatif est utilisé après les deux-points (:) au paragraphe 2 ?',
				correctOpt: 'Une énumération',
				distractors: [
					{ text: 'Une définition', diagnosticFeedback: 'La définition se trouve dans la première phrase du texte.' },
					{ text: 'Une négation', diagnosticFeedback: 'Cette suite d’aliments est une énumération.' },
					{ text: 'Une interrogation', diagnosticFeedback: 'Il n’y a pas de question.' }
				]
			}
		];

		const v = rng.pick(variants);
		const passage = buildFrenchPassageBlock({
			title: v.title,
			paragraphs: v.paragraphs,
			source: v.source,
			glossary: v.glossary
		});
		const mcq = buildUniqueMcqOptions(v.correctOpt, v.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'I — Compréhension de l’écrit',
			points: 7,
			instruction: 'Lis le texte avec soin puis réponds aux questions suivantes :',
			content: [
				passage,
				{
					type: 'multiple_choice',
					groups: [
						{
							header: v.qcmHeader,
							options: v.qcmOptions,
							correct: v.qcmCorrect,
							mark: '1'
						}
					]
				},
				{ type: 'text', content: '2) Réponds par « Vrai » ou « Faux » et corrige les phrases fausses (03 pts) :' },
				{ type: 'true_false', items: v.tf },
				{ type: 'text', content: v.compQ, answer: v.compA, mark: '2' },
				{ type: 'text', content: v.lexQ, answer: v.lexA, mark: '1' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: 'comprehension_ecrit',
			titleAr: `${this.titleAr} — ${v.title}`,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizQ,
				questionTextAr: v.quizQ,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Réponse correcte : ${v.correctOpt}`
			},
			sujetExercise,
			hints: [
				'اقرأ النص جيدا وتعرّف على الفوائد الصحية المذكورة في كل فقرة.',
				'فرّق بين البديل النحوي (ضمير) والبديل المعجمي (عبارة اسمية).',
				'استخرج التعداد أو التمثيل من النص كما هو دون تحريف.'
			],
			solutionStepsAr: [
				`1) ${v.qcmCorrect}`,
				`2) ${v.tf.map((it, i) => `${i + 1}. ${it.a}${it.c ? ` (${it.c})` : ''}`).join(' | ')}`,
				`3) ${v.compA}`,
				`4) ${v.lexA}`
			],
			finalAnswer: v.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 3 : Fonctionnement de la langue (06 pts) — Procédés, Négation, Substituts
// ═══════════════════════════════════════════════════════════════════════════════
const expl1amT1ProcedesNegation: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1am_t1_expl_procedes_negation',
	grade: '1am',
	trimesterId: 't1',
	domain: 'grammaire_syntaxe',
	titleAr: 'البناء اللغوي (1): وسائل الشرح، الجملة المنفية، والبدائل (Procédés, négation et substituts)',
	curriculumLessonId: 'fre_lesson_1am_t1_phrase_declarative_negative',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const sets = [
			{
				tableIntro: 'Exercice 1 (02 pts) : Classe les phrases suivantes dans le tableau selon le procédé explicatif employé :\n\nA) « L’hygiène est l’ensemble des gestes qui préservent la santé. »\n\nB) « Plusieurs fruits apportent des vitamines, comme l’orange et la pomme. »',
				defItems: ['Phrase A (est l’ensemble des...)'],
				illItems: ['Phrase B (comme l’orange...)'],
				ex2Q: 'Exercice 2 (02 pts) : Transforme les phrases déclaratives suivantes à la forme négative :\n\n1) Amine oublie sa serviette propre.\n\n2) Cet élève mange toujours des bonbons.',
				ex2A: '1) Amine n’oublie pas sa serviette propre.\n\n2) Cet élève ne mange jamais de bonbons.',
				ex3Q: 'Exercice 3 (02 pts) : Évite la répétition en remplaçant le groupe nominal répété par un substitut grammatical (il / elle / ils / les) :\n\n1) Le savon nettoie la peau. Le savon élimine les bactéries.\n\n2) Khadija lave les légumes. Khadija coupe les légumes.',
				ex3A: '1) Le savon nettoie la peau. Il élimine les bactéries.\n\n2) Khadija lave les légumes. Elle les coupe.',
				quizQ: 'Quelle est la forme négative correcte de : « Bilal boit encore du soda. » ?',
				correctOpt: 'Bilal ne boit plus de soda.',
				distractors: [
					{ text: 'Bilal ne boit pas encore du soda.', diagnosticFeedback: '« encore » devient « ne ... plus » et « du » devient « de ».' },
					{ text: 'Bilal n’boit plus de soda.', diagnosticFeedback: 'Devant une consonne (b), on écrit « ne », jamais « n’ ».' },
					{ text: 'Bilal boit plus de soda.', diagnosticFeedback: 'À l’écrit, on ne doit jamais oublier « ne » devant le verbe.' }
				]
			},
			{
				tableIntro: 'Exercice 1 (02 pts) : Classe les extraits suivants dans le tableau selon le procédé explicatif utilisé :\n\nA) « La carie désigne une infection qui abîme les dents. »\n\nB) « Certains sports renforcent le cœur, par exemple la natation et la course. »',
				defItems: ['Extrait A (désigne une infection...)'],
				illItems: ['Extrait B (par exemple la natation...)'],
				ex2Q: 'Exercice 2 (02 pts) : Mets les phrases suivantes à la forme négative :\n\n1) Les boissons gazeuses protègent les dents.\n\n2) Il aime les aliments trop salés.',
				ex2A: '1) Les boissons gazeuses ne protègent pas les dents.\n\n2) Il n’aime pas les aliments trop salés.',
				ex3Q: 'Exercice 3 (02 pts) : Remplace les mots répétés par un pronom convenable (elle / ils / le) :\n\n1) L’eau pure hydrate le corps. L’eau pure aide à digérer.\n\n2) Les fruits frais sont riches en eau. Les fruits frais donnent de la force.',
				ex3A: '1) L’eau pure hydrate le corps. Elle aide à digérer.\n\n2) Les fruits frais sont riches en eau. Ils donnent de la force.',
				quizQ: 'Quel procédé explicatif est utilisé dans : « Les légumes, par exemple la carotte et le navet, sont riches en fibres. » ?',
				correctOpt: 'L’illustration',
				distractors: [
					{ text: 'La définition', diagnosticFeedback: 'La définition explique le sens d’un terme avec « est » ou « désigne ».' },
					{ text: 'La négation', diagnosticFeedback: 'La phrase est à la forme affirmative.' },
					{ text: 'La reformulation', diagnosticFeedback: '« par exemple » introduit une illustration.' }
				]
			},
			{
				tableIntro: 'Exercice 1 (02 pts) : Classe les énoncés suivants dans le tableau :\n\nA) « Le petit-déjeuner consiste à prendre un repas équilibré le matin. »\n\nB) « On trouve du calcium dans plusieurs aliments, tels que le lait et le yaourt. »',
				defItems: ['Énoncé A (consiste à prendre...)'],
				illItems: ['Énoncé B (tels que le lait...)'],
				ex2Q: 'Exercice 2 (02 pts) : Réécris ces phrases à la forme négative :\n\n1) Youssef mange encore des sucreries le soir.\n\n2) Cette serviette est sale.',
				ex2A: '1) Youssef ne mange plus de sucreries le soir.\n\n2) Cette serviette n’est pas sale.',
				ex3Q: 'Exercice 3 (02 pts) : Remplace les répétitions par le substitut grammatical qui convient :\n\n1) La marche est un sport doux. La marche détend le corps.\n\n2) Le médecin examine le patient. Le médecin conseille le patient.',
				ex3A: '1) La marche est un sport doux. Elle détend le corps.\n\n2) Le médecin examine le patient. Il le conseille.',
				quizQ: 'Par quel pronom remplace-t-on « la pomme » dans : « Salma lave la pomme puis elle ...... mange. » ?',
				correctOpt: 'la',
				distractors: [
					{ text: 'le', diagnosticFeedback: '« pomme » est un nom féminin singulier.' },
					{ text: 'les', diagnosticFeedback: '« la pomme » est au singulier, pas au pluriel.' },
					{ text: 'lui', diagnosticFeedback: '« manger » se construit avec un COD direct (la), pas un COI (lui).' }
				]
			}
		];

		const s = rng.pick(sets);
		const tableBlock = buildFrenchClassificationTableBlock({
			columns: [
				{ header: 'Définition', items: s.defItems, mark: '1' },
				{ header: 'Illustration (Exemple)', items: s.illItems, mark: '1' }
			]
		});
		const mcq = buildUniqueMcqOptions(s.correctOpt, s.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'II — Fonctionnement de la langue',
			points: 6,
			instruction: 'Réalise soigneusement les trois exercices de langue suivants :',
			content: [
				{ type: 'text', content: s.tableIntro },
				tableBlock,
				{ type: 'text', content: s.ex2Q, answer: s.ex2A, mark: '2' },
				{ type: 'text', content: s.ex3Q, answer: s.ex3A, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: 'grammaire_syntaxe',
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: s.quizQ,
				questionTextAr: s.quizQ,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Réponse correcte : ${s.correctOpt}`
			},
			sujetExercise,
			hints: [
				'التعريف يستعمل (est, désigne, consiste à)، أما التمثيل فيستعمل (comme, par exemple, tel que).',
				'في النفي: ضع ne / n’ قبل الفعل المصرّف، وحوّل toujours إلى ne...jamais و encore إلى ne...plus.',
				'تأكّد من جنس الاسم وعدده قبل اختيار الضمير البديل (il, elle, ils, elles, le, la, les).'
			],
			solutionStepsAr: [
				`1) Définition : ${s.defItems.join(' ')} | Illustration : ${s.illItems.join(' ')}`,
				`2) ${s.ex2A}`,
				`3) ${s.ex3A}`
			],
			finalAnswer: s.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 4 : Fonctionnement de la langue (06 pts) — Présent & Accord sujet-verbe
// ═══════════════════════════════════════════════════════════════════════════════
const expl1amT1PresentAccord: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1am_t1_expl_present_accord',
	grade: '1am',
	trimesterId: 't1',
	domain: 'conjugaison_temps',
	titleAr: 'البناء اللغوي (2): المضارع الإخباري (المجموعات الثلاث) ومطابقة الفعل للفاعل',
	curriculumLessonId: 'fre_lesson_1am_t1_present_verite_generale',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const sets = [
			{
				ex1Q: 'Exercice 1 (02 pts) : Classe les verbes suivants selon leur groupe (1er groupe / 2e groupe / 3e groupe) : choisir — laver — boire — grandir — protéger — faire.',
				ex1A: '1er groupe : laver, protéger | 2e groupe : choisir, grandir | 3e groupe : boire, faire.',
				ex2Q: 'Exercice 2 (02 pts) : Conjugue les verbes entre parenthèses au présent de l’indicatif :\n\n1) Le savon (éliminer) ...... les microbes.\n\n2) Les légumes frais (nourrir) ...... bien notre corps.\n\n3) Nous (faire) ...... du sport chaque matin.\n\n4) Vous (boire) ...... de l’eau pure.',
				ex2A: '1) élimine   2) nourrissent   3) faisons   4) buvez',
				ex3Q: 'Exercice 3 (02 pts) : Réécris la phrase suivante en mettant le sujet au pluriel :\n\n« L’enfant propre choisit un fruit frais et se lave les mains. »',
				ex3A: '« Les enfants propres choisissent un fruit frais (ou des fruits frais) et se lavent les mains. »',
				quizQ: 'Quelle est la conjugaison correcte au présent : « Les sportifs (choisir) ...... une alimentation équilibrée et (boire) ...... beaucoup d’eau. » ?',
				correctOpt: 'choisissent / boivent',
				distractors: [
					{ text: 'choisit / boit', diagnosticFeedback: 'Le sujet « Les sportifs » est au pluriel (ils).' },
					{ text: 'choisissons / buvons', diagnosticFeedback: 'Ces terminaisons correspondent au pronom « nous ».' },
					{ text: 'choisent / boient', diagnosticFeedback: 'Attention : choisir est du 2e groupe (-issent) et boire donne boivent.' }
				]
			},
			{
				ex1Q: 'Exercice 1 (02 pts) : Indique le groupe de chaque verbe : finir — nettoyer — prendre — agir.',
				ex1A: 'finir (2e groupe) ; nettoyer (1er groupe) ; prendre (3e groupe) ; agir (2e groupe).',
				ex2Q: 'Exercice 2 (02 pts) : Mets les verbes entre parenthèses au présent de vérité générale :\n\n1) Le brossage (protéger) ...... les dents.\n\n2) Les vitamines (renforcer) ...... notre santé.\n\n3) L’enfant (finir) ...... son repas équilibré.\n\n4) Vous (faire) ...... attention à votre hygiène.',
				ex2A: '1) protège   2) renforcent   3) finit   4) faites',
				ex3Q: 'Exercice 3 (02 pts) : Accorde correctement les verbes avec leur sujet au pluriel :\n\n« Le lait et les dattes (être) ...... utiles ; ils (donner) ...... de l’énergie. »',
				ex3A: '« Le lait et les dattes sont utiles ; ils donnent de l’énergie. »',
				quizQ: 'Complète au présent de l’indicatif : « L’eau et le savon (nettoyer) ...... efficacement les mains. »',
				correctOpt: 'nettoient',
				distractors: [
					{ text: 'nettoie', diagnosticFeedback: 'Il y a deux sujets reliés par « et », donc le verbe est au pluriel.' },
					{ text: 'nettoyons', diagnosticFeedback: '« nettoyons » s’emploie avec « nous ».' },
					{ text: 'nettoyez', diagnosticFeedback: '« nettoyez » s’emploie avec « vous ».' }
				]
			},
			{
				ex1Q: 'Exercice 1 (02 pts) : Relie mentalement et classe les verbes selon leur groupe : marcher — remplir — être — manger — applaudir — venir.',
				ex1A: '1er groupe : marcher, manger | 2e groupe : remplir, applaudir | 3e groupe : être, venir.',
				ex2Q: 'Exercice 2 (02 pts) : Conjugue au présent de l’indicatif :\n\n1) Les collégiens (prendre) ...... un petit-déjeuner complet.\n\n2) Ma sœur (grandir) ...... vite grâce à une bonne alimentation.\n\n3) Nous (manger) ...... des légumes variés.\n\n4) Les microbes (être) ...... invisibles.',
				ex2A: '1) prennent   2) grandit   3) mangeons   4) sont',
				ex3Q: 'Exercice 3 (02 pts) : Mets la phrase suivante au pluriel :\n\n« Le jeune élève pratique le sport et boit du lait. »',
				ex3A: '« Les jeunes élèves pratiquent le sport et boivent du lait. »',
				quizQ: 'Quel verbe est correctement conjugué avec « nous » au présent de l’indicatif ?',
				correctOpt: 'Nous mangeons des fruits frais.',
				distractors: [
					{ text: 'Nous mangons des fruits frais.', diagnosticFeedback: 'Les verbes en -ger prennent un « e » devant « -ons » : mangeons.' },
					{ text: 'Nous faites du sport.', diagnosticFeedback: 'Avec « nous », on écrit « faisons » (vous faites).' },
					{ text: 'Nous choisit des légumes.', diagnosticFeedback: 'Avec « nous », choisir donne « choisissons ».' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.correctOpt, s.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'II — Fonctionnement de la langue',
			points: 6,
			instruction: 'Fais les exercices de conjugaison et d’orthographe suivants :',
			content: [
				{ type: 'text', content: s.ex1Q, answer: s.ex1A, mark: '2' },
				{ type: 'text', content: s.ex2Q, answer: s.ex2A, mark: '2' },
				{ type: 'text', content: s.ex3Q, answer: s.ex3A, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: 'conjugaison_temps',
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: s.quizQ,
				questionTextAr: s.quizQ,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Réponse correcte : ${s.correctOpt}`
			},
			sujetExercise,
			hints: [
				'أفعال المجموعة الثانية (-ir) تنتهي بـ (-issons / -issent) مثل choisir و nourrir و grandir.',
				'تذكّر الأفعال المنتهية بـ -ger مع nous تأخذ e قبل ons: nous mangeons, nous protégeons.',
				'عند تحويل الجملة إلى الجمع انتبه لتغيير المحدّد والاسم والصفة والفعل معا.'
			],
			solutionStepsAr: [s.ex1A, s.ex2A, s.ex3A],
			finalAnswer: s.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 5 : Situation d'intégration (07 pts) — Texte explicatif (Hygiène / Alimentation / Sport)
// ═══════════════════════════════════════════════════════════════════════════════
const written1amT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1am_t1_written_texte_explicatif',
	grade: '1am',
	trimesterId: 't1',
	domain: 'production_ecrite',
	titleAr: 'الوضعية الإدماجية: كتابة نص تفسيري حول النظافة أو التغذية الصحية أو الرياضة (07 نقاط)',
	curriculumLessonId: 'fre_lesson_1am_t1_rediger_texte_explicatif',
	defaultPoints: 7,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				prompt: 'À l’occasion de la Journée de la santé à ton collège, rédige un court texte explicatif (6 à 8 lignes) pour expliquer à tes camarades l’importance du lavage des mains.',
				notes: [
					'Donne un titre approprié à ton texte.',
					'Commence par une définition simple du lavage des mains.',
					'Emploie au moins une énumération ou une illustration (par exemple, comme).',
					'Conjugue les verbes au présent de vérité générale et évite les répétitions grâce aux substituts.',
					'Boîte à outils : eau propre, savon, microbes, maladies, avant les repas, protéger la santé.'
				],
				modelAnswer:
					'L’importance du lavage des mains\n\nLe lavage des mains est un geste d’hygiène essentiel qui consiste à frotter ses mains avec de l’eau propre et du savon. Il permet d’éliminer les microbes invisibles responsables de plusieurs maladies, comme la grippe et les maux de ventre.\n\nPour rester en bonne santé, il faut se laver les mains à des moments précis : avant chaque repas, après les toilettes et en rentrant de l’école. En conclusion, cette habitude simple protège notre corps chaque jour.',
				quizQ: 'Quelle phrase convient le mieux pour débuter un texte explicatif sur le lavage des mains ?',
				correctOpt: 'Le lavage des mains est un geste d’hygiène qui élimine les microbes.',
				distractors: [
					{ text: 'Il était une fois un petit savon dans une maison.', diagnosticFeedback: 'Cette ouverture appartient à un récit, pas à un texte explicatif.' },
					{ text: 'En conclusion, lavons-nous les mains.', diagnosticFeedback: '« En conclusion » s’emploie à la fin du texte, pas au début.' },
					{ text: 'Hier, j’ai acheté un savon au magasin.', diagnosticFeedback: 'Un texte explicatif utilise le présent de vérité générale et non un récit personnel au passé.' }
				]
			},
			{
				prompt: 'Ton professeur te demande d’écrire un court texte explicatif (6 à 8 lignes) pour le journal mural du collège afin d’expliquer ce qu’est une alimentation équilibrée et quels sont ses bienfaits.',
				notes: [
					'Propose un titre clair.',
					'Introduit ton texte par une définition de l’alimentation équilibrée.',
					'Utilise une énumération d’aliments sains et une phrase à la forme négative.',
					'Emploie le présent de l’indicatif et veille à l’accord sujet-verbe.',
					'Boîte à outils : fruits, légumes, lait, eau pure, vitamines, énergie, sucreries, grandir.'
				],
				modelAnswer:
					'Une alimentation équilibrée pour bien grandir\n\nL’alimentation équilibrée est une nourriture variée qui apporte au corps tous les éléments nécessaires à sa croissance. Elle donne aux élèves la force et l’énergie pour bien travailler en classe.\n\nUn repas sain réunit plusieurs aliments indispensables : des fruits frais, des légumes, des céréales, du lait et de l’eau pure. Par exemple, les oranges et les dattes fournissent des vitamines naturelles, alors que les bonbons ne nourrissent pas le corps. Ainsi, bien manger chaque jour garantit une excellente santé.',
				quizQ: 'Dans une rédaction explicative sur l’alimentation équilibrée, quel temps verbal doit dominer ?',
				correctOpt: 'Le présent de vérité générale',
				distractors: [
					{ text: 'Le passé simple', diagnosticFeedback: 'Le passé simple sert à raconter des histoires au passé.' },
					{ text: 'L’imparfait de description', diagnosticFeedback: 'L’imparfait appartient surtout au récit au passé.' },
					{ text: 'Le futur antérieur', diagnosticFeedback: 'Ce temps n’est pas utilisé dans un texte explicatif en 1AM.' }
				]
			},
			{
				prompt: 'Pour encourager tes camarades à pratiquer une activité physique, rédige un court texte explicatif (6 à 8 lignes) présentant les bienfaits du sport sur la santé.',
				notes: [
					'Écris un titre pertinent.',
					'Définis le sport dans la première phrase.',
					'Cite des exemples de sports utiles (comme / par exemple) et utilise un substitut pour éviter la répétition.',
					'Conjugue les verbes au présent de l’indicatif.',
					'Boîte à outils : activité physique, cœur, muscles, natation, marche, énergie, concentration, santé.'
				],
				modelAnswer:
					'Les bienfaits du sport au quotidien\n\nLe sport est une activité physique régulière qui entretient le corps et l’esprit. Cette pratique fortifie le cœur, développe les muscles et aide les élèves à mieux se concentrer en classe.\n\nDe nombreux sports sont adaptés aux jeunes, comme la natation, la marche et le football. Un enfant actif ne ressent pas de paresse et dort paisiblement le soir. En conclusion, pratiquer du sport chaque semaine est un secret précieux pour vivre en bonne santé.',
				quizQ: 'Quelle phrase d’illustration enrichit correctement un texte explicatif sur le sport ?',
				correctOpt: 'De nombreux sports sont utiles aux jeunes, comme la natation et la marche.',
				distractors: [
					{ text: 'Le sport n’existe pas dans les écoles.', diagnosticFeedback: 'Cette affirmation est fausse et ne présente aucun exemple.' },
					{ text: 'Où se trouve le terrain de sport ?', diagnosticFeedback: 'C’est une question, pas une illustration.' },
					{ text: 'Demain, j’irai voir mon cousin.', diagnosticFeedback: 'Cette phrase est hors sujet.' }
				]
			}
		];

		const v = rng.pick(variants);
		const block = buildFrenchWrittenProductionBlock({
			sujetUnTitle: 'Situation d’intégration :',
			sujetUnPrompt: v.prompt,
			sujetUnNotes: v.notes,
			modelAnswer: v.modelAnswer,
			rubricSummary:
				'Pertinence et respect de la consigne (2 pts) + Cohérence et procédés explicatifs (2 pts) + Correction de la langue : présent et accords (2 pts) + Présentation et ponctuation (1 pt).',
			mark: '7'
		});
		const mcq = buildUniqueMcqOptions(v.correctOpt, v.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'III — Situation d’intégration (Production écrite)',
			points: 7,
			instruction: 'Rédige un paragraphe soigné et bien ponctué en respectant les consignes :',
			content: [block]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: 'production_ecrite',
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizQ,
				questionTextAr: v.quizQ,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Réponse correcte : ${v.correctOpt}`
			},
			sujetExercise,
			hints: [
				'ضع عنوانا مناسبا وابدأ بتعريف مبسط للموضوع (est / consiste à).',
				'وظّف المضارع الإخباري مع التعداد أو التمثيل وتجنّب التكرار باستعمال البدائل.',
				'اختم فقرتك بجملة جامعة تبدأ بـ Ainsi أو En conclusion.'
			],
			solutionStepsAr: [
				'العنوان والمقدمة: تعريف واضح للموضوع الصحي.',
				'العرض: شرح الفوائد باستعمال التعداد والتمثيل والمضارع للحقيقة العامة.',
				'الخاتمة: تلخيص أهمية السلوك الصحي مع مراجعة المطابقة وعلامات الترقيم.'
			],
			finalAnswer: v.modelAnswer
		};
	}
};

export const TEMPLATES_1AM_T1: FrenchParameterizedTemplate[] = [
	comp1amT1Hygiene,
	comp1amT1AlimentationSport,
	expl1amT1ProcedesNegation,
	expl1amT1PresentAccord,
	written1amT1
];
