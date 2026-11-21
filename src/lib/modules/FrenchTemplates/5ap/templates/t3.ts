import type {
	Difficulty,
	FrenchGeneratedExerciseInstance,
	FrenchParameterizedTemplate
} from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildFrenchPassageBlock,
	buildFrenchWordFamilyTableBlock,
	buildFrenchWrittenProductionBlock
} from '../../french-helpers';
import { buildIllustratedFigureBlock } from '../../../VisualAssets/illustrations-registry';

// ===============================================================================
// Parameterized Templates - 5AP French - Trimester 3
// Projet 3 (Catastrophes naturelles & Métiers qui sauvent)
// + Projet 4 (Protégeons la nature) + Évaluation des Acquis 5AP (تقييم المكتسبات)
// Split: 2 comprehension (4 pts) + 2 text_exploration (3 pts) + 1 written_expression (3 pts)
// ===============================================================================

// -------------------------------------------------------------------------------
// 1. Compréhension de l'écrit (4 pts) — Évaluation des Acquis 5AP : Protection civile & Secouristes
// -------------------------------------------------------------------------------
interface T3CivilProtectionPack {
	title: string;
	theme: string;
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

const T3_PROTECTION_CIVILE_PASSAGES: readonly T3CivilProtectionPack[] = [
	{
		title: 'Les héros de la Protection civile algérienne',
		theme: 'La Protection civile algérienne',
		paragraphs: [
			'Chaque été, des incendies menacent nos belles forêts algériennes. Dès l’alerte, les pompiers de la Protection civile arrivent rapidement avec leurs grands camions-citernes rouges.',
			'Courageux et bien organisés, [[ils]] combattent les flammes jour et nuit ((pour sauver les habitants et protéger les arbres)). Les citoyens remercient ces secouristes dévoués car ils risquent leur vie au service de tous.'
		],
		glossary: [
			{ term: 'alerte', meaning: 'signal qui prévient d’un danger' },
			{ term: 'dévoués', meaning: 'toujours prêts à aider les autres avec générosité' }
		],
		qcmHeader: 'Choisis la bonne réponse : De qui parle ce texte ?',
		qcmOptions: [
			'Des pompiers de la Protection civile algérienne',
			'Des animaux sauvages du Sahara',
			'Des touristes au musée'
		],
		qcmCorrect: 'Des pompiers de la Protection civile algérienne',
		tfItems: [
			{ q: 'Les incendies menacent souvent les forêts en été.', a: 'Vrai', mark: '0.5' },
			{ q: 'Les pompiers arrivent avec des camions-citernes rouges.', a: 'Vrai', mark: '0.5' },
			{ q: 'Les pompiers travaillent seulement pendant la matinée.', a: 'Faux', mark: '0.5' },
			{ q: 'Les citoyens remercient ces secouristes courageux.', a: 'Vrai', mark: '0.5' }
		],
		extractPrompt: 'Relève du texte : a) l’expression du but (pour + infinitif) ; b) un mot de la même famille que «secours».',
		extractAnswer:
			'a) But : pour sauver les habitants et protéger les arbres. b) Mot de la même famille : secouristes.',
		quizPrompt: 'D’après le texte, pourquoi les citoyens remercient-ils les pompiers de la Protection civile ?',
		quizCorrect: 'Parce qu’ils risquent leur vie pour sauver les habitants et protéger les forêts.',
		quizDistractors: [
			{ text: 'Parce qu’ils construisent des écoles.', diagnosticFeedback: 'Le texte parle de combattre les incendies et de sauver des vies.' },
			{ text: 'Parce qu’ils visitent les musées en été.', diagnosticFeedback: 'Ils interviennent en urgence contre les feux de forêt.' },
			{ text: 'Parce qu’ils vendent des arbres.', diagnosticFeedback: 'Ils protègent les arbres contre les flammes.' }
		]
	},
	{
		title: 'En cas de tremblement de terre : les bons réflexes',
		theme: 'Les bons réflexes face au séisme',
		paragraphs: [
			'Un tremblement de terre est une catastrophe naturelle qui survient brusquement. Pendant la secousse, il faut garder son calme et se mettre à l’abri sous une table solide ou près d’un mur porteur.',
			'Éloigne-toi toujours des fenêtres vitrées et n’utilise jamais l’ascenseur ! Après la secousse, sors calmement dans la cour et écoute attentivement les consignes des agents de la Protection civile ((pour rester en sécurité)).'
		],
		glossary: [
			{ term: 'secousse', meaning: 'mouvement brusque du sol pendant un séisme' },
			{ term: 'mur porteur', meaning: 'mur épais et très solide qui soutient le bâtiment' }
		],
		qcmHeader: 'Choisis la bonne réponse : De quelle catastrophe naturelle parle ce texte ?',
		qcmOptions: ['D’un tremblement de terre (séisme)', 'D’une sécheresse', 'D’un incendie de maison'],
		qcmCorrect: 'D’un tremblement de terre (séisme)',
		tfItems: [
			{ q: 'Pendant un séisme, il faut garder son calme.', a: 'Vrai', mark: '0.5' },
			{ q: 'Il est conseillé de prendre l’ascenseur pendant la secousse.', a: 'Faux', mark: '0.5' },
			{ q: 'On doit s’éloigner des fenêtres vitrées.', a: 'Vrai', mark: '0.5' },
			{ q: 'Après la secousse, il faut écouter les consignes de la Protection civile.', a: 'Vrai', mark: '0.5' }
		],
		extractPrompt: 'Relève du texte deux conseils conjugués à l’impératif présent.',
		extractAnswer: 'Éloigne-toi des fenêtres vitrées / n’utilise jamais l’ascenseur / sors calmement / écoute les consignes (deux au choix).',
		quizPrompt: 'Quel geste est strictement interdit pendant un tremblement de terre selon le texte ?',
		quizCorrect: 'Utiliser l’ascenseur ou rester près des fenêtres vitrées.',
		quizDistractors: [
			{ text: 'Garder son calme.', diagnosticFeedback: 'Au contraire, le texte recommande de garder son calme.' },
			{ text: 'Se protéger sous une table solide.', diagnosticFeedback: 'C’est un bon réflexe conseillé dans le premier paragraphe.' },
			{ text: 'Écouter les consignes des secouristes.', diagnosticFeedback: 'C’est une consigne essentielle après la secousse.' }
		]
	},
	{
		title: 'Le médecin urgentiste et les secouristes',
		theme: 'Les métiers qui sauvent',
		paragraphs: [
			'Après de fortes pluies, une inondation a touché un petit village. Très vite, les équipes de la Protection civile et les médecins urgentistes sont arrivés avec des ambulances équipées.',
			'Le médecin examine chaque personne avec calme et soigne les blessés ((parce que chaque minute compte)). Les infirmiers préparent la trousse de secours pour aider les familles touchées.'
		],
		glossary: [
			{ term: 'inondation', meaning: 'débordement d’eau causé par de très fortes pluies' },
			{ term: 'trousse de secours', meaning: 'boîte contenant des pansements et des médicaments d’urgence' }
		],
		qcmHeader: 'Choisis la bonne réponse : Quelle catastrophe a touché le village ?',
		qcmOptions: ['Une inondation', 'Un feu de forêt', 'Une tempête de sable'],
		qcmCorrect: 'Une inondation',
		tfItems: [
			{ q: 'Les fortes pluies ont provoqué une inondation.', a: 'Vrai', mark: '0.5' },
			{ q: 'Les médecins sont venus avec des ambulances équipées.', a: 'Vrai', mark: '0.5' },
			{ q: 'Le médecin examine les blessés avec panique.', a: 'Faux', mark: '0.5' },
			{ q: 'Les infirmiers préparent la trousse de secours pour aider les familles.', a: 'Vrai', mark: '0.5' }
		],
		extractPrompt: 'Relève du texte : a) une expression de la cause ; b) le nom d’un véhicule de secours.',
		extractAnswer: 'a) Cause : parce que chaque minute compte. b) Véhicule de secours : des ambulances (une ambulance).',
		quizPrompt: 'D’après le texte, que font les infirmiers pour aider les familles touchées ?',
		quizCorrect: 'Ils préparent la trousse de secours.',
		quizDistractors: [
			{ text: 'Ils plantent des oliviers.', diagnosticFeedback: 'Le texte décrit une intervention médicale après une inondation.' },
			{ text: 'Ils éteignent un feu de forêt.', diagnosticFeedback: 'Ce texte parle d’une inondation, pas d’un incendie.' },
			{ text: 'Ils guident les élèves dans un musée.', diagnosticFeedback: 'Il s’agit de médecins et d’infirmiers urgentistes.' }
		]
	}
];

const tplCompProtectionCivileT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_5ap_t3_comp_protection_civile',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (تقييم المكتسبات 5AP): أبطال الحماية المدنية والكوارث الطبيعية',
	curriculumLessonId: 'fre_lesson_5ap_t3_catastrophes_secouristes',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 41 + 9);
		const p = T3_PROTECTION_CIVILE_PASSAGES[Math.abs(seed - 1) % T3_PROTECTION_CIVILE_PASSAGES.length];
		const mcq = buildUniqueMcqOptions(p.quizCorrect, p.quizDistractors, rng);

		const content: ContentBlock[] = [
			buildFrenchPassageBlock({
				title: p.title,
				paragraphs: p.paragraphs,
				source: 'Texte adapté — Préparation à l’Évaluation des Acquis 5AP',
				glossary: p.glossary
			}),
			buildIllustratedFigureBlock('pri_lang_05_professions_tools', {
				lang: 'fr',
				title: 'Les métiers nobles et les secours (médecin, pompier, boulanger, enseignant)',
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
				content: '2) Réponds par Vrai ou Faux d’après le texte (2 pts) :'
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
			customTitle: 'I. Compréhension de l’écrit (Évaluation des Acquis 5AP)',
			points: 4,
			instruction: 'Lis attentivement le texte deux fois puis réponds aux questions suivantes :',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `${p.paragraphs.map((s) => s.replace(/\[\[|\]\]|\(\(|\)\)/g, '')).join(' ')}\n\nQuestion : ${p.quizPrompt}`,
				questionTextAr: `اقرأ نص تقييم المكتسبات حول «${p.theme}» ثم اختر الإجابة الصحيحة:\n${p.quizPrompt}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Bonne réponse : ${p.quizCorrect}`
			},
			sujetExercise,
			hints: [
				'اقرأ النص مرتين وحدّد نوع الكارثة الطبيعية ودور أبطال الحماية المدنية والأطباء.',
				'تحقق من كل عبارة في Vrai / Faux بالرجوع مباشرة إلى سطور النص.',
				'تذكّر أن السبب يبدأ بـ (parce que / car) والغاية تبدأ بـ (pour + infinitif).'
			],
			solutionStepsAr: [
				`الفهم العام: ${p.qcmCorrect}`,
				`صح أو خطأ: ${p.tfItems.map((t, i) => `${i + 1}) ${t.a}`).join(' | ')}`,
				`الاستخراج: ${p.extractAnswer}`
			],
			finalAnswer: p.quizCorrect
		};
	}
};

// -------------------------------------------------------------------------------
// 2. Compréhension de l'écrit (4 pts) — Évaluation des Acquis 5AP : Protégeons la nature et l'eau
// -------------------------------------------------------------------------------
interface T3NaturePack {
	title: string;
	theme: string;
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

const T3_NATURE_PASSAGES: readonly T3NaturePack[] = [
	{
		title: 'L’eau, un trésor précieux à préserver',
		theme: 'Protéger l’eau',
		paragraphs: [
			'L’eau est une richesse indispensable à la vie de l’homme, des animaux et des plantes. Sans eau douce, la terre devient sèche et les jardins disparaissent.',
			'Nous devons tous éviter le gaspillage : ferme bien le robinet quand tu te brosses les dents, répare vite les fuites et arrose les plantes le soir. Protégeons chaque goutte d’eau ((pour garder notre planète vivante)) !'
		],
		glossary: [
			{ term: 'indispensable', meaning: 'très nécessaire, dont on ne peut pas se passer' },
			{ term: 'gaspillage', meaning: 'action de perdre inutilement une ressource précieuse' }
		],
		q1: 'Pourquoi l’eau est-elle un trésor précieux selon le texte ?',
		a1: 'Parce qu’elle est indispensable à la vie de l’homme, des animaux et des plantes.',
		tfItems: [
			{ q: 'Les plantes peuvent vivre longtemps sans eau.', a: 'Faux', mark: '0.5' },
			{ q: 'Il faut fermer le robinet en se brossant les dents.', a: 'Vrai', mark: '0.5' },
			{ q: 'Il est préférable d’arroser les plantes le soir.', a: 'Vrai', mark: '0.5' },
			{ q: 'Le texte encourage le gaspillage de l’eau.', a: 'Faux', mark: '0.5' }
		],
		q2: 'Relève du texte deux gestes écologiques conjugués à l’impératif pour économiser l’eau.',
		a2: 'Ferme bien le robinet / répare vite les fuites / arrose les plantes le soir / Protégeons chaque goutte d’eau (deux au choix).',
		quizPrompt: 'Quel geste simple le texte conseille-t-il au moment de se brosser les dents ?',
		quizCorrect: 'Fermer bien le robinet pour éviter le gaspillage.',
		quizDistractors: [
			{ text: 'Laisser l’eau couler tout le temps.', diagnosticFeedback: 'Laisser couler l’eau provoque du gaspillage.' },
			{ text: 'Arroser les plantes à midi en plein soleil.', diagnosticFeedback: 'Le texte conseille d’arroser les plantes le soir.' },
			{ text: 'Ignorer les fuites du robinet.', diagnosticFeedback: 'Le texte demande de réparer vite les fuites.' }
		]
	},
	{
		title: 'Plantons des arbres pour protéger la forêt algérienne',
		theme: 'Le reboisement et la forêt',
		paragraphs: [
			'La forêt est le poumon de la terre car les arbres purifient l’air, offrent de l’ombre et abritent de nombreux oiseaux. Autrefois, certaines collines étaient vertes, mais les incendies ont brûlé beaucoup d’arbres.',
			'Demain, les élèves de notre école participeront à une campagne de reboisement. Nous planterons de jeunes oliviers et des pins ((pour redonner vie à la colline)). Ne laisse jamais de verre ni de feu dans la forêt !'
		],
		glossary: [
			{ term: 'reboisement', meaning: 'action de planter de nouveaux arbres sur un terrain' },
			{ term: 'purifient', meaning: 'rendent propre et sain' }
		],
		q1: 'Pourquoi appelle-t-on la forêt «le poumon de la terre» ?',
		a1: 'Parce que les arbres purifient l’air, offrent de l’ombre et abritent de nombreux oiseaux.',
		tfItems: [
			{ q: 'Les arbres purifient l’air que nous respirons.', a: 'Vrai', mark: '0.5' },
			{ q: 'Les élèves participeront à une campagne de reboisement.', a: 'Vrai', mark: '0.5' },
			{ q: 'Ils planteront des oliviers et des pins.', a: 'Vrai', mark: '0.5' },
			{ q: 'On peut laisser des bouteilles en verre dans la forêt.', a: 'Faux', mark: '0.5' }
		],
		q2: 'Relève du texte : a) un verbe à l’imparfait ; b) un verbe au futur simple.',
		a2: 'a) Imparfait : étaient. b) Futur simple : participeront / planterons (un au choix).',
		quizPrompt: 'Que feront les élèves demain pendant la campagne de reboisement ?',
		quizCorrect: 'Ils planteront de jeunes oliviers et des pins pour redonner vie à la colline.',
		quizDistractors: [
			{ text: 'Ils couperont tous les vieux arbres.', diagnosticFeedback: 'Le reboisement consiste à planter des arbres, pas à les couper.' },
			{ text: 'Ils allumeront un feu de camp.', diagnosticFeedback: 'Le texte interdit formellement de laisser du feu dans la forêt.' },
			{ text: 'Ils visiteront un zoo.', diagnosticFeedback: 'Ils participent à une campagne de reboisement sur la colline.' }
		]
	},
	{
		title: 'Gardons notre quartier et nos plages propres',
		theme: 'La propreté du quartier et des plages',
		paragraphs: [
			'La propreté fait partie de nos belles valeurs et protège notre santé. Pourtant, certains promeneurs imprudents jettent encore des sacs en plastique sur les plages ou dans les rues.',
			'Pour préserver la beauté de notre pays, utilisons toujours les poubelles, trions les déchets recyclables et organisons des campagnes de nettoyage. Ensemble, nous rendrons notre quartier plus sain et plus agréable !'
		],
		glossary: [
			{ term: 'imprudents', meaning: 'qui ne font pas attention aux conséquences de leurs actes' },
			{ term: 'recyclables', meaning: 'qui peuvent être transformés et réutilisés' }
		],
		q1: 'Que jettent certains promeneurs imprudents dans la nature ?',
		a1: 'Ils jettent des sacs en plastique sur les plages ou dans les rues.',
		tfItems: [
			{ q: 'La propreté protège notre santé.', a: 'Vrai', mark: '0.5' },
			{ q: 'Les sacs en plastique rendent les plages plus propres.', a: 'Faux', mark: '0.5' },
			{ q: 'Le texte conseille d’utiliser les poubelles et de trier les déchets.', a: 'Vrai', mark: '0.5' },
			{ q: 'Les campagnes de nettoyage rendent le quartier plus agréable.', a: 'Vrai', mark: '0.5' }
		],
		q2: 'Relève du texte : a) un mot contenant un préfixe de contraire ; b) un mot de la même famille que «propre».',
		a2: 'a) Préfixe de contraire : imprudents (im + prudent). b) Famille de propre : propreté.',
		quizPrompt: 'Quels gestes le texte recommande-t-il pour garder le quartier et les plages propres ?',
		quizCorrect: 'Utiliser les poubelles, trier les déchets recyclables et organiser des campagnes de nettoyage.',
		quizDistractors: [
			{ text: 'Jeter les sacs en plastique sur le sable.', diagnosticFeedback: 'Le texte critique ce mauvais comportement.' },
			{ text: 'Laisser les déchets dans la rue.', diagnosticFeedback: 'Au contraire, il faut utiliser les poubelles.' },
			{ text: 'Ne jamais nettoyer le quartier.', diagnosticFeedback: 'Le texte encourage les campagnes de nettoyage collectives.' }
		]
	}
];

const tplCompProtegeonsNatureT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_5ap_t3_comp_protegeons_nature',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (تقييم المكتسبات 5AP): لنحمِ الطبيعة والماء والغابة',
	curriculumLessonId: 'fre_lesson_5ap_t3_futur_imperatif_ecologie',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 47 + 15);
		const p = T3_NATURE_PASSAGES[Math.abs(seed - 1) % T3_NATURE_PASSAGES.length];
		const mcq = buildUniqueMcqOptions(p.quizCorrect, p.quizDistractors, rng);

		const content: ContentBlock[] = [
			buildFrenchPassageBlock({
				title: p.title,
				paragraphs: p.paragraphs,
				source: 'Texte adapté — Préparation à l’Évaluation des Acquis 5AP (Projet 4)',
				glossary: p.glossary
			}),
			buildIllustratedFigureBlock('pri_lang_07_clean_park_planting', {
				lang: 'fr',
				maxHeight: 108,
				width: '58%'
			}),
			{
				type: 'text',
				content: `1) ${p.q1} (1 pt) :\n    Réponse : ........................................................................`,
				answer: `1) ${p.a1}`,
				mark: '1'
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
				content: `3) ${p.q2} (1 pt) :\n    Réponse : ........................................................................`,
				answer: `3) ${p.a2}`,
				mark: '1'
			}
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'I. Compréhension de l’écrit (Évaluation des Acquis 5AP)',
			points: 4,
			instruction: 'Lis soigneusement le texte sur la protection de la nature puis réponds aux questions :',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `${p.paragraphs.map((s) => s.replace(/\[\[|\]\]|\(\(|\)\)/g, '')).join(' ')}\n\nQuestion : ${p.quizPrompt}`,
				questionTextAr: `اقرأ نص تقييم المكتسبات حول «${p.theme}» ثم اختر الإجابة الصحيحة:\n${p.quizPrompt}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Bonne réponse : ${p.quizCorrect}`
			},
			sujetExercise,
			hints: [
				'اقرأ النص بتركيز واستخرج الفكرة الرئيسية والنصائح البيئية الواردة فيه.',
				'انتبه لنفي العبارات في أسئلة Vrai / Faux.',
				'أجب بجمل تامة واضحة ومأخوذة مباشرة من النص.'
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
// 3. Fonctionnement de la langue (3 pts): Cause (parce que, car) / But (pour) & Familles de mots
// -------------------------------------------------------------------------------
const CAUSE_BUT_POOL = [
	{
		prompt: 'Nous fermons le robinet ............ économiser l’eau.',
		options: ['pour', 'car', 'parce que'],
		correct: 'pour',
		explain: '«économiser» est un verbe à l’infinitif (but) : pour.'
	},
	{
		prompt: 'Nous protégeons les arbres ............ ils purifient l’air.',
		options: ['pour', 'parce qu’', 'de'],
		correct: 'parce qu’',
		explain: '«ils purifient» exprime la cause devant une voyelle : parce qu’.'
	},
	{
		prompt: 'Les pompiers courent vite ............ le feu menace la forêt.',
		options: ['pour', 'car', 'à'],
		correct: 'car',
		explain: '«le feu menace la forêt» est une cause (sujet + verbe conjugué) : car.'
	},
	{
		prompt: 'Les secouristes arrivent avec une ambulance ............ soigner les blessés.',
		options: ['pour', 'car', 'parce que'],
		correct: 'pour',
		explain: 'Devant l’infinitif «soigner» qui indique le but : pour.'
	},
	{
		prompt: 'Ne jette pas de plastique ............ il pollue la mer.',
		options: ['pour', 'car', 'à'],
		correct: 'car',
		explain: 'Explication de la cause avec verbe conjugué : car.'
	},
	{
		prompt: 'Les élèves organisent une campagne ............ nettoyer la cour.',
		options: ['pour', 'car', 'parce qu’'],
		correct: 'pour',
		explain: 'But suivi d’un verbe à l’infinitif («nettoyer») : pour.'
	}
] as const;

const WORD_FAMILY_ROWS_POOL = [
	{
		verbe: { given: true, value: 'protéger' },
		nom: { given: false, value: 'protection', mark: '0.5' },
		adjectif: { given: true, value: 'protecteur' }
	},
	{
		verbe: { given: false, value: 'nettoyer', mark: '0.5' },
		nom: { given: true, value: 'nettoyage' },
		adjectif: { given: true, value: 'net' }
	},
	{
		verbe: { given: true, value: 'sauver' },
		nom: { given: false, value: 'sauvetage', mark: '0.5' },
		adjectif: { given: true, value: 'sauf' }
	},
	{
		verbe: { given: true, value: 'planter' },
		nom: { given: false, value: 'plantation', mark: '0.5' },
		adjectif: { given: true, value: 'planté' }
	},
	{
		verbe: { given: true, value: 'polluer' },
		nom: { given: false, value: 'pollution', mark: '0.5' },
		adjectif: { given: true, value: 'pollué' }
	},
	{
		verbe: { given: false, value: 'soigner', mark: '0.5' },
		nom: { given: true, value: 'soin' },
		adjectif: { given: true, value: 'soigneux' }
	}
] as const;

const tplLangCauseButFamillesT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_5ap_t3_lang_cause_but_familles',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'grammaire_syntaxe',
	titleAr: 'التحكم في اللغة: التعبير عن السبب والغاية وعائلات الكلمات',
	curriculumLessonId: 'fre_lesson_5ap_t3_cause_et_but',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 67 + 21);
		const pickedCb = rng.pickDistinct(CAUSE_BUT_POOL, 3);
		const pickedRows = rng.pickDistinct(WORD_FAMILY_ROWS_POOL, 3);
		const qCb = pickedCb[0];

		const mcq = buildUniqueMcqOptions(
			qCb.correct,
			[
				...qCb.options
					.filter((o) => o !== qCb.correct)
					.map((o) => ({
						text: o,
						diagnosticFeedback: `Vérifie ce qui suit le connecteur : ${qCb.explain}`
					})),
				{
					text: 'mais',
					diagnosticFeedback: '«mais» exprime l’opposition, pas la cause ni le but.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: 'Activité 1 : Choisis le bon connecteur de cause ou de but (parce que / parce qu’, car, pour) (1.5 pts) :'
			},
			{
				type: 'multiple_choice',
				groups: pickedCb.map((item, idx) => ({
					header: `${idx + 1}) ${item.prompt}`,
					options: [...item.options],
					correct: item.correct,
					mark: '0.5'
				}))
			},
			{
				type: 'text',
				content: 'Activité 2 : Complète le tableau des familles de mots ci-dessous (1.5 pts) :'
			},
			buildFrenchWordFamilyTableBlock(pickedRows.map((r) => ({ ...r })))
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'II. Fonctionnement de la langue (Cause, but et familles de mots)',
			points: 3,
			instruction: 'Complète les phrases par le connecteur convenable puis remplis le tableau des familles de mots :',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `Complète la phrase par le bon connecteur : "${qCb.prompt}"`,
				questionTextAr: `أكمل الجملة بأداة السبب أو الغاية المناسبة:\n"${qCb.prompt}"`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `${qCb.correct} — ${qCb.explain}`
			},
			sujetExercise,
			hints: [
				'بعد «pour» (الغاية) يأتي الفعل دائماً في المصدر (infinitif).',
				'بعد «parce que / parce qu’» و«car» (السبب) تأتي جملة فيها فاعل وفعل مصرّف.',
				'كلمات العائلة الواحدة تشترك في نفس الجذر وتُكوّن باللواحق (-tion, -age, -er).'
			],
			solutionStepsAr: [
				...pickedCb.map((c, i) => `النشاط 1 (${i + 1}): ${c.correct} (${c.explain})`),
				...pickedRows.map(
					(r, i) => `النشاط 2 (${i + 1}): ${r.verbe.value} / ${r.nom.value} / ${r.adjectif.value}`
				)
			],
			finalAnswer: qCb.correct
		};
	}
};

// -------------------------------------------------------------------------------
// 4. Fonctionnement de la langue (3 pts): Futur simple, Imparfait & Impératif présent
// -------------------------------------------------------------------------------
const FUTUR_IMPARFAIT_POOL = [
	{
		prompt: 'Demain, nous ............ (planter) des arbres dans la cour. [Futur simple]',
		answer: 'planterons',
		explain: 'Futur simple avec «nous» : infinitif + ons (planterons).'
	},
	{
		prompt: 'Bientôt, notre quartier ............ (être) plus vert. [Futur simple]',
		answer: 'sera',
		explain: 'Verbe «être» au futur simple avec «il» : sera.'
	},
	{
		prompt: 'Les jeunes oliviers ............ (grandir) grâce à l’eau. [Futur simple]',
		answer: 'grandiront',
		explain: 'Futur simple du 2e groupe avec «ils» : grandir + ont.'
	},
	{
		prompt: 'Autrefois, cette forêt ............ (être) pleine d’oiseaux. [Imparfait]',
		answer: 'était',
		explain: 'Verbe «être» à l’imparfait avec «elle» : était.'
	},
	{
		prompt: 'Avant l’été, les jardins ............ (verdir) chaque matin. [Imparfait]',
		answer: 'verdissaient',
		explain: '2e groupe à l’imparfait avec «ils» : -issaient (verdissaient).'
	},
	{
		prompt: 'Autrefois, les villageois ............ (protéger) bien la source d’eau. [Imparfait]',
		answer: 'protégeaient',
		explain: '1er groupe en -ger à l’imparfait avec «ils» : protégeaient.'
	}
] as const;

const IMPERATIF_POOL = [
	{
		raw: 'Tu fermes le robinet pour économiser l’eau.',
		answer: 'Ferme le robinet pour économiser l’eau !',
		verbOnly: 'Ferme'
	},
	{
		raw: 'Nous protégeons la forêt contre les incendies.',
		answer: 'Protégeons la forêt contre les incendies !',
		verbOnly: 'Protégeons'
	},
	{
		raw: 'Vous gardez la cour de l’école propre.',
		answer: 'Gardez la cour de l’école propre !',
		verbOnly: 'Gardez'
	},
	{
		raw: 'Tu plantes un jeune arbre dans le jardin.',
		answer: 'Plante un jeune arbre dans le jardin !',
		verbOnly: 'Plante'
	},
	{
		raw: 'Nous économisons chaque goutte d’eau.',
		answer: 'Économisons chaque goutte d’eau !',
		verbOnly: 'Économisons'
	},
	{
		raw: 'Vous choisissez des gestes utiles pour la nature.',
		answer: 'Choisissez des gestes utiles pour la nature !',
		verbOnly: 'Choisissez'
	}
] as const;

const tplLangFuturImperatifImparfaitT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_5ap_t3_lang_futur_imperatif_imparfait',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'conjugaison_temps',
	titleAr: 'التحكم في اللغة: المستقبل البسيط والماضي الناقص والأمر الحاضر (نصائح بيئية)',
	curriculumLessonId: 'fre_lesson_5ap_t3_futur_imperatif_ecologie',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 73 + 27);
		const pickedFi = rng.pickDistinct(FUTUR_IMPARFAIT_POOL, 3);
		const pickedImp = rng.pickDistinct(IMPERATIF_POOL, 3);
		const qImp = pickedImp[0];

		const isTu1st = qImp.raw.startsWith('Tu ');
		const mcq = buildUniqueMcqOptions(
			qImp.answer,
			[
				{
					text: qImp.raw.replace(/\.$/, ' !'),
					diagnosticFeedback: 'À l’impératif présent, on supprime toujours le pronom sujet (Tu, Nous, Vous).'
				},
				{
					text: isTu1st
						? qImp.answer.replace(/^([A-Za-zÀ-ÿ]+)/, '$1s')
						: qImp.answer.replace(/^([A-Za-zÀ-ÿ]+)/, 'Nous $1'),
					diagnosticFeedback: isTu1st
						? 'À l’impératif, les verbes du 1er groupe ne prennent jamais de «s» à la 2e personne du singulier.'
						: 'Ne garde pas le pronom sujet devant un verbe à l’impératif.'
				},
				{
					text: qImp.answer.replace(/^([A-Za-zÀ-ÿ]+)/, 'Tu $1'),
					diagnosticFeedback: 'L’impératif s’emploie sans pronom sujet.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			buildIllustratedFigureBlock('pri_lang_03_weather_icons_quad', {
				lang: 'fr',
				maxHeight: 104,
				width: '56%'
			}),
			{
				type: 'text',
				content: 'Activité 1 : Conjugue les verbes entre parenthèses au temps indiqué (futur simple ou imparfait) (1.5 pts) :'
			},
			...pickedFi.map((item, idx) => ({
				type: 'text' as const,
				content: `${idx + 1}) ${item.prompt.replace(/ \[.*\]$/, '')} (${item.prompt.includes('Futur') ? 'au futur simple' : 'à l’imparfait'})`,
				answer: `${idx + 1}) ${item.prompt.replace(/ \[.*\]$/, '').replace('............', item.answer)}`,
				mark: '0.5'
			})),
			{
				type: 'text',
				content: 'Activité 2 : Transforme ces phrases à l’impératif présent pour donner des conseils écologiques (1.5 pts) :'
			},
			...pickedImp.map((item, idx) => ({
				type: 'text' as const,
				content: `${idx + 1}) ${item.raw}\n    Conseil à l’impératif : ........................................................................`,
				answer: `${idx + 1}) ${item.answer}`,
				mark: '0.5'
			}))
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'II. Fonctionnement de la langue (Futur simple, imparfait et impératif présent)',
			points: 3,
			instruction: 'Conjugue au temps demandé puis transforme les phrases à l’impératif présent :',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `Transforme cette phrase à l’impératif présent : "${qImp.raw}"`,
				questionTextAr: `حوّل الجملة التالية إلى الأمر الحاضر (l’impératif présent) لتقديم نصيحة بيئية:\n"${qImp.raw}"`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Conseil correct : ${qImp.answer}`
			},
			sujetExercise,
			hints: [
				'في المستقبل البسيط: المصدر + (-ai, -as, -a, -ons, -ez, -ont)، وفعل être يصبح sera.',
				'في الماضي الناقص: نهايات موحدة (-ais, -ait, -aient) مع إضافة -iss- لأفعال المجموعة الثانية.',
				'في الأمر الحاضر: نحذف ضمير الفاعل، ونحذف حرف s من نهاية المجموعة الأولى مع tu (Ferme ! Plante !).'
			],
			solutionStepsAr: [
				...pickedFi.map((f, i) => `النشاط 1 (${i + 1}): ${f.answer} (${f.explain})`),
				...pickedImp.map((im, i) => `النشاط 2 (${i + 1}): ${im.answer}`)
			],
			finalAnswer: qImp.answer
		};
	}
};

// -------------------------------------------------------------------------------
// 5. Production écrite (3 pts) — Évaluation des Acquis 5AP : Nature & Protection civile
// -------------------------------------------------------------------------------
const T3_EVAL_WRITING_PROFILES = [
	{
		topicTitle: 'Protégeons l’eau, source de vie !',
		prompt:
			'À l’occasion de la Journée mondiale de l’eau, rédige un court texte de 4 à 5 phrases pour expliquer pourquoi l’eau est précieuse et donner trois conseils à tes camarades pour ne pas la gaspiller.',
		noms: 'l’eau, trésor précieux, robinet, fuites, plantes, gaspillage',
		verbes: 'être, fermer, réparer, arroser, économiser, protéger',
		outils: 'parce que / car, pour + infinitif, impératif présent',
		openingCorrect: 'L’eau est un trésor précieux parce qu’elle est indispensable à la vie.',
		model:
			'L’eau est un trésor précieux parce qu’elle est indispensable à la vie. Pour éviter le gaspillage, suivons ces conseils simples ! Ferme bien le robinet quand tu te brosses les dents. Répare vite les fuites et arrose les plantes le soir. Protégeons chaque goutte d’eau !'
	},
	{
		topicTitle: 'Protégeons nos forêts contre les incendies !',
		prompt:
			'Ton école prépare une affiche sur la protection de la forêt algérienne. Rédige un court paragraphe de 4 à 5 phrases pour expliquer l’utilité des arbres et donner trois conseils afin d’éviter les feux de forêt.',
		noms: 'la forêt, les arbres, air pur, ombre, oiseaux, incendie, verre, déchets',
		verbes: 'purifier, protéger, planter, éviter, jeter, garder',
		outils: 'car / parce que, pour + infinitif, impératif présent',
		openingCorrect: 'La forêt est très utile car les arbres purifient l’air et offrent de l’ombre.',
		model:
			'La forêt est très utile car les arbres purifient l’air et offrent de l’ombre aux oiseaux. Pour la protéger contre les incendies, respectons ces règles ! N’allume jamais de feu sous les arbres. Ne laisse pas de verre ni de déchets sur le sol. Plantons des arbres pour garder notre pays vert !'
	},
	{
		topicTitle: 'Le métier courageux du pompier',
		prompt:
			'Dans le cadre de la préparation à l’Évaluation des Acquis, rédige un court paragraphe de 4 à 5 phrases pour présenter le métier du pompier de la Protection civile, ses outils et son rôle noble en cas de catastrophe.',
		noms: 'le pompier, Protection civile, camion-citerne, casque, lance à eau, incendie, victimes',
		verbes: 'être, arriver, utiliser, éteindre, sauver, protéger',
		outils: 'présent de l’indicatif, pour + infinitif, car / parce que',
		openingCorrect: 'Le pompier de la Protection civile exerce un métier courageux pour sauver des vies.',
		model:
			'Le pompier de la Protection civile exerce un métier courageux pour sauver des vies. En cas d’incendie ou d’inondation, il arrive vite avec son camion-citerne rouge. Il porte un casque solide et utilise la lance à eau pour éteindre les flammes. Tous les citoyens respectent ce héros car il protège les habitants et la nature.'
	}
] as const;

const tplWrittenEvalAcquisT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_5ap_t3_written_evaluation_acquis',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'production_ecrite',
	titleAr: 'الإنتاج الكتابي (تقييم المكتسبات 5AP): حماية الماء والغابة أو المهن المنقذة',
	curriculumLessonId: 'fre_lesson_5ap_t3_evaluation_acquis_methodologie',
	defaultPoints: 3,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 97 + 41);
		const p = T3_EVAL_WRITING_PROFILES[Math.abs(seed - 1) % T3_EVAL_WRITING_PROFILES.length];

		const mcq = buildUniqueMcqOptions(
			p.openingCorrect,
			[
				{
					text: `${p.openingCorrect.toLowerCase().replace(/\.$/, '')}`,
					diagnosticFeedback: 'Une phrase correcte commence toujours par une majuscule et se termine par un point.'
				},
				{
					text: 'Fermes le robinet pour économisé de l’eau.',
					diagnosticFeedback: 'Attention : pas de «s» à «Ferme» à l’impératif et infinitif «économiser» après «pour».'
				},
				{
					text: 'Nous protégé la nature car pour sauver.',
					diagnosticFeedback: 'Il faut conjuguer le verbe (protégeons) et ne pas mélanger «car» et «pour».'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			buildIllustratedFigureBlock('pri_ara_06_four_seasons_trees', {
				lang: 'fr',
				title: 'Protéger nos arbres et nos forêts au fil des quatre saisons',
				customLegend: [
					{ num: '1', label: "Le printemps fleuri et l'été ensoleillé" },
					{ num: '2', label: "L'automne doré et l'hiver enneigé" }
				],
				maxHeight: 102,
				width: '54%'
			}),
			buildFrenchWrittenProductionBlock({
				sujetUnTitle: `Production écrite (Évaluation des Acquis 5AP) : ${p.topicTitle}`,
				sujetUnPrompt: p.prompt,
				sujetUnNotes: [
					'Donne un titre clair à ton paragraphe.',
					'Emploie au moins une expression de cause (car / parce que) ou de but (pour + infinitif).',
					'Respecte le temps demandé, les accords, les majuscules et la ponctuation (. / !).',
					`Noms utiles : ${p.noms}.`,
					`Verbes utiles : ${p.verbes}.`,
					`Outils grammaticaux : ${p.outils}.`
				],
				modelAnswer: `${p.topicTitle}\n${p.model}`,
				rubricSummary:
					'Pertinence et respect de la consigne (1 pt) | Emploi juste de l’impératif/présent et cause/but (1 pt) | Accords, ponctuation et lisibilité (1 pt)',
				mark: '3'
			})
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'III. Production écrite (Évaluation des Acquis 5AP)',
			points: 3,
			instruction: 'Aide-toi de la boîte à outils pour rédiger un paragraphe propre et bien ponctué :',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `Quelle phrase d’introduction est grammaticalement parfaite pour le sujet «${p.topicTitle}» ?`,
				questionTextAr: `اختر الجملة الافتتاحية السليمة لموضوع تقييم المكتسبات «${p.topicTitle}»:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Meilleure phrase : ${p.openingCorrect}`
			},
			sujetExercise,
			hints: [
				'ابدأ بعنوان مناسب ثم بجملة تقديمية توضّح الأهمية باستعمال car أو parce que.',
				'اكتب 3 جمل واضحة (نصائح بالأمر الحاضر بلا s مع tu، أو وصف بالمضارع) مع pour + infinitif.',
				'راجع الحروف الكبيرة والنقط وعلامات التعجب وتوافق الكلمات قبل تسليم الورقة.'
			],
			solutionStepsAr: [
				`العنوان والافتتاحية: ${p.openingCorrect}`,
				`توظيف صندوق الأدوات (${p.outils}) في 4 إلى 5 جمل قصيرة ومترابطة.`,
				`الفقرة النموذجية: ${p.model}`
			],
			finalAnswer: p.openingCorrect
		};
	}
};

export const TEMPLATES_5AP_T3: FrenchParameterizedTemplate[] = [
	tplCompProtectionCivileT3,
	tplCompProtegeonsNatureT3,
	tplLangCauseButFamillesT3,
	tplLangFuturImperatifImparfaitT3,
	tplWrittenEvalAcquisT3
];
