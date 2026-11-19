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
// Template 1 : Compréhension de l'écrit (07 pts) — Fable originale : Travail & Patience
// ═══════════════════════════════════════════════════════════════════════════════
const comp2amT2Travail: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2am_t2_comp_fable_travail',
	grade: '2am',
	trimesterId: 't2',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (1): حكاية أخلاقية أصيلة حول العمل والصبر (Fable originale : travail et patience)',
	curriculumLessonId: 'fre_lesson_2am_t2_dialogue_recit',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'L’abeille laborieuse et le scarabée paresseux',
				source: 'Fable originale à visée éducative — Projet 2 (2AM)',
				paragraphs: [
					'Au printemps, dans un verger d’orangers baigné de soleil, une petite abeille laborieuse vole patiemment de fleur en fleur pour remplir sa ruche de miel doré. Non loin de là, un gros scarabée paresseux se repose à l’ombre d’une feuille.',
					'En la voyant passer, le scarabée l’interpelle moqueusement : « Pourquoi travailles-tu sans cesse par cette belle journée ? Profite plutôt du soleil ! — Je prépare les réserves de ma famille avant les froids de l’hiver, répond calmement l’abeille. Ne perds pas ton temps ! — Quelle drôle d’idée ! s’exclame le scarabée. L’hiver est encore loin ! »',
					'Quelques mois plus tard, les pluies glacées arrivent. L’abeille reste à l’abri dans sa ruche bien garnie, tandis que le scarabée grelotte et regrette sa négligence. ((Le travail sérieux d’aujourd’hui garantit la sécurité de demain.))'
				],
				glossary: [
					{ term: 'laborieuse', meaning: 'qui travaille beaucoup et avec courage' },
					{ term: 'grelotte', meaning: 'tremble de froid' }
				],
				qcmHeader: '1) Qui sont les deux personnages de cette fable ?',
				qcmOptions: ['Une abeille laborieuse et un scarabée paresseux', 'Un aigle et un poisson', 'Un berger et un marchand'],
				qcmCorrect: 'Une abeille laborieuse et un scarabée paresseux',
				tf: [
					{ q: 'L’abeille prépare ses réserves de miel dès le printemps.', a: 'Vrai', mark: '1' },
					{ q: 'Le scarabée suit immédiatement le sage conseil de l’abeille.', a: 'Faux', c: 'Il se moque et dit que l’hiver est encore loin.', mark: '1' },
					{ q: 'En hiver, le scarabée regrette sa négligence.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes d’après le texte (02 pts) :\n\na) Relève la morale placée à la fin de la fable.\n\nb) Relève deux verbes introducteurs de parole employés dans le dialogue.',
				compA: 'a) « Le travail sérieux d’aujourd’hui garantit la sécurité de demain. »\n\nb) « interpelle », « répond » ou « s’exclame » (deux au choix).',
				lexQ: '4) Observe le texte puis réponds (01 pt) :\n\na) Relève un adverbe de manière en « -ment » dans le premier paragraphe.\n\nb) Quelle est la valeur du présent dans la morale finale ?',
				lexA: 'a) « patiemment ».\n\nb) Présent de vérité générale.',
				quizQ: 'Dans « L’abeille laborieuse et le scarabée paresseux », quel est le type de la phrase : « Ne perds pas ton temps ! » ?',
				correctOpt: 'Phrase impérative à la forme négative',
				distractors: [
					{ text: 'Phrase interrogative', diagnosticFeedback: 'Elle ne pose pas de question et ne se termine pas par « ? ».' },
					{ text: 'Phrase exclamative affirmative', diagnosticFeedback: 'Elle commence par un verbe à l’impératif avec « Ne ... pas ».' },
					{ text: 'Phrase déclarative affirmative', diagnosticFeedback: 'Il n’y a pas de pronom sujet et la forme est négative.' }
				]
			},
			{
				title: 'Le chameau patient et la jeune gazelle pressée',
				source: 'Fable originale du Sahara — Projet 2 (2AM)',
				paragraphs: [
					'Un matin d’été, à la lisière d’une oasis du Sahara, un chameau calme et endurant prépare sa longue traversée des dunes. Une jeune gazelle rapide et impatiente s’arrête près de lui et observe son pas tranquille.',
					'Elle lui demande fièrement : « Comment espères-tu atteindre l’oasis voisine en marchant si lentement ? Regarde comme je cours vite ! — La route du désert est longue, conseille prudemment le chameau. Avance régulièrement et garde ton souffle ! — Quelle lenteur ! » réplique la gazelle en s’élançant à toute vitesse.',
					'Deux heures plus tard, la gazelle s’arrête, épuisée sous la chaleur, tandis que le chameau arrive paisiblement auprès d’elle et l’aide à rejoindre l’ombre des palmiers. ((La patience et la mesure mènent toujours plus loin que la précipitation.))'
				],
				glossary: [
					{ term: 'endurant', meaning: 'capable de supporter longtemps un effort' },
					{ term: 'précipitation', meaning: 'fait d’agir trop vite sans réfléchir' }
				],
				qcmHeader: '1) Où se passe cette fable originale ?',
				qcmOptions: ['Dans le Sahara, près d’une oasis', 'Dans une grande ville industrielle', 'Au bord d’un lac glacé'],
				qcmCorrect: 'Dans le Sahara, près d’une oasis',
				tf: [
					{ q: 'Le chameau conseille à la gazelle d’avancer régulièrement.', a: 'Vrai', mark: '1' },
					{ q: 'La gazelle atteint l’oasis sans aucune fatigue.', a: 'Faux', c: 'Elle s’arrête épuisée sous la chaleur après deux heures.', mark: '1' },
					{ q: 'Le chameau aide généreusement la gazelle à rejoindre l’ombre.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Pourquoi la gazelle s’arrête-t-elle au milieu du chemin ?\n\nb) Relève une phrase interrogative et une phrase exclamative dans le dialogue.',
				compA: 'a) Parce qu’elle a couru trop vite et qu’elle est épuisée sous la chaleur.\n\nb) Interrogative : « Comment espères-tu atteindre l’oasis voisine en marchant si lentement ? » ; Exclamative : « Quelle lenteur ! » (ou « Regarde comme je cours vite ! »).',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Deux adverbes de manière formés avec « -ment ».\n\nb) Un verbe au présent de narration dans le troisième paragraphe.',
				lexA: 'a) « fièrement », « lentement », « régulièrement », « prudemment » ou « paisiblement » (deux au choix).\n\nb) « s’arrête », « arrive » ou « aide ».',
				quizQ: 'Dans « Le chameau patient et la jeune gazelle pressée », de quel adjectif provient l’adverbe « prudemment » ?',
				correctOpt: 'prudent',
				distractors: [
					{ text: 'prudant', diagnosticFeedback: 'La terminaison « -emment » vient d’un adjectif en « -ent ».' },
					{ text: 'prudence', diagnosticFeedback: '« prudence » est un nom féminin, pas un adjectif.' },
					{ text: 'prudem', diagnosticFeedback: 'Cet adjectif n’existe pas.' }
				]
			},
			{
				title: 'Les deux moineaux et l’épi de blé',
				source: 'Fable originale à morale éducative — Projet 2 (2AM)',
				paragraphs: [
					'Après la moisson, dans un grand champ doré, deux petits moineaux découvrent un gros épi de blé tombé près d’un buisson. L’épi est lourd pour un seul oiseau.',
					'Le premier moineau, égoïste, s’écrie aussitôt : « Laisse cet épi ! Je l’ai vu en premier ! — Peux-tu vraiment le soulever tout seul ? demande doucement son compagnon. Unissons nos forces et partageons-le équitablement ! — Jamais ! Je réussirai seul ! » affirme le premier moineau en tirant de toutes ses forces sans réussir à le bouger.',
					'Finalement, honteux mais raisonnable, il accepte l’aide de son ami. Ensemble, les deux oiseaux transportent facilement l’épi jusqu’à leur branche. ((L’union et le partage permettent d’accomplir ce qui est impossible seul.))'
				],
				glossary: [
					{ term: 'moisson', meaning: 'récolte du blé mûr en été' },
					{ term: 'équitablement', meaning: 'de manière juste et égale' }
				],
				qcmHeader: '1) Pourquoi le premier moineau ne réussit-il pas à porter l’épi seul ?',
				qcmOptions: ['Parce que l’épi est trop lourd pour un seul oiseau', 'Parce que l’épi est mouillé', 'Parce qu’il fait nuit noire'],
				qcmCorrect: 'Parce que l’épi est trop lourd pour un seul oiseau',
				tf: [
					{ q: 'Le deuxième moineau propose de partager l’épi équitablement.', a: 'Vrai', mark: '1' },
					{ q: 'Le premier moineau réussit finalement à soulever l’épi sans aide.', a: 'Faux', c: 'Il accepte l’aide de son ami et ils le transportent ensemble.', mark: '1' },
					{ q: 'La fable enseigne la valeur de l’union et du partage.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Quel conseil sage le deuxième moineau donne-t-il ?\n\nb) Quels signes de ponctuation encadrent et organisent le dialogue dans le deuxième paragraphe ?',
				compA: 'a) Il propose d’unir leurs forces et de partager l’épi équitablement.\n\nb) Les deux-points (:), les guillemets (« ») et les tirets (—).',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Un verbe introducteur placé après les paroles (en incise).\n\nb) La morale finale de la fable.',
				lexA: 'a) « demande » ou « affirme ».\n\nb) « L’union et le partage permettent d’accomplir ce qui est impossible seul. »',
				quizQ: 'Quelle est la valeur du présent dans la phrase : « L’union et le partage permettent d’accomplir ce qui est impossible seul. » ?',
				correctOpt: 'Présent de vérité générale',
				distractors: [
					{ text: 'Présent d’énonciation', diagnosticFeedback: 'Cette phrase n’est pas dans le dialogue, c’est une vérité valable en tout temps.' },
					{ text: 'Présent de narration', diagnosticFeedback: 'Elle ne raconte pas une action précise mais formule une morale universelle.' },
					{ text: 'Impératif présent', diagnosticFeedback: 'Le verbe « permettent » a un sujet et est à l’indicatif.' }
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
			instruction: 'Lis attentivement cette fable puis réponds aux questions :',
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
			grade: '2am',
			trimesterId: 't2',
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
				'الحكاية الأخلاقية تعرض شخصيتين متقابلتين وحوارا منقطا بدقة ومغزى في آخر النص.',
				'استخرج أفعال القول المتنوعة (demande, répond, conseille, s’exclame) وظروف الطريقة (-ment).',
				'تذكّر أن المغزى الأخلاقي يُصاغ في مضارع الحقيقة العامة.'
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
// Template 2 : Compréhension de l'écrit (07 pts) — Fable originale : Sagesse & Modestie
// ═══════════════════════════════════════════════════════════════════════════════
const comp2amT2Sagesse: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2am_t2_comp_fable_sagesse',
	grade: '2am',
	trimesterId: 't2',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (2): حكاية أخلاقية أصيلة حول الحكمة والتواضع والكرم (Fable originale : sagesse)',
	curriculumLessonId: 'fre_lesson_2am_t2_present_narration',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'Le hérisson sage et le chacal orgueilleux',
				source: 'Fable originale — Modestie et réflexion (2AM)',
				paragraphs: [
					'Près d’une colline boisée, un chacal orgueilleux se vante chaque jour d’être le plus malin de la vallée. Un soir, il rencontre un petit hérisson discret qui examine prudemment un passage étroit.',
					'Le chacal rit et lui lance : « Que fais-tu là, petite boule d’épines ? Tu n’as ni vitesse ni force ! — Ne juge jamais sur les apparences ! répond poliment le hérisson. La réflexion protège mieux que la vantardise. — Quel discours inutile ! » moque le chacal en s’élançant sans regarder dans un fossé plein de ronces.',
					'Coincé et penaud, le chacal appelle au secours. Le hérisson pousse calmement une solide branche pour l’aider à sortir. ((La modestie et la sagesse valent toujours mieux que l’orgueil.))'
				],
				glossary: [
					{ term: 'vantardise', meaning: 'habitude de se vanter avec orgueil' },
					{ term: 'penaud', meaning: 'honteux et embarrassé' }
				],
				qcmHeader: '1) Quel défaut cause la chute du chacal dans le fossé ?',
				qcmOptions: ['Son orgueil et son imprudence', 'Sa générosité', 'Sa trop grande lenteur'],
				qcmCorrect: 'Son orgueil et son imprudence',
				tf: [
					{ q: 'Le chacal respecte le hérisson dès le début de leur rencontre.', a: 'Faux', c: 'Il se moque de lui en disant qu’il n’a ni vitesse ni force.', mark: '1' },
					{ q: 'Le hérisson répond poliment au chacal.', a: 'Vrai', mark: '1' },
					{ q: 'Le hérisson aide le chacal à sortir du fossé avec une branche.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Quelle réponse sage le hérisson donne-t-il au chacal ?\n\nb) Comment le hérisson prouve-t-il sa bonté à la fin du récit ?',
				compA: 'a) Il lui dit de ne jamais juger sur les apparences et que la réflexion protège mieux que la vantardise.\n\nb) Il pousse une solide branche pour aider le chacal à sortir du fossé.',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Deux adverbes de manière en « -ment ».\n\nb) Un adjectif qualificatif qui caractérise le chacal au début.',
				lexA: 'a) « prudemment », « poliment » ou « calmement » (deux au choix).\n\nb) « orgueilleux » (ou « malin »).',
				quizQ: 'De quel adjectif est formé l’adverbe « poliment » dans le dialogue du hérisson ?',
				correctOpt: 'poli',
				distractors: [
					{ text: 'politesse', diagnosticFeedback: '« politesse » est un nom féminin.' },
					{ text: 'polie', diagnosticFeedback: 'Avec un adjectif terminé par une voyelle (poli), on ajoute directement « -ment » sans « e ».' },
					{ text: 'polir', diagnosticFeedback: '« polir » est un verbe.' }
				]
			},
			{
				title: 'La tortue généreuse et le héron égoïste',
				source: 'Fable originale — Générosité et amitié (2AM)',
				paragraphs: [
					'Au bord d’un oued paisible, une tortue généreuse partage volontiers l’ombre de son rocher et les jeunes pousses avec les petits animaux. À côté, un grand héron égoïste chasse tout le monde de sa rive.',
					'Un après-midi, un petit oisillon assoiffé demande au héron : « Puis-je boire une goutte d’eau ici ? — Va-t’en ailleurs ! Cette berge est à moi ! » crie durement le héron. La tortue intervient aussitôt : « Viens près de moi, cher oisillon ! L’eau de l’oued appartient à tous ! »',
					'Quelques jours plus tard, la patte du héron se coince entre deux galets. Personne n’ose approcher, mais la tortue et les oiseaux accourent généreusement pour le libérer. Honteux, le héron les remercie sincèrement. ((Celui qui ouvre son cœur gagne toujours de vrais amis.))'
				],
				glossary: [
					{ term: 'berge', meaning: 'bord d’une rivière ou d’un oued' },
					{ term: 'galets', meaning: 'pierres lisses au bord de l’eau' }
				],
				qcmHeader: '1) Quel est le comportement du héron envers l’oisillon assoiffé ?',
				qcmOptions: ['Il le chasse durement de la berge', 'Il lui offre de l’eau', 'Il lui construit un nid'],
				qcmCorrect: 'Il le chasse durement de la berge',
				tf: [
					{ q: 'La tortue partage volontiers son coin d’ombre avec les autres animaux.', a: 'Vrai', mark: '1' },
					{ q: 'Le héron a la patte coincée entre deux galets.', a: 'Vrai', mark: '1' },
					{ q: 'La tortue refuse d’aider le héron quand il est en danger.', a: 'Faux', c: 'La tortue et les oiseaux accourent généreusement pour le libérer.', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Que dit la tortue à l’oisillon assoiffé ?\n\nb) Quels sentiments le héron ressent-il après avoir été sauvé ?',
				compA: 'a) Elle l’invite près d’elle en disant que l’eau de l’oued appartient à tous.\n\nb) Il est honteux et reconnaissant (il les remercie sincèrement).',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Une phrase interrogative dans le dialogue.\n\nb) Deux adverbes de manière dans le dernier paragraphe.',
				lexA: 'a) « Puis-je boire une goutte d’eau ici ? »\n\nb) « généreusement » et « sincèrement ».',
				quizQ: 'Quelle est la valeur du présent dans : « La tortue et les oiseaux accourent généreusement pour le libérer. » ?',
				correctOpt: 'Présent de narration',
				distractors: [
					{ text: 'Présent de vérité générale', diagnosticFeedback: 'Il s’agit d’une action précise de l’histoire, pas d’une règle universelle.' },
					{ text: 'Présent d’énonciation', diagnosticFeedback: 'Cette phrase est racontée par le narrateur hors du dialogue.' },
					{ text: 'Futur proche', diagnosticFeedback: 'Il n’y a pas d’auxiliaire « aller ».' }
				]
			},
			{
				title: 'Le cheval fidèle et le mulet vantard',
				source: 'Fable originale — Humilité et loyauté (2AM)',
				paragraphs: [
					'Sur un sentier de montagne, un cheval fidèle et un mulet vantard transportent chacun des sacs de farine pour le meunier du village. Le chemin monte raide sous le soleil.',
					'Le mulet s’exclame fièrement : « Comme je suis robuste ! Je pourrais porter le double sans effort ! — Ne te vante pas trop vite, lui conseille doucement le cheval. La pente devient difficile près du sommet. — Tais-toi ! Tu es jaloux de ma force ! » réplique sèchement le mulet.',
					'Mais devant la dernière côte, le mulet glisse et perd haleine. Sans reproche, le cheval prend la moitié de sa charge et l’aide à finir la montée. Le mulet baisse la tête et comprend sa leçon : ((La vraie force s’accompagne toujours d’humilité et d’entraide.))'
				],
				glossary: [
					{ term: 'meunier', meaning: 'personne qui moud le blé pour obtenir de la farine' },
					{ term: 'humilité', meaning: 'modestie, absence d’orgueil' }
				],
				qcmHeader: '1) Que transportent le cheval et le mulet pour le meunier ?',
				qcmOptions: ['Des sacs de farine', 'Des caisses de poissons', 'Des livres d’école'],
				qcmCorrect: 'Des sacs de farine',
				tf: [
					{ q: 'Le mulet se vante d’être très robuste.', a: 'Vrai', mark: '1' },
					{ q: 'Le cheval se moque du mulet quand celui-ci perd haleine.', a: 'Faux', c: 'Sans reproche, le cheval prend la moitié de sa charge pour l’aider.', mark: '1' },
					{ q: 'La fable valorise l’humilité et l’entraide.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Que fait le cheval lorsque le mulet n’arrive plus à monter la côte ?\n\nb) Relève une phrase exclamative et une phrase impérative dans le dialogue.',
				compA: 'a) Il prend la moitié de sa charge et l’aide à finir la montée.\n\nb) Exclamative : « Comme je suis robuste ! » ; Impérative : « Ne te vante pas trop vite » ou « Tais-toi ! ».',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Deux verbes introducteurs de parole.\n\nb) La morale de la fable.',
				lexA: 'a) « s’exclame », « conseille » ou « réplique » (deux au choix).\n\nb) « La vraie force s’accompagne toujours d’humilité et d’entraide. »',
				quizQ: 'Dans le texte « Le cheval fidèle et le mulet vantard », quel adverbe de manière signifie « de façon brusque et froide » ?',
				correctOpt: 'sèchement',
				distractors: [
					{ text: 'doucement', diagnosticFeedback: '« doucement » signifie avec calme et gentillesse.' },
					{ text: 'fièrement', diagnosticFeedback: '« fièrement » exprime l’orgueil ou la fierté.' },
					{ text: 'toujours', diagnosticFeedback: '« toujours » est un adverbe de temps, pas de manière.' }
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
			instruction: 'Lis attentivement la fable puis réponds aux questions suivantes :',
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
				{ type: 'text', content: '2) Réponds par « Vrai » ou « Faux » et justifie quand c’est faux (03 pts) :' },
				{ type: 'true_false', items: v.tf },
				{ type: 'text', content: v.compQ, answer: v.compA, mark: '2' },
				{ type: 'text', content: v.lexQ, answer: v.lexA, mark: '1' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't2',
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
				'لاحظ كيف تتقابل صفات الحيوانين لتُنتج العبرة الأخلاقية في الختام.',
				'ميّز بين الجملة التعجبية (Comme / Quel) والجملة الأمرية (فعل أمر دون ضمير).',
				'تحقّق من قيمة المضارع حسب موضعه: سرد، حوار، أو مغزى.'
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
// Template 3 : Fonctionnement de la langue (06 pts) — Dialogue & Types de phrases
// ═══════════════════════════════════════════════════════════════════════════════
const expl2amT2DialogueTypes: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2am_t2_expl_dialogue_types_phrases',
	grade: '2am',
	trimesterId: 't2',
	domain: 'grammaire_syntaxe',
	titleAr: 'البناء اللغوي (1): ترقيم الحوار وأفعال القول وأنواع الجمل وصيغها',
	curriculumLessonId: 'fre_lesson_2am_t2_types_formes_phrases',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const sets = [
			{
				ex1Q: 'Exercice 1 (02 pts) : Ponctue correctement ce court dialogue (deux-points, guillemets, tirets, points) et remplace « dit » par un verbe plus précis (demande / répond) :\n\nLe scarabée dit à l’abeille Pourquoi travailles-tu autant Elle dit Je prépare le miel pour l’hiver',
				ex1A: 'Le scarabée demande à l’abeille : « Pourquoi travailles-tu autant ? — Je prépare le miel pour l’hiver. » répond-elle.',
				tableIntro: 'Exercice 2 (02 pts) : Classe les phrases suivantes dans le tableau selon leur type :\n\nA) « Peux-tu m’aider à porter ce sac ? »\n\nB) « Quelle belle leçon de modestie ! »\n\nC) « Ne te moque jamais de ton voisin ! »',
				interr: ['Phrase A'],
				excl: ['Phrase B'],
				imper: ['Phrase C'],
				ex3Q: 'Exercice 3 (02 pts) : Indique le type et la forme (affirmative / négative) de chaque phrase :\n\n1) « Ne gaspille jamais tes forces ! »\n\n2) « La patience mène toujours à la réussite. »',
				ex3A: '1) Type : impérative / Forme : négative.\n\n2) Type : déclarative / Forme : affirmative.',
				quizQ: 'Quel verbe introducteur convient le mieux pour : « ...... la tortue, viens boire près de moi ! » ?',
				correctOpt: 'propose (ou invite)',
				distractors: [
					{ text: 'interroge', diagnosticFeedback: 'La phrase n’est pas une question.' },
					{ text: 'questionne', diagnosticFeedback: 'Il n’y a pas de point d’interrogation.' },
					{ text: 'gronde', diagnosticFeedback: 'La tortue se montre généreuse et accueillante.' }
				]
			},
			{
				ex1Q: 'Exercice 1 (02 pts) : Remplace le verbe répété « dit » par le verbe qui convient (conseille / demande / s’exclame / répond) :\n\n1) « Où vas-tu si vite ? » dit le chameau.\n\n2) « Quelle imprudence ! » dit le hérisson.\n\n3) « Avance avec calme ! » dit l’ami sage.\n\n4) « Merci pour ton aide. » dit le mulet.',
				ex1A: '1) demande   2) s’exclame   3) conseille   4) répond',
				tableIntro: 'Exercice 2 (02 pts) : Classe les trois phrases dans le tableau selon leur type :\n\nA) « Comme cette abeille est courageuse ! »\n\nB) « Partageons ce grain de blé ! »\n\nC) « Pourquoi refuses-tu d’aider ton ami ? »',
				interr: ['Phrase C'],
				excl: ['Phrase A'],
				imper: ['Phrase B'],
				ex3Q: 'Exercice 3 (02 pts) : Transforme la phrase déclarative suivante en phrase interrogative (par inversion) puis en phrase exclamative :\n\n« Ce chameau est patient. »',
				ex3A: 'Interrogative : « Ce chameau est-il patient ? »\n\nExclamative : « Comme ce chameau est patient ! » (ou « Quel chameau patient ! »).',
				quizQ: 'Quelle réplique respecte l’inversion du sujet dans la proposition incise ?',
				correctOpt: '« Unissons nos forces ! » conseille le moineau.',
				distractors: [
					{ text: '« Unissons nos forces ! » le moineau conseille.', diagnosticFeedback: 'En proposition incise, on place le verbe avant le sujet.' },
					{ text: '« Unissons nos forces ! » il le moineau conseille.', diagnosticFeedback: 'On ne double pas le sujet.' },
					{ text: '« Unissons nos forces ! » conseiller le moineau.', diagnosticFeedback: 'Le verbe doit être conjugué.' }
				]
			},
			{
				ex1Q: 'Exercice 1 (02 pts) : Rétablis la ponctuation du dialogue ( : « » — ? ! ) :\n\nLa gazelle interroge le chameau N’es-tu pas trop lent Il répond calmement Patience et mesure valent mieux que précipitation',
				ex1A: 'La gazelle interroge le chameau : « N’es-tu pas trop lent ? — Patience et mesure valent mieux que précipitation ! » répond-il calmement.',
				tableIntro: 'Exercice 2 (02 pts) : Classe les phrases suivantes dans le tableau :\n\nA) « Écoute les conseils des plus sages ! »\n\nB) « As-tu préparé tes provisions ? »\n\nC) « Quelle générosité admirable ! »',
				interr: ['Phrase B'],
				excl: ['Phrase C'],
				imper: ['Phrase A'],
				ex3Q: 'Exercice 3 (02 pts) : Complète chaque phrase exclamative avec (Quel / Quelle / Quels / Quelles) :\n\n1) ...... belle entraide !\n\n2) ...... courage exemplaire !\n\n3) ...... sages paroles !',
				ex3A: '1) Quelle belle entraide !   2) Quel courage exemplaire !   3) Quelles sages paroles !',
				quizQ: 'Quelle est la nature exacte de la phrase : « N’oublie jamais les bienfaits de ton ami ! » ?',
				correctOpt: 'Phrase impérative à la forme négative',
				distractors: [
					{ text: 'Phrase exclamative négative', diagnosticFeedback: 'Le verbe « oublie » est conjugué à l’impératif sans pronom sujet.' },
					{ text: 'Phrase déclarative négative', diagnosticFeedback: 'Une phrase déclarative a un sujet exprimé et finit par un point.' },
					{ text: 'Phrase interrogative négative', diagnosticFeedback: 'Il n’y a pas de question.' }
				]
			}
		];

		const s = rng.pick(sets);
		const typesTable = buildFrenchClassificationTableBlock({
			columns: [
				{ header: 'Interrogative', items: s.interr, mark: '0.5' },
				{ header: 'Exclamative', items: s.excl, mark: '0.75' },
				{ header: 'Impérative', items: s.imper, mark: '0.75' }
			]
		});
		const mcq = buildUniqueMcqOptions(s.correctOpt, s.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'II — Fonctionnement de la langue',
			points: 6,
			instruction: 'Réalise les trois activités suivantes sur le dialogue et les types de phrases :',
			content: [
				{ type: 'text', content: s.ex1Q, answer: s.ex1A, mark: '2' },
				{ type: 'text', content: s.tableIntro },
				typesTable,
				{ type: 'text', content: s.ex3Q, answer: s.ex3A, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't2',
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
				'في الحوار ضع النقطتين (:) قبل المزدوجتين (« ») والعارضة (—) عند تغيّر المتكلم.',
				'نوّع أفعال القول حسب نوع الجملة: سؤال (demande)، جواب (répond)، نصيحة (conseille)، تعجّب (s’exclame).',
				'الجملة التي تبدأ بفعل أمر بدون ضمير هي أمرية (impérative) حتى لو انتهت بـ (!).'
			],
			solutionStepsAr: [
				s.ex1A,
				`Interrogative : ${s.interr.join(', ')} | Exclamative : ${s.excl.join(', ')} | Impérative : ${s.imper.join(', ')}`,
				s.ex3A
			],
			finalAnswer: s.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 4 : Fonctionnement de la langue (06 pts) — Présent de narration, Adverbes -ment & Accords
// ═══════════════════════════════════════════════════════════════════════════════
const expl2amT2PresentAdverbes: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2am_t2_expl_present_adverbes',
	grade: '2am',
	trimesterId: 't2',
	domain: 'orthographe_accords',
	titleAr: 'البناء اللغوي (2): مضارع السرد، ظروف الطريقة (-ment) ومطابقة الصفات',
	curriculumLessonId: 'fre_lesson_2am_t2_adverbes_accord_adj',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const sets = [
			{
				ex1Q: 'Exercice 1 (02 pts) : Conjugue les verbes entre parenthèses au présent de narration :\n\n1) Soudain, le hérisson (voir) ...... le danger et (avertir) ...... le chacal.\n\n2) Les deux moineaux (prendre) ...... l’épi ensemble et (réussir) ...... à le porter.',
				ex1A: '1) voit / avertit   2) prennent / réussissent',
				ex2Q: 'Exercice 2 (02 pts) : Forme l’adverbe de manière correspondant à chaque adjectif :\n\n1) courageux : ......   2) poli : ......   3) patient : ......   4) brillant : ......',
				ex2A: '1) courageusement   2) poliment   3) patiemment   4) brillamment',
				ex3Q: 'Exercice 3 (02 pts) : Réécris la phrase au féminin pluriel en veillant à l’accord des adjectifs et à l’invariabilité de l’adverbe :\n\n« L’animal laborieux et attentif travaille calmement. » devient : « Les abeilles ...... »',
				ex3A: '« Les abeilles laborieuses et attentives travaillent calmement. »',
				quizQ: 'Quelle série d’adverbes de manière est entièrement correcte ?',
				correctOpt: 'doucement — poliment — prudemment — constamment',
				distractors: [
					{ text: 'douxment — poliement — prudentement — constantement', diagnosticFeedback: 'Applique les 3 règles : féminin + ment, voyelle + ment, -ent/-ant -> -emment/-amment.' },
					{ text: 'doucement — poliment — prudamment — constemment', diagnosticFeedback: 'prudent (-ent) -> prudemment ; constant (-ant) -> constamment.' },
					{ text: 'doucements — poliments — prudemment — constamment', diagnosticFeedback: 'Un adverbe est toujours invariable : jamais de « s » !' }
				]
			},
			{
				ex1Q: 'Exercice 1 (02 pts) : Indique la valeur du présent dans chaque phrase (présent de narration / présent de vérité générale / présent d’énonciation) :\n\n1) « En ce moment, je récolte du nectar ! » dit l’abeille.\n\n2) La modestie élève toujours celui qui la pratique.\n\n3) Tout à coup, la tortue pousse la branche et sauve le héron.',
				ex1A: '1) Présent d’énonciation   2) Présent de vérité générale   3) Présent de narration',
				ex2Q: 'Exercice 2 (02 pts) : Transforme les adjectifs entre parenthèses en adverbes de manière :\n\n1) Le cheval aide son compagnon (généreux) ...... .\n\n2) Le hérisson avance (prudent) ...... .\n\n3) L’abeille répond (vrai) ...... avec sagesse.\n\n4) Les oiseaux partagent (équitable) ...... le blé.',
				ex2A: '1) généreusement   2) prudemment   3) vraiment   4) équitablement',
				ex3Q: 'Exercice 3 (02 pts) : Accorde les adjectifs qualificatifs entre parenthèses :\n\n« Ces fables (original) ...... et (instructif) ...... présentent des héroïnes (généreux) ...... et (sage) ...... . »',
				ex3A: '« Ces fables originales et instructives présentent des héroïnes généreuses et sages. »',
				quizQ: 'Quel adverbe complète correctement : « Le scarabée répond ...... à l’abeille. » (méchant) ?',
				correctOpt: 'méchamment',
				distractors: [
					{ text: 'méchantement', diagnosticFeedback: 'Un adjectif en « -ant » donne un adverbe en « -amment ».' },
					{ text: 'méchemment', diagnosticFeedback: '« méchant » se termine par « -ant » (avec a), donc « -amment ».' },
					{ text: 'méchante', diagnosticFeedback: '« méchante » est un adjectif féminin, pas un adverbe.' }
				]
			},
			{
				ex1Q: 'Exercice 1 (02 pts) : Réécris ce passage au présent de narration :\n\n« Le chameau traversa les dunes, trouva la gazelle fatiguée et lui offrit son aide. »',
				ex1A: '« Le chameau traverse les dunes, trouve la gazelle fatiguée et lui offre son aide. »',
				ex2Q: 'Exercice 2 (02 pts) : Donne l’adverbe de manière issu de chaque adjectif :\n\n1) doux : ......   2) fier : ......   3) suffisant : ......   4) gentil : ......',
				ex2A: '1) doucement   2) fièrement   3) suffisamment   4) gentiment',
				ex3Q: 'Exercice 3 (02 pts) : Corrige les deux fautes d’accord dans cette phrase :\n\n« Les petites fourmis actif travaillent couragesements pour l’hiver. »',
				ex3A: '« Les petites fourmis actives travaillent courageusement pour l’hiver. »',
				quizQ: 'Quelle est la forme correcte de l’adverbe formé à partir de « gentil » ?',
				correctOpt: 'gentiment',
				distractors: [
					{ text: 'gentillement', diagnosticFeedback: '« gentil » est une exception : on écrit « gentiment » sans « ll ».' },
					{ text: 'gentilment', diagnosticFeedback: 'On supprime le « l » : gentiment.' },
					{ text: 'gentimment', diagnosticFeedback: 'Il n’y a qu’un seul « m » : gentiment.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.correctOpt, s.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'II — Fonctionnement de la langue',
			points: 6,
			instruction: 'Fais soigneusement les exercices de conjugaison et d’orthographe suivants :',
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
			trimesterId: 't2',
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
				'تذكّر قواعد تكوين ظرف الطريقة: مؤنث + ment / علة + ment / -ent تصبح -emment / -ant تصبح -amment.',
				'الظرف كلمة ثابتة لا تُجمع ولا تؤنّث أبدا، عكس الصفة التي تطابق الاسم.',
				'مضارع السرد يروي أحداث الحكاية بحيوية، ومضارع الحقيقة العامة يصوغ المغزى.'
			],
			solutionStepsAr: [s.ex1A, s.ex2A, s.ex3A],
			finalAnswer: s.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 5 : Situation d'intégration (07 pts) — Rédiger une courte fable originale
// ═══════════════════════════════════════════════════════════════════════════════
const written2amT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2am_t2_written_fable_originale',
	grade: '2am',
	trimesterId: 't2',
	domain: 'production_ecrite',
	titleAr: 'الوضعية الإدماجية: كتابة حكاية أخلاقية قصيرة وأصيلة تتضمّن حوارا ومغزى (07 نقاط)',
	curriculumLessonId: 'fre_lesson_2am_t2_rediger_fable_morale',
	defaultPoints: 7,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				prompt: 'Pour le recueil de fables de ta classe, imagine et rédige une courte fable originale (8 à 10 lignes) mettant en scène deux animaux aux caractères opposés afin d’illustrer la valeur du travail et de la prévoyance.',
				notes: [
					'Donne un titre présentant les deux personnages (ex : L’abeille et le scarabée, ou La fourmi et le papillon).',
					'Emploie le présent de narration dans le récit.',
					'Insère un dialogue bien ponctué (: « » —) avec des verbes introducteurs variés et au moins deux types de phrases (? / !).',
					'Utilise deux adverbes de manière en « -ment » et termine par une morale au présent de vérité générale.'
				],
				modelAnswer:
					'La fourmi laborieuse et le papillon distrait\n\nEn été, près d’un champ de blé, une petite fourmi laborieuse transporte courageusement des grains vers son abri. Un papillon distrait la regarde en souriant.\n\nIl lui demande : « Pourquoi te fatigues-tu autant sous ce beau soleil ? — Je prépare la nourriture de l’hiver ! répond calmement la fourmi. Prépare aussi ton abri ! — Quelle idée triste ! » s’exclame le papillon en volant plus loin.\n\nQuand le vent froid d’automne arrive, le papillon frissonne et cherche de l’aide. La fourmi généreuse l’accueille au chaud. Il comprend alors la leçon : « Le travail et la prévoyance préparent toujours un avenir serein. »',
				quizQ: 'Quelle règle est indispensable pour réussir le dialogue dans une fable en 2AM ?',
				correctOpt: 'Employer (: « » —), varier les verbes de parole et diversifier les types de phrases',
				distractors: [
					{ text: 'Supprimer tous les guillemets et tous les tirets', diagnosticFeedback: 'La ponctuation du dialogue est essentielle pour distinguer les répliques.' },
					{ text: 'Répéter le verbe « dire » après chaque phrase', diagnosticFeedback: 'Il faut varier les verbes introducteurs : demander, répondre, conseiller, s’exclamer.' },
					{ text: 'Écrire la morale au passé simple', diagnosticFeedback: 'La morale s’écrit au présent de vérité générale.' }
				]
			},
			{
				prompt: 'Rédige une courte fable originale (8 à 10 lignes) mettant en scène deux animaux du désert ou des montagnes d’Algérie (ex : le chameau et la gazelle, ou le hérisson et le chacal) pour enseigner la sagesse et la modestie.',
				notes: [
					'Propose un titre clair.',
					'Décris rapidement les deux personnages avec des adjectifs bien accordés.',
					'Rédige un court dialogue (3 à 4 répliques) en respectant la ponctuation et l’inversion du sujet en incise.',
					'Emploie au moins deux adverbes de manière (patiemment, fièrement, prudemment...).',
					'Conclus par une morale brève au présent de vérité générale.'
				],
				modelAnswer:
					'L’aiglon impatient et le vieux faucon\n\nAu sommet d’une montagne des Aurès, un jeune aiglon vantard déploie ses ailes face au vent. Un vieux faucon sage l’observe attentivement.\n\nLe jeune oiseau s’exclame fièrement : « Regarde ! Je peux déjà voler plus haut que les nuages ! — Attends que l’orage passe, conseille prudemment le faucon. Ne te fie pas à ta seule fierté ! — Pourquoi aurais-je peur du vent ? » réplique l’aiglon en s’élançant.\n\nBientôt, une forte rafale le bouscule. Le vieux faucon le guide doucement vers un rocher sûr. L’aiglon baisse la tête et retient cette morale : « Écouter les conseils des plus sages évite bien des dangers. »',
				quizQ: 'Quelle phrase exprime le mieux la morale de cette fable sur la sagesse ?',
				correctOpt: 'Écouter les conseils des plus sages évite bien des dangers.',
				distractors: [
					{ text: 'Soudain, une rafale bouscula le nid.', diagnosticFeedback: 'C’est une action du récit, pas une morale.' },
					{ text: 'Où se trouve la montagne des Aurès ?', diagnosticFeedback: 'Une question géographique n’est pas une morale.' },
					{ text: 'L’aiglon avait de grandes ailes.', diagnosticFeedback: 'C’est une phrase descriptive à l’imparfait.' }
				]
			},
			{
				prompt: 'Imagine une courte fable originale (8 à 10 lignes) qui montre comment la générosité et l’entraide triomphent de l’égoïsme entre deux animaux de la nature.',
				notes: [
					'Choisis deux animaux aux comportements opposés (l’un généreux, l’autre égoïste).',
					'Raconte leur rencontre et leur dialogue au présent de narration.',
					'Respecte la ponctuation du dialogue et varie les types de phrases (déclarative, interrogative, impérative, exclamative).',
					'Intègre deux adverbes en « -ment » et une morale finale bien formulée.'
				],
				modelAnswer:
					'La colombe généreuse et le corbeau égoïste\n\nDans un verger d’oliviers, un corbeau égoïste garde pour lui tout un tas de graines tombées au sol. Une petite colombe affamée s’approche poliment.\n\n« Pourrais-tu partager quelques graines avec moi ? demande-t-elle doucement. — Jamais ! Cherche ta nourriture ailleurs ! » répond durement le corbeau. La colombe s’éloigne sans colère et trouve un ruisseau clair.\n\nPlus tard, le corbeau s’étouffe avec une grosse graine sèche. La colombe accourt aussitôt, lui apporte un peu d’eau dans son bec et le soulage. Honteux, le corbeau partage alors tout son repas. Morale : « La générosité transforme même les cœurs fermés en amis fidèles. »',
				quizQ: 'Dans le dialogue d’une fable, quel signe marque le changement de personnage qui parle ?',
				correctOpt: 'Le tiret (—) en début de ligne',
				distractors: [
					{ text: 'Le point-virgule (;)', diagnosticFeedback: 'Le point-virgule sépare deux propositions liées.' },
					{ text: 'Les parenthèses ()', diagnosticFeedback: 'Les parenthèses servent à ajouter une précision, pas à changer de locuteur.' },
					{ text: 'La virgule (,)', diagnosticFeedback: 'La virgule ne marque pas un changement de locuteur.' }
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
				'Pertinence et morale claire (2 pts) + Cohérence et ponctuation du dialogue (2 pts) + Langue : présent de narration, types de phrases, adverbes en -ment et accords (2 pts) + Présentation (1 pt).',
			mark: '7'
		});
		const mcq = buildUniqueMcqOptions(v.correctOpt, v.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'III — Situation d’intégration (Production écrite)',
			points: 7,
			instruction: 'Rédige ta fable originale avec soin en suivant toutes les consignes :',
			content: [block]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't2',
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
				'اختر حيوانين متقابلين في الصفات واكتب لهما عنوانا مناسبا.',
				'أدرج حوارا قصيرا بعلامات الترقيم الدقيقة (: « » —) مع تنويع أفعال القول وأنواع الجمل.',
				'أضف ظرفي طريقة (-ment) واختم بمغزى أخلاقي في مضارع الحقيقة العامة.'
			],
			solutionStepsAr: [
				'العنوان والتمهيد: تقديم المكان والحيوانين المتضادين في مضارع السرد.',
				'الحوار: 3 إلى 4 مداخلات بترقيم سليم وأفعال قول متنوعة وظروف طريقة.',
				'الخاتمة والمغزى: نتيجة منطقية وحكمة أخلاقية في مضارع الحقيقة العامة.'
			],
			finalAnswer: v.modelAnswer
		};
	}
};

export const TEMPLATES_2AM_T2: FrenchParameterizedTemplate[] = [
	comp2amT2Travail,
	comp2amT2Sagesse,
	expl2amT2DialogueTypes,
	expl2amT2PresentAdverbes,
	written2amT2
];
