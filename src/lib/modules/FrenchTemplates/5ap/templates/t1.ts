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

// ===============================================================================
// Parameterized Templates - 5AP French - Trimester 1
// Projet 1 : Au zoo — Décrire un animal sauvage (Fennec, Gazelle, Dromadaire, Lion)
// Split: 2 comprehension (4 pts) + 2 text_exploration (3 pts) + 1 written_expression (3 pts)
// ===============================================================================

// -------------------------------------------------------------------------------
// 1. Compréhension de l'écrit (4 pts): Les animaux du Sahara algérien
// -------------------------------------------------------------------------------
interface T1AnimalPassagePack {
	title: string;
	animal: string;
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

const T1_SAHARA_PASSAGES: readonly T1AnimalPassagePack[] = [
	{
		title: 'Le fennec, petit renard du Sahara',
		animal: 'Le fennec',
		paragraphs: [
			'Le fennec est un petit animal sauvage qui vit dans le Sahara algérien. [[Il]] a une douce fourrure couleur sable et de très grandes oreilles.',
			'Pendant la journée, le fennec dort dans son terrier pour éviter la grande chaleur. La nuit, ce petit renard du désert chasse des insectes, des petits lézards et mange parfois des dattes.'
		],
		glossary: [
			{ term: 'terrier', meaning: 'trou creusé dans le sable où vit un animal' },
			{ term: 'fourrure', meaning: 'poils doux qui couvrent le corps d’un animal' }
		],
		qcmHeader: 'Choisis la bonne réponse : Où vit le fennec ?',
		qcmOptions: ['Dans le Sahara algérien', 'Dans une rivière', 'Au pôle Nord'],
		qcmCorrect: 'Dans le Sahara algérien',
		tfItems: [
			{ q: 'Le fennec a de petites oreilles.', a: 'Faux', mark: '0.5' },
			{ q: 'Sa fourrure est couleur sable.', a: 'Vrai', mark: '0.5' },
			{ q: 'Le fennec dort dans son terrier le jour.', a: 'Vrai', mark: '0.5' },
			{ q: 'Le fennec est un grand animal domestique.', a: 'Faux', mark: '0.5' }
		],
		extractPrompt: 'Relève du texte : a) un adjectif qualificatif épithète ; b) ce que mange le fennec.',
		extractAnswer:
			'a) Adjectif épithète : petit / sauvage / douce / grandes (au choix). b) Il mange des insectes, des petits lézards et des dattes.',
		quizPrompt: 'D’après le texte sur le fennec, pourquoi dort-il dans son terrier pendant la journée ?',
		quizCorrect: 'Pour éviter la grande chaleur du désert.',
		quizDistractors: [
			{
				text: 'Parce qu’il vit dans une rivière froide.',
				diagnosticFeedback: 'Le texte précise que le fennec vit dans le Sahara algérien.'
			},
			{
				text: 'Pour manger de l’herbe verte.',
				diagnosticFeedback: 'Le fennec chasse la nuit des insectes et des petits lézards.'
			},
			{
				text: 'Parce qu’il est un animal domestique.',
				diagnosticFeedback: 'Le texte indique clairement que le fennec est un animal sauvage.'
			}
		]
	},
	{
		title: 'La gazelle dorcas, reine du désert',
		animal: 'La gazelle dorcas',
		paragraphs: [
			'La gazelle dorcas est un bel animal sauvage du Sahara. [[Elle]] est légère et très rapide. Elle a des pattes fines, un pelage brun clair et deux petites cornes courbées.',
			'La gazelle est un animal herbivore : elle se nourrit d’herbes, de feuilles et de jeunes plantes du désert. Elle vit souvent en petit groupe pour se protéger.'
		],
		glossary: [
			{ term: 'herbivore', meaning: 'animal qui mange des plantes et de l’herbe' },
			{ term: 'pelage', meaning: 'ensemble des poils d’un animal' }
		],
		qcmHeader: 'Choisis la bonne réponse : De quoi se nourrit la gazelle dorcas ?',
		qcmOptions: ['De viande fraîche', 'D’herbes, de feuilles et de plantes', 'De poissons'],
		qcmCorrect: 'D’herbes, de feuilles et de plantes',
		tfItems: [
			{ q: 'La gazelle dorcas est un animal très rapide.', a: 'Vrai', mark: '0.5' },
			{ q: 'La gazelle est un animal carnivore.', a: 'Faux', mark: '0.5' },
			{ q: 'Elle a des pattes fines et deux cornes courbées.', a: 'Vrai', mark: '0.5' },
			{ q: 'La gazelle vit toujours toute seule.', a: 'Faux', mark: '0.5' }
		],
		extractPrompt: 'Relève du texte : a) un adjectif attribut du sujet ; b) un complément du nom.',
		extractAnswer:
			'a) Adjectif attribut : légère / rapide / herbivore (au choix). b) Complément du nom : du Sahara / du désert.',
		quizPrompt: 'D’après le texte, quelles caractéristiques physiques possède la gazelle dorcas ?',
		quizCorrect: 'Des pattes fines, un pelage brun clair et deux petites cornes courbées.',
		quizDistractors: [
			{
				text: 'Une grande bosse et des griffes énormes.',
				diagnosticFeedback: 'La bosse appartient au dromadaire, pas à la gazelle.'
			},
			{
				text: 'De très grandes oreilles et une crinière épaisse.',
				diagnosticFeedback: 'Le texte décrit des pattes fines et deux petites cornes courbées.'
			},
			{
				text: 'Un pelage noir et des pattes très courtes.',
				diagnosticFeedback: 'Le texte indique un pelage brun clair et des pattes fines.'
			}
		]
	},
	{
		title: 'Le dromadaire, vaisseau du Sahara',
		animal: 'Le dromadaire',
		paragraphs: [
			'Le dromadaire est un grand animal du Sahara algérien. [[Il]] est fort, calme et très utile aux habitants du désert. Il a une seule bosse sur le dos, un long cou et de longs cils qui protègent ses yeux du sable.',
			'Le dromadaire est herbivore : il mange des plantes et des buissons secs. Cet animal courageux peut marcher plusieurs jours dans le désert sans boire d’eau.'
		],
		glossary: [
			{ term: 'cils', meaning: 'petits poils au bord des paupières' },
			{ term: 'buissons', meaning: 'petites plantes sauvages aux branches serrées' }
		],
		qcmHeader: 'Choisis la bonne réponse : Combien de bosses a le dromadaire ?',
		qcmOptions: ['Une seule bosse', 'Deux grandes bosses', 'Aucune bosse'],
		qcmCorrect: 'Une seule bosse',
		tfItems: [
			{ q: 'Le dromadaire vit dans le Sahara algérien.', a: 'Vrai', mark: '0.5' },
			{ q: 'Ses longs cils protègent ses yeux du sable.', a: 'Vrai', mark: '0.5' },
			{ q: 'Le dromadaire mange de la viande.', a: 'Faux', mark: '0.5' },
			{ q: 'Il peut marcher plusieurs jours sans boire d’eau.', a: 'Vrai', mark: '0.5' }
		],
		extractPrompt: 'Relève du texte : a) deux adjectifs qualificatifs qui décrivent le dromadaire ; b) son régime alimentaire.',
		extractAnswer:
			'a) Deux adjectifs : grand, fort, calme, utile, courageux (deux au choix). b) Il est herbivore (il mange des plantes et des buissons secs).',
		quizPrompt: 'D’après le texte, à quoi servent les longs cils du dromadaire ?',
		quizCorrect: 'Ils protègent ses yeux du sable du désert.',
		quizDistractors: [
			{
				text: 'Ils lui permettent de courir plus vite que le lion.',
				diagnosticFeedback: 'Le texte explique que les longs cils protègent ses yeux du sable.'
			},
			{
				text: 'Ils l’aident à chasser la nuit.',
				diagnosticFeedback: 'Le dromadaire est herbivore ; il ne chasse pas.'
			},
			{
				text: 'Ils gardent de l’eau froide.',
				diagnosticFeedback: 'Relis la dernière phrase du premier paragraphe : les cils protègent les yeux du sable.'
			}
		]
	}
];

const tplCompAnimauxSaharaT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_5ap_t1_comp_animaux_sahara',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب: حيوانات الصحراء الجزائرية (Compréhension : Animaux du Sahara)',
	curriculumLessonId: 'fre_lesson_5ap_t1_adjectif_qualificatif',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 41 + 7);
		const p = T1_SAHARA_PASSAGES[Math.abs(seed - 1) % T1_SAHARA_PASSAGES.length];
		const mcq = buildUniqueMcqOptions(p.quizCorrect, p.quizDistractors, rng);

		const content: ContentBlock[] = [
			buildFrenchPassageBlock({
				title: p.title,
				paragraphs: p.paragraphs,
				source: 'Texte pédagogique adapté — 5AP (Projet 1)',
				glossary: p.glossary
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
			customTitle: 'I. Compréhension de l’écrit',
			points: 4,
			instruction: 'Lis attentivement le texte puis réponds aux questions suivantes :',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `${p.paragraphs.map((s) => s.replace(/\[\[|\]\]/g, '')).join(' ')}\n\nQuestion : ${p.quizPrompt}`,
				questionTextAr: `اقرأ النص عن ${p.animal} ثم اختر الإجابة الصحيحة:\n${p.quizPrompt}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Bonne réponse : ${p.quizCorrect}`
			},
			sujetExercise,
			hints: [
				'اقرأ عنوان النص والفقرتين مرتين لتحديد اسم الحيوان وموطنه وغذائه.',
				'في أسئلة Vrai / Faux قارن كل عبارة حرفياً بما ورد في النص.',
				'تذكّر أن النعت الملاصق (épithète) يجاور الاسم مباشرة بينما المسند (attribut) يأتي بعد الفعل être.'
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
// 2. Compréhension de l'écrit (4 pts): Visite au zoo (Lion, Girafe, Éléphant)
// -------------------------------------------------------------------------------
interface T1ZooPassagePack {
	title: string;
	animal: string;
	paragraphs: string[];
	glossary: Array<{ term: string; meaning: string }>;
	pronounQuestion: string;
	pronounAnswer: string;
	tfItems: Array<{ q: string; a: 'Vrai' | 'Faux'; mark: string }>;
	openQuestion: string;
	openAnswer: string;
	quizPrompt: string;
	quizCorrect: string;
	quizDistractors: Array<{ text: string; diagnosticFeedback: string }>;
}

const T1_ZOO_PASSAGES: readonly T1ZooPassagePack[] = [
	{
		title: 'Au zoo de Ben Aknoun : le lion',
		animal: 'Le lion',
		paragraphs: [
			'Samedi matin, Youssef et sa classe visitent le parc zoologique de Ben Aknoun à Alger. Les élèves observent le lion derrière une grande clôture solide.',
			'Le lion est un grand mammifère carnivore. [[Il]] a une belle crinière dorée, des pattes puissantes et des griffes pointues. Le lion rugit fort : on l’appelle le roi des animaux.'
		],
		glossary: [
			{ term: 'crinière', meaning: 'longs poils autour de la tête du lion' },
			{ term: 'carnivore', meaning: 'animal qui mange de la viande' }
		],
		pronounQuestion: 'Que remplace le mot souligné «Il» dans le deuxième paragraphe ?',
		pronounAnswer: 'Le pronom «Il» remplace «Le lion».',
		tfItems: [
			{ q: 'Youssef visite le zoo de Ben Aknoun avec sa classe.', a: 'Vrai', mark: '0.5' },
			{ q: 'Le lion est un animal herbivore.', a: 'Faux', mark: '0.5' },
			{ q: 'Le lion a une crinière dorée et des griffes pointues.', a: 'Vrai', mark: '0.5' },
			{ q: 'On appelle le lion le roi des oiseaux.', a: 'Faux', mark: '0.5' }
		],
		openQuestion: 'Comment appelle-t-on le lion dans le texte ?',
		openAnswer: 'On appelle le lion le roi des animaux.',
		quizPrompt: 'Dans le texte, que remplace le substitut souligné «Il» ?',
		quizCorrect: 'Le lion',
		quizDistractors: [
			{ text: 'Youssef', diagnosticFeedback: 'Relis la phrase précédente : «Le lion est un grand mammifère carnivore. Il a une belle crinière...».' },
			{ text: 'Le parc zoologique', diagnosticFeedback: 'Un parc ne possède pas de crinière ni de griffes.' },
			{ text: 'Les élèves', diagnosticFeedback: '«Il» est singulier ; «Les élèves» serait remplacé par «Ils».' }
		]
	},
	{
		title: 'La girafe au parc animalier',
		animal: 'La girafe',
		paragraphs: [
			'Aujourd’hui, Meriem découvre la girafe au parc animalier. La girafe est le plus grand animal terrestre. [[Elle]] a un cou très long, de longues pattes et un pelage tacheté de brun.',
			'La girafe est un animal doux et herbivore. Grâce à sa grande taille, elle mange facilement les feuilles fraîches tout en haut des arbres.'
		],
		glossary: [
			{ term: 'tacheté', meaning: 'couvert de petites taches de couleur' },
			{ term: 'doux', meaning: 'calme et gentil' }
		],
		pronounQuestion: 'Que remplace le pronom souligné «Elle» dans le premier paragraphe ?',
		pronounAnswer: 'Le pronom «Elle» remplace «La girafe».',
		tfItems: [
			{ q: 'La girafe est un tout petit animal.', a: 'Faux', mark: '0.5' },
			{ q: 'Elle a un cou très long et un pelage tacheté.', a: 'Vrai', mark: '0.5' },
			{ q: 'La girafe mange de la viande.', a: 'Faux', mark: '0.5' },
			{ q: 'Elle atteint facilement les feuilles en haut des arbres.', a: 'Vrai', mark: '0.5' }
		],
		openQuestion: 'Pourquoi la girafe peut-elle manger les feuilles tout en haut des arbres ?',
		openAnswer: 'Elle le peut grâce à sa grande taille et à son cou très long.',
		quizPrompt: 'D’après le texte sur la girafe, pourquoi mange-t-elle facilement les feuilles en haut des arbres ?',
		quizCorrect: 'Grâce à sa grande taille et son très long cou.',
		quizDistractors: [
			{ text: 'Parce qu’elle vole comme un oiseau.', diagnosticFeedback: 'La girafe est un animal terrestre, elle ne vole pas.' },
			{ text: 'Parce qu’elle a des griffes pointues.', diagnosticFeedback: 'Le texte ne mentionne pas de griffes mais sa grande taille.' },
			{ text: 'Parce qu’elle vit dans un terrier.', diagnosticFeedback: 'C’est le fennec qui vit dans un terrier.' }
		]
	},
	{
		title: 'L’éléphant, le géant paisible',
		animal: 'L’éléphant',
		paragraphs: [
			'Au zoo, Karim observe un grand éléphant gris. [[Il]] a deux grandes oreilles, une longue trompe et deux défenses blanches en ivoire.',
			'L’éléphant est un mammifère herbivore : il boit beaucoup d’eau et mange des feuilles, des fruits et des branches. Cet animal intelligent vit en troupeau.'
		],
		glossary: [
			{ term: 'trompe', meaning: 'long nez souple de l’éléphant' },
			{ term: 'troupeau', meaning: 'groupe d’animaux qui vivent ensemble' }
		],
		pronounQuestion: 'Que remplace le mot souligné «Il» dans le premier paragraphe ?',
		pronounAnswer: 'Le pronom «Il» remplace «un grand éléphant gris» (l’éléphant).',
		tfItems: [
			{ q: 'L’éléphant a une longue trompe et deux grandes oreilles.', a: 'Vrai', mark: '0.5' },
			{ q: 'L’éléphant a un pelage doré.', a: 'Faux', mark: '0.5' },
			{ q: 'L’éléphant mange des feuilles et des fruits.', a: 'Vrai', mark: '0.5' },
			{ q: 'L’éléphant vit seul loin des autres.', a: 'Faux', mark: '0.5' }
		],
		openQuestion: 'De quoi se nourrit l’éléphant d’après le texte ?',
		openAnswer: 'Il mange des feuilles, des fruits et des branches et boit beaucoup d’eau.',
		quizPrompt: 'Dans le texte, quels organes particuliers caractérisent l’éléphant ?',
		quizCorrect: 'Deux grandes oreilles, une longue trompe et deux défenses blanches.',
		quizDistractors: [
			{ text: 'Une bosse sur le dos et des cornes courbées.', diagnosticFeedback: 'Ces traits appartiennent au dromadaire et à la gazelle.' },
			{ text: 'Une crinière dorée et des griffes.', diagnosticFeedback: 'Ce sont les caractéristiques du lion.' },
			{ text: 'Un pelage tacheté et un cou très long.', diagnosticFeedback: 'C’est la description de la girafe.' }
		]
	}
];

const tplCompVisiteZooT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_5ap_t1_comp_visite_zoo',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب: زيارة حديقة الحيوانات والضمائر المعوّضة (Compréhension : Au zoo)',
	curriculumLessonId: 'fre_lesson_5ap_t1_substituts_complement_nom',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 47 + 13);
		const p = T1_ZOO_PASSAGES[Math.abs(seed - 1) % T1_ZOO_PASSAGES.length];
		const mcq = buildUniqueMcqOptions(p.quizCorrect, p.quizDistractors, rng);

		const content: ContentBlock[] = [
			buildFrenchPassageBlock({
				title: p.title,
				paragraphs: p.paragraphs,
				source: 'Texte pédagogique adapté — 5AP (Au zoo)',
				glossary: p.glossary
			}),
			{
				type: 'text',
				content: `1) ${p.pronounQuestion} (1 pt) :\n    Réponse : ........................................................................`,
				answer: `1) ${p.pronounAnswer}`,
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
				content: `3) ${p.openQuestion} (1 pt) :\n    Réponse : ........................................................................`,
				answer: `3) ${p.openAnswer}`,
				mark: '1'
			}
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'I. Compréhension de l’écrit',
			points: 4,
			instruction: 'Lis bien le texte puis réponds aux questions ci-dessous :',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `${p.paragraphs.map((s) => s.replace(/\[\[|\]\]/g, '')).join(' ')}\n\nQuestion : ${p.quizPrompt}`,
				questionTextAr: `اقرأ النص حول ${p.animal} ثم اختر الإجابة الصحيحة:\n${p.quizPrompt}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Bonne réponse : ${p.quizCorrect}`
			},
			sujetExercise,
			hints: [
				'لإيجاد ما يعوّضه الضمير المسطّر (Il أو Elle)، ارجع إلى الجملة التي قبله مباشرة.',
				'تأكّد من النظام الغذائي (herbivore = عاشب / carnivore = لاحم) في أسئلة Vrai / Faux.',
				'أجب عن السؤال الثالث بجملة تامة تبدأ بحرف كبير وتنتهي بنقطة.'
			],
			solutionStepsAr: [
				`الضمير المعوض: ${p.pronounAnswer}`,
				`صح أو خطأ: ${p.tfItems.map((t, i) => `${i + 1}) ${t.a}`).join(' | ')}`,
				`السؤال الثالث: ${p.openAnswer}`
			],
			finalAnswer: p.quizCorrect
		};
	}
};

// -------------------------------------------------------------------------------
// 3. Fonctionnement de la langue (3 pts): Adjectif qualificatif, Substituts & CdN
// -------------------------------------------------------------------------------
const ADJ_ACCORD_POOL = [
	{
		prompt: 'La gazelle a des pattes ............ (fin).',
		answer: 'fines',
		rule: '«pattes» est féminin pluriel (+es).'
	},
	{
		prompt: 'Le fennec a de ............ (grand) oreilles.',
		answer: 'grandes',
		rule: '«oreilles» est féminin pluriel (+es).'
	},
	{
		prompt: 'La lionne est très ............ (fort).',
		answer: 'forte',
		rule: '«La lionne» est féminin singulier (+e).'
	},
	{
		prompt: 'Les dromadaires sont des animaux ............ (calme).',
		answer: 'calmes',
		rule: '«animaux» est masculin pluriel (+s).'
	},
	{
		prompt: 'La girafe est ............ (léger) malgré sa taille.',
		answer: 'légère',
		rule: '«La girafe» est féminin singulier (léger -> légère).'
	},
	{
		prompt: 'Les gazelles sont très ............ (rapide).',
		answer: 'rapides',
		rule: '«Les gazelles» est féminin pluriel (+s).'
	}
] as const;

const SUBSTITUT_CDN_POOL = [
	{
		prompt: 'Complète avec du, de la ou des : Le fennec est un animal ............ Sahara.',
		options: ['du', 'de la', 'des'],
		correct: 'du',
		explain: '«Sahara» est masculin singulier : de + le = du.'
	},
	{
		prompt: 'Complète avec du, de la ou des : Les cornes ............ gazelle sont courbées.',
		options: ['du', 'de la', 'des'],
		correct: 'de la',
		explain: '«gazelle» est féminin singulier : de la gazelle.'
	},
	{
		prompt: 'Complète avec du, de la ou des : Le lion est le roi ............ animaux.',
		options: ['du', 'de la', 'des'],
		correct: 'des',
		explain: '«animaux» est pluriel : de + les = des.'
	},
	{
		prompt: 'Remplace «Les gazelles» par le bon substitut : ............ courent très vite.',
		options: ['Il', 'Ils', 'Elles'],
		correct: 'Elles',
		explain: '«Les gazelles» est féminin pluriel : Elles.'
	},
	{
		prompt: 'Remplace «Le dromadaire» par le bon substitut : ............ vit dans le désert.',
		options: ['Il', 'Elle', 'Ils'],
		correct: 'Il',
		explain: '«Le dromadaire» est masculin singulier : Il.'
	},
	{
		prompt: 'Remplace «Les lions» par le bon substitut : ............ rugissent fort.',
		options: ['Elle', 'Ils', 'Elles'],
		correct: 'Ils',
		explain: '«Les lions» est masculin pluriel : Ils.'
	}
] as const;

const tplLangAdjectifSubstitutT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_5ap_t1_lang_adjectif_substitut_cdn',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'grammaire_syntaxe',
	titleAr: 'التحكم في اللغة: توافق النعت الصفي والضمائر المعوّضة والمضاف إليه',
	curriculumLessonId: 'fre_lesson_5ap_t1_adjectif_qualificatif',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 59 + 19);
		const pickedAdj = rng.pickDistinct(ADJ_ACCORD_POOL, 3);
		const pickedSub = rng.pickDistinct(SUBSTITUT_CDN_POOL, 3);
		const qAdj = pickedAdj[0];

		const wrongForms = [
			qAdj.answer.replace(/es$/, ''),
			qAdj.answer.endsWith('s') ? qAdj.answer.slice(0, -1) : `${qAdj.answer}s`,
			qAdj.answer.endsWith('e') ? `${qAdj.answer}s` : `${qAdj.answer}e`
		];
		const mcq = buildUniqueMcqOptions(
			qAdj.answer,
			wrongForms.map((w) => ({
				text: w,
				diagnosticFeedback: `Vérifie le genre et le nombre du nom : ${qAdj.rule}`
			})),
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: 'Activité 1 : Accorde correctement l’adjectif qualificatif entre parenthèses (1.5 pts) :'
			},
			...pickedAdj.map((item, idx) => ({
				type: 'text' as const,
				content: `${idx + 1}) ${item.prompt}`,
				answer: `${idx + 1}) ${item.prompt.replace('............', item.answer)}`,
				mark: '0.5'
			})),
			{
				type: 'text',
				content: 'Activité 2 : Coche le bon substitut grammatical ou le bon complément du nom (1.5 pts) :'
			},
			{
				type: 'multiple_choice',
				groups: pickedSub.map((item, idx) => ({
					header: `${idx + 1}) ${item.prompt}`,
					options: [...item.options],
					correct: item.correct,
					mark: '0.5'
				}))
			}
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'II. Fonctionnement de la langue (Adjectifs, substituts et complément du nom)',
			points: 3,
			instruction: 'Applique les règles d’accord de l’adjectif, des substituts et du complément du nom :',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `Choisis l’accord correct de l’adjectif : "${qAdj.prompt}"`,
				questionTextAr: `اختر التوافق الصحيح للنعت الصفي في الجملة التالية:\n"${qAdj.prompt}"`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `${qAdj.answer} — ${qAdj.rule}`
			},
			sujetExercise,
			hints: [
				'انظر دائماً إلى الاسم الموصوف: هل هو مذكر أم مؤنث؟ مفرد أم جمع؟',
				'للمضاف إليه: نستعمل du للمذكر المفرد، de la للمؤنث المفرد، وdes للجمع.',
				'الضمائر المعوضة: Il (مذكر مفرد)، Elle (مؤنث مفرد)، Ils (مذكر جمع)، Elles (مؤنث جمع).'
			],
			solutionStepsAr: [
				...pickedAdj.map((a, i) => `النشاط 1 (${i + 1}): ${a.answer} (${a.rule})`),
				...pickedSub.map((s, i) => `النشاط 2 (${i + 1}): ${s.correct} (${s.explain})`)
			],
			finalAnswer: qAdj.answer
		};
	}
};

// -------------------------------------------------------------------------------
// 4. Fonctionnement de la langue (3 pts): Présent (1er/2e gr., être/avoir) & Types de phrases
// -------------------------------------------------------------------------------
const PRESENT_ITEMS = [
	{
		prompt: 'Le fennec ............ (habiter) dans le Sahara.',
		answer: 'habite',
		explain: '1er groupe avec «il» : -e (habite).'
	},
	{
		prompt: 'Les gazelles ............ (bondir) avec souplesse.',
		answer: 'bondissent',
		explain: '2e groupe avec «elles» : -issent (bondissent).'
	},
	{
		prompt: 'Nous ............ (manger) des dattes sucrées.',
		answer: 'mangeons',
		explain: 'Verbe en -ger avec «nous» : on garde le «e» (mangeons).'
	},
	{
		prompt: 'Les dromadaires ............ (avoir) de longs cils.',
		answer: 'ont',
		explain: 'Verbe «avoir» avec «ils» : ont.'
	},
	{
		prompt: 'Le lion ............ (être) le roi des animaux.',
		answer: 'est',
		explain: 'Verbe «être» avec «il» : est.'
	},
	{
		prompt: 'Tu ............ (nourrir) les oiseaux du jardin.',
		answer: 'nourris',
		explain: '2e groupe avec «tu» : -is (nourris).'
	}
] as const;

const TYPES_PHRASES_ITEMS = [
	{
		sentence: 'Où vit la gazelle dorcas ?',
		type: 'Interrogative',
		options: ['Déclarative', 'Interrogative', 'Exclamative', 'Impérative']
	},
	{
		sentence: 'Le fennec chasse pendant la nuit.',
		type: 'Déclarative',
		options: ['Déclarative', 'Interrogative', 'Exclamative', 'Impérative']
	},
	{
		sentence: 'Comme ce lion est fort !',
		type: 'Exclamative',
		options: ['Déclarative', 'Interrogative', 'Exclamative', 'Impérative']
	},
	{
		sentence: 'Respecte les animaux du zoo !',
		type: 'Impérative',
		options: ['Déclarative', 'Interrogative', 'Exclamative', 'Impérative']
	},
	{
		sentence: 'Est-ce que le dromadaire est herbivore ?',
		type: 'Interrogative',
		options: ['Déclarative', 'Interrogative', 'Exclamative', 'Impérative']
	},
	{
		sentence: 'Quelle jolie gazelle du Sahara !',
		type: 'Exclamative',
		options: ['Déclarative', 'Interrogative', 'Exclamative', 'Impérative']
	}
] as const;

const tplLangPresentTypesT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_5ap_t1_lang_present_types_phrases',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'conjugaison_temps',
	titleAr: 'التحكم في اللغة: المضارع الدلالي وأنواع الجمل وعلامات الترقيم',
	curriculumLessonId: 'fre_lesson_5ap_t1_present_indicatif',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 73 + 29);
		const pickedPres = rng.pickDistinct(PRESENT_ITEMS, 3);
		const pickedTypes = rng.pickDistinct(TYPES_PHRASES_ITEMS, 3);
		const qType = pickedTypes[0];

		const mcq = buildUniqueMcqOptions(
			qType.type,
			qType.options
				.filter((o) => o !== qType.type)
				.map((o) => ({
					text: o,
					diagnosticFeedback:
						'Regarde la ponctuation (. ? !) et le sens : information = Déclarative, question = Interrogative, sentiment = Exclamative, ordre = Impérative.'
				})),
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: 'Activité 1 : Conjugue les verbes entre parenthèses au présent de l’indicatif (1.5 pts) :'
			},
			...pickedPres.map((item, idx) => ({
				type: 'text' as const,
				content: `${idx + 1}) ${item.prompt}`,
				answer: `${idx + 1}) ${item.prompt.replace('............', item.answer)}`,
				mark: '0.5'
			})),
			{
				type: 'text',
				content: 'Activité 2 : Coche le type de chaque phrase (1.5 pts) :'
			},
			{
				type: 'multiple_choice',
				groups: pickedTypes.map((item, idx) => ({
					header: `${idx + 1}) «${item.sentence}»`,
					options: [...item.options],
					correct: item.type,
					mark: '0.5'
				}))
			}
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'II. Fonctionnement de la langue (Présent de l’indicatif et types de phrases)',
			points: 3,
			instruction: 'Conjugue au présent puis identifie le type de chaque phrase :',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `Quel est le type de la phrase suivante : «${qType.sentence}» ?`,
				questionTextAr: `ما نوع الجملة التالية:\n«${qType.sentence}» ؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `C’est une phrase ${qType.type.toLowerCase()}.`
			},
			sujetExercise,
			hints: [
				'المجموعة الأولى (-er) تنتهي بـ: -e, -es, -e, -ons, -ez, -ent (ومع -ger نكتب -eons مع nous).',
				'المجموعة الثانية (-ir) تنتهي بـ: -is, -is, -it, -issons, -issez, -issent.',
				'انظر إلى علامة الترقيم والفاعل: (?) استفهامية، (!) مع شعور تعجبية، وفعل أمر بلا فاعل أمرية.'
			],
			solutionStepsAr: [
				...pickedPres.map((p, i) => `التصريف (${i + 1}): ${p.answer} (${p.explain})`),
				...pickedTypes.map((t, i) => `نوع الجملة (${i + 1}): ${t.type}`)
			],
			finalAnswer: qType.type
		};
	}
};

// -------------------------------------------------------------------------------
// 5. Production écrite (3 pts): Fiche descriptive d'un animal du Sahara
// -------------------------------------------------------------------------------
const T1_ANIMAL_WRITING_PROFILES = [
	{
		animal: 'Le fennec',
		title: 'Le fennec',
		noms: 'le fennec, animal sauvage, le Sahara algérien, grandes oreilles, fourrure couleur sable, insectes, lézards',
		verbes: 'être, vivre, avoir, chasser, se nourrir de',
		adjectifs: 'petit, sauvage, rapide, doux',
		openingCorrect: 'Le fennec est un petit animal sauvage qui vit dans le Sahara algérien.',
		model:
			'Le fennec est un petit animal sauvage. Il vit dans le Sahara algérien. Il a de très grandes oreilles et une fourrure douce couleur sable. La nuit, il chasse des insectes et des petits lézards. Cet animal du désert est très rapide.'
	},
	{
		animal: 'La gazelle dorcas',
		title: 'La gazelle dorcas',
		noms: 'la gazelle, animal sauvage, le désert, pattes fines, deux cornes, herbes, feuilles',
		verbes: 'être, habiter, avoir, courir, se nourrir de',
		adjectifs: 'belle, légère, rapide, herbivore',
		openingCorrect: 'La gazelle dorcas est un bel animal sauvage qui vit dans le Sahara.',
		model:
			'La gazelle dorcas est un bel animal sauvage. Elle habite dans le Sahara algérien. Elle a des pattes fines et deux petites cornes courbées. Elle est légère et très rapide. Cet animal herbivore se nourrit d’herbes et de feuilles.'
	},
	{
		animal: 'Le dromadaire',
		title: 'Le dromadaire',
		noms: 'le dromadaire, le Sahara, une bosse, un long cou, longs cils, plantes du désert',
		verbes: 'être, vivre, avoir, marcher, manger',
		adjectifs: 'grand, fort, calme, utile, herbivore',
		openingCorrect: 'Le dromadaire est un grand animal utile qui vit dans le Sahara algérien.',
		model:
			'Le dromadaire est un grand animal utile. Il vit dans le Sahara algérien. Il a une seule bosse sur le dos, un long cou et de longs cils. Il est fort et calme. Cet animal herbivore mange des plantes du désert.'
	}
] as const;

const tplWrittenFicheAnimalT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_5ap_t1_written_fiche_animal',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'production_ecrite',
	titleAr: 'الإنتاج الكتابي: كتابة بطاقة وصفية لحيوان من الصحراء (Fiche descriptive d’un animal)',
	curriculumLessonId: 'fre_lesson_5ap_t1_fiche_descriptive_animal',
	defaultPoints: 3,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 83 + 37);
		const p = T1_ANIMAL_WRITING_PROFILES[Math.abs(seed - 1) % T1_ANIMAL_WRITING_PROFILES.length];

		const mcq = buildUniqueMcqOptions(
			p.openingCorrect,
			[
				{
					text: `${p.animal.toLowerCase()} sont un petit animal qui vit au sahara`,
					diagnosticFeedback: 'Attention à la majuscule, au point final et à l’accord du verbe (est, pas sont).'
				},
				{
					text: `${p.animal} a un grand animal sauvage du Sahara.`,
					diagnosticFeedback: 'Pour présenter l’animal, on utilise le verbe «être» (est), pas «avoir» (a).'
				},
				{
					text: `${p.animal} vivra demain dans une classe.`,
					diagnosticFeedback: 'La fiche descriptive se rédige au présent de l’indicatif et décrit l’habitat réel.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			buildFrenchWrittenProductionBlock({
				sujetUnTitle: `Production écrite : Présenter «${p.animal}»`,
				sujetUnPrompt: `Rédige un court paragraphe de 4 à 5 phrases pour présenter «${p.animal}» à tes camarades en t’aidant de la boîte à outils ci-dessous.`,
				sujetUnNotes: [
					'Donne un titre à ton paragraphe et utilise le présent de l’indicatif.',
					'Emploie la 3e personne (Il / Elle) pour éviter la répétition.',
					'N’oublie pas les majuscules, la ponctuation et l’accord des adjectifs.',
					`Noms utiles : ${p.noms}.`,
					`Verbes utiles : ${p.verbes}.`,
					`Adjectifs utiles : ${p.adjectifs}.`
				],
				modelAnswer: `${p.title}\n${p.model}`,
				rubricSummary:
					'Pertinence et respect de la consigne (1 pt) | Emploi du présent, des substituts et des adjectifs (1 pt) | Ponctuation, majuscules et soin (1 pt)',
				mark: '3'
			})
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'III. Production écrite',
			points: 3,
			instruction: 'Aide-toi de la boîte à outils pour rédiger une fiche descriptive soignée :',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `Quelle phrase d’ouverture convient le mieux pour présenter «${p.animal}» dans une fiche descriptive ?`,
				questionTextAr: `اختر الجملة الافتتاحية الصحيحة لتقديم «${p.animal}» في البطاقة الوصفية:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Meilleure phrase : ${p.openingCorrect}`
			},
			sujetExercise,
			hints: [
				'ابدأ بعنوان بسيط ثم قدّم الحيوان وموطنه باستعمال est و vit في المضارع.',
				'استعمل Il أو Elle من الجملة الثانية مع الفعل a لوصف أعضاء جسم الحيوان.',
				'اذكر غذاءه في الجملة الأخيرة وراجع الحروف الكبيرة والنقط وتوافق النعوت.'
			],
			solutionStepsAr: [
				`العنوان وتقديم الحيوان: ${p.openingCorrect}`,
				`الوصف الجسدي والغذاء بالاعتماد على صندوق الأدوات (${p.verbes}).`,
				`الفقرة النموذجية: ${p.model}`
			],
			finalAnswer: p.openingCorrect
		};
	}
};

export const TEMPLATES_5AP_T1: FrenchParameterizedTemplate[] = [
	tplCompAnimauxSaharaT1,
	tplCompVisiteZooT1,
	tplLangAdjectifSubstitutT1,
	tplLangPresentTypesT1,
	tplWrittenFicheAnimalT1
];
