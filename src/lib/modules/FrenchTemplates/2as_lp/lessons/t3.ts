import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWritingBlueprint
} from '../../svg-french';

export const LESSONS_2AS_LP_T3: FrenchInteractiveLessonData[] = [
	{
		id: 'fre_lesson_2as_lp_t3_dialogue_ecrit',
		slug: 'fre-2as-lp-t3-dialogue-ecrit',
		grade: '2as_lp',
		yearSubjectId: 761,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع 3: الحوار الحجاجي المدني والروبورتاج حول التراث الجزائري (Le dialogue argumentatif et le reportage culturel)',
		order: 1,
		titleAr: 'خصائص الحوار المكتوب ومستويات اللغة (Répliques, verbes introducteurs, registres de langue)',
		objectives: [
			'ضبط القواعد الشكلية لكتابة الحوار المدني المنظم: المزدوجتان (« »)، المطات (—)، النقطتان (:)، وتبادل الردود (Répliques)',
			'اختيار أفعال القول المناسبة (Verbes introducteurs / de parole) بحسب نبرة المتحدث ونيته (سؤال، جواب، اعتراض، تأكيد)',
			'التمييز بين مستويات اللغة الثلاثة (Familier, Courant, Soutenu) وتوظيف المستوى القياسي أو الراقي في الحوار الجاد'
		],
		keywordsAr: [
			'dialogue argumentatif',
			'répliques',
			'verbes introducteurs',
			'registres de langue',
			'ponctuation du dialogue',
			'الحوار المكتوب'
		],
		discover: {
			scenarioAr:
				'في ندوة مدرسية حول الحفاظ على مكتبة البلدية، دار حوار هادئ بين أستاذ وتلميذته: « Pensez-vous que le livre numérique remplacera la bibliothèque de quartier ? demanda l’élève. — Nullement, répondit le professeur avec assurance, car la bibliothèque demeure un lieu vivant d’étude et de rencontre civique. » لاحظ علامات الترقيم وتنوع أفعال القول.',
			svg: svgFrenchGrammarMap({
				title: 'Les piliers du dialogue argumentatif écrit',
				rootLabel: 'Échanger des idées avec courtoisie',
				rootSub: 'Forme typographique + Verbes de parole + Registre',
				width: 580,
				branches: [
					{
						label: 'Ponctuation',
						rule: '« » début/fin, — changement',
						example: '— Je partage votre avis, dit-il.'
					},
					{
						label: 'Verbes de parole',
						rule: 'Préciser le ton et l’acte',
						example: 'interroger, objecter, affirmer'
					},
					{
						label: 'Inversion incise',
						rule: 'Verbe + Sujet après virgule',
						example: '..., rétorqua l’architecte.'
					},
					{
						label: 'Registres de langue',
						rule: 'Courant ou Soutenu à l’écrit',
						example: 'demeure (soutenu) / reste (courant)'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'لماذا نضع المطة (—) في بداية السطر الثاني من الحوار التمهيدي؟',
					hintAr: 'لاحظ أن المتكلم تغير من التلميذة إلى الأستاذ.',
					expectedInput: 'للدلالة على تغير المتكلم وبداية رد جديد (Changement d’interlocuteur)',
					revealAr:
						'تستعمل المزدوجتان (« ») لفتح الحوار كاملاً وإغلاقه، بينما تُستعمل المطة (—) مع العودة إلى السطر عند كل تغير للمتكلم (Réplique).'
				},
				{
					promptAr:
						'في العبارة المعترضة « , répondit le professeur », لاحظ ترتيب الفاعل والفعل. ماذا يسمى هذا التركيب؟',
					hintAr: 'الفعل يسبق الفاعل داخل الجملة المعترضة (Proposition incise).',
					expectedInput: 'تقديم الفعل على الفاعل في الجملة المعترضة (Inversion du sujet dans l’incise)',
					revealAr:
						'في الجملة المعترضة (Incise) الموضوعة وسط الكلام أو آخره بعد فاصلة، يجب دائماً قلب الترتيب (فعل + فاعل): « ..., répondit-il. »، « ..., précisa l’élève. »'
				},
				{
					promptAr:
						'استعمل الأستاذ كلمة « Nullement » والفعل « demeure ». إلى أي مستوى لغوي تنتميان؟',
					hintAr: 'المقابل القياسي هو « Pas du tout » و « reste ».',
					expectedInput: 'المستوى اللغوي الراقي (Registre soutenu)',
					revealAr:
						'في الحوار الفكري والمدني والصحفي نعتمد المستوى القياسي (Courant) أو الراقي (Soutenu)، ونتجنب المستوى العامي (Familier).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الترقيم المعياري للحوار: النقطتان (:) بعد جملة التقديم، المزدوجتان (« ») في بداية الحوار ونهايته، والعودة إلى السطر مع مطة (—) عند كل متكلم جديد.',
				'أفعال القول المعبّرة (Verbes introducteurs): بدل تكرار « dire »، نختار الفعل الدقيق: للسؤال (demander, interroger, s’enquérir)؛ للجواب (répondre, répliquer, préciser)؛ للاعتراض (objecter, rétorquer, contester)؛ للتأكيد والنصح (affirmer, souligner, conseiller, recommander).',
				'الجملة المعترضة (La proposition incise): إذا جاء فعل القول وسط الكلام أو نهايته نضعه بعد فاصلة مع قلب الفاعل وجوباً (مثال: « Ce monument, expliqua le guide, date du XIe siècle. »).',
				'مستويات اللغة الثلاثة (Les registres de langue): العامي (Familier: bouquin, bosser — مرفوض في التعبير الرسمي)، القياسي (Courant: livre, travailler — المعتمد في الصحافة والدراسة)، والراقي (Soutenu: ouvrage, œuvrer — يضفي أناقة ودقة على الحوار الفكري).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Les trois registres de langue en français',
				subtitle: 'Adapter son lexique et sa syntaxe à la situation de communication',
				width: 560,
				columns: [
					{
						header: 'Familier',
						rule: 'Oral relâché (à éviter)',
						examples: 'bouquin / bagnole / bosser'
					},
					{
						header: 'Courant',
						rule: 'Langue standard claire',
						examples: 'livre / voiture / travailler'
					},
					{
						header: 'Soutenu',
						rule: 'Écrit soigné et noble',
						examples: 'ouvrage / véhicule / œuvrer'
					}
				]
			}),
			visualCaptionAr: 'المقارنة بين مستويات اللغة الثلاثة لاختيار المفردات الملائمة في الحوار والروبورتاج',
			examples: [
				{
					problemAr:
						'Remplacez le verbe « dit » par un verbe introducteur plus précis : « Comment protéger la Casbah ? dit le journaliste. — Il faut former de jeunes artisans, dit l’architecte. »',
					solutionAr:
						'« Comment protéger la Casbah ? interrogea le journaliste. — Il faut former de jeunes artisans, recommanda (ou répondit) l’architecte. »'
				},
				{
					problemAr:
						'Transposez cette phrase du registre familier au registre courant : « T’as vu ce vieux bouquin ? Il est super ! »',
					solutionAr: '« As-tu vu ce livre ancien ? Il est remarquable ! »'
				}
			],
			watchOutAr:
				'خطأ شائع في كتابة الجملة المعترضة: نسيان قلب الفاعل (خطأ: « ..., l’architecte expliqua. »؛ صواب: « ..., expliqua l’architecte. ») أو نسيان حرف « t » الصوتي قبل الضمير الغائب إذا انتهى الفعل بحرف علة (مثال: « ..., demanda-t-il. »).'
		},
		practice: [
			{
				questionAr:
					'Quel signe de ponctuation marque le changement d’interlocuteur à chaque nouvelle réplique d’un dialogue ?',
				options: ['Le point-virgule (;)', 'Le tiret (—) en début de ligne', 'Les parenthèses ( )', 'Les points de suspension (...)'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفاصلة المنقوطة تفصل بين جملتين مترابطتين لا بين المتحدثين.',
					'ممتاز! المطة في أول السطر (—) تعلن انتقال الكلام إلى متحاور آخر.',
					'خطأ: القوسان للإيضاحات الجانبية.',
					'خطأ: نقاط الحذف تدل على التردد أو عدم الإتمام.'
				],
				explanationAr: 'في الحوار المكتوب، نعود للسطر ونضع مطة (—) كلما تغير المتكلم.'
			},
			{
				questionAr:
					'Choisissez la proposition incise grammaticalement correcte :',
				options: [
					'« Ce projet mérite notre soutien », le maire déclara.',
					'« Ce projet mérite notre soutien », déclara-t-il.',
					'« Ce projet mérite notre soutien », déclara-il.',
					'« Ce projet mérite notre soutien », il déclara.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: يجب قلب الفاعل بعد الفعل في الجملة المعترضة.',
					'أحسنت! قلبنا الفاعل ووضعنا حرف « t » الصوتي بين « déclara » و « il ».',
					'خطأ: يجب إضافة « -t- » بين « déclara » و « il » لتفادي التقاء حرفي علة.',
					'خطأ: لا نترك الفاعل قبل الفعل في الجملة المعترضة.'
				],
				explanationAr: 'تستوجب الجملة المعترضة قلب الفاعل مع إضافة « -t- » الصوتي في نحو: déclara-t-il / demanda-t-elle.'
			},
			{
				questionAr:
					'Quel verbe introducteur convient le mieux lorsqu’un interlocuteur oppose une réserve polie à l’argument précédent ?',
				options: ['approuver', 'objecter', 'chuchoter', 'saluer'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: approuver تعني الموافقة لا الاعتراض.',
					'صحيح! الفعل « objecter » (يعترض بحجة) هو الأدق في الحوار الفكري.',
					'خطأ: chuchoter تدل على خفض الصوت لا على الاعتراض الفكري.',
					'خطأ: saluer تعني التحية.'
				],
				explanationAr: 'يُستعمل الفعلان « objecter » و « rétorquer » لإبراز تقديم اعتراض أو رد حجاجي.'
			},
			{
				questionAr:
					'Associez le mot « demeure » (au sens de maison) à son registre de langue :',
				options: ['Registre familier', 'Registre courant', 'Registre soutenu', 'Argot'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: المقابل العامي هو « baraque ».',
					'خطأ: المقابل القياسي هو « maison ».',
					'ممتاز! كلمة « demeure » تنتمي إلى المستوى الراقي (Registre soutenu).',
					'خطأ: ليست من اللغة الهامشية أو العامية.'
				],
				explanationAr: 'التدرج المعجمي هو: baraque (عامي) / maison (قياسي) / demeure (راقي).'
			},
			{
				questionAr:
					'Dans un dialogue argumentatif scolaire ou journalistique, quel registre de langue faut-il privilégier ?',
				options: [
					'Uniquement le registre familier',
					'Le registre courant ou soutenu',
					'Un mélange d’abréviations SMS',
					'Des phrases sans ponctuation'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: المستوى العامي مرفوض في التحرير المدرسي والصحفي الجاد.',
					'صحيح! نلتزم بالمستوى القياسي الواضح أو الراقي الملائم لمقام الحوار الجاد.',
					'خطأ: اختصارات الرسائل القصيرة مرفوضة تماماً في اللغة المكتوبة.',
					'خطأ: الترقيم أساس وضوح الحوار.'
				],
				explanationAr: 'يتطلب الحوار الحجاجي الجاد التزام المستوى القياسي (Courant) أو الراقي (Soutenu).'
			}
		]
	},
	{
		id: 'fre_lesson_2as_lp_t3_discours_rapporte',
		slug: 'fre-2as-lp-t3-discours-rapporte',
		grade: '2as_lp',
		yearSubjectId: 761,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع 3: الحوار الحجاجي المدني والروبورتاج حول التراث الجزائري (Le dialogue argumentatif et le reportage culturel)',
		order: 2,
		titleAr: 'الخطاب المنقول وتطابق الأزمنة (Discours direct / indirect et concordance des temps)',
		objectives: [
			'تحويل الجمل الخبرية والاستفهامية والأمرية من الخطاب المباشر (Discours direct) إلى الخطاب غير المباشر (Discours indirect)',
			'تطبيق قواعد تطابق الأزمنة (Concordance des temps) بدقة عندما يكون فعل القول في الماضي',
			'تحويل الضمائر الشخصية ومحددات الملكية وظروف الزمان والمكان بصورة صحيحة أثناء النقل'
		],
		keywordsAr: [
			'discours direct',
			'discours indirect',
			'concordance des temps',
			'verbe introducteur',
			'interrogation indirecte',
			'الخطاب المنقول'
		],
		discover: {
			scenarioAr:
				'أثناء إعداد روبورتاج في قسنطينة، سجل الصحفي تصريحين للحرفي: (1) الحاضر: Le maître artisan déclare : « Je travaille le cuivre ici aujourd’hui. » (2) الماضي: Le maître artisan a déclaré : « Je travaille le cuivre ici aujourd’hui. » لاحظ ما الذي يتغير وما الذي يثبت عند التحويل إلى الخطاب غير المباشر.',
			svg: svgFrenchTenseTimeline({
				title: 'Concordance des temps au Discours Indirect (Verbe au Passé)',
				tenseName: 'Présent -> Imparfait | PC -> PQP | Futur -> Cond. Présent',
				formula: 'Il a dit : « Je finis » => Il a dit qu’il finissait',
				activeZone: 'two_past',
				example: 'Il affirma : « Nous restaurerons ce pont demain. » => ...qu’ils restaureraient ce pont le lendemain.',
				markers: 'aujourd’hui -> ce jour-là | hier -> la veille | demain -> le lendemain'
			}),
			steps: [
				{
					promptAr:
						'إذا كان فعل القول في المضارع (« Le maître artisan déclare : "Je travaille ici." »)، هل يتغير زمن الفعل « travaille » عند التحويل إلى غير المباشر؟',
					hintAr: 'تذكر: إذا كان فعل القول في المضارع أو المستقبل، تبقى الأزمنة كما هي وتتغير الضمائر فقط.',
					expectedInput: 'لا يتغير الزمن؛ نقول: Le maître artisan déclare qu’il travaille là.',
					revealAr:
						'عندما يكون فعل القول في المضارع (déclare) أو المستقبل، لا نغير زمن الفعل داخل الكلام المنقول، بل نغير فقط الضمائر ومحددات الملكية!'
				},
				{
					promptAr:
						'أما إذا كان فعل القول في الماضي (« Le maître artisan a déclaré : "Je travaille le cuivre aujourd’hui." »)، فإلى ماذا يتحول المضارع « travaille » والظرف « aujourd’hui »؟',
					hintAr: 'المضارع يرجع خطوة إلى الماضي المستمر (Imparfait)، و aujourd’hui يصبح ce jour-là.',
					expectedInput: 'travaillait (Imparfait) و ce jour-là',
					revealAr:
						'التحويل الكامل: « Le maître artisan a déclaré qu’il travaillait le cuivre ce jour-là. »'
				},
				{
					promptAr:
						'كيف نحول الجملة الاستفهامية الكلية « Le visiteur a demandé : "Est-ce que la mosquée ouvre tôt ?" » والأمرية « Le guide a conseillé : "Respectez le silence !" »؟',
					hintAr: 'الاستفهام الكلي يأخذ « si »، والأمر يأخذ « de + infinitif ».',
					expectedInput: 'si la mosquée ouvrait tôt / de respecter le silence',
					revealAr:
						'الاستفهام الكلي (Est-ce que / قلب الفاعل) يُربط بـ « si »؛ والاستفهام الجزئي بـ « Qu’est-ce que » يصبح « ce que »؛ وصيغة الأمر تتحول دائماً إلى « de + infinitif ».'
				}
			]
		},
		summary: {
			rulesAr: [
				'القاعدة الأولى (فعل القول في المضارع أو المستقبل): نحذف النقطتين والمزدوجتين، نضيف أداة الربط المناسبة (que للخبر، si للاستفهام الكلي، ce que لـ que/qu’est-ce que، de + infinitif للأمر)، نغير الضمائر (je -> il/elle، mon -> son)، وتبقى الأزمنة ثابتة.',
				'القاعدة الثانية (فعل القول في الماضي — Concordance des temps): Présent -> Imparfait | Passé composé -> Plus-que-parfait | Futur simple -> Conditionnel présent | Futur antérieur -> Conditionnel passé | Imparfait et Plus-que-parfait تبقى ثابتة دون تغيير.',
				'تحويل المؤشرات الزمنية والمكانية (مع فعل قول ماضٍ): aujourd’hui -> ce jour-là | hier -> la veille | demain -> le lendemain | maintenant -> alors / à ce moment-là | la semaine prochaine -> la semaine suivante | ici -> là / là-bas.',
				'تحويل الاستفهام غير المباشر: نلغي علامة الاستفهام (؟) ونلغي قلب الفاعل (مثال: « Où allez-vous ? » -> Il a demandé où nous allions). و « Qu’est-ce qui » يصبح « ce qui »، و « Qu’est-ce que » يصبح « ce que ».'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Transformation selon le type de phrase',
				rootLabel: 'Passer au Discours Indirect',
				rootSub: 'Supprimer « : » « » ? ! et adapter la syntaxe',
				width: 580,
				branches: [
					{
						label: 'Déclarative',
						rule: 'Verbe + que + phrase',
						example: 'Il dit qu’il admire Tlemcen.'
					},
					{
						label: 'Question Oui/Non',
						rule: 'demander + si + S + V',
						example: 'Il demande si le musée est ouvert.'
					},
					{
						label: 'Question « Que ? »',
						rule: 'demander + ce que / ce qui',
						example: 'Il demande ce que nous visitons.'
					},
					{
						label: 'Impérative',
						rule: 'ordonner / conseiller + de + Inf.',
						example: 'Il nous conseille d’observer.'
					}
				]
			}),
			visualCaptionAr: 'دليل التحويل السريع إلى الخطاب غير المباشر وفق نوع الجملة المنقولة',
			examples: [
				{
					problemAr:
						'Transposez au discours indirect : « L’historien a affirmé : "Nous avons découvert une archive précieuse hier et nous la publierons demain." »',
					solutionAr:
						'L’historien a affirmé qu’ils avaient découvert une archive précieuse la veille et qu’ils la publieraient le lendemain.'
				},
				{
					problemAr:
						'Transposez au discours indirect : « La professeure a demandé aux élèves : "Qu’est-ce que vous retenez de cette visite ? Rédigez un bref compte rendu." »',
					solutionAr:
						'La professeure a demandé aux élèves ce qu’ils retenaient de cette visite et leur a demandé de rédiger un bref compte rendu.'
				}
			],
			watchOutAr:
				'احذر من خطأين متكررين في الامتحانات: (1) إبقاء علامة الاستفهام « ? » أو قلب الفاعل في الاستفهام غير المباشر (خطأ: Il a demandé où allait-il ?؛ صواب: Il a demandé où il allait.)؛ (2) كتابة « demander que » مع السؤال الكلي بدل « demander si ».'
		},
		practice: [
			{
				questionAr:
					'Mettez au discours indirect : « L’architecte a précisé : "Ces remparts résistent encore aux intempéries." »',
				options: [
					'L’architecte a précisé que ces remparts résistent encore aux intempéries.',
					'L’architecte a précisé que ces remparts résistaient encore aux intempéries.',
					'L’architecte a précisé que ces remparts résisteraient encore aux intempéries.',
					'L’architecte a précisé si ces remparts résistaient encore aux intempéries.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: فعل القول في الماضي (a précisé) فيتحول المضارع إلى Imparfait.',
					'ممتاز! Présent (« résistent ») يتحول إلى Imparfait (« résistaient »).',
					'خطأ: الشرطي الحاضر يقابل المستقبل البسيط لا المضارع.',
					'خطأ: الجملة خبرية فنستعمل « que » وليس « si ».'
				],
				explanationAr: 'لأن فعل القول ماضٍ (a précisé)، يتحول المضارع (résistent) إلى الماضي المستمر (résistaient).'
			},
			{
				questionAr:
					'Transposez au discours indirect : « Le guide a annoncé : "Demain, nous visiterons la Grande Mosquée de Tlemcen." »',
				options: [
					'Le guide a annoncé que demain, ils visiteront la Grande Mosquée de Tlemcen.',
					'Le guide a annoncé que le lendemain, ils visiteraient la Grande Mosquée de Tlemcen.',
					'Le guide a annoncé que la veille, ils visiteraient la Grande Mosquée de Tlemcen.',
					'Le guide a annoncé que le lendemain, ils visitaient la Grande Mosquée de Tlemcen.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: يجب تحويل « Demain » و « visiterons » لأن فعل القول ماضٍ.',
					'أحسنت! Demain -> le lendemain، و Futur simple (visiterons) -> Conditionnel présent (visiteraient).',
					'خطأ: « la veille » تقابل « hier » لا « demain ».',
					'خطأ: « visitaient » تقابل المضارع لا المستقبل البسيط.'
				],
				explanationAr: 'مع فعل قول ماضٍ: demain -> le lendemain، و Futur simple -> Conditionnel présent.'
			},
			{
				questionAr:
					'Transformez cette question au discours indirect : « Le reporter demanda : "Qu’est-ce qui caractérise les maisons de Ghardaïa ?" »',
				options: [
					'Le reporter demanda qu’est-ce qui caractérisait les maisons de Ghardaïa.',
					'Le reporter demanda ce qui caractérisait les maisons de Ghardaïa.',
					'Le reporter demanda ce que caractérisait les maisons de Ghardaïa.',
					'Le reporter demanda si caractérisait les maisons de Ghardaïa.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا نبقي الصيغة المباشرة « qu’est-ce qui » في الخطاب غير المباشر.',
					'صحيح! « Qu’est-ce qui » (الفاعل غير العاقل) تصبح « ce qui » مع تحويل المضارع إلى Imparfait.',
					'خطأ: « ce que » للمفعول به المباشر، وهنا الأداة فاعل للفعل caractériser.',
					'خطأ: « si » تخص السؤال الكلي (نعم/لا).'
				],
				explanationAr: 'تتحول صيغة الاستفهام « Qu’est-ce qui » وجوباً إلى « ce qui » في الاستفهام غير المباشر.'
			},
			{
				questionAr:
					'Comment rapporte-t-on l’impératif : « Le conservateur nous a conseillé : "Photographiez sans flash !" » ?',
				options: [
					'Le conservateur nous a conseillé que nous photographions sans flash.',
					'Le conservateur nous a conseillé de photographier sans flash.',
					'Le conservateur nous a conseillé si nous photographions sans flash.',
					'Le conservateur nous a conseillé photographier sans flash.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الصيغة القياسية الأنيقة لنقل الأمر هي de + infinitif.',
					'ممتاز! الأمر ينقل في الخطاب غير المباشر بصيغة « de + infinitif » (de photographier).',
					'خطأ: « si » للاستفهام الكلي.',
					'خطأ: لا بد من حرف الجر « de » قبل المصدر.'
				],
				explanationAr: 'الجملة الأمرية في الخطاب المباشر تتحول دائماً إلى « de + infinitif » بعد فعل النقل.'
			},
			{
				questionAr:
					'Transposez correctement : « Elle dit : "J’ai fini mon article hier." » (Attention au temps du verbe introducteur !)',
				options: [
					'Elle dit qu’elle avait fini son article la veille.',
					'Elle dit qu’elle a fini son article hier.',
					'Elle dit qu’elle finissait son article hier.',
					'Elle dit qu’elle finirait son article le lendemain.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: انتبه! فعل القول « dit » هنا في المضارع (Présent) وليس في الماضي.',
					'أحسنت! لما كان فعل القول في المضارع، نغير الضمائر فقط (J’ -> elle، mon -> son) ويبقى الزمن والظرف كما هما.',
					'خطأ: لا نغير Passé composé إلى Imparfait.',
					'خطأ: الجملة في الماضي وليست في المستقبل.'
				],
				explanationAr: 'إذا كان فعل القول في المضارع (Elle dit)، لا نطبق تحويل الأزمنة بل نكتفي بتعديل الضمائر والمحددات.'
			}
		]
	},
	{
		id: 'fre_lesson_2as_lp_t3_reportage_patrimoine',
		slug: 'fre-2as-lp-t3-reportage-patrimoine',
		grade: '2as_lp',
		yearSubjectId: 761,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع 3: الحوار الحجاجي المدني والروبورتاج حول التراث الجزائري (Le dialogue argumentatif et le reportage culturel)',
		order: 3,
		titleAr: 'الوصف التمجيدي في الروبورتاج الثقافي (La description valorisante dans le reportage culturel)',
		objectives: [
			'التعرف على خصائص الروبورتاج الثقافي والسياحي الجزائري: معاينة ميدانية، توثيق تاريخي، شهادات محلية، ووصف حسي حيّ',
			'توظيف أدوات التوصيف والتثمين (Caractérisation valorisante): النعوت المادحة، مضاف الاسم، الجمل الموصولة، والتشبيه',
			'استعمال المؤشرات المكانية (Localisateurs spatiaux) وتنظيم الوصف لتقديم معالم الجزائر (القصبة، تلمسان، قسنطينة، ميزاب)'
		],
		keywordsAr: [
			'reportage culturel',
			'description valorisante',
			'caractérisation',
			'localisateurs spatiaux',
			'patrimoine algérien',
			'الروبورتاج التراثي'
		],
		discover: {
			scenarioAr:
				'يصف صحفي ميداني مدينة قسنطينة في روبورتاج ثقافي: « Perchée sur son impressionnant rocher calcaire, Constantine s’impose dès le premier regard comme une citadelle majestueuse. Au-dessus des gorges vertigineuses du Rhumel, ses célèbres ponts suspendus relient les deux rives telle une dentelle d’acier. » تأمل كيف يُثمن الكاتب المكان.',
			svg: svgFrenchGrammarMap({
				title: 'Les outils de la description valorisante',
				rootLabel: 'Sublimer le patrimoine algérien',
				rootSub: 'Casbah, Tlemcen, Constantine, M’Zab',
				width: 580,
				branches: [
					{
						label: 'Adjectifs mélioratifs',
						rule: 'Épithètes ou attributs positifs',
						example: 'majestueux, authentique, raffiné'
					},
					{
						label: 'Expansions du nom',
						rule: 'Compl. du nom + Relative',
						example: 'des arcs de pierre qui défient les siècles'
					},
					{
						label: 'Verbes de perception',
						rule: 'Vue, ouïe, toucher, mouvement',
						example: 'se dresser, dominer, s’étendre'
					},
					{
						label: 'Repères spatiaux',
						rule: 'Organiser le regard du lecteur',
						example: 'au premier plan, plus loin, au cœur de'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'استخرج من وصف قسنطينة ثلاث صفات تقييمية إيجابية (Adjectifs mélioratifs) تُضفي هيبة وجمالاً على المدينة.',
					hintAr: 'ابحث عن الصفات التي تصف الصخرة والقلعة والجسور.',
					expectedInput: 'impressionnant, majestueuse, célèbres (ou vertigineuses)',
					revealAr:
						'النعت التمجيدي (Adjectif mélioratif) هو الأداة الأولى في الوصف التثمينى داخل الروبورتاج الثقافي والسياحي.'
				},
				{
					promptAr:
						'تأمل العبارة: « telle une dentelle d’acier » لوصف الجسور المعلقة. ما الصورة البلاغية المستعملة؟',
					hintAr: 'توجد أداة تشبيه واضحة هي « telle ».',
					expectedInput: 'التشبيه (La comparaison)',
					revealAr:
						'التشبيه (Comparaison: comme, tel que, semblable à) والاستعارة (Métaphore) يرسمَان صورة بصرية حية ترسخ جمال المعلم في خيال القارئ.'
				},
				{
					promptAr:
						'في الروبورتاج الثقافي، لماذا يجمع الصحفي بين الوصف (Description) والسرد الميداني (Présent de reportage) والشهادات الحية (Paroles d’habitants)؟',
					hintAr: 'تخيل القارئ وكأنه يرافق الصحفي في الزيارة الميدانية.',
					expectedInput: 'لإشراك القارئ في المعاينة الحية وتقوية مصداقية التقرير وإبراز قيمة التراث',
					revealAr:
						'الروبورتاج نوع صحفي هجين يمزج المعاينة الحية (الزمن الحاضر)، والوصف التثميني، والشهادات الميدانية المقتبسة لإثارة إعجاب القارئ ووعيه بالتراث.'
				}
			]
		},
		summary: {
			rulesAr: [
				'تعريف الروبورتاج الثقافي (Le reportage culturel): نص صحفي يكتبه مراسل زار مكاناً تراثياً أو تظاهرة ثقافية، فينقل للقارئ مشاهداته الحية ومعلوماته التاريخية وشهادات السكان والحرفيين.',
				'أدوات التوصيف والتوسيع الاسمي (Les expansions du nom): (1) النعت الملاصق (Adjectif épithète: une mosquée séculaire)؛ (2) المضاف إليه (Complément du nom: des ruelles en escalier, des colonnes de marbre)؛ (3) الجملة الموصولة (Proposition subordonnée relative: une cité qui témoigne d’un génie ancestral).',
				'تنظيم الوصف بالمؤشرات المكانية (Les localisateurs spatiaux): من العام إلى الخاص أو من الأعلى إلى الأسفل (Au cœur de, En contrebas, À l’horizon, De part et d’autre, Tout autour)، مع أفعال التموضع الحية (se dresser, surplomber, serpenter, s’ouvrir sur) بدل تكرار « il y a ».',
				'الأزمنة المميزة للروبورتاج: الحاضر الإخباري الوصفي (Présent de reportage) لإشعار القارئ بالحضور المباشر في المكان، والماضي المركب أو الماضي المستمر عند استحضار لمحة تاريخية عن المعلم.'
			],
			visualSvg: svgFrenchWritingBlueprint({
				title: 'Structure d’un Reportage Culturel Patrimonial',
				width: 580,
				steps: [
					{
						stage: '1. Titre & Chapeau',
						detail: 'Titre évocateur + court résumé situant le lieu (Casbah, Tlemcen, M’Zab).'
					},
					{
						stage: '2. Immersion spatiale',
						detail: 'Décrire l’entrée dans le site avec des repères spatiaux et des sens.'
					},
					{
						stage: '3. Histoire & Témoin',
						detail: 'Intégrer un repère historique + une citation d’artisan ou d’habitant.'
					},
					{
						stage: '4. Chute valorisante',
						detail: 'Conclure sur la richesse du patrimoine et le devoir de transmission.'
					}
				]
			}),
			visualCaptionAr: 'المخطط الصحفي الكامل لبناء روبورتاج ثقافي عن معلم تراثي جزائري',
			examples: [
				{
					problemAr:
						'Enrichissez cette phrase neutre par une caractérisation valorisante (adjectif + relative) : « Les rues de la Casbah montent vers la citadelle. »',
					solutionAr:
						'« Les ruelles pittoresques de la Casbah, qui serpentent entre des maisons blanchies à la chaux, grimpent majestueusement vers la citadelle. »'
				},
				{
					problemAr:
						'Identifiez les trois types d’expansions dans : « La Grande Mosquée de Tlemcen, monument séculaire qui rayonne par son mihrab sculpté, attire les chercheurs. »',
					solutionAr:
						'1) Complément du nom : « de Tlemcen » ; 2) Adjectif épithète : « séculaire » (et « sculpté ») ; 3) Subordonnée relative : « qui rayonne par son mihrab sculpté ».'
				}
			],
			watchOutAr:
				'تجنب في الروبورتاج تكرار الفعل الباهت « il y a » أو « être »! استبدلهما بأفعال وصفية حية ودقيقة: « se dresse un minaret », « serpentent des venelles fraîches », « s’élève la coupole », « résonne le martèlement du cuivre ».'
		},
		practice: [
			{
				questionAr:
					'Parmi ces verbes, lequel remplace le plus élégamment « il y a » dans la description d’un minaret ?',
				options: ['il existe', 'se dresse', 'il fait', 'il a'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: il existe محايد جداً ولا يرسم صورة بصرية.',
					'ممتاز! الفعل « se dresse » (ينتصب بشموخ) فعل وصفي حي يضفي قيمة جمالية.',
					'خطأ: فعل عام لا يؤدي معنى الوصف المكاني.',
					'خطأ: لا يناسب التموضع المعماري.'
				],
				explanationAr: 'استعمال أفعال التموضع الحية (se dresser, s’élever, surplomber) يثري الوصف التثميني.'
			},
			{
				questionAr:
					'Dans la phrase : « Les maisons blanchies à la chaux qui épousent la colline de Ghardaïa protègent contre la chaleur », quelle est la nature de « qui épousent la colline de Ghardaïa » ?',
				options: [
					'Un complément circonstanciel de temps',
					'Une proposition subordonnée relative',
					'Un adverbe de manière',
					'Une proposition incise'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا تدل على الزمن.',
					'صحيح! تبدأ بضمير الوصل « qui » وتوسّع وتصف الاسم السابق « Les maisons ».',
					'خطأ: هذه جملة كاملة ذات فعل مصرف وليست ظرفاً.',
					'خطأ: الجملة المعترضة تخص نقل الكلام في الحوار.'
				],
				explanationAr: 'الجملة الموصولة (Subordonnée relative) من أهم أدوات التوصيف وتوسيع الاسم في الروبورتاج.'
			},
			{
				questionAr:
					'Quelle est la fonction du « chapeau » placé en tête d’un reportage journalistique ?',
				options: [
					'Donner la liste des auteurs du manuel',
					'Résumer l’essentiel du reportage en quelques lignes pour capter l’intérêt du lecteur',
					'Remplacer entièrement la conclusion',
					'Citer toutes les dates historiques du pays'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا علاقة له بمؤلفي الكتاب.',
					'أحسنت! الافتتاحية (Chapeau) تلخص مضمون الروبورتاج وتشوق القارئ لمتابعة القراءة.',
					'خطأ: يأتي في بداية الروبورتاج ولا يلغي الخاتمة.',
					'خطأ: يكتفي بالجوهر بإيجاز.'
				],
				explanationAr: 'الـ Chapeau فقرة تمهيدية موجزة تحت العنوان تقدم المكان والموضوع وتجذب القارئ.'
			},
			{
				questionAr:
					'Quel groupe de mots contient uniquement des localisateurs spatiaux utiles au reportage ?',
				options: [
					'hier, demain, autrefois',
					'en contrebas, au premier plan, de part et d’autre',
					'parce que, car, puisque',
					'certes, néanmoins, pourtant'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: هذه مؤشرات زمانية (Temporels).',
					'ممتاز! كلها مؤشرات مكانية تنظم مسار النظر في الوصف.',
					'خطأ: هذه روابط سببية.',
					'خطأ: هذه روابط استدراك.'
				],
				explanationAr: 'المؤشرات المكانية (en contrebas, au premier plan, au loin...) تنظم اللوحة الوصفية بدقة.'
			},
			{
				questionAr:
					'Pourquoi un reporter intègre-t-il les paroles d’un artisan ou d’un habitant dans son article sur la Casbah ?',
				options: [
					'Pour rendre l’article plus long sans effort',
					'Pour apporter un témoignage authentique et vivant qui ancre le reportage dans le réel',
					'Pour contredire le titre de son propre article',
					'Pour éviter toute description des lieux'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الهدف صحفي توثيقي لا مجرد إطالة.',
					'صحيح! الشهادة الميدانية تضفي صدقية وحياة إنسانية على الروبورتاج الثقافي.',
					'خطأ: الشهادة تدعم محور الروبورتاج.',
					'خطأ: الشهادة تكمل الوصف ولا تلغيه.'
				],
				explanationAr: 'دمج شهادات أهل المكان (Témoignages) عنصر مميز للروبورتاج الصحفي الأصيل.'
			}
		]
	},
	{
		id: 'fre_lesson_2as_lp_t3_coherence_visee',
		slug: 'fre-2as-lp-t3-coherence-visee',
		grade: '2as_lp',
		yearSubjectId: 761,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع 3: الحوار الحجاجي المدني والروبورتاج حول التراث الجزائري (Le dialogue argumentatif et le reportage culturel)',
		order: 4,
		titleAr: 'الاتساق النصي والبدائل والغاية التواصلية (Cohérence, substituts et visée communicative)',
		objectives: [
			'تحديد الإحالة والبدائل النحوية (Substituts grammaticaux) والمعجمية (Substituts lexicaux) لتفادي التكرار وضمان الاتساق النصي',
			'التمييز بين التقدم الموضوعاتي وترابط الجمل (Cohérence et cohésion) لإعادة ترتيب فقرة مشوشة بسهولة',
			'صياغة الغاية التواصلية (Visée communicative) بدقة حسب نوع النص: تفسيري، حجاجي، حواري، أو روبورتاج تراثي'
		],
		keywordsAr: [
			'cohérence textuelle',
			'substituts grammaticaux',
			'substituts lexicaux',
			'anaphore',
			'visée communicative',
			'الاتساق والغاية التواصلية'
		],
		discover: {
			scenarioAr:
				'اقرأ هذا المقطع من روبورتاج عن تلمسان: « La Grande Mosquée de Tlemcen attire chaque année des chercheurs venus de tout le pays. [[Elle]] séduit par la finesse de son mihrab. Ce joyau architectural témoigne d’un savoir-faire séculaire que les habitants [[lui]] préservent avec fierté. » كيف تجنّب الكاتب تكرار اسم المسجد؟',
			svg: svgFrenchGrammarMap({
				title: 'Assurer la cohérence textuelle : les substituts',
				rootLabel: 'Éviter les répétitions (Reprise anaphorique)',
				rootSub: 'Relier les phrases autour d’un même référent',
				width: 580,
				branches: [
					{
						label: 'Substituts grammaticaux',
						rule: 'Pronoms (il, elle, lui, y, dont)',
						example: 'La Casbah -> Elle / Celle-ci'
					},
					{
						label: 'Substituts lexicaux',
						rule: 'Synonyme, périphrase, générique',
						example: 'Tlemcen -> la perle du Maghreb'
					},
					{
						label: 'Progression logique',
						rule: 'Connecteurs + temps cohérents',
						example: 'D’abord... Puis... Enfin...'
					},
					{
						label: 'Visée communicative',
						rule: 'But précis de l’auteur',
						example: 'Informer, valoriser, sensibiliser'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'على أي عبارة يعود الضمير « Elle » والضمير « lui » في مقطع المسجد الكبير بتلمسان؟ وما نوع هذين البديلين؟',
					hintAr: 'ابحث عن الفاعل المؤنث المفرد في الجملة الأولى.',
					expectedInput: 'يعودان على « La Grande Mosquée de Tlemcen »، وهما بديلان نحويان (Substituts grammaticaux)',
					revealAr:
						'الضمائر (il, elle, ils, le, la, les, lui, leur, en, y, qui, que, dont, celui-ci...) تُسمى بدائل نحوية (Substituts grammaticaux) تحيل على عنصر سابق في النص.'
				},
				{
					promptAr:
						'كيف أشار الكاتب إلى المسجد نفسه في الجملة الثالثة دون استعمال ضمير؟ وما اسم هذا البديل؟',
					hintAr: 'انظر إلى العبارة الاسمية « Ce joyau architectural ».',
					expectedInput: '« Ce joyau architectural » وهو بديل معجمي تمجيدي (Substitut lexical / périphrase méliorative)',
					revealAr:
						'البديل المعجمي (Substitut lexical) يعوض الاسم بمرادف أو اسم عام (هذا المعلم) أو كناية جميلة (Ce joyau architectural)، وهو يثري المعنى ويُبرز موقف الكاتب.'
				},
				{
					promptAr:
						'ما الغاية التواصلية (Visée communicative) لروبورتاج يصف جمال القصبة أو ميزاب ويدعو إلى صيانته؟',
					hintAr: 'يجمع الروبورتاج بين التعريف بالمكان وتثمينه وتوعية القارئ بضرورة حفظه.',
					expectedInput: 'التعريف بالمعلم وتثمينه وتوعية القارئ بضرورة الحفاظ عليه (Informer, valoriser et sensibiliser)',
					revealAr:
						'في أسئلة البكالوريا والثانية ثانوي، نُصوغ الغاية التواصلية بفعل مصدري دقيق: informer et expliquer (التفسيري)، convaincre et persuader (الحجاجي)، faire découvrir, valoriser et sensibiliser à la préservation (الروبورتاج التراثي).'
				}
			]
		},
		summary: {
			rulesAr: [
				'البدائل النحوية (Les substituts grammaticaux): تشمل الضمائر الشخصية (il, elle, le, la, lui, leur, en, y)، ضمائر الإشارة (celui-ci, celle-là)، ضمائر الملكية (le sien)، وضمائر الوصل (qui, que, dont, où). لتحديد عائد أي ضمير، نراعي النوع (مذكر/مؤنث) والعدد (مفرد/جمع) والمعنى في الجملة السابقة مباشرة.',
				'البدائل المعجمية (Les substituts lexicaux): تعوض الكلمة المكررة بمرادف (cité = ville)، أو اسم أعم (la Casbah = ce quartier historique)، أو كناية تثمينية (Constantine = la ville des ponts suspendus).',
				'شروط الاتساق في إعادة ترتيب الفقرة (Reconstitution de paragraphe): نبحث عن الجملة الافتتاحية (التي تقدم الاسم الصريح دون ضمير إحالة غامض)، ثم نتابع تسلسل الضمائر (il / ce site) والروابط الزمنية والمنطقية حتى الجملة الختامية.',
				'تحديد الغاية التواصلية (La visée communicative): نسأل « لماذا كتب الكاتب هذا النص؟ »: (1) نص تفسيري -> informer et faire comprendre؛ (2) مرافعة -> convaincre et défendre une valeur؛ (3) تنديد -> dénoncer un fléau et alerter؛ (4) روبورتاج ثقافي -> faire découvrir un lieu, valoriser le patrimoine et inciter à le préserver.'
			],
			visualSvg: svgFrenchWritingBlueprint({
				title: 'Méthode pour trouver le référent d’un pronom à l’examen',
				width: 580,
				steps: [
					{
						stage: '1. Repérer genre/nombre',
						detail: 'Ex. « elles » = féminin pluriel ; « lui » = COI singulier (à + nom).'
					},
					{
						stage: '2. Remonter la phrase',
						detail: 'Chercher le groupe nominal correspondant juste avant le pronom.'
					},
					{
						stage: '3. Remplacer & vérifier',
						detail: 'Substituer le nom à la place du pronom pour tester la logique.'
					},
					{
						stage: '4. Recopier précis',
						detail: 'Recopier le groupe nominal exact sans couper son sens essentiel.'
					}
				]
			}),
			visualCaptionAr: 'الطريقة المنهجية المضمونة للإجابة عن سؤال الإحالة (À qui / À quoi renvoient les pronoms ?)',
			examples: [
				{
					problemAr:
						'À quoi renvoient les pronoms dans : « Les ponts de Constantine surplombent le Rhumel ; les voyageurs [[les]] admirent et [[y]] prennent souvent des photos. » ?',
					solutionAr: 'les = les ponts de Constantine | y = sur les ponts de Constantine (lieu).'
				},
				{
					problemAr:
						'Formulez la visée communicative d’un reportage consacré aux ateliers de poterie traditionnelle en Algérie.',
					solutionAr:
						'La visée communicative de l’auteur est de faire découvrir l’artisanat traditionnel algérien, d’en valoriser la richesse et de sensibiliser les lecteurs à sa sauvegarde.'
				}
			],
			watchOutAr:
				'احذر عند تحديد عائد الضمير « en » و « y »: الضمير « en » يحل محل مفعول مسبوق بـ « de » (مثال: Ce site est riche, on en parle partout -> en = de ce site)، والضمير « y » يحل محل مكان أو مفعول مسبوق بـ « à » (مثال: Timgad fascine ; nous y retournerons -> y = à Timgad).'
		},
		practice: [
			{
				questionAr:
					'Dans : « La vallée du M’Zab possède une architecture ingénieuse. Ce patrimoine classé attire les urbanistes du monde entier », comment appelle-t-on l’expression « Ce patrimoine classé » ?',
				options: [
					'Un substitut grammatical',
					'Un substitut lexical',
					'Une conjonction de subordination',
					'Un verbe introducteur'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: البديل النحوي يكون ضميراً مثل elle أو celle-ci.',
					'ممتاز! المجموعة الاسمية « Ce patrimoine classé » تعوض « La vallée du M’Zab » معنوياً، فهي بديل معجمي (Substitut lexical).',
					'خطأ: ليست أداة ربط.',
					'خطأ: ليست فعلاً ناقلاً للكلام.'
				],
				explanationAr: 'استبدال اسم بمجموعة اسمية أخرى ذات معنى مشابه أو تثميني يسمى بديلاً معجمياً (Substitut lexical).'
			},
			{
				questionAr:
					'À quoi renvoie le pronom « y » dans : « La Kalâa des Béni Hammad se niche dans les montagnes du Hodna ; les archéologues y ont mis au jour des vestiges remarquables » ?',
				options: [
					'aux archéologues',
					'à la Kalâa des Béni Hammad',
					'aux vestiges remarquables',
					'au passé simple'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: « y » هنا يدل على المكان الذي جرت فيه الحفريات.',
					'صحيح! « y » يعوض المكان المذكور سابقاً: dans la Kalâa des Béni Hammad.',
					'خطأ: الآثار مفعول مباشر للفعل ont mis au jour.',
					'خطأ: إجابة غير مرتبطة بالمعنى.'
				],
				explanationAr: 'الضمير الظرفي « y » يحل محل مفعول مكان مسبوق بـ à / dans / sur.'
			},
			{
				questionAr:
					'À quoi renvoie le pronom « dont » dans : « Les manuscrits anciens dont la bibliothèque assure la conservation datent du Moyen Âge » ?',
				options: ['la bibliothèque', 'les manuscrits anciens', 'le Moyen Âge', 'la conservation'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: المكتبة هي الفاعل في الجملة الموصولة.',
					'أحسنت! « dont » يعود على الاسم السابق له مباشرة « les manuscrits anciens » (la conservation de ces manuscrits).',
					'خطأ: يرد في آخر الجملة.',
					'خطأ: « conservation » مفعول به داخل جملة الوصل.'
				],
				explanationAr: 'ضمير الوصل « dont » يعود دائماً على الاسم السابق له مباشرة (Antécédent : les manuscrits anciens).'
			},
			{
				questionAr:
					'Pour remettre en ordre un paragraphe mélangé, quelle phrase place-t-on normalement en première position ?',
				options: [
					'Celle qui commence par « Enfin » ou « Ainsi »',
					'Celle qui introduit clairement le référent nominal principal sans pronom flou',
					'Celle qui commence par « Cependant, il... »',
					'Celle qui contient uniquement une citation isolée'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: « Enfin » و « Ainsi » تفتتحان الخاتمة.',
					'ممتاز! الجملة الافتتاحية تقدم الموضوع باسمه الصريح قبل أن تحيل إليه الضمائر والبدائل في الجمل اللاحقة.',
					'خطأ: وجود « Cependant » وضمير غير معرف « il » يدل على أنها جملة وسطى.',
					'خطأ: الاقتباس المعزول لا يفتتح فقرة تفسيرية أو وصفية عادة.'
				],
				explanationAr: 'تُعرف الجملة الأولى بتقديمها الصريح للاسم/الموضوع المحوري الذي تُبنى عليه بقية الإحالات.'
			},
			{
				questionAr:
					'Quelle formulation exprime le mieux la visée communicative d’un reportage sur les artisans dinandiers de Constantine ?',
				options: [
					'Raconter une légende imaginaire pour faire peur',
					'Faire découvrir ce savoir-faire artisanal, le valoriser et inciter à sa transmission aux jeunes',
					'Démontrer une formule d’algèbre abstraite',
					'Rédiger une liste de courses domestiques'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الروبورتاج الصحفي واقعي توثيقي لا خيالي.',
					'صحيح! تجمع الغاية بين التعريف (faire découvrir) والتثمين (valoriser) والتحسيس بالمحافظة (inciter à transmettre).',
					'خطأ: لا علاقة له بالمعادلات الرياضية.',
					'خطأ: ليس قائمة مشتريات.'
				],
				explanationAr: 'غاية الروبورتاج الثقافي هي التعريف بالمعلم أو الحرفة، تثمينها، وتحسيس القارئ بضرورة صونها.'
			}
		]
	},
	{
		id: 'fre_lesson_2as_lp_t3_rediger_reportage_cr',
		slug: 'fre-2as-lp-t3-rediger-reportage-cr',
		grade: '2as_lp',
		yearSubjectId: 761,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع 3: الحوار الحجاجي المدني والروبورتاج حول التراث الجزائري (Le dialogue argumentatif et le reportage culturel)',
		order: 5,
		titleAr: 'تحرير روبورتاج ثقافي أو تقرير موضوعي (Rédiger un reportage culturel ou un compte rendu)',
		objectives: [
			'كتابة روبورتاج ثقافي متكامل (140 إلى 180 كلمة) عن مدينة أو معلم جزائري مع عنوان، افتتاحية (Chapeau)، وصف تثميني، وشهادة محلية',
			'تحرير تقرير موضوعي دقيق لنص حواري أو روبورتاج صحفي بتحويل الأقوال المباشرة إلى خطاب غير مباشر عند الحاجة',
			'الالتزام بسلم التنقيط في شعبة الآداب والفلسفة (7 نقاط) من حيث الملاءمة والانسجام وجودة اللغة والتقديم'
		],
		keywordsAr: [
			'rédiger un reportage',
			'compte rendu',
			'patrimoine algérien',
			'chapeau journalistique',
			'témoignage',
			'الوضعية الإدماجية'
		],
		discover: {
			scenarioAr:
				'في اختبار الفصل الثالث (7 نقاط)، يُعرض عليك موضوعان اختياريان: الموضوع الأول تقرير موضوعي عن روبورتاج أو حوار حول التراث، والموضوع الثاني تحرير روبورتاج ثقافي لتعريف القراء بجمال تلمسان أو القصبة أو وادي ميزاب. كيف تضمن اختيار الموضوع الأنسب وإتقانه؟',
			svg: svgFrenchWritingBlueprint({
				title: 'Réussir son Reportage Culturel à l’examen (2AS LP — 7 pts)',
				width: 580,
				steps: [
					{
						stage: '1. Titre + Chapeau',
						detail: 'Un titre accrocheur et 2 phrases situant la ville et son intérêt.'
					},
					{
						stage: '2. Parcours descriptif',
						detail: 'Décrire l’architecture et l’ambiance avec repères spatiaux et adjectifs.'
					},
					{
						stage: '3. Voix du terrain',
						detail: 'Insérer un bref dialogue ou témoignage bien ponctué (« ... »).'
					},
					{
						stage: '4. Finale inspirante',
						detail: 'Inviter le lecteur à découvrir et respecter ce trésor patrimonial.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'إذا اخترت كتابة « تقرير موضوعي » عن نص حواري بين صحفي ومهندس معماري، هل تترك الكلام المباشر بمزدوجتيه كما هو أم تلخصه بأسلوب غير مباشر؟',
					hintAr: 'تذكر قاعدة التقرير الموضوعي: بضمير الغائب وإعادة الصياغة.',
					expectedInput: 'نلخصه بالخطاب غير المباشر بضمير الغائب (Le journaliste interroge... L’architecte explique que...)',
					revealAr:
						'في التقرير الموضوعي عن حوار، نحول التبادل الشفهي إلى سرد تلخيصي غير مباشر باستعمال أفعال مثل: « Le journaliste interroge l’architecte sur... Celui-ci répond que... »'
				},
				{
					promptAr:
						'وإذا اخترت الموضوع الثاني (تحرير روبورتاج عن معلم جزائري)، ما العناصر الأربعة التي ترفع العلامة إلى 7/7؟',
					hintAr: 'تذكر الهيكل الصحفي: العنوان، الافتتاحية، الوصف التثميني، والشهادة الحية.',
					expectedInput: 'عنوان جذاب + افتتاحية موجزة (Chapeau) + وصف مكاني تثميني + شهادة محلية مضبوطة الترقيم + خاتمة',
					revealAr:
						'تلك العناصر الأربعة تميز الروبورتاج الصحفي الأصيل عن مجرد إنشاء وصفي عادي، وتبرز تمكنك من خصائص النوع النصي.'
				},
				{
					promptAr:
						'كيف تتجنب تكرار اسم المدينة (مثل Tlemcen أو Constantine) في فقرات الروبورتاج؟',
					hintAr: 'استثمر درس البدائل النحوية والمعجمية.',
					expectedInput: 'بتنويع البدائل المعجمية (cette cité historique, la perle des Zianides, ce joyau) والضمائر (elle, y, dont)',
					revealAr:
						'تنويع البدائل المعجمية التمجيدية والضمائر يضفي سلاسة أدبية راقية ويجنب الرتابة والتكرار.'
				}
			]
		},
		summary: {
			rulesAr: [
				'اختيار الموضوع بحكمة: إذا فهمت النص جيداً وتتقن إعادة الصياغة والخطاب غير المباشر، فالتقرير الموضوعي (Sujet 1) خيار آمن ومنظم؛ وإذا كنت تملك رصيداً وصفياً ومعرفياً غنياً عن المعلم المطلوب، فالروبورتاج الثقافي (Sujet 2) يمنحك مساحة للإبداع.',
				'مواصفات الروبورتاج الناجح (Sujet 2): (1) عنوان اسمي معبر (مثال: « La vallée du M’Zab : une leçon d’architecture durable »)؛ (2) Chapeau من سطرين؛ (3) فقرتان للعرض تمزجان الوصف الحسي والتاريخ وشهادة حرفي أو مرشد بالترقيم السليم؛ (4) خاتمة تدعو لحماية التراث.',
				'مواصفات التقرير الموضوعي لحوار أو روبورتاج (Sujet 1): مقدمة (Accroche) تعرف بنوع النص والمحاورين أو المراسل والمكان، ثم تلخيص الأفكار الأساسية بضمير الغائب (Le reporter décrit..., L’artisan affirme que...) دون رأي شخصي ودون نسخ حرفي.',
				'المراجعة النهائية الحاسمة: التأكد من توافق الأزمنة (Présent de reportage)، سلامة مطابقة النعوت المادحة، احترام علامات ترقيم الشهادة (« ... »)، وتجنب الأخطاء الإملائية المتكررة.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Lexique valorisant pour vos reportages algériens',
				rootLabel: 'Patrimoine & Artisanat',
				rootSub: 'Substituts lexicaux prêts à l’emploi',
				width: 580,
				branches: [
					{
						label: 'Architecture',
						rule: 'voûtes, patios, minarets',
						example: 'des coupoles blanchies à la chaux'
					},
					{
						label: 'Adjectifs forts',
						rule: 'séculaire, harmonieux',
						example: 'un savoir-faire authentique'
					},
					{
						label: 'Artisans',
						rule: 'dinandier, potier, tisserand',
						example: 'des gestes patients et précis'
					},
					{
						label: 'Transmission',
						rule: 'sauvegarder, léguer',
						example: 'préserver ce trésor collectif'
					}
				]
			}),
			visualCaptionAr: 'رصيد معجمي تثميني جاهز لتوظيفه في الروبورتاج الثقافي عن المدن الجزائرية',
			examples: [
				{
					problemAr:
						'Rédigez un titre et un chapeau pour un reportage sur les dinandiers de Constantine.',
					solutionAr:
						'Titre : Constantine : au rythme patient des maîtres du cuivre.\nChapeau : Au cœur de la vieille médina de Constantine, quelques ateliers perpétuent encore l’art raffiné de la dinanderie. Immersion dans un savoir-faire ancestral qui allie précision et beauté.'
				},
				{
					problemAr:
						'Intégrez un bref témoignage bien ponctué dans ce reportage.',
					solutionAr:
						'Penché sur un plateau ciselé, maître Hamid confie avec fierté : « Chaque motif raconte l’histoire de notre ville ; tant que les jeunes apprendront ce métier, notre mémoire restera vivante. »'
				}
			],
			watchOutAr:
				'في الروبورتاج الثقافي لا تسقط في أسلوب التقرير الجاف الخالي من الحياة، وفي الوقت نفسه لا تكتب حكاية خيالية؛ التزم بالواقعية الميدانية واللغة القياسية أو الراقية النظيفة.'
		},
		practice: [
			{
				questionAr:
					'Pour rédiger le compte rendu objectif d’un dialogue argumentatif, comment doit-on restituer les paroles des interlocuteurs ?',
				options: [
					'En recopiant mot à mot toutes les répliques avec leurs tirets',
					'En synthétisant les idées clés au discours indirect à la 3e personne',
					'En inventant un troisième interlocuteur',
					'En donnant son avis personnel sur chaque phrase'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: نسخ الردود حرفياً لا يُعد تقريراً موضوعياً.',
					'ممتاز! نلخص جوهر مواقف المتحاورين بالخطاب غير المباشر وبضمير الغائب.',
					'خطأ: يمنع اختراع عناصر غير موجودة في النص.',
					'خطأ: التقرير الموضوعي يستبعد الرأي الذاتي.'
				],
				explanationAr: 'تلخيص الحوار في التقرير الموضوعي يعتمد على تحويل الأقوال إلى خطاب غير مباشر مركز بضمير الغائب.'
			},
			{
				questionAr:
					'Quel titre convient le mieux à un reportage culturel sur la Grande Mosquée de Tlemcen ?',
				options: [
					'Exercice de français numéro trois',
					'La Grande Mosquée de Tlemcen : un chef-d’œuvre séculaire de lumière et d’harmonie',
					'Je suis parti en voyage pendant les vacances',
					'Liste des monuments anciens'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: ليس عنواناً صحفياً.',
					'أحسنت! عنوان اسمي معبر يحدد المعلم ويوحي بالوصف التثميني منذ القراءة الأولى.',
					'خطأ: جملة شخصية عادية لا تناسب عنوان روبورتاج.',
					'خطأ: عنوان إداري جاف.'
				],
				explanationAr: 'يفضل في الروبورتاج عنوان اسمي جذاب (Phrase nominale) يجمع بين الإخبار والتثمين.'
			},
			{
				questionAr:
					'Quel temps verbal rend le reportage sur le terrain le plus vivant et immédiat ?',
				options: [
					'Le plus-que-parfait uniquement',
					'Le présent de l’indicatif (présent de reportage)',
					'Le futur antérieur',
					'L’imparfait du subjonctif'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الماضي الأسبق للأحداث السابقة في الماضي فقط.',
					'صحيح! الحاضر الوصفي الميداني (Présent de reportage) ينقل القارئ مباشرة إلى قلب المكان.',
					'خطأ: المستقبل الأسبق لا يناسب المعاينة الحية.',
					'خطأ: صيغة أدبية قديمة لا تُستعمل في الصحافة الحديثة.'
				],
				explanationAr: 'يعتمد الروبورتاج الصحفي على الحاضر (Présent de reportage) ليمنح المشهد حيوية ومباشرة.'
			},
			{
				questionAr:
					'Quelle conclusion correspond à un reportage réussi sur la vallée du M’Zab ?',
				options: [
					'Bref, il faisait chaud et nous sommes rentrés en bus.',
					'Quitter le M’Zab, c’est emporter la preuve vivante qu’une architecture respectueuse du climat et de la solidarité demeure un modèle précieux pour demain.',
					'Voici donc la fin de mon texte de 150 mots.',
					'Pour finir, parlons maintenant des trains à grande vitesse.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: خاتمة سطحية عامية تفتقر للقيمة التراثية.',
					'ممتاز! خاتمة بليغة تبرز القيمة المستدامة للمعلم وتدعو إلى استلهامه والحفاظ عليه.',
					'خطأ: عبارات مصطنعة تسيء لجودة التحرير.',
					'خطأ: خروج تام عن موضوع الروبورتاج.'
				],
				explanationAr: 'تختتم المقالة الروبورتاجية بنظرة تثمينية شاملة (Chute) تربط التراث بالحاضر والمستقبل.'
			},
			{
				questionAr:
					'Lequel de ces éléments est indispensable pour obtenir la note maximale en organisation dans un reportage (2AS LP — 7 pts) ?',
				options: [
					'Écrire sans aucun saut de ligne ni titre',
					'Présenter un titre, un chapeau, des paragraphes cohérents liés par des repères spatiaux et une conclusion',
					'Répéter le même adjectif « beau » dix fois',
					'Omettre toute citation ou détail concret du site'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: انعدام التنظيم يخفض علامة العرض والانسجام.',
					'أحسنت! الهيكلة الصحفية الواضحة مع المؤشرات المكانية والتفاصيل الحية تضمن أفضل تنقيط.',
					'خطأ: التكرار يضعف الثراء المعجمي.',
					'خطأ: الروبورتاج يحتاج تفاصيل ميدانية وشهادة حية.'
				],
				explanationAr: 'تنظيم الروبورتاج (عنوان + افتتاحية + فقرات وصفية وشهادة + خاتمة) معيار حاسم في سلم التنقيط.'
			}
		]
	}
];
