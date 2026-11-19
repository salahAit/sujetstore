import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchWritingBlueprint
} from '../../svg-french';
import type { FrenchInteractiveLessonData } from '../../types';

/**
 * 3AS BAC Lettres et Philosophie (آداب وفلسفة — yearSubjectId: 769, coeff 3, 02h30, 7+6+7=20)
 * Interactive Lessons — Trimestre 2 : Projet 2 « Le débat d’idées » (5 lessons)
 */
export const LESSONS_3AS_LP_T2: FrenchInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 1: Confrontation de thèses et polyphonie énonciative
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_lp_t2_confrontation_theses_polyphonie',
		slug: 'fre-3as-lp-t2-confrontation-theses-polyphonie',
		grade: '3as_lp',
		yearSubjectId: 769,
		trimesterId: 't2',
		sequenceId: 'projet2',
		sequenceTitleAr: 'المشروع 2: Le débat d’idées (نقاش الأفكار والحجاج)',
		order: 1,
		titleAr: 'تقابل الأطروحات وتعدد الأصوات (Thèse, antithèse et polyphonie énonciative)',
		objectives: [
			'التمييز بين الأطروحة المدافع عنها (Thèse défendue) والأطروحة المرفوضة أو المقابلة (Thèse réfutée / antithèse)',
			'فهم ظاهرة تعدد الأصوات (Polyphonie énonciative) والتمييز بين موقف الكاتب ومواقف الخصوم (Certains pensent que...)',
			'التفريق بين النقاش المفتوح (Débat ouvert) والنقاش المغلق/الجدلي (Débat polémique) وتصنيف الحجج والأمثلة'
		],
		keywordsAr: ['Thèse', 'Antithèse', 'Polyphonie', 'Arguments', 'Exemples', 'Débat d’idées'],
		discover: {
			scenarioAr:
				'في نصوص نقاش الأفكار (مثل التعليم الرقمي، القراءة الورقية، التقدم التقني والأخلاق)، لا يعرض الكاتب رأياً واحداً فقط؛ بل يستحضر رأي المخالفين (« Certains affirment que... ») ثم يعرض حججه المضادة. هذا التعايش بين عدة أصوات يسمى La polyphonie énonciative.',
			svg: svgFrenchGrammarMap({
				title: 'Structure du débat d’idées (BAC LP)',
				rootLabel: 'Problématique débattue',
				rootSub: 'Ex. : Le numérique remplace-t-il le livre imprimé ?',
				branches: [
					{
						label: 'Thèse adverse',
						rule: 'Certains prétendent que...',
						example: 'L’écran suffirait à apprendre.'
					},
					{
						label: 'Thèse de l’auteur',
						rule: 'Or, je soutiens que...',
						example: 'Le livre papier reste irremplaçable.'
					},
					{
						label: 'Arguments + Exemples',
						rule: 'Preuves rationnelles + faits',
						example: 'Meilleure concentration prouvée.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما دلالة العبارة « Certains prétendent que les écrans rendent la bibliothèque inutile »؟ هل هذا رأي الكاتب؟',
					hintAr: 'لاحظ الفعل « prétendent » (يزعمون) والضمير المبهم « Certains ».',
					expectedInput: 'لا، إنه رأي الخصوم (أطروحة مرفوضة / thèse adverse) يبتعد عنها الكاتب',
					revealAr: 'الفعل « prétendre » يحمل تشكيكاً وتبعيداً (mise à distance)؛ فهو يقدّم صوت الخصوم تمهيداً لدحضه لاحقاً.'
				},
				{
					promptAr: 'ما المقصود بـ « la polyphonie énonciative » في نص نقاش الأفكار؟',
					hintAr: 'الكلمة مكونة من poly (متعدد) و phonie (صوت).',
					expectedInput: 'تعدد الأصوات ووجهات النظر داخل النص الواحد (المؤيدون، المعارضون، والكاتب)',
					revealAr: 'تعني تعدد الأصوات: يستحضر الكاتب أصواتاً أخرى (les partisans, les détracteurs, les pédagogues) ليقارنها أو يفندها.'
				},
				{
					promptAr: 'ما الفرق بين الحجة (Argument) والمثال (Exemple) في نص النقاش؟',
					hintAr: 'الحجة فكرة عامة عقلية، والمثال حالة واقعية ملموسة تؤيدها.',
					expectedInput: 'الحجة فكرة تعليلية مجردة، والمثال حالة ملموسة توضحها وتؤكدها',
					revealAr: 'الحجة تثبت صحة الأطروحة عقلياً (ex. : la lecture développe la réflexion)، والمثال يوضحها بواقعة ملموسة (par exemple, un élève qui lit régulièrement maîtrise mieux la rédaction).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الأطروحة (La thèse) هي الرأي الأساسي الذي يتبناه الكاتب أو أحد طرفي النقاش إزاء قضية خلافية (problématique).',
				'الأطروحة المضادة (L’antithèse / thèse réfutée) تُقدّم غالباً بعبارات مثل: Certains pensent que..., Les partisans de... soutiennent que..., D’aucuns prétendent que...',
				'تعدد الأصوات (La polyphonie): حضور عدة متكلمين أو آراء داخل النص (المؤيدون، المعارضون، الخبراء، والكاتب)، ويظهر موقف الكاتب الحقيقي عادة بعد رابط تعارض مثل: Mais, Or, Cependant, En réalité.',
				'التمييز بين التخطيط الجدلي (Plan dialectique: عرض الرأيين ثم التوفيق أو الترجيح) والتخطيط الدحضي (Plan réfutatif: عرض رأي الخصم ثم تفنيده كلياً).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Repérer les voix dans le débat',
				subtitle: 'Indices lexicaux de la confrontation des thèses',
				columns: [
					{
						header: 'Partisans (Pour)',
						rule: 'défenseurs, adeptes, favorables',
						examples: 'estiment, valorisent, approuvent'
					},
					{
						header: 'Détracteurs (Contre)',
						rule: 'opposants, sceptiques, critiques',
						examples: 'rejettent, redoutent, dénoncent'
					},
					{
						header: 'Rupture / Position',
						rule: 'Mais, Or, Pourtant, En fait',
						examples: 'Il convient de rappeler que...'
					}
				]
			}),
			visualCaptionAr: 'المؤشرات المعجمية للتمييز بين المؤيدين والمعارضين وموقف الكاتب في نص النقاش.',
			examples: [
				{
					problemAr: 'Relevez la thèse réfutée et la thèse défendue dans : « Certains croient que le progrès technique garantit seul le bonheur ; or, sans éthique morale, la science perd son sens humain. »',
					solutionAr: 'Thèse réfutée : le progrès technique garantit seul le bonheur. | Thèse défendue : sans éthique morale, la science perd son sens humain.'
				},
				{
					problemAr: 'À quoi servent les expressions « selon les uns » et « d’après les autres » ?',
					solutionAr: 'Elles introduisent la polyphonie énonciative en confrontant deux points de vue divergents dans un débat d’idées.'
				},
				{
					problemAr: 'Classez ces deux énoncés (Argument / Exemple) : (1) L’entraide scolaire renforce la cohésion sociale. (2) Par exemple, les clubs de révision gratuits au lycée aident les élèves en difficulté.',
					solutionAr: '(1) Argument général. | (2) Exemple concret introduit par « Par exemple ».'
				}
			],
			watchOutAr: 'انتبه في امتحان البكالوريا: لا تخلط بين الجملة الأولى في النص وأطروحة الكاتب! كثيراً ما يفتتح الكاتب النص بأطروحة الخصوم (Certains pensent que...) ثم يعلن أطروحته الحقيقية في الفقرة الثانية بعد « Mais » أو « Cependant ».'
		},
		practice: [
			{
				questionAr: 'Que désigne la « polyphonie énonciative » dans un texte de débat d’idées ?',
				options: [
					'La coexistence de plusieurs voix et points de vue dans un même texte',
					'La répétition d’une seule date historique',
					'L’absence totale d’arguments et d’exemples',
					'Un texte rédigé exclusivement à l’impératif'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: تعني تعدد الأصوات ووجهات النظر داخل النص الحجاجي الواحد.',
					'خطأ: لا علاقة لها بتكرار التواريخ.',
					'خطأ: النقاش يقوم على الحجج والأمثلة.',
					'خطأ: الأمر يغلب في نص النداء.'
				],
				explanationAr: 'في نقاش الأفكار، يستحضر الكاتب أصوات المؤيدين والمعارضين إلى جانب صوته الخاص.'
			},
			{
				questionAr: 'Quel verbe introducteur montre que l’auteur prend ses distances avec la thèse adverse ?',
				options: ['prouvent', 'démontrent', 'prétendent', 'établissent'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: prouver يدل على تأييد وتثبيت الحقيقة.',
					'خطأ: démontrer يدل على البرهنة المقبولة.',
					'ممتاز: الفعل prétendre (يزعمون) يشكّك في صحة كلام الخصوم ويمهّد لدحضه.',
					'خطأ: établir يفيد الإثبات والتأكيد.'
				],
				explanationAr: 'أفعال مثل prétendre و alléguer و croire تدل على تبعيد الكاتب نفسه عن الرأي المذكور.'
			},
			{
				questionAr: 'Dans un débat sur l’intelligence artificielle à l’école, qui appelle-t-on « les détracteurs » ?',
				options: [
					'Les personnes qui défendent avec enthousiasme un outil',
					'Les opposants qui critiquent un phénomène ou une idée',
					'Les imprimeurs de manuels scolaires',
					'Les témoins d’une bataille ancienne'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: هؤلاء هم les partisans أو les adeptes.',
					'صحيح: les détracteurs هم المعارضون والناقدون للفكرة.',
					'خطأ: لا علاقة للمعنى بالطباعة.',
					'خطأ: ليس مرتبطاً بالمعارك التاريخية.'
				],
				explanationAr: 'المصطلحان المتقابلان في البكالوريا هما: les partisans / adeptes (المؤيدون) و les détracteurs / opposants (المعارضون).'
			},
			{
				questionAr: 'Quel mot marque généralement le passage de la thèse adverse à la véritable thèse de l’auteur ?',
				options: ['Notamment', 'De plus', 'Ainsi', 'Or / Cependant'],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: notamment لتقديم مثال.',
					'خطأ: de plus للإضافة في نفس الاتجاه.',
					'خطأ: ainsi للنتيجة أو المثال.',
					'أحسنت: الروابط المعارِضة مثل Or و Cependant و Mais تعلن تحوّل الكاتب إلى أطروحته الحقيقية.'
				],
				explanationAr: 'تأتي أطروحة الكاتب غالباً بعد رابط استدراك أو تعارض يقطع أطروحة الخصم.'
			},
			{
				questionAr: 'Quelle est la visée communicative d’un texte qui confronte deux thèses pour amener le lecteur à adopter la position de l’auteur ?',
				options: [
					'Convaincre et persuader le lecteur d’adhérer à une thèse',
					'Décrire un monument historique sans opinion',
					'Raconter une fable imaginaire',
					'Donner des consignes de laboratoire'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الغاية الأساسية في نص النقاش الحجاجي هي الإقناع العقلي (convaincre) والاستمالة (persuader).',
					'خطأ: النص الحجاجي يحمل موقفاً ورأياً.',
					'خطأ: ليس قصة خيالية.',
					'خطأ: ليس نصاً إجرائياً علمياً.'
				],
				explanationAr: 'يسعى كاتب نص النقاش إلى الإقناع عبر الحجج العقلية والأمثلة الداعمة.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 2: Concession et réfutation (certes... mais, quoique + subjonctif, en dépit de)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_lp_t2_concession_refutation',
		slug: 'fre-3as-lp-t2-concession-refutation',
		grade: '3as_lp',
		yearSubjectId: 769,
		trimesterId: 't2',
		sequenceId: 'projet2',
		sequenceTitleAr: 'المشروع 2: Le débat d’idées (نقاش الأفكار والحجاج)',
		order: 2,
		titleAr: 'الاستدراك والدحض (La concession et la réfutation : certes... mais, quoique, en dépit de)',
		objectives: [
			'فهم استراتيجية الاستدراك المتبوع بالدحض: الاعتراف الجزئي بصواب الخصم أولاً ثم تقوية الأطروحة المضادة',
			'التمييز النحوي الدقيق بين أدوات الاستدراك المتبوعة بالمنصوب (bien que / quoique + subjonctif)، وبالمرفوع (même si + indicatif)، وبالاسم (malgré / en dépit de + nom)',
			'إعادة كتابة جمل البكالوريا بدقة عند التحويل بين هذه الأدوات دون أخطاء في الصيغة الفعلية'
		],
		keywordsAr: ['Concession', 'Réfutation', 'Certes... mais', 'Bien que', 'Quoique', 'Subjonctif', 'En dépit de'],
		discover: {
			scenarioAr:
				'أقوى سلاح حجاجي في الفلسفة والفرنسية هو الاستدراك (La concession): تعترف للخصم بنقطة إيجابية (Certes, Internet facilite l’accès à l’information...) ثم تدحض موقفه وتفرض رأيك (...mais il ne remplace jamais l’effort personnel et l’accompagnement du professeur).',
			svg: svgFrenchGrammarMap({
				title: 'Exprimer la concession au BAC LP',
				rootLabel: 'Concession + Réfutation',
				rootSub: 'Attention au mode verbal ou au groupe nominal !',
				branches: [
					{
						label: 'Bien que / Quoique',
						rule: '+ SUBJONCTIF obligatoire',
						example: 'Bien qu’il soit utile, cet outil a des limites.'
					},
					{
						label: 'Même si',
						rule: '+ INDICATIF obligatoire',
						example: 'Même s’il est utile, cet outil a des limites.'
					},
					{
						label: 'Malgré / En dépit de',
						rule: '+ GROUPE NOMINAL',
						example: 'En dépit de son utilité, cet outil a des limites.'
					},
					{
						label: 'Certes... mais',
						rule: 'Concession puis réfutation',
						example: 'Certes il aide, mais il peut distraire.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الصيغة الفعلية (Mode) الواجب استعمالها مباشرة بعد « bien que » و « quoique »؟',
					hintAr: 'هل نقول « Bien qu’il est rapide » أم « Bien qu’il soit rapide »؟',
					expectedInput: 'Le subjonctif (soit, ait, puisse, fasse...)',
					revealAr: 'بعد « bien que » و « quoique » نستعمل دائماً Le subjonctif: Bien que le numérique soit pratique, la lecture sur papier demeure essentielle.'
				},
				{
					promptAr: 'إذا عوّضنا « Bien que » بـ « Même si » في الجملة السابقة، ماذا يحدث للفعل « soit »؟',
					hintAr: '« Même si » يأخذ الصيغة الإخبارية العادية.',
					expectedInput: 'يتحول إلى Indicatif: Même si le numérique est pratique...',
					revealAr: 'بعد « même si » نستعمل دائماً L’indicatif (est, a, peut)، ولا نستعمل Subjonctif أبداً!'
				},
				{
					promptAr: 'حوّل الجملة باستعمال « En dépit de »: « Bien que les écrans soient attractifs, ils fatiguent la vue. »',
					hintAr: 'حوّل الصفة « attractifs » إلى اسم (l’attractivité / l’attrait).',
					expectedInput: 'En dépit de l’attractivité (ou l’attrait) des écrans, ils fatiguent la vue.',
					revealAr: 'بعد « malgré » و « en dépit de » نضع اسماً (groupe nominal) ولا نضع فعلاً مصرفاً أبداً.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الاستدراك المزدوج (Certes / Il est vrai que... mais / cependant / toutefois): يمنح الكاتب مصداقية وموضوعية لأنه يعترف بجزء من الحقيقة قبل أن يرجّح أطروحته.',
				'أدوات تتبعها جملة في المنصوب (Subjonctif): bien que، quoique، encore que. أمثلة التصريف المتكرر: être -> soit/soient | avoir -> ait/aient | pouvoir -> puisse/puissent | faire -> fasse/fassent | savoir -> sache.',
				'أدوات تتبعها جملة في المرفوع (Indicatif): même si، alors que، tandis que، bien sûr... mais.',
				'أدوات يتبعها اسم فقط (Groupe nominal): malgré (بلا de!) و en dépit de (مع de!). مثال: Malgré ses avantages = En dépit de ses avantages.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Subjonctif présent des verbes clés',
				subtitle: 'Indispensables après « bien que » et « quoique »',
				columns: [
					{
						header: 'Être / Avoir',
						rule: 'Irréguliers très fréquents',
						examples: 'qu’il soit / qu’il ait'
					},
					{
						header: 'Pouvoir / Faire',
						rule: 'Radicaux puiss- / fass-',
						examples: 'qu’il puisse / qu’il fasse'
					},
					{
						header: 'Verbes en -er / -ir',
						rule: '-e, -es, -e, -ions, -iez, -ent',
						examples: 'qu’il aide / qu’ils finissent'
					}
				]
			}),
			visualCaptionAr: 'أهم أفعال Subjonctif présent التي تتكرر في أسئلة الاستدراك بالبكالوريا.',
			examples: [
				{
					problemAr: 'Réécrivez avec « bien que » : « Même si le téléphone facilite la communication, il réduit les échanges familiaux. »',
					solutionAr: 'Bien que le téléphone facilite la communication, il réduit les échanges familiaux. (ملاحظة: للأفعال من الفوج 1 في المفرد يتشابه الشكل، لكن مع être: est -> soit).'
				},
				{
					problemAr: 'Réécrivez avec « malgré » : « Quoique ce projet soit coûteux, il profite à toute la cité. »',
					solutionAr: 'Malgré le coût élevé de ce projet, il profite à toute la cité.'
				},
				{
					problemAr: 'Réécrivez avec « certes... mais » : « Les cours en ligne offrent de la souplesse ; cependant, ils manquent d’interaction directe. »',
					solutionAr: 'Certes, les cours en ligne offrent de la souplesse, mais ils manquent d’interaction directe.'
				}
			],
			watchOutAr: 'خطآن قاتلان في بكالوريا الفرنسية: كتابة « malgré que + فعل » (خطأ نحوي فادح؛ الصواب bien que + subjonctif أو malgré + nom)، وكتابة « malgré de » (الصواب malgré بدون de، و en dépit de مع de)!'
		},
		practice: [
			{
				questionAr: 'Complétez correctement : « Bien que la technologie .......... précieuse, elle ne remplace pas la morale. »',
				options: ['est', 'soit', 'sera', 'était'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: « est » في المرفوع (Indicatif) ولا يصح بعد bien que.',
					'أحسنت: بعد « bien que » يجب تصريف الفعل être في Subjonctif présent (soit).',
					'خطأ: لا نضع المستقبل بعد bien que.',
					'خطأ: Imparfait صيغة إخبارية لا تناسب bien que.'
				],
				explanationAr: 'الأداة « bien que » تفرض دائماً صيغة Subjonctif.'
			},
			{
				questionAr: 'Choisissez la phrase grammaticalement correcte :',
				options: [
					'En dépit de ses bienfaits, l’usage excessif des écrans nuit à la concentration.',
					'Malgré de ses bienfaits, l’usage excessif des écrans nuit à la concentration.',
					'Malgré que les écrans ont des bienfaits, leur usage excessif nuit.',
					'Bien que ses bienfaits, l’usage excessif des écrans nuit.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح 100%: « En dépit de » متبوعة بمجموعة اسمية سليمة (ses bienfaits).',
					'خطأ: لا نضع حرف الجر « de » بعد « malgré ».',
					'خطأ: « malgré que » مرفوضة في اللغة الأكاديمية الفصيحة.',
					'خطأ: « bien que » تتطلب جملة فعلية في Subjonctif لا مجرد اسم.'
				],
				explanationAr: 'نستعمل « En dépit de + nom » أو « Malgré + nom » بدون de.'
			},
			{
				questionAr: 'Transformez avec « même si » : « Quoique ces jeunes aient peu de moyens, ils réussissent brillamment. »',
				options: [
					'Même si ces jeunes aient peu de moyens, ils réussissent brillamment.',
					'Même si ces jeunes ayant peu de moyens, ils réussissent brillamment.',
					'Même si ces jeunes ont peu de moyens, ils réussissent brillamment.',
					'Même si peu de moyens, ils réussissent brillamment.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: لا نستعمل Subjonctif (aient) بعد même si.',
					'خطأ: لا نستعمل اسم الفاعل هنا.',
					'صحيح: بعد « même si » يعود الفعل إلى Indicatif (ont).',
					'خطأ: « même si » تتطلب فاعلاً وفعلاً مصرفاً.'
				],
				explanationAr: 'بعكس bien que و quoique، فإن même si تتبع دائماً بـ Indicatif.'
			},
			{
				questionAr: 'Quelle est la valeur argumentative du couple « Certes... mais... » ?',
				options: [
					'Exprimer un ordre strict',
					'Raconter un fait chronologique',
					'Introduire une définition scientifique',
					'Concéder un point à l’adversaire avant de le réfuter pour mieux convaincre'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: ليس أمراً.',
					'خطأ: ليس تسلسلاً زمنياً.',
					'خطأ: ليس تعريفاً علمياً.',
					'ممتاز: الاستدراك ثم الدحض يعكس إنصاف الكاتب ويقوي حجته المضادة.'
				],
				explanationAr: 'الاعتراف الجزئي (Certes...) يعطي الكاتب مصداقية قبل توجيه حجته الأساسية بعد (mais...).'
			},
			{
				questionAr: 'Complétez avec le bon subjonctif : « Quoiqu’ils .......... résoudre le problème seuls, ils demandent conseil. »',
				options: ['puissent', 'peuvent', 'pourront', 'pouvaient'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الفعل pouvoir في Subjonctif présent مع ils هو puissent.',
					'خطأ: peuvent في Indicatif.',
					'خطأ: pourront في Futur.',
					'خطأ: pouvaient في Imparfait.'
				],
				explanationAr: 'بعد quoique نضع الفعل pouvoir في المنصوب: qu’ils puissent.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 3: Modalisateurs, ironie maîtrisée et figures d’opposition
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_lp_t2_modalisateurs_figures_opposition',
		slug: 'fre-3as-lp-t2-modalisateurs-figures-opposition',
		grade: '3as_lp',
		yearSubjectId: 769,
		trimesterId: 't2',
		sequenceId: 'projet2',
		sequenceTitleAr: 'المشروع 2: Le débat d’idées (نقاش الأفكار والحجاج)',
		order: 3,
		titleAr: 'الموجهات التعبيرية والسخرية المنضبطة وصور التقابل (Modalisateurs, antithèse, parallélisme)',
		objectives: [
			'استخراج الموجهات التعبيرية (Modalisateurs) وتحديد دلالتها: اليقين، الشك، التقييم العاطفي أو الأخلاقي',
			'فهم السخرية المنضبطة (L’ironie / antiphrase) في تفنيد الأطروحات الضعيفة دون تجريح',
			'تحديد صورتي الطباق/التقابل (L’antithèse) والتوازي (Le parallélisme) وبيان أثرهما في ترسيخ الحجة'
		],
		keywordsAr: ['Modalisateurs', 'Certitude', 'Doute', 'Ironie', 'Antithèse', 'Parallélisme'],
		discover: {
			scenarioAr:
				'لإقناع القارئ، لا يكتفي كاتب المقال الفكري بالأدلة الجافة؛ بل يلوّن كلامه بموجهات اليقين أو الشك (sans doute, assurément, il semble que) وبصور بلاغية تبرز التضاد بوضوح مثل الطباق (Antithèse) والتوازي (Parallélisme).',
			svg: svgFrenchGrammarMap({
				title: 'Modalisateurs et figures d’opposition',
				rootLabel: 'Renforcer l’argumentation',
				rootSub: 'Comment l’auteur nuance et frappe les esprits ?',
				branches: [
					{
						label: 'Certitude / Doute',
						rule: 'indéniablement / peut-être',
						example: 'Il est évident que l’effort paie.'
					},
					{
						label: 'Antithèse',
						rule: 'Deux termes opposés rapprochés',
						example: 'Le savoir libère, l’ignorance enferme.'
					},
					{
						label: 'Parallélisme',
						rule: 'Même structure syntaxique répétée',
						example: 'Plus on lit, plus on réfléchit.'
					},
					{
						label: 'Ironie maîtrisée',
						rule: 'Dire le contraire pour critiquer',
						example: 'Quelle brillante idée d’oublier les livres !'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما دلالة الظرف « indéniablement » والعبارة « il semble que » في النص الحجاجي؟',
					hintAr: 'أحدهما يفيد اليقين القاطع، والآخر يفيد الترجيح والشك.',
					expectedInput: 'indéniablement = يقين (certitude) | il semble que = شك أو ترجيح (doute / incertitude)',
					revealAr: 'الموجهات (Modalisateurs) تحدد درجة يقين الكاتب أو تقييمه: اليقين (évidemment, sans aucun doute) مقابل الشك والاحتراز (peut-être, probablement, conditionnel).'
				},
				{
					promptAr: 'استخرج الصورة البلاغية في الجملة: « La vraie culture éclaire l’esprit, alors que la distraction excessive l’obscurcit. »',
					hintAr: 'لاحظ الفعلين المتضادين: éclaire و obscurcit.',
					expectedInput: 'طباق / تقابل (Une antithèse)',
					revealAr: 'اجتماع كلمتين متضادتين (éclaire / obscurcit) داخل الجملة الواحدة يُكوّن Antithèse تبرز الفارق الحاسم بين الفكرتين.'
				},
				{
					promptAr: 'ماذا نسمي التكرار البنيوي المتناظر في: « Éduquer l’esprit sans éduquer le cœur, c’est instruire sans former. »؟',
					hintAr: 'لاحظ توازن التركيب النحوي في شطري الجملة.',
					expectedInput: 'توازٍ نحوي (Un parallélisme de construction)',
					revealAr: 'التوازي (Le parallélisme) يكرر نفس القالب النحوي ليمنح الحجة إيقاعاً قوياً يسهل تذكّره والإقناع به.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الموجهات التعبيرية (Les modalisateurs): هي الأدوات التي تعبر عن موقف المتكلم تجاه قوله: (1) اليقين: certainement, indéniablement, il est évident que؛ (2) الشك/الاحتمال: peut-être, probablement, sembler, conditionnel (serait)؛ (3) التقييم الأخلاقي/الوجداني: heureusement, malheureusement, admirable, regrettable.',
				'الطباق أو التقابل (L’antithèse): الجمع في جملة أو فقرة بين لفظين أو فكرتين متضادتين (lumière / ombre، progrès / recul، sagesse / imprudence) لإبراز الصراع الفكري وإقناع القارئ.',
				'التوازي (Le parallélisme): تكرار نفس البنية النحوية في عبارتين متعاقبتين (Plus on travaille, plus on progresse) لإحداث وقع موزون وترسيخ الفكرة.',
				'السخرية المنضبطة (L’ironie / antiphrase): التعبير بعكس المقصود مع قرينة سياقية (مثل المزدوجتين أو التعجب) لكشف تناقض فكرة خاطئة بلباقة فكرية.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Familles de modalisateurs au BAC',
				subtitle: 'Identifier la nuance exacte dans les questions de langue',
				columns: [
					{
						header: 'Certitude',
						rule: 'Affirmer avec force',
						examples: 'assurément, nul doute, évident'
					},
					{
						header: 'Doute / Nuance',
						rule: 'Prendre de la distance',
						examples: 'sembler, prétendre, conditionnel'
					},
					{
						header: 'Jugement',
						rule: 'Évaluer moralement',
						examples: 'hélas, précieux, néfaste'
					}
				]
			}),
			visualCaptionAr: 'تصنيف الموجهات التعبيرية الأكثر وروداً في نصوص البكالوريا.',
			examples: [
				{
					problemAr: 'Quelle est la valeur du conditionnel dans : « Selon certains sites, l’écran remplacerait bientôt tous les professeurs. » ?',
					solutionAr: 'Le conditionnel exprime le doute et la mise à distance : l’auteur ne garantit pas cette affirmation.'
				},
				{
					problemAr: 'Identifiez la figure de style et son effet : « L’outil numérique est un bon serviteur mais un mauvais maître. »',
					solutionAr: 'C’est une antithèse (bon serviteur / mauvais maître) : elle souligne avec force la nécessité de maîtriser la technique au lieu de la subir.'
				},
				{
					problemAr: 'Relevez le parallélisme : « Respecter la loi protège le faible ; violer la loi menace la société. »',
					solutionAr: 'Parallélisme syntaxique (Infinitif + COD + Verbe + COD) couplé à une antithèse (respecter / violer, protège / menace).'
				}
			],
			watchOutAr: 'لا تخلط بين الطباق (Antithèse: الكلمتان المتضادتان منفصلتان في الجملة مثل « la sagesse bâtit, la précipitation détruit ») والأوكسيمور (Oxymore: الكلمتان متلاصقتان مباشرة مثل « une clarté obscure »).'
		},
		practice: [
			{
				questionAr: 'Quel procédé exprime le doute ou la prise de distance de l’auteur dans : « Cette méthode résoudrait toutes les difficultés » ?',
				options: [
					'Le passé simple',
					'L’impératif présent',
					'Le conditionnel présent (modalisateur d’incertitude)',
					'Le présent de vérité générale'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: الفعل ليس في الماضي البسيط.',
					'خطأ: ليس فعل أمر.',
					'ممتاز: الشرطي (conditionnel) يعبّر هنا عن معلومة غير مؤكدة يتبرأ الكاتب من ضمانها.',
					'خطأ: لا يقرر حقيقة ثابتة.'
				],
				explanationAr: 'يُعدّ الشرطي (conditionnel de réserve) من أشهر موجهات الشك وعدم التبني في المقالات.'
			},
			{
				questionAr: 'Identifiez la figure de style dans : « La persévérance élève les nations, tandis que la paresse les abaisse. »',
				options: ['Une antithèse', 'Une comparaison avec « comme »', 'Une onomatopée', 'Une énumération simple'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: تقابل واضح بين أزواج متضادة (persévérance/paresse و élève/abaisse).',
					'خطأ: لا توجد أداة تشبيه.',
					'خطأ: ليس محاكاة صوتية.',
					'خطأ: ليس مجرد تعداد.'
				],
				explanationAr: 'الطباق (Antithèse) يقابل بين فكرتين متضادتين لإبراز أثر كل منهما.'
			},
			{
				questionAr: 'Parmi ces adverbes, lequel est un modalisateur de certitude ?',
				options: ['Peut-être', 'Vraisemblablement', 'Probablement', 'Indéniablement'],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: peut-être يفيد الاحتمال والشك.',
					'خطأ: vraisemblablement يفيد الترجيح غير القاطع.',
					'خطأ: probablement يفيد الاحتمال.',
					'صحيح: indéniablement (بلا شك / لا يُنكر) يفيد اليقين القاطع.'
				],
				explanationAr: 'موجهات اليقين تشمل: indéniablement, assurément, certainement, sans aucun doute.'
			},
			{
				questionAr: 'Quelle figure reconnaît-on dans : « Sans effort, pas de progrès ; sans discipline, pas de réussite » ?',
				options: [
					'Une antiphrase ironique',
					'Un parallélisme de construction',
					'Une question rhétorique',
					'Une métaphore filée'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: المعنى جاد ومباشر بلا سخرية.',
					'أحسنت: تكرّر نفس البناء النحوي (Sans + Nom, pas de + Nom) في الشطرين.',
					'خطأ: الجملة خبرية وليست استفهامية.',
					'خطأ: لا توجد استعارة ممتدة.'
				],
				explanationAr: 'التوازي (Parallélisme) يكرر نفس الصيغة النحوية لتقوية الإيقاع الحجاجي.'
			},
			{
				questionAr: 'Dans un débat sur le gaspillage, dire « Quelle splendide preuve de sagesse que de jeter son pain chaque soir ! » relève de :',
				options: [
					'L’ironie (antiphrase) pour dénoncer un comportement blâmable',
					'L’éloge sincère du gaspillage',
					'L’objectivité scientifique neutre',
					'Une chronologie historique'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: استعمل الكاتب عبارة مدح ظاهرية (splendide preuve de sagesse) ليستهجن التبذير.',
					'خطأ: السياق يدين التبذير لا يمدحه.',
					'خطأ: التعجب والوصف التقييمي ينفيان الحياد.',
					'خطأ: لا توجد أحداث تاريخية.'
				],
				explanationAr: 'السخرية المنضبطة (antiphrase) تعبّر بمدح ظاهري لإبراز خطأ سلوك مرفوض.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 4: Connecteurs logiques (cause, conséquence, but) et substitution anaphorique
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_lp_t2_connecteurs_logiques_anaphore',
		slug: 'fre-3as-lp-t2-connecteurs-logiques-anaphore',
		grade: '3as_lp',
		yearSubjectId: 769,
		trimesterId: 't2',
		sequenceId: 'projet2',
		sequenceTitleAr: 'المشروع 2: Le débat d’idées (نقاش الأفكار والحجاج)',
		order: 4,
		titleAr: 'الروابط المنطقية (السبب، النتيجة، الغاية) والإحالة النصية (Substitution anaphorique)',
		objectives: [
			'الربط الدقيق بين الجمل باستعمال روابط السبب (parce que, grâce à, à cause de)، والنتيجة (donc, par conséquent, si bien que)، والغاية (pour que + subjonctif, afin de + infinitif)',
			'تمييز الفروق الدقيقة بين grâce à (سبب إيجابي) و à cause de (سبب سلبي)، وبين afin de (نفس الفاعل) و afin que (فاعلان مختلفان)',
			'تحديد مراجع الضمائر والبدائل المعجمية (Substituts grammaticaux et lexicaux) لضمان نقطة سؤال الإحالة في البكالوريا'
		],
		keywordsAr: ['Cause', 'Conséquence', 'But', 'Connecteurs logiques', 'Substituts grammaticaux', 'Substituts lexicaux'],
		discover: {
			scenarioAr:
				'في كل امتحان بكالوريا فرنسية تقريباً، ترد مسألتان أساسيتان في البناء اللغوي: (1) تحديد العلاقة المنطقية أو استبدال رابط بآخر (السبب/النتيجة/الغاية)، و(2) سؤال الإحالة: « À qui ou à quoi renvoient les mots soulignés ? ».',
			svg: svgFrenchGrammarMap({
				title: 'Rapports logiques essentiels (BAC LP)',
				rootLabel: 'Articuler les arguments',
				rootSub: 'Identifier le lien logique et respecter la syntaxe',
				branches: [
					{
						label: 'Cause',
						rule: 'car, parce que, grâce à (+), à cause de (-)',
						example: 'Il réussit grâce à sa rigueur.'
					},
					{
						label: 'Conséquence',
						rule: 'donc, par conséquent, si bien que',
						example: 'Il lit, donc il enrichit sa langue.'
					},
					{
						label: 'But (Objectif)',
						rule: 'afin de + inf. / pour que + subj.',
						example: 'Nous débattons afin de progresser.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الفرق في الاستعمال بين « grâce à » و « à cause de »؟',
					hintAr: 'تأمل الجملتين: « Il progresse grâce à son sérieux » و « Il échoue à cause de la négligence ».',
					expectedInput: 'grâce à لسبب إيجابي محمود، و à cause de لسبب سلبي مذموم (كلاهما متبوع باسم)',
					revealAr: '« grâce à + nom » تعبر عن سبب يؤدي إلى نتيجة إيجابية؛ أما « à cause de + nom » فتعبر عن سبب يؤدي إلى نتيجة سلبية.'
				},
				{
					promptAr: 'لماذا نكتب « Il révise afin de réussir » ولا نكتب « Il révise afin qu’il réussisse »؟',
					hintAr: 'انظر إلى الفاعل في الشطرين: هل هو نفس الشخص أم شخصان مختلفان؟',
					expectedInput: 'لأن الفاعل واحد في الجملتين، فنستعمل afin de / pour + infinitif',
					revealAr: 'القاعدة الذهبية للغاية: فاعل واحد = pour / afin de + infinitif؛ فاعلان مختلفان = pour que / afin que + subjonctif (ex. : Le maître explique afin que les élèves comprennent).'
				},
				{
					promptAr: 'في الفقرة: « La lecture forge l’esprit critique. Elle offre aux jeunes un rempart solide. Cette pratique noble mérite d’être encouragée. » ما البديل النحوي والبديل المعجمي لكلمة « La lecture »؟',
					hintAr: 'البديل النحوي ضمير (pronom)، والبديل المعجمي اسم أو عبارة اسمية مرادفة.',
					expectedInput: 'البديل النحوي: Elle | البديل المعجمي: Cette pratique noble',
					revealAr: 'البدائل (Les substituts) تمنع التكرار وتربط الجمل: الضمائر (il, elle, en, y, celui-ci, dont) بدائل نحوية، والعبارات المرادفة (cette pratique, cet outil) بدائل معجمية.'
				}
			]
		},
		summary: {
			rulesAr: [
				'السبب (La cause): parce que، car، puisque، comme (في بداية الجملة دائماً!) + جملة فعلية؛ أما grâce à (إيجابي)، à cause de (سلبي)، en raison de (محايد) + مجموعة اسمية.',
				'النتيجة (La conséquence): donc، alors، par conséquent، c’est pourquoi، si bien que، tellement... que + Indicatif؛ أما trop... pour que + Subjonctif.',
				'الغاية (Le but): (1) فاعل واحد -> pour، afin de، dans le but de + Infinitif؛ (2) فاعلان مختلفان -> pour que، afin que، de peur que + Subjonctif.',
				'الإحالة النصية (La substitution anaphorique): للعثور على مرجع الضمير المسطر تحته (il, le, lui, en, y, dont, celui-ci)، نبحث دائماً قبله (في نفس الجملة أو الجملة السابقة) مع مراعاة التوافق في النوع (مذكر/مؤنث) والعدد (مفرد/جمع).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Maîtriser les substituts grammaticaux',
				subtitle: 'Trouver le référent exact sans hésitation',
				columns: [
					{
						header: 'le / la / les / lui / leur',
						rule: 'COD (le/la/les) | COI (lui/leur)',
						examples: 'Je lui parle (= au professeur)'
					},
					{
						header: 'en / y',
						rule: 'en = de + nom | y = à + lieu/chose',
						examples: 'Il en parle (= du débat)'
					},
					{
						header: 'celui-ci / dont / où',
						rule: 'Reprise précise du nom proche',
						examples: 'Le livre dont il parle'
					}
				]
			}),
			visualCaptionAr: 'دليل سريع لفك رموز الضمائر المسطر تحتها في أسئلة الفهم بالبكالوريا.',
			examples: [
				{
					problemAr: 'Exprimez la conséquence inverse : « Le citoyen respecte la propreté publique parce qu’il aime sa ville. »',
					solutionAr: 'Le citoyen aime sa ville, par conséquent (donc / c’est pourquoi) il respecte la propreté publique.'
				},
				{
					problemAr: 'Reliez par un rapport de but : « Les professeurs organisent des ateliers. Les élèves améliorent leur expression écrite. »',
					solutionAr: 'Les professeurs organisent des ateliers afin que (pour que) les élèves améliorent leur expression écrite.'
				},
				{
					problemAr: 'À quoi renvoie « y » dans : « La bibliothèque municipale est calme ; les lycéens s’y rendent chaque samedi. » ?',
					solutionAr: '« y » renvoie à « la bibliothèque municipale ».'
				}
			],
			watchOutAr: 'انتبه عند تحويل جملة سببية إلى نتيجة: يجب قلب ترتيب الشطرين! السبب يأتي أولاً ثم رابط النتيجة (donc / par conséquent) ثم النتيجة.'
		},
		practice: [
			{
				questionAr: 'Complétez avec le bon connecteur de cause : « Le débat a échoué .......... manque d’écoute mutuelle. »',
				options: ['grâce au', 'à cause du', 'parce que', 'afin de'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: grâce à لسبب إيجابي بينما الفشل نتيجة سلبية.',
					'صحيح: الفشل نتيجة سلبية متبوعة باسم (le manque)، فنستعمل à cause du.',
					'خطأ: parce que تتطلب جملة فعلية كاملة.',
					'خطأ: afin de تعبر عن الغاية لا السبب.'
				],
				explanationAr: 'للتعبير عن سبب سلبي متبوع باسم نستعمل « à cause de ».'
			},
			{
				questionAr: 'Choisissez la bonne phrase exprimant le but avec deux sujets différents :',
				options: [
					'Les parents encouragent la lecture afin que leurs enfants développent leur esprit.',
					'Les parents encouragent la lecture afin de leurs enfants développent leur esprit.',
					'Les parents encouragent la lecture pour développer leurs enfants leur esprit.',
					'Les parents encouragent la lecture parce que leurs enfants développent leur esprit.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: الفاعلان مختلفان (les parents / leurs enfants) فاستعملنا afin que + subjonctif.',
					'خطأ: afin de تتبع بالمصدر فقط لا بفاعل وفعل.',
					'خطأ: تركيب غير سليم نحوياً.',
					'خطأ: parce que تعبر عن السبب لا الغاية.'
				],
				explanationAr: 'مع فاعلين مختلفين نستخدم pour que / afin que + subjonctif.'
			},
			{
				questionAr: 'Dans : « L’éthique guide la science ; sans elle, la technique deviendrait aveugle. » À quoi renvoie « elle » ?',
				options: ['la technique', 'la science', 'l’éthique', 'aveugle'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: التقنية وردت بعد الضمير لا قبله.',
					'خطأ: المعنى أن الأخلاق هي التي توجّه العلم، وبغير الأخلاق تعمى التقنية.',
					'صحيح: الضمير « elle » يحيل إلى الفاعل السابق « l’éthique ».',
					'خطأ: aveugle صفة لا يحيل إليها الضمير.'
				],
				explanationAr: 'تحديد المرجع يعتمد على التوافق النحوي (مفرد مؤنث) وعلى اتساق المعنى في الجملة.'
			},
			{
				questionAr: 'Quel rapport logique exprime « si bien que » dans : « Son argumentaire était limpide, si bien que l’auditoire a été convaincu » ?',
				options: ['La cause', 'La concession', 'Le but', 'La conséquence'],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: السبب هو وضوح الحجج في الشطر الأول.',
					'خطأ: لا يوجد تضاد بين الشطرين.',
					'خطأ: الاقتناع حدث فعلياً وليس مجرد هدف مرتقب.',
					'أحسنت: « si bien que » من أبرز روابط النتيجة (conséquence).'
				],
				explanationAr: 'الرابط « si bien que » يدخل جملة النتيجة المصرفة في Indicatif.'
			},
			{
				questionAr: 'Dans : « Les réseaux sociaux captent l’attention ; beaucoup de jeunes en abusent. » Que remplace le pronom « en » ?',
				options: [
					'les réseaux sociaux (abuser de + les réseaux sociaux)',
					'beaucoup de jeunes',
					'l’attention',
					'un lieu précis'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الفعل abuser يتعدى بحرف الجر de (abuser des réseaux sociaux -> en abuser).',
					'خطأ: beaucoup de jeunes هو الفاعل.',
					'خطأ: السياق يتحدث عن الإفراط في استعمال الشبكات الاجتماعية.',
					'خطأ: المكان يعوَّض عادة بـ y.'
				],
				explanationAr: 'الضمير « en » يعوّض اسماً مسبوقاً بحرف الجر « de ».'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 5: Rédiger un essai argumentatif ou un compte rendu critique de débat
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_lp_t2_essai_crc_debat',
		slug: 'fre-3as-lp-t2-essai-crc-debat',
		grade: '3as_lp',
		yearSubjectId: 769,
		trimesterId: 't2',
		sequenceId: 'projet2',
		sequenceTitleAr: 'المشروع 2: Le débat d’idées (نقاش الأفكار والحجاج)',
		order: 5,
		titleAr: 'تحرير مقال حجاجي أو تقرير نقدي لنص نقاش أفكار (BAC LP — 7 points)',
		objectives: [
			'بناء مقال حجاجي جدلي (Plan dialectique : Introduction, Thèse, Antithèse/Réfutation, Synthèse) بلغة فصيحة ومترابطة',
			'صياغة تقرير نقدي متكامل لنص نقاش أفكار يبرز الإشكالية والأطروحتين المتقابلتين ونقداً بنّاءً لجودة الحجج',
			'توظيف الروابط الحجاجية وعبارات الانتقال السلس بين الفقرات لتفادي التشتت والتكرار'
		],
		keywordsAr: ['Essai argumentatif', 'Plan dialectique', 'Problématique', 'Compte rendu critique', 'Transitions'],
		discover: {
			scenarioAr:
				'في موضوع البكالوريا (شعبة آداب وفلسفة)، تُمنح للتعبير الكتابي 7 نقاط كاملة بين خيارين: التقرير النقدي لنص النقاش (Sujet 1)، أو تحرير مقال حجاجي شخصي حول قضية فكرية أو تربوية أو أخلاقية (Sujet 2). كيف تضمن بناءً متماسكاً في كلا الخيارين؟',
			svg: svgFrenchWritingBlueprint({
				title: 'Plan dialectique d’un essai argumentatif (BAC LP)',
				steps: [
					{
						stage: '1. Introduction',
						detail: 'Amener le sujet + poser clairement la problématique (?)'
					},
					{
						stage: '2. Thèse (Pour)',
						detail: 'Exposer les arguments favorables + un exemple concret'
					},
					{
						stage: '3. Antithèse (Limites)',
						detail: 'Transition (Cependant...) + arguments opposés / réfutation'
					},
					{
						stage: '4. Conclusion',
						detail: 'Synthèse équilibrée + position personnelle argumentée'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما العنصران الضروريان في مقدمة المقال الحجاجي (Introduction)؟',
					hintAr: 'كيف نمهّد للموضوع ثم نطرح السؤال الإشكالي؟',
					expectedInput: 'تمهيد عام (Mise en contexte) + طرح الإشكالية بسؤال واضح (Problématique)',
					revealAr: 'تبدأ المقدمة بتمهيد واقعي (De nos jours, le numérique occupe une place croissante...) ثم تُختم بسؤال إشكالي دقيق (Dès lors, favorise-t-il vraiment la réussite scolaire ou nuit-il à l’effort personnel ?).'
				},
				{
					promptAr: 'كيف ننتقل بسلاسة من فقرة المؤيدين إلى فقرة المعارضين أو الحدود؟',
					hintAr: 'نحتاج رابط استدراك وتعارض قوي في بداية الفقرة الثالثة.',
					expectedInput: 'استعمال جملة انتقالية برابط تعارض (Cependant / Toutefois / En revanche, cette approche présente certaines limites...)',
					revealAr: 'الانتقال المحكم (Transition) مثل « Toutefois, un usage non maîtrisé comporte des risques indéniables » يمنع التفكك ويُظهر النضج الفكري.'
				},
				{
					promptAr: 'في التقرير النقدي لنص نقاش أفكار، ماذا يجب إضافته مقارنة بتقرير النص التاريخي؟',
					hintAr: 'تذكر خصوصية نص النقاش: الإشكالية، الأطروحتان، الحجج، والوقفة النقدية حول قوة الإقناع.',
					expectedInput: 'ذكر الإشكالية وتقابل الأطروحتين في التلخيص، وتقييم قوة الحجج والإنصاف في الفقرة النقدية',
					revealAr: 'في تقرير نص النقاش نقول: « L’auteur expose d’abord la thèse des partisans... puis il présente les arguments des opposants... » وفي النقد نقيّم موضوعية الكاتب وقوة أمثلته.'
				}
			]
		},
		summary: {
			rulesAr: [
				'هيكل المقال الجدلي (150 إلى 180 كلمة لآداب وفلسفة): (1) مقدمة (تمهيد + إشكالية)؛ (2) فقرة العرض الأولى (D’une part, les partisans estiment que... En effet... Par exemple...)؛ (3) فقرة العرض الثانية (D’autre part / Cependant, les détracteurs soulignent que... En outre...)؛ (4) خاتمة تركيبية (En somme, il convient de concilier... / Pour ma part, j’estime que...).',
				'في التقرير النقدي لنص نقاش الأفكار: نذكر في المقدمة نوع النص (un texte argumentatif / un débat d’idées)، والكاتب والمصدر والإشكالية والغاية (convaincre / amener à réfléchir)، ثم نلخص الأطروحات والحجج بضمير الغائب، ثم نكتب فقرة نقدية نعلّق فيها على وجاهة الحجج ووضوح الأسلوب.',
				'مفاتيح التنقيط في البكالوريا (7 نقاط LP): ملاءمة الموضوع (Pertinence)، التماسك والانتقال المنطقي (Cohérence)، سلامة اللغة وتنويع الروابط (Correction de la langue)، والإبداع ونظافة العرض (Perfectionnement).'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Articulateurs indispensables de l’essai',
				rootLabel: 'Cohérence du discours argumentatif',
				rootSub: 'Varier les liens sans répétition',
				branches: [
					{
						label: 'Classer',
						rule: 'D’abord, Ensuite, Enfin',
						example: 'D’une part... d’autre part...'
					},
					{
						label: 'Expliquer / Illustrer',
						rule: 'En effet, Notamment',
						example: 'Par exemple, à titre d’illustration'
					},
					{
						label: 'Opposer / Nuancer',
						rule: 'Cependant, En revanche',
						example: 'Certes... mais / Toutefois'
					},
					{
						label: 'Conclure',
						rule: 'En somme, En définitive',
						example: 'Pour conclure, il faut allier...'
					}
				]
			}),
			visualCaptionAr: 'الروابط المنهجية لرفع علامة الاتساق والتنظيم في المقال الحجاجي.',
			examples: [
				{
					problemAr: 'Formulez une problématique sur le thème : « Les réseaux sociaux et la réussite scolaire ».',
					solutionAr: '« Les réseaux sociaux constituent-ils un véritable outil d’entraide pédagogique ou représentent-ils plutôt une source majeure de distraction pour les lycéens ? »'
				},
				{
					problemAr: 'Rédigez une phrase de synthèse équilibrée en conclusion.',
					solutionAr: '« En définitive, la technologie n’est ni bonne ni mauvaise en soi : seule une discipline rigoureuse permet d’en faire un levier de savoir plutôt qu’un obstacle à l’étude. »'
				},
				{
					problemAr: 'Formulez un jugement critique sur un texte de débat équilibré.',
					solutionAr: '« Pour ma part, j’apprécie l’honnêteté intellectuelle de l’auteur qui confronte les deux thèses avec des exemples concrets et un style accessible, tout en invitant le lecteur à exercer son esprit critique. »'
				}
			],
			watchOutAr: 'تجنّب كتابة المقال ككتلة واحدة بلا فقرات! اترك فراغاً (alinéa) وسطر فاصل واضح بين المقدمة وفقرات العرض والخاتمة ليرى المصحّح بنية مقالك من النظرة الأولى.'
		},
		practice: [
			{
				questionAr: 'Dans un essai argumentatif à plan dialectique, que contient obligatoirement l’introduction ?',
				options: [
					'Uniquement une liste d’exemples détaillés',
					'Une mise en contexte du thème suivie d’une problématique claire',
					'La conclusion finale dès la première ligne',
					'Une bibliographie complète de dix ouvrages'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الأمثلة المفصلة مكانها في فقرات العرض.',
					'صحيح: تبدأ المقدمة بتمهيد عام وتُختم بسؤال إشكالي واضح.',
					'خطأ: الخاتمة تأتي بعد مناقشة الحجج.',
					'خطأ: لا نضع قائمة مراجع في مقال البكالوريا.'
				],
				explanationAr: 'المقدمة المنهجية تضع القارئ في سياق الموضوع ثم تصوغ الإشكالية.'
			},
			{
				questionAr: 'Quel connecteur convient le mieux pour introduire la partie « Antithèse / Limites » ?',
				options: ['Cependant / En revanche', 'De la même façon', 'Par exemple', 'En conclusion'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: « Cependant » و « En revanche » تعلنان الانتقال إلى الرأي المقابل أو الحدود.',
					'خطأ: تفيد التشابه لا المقابلة.',
					'خطأ: لتقديم مثال داعم.',
					'خطأ: للخاتمة لا للفقرة الثانية من العرض.'
				],
				explanationAr: 'الانتقال من الأطروحة إلى النقيض يتطلب رابط تعارض أو استدراك.'
			},
			{
				questionAr: 'Quelle conclusion est la plus réussie pour un essai dialectique sur le progrès technique et l’éthique ?',
				options: [
					'Voilà, j’ai fini mon essai.',
					'Je ne sais pas qui a raison dans ce débat.',
					'En somme, le progrès technique ne profite durablement à l’humanité que s’il demeure guidé par la responsabilité morale.',
					'D’abord, la technologie aide les médecins.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: عبارة عامية غير أكاديمية.',
					'خطأ: الخاتمة تقدم تركيباً متوازناً لا عجزاً عن الجواب.',
					'صحيح: خاتمة تركيبية راقية تجيب عن الإشكالية وتجمع بين العلم والأخلاق.',
					'خطأ: هذه جملة عرض وليست خاتمة.'
				],
				explanationAr: 'الخاتمة الجدلية تقدّم خلاصة متوازنة (synthèse) وتجيب بوضوح عن الإشكالية.'
			},
			{
				questionAr: 'Dans le barème officiel du BAC 3AS Lettres et Philosophie, combien de points vaut la Production écrite ?',
				options: ['4 points', '5 points', '6 points', '7 points'],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: 4 نقاط ليست سلم البكالوريا.',
					'خطأ: 5 نقاط لا توافق الفرنسية آداب وفلسفة.',
					'خطأ: 6 نقاط للشعب العلمية وتسيير واقتصاد.',
					'أحسنت: في بكالوريا آداب وفلسفة، الإنتاج الكتابي على 7 نقاط (و13 نقطة لفهم النص).'
				],
				explanationAr: 'توزيع نقاط بكالوريا الفرنسية آداب وفلسفة هو 13 (7 + 6) لفهم النص + 7 للإنتاج الكتابي.'
			},
			{
				questionAr: 'Quel verbe convient le mieux dans un compte rendu critique pour résumer la réfutation d’un auteur ?',
				options: [
					'L’auteur réfute / conteste cette idée en démontrant que...',
					'L’auteur raconte un voyage touristique en disant...',
					'L’auteur donne un ordre militaire pour...',
					'L’auteur copie la page suivante...'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الفعلان réfuter و contester يعكسان بدقة حركة الدحض الحجاجي.',
					'خطأ: لا يناسب نص نقاش الأفكار.',
					'خطأ: لا يناسب السياق الحجاجي.',
					'خطأ: عبارة غير لائقة بالتقرير.'
				],
				explanationAr: 'اختيار أفعال تقرير دقيقة (soutient, concède, réfute, nuance) يرفع جودة التقرير النقدي.'
			}
		]
	}
];
