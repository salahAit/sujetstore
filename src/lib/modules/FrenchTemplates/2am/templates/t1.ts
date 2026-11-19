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
// Template 1 : Compréhension de l'écrit (07 pts) — Récit moral sur l'honnêteté
// ═══════════════════════════════════════════════════════════════════════════════
const comp2amT1Honnetete: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2am_t1_comp_honnetete',
	grade: '2am',
	trimesterId: 't1',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (1): القصة الأخلاقية حول الصدق والأمانة (Le récit moral : l’honnêteté)',
	curriculumLessonId: 'fre_lesson_2am_t1_structure_recit',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'Le jeune berger honnête de l’Aurès',
				source: 'Récit moral algérien adapté — Projet 1 (2AM)',
				paragraphs: [
					'Autrefois, dans un paisible village des Aurès, vivait un jeune berger nommé Youssef. [[Il]] était pauvre mais profondément honnête et travailleur. Chaque matin, il menait son petit troupeau dans les collines verdoyantes avec calme et attention.',
					'Un jour, en rentrant vers le village, Youssef aperçut au bord du sentier une bourse en cuir remplie de pièces d’argent. Sans hésiter, [[ce garçon sincère]] se rendit aussitôt au marché hebdomadaire pour chercher son propriétaire. Il retrouva un vieux marchand inquiet et lui rendit fidèlement toute la somme. Ému par une telle droiture, le marchand le remercia chaleureusement. Depuis ce jour, tout le village respecta l’((honnêteté)) exemplaire de Youssef.'
				],
				glossary: [
					{ term: 'bourse', meaning: 'petit sac en cuir où l’on range des pièces d’argent' },
					{ term: 'droiture', meaning: 'grande honnêteté dans le comportement' }
				],
				qcmHeader: '1) Quelle qualité morale est mise en valeur dans ce récit ?',
				qcmOptions: ['La paresse', 'L’honnêteté', 'La colère'],
				qcmCorrect: 'L’honnêteté',
				tf: [
					{ q: 'Youssef vivait dans un village des Aurès.', a: 'Vrai', mark: '1' },
					{ q: 'Youssef décida de garder les pièces d’argent pour lui.', a: 'Faux', c: 'Il chercha le propriétaire au marché et lui rendit toute la somme.', mark: '1' },
					{ q: 'Le propriétaire de la bourse était un vieux marchand.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes d’après le texte (02 pts) :\n\na) Relève la formule d’ouverture et l’indicateur qui introduit l’élément perturbateur.\n\nb) Quels sont les deux temps verbaux dominants dans ce récit ?',
				compA: 'a) Formule d’ouverture : « Autrefois, » ; élément perturbateur : « Un jour, ».\n\nb) L’imparfait (situation initiale / description) et le passé simple (actions principales).',
				lexQ: '4) Observe le texte puis réponds (01 pt) :\n\na) Que remplace le substitut lexical « ce garçon sincère » ?\n\nb) Relève un complément circonstanciel de manière (CCM) dans le deuxième paragraphe.',
				lexA: 'a) Il remplace « Youssef » (le jeune berger).\n\nb) « Sans hésiter », « fidèlement » ou « chaleureusement ».',
				quizQ: 'Dans le récit « Le jeune berger honnête de l’Aurès », quelle expression introduit la situation finale ?',
				correctOpt: 'Depuis ce jour,',
				distractors: [
					{ text: 'Autrefois,', diagnosticFeedback: '« Autrefois, » ouvre la situation initiale.' },
					{ text: 'Un jour,', diagnosticFeedback: '« Un jour, » introduit l’élément perturbateur.' },
					{ text: 'Chaque matin,', diagnosticFeedback: '« Chaque matin, » marque une habitude dans la situation initiale.' }
				]
			},
			{
				title: 'La sacoche perdue au marché de Tlemcen',
				source: 'Récit moral algérien adapté — Honnêteté et confiance (2AM)',
				paragraphs: [
					'Jadis, dans un quartier animé de Tlemcen, habitait un apprenti cordonnier appelé Bilal. Il travaillait patiemment auprès de son père et saluait toujours ses voisins avec respect.',
					'Un matin, après le départ d’un voyageur venu faire réparer ses sandales, Bilal découvrit sous le banc une sacoche oubliée contenant des documents importants et de l’argent. Aussitôt, [[le jeune artisan]] courut à travers les ruelles jusqu’à la porte de la ville, rejoignit le voyageur et lui remit son bien intact. Finalement, le voyageur confia son commerce de cuir à la famille de Bilal tant il admirait sa ((loyauté)).'
				],
				glossary: [
					{ term: 'apprenti cordonnier', meaning: 'jeune qui apprend le métier de réparer les chaussures' },
					{ term: 'intact', meaning: 'entier, sans rien de perdu ni d’abîmé' }
				],
				qcmHeader: '1) Où se déroule cette histoire morale ?',
				qcmOptions: ['Dans un quartier de Tlemcen', 'Sur un bateau en mer', 'Dans une forêt de neige'],
				qcmCorrect: 'Dans un quartier de Tlemcen',
				tf: [
					{ q: 'Bilal apprenait le métier de cordonnier auprès de son père.', a: 'Vrai', mark: '1' },
					{ q: 'La sacoche oubliée était complètement vide.', a: 'Faux', c: 'Elle contenait des documents importants et de l’argent.', mark: '1' },
					{ q: 'Bilal rejoignit le voyageur pour lui rendre sa sacoche intacte.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Où Bilal a-t-il découvert la sacoche oubliée ?\n\nb) Comment le voyageur a-t-il récompensé la loyauté de Bilal ?',
				compA: 'a) Sous le banc de l’atelier.\n\nb) Il confia son commerce de cuir à la famille de Bilal.',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Deux verbes conjugués au passé simple dans le deuxième paragraphe.\n\nb) Un complément circonstanciel de lieu (CCL) dans le premier paragraphe.',
				lexA: 'a) « découvrit », « courut », « rejoignit », « remit » ou « confia » (deux au choix).\n\nb) « dans un quartier animé de Tlemcen ».',
				quizQ: 'Dans le récit « La sacoche perdue au marché de Tlemcen », pourquoi les verbes « habitait, travaillait, saluait » sont-ils à l’imparfait ?',
				correctOpt: 'Parce qu’ils décrivent le cadre et les habitudes dans la situation initiale',
				distractors: [
					{ text: 'Parce qu’ils racontent des actions soudaines', diagnosticFeedback: 'Les actions soudaines sont au passé simple.' },
					{ text: 'Parce qu’ils donnent des consignes', diagnosticFeedback: 'Les consignes se donnent à l’impératif.' },
					{ text: 'Parce qu’ils expriment un fait futur', diagnosticFeedback: 'L’imparfait est un temps du passé.' }
				]
			},
			{
				title: 'Le boulanger sincère de Médéa',
				source: 'Récit moral algérien adapté — Droiture et sincérité (2AM)',
				paragraphs: [
					'Il y a bien longtemps, dans une petite rue de Médéa, vivait un boulanger nommé Omar. [[Cet homme généreux]] préparait chaque aube un pain doré et croustillant que tous les habitants appréciaient.',
					'Soudain, un soir d’hiver, une cliente pressée posa par erreur une pièce d’or au lieu d’une petite pièce de cuivre puis quitta la boutique. Omar remarqua la méprise, garda précieusement la pièce et parcourut tout le quartier dès le lendemain matin pour la rendre à la mère de famille. Depuis ce jour, la réputation du boulanger grandit dans toute la région car une ((conscience honnête)) vaut plus que tout l’or du monde.'
				],
				glossary: [
					{ term: 'méprise', meaning: 'erreur involontaire' },
					{ term: 'réputation', meaning: 'bonne renommée auprès des gens' }
				],
				qcmHeader: '1) Quelle erreur la cliente pressée a-t-elle commise ?',
				qcmOptions: ['Elle a donné une pièce d’or au lieu d’une petite pièce de cuivre', 'Elle a oublié son panier vide', 'Elle est arrivée avant l’ouverture'],
				qcmCorrect: 'Elle a donné une pièce d’or au lieu d’une petite pièce de cuivre',
				tf: [
					{ q: 'Omar préparait son pain chaque matin à l’aube.', a: 'Vrai', mark: '1' },
					{ q: 'Omar attendit plusieurs mois sans rendre la pièce d’or.', a: 'Faux', c: 'Il parcourut le quartier dès le lendemain matin pour la rendre.', mark: '1' },
					{ q: 'La réputation du boulanger grandit grâce à sa sincérité.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Quelle est la leçon morale formulée à la fin du texte ?\n\nb) Qui désigne le substitut lexical souligné « Cet homme généreux » ?',
				compA: 'a) Une conscience honnête vaut plus que tout l’or du monde.\n\nb) Il désigne « Omar » (le boulanger).',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) La formule d’ouverture du récit.\n\nb) Deux adjectifs qualificatifs décrivant le pain.',
				lexA: 'a) « Il y a bien longtemps, ».\n\nb) « doré » et « croustillant ».',
				quizQ: 'Quel est l’élément perturbateur dans « Le boulanger sincère de Médéa » ?',
				correctOpt: 'La cliente pressée posa par erreur une pièce d’or puis quitta la boutique.',
				distractors: [
					{ text: 'Omar préparait chaque aube un pain doré.', diagnosticFeedback: 'C’est la situation initiale à l’imparfait.' },
					{ text: 'La réputation du boulanger grandit dans toute la région.', diagnosticFeedback: 'C’est la situation finale.' },
					{ text: 'Omar habitait dans une petite rue de Médéa.', diagnosticFeedback: 'C’est le cadre initial de l’histoire.' }
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
			instruction: 'Lis attentivement le récit ci-dessous puis réponds aux questions :',
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
				{ type: 'text', content: '2) Réponds par « Vrai » ou « Faux » et justifie lorsque c’est faux (03 pts) :' },
				{ type: 'true_false', items: v.tf },
				{ type: 'text', content: v.compQ, answer: v.compA, mark: '2' },
				{ type: 'text', content: v.lexQ, answer: v.lexA, mark: '1' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
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
				'ميّز بين الوضعية الابتدائية (Autrefois / Jadis + imparfait) والحدث المخلّ (Un jour / Soudain + passé simple).',
				'استخرج البدائل المعجمية والنحوية التي تعوّض اسم البطل في القصة.',
				'استعن بالأسئلة (Quand ? Où ? Comment ?) لاستخراج المتممات الظرفية.'
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
// Template 2 : Compréhension de l'écrit (07 pts) — Entraide (Twiza) & Courage
// ═══════════════════════════════════════════════════════════════════════════════
const comp2amT1EntraideCourage: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2am_t1_comp_entraide_courage',
	grade: '2am',
	trimesterId: 't1',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (2): القصة الأخلاقية حول التعاون (التويزة) والشجاعة (Entraide et courage)',
	curriculumLessonId: 'fre_lesson_2am_t1_ouverture_cc',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'La solidarité du village pendant l’hiver',
				source: 'Récit moral algérien adapté — La Twiza (2AM)',
				paragraphs: [
					'Autrefois, sur les hauteurs verdoyantes de Kabylie, les familles vivaient dans une belle harmonie. Quand venait l’hiver, la neige recouvrait les toits de tuiles rouges et les chemins devenaient glissants.',
					'Un soir de janvier, une tempête abattit le mur du jardin de l’oncle Ahmed, un vieillard respecté qui habitait seul. Dès l’aube suivante, tous les voisins se rassemblèrent spontanément pour une grande ((Twiza)). Les jeunes apportèrent des pierres solides, les maçons reconstruisirent le mur avec soin et les femmes préparèrent un repas chaud. Avant le coucher du soleil, le mur fut rebâti. Grâce à [[cette entraide]], le vieillard retrouva le sourire.'
				],
				glossary: [
					{ term: 'Twiza', meaning: 'tradition algérienne d’entraide collective et bénévole' },
					{ term: 'spontanément', meaning: 'volontairement, sans attendre qu’on le demande' }
				],
				qcmHeader: '1) Quel événement imprévu arrive un soir de janvier ?',
				qcmOptions: ['Une tempête abat le mur du jardin de l’oncle Ahmed', 'La neige fond en une minute', 'Un marché ouvre la nuit'],
				qcmCorrect: 'Une tempête abat le mur du jardin de l’oncle Ahmed',
				tf: [
					{ q: 'L’oncle Ahmed était un vieillard respecté qui habitait seul.', a: 'Vrai', mark: '1' },
					{ q: 'Les voisins ont refusé d’aider l’oncle Ahmed.', a: 'Faux', c: 'Ils se rassemblèrent spontanément pour reconstruire le mur.', mark: '1' },
					{ q: 'Le mur fut rebâti avant le coucher du soleil.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Comment les habitants se sont-ils partagé les tâches pendant la Twiza ?\n\nb) Relève un complément circonstanciel de temps (CCT) dans le deuxième paragraphe.',
				compA: 'a) Les jeunes apportèrent des pierres, les maçons reconstruisirent le mur et les femmes préparèrent un repas chaud.\n\nb) « Un soir de janvier », « Dès l’aube suivante » ou « Avant le coucher du soleil ».',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Un adjectif qualificatif qui qualifie « pierres ».\n\nb) Deux verbes au passé simple (3e pers. du pluriel).',
				lexA: 'a) « solides ».\n\nb) « se rassemblèrent », « apportèrent », « reconstruisirent » ou « préparèrent » (deux au choix).',
				quizQ: 'Quelle valeur algérienne traditionnelle illustre le récit « La solidarité du village pendant l’hiver » ?',
				correctOpt: 'La Twiza (l’entraide collective et bénévole)',
				distractors: [
					{ text: 'L’égoïsme', diagnosticFeedback: 'Au contraire, tous les voisins agissent ensemble sans rien demander.' },
					{ text: 'La précipitation', diagnosticFeedback: 'Ils construisent le mur avec soin.' },
					{ text: 'L’orgueil', diagnosticFeedback: 'Ils font preuve d’humilité et de fraternité.' }
				]
			},
			{
				title: 'Le jeune artisan courageux de Constantine',
				source: 'Récit moral algérien adapté — Persévérance et courage (2AM)',
				paragraphs: [
					'Jadis, près des vieux ponts de Constantine, vivait un jeune dinandier nommé Karim. [[Il]] fabriquait avec patience de jolis plateaux en cuivre gravé pour soutenir sa famille.',
					'Un jour, une lourde pluie inonda son petit atelier et abîma une grande partie de ses outils. Découragé un instant, Karim reprit pourtant courage grâce aux paroles sages de sa mère. Il nettoya l’atelier avec énergie, répara ses marteaux et travailla doublement pendant deux semaines. Finalement, il présenta au souk un plateau si finement gravé que tous les clients saluèrent sa ((persévérance)).'
				],
				glossary: [
					{ term: 'dinandier', meaning: 'artisan qui travaille et grave le cuivre' },
					{ term: 'persévérance', meaning: 'courage de continuer ses efforts malgré les difficultés' }
				],
				qcmHeader: '1) Quel métier exerçait Karim à Constantine ?',
				qcmOptions: ['Dinandier (artisan du cuivre)', 'Pêcheur', 'Astronome'],
				qcmCorrect: 'Dinandier (artisan du cuivre)',
				tf: [
					{ q: 'Une lourde pluie inonda le petit atelier de Karim.', a: 'Vrai', mark: '1' },
					{ q: 'Karim abandonna définitivement son métier après la pluie.', a: 'Faux', c: 'Il reprit courage, nettoya l’atelier et répara ses outils.', mark: '1' },
					{ q: 'Les clients du souk admirèrent son nouveau plateau gravé.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Qui a aidé Karim à reprendre courage ?\n\nb) Qu’a fait Karim après l’inondation de son atelier ?',
				compA: 'a) Sa mère grâce à ses paroles sages.\n\nb) Il nettoya l’atelier, répara ses marteaux et travailla doublement pendant deux semaines.',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Un complément circonstanciel de manière (CCM).\n\nb) Un complément circonstanciel de lieu (CCL).',
				lexA: 'a) « avec patience », « avec énergie » ou « doublement ».\n\nb) « près des vieux ponts de Constantine » ou « au souk ».',
				quizQ: 'Quelle est la fonction du groupe « avec énergie » dans « Il nettoya l’atelier avec énergie » ?',
				correctOpt: 'Complément circonstanciel de manière (CCM)',
				distractors: [
					{ text: 'Complément circonstanciel de temps (CCT)', diagnosticFeedback: 'Il répond à la question « Comment ? », pas « Quand ? ».' },
					{ text: 'Complément circonstanciel de lieu (CCL)', diagnosticFeedback: 'Il ne désigne pas un lieu.' },
					{ text: 'Sujet du verbe', diagnosticFeedback: 'Le sujet est le pronom « Il ».' }
				]
			},
			{
				title: 'Les deux frères et la récolte d’olives',
				source: 'Récit moral algérien adapté — Fraternité et générosité (2AM)',
				paragraphs: [
					'Il y a bien longtemps, dans une vallée fertile de Béjaïa, deux frères nommés Sami et Nabil possédaient un beau verger d’oliviers. [[Les deux frères]] s’aimaient sincèrement et partageaient chaque récolte à parts égales.',
					'Une année, après la cueillette, Sami pensa à son frère qui avait une grande famille ; la nuit, il transporta secrètement deux sacs d’olives dans le grenier de Nabil. Au même moment, Nabil, sachant que Sami vivait seul et travaillait dur, déposa à son tour deux sacs chez son frère ! Le lendemain matin, ils s’aperçurent que leurs greniers étaient toujours aussi pleins et comprirent avec émotion la ((générosité)) l’un de l’autre.'
				],
				glossary: [
					{ term: 'verger', meaning: 'terrain planté d’arbres fruitiers ou d’oliviers' },
					{ term: 'grenier', meaning: 'pièce où l’on conserve les récoltes' }
				],
				qcmHeader: '1) Pourquoi Sami apporta-t-il des sacs d’olives chez Nabil pendant la nuit ?',
				qcmOptions: ['Parce que Nabil avait une grande famille', 'Parce qu’il voulait vendre le verger', 'Parce qu’il s’était trompé de chemin'],
				qcmCorrect: 'Parce que Nabil avait une grande famille',
				tf: [
					{ q: 'Sami et Nabil possédaient un verger d’oliviers à Béjaïa.', a: 'Vrai', mark: '1' },
					{ q: 'Seul Sami pensa à aider son frère en secret.', a: 'Faux', c: 'Nabil déposa lui aussi deux sacs d’olives chez Sami.', mark: '1' },
					{ q: 'Le lendemain, les deux frères comprirent leur générosité mutuelle.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Pourquoi les greniers des deux frères restèrent-ils aussi pleins le lendemain ?\n\nb) Quel adjectif qualifie « une vallée » au début du récit ?',
				compA: 'a) Parce que chacun avait discrètement donné deux sacs à l’autre pendant la nuit.\n\nb) L’adjectif « fertile ».',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Un verbe conjugué à l’imparfait (3e pers. du pluriel).\n\nb) Un verbe conjugué au passé simple (3e pers. du pluriel).',
				lexA: 'a) « possédaient », « s’aimaient », « partageaient » ou « étaient ».\n\nb) « s’aperçurent » ou « comprirent ».',
				quizQ: 'Dans le récit « Les deux frères et la récolte d’olives », quelle est la morale principale ?',
				correctOpt: 'La générosité fraternelle enrichit les cœurs et unit les familles.',
				distractors: [
					{ text: 'Il ne faut jamais partager ses récoltes.', diagnosticFeedback: 'Le récit célèbre au contraire le partage.' },
					{ text: 'La colère résout les problèmes.', diagnosticFeedback: 'Les deux frères agissent avec tendresse et calme.' },
					{ text: 'Il faut travailler seulement en été.', diagnosticFeedback: 'Ce n’est pas le thème de l’histoire.' }
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
			instruction: 'Lis attentivement ce récit moral puis réponds aux questions :',
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
			grade: '2am',
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
				'اقرأ النص وحدّد القيمة الأخلاقية (التضامن، المثابرة، الكرم الأخوي).',
				'استعمل الأسئلة (Quand / Où / Comment) للعثور على المتممات الظرفية بسرعة.',
				'تعرّف على نهايات الماضي الناقص (-aient) والماضي البسيط (-èrent / -irent / -urent).'
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
// Template 3 : Fonctionnement de la langue (06 pts) — Ouverture, CCT/CCL/CCM & Adjectifs
// ═══════════════════════════════════════════════════════════════════════════════
const expl2amT1CcStructure: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2am_t1_expl_cc_structure',
	grade: '2am',
	trimesterId: 't1',
	domain: 'grammaire_syntaxe',
	titleAr: 'البناء اللغوي (1): العبارات الافتتاحية، المتمّمات الظرفية (CCT/CCL/CCM) والصفات',
	curriculumLessonId: 'fre_lesson_2am_t1_ouverture_cc',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const sets = [
			{
				tableIntro: 'Exercice 1 (03 pts) : Lis la phrase puis classe les trois compléments circonstanciels dans le tableau :\n\n« Autrefois, dans une vallée des Aurès, le jeune berger gardait son troupeau avec sérieux. »',
				cct: ['Autrefois'],
				ccl: ['dans une vallée des Aurès'],
				ccm: ['avec sérieux'],
				ex2Q: 'Exercice 2 (01.5 pt) : Remets en ordre ces trois étapes du récit en écrivant (Situation initiale / Élément perturbateur / Situation finale) :\n\nA) Un jour, il découvrit une sacoche perdue au marché.\n\nB) Depuis ce jour, tous les habitants admirèrent sa droiture.\n\nC) Jadis, un apprenti honnête travaillait à Tlemcen.',
				ex2A: 'C = Situation initiale ; A = Élément perturbateur ; B = Situation finale.',
				ex3Q: 'Exercice 3 (01.5 pt) : Accorde correctement les adjectifs entre parenthèses :\n\n« La jeune fille (courageux) ...... et (attentif) ...... aida la (vieux) ...... voisine. »',
				ex3A: '« La jeune fille courageuse et attentive aida la vieille voisine. »',
				quizQ: 'Dans la phrase « Dès l’aube, les voisins reconstruisirent le mur avec courage », quelle est la fonction de « Dès l’aube » ?',
				correctOpt: 'Complément circonstanciel de temps (CCT)',
				distractors: [
					{ text: 'Complément circonstanciel de lieu (CCL)', diagnosticFeedback: '« Dès l’aube » indique le moment (Quand ?), pas le lieu.' },
					{ text: 'Complément circonstanciel de manière (CCM)', diagnosticFeedback: 'Le CCM de cette phrase est « avec courage ».' },
					{ text: 'Adjectif qualificatif', diagnosticFeedback: '« Dès l’aube » est un groupe prépositionnel de temps.' }
				]
			},
			{
				tableIntro: 'Exercice 1 (03 pts) : Classe les compléments circonstanciels de la phrase suivante dans le tableau :\n\n« Chaque matin, dans sa petite boulangerie, Omar préparait le pain avec soin. »',
				cct: ['Chaque matin'],
				ccl: ['dans sa petite boulangerie'],
				ccm: ['avec soin'],
				ex2Q: 'Exercice 2 (01.5 pt) : Complète chaque phrase avec la formule qui convient (Autrefois / Soudain / Finalement) :\n\n1) ......, un paysan généreux habitait près de la source.\n\n2) ......, un violent orage détruisit la clôture.\n\n3) ......, les voisins réparèrent ensemble le verger.',
				ex2A: '1) Autrefois   2) Soudain   3) Finalement',
				ex3Q: 'Exercice 3 (01.5 pt) : Mets le groupe nominal au féminin pluriel :\n\n« un artisan généreux, actif et loyal » devient : « des artisanes ......, ...... et ...... ».',
				ex3A: '« des artisanes généreuses, actives et loyales ».',
				quizQ: 'Quel est le féminin correct des adjectifs : « doux / blanc / généreux » ?',
				correctOpt: 'douce / blanche / généreuse',
				distractors: [
					{ text: 'douxe / blance / généreue', diagnosticFeedback: 'Attention aux irréguliers : doux -> douce, blanc -> blanche, généreux -> généreuse.' },
					{ text: 'douce / blanque / généreuse', diagnosticFeedback: 'Le féminin de « blanc » s’écrit « blanche ».' },
					{ text: 'doute / blanche / généreux', diagnosticFeedback: '« généreux » change en « généreuse » au féminin.' }
				]
			},
			{
				tableIntro: 'Exercice 1 (03 pts) : Classe les compléments circonstanciels de la phrase suivante dans le tableau :\n\n« Pendant l’hiver, sur la place du village, les jeunes partageaient le bois généreusement. »',
				cct: ['Pendant l’hiver'],
				ccl: ['sur la place du village'],
				ccm: ['généreusement'],
				ex2Q: 'Exercice 2 (01.5 pt) : Enrichis la phrase suivante en ajoutant un CCT au début et un CCM à la fin :\n\n« Le cordonnier rendit la bourse au voyageur. »',
				ex2A: 'Exemple : « Le lendemain matin (CCT), le cordonnier rendit la bourse au voyageur avec honnêteté (CCM). »',
				ex3Q: 'Exercice 3 (01.5 pt) : Accorde les adjectifs entre parenthèses :\n\n« Ce village possédait des maisons (blanc) ...... , des rues (ancien) ...... et des habitants (loyal) ...... . »',
				ex3A: '« Ce village possédait des maisons blanches, des rues anciennes et des habitants loyaux. »',
				quizQ: 'Quel est le masculin pluriel correct de « un compagnon loyal et courageux » ?',
				correctOpt: 'des compagnons loyaux et courageux',
				distractors: [
					{ text: 'des compagnons loyals et courageuxs', diagnosticFeedback: '« loyal » fait « loyaux » et « courageux » ne prend pas de « s ».' },
					{ text: 'des compagnons loyaux et courageuses', diagnosticFeedback: '« compagnons » est masculin pluriel, pas féminin.' },
					{ text: 'des compagnons loyal et courageux', diagnosticFeedback: 'L’adjectif « loyal » doit s’accorder au pluriel.' }
				]
			}
		];

		const s = rng.pick(sets);
		const ccTable = buildFrenchClassificationTableBlock({
			columns: [
				{ header: 'CCT (Quand ?)', items: s.cct, mark: '1' },
				{ header: 'CCL (Où ?)', items: s.ccl, mark: '1' },
				{ header: 'CCM (Comment ?)', items: s.ccm, mark: '1' }
			]
		});
		const mcq = buildUniqueMcqOptions(s.correctOpt, s.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'II — Fonctionnement de la langue',
			points: 6,
			instruction: 'Fais soigneusement les trois exercices de grammaire et d’orthographe suivants :',
			content: [
				{ type: 'text', content: s.tableIntro },
				ccTable,
				{ type: 'text', content: s.ex2Q, answer: s.ex2A, mark: '1.5' },
				{ type: 'text', content: s.ex3Q, answer: s.ex3A, mark: '1.5' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
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
				'اطرح الأسئلة الثلاثة: Quand (CCT)، Où (CCL)، Comment (CCM).',
				'تذكّر عبارات كل مرحلة: Autrefois (ابتدائية) / Soudain (عنصر مخلّ) / Finalement (نهائية).',
				'طابق الصفات جيدا: -eux -> -euse، -if -> -ive، blanc -> blanche، loyal -> loyaux.'
			],
			solutionStepsAr: [
				`CCT : ${s.cct.join(', ')} | CCL : ${s.ccl.join(', ')} | CCM : ${s.ccm.join(', ')}`,
				s.ex2A,
				s.ex3A
			],
			finalAnswer: s.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 4 : Fonctionnement de la langue (06 pts) — Imparfait vs Passé simple & Substituts
// ═══════════════════════════════════════════════════════════════════════════════
const expl2amT1ImparfaitPs: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2am_t1_expl_imparfait_ps',
	grade: '2am',
	trimesterId: 't1',
	domain: 'conjugaison_temps',
	titleAr: 'البناء اللغوي (2): الماضي الناقص مقابل الماضي البسيط (الغائب) والبدائل في السرد',
	curriculumLessonId: 'fre_lesson_2am_t1_imparfait_passe_simple',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const sets = [
			{
				ex1Q: 'Exercice 1 (02 pts) : Conjugue les verbes entre parenthèses à l’imparfait de l’indicatif :\n\n1) Le village (être) ...... calme au lever du soleil.\n\n2) Les habitants (finir) ...... tôt leurs travaux agricoles.\n\n3) L’artisan (travailler) ...... le bois avec passion.\n\n4) Les deux frères (partager) ...... toujours leurs récoltes.',
				ex1A: '1) était   2) finissaient   3) travaillait   4) partageaient',
				ex2Q: 'Exercice 2 (02 pts) : Mets les verbes entre parenthèses au passé simple (3e personne) :\n\n1) Soudain, le berger (trouver) ...... une bourse sur le sentier.\n\n2) Les voisins (choisir) ...... d’aider le vieillard.\n\n3) Le voyageur (prendre) ...... sa sacoche et (remercier) ...... Bilal.',
				ex2A: '1) trouva   2) choisirent   3) prit / remercia',
				ex3Q: 'Exercice 3 (02 pts) : Évite la répétition en remplaçant le mot répété par un substitut grammatical ou lexical :\n\n1) Omar aperçut un voyageur fatigué. Omar offrit de l’eau au voyageur.\n\n2) Les villageois aidèrent le vieil homme. Les villageois furent très fiers.',
				ex3A: '1) Omar aperçut un voyageur fatigué. Il (ou Le boulanger) lui offrit de l’eau.\n\n2) Les villageois aidèrent le vieil homme. Ils (ou Ces hommes solidaires) furent très fiers.',
				quizQ: 'Choisis les formes exactes (imparfait puis passé simple) : « La neige (tomber) ...... doucement quand le voyageur (frapper) ...... à la porte. »',
				correctOpt: 'tombait / frappa',
				distractors: [
					{ text: 'tomba / frappait', diagnosticFeedback: 'La neige décrit le décor (imparfait) et le coup à la porte est l’action soudaine (passé simple).' },
					{ text: 'tombaient / frappèrent', diagnosticFeedback: 'Les sujets « La neige » et « le voyageur » sont au singulier.' },
					{ text: 'tombe / frappera', diagnosticFeedback: 'Un récit au passé ne mélange pas présent et futur ici.' }
				]
			},
			{
				ex1Q: 'Exercice 1 (02 pts) : Choisis entre l’imparfait et le passé simple selon le sens :\n\n1) Autrefois, le marché de Tlemcen (être) ...... très animé.\n\n2) Un matin, un client (oublier) ...... son sac chez le cordonnier.\n\n3) Les enfants (jouer) ...... dans la ruelle quand la pluie (commencer) ...... .',
				ex1A: '1) était (imparfait)   2) oublia (passé simple)   3) jouaient (imparfait) / commença (passé simple)',
				ex2Q: 'Exercice 2 (02 pts) : Conjugue au passé simple à la 3e personne du pluriel :\n\n1) Les artisans (fabriquer) ...... un beau plateau.\n\n2) Les deux amis (être) ...... fiers de leur entraide.\n\n3) Les villageois (avoir) ...... une excellente idée.\n\n4) Les maçons (bâtir) ...... un mur solide.',
				ex2A: '1) fabriquèrent   2) furent   3) eurent   4) bâtirent',
				ex3Q: 'Exercice 3 (02 pts) : Réécris la phrase en remplaçant le sujet singulier par « Les jeunes bergers » :\n\n« Le jeune berger vivait dans la montagne et rendit la bourse au marchand. »',
				ex3A: '« Les jeunes bergers vivaient dans la montagne et rendirent la bourse au marchand. »',
				quizQ: 'Quelle est la conjugaison correcte au passé simple : « Ce jour-là, les villageois (être) ...... unis et (avoir) ...... beaucoup de courage. » ?',
				correctOpt: 'furent / eurent',
				distractors: [
					{ text: 'étaient / avaient', diagnosticFeedback: 'Ces deux formes sont à l’imparfait, pas au passé simple.' },
					{ text: 'fut / eut', diagnosticFeedback: 'Le sujet « les villageois » est au pluriel (ils).' },
					{ text: 'seront / auront', diagnosticFeedback: 'Ces formes sont au futur simple.' }
				]
			},
			{
				ex1Q: 'Exercice 1 (02 pts) : Mets les verbes suivants à l’imparfait avec le sujet proposé :\n\n1) Le ciel (paraître) ...... bleu.\n\n2) Les arbres (grandir) ...... près de la source.\n\n3) Nous (manger) ...... des dattes sucrées.\n\n4) Vous (avoir) ...... beaucoup de respect pour les anciens.',
				ex1A: '1) paraissait   2) grandissaient   3) mangions   4) aviez',
				ex2Q: 'Exercice 2 (02 pts) : Conjugue au passé simple (3e personne) :\n\n1) Karim (nettoyer) ...... son atelier inondé.\n\n2) Sami et Nabil (comprendre) ...... la générosité de leur frère.\n\n3) L’oncle Ahmed (voir) ...... arriver tous ses voisins.\n\n4) Les jeunes (apporter) ...... des pierres.',
				ex2A: '1) nettoya   2) comprirent   3) vit   4) apportèrent',
				ex3Q: 'Exercice 3 (02 pts) : Dis quel mot remplace chaque substitut souligné entre parenthèses :\n\n« Bilal rejoignit le marchand. (Il) (lui) remit la bourse intacte. »',
				ex3A: '« Il » remplace « Bilal » ; « lui » remplace « le marchand » (au marchand).',
				quizQ: 'Complète au passé simple : « Les deux frères (comprendre) ...... la vérité et (remercier) ...... leurs voisins. »',
				correctOpt: 'comprirent / remercièrent',
				distractors: [
					{ text: 'comprenaient / remerciaient', diagnosticFeedback: 'Ces formes sont à l’imparfait.' },
					{ text: 'comprit / remercia', diagnosticFeedback: 'Le sujet « Les deux frères » est au pluriel.' },
					{ text: 'comprendèrent / remercirent', diagnosticFeedback: '« comprendre » donne « comprirent » et « remercier » (1er gr.) donne « remercièrent ».' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.correctOpt, s.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'II — Fonctionnement de la langue',
			points: 6,
			instruction: 'Réalise les exercices suivants de conjugaison et de grammaire textuelle :',
			content: [
				{ type: 'text', content: s.ex1Q, answer: s.ex1A, mark: '2' },
				{ type: 'text', content: s.ex2Q, answer: s.ex2A, mark: '2' },
				{ type: 'text', content: s.ex3Q, answer: s.ex3A, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
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
				'الماضي الناقص للوصف والعادة (-ait / -aient)، والماضي البسيط للأحداث الرئيسة السريعة.',
				'تذكّر الشواذ الأساسية في الماضي البسيط: être (fut/furent)، avoir (eut/eurent)، prendre (prit/prirent)، voir (vit/virent).',
				'لا تنسَ الحركة المائلة (è) في نهاية أفعال المجموعة الأولى مع الجمع: aidèrent, apportèrent.'
			],
			solutionStepsAr: [s.ex1A, s.ex2A, s.ex3A],
			finalAnswer: s.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 5 : Situation d'intégration (07 pts) — Rédiger un récit moral algérien
// ═══════════════════════════════════════════════════════════════════════════════
const written2amT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2am_t1_written_recit_moral',
	grade: '2am',
	trimesterId: 't1',
	domain: 'production_ecrite',
	titleAr: 'الوضعية الإدماجية: كتابة الوضعية الابتدائية وتتمّة قصة أخلاقية جزائرية (07 نقاط)',
	curriculumLessonId: 'fre_lesson_2am_t1_rediger_recit_moral',
	defaultPoints: 7,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				prompt: 'Dans le cadre d’un concours scolaire sur les valeurs morales, rédige la situation initiale et la suite d’un court récit réaliste (8 à 10 lignes) mettant en valeur l’honnêteté d’un jeune élève ou artisan algérien.',
				notes: [
					'Commence par une formule d’ouverture (Autrefois / Jadis / Il y a bien longtemps) et décris le lieu et le héros à l’imparfait.',
					'Introduis l’élément perturbateur (Un jour / Un matin) puis raconte deux ou trois actions au passé simple.',
					'Emploie au moins un CCT, un CCL, un CCM et deux adjectifs qualificatifs.',
					'Évite les répétitions grâce aux substituts et termine par une situation finale porteuse d’une morale.',
					'Boîte à outils : village, marché, objet trouvé, propriétaire, honnête, sincère, rendre, remercier, fierté.'
				],
				modelAnswer:
					'La récompense de l’honnêteté\n\nAutrefois, dans un beau village de Tlemcen, vivait un jeune menuisier nommé Tariq. Cet artisan travailleur et honnête fabriquait de simples objets en bois avec beaucoup de soin.\n\nUn matin, en réparant un vieux coffre pour un voisin âgé, il découvrit dans un coin caché une petite enveloppe contenant des billets oubliés. Sans hésiter, le jeune homme ferma son atelier, courut chez le propriétaire et lui rendit fidèlement son argent. Ému, le vieillard le remercia chaleureusement.\n\nDepuis ce jour, tous les habitants firent confiance à Tariq, car l’honnêteté est la plus belle des richesses.',
				quizQ: 'Quelle phrase combine correctement la transition entre la situation initiale et l’élément perturbateur ?',
				correctOpt: 'Le village dormait paisiblement. Soudain, un fort vent renversa la clôture.',
				distractors: [
					{ text: 'Le village dormit paisiblement. Autrefois, un vent renversait la clôture.', diagnosticFeedback: 'La description se met à l’imparfait (dormait) et l’événement soudain au passé simple (renversa).' },
					{ text: 'Le village dort. Demain, le vent renversera la clôture.', diagnosticFeedback: 'Le récit moral classique se rédige au passé (imparfait + passé simple).' },
					{ text: 'D’abord, fermez la clôture !', diagnosticFeedback: 'C’est une consigne de texte prescriptif, pas un récit.' }
				]
			},
			{
				prompt: 'Écris un court récit moral (8 à 10 lignes) inspiré de la tradition algérienne d’entraide (la Twiza) dans un village ou un quartier face à une difficulté (neige, récolte ou réparation).',
				notes: [
					'Rédige une situation initiale à l’imparfait (formule d’ouverture, lieu algérien, ambiance harmonieuse).',
					'Introduis un problème imprévu (Un soir / Un jour) puis raconte la mobilisation des voisins au passé simple.',
					'Intègre des compléments circonstanciels (CCT, CCL, CCM) et des adjectifs bien accordés.',
					'Conclus par une situation finale mettant en lumière la force de la solidarité.',
					'Boîte à outils : voisins, entraide, neige, chemin, verger, pierres, solidaires, courageux, unis.'
				],
				modelAnswer:
					'La force de la solidarité\n\nIl y a bien longtemps, dans un village paisible des Aurès, les habitants s’estimaient et s’entraidaient chaque saison. Les maisons blanches s’accrochaient fièrement à la colline.\n\nUn soir d’hiver, une épaisse couche de neige bloqua le sentier qui menait à la maison d’une grand-mère malade. Dès l’aube, les jeunes du village prirent leurs pelles et dégagèrent le chemin avec courage. Pendant ce temps, les voisines apportèrent du bois et un repas chaud à la vieille dame.\n\nFinalement, tout le village célébra dans la joie le succès de cette entraide, prouvant que l’union triomphe de chaque épreuve.',
				quizQ: 'Dans un récit sur l’entraide, quel temps utilise-t-on pour décrire « les maisons blanches » dans la situation initiale ?',
				correctOpt: 'L’imparfait',
				distractors: [
					{ text: 'L’impératif présent', diagnosticFeedback: 'L’impératif sert à donner un ordre ou une consigne.' },
					{ text: 'Le futur simple', diagnosticFeedback: 'Le futur exprime l’avenir, pas une situation initiale au passé.' },
					{ text: 'Le passé simple', diagnosticFeedback: 'La description statique du décor utilise l’imparfait.' }
				]
			},
			{
				prompt: 'Imagine et rédige un court récit éducatif (8 à 10 lignes) racontant comment un collégien ou un jeune artisan surmonta un échec grâce à sa patience et son courage.',
				notes: [
					'Donne un titre expressif à ton récit.',
					'Présente le personnage, son lieu de vie et ses qualités morales à l’imparfait.',
					'Raconte la difficulté rencontrée et ses efforts persévérants au passé simple.',
					'Ajoute au moins un CCM et des substituts pour éviter les répétitions.',
					'Termine par la réussite et la leçon morale.'
				],
				modelAnswer:
					'Le courage de persévérer\n\nJadis, dans un quartier tranquille de Constantine, vivait un jeune apprenti potier nommé Anas. Ce garçon calme et travailleur rêvait de façonner des cruches aussi solides que celles de son grand-père.\n\nUn jour, avant le grand marché du printemps, ses premières poteries se fissurèrent dans le four. Triste un moment, Anas refusa d’abandonner : il observa attentivement l’argile, demanda conseil à son aîné et recommença son travail avec patience. Après plusieurs jours d’efforts, il sortit du four des pièces parfaites.\n\nDepuis ce jour, le jeune potier sut que la persévérance transforme toujours l’échec en réussite.',
				quizQ: 'Quelle fin exprime le mieux la morale d’un récit sur la persévérance ?',
				correctOpt: 'Depuis ce jour, il comprit que la persévérance et le travail mènent toujours au succès.',
				distractors: [
					{ text: 'Autrefois, il habitait à Constantine.', diagnosticFeedback: 'Cette phrase appartient à la situation initiale.' },
					{ text: 'Soudain, ses poteries se brisèrent.', diagnosticFeedback: 'C’est l’élément perturbateur.' },
					{ text: 'N’allumez pas de feu dans la forêt !', diagnosticFeedback: 'C’est une consigne hors sujet.' }
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
				'Pertinence et schéma narratif complet (2 pts) + Cohérence, substituts et morale (2 pts) + Langue : imparfait / passé simple, CC et accords (2 pts) + Présentation et ponctuation (1 pt).',
			mark: '7'
		});
		const mcq = buildUniqueMcqOptions(v.correctOpt, v.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'III — Situation d’intégration (Production écrite)',
			points: 7,
			instruction: 'Rédige ton récit moral avec soin en respectant les étapes et les consignes :',
			content: [block]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
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
				'احترم المراحل الأربع: الوضعية الابتدائية (imparfait)، العنصر المخلّ (Un jour / Soudain)، الأحداث (passé simple)، والنهاية الأخلاقية.',
				'أضف متممات ظرفية (CCT, CCL, CCM) وصفات نعتية متطابقة.',
				'تجنّب تكرار اسم البطل باستعمال البدائل (il, ce jeune artisan, cet homme sincère).'
			],
			solutionStepsAr: [
				'الوضعية الابتدائية: عبارة افتتاحية + مكان جزائري + وصف البطل بالماضي الناقص.',
				'العنصر المخلّ والأحداث: سرد الأفعال الأخلاقية بالماضي البسيط مع المتممات الظرفية.',
				'الوضعية النهائية: عودة الهدوء وإبراز العبرة الأخلاقية.'
			],
			finalAnswer: v.modelAnswer
		};
	}
};

export const TEMPLATES_2AM_T1: FrenchParameterizedTemplate[] = [
	comp2amT1Honnetete,
	comp2amT1EntraideCourage,
	expl2amT1CcStructure,
	expl2amT1ImparfaitPs,
	written2amT1
];
