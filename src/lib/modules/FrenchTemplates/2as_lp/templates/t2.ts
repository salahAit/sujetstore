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

export const TEMPLATES_2AS_LP_T2: FrenchParameterizedTemplate[] = [
	{
		id: 'fre_tpl_2as_lp_t2_comp_plaidoyer',
		grade: '2as_lp',
		trimesterId: 't2',
		domain: 'comprehension_ecrit',
		titleAr: 'I. Compréhension de l’écrit — A) Étude du texte : Plaidoyer pour les valeurs morales et la lecture (7 pts)',
		curriculumLessonId: 'fre_lesson_2as_lp_t2_structure_argumentative',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			if (variant === 0) {
				const passage = buildFrenchPassageBlock({
					title: 'Plaidoyer pour la lecture approfondie à l’ère des écrans rapides',
					paragraphs: [
						'Aujourd’hui, alors que les messages instantanés et les vidéos brèves accaparent l’attention de la jeunesse, je suis fermement convaincu que la lecture approfondie d’ouvrages sérieux demeure une nécessité vitale. Lire un livre complet n’est pas un passe-temps démodé : c’est la véritable école de la réflexion libre et de la maîtrise linguistique.',
						'D’abord, la lecture régulière forge la patience intellectuelle et enrichit durablement le vocabulaire. En suivant la pensée structurée d’un historien ou d’un savant, l’élève apprend à nuancer son jugement et à formuler des idées claires. Certes, les plateformes numériques offrent un accès immédiat à une multitude d’informations ; cependant, [[elles]] favorisent souvent une consultation superficielle qui fragmente la concentration.',
						'Ensuite, fréquenter les bibliothèques élève l’âme et élargit l’horizon culturel bien au-delà de notre quotidien. Lire, c’est dialoguer avec la sagesse des générations ; lire, c’est s’armer contre la crédulité ; lire, c’est préparer un avenir lucide. Pouvons-nous vraiment abandonner un trésor aussi précieux ? Cultivons dès maintenant le goût du livre !'
					],
					source: 'D’après une tribune éducative algérienne (texte adapté)',
					glossary: [
						{ term: 'accaparer', meaning: 'retenir entièrement pour soi, absorber presque toute l’attention' },
						{ term: 'crédulité', meaning: 'facilité excessive à croire sans vérifier' }
					]
				});

				const content: ContentBlock[] = [
					passage,
					{
						type: 'text',
						content:
							'1. Ce texte est-il un plaidoyer ou un réquisitoire ? Relevez le thème et formulez clairement la thèse défendue par l’auteur.',
						answer:
							'C’est un plaidoyer. Thème : La lecture approfondie (des livres). Thèse : L’auteur soutient que la lecture approfondie demeure une nécessité vitale qui forme la réflexion libre et la maîtrise linguistique.',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'2. Relevez dans le deuxième paragraphe :\n  a) Deux arguments en faveur de la lecture.\n  b) Un contre-argument (concession) et la réfutation que l’auteur lui oppose.',
						answer:
							'a) Arguments : elle forge la patience intellectuelle et enrichit le vocabulaire ; elle apprend à nuancer son jugement et à formuler des idées claires.\n  b) Concession : « Certes, les plateformes numériques offrent un accès immédiat à une multitude d’informations ». Réfutation : « cependant, elles favorisent souvent une consultation superficielle qui fragmente la concentration. »',
						mark: '2.5'
					},
					{
						type: 'text',
						content:
							'3. Relevez dans le troisième paragraphe une anaphore et une question rhétorique, puis précisez l’effet recherché par l’auteur.',
						answer:
							'Anaphore : « Lire, c’est... ; lire, c’est... ; lire, c’est... ». Question rhétorique : « Pouvons-nous vraiment abandonner un trésor aussi précieux ? ». Effet : insister sur la valeur incomparable du livre et impliquer affectivement le lecteur.',
						mark: '2.0'
					},
					{
						type: 'text',
						content:
							'4. À quoi renvoie le pronom « elles » (§2) et quelle est la visée communicative de ce texte ?',
						answer:
							'« elles » renvoie aux plateformes numériques. Visée communicative : convaincre et persuader le lecteur de préserver et cultiver l’habitude de la lecture approfondie.',
						mark: '1.0'
					}
				];

				const mcq = buildUniqueMcqOptions(
					'Certes les plateformes numériques donnent un accès rapide, mais elles fragmentent souvent la concentration par une lecture superficielle',
					[
						{
							text: 'Les plateformes numériques doivent être interdites dans toutes les universités sans exception',
							diagnosticFeedback: 'خطأ: الكاتب يعترف بسرعة الوصول الرقمي لكنه يستدرك بنقد القراءة السطحية.'
						},
						{
							text: 'Les bibliothèques anciennes sont dépassées par les vidéos brèves',
							diagnosticFeedback: 'خطأ: بل يؤكد الكاتب أن الكتاب المطبوع العميق لا غنى عنه.'
						},
						{
							text: 'La lecture de livres complets réduit le vocabulaire des élèves',
							diagnosticFeedback: 'خطأ: الفقرة الثانية تثبت أن القراءة تُثري الرصيد اللغوي.'
						}
					],
					rng
				);

				return {
					templateId: this.id,
					seed,
					grade: '2as_lp',
					trimesterId: 't2',
					difficulty,
					domain: this.domain,
					titleAr: this.titleAr,
					examRole: 'comprehension',
					quizQuestion: {
						type: 'mcq',
						questionText: 'Comment l’auteur réfute-t-il l’argument de la rapidité numérique dans le deuxième paragraphe ?',
						questionTextAr: 'كيف يرد الكاتب على حجة سرعة المنصات الرقمية في الفقرة الثانية؟',
						questionData: {
							options: mcq.options,
							correctIndex: mcq.correctIndices[0],
							correctIndices: mcq.correctIndices,
							correctIndexes: mcq.correctIndices
						},
						explanation: 'يوظف الكاتب بنية الاستدراك والدحض (Certes... cependant) ليقر بسرعة الوصول الرقمي ثم ينبه إلى تشتيت التركيز.'
					},
					sujetExercise: {
						customTitle: 'I. Compréhension de l’écrit — A) Étude du texte',
						points: 7,
						instruction: 'Lisez attentivement le texte ci-dessous puis répondez aux questions :',
						content
					},
					hints: [
						'ميز بين المرافعة (Plaidoyer للدفاع عن قيمة) وعريضة الاتهام (Réquisitoire للتنديد بآفة).',
						'ابحث في الفقرة الثانية عن « Certes... cependant » لاستخراج الاستدراك والرد.',
						'في الفقرة الثالثة لاحظ تكرار « Lire, c’est » والسؤال الختامي ذي الجواب البديهي.'
					],
					solutionStepsAr: [
						'تحديد نوع النص والموضوع والأطروحة (1.5 نقطة).',
						'استخراج حجتين مع الاستدراك والدحض (2.5 نقطة).',
						'استخراج التكرار الصدري والسؤال البلاغي وبيان أثرهما (2.0 نقطة).',
						'تحديد عائد « elles » والغاية التواصلية (1.0 نقطة).'
					],
					finalAnswer: 'Étude du texte (7 pts) : Plaidoyer pour la lecture ; 2 arguments + concession/réfutation ; anaphore + question rhétorique ; elles = plateformes numériques.'
				};
			}

			const passage = buildFrenchPassageBlock({
				title: 'Plaidoyer pour la Touiza et l’entraide de voisinage',
				paragraphs: [
					'Dans nos quartiers urbains modernes où la précipitation quotidienne tend parfois à isoler les familles, nous devons résolument défendre l’esprit ancestral de la Touiza. Cette noble tradition algérienne d’entraide bénévole constitue un rempart précieux contre l’égoïsme et l’indifférence.',
					'En premier lieu, participer ensemble au nettoyage d’une ruelle, à la plantation d’arbres ou au soutien d’une famille en difficulté renforce immédiatement la fraternité. L’individualisme divise les cœurs, tandis que la solidarité unit les voisins autour du bien commun. Bien que la vie professionnelle laisse peu de temps libre, une simple heure consacrée au quartier transforme durablement le cadre de vie.',
					'De plus, la Touiza offre aux jeunes une irremplaçable école de civisme pratique. En voyant leurs aînés œuvrer sans attendre de récompense matérielle, [[ils]] découvrent que la véritable réussite se mesure aussi au service rendu à autrui. Préservons donc cette admirable valeur qui honore notre société !'
				],
				source: 'D’après une chronique citoyenne algérienne (texte adapté)',
				glossary: [
					{ term: 'rempart', meaning: 'protection solide contre un danger ou un fléau' },
					{ term: 'bénévole', meaning: 'accompli librement et gratuitement, sans salaire' }
				]
			});

			const content: ContentBlock[] = [
				passage,
				{
					type: 'text',
					content:
						'1. S’agit-il d’un plaidoyer ou d’un réquisitoire ? Précisez le thème et la thèse de l’auteur.',
					answer:
						'Il s’agit d’un plaidoyer. Thème : La Touiza et l’entraide de voisinage. Thèse : Nous devons défendre et préserver l’esprit de la Touiza car il constitue un rempart contre l’égoïsme et une école de civisme.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'2. Relevez dans le texte :\n  a) Deux arguments défendant la Touiza et un exemple concret d’action bénévole.\n  b) Une phrase contenant une concession introduite par « Bien que ».',
					answer:
						'a) Arguments : elle renforce la fraternité autour du bien commun ; elle offre aux jeunes une école de civisme pratique. Exemples : nettoyage d’une ruelle, plantation d’arbres, soutien d’une famille en difficulté.\n  b) « Bien que la vie professionnelle laisse peu de temps libre, une simple heure consacrée au quartier transforme durablement le cadre de vie. »',
					mark: '2.5'
				},
				{
					type: 'text',
					content:
						'3. Relevez dans le deuxième paragraphe une antithèse et dans l’ensemble du texte deux adjectifs du lexique mélioratif prouvant la subjectivité de l’auteur.',
					answer:
						'Antithèse : « L’individualisme divise les cœurs, tandis que la solidarité unit les voisins » (individualisme/solidarité ; divise/unit). Lexique mélioratif : noble, précieux, irremplaçable, admirable (deux au choix).',
					mark: '2.0'
				},
				{
					type: 'text',
					content:
						'4. À qui renvoie le pronom « ils » (§3) et quelle est la visée communicative du texte ?',
					answer:
						'« ils » renvoie aux jeunes. Visée communicative : convaincre et inciter les citoyens à raviver et préserver la tradition d’entraide (la Touiza).',
					mark: '1.0'
				}
			];

			const mcq = buildUniqueMcqOptions(
				'Une antithèse opposant l’individualisme qui divise à la solidarité qui unit',
				[
					{
						text: 'Une question rhétorique adressée aux architectes de la ville',
						diagnosticFeedback: 'خطأ: لا توجد جملة استفهامية في الفقرة الثانية.'
					},
					{
						text: 'Une définition scientifique objective sans aucun jugement moral',
						diagnosticFeedback: 'خطأ: الجملة حجاجية بلاغية تقابل بين سلوكين متضادين.'
					},
					{
						text: 'Une gradation descendante d’adverbes de temps',
						diagnosticFeedback: 'خطأ: الجملة قائمة على المقابلة الثنائية (Antithèse).'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Quelle figure de style met en relief la phrase : « L’individualisme divise les cœurs, tandis que la solidarité unit les voisins » ?',
					questionTextAr: 'ما الصورة البلاغية البارزة في عبارة التقابل بين الأنانية والتكافل؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'المقابلة بين الأضداد (individualisme/solidarité و divise/unit) تمثل طباقاً (Antithèse).'
				},
				sujetExercise: {
					customTitle: 'I. Compréhension de l’écrit — A) Étude du texte',
					points: 7,
					instruction: 'Lisez attentivement le texte ci-dessous puis répondez aux questions :',
					content
				},
				hints: [
					'لاحظ المعجم التمجيدي القوي في المرافعة: noble, précieux, irremplaçable, admirable.',
					'ابحث عن الجملة المبدوءة بـ « Bien que » في الفقرة الثانية.',
					'تحقق من الطباق بين divise و unit لتفسير أثره الحجاجي.'
				],
				solutionStepsAr: [
					'تحديد نوع النص والموضوع والأطروحة (1.5 نقطة).',
					'استخراج حجتين ومثال وجملة الاستدراك (2.5 نقطة).',
					'استخراج الطباق وصفتين من المعجم المادح (2.0 نقطة).',
					'تعيين عائد « ils » والغاية التواصلية (1.0 نقطة).'
				],
				finalAnswer: 'Étude du texte (7 pts) : Plaidoyer pour la Touiza ; 2 arguments + concession ; antithèse + lexique mélioratif ; ils = les jeunes.'
			};
		}
	},
	{
		id: 'fre_tpl_2as_lp_t2_comp_requisitoire',
		grade: '2as_lp',
		trimesterId: 't2',
		domain: 'comprehension_ecrit',
		titleAr: 'I. Compréhension de l’écrit — A) Étude du texte : Réquisitoire contre un fléau social (7 pts)',
		curriculumLessonId: 'fre_lesson_2as_lp_t2_modalisateurs_subjectivite',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			if (variant === 0) {
				const passage = buildFrenchPassageBlock({
					title: 'Réquisitoire contre le gaspillage alimentaire : un devoir éthique',
					paragraphs: [
						'Chaque année, des tonnes de pain et de denrées encore consommables finissent hélas dans les bennes à ordures, en particulier durant les périodes de grandes réunions familiales. Il est grand temps de dénoncer fermement ce fléau déplorable qui choque autant la conscience morale que la raison économique.',
						'Premièrement, gaspiller la nourriture constitue un manque grave de gratitude envers les bienfaits dont nous jouissons et envers le labeur pénible des agriculteurs. Deuxièmement, [[cet]] excès irresponsable pèse lourdement sur le budget des ménages et aggrave la pollution urbaine par l’accumulation des déchets organiques. Certains prétendent qu’une table surchargée est signe de générosité ; pourtant, la véritable hospitalité réside dans la mesure et le partage avec les plus démunis, jamais dans l’ostentation.',
						'Par conséquent, l’indifférence n’est plus tolérable. Achetons selon nos besoins réels, cuisinons avec modération et apprenons aux enfants le respect du moindre morceau de pain. Combien de familles modestes pourraient être soulagées si nous mettions fin à ce gâchis absurde ?'
					],
					source: 'D’après une campagne de sensibilisation citoyenne (texte adapté)',
					glossary: [
						{ term: 'denrées', meaning: 'produits alimentaires destinés à la consommation' },
						{ term: 'ostentation', meaning: 'fait d’étaler ses richesses de façon excessive pour se faire remarquer' }
					]
				});

				const content: ContentBlock[] = [
					passage,
					{
						type: 'text',
						content:
							'1. Identifiez le type de texte argumentatif (plaidoyer ou réquisitoire) et la thèse dénoncée ou défendue par l’auteur.',
						answer:
							'C’est un réquisitoire. Thèse : L’auteur condamne fermement le gaspillage alimentaire comme un fléau moral, économique et écologique auquel il faut mettre fin par la modération.',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'2. Relevez dans le texte :\n  a) Deux arguments distincts (moral et économique/écologique) avancés par l’auteur.\n  b) La thèse adverse (opinion réfutée) et la réponse de l’auteur (§2).',
						answer:
							'a) Argument moral : manque de gratitude envers les bienfaits et le travail des agriculteurs. Argument économique/écologique : alourdit le budget des ménages et aggrave la pollution par les déchets.\n  b) Thèse adverse : « Certains prétendent qu’une table surchargée est signe de générosité ». Réfutation : « pourtant, la véritable hospitalité réside dans la mesure et le partage avec les plus démunis, jamais dans l’ostentation. »',
						mark: '2.5'
					},
					{
						type: 'text',
						content:
							'3. Relevez quatre indices de subjectivité dans le texte (par exemple : lexique péjoratif, adverbe modalisateur, verbe d’opinion ou impératif inclusif).',
						answer:
							'Exemples valides (quatre au choix) : « hélas » (regret), « fléau déplorable », « excès irresponsable », « gâchis absurde » (lexique péjoratif), « prétendent » (distance critique), « Achetons / cuisinons / apprenons » (impératifs inclusifs), question rhétorique finale.',
						mark: '2.0'
					},
					{
						type: 'text',
						content:
							'4. À quoi renvoie « cet » (§2) et quelle valeur exprime la dernière question du texte ?',
						answer:
							'« cet » renvoie au gaspillage alimentaire (l’excès irresponsable de gaspiller la nourriture). La dernière phrase est une question rhétorique destinée à éveiller la conscience morale du lecteur.',
						mark: '1.0'
					}
				];

				const mcq = buildUniqueMcqOptions(
					'La prise de distance critique de l’auteur qui rejette une excuse faussement généreuse',
					[
						{
							text: 'L’approbation totale par l’auteur des tables surchargées',
							diagnosticFeedback: 'خطأ: الفعل « prétendent » يعبر عن التشكيك والرفض لا الموافقة.'
						},
						{
							text: 'Une simple définition neutre et scientifique de la gastronomie',
							diagnosticFeedback: 'خطأ: النص تنديد ذاتي ملتزم ضد التبذير.'
						},
						{
							text: 'Une concession où l’auteur renonce à sa propre thèse',
							diagnosticFeedback: 'خطأ: الكاتب يدحض هذا الادعاء مباشرة باستعمال « pourtant ».'
						}
					],
					rng
				);

				return {
					templateId: this.id,
					seed,
					grade: '2as_lp',
					trimesterId: 't2',
					difficulty,
					domain: this.domain,
					titleAr: this.titleAr,
					examRole: 'comprehension',
					quizQuestion: {
						type: 'mcq',
						questionText: 'Quelle attitude exprime le verbe modalisateur « prétendent » dans : « Certains prétendent qu’une table surchargée est signe de générosité » ?',
						questionTextAr: 'ما الموقف الذي يعكسه الفعل الموجّه « prétendent » في هذه الجملة؟',
						questionData: {
							options: mcq.options,
							correctIndex: mcq.correctIndices[0],
							correctIndices: mcq.correctIndices,
							correctIndexes: mcq.correctIndices
						},
						explanation: 'الفعل « prétendre » يُظهر مسافة نقدية وتشكيكاً واضحاً من الكاتب تجاه الرأي المخالف قبل دحضه.'
					},
					sujetExercise: {
						customTitle: 'I. Compréhension de l’écrit — A) Étude du texte',
						points: 7,
						instruction: 'Lisez attentivement le texte ci-dessous puis répondez aux questions :',
						content
					},
					hints: [
						'انتبه للروابط « Premièrement », « Deuxièmement » و « pourtant » لتحديد الحجج والرد.',
						'نوّع علامات الذاتية بين المعجم القدحي، ظروف الأسف، صيغة الأمر، والسؤال البلاغي.',
						'اقرأ الجملة الأخيرة جيداً لتحديد قيمتها البلاغية.'
					],
					solutionStepsAr: [
						'تحديد نمط النص (Réquisitoire) والأطروحة (1.5 نقطة).',
						'استخراج الحجتين وتفكيك الرأي المخالف ودحضه (2.5 نقطة).',
						'رصد أربع علامات للذاتية والموجّهات (2.0 نقطة).',
						'تعيين عائد « cet » وقيمة السؤال البلاغي الختامي (1.0 نقطة).'
					],
					finalAnswer: 'Étude du texte (7 pts) : Réquisitoire contre le gaspillage ; 2 arguments + réfutation ; 4 indices de subjectivité ; question rhétorique.'
				};
			}

			const passage = buildFrenchPassageBlock({
				title: 'Réquisitoire contre la désinformation et les rumeurs numériques',
				paragraphs: [
					'À l’heure où un simple clic suffit à diffuser un message auprès de milliers de personnes, la propagation des fausses nouvelles est devenue un poison dangereux pour la cohésion sociale. Nous ne pouvons plus tolérer cette légèreté coupable qui transforme de simples rumeurs en prétendues vérités.',
					'D’une part, relayer une information non vérifiée nuit gravement à la réputation des individus et sème une inquiétude injustifiée dans les familles. Une rumeur naît d’une négligence, grandit par l’imprudence et finit par détruire la confiance collective. D’autre part, [[elle]] affaiblit l’esprit critique des jeunes, qui finissent par confondre l’émotion passagère avec la preuve rigoureuse.',
					'Malgré la vitesse vertigineuse des réseaux, chaque utilisateur demeure pleinement responsable de ce qu’il partage. Vérifier la source, recouper les faits et s’abstenir dans le doute : voilà des règles élémentaires de probité. Acceptons-nous que le mensonge rapide triomphe de la vérité patiente ?'
				],
				source: 'D’après un dossier d’éducation aux médias (texte adapté)',
				glossary: [
					{ term: 'recouper les faits', meaning: 'comparer plusieurs sources fiables pour confirmer une information' },
					{ term: 'probité', meaning: 'honnêteté scrupuleuse et droiture morale' }
				]
			});

			const content: ContentBlock[] = [
				passage,
				{
					type: 'text',
					content:
						'1. S’agit-il d’un plaidoyer ou d’un réquisitoire ? Reformulez la thèse de l’auteur avec vos propres mots.',
					answer:
						'C’est un réquisitoire. Thèse : L’auteur dénonce la diffusion irresponsable des rumeurs et fausses nouvelles en ligne, qui menacent la cohésion sociale et l’esprit critique.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'2. Quels sont les deux méfaits principaux des fausses nouvelles exposés dans le deuxième paragraphe ?',
					answer:
						'1) Elles nuisent à la réputation des individus et sèment l’inquiétude dans les familles (détruisant la confiance collective). 2) Elles affaiblissent l’esprit critique des jeunes, qui confondent émotion et preuve.',
					mark: '2.0'
				},
				{
					type: 'text',
					content:
						'3. Relevez dans le texte :\n  a) Une gradation (§2) et une antithèse (§3).\n  b) Trois expressions appartenant au lexique péjoratif.',
					answer:
						'a) Gradation : « Une rumeur naît d’une négligence, grandit par l’imprudence et finit par détruire la confiance collective. » | Antithèse : « le mensonge rapide / la vérité patiente ».\n  b) Lexique péjoratif : poison dangereux, légèreté coupable, prétendues vérités, inquiétude injustifiée (trois au choix).',
					mark: '2.5'
				},
				{
					type: 'text',
					content:
						'4. À quoi renvoie « elle » (§2) et quelles solutions l’auteur propose-t-il au troisième paragraphe ?',
					answer:
						'« elle » renvoie à une rumeur (ou la désinformation / une information non vérifiée). Solutions : vérifier la source, recouper les faits et s’abstenir de partager en cas de doute.',
					mark: '1.0'
				}
			];

			const mcq = buildUniqueMcqOptions(
				'Une gradation ascendante illustrant l’aggravation progressive des dégâts d’une rumeur',
				[
					{
						text: 'Une simple énumération neutre de métiers journalistiques',
						diagnosticFeedback: 'خطأ: الأفعال تتصاعد في الشدة والخطورة (naît -> grandit -> détruire).'
					},
					{
						text: 'Un discours rapporté direct entre deux internautes',
						diagnosticFeedback: 'خطأ: لا يوجد حوار أو مزدوجتان هنا.'
					},
					{
						text: 'Un procédé explicatif de dénomination scientifique',
						diagnosticFeedback: 'خطأ: هذه صورة بلاغية حجاجية وليست تسمية علمية.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Quelle figure de style reconnaît-on dans : « Une rumeur naît d’une négligence, grandit par l’imprudence et finit par détruire la confiance collective » ?',
					questionTextAr: 'ما الصورة البلاغية الموظفة في تتبع تطور الشائعة حتى تدمير الثقة؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'التصاعد التدريجي في قوة الأفعال (تولد -> تكبر -> تدمر) يمثل تدرجاً تصاعدياً (Gradation ascendante).'
				},
				sujetExercise: {
					customTitle: 'I. Compréhension de l’écrit — A) Étude du texte',
					points: 7,
					instruction: 'Lisez attentivement le texte ci-dessous puis répondez aux questions :',
					content
				},
				hints: [
					'تتبع الرابطين « D’une part » و « D’autre part » في الفقرة الثانية لاستخراج الضررين.',
					'ابحث عن التصاعد الفعلي في الفقرة الثانية وعن الطباق في الجملة الأخيرة.',
					'في السؤال الرابع استخرج الأفعال المصدرية الثلاثة الدالة على الحلول في الفقرة الثالثة.'
				],
				solutionStepsAr: [
					'تحديد النمط وإعادة صياغة الأطروحة (1.5 نقطة).',
					'استخراج ضرري الشائعات من الفقرة الثانية (2.0 نقطة).',
					'استخراج التدرج والطباق وثلاث عبارات قدحية (2.5 نقطة).',
					'تحديد عائد « elle » والحلول الثلاثة المقترحة (1.0 نقطة).'
				],
				finalAnswer: 'Étude du texte (7 pts) : Réquisitoire contre les rumeurs ; 2 méfaits ; gradation + antithèse + lexique péjoratif ; 3 règles de probité.'
			};
		}
	},
	{
		id: 'fre_tpl_2as_lp_t2_exp_concession_modalisateurs',
		grade: '2as_lp',
		trimesterId: 't2',
		domain: 'grammaire_syntaxe',
		titleAr: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue : Concession, opposition et modalisateurs (6 pts)',
		curriculumLessonId: 'fre_lesson_2as_lp_t2_opposition_concession',
		defaultPoints: 6,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const lexTable = buildFrenchClassificationTableBlock(
				variant === 0
					? {
							columns: [
								{
									header: 'Lexique mélioratif (Plaidoyer)',
									items: ['noble', 'salutaire', 'indispensable', 'probité'],
									mark: '1.0'
								},
								{
									header: 'Lexique péjoratif (Réquisitoire)',
									items: ['fléau', 'déplorable', 'toxique', 'ostentation'],
									mark: '1.0'
								}
							]
						}
					: {
							columns: [
								{
									header: 'Lexique mélioratif (Plaidoyer)',
									items: ['admirable', 'fraternité', 'précieux', 'lucide'],
									mark: '1.0'
								},
								{
									header: 'Lexique péjoratif (Réquisitoire)',
									items: ['absurde', 'irresponsable', 'gâchis', 'crédulité'],
									mark: '1.0'
								}
							]
						}
			);

			const wordList =
				variant === 0
					? '(fléau, noble, déplorable, salutaire, toxique, indispensable, probité, ostentation)'
					: '(absurde, admirable, fraternité, irresponsable, précieux, gâchis, lucide, crédulité)';

			const grammarPrompt =
				variant === 0
					? '2. Réécrivez les phrases suivantes en employant le rapport demandé (respectez le mode verbal) :\n  a) Malgré la vitesse des réseaux sociaux, nous devons vérifier chaque information. (Remplacez « Malgré » par « Bien que »).\n  b) Bien que cet ouvrage (être) exigeant, les élèves (pouvoir) en tirer grand profit. (Conjuguez correctement les verbes).\n  c) Les vidéos brèves distraient vite. La lecture approfondie construit la pensée. (Reliez par « Certes... mais »).'
					: '2. Réécrivez les phrases suivantes en employant le rapport demandé (respectez le mode verbal) :\n  a) Bien que les habitudes de consommation soient difficiles à changer, chacun peut réduire le gaspillage. (Remplacez « Bien que » par « Malgré »).\n  b) Quoique cette rumeur (paraître) anodine, elle (pouvoir) causer un tort immense. (Conjuguez correctement les verbes).\n  c) La vie quotidienne est chargée. L’entraide entre voisins reste essentielle. (Reliez par « Certes... cependant »).';

			const grammarAnswer =
				variant === 0
					? 'a) Bien que les réseaux sociaux soient rapides, nous devons vérifier chaque information.\n  b) Bien que cet ouvrage soit exigeant, les élèves peuvent en tirer grand profit.\n  c) Certes, les vidéos brèves distraient vite, mais la lecture approfondie construit la pensée.'
					: 'a) Malgré la difficulté de changer les habitudes de consommation, chacun peut réduire le gaspillage.\n  b) Quoique cette rumeur paraisse anodine, elle peut causer un tort immense.\n  c) Certes, la vie quotidienne est chargée, cependant l’entraide entre voisins reste essentielle.';

			const modalPrompt =
				variant === 0
					? '3. Précisez la nuance exprimée par le modalisateur dans chaque phrase (certitude, regret, obligation, prudence) :\n  a) Il est impératif que les jeunes vérifient leurs sources.\n  b) Hélas, le gaspillage du pain demeure fréquent.\n  c) Cette méthode pourrait améliorer rapidement la concentration.'
					: '3. Précisez la nuance exprimée par le modalisateur dans chaque phrase (certitude, regret, obligation, mise à distance) :\n  a) Il est indéniable que la lecture développe l’expression écrite.\n  b) Malheureusement, certains élèves négligent la bibliothèque.\n  c) Quelques internautes prétendent détenir une vérité absolue.';

			const modalAnswer =
				variant === 0
					? 'a) Obligation (Il est impératif que) | b) Regret (Hélas) | c) Prudence / probabilité (conditionnel présent : pourrait).'
					: 'a) Certitude (Il est indéniable que) | b) Regret (Malheureusement) | c) Mise à distance critique / doute (prétendent).';

			const content: ContentBlock[] = [
				{
					type: 'text',
					content: `1. Classez les huit termes suivants dans le tableau du lexique évaluatif : ${wordList}`,
					mark: ''
				},
				lexTable,
				{
					type: 'text',
					content: grammarPrompt,
					answer: grammarAnswer,
					mark: '2.5'
				},
				{
					type: 'text',
					content: modalPrompt,
					answer: modalAnswer,
					mark: '1.5'
				}
			];

			const mcq =
				variant === 0
					? buildUniqueMcqOptions(
							'Bien que cet ouvrage soit exigeant, les élèves peuvent en tirer grand profit.',
							[
								{
									text: 'Bien que cet ouvrage est exigeant, les élèves peuvent en tirer grand profit.',
									diagnosticFeedback: 'خطأ: بعد « Bien que » يجب تصريف الفعل في Subjonctif (soit) لا Indicatif (est).'
								},
								{
									text: 'Malgré que cet ouvrage soit exigeant, les élèves peuvent en tirer grand profit.',
									diagnosticFeedback: 'خطأ: الصيغة « Malgré que » مرفوضة في الفرنسية المعيارية.'
								},
								{
									text: 'Bien que cet ouvrage sera exigeant, les élèves peuvent en tirer grand profit.',
									diagnosticFeedback: 'خطأ: لا يأتي المستقبل بعد « Bien que ».'
								}
							],
							rng
						)
					: buildUniqueMcqOptions(
							'Quoique cette rumeur paraisse anodine, elle peut causer un tort immense.',
							[
								{
									text: 'Quoique cette rumeur paraît anodine, elle peut causer un tort immense.',
									diagnosticFeedback: 'خطأ: الفعل بعد « Quoique » يجب أن يصرف في Subjonctif présent (paraisse).'
								},
								{
									text: 'Quoique cette rumeur paraîtra anodine, elle peut causer un tort immense.',
									diagnosticFeedback: 'خطأ: لا يُستعمل المستقبل بعد « Quoique ».'
								},
								{
									text: 'Malgré cette rumeur paraisse anodine, elle peut causer un tort immense.',
									diagnosticFeedback: 'خطأ: « Malgré » يتبعه اسم (GN) فقط دون فعل مصرف.'
								}
							],
							rng
						);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Choisissez la phrase concessive grammaticalement irréprochable :',
					questionTextAr: 'اختر جملة الاستدراك السليمة نحوياً وصرفياً:',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'الرابطان « bien que » و « quoique » يتبعها دائماً Subjonctif (soit / paraisse)، أما « malgré » فيتبعه اسم فقط.'
				},
				sujetExercise: {
					customTitle: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue',
					points: 6,
					instruction: 'Complétez les activités suivantes portant sur le lexique évaluatif, la concession et la modalisation :',
					content
				},
				hints: [
					'ميز بين الكلمات التي تمدح (Mélioratif) والكلمات التي تذم وتدين (Péjoratif).',
					'تذكر: Bien que / Quoique + Subjonctif | Malgré + Groupe nominal.',
					'انظر إلى دلالة كل موجّه (وجوب، أسف، يقين، احتراز أو تشكيك).'
				],
				solutionStepsAr: [
					'تصنيف المصطلحات الثمانية في جدول المعجم التقييمي (2.0 نقطة).',
					'إنجاز تحويلات الاستدراك والتصريف في Subjonctif (2.5 نقطة).',
					'تحديد دلالة الموجّهات الثلاثة (1.5 نقطة).'
				],
				finalAnswer: 'Fonctionnement de la langue (6 pts) : Lexique mélioratif/péjoratif (2 pts) + Concession/Subjonctif (2.5 pts) + Modalisateurs (1.5 pt).'
			};
		}
	},
	{
		id: 'fre_tpl_2as_lp_t2_exp_figures_lexique_arg',
		grade: '2as_lp',
		trimesterId: 't2',
		domain: 'discours_rhetorique',
		titleAr: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue : Figures de style et lexique argumentatif (6 pts)',
		curriculumLessonId: 'fre_lesson_2as_lp_t2_figures_argumentation',
		defaultPoints: 6,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const wfTable = buildFrenchWordFamilyTableBlock(
				variant === 0
					? [
							{
								verbe: { given: true, value: 'argumenter' },
								nom: { value: 'argumentation', mark: '0.5' },
								adjectif: { value: 'argumentatif(ve)', mark: '0.5' }
							},
							{
								verbe: { value: 'persuader', mark: '0.5' },
								nom: { given: true, value: 'persuasion' },
								adjectif: { value: 'persuasif(ve)', mark: '0.5' }
							}
						]
					: [
							{
								verbe: { given: true, value: 'gaspiller' },
								nom: { value: 'gaspillage', mark: '0.5' },
								adjectif: { value: 'gaspilleur(se)', mark: '0.5' }
							},
							{
								verbe: { value: 'dénoncer', mark: '0.5' },
								nom: { given: true, value: 'dénonciation' },
								adjectif: { value: 'dénonciateur(trice)', mark: '0.5' }
							}
						]
			);

			const figPrompt =
				variant === 0
					? '2. Identifiez la figure de style employée dans chaque phrase (antithèse, anaphore, question rhétorique, gradation) :\n  a) Refusons la rumeur ! Refusons la paresse ! Refusons l’indifférence !\n  b) L’honnêteté bâtit la confiance tandis que la fraude ruine l’avenir.\n  c) Pouvons-nous accepter de jeter le pain alors que d’autres souffrent de la faim ?\n  d) Cette négligence gêne d’abord, inquiète ensuite, menace enfin tout le quartier.'
					: '2. Identifiez la figure de style employée dans chaque phrase (antithèse, anaphore, question rhétorique, gradation) :\n  a) Chaque livre instruit ; chaque livre libère ; chaque livre relie les générations.\n  b) La sobriété enrichit l’âme, alors que l’excès l’appauvrit.\n  c) Resterons-nous silencieux face à la dégradation de nos écoles ?\n  d) Un simple mensonge trouble un ami, divise une classe, déchire toute une communauté.';

			const figAnswer =
				variant === 0
					? 'a) Anaphore (« Refusons... ») | b) Antithèse (honnêteté/fraude ; bâtit/ruine) | c) Question rhétorique | d) Gradation ascendante (gêne, inquiète, menace).'
					: 'a) Anaphore (« chaque livre... ») | b) Antithèse (sobriété/excès ; enrichit/appauvrit) | c) Question rhétorique | d) Gradation ascendante (trouble, divise, déchire).';

			const orderPrompt =
				variant === 0
					? '3. Remettez en ordre les quatre phrases suivantes pour reconstituer un paragraphe argumentatif cohérent :\n  a) Enfin, il offre aux élèves des modèles de langue claire et structurée.\n  b) D’abord, il développe la patience et la capacité de concentration.\n  c) La lecture régulière de livres imprimés comporte de nombreux bienfaits intellectuels.\n  d) Ensuite, il permet d’approfondir un sujet loin des distractions instantanées.'
					: '3. Remettez en ordre les quatre phrases suivantes pour reconstituer un paragraphe argumentatif cohérent :\n  a) Par conséquent, chacun doit adopter des achats raisonnables et réfléchis.\n  b) D’une part, il offense la valeur morale de la gratitude et du partage.\n  c) Le gaspillage alimentaire constitue un fléau que notre société doit combattre.\n  d) D’autre part, il alourdit inutilement les dépenses des familles et multiplie les déchets.';

			const orderAnswer =
				variant === 0
					? 'Ordre cohérent : c - b - d - a.'
					: 'Ordre cohérent : c - b - d - a.';

			const content: ContentBlock[] = [
				{
					type: 'text',
					content: '1. Complétez le tableau de dérivation (famille de mots) ci-dessous :',
					mark: ''
				},
				wfTable,
				{
					type: 'text',
					content: figPrompt,
					answer: figAnswer,
					mark: '2.0'
				},
				{
					type: 'text',
					content: orderPrompt,
					answer: orderAnswer,
					mark: '2.0'
				}
			];

			const mcq = buildUniqueMcqOptions(
				'c - b - d - a',
				[
					{
						text: 'b - c - d - a',
						diagnosticFeedback: 'خطأ: لا تبدأ الفقرة بالرابط « D’abord / D’une part » قبل تقديم الجملة الافتتاحية (c).'
					},
					{
						text: 'c - a - b - d',
						diagnosticFeedback: 'خطأ: الجملة (a) تفتتح بـ « Enfin / Par conséquent » فهي الخاتمة.'
					},
					{
						text: 'd - b - c - a',
						diagnosticFeedback: 'خطأ: الرابط « Ensuite / D’autre part » يأتي بعد « D’abord / D’une part ».'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Quel ordre restitue un paragraphe argumentatif parfaitement cohérent ?',
					questionTextAr: 'ما الترتيب المنطقي السليم لإعادة بناء الفقرة الحجاجية؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'تبدأ الفقرة بالأطروحة (c)، ثم الحجة الأولى (b)، فالثانية (d)، وتختتم بالرابط الختامي (a).'
				},
				sujetExercise: {
					customTitle: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue',
					points: 6,
					instruction: 'Répondez aux exercices suivants sur la dérivation, les figures de style et la cohérence argumentative :',
					content
				},
				hints: [
					'تأكد من كتابة الصفة المشتقة بدقة (-if / -ive أو -eur / -euse).',
					'في الصور البلاغية: التكرار الصدري = Anaphore، الأضداد = Antithèse، التصاعد = Gradation.',
					'في ترتيب الفقرة اتبع سلم الروابط: الجملة العامة -> أولاً -> ثانياً -> أخيراً / بالتالي.'
				],
				solutionStepsAr: [
					'إكمال جدول عائلة الكلمات الحجاجية (2.0 نقطة).',
					'تحديد الصور البلاغية الأربع بدقة (2.0 نقطة).',
					'إعادة ترتيب الفقرة الحجاجية بترتيب c - b - d - a (2.0 نقطة).'
				],
				finalAnswer: 'Fonctionnement de la langue (6 pts) : Dérivation (2 pts) + 4 figures de style (2 pts) + Reconstitution c-b-d-a (2 pts).'
			};
		}
	},
	{
		id: 'fre_tpl_2as_lp_t2_writing_plaidoyer_requisitoire',
		grade: '2as_lp',
		trimesterId: 't2',
		domain: 'production_ecrite',
		titleAr: 'II. Production écrite : Rédiger un plaidoyer ou un réquisitoire rigoureux (7 pts — format LP)',
		curriculumLessonId: 'fre_lesson_2as_lp_t2_rediger_plaidoyer_requisitoire',
		defaultPoints: 7,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const sujetUnPrompt =
				variant === 0
					? 'Rédigez un plaidoyer structuré (140 à 180 mots) destiné au journal de votre lycée pour défendre la lecture approfondie des livres et la fréquentation des bibliothèques face à la dispersion numérique.'
					: 'Rédigez un réquisitoire rigoureux (140 à 180 mots) pour dénoncer le gaspillage alimentaire (notamment du pain et des repas) et sensibiliser les citoyens aux valeurs de sobriété et de solidarité.';

			const sujetUnNotes =
				variant === 0
					? [
							'Introduction : présenter l’omniprésence des écrans rapides et formuler clairement votre thèse en faveur du livre.',
							'Développement : deux arguments variés (enrichissement linguistique, esprit critique) illustrés d’exemples concrets + une concession suivie d’une réfutation (Certes... mais / Bien que + subjonctif).',
							'Langue : employer un lexique mélioratif, des connecteurs logiques (D’abord, En outre, Enfin) et au moins une figure de style (antithèse, anaphore ou question rhétorique).',
							'Conclusion : synthétiser votre position et adresser une invitation convaincante aux lycéens.'
						]
					: [
							'Introduction : constater l’ampleur du gaspillage alimentaire et affirmer fermement votre condamnation (thèse).',
							'Développement : deux arguments solides (devoir moral de gratitude et impact économique/écologique) illustrés + réfutation de l’idée fausse associant surabondance et générosité.',
							'Langue : employer un lexique péjoratif, des modalisateurs d’obligation, une concession (Malgré / Bien que) et une figure de style expressive.',
							'Conclusion : proposer des gestes concrets de modération et conclure par un appel marquant.'
						];

			const sujetDeuxPrompt =
				variant === 0
					? 'De nombreux élèves relaient des rumeurs non vérifiées sur les réseaux sociaux sans mesurer leurs conséquences. Rédigez un réquisitoire argumenté (140 à 180 mots) pour dénoncer la désinformation numérique et promouvoir l’esprit critique.'
					: 'La tradition algérienne d’entraide collective (la Touiza) tend parfois à reculer dans les grandes villes. Rédigez un plaidoyer convaincant (140 à 180 mots) pour montrer l’importance de raviver la solidarité entre voisins.';

			const modelAnswer =
				variant === 0
					? 'À une époque dominée par les vidéos brèves et les messages instantanés, je suis profondément convaincu que la lecture approfondie de livres demeure irremplaçable pour la formation intellectuelle des lycéens.\n\nD’abord, lire un ouvrage complet cultive la patience et enrichit durablement la langue. Contrairement au défilement rapide, un texte suivi aide l’élève à structurer ses idées et à nuancer ses jugements, comme le montrent les progrès remarquables des membres de clubs de lecture. En outre, la fréquentation des bibliothèques ouvre sur l’histoire, les sciences et les valeurs morales. Certes, les écrans facilitent l’accès rapide aux données ; cependant, bien qu’ils soient pratiques, ils dispersent souvent l’attention et habituent l’esprit à la superficialité.\n\nEn somme, l’écran informe dans l’instant, tandis que le livre éclaire durablement. Lire, c’est grandir ; lire, c’est réfléchir ; lire, c’est bâtir son autonomie. Redonnons donc au livre sa juste place dans notre quotidien !'
					: 'Chaque jour, des quantités considérables de pain et de repas parfaitement consommables sont hélas jetées à la poubelle. Je condamne fermement ce gaspillage alimentaire déplorable qui heurte à la fois la morale, la raison économique et le respect de l’environnement.\n\nEn premier lieu, jeter la nourriture traduit une grave ingratitude envers les bienfaits reçus et méprise le labeur quotidien des agriculteurs. De plus, cet excès irresponsable alourdit inutilement le budget des ménages et multiplie les déchets urbains. Certains prétendent qu’une table surchargée honore les invités ; pourtant, bien que la générosité soit une vertu admirable, la véritable hospitalité consiste dans la mesure et le partage avec les démunis, jamais dans l’ostentation.\n\nEn définitive, acheter selon nos besoins réels et cuisiner avec modération constituent un devoir civique urgent. Pouvons-nous tolérer plus longtemps un gâchis aussi absurde alors que la sobriété protège nos ressources et notre dignité ?' ;

			const block = buildFrenchWrittenProductionBlock({
				sujetUnTitle: variant === 0 ? 'Sujet 1 (Plaidoyer guidé) :' : 'Sujet 1 (Réquisitoire guidé) :',
				sujetUnPrompt,
				sujetUnNotes,
				sujetDeuxPrompt,
				modelAnswer,
				rubricSummary:
					'Pertinence, respect du type (plaidoyer/réquisitoire) et clarté de la thèse (2.0 pts) | Cohérence, progression argumentative, concession et connecteurs (2.0 pts) | Richesse lexicale (mélioratif/péjoratif), syntaxe et subjonctif (2.0 pts) | Figures de style, orthographe et présentation (1.0 pt)',
				mark: '7.0'
			});

			const mcq = buildUniqueMcqOptions(
				'Formuler une thèse nette, développer des arguments illustrés, intégrer une concession réfutée et conclure avec force',
				[
					{
						text: 'Éviter toute prise de position pour rester totalement neutre et impersonnel',
						diagnosticFeedback: 'خطأ: المرافعة والتنديد نصان ذاتيان ملتزمان يبرزان موقف الكاتب بوضوح.'
					},
					{
						text: 'Enchaîner uniquement des slogans exclamatifs sans aucun argument ni exemple',
						diagnosticFeedback: 'خطأ: الحجج المنطقية والأمثلة هي عمود النص الحجاجي.'
					},
					{
						text: 'Mélanger un registre familier et des phrases sans ponctuation',
						diagnosticFeedback: 'خطأ: تشترط الكتابة الرسمية لغة قياسية أو راقية وترقيماً دقيقاً.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Quelle stratégie assure une production écrite argumentative de niveau 7/7 en 2AS LP ?',
					questionTextAr: 'ما الاستراتيجية التي تضمن العلامة الكاملة (7/7) في كتابة مرافعة أو تنديد في 2AS LP؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'يقوم المقال الحجاجي المتميز على وضوح الأطروحة، تدرج الحجج المدعمة بأمثلة، الاستدراك المدحوض، وخاتمة بليغة.'
				},
				sujetExercise: {
					customTitle: 'II. Production écrite',
					points: 7,
					instruction: 'Traitez l’UN des deux sujets au choix (140 à 180 mots) :',
					content: [block]
				},
				hints: [
					'قسّم مقالك إلى ثلاث فقرات واضحة مع ترك فراغ بادئ في أول كل فقرة.',
					'وظف رابط استدراك مع Subjonctif (مثل: Bien que + soit / puissent) لدحض الاعتراض.',
					'اختم بطباق أو سؤال بلاغي يرسخ رسالتك الأخلاقية في ذهن القارئ.'
				],
				solutionStepsAr: [
					'تحديد الموضوع وصياغة أطروحة صريحة منذ المقدمة.',
					'تطوير حجتين مدعومتين بأمثلة مع إدراج استدراك مدحوض.',
					'صياغة خاتمة جامعة ومراجعة التصريف والإملاء والترقيم.'
				],
				finalAnswer: 'Production écrite (7 pts) : Plaidoyer / Réquisitoire structuré avec corrigé modèle et grille d’évaluation.'
			};
		}
	}
];
