import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	FrenchGeneratedExerciseInstance,
	FrenchParameterizedTemplate
} from '../../types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildFrenchClassificationTableBlock,
	buildFrenchPassageBlock,
	buildFrenchWordFamilyTableBlock,
	buildFrenchWrittenProductionBlock
} from '../../french-helpers';

// ============================================================================
// 5 Parameterized Templates — 1AS TCL Trimester 2 (Points split: 7 + 6 + 7 = 20)
// 2 comprehension (7 pts) + 2 text_exploration (6 pts) + 1 written_expression (7 pts)
// Projet 2 : La lettre ouverte argumentée et l'entretien / interview
// ============================================================================

// 1. Compréhension 1 — La lettre ouverte engagée (7 pts)
const tpl1asTclT2LettreEngageeComp: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcl_t2_lettre_engagee_comp',
	grade: '1as_tcl',
	trimesterId: 't2',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب — الرسالة المفتوحة الملتزمة (القراءة، صيانة التراث، ومحاربة تبذير الغذاء)',
	curriculumLessonId: 'fre_lesson_1as_tcl_t2_lettre_ouverte_entretien',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'Lettre ouverte à Monsieur le Proviseur pour revitaliser la bibliothèque du lycée',
				source: 'Les élèves de 1AS TCL, Constantine, le 15 janvier 2026',
				paragraphs: [
					'Monsieur le Proviseur, nous avons l’honneur de [[vous]] adresser cette lettre ouverte afin d’attirer votre attention sur la nécessité urgente d’enrichir et de moderniser la bibliothèque de notre lycée.',
					'Tout d’abord, bien que les outils numériques soient aujourd’hui très répandus, le livre imprimé demeure un compagnon irremplaçable pour la concentration et la maîtrise des langues. En effet, une lecture régulière développe le vocabulaire, la culture générale et l’esprit d’analyse. En outre, notre salle de lecture manque actuellement d’ouvrages d’histoire, de dictionnaires récents et de tables calmes ; c’est une situation regrettable qui décourage certains camarades.',
					'Par conséquent, nous souhaiterions organiser une collecte volontaire de livres utiles et créer un club de lecture hebdomadaire encadré par nos professeurs. Convaincus que [[notre]] initiative culturelle retiendra toute votre bienveillance, veuillez agréer, Monsieur le Proviseur, l’expression de notre profond respect.'
				],
				glossary: [
					{ term: 'revitaliser', meaning: 'redonner de l’énergie, du dynamisme et de la vie à un lieu' },
					{ term: 'bienveillance', meaning: 'attitude favorable, attentive et compréhensive' }
				],
				tfItems: [
					{
						q: 'Les élèves estiment que les écrans rendent totalement inutiles les livres imprimés.',
						a: 'Faux',
						c: 'Ils affirment que, bien que les outils numériques soient répandus, le livre imprimé demeure irremplaçable.',
						mark: '0.5'
					},
					{
						q: 'La bibliothèque du lycée manque actuellement de dictionnaires récents et d’ouvrages d’histoire.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Les signataires proposent une collecte volontaire de livres et un club de lecture.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Quelle est la thèse principale défendue par les élèves au paragraphe 1 et au début du paragraphe 2 ?',
				a1: 'Il est urgent d’enrichir et de moderniser la bibliothèque scolaire car le livre imprimé reste irremplaçable pour la formation des lycéens.',
				q2: 'Relevez dans le paragraphe 2 une proposition exprimant la concession et indiquez le mode du verbe utilisé.',
				a2: '« bien que les outils numériques soient aujourd’hui très répandus » — mode utilisé : le subjonctif présent (soient).',
				q3: 'Relevez dans la lettre un terme appréciatif (mélioratif) et un terme dépréciatif (péjoratif).',
				a3: 'Appréciatif : « irremplaçable » (ou « bienveillance », « utiles »). Dépréciatif : « regrettable » (ou « manque »).',
				ref1Word: 'vous (§1)',
				ref1Ans: 'Monsieur le Proviseur',
				ref2Word: 'notre (§3)',
				ref2Ans: 'des élèves de 1AS TCL (les expéditeurs)',
				viseeCorrect: 'Convaincre le proviseur de soutenir la modernisation de la bibliothèque et la création d’un club de lecture',
				viseeDistractors: [
					{
						text: 'Expliquer l’histoire de l’invention de l’imprimerie en Asie',
						diagnosticFeedback: 'La lettre porte sur la bibliothèque actuelle du lycée, non sur l’histoire de l’imprimerie.'
					},
					{
						text: 'Interdire l’utilisation des dictionnaires au lycée',
						diagnosticFeedback: 'Les élèves demandent au contraire des dictionnaires récents.'
					},
					{
						text: 'Raconter une anecdote humoristique vécue en classe',
						diagnosticFeedback: 'Il s’agit d’une lettre ouverte argumentée et sérieuse.'
					}
				],
				themeSummary: 'la modernisation de la bibliothèque scolaire et la promotion de la lecture'
			},
			{
				title: 'Lettre ouverte aux citoyens pour la sauvegarde de nos monuments historiques',
				source: 'Association Culturelle des Jeunes de Tlemcen, le 02 février 2026',
				paragraphs: [
					'Chers concitoyens, nous prenons aujourd’hui la parole pour lancer un appel solennel en faveur de la préservation des remparts, des fontaines et des mosquées anciennes qui font la fierté de notre ville.',
					'D’une part, il est déplorable de voir certains murs séculaires abîmés par des inscriptions sauvages ou entourés de déchets. Cette négligence inacceptable menace une mémoire commune bâtie au fil des siècles. D’autre part, bien que les budgets publics soient parfois limités, [[notre]] mobilisation citoyenne peut accomplir des progrès remarquables : sensibiliser les jeunes, signaler les dégradations et veiller à la propreté des abords.',
					'Ainsi, protéger cet héritage précieux est un devoir moral qui unit toutes les générations. Espérant que [[vous]] rejoindrez nombreux notre prochaine journée culturelle de nettoyage, nous vous adressons nos salutations les plus respectueuses.'
				],
				glossary: [
					{ term: 'solennel', meaning: 'grave, officiel et empreint d’importance' },
					{ term: 'inscriptions sauvages', meaning: 'graffitis ou écritures dégradant les murs anciens' }
				],
				tfItems: [
					{
						q: 'La lettre dénonce les inscriptions sauvages et les déchets autour des monuments anciens.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Les auteurs pensent que les citoyens ne peuvent rien faire si les budgets publics sont limités.',
						a: 'Faux',
						c: 'Ils affirment que, bien que les budgets soient limités, la mobilisation citoyenne peut accomplir des progrès remarquables.',
						mark: '0.5'
					},
					{
						q: 'L’association invite les habitants à participer à une journée culturelle de nettoyage.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Quelles deux formes de dégradation menacent les monuments selon le paragraphe 2 ?',
				a1: 'Les inscriptions sauvages sur les murs anciens et les déchets abandonnés autour des sites.',
				q2: 'Citez deux actions citoyennes proposées par l’association au paragraphe 2.',
				a2: 'Sensibiliser les jeunes, signaler les dégradations et veiller à la propreté des abords (deux au choix).',
				q3: 'Relevez dans le texte deux adjectifs dépréciatifs et deux adjectifs appréciatifs.',
				a3: 'Dépréciatifs : déplorable, inacceptable (ou sauvages). Appréciatifs : remarquables, précieux (ou respectueuses).',
				ref1Word: 'notre (§2)',
				ref1Ans: 'des membres de l’Association Culturelle et des citoyens de Tlemcen',
				ref2Word: 'vous (§3)',
				ref2Ans: 'les concitoyens (les destinataires de la lettre)',
				viseeCorrect: 'Sensibiliser et mobiliser les habitants pour protéger le patrimoine historique local',
				viseeDistractors: [
					{
						text: 'Décrire les étapes chimiques de fabrication du mortier ancien',
						diagnosticFeedback: 'Ce texte est un plaidoyer citoyen, non une fiche technique.'
					},
					{
						text: 'Raconter la fondation médiévale de Tlemcen au passé simple',
						diagnosticFeedback: 'Le texte argumente au présent sur un enjeu actuel.'
					},
					{
						text: 'Critiquer la construction de nouvelles écoles dans la ville',
						diagnosticFeedback: 'Il n’est jamais question de nouvelles écoles.'
					}
				],
				themeSummary: 'la mobilisation citoyenne pour sauvegarder les monuments historiques'
			},
			{
				title: 'Lettre ouverte contre le fléau du gaspillage du pain',
				source: 'Les élèves de 1AS Lettres, Blida, le 10 février 2026',
				paragraphs: [
					'Chers lecteurs et habitants de notre commune, nous souhaitons partager avec [[vous]] une profonde inquiétude face à un comportement de plus en plus fréquent : le gaspillage quotidien du pain.',
					'Tout d’abord, jeter des baguettes entières dans les bennes à ordures constitue un acte regrettable et contraire à nos valeurs de gratitude et de respect des bienfaits. De plus, ce gaspillage massif représente une lourde perte économique pour les familles et pour le pays, tandis que de nombreuses personnes dans le monde manquent de nourriture. Pourtant, il suffirait d’acheter uniquement la quantité nécessaire et de conserver convenablement le pain restant pour réduire drastiquement [[ce fléau]].',
					'C’est pourquoi nous appelons chaque foyer, chaque cantine et chaque boulangerie à agir avec sagesse. Persuadés que la prise de conscience collective fera reculer cette mauvaise habitude, nous vous prions d’agréer nos salutations fraternelles.'
				],
				glossary: [
					{ term: 'gratitude', meaning: 'reconnaissance sincère pour un bienfait reçu' },
					{ term: 'drastiquement', meaning: 'de façon très importante et radicale' }
				],
				tfItems: [
					{
						q: 'Les signataires dénoncent le gaspillage quotidien du pain dans leur commune.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Selon le texte, le gaspillage du pain n’entraîne aucune perte économique.',
						a: 'Faux',
						c: 'Il représente au contraire une lourde perte économique pour les familles et pour le pays.',
						mark: '0.5'
					},
					{
						q: 'Acheter la quantité juste et bien conserver le pain sont des solutions simples proposées.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Quels deux arguments (moral et économique) les élèves avancent-ils au paragraphe 2 ?',
				a1: 'Argument moral : c’est un acte contraire aux valeurs de gratitude et de respect des bienfaits (alors que d’autres manquent de nourriture). Argument économique : c’est une lourde perte financière pour les familles et le pays.',
				q2: 'Relevez dans le paragraphe 2 deux connecteurs exprimant l’opposition ou la concession.',
				a2: '« tandis que » (opposition) et « Pourtant » (concession / opposition).',
				q3: 'Pourquoi les auteurs emploient-ils des mots comme « regrettable », « fléau » et « sagesse » ?',
				a3: 'Ils utilisent un lexique dépréciatif (regrettable, fléau) pour dénoncer le gaspillage et un lexique appréciatif (sagesse, gratitude) pour convaincre d’agir positivement.',
				ref1Word: 'vous (§1)',
				ref1Ans: 'les lecteurs et habitants de la commune',
				ref2Word: 'ce fléau (§2)',
				ref2Ans: 'le gaspillage quotidien du pain',
				viseeCorrect: 'Dénoncer le gaspillage alimentaire et convaincre les citoyens d’adopter une consommation responsable',
				viseeDistractors: [
					{
						text: 'Donner une recette traditionnelle de fabrication du pain maison',
						diagnosticFeedback: 'Le texte ne contient aucune recette culinaire.'
					},
					{
						text: 'Encourager les boulangeries à fermer leurs portes',
						diagnosticFeedback: 'Les auteurs appellent les boulangeries et les foyers à coopérer avec sagesse.'
					},
					{
						text: 'Raconter un voyage agricole dans les plaines céréalières',
						diagnosticFeedback: 'Il s’agit d’une lettre ouverte engagée et non d’un récit de voyage.'
					}
				],
				themeSummary: 'la lutte citoyenne contre le gaspillage du pain'
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.viseeCorrect, variant.viseeDistractors, rng);
		const content: ContentBlock[] = [
			buildFrenchPassageBlock({
				title: variant.title,
				paragraphs: variant.paragraphs,
				source: variant.source,
				glossary: variant.glossary
			}),
			{
				type: 'text',
				content:
					difficulty === 'hard'
						? '1) Répondez par Vrai ou Faux en justifiant les énoncés faux :'
						: '1) Dites si ces affirmations sont Vraies ou Fausses :'
			},
			{ type: 'true_false', items: variant.tfItems },
			{
				type: 'text',
				content: `2) Répondez aux questions suivantes :\na) ${variant.q1}\nb) ${variant.q2}\nc) ${variant.q3}`,
				answer: `a) ${variant.a1}\nb) ${variant.a2}\nc) ${variant.a3}`,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `3) À qui ou à quoi renvoient les mots soulignés dans le texte ?\na) ${variant.ref1Word}   b) ${variant.ref2Word}`,
				answer: `a) ${variant.ref1Word} : ${variant.ref1Ans}\nb) ${variant.ref2Word} : ${variant.ref2Ans}`,
				mark: '1.5'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: '4) Cochez la visée communicative exacte de cette lettre ouverte :',
						options: mcq.options.map((o) => o.text),
						correct: variant.viseeCorrect,
						mark: '1.5'
					}
				]
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Dans la lettre ouverte « ${variant.title} », quel est l’objectif principal des signataires ?`,
				questionTextAr: 'حدّد الهدف الحجاجي الرئيسي للرسالة المفتوحة الملتزمة:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Cette lettre ouverte engagée vise à convaincre et mobiliser pour ${variant.themeSummary}.`
			},
			sujetExercise: {
				customTitle: 'I. Compréhension de l’écrit',
				points: 7,
				instruction: 'Lisez attentivement la lettre ouverte ci-dessous puis répondez aux questions :',
				content
			},
			hints: [
				'ميّز في الرسالة المفتوحة بين الأطروحة (الموقف المدافع عنه)، الحجج (الأسباب المنطقية)، والاقتراح العملي.',
				'لاحظ كيف يستعمل الكاتب المعجم السلبي (dépréciatif) لتشخيص المشكلة والمعجم الإيجابي (appréciatif) لتثمين الحل.',
				'تذكّر أن « bien que » يتبعه دائما الفعل في صيغة المنصوب (subjonctif).'
			],
			solutionStepsAr: [
				`Vrai/Faux : ${variant.tfItems.map((t) => t.a).join(' / ')}`,
				`Q2-a : ${variant.a1}`,
				`Q2-b : ${variant.a2}`,
				`Q2-c : ${variant.a3}`,
				`Référents : ${variant.ref1Ans} ; ${variant.ref2Ans}`
			],
			finalAnswer: variant.viseeCorrect
		};
	}
};

// 2. Compréhension 2 — L'entretien / interview culturel et éducatif (7 pts)
const tpl1asTclT2EntretienCulturelComp: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcl_t2_entretien_culturel_comp',
	grade: '1as_tcl',
	trimesterId: 't2',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب — المقابلة الثقافية والتربوية (المطالعة، ترميم المخطوطات، وجمال اللغة)',
	curriculumLessonId: 'fre_lesson_1as_tcl_t2_argumentation_connecteurs',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'Entretien avec un bibliothécaire : « Redonner aux jeunes le plaisir de lire »',
				source: 'Revue Culturelle des Lycées de Constantine (texte adapté)',
				paragraphs: [
					'À l’occasion de la semaine nationale du livre, le journal du lycée s’est entretenu avec M. Cherif, conservateur de la bibliothèque municipale de Constantine, sur la place de la lecture chez les adolescents.',
					'Le journal : Monsieur le conservateur, les jeunes lisent-ils moins aujourd’hui qu’autrefois ? — M. Cherif : Les habitudes ont changé, mais le goût de savoir reste vivant. Certes, les téléphones captent beaucoup de temps ; cependant, dès qu’on propose aux lycéens des ouvrages d’histoire, de sciences ou des récits réalistes bien choisis, [[ils]] retrouvent vite le plaisir de lire.',
					'Le journal : Quels conseils donneriez-vous à un élève de 1AS qui souhaite améliorer son expression écrite ? — M. Cherif : [[Je]] lui conseille de lire quinze minutes chaque soir avec un carnet à portée de main pour noter les expressions élégantes. En effet, bien que l’effort paraisse modeste au début, cette régularité transforme profondément la qualité du style.'
				],
				glossary: [
					{ term: 'conservateur', meaning: 'responsable chargé de gérer et de préserver les collections d’une bibliothèque' },
					{ term: 'à portée de main', meaning: 'tout près de soi, facile à saisir immédiatement' }
				],
				tfItems: [
					{
						q: 'M. Cherif affirme que les adolescents ont totalement perdu le goût de savoir.',
						a: 'Faux',
						c: 'Il déclare que les habitudes ont changé mais que le goût de savoir reste vivant.',
						mark: '0.5'
					},
					{
						q: 'Le bibliothécaire conseille de lire quinze minutes chaque soir avec un carnet.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Selon M. Cherif, une lecture régulière améliore profondément la qualité du style écrit.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Quelle condition permet aux lycéens de retrouver le plaisir de lire selon M. Cherif (§2) ?',
				a1: 'Leur proposer des ouvrages d’histoire, de sciences ou des récits réalistes bien choisis.',
				q2: 'Pourquoi conseille-t-il de garder un carnet à portée de main pendant la lecture (§3) ?',
				a2: 'Pour noter les expressions élégantes afin d’enrichir et de transformer son propre style écrit.',
				q3: 'Relevez dans l’entretien un connecteur d’opposition/concession (§2) et un connecteur d’explication (§3).',
				a3: 'Opposition/concession : « mais » ou « cependant » (ou « bien que » au §3). Explication : « En effet ».',
				ref1Word: 'ils (§2)',
				ref1Ans: 'les lycéens',
				ref2Word: 'Je (§3)',
				ref2Ans: 'M. Cherif (le conservateur de la bibliothèque)',
				viseeCorrect: 'Informer les élèves sur les bienfaits de la lecture et proposer une méthode concrète pour mieux écrire',
				viseeDistractors: [
					{
						text: 'Interdire totalement l’accès des adolescents aux bibliothèques',
						diagnosticFeedback: 'Le bibliothécaire encourage chaleureusement la fréquentation des livres.'
					},
					{
						text: 'Présenter la biographie d’un navigateur ancien',
						diagnosticFeedback: 'L’entretien porte sur la lecture et l’expression écrite au lycée.'
					},
					{
						text: 'Expliquer les règles comptables d’une librairie commerciale',
						diagnosticFeedback: 'Aucune question commerciale n’est abordée.'
					}
				],
				themeSummary: 'la promotion de la lecture régulière et l’amélioration du style écrit'
			},
			{
				title: 'Interview d’une restauratrice de manuscrits : « Sauver la mémoire écrite du Sud »',
				source: 'Cahiers Culturels d’Adrar (texte adapté)',
				paragraphs: [
					'Spécialiste en conservation du papier ancien, Mme Haddad dirige un atelier de restauration de manuscrits dans les oasis d’Adrar. Elle répond aux questions des élèves de 1AS Lettres.',
					'Élèves : Madame, quels dangers menacent le plus les manuscrits anciens des bibliothèques familiales ? — Mme Haddad : Le climat sec protège en partie les pages, mais la poussière, les insectes et les mauvaises manipulations fragilisent [[ces documents précieux]]. Bien que le travail soit minutieux et long, chaque feuillet sauvé préserve un pan de notre histoire.',
					'Élèves : Comment les jeunes générations peuvent-elles contribuer à cette noble mission ? — Mme Haddad : [[Vous]] pouvez sensibiliser vos proches à ne jamais jeter de vieux cahiers ou de livres abîmés et encourager la numérisation des archives. En outre, s’orienter vers les métiers du patrimoine constitue un avenir passionnant et utile au pays.'
				],
				glossary: [
					{ term: 'minutieux', meaning: 'qui exige une très grande précision et beaucoup de patience' },
					{ term: 'numérisation', meaning: 'copie d’un document papier sous forme de fichier informatique pour le préserver' }
				],
				tfItems: [
					{
						q: 'Mme Haddad travaille dans un atelier de restauration de manuscrits anciens à Adrar.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'La poussière et les mauvaises manipulations ne présentent aucun danger pour les manuscrits.',
						a: 'Faux',
						c: 'La poussière, les insectes et les mauvaises manipulations fragilisent ces documents précieux.',
						mark: '0.5'
					},
					{
						q: 'La numérisation est citée comme un moyen utile pour préserver les archives anciennes.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Quels trois facteurs fragilisent les manuscrits anciens selon Mme Haddad (§2) ?',
				a1: 'La poussière, les insectes et les mauvaises manipulations.',
				q2: 'Citez deux manières dont les jeunes peuvent contribuer à la sauvegarde du patrimoine écrit (§3).',
				a2: 'Sensibiliser leurs proches à ne pas jeter les vieux livres, encourager la numérisation et s’orienter vers les métiers du patrimoine (deux au choix).',
				q3: 'Relevez dans l’interview une phrase contenant « bien que + subjonctif » et un adjectif appréciatif.',
				a3: 'Concession : « Bien que le travail soit minutieux et long ». Adjectif appréciatif : « précieux », « noble », « passionnant » ou « utile ».',
				ref1Word: 'ces documents précieux (§2)',
				ref1Ans: 'les manuscrits anciens des bibliothèques familiales',
				ref2Word: 'Vous (§3)',
				ref2Ans: 'les élèves de 1AS Lettres et les jeunes générations',
				viseeCorrect: 'Sensibiliser les jeunes à la sauvegarde des manuscrits anciens et aux métiers du patrimoine',
				viseeDistractors: [
					{
						text: 'Convaincre les familles de vendre leurs archives à l’étranger',
						diagnosticFeedback: 'La spécialiste appelle au contraire à conserver et numériser ces trésors.'
					},
					{
						text: 'Expliquer la géologie des dunes du Sahara',
						diagnosticFeedback: 'Le sujet est la restauration des manuscrits anciens.'
					},
					{
						text: 'Raconter une tempête de sable au passé simple',
						diagnosticFeedback: 'Ce texte est un entretien culturel au présent.'
					}
				],
				themeSummary: 'la restauration et la sauvegarde des manuscrits anciens d’Adrar'
			},
			{
				title: 'Entretien avec un historien : « L’exemple éducatif de l’Association des Oulémas »',
				source: 'Revue Éducative d’Alger (texte adapté)',
				paragraphs: [
					'Pour préparer un exposé sur l’histoire culturelle de l’Algérie, notre classe a interrogé le professeur Saidi, historien, sur l’action éducative menée au XXe siècle par Cheikh Abdelhamid Ben Badis et Cheikh Mohamed Bachir El-Ibrahimi.',
					'Élèves : Professeur, pourquoi l’école libre occupait-elle une place si essentielle dans leur projet ? — Pr Saidi : À une époque où la majorité des jeunes Algériens était privée d’instruction, [[ces réformateurs]] ont compris que le savoir est le premier rempart de l’identité. Malgré des moyens matériels modestes, ils ont fondé des dizaines d’écoles et de journaux pour instruire filles et garçons.',
					'Élèves : Quelle leçon un lycéen d’aujourd’hui peut-il retenir de leur parcours ? — Pr Saidi : [[Ils]] nous rappellent que la maîtrise des langues, la rigueur intellectuelle et le respect des valeurs morales vont toujours de pair. C’est pourquoi chaque élève doit considérer son école comme une chance précieuse.'
				],
				glossary: [
					{ term: 'rempart', meaning: 'protection solide qui défend une valeur ou une identité' },
					{ term: 'aller de pair', meaning: 'être étroitement associés et progresser ensemble' }
				],
				tfItems: [
					{
						q: 'L’entretien porte sur l’action éducative de Cheikh Abdelhamid Ben Badis et Cheikh Mohamed Bachir El-Ibrahimi.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Les écoles fondées par ces réformateurs disposaient de moyens financiers illimités.',
						a: 'Faux',
						c: 'Ils ont agi malgré des moyens matériels modestes.',
						mark: '0.5'
					},
					{
						q: 'L’historien souligne que la rigueur intellectuelle et les valeurs morales progressent ensemble.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Pourquoi l’instruction occupait-elle une place centrale dans le projet de ces savants algériens (§2) ?',
				a1: 'Parce que la majorité des jeunes Algériens était privée d’instruction et que le savoir constitue le premier rempart de l’identité.',
				q2: 'Quelle leçon actuelle le professeur Saidi tire-t-il de leur parcours pour les lycéens (§3) ?',
				a2: 'Que la maîtrise des langues, la rigueur intellectuelle et les valeurs morales vont de pair et que l’école est une chance précieuse.',
				q3: 'Relevez dans le texte un complément circonstanciel de concession introduit par « Malgré » et un connecteur de conséquence.',
				a3: 'Concession : « Malgré des moyens matériels modestes ». Conséquence : « C’est pourquoi ».',
				ref1Word: 'ces réformateurs (§2)',
				ref1Ans: 'Cheikh Abdelhamid Ben Badis et Cheikh Mohamed Bachir El-Ibrahimi',
				ref2Word: 'Ils (§3)',
				ref2Ans: 'Cheikh Abdelhamid Ben Badis et Cheikh Mohamed Bachir El-Ibrahimi (ces savants réformateurs)',
				viseeCorrect: 'Faire connaître l’engagement éducatif des réformateurs algériens et encourager les jeunes à valoriser l’école',
				viseeDistractors: [
					{
						text: 'Expliquer l’architecture moderne des stades sportifs',
						diagnosticFeedback: 'Le texte porte sur l’histoire éducative et culturelle algérienne.'
					},
					{
						text: 'Décourager les lycéens d’apprendre plusieurs langues',
						diagnosticFeedback: 'L’historien valorise au contraire la maîtrise des langues.'
					},
					{
						text: 'Raconter une fable imaginaire sur des animaux',
						diagnosticFeedback: 'Il s’agit d’une interview historique réelle.'
					}
				],
				themeSummary: 'l’héritage éducatif et moral de Cheikh Ben Badis et Cheikh El-Ibrahimi'
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.viseeCorrect, variant.viseeDistractors, rng);
		const content: ContentBlock[] = [
			buildFrenchPassageBlock({
				title: variant.title,
				paragraphs: variant.paragraphs,
				source: variant.source,
				glossary: variant.glossary
			}),
			{
				type: 'text',
				content:
					difficulty === 'hard'
						? '1) Répondez par Vrai ou Faux en justifiant les énoncés faux :'
						: '1) Dites si les affirmations suivantes sont Vraies ou Fausses :'
			},
			{ type: 'true_false', items: variant.tfItems },
			{
				type: 'text',
				content: `2) Répondez aux questions suivantes à partir de l’entretien :\na) ${variant.q1}\nb) ${variant.q2}\nc) ${variant.q3}`,
				answer: `a) ${variant.a1}\nb) ${variant.a2}\nc) ${variant.a3}`,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `3) À qui ou à quoi renvoient les expressions soulignées ?\na) ${variant.ref1Word}   b) ${variant.ref2Word}`,
				answer: `a) ${variant.ref1Word} : ${variant.ref1Ans}\nb) ${variant.ref2Word} : ${variant.ref2Ans}`,
				mark: '1.5'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: '4) Quel est le but communicatif principal de cet entretien ?',
						options: mcq.options.map((o) => o.text),
						correct: variant.viseeCorrect,
						mark: '1.5'
					}
				]
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Dans l’entretien « ${variant.title} », que cherche principalement à transmettre l’invité ?`,
				questionTextAr: 'حدّد الرسالة الأساسية من هذه المقابلة الثقافية:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Cet entretien met en lumière ${variant.themeSummary}.`
			},
			sujetExercise: {
				customTitle: 'I. Compréhension de l’écrit',
				points: 7,
				instruction: 'Lisez attentivement l’entretien ci-dessous puis répondez aux questions :',
				content
			},
			hints: [
				'اقرأ المقدمة التمهيدية (§1 / le chapeau) لتحديد هوية الضيف ومهنته.',
				'فرّق بين ضمائر المحاور (nous/vous) وضمير الضيف (Je).',
				'استخرج الروابط الحجاجية بعناية: mais, cependant, bien que, malgré, en effet, c’est pourquoi.'
			],
			solutionStepsAr: [
				`Vrai/Faux : ${variant.tfItems.map((t) => t.a).join(' / ')}`,
				`Q2-a : ${variant.a1}`,
				`Q2-b : ${variant.a2}`,
				`Q2-c : ${variant.a3}`,
				`Substituts : ${variant.ref1Ans} ; ${variant.ref2Ans}`
			],
			finalAnswer: variant.viseeCorrect
		};
	}
};

// 3. Fonctionnement de la langue 1 — Opposition & Concession (bien que + subjonctif, malgré, mais, cependant) (6 pts — TCL!)
const tpl1asTclT2OppositionConcessionLang: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcl_t2_opposition_concession_lang',
	grade: '1as_tcl',
	trimesterId: 't2',
	domain: 'grammaire_syntaxe',
	titleAr: 'قواعد اللغة — التعبير عن التعارض والاستدراك (mais, cependant, malgré, bien que + subjonctif)',
	curriculumLessonId: 'fre_lesson_1as_tcl_t2_opposition_concession',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				conjPrompt:
					'Mettez les verbes entre parenthèses au mode et au temps qui conviennent (subjonctif présent ou indicatif présent) :\na) Bien que les écrans (être) rapides, le livre papier reste plus reposant pour les yeux.\nb) Même si cette bibliothèque (avoir) un budget modeste, elle organise des ateliers utiles.\nc) Quoique la restauration (prendre) plusieurs mois, les artisans persévèrent.',
				conjAns: 'a) soient (subjonctif)   b) a (indicatif)   c) prenne (subjonctif)',
				transPrompt:
					'Transformez les phrases selon la consigne entre parenthèses :\na) Les ressources sont limitées, cependant les jeunes bénévoles réussissent leur campagne. (Employez « Bien que »)\nb) Bien que le climat soit aride, les oasis d’Adrar conservent des bibliothèques riches. (Employez « Malgré » + nom)',
				transAns:
					'a) Bien que les ressources soient limitées, les jeunes bénévoles réussissent leur campagne.\nb) Malgré l’aridité du climat (ou Malgré le climat aride), les oasis d’Adrar conservent des bibliothèques riches.',
				connPrompt:
					'Complétez avec le connecteur logique convenable (tandis que, pourtant, en effet) :\na) Certains élèves lisent chaque soir .......... d’autres passent des heures sur leur téléphone.\nb) Ce livre est ancien ; .........., ses conseils restent très actuels.',
				connAns: 'a) tandis que   b) pourtant',
				mcqQuestion: 'Choisissez la conjugaison exacte après « Bien que » : « Bien que ces manuscrits .......... très fragiles, les spécialistes réussissent à les numériser. » (être)',
				mcqCorrect: 'soient',
				mcqDistractors: [
					{
						text: 'sont',
						diagnosticFeedback: '« Bien que » est toujours suivi du subjonctif présent.'
					},
					{
						text: 'soit',
						diagnosticFeedback: 'Le sujet « ces manuscrits » est au pluriel : qu’ils soient.'
					},
					{
						text: 'seront',
						diagnosticFeedback: 'Jamais de futur de l’indicatif après « Bien que ».'
					}
				]
			},
			{
				conjPrompt:
					'Conjuguez les verbes entre parenthèses au mode exigé par le connecteur (subjonctif ou indicatif) :\na) Bien que ce projet culturel (pouvoir) sembler ambitieux, toute la classe y participe.\nb) Tandis que certains citoyens (gaspiller) le pain, d’autres luttent contre ce fléau.\nc) Bien qu’il (faire) très chaud en été, les ruelles de la Casbah restent fraîches.',
				conjAns: 'a) puisse (subjonctif)   b) gaspillent (indicatif)   c) fasse (subjonctif)',
				transPrompt:
					'Réécrivez les phrases en respectant la consigne :\na) Malgré la fatigue, les restaurateurs ont achevé le catalogage des manuscrits. (Remplacez « Malgré » par « Bien que »)\nb) Les journaux papier sont moins rapides mais ils offrent des analyses plus approfondies. (Remplacez « mais » par « cependant »)',
				transAns:
					'a) Bien qu’ils soient fatigués (ou Bien que la fatigue soit grande), les restaurateurs ont achevé le catalogage des manuscrits.\nb) Les journaux papier sont moins rapides ; cependant, ils offrent des analyses plus approfondies.',
				connPrompt:
					'Indiquez si la phrase exprime une opposition simple ou une concession :\na) « Amine étudie l’histoire algérienne alors que sa sœur préfère la biologie. »\nb) « Malgré le froid hivernal, les habitants se sont mobilisés pour nettoyer le parc. »',
				connAns: 'a) Opposition simple   b) Concession',
				mcqQuestion: 'Quelle phrase emploie « Malgré » de manière grammaticalement correcte ?',
				mcqCorrect: 'Malgré les obstacles matériels, les réformateurs ont ouvert de nombreuses écoles.',
				mcqDistractors: [
					{
						text: 'Malgré que les obstacles soient nombreux, ils ont ouvert des écoles.',
						diagnosticFeedback: 'En français soutenu, on évite « malgré que » et on emploie « bien que » + subjonctif.'
					},
					{
						text: 'Malgré il y avait des obstacles, ils ont ouvert des écoles.',
						diagnosticFeedback: '« Malgré » est une préposition suivie d’un nom, jamais d’un verbe conjugué.'
					},
					{
						text: 'Malgré affronter des obstacles, ils ont ouvert des écoles.',
						diagnosticFeedback: 'On ne place pas d’infinitif après « Malgré ».'
					}
				]
			},
			{
				conjPrompt:
					'Mettez les verbes entre parenthèses au mode correct (subjonctif présent ou indicatif présent) :\na) Bien que les élèves (avoir) un emploi du temps chargé, ils lisent chaque semaine.\nb) Même s’il (falloir) du temps pour restaurer ce mur, le résultat en vaut la peine.\nc) Quoique les jeunes (savoir) utiliser Internet, la bibliothèque reste indispensable.',
				conjAns: 'a) aient (subjonctif)   b) faut (indicatif)   c) sachent (subjonctif)',
				transPrompt:
					'Reliez chaque paire de phrases à l’aide du connecteur indiqué :\na) L’exercice de résumé est exigeant. Il développe l’esprit de synthèse. (Bien que)\nb) La salle de lecture est petite. Elle accueille chaque jour des élèves motivés. (Malgré + nom)',
				transAns:
					'a) Bien que l’exercice de résumé soit exigeant, il développe l’esprit de synthèse.\nb) Malgré la petitesse de la salle de lecture (ou Malgré sa petite taille), elle accueille chaque jour des élèves motivés.',
				connPrompt:
					'Complétez avec « bien que », « même si » ou « malgré » :\na) .......... sa grande ancienneté, la Grande Mosquée de Tlemcen est remarquablement conservée.\nb) .......... les jeunes aiment les écrans, beaucoup apprécient toujours les vrais livres.',
				connAns: 'a) Malgré   b) Même si',
				mcqQuestion: 'Complétez correctement : « Bien que ce texte .......... long, ses arguments sont faciles à retenir. » (être)',
				mcqCorrect: 'soit',
				mcqDistractors: [
					{
						text: 'est',
						diagnosticFeedback: '« Bien que » régit obligatoirement le subjonctif : soit.'
					},
					{
						text: 'soient',
						diagnosticFeedback: '« ce texte » est au singulier : qu’il soit.'
					},
					{
						text: 'était',
						diagnosticFeedback: 'L’imparfait de l’indicatif ne s’emploie pas après « Bien que ».'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) ${variant.conjPrompt} (2.0 pts)`,
				answer: variant.conjAns,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) ${variant.transPrompt} (2.5 pts)`,
				answer: variant.transAns,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `3) ${variant.connPrompt} (1.5 pts)`,
				answer: variant.connAns,
				mark: '1.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الصياغة الصحيحة في التعبير عن الاستدراك والتعارض:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'Règle clé : « bien que / quoique + subjonctif », « même si / tandis que + indicatif », et « malgré + nom ».'
			},
			sujetExercise: {
				customTitle: 'II. Fonctionnement de la langue',
				points: 6,
				instruction: 'Traitez avec précision les exercices suivants sur l’opposition et la concession :',
				content
			},
			hints: [
				'احفظ القاعدة الثلاثية: bien que / quoique + subjonctif | même si / tandis que + indicatif | malgré + nom.',
				'راجع تصريف الأفعال الشاذة في المنصوب: être (soit/soient)، avoir (ait/aient)، faire (fasse)، pouvoir (puisse)، savoir (sachent).',
				'عند تحويل جملة فعلية إلى « Malgré + nom » اشتق اسما مناسبا من الصفة أو الفعل (fatigué -> la fatigue، aride -> l’aridité).'
			],
			solutionStepsAr: [
				`Modes verbaux : ${variant.conjAns}`,
				`Transformations : ${variant.transAns}`,
				`Connecteurs : ${variant.connAns}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 4. Fonctionnement de la langue 2 — Lexique appréciatif/dépréciatif, Modalisateurs & Famille de mots (6 pts — TCL!)
const tpl1asTclT2LexiqueModalArgLang: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcl_t2_lexique_modal_arg_lang',
	grade: '1as_tcl',
	trimesterId: 't2',
	domain: 'vocabulaire_lexique',
	titleAr: 'قواعد اللغة — المعجم الاستحساني والاستهجاني، الموداليزاتورات، وبنية الحجاج وعائلة الكلمة',
	curriculumLessonId: 'fre_lesson_1as_tcl_t2_modalisateurs_lexique',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				classifyBank: ['précieux', 'déplorable', 'remarquable', 'négligence', 'fléau', 'bénéfique'],
				classifyCols: [
					{ header: 'Lexique appréciatif (mélioratif)', items: ['précieux', 'remarquable', 'bénéfique'], mark: '1.0' },
					{ header: 'Lexique dépréciatif (péjoratif)', items: ['déplorable', 'négligence', 'fléau'], mark: '1.0' }
				],
				wfRows: [
					{
						verbe: { given: true, value: 'valoriser' },
						nom: { value: 'valorisation', mark: '0.5' },
						adjectif: { value: 'valorisant(e) / valorisé(e)', mark: '0.5' }
					},
					{
						verbe: { value: 'gaspiller', mark: '0.5' },
						nom: { given: true, value: 'gaspillage' },
						adjectif: { value: 'gaspillé(e) / gaspilleur', mark: '0.5' }
					}
				],
				argPrompt:
					'Identifiez la fonction argumentative de chaque segment numéroté (thèse, argument ou exemple) :\n(1) « La sauvegarde des bibliothèques familiales est une priorité nationale. »\n(2) « En effet, elles conservent des textes uniques sur notre histoire. »\n(3) « Par exemple, les manuscrits anciens d’Adrar témoignent d’une vie intellectuelle intense. »',
				argAns: '(1) Thèse   (2) Argument   (3) Exemple',
				mcqQuestion: 'Quel groupe ne contient que des termes du lexique dépréciatif (péjoratif) ?',
				mcqCorrect: 'inacceptable — dégradation — nuisible',
				mcqDistractors: [
					{
						text: 'noble — exemplaire — richesse',
						diagnosticFeedback: 'Ces trois termes relèvent du lexique appréciatif (mélioratif).'
					},
					{
						text: 'carré — mensuel — géographique',
						diagnosticFeedback: 'Ces adjectifs sont neutres et objectifs.'
					},
					{
						text: 'précieux — regrettable — utile',
						diagnosticFeedback: 'Ce groupe mélange deux termes appréciatifs et un seul terme dépréciatif.'
					}
				]
			},
			{
				classifyBank: ['noble', 'inacceptable', 'exemplaire', 'gaspillage', 'richesse', 'nuisible'],
				classifyCols: [
					{ header: 'Lexique appréciatif (mélioratif)', items: ['noble', 'exemplaire', 'richesse'], mark: '1.0' },
					{ header: 'Lexique dépréciatif (péjoratif)', items: ['inacceptable', 'gaspillage', 'nuisible'], mark: '1.0' }
				],
				wfRows: [
					{
						verbe: { given: true, value: 'argumenter' },
						nom: { value: 'argumentation / argument', mark: '0.5' },
						adjectif: { value: 'argumentatif / argumenté(e)', mark: '0.5' }
					},
					{
						verbe: { value: 'convaincre', mark: '0.5' },
						nom: { given: true, value: 'conviction' },
						adjectif: { value: 'convaincant(e) / convaincu(e)', mark: '0.5' }
					}
				],
				argPrompt:
					'Relevez le modalisateur dans chaque phrase et précisez la nuance (certitude, probabilité ou obligation) :\na) « Il est indéniable que la lecture développe l’esprit critique. »\nb) « Cette campagne réduira sans doute le gaspillage alimentaire. »\nc) « Il est urgent de restaurer les fontaines anciennes de la ville. »',
				argAns: 'a) Il est indéniable que (certitude)   b) sans doute (probabilité)   c) Il est urgent de (obligation / nécessité)',
				mcqQuestion: 'Quelle phrase comporte un modalisateur exprimant la certitude absolue ?',
				mcqCorrect: 'Il est évident que l’éducation demeure la clé du progrès culturel.',
				mcqDistractors: [
					{
						text: 'Ce projet attirera peut-être quelques visiteurs le mois prochain.',
						diagnosticFeedback: '« peut-être » exprime le doute ou la simple possibilité.'
					},
					{
						text: 'Il semble que la bibliothèque ferme plus tôt le jeudi.',
						diagnosticFeedback: '« Il semble que » marque l’incertitude ou l’apparence.'
					},
					{
						text: 'La bibliothèque municipale se trouve avenue de l’Indépendance.',
						diagnosticFeedback: 'Phrase neutre dépourvue de modalisateur.'
					}
				]
			},
			{
				classifyBank: ['irremplaçable', 'regrettable', 'sagesse', 'dégradation', 'progrès', 'médiocre'],
				classifyCols: [
					{ header: 'Lexique appréciatif (mélioratif)', items: ['irremplaçable', 'sagesse', 'progrès'], mark: '1.0' },
					{ header: 'Lexique dépréciatif (péjoratif)', items: ['regrettable', 'dégradation', 'médiocre'], mark: '1.0' }
				],
				wfRows: [
					{
						verbe: { given: true, value: 'sauvegarder' },
						nom: { value: 'sauvegarde', mark: '0.5' },
						adjectif: { value: 'sauvegardé(e)', mark: '0.5' }
					},
					{
						verbe: { value: 'engager', mark: '0.5' },
						nom: { given: true, value: 'engagement' },
						adjectif: { value: 'engagé(e)', mark: '0.5' }
					}
				],
				argPrompt:
					'Complétez ce court paragraphe argumentatif avec les connecteurs convenables (D’abord, En outre, Par conséquent) :\n« .......... , la lecture enrichit le vocabulaire des lycéens. .......... , elle ouvre l’esprit sur l’histoire et les sciences. .......... , chaque établissement doit disposer d’une bibliothèque vivante. »',
				argAns: 'D’abord / En outre / Par conséquent',
				mcqQuestion: 'Quel connecteur logique introduit une addition (un argument supplémentaire allant dans le même sens) ?',
				mcqCorrect: 'En outre',
				mcqDistractors: [
					{
						text: 'Cependant',
						diagnosticFeedback: '« Cependant » marque une opposition ou une concession.'
					},
					{
						text: 'Par conséquent',
						diagnosticFeedback: '« Par conséquent » introduit une conséquence ou conclusion.'
					},
					{
						text: 'Pourtant',
						diagnosticFeedback: '« Pourtant » exprime une concession contraire à l’attente.'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const shuffledBank = rng.shuffle(variant.classifyBank);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) Classez les termes évaluatifs suivants dans le tableau (2.0 pts) :\n${shuffledBank.join('  -  ')}`
			},
			buildFrenchClassificationTableBlock({ columns: variant.classifyCols }),
			{ type: 'text', content: '2) Complétez le tableau de la famille de mots suivant (2.0 pts) :' },
			buildFrenchWordFamilyTableBlock(variant.wfRows),
			{
				type: 'text',
				content: `3) ${variant.argPrompt} (2.0 pts)`,
				answer: variant.argAns,
				mark: '2.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الإجابة الدقيقة حول المعجم التقييمي والموداليزاتورات:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'Dans une lettre ouverte argumentée, le lexique appréciatif valorise les solutions et le lexique dépréciatif dénonce le problème, soutenus par des modalisateurs précis.'
			},
			sujetExercise: {
				customTitle: 'II. Fonctionnement de la langue',
				points: 6,
				instruction: 'Traitez les exercices suivants de lexique évaluatif et d’organisation argumentative :',
				content
			},
			hints: [
				'المعجم الاستحساني (appréciatif/mélioratif) يرفع قيمة الموصوف، والاستهجاني (dépréciatif/péjoratif) يذم المشكلة أو السلوك السيئ.',
				'ميّز بين « En outre / De plus » (إضافة حجة) و« Cependant / Pourtant » (استدراك وتعارض).',
				'في بنية الحجاج: الأطروحة هي الرأي العام، والحجة هي التعليل المنطقي، والمثال حالة واقعية ملموسة.'
			],
			solutionStepsAr: [
				`Lexique évaluatif : ${variant.classifyCols.map((c) => `${c.header} : ${c.items.join(', ')}`).join(' | ')}`,
				`Argumentation / Modalisateurs : ${variant.argAns}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 5. Production écrite — Rédiger une lettre ouverte structurée pour une cause citoyenne ou éducative (7 pts — TCL!)
const tpl1asTclT2LettreOuverteStructWe: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcl_t2_lettre_ouverte_struct_we',
	grade: '1as_tcl',
	trimesterId: 't2',
	domain: 'production_ecrite',
	titleAr: 'الوضعية الإدماجية — تحرير رسالة مفتوحة مهيكلة لقضية مواطَنة أو تعليم (1AS آداب)',
	curriculumLessonId: 'fre_lesson_1as_tcl_t2_rediger_lettre_ouverte',
	defaultPoints: 7,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				sujetUnPrompt:
					'Au nom de votre classe de 1AS Lettres, rédigez une lettre ouverte structurée (14 à 18 lignes) adressée à Monsieur le Proviseur de votre lycée pour défendre la création d’un club de lecture et l’enrichissement de la bibliothèque scolaire.',
				sujetUnNotes: [
					'Respectez intégralement la présentation d’une lettre ouverte (lieu, date, expéditeur, destinataire, objet, formule d’appel, prise de congé et signature).',
					'Exposez clairement votre thèse puis développez trois arguments illustrés d’au moins un exemple précis.',
					'Employez au moins une proposition de concession (« bien que + subjonctif »), des connecteurs logiques variés et un lexique appréciatif/dépréciatif équilibré.',
					'Adoptez un ton soutenu et courtois (vouvoiement et conditionnel de politesse).'
				],
				sujetDeuxPrompt:
					'Faites le compte rendu objectif (10 à 12 lignes) d’un entretien culturel sur l’importance de redonner aux lycéens le goût de la lecture.',
				modelAnswer:
					'Constantine, le 16 février 2026\nLes élèves de la classe 1AS TCL\nÀ Monsieur le Proviseur du lycée\nObjet : Demande de création d’un club de lecture et d’enrichissement de la bibliothèque.\n\nMonsieur le Proviseur,\nNous avons l’honneur de vous adresser cette lettre ouverte afin de solliciter votre soutien pour un projet éducatif qui nous tient vivement à cœur : la relance de la lecture dans notre établissement.\nTout d’abord, bien que les outils numériques soient aujourd’hui omniprésents, le livre imprimé demeure un instrument irremplaçable pour la concentration et la richesse du vocabulaire. Ensuite, il est regrettable de constater que notre salle de lecture dispose de peu d’ouvrages récents d’histoire, de littérature et de sciences ; en effet, un fonds documentaire diversifié stimulerait la curiosité intellectuelle de tous les élèves. Enfin, la lecture régulière prépare directement aux examens officiels en améliorant la compréhension et l’expression écrite.\nPar conséquent, nous souhaiterions créer un club de lecture hebdomadaire et organiser une collecte volontaire de livres utiles sous l’encadrement de nos professeurs. Espérant une réponse favorable, veuillez agréer, Monsieur le Proviseur, l’expression de notre profond respect.\nLes délégués de la classe 1AS TCL',
				rubricSummary:
					'Respect strict du format de la lettre ouverte (1.5 pts), Pertinence et richesse des 3 arguments et de l’exemple (2.0 pts), Emploi juste de la concession (bien que + subjonctif), des connecteurs et du lexique évaluatif (2.0 pts), Correction de la langue et de l’orthographe (1.5 pts).',
				mcqQuestion: 'Quelle phrase de lettre ouverte combine correctement une concession au subjonctif et un registre soutenu ?',
				mcqCorrect: 'Bien que les écrans soient présents partout, le livre demeure essentiel à la formation des élèves.',
				mcqDistractors: [
					{
						text: 'Bien que les écrans sont partout, achetez-nous des livres vite !',
						diagnosticFeedback: 'Double faute : indicatif après « bien que » et ton impératif impoli.'
					},
					{
						text: 'Malgré que les écrans soient partout, je kiffe trop la lecture.',
						diagnosticFeedback: 'Tournure « malgré que » à éviter et vocabulaire argotique interdit.'
					},
					{
						text: 'Bien que les écrans être partout, le livre reste bon.',
						diagnosticFeedback: 'On ne met pas d’infinitif après « bien que ».'
					}
				]
			},
			{
				sujetUnPrompt:
					'Inquiets face à la dégradation d’un monument historique ou d’une vieille fontaine de votre ville, rédigez une lettre ouverte structurée (14 à 18 lignes) adressée à Monsieur le Président de l’APC pour appeler à sa restauration et à sa valorisation culturelle.',
				sujetUnNotes: [
					'Soignez l’en-tête complet (ville, date, expéditeurs, destinataire, objet), la formule d’appel, les paragraphes distincts, la prise de congé et la signature.',
					'Dénoncez la négligence avec un lexique dépréciatif mesuré puis valorisez l’héritage local avec un lexique appréciatif.',
					'Intégrez trois arguments organisés (mémoire historique, éducation des jeunes, rayonnement de la ville) et une concession avec « bien que + subjonctif ».',
					'Proposez la participation bénévole des lycéens à une campagne de sensibilisation.'
				],
				sujetDeuxPrompt:
					'Rédigez un entretien culturel (chapeau + 4 questions-réponses) réalisé avec un historien ou un artisan sur la sauvegarde du patrimoine algérien.',
				modelAnswer:
					'Tlemcen, le 21 février 2026\nLes élèves de 1AS Lettres\nÀ Monsieur le Président de l’APC\nObjet : Appel pour la restauration et la valorisation du patrimoine historique local.\n\nMonsieur le Président,\nNous nous permettons de solliciter votre bienveillante attention au sujet de l’état préoccupant de plusieurs murs et fontaines anciens situés au cœur de notre commune.\nD’abord, il est déplorable de constater que la négligence et les inscriptions sauvages menacent des édifices qui témoignent de notre histoire séculaire. En outre, bien que les budgets communaux soient soumis à de nombreuses priorités, la sauvegarde de ce patrimoine précieux représente un investissement durable pour l’éducation culturelle des jeunes générations. Enfin, un site propre et restauré renforce l’attractivité de la ville et la fierté légitime de ses habitants.\nAinsi, nous souhaiterions associer les clubs culturels des lycées à une journée citoyenne de propreté et de sensibilisation afin que chaque citoyen devienne le gardien de notre mémoire commune. Dans l’attente d’une suite favorable, veuillez agréer, Monsieur le Président, l’expression de notre respectueuse considération.\nLes élèves de 1AS Lettres',
				rubricSummary:
					'Mise en page officielle complète (1.5 pts), Clarté de la thèse et solidité des trois arguments (2.0 pts), Concession au subjonctif, connecteurs et lexique évaluatif (2.0 pts), Correction syntaxique et orthographique (1.5 pts).',
				mcqQuestion: 'Dans une lettre ouverte à Monsieur le Président de l’APC, quelle clôture respecte les usages officiels ?',
				mcqCorrect: 'Veuillez agréer, Monsieur le Président, l’expression de notre respectueuse considération.',
				mcqDistractors: [
					{
						text: 'Merci d’avance et à la prochaine fois !',
						diagnosticFeedback: 'Formule familière incompatible avec une correspondance officielle.'
					},
					{
						text: 'Veuillez agréer, Monsieur le Proviseur, nos salutations.',
						diagnosticFeedback: 'Le titre repris ne correspond pas au destinataire (Monsieur le Président).'
					},
					{
						text: 'Signé : quelqu’un du quartier, salutations.',
						diagnosticFeedback: 'Formule négligée et incomplète.'
					}
				]
			},
			{
				sujetUnPrompt:
					'Sensibles au problème du gaspillage du pain et de la nourriture, rédigez une lettre ouverte structurée (14 à 18 lignes) adressée aux citoyens de votre ville pour les sensibiliser à ce fléau et les encourager à adopter des gestes responsables.',
				sujetUnNotes: [
					'Respectez toutes les règles formelles de la lettre ouverte (lieu/date, objet, formule d’appel, paragraphes, prise de congé, signature).',
					'Articulez trois arguments (valeurs morales et gratitude, perte économique, propreté et environnement) reliés par D’abord, En outre, Enfin.',
					'Utilisez un rapport de concession (« bien que + subjonctif » ou « malgré + nom ») et des modalisateurs variés.',
					'Formulez en conclusion deux solutions concrètes accessibles à chaque famille.'
				],
				sujetDeuxPrompt:
					'Faites le compte rendu objectif (10 à 12 lignes) d’une lettre ouverte engagée dénonçant le gaspillage alimentaire dans la commune.',
				modelAnswer:
					'Blida, le 25 février 2026\nLe Club Citoyen de 1AS TCL\nAux habitants et lecteurs de notre commune\nObjet : Appel citoyen contre le gaspillage du pain et des aliments.\n\nChers concitoyens,\nNous prenons la plume aujourd’hui pour attirer votre attention sur un comportement regrettable qui se banalise dans nos quartiers : le gaspillage quotidien du pain et des repas.\nTout d’abord, jeter une nourriture encore consommable blesse nos valeurs morales de gratitude et de solidarité envers les familles démunies. De plus, ce gaspillage inacceptable pèse lourdement sur le budget des ménages et accroît le volume des déchets urbains. Enfin, bien que la vie moderne soit souvent rythmée par la précipitation, il reste tout à fait possible d’organiser nos achats avec sagesse et mesure.\nPar conséquent, nous vous invitons à n’acheter que la quantité nécessaire, à conserver convenablement le pain restant et à sensibiliser les plus jeunes dès l’école. Convaincus que la responsabilité collective fera reculer ce fléau, nous vous prions d’agréer, chers concitoyens, l’expression de nos salutations les plus respectueuses.\nLe Club Citoyen de 1AS TCL',
				rubricSummary:
					'Forme complète de la lettre ouverte (1.5 pts), Pertinence des arguments et des solutions (2.0 pts), Concession, connecteurs logiques et lexique évaluatif (2.0 pts), Langue, accords et ponctuation (1.5 pts).',
				mcqQuestion: 'Quel critère distingue particulièrement une excellente lettre ouverte en 1AS TCL (sur 7 points) ?',
				mcqCorrect: 'Un format épistolaire irréprochable, trois arguments articulés avec concession au subjonctif et un lexique évaluatif riche et courtois',
				mcqDistractors: [
					{
						text: 'Un seul paragraphe sans ponctuation rempli d’ordres directs',
						diagnosticFeedback: 'Un bloc compact sans structure ni politesse perd l’essentiel des points.'
					},
					{
						text: 'L’absence complète de pronoms « nous » et « vous »',
						diagnosticFeedback: 'La lettre ouverte implique explicitement l’émetteur et le destinataire.'
					},
					{
						text: 'Un récit imaginaire au passé simple',
						diagnosticFeedback: 'La lettre ouverte est un texte argumentatif, non un conte.'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			buildFrenchWrittenProductionBlock({
				sujetUnTitle: 'Sujet 1 (Lettre ouverte structurée) :',
				sujetUnPrompt: variant.sujetUnPrompt,
				sujetUnNotes: variant.sujetUnNotes,
				sujetDeuxPrompt: variant.sujetDeuxPrompt,
				modelAnswer: variant.modelAnswer,
				rubricSummary: variant.rubricSummary,
				mark: '7'
			})
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر القاعدة السليمة لإتقان الرسالة المفتوحة المهيكلة في شعبة الآداب:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'En 1AS TCL, une lettre ouverte modèle associe mise en page complète, argumentation en 3 points, concession au subjonctif et politesse soutenue.'
			},
			sujetExercise: {
				customTitle: 'III. Production écrite',
				points: 7,
				instruction: 'Traitez l’un des deux sujets au choix en veillant à la richesse de l’argumentation et du style :',
				content
			},
			hints: [
				'استثمر معارفك الأدبية بإدراج جملة استدراك بـ « Bien que + subjonctif » ومفردات استحسانية واستهجانية متوازنة.',
				'احترم الشكل الكامل للرسالة المفتوحة وتطابق لقب المسؤول في صيغة النداء وصيغة الوداع.',
				'نظّم النص في ثلاث فقرات واضحة: عرض الإشكالية والأطروحة، الحجج المرتبة مع مثال، ثم الاقتراح والخاتمة الرسمية.'
			],
			solutionStepsAr: [variant.rubricSummary, variant.modelAnswer],
			finalAnswer: variant.mcqCorrect
		};
	}
};

export const TEMPLATES_1AS_TCL_T2: FrenchParameterizedTemplate[] = [
	tpl1asTclT2LettreEngageeComp,
	tpl1asTclT2EntretienCulturelComp,
	tpl1asTclT2OppositionConcessionLang,
	tpl1asTclT2LexiqueModalArgLang,
	tpl1asTclT2LettreOuverteStructWe
];
