import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchWritingBlueprint
} from '../../svg-french';
import type { FrenchInteractiveLessonData } from '../../types';

/**
 * 3AS BAC Langues Étrangères (لغات أجنبية — yearSubjectId: 788, coeff 5, 03h30, 6+6+8=20)
 * Interactive Lessons — Trimestre 2 : Projet 2 « Le débat d’idées » (5 lessons)
 */
export const LESSONS_3AS_LE_T2: FrenchInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 1: Stratégies pour convaincre et persuader (typologie des arguments)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_le_t2_convaincre_persuader_arguments',
		slug: 'fre-3as-le-t2-convaincre-persuader-arguments',
		grade: '3as_le',
		yearSubjectId: 788,
		trimesterId: 't2',
		sequenceId: 'projet2',
		sequenceTitleAr: 'المشروع 2: Le débat d’idées (البلاغة، الحجاج والمقال الجدلي — لغات أجنبية)',
		order: 1,
		titleAr: 'استراتيجيات الإقناع والاستمالة وتصنيف الحجج (Convaincre, persuader, types d’arguments)',
		objectives: [
			'التمييز البلاغي الدقيق بين الإقناع العقلي (Convaincre : المنطق، الإحصاء، البرهان) والاستمالة الوجدانية (Persuader : القيم، الصور، مخاطبة الضمير)',
			'تحديد أنواع الحجج الأربعة الرئيسية في نصوص BAC LE: الحجة المنطقية، حجة السلطة (Argument d’autorité)، حجة المثال، والبرهان بالخُلف (Raisonnement par l’absurde)',
			'تحليل كيفية توظيف الحجج والأمثلة التوضيحية أو الإثباتية لتدعيم الأطروحة'
		],
		keywordsAr: ['Convaincre', 'Persuader', 'Argument d’autorité', 'Argument d’exemple', 'Par l’absurde', 'Débat d’idées'],
		discover: {
			scenarioAr:
				'في نصوص النقاش الفكري لشعبة اللغات الأجنبية (التعدد اللغوي، الترجمة، العلم والأخلاق)، لا يكتفي الكاتب بعرض رأيه، بل يبني ترسانة من الحجج المتنوعة ليخاطب العقل (convaincre) ويحرّك الضمير الأخلاقي (persuader). كيف تميّز بدقة كل نوع من هذه الحجج؟',
			svg: svgFrenchGrammarMap({
				title: 'Typologie des arguments (BAC LE)',
				rootLabel: 'Convaincre et Persuader',
				rootSub: 'Identifier la nature exacte de chaque preuve',
				branches: [
					{
						label: 'Logique / Cause',
						rule: 'Raisonnement déductif ou chiffré',
						example: 'Le bilinguisme stimule la mémoire.'
					},
					{
						label: 'D’autorité',
						rule: 'Référence à un savant ou expert',
						example: 'Comme l’a établi Ibn Khaldoun...'
					},
					{
						label: 'Par l’exemple',
						rule: 'Fait réel, historique ou vécu',
						example: 'L’essor scientifique de Cordoue.'
					},
					{
						label: 'Par l’absurde',
						rule: 'Montrer l’issue absurde de l’idée adverse',
						example: 'Si l’on supprimait les livres...'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الفرق الأساسي بين « convaincre » و « persuader » في التحليل الحجاجي؟',
					hintAr: 'الأول يتوجه إلى العقل والمنطق، والثاني يتوجه إلى الوجدان والمشاعر والقيم.',
					expectedInput: 'Convaincre يخاطب العقل بالحجج المنطقية والأدلة الموضوعية؛ أما Persuader فيخاطب الوجدان والقيم بالصور والأسلوب المؤثر',
					revealAr: 'الكاتب البارع يزاوج بين الإقناع العقلي (convaincre) والاستمالة الوجدانية (persuader) لكسب تأييد القارئ عقلاً وقلباً.'
				},
				{
					promptAr: 'ما نوع الحجة في العبارة: « Comme l’avait déjà observé Ibn Khaldoun dans sa Muqaddimah, la maîtrise de la langue maternelle fonde la clarté de la pensée. »؟',
					hintAr: 'اعتمد الكاتب هنا على اسم عالم ومفكر معترف بمكانته.',
					expectedInput: 'حجة سلطة علمية (Un argument d’autorité)',
					revealAr: 'حجة السلطة (Argument d’autorité) تستند إلى قول عالم أو خبير أو هيئة موثوقة (مثل ابن خلدون، ابن الهيثم، تقارير اليونسكو) لتقوية مصداقية الأطروحة.'
				},
				{
					promptAr: 'كيف يعمل « le raisonnement par l’absurde » (الحجة بالخُلف) لدحض فكرة خصم؟',
					hintAr: 'افترض جدلاً أن فكرة الخصم صحيحة، ثم استخرج نتيجتها السخيفة أو المستحيلة!',
					expectedInput: 'القبول المؤقت بفرضية الخصم لبيان أنها تؤدي حتماً إلى نتيجة متناقضة أو غير معقولة',
					revealAr: 'مثال: « Si la traduction automatique suffisait à comprendre toutes les nuances culturelles, alors nul n’aurait plus besoin d’apprendre aucune langue étrangère ! » -> إثبات بطلان الفرضية ببيان نتيجتها المستحيلة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الإقناع (Convaincre): مخاطبة العقل (la raison) عبر الحجج المنطقية، الأرقام، الدراسات العلمية، وعلاقات السبب والنتيجة.',
				'الاستمالة (Persuader): مخاطبة الوجدان والضمير (la sensibilité et les valeurs) عبر الصور البلاغية، المعجم التقييمي، والأسئلة البلاغية.',
				'تصنيف الحجج الأربع في BAC LE: (1) الحجة المنطقية (Argument logique)؛ (2) حجة السلطة (Argument d’autorité : الاستشهاد بعالم أو خبير أو نص مرجعي)؛ (3) حجة المثال (Argument d’exemple : استقراء واقعة ملموسة)؛ (4) الحجة بالخُلف (Argument par l’absurde : دفع أطروحة الخصم إلى نتيجتها غير المعقولة لإبطالها).',
				'الفرق بين المثال التوضيحي (Exemple illustratif : يوضح حجة سابقة بـ par exemple / notamment) والمثال الإثباتي (Exemple argumentatif : يقوم بنفسه مقام الحجة لإثبات الفكرة).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Convaincre vs Persuader (BAC LE)',
				subtitle: 'Deux stratégies complémentaires du débat',
				columns: [
					{
						header: 'Convaincre',
						rule: 'Appel à la raison / logique',
						examples: 'statistiques, causes, preuves'
					},
					{
						header: 'Persuader',
						rule: 'Appel au cœur / valeurs',
						examples: 'métaphores, empathie, lexique fort'
					},
					{
						header: 'Réfuter',
						rule: 'Démontrer les failles adverses',
						examples: 'par l’absurde, contre-exemple'
					}
				]
			}),
			visualCaptionAr: 'مقارنة استراتيجيات الإقناع والاستمالة والدحض في نصوص النقاش باللغات الأجنبية.',
			examples: [
				{
					problemAr: 'Identifiez le type d’argument : « D’après les travaux d’Ibn Al-Haytham, l’observation rigoureuse prime toujours sur les préjugés. »',
					solutionAr: 'Un argument d’autorité (référence à un savant reconnu pour appuyer la valeur de la méthode expérimentale).'
				},
				{
					problemAr: 'Identifiez le raisonnement : « Si l’on abandonnait la lecture sous prétexte qu’Internet résume tout, les humains finiraient par ne plus savoir penser sans connexion. »',
					solutionAr: 'Un raisonnement par l’absurde (il pousse la thèse adverse jusqu’à sa conséquence déraisonnable pour la réfuter).'
				},
				{
					problemAr: 'Relevez un contre-exemple réfutant l’idée que « la traduction est purement mécanique ».',
					solutionAr: 'Un proverbe arabe ou un vers poétique perd tout son sens s’il est traduit mot à mot par un logiciel sans compréhension culturelle.'
				}
			],
			watchOutAr: 'لا تكتفِ في الامتحان بكتابة « l’auteur donne un argument »؛ بل سمِّ نوع الحجة بدقة (argument d’autorité / d’exemple / logique / par l’absurde) وبيّن الوظيفة التي تؤديها!'
		},
		practice: [
			{
				questionAr: 'Quelle est la différence fondamentale entre « convaincre » et « persuader » ?',
				options: [
					'Convaincre s’adresse à la raison par des preuves logiques, tandis que persuader touche la sensibilité et les valeurs',
					'Convaincre s’utilise uniquement dans les textes historiques',
					'Persuader interdit tout exemple concret',
					'Les deux verbes sont strictement incompatibles dans un même texte'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الإقناع للعقل بالمنطق، والاستمالة للوجدان والقيم، وكثيراً ما يجتمعان معاً.',
					'خطأ: الإقناع جوهر نص النقاش الفكري.',
					'خطأ: الاستمالة تستفيد من الأمثلة المؤثرة.',
					'خطأ: يجتمعان كثيراً في النص الحجاجي المتكامل.'
				],
				explanationAr: 'يعتمد الكاتب على العقل (convaincre) وعلى التأثير القيمي والأسلوبي (persuader).'
			},
			{
				questionAr: 'Comment nomme-t-on un argument qui s’appuie sur l’avis d’un savant reconnu ou d’une institution scientifique ?',
				options: [
					'Un argument par l’absurde',
					'Un argument d’autorité',
					'Une antiphrase',
					'Un contre-sens'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الخُلف يفند الفكرة بنتيجتها المستحيلة.',
					'ممتاز: الاستشهاد بخبير أو عالم أو هيئة علمية يُسمى argument d’autorité.',
					'خطأ: السخرية الضدية صورة بلاغية.',
					'خطأ: contre-sens يعني سوء فهم.'
				],
				explanationAr: 'تستمد حجة السلطة قوتها من مكانة العالم أو المرجع المستشهد به.'
			},
			{
				questionAr: 'Dans : « Si la machine devait penser à notre place, l’école n’aurait plus qu’à fermer ses portes ! », quel type d’argument identifiez-vous ?',
				options: [
					'Un argument chiffré statistique',
					'Un argument d’autorité',
					'Un raisonnement par l’absurde',
					'Une simple chronologie'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: لا توجد أرقام أو إحصائيات.',
					'خطأ: لا يوجد استشهاد بعالم.',
					'صحيح: يُبرز النتيجة العبثية (إغلاق المدارس) لإثبات بطلان فكرة الاعتماد الكلي على الآلة.',
					'خطأ: لا يوجد سرد زمني.'
				],
				explanationAr: 'البرهان بالخلف (par l’absurde) يفنّد فكرة ببيان عاقبتها غير المعقولة.'
			},
			{
				questionAr: 'Quel rôle joue un « contre-exemple » dans un débat d’idées ?',
				options: [
					'Confirmer intégralement la thèse de l’adversaire',
					'Allonger l’introduction sans rapport avec la problématique',
					'Remplacer la conclusion du texte',
					'Réfuter une généralisation excessive en citant un cas réel qui la contredit'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: المثال المضاد يبطل أطروحة الخصم لا يؤكدها.',
					'خطأ: مكانه في صلب الحجاج والدحض.',
					'خطأ: لا يعوض الخاتمة.',
					'أحسنت: يكفي مثال مضاد واقعي واحد لهدم تعميم خاطئ!'
				],
				explanationAr: 'المثال المضاد (contre-exemple) سلاح فعّال لدحض التعميمات المتسرعة.'
			},
			{
				questionAr: 'Quel connecteur introduit le plus clairement un exemple illustratif dans un paragraphe argumentatif ?',
				options: ['Notamment / À titre d’illustration', 'Bien que', 'En somme', 'Auparavant'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: notamment و par exemple و à titre d’illustration تقدّم الأمثلة التوضيحية.',
					'خطأ: bien que للاستدراك.',
					'خطأ: en somme للخاتمة.',
					'خطأ: auparavant للزمن الماضي.'
				],
				explanationAr: 'الروابط الدالة على التمثيل تجعل الحجة ملموسة وأكثر إقناعاً.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 2: La concession suivie de réfutation et le mode subjonctif / indicatif
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_le_t2_concession_refutation_modes',
		slug: 'fre-3as-le-t2-concession-refutation-modes',
		grade: '3as_le',
		yearSubjectId: 788,
		trimesterId: 't2',
		sequenceId: 'projet2',
		sequenceTitleAr: 'المشروع 2: Le débat d’idées (البلاغة، الحجاج والمقال الجدلي — لغات أجنبية)',
		order: 2,
		titleAr: 'الاستدراك المتبوع بالدحض واستعمال المنصوب والمرفوع (Subjonctif vs Indicatif — BAC LE)',
		objectives: [
			'إتقان البنى المتقدمة للاستدراك في شعبة اللغات الأجنبية: « bien que / quoique / sans que + subjonctif »، و« quelque + adj. + que + subjonctif »، و« tout + adj. + que + indicatif »',
			'التمييز الدقيق بين أدوات المنصوب (Subjonctif)، والمرفوع (Indicatif : même si, alors que, tandis que)، والشرطي (Quand bien même + conditionnel)',
			'توظيف الاستدراك المركب في التحويل النحوي وفي تحرير المقال الجدلي لرفع علامة الكفاءة اللغوية'
		],
		keywordsAr: ['Concession avancée', 'Subjonctif', 'Indicatif', 'Quand bien même', 'Conditionnel', 'Réfutation'],
		discover: {
			scenarioAr:
				'في شعبة اللغات الأجنبية، لا تقتصر أسئلة الاستدراك على « bien que » فقط! بل يمتد التمييز إلى « quand bien même + conditionnel »، و« avoir beau + infinitif »، و« alors que / tandis que + indicatif »، مع دقة اختيار الصيغة الفعلية (Mode) في كل تركيب.',
			svg: svgFrenchGrammarMap({
				title: 'Modes verbaux de la concession (BAC LE)',
				rootLabel: 'Choisir le bon MODE',
				rootSub: 'Chaque outil concessif impose sa propre syntaxe',
				branches: [
					{
						label: 'Subjonctif',
						rule: 'bien que, quoique, encore que',
						example: 'Quoiqu’elle soit rapide, l’IA se trompe.'
					},
					{
						label: 'Indicatif',
						rule: 'même si, alors que, tandis que',
						example: 'Même si elle traduit vite, elle ignore le ton.'
					},
					{
						label: 'Conditionnel',
						rule: 'quand bien même (+ cond.)',
						example: 'Quand bien même elle progresserait...'
					},
					{
						label: 'Infinitif / Nom',
						rule: 'avoir beau + inf. / en dépit de + nom',
						example: 'Il a beau chercher, il doute encore.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الصيغة الفعلية (Mode) المستعملة بعد « avoir beau » في عبارة: « Les logiciels ont beau progresser, ils ne saisissent pas l’humour d’une langue. »؟',
					hintAr: 'انظر إلى شكل الفعل « progresser » مباشرة بعد « ont beau ».',
					expectedInput: 'المصدر (L’infinitif) بعد تصريف الفعل avoir + beau',
					revealAr: 'التعبير الأنيق « avoir beau + infinitif » يعبّر عن استدراك قوي (مهما فعل / رغم أنه...) ويُعد علامة تميز لغوي في بكالوريا اللغات الأجنبية.'
				},
				{
					promptAr: 'ما الفرق بين « alors que / tandis que » (التقابل المحض) و « bien que » (الاستدراك المانع)؟',
					hintAr: 'قارن: « Le traducteur saisit la culture alors que le logiciel traduit mot à mot » و « Bien que le logiciel soit rapide, il commet des contresens ».',
					expectedInput: 'alors que / tandis que تقابل بين حقيقتين متباينتين في Indicatif؛ و bien que تعارض سبباً متوقعاً بالنتيجة في Subjonctif',
					revealAr: 'أدوات التقابل (alors que, tandis que) تأخذ دائماً Indicatif، بينما أدوات الاستدراك التبعي (bien que, quoique, encore que) تفرض Subjonctif.'
				},
				{
					promptAr: 'ما الصيغة الفعلية الواجب استعمالها بعد الرابط الراقي « quand bien même »؟',
					hintAr: 'إنه استدراك افتراضي مبالغ فيه (حتى ولو...).',
					expectedInput: 'الشرطي (Le conditionnel : Quand bien même la machine saurait tout...)',
					revealAr: '« Quand bien même » يتبعه دائماً Conditionnel (présent ou passé) للتعبير عن استدراك افتراضي قوي.'
				}
			]
		},
		summary: {
			rulesAr: [
				'مجموعة المنصوب (Subjonctif): bien que، quoique، encore que، sans que، si + adj. + que (ex. : si savant qu’il soit -> مهما كان عالماً).',
				'مجموعة المرفوع (Indicatif): même si، alors que، tandis que، tout + adj. + que (ex. : tout brillant qu’il est)، certes... mais، cependant، pourtant، en revanche.',
				'مجموعة الشرطي (Conditionnel): quand bien même (ex. : Quand bien même un logiciel traduirait mille pages par seconde, il resterait privé de sensibilité).',
				'مجموعة الاسم والمصدر: malgré + nom، en dépit de + nom، loin de + infinitif، avoir beau + infinitif (ex. : On a beau multiplier les écrans, le livre garde son prestige).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Quatre modes concessifs de haut niveau',
				subtitle: 'Tableau de référence BAC 3AS Langues Étrangères',
				columns: [
					{
						header: 'Subjonctif',
						rule: 'bien que / quoique / si... que',
						examples: 'Si habile qu’il soit...'
					},
					{
						header: 'Indicatif',
						rule: 'même si / tandis que',
						examples: 'Tandis que le papier apaise...'
					},
					{
						header: 'Conditionnel / Inf.',
						rule: 'quand bien même / avoir beau',
						examples: 'Il a beau insister...'
					}
				]
			}),
			visualCaptionAr: 'المصفوفة المتقدمة للصيغ الفعلية في الاستدراك والدحض لشعبة اللغات الأجنبية.',
			examples: [
				{
					problemAr: 'Réécrivez avec « avoir beau » : « Bien que certains minimisent le rôle de la langue maternelle, elle structure toute pensée. »',
					solutionAr: 'Certains ont beau minimiser le rôle de la langue maternelle, elle structure toute pensée.'
				},
				{
					problemAr: 'Complétez au mode convenable : « Quand bien même la traduction automatique (devenir) instantanée, le traducteur humain resterait indispensable. »',
					solutionAr: 'Quand bien même la traduction automatique deviendrait instantanée, le traducteur humain resterait indispensable.'
				},
				{
					problemAr: 'Transformez avec « alors que » : « L’esprit critique vérifie les sources ; la crédulité propage les rumeurs. »',
					solutionAr: 'L’esprit critique vérifie les sources alors que la crédulité propage les rumeurs.'
				}
			],
			watchOutAr: 'انتبه للفرق الإملائي والدلالي بين « quoique » (كلمة واحدة = bien que + subjonctif : استدراك) و« quoi que » (كلمتان = quelle que soit la chose que + subjonctif : مهما يكن الشيء مثل « Quoi qu’on en dise »)!'
		},
		practice: [
			{
				questionAr: 'Complétez avec le mode exact : « Quand bien même ce programme .......... vingt langues, il ne ressentirait aucune nuance poétique. » (maîtriser)',
				options: ['maîtriserait', 'maîtrise', 'maîtrisa', 'maîtrisant'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: بعد « quand bien même » نضع الفعل في الشرطي (Conditionnel : maîtriserait).',
					'خطأ: maîtrise في المضارع المرفوع.',
					'خطأ: هذا الماضي البسيط.',
					'خطأ: لا نضع اسم الفاعل بعد quand bien même.'
				],
				explanationAr: 'الأداة « quand bien même » تتطلب دائماً صيغة الشرطي (Conditionnel).'
			},
			{
				questionAr: 'Transformez élégamment avec « avoir beau » : « Bien que les écrans multiplient les effets, ils ne remplacent pas le dialogue. »',
				options: [
					'Les écrans ont beau multiplié les effets, ils ne remplacent pas le dialogue.',
					'Les écrans ont beau multiplier les effets, ils ne remplacent pas le dialogue.',
					'Les écrans sont beau multiplier les effets, ils ne remplacent pas le dialogue.',
					'Les écrans ont beau que multiplier les effets, ils ne remplacent pas le dialogue.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: بعد avoir beau نضع المصدر (multiplier) وليس اسم المفعول.',
					'ممتاز: التركيب القياسي هو avoir (conjugué) + beau + infinitif.',
					'خطأ: نستخدم الفعل avoir لا être.',
					'خطأ: لا نضع « que » بعد beau.'
				],
				explanationAr: 'التعبير الاستدراكي « avoir beau + infinitif » يثري أسلوب مقالات BAC LE.'
			},
			{
				questionAr: 'Distinguez correctement « quoique » et « quoi que » : « .......... l’on prétende, la lecture approfondie demeure irremplaçable. »',
				options: ['Quoique', 'Malgré que', 'Quoi que', 'Alors que'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: « quoique » كلمة واحدة تعني bien que ولا تناسب وجود مفعول به محذوف لـ prétende.',
					'خطأ: عبارة مرفوضة نحوياً.',
					'صحيح: « Quoi que » (كلمتان = quelle que soit la chose que) تعني « مهما يزعموا » وتتبع بالمنصوب.',
					'خطأ: alors que تأخذ Indicatif ولا تؤدي معنى التعميم هنا.'
				],
				explanationAr: '« Quoi que » في كلمتين تعني « أياً كان ما... »، و« quoique » في كلمة واحدة ترادف « bien que ».'
			},
			{
				questionAr: 'Complétez au bon mode : « Si brillant que .......... cet orateur, ses arguments manquent de preuves. » (être)',
				options: ['est', 'sera', 'était', 'soit'],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: est في Indicatif.',
					'خطأ: sera في Futur.',
					'خطأ: était في Imparfait.',
					'أحسنت: التركيب الاستدراكي « si + adjectif + que » يفرض Subjonctif (soit).'
				],
				explanationAr: 'الصيغة الراقية « si / quelque + adjectif + que » تتبع دائماً بـ Subjonctif.'
			},
			{
				questionAr: 'Dans : « Le livre encourage la méditation tandis que le flux continu encourage la précipitation », quel mode et quel rapport identifiez-vous ?',
				options: [
					'Indicatif — rapport d’opposition',
					'Subjonctif — rapport de but',
					'Conditionnel — rapport de cause',
					'Impératif — rapport de temps'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: « tandis que » يربط بين فكرتين متقابلتين ويأخذ Indicatif.',
					'خطأ: ليس منصوباً ولا غاية.',
					'خطأ: ليس شرطياً ولا سبباً.',
					'خطأ: ليس أمراً ولا زمناً.'
				],
				explanationAr: 'الرابطان « tandis que » و « alors que » يعبران عن التقابل ويأخذان Indicatif.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 3: Rhétorique et figures de style (métaphore, anaphore, question rhétorique, antithèse)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_le_t2_rhetorique_figures_style',
		slug: 'fre-3as-le-t2-rhetorique-figures-style',
		grade: '3as_le',
		yearSubjectId: 788,
		trimesterId: 't2',
		sequenceId: 'projet2',
		sequenceTitleAr: 'المشروع 2: Le débat d’idées (البلاغة، الحجاج والمقال الجدلي — لغات أجنبية)',
		order: 3,
		titleAr: 'البلاغة والصور البيانية في نص النقاش (Métaphore, anaphore, question rhétorique, antithèse)',
		objectives: [
			'التمييز الدقيق بين الصور البلاغية الأربع الأكثر حضوراً في BAC LE: الاستعارة (Métaphore)، التكرار الاستهلالي (Anaphore)، السؤال البلاغي (Question rhétorique)، والطباق والتدرج (Antithèse / Gradation)',
			'تحليل القيمة الحجاجية لكل صورة بلاغية (لماذا اختارها الكاتب لإقناع القارئ واستمالته؟)',
			'توظيف صورة بلاغية راقية ومدروسة داخل فقرات المقال الجدلي في امتحان اللغات الأجنبية'
		],
		keywordsAr: ['Métaphore', 'Anaphore', 'Question rhétorique', 'Antithèse', 'Gradation', 'Rhétorique'],
		discover: {
			scenarioAr:
				'في شعبة اللغات الأجنبية، لا تُدرس الصور البلاغية للزينة فحسب، بل كأدوات حجاجية (procédés rhétoriques) تُضاعف قوة الإقناع: الاستعارة تجسّد الفكرة المجردة، التكرار الاستهلالي يرسّخ الإلحاح، والسؤال البلاغي يفرض الجواب البديهي على عقل القارئ!',
			svg: svgFrenchGrammarMap({
				title: 'Figures de style argumentatives (BAC LE)',
				rootLabel: 'L’art de la rhétorique',
				rootSub: 'Nommer la figure + expliquer son effet persuasif',
				branches: [
					{
						label: 'Métaphore',
						rule: 'Comparaison implicite sans outil',
						example: 'La langue est un pont entre peuples.'
					},
					{
						label: 'Anaphore',
						rule: 'Même mot répété en début de phrases',
						example: 'Lire pour comprendre. Lire pour agir.'
					},
					{
						label: 'Question rhétorique',
						rule: 'Fausse question à réponse évidente',
						example: 'Peut-on vivre sans mémoire ?'
					},
					{
						label: 'Gradation / Antithèse',
						rule: 'Progression croissante ou contraste',
						example: 'Douter, vérifier, comprendre.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الفرق بين التشبيه (Comparaison) والاستعارة (Métaphore) في العبارتين: « La langue est comme un pont » و « La langue est un pont vivant entre les cultures »؟',
					hintAr: 'لاحظ حضور أو غياب أداة التشبيه (comme, tel que, semblable à).',
					expectedInput: 'التشبيه يوظف أداة مقارنة صريحة (comme)؛ أما الاستعارة فتدمج المشبّه والمشبّه به مباشرة بلا أداة تشبيه',
					revealAr: 'الاستعارة (Métaphore) أكثر كثافة وقوة في المقالات لأنها تجعل القارئ يرى الفكرة المجردة صورةً ملموسةً حية.'
				},
				{
					promptAr: 'ماذا نسمي تكرار عبارة « Sans éthique, ... » في بداية ثلاث جمل متوالية، وما أثرها الحجاجي؟',
					hintAr: 'يسمى هذا التكرار الاستهلالي في البلاغة الفرنسية L’anaphore.',
					expectedInput: 'تكرار استهلالي (Une anaphore) يخلق إيقاعاً قوياً ويؤكد بإلحاح على الفكرة المحورية',
					revealAr: 'الأنافور (Anaphore) تعطي الخطاب إيقاعاً خطابياً مؤثراً وتطبع الفكرة الأساسية في ذهن المتلقي.'
				},
				{
					promptAr: 'في نص يناقش أخلاق العلم، لماذا يطرح الكاتب سؤالاً مثل: « Peut-on vraiment qualifier de progrès une invention qui détruit la nature ? »؟',
					hintAr: 'هل ينتظر الكاتب جواباً مجهولاً أم يوجّه القارئ نحو جواب بديهي هو « Non ! »؟',
					expectedInput: 'سؤال بلاغي / إنكاري (Question rhétorique / oratoire) يشرك القارئ ويقوده إلى الجواب البديهي المؤيد لأطروحة الكاتب',
					revealAr: 'السؤال البلاغي لا يستعلم عن مجهول، بل يفرض فكرة واضحة (Non, ce n’est pas un vrai progrès) بإشراك وجدان وعقل القارئ.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الاستعارة (La métaphore): مقارنة ضمنية بلا أداة تشبيه (ex. : « Les livres sont les phares de l’esprit ») -> تجسّد الفكرة المجردة وتجعل الحجة ملموسة ومؤثرة.',
				'التكرار الاستهلالي (L’anaphore): تكرار كلمة أو عبارة في بداية جمل أو عبارات متتالية (ex. : « Apprendre une langue, c’est... Apprendre une langue, c’est... ») -> يمنح إيقاعاً خطابياً ويؤكد الإلحاح على الحجة.',
				'السؤال البلاغي (La question rhétorique / oratoire): سؤال لا ينتظر إجابة لأن جوابه بديهي ضمنياً -> يشرك القارئ ويضطره منطقياً لتبني موقف الكاتب.',
				'الطباق والتدرج (L’antithèse et la gradation): الطباق يبرز التناقض بين فكرتين (ex. : construire / détruire)، والتدرج يرتّب الألفاظ تصاعدياً أو تنازلياً (ex. : « l’inattention, la négligence, puis l’abandon total ») لإبراز خطورة الظاهرة.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Formule d’analyse stylistique (BAC LE)',
				subtitle: 'Identifier + Citer + Interpréter l’effet',
				columns: [
					{
						header: '1. Nommer',
						rule: 'Métaphore / Anaphore / Antithèse',
						examples: 'Il s’agit d’une métaphore...'
					},
					{
						header: '2. Citer',
						rule: 'Reprendre l’expression exacte',
						examples: '« phares de l’esprit »'
					},
					{
						header: '3. Interpréter',
						rule: 'Relier à la visée persuasive',
						examples: 'valorise le rôle guidant du livre'
					}
				]
			}),
			visualCaptionAr: 'الطريقة الثلاثية المضمونة للإجابة عن سؤال الصورة البلاغية في بكالوريا اللغات الأجنبية.',
			examples: [
				{
					problemAr: 'Identifiez la figure et sa valeur : « Traduire, c’est écouter l’autre ; traduire, c’est respecter sa culture ; traduire, c’est bâtir un pont durable. »',
					solutionAr: 'Anaphore (« traduire, c’est ») doublée d’une métaphore finale (« bâtir un pont durable ») : insiste avec rythme sur la noblesse culturelle et humaine de la traduction.'
				},
				{
					problemAr: 'Identifiez la figure : « L’usage excessif des écrans distrait l’élève, affaiblit sa mémoire et finit par étouffer sa créativité. »',
					solutionAr: 'Une gradation ascendante (distrait -> affaiblit -> étouffe) : dramatise progressivement les conséquences pour mieux alerter le lecteur.'
				},
				{
					problemAr: 'Quel est le rôle de la question rhétorique : « Faut-il sacrifier notre langue maternelle pour réussir dans les langues étrangères ? » ?',
					solutionAr: 'Impliquer le lecteur et l’amener à répondre implicitement « Non », en défendant un plurilinguisme fidèle à son identité.'
				}
			],
			watchOutAr: 'في بكالوريا اللغات الأجنبية، لا تكتفِ بتسمية الصورة البلاغية! نصف النقطة على التسمية الصحيحة (métaphore, anaphore...) والنصف الآخر على شرح أثرها الحجاجي داخل النص.'
		},
		practice: [
			{
				questionAr: 'Quelle figure de style reconnaissez-vous dans : « La langue maternelle est le socle invisible de notre pensée » ?',
				options: ['Une métaphore', 'Une comparaison avec outil', 'Une anaphore', 'Une question rhétorique'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: شبه اللغة الأم بالقاعدة الصلبة (socle) دون استعمال أداة تشبيه.',
					'خطأ: لا توجد أداة تشبيه (comme, tel que).',
					'خطأ: لا يوجد تكرار في بداية الجمل.',
					'خطأ: الجملة خبرية.'
				],
				explanationAr: 'الاستعارة تقيم تماثلاً مباشراً بين فكرة مجردة وصورة ملموسة دون أداة تشبيه.'
			},
			{
				questionAr: 'Identifiez le procédé rhétorique dans : « Sans lecture, pas de vocabulaire. Sans lecture, pas de nuance. Sans lecture, pas de pensée libre. »',
				options: ['Une antiphrase', 'Une anaphore', 'Une comparaison', 'Une périphrase'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الكلام جاد وليس ساخراً.',
					'ممتاز: تكرار « Sans lecture » في بداية ثلاث جمل متتابعة هو L’anaphore.',
					'خطأ: لا توجد مقارنة بأداة.',
					'خطأ: ليست كناية تعريفية.'
				],
				explanationAr: 'الأنافور تكرر نفس العبارة في مطلع جمل متتابعة لتقوية الإيقاع والتأكيد.'
			},
			{
				questionAr: 'Quelle est la fonction persuasive d’une « question rhétorique » dans un débat d’idées ?',
				options: [
					'Demander un renseignement que l’auteur ignore',
					'Changer brusquement de sujet',
					'Impliquer le lecteur en imposant une réponse évidente favorable à la thèse de l’auteur',
					'Exprimer un ordre à l’impératif'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: الكاتب يعرف الجواب مسبقاً.',
					'خطأ: السؤال يخدم صلب الأطروحة.',
					'صحيح: يفرض الجواب البديهي ويجعل القارئ شريكاً في الاستنتاج.',
					'خطأ: ليست صيغة أمر.'
				],
				explanationAr: 'السؤال البلاغي وسيلة استمالة قوية تقود القارئ إلى الموافقة الضمنية.'
			},
			{
				questionAr: 'Dans : « L’erreur inquiète, le mensonge blesse, la falsification détruit la confiance », quelle figure structure la progression des verbes ?',
				options: [
					'Un oxymore',
					'Une litote',
					'Une onomatopée',
					'Une gradation ascendante'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: لا يوجد لفظان متناقضان متلاصقان.',
					'خطأ: الليتوت تخفيف التعبير لقول الأكثر.',
					'خطأ: لا توجد محاكاة صوتية.',
					'أحسنت: ترتيب الأفعال يتصاعد في الشدة (inquiète -> blesse -> détruit) = gradation ascendante.'
				],
				explanationAr: 'التدرج التصاعدي يضاعف وقع الحجة ويكشف خطورة التراكم.'
			},
			{
				questionAr: 'Pourquoi l’analyse d’une figure de style en BAC LE doit-elle toujours comporter une interprétation ?',
				options: [
					'Parce que la figure sert une intention argumentative précise (valoriser, alerter, convaincre)',
					'Parce que la grammaire interdit de nommer les figures',
					'Parce que les textes de débat ne contiennent jamais d’antithèse',
					'Parce que le style n’a aucun lien avec le sens'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: البلاغة في الحجاج وظيفية؛ شرح أثرها يثبت الفهم العميق للنص.',
					'خطأ: التسمية مطلوبة ومكملة للتفسير.',
					'خطأ: الطباق شائع جداً في نصوص النقاش.',
					'خطأ: الأسلوب والمعنى متلازمان.'
				],
				explanationAr: 'الجمع بين تسمية الصورة وشرح وظيفتها الحجاجية يمنحك العلامة الكاملة.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 4: Cohésion textuelle, substituts complexes et portée argumentative
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_le_t2_cohesion_substituts_portee',
		slug: 'fre-3as-le-t2-cohesion-substituts-portee',
		grade: '3as_le',
		yearSubjectId: 788,
		trimesterId: 't2',
		sequenceId: 'projet2',
		sequenceTitleAr: 'المشروع 2: Le débat d’idées (البلاغة، الحجاج والمقال الجدلي — لغات أجنبية)',
		order: 4,
		titleAr: 'الاتساق النصي، البدائل المركبة ومداها الحجاجي (Cohésion, substituts anaphoriques et portée)',
		objectives: [
			'تحديد مراجع البدائل النحوية المركبة (celui-ci / celui-là, ce dernier, dont, auquel, ce qui / ce que, en / y) دون أخطاء',
			'إدراك الدور الحجاجي للبديل المعجمي التقييمي (Anaphore conceptuelle : « cette illusion », « ce défi majeur », « cette dérive ») في تلخيص فقرة كاملة وتوجيه القارئ',
			'تحسين تماسك الفقرات (Progression thématique) وتفادي القطيعة المنطقية في المقالات الطويلة'
		],
		keywordsAr: ['Cohésion textuelle', 'Anaphore conceptuelle', 'Substituts complexes', 'Celui-ci / Celui-là', 'Progression thématique'],
		discover: {
			scenarioAr:
				'في نصوص بكالوريا اللغات الأجنبية، غالباً ما تحيل الكلمة المسطر تحتها ليس إلى كلمة واحدة، بل إلى **فكرة أو جملة كاملة**! مثل: « Certains croient que la machine suffit à traduire la poésie. [[Cette illusion]] oublie la sensibilité culturelle. » لاحظ كيف يلخّص البديل الفكرة ويحكم عليها في الوقت نفسه!',
			svg: svgFrenchGrammarMap({
				title: 'Cohésion et substituts avancés (BAC LE)',
				rootLabel: 'Relier et orienter le texte',
				rootSub: 'Au-delà de « il / elle » : les reprises complexes',
				branches: [
					{
						label: 'Celui-ci / Celui-là',
						rule: 'celui-ci = le plus proche',
						example: 'Le papier et l’écran : celui-ci va vite.'
					},
					{
						label: 'Pronoms composés',
						rule: 'auquel, duquel, dont, ce qui',
						example: 'Le défi auquel nous faisons face.'
					},
					{
						label: 'Anaphore résomptive',
						rule: 'Résume toute une proposition',
						example: '« Ce constat », « Cette dérive »'
					}
				]
			}),
			steps: [
				{
					promptAr: 'في الجملة: « Le débat oppose le livre imprimé et le support numérique ; celui-ci offre la rapidité, tandis que celui-là favorise la profondeur. » إلى أي منهما يشير « celui-ci » وإلى أيهما يشير « celui-là »؟',
					hintAr: 'تذكر قاعدة القرب: -ci (ici = الأقرب)، -là (الأبعد في الجملة).',
					expectedInput: 'celui-ci = الأقرب (le support numérique) | celui-là = الأبعد (le livre imprimé)',
					revealAr: 'قاعدة حاسمة في البكالوريا: celui-ci / ce dernier يعودان دائماً على الاسم الثاني (الأقرب)، و celui-là يعود على الاسم الأول (الأبعد)!'
				},
				{
					promptAr: 'ما الفرق بين بديل محايد مثل « cette idée » وبديل تقييمي مثل « cette illusion dangereuse »؟',
					hintAr: 'هل يكتفي الثاني بالإحالة أم يضيف حكماً نقدياً من الكاتب؟',
					expectedInput: 'البديل التقييمي يحيل إلى الفكرة السابقة ويدحضها ضمنياً بكلمة واحدة (illusion dangereuse)',
					revealAr: 'تُسمى هذه الظاهرة « anaphore évaluative / résomptive »: فهي تحقّق الاتساق النصي وتمرّر موقف الكاتب الحجاجي في آن واحد.'
				},
				{
					promptAr: 'في عبارة: « L’apprentissage des langues ouvre l’esprit, [[ce qui]] favorise le dialogue entre cultures. » ما مرجع « ce qui »؟',
					hintAr: 'هل يحيل إلى كلمة « esprit » وحدها أم إلى الجملة الأولى بأكملها؟',
					expectedInput: 'يحيل إلى الجملة الأولى كاملة (le fait que l’apprentissage des langues ouvre l’esprit)',
					revealAr: '« ce qui » و « ce que » بعد الفاصلة تحيلان دوماً إلى فكرة الجملة السابقة بأكملها (reprise propositionnelle).'
				}
			]
		},
		summary: {
			rulesAr: [
				'القاعدة الذهبية لـ celui-ci / celui-là / ce dernier: في مقابلة بين عنصرين (A et B)، يعود « celui-ci » و« ce dernier » على العنصر الأقرب (B)، ويعود « celui-là » على العنصر الأبعد (A).',
				'الضمائر الموصولة المركبة: dont (= de + nom)، auquel / à laquelle / auxquels (= à + nom)، ce qui / ce que (تحيلان إلى فكرة جملة سابقة كاملة).',
				'الإحالة التلخيصية التقييمية (Anaphore résomptive et évaluative): عبارة اسمية مسبوقة باسم إشارة (ce, cette, ces) تلخّص فقرة سابقة وتحمل قيمة حجاجية (ممدوحة: cet atout décisif / مذمومة: cette illusion, cette dérive).',
				'التدرج الموضوعي (Progression thématique): ضمان انسيابية النص بحيث يرتبط كل سطر جديد بمعلومة سابقة عبر البدائل والروابط دون قفزات مفاجئة.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Repères des pronoms complexes (BAC LE)',
				subtitle: 'Identifier sans faute le référent exact',
				columns: [
					{
						header: 'celui-ci / ce dernier',
						rule: 'Renvoie au 2e terme (proche)',
						examples: 'A et B : celui-ci = B'
					},
					{
						header: 'ce qui / cela',
						rule: 'Renvoie à toute une phrase',
						examples: 'Il lit, ce qui l’aide.'
					},
					{
						header: 'cette dérive / atout',
						rule: 'Résume + juge la thèse',
						examples: 'Anaphore argumentative'
					}
				]
			}),
			visualCaptionAr: 'دليل فك الإحالات المركبة والتقييمية في نصوص بكالوريا اللغات الأجنبية.',
			examples: [
				{
					problemAr: 'À quoi renvoient « celui-ci » et « celui-là » dans : « La science et l’éthique doivent marcher ensemble ; celle-ci éclaire les fins tandis que celle-là fournit les moyens. » ?',
					solutionAr: '« celle-ci » renvoie au terme le plus proche : l’éthique. « celle-là » renvoie au terme le plus éloigné : la science.'
				},
				{
					problemAr: 'Quelle double fonction remplit « cette dérive » dans : « Copier un devoir grâce à un robot prive l’élève de réflexion. Cette dérive menace l’équité scolaire. » ?',
					solutionAr: '1) Cohésion (elle résume toute la phrase précédente) ; 2) Portée argumentative (le nom péjoratif « dérive » condamne cette pratique).'
				},
				{
					problemAr: 'Complétez avec le pronom relatif convenable : « La maîtrise des langues est un enjeu .......... les étudiants accordent une grande importance. »',
					solutionAr: '« auquel » (accorder de l’importance à un enjeu -> auquel).'
				}
			],
			watchOutAr: 'عند الإجابة عن سؤال « À quoi renvoie "ce qui" / "cette illusion" ? » لا تكتب كلمة مفردة ناقصة، بل صُغ جملة اسمية كاملة تلخّص الفكرة المحال إليها بوضوح!'
		},
		practice: [
			{
				questionAr: 'Dans : « Le traducteur humain et le logiciel automatique collaborent : ce dernier accélère le tri, tandis que le premier garantit la finesse », à quoi renvoie « ce dernier » ?',
				options: [
					'Le logiciel automatique (le terme le plus proche)',
					'Le traducteur humain',
					'La finesse',
					'La collaboration'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: « ce dernier » يحيل دائماً على العنصر المذكور أخيراً (الأقرب).',
					'خطأ: المترجم البشري عاد عليه « le premier ».',
					'خطأ: وردت بعده في الجملة.',
					'خطأ: غير مذكورة كاسم.'
				],
				explanationAr: 'يشير « ce dernier » و« celui-ci » إلى الاسم الأقرب المذكور ثانياً.'
			},
			{
				questionAr: 'Complétez avec le bon pronom relatif composé : « L’éthique numérique est un défi .......... notre génération doit répondre. » (répondre à un défi)',
				options: ['duquel', 'auquel', 'dont', 'où'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: duquel مع حرف الجر de.',
					'ممتاز: الفعل répondre يتعدى بـ à (répondre à un défi -> auquel).',
					'خطأ: dont مع حرف الجر de.',
					'خطأ: où للمكان أو الزمان.'
				],
				explanationAr: 'يُختار الضمير المركب حسب حرف الجر الذي يطلبه الفعل (à + masculin singulier = auquel).'
			},
			{
				questionAr: 'À quoi renvoie « ce qui » dans : « Les étudiants lisent des ouvrages variés, ce qui affine leur sens critique » ?',
				options: [
					'Uniquement le mot « variés »',
					'Uniquement le mot « étudiants »',
					'Toute la proposition précédente (le fait que les étudiants lisent des ouvrages variés)',
					'Le mot « critique »'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: variés صفة فقط.',
					'خطأ: ليست الفاعل وحده بل الفعل كله.',
					'صحيح: « ce qui » بعد الفاصلة يعوض الجملة السابقة بأكملها.',
					'خطأ: جاء بعد الضمير.'
				],
				explanationAr: 'الضمير « ce qui » يحيل إلى مضمون الجملة التي تسبقه بالكامل.'
			},
			{
				questionAr: 'Quelle est la portée argumentative du substitut lexical « cette illusion » reprenant la thèse de l’adversaire ?',
				options: [
					'Elle confirme totalement la vérité de la thèse adverse',
					'Elle reste parfaitement neutre et objective',
					'Elle indique une date historique',
					'Elle résume la thèse adverse tout en la discréditant comme fausse'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: كلمة illusion تعني وهماً لا حقيقة.',
					'خطأ: تحمل حكماً سلبياً واضحاً.',
					'خطأ: ليست مؤشراً زمنياً.',
					'أحسنت: تجمع الإحالة المعجمية التقييمية بين الربط النصي والدحض الضمني.'
				],
				explanationAr: 'اختيار بديل معجمي قدحي مثل « cette illusion » أو « cette dérive » يوجّه القارئ لرفض الفكرة.'
			},
			{
				questionAr: 'Complétez avec le bon pronom : « La culture générale est une richesse .......... nul ne devrait se priver. » (se priver de)',
				options: ['dont', 'auquel', 'que', 'y'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الفعل se priver يتعدى بـ de (se priver d’une richesse -> dont).',
					'خطأ: auquel للمذكر مع à.',
					'خطأ: que للمفعول المباشر بلا حرف جر.',
					'خطأ: y ليس ضمير وصل.'
				],
				explanationAr: 'يُستعمل ضمير الوصل « dont » مع كل فعل أو صفة يتطلب حرف الجر « de ».'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 5: Rédiger une dissertation / production libre engagée (format BAC LE — 8 pts)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_le_t2_dissertation_bac_le',
		slug: 'fre-3as-le-t2-dissertation-bac-le',
		grade: '3as_le',
		yearSubjectId: 788,
		trimesterId: 't2',
		sequenceId: 'projet2',
		sequenceTitleAr: 'المشروع 2: Le débat d’idées (البلاغة، الحجاج والمقال الجدلي — لغات أجنبية)',
		order: 5,
		titleAr: 'منهجية تحرير المقال الجدلي أو الإنتاج الحر الملتزم في بكالوريا لغات أجنبية (8 نقاط)',
		objectives: [
			'بناء مقال جدلي رفيع المستوى (180 إلى 220 كلمة) يستحق 7 إلى 8/8 في شعبة اللغات الأجنبية',
			'توظيف الحجج المتنوعة (منطقية، سلطة علمية، مثال ثقافي/تراثي) وبنية الاستدراك المتقدمة (Certes... mais / Bien que + subjonctif / Avoir beau)',
			'صياغة انتقالات فكرية سلسة (Transitions) وخاتمة تركيبية مفتوحة بأسلوب رصين خالٍ من الحشو والأخطاء'
		],
		keywordsAr: ['Dissertation BAC LE', 'Plan dialectique', 'Production libre 8 pts', 'Transitions', 'Langue soutenue'],
		discover: {
			scenarioAr:
				'الموضوع الثاني (Production libre) في بكالوريا اللغات الأجنبية (8 نقاط!) فرصة ذهبية للمترشحين المتمكنين لإبراز ثقافتهم العامة ولغتهم الراقية في قضايا فكرية ولغوية (التعدد اللغوي، الترجمة، الذكاء الاصطناعي، العلم والأخلاق). كيف تكتب مقالاً يُبهر المصحح؟',
			svg: svgFrenchWritingBlueprint({
				title: 'Architecture de l’essai dialectique (BAC LE — 8 pts)',
				steps: [
					{
						stage: '1. Introduction (40 mots)',
						detail: 'Accroche culturelle + problématique précise + annonce implicite'
					},
					{
						stage: '2. Thèse nuancée (60 mots)',
						detail: '2 arguments solides + 1 exemple culturel/scientifique concret'
					},
					{
						stage: '3. Antithèse / Limites (60 mots)',
						detail: 'Transition concessive + réfutation / limites + contre-exemple'
					},
					{
						stage: '4. Synthèse ouverte (40 mots)',
						detail: 'Réponse personnelle équilibrée + ouverture intellectuelle sobre'
					}
				]
			}),
			steps: [
				{
					promptAr: 'لماذا يتفوق المقال الذي يوظف مثالاً ثقافياً أو تاريخياً دقيقاً (مثل بيت الحكمة، ابن خلدون، أو واقع التعدد اللغوي في الجزائر) على المقال المليء بالعموميات؟',
					hintAr: 'المثال الملموس يحوّل الحجة النظرية إلى برهان حي مقنع.',
					expectedInput: 'لأنه يثبت نضج الثقافة العامة ويعزز قوة الإقناع بدل التكرار العام الإنشائي',
					revealAr: 'تُقاس جودة المقال في BAC LE بعمق أفكاره وتنوع حججه: حجة منطقية + مثال واقعي أو تاريخي موثق + صياغة استدراكية محكمة.'
				},
				{
					promptAr: 'ما الذي يجعل جملة الانتقال (La phrase de transition) بين فقرتي العرض علامةً فارقة لدى المصحح؟',
					hintAr: 'إنها تلخص الفقرة الأولى وتفتح الباب منطقياً للفقرة الثانية.',
					expectedInput: 'الجمع بين التذكير السريع بمكسب الفقرة الأولى والإعلان عن حدوده في الفقرة الثانية',
					revealAr: 'مثال راقٍ: « Si l’apprentissage des langues étrangères ouvre indéniablement l’horizon scientifique, il ne saurait pour autant justifier l’oubli de la langue maternelle. »'
				},
				{
					promptAr: 'كيف نختم المقال الجدلي في BAC LE دون السقوط في التناقض أو العبارات المبتذلة؟',
					hintAr: 'تجاوز التعارض السطحي نحو تركيب متوازن (Dépassement / Synthèse).',
					expectedInput: 'خلاصة تركيبية واضحة توفق بين الجانبين مع موقف شخصي راقٍ وجملة ختامية تفتح أفقاً فكرياً',
					revealAr: 'الخاتمة المثالية تجيب مباشرة عن سؤال المقدمة وتضع مبدأً جامعاً: مثلاً، الجمع بين الانفتاح اللغوي والتجذّر الهوياتي.'
				}
			]
		},
		summary: {
			rulesAr: [
				'القاعدة الذهبية للطول والتوازن في BAC LE: من 180 إلى 220 كلمة، في أربع فقرات مرئية بوضوح (مقدمة ~4 أسطر، فقرة عرض 1 ~7 أسطر، فقرة عرض 2 ~7 أسطر، خاتمة ~4 أسطر).',
				'ثلاثة أسرار لنيل 7 إلى 8/8: (1) إشكالية دقيقة غير مكررة بالحرف من نص الموضوع؛ (2) تنويع أدوات الحجاج (subjonctif بعد bien que، تعبير avoir beau أو certes... mais، وسؤال بلاغي واحد أو استعارة متزنة)؛ (3) دقة الترقيم وسلامة المطابقة والأزمنة.',
				'توزيع النقاط الثماني في التصحيح: ملاءمة الموضوع وغنى الأفكار (2.5 نقطة) | الهيكلة والاتساق والانتقالات (2 نقطتان) | سلامة اللغة وتنوع التراكيب (2.5 نقطة) | الأناقة الأسلوبية والنظافة (1 نقطة).',
				'ابتعد عن التطرف غير المبرّر وعن الأسلوب العامي؛ الكاتب الناضج يجمع بين الحزم الفكري والإنصاف في مناقشة الرأي المخالف.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Boîte à style de l’essai BAC LE',
				rootLabel: 'Formules de haut niveau',
				rootSub: 'À intégrer naturellement dans vos copies',
				branches: [
					{
						label: 'Problématiser',
						rule: 'Dès lors, convient-il de... ?',
						example: 'Dans quelle mesure peut-on... ?'
					},
					{
						label: 'Transiter',
						rule: 'Si..., il n’en demeure pas moins',
						example: 'Certes..., toutefois il faut...'
					},
					{
						label: 'Nuancer',
						rule: 'loin de s’opposer, se complètent',
						example: 'Bien que... / avoir beau...'
					},
					{
						label: 'Conclure',
						rule: 'En définitive, tout l’enjeu...',
						example: 'L’avenir appartient à ceux qui...'
					}
				]
			}),
			visualCaptionAr: 'عبارات الربط والانتقال الرفيعة لرفع جودة المقال الجدلي في شعبة اللغات الأجنبية.',
			examples: [
				{
					problemAr: 'Formulez une problématique soutenue sur « Le plurilinguisme et l’identité culturelle ».',
					solutionAr: '« Dès lors, la maîtrise de plusieurs langues étrangères affaiblit-elle l’attachement à la langue maternelle ou contribue-t-elle au contraire à enrichir le dialogue culturel ? »'
				},
				{
					problemAr: 'Rédigez une phrase de transition élégante entre les avantages de la traduction automatique et le rôle du traducteur humain.',
					solutionAr: '« Si les logiciels de traduction rendent d’incontestables services pour décrypter rapidement une notice technique, ils montrent vite leurs limites dès qu’il s’agit de restituer l’âme d’un texte littéraire ou historique. »'
				},
				{
					problemAr: 'Formulez une conclusion synthétique de niveau BAC LE.',
					solutionAr: '« En définitive, loin de s’opposer, enracinement linguistique et ouverture sur les langues du monde se fécondent mutuellement : connaître sa propre culture donne la force de dialoguer sereinement avec autrui. »'
				}
			],
			watchOutAr: 'لا تُكثر من الجمل المفرطة في الطول (أكثر من 4 أسطر بلا نقطة) لأنها تفتح باباً لأخطاء الربط النحوي؛ اجعل كل فكرة في جملة متماسكة وموزونة.'
		},
		practice: [
			{
				questionAr: 'Combien de paragraphes bien distincts structurent un essai dialectique complet au BAC Langues Étrangères ?',
				options: [
					'Un seul bloc compact sans alinéa',
					'Quatre paragraphes : introduction, thèse, antithèse/limites et conclusion synthétique',
					'Dix lignes de mots-clés sans verbes',
					'Deux titres suivis d’une citation'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: غياب الفقرات يضر بوضوح البنية والتنقيط.',
					'ممتاز: أربع فقرات متوازنة تجعل التدرج الجدلي واضحاً للمصحح.',
					'خطأ: يجب التحرير في فقرات كاملة.',
					'خطأ: لا يكفي لمتطلبات 8 نقاط.'
				],
				explanationAr: 'الهيكلة الواضحة في أربع فقرات مع فراغات واضحة تضمن نقاط التنظيم.'
			},
			{
				questionAr: 'Quelle phrase assure la meilleure transition entre deux paragraphes opposés d’une dissertation ?',
				options: [
					'Si cet outil présente d’indéniables atouts, il ne saurait toutefois masquer certaines dérives préoccupantes.',
					'Maintenant je vais parler du deuxième paragraphe.',
					'Voici donc la fin de la première idée.',
					'Enfin, passons à un autre thème sans rapport.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: جملة انتقالية رفيعة تجمع بين الاعتراف بما سبق والتمهيد للفقرة المقابلة.',
					'خطأ: عبارة مدرسية ركيكة ومباشرة.',
					'خطأ: تقطع السلاسة الفكرية.',
					'خطأ: خروج عن الموضوع.'
				],
				explanationAr: 'الجملة الانتقالية الناجحة تبني جسراً منطقياً بين الفكرة السابقة والفكرة التالية.'
			},
			{
				questionAr: 'Quel est le volume recommandé pour une production libre argumentée au BAC 3AS Langues Étrangères (8 points) ?',
				options: [
					'40 mots maximum',
					'60 mots environ',
					'Environ 180 à 220 mots bien équilibrés',
					'Plus de 700 mots'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: قصير جداً.',
					'خطأ: لا يكفي لتطوير أطروحتين وخاتمة.',
					'صحيح: بين 180 و220 كلمة مساحة مثالية للعمق الفكري مع التحكم في السلامة اللغوية.',
					'خطأ: مبالغ فيه ويكثر الأخطاء ويستنفد الوقت.'
				],
				explanationAr: 'الاعتدال في الطول مع كثافة الأفكار وجودة اللغة هو سر العلامة العالية.'
			},
			{
				questionAr: 'Quelle stratégie renforce le plus la crédibilité d’un paragraphe argumentatif en BAC LE ?',
				options: [
					'Répéter trois fois la même idée avec les mêmes mots',
					'Utiliser des affirmations agressives sans preuves',
					'Éviter tout exemple concret',
					'Associer un argument logique, un exemple précis et une formulation nuancée (concession)'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: التكرار يضعف النص.',
					'خطأ: التطرف يضر بالموضوعية الفكرية.',
					'خطأ: الأمثلة ضرورية لتجسيد الحجة.',
					'أحسنت: هذا الثلاثي يصنع مقالات التميز في شعبة اللغات الأجنبية.'
				],
				explanationAr: 'تكامل الحجة المنطقية والمثال الدقيق والأسلوب المتزن يقنع المصحح بعمق تفكيرك.'
			},
			{
				questionAr: 'Quelle formule élégante peut ouvrir la conclusion d’une dissertation dialectique ?',
				options: ['En définitive, loin de s’opposer...', 'D’abord, on constate...', 'Par exemple, hier...', 'En revanche, il dit...'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: « En définitive » و « En somme » تفتتحان خاتمة تركيبية راقية.',
					'خطأ: « D’abord » للعرض لا للخاتمة.',
					'خطأ: للتمثيل لا للختام.',
					'خطأ: « En revanche » للمقابلة وسط العرض.'
				],
				explanationAr: 'نختم بـ En définitive / En somme / Au terme de cette réflexion لتقديم التركيب النهائي.'
			}
		]
	}
];
