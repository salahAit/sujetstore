import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWritingBlueprint
} from '../../svg-french';

export const LESSONS_2AM_T3: FrenchInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 1 : Les temps du récit au passé (imparfait, passé simple, passé composé)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_2am_t3_temps_recit_passe',
		slug: 'fre-2am-t3-temps-recit-passe',
		grade: '2am',
		yearSubjectId: 625,
		trimesterId: 't3',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع الثالث: قصص التراث والمواقع التاريخية الجزائرية — Projet 3 : Récits du patrimoine algérien',
		order: 1,
		titleAr: 'أزمنة السرد في الماضي (L’imparfait, le passé simple et le passé composé)',
		objectives: [
			'التمييز بين استعمالات الأزمنة الثلاثة في قصص التراث: الماضي الناقص، الماضي البسيط، والماضي المركّب',
			'استعمال الماضي الناقص لوصف المعالم والمدن التاريخية الجزائرية (القصبة، تلمسان، مزاب، الطاسيلي)',
			'اختيار الماضي البسيط في السرد التاريخي والماضي المركّب في سرد تجربة زيارة شخصية حديثة'
		],
		keywordsAr: ['Imparfait', 'Passé simple', 'Passé composé', 'Patrimoine algérien', 'أزمنة الماضي'],
		discover: {
			scenarioAr:
				'قارن بين فقرتين عن التراث الجزائري: (أ) « Autrefois, les artisans de la Casbah travaillaient le cuivre avec passion. Un jour, un maître bâtit une magnifique fontaine au cœur du quartier. » (ب) « Pendant les vacances, nous avons visité la Vallée du M’Zab : les maisons blanches brillaient au soleil et nous avons admiré l’ingéniosité des anciens bâtisseurs. »',
			svg: svgFrenchTenseTimeline({
				title: 'Les trois temps du passé dans un récit patrimonial',
				tenseName: 'Imparfait / Passé simple / Passé composé',
				formula: 'Décor (Imparfait) + Récit ancien (Passé simple) OU Visite vécue (Passé composé)',
				activeZone: 'two_past',
				example: 'Les ruelles brillaient (Imp.). Les artisans bâtirent (PS) / Nous avons visité (PC).',
				markers: 'Autrefois, jadis (PS + Imp.) | L’an dernier, hier (PC + Imp.)'
			}),
			steps: [
				{
					promptAr: 'ما الزمنان المستعملان في الفقرة (أ) التي تروي تاريخا قديما عن القصبة؟',
					hintAr: 'لاحظ الفعلين « travaillaient » و « bâtit ».',
					expectedInput: 'Imparfait et passé simple',
					revealAr: 'استُعمل الماضي الناقص (travaillaient) للوصف والعادة، والماضي البسيط (bâtit) للحدث التاريخي القديم.'
				},
				{
					promptAr: 'ما الزمن الذي استُعمل في الفقرة (ب) لرواية زيارة شخصية حديثة إلى وادي مزاب؟',
					hintAr: 'انظر إلى الفعلين « avons visité » و « avons admiré ».',
					expectedInput: 'Le passé composé',
					revealAr: 'استُعمل الماضي المركّب (le passé composé) لسرد أحداث تجربة شخصية قريبة، مع الماضي الناقص (brillaient) لوصف المنظر.'
				},
				{
					promptAr: 'ما الدور المشترك للماضي الناقص في الفقرتين معا؟',
					hintAr: 'ماذا يصف « travaillaient » و « brillaient »؟',
					expectedInput: 'La description',
					revealAr: 'في كلتا الحالتين يُستعمل الماضي الناقص للوصف وتصوير الإطار المكاني (la description).'
				}
			]
		},
		summary: {
			rulesAr: [
				'في نصوص التراث الجزائري نختار زمن الماضي بحسب نوع النص:',
				'1) الماضي الناقص (L’imparfait): يصف المعالم التاريخية والعمارة والأجواء والعادات القديمة. مثال: « Les ruelles de la Casbah montaient vers la citadelle et offraient une vue superbe sur la mer. »',
				'2) الماضي البسيط (Le passé simple): يروي الأحداث التاريخية البعيدة والأساطير التراثية بضمير الغائب. مثال: « Les bâtisseurs fondèrent la Grande Mosquée de Tlemcen au XIe siècle. »',
				'3) الماضي المركّب (Le passé composé): يروي رحلة أو زيارة مدرسية أو عائلية حقيقية لموقع تراثي بضمير المتكلم (je / nous). مثال: « L’été dernier, j’ai découvert les gravures du Tassili. »',
				'قاعدة التناسق: في الزيارة الشخصية نجمع بين (Passé composé + Imparfait)، وفي القصة التاريخية القديمة نجمع بين (Passé simple + Imparfait).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Quel duo de temps choisir en 2AM (T3) ?',
				subtitle: 'Cohérence temporelle dans le récit du patrimoine',
				columns: [
					{
						header: 'Imparfait',
						rule: 'Description & habitudes',
						examples: 'Les murs étaient blancs.',
						color: '#1d4ed8'
					},
					{
						header: 'Passé simple',
						rule: 'Histoire ancienne (il / ils)',
						examples: 'Ils bâtirent une mosquée.',
						color: '#047857'
					},
					{
						header: 'Passé composé',
						rule: 'Visite vécue (je / nous)',
						examples: 'Nous avons visité Tlemcen.',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'التفريق الدقيق بين الماضي الناقص والماضي البسيط والماضي المركب في قصص التراث',
			examples: [
				{
					problemAr: 'صرّف الفعلين (imparfait / passé composé): « Hier, nous (visiter) ...... la Casbah ; ses portes en bois (être) ...... magnifiques. »',
					solutionAr: '« Hier, nous avons visité la Casbah ; ses portes en bois étaient magnifiques. »'
				},
				{
					problemAr: 'صرّف الفعلين (imparfait / passé simple): « Autrefois, les habitants du M’Zab (creuser) ...... des puits profonds ; l’eau (couler) ...... vers chaque palmeraie. »',
					solutionAr: '« Autrefois, les habitants du M’Zab creusèrent des puits profonds ; l’eau coulait vers chaque palmeraie. »'
				}
			],
			watchOutAr:
				'لا تخلط بين الماضي البسيط والماضي المركب في السرد نفسه! اختر إما ثنائي السرد التاريخي (imparfait + passé simple) أو ثنائي الزيارة الشخصية (imparfait + passé composé).'
		},
		practice: [
			{
				questionAr: 'ما الثنائي الزمني الأنسب لكتابة تقرير عن زيارة عائلية قمتَ بها إلى تلمسان الأسبوع الماضي؟',
				options: [
					'Passé composé + Imparfait',
					'Futur simple + Impératif',
					'Présent + Impératif',
					'Plus-que-parfait uniquement'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! الماضي المركّب لأحداث الزيارة والماضي الناقص لوصف المعالم.',
					'المستقبل والأمر لا يناسبان سرد زيارة ماضية.',
					'الزيارة وقعت الأسبوع الماضي.',
					'لا يُكتب النص كله بالماضي الأسبق.'
				],
				explanationAr: 'في سرد تجربة شخصية ماضية نجمع بين الماضي المركب للأحداث والماضي الناقص للوصف.'
			},
			{
				questionAr: 'أكمل بالزمن المناسب: « Pendant notre visite à Constantine, nous ...... les célèbres ponts suspendus qui ...... la vallée. » (admirer / dominer)',
				options: [
					'avons admiré / dominaient',
					'admirions / ont dominé',
					'admirerons / dominent',
					'avons admiré / dominèrent'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! الحدث (avons admiré) بالماضي المركب والوصف الثابت (dominaient) بالماضي الناقص.',
					'الإعجاب حدث منتهٍ وإطلالة الجسور وصف دائم.',
					'الزيارة وقعت في الماضي.',
					'لا نخلط بين الماضي المركب والماضي البسيط هنا.'
				],
				explanationAr: '« avons admiré » (فعل الزيارة) و « dominaient » (وصف الجسور بالماضي الناقص).'
			},
			{
				questionAr: 'ما تصريف الفعل (bâtir) في الماضي البسيط مع (Les anciens architectes)؟',
				options: ['bâtissaient', 'bâtirent', 'ont bâti', 'bâtiront'],
				correctIndex: 1,
				diagnosticFeedback: [
					'bâtissaient في الماضي الناقص.',
					'صحيح! bâtir من المجموعة الثانية، والماضي البسيط مع ils هو: bâtirent.',
					'ont bâti في الماضي المركب.',
					'bâtiront في المستقبل.'
				],
				explanationAr: 'أفعال المجموعة الثانية في الماضي البسيط مع الجمع الغائب تنتهي بـ « -irent »: bâtirent.'
			},
			{
				questionAr: 'لماذا صُرّف الفعل « brillaient » في الماضي الناقص في: « Les coupoles blanches de Ghardaïa brillaient sous le soleil du matin. »؟',
				options: [
					'لأنه حدث مفاجئ قصير',
					'لأنه يصف منظرا معماريا (description)',
					'لأنه يعطي أمرا للزوار',
					'لأنه يتحدث عن المستقبل'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لمعان القباب وصف مستمر وليس حدثا مفاجئا.',
					'أحسنت! الماضي الناقص يُستعمل هنا للوصف (description).',
					'الجملة خبرية وليست أمرية.',
					'الماضي الناقص زمن ماضٍ.'
				],
				explanationAr: 'وصف القباب البيضاء تحت الشمس يتمّ بالماضي الناقص (imparfait de description).'
			},
			{
				questionAr: 'أكمل بالماضي البسيط: « Au XIe siècle, les Hammadites ...... une citadelle majestueuse dans les montagnes de M’Sila. » (construire)',
				options: ['construisaient', 'construisirent', 'construiront', 'construisent'],
				correctIndex: 1,
				diagnosticFeedback: [
					'construisaient في الماضي الناقص.',
					'ممتاز! الماضي البسيط من construire مع ils هو: construisirent.',
					'construiront في المستقبل.',
					'construisent في المضارع.'
				],
				explanationAr: 'الحدث التاريخي البعيد في القرن الحادي عشر يُصاغ بالماضي البسيط: construisirent.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 2 : La proposition subordonnée relative (qui, que, où)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_2am_t3_subordonnee_relative',
		slug: 'fre-2am-t3-subordonnee-relative',
		grade: '2am',
		yearSubjectId: 625,
		trimesterId: 't3',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع الثالث: قصص التراث والمواقع التاريخية الجزائرية — Projet 3 : Récits du patrimoine algérien',
		order: 2,
		titleAr: 'جملة الصلة الموصولة بـ (qui / que / où) (La proposition subordonnée relative)',
		objectives: [
			'التمييز الدقيق بين الضمائر الموصولة الثلاثة: « qui » (الفاعل)، « que / qu’ » (المفعول به المباشر COD)، و « où » (المكان أو الزمان)',
			'ربط جملتين حول معلم تاريخي جزائري باستعمال الضمير الموصول المناسب لتفادي التكرار',
			'تحديد الاسم السابق (l’antécédent) وجملة الصلة الموصولة (la PSR) داخل النص'
		],
		keywordsAr: ['Proposition relative', 'qui / que / où', 'Antécédent', 'Pronoms relatifs', 'جملة الصلة'],
		discover: {
			scenarioAr:
				'لاحظ كيف وصفت حفصة مدينة تلمسان بثلاث جمل موصولة: 1) « Tlemcen est une cité historique qui charme ses visiteurs. » 2) « La Grande Mosquée que nous avons admirée date du XIe siècle. » 3) « Voici le quartier où travaillent les artisans de la broderie. » لماذا تغيّر الضمير الموصول في كل جملة؟',
			svg: svgFrenchGrammarMap({
				title: 'Choisir le bon pronom relatif : qui, que ou où',
				rootLabel: 'Relier sans répéter l’antécédent',
				rootSub: 'Observer ce qui suit le pronom relatif',
				branches: [
					{
						label: 'QUI (Sujet)',
						rule: 'Suivi d’un VERBE conjugué',
						example: 'une cité qui charme...',
						color: '#1d4ed8'
					},
					{
						label: 'QUE / QU’ (COD)',
						rule: 'Suivi d’un SUJET + VERBE',
						example: 'la mosquée que nous visitons',
						color: '#047857'
					},
					{
						label: 'OÙ (Lieu / Temps)',
						rule: 'Remplace un CCL ou un CCT',
						example: 'le quartier où vivent les artisans',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الكلمة التي جاءت مباشرة بعد الضمير « qui » في الجملة الأولى؟',
					hintAr: 'هل « charme » فعل أم فاعل؟',
					expectedInput: 'Un verbe (charme)',
					revealAr: 'جاء بعد « qui » فعل مصرف مباشرة (charme)؛ لأن « qui » يؤدي وظيفة الفاعل.'
				},
				{
					promptAr: 'ما الذي جاء بعد الضمير « que » في الجملة الثانية؟',
					hintAr: 'انظر إلى « que nous avons admirée ».',
					expectedInput: 'Un sujet + un verbe',
					revealAr: 'جاء فاعل (nous) ثم فعل (avons admirée)؛ لأن « que » يعوّض المفعول به المباشر (COD).'
				},
				{
					promptAr: 'لماذا استعملنا « où » في الجملة الثالثة « le quartier où travaillent les artisans »؟',
					hintAr: 'على ماذا يدل الاسم السابق « le quartier »؟',
					expectedInput: 'Complément de lieu',
					revealAr: 'لأن « où » يعوّض متمّم المكان « dans ce quartier » (أو متمّم زمان مثل le jour où...).'
				}
			]
		},
		summary: {
			rulesAr: [
				'جملة الصلة الموصولة (La proposition subordonnée relative - PSR) توسّع اسما يسبقها مباشرة يُسمّى الاسم السابق (l’antécédent) وتفادي تكراره.',
				'1) الضمير « qui » (وظيفته فاعل Sujet): يُتبع مباشرة بفعل مصرف (أو ضمير مفعول ثم فعل). مثال: « Le Tassili est un plateau qui abrite des gravures millénaires. »',
				'2) الضمير « que / qu’ » (وظيفته مفعول به مباشر COD): يُتبع بفاعل + فعل. وتتحول « que » إلى « qu’ » أمام حرف علة أو h صامتة! مثال: « Le tapis qu’elle a tissé est magnifique. »',
				'3) الضمير « où » (وظيفته متمم مكان CCL أو زمان CCT): يعوّض عبارة مكان أو زمان. مثال: « Ghardaïa est la ville où s’élèvent les ksour du M’Zab. » / « Le jour où nous avons visité la Casbah. »'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Astuce rapide pour choisir qui / que / où',
				subtitle: 'Regarder la fonction du mot répété dans la 2e phrase',
				columns: [
					{
						header: 'QUI',
						rule: 'Remplace le SUJET',
						examples: 'Un site qui attire les visiteurs.',
						color: '#1d4ed8'
					},
					{
						header: 'QUE / QU’',
						rule: 'Remplace le COD',
						examples: 'Le palais qu’il admire.',
						color: '#047857'
					},
					{
						header: 'OÙ',
						rule: 'Remplace le LIEU / TEMPS',
						examples: 'La région où poussent les cèdres.',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'اختبار سريع لاختيار الضمير الموصول الصحيح عند ربط جملتين',
			examples: [
				{
					problemAr: 'اربط بين الجملتين بالضمير المناسب (qui / que / où): « Nous visitons la Casbah. Les artisans fabriquent le cuivre dans la Casbah. »',
					solutionAr: '« Nous visitons la Casbah où les artisans fabriquent le cuivre. » (حذفنا dans la Casbah وعوضناها بـ où).'
				},
				{
					problemAr: 'اربط بين الجملتين: « Voici une poterie traditionnelle. Ma grand-mère conserve cette poterie. »',
					solutionAr: '« Voici une poterie traditionnelle que ma grand-mère conserve. » (عوضنا المفعول المباشر بـ que).'
				}
			],
			watchOutAr:
				'انتبه! « qui » لا يُختصر أبدا إلى « qu’ » حتى أمام حرف علة! نكتب « un palais qui abrite » (وليس qu’abrite)، بينما « que » يُختصر إلى « qu’ »: « le musée qu’il visite ».'
		},
		practice: [
			{
				questionAr: 'اختر الضمير الموصول المناسب: « La Casbah est un quartier ancien ...... surplombe la baie d’Alger. »',
				options: ['que', 'qui', 'où', 'qu’'],
				correctIndex: 1,
				diagnosticFeedback: [
					'بعد الفراغ فعل مصرف مباشرة (surplombe) دون فاعل، فنحتاج « qui ».',
					'أحسنت! « qui » فاعل الفعل « surplombe ».',
					'هنا ليس ظرف مكان بل فاعل الفعل.',
					'« qu’ » للمفعول به المباشر فقط.'
				],
				explanationAr: 'الفراغ يسبق الفعل المصرف مباشرة ويؤدي وظيفة الفاعل -> « qui ».'
			},
			{
				questionAr: 'أكمل بالضمير الصحيح: « Le livre d’histoire ...... Amine lit parle des Aurès. »',
				options: ['qui', 'que', 'où', 'qu’'],
				correctIndex: 3,
				diagnosticFeedback: [
					'يوجد فاعل بعد الفراغ (Amine) والفعل هو lit (يقرأ الكتاب -> COD).',
					'انتبه! كلمة « Amine » تبدأ بحرف علة (A)، فتُختصر « que » إلى « qu’ ».',
					'ليس ظرف مكان.',
					'أحسنت! « qu’ » يعوّض المفعول به المباشر قبل اسم يبدأ بحرف علة (Amine).'
				],
				explanationAr: 'لأن « Amine » يبدأ بحرف علة (A)، يُختصر الضمير الموصول « que » إلى « qu’ »: « Le livre d’histoire qu’Amine lit ».'
			},
			{
				questionAr: 'اختر الضمير الموصول الصحيح في: « Le monument ...... nous avons photographié se trouve à Tlemcen. »',
				options: ['qui', 'que', 'où', 'qu’'],
				correctIndex: 1,
				diagnosticFeedback: [
					'بعد الفراغ الفاعل « nous »، لذا نحتاج مفعولا مباشرا لا فاعلا.',
					'أحسنت! « que » يعوّض المفعول المباشر « Le monument » قبل الساكن (nous).',
					'لا يوجد معنى ظرفي للمكان هنا (photographier quelque chose = COD).',
					'« nous » يبدأ بحرف ساكن فلا نختصر que إلى qu’.'
				],
				explanationAr: 'الفعل « photographier » يتعدّى مباشرة (COD)، والفاعل « nous » يبدأ بساكن -> « que ».'
			},
			{
				questionAr: 'أكمل الجملة: « Ghardaïa est la ville ...... se dressent les ksour du M’Zab. »',
				options: ['qui', 'que', 'où', 'qu’'],
				correctIndex: 2,
				diagnosticFeedback: [
					'القصور هي الفاعل، وغرداية هي المكان (dans cette ville).',
					'الفعل se dresser لا يأخذ مفعولا مباشرا هنا.',
					'ممتاز! « où » يعوّض متمم المكان « dans cette ville ».',
					'ليس مفعولا به مباشرا.'
				],
				explanationAr: '« Ghardaïa » تدل على المكان الذي تقوم فيه القصور، فنستعمل « où ».'
			},
			{
				questionAr: 'أيّ جملة مكتوبة بطريقة سليمة تماما دون خطأ في « qui / qu’ »؟',
				options: [
					'C’est un musée qu’abrite des trésors anciens.',
					'C’est un musée qui abrite des trésors anciens.',
					'C’est le musée qui il visite chaque été.',
					'C’est le musée où nous admirons.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الضمير الفاعل « qui » لا يُختصر أبدا إلى « qu’ »!',
					'صحيح! « qui abrite » (لا اختصار مع qui).',
					'لا نجمع « qui » مع الفاعل « il » (الصحيح: qu’il visite).',
					'admirer يأخذ مفعولا مباشرا (que nous admirons).'
				],
				explanationAr: 'الضمير « qui » لا يُحذف منه حرف « i » أبدا: « qui abrite ».'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 3 : Le lexique mélioratif pour valoriser un lieu historique
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_2am_t3_lexique_melioratif',
		slug: 'fre-2am-t3-lexique-melioratif',
		grade: '2am',
		yearSubjectId: 625,
		trimesterId: 't3',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع الثالث: قصص التراث والمواقع التاريخية الجزائرية — Projet 3 : Récits du patrimoine algérien',
		order: 3,
		titleAr: 'المعجم الإيجابي لإبراز جمال المعالم التاريخية (Le lexique mélioratif du patrimoine)',
		objectives: [
			'فهم معنى المعجم الإيجابي / التحسيني (le lexique mélioratif ou valorisant) وتمييزه عن المعجم السلبي (péjoratif)',
			'استعمال صفات وأسماء وأفعال إيجابية لتثمين المعالم الجزائرية (magnifique, majestueux, chef-d’œuvre, admirer, rayonner)',
			'إغناء الوصف التراثي بحقل معجمي أصيل للعمارة والتاريخ والصناعة التقليدية'
		],
		keywordsAr: ['Lexique mélioratif', 'Valorisant', 'Patrimoine', 'Champ lexical', 'المعجم الإيجابي'],
		discover: {
			scenarioAr:
				'اقرأ هذا المقطع عن قصر وجامع تلمسان الكبير: « La Grande Mosquée de Tlemcen est un chef-d’œuvre splendide. Ses arches élégantes, son minaret majestueux et ses sculptures raffinées émerveillent chaque visiteur. » لاحظ الكلمات التي جعلت القارئ يشعر بالفخر والإعجاب بهذا المعلم.',
			svg: svgFrenchGrammarMap({
				title: 'Valoriser le patrimoine algérien (Lexique mélioratif)',
				rootLabel: 'Lexique mélioratif (positif)',
				rootSub: 'Exprimer l’admiration et la fierté',
				branches: [
					{
						label: 'Adjectifs valorisants',
						rule: 'Beauté et grandeur',
						example: 'magnifique, majestueux, splendide',
						color: '#1d4ed8'
					},
					{
						label: 'Noms positifs',
						rule: 'Valeur historique',
						example: 'trésor, joyau, chef-d’œuvre',
						color: '#047857'
					},
					{
						label: 'Verbes d’admiration',
						rule: 'Émotion du visiteur',
						example: 'admirer, charmer, émerveiller',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الاسم الإيجابي الذي وصف به الكاتب الجامع الكبير بتلمسان في الجملة الأولى؟',
					hintAr: 'يعني « تحفة فنية ومعمارية ».',
					expectedInput: 'un chef-d’œuvre',
					revealAr: 'الاسم هو « un chef-d’œuvre » (تحفة معمارية)، وهو كلمة قوية من المعجم التحسيني (mélioratif).'
				},
				{
					promptAr: 'استخرج ثلاث صفات إيجابية (adjectifs mélioratifs) من النص أعلاه.',
					hintAr: 'تصف الجامع والأقواس والمئذنة والنقوش.',
					expectedInput: 'splendide, élégantes, majestueux, raffinées',
					revealAr: 'الصفات الإيجابية هي: splendide, élégantes, majestueux, raffinées.'
				},
				{
					promptAr: 'ما الفعل الذي عبّر عن شدة إعجاب الزوار بالمعلم؟',
					hintAr: 'انظر إلى آخر جملة في المقطع.',
					expectedInput: 'émerveillent',
					revealAr: 'الفعل هو « émerveillent » (تُبهر / تُدهش بجمالها)، وهو فعل إيجابي يثمّن المعلم.'
				}
			]
		},
		summary: {
			rulesAr: [
				'المعجم الإيجابي أو التحسيني (Le lexique mélioratif) يضمّ الكلمات التي تبرز الجمال والقيمة التاريخية وتنقل شعور الإعجاب والاعتزاز بالتراث الوطني.',
				'الصفات التحسينية (Adjectifs mélioratifs): magnifique, splendide, majestueux (مهيب), merveilleux, remarquable, exceptionnel, authentique (أصيل), raffiné, prestigieux, accueillant.',
				'الأسماء التحسينية (Noms mélioratifs): un chef-d’œuvre (تحفة), un joyau (جوهرة), un trésor (كنز), une merveille (أعجوبة), un héritage précieux (إرث ثمين).',
				'الأفعال التحسينية (Verbes mélioratifs): admirer (يُعجب بـ), émerveiller (يُبهر), charmer (يأسر بجماله), témoigner de (يشهد على عراقة), rayonner (يشعّ).',
				'تذكّر الحقل المعجمي للتراث (champ lexical du patrimoine): architecture, citadelle, mosquée, ruelles, artisanat, poterie, broderie, histoire, ancêtres, mémoire.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Mélioratif vs Neutre dans une description',
				subtitle: 'Remplacer les mots simples par un vocabulaire riche',
				columns: [
					{
						header: 'Mot neutre',
						rule: 'Simple / courant',
						examples: 'beau / vieux / grand',
						color: '#64748b'
					},
					{
						header: 'Mélioratif (Adj.)',
						rule: 'Valorisant',
						examples: 'splendide / millénaire / majestueux',
						color: '#1d4ed8'
					},
					{
						header: 'Mélioratif (Nom)',
						rule: 'Image forte',
						examples: 'un joyau / un chef-d’œuvre / un trésor',
						color: '#047857'
					}
				]
			}),
			visualCaptionAr: 'كيف نرتقي بالوصف من ألفاظ عادية إلى معجم إيجابي يليق بالتراث الجزائري',
			examples: [
				{
					problemAr: 'أثْرِ الجملة التالية بمعجم إيجابي: « Le Tassili est un grand endroit avec de vieux dessins. »',
					solutionAr: '« Le Tassili est un site majestueux qui abrite des gravures millénaires exceptionnelles. »'
				},
				{
					problemAr: 'صنّف الكلمات التالية إلى (مُحسّن mélioratif / سلبي péjoratif): splendide — laid — joyau — détruit — raffiné.',
					solutionAr: 'Mélioratif : splendide, joyau, raffiné. | Péjoratif : laid, détruit.'
				}
			],
			watchOutAr:
				'عند استعمال صفات إيجابية مثل « majestueux » أو « merveilleux » لا تنسَ مطابقتها في المؤنث (une cité majestueuse / des gravures merveilleuses)!'
		},
		practice: [
			{
				questionAr: 'ما المقصود بالمعجم الإيجابي (le lexique mélioratif)؟',
				options: [
					'كلمات تنتقد المكان وتقلّل من قيمته',
					'كلمات تُبرز الجمال والقيمة وتعكس الإعجاب بالمكان',
					'كلمات تدل على النفي فقط',
					'أدوات الترقيم في الحوار'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'انتقاد المكان يكون بالمعجم السلبي (péjoratif).',
					'أحسنت! المعجم الإيجابي (mélioratif) يثمّن المعلم ويبين جماله وأهميته.',
					'النفي أسلوب نحوي وليس معجما إيجابيا.',
					'علامات الترقيم ليست معجما.'
				],
				explanationAr: 'المعجم الإيجابي يجمع الصفات والأسماء والأفعال التي ترفع من قيمة الموصوف وتُظهر جماله.'
			},
			{
				questionAr: 'أيّ مجموعة تحتوي فقط على كلمات إيجابية (lexique mélioratif)؟',
				options: [
					'splendide — laid — triste',
					'magnifique — joyau — émerveiller',
					'sale — sombre — cassé',
					'banal — gris — vide'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'laid و triste كلمتان سلبيتان.',
					'ممتاز! كلها كلمات تحسينية (صفة + اسم + فعل).',
					'كل هذه الكلمات سلبية (péjoratif).',
					'هذه كلمات محايدة أو سلبية.'
				],
				explanationAr: 'الكلمات « magnifique, joyau, émerveiller » كلها من المعجم الإيجابي.'
			},
			{
				questionAr: 'أكمل الجملة بصفة إيجابية مطابقة: « La Vallée du M’Zab possède une architecture ...... . » (remarquable / majestueux)',
				options: ['majestueux', 'majestueuse', 'majestueuses', 'remarquables'],
				correctIndex: 1,
				diagnosticFeedback: [
					'architecture اسم مؤنث مفرد (une architecture).',
					'صحيح! majestueuse تطابق الاسم المؤنث المفرد architecture.',
					'architecture مفرد لا جمع.',
					'remarquables جمع بينما الاسم مفرد.'
				],
				explanationAr: '« une architecture » مؤنث مفرد، فتطابقها الصفة « majestueuse ».'
			},
			{
				questionAr: 'أيّ اسم إيجابي يمكن أن يعوّض عبارة « un très beau monument » عند الحديث عن القصبة؟',
				options: ['un déchet', 'un joyau architectural', 'un problème', 'une erreur'],
				correctIndex: 1,
				diagnosticFeedback: [
					'كلمة سلبية غير مناسبة تماما.',
					'أحسنت! « un joyau architectural » (جوهرة معمارية) عبارة تحسينية رائعة.',
					'ليست عبارة تحسينية.',
					'غير مناسبة للمعنى.'
				],
				explanationAr: 'التعبير « un joyau architectural » يثمّن القيمة التاريخية والمعمارية للمعلم.'
			},
			{
				questionAr: 'أيّ كلمة تنتمي إلى الحقل المعجمي للتراث (champ lexical du patrimoine)؟',
				options: ['citadelle', 'clavier', 'dentifrice', 'ampoule'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! « citadelle » (قلعة تاريخية) تنتمي مباشرة إلى حقل التراث.',
					'clavier يخص حقل الإعلام الآلي.',
					'dentifrice يخص حقل النظافة.',
					'ampoule تخص حقل الكهرباء.'
				],
				explanationAr: '« citadelle » (القلعة) كلمة أساسية في الحقل المعجمي للتراث والمواقع التاريخية.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 4 : Les accords du participe passé (être / avoir)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_2am_t3_accord_participe_passe',
		slug: 'fre-2am-t3-accord-participe-passe',
		grade: '2am',
		yearSubjectId: 625,
		trimesterId: 't3',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع الثالث: قصص التراث والمواقع التاريخية الجزائرية — Projet 3 : Récits du patrimoine algérien',
		order: 4,
		titleAr: 'مطابقة اسم المفعول مع المساعدين être و avoir (L’accord du participe passé)',
		objectives: [
			'تطبيق قاعدة مطابقة اسم المفعول مع المساعد « être » (يطابق الفاعل في الجنس والعدد)',
			'إتقان قاعدة اسم المفعول مع المساعد « avoir »: لا يطابق الفاعل، لكنه يطابق المفعول به المباشر (COD) إذا سبق الفعل (خاصة مع الضمير الموصول que)',
			'تجنّب أخطاء المطابقة الإملائية عند كتابة قصة زيارة تراثية'
		],
		keywordsAr: ['Participe passé', 'Auxiliaire être', 'Auxiliaire avoir + COD avant', 'Accord', 'مطابقة اسم المفعول'],
		discover: {
			scenarioAr:
				'تأمّل الجمل الثلاث عن رحلة إلى الطاسيلي والقصبة: 1) « Les visiteuses sont arrivées à Djanet à l’aube. » 2) « Elles ont admiré les gravures rupestres. » 3) « Les gravures rupestres qu’elles ont admirées sont millénaires. » لماذا تغيّر « admiré » في الجملة الثانية وأصبح « admirées » في الجملة الثالثة؟',
			svg: svgFrenchGrammarMap({
				title: 'Les 3 règles d’accord du participe passé (2AM)',
				rootLabel: 'Comment accorder le participe passé ?',
				rootSub: 'Vérifier l’auxiliaire, puis la place du COD',
				branches: [
					{
						label: 'Avec ÊTRE',
						rule: 'Accord avec le SUJET',
						example: 'Elles sont arrivées à Tlemcen.',
						color: '#1d4ed8'
					},
					{
						label: 'AVOIR (COD après)',
						rule: 'PAS d’accord',
						example: 'Elles ont admiré les gravures.',
						color: '#047857'
					},
					{
						label: 'AVOIR (COD avant)',
						rule: 'Accord avec le COD (que / la / les)',
						example: 'Les gravures qu’elles ont admirées.',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'لماذا أضفنا « -es » إلى « arrivées » في الجملة الأولى؟',
					hintAr: 'انظر إلى الفعل المساعد « sont » (être) والفاعل « Les visiteuses ».',
					expectedInput: 'Auxiliaire être + sujet féminin pluriel',
					revealAr: 'لأن الفعل مصرف مع « être » فيطابق اسم المفعول الفاعل المؤنث الجمع « Les visiteuses ».'
				},
				{
					promptAr: 'في الجملة الثانية « Elles ont admiré les gravures »، أين يقع المفعول المباشر (les gravures)؟ وهل طابقناه؟',
					hintAr: 'هل جاء قبل الفعل أم بعده؟',
					expectedInput: 'Après le verbe, pas d’accord',
					revealAr: 'جاء بعد الفعل مع المساعد « avoir »، ولذلك يبقى اسم المفعول دون مطابقة: « admiré ».'
				},
				{
					promptAr: 'في الجملة الثالثة « Les gravures qu’elles ont admirées »، أين وقع المفعول المباشر؟ وما النتيجة؟',
					hintAr: 'يعوّضه الضمير الموصول « qu’ » قبل الفعل « ont admirées ».',
					expectedInput: 'Avant le verbe, accord avec le COD',
					revealAr: 'جاء المفعول المباشر (Les gravures : مؤنث جمع) قبل الفعل عن طريق « qu’ »، فطابقناه بإضافة « -es »: admirées!'
				}
			]
		},
		summary: {
			rulesAr: [
				'القاعدة 1 (اسم المفعول وحده كصفة): يطابق الاسم الذي يرافقه كالصفة تماما. مثال: « des portes sculptées », « un palais restauré ».',
				'القاعدة 2 (مع المساعد être): يطابق اسم المفعول الفاعل دائما في الجنس والعدد. مثال: « La citadelle est restée solide. » / « Les touristes sont venus nombreux. »',
				'القاعدة 3 (مع المساعد avoir والمفعول المباشر بعد الفعل): لا يطابق اسم المفعول أبدا! مثال: « Les élèves ont visité la Grande Mosquée. »',
				'القاعدة 4 (مع المساعد avoir والمفعول المباشر COD قبل الفعل — مثل الضمير الموصول que أو الضمائر le/la/les): يطابق اسم المفعول هذا المفعول المباشر! مثال: « La Grande Mosquée que les élèves ont visitée est superbe. »'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Vérifier l’accord en 3 secondes',
				subtitle: 'Poser la question : Qui ? (être) ou Quoi ? placé où ? (avoir)',
				columns: [
					{
						header: 'Avec ÊTRE',
						rule: 'Accord avec le Sujet',
						examples: 'La tour est tombée -> -ée',
						color: '#1d4ed8'
					},
					{
						header: 'AVOIR + COD après',
						rule: 'Invariable (-é / -i / -u)',
						examples: 'Ils ont pris des photos -> pris',
						color: '#047857'
					},
					{
						header: 'AVOIR + COD avant',
						rule: 'Accord avec le COD',
						examples: 'Les photos qu’ils ont prises -> -es',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'الاختبار السريع لضمان عدم الوقوع في أخطاء مطابقة اسم المفعول',
			examples: [
				{
					problemAr: 'طابق اسم المفعول عند الضرورة: 1) « Les ruelles que nous avons (parcourir) ...... sont étroites. »   2) « Nous avons (parcourir) ...... les ruelles. »',
					solutionAr: '1) parcourues (COD قبل الفعل: que = Les ruelles، مؤنث جمع).   2) parcouru (COD بعد الفعل: لا مطابقة).'
				},
				{
					problemAr: 'طابق اسم المفعول: « Les voyageuses sont (partir) ...... tôt vers Ghardaïa. »',
					solutionAr: '« Les voyageuses sont parties tôt vers Ghardaïa. » (مع être والفاعل مؤنث جمع).'
				}
			],
			watchOutAr:
				'مع المساعد « avoir » لا تنظر إلى الفاعل أبدا! انظر فقط إلى المفعول به المباشر (COD): إن كان بعد الفعل فلا مطابقة، وإن كان قبله (عبر que / la / les) طابقه في الجنس والعدد!'
		},
		practice: [
			{
				questionAr: 'اختر الكتابة الصحيحة: « La poterie traditionnelle que ma mère a ...... vient de Kabylie. » (acheter)',
				options: ['acheté', 'achetée', 'achetés', 'achetées'],
				correctIndex: 1,
				diagnosticFeedback: [
					'المفعول المباشر (que = La poterie، مؤنث مفرد) جاء قبل الفعل.',
					'أحسنت! نطابق اسم المفعول مع المفعول المباشر المؤنث المفرد: achetée.',
					'المفعول مفرد مؤنث لا جمع مذكر.',
					'المفعول مفرد لا جمع.'
				],
				explanationAr: '« que » يعود على « La poterie » (مؤنث مفرد) ويسبق « a achetée » -> achetée.'
			},
			{
				questionAr: 'أكمل الجملة: « Les collégiens ont ...... la Kalâa des Béni Hammad avec grand intérêt. » (visiter)',
				options: ['visités', 'visitée', 'visité', 'visitées'],
				correctIndex: 2,
				diagnosticFeedback: [
					'مع avoir لا نطابق الفاعل (Les collégiens).',
					'المفعول المباشر (la Kalâa) جاء بعد الفعل، فلا مطابقة.',
					'ممتاز! COD بعد الفعل مع avoir -> يبقى « visité » دون تغيير.',
					'لا مطابقة هنا.'
				],
				explanationAr: 'المساعد « avoir » والمفعول المباشر بعد الفعل -> « ont visité ».'
			},
			{
				questionAr: 'اختر الصيغة الصحيحة: « Ces anciennes mosquées sont ...... des symboles de notre histoire. » (devenir)',
				options: ['devenu', 'devenus', 'devenue', 'devenues'],
				correctIndex: 3,
				diagnosticFeedback: [
					'الفعل devenir مصرف مع être فيجب المطابقة.',
					'mosquées مؤنث جمع لا مذكر جمع.',
					'mosquées جمع لا مفرد.',
					'صحيح! الفاعل « Ces anciennes mosquées » مؤنث جمع -> devenues.'
				],
				explanationAr: 'مع المساعد « être » يطابق اسم المفعول الفاعل المؤنث الجمع: devenues.'
			},
			{
				questionAr: 'أكمل: « Les photos que Karim a ...... dans l’Aurès sont superbes. » (prendre)',
				options: ['pris', 'prise', 'prises', 'prît'],
				correctIndex: 2,
				diagnosticFeedback: [
					'المفعول المباشر (que = Les photos، مؤنث جمع) يسبق الفعل.',
					'Les photos جمع لا مفرد.',
					'أحسنت! photos مؤنث جمع قبل الفعل -> prises.',
					'prît صيغة غير مناسبة هنا.'
				],
				explanationAr: 'اسم مفعول prendre هو « pris »، ومع COD مؤنث جمع قبل الفعل يصبح « prises ».'
			},
			{
				questionAr: 'أيّ جملة صحيحة إملائيا تماما؟',
				options: [
					'Les touristes sont descendu dans la vallée du M’Zab.',
					'Les histoires que notre grand-père a racontées nous ont passionnés.',
					'Elles ont admirées la Casbah d’Alger.',
					'La citadelle est resté fière sur la colline.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'مع être يجب إضافة s: sont descendus.',
					'ممتاز! racontées يطابق que (= Les histoires) و passionnés يطابق nous.',
					'المفعول (la Casbah) بعد الفعل مع avoir، فلا نضيف es: ont admiré.',
					'مع être والفاعل مؤنث (La citadelle): est restée.'
				],
				explanationAr: 'الجملة الثانية تطبق قاعدة مطابقة اسم المفعول مع COD السابق بدقة.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 5 : Rédiger un récit patrimonial mettant en valeur une région d'Algérie
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_2am_t3_rediger_recit_patrimoine',
		slug: 'fre-2am-t3-rediger-recit-patrimoine',
		grade: '2am',
		yearSubjectId: 625,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع الثالث: قصص التراث والمواقع التاريخية الجزائرية — Projet 3 : Récits du patrimoine algérien',
		order: 5,
		titleAr: 'كتابة قصة تراثية تُبرز جمالية منطقة جزائرية (Rédiger un récit patrimonial)',
		objectives: [
			'تنظيم سرد تراثي قصير (8 إلى 10 أسطر) يبرز مكانة معلم أو منطقة جزائرية (القصبة، تلمسان، وادي مزاب، الطاسيلي، الأوراس)',
			'الجمع المنسجم بين أزمنة الماضي (الماضي المركب + الماضي الناقص، أو الماضي البسيط + الماضي الناقص)',
			'توظيف المعجم الإيجابي (lexique mélioratif) وجملة الصلة الموصولة (qui, que, où) ومطابقة اسم المفعول بدقة'
		],
		keywordsAr: ['Récit patrimonial', 'Casbah', 'M’Zab', 'Tlemcen', 'Tassili', 'Production écrite'],
		discover: {
			scenarioAr:
				'طلب الأستاذ من التلاميذ كتابة قصة زيارة أو سرد تراثي للتعريف بمنطقة جزائرية عريقة. اختار أنس « وادي مزاب بغرداية » ورتّب نصه في أربع خطوات: متى وأين، ماذا رأى ووصف المعلم بمعجم إيجابي، ماذا تعلّم عن تاريخه، وخاتمة تدعو لصون التراث الوطني.',
			svg: svgFrenchWritingBlueprint({
				title: 'Réussir un récit patrimonial algérien (2AM T3)',
				steps: [
					{ stage: 'Situer le lieu', detail: 'Nom de la région + cadre temporel (imparfait / passé composé)', color: '#1d4ed8' },
					{ stage: 'Décrire & Valoriser', detail: 'Lexique mélioratif (majestueux, joyau, splendide) à l’imparfait', color: '#047857' },
					{ stage: 'Relatives & Histoire', detail: 'Utiliser qui / que / où + accords du participe passé', color: '#b45309' },
					{ stage: 'Fierté & Devoir', detail: 'Conclure sur la fierté et la préservation de notre patrimoine', color: '#7c3aed' }
				]
			}),
			steps: [
				{
					promptAr: 'ما المعجم الذي نستعمله لوصف العمارة والتاريخ في المنطقة التي نختارها؟',
					hintAr: 'تذكّر الدرس الثالث في هذا الفصل.',
					expectedInput: 'Le lexique mélioratif',
					revealAr: 'نستعمل المعجم الإيجابي (magnifique, joyau, chef-d’œuvre, authentique, admirer) لتثمين التراث.'
				},
				{
					promptAr: 'كيف نربط وصف المعلم بتاريخه دون تكرار اسمه في كل جملة؟',
					hintAr: 'استعمل الضمائر الموصولة من الدرس الثاني.',
					expectedInput: 'qui, que, où',
					revealAr: 'نستعمل جمل الصلة بـ « qui », « que », و « où »: « C’est une cité où les bâtisseurs ont créé des merveilles. »'
				},
				{
					promptAr: 'بأيّ فكرة نختم السرد التراثي ليكون ذا قيمة وطنية وتربوية؟',
					hintAr: 'فكّر في واجبنا نحو تراث أجدادنا.',
					expectedInput: 'Préserver notre patrimoine',
					revealAr: 'نختم بالتعبير عن الاعتزاز بالتراث الجزائري وضرورة الحفاظ عليه للأجيال القادمة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'العنوان: يجمع اسم المعلم وقيمته، مثل: « La Casbah d’Alger, joyau de notre mémoire » أو « La Vallée du M’Zab, chef-d’œuvre du Sahara ».',
				'المقدمة (سطران): تحدّد الزمان والمكان ومناسبة الزيارة أو الحدث التاريخي (Pendant les vacances de printemps, ma famille et moi avons visité...).',
				'العرض (4 إلى 5 أسطر): يصف المعالم بالماضي الناقص والمعجم التحسيني (ruelles pittoresques, arches élégantes, gravures millénaires)، ويدمج جملة صلة بـ (qui, que, où) مع احترام مطابقة اسم المفعول.',
				'الخاتمة (سطران): تعبّر عن الإعجاب والفخر وتؤكد أهمية حماية هذا الإرث التاريخي.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Sites du patrimoine algérien à valoriser (2AM)',
				rootLabel: 'Richesses historiques d’Algérie',
				rootSub: 'Vocabulaire précis pour la production écrite',
				branches: [
					{
						label: 'Casbah & Tlemcen',
						rule: 'ruelles, fontaines, mosquées',
						example: 'arches élégantes, bois sculpté, artisans',
						color: '#1d4ed8'
					},
					{
						label: 'Vallée du M’Zab',
						rule: 'ksour, palmeraie, partage d’eau',
						example: 'architecture harmonieuse, solidarité',
						color: '#047857'
					},
					{
						label: 'Tassili & Aurès',
						rule: 'gravures rupestres, montagnes',
						example: 'musée à ciel ouvert, citadelles fières',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'رصيد معجمي دقيق لأبرز المواقع التراثية الجزائرية المقرّرة في الثانية متوسط',
			examples: [
				{
					problemAr: 'اكتب جملة تثمّن قصبة الجزائر باستعمال الضمير الموصول « où » وصفة إيجابية.',
					solutionAr: '« La Casbah d’Alger est une cité historique magnifique où chaque ruelle raconte le courage de nos ancêtres. »'
				},
				{
					problemAr: 'اكتب جملة عن الطاسيلي تحتوي على « que » ومطابقة صحيحة لاسم المفعول.',
					solutionAr: '« Les gravures millénaires que nous avons admirées au Tassili témoignent d’une civilisation ancienne remarquable. »'
				}
			],
			watchOutAr:
				'راجع قبل تسليم الورقة: 1) تناسق الأزمنة (imparfait + passé composé أو imparfait + passé simple)، 2) مطابقة اسم المفعول بعد que ومع être، 3) وجود 3 كلمات على الأقل من المعجم الإيجابي!'
		},
		practice: [
			{
				questionAr: 'أيّ جملة تثمّن وادي مزاب باستعمال معجم إيجابي وضميْر موصول « où »؟',
				options: [
					'La Vallée du M’Zab est un chef-d’œuvre authentique où l’architecture s’harmonise avec le désert.',
					'La Vallée du M’Zab est un lieu ordinaire.',
					'Nous irons demain à l’école.',
					'Il faut fermer le robinet.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! تجمع « chef-d’œuvre authentique » (معجم إيجابي) والضمير « où ».',
					'« ordinaire » كلمة محايدة لا تثمّن المكان.',
					'جملة خارج موضوع التراث.',
					'نصيحة إرشادية خارج موضوع التراث.'
				],
				explanationAr: 'توظّف الجملة الأولى المعجم الإيجابي والضمير الموصول « où » بدقة.'
			},
			{
				questionAr: 'اختر الجملة الخالية من أخطاء مطابقة اسم المفعول حول زيارة تلمسان:',
				options: [
					'La Grande Mosquée que nous avons visité est splendide.',
					'La Grande Mosquée que nous avons visitée est splendide.',
					'Nous avons visitées la Grande Mosquée.',
					'La Grande Mosquée est resté splendide.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'المفعول المباشر (que = La Grande Mosquée، مؤنث مفرد) يسبق الفعل -> visitée.',
					'ممتاز! طابقنا « visitée » مع المفعول المباشر المؤنث المفرد السابق للفعل.',
					'هنا المفعول بعد الفعل مع avoir، فلا نضيف es.',
					'مع être والفاعل مؤنث نكتب « est restée ».'
				],
				explanationAr: '« La Grande Mosquée que nous avons visitée » صحيحة لأن COD يسبق الفعل.'
			},
			{
				questionAr: 'ما الموقع التراثي الجزائري المعروف بلقب « متحف في الهواء الطلق » (musée à ciel ouvert) بنقوشه الصخرية؟',
				options: ['Le Tassili n’Ajjer', 'Un supermarché moderne', 'Un stade de quartier', 'Une gare routière'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! الطاسيلي ناجر مشهور عالميا بنقوشه الصخرية العريقة.',
					'ليس موقعا تاريخيا.',
					'ليس موقعا أثريا.',
					'ليس معلما تراثيا.'
				],
				explanationAr: 'الطاسيلي ناجر (Tassili n’Ajjer) من أعرق المواقع التراثية في الصحراء الجزائرية.'
			},
			{
				questionAr: 'ما الجملة الختامية الأنسب لنص سردي عن التراث الوطني؟',
				options: [
					'Ce voyage inoubliable nous a rappelé combien notre patrimoine algérien est précieux et mérite d’être protégé.',
					'Hier, j’ai oublié mon stylo bleu.',
					'L’eau bout à cent degrés.',
					'Fermes la fenêtre avant de sortir !'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! تختم السرد بمشاعر الفخر والدعوة إلى صون التراث.',
					'خارج الموضوع.',
					'حقيقة علمية من نصوص الأولى متوسط.',
					'جملة أمرية خاطئة إملائيا وخارج الموضوع.'
				],
				explanationAr: 'الخاتمة التراثية تبرز الفخر بالهوية الوطنية وواجب الحفاظ على المعالم.'
			},
			{
				questionAr: 'عند سرد زيارة مدرسية إلى القصبة، ما الزمن الذي نُصرّف فيه وصف الأزقة والأبواب والنافورات؟',
				options: ['L’imparfait', 'L’impératif', 'Le futur antérieur', 'Le subjonctif'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! الماضي الناقص هو زمن الوصف في القصص التراثية.',
					'الأمر لتوجيه التعليمات.',
					'زمن غير مستعمل لوصف زيارة ماضية.',
					'لا يُستعمل للوصف في السرد.'
				],
				explanationAr: 'وصف المعالم والأماكن في الماضي يكون بالماضي الناقص (l’imparfait).'
			}
		]
	}
];
