import type {
	Difficulty,
	FrenchGeneratedExerciseInstance,
	FrenchParameterizedTemplate
} from '../../types';
import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildFrenchPassageBlock,
	buildFrenchWordFamilyTableBlock,
	buildFrenchWrittenProductionBlock
} from '../../french-helpers';

// ═══════════════════════════════════════════════════════════════════════════════
// Template 1 : Compréhension de l'écrit (07 pts) — Économiser l'eau
// ═══════════════════════════════════════════════════════════════════════════════
const comp1amT3Eau: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1am_t3_comp_economiser_eau',
	grade: '1am',
	trimesterId: 't3',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (1): اقتصاد الماء وثروة السدود (Économiser l’eau, geste citoyen)',
	curriculumLessonId: 'fre_lesson_1am_t3_imperatif_devoir',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'Économisons l’eau chaque jour !',
				source: 'Texte prescriptif adapté — Protection des ressources en eau (1AM)',
				paragraphs: [
					'L’eau potable est un bienfait précieux dont la quantité est limitée sur notre planète. Pour éviter le ((gaspillage)), chaque famille doit adopter des gestes simples et responsables à la maison.',
					'D’abord, ferme bien le robinet pendant le brossage des dents ou le savonnage des mains. Ensuite, préfère une douche courte plutôt qu’un long bain. Puis, il faut réparer rapidement toute fuite d’eau dans la cuisine ou la salle de bain. Enfin, arrose les plantes le soir afin que l’eau ne s’évapore pas au soleil. Grâce à [[ces]] efforts quotidiens, nous préserverons l’eau pour demain !'
				],
				glossary: [
					{ term: 'potable', meaning: 'que l’on peut boire sans danger pour la santé' },
					{ term: 's’évapore', meaning: 'se transforme en vapeur sous l’effet de la chaleur' }
				],
				qcmHeader: '1) Ce texte donne surtout :',
				qcmOptions: ['des consignes pour économiser l’eau', 'une histoire sur un voyage en bateau', 'une recette de cuisine'],
				qcmCorrect: 'des consignes pour économiser l’eau',
				tf: [
					{ q: 'L’eau potable existe en quantité illimitée sur Terre.', a: 'Faux', c: 'Sa quantité est limitée sur notre planète.', mark: '1' },
					{ q: 'Une douche courte consomme moins d’eau qu’un long bain.', a: 'Vrai', mark: '1' },
					{ q: 'Il vaut mieux arroser les plantes le soir.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes d’après le texte (02 pts) :\n\na) Pourquoi faut-il arroser les plantes le soir ?\n\nb) Relève deux connecteurs d’énumération utilisés dans le deuxième paragraphe.',
				compA: 'a) Pour que l’eau ne s’évapore pas sous le soleil.\n\nb) « D’abord », « Ensuite », « Puis » ou « Enfin » (deux au choix).',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Un verbe conjugué à l’impératif présent.\n\nb) Le verbe dont est dérivé le nom « gaspillage ».',
				lexA: 'a) « ferme », « préfère » ou « arrose ».\n\nb) Le verbe « gaspiller ».',
				quizQ: 'Dans le texte « Économisons l’eau chaque jour ! », quel est le type dominant de ce texte ?',
				correctOpt: 'Texte prescriptif (qui donne des consignes)',
				distractors: [
					{ text: 'Texte narratif', diagnosticFeedback: 'Ce texte ne raconte pas une histoire au passé.' },
					{ text: 'Texte poétique', diagnosticFeedback: 'Il n’y a ni vers ni rimes.' },
					{ text: 'Dialogue théâtral', diagnosticFeedback: 'Aucun personnage ne dialogue ici.' }
				]
			},
			{
				title: 'Halte au gaspillage de l’eau à l’école !',
				source: 'Texte prescriptif adapté — Club d’écologie du collège (1AM)',
				paragraphs: [
					'À l’école comme à la maison, chaque goutte d’eau compte. Pour protéger cette richesse vitale, les élèves doivent respecter quatre règles essentielles dans la cour et les sanitaires.',
					'Premièrement, n’ouvrez jamais un robinet inutilement et refermez-le aussitôt après usage. Deuxièmement, utilisez une gourde réutilisable au lieu de laisser couler l’eau longtemps. De plus, prévenez immédiatement le surveillant si vous voyez une fuite. Finalement, sensibilisez vos camarades à l’importance de l’eau ; ainsi, nos réserves dureront plus longtemps.'
				],
				glossary: [
					{ term: 'sanitaires', meaning: 'lavabos et toilettes de l’établissement' },
					{ term: 'sensibilisez', meaning: 'faites comprendre l’importance d’une cause' }
				],
				qcmHeader: '1) À qui s’adressent les consignes de ce texte ?',
				qcmOptions: ['Aux élèves du collège', 'Aux pilotes d’avion', 'Aux pêcheurs en mer'],
				qcmCorrect: 'Aux élèves du collège',
				tf: [
					{ q: 'Il faut refermer le robinet aussitôt après usage.', a: 'Vrai', mark: '1' },
					{ q: 'En cas de fuite d’eau, l’élève ne doit prévenir personne.', a: 'Faux', c: 'Il faut prévenir immédiatement le surveillant.', mark: '1' },
					{ q: 'L’utilisation d’une gourde aide à éviter le gaspillage.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Que doivent faire les élèves s’ils remarquent une fuite d’eau ?\n\nb) À quel temps est conjugué le verbe « dureront » à la fin du texte ?',
				compA: 'a) Ils doivent prévenir immédiatement le surveillant.\n\nb) Il est conjugué au futur simple.',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Un verbe conjugué à l’impératif présent (2e pers. du pluriel).\n\nb) Deux connecteurs d’énumération.',
				lexA: 'a) « ouvrez », « refermez », « utilisez », « prévenez » ou « sensibilisez ».\n\nb) « Premièrement », « Deuxièmement », « De plus », « Finalement » (deux au choix).',
				quizQ: 'Dans le texte « Halte au gaspillage de l’eau à l’école ! », quelle est la valeur de la dernière phrase au futur simple ?',
				correctOpt: 'Montrer le résultat positif attendu pour l’avenir',
				distractors: [
					{ text: 'Raconter un fait passé', diagnosticFeedback: 'Le futur simple exprime l’avenir, pas le passé.' },
					{ text: 'Définir le mot robinet', diagnosticFeedback: 'Cette phrase n’est pas une définition.' },
					{ text: 'Poser une question', diagnosticFeedback: 'La phrase se termine par un point.' }
				]
			},
			{
				title: 'Préservons les barrages et les sources d’Algérie',
				source: 'Texte prescriptif adapté — Environnement et citoyenneté (1AM)',
				paragraphs: [
					'En Algérie, les barrages et les sources naturelles alimentent les villes, les villages et les champs agricoles. Lorsque les pluies se font rares, la ((préservation)) de l’eau devient un devoir pour tous les citoyens.',
					'D’abord, il faut éviter de laver les voitures ou les trottoirs à grande eau : un simple seau suffit. Ensuite, récupérons l’eau de pluie pour arroser les jardins familiaux. Puis, ne jetons aucun déchet près des oueds et des sources afin de garder l’eau propre. Enfin, apprenons aux plus jeunes à respecter chaque goutte : notre pays restera ainsi fertile et accueillant.'
				],
				glossary: [
					{ term: 'barrages', meaning: 'grands réservoirs qui stockent l’eau de pluie et des rivières' },
					{ term: 'fertile', meaning: 'qui permet aux cultures et aux arbres de bien pousser' }
				],
				qcmHeader: '1) À quoi servent les barrages et les sources naturelles selon le texte ?',
				qcmOptions: ['À alimenter les villes, les villages et les champs', 'À construire des routes', 'À fabriquer du plastique'],
				qcmCorrect: 'À alimenter les villes, les villages et les champs',
				tf: [
					{ q: 'Il est conseillé de laver les trottoirs à grande eau.', a: 'Faux', c: 'Il faut éviter de les laver à grande eau ; un simple seau suffit.', mark: '1' },
					{ q: 'L’eau de pluie récupérée peut servir à arroser les jardins.', a: 'Vrai', mark: '1' },
					{ q: 'Jeter des déchets près des oueds pollue l’eau.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Comment peut-on arroser les jardins familiaux de manière économique ?\n\nb) À quelle personne sont conjugués les verbes à l’impératif « récupérons, jetons, apprenons » ?',
				compA: 'a) En récupérant l’eau de pluie.\n\nb) À la 1re personne du pluriel (nous).',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Une tournure impersonnelle exprimant le devoir.\n\nb) Le nom dérivé du verbe « préserver » dans le premier paragraphe.',
				lexA: 'a) « il faut éviter ».\n\nb) « la préservation ».',
				quizQ: 'Quel suffixe a permis de former le nom « préservation » à partir du verbe « préserver » ?',
				correctOpt: '-ation',
				distractors: [
					{ text: '-age', diagnosticFeedback: '« -age » donne des noms comme « recyclage » ou « nettoyage ».' },
					{ text: '-ment', diagnosticFeedback: '« -ment » donne des noms comme « reboisement ».' },
					{ text: '-eur', diagnosticFeedback: '« -eur » désigne plutôt une personne ou un appareil.' }
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
				{ type: 'text', content: '2) Réponds par « Vrai » ou « Faux » en justifiant les réponses fausses (03 pts) :' },
				{ type: 'true_false', items: v.tf },
				{ type: 'text', content: v.compQ, answer: v.compA, mark: '2' },
				{ type: 'text', content: v.lexQ, answer: v.lexA, mark: '1' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't3',
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
				'اقرأ النص الإرشادي وانتبه إلى أفعال الأمر وروابط التعداد (D’abord, Ensuite, Enfin).',
				'تعرّف على الأسماء المشتقة من الأفعال (la nominalisation) في النص.',
				'في Vrai / Faux ارجع دائما إلى الجملة الدقيقة في النص للتعليل.'
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
// Template 2 : Compréhension de l'écrit (07 pts) — Protéger les forêts & Tri
// ═══════════════════════════════════════════════════════════════════════════════
const comp1amT3Forets: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1am_t3_comp_proteger_forets',
	grade: '1am',
	trimesterId: 't3',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (2): حماية الغابات الجزائرية والسد الأخضر وفرز النفايات',
	curriculumLessonId: 'fre_lesson_1am_t3_connecteurs_enumeration',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'Protégeons nos forêts algériennes !',
				source: 'Texte prescriptif adapté — Protection de la nature (1AM)',
				paragraphs: [
					'La forêt est le poumon vert de notre pays : les cèdres, les chênes et les pins purifient l’air, abritent les oiseaux et protègent les sols contre l’érosion. Chaque été, le feu menace pourtant [[ces]] espaces magnifiques.',
					'Pour défendre nos forêts, suivons ces consignes indispensables. D’abord, n’allume jamais de feu près des arbres ou des herbes sèches. Ensuite, ramasse tous tes déchets, surtout les bouteilles en verre qui peuvent déclencher un incendie au soleil. Enfin, participe aux campagnes de ((reboisement)) dans ta commune. Ainsi, la forêt algérienne vivra longtemps !'
				],
				glossary: [
					{ term: 'érosion', meaning: 'usure de la terre par la pluie et le vent' },
					{ term: 'reboisement', meaning: 'action de planter de nouveaux arbres' }
				],
				qcmHeader: '1) Pourquoi appelle-t-on la forêt « le poumon vert » ?',
				qcmOptions: ['Parce que les arbres purifient l’air', 'Parce qu’elle produit du bruit', 'Parce qu’elle pousse dans la mer'],
				qcmCorrect: 'Parce que les arbres purifient l’air',
				tf: [
					{ q: 'Les arbres protègent les sols contre l’érosion.', a: 'Vrai', mark: '1' },
					{ q: 'Les bouteilles en verre laissées en forêt sont sans danger.', a: 'Faux', c: 'Elles peuvent déclencher un incendie au soleil.', mark: '1' },
					{ q: 'Participer au reboisement aide à protéger la forêt.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Cite deux types d’arbres algériens mentionnés dans le premier paragraphe.\n\nb) Quelles sont les deux premières consignes pour éviter les incendies ?',
				compA: 'a) Les cèdres, les chênes et les pins (deux au choix).\n\nb) Ne jamais allumer de feu près des arbres et ramasser tous ses déchets (surtout le verre).',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Un nom formé avec le suffixe « -ement ».\n\nb) Un verbe conjugué au futur simple.',
				lexA: 'a) « reboisement ».\n\nb) « vivra ».',
				quizQ: 'Dans le texte « Protégeons nos forêts algériennes ! », pourquoi a-t-on écrit « ces espaces » avec « c » ?',
				correctOpt: 'Parce que « ces » est un déterminant démonstratif (on désigne ces espaces)',
				distractors: [
					{ text: 'Parce que « ces » indique la possession', diagnosticFeedback: 'La possession s’écrit avec « s » : « ses ».' },
					{ text: 'Parce que « ces » est un verbe', diagnosticFeedback: '« ces » est un déterminant, pas un verbe.' },
					{ text: 'Parce que « espaces » est singulier', diagnosticFeedback: '« espaces » est au pluriel.' }
				]
			},
			{
				title: 'Le Barrage Vert, un bouclier contre le désert',
				source: 'Texte prescriptif et explicatif adapté — Écologie en Algérie (1AM)',
				paragraphs: [
					'Le Barrage Vert est une immense bande d’arbres plantée en Algérie pour freiner l’avancée du désert vers le nord. Ce projet écologique protège les terres agricoles et améliore le climat des hauts plateaux.',
					'Chaque citoyen peut contribuer à la ((plantation)) et à la sauvegarde des arbres. D’abord, il faut planter des espèces adaptées au climat, comme le pin d’Alep, l’olivier et le pistachier. Ensuite, protégez les jeunes pousses et arrosez-les durant les premières années. Enfin, ne coupez jamais un arbre sans nécessité : nos enfants profiteront demain d’une nature verdoyante.'
				],
				glossary: [
					{ term: 'bouclier', meaning: 'protection solide contre un danger' },
					{ term: 'jeunes pousses', meaning: 'petits arbres nouvellement plantés' }
				],
				qcmHeader: '1) Quel est le rôle principal du Barrage Vert en Algérie ?',
				qcmOptions: ['Freiner l’avancée du désert et protéger les terres', 'Construire des usines polluantes', 'Assécher les rivières'],
				qcmCorrect: 'Freiner l’avancée du désert et protéger les terres',
				tf: [
					{ q: 'Le Barrage Vert améliore le climat des hauts plateaux.', a: 'Vrai', mark: '1' },
					{ q: 'Le pin d’Alep et l’olivier sont adaptés au climat algérien.', a: 'Vrai', mark: '1' },
					{ q: 'Il n’est pas nécessaire d’arroser les jeunes pousses au début.', a: 'Faux', c: 'Il faut les arroser durant les premières années.', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Cite deux espèces d’arbres recommandées dans le texte.\n\nb) Quel est le verbe de la même famille que « plantation » ?',
				compA: 'a) Le pin d’Alep, l’olivier et le pistachier (deux au choix).\n\nb) Le verbe « planter ».',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Une consigne négative à l’impératif présent.\n\nb) Un verbe au futur simple dans la dernière phrase.',
				lexA: 'a) « ne coupez jamais un arbre sans nécessité ».\n\nb) « profiteront ».',
				quizQ: 'Quelle est la forme correcte du verbe « planter » à l’impératif présent avec « vous » ?',
				correctOpt: 'Plantez des oliviers !',
				distractors: [
					{ text: 'Vous plantez des oliviers !', diagnosticFeedback: 'À l’impératif, on ne met jamais de pronom sujet.' },
					{ text: 'Plantons des oliviers !', diagnosticFeedback: '« Plantons » correspond à « nous », pas à « vous ».' },
					{ text: 'Planterez des oliviers !', diagnosticFeedback: '« Planterez » est au futur simple.' }
				]
			},
			{
				title: 'Le tri des déchets pour une ville propre',
				source: 'Texte prescriptif adapté — Propreté urbaine (1AM)',
				paragraphs: [
					'Chaque jour, nos quartiers produisent de nombreux déchets : papier, plastique, verre et restes alimentaires. Le ((recyclage)) permet de transformer certains matériaux usagés en nouveaux objets utiles.',
					'Pour garder notre ville propre, appliquons quatre gestes faciles. D’abord, jette toujours tes papiers et tes emballages dans la poubelle, jamais par terre. Ensuite, sépare le plastique et le carton lorsque des bacs de tri existent. Puis, utilise un sac en tissu réutilisable pour faire les courses. Enfin, respecte le travail des agents de nettoyage : notre quartier sera propre et agréable pour tous.'
				],
				glossary: [
					{ term: 'emballages', meaning: 'enveloppes en carton ou en plastique qui entourent un produit' },
					{ term: 'réutilisable', meaning: 'que l’on peut employer plusieurs fois' }
				],
				qcmHeader: '1) À quoi sert le recyclage selon le premier paragraphe ?',
				qcmOptions: ['À transformer des matériaux usagés en nouveaux objets utiles', 'À jeter les déchets dans la rue', 'À brûler les arbres'],
				qcmCorrect: 'À transformer des matériaux usagés en nouveaux objets utiles',
				tf: [
					{ q: 'Le papier, le plastique et le verre sont des déchets recyclables.', a: 'Vrai', mark: '1' },
					{ q: 'Le texte conseille d’utiliser un sac en tissu réutilisable.', a: 'Vrai', mark: '1' },
					{ q: 'On peut jeter les petits emballages par terre dans le quartier.', a: 'Faux', c: 'Il faut les jeter dans la poubelle, jamais par terre.', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Quel type de sac le texte recommande-t-il pour faire les courses ?\n\nb) Quels mots du texte sont formés avec le suffixe « -age » ?',
				compA: 'a) Un sac en tissu réutilisable.\n\nb) « recyclage », « emballages » et « nettoyage ».',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Un verbe du 1er groupe à l’impératif présent (2e pers. sing.).\n\nb) Le verbe « être » conjugué au futur simple.',
				lexA: 'a) « jette », « sépare », « utilise » ou « respecte ».\n\nb) « sera ».',
				quizQ: 'Quel est le verbe qui a permis de former le nom « nettoyage » ?',
				correctOpt: 'nettoyer',
				distractors: [
					{ text: 'nettoir', diagnosticFeedback: 'Ce verbe n’existe pas : c’est un verbe du 1er groupe en -er.' },
					{ text: 'nettoyeur', diagnosticFeedback: '« nettoyeur » est un nom, pas un verbe.' },
					{ text: 'net', diagnosticFeedback: '« net » est un adjectif qualificatif.' }
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
			instruction: 'Lis le texte ci-dessous puis réponds aux questions avec précision :',
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
			trimesterId: 't3',
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
				'اقرأ النص وحدّد النصائح الإرشادية والروابط التي تنظّمها.',
				'انتبه للواحق الاشتقاق الاسمي (-tion, -ment, -age) في النص.',
				'راجع تصريف الأمر الحاضر والمستقبل البسيط قبل استخراج الأفعال.'
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
// Template 3 : Fonctionnement de la langue (06 pts) — Impératif, Nominalisation, Connecteurs
// ═══════════════════════════════════════════════════════════════════════════════
const expl1amT3ImperatifNominalisation: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1am_t3_expl_imperatif_nominalisation',
	grade: '1am',
	trimesterId: 't3',
	domain: 'vocabulaire_lexique',
	titleAr: 'البناء اللغوي (1): الأمر الحاضر و il faut، والاشتقاق الاسمي، وروابط التعداد',
	curriculumLessonId: 'fre_lesson_1am_t3_nominalisation_familles',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const sets = [
			{
				ex1Q: 'Exercice 1 (02 pts) : Transforme les consignes suivantes à l’impératif présent (2e pers. du singulier, puis 1re pers. du pluriel) :\n\n1) Il faut fermer le robinet. (tu) : ......\n\n2) Il ne faut pas gaspiller l’eau. (tu) : ......\n\n3) Il faut protéger nos forêts. (nous) : ......\n\n4) Il faut agir pour la planète. (nous) : ......',
				ex1A: '1) Ferme le robinet !   2) Ne gaspille pas l’eau !   3) Protégeons nos forêts !   4) Agissons pour la planète !',
				tableIntro: 'Exercice 2 (02 pts) : Complète le tableau de famille de mots (Verbe / Nom / Adjectif) :',
				rows: [
					{
						verbe: { given: true, value: 'protéger' },
						nom: { value: 'la protection', mark: '0.5' },
						adjectif: { value: 'protecteur / protégé', mark: '0.5' }
					},
					{
						verbe: { value: 'polluer', mark: '0.5' },
						nom: { given: true, value: 'la pollution' },
						adjectif: { value: 'pollué / polluant', mark: '0.5' }
					}
				],
				ex3Q: 'Exercice 3 (02 pts) : Remets en ordre les consignes suivantes en complétant avec (Enfin / D’abord / Ensuite) :\n\n1) ......, creuse un trou dans la terre.\n\n2) ......, pose délicatement le jeune olivier.\n\n3) ......, arrose l’arbre avec de l’eau propre.',
				ex3A: '1) D’abord, creuse un trou dans la terre.\n\n2) Ensuite, pose délicatement le jeune olivier.\n\n3) Enfin, arrose l’arbre avec de l’eau propre.',
				quizQ: 'Quelle est la nominalisation correcte de la phrase : « On recycle le papier. » ?',
				correctOpt: 'Le recyclage du papier.',
				distractors: [
					{ text: 'La recyclation du papier.', diagnosticFeedback: 'Le nom dérivé de « recycler » prend le suffixe « -age ».' },
					{ text: 'Recyclez le papier !', diagnosticFeedback: 'C’est une phrase impérative, pas une phrase nominale.' },
					{ text: 'Il faut recycler le papier.', diagnosticFeedback: 'Cette phrase contient un verbe conjugué.' }
				]
			},
			{
				ex1Q: 'Exercice 1 (02 pts) : Remplace l’impératif par « Il faut + infinitif » ou « Il ne faut pas + infinitif » :\n\n1) Plantez des arbres dans le quartier !\n\n2) Ne jetez pas de plastique dans la mer !',
				ex1A: '1) Il faut planter des arbres dans le quartier.\n\n2) Il ne faut pas jeter de plastique dans la mer.',
				tableIntro: 'Exercice 2 (02 pts) : Complète le tableau de nominalisation et famille de mots :',
				rows: [
					{
						verbe: { given: true, value: 'nettoyer' },
						nom: { value: 'le nettoyage', mark: '0.5' },
						adjectif: { value: 'nettoyé', mark: '0.5' }
					},
					{
						verbe: { value: 'reboiser', mark: '0.5' },
						nom: { given: true, value: 'le reboisement' },
						adjectif: { value: 'reboisé', mark: '0.5' }
					}
				],
				ex3Q: 'Exercice 3 (02 pts) : Barre mentalement et recopie l’intrus dans chaque famille de mots :\n\n1) planter — plantation — planète — replanter.\n\n2) propre — propreté — proposer — proprement.',
				ex3A: '1) L’intrus est « planète ».\n\n2) L’intrus est « proposer ».',
				quizQ: 'Quelle est la forme correcte à l’impératif présent (2e pers. du singulier) du verbe « planter » ?',
				correctOpt: 'Plante un arbre !',
				distractors: [
					{ text: 'Plantes un arbre !', diagnosticFeedback: 'Les verbes du 1er groupe ne prennent pas de « s » à l’impératif avec « tu ».' },
					{ text: 'Tu plante un arbre !', diagnosticFeedback: 'On n’écrit jamais le pronom sujet à l’impératif.' },
					{ text: 'Planter un arbre !', diagnosticFeedback: '« Planter » est à l’infinitif.' }
				]
			},
			{
				ex1Q: 'Exercice 1 (02 pts) : Conjugue les verbes entre parenthèses à l’impératif présent à la personne indiquée :\n\n1) (Économiser, 2e pers. sing.) ...... l’eau potable !\n\n2) (Être, 2e pers. pl.) ...... responsables devant la nature !\n\n3) (Choisir, 1re pers. pl.) ...... des sacs en tissu !\n\n4) (Respecter, 2e pers. pl.) ...... les espaces verts !',
				ex1A: '1) Économise   2) Soyez   3) Choisissons   4) Respectez',
				tableIntro: 'Exercice 2 (02 pts) : Complète le tableau de famille de mots :',
				rows: [
					{
						verbe: { given: true, value: 'gaspiller' },
						nom: { value: 'le gaspillage', mark: '0.5' },
						adjectif: { value: 'gaspillé', mark: '0.5' }
					},
					{
						verbe: { value: 'préserver', mark: '0.5' },
						nom: { given: true, value: 'la préservation' },
						adjectif: { value: 'préservé', mark: '0.5' }
					}
				],
				ex3Q: 'Exercice 3 (02 pts) : Complète avec les connecteurs d’énumération (Puis / D’abord / Enfin / Ensuite) :\n\n......, trie le papier et le verre. ......, place-les dans le bon bac. ......, ferme le couvercle. ......, lave-toi les mains.',
				ex3A: 'D’abord ... Ensuite ... Puis ... Enfin',
				quizQ: 'Quelle est la conjugaison correcte de « être » à l’impératif présent avec « nous » ?',
				correctOpt: 'Soyons prudents en forêt !',
				distractors: [
					{ text: 'Sommes prudents en forêt !', diagnosticFeedback: '« Sommes » est au présent de l’indicatif.' },
					{ text: 'Sois prudents en forêt !', diagnosticFeedback: '« Sois » correspond à « tu » (singulier).' },
					{ text: 'Nous soyons prudents en forêt !', diagnosticFeedback: 'On supprime le pronom sujet à l’impératif.' }
				]
			}
		];

		const s = rng.pick(sets);
		const wordTable = buildFrenchWordFamilyTableBlock(s.rows);
		const mcq = buildUniqueMcqOptions(s.correctOpt, s.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'II — Fonctionnement de la langue',
			points: 6,
			instruction: 'Fais les exercices de conjugaison et de vocabulaire suivants :',
			content: [
				{ type: 'text', content: s.ex1Q, answer: s.ex1A, mark: '2' },
				{ type: 'text', content: s.tableIntro },
				wordTable,
				{ type: 'text', content: s.ex3Q, answer: s.ex3A, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't3',
			difficulty,
			domain: 'vocabulaire_lexique',
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
				'في الأمر الحاضر نحذف الضمير الشخصي ولا نضع s في آخر أفعال المجموعة الأولى مع المفرد.',
				'تذكّر لواحق الاشتقاق الاسمي: -tion / -ation / -age / -ment.',
				'رتّب روابط التعداد منطقيا: D’abord ثم Ensuite ثم Puis ثم Enfin.'
			],
			solutionStepsAr: [
				s.ex1A,
				s.rows.map((r) => `${r.verbe.value} / ${r.nom.value} / ${r.adjectif.value}`).join(' | '),
				s.ex3A
			],
			finalAnswer: s.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 4 : Fonctionnement de la langue (06 pts) — Futur simple & Homophones
// ═══════════════════════════════════════════════════════════════════════════════
const expl1amT3FuturHomophones: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1am_t3_expl_futur_homophones',
	grade: '1am',
	trimesterId: 't3',
	domain: 'orthographe_accords',
	titleAr: 'البناء اللغوي (2): المستقبل البسيط والمتجانسات الإملائية (a/à, ou/où, ces/ses)',
	curriculumLessonId: 'fre_lesson_1am_t3_futur_homophones',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const sets = [
			{
				ex1Q: 'Exercice 1 (02 pts) : Conjugue les verbes entre parenthèses au futur simple :\n\n1) Demain, nous (planter) ...... dix oliviers dans la cour.\n\n2) L’air de la ville (être) ...... plus pur.\n\n3) Les élèves (choisir) ...... des gestes écologiques.\n\n4) Vous (faire) ...... attention à chaque goutte d’eau.',
				ex1A: '1) planterons   2) sera   3) choisiront   4) ferez',
				ex2Q: 'Exercice 2 (02 pts) : Complète avec l’homophone qui convient (a / à — ou / où — ces / ses) :\n\n1) Amine ...... arrosé ...... jeunes arbres ...... l’aube.\n\n2) Voici la forêt ...... poussent ...... cèdres majestueux.\n\n3) Préfères-tu planter un olivier ...... un figuier ?',
				ex2A: '1) a / ses / à   2) où / ces   3) ou',
				ex3Q: 'Exercice 3 (02 pts) : Réécris les deux phrases au futur simple en commençant par « L’année prochaine, ... » :\n\n« Aujourd’hui, nous trions nos déchets et nous protégeons le quartier. »',
				ex3A: '« L’année prochaine, nous trierons nos déchets et nous protégerons le quartier. »',
				quizQ: 'Choisis la phrase sans aucune faute d’homophones :',
				correctOpt: 'Bilal a rangé ses outils à l’ombre où pousse cet olivier.',
				distractors: [
					{ text: 'Bilal à rangé ces outils a l’ombre ou pousse cet olivier.', diagnosticFeedback: 'Vérifie chaque test : a = avait ; ses = les siens ; à = préposition ; où = lieu.' },
					{ text: 'Bilal a rangé ces outils à l’ombre ou pousse cet olivier.', diagnosticFeedback: 'Les outils appartiennent à Bilal (ses) et « où » indique le lieu.' },
					{ text: 'Bilal à rangé ses outils à l’ombre où pousse cet olivier.', diagnosticFeedback: '« a » est l’auxiliaire avoir (avait rangé), sans accent.' }
				]
			},
			{
				ex1Q: 'Exercice 1 (02 pts) : Mets les verbes au futur simple :\n\n1) Bientôt, les citoyens (réduire) ...... le gaspillage.\n\n2) Tu (devoir) ...... fermer le robinet après usage.\n\n3) Les barrages (avoir) ...... assez d’eau pour les cultures.\n\n4) Nous (aller) ...... participer au reboisement.',
				ex1A: '1) réduiront   2) devras   3) auront   4) irons',
				ex2Q: 'Exercice 2 (02 pts) : Choisis le bon homophone entre parenthèses :\n\n1) Le jardinier (a / à) planté des fleurs (a / à) l’entrée du collège.\n\n2) (Ou / Où) se trouve la poubelle jaune : ici (ou / où) près du portail ?\n\n3) Regarde (ces / ses) collines vertes ! Chaque élève soigne (ces / ses) plantes.',
				ex2A: '1) a / à   2) Où / ou   3) ces / ses',
				ex3Q: 'Exercice 3 (02 pts) : Transforme cette consigne au futur simple avec « Nous » :\n\n« Économisons l’eau et sauvons nos forêts ! »',
				ex3A: '« Nous économiserons l’eau et nous sauverons nos forêts. »',
				quizQ: 'Quelle est la conjugaison correcte au futur simple : « Demain, notre collège (être) ...... plus vert et les arbres (grandir) ...... vite. » ?',
				correctOpt: 'sera / grandiront',
				distractors: [
					{ text: 'est / grandissent', diagnosticFeedback: 'Ces deux formes sont au présent de l’indicatif.' },
					{ text: 'serai / grandirons', diagnosticFeedback: '« serai » correspond à « je » et « grandirons » à « nous ».' },
					{ text: 'aura / grandira', diagnosticFeedback: '« aura » vient du verbe « avoir » et « les arbres » est au pluriel.' }
				]
			},
			{
				ex1Q: 'Exercice 1 (02 pts) : Conjugue les verbes entre parenthèses au futur simple :\n\n1) Les habitants (nettoyer) ...... les plages avant l’été.\n\n2) Je (pouvoir) ...... arroser le jardin ce soir.\n\n3) Nos montagnes (rester) ...... boisées grâce aux volontaires.\n\n4) Tu (voir) ...... les fleurs s’ouvrir au printemps.',
				ex1A: '1) nettoieront   2) pourrai   3) resteront   4) verras',
				ex2Q: 'Exercice 2 (02 pts) : Complète par (a / à — ou / où — ces / ses) :\n\n1) La forêt ...... besoin d’être protégée ...... toute saison.\n\n2) L’endroit ...... nous marchons abrite ...... oiseaux rares.\n\n3) Meriem prend ...... gants pour ramasser le papier ...... le plastique.',
				ex2A: '1) a / à   2) où / ces   3) ses / ou',
				ex3Q: 'Exercice 3 (02 pts) : Réécris au futur simple :\n\n« Les collégiens respectent la nature et gardent leur ville propre. »',
				ex3A: '« Les collégiens respecteront la nature et garderont leur ville propre. »',
				quizQ: 'Dans « C’est le parc ...... les enfants plantent des fleurs », quel homophone faut-il écrire ?',
				correctOpt: 'où',
				distractors: [
					{ text: 'ou', diagnosticFeedback: '« ou » sans accent exprime un choix (ou bien), pas un lieu.' },
					{ text: 'à', diagnosticFeedback: '« à » ne relie pas la proposition relative de lieu.' },
					{ text: 'ces', diagnosticFeedback: '« ces » est un déterminant démonstratif.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.correctOpt, s.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'II — Fonctionnement de la langue',
			points: 6,
			instruction: 'Réalise les exercices de conjugaison et d’orthographe suivants :',
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
			trimesterId: 't3',
			difficulty,
			domain: 'orthographe_accords',
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
				'في المستقبل البسيط نضيف (-ai, -as, -a, -ons, -ez, -ont) وتذكّر الجذور الشاذة (ser-, aur-, ir-, fer-).',
				'جرّب اختبارات التعويض: a = avait، و ou = ou bien، و ses = الملكية.',
				'في أفعال المجموعة الأولى بالمستقبل احتفظ بحرف e قبل r (protégerons / trierons).'
			],
			solutionStepsAr: [s.ex1A, s.ex2A, s.ex3A],
			finalAnswer: s.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 5 : Situation d'intégration (07 pts) — Consignes écologiques (Eau / Forêts / Collège)
// ═══════════════════════════════════════════════════════════════════════════════
const written1amT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1am_t3_written_consignes_ecolo',
	grade: '1am',
	trimesterId: 't3',
	domain: 'production_ecrite',
	titleAr: 'الوضعية الإدماجية: كتابة ميثاق وإرشادات لحماية الماء والغابات والبيئة (07 نقاط)',
	curriculumLessonId: 'fre_lesson_1am_t3_consignes_environnement',
	defaultPoints: 7,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				prompt: 'Ton quartier connaît parfois des coupures d’eau en été. Rédige un court texte prescriptif (5 consignes organisées) pour sensibiliser les habitants à l’économie de l’eau.',
				notes: [
					'Propose un titre nominal (ex : L’économie de l’eau).',
					'Introduis ta liste par une phrase rappelant la valeur de l’eau potable.',
					'Utilise les connecteurs d’énumération (D’abord, Ensuite, Puis, De plus, Enfin).',
					'Emploie l’impératif présent et au moins une fois « il faut + infinitif ».',
					'Termine par une phrase au futur simple montrant le résultat positif.'
				],
				modelAnswer:
					'L’économie de l’eau à la maison\n\nL’eau est un trésor précieux que nous devons préserver chaque jour. Voici quelques gestes simples pour éviter le gaspillage :\n\nD’abord, ferme le robinet pendant le brossage des dents. Ensuite, prends une douche courte au lieu d’un long bain. Puis, il faut réparer immédiatement chaque fuite dans la maison. De plus, lave les fruits dans une bassine plutôt que sous l’eau courante. Enfin, arrose les plantes le soir pour limiter l’évaporation.\n\nGrâce à ces bonnes habitudes, nos réserves d’eau suffiront pour les générations futures !',
				quizQ: 'Quelle consigne est correctement rédigée à l’impératif présent (2e pers. sing.) ?',
				correctOpt: 'Ferme bien le robinet après chaque utilisation !',
				distractors: [
					{ text: 'Fermes bien le robinet après chaque utilisation !', diagnosticFeedback: 'Les verbes du 1er groupe ne prennent pas de « s » à l’impératif avec « tu ».' },
					{ text: 'Tu ferme bien le robinet !', diagnosticFeedback: 'Il ne faut pas écrire le pronom sujet devant l’impératif.' },
					{ text: 'Il faut ferme le robinet !', diagnosticFeedback: 'Après « Il faut », le verbe doit être à l’infinitif : fermer.' }
				]
			},
			{
				prompt: 'À l’occasion de la campagne nationale de protection des forêts algériennes, rédige une charte de 5 consignes pour prévenir les incendies et encourager le reboisement.',
				notes: [
					'Choisis un titre nominal efficace.',
					'Emploie des connecteurs d’énumération (D’abord, Ensuite, Puis, Enfin).',
					'Alterne entre des phrases affirmatives et négatives à l’impératif présent ou avec « il ne faut pas + infinitif ».',
					'Conclus par une phrase au futur simple.',
					'Boîte à outils : forêt, arbres, incendie, feu, déchets en verre, reboisement, protéger.'
				],
				modelAnswer:
					'La protection de nos forêts algériennes\n\nNos forêts purifient l’air et embellissent notre pays. Pour les protéger contre les incendies, respectons ces règles :\n\nD’abord, n’allumez jamais de feu près des arbres ni des herbes sèches. Ensuite, ramassez tous vos déchets avant de quitter la forêt, surtout les bouteilles en verre. Puis, il ne faut pas casser les branches ni arracher les jeunes pousses. De plus, prévenez aussitôt la protection civile en cas de fumée. Enfin, participez aux journées de reboisement.\n\nAinsi, nos montagnes resteront vertes et accueillantes pour toujours !',
				quizQ: 'Quelle phrase convient le mieux pour conclure une charte de protection des forêts ?',
				correctOpt: 'Ainsi, nos forêts resteront vertes et protégées pour les générations futures.',
				distractors: [
					{ text: 'Hier, j’ai vu un grand cèdre dans la montagne.', diagnosticFeedback: 'Une conclusion de texte prescriptif se projette vers l’avenir au futur simple.' },
					{ text: 'D’abord, n’allumez pas de feu.', diagnosticFeedback: '« D’abord » sert à ouvrir les consignes, pas à conclure.' },
					{ text: 'La forêt a beaucoup de branches.', diagnosticFeedback: 'Cette phrase ne conclut pas l’engagement écologique.' }
				]
			},
			{
				prompt: 'Le club d’environnement de ton collège prépare une affiche intitulée « Pour un collège propre et vert ». Rédige 5 consignes claires adressées à tes camarades.',
				notes: [
					'Commence par un titre nominal et une phrase d’introduction.',
					'Utilise l’impératif présent (avec « nous » ou « vous ») et « il faut + infinitif ».',
					'Organise tes consignes avec des connecteurs d’énumération.',
					'Termine par une phrase au futur simple.',
					'Boîte à outils : cour, salle de classe, poubelle, trier, papier, arbres, tables, propreté.'
				],
				modelAnswer:
					'La propreté de notre collège\n\nNotre collège est notre deuxième maison : gardons-le propre et agréable chaque jour !\n\nD’abord, jetons tous les papiers et les emballages dans les poubelles de la cour. Ensuite, il faut garder les tables et les murs de la classe parfaitement propres. Puis, évitons le gaspillage de l’eau aux lavabos et éteignons les lumières en sortant de la salle. De plus, prenons soin des plantes et des arbres du jardin scolaire. Enfin, encourageons nos camarades à respecter le règlement écologique.\n\nGrâce à ces gestes citoyens, notre établissement sera un modèle de propreté !',
				quizQ: 'Quel titre nominal respecte le mieux la consigne d’un texte prescriptif sur l’école ?',
				correctOpt: 'La préservation de la propreté au collège',
				distractors: [
					{ text: 'Comment nettoies-tu la classe ?', diagnosticFeedback: 'C’est une phrase interrogative verbale, pas un titre nominal.' },
					{ text: 'Les élèves ont balayé la cour hier.', diagnosticFeedback: 'C’est une phrase verbale au passé composé.' },
					{ text: 'Je nettoie mon bureau.', diagnosticFeedback: 'Un titre nominal ne contient pas de verbe conjugué.' }
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
				'Pertinence et titre nominal (2 pts) + Cohérence et connecteurs d’énumération (2 pts) + Langue : impératif, futur simple et homophones (2 pts) + Présentation et ponctuation (1 pt).',
			mark: '7'
		});
		const mcq = buildUniqueMcqOptions(v.correctOpt, v.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'III — Situation d’intégration (Production écrite)',
			points: 7,
			instruction: 'Rédige ton texte prescriptif avec soin en respectant les consignes ci-dessous :',
			content: [block]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't3',
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
				'ابدأ بعنوان اسمي موجز (nominalisation) وجملة تمهيدية.',
				'رتّب 5 إرشادات باستعمال (D’abord, Ensuite, Puis, De plus, Enfin) مع توحيد المخاطب في الأمر.',
				'اختم بجملة تحفيزية في المستقبل البسيط وراجع المتجانسات (a/à, ou/où, ces/ses).'
			],
			solutionStepsAr: [
				'العنوان الاسمي والجملة التمهيدية.',
				'تنظيم 5 نصائح بالأمر الحاضر و il faut + infinitif وروابط التعداد.',
				'خاتمة في المستقبل البسيط مع مراجعة الإملاء والترقيم.'
			],
			finalAnswer: v.modelAnswer
		};
	}
};

export const TEMPLATES_1AM_T3: FrenchParameterizedTemplate[] = [
	comp1amT3Eau,
	comp1amT3Forets,
	expl1amT3ImperatifNominalisation,
	expl1amT3FuturHomophones,
	written1amT3
];
