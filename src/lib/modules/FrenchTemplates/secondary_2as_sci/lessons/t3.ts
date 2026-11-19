import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWordFormation,
	svgFrenchWritingBlueprint
} from '../../svg-french';

export const LESSONS_2AS_SCI_T3: FrenchInteractiveLessonData[] = [
	// [1] Les caractéristiques du reportage
	{
		id: 'fre_lesson_2as_sci_t3_caracteristiques_reportage',
		slug: 'fre-2as-sci-t3-caracteristiques-reportage',
		grade: '2as_se',
		yearSubjectId: 675,
		trimesterId: 't3',
		sequenceId: 'proj3',
		sequenceTitleAr: 'المشروع 3: الريبورتاج العلمي والسياحي حول الجزائر وقصة الاستشراف العلمي الأخلاقي',
		order: 1,
		titleAr: 'خصائص الريبورتاج الصحفي والعلمي (Les caractéristiques du reportage)',
		objectives: [
			'التعرف على البنية المميزة للريبورتاج (العنوان، التمهيد/chapeau، التموضع المكاني والزماني، الشهادات الحية)',
			'تحديد قيمة « حاضر الريبورتاج » (le présent de reportage) الذي ينقل القارئ إلى قلب الحدث والمكان',
			'استثمار المعجم الجغرافي والحسي والوصفي التقديري لإبراز المشاريع البيئية والسياحية في الجزائر'
		],
		keywordsAr: [
			'Reportage',
			'Chapeau',
			'Ancrage spatio-temporel',
			'Témoignages',
			'Présent de reportage',
			'Visée informative',
			'Algérie'
		],
		discover: {
			scenarioAr:
				'تخيّل صحفيا علميا يسافر إلى الهضاب العليا لتغطية إعادة بعث السد الأخضر (Le Barrage Vert). يبدأ مقاله بـ « chapeau » يلخص المكان والحدث، ثم يكتب بالحاضر: « Ce matin, à Djelfa, les jeunes forestiers plantent des milliers d’arbres résistants à la sécheresse. Un ingénieur agronome confie : "Chaque arbre planté freine l’avancée du sable." » هذا هو الريبورتاج الحي!',
			svg: svgFrenchGrammarMap({
				title: 'Les 4 piliers du reportage scientifique et touristique',
				rootLabel: 'Le Reportage de terrain',
				rootSub: 'Faire voir, faire entendre et informer',
				branches: [
					{ label: 'Ancrage', rule: 'Lieu + Temps précis', example: 'À Ghardaïa, dès l’aube' },
					{ label: 'Présent vivant', rule: 'Présent de reportage', example: 'Les techniciens vérifient' },
					{ label: 'Témoignages', rule: 'Paroles d’acteurs', example: '« L’eau est partagée »' },
					{ label: 'Description', rule: 'Lexique sensoriel', example: 'oasis verdoyante, silence' }
				]
			}),
			steps: [
				{
					promptAr: 'ما دور الفقرة التمهيدية (le chapeau) التي تأتي مباشرة تحت عنوان الريبورتاج؟',
					hintAr: 'لاحظ أنها تجيب بسرعة عن: من؟ ماذا؟ أين؟ متى؟ لتشجيع القارئ على المتابعة.',
					expectedInput: 'تلخيص مضمون الريبورتاج وجذب انتباه القارئ بالإجابة عن الأسئلة الأساسية',
					revealAr:
						'التمهيد (le chapeau) فقرة موجزة تلي العنوان مباشرة؛ تلخص جوهر الريبورتاج (Qui ? Quoi ? Où ? Quand ?) وتشوّق القارئ لقراءة التفاصيل.'
				},
				{
					promptAr: 'لماذا يفضّل الصحفي استعمال الحاضر (plantent, confie) بدل الماضي عند وصف ما يراه في الميدان؟',
					hintAr: 'كيف يشعر القارئ عندما يقرأ الحدث وكأنه يقع أمام عينيه الآن؟',
					expectedInput: 'لإشعار القارئ بأنه يعيش المشهد مباشرة في قلب الميدان (présent de reportage)',
					revealAr:
						'يُسمى « حاضر الريبورتاج » (présent de reportage / d’actualisation) لأنه يُحيي المشهد ويضع القارئ في قلب التجربة الميدانية.'
				},
				{
					promptAr: 'ما الفائدة من إدراج شهادة المهندس الزراعي داخل الريبورتاج؟',
					hintAr: 'فكّر في المصداقية والواقعية وتنويع الأصوات داخل المقال.',
					expectedInput: 'إضفاء المصداقية والواقعية وإثراء المقال بصوت أهل الميدان',
					revealAr:
						'الشهادات الميدانية (les témoignages) تُكسب الريبورتاج مصداقية (authenticité) وتسمح بسماع صوت الخبراء والسكان المحليين.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الريبورتاج (Le reportage): مقال صحفي ميداني يجمع بين الإخبار والوصف والسرد ونقل الشهادات لإطلاع القارئ على مكان أو مشروع علمي/بيئي في الجزائر.',
				'التموضع المكاني والزماني (L’ancrage spatio-temporel): مؤشرات دقيقة للمكان والزمان (À Adrar, dans la vallée du M’Zab, à l’aube, au printemps, à 600 km au sud d’Alger).',
				'الأزمنة المهيمنة: حاضر الريبورتاج (le présent de reportage) للوصف الحيّ، والماضي المركب (passé composé) للأعمال المنجزة، والمستقبل (futur simple) لآفاق المشروع.',
				'تعدّد الأصوات: حضور الصحفي الملاحِظ (نحن نكتشف / على الميدان) + شهادات الشهود والخبراء بالكلام المباشر أو غير المباشر.',
				'الغاية التواصلية (La visée): إعلام القارئ (informer)، وتثمين التراث الطبيعي أو العلمي الجزائري (valoriser / faire découvrir).'
			],
			visualSvg: svgFrenchWritingBlueprint({
				title: 'Structure type d’un reportage journalistique',
				steps: [
					{ stage: 'Titre + Chapeau', detail: 'Titre accrocheur + court résumé (Qui, Quoi, Où, Quand)', color: '#1d4ed8' },
					{ stage: 'Immersion terrain', detail: 'Ancrage spatio-temporel + description au présent vivant', color: '#047857' },
					{ stage: 'Faits & Témoignage', detail: 'Données scientifiques + parole d’un ingénieur ou habitant', color: '#b45309' },
					{ stage: 'Chute / Ouverture', detail: 'Bilan valorisant et perspective d’avenir pour le projet', color: '#7c3aed' }
				]
			}),
			visualCaptionAr: 'المخطط البنائي للريبورتاج العلمي والسياحي كما يُدرس في السنة الثانية ثانوي',
			examples: [
				{
					problemAr: 'Relevez les indicateurs spatio-temporels : « Dès six heures du matin, dans la palmeraie de Ghardaïa, les agriculteurs inspectent les canaux de partage des eaux. »',
					solutionAr: 'Indicateur de temps : Dès six heures du matin. Indicateur de lieu : dans la palmeraie de Ghardaïa.'
				},
				{
					problemAr: 'Quelle est la visée d’un reportage sur la centrale photovoltaïque d’Adrar ?',
					solutionAr: 'Informer le lecteur sur le fonctionnement de cette centrale et valoriser les efforts de l’Algérie dans les énergies propres.'
				}
			],
			watchOutAr:
				'الريبورتاج ليس مقالا موسوعيا جامدا؛ إذ يتميز بحيوية المشاهدة الميدانية (présent de reportage)، والتفاصيل المكانية الدقيقة، ونقل شهادة حقيقية واحدة على الأقل.'
		},
		practice: [
			{
				questionAr: 'Quel élément placé juste sous le titre résume l’essentiel d’un reportage pour capter l’attention du lecteur ?',
				options: ['La bibliographie', 'Le chapeau', 'L’annexe', 'La légende de bas de page'],
				correctIndex: 1,
				diagnosticFeedback: [
					'المراجع تأتي في نهاية البحوث لا تحت عنوان الريبورتاج.',
					'صحيح! « le chapeau » هو التمهيد الموجز الذي يلي العنوان في المقال الصحفي.',
					'الملحق يأتي في نهاية الكتاب.',
					'الشرح السفلي يخص الصور أو الحواشي.'
				],
				explanationAr: 'يُطلق على الفقرة التمهيدية الموجزة أسفل عنوان الريبورتاج اسم « le chapeau ».'
			},
			{
				questionAr: 'Pourquoi le reporter intègre-t-il des témoignages d’ingénieurs ou d’habitants dans son article ?',
				options: [
					'Pour rendre le reportage plus vivant, authentique et crédible',
					'Pour remplacer complètement toute description du lieu',
					'Pour éviter d’utiliser le présent de l’indicatif',
					'Pour transformer le reportage en simple liste de définitions'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! الشهادات تمنح الريبورتاج المصداقية والحيوية الميدانية.',
					'الوصف يبقى أساسيا إلى جانب الشهادات.',
					'حاضر الريبورتاج يظل مستعملا بجانب الشهادات.',
					'الريبورتاج مقال حي لا قائمة تعريفات جامدة.'
				],
				explanationAr: 'إدراج شهادات أهل الميدان يوثّق المعلومات ويقرب التجربة الإنسانية والعلمية من القارئ.'
			},
			{
				questionAr: 'Dans un reportage, quelle est la valeur du présent dans : « Sous le soleil d’Adrar, les rangées de panneaux suivent la course de la lumière » ?',
				options: [
					'Présent d’habitude ancienne',
					'Présent de reportage (actualisation du spectacle observé)',
					'Présent d’ordre impératif',
					'Présent de condition hypothétique'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا يصف عادة مندثرة في الماضي.',
					'ممتاز! حاضر الريبورتاج يضع القارئ في قلب المشهد كما لو كان يراه مباشرة.',
					'ليس في الجملة أمر موجّه.',
					'لا يوجد شرط أو فرضية.'
				],
				explanationAr: 'حاضر الريبورتاج (présent de reportage) ينقل المشهد الميداني بحيوية فورية.'
			},
			{
				questionAr: 'Quel passage appartient le plus clairement à un reportage sur la Vallée du M’Zab ?',
				options: [
					'Il était une fois un voyageur qui rêvait d’îles lointaines.',
					'À l’aube, sur les hauteurs de Béni Isguen, le guide local montre les digues ingénieuses qui captent chaque goutte de crue.',
					'L’eau est composée de deux atomes d’hydrogène et d’un atome d’oxygène.',
					'Calculez le débit moyen d’un canal en litres par seconde.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه صيغة حكاية خيالية (Il était une fois).',
					'صحيح! يجمع التموضع الزماني والمكاني (À l’aube, Béni Isguen) والحاضر الميداني والملاحظة الحية.',
					'هذه جملة تعريفية كيميائية صرفة.',
					'هذه تعليمة تمرين رياضي.'
				],
				explanationAr: 'الريبورتاج يجمع التموضع الزماني والمكاني الدقيق مع الوصف الميداني وحاضر المشاهدة.'
			},
			{
				questionAr: 'Quelle est généralement la double visée d’un reportage touristique et écologique sur l’Algérie ?',
				options: [
					'Informer le public et valoriser un patrimoine naturel ou scientifique',
					'Critiquer la géographie du pays sans preuve',
					'Enseigner uniquement la conjugaison des verbes irréguliers',
					'Cacher le nom des régions visitées'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة دقيقة! الإعلام والتعريف والتثمين هي الغاية المزدوجة للريبورتاج السياحي والعلمي.',
					'الريبورتاج السياحي والعلمي يعرّف ويثمّن بمصداقية لا بالنقد المجاني.',
					'لا يهدف لتدريس التصريف النحوي.',
					'على العكس، التحديد الجغرافي الدقيق شرط أساسي في الريبورتاج.'
				],
				explanationAr: 'يسعى الريبورتاج حول مشاريع الجزائر ومناطقها إلى إعلام القارئ وتثمين الثروات والجهود الوطنية.'
			}
		]
	},

	// [2] Le discours rapporté (direct, indirect et verbes introducteurs)
	{
		id: 'fre_lesson_2as_sci_t3_discours_rapporte',
		slug: 'fre-2as-sci-t3-discours-rapporte',
		grade: '2as_se',
		yearSubjectId: 675,
		trimesterId: 't3',
		sequenceId: 'proj3',
		sequenceTitleAr: 'المشروع 3: الريبورتاج العلمي والسياحي حول الجزائر وقصة الاستشراف العلمي الأخلاقي',
		order: 2,
		titleAr: 'الكلام المنقول: المباشر وغير المباشر وأفعال القول (Le discours rapporté)',
		objectives: [
			'التمييز الدقيق بين الكلام المباشر (discours direct) والكلام غير المباشر (discours indirect) داخل الريبورتاج',
			'إتقان قواعد التحويل من المباشر إلى غير المباشر: مطابقة الأزمنة (concordance des temps)، وتغيير الضمائر والمؤشرات الزمانية والمكانية',
			'اختيار فعل التقديم المناسب (verbe introducteur) حسب نوع الجملة المنقولة (إخبار، استفهام، أمر/نصيحة)'
		],
		keywordsAr: [
			'Discours direct',
			'Discours indirect',
			'Verbes introducteurs',
			'Concordance des temps',
			'Indicateurs spatio-temporels',
			'Témoignage'
		],
		discover: {
			scenarioAr:
				'في ريبورتاج حول السد الأخضر، نُقلت شهادة المهندسة بطريقتين: (1) مباشر: L’ingénieure a déclaré : « Aujourd’hui, nous plantons des espèces locales et nous protégerons ces terres demain. » (2) غير مباشر: L’ingénieure a déclaré que ce jour-là, ils plantaient des espèces locales et qu’ils protégeraient ces terres le lendemain. لاحظ التغييرات الأربعة التي وقعت عند إزالة المزدوجتين!',
			svg: svgFrenchConjugationChart({
				title: 'Concordance des temps (Verbe introducteur au PASSÉ)',
				subtitle: 'Quand le verbe introducteur est au passé (a déclaré, expliquait...)',
				columns: [
					{ header: 'Présent -> Imparfait', rule: 'je plante -> il plantait', examples: 'est -> était' },
					{ header: 'Passé comp. -> P.Q.P.', rule: 'j’ai vu -> il avait vu', examples: 'a fini -> avait fini' },
					{ header: 'Futur -> Cond. prés.', rule: 'nous irons -> ils iraient', examples: 'sera -> serait' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الذي حدث للزمن (plantons) وللزمن (protégerons) بعد فعل التقديم الماضي (a déclaré)؟',
					hintAr: 'قارن بين (plantons -> plantaient) و (protégerons -> protégeraient).',
					expectedInput: 'الحاضر تحول إلى imparfait والمستقبل البسيط تحول إلى conditionnel présent',
					revealAr:
						'عندما يكون فعل القول في الماضي (a déclaré)، يتحول الحاضر إلى ماضٍ ناقص (imparfait)، والمستقبل البسيط إلى شرطي حاضر (conditionnel présent)، والماضي المركب إلى ماضٍ تام (plus-que-parfait).'
				},
				{
					promptAr: 'ماذا حدث لظرفي الزمان « Aujourd’hui » و« demain » عند التحويل؟',
					hintAr: 'لم نعد في لحظة الكلام نفسها؛ كيف أصبحت الكلمتان؟',
					expectedInput: 'aujourd’hui أصبحت ce jour-là، و demain أصبحت le lendemain',
					revealAr:
						'تتغير المؤشرات الزمنية والمكانية المرتبطة بلحظة الكلام: aujourd’hui -> ce jour-là، demain -> le lendemain، hier -> la veille، ici -> là-bas.'
				},
				{
					promptAr: 'هل تتغير الأزمنة والمؤشرات إذا كان فعل التقديم في الحاضر (L’ingénieure déclare que...)؟',
					hintAr: 'تخيل أنك تنقل الكلام في اللحظة نفسها: L’ingénieure déclare qu’ils plantent...',
					expectedInput: 'لا، تبقى الأزمنة والمؤشرات كما هي وتتغير الضمائر والرابط فقط',
					revealAr:
						'إذا كان فعل التقديم في الحاضر أو المستقبل (déclare / affirme)، فلا تتغير أزمنة الأفعال ولا المؤشرات الزمنية، بل تتغير الضمائر وأداة الربط فقط!'
				}
			]
		},
		summary: {
			rulesAr: [
				'الربط حسب نوع الجملة في الكلام غير المباشر: الجملة الخبرية -> que / qu’؛ الاستفهام الكلي (Est-ce que / inversion) -> si؛ الاستفهام بـ (Que / Qu’est-ce que) -> ce que؛ الاستفهام بـ (Qu’est-ce qui) -> ce qui؛ كلمات الاستفهام الأخرى (où, quand, comment, pourquoi) -> تبقى كما هي؛ الجملة الأمرية -> de + infinitif.',
				'مطابقة الأزمنة عندما يكون فعل التقديم في الماضي (a dit, déclara, expliquait): présent -> imparfait | passé composé -> plus-que-parfait | futur simple -> conditionnel présent | futur antérieur -> conditionnel passé.',
				'تحويل المؤشرات الزمنية والمكانية (مع فعل تقديم ماضٍ): aujourd’hui -> ce jour-là | hier -> la veille | demain -> le lendemain | ce mois-ci -> ce mois-là | ici -> là / là-bas.',
				'تنوع أفعال التقديم (Verbes introducteurs): بدل تكرار « dire » نستعمل: affirmer, expliquer, préciser, témoigner (للخبر)، demander, s’interroger (للسؤال)، conseiller, recommander, ordonner (للأمر/النصيحة)، s’exclamer (للتعجب).'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Passer du Discours Direct au Discours Indirect',
				rootLabel: 'Type de phrase rapportée',
				rootSub: 'Supprimer les guillemets « » et adapter pronoms/temps',
				branches: [
					{ label: 'Déclarative', rule: '+ que / qu’', example: 'Il dit qu’il agit.' },
					{ label: 'Interrog. totale', rule: '+ si (sans ?)', example: 'Il demande si c’est prêt.' },
					{ label: 'Que / Qu’est-ce', rule: '+ ce que / ce qui', example: 'Il demande ce qu’il voit.' },
					{ label: 'Impérative', rule: '+ de + infinitif', example: 'Il conseille de trier.' }
				]
			}),
			visualCaptionAr: 'دليل التحويل الدقيق لأنواع الجمل الأربع من الكلام المباشر إلى غير المباشر',
			examples: [
				{
					problemAr: 'Transposez au discours indirect : Le guide a demandé aux visiteurs : « Avez-vous observé les canaux hier ? »',
					solutionAr: 'Le guide a demandé aux visiteurs s’ils avaient observé les canaux la veille.'
				},
				{
					problemAr: 'Transposez au discours indirect : Le chercheur a recommandé aux jeunes : « Protégez la biodiversité ! »',
					solutionAr: 'Le chercheur a recommandé aux jeunes de protéger la biodiversité.'
				}
			],
			watchOutAr:
				'انتبه لثلاثة فخاخ كلاسيكية: (1) يُحذف « ? » وعلامات المزدوجتين في الكلام غير المباشر! (2) بعد « si » الاستفهامية يُلغى قلب الفاعل والفعل (نقول: s’ils avaient observé، لا s’avaient-ils observé). (3) لا تحوّل الأزمنة إذا كان فعل التقديم في الحاضر (Il explique que...)!'
		},
		practice: [
			{
				questionAr: 'Transposez au discours indirect : Le technicien a affirmé : « Cette station produira une énergie propre demain. »',
				options: [
					'Le technicien a affirmé que cette station produira une énergie propre demain.',
					'Le technicien a affirmé que cette station produirait une énergie propre le lendemain.',
					'Le technicien a affirmé si cette station produisait une énergie propre le lendemain.',
					'Le technicien a affirmé que cette station a produit une énergie propre la veille.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'فعل التقديم في الماضي (a affirmé)، فيجب تحويل المستقبل (produira) و (demain).',
					'إجابة مثالية! futur -> conditionnel présent (produirait) و demain -> le lendemain.',
					'الجملة خبرية لا استفهامية، فلا نستعمل si.',
					'حولت المعنى إلى الماضي بدل المستقبل في الماضي.'
				],
				explanationAr: 'بعد فعل تقديم ماضٍ (a affirmé)، يتحول futur simple إلى conditionnel présent و demain إلى le lendemain.'
			},
			{
				questionAr: 'Choisissez la transposition correcte : Le journaliste a demandé au forestier : « Qu’est-ce que vous plantez ici ? »',
				options: [
					'Le journaliste a demandé au forestier qu’est-ce qu’il plantait là-bas.',
					'Le journaliste a demandé au forestier ce qu’il plantait là-bas.',
					'Le journaliste a demandé au forestier si il plantait ici ?',
					'Le journaliste a demandé au forestier ce qui il plante ici.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'في الكلام غير المباشر لا نحتفظ بـ « qu’est-ce que » بل نحولها إلى « ce que ».',
					'أحسنت! « qu’est-ce que » -> « ce que »، والحاضر -> imparfait، و« ici » -> « là-bas ».',
					'لا نستعمل si مع سؤال عن المفعول به، كما تُحذف علامة الاستفهام.',
					'نستعمل « ce que » للمفعول به لا « ce qui »، كما يجب مطابقة الزمن.'
				],
				explanationAr: 'الاستفهام الجزئي بـ « Qu’est-ce que » يتحول في الكلام غير المباشر إلى « ce que » مع مطابقة الزمن والمكان.'
			},
			{
				questionAr: 'Transformez au discours indirect : L’architecte a conseillé aux étudiants : « Observez les constructions traditionnelles du M’Zab ! »',
				options: [
					'L’architecte a conseillé aux étudiants qu’ils observent les constructions traditionnelles du M’Zab.',
					'L’architecte a conseillé aux étudiants d’observer les constructions traditionnelles du M’Zab.',
					'L’architecte a conseillé aux étudiants si ils observaient les constructions traditionnelles du M’Zab.',
					'L’architecte a conseillé aux étudiants observer les constructions traditionnelles du M’Zab.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الأصل والأدق مع الجملة الأمرية هو (de + infinitif).',
					'صحيح! الجملة الأمرية تتحول إلى (de / d’ + infinitif) بعد أفعال النصح والأمر.',
					'si خاصة بالاستفهام الكلي لا الأمر.',
					'ينقصها حرف الجر (d’) قبل المصدر.'
				],
				explanationAr: 'الأمر (impératif) في الكلام المباشر يُحوّل في غير المباشر إلى « de + infinitif ».'
			},
			{
				questionAr: 'Complétez correctement lorsque le verbe introducteur est au PRÉSENT : L’expert explique : « Nous avons installé cent capteurs aujourd’hui. » -> L’expert explique ........',
				options: [
					'qu’ils avaient installé cent capteurs ce jour-là.',
					'qu’ils ont installé cent capteurs aujourd’hui.',
					's’ils ont installé cent capteurs aujourd’hui.',
					'qu’ils installeraient cent capteurs le lendemain.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'فعل التقديم (explique) في الحاضر وليس الماضي، فلا نغيّر الزمن ولا الظرف!',
					'ممتاز! مع فعل تقديم في الحاضر نغيّر الضمير فقط (nous -> ils) ويبقى الزمن والظرف ثابتين.',
					'الجملة خبرية فلا نستعمل si.',
					'غيّرت الزمن والمعنى دون مسوّغ.'
				],
				explanationAr: 'حين يكون فعل التقديم في الحاضر (explique)، لا تقع مطابقة الأزمنة ولا تتغير الظروف الزمنية.'
			},
			{
				questionAr: 'Quel verbe introducteur remplace le mieux « dit » dans : « N’oubliez jamais d’économiser l’eau », dit le responsable ?',
				options: ['interroge', 'recommande', 'répond', 'nie'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الجملة نصيحة/توصية وليست سؤالا.',
					'صحيح! « recommande » (يوصي) يعبّر بدقة عن دلالة النصيحة والتوجيه.',
					'لا يظهر في الجملة أنها جواب عن سؤال.',
					'nie تعني ينكر، وهذا عكس المعنى.'
				],
				explanationAr: 'اختيار فعل التقديم الدقيق (recommander, conseiller, avertir) يثري الأسلوب الصحفي.'
			}
		]
	},

	// [3] Les temps de l'anticipation (futur simple, conditionnel présent et futur antérieur)
	{
		id: 'fre_lesson_2as_sci_t3_temps_anticipation',
		slug: 'fre-2as-sci-t3-temps-anticipation',
		grade: '2as_se',
		yearSubjectId: 675,
		trimesterId: 't3',
		sequenceId: 'proj3',
		sequenceTitleAr: 'المشروع 3: الريبورتاج العلمي والسياحي حول الجزائر وقصة الاستشراف العلمي الأخلاقي',
		order: 3,
		titleAr: 'أزمنة الاستشراف العلمي (Futur simple, conditionnel présent et futur antérieur)',
		objectives: [
			'التمييز بين القيم الدلالية للمستقبل البسيط والشرطي الحاضر والمستقبل الأسبق في قصة الاستشراف العلمي الأخلاقي',
			'تصريف الأفعال المنتظمة وغير المنتظمة في الأزمنة الثلاثة دون خلط بين نهايات (-rai) و(-rais)',
			'التعبير عن تتابع حدثين في المستقبل باستعمال ثنائية (futur antérieur + futur simple)'
		],
		keywordsAr: [
			'Anticipation scientifique',
			'Futur simple',
			'Conditionnel présent',
			'Futur antérieur',
			'Antériorité',
			'Hypothèse future'
		],
		discover: {
			scenarioAr:
				'في قصة استشراف علمي أخلاقي بعنوان « واحة 2050 »، كتب التلميذ: « En 2050, les cités sahariennes produiront toute leur électricité grâce au soleil. Les robots médicaux pourraient assister les médecins dans les zones isolées, mais l’humain gardera la décision éthique. Dès que les capteurs auront détecté une sécheresse, l’irrigation souterraine s’activera automatiquement. » لاحظ تكامل الأزمنة الثلاثة في رسم المستقبل!',
			svg: svgFrenchTenseTimeline({
				title: 'Les temps du récit d’anticipation scientifique',
				tenseName: 'Futur antérieur -> Futur simple / Conditionnel',
				formula: 'Futur ant. (aura + P.P.) précède le Futur simple (-ra) ; Cond. (-rait) = éventualité',
				activeZone: 'future',
				example: 'Quand la centrale aura stocké l’énergie, la ville s’illuminera.',
				markers: 'en 2050, dès que, quand, probablement, selon les projections'
			}),
			steps: [
				{
					promptAr: 'ما الفرق في الدلالة بين « produiront » (مستقبل بسيط) و« pourraient » (شرطي حاضر) في النص؟',
					hintAr: 'أيهما يعبر عن توقع جازم وأيهما يعبر عن احتمال حذر؟',
					expectedInput: 'المستقبل البسيط للحدث المؤكد مستقبلا، والشرطي الحاضر للاحتمال أو الفرضية',
					revealAr:
						'المستقبل البسيط (produiront) يعرض الحدث المستقبلي كأمر مؤكد؛ أما الشرطي الحاضر (pourraient) فيعبر عن فرضية أو إمكانية مستقبلية محتملة.'
				},
				{
					promptAr: 'في الجملة الأخيرة « Dès que les capteurs auront détecté..., l’irrigation s’activera »، أي الحدثين يقع أولا في المستقبل؟',
					hintAr: 'هل تكتشف المستشعرات الجفاف أولا أم ينطلق السقي أولا؟',
					expectedInput: 'اكتشاف الجفاف (auront détecté) يقع أولا قبل انطلاق السقي (s’activera)',
					revealAr:
						'يقع الحدث المصرف في الـ futur antérieur (auront détecté) أولا ويكتمل قبل وقوع الحدث المصرف في الـ futur simple (s’activera).'
				},
				{
					promptAr: 'كيف نُكوّن زمن المستقبل الأسبق (le futur antérieur)؟',
					hintAr: 'انظر إلى الجزأين في (auront détecté).',
					expectedInput: 'المساعد avoir أو être في المستقبل البسيط + اسم المفعول (participe passé)',
					revealAr:
						'يتكوّن الـ futur antérieur من: auxiliaire (avoir / être) au futur simple (aurai, auras, aura... / serai, seras, sera...) + participe passé.'
				}
			]
		},
		summary: {
			rulesAr: [
				'المستقبل البسيط (Le futur simple): جذر المستقبل + (-ai, -as, -a, -ons, -ez, -ont). يعبّر عن توقّع جازم ومباشر في المستقبل (En 2050, la science servira l’homme).',
				'الشرطي الحاضر (Le conditionnel présent): نفس جذر المستقبل + نهايات الماضي الناقص (-ais, -ais, -ait, -ions, -iez, -aient). يعبّر في الاستشراف عن احتمال أو فرضية حذرة أو مستقبل داخل قصة في الماضي.',
				'المستقبل الأسبق (Le futur antérieur): المساعد (avoir أو être) في المستقبل البسيط + participe passé. يعبّر عن حدث مستقبلي يكتمل قبل حدث مستقبلي آخر، خاصة بعد: quand, lorsque, dès que, aussitôt que, après que.',
				'جذور غير منتظمة يجب إتقانها للمستقبل والشرطي معا: être (ser-), avoir (aur-), faire (fer-), aller (ir-), pouvoir (pourr-), voir (verr-), savoir (saur-), venir (viendr-), devoir (devr-).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Comparer les 3 temps de l’anticipation',
				subtitle: 'Ne jamais confondre -rai (futur) et -rais (conditionnel)',
				columns: [
					{ header: 'Futur simple', rule: 'Certitude à venir', examples: 'je verrai / il pourra' },
					{ header: 'Conditionnel prés.', rule: 'Hypothèse / Prudence', examples: 'je verrais / il pourrait' },
					{ header: 'Futur antérieur', rule: '1re action future', examples: 'quand il aura fini' }
				]
			}),
			visualCaptionAr: 'التمييز البصري والصرفي بين أزمنة الاستشراف الثلاثة في الثانية ثانوي علمي',
			examples: [
				{
					problemAr: 'Conjuguez convenablement : « Lorsque les ingénieurs (achever) le réseau solaire, les villages (disposer) d’une énergie propre. »',
					solutionAr: 'Lorsque les ingénieurs auront achevé (futur antérieur) le réseau solaire, les villages disposeront (futur simple) d’une énergie propre.'
				},
				{
					problemAr: 'Exprimez une projection prudente au conditionnel présent : « Ce satellite (pouvoir) prévenir les feux de forêt en quelques secondes. »',
					solutionAr: 'Ce satellite pourrait prévenir les feux de forêt en quelques secondes.'
				}
			],
			watchOutAr:
				'احذر من الخلط الإملائي بين ضمير « je » في المستقبل البسيط (je ferai، دون s) وفي الشرطي الحاضر (je ferais، مع s)! ولاحظ أن الأفعال المصرفة مع (être) في الـ futur antérieur تُطابق الفاعل: Quand la fusée sera partie...'
		},
		practice: [
			{
				questionAr: 'Complétez avec le temps qui exprime l’antériorité future : « Dès que la sonde ........ les données, le centre lancera l’alerte. »',
				options: ['enverra', 'enverrait', 'aura envoyé', 'avait envoyé'],
				correctIndex: 2,
				diagnosticFeedback: [
					'enverra مستقبل بسيط لا يبرز اكتمال الإرسال قبل إطلاق الإنذار.',
					'enverrait شرطي حاضر لا يناسب جملة بعد dès que مع مستقبل.',
					'ممتاز! « aura envoyé » (futur antérieur) يبيّن أن إرسال البيانات يسبق إطلاق الإنذار.',
					'avait envoyé للماضي التام (plus-que-parfait) لا للمستقبل.'
				],
				explanationAr: 'بعد « dès que » مع جملة رئيسية في المستقبل (lancera)، نستعمل الـ futur antérieur (aura envoyé).'
			},
			{
				questionAr: 'Dans un texte d’anticipation scientifique, quelle phrase exprime une hypothèse prudente ?',
				options: [
					'Les villes durables réduiront leur consommation d’eau de moitié.',
					'Les accumulateurs organiques pourraient remplacer les métaux polluants d’ici vingt ans.',
					'Les chercheurs ont testé ce prototype l’année dernière.',
					'Lorsque le projet sera terminé, le quartier deviendra autonome.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'المستقبل البسيط (réduiront) يعرض الفكرة كحقيقة مؤكدة.',
					'صحيح! الشرطي الحاضر (pourraient) يعبّر عن توقع محتمل وحذر.',
					'الماضي المركب يخص حدثا وقع وانتهى.',
					'تتابع حدثين مؤكدين في المستقبل.'
				],
				explanationAr: 'يُستخدم الشرطي الحاضر (conditionnel présent) للتعبير عن فرضية مستقبلية غير جازمة.'
			},
			{
				questionAr: 'Quelle est la conjugaison correcte de « pouvoir » et « voir » au futur simple (3e personne du pluriel) ?',
				options: [
					'ils pouveront / ils voieront',
					'ils pourront / ils verront',
					'ils pourraient / ils verraient',
					'ils pourront / ils voiront'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذان الجذران غير صحيحين في الفرنسية.',
					'أحسنت! الجذران غير المنتظمين هما (pourr-) و(verr-) مع نهاية المستقبل (-ont).',
					'هذه صيغة الشرطي الحاضر (-aient) لا المستقبل البسيط.',
					'جذر voir في المستقبل هو verr- وليس voir-.'
				],
				explanationAr: 'الفعلان pouvoir و voir جذراهما في المستقبل: pourr- و verr- -> ils pourront, ils verront.'
			},
			{
				questionAr: 'Complétez avec l’accord correct au futur antérieur (verbe : arriver) : « Quand les équipes ........ sur place, les mesures commenceront. »',
				options: ['auront arrivé', 'seront arrivées', 'seront arrivé', 'arriveraient'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الفعل arriver يُصرّف مع المساعد être لا avoir.',
					'ممتاز! être au futur (seront) + مطابقة اسم المفعول للمؤنث الجمع (les équipes -> arrivées).',
					'ينقصه توافق التأنيث والجمع (ées) مع الفاعل (les équipes).',
					'الشرطي الحاضر غير مناسب مع الجملة الرئيسية في المستقبل.'
				],
				explanationAr: 'الفعل « arriver » يُصرّف مع المساعد « être » ويطابق الفاعل المؤنث الجمع (les équipes -> seront arrivées).'
			},
			{
				questionAr: 'Pourquoi les récits d’anticipation scientifique éthique insistent-ils sur les valeurs morales face au progrès technique ?',
				options: [
					'Pour montrer que la technologie doit toujours rester au service de l’humain et de la nature',
					'Pour interdire toute forme de recherche scientifique',
					'Pour ignorer les enjeux environnementaux futurs',
					'Pour remplacer les sciences par des mythes anciens'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! الاستشراف العلمي الأخلاقي يربط التقدم التقني بالمسؤولية الأخلاقية وخدمة الإنسان.',
					'الهدف ليس منع العلم بل توجيهه أخلاقيا.',
					'بالعكس، حماية البيئة في قلب الاستشراف العلمي الحديث.',
					'الاستشراف العلمي يرتكز على معطيات علمية منطقية لا على الأساطير.'
				],
				explanationAr: 'الاستشراف العلمي الأخلاقي يدرس أثر الابتكار المستقبلي ليظل العلم نافعا ومضبوطا بالقيم الأخلاقية.'
			}
		]
	},

	// [4] La cohérence textuelle et les substituts anaphoriques
	{
		id: 'fre_lesson_2as_sci_t3_coherence_anaphores',
		slug: 'fre-2as-sci-t3-coherence-anaphores',
		grade: '2as_se',
		yearSubjectId: 675,
		trimesterId: 't3',
		sequenceId: 'proj3',
		sequenceTitleAr: 'المشروع 3: الريبورتاج العلمي والسياحي حول الجزائر وقصة الاستشراف العلمي الأخلاقي',
		order: 4,
		titleAr: 'الاتساق النصي والبدائل الإحالية (La cohérence textuelle et les substituts anaphoriques)',
		objectives: [
			'التمييز الدقيق بين البدائل النحوية (substituts grammaticaux) والبدائل المعجمية (substituts lexicaux)',
			'تحديد مرجع الضمائر والبدائل الإحالية بدقة في أسئلة فهم النص (À qui / À quoi renvoie... ?)',
			'توظيف البدائل الإحالية لتفادي التكرار الممل وضمان الترابط الموضوعي في الريبورتاج والاستشراف'
		],
		keywordsAr: [
			'Cohérence textuelle',
			'Anaphore',
			'Substituts grammaticaux',
			'Substituts lexicaux',
			'Périphrase',
			'Hyperonyme',
			'Progression thématique'
		],
		discover: {
			scenarioAr:
				'تأمل هذه الفقرة المكررة: « Le Barrage Vert traverse les Hauts Plateaux. Le Barrage Vert freine la désertification. Les ingénieurs réhabilitent le Barrage Vert. » الآن قارنها بالنسخة المتسقة: « Le Barrage Vert traverse les Hauts Plateaux. Cette muraille végétale freine la désertification ; les ingénieurs la réhabilitent avec des espèces locales. » لاحظ كيف اختفى التكرار وبقيت الفكرة مترابطة بفضل البدائل الإحالية!',
			svg: svgFrenchGrammarMap({
				title: 'Les deux familles de substituts anaphoriques',
				rootLabel: 'Éviter les répétitions (Anaphore)',
				rootSub: 'Reprendre un élément déjà cité dans le texte',
				branches: [
					{ label: 'Subst. Grammaticaux', rule: 'Pronoms / Déterminants', example: 'il, la, leur, celui-ci, y, en' },
					{ label: 'Synonymes / Hyp.', rule: 'Mot proche / générique', example: 'le satellite -> cet engin' },
					{ label: 'Périphrases', rule: 'Expression descriptive', example: 'Ghardaïa -> perle du M’Zab' }
				]
			}),
			steps: [
				{
					promptAr: 'في النسخة الثانية، ما العبارة التي عوّضت « Le Barrage Vert » وأضافت معلومة وصفية جديدة؟',
					hintAr: 'ابحث عن المجموعة الاسمية التي تبدأ باسم الإشارة (Cette...).',
					expectedInput: 'Cette muraille végétale (بديل معجمي / substitut lexical)',
					revealAr:
						'عبارة « Cette muraille végétale » هي بديل معجمي (substitut lexical / périphrase) يعوّض السد الأخضر ويُثري المعنى في آن واحد.'
				},
				{
					promptAr: 'على ماذا يعود الضمير « la » في « les ingénieurs la réhabilitent »؟',
					hintAr: 'لاحظ أنه ضمير مؤنث مفرد يعود على آخر عبارة أنثوية سبقت مباشرة.',
					expectedInput: 'يعود على « Cette muraille végétale » (أي السد الأخضر)',
					revealAr:
						'الضمير (la) بديل نحوي (substitut grammatical) يعود على « cette muraille végétale » (المؤنث المفرد)، التي تحيل بدورها على السد الأخضر.'
				},
				{
					promptAr: 'ما القاعدة الأولى للتحقق من مرجع أي ضمير مسطّر في سؤال الفهم؟',
					hintAr: 'فكّر في الجنس (مذكر/مؤنث) والعدد (مفرد/جمع) والمعنى في الجملة.',
					expectedInput: 'مطابقة الجنس والعدد والرجوع إلى الاسم المذكور قبله في السياق',
					revealAr:
						'يجب دائما فحص الجنس والعدد (il/elle/ils/elles، le/la/les، son/leur) ثم تجربة تعويض الضمير بالاسم المرجعي للتأكد من صحة المعنى.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الاتساق النصي (La cohérence textuelle) يقوم على ركيزتين: عدم التكرار عبر الإحالة (la reprise anaphorique) وترابط الجمل عبر الروابط المنطقية والتدرّج الموضوعي.',
				'البدائل النحوية (Les substituts grammaticaux): الضمائر الشخصية (il, elle, ils, elles, le, la, les, lui, leur, en, y)، ضمائر الإشارة (celui-ci, celle-là, ce dernier)، ضمائر الملكية وصفاتها (son, sa, ses, leur)، وضمائر الوصل (qui, que, dont, où).',
				'البدائل المعجمية (Les substituts lexicaux): المرادفات (synonymes: chercheur -> savant)، الكلمة الجامعة (hyperonyme: le palmier -> cet arbre)، التغليف الوصفي (périphrase: la Vallée du M’Zab -> ce joyau saharien)، أو الاسم المشتق (nominalisation: On reboise -> cette opération).',
				'ملاحظة مهمة حول (y) و(en): الضمير « y » يعوّض مكانا أو مفعولا مسبوقا بـ (à) (On s’y rend = à Adrar)؛ والضمير « en » يعوّض اسما مسبوقا بـ (de) أو أداة نكرة/كمية (On en plante des milliers = des arbres).'
			],
			visualSvg: svgFrenchWordFormation({
				title: 'Vérifier un substitut en examen',
				prefix: 'Genre / Nombre',
				root: 'Antécédent proche',
				suffix: 'Test de sens',
				derivedWord: 'Référence exacte garantie',
				meaningNote: 'Ex. : « y » = lieu / « à + nom » | « en » = « de + nom » | « celui-ci » = le plus proche'
			}),
			visualCaptionAr: 'خطوات التحقق السريع من مرجع البدائل الإحالية في أسئلة الفهم',
			examples: [
				{
					problemAr: 'Évitez la répétition en utilisant « y » ou « en » : « Les touristes visitent la Casbah et les touristes admirent l’architecture de la Casbah. »',
					solutionAr: 'Les touristes visitent la Casbah et ils en admirent l’architecture. (en = de la Casbah).'
				},
				{
					problemAr: 'Trouvez un substitut lexical pour éviter la répétition de « Alsat-2 » : « Alsat-2 observe les forêts algériennes. ........ transmet des images précises. »',
					solutionAr: 'Ce satellite algérien (ou : Cet engin spatial) transmet des images précises.'
				}
			],
			watchOutAr:
				'انتبه للفرق بين « lui / leur » (يعوضان غالبا شخصا مسبوقا بـ à : parler aux habitants -> leur parler) و« les » (مفعول به مباشر : aider les habitants -> les aider)، ولا تخلط بين « y » (مكان أو à + شيء) و« en » (de + شيء)!'
		},
		practice: [
			{
				questionAr: 'Dans « Les ingénieurs installent des panneaux solaires à Adrar ; ils y mesurent chaque jour le rendement », que remplace le pronom « y » ?',
				options: ['des panneaux solaires', 'les ingénieurs', 'à Adrar', 'le rendement'],
				correctIndex: 2,
				diagnosticFeedback: [
					'des panneaux solaires مفعول مباشر يعوّض بـ en أو les.',
					'les ingénieurs عُوّضت بالضمير ils.',
					'صحيح! الضمير « y » يعوض ظرف المكان « à Adrar ».',
					'le rendement مذكور صراحة في الجملة.'
				],
				explanationAr: 'الضمير النحوي « y » يحلّ محل مكمّل مكاني (à Adrar = là-bas).'
			},
			{
				questionAr: 'Quelle expression constitue un SUBSTITUT LEXICAL (périphrase) pour « le Barrage Vert » ?',
				options: ['il', 'celui-ci', 'cette immense ceinture forestière', 'le'],
				correctIndex: 2,
				diagnosticFeedback: [
					'« il » بديل نحوي (ضمير شخصي).',
					'« celui-ci » بديل نحوي (ضمير إشارة).',
					'ممتاز! « cette immense ceinture forestière » بديل معجمي وصفي يغني النص.',
					'« le » بديل نحوي.'
				],
				explanationAr: 'البديل المعجمي يعوّض الاسم بمجموعة اسمية (مرادف، كلمة جامعة، أو عبارة وصفية).'
			},
			{
				questionAr: 'Choisissez le bon pronom pour éviter la répétition : « La région possède de vastes nappes d’eau ; les agriculteurs ........ tirent de quoi irriguer les palmiers. »',
				options: ['y', 'en', 'leur', 'les'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الفعل tirer يُستعمل مع (de) لا (à).',
					'أحسنت! (tirer de ces nappes -> en tirer) فالضمير « en » يعوّض المسبوق بـ de.',
					'leur تخص العاقل المسبوق بـ à.',
					'les للمفعول به المباشر فقط.'
				],
				explanationAr: 'نقول (tirer de l’eau de ces nappes)، لذا نعوض (de ces nappes) بالضمير « en ».'
			},
			{
				questionAr: 'Dans « Le médecin supervise le robot chirurgical ; ce dernier exécute le geste avec une précision millimétrique », à quoi renvoie « ce dernier » ?',
				options: ['au médecin', 'au robot chirurgical', 'au geste', 'à la précision'],
				correctIndex: 1,
				diagnosticFeedback: [
					'« ce dernier » يحيل إلى آخر اسم ذُكر في الجملة السابقة، وليس الأول.',
					'صحيح! « ce dernier » يحيل دائما إلى العنصر الأقرب المذكور أخيرا وهو « le robot chirurgical ».',
					'le geste يأتي بعد ce dernier لا قبله.',
					'la précision مؤنثة وتأتي بعده.'
				],
				explanationAr: 'البديل « ce dernier / cette dernière » يعود دائما على أقرب اسم مناسب ذُكر قبله مباشرة.'
			},
			{
				questionAr: 'Pourquoi les substituts anaphoriques sont-ils essentiels dans un reportage ou un récit d’anticipation ?',
				options: [
					'Ils évitent les répétitions lourdes et assurent la continuité logique du texte',
					'Ils servent à allonger inutilement les phrases',
					'Ils empêchent le lecteur de savoir de quoi on parle',
					'Ils remplacent tous les verbes conjugués'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة دقيقة! البدائل الإحالية تمنع التكرار وتربط فقرات النص في نسيج متماسك.',
					'على العكس، فهي تختصر الكلام وتجعله أكثر رشاقة.',
					'البديل الجيد يحافظ على وضوح المعنى دون غموض.',
					'البدائل تعوّض الأسماء أو المجموعات الاسمية لا الأفعال.'
				],
				explanationAr: 'تؤمّن الإحالة (l’anaphore) تماسك النص وسلاسته دون تكرار ممل للاسم نفسه.'
			}
		]
	},

	// [5] Rédiger un reportage sur un projet scientifique/écologique en Algérie
	{
		id: 'fre_lesson_2as_sci_t3_rediger_reportage_algerie',
		slug: 'fre-2as-sci-t3-rediger-reportage-algerie',
		grade: '2as_se',
		yearSubjectId: 675,
		trimesterId: 't3',
		sequenceId: 'proj3',
		sequenceTitleAr: 'المشروع 3: الريبورتاج العلمي والسياحي حول الجزائر وقصة الاستشراف العلمي الأخلاقي',
		order: 5,
		titleAr: 'تحرير ريبورتاج علمي أو بيئي حول الجزائر (Rédiger un reportage sur un projet en Algérie)',
		objectives: [
			'كتابة ريبورتاج متكامل حول مشروع علمي أو بيئي في الجزائر (السد الأخضر، الطاقات المتجددة، واحات ميزاب)',
			'دمج خصائص الريبورتاج: عنوان جذاب، تمهيد (chapeau)، حاضر الميدان، شهادة حية، وبدائل إحالية متسقة',
			'استثمار الزمن المستقبلي في الخاتمة لإبراز الآفاق العلمية والبيئية المستدامة للمشروع'
		],
		keywordsAr: [
			'Rédiger un reportage',
			'Barrage Vert',
			'Énergies renouvelables',
			'Vallée du M’Zab',
			'Chapeau',
			'Témoignage',
			'Chute optimiste'
		],
		discover: {
			scenarioAr:
				'طلبت منك مجلة الثانوية العلمية إعداد ريبورتاج قصير (12 إلى 16 سطرا) حول مشروع بيئي أو علمي جزائري ناجح: إعادة بعث السد الأخضر، أو محطة طاقة شمسية بالصحراء، أو نظام تقاسم المياه العبقري بواحات وادي ميزاب. لتحقيق العلامة الكاملة (6/6)، تذكّر أن القارئ يريد أن « يرى المكان » و« يسمع شاهدا من الميدان » و« يفهم القيمة العلمية للمشروع ».',
			svg: svgFrenchWritingBlueprint({
				title: 'Plan modèle : Rédiger un reportage sur l’Algérie (6 pts)',
				steps: [
					{ stage: '1. Titre & Chapeau', detail: 'Titre vivant + 2 phrases résumant lieu, projet et enjeu', color: '#1d4ed8' },
					{ stage: '2. Tableau vivant', detail: 'Situer lieu/heure + décrire au présent de reportage', color: '#047857' },
					{ stage: '3. Voix du terrain', detail: 'Intégrer 1 témoignage (direct ou indirect) + fait précis', color: '#b45309' },
					{ stage: '4. Chute d’avenir', detail: 'Conclure au futur sur l’impact durable du projet', color: '#7c3aed' }
				]
			}),
			steps: [
				{
					promptAr: 'ما العناصر التي تفرق فورا بين « ريبورتاج صحفي » و« فقرة عادية » في الورقة؟',
					hintAr: 'انظر إلى أعلى المقال وإلى وسطه: العنوان، التمهيد، والشهادة.',
					expectedInput: 'العنوان الجذاب، التمهيد (chapeau)، التموضع الميداني، والشهادة المنقولة',
					revealAr:
						'الريبورتاج يتميز بصريا ومنهجيا بـ: عنوان جذاب + chapeau موجز + وصف ميداني بحاضر الريبورتاج + شهادة مهندس أو مواطن + خاتمة متفائلة.'
				},
				{
					promptAr: 'أعط مثالا لشهادة قصيرة مناسبة لريبورتاج حول السد الأخضر (Le Barrage Vert).',
					hintAr: 'اجعل مهندسا غابيا يشرح فائدة الأشجار المثمرة والمقاومة للجفاف.',
					expectedInput: 'Un ingénieur forestier confie : « Planter des espèces adaptées protège les sols et crée des emplois locaux. »',
					revealAr:
						'مثال سليم: Un ingénieur forestier explique : « La plantation d’espèces locales, comme le pistachier de l’Atlas et l’olivier, freine la désertification et soutient les familles rurales. »'
				},
				{
					promptAr: 'كيف نضمن التماسك النصي دون تكرار اسم المشروع في كل سطر؟',
					hintAr: 'تذكر درس البدائل الإحالية (substituts grammaticaux et lexicaux).',
					expectedInput: 'باستعمال البدائل النحوية والمعجمية (cette muraille verte, ce projet, il, y)',
					revealAr:
						'نوع الإحالة بين البدائل النحوية (il, elle, y, celui-ci) والبدائل المعجمية (ce rempart écologique, ce joyau saharien, cette centrale propre).'
				}
			]
		},
		summary: {
			rulesAr: [
				'اختيار عنوان موجز وحيّ: مثلا « Le Barrage Vert renaît sur les Hauts Plateaux » أو « Adrar : le soleil au service de l’énergie propre » أو « La Vallée du M’Zab : génie hydraulique au cœur du désert ».',
				'كتابة Chapeau من جملتين: يحدد المكان والزمان والهدف العلمي أو البيئي للمشروع.',
				'توظيف الحاضر الميداني (présent de reportage) + معجم وصفي تقديري (ingénieux, durable, verdoyant, ambitieux) + مؤشرات مكانية دقيقة.',
				'إدراج شهادة واحدة على الأقل بالكلام المباشر (مع المزدوجتين وفعل تقديم دقيق) أو غير المباشر، ثم إنهاء المقال بخاتمة استشرافية بالمستقبل البسيط (futur simple).'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Thèmes phares de reportage en Algérie (2AS)',
				rootLabel: 'Projets scientifiques & écologiques',
				rootSub: 'Valoriser le patrimoine et l’innovation',
				branches: [
					{ label: 'Barrage Vert', rule: 'Hauts Plateaux', example: 'reboisement, sols, climat' },
					{ label: 'Solaire Sahara', rule: 'Adrar / Tamanrasset', example: 'panneaux, énergie propre' },
					{ label: 'Oasis du M’Zab', rule: 'Ghardaïa', example: 'digues, partage de l’eau' }
				]
			}),
			visualCaptionAr: 'المشاريع الجزائرية الثلاثة الأبرز لتحرير ريبورتاج علمي وبيئي متميز',
			examples: [
				{
					problemAr: 'Rédigez un titre et un chapeau pour un reportage sur les oasis du M’Zab.',
					solutionAr: 'Titre : La Vallée du M’Zab, un modèle millénaire de gestion de l’eau.\nChapeau : À Ghardaïa, au cœur d’un désert aride, les oasis verdoyantes défient la sécheresse grâce à un système hydraulique ingénieux que les habitants préservent encore aujourd’hui.'
				},
				{
					problemAr: 'Rédigez une phrase de chute au futur simple pour un reportage sur l’énergie solaire en Algérie.',
					solutionAr: 'À l’horizon 2035, ces centrales propres permettront de réduire durablement la dépendance aux énergies fossiles et inspireront toute une génération d’ingénieurs algériens.'
				}
			],
			watchOutAr:
				'احذر من نسيان الـ chapeau أو من كتابة الريبورتاج بالكامل في الماضي البعيد! الريبورتاج الحي ينبض بالحاضر الميداني، ويتضمّن صوتا من الواقع (شهادة)، ويحافظ على الدقة العلمية بعيدا عن المبالغة الخيالية.'
		},
		practice: [
			{
				questionAr: 'Quel titre est le plus adapté à un reportage écologique sur le Barrage Vert en Algérie ?',
				options: [
					'Les verbes du troisième groupe en français',
					'Hauts Plateaux : la renaissance écologique du Barrage Vert',
					'Mon résumé d’un cours de chimie organique',
					'Une fable sur deux oiseaux dans un jardin'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'عنوان درس نحو لا علاقة له بالريبورتاج.',
					'أحسنت! عنوان صحفي جذاب يحدد المكان (Hauts Plateaux) والموضوع البيئي بدقة.',
					'هذا عنوان ملخص دراسي وليس ريبورتاجا.',
					'عنوان حكاية خيالية لا ريبورتاج ميداني.'
				],
				explanationAr: 'العنوان الجيد للريبورتاج يكون موجزا وجذابا ويلمّح إلى المكان والموضوع.'
			},
			{
				questionAr: 'Quel élément est INDISPENSABLE pour donner une voix authentique au terrain dans votre reportage ?',
				options: [
					'Une liste de vingt définitions tirées du dictionnaire',
					'Le témoignage d’un ingénieur, d’un chercheur ou d’un habitant local',
					'Une équation algébrique sans explication',
					'Un paragraphe copié d’un autre sujet'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'قائمة التعريفات تُفقد الريبورتاج روحه الميدانية.',
					'صحيح! شهادة أحد الفاعلين في الميدان تمنح المقال صدقية وحيوية صحفية.',
					'المعادلات المجردة لا تغني عن صوت الشهود.',
					'النسخ يضيع علامة الإنتاج الكتابي.'
				],
				explanationAr: 'إدراج شهادة ميدانية بالكلام المباشر أو غير المباشر ركن أساسي في الريبورتاج.'
			},
			{
				questionAr: 'Quel temps est recommandé pour la phrase finale (la chute) évoquant les perspectives d’un projet écologique ?',
				options: ['L’imparfait', 'Le plus-que-parfait', 'Le futur simple', 'Le passé simple'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الماضي الناقص يعود للوراء ولا يفتح أفق المستقبل.',
					'الماضي التام يخص أحداثا منقضية.',
					'ممتاز! المستقبل البسيط يرسم الآفاق المستدامة للمشروع بأسلوب مشرق.',
					'الماضي البسيط للسرد الأدبي الماضي.'
				],
				explanationAr: 'تُختم التقارير العلمية والبيئية غالبا بالمستقبل البسيط لإبراز الأثر المستقبلي للمشروع.'
			},
			{
				questionAr: 'Dans un reportage sur les oasis du M’Zab, quelle combinaison de substituts évite le mieux la répétition du mot « eau » ?',
				options: [
					'cette ressource précieuse / elle / en',
					'eau / eau / eau / eau',
					'le sable / le vent / la pierre',
					'eux / ils / leurs'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! يجمع بين بديل معجمي تقديري (cette ressource précieuse) وبدائل نحوية مؤنثة مفردة (elle, en).',
					'التكرار المباشر يُضعف الأسلوب.',
					'هذه كلمات مختلفة المعنى ولا تحيل على الماء.',
					'ضمائر جمع مذكر لا تطابق كلمة « eau » المؤنثة المفردة.'
				],
				explanationAr: 'كلمة « eau » مؤنثة مفردة، لذا تُعوَّض معجميا بـ (cette ressource précieuse) ونحويا بـ (elle / la / en).'
			},
			{
				questionAr: 'Lors d’un examen de 2AS, comment choisir entre le Sujet 1 (guidé) et le Sujet 2 (production libre) ?',
				options: [
					'Traiter les deux sujets en même temps sur la copie',
					'Choisir UN seul sujet maîtrisé, respecter le plan et relire attentivement sa production',
					'Écrire deux lignes sans titre ni paragraphes',
					'Recopier intégralement le texte de compréhension'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'التعليمة تطلب اختيار موضوع واحد فقط!',
					'أحسنت! التركيز على موضوع واحد متقن وفق الخطة والمراجعة اللغوية هو طريق العلامة الكاملة.',
					'نص قصير جدا بلا هيكلة لا يحقق شروط الإنتاج الكتابي.',
					'نسخ النص الأصلي يُلغي علامة الإنتاج الكتابي.'
				],
				explanationAr: 'في الامتحان نختار موضوعا واحدا فقط، ونلتزم ببنيته ومعاييره اللغوية والمنهجية.'
			}
		]
	}
];
