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

export const TEMPLATES_2AS_LE_T1: FrenchParameterizedTemplate[] = [
	{
		id: 'fre_tpl_2as_le_t1_comp_sciences_savoirs',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'comprehension_ecrit',
		titleAr: 'I. Compréhension de l’écrit — A) Étude du texte : Savoirs mathématiques et astronomiques (6 pts)',
		curriculumLessonId: 'fre_lesson_2as_le_t1_procedes_objectivation',
		defaultPoints: 6,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			if (variant === 0) {
				const passage = buildFrenchPassageBlock({
					title: 'Al-Khwarizmi et la naissance méthodique de l’algèbre et des algorithmes',
					paragraphs: [
						'Au IXe siècle, au sein de la Maison de la Sagesse à Bagdad, le mathématicien musulman Al-Khwarizmi rédigea un ouvrage fondateur consacré à la résolution systématique des équations. Le mot même « algèbre » dérive directement du terme arabe al-jabr figurant dans le titre de son traité, tandis que le nom du savant a donné naissance au concept d’algorithme, c’est-à-dire une procédure finie et ordonnée permettant de résoudre un problème de calcul.',
						'Contrairement aux démarches antérieures qui traitaient des cas isolés, Al-Khwarizmi élabore une méthode générale et abstraite afin que les juristes, les arpenteurs et les commerçants puissent appliquer [[ses]] règles à des situations variées : partage d’héritages, mesure des terrains ou calcul des échanges. Il est également démontré par les historiens que son traité sur la numération décimale diffusa l’usage du zéro et du système de position vers le monde méditerranéen.',
						'Par conséquent, l’héritage intellectuel d’Al-Khwarizmi dépasse le cadre historique médiéval. Aujourd’hui encore, toute l’informatique contemporaine repose sur la logique algorithmique dont [[il]] a posé les premiers jalons avec une rigueur universelle.'
					],
					source: 'D’après les Annales d’Histoire des Mathématiques (texte adapté)',
					glossary: [
						{ term: 'arpenteur', meaning: 'spécialiste chargé de mesurer la superficie des terrains agricoles ou urbains' },
						{ term: 'jalons', meaning: 'premiers repères essentiels ouvrant la voie à une discipline' }
					]
				});

				const content: ContentBlock[] = [
					passage,
					{
						type: 'text',
						content:
							'1. Quels sont les deux apports majeurs d’Al-Khwarizmi exposés dans ce texte et quelle est la visée communicative de l’auteur ?',
						answer:
							'Apports : 1) la fondation méthodique de l’algèbre et des algorithmes ; 2) la diffusion de la numération décimale et du zéro. Visée communicative : informer et expliquer objectivement l’impact durable de ce savant sur les mathématiques et l’informatique.',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'2. Relevez dans le texte :\n  a) Une étymologie (origine d’un terme) et une reformulation (§1).\n  b) Trois applications pratiques de sa méthode générale (§2).',
						answer:
							'a) Étymologie : « Le mot algèbre dérive directement du terme arabe al-jabr » (ou le nom ayant donné algorithme) ; Reformulation : « c’est-à-dire une procédure finie et ordonnée permettant de résoudre un problème de calcul ».\n  b) Applications : le partage d’héritages, la mesure des terrains et le calcul des échanges commerciaux.',
						mark: '2.0'
					},
					{
						type: 'text',
						content:
							'3. Relevez dans le deuxième paragraphe une marque d’objectivation scientifique et précisez le rapport logique introduit par « afin que » ainsi que le mode du verbe qui le suit.',
						answer:
							'Marque d’objectivation : la tournure impersonnelle passive « Il est également démontré par les historiens que » (et l’effacement total de l’énonciateur). | « afin que » introduit le but et exige le subjonctif présent (« puissent »).',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'4. À qui renvoient « ses » (§2) et « il » (§3) ?',
						answer:
							'« ses » et « il » renvoient tous deux au mathématicien Al-Khwarizmi.',
						mark: '1.0'
					}
				];

				const mcq = buildUniqueMcqOptions(
					'Une procédure méthodique générale applicable à de nombreux problèmes pratiques et fondatrice de l’informatique',
					[
						{
							text: 'Une simple liste de cas isolés réservés exclusivement aux poètes',
							diagnosticFeedback: 'خطأ: النص يوضح أنه تجاوز الحالات المعزولة إلى منهجية عامة شاملة.'
						},
						{
							text: 'Un rejet complet du système de numération décimale et du zéro',
							diagnosticFeedback: 'خطأ: بالعكس، نشر الخوارزمي النظام العشري واستعمال الصفر.'
						},
						{
							text: 'Une théorie dépassée sans aucun lien avec les sciences modernes',
							diagnosticFeedback: 'خطأ: الفقرة الثالثة تؤكد أن المعلوماتية المعاصرة تقوم على المنطق الخوارزمي.'
						}
					],
					rng
				);

				return {
					templateId: this.id,
					seed,
					grade: '2as_le',
					trimesterId: 't1',
					difficulty,
					domain: this.domain,
					titleAr: this.titleAr,
					examRole: 'comprehension',
					quizQuestion: {
						type: 'mcq',
						questionText: 'En quoi l’œuvre d’Al-Khwarizmi se distingue-t-elle des approches mathématiques antérieures selon le texte ?',
						questionTextAr: 'بمَ يتميز عمل الخوارزمي عن المقاربات الرياضية السابقة بحسب النص؟',
						questionData: {
							options: mcq.options,
							correctIndex: mcq.correctIndices[0],
							correctIndices: mcq.correctIndices,
							correctIndexes: mcq.correctIndices
						},
						explanation: 'انتقل الخوارزمي من معالجة حالات متفرقة إلى صياغة منهجية عامة مجردة وعمليات خوارزمية منظمة.'
					},
					sujetExercise: {
						customTitle: 'I. Compréhension de l’écrit — A) Étude du texte',
						points: 6,
						instruction: 'Lisez attentivement le texte ci-dessous puis répondez aux questions :',
						content
					},
					hints: [
						'ابحث في الفقرة الأولى عن الأصل الاشتقاقي لمصطلحي الجبر والخوارزمية وعن الرابط « c’est-à-dire ».',
						'تأكد في الفقرة الثانية من العلاقة المنطقية لـ « afin que » ومن الصيغة الفعلية « puissent ».',
						'اربط بين التركيب « Il est démontré par les historiens que » ومفهوم التجريد الموضوعي.'
					],
					solutionStepsAr: [
						'تحديد الإسهامين الرئيسيين للخوارزمي والغاية التواصلية (1.5 نقطة).',
						'استخراج الإيتيمولوجيا وإعادة الصياغة والتطبيقات الثلاثة (2.0 نقطة).',
						'رصد مؤشر الموضوعية وتحليل رابط الغاية وصيغة Subjonctif (1.5 نقطة).',
						'تعيين عائد الكلمتين المسطرتين (1.0 نقطة).'
					],
					finalAnswer: 'Étude du texte (6 pts) : Al-Khwarizmi ; étymologie + reformulation + 3 applications ; objectivation + afin que (Subjonctif) ; référents.'
				};
			}

			const passage = buildFrenchPassageBlock({
				title: 'Al-Birouni : mesure géométrique de la Terre et rigueur d’observation',
				paragraphs: [
					'Érudit polyvalent du XIe siècle, Al-Birouni s’est illustré en astronomie, en géographie mathématique et en minéralogie. Refusant toute spéculation hâtive, il affirmait qu’une théorie scientifique ne vaut que par la précision de ses mesures et par la vérification répétée des résultats sur le terrain.',
					'Pour déterminer le rayon de la Terre sans devoir parcourir d’immenses distances désertiques, [[le savant]] conçut une méthode trigonométrique ingénieuse. Depuis le sommet d’une montagne dont il avait d’abord calculé la hauteur exacte, il mesura l’angle d’inclinaison de l’horizon à l’aide d’un grand astrolabe. Grâce à ce calcul géométrique, il obtint un rayon de 6 339,6 kilomètres, autrement dit une valeur si proche de la mesure satellitaire actuelle que la marge d’erreur demeure inférieure à 1 pour cent.',
					'On observe ainsi dans l’œuvre d’Al-Birouni une alliance exemplaire entre mathématiques théoriques et observation instrumentale. Selon certains historiens, cette précision méthodologique aurait inspiré plusieurs générations d’astronomes orientaux et méditerranéens.'
				],
				source: 'D’après une étude d’histoire de l’astronomie et de la géodésie (texte adapté)',
				glossary: [
					{ term: 'spéculation hâtive', meaning: 'hypothèse avancée trop vite sans vérification expérimentale' },
					{ term: 'trigonométrique', meaning: 'relatif au calcul mathématique des angles et des distances dans un triangle' }
				]
			});

			const content: ContentBlock[] = [
				passage,
				{
					type: 'text',
					content:
						'1. Quel principe méthodologique guidait les recherches d’Al-Birouni et quel exploit scientifique ce texte explique-t-il ?',
					answer:
						'Principe : une théorie scientifique ne vaut que par la précision de ses mesures et la vérification répétée sur le terrain. Exploit : le calcul trigonométrique du rayon de la Terre depuis le sommet d’une montagne avec moins de 1 pour cent d’erreur.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'2. Relevez dans le deuxième paragraphe :\n  a) Une quantification précise et une reformulation.\n  b) Les deux grandeurs mesurées par Al-Birouni pour effectuer son calcul.',
					answer:
						'a) Quantification : « 6 339,6 kilomètres » (ou « inférieure à 1 pour cent ») ; Reformulation : « autrement dit une valeur si proche de la mesure satellitaire actuelle... ».\n  b) Les deux grandeurs : la hauteur exacte de la montagne et l’angle d’inclinaison de l’horizon.',
					mark: '2.0'
				},
				{
					type: 'text',
					content:
						'3. Quelle est la valeur du conditionnel passé « aurait inspiré » (§3) et quel rapport logique exprime « si proche ... que » (§2) ?',
					answer:
						'« aurait inspiré » (précédé de « Selon certains historiens ») est un conditionnel d’hypothèse / de réserve scientifique (information non confirmée avec certitude absolue). | « si proche ... que » exprime la conséquence liée à l’intensité.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4. Quel type de substitut constitue l’expression soulignée « le savant » (§2) et à qui renvoie-t-elle ?',
						answer:
							'C’est un substitut lexical qui renvoie à Al-Birouni (érudit polyvalent du XIe siècle).',
					mark: '1.0'
				}
			];

			const mcq = buildUniqueMcqOptions(
				'La prudence scientifique face à une influence historique probable mais non prouvée de façon absolue',
				[
					{
						text: 'Un ordre formel donné par Al-Birouni aux astronomes actuels',
						diagnosticFeedback: 'خطأ: الشرطي الماضي مع « Selon certains historiens » يدل على الاحتراز العلمي.'
					},
					{
						text: 'Un rejet catégorique des résultats de la trigonométrie',
						diagnosticFeedback: 'خطأ: النص يثبت دقة قياساته بهامش خطأ يقل عن 1 في المائة.'
					},
					{
						text: 'Une action quotidienne habituelle dans le présent',
						diagnosticFeedback: 'خطأ: « aurait inspiré » شرطي ماضٍ لا مضارع عادة.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Quelle nuance exprime le conditionnel passé « aurait inspiré » précédé de « Selon certains historiens » ?',
					questionTextAr: 'ما الدلالة العلمية التي يعبر عنها الشرطي الماضي « aurait inspiré » المسبوق بـ « Selon certains historiens »؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'يُستعمل الشرطي العلمي (Conditionnel de réserve) للتعبير عن فرضية تاريخية محتملة دون الجزم القطعي.'
				},
				sujetExercise: {
					customTitle: 'I. Compréhension de l’écrit — A) Étude du texte',
					points: 6,
					instruction: 'Lisez attentivement le texte ci-dessous puis répondez aux questions :',
					content
				},
				hints: [
					'تتبع في الفقرة الثانية خطوتي القياس الهندسي (ارتفاع الجبل وزاوية الأفق) والرقم الدقيق المحصّل.',
					'انتبه لعبارة « Selon certains historiens » قبل الشرطي الماضي لتفسير قيمته العلمية.',
					'ميز بين البديل النحوي (ضمير) والبديل المعجمي (عبارة اسمية مثل le savant).'
				],
				solutionStepsAr: [
					'تحديد المبدأ المنهجي والإنجاز العلمي للبيروني (1.5 نقطة).',
					'استخراج التحديد الكمي وإعادة الصياغة والمقدارين المقيسين (2.0 نقطة).',
					'تحليل قيمة الشرطي الماضي وعلاقة النتيجة « si... que » (1.5 نقطة).',
					'تحديد نوع وعائد البديل المعجمي المسطر (1.0 نقطة).'
				],
				finalAnswer: 'Étude du texte (6 pts) : Al-Birouni ; quantification + reformulation ; conditionnel de réserve + conséquence ; substitut lexical.'
			};
		}
	},
	{
		id: 'fre_tpl_2as_le_t1_comp_histoire_medecine_geo',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'comprehension_ecrit',
		titleAr: 'I. Compréhension de l’écrit — A) Étude du texte : Chirurgie d’Al-Zahrawi et cartographie d’Al-Idrisi (6 pts)',
		curriculumLessonId: 'fre_lesson_2as_le_t1_present_modes',
		defaultPoints: 6,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			if (variant === 0) {
				const passage = buildFrenchPassageBlock({
					title: 'Al-Zahrawi et l’essor de la chirurgie méthodique en Andalousie',
					paragraphs: [
						'Au tournant de l’an 1000, le médecin andalou Al-Zahrawi achève à Cordoue son encyclopédie médicale monumentale intitulée « Al-Tasrif », composée de trente volumes. Le dernier tome, entièrement consacré à la chirurgie, transforme une pratique jusque-là empirique en une discipline scientifique rigoureuse fondée sur l’anatomie.',
						'Dans cet ouvrage illustré, plus de deux cents instruments chirurgicaux sont dessinés avec minutie : scalpels, pinces, sondes et aiguilles de suture. Al-Zahrawi recommande notamment l’emploi de fils résorbables d’origine naturelle afin que les plaies internes cicatrisent sans nécessiter une seconde intervention. Il insiste par ailleurs sur l’hygiène stricte des mains et des outils, de crainte que des infections ne compromettent la guérison du patient.',
						'Traduit en latin dès le XIIe siècle, [[ce traité]] servit de manuel de référence dans les facultés de médecine européennes pendant près de cinq cents ans. Il illustre combien la rigueur clinique et le sens éthique du soin constituent des principes permanents de la médecine.'
					],
					source: 'D’après une revue d’histoire de la médecine méditerranéenne (texte adapté)',
					glossary: [
						{ term: 'empirique', meaning: 'fondé uniquement sur l’habitude pratique sans théorie scientifique organisée' },
						{ term: 'résorbable', meaning: 'qui disparaît naturellement dans l’organisme au fil de la cicatrisation' }
					]
				});

				const content: ContentBlock[] = [
					passage,
					{
						type: 'text',
						content:
							'1. En quoi le dernier volume d’Al-Tasrif marque-t-il un tournant dans l’histoire de la chirurgie ?',
						answer:
							'Il transforme la chirurgie, jusque-là purement empirique, en une discipline scientifique rigoureuse fondée sur l’anatomie, l’illustration précise des instruments et l’hygiène clinique.',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'2. Relevez dans le texte :\n  a) Une énumération d’instruments chirurgicaux (§2).\n  b) Deux précautions médicales recommandées par Al-Zahrawi et leur finalité (but).',
						answer:
							'a) Énumération : « scalpels, pinces, sondes et aiguilles de suture ».\n  b) Précautions et buts : 1) fils résorbables afin que les plaies internes cicatrisent sans seconde intervention ; 2) hygiène stricte des mains et des outils de crainte que des infections ne compromettent la guérison.',
						mark: '2.0'
					},
					{
						type: 'text',
						content:
							'3. Quelle est la valeur du présent dans : « Au tournant de l’an 1000, Al-Zahrawi achève son encyclopédie » (§1) ? Et dans : « la rigueur clinique et le sens éthique constituent des principes permanents » (§3) ?',
						answer:
							'§1 (« achève » avec date passée « l’an 1000 ») : présent de narration (historique). | §3 (« constituent des principes permanents ») : présent de vérité générale.',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'4. À quoi renvoie l’expression soulignée « ce traité » (§3) et quelle est sa nature de substitut ?',
						answer:
							'« ce traité » renvoie à l’encyclopédie médicale « Al-Tasrif » (et particulièrement son tome chirurgical). C’est un substitut lexical.',
						mark: '1.0'
					}
				];

				const mcq = buildUniqueMcqOptions(
					'Un présent de narration (historique) dans le §1, puis un présent de vérité générale dans le §3',
					[
						{
							text: 'Un présent de futur proche dans les deux paragraphes',
							diagnosticFeedback: 'خطأ: الجملة الأولى مؤرخة بسنة 1000 م، والأخيرة تقرير لمبدأ علمي دائم.'
						},
						{
							text: 'Un présent d’habitude quotidienne dans le §1 et un présent impératif dans le §3',
							diagnosticFeedback: 'خطأ: إتمام الموسوعة حدث تاريخي فريد، والفقرة الثالثة جملة خبرية دائمة.'
						},
						{
							text: 'Un présent d’énonciation identique dans les deux cas',
							diagnosticFeedback: 'خطأ: يختلف السياق بوضوح بين التأريخ الماضي والحقيقة الطبية الثابتة.'
						}
					],
					rng
				);

				return {
					templateId: this.id,
					seed,
					grade: '2as_le',
					trimesterId: 't1',
					difficulty,
					domain: this.domain,
					titleAr: this.titleAr,
					examRole: 'comprehension',
					quizQuestion: {
						type: 'mcq',
						questionText: 'Quelles sont les deux valeurs distinctes du présent employées dans le §1 (« achève ») et le §3 (« constituent ») ?',
						questionTextAr: 'ما القيمتان المختلفتان للمضارع في الفقرة الأولى (« achève ») والفقرة الثالثة (« constituent »)؟',
						questionData: {
							options: mcq.options,
							correctIndex: mcq.correctIndices[0],
							correctIndices: mcq.correctIndices,
							correctIndexes: mcq.correctIndices
						},
						explanation: 'مع التاريخ الماضي (l’an 1000) يُعد المضارع سردياً/تاريخياً، ومع القوانين والمبادئ الدائمة يُعد مضارع حقيقة عامة.'
					},
					sujetExercise: {
						customTitle: 'I. Compréhension de l’écrit — A) Étude du texte',
						points: 6,
						instruction: 'Lisez attentivement le texte ci-dessous puis répondez aux questions :',
						content
					},
					hints: [
						'ابحث في الفقرة الثانية عن أداتي الغاية « afin que » و « de crainte que ».',
						'لاحظ التاريخ الماضي « l’an 1000 » في الفقرة الأولى مقابل صفة « permanents » في الفقرة الثالثة.',
						'استخرج المعجم الجراحي المتخصص لتأكيد فهمك للتعداد.'
					],
					solutionStepsAr: [
						'تبيين النقلة العلمية للزهراوي في الجراحة (1.5 نقطة).',
						'استخراج التعداد واحتياطين طبيين مع غايتهما (2.0 نقطة).',
						'التمييز الدقيق بين المضارع السردي ومضارع الحقيقة العامة (1.5 نقطة).',
						'تحديد عائد ونوع البديل « ce traité » (1.0 نقطة).'
					],
					finalAnswer: 'Étude du texte (6 pts) : Al-Zahrawi ; énumération + 2 précautions/buts ; présent de narration vs vérité générale ; substitut lexical.'
				};
			}

			const passage = buildFrenchPassageBlock({
				title: 'Al-Idrisi et la précision cartographique dans la géographie médiévale',
				paragraphs: [
					'En 1154, après quinze années d’enquêtes méthodiques, le géographe musulman Al-Idrisi achève son célèbre ouvrage géographique accompagné d’une grande mappemonde gravée sur un disque d’argent. Pour réaliser cette synthèse monumentale, il ne s’est pas contenté de recopier des textes anciens : il a interrogé des navigateurs, des marchands et des voyageurs venus d’Afrique du Nord, d’Europe et d’Asie afin de recouper chaque itinéraire.',
					'Le monde connu y est divisé en sept zones climatiques, appelées climats, elles-mêmes subdivisées en dix sections régionales, soit soixante-dix cartes détaillées. Les fleuves, les chaînes de montagnes, les ports méditerranéens — tels que Béjaïa, Alger et Oran — ainsi que les distances entre les cités sont notés avec une rigueur remarquable pour l’époque.',
					'Grâce à cette démarche comparative, [[l’œuvre d’Al-Idrisi]] constitue un jalon décisif de la cartographie scientifique. En géographie, la fiabilité d’une carte dépend toujours de la confrontation patiente entre l’observation directe et l’analyse critique des sources.'
				],
				source: 'D’après un dossier d’histoire de la cartographie méditerranéenne (texte adapté)',
				glossary: [
					{ term: 'mappemonde', meaning: 'représentation plane de l’ensemble des terres et des mers du globe' },
					{ term: 'recouper', meaning: 'vérifier une donnée en la comparant à plusieurs témoignages indépendants' }
				]
			});

			const content: ContentBlock[] = [
				passage,
				{
					type: 'text',
					content:
						'1. Quelle méthode rigoureuse Al-Idrisi a-t-il suivie durant quinze ans pour dresser sa célèbre carte du monde ?',
					answer:
						'Au lieu de recopier simplement les anciens textes, il a mené des enquêtes directes auprès de navigateurs, marchands et voyageurs de trois continents afin de recouper et vérifier chaque itinéraire.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'2. Relevez dans le deuxième paragraphe :\n  a) Une dénomination et une quantification précise.\n  b) Trois villes côtières algériennes mentionnées à titre d’illustration.',
					answer:
						'a) Dénomination : « appelées climats » ; Quantification : « sept zones climatiques », « dix sections régionales », « soixante-dix cartes détaillées ».\n  b) Villes algériennes : Béjaïa, Alger et Oran.',
					mark: '2.0'
				},
				{
					type: 'text',
					content:
						'3. Distinguez la valeur du présent dans « En 1154, Al-Idrisi achève... » (§1) et dans « la fiabilité d’une carte dépend toujours... » (§3). Pourquoi a-t-on employé « afin de » au lieu de « afin que » au §1 ?',
					answer:
						'§1 (« achève ») : présent de narration (historique). | §3 (« dépend toujours ») : présent de vérité générale. | « afin de + infinitif » (« afin de recouper ») est obligatoire car le sujet des deux verbes est identique (Al-Idrisi).',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4. Relevez dans le deuxième paragraphe un verbe à la voix passive et décomposez le mot savant « cartographie » (§3).',
						answer:
							'Voix passive : « est divisé » ou « sont notés ». | Composition savante : carto- (carte) + -graphie (tracé, dessin, description).',
					mark: '1.0'
				}
			];

			const mcq = buildUniqueMcqOptions(
				'Parce que le verbe principal (« a interrogé ») et le verbe du but (« recouper ») ont exactement le même sujet (Al-Idrisi)',
				[
					{
						text: 'Parce que « afin que » n’existe pas dans la langue française moderne',
						diagnosticFeedback: 'خطأ: « afin que » تستعمل عندما يختلف فاعل الجملتين.'
					},
					{
						text: 'Parce que le verbe recouper ne se conjugue jamais au subjonctif',
						diagnosticFeedback: 'خطأ: الفعل recouper يتصرف طبيعياً، والسبب هو وحدة الفاعل.'
					},
					{
						text: 'Parce que la phrase exprime une cause et non un but',
						diagnosticFeedback: 'خطأ: « afin de » تعبر عن الغاية (Le but).'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Pourquoi l’auteur écrit-il « afin de recouper » (infinitif) et non « afin qu’il recoupe » dans le premier paragraphe ?',
					questionTextAr: 'لماذا استعمل الكاتب المصدر « afin de recouper » بدل « afin qu’il recoupe » في الفقرة الأولى؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'عند تطابق فاعل الفعلين (الإدريسي هو من استجوب وهو من قاطع المعلومات) يجب استعمال « afin de + Infinitif ».'
				},
				sujetExercise: {
					customTitle: 'I. Compréhension de l’écrit — A) Étude du texte',
					points: 6,
					instruction: 'Lisez attentivement le texte ci-dessous puis répondez aux questions :',
					content
				},
				hints: [
					'لاحظ المدن الساحلية الجزائرية الثلاث المذكورة بين مطتين في الفقرة الثانية.',
					'فرّق بين المضارع السردي المؤرخ بسنة 1154 ومضارع الحقيقة العامة في الجملة الأخيرة.',
					'تذكر قاعدة وحدة الفاعل مع أدوات الغاية (afin de + infinitif).'
				],
				solutionStepsAr: [
					'بيان المنهج التحقيقي والمقاطعة العلمية لدى الإدريسي (1.5 نقطة).',
					'استخراج التسمية والتحديد الكمي والمدن الجزائرية الثلاث (2.0 نقطة).',
					'التمييز بين قيمتي المضارع وتعليل استعمال المصدر مع الغاية (1.5 نقطة).',
					'استخراج المبني للمجهول وتفكيك المصطلح العلمي cartographie (1.0 نقطة).'
				],
				finalAnswer: 'Étude du texte (6 pts) : Al-Idrisi ; méthode comparative ; dénomination + quantification + 3 villes ; valeurs du présent + afin de ; cartographie.'
			};
		}
	},
	{
		id: 'fre_tpl_2as_le_t1_exp_syntaxe_modes',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'grammaire_syntaxe',
		titleAr: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue : Phrase complexe, circonstancielles et modes (6 pts)',
		curriculumLessonId: 'fre_lesson_2as_le_t1_phrase_complexe',
		defaultPoints: 6,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const modeTable = buildFrenchClassificationTableBlock(
				variant === 0
					? {
							columns: [
								{
									header: 'Indicatif (Fait avéré)',
									items: ['parce que', 'si bien que'],
									mark: '0.5'
								},
								{
									header: 'Subjonctif (But / Condition)',
									items: ['afin que', 'à condition que'],
									mark: '0.5'
								},
								{
									header: 'Conditionnel (Hypothèse)',
									items: ['au cas où', 'dans l’hypothèse où'],
									mark: '0.5'
								}
							]
						}
					: {
							columns: [
								{
									header: 'Indicatif (Réalité)',
									items: ['puisque', 'de sorte que (résultat réel)'],
									mark: '0.5'
								},
								{
									header: 'Subjonctif (Restriction / Crainte)',
									items: ['de crainte que', 'trop... pour que'],
									mark: '0.5'
								},
								{
									header: 'Conditionnel (Éventualité)',
									items: ['au cas où', 'dans le cas où'],
									mark: '0.5'
								}
							]
						}
			);

			const conjList =
				variant === 0
					? '(afin que, au cas où, parce que, à condition que, si bien que, dans l’hypothèse où)'
					: '(de crainte que, puisque, au cas où, trop... pour que, de sorte que — résultat réel, dans le cas où)';

			const transformPrompt =
				variant === 0
					? '2. Reliez chaque couple de propositions selon le rapport demandé en choisissant rigoureusement le mode verbal (ou l’infinitif) :\n  a) Al-Zahrawi dessina ses instruments avec précision. Les étudiants pouvaient les reproduire exactement. (But : « afin que »)\n  b) Al-Idrisi interrogea des voyageurs. Il voulait vérifier ses cartes. (But : attention aux sujets !)\n  c) Le traité d’Al-Khwarizmi était extrêmement clair. Les savants méditerranéens le traduisirent rapidement. (Conséquence : « si... que »)'
					: '2. Reliez chaque couple de propositions selon le rapport demandé en choisissant rigoureusement le mode verbal (ou l’infinitif) :\n  a) Les conservateurs numérisent les manuscrits. Les lecteurs pourront les consulter à distance. (But : « pour que »)\n  b) Al-Birouni construisit un grand astrolabe. Il désirait mesurer l’angle de l’horizon. (But : attention aux sujets !)\n  c) La mesure était très rigoureuse. La marge d’erreur est restée inférieure à un pour cent. (Conséquence : « si... que »)';

			const transformAnswer =
				variant === 0
					? 'a) Al-Zahrawi dessina ses instruments avec précision afin que les étudiants puissent les reproduire exactement.\n  b) Al-Idrisi interrogea des voyageurs afin de (pour) vérifier ses cartes. (Même sujet : infinitif obligatoire).\n  c) Le traité d’Al-Khwarizmi était si clair que les savants méditerranéens le traduisirent rapidement.'
					: 'a) Les conservateurs numérisent les manuscrits pour que les lecteurs puissent les consulter à distance.\n  b) Al-Birouni construisit un grand astrolabe afin de (pour) mesurer l’angle de l’horizon. (Même sujet : infinitif obligatoire).\n  c) La mesure était si rigoureuse que la marge d’erreur est restée inférieure à un pour cent.';

			const objPrompt =
				variant === 0
					? '3. Mettez les verbes entre parenthèses au mode et au temps exacts :\n  a) Les archives gardent une copie de secours au cas où l’original (subir) une dégradation.\n  b) Ce dispositif optique est trop délicat pour qu’un novice le (manipuler) sans encadrement.\n  c) Il est établi que la Terre (tourner) autour du Soleil. (Précisez la valeur du présent).'
					: '3. Mettez les verbes entre parenthèses au mode et au temps exacts :\n  a) L’historien note ses références au cas où un lecteur (vouloir) consulter la source initiale.\n  b) Ces calculs sont trop complexes pour qu’on les (résoudre) sans méthode rigoureuse.\n  c) En 820, Al-Khwarizmi (publier) son traité d’algèbre à Bagdad. (Employez et nommez la valeur du présent historique).';

			const objAnswer =
				variant === 0
					? 'a) subirait (Conditionnel présent après « au cas où »).\n  b) manipule (Subjonctif présent après « trop... pour que »).\n  c) tourne (Présent de vérité générale).'
					: 'a) voudrait (Conditionnel présent après « au cas où »).\n  b) résolve (Subjonctif présent après « trop... pour que »).\n  c) publie (Présent de narration / historique).';

			const content: ContentBlock[] = [
				{
					type: 'text',
					content: `1. Classez les six locutions conjonctives suivantes selon le mode verbal qu’elles imposent : ${conjList}`,
					mark: ''
				},
				modeTable,
				{
					type: 'text',
					content: transformPrompt,
					answer: transformAnswer,
					mark: '2.5'
				},
				{
					type: 'text',
					content: objPrompt,
					answer: objAnswer,
					mark: '2.0'
				}
			];

			const mcq =
				variant === 0
					? buildUniqueMcqOptions(
							'Les archives gardent une copie de secours au cas où l’original subirait une dégradation.',
							[
								{
									text: 'Les archives gardent une copie de secours au cas où l’original subit une dégradation.',
									diagnosticFeedback: 'خطأ: الرابط « au cas où » يتطلب صيغة الشرطي (Conditionnel : subirait) لا المضارع.'
								},
								{
									text: 'Les archives gardent une copie de secours au cas où l’original subira une dégradation.',
									diagnosticFeedback: 'خطأ: لا نضع المستقبل بعد « au cas où ».'
								},
								{
									text: 'Les archives gardent une copie de secours au cas où l’original subisse une dégradation.',
									diagnosticFeedback: 'خطأ: « au cas où » يأخذ Conditionnel وليس Subjonctif.'
								}
							],
							rng
						)
					: buildUniqueMcqOptions(
							'Ces calculs sont trop complexes pour qu’on les résolve sans méthode rigoureuse.',
							[
								{
									text: 'Ces calculs sont trop complexes pour qu’on les résout sans méthode rigoureuse.',
									diagnosticFeedback: 'خطأ: البنية « trop... pour que » تفرض Subjonctif (résolve) لا Indicatif (résout).'
								},
								{
									text: 'Ces calculs sont trop complexes pour qu’on les résoudra sans méthode rigoureuse.',
									diagnosticFeedback: 'خطأ: لا يأتي المستقبل بعد « pour que ».'
								},
								{
									text: 'Ces calculs sont trop complexes pour qu’on les résoudrait sans méthode rigoureuse.',
									diagnosticFeedback: 'خطأ: الشرطي لا يصح بعد « trop... pour que ».'
								}
							],
							rng
						);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Choisissez la phrase complexe où le mode verbal imposé par la subordonnée circonstancielle est exact :',
					questionTextAr: 'اختر الجملة المركبة التي تحترم الصيغة الفعلية الإجبارية للجملة الظرفية التابعة:',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation:
						variant === 0
							? 'الرابط الشرطي « au cas où » يتطلب دائماً صيغة Conditionnel (subirait).'
							: 'التركيب « trop... pour que » يتطلب دائماً صيغة Subjonctif (résolve).'
				},
				sujetExercise: {
					customTitle: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue',
					points: 6,
					instruction: 'Traitez les exercices de syntaxe de la phrase complexe et de concordance des modes :',
					content
				},
				hints: [
					'تحقق أولاً في جملة الغاية: هل الفاعلان متطابقان (afin de + Inf.) أم مختلفان (afin que + Subj.)؟',
					'تذكر: au cas où + Conditionnel | trop... pour que + Subjonctif | si... que + Indicatif.',
					'سمِّ قيمة المضارع بدقة (vérité générale ou narration).'
				],
				solutionStepsAr: [
					'تصنيف الروابط الستة حسب الصيغة الفعلية الإجبارية (1.5 نقطة).',
					'الربط السليم بين الجمل مع احترام وحدة الفاعل والصيغة (2.5 نقطة).',
					'تصريف الأفعال الثلاثة وتحديد قيمة المضارع (2.0 نقطة).'
				],
				finalAnswer: 'Fonctionnement de la langue (6 pts) : Tableau des modes (1.5 pt) + Circonstancielles (2.5 pts) + Modes et valeurs du présent (2.0 pts).'
			};
		}
	},
	{
		id: 'fre_tpl_2as_le_t1_exp_derivation_lexique',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'vocabulaire_lexique',
		titleAr: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue : Dérivation savante, champs lexicaux et nominalisation (6 pts)',
		curriculumLessonId: 'fre_lesson_2as_le_t1_champs_derivation',
		defaultPoints: 6,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const wfTable = buildFrenchWordFamilyTableBlock(
				variant === 0
					? [
							{
								verbe: { given: true, value: 'vérifier' },
								nom: { value: 'vérification', mark: '0.5' },
								adjectif: { value: 'vérifiable', mark: '0.5' }
							},
							{
								verbe: { value: 'systématiser', mark: '0.5' },
								nom: { given: true, value: 'systématisation' },
								adjectif: { value: 'systématique', mark: '0.5' }
							}
						]
					: [
							{
								verbe: { given: true, value: 'mesurer' },
								nom: { value: 'mesure / mesurage', mark: '0.5' },
								adjectif: { value: 'mesurable', mark: '0.5' }
							},
							{
								verbe: { value: 'expérimenter', mark: '0.5' },
								nom: { given: true, value: 'expérimentation' },
								adjectif: { value: 'expérimental(e)', mark: '0.5' }
							}
						]
			);

			const morphoPrompt =
				variant === 0
					? '2. Analysez la formation des mots suivants :\n  a) Décomposez « irréfutable » et « illisible » (préfixe + radical + suffixe) et expliquez l’orthographe du préfixe négatif.\n  b) Expliquez le sens des deux mots de composition savante : « hydrologie » et « chronomètre ».'
					: '2. Analysez la formation des mots suivants :\n  a) Décomposez « irremplaçable » et « imprécision » (préfixe + radical + suffixe) et expliquez l’orthographe du préfixe négatif.\n  b) Expliquez le sens des deux mots de composition savante : « géographie » et « télescope ».';

			const morphoAnswer =
				variant === 0
					? 'a) ir- + réfut + -able (préfixe in- devient ir- devant r) ; il- + lis + -ible (in- devient il- devant l).\n  b) hydrologie = hydro- (eau) + -logie (science) : science des eaux. | chronomètre = chrono- (temps) + -mètre (mesure) : instrument mesurant le temps avec précision.'
					: 'a) ir- + remplaç + -able (préfixe in- devient ir- devant r) ; im- + précis + -ion (in- devient im- devant p).\n  b) géographie = géo- (terre) + -graphie (description/tracé) : description de la Terre. | télescope = télé- (loin) + -scope (observer) : instrument pour observer les astres lointains.';

			const nomPrompt =
				variant === 0
					? '3. Distinguez deux sens (champ sémantique) du mot « source » dans deux phrases courtes (sens géographique vs sens scientifique), puis nominalisez : « Les chercheurs traduisent et diffusent les manuscrits scientifiques. »'
					: '3. Distinguez deux sens (champ sémantique) du mot « rayon » dans deux phrases courtes (optique vs géométrie), puis nominalisez : « Les historiens analysent et préservent les cartes anciennes. »';

			const nomAnswer =
				variant === 0
					? 'Sens 1 (géographie) : L’oasis est alimentée par une source souterraine. | Sens 2 (science/histoire) : Al-Idrisi vérifiait toujours la fiabilité de ses sources. | Nominalisation : La traduction et la diffusion des manuscrits scientifiques par les chercheurs.'
					: 'Sens 1 (optique) : Le rayon lumineux se propage en ligne droite. | Sens 2 (géométrie) : Al-Birouni a calculé le rayon de la Terre. | Nominalisation : L’analyse et la préservation des cartes anciennes par les historiens.';

			const content: ContentBlock[] = [
				{
					type: 'text',
					content: '1. Complétez le tableau de dérivation savante ci-dessous :',
					mark: ''
				},
				wfTable,
				{
					type: 'text',
					content: morphoPrompt,
					answer: morphoAnswer,
					mark: '2.0'
				},
				{
					type: 'text',
					content: nomPrompt,
					answer: nomAnswer,
					mark: '2.0'
				}
			];

			const mcq =
				variant === 0
					? buildUniqueMcqOptions(
							'Préfixe négatif ir- (adaptation de in- devant r) + radical réfut- + suffixe adjectival -able',
							[
								{
									text: 'Composition savante formée de deux mots grecs signifiant eau et lumière',
									diagnosticFeedback: 'خطأ: الكلمة « irréfutable » اشتقاق بسابقة ولاحقة وليست تركيباً علمياً.'
								},
								{
									text: 'Un verbe du premier groupe au participe présent',
									diagnosticFeedback: 'خطأ: اللاحقة -able تصوغ صفة لا فعلاً.'
								},
								{
									text: 'Un mot simple sans aucun affixe',
									diagnosticFeedback: 'خطأ: تحتوي على السابقة ir- واللاحقة -able حول الجذر réfut-.'
								}
							],
							rng
						)
					: buildUniqueMcqOptions(
							'Préfixe négatif im- (adaptation de in- devant p) + radical précis- + suffixe nominal -ion',
							[
								{
									text: 'Préfixe de répétition ré- + radical précision',
									diagnosticFeedback: 'خطأ: السابقة هنا im- للنفي.'
								},
								{
									text: 'Composition savante désignant un instrument de mesure',
									diagnosticFeedback: 'خطأ: أداة القياس تنتهي بـ -mètre.'
								},
								{
									text: 'Adjectif qualificatif formé avec le suffixe -able',
									diagnosticFeedback: 'خطأ: اللاحقة -ion تصوغ اسماً (la précision / l’imprécision).'
								}
							],
							rng
						);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion: {
					type: 'mcq',
					questionText:
						variant === 0
							? 'Quelle décomposition morphologique exacte correspond au mot « irréfutable » ?'
							: 'Quelle décomposition morphologique exacte correspond au mot « imprécision » ?',
					questionTextAr: 'اختر التفكيك الصرفي الدقيق للكلمة المشتقة:',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'السابقة النافية in- تتحول إملائياً إلى ir- قبل r وإلى im- قبل p/b/m، واللاحقة تحدد الصنف النحوي للكلمة.'
				},
				sujetExercise: {
					customTitle: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue',
					points: 6,
					instruction: 'Complétez les exercices suivants sur la formation savante des mots, la polysémie et la nominalisation :',
					content
				},
				hints: [
					'تذكر تغيرات السابقة in- حسب الحرف الموالي: im- (p, b, m)، il- (l)، ir- (r).',
					'في التركيب العلمي اذكر معنى العنصرين ثم المعنى الإجمالي للمصطلح.',
					'عند تحويل فعلين إلى أسماء اربط بينهما بـ « et » مع أداة تعريف لكل اسم.'
				],
				solutionStepsAr: [
					'إكمال جدول الاشتقاق العلمي (2.0 نقطة).',
					'تفكيك المشتقات وشرح المصطلحين المركبين (2.0 نقطة).',
					'إبراز الحقل الدلالي (المعنيين) وإنجاز التحويل الاسمي (2.0 نقطة).'
				],
				finalAnswer: 'Fonctionnement de la langue (6 pts) : Dérivation (2 pts) + Morphologie et composition savante (2 pts) + Champ sémantique et nominalisation (2 pts).'
			};
		}
	},
	{
		id: 'fre_tpl_2as_le_t1_writing_cr_critique_expl',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'production_ecrite',
		titleAr: 'II. Production écrite : Compte rendu critique d’un texte explicatif (8 pts — format LE)',
		curriculumLessonId: 'fre_lesson_2as_le_t1_cr_objectif_critique',
		defaultPoints: 8,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const sujetUnPrompt =
				variant === 0
					? 'Rédigez le compte rendu critique complet (160 à 200 mots) du texte explicatif intitulé « Al-Khwarizmi et la naissance méthodique de l’algèbre et des algorithmes », tiré des Annales d’Histoire des Mathématiques, pour la revue culturelle de votre lycée.'
					: 'Rédigez le compte rendu critique complet (160 à 200 mots) du texte explicatif intitulé « Al-Zahrawi et l’essor de la chirurgie méthodique en Andalousie », extrait d’une revue d’histoire de la médecine méditerranéenne.';

			const sujetUnNotes =
				variant === 0
					? [
							'1re partie — Accroche (3 lignes) : genre explicatif, titre, source, thème général et visée communicative.',
							'2e partie — Résumé objectif (8 à 10 lignes) : reformuler les idées essentielles à la 3e personne et au présent sans avis personnel (Maison de la Sagesse, algèbre/algorithme, applications pratiques, numération décimale et héritage informatique).',
							'3e partie — Commentaire critique argumenté (5 à 6 lignes) : apprécier l’intérêt scientifique du fond, la clarté stylistique et les procédés explicatifs (étymologie, reformulation, objectivation), puis formuler une nuance constructive.'
						]
					: [
							'1re partie — Accroche (3 lignes) : genre explicatif, titre, source, thème général et visée communicative.',
							'2e partie — Résumé objectif (8 à 10 lignes) : reformuler les idées clés au présent et à la 3e personne (encyclopédie Al-Tasrif, 200 instruments dessinés, fils résorbables et hygiène, traduction latine et rayonnement durable).',
							'3e partie — Commentaire critique argumenté (5 à 6 lignes) : évaluer la richesse documentaire du fond, la qualité de la forme (présent de narration, énumérations, clarté lexicale) et proposer une remarque constructive.'
						];

			const sujetDeuxPrompt =
				variant === 0
					? 'Votre établissement organise un colloque sur « La transmission des savoirs dans la civilisation islamique ». Rédigez un exposé explicatif approfondi (180 à 220 mots) présentant la contribution scientifique d’Al-Birouni ou d’Al-Idrisi en mobilisant des procédés explicatifs variés, des subordonnées circonstancielles (but, conséquence) et une stricte objectivité.'
					: 'Dans le cadre de la semaine des langues et des sciences, rédigez un texte explicatif rigoureux (180 à 220 mots) montrant comment la traduction scientifique et les bibliothèques médiévales (Bagdad, Cordoue, Fès, Tlemcen) ont favorisé le progrès universel du savoir.';

			const modelAnswer =
				variant === 0
					? 'Ce texte explicatif, intitulé « Al-Khwarizmi et la naissance méthodique de l’algèbre et des algorithmes » et tiré des Annales d’Histoire des Mathématiques, retrace les apports majeurs de ce savant musulman du IXe siècle afin d’informer le lecteur sur les fondements historiques des mathématiques modernes.\n\nTout d’abord, l’auteur rappelle qu’à la Maison de la Sagesse de Bagdad, Al-Khwarizmi a composé un traité décisif qui est à l’origine des termes « algèbre » et « algorithme ». Ensuite, il explique que le mathématicien a dépassé la résolution de cas isolés pour élaborer une méthode abstraite applicable au partage des héritages, à l’arpentage et au commerce, tout en diffusant le système décimal et le zéro dans le bassin méditerranéen. Enfin, le texte souligne que son esprit algorithmique fonde encore aujourd’hui toute l’informatique contemporaine.\n\nD’un point de vue critique, cet article présente un intérêt culturel et pédagogique indéniable en reliant l’histoire des sciences islamiques au monde numérique actuel. Sur le plan de la forme, le style demeure limpide, objectif et rigoureux grâce aux étymologies, à la reformulation et aux connecteurs logiques. Toutefois, l’insertion d’un bref exemple concret d’algorithme simple aurait encore renforcé l’accessibilité de l’exposé pour les lycéens.'
					: 'Ce texte explicatif, intitulé « Al-Zahrawi et l’essor de la chirurgie méthodique en Andalousie » et extrait d’une revue d’histoire de la médecine méditerranéenne, présente l’œuvre médicale novatrice de ce praticien cordouan afin d’expliquer son rôle fondateur dans l’histoire de la chirurgie.\n\nD’abord, l’auteur indique qu’Al-Zahrawi acheva vers l’an 1000 son encyclopédie Al-Tasrif en trente volumes, dont le dernier éleva la chirurgie au rang de discipline scientifique appuyée sur l’anatomie. Ensuite, il précise que l’ouvrage décrivait plus de deux cents instruments dessinés avec soin et préconisait déjà les fils résorbables ainsi qu’une hygiène rigoureuse pour éviter les infections. Enfin, l’article rappelle que ce traité, traduit en latin dès le XIIe siècle, demeura une référence dans les universités européennes pendant cinq siècles.\n\nSur le plan critique, ce texte séduit par la richesse documentaire de son contenu et par sa capacité à unir rigueur technique et éthique médicale. Quant à la forme, la progression chronologique fluide, le lexique spécialisé accessible et l’alternance entre présent de narration et présent de vérité générale rendent la lecture très instructive. Tout au plus aurait-on apprécié la reproduction d’un schéma d’instrument issu du manuscrit original pour illustrer davantage le propos.';

			const block = buildFrenchWrittenProductionBlock({
				sujetUnTitle: 'Sujet 1 (Compte rendu critique — 8 pts LE) :',
				sujetUnPrompt,
				sujetUnNotes,
				sujetDeuxPrompt,
				modelAnswer,
				rubricSummary:
					'Accroche complète et fidélité au texte (2.0 pts) | Résumé objectif reformulé sans copie ni avis (2.5 pts) | Commentaire critique pertinent et justifié sur le fond et la forme (2.0 pts) | Correction linguistique, richesse lexicale et présentation (1.5 pt)',
				mark: '8.0'
			});

			const mcq = buildUniqueMcqOptions(
				'Séparer nettement l’accroche, un résumé objectif fidèle à la 3e personne, puis un troisième paragraphe d’évaluation critique justifiée du fond et de la forme',
				[
					{
						text: 'Mélanger des commentaires subjectifs dès la première phrase du résumé et négliger la critique de la forme',
						diagnosticFeedback: 'خطأ: يجب الفصل التام بين التلخيص الحيادي والفقرة الثالثة النقدية الشاملة للمضمون والشكل.'
					},
					{
						text: 'S’arrêter après le résumé sans rédiger aucune appréciation critique',
						diagnosticFeedback: 'خطأ: غياب الفقرة النقدية يحول العمل إلى تقرير موضوعي فقط ويُفقد التلميذ نقاطاً حاسمة في شعبة LE.'
					},
					{
						text: 'Rédiger une attaque sévère et gratuite contre l’auteur sans mentionner le texte',
						diagnosticFeedback: 'خطأ: النقد الأكاديمي تقييم متزن ومعلل بمؤشرات نصية.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Quelle méthode garantit l’excellence (8/8) au compte rendu critique en 2AS Langues Étrangères ?',
					questionTextAr: 'ما المنهجية التي تضمن التميز (8/8) في التقرير النقدي بشعبة اللغات الأجنبية؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'يتألف التقرير النقدي في 2AS LE من ثلاث فقرات مستقلة ومتوازنة: مقدمة تعريفية، ملخص موضوعي أمين، ثم تعليق نقدي معلل للمضمون والشكل.'
				},
				sujetExercise: {
					customTitle: 'II. Production écrite',
					points: 8,
					instruction: 'Traitez l’UN des deux sujets au choix en veillant à la rigueur méthodologique et à la qualité de la langue :',
					content: [block]
				},
				hints: [
					'احترم التقسيم الثلاثي الصارم للتقرير النقدي (Accroche / Résumé objectif / Commentaire critique).',
					'في الفقرة الثالثة قيّم كلاً من المضمون (Le fond) والشكل (La forme) واختم بملاحظة بناءة لطيفة.',
					'راجع الاتفاقات النحوية والصيغ الفعلية قبل تسليم الورقة (160 إلى 200 كلمة).'
				],
				solutionStepsAr: [
					'كتابة المقدمة التعريفية المتكاملة (Accroche).',
					'تلخيص الأفكار الأساسية بحياد تام وبضمير الغائب والمضارع.',
					'تحرير فقرة التعليق النقدي المعلل للمضمون والأسلوب مع ملاحظة بناءة.'
				],
				finalAnswer: 'Production écrite (8 pts) : Compte rendu critique complet (format 2AS LE) avec corrigé modèle et barème détaillé.'
			};
		}
	}
];
