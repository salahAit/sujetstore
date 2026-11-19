import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchWritingBlueprint
} from '../../svg-french';

// ============================================================================
// 5 Interactive Lessons — 1AS TCL Trimester 2
// Projet 2 : La lettre ouverte argumentée et l'entretien / interview
// ============================================================================

export const LESSONS_1AS_TCL_T2: FrenchInteractiveLessonData[] = [
	// 1. L'argumentation (thèse, arguments, exemples, connecteurs logiques)
	{
		id: 'fre_lesson_1as_tcl_t2_argumentation_connecteurs',
		slug: 'fre-1as-tcl-t2-argumentation-connecteurs',
		grade: '1as_tcl',
		yearSubjectId: 665,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع 2: الرسالة المفتوحة الحجاجية والمقابلة (La lettre ouverte et l’entretien)',
		order: 1,
		titleAr: 'بنية الحجاج: الأطروحة، الحجج، الأمثلة والروابط المنطقية (L’argumentation et les connecteurs)',
		objectives: [
			'تحديد عناصر النص الحجاجي بدقة: الموضوع (thème)، الأطروحة/الموقف (thèse)، الحجج (arguments)، والأمثلة (exemples)',
			'تنظيم الحجج وترتيبها باستخدام الروابط المنطقية (التعداد، الإضافة، التوضيح، السبب، النتيجة، والاستنتاج)',
			'التمييز بين الإقناع العقلي (convaincre par la raison) والتأثير الوجداني (persuader par l’émotion)'
		],
		keywordsAr: [
			'Argumentation',
			'Thèse',
			'Arguments',
			'Exemples',
			'Connecteurs logiques'
		],
		discover: {
			scenarioAr:
				'اقرأ هذه الفقرة الحجاجية حول أهمية المطالعة في الثانوية: « La lecture régulière demeure indispensable à la formation intellectuelle des lycéens. D’abord, elle enrichit le vocabulaire et perfectionne l’expression écrite ; en effet, un élève qui lit un livre par mois rédige avec plus d’aisance. En outre, elle développe l’esprit d’analyse et la culture générale, comme le prouve le parcours des grands historiens algériens tels qu’Abou El-Kacem Saadallah. Par conséquent, encourager les bibliothèques scolaires est une priorité éducative. »',
			svg: svgFrenchWritingBlueprint({
				title: 'Architecture d’un paragraphe argumentatif',
				steps: [
					{
						stage: '1. Thèse (Avis)',
						detail: 'Position claire défendue par l’auteur sur un thème précis.'
					},
					{
						stage: '2. Argument 1 + Ex.',
						detail: 'D’abord + raison logique + en effet / par exemple.'
					},
					{
						stage: '3. Argument 2 + Ex.',
						detail: 'En outre / De plus + argument plus fort + illustration.'
					},
					{
						stage: '4. Conclusion',
						detail: 'Par conséquent / Ainsi : confirmation ferme de la thèse.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما موضوع الفقرة (le thème) وما أطروحة الكاتب (la thèse)؟',
					hintAr: 'الموضوع هو الفكرة العامة، والأطروحة هي الرأي الذي يدافع عنه الكاتب في الجملة الأولى.',
					expectedInput: 'الموضوع: المطالعة (La lecture) — الأطروحة: المطالعة المنتظمة ضرورية للتكوين الفكري للتلاميذ',
					revealAr: 'الموضوع هو المطالعة (la lecture)، والأطروحة هي: « La lecture régulière demeure indispensable à la formation intellectuelle des lycéens. »'
				},
				{
					promptAr: 'استخرج الحجتين (les deux arguments) والرابطين اللذين قدّماهما.',
					hintAr: 'انظر إلى « D’abord » وإلى « En outre ».',
					expectedInput: '1) D’abord, elle enrichit le vocabulaire... — 2) En outre, elle développe l’esprit d’analyse...',
					revealAr: 'الحجة الأولى قدّمها « D’abord » (إثراء الرصيد اللغوي وتحسين التعبير)، والثانية قدّمها « En outre » (تنمية روح التحليل والثقافة العامة).'
				},
				{
					promptAr: 'ما وظيفة ذكر المؤرخ الجزائري « Abou El-Kacem Saadallah » بعد « comme le prouve »؟',
					hintAr: 'هل هو حجة جديدة أم مثال ثقافي يدعم الحجة الثانية؟',
					expectedInput: 'مثال داعم للحجة الثانية (un exemple argumentatif)',
					revealAr: 'المثال الملموس أو التاريخي (un exemple) يرسّخ الحجة في ذهن القارئ ويجعلها أكثر إقناعا.'
				}
			]
		},
		summary: {
			rulesAr: [
				'التمييز الأساسي: الموضوع (Thème) يجيب عن « De quoi parle le texte ? »، والأطروحة (Thèse) تجيب عن « Que défend l’auteur ? »، والحجج (Arguments) تجيب عن « Pourquoi ? »، والأمثلة (Exemples) تجسّد الحجج بوقائع ملموسة.',
				'تصنيف الروابط المنطقية (Les connecteurs logiques):',
				'- الترتيب والتعداد (Énumération): D’abord, Tout d’abord, Ensuite, Enfin. | الإضافة (Addition): De plus, En outre, Par ailleurs, Aussi.',
				'- التعليل والتوضيح (Explication / Cause): En effet, Car, Parce que, Puisque. | التمثيل (Illustration): Par exemple, Ainsi, Notamment, Comme le montre.',
				'- النتيجة والاستنتاج (Conséquence / Conclusion): Donc, Par conséquent, C’est pourquoi, En conclusion, Ainsi.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Carte des connecteurs logiques argumentatifs',
				rootLabel: 'Articuler la pensée avec rigueur',
				branches: [
					{
						label: 'Classer / Ajouter',
						rule: 'D’abord, Ensuite, De plus',
						example: 'En outre, elle forme l’esprit.'
					},
					{
						label: 'Justifier / Illustrer',
						rule: 'Car, En effet, Notamment',
						example: 'En effet, le livre instruit.'
					},
					{
						label: 'Conclure',
						rule: 'Donc, Par conséquent, Ainsi',
						example: 'Ainsi, lire reste essentiel.'
					}
				]
			}),
			visualCaptionAr: 'الروابط المنطقية الأساسية لتماسك النص الحجاجي في شعبة الآداب',
			examples: [
				{
					problemAr: 'حدّد الدور الحجاجي لكل عبارة: « La préservation des monuments historiques est un devoir (1) car ils témoignent de notre mémoire collective (2), comme la Casbah d’Alger (3). »',
					solutionAr: '(1) Thèse (أطروحة) — (2) Argument (حجة مسبوقة بـ car) — (3) Exemple (مثال مسبوق بـ comme).'
				},
				{
					problemAr: 'اربط بين الحجتين برابط إضافة مناسب: « L’entretien avec un artisan transmet un savoir-faire ancien. Il encourage les jeunes à respecter le travail manuel. »',
					solutionAr: 'D’une part, l’entretien avec un artisan transmet un savoir-faire ancien ; d’autre part (ou En outre), il encourage les jeunes à respecter le travail manuel.'
				}
			],
			watchOutAr:
				'احذر من الخلط بين « En effet » (يُستعمل لتأكيد وشرح فكرة سابقة: « فعلا / إذ أن ») و« Par conséquent » (يُستعمل للنتيجة: « وبالتالي »)!'
		},
		practice: [
			{
				questionAr: 'في النص الحجاجي، ما المقصود بالأطروحة (la thèse)؟',
				options: [
					'عنوان الكتاب فقط',
					'الرأي أو الموقف الذي يدافع عنه الكاتب ويسعى لإقناع القارئ به',
					'قائمة الأمثلة الواردة في الهامش',
					'اسم الشخصية الثانوية في قصة'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'العنوان يقدّم الموضوع غالبا لا الأطروحة الكاملة.',
					'أحسنت! الأطروحة هي الموقف المركزي الذي يبرهن عليه الكاتب.',
					'الأمثلة تدعم الحجج وليست هي الأطروحة.',
					'هذا يخص السرد لا الحجاج.'
				],
				explanationAr: 'الأطروحة (la thèse) هي الفكرة الأساسية التي يتبناها الكاتب ويدافع عنها بحجج.'
			},
			{
				questionAr: 'ما وظيفة الرابط « En outre » في الفقرة الحجاجية؟',
				options: ['L’opposition', 'L’addition (إضافة حجة جديدة)', 'La conclusion finale', 'Le temps passé'],
				correctIndex: 1,
				diagnosticFeedback: [
					'« En outre » لا يدل على التعارض بل على الإضافة.',
					'ممتاز! « En outre » (فضلا عن ذلك / علاوة على ذلك) يضيف حجة جديدة تدعم نفس الأطروحة.',
					'لا يختم النص بل يوسّع الحجاج.',
					'ليس مؤشرا زمنيا.'
				],
				explanationAr: '« De plus, En outre, Par ailleurs » روابط إضافة لتعزيز الأطروحة.'
			},
			{
				questionAr: 'أكمل بالرابط الأنسب لتوضيح الحجة: « Les bibliothèques scolaires sont utiles ; .......... , elles offrent aux élèves un espace calme pour étudier. »',
				options: ['en effet', 'pourtant', 'enfin', 'malgré'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! « en effet » (في الواقع / ذلك أن) يشرح ويؤكد الفكرة المذكورة قبل الفاصلة المنقوطة.',
					'« pourtant » للتعارض، والجملتان متوافقتان تماما.',
					'« enfin » للترتيب الختامي لا للتعليل.',
					'« malgré » للتعارض ويتبعه اسم.'
				],
				explanationAr: 'نستعمل « en effet » لتأكيد وتبرير جملة سابقة.'
			},
			{
				questionAr: 'أي جملة تمثل مثالا (exemple) لا أطروحة (thèse)؟',
				options: [
					'Il est essentiel de valoriser notre patrimoine architectural.',
					'Ainsi, la restauration de la Grande Mosquée de Tlemcen a permis de sauvegarder des décors séculaires.',
					'La culture nationale mérite l’attention de tous les citoyens.',
					'Nous devons protéger les monuments anciens.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه أطروحة عامة.',
					'أحسنت! ذكر حالة محددة ملموسة (ترميم الجامع الكبير بتلمسان) بعد « Ainsi » يمثل مثالا داعما.',
					'هذه أطروحة عامة.',
					'هذه أطروحة عامة.'
				],
				explanationAr: 'المثال يستشهد بحالة واقعية أو شخصية أو معلم محدد لتجسيد الحجة.'
			},
			{
				questionAr: 'ما الفرق بين « convaincre » و« persuader »؟',
				options: [
					'convaincre يعتمد على العقل والحجج المنطقية، وpersuader يخاطب العاطفة والمشاعر',
					'لا يوجد أي فرق بينهما في التحليل الأدبي',
					'convaincre خاص بالشعر فقط',
					'persuader يُستعمل في الرياضيات فقط'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة دقيقة! الإقناع العقلي (convaincre) يستند إلى البراهين، والاستمالة (persuader) تلامس المشاعر والقيم.',
					'في الحجاج الأدبي يُميَّز بوضوح بين المسارين.',
					'غير صحيح.',
					'غير صحيح.'
				],
				explanationAr: 'يجمع الحجاج البليغ بين الإقناع العقلي (convaincre) والتأثير الوجداني (persuader).'
			}
		]
	},

	// 2. L'expression de l'opposition et de la concession (mais, cependant, bien que + subjonctif)
	{
		id: 'fre_lesson_1as_tcl_t2_opposition_concession',
		slug: 'fre-1as-tcl-t2-opposition-concession',
		grade: '1as_tcl',
		yearSubjectId: 665,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع 2: الرسالة المفتوحة الحجاجية والمقابلة (La lettre ouverte et l’entretien)',
		order: 2,
		titleAr: 'التعبير عن التعارض والاستدراك (L’opposition et la concession : mais, cependant, bien que + subjonctif)',
		objectives: [
			'التمييز بين التعارض البسيط (l’opposition) والاستدراك/التنازل الحجاجي (la concession)',
			'استعمال أدوات التعارض والاستدراك بدقة في الجملة البسيطة (malgré + nom) والمركبة (mais, cependant, pourtant, tandis que, bien que / quoique + subjonctif)',
			'تصريف الأفعال بشكل سليم في صيغة المنصوب (subjonctif présent) بعد « bien que » و« quoique »'
		],
		keywordsAr: [
			'Opposition',
			'Concession',
			'Bien que',
			'Quoique',
			'Malgré',
			'Subjonctif présent'
		],
		discover: {
			scenarioAr:
				'في رسالة مفتوحة حول حماية الكتاب الورقي، كتب التلميذ: « Les écrans numériques offrent un accès rapide à l’information, mais ils fatiguent vite les yeux. Bien que les téléphones soient présents partout, le livre imprimé reste le meilleur compagnon pour la concentration. Malgré la concurrence numérique, les bibliothèques conservent un rôle essentiel. » لاحظ كيف يوازن الكاتب بين فكرتين متقابلتين ليقوّي حجته.',
			svg: svgFrenchGrammarMap({
				title: 'Exprimer l’opposition et la concession',
				rootLabel: 'Deux faits contraires ou inattendus',
				rootSub: 'Maîtriser le mode verbal et la syntaxe !',
				branches: [
					{
						label: 'Coordination (+ Indicatif)',
						rule: 'mais / cependant / pourtant',
						example: 'Il est rapide, cependant il fatigue.'
					},
					{
						label: 'Subordination (+ Subjonctif)',
						rule: 'bien que / quoique + Subj.',
						example: 'Bien qu’il soit court, il éclaire.'
					},
					{
						label: 'Phrase simple (+ Nom)',
						rule: 'malgré / en dépit de + Nom',
						example: 'Malgré les obstacles, il lit.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما صيغة الفعل « soient » بعد الرابط « Bien que » في الجملة: « Bien que les téléphones soient présents partout »؟',
					hintAr: '« soient » هو تصريف فعل être في أي صيغة؟',
					expectedInput: 'المنصوب الحاضر (Le subjonctif présent)',
					revealAr: 'بعد « bien que » و« quoique » نصرّف الفعل وجوبا في صيغة المنصوب (le subjonctif présent): qu’il soit, qu’ils soient, qu’il ait, qu’il fasse, qu’il puisse.'
				},
				{
					promptAr: 'ما نوع الكلمة التي تأتي مباشرة بعد « Malgré » في: « Malgré la concurrence numérique »؟ وهل يصح أن نقول « Malgré que »؟',
					hintAr: '« la concurrence » اسم أم فعل مصرف؟',
					expectedInput: 'يأتي بعد Malgré اسم فقط (GN) ونتجنب « malgré que » في الفرنسية الفصحى',
					revealAr: '« Malgré » و« En dépit de » حرفا جر يتبعهما اسم فقط (Malgré la difficulté). أما إذا أردنا فعلا مصرفا فنستعمل « Bien que + subjonctif ».'
				},
				{
					promptAr: 'ما الفرق الدقيق بين التعارض (opposition) والاستدراك (concession)؟',
					hintAr: 'قارن: « Amine préfère l’histoire alors que Bilal préfère la poésie » و« Bien qu’il pleuve, les bénévoles plantent des arbres ».',
					expectedInput: 'التعارض يقارن بين شيئين مختلفين، والاستدراك يعرض نتيجة غير متوقعة رغم وجود عائق',
					revealAr: 'التعارض (opposition) يضع حقيقتين مختلفتين وجها لوجه (alors que / tandis que)، بينما الاستدراك (concession) يقرّ بعائق أو حقيقة ثم يثبت استمرار النتيجة المخالفة للتوقع (bien que / malgré / pourtant).'
				}
			]
		},
		summary: {
			rulesAr: [
				'في الجملة المعطوفة (Coordination + Indicatif): mais, cependant, pourtant, toutefois, néanmoins, en revanche, par contre.',
				'في الجملة التابعة (Subordination): للتعارض المقارن نستعمل (tandis que / alors que + indicatif)، وللاستدراك نستعمل (bien que / quoique + subjonctif présent) أو (même si + indicatif).',
				'في الجملة البسيطة (Préposition + Nom): malgré + nom / en dépit de + nom (مثال: Malgré son jeune âge, elle maîtrise la langue).',
				'تذكّر الأفعال الشاذة الأكثر ورودا في المنصوب (Subjonctif présent) بعد bien que: être (soit / soient), avoir (ait / aient), faire (fasse / fassent), pouvoir (puisse / puissent), savoir (sache / sachent), aller (aille / aillent), venir (vienne / viennent).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Pièges classiques : Bien que vs Même si vs Malgré',
				subtitle: 'Ne confondez jamais le mode verbal !',
				columns: [
					{
						header: 'Bien que / Quoique',
						rule: '+ SUBJONCTIF',
						examples: 'Bien qu’il fasse froid...'
					},
					{
						header: 'Même si / Tandis que',
						rule: '+ INDICATIF',
						examples: 'Même s’il fait froid...'
					},
					{
						header: 'Malgré / En dépit de',
						rule: '+ NOM (sans verbe)',
						examples: 'Malgré le froid...'
					}
				]
			}),
			visualCaptionAr: 'المقارنة الحاسمة بين bien que وmême si وmalgré لتفادي أخطاء الامتحان',
			examples: [
				{
					problemAr: 'اربط الجملتين باستعمال « Bien que »: « Ce monument est très ancien. Il reste solidement debout. »',
					solutionAr: 'Bien que ce monument soit très ancien, il reste solidement debout.'
				},
				{
					problemAr: 'حوّل الجملة إلى جملة بسيطة باستعمال « Malgré »: « Bien que le budget soit limité, la bibliothèque s’enrichit chaque année. »',
					solutionAr: 'Malgré un budget limité (أو Malgré la limitation du budget), la bibliothèque s’enrichit chaque année.'
				}
			],
			watchOutAr:
				'خطأ شائع جدا في البكالوريا و1AS: كتابة « Bien qu’il est... » أو « Malgré qu’il pleut... »! الصواب دائما: « Bien qu’il soit... » و« Malgré la pluie... ».'
		},
		practice: [
			{
				questionAr: 'أكمل بتصريف الفعل الصحيح: « Bien que les journaux numériques .......... rapides, beaucoup de lecteurs préfèrent le papier. » (être)',
				options: ['sont', 'soient', 'seront', 'étaient'],
				correctIndex: 1,
				diagnosticFeedback: [
					'« sont » مضارع إخباري لا يصح بعد bien que.',
					'أحسنت! بعد « Bien que » نصرّف الفعل في Subjonctif présent: soient.',
					'لا نستعمل المستقبل بعد bien que.',
					'لا نستعمل الماضي الناقص بعد bien que.'
				],
				explanationAr: 'القاعدة ثابتة: bien que / quoique + subjonctif (qu’ils soient).'
			},
			{
				questionAr: 'اختر الجملة السليمة نحويا مع « Malgré »:',
				options: [
					'Malgré il manque des livres, les élèves lisent chaque jour.',
					'Malgré le manque de livres, les élèves lisent chaque jour.',
					'Malgré que il manque des livres, les élèves lisent chaque jour.',
					'Malgré manquer des livres, les élèves lisent chaque jour.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا يأتي فاعل وفعل مصرف بعد malgré.',
					'ممتاز! « Malgré + nom (le manque de livres) » تركيب فصيح وسليم 100%.',
					'تُتجنب صيغة « malgré que » في الفرنسية السليمة ونستخدم « bien que » بدلها.',
					'لا يأتي مصدر بعد malgré.'
				],
				explanationAr: '« Malgré » حرف جر يتبعه دائما اسم أو مجموعة اسمية.'
			},
			{
				questionAr: 'أكمل بالتصريف الصحيح بعد « Même si »: « Même si ce livre .......... long, sa lecture demeure passionnante. » (être)',
				options: ['soit', 'est', 'soient', 'fussent'],
				correctIndex: 1,
				diagnosticFeedback: [
					'« Même si » لا يأخذ المنصوب أبدا بل يأخذ الصيغة الإخبارية!',
					'صحيح! « Même si + indicatif (est) » عكس « bien que + subjonctif ».',
					'ليس جمعا ولا منصوبا.',
					'صيغة قديمة في المنصوب لا تناسب même si.'
				],
				explanationAr: 'انتبه للفرق: « bien que + subjonctif »، أما « même si + indicatif ».'
			},
			{
				questionAr: 'ما تصريف الفعل « pouvoir » في المنصوب الحاضر بعد « Bien que »؟ « Bien que ce projet .......... sembler ambitieux, il est réalisable. »',
				options: ['peut', 'puisse', 'pourra', 'pouvait'],
				correctIndex: 1,
				diagnosticFeedback: [
					'« peut » في المضارع الإخباري.',
					'أحسنت! « puisse » هو تصريف pouvoir في subjonctif présent مع il.',
					'« pourra » في المستقبل.',
					'« pouvait » في الماضي الناقص.'
				],
				explanationAr: 'من الأفعال الشاذة الأساسية في المنصوب: pouvoir -> qu’il puisse.'
			},
			{
				questionAr: 'أي رابط يناسب المقارنة المتقابلة (opposition) في الجملة: « Certains citoyens trient leurs déchets .......... d’autres les jettent dans la rue. »؟',
				options: ['tandis que', 'parce que', 'afin que', 'de sorte que'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة موفقة! « tandis que » (في حين أن / بينما) يبرز التعارض بين سلوكين متقابلين.',
					'« parce que » للسبب.',
					'« afin que » للغاية.',
					'« de sorte que » للنتيجة.'
				],
				explanationAr: '« tandis que » و« alors que » يعبران عن التعارض والمقابلة بين موقفين.'
			}
		]
	},

	// 3. Les modalisateurs et le lexique appréciatif / dépréciatif
	{
		id: 'fre_lesson_1as_tcl_t2_modalisateurs_lexique',
		slug: 'fre-1as-tcl-t2-modalisateurs-lexique',
		grade: '1as_tcl',
		yearSubjectId: 665,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع 2: الرسالة المفتوحة الحجاجية والمقابلة (La lettre ouverte et l’entretien)',
		order: 3,
		titleAr: 'أدوات التوجيه والمعجم التقييمي الإيجابي والسلبي (Modalisateurs et lexique appréciatif / dépréciatif)',
		objectives: [
			'التمييز بين المعجم التقييمي الإيجابي/الاستحساني (mélioratif / appréciatif) والمعجم السلبي/الاستهجاني (péjoratif / dépréciatif)',
			'توظيف الموداليزاتورات للتعبير عن اليقين والاحتمال والوجوب والحكم القيمي في الرسالة المفتوحة',
			'تحليل موقف الكاتب تجاه قضية ثقافية أو اجتماعية من خلال اختياره للمفردات'
		],
		keywordsAr: [
			'Lexique appréciatif',
			'Lexique dépréciatif',
			'Mélioratif',
			'Péjoratif',
			'Modalisateurs'
		],
		discover: {
			scenarioAr:
				'في رسالة مفتوحة حول حماية المواقع الأثرية الجزائرية، كتب أحد المواطنين: « Il est navrant de constater l’état déplorable de certains murs anciens menacés par la négligence. En revanche, les initiatives citoyennes de restauration méritent un hommage sincère : cet héritage précieux et noble constitue une richesse irremplaçable pour nos enfants. » صنّف الألفاظ التي تعبّر عن الاستياء والألفاظ التي تعبّر عن الاعتزاز.',
			svg: svgFrenchGrammarMap({
				title: 'Prendre position par le choix des mots',
				rootLabel: 'Le lexique évaluatif (Jugement de valeur)',
				branches: [
					{
						label: 'Appréciatif (Mélioratif)',
						rule: 'Valoriser, louer, défendre',
						example: 'précieux, noble, bénéfique'
					},
					{
						label: 'Dépréciatif (Péjoratif)',
						rule: 'Critiquer, dénoncer, alerter',
						example: 'déplorable, nuisible, fléau'
					},
					{
						label: 'Modalisateurs',
						rule: 'Degré de certitude / devoir',
						example: 'il est évident / sans doute'
					}
				]
			}),
			steps: [
				{
					promptAr: 'استخرج 3 كلمات من المعجم الاستهجاني السلبي (dépréciatif / péjoratif) في الفقرة.',
					hintAr: 'ابحث عن الكلمات التي تدين الإهمال وسوء الحال.',
					expectedInput: 'navrant / déplorable / négligence / menacés',
					revealAr: 'الكلمات « navrant » (مؤسف)، « déplorable » (مزرٍ)، و« négligence » (إهمال) تنتمي للمعجم الاستهجاني السلبي وتبرز خطورة المشكلة.'
				},
				{
					promptAr: 'استخرج 3 كلمات من المعجم الاستحساني الإيجابي (appréciatif / mélioratif).',
					hintAr: 'ابحث عن الأوصاف الإيجابية للتراث والمبادرات.',
					expectedInput: 'hommage sincère / précieux / noble / richesse irremplaçable',
					revealAr: 'الكلمات « précieux, noble, richesse irremplaçable, hommage sincère » ترفع قيمة التراث وتحث القارئ على صيانته.'
				},
				{
					promptAr: 'لماذا يمزج كاتب الرسالة المفتوحة بين المعجم السلبي (عند وصف المشكلة) والمعجم الإيجابي (عند وصف الحل)؟',
					hintAr: 'فكّر في الأثر الإقناعي على المسؤول والجمهور.',
					expectedInput: 'لإبراز خطورة الوضع الحالي من جهة، والترغيب في الحل الإيجابي من جهة أخرى',
					revealAr: 'المقابلة بين السلبي والإيجابي تقوّي الإقناع: فالمعجم السلبي يدق ناقوس الخطر، والمعجم الإيجابي يبيّن فائدة الإصلاح.'
				}
			]
		},
		summary: {
			rulesAr: [
				'المعجم الاستحساني/الإيجابي (Lexique appréciatif ou mélioratif): يعبّر عن الإعجاب والتقدير والتأييد (أسماء: progrès, richesse, modèle, réussite | صفات: remarquable, précieux, bénéfique, exemplaire | أفعال: encourager, valoriser, enrichir).',
				'المعجم الاستهجاني/السلبي (Lexique dépréciatif ou péjoratif): يعبّر عن النقد والرفض والتحذير (أسماء: fléau, gaspillage, négligence, dégradation | صفات: nuisible, inquiétant, déplorable, inacceptable | أفعال: nuire, gaspiller, dégrader, menacer).',
				'الموداليزاتورات النحوية والأسلوبية: أفعال الوجوب (devoir, falloir)، أفعال الرأي (estimer, juger, déplorer)، الشرط للتأدب أو الفرضية (il faudrait, nous aimerions)، وعبارات التأكيد (il est indéniable que, certes, à coup sûr).',
				'انتبه للّواحق السلبية أحيانا مثل -âtre (blanchâtre) و-ard (vantard)، وللظروف العاطفية (heureusement, hélas, malheureusement).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Opposer le négatif au positif dans un plaidoyer',
				subtitle: 'Choisir le mot juste pour convaincre (1AS TCL)',
				columns: [
					{
						header: 'Dénoncer (Dépréciatif)',
						rule: 'Montrer le danger',
						examples: 'fléau, gaspillage, déplorable'
					},
					{
						header: 'Défendre (Appréciatif)',
						rule: 'Valoriser la solution',
						examples: 'atout, utile, exemplaire'
					},
					{
						header: 'Nuancer (Modalisateurs)',
						rule: 'Certitude / Obligation',
						examples: 'indispensable, sans doute'
					}
				]
			}),
			visualCaptionAr: 'التوظيف المتوازن للمعجم التقييمي والموداليزاتورات في الحجاج الأدبي',
			examples: [
				{
					problemAr: 'استبدل الصفة المحايدة « grand » بصفة استحسانية وأخرى استهجانية حسب السياق: (1) « Un ..... progrès éducatif » — (2) « Un ..... gaspillage d’eau ».',
					solutionAr: '(1) Un remarquable / admirable progrès éducatif (إيجابي). (2) Un regrettable / scandaleux gaspillage d’eau (سلبي).'
				},
				{
					problemAr: 'حدّد قيمة العبارة « Il est indéniable que » في: « Il est indéniable que la lecture forme des citoyens éclairés. »',
					solutionAr: 'موداليزاتور يدل على اليقين القاطع (la certitude absolue).'
				}
			],
			watchOutAr:
				'في الرسالة المفتوحة الموجهة لمسؤول، استخدم المعجم السلبي لوصف المشكلة (le gaspillage, la dégradation) لا لمهاجمة شخص المسؤول نفسه؛ فالأدب والاحترام شرط نجاح الحجاج!'
		},
		practice: [
			{
				questionAr: 'أي مجموعة كلمات تنتمي كلها إلى المعجم الاستحساني الإيجابي (lexique appréciatif / mélioratif)؟',
				options: [
					'déplorable — nuisible — fléau',
					'bénéfique — précieux — exemplaire',
					'inacceptable — dégradation — négligence',
					'rectangulaire — mensuel — géographique'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه كلها ألفاظ سلبية استهجانية.',
					'أحسنت! « bénéfique, précieux, exemplaire » كلها ألفاظ تقدير واستحسان.',
					'هذه ألفاظ سلبية.',
					'هذه ألفاظ محايدة وصفية.'
				],
				explanationAr: 'المعجم الاستحساني (mélioratif) يضفي قيمة إيجابية على الموصوف.'
			},
			{
				questionAr: 'في الجملة: « Le gaspillage du pain constitue un fléau regrettable dans notre société. » ما نوع المعجم المسطر (gaspillage / fléau / regrettable)؟',
				options: [
					'Lexique neutre',
					'Lexique dépréciatif (péjoratif)',
					'Lexique appréciatif (mélioratif)',
					'Lexique purement scientifique'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'ليست كلمات محايدة بل تحمل إدانة واضحة.',
					'ممتاز! « gaspillage, fléau, regrettable » تعبّر عن الرفض والاستنكار (dépréciatif).',
					'ليست مدحا بل تحذير وإدانة.',
					'ليست مصطلحات علمية محايدة.'
				],
				explanationAr: 'كلمات مثل « fléau » (آفة) و« regrettable » (مؤسف) تنتمي للمعجم الاستهجاني السلبي.'
			},
			{
				questionAr: 'ما دلالة الموداليزاتور « sans doute » في الجملة: « Cette initiative encouragera sans doute davantage de jeunes à fréquenter la bibliothèque. »؟',
				options: [
					'La probabilité (الاحتمال الراجح)',
					'L’interdiction absolue',
					'La colère violente',
					'L’antériorité dans le passé'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! في الفرنسية الدقيقة « sans doute » يعني « على الأرجح / محتملا » (احتمال قوي لا يقين مطلق، بخلاف sans aucun doute).',
					'لا يدل على المنع.',
					'لا يدل على الغضب.',
					'ليس مؤشرا زمنيا.'
				],
				explanationAr: '« sans doute / probablement » من موداليزاتورات الاحتمال الراجح.'
			},
			{
				questionAr: 'أي فعل من الأفعال التالية يحمل دلالة سلبية (verbe dépréciatif)؟',
				options: ['valoriser', 'dégrader', 'enrichir', 'protéger'],
				correctIndex: 1,
				diagnosticFeedback: [
					'« valoriser » يعني تثمين (إيجابي).',
					'أحسنت! « dégrader » يعني إتلاف أو تشويه (سلبي).',
					'« enrichir » يعني إثراء (إيجابي).',
					'« protéger » يعني حماية (إيجابي).'
				],
				explanationAr: 'يمكن للمعجم التقييمي أن يكون اسما أو صفة أو فعلا (مثل dégrader / gaspiller).'
			},
			{
				questionAr: 'في الجملة: « Il est urgent de restaurer cette fontaine historique. » ماذا يعبر الموداليزاتور « Il est urgent de »؟',
				options: [
					'La nécessité pressante (الضرورة والاستعجال)',
					'Le doute complet',
					'L’indifférence totale',
					'La narration au passé'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة موفقة! يعبّر عن الضرورة الملحة والاستعجال للتدخل.',
					'لا يوجد شك هنا بل إلحاح.',
					'بالعكس يدل على شدة الاهتمام.',
					'ليس سردا في الماضي.'
				],
				explanationAr: '« Il faut / Il est urgent de / Il est indispensable de » موداليزاتورات وجوب وضرورة.'
			}
		]
	},

	// 4. La lettre ouverte engagée et l'entretien / interview
	{
		id: 'fre_lesson_1as_tcl_t2_lettre_ouverte_entretien',
		slug: 'fre-1as-tcl-t2-lettre-ouverte-entretien',
		grade: '1as_tcl',
		yearSubjectId: 665,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع 2: الرسالة المفتوحة الحجاجية والمقابلة (La lettre ouverte et l’entretien)',
		order: 4,
		titleAr: 'الرسالة المفتوحة الملتزمة والمقابلة الثقافية (La lettre ouverte engagée et l’entretien)',
		objectives: [
			'التعرف على خصائص الرسالة المفتوحة الملتزمة لقضية مواطَنة أو تعليم (القراءة، صيانة التراث، محاربة التبذير)',
			'فهم بنية المقابلة الثقافية/الصحفية (L’entretien / L’interview): المقدمة التمهيدية (chapeau)، تبادل الأسئلة والأجوبة، والخاتمة',
			'التمييز بين أسئلة المحاور المغلقة والمفتوحة ودور أفعال القول والاستفهام المهذب'
		],
		keywordsAr: [
			'Lettre ouverte engagée',
			'Entretien',
			'Interview',
			'Chapeau',
			'Questions ouvertes'
		],
		discover: {
			scenarioAr:
				'في جريدة مدرسية بثانوية بقسنطينة، نُشِر نصّان حول قضية المطالعة: الأول « entretien » (مقابلة) مع أمين مكتبة المدينة يبدأ بمقدمة تعريفية (chapeau) تليها أسئلة مفتوحة وإجابات مطوّلة؛ والثاني « lettre ouverte » موجهة لرئيس المجلس البلدي تطالبه بتوسيع قاعة المطالعة. كيف يتكامل هذان النوعان في الدفاع عن قضية تربوية؟',
			svg: svgFrenchWritingBlueprint({
				title: 'Structure de l’Entretien culturel (Interview)',
				steps: [
					{
						stage: '1. Titre + Chapeau',
						detail: 'Présentation de l’invité, son rôle et le thème de l’entretien.'
					},
					{
						stage: '2. Questions ouvertes',
						detail: 'Journaliste : Comment, Pourquoi, Quels conseils... (vouvoiement).'
					},
					{
						stage: '3. Réponses développées',
						detail: 'Invité : explications, arguments, exemples et recommandations.'
					},
					{
						stage: '4. Clôture',
						detail: 'Remerciements du journaliste et dernier message de l’invité.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما وظيفة الفقرة التمهيدية القصيرة (le chapeau) في أعلى المقابلة الصحفية؟',
					hintAr: 'تأتي قبل السؤال الأول وتُكتب غالبا بخط بارز أو مائل.',
					expectedInput: 'تقديم الضيف المُستَجوَب ومهنته وموضوع المقابلة للقارئ',
					revealAr: 'المقدمة التمهيدية (le chapeau) تعرّف القارئ بهوية الضيف وصفته العلمية أو الثقافية وبمناسبة الحوار.'
				},
				{
					promptAr: 'لماذا يفضّل الصحفي الأسئلة المفتوحة (Comment... ? Pourquoi... ?) على الأسئلة المغلقة في المقابلة؟',
					hintAr: 'السؤال المغلق يجاب عنه بـ Oui أو Non فقط.',
					expectedInput: 'لأن الأسئلة المفتوحة تسمح للضيف بالشرح وتقديم الحجج والأمثلة',
					revealAr: 'الأسئلة المفتوحة (interrogations partielles) تمنح الضيف مساحة لتفسير أفكاره وتقديم نصائح وحجج ثرية للقراء.'
				},
				{
					promptAr: 'ما القاسم المشترك بين الرسالة المفتوحة الملتزمة والمقابلة الثقافية؟',
					hintAr: 'انظر إلى الحضور الواضح لـ nous/je وvous وإلى الهدف التوعوي.',
					expectedInput: 'كلاهما يبرز ضمائر التلفظ (je/nous/vous) ويهدف إلى توعية الجمهور بقضية عامة',
					revealAr: 'كلاهما خطاب تواصلي مباشر (je/nous/vous) يخدم قضية مواطَنة أو تعليم ويحترم أدب الحوار بضمير الاحترام (vous).'
				}
			]
		},
		summary: {
			rulesAr: [
				'بنية المقابلة (L’entretien / L’interview): (1) العنوان (غالبا مقتبس من أبرز تصريح للضيف)، (2) المقدمة التمهيدية (le chapeau: التعريف بالضيف وموضوع الحوار)، (3) جسم الحوار (أسئلة الصحفي متدرجة من العام إلى الخاص + أجوبة الضيف)، (4) الخاتمة (الشكر وكلمة أخيرة للضيف).',
				'في المقابلة يظهر صوتان متمايزان: صوت المحاور (الصحفي/التلميذ) ويستعمل صيغ الاستفهام الرسمي (Pouvez-vous nous expliquer... ? Quelles mesures proposez-vous ?)، وصوت الضيف ويستعمل « je » للتعبير عن خبرته وآرائه.',
				'بنية الرسالة المفتوحة الملتزمة (La lettre ouverte engagée): صوت واحد (فرد أو جماعة: je/nous) يخاطب مسؤولا أو الجمهور (vous) عبر ترويسة رسمية، صيغة نداء، أطروحة وحجج منظمة (مع استدراك bien que لتقوية الموقف)، واقتراح عملي، ثم صيغة وداع رسمية وتوقيع.',
				'من القضايا المواطنية والتربوية النبيلة في 1AS TCL: تشجيع القراءة والمكتبات المدرسية، صيانة التراث المعماري، محاربة التبذير الغذائي، واحترام النظام والنظافة في المحيط.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Lettre ouverte vs Entretien : points clés',
				rootLabel: 'Deux genres du Projet 2 (1AS TCL)',
				branches: [
					{
						label: 'Lettre ouverte',
						rule: 'Un émetteur -> Destinataire + Public',
						example: 'Objet, appel, thèse, congé'
					},
					{
						label: 'Entretien',
						rule: 'Échange Questions / Réponses',
						example: 'Chapeau + dialogue organisé'
					},
					{
						label: 'Points communs',
						rule: 'Vouvoiement + Engagement',
						example: 'Sensibiliser et convaincre'
					}
				]
			}),
			visualCaptionAr: 'مقارنة شاملة بين الرسالة المفتوحة والمقابلة الثقافية في المشروع الثاني',
			examples: [
				{
					problemAr: 'اكتب سؤالا مفتوحا رسميا يطرحه تلميذ على أمين مكتبة حول تراجع القراءة لدى الشباب.',
					solutionAr: 'Monsieur le Bibliothécaire, quelles solutions proposez-vous pour redonner aux jeunes lycéens le goût de la lecture ?'
				},
				{
					problemAr: 'حدّد المقصود بالضمائر في المقابلة: « Journaliste : Pouvez-vous nous dire comment vous restaurez ces manuscrits ? — Spécialiste : Je travaille avec une équipe de chercheurs. »',
					solutionAr: '« vous » -> الخبير (الضيف) | « nous » -> الصحفي والقراء | « Je » -> الخبير المتحدث عن عمله.'
				}
			],
			watchOutAr:
				'انتبه لعدم الخلط في المقابلة بين ضمير « nous » الشامل (الصحفي + القراء) وضمير « je » الخاص بالضيف، واحذر من كتابة سؤال مباشر بـ « tu » لمسؤول أو خبير!'
		},
		practice: [
			{
				questionAr: 'ما اسم الفقرة القصيرة التي تأتي في بداية المقابلة الصحفية لتعريف القارئ بالضيف وموضوع الحوار؟',
				options: ['La prise de congé', 'Le chapeau', 'La morale', 'L’élément perturbateur'],
				correctIndex: 1,
				diagnosticFeedback: [
					'صيغة الوداع خاصة بنهاية الرسالة.',
					'أحسنت! تُسمى « le chapeau » وهي بطاقة التعريف التمهيدية بالمقابلة.',
					'العبرة خاصة بالقصة.',
					'العنصر المخل خاص بالسرد.'
				],
				explanationAr: '« Le chapeau » فقرة افتتاحية تعرّف بالضيف ومناسبة المقابلة قبل أول سؤال.'
			},
			{
				questionAr: 'أي سؤال هو الأنسب لطرحه في مقابلة ثقافية للحصول على إجابة حجاجية ثرية؟',
				options: [
					'Aimez-vous les livres ?',
					'Pourriez-vous nous expliquer comment protéger efficacement les monuments anciens de notre région ?',
					'Habitez-vous ici ?',
					'Est-ce que la bibliothèque ouvre à huit heures ?'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'سؤال مغلق يجاب عنه بـ Oui فقط.',
					'ممتاز! سؤال مفتوح مهذب بصيغة الشرط (Pourriez-vous...) يتيح للضيف تقديم حجج وحلول مفصلة.',
					'سؤال مغلق سطحي.',
					'سؤال معلوماتي مغلق قصير جدا.'
				],
				explanationAr: 'السؤال المفتوح والمهذب هو المحرك الحقيقي للمقابلة الثرية.'
			},
			{
				questionAr: 'من الذي يعود عليه الضمير « nous » عندما يقول الصحفي للضيف: « Pouvez-vous nous parler de votre dernier ouvrage ? »',
				options: [
					'Le spécialiste et sa famille',
					'Le journaliste et les lecteurs',
					'Uniquement les auteurs anciens',
					'Les personnages d’un roman'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الصحفي لا يتحدث باسم عائلة الضيف.',
					'صحيح! الصحفي يمثّل نفسه والجمهور الذي يقرأ المقابلة (le journaliste et ses lecteurs).',
					'غير صحيح.',
					'غير صحيح.'
				],
				explanationAr: 'في أسئلة المقابلة يجمع « nous » بين المحاور والقراء.'
			},
			{
				questionAr: 'ما الخاصية المميزة للرسالة المفتوحة الملتزمة (lettre ouverte engagée)؟',
				options: [
					'الدفاع العلني عن قضية تربوية أو اجتماعية بحجج منظمة ومقترحات عملية',
					'إخفاء الموقف الشخصي تماما والالتزام بالتعريفات العلمية فقط',
					'إرسالها في سرية تامة دون نشرها',
					'الاعتماد على الماضي البسيط لسرد قصة خيالية'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! الالتزام (l’engagement) يعني اتخاذ موقف واضح للدفاع عن مصلحة عامة.',
					'إخفاء الموقف يخص النص العلمي الموضوعي لا الرسالة المفتوحة.',
					'الرسالة المفتوحة منشورة للرأي العام.',
					'ليست قصة خيالية.'
				],
				explanationAr: 'الرسالة المفتوحة الملتزمة تدافع علنا عن قيمة تربوية أو قضية مواطنة.'
			},
			{
				questionAr: 'كيف يختم المحاور عادة المقابلة الصحفية (l’entretien)؟',
				options: [
					'بشكر الضيف على وقته وإتاحة الفرصة لكلمة أخيرة موجهة للقراء',
					'بكتابة « Veuillez agréer, Monsieur le Maire »',
					'بذكر « Il était une fois »',
					'بحذف اسم الضيف من النص'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة موفقة! يُختم الحوار بشكر مهذب (Merci infiniment pour cet entretien) وكلمة ختامية.',
					'هذه صيغة وداع خاصة بالرسالة الرسمية.',
					'هذه افتتاحية حكاية.',
					'غير صحيح.'
				],
				explanationAr: 'تُختم المقابلة دائما بعبارة شكر للضيف ورسالة ختامية للقراء.'
			}
		]
	},

	// 5. Rédiger une lettre ouverte structurée
	{
		id: 'fre_lesson_1as_tcl_t2_rediger_lettre_ouverte',
		slug: 'fre-1as-tcl-t2-rediger-lettre-ouverte',
		grade: '1as_tcl',
		yearSubjectId: 665,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع 2: الرسالة المفتوحة الحجاجية والمقابلة (La lettre ouverte et l’entretien)',
		order: 5,
		titleAr: 'تحرير رسالة مفتوحة مهيكلة لقضية مواطَنة أو تعليم (Rédiger une lettre ouverte structurée)',
		objectives: [
			'صياغة رسالة مفتوحة متكاملة (14 إلى 18 سطرا) بمستوى شعبة الآداب (7 نقاط في الاختبار)',
			'توظيف الحجاج المتدرج، والاستدراك (bien que + subjonctif)، والمعجم التقييمي، وصيغ التأدب الرسمية',
			'مراجعة الرسالة للتأكد من اكتمال البنية الشكلية، وقوة الحجج، وسلامة الإملاء والمطابقة'
		],
		keywordsAr: [
			'Rédaction',
			'Lettre ouverte structurée',
			'Cause citoyenne',
			'Concession',
			'Politesse officielle'
		],
		discover: {
			scenarioAr:
				'في شعبة الآداب (1AS TCL)، يُتوقع من التلميذ أن يكتب رسالة مفتوحة أعمق حجاجا وأغنى لغة، مثلا: رسالة مفتوحة إلى رئيس البلدية أو مدير الثانوية لتشجيع المطالعة وإنشاء مكتبة حي، أو لحماية معلم أثري، أو لمحاربة تبذير الخبز. لنتتبع خطة تحرير تضمن 7/7!',
			svg: svgFrenchWritingBlueprint({
				title: 'Plan modèle 7/7 : Lettre ouverte (1AS TCL)',
				steps: [
					{
						stage: '1. En-tête complet',
						detail: 'Ville/Date, Expéditeur, Destinataire, Objet et Appel.'
					},
					{
						stage: '2. Constat + Thèse',
						detail: 'Exposer la cause citoyenne avec lexique évaluatif juste.'
					},
					{
						stage: '3. 3 Arguments + Concession',
						detail: 'D’abord, Ensuite, Bien que (+ subjonctif)... Enfin + exemples.'
					},
					{
						stage: '4. Propositions + Congé',
						detail: 'Appel constructif + Veuillez agréer... + Signature.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'كيف ترفع جودة فقرتك الحجاجية في شعبة الآداب باستعمال جملة استدراك (concession)؟',
					hintAr: 'اعترف بصعوبة ما (نقص الوقت أو الميزانية) ثم أثبت إمكانية الحل بـ Bien que + subjonctif.',
					expectedInput: 'Bien que les ressources soient limitées, la mobilisation des citoyens permet de réussir ce projet.',
					revealAr: 'إدراج جملة استدراك مثل « Bien que les moyens soient parfois modestes, une gestion rigoureuse permet de restaurer ce lieu » يبرز نضجا فكريا ويكسبك نقاط القواعد!'
				},
				{
					promptAr: 'اذكر حجتين مقنعتين لرسالة مفتوحة ضد تبذير الخبز والغذاء (le gaspillage alimentaire).',
					hintAr: 'فكّر في الجانب الأخلاقي/الإنساني والجانب الاقتصادي.',
					expectedInput: '1) واجب أخلاقي وتضامني تجاه المحتاجين — 2) خسارة اقتصادية كبيرة وتلويث للبيئة',
					revealAr: 'حجتان قويتان: (D’abord) تبذير الغذاء يتعارض مع قيمنا الأخلاقية وتقدير النعمة، (En outre) يمثّل خسارة اقتصادية فادحة ويزيد حجم النفايات.'
				},
				{
					promptAr: 'ما آخر مراجعة تقوم بها قبل تسليم ورقة الامتحان؟',
					hintAr: 'تحقق من الشكل، صيغة المنصوب، المطابقة، وصيغة الوداع.',
					expectedInput: 'التحقق من عناصر الرسالة الستة + مطابقة الأفعال والصفات + سلامة المنصوب بعد bien que/afin que',
					revealAr: 'مراجعة سريعة لـ 4 نقاط: اكتمال الترويسة والتوقيع، تطابق صيغة النداء مع صيغة الوداع، صحة الأفعال (خاصة subjonctif وconditionnel)، وسلامة الترقيم.'
				}
			]
		},
		summary: {
			rulesAr: [
				'التموضع الصحيح للترويسة: أعلى اليمين (المكان والتاريخ)، أعلى اليسار (المرسل ثم المرسل إليه)، ثم سطر « Objet : ... »، ثم « Monsieur le ... , ».',
				'الفقرة 1 (المقدمة): تحديد سبب المراسلة بوضوح وأدب: « Nous avons l’honneur de vous adresser cette lettre ouverte afin d’attirer votre attention sur... »',
				'الفقرة 2 (العرض الحجاجي): تقديم 3 حجج مرتبة بـ (Tout d’abord / De plus / Enfin)، مع مثال ملموس واحد على الأقل، وجملة استدراك بـ « Bien que + subjonctif »، ومفردات استحسانية واستهجانية متوازنة.',
				'الفقرة 3 (الاقتراح والخاتمة): تقديم مقترح عملي بصيغة الشرط المهذب (Il serait souhaitable de...) ثم صيغة الوداع الكاملة (Veuillez agréer, Monsieur le ..., l’expression de notre profond respect.) ثم التوقيع.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Checklist de réussite (Production écrite /7 pts)',
				rootLabel: 'Les 4 critères évalués en 1AS TCL',
				branches: [
					{
						label: 'Adéquation (2 pts)',
						rule: 'Respect du sujet & format',
						example: 'Vraie lettre ouverte complète'
					},
					{
						label: 'Cohérence (2 pts)',
						rule: 'Thèse, arguments, liens',
						example: 'D’abord, En outre, Bien que'
					},
					{
						label: 'Langue (3 pts)',
						rule: 'Lexique riche + accords',
						example: 'Subjonctif & orthographe sûrs'
					}
				]
			}),
			visualCaptionAr: 'معايير التنقيط الرسمية لتحقيق العلامة الكاملة في تحرير الرسالة المفتوحة',
			examples: [
				{
					problemAr: 'صُغ جملة استدراك متقنة لرسالة مفتوحة تدافع عن توسيع مكتبة الثانوية.',
					solutionAr: 'Bien que les élèves disposent aujourd’hui d’outils numériques, la bibliothèque scolaire demeure un lieu irremplaçable de concentration et de partage du savoir.'
				},
				{
					problemAr: 'اكتب صيغة الوداع المناسبة لرسالة موجهة إلى « Madame la Présidente de l’association culturelle ».',
					solutionAr: 'Dans l’espoir que notre appel retienne toute votre attention, veuillez agréer, Madame la Présidente, l’expression de nos salutations les plus respectueuses.'
				}
			],
			watchOutAr:
				'احذر من نسيان توقيع الرسالة أو كتابة تاريخ ناقص أو التحول من ضمير « vous » إلى « tu » وسط الرسالة! حافظ على نفس مستوى الاحترام من أول سطر إلى آخر سطر.'
		},
		practice: [
			{
				questionAr: 'ما الجملة التي توظّف الاستدراك بـ « Bien que » بشكل سليم تماما لرسالة مفتوحة حول القراءة؟',
				options: [
					'Bien que les livres papier sont précieux, il faut les négliger.',
					'Bien que les écrans soient omniprésents, le livre imprimé reste indispensable.',
					'Bien que les écrans être présents, le livre reste utile.',
					'Bien que les écrans seront utiles, nous lisons des livres.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ في الصيغة (sont بدل soient) وفي المعنى أيضا.',
					'أحسنت! « soient » في المنصوب والمعنى الحجاجي متماسك وذكي.',
					'لا يوضع المصدر بعد bien que.',
					'لا يوضع المستقبل بعد bien que.'
				],
				explanationAr: 'التركيب المتقن هو: Bien que + sujet + subjonctif présent + جملة رئيسية متماسكة.'
			},
			{
				questionAr: 'في رسالة مفتوحة إلى مدير الثانوية، أي سطر « Objet » هو الأكثر وضوحا ودقة؟',
				options: [
					'Objet : Bonjour Monsieur.',
					'Objet : Proposition d’aménagement d’un club de lecture au lycée.',
					'Objet : Les livres de la terre.',
					'Objet : Je veux vous parler de quelque chose.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'التحية ليست موضوع الرسالة.',
					'ممتاز! جملة اسمية موجزة ودقيقة تلخص الغرض من الرسالة.',
					'عبارة غامضة غير محددة.',
					'صياغة شفوية ضعيفة.'
				],
				explanationAr: 'يُصاغ سطر الموضوع (Objet) بجملة اسمية دقيقة ومختصرة.'
			},
			{
				questionAr: 'أي فقرة تحترم شروط الإقناع المهذب في الرسالة المفتوحة؟',
				options: [
					'Vous ne faites jamais rien pour le patrimoine, c’est honteux !',
					'Nous sommes convaincus que la restauration de ce monument historique valorisera l’identité culturelle de notre ville.',
					'Ce monument est fait de pierres grises et mesure dix mètres.',
					'Il était une fois une vieille fontaine oubliée.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'أسلوب هجومي غير مهذب يفقد الرسالة مصداقيتها.',
					'صحيح! موداليزاتور اليقين (Nous sommes convaincus que) ومعجم إيجابي مهذب (valorisera).',
					'مجرد وصف محايد بلا حجاج.',
					'افتتاحية قصة لا رسالة مفتوحة.'
				],
				explanationAr: 'الرسالة المفتوحة تجمع بين الحزم في الدفاع عن القضية والأدب الرفيع في الخطاب.'
			},
			{
				questionAr: 'إذا افتتحت رسالتك بـ « Monsieur le Directeur, » فكيف تكتب صيغة الوداع النهائية؟',
				options: [
					'Veuillez agréer, Madame, nos salutations.',
					'Veuillez agréer, Monsieur le Directeur, l’expression de notre profond respect.',
					'Merci beaucoup et à la prochaine.',
					'Je vous quitte maintenant, au revoir.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'يجب مطابقة اللقب نفسه في النداء والوداع (Monsieur le Directeur لا Madame).',
					'أحسنت! إعادة اللقب نفسه داخل صيغة الوداع الرسمية قاعدة أساسية.',
					'صيغة عامية.',
					'صيغة غير رسمية.'
				],
				explanationAr: 'نكرّر في صيغة الوداع تماما نفس اللقب المستعمل في صيغة النداء.'
			},
			{
				questionAr: 'أي عنصر يجعل الإنتاج الكتابي في 1AS TCL يستحق العلامة الكاملة؟',
				options: [
					'كتابة فقرة واحدة طويلة بلا روابط ولا علامات ترقيم',
					'احترام شكل الرسالة، تنظيم 3 حجج بروابط منطقية واستدراك، وتنويع المعجم التقييمي بلغة سليمة',
					'الاكتفاء بسطرين بدون أمثلة ولا اقتراحات',
					'نقل مقدمة النص الأصلي كما هي'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'غياب الفقرات والترقيم يُنقص نقاط التماسك.',
					'إجابة موفقة! هذا التوازن يغطي كل معايير شبكة التقييم الرسمية.',
					'سطران لا يكفيان لبناء رسالة مفتوحة حجاجية.',
					'النقل غير مقبول.'
				],
				explanationAr: 'نجاح الرسالة المفتوحة يقوم على الشكل الرسمي، قوة الحجاج، وتنوع الروابط والمعجم.'
			}
		]
	}
];
