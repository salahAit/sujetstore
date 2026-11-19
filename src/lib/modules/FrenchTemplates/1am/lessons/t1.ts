import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWritingBlueprint
} from '../../svg-french';

export const LESSONS_1AM_T1: FrenchInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 1 : Les procédés explicatifs (définition, illustration, énumération)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_1am_t1_procedes_explicatifs',
		slug: 'fre-1am-t1-procedes-explicatifs',
		grade: '1am',
		yearSubjectId: 615,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع الأول: النظافة والتغذية الصحية والرياضة — Projet 1 : Expliquer pour vivre sainement',
		order: 1,
		titleAr: 'وسائل الشرح والتفسير: التعريف والتمثيل والتعداد (Les procédés explicatifs)',
		objectives: [
			'التعرّف على النص التفسيري (Le texte explicatif) وهدفه المتمثّل في الشرح وتقديم المعلومات العلمية بدقة',
			'التمييز بين وسائل الشرح الثلاث: التعريف (la définition) والتمثيل (l’illustration) والتعداد (l’énumération)',
			'توظيف علامات الترقيم والروابط المناسبة لكل وسيلة شرح داخل فقرة علمية مبسطة'
		],
		keywordsAr: ['Texte explicatif', 'Définition', 'Illustration', 'Énumération', 'وسائل الشرح'],
		discover: {
			scenarioAr:
				'في حصة العلوم والفرنسية بمتوسطة جزائرية، قرأ التلاميذ نصا عن النظافة: « L’hygiène est l’ensemble des gestes qui protègent notre santé. Pour rester propre, il faut se laver les mains, se brosser les dents et porter des vêtements propres. Par exemple, le lavage des mains au savon élimine les microbes. » لاحظ كيف شرح الكاتب فكرته بثلاث طرق واضحة.',
			svg: svgFrenchGrammarMap({
				title: 'Les 3 procédés explicatifs en 1AM',
				rootLabel: 'Expliquer clairement une notion',
				rootSub: 'Comment faire comprendre au lecteur ?',
				branches: [
					{
						label: 'La définition',
						rule: 'Verbe être / désigner / signifier',
						example: 'L’hygiène est un ensemble de soins.',
						color: '#1d4ed8'
					},
					{
						label: 'L’énumération',
						rule: 'Suite d’éléments avec virgules',
						example: 'mains, dents, visage et corps.',
						color: '#047857'
					},
					{
						label: 'L’illustration',
						rule: 'Par exemple / comme / tel que',
						example: 'Par exemple, le savon tue les microbes.',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما وسيلة الشرح المستعملة في الجملة الأولى: « L’hygiène est l’ensemble des gestes qui protègent notre santé. »؟',
					hintAr: 'الجملة تبدأ بالفعل « est » لتحديد معنى كلمة « L’hygiène ».',
					expectedInput: 'La définition',
					revealAr: 'إنها التعريف (la définition)، لأنها تعطي المعنى الدقيق للمصطلح باستعمال الفعل « être ».'
				},
				{
					promptAr: 'ما وسيلة الشرح في: « se laver les mains, se brosser les dents et porter des vêtements propres »؟',
					hintAr: 'الكاتب يذكر قائمة عناصر متتابعة تفصل بينها فاصلة وحرف العطف « et ».',
					expectedInput: 'L’énumération',
					revealAr: 'إنها التعداد (l’énumération)، وتُستعمل لذكر عدة عناصر أو خطوات متتالية.'
				},
				{
					promptAr: 'ما العبارة التي قدّمت المثال في الجملة الأخيرة؟ وما اسم هذا الأسلوب؟',
					hintAr: 'انظر إلى بداية الجملة الأخيرة: « Par exemple... ».',
					expectedInput: 'L’illustration',
					revealAr: 'العبارة هي « Par exemple » وتُسمى هذه الوسيلة التمثيل (l’illustration) لتوضيح الفكرة بمثال واقعي.'
				}
			]
		},
		summary: {
			rulesAr: [
				'النص التفسيري (Le texte explicatif) يهدف إلى الشرح والإعلام (expliquer / informer) بأسلوب موضوعي واضح.',
				'التعريف (La définition): يحدّد معنى مفهوم أو كلمة باستعمال: est / signifie / désigne / consiste à. مثال: « La carie dentaire est une maladie qui attaque les dents. »',
				'التعداد (L’énumération): يسرد عدة عناصر متتابعة مفصولة بفواصل (,) ثم « et » قبل العنصر الأخير، وغالبا يسبقه نقطتان (:). مثال: « Les aliments sains sont : les fruits, les légumes, les céréales et le lait. »',
				'التمثيل (L’illustration): يقدّم مثالا ملموسا لتقريب المعنى باستعمال: par exemple, comme, tel que, notamment. مثال: « Les fruits riches en vitamine C, comme l’orange et le citron, renforcent le corps. »'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Repérer chaque procédé dans un examen',
				subtitle: 'Indices grammaticaux et ponctuation',
				columns: [
					{
						header: 'Définition',
						rule: 'est / signifie / désigne',
						examples: 'Le sport est une activité...',
						color: '#1d4ed8'
					},
					{
						header: 'Énumération',
						rule: 'Deux-points (:) + virgules',
						examples: 'eau, savon, brosse et serviette',
						color: '#047857'
					},
					{
						header: 'Illustration',
						rule: 'par exemple / comme',
						examples: 'comme la natation et la marche',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'المؤشرات السريعة لتمييز التعريف والتعداد والتمثيل في الفروض والاختبارات',
			examples: [
				{
					problemAr: 'حدّد وسيلة الشرح في الجملة: « Les microbes sont des êtres vivants microscopiques. »',
					solutionAr: 'الوسيلة هي: التعريف (La définition) لوجود الفعل « sont » الذي يحدّد ماهية الميكروبات.'
				},
				{
					problemAr: 'حدّد وسيلة الشرح في الجملة: « Plusieurs sports fortifient le cœur, comme la course et la natation. »',
					solutionAr: 'الوسيلة هي: التمثيل (L’illustration) بفضل الرابط « comme » الذي يقدّم مثالين.'
				}
			],
			watchOutAr:
				'انتبه! لا تخلط بين التعداد (ذكر قائمة عناصر: des fruits, des légumes et de l’eau) وبين التمثيل الذي يسبقه رابط خاص بالمثال مثل « par exemple » أو « comme » أو « tel que ».'
		},
		practice: [
			{
				questionAr: 'ما الهدف الرئيس من النص التفسيري (Le texte explicatif)؟',
				options: [
					'سرد قصة خيالية',
					'الشرح وتقديم معلومات علمية واضحة',
					'كتابة رسالة شخصية لصديق',
					'وصف منظر طبيعي فقط'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'سرد القصة من خصائص النص السردي (narratif).',
					'أحسنت! النص التفسيري يهدف إلى الشرح والإعلام (expliquer et informer).',
					'الرسالة الشخصية نص تواصلي وليس نصا تفسيريا.',
					'النص التفسيري يشرح الأسباب والظواهر ولا يكتفي بالوصف.'
				],
				explanationAr: 'النص التفسيري يقدّم شرحا دقيقا لظاهرة أو سلوك صحي أو علمي (expliquer).'
			},
			{
				questionAr: 'ما وسيلة الشرح المستعملة في: « Le brossage des dents consiste à nettoyer les dents après chaque repas. »؟',
				options: ['L’illustration', 'L’énumération', 'La définition', 'La négation'],
				correctIndex: 2,
				diagnosticFeedback: [
					'لا يوجد رابط مثال مثل par exemple أو comme.',
					'لا توجد قائمة عناصر مفصولة بفواصل.',
					'ممتاز! التعبير « consiste à » يقدّم تعريفا (définition).',
					'النفي ليس وسيلة شرح هنا، والجملة مثبتة.'
				],
				explanationAr: 'العبارة « consiste à » تدل على التعريف (la définition).'
			},
			{
				questionAr: 'أيّ جملة تتضمّن تمثيلا (une illustration)؟',
				options: [
					'L’eau est indispensable à la vie.',
					'Certains légumes, par exemple la carotte et la courgette, sont riches en vitamines.',
					'Le lavage des mains protège la santé.',
					'Il faut boire de l’eau pure chaque jour.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه الجملة تعطي حقيقة عامة وتعريفا موجزا.',
					'صحيح! العبارة « par exemple » تقدّم مثالا واضحا (illustration).',
					'هذه جملة تفسيرية بسيطة دون تمثيل.',
					'هذه نصيحة وليست تمثيلا.'
				],
				explanationAr: 'وجود الرابط « par exemple » يثبت استعمال أسلوب التمثيل (l’illustration).'
			},
			{
				questionAr: 'ما وسيلة الشرح في: « Pour une bonne hygiène, on utilise : de l’eau, du savon, une brosse à dents et une serviette propre. »؟',
				options: ['L’énumération', 'La définition', 'La comparaison', 'La cause'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! النقطتان والفواصل المتتابعة تدل على التعداد (l’énumération).',
					'الجملة لا تعرّف مصطلحا بل تعدد أدوات النظافة.',
					'لا توجد مقارنة هنا.',
					'لا يوجد رابط سبب مثل car أو parce que.'
				],
				explanationAr: 'سرد عدة عناصر متتالية بعد نقطتين وبفواصل هو التعداد (l’énumération).'
			},
			{
				questionAr: 'أيّ رابط يُستعمل لتقديم مثال (illustration) في النص التفسيري؟',
				options: ['parce que', 'comme', 'donc', 'mais'],
				correctIndex: 1,
				diagnosticFeedback: [
					'parce que يُستعمل للتعبير عن السبب.',
					'ممتاز! « comme » يُستعمل لتقديم أمثلة في التمثيل (illustration).',
					'donc يُستعمل للتعبير عن النتيجة.',
					'mais يُستعمل للاستدراك والتعارض.'
				],
				explanationAr: 'الروابط « comme », « par exemple », « tel que » تقدّم التمثيل (l’illustration).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 2 : La phrase déclarative et la forme négative
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_1am_t1_phrase_declarative_negative',
		slug: 'fre-1am-t1-phrase-declarative-negative',
		grade: '1am',
		yearSubjectId: 615,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع الأول: النظافة والتغذية الصحية والرياضة — Projet 1 : Expliquer pour vivre sainement',
		order: 2,
		titleAr: 'الجملة الخبرية والصيغة المنفية (La phrase déclarative et la forme négative)',
		objectives: [
			'التعرّف على الجملة الخبرية (la phrase déclarative) التي تبدأ بحرف كبير وتنتهي بنقطة',
			'التمييز بين الصيغة المثبتة (la forme affirmative) والصيغة المنفية (la forme négative)',
			'تحويل الجملة من الإثبات إلى النفي باستعمال (ne ... pas / n’ ... pas / ne ... jamais / ne ... plus)'
		],
		keywordsAr: ['Phrase déclarative', 'Forme affirmative', 'Forme négative', 'ne...pas', 'الجملة المنفية'],
		discover: {
			scenarioAr:
				'كتب الطبيب المدرسي نصيحتين على لوحة القسم: « Le sport protège le corps. » و « Les boissons sucrées ne protègent pas les dents. » ثم أضاف: « Amine n’oublie jamais de se laver les mains avant le repas. » لاحظ موضع أدوات النفي حول الفعل.',
			svg: svgFrenchGrammarMap({
				title: 'La phrase déclarative : Affirmative vs Négative',
				rootLabel: 'Phrase déclarative (se termine par un point .)',
				rootSub: 'Encadrer le verbe conjugué pour nier',
				branches: [
					{
						label: 'Forme affirmative',
						rule: 'Sujet + Verbe + Complément',
						example: 'Le savon élimine les microbes.',
						color: '#047857'
					},
					{
						label: 'ne ... pas / n’ ... pas',
						rule: 'n’ devant voyelle ou h muet',
						example: 'Il n’oublie pas son hygiène.',
						color: '#1d4ed8'
					},
					{
						label: 'ne ... jamais / plus',
						rule: 'Contraire de toujours / encore',
						example: 'Il ne mange jamais trop de sucre.',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'بأيّ علامة ترقيم تنتهي الجملة الخبرية (la phrase déclarative)؟',
					hintAr: 'انظر إلى آخر الجملتين اللتين كتبهما الطبيب.',
					expectedInput: 'Un point (.)',
					revealAr: 'الجملة الخبرية تبدأ بحرف كبير (majuscule) وتنتهي بنقطة (un point).'
				},
				{
					promptAr: 'أين نضع كلمتي « ne » و « pas » في الجملة المنفية؟',
					hintAr: 'تأمّل الجملة: « Les boissons sucrées ne protègent pas les dents. »',
					expectedInput: 'Autour du verbe conjugué',
					revealAr: 'نضع « ne » قبل الفعل المصرف و « pas » بعده مباشرة (ne + verbe + pas).'
				},
				{
					promptAr: 'لماذا كتبنا « n’oublie » بدلا من « ne oublie »؟',
					hintAr: 'انظر إلى الحرف الأول من الفعل « oublie ».',
					expectedInput: 'Devant une voyelle',
					revealAr: 'لأن الفعل « oublie » يبدأ بحرف علة (voyelle : o)، فتتحوّل « ne » إلى « n’ ».'
				}
			]
		},
		summary: {
			rulesAr: [
				'الجملة الخبرية (La phrase déclarative) تُستعمل لتقديم معلومة أو شرح فكرة، وتنتهي بنقطة (.). ويمكن أن تكون مثبتة (affirmative) أو منفية (négative).',
				'للنفي البسيط نحصر الفعل المصرّف بين « ne » و « pas »: Le sucre (ne) renforce (pas) les dents.',
				'تتحوّل « ne » إلى « n’ » أمام فعل يبدأ بحرف علة (a, e, i, o, u, y) أو (h صامتة): Il n’aime pas les bonbons.',
				'عند تحويل كلمات معيّنة إلى النفي: « toujours » تصبح « ne ... jamais »، و « encore » تصبح « ne ... plus »، و « tout » تصبح « ne ... rien ».',
				'في النفي تتحوّل أدوات التنكير والتجزئة (un, une, des, du, de la) غالبا إلى « de / d’ » (إلا مع الفعل être): Il mange des fruits -> Il ne mange pas de fruits.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Les principales marques de la négation',
				subtitle: 'Bien choisir la paire négative selon le sens',
				columns: [
					{
						header: 'ne ... pas',
						rule: 'Négation simple',
						examples: 'Il ne fume pas.',
						color: '#1d4ed8'
					},
					{
						header: 'ne ... jamais',
						rule: 'Contraire de toujours',
						examples: 'Il ne saute jamais le repas.',
						color: '#047857'
					},
					{
						header: 'ne ... plus',
						rule: 'Contraire de encore',
						examples: 'Il ne boit plus de soda.',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'أشهر أدوات النفي في الجملة الخبرية بالفرنسية',
			examples: [
				{
					problemAr: 'حوّل إلى الصيغة المنفية: « Bilal mange encore des bonbons. »',
					solutionAr: '« Bilal ne mange plus de bonbons. » (استبدلنا encore بـ ne...plus و des بـ de).'
				},
				{
					problemAr: 'حوّل إلى الصيغة المنفية: « Cette eau est propre. »',
					solutionAr: '« Cette eau n’est pas propre. » (استعملنا n’ لأن est يبدأ بحرف علة).'
				}
			],
			watchOutAr:
				'احذر من نسيان الجزء الأول من النفي « ne / n’ » في الكتابة! الصيغة الصحيحة دائما تتكوّن من جزأين يحيطان بالفعل: « ne + verbe + pas ».'
		},
		practice: [
			{
				questionAr: 'حوّل الجملة الآتية إلى الصيغة المنفية: « Amine oublie sa brosse à dents. »',
				options: [
					'Amine ne oublie pas sa brosse à dents.',
					'Amine n’oublie pas sa brosse à dents.',
					'Amine oublie ne pas sa brosse à dents.',
					'Amine pas oublie sa brosse à dents.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'أمام حرف العلة (o) يجب حذف e وكتابة n’.',
					'أحسنت! نكتب n’ قبل الفعل المبدوء بحرف علة ثم pas بعده.',
					'كلمة ne تأتي قبل الفعل المصرّف وليس بعده.',
					'لا يجوز حذف ne ووضع pas قبل الفعل.'
				],
				explanationAr: 'الفعل « oublie » يبدأ بحرف علة، لذا نكتب: Amine n’oublie pas sa brosse à dents.'
			},
			{
				questionAr: 'ما النفي الصحيح للجملة: « Elle mange toujours des légumes. »؟',
				options: [
					'Elle ne mange jamais de légumes.',
					'Elle ne mange toujours pas des légumes.',
					'Elle ne mange plus des légumes.',
					'Elle mange jamais de légumes.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! عكس toujours هو ne ... jamais، وتتحوّل des إلى de.',
					'البديل الفصيح لعكس toujours هو ne ... jamais.',
					'ne ... plus هي عكس encore وليست عكس toujours.',
					'يجب دائما كتابة « ne » قبل الفعل المصرّف.'
				],
				explanationAr: 'الظرف « toujours » يُنفى بـ « ne ... jamais » وتتحول « des » إلى « de ».'
			},
			{
				questionAr: 'أيّ جملة هي جملة خبرية منفية (phrase déclarative à la forme négative)؟',
				options: [
					'Lave-toi les mains avant de manger !',
					'Pourquoi le sport est-il utile ?',
					'Les mains sales ne protègent pas la santé.',
					'Le lait est riche en calcium.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'هذه جملة أمرية (impérative).',
					'هذه جملة استفهامية (interrogative).',
					'صحيح! تبدأ بحرف كبير وتنتهي بنقطة وتحتوي على ne ... pas.',
					'هذه جملة خبرية لكنها مثبتة (affirmative).'
				],
				explanationAr: 'الجملة « Les mains sales ne protègent pas la santé. » خبرية ومنفية بـ ne ... pas.'
			},
			{
				questionAr: 'اختر التحويل الصحيح للجملة: « Il boit du soda. » إلى النفي:',
				options: [
					'Il ne boit pas du soda.',
					'Il ne boit pas de soda.',
					'Il n’boit pas de soda.',
					'Il ne pas boit de soda.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'أداة التجزئة « du » تتحول في النفي إلى « de ».',
					'أحسنت! du تتحول إلى de في الجملة المنفية.',
					'الفعل boit يبدأ بساكن (b)، فنستعمل ne وليس n’.',
					'الفعل المصرّف يُحصر بين ne و pas: ne boit pas.'
				],
				explanationAr: 'في النفي تتحول أداة التجزئة « du » إلى « de »: Il ne boit pas de soda.'
			},
			{
				questionAr: 'ما أداة النفي المناسبة لعكس كلمة « encore » في: « Il mange encore des sucreries. »؟',
				options: ['ne ... jamais', 'ne ... rien', 'ne ... plus', 'ne ... personne'],
				correctIndex: 2,
				diagnosticFeedback: [
					'ne ... jamais لعكس toujours.',
					'ne ... rien لعكس tout أو quelque chose.',
					'ممتاز! « encore » تُنفى بـ « ne ... plus ».',
					'ne ... personne لعكس quelqu’un.'
				],
				explanationAr: 'عكس « encore » (ما زال) هو « ne ... plus » (لم يعد).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 3 : Les substituts lexicaux et grammaticaux
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_1am_t1_substituts',
		slug: 'fre-1am-t1-substituts',
		grade: '1am',
		yearSubjectId: 615,
		trimesterId: 't1',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع الأول: النظافة والتغذية الصحية والرياضة — Projet 1 : Expliquer pour vivre sainement',
		order: 3,
		titleAr: 'البدائل المعجمية والنحوية لتجنّب التكرار (Les substituts lexicaux et grammaticaux)',
		objectives: [
			'فهم دور البدائل (les substituts) في ربط الجمل وتجنّب التكرار الممل داخل النص',
			'التمييز بين البديل النحوي (substitut grammatical : ضمائر) والبديل المعجمي (substitut lexical : مرادف أو عبارة بديلة)',
			'تحديد الاسم الذي يعود عليه الضمير أو البديل المعجمي بدقة في أسئلة فهم النص'
		],
		keywordsAr: ['Substituts', 'Substitut grammatical', 'Substitut lexical', 'Éviter la répétition', 'البدائل'],
		discover: {
			scenarioAr:
				'تأمّل هذه الفقرة القصيرة عن الماء: « L’eau est indispensable à l’être humain. Elle hydrate le corps chaque jour. Ce liquide précieux aide aussi à nettoyer les mains et les fruits. » لاحظ كيف تجنّب الكاتب تكرار كلمة « L’eau » مرتين.',
			svg: svgFrenchGrammarMap({
				title: 'Éviter la répétition : Les deux types de substituts',
				rootLabel: 'Mot remplacé : L’eau',
				rootSub: 'Assurer la cohérence du texte explicatif',
				branches: [
					{
						label: 'Substitut grammatical',
						rule: 'Pronoms (il, elle, ils, le, la, lui, en)',
						example: 'Elle hydrate le corps.',
						color: '#1d4ed8'
					},
					{
						label: 'Substitut lexical',
						rule: 'Synonyme, nom générique ou périphrase',
						example: 'Ce liquide précieux aide...',
						color: '#047857'
					},
					{
						label: 'Déterminants possessifs',
						rule: 'son, sa, ses, leur, leurs',
						example: 'Sa pureté protège la santé.',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'على أيّ كلمة يعود الضمير « Elle » في الجملة الثانية؟',
					hintAr: 'ابحث عن اسم مؤنث مفرد ورد في الجملة الأولى.',
					expectedInput: 'L’eau',
					revealAr: 'يعود الضمير « Elle » على « L’eau » (اسم مؤنث مفرد في الفرنسية)، وهو بديل نحوي (substitut grammatical).'
				},
				{
					promptAr: 'ما العبارة التي استبدلت كلمة « L’eau » في الجملة الثالثة؟',
					hintAr: 'تبدأ باسم الإشارة « Ce ».',
					expectedInput: 'Ce liquide précieux',
					revealAr: 'العبارة هي « Ce liquide précieux » وهي بديل معجمي (substitut lexical) يشير إلى الماء دون تكراره.'
				},
				{
					promptAr: 'لماذا استعمل الكاتب هذين البديلين بدلا من تكرار « L’eau » في كل جملة؟',
					hintAr: 'فكّر في جمالية الأسلوب وترابط النص.',
					expectedInput: 'Pour éviter la répétition',
					revealAr: 'لتجنّب التكرار (pour éviter la répétition) وجعل النص التفسيري أكثر ترابطا وسلاسة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'البديل (Le substitut) كلمة أو عبارة تحلّ محلّ اسم سبق ذكره في النص لتفادي التكرار (éviter la répétition).',
				'البديل النحوي (Le substitut grammatical) يكون ضميرا أو صفة ملكية: ضمائر الفاعل (il, elle, ils, elles)، ضمائر المفعول (le, la, les, l’, lui, leur, en, y)، وصفات الملكية (son, sa, ses, leur).',
				'البديل المعجمي (Le substitut lexical) يكون اسما مرادفا أو اسما عاما (mot générique) أو عبارة وصفية (périphrase). مثال: le savon -> ce produit d’hygiène / les oranges -> ces fruits riches en vitamines.',
				'عند الإجابة عن سؤال الامتحان « Que remplace le mot souligné ? » نتحقق دائما من الجنس (مذكر/مؤنث) والعدد (مفرد/جمع) ونرجع إلى الجملة السابقة.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Tableau récapitulatif des substituts',
				subtitle: 'Vérifier le genre et le nombre du mot remplacé',
				columns: [
					{
						header: 'Pronoms sujets',
						rule: 'il / elle / ils / elles',
						examples: 'Les microbes -> Ils causent...',
						color: '#1d4ed8'
					},
					{
						header: 'Pronoms COD/COI',
						rule: 'le, la, les / lui, leur',
						examples: 'Le dentiste -> On le consulte.',
						color: '#047857'
					},
					{
						header: 'Substituts lexicaux',
						rule: 'Synonyme / Périphrase',
						examples: 'La marche -> Cette activité douce',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'أمثلة تطبيقية للبدائل النحوية والمعجمية في نصوص الصحة والرياضة',
			examples: [
				{
					problemAr: 'عوّض الكلمة المكررة ببديل نحوي: « Le lait est nourrissant. Le lait fortifie les os. »',
					solutionAr: '« Le lait est nourrissant. Il fortifie les os. »'
				},
				{
					problemAr: 'استخرج البديل المعجمي لكلمة « La natation » في: « La natation est excellente. Ce sport complet développe les muscles. »',
					solutionAr: 'البديل المعجمي هو: « Ce sport complet ».'
				}
			],
			watchOutAr:
				'انتبه إلى جنس الأسماء في الفرنسية! فكلمة « L’eau » مؤنثة (elle) وكلمة « La dent » مؤنثة (elle)، بينما « Le légume » مذكر (il) ولو كان جمعه « Les légumes » فيُعوّض بـ « ils ».'
		},
		practice: [
			{
				questionAr: 'ما الغرض الأساسي من استعمال البدائل (les substituts) في النص؟',
				options: [
					'إطالة الجمل دون معنى',
					'تجنّب التكرار وضمان ترابط النص',
					'تحويل الجملة إلى النفي',
					'تغيير زمن الفعل إلى الماضي'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'البدائل تجعل النص أدق وأجمل ولا تطيله عبثا.',
					'أحسنت! البدائل تتفادى التكرار (éviter la répétition) وتربط جمل النص.',
					'للنفي نستعمل ne ... pas وليس البدائل.',
					'البدائل لا تغيّر زمن الأفعال.'
				],
				explanationAr: 'دور البدائل هو تفادي التكرار وتحقيق الانسجام النصي.'
			},
			{
				questionAr: 'على ماذا يعود الضمير « Ils » في: « Les fruits apportent des vitamines. Ils protègent notre organisme. »؟',
				options: ['des vitamines', 'Les fruits', 'notre organisme', 'un fruit'],
				correctIndex: 1,
				diagnosticFeedback: [
					'vitamines مؤنث جمع (elles)، بينما الضمير هنا مذكر جمع (Ils).',
					'ممتاز! Les fruits اسم مذكر جمع يعود عليه الضمير Ils.',
					'notre organisme مفرد مذكر (il) وليس جمعا.',
					'الضمير جمع وليس مفردا.'
				],
				explanationAr: '« Les fruits » اسم مذكر جمع، لذلك يعوّضه الضمير النحوي « Ils ».'
			},
			{
				questionAr: 'أيّ عبارة تمثّل بديلا معجميا (substitut lexical) لكلمة « le médecin »؟',
				options: ['il', 'lui', 'ce spécialiste de la santé', 'le'],
				correctIndex: 2,
				diagnosticFeedback: [
					'il بديل نحوي (ضمير فاعل).',
					'lui بديل نحوي (ضمير مفعول).',
					'صحيح! « ce spécialiste de la santé » عبارة اسمية بديلة (substitut lexical).',
					'le بديل نحوي (ضمير مفعول به).'
				],
				explanationAr: 'البديل المعجمي يكون اسما أو عبارة اسمية مثل « ce spécialiste de la santé ».'
			},
			{
				questionAr: 'اختر الضمير المناسب لتفادي التكرار: « Meriem lave les pommes. Elle ...... mange ensuite. »',
				options: ['la', 'le', 'les', 'lui'],
				correctIndex: 2,
				diagnosticFeedback: [
					'la للمفرد المؤنث، و les pommes جمع.',
					'le للمفرد المذكر.',
					'أحسنت! les pommes مفعول به مباشر جمع، فيعوّض بـ « les ».',
					'lui للمفعول به غير المباشر المفرد.'
				],
				explanationAr: '« les pommes » مفعول به مباشر جمع (COD pluriel) ويُعوّض بالضمير « les ».'
			},
			{
				questionAr: 'ما نوع البديل المسطّر في: « Le brossage est utile. Il chasse la carie. »؟',
				options: [
					'Substitut lexical',
					'Substitut grammatical',
					'Procédé de définition',
					'Connecteur de cause'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الضمير « Il » ليس اسما معجميا بل ضمير نحوي.',
					'ممتاز! الضمائر الشخصية (il, elle, ils, elles) بدائل نحوية (substituts grammaticaux).',
					'التعريف أسلوب شرح وليس بديلا.',
					'Il ليس رابط سبب.'
				],
				explanationAr: 'الضمير الشخصي « Il » هو بديل نحوي (substitut grammatical) يعوّض « Le brossage ».'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 4 : Le présent de vérité générale et l'accord sujet-verbe
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_1am_t1_present_verite_generale',
		slug: 'fre-1am-t1-present-verite-generale',
		grade: '1am',
		yearSubjectId: 615,
		trimesterId: 't1',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع الأول: النظافة والتغذية الصحية والرياضة — Projet 1 : Expliquer pour vivre sainement',
		order: 4,
		titleAr: 'المضارع للحقيقة العامة ومطابقة الفعل للفاعل (Le présent de vérité générale et l’accord sujet-verbe)',
		objectives: [
			'فهم قيمة المضارع للحقيقة العامة (le présent de vérité générale) في النصوص العلمية والتفسيرية',
			'تصريف أفعال المجموعات الثلاث (1er, 2e, 3e groupes) في المضارع الإخباري تصريفا صحيحا',
			'إتقان مطابقة الفعل لفاعله في الإفراد والجمع (l’accord sujet-verbe)'
		],
		keywordsAr: ['Présent de l’indicatif', 'Vérité générale', '1er / 2e / 3e groupe', 'Accord sujet-verbe', 'المضارع'],
		discover: {
			scenarioAr:
				'اقرأ هذه الحقائق العلمية: « L’eau bout à 100 degrés. Les fruits nourrissent le corps. Une alimentation équilibrée protège la santé. » هذه الحقائق صحيحة في كل زمان ومكان؛ ولذلك استعمل الكاتب زمنا واحدا هو المضارع الإخباري.',
			svg: svgFrenchTenseTimeline({
				title: 'Le temps du texte explicatif',
				tenseName: 'Présent de vérité générale',
				formula: '1er gr (-e,-es,-e,-ons,-ez,-ent) | 2e gr (-is,-is,-it,-issons,-issez,-issent)',
				activeZone: 'present',
				example: 'Le savon élimine les microbes et protège la peau.',
				markers: 'Faits scientifiques et règles toujours vraies'
			}),
			steps: [
				{
					promptAr: 'في أيّ زمن صُرّفت الأفعال « bout, nourrissent, protège »؟',
					hintAr: 'إنها تعبّر عن حقائق علمية ثابتة في كل وقت.',
					expectedInput: 'Au présent de l’indicatif',
					revealAr: 'صُرّفت في المضارع الإخباري (le présent de l’indicatif) بقيمة الحقيقة العامة (vérité générale).'
				},
				{
					promptAr: 'لماذا انتهى الفعل « nourrissent » بـ « -issent » في « Les fruits nourrissent le corps »؟',
					hintAr: 'انظر إلى مصدر الفعل (nourrir) وإلى الفاعل الجمع (Les fruits).',
					expectedInput: '2e groupe au pluriel',
					revealAr: 'لأن « nourrir » فعل من المجموعة الثانية والفاعل « Les fruits » جمع (ils)، فنهايته « -issent ».'
				},
				{
					promptAr: 'ما نهاية الفعل « protéger » في: « Les bons gestes ...... notre santé »؟',
					hintAr: 'الفاعل جمع (Les bons gestes = ils) والفعل من المجموعة الأولى.',
					expectedInput: 'protègent',
					revealAr: 'نكتب « protègent » لأن الفاعل جمع غائب، فنضيف النهاية « -ent » لأفعال المجموعة الأولى.'
				}
			]
		},
		summary: {
			rulesAr: [
				'يُستعمل مضارع الحقيقة العامة (le présent de vérité générale) في النص التفسيري للتعبير عن حقائق علمية أو قواعد صحية ثابتة في كل زمان.',
				'أفعال المجموعة الأولى (-er ما عدا aller): نهاياتها (-e, -es, -e, -ons, -ez, -ent). مثال: laver -> je lave, il lave, ils lavent.',
				'أفعال المجموعة الثانية (-ir التي تنتهي بـ -issons مع nous): نهاياتها (-is, -is, -it, -issons, -issez, -issent). مثال: choisir -> il choisit, ils choisissent ; grandir -> ils grandissent.',
				'أفعال المجموعة الثالثة الشائعة: être (suis, es, est, sommes, êtes, sont)، avoir (ai, as, a, avons, avez, ont)، faire (fais, fais, fait, faisons, faites, font)، prendre (prends, prends, prend, prenons, prenez, prennent)، boire (bois, bois, boit, buvons, buvez, boivent).',
				'قاعدة المطابقة (L’accord sujet-verbe): يطابق الفعل فاعله دائما في الشخص والعدد؛ إذا تعدد الفاعل بـ « et » صار الفعل في الجمع: « L’eau et le savon nettoient les mains. »'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Terminaisons au présent de l’indicatif',
				subtitle: 'Bien repérer le groupe du verbe et le sujet',
				columns: [
					{
						header: '1er groupe (-er)',
						rule: '-e, -es, -e, -ons, -ez, -ent',
						examples: 'il lave / ils lavent',
						color: '#1d4ed8'
					},
					{
						header: '2e groupe (-ir)',
						rule: '-is, -is, -it, -issons, -issez, -issent',
						examples: 'il choisit / ils choisissent',
						color: '#047857'
					},
					{
						header: '3e groupe',
						rule: 'être, avoir, faire, boire...',
						examples: 'il boit / ils font / ils sont',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'نهايات المضارع الإخباري للمجموعات الثلاث مع أمثلة من وحدة النظافة والتغذية',
			examples: [
				{
					problemAr: 'صرّف الأفعال بين قوسين في المضارع: « Les élèves (choisir) ...... des fruits et (boire) ...... de l’eau pure. »',
					solutionAr: '« Les élèves choisissent des fruits et boivent de l’eau pure. »'
				},
				{
					problemAr: 'صرّف الفعل: « La marche et la natation (fortifier) ...... le cœur. »',
					solutionAr: '« La marche et la natation fortifient le cœur. » (الفاعل مركّب جمع بـ et).'
				}
			],
			watchOutAr:
				'احذر من نسيان « -ent » مع الفاعل الجمع رغم أنها لا تُنطق! لا تكتب « Les enfants mange », بل اكتب « Les enfants mangent ».'
		},
		practice: [
			{
				questionAr: 'اختر التصريف الصحيح للفعل (nourrir) في: « Les légumes ...... bien le corps. »',
				options: ['nourrit', 'nourris', 'nourrissent', 'nourrissons'],
				correctIndex: 2,
				diagnosticFeedback: [
					'nourrit للمفرد الغائب (il/elle)، و Les légumes جمع.',
					'nourris للضمير je أو tu.',
					'أحسنت! nourrir من المجموعة الثانية، ومع الجمع الغائب نكتب nourrissent.',
					'nourrissons للضمير nous.'
				],
				explanationAr: 'الفاعل « Les légumes » جمع غائب (ils) و « nourrir » من المجموعة الثانية -> nourrissent.'
			},
			{
				questionAr: 'صرّف الفعل (protéger) في: « L’eau et le savon ...... notre peau. »',
				options: ['protège', 'protègent', 'protégeons', 'protèges'],
				correctIndex: 1,
				diagnosticFeedback: [
					'انتبه! يوجد فاعلان مربوطان بـ « et » فالمجموع جمع.',
					'ممتاز! L’eau et le savon = ils (جمع)، فنكتب protègent.',
					'protégeons مع الضمير nous.',
					'protèges مع الضمير tu.'
				],
				explanationAr: 'عندما يرتبط فاعلان بـ « et » يصبح الفعل في الجمع الغائب: protègent.'
			},
			{
				questionAr: 'ما التصريف الصحيح للفعل (faire) في: « Vous ...... du sport chaque matin. »؟',
				options: ['faisez', 'faisons', 'faites', 'font'],
				correctIndex: 2,
				diagnosticFeedback: [
					'صيغة « faisez » غير موجودة في اللغة الفرنسية.',
					'faisons للضمير nous.',
					'أحسنت! الفعل faire مع vous يصبح faites.',
					'font للضمير ils / elles.'
				],
				explanationAr: 'تصريف « faire » في المضارع مع « vous » هو: vous faites.'
			},
			{
				questionAr: 'ما التصريف الصحيح للفعل (boire) في: « Les sportifs ...... beaucoup d’eau. »؟',
				options: ['boit', 'buvons', 'boivent', 'bois'],
				correctIndex: 2,
				diagnosticFeedback: [
					'boit للمفرد (il/elle).',
					'buvons للضمير nous.',
					'صحيح! ils boivent.',
					'bois للضمير je أو tu.'
				],
				explanationAr: 'مع الجمع الغائب (Les sportifs = ils)، فعل « boire » يُصرّف: boivent.'
			},
			{
				questionAr: 'ما قيمة المضارع في الجملة: « Le calcium fortifie les os et les dents. »؟',
				options: [
					'Présent de vérité générale',
					'Action future',
					'Ordre impératif',
					'Souvenir passé'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! إنها حقيقة علمية ثابتة (présent de vérité générale).',
					'الجملة ليست في المستقبل.',
					'الجملة خبرية وليست أمرية.',
					'الجملة ليست في الماضي.'
				],
				explanationAr: 'الحقائق العلمية الدائمة تُصاغ في المضارع للحقيقة العامة (présent de vérité générale).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 5 : Rédiger un texte explicatif (Propreté / Alimentation / Sport)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_1am_t1_rediger_texte_explicatif',
		slug: 'fre-1am-t1-rediger-texte-explicatif',
		grade: '1am',
		yearSubjectId: 615,
		trimesterId: 't1',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع الأول: النظافة والتغذية الصحية والرياضة — Projet 1 : Expliquer pour vivre sainement',
		order: 5,
		titleAr: 'كتابة نص تفسيري حول النظافة أو التغذية المتوازنة (Rédiger un texte explicatif)',
		objectives: [
			'معرفة البنية الثلاثية للنص التفسيري: المقدمة (التعريف/السؤال)، العرض (الشرح والأمثلة)، الخاتمة (الخلاصة)',
			'توظيف أدوات المشروع الأول: وسائل الشرح، الجمل الخبرية، المضارع للحقيقة العامة، والبدائل لتفادي التكرار',
			'إنتاج فقرة تفسيرية قصيرة ومنظمة (6 إلى 8 أسطر) بلغة فرنسية سليمة حول النظافة أو الغذاء الصحي'
		],
		keywordsAr: ['Production écrite', 'Texte explicatif', 'Introduction', 'Développement', 'Conclusion'],
		discover: {
			scenarioAr:
				'طلبت الأستاذة من تلاميذ الأولى متوسط كتابة فقرة قصيرة لمجلة المدرسة تشرح أهمية غسل اليدين. كتب يوسف مسودة منظّمة من ثلاث مراحل: عرّف النظافة أولا، ثم شرح فوائد غسل اليدين مع مثال، وختم بنصيحة جامعة.',
			svg: svgFrenchWritingBlueprint({
				title: 'Plan d’un texte explicatif réussi (1AM)',
				steps: [
					{ stage: 'Titre + Définition', detail: 'Présenter le thème et le définir (ex: Le lavage des mains est...)', color: '#1d4ed8' },
					{ stage: 'Explication', detail: 'Expliquer pourquoi c’est important au présent de vérité générale', color: '#047857' },
					{ stage: 'Exemples / Énum.', detail: 'Ajouter une énumération ou un exemple (par exemple, comme...)', color: '#b45309' },
					{ stage: 'Conclusion', detail: 'Résumer le bienfait pour la santé (En conclusion / Ainsi...)', color: '#7c3aed' }
				]
			}),
			steps: [
				{
					promptAr: 'بماذا نبدأ عادة الفقرة التفسيرية في الأولى متوسط؟',
					hintAr: 'انظر إلى المرحلة الأولى في المخطط الأخضر أعلاه.',
					expectedInput: 'Un titre et une définition',
					revealAr: 'نبدأ بعنوان مناسب ثم جملة تقديمية تحتوي على تعريف بسيط للموضوع (une définition).'
				},
				{
					promptAr: 'ما الزمن الغالب الذي يجب احترامه طوال النص التفسيري؟',
					hintAr: 'تذكّر درس التصريف السابق.',
					expectedInput: 'Le présent de l’indicatif',
					revealAr: 'نستعمل المضارع الإخباري للحقيقة العامة (le présent de vérité générale) طوال النص.'
				},
				{
					promptAr: 'بأيّ رابط يمكن أن نختم الفقرة التفسيرية؟',
					hintAr: 'انظر إلى المرحلة الرابعة في المخطط.',
					expectedInput: 'En conclusion / Ainsi',
					revealAr: 'نستعمل رابط خاتمة مثل « En conclusion », « Ainsi », أو « Donc » لتلخيص الفائدة الصحية.'
				}
			]
		},
		summary: {
			rulesAr: [
				'يتكوّن النص التفسيري المنظّم من: عنوان واضح + مقدمة (تعريف الموضوع) + عرض (شرح الفوائد باستعمال التعداد والتمثيل) + خاتمة موجزة.',
				'استعمل جملا خبرية بسيطة وواضحة (Sujet + Verbe au présent + Complément) مع احترام علامات الترقيم (الفاصلة، النقطة، الحروف الكبيرة).',
				'وظّف على الأقل وسيلتين من وسائل الشرح: تعريفا (est / consiste à) وتعدادا (:) أو تمثيلا (par exemple / comme).',
				'تجنّب تكرار اسم الموضوع نفسه في كل جملة باستعمال البدائل (il, elle, ce geste, cette habitude, cette activité).',
				'راجع أخطاء المطابقة بين الفاعل والفعل (accord sujet-verbe) قبل تسليم الورقة.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Boîte à outils pour écrire en 1AM (T1)',
				rootLabel: 'Vocabulaire de la vie saine',
				rootSub: 'Hygiène, alimentation équilibrée et sport',
				branches: [
					{
						label: 'Hygiène',
						rule: 'savon, microbes, propreté',
						example: 'se laver les mains, se brosser',
						color: '#1d4ed8'
					},
					{
						label: 'Alimentation',
						rule: 'vitamines, eau, fruits, lait',
						example: 'repas équilibré, nourrir le corps',
						color: '#047857'
					},
					{
						label: 'Sport',
						rule: 'marche, natation, énergie',
						example: 'fortifier le cœur et les muscles',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'رصيد لغوي جاهز للوضعية الإدماجية في المشروع الأول',
			examples: [
				{
					problemAr: 'اكتب جملة مقدّمة تعرف فيها « الأكل المتوازن » (l’alimentation équilibrée).',
					solutionAr: '« L’alimentation équilibrée est une nourriture variée qui apporte au corps tous les éléments nécessaires à sa croissance. »'
				},
				{
					problemAr: 'اكتب جملة خاتمة لنص حول « الرياضة ».',
					solutionAr: '« En conclusion, la pratique régulière du sport protège la santé et donne de l’énergie chaque jour. »'
				}
			],
			watchOutAr:
				'لا تكتب النص كله في جملة واحدة طويلة دون نقاط! قسّم أفكارك إلى 5 أو 6 جمل واضحة، واحرص على وضع عنوان مناسب للنص.'
		},
		practice: [
			{
				questionAr: 'ما الترتيب الصحيح لبناء نص تفسيري قصير؟',
				options: [
					'خاتمة ثم عنوان ثم أمثلة',
					'عنوان + مقدمة (تعريف) + عرض (شرح وأمثلة) + خاتمة',
					'حوار بين شخصين ثم نهاية',
					'تعداد كلمات متفرقة دون أفعال'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'العنوان والمقدمة يأتيان أولا والخاتمة في النهاية.',
					'أحسنت! هذا هو الهيكل المنهجي للنص التفسيري.',
					'الحوار يخص النص السردي أو المسرحي.',
					'النص التفسيري يحتاج جملا تامة بأفعال مصرفّة.'
				],
				explanationAr: 'النص التفسيري يتبع بنية منظمة: عنوان، مقدمة، عرض، وخاتمة.'
			},
			{
				questionAr: 'أيّ جملة تصلح كمقدّمة لنص يشرح أهمية تنظيف الأسنان؟',
				options: [
					'En conclusion, la brosse est utile.',
					'Le brossage des dents est un geste d’hygiène essentiel qui protège la bouche contre la carie.',
					'Hier, j’ai acheté un livre à la librairie.',
					'Par exemple, le citron contient de la vitamine C.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'En conclusion تُستعمل للخاتمة لا للمقدمة.',
					'ممتاز! هذه الجملة تعرّف الموضوع وتقدمه بوضوح.',
					'هذه الجملة في الماضي وخارج موضوع تنظيف الأسنان.',
					'هذا مثال عن الفواكه وليس مقدمة عن الأسنان.'
				],
				explanationAr: 'المقدمة المناسبة تعرّف الموضوع مباشرة في المضارع.'
			},
			{
				questionAr: 'أيّ بديل مناسب لتفادي تكرار « L’alimentation équilibrée » في الجملة الموالية؟',
				options: ['Il', 'Ils', 'Elle', 'Eux'],
				correctIndex: 2,
				diagnosticFeedback: [
					'alimentation اسم مؤنث وليس مذكرا.',
					'alimentation مفرد وليس جمعا.',
					'صحيح! لأن كلمة « alimentation » مؤنثة مفردة فتعوّض بـ « Elle ».',
					'Eux ضمير توكيد للجمع المذكر.'
				],
				explanationAr: '« L’alimentation équilibrée » مؤنث مفرد، فالضمير البديل الصحيح هو « Elle ».'
			},
			{
				questionAr: 'ما الخطأ الذي يجب تصحيحه في الجملة: « Les fruits et les légumes donne des vitamines. »؟',
				options: [
					'تغيير fruits إلى fruit',
					'كتابة « donnent » بدلا من « donne »',
					'حذف كلمة « et »',
					'تغيير vitamines إلى vitamine'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الفاعل الجمع صحيح.',
					'أحسنت! الفاعل جمع (Les fruits et les légumes)، فيجب أن ينتهي الفعل بـ « -ent »: donnent.',
					'حرف العطف et ضروري لربط الفاعلين.',
					'vitamines في الجمع صحيح.'
				],
				explanationAr: 'الفعل يجب أن يطابق الفاعل الجمع: « Les fruits et les légumes donnent des vitamines. »'
			},
			{
				questionAr: 'أيّ جملة تُعدّ خاتمة مناسبة لنص حول النظافة؟',
				options: [
					'Qu’est-ce que l’hygiène corporelle ?',
					'Ainsi, rester propre chaque jour nous aide à grandir en bonne santé.',
					'Le savon est un produit nettoyant.',
					'Il y a l’eau, le savon et la serviette.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'السؤال يصلح في المقدمة لا في الخاتمة.',
					'ممتاز! الرابط « Ainsi » والخلاصة الصحية يجعلانها خاتمة مثالية.',
					'هذه جملة تعريف للمقدمة.',
					'هذه جملة تعداد تناسب العرض.'
				],
				explanationAr: 'الخاتمة تلخّص أهمية الموضوع باستعمال رابط مثل « Ainsi » أو « En conclusion ».'
			}
		]
	}
];
