import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWritingBlueprint
} from '../../svg-french';

export const LESSONS_2AM_T1: FrenchInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 1 : La structure du récit moral
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_2am_t1_structure_recit',
		slug: 'fre-2am-t1-structure-recit',
		grade: '2am',
		yearSubjectId: 625,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع الأول: القصة الأخلاقية والتربوية الجزائرية — Projet 1 : Le récit moral et éducatif',
		order: 1,
		titleAr: 'بنية القصة الأخلاقية (La structure du récit : situation initiale, élément perturbateur, péripéties, situation finale)',
		objectives: [
			'التعرّف على المراحل الأربع لبنية القصة (le schéma narratif) في القصص الأخلاقية الجزائرية',
			'التمييز بين الوضعية الابتدائية (situation initiale) والحدث المخلّ (élément perturbateur) والأحداث المتسلسلة (péripéties) والوضعية النهائية (situation finale)',
			'استخراج المغزى الأخلاقي (la morale) من قصة حول الصدق أو التعاون أو الشجاعة'
		],
		keywordsAr: ['Schéma narratif', 'Situation initiale', 'Élément perturbateur', 'Péripéties', 'Situation finale'],
		discover: {
			scenarioAr:
				'قرأ التلاميذ قصة قصيرة من الأوراس: 1) « Jadis, dans un village paisible des Aurès, vivait un jeune berger honnête nommé Youssef. » 2) « Un jour, il trouva sur le sentier une bourse remplie de pièces d’argent. » 3) « Il chercha aussitôt le propriétaire dans tout le marché et lui rendit son bien sans rien garder. » 4) « Depuis ce jour, tout le village respecta son honnêteté exemplaire. »',
			svg: svgFrenchWritingBlueprint({
				title: 'Les 4 étapes du récit moral (Schéma narratif)',
				steps: [
					{ stage: 'Situation initiale', detail: 'Calme : qui ? où ? quand ? (Imparfait)', color: '#1d4ed8' },
					{ stage: 'Élément perturb.', detail: 'Rupture : Un jour, / Soudain, (Passé simple)', color: '#b45309' },
					{ stage: 'Péripéties', detail: 'Actions et efforts du héros face à l’épreuve', color: '#047857' },
					{ stage: 'Situation finale', detail: 'Retour au calme + récompense et leçon morale', color: '#7c3aed' }
				]
			}),
			steps: [
				{
					promptAr: 'ما العناصر التي عرّفتنا بها الجملة الأولى (الوضعية الابتدائية)؟',
					hintAr: 'لاحظ: متى (Jadis)، أين (dans un village des Aurès)، ومن (un jeune berger honnête).',
					expectedInput: 'Temps, lieu et personnage',
					revealAr: 'قدّمت لنا الزمان (Jadis) والمكان (un village des Aurès) والشخصية الرئيسة (Youssef) في حالة هدوء واستقرار.'
				},
				{
					promptAr: 'ما العبارة التي أعلنت بداية الحدث المفاجئ (l’élément perturbateur) في الجملة الثانية؟',
					hintAr: 'انظر إلى أول كلمتين في الجملة الثانية.',
					expectedInput: 'Un jour',
					revealAr: 'العبارة هي « Un jour »، وقد غيّرت الهدوء الأول بعثور الراعي على كيس النقود.'
				},
				{
					promptAr: 'ما القيمة الأخلاقية التي تعلّمنا إياها الوضعية النهائية في هذه القصة؟',
					hintAr: 'تأمّل سبب احترام أهل القرية ليوسف.',
					expectedInput: 'L’honnêteté',
					revealAr: 'القيمة الأخلاقية هي الأمانة والصدق (l’honnêteté)، فالأمانة تكسب صاحبها احترام الجميع.'
				}
			]
		},
		summary: {
			rulesAr: [
				'القصة الأخلاقية (Le récit moral) نص سردي يروي أحداثا هادفة تغرس قيما نبيلة كالصدق والأمانة والتعاون (التويزة) والشجاعة.',
				'1) الوضعية الابتدائية (La situation initiale): تقدّم الزمان والمكان والشخصيات في حالة استقرار، وتُكتب غالبا في الماضي الناقص (l’imparfait).',
				'2) العنصر المخلّ / المفاجئ (L’élément perturbateur): يغيّر مجرى الهدوء ويبدأ بمؤشر زمني مثل (Un jour, Un matin, Soudain, Tout à coup) مع الماضي البسيط (le passé simple).',
				'3) تسلسل الأحداث (Les péripéties): سلسلة الأفعال والمبادرات التي يقوم بها البطل لتجاوز المشكلة أو أداء الأمانة.',
				'4) الوضعية النهائية (La situation finale): عودة الاستقرار (Enfin, Finalement, Depuis ce jour) مع إبراز العبرة الأخلاقية.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Repérer chaque étape dans un récit (2AM)',
				rootLabel: 'Les indices du récit moral',
				rootSub: 'Connecteurs + Temps verbaux',
				branches: [
					{
						label: 'Début (Calme)',
						rule: 'Autrefois, Jadis + Imparfait',
						example: '...vivait un artisan honnête.',
						color: '#1d4ed8'
					},
					{
						label: 'Rupture & Actions',
						rule: 'Un jour, Soudain + Passé simple',
						example: 'Soudain, la neige bloqua la route.',
						color: '#b45309'
					},
					{
						label: 'Fin (Morale)',
						rule: 'Enfin, Depuis ce jour',
						example: 'Enfin, le village fut sauvé.',
						color: '#047857'
					}
				]
			}),
			visualCaptionAr: 'المؤشرات الزمنية والأزمنة التي تميّز كل مرحلة من مراحل البنية السردية',
			examples: [
				{
					problemAr: 'حدّد المرحلة السردية للجملة: « Soudain, un violent orage coupa le pont du village. »',
					solutionAr: 'المرحلة هي: العنصر المخلّ (L’élément perturbateur) لوجود « Soudain » والماضي البسيط « coupa ».'
				},
				{
					problemAr: 'حدّد المرحلة السردية للجملة: « Autrefois, à Tlemcen, habitait un tisserand généreux qui aidait ses voisins. »',
					solutionAr: 'المرحلة هي: الوضعية الابتدائية (La situation initiale) لوجود « Autrefois » والماضي الناقص « habitait / aidait ».'
				}
			],
			watchOutAr:
				'لا تخلط بين الوضعية الابتدائية (التي تصف حالة ثابتة بالماضي الناقص) وبين الحدث المفاجئ الذي يبدأ بـ « Un jour » أو « Soudain » ويأتي بالماضي البسيط.'
		},
		practice: [
			{
				questionAr: 'ما الترتيب الصحيح لمراحل البنية السردية (le schéma narratif)؟',
				options: [
					'Situation finale -> Péripéties -> Situation initiale',
					'Situation initiale -> Élément perturbateur -> Péripéties -> Situation finale',
					'Élément perturbateur -> Situation initiale -> Situation finale',
					'Péripéties -> Élément perturbateur -> Situation initiale'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الوضعية النهائية تأتي في آخر القصة لا في أولها.',
					'أحسنت! هذا هو الترتيب المنهجي الصحيح للبنية السردية.',
					'الوضعية الابتدائية تسبق الحدث المخلّ دائما.',
					'الأحداث المتسلسلة تأتي بعد الحدث المخلّ.'
				],
				explanationAr: 'تسلسل القصة: وضعية ابتدائية، ثم عنصر مخلّ، ثم أحداث متتابعة، ثم وضعية نهائية.'
			},
			{
				questionAr: 'أيّ مؤشر يعلن غالبا بداية العنصر المخلّ (l’élément perturbateur)؟',
				options: ['Autrefois,', 'Jadis,', 'Soudain,', 'Depuis ce jour,'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Autrefois عبارة افتتاحية للوضعية الابتدائية.',
					'Jadis عبارة افتتاحية للوضعية الابتدائية.',
					'ممتاز! « Soudain, » (فجأة) تعلن وقوع الحدث المفاجئ.',
					'Depuis ce jour تُستعمل في الوضعية النهائية.'
				],
				explanationAr: 'المؤشرات « Un jour, / Soudain, / Tout à coup, » تبدأ العنصر المخلّ.'
			},
			{
				questionAr: 'ما الزمن الغالب في كتابة الوضعية الابتدائية (la situation initiale)؟',
				options: ['Le futur simple', 'L’imparfait', 'L’impératif présent', 'Le conditionnel'],
				correctIndex: 1,
				diagnosticFeedback: [
					'المستقبل لا يُستعمل في افتتاح قصة ماضية.',
					'صحيح! الماضي الناقص (l’imparfait) يصف الإطار والشخصيات في البداية.',
					'الأمر يُستعمل في النص الإرشادي.',
					'الشرط ليس زمن الوضعية الابتدائية.'
				],
				explanationAr: 'تُصاغ الوضعية الابتدائية بالماضي الناقص (l’imparfait) للوصف وتمهيد الأحداث.'
			},
			{
				questionAr: 'أيّ جملة تمثّل وضعية نهائية (situation finale) لقصة حول التعاون؟',
				options: [
					'Il y a bien longtemps, deux frères cultivaient un verger.',
					'Un matin, une forte pluie endommagea le mur du jardin.',
					'Finalement, grâce à leur entraide, les villageois réparèrent le chemin et vécurent en paix.',
					'Soudain, le marchand remarqua la perte de sa sacoche.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'هذه وضعية ابتدائية.',
					'هذا عنصر مخلّ.',
					'أحسنت! تبدأ بـ « Finalement » وتبيّن عودة الهدوء وثمرة التعاون.',
					'هذا عنصر مخلّ يبدأ بـ « Soudain ».'
				],
				explanationAr: 'الوضعية النهائية تختم القصة بعودة الاستقرار وإظهار ثمرة الأخلاق الحميدة.'
			},
			{
				questionAr: 'ما الأسئلة الثلاثة التي تجيب عنها الوضعية الابتدائية؟',
				options: [
					'Quand ? Où ? Qui ?',
					'Combien ? Pourquoi ? Jamais ?',
					'Comment finir ? Quelle morale ?',
					'Quel ordre donner ?'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! الوضعية الابتدائية تحدّد الزمان (Quand) والمكان (Où) والشخصيات (Qui).',
					'هذه الأسئلة لا تلخّص عناصر الوضعية الابتدائية.',
					'النهاية والمغزى يظهران في ختام القصة.',
					'إعطاء الأوامر يخص النص الإرشادي.'
				],
				explanationAr: 'تقدّم الوضعية الابتدائية الإطار الزماني والمكاني والشخصيات: Quand ? Où ? Qui ?'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 2 : Les formules d'ouverture et les compléments circonstanciels (CCT, CCL, CCM)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_2am_t1_ouverture_cc',
		slug: 'fre-2am-t1-ouverture-cc',
		grade: '2am',
		yearSubjectId: 625,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع الأول: القصة الأخلاقية والتربوية الجزائرية — Projet 1 : Le récit moral et éducatif',
		order: 2,
		titleAr: 'العبارات الافتتاحية والمتمّمات الظرفية (Formules d’ouverture et CCT, CCL, CCM)',
		objectives: [
			'استعمال العبارات الافتتاحية الملائمة للقصة الأخلاقية (Autrefois, Jadis, Il y a bien longtemps, Il était une fois)',
			'التعرّف على المتمّمات الظرفية الثلاثة: الزمان (CCT)، المكان (CCL)، والحال/الطريقة (CCM)',
			'إغناء جمل القصة بمتمّمات ظرفية دقيقة مع ملاحظة إمكانية نقلها أو حذفها'
		],
		keywordsAr: ['Formules d’ouverture', 'CCT (temps)', 'CCL (lieu)', 'CCM (manière)', 'المتممات الظرفية'],
		discover: {
			scenarioAr:
				'تأمّل الجملة الافتتاحية التالية: « Autrefois, dans un petit village de Kabylie, un jeune menuisier travaillait avec courage. » يمكننا طرح ثلاثة أسئلة لنكتشف ثلاث معلومات ظرفية: متى؟ أين؟ وكيف؟',
			svg: svgFrenchGrammarMap({
				title: 'Les 3 compléments circonstanciels du récit',
				rootLabel: 'Enrichir une phrase narrative',
				rootSub: 'Déplaçables et supprimables',
				branches: [
					{
						label: 'CCT (Temps)',
						rule: 'Question : Quand ?',
						example: 'Autrefois, / Chaque matin,',
						color: '#1d4ed8'
					},
					{
						label: 'CCL (Lieu)',
						rule: 'Question : Où ?',
						example: 'dans un village de Kabylie',
						color: '#047857'
					},
					{
						label: 'CCM (Manière)',
						rule: 'Question : Comment ?',
						example: 'avec courage / patiemment',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'أيّ جزء في الجملة يجيب عن السؤال « Quand ? » (الزمان)؟',
					hintAr: 'انظر إلى أول كلمة افتتحت القصة.',
					expectedInput: 'Autrefois',
					revealAr: 'الكلمة « Autrefois » هي عبارة افتتاحية ومتمّم ظرفي للزمان (CCT).'
				},
				{
					promptAr: 'أيّ عبارة تجيب عن السؤال « Où ? » (المكان)؟',
					hintAr: 'تبدأ بحرف الجر « dans ».',
					expectedInput: 'dans un petit village de Kabylie',
					revealAr: '« dans un petit village de Kabylie » هي متمّم ظرفي للمكان (CCL).'
				},
				{
					promptAr: 'أيّ عبارة تجيب عن السؤال « Comment travaillait-il ? » (الطريقة/الحال)؟',
					hintAr: 'انظر إلى آخر الجملة بعد الفعل.',
					expectedInput: 'avec courage',
					revealAr: '« avec courage » هي متمّم ظرفي للطريقة أو الحال (CCM).'
				}
			]
		},
		summary: {
			rulesAr: [
				'العبارات الافتتاحية (Les formules d’ouverture) تضع القارئ في أجواء القصة منذ السطر الأول: Autrefois, / Jadis, / Il y a bien longtemps, / Il était une fois, / Un jour d’hiver,.',
				'المتمّم الظرفي للزمان (CCT) يجيب عن السؤال « Quand ? »: autrefois, chaque matin, au lever du soleil, pendant l’hiver.',
				'المتمّم الظرفي للمكان (CCL) يجيب عن السؤال « Où ? »: dans un village des Aurès, sur la place du marché, près de la source, à Tlemcen.',
				'المتمّم الظرفي للحال/الطريقة (CCM) يجيب عن السؤال « Comment ? »: avec honnêteté, sans hésiter, doucement, courageusement.',
				'المتمّم الظرفي يُمكن غالبا نقله في الجملة أو حذفه دون أن يختلّ التركيب النحوي للجملة.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Identifier CCT, CCL et CCM sans erreur',
				subtitle: 'Poser la bonne question après le verbe',
				columns: [
					{
						header: 'CCT (Quand ?)',
						rule: 'Temps / Durée',
						examples: 'Tôt le matin, dès l’aube',
						color: '#1d4ed8'
					},
					{
						header: 'CCL (Où ?)',
						rule: 'Endroit / Direction',
						examples: 'au marché, dans la montagne',
						color: '#047857'
					},
					{
						header: 'CCM (Comment ?)',
						rule: 'Manière / Façon',
						examples: 'avec soin, rapidement',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'الطريقة العملية لتمييز المتممات الظرفية الثلاثة في تمارين القواعد',
			examples: [
				{
					problemAr: 'حدّد نوع كل متمم ظرفي في: « Chaque matin (1), le boulanger préparait le pain avec soin (2) dans sa boulangerie (3). »',
					solutionAr: '(1) Chaque matin = CCT | (2) avec soin = CCM | (3) dans sa boulangerie = CCL.'
				},
				{
					problemAr: 'وسّع الجملة التالية بمتمّم مكان (CCL) ومتمّم طريقة (CCM): « Le jeune homme aida le vieillard. »',
					solutionAr: '« Sur le chemin du village (CCL), le jeune homme aida le vieillard avec respect (CCM). »'
				}
			],
			watchOutAr:
				'لا تخلط بين المكان والزمان عند استعمال حرف الجر « à » أو « pendant »! « à l’aube » زمان (CCT)، بينما « à Constantine » مكان (CCL).'
		},
		practice: [
			{
				questionAr: 'ما نوع المتمّم الظرفي المسطّر في: « Le berger traversa le pont ((avec prudence)). »؟',
				options: ['CCT (temps)', 'CCL (lieu)', 'CCM (manière)', 'Sujet'],
				correctIndex: 2,
				diagnosticFeedback: [
					'لا يجيب عن السؤال Quand.',
					'لا يجيب عن السؤال Où.',
					'أحسنت! يجيب عن السؤال Comment traversa-t-il le pont ? -> CCM.',
					'الفاعل هو Le berger.'
				],
				explanationAr: '« avec prudence » يبيّن الكيفية التي عبر بها الجسر، فهو CCM.'
			},
			{
				questionAr: 'استخرج المتمّم الظرفي للمكان (CCL) في الجملة: « Jadis, près de la source, les voisins partageaient l’eau équitablement. »',
				options: ['Jadis', 'près de la source', 'équitablement', 'les voisins'],
				correctIndex: 1,
				diagnosticFeedback: [
					'Jadis متمم زمان (CCT).',
					'ممتاز! « près de la source » يجيب عن السؤال Où ? -> CCL.',
					'équitablement متمم طريقة (CCM).',
					'les voisins فاعل الجملة.'
				],
				explanationAr: '« près de la source » يدل على المكان (CCL).'
			},
			{
				questionAr: 'أيّ عبارة تصلح كعبارة افتتاحية (formule d’ouverture) لوضعية ابتدائية؟',
				options: ['Il y a bien longtemps,', 'Finalement,', 'Pour conclure,', 'C’est pourquoi,'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! « Il y a bien longtemps, » عبارة افتتاحية أصيلة للقصص.',
					'Finalement تُستعمل في الوضعية النهائية.',
					'Pour conclure للخاتمة.',
					'C’est pourquoi رابط نتيجة.'
				],
				explanationAr: 'العبارة « Il y a bien longtemps, » تفتتح الوضعية الابتدائية في القصة.'
			},
			{
				questionAr: 'في الجملة: « Au lever du soleil, les paysans récoltaient les olives dans le verger. » ما وظيفة « Au lever du soleil »؟',
				options: ['CCL', 'CCM', 'CCT', 'Adjectif'],
				correctIndex: 2,
				diagnosticFeedback: [
					'لا يدل على مكان بل على وقت.',
					'لا يدل على كيفية.',
					'أحسنت! يجيب عن السؤال Quand ? فهو متمم زمان (CCT).',
					'هذه مجموعة ظرفية وليست صفة.'
				],
				explanationAr: '« Au lever du soleil » يحدّد زمان العمل، فهو CCT.'
			},
			{
				questionAr: 'أيّ جملة تجمع بين CCT و CCL و CCM معا؟',
				options: [
					'Le boulanger vendait du pain.',
					'Un matin d’hiver, dans les ruelles de Médéa, le boulanger distribuait du pain avec générosité.',
					'Le boulanger est gentil et honnête.',
					'Pourquoi aidait-il ses voisins ?'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'جملة بسيطة دون متممات ظرفية.',
					'ممتاز! Un matin d’hiver (CCT) + dans les ruelles de Médéa (CCL) + avec générosité (CCM).',
					'تحتوي على صفتين فقط.',
					'جملة استفهامية دون متممات ظرفية.'
				],
				explanationAr: 'تجمع هذه الجملة بنجاح المتممات الثلاثة: الزمان والمكان والطريقة.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 3 : L'imparfait de description vs le passé simple (3e personne)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_2am_t1_imparfait_passe_simple',
		slug: 'fre-2am-t1-imparfait-passe-simple',
		grade: '2am',
		yearSubjectId: 625,
		trimesterId: 't1',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع الأول: القصة الأخلاقية والتربوية الجزائرية — Projet 1 : Le récit moral et éducatif',
		order: 3,
		titleAr: 'الماضي الناقص للوصف والماضي البسيط للأحداث (L’imparfait vs le passé simple à la 3e personne)',
		objectives: [
			'التمييز الدقيق بين دور الماضي الناقص (الوصف، العادة، الخلفية) ودور الماضي البسيط (الأحداث المفاجئة والمتتابعة)',
			'تصريف أفعال المجموعات الثلاث في الماضي الناقص (-ais, -ais, -ait, -ions, -iez, -aient)',
			'تصريف الأفعال في الماضي البسيط مع ضمير الغائب (il/elle — ils/elles) في القصة'
		],
		keywordsAr: ['Imparfait', 'Passé simple', '3e personne', 'Description vs Action', 'أزمنة السرد'],
		discover: {
			scenarioAr:
				'اقرأ هاتين الجملتين من قصة: « Il faisait froid et la neige couvrait les montagnes. Soudain, un voyageur frappa à la porte et demanda de l’aide. Les villageois ouvrirent aussitôt leur maison et lui offrirent un repas chaud. » قارن بين زمن الوصف وزمن الأفعال السريعة.',
			svg: svgFrenchTenseTimeline({
				title: 'Les deux temps clés du récit moral (2AM)',
				tenseName: 'Imparfait vs Passé simple',
				formula: 'Imparfait (-ait / -aient) | Passé simple (-a/-èrent ; -it/-irent ; -ut/-urent)',
				activeZone: 'two_past',
				example: 'La neige tombait (décor). Soudain, le voyageur arriva (action).',
				markers: 'Décor / habitude (Imparfait) | Un jour, soudain (Passé simple)'
			}),
			steps: [
				{
					promptAr: 'لماذا صُرّف الفعلان « faisait » و « couvrait » في الماضي الناقص (l’imparfait)؟',
					hintAr: 'هل يرويان حدثا مفاجئا أم يصفان الجوّ والديكور؟',
					expectedInput: 'Pour décrire le décor',
					revealAr: 'لأنهما يصفان الطقس والمكان في خلفية القصة (imparfait de description).'
				},
				{
					promptAr: 'في أيّ زمن صُرّفت الأفعال « frappa, demanda, ouvrirent, offrirent »؟ ولماذا؟',
					hintAr: 'جاءت بعد « Soudain » لتنقل أحداثا سريعة متتابعة.',
					expectedInput: 'Au passé simple',
					revealAr: 'صُرّفت في الماضي البسيط (le passé simple) لأنها أحداث رئيسة مفاجئة ومتسلسلة تدفع القصة للأمام.'
				},
				{
					promptAr: 'ما نهايتا أفعال المجموعة الأولى (-er) في الماضي البسيط مع (il/elle) و (ils/elles)؟',
					hintAr: 'قارن بين « il frappa » و « ils frappèrent ».',
					expectedInput: '-a et -èrent',
					revealAr: 'أفعال المجموعة الأولى تأخذ « -a » في المفرد الغائب و « -èrent » في الجمع الغائب (il aida / ils aidèrent).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الماضي الناقص (L’imparfait): يُبنى من جذر المضارع مع « nous » + النهايات (-ais, -ais, -ait, -ions, -iez, -aient). الاستثناء الوحيد: être (était / étaient). مثال: finir (nous finiss-ons) -> il finissait, ils finissaient.',
				'قيمة الماضي الناقص في القصة: وصف الأشخاص والأماكن والطقس (description)، أو ذكر عادة متكررة في الماضي (habitude).',
				'الماضي البسيط (Le passé simple) مع ضمير الغائب (3e personne): يعبّر عن حدث مفاجئ أو سلسلة أحداث منتهية ومتلاحقة.',
				'نهايات الماضي البسيط للغائب (il/elle — ils/elles): المجموعة الأولى (-er): -a / -èrent (il marcha / ils marchèrent)؛ المجموعة الثانية (-ir) وكثير من الثالثة: -it / -irent (il choisit / ils choisirent ; il prit / ils prirent ; il vit / ils virent)؛ بعض أفعال الثالثة: -ut / -urent (il fut / ils furent ; il eut / ils eurent ; il put / ils purent ; il voulut / ils voulurent).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Passé simple à la 3e personne (il / ils)',
				subtitle: 'Les 3 grandes séries de terminaisons en 2AM',
				columns: [
					{
						header: '1er groupe (-er)',
						rule: '-a  /  -èrent',
						examples: 'il aida / ils aidèrent',
						color: '#1d4ed8'
					},
					{
						header: '2e gr. & 3e gr. (-i)',
						rule: '-it  /  -irent',
						examples: 'il finit / ils prirent',
						color: '#047857'
					},
					{
						header: '3e gr. (-u) & être/avoir',
						rule: '-ut  /  -urent',
						examples: 'il fut / ils eurent / il voulut',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'نهايات الماضي البسيط للغائب المفرد والجمع في قصص الثانية متوسط',
			examples: [
				{
					problemAr: 'ضع الفعل في الزمن المناسب (imparfait أو passé simple): « Le soleil (briller) ...... sur le village quand un messager (arriver) ...... . »',
					solutionAr: '« Le soleil brillait (وصف -> imparfait) sur le village quand un messager arriva (حدث مفاجئ -> passé simple). »'
				},
				{
					problemAr: 'صرّف في الماضي البسيط (3e pers. pl.): « Les villageois (choisir) ...... de s’entraider et (être) ...... fiers du résultat. »',
					solutionAr: '« Les villageois choisirent de s’entraider et furent fiers du résultat. »'
				}
			],
			watchOutAr:
				'انتبه إلى تصريف « être » و « avoir » في الماضي البسيط: « il fut / ils furent » و « il eut / ils eurent »، ولا تنسَ الحركة المائلة (accent grave) في « ils parlèrent, ils aidèrent »!'
		},
		practice: [
			{
				questionAr: 'اختر التصريف الصحيح في الجملة: « Chaque matin, le berger ...... son troupeau dans la vallée. » (mener)',
				options: ['mena', 'menait', 'menèrent', 'mènera'],
				correctIndex: 1,
				diagnosticFeedback: [
					'« Chaque matin » يدل على عادة متكررة (imparfait)، لا حدث مفرد.',
					'أحسنت! العادة المتكررة في الماضي تُصرّف في الماضي الناقص: menait.',
					'الفاعل مفرد والحدث عادة متكررة.',
					'mènera في المستقبل البسيط.'
				],
				explanationAr: 'العبارة « Chaque matin » تدل على عادة في الماضي فتستدعي الماضي الناقص: menait.'
			},
			{
				questionAr: 'صرّف الفعلين في الزمن المناسب: « Les enfants (jouer) ...... dans la cour quand la cloche (sonner) ...... . »',
				options: [
					'jouèrent / sonnait',
					'jouaient / sonna',
					'jouaient / sonnait',
					'jouèrent / sonna'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'اللعب كان مستمرا (imparfait) ورنين الجرس قطع الحدث فجأة (passé simple).',
					'ممتاز! jouaient (حالة مستمرة) ثم sonna (حدث مفاجئ قاطع).',
					'رنين الجرس حدث فجائي سريع يُصرّف في الماضي البسيط.',
					'اللعب كان في الخلفية المستمرة فيُصرّف في الماضي الناقص.'
				],
				explanationAr: 'الحدث المستمر في الخلفية يُصرّف في الماضي الناقص (jouaient)، والحدث القاطع في الماضي البسيط (sonna).'
			},
			{
				questionAr: 'ما تصريف الفعل (prendre) في الماضي البسيط مع (ils)؟',
				options: ['prenèrent', 'prirent', 'prenaient', 'prurent'],
				correctIndex: 1,
				diagnosticFeedback: [
					'prendre من المجموعة الثالثة ولا يأخذ -èrent.',
					'صحيح! il prit / ils prirent.',
					'prenaient في الماضي الناقص.',
					'prurent صيغة غير صحيحة.'
				],
				explanationAr: 'الماضي البسيط من « prendre »: il prit / ils prirent.'
			},
			{
				questionAr: 'ما تصريف الفعل (être) في الماضي البسيط في: « Ce jour-là, les habitants ...... très heureux de son honnêteté. »؟',
				options: ['étaient', 'furent', 'eurent', 'sont'],
				correctIndex: 1,
				diagnosticFeedback: [
					'étaient في الماضي الناقص والمطلوب الماضي البسيط.',
					'أحسنت! être في الماضي البسيط مع ils هو: furent.',
					'eurent هو تصريف الفعل avoir.',
					'sont في المضارع.'
				],
				explanationAr: 'تصريف « être » في الماضي البسيط للغائب: il fut / ils furent.'
			},
			{
				questionAr: 'اختر الكتابة الصحيحة للفعل (aider) في الماضي البسيط مع (Les voisins):',
				options: ['aidèrent', 'aiderent', 'aidaient', 'aidirent'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! المجموعة الأولى في الجمع الغائب تنتهي بـ -èrent مع الحركة `è`.',
					'ينقصها الحركة (accent grave) على الحرف è.',
					'aidaient في الماضي الناقص.',
					'aidirent غير صحيحة لأن aider من المجموعة الأولى.'
				],
				explanationAr: 'أفعال المجموعة الأولى في الماضي البسيط مع ils تأخذ « -èrent »: aidèrent.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 4 : Les adjectifs qualificatifs et les substituts dans le récit
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_2am_t1_adjectifs_substituts',
		slug: 'fre-2am-t1-adjectifs-substituts',
		grade: '2am',
		yearSubjectId: 625,
		trimesterId: 't1',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المشروع الأول: القصة الأخلاقية والتربوية الجزائرية — Projet 1 : Le récit moral et éducatif',
		order: 4,
		titleAr: 'الصفات النعتية والبدائل في السرد (Les adjectifs qualificatifs et les substituts dans le récit)',
		objectives: [
			'توظيف الصفات النعتية (les adjectifs qualificatifs) لرسم الملامح الجسدية والأخلاقية للشخصيات (portrait physique et moral)',
			'إتقان مطابقة الصفة النعتية للاسم في التذكير والتأنيث والإفراد والجمع',
			'استعمال البدائل المعجمية والنحوية لمتابعة الشخصية طوال القصة دون تكرار'
		],
		keywordsAr: ['Adjectif qualificatif', 'Portrait moral', 'Accord', 'Substituts narratifs', 'وصف الشخصيات'],
		discover: {
			scenarioAr:
				'اقرأ هذا الوصف من قصة جزائرية: « Karim était un garçon courageux et honnête. Ce jeune berger portait une djellaba blanche. Ses voisins l’appréciaient beaucoup car il aidait toujours les personnes âgées. » لاحظ الصفات التي رسمت شخصية كريم والبدائل التي عوّضت اسمه.',
			svg: svgFrenchGrammarMap({
				title: 'Décrire un héros sans répétition',
				rootLabel: 'Personnage : Karim',
				rootSub: 'Adjectifs (portrait) + Substituts (cohérence)',
				branches: [
					{
						label: 'Portrait moral',
						rule: 'Qualités de caractère',
						example: 'courageux, honnête, généreux',
						color: '#1d4ed8'
					},
					{
						label: 'Accord de l’adjectif',
						rule: '-eux -> -euse / -if -> -ive',
						example: 'généreux -> généreuse / actif -> active',
						color: '#047857'
					},
					{
						label: 'Substituts du héros',
						rule: 'Lexicaux & Grammaticaux',
						example: 'Ce jeune berger / il / l’ / ses',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الصفتان اللتان وصفتا أخلاق كريم (son portrait moral)؟',
					hintAr: 'انظر إلى الجملة الأولى بعد كلمة « garçon ».',
					expectedInput: 'courageux et honnête',
					revealAr: 'الصفتان هما « courageux » (شجاع) و « honnête » (أمين/صادق)، وتصفان صفاته الأخلاقية.'
				},
				{
					promptAr: 'كيف يصبح مؤنث الصفة « courageux » لو تحدّثنا عن فتاة (une fille)؟',
					hintAr: 'الصفات المنتهية بـ -eux تتحوّل في المؤنث إلى -euse.',
					expectedInput: 'courageuse',
					revealAr: 'تصبح « courageuse »: une fille courageuse et honnête.'
				},
				{
					promptAr: 'ما البديل المعجمي والبدائل النحوية التي عوّضت « Karim » في النص؟',
					hintAr: 'اقرأ الجملتين الثانية والثالثة.',
					expectedInput: 'Ce jeune berger, l’, il, ses',
					revealAr: 'البديل المعجمي: « Ce jeune berger »، والبدائل النحوية: « Ses », « l’ », « il ».'
				}
			]
		},
		summary: {
			rulesAr: [
				'الصفة النعتية (L’adjectif qualificatif) تطابق الاسم الموصوف في الجنس والعدد، وتُستعمل في القصة لوصف المظهر والأخلاق والأماكن.',
				'أهم قواعد تأنيث الصفات: إضافة (-e): grand -> grande؛ (-eux -> -euse): généreux -> généreuse, courageux -> courageuse؛ (-if -> -ive): actif -> active, attentif -> attentive؛ (-er -> -ère): fier -> fière, sincère (تبقى كما هي لانتهائها بـ e)؛ حالات خاصة: beau -> belle, vieux -> vieille, blanc -> blanche, doux -> douce.',
				'في الجمع نضيف غالبا (-s)، والصفات المنتهية بـ (-s / -x) لا تتغير في جمع المذكر (un garçon généreux -> des garçons généreux)، بينما (-al -> -aux): loyal -> loyaux.',
				'في القصة نربط الجمل ببدائل متنوعة للشخصية: بدائل معجمية (le jeune berger, cet artisan honnête, le sage vieillard) وبدائل نحوية (il, elle, lui, le, la, son, sa, ses).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Féminin et pluriel des adjectifs courants',
				subtitle: 'Bien accorder l’adjectif avec le nom qualifié',
				columns: [
					{
						header: '-eux -> -euse',
						rule: 'Féminin en -euse',
						examples: 'courageux -> courageuse',
						color: '#1d4ed8'
					},
					{
						header: '-if -> -ive',
						rule: 'Féminin en -ive',
						examples: 'attentif -> attentive',
						color: '#047857'
					},
					{
						header: 'Irréguliers utiles',
						rule: 'À connaître par cœur',
						examples: 'blanc/blanche, beau/belle, doux/douce',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'قواعد تأنيث وجمع أشهر الصفات المستعملة في وصف الشخصيات والأماكن',
			examples: [
				{
					problemAr: 'حوّل إلى المؤنث الجمع: « un voisin généreux, actif et doux ».',
					solutionAr: '« des voisines généreuses, actives et douces ».'
				},
				{
					problemAr: 'اقترح بديلين (معجميا ونحويا) لتعويض « Le vieil artisan » في جملتين لاحقتين.',
					solutionAr: 'بديل معجمي: « Cet homme sage » / بديل نحوي: « Il » أو « lui ».'
				}
			],
			watchOutAr:
				'الصفة المنتهية بـ (-x) مثل « courageux » لا تأخذ « s » في جمع المذكر (des garçons courageux)، لكنها في جمع المؤنث تصبح « courageuses » (des filles courageuses)!'
		},
		practice: [
			{
				questionAr: 'ما المؤنث الصحيح للعبارة: « un élève sérieux et actif »؟',
				options: [
					'une élève sérieuse et actif',
					'une élève sérieuse et active',
					'une élève sérieux et active',
					'une élève sérieue et actife'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الصفة actif تتحوّل في المؤنث إلى active.',
					'أحسنت! sérieux -> sérieuse و actif -> active.',
					'sérieux يجب أن تؤنّث إلى sérieuse.',
					'إملاء خاطئ للمؤنث.'
				],
				explanationAr: 'في المؤنث: « -eux » تصبح « -euse » و « -if » تصبح « -ive ».'
			},
			{
				questionAr: 'أكمل بالصفة المطابقة: « Le village possédait des maisons ...... et des ruelles ...... . » (blanc / ancien)',
				options: [
					'blancs / anciens',
					'blanches / anciennes',
					'blanche / ancienne',
					'blanchs / anciens'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'maisons و ruelles اسمان مؤنثان جمع.',
					'ممتاز! blanc -> blanches و ancien -> anciennes (مؤنث جمع).',
					'الاسمان في الجمع فيجب إضافة s.',
					'صيغة blanchs غير صحيحة.'
				],
				explanationAr: 'المؤنث الجمع من « blanc » هو « blanches »، ومن « ancien » هو « anciennes ».'
			},
			{
				questionAr: 'ما جمع المذكر الصحيح لـ « un homme loyal et généreux »؟',
				options: [
					'des hommes loyals et généreuxs',
					'des hommes loyaux et généreux',
					'des hommes loyaux et généreuses',
					'des hommes loyal et généreux'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'loyal يُجمع على loyaux و généreux لا يأخذ s.',
					'صحيح! loyal -> loyaux و généreux يبقى كما هو في جمع المذكر.',
					'généreuses للمؤنث الجمع.',
					'يجب جمع الصفة loyal.'
				],
				explanationAr: '« loyal » يُجمع على « loyaux » و « généreux » المنتهي بـ x لا يتغير في جمع المذكر.'
			},
			{
				questionAr: 'على من يعود الضمير « lui » في: « Le boulanger vit un pauvre passant. Il lui offrit un pain chaud. »؟',
				options: ['Le boulanger', 'un pauvre passant', 'un pain chaud', 'le marché'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الخباز هو الفاعل (Il).',
					'أحسنت! قدّم له (à ce pauvre passant) رغيفا ساخنا.',
					'الرغيف هو الشيء المُقدّم (COD).',
					'السوق غير مذكور في الجملة.'
				],
				explanationAr: 'الضمير « lui » يعوّض المفعول غير المباشر « à ce pauvre passant ».'
			},
			{
				questionAr: 'أيّ صفة تنتمي إلى الوصف الأخلاقي (portrait moral)؟',
				options: ['grand', 'mince', 'honnête', 'blanche'],
				correctIndex: 2,
				diagnosticFeedback: [
					'grand صفة جسدية (القامة).',
					'mince صفة جسدية.',
					'ممتاز! « honnête » (أمين/صادق) صفة أخلاقية.',
					'blanche صفة لون.'
				],
				explanationAr: '« honnête » تصف خُلق الشخصية وسلوكها (portrait moral).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Leçon 5 : Rédiger la situation initiale et la suite d'une histoire morale algérienne
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'fre_lesson_2am_t1_rediger_recit_moral',
		slug: 'fre-2am-t1-rediger-recit-moral',
		grade: '2am',
		yearSubjectId: 625,
		trimesterId: 't1',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع الأول: القصة الأخلاقية والتربوية الجزائرية — Projet 1 : Le récit moral et éducatif',
		order: 5,
		titleAr: 'كتابة الوضعية الابتدائية وتتمّة قصة أخلاقية جزائرية (Rédiger un récit moral)',
		objectives: [
			'صياغة وضعية ابتدائية متكاملة تضمّ عبارة افتتاحية، زمانا، مكانا جزائريا، ووصفا أخلاقيا للشخصية بالماضي الناقص',
			'كتابة عنصر مخلّ وأحداث متسلسلة ونهاية سعيدة هادفة بالماضي البسيط مع احترام البدائل',
			'تضمين القصة قيمة تربوية أصيلة (الأمانة، التويزة، برّ الوالدين، الشجاعة) بلغة فرنسية سليمة'
		],
		keywordsAr: ['Production écrite', 'Récit moral', 'Situation initiale', 'Suite du récit', 'القصة الأخلاقية'],
		discover: {
			scenarioAr:
				'في حصة التعبير الكتابي، طُلب من تلاميذ الثانية متوسط كتابة بداية وتتمّة قصة عن الصدق أو التعاون في قرية جزائرية. اتّبعت مريم مخططا من أربع مراحل واضحة، فجاءت قصتها مترابطة وخالية من التكرار.',
			svg: svgFrenchWritingBlueprint({
				title: 'Écrire un récit moral algérien réussi (2AM)',
				steps: [
					{ stage: 'Situation initiale', detail: 'Formule d’ouverture + CCT + CCL + portrait à l’imparfait', color: '#1d4ed8' },
					{ stage: 'Élément perturb.', detail: 'Un jour / Soudain + fait inattendu au passé simple', color: '#b45309' },
					{ stage: 'Péripéties', detail: '2 ou 3 actions nobles (passé simple + CCM + substituts)', color: '#047857' },
					{ stage: 'Fin & Morale', detail: 'Enfin / Depuis ce jour + récompense et valeur morale', color: '#7c3aed' }
				]
			}),
			steps: [
				{
					promptAr: 'ما العناصر الأربعة التي يجب أن تجتمع في الوضعية الابتدائية الجيدة؟',
					hintAr: 'انظر إلى المرحلة الأولى في المخطط.',
					expectedInput: 'Formule d’ouverture, temps, lieu, personnage à l’imparfait',
					revealAr: 'عبارة افتتاحية + زمان ومكان (CCT/CCL) + تعريف ووصف الشخصية بالماضي الناقص.'
				},
				{
					promptAr: 'كيف ننتقل من الوضعية الابتدائية إلى الأحداث (la suite du récit)؟',
					hintAr: 'ما الكلمة المفتاحية والزمن الجديد؟',
					expectedInput: 'Un jour / Soudain + passé simple',
					revealAr: 'نستعمل « Un jour, » أو « Soudain, » وننتقل من الماضي الناقص إلى الماضي البسيط (le passé simple).'
				},
				{
					promptAr: 'ما الذي يجعل نهاية القصة الأخلاقية مؤثرة وناجحة؟',
					hintAr: 'فكّر في عودة الهدوء والعبرة التربوية.',
					expectedInput: 'Retour au calme et morale',
					revealAr: 'عودة الهدوء وتقدير الناس للبطل، مع جملة ختامية تُبرز قيمة الأمانة أو التعاون.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الوضعية الابتدائية (3 إلى 4 أسطر): تبدأ بعبارة افتتاحية (Autrefois / Jadis / Il y a bien longtemps)، تحدّد مكانا جزائريا (un village des Aurès, une ruelle de Tlemcen, une oasis du Sud)، وتصف الشخصية بصفات أخلاقية في الماضي الناقص.',
				'تتمّة القصة (5 إلى 6 أسطر): تبدأ بحدث مفاجئ (Un jour, / Un matin, / Soudain,) في الماضي البسيط، ثم 2 إلى 3 أفعال نبيلة تبرز شجاعة البطل أو أمانته مع استعمال متمم طريقة (avec courage, honnêtement) وبدائل لتفادي التكرار.',
				'الوضعية النهائية (سطران): تبدأ بـ (Enfin, / Finalement, / Depuis ce jour,) وتُظهر المكافأة المعنوية واحترام المجتمع للبطل.',
				'تذكّر مراجعة: مطابقة الصفات (courageuse / généreux)، والتمييز بين الماضي الناقص (-ait / -aient) والماضي البسيط (-a / -èrent / -it / -irent).'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Thèmes nobles pour le récit moral (2AM T1)',
				rootLabel: 'Valeurs éducatives algériennes',
				rootSub: 'Histoires réalistes, saines et inspirantes',
				branches: [
					{
						label: 'L’honnêteté',
						rule: 'objet trouvé, bourse rendue',
						example: 'honnête, sincère, digne de confiance',
						color: '#1d4ed8'
					},
					{
						label: 'L’entraide (Twiza)',
						rule: 'récolte, neige, voisins unis',
						example: 'solidaire, généreux, unis',
						color: '#047857'
					},
					{
						label: 'Le courage',
						rule: 'secourir, persévérer, travail',
						example: 'courageux, patient, déterminé',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'موضوعات ورصيد أخلاقي جاهز لكتابة قصة تربوية جزائرية في الثانية متوسط',
			examples: [
				{
					problemAr: 'اكتب وضعية ابتدائية من جملتين حول نجّار أمين في قسنطينة.',
					solutionAr: '« Jadis, dans un vieux quartier de Constantine, vivait un jeune menuisier nommé Tariq. Cet artisan travailleur et honnête fabriquait de beaux meubles en bois avec beaucoup de soin. »'
				},
				{
					problemAr: 'اكتب جملة العنصر المخلّ لهذه القصة.',
					solutionAr: '« Un matin, en réparant une ancienne armoire, il découvrit une petite boîte pleine de pièces d’or oubliée par le client. »'
				}
			],
			watchOutAr:
				'لا تستعمل المضارع ولا الماضي المركب وسط قصة تسردها بالماضي الناقص والماضي البسيط! حافظ على انسجام أزمنة السرد من البداية إلى النهاية.'
		},
		practice: [
			{
				questionAr: 'أيّ جملة تصلح كوضعية ابتدائية متكاملة لقصة أخلاقية؟',
				options: [
					'Soudain, il rendit la bourse au marchand.',
					'Autrefois, dans un paisible village des Aurès, vivait un jeune berger honnête et courageux.',
					'Enfin, tous les voisins applaudirent son geste.',
					'L’eau potable est indispensable à la vie.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه جملة عنصر مخلّ أو حدث في الماضي البسيط.',
					'أحسنت! تجمع العبارة الافتتاحية والمكان والشخصية والوصف في الماضي الناقص.',
					'هذه وضعية نهائية.',
					'هذه جملة من نص تفسيري.'
				],
				explanationAr: 'تحتوي على « Autrefois » (عبارة افتتاحية)، المكان، الشخصية، الصفتين، والماضي الناقص « vivait ».'
			},
			{
				questionAr: 'ما الزمن الأنسب لسرد أحداث تتمّة القصة بعد « Un jour, »؟',
				options: ['Le présent de vérité générale', 'Le passé simple', 'L’impératif présent', 'Le futur simple'],
				correctIndex: 1,
				diagnosticFeedback: [
					'مضارع الحقيقة العامة للنص التفسيري.',
					'ممتاز! الماضي البسيط يروي الأحداث الرئيسة المتتابعة بعد « Un jour, ».',
					'الأمر للنص الإرشادي.',
					'المستقبل لا يناسب سرد أحداث ماضية.'
				],
				explanationAr: 'بعد الحدث المخلّ نروي الأفعال المتتالية في الماضي البسيط (le passé simple).'
			},
			{
				questionAr: 'أيّ جملة خالية من الأخطاء في السرد بالماضي البسيط؟',
				options: [
					'Un jour, le jeune berger trouva une sacoche et la rendit aussitôt à son propriétaire.',
					'Un jour, le jeune berger trouvait une sacoche et la rendra à son propriétaire.',
					'Un jour, les voisins aidait le vieillard.',
					'Un jour, il fut rendit la bourse.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! trouva و rendit مصرفان بدقة في الماضي البسيط.',
					'خلط غير مبرر بين الماضي الناقص والمستقبل.',
					'الفاعل جمع (les voisins) والفعل بالمفرد.',
					'لا يجوز جمع fut مع rendit.'
				],
				explanationAr: 'الفعلان « trouva » و « rendit » متناسقان في الماضي البسيط (3e pers. sing.).'
			},
			{
				questionAr: 'أيّ عبارة تضيف متمّم طريقة (CCM) معبّرا لبطل القصة؟',
				options: ['avec honnêteté', 'autrefois', 'dans la vallée', 'un matin'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! « avec honnêteté » يجيب عن السؤال Comment ? فهو CCM.',
					'autrefois متمم زمان (CCT).',
					'dans la vallée متمم مكان (CCL).',
					'un matin متمم زمان (CCT).'
				],
				explanationAr: '« avec honnêteté » يبيّن طريقة تصرف البطل (CCM).'
			},
			{
				questionAr: 'ما الجملة الختامية الأفضل لقصة حول « التويزة » (التضامن)؟',
				options: [
					'Depuis ce jour, les villageois comprirent que l’union et l’entraide rendent chaque tâche plus facile.',
					'Il y a longtemps, la neige couvrait la colline.',
					'Soudain, le toit du voisin s’effondra.',
					'Comment s’appelle ce village ?'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! تبدأ بـ « Depuis ce jour » وتختم القصة بعبرة أخلاقية واضحة.',
					'هذه بداية قصة.',
					'هذا عنصر مخلّ.',
					'سؤال غير مناسب لخاتمة السرد.'
				],
				explanationAr: 'الخاتمة الناجحة تربط النهاية بالعبرة الأخلاقية (l’union et l’entraide).'
			}
		]
	}
];
