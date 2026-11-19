import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWritingBlueprint
} from '../../svg-french';

export const LESSONS_4AM_T1: FrenchInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// 1. Structure du texte argumentatif (BEM — Thème, Thèse, Arguments, Exemples, Conclusion)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_4am_t1_structure_argumentatif',
		slug: 'fre-4am-t1-structure-argumentatif',
		grade: '4am',
		yearSubjectId: 645,
		trimesterId: 't1',
		sequenceId: 'proj1',
		sequenceTitleAr: 'المشروع الأول: النص الحجاجي لتثمين الجزائر وتراثها (Argumenter pour valoriser l’Algérie — BEM)',
		order: 1,
		titleAr: 'بنية النص الحجاجي في شهادة التعليم المتوسط (Structure du texte argumentatif : Thèse, Arguments, Exemples)',
		objectives: [
			'التمييز الدقيق بين الموضوع العام (Le thème) وأطروحة الكاتب (La thèse) والحجج (Les arguments) والأمثلة (Les exemples) والخاتمة',
			'استخراج أطروحة الكاتب وحججه من نص حجاجي حول تراث الجزائر بدقة مضمونة في امتحان BEM'
		],
		keywordsAr: ['texte argumentatif', 'thème', 'thèse', 'arguments', 'exemples', 'BEM'],
		discover: {
			scenarioAr:
				'اقرأ هذا النص الحجاجي المصغّر عن تلمسان: « Je pense que Tlemcen est l’une des plus belles destinations culturelles d’Algérie. D’abord, elle possède un riche patrimoine architectural, comme la Grande Mosquée construite en 1082. Ensuite, ses paysages naturels sont remarquables, tel le plateau de Lalla Setti. C’est pourquoi cette ville mérite vraiment d’être visitée. » كيف أقنع الكاتب القارئ برأيه؟',
			svg: svgFrenchWritingBlueprint({
				title: 'Architecture du texte argumentatif au BEM (4AM)',
				steps: [
					{ stage: '1. Introduction', detail: 'Présenter le thème + formuler clairement la THÈSE (point de vue de l’auteur).' },
					{ stage: '2. Développement', detail: '2 à 3 ARGUMENTS reliés par des connecteurs (D’abord, Ensuite, Enfin).' },
					{ stage: '3. Exemples', detail: 'Illustrer chaque argument (comme, par exemple, tel que, notamment).' },
					{ stage: '4. Conclusion', detail: 'Confirmer la thèse et inviter le lecteur (C’est pourquoi, Donc, En conclusion).' }
				]
			}),
			steps: [
				{
					promptAr: 'ما هو الموضوع العام (Le thème) وما هي الأطروحة (La thèse) التي يدافع عنها الكاتب؟',
					hintAr: 'الموضوع كلمة واحدة (المدينة)، والأطروحة هي الجملة الأولى التي تتضمن رأي الكاتب.',
					expectedInput: 'Thème : Tlemcen | Thèse : Tlemcen est l’une des plus belles destinations culturelles d’Algérie',
					revealAr: 'ممتاز! الـ Thème هو الموضوع العام في كلمة أو كلمتين، أما الـ Thèse فهي موقف ورأي الكاتب تجاه هذا الموضوع وتأتي غالباً في المقدمة.'
				},
				{
					promptAr: 'استخرج حجة واحدة (Argument) ومثالها (Exemple) من النص أعلاه.',
					hintAr: 'الحجة بعد D’abord، والمثال بعد كلمة comme.',
					expectedInput: 'Argument : elle possède un riche patrimoine architectural | Exemple : comme la Grande Mosquée construite en 1082',
					revealAr: 'الحجة تبرّر الأطروحة، والمثال الملموس (المسبوق بـ comme, par exemple, tel que, notamment) يُقوّي الحجة ويُثبتها!'
				},
				{
					promptAr: 'بأيّ عبارة افتتح الكاتب الخاتمة (La conclusion) ليؤكد أطروحته؟',
					hintAr: 'انظر بداية الجملة الأخيرة.',
					expectedInput: 'C’est pourquoi',
					revealAr: 'عبارات الخاتمة الشهيرة في BEM هي: C’est pourquoi، Donc، En conclusion، Ainsi، Bref.'
				}
			]
		},
		summary: {
			rulesAr: [
				'النص الحجاجي (Le texte argumentatif) يهدف إلى إقناع القارئ (convaincre / persuader) بوجهة نظر معينة حول موضوع (thème) مثل تثمين الجزائر وتراثها.',
				'مكوّنات المقدمة (Introduction): التمهيد للموضوع (Thème) + صياغة الأطروحة (Thèse = opinion défendue par l’auteur).',
				'مكوّنات العرض (Développement): حجج مرتّبة (Arguments) مسبوقة بروابط الترتيب (D’abord, Ensuite, Enfin)، وكل حجة مدعّمة بمثال (Exemple) مسبوق بـ: par exemple، comme، tel(le) que، notamment، ainsi.',
				'مكوّنات الخاتمة (Conclusion): تأكيد الأطروحة بأساليب جديدة أو توجيه دعوة للزيارة/العمل باستعمال: Donc، C’est pourquoi، En conclusion، En somme.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Les 4 piliers à repérer dans un texte BEM (4AM)',
				rootLabel: 'Analyser un texte argumentatif en 3 minutes',
				rootSub: 'Question classique BEM : « Quelle est la thèse défendue par l’auteur ? »',
				branches: [
					{
						label: 'Thème vs Thèse',
						rule: 'Sujet général vs Opinion précise',
						example: 'La Casbah vs La Casbah est un joyau à visiter',
						color: '#1d4ed8'
					},
					{
						label: 'Arguments',
						rule: 'Raisons qui prouvent la thèse',
						example: 'D’abord..., Ensuite..., Enfin...',
						color: '#047857'
					},
					{
						label: 'Exemples',
						rule: 'Preuves concrètes (comme / tel)',
						example: 'notamment le Tassili et Timgad',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'خريطة تحليل النص الحجاجي لاستخراج الأطروحة والحجج والأمثلة يوم امتحان شهادة التعليم المتوسط',
			examples: [
				{
					problemAr: 'ميّز بين الحجة والمثال في الجملة: « L’Algérie possède un patrimoine saharien unique, comme les gravures rupestres du Tassili n’Ajjer. »',
					solutionAr: 'Argument : L’Algérie possède un patrimoine saharien unique | Exemple : les gravures rupestres du Tassili n’Ajjer (introduit par « comme »).'
				},
				{
					problemAr: 'حدّد الأطروحة في المقدمة: « À mon avis, la Vallée du M’Zab mérite l’admiration de tous les voyageurs. »',
					solutionAr: 'Thèse : La Vallée du M’Zab mérite l’admiration de tous les voyageurs.'
				}
			],
			watchOutAr:
				'في BEM: لا تكتب أبداً الحجة كأطروحة! الأطروحة (La thèse) هي الفكرة الشاملة في المقدمة (غالباً قبل D’abord)، أما الجمل المسبوقة بـ (D’abord, Ensuite, Enfin) فهي الحجج (Les arguments)!'
		},
		practice: [
			{
				questionAr: 'ما المقصود بـ « la thèse » في النص الحجاجي؟',
				options: [
					'عنوان الكتاب الذي أُخذ منه النص',
					'الرأي أو الموقف الذي يدافع عنه الكاتب لإقناع القارئ',
					'مثال مأخوذ من التاريخ فقط',
					'قائمة الأسماء الجغرافية'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'ذاك هو المصدر (La source).',
					'ممتاز! الأطروحة (La thèse) هي وجهة النظر الأساسية التي يدافع عنها الكاتب.',
					'المثال يوضّح الحجة وليس هو الأطروحة.',
					'الأسماء الجغرافية ليست أطروحة.'
				],
				explanationAr: 'La thèse تعني موقف الكاتب ورأيه الرئيسي الذي يبني عليه حججه.'
			},
			{
				questionAr: 'أيّ عبارة تُستعمل لتقديم مثال (un exemple) داخل الفقرة الحجاجية؟',
				options: ['Par exemple / notamment / tel que', 'C’est pourquoi / en conclusion', 'Hier matin / soudain', 'Puisque / à cause de'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! عبارات التمثيل هي: par exemple، comme، notamment، tel(le) que.',
					'هذه عبارات الخاتمة والنتيجة.',
					'هذه مؤشرات زمنية للسرد.',
					'هذه أدوات السبب.'
				],
				explanationAr: 'تُقدّم الأمثلة بروابط مثل: par exemple، comme، notamment، tel que.'
			},
			{
				questionAr: 'في أيّ جزء من النص الحجاجي ترد الأطروحة (La thèse) عادة؟',
				options: ['في الهامش فقط', 'في المقدمة (L’introduction)', 'في قائمة الكلمات المشروحة', 'في المصدر أسفل النص'],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا توجد في الهامش.',
					'ممتاز! تُصاغ الأطروحة في المقدمة ثم تُؤكّد في الخاتمة.',
					'الـ Lexique يشرح الكلمات الصعبة فقط.',
					'المصدر يذكر المرجع وتاريخ النشر.'
				],
				explanationAr: 'يعرض الكاتب أطروحته بوضوح في المقدمة (L’introduction) قبل تفصيل الحجج.'
			},
			{
				questionAr: 'حدّد العبارة التي تمثّل « Thème » وليس « Thèse »:',
				options: [
					'Je suis convaincu que Constantine fascine chaque visiteur.',
					'Le patrimoine touristique de la Casbah d’Alger',
					'À mon avis, il faut absolument découvrir le Tassili n’Ajjer.',
					'Tlemcen mérite d’être appelée la perle du Maghreb.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه جملة تتضمن رأياً (Thèse).',
					'صحيح! عبارة اسمية عامة بلا موقف شخصي تمثّل الموضوع (Le thème).',
					'هذه أطروحة واضحة مسبوقة بـ À mon avis.',
					'هذه أطروحة تثمينية.'
				],
				explanationAr: 'الـ Thème هو الموضوع العام (عبارة اسمية)، بينما الـ Thèse جملة تحمل حكم ورأي الكاتب.'
			},
			{
				questionAr: 'ما الغاية الأساسية (La visée) من نص حجاجي يصف جمال الجزائر وتراثها؟',
				options: [
					'إقناع القارئ بقيمة التراث الجزائري وحثّه على زيارته وحمايته (convaincre et inciter à découvrir)',
					'نقل خبر حادث مرور عابر',
					'شرح قواعد لعبة رياضية',
					'سرد حكاية خيالية عن الحيوانات'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! النص الحجاجي في المشروع الأول يهدف إلى الإقناع والتشجيع على اكتشاف الجزائر.',
					'ذاك هدف الخبر الصحفي (fait divers).',
					'ذاك نص إرشادي (prescriptif).',
					'ذاك نص قصصي خيالي (fable / conte).'
				],
				explanationAr: 'يهدف النص الحجاجي إلى الإقناع (convaincre / persuader) وتحفيز القارئ (inciter à visiter / protéger).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 2. Verbes d’opinion et connecteurs d’énumération
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_4am_t1_verbes_opinion_connecteurs',
		slug: 'fre-4am-t1-verbes-opinion-connecteurs',
		grade: '4am',
		yearSubjectId: 645,
		trimesterId: 't1',
		sequenceId: 'proj1',
		sequenceTitleAr: 'المشروع الأول: النص الحجاجي لتثمين الجزائر وتراثها (Argumenter pour valoriser l’Algérie — BEM)',
		order: 2,
		titleAr: 'أفعال الرأي وروابط الترتيب الحجاجي (Verbes d’opinion et connecteurs d’énumération)',
		objectives: [
			'توظيف أفعال وتعابير الرأي (penser que, croire que, estimer que, affirmer que, à mon avis) لصياغة الأطروحة في BEM',
			'استعمال روابط الترتيب الحجاجي (d’abord, ensuite, de plus, enfin) لتنظيم الحجج بتسلسل منطقي محكم'
		],
		keywordsAr: ['verbes d’opinion', 'connecteurs d’énumération', 'd’abord', 'ensuite', 'enfin', 'à mon avis'],
		discover: {
			scenarioAr:
				'اقرأ كيف ينظّم تلميذ 4AM حججه حول قسنطينة: « Personnellement, j’estime que Constantine est une ville inoubliable. D’abord, ses ponts suspendus offrent des vues vertigineuses. Ensuite, elle a abrité de grands savants comme Cheikh Abdelhamid Ben Badis. Enfin, son artisanat traditionnel charme tous les visiteurs. » ما الكلمات التي أظهرت الرأي ورتّبت الحجج؟',
			svg: svgFrenchGrammarMap({
				title: 'Formuler son opinion et structurer ses arguments (BEM)',
				rootLabel: 'Les outils indispensables du texte argumentatif',
				rootSub: 'Clarté de la thèse + progression logique des arguments',
				branches: [
					{
						label: 'Verbes d’opinion',
						rule: 'Suivis de « que » + indicatif',
						example: 'Je pense / j’estime / j’affirme que...',
						color: '#1d4ed8'
					},
					{
						label: 'Expressions d’opinion',
						rule: 'En début de phrase + virgule',
						example: 'À mon avis, Selon moi, Sans doute,',
						color: '#047857'
					},
					{
						label: 'Connecteurs d’énumération',
						rule: 'Ordonner 3 arguments clés',
						example: 'D’abord, / Ensuite, / Enfin,',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما فعل الرأي والعبارة الرأييّة اللذان استعملهما الكاتب في الجملة الأولى؟',
					hintAr: 'ظرف في البداية وفعل متبوع بـ que.',
					expectedInput: 'Personnellement / j’estime que',
					revealAr: 'أفعال الرأي (penser, croire, estimer, juger, affirmer, être convaincu que) تُظهر بوضوح حضور الكاتب وموقفه.'
				},
				{
					promptAr: 'ما الروابط الثلاثة التي رتّبت الحجج من الأولى إلى الأخيرة؟',
					hintAr: 'تقع في بداية الجمل الثانية والثالثة والرابعة.',
					expectedInput: 'D’abord / Ensuite / Enfin',
					revealAr: 'تُسمّى (Les connecteurs d’énumération) وهي تمنح النص الحجاجي هيكلاً واضحاً يحبه مصحّح شهادة التعليم المتوسط!'
				},
				{
					promptAr: 'ما الرابط الذي يمكننا استعماله لإضافة حجة جديدة أو تعزيز حجة سابقة بدل تكرار (Ensuite)؟',
					hintAr: 'عبارات مثل De plus / En outre / Par ailleurs.',
					expectedInput: 'De plus / En outre / Par ailleurs / Puis',
					revealAr: 'أحسنت! تنويع الروابط (D’abord... Ensuite / De plus... Enfin) يرفع علامة التماسك في الإنتاج الكتابي.'
				}
			]
		},
		summary: {
			rulesAr: [
				'أفعال الرأي (Les verbes d’opinion): penser que، croire que، estimer que، trouver que، juger que، affirmer que، être persuadé(e) / convaincu(e) que.',
				'تعابير الرأي (Les expressions d’opinion): À mon avis، Selon moi، Personnellement، D’après moi، Pour ma part، Quant à moi (دائماً متبوعة بفاصلة).',
				'روابط الترتيب الحجاجي (Les connecteurs d’énumération): للحجة الأولى (D’abord, Tout d’abord, En premier lieu) | للحجة الثانية (Ensuite, Puis, De plus, En outre, Par ailleurs, En deuxième lieu) | للحجة الأخيرة (Enfin, Finalement, En dernier lieu).',
				'قاعدة التوافق المزاجي في BEM: أفعال الرأي في صيغة الإثبات (Je pense que, Je crois que) يتبعها المضارع الإخباري (Indicatif) مثل: Je pense que Ghardaïa est unique.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Échelle des connecteurs d’énumération (BEM)',
				subtitle: 'Ne jamais placer « Enfin » avant « D’abord » !',
				columns: [
					{
						header: '1er Argument',
						rule: 'Ouverture',
						examples: 'D’abord, / Tout d’abord, / En premier lieu,',
						color: '#1d4ed8'
					},
					{
						header: '2e Argument',
						rule: 'Progression / Ajout',
						examples: 'Ensuite, / De plus, / En outre,',
						color: '#047857'
					},
					{
						header: '3e Argument & Fin',
						rule: 'Clôture argumentative',
						examples: 'Enfin, / C’est pourquoi / Donc',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'التسلسل المنطقي للروابط الحجاجية في الوضعية الإدماجية للـ BEM',
			examples: [
				{
					problemAr: 'أعِد صياغة الأطروحة بإدخال فعل رأي مناسب: « Le Tassili n’Ajjer est un trésor universel. »',
					solutionAr: 'Je suis convaincu (أو J’affirme / Je pense) que le Tassili n’Ajjer est un trésor universel.'
				},
				{
					problemAr: 'رتّب الروابط التالية في فقرة: (Enfin — D’abord — De plus).',
					solutionAr: '1) D’abord, ... 2) De plus, ... 3) Enfin, ...'
				}
			],
			watchOutAr:
				'احذر الجمع المكرّر في نفس الجملة بين « À mon avis » و « je pense que » (لا تكتب أبداً: À mon avis, je pense que...)! اختر واحداً منهما فقط: إما « À mon avis, Timgad est fascinante » أو « Je pense que Timgad est fascinante ».'
		},
		practice: [
			{
				questionAr: 'أيّ جملة خالية من التكرار الأسلوبي (pléonasme) في التعبير عن الرأي؟',
				options: [
					'À mon avis, je pense que la Casbah est magnifique.',
					'Selon moi, j’estime que Tlemcen est superbe.',
					'J’estime que la Grande Mosquée de Tlemcen est un chef-d’œuvre.',
					'Personnellement, à mon avis, je crois que Timgad est belle.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'الجمع بين À mon avis و je pense que تكرار غير مستحسن.',
					'الجمع بين Selon moi و j’estime que تكرار غير مستحسن.',
					'ممتاز! استعمال فعل رأي واحد واضح ودقيق (J’estime que).',
					'جمع ثلاث عبارات رأي في جملة واحدة خطأ أسلوبي.'
				],
				explanationAr: 'نكتفي بأداة رأي واحدة في الجملة (فعل رأي أو عبارة رأي).'
			},
			{
				questionAr: 'ما وظيفة الرابط (De plus / En outre) داخل العرض الحجاجي؟',
				options: [
					'إضافة حجة جديدة لتقوية الأطروحة (L’addition / l’énumération)',
					'ختم النص نهائياً',
					'طرح سؤال استفهامي',
					'تحديد تاريخ في الماضي'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! De plus و En outre تضيفان حجة جديدة في سياق الإقناع.',
					'لختم النص نستعمل En conclusion أو C’est pourquoi.',
					'لا تستعمل للاستفهام.',
					'ليست مؤشراً زمنياً.'
				],
				explanationAr: 'الروابط (De plus, En outre, Par ailleurs) تُستعمل لإضافة حجة جديدة.'
			},
			{
				questionAr: 'اختر الترتيب السليم لروابط الترتيب الحجاجي (Connecteurs d’énumération):',
				options: [
					'Enfin — D’abord — Ensuite',
					'Tout d’abord — Ensuite — Enfin',
					'Ensuite — Enfin — D’abord',
					'En conclusion — D’abord — De plus'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'Enfin تأتي للحجة الأخيرة لا الأولى.',
					'ممتاز! Tout d’abord في البداية، ثم Ensuite في الوسط، ثم Enfin للحجة الأخيرة.',
					'يجب البدء بـ D’abord.',
					'En conclusion تأتي في الخاتمة لا قبل الحجة الأولى.'
				],
				explanationAr: 'التسلسل المنطقي للروابط هو: Tout d’abord -> Ensuite -> Enfin.'
			},
			{
				questionAr: 'ما نوع الفعل (affirmer) في الجملة: « L’auteur affirme que la Vallée du M’Zab est un modèle d’écologie. »؟',
				options: ['Verbe de mouvement', 'Verbe d’opinion / d’affirmation', 'Verbe de perception', 'Auxiliaire de temps'],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا يدل على حركة جسدية.',
					'صحيح! affirmer فعل رأي وتأكيد يقدّم الأطروحة.',
					'ليس من أفعال الحواس مثل voir / entendre.',
					'المساعدات هما avoir و être فقط.'
				],
				explanationAr: 'الأفعال (penser, croire, estimer, affirmer) هي أفعال الرأي والتأكيد.'
			},
			{
				questionAr: 'أكمل الجملة برابط الخاتمة المناسب: « La Casbah allie histoire, architecture et hospitalité ; ...... , elle mérite d’être protégée et visitée. »',
				options: ['d’abord', 'c’est pourquoi', 'par exemple', 'ensuite'],
				correctIndex: 1,
				diagnosticFeedback: [
					'd’abord للحجة الأولى.',
					'ممتاز! c’est pourquoi تربط الحجج بالنتيجة والخاتمة.',
					'par exemple لتقديم مثال.',
					'ensuite للحجة الثانية.'
				],
				explanationAr: 'تستعمل (c’est pourquoi) لإدخال النتيجة الختامية المؤكّدة للأطروحة.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 3. Proposition subordonnée complétive par « que » vs subordonnée relative
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_4am_t1_subordonnee_completive_relative',
		slug: 'fre-4am-t1-subordonnee-completive-relative',
		grade: '4am',
		yearSubjectId: 645,
		trimesterId: 't1',
		sequenceId: 'proj1',
		sequenceTitleAr: 'المشروع الأول: النص الحجاجي لتثمين الجزائر وتراثها (Argumenter pour valoriser l’Algérie — BEM)',
		order: 3,
		titleAr: 'الجملة التكميلية (Complétive par « que ») والجملة الموصولة (Relative) في BEM',
		objectives: [
			'التمييز الفوري والمضمون بين الجملة التكميلية (Proposition subordonnée complétive) والجملة الموصولة (Proposition subordonnée relative) رغم تشابه « que »',
			'تحليل الجمل المركّبة في امتحان شهادة التعليم المتوسط وتحديد وظيفة (que) بدقة'
		],
		keywordsAr: ['subordonnée complétive', 'subordonnée relative', 'conjonction que', 'pronom relatif', 'antécédent'],
		discover: {
			scenarioAr:
				'قارن جيداً بين الجملتين اللتين تحتويان كلتاهما على كلمة (que): 1) « Je pense que Constantine est magnifique. » | 2) « La ville que nous visitons est magnifique. » ما الكلمة التي تسبق (que) مباشرة في كل جملة؟',
			svg: svgFrenchGrammarMap({
				title: 'Complétive vs Relative : le test imparable du BEM (4AM)',
				rootLabel: 'Regarder le mot placé JUSTE AVANT « que » !',
				rootSub: 'Un seul coup d’œil suffit pour ne plus jamais se tromper',
				branches: [
					{
						label: 'Verbe + que = COMPLÉTIVE',
						rule: '« que » est conjonction de subordination',
						example: 'Je sais [que Timgad est antique].',
						color: '#1d4ed8'
					},
					{
						label: 'Nom + que = RELATIVE',
						rule: '« que » est pronom relatif (antécédent)',
						example: 'Le site [que j’admire] est classé.',
						color: '#047857'
					},
					{
						label: 'Test de suppression',
						rule: 'Complétive = COD essentiel | Relative = supprimable',
						example: 'Je sais quoi ? | Le site est classé.',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'في الجملة الأولى « Je pense que Constantine est magnifique »، ما نوع الكلمة التي تسبق (que) مباشرة؟',
					hintAr: 'انظر إلى كلمة (pense).',
					expectedInput: 'فعل (verbe d’opinion : pense) -> فهي subordonnée complétive',
					revealAr: 'ممتاز! عندما يسبق (que) فعلٌ (pense, crois, affirme, sais)، تكون الجملة تكميلية (Proposition subordonnée complétive) ووظيفتها مفعول به مباشر (COD) للفعل!'
				},
				{
					promptAr: 'وفي الجملة الثانية « La ville que nous visitons est magnifique »، ما نوع الكلمة التي تسبق (que) مباشرة؟',
					hintAr: 'انظر إلى كلمة (La ville).',
					expectedInput: 'اسم (nom antécédent : La ville) -> فهي subordonnée relative',
					revealAr: 'رائع! عندما يسبق (que) اسمٌ (l’antécédent)، تكون الجملة موصولة (Proposition subordonnée relative) ووظيفتها نعت / توسيع للاسم (complément de l’antécédent)!'
				},
				{
					promptAr: 'هل يمكن حذف الجملة التكميلية دون إفساد المعنى مثل الجملة الموصولة؟',
					hintAr: 'جرّب حذفها: « Je pense. » مقابل « La ville est magnifique. »',
					expectedInput: 'لا، التكميلية أساسية (غير قابلة للحذف)، أما الموصولة فيمكن حذفها ويبقى المعنى تاماً',
					revealAr: 'أحسنت! هذا هو الاختبار الثاني الذي يؤكّد إجابتك بنسبة 100% في شهادة التعليم المتوسط!'
				}
			]
		},
		summary: {
			rulesAr: [
				'الجملة الفرعية التكميلية (La proposition subordonnée complétive — PSC): تأتي مباشرة بعد فعل (خاصة أفعال الرأي والعلم والقول: penser, croire, estimer, savoir, affirmer, voir)، تربطها أداة الربط (conjonction de subordination : que)، ووظيفتها COD ولا يمكن حذفها.',
				'الجملة الفرعية الموصولة (La proposition subordonnée relative — PSR): تأتي مباشرة بعد اسم (antécédent)، يربطها ضمير وصل (pronom relatif : qui, que, où, dont)، ووظيفتها توسيع الاسم (complément de l’antécédent) ويمكن حذفها عادة.',
				'القاعدة الذهبية في BEM: (Verbe + que = Complétive) | (Nom + que / qui / où / dont = Relative).',
				'في التحليل النحوي للـ BEM نكتب الإجابة النموذجية كاملة: مثال « Je crois [que l’Algérie est un pays hospitalier] » : Proposition subordonnée complétive, COD du verbe « crois ».'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Tableau comparatif BEM : Complétive vs Relative',
				subtitle: 'À maîtriser pour l’analyse grammaticale de 4AM',
				columns: [
					{
						header: 'Mot qui précède',
						rule: 'Complétive : Verbe',
						examples: 'Relative : Nom (Antécédent)',
						color: '#1d4ed8'
					},
					{
						header: 'Nature de « que »',
						rule: 'Complétive : Conjonction',
						examples: 'Relative : Pronom relatif',
						color: '#047857'
					},
					{
						header: 'Fonction',
						rule: 'Complétive : COD du verbe',
						examples: 'Relative : Compl. de l’antécédent',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'المقارنة الحاسمة بين الجملة التكميلية والجملة الموصولة في شهادة التعليم المتوسط',
			examples: [
				{
					problemAr: 'حدّد طبيعة الجملة بين عارضتين: « Les historiens affirment [que la Kalâa des Béni Hammad date de 1007]. »',
					solutionAr: 'Proposition subordonnée complétive (précédée du verbe « affirment », fonction : COD).'
				},
				{
					problemAr: 'حدّد طبيعة الجملة بين عارضتين: « Le patrimoine [que nous protégeons] appartient à tous. »',
					solutionAr: 'Proposition subordonnée relative (précédée du nom antécédent « Le patrimoine », fonction : complément de l’antécédent).'
				}
			],
			watchOutAr:
				'انتبه لأسئلة التحويل في BEM: أحياناً يطلبون منك تعويض جملة تكميلية باسم (Nominalisation) مثل: « Je souhaite qu’il réussisse » -> « Je souhaite sa réussite »، أو التمييز بين « que » التكميلية و « que » الموصولة في جملتين من النص!'
		},
		practice: [
			{
				questionAr: 'ما طبيعة الجملة المسطّرة: « Nous sommes convaincus que le Tassili n’Ajjer est un trésor universel. »؟',
				options: [
					'Proposition subordonnée relative',
					'Proposition subordonnée complétive',
					'Proposition subordonnée de cause',
					'Proposition subordonnée de but'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا يوجد اسم (antécédent) قبل que بل عبارة فعلية للرأي (sommes convaincus).',
					'ممتاز! الجملة تكمّل تعبير الرأي (sommes convaincus que) فهي complétive.',
					'que هنا لا تفيد السبب.',
					'لا يوجد معنى الهدف.'
				],
				explanationAr: 'بعد فعل أو تعبير رأي (être convaincu que) تأتي جملة فرعية تكميلية (subordonnée complétive).'
			},
			{
				questionAr: 'ما طبيعة الجملة الفرعية في: « Les ponts que les touristes photographient à Constantine sont spectaculaires. »؟',
				options: [
					'Proposition subordonnée complétive',
					'Proposition subordonnée relative',
					'Proposition subordonnée de conséquence',
					'Proposition indépendante'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'قبل que يوجد اسم (Les ponts) وليس فعلاً.',
					'أحسنت! que يسبقه الاسم (Les ponts) فهو ضمير وصل والجملة subordonnée relative.',
					'ليست جملة نتيجة.',
					'ليست جملة مستقلة لأنها تبدأ بضمير وصل.'
				],
				explanationAr: 'الاسم (Les ponts) هو الـ antécédent قبل que، لذا فهي proposition subordonnée relative.'
			},
			{
				questionAr: 'ما الطبيعة النحوية لكلمة (que) في الجملة: « Les guides expliquent que la Casbah abrite des mosquées anciennes. »؟',
				options: [
					'Pronom relatif',
					'Conjonction de subordination',
					'Adjectif démonstratif',
					'Préposition de lieu'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'تكون ضمير وصل فقط بعد اسم (antécédent).',
					'ممتاز! بعد الفعل (expliquent) تكون que أداة ربط (conjonction de subordination).',
					'ليست اسم إشارة.',
					'ليست حرف جر للمكان.'
				],
				explanationAr: 'في الجملة التكميلية (بعد فعل)، تكون que أداة ربط (conjonction de subordination).'
			},
			{
				questionAr: 'ما وظيفة الجملة الفرعية (qu’elle possède un riche passé) في الجملة: « Je sais qu’elle possède un riche passé. »؟',
				options: [
					'Complément d’objet direct (COD) du verbe « sais »',
					'Complément de l’antécédent',
					'Complément circonstanciel de temps',
					'Sujet du verbe'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! Je sais quoi ? -> qu’elle possède un riche passé (COD).',
					'لا يوجد اسم antécédent قبل qu’.',
					'لا تدل على الزمان.',
					'الفاعل هو الضمير Je.'
				],
				explanationAr: 'وظيفة الجملة الفرعية التكميلية بعد الفعل المتعدي هي COD.'
			},
			{
				questionAr: 'أيّ جملة تحتوي على جملة موصولة (PSR) وليس تكميلية (PSC)؟',
				options: [
					'L’auteur affirme que Ghardaïa est unique.',
					'Je crois que ce monument date de 1082.',
					'La mosquée que nous avons admirée date de 1082.',
					'Les élèves savent que l’Algérie est vaste.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'affirme فعل -> جملة تكميلية.',
					'crois فعل -> جملة تكميلية.',
					'ممتاز! La mosquée اسم (antécédent) قبل que -> جملة موصولة (PSR).',
					'savent فعل -> جملة تكميلية.'
				],
				explanationAr: 'فقط الجملة الثالثة يسبق فيها اسمٌ (La mosquée) الضمير (que).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 4. Le présent de l’indicatif et la modalisation méliorative
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_4am_t1_present_modalisation',
		slug: 'fre-4am-t1-present-modalisation',
		grade: '4am',
		yearSubjectId: 645,
		trimesterId: 't1',
		sequenceId: 'proj1',
		sequenceTitleAr: 'المشروع الأول: النص الحجاجي لتثمين الجزائر وتراثها (Argumenter pour valoriser l’Algérie — BEM)',
		order: 4,
		titleAr: 'المضارع الإخباري والذاتية التثمينية (Le présent de l’indicatif et la modalisation méliorative)',
		objectives: [
			'تصريف أفعال الأفواج الثلاثة في المضارع الإخباري (Présent de l’indicatif) وتحديد قيمته (vérité générale / énonciation)',
			'توظيف أدوات الذاتية التثمينية (La modalisation / subjectivité méliorative) لإقناع القارئ في نصوص BEM'
		],
		keywordsAr: ['présent de l’indicatif', 'vérité générale', 'modalisation', 'subjectivité', 'mélioratif'],
		discover: {
			scenarioAr:
				'تأمل هذه الجملة الحجاجية: « Sans aucun doute, l’Algérie offre aux visiteurs des paysages vraiment époustouflants qui témoignent d’une histoire millénaire. » لماذا استعمل الكاتب زمن الحاضر، وما الكلمات التي تكشف إعجابه الشخصي (sa subjectivité)؟',
			svg: svgFrenchTenseTimeline({
				title: 'Le Présent de l’indicatif dans le texte argumentatif',
				tenseName: 'Présent d’énonciation & de vérité générale',
				formula: '1er gr. (-e,-es,-e,-ons,-ez,-ent) | 2e gr. (-is,-is,-it,-issons...) | 3e gr. (-s,-s,-t / -x,-x,-t)',
				activeZone: 'present',
				example: 'La Vallée du M’Zab séduit les visiteurs et reflète un savoir-faire durable.',
				markers: 'toujours, aujourd’hui, chaque année, sans aucun doute'
			}),
			steps: [
				{
					promptAr: 'ما القيمة الدلالية للحاضر في الجملة: « Le Sahara algérien représente une richesse naturelle inestimable. »؟',
					hintAr: 'هل هي حقيقة لحظية أم حقيقة دائمة وثابتة؟',
					expectedInput: 'حاضر الحقيقة العامة (Présent de vérité générale)',
					revealAr: 'ممتاز! في النص الحجاجي يغلب الحاضر الدال على الحقيقة الدائمة (vérité générale) أو حاضر التعبير عن الرأي (énonciation).'
				},
				{
					promptAr: 'ما الكلمات التي تدلّ على الذاتية التثمينية (La modalisation méliorative) في الجملة الأولى أعلاه؟',
					hintAr: 'عبارة التأكيد + الظرف + الصفة القوية.',
					expectedInput: 'Sans aucun doute / vraiment / époustouflants / millénaire',
					revealAr: 'هذه العلامات تسمى (les modalisateurs) وتظهر موقف الكاتب الذاتي المؤيّد (subjectivité positive / méliorative).'
				},
				{
					promptAr: 'صرّف الأفعال الشائعة في BEM مع الضمير (nous) و (ils) في الحاضر: (offrir / choisir / pouvoir).',
					hintAr: 'offrir مثل الفوج الأول في الحاضر، و choisir من الفوج الثاني (-iss-)، و pouvoir شاذ.',
					expectedInput: 'nous offrons / ils offrent | nous choisissons / ils choisissent | nous pouvons / ils peuvent',
					revealAr: 'انتبه جيداً لأفعال الفوج الثالث مثل offrir, ouvrir, découvrir التي تأخذ نهايات الفوج الأول (-e, -es, -e) في الحاضر!'
				}
			]
		},
		summary: {
			rulesAr: [
				'المضارع الإخباري (Le présent de l’indicatif) هو الزمن الأساسي في النص الحجاجي، وله قيمتان رئيسيتان في BEM: 1) présent d’énonciation (زمن إبداء الرأي: Je pense que...), 2) présent de vérité générale (حقائق عامة ودائمة عن التراث والطبيعة).',
				'تذكير مهم بتصريف الفوج الثالث في الحاضر: découvrir / offrir / accueillir تأخذ نهايات الفوج الأول (il découvre, elle offre, ils accueillent). أمّا pouvoir / vouloir (je peux, il peut, ils peuvent) و prendre (il prend, ils prennent) و devoir (il doit, ils doivent).',
				'الذاتية التثمينية (La modalisation méliorative): تشمل ضمائر المتكلم (je, nous, notre)، أفعال الرأي، ظروف التأكيد والشدة (vraiment, certainement, incontestablement, sans aucun doute)، والصفات/الأسماء التثمينية (splendide, joyau, incomparable, fascinant).',
				'سؤال متكرّر في BEM: « L’auteur est-il présent dans son texte ? Justifiez. » -> Oui, l’auteur marque sa présence (subjectivité) par l’emploi du pronom « je / nous », d’un verbe d’opinion et d’un vocabulaire mélioratif.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Verbes pièges du 3e groupe au Présent (BEM)',
				subtitle: 'Très fréquents dans les textes sur le patrimoine algérien',
				columns: [
					{
						header: 'découvrir / offrir',
						rule: 'Terminaisons en -e, -es, -e',
						examples: 'il découvre / elle offre / ils accueillent',
						color: '#1d4ed8'
					},
					{
						header: 'devoir / pouvoir',
						rule: 'Changement de radical',
						examples: 'il doit, ils doivent | il peut, ils peuvent',
						color: '#047857'
					},
					{
						header: 'prendre / construire',
						rule: '2 consonnes au pluriel / -s-',
						examples: 'ils prennent / ils construisent',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'تصريف أفعال الفوج الثالث الأكثر وروداً في فروض واختبارات السنة الرابعة متوسط',
			examples: [
				{
					problemAr: 'صرّف في الحاضر: « Les visiteurs (découvrir) ............ la Casbah et (prendre) ............ des photos mémorables. »',
					solutionAr: 'découvrent / prennent.'
				},
				{
					problemAr: 'استخرج علامتين على حضور الكاتب (subjectivité) في: « Je suis persuadé que ce site est exceptionnel. »',
					solutionAr: '1) Le pronom personnel « Je » + verbe d’opinion « suis persuadé » | 2) L’adjectif mélioratif « exceptionnel ».'
				}
			],
			watchOutAr:
				'لا تكتب أبداً « il découvra / il découvrît » ولا « il offrit » عندما يُطلب منك الحاضر (Présent)! الصواب في الحاضر: il découvre، elle offre، il accueille (بدون t في الآخر)!'
		},
		practice: [
			{
				questionAr: 'اختر التصريف الصحيح في الحاضر (Présent): « La ville de Tlemcen ...... aux touristes un patrimoine unique et ...... de nombreux chercheurs. »',
				options: ['offrit / accueillit', 'offre / accueille', 'offret / accueillet', 'offrent / accueillent'],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه صيغ الماضي البسيط وليس الحاضر.',
					'ممتاز! offrir و accueillir يأخذان النهاية (-e) مع الفاعل المفرد في الحاضر.',
					'لا نضيف حرف t في آخر offre و accueille.',
					'الفاعل (La ville de Tlemcen) مفرد وليس جمعاً.'
				],
				explanationAr: 'أفعال offrir و accueillir و découvrir تُصرّف مثل الفوج الأول في الحاضر: elle offre, elle accueille.'
			},
			{
				questionAr: 'صرّف الفعلين في الحاضر: « Les voyageurs (devoir) ...... visiter Ghardaïa car ils (pouvoir) ...... y admirer une architecture durable. »',
				options: ['doivent / peuvent', 'doit / peut', 'devons / pouvons', 'doivent / pouvent'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! ils doivent و ils peuvent هما الصيغتان الصحيحتان.',
					'الفاعل جمع (Les voyageurs / ils).',
					'هذه صيغة الضمير nous.',
					'pouvoir مع ils هو peuvent وليس pouvent.'
				],
				explanationAr: 'في الحاضر مع ils: devoir -> doivent، و pouvoir -> peuvent.'
			},
			{
				questionAr: 'ما القيمة الزمنية للحاضر في الجملة: « Timgad se situe dans la wilaya de Batna et témoigne de l’histoire antique. »؟',
				options: ['Présent de vérité générale / description permanente', 'Futur proche', 'Passé récent', 'Conditionnel'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! يعبر عن حقيقة جغرافية وتاريخية دائمة.',
					'لا يشير إلى مستقبل قريب.',
					'لا يشير إلى ماضٍ قريب.',
					'ليس صيغة شرط.'
				],
				explanationAr: 'الحقائق الجغرافية والتاريخية الثابتة تُعبّر عنها بـ Présent de vérité générale.'
			},
			{
				questionAr: 'أيّ مؤشّر يُثبت حضور ذاتية الكاتب (La subjectivité / modalisation) في نص حجاجي؟',
				options: [
					'L’adverbe de certitude « incontestablement » et l’adjectif « magnifique »',
					'La date de publication en bas de page',
					'Le numéro du paragraphe',
					'Le point final de la phrase'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! ظروف التأكيد والصفات التثمينية من أبرز علامات الذاتية (modalisation).',
					'تاريخ النشر معطى خارجي محايد.',
					'رقم الفقرة عنصر تنظيمي فقط.',
					'النقطة علامة ترقيم عادية.'
				],
				explanationAr: 'الظروف المقيّمة (incontestablement, vraiment) والصفات التثمينية (magnifique) تثبت ذاتية الكاتب.'
			},
			{
				questionAr: 'اختر التصريف الصحيح في الحاضر مع (nous): « Nous (choisir) ...... de découvrir le Tassili et nous (prendre) ...... soin de sa nature. »',
				options: ['choisons / prendons', 'choisissons / prenons', 'choisissons / prennent', 'choisissent / prenons'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الفوج الثاني يأخذ -issons (choisissons)، و prendre يأخذ prenons بدون d.',
					'ممتاز! nous choisissons و nous prenons صحيحان تماماً.',
					'prennent خاصة بالضمير ils.',
					'choisissent خاصة بالضمير ils.'
				],
				explanationAr: 'في الحاضر مع nous: choisir (فوج 2) -> choisissons، و prendre -> prenons.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 5. Rédiger un texte argumentatif pour valoriser une région algérienne (BEM)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_4am_t1_rediger_argumentatif_region',
		slug: 'fre-4am-t1-rediger-argumentatif-region',
		grade: '4am',
		yearSubjectId: 645,
		trimesterId: 't1',
		sequenceId: 'proj1',
		sequenceTitleAr: 'المشروع الأول: النص الحجاجي لتثمين الجزائر وتراثها (Argumenter pour valoriser l’Algérie — BEM)',
		order: 5,
		titleAr: 'منهجية كتابة نص حجاجي للترويج لجهة جزائرية في BEM (Rédiger un texte argumentatif)',
		objectives: [
			'بناء نص حجاجي متكامل (10 إلى 14 سطراً) لإقناع القارئ بزيارة منطقة جزائرية (القصبة، تلمسان، قسنطينة، غرداية، الطاسيلي)',
			'توظيف المخطط الرسمي للـ BEM (مقدمة بأطروحة + 3 حجج وأمثلة بروابط ترتيب + خاتمة تحفيزية) لحصد 7/7'
		],
		keywordsAr: ['production écrite BEM', 'texte argumentatif', 'valoriser l’Algérie', 'thèse', 'arguments'],
		discover: {
			scenarioAr:
				'في موضوع BEM التجريبي، طُلب منك كتابة نص حجاجي من 12 سطراً لإقناع سياح أو متابعين لمدونة مدرسية بزيارة مدينة جزائرية (مثل قسنطينة أو تلمسان أو غرداية). كيف توزّع الفقرات وتضمن علامة 7/7؟',
			svg: svgFrenchWritingBlueprint({
				title: 'Plan 7/7 du texte argumentatif touristique (BEM)',
				steps: [
					{ stage: 'Titre accrocheur', detail: 'Ex. : Constantine, la perle des ponts suspendus' },
					{ stage: 'Introduction (2-3 lig.)', detail: 'Situer la région + exprimer clairement sa THÈSE (Je pense que...).' },
					{ stage: 'Développement (6-8 lig.)', detail: 'D’abord (patrimoine + ex.), Ensuite (nature + ex.), Enfin (hospitalité).' },
					{ stage: 'Conclusion (2 lig.)', detail: 'C’est pourquoi / En conclusion, venez découvrir ce joyau algérien !' }
				]
			}),
			steps: [
				{
					promptAr: 'كم فقرة مرئية (paragraphes) يجب أن تظهر بوضوح في ورقة الإجابة يوم الـ BEM؟',
					hintAr: 'مقدمة + عرض + خاتمة (بترك فراغ أو سطر فاصل).',
					expectedInput: 'ثلاث فقرات واضحة (مقدمة بأطروحة، عرض بالحجج والأمثلة، خاتمة تحفيزية) مع عنوان مناسب',
					revealAr: 'ممتاز! الشكل المرئي المنظّم (Titre + 3 paragraphes distincts avec alinéas) يمنح المصحّح انطباعاً ممتازاً من النظرة الأولى.'
				},
				{
					promptAr: 'ما العناصر اللغوية الأربعة التي ينتظرها المصحّح في وضعية المشروع الأول 4AM؟',
					hintAr: 'تذكّر دروس هذا الفصل الأربعة!',
					expectedInput: 'فعل رأي + روابط ترتيب (D’abord, Ensuite, Enfin) + جملة تكميلية أو موصولة + معجم تثميني وحاضر إخباري',
					revealAr: 'أحسنت! توظيف هذه الموارد الأربع بوعي يضمن لك النقطة الكاملة في معيار اللغة والتماسك.'
				},
				{
					promptAr: 'اذكر مثالين دقيقين يمكنك الاستشهاد بهما عند الترويج لوادي ميزاب (غرداية) أو الطاسيلي ناجر.',
					hintAr: 'استعمل (comme / notamment).',
					expectedInput: 'غرداية : les cinq ksour classés par l’UNESCO | الطاسيلي : les gravures rupestres millénaires',
					revealAr: 'الأمثلة الجزائرية الدقيقة والصحيحة تقوّي حججك وتبرز ثقافتك الوطنية.'
				}
			]
		},
		summary: {
			rulesAr: [
				'توزيع علامة الإنتاج الكتابي في شهادة التعليم المتوسط (7 نقاط): الملاءمة واحترام الموضوع والنمط الحجاجي (2 ن) + التماسك وروابط الترتيب والفقرات (2 ن) + سلامة اللغة والتصريف والإملاء (2 ن) + الإتقان والأصالة والعرض (1 ن).',
				'قوالب افتتاحية مضمونة للـ BEM: « Située à l’ouest/est/sud de l’Algérie, [Ville] est sans aucun doute une destination exceptionnelle qui mérite d’être découverte. »',
				'قالب الحجج الثلاث المتنوعة: 1) حجة تاريخية/معمارية (D’abord, son patrimoine historique fascine..., comme...), 2) حجة طبيعية/جمالية (Ensuite, ses paysages remarquables offrent..., notamment...), 3) حجة إنسانية/ثقافية (Enfin, l’hospitalité chaleureuse et l’artisanat authentique...).',
				'قالب الخاتمة التحفيزية: « En conclusion, je suis convaincu que [Ville] est un véritable joyau national. N’hésitez donc pas à la visiter et à préserver sa beauté ! »'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Banque d’arguments prêts pour le BEM (Algérie)',
				rootLabel: '3 axes d’arguments valables pour toute région algérienne',
				rootSub: 'Associer chaque argument à 1 exemple concret',
				branches: [
					{
						label: 'Axe 1 : Histoire',
						rule: 'Monuments et savants',
						example: 'Casbah, Grande Mosquée, Timgad',
						color: '#1d4ed8'
					},
					{
						label: 'Axe 2 : Nature',
						rule: 'Mer, montagnes, Sahara',
						example: 'Djurdjura, Rhumel, Tassili n’Ajjer',
						color: '#047857'
					},
					{
						label: 'Axe 3 : Culture',
						rule: 'Artisanat et hospitalité',
						example: 'Tapis, poterie, accueil chaleureux',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'المحاور الثلاثة المضمونة لبناء ثلاث حجج مقنعة عن أي منطقة جزائرية في BEM',
			examples: [
				{
					problemAr: 'اكتب مقدمة حجاجية قصيرة (جملتان) عن القصبة بالجزائر العاصمة.',
					solutionAr: 'Classée au patrimoine mondial de l’UNESCO en 1992, la Casbah d’Alger est l’âme historique de notre capitale. Je suis convaincu que cette citadelle authentique mérite la visite de tous les voyageurs.'
				},
				{
					problemAr: 'اكتب حجة مدعّمة بمثال عن ولاية تلمسان.',
					solutionAr: 'D’abord, Tlemcen brille par son héritage architectural islamique, comme la Grande Mosquée construite en 1082 et les vestiges de Mansourah.'
				}
			],
			watchOutAr:
				'في الـ BEM، لا تخرج عن النمط الحجاجي لتكتب قصة شخصية (« L’été dernier, je suis allé à la plage... »)! حافظ على الحاضر الإخباري، الأطروحة الواضحة، الحجج الثلاث المرتّبة، والأمثلة الملموسة!'
		},
		practice: [
			{
				questionAr: 'ما الزمن الرئيسي الذي يُكتب به النص الحجاجي للترويج لمنطقة جزائرية في BEM؟',
				options: ['Le passé simple', 'Le présent de l’indicatif', 'Le plus-que-parfait', 'Le passé antérieur'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الماضي البسيط يخص السرد التاريخي وليس النص الحجاجي السياحي.',
					'ممتاز! الحاضر الإخباري هو الزمن الأساسي في النص الحجاجي.',
					'الـ plus-que-parfait يعبّر عن الأسبقية في الماضي.',
					'زمن أدبي قديم غير مطلوب في النص الحجاجي.'
				],
				explanationAr: 'يُحرّر النص الحجاجي بزمن الحاضر الإخباري (Présent de l’indicatif).'
			},
			{
				questionAr: 'ما الخطأ المنهجي الذي يفقد التلميذ نقاط الملاءمة (Pertinence) في وضعية المشروع الأول 4AM؟',
				options: [
					'توظيف روابط D’abord و Ensuite و Enfin',
					'كتابة قصة عطلة صيفية شخصية بدل تقديم أطروحة وحجج مقنعة',
					'إدراج أمثلة ملموسة عن معالم جزائرية',
					'كتابة عنوان وثلاث فقرات منظمة'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'روابط الترتيب مطلوبة وتزيد العلامة.',
					'صحيح! تحويل النص الحجاجي إلى سرد عطلة شخصية خروج عن النمط المطلوب.',
					'الأمثلة الملموسة تقوّي الحجج.',
					'التنظيم الفقري يعزّز العلامة.'
				],
				explanationAr: 'يجب الالتزام بالبنية الحجاجية (أطروحة + حجج + أمثلة + خاتمة) لا السرد الشخصي.'
			},
			{
				questionAr: 'أيّ خاتمة أنسب لنص حجاجي يدعو لاكتشاف الطاسيلي ناجر (Le Tassili n’Ajjer)؟',
				options: [
					'Hier, j’ai pris le bus vers le sud.',
					'En conclusion, le Tassili n’Ajjer est un joyau unique au monde ; venez découvrir ce musée naturel et protégez-le !',
					'D’abord, il fait chaud au désert.',
					'Il y avait une fois un voyageur.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه جملة سردية شخصية.',
					'ممتاز! رابط خاتمة + تأكيد الأطروحة + دعوة صريحة للزيارة والحماية.',
					'D’abord للحجة الأولى لا للخاتمة.',
					'هذه بداية حكاية خيالية.'
				],
				explanationAr: 'الخاتمة الحجاجية تؤكد الأطروحة وتختم بدعوة واضحة للقارئ.'
			},
			{
				questionAr: 'كم عدد العلامات المخصّص للوضعية الإدماجية (Production écrite) في امتحان شهادة التعليم المتوسط (BEM) للغة الفرنسية؟',
				options: ['3 نقاط من 10', '7 نقاط من 20', '10 نقاط من 20', '4 نقاط من 20'],
				correctIndex: 1,
				diagnosticFeedback: [
					'ذاك تنقيط الابتدائي (3AP–5AP).',
					'ممتاز! في BEM: فهم المكتوب وقواعد اللغة (13 نقطة) + الإنتاج الكتابي (7 نقاط) = 20 نقطة.',
					'الإنتاج الكتابي بـ 7 نقاط وليس 10.',
					'لا، الإنتاج الكتابي يمثّل 7 نقاط كاملة.'
				],
				explanationAr: 'التنقيط الرسمي لـ BEM الفرنسية: 7 (فهم) + 6 (قواعد لغة) + 7 (إنتاج كتابي) = 20.'
			},
			{
				questionAr: 'أيّ جملة تجمع بين فعل رأي وجملة تكميلية ومعجم تثميني لتكون أطروحة BEM نموذجية؟',
				options: [
					'Je pense que la Vallée du M’Zab est une merveille architecturale incomparable.',
					'Ghardaïa a cinq villages.',
					'Nous avons mangé des dattes.',
					'Il pleut parfois en hiver.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! Je pense (فعل رأي) + que la Vallée... (تكميلية) + merveille incomparable (معجم تثميني).',
					'جملة إخبارية محايدة بلا رأي أو تثمين.',
					'خارج موضوع الأطروحة.',
					'جملة عادية غير حجاجية.'
				],
				explanationAr: 'الجملة الأولى تمثّل أطروحة BEM متكاملة تجمع بين الرأي والتركيب التكميلي والتثمين.'
			}
		]
	}
];
