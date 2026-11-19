import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWritingBlueprint
} from '../../svg-french';

export const LESSONS_1AM_T2: FrenchInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 1 : La reformulation et la synonymie
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_1am_t2_reformulation_synonymie',
		slug: 'fre-1am-t2-reformulation-synonymie',
		grade: '1am',
		yearSubjectId: 615,
		trimesterId: 't2',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع الثاني: التقدم العلمي والطاقات والتكنولوجيا النافعة — Projet 2 : Les progrès scientifiques',
		order: 1,
		titleAr: 'إعادة الصياغة والترادف (La reformulation et la synonymie)',
		objectives: [
			'فهم وظيفة إعادة الصياغة (la reformulation) في تبسيط المصطلحات العلمية والتقنية للقارئ',
			'استعمال أدوات إعادة الصياغة الشائعة: c’est-à-dire / autrement dit / en d’autres termes',
			'توظيف المرادفات (les synonymes) لتفسير الكلمات الصعبة وتفادي التكرار داخل النص العلمي'
		],
		keywordsAr: ['Reformulation', 'Synonymie', 'c’est-à-dire', 'autrement dit', 'إعادة الصياغة'],
		discover: {
			scenarioAr:
				'في مقال علمي عن الطاقة المتجددة، قرأ التلاميذ: « L’énergie solaire est une énergie renouvelable, c’est-à-dire une énergie inépuisable qui ne disparaît pas. Autrement dit, le soleil produit chaque jour une électricité propre et utile. » لاحظ كيف بسّط الكاتب معنى كلمة « renouvelable ».',
			svg: svgFrenchGrammarMap({
				title: 'Expliquer autrement : Reformulation & Synonymie',
				rootLabel: 'Rendre un mot scientifique simple',
				rootSub: 'Dire la même idée avec des mots plus clairs',
				branches: [
					{
						label: 'c’est-à-dire',
						rule: 'Précédé d’une virgule (,)',
						example: 'renouvelable, c’est-à-dire inépuisable',
						color: '#1d4ed8'
					},
					{
						label: 'autrement dit',
						rule: 'Reformule une phrase ou une idée',
						example: 'Autrement dit, elle ne pollue pas.',
						color: '#047857'
					},
					{
						label: 'Synonymes',
						rule: 'Mots de même sens et même nature',
						example: 'rapide = véloce / utile = bénéfique',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما العبارة التي استعملها الكاتب لشرح كلمة « renouvelable » بطريقة أبسط؟',
					hintAr: 'ابحث عن العبارة الواقعة بعد الفاصلة في الجملة الأولى.',
					expectedInput: 'c’est-à-dire',
					revealAr: 'استعمل العبارة « c’est-à-dire » (أي / بمعنى) لتبسيط كلمة « renouvelable ».'
				},
				{
					promptAr: 'ما الكلمة التي أدّت معنى « renouvelable » نفسها في الجملة الأولى؟',
					hintAr: 'تبدأ بحرف « i » وتعني لا ينفد.',
					expectedInput: 'inépuisable',
					revealAr: 'الكلمة هي « inépuisable » (لا تنضب)، وهي مرادف (synonyme) قريب المعنى لـ « renouvelable ».'
				},
				{
					promptAr: 'ما أداة إعادة الصياغة التي بدأت بها الجملة الثانية؟',
					hintAr: 'تتكون من كلمتين وتعني « بعبارة أخرى ».',
					expectedInput: 'Autrement dit',
					revealAr: 'الأداة هي « Autrement dit » وتفيد إعادة صياغة الفكرة بأسلوب أوضح.'
				}
			]
		},
		summary: {
			rulesAr: [
				'إعادة الصياغة (La reformulation) هي التعبير عن الفكرة نفسها أو المصطلح نفسه بعبارات أبسط وأوضح للقارئ.',
				'أشهر أدوات إعادة الصياغة: c’est-à-dire (أي) — autrement dit (بعبارة أخرى) — en d’autres termes (بتعبير آخر) — ou (أو التفسيرية).',
				'الترادف (La synonymie): المرادفات كلمات مختلفة في الشكل ومتقاربة أو متطابقة في المعنى، ويجب أن تكون من الطبيعة النحوية نفسها (اسم مع اسم، فعل مع فعل، صفة مع صفة).',
				'أمثلة من وحدة التقدم العلمي: une invention = une création / moderne = récent / rapide = vif / diminuer = réduire / permettre = aider à.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Outils de reformulation et synonymes utiles',
				subtitle: 'Même nature grammaticale pour les synonymes',
				columns: [
					{
						header: 'Outils',
						rule: 'c’est-à-dire / autrement dit',
						examples: 'Le PC, autrement dit l’ordinateur',
						color: '#1d4ed8'
					},
					{
						header: 'Noms synonymes',
						rule: 'Nom <-> Nom',
						examples: 'progrès = avancée / appareil = outil',
						color: '#047857'
					},
					{
						header: 'Verbes / Adj.',
						rule: 'Verbe <-> Verbe / Adj <-> Adj',
						examples: 'faciliter = simplifier / propre = sain',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'مقارنة بين أدوات إعادة الصياغة وشروط الترادف السليم',
			examples: [
				{
					problemAr: 'أعد صياغة الجملة باستعمال « c’est-à-dire »: « La boussole indique le nord. Elle aide le voyageur à s’orienter. »',
					solutionAr: '« La boussole indique le nord, c’est-à-dire qu’elle aide le voyageur à s’orienter. »'
				},
				{
					problemAr: 'أوجد مرادف الكلمة المسطّرة: « Le livre imprimé est un outil ((utile)) pour apprendre. »',
					solutionAr: 'مرادف « utile » هو: « bénéfique » أو « précieux » أو « pratique » (صفة مثلها).'
				}
			],
			watchOutAr:
				'تذكّر دائما: مرادف الفعل يكون فعلا، ومرادف الاسم يكون اسما، ومرادف الصفة يكون صفة! لا تعطِ فعلا كمرادف لاسم في الامتحان.'
		},
		practice: [
			{
				questionAr: 'ما أداة إعادة الصياغة في الجملة: « L’énergie éolienne, c’est-à-dire l’énergie produite par le vent, est propre. »؟',
				options: ['produite par', 'c’est-à-dire', 'est propre', 'par le vent'],
				correctIndex: 1,
				diagnosticFeedback: [
					'produite par تبين المصدر وليست أداة إعادة صياغة.',
					'أحسنت! « c’est-à-dire » هي أشهر أداة لإعادة الصياغة.',
					'est propre خبر الجملة.',
					'par le vent متمم.'
				],
				explanationAr: 'العبارة « c’est-à-dire » تقدّم إعادة صياغة (reformulation) لشرح « énergie éolienne ».'
			},
			{
				questionAr: 'أيّ عبارة يمكن أن تعوّض « c’est-à-dire » دون تغيير المعنى؟',
				options: ['parce que', 'autrement dit', 'cependant', 'malgré'],
				correctIndex: 1,
				diagnosticFeedback: [
					'parce que للسبب.',
					'ممتاز! « autrement dit » تؤدي دور إعادة الصياغة نفسه.',
					'cependant للاستدراك والتعارض.',
					'malgré للمعارضة.'
				],
				explanationAr: '« autrement dit » و « en d’autres termes » مرادفتان لـ « c’est-à-dire » في إعادة الصياغة.'
			},
			{
				questionAr: 'ما المرادف الصحيح للفعل « faciliter » في مجال التكنولوجيا؟',
				options: ['compliquer', 'simplifier', 'facile', 'facilement'],
				correctIndex: 1,
				diagnosticFeedback: [
					'compliquer هو الضد (antonyme) وليس المرادف.',
					'صحيح! simplifier فعل مرادف للفعل faciliter.',
					'facile صفة وليست فعلا.',
					'facilement ظرف وليس فعلا.'
				],
				explanationAr: 'مرادف الفعل « faciliter » يجب أن يكون فعلا بنفس المعنى وهو « simplifier ».'
			},
			{
				questionAr: 'ما المرادف المناسب لكلمة « une invention »؟',
				options: ['une création technique', 'inventer', 'inventif', 'un problème'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! « une création technique » اسم مرادف لـ « une invention ».',
					'inventer فعل وليس اسما.',
					'inventif صفة وليست اسما.',
					'un problème لا يوافق معنى الاختراع.'
				],
				explanationAr: '« une invention » اسم، فيوافقه الاسم المرادف « une création technique ».'
			},
			{
				questionAr: 'لماذا يستعمل الكاتب إعادة الصياغة في النص العلمي؟',
				options: [
					'لجعل النص أصعب على القارئ',
					'لتبسيط مصطلح علمي وتوضيح الفكرة أكثر',
					'لسرد أحداث قديمة في الماضي',
					'لإعطاء أوامر صارمة'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'العكس تماما، إعادة الصياغة تسهّل الفهم.',
					'ممتاز! الهدف هو التبسيط والتوضيح للقارئ.',
					'السرد ليس وظيفة إعادة الصياغة.',
					'الأوامر تُصاغ في الأمر (impératif).'
				],
				explanationAr: 'إعادة الصياغة وسيلة شرح تجعل المصطلحات العلمية مفهومة بسهولة.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 2 : L'expression de la cause et de la conséquence
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_1am_t2_cause_consequence',
		slug: 'fre-1am-t2-cause-consequence',
		grade: '1am',
		yearSubjectId: 615,
		trimesterId: 't2',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع الثاني: التقدم العلمي والطاقات والتكنولوجيا النافعة — Projet 2 : Les progrès scientifiques',
		order: 2,
		titleAr: 'التعبير عن السبب والنتيجة (L’expression de la cause et de la conséquence)',
		objectives: [
			'التمييز الدقيق بين علاقة السبب (la cause) وعلاقة النتيجة (la conséquence) داخل الجملة',
			'استعمال روابط السبب الصحيحة: car / parce que + جملة فعلية، و grâce à / à cause de + مجموعة اسمية',
			'استعمال روابط النتيجة الصحيحة: donc / c’est pourquoi / alors / par conséquent'
		],
		keywordsAr: ['Cause', 'Conséquence', 'parce que / car', 'grâce à', 'donc / c’est pourquoi'],
		discover: {
			scenarioAr:
				'قارن بين الجملتين حول الطاقة الشمسية في جنوب الجزائر: 1) « L’Algérie développe l’énergie solaire parce que le soleil brille toute l’année. » 2) « Le soleil brille toute l’année, donc l’Algérie développe l’énergie solaire. » لاحظ كيف انقلب ترتيب السبب والنتيجة بتغيّر الرابط.',
			svg: svgFrenchGrammarMap({
				title: 'Cause vs Conséquence : Deux sens inverses',
				rootLabel: 'Relier deux faits scientifiques',
				rootSub: 'Pourquoi ? (Cause) | Quel résultat ? (Conséquence)',
				branches: [
					{
						label: 'Cause (+ Phrase)',
						rule: 'car / parce que',
						example: '...parce que le soleil brille.',
						color: '#1d4ed8'
					},
					{
						label: 'Cause (+ Nom)',
						rule: 'grâce à (+) / à cause de (-)',
						example: 'Grâce au soleil, on produit...',
						color: '#047857'
					},
					{
						label: 'Conséquence',
						rule: 'donc / c’est pourquoi / alors',
						example: '...donc l’énergie est propre.',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'في الجملة الأولى، ما الرابط الذي قدّم السبب (la cause)؟',
					hintAr: 'يجيب عن السؤال: Pourquoi l’Algérie développe-t-elle l’énergie solaire ?',
					expectedInput: 'parce que',
					revealAr: 'الرابط هو « parce que »، وقد قدّم السبب: « le soleil brille toute l’année ».'
				},
				{
					promptAr: 'في الجملة الثانية، ما الرابط الذي قدّم النتيجة (la conséquence)؟',
					hintAr: 'جاء بعد الفاصلة ليدلّ على « إذن / لذلك ».',
					expectedInput: 'donc',
					revealAr: 'الرابط هو « donc » ويقدّم النتيجة المترتبة على سطوع الشمس طوال السنة.'
				},
				{
					promptAr: 'متى نستعمل « grâce à » بدلا من « à cause de » قبل الاسم؟',
					hintAr: 'فكّر هل النتيجة إيجابية أم سلبية.',
					expectedInput: 'Pour un résultat positif',
					revealAr: 'نستعمل « grâce à » للسبب الإيجابي (بفضل)، و « à cause de » للسبب السلبي (بسبب).'
				}
			]
		},
		summary: {
			rulesAr: [
				'السبب (La cause) يفسّر أصل الظاهرة ويجيب عن السؤال « Pourquoi ? ».',
				'روابط السبب مع جملة فعلية: « car » و « parce que » (لا تأتيان في بداية الجملة غالبا في 1AM، وتتبعهما جملة بها فعل مصرف). مثال: « Le livre est utile car il transmet le savoir. »',
				'روابط السبب مع مجموعة اسمية (GN): « grâce à » لنتيجة إيجابية (Grâce à la boussole, le marin s’oriente)، و « à cause de » لنتيجة سلبية (À cause de la pollution, l’air se dégrade).',
				'النتيجة (La conséquence) تبيّن الأثر الناتج عن السبب، ونعبّر عنها بـ: « donc », « alors », « c’est pourquoi », « par conséquent ».',
				'يمكننا تحويل جملة سبب إلى جملة نتيجة بقلب ترتيب الجملتين وتبديل الرابط: [نتيجة] parce que [سبب] <-> [سبب], donc [نتيجة].'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Choisir le bon connecteur logique',
				subtitle: 'Attention à la nature du mot qui suit le connecteur',
				columns: [
					{
						header: 'car / parce que',
						rule: '+ Sujet + Verbe (Cause)',
						examples: '...car l’énergie est propre.',
						color: '#1d4ed8'
					},
					{
						header: 'grâce à / à cause de',
						rule: '+ Groupe nominal (Cause)',
						examples: 'Grâce au livre / À cause du bruit',
						color: '#047857'
					},
					{
						header: 'donc / c’est pourquoi',
						rule: '+ Sujet + Verbe (Conséquence)',
						examples: '...c’est pourquoi on l’utilise.',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'دليل سريع لاختيار رابط السبب أو النتيجة حسب المعنى وبنية الجملة',
			examples: [
				{
					problemAr: 'اربط بين الجملتين بالتعبير عن النتيجة: « L’énergie solaire ne pollue pas l’air. Elle protège la nature. »',
					solutionAr: '« L’énergie solaire ne pollue pas l’air, donc (c’est pourquoi) elle protège la nature. »'
				},
				{
					problemAr: 'أكمل بـ (grâce à / à cause de): « ...... l’imprimerie, les livres sont devenus accessibles à tous. »',
					solutionAr: '« Grâce à l’imprimerie, les livres sont devenus accessibles à tous. » (نتيجة إيجابية).'
				}
			],
			watchOutAr:
				'لا تكتب « parce que » متبوعا باسم وحده دون فعل! قل: « Grâce à la science » (اسم) أو « parce que la science progresse » (فاعل + فعل).'
		},
		practice: [
			{
				questionAr: 'ما العلاقة المنطقية المعبّر عنها في: « Les panneaux solaires sont très utiles car ils produisent une électricité propre. »؟',
				options: ['La conséquence', 'La cause', 'La reformulation', 'L’énumération'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الرابط « car » يقدّم السبب وليس النتيجة.',
					'أحسنت! « car » يدل على السبب (la cause).',
					'لإعادة الصياغة نستعمل c’est-à-dire.',
					'لا يوجد تعداد هنا.'
				],
				explanationAr: 'الرابط « car » يعبّر عن علاقة السبب (la cause).'
			},
			{
				questionAr: 'اختر الرابط المناسب لإتمام الجملة: « L’ordinateur facilite la recherche, ...... les élèves l’utilisent pour leurs exposés. »',
				options: ['car', 'parce que', 'c’est pourquoi', 'grâce à'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الجملة الثانية نتيجة وليست سببا.',
					'parce que يقدّم السبب لا النتيجة.',
					'ممتاز! « c’est pourquoi » يقدّم النتيجة (la conséquence).',
					'grâce à يُتبع باسم وليس بجملة فعلية.'
				],
				explanationAr: 'تسهيل البحث سبب، واستعمال التلاميذ له نتيجة؛ لذا نختار « c’est pourquoi ».'
			},
			{
				questionAr: 'أكمل الجملة بالرابط الأنسب: « ...... progrès de la médecine, de nombreuses maladies sont guéries. »',
				options: ['À cause des', 'Grâce aux', 'Parce que les', 'Donc les'],
				correctIndex: 1,
				diagnosticFeedback: [
					'النتيجة إيجابية (شفاء الأمراض)، فلا نستعمل à cause de.',
					'صحيح! Grâce aux (+ اسم جمع) للسبب الإيجابي.',
					'parce que يحتاج فعلا مصرفا بعده.',
					'donc يعبّر عن النتيجة ويأتي بين جملتين.'
				],
				explanationAr: 'مع المجموعة الاسمية ذات النتيجة الإيجابية نستعمل « Grâce à / Grâce aux ».'
			},
			{
				questionAr: 'حوّل علاقة السبب إلى نتيجة في: « Le voyageur retrouve son chemin parce qu’il utilise une boussole. »',
				options: [
					'Le voyageur utilise une boussole, donc il retrouve son chemin.',
					'Le voyageur retrouve son chemin, donc il utilise une boussole.',
					'Le voyageur utilise une boussole parce qu’il retrouve son chemin.',
					'Grâce à son chemin, le voyageur utilise une boussole.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! وضعنا السبب أولا ثم « donc » ثم النتيجة.',
					'هذا الترتيب عكس المنطق: استعمال البوصلة هو السبب لا النتيجة.',
					'هذا يعكس السبب والنتيجة.',
					'المعنى معكوس هنا أيضا.'
				],
				explanationAr: 'السبب هو استعمال البوصلة والنتيجة هي إيجاد الطريق: السبب + donc + النتيجة.'
			},
			{
				questionAr: 'في أيّ جملة استُعمل « à cause de » استعمالا سليما؟',
				options: [
					'À cause de son intelligence, il a réussi.',
					'À cause des fumées d’usines, l’air de la ville est pollué.',
					'À cause de il pleut, nous restons.',
					'À cause de la lecture, il enrichit son vocabulaire.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'النجاح نتيجة إيجابية، فنستعمل Grâce à.',
					'ممتاز! تلوث الهواء نتيجة سلبية ومتبوعة باسم (des fumées).',
					'لا يأتي بعد à cause de جملة فعلية (il pleut).',
					'إثراء الرصيد اللغوي نتيجة إيجابية (Grâce à).'
				],
				explanationAr: '« à cause de » يُتبع بمجموعة اسمية ويعبّر عن سبب لنتيجة سلبية.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 3 : L'expansion du nom (adjectif, complément du nom, PSR en qui)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_1am_t2_expansion_nom',
		slug: 'fre-1am-t2-expansion-nom',
		grade: '1am',
		yearSubjectId: 615,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع الثاني: التقدم العلمي والطاقات والتكنولوجيا النافعة — Projet 2 : Les progrès scientifiques',
		order: 3,
		titleAr: 'توسيع الاسم: الصفة ومتمم الاسم وجملة الصلة بـ qui (L’expansion du nom)',
		objectives: [
			'فهم دور توسيع الاسم (l’expansion du nom) في إثراء المعنى وتدقيق الوصف العلمي',
			'التمييز بين طرق التوسيع الثلاث: الصفة النعتية (adjectif qualificatif)، متمم الاسم (complément du nom)، وجملة الصلة المبدوءة بـ (qui)',
			'توظيف التوسيعات الثلاثة بدقة في الجمل التفسيرية مع احترام المطابقة النحوية'
		],
		keywordsAr: ['Expansion du nom', 'Adjectif qualificatif', 'Complément du nom', 'Proposition relative qui', 'توسيع الاسم'],
		discover: {
			scenarioAr:
				'انظر كيف نُغني كلمة « un appareil » (جهاز) في ثلاث جمل: 1) « C’est un appareil moderne. » 2) « C’est un appareil de mesure. » 3) « C’est un appareil qui indique le nord. » في كل جملة أضفنا معلومة دقيقة للاسم نفسه.',
			svg: svgFrenchGrammarMap({
				title: 'Les 3 expansions du nom noyau',
				rootLabel: 'Nom noyau : un appareil',
				rootSub: 'Préciser et enrichir le groupe nominal (GN)',
				branches: [
					{
						label: 'Adjectif qualificatif',
						rule: 'S’accorde en genre et nombre',
						example: 'un appareil moderne',
						color: '#1d4ed8'
					},
					{
						label: 'Complément du nom',
						rule: 'Préposition (de, à, en) + Nom',
						example: 'un appareil de mesure',
						color: '#047857'
					},
					{
						label: 'Prop. relative (qui)',
						rule: 'qui + verbe conjugué',
						example: '...qui indique le nord',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما طبيعة الكلمة « moderne » التي وسّعت الاسم « appareil » في الجملة الأولى؟',
					hintAr: 'إنها تصف شكل الجهاز وحداثته.',
					expectedInput: 'Un adjectif qualificatif',
					revealAr: '« moderne » صفة نعتية (adjectif qualificatif épithète) تصف الاسم وتطابقه.'
				},
				{
					promptAr: 'كيف ارتبطت عبارة « de mesure » بالاسم « appareil » في الجملة الثانية؟',
					hintAr: 'لاحظ حرف الجر « de » قبل الاسم « mesure ».',
					expectedInput: 'Complément du nom',
					revealAr: 'ارتبطت بحرف الجر « de » وتُسمّى متمّم الاسم (complément du nom).'
				},
				{
					promptAr: 'ما اسم الجملة « qui indique le nord » المبدوءة بالضمير « qui »؟',
					hintAr: 'تبدأ بالضمير الموصول « qui » وتحتوي على فعل مصرف.',
					expectedInput: 'Proposition subordonnée relative',
					revealAr: 'إنها جملة صلة موصول (proposition subordonnée relative) مبدوءة بـ « qui » وتوضّح الاسم السابق لها (antécédent).'
				}
			]
		},
		summary: {
			rulesAr: [
				'لتدقيق اسم نواة (nom noyau) في النص التفسيري نستعمل ثلاث توسيعات (expansions du nom):',
				'1) الصفة النعتية (L’adjectif qualificatif épithète): توضع مباشرة قبل الاسم أو بعده وتطابقه في الجنس والعدد. مثال: « une énergie propre » / « des panneaux solaires ».',
				'2) متمم الاسم (Le complément du nom - CDN): يُربط بالاسم عبر حرف جر (de, du, d’, à, en, sans, pour). مثال: « un panneau en silicium » / « un livre de sciences » / « une machine à calculer ».',
				'3) الجملة الموصولة (La proposition subordonnée relative - PSR): تبدأ بالضمير الموصول « qui » متبوعا بفعل مصرف، وتعود على الاسم السابق (l’antécédent). مثال: « Le soleil est une étoile qui éclaire la Terre. »',
				'ملاحظة: في الجملة الموصولة بـ « qui »، يطابق الفعل الاسم السابق (l’antécédent): « Des inventions qui facilitent la vie. »'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Reconnaître l’expansion du nom en un coup d’œil',
				subtitle: 'Trois structures à distinguer dans les exercices',
				columns: [
					{
						header: 'Adjectif',
						rule: 'Un mot qui qualifie le nom',
						examples: 'une invention utile',
						color: '#1d4ed8'
					},
					{
						header: 'CDN',
						rule: 'de / à / en / pour + Nom',
						examples: 'une lampe à économie',
						color: '#047857'
					},
					{
						header: 'PSR (qui)',
						rule: 'qui + Verbe conjugué',
						examples: 'un livre qui instruit',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'الفرق البنيوي بين الصفة ومتمم الاسم وجملة الصلة بـ qui',
			examples: [
				{
					problemAr: 'اربط بين الجملتين باستعمال الضمير الموصول « qui »: « La boussole est un instrument. Cet instrument guide les marins. »',
					solutionAr: '« La boussole est un instrument qui guide les marins. »'
				},
				{
					problemAr: 'حدّد نوع التوسيع المسطّر في: « L’électricité ((de la maison)) provient du soleil. »',
					solutionAr: '« de la maison » هو متمّم الاسم (complément du nom) لأنه مسبوق بحرف الجر « de ».'
				}
			],
			watchOutAr:
				'انتبه! عند ربط جملتين بـ « qui » نحذف الفاعل المكرّر في الجملة الثانية؛ لا تكتب « un livre qui il explique » بل اكتب « un livre qui explique ».'
		},
		practice: [
			{
				questionAr: 'ما نوع توسيع الاسم في العبارة: « une énergie renouvelable »؟',
				options: [
					'Complément du nom',
					'Adjectif qualificatif',
					'Proposition subordonnée relative',
					'Complément de cause'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا يوجد حرف جر (de / à / en) قبل الكلمة.',
					'أحسنت! « renouvelable » صفة نعتية تصف الاسم « énergie ».',
					'لا يوجد ضمير موصول « qui » ولا فعل مصرف.',
					'ليست عبارة سبب.'
				],
				explanationAr: '« renouvelable » صفة (adjectif qualificatif) توسّع الاسم « énergie ».'
			},
			{
				questionAr: 'استخرج متمّم الاسم (le complément du nom) من الجملة: « Les élèves lisent un livre de sciences. »',
				options: ['Les élèves', 'lisent', 'un livre', 'de sciences'],
				correctIndex: 3,
				diagnosticFeedback: [
					'Les élèves فاعل الجملة.',
					'lisent هو الفعل.',
					'un livre هو الاسم النواة.',
					'ممتاز! « de sciences » يبدأ بحرف الجر « de » ويتمّم الاسم « livre ».'
				],
				explanationAr: '« de sciences » هو متمم الاسم (complément du nom) المسبوق بحرف الجر « de ».'
			},
			{
				questionAr: 'اربط بين الجملتين باستعمال « qui »: « Ibn Al-Haytham est un savant. Ce savant a étudié la lumière. »',
				options: [
					'Ibn Al-Haytham est un savant qui il a étudié la lumière.',
					'Ibn Al-Haytham est un savant qui a étudié la lumière.',
					'Ibn Al-Haytham est un savant de a étudié la lumière.',
					'Ibn Al-Haytham est un savant donc a étudié la lumière.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'يجب حذف الفاعل المكرر « il » بعد « qui ».',
					'صحيح! « qui » يحل محل الفاعل المكرر ويبدأ جملة الصلة.',
					'لا نستعمل حرف الجر « de » قبل فعل مصرف.',
					'donc أداة نتيجة وليس ضميرا موصولا.'
				],
				explanationAr: 'الضمير الموصول « qui » يعوّض الفاعل المكرر « Ce savant » مباشرة.'
			},
			{
				questionAr: 'في الجملة: « Les panneaux qui captent le soleil sont bleus. » ما هو الاسم السابق (l’antécédent) للضمير « qui »؟',
				options: ['le soleil', 'Les panneaux', 'sont bleus', 'captent'],
				correctIndex: 1,
				diagnosticFeedback: [
					'le soleil مفعول به يأتي بعد الفعل.',
					'أحسنت! « Les panneaux » هو الاسم السابق المباشر لـ « qui ».',
					'sont bleus خبر الجملة الرئيسة.',
					'captent هو فعل جملة الصلة.'
				],
				explanationAr: 'الاسم السابق (antécédent) يقع مباشرة قبل الضمير الموصول « qui » وهو « Les panneaux ».'
			},
			{
				questionAr: 'اختر الفعل الصحيح بعد « qui »: « Ce sont des inventions qui ...... le travail humain. »',
				options: ['facilite', 'facilitent', 'facilites', 'facilitons'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الاسم السابق « des inventions » جمع، فلا نكتب مفردا.',
					'ممتاز! الفعل يطابق الاسم السابق الجمع: facilitent.',
					'facilites للضمير tu.',
					'facilitons للضمير nous.'
				],
				explanationAr: 'الفعل بعد « qui » يطابق الاسم السابق « des inventions » (جمع) -> facilitent.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 4 : Le passé composé et l'accord du participe passé
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_1am_t2_passe_compose',
		slug: 'fre-1am-t2-passe-compose',
		grade: '1am',
		yearSubjectId: 615,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع الثاني: التقدم العلمي والطاقات والتكنولوجيا النافعة — Projet 2 : Les progrès scientifiques',
		order: 4,
		titleAr: 'الماضي المركّب ومطابقة اسم المفعول (Le passé composé et l’accord du participe passé)',
		objectives: [
			'بناء الماضي المركب (le passé composé) باستعمال الفعل المساعد (être أو avoir) في المضارع + اسم المفعول (participe passé)',
			'تشكيل اسم المفعول لأفعال المجموعة الأولى (-é) والثانية (-i) وأشهر أفعال المجموعة الثالثة',
			'تطبيق قاعدة مطابقة اسم المفعول مع المساعد (être) وعدم مطابقته مع الفاعل عند استعمال (avoir)'
		],
		keywordsAr: ['Passé composé', 'Auxiliaire être / avoir', 'Participe passé', 'Accord', 'الماضي المركب'],
		discover: {
			scenarioAr:
				'قرأ التلاميذ فقرة عن تاريخ العلم: « Les savants musulmans ont inventé la boussole moderne et ont développé l’optique. Ces découvertes sont arrivées jusqu’en Europe et sont restées célèbres. » قارن بين نهاية اسم المفعول مع « avoir » ونهايته مع « être ».',
			svg: svgFrenchTenseTimeline({
				title: 'Raconter une invention passée',
				tenseName: 'Le passé composé',
				formula: 'être / avoir (au présent) + Participe passé',
				activeZone: 'past',
				example: 'Les savants ont créé des outils utiles. La science a progressé.',
				markers: 'Hier, autrefois, en 1021, au siècle dernier'
			}),
			steps: [
				{
					promptAr: 'من كم عنصر يتكوّن الفعل المصرّف في الماضي المركب مثل « ont inventé » و « sont arrivées »؟',
					hintAr: 'انظر إلى عدد الكلمات في كل فعل مصرف.',
					expectedInput: 'Deux éléments',
					revealAr: 'يتكوّن من عنصرين: الفعل المساعد في المضارع (avoir أو être) + اسم المفعول (le participe passé).'
				},
				{
					promptAr: 'لماذا أضفنا « -es » إلى « arrivées » في « Ces découvertes sont arrivées »؟',
					hintAr: 'ما الفعل المساعد هنا؟ وما جنس وعدد الفاعل « Ces découvertes »؟',
					expectedInput: 'Accord avec le sujet',
					revealAr: 'لأن الفعل مصرف مع المساعد « être »، واسم المفعول يطابق الفاعل المؤنث الجمع (Ces découvertes) فنضيف « -es ».'
				},
				{
					promptAr: 'هل أضفنا « -s » إلى « inventé » في « Les savants ont inventé »؟ ولماذا؟',
					hintAr: 'انظر إلى الفعل المساعد « ont » (avoir).',
					expectedInput: 'Non, auxiliaire avoir',
					revealAr: 'لا! مع الفعل المساعد « avoir » لا يطابق اسم المفعول الفاعل أبدا، فنكتب « inventé ».'
				}
			]
		},
		summary: {
			rulesAr: [
				'الماضي المركّب (Le passé composé) يعبّر عن حدث تمّ وانتهى في الماضي، ويتكوّن من: Auxiliaire (être أو avoir) au présent + Participe passé.',
				'تشكيل اسم المفعول (Participe passé): المجموعة الأولى (-er -> -é : inventer -> inventé)؛ المجموعة الثانية (-ir -> -i : choisir -> choisi)؛ المجموعة الثالثة (-u, -is, -it, -t : voir -> vu, prendre -> pris, écrire -> écrit, faire -> fait).',
				'قاعدة المطابقة مع « être »: اسم المفعول المصرف مع « être » يطابق الفاعل في الجنس والعدد (+e للمؤنث، +s للجمع المذكر، +es للجمع المؤنث). مثال: « La machine est tombée en panne. » / « Les élèves sont allés au laboratoire. »',
				'أشهر الأفعال المصرفة مع « être »: aller, venir, arriver, partir, entrer, sortir, monter, descendre, rester, tomber, naître, devenir + الأفعال الضميرية (se laver...).',
				'مع المساعد « avoir »: لا يطابق اسم المفعول الفاعل أبدا. مثال: « Les chercheuses ont fabriqué un panneau solaire. »'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Accord du participe passé en 1AM',
				subtitle: 'Regarder toujours l’auxiliaire en premier',
				columns: [
					{
						header: 'Avec AVOIR',
						rule: 'Pas d’accord avec le sujet',
						examples: 'Elles ont inventé / Ils ont choisi',
						color: '#1d4ed8'
					},
					{
						header: 'Avec ÊTRE (fém.)',
						rule: 'Ajoute -e (ou -es au pluriel)',
						examples: 'Elle est arrivée / Elles sont venues',
						color: '#047857'
					},
					{
						header: 'Avec ÊTRE (masc. pl.)',
						rule: 'Ajoute -s au pluriel',
						examples: 'Ils sont partis / Ils sont restés',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'القاعدة الذهبية لمطابقة اسم المفعول بين المساعدين avoir و être',
			examples: [
				{
					problemAr: 'صرّف في الماضي المركب: « Les ingénieurs (installer) ...... des panneaux solaires. »',
					solutionAr: '« Les ingénieurs ont installé des panneaux solaires. » (مع avoir لا نضيف s).'
				},
				{
					problemAr: 'صرّف في الماضي المركب: « Meriem et Salma (aller) ...... à la bibliothèque scientifique. »',
					solutionAr: '« Meriem et Salma sont allées à la bibliothèque scientifique. » (مع être والفاعل مؤنث جمع -> -es).'
				}
			],
			watchOutAr:
				'خطأ شائع: إضافة « s » مع المساعد « avoir » عندما يكون الفاعل جمعا! تذكّر: « Ils ont travaillé » وليس « Ils ont travaillés ».'
		},
		practice: [
			{
				questionAr: 'اختر التصريف الصحيح في الماضي المركب: « Hier, les élèves ...... une expérience en classe. » (faire)',
				options: ['ont fait', 'ont faits', 'sont fait', 'ont fais'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! الفعل faire يُصرّف مع avoir واسم مفعوله fait دون مطابقة للفاعل.',
					'مع avoir لا نضيف s للفاعل الجمع.',
					'faire لا يُصرف مع être هنا.',
					'اسم مفعول faire هو fait وليس fais.'
				],
				explanationAr: 'الفعل « faire » مع « ils » في الماضي المركب هو: « ont fait ».'
			},
			{
				questionAr: 'أكمل بالصيغة الصحيحة: « Les nouvelles technologies ...... très vite. » (arriver)',
				options: ['ont arrivé', 'sont arrivé', 'sont arrivées', 'sont arrivés'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الفعل arriver يُصرف مع المساعد être.',
					'يجب مطابقة اسم المفعول مع الفاعل المؤنث الجمع.',
					'ممتاز! Les nouvelles technologies مؤنث جمع، فنكتب « sont arrivées ».',
					'technologies مؤنث وليس مذكرا.'
				],
				explanationAr: 'مع « être » يطابق اسم المفعول الفاعل المؤنث الجمع « technologies » -> sont arrivées.'
			},
			{
				questionAr: 'ما اسم المفعول الصحيح للفعل « choisir »؟',
				options: ['choisé', 'choisi', 'choisu', 'choisit'],
				correctIndex: 1,
				diagnosticFeedback: [
					'النهاية -é للمجموعة الأولى (-er).',
					'صحيح! أفعال المجموعة الثانية (-ir) تنتهي بـ -i: choisi.',
					'choisu غير صحيحة.',
					'choisit هي صيغة المضارع وليست اسم المفعول.'
				],
				explanationAr: 'اسم المفعول لأفعال المجموعة الثانية ينتهي دائما بـ « -i »: choisir -> choisi.'
			},
			{
				questionAr: 'أكمل الجملة: « Khadija ...... un beau livre sur Al-Khwarizmi. » (lire)',
				options: ['est lue', 'a lue', 'a lu', 'est lu'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الفعل lire يُصرف مع avoir وليس être.',
					'مع avoir لا يطابق اسم المفعول الفاعل (Khadija).',
					'أحسنت! Khadija a lu.',
					'lire يأخذ المساعد avoir.'
				],
				explanationAr: '« lire » يُصرف مع « avoir » واسم مفعوله « lu » لا يتغير مع الفاعل: a lu.'
			},
			{
				questionAr: 'أيّ جملة خالية من الأخطاء في الماضي المركب؟',
				options: [
					'Les savants ont développés la boussole.',
					'La lampe solaire est devenu utile.',
					'Les élèves sont restés attentifs au laboratoire.',
					'Elles ont choisies un bon livre.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'مع avoir لا نضيف s: ont développé.',
					'مع être والفاعل مؤنث يجب إضافة e: est devenue.',
					'ممتاز! rester يُصرف مع être ويطابق الفاعل الجمع المذكر: sont restés.',
					'مع avoir لا نضيف es: ont choisi.'
				],
				explanationAr: 'الجملة الصحيحة هي: « Les élèves sont restés attentifs au laboratoire. »'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 5 : Expliquer le fonctionnement d'une invention utile
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_1am_t2_expliquer_invention',
		slug: 'fre-1am-t2-expliquer-invention',
		grade: '1am',
		yearSubjectId: 615,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع الثاني: التقدم العلمي والطاقات والتكنولوجيا النافعة — Projet 2 : Les progrès scientifiques',
		order: 5,
		titleAr: 'شرح عمل وفوائد اختراع نافع (Expliquer le fonctionnement d’une invention utile)',
		objectives: [
			'تنظيم فقرة تفسيرية حول اختراع علمي نافع (الطاقة الشمسية، الكتاب المطبوع، البوصلة)',
			'توظيف موارد المشروع الثاني: إعادة الصياغة، السبب والنتيجة، توسيع الاسم، والمضارع/الماضي المركب',
			'استعمال رصيد لغوي تقني مبسّط يبرز فائدة الاختراع لحياة الإنسان والبيئة'
		],
		keywordsAr: ['Invention utile', 'Énergie solaire', 'Boussole', 'Livre', 'Production écrite'],
		discover: {
			scenarioAr:
				'أراد بلال إعداد بطاقة علمية لزملائه حول الألواح الشمسية في الصحراء الجزائرية. قسّم بطاقته إلى أربعة عناصر: تعريف الاختراع، كيف يعمل، لماذا هو مفيد (بسبب/نتيجة)، وخلاصة تحثّ على الاستفادة منه.',
			svg: svgFrenchWritingBlueprint({
				title: 'Expliquer une invention utile (4 étapes)',
				steps: [
					{ stage: 'Présentation', detail: 'Définir l’invention + reformulation (c’est-à-dire...)', color: '#1d4ed8' },
					{ stage: 'Fonctionnement', detail: 'Expliquer comment elle marche (qui capte / qui indique...)', color: '#047857' },
					{ stage: 'Avantages', detail: 'Cause et conséquence (grâce à / car / donc / c’est pourquoi)', color: '#b45309' },
					{ stage: 'Conclusion', detail: 'Souligner son utilité pour la science et la vie quotidienne', color: '#7c3aed' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الأداة المناسبة لتبسيط مصطلح تقني في الفقرة الأولى من العرض؟',
					hintAr: 'تذكّر درس إعادة الصياغة.',
					expectedInput: 'c’est-à-dire',
					revealAr: 'نستعمل « c’est-à-dire » أو « autrement dit » لشرح المصطلح بلغة ميسّرة.'
				},
				{
					promptAr: 'كيف نربط بين ميزة الاختراع وفائدته للإنسان؟',
					hintAr: 'استعمل رابط سبب أو نتيجة من الدرس الثاني.',
					expectedInput: 'grâce à / donc',
					revealAr: 'نستعمل « grâce à » قبل الاسم أو « car / parce que » للسبب و « donc / c’est pourquoi » للنتيجة.'
				},
				{
					promptAr: 'كيف نُغني الاسم « un appareil » أو « un outil » في الشرح؟',
					hintAr: 'تذكّر التوسيعات الثلاث للاسم.',
					expectedInput: 'Adjectif, CDN ou qui',
					revealAr: 'نوسّعه بصفة (utile)، أو متمم اسم (de navigation)، أو جملة صلة (qui facilite la vie).'
				}
			]
		},
		summary: {
			rulesAr: [
				'في المقدّمة: نضع عنوانا ونعرّف الاختراع مع إعادة صياغة بسيطة. مثال: « Le panneau solaire est un appareil moderne, c’est-à-dire un outil qui transforme la lumière du soleil en électricité. »',
				'في العرض: نذكر كيف يعمل الاختراع باستعمال المضارع وتوسيع الاسم (صفة، متمم اسم، جملة صلة بـ qui)، ثم نبيّن فوائده باستعمال السبب والنتيجة (car, grâce à, donc).',
				'إذا أشرنا إلى تاريخ اكتشافه أو صنعه قديما، نستعمل الماضي المركّب: « Les savants ont perfectionné la boussole pour aider les voyageurs. »',
				'في الخاتمة: نلخّص قيمة الاختراع النافع في خدمة الإنسان والبيئة دون تلوث.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: '3 inventions modèles du programme 1AM (T2)',
				rootLabel: 'Choisir les mots-clés exacts',
				rootSub: 'Progrès scientifiques et technologie utile',
				branches: [
					{
						label: 'Énergie solaire',
						rule: 'panneau, soleil, électricité',
						example: 'propre, renouvelable, gratuite',
						color: '#1d4ed8'
					},
					{
						label: 'La boussole',
						rule: 'aiguille aimantée, nord',
						example: 's’orienter, voyager, sécurité',
						color: '#047857'
					},
					{
						label: 'Le livre',
						rule: 'pages, savoir, lecture',
						example: 'instruire, partager la science',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'الكلمات المفتاحية لأهم الاختراعات المدروسة في المشروع الثاني',
			examples: [
				{
					problemAr: 'كوّن جملة تفسّر فائدة البوصلة باستعمال « grâce à ».',
					solutionAr: '« Grâce à son aiguille aimantée qui indique le nord, la boussole guide les voyageurs dans le désert et en mer. »'
				},
				{
					problemAr: 'كوّن جملة تبيّن نتيجة استعمال الطاقة الشمسية باستعمال « c’est pourquoi ».',
					solutionAr: '« L’énergie solaire ne produit pas de fumée, c’est pourquoi elle protège l’environnement. »'
				}
			],
			watchOutAr:
				'احرص على عدم خلط الأزمنة دون سبب: استعمل الماضي المركّب لحدث تاريخي قديم، والمضارع الإخباري لشرح كيفية عمل الاختراع وفوائده الدائمة.'
		},
		practice: [
			{
				questionAr: 'أيّ جملة تشرح عمل اللوح الشمسي شرحا علميا دقيقا؟',
				options: [
					'Le panneau solaire capte la lumière du soleil pour produire de l’électricité.',
					'Le panneau solaire sert à mesurer la température du vent.',
					'Le panneau solaire indique les quatre points cardinaux.',
					'Le panneau solaire remplace complètement les livres.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! اللوح الشمسي يحوّل ضوء الشمس إلى كهرباء نظيفة.',
					'قياس الحرارة ليس وظيفة اللوح الشمسي.',
					'تحديد الجهات الأربع وظيفة البوصلة.',
					'لا علاقة بين اللوح الشمسي واستبدال الكتب.'
				],
				explanationAr: 'وظيفة اللوح الشمسي هي التقاط ضوء الشمس وتحويله إلى طاقة كهربائية.'
			},
			{
				questionAr: 'ما الجملة التي تحتوي على إعادة صياغة وجملة صلة بـ « qui » معا؟',
				options: [
					'La boussole est un outil de voyage, c’est-à-dire un instrument qui indique toujours le nord.',
					'La boussole est petite et très pratique.',
					'La boussole aide le marin.',
					'Hier, nous avons vu une boussole.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! تحتوي على « c’est-à-dire » (إعادة صياغة) و « qui indique » (جملة صلة).',
					'تحتوي على صفتين فقط.',
					'جملة بسيطة دون إعادة صياغة أو صلة.',
					'جملة في الماضي دون توسيع بـ qui أو إعادة صياغة.'
				],
				explanationAr: 'هذه الجملة توظّف بنجاح « c’est-à-dire » و « qui indique toujours le nord ».'
			},
			{
				questionAr: 'أيّ رابط يناسب الفراغ: « Le livre diffuse les connaissances, ...... il reste le meilleur compagnon de l’élève. »',
				options: ['car', 'à cause de', 'donc', 'mais'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الجملة الثانية نتيجة وليست سببا.',
					'à cause de للسبب السلبي مع اسم.',
					'صحيح! « donc » يقدّم النتيجة المنطقية.',
					'لا يوجد تعارض بين الجملتين.'
				],
				explanationAr: 'نشر الكتاب للمعارف سبب، وبقاؤه خير رفيق للتلميذ نتيجة (donc).'
			},
			{
				questionAr: 'في أيّ جزء من النص نذكر تعريف الاختراع وتبسيطه؟',
				options: ['في الخاتمة', 'في المقدّمة', 'في التوقيع', 'خارج النص'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الخاتمة تلخّص أهمية الاختراع.',
					'أحسنت! المقدمة تعرّف الاختراع وتقدّمه للقارئ.',
					'النص التفسيري لا يحتاج توقيعا شخصيا.',
					'المقدمة جزء أساسي داخل النص.'
				],
				explanationAr: 'نقدّم تعريف الاختراع في مقدمة النص التفسيري.'
			},
			{
				questionAr: 'اختر الخاتمة الأنسب لفقرة عن الطاقة الشمسية:',
				options: [
					'Ainsi, l’énergie solaire représente une solution propre et durable pour l’avenir de notre pays.',
					'La boussole a une aiguille aimantée.',
					'Hier, j’ai rangé mon cartable.',
					'Par exemple, le vent fait tourner les éoliennes.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! تبدأ بـ « Ainsi » وتلخّص فائدة الطاقة الشمسية.',
					'هذه معلومة عن البوصلة وليست عن الطاقة الشمسية.',
					'خارج الموضوع تماما.',
					'هذا مثال عن طاقة الرياح وليس خاتمة.'
				],
				explanationAr: 'الخاتمة الجيدة تلخّص الموضوع باستعمال رابط مثل « Ainsi » أو « En conclusion ».'
			}
		]
	}
];
