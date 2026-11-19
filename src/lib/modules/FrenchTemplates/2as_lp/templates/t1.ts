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

export const TEMPLATES_2AS_LP_T1: FrenchParameterizedTemplate[] = [
	{
		id: 'fre_tpl_2as_lp_t1_comp_savoirs_islamiques',
		grade: '2as_lp',
		trimesterId: 't1',
		domain: 'comprehension_ecrit',
		titleAr: 'I. Compréhension de l’écrit — A) Étude du texte : Savoirs islamiques et démarche scientifique (7 pts)',
		curriculumLessonId: 'fre_lesson_2as_lp_t1_procedes_explicatifs',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			if (variant === 0) {
				const passage = buildFrenchPassageBlock({
					title: 'Ibn Al-Haytham et la naissance de la méthode expérimentale en optique',
					paragraphs: [
						'Né à Bassora au Xe siècle, le savant musulman Ibn Al-Haytham est considéré par les historiens des sciences comme le fondateur de l’optique moderne. Dans son célèbre « Traité d’optique » (Kitab al-Manazir), il explique que la vision ne résulte pas d’un rayon émis par l’œil, mais de la lumière réfléchie par les objets qui pénètre dans l’organe visuel. [[Cette]] découverte capitale repose sur une observation rigoureuse et vérifiable.',
						'Pour prouver ses hypothèses, le chercheur met au point un dispositif appelé « chambre noire » (qamara), autrement dit une salle obscure percée d’un minuscule orifice par lequel passe un faisceau lumineux. Grâce à ce procédé expérimental, il est démontré que la lumière se propage toujours en ligne droite dans un milieu homogène. Des phénomènes variés, tels que la réfraction, la réflexion sur les miroirs courbes et les illusions visuelles, sont analysés avec une précision mathématique remarquable.',
						'Par conséquent, l’apport d’Ibn Al-Haytham dépasse largement le domaine de l’optique. En exigeant que toute hypothèse soit soumise à l’expérience et au calcul avant d’être admise, [[il]] pose les bases durables de la démarche scientifique universelle, dont les universités médiévales et modernes ont longuement bénéficié.'
					],
					source: 'D’après la revue Histoire des Savoirs et Techniques (texte adapté)',
					glossary: [
						{ term: 'milieu homogène', meaning: 'espace transparent de composition uniforme, comme l’air ou l’eau pure' },
						{ term: 'réfraction', meaning: 'déviation d’un rayon lumineux passant d’un milieu à un autre' }
					]
				});

				const content: ContentBlock[] = [
					passage,
					{
						type: 'text',
						content:
							'1. Quel est le thème principal de ce texte et quelle est la visée communicative de l’auteur ?',
						answer:
							'Thème : L’apport scientifique d’Ibn Al-Haytham en optique et sa méthode expérimentale. Visée communicative : Informer et expliquer objectivement comment ce savant a fondé l’optique moderne et la démarche expérimentale.',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'2. Répondez par Vrai ou Faux en justifiant à partir du texte :\n  a) Selon Ibn Al-Haytham, la vision provient d’un rayon envoyé par l’œil vers l’objet.\n  b) La chambre noire a permis de démontrer que la lumière voyage en ligne droite.\n  c) L’influence d’Ibn Al-Haytham s’est limitée uniquement à l’étude des miroirs.',
						answer:
							'a) Faux (elle résulte de la lumière réfléchie par les objets qui pénètre dans l’œil). | b) Vrai (grâce à ce procédé, il est démontré que la lumière se propage en ligne droite). | c) Faux (son apport dépasse l’optique : il a posé les bases de la démarche scientifique universelle).',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'3. Relevez dans le deuxième paragraphe :\n  a) Une dénomination et une reformulation.\n  b) Deux exemples illustrant les phénomènes étudiés par le savant.',
						answer:
							'a) Dénomination : « appelé chambre noire (qamara) » ; Reformulation : « autrement dit une salle obscure percée d’un minuscule orifice... ».\n  b) Exemples : la réfraction, la réflexion sur les miroirs courbes, les illusions visuelles (deux au choix).',
						mark: '2.5'
					},
					{
						type: 'text',
						content:
							'4. À quoi ou à qui renvoient les termes soulignés dans le texte ?\n  a) « Cette » (§1)    b) « il » (§3)',
						answer:
							'a) Cette = la découverte capitale selon laquelle la vision résulte de la lumière réfléchie par les objets qui pénètre dans l’œil. | b) il = Ibn Al-Haytham (le savant musulman).',
						mark: '1.5'
					}
				];

				const mcq = buildUniqueMcqOptions(
					'Expliquer objectivement comment Ibn Al-Haytham a fondé l’optique moderne grâce à la méthode expérimentale',
					[
						{
							text: 'Raconter une biographie romancée pleine de sentiments personnels sur Bassora',
							diagnosticFeedback: 'خطأ: النص موضوعي علمي يغيب فيه المتكلم وتغلب عليه الوسائل التفسيرية.'
						},
						{
							text: 'Dénoncer l’usage excessif des instruments optiques dans les laboratoires actuels',
							diagnosticFeedback: 'خطأ: النص ليس تنديداً (Réquisitoire) بل شرحاً علمياً موضوعياً.'
						},
						{
							text: 'Prouver que la vision dépend d’un rayon lumineux émis par l’œil humain',
							diagnosticFeedback: 'خطأ: بل دحض ابن الهيثم هذه الفكرة القديمة وأثبت العكس.'
						}
					],
					rng
				);

				return {
					templateId: this.id,
					seed,
					grade: '2as_lp',
					trimesterId: 't1',
					difficulty,
					domain: this.domain,
					titleAr: this.titleAr,
					examRole: 'comprehension',
					quizQuestion: {
						type: 'mcq',
						questionText: 'Quelle est la visée communicative dominante du texte sur Ibn Al-Haytham ?',
						questionTextAr: 'ما الغاية التواصلية الغالبة في النص العلمي حول ابن الهيثم؟',
						questionData: {
							options: mcq.options,
							correctIndex: mcq.correctIndices[0],
							correctIndices: mcq.correctIndices,
							correctIndexes: mcq.correctIndices
						},
						explanation: 'النص تفسيري موضوعي يهدف إلى الإعلام وشرح إسهام ابن الهيثم في البصريات والمنهج التجريبي.'
					},
					sujetExercise: {
						customTitle: 'I. Compréhension de l’écrit — A) Étude du texte',
						points: 7,
						instruction: 'Lisez attentivement le texte ci-dessous puis répondez aux questions :',
						content
					},
					hints: [
						'ابحث في الفقرة الثانية عن الكلمتين المفتاحيتين « appelé » (تسمية) و « autrement dit » (إعادة صياغة).',
						'عند تبرير Vrai/Faux عد دائماً إلى المعنى الدقيق في الفقرة الموافقة دون تخمين.',
						'في سؤال الإحالة، اقرأ الجملة السابقة مباشرة لكل كلمة مسطرة.'
					],
					solutionStepsAr: [
						'تحديد الموضوع والغاية التواصلية التفسيرية (1.5 نقطة).',
						'التحقق من العبارات الثلاث مع التبرير من النص (1.5 نقطة).',
						'استخراج التسمية وإعادة الصياغة ومثالين من الفقرة الثانية (2.5 نقطة).',
						'تعيين عائد الكلمتين المسطرتين بدقة (1.5 نقطة).'
					],
					finalAnswer: 'Étude du texte (7 pts) : Visée explicative ; F/V/F ; dénomination + reformulation + exemples ; référents identifiés.'
				};
			}

			const passage = buildFrenchPassageBlock({
				title: 'Les foggaras du Touat : un génie hydraulique durable au cœur du Sahara',
				paragraphs: [
					'Dans les régions arides d’Adrar et du Touat, au sud-ouest de l’Algérie, la survie des oasis repose depuis des siècles sur un système d’irrigation ingénieux appelé foggara. Ce réseau désigne une galerie souterraine légèrement inclinée qui capte l’eau de la nappe phréatique et l’achemine par simple gravité jusqu’aux palmeraies, sans recourir à aucune pompe mécanique.',
					'En circulant sous terre, l’eau échappe à l’évaporation intense causée par la chaleur saharienne ; autrement dit, chaque goutte est préservée avec une remarquable sobriété. À la sortie de la galerie, un peigne en pierre nommé kasria divise le débit en parts équitables selon les droits de chaque famille. [[Ce]] partage rigoureux est supervisé par un conseil d’anciens qui veille à l’entretien régulier des puits d’aération.',
					'Ainsi, grâce à une technique écologique parfaitement adaptée au climat désertique, les foggaras illustrent un patrimoine scientifique et social exemplaire. Si les jeunes générations conjuguent restauration traditionnelle et études hydrologiques modernes, [[elles]] assureront la pérennité de ces oasis millénaires.'
				],
				source: 'D’après les Cahiers du Patrimoine Saharien Algérien (texte adapté)',
				glossary: [
					{ term: 'nappe phréatique', meaning: 'réserve d’eau douce stockée dans le sous-sol' },
					{ term: 'pérennité', meaning: 'caractère de ce qui dure longuement dans le temps' }
				]
			});

			const content: ContentBlock[] = [
				passage,
				{
					type: 'text',
					content:
						'1. Quel phénomène patrimonial le texte explique-t-il et dans quelle visée communicative ?',
					answer:
						'Le texte explique le fonctionnement et la gestion traditionnelle des foggaras du Touat. La visée est informative et explicative : faire comprendre ce génie hydraulique durable.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'2. Répondez par Vrai ou Faux en justifiant :\n  a) Les foggaras fonctionnent grâce à des pompes électriques puissantes.\n  b) La circulation souterraine de l’eau permet de limiter l’évaporation.\n  c) La kasria est un dispositif qui répartit équitablement le débit d’eau.',
					answer:
						'a) Faux (l’eau circule par simple gravité, sans aucune pompe mécanique). | b) Vrai (en circulant sous terre, l’eau échappe à l’évaporation intense). | c) Vrai (un peigne en pierre nommé kasria divise le débit en parts équitables).',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3. Relevez dans le texte :\n  a) Une définition de la foggara (§1).\n  b) Une dénomination et une reformulation dans le deuxième paragraphe.',
					answer:
						'a) Définition : « Ce réseau désigne une galerie souterraine légèrement inclinée qui capte l’eau de la nappe phréatique... ».\n  b) Dénomination : « un peigne en pierre nommé kasria » ; Reformulation : « autrement dit, chaque goutte est préservée avec une remarquable sobriété ».',
					mark: '2.5'
				},
				{
					type: 'text',
					content:
						'4. À quoi ou à qui renvoient les mots soulignés ?\n  a) « Ce » (§2)    b) « elles » (§3)',
						answer:
							'a) Ce = le partage rigoureux (la division du débit en parts équitables grâce à la kasria). | b) elles = les jeunes générations.',
					mark: '1.5'
				}
			];

			const mcq = buildUniqueMcqOptions(
				'Acheminer l’eau souterraine par gravité sans évaporation et la répartir équitablement entre les jardins',
				[
					{
						text: 'Pomper l’eau des rivières côtières vers les montagnes du Nord à l’aide de moteurs',
						diagnosticFeedback: 'خطأ: الفوقارة تعمل بالجاذبية الطبيعية في صحراء توات وأدرار دون مضخات.'
					},
					{
						text: 'Stocker l’eau en surface dans des bassins exposés au soleil intense',
						diagnosticFeedback: 'خطأ: بل تجري المياه تحت الأرض لتفادي التبخر.'
					},
					{
						text: 'Réserver toute l’eau de l’oasis à un seul propriétaire',
						diagnosticFeedback: 'خطأ: « القصرية » توزع المياه بحصص عادلة بين العائلات.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Quel double avantage majeur offre le système traditionnel des foggaras selon le texte ?',
					questionTextAr: 'ما الميزتان الرئيسيتان اللتان يحققهما نظام الفوقارة وفقاً للنص؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'تجلب الفوقارة المياه الجوفية بالجاذبية دون تبخر، وتوزعها « القصرية » بعدالة تامة.'
				},
				sujetExercise: {
					customTitle: 'I. Compréhension de l’écrit — A) Étude du texte',
					points: 7,
					instruction: 'Lisez attentivement le texte ci-dessous puis répondez aux questions :',
					content
				},
				hints: [
					'تأمل الوسائل التفسيرية في النص: « appelé », « désigne », « autrement dit », « nommé ».',
					'انتبه إلى شرط الحفاظ على الواحات في الجملة الأخيرة من الفقرة الثالثة.',
					'تحقق من نوع وعدد الضمير « elles » (مؤنث جمع) للعثور على عائده الصحيح.'
				],
				solutionStepsAr: [
					'بيان موضوع النص وغايته التفسيرية (1.5 نقطة).',
					'تحديد صحة العبارات الثلاث مع التبرير (1.5 نقطة).',
					'استخراج التعريف والتسمية وإعادة الصياغة (2.5 نقطة).',
					'تعيين عائد الكلمتين المسطرتين (1.5 نقطة).'
				],
				finalAnswer: 'Étude du texte (7 pts) : Foggaras du Touat ; F/V/V ; définition + dénomination + reformulation ; Ce = partage rigoureux, elles = jeunes générations.'
			};
		}
	},
	{
		id: 'fre_tpl_2as_lp_t1_comp_patrimoine_science',
		grade: '2as_lp',
		trimesterId: 't1',
		domain: 'comprehension_ecrit',
		titleAr: 'I. Compréhension de l’écrit — A) Étude du texte : Génie technique et rayonnement du savoir (7 pts)',
		curriculumLessonId: 'fre_lesson_2as_lp_t1_effacement_passif',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			if (variant === 0) {
				const passage = buildFrenchPassageBlock({
					title: 'Al-Jazari et l’ingénierie hydraulique au service de la cité',
					paragraphs: [
						'Au XIIe siècle, l’ingénieur musulman Al-Jazari rédigea un ouvrage illustré majeur consacré à la mécanique pratique : le « Livre de la connaissance des procédés mécaniques ». Son travail repose sur un principe clair : la science doit résoudre des besoins concrets de la vie quotidienne, notamment l’approvisionnement en eau potable et la mesure exacte du temps.',
						'Dans cet ouvrage, plus de cinquante machines sont décrites avec des schémas détaillés et des dimensions précises. Parmi [[ces]] réalisations figurent des pompes élévatoires à pistons, des roues à aubes et des horloges à eau d’une grande finesse. On y observe déjà des mécanismes fondamentaux tels que l’arbre à cames et le système bielle-manivelle, qui transforment un mouvement circulaire en mouvement linéaire.',
						'Il est aujourd’hui reconnu par les spécialistes que les plans d’Al-Jazari étaient si rigoureux qu’ils peuvent encore être reconstitués dans les musées scientifiques contemporains. Son héritage illustre la fécondité d’une pensée où l’observation, le dessin technique et l’utilité publique se rejoignent.'
					],
					source: 'D’après une encyclopédie d’histoire des techniques islamiques (texte adapté)',
					glossary: [
						{ term: 'roue à aubes', meaning: 'roue munie de palettes entraînée par le courant d’un cours d’eau' },
						{ term: 'reconstitués', meaning: 'fabriqués de nouveau à l’identique à partir des plans d’origine' }
					]
				});

				const content: ContentBlock[] = [
					passage,
					{
						type: 'text',
						content:
							'1. Quel principe guidait les recherches mécaniques d’Al-Jazari selon le premier paragraphe ?',
						answer:
							'La science doit répondre à des besoins concrets de la vie quotidienne, en particulier l’approvisionnement en eau potable et la mesure exacte du temps.',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'2. Relevez dans le texte trois exemples de machines ou de mécanismes conçus par Al-Jazari.',
						answer:
							'Des pompes élévatoires à pistons, des roues à aubes, des horloges à eau, l’arbre à cames, le système bielle-manivelle (trois au choix).',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'3. L’auteur de ce texte est-il présent (subjectif) ou effacé (objectif) ? Justifiez votre réponse en relevant deux indices précis du texte.',
						answer:
							'L’auteur est effacé (texte objectif). Indices : absence de pronoms personnels « je/nous » ; emploi de la voix passive (« sont décrites ») ; tournure impersonnelle (« Il est aujourd’hui reconnu que ») ; pronom indéfini neutre (« On y observe »).',
						mark: '2.5'
					},
					{
						type: 'text',
						content:
							'4. Que prouve la possibilité actuelle de reconstituer ses machines dans les musées ? Et à quoi renvoie « ces » (§2) ?',
						answer:
							'Cela prouve la rigueur exceptionnelle et la précision de ses plans et schémas techniques. Le déterminant « ces » renvoie aux plus de cinquante machines décrites dans son ouvrage.',
						mark: '1.5'
					}
				];

				const mcq = buildUniqueMcqOptions(
					'L’emploi de la voix passive (« sont décrites »), du pronom « on » et de la tournure impersonnelle (« Il est reconnu que »)',
					[
						{
							text: 'L’emploi répété du pronom « je » et de nombreux points d’exclamation',
							diagnosticFeedback: 'خطأ: النص خالٍ تماماً من ضمير المتكلم وعلامات التعجب الانفعالية.'
						},
						{
							text: 'L’usage exclusif de l’impératif pour donner des ordres au lecteur',
							diagnosticFeedback: 'خطأ: لا توجد أفعال أمر في النص.'
						},
						{
							text: 'La présence d’un dialogue familier entre deux inventeurs',
							diagnosticFeedback: 'خطأ: النص تفسيري علمي وليس حواراً.'
						}
					],
					rng
				);

				return {
					templateId: this.id,
					seed,
					grade: '2as_lp',
					trimesterId: 't1',
					difficulty,
					domain: this.domain,
					titleAr: this.titleAr,
					examRole: 'comprehension',
					quizQuestion: {
						type: 'mcq',
						questionText: 'Quels indices linguistiques confirment l’effacement de l’énonciateur dans le texte sur Al-Jazari ?',
						questionTextAr: 'ما المؤشرات اللغوية التي تؤكد غياب المتكلم والموضوعية في نص « الجزري »؟',
						questionData: {
							options: mcq.options,
							correctIndex: mcq.correctIndices[0],
							correctIndices: mcq.correctIndices,
							correctIndexes: mcq.correctIndices
						},
						explanation: 'تتجلى الموضوعية في المبني للمجهول (sont décrites) والضمير المحايد (on) والتركيب غير الشخصي (Il est reconnu que).'
					},
					sujetExercise: {
						customTitle: 'I. Compréhension de l’écrit — A) Étude du texte',
						points: 7,
						instruction: 'Lisez attentivement le texte ci-dessous puis répondez aux questions :',
						content
					},
					hints: [
						'استخرج من الفقرة الأولى الهدف العملي للعلوم عند الجزري.',
						'لإثبات غياب المتكلم ابحث عن المبني للمجهول (être + PP) وعبارة « Il est reconnu que » وضمير « on ».',
						'انتبه للربط بين دقة الرسوم الهندسية وإمكانية إعادة تصنيع الآلات في المتاحف.'
					],
					solutionStepsAr: [
						'تحديد المبدأ العملي الموجه لأبحاث الجزري (1.5 نقطة).',
						'استخراج ثلاثة أمثلة من الآلات والآليات الميكانيكية (1.5 نقطة).',
						'إثبات غياب المتكلم مع ذكر مؤشرين نصيين دقيقين (2.5 نقطة).',
						'بيان دلالة إعادة تصنيع الآلات وتحديد عائد « ces » (1.5 نقطة).'
					],
					finalAnswer: 'Étude du texte (7 pts) : Al-Jazari ; utilité concrète ; 3 machines ; effacement de l’énonciateur prouvé ; précision des plans + référent.'
				};
			}

			const passage = buildFrenchPassageBlock({
				title: 'Fatima Al-Fihriya et le rayonnement scientifique d’Al-Qarawiyyin',
				paragraphs: [
					'Fondée en 859 à Fès grâce à la générosité savante de Fatima Al-Fihriya, l’institution d’Al-Qarawiyyin est reconnue par les historiens comme l’une des plus anciennes universités en activité continue au monde. Conçue initialement comme une grande mosquée dédiée à l’étude et au recueillement, elle devint rapidement un foyer majeur de transmission du savoir dans tout le Maghreb.',
					'On y enseignait un programme encyclopédique comprenant les sciences religieuses, la grammaire arabe, les mathématiques, l’astronomie, la médecine et la géographie. Des érudits illustres tels qu’Ibn Khaldoun y ont étudié ou enseigné. Grâce à sa bibliothèque riche en manuscrits précieux, l’établissement attirait des étudiants venus d’Afrique du Nord, d’Andalousie et d’Orient.',
					'À la fin de leur formation, les étudiants recevaient une attestation nominative appelée ijaza, c’est-à-dire une licence officielle certifiant leur maîtrise d’une discipline et les autorisant à l’enseigner à [[leur]] tour. Ainsi, ce modèle éducatif a durablement marqué l’organisation des études supérieures dans le monde.'
				],
				source: 'D’après une chronique d’histoire de l’éducation au Maghreb (texte adapté)',
				glossary: [
					{ term: 'encyclopédique', meaning: 'qui embrasse un très vaste ensemble de disciplines du savoir' },
					{ term: 'attestation', meaning: 'document officiel qui certifie une compétence acquise' }
				]
			});

			const content: ContentBlock[] = [
				passage,
				{
					type: 'text',
					content:
						'1. Quand et par qui l’institution d’Al-Qarawiyyin a-t-elle été fondée, et quelle était sa vocation première ?',
					answer:
						'Elle a été fondée en 859 à Fès par Fatima Al-Fihriya. Elle a été conçue initialement comme une grande mosquée dédiée à l’étude et au recueillement, avant de devenir un foyer majeur de transmission du savoir.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'2. Citez quatre disciplines enseignées à Al-Qarawiyyin d’après le deuxième paragraphe.',
					answer:
						'Les sciences religieuses, la grammaire arabe, les mathématiques, l’astronomie, la médecine, la géographie (quatre au choix).',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3. Relevez dans le troisième paragraphe une dénomination et une reformulation, puis expliquez le rôle de l’ijaza.',
					answer:
						'Dénomination : « appelée ijaza ». Reformulation : « c’est-à-dire une licence officielle certifiant leur maîtrise... ». Rôle : elle certifiait la maîtrise d’une discipline et autorisait le diplômé à l’enseigner.',
					mark: '2.5'
				},
				{
					type: 'text',
					content:
						'4. Relevez une marque d’objectivité dans le premier ou le deuxième paragraphe, puis précisez à qui renvoie « leur » (§3).',
					answer:
						'Marque d’objectivité : la voix passive (« est reconnue par les historiens ») ou le pronom indéfini « On » (« On y enseignait ») et l’absence de « je ». Le déterminant « leur » renvoie aux étudiants.',
					mark: '1.5'
				}
			];

			const mcq = buildUniqueMcqOptions(
				'Une licence académique attestant la maîtrise d’une discipline et autorisant son détenteur à l’enseigner',
				[
					{
						text: 'Une taxe annuelle payée par les commerçants de la médina',
						diagnosticFeedback: 'خطأ: الإجازة العلمية شهادة أكاديمية تمنح في نهاية التكوين.'
					},
					{
						text: 'Un instrument d’astronomie utilisé pour observer la lune',
						diagnosticFeedback: 'خطأ: النص يعرف الإجازة بأنها شهادة رسمية للتدريس.'
					},
					{
						text: 'Un bâtiment réservé uniquement au logement des voyageurs',
						diagnosticFeedback: 'خطأ: الفقرة الثالثة تشرح الإجازة بصفتها رخصة علمية.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Selon le troisième paragraphe, que désigne le terme « ijaza » ?',
					questionTextAr: 'بحسب الفقرة الثالثة، ماذا يعني مصطلح « الإجازة » (ijaza)؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'عرف النص الإجازة عبر التسمية وإعادة الصياغة بأنها رخصة رسمية تشهد بإتقان علم وتأذن بتدريسه.'
				},
				sujetExercise: {
					customTitle: 'I. Compréhension de l’écrit — A) Étude du texte',
					points: 7,
					instruction: 'Lisez attentivement le texte ci-dessous puis répondez aux questions :',
					content
				},
				hints: [
					'عد إلى الجملتين الأوليين في الفقرة الأولى لاستخراج التاريخ والمؤسسة والوظيفة.',
					'في الفقرة الثالثة انتبه للرابطين « appelée » و « c’est-à-dire ».',
					'لإثبات الموضوعية ابحث عن « est reconnue par » أو « On y enseignait ».'
				],
				solutionStepsAr: [
					'تحديد سنة التأسيس والمؤسسة والوظيفة (1.5 نقطة).',
					'استخراج أربعة علوم من الفقرة الثانية (1.5 نقطة).',
					'تحديد التسمية وإعادة الصياغة ودور الإجازة (2.5 نقطة).',
					'رصد مؤشر موضوعية وتحديد عائد « leur » (1.5 نقطة).'
				],
				finalAnswer: 'Étude du texte (7 pts) : Al-Qarawiyyin (859, Fatima Al-Fihriya) ; 4 disciplines ; ijaza (dénomination + reformulation) ; objectivité + leur = les étudiants.'
			};
		}
	},
	{
		id: 'fre_tpl_2as_lp_t1_exp_passif_procedes',
		grade: '2as_lp',
		trimesterId: 't1',
		domain: 'grammaire_syntaxe',
		titleAr: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue : Procédés explicatifs et voix passive (6 pts)',
		curriculumLessonId: 'fre_lesson_2as_lp_t1_effacement_passif',
		defaultPoints: 6,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const table = buildFrenchClassificationTableBlock(
				variant === 0
					? {
							columns: [
								{
									header: 'Définition',
									items: ['L’optique est la science qui étudie les propriétés de la lumière.'],
									mark: '0.5'
								},
								{
									header: 'Dénomination',
									items: ['Un dispositif optique appelé chambre noire.'],
									mark: '0.5'
								},
								{
									header: 'Reformulation',
									items: ['Autrement dit, le rayon lumineux suit une trajectoire rectiligne.'],
									mark: '0.5'
								},
								{
									header: 'Fonction',
									items: ['L’astrolabe sert à mesurer la hauteur des astres.'],
									mark: '0.5'
								}
							]
						}
					: {
							columns: [
								{
									header: 'Définition',
									items: ['La foggara désigne une galerie souterraine de captage d’eau.'],
									mark: '0.5'
								},
								{
									header: 'Dénomination',
									items: ['Un répartiteur en pierre nommé kasria.'],
									mark: '0.5'
								},
								{
									header: 'Reformulation',
									items: ['C’est-à-dire que l’eau s’écoule sans perte par évaporation.'],
									mark: '0.5'
								},
								{
									header: 'Illustration',
									items: ['Des oasis sahariennes telles qu’Adrar et Timimoun.'],
									mark: '0.5'
								}
							]
						}
			);

			const sentencesPrompt =
				variant === 0
					? '2. Transformez les phrases suivantes à la voix passive en respectant les temps et les accords :\n  a) Ibn Al-Haytham rédigea le Traité d’optique avec une méthode rigoureuse.\n  b) Les chercheurs contemporains étudient encore ses expériences lumineuses.'
					: '2. Transformez les phrases suivantes à la voix passive en respectant les temps et les accords :\n  a) Les anciens bâtisseurs ont creusé les foggaras avec une pente précise.\n  b) Un conseil d’anciens supervise la répartition équitable de l’eau.';

			const sentencesAnswer =
				variant === 0
					? 'a) Le Traité d’optique fut rédigé par Ibn Al-Haytham avec une méthode rigoureuse.\n  b) Ses expériences lumineuses sont encore étudiées par les chercheurs contemporains.'
					: 'a) Les foggaras ont été creusées par les anciens bâtisseurs avec une pente précise.\n  b) La répartition équitable de l’eau est supervisée par un conseil d’anciens.';

			const presentPrompt =
				variant === 0
					? '3. Quelle est la valeur du présent dans la phrase : « La lumière se propage en ligne droite dans un milieu homogène » ? Justifiez en une phrase et relevez une tournure impersonnelle favorable à l’objectivité dans : « Il est prouvé que l’expérience confirme le calcul. »'
					: '3. Quelle est la valeur du présent dans la phrase : « L’eau souterraine échappe à l’évaporation intense » ? Justifiez en une phrase et transformez cette phrase subjective en phrase objective : « Je trouve que cette architecture saharienne est remarquable. »';

			const presentAnswer =
				variant === 0
					? 'Valeur : Présent de vérité générale (il exprime une loi physique constante et toujours vérifiable). | Tournure impersonnelle : « Il est prouvé que ».'
					: 'Valeur : Présent de vérité générale (il exprime un fait physique constant et vérifiable). | Phrase objective : « Il est constaté que cette architecture saharienne répond efficacement au climat désertique. » (toute suppression de « je » et de l’affectivité est acceptée).';

			const listDisplay =
				variant === 0
					? 'A) Un dispositif optique appelé chambre noire. | B) L’astrolabe sert à mesurer la hauteur des astres. | C) Autrement dit, le rayon lumineux suit une trajectoire rectiligne. | D) L’optique est la science qui étudie les propriétés de la lumière.'
					: 'A) Des oasis sahariennes telles qu’Adrar et Timimoun. | B) La foggara désigne une galerie souterraine de captage d’eau. | C) Un répartiteur en pierre nommé kasria. | D) C’est-à-dire que l’eau s’écoule sans perte par évaporation.';

			const content: ContentBlock[] = [
				{
					type: 'text',
					content: `1. Classez les quatre énoncés suivants dans le tableau des procédés explicatifs :\n  ${listDisplay}`,
					mark: ''
				},
				table,
				{
					type: 'text',
					content: sentencesPrompt,
					answer: sentencesAnswer,
					mark: '2.0'
				},
				{
					type: 'text',
					content: presentPrompt,
					answer: presentAnswer,
					mark: '2.0'
				}
			];

			const mcq =
				variant === 0
					? buildUniqueMcqOptions(
							'Ses expériences lumineuses sont encore étudiées par les chercheurs contemporains.',
							[
								{
									text: 'Ses expériences lumineuses sont encore étudiés par les chercheurs contemporains.',
									diagnosticFeedback: 'خطأ: كلمة « expériences » مؤنث جمع فيجب كتابة « étudiées ».'
								},
								{
									text: 'Ses expériences lumineuses ont été étudiées par les chercheurs contemporains.',
									diagnosticFeedback: 'خطأ: الفعل الأصلي « étudient » في المضارع وليس الماضي المركب.'
								},
								{
									text: 'Ses expériences lumineuses étaient encore étudiées par les chercheurs contemporains.',
									diagnosticFeedback: 'خطأ: لا نغير الزمن من المضارع إلى Imparfait.'
								}
							],
							rng
						)
					: buildUniqueMcqOptions(
							'Les foggaras ont été creusées par les anciens bâtisseurs avec une pente précise.',
							[
								{
									text: 'Les foggaras sont creusées par les anciens bâtisseurs avec une pente précise.',
									diagnosticFeedback: 'خطأ: الفعل الأصلي « ont creusé » في الماضي المركب (Passé composé).'
								},
								{
									text: 'Les foggaras ont été creusés par les anciens bâtisseurs avec une pente précise.',
									diagnosticFeedback: 'خطأ: كلمة « foggaras » مؤنث جمع فيُطابق اسم المفعول « creusées ».'
								},
								{
									text: 'Les foggaras furent creusées par les anciens bâtisseurs avec une pente précise.',
									diagnosticFeedback: 'خطأ: « furent » تخص الماضي البسيط لا الماضي المركب.'
								}
							],
							rng
						);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion: {
					type: 'mcq',
					questionText:
						variant === 0
							? 'Choisissez la transformation passive exacte de : « Les chercheurs contemporains étudient encore ses expériences lumineuses. »'
							: 'Choisissez la transformation passive exacte de : « Les anciens bâtisseurs ont creusé les foggaras avec une pente précise. »',
					questionTextAr: 'اختر التحويل السليم إلى المبني للمجهول مع احترام الزمن ومطابقة اسم المفعول:',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'نحافظ على الزمن نفسه للمساعد « être » ونطابق اسم المفعول مع الفاعل الجديد المؤنث الجمع (-ées).'
				},
				sujetExercise: {
					customTitle: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue',
					points: 6,
					instruction: 'Répondez avec précision aux exercices de langue suivants :',
					content
				},
				hints: [
					'تحقق من أداة كل وسيلة تفسيرية قبل تصنيفها في الجدول.',
					'في المبني للمجهول، احتفظ بزمن الجملة الأصلية وراقب التأنيث والجمع في اسم المفعول.',
					'مضارع الحقيقة العامة يصف قانوناً علمياً ثابتاً لا يتقيد بلحظة الكلام.'
				],
				solutionStepsAr: [
					'تصنيف الجمل الأربع في جدول الوسائل التفسيرية (2.0 نقطة).',
					'تحويل الجملتين إلى المبني للمجهول بدقة صرفية (2.0 نقطة).',
					'تحديد قيمة مضارع الحقيقة العامة والموضوعية (2.0 نقطة).'
				],
				finalAnswer: 'Fonctionnement de la langue (6 pts) : Tableau des procédés (2 pts) + Voix passive (2 pts) + Présent de vérité générale et objectivité (2 pts).'
			};
		}
	},
	{
		id: 'fre_tpl_2as_lp_t1_exp_logique_nominalisation',
		grade: '2as_lp',
		trimesterId: 't1',
		domain: 'vocabulaire_lexique',
		titleAr: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue : Rapports logiques et nominalisation (6 pts)',
		curriculumLessonId: 'fre_lesson_2as_lp_t1_rapports_logiques',
		defaultPoints: 6,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const wfTable = buildFrenchWordFamilyTableBlock(
				variant === 0
					? [
							{
								verbe: { given: true, value: 'observer' },
								nom: { value: 'observation', mark: '0.5' },
								adjectif: { value: 'observable', mark: '0.5' }
							},
							{
								verbe: { value: 'préserver', mark: '0.5' },
								nom: { given: true, value: 'préservation' },
								adjectif: { value: 'préservé(e)', mark: '0.5' }
							}
						]
					: [
							{
								verbe: { given: true, value: 'irriguer' },
								nom: { value: 'irrigation', mark: '0.5' },
								adjectif: { value: 'irrigué(e)', mark: '0.5' }
							},
							{
								verbe: { value: 'démontrer', mark: '0.5' },
								nom: { given: true, value: 'démonstration' },
								adjectif: { value: 'démontrable', mark: '0.5' }
							}
						]
			);

			const logicPrompt =
				variant === 0
					? '2. Exprimez le rapport logique demandé en évitant toute faute de mode ou de construction :\n  a) Les galeries sont souterraines ; l’eau ne s’évapore pas. (Reliez par un articulateur de conséquence puis par un articulateur de cause).\n  b) Si les chercheurs (restaurer) ces manuscrits anciens, les élèves (pouvoir) les consulter librement. (Conjuguez au temps convenable).'
					: '2. Exprimez le rapport logique demandé en évitant toute faute de mode ou de construction :\n  a) La méthode d’Al-Jazari était rigoureuse ; ses machines fonctionnaient avec précision. (Reliez par un articulateur de cause, puis transformez avec « Grâce à »).\n  b) Si l’on (négliger) l’entretien des canaux, le débit de la source (baisser) rapidement. (Conjuguez au temps convenable).';

			const logicAnswer =
				variant === 0
					? 'a) Conséquence : Les galeries sont souterraines, donc (si bien que / par conséquent) l’eau ne s’évapore pas. | Cause : L’eau ne s’évapore pas parce que (car) les galeries sont souterraines.\n  b) Si les chercheurs restaurent ces manuscrits anciens, les élèves pourront les consulter librement. (ou : restauraient / pourraient).'
					: 'a) Cause : Ses machines fonctionnaient avec précision parce que la méthode d’Al-Jazari était rigoureuse. | Grâce à la rigueur de la méthode d’Al-Jazari, ses machines fonctionnaient avec précision.\n  b) Si l’on néglige l’entretien des canaux, le débit de la source baissera rapidement. (ou : négligeait / baisserait).';

			const nomPrompt =
				variant === 0
					? '3. Nominalisez les deux phrases verbales suivantes pour en faire des titres de paragraphes scientifiques :\n  a) On numérise les archives historiques de Tlemcen.\n  b) Les ingénieurs perfectionnent les instruments de mesure.'
					: '3. Nominalisez les deux phrases verbales suivantes pour en faire des titres d’articles scientifiques :\n  a) On découvre de nouvelles propriétés optiques.\n  b) Les équipes restaurent les anciens bassins d’irrigation.';

			const nomAnswer =
				variant === 0
					? 'a) La numérisation des archives historiques de Tlemcen.\n  b) Le perfectionnement des instruments de mesure par les ingénieurs.'
					: 'a) La découverte de nouvelles propriétés optiques.\n  b) La restauration des anciens bassins d’irrigation par les équipes.';

			const content: ContentBlock[] = [
				{
					type: 'text',
					content: '1. Complétez le tableau de dérivation (famille de mots) ci-dessous :',
					mark: ''
				},
				wfTable,
				{
					type: 'text',
					content: logicPrompt,
					answer: logicAnswer,
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
							'Le perfectionnement des instruments de mesure par les ingénieurs.',
							[
								{
									text: 'La perfectionnage des instruments de mesure par les ingénieurs.',
									diagnosticFeedback: 'خطأ: الفعل perfectionner يأخذ اللاحقة -ment لا -age.'
								},
								{
									text: 'La perfectionnance des instruments de mesure par les ingénieurs.',
									diagnosticFeedback: 'خطأ: صيغة غير موجودة في اللغة الفرنسية.'
								},
								{
									text: 'Perfectionnant les instruments de mesure par les ingénieurs.',
									diagnosticFeedback: 'خطأ: هذا اسم فاعل (Participe présent) وليس اسماً.'
								}
							],
							rng
						)
					: buildUniqueMcqOptions(
							'La découverte de nouvelles propriétés optiques.',
							[
								{
									text: 'La découvration de nouvelles propriétés optiques.',
									diagnosticFeedback: 'خطأ: الاسم الصحيح من الفعل découvrir هو « la découverte ».'
								},
								{
									text: 'Le découvremment de nouvelles propriétés optiques.',
									diagnosticFeedback: 'خطأ: كلمة غير موجودة في المعجم.'
								},
								{
									text: 'Le découvrisme de nouvelles propriétés optiques.',
									diagnosticFeedback: 'خطأ: لاحقة غير صحيحة تماماً.'
								}
							],
							rng
						);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion: {
					type: 'mcq',
					questionText:
						variant === 0
							? 'Quelle est la nominalisation correcte de : « Les ingénieurs perfectionnent les instruments de mesure » ?'
							: 'Quelle est la nominalisation correcte de : « On découvre de nouvelles propriétés optiques » ?',
					questionTextAr: 'اختر التحويل الاسمي الصحيح (Nominalisation) للجملة التالية:',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation:
						variant === 0
							? 'الفعل perfectionner يشتق منه الاسم باللاحقة -ment: le perfectionnement.'
							: 'الفعل découvrir يشتق منه الاسم القياسي الشائع: la découverte.'
				},
				sujetExercise: {
					customTitle: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue',
					points: 6,
					instruction: 'Traitez les exercices de lexique, de syntaxe logique et de nominalisation :',
					content
				},
				hints: [
					'انتبه إلى عدم وضع Futur أو Conditionnel مباشرة بعد « Si » الشرطية.',
					'عند استعمال « Grâce à »، حوّل الصفة أو الفعل إلى مجموعة اسمية (la rigueur de...).',
					'في التحويل الاسمي احذف الضمير النكرة « on » وحول الفعل الرئيسي إلى اسم معرف.'
				],
				solutionStepsAr: [
					'إكمال جدول عائلة الكلمات (2.0 نقطة).',
					'توظيف روابط السبب والنتيجة وتطابق أزمنة الفرضية (2.0 نقطة).',
					'التحويل إلى عناوين اسمية مركزة (2.0 نقطة).'
				],
				finalAnswer: 'Fonctionnement de la langue (6 pts) : Tableau de dérivation (2 pts) + Rapports logiques et Si (2 pts) + Nominalisation (2 pts).'
			};
		}
	},
	{
		id: 'fre_tpl_2as_lp_t1_writing_compte_rendu_expl',
		grade: '2as_lp',
		trimesterId: 't1',
		domain: 'production_ecrite',
		titleAr: 'II. Production écrite : Compte rendu objectif ou texte explicatif (7 pts — format LP)',
		curriculumLessonId: 'fre_lesson_2as_lp_t1_compte_rendu_objectif',
		defaultPoints: 7,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const sujetUnPrompt =
				variant === 0
					? 'Rédigez le compte rendu objectif (100 à 120 mots) d’un texte explicatif intitulé « Ibn Al-Haytham et la naissance de la méthode expérimentale en optique », tiré de la revue Histoire des Savoirs et Techniques, destiné au journal mural scientifique de votre lycée.'
					: 'Rédigez le compte rendu objectif (100 à 120 mots) d’un texte explicatif intitulé « Les foggaras du Touat : un génie hydraulique durable au cœur du Sahara », extrait des Cahiers du Patrimoine Saharien Algérien, pour le dossier culturel de votre classe.';

			const sujetUnNotes =
				variant === 0
					? [
							'Accroche (2 à 3 lignes) : type de texte, titre, source, thème général et visée explicative.',
							'Développement à la 3e personne (L’auteur explique / démontre / souligne que...) au présent de l’indicatif.',
							'Idées clés à reformuler sans copier-coller : réfutation de la théorie ancienne de la vision, chambre noire, propagation rectiligne de la lumière, héritage de la méthode expérimentale.',
							'Objectivité stricte : aucun pronom « je », aucun jugement personnel.'
						]
					: [
							'Accroche (2 à 3 lignes) : type de texte, titre, source, thème général et visée informative.',
							'Développement à la 3e personne (L’auteur présente / précise / conclut que...) au présent de l’indicatif.',
							'Idées clés à reformuler personnellement : galeries souterraines par gravité, protection contre l’évaporation, partage équitable par la kasria et le conseil d’anciens, nécessité de la préservation.',
							'Objectivité stricte : aucun avis personnel et respect du volume demandé.'
						];

			const sujetDeuxPrompt =
				variant === 0
					? 'À l’occasion de la Journée du Savoir (16 avril), rédigez un texte explicatif objectif (130 à 160 mots) présentant à vos camarades l’apport d’un savant musulman illustre (Al-Khwarizmi, Al-Jazari ou Al-Zahrawi) en employant au moins trois procédés explicatifs et une phrase à la voix passive.'
					: 'Votre lycée prépare une exposition sur le patrimoine scientifique et écologique algérien. Rédigez un texte explicatif objectif (130 à 160 mots) expliquant comment l’architecture traditionnelle du M’Zab ou les foggaras du Sahara s’adaptent intelligemment au climat aride.';

			const modelAnswer =
				variant === 0
					? 'Ce texte explicatif, intitulé « Ibn Al-Haytham et la naissance de la méthode expérimentale en optique » et extrait de la revue Histoire des Savoirs et Techniques, expose la contribution fondatrice de ce savant musulman du Xe siècle afin d’expliquer les origines de la démarche scientifique moderne.\n\nD’abord, l’auteur rappelle que dans son Traité d’optique, Ibn Al-Haytham démontre que la vision résulte de la lumière réfléchie par les objets pénétrant dans l’œil, et non d’un rayon émis par l’organe visuel. Ensuite, il explique que le chercheur utilise le dispositif de la chambre noire pour prouver la propagation rectiligne de la lumière et analyser mathématiquement la réflexion et la réfraction. Enfin, l’article souligne que son exigence systématique d’expérimentation et de calcul a durablement fondé la méthode scientifique universelle.'
					: 'Ce texte explicatif, intitulé « Les foggaras du Touat : un génie hydraulique durable au cœur du Sahara » et tiré des Cahiers du Patrimoine Saharien Algérien, présente un système d’irrigation traditionnel afin d’en expliquer l’efficacité écologique et sociale.\n\nEn premier lieu, l’auteur définit la foggara comme une galerie souterraine inclinée qui achemine l’eau de la nappe phréatique vers les oasis par simple gravité, sans pompe mécanique. Ensuite, il précise que ce parcours souterrain limite l’évaporation saharienne, tandis qu’un répartiteur en pierre nommé kasria divise équitablement le débit sous le contrôle d’un conseil d’anciens. Enfin, le texte souligne que l’alliance entre entretien traditionnel et hydrologie moderne permettra aux jeunes générations de sauvegarder durablement ce patrimoine millénaire.';

			const block = buildFrenchWrittenProductionBlock({
				sujetUnTitle: 'Sujet 1 (Compte rendu objectif) :',
				sujetUnPrompt,
				sujetUnNotes,
				sujetDeuxPrompt,
				modelAnswer,
				rubricSummary:
					'Respect de la consigne et fidélité au texte (2.0 pts) | Structure : accroche + résumé cohérent avec connecteurs (2.0 pts) | Langue, reformulation, 3e personne et objectivité (2.0 pts) | Orthographe et présentation soignée (1.0 pt)',
				mark: '7.0'
			});

			const mcq = buildUniqueMcqOptions(
				'Rédiger une accroche complète puis reformuler les idées essentielles à la 3e personne et au présent sans aucun avis personnel',
				[
					{
						text: 'Recopier intégralement deux paragraphes du texte source puis ajouter son opinion avec « Je trouve que »',
						diagnosticFeedback: 'خطأ: النسخ الحرفي وإقحام الرأي الذاتي يبطلان منهجية التقرير الموضوعي.'
					},
					{
						text: 'Supprimer l’accroche paratextuelle et commencer directement par une liste de dates',
						diagnosticFeedback: 'خطأ: المقدمة التعريفية (Accroche) ركن أساسي في التقرير الموضوعي.'
					},
					{
						text: 'Ajouter des anecdotes personnelles extérieures au texte pour allonger la copie',
						diagnosticFeedback: 'خطأ: يجب الالتزام التام بأفكار النص الأصلي دون إضافات خارجية.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Quelle démarche garantit la note maximale (7/7) au compte rendu objectif d’un texte explicatif en 2AS LP ?',
					questionTextAr: 'ما المنهجية التي تضمن العلامة الكاملة (7/7) في التقرير الموضوعي لنص تفسيري في 2AS LP؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'يتطلب التقرير الموضوعي مقدمة تعريفية شاملة، وإعادة صياغة الأفكار الأساسية بضمير الغائب والمضارع، مع الحياد التام.'
				},
				sujetExercise: {
					customTitle: 'II. Production écrite',
					points: 7,
					instruction: 'Traitez l’UN des deux sujets au choix en soignant la structure et la langue :',
					content: [block]
				},
				hints: [
					'تأكد في المقدمة من ذكر: نوع النص، عنوانه، مصدره، موضوعه العام وغايته.',
					'استعمل أفعال النقل الموضوعية: l’auteur rappelle / définit / explique / souligne que.',
					'راجع الورقة للتأكد من خلو التقرير الموضوعي من « je » ومن النسخ الحرفي.'
				],
				solutionStepsAr: [
					'كتابة المقدمة التعريفية (Accroche) في فقرة مستقلة.',
					'تلخيص الأفكار الأساسية بأسلوبك الخاص مع روابط التنظيم (D’abord, Ensuite, Enfin).',
					'مراجعة السلامة اللغوية والحياد التام قبل التسليم.'
				],
				finalAnswer: 'Production écrite (7 pts) : Compte rendu objectif complet (ou texte explicatif) avec corrigé modèle et barème.'
			};
		}
	}
];
