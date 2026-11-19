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

export const TEMPLATES_2AS_LE_T3: FrenchParameterizedTemplate[] = [
	{
		id: 'fre_tpl_2as_le_t3_comp_reportage_dialogue',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'comprehension_ecrit',
		titleAr: 'I. Compréhension de l’écrit — A) Étude du texte : Reportage patrimonial et dialogue d’idées (6 pts)',
		curriculumLessonId: 'fre_lesson_2as_le_t3_enonciation_dialogue',
		defaultPoints: 6,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			if (variant === 0) {
				const passage = buildFrenchPassageBlock({
					title: 'De Tlemcen à la Kalâa des Béni Hammad : pierres parlantes de l’histoire algérienne',
					paragraphs: [
						'Sous la lumière limpide d’un matin d’automne, la Grande Mosquée de Tlemcen accueille le visiteur dans un silence apaisant. Au centre de la cour pavée d’onyx, les arches élancées s’ouvrent vers un mihrab finement ciselé dans le plâtre, où chaque arabesque géométrique témoigne de la maîtrise mathématique des bâtisseurs du XIe siècle.',
						'À plusieurs centaines de kilomètres à l’est, sur les hauteurs montagneuses du Hodna, se dressent les vestiges majestueux de la Kalâa des Béni Hammad. Son imposant minaret de pierre ocre domine encore la vallée comme une sentinelle de mémoire. En observant [[ces]] deux chefs-d’œuvre séparés par la géographie mais unis par l’histoire, un jeune archéologue algérien nous confie : « Restaurer ces monuments ne consiste pas seulement à consolider des murs anciens ; c’est offrir aux étudiants un livre d’architecture grandeur nature. »',
						'Classés parmi les joyaux du Maghreb, ces sites invitent les générations actuelles à conjuguer fierté culturelle, recherche scientifique et tourisme respectueux afin que [[leur]] rayonnement traverse encore les siècles.'
					],
					source: 'D’après un reportage culturel sur l’architecture médiévale algérienne (texte adapté)',
					glossary: [
						{ term: 'sentinelle', meaning: 'gardien vigilant qui veille depuis un point élevé' },
						{ term: 'vestiges', meaning: 'restes historiques et architecturaux d’une cité ancienne' }
					]
				});

				const content: ContentBlock[] = [
					passage,
					{
						type: 'text',
						content:
							'1. Quels deux sites patrimoniaux algériens ce reportage relie-t-il et quel lien profond souligne-t-il entre eux ?',
						answer:
							'Les deux sites sont la Grande Mosquée de Tlemcen et la Kalâa des Béni Hammad (dans le Hodna). Lien : séparés par la géographie, ils sont unis par l’histoire, la maîtrise architecturale du XIe siècle et la valeur pédagogique qu’ils offrent aux nouvelles générations.',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'2. Relevez dans le deuxième paragraphe :\n  a) Une comparaison valorisante et une métaphore contenue dans le discours direct de l’archéologue.\n  b) L’idée essentielle défendue par ce spécialiste.',
						answer:
							'a) Comparaison : « domine encore la vallée comme une sentinelle de mémoire ». Métaphore : « un livre d’architecture grandeur nature ».\n  b) Restaurer ces monuments dépasse la simple consolidation matérielle : cela constitue une école vivante d’architecture et de mémoire pour les étudiants.',
						mark: '2.0'
					},
					{
						type: 'text',
						content:
							'3. Quel procédé stylistique est employé dans « pierres parlantes » (titre) et dans « se dressent les vestiges majestueux » (§2) ? Quelle est la visée communicative du texte ?',
						answer:
							'« pierres parlantes » : personnification (les pierres racontent l’histoire). « se dressent » : verbe de localisation dynamique et valorisant (remplaçant le banal « il y a »). Visée communicative : faire découvrir et valoriser le patrimoine architectural algérien et inciter à sa préservation scientifique et citoyenne.',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'4. À quoi renvoient « ces » (§2) et « leur » (§3) ?',
						answer:
							'« ces » (ces deux chefs-d’œuvre) et « leur » renvoient tous deux à la Grande Mosquée de Tlemcen et à la Kalâa des Béni Hammad.',
						mark: '1.0'
					}
				];

				const mcq = buildUniqueMcqOptions(
					'Elle compare implicitement les monuments restaurés à un livre ouvert qui instruit concrètement les étudiants en architecture',
					[
						{
							text: 'Elle affirme que les monuments doivent être remplacés par des manuels scolaires',
							diagnosticFeedback: 'خطأ: الاستعارة تشبه المعالم الأثرية بكتاب مفتوح حيّ لتثمين دورها التعليمي.'
						},
						{
							text: 'Elle exprime une tonalité polémique contre les archéologues',
							diagnosticFeedback: 'خطأ: الشهادة تثمينية وتعليمية وليست سجالية.'
						},
						{
							text: 'Elle constitue une simple liste de chiffres statistiques',
							diagnosticFeedback: 'خطأ: إنها استعارة بليغة (Métaphore).'
						}
					],
					rng
				);

				return {
					templateId: this.id,
					seed,
					grade: '2as_le',
					trimesterId: 't3',
					difficulty,
					domain: this.domain,
					titleAr: this.titleAr,
					examRole: 'comprehension',
					quizQuestion: {
						type: 'mcq',
						questionText: 'Quelle portée stylistique possède la métaphore « un livre d’architecture grandeur nature » dans la parole de l’archéologue ?',
						questionTextAr: 'ما الدلالة الأسلوبية للاستعارة « un livre d’architecture grandeur nature » في قول عالم الآثار؟',
						questionData: {
							options: mcq.options,
							correctIndex: mcq.correctIndices[0],
							correctIndices: mcq.correctIndices,
							correctIndexes: mcq.correctIndices
						},
						explanation: 'تبرز الاستعارة القيمة التربوية والعلمية المباشرة للمعالم التراثية المرمّمة بوصفها مدرسة حية للطلبة.'
					},
					sujetExercise: {
						customTitle: 'I. Compréhension de l’écrit — A) Étude du texte',
						points: 6,
						instruction: 'Lisez attentivement ce reportage puis répondez aux questions :',
						content
					},
					hints: [
						'ميز في الفقرة الثانية بين التشبيه المسبوق بـ « comme » والاستعارة الخالية من الأداة داخل كلام عالم الآثار.',
						'لاحظ تشخيص الحجارة في العنوان « pierres parlantes ».',
						'اربط بين النهاية (الفقرة الثالثة) والغاية التواصلية التثقيفية والتراثية.'
					],
					solutionStepsAr: [
						'تحديد المعلمين الجزائريين والرابط الحضاري بينهما (1.5 نقطة).',
						'استخراج التشبيه والاستعارة وفكرة عالم الآثار (2.0 نقطة).',
						'تحليل التشخيص والفعل الوصفي والغاية التواصلية (1.5 نقطة).',
						'تعيين الإحالتين « ces » و « leur » (1.0 نقطة).'
					],
					finalAnswer: 'Étude du texte (6 pts) : Tlemcen & Kalâa des Béni Hammad ; comparaison + métaphore ; personnification + visée patrimoniale ; référents.'
				};
			}

			const passage = buildFrenchPassageBlock({
				title: 'Dialogue d’idées à la bibliothèque de Constantine : héritage manuscrit et humanités numériques',
				paragraphs: [
					'Dans la salle calme des archives anciennes de Constantine, le professeur Abdelkader, historien des manuscrits, s’entretient avec Meriem, jeune chercheuse en langues et humanités numériques : « Mademoiselle, vous consacrez tant d’heures aux bases de données informatiques ; ne craignez-vous pas que l’écran éloigne les jeunes chercheurs du contact direct avec les manuscrits anciens ? demanda-t-il avec une bienveillante curiosité. »',
					'— « Je comprends pleinement votre inquiétude, monsieur, répondit Meriem avec déférence. Toutefois, ici même et dès aujourd’hui, la numérisation haute définition protège des feuillets fragiles que trop de manipulations risqueraient d’abîmer. De plus, [[elle]] permet à un étudiant d’Adrar ou d’Oran de consulter sans voyager un traité conservé à Constantine. »',
					'— « Cet argument d’accessibilité est assurément solide, concéda le professeur. Cependant, pourriez-vous admettre que seul l’examen matériel de l’encre et du papier révèle parfois la date exacte d’une copie ? »',
					'— « Sans aucun doute, professeur ! C’est pourquoi l’outil numérique ne doit jamais remplacer l’archive réelle, mais la servir et la prolonger. » Tous deux sourirent, convaincus que la mémoire savante gagne toujours à unir fidélité au patrimoine et intelligence des techniques modernes.'
				],
				source: 'D’après une rencontre académique à Constantine (texte adapté)',
				glossary: [
					{ term: 'humanités numériques', meaning: 'application des outils informatiques à l’étude des textes, de l’histoire et des langues' },
					{ term: 'déférence', meaning: 'respect profond et courtois témoigné à une personne ou à un maître' }
				]
			});

			const content: ContentBlock[] = [
				passage,
				{
					type: 'text',
					content:
						'1. Identifiez les deux interlocuteurs, le cadre de l’échange et la problématique débattue dans ce dialogue d’idées.',
					answer:
						'Interlocuteurs : le professeur Abdelkader (historien des manuscrits) et Meriem (jeune chercheuse en langues et humanités numériques). Cadre : la salle des archives anciennes de la bibliothèque de Constantine. Problématique : la numérisation menace-t-elle le contact direct avec les manuscrits anciens ou sert-elle leur préservation et leur diffusion ?',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'2. Relevez dans le texte :\n  a) Quatre déictiques (marques directes de la situation d’énonciation).\n  b) Un verbe au conditionnel de politesse (§3) et l’enchaînement montrant l’écoute mutuelle.',
					answer:
						'a) Déictiques : « vous », « Je », « votre », « ici même », « dès aujourd’hui » (quatre au choix).\n  b) Conditionnel de politesse : « pourriez-vous admettre ». Enchaînement : « Je comprends pleinement votre inquiétude » / « Cet argument d’accessibilité est assurément solide » / « Sans aucun doute, professeur ! ».',
					mark: '2.0'
				},
				{
					type: 'text',
					content:
						'3. Montrez en quoi ce dialogue suit une progression dialectique aboutissant à une synthèse finale.',
					answer:
						'Partis d’une divergence apparente (crainte face aux écrans vs défense de la numérisation), les deux interlocuteurs écoutent et valident les arguments de l’autre (protection et diffusion vs examen matériel de l’encre et du papier) pour parvenir à une synthèse constructive : l’outil numérique doit servir et prolonger l’archive réelle sans jamais la remplacer.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4. À quoi renvoie « elle » (§2) et quel est le registre de langue dominant dans cet entretien ?',
					answer:
						'« elle » renvoie à la numérisation haute définition. Registre de langue : registre soutenu (courtois et académique).',
					mark: '1.0'
				}
			];

			const mcq = buildUniqueMcqOptions(
				'Une progression dialectique courtoise débouchant sur la complémentarité entre archive matérielle et outil numérique',
				[
					{
						text: 'Une querelle agressive où chaque interlocuteur refuse d’écouter l’autre',
						diagnosticFeedback: 'خطأ: الحوار راقٍ ومتهذب ويثمّن فيه كل طرف حجة الآخر.'
					},
					{
						text: 'La décision d’abandonner totalement la conservation des manuscrits papier',
						diagnosticFeedback: 'خطأ: الخاتمة تؤكد أن الرقمنة تخدم الأرشيف الحقيقي ولا تحل محله.'
					},
					{
						text: 'Un dialogue familier rempli d’abréviations orales',
						diagnosticFeedback: 'خطأ: المستوى اللغوي راقٍ ومهذب جداً (Registre soutenu).'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Comment caractériser la dynamique globale de ce dialogue d’idées à Constantine ?',
					questionTextAr: 'كيف تصف الحركية العامة لحوار الأفكار هذا في قسنطينة؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'يتدرج الحوار بأدب وإنصات متبادل من تخوف مبدئي إلى تركيب بنّاء يجمع بين أصالة المخطوط وخدمة الرقمنة.'
				},
				sujetExercise: {
					customTitle: 'I. Compréhension de l’écrit — A) Étude du texte',
					points: 6,
					instruction: 'Lisez attentivement ce dialogue d’idées puis répondez aux questions :',
					content
				},
				hints: [
					'تذكر المؤشرات التلفظية (Déictiques): ضمائر التخاطب وظروف المكان والزمان الحاضرة (ici même, dès aujourd’hui).',
					'انتبه للشرطي المهذب في الفقرة الثالثة (« pourriez-vous admettre »).',
					'لخّص كيف تحول الاختلاف الأولي إلى اتفاق وتركيب فكري في الفقرة الأخيرة.'
				],
				solutionStepsAr: [
					'تحديد المتحاورين والإطار والإشكالية (1.5 نقطة).',
					'استخراج المؤشرات التلفظية والشرطي المهذب وعلامات الإنصات (2.0 نقطة).',
					'إبراز التدرج الجدلي والتركيب النهائي (1.5 نقطة).',
					'تحديد عائد « elle » والمستوى اللغوي الراقي (1.0 نقطة).'
				],
				finalAnswer: 'Étude du texte (6 pts) : Dialogue d’idées à Constantine ; déictiques + conditionnel de politesse ; progression dialectique ; elle = numérisation.'
			};
		}
	},
	{
		id: 'fre_tpl_2as_le_t3_comp_nouvelle_morale',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'comprehension_ecrit',
		titleAr: 'I. Compréhension de l’écrit — A) Étude du texte : Nouvelle réaliste morale et anticipation éthique (6 pts)',
		curriculumLessonId: 'fre_lesson_2as_le_t3_analyse_stylistique_visee',
		defaultPoints: 6,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			if (variant === 0) {
				const passage = buildFrenchPassageBlock({
					title: 'Le carnet oublié du vieil horloger d’Alger',
					paragraphs: [
						'Chaque matin, dans une petite ruelle calme d’Alger-Centre, maître Brahim ouvrait son atelier d’horlogerie au moment où le soleil effleurait les balcons blancs. Depuis quarante ans, ses mains patientes réparaient les montres anciennes avec la même probité silencieuse. Ce mardi-là, alors qu’il rangeait son établi avant la prière du dohr, il aperçut un petit carnet en cuir noir qu’un voyageur pressé avait oublié sur le comptoir une heure plus tôt.',
						'Brahim ouvrit prudemment la couverture pour y chercher un nom. Entre deux pages couvertes d’adresses figurait une importante somme d’argent soigneusement pliée ainsi qu’un billet de train pour Annaba prévu à seize heures. Le cœur du vieil artisan se serra aussitôt. Comme cet homme devait s’inquiéter à présent ! S’il ne retrouvait pas son billet à temps, il manquerait son départ et perdrait toutes ses économies. Non, il ne fallait pas attendre une minute de plus !',
						'Sans hésiter, Brahim ferma sa boutique et marcha d’un pas vif jusqu’à la gare ferroviaire. Près du guichet, il reconnut le voyageur au visage pâle et inquiet, puis [[lui]] tendit intact le carnet noir. Profondément ému, l’inconnu voulut le récompenser, mais l’horloger sourit simplement : « Rendre un dépôt n’appelle aucun salaire ; la paix du cœur suffit amplement. »'
					],
					source: 'Nouvelle réaliste morale inédite (collection pédagogique algérienne)',
					glossary: [
						{ term: 'établi', meaning: 'table de travail robuste d’un artisan horloger ou menuisier' },
						{ term: 'dépôt', meaning: 'bien confié ou retrouvé que l’on a le devoir moral de restituer intégralement' }
					]
				});

				const content: ContentBlock[] = [
					passage,
					{
						type: 'text',
						content:
							'1. Dégagez le schéma narratif condensé de cette nouvelle réaliste (situation initiale, élément perturbateur, péripétie clé, dénouement moral).',
						answer:
							'Situation initiale : maître Brahim ouvre chaque matin son atelier d’horlogerie à Alger avec probité. | Élément perturbateur : il découvre un carnet en cuir noir oublié par un voyageur, contenant de l’argent et un billet de train pour Annaba. | Péripétie : il ferme sa boutique et court à la gare retrouver le voyageur. | Dénouement : il lui rend le carnet intact et refuse toute récompense financière.',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'2. Relevez dans le deuxième paragraphe un passage au discours indirect libre (DIL) et identifiez la focalisation dominante de ce paragraphe en justifiant par deux indices.',
						answer:
							'Passage au DIL : « Comme cet homme devait s’inquiéter à présent ! S’il ne retrouvait pas son billet à temps, il manquerait son départ et perdrait toutes ses économies. Non, il ne fallait pas attendre une minute de plus ! ». | Focalisation interne : accès direct à l’émotion (« Le cœur du vieil artisan se serra ») et aux pensées intimes de Brahim au discours indirect libre.',
						mark: '2.0'
					},
					{
						type: 'text',
						content:
							'3. Distinguez la valeur respective des trois temps du passé dans le premier paragraphe : « ouvrait / rangeait » (imparfait), « aperçut » (passé simple) et « avait oublié » (plus-que-parfait).',
						answer:
							'Imparfait (« ouvrait / rangeait ») : habitude et arrière-plan en cours. | Passé simple (« aperçut ») : action soudaine de premier plan qui déclenche l’intrigue. | Plus-que-parfait (« avait oublié ») : antériorité dans le passé (action accomplie une heure plus tôt).',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'4. À qui renvoie « lui » (§3) et quelle leçon morale (visée) dégage la dernière réplique de l’horloger ?',
						answer:
							'« lui » renvoie au voyageur (l’inconnu). Visée morale : l’honnêteté et la restitution d’un dépôt sont un devoir naturel qui procure la paix intérieure, bien supérieure à tout intérêt matériel.',
						mark: '1.0'
					}
				];

				const mcq = buildUniqueMcqOptions(
					'Focalisation interne soutenue par le discours indirect libre révélant l’empathie et la décision morale de Brahim',
					[
						{
							text: 'Focalisation externe neutre où le lecteur ignore totalement les pensées de l’horloger',
							diagnosticFeedback: 'خطأ: الفقرة الثانية تكشف انفعال قلبه وخواطره الداخلية بالخطاب غير المباشر الحر.'
						},
						{
							text: 'Un texte explicatif scientifique à effacement total de l’énonciateur',
							diagnosticFeedback: 'خطأ: النص قصة واقعية أخلاقية (Nouvelle réaliste morale).'
						},
						{
							text: 'Un dialogue polémique entre deux adversaires politiques',
							diagnosticFeedback: 'خطأ: النص سردي أخلاقي هادئ.'
						}
					],
					rng
				);

				return {
					templateId: this.id,
					seed,
					grade: '2as_le',
					trimesterId: 't3',
					difficulty,
					domain: this.domain,
					titleAr: this.titleAr,
					examRole: 'comprehension',
					quizQuestion: {
						type: 'mcq',
						questionText: 'Quel choix narratif et stylistique caractérise particulièrement le deuxième paragraphe de cette nouvelle ?',
						questionTextAr: 'ما الخيار السردي والأسلوبي الذي يميز الفقرة الثانية من هذه القصة الواقعية الأخلاقية؟',
						questionData: {
							options: mcq.options,
							correctIndex: mcq.correctIndices[0],
							correctIndices: mcq.correctIndices,
							correctIndexes: mcq.correctIndices
						},
						explanation: 'تتضافر الرؤية الداخلية (Focalisation interne) مع الخطاب غير المباشر الحر لنقل تعاطف العم إبراهيم وقراره الأخلاقي.'
					},
					sujetExercise: {
						customTitle: 'I. Compréhension de l’écrit — A) Étude du texte',
						points: 6,
						instruction: 'Lisez attentivement cette nouvelle réaliste puis répondez aux questions :',
						content
					},
					hints: [
						'ابحث في الفقرة الثانية عن الجمل التعجبية بالغائب والماضي المستمر بلا مزدوجتين لاستخراج DIL.',
						'تتبع الثلاثية الزمنية في الفقرة الأولى: Imparfait (خلفية) + Passé simple (حدث مفاجئ) + Plus-que-parfait (أسبقية).',
						'استخلص العبرة الأخلاقية من الرد الأخير لمعلم الساعات.'
					],
					solutionStepsAr: [
						'تلخيص مراحل الخطاطة السردية الأربع (1.5 نقطة).',
						'استخراج مقطع الخطاب غير المباشر الحر وتحديد الرؤية الداخلية وتعليلها (2.0 نقطة).',
						'التمييز بين قيم الأزمنة الثلاثة في الفقرة الأولى (1.5 نقطة).',
						'تحديد عائد « lui » والعبرة الأخلاقية الختامية (1.0 نقطة).'
					],
					finalAnswer: 'Étude du texte (6 pts) : Nouvelle réaliste morale ; schéma narratif ; DIL + focalisation interne ; valeurs des temps ; probité.'
				};
			}

			const passage = buildFrenchPassageBlock({
				title: 'Alger 2045 : la cité des jardins économes en eau',
				paragraphs: [
					'En 2045, lorsqu’on gravira les hauteurs surplombant la baie d’Alger, on découvrira une métropole profondément métamorphosée par l’ingéniosité écologique. Dès que les communes auront achevé le réseau de récupération des eaux pluviales inspiré des anciennes citernes de la Casbah, chaque toit-terrasse abritera un petit jardin ombragé capable de rafraîchir tout l’immeuble.',
					'Dans les rues piétonnes bordées d’oliviers et de caroubiers, des tramways silencieux alimentés par l’énergie solaire remplaceront la congestion automobile d’autrefois. Les lycéens de cette génération étudieront dans des bibliothèques lumineuses ouvertes sur des cours verdoyantes ; en contemplant [[cet]] équilibre harmonieux, ils se demanderont sans doute comment leurs aînés avaient pu gaspiller tant d’eau potable vingt ans plus tôt.',
					'Pourtant, cette cité apaisée ne relève nullement d’un rêve inaccessible. Si les citoyens d’aujourd’hui choisissent dès maintenant la sobriété énergétique, le reboisement et le respect de l’espace public, l’avenir récompensera [[leur]] sagesse par une qualité de vie durable.'
				],
				source: 'Récit d’anticipation éthique et écologique (texte pédagogique inédit)',
				glossary: [
					{ term: 'caroubier', meaning: 'arbre méditerranéen robuste très résistant à la sécheresse' },
					{ term: 'métamorphosée', meaning: 'profondément transformée dans son apparence et son organisation' }
				]
			});

			const content: ContentBlock[] = [
				passage,
				{
					type: 'text',
					content:
						'1. Quel genre de récit ce texte illustre-t-il et quelles sont trois innovations écologiques imaginées pour Alger en 2045 ?',
					answer:
						'Genre : un récit d’anticipation éthique (et écologique). Innovations : récupération des eaux pluviales inspirée des citernes de la Casbah ; jardins sur les toits-terrasses pour rafraîchir les immeubles ; rues piétonnes arborées et tramways solaires silencieux ; bibliothèques lumineuses ouvertes sur des cours vertes (trois au choix).',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'2. Expliquez la valeur de la concordance entre « auront achevé » (futur antérieur) et « abritera » (futur simple) dans le premier paragraphe, puis identifiez le temps et la valeur de « avaient pu » (§2).',
					answer:
						'« auront achevé » (futur antérieur) exprime l’antériorité dans le futur : le réseau doit être achevé avant que chaque toit n’abrite un jardin (« abritera », futur simple). | « avaient pu » (plus-que-parfait) exprime une action très antérieure (le gaspillage des années 2020) vue depuis 2045.',
					mark: '2.0'
				},
				{
					type: 'text',
					content:
						'3. Quel lien l’auteur tisse-t-il entre le patrimoine traditionnel algérien et la ville de demain (§1), et quelle est la visée éthique du troisième paragraphe ?',
					answer:
						'Lien patrimoine/futur : le réseau moderne de récupération d’eau s’inspire directement des anciennes citernes de la Casbah. | Visée éthique (§3) : responsabiliser les citoyens d’aujourd’hui en montrant que la ville durable de 2045 dépend de leurs choix présents (sobriété, reboisement, civisme).',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4. À quoi ou à qui renvoient « cet » (§2) et « leur » (§3) ?',
					answer:
						'« cet » renvoie à l’équilibre harmonieux (entre architecture écologique, transports propres et nature en ville). « leur » renvoie aux citoyens d’aujourd’hui.',
					mark: '1.0'
				}
			];

			const mcq = buildUniqueMcqOptions(
				'L’antériorité d’une réalisation future indispensable (« auront achevé ») par rapport à la conséquence future attendue (« abritera »)',
				[
					{
						text: 'Un regret irréversible concernant un échec du passé',
						diagnosticFeedback: 'خطأ: الزمنان في المستقبل (Futur antérieur + Futur simple) للتخطيط الاستشرافي.'
					},
					{
						text: 'Une simple habitude quotidienne du passé lointain',
						diagnosticFeedback: 'خطأ: العادة الماضية يعبر عنها بـ Imparfait.'
					},
					{
						text: 'Une opposition polémique entre deux faits simultanés',
						diagnosticFeedback: 'خطأ: العلاقة زمنية تتابعية (Dès que + Futur antérieur => Futur simple).'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Quelle relation temporelle exprime le couple « Dès que les communes auront achevé..., chaque toit abritera... » ?',
					questionTextAr: 'ما العلاقة الزمنية التي يعبر عنها اقتران المستقبل الأسبق بالمستقبل البسيط في الفقرة الأولى؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'المستقبل الأسبق (auront achevé) يعبّر عن حدث مستقبلي يكتمل أولاً قبل تحقق النتيجة في المستقبل البسيط (abritera).'
				},
				sujetExercise: {
					customTitle: 'I. Compréhension de l’écrit — A) Étude du texte',
					points: 6,
					instruction: 'Lisez attentivement ce récit d’anticipation éthique puis répondez aux questions :',
					content
				},
				hints: [
					'تأمل الإلهام التراثي في الفقرة الأولى (صهاريج القصبة القديمة) كجسر بين الماضي والمستقبل.',
					'تذكر دور المستقبل الأسبق (Futur antérieur) في بيان الأسبقية داخل المستقبل.',
					'اقرأ الجملة الشرطية في الفقرة الثالثة لتحديد الرسالة الأخلاقية الموجهة للقارئ اليوم.'
				],
				solutionStepsAr: [
					'تحديد نوع النص وثلاث مبادرات بيئية لعام 2045 (1.5 نقطة).',
					'تحليل العلاقة بين Futur antérieur و Futur simple وقيمة Plus-que-parfait (2.0 نقطة).',
					'إبراز الربط بالتراث والغاية الأخلاقية للفقرة الثالثة (1.5 نقطة).',
					'تحديد الإحالتين « cet » و « leur » (1.0 نقطة).'
				],
				finalAnswer: 'Étude du texte (6 pts) : Anticipation éthique Alger 2045 ; concordance FA/FS + PQP ; patrimoine & responsabilité présente ; référents.'
			};
		}
	},
	{
		id: 'fre_tpl_2as_le_t3_exp_discours_libre_temps',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'conjugaison_temps',
		titleAr: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue : Discours indirect libre et temps du récit (6 pts)',
		curriculumLessonId: 'fre_lesson_2as_le_t3_discours_rapporte_libre',
		defaultPoints: 6,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const tempsTable = buildFrenchClassificationTableBlock(
				variant === 0
					? {
							columns: [
								{
									header: 'Imparfait (Arrière-plan / Habitude)',
									items: ['ouvrait chaque matin', 'la ruelle était calme'],
									mark: '0.5'
								},
								{
									header: 'Passé simple (Premier plan / Rupture)',
									items: ['il aperçut le carnet', 'il ferma sa boutique'],
									mark: '0.5'
								},
								{
									header: 'Plus-que-parfait (Antériorité)',
									items: ['qu’un voyageur avait oublié'],
									mark: '0.5'
								}
							]
						}
					: {
							columns: [
								{
									header: 'Discours Direct (DD)',
									items: ['Il dit : « Je rendrai ce dépôt ! »'],
									mark: '0.5'
								},
								{
									header: 'Discours Indirect (DI)',
									items: ['Il dit qu’il rendrait ce dépôt.'],
									mark: '0.5'
								},
								{
									header: 'Discours Indirect Libre (DIL)',
									items: ['Non, il rendrait ce dépôt dès ce soir-là !'],
									mark: '0.5'
								}
							]
						}
			);

			const tablePrompt =
				variant === 0
					? '1. Classez les cinq groupes verbaux suivants selon leur temps et leur fonction dans le récit :\n  (il aperçut le carnet | ouvrait chaque matin | qu’un voyageur avait oublié | il ferma sa boutique | la ruelle était calme)'
					: '1. Classez les trois énoncés suivants selon la forme de paroles rapportées :\n  (A: Non, il rendrait ce dépôt dès ce soir-là ! | B: Il dit : « Je rendrai ce dépôt ! » | C: Il dit qu’il rendrait ce dépôt.)';

			const dilPrompt =
				variant === 0
					? '2. Transposez le passage suivant successivement au discours indirect (DI) puis au discours indirect libre (DIL) :\n  L’artisan se demanda : « Comment le voyageur retrouvera-t-il son billet aujourd’hui ? Je dois courir à la gare sans tarder ! »'
					: '2. Transposez le passage suivant successivement au discours indirect (DI) puis au discours indirect libre (DIL) :\n  La jeune chercheuse pensa : « Ai-je vérifié toutes les dates de ce manuscrit hier ? Je ne peux pas publier une erreur ! »';

			const dilAnswer =
				variant === 0
					? 'DI : L’artisan se demanda comment le voyageur retrouverait son billet ce jour-là et se dit qu’il devait courir à la gare sans tarder.\n  DIL : L’artisan hésita un instant. Comment le voyageur retrouverait-il son billet ce jour-là ? Il devait courir à la gare sans tarder !'
					: 'DI : La jeune chercheuse se demanda si elle avait vérifié toutes les dates de ce manuscrit la veille et pensa qu’elle ne pouvait pas publier une erreur.\n  DIL : La jeune chercheuse fronça les sourcils. Avait-elle vérifié toutes les dates de ce manuscrit la veille ? Elle ne pouvait pas publier une erreur !';

			const conjPrompt =
				variant === 0
					? '3. Conjuguez les verbes entre parenthèses aux temps convenables du récit (imparfait, passé simple, plus-que-parfait) puis de l’anticipation (futur antérieur, futur simple) :\n  a) Alors que la pluie (tomber), Amine (retrouver) le livre qu’il (prêter) à son voisin la semaine précédente.\n  b) Dès que les lycéens (planter) cent oliviers, la cour de l’établissement (devenir) plus fraîche.'
					: '3. Conjuguez les verbes entre parenthèses aux temps convenables du récit (imparfait, passé simple, plus-que-parfait) puis de l’anticipation (futur antérieur, futur simple) :\n  a) Tandis que les élèves (observer) le minaret, le guide (montrer) une inscription que les artisans (graver) neuf siècles plus tôt.\n  b) Lorsque la municipalité (achever) les citernes pluviales, les parcs (économiser) la moitié de leur eau.';

			const conjAnswer =
				variant === 0
					? 'a) tombait (Imparfait) / retrouva (Passé simple) / avait prêté (Plus-que-parfait).\n  b) auront planté (Futur antérieur) / deviendra (Futur simple).'
					: 'a) observaient (Imparfait) / montra (Passé simple) / avaient gravée (Plus-que-parfait avec accord COD « que = une inscription »).\n  b) aura achevé (Futur antérieur) / économiseront (Futur simple).';

			const content: ContentBlock[] = [
				{
					type: 'text',
					content: tablePrompt,
					mark: ''
				},
				tempsTable,
				{
					type: 'text',
					content: dilPrompt,
					answer: dilAnswer,
					mark: '2.5'
				},
				{
					type: 'text',
					content: conjPrompt,
					answer: conjAnswer,
					mark: '2.0'
				}
			];

			const mcq =
				variant === 0
					? buildUniqueMcqOptions(
							'Comment le voyageur retrouverait-il son billet ce jour-là ? Il devait courir à la gare sans tarder !',
							[
								{
									text: 'Il se demanda comment le voyageur retrouverait son billet ce jour-là et qu’il devait courir.',
									diagnosticFeedback: 'خطأ: وجود فعل القول وأداة الربط يجعله خطاباً غير مباشر عادياً لا حراً (DIL).'
								},
								{
									text: '« Comment le voyageur retrouvera-t-il son billet aujourd’hui ? Je dois courir ! »',
									diagnosticFeedback: 'خطأ: وجود المزدوجتين والمضارع والمستقبل يبقي الكلام خطاباً مباشراً.'
								},
								{
									text: 'Comment le voyageur retrouvera-t-il son billet aujourd’hui ? Il doit courir à la gare !',
									diagnosticFeedback: 'خطأ: في الخطاب غير المباشر الحر في سياق الماضي لا بد من تطابق الأزمنة (retrouverait / devait / ce jour-là).'
								}
							],
							rng
						)
					: buildUniqueMcqOptions(
							'Avait-elle vérifié toutes les dates de ce manuscrit la veille ? Elle ne pouvait pas publier une erreur !',
							[
								{
									text: 'Elle se demanda si elle avait vérifié toutes les dates de ce manuscrit la veille.',
									diagnosticFeedback: 'خطأ: وجود « se demanda si » يدل على خطاب غير مباشر عادي (DI) لا حر (DIL).'
								},
								{
									text: 'A-t-elle vérifié toutes les dates de ce manuscrit hier ? Elle ne peut pas publier une erreur !',
									diagnosticFeedback: 'خطأ: لم تُطبق قاعدة تطابق الأزمنة والظرف (Passé composé -> Plus-que-parfait، hier -> la veille).'
								},
								{
									text: '« Avait-elle vérifié toutes les dates la veille ? » dit-elle.',
									diagnosticFeedback: 'خطأ: لا نضع مزدوجتين ولا جملة معترضة في الخطاب غير المباشر الحر.'
								}
							],
							rng
						);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Choisissez la transposition exacte au discours indirect libre (DIL) du passage de l’exercice 2 :',
					questionTextAr: 'اختر التحويل الدقيق إلى الخطاب غير المباشر الحر (DIL) للفقرة المطلوبة:',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'في DIL نحذف المزدوجتين وفعل القول و « que/si »، ونطبق تطابق الأزمنة وضمائر الغائب مع إبقاء « ? » و « ! ».'
				},
				sujetExercise: {
					customTitle: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue',
					points: 6,
					instruction: 'Traitez les exercices suivants sur le discours indirect libre et les temps du récit et de l’anticipation :',
					content
				},
				hints: [
					'تذكر الفرق بين DI (مع فعل قول و que/si وبلا ؟ !) و DIL (بلا فعل قول ولا que مع بقاء ؟ ! وأزمنة الماضي).',
					'انتبه لمطابقة اسم المفعول مع المفعول المباشر المقدم « que » (une inscription que les artisans avaient gravée).',
					'بعد « Dès que / Lorsque » في الاستشراف المستقبلي، استعمل Futur antérieur ثم Futur simple.'
				],
				solutionStepsAr: [
					'تصنيف الأزمنة أو أشكال الخطاب المنقول في الجدول (1.5 نقطة).',
					'التحويل المزدوج الدقيق إلى DI ثم إلى DIL (2.5 نقطة).',
					'تصريف أفعال السرد الماضي ثم الاستشراف المستقبلي (2.0 نقطة).'
				],
				finalAnswer: 'Fonctionnement de la langue (6 pts) : Tableau (1.5 pt) + Transpositions DI et DIL (2.5 pts) + Temps du récit et anticipation (2.0 pts).'
			};
		}
	},
	{
		id: 'fre_tpl_2as_le_t3_exp_style_focalisation',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'discours_rhetorique',
		titleAr: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue : Focalisation, stylistique et lexique patrimonial (6 pts)',
		curriculumLessonId: 'fre_lesson_2as_le_t3_analyse_stylistique_visee',
		defaultPoints: 6,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const wfTable = buildFrenchWordFamilyTableBlock(
				variant === 0
					? [
							{
								verbe: { given: true, value: 'sauvegarder' },
								nom: { value: 'sauvegarde', mark: '0.5' },
								adjectif: { value: 'sauvegardé(e)', mark: '0.5' }
							},
							{
								verbe: { value: 'émouvoir', mark: '0.5' },
								nom: { given: true, value: 'émotion' },
								adjectif: { value: 'émouvant(e)', mark: '0.5' }
							}
						]
					: [
							{
								verbe: { given: true, value: 'restituer' },
								nom: { value: 'restitution', mark: '0.5' },
								adjectif: { value: 'restituable / restitué(e)', mark: '0.5' }
							},
							{
								verbe: { value: 'authentifier', mark: '0.5' },
								nom: { given: true, value: 'authenticité' },
								adjectif: { value: 'authentique', mark: '0.5' }
							}
						]
			);

			const focPrompt =
				variant === 0
					? '2. Identifiez la focalisation (zéro, interne ou externe) dans chaque extrait et justifiez en une courte phrase :\n  a) Un homme en manteau gris entra dans la gare, regarda l’horloge murale et s’assit sur un banc.\n  b) Brahim sentit son cœur se serrer ; cet inconnu lui semblait si accablé par l’inquiétude !\n  c) Le voyageur ignorait encore que l’horloger quittait au même moment son atelier pour le rejoindre et que leur amitié durerait vingt ans.'
					: '2. Identifiez la focalisation (zéro, interne ou externe) dans chaque extrait et justifiez en une courte phrase :\n  a) Meriem feuilleta lentement le parchemin : la finesse de la calligraphie lui parut aussitôt remarquable et l’émut profondément.\n  b) Deux visiteurs franchirent le portail de la Grande Mosquée, s’arrêtèrent devant le mihrab puis prirent des notes.\n  c) Sans qu’aucun habitant ne le devine encore, ce petit projet de jardin scolaire allait inspirer dix autres communes dans la décennie suivante.';

			const focAnswer =
				variant === 0
					? 'a) Focalisation externe (description purement extérieure de gestes observables, identité et pensées inconnues).\n  b) Focalisation interne (verbes de sensation et de perception « sentit », « lui semblait » filtrés par la conscience de Brahim).\n  c) Focalisation zéro / point de vue omniscient (le narrateur connaît les pensées de chacun, une scène simultanée ailleurs et l’avenir sur vingt ans).'
					: 'a) Focalisation interne (perceptions et émotions intimes de Meriem : « lui parut », « l’émut profondément »).\n  b) Focalisation externe (observation objective des gestes extérieurs uniquement, comme une caméra).\n  c) Focalisation zéro / point de vue omniscient (le narrateur connaît le futur sur une décennie que tous les personnages ignorent).';

			const stylePrompt =
				variant === 0
					? '3. Expliquez l’effet stylistique produit par :\n  a) L’enchaînement de phrases courtes au passé simple : « Brahim ferma sa porte, traversa la place, entra dans la gare et reconnut l’inconnu. »\n  b) L’emploi de la personnification : « Les vieilles pierres de Tlemcen racontent neuf siècles de savoir. »'
					: '3. Expliquez l’effet stylistique produit par :\n  a) Le contraste de rythme entre une longue phrase descriptive à l’imparfait et une phrase brève au passé simple.\n  b) Le choix du verbe « se dresser » plutôt que « il y a » dans : « Au sommet du Hodna se dresse le minaret séculaire. »';

			const styleAnswer =
				variant === 0
					? 'a) Effet d’accélération du rythme narratif traduisant l’urgence, la détermination et la vivacité de l’action morale.\n  b) Effet de valorisation vivante du patrimoine : les monuments apparaissent comme des témoins humains dotés d’une mémoire parlante.'
					: 'a) La phrase longue à l’imparfait installe une atmosphère calme et contemplative, puis la phrase brève au passé simple crée une rupture vive marquant l’événement décisif.\n  b) « se dresser » donne une impression de noblesse, de verticalité et de solidité historique, beaucoup plus expressive que le neutre « il y a ».' ;

			const content: ContentBlock[] = [
				{
					type: 'text',
					content: '1. Complétez le tableau de dérivation ci-dessous :',
					mark: ''
				},
				wfTable,
				{
					type: 'text',
					content: focPrompt,
					answer: focAnswer,
					mark: '2.5'
				},
				{
					type: 'text',
					content: stylePrompt,
					answer: styleAnswer,
					mark: '1.5'
				}
			];

			const mcq =
				variant === 0
					? buildUniqueMcqOptions(
							'a) Externe  |  b) Interne  |  c) Zéro (omnisciente)',
							[
								{
									text: 'a) Interne  |  b) Externe  |  c) Interne',
									diagnosticFeedback: 'خطأ: الجملة (a) تصف المظهر الخارجي فقط، و (b) تكشف شعور إبراهيم، و (c) تعرف المستقبل.'
								},
								{
									text: 'a) Zéro  |  b) Zéro  |  c) Externe',
									diagnosticFeedback: 'خطأ: في (a) لا نعرف حتى اسم الرجل ولا أفكاره فهي خارجية.'
								},
								{
									text: 'a) Externe  |  b) Zéro  |  c) Interne',
									diagnosticFeedback: 'خطأ: معرفة ما سيحدث بعد عشرين عاماً في (c) علامة حاسمة للرؤية الصفرية العالمة.'
								}
							],
							rng
						)
					: buildUniqueMcqOptions(
							'a) Interne  |  b) Externe  |  c) Zéro (omnisciente)',
							[
								{
									text: 'a) Externe  |  b) Interne  |  c) Externe',
									diagnosticFeedback: 'خطأ: الجملة (a) تكشف انفعال مريم الداخلي فهي داخلية، و (b) تكتفي بالحركات الظاهرة فهي خارجية.'
								},
								{
									text: 'a) Zéro  |  b) Externe  |  c) Interne',
									diagnosticFeedback: 'خطأ: الجملة (c) تكشف المستقبل الذي يجهله كل السكان فهي الرؤية الصفرية العالمة.'
								},
								{
									text: 'a) Interne  |  b) Zéro  |  c) Externe',
									diagnosticFeedback: 'خطأ: راجع مؤشرات المعرفة المحدودة في (b) والمعرفة المستقبلية في (c).'
								}
							],
							rng
						);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Associez dans l’ordre exact les trois focalisations (a, b, c) de l’exercice 2 :',
					questionTextAr: 'اختر الترتيب الصحيح لزوايا الرؤية الثلاث (a, b, c) في التمرين الثاني:',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'نفرق بين الخارجية (وصف مظاهر فقط)، والداخلية (أفعال شعور وإدراك شخصية واحدة)، والصفرية العالمة (معرفة المستقبل وجميع الشخصيات).'
				},
				sujetExercise: {
					customTitle: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue',
					points: 6,
					instruction: 'Traitez les exercices suivants de dérivation, d’analyse des points de vue et de stylistique :',
					content
				},
				hints: [
					'تذكر المؤشر السريع: « sans qu’il sache encore que dans dix ans... » => Focalisation zéro (omnisciente).',
					'الأفعال الإدراكية والعاطفية لشخصية واحدة (sentit, lui parut, l’émut) => Focalisation interne.',
					'في التحليل الأسلوبي اربط دائماً بين الأداة اللغوية (إيقاع الجمل، التشخيص) والأثر المقصود في القارئ.'
				],
				solutionStepsAr: [
					'إكمال جدول عائلة الكلمات (2.0 نقطة).',
					'تحديد وتعليل زوايا الرؤية الثلاث بدقة (2.5 نقطة).',
					'شرح الأثر الأسلوبي للإيقاع وللتشخيص/اختيار الفعل (1.5 نقطة).'
				],
				finalAnswer: 'Fonctionnement de la langue (6 pts) : Dérivation (2 pts) + 3 focalisations justifiées (2.5 pts) + Analyse stylistique (1.5 pt).'
			};
		}
	},
	{
		id: 'fre_tpl_2as_le_t3_writing_cr_critique_complet',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'production_ecrite',
		titleAr: 'II. Production écrite : Compte rendu critique complet ou nouvelle réaliste / reportage (8 pts — format LE)',
		curriculumLessonId: 'fre_lesson_2as_le_t3_cr_critique_complet',
		defaultPoints: 8,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const sujetUnPrompt =
				variant === 0
					? 'Rédigez le compte rendu critique complet (160 à 200 mots) de la nouvelle réaliste morale intitulée « Le carnet oublié du vieil horloger d’Alger » destinée à l’anthologie culturelle de votre lycée.'
					: 'Rédigez le compte rendu critique complet (160 à 200 mots) du reportage patrimonial intitulé « De Tlemcen à la Kalâa des Béni Hammad : pierres parlantes de l’histoire algérienne » pour le dossier d’excellence de la filière Langues Étrangères.';

			const sujetUnNotes =
				variant === 0
					? [
							'1re partie — Accroche (3 lignes) : genre (nouvelle réaliste morale), titre, cadre algérois, thème (la probité) et visée édifiante.',
							'2e partie — Résumé fidèle au présent et à la 3e personne (8 à 10 lignes) : ouverture de l’atelier, découverte du carnet contenant argent et billet, empathie de Brahim, course vers la gare, restitution intacte et refus de toute récompense.',
							'3e partie — Commentaire critique évaluatif (5 à 6 lignes) : apprécier la portée morale universelle du fond et les choix stylistiques de la forme (focalisation interne, discours indirect libre, alternance des temps du récit), puis formuler une nuance constructive.'
						]
					: [
							'1re partie — Accroche (3 lignes) : genre (reportage culturel patrimonial), titre, sites évoqués (Grande Mosquée de Tlemcen et Kalâa des Béni Hammad) et visée valorisante.',
							'2e partie — Résumé fidèle au présent et à la 3e personne (8 à 10 lignes) : description de la mosquée de Tlemcen, passage aux vestiges du Hodna, parole de l’archéologue restituée au discours indirect et appel final à la sauvegarde.',
							'3e partie — Commentaire critique évaluatif (5 à 6 lignes) : évaluer l’intérêt historique du fond et l’efficacité de la forme (lexique mélioratif, comparaison/métaphore, personnification, présent de reportage), avec une remarque constructive finale.'
						];

			const sujetDeuxPrompt =
				variant === 0
					? 'Rédigez une courte nouvelle réaliste morale (180 à 220 mots) se déroulant dans une ville algérienne de votre choix et illustrant la valeur de la probité, de la solidarité ou du respect de la parole donnée. Votre récit devra combiner imparfait, passé simple, plus-que-parfait, focalisation interne et un bref passage au discours indirect libre.'
					: 'Dans le cadre d’un numéro spécial « Regards sur l’Algérie de demain », rédigez un récit d’anticipation éthique ou un reportage culturel approfondi (180 à 220 mots) mettant en valeur la préservation du patrimoine et de l’eau, en variant les temps verbaux et les procédés stylistiques étudiés durant le trimestre.';

			const modelAnswer =
				variant === 0
					? 'Cette nouvelle réaliste morale, intitulée « Le carnet oublié du vieil horloger d’Alger », met en scène un épisode exemplaire de la vie quotidienne algéroise afin d’émouvoir le lecteur et d’illustrer la grandeur morale de la probité.\n\nDans un premier temps, le narrateur présente maître Brahim, un horloger intègre d’Alger-Centre qui découvre sur son établi un carnet en cuir noir oublié peu avant par un voyageur pressé. En l’ouvrant pour identifier le propriétaire, l’artisan y trouve une importante somme d’argent ainsi qu’un billet de train pour Annaba prévu l’après-midi même. Aussitôt saisi par l’inquiétude qu’éprouve certainement l’inconnu, Brahim ferme sa boutique et gagne rapidement la gare. Il retrouve le voyageur angoissé, lui restitue le carnet intact et décline toute récompense en affirmant que la paix du cœur suffit à qui rend un dépôt.\n\nSur le plan critique, cette nouvelle séduit par la sobriété et la force édifiante de son message moral, pleinement ancré dans le réel. Sur le plan de la forme, la maîtrise des temps du récit, l’emploi judicieux de la focalisation interne et le recours au discours indirect libre nous plongent avec justesse dans la conscience de l’artisan. Tout au plus aurait-on apprécié un bref portrait supplémentaire du voyageur afin de prolonger encore l’émotion du dénouement.'
					: 'Ce reportage culturel patrimonial, intitulé « De Tlemcen à la Kalâa des Béni Hammad : pierres parlantes de l’histoire algérienne », met en regard deux hauts lieux de l’architecture médiévale d’Algérie afin de les faire découvrir, d’en valoriser la richesse et de sensibiliser les lecteurs à leur préservation.\n\nTout d’abord, le reporter guide le lecteur dans l’atmosphère apaisante de la Grande Mosquée de Tlemcen, en soulignant la cour d’onyx, les arches élancées et la finesse géométrique du mihrab du XIe siècle. Ensuite, il se tourne vers les montagnes du Hodna où s’élèvent les vestiges et le minaret ocre de la Kalâa des Béni Hammad. Il rapporte alors les propos d’un jeune archéologue algérien selon lequel la restauration de ces sites offre aux étudiants un véritable livre d’architecture vivant. Enfin, l’article invite les jeunes générations à associer recherche scientifique et tourisme respectueux pour assurer la pérennité de ces joyaux.\n\nD’un point de vue critique, ce reportage brille par la pertinence de son rapprochement historique entre l’ouest et l’est du pays. Quant à la forme, le présent de reportage, le lexique mélioratif et des images expressives telles que « sentinelle de mémoire » rendent la lecture particulièrement vivante et accessible. Toutefois, l’ajout de quelques dates précises de restauration récente aurait encore enrichi la portée informative du texte.';

			const block = buildFrenchWrittenProductionBlock({
				sujetUnTitle: 'Sujet 1 (Compte rendu critique complet — 8 pts LE) :',
				sujetUnPrompt,
				sujetUnNotes,
				sujetDeuxPrompt,
				modelAnswer,
				rubricSummary:
					'Accroche complète (genre, titre, cadre, thème, visée) (1.5 pt) | Résumé objectif fidèle au présent et à la 3e personne (2.5 pts) | Partie critique nuancée et justifiée sur le fond et la forme (2.5 pts) | Maîtrise linguistique, cohérence, lexique critique et présentation (1.5 pt)',
				mark: '8.0'
			});

			const mcq = buildUniqueMcqOptions(
				'Présenter le texte dans l’accroche, résumer fidèlement ses étapes au présent et à la 3e personne, puis consacrer un troisième paragraphe argumenté à la critique du fond et de la forme',
				[
					{
						text: 'Réécrire la nouvelle entière au passé simple sans aucune accroche ni évaluation critique',
						diagnosticFeedback: 'خطأ: إعادة السرد بالماضي البسيط دون مقدمة ولا نقد تخالف منهجية التقرير النقدي.'
					},
					{
						text: 'Limiter la partie critique à une seule phrase vague telle que « ce texte est très joli »',
						diagnosticFeedback: 'خطأ: التعليق النقدي في 2AS LE يجب أن يكون مفصلاً ومعللاً بمؤشرات المضمون والشكل.'
					},
					{
						text: 'Recopier intégralement le discours direct du texte sans le synthétiser au discours indirect',
						diagnosticFeedback: 'خطأ: في الملخص نلخص الأقوال بالخطاب غير المباشر وبأسلوبنا الخاص.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Quelle structure assure l’obtention de la note maximale (8/8) au compte rendu critique complet en 2AS LE ?',
					questionTextAr: 'ما البنية التي تضمن العلامة الكاملة (8/8) في التقرير النقدي الكامل لشعبة اللغات الأجنبية؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'يتألف التقرير النقدي الكامل من ثلاث فقرات محكمة: مقدمة تعريفية، ملخص موضوعي في الحاضر وبضمير الغائب، ثم تقييم نقدي معلل للمضمون والشكل.'
				},
				sujetExercise: {
					customTitle: 'II. Production écrite',
					points: 8,
					instruction: 'Traitez l’UN des deux sujets au choix en veillant à la rigueur structurelle et stylistique :',
					content: [block]
				},
				hints: [
					'تذكر: يُحرر ملخص القصة أو الروبورتاج دائماً في زمن المضارع (Présent) وبضمير الغائب.',
					'في الفقرة الثالثة النقدية، استخدم مصطلحات دقيقة: portée morale, focalisation interne, discours indirect libre, présent de reportage.',
					'اختم الفقرة النقدية بملاحظة بناءة لطيفة تبرز نضجك القرائي (Toutefois, on aurait apprécié...).'
				],
				solutionStepsAr: [
					'كتابة المقدمة التعريفية الدقيقة (Accroche).',
					'إعادة صياغة مضمون النص بحياد في الحاضر وبضمير الغائب (Résumé objectif).',
					'تحرير التعليق النقدي المعمق (مضموناً وشكلاً) ومراجعة الإملاء والتراكيب.'
				],
				finalAnswer: 'Production écrite (8 pts) : Compte rendu critique complet (ou nouvelle réaliste / reportage) avec corrigé modèle et barème.'
			};
		}
	}
];
