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
// 5 Parameterized Templates — 1AS TCST Trimester 2 (Points split: 7 + 7 + 6 = 20)
// 2 comprehension (7 pts) + 2 text_exploration (7 pts) + 1 written_expression (6 pts)
// Projet 2 : L'interview scientifique et la lettre ouverte argumentée
// ============================================================================

// 1. Compréhension 1 — L'interview scientifique (7 pts)
const tpl1asTcstT2InterviewScientifiqueComp: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcst_t2_interview_scientifique_comp',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب — المقابلة العلمية (السد الأخضر، التغذية المدرسية، وإعادة التدوير)',
	curriculumLessonId: 'fre_lesson_1as_tcst_t2_interrogation_discours_rapporte',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'Entretien avec un agronome : « Relancer le Barrage Vert pour protéger nos terres »',
				source: 'Journal Scolaire Scientifique de Djelfa (texte adapté)',
				paragraphs: [
					'À l’occasion de la journée nationale de l’arbre, notre club scientifique a rencontré le docteur Mansouri, agronome spécialiste des zones steppiques, pour évoquer la réhabilitation du Barrage Vert.',
					'Le club : Docteur, pourquoi est-il urgent aujourd’hui de renforcer le Barrage Vert ? — Dr Mansouri : Le réchauffement climatique accentue la sécheresse ; par conséquent, les terres agricoles risquent l’ensablement. [[Nous]] devons planter des espèces résistantes afin que le sol conserve son humidité.',
					'Le club : Quels arbres recommandez-vous de planter dans ces régions ? — Dr Mansouri : Il serait très utile de diversifier les plantations en associant le pin d’Alep, l’olivier, le pistachier de l’Atlas et le caroubier. Ainsi, [[ces arbres]] protègent l’environnement tout en offrant un revenu durable aux habitants.'
				],
				glossary: [
					{ term: 'zones steppiques', meaning: 'régions semi-arides situées entre le Tell et le Sahara' },
					{ term: 'ensablement', meaning: 'envahissement progressif d’une terre fertile par le sable' }
				],
				tfItems: [
					{
						q: 'Le docteur Mansouri est un agronome spécialiste des zones steppiques.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'L’agronome conseille de planter uniquement un seul type d’arbre dans tout le Barrage Vert.',
						a: 'Faux',
						c: 'Il recommande de diversifier les plantations (pin d’Alep, olivier, pistachier de l’Atlas, caroubier).',
						mark: '0.5'
					},
					{
						q: 'La plantation d’arbres fruitiers apporte aussi un bénéfice économique aux populations locales.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Quelle conséquence négative la sécheresse entraîne-t-elle sur les terres agricoles (§2) ?',
				a1: 'Elle expose les terres agricoles au risque d’ensablement.',
				q2: 'Pourquoi faut-il diversifier les espèces plantées selon le docteur Mansouri (§3) ?',
				a2: 'Pour protéger l’environnement tout en offrant un revenu durable aux habitants des régions steppiques.',
				q3: 'Relevez dans l’entretien un connecteur de conséquence et un connecteur de but.',
				a3: 'Conséquence : « par conséquent » (ou « Ainsi »). But : « afin que » (ou « pour »).',
				ref1Word: 'Nous (§2)',
				ref1Ans: 'les spécialistes, les citoyens et les jeunes Algériens',
				ref2Word: 'ces arbres (§3)',
				ref2Ans: 'le pin d’Alep, l’olivier, le pistachier de l’Atlas et le caroubier',
				viseeCorrect: 'Informer et sensibiliser les lecteurs à l’importance écologique et économique du Barrage Vert',
				viseeDistractors: [
					{
						text: 'Critiquer le travail des agriculteurs des hauts plateaux',
						diagnosticFeedback: 'L’agronome soutient au contraire le revenu durable des habitants.'
					},
					{
						text: 'Raconter une promenade fictive dans une forêt tropicale',
						diagnosticFeedback: 'Il s’agit d’une interview scientifique sur les zones steppiques algériennes.'
					},
					{
						text: 'Interdire la culture de l’olivier en Algérie',
						diagnosticFeedback: 'Le spécialiste recommande précisément de planter des oliviers.'
					}
				],
				themeSummary: 'la réhabilitation écologique et économique du Barrage Vert'
			},
			{
				title: 'Interview d’une nutritionniste : « Bien manger pour mieux réussir au lycée »',
				source: 'Bulletin de Santé Scolaire d’Oran (texte adapté)',
				paragraphs: [
					'Face à la fatigue observée chez de nombreux adolescents en période d’examens, nous avons interrogé la docteure Khelifi, médecin nutritionniste, sur les bonnes habitudes alimentaires au lycée.',
					'Journaliste : Docteure, pourquoi le petit-déjeuner est-il si important pour un élève de 1AS ? — Dr Khelifi : Après une nuit de jeûne, le cerveau a besoin d’énergie. Or, certains élèves sautent ce repas ; c’est pourquoi [[ils]] manquent souvent de concentration dès la deuxième heure de cours.',
					'Journaliste : Que conseillez-vous aux jeunes pour éviter la fatigue intellectuelle ? — Dr Khelifi : Je recommande vivement de consommer des fruits frais, des dattes, des céréales complètes et beaucoup d’eau. Il faut réduire les boissons trop sucrées afin que l’organisme maintienne un équilibre sain. [[Ces habitudes simples]] améliorent nettement la mémoire.'
				],
				glossary: [
					{ term: 'céréales complètes', meaning: 'aliments riches en fibres comme le pain complet ou l’avoine' },
					{ term: 'fatigue intellectuelle', meaning: 'baisse de concentration et d’énergie mentale' }
				],
				tfItems: [
					{
						q: 'Sauter le petit-déjeuner favorise une excellente concentration le matin.',
						a: 'Faux',
						c: 'Les élèves qui sautent ce repas manquent souvent de concentration dès la deuxième heure.',
						mark: '0.5'
					},
					{
						q: 'La nutritionniste conseille de consommer des fruits frais, des dattes et de l’eau.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Réduire les boissons trop sucrées aide à garder un organisme équilibré.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Quelle est la cause directe de la baisse de concentration chez certains élèves en matinée (§2) ?',
				a1: 'Ils sautent le petit-déjeuner alors que le cerveau a besoin d’énergie après une nuit de jeûne.',
				q2: 'Citez quatre aliments ou boissons recommandés par la docteure Khelifi (§3).',
				a2: 'Les fruits frais, les dattes, les céréales complètes et l’eau.',
				q3: 'Relevez dans le texte un verbe de recommandation (modalisateur) et un rapport logique de conséquence.',
				a3: 'Modalisateur : « Je recommande vivement » (ou « Il faut »). Conséquence : « c’est pourquoi ils manquent souvent de concentration ».',
				ref1Word: 'ils (§2)',
				ref1Ans: 'certains élèves (qui sautent le petit-déjeuner)',
				ref2Word: 'Ces habitudes simples (§3)',
				ref2Ans: 'manger équilibré (fruits, dattes, céréales, eau) et réduire les boissons sucrées',
				viseeCorrect: 'Sensibiliser les lycéens à l’importance d’une alimentation équilibrée pour la réussite scolaire',
				viseeDistractors: [
					{
						text: 'Faire la promotion de boissons industrielles énergisantes',
						diagnosticFeedback: 'La médecin recommande au contraire de réduire les boissons trop sucrées.'
					},
					{
						text: 'Raconter l’histoire culinaire d’un restaurant ancien',
						diagnosticFeedback: 'Le texte est un entretien médical sur la nutrition scolaire.'
					},
					{
						text: 'Expliquer comment préparer un gâteau sucré',
						diagnosticFeedback: 'Aucune recette de pâtisserie n’est présente.'
					}
				],
				themeSummary: 'l’impact d’une alimentation équilibrée sur la concentration scolaire'
			},
			{
				title: 'Entretien avec un ingénieur en recyclage : « Nos déchets ont une seconde vie »',
				source: 'Revue Jeunesse et Écologie d’Alger (texte adapté)',
				paragraphs: [
					'Pour comprendre le fonctionnement du tri sélectif, deux élèves de 1AS ont interviewé M. Bouzid, ingénieur responsable d’un centre de recyclage du papier et du plastique.',
					'Élèves : Monsieur l’ingénieur, pourquoi le tri à la source est-il indispensable ? — M. Bouzid : Lorsque le papier propre est mélangé aux déchets organiques, [[il]] ne peut plus être recyclé. Donc, trier dès la maison ou le lycée facilite grandement notre travail et réduit la pollution.',
					'Élèves : Est-ce que le recyclage permet vraiment d’économiser les ressources naturelles ? — M. Bouzid : Oui, certainement ! Recycler une tonne de carton sauve plusieurs arbres et économise beaucoup d’eau. Il est essentiel d’éduquer les jeunes afin qu’[[ils]] deviennent des citoyens responsables.'
				],
				glossary: [
					{ term: 'tri à la source', meaning: 'séparation des déchets dès l’endroit où ils sont produits' },
					{ term: 'déchets organiques', meaning: 'restes alimentaires et végétaux biodégradables' }
				],
				tfItems: [
					{
						q: 'Mélanger le papier propre avec les déchets alimentaires empêche son recyclage.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Le recyclage du carton permet d’économiser des arbres et de l’eau.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'M. Bouzid pense que les jeunes ne peuvent pas participer au tri des déchets.',
						a: 'Faux',
						c: 'Il estime qu’il est essentiel d’éduquer les jeunes afin qu’ils deviennent des citoyens responsables.',
						mark: '0.5'
					}
				],
				q1: 'Pourquoi le tri doit-il commencer à la maison ou au lycée selon M. Bouzid (§2) ?',
				a1: 'Parce que le papier souillé par les déchets organiques ne peut plus être recyclé et que le tri à la source facilite le recyclage.',
				q2: 'Quels sont les deux avantages écologiques du recyclage d’une tonne de carton (§3) ?',
				a2: 'Il permet de sauver plusieurs arbres et d’économiser une grande quantité d’eau.',
				q3: 'Relevez dans l’interview une interrogation partielle et une interrogation totale.',
				a3: 'Interrogation partielle : « pourquoi le tri à la source est-il indispensable ? ». Interrogation totale : « Est-ce que le recyclage permet vraiment d’économiser les ressources naturelles ? ».',
				ref1Word: 'il (§2)',
				ref1Ans: 'le papier propre',
				ref2Word: 'ils (§3)',
				ref2Ans: 'les jeunes',
				viseeCorrect: 'Expliquer l’utilité du tri sélectif et encourager le recyclage chez les jeunes',
				viseeDistractors: [
					{
						text: 'Convaincre les lecteurs d’utiliser davantage de sacs en plastique jetables',
						diagnosticFeedback: 'L’ingénieur encourage la réduction de la pollution et le recyclage.'
					},
					{
						text: 'Raconter un fait divers sur un incendie d’usine',
						diagnosticFeedback: 'Aucun incident ou fait divers n’est raconté ici.'
					},
					{
						text: 'Décrire la géographie des forêts du nord',
						diagnosticFeedback: 'Le thème central est le tri sélectif et le recyclage.'
					}
				],
				themeSummary: 'l’importance du tri sélectif et du recyclage pour préserver les ressources'
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
						? '1) Répondez par Vrai ou Faux en justifiant les réponses fausses :'
						: '1) Dites si les énoncés suivants sont Vrais ou Faux :'
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
				content: `3) À qui ou à quoi renvoient les éléments soulignés dans le texte ?\na) ${variant.ref1Word}   b) ${variant.ref2Word}`,
				answer: `a) ${variant.ref1Word} : ${variant.ref1Ans}\nb) ${variant.ref2Word} : ${variant.ref2Ans}`,
				mark: '1.5'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: '4) Quelle est la visée communicative principale de cet entretien ?',
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
			grade: '1as_tcst',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Dans l’entretien « ${variant.title} », quel est le but principal de l’échange ?`,
				questionTextAr: 'حدّد الهدف الرئيسي من هذه المقابلة العلمية:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `L’entretien sensibilise les jeunes à ${variant.themeSummary}.`
			},
			sujetExercise: {
				customTitle: 'I. Compréhension de l’écrit',
				points: 7,
				instruction: 'Lisez attentivement l’entretien scientifique puis répondez aux questions :',
				content
			},
			hints: [
				'اقرأ الفقرة التمهيدية (§1 / le chapeau) جيدا لأنها تحدد هوية الضيف وموضوع المقابلة.',
				'تذكّر الفرق بين الاستفهام الكلي (Est-ce que -> Oui/Non) والاستفهام الجزئي (Pourquoi / Que / Quels).',
				'انتبه لروابط السبب والنتيجة والغاية داخل إجابات الخبير.'
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

// 2. Compréhension 2 — La lettre ouverte argumentée (7 pts)
const tpl1asTcstT2LettreOuverteComp: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcst_t2_lettre_ouverte_comp',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب — الرسالة المفتوحة الحجاجية (النظافة المدرسية، البيئة، واقتصاد الماء)',
	curriculumLessonId: 'fre_lesson_1as_tcst_t2_structure_lettre_ouverte',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'Lettre ouverte à Monsieur le Proviseur pour un lycée plus vert',
				source: 'Les délégués des classes de 1AS TCST, Sétif, le 12 janvier 2026',
				paragraphs: [
					'Monsieur le Proviseur, nous avons l’honneur de [[vous]] adresser cette lettre ouverte afin de solliciter votre soutien pour aménager des espaces verts et des bacs de tri dans notre établissement.',
					'Tout d’abord, la présence d’arbres dans la cour est indispensable parce qu’elle offre de l’ombre en été et purifie l’air que nous respirons chaque jour. Ensuite, l’installation de poubelles séparées pour le papier et le plastique sensibiliserait les élèves à la protection de la nature. Enfin, un cadre propre et verdoyant favorise certainement le calme et la concentration pendant les cours.',
					'Par conséquent, nous vous proposons d’organiser une journée volontaire de plantation avec l’aide des professeurs de sciences naturelles. Dans l’attente d’une réponse favorable, veuillez agréer, Monsieur le Proviseur, l’expression de [[notre]] profond respect.'
				],
				glossary: [
					{ term: 'solliciter', meaning: 'demander avec respect et politesse' },
					{ term: 'verdoyant', meaning: 'garni de plantes et d’arbres verts' }
				],
				tfItems: [
					{
						q: 'Cette lettre ouverte est adressée par les élèves de 1AS au proviseur du lycée.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Les élèves demandent la suppression de tous les arbres de la cour.',
						a: 'Faux',
						c: 'Ils demandent au contraire d’aménager des espaces verts et de planter des arbres.',
						mark: '0.5'
					},
					{
						q: 'Les signataires proposent de participer eux-mêmes à une journée volontaire de plantation.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Quel est l’objet principal de cette lettre ouverte (§1) ?',
				a1: 'Demander le soutien du proviseur pour aménager des espaces verts et installer des bacs de tri au lycée.',
				q2: 'Citez deux arguments avancés par les élèves au paragraphe 2.',
				a2: '1) Les arbres offrent de l’ombre et purifient l’air. 2) Les bacs de tri sensibilisent à l’écologie (ou un cadre propre favorise la concentration).',
				q3: 'Relevez dans la lettre la formule d’appel et la formule de prise de congé.',
				a3: 'Formule d’appel : « Monsieur le Proviseur, ». Formule de prise de congé : « Veuillez agréer, Monsieur le Proviseur, l’expression de notre profond respect. ».',
				ref1Word: 'vous (§1)',
				ref1Ans: 'Monsieur le Proviseur',
				ref2Word: 'notre (§3)',
				ref2Ans: 'des délégués des classes de 1AS TCST (les expéditeurs)',
				viseeCorrect: 'Convaincre le proviseur d’approuver un projet écologique scolaire avec l’aide des élèves',
				viseeDistractors: [
					{
						text: 'Expliquer chimiquement la photosynthèse de manière neutre',
						diagnosticFeedback: 'Il s’agit d’une lettre ouverte argumentée impliquant nous/vous, pas d’un cours de chimie.'
					},
					{
						text: 'Raconter une sortie scolaire passée en montagne',
						diagnosticFeedback: 'La lettre présente un projet futur à réaliser au lycée.'
					},
					{
						text: 'Exiger la fermeture de la cantine scolaire',
						diagnosticFeedback: 'Il n’est jamais question de la cantine dans ce texte.'
					}
				],
				themeSummary: 'la création d’espaces verts et de bacs de tri au lycée'
			},
			{
				title: 'Lettre ouverte aux citoyens de notre quartier contre le gaspillage de l’eau',
				source: 'Les membres du Club Scientifique de Tlemcen, le 20 janvier 2026',
				paragraphs: [
					'Chers voisins et concitoyens, nous prenons la plume aujourd’hui pour [[vous]] alerter sur un problème préoccupant qui menace notre avenir commun : le gaspillage quotidien de l’eau potable.',
					'D’abord, il est évident que les ressources hydriques diminuent à cause de la rareté des pluies. De plus, laver les voitures ou les trottoirs à grande eau fait perdre des centaines de litres chaque semaine. En effet, une seule fuite de robinet non réparée peut gaspiller plusieurs mètres cubes par mois ; c’est pourquoi la vigilance de chaque famille est nécessaire.',
					'Nous sommes convaincus que des gestes simples, comme fermer le robinet pendant le brossage des dents et réparer rapidement les fuites, suffisent pour économiser cette richesse vitale. Comptant sur [[votre]] sens civique, nous vous prions d’agréer nos salutations respectueuses.'
				],
				glossary: [
					{ term: 'ressources hydriques', meaning: 'réserves disponibles d’eau douce' },
					{ term: 'sens civique', meaning: 'comportement responsable au service de l’intérêt général' }
				],
				tfItems: [
					{
						q: 'Les auteurs de la lettre s’adressent aux habitants de leur quartier.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Selon le texte, une petite fuite de robinet n’a aucune conséquence sur la consommation d’eau.',
						a: 'Faux',
						c: 'Une seule fuite non réparée peut gaspiller plusieurs mètres cubes d’eau par mois.',
						mark: '0.5'
					},
					{
						q: 'Des gestes simples au quotidien permettent d’économiser beaucoup d’eau.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Quelle est la cause principale de la diminution des ressources en eau mentionnée au paragraphe 2 ?',
				a1: 'La rareté des pluies.',
				q2: 'Citez deux comportements responsables proposés par les auteurs au paragraphe 3.',
				a2: 'Fermer le robinet pendant le brossage des dents et réparer rapidement les fuites.',
				q3: 'Relevez dans la lettre deux modalisateurs exprimant la certitude ou le jugement.',
				a3: '« préoccupant », « il est évident que », « nécessaire », « Nous sommes convaincus que » (deux réponses au choix).',
				ref1Word: 'vous (§1)',
				ref1Ans: 'les voisins et concitoyens du quartier',
				ref2Word: 'votre (§3)',
				ref2Ans: 'des voisins et concitoyens (les destinataires)',
				viseeCorrect: 'Sensibiliser les habitants et les inciter à adopter des gestes quotidiens pour économiser l’eau',
				viseeDistractors: [
					{
						text: 'Présenter l’histoire des barrages romains en Méditerranée',
						diagnosticFeedback: 'Le texte traite d’un problème actuel dans un quartier.'
					},
					{
						text: 'Encourager le lavage fréquent des voitures au jet d’eau',
						diagnosticFeedback: 'La lettre dénonce justement cette pratique gaspilleuse.'
					},
					{
						text: 'Raconter une inondation survenue l’hiver dernier',
						diagnosticFeedback: 'Le texte parle de sécheresse et de gaspillage, non d’inondation.'
					}
				],
				themeSummary: 'la lutte citoyenne contre le gaspillage de l’eau potable'
			},
			{
				title: 'Lettre ouverte au président de l’APC pour sécuriser les abords du lycée',
				source: 'Les élèves et parents de 1AS, Béjaïa, le 05 février 2026',
				paragraphs: [
					'Monsieur le Président de l’APC, nous nous permettons de solliciter [[votre]] bienveillante intervention afin de renforcer la sécurité routière devant l’entrée principale de notre lycée.',
					'En premier lieu, la circulation devient très dense aux heures d’entrée et de sortie des classes, ce qui expose les lycéens à un risque réel. En outre, l’absence de ralentisseurs et l’effacement du passage piéton incitent certains conducteurs à rouler trop vite. Il est donc indispensable d’installer une signalisation visible pour prévenir tout accident.',
					'Ainsi, nous souhaiterions la pose de panneaux lumineux et le traçage d’un passage protégé avant le printemps. Persuadés que [[notre]] requête retiendra votre attention, veuillez agréer, Monsieur le Président, l’expression de notre haute considération.'
				],
				glossary: [
					{ term: 'ralentisseur', meaning: 'dispositif sur la chaussée obligeant les véhicules à réduire leur vitesse' },
					{ term: 'requête', meaning: 'demande officielle adressée à une autorité' }
				],
				tfItems: [
					{
						q: 'Cette lettre ouverte concerne la sécurité routière devant un lycée.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Un passage piéton neuf et bien visible existe déjà devant l’établissement.',
						a: 'Faux',
						c: 'La lettre signale l’effacement du passage piéton et l’absence de ralentisseurs.',
						mark: '0.5'
					},
					{
						q: 'Les signataires emploient un ton respectueux et formulent des propositions concrètes.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Quels deux facteurs rendent la traversée dangereuse devant le lycée (§2) ?',
				a1: 'La circulation dense aux heures scolaires, l’absence de ralentisseurs et l’effacement du passage piéton.',
				q2: 'Quelles mesures précises les signataires demandent-ils au paragraphe 3 ?',
				a2: 'La pose de panneaux lumineux et le traçage d’un passage protégé.',
				q3: 'Relevez dans le texte un verbe au conditionnel de politesse et un connecteur de but.',
				a3: 'Conditionnel de politesse : « nous souhaiterions ». Connecteur de but : « afin de » (ou « pour »).',
				ref1Word: 'votre (§1)',
				ref1Ans: 'de Monsieur le Président de l’APC',
				ref2Word: 'notre (§3)',
				ref2Ans: 'des élèves et parents de 1AS (les expéditeurs)',
				viseeCorrect: 'Convaincre le président de l’APC d’aménager une signalisation sécurisée devant le lycée',
				viseeDistractors: [
					{
						text: 'Donner un cours théorique sur le moteur automobile',
						diagnosticFeedback: 'Le texte porte sur la sécurité routière scolaire, pas sur la mécanique.'
					},
					{
						text: 'Raconter un voyage en train entre deux wilayas',
						diagnosticFeedback: 'Il s’agit d’une lettre ouverte argumentée et non d’un récit.'
					},
					{
						text: 'Remercier la commune pour des travaux déjà terminés',
						diagnosticFeedback: 'Les signataires demandent des aménagements qui n’ont pas encore été faits.'
					}
				],
				themeSummary: 'la sécurisation routière des abords d’un établissement scolaire'
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
						? '1) Répondez par Vrai ou Faux et justifiez les propositions fausses :'
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
				content: `3) À qui renvoient les indices d’énonciation soulignés dans la lettre ?\na) ${variant.ref1Word}   b) ${variant.ref2Word}`,
				answer: `a) ${variant.ref1Word} : ${variant.ref1Ans}\nb) ${variant.ref2Word} : ${variant.ref2Ans}`,
				mark: '1.5'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: '4) Choisissez la bonne réponse : la visée de cette lettre ouverte est de...',
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
			grade: '1as_tcst',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Dans la lettre « ${variant.title} », quel est l’objectif des expéditeurs ?`,
				questionTextAr: 'حدّد الهدف الحجاجي من هذه الرسالة المفتوحة:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Cette lettre ouverte vise à convaincre le destinataire d’agir concernant ${variant.themeSummary}.`
			},
			sujetExercise: {
				customTitle: 'I. Compréhension de l’écrit',
				points: 7,
				instruction: 'Lisez attentivement cette lettre ouverte puis répondez aux questions :',
				content
			},
			hints: [
				'تحقق دائما من المرسل (expéditeur) والمرسل إليه (destinataire) في السطر الأول والأخير من الرسالة.',
				'استخرج الحجج المرتبة بروابط التعداد: Tout d’abord / Ensuite / Enfin.',
				'صيغة النداء في البداية تقابلها صيغة الوداع في النهاية باللقب نفسه.'
			],
			solutionStepsAr: [
				`Vrai/Faux : ${variant.tfItems.map((t) => t.a).join(' / ')}`,
				`Q2-a : ${variant.a1}`,
				`Q2-b : ${variant.a2}`,
				`Q2-c : ${variant.a3}`,
				`Indices : ${variant.ref1Ans} ; ${variant.ref2Ans}`
			],
			finalAnswer: variant.viseeCorrect
		};
	}
};

// 3. Fonctionnement de la langue 1 — Cause, Conséquence, But, Modalisateurs & Famille de mots (7 pts)
const tpl1asTcstT2LogiqueModalLang: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcst_t2_logique_modal_lang',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'grammaire_syntaxe',
	titleAr: 'قواعد اللغة — روابط السبب والنتيجة والغاية، الموداليزاتورات، وعائلة الكلمة',
	curriculumLessonId: 'fre_lesson_1as_tcst_t2_cause_consequence_but',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				wfRows: [
					{
						verbe: { given: true, value: 'recycler' },
						nom: { value: 'recyclage', mark: '0.5' },
						adjectif: { value: 'recyclable / recyclé(e)', mark: '0.5' }
					},
					{
						verbe: { value: 'polluer', mark: '0.5' },
						nom: { given: true, value: 'pollution' },
						adjectif: { value: 'polluant(e) / pollué(e)', mark: '0.5' }
					}
				],
				logicPrompt:
					'Reliez chaque couple de phrases à l’aide du connecteur entre parenthèses (attention au mode verbal) :\na) Les arbres sont précieux. Ils purifient l’air. (parce que)\nb) Le plastique encombre la cour. Nous installons des bacs de tri. (par conséquent)\nc) Nous organisons une campagne. Tous les élèves (respecter) la propreté. (afin que)',
				logicAns:
					'a) Les arbres sont précieux parce qu’ils purifient l’air.\nb) Le plastique encombre la cour ; par conséquent, nous installons des bacs de tri.\nc) Nous organisons une campagne afin que tous les élèves respectent la propreté.',
				causeNomPrompt:
					'Complétez avec « grâce à » ou « à cause de » :\na) .......... la sécheresse prolongée, le niveau du barrage a baissé.\nb) .......... l’effort des volontaires, le parc du lycée est devenu propre.',
				causeNomAns: 'a) À cause de   b) Grâce à',
				modPrompt:
					'Relevez le modalisateur dans chaque phrase et précisez sa nuance (certitude, regret ou politesse) :\na) « Malheureusement, beaucoup de pain est encore gaspillé. »\nb) « Nous souhaiterions aménager un coin lecture dans la cour. »',
				modAns: 'a) Malheureusement (regret)   b) souhaiterions (conditionnel de politesse)',
				mcqQuestion: 'Complétez correctement : « Les élèves trient leurs feuilles afin que le papier .......... réutilisé. » (être)',
				mcqCorrect: 'soit',
				mcqDistractors: [
					{
						text: 'est',
						diagnosticFeedback: '« afin que » impose toujours le subjonctif présent, jamais l’indicatif.'
					},
					{
						text: 'sera',
						diagnosticFeedback: 'On n’emploie pas le futur après « afin que ».'
					},
					{
						text: 'soient',
						diagnosticFeedback: '« le papier » est au singulier : qu’il soit.'
					}
				]
			},
			{
				wfRows: [
					{
						verbe: { given: true, value: 'sensibiliser' },
						nom: { value: 'sensibilisation', mark: '0.5' },
						adjectif: { value: 'sensible', mark: '0.5' }
					},
					{
						verbe: { value: 'économiser', mark: '0.5' },
						nom: { given: true, value: 'économie' },
						adjectif: { value: 'économique / économe', mark: '0.5' }
					}
				],
				logicPrompt:
					'Transformez ces phrases selon la consigne entre parenthèses :\na) La cour est ombragée parce que les élèves ont planté des arbres. (Remplacez « parce que » par « donc »)\nb) Le médecin donne des conseils. Les adolescents (éviter) la fatigue. (Reliez avec « pour que »)\nc) Amine ferme bien le robinet. Il veut économiser l’eau. (Reliez avec « afin de »)',
				logicAns:
					'a) Les élèves ont planté des arbres, donc la cour est ombragée.\nb) Le médecin donne des conseils pour que les adolescents évitent la fatigue.\nc) Amine ferme bien le robinet afin d’économiser l’eau.',
				causeNomPrompt:
					'Complétez avec « grâce à » ou « à cause de » :\na) .......... la mauvaise alimentation, certains élèves manquent d’énergie.\nb) .......... des campagnes de reboisement, la forêt retrouve sa vitalité.',
				causeNomAns: 'a) À cause de   b) Grâce à',
				modPrompt:
					'Soulignez le modalisateur et indiquez sa valeur (obligation ou certitude) :\na) « Il est indéniable que le sport améliore la santé scolaire. »\nb) « Il faut réparer rapidement les robinets défectueux. »',
				modAns: 'a) Il est indéniable que (certitude)   b) Il faut (obligation)',
				mcqQuestion: 'Quelle phrase exprime correctement le but lorsque le sujet est identique dans les deux actions ?',
				mcqCorrect: 'Yasmine prend un petit-déjeuner complet afin de rester concentrée en classe.',
				mcqDistractors: [
					{
						text: 'Yasmine prend un petit-déjeuner complet afin qu’elle reste concentrée en classe.',
						diagnosticFeedback: 'Avec le même sujet (Yasmine), on emploie « afin de + infinitif ».'
					},
					{
						text: 'Yasmine prend un petit-déjeuner complet pour que rester concentrée en classe.',
						diagnosticFeedback: '« pour que » ne peut pas être suivi directement d’un infinitif.'
					},
					{
						text: 'Yasmine prend un petit-déjeuner complet parce que rester concentrée en classe.',
						diagnosticFeedback: '« parce que » exprime la cause et exige un verbe conjugué.'
					}
				]
			},
			{
				wfRows: [
					{
						verbe: { given: true, value: 'prévenir' },
						nom: { value: 'prévention', mark: '0.5' },
						adjectif: { value: 'préventif / préventive', mark: '0.5' }
					},
					{
						verbe: { value: 'équilibrer', mark: '0.5' },
						nom: { given: true, value: 'équilibre' },
						adjectif: { value: 'équilibré(e)', mark: '0.5' }
					}
				],
				logicPrompt:
					'Reliez les phrases en employant le rapport demandé :\na) L’eau est une ressource précieuse. Chacun doit la préserver. (c’est pourquoi)\nb) Les professeurs expliquent le tri. Chaque classe (pouvoir) participer. (afin que)\nc) Le quartier est plus sain. Les habitants nettoient les rues ensemble. (car)',
				logicAns:
					'a) L’eau est une ressource précieuse, c’est pourquoi chacun doit la préserver.\nb) Les professeurs expliquent le tri afin que chaque classe puisse participer.\nc) Le quartier est plus sain car les habitants nettoient les rues ensemble.',
				causeNomPrompt:
					'Complétez avec « grâce à » ou « à cause de » :\na) .......... la solidarité des lycéens, deux cents arbustes ont été plantés.\nb) .......... l’absence de ralentisseurs, les voitures roulent trop vite.',
				causeNomAns: 'a) Grâce à   b) À cause de',
				modPrompt:
					'Relevez le modalisateur et précisez sa valeur (probabilité ou nécessité) :\na) « Ce projet écologique réduira probablement la facture d’eau du lycée. »\nb) « Il est indispensable de maintenir la cantine scolaire propre. »',
				modAns: 'a) probablement (probabilité)   b) Il est indispensable de (nécessité)',
				mcqQuestion: 'Choisissez la forme verbale correcte : « Le proviseur soutient le club afin que les élèves .......... réussir leur campagne verte. » (pouvoir)',
				mcqCorrect: 'puissent',
				mcqDistractors: [
					{
						text: 'peuvent',
						diagnosticFeedback: 'Après « afin que », le verbe se conjugue au subjonctif présent.'
					},
					{
						text: 'pourront',
						diagnosticFeedback: 'Le futur de l’indicatif ne s’emploie pas après « afin que ».'
					},
					{
						text: 'puisse',
						diagnosticFeedback: 'Le sujet « les élèves » est au pluriel : qu’ils puissent.'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			{ type: 'text', content: '1) Complétez le tableau de la famille de mots suivant (2.0 pts) :' },
			buildFrenchWordFamilyTableBlock(variant.wfRows),
			{
				type: 'text',
				content: `2) ${variant.logicPrompt} (2.5 pts)`,
				answer: variant.logicAns,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `3) ${variant.causeNomPrompt} (1.0 pt)`,
				answer: variant.causeNomAns,
				mark: '1.0'
			},
			{
				type: 'text',
				content: `4) ${variant.modPrompt} (1.5 pts)`,
				answer: variant.modAns,
				mark: '1.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الإجابة السليمة حول روابط الغاية والمنصوب:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'On emploie « afin de / pour + infinitif » avec un même sujet, et « afin que / pour que + subjonctif » avec deux sujets différents.'
			},
			sujetExercise: {
				customTitle: 'II. Fonctionnement de la langue',
				points: 7,
				instruction: 'Traitez les exercices de vocabulaire et de rapports logiques ci-dessous :',
				content
			},
			hints: [
				'« grâce à » للسبب الإيجابي، و« à cause de » للسبب السلبي، وكلاهما يتبعه اسم.',
				'« afin que / pour que » يتبعهما المنصوب (subjonctif: soit, puisse, respectent)، أما « afin de / pour » فيتبعهما المصدر.',
				'عند التحويل من السبب (parce que) إلى النتيجة (donc) اعكس ترتيب الجملتين منطقيا.'
			],
			solutionStepsAr: [
				`Logique : ${variant.logicAns}`,
				`Cause nominale : ${variant.causeNomAns}`,
				`Modalisateurs : ${variant.modAns}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 4. Fonctionnement de la langue 2 — Interrogation, Discours rapporté & Lexique argumentatif (7 pts)
const tpl1asTcstT2InterrogationDiscoursLang: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcst_t2_interrogation_discours_lang',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'discours_rhetorique',
	titleAr: 'قواعد اللغة — أنواع الاستفهام، الكلام المنقول في المقابلة، وتصنيف المعجم الحجاجي',
	curriculumLessonId: 'fre_lesson_1as_tcst_t2_interrogation_discours_rapporte',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				classifyBank: ['reboisement', 'recyclage', 'pollution', 'gaspillage', 'ensablement', 'énergie propre'],
				classifyCols: [
					{ header: 'Menaces pour l’environnement', items: ['pollution', 'gaspillage', 'ensablement'], mark: '1.0' },
					{ header: 'Solutions écologiques', items: ['reboisement', 'recyclage', 'énergie propre'], mark: '1.0' }
				],
				interrogPrompt:
					'Transformez ces questions familières en registre soutenu (avec inversion du sujet) et précisez s’il s’agit d’une interrogation totale ou partielle :\na) Vous plantez des oliviers dans les zones steppiques ?\nb) Vous recommandez quels aliments pour le petit-déjeuner ?',
				interrogAns:
					'a) Plantez-vous des oliviers dans les zones steppiques ? (Interrogation totale)\nb) Quels aliments recommandez-vous pour le petit-déjeuner ? (Interrogation partielle)',
				di1Prompt: 'a) Le journaliste demande à l’ingénieur : « Est-ce que le tri sélectif réduit la pollution ? »',
				di1Ans: 'Le journaliste demande à l’ingénieur si le tri sélectif réduit la pollution.',
				di2Prompt: 'b) La docteure a conseillé aux élèves : « Buvez de l’eau et évitez les sodas ! »',
				di2Ans: 'La docteure a conseillé aux élèves de boire de l’eau et d’éviter les sodas.',
				di3Prompt: 'c) L’agronome a déclaré : « Nous planterons des arbres résistants dès cet automne. »',
				di3Ans: 'L’agronome a déclaré qu’ils planteraient des arbres résistants dès cet automne-là.',
				mcqQuestion: 'Quelle est la transformation correcte au discours indirect de : « L’élève demande au médecin : "Que faut-il manger le matin ?" » ?',
				mcqCorrect: 'L’élève demande au médecin ce qu’il faut manger le matin.',
				mcqDistractors: [
					{
						text: 'L’élève demande au médecin qu’est-ce qu’il faut manger le matin ?',
						diagnosticFeedback: 'On supprime « qu’est-ce que » et le point d’interrogation au discours indirect.'
					},
					{
						text: 'L’élève demande au médecin s’il faut manger le matin.',
						diagnosticFeedback: '« si » remplace une question totale (oui/non), non « Que ».'
					},
					{
						text: 'L’élève demande au médecin que il faut manger le matin.',
						diagnosticFeedback: 'Le mot interrogatif « Que » devient toujours « ce que » (ce qu’).'
					}
				]
			},
			{
				classifyBank: ['hygiène', 'prévention', 'anémie', 'obésité', 'vitamines', 'sédentarité'],
				classifyCols: [
					{ header: 'Risques pour la santé scolaire', items: ['anémie', 'obésité', 'sédentarité'], mark: '1.0' },
					{ header: 'Facteurs de bonne santé', items: ['hygiène', 'prévention', 'vitamines'], mark: '1.0' }
				],
				interrogPrompt:
					'Réécrivez ces questions au registre soutenu (inversion) et indiquez leur type (totale / partielle) :\na) Est-ce que votre centre recycle aussi le verre ?\nb) Pourquoi les élèves se fatiguent-ils rapidement ?',
				interrogAns:
					'a) Votre centre recycle-t-il aussi le verre ? (Interrogation totale)\nb) Pourquoi les élèves se fatiguent-ils rapidement ? (Déjà au registre soutenu — Interrogation partielle)',
				di1Prompt: 'a) Le club scientifique demande au chercheur : « Comment fonctionnent les bacs de tri ? »',
				di1Ans: 'Le club scientifique demande au chercheur comment fonctionnent les bacs de tri.',
				di2Prompt: 'b) Le proviseur recommande aux délégués : « Sensibilisez vos camarades à la propreté ! »',
				di2Ans: 'Le proviseur recommande aux délégués de sensibiliser leurs camarades à la propreté.',
				di3Prompt: 'c) L’ingénieur a affirmé : « Cette station économise beaucoup d’eau. »',
				di3Ans: 'L’ingénieur a affirmé que cette station économisait beaucoup d’eau.',
				mcqQuestion: 'Choisissez la transformation correcte au discours indirect : « L’expert a annoncé : "Le projet commencera demain." »',
				mcqCorrect: 'L’expert a annoncé que le projet commencerait le lendemain.',
				mcqDistractors: [
					{
						text: 'L’expert a annoncé que le projet commencera demain.',
						diagnosticFeedback: 'Avec un verbe introducteur au passé (a annoncé), le futur devient conditionnel et « demain » devient « le lendemain ».'
					},
					{
						text: 'L’expert a annoncé si le projet commencerait le lendemain.',
						diagnosticFeedback: 'La phrase directe est déclarative, on utilise « que », pas « si ».'
					},
					{
						text: 'L’expert a annoncé que le projet a commencé la veille.',
						diagnosticFeedback: 'Le sens temporel du futur a été inversé.'
					}
				]
			},
			{
				classifyBank: ['respect', 'solidarité', 'négligence', 'indifférence', 'civisme', 'dégradation'],
				classifyCols: [
					{ header: 'Comportements dénoncés', items: ['négligence', 'indifférence', 'dégradation'], mark: '1.0' },
					{ header: 'Valeurs défendues', items: ['respect', 'solidarité', 'civisme'], mark: '1.0' }
				],
				interrogPrompt:
					'Passez au registre soutenu (inversion du sujet) puis identifiez le type d’interrogation :\na) Est-ce que vous pouvez installer des poubelles de tri ?\nb) Où se situe la nouvelle station de compostage ?',
				interrogAns:
					'a) Pouvez-vous installer des poubelles de tri ? (Interrogation totale)\nb) Où la nouvelle station de compostage se situe-t-elle ? (ou Où se situe la nouvelle station ? — Interrogation partielle)',
				di1Prompt: 'a) Les élèves demandent au maire : « Est-ce que la commune plantera des arbres devant le lycée ? »',
				di1Ans: 'Les élèves demandent au maire si la commune plantera des arbres devant le lycée.',
				di2Prompt: 'b) Le médecin a rappelé aux jeunes : « Dormez huit heures par nuit ! »',
				di2Ans: 'Le médecin a rappelé aux jeunes de dormir huit heures par nuit.',
				di3Prompt: 'c) Le responsable a précisé : « Nous avons reçu votre lettre ouverte. »',
				di3Ans: 'Le responsable a précisé qu’ils avaient reçu leur lettre ouverte.',
				mcqQuestion: 'Quelle phrase est au discours indirect correct de : « Le journaliste demande : "Est-ce que le recyclage est coûteux ?" » ?',
				mcqCorrect: 'Le journaliste demande si le recyclage est coûteux.',
				mcqDistractors: [
					{
						text: 'Le journaliste demande que le recyclage est coûteux.',
						diagnosticFeedback: 'Une interrogation totale exige la conjonction « si ».'
					},
					{
						text: 'Le journaliste demande si le recyclage est-il coûteux ?',
						diagnosticFeedback: 'Pas d’inversion ni de point d’interrogation dans une interrogative indirecte.'
					},
					{
						text: 'Le journaliste demande est-ce que le recyclage est coûteux.',
						diagnosticFeedback: 'On remplace toujours « est-ce que » par « si ».'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const shuffledBank = rng.shuffle(variant.classifyBank);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) Classez les mots suivants dans le tableau ci-dessous (2.0 pts) :\n${shuffledBank.join('  -  ')}`
			},
			buildFrenchClassificationTableBlock({ columns: variant.classifyCols }),
			{
				type: 'text',
				content: `2) ${variant.interrogPrompt} (2.0 pts)`,
				answer: variant.interrogAns,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `3) Réécrivez les énoncés suivants au discours indirect (3.0 pts) :\n${variant.di1Prompt}\n${variant.di2Prompt}\n${variant.di3Prompt}`,
				answer: `a) ${variant.di1Ans}\nb) ${variant.di2Ans}\nc) ${variant.di3Ans}`,
				mark: '3.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر التحويل السليم إلى الكلام غير المباشر:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'Au discours indirect, on supprime les guillemets et le point d’interrogation ; « Est-ce que » devient « si », « Que » devient « ce que », et l’impératif devient « de + infinitif ».'
			},
			sujetExercise: {
				customTitle: 'II. Fonctionnement de la langue',
				points: 7,
				instruction: 'Traitez les activités suivantes sur le lexique, l’interrogation et le discours rapporté :',
				content
			},
			hints: [
				'الاستفهام الكلي (نعم/لا) يتحول إلى « si »، والأمر يتحول إلى « de + المصدر ».',
				'راقب زمن فعل القول: إذا كان في الماضي (a déclaré / a affirmé) نغيّر المضارع إلى imparfait والمستقبل إلى conditionnel présent.',
				'لا تترك أبدا علامة استفهام (؟) في آخر جملة الكلام غير المباشر.'
			],
			solutionStepsAr: [
				`Lexique : ${variant.classifyCols.map((c) => `${c.header} : ${c.items.join(', ')}`).join(' | ')}`,
				`Interrogation : ${variant.interrogAns}`,
				`Discours indirect (a) : ${variant.di1Ans}`,
				`Discours indirect (b) : ${variant.di2Ans}`,
				`Discours indirect (c) : ${variant.di3Ans}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 5. Production écrite — Rédiger une lettre ouverte (environnement / santé scolaire) (6 pts)
const tpl1asTcstT2LettreOuverteWe: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcst_t2_lettre_ouverte_we',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'production_ecrite',
	titleAr: 'الوضعية الإدماجية — تحرير رسالة مفتوحة للدفاع عن البيئة أو الصحة المدرسية',
	curriculumLessonId: 'fre_lesson_1as_tcst_t2_rediger_lettre_ouverte',
	defaultPoints: 6,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				sujetUnPrompt:
					'Au nom de votre classe de 1AS TCST, rédigez une lettre ouverte (12 à 15 lignes) adressée à Monsieur le Proviseur de votre lycée pour lui proposer l’installation de bacs de tri des déchets et l’aménagement d’un espace vert dans la cour.',
				sujetUnNotes: [
					'Respectez la mise en page complète : lieu et date, objet, formule d’appel, corps argumenté, formule de prise de congé et signature.',
					'Développez au moins deux arguments scientifiques ou écologiques reliés par des connecteurs (Tout d’abord, Ensuite, Par conséquent).',
					'Employez les indices d’énonciation (nous / vous), au moins un modalisateur et un rapport de but (afin que + subjonctif ou afin de + infinitif).',
					'Adoptez un ton respectueux et constructif (conditionnel de politesse).'
				],
				sujetDeuxPrompt:
					'Rédigez un court entretien (4 questions-réponses avec un chapeau) entre un élève journaliste et le médecin scolaire au sujet de l’importance du petit-déjeuner et du sommeil régulier avant les examens.',
				modelAnswer:
					'Constantine, le 14 février 2026\nLes élèves de la classe 1AS TCST\nÀ Monsieur le Proviseur du lycée\nObjet : Proposition d’aménagement d’un espace vert et de bacs de tri.\n\nMonsieur le Proviseur,\nNous avons l’honneur d’attirer votre attention sur l’importance de préserver un environnement propre et sain au sein de notre établissement.\nTout d’abord, l’installation de poubelles de tri pour le papier et le plastique est indispensable parce qu’elle limite la pollution et initie les jeunes au recyclage. Ensuite, planter des arbres dans la cour améliorerait la qualité de l’air et offrirait de l’ombre durant les mois chauds. Par conséquent, un cadre verdoyant favoriserait certainement notre bien-être et notre concentration en classe.\nNous souhaiterions donc organiser une journée volontaire de plantation avec nos enseignants afin que notre lycée devienne un modèle écologique. Dans l’attente d’une réponse favorable, veuillez agréer, Monsieur le Proviseur, l’expression de notre profond respect.\nLes délégués de la classe 1AS TCST',
				rubricSummary:
					'Respect intégral de la mise en page de la lettre ouverte (1.5 pts), Pertinence des arguments et des propositions (2.0 pts), Emploi des connecteurs logiques, modalisateurs et vouvoiement (1.0 pt), Correction grammaticale et orthographique (1.5 pts).',
				mcqQuestion: 'Quelle formule de prise de congé convient le mieux à une lettre ouverte adressée à Monsieur le Proviseur ?',
				mcqCorrect: 'Veuillez agréer, Monsieur le Proviseur, l’expression de notre profond respect.',
				mcqDistractors: [
					{
						text: 'À bientôt et merci d’avance, salut !',
						diagnosticFeedback: 'Registre familier inapproprié dans une lettre officielle.'
					},
					{
						text: 'Veuillez agréer, Madame la Directrice, nos salutations.',
						diagnosticFeedback: 'Il faut reprendre exactement le titre de la formule d’appel (Monsieur le Proviseur).'
					},
					{
						text: 'Faites vite ce que nous demandons, cordialement.',
						diagnosticFeedback: 'L’impératif direct est impoli envers un responsable.'
					}
				]
			},
			{
				sujetUnPrompt:
					'Vous constatez que de nombreux élèves consomment trop de produits sucrés et négligent l’hygiène alimentaire. Rédigez une lettre ouverte (12 à 15 lignes) adressée à Monsieur le Directeur de votre lycée pour demander l’organisation d’une semaine de sensibilisation à la santé scolaire.',
				sujetUnNotes: [
					'Respectez toutes les composantes formelles d’une lettre ouverte (lieu/date, objet, appel, corps, prise de congé, signature).',
					'Présentez le constat avec tact puis avancez deux ou trois arguments scientifiques (énergie, concentration, prévention).',
					'Intégrez un rapport de cause/conséquence, un rapport de but et des modalisateurs adaptés.',
					'Proposez des activités concrètes (conférence d’un médecin scolaire, affiches réalisées par les élèves).'
				],
				sujetDeuxPrompt:
					'Faites le compte rendu objectif (environ 10 lignes) d’une interview scientifique sur les bienfaits d’une alimentation équilibrée chez les lycéens.',
				modelAnswer:
					'Oran, le 18 février 2026\nLes membres du Club Scientifique (1AS TCST)\nÀ Monsieur le Directeur du lycée\nObjet : Demande d’organisation d’une semaine de la santé scolaire.\n\nMonsieur le Directeur,\nNous nous permettons de vous écrire afin de proposer l’organisation d’une semaine consacrée à l’éducation nutritionnelle et à la santé scolaire dans notre lycée.\nEn premier lieu, il est prouvé qu’une consommation excessive de sucreries entraîne la fatigue ; par conséquent, la vigilance des élèves diminue en classe. De plus, beaucoup d’adolescents sautent le petit-déjeuner parce qu’ils méconnaissent son rôle essentiel pour la mémoire. Enfin, sensibiliser les jeunes dès le secondaire est indispensable pour prévenir des problèmes de santé durables.\nNous souhaiterions ainsi inviter le médecin scolaire et exposer des affiches préparées par nos classes afin que chaque élève adopte de meilleures habitudes alimentaires. Espérant une suite favorable, veuillez agréer, Monsieur le Directeur, l’expression de nos salutations distinguées.\nLe Club Scientifique de 1AS TCST',
				rubricSummary:
					'Structure complète de la lettre ouverte (1.5 pts), Force et clarté des arguments de santé (2.0 pts), Connecteurs logiques, modalisateurs et registre soutenu (1.0 pt), Orthographe et syntaxe (1.5 pts).',
				mcqQuestion: 'Quelle phrase combine correctement le conditionnel de politesse et un rapport de but au subjonctif ?',
				mcqCorrect: 'Nous souhaiterions organiser un atelier santé afin que les élèves connaissent les règles d’une bonne nutrition.',
				mcqDistractors: [
					{
						text: 'Nous voulons un atelier santé afin que les élèves connaître la nutrition.',
						diagnosticFeedback: '« afin que » exige un verbe conjugué au subjonctif, non un infinitif.'
					},
					{
						text: 'Organisez un atelier santé pour que les élèves connaîtront la nutrition.',
						diagnosticFeedback: 'Ton impératif impoli et erreur de mode (futur au lieu du subjonctif).'
					},
					{
						text: 'Nous souhaiterions un atelier parce que la nutrition est afin que bonne.',
						diagnosticFeedback: 'Syntaxe incohérente.'
					}
				]
			},
			{
				sujetUnPrompt:
					'Dans votre commune, le gaspillage de l’eau potable et l’accumulation des déchets plastiques menacent l’environnement local. Rédigez une lettre ouverte (12 à 15 lignes) adressée à Monsieur le Président de l’APC pour l’appeler à lancer une campagne citoyenne de propreté et d’économie d’eau.',
				sujetUnNotes: [
					'Mettez en forme l’en-tête complet (ville, date, expéditeurs, destinataire, objet) et la formule d’appel.',
					'Exposez la gravité de la situation avec des arguments précis reliés par D’abord, En outre, Enfin.',
					'Utilisez des rapports logiques (cause, conséquence, but) et des modalisateurs (indispensable, certainement, il serait souhaitable).',
					'Terminez par une proposition citoyenne, la formule de prise de congé officielle et la signature.'
				],
				sujetDeuxPrompt:
					'Imaginez une courte interview (chapeau + 4 questions-réponses) réalisée avec un ingénieur agronome sur les moyens scientifiques de protéger les forêts algériennes contre les incendies d’été.',
				modelAnswer:
					'Tlemcen, le 22 février 2026\nLes élèves volontaires de 1AS TCST\nÀ Monsieur le Président de l’APC\nObjet : Appel pour une campagne communale de propreté et d’économie d’eau.\n\nMonsieur le Président,\nNous avons l’honneur de solliciter votre attention concernant deux défis écologiques urgents dans notre commune : le gaspillage de l’eau potable et la multiplication des déchets plastiques.\nD’abord, les fuites dans les conduites et les mauvais usages font perdre des quantités considérables d’eau, c’est pourquoi une sensibilisation générale devient indispensable. En outre, les sacs plastiques abandonnés polluent les sols et menacent la santé publique. Enfin, la propreté de nos rues reflète certainement le civisme et le respect mutuel de tous les citoyens.\nPar conséquent, il serait très utile de multiplier les conteneurs de tri et de lancer une journée communale de nettoyage afin que jeunes et adultes s’engagent ensemble. Dans l’attente de votre réponse, veuillez agréer, Monsieur le Président, l’expression de notre respectueuse considération.\nLes élèves volontaires de 1AS TCST',
				rubricSummary:
					'Mise en page officielle de la lettre ouverte (1.5 pts), Pertinence de l’argumentation environnementale (2.0 pts), Emploi juste des connecteurs et modalisateurs (1.0 pt), Correction de la langue (1.5 pts).',
				mcqQuestion: 'Quel élément doit obligatoirement figurer juste avant la formule d’appel dans une lettre ouverte ?',
				mcqCorrect: 'La ligne « Objet : ... » résumant avec précision le motif de la lettre',
				mcqDistractors: [
					{
						text: 'La signature finale des expéditeurs',
						diagnosticFeedback: 'La signature se place toujours tout en bas de la lettre.'
					},
					{
						text: 'La formule « Veuillez agréer... »',
						diagnosticFeedback: 'C’est la formule de prise de congé placée à la fin.'
					},
					{
						text: 'Un dialogue entre deux personnages imaginaires',
						diagnosticFeedback: 'La lettre ouverte est un texte argumentatif adressé à un destinataire réel.'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			buildFrenchWrittenProductionBlock({
				sujetUnTitle: 'Sujet 1 (Lettre ouverte argumentée) :',
				sujetUnPrompt: variant.sujetUnPrompt,
				sujetUnNotes: variant.sujetUnNotes,
				sujetDeuxPrompt: variant.sujetDeuxPrompt,
				modelAnswer: variant.modelAnswer,
				rubricSummary: variant.rubricSummary,
				mark: '6'
			})
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر القاعدة الصحيحة لكتابة الرسالة المفتوحة:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'Une lettre ouverte réussie associe une mise en page officielle complète, des arguments logiques structurés et un ton courtois.'
			},
			sujetExercise: {
				customTitle: 'III. Production écrite',
				points: 6,
				instruction: 'Traitez l’un des deux sujets au choix en veillant à la clarté et à la politesse du style :',
				content
			},
			hints: [
				'احترم التصميم الشكلي الكامل للرسالة المفتوحة: المكان والتاريخ، المرسل، المرسل إليه، الموضوع، صيغة النداء، الفقرات، صيغة الوداع، والتوقيع.',
				'استعمل ضمائر التلفظ (nous / vous) ورابطا منطقيا واحدا على الأقل لكل من السبب والنتيجة والغاية.',
				'تذكّر تكرار لقب المسؤول داخل صيغة الوداع: Veuillez agréer, Monsieur le ..., l’expression de notre profond respect.'
			],
			solutionStepsAr: [variant.rubricSummary, variant.modelAnswer],
			finalAnswer: variant.mcqCorrect
		};
	}
};

export const TEMPLATES_1AS_TCST_T2: FrenchParameterizedTemplate[] = [
	tpl1asTcstT2InterviewScientifiqueComp,
	tpl1asTcstT2LettreOuverteComp,
	tpl1asTcstT2LogiqueModalLang,
	tpl1asTcstT2InterrogationDiscoursLang,
	tpl1asTcstT2LettreOuverteWe
];
