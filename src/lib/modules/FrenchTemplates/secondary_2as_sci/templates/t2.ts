import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	FrenchGeneratedExerciseInstance,
	FrenchParameterizedTemplate
} from '../../types';
import {
	buildFrenchClassificationTableBlock,
	buildFrenchPassageBlock,
	buildFrenchWordFamilyTableBlock,
	buildFrenchWrittenProductionBlock
} from '../../french-helpers';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';

// ============================================================================
// 5 Parameterized Templates — 2AS Scientific & Management Shared — Trimester 2
// Projet 2 : Le plaidoyer et le réquisitoire — Argumenter pour défendre ou dénoncer
// Split (/20) : 2 comprehension (7 pts) + 2 text_exploration (7 pts) + 1 written_expression (6 pts)
// ============================================================================

// [1] Compréhension de l'écrit (7 pts) — Le plaidoyer (lecture, science éthique, eau)
export const tpl2asSciT2CompPlaidoyerScienceEau: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2as_sci_t2_comp_plaidoyer_science_eau',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (7 نقاط): المرافعة للدفاع عن القراءة أو العلم الأخلاقي أو حماية الماء',
	curriculumLessonId: 'fre_lesson_2as_sci_t2_plaidoyer_requisitoire',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'Plaidoyer pour le livre et la lecture scientifique',
				source: 'Revue Éducation et Savoir',
				paragraphs: [
					'À l’heure où les messages courts dominent nos écrans, il est indispensable de défendre ardemment la lecture approfondie chez les jeunes lycéens. Lire régulièrement des ouvrages scientifiques et culturels demeure, sans aucun doute, le meilleur moyen de bâtir un esprit rigoureux et autonome.',
					'D’abord, le livre développe durablement la concentration et la précision du vocabulaire. Contrairement aux vidéos fugitives, [[il]] invite le lecteur à analyser, comparer et vérifier chaque idée avec patience. De plus, la lecture nourrit l’esprit critique et protège les adolescents contre les rumeurs infondées qui circulent sur Internet.',
					'Certes, les outils numériques offrent un accès rapide à l’information ; cependant, rien ne remplace la richesse intellectuelle d’une bibliothèque bien fournie. En somme, encourager nos élèves à lire chaque jour, c’est investir dans [[leur]] réussite scolaire et dans l’avenir scientifique de tout le pays.'
				],
				glossary: [
					{ term: 'fugitive', meaning: 'très brève, qui passe et s’efface rapidement' },
					{ term: 'infondées', meaning: 'qui ne reposent sur aucune preuve solide' }
				],
				tfItems: [
					{
						q: 'a) L’auteur estime que la lecture approfondie n’est plus utile à l’ère des écrans.',
						a: 'Faux',
						c: 'Il affirme au contraire qu’il est indispensable de défendre la lecture approfondie chez les lycéens.',
						mark: '0.5'
					},
					{
						q: 'b) Le livre favorise la concentration et enrichit le vocabulaire.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'c) La lecture aide les jeunes à résister aux rumeurs sans preuve sur Internet.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'd) L’auteur reconnaît que les outils numériques permettent un accès rapide à l’information.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				compQuestions: [
					{
						q: 'a) Quelle thèse l’auteur défend-il dès le premier paragraphe ?',
						a: 'La lecture approfondie d’ouvrages scientifiques et culturels est indispensable pour bâtir un esprit rigoureux et autonome chez les jeunes.',
						mark: '1.0'
					},
					{
						q: 'b) Relevez deux arguments avancés dans le deuxième paragraphe pour appuyer cette thèse.',
						a: '1) Le livre développe la concentration et la précision du vocabulaire. 2) La lecture nourrit l’esprit critique et protège contre les rumeurs infondées.',
						mark: '1.0'
					},
					{
						q: 'c) Relevez dans le texte deux termes appartenant au lexique mélioratif qui valorisent la lecture.',
						a: 'Exemples acceptés : indispensable, meilleur, rigoureux, autonome, richesse intellectuelle (deux au choix).',
						mark: '1.0'
					}
				],
				refPrompt: '3) À qui ou à quoi renvoient les termes soulignés ? a) il (§2)   b) leur (§3)',
				refAnswer: 'a) il (§2) : le livre.   b) leur (§3) : nos élèves.',
				viseeHeader: '4) Ce texte est un plaidoyer dont la visée est de :',
				viseeOptions: [
					'Convaincre les lecteurs de l’importance vitale de la lecture approfondie',
					'Dénoncer l’ouverture des bibliothèques dans les lycées',
					'Décrire les étapes techniques de fabrication du papier'
				],
				viseeCorrect: 'Convaincre les lecteurs de l’importance vitale de la lecture approfondie',
				quizStem: 'Dans le plaidoyer pour la lecture, quel rôle joue la phrase « Certes, les outils numériques offrent un accès rapide ; cependant, rien ne remplace la bibliothèque » ?',
				quizCorrect: 'Une concession suivie d’une réfutation qui renforce la thèse en faveur du livre',
				quizDistractors: [
					{
						text: 'Un abandon complet de la thèse défendue dans l’introduction',
						diagnosticFeedback: 'L’auteur ne renonce pas à sa thèse : « cependant » réaffirme la valeur irremplaçable du livre.'
					},
					{
						text: 'Une simple définition scientifique des écrans',
						diagnosticFeedback: 'Il s’agit d’une stratégie argumentative (Certes... cependant...), non d’une définition.'
					},
					{
						text: 'Un récit au passé décrivant une panne informatique',
						diagnosticFeedback: 'La phrase est au présent argumentatif et n’évoque aucune panne.'
					}
				],
				quizExplanation: 'ثنائية « Certes..., cependant... » تُعبّر عن الاستدراك المتبوع بتأكيد الأطروحة لتقوية الإقناع.'
			},
			{
				title: 'Pour une science guidée par l’éthique',
				source: 'Cahiers de Réflexion Scientifique',
				paragraphs: [
					'Les découvertes scientifiques modernes apportent des bienfaits remarquables dans la médecine, l’agriculture et les communications. Toutefois, nous sommes convaincus que le progrès technique ne peut être véritablement bénéfique que s’il reste solidement encadré par des principes éthiques.',
					'En premier lieu, une recherche responsable place toujours la dignité humaine et la sécurité sanitaire au-dessus du profit matériel. Par exemple, le contrôle rigoureux des médicaments protège des millions de patients. Ensuite, l’éthique oriente les ingénieurs vers des technologies propres qui préservent la nature au lieu de [[la]] détruire.',
					'Bien que certains estiment que les règles morales freinent l’innovation, l’expérience prouve qu’[[elles]] garantissent au contraire la confiance de la société envers les chercheurs. Défendre une science éthique est donc un devoir noble pour préparer un avenir sûr et équilibré.'
				],
				glossary: [
					{ term: 'éthique', meaning: 'ensemble des principes moraux qui guident une pratique responsable' },
					{ term: 'dignité', meaning: 'respect dû à toute personne humaine' }
				],
				tfItems: [
					{
						q: 'a) L’auteur rejette totalement les découvertes scientifiques modernes.',
						a: 'Faux',
						c: 'Il reconnaît leurs bienfaits remarquables mais demande qu’elles soient encadrées par l’éthique.',
						mark: '0.5'
					},
					{
						q: 'b) Une recherche responsable fait passer la dignité humaine avant le profit matériel.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'c) Les règles morales détruisent la confiance entre la société et les chercheurs.',
						a: 'Faux',
						c: 'L’expérience prouve qu’elles garantissent au contraire la confiance de la société.',
						mark: '0.5'
					},
					{
						q: 'd) L’auteur emploie le pronom « nous » pour marquer son implication dans le texte.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				compQuestions: [
					{
						q: 'a) Quelle est la thèse soutenue par l’auteur dans le premier paragraphe ?',
						a: 'Le progrès technique n’est véritablement bénéfique que s’il est solidement encadré par des principes éthiques.',
						mark: '1.0'
					},
					{
						q: 'b) Quel exemple concret illustre le premier argument du texte (§2) ?',
						a: 'Le contrôle rigoureux des médicaments, qui protège des millions de patients.',
						mark: '1.0'
					},
					{
						q: 'c) Relevez dans le texte deux marques de subjectivité (modalisateurs ou pronoms).',
						a: 'Exemples acceptés : « nous sommes convaincus », « remarquables », « véritablement bénéfique », « devoir noble » (deux au choix).',
						mark: '1.0'
					}
				],
				refPrompt: '3) À quoi renvoient les pronoms soulignés ? a) la (§2)   b) elles (§3)',
				refAnswer: 'a) la (§2) : la nature.   b) elles (§3) : les règles morales.',
				viseeHeader: '4) Quelle est la visée communicative de ce texte ?',
				viseeOptions: [
					'Défendre l’alliance indispensable entre progrès scientifique et valeurs morales',
					'Expliquer la composition chimique d’un médicament',
					'Condamner toutes les formes de recherche médicale'
				],
				viseeCorrect: 'Défendre l’alliance indispensable entre progrès scientifique et valeurs morales',
				quizStem: 'Dans le plaidoyer pour une science éthique, quel argument écologique est avancé en faveur de l’éthique scientifique ?',
				quizCorrect: 'Elle oriente les ingénieurs vers des technologies propres qui préservent la nature',
				quizDistractors: [
					{
						text: 'Elle interdit la construction d’hôpitaux modernes',
						diagnosticFeedback: 'Au contraire, l’auteur valorise la sécurité sanitaire et la médecine.'
					},
					{
						text: 'Elle supprime tout contrôle sur les médicaments',
						diagnosticFeedback: 'Le texte cite justement le contrôle rigoureux des médicaments comme un exemple positif.'
					},
					{
						text: 'Elle privilégie le profit matériel immédiat',
						diagnosticFeedback: 'L’éthique place la dignité humaine au-dessus du profit matériel.'
					}
				],
				quizExplanation: 'الفقرة الثانية تبيّن أن الأخلاقيات توجّه المهندسين نحو تقنيات نظيفة تحافظ على الطبيعة.'
			},
			{
				title: 'Préserver l’eau potable : un devoir vital',
				source: 'Tribune Écologique Algérienne',
				paragraphs: [
					'L’eau douce est une richesse précieuse dont dépend toute forme de vie. Face au réchauffement climatique et à l’irrégularité des pluies en Algérie, il est urgent de mobiliser chaque citoyen pour protéger durablement [[cette]] ressource irremplaçable.',
					'Tout d’abord, économiser l’eau au quotidien — en réparant les fuites et en évitant les lavages excessifs — permet de sécuriser l’approvisionnement des villes et des campagnes. En outre, l’adoption de techniques d’irrigation modernes comme le goutte-à-goutte aide nos agriculteurs à obtenir d’excellentes récoltes tout en réduisant considérablement les pertes hydriques.',
					'Malgré la construction admirable de barrages et de stations de dessalement, aucun effort technique ne suffira sans une véritable conscience citoyenne. Agissons donc avec sagesse et solidarité afin de transmettre [[ce]] trésor vital aux générations futures.'
				],
				glossary: [
					{ term: 'goutte-à-goutte', meaning: 'méthode d’irrigation précise apportant l’eau directement aux racines' },
					{ term: 'pertes hydriques', meaning: 'quantités d’eau gaspillées ou évaporées inutilement' }
				],
				tfItems: [
					{
						q: 'a) Selon l’auteur, l’irrégularité des pluies rend urgente la protection de l’eau.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'b) L’irrigation au goutte-à-goutte augmente le gaspillage d’eau en agriculture.',
						a: 'Faux',
						c: 'Elle permet au contraire de réduire considérablement les pertes hydriques.',
						mark: '0.5'
					},
					{
						q: 'c) Les barrages et stations de dessalement rendent inutile la conscience citoyenne.',
						a: 'Faux',
						c: 'Aucun effort technique ne suffira sans une véritable conscience citoyenne.',
						mark: '0.5'
					},
					{
						q: 'd) L’auteur conclut par un appel collectif à la responsabilité.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				compQuestions: [
					{
						q: 'a) Citez deux gestes quotidiens mentionnés pour économiser l’eau (§2).',
						a: 'Réparer les fuites et éviter les lavages excessifs.',
						mark: '1.0'
					},
					{
						q: 'b) Quel est le double avantage de l’irrigation au goutte-à-goutte (§2) ?',
						a: 'Elle permet d’obtenir d’excellentes récoltes tout en réduisant considérablement les pertes hydriques.',
						mark: '1.0'
					},
					{
						q: 'c) Quel rapport logique exprime « Malgré » au début du troisième paragraphe ? Par quel outil suivi du subjonctif pourrait-on le remplacer ?',
						a: 'Un rapport de concession. On pourrait le remplacer par « Bien que » (ou « Quoique ») suivi du subjonctif.',
						mark: '1.0'
					}
				],
				refPrompt: '3) Que désignent les substituts lexicaux soulignés ? a) cette ressource irremplaçable (§1)   b) ce trésor vital (§3)',
				refAnswer: 'a) cette ressource irremplaçable (§1) : l’eau douce / l’eau potable.   b) ce trésor vital (§3) : l’eau douce / l’eau potable.',
				viseeHeader: '4) Quelle est la visée principale de ce plaidoyer ?',
				viseeOptions: [
					'Sensibiliser et convaincre les citoyens d’économiser et de préserver l’eau potable',
					'Critiquer les agriculteurs qui utilisent des méthodes modernes',
					'Raconter l’histoire d’une tempête de neige en hiver'
				],
				viseeCorrect: 'Sensibiliser et convaincre les citoyens d’économiser et de préserver l’eau potable',
				quizStem: 'Dans le plaidoyer pour l’eau potable, quelle idée centrale résume la conclusion du troisième paragraphe ?',
				quizCorrect: 'Les infrastructures hydrauliques doivent impérativement s’accompagner d’une conscience citoyenne responsable',
				quizDistractors: [
					{
						text: 'La construction de stations de dessalement dispense les citoyens d’économiser l’eau',
						diagnosticFeedback: 'L’auteur affirme exactement l’inverse grâce à la concession introduite par « Malgré ».'
					},
					{
						text: 'L’agriculture ne doit plus recevoir d’eau en été',
						diagnosticFeedback: 'Le texte encourage au contraire l’irrigation raisonnée au goutte-à-goutte.'
					},
					{
						text: 'Les précipitations sont devenues abondantes toute l’année',
						diagnosticFeedback: 'Le premier paragraphe évoque l’irrégularité des pluies.'
					}
				],
				quizExplanation: 'الفقرة الثالثة تؤكد بفضل الاستدراك (Malgré) أن المنشآت التقنية لا تكفي وحدها دون وعي المواطن ومسؤوليته.'
			}
		];

		const v = difficulty === 'hard' ? variants[1] : rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const content: ContentBlock[] = [
			buildFrenchPassageBlock({
				title: v.title,
				paragraphs: v.paragraphs,
				source: v.source,
				glossary: v.glossary
			}),
			{
				type: 'text',
				content: '1) Dites si les affirmations suivantes sont Vraies ou Fausses selon le texte (corrigez les énoncés faux) :'
			},
			{ type: 'true_false', items: v.tfItems },
			{ type: 'text', content: '2) Répondez aux questions suivantes en vous appuyant sur le texte :' },
			...v.compQuestions.map((item) => ({
				type: 'text' as const,
				content: item.q,
				answer: item.a,
				mark: item.mark
			})),
			{ type: 'text', content: v.refPrompt, answer: v.refAnswer, mark: '1.0' },
			{
				type: 'multiple_choice',
				groups: [
					{
						header: v.viseeHeader,
						options: v.viseeOptions,
						correct: v.viseeCorrect,
						mark: '1.0'
					}
				]
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizStem,
				questionTextAr: 'اختر الإجابة الصحيحة وفق مضمون المرافعة:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: v.quizExplanation
			},
			sujetExercise: {
				customTitle: 'I. Compréhension de l’écrit',
				points: 7,
				instruction: 'Lisez attentivement ce plaidoyer puis répondez aux questions de compréhension.',
				content
			},
			hints: [
				'استخرج الأطروحة (la thèse) في جملة تامة تعكس موقف الكاتب المؤيد لا في كلمة واحدة.',
				'ابحث عن مؤشرات الذاتية في المعجم الإيجابي (précieux, indispensable) وظروف اليقين والضمير nous.',
				'لاحظ كيف يوظف الكاتب الاستدراك (Certes... cependant / Bien que / Malgré) لتقوية حجته.'
			],
			solutionStepsAr: [
				'فحص عبارات Vrai / Faux وتبرير الخاطئة منها اعتمادا على النص.',
				'استخراج الأطروحة والحجج وعلامات الذاتية أو المعجم التقديري.',
				'تحديد مرجع البدائل المسطرة ثم اختيار الغاية الإقناعية الصحيحة للمرافعة.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// [2] Compréhension de l'écrit (7 pts) — Le réquisitoire (gaspillage, pollution plastique, écrans)
export const tpl2asSciT2CompRequisitoireGaspillage: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2as_sci_t2_comp_requisitoire_gaspillage',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (7 نقاط): خطاب الادعاء والتنديد ضد التبذير الغذائي والتلوث البلاستيكي وإدمان الشاشات',
	curriculumLessonId: 'fre_lesson_2as_sci_t2_modalisateurs_lexique',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'Non au gaspillage scandaleux du pain et des aliments !',
				source: 'Chronique Société et Civisme',
				paragraphs: [
					'Chaque jour, des tonnes de pain et de plats encore consommables finissent malheureusement dans les poubelles de nos villes. Nous devons dénoncer avec fermeté ce gaspillage alimentaire, un fléau irresponsable qui blesse autant l’économie que les valeurs morales de solidarité.',
					'D’abord, jeter de la nourriture représente une perte financière considérable pour les familles et pour le pays, qui importe d’importantes quantités de céréales. Ensuite, ce comportement absurde aggrave la pollution environnementale : la décomposition des déchets organiques mal gérés libère des gaz nocifs et attire les nuisibles dans nos quartiers.',
					'Il est révoltant de constater une telle négligence alors que des populations vulnérables manquent du nécessaire dans le monde. En vérité, acheter uniquement selon ses besoins réels et valoriser les restes constituent des gestes simples mais urgents pour mettre fin à [[ce]] désastre quotidien.'
				],
				glossary: [
					{ term: 'céréales', meaning: 'plantes cultivées pour leurs grains, comme le blé et l’orge' },
					{ term: 'vulnérables', meaning: 'fragiles, exposées à la précarité' }
				],
				tfItems: [
					{
						q: 'a) Le gaspillage alimentaire touche uniquement les produits déjà avariés.',
						a: 'Faux',
						c: 'Des tonnes de pain et de plats encore consommables finissent dans les poubelles.',
						mark: '0.5'
					},
					{
						q: 'b) Jeter la nourriture entraîne une perte économique pour les familles et le pays.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'c) Les déchets alimentaires mal gérés peuvent libérer des gaz nocifs.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'd) L’auteur propose d’acheter selon ses besoins réels pour lutter contre ce fléau.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				compQuestions: [
					{
						q: 'a) Contre quel comportement l’auteur s’élève-t-il dans ce réquisitoire (§1) ?',
						a: 'Il s’élève contre le gaspillage alimentaire, notamment celui du pain et des plats encore consommables.',
						mark: '1.0'
					},
					{
						q: 'b) Citez une conséquence économique et une conséquence écologique de ce fléau (§2).',
						a: 'Conséquence économique : perte financière pour les familles et coût des importations de céréales. Conséquence écologique : libération de gaz nocifs et pollution des quartiers.',
						mark: '1.0'
					}
				],
				tableInstruction: '3) Classez les expressions suivantes dans le tableau : fléau irresponsable | acheter selon ses besoins | comportement absurde | valoriser les restes',
				tableCols: [
					{
						header: 'Lexique péjoratif (dénonciation)',
						items: ['fléau irresponsable', 'comportement absurde'],
						mark: '0.5'
					},
					{
						header: 'Solutions responsables proposées',
						items: ['acheter selon ses besoins', 'valoriser les restes'],
						mark: '0.5'
					}
				],
				subjPrompt: '4) Relevez deux modalisateurs montrant l’indignation de l’auteur (§1 et §3), puis précisez ce que remplace « ce désastre quotidien » (§3).',
				subjAnswer: 'Modalisateurs : « malheureusement », « scandaleux », « il est révoltant » (deux au choix). Référence : « ce désastre quotidien » renvoie au gaspillage alimentaire.',
				viseeHeader: '5) Ce texte est :',
				viseeOptions: [
					'Un réquisitoire visant à dénoncer et faire cesser le gaspillage alimentaire',
					'Un plaidoyer encourageant la surconsommation de pain',
					'Un texte purement objectif sans aucun jugement de valeur'
				],
				viseeCorrect: 'Un réquisitoire visant à dénoncer et faire cesser le gaspillage alimentaire',
				quizStem: 'Pourquoi peut-on affirmer que le texte sur le gaspillage du pain est un réquisitoire ?',
				quizCorrect: 'L’auteur y dénonce fermement un fléau à l’aide d’un lexique péjoratif et d’arguments économiques, écologiques et moraux',
				quizDistractors: [
					{
						text: 'L’auteur y reste totalement neutre en évitant tout adjectif évaluatif',
						diagnosticFeedback: 'Au contraire, le texte abonde en termes évaluatifs péjoratifs (scandaleux, fléau, absurde, révoltant).'
					},
					{
						text: 'L’auteur y défend l’idée de jeter les surplus de nourriture',
						diagnosticFeedback: 'C’est précisément ce comportement que l’auteur condamne.'
					},
					{
						text: 'Le texte se contente de donner une recette de cuisine traditionnelle',
						diagnosticFeedback: 'Il s’agit d’un texte argumentatif engagé et non d’une recette.'
					}
				],
				quizExplanation: 'النص يندّد بقوة بظاهرة سلبية باستعمال المعجم القدحي (fléau, absurde, révoltant) والحجج، فهو خطاب ادعاء (réquisitoire).'
			},
			{
				title: 'Halte à la pollution plastique sur nos côtes !',
				source: 'Revue Méditerranée Propre',
				paragraphs: [
					'Chaque été, des montagnes de sacs, de bouteilles et d’emballages plastiques défigurent lamentablement nos plages et nos forêts. Il est grand temps de condamner cette pollution catastrophique qui menace directement la faune marine et la santé humaine.',
					'Premièrement, le plastique à usage unique met plusieurs siècles à se dégrader dans la nature ; fragmenté en microparticules toxiques, il contamine les poissons puis se retrouve dans notre chaîne alimentaire. Deuxièmement, ces déchets inesthétiques obstruent les réseaux d’évacuation des pluies et aggravent les inondations urbaines.',
					'Bien que les emballages jetables semblent pratiques au premier abord, [[leur]] coût écologique reste intolérable. Remplacer les sacs jetables par des cabas réutilisables et trier systématiquement nos déchets sont des décisions urgentes pour sauver notre littoral.'
				],
				glossary: [
					{ term: 'microparticules', meaning: 'fragments minuscules de plastique invisibles à l’œil nu' },
					{ term: 'obstruent', meaning: 'bouchent, empêchent l’eau de s’écouler' }
				],
				tfItems: [
					{
						q: 'a) Le plastique à usage unique disparaît totalement de la nature en quelques semaines.',
						a: 'Faux',
						c: 'Il met plusieurs siècles à se dégrader dans la nature.',
						mark: '0.5'
					},
					{
						q: 'b) Les microparticules toxiques finissent par entrer dans la chaîne alimentaire humaine.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'c) Les déchets plastiques peuvent boucher les évacuations d’eau et aggraver les inondations.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'd) L’auteur recommande les sacs réutilisables et le tri des déchets.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				compQuestions: [
					{
						q: 'a) Comment la pollution plastique menace-t-elle finalement la santé humaine (§2) ?',
						a: 'Le plastique se fragmente en microparticules toxiques qui contaminent les poissons et se retrouvent dans la chaîne alimentaire humaine.',
						mark: '1.0'
					},
					{
						q: 'b) Quelle concession l’auteur formule-t-il au début du troisième paragraphe avant de la réfuter ?',
						a: 'Il reconnaît que les emballages jetables semblent pratiques au premier abord, mais rappelle que leur coût écologique reste intolérable.',
						mark: '1.0'
					}
				],
				tableInstruction: '3) Classez les expressions suivantes dans le tableau : pollution catastrophique | cabas réutilisables | microparticules toxiques | tri systématique des déchets',
				tableCols: [
					{
						header: 'Dangers dénoncés (lexique péjoratif)',
						items: ['pollution catastrophique', 'microparticules toxiques'],
						mark: '0.5'
					},
					{
						header: 'Gestes écologiques recommandés',
						items: ['cabas réutilisables', 'tri systématique des déchets'],
						mark: '0.5'
					}
				],
				subjPrompt: '4) Relevez deux indices de subjectivité (adverbe ou adjectif péjoratif), puis dites à quoi renvoie « leur » (§3).',
				subjAnswer: 'Indices de subjectivité : « lamentablement », « catastrophique », « inesthétiques », « intolérable » (deux au choix). Référence : « leur » renvoie aux emballages jetables.',
				viseeHeader: '5) Quelle est la visée communicative de ce texte ?',
				viseeOptions: [
					'Dénoncer les ravages du plastique jetable et pousser à des gestes écologiques responsables',
					'Faire la publicité des bouteilles en plastique à usage unique',
					'Expliquer l’histoire de la pêche en Méditerranée'
				],
				viseeCorrect: 'Dénoncer les ravages du plastique jetable et pousser à des gestes écologiques responsables',
				quizStem: 'Dans le réquisitoire contre le plastique, quelle conséquence urbaine inattendue des déchets plastiques est signalée ?',
				quizCorrect: 'Ils bouchent les réseaux d’évacuation des eaux de pluie et aggravent les inondations',
				quizDistractors: [
					{
						text: 'Ils améliorent la fertilité des jardins publics',
						diagnosticFeedback: 'Le plastique est polluant et non biodégradable rapidement.'
					},
					{
						text: 'Ils protègent les poissons des variations de température',
						diagnosticFeedback: 'Au contraire, les microparticules contaminent la faune marine.'
					},
					{
						text: 'Ils réduisent le coût du nettoyage des plages',
						diagnosticFeedback: 'Ils défigurent les côtes et alourdissent le coût écologique.'
					}
				],
				quizExplanation: 'الفقرة الثانية تذكر أن النفايات البلاستيكية تسدّ مجاري تصريف الأمطار وتفاقم الفيضانات الحضرية.'
			},
			{
				title: 'Contre l’usage excessif des écrans chez les adolescents',
				source: 'Observatoire Jeunesse et Santé',
				paragraphs: [
					'Passer de longues heures nocturnes devant un téléphone portable est devenu une habitude inquiétante chez de nombreux lycéens. Nous déplorons vivement cette dépendance numérique qui nuit à la santé, au sommeil et à la réussite scolaire.',
					'En premier lieu, la lumière bleue des écrans perturbe gravement le rythme biologique et provoque une fatigue chronique dès le réveil. En second lieu, le défilement incessant de contenus superficiels fragmente l’attention et expose les jeunes à la désinformation rapide. Malgré l’utilité indéniable de l’outil informatique pour les recherches sérieuses, [[son]] usage démesuré demeure néfaste.',
					'Il est donc indispensable d’instaurer des horaires raisonnables, de couper les écrans avant le coucher et de réserver davantage de temps à la lecture, au sport sain et au dialogue familial.'
				],
				glossary: [
					{ term: 'chronique', meaning: 'qui dure dans le temps et revient régulièrement' },
					{ term: 'désinformation', meaning: 'diffusion de nouvelles fausses ou manipulées' }
				],
				tfItems: [
					{
						q: 'a) La lumière bleue des écrans améliore la qualité du sommeil des lycéens.',
						a: 'Faux',
						c: 'Elle perturbe gravement le rythme biologique et provoque une fatigue chronique.',
						mark: '0.5'
					},
					{
						q: 'b) Le défilement continu de contenus superficiels affaiblit la capacité d’attention.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'c) L’auteur nie toute utilité de l’outil informatique pour les études.',
						a: 'Faux',
						c: 'Il reconnaît l’utilité indéniable de l’outil informatique pour les recherches sérieuses.',
						mark: '0.5'
					},
					{
						q: 'd) L’auteur conseille de couper les écrans avant de dormir.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				compQuestions: [
					{
						q: 'a) Quels trois domaines de la vie du lycéen sont touchés par la dépendance numérique (§1) ?',
						a: 'La santé, le sommeil et la réussite scolaire.',
						mark: '1.0'
					},
					{
						q: 'b) Quelles alternatives saines l’auteur recommande-t-il dans le dernier paragraphe ?',
						a: 'Instaurer des horaires raisonnables, couper les écrans avant le coucher et consacrer plus de temps à la lecture, au sport sain et au dialogue familial.',
						mark: '1.0'
					}
				],
				tableInstruction: '3) Classez les expressions suivantes dans le tableau : fatigue chronique | recherches sérieuses | contenus superficiels | dialogue familial',
				tableCols: [
					{
						header: 'Méfaits de l’excès d’écrans',
						items: ['fatigue chronique', 'contenus superficiels'],
						mark: '0.5'
					},
					{
						header: 'Pratiques utiles et saines',
						items: ['recherches sérieuses', 'dialogue familial'],
						mark: '0.5'
					}
				],
				subjPrompt: '4) Relevez un verbe d’opinion péjoratif (§1) et un adjectif péjoratif (§2), puis précisez le référent de « son » (§2).',
				subjAnswer: 'Verbe : « déplorons » (vivement). Adjectif : « inquiétante / superficiels / démesuré / néfaste ». Référence : « son » renvoie à l’outil informatique.',
				viseeHeader: '5) Dans ce texte, la visée de l’auteur est de :',
				viseeOptions: [
					'Dénoncer l’excès d’écrans chez les jeunes et prôner un usage modéré et équilibré',
					'Encourager les élèves à utiliser leur téléphone tard la nuit',
					'Présenter les étapes d’assemblage d’un ordinateur portable'
				],
				viseeCorrect: 'Dénoncer l’excès d’écrans chez les jeunes et prôner un usage modéré et équilibré',
				quizStem: 'Dans le texte sur l’usage excessif des écrans, quelle nuance montre que l’auteur reste mesuré malgré son réquisitoire ?',
				quizCorrect: 'Il reconnaît l’utilité de l’outil informatique pour les recherches sérieuses tout en dénonçant son usage démesuré',
				quizDistractors: [
					{
						text: 'Il interdit définitivement l’usage de tout ordinateur au lycée',
						diagnosticFeedback: 'Il ne rejette pas l’outil lui-même mais uniquement son usage excessif et nocturne.'
					},
					{
						text: 'Il affirme que la lumière bleue n’a aucun effet sur le sommeil',
						diagnosticFeedback: 'Au contraire, il souligne qu’elle perturbe le rythme biologique.'
					},
					{
						text: 'Il conseille de remplacer les livres par des vidéos nocturnes',
						diagnosticFeedback: 'Il recommande la lecture et l’arrêt des écrans avant le coucher.'
					}
				],
				quizExplanation: 'الفقرة الثانية توظف الاستدراك (Malgré l’utilité indéniable...) للتفريق بين الاستعمال العلمي المفيد والإفراط الضار.'
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const content: ContentBlock[] = [
			buildFrenchPassageBlock({
				title: v.title,
				paragraphs: v.paragraphs,
				source: v.source,
				glossary: v.glossary
			}),
			{
				type: 'text',
				content: '1) Dites si ces énoncés sont Vrais ou Faux selon le texte (corrigez les énoncés faux) :'
			},
			{ type: 'true_false', items: v.tfItems },
			{ type: 'text', content: '2) Répondez avec clarté aux questions suivantes :' },
			...v.compQuestions.map((item) => ({
				type: 'text' as const,
				content: item.q,
				answer: item.a,
				mark: item.mark
			})),
			{ type: 'text', content: v.tableInstruction },
			buildFrenchClassificationTableBlock({ columns: v.tableCols }),
			{ type: 'text', content: v.subjPrompt, answer: v.subjAnswer, mark: '1.0' },
			{
				type: 'multiple_choice',
				groups: [
					{
						header: v.viseeHeader,
						options: v.viseeOptions,
						correct: v.viseeCorrect,
						mark: '1.0'
					}
				]
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizStem,
				questionTextAr: 'اختر الإجابة الصحيحة وفق مضمون نص الادعاء:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: v.quizExplanation
			},
			sujetExercise: {
				customTitle: 'I. Compréhension de l’écrit',
				points: 7,
				instruction: 'Lisez attentivement ce réquisitoire puis répondez aux questions proposées.',
				content
			},
			hints: [
				'في نص الادعاء (réquisitoire)، يكثر المعجم القدحي (fléau, nuisible, déplorer, scandaleux) لرفض الظاهرة.',
				'انتبه إلى الحلول الإيجابية التي يقترحها الكاتب في الخاتمة بعد التنديد بالمشكلة.',
				'عند استخراج المؤشرات الذاتية، استخرج الكلمة بالضبط كما وردت في النص.'
			],
			solutionStepsAr: [
				'التأكد من صحة العبارات وتبرير العبارات الخاطئة.',
				'استخراج الحجج وتصنيف المعجم القدحي مقابل الحلول المقترحة في الجدول.',
				'رصد المؤشرات الذاتية وتحديد المرجع ثم اختيار الغاية الحجاجية للنص.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// [3] Fonctionnement de la langue (7 pts) — Lexique mélioratif/péjoratif, modalisateurs, nominalisation et champs lexicaux
export const tpl2asSciT2ExpModalisateursNominalisation: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2as_sci_t2_exp_modalisateurs_nominalisation',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'vocabulaire_lexique',
	titleAr: 'البناء اللغوي (7 نقاط): المعجم الإيجابي والسلبي، الاسمية (nominalisation)، عائلة الكلمة والحقل المعجمي',
	curriculumLessonId: 'fre_lesson_2as_sci_t2_nominalisation_champs_lexicaux',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				lexPrompt:
					'1) Classez les termes suivants selon leur connotation dans un texte argumentatif : salutaire | fléau | indispensable | désastreux | enrichissant | nocif | précieux | scandaleux',
				lexCols: [
					{ header: 'Lexique mélioratif (Plaidoyer)', items: ['salutaire', 'indispensable', 'enrichissant', 'précieux'], mark: '1.0' },
					{ header: 'Lexique péjoratif (Réquisitoire)', items: ['fléau', 'désastreux', 'nocif', 'scandaleux'], mark: '1.0' }
				],
				wfRows: [
					{
						verbe: { given: true, value: 'préserver' },
						nom: { value: 'préservation', mark: '0.25' },
						adjectif: { value: 'préservé / préservateur', mark: '0.25' }
					},
					{
						verbe: { value: 'gaspiller', mark: '0.25' },
						nom: { given: true, value: 'gaspillage' },
						adjectif: { value: 'gaspilleur', mark: '0.25' }
					},
					{
						verbe: { value: 'polluer', mark: '0.25' },
						nom: { value: 'pollution', mark: '0.25' },
						adjectif: { given: true, value: 'polluant / pollué' }
					}
				],
				nomItems: [
					{
						q: 'a) Nominalisez la phrase suivante pour en faire un titre : « On encourage la lecture au lycée. »',
						a: 'L’encouragement de la lecture au lycée.',
						mark: '0.5'
					},
					{
						q: 'b) Nominalisez la phrase suivante : « Les citoyens trient les déchets ménagers. »',
						a: 'Le tri des déchets ménagers par les citoyens.',
						mark: '0.5'
					},
					{
						q: 'c) Nominalisez la phrase suivante : « Les jeunes deviennent plus responsables. »',
						a: 'La responsabilisation des jeunes (ou : La responsabilité accrue des jeunes).',
						mark: '0.5'
					}
				],
				modItems: [
					{
						q: 'a) Relevez deux modalisateurs et précisez leur valeur : « Indéniablement, nous devons protéger l’eau douce contre tout gaspillage irresponsable. »',
						a: '« Indéniablement » (certitude) ; « devons » (obligation morale) ; « irresponsable » (jugement péjoratif). (Deux au choix.)',
						mark: '1.0'
					},
					{
						q: 'b) Donnez quatre mots formant le champ lexical de « l’écologie » (au moins un verbe, un nom et un adjectif).',
						a: 'Exemples acceptés : préserver / recycler (verbe), eau / forêt / biodiversité (nom), durable / biodégradable / propre (adjectif).',
						mark: '1.0'
					}
				],
				quizStem: 'Quelle est la nominalisation exacte de la phrase : « Les associations sensibilisent les habitants à la propreté » ?',
				quizCorrect: 'La sensibilisation des habitants à la propreté par les associations',
				quizDistractors: [
					{
						text: 'La sensibilité des habitants à la propreté par les associations',
						diagnosticFeedback: '« sensibilité » correspond à l’adjectif « sensible » ; le verbe « sensibiliser » donne « sensibilisation ».'
					},
					{
						text: 'Le sensibilisement des habitants à la propreté',
						diagnosticFeedback: 'Le nom « sensibilisement » n’existe pas ; on emploie le suffixe -ation.'
					},
					{
						text: 'Sensibiliser les habitants à la propreté',
						diagnosticFeedback: 'Il s’agit d’une phrase à l’infinitif, pas d’une nominalisation.'
					}
				],
				quizExplanation: 'الاسم المشتق من الفعل « sensibiliser » هو « la sensibilisation » باللاحقة (-ation).'
			},
			{
				lexPrompt:
					'1) Classez les mots suivants dans la colonne appropriée : bénéfique | nuisible | exemplaire | toxique | vital | absurde | vertueux | catastrophique',
				lexCols: [
					{ header: 'Lexique mélioratif (valorisant)', items: ['bénéfique', 'exemplaire', 'vital', 'vertueux'], mark: '1.0' },
					{ header: 'Lexique péjoratif (dévalorisant)', items: ['nuisible', 'toxique', 'absurde', 'catastrophique'], mark: '1.0' }
				],
				wfRows: [
					{
						verbe: { given: true, value: 'recycler' },
						nom: { value: 'recyclage', mark: '0.25' },
						adjectif: { value: 'recyclable / recyclé', mark: '0.25' }
					},
					{
						verbe: { value: 'protéger', mark: '0.25' },
						nom: { given: true, value: 'protection' },
						adjectif: { value: 'protecteur / protégé', mark: '0.25' }
					},
					{
						verbe: { value: 'éduquer', mark: '0.25' },
						nom: { value: 'éducation', mark: '0.25' },
						adjectif: { given: true, value: 'éducatif' }
					}
				],
				nomItems: [
					{
						q: 'a) Nominalisez la phrase suivante : « Les chercheurs contrôlent la qualité des médicaments. »',
						a: 'Le contrôle de la qualité des médicaments par les chercheurs.',
						mark: '0.5'
					},
					{
						q: 'b) Nominalisez la phrase suivante : « La consommation de sacs jetables diminue. »',
						a: 'La diminution de la consommation de sacs jetables.',
						mark: '0.5'
					},
					{
						q: 'c) Nominalisez la phrase suivante : « Les volontaires nettoient la plage. »',
						a: 'Le nettoyage de la plage par les volontaires.',
						mark: '0.5'
					}
				],
				modItems: [
					{
						q: 'a) Identifiez la nuance exprimée par chaque modalisateur : « Hélas, la désinformation pourrait tromper les lecteurs imprudents. »',
						a: '« Hélas » (regret / jugement affectif) ; « pourrait » (éventualité / doute prudent au conditionnel) ; « imprudents » (jugement péjoratif).',
						mark: '1.0'
					},
					{
						q: 'b) Proposez quatre mots appartenant au champ lexical de « la lecture et du savoir ».',
						a: 'Exemples acceptés : livre, bibliothèque, lire, culture, esprit critique, enrichissant, connaissance (quatre au choix).',
						mark: '1.0'
					}
				],
				quizStem: 'Dans la phrase « Malheureusement, la pollution plastique menace gravement notre littoral », quels sont les modalisateurs ?',
				quizCorrect: 'Malheureusement, gravement et notre',
				quizDistractors: [
					{
						text: 'la, plastique et littoral',
						diagnosticFeedback: 'Ce sont des mots neutres ou un déterminant défini sans jugement affectif.'
					},
					{
						text: 'Uniquement le verbe « menace » au passé',
						diagnosticFeedback: '« menace » est au présent, et les adverbes « malheureusement / gravement » sont des modalisateurs majeurs.'
					},
					{
						text: 'Cette phrase ne contient aucun modalisateur',
						diagnosticFeedback: 'L’adverbe « malheureusement » marque clairement le jugement affectif de l’énonciateur.'
					}
				],
				quizExplanation: 'الظرفان (Malheureusement, gravement) وضمير الملكية (notre) مؤشرات ذاتية واضحة (modalisateurs).'
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const content: ContentBlock[] = [
			{ type: 'text', content: v.lexPrompt },
			buildFrenchClassificationTableBlock({ columns: v.lexCols }),
			{ type: 'text', content: '2) Complétez le tableau de dérivation (Verbe, Nom, Adjectif) :' },
			buildFrenchWordFamilyTableBlock(v.wfRows),
			{ type: 'text', content: '3) Transformez les phrases verbales suivantes en phrases nominales (nominalisation) :' },
			...v.nomItems.map((item) => ({
				type: 'text' as const,
				content: item.q,
				answer: item.a,
				mark: item.mark
			})),
			{ type: 'text', content: '4) Analysez les modalisateurs et le champ lexical dans les consignes suivantes :' },
			...v.modItems.map((item) => ({
				type: 'text' as const,
				content: item.q,
				answer: item.a,
				mark: item.mark
			}))
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizStem,
				questionTextAr: 'اختر الإجابة المعجمية أو النحوية الصحيحة:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: v.quizExplanation
			},
			sujetExercise: {
				customTitle: 'II. Fonctionnement de la langue',
				points: 7,
				instruction: 'Traitez les exercices portant sur le lexique argumentatif, la nominalisation et les modalisateurs.',
				content
			},
			hints: [
				'المعجم الإيجابي (mélioratif) يرفع من قيمة الشيء، والسلبي (péjoratif) يحطّ منها.',
				'في الاسمية (nominalisation)، حوّل الفعل المصرف إلى اسم واحذف الضمائر غير اللازمة.',
				'فرّق بين عائلة الكلمة (نفس الجذر) والحقل المعجمي (نفس الموضوع بجذور مختلفة).'
			],
			solutionStepsAr: [
				'تصنيف المفردات بدقة بين المعجم الإيجابي والمعجم السلبي.',
				'إكمال جدول الاشتقاق وتحويل الجمل الفعلية إلى جمل اسمية مكثفة.',
				'تحليل المؤشرات الذاتية وتقديم مفردات دقيقة من الحقل المعجمي المطلوب.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// [4] Fonctionnement de la langue (7 pts) — Opposition, concession (bien que + subjonctif, malgré, cependant) et connecteurs
export const tpl2asSciT2ExpOppositionConcession: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2as_sci_t2_exp_opposition_concession',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'grammaire_syntaxe',
	titleAr: 'البناء اللغوي (7 نقاط): التعارض والاستدراك (bien que + subjonctif، malgré، cependant) والروابط الحجاجية',
	curriculumLessonId: 'fre_lesson_2as_sci_t2_opposition_concession',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				relItems: [
					{
						q: 'a) Les livres papier coûtent parfois cher. Ils restent indispensables à la formation de l’esprit.\n   Reliez par « Bien que » (attention au mode) :',
						a: 'Bien que les livres papier coûtent parfois cher, ils restent indispensables à la formation de l’esprit.',
						mark: '0.75'
					},
					{
						q: 'b) La technologie progresse très vite. L’éthique scientifique demeure indispensable.\n   Reliez par « Malgré » (+ groupe nominal) :',
						a: 'Malgré la progression rapide (ou : les progrès rapides) de la technologie, l’éthique scientifique demeure indispensable.',
						mark: '0.75'
					},
					{
						q: 'c) Le plastique jetable est léger et pratique. Il détruit durablement les écosystèmes marins.\n   Reliez par « Bien que » :',
						a: 'Bien que le plastique jetable soit léger et pratique, il détruit durablement les écosystèmes marins.',
						mark: '0.75'
					},
					{
						q: 'd) Les campagnes de sensibilisation sont nombreuses. Le gaspillage du pain persiste dans certaines villes.\n   Reliez par « Malgré » (+ groupe nominal) :',
						a: 'Malgré les nombreuses campagnes de sensibilisation, le gaspillage du pain persiste dans certaines villes.',
						mark: '0.75'
					}
				],
				modeItems: [
					{
						q: 'a) Bien que l’Algérie (avoir) ........ plusieurs stations de dessalement, l’économie d’eau reste prioritaire.',
						a: 'ait (subjonctif présent).',
						mark: '0.5'
					},
					{
						q: 'b) Même si le recyclage (demander) ........ des efforts quotidiens, il protège notre santé.',
						a: 'demande (indicatif présent après « même si »).',
						mark: '0.5'
					},
					{
						q: 'c) Quoique les ingénieurs (faire) ........ des prouesses techniques, la prudence morale s’impose.',
						a: 'fassent (subjonctif présent après « quoique »).',
						mark: '0.5'
					},
					{
						q: 'd) Certains citoyens économisent l’eau, tandis que d’autres la (gaspiller) ........ sans réfléchir.',
						a: 'gaspillent (indicatif présent après « tandis que »).',
						mark: '0.5'
					}
				],
				clozePrompt:
					'3) Complétez le paragraphe argumentatif ci-dessous avec les articulateurs suivants : Par conséquent | D’abord | Cependant | En outre.\n« La préservation de l’eau douce est une priorité nationale. (1) ........ , cette ressource est indispensable à l’agriculture et à la santé publique. (2) ........ , sa gestion rigoureuse permet de faire face aux périodes de sécheresse. (3) ........ , certains comportements négligents provoquent encore des fuites importantes. (4) ........ , chaque citoyen doit adopter des gestes responsables au quotidien. »',
				clozeAnswer: '(1) D’abord (0.5) | (2) En outre (0.5) | (3) Cependant (0.5) | (4) Par conséquent (0.5).',
				quizStem: 'Conjuguez correctement les deux verbes : « Bien que la recherche (être) ........ coûteuse, même si les résultats (prendre) ........ du temps, la science éthique profite à tous. »',
				quizCorrect: 'soit / prennent',
				quizDistractors: [
					{
						text: 'est / prennent',
						diagnosticFeedback: '« Bien que » impose toujours le subjonctif (soit), et non l’indicatif (est).'
					},
					{
						text: 'soit / prendraient',
						diagnosticFeedback: '« Même si » dans une constatation générale appelle l’indicatif présent (prennent).'
					},
					{
						text: 'sera / prendront',
						diagnosticFeedback: 'On n’utilise jamais le futur de l’indicatif après « bien que ».'
					}
				],
				quizExplanation: 'بعد « bien que » نصرّف في المنصوب (soit)، وبعد « même si » نصرّف في الإخباري (prennent).'
			},
			{
				relItems: [
					{
						q: 'a) Les écrans facilitent la recherche documentaire. Leur usage nocturne nuit au sommeil des élèves.\n   Reliez par « Bien que » :',
						a: 'Bien que les écrans facilitent la recherche documentaire, leur usage nocturne nuit au sommeil des élèves.',
						mark: '0.75'
					},
					{
						q: 'b) Les lois interdisent les décharges sauvages. Des déchets plastiques polluent encore les forêts.\n   Reliez par « Malgré » (+ groupe nominal) :',
						a: 'Malgré l’interdiction légale des décharges sauvages (ou : Malgré les lois contre les décharges sauvages), des déchets plastiques polluent encore les forêts.',
						mark: '0.75'
					},
					{
						q: 'c) Ce projet écologique peut sembler ambitieux. Il améliorera durablement la qualité de l’air.\n   Reliez par « Bien que » :',
						a: 'Bien que ce projet écologique puisse sembler ambitieux, il améliorera durablement la qualité de l’air.',
						mark: '0.75'
					},
					{
						q: 'd) Les élèves sont très occupés. Ils consacrent vingt minutes par jour à la lecture.\n   Reliez par « En dépit de » (+ groupe nominal) :',
						a: 'En dépit de leur emploi du temps chargé (ou : de leurs nombreuses occupations), les élèves consacrent vingt minutes par jour à la lecture.',
						mark: '0.75'
					}
				],
				modeItems: [
					{
						q: 'a) Bien que la pollution (pouvoir) ........ être réduite, l’indifférence freine encore les progrès.',
						a: 'puisse (subjonctif présent).',
						mark: '0.5'
					},
					{
						q: 'b) Alors que les uns lisent des ouvrages fiables, d’autres (croire) ........ aux rumeurs en ligne.',
						a: 'croient (indicatif présent après « alors que »).',
						mark: '0.5'
					},
					{
						q: 'c) Quoique nous (savoir) ........ les dangers du gaspillage, les habitudes changent lentement.',
						a: 'sachions (subjonctif présent de savoir).',
						mark: '0.5'
					},
					{
						q: 'd) Même si les sacs en tissu (coûter) ........ un peu plus cher à l’achat, ils durent plusieurs années.',
						a: 'coûtent (indicatif présent après « même si »).',
						mark: '0.5'
					}
				],
				clozePrompt:
					'3) Complétez ce court plaidoyer avec les connecteurs suivants : En somme | Certes | En premier lieu | Toutefois.\n« La lecture reste une alliée précieuse pour les lycéens scientifiques. (1) ........ , elle renforce la maîtrise de la langue et la clarté du raisonnement. (2) ........ , les supports numériques permettent une consultation plus rapide. (3) ........ , le livre papier favorise une mémorisation plus profonde sans distraction. (4) ........ , lire chaque jour prépare efficacement la réussite aux examens. »',
				clozeAnswer: '(1) En premier lieu (0.5) | (2) Certes (0.5) | (3) Toutefois (0.5) | (4) En somme (0.5).',
				quizStem: 'Laquelle de ces transformations avec « malgré » est parfaitement correcte pour : « Bien qu’il soit conscient du danger, il gaspille encore l’eau » ?',
				quizCorrect: 'Malgré sa conscience du danger, il gaspille encore l’eau.',
				quizDistractors: [
					{
						text: 'Malgré qu’il soit conscient du danger, il gaspille encore l’eau.',
						diagnosticFeedback: 'La tournure « malgré que » est incorrecte en français soutenu ; il faut un groupe nominal après « malgré ».'
					},
					{
						text: 'Malgré sa conscience du danger, mais il gaspille encore l’eau.',
						diagnosticFeedback: 'Il ne faut jamais cumuler « malgré » et « mais » dans la même phrase.'
					},
					{
						text: 'Malgré être conscient du danger, il gaspille encore l’eau.',
						diagnosticFeedback: '« Malgré » est suivi d’un nom ou d’un groupe nominal, non d’un infinitif.'
					}
				],
				quizExplanation: 'حرف الجر « Malgré » يتبعه دائما اسم أو مجموعة اسمية (sa conscience du danger) دون « que » ودون تكرار « mais ».'
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const content: ContentBlock[] = [
			{ type: 'text', content: '1) Reliez les paires de phrases suivantes en exprimant la concession selon la consigne :' },
			...v.relItems.map((item) => ({
				type: 'text' as const,
				content: item.q,
				answer: item.a,
				mark: item.mark
			})),
			{ type: 'text', content: '2) Conjuguez les verbes entre parenthèses au mode qui convient (indicatif ou subjonctif) :' },
			...v.modeItems.map((item) => ({
				type: 'text' as const,
				content: item.q,
				answer: item.a,
				mark: item.mark
			})),
			{ type: 'text', content: v.clozePrompt, answer: v.clozeAnswer, mark: '2.0' }
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizStem,
				questionTextAr: 'اختر الصياغة النحوية الصحيحة للاستدراك:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: v.quizExplanation
			},
			sujetExercise: {
				customTitle: 'II. Fonctionnement de la langue',
				points: 7,
				instruction: 'Traitez les activités de syntaxe (opposition, concession), de modes verbaux et de cohérence argumentative.',
				content
			},
			hints: [
				'Bien que / Quoique + subjonctif (soit, ait, fasse, puisse, sache).',
				'Même si / Alors que / Tandis que + indicatif.',
				'Malgré / En dépit de + مجموعة اسمية فقط (ولا نكتب malgré que ولا نضيف mais بعدها).'
			],
			solutionStepsAr: [
				'الربط بأداتي الاستدراك مع احترام المنصوب بعد bien que والمجموعة الاسمية بعد malgré.',
				'اختيار الصيغة الفعلية الصحيحة (indicatif أو subjonctif) حسب الرابط.',
				'توظيف الروابط الحجاجية في أماكنها المنطقية لإتمام الفقرة.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// [5] Production écrite (6 pts) — Sujet 1 (guidé / compte rendu) + Sujet 2 (plaidoyer / réquisitoire libre)
export const tpl2asSciT2ProdPlaidoyerRequisitoire: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2as_sci_t2_prod_plaidoyer_requisitoire',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'production_ecrite',
	titleAr: 'الإنتاج الكتابي (6 نقاط): تحرير مرافعة (الماء، القراءة، العلم الأخلاقي) أو ادعاء (ضد التبذير والتلوث)',
	curriculumLessonId: 'fre_lesson_2as_sci_t2_rediger_plaidoyer_requisitoire',
	defaultPoints: 6,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				sujetUnTitle: 'Sujet 1 (Plaidoyer guidé) :',
				sujetUnPrompt:
					'Pour la Journée mondiale de l’eau, rédigez un plaidoyer (12 à 16 lignes) destiné au journal de votre lycée afin de convaincre vos camarades de préserver l’eau potable en Algérie.',
				sujetUnNotes: [
					'Introduction : rappeler la rareté croissante de l’eau douce et annoncer votre thèse claire',
					'Argument 1 : rôle vital pour la santé, l’hygiène et l’agriculture nationale (exemple : irrigation raisonnée)',
					'Argument 2 : devoir moral et écologique envers les générations futures (réparer les fuites, éviter le gaspillage)',
					'Insérer une concession réfutée (Bien que + subjonctif ou Malgré + nom) et un lexique mélioratif',
					'Conclusion : réaffirmer la thèse et lancer un appel collectif responsable'
				],
				sujetDeuxPrompt:
					'Vous constatez la multiplication des déchets plastiques autour des établissements scolaires et sur le littoral. Rédigez un réquisitoire structuré (12 à 16 lignes) pour dénoncer ce fléau et proposer des solutions concrètes.',
				modelAnswer:
					'Proposition pour le Sujet 1 (Plaidoyer pour la préservation de l’eau) :\nL’eau potable constitue la ressource la plus précieuse de notre planète. Face à la baisse des précipitations en Algérie, je suis fermement convaincu que sa préservation rigoureuse est un devoir vital qui concerne chaque citoyen.\nD’abord, l’eau douce garantit directement la santé publique et la sécurité alimentaire du pays. Sans une gestion rationnelle, par exemple grâce à l’irrigation au goutte-à-goutte, nos récoltes et nos villes risqueraient de souffrir durablement. En outre, économiser chaque goutte au quotidien — en réparant les robinets défectueux et en évitant les lavages abusifs — reflète un civisme exemplaire et une véritable solidarité envers les régions arides.\nBien que l’État construise de remarquables stations de dessalement, ces infrastructures ne sauraient suffire si les comportements individuels ne changent pas. En somme, protégeons avec sagesse ce trésor irremplaçable afin de garantir un avenir sain aux générations futures.',
				rubricSummary:
					'Respect de la consigne et de la visée persuasive (1.5) | Pertinence des arguments et exemples (1.5) | Organisation et connecteurs dont la concession (1.5) | Correction linguistique, lexique mélioratif/péjoratif et présentation (1.5).',
				quizStem: 'Dans un plaidoyer pour la préservation de l’eau, quelle phrase associe correctement une concession au subjonctif et un lexique mélioratif ?',
				quizCorrect: 'Bien que les stations de dessalement soient efficaces, la sobriété quotidienne demeure une vertu indispensable.',
				quizDistractors: [
					{
						text: 'Bien que les stations de dessalement sont efficaces, il faut gaspiller moins.',
						diagnosticFeedback: 'Après « bien que », le verbe être se conjugue au subjonctif (soient) et non à l’indicatif (sont).'
					},
					{
						text: 'Malgré que l’eau est rare, certains citoyens la préservent.',
						diagnosticFeedback: 'La formule « malgré que » est incorrecte ; utilisez « bien que + subjonctif » ou « malgré + nom ».'
					},
					{
						text: 'L’eau bout à cent degrés Celsius au niveau de la mer.',
						diagnosticFeedback: 'Cette phrase est une définition physique neutre, sans concession ni lexique argumentatif.'
					}
				],
				quizExplanation: 'الجملة الأولى سليمة تماما: « bien que + soient » (subjonctif) مع معجم تقديري إيجابي (vertu indispensable).'
			},
			{
				sujetUnTitle: 'Sujet 1 (Réquisitoire guidé) :',
				sujetUnPrompt:
					'Dans le cadre d’une campagne de sensibilisation contre le gaspillage alimentaire, rédigez un réquisitoire (12 à 16 lignes) pour dénoncer le jet quotidien du pain et des repas dans la société.',
				sujetUnNotes: [
					'Introduction : présenter ce constat alarmant et formuler votre thèse de dénonciation',
					'Argument 1 : perte économique lourde pour les ménages et pour la collectivité',
					'Argument 2 : atteinte aux valeurs de solidarité et aggravation de la pollution urbaine',
					'Employer un lexique péjoratif adapté, des modalisateurs et une concession avec « malgré » ou « bien que »',
					'Conclusion : appeler à des gestes concrets (acheter juste le nécessaire, réutiliser les restes)'
				],
				sujetDeuxPrompt:
					'À l’occasion de la semaine culturelle du lycée, rédigez un plaidoyer (12 à 16 lignes) pour défendre l’importance de la lecture et d’une science éthique dans la formation des jeunes générations.',
				modelAnswer:
					'Proposition pour le Sujet 1 (Réquisitoire contre le gaspillage alimentaire) :\nVoir chaque jour des quantités importantes de pain et de plats préparés finir dans les bennes à ordures est un spectacle profondément attristant. Il est urgent de dénoncer ce gaspillage alimentaire, un comportement irresponsable et coûteux.\nEn premier lieu, ce fléau pèse lourdement sur le budget des familles et sur l’économie nationale, qui consacre des ressources considérables à l’approvisionnement en céréales. De plus, l’accumulation de déchets alimentaires mal triés dégrade gravement l’hygiène de nos quartiers et favorise la pollution environnementale. Enfin, sur le plan moral, jeter de la nourriture bafoue la reconnaissance des bienfaits et la solidarité envers les plus démunis.\nMalgré les rappels répétés des associations, cette mauvaise habitude persiste encore. En conclusion, changeons résolument nos réflexes : achetons selon nos besoins réels et mettons fin ensemble à ce gaspillage inacceptable.',
				rubricSummary:
					'Adéquation au type réquisitoire et thèse nette (1.5) | Qualité des arguments économiques, écologiques et moraux (1.5) | Cohérence, connecteurs et concession (1.5) | Langue, lexique péjoratif, orthographe et ponctuation (1.5).',
				quizStem: 'Quel ensemble d’outils linguistiques caractérise le mieux un réquisitoire réussi contre le gaspillage ?',
				quizCorrect: 'Verbes de dénonciation (dénoncer, déplorer), lexique péjoratif (fléau, irresponsable) et connecteurs d’organisation',
				quizDistractors: [
					{
						text: 'Uniquement la voix passive et le présent de vérité générale sans aucune opinion',
						diagnosticFeedback: 'Cela caractérise le texte explicatif scientifique objectif du T1, non un réquisitoire engagé.'
					},
					{
						text: 'Un lexique mélioratif glorifiant le gaspillage',
						diagnosticFeedback: 'Un réquisitoire condamne un fléau ; il utilise un lexique péjoratif pour le dénoncer.'
					},
					{
						text: 'Uniquement des indicateurs de conte (Il était une fois, jadis)',
						diagnosticFeedback: 'Ces marqueurs appartiennent au récit merveilleux et non à l’argumentation.'
					}
				],
				quizExplanation: 'خطاب الادعاء يعتمد أفعال التنديد والمعجم السلبي القدحي والروابط المنظمة للحجج.'
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const content: ContentBlock[] = [
			buildFrenchWrittenProductionBlock({
				sujetUnTitle: v.sujetUnTitle,
				sujetUnPrompt: v.sujetUnPrompt,
				sujetUnNotes: v.sujetUnNotes,
				sujetDeuxPrompt: v.sujetDeuxPrompt,
				modelAnswer: v.modelAnswer,
				rubricSummary: v.rubricSummary,
				mark: '6.0'
			})
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizStem,
				questionTextAr: 'اختر الجواب المنهجي السليم للإنتاج الكتابي الحجاجي:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: v.quizExplanation
			},
			sujetExercise: {
				customTitle: 'III. Production écrite',
				points: 6,
				instruction: 'Traitez l’un des deux sujets au choix en rédigeant un texte argumentatif cohérent (12 à 16 lignes).',
				content
			},
			hints: [
				'اقرأ التعليمة جيدا لتميّز هل المطلوب مرافعة (plaidoyer) أم ادعاء (réquisitoire).',
				'اعتمد خطة ثلاثية واضحة: مقدمة بالأطروحة + عرض بحجتين أو ثلاث مع أمثلة واستدراك + خاتمة بدعوة للعمل.',
				'راجع تصريف المنصوب بعد bien que، وتوافق الصفات، وعلامات الترقيم قبل التسليم.'
			],
			solutionStepsAr: [
				'تحديد الموقف (مع القضية أو ضد الظاهرة) وصياغة الأطروحة في المقدمة.',
				'تنظيم الحجج المدعومة بالأمثلة مع المعجم التقديري أو القدحي وجملة استدراك مفنّدة.',
				'كتابة خاتمة مؤثرة ومراجعة النص وفق معايير التنقيط (6 نقاط).'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

export const TEMPLATES_2AS_SCI_T2: FrenchParameterizedTemplate[] = [
	tpl2asSciT2CompPlaidoyerScienceEau,
	tpl2asSciT2CompRequisitoireGaspillage,
	tpl2asSciT2ExpModalisateursNominalisation,
	tpl2asSciT2ExpOppositionConcession,
	tpl2asSciT2ProdPlaidoyerRequisitoire
];
