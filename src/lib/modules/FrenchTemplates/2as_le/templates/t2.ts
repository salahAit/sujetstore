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

export const TEMPLATES_2AS_LE_T2: FrenchParameterizedTemplate[] = [
	{
		id: 'fre_tpl_2as_le_t2_comp_plaidoyer_ethique',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'comprehension_ecrit',
		titleAr: 'I. Compréhension de l’écrit — A) Étude du texte : Plaidoyer et rhétorique de la persuasion (6 pts)',
		curriculumLessonId: 'fre_lesson_2as_le_t2_convaincre_persuader',
		defaultPoints: 6,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			if (variant === 0) {
				const passage = buildFrenchPassageBlock({
					title: 'Plaidoyer pour la maîtrise des langues étrangères au service du rayonnement culturel',
					paragraphs: [
						'Dans un monde où les échanges scientifiques et académiques se multiplient chaque jour, la maîtrise rigoureuse des langues étrangères ne saurait être perçue comme une menace pour l’identité nationale ; elle constitue au contraire une véritable fenêtre ouverte sur le savoir universel. Chaque langue apprise avec sérieux devient un pont solide reliant notre patrimoine intellectuel au reste du monde.',
						'En premier lieu, sur le plan scientifique, les enquêtes universitaires montrent que les chercheurs polyglottes accèdent directement aux publications récentes et contribuent plus efficacement aux débats internationaux. En outre, apprendre une autre syntaxe affine la compréhension de sa propre langue maternelle par comparaison réfléchie. Les logiciels de traduction automatique ont beau progresser chaque année, [[ils]] ne remplaceront jamais la finesse humaine d’un lecteur capable de saisir un sous-entendu ou une nuance culturelle.',
						'Enfin, sur le plan moral et civique, comment faire connaître avec dignité l’histoire de notre pays, l’œuvre de nos savants et la richesse de notre culture sans maîtriser les langues du dialogue international ? S’ouvrir aux langues tout en restant fidèle à ses valeurs, c’est choisir la lucidité plutôt que le repli.'
					],
					source: 'D’après une conférence universitaire sur le plurilinguisme en Algérie (texte adapté)',
					glossary: [
						{ term: 'polyglotte', meaning: 'qui parle et maîtrise plusieurs langues étrangères' },
						{ term: 'repli', meaning: 'attitude consistant à se refermer sur soi-même en refusant l’échange' }
					]
				});

				const content: ContentBlock[] = [
					passage,
					{
						type: 'text',
						content:
							'1. Quelle thèse l’auteur défend-il dans ce plaidoyer et quelle crainte ou thèse adverse écarte-t-il dès l’introduction ?',
						answer:
							'Thèse défendue : la maîtrise rigoureuse des langues étrangères est un atout scientifique, linguistique et culturel au service du rayonnement national. Thèse adverse écartée : l’idée que les langues étrangères menaceraient l’identité nationale.',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'2. Relevez dans le texte un argument visant à convaincre (raison/études) et un argument éthique/civique visant à persuader.',
						answer:
							'Convaincre (logique / autorité scientifique) : les enquêtes universitaires montrent que les chercheurs polyglottes accèdent directement aux publications récentes et contribuent aux débats internationaux (ou l’affinement de la langue maternelle par comparaison). | Persuader (éthique / civique) : faire connaître avec dignité l’histoire du pays, l’œuvre de nos savants et notre culture dans le dialogue international.',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'3. Identifiez les deux figures de style présentes dans :\n  a) « Chaque langue apprise avec sérieux devient un pont solide » (§1).\n  b) « c’est choisir la lucidité plutôt que le repli » (§3).\nPrécisez brièvement l’effet de l’une d’elles.',
						answer:
							'a) Métaphore (sans outil de comparaison). | b) Antithèse (lucidité / repli). | Effet : la métaphore valorise la langue comme lien d’échange entre cultures ; l’antithèse souligne la supériorité morale et intellectuelle de l’ouverture réfléchie.',
						mark: '2.0'
					},
					{
						type: 'text',
						content:
							'4. Quelle relation logique exprime « ont beau progresser » (§2) et à quoi renvoie le pronom souligné « ils » (§2) ?',
						answer:
							'« ont beau progresser » exprime la concession (suivie d’une réfutation). « ils » renvoie aux logiciels de traduction automatique.',
						mark: '1.0'
					}
				];

				const mcq = buildUniqueMcqOptions(
					'Elle combine une concession élégante (« ont beau progresser ») avec une réfutation prouvant la supériorité de la compréhension humaine des nuances',
					[
						{
							text: 'Elle prouve que les traducteurs automatiques rendent l’apprentissage des langues inutile',
							diagnosticFeedback: 'خطأ: بل يدحض الكاتب هذه الفكرة مؤكداً عجز البرامج عن إدراك الدقائق الثقافية.'
						},
						{
							text: 'Elle exprime une cause négative à l’aide de « à cause de »',
							diagnosticFeedback: 'خطأ: البنية « avoir beau + infinitif » تعبر عن الاستدراك والدحض (Concession).'
						},
						{
							text: 'Elle adopte un ton purement familier et ironique',
							diagnosticFeedback: 'خطأ: نبرة النص رصينة تعليمية وإقناعية راقية.'
						}
					],
					rng
				);

				return {
					templateId: this.id,
					seed,
					grade: '2as_le',
					trimesterId: 't2',
					difficulty,
					domain: this.domain,
					titleAr: this.titleAr,
					examRole: 'comprehension',
					quizQuestion: {
						type: 'mcq',
						questionText: 'Quel rôle argumentatif joue la phrase contenant « ont beau progresser » dans le deuxième paragraphe ?',
						questionTextAr: 'ما الدور الحجاجي للجملة التي تتضمن « ont beau progresser » في الفقرة الثانية؟',
						questionData: {
							options: mcq.options,
							correctIndex: mcq.correctIndices[0],
							correctIndices: mcq.correctIndices,
							correctIndexes: mcq.correctIndices
						},
						explanation: 'تُقر العبارة « ont beau + infinitif » بتقدم برامج الترجمة ثم تدحض قدرتها على تعويض الفهم الثقافي البشري.'
					},
					sujetExercise: {
						customTitle: 'I. Compréhension de l’écrit — A) Étude du texte',
						points: 6,
						instruction: 'Lisez attentivement le texte ci-dessous puis répondez aux questions :',
						content
					},
					hints: [
						'ميز بين الحجة العلمية المستندة للدراسات (Convaincre) والحجة الأخلاقية الحضارية (Persuader).',
						'تحقق من غياب أداة التشبيه في « devient un pont solide » لتحديد الصورة البلاغية بدقة.',
						'انتبه لبنية الاستدراك المتقدمة « ont beau + infinitif » في الفقرة الثانية.'
					],
					solutionStepsAr: [
						'تحديد الأطروحة المدافع عنها والأطروحة المرفوضة (1.5 نقطة).',
						'استخراج حجة إقناع عقلي وحجة استمالة أخلاقية (1.5 نقطة).',
						'تحديد الاستعارة والطباق وتفسير الأثر البلاغي (2.0 نقطة).',
						'بيان قيمة الاستدراك وتحديد عائد « ils » (1.0 نقطة).'
					],
					finalAnswer: 'Étude du texte (6 pts) : Plaidoyer plurilinguisme ; convaincre vs persuader ; métaphore + antithèse ; concession « avoir beau » + ils.'
				};
			}

			const passage = buildFrenchPassageBlock({
				title: 'Plaidoyer pour l’école exigeante et le goût de l’effort intellectuel',
				paragraphs: [
					'Face à une culture de l’instantané qui promet des résultats immédiats sans travail durable, il est urgent de réhabiliter la valeur formatrice de l’effort intellectuel. L’école exigeante n’est pas un obstacle à l’épanouissement des jeunes : elle est la boussole qui oriente l’élève vers l’autonomie véritable.',
					'D’une part, la psychologie de l’apprentissage démontre que la mémoire profonde se construit par la reprise patiente, l’exercice régulier et la confrontation aux difficultés. Quels que soient les outils pédagogiques modernes employés en classe, aucun savoir solide ne s’acquiert dans la passivité. D’autre part, Cheikh Abdelhamid Ben Badis rappelait déjà à la jeunesse algérienne que la dignité d’une nation repose sur l’instruction sérieuse et la persévérance morale.',
					'Certes, la facilité séduit sur le moment ; toutefois, [[elle]] laisse l’esprit démuni devant les défis de la vie adulte. Choisissons donc une pédagogie bienveillante mais rigoureuse, car la rigueur élève tandis que la complaisance affaiblit.'
				],
				source: 'D’après une tribune pédagogique algérienne (texte adapté)',
				glossary: [
					{ term: 'réhabiliter', meaning: 'rendre son estime et sa juste valeur à une principe ou une vertu' },
					{ term: 'complaisance', meaning: 'indulgence excessive qui dispense de tout effort nécessaire' }
				]
			});

			const content: ContentBlock[] = [
				passage,
				{
					type: 'text',
					content:
						'1. Quelle est la thèse défendue dans ce plaidoyer et quelle tendance contemporaine critique-t-elle dès la première phrase ?',
					answer:
						'Thèse : il faut réhabiliter l’effort intellectuel et une école exigeante mais bienveillante, seule voie vers l’autonomie véritable. Tendance critiquée : la culture de l’instantané qui promet des résultats immédiats sans travail durable.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'2. Relevez dans le deuxième paragraphe :\n  a) Un argument scientifique (convaincre).\n  b) Un argument d’autorité historique et morale (persuader).',
					answer:
						'a) Argument scientifique : la psychologie de l’apprentissage démontre que la mémoire profonde se construit par la reprise patiente et l’exercice régulier.\n  b) Argument d’autorité : la référence à Cheikh Abdelhamid Ben Badis rappelant que la dignité d’une nation repose sur l’instruction sérieuse et la persévérance morale.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3. Nommez les figures de style dans :\n  a) « elle est la boussole qui oriente l’élève » (§1).\n  b) « la rigueur élève tandis que la complaisance affaiblit » (§3).\nQuelle tonalité dominante (didactique ou polémique) caractérise l’ensemble du texte ?',
					answer:
						'a) Métaphore. | b) Antithèse. | Tonalité dominante : didactique et élogieuse/engagée (elle enseigne calmement la valeur de l’effort avec des arguments structurés et sans agressivité polémique).',
					mark: '2.0'
				},
				{
					type: 'text',
					content:
						'4. Quelle valeur exprime la tournure « Quels que soient » (§2) et à quoi renvoie « elle » (§3) ?',
					answer:
						'« Quels que soient » (+ subjonctif) exprime la concession. « elle » renvoie à la facilité.',
					mark: '1.0'
				}
			];

			const mcq = buildUniqueMcqOptions(
				'Un argument d’autorité historique et éthique renforçant la légitimité morale de l’instruction sérieuse',
				[
					{
						text: 'Une antiphrase ironique destinée à ridiculiser l’école',
						diagnosticFeedback: 'خطأ: الاستشهاد بالشيخ عبد الحميد بن باديس جاد وتكريمي يدعم الأطروحة.'
					},
					{
						text: 'Un contre-argument que l’auteur rejette ensuite',
						diagnosticFeedback: 'خطأ: هذه الحجة تؤيد موقف الكاتب بالكامل.'
					},
					{
						text: 'Une simple définition grammaticale de la complaisance',
						diagnosticFeedback: 'خطأ: هو استشهاد بمرجعية علمية وتاريخية (Argument d’autorité).'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Quel type d’argument représente la référence à Cheikh Abdelhamid Ben Badis dans le deuxième paragraphe ?',
					questionTextAr: 'ما نوع الحجة التي تمثلها الإحالة إلى الشيخ عبد الحميد بن باديس في الفقرة الثانية؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'الاستناد إلى شخصية علمية وتاريخية مرموقة كالشيخ عبد الحميد بن باديس يمثل حجة مرجعية وأخلاقية (Argument d’autorité).'
				},
				sujetExercise: {
					customTitle: 'I. Compréhension de l’écrit — A) Étude du texte',
					points: 6,
					instruction: 'Lisez attentivement le texte ci-dessous puis répondez aux questions :',
					content
				},
				hints: [
					'تتبع الرابطين « D’une part » و « D’autre part » في الفقرة الثانية لتمييز الحجتين.',
					'ميز بين الاستعارة في الفقرة الأولى (boussole) والطباق في الجملة الأخيرة.',
					'لاحظ هدوء الأسلوب ووضوح الاستدلال لتحديد النبرة التعليمية (Didactique).'
				],
				solutionStepsAr: [
					'تحديد الأطروحة والظاهرة المنتقدة في المقدمة (1.5 نقطة).',
					'استخراج الحجة العلمية وحجة المرجعية التاريخية (1.5 نقطة).',
					'تحليل الاستعارة والطباق وتحديد النبرة الغالبة (2.0 نقطة).',
					'تحديد قيمة « Quels que soient » وعائد « elle » (1.0 نقطة).'
				],
				finalAnswer: 'Étude du texte (6 pts) : Plaidoyer école exigeante ; argument scientifique + autorité ; métaphore + antithèse + tonalité didactique ; concession + elle.'
			};
		}
	},
	{
		id: 'fre_tpl_2as_le_t2_comp_requisitoire_critique',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'comprehension_ecrit',
		titleAr: 'I. Compréhension de l’écrit — A) Étude du texte : Réquisitoire, implicite et tonalité polémique (6 pts)',
		curriculumLessonId: 'fre_lesson_2as_le_t2_implicite_tonalites',
		defaultPoints: 6,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			if (variant === 0) {
				const passage = buildFrenchPassageBlock({
					title: 'Réquisitoire contre la surcharge numérique et l’appauvrissement de la langue écrite',
					paragraphs: [
						'Un véritable déluge de notifications et de messages abrégés submerge désormais le quotidien des adolescents. Quel progrès admirable que de réduire la richesse d’une phrase nuancée à trois syllabes tronquées ! Il est temps de dénoncer lucidement cette dérive qui menace la clarté de notre expression écrite.',
						'D’abord, l’habitude d’écrire à toute vitesse sans ponctuation ni accords finit par altérer les réflexes orthographiques indispensables dans les études supérieures. L’inattention glisse d’un simple message privé au cahier de classe, puis jusqu’à la copie d’examen. En outre, certains lycéens ont enfin cessé de confondre rapidité et précision lorsqu’ils ont constaté que leurs copies perdaient des points essentiels faute de syntaxe correcte.',
						'En dépit de l’utilité évidente des outils numériques bien maîtrisés, laisser la langue se dégrader par paresse est inacceptable. Car une langue appauvrie rétrécit la pensée elle-même, alors qu’une langue soignée libère l’intelligence. Défendons donc [[notre]] rigueur linguistique avec fierté !'
					],
					source: 'D’après un essai critique sur les pratiques d’écriture contemporaines (texte adapté)',
					glossary: [
						{ term: 'tronquée', meaning: 'coupée, amputée d’une partie de ses lettres ou de son sens' },
						{ term: 'dérive', meaning: 'évolution négative qui s’éloigne des bonnes pratiques' }
					]
				});

				const content: ContentBlock[] = [
					passage,
					{
						type: 'text',
						content:
							'1. Quelle est la tonalité dominante de ce réquisitoire ? Justifiez votre réponse à l’aide de deux indices textuels précis (dont une antiphrase ironique).',
						answer:
							'Tonalité polémique (critique et engagée). Indices : l’antiphrase ironique « Quel progrès admirable que de réduire la richesse d’une phrase nuancée à trois syllabes tronquées ! », le lexique péjoratif (« dérive », « paresse », « inacceptable »), l’hyperbole (« déluge ») et les phrases exclamatives.',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'2. Relevez dans le texte :\n  a) Une hyperbole métaphorique (§1) et une gradation (§2).\n  b) Un présupposé porté par la phrase : « certains lycéens ont enfin cessé de confondre rapidité et précision » (§2).',
						answer:
							'a) Hyperbole métaphorique : « Un véritable déluge de notifications ». | Gradation : « glisse d’un simple message privé au cahier de classe, puis jusqu’à la copie d’examen ».\n  b) Présupposé (porté par « ont enfin cessé de ») : auparavant, ces lycéens confondaient effectivement la rapidité et la précision, et il était temps qu’ils arrêtent.',
						mark: '2.0'
					},
					{
						type: 'text',
						content:
							'3. Montrez comment l’auteur introduit une nuance concessive au troisième paragraphe, puis identifiez la figure de style dans : « une langue appauvrie rétrécit la pensée elle-même, alors qu’une langue soignée libère l’intelligence ».',
						answer:
							'Concession : « En dépit de l’utilité évidente des outils numériques bien maîtrisés » (préposition + GN). | Figure de style : Antithèse (appauvrie/soignée ; rétrécit/libère).',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'4. Quelle valeur possède le déterminant « notre » (§3) et quelle est la visée communicative du texte ?',
						answer:
							'« notre » est un possessif inclusif (impliquant l’auteur et les lecteurs dans une responsabilité partagée). Visée communicative : alerter et persuader les jeunes de préserver la qualité et la rigueur de leur langue écrite.',
						mark: '1.0'
					}
				];

				const mcq = buildUniqueMcqOptions(
					'Ces lycéens confondaient auparavant la rapidité avec la précision',
					[
						{
							text: 'Ces lycéens n’ont jamais commis aucune faute de syntaxe',
							diagnosticFeedback: 'خطأ: الفعل « ont cessé de » يفترض حتماً أنهم كانوا يقعون في ذلك الخطأ سابقاً.'
						},
						{
							text: 'Les examens n’évaluent plus du tout l’orthographe',
							diagnosticFeedback: 'خطأ: بل يشير النص إلى فقدان نقاط أساسية بسبب الأخطاء النحوية.'
						},
						{
							text: 'L’auteur recommande d’écrire uniquement par abréviations',
							diagnosticFeedback: 'خطأ: النص تنديد صارم ضد الاختصارات المشوِّهة للغة.'
						}
					],
					rng
				);

				return {
					templateId: this.id,
					seed,
					grade: '2as_le',
					trimesterId: 't2',
					difficulty,
					domain: this.domain,
					titleAr: this.titleAr,
					examRole: 'comprehension',
					quizQuestion: {
						type: 'mcq',
						questionText: 'Quel présupposé se déduit linguistiquement de : « certains lycéens ont enfin cessé de confondre rapidité et précision » ?',
						questionTextAr: 'ما الافتراض المسبق (Présupposé) الذي نستنتجه لغوياً من عبارة « ont enfin cessé de confondre »؟',
						questionData: {
							options: mcq.options,
							correctIndex: mcq.correctIndices[0],
							correctIndices: mcq.correctIndices,
							correctIndexes: mcq.correctIndices
						},
						explanation: 'الفعل « cesser de » والظرف « enfin » يفترضان مسبقاً استمرار ذلك السلوك في الماضي قبل التوقف عنه.'
					},
					sujetExercise: {
						customTitle: 'I. Compréhension de l’écrit — A) Étude du texte',
						points: 6,
						instruction: 'Lisez attentivement ce réquisitoire puis répondez aux questions :',
						content
					},
					hints: [
						'لاحظ الجملة التعجبية التهكمية في الفقرة الأولى (« Quel progrès admirable... ! ») لتبرير النبرة السجالية.',
						'انتبه للانتقال التصاعدي في الفقرة الثانية: رسالة خاصة -> كراس القسم -> ورقة الامتحان.',
						'في السؤال الثاني ب، ركز على دلالة الفعل « ont cessé de » لاستخراج الافتراض المسبق.'
					],
					solutionStepsAr: [
						'تحديد النبرة السجالية وتبريرها بالتهكم والمعجم القدحي (1.5 نقطة).',
						'استخراج المبالغة والتدرج والافتراض المسبق بدقة (2.0 نقطة).',
						'تحديد الاستدراك بـ « En dépit de » والطباق في الفقرة الثالثة (1.5 نقطة).',
						'تحديد قيمة « notre » الشامل والغاية التواصلية (1.0 نقطة).'
					],
					finalAnswer: 'Étude du texte (6 pts) : Tonalité polémique + antiphrase ; hyperbole + gradation + présupposé ; En dépit de + antithèse ; notre inclusif.'
				};
			}

			const passage = buildFrenchPassageBlock({
				title: 'Réquisitoire contre l’indifférence écologique et le saccage des espaces verts urbains',
				paragraphs: [
					'Dans plusieurs quartiers en pleine expansion, des parcs ombragés disparaissent peu à peu sous des montagnes de gravats et de béton gris. Quelle brillante réussite urbanistique que de priver nos enfants d’arbres centenaires pour gagner quelques places de stationnement ! Ce saccage silencieux exige une réaction civique immédiate.',
					'En effet, les espaces verts ne sont pas un luxe décoratif : ils sont les poumons indispensables de la cité. Ils rafraîchissent l’atmosphère estivale, filtrent les poussières urbaines et apaisent le stress quotidien des habitants. Lorsque l’on néglige un jardin public, l’herbe jaunit, les bancs se dégradent, puis tout le quartier perd son âme conviviale. Heureusement, quelques associations de jeunes ont de nouveau lancé des campagnes de reboisement exemplaires.',
					'Bien que la croissance démographique impose de construire des logements, rien ne justifie la destruction aveugle des arbres. Préserver la nature en ville, ce n’est pas freiner le développement ; c’est protéger [[notre]] santé et honorer le dépôt confié aux générations présentes.'
				],
				source: 'D’après une tribune citoyenne pour l’environnement urbain (texte adapté)',
				glossary: [
					{ term: 'gravats', meaning: 'débris de pierre, de plâtre ou de béton provenant d’un chantier' },
					{ term: 'reboisement', meaning: 'action de replanter des arbres dans un espace dégarni ou urbain' }
				]
			});

			const content: ContentBlock[] = [
				passage,
				{
					type: 'text',
					content:
						'1. Quelle est la tonalité dominante de ce texte ? Relevez une antiphrase ironique (§1) et deux termes péjoratifs qui la justifient.',
					answer:
						'Tonalité polémique et engagée. Antiphrase ironique : « Quelle brillante réussite urbanistique que de priver nos enfants d’arbres centenaires pour gagner quelques places de stationnement ! ». Termes péjoratifs : « saccage silencieux », « béton gris », « destruction aveugle » (deux au choix).',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'2. Relevez dans le texte :\n  a) Une hyperbole (§1), une métaphore (§2) et une gradation (§2).\n  b) Le présupposé de la phrase : « quelques associations de jeunes ont de nouveau lancé des campagnes de reboisement » (§2).',
					answer:
						'a) Hyperbole : « des montagnes de gravats » ; Métaphore : « ils sont les poumons indispensables de la cité » ; Gradation : « l’herbe jaunit, les bancs se dégradent, puis tout le quartier perd son âme conviviale ».\n  b) Présupposé (porté par « de nouveau ») : des campagnes de reboisement avaient déjà été organisées auparavant, puis interrompues.',
					mark: '2.0'
				},
				{
					type: 'text',
					content:
						'3. Relevez dans le troisième paragraphe la proposition concessive, précisez le mode du verbe qui y figure et reformulez la nuance apportée par l’auteur.',
					answer:
						'Concessive : « Bien que la croissance démographique impose de construire des logements ». Mode : Subjonctif présent (« impose »). Nuance : l’auteur reconnaît le besoin réel de logements mais refuse qu’il serve de prétexte à la destruction des arbres.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4. À qui renvoie « notre » (§3) et quelle est la visée communicative de ce réquisitoire ?',
					answer:
						'« notre » est inclusif et renvoie à l’ensemble des citoyens (auteur et lecteurs). Visée communicative : dénoncer la disparition des espaces verts et mobiliser les citoyens pour protéger et replanter les arbres en ville.',
					mark: '1.0'
				}
			];

			const mcq = buildUniqueMcqOptions(
				'Une métaphore soulignant le rôle biologique vital des espaces verts pour la respiration et la santé de la ville',
				[
					{
						text: 'Une simple comparaison comportant l’outil « comme »',
						diagnosticFeedback: 'خطأ: لا توجد أداة تشبيه في « ils sont les poumons » فهي استعارة.'
					},
					{
						text: 'Une antiphrase ironique critiquant les parcs publics',
						diagnosticFeedback: 'خطأ: بالعكس، العبارة تثمّن الدور الحيوي للحدائق بجدية تامة.'
					},
					{
						text: 'Une définition médicale des maladies respiratoires',
						diagnosticFeedback: 'خطأ: استعمال كلمة « poumons » هنا مجازي استعاري عن المدينة.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Quelle analyse exacte correspond à l’expression « ils sont les poumons indispensables de la cité » (§2) ?',
					questionTextAr: 'ما التحليل البلاغي الدقيق لعبارة « ils sont les poumons indispensables de la cité »؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'إنها استعارة (Métaphore) دون أداة تشبيه تشبه المساحات الخضراء بالرئتين لإبراز أهميتها الحيوية.'
				},
				sujetExercise: {
					customTitle: 'I. Compréhension de l’écrit — A) Étude du texte',
					points: 6,
					instruction: 'Lisez attentivement ce réquisitoire puis répondez aux questions :',
					content
				},
				hints: [
					'تأمل الجملة التعجبية الساخرة في الفقرة الأولى لاستخراج التهكم (Antiphrase).',
					'استخرج الصور الثلاث في الفقرتين الأولى والثانية: المبالغة (montagnes)، الاستعارة (poumons)، والتدرج.',
					'انتبه إلى « de nouveau » لتحديد الافتراض المسبق وإلى « Bien que » لتحديد الاستدراك.'
				],
				solutionStepsAr: [
					'تحديد النبرة السجالية واستخراج التهكم والمعجم القدحي (1.5 نقطة).',
					'استخراج المبالغة والاستعارة والتدرج والافتراض المسبق (2.0 نقطة).',
					'تحليل الاستدراك في الفقرة الثالثة وصيغة Subjonctif (1.5 نقطة).',
					'تحديد قيمة « notre » والغاية التواصلية (1.0 نقطة).'
				],
				finalAnswer: 'Étude du texte (6 pts) : Tonalité polémique + antiphrase ; hyperbole + métaphore + gradation + présupposé ; Bien que (Subj.) ; notre inclusif.'
			};
		}
	},
	{
		id: 'fre_tpl_2as_le_t2_exp_concession_implicite',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'grammaire_syntaxe',
		titleAr: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue : Concession avancée, implicite et tonalités (6 pts)',
		curriculumLessonId: 'fre_lesson_2as_le_t2_concession_refutation',
		defaultPoints: 6,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const argTable = buildFrenchClassificationTableBlock(
				variant === 0
					? {
							columns: [
								{
									header: 'Stratégie : Convaincre (Raison)',
									items: ['Enquêtes statistiques', 'Lien logique de cause à effet'],
									mark: '0.75'
								},
								{
									header: 'Stratégie : Persuader (Valeurs)',
									items: ['Question rhétorique', 'Lexique éthique et métaphores'],
									mark: '0.75'
								}
							]
						}
					: {
							columns: [
								{
									header: 'Tonalité didactique',
									items: ['Définitions précises', 'Conseils structurés et calmes'],
									mark: '0.75'
								},
								{
									header: 'Tonalité polémique',
									items: ['Antiphrase ironique', 'Lexique fortement péjoratif'],
									mark: '0.75'
								}
							]
						}
			);

			const itemDisplay =
				variant === 0
					? '(Question rhétorique | Enquêtes statistiques | Lexique éthique et métaphores | Lien logique de cause à effet)'
					: '(Antiphrase ironique | Définitions précises | Lexique fortement péjoratif | Conseils structurés et calmes)';

			const grammarPrompt =
				variant === 0
					? '2. Réécrivez les phrases suivantes en appliquant rigoureusement la structure concessive imposée :\n  a) Bien que les applications traduisent très vite, elles ignorent les nuances culturelles. (Transformez avec « avoir beau »).\n  b) Bien que le débat soit passionné, les interlocuteurs conservent leur calme. (Transformez avec « En dépit de »).\n  c) Complétez correctement : « ...... (Quel / Quels) que soient les défis linguistiques, la persévérance finit par triompher, ...... (quoique / quoi que) les débuts paraissent ardus. »'
					: '2. Réécrivez les phrases suivantes en appliquant rigoureusement la structure concessive imposée :\n  a) Bien que certains vantent la facilité immédiate, seul l’effort régulier forge l’esprit critique. (Transformez avec « avoir beau »).\n  b) Malgré la densité des constructions urbaines, les municipalités doivent préserver les jardins. (Transformez avec « Bien que » + subjonctif).\n  c) Complétez correctement : « ...... (Quelle / Quelles) que soient les excuses avancées, rien ne justifie le gaspillage, ...... (quoique / quoi que) l’on prétende. »';

			const grammarAnswer =
				variant === 0
					? 'a) Les applications ont beau traduire très vite, elles ignorent les nuances culturelles.\n  b) En dépit de la passion du débat (ou : du caractère passionné du débat), les interlocuteurs conservent leur calme.\n  c) Quels que soient les défis linguistiques, la persévérance finit par triompher, quoique les débuts paraissent ardus.'
					: 'a) Certains ont beau vanter la facilité immédiate, seul l’effort régulier forge l’esprit critique.\n  b) Bien que les constructions urbaines soient denses, les municipalités doivent préserver les jardins.\n  c) Quelles que soient les excuses avancées, rien ne justifie le gaspillage, quoi que l’on prétende.';

			const implicitePrompt =
				variant === 0
					? '3. Dégagez le présupposé exact de la phrase suivante, puis transformez-la en antiphrase ironique :\n  a) Présupposé : « Cet élève relit enfin attentivement ses productions écrites avant de les rendre. »\n  b) Antiphrase : « Écrire un essai plein d’abréviations familières est une faute grave. »'
					: '3. Dégagez le présupposé exact de la phrase suivante, puis identifiez le sous-entendu de la seconde :\n  a) Présupposé : « Le quartier entretient de nouveau son jardin municipal. »\n  b) Sous-entendu (dans une salle d’étude bruyante) : « Il est vraiment difficile de se concentrer avec ce vacarme ! »';

			const impliciteAnswer =
				variant === 0
					? 'a) Présupposé (porté par « enfin ») : auparavant, cet élève ne relisait pas attentivement ses productions écrites.\n  b) Antiphrase ironique : « Quelle brillante méthode que de truffer son essai d’abréviations familières ! » (toute formulation ironique pertinente est acceptée).'
					: 'a) Présupposé (porté par « de nouveau ») : le quartier entretenait déjà ce jardin auparavant, puis l’entretien s’était interrompu.\n  b) Sous-entendu : le locuteur invite poliment les personnes présentes à baisser la voix et faire silence.';

			const content: ContentBlock[] = [
				{
					type: 'text',
					content: `1. Classez les quatre procédés suivants dans le tableau ci-dessous : ${itemDisplay}`,
					mark: ''
				},
				argTable,
				{
					type: 'text',
					content: grammarPrompt,
					answer: grammarAnswer,
					mark: '3.0'
				},
				{
					type: 'text',
					content: implicitePrompt,
					answer: impliciteAnswer,
					mark: '1.5'
				}
			];

			const mcq =
				variant === 0
					? buildUniqueMcqOptions(
							'Les applications ont beau traduire très vite, elles ignorent les nuances culturelles.',
							[
								{
									text: 'Les applications ont beaux traduire très vite, elles ignorent les nuances culturelles.',
									diagnosticFeedback: 'خطأ: كلمة « beau » في هذه البنية تبقى ثابتة دائماً لا تُجمع.'
								},
								{
									text: 'Les applications ont beau qu’elles traduisent très vite, elles ignorent les nuances culturelles.',
									diagnosticFeedback: 'خطأ: التركيب « avoir beau » يتبعه المصدر مباشرة (traduire) دون « que ».'
								},
								{
									text: 'Les applications ont beau traduit très vite, elles ignorent les nuances culturelles.',
									diagnosticFeedback: 'خطأ: يتبع « avoir beau » المصدر (traduire) لا اسم المفعول (traduit).'
								}
							],
							rng
						)
					: buildUniqueMcqOptions(
							'Quelles que soient les excuses avancées, rien ne justifie le gaspillage, quoi que l’on prétende.',
							[
								{
									text: 'Quel que soient les excuses avancées, rien ne justifie le gaspillage, quoique l’on prétende.',
									diagnosticFeedback: 'خطأ: « excuses » مؤنث جمع (Quelles)، و « مهما ادعى الناس » تُكتب « quoi que » في كلمتين.'
								},
								{
									text: 'Quelles que sont les excuses avancées, rien ne justifie le gaspillage, quoi que l’on prétende.',
									diagnosticFeedback: 'خطأ: يجب تصريف « être » في Subjonctif (soient) لا Indicatif (sont).'
								},
								{
									text: 'Quelque soient les excuses avancées, rien ne justifie le gaspillage, quoi que l’on prétende.',
									diagnosticFeedback: 'خطأ: تكتب « Quelles que » في كلمتين وتطابق الاسم المؤنث الجمع.'
								}
							],
							rng
						);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Choisissez la phrase concessive de niveau 2AS LE ne comportant aucune faute de syntaxe ni d’orthographe :',
					questionTextAr: 'اختر جملة الاستدراك الراقية الخالية تماماً من أخطاء النحو والإملاء:',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation:
						variant === 0
							? 'تتطلب البنية « avoir beau + Infinitif » إبقاء « beau » ثابتة دون جمع وتلاوة المصدر مباشرة بلا « que ».'
							: 'تطابق « Quelles » الاسم المؤنث الجمع « excuses » مع Subjonctif (soient)، وتكتب « quoi que » في كلمتين بمعنى « مهما كان الشيء الذي ».'
				},
				sujetExercise: {
					customTitle: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue',
					points: 6,
					instruction: 'Traitez les exercices suivants sur la concession avancée, les tonalités et l’implicite :',
					content
				},
				hints: [
					'تذكر: « beau » ثابتة في « avoir beau + Infinitif » ولا يصح إدراج « que » بعدها.',
					'فرق بين « quoique » (= bien que) و « quoi que » (= quelle que soit la chose que).',
					'اربط استخراج الافتراض المسبق بالمؤشر اللغوي الصريح (enfin / de nouveau).'
				],
				solutionStepsAr: [
					'تصنيف الوسائل الأربع في جدول الاستراتيجيات أو النبرات (1.5 نقطة).',
					'إنجاز التحويلات الثلاثة المتقدمة للاستدراك (3.0 نقاط).',
					'استخراج الافتراض المسبق وصياغة/تحليل المعنى الضمني (1.5 نقطة).'
				],
				finalAnswer: 'Fonctionnement de la langue (6 pts) : Classification (1.5 pt) + Concession avancée (3.0 pts) + Implicite (1.5 pt).'
			};
		}
	},
	{
		id: 'fre_tpl_2as_le_t2_exp_figures_persuasion',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'discours_rhetorique',
		titleAr: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue : Figures de style et lexique de la persuasion (6 pts)',
		curriculumLessonId: 'fre_lesson_2as_le_t2_figures_style_rhetorique',
		defaultPoints: 6,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const wfTable = buildFrenchWordFamilyTableBlock(
				variant === 0
					? [
							{
								verbe: { given: true, value: 'convaincre' },
								nom: { value: 'conviction', mark: '0.5' },
								adjectif: { value: 'convaincant(e)', mark: '0.5' }
							},
							{
								verbe: { value: 'réfuter', mark: '0.5' },
								nom: { given: true, value: 'réfutation' },
								adjectif: { value: 'réfutable / irréfutable', mark: '0.5' }
							}
						]
					: [
							{
								verbe: { given: true, value: 'persuader' },
								nom: { value: 'persuasion', mark: '0.5' },
								adjectif: { value: 'persuasif(ve)', mark: '0.5' }
							},
							{
								verbe: { value: 'concéder', mark: '0.5' },
								nom: { given: true, value: 'concession' },
								adjectif: { value: 'concessif(ve)', mark: '0.5' }
							}
						]
			);

			const figPrompt =
				variant === 0
					? '2. Identifiez la figure de style dans chaque énoncé (métaphore, comparaison, antithèse, hyperbole, gradation) et commentez brièvement l’effet de la première :\n  a) Les bibliothèques sont des phares qui éclairent la jeunesse.\n  b) Un océan de messages inutiles noie parfois l’information sérieuse.\n  c) La rigueur construit, la négligence détruit.\n  d) Cette faute gêne, choque, puis révolte tout l’auditoire.'
					: '2. Identifiez la figure de style dans chaque énoncé (métaphore, comparaison, antithèse, hyperbole, gradation) et commentez brièvement l’effet de la première :\n  a) La maîtrise d’une langue étrangère agit comme une clé ouvrant de nouveaux savoirs.\n  b) Le livre est un jardin intérieur où germent les idées justes.\n  c) Des montagnes de plastique menacent la beauté du littoral.\n  d) Le savoir libère l’esprit tandis que l’ignorance l’enchaîne.';

			const figAnswer =
				variant === 0
					? 'a) Métaphore (sans outil) — Effet : souligne la fonction de guide lumineux et d’orientation intellectuelle des bibliothèques.\n  b) Hyperbole (métaphorique : « un océan de »).\n  c) Antithèse (rigueur/négligence ; construit/détruit).\n  d) Gradation ascendante (gêne, choque, révolte).'
					: 'a) Comparaison explicite (outil « comme ») — Effet : rend concret le rôle d’ouverture intellectuelle d’une langue.\n  b) Métaphore (sans outil).\n  c) Hyperbole (« des montagnes de plastique »).\n  d) Antithèse (savoir/ignorance ; libère/enchaîne).';

			const synthPrompt =
				variant === 0
					? '3. Reformulez cette phrase neutre en lui donnant une force persuasive à l’aide d’une antithèse ou d’une métaphore, puis relevez un connecteur de transition de niveau soutenu : « Lire régulièrement aide les élèves à mieux écrire. »'
					: '3. Reformulez cette phrase neutre en lui donnant une force persuasive à l’aide d’une question rhétorique ou d’une gradation, puis proposez deux connecteurs de clôture de niveau soutenu : « Il faut planter des arbres dans les villes algériennes. »';

			const synthAnswer =
				variant === 0
					? 'Reformulation persuasive (exemples valides) : « La lecture est la sève de l’écriture : lire élève le style tandis que l’inaction l’appauvrit. » | Connecteur soutenu : Par ailleurs, En outre, Force est de constater que, Néanmoins.'
					: 'Reformulation persuasive (exemples valides) : « Pouvons-nous laisser nos villes suffoquer sous le béton alors que chaque arbre planté rafraîchit, embellit et protège toute une génération ? » | Connecteurs de clôture : En définitive, En somme, Somme toute, Dès lors.';

			const content: ContentBlock[] = [
				{
					type: 'text',
					content: '1. Complétez le tableau de dérivation du lexique de l’argumentation :',
					mark: ''
				},
				wfTable,
				{
					type: 'text',
					content: figPrompt,
					answer: figAnswer,
					mark: '2.5'
				},
				{
					type: 'text',
					content: synthPrompt,
					answer: synthAnswer,
					mark: '1.5'
				}
			];

			const mcq =
				variant === 0
					? buildUniqueMcqOptions(
							'Une métaphore (absence d’outil de comparaison) valorisant le rôle de guide intellectuel des bibliothèques',
							[
								{
									text: 'Une comparaison explicite grâce à l’outil « tel que »',
									diagnosticFeedback: 'خطأ: لا توجد أي أداة تشبيه في « Les bibliothèques sont des phares ».'
								},
								{
									text: 'Une antiphrase ironique critiquant les livres',
									diagnosticFeedback: 'خطأ: الصورة تثمينية إيجابية وجادة تماماً.'
								},
								{
									text: 'Une simple énumération chiffrée',
									diagnosticFeedback: 'خطأ: الجملة تقوم على الاستعارة.'
								}
							],
							rng
						)
					: buildUniqueMcqOptions(
							'Une comparaison explicite (grâce à l’outil « comme ») illustrant concrètement l’ouverture apportée par une langue',
							[
								{
									text: 'Une métaphore dépourvue d’outil de comparaison',
									diagnosticFeedback: 'خطأ: وجود أداة التشبيه « comme » يجعلها تشبيهاً صريحاً (Comparaison).'
								},
								{
									text: 'Une hyperbole exagérant un danger écologique',
									diagnosticFeedback: 'خطأ: لا يوجد تضخيم ولا موضوع بيئي في الجملة (a).'
								},
								{
									text: 'Une anaphore répétée en début de paragraphe',
									diagnosticFeedback: 'خطأ: لا يوجد تكرار صدري هنا.'
								}
							],
							rng
						);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Quelle interprétation stylistique exacte correspond à l’énoncé (a) de l’exercice 2 ?',
					questionTextAr: 'ما التحليل الأسلوبي الدقيق للجملة (a) في التمرين الثاني؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'التفريق الدقيق بين الاستعارة (بلا أداة تشبيه) والتشبيه الصريح (بأداة مثل comme) أساس التحليل البلاغي.'
				},
				sujetExercise: {
					customTitle: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue',
					points: 6,
					instruction: 'Traitez les activités suivantes sur le lexique rhétorique et les figures de persuasion :',
					content
				},
				hints: [
					'تحقق من إملاء المشتقات الصعبة: convaincre -> conviction -> convaincant ; concéder -> concession -> concessif.',
					'تذكر: وجود « comme » = Comparaison؛ غياب الأداة = Métaphore.',
					'في التمرين الثالث احرص على توظيف صورة بلاغية واضحة مع لغة راقية.'
				],
				solutionStepsAr: [
					'إكمال جدول عائلة كلمات الحجاج (2.0 نقطة).',
					'تحديد الصور البلاغية الأربع وتفسير أثر الأولى (2.5 نقطة).',
					'إعادة الصياغة البلاغية واقتراح روابط راقية (1.5 نقطة).'
				],
				finalAnswer: 'Fonctionnement de la langue (6 pts) : Dérivation (2 pts) + 4 figures + commentaire (2.5 pts) + Reformulation persuasive (1.5 pt).'
			};
		}
	},
	{
		id: 'fre_tpl_2as_le_t2_writing_essai_argumentatif',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'production_ecrite',
		titleAr: 'II. Production écrite : Essai argumentatif approfondi ou compte rendu critique (8 pts — format LE)',
		curriculumLessonId: 'fre_lesson_2as_le_t2_essai_argumentatif_le',
		defaultPoints: 8,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const sujetUnPrompt =
				variant === 0
					? 'Rédigez un essai argumentatif approfondi (180 à 220 mots) pour le concours inter-lycées de Langues Étrangères sur le sujet suivant : « Certains pensent que les traducteurs automatiques rendent inutile l’apprentissage approfondi des langues étrangères. Partagez-vous ce point de vue ? »'
					: 'Rédigez un essai argumentatif approfondi (180 à 220 mots) dénonçant la surcharge numérique qui appauvrit la qualité de l’expression écrite chez les jeunes, tout en proposant des pistes réalistes pour concilier outils modernes et rigueur linguistique.';

			const sujetUnNotes =
				variant === 0
					? [
							'Introduction problématisée : amorce actuelle + question problématique + prise de position claire.',
							'Développement (2 paragraphes équilibrés) : 1) Concession tactique sur l’utilité rapide des traducteurs automatiques (Certes / Avoir beau + Infinitif) ; 2) Réfutation solide avec 3 arguments variés (nuances culturelles, formation de la pensée, rayonnement scientifique et patriotique) illustrés d’exemples.',
							'Langue (niveau LE) : emploi d’une subordonnée concessive au subjonctif, d’au moins une figure de style (métaphore ou antithèse) et de transitions soutenues.',
							'Conclusion : synthèse ferme et ouverture réfléchie sur le rôle humaniste des langues.'
						]
					: [
							'Introduction problématisée : constat de la multiplication des messages abrégés + problématique + thèse ferme.',
							'Développement (2 paragraphes équilibrés) : 1) Arguments logiques et d’expérience contre la dégradation orthographique et la fragmentation de l’attention ; 2) Nuance concessive (En dépit de l’utilité des outils numériques...) + propositions concrètes (lecture suivie, relecture attentive, clubs d’écriture).',
							'Langue (niveau LE) : lexique évaluatif précis, modalisateurs, figures de style (gradation, antithèse ou question rhétorique) et connecteurs académiques.',
							'Conclusion : réaffirmation du lien indissociable entre qualité de la langue et clarté de la pensée.'
						];

			const sujetDeuxPrompt =
				variant === 0
					? 'Rédigez le compte rendu critique complet (160 à 200 mots) du plaidoyer intitulé « Plaidoyer pour l’école exigeante et le goût de l’effort intellectuel » en respectant les trois parties réglementaires (accroche, résumé objectif, commentaire critique fond/forme).'
					: 'Dans un monde où l’urbanisation rapide menace parfois les jardins publics, rédigez un essai argumentatif engagé (180 à 220 mots) défendant la préservation des espaces verts urbains comme un devoir civique et moral envers les générations futures.';

			const modelAnswer =
				variant === 0
					? 'À l’heure où les applications de traduction instantanée traduisent un texte en quelques secondes, certains affirment que l’apprentissage exigeant des langues étrangères serait devenu superflu. Une machine peut-elle réellement remplacer la maîtrise vivante d’une langue ? Tout porte à croire que non : l’étude personnelle des langues demeure irremplaçable pour l’intelligence et le dialogue culturel.\n\nCertes, les logiciels numériques ont beau offrir une aide ponctuelle précieuse pour comprendre un document urgent ou un terme technique isolé, ils demeurent aveugles aux subtilités humaines. Une langue n’est pas un simple code mécanique ; elle est le miroir d’une histoire, d’une sensibilité et d’une vision du monde que seul un esprit formé sait interpréter sans contresens.\n\nPar ailleurs, bien que l’apprentissage d’une langue demande des années de persévérance, il forge la discipline intellectuelle, enrichit la langue maternelle par comparaison et permet aux étudiants algériens de porter avec éloquence leur patrimoine scientifique et culturel sur la scène internationale. La traduction automatique dépanne dans l’instant, tandis que la compétence linguistique libère durablement l’esprit.\n\nEn définitive, loin d’être rendues caduques par la technologie, les langues étrangères restent des ponts indispensables entre les peuples. Utilisons les outils numériques avec mesure, sans jamais renoncer à la richesse incomparable du savoir humain.'
					: 'Omniprésents dans la vie quotidienne des lycéens, les téléphones intelligents ont généralisé une écriture précipitée faite d’abréviations et de phrases sans ponctuation. Cette surcharge numérique n’est-elle qu’une mode passagère ou menace-t-elle profondément la maîtrise de la langue écrite ? Force est de constater qu’elle constitue un péril réel qu’il convient d’endiguer par une discipline renouvelée.\n\nEn premier lieu, écrire sans souci des accords ni de la syntaxe affaiblit progressivement la mémoire orthographique. L’habitude de la négligence passe du message instantané au devoir surveillé, puis pénalise gravement l’élève lors des examens décisifs. En outre, ce déluge permanent de notifications fragmente l’attention et habitue l’esprit à survoler les textes au lieu d’en approfondir la logique. Une langue appauvrie rétrécit la pensée, alors qu’une langue rigoureuse éclaire le jugement.\n\nS’il est indéniable que les plateformes numériques facilitent l’accès aux dictionnaires et aux bibliothèques en ligne, il n’en reste pas moins que leur usage exige un cadre conscient. Bien que la technologie évolue sans cesse, rien ne remplace la lecture quotidienne d’ouvrages complets et la relecture attentive de chaque paragraphe rédigé.\n\nEn somme, défendre la qualité de la langue écrite, c’est défendre la clarté de notre pensée et la dignité de notre formation intellectuelle. Faisons des outils modernes des serviteurs de notre culture, jamais les fossoyeurs de notre rigueur !';

			const block = buildFrenchWrittenProductionBlock({
				sujetUnTitle: 'Sujet 1 (Essai argumentatif approfondi — 8 pts LE) :',
				sujetUnPrompt,
				sujetUnNotes,
				sujetDeuxPrompt,
				modelAnswer,
				rubricSummary:
					'Pertinence, problématisation et richesse des arguments/exemples (2.5 pts) | Organisation (4 paragraphes, transitions, concession-réfutation) (2.0 pts) | Maîtrise linguistique avancée (subjonctif, concession, syntaxe, lexique précis) (2.5 pts) | Figures de style, orthographe et présentation (1.0 pt)',
				mark: '8.0'
			});

			const mcq = buildUniqueMcqOptions(
				'Problématiser dès l’introduction, équilibrer concession-réfutation et arguments variés avec des structures soutenues (avoir beau, bien que + subjonctif) et conclure par une synthèse ouverte',
				[
					{
						text: 'Écrire moins de 80 mots sans aucune concession ni exemple concret',
						diagnosticFeedback: 'خطأ: مقال شعبة اللغات (8 نقاط) يتطلب عمقاً فكرياً وتوسعاً متزناً (180-220 كلمة).'
					},
					{
						text: 'Se contenter de recopier des phrases du texte de compréhension',
						diagnosticFeedback: 'خطأ: النسخ يلغي جهد الإنتاج الشخصي ويخفض العلامة بشدة.'
					},
					{
						text: 'Adopter un registre familier et ignorer la ponctuation entre les paragraphes',
						diagnosticFeedback: 'خطأ: مستوى 2AS LE يشترط لغة راقية أو قياسية متقنة وتقسيماً واضحاً للفقرات.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Qu’est-ce qui distingue un essai argumentatif noté 8/8 en 2AS Langues Étrangères ?',
					questionTextAr: 'ما الذي يميز المقال الحجاجي الحائز على 8/8 في شعبة اللغات الأجنبية؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'يتحقق التميز بطرح الإشكالية، وتنويع الحجج العقلية والأخلاقية، وإتقان الاستدراك والدحض بلغة راقية سليمة، وخاتمة جامعة.'
				},
				sujetExercise: {
					customTitle: 'II. Production écrite',
					points: 8,
					instruction: 'Traitez l’UN des deux sujets au choix en respectant la méthodologie de la filière Langues Étrangères :',
					content: [block]
				},
				hints: [
					'خطط لـ 4 فقرات متوازنة (مقدمة بإشكالية + فقرتان للعرض مع استدراك ودحض + خاتمة مفتوحة).',
					'استثمر بنية راقية واحدة على الأقل (avoir beau + Infinitif أو Bien que + Subjonctif أو S’il est indéniable que...).',
					'راقب علامات الترقيم والاتفاقات النحوية وحجم المقال (180 إلى 220 كلمة).'
				],
				solutionStepsAr: [
					'صياغة مقدمة ممهدة تطرح الإشكالية وتعلن الأطروحة.',
					'بناء فقرتي العرض بتدرج مع دمج الاستدراك والدحض وأمثلة ملموسة.',
					'إغلاق المقال بخاتمة تركيبية ومراجعة اللغة والإملاء.'
				],
				finalAnswer: 'Production écrite (8 pts) : Essai argumentatif approfondi (format 2AS LE) avec corrigé modèle et grille de correction.'
			};
		}
	}
];
