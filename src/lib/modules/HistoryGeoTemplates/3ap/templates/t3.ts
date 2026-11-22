import type {
	Difficulty,
	HistoryGeneratedExerciseInstance,
	HistoryParameterizedTemplate
} from '../../types';
import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import { buildIllustratedFigureBlock } from '../../../VisualAssets/illustrations-registry';
import { buildHistoryTableBlock } from '../../history-helpers';

// ═══════════════════════════════════════════════════════════════════════════════
// قوالب التمارين — السنة الثالثة ابتدائي — التاريخ والجغرافيا — الفصل الثالث
// ═══════════════════════════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────────────────────────
// 1. التاريخ (5 نقاط): ترتيب العصور التاريخية الأربعة
// ───────────────────────────────────────────────────────────────────────────────
const tplHistErasTimeline: HistoryParameterizedTemplate = {
	id: 'his_tpl_3ap_t3_hist_eras_timeline',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'hist_ancient',
	titleAr: 'التاريخ: العصور التاريخية الأربعة على الخط الزمني',
	curriculumLessonId: 'his_lesson_3ap_t3_historical_eras',
	defaultPoints: 5,
	onecRole: 'pri_history',
	generate(seed: number, difficulty: Difficulty = 'medium'): HistoryGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const orderedEras = [
			'العصر القديم (3200 ق.م – 476م)',
			'العصر الوسيط (476م – 1453م)',
			'العصر الحديث (1453م – 1789م)',
			'العصر المعاصر (1789م – اليوم)'
		];

		const variants = [
			{
				label: 'مراحل العصور التاريخية وتواريخها',
				tableRows: [
					[{ label: 'العصر القديم' }, { answer: 'من اختراع الكتابة (3200 ق.م) إلى سقوط روما (476م)', mark: '0.75' }],
					[{ label: 'العصر الوسيط' }, { answer: 'من سقوط روما (476م) إلى فتح القسطنطينية (1453م)', mark: '0.75' }],
					[{ label: 'العصر الحديث' }, { answer: 'من فتح القسطنطينية (1453م) إلى الثورة الفرنسية (1789م)', mark: '0.75' }],
					[{ label: 'العصر المعاصر' }, { answer: 'من الثورة الفرنسية (1789م) إلى يومنا هذا', mark: '0.75' }]
				],
				q2: '2) في أي عصر تاريخي نعيش اليوم، وما أبرز معلم حضاري فيه؟',
				a2: '2) نعيش في العصر المعاصر، ومن أبرز معالمه التطور التكنولوجي واستقلال الشعوب مثل استقلال الجزائر.'
			},
			{
				label: 'الفواصل التاريخية الكبرى بين العصور',
				tableRows: [
					[{ label: 'اختراع الكتابة (3200 ق.م)' }, { answer: 'بداية العصر القديم', mark: '0.75' }],
					[{ label: 'سقوط روما (476م)' }, { answer: 'نهاية القديم وبداية العصر الوسيط', mark: '0.75' }],
					[{ label: 'فتح القسطنطينية (1453م)' }, { answer: 'نهاية الوسيط وبداية العصر الحديث', mark: '0.75' }],
					[{ label: 'الثورة الفرنسية (1789م)' }, { answer: 'نهاية الحديث وبداية العصر المعاصر', mark: '0.75' }]
				],
				q2: '2) ما المقصود بمرحلة ما قبل التاريخ مقارنة بالعصور التاريخية؟',
				a2: '2) مرحلة ما قبل التاريخ هي الفترة التي سبقت اختراع الكتابة، أما العصور التاريخية فبدأت باختراع الكتابة.',
			},
			{
				label: 'خصائص العصور الأربعة عبر الزمن',
				tableRows: [
					[{ label: 'أطول العصور الأربعة وميلاد الكتابة' }, { answer: 'العصر القديم', mark: '0.75' }],
					[{ label: 'عصر بزوغ الإسلام وازدهار حضارته' }, { answer: 'العصر الوسيط', mark: '0.75' }],
					[{ label: 'عصر النهضة والأسطول الجزائري العثماني' }, { answer: 'العصر الحديث', mark: '0.75' }],
					[{ label: 'عصر الثورة التحريرية والتكنولوجيا' }, { answer: 'العصر المعاصر', mark: '0.75' }]
				],
				q2: '2) رتّب أسماء العصور التاريخية الأربعة من الأقدم إلى الأحدث.',
				a2: '2) العصر القديم، ثم العصر الوسيط، ثم العصر الحديث، ثم العصر المعاصر.'
			}
		];

		const v = rng.pick(variants);
		const indexed = orderedEras.map((label, rank) => ({ label, rank }));
		const shuffled = rng.shuffle(indexed);
		if (shuffled.every((e, i) => e.rank === i)) {
			[shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
		}
		const items = shuffled.map((e) => e.label);
		const correctOrder = orderedEras.map((_, rank) => shuffled.findIndex((e) => e.rank === rank));

		const sujetExercise: ExerciseBlock = {
			customTitle: 'مادة التاريخ',
			points: 5,
			instruction: 'لاحظ لوحة العصور التاريخية ثم أجب عن الأسئلة الآتية:',
			content: [
				buildIllustratedFigureBlock('hg_01_timeline_historical_sources', {
					title: 'العصور التاريخية الأربعة على الخط الزمني',
					maxHeight: 112,
					width: '62%',
					mode: 'labeled',
					pins: []
				}),
				{ type: 'text', content: '1) أكمل الجدول الآتي بما يناسب من العصور التاريخية الأربعة أو فواصلها:' },
				buildHistoryTableBlock(['العصر أو الحدث الفاصل', 'الفترة / الدلالة التاريخية'], v.tableRows),
				{ type: 'text', content: v.q2, answer: v.a2, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't3',
			difficulty,
			domain: 'hist_ancient',
			titleAr: `${this.titleAr} — ${v.label}`,
			onecRole: 'pri_history',
			quizQuestion: {
				type: 'ordering',
				questionText: 'رتّب العصور التاريخية الأربعة من الأقدم إلى الأحدث:',
				questionTextAr: 'رتّب العصور التاريخية الأربعة زمنيا:',
				imageUrl: '/documents/illustrations/history_geo/hg_01_timeline_historical_sources.webp',
				imageCaption: 'الخط الزمني للعصور التاريخية',
				questionData: {
					items,
					correctOrder
				},
				explanation: `الترتيب الصحيح من الأقدم إلى الأحدث: ${orderedEras.join(' ← ')}.`
			},
			sujetExercise,
			hints: [
				'العصر القديم يبدأ باختراع الكتابة سنة 3200 ق.م.',
				'العصر الوسيط يمتد من 476م إلى فتح القسطنطينية 1453م.',
				'نعيش حاليا في العصر المعاصر الذي بدأ سنة 1789م.'
			],
			solutionStepsAr: [...v.tableRows.map((r) => `${r[0].label}: ${r[1].answer}`), v.a2],
			finalAnswer: orderedEras.join(' ← ')
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 2. التاريخ (5 نقاط): معالم العصور التاريخية الأربعة
// ───────────────────────────────────────────────────────────────────────────────
const tplHistErasLandmarks: HistoryParameterizedTemplate = {
	id: 'his_tpl_3ap_t3_hist_eras_landmarks',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'hist_ancient',
	titleAr: 'التاريخ: معالم ومنجزات العصور التاريخية',
	curriculumLessonId: 'his_lesson_3ap_t3_historical_eras',
	defaultPoints: 5,
	onecRole: 'pri_history',
	generate(seed: number, difficulty: Difficulty = 'medium'): HistoryGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				label: 'شخصيات ومعالم من تاريخ الجزائر والعالم',
				tfItems: [
					{
						q: 'ظهرت مملكة نوميديا في الجزائر وبُنيت مدينة تيمقاد خلال العصر القديم.',
						a: 'صحيح',
						c: 'العبارة صحيحة.',
						mark: '1'
					},
					{
						q: 'ازدهرت الحضارة الإسلامية في العلوم والعمارة خلال العصر الوسيط.',
						a: 'صحيح',
						c: 'العبارة صحيحة.',
						mark: '1'
					},
					{
						q: 'بدأ العصر المعاصر باختراع الكتابة المسمارية والهيروغليفية.',
						a: 'خطأ',
						c: 'اختراع الكتابة بدأ به العصر القديم، أما العصر المعاصر فبدأ سنة 1789م.',
						mark: '1'
					}
				],
				q2: '2) انسب كل حدث إلى عصره التاريخي (القديم / الوسيط / الحديث / المعاصر): أ) اندلاع الثورة التحريرية 1954. ب) بناء قلعة بني حماد وتيهرت.',
				a2: '2) أ) اندلاع الثورة التحريرية: العصر المعاصر. ب) بناء قلعة بني حماد وتيهرت: العصر الوسيط.',
				quizQ: 'إلى أي عصر تاريخي ينتمي ظهور الإسلام وازدهار الحضارة الإسلامية في بلاد المغرب والأندلس؟',
				correctOpt: 'العصر الوسيط',
				distractors: [
					{ text: 'العصر القديم', diagnosticFeedback: 'العصر القديم سبق ظهور الإسلام وانتهى بسقوط روما 476م.' },
					{ text: 'العصر الحديث', diagnosticFeedback: 'العصر الحديث بدأ بعد فتح القسطنطينية 1453م.' },
					{ text: 'مرحلة ما قبل التاريخ', diagnosticFeedback: 'مرحلة ما قبل التاريخ سبقت اختراع الكتابة.' }
				]
			},
			{
				label: 'المقارنة بين العصرين الحديث والمعاصر',
				tfItems: [
					{
						q: 'فتح العثمانيون القسطنطينية سنة 1453م فبدأ بذلك العصر الحديث.',
						a: 'صحيح',
						c: 'العبارة صحيحة.',
						mark: '1'
					},
					{
						q: 'استقلت الجزائر يوم 5 جويلية 1962م خلال العصر الوسيط.',
						a: 'خطأ',
						c: 'استقلت الجزائر في العصر المعاصر (1789م إلى اليوم).',
						mark: '1'
					},
					{
						q: 'شهد العصر المعاصر الثورة الصناعية وظهور الحاسوب والإنترنت.',
						a: 'صحيح',
						c: 'العبارة صحيحة.',
						mark: '1'
					}
				],
				q2: '2) اذكر معلمين تاريخيين بارزين من العصر القديم في الجزائر.',
				a2: '2) مدينة تيمقاد بباتنة، وآثار تيبازة وجميلة، ومملكة نوميديا.',
				quizQ: 'أيُّ حدث مما يأتي وقع في العصر المعاصر (1789م – اليوم)؟',
				correctOpt: 'اندلاع ثورة أول نوفمبر 1954 واستقلال الجزائر 1962',
				distractors: [
					{ text: 'اختراع الكتابة سنة 3200 قبل الميلاد', diagnosticFeedback: 'اختراع الكتابة بدأ به العصر القديم.' },
					{ text: 'بناء مدينة تيمقاد القديمة', diagnosticFeedback: 'شُيدت تيمقاد في العصر القديم.' },
					{ text: 'تأسيس القيروان سنة 50 هجرية', diagnosticFeedback: 'تأسست القيروان في العصر الوسيط.' }
				]
			},
			{
				label: 'منجزات الإنسان عبر العصور',
				tfItems: [
					{
						q: 'سقوط مدينة روما سنة 476م هو الفاصل بين العصر القديم والعصر الوسيط.',
						a: 'صحيح',
						c: 'العبارة صحيحة.',
						mark: '1'
					},
					{
						q: 'سادت النهضة العلمية الأوروبية وتكوّن الأسطول البحري الجزائري في العصر الحديث.',
						a: 'صحيح',
						c: 'العبارة صحيحة.',
						mark: '1'
					},
					{
						q: 'تُعدّ الثورة الفرنسية سنة 1789م بداية للعصر القديم.',
						a: 'خطأ',
						c: 'الثورة الفرنسية سنة 1789م هي بداية العصر المعاصر.',
						mark: '1'
					}
				],
				q2: '2) اذكر سببين لأهمية تقسيم الزمن إلى عصور تاريخية.',
				a2: '2) لتسهيل دراسة تاريخ البشرية وفهم التحولات الكبرى وربط كل منجز بزمانه.',
				quizQ: 'ما الحدث الذي أنهى العصر القديم وبدأ به العصر الوسيط سنة 476م؟',
				correctOpt: 'سقوط مدينة روما',
				distractors: [
					{ text: 'اختراع الكتابة', diagnosticFeedback: 'اختراع الكتابة بدأ به العصر القديم نفسه.' },
					{ text: 'فتح القسطنطينية', diagnosticFeedback: 'فتح القسطنطينية 1453م أنهى العصر الوسيط وبدأ الحديث.' },
					{ text: 'الثورة الفرنسية', diagnosticFeedback: 'الثورة الفرنسية 1789م بدأت بها فترة العصر المعاصر.' }
				]
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.correctOpt, v.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'مادة التاريخ',
			points: 5,
			instruction: 'اختبر معلوماتك حول معالم العصور التاريخية الأربعة:',
			content: [
				{ type: 'text', content: '1) أجب بـ (صحيح) أو (خطأ) مع تصحيح الخطأ:' },
				{ type: 'true_false', items: v.tfItems },
				{ type: 'text', content: v.q2, answer: v.a2, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't3',
			difficulty,
			domain: 'hist_ancient',
			titleAr: `${this.titleAr} — ${v.label}`,
			onecRole: 'pri_history',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizQ,
				questionTextAr: v.quizQ,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الإجابة الصحيحة: ${v.correctOpt}.`
			},
			sujetExercise,
			hints: [
				'اربط الحضارات القديمة بالعصر القديم، والحضارة الإسلامية بالعصر الوسيط.',
				'العهد العثماني في الجزائر والنهضة الأوروبية في العصر الحديث.',
				'ثورة التحرير والتكنولوجيا الحديثة في العصر المعاصر.'
			],
			solutionStepsAr: [...v.tfItems.map((it) => `${it.q} -> ${it.a}`), v.a2],
			finalAnswer: v.correctOpt
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 3. الجغرافيا (5 نقاط): المناخ والفصول الأربعة
// ───────────────────────────────────────────────────────────────────────────────
const tplGeoClimateSeasons: HistoryParameterizedTemplate = {
	id: 'his_tpl_3ap_t3_geo_climate_seasons',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'geo_tools_relief',
	titleAr: 'الجغرافيا: المناخ والطقس والفصول الأربعة',
	curriculumLessonId: 'his_lesson_3ap_t3_climate_seasons',
	defaultPoints: 5,
	onecRole: 'pri_geography',
	generate(seed: number, difficulty: Difficulty = 'medium'): HistoryGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				label: 'الفرق بين الطقس والمناخ وخصائص الفصول',
				q1: '1) ما الفرق بين الطقس والمناخ؟',
				a1: '1) الطقس هو حالة الجو خلال مدة قصيرة (يوم أو أسبوع)، أما المناخ فهو حالة الجو السائدة لفترة طويلة (فصل أو سنة).',
				tableRows: [
					[{ label: 'فصل الشتاء' }, { answer: 'برد وأمطار غزيرة وثلوج على القمم', mark: '0.75' }],
					[{ label: 'فصل الربيع' }, { answer: 'اعتدال الجو وتفتح الأزهار واخضرار الأرض', mark: '0.75' }],
					[{ label: 'فصل الصيف' }, { answer: 'حرارة مرتفعة وجفاف ونضج الثمار', mark: '0.75' }],
					[{ label: 'فصل الخريف' }, { answer: 'اعتدال الحرارة وتساقط أوراق الشجر', mark: '0.75' }]
				],
				clozeSentence: 'حالة الجو من حرارة وأمطار ورياح خلال يوم واحد أو أسبوع تسمى ___.',
				clozeCorrect: 'الطقس',
				clozeDistractors: ['المناخ', 'التضاريس', 'الخريطة']
			},
			{
				label: 'تنوع المناخ بين شمال الجزائر وجنوبها',
				q1: '1) قارن بين مناخ الشمال الجزائري ومناخ الجنوب الصحراوي.',
				a1: '1) في الشمال مناخ معتدل وممطر شتاءً، وفي الجنوب مناخ صحراوي حار وجاف قليل الأمطار.',
				tableRows: [
					[{ label: 'النشرة الجوية ليوم غد' }, { answer: 'تصف الطقس (مدة قصيرة)', mark: '0.75' }],
					[{ label: 'الحرارة العالية والجفاف طوال الصيف بالصحراء' }, { answer: 'يمثل المناخ الصحراوي', mark: '0.75' }],
					[{ label: 'الأمطار المعتدلة في الشمال شتاءً' }, { answer: 'يمثل المناخ المتوسطي', mark: '0.75' }],
					[{ label: 'الفصل الذي يكثر فيه الحصاد وتشتد الحرارة' }, { answer: 'فصل الصيف', mark: '0.75' }]
				],
				clozeSentence: 'حالة الجو السائدة في منطقة ما لفترة زمنية طويلة كفصل أو سنة تسمى ___.',
				clozeCorrect: 'المناخ',
				clozeDistractors: ['الطقس', 'المقياس', 'الحدث']
			},
			{
				label: 'أثر الفصول الأربعة في حياة الإنسان',
				q1: '1) اذكر مثالين يوضحان كيف يتكيّف الإنسان مع تعاقب الفصول الأربعة.',
				a1: '1) يرتدي الملابس الصوفية في الشتاء والقطنية الخفيفة في الصيف، ويزرع الفلاح المحاصيل حسب موسم الأمطار والدفء.',
				tableRows: [
					[{ label: 'امتلاء السدود بالماء وتساقط الثلوج' }, { answer: 'فصل الشتاء', mark: '0.75' }],
					[{ label: 'خروج العائلات للنزهة وسط المروج المزهرة' }, { answer: 'فصل الربيع', mark: '0.75' }],
					[{ label: 'السفر إلى الشواطئ وارتداء الملابس الخفيفة' }, { answer: 'فصل الصيف', mark: '0.75' }],
					[{ label: 'بداية الحرث وتساقط أوراق بعض الأشجار' }, { answer: 'فصل الخريف', mark: '0.75' }]
				],
				clozeSentence: 'يتميز جنوب الجزائر بمناخ ___ حار صيفا وقليل الأمطار.',
				clozeCorrect: 'صحراوي',
				clozeDistractors: ['متجمد', 'معتدل ممطر دائما', 'موسمي استوائي']
			}
		];

		const v = rng.pick(variants);
		const clozeOptions = rng.shuffle([v.clozeCorrect, ...v.clozeDistractors]);
		const clozeCorrectIdx = clozeOptions.indexOf(v.clozeCorrect);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'مادة الجغرافيا',
			points: 5,
			instruction: 'أجب عن الأسئلة الآتية حول المناخ والطقس والفصول الأربعة:',
			content: [
				{ type: 'text', content: v.q1, answer: v.a1, mark: '2' },
				{ type: 'text', content: '2) أكمل الجدول بكتابة الفصل أو المفهوم الجغرافي المناسب:' },
				buildHistoryTableBlock(['الفصل أو المظهر الجوي', 'الخصائص / التصنيف'], v.tableRows)
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't3',
			difficulty,
			domain: 'geo_tools_relief',
			titleAr: `${this.titleAr} — ${v.label}`,
			onecRole: 'pri_geography',
			quizQuestion: {
				type: 'cloze',
				questionText: 'اختر الكلمة المناسبة لإكمال الجملة الجغرافية:',
				questionTextAr: 'أكمل الفراغ بالكلمة المناسبة:',
				questionData: {
					sentence: v.clozeSentence,
					options: clozeOptions,
					correctIndex: clozeCorrectIdx
				},
				explanation: `الإجابة الصحيحة هي: ${v.clozeCorrect}.`
			},
			sujetExercise,
			hints: [
				'الطقس يصف حالة الجو ليوم أو بضعة أيام، والمناخ يصفها لفترة طويلة.',
				'تتعاقب الفصول الأربعة: الشتاء، الربيع، الصيف، الخريف.',
				'شمال الجزائر معتدل ممطر شتاءً، وجنوبها صحراوي حار وجاف.'
			],
			solutionStepsAr: [v.a1, ...v.tableRows.map((r) => `${r[0].label}: ${r[1].answer}`)],
			finalAnswer: v.clozeCorrect
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 4. الجغرافيا (5 نقاط): النشاط الاقتصادي والمحافظة على البيئة
// ───────────────────────────────────────────────────────────────────────────────
const tplGeoEconomyEnvironment: HistoryParameterizedTemplate = {
	id: 'his_tpl_3ap_t3_geo_economy_environment',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'geo_tools_relief',
	titleAr: 'الجغرافيا: النشاط الاقتصادي والمحافظة على البيئة',
	curriculumLessonId: 'his_lesson_3ap_t3_economic_activity_environment',
	defaultPoints: 5,
	onecRole: 'pri_geography',
	generate(seed: number, difficulty: Difficulty = 'medium'): HistoryGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				label: 'الفلاحة والصناعة والخدمات والتكامل',
				tableRows: [
					[{ label: 'زراعة الحبوب وتربية الأبقار في الريف' }, { answer: 'نشاط فلاحي', mark: '0.75' }],
					[{ label: 'تحويل الحليب إلى جبن وياغورت في المصنع' }, { answer: 'نشاط صناعي', mark: '0.75' }],
					[{ label: 'نقل البضائع وعلاج المرضى وتعليم التلاميذ' }, { answer: 'التجارة والخدمات', mark: '0.75' }],
					[{ label: 'تبادل المنتجات بين الريف والمدينة' }, { answer: 'التكامل الاقتصادي', mark: '0.75' }]
				],
				q2: '2) اذكر سلوكين عمليين لحماية البيئة والغابات من التلوث والحرائق.',
				a2: '2) رمي النفايات في الحاويات المخصصة، والمشاركة في حملات التشجير وعدم إشعال النار في الغابات.',
				dragCategories: ['الفلاحة', 'الصناعة', 'التجارة والخدمات'],
				dragItems: [
					{ text: 'زراعة القمح والخضر', category: 'الفلاحة' },
					{ text: 'تربية الأغنام والأبقار', category: 'الفلاحة' },
					{ text: 'صناعة الملابس والأحذية', category: 'الصناعة' },
					{ text: 'تحويل الطماطم إلى معلبات', category: 'الصناعة' },
					{ text: 'التدريس في المدرسة', category: 'التجارة والخدمات' },
					{ text: 'بيع المنتجات في المتجر', category: 'التجارة والخدمات' }
				]
			},
			{
				label: 'البيئة النظيفة وترشيد الموارد',
				tableRows: [
					[{ label: 'غرس شجيرات في حديقة الحي والمدرسة' }, { answer: 'سلوك يحمي البيئة', mark: '0.75' }],
					[{ label: 'رمي القمامة في الأودية والشوارع' }, { answer: 'سلوك يلوث البيئة', mark: '0.75' }],
					[{ label: 'غلق الحنفية بعد الوضوء والغسل' }, { answer: 'ترشيد استهلاك الماء', mark: '0.75' }],
					[{ label: 'إبعاد المصانع ذات الدخان عن الأحياء' }, { answer: 'حماية الهواء والسكان', mark: '0.75' }]
				],
				q2: '2) كيف يستفيد سكان المدينة من نشاط سكان الريف؟',
				a2: '2) يستفيدون من المنتجات الفلاحية الطازجة كالحبوب والخضر والفواكه والحليب واللحوم.',
				dragCategories: ['سلوك يحمي البيئة', 'سلوك يضر بالبيئة'],
				dragItems: [
					{ text: 'المشاركة في حملة التشجير', category: 'سلوك يحمي البيئة' },
					{ text: 'رمي النفايات في الحاوية', category: 'سلوك يحمي البيئة' },
					{ text: 'ترشيد استهلاك الماء', category: 'سلوك يحمي البيئة' },
					{ text: 'قطع الأشجار بلا فائدة', category: 'سلوك يضر بالبيئة' },
					{ text: 'رمي البلاستيك في الوادي', category: 'سلوك يضر بالبيئة' },
					{ text: 'ترك الصنبور مفتوحا', category: 'سلوك يضر بالبيئة' }
				]
			},
			{
				label: 'الأنشطة الريفية والحضرية',
				tableRows: [
					[{ label: 'حراثة الأرض وغرس أشجار الزيتون' }, { answer: 'نشاط ريفي (فلاحة)', mark: '0.75' }],
					[{ label: 'إنتاج الأجهزة والملابس في المصانع' }, { answer: 'نشاط حضري (صناعة)', mark: '0.75' }],
					[{ label: 'تشجير المساحات الخضراء في المدينة' }, { answer: 'المحافظة على البيئة', mark: '0.75' }],
					[{ label: 'العمل في المستشفى والبريد والبنك' }, { answer: 'قطاع الخدمات', mark: '0.75' }]
				],
				q2: '2) لماذا نمنع رمي نفايات المصانع في الأنهار والبحار؟',
				a2: '2) لأنها تلوث المياه وتقضي على الأسماك والنباتات وتضر بصحة الإنسان.',
				dragCategories: ['نشاط في الريف (الفلاحة)', 'نشاط في المدينة (صناعة وخدمات)'],
				dragItems: [
					{ text: 'زراعة البطاطا والزيتون', category: 'نشاط في الريف (الفلاحة)' },
					{ text: 'تربية الدواجن والمواشي', category: 'نشاط في الريف (الفلاحة)' },
					{ text: 'جني التمور في الواحة', category: 'نشاط في الريف (الفلاحة)' },
					{ text: 'صناعة السيارات والأجهزة', category: 'نشاط في المدينة (صناعة وخدمات)' },
					{ text: 'العمل في المستشفى', category: 'نشاط في المدينة (صناعة وخدمات)' },
					{ text: 'نقل المسافرين والتجارة', category: 'نشاط في المدينة (صناعة وخدمات)' }
				]
			}
		];

		const v = rng.pick(variants);
		const shuffledDrag = rng.shuffle(v.dragItems);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'مادة الجغرافيا',
			points: 5,
			instruction: 'أجب عن الأسئلة الآتية حول النشاط الاقتصادي وحماية البيئة:',
			content: [
				{ type: 'text', content: '1) صنّف كل عبارة في الجدول بذكر النشاط أو السلوك المناسب:' },
				buildHistoryTableBlock(['المظهر أو العمل', 'التصنيف المناسب'], v.tableRows),
				{ type: 'text', content: v.q2, answer: v.a2, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't3',
			difficulty,
			domain: 'geo_tools_relief',
			titleAr: `${this.titleAr} — ${v.label}`,
			onecRole: 'pri_geography',
			quizQuestion: {
				type: 'drag_drop',
				questionText: 'صنّف العناصر الآتية بسحب كل عنصر إلى الفئة المناسبة:',
				questionTextAr: 'صنّف العناصر الآتية في فئاتها المناسبة:',
				questionData: {
					categories: v.dragCategories,
					items: shuffledDrag
				},
				explanation: 'تتكامل الفلاحة والصناعة والخدمات لتلبية حاجات الإنسان، مع وجوب حماية البيئة من التلوث.'
			},
			sujetExercise,
			hints: [
				'الفلاحة تهتم بالزراعة وتربية الحيوانات في الريف.',
				'الصناعة تحول المواد الخام إلى سلع، والخدمات تشمل التعليم والصحة والنقل والتجارة.',
				'حماية البيئة واجب بالتشجير والنظافة وعدم تبذير الماء.'
			],
			solutionStepsAr: [...v.tableRows.map((r) => `${r[0].label}: ${r[1].answer}`), v.a2],
			finalAnswer: v.a2
		};
	}
};

export const TEMPLATES_3AP_T3: HistoryParameterizedTemplate[] = [
	tplHistErasTimeline,
	tplHistErasLandmarks,
	tplGeoClimateSeasons,
	tplGeoEconomyEnvironment
];
