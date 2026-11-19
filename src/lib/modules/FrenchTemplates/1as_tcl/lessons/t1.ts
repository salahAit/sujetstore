import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchWritingBlueprint
} from '../../svg-french';

// ============================================================================
// 5 Interactive Lessons — 1AS TCL Trimester 1
// Projet 1 : Texte de vulgarisation culturelle et scientifique
// (Patrimoine, livres, science islamique)
// ============================================================================

export const LESSONS_1AS_TCL_T1: FrenchInteractiveLessonData[] = [
	// 1. Les procédés explicatifs et la structure du texte documentaire
	{
		id: 'fre_lesson_1as_tcl_t1_procedes_texte_documentaire',
		slug: 'fre-1as-tcl-t1-procedes-texte-documentaire',
		grade: '1as_tcl',
		yearSubjectId: 665,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 1: النص التفسيري الثقافي والعلمي — التراث، الكتاب، والعلوم الإسلامية',
		order: 1,
		titleAr: 'الأساليب التفسيرية وبنية النص الوثائقي (Les procédés explicatifs et le texte documentaire)',
		objectives: [
			'فهم المراحل الثلاث لبنية النص الوثائقي التفسيري: مرحلة التساؤل/التقديم، مرحلة الشرح، ومرحلة الخلاصة',
			'استخراج الأساليب التفسيرية (التعريف، التسمية، إعادة الصياغة، التمثيل، التعداد، الوظيفة) في نص ثقافي أو تاريخي',
			'التعرف على وظيفة علامات الترقيم التفسيرية (النقطتان، القوسان، والعارضتان)'
		],
		keywordsAr: [
			'Texte documentaire',
			'Procédés explicatifs',
			'Phase de questionnement',
			'Phase d’explication',
			'Phase de conclusion'
		],
		discover: {
			scenarioAr:
				'اقرأ مقتطفا من نص وثائقي حول التراث الإسلامي: « Qu’est-ce qu’un manuscrit enluminé ? Un manuscrit désigne un ouvrage copié entièrement à la main avant l’invention de l’imprimerie. Autrement dit, chaque page résultait du travail patient d’un copiste appelé le calligraphe. Dans les bibliothèques anciennes, telles que celle de Tlemcen ou de Béjaïa, on conservait des traités d’astronomie, de médecine et de grammaire. Ces œuvres servaient à transmettre le savoir aux générations futures. »',
			svg: svgFrenchWritingBlueprint({
				title: 'Structure du texte explicatif / documentaire',
				steps: [
					{
						stage: '1. Questionnement',
						detail: 'Annonce du thème ou question implicite/explicite (Qu’est-ce que ?).'
					},
					{
						stage: '2. Explication',
						detail: 'Définition, dénomination, exemples, reformulation et fonctions.'
					},
					{
						stage: '3. Conclusion',
						detail: 'Bilan synthétique montrant la valeur ou le rôle durable du sujet.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما المراحل الثلاث التي بنى عليها الكاتب نصه الوثائقي عن المخطوطات؟',
					hintAr: 'لاحظ السؤال في البداية، ثم الشرح بالأمثلة، ثم الجملة الأخيرة.',
					expectedInput: 'مرحلة التساؤل، مرحلة التفسير والشرح، ومرحلة الخلاصة',
					revealAr: 'ينتظم النص الوثائقي في 3 مراحل: التساؤل (Qu’est-ce qu’un manuscrit ?)، فالتفسير (التعريف، إعادة الصياغة، التمثيل)، فالخلاصة (دورها في نقل العلم للأجيال).'
				},
				{
					promptAr: 'استخرج من المقتطف أسلوب التسمية (la dénomination) وأسلوب التمثيل (l’illustration).',
					hintAr: 'ابحث عن « appelé » وعن « telles que ».',
					expectedInput: 'appelé le calligraphe (dénomination) / telles que celle de Tlemcen ou de Béjaïa (illustration)',
					revealAr: '« appelé le calligraphe » يمثّل التسمية، و« telles que celle de Tlemcen ou de Béjaïa » يمثّل التمثيل.'
				},
				{
					promptAr: 'ماذا يمكن أن تؤدي النقطتان ( : ) أو القوسان ( ) في النص الوثائقي؟',
					hintAr: 'مثال: « La Casbah abrite plusieurs édifices : mosquées, palais et fontaines. »',
					expectedInput: 'تقدّم النقطتان تعدادا أو تعريفا، ويقدّم القوسان شرحا أو مثالا أو إعادة صياغة',
					revealAr: 'علامات الترقيم ( : ) و( ( ) ) و( — ... — ) تعمل كأدوات تفسيرية لإدخال التعداد أو التفسير أو الأمثلة دون إطالة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'بنية النص التفسيري الوثائقي (Structure du texte documentaire): 1) مرحلة التساؤل أو التقديم (Phase de questionnement: طرح سؤال مباشر أو ضمني)، 2) مرحلة الشرح والتوضيح (Phase d’explication: جوهر النص بالأساليب التفسيرية)، 3) مرحلة الخلاصة (Phase de conclusion: حوصلة لأهمية الموضوع).',
				'أهم الأساليب التفسيرية: التعريف (est, désigne, consiste à)، التسمية (s’appelle, est appelé, nommé)، إعادة الصياغة (c’est-à-dire, autrement dit)، التمثيل (par exemple, tel que, notamment)، التعداد (l’énumération: ذكر عدة عناصر تفصلها فواصل)، والوظيفة (sert à, permet de).',
				'تضفي العناوين الفرعية والمصادر والتواريخ الدقيقة والصور التوضيحية مصداقية علمية وتاريخية على النص الوثائقي.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Les procédés explicatifs du texte culturel',
				rootLabel: 'Rendre le patrimoine et la science clairs',
				branches: [
					{
						label: 'Définition & Nom',
						rule: 'désigne / est appelé',
						example: 'La qasba désigne une citadelle.'
					},
					{
						label: 'Énumération',
						rule: 'suite de noms séparés (,)',
						example: 'algèbre, optique et médecine'
					},
					{
						label: 'Reformulation & Ex.',
						rule: 'c’est-à-dire / tel que',
						example: 'des savants tels qu’Al-Idrisi'
					}
				]
			}),
			visualCaptionAr: 'الأساليب التفسيرية الأكثر توظيفا في النصوص الوثائقية الثقافية',
			examples: [
				{
					problemAr: 'حدّد الأسلوب التفسيري في: « Ibn Khaldoun a fondé une science nouvelle : la sociologie historique. »',
					solutionAr: 'La dénomination / L’explication par deux points (تسمية وتحديد بعد النقطتين).'
				},
				{
					problemAr: 'حدّد الأسلوب التفسيري في: « La bibliothèque de Béjaïa renfermait des livres de droit, de médecine, de mathématiques et d’astronomie. »',
					solutionAr: 'L’énumération (التعداد) لذكر أربعة تخصصات متتالية.'
				}
			],
			watchOutAr:
				'في النص الوثائقي قد تكون مرحلة التساؤل ضمنية (بدون علامة استفهام)، كأن يبدأ النص بجملة تمهيدية تعرّف بالمَعلم أو العالِم ثم ينتقل مباشرة إلى شرح تاريخه وخصائصه.'
		},
		practice: [
			{
				questionAr: 'ما المراحل الثلاث الكبرى التي يتكون منها النص التفسيري الوثائقي؟',
				options: [
					'Situation initiale — Élément perturbateur — Morale',
					'Phase de questionnement — Phase d’explication — Phase de conclusion',
					'Thèse — Antithèse — Synthèse polémique',
					'En-tête — Formule d’appel — Signature'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه مراحل البنية السردية للقصة.',
					'أحسنت! النص التفسيري الوثائقي ينتظم في تساؤل ثم تفسير ثم خلاصة.',
					'هذه بنية المقال الجدلي النقدي.',
					'هذه بنية الرسالة المفتوحة.'
				],
				explanationAr: 'يتكون النص التفسيري من: التساؤل (questionnement)، التفسير (explication)، والخلاصة (conclusion).'
			},
			{
				questionAr: 'ما الأسلوب التفسيري المستعمل في: « La Vallée du M’Zab comprend cinq cités anciennes : El-Atteuf, Bounoura, Melika, Beni Isguen et Ghardaïa. »؟',
				options: ['L’énumération', 'La fonction', 'La reformulation', 'La comparaison'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! ذكر القصور الخمسة متتالية بعد النقطتين يمثّل أسلوب التعداد (l’énumération).',
					'الجملة لا تبيّن وظيفة معمارية محددة.',
					'لا يوجد رابط لإعادة الصياغة.',
					'لا توجد أداة مقارنة.'
				],
				explanationAr: 'سرد عدة عناصر متتابعة مفصولة بفواصل بعد نقطتين يشكّل التعداد (énumération).'
			},
			{
				questionAr: 'حدّد الأسلوب التفسيري في: « L’astrolabe servait aux navigateurs musulmans à mesurer la hauteur des étoiles. »',
				options: ['La dénomination', 'La fonction', 'La reformulation', 'L’illustration'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الجملة لا تعطي اسما جديدا للجهاز.',
					'صحيح! الفعل « servait à » يبيّن وظيفة الأسطرلاب واستعماله (La fonction).',
					'لا توجد إعادة صياغة.',
					'لا يوجد مثال مسبوق بـ par exemple.'
				],
				explanationAr: 'الفعل « servir à » يدل مباشرة على الوظيفة (La fonction).'
			},
			{
				questionAr: 'في الجملة: « Al-Khwarizmi a rédigé un traité fondamental, c’est-à-dire un livre méthodique consacré au calcul algébrique. » ما الأسلوب الموظف؟',
				options: ['La reformulation', 'L’énumération', 'La dénomination', 'La comparaison'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! العبارة « c’est-à-dire » تعيد شرح كلمة « traité » بأسلوب أوضح (La reformulation).',
					'لا يوجد تعداد لعدة عناصر.',
					'لا توجد تسمية بعبارة s’appelle.',
					'لا توجد مقارنة.'
				],
				explanationAr: '« c’est-à-dire » هو المؤشر الأول لأسلوب إعادة الصياغة.'
			},
			{
				questionAr: 'ما الغاية التواصلية الأساسية للنص الوثائقي حول التراث والعلوم الإسلامية؟',
				options: [
					'Informer et expliquer de manière claire et documentée',
					'Faire rire le lecteur par une scène comique',
					'Donner des consignes de sécurité routière',
					'Raconter un rêve imaginaire'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة موفقة! النص الوثائقي يهدف إلى الإعلام والشرح الموثّق.',
					'النص الوثائقي جاد ومعرفي لا فكاهي.',
					'ليست له وظيفة إيعازية مرورية.',
					'يستند إلى حقائق تاريخية وعلمية لا أحلام خيالية.'
				],
				explanationAr: 'غاية النص الوثائقي هي الإعلام والتفسير (informer et expliquer).'
			}
		]
	},

	// 2. L'objectivité vs la subjectivité
	{
		id: 'fre_lesson_1as_tcl_t1_objectivite_subjectivite',
		slug: 'fre-1as-tcl-t1-objectivite-subjectivite',
		grade: '1as_tcl',
		yearSubjectId: 665,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 1: النص التفسيري الثقافي والعلمي — التراث، الكتاب، والعلوم الإسلامية',
		order: 2,
		titleAr: 'الموضوعية مقابل الذاتية في الخطاب (L’objectivité vs la subjectivité)',
		objectives: [
			'التمييز الدقيق بين النص الموضوعي المحايد (objectif) والنص الذاتي (subjectif) الذي يظهر فيه حكم الكاتب ومشاعره',
			'استخراج مؤشرات الموضوعية (غياب je، المبني للمجهول، الصيغة غير الشخصية، المعجم المحايد) ومؤشرات الذاتية (je/nous، المعجم التقييمي الإيجابي أو السلبي، التعجب)',
			'إعادة كتابة جمل ذاتية بصياغة موضوعية مناسبة لنص وثائقي ثقافي'
		],
		keywordsAr: [
			'Objectivité',
			'Subjectivité',
			'Lexique neutre',
			'Lexique évaluatif',
			'Voix passive'
		],
		discover: {
			scenarioAr:
				'قارن بين وصفين للجامع الكبير بتلمسان: النص (أ): « La Grande Mosquée de Tlemcen a été édifiée au XIe siècle. Elle se caractérise par son minaret quadrangulaire et sa coupole ajourée. » النص (ب): « Je trouve la Grande Mosquée de Tlemcen absolument splendide ! Son architecture merveilleuse m’émerveille chaque fois que je la visite. » ما الفروق اللغوية الواضحة بين النصين؟',
			svg: svgFrenchGrammarMap({
				title: 'Comparer Objectivité et Subjectivité',
				rootLabel: 'Position de l’énonciateur face au thème',
				branches: [
					{
						label: 'Texte Objectif',
						rule: 'Pas de je/nous, faits vérifiables',
						example: 'Construit en 1082, il mesure...'
					},
					{
						label: 'Texte Subjectif',
						rule: 'Je/nous + jugement + émotions',
						example: 'Je trouve ce lieu splendide !'
					},
					{
						label: 'Outils objectifs',
						rule: 'Passif, il impersonnel, on',
						example: 'Il existe / On conserve...'
					}
				]
			}),
			steps: [
				{
					promptAr: 'أي النصين موضوعي (objectif) وأيهما ذاتي (subjectif)؟ برّر إجابتك بمؤشرين من كل نص.',
					hintAr: 'راقب الضمائر، الصفات (quadrangulaire مقابل splendide)، وعلامة التعجب.',
					expectedInput: 'النص (أ) موضوعي (تاريخ دقيق، مبني للمجهول، صفات محايدة) — النص (ب) ذاتي (Je، صفات تقييمية splendide/merveilleuse، تعجب)',
					revealAr: 'النص (أ) موضوعي لأنه يعرض حقائق قابلة للتحقق بلا ضمير متكلم وبمفردات محايدة. أما النص (ب) فذاتي لحضور « Je » والصفات الانفعالية وعلامة التعجب.'
				},
				{
					promptAr: 'هل تكفي إزالة الضمير « je » لتصبح الجملة موضوعية تماما؟ اختبر: « Ce monument est extraordinaire et incomparable ! »',
					hintAr: 'هل كلمتا « extraordinaire » و« incomparable » حقيقتان مقاستين أم حكم قيمة؟',
					expectedInput: 'لا، تبقى ذاتية بشكل ضمني بسبب الصفات التقييمية وعلامة التعجب',
					revealAr: 'الذاتية نوعان: صريحة (explicite: je, moi, mon) وضمنية (implicite: صفات مدح أو ذم مثل splendide, affreux وعلامات تعجب). النص الموضوعي يتجنب الاثنين معا!'
				},
				{
					promptAr: 'حوّل الجملة الذاتية « Je trouve les livres anciens très précieux et admirables » إلى جملة موضوعية وثائقية.',
					hintAr: 'استعمل المبني للمجهول أو فعلا محايدا مع حقائق ملموسة.',
					expectedInput: 'Les livres anciens sont conservés dans les bibliothèques pour leur valeur historique.',
					revealAr: 'مثال موضوعي: « Les livres anciens constituent une source historique essentielle pour les chercheurs. »'
				}
			]
		},
		summary: {
			rulesAr: [
				'الموضوعية (L’objectivité): يعرض الكاتب الحقائق بحياد تام مستعملا: ضمائر الغائب (il, elle, ils, elles)، المبني للمجهول (La Casbah a été classée au patrimoine mondial)، الصيغة غير الشخصية (il existe, il s’agit de)، الضمير العام (on)، المعجم المحايد والدقيق (تواريخ، أرقام، مصطلحات تاريخية أو علمية)، والجمل الإخبارية.',
				'الذاتية الصريحة (Subjectivité explicite): ظهور ضمائر المتكلم (je, me, moi, mon, nous, notre) وأفعال الرأي (je pense que, j’estime que).',
				'الذاتية الضمنية (Subjectivité implicite): غياب « je » مع وجود ألفاظ تحمل حكما تقييميا إيجابيا (mélioratif: chef-d’œuvre, magnifique, génial) أو سلبيا (péjoratif: médiocre, désastreux) أو علامات تعجب (!).',
				'في النص الوثائقي التفسيري، يهيمن الأسلوب الموضوعي لضمان مصداقية المعلومة التاريخية أو العلمية.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Tableau comparatif : Objectif vs Subjectif',
				subtitle: 'Savoir justifier l’objectivité d’un texte à l’examen',
				columns: [
					{
						header: 'Pronoms',
						rule: 'il / elle / on vs je / nous',
						examples: 'Obj: Il fonde | Subj: J’admire'
					},
					{
						header: 'Vocabulaire',
						rule: 'Neutre vs Évaluatif',
						examples: 'Obj: ancien | Subj: merveilleux'
					},
					{
						header: 'Phrases',
						rule: 'Déclaratives vs Exclamatives',
						examples: 'Obj: point (.) | Subj: (!)'
					}
				]
			}),
			visualCaptionAr: 'المعايير الثلاثة للتمييز بين الخطاب الموضوعي والخطاب الذاتي',
			examples: [
				{
					problemAr: 'صنّف الجملتين (موضوعية / ذاتية): (1) « Fatima Al-Fihriya a fondé l’université Al-Qarawiyyin en 859. » (2) « Quelle fondatrice exceptionnelle et admirable ! »',
					solutionAr: '(1) موضوعية (حقيقة تاريخية موثقة بتأريخ دقيق ومعجم محايد). (2) ذاتية (جملة تعجبية وصفات تقييمية إيجابية).'
				},
				{
					problemAr: 'استخرج مؤشّرَي موضوعية من: « Il est attesté par les historiens que la bibliothèque de Constantine a été enrichie dès le XVIIIe siècle. »',
					solutionAr: '1) الصيغة غير الشخصية (Il est attesté) — 2) المبني للمجهول (a été enrichie) مع تحديد تاريخي دقيق.'
				}
			],
			watchOutAr:
				'في الامتحان إذا طُلب منك « L’auteur est-il objectif ou subjectif ? Justifiez »، لا تكتفِ بقول « il est objectif car il n’emploie pas je »، بل أضف مؤشرين نصيين مثل: استعمال المبني للمجهول، التواريخ الدقيقة، والمعجم المحايد.'
		},
		practice: [
			{
				questionAr: 'أي جملة تتصف بالموضوعية التامة وتصلح لنص وثائقي عن التراث؟',
				options: [
					'La Kalâa des Béni Hammad a été bâtie au début du XIe siècle dans les monts du Hodna.',
					'Je suis fasciné par les ruines sublimes de la Kalâa des Béni Hammad !',
					'À mon avis, c’est le plus beau site du monde entier.',
					'Nous devons absolument aimer ce chef-d’œuvre incroyable.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! الجملة الأولى مبنية للمجهول وموثقة بمكان وزمان دقيقين بلا أي ذاتية.',
					'تحتوي على « Je » وصفة تقييمية « sublimes » وتعجب.',
					'تحتوي على رأي شخصي « À mon avis » ومبالغة تقييمية.',
					'تحتوي على « Nous » والصفة التقييمية « incroyable ».'
				],
				explanationAr: 'الموضوعية تعتمد على الحقائق التاريخية والجمل الإخبارية والمبني للمجهول.'
			},
			{
				questionAr: 'في الجملة: « Ce manuscrit ancien est un chef-d’œuvre éblouissant qui force l’admiration ! » ما نوع الذاتية الموجودة؟',
				options: [
					'Objectivité scientifique pure',
					'Subjectivité implicite (ذاتية ضمنية عبر المعجم التقييمي والتعجب)',
					'Subjectivité explicite (لوجود الضمير je)',
					'Style impersonnel neutre'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'المفردات ليست محايدة إطلاقا.',
					'ممتاز! رغم غياب الضمير je، تظهر ذاتية الكاتب ضمنيا عبر « chef-d’œuvre, éblouissant » وعلامة التعجب.',
					'لا يوجد ضمير متكلم je في الجملة.',
					'الأسلوب ليس محايدا.'
				],
				explanationAr: 'الذاتية الضمنية تبرز عبر الألفاظ التقييمية (mélioratifs/péjoratifs) دون استعمال je.'
			},
			{
				questionAr: 'أي كلمة من القائمة التالية تُعدّ صفة محايدة (objectif / neutre) لوصف بناء تاريخي؟',
				options: ['splendide', 'rectangulaire', 'admirable', 'affreux'],
				correctIndex: 1,
				diagnosticFeedback: [
					'« splendide » صفة تقييمية إيجابية (ذاتية).',
					'صحيح! « rectangulaire » (مستطيل الشكل) صفة هندسية موضوعية قابلة للملاحظة والقياس.',
					'« admirable » صفة تقييمية إيجابية.',
					'« affreux » صفة تقييمية سلبية.'
				],
				explanationAr: 'الصفات الهندسية واللونية والتاريخية محايدة، بخلاف صفات المدح والذم.'
			},
			{
				questionAr: 'ما المؤشران اللغويان للموضوعية في: « Il existe à Tlemcen des manuscrits qui ont été restaurés avec soin. »؟',
				options: [
					'Le pronom je et l’exclamation',
					'La tournure impersonnelle (Il existe) et la voix passive (ont été restaurés)',
					'L’impératif et le subjonctif',
					'Le lexique péjoratif et le doute'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا يوجد je ولا تعجب.',
					'أحسنت! الصيغة غير الشخصية « Il existe » والمبني للمجهول « ont été restaurés » من أبرز علامات الموضوعية.',
					'لا يوجد أمر ولا منصوب.',
					'لا يوجد معجم قدحي.'
				],
				explanationAr: 'الصيغة غير الشخصية والمبني للمجهول يُبعدان الكاتب ويجعلان الحدث في الصدارة.'
			},
			{
				questionAr: 'حوّل الجملة الذاتية إلى صياغة موضوعية: « Je pense qu’Ibn Battouta a parcouru des distances extraordinaires. »',
				options: [
					'Ibn Battouta a parcouru environ 120 000 kilomètres au cours de ses voyages au XIVe siècle.',
					'Quel voyageur génial que ce grand Ibn Battouta !',
					'À mon avis, personne ne peut égaler Ibn Battouta.',
					'Nous admirons tous les voyages incroyables d’Ibn Battouta.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة موفقة! استبدلنا الرأي الشخصي والصفة المبالغ فيها بمعطيات تاريخية ورقمية دقيقة.',
					'جملة تعجبية ذاتية.',
					'تعبير صريح عن الرأي الشخصي.',
					'تتضمن الضمير nous والفعل الانفعالي admirons.'
				],
				explanationAr: 'نحوّل الذاتية إلى موضوعية بحذف الرأي الشخصي وإدراج معطيات دقيقة محايدة.'
			}
		]
	},

	// 3. La substitution lexicale et grammaticale
	{
		id: 'fre_lesson_1as_tcl_t1_substitution_reprises',
		slug: 'fre-1as-tcl-t1-substitution-reprises',
		grade: '1as_tcl',
		yearSubjectId: 665,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 1: النص التفسيري الثقافي والعلمي — التراث، الكتاب، والعلوم الإسلامية',
		order: 3,
		titleAr: 'التعويض المعجمي والنحوي والروابط الإحالية (La substitution lexicale et grammaticale)',
		objectives: [
			'التمييز بين التعويض النحوي (الضمائر وأدوات الإشارة والملكية) والتعويض المعجمي (المرادف، الاسم الأشمل، والكناية الوصفية)',
			'الإجابة بدقة عن سؤال الإحالة الضميرية في اختبارات شعبة الآداب (À qui / À quoi renvoient les mots soulignés ?)',
			'إغناء الفقرة التفسيرية ببدائل معجمية ثقافية لتفادي التكرار الرتيب'
		],
		keywordsAr: [
			'Substitution lexicale',
			'Substitution grammaticale',
			'Périphrase',
			'Hyperonyme',
			'Anaphore'
		],
		discover: {
			scenarioAr:
				'اقرأ هذه الفقرة عن العالم المسلم ابن الهيثم: « Ibn Al-Haytham est né à Bassora au Xe siècle. Il a posé les bases de l’optique moderne. Ce savant rigoureux a rédigé le célèbre Traité d’optique ; celui-ci a influencé les physiciens pendant des siècles. Les chercheurs y trouvent encore une méthode expérimentale claire dont ils saluent la précision. » لاحظ تنوع الكلمات التي تعود على العالم وكتابه.',
			svg: svgFrenchGrammarMap({
				title: 'Éviter la répétition dans un texte documentaire',
				rootLabel: 'Les deux grandes familles de substituts',
				branches: [
					{
						label: 'Substituts grammaticaux',
						rule: 'Pronoms personnels / démons.',
						example: 'il, lui, celui-ci, y, dont'
					},
					{
						label: 'Synonyme / Hyperonyme',
						rule: 'Mot de sens proche ou général',
						example: 'livre -> cet ouvrage / ce traité'
					},
					{
						label: 'Périphrase culturelle',
						rule: 'Groupe nominal descriptif',
						example: 'Constantine -> la ville des ponts'
					}
				]
			}),
			steps: [
				{
					promptAr: 'حدّد المرجع الدقيق لكل من: « Il »، « Ce savant rigoureux »، و« celui-ci » في الفقرة.',
					hintAr: 'انتبه للجملة التي تسبق « celui-ci » مباشرة.',
					expectedInput: 'Il و Ce savant rigoureux -> Ibn Al-Haytham | celui-ci -> le célèbre Traité d’optique',
					revealAr: '« Il » (نحوي) و« Ce savant rigoureux » (معجمي) يعودان على Ibn Al-Haytham، بينما ضمير الإشارة « celui-ci » يعود على أقرب اسم مذكر قبله وهو « le célèbre Traité d’optique ».'
				},
				{
					promptAr: 'على ماذا يعود الضمير « y » في « Les chercheurs y trouvent... »؟',
					hintAr: 'أين يجد الباحثون المنهج التجريبي؟ (dans le Traité d’optique).',
					expectedInput: 'dans le Traité d’optique',
					revealAr: 'يعود الضمير « y » على « le Traité d’optique » (في كتاب المناظر).'
				},
				{
					promptAr: 'اقترح كناية وصفية (périphrase) أو تعويضا معجميا مناسبا لـ « La Casbah d’Alger ».',
					hintAr: 'فكّر في صفتها التاريخية: الحي العتيق / القلعة التاريخية.',
					expectedInput: 'la vieille citadelle d’Alger / ce quartier historique classé',
					revealAr: 'يمكن تعويضها بـ « cette citadelle historique » أو « le cœur ancien de la capitale ».'
				}
			]
		},
		summary: {
			rulesAr: [
				'التعويض النحوي (Substitution grammaticale): يضم الضمائر الشخصية الفاعلة والمفعولة (il, elle, le, la, les, lui, leur, en, y)، ضمائر الإشارة (celui-ci, celle-ci, ceux-ci)، ضمائر الملكية وصفاتها (son, sa, ses, leur)، والضمائر الموصولة (qui, que, dont, où).',
				'التعويض المعجمي (Substitution lexicale): يتم عبر ثلاث وسائل ثرية في الآداب: (1) المرادف (synonyme: livre -> ouvrage)، (2) الاسم العام الشامل (hyperonyme: la mosquée -> cet édifice)، (3) الكناية الوصفية (périphrase: Ibn Khaldoun -> le pionnier de la sociologie / Constantine -> la ville des ponts suspendus).',
				'استعمال محدد الإشارة (ce, cet, cette, ces + nom) يُعدّ من أنجع الطرق للربط المعجمي بين الجمل: « La bibliothèque conserve des manuscrits. Ces documents précieux... »',
				'مفتاح الإجابة الصحيحة في الاختبار: تحقّق دائما من الجنس (مذكر/مؤنث) والعدد (مفرد/جمع) وموقع الضمير في الجملة الفعلية قبل اختيار المرجع.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Pronoms pièges à l’examen (en, y, dont, celui-ci)',
				subtitle: 'Bien identifier le groupe remplacé',
				columns: [
					{
						header: 'en / dont',
						rule: 'Remplacent « de + nom »',
						examples: 'parler d’un livre -> en parler'
					},
					{
						header: 'y',
						rule: 'Remplace lieu ou « à + chose »',
						examples: 'dans ce musée -> y entrer'
					},
					{
						header: 'celui-ci / celle-là',
						rule: 'Dernier nom cité du genre',
						examples: 'ouvrage -> celui-ci'
					}
				]
			}),
			visualCaptionAr: 'الضمائر الدقيقة الأكثر ورودا في أسئلة فهم المكتوب لشعبة الآداب',
			examples: [
				{
					problemAr: 'على ماذا يعود الضمير « en » في: « Les voyageurs visitaient les bibliothèques de Kairouan et de Fès et en recopiaient les ouvrages. »؟',
					solutionAr: '« en » يعود على « des bibliothèques de Kairouan et de Fès » (ينسخون الكتب منها).'
				},
				{
					problemAr: 'عوّض التكرار ببديل معجمي وآخر نحوي: « Al-Idrisi a dessiné une carte célèbre. Al-Idrisi a offert cette carte célèbre au monde savant. »',
					solutionAr: 'Al-Idrisi a dessiné une carte célèbre. Ce grand géographe (معجمي) l’a offerte (نحوي) au monde savant.'
				}
			],
			watchOutAr:
				'احذر من الفرق بين « lui / leur » (يعودان على عاقل مسبوق بـ à مثل: offrir aux lecteurs -> leur offrir) و« y » (يعود على مكان أو غير عاقل مسبوق بـ à/dans مثل: s’intéresser à l’histoire -> s’y intéresser).'
		},
		practice: [
			{
				questionAr: 'في الجملة: « Constantine attire les historiens ; la ville des ponts suspendus conserve des archives rares. » ما نوع التعويض الذي تمثله « la ville des ponts suspendus »؟',
				options: [
					'Un substitut grammatical',
					'Une périphrase (substitut lexical)',
					'Un pronom relatif',
					'Un adverbe de lieu'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'التعويض النحوي يكون بضمير قصير لا بعبارة وصفية.',
					'أحسنت! « la ville des ponts suspendus » كناية وصفية (périphrase) تعوّض قسنطينة معجميا.',
					'لا يوجد ضمير موصول هنا.',
					'ليست ظرف مكان.'
				],
				explanationAr: 'الكناية الوصفية (périphrase) من أرقى أشكال التعويض المعجمي في نصوص الآداب.'
			},
			{
				questionAr: 'على ماذا يعود الضمير « celles-ci » في: « Les oasis du sud possèdent des bibliothèques familiales ; celles-ci préservent des milliers de manuscrits. »؟',
				options: [
					'Les oasis du sud',
					'des bibliothèques familiales',
					'des milliers de manuscrits',
					'les familles'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'ضمير الإشارة « celles-ci » يعود على أقرب اسم مؤنث جمع مناسب للمعنى.',
					'ممتاز! « celles-ci » (مؤنث جمع) يعود على « des bibliothèques familiales » التي تحفظ المخطوطات.',
					'« milliers » مذكر جمع ولا يطابق celles-ci.',
					'كلمة « familles » لم ترد كاسم مستقل.'
				],
				explanationAr: '« celles-ci » ضمير إشارة مؤنث جمع يعوّض أقرب اسم مؤنث جمع قبل الفاصلة المنقوطة.'
			},
			{
				questionAr: 'أكمل بالضمير المناسب لتفادي التكرار: « Ce chercheur étudie l’architecture du M’Zab et il .......... consacre un livre entier. »',
				options: ['lui', 'y', 'en', 'le'],
				correctIndex: 1,
				diagnosticFeedback: [
					'« lui » يُستعمل عادة للشخص العاقل (à quelqu’un).',
					'صحيح! « consacrer un livre à l’architecture (غير عاقل) » يُعوَّض بـ « y ».',
					'« en » يعوض « de + nom ».',
					'« le » مفعول مباشر، وهنا المفعول غير مباشر مسبوق بـ à.'
				],
				explanationAr: 'المفعول غير المباشر غير العاقل المسبوق بـ à يُعوّض بالضمير « y ».'
			},
			{
				questionAr: 'أي كلمة تمثل اسما أشمل (hyperonyme) يصلح تعويضا معجميا لـ « le parchemin, le papyrus et le papier »؟',
				options: ['les outils agricoles', 'ces supports d’écriture', 'ces édifices anciens', 'les navigateurs'],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا علاقة لها بالزراعة.',
					'أحسنت! « ces supports d’écriture » (وسائط الكتابة هذه) اسم جامع يشمل الرق والبردي والورق.',
					'ليست مباني.',
					'ليست بحّارة.'
				],
				explanationAr: 'الاسم الشامل (hyperonyme) يجمع تحت مظلته عدة عناصر من نفس الفئة.'
			},
			{
				questionAr: 'في الجملة: « L’Imam Al-Boukhari a rassemblé des hadiths authentiques ; son recueil demeure une référence majeure. » ما نوع التعويض في « son »؟',
				options: [
					'Substitut grammatical (déterminant possessif)',
					'Substitut lexical par synonyme',
					'Connecteur logique de cause',
					'Procédé de dénomination'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة دقيقة! صفة الملكية « son » تعويض نحوي يعود على الإمام البخاري.',
					'« son » أداة نحوية وليست مرادفا معجميا.',
					'ليس رابط سبب.',
					'ليس أسلوب تسمية.'
				],
				explanationAr: 'صفات الملكية (son, sa, ses, leur) تُصنّف ضمن التعويض النحوي.'
			}
		]
	},

	// 4. La phrase complexe (juxtaposition, coordination, subordination)
	{
		id: 'fre_lesson_1as_tcl_t1_phrase_complexe',
		slug: 'fre-1as-tcl-t1-phrase-complexe',
		grade: '1as_tcl',
		yearSubjectId: 665,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 1: النص التفسيري الثقافي والعلمي — التراث، الكتاب، والعلوم الإسلامية',
		order: 4,
		titleAr: 'الجملة المركبة: التجاوز، العطف، والتبعية (La phrase complexe : juxtaposition, coordination, subordination)',
		objectives: [
			'التمييز بين الجملة البسيطة (فعل واحد مصرف) والجملة المركبة (فعلان مصرفان فأكثر)',
			'التفريق بدقة بين طرق الربط الثلاث في الجملة المركبة: التجاور (juxtaposition)، العطف (coordination)، والتبعية (subordination)',
			'تحديد الجملة الرئيسية (principale) والجملة الفرعية التابعة (subordonnée: relative, complétive, circonstancielle)'
		],
		keywordsAr: [
			'Phrase complexe',
			'Juxtaposition',
			'Coordination',
			'Subordination',
			'Proposition subordonnée'
		],
		discover: {
			scenarioAr:
				'تأمل هذه الجمل الثلاث عن صناعة الورق في الحضارة الإسلامية: (1) « Les artisans fabriquaient le papier à Samarcande ; les copistes l’utilisaient à Bagdad et à Cordoue. » (2) « Le papier était moins cher que le parchemin, donc les livres se sont multipliés rapidement. » (3) « Les savants créèrent des bibliothèques qui accueillaient des étudiants venus de loin. » كم فعلا مصرفا في كل جملة، وكيف ارتبطت جملتاها؟',
			svg: svgFrenchGrammarMap({
				title: 'Les 3 liens dans la phrase complexe',
				rootLabel: 'Plusieurs verbes conjugués = Phrase complexe',
				branches: [
					{
						label: 'Juxtaposition',
						rule: 'Ponctuation faible : , ; :',
						example: 'Il lit, il prend des notes.'
					},
					{
						label: 'Coordination',
						rule: 'mais, ou, et, donc, or, ni, car',
						example: 'Il étudie car il aime lire.'
					},
					{
						label: 'Subordination',
						rule: 'Principale + Subordonnée',
						example: 'Le livre qui explique...'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما أداة الربط في الجملة (1) بين « Les artisans fabriquaient... » و« les copistes l’utilisaient... »؟',
					hintAr: 'انظر إلى علامة الترقيم الموجودة بين الجملتين ( ; ).',
					expectedInput: 'الفاصلة المنقوطة -> ربط بالتجاور (La juxtaposition)',
					revealAr: 'عندما ترتبط جملتان مستقلتان بفاصلة (,) أو فاصلة منقوطة (;) أو نقطتين (:) دون كلمة ربط نسميه التجاور (la juxtaposition).'
				},
				{
					promptAr: 'ما أداة الربط في الجملة (2) « ...donc les livres se sont multipliés »؟',
					hintAr: 'تذكّر حروف العطف السبعة: mais, ou, et, donc, or, ni, car.',
					expectedInput: 'حرف العطف donc -> ربط بالعطف (La coordination)',
					revealAr: 'الربط بأحد حروف العطف السبعة (mais, ou, et, donc, or, ni, car) أو ظرف ربط (puis, ensuite, cependant) يُسمى العطف (la coordination).'
				},
				{
					promptAr: 'في الجملة (3)، ما الجملة الرئيسية وما الجملة التابعة (la subordonnée)؟',
					hintAr: 'الجملة التابعة تبدأ بالضمير الموصول « qui » ولا يستقيم معناها وحدها.',
					expectedInput: 'الرئيسية: Les savants créèrent des bibliothèques — التابعة: qui accueillaient des étudiants venus de loin',
					revealAr: 'في التبعية (la subordination)، تعتمد الجملة الفرعية (subordonnée) على الرئيسية (principale) وترتبط بها عبر ضمير موصول (qui, que, dont, où) أو أداة ربط (que, parce que, quand, afin que).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الجملة البسيطة (Phrase simple) تحتوي على فعل مصرف واحد فقط (نواة واحدة)، بينما الجملة المركبة (Phrase complexe) تحتوي على فعلين مصرفين فأكثر (= جملتان فرعيتان فأكثر).',
				'1) التجاور (La juxtaposition): جملتان مستقلتان تفصل بينهما علامة ترقيم فقط ( , ) أو ( ; ) أو ( : ).',
				'2) العطف (La coordination): جملتان مستقلتان يربط بينهما حرف عطف (mais, ou, et, donc, or, ni, car) أو رابط عاطف (cependant, alors, par conséquent).',
				'3) التبعية (La subordination): جملة رئيسية + جملة تابعة لا تستقل بذاتها، وأنواعها الثلاثة: الموصولية (relative بعد اسم: le livre qui informe)، التكميلية (complétive بعد فعل: on sait que le savoir élève)، والظرفية (circonstancielle للزمن/السبب/الغاية/المعارضة: parce que, quand, bien que).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Les 3 types de propositions subordonnées',
				subtitle: 'Identifier la nature d’une subordonnée facilement',
				columns: [
					{
						header: 'Relative',
						rule: 'Complète un NOM',
						examples: 'le savant qui a découvert...'
					},
					{
						header: 'Complétive',
						rule: 'Complète un VERBE',
						examples: 'Il prouve que la lumière...'
					},
					{
						header: 'Circonstancielle',
						rule: 'Cause / Temps / But...',
						examples: 'parce que / quand / bien que'
					}
				]
			}),
			visualCaptionAr: 'التمييز السريع بين الجملة الموصولية والتكميلية والظرفية',
			examples: [
				{
					problemAr: 'حدّد طريقة الربط في: « Al-Zahrawi a conçu des instruments chirurgicaux et il les a illustrés dans son encyclopédie. »',
					solutionAr: 'La coordination (العطف) بواسطة حرف العطف « et ».'
				},
				{
					problemAr: 'اربط الجملتين بالتبعية (الموصولية ثم الظرفية السببية): « Ce livre est célèbre. Il décrit la géographie du Maghreb. »',
					solutionAr: 'الموصولية: « Ce livre, qui décrit la géographie du Maghreb, est célèbre. » | الظرفية: « Ce livre est célèbre parce qu’il décrit la géographie du Maghreb. »'
				}
			],
			watchOutAr:
				'احذر من الفخ الكلاسيكي لـ « que »! إذا جاءت « que » بعد اسم (Le livre que je lis) فهي ضمير موصول (subordonnée relative)، أما إذا جاءت بعد فعل (L’historien montre que ce site est ancien) فهي أداة ربط (subordonnée complétive).'
		},
		practice: [
			{
				questionAr: 'كيف ارتبطت الجملتان في: « Les visiteurs parcourent les ruelles de la Casbah ; ils admirent les maisons blanchies à la chaux. »؟',
				options: ['Par subordination', 'Par juxtaposition', 'Par coordination', 'C’est une phrase simple'],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا يوجد رابط تبعية (qui, que, parce que...).',
					'أحسنت! الربط بالفاصلة المنقوطة ( ; ) فقط يُسمى التجاور (juxtaposition).',
					'لا يوجد حرف عطف مثل et أو car.',
					'يوجد فعلان مصرفان (parcourent / admirent) فهي جملة مركبة.'
				],
				explanationAr: 'الفصل بين جملتين بفاصلة أو فاصلة منقوطة أو نقطتين يمثل التجاور (juxtaposition).'
			},
			{
				questionAr: 'ما نوع الربط في: « Les manuscrits sont conservés dans des salles climatisées car l’humidité abîme le papier. »؟',
				options: ['Juxtaposition', 'Coordination', 'Subordination relative', 'Subordination complétive'],
				correctIndex: 1,
				diagnosticFeedback: [
					'يوجد حرف عطف صريح هو « car ».',
					'ممتاز! « car » أحد حروف العطف السبعة (mais, ou, et, donc, or, ni, car) فالربط هو العطف (coordination).',
					'لا يوجد ضمير موصول.',
					'« car » حرف عطف وليس أداة تبعية.'
				],
				explanationAr: 'انتبه: « car » حرف عطف (coordination)، بينما « parce que » أداة تبعية (subordination)!'
			},
			{
				questionAr: 'في الجملة: « Les historiens affirment que la bibliothèque de Béjaïa attirait des savants étrangers. » ما نوع الجملة التابعة المسطرة؟',
				options: [
					'Subordonnée relative',
					'Subordonnée complétive',
					'Proposition juxtaposée',
					'Proposition coordonnée'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'جاءت « que » بعد الفعل « affirment » وليس بعد اسم.',
					'صحيح! « que la bibliothèque... » تكمل معنى الفعل « affirment » (مفعول مباشر) فهي تكميلية (complétive).',
					'ليست متجاورة.',
					'ليست معطوفة.'
				],
				explanationAr: 'الجملة المبدوءة بـ « que » بعد فعل قول أو علم (affirmer, savoir, montrer) هي جملة تكميلية (complétive).'
			},
			{
				questionAr: 'أي جملة من الجمل التالية تُعدّ جملة بسيطة (phrase simple)؟',
				options: [
					'Al-Birouni a calculé le rayon de la Terre avec une remarquable exactitude.',
					'Al-Birouni a observé les astres et il a rédigé plusieurs traités.',
					'Al-Birouni est un savant qui maîtrisait plusieurs langues.',
					'Il étudiait l’astronomie ; il aimait aussi la géographie.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! رغم طولها، تحتوي على فعل مصرف واحد فقط (a calculé)، فهي جملة بسيطة.',
					'فيها فعلان مصرفان معطوفان بـ et.',
					'فيها فعلان مصرفان بالتبعية الموصولية.',
					'فيها فعلان مصرفان بالتجاور.'
				],
				explanationAr: 'طول الجملة لا يحدد بساطتها أو تركيبها، بل عدد الأفعال المصرفة فيها فقط.'
			},
			{
				questionAr: 'ما نوع الجملة التابعة في: « Le minaret qui domine la ville date du XIIIe siècle. »؟',
				options: [
					'Subordonnée circonstancielle de cause',
					'Subordonnée relative',
					'Subordonnée complétive',
					'Proposition coordonnée'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا يوجد معنى السبب هنا.',
					'إجابة موفقة! تبدأ بالضمير الموصول « qui » وتنعت الاسم « Le minaret » فهي موصولية (relative).',
					'تأتي بعد اسم لا بعد فعل.',
					'ليست معطوفة.'
				],
				explanationAr: '« qui domine la ville » جملة موصولية نعتية تابعة للاسم « Le minaret ».'
			}
		]
	},

	// 5. Méthodologie du résumé et du compte rendu objectif
	{
		id: 'fre_lesson_1as_tcl_t1_resume_compte_rendu',
		slug: 'fre-1as-tcl-t1-resume-compte-rendu',
		grade: '1as_tcl',
		yearSubjectId: 665,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 1: النص التفسيري الثقافي والعلمي — التراث، الكتاب، والعلوم الإسلامية',
		order: 5,
		titleAr: 'منهجية التلخيص والتقرير الموضوعي (Méthodologie du résumé et du compte rendu objectif)',
		objectives: [
			'التمييز الدقيق بين التلخيص (le résumé) والتقرير الموضوعي (le compte rendu objectif) في الضمير والبنية والأسلوب',
			'تطبيق تقنيات التكثيف: حذف الأمثلة والتكرارات، الاستعاضة بالاسم الشامل، وإعادة الصياغة الشخصية',
			'كتابة تقرير موضوعي متكامل لنص وثائقي ثقافي وفق سلم تنقيط شعبة الآداب (7 نقاط في الاختبار)'
		],
		keywordsAr: [
			'Résumé',
			'Compte rendu objectif',
			'Reformulation',
			'Accroche',
			'Condensation'
		],
		discover: {
			scenarioAr:
				'في شعبة الآداب (1AS TCL)، تُمنح الوضعية الإدماجية 7 نقاط كاملة! كثيرا ما يخلط التلاميذ بين « Résumez le texte » و« Faites le compte rendu objectif du texte ». لاحظ الفرق الجوهري: في التلخيص نتكلم مباشرة بلسان النص دون قول « L’auteur dit »، بينما في التقرير الموضوعي نقدم بطاقة النص أولا ثم ننقل أفكاره بضمير الغائب (L’auteur explique / montre / conclut).',
			svg: svgFrenchWritingBlueprint({
				title: 'Comparer Résumé vs Compte Rendu Objectif',
				steps: [
					{
						stage: 'Résumé (1/4 du texte)',
						detail: 'Pas d’accroche, pas de « L’auteur dit », même système d’énonciation.'
					},
					{
						stage: 'Compte rendu (1/3)',
						detail: 'Accroche complète + « L’auteur présente / explique / conclut ».'
					},
					{
						stage: 'Règle commune 1',
						detail: 'Zéro recopiage littéral : reformuler avec ses propres mots.'
					},
					{
						stage: 'Règle commune 2',
						detail: 'Zéro opinion personnelle : fidélité absolue et objectivité.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الفرق الأساسي بين التلخيص (Résumé) والتقرير الموضوعي (Compte rendu objectif) في ذكر الكاتب والمصدر؟',
					hintAr: 'هل نكتب « Ce texte intitulé... écrit par... » في التلخيص؟',
					expectedInput: 'في التقرير الموضوعي نكتب مقدمة (Accroche) ونقول L’auteur explique، أما في التلخيص فلا نذكر الكاتب ولا المقدمة التعريفية',
					revealAr: 'التقرير الموضوعي يبدأ ببطاقة تقديم النص (Accroche) ويعتمد صيغة الغائب (L’auteur montre...)، أما التلخيص فيدخل مباشرة في صلب الموضوع بالضمير والزمن نفسيهما في النص الأصلي.'
				},
				{
					promptAr: 'كيف تختصر القائمة: « Les savants traduisaient des traités de géométrie, d’algèbre, de botanique, d’optique et de pharmacologie » في كلمتين؟',
					hintAr: 'استعمل اسما جامعا (hyperonyme).',
					expectedInput: 'des ouvrages scientifiques',
					revealAr: 'بتقنية الاسم الجامع (généralisation / hyperonyme) نختصر التعداد الطويل في عبارة موجزة: « des ouvrages scientifiques ».'
				},
				{
					promptAr: 'ما الممنوعان الكبيران المشتركان بين التلخيص والتقرير الموضوعي؟',
					hintAr: 'فكّر في النقل الحرفي وفي إبداء الرأي الشخصي.',
					expectedInput: 'النسخ الحرفي لجمل النص (le recopiage) وإقحام الرأي الشخصي (la subjectivité)',
					revealAr: 'كلاهما يشترط إعادة الصياغة الشخصية (reformulation) والأمانة التامة لأفكار النص دون أي تعليق أو حكم ذاتي.'
				}
			]
		},
		summary: {
			rulesAr: [
				'خطوات التحضير قبل الكتابة (في المسودة): 1) قراءة النص مرتين لتحديد الفكرة العامة والغاية التواصلية، 2) تسطير الفكرة الأساسية لكل فقرة وشطب الأمثلة التفصيلية والاستطرادات، 3) استبدال التعدادات الطويلة باسم جامع (hyperonyme).',
				'في التقرير الموضوعي (Compte rendu objectif — الأكثر تداولا في الثانوي والباكالوريا):',
				'- المقدمة (Accroche): « Ce texte explicatif (ou documentaire), intitulé "...", écrit par ... et paru dans ..., aborde le thème de ... L’auteur vise à informer le lecteur et à expliquer ... »',
				'- العرض (Condensation): « Dans un premier temps, l’auteur définit / présente... Ensuite, il explique / met en lumière... Enfin, il conclut en rappelant que... » (بالحاضر وبضمير الغائب وبنحو ثلث النص الأصلي).',
				'في التلخيص (Résumé): نحترم ترتيب النص ونظامه الزمني، ولا نذكر « L’auteur dit »، ونختصر النص إلى الربع تقريبا.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Techniques de condensation efficace',
				rootLabel: 'Passer d’un texte long à une synthèse claire',
				branches: [
					{
						label: 'Supprimer',
						rule: 'Exemples, anecdotes, détails',
						example: 'Garder uniquement l’idée clé'
					},
					{
						label: 'Généraliser',
						rule: 'Liste -> Hyperonyme unique',
						example: 'palais, forts -> édifices'
					},
					{
						label: 'Reformuler',
						rule: 'Synonymes + nominalisation',
						example: 'On construit -> La construction'
					}
				]
			}),
			visualCaptionAr: 'تقنيات التكثيف الثلاث لإنتاج تلخيص وتقرير موضوعي متقن',
			examples: [
				{
					problemAr: 'كثّف الجملة التالية للتقرير الموضوعي: « La Grande Mosquée d’Alger, inaugurée récemment face à la baie, possède une grande salle de prière, une bibliothèque riche, un centre culturel et un minaret très haut. »',
					solutionAr: 'L’auteur présente Djamaâ El-Djazaïr comme un édifice religieux et culturel majeur doté de plusieurs infrastructures.'
				},
				{
					problemAr: 'صحّح خطأ هذا التلخيص: « Dans ce texte, l’auteur explique que le papier a transformé la diffusion du savoir. »',
					solutionAr: 'في التلخيص (Résumé) نحذف « Dans ce texte, l’auteur explique que » ونكتب مباشرة: « Le papier a profondément transformé la diffusion du savoir. » (أما الصيغة الأولى فتخص التقرير الموضوعي).'
				}
			],
			watchOutAr:
				'في شعبة الآداب، احرص على سلامة اللغة وتنويع الروابط (D’abord, En outre, Par ailleurs, Enfin) ووضوح الفقرات (فقرة للتقديم + فقرة أو فقرتين للعرض) لحصد العلامة الكاملة من 7 نقاط!'
		},
		practice: [
			{
				questionAr: 'في أي تمرين نستخدم العبارة « D’abord, l’auteur définit... Ensuite, il explique... »؟',
				options: [
					'Le résumé',
					'Le compte rendu objectif',
					'La lettre ouverte',
					'Le dialogue narratif'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'في التلخيص لا نذكر كلمة « l’auteur » ولا نعلق من الخارج.',
					'أحسنت! هذه هي البنية الرسمية للتقرير الموضوعي (compte rendu objectif).',
					'الرسالة المفتوحة تستعمل nous/vous.',
					'الحوار السردي يستعمل علامات الحوار.'
				],
				explanationAr: 'التقرير الموضوعي يُكتب من منظور خارجي محايد: l’auteur présente, explique, conclut.'
			},
			{
				questionAr: 'ما الطول التقريبي المطلوب في التلخيص (le résumé) مقارنة بالنص الأصلي؟',
				options: [
					'ضعف النص الأصلي',
					'نفس طول النص الأصلي',
					'حوالي ربع النص الأصلي (environ le quart)',
					'كلمة واحدة فقط'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'التلخيص يختصر النص ولا يطيله.',
					'هذا نقل وليس تلخيصا.',
					'ممتاز! التلخيص يختصر النص إلى الربع تقريبا (والتقرير الموضوعي إلى الثلث تقريبا).',
					'كلمة واحدة ليست تلخيصا.'
				],
				explanationAr: 'يُكثّف التلخيص النص إلى نحو 25% من طوله الأصلي مع الحفاظ على أفكاره الأساسية.'
			},
			{
				questionAr: 'كيف نختصر العبارة « des coupoles, des arches, des colonnes et des cours intérieures » بتقنية الاسم الجامع؟',
				options: [
					'des plats traditionnels',
					'des éléments architecturaux',
					'des livres d’histoire',
					'des phénomènes climatiques'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا علاقة لها بالطعام.',
					'صحيح! « des éléments architecturaux » (عناصر معمارية) يجمع كل المذكور بإيجاز.',
					'ليست كتبا.',
					'ليست ظواهر مناخية.'
				],
				explanationAr: 'الاستبدال بالاسم الجامع (hyperonyme) يختصر التعدادات الطويلة بأناقة.'
			},
			{
				questionAr: 'أي خطأ يُعدّ مخالفا لقواعد التقرير الموضوعي؟',
				options: [
					'تحديد نوع النص والكاتب والمصدر في المقدمة',
					'استعمال المضارع الدلالي وأفعال التقديم المحايدة',
					'إضافة فقرة في النهاية تبدأ بـ « À mon avis, ce texte est excellent »',
					'إعادة صياغة الأفكار الأساسية دون ذكر التفاصيل الثانوية'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'بل هو عنصر مطلوب في المقدمة.',
					'هذا من صميم المنهجية السليمة.',
					'أحسنت! الرأي الشخصي ممنوع في التقرير الموضوعي (objectif).',
					'إعادة الصياغة مطلوبة ومهمة.'
				],
				explanationAr: 'التقرير الموضوعي خالٍ تماما من الأحكام الذاتية.'
			},
			{
				questionAr: 'عند قراءة سؤال « Résumez ce texte »، ماذا تفعل بالتفاصيل والأمثلة المتكررة؟',
				options: [
					'تنسخها جميعا كما وردت',
					'تحذفها وتحتفظ بالفكرة المحورية التي توضّحها',
					'تخترع أمثلة جديدة من عندك',
					'تكتبها في سطر الموضوع فقط'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'النسخ يفسد التلخيص.',
					'إجابة موفقة! نُبقي على الأفكار الرئيسية ونحذف الأمثلة التوضيحية والتكرارات.',
					'لا نضيف معلومات من خارج النص.',
					'التلخيص لا يحتوي على سطر موضوع كالرسالة.'
				],
				explanationAr: 'التكثيف يقوم على استبقاء الأفكار الجوهرية وإسقاط التفاصيل الثانوية.'
			}
		]
	}
];
