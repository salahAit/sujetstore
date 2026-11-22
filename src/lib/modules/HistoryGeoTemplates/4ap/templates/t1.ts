import type {
	Difficulty,
	HistoryGeneratedExerciseInstance,
	HistoryParameterizedTemplate
} from '../../types';
import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import { buildIllustratedFigureBlock } from '../../../VisualAssets/illustrations-registry';
import { buildHistoricalDocumentBlock, buildHistoryTableBlock } from '../../history-helpers';

// ═══════════════════════════════════════════════════════════════════════════════
// قوالب التمارين — السنة الرابعة ابتدائي — التاريخ والجغرافيا — الفصل الأول
// ═══════════════════════════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────────────────────────
// 1. التاريخ (5 نقاط): التقويم الهجري والتقويم الميلادي
// ───────────────────────────────────────────────────────────────────────────────
const tplHistCalendars: HistoryParameterizedTemplate = {
	id: 'his_tpl_4ap_t1_hist_calendars',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'hist_ancient',
	titleAr: 'التاريخ: التقويم الهجري والتقويم الميلادي',
	curriculumLessonId: 'his_lesson_4ap_t1_calendars_hijri_gregorian',
	defaultPoints: 5,
	onecRole: 'pri_history',
	generate(seed: number, difficulty: Difficulty = 'medium'): HistoryGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				label: 'أساس التقويمين الهجري والميلادي',
				tableRows: [
					[{ label: 'الحدث المؤسس للتقويم الهجري' }, { answer: 'هجرة النبي صلى الله عليه وسلم من مكة إلى المدينة', mark: '0.75' }],
					[{ label: 'الحدث المؤسس للتقويم الميلادي' }, { answer: 'ميلاد نبي الله عيسى عليه السلام', mark: '0.75' }],
					[{ label: 'نوع السنة الهجرية وعدد أيامها' }, { answer: 'سنة قمرية (354 يوما)', mark: '0.75' }],
					[{ label: 'نوع السنة الميلادية وعدد أيامها' }, { answer: 'سنة شمسية (365 يوما)', mark: '0.75' }]
				],
				q2: '2) لماذا تتنقل الأشهر الهجرية مثل رمضان عبر الفصول الأربعة كل سنة؟',
				a2: '2) لأن السنة الهجرية القمرية أقصر من السنة الميلادية الشمسية بحوالي 11 يوما كل سنة.',
				dragCategories: ['التقويم الهجري', 'التقويم الميلادي'],
				dragItems: [
					{ text: 'صيام شهر رمضان المبارك', category: 'التقويم الهجري' },
					{ text: 'عيد الفطر يوم 1 شوال', category: 'التقويم الهجري' },
					{ text: 'عيد الأضحى يوم 10 ذي الحجة', category: 'التقويم الهجري' },
					{ text: 'اندلاع الثورة 1 نوفمبر 1954', category: 'التقويم الميلادي' },
					{ text: 'عيد الاستقلال 5 جويلية 1962', category: 'التقويم الميلادي' },
					{ text: 'يوم العلم 16 أفريل', category: 'التقويم الميلادي' }
				]
			},
			{
				label: 'ترتيب الأشهر الهجرية والميلادية',
				tableRows: [
					[{ label: 'أول شهر في التقويم الهجري' }, { answer: 'شهر محرم', mark: '0.75' }],
					[{ label: 'آخر شهر في التقويم الهجري' }, { answer: 'شهر ذو الحجة', mark: '0.75' }],
					[{ label: 'أول شهر في التقويم الميلادي' }, { answer: 'شهر جانفي', mark: '0.75' }],
					[{ label: 'الخليفة الذي أسس التقويم الهجري' }, { answer: 'عمر بن الخطاب رضي الله عنه', mark: '0.75' }]
				],
				q2: '2) اذكر مناسبة دينية نحتفل بها وفق التقويم الهجري ومناسبة وطنية وفق التقويم الميلادي.',
				a2: '2) الدينية: عيد الفطر (1 شوال) أو عيد الأضحى (10 ذي الحجة). الوطنية: عيد الاستقلال (5 جويلية) أو 1 نوفمبر.',
				dragCategories: ['شهور التقويم الهجري', 'شهور التقويم الميلادي'],
				dragItems: [
					{ text: 'محرم', category: 'شهور التقويم الهجري' },
					{ text: 'رمضان', category: 'شهور التقويم الهجري' },
					{ text: 'ذو الحجة', category: 'شهور التقويم الهجري' },
					{ text: 'جانفي', category: 'شهور التقويم الميلادي' },
					{ text: 'أفريل', category: 'شهور التقويم الميلادي' },
					{ text: 'نوفمبر', category: 'شهور التقويم الميلادي' }
				]
			},
			{
				label: 'المناسبات الدينية والوطنية في الرزنامة',
				tableRows: [
					[{ label: 'أول يوم من شهر شوال' }, { answer: 'عيد الفطر المبارك', mark: '0.75' }],
					[{ label: 'العاشر من ذي الحجة' }, { answer: 'عيد الأضحى المبارك', mark: '0.75' }],
					[{ label: 'السادس عشر من أفريل' }, { answer: 'يوم العلم في الجزائر', mark: '0.75' }],
					[{ label: 'الخامس من جويلية 1962' }, { answer: 'عيد استقلال الجزائر', mark: '0.75' }]
				],
				q2: '2) يرتكز التقويم الهجري على حركة القمر أم حركة الشمس؟ وضّح كيف نعرف بداية الشهر الهجري.',
				a2: '2) يرتكز على حركة القمر، ونعرف بداية الشهر الهجري برؤية الهلال.',
				dragCategories: ['خصائص التقويم الهجري', 'خصائص التقويم الميلادي'],
				dragItems: [
					{ text: 'يبدأ بهجرة النبي صلى الله عليه وسلم', category: 'خصائص التقويم الهجري' },
					{ text: 'سنته قمرية من 354 يوما', category: 'خصائص التقويم الهجري' },
					{ text: 'ينطلق من شهر محرم', category: 'خصائص التقويم الهجري' },
					{ text: 'يبدأ بميلاد عيسى عليه السلام', category: 'خصائص التقويم الميلادي' },
					{ text: 'سنته شمسية من 365 يوما', category: 'خصائص التقويم الميلادي' },
					{ text: 'ينطلق من شهر جانفي', category: 'خصائص التقويم الميلادي' }
				]
			}
		];

		const v = rng.pick(variants);
		const shuffledDrag = rng.shuffle(v.dragItems);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'مادة التاريخ',
			points: 5,
			instruction: 'أجب عن الأسئلة الآتية حول التقويمين الهجري والميلادي:',
			content: [
				{ type: 'text', content: '1) أكمل الجدول الآتي بالمعلومات التاريخية المناسبة:' },
				buildHistoryTableBlock(['المطلوب', 'الإجابة الدقيقة'], v.tableRows),
				{ type: 'text', content: v.q2, answer: v.a2, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: 'hist_ancient',
			titleAr: `${this.titleAr} — ${v.label}`,
			onecRole: 'pri_history',
			quizQuestion: {
				type: 'drag_drop',
				questionText: 'صنّف العناصر الآتية بسحب كل عنصر إلى الفئة الصحيحة:',
				questionTextAr: 'صنّف العناصر بين التقويم الهجري والتقويم الميلادي:',
				questionData: {
					categories: v.dragCategories,
					items: shuffledDrag
				},
				explanation: 'التقويم الهجري قمري بدأ بالهجرة النبوية (354 يوما)، والميلادي شمسي بدأ بميلاد عيسى عليه السلام (365 يوما).'
			},
			sujetExercise,
			hints: [
				'التقويم الهجري يبدأ بمحرم وينتهي بذي الحجة، ويعتمد على القمر.',
				'التقويم الميلادي يبدأ بجانفي وينتهي بديسمبر، ويعتمد على الشمس.',
				'الفرق بين السنتين الهجرية والميلادية 11 يوما تقريبا.'
			],
			solutionStepsAr: [...v.tableRows.map((r) => `${r[0].label}: ${r[1].answer}`), v.a2],
			finalAnswer: v.a2
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 2. التاريخ (5 نقاط): التحولات التاريخية ومعالم بلاد المغرب القديم
// ───────────────────────────────────────────────────────────────────────────────
const tplHistNumidiaMonuments: HistoryParameterizedTemplate = {
	id: 'his_tpl_4ap_t1_hist_numidia_monuments',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'hist_ancient',
	titleAr: 'التاريخ: مملكة نوميديا ومعالم بلاد المغرب القديم',
	curriculumLessonId: 'his_lesson_4ap_t1_historical_transformations',
	defaultPoints: 5,
	onecRole: 'pri_history',
	generate(seed: number, difficulty: Difficulty = 'medium'): HistoryGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				label: 'مملكة نوميديا وتوحيدها بقيادة ماسينيسا',
				docText:
					'تمكّن الملك ماسينيسا سنة 202 ق.م من توحيد مملكة نوميديا واتخذ مدينة سيرتا (قسنطينة) عاصمة له، وشجّع السكان على الاستقرار والزراعة حتى عُرفت بوفرة قمحها وشعيرها.',
				tableRows: [
					[{ label: 'موحد مملكة نوميديا' }, { answer: 'الملك ماسينيسا', mark: '0.75' }],
					[{ label: 'عاصمة مملكة نوميديا' }, { answer: 'سيرتا (قسنطينة حاليا)', mark: '0.75' }],
					[{ label: 'ولاية ضريح إيمدغاسن' }, { answer: 'ولاية باتنة', mark: '0.75' }],
					[{ label: 'ولاية الضريح الملكي الموريطاني' }, { answer: 'ولاية تيبازة', mark: '0.75' }]
				],
				q2: '2) ماذا يُقصد بالتحول التاريخي، وما أبرز تحول عاشته نوميديا في عهد ماسينيسا؟',
				a2: '2) التحول التاريخي هو تغير كبير ينقل المجتمع من مرحلة لأخرى؛ وقد تحولت نوميديا من قبائل متفرقة إلى دولة موحدة مزدهرة بالزراعة والعمران.',
				pairs: [
					{ left: 'الملك ماسينيسا', right: 'موحد مملكة نوميديا (202 ق.م)' },
					{ left: 'مدينة سيرتا', right: 'عاصمة نوميديا (قسنطينة)' },
					{ left: 'ضريح إيمدغاسن', right: 'ولاية باتنة' },
					{ left: 'الضريح الملكي الموريطاني', right: 'ولاية تيبازة' }
				]
			},
			{
				label: 'المعالم الأثرية في الجزائر القديمة',
				docText:
					'تزخر بلادنا الجزائر بمعالم عمرانية قديمة شاهدة على عراقة الحضارة في بلاد المغرب القديم، مثل أضرحة الملوك النوميديين ومدن تيمقاد وجميلة وتيبازة.',
				tableRows: [
					[{ label: 'أقدم ضريح ملكي نوميدي بالأوراس' }, { answer: 'ضريح إيمدغاسن بباتنة', mark: '0.75' }],
					[{ label: 'مدينة أثرية بولاية سطيف' }, { answer: 'آثار جميلة', mark: '0.75' }],
					[{ label: 'مقاومان للاحتلال الروماني' }, { answer: 'يوغرطة وتكفاريناس', mark: '0.75' }],
					[{ label: 'اسم الخط المغاربي القديم' }, { answer: 'الكتابة الليبية (التيفيناغ)', mark: '0.75' }]
				],
				q2: '2) ما واجبنا نحو المعالم الأثرية النوميدية والرومانية الموجودة في وطننا؟',
				a2: '2) صيانتها والحفاظ على نظافتها وعدم تخريبها أو الكتابة عليها لأنها جزء من ذاكرتنا الوطنية.',
				pairs: [
					{ left: 'تيمقاد وإيمدغاسن', right: 'ولاية باتنة' },
					{ left: 'آثار جميلة', right: 'ولاية سطيف' },
					{ left: 'الضريح الملكي الموريطاني', right: 'ولاية تيبازة' },
					{ left: 'يوغرطة وتكفاريناس', right: 'أبطال مقاومة الرومان' }
				]
			},
			{
				label: 'الازدهار الاقتصادي والعمراني بنوميديا',
				docText:
					'شهدت بلاد المغرب القديم تحولا اقتصاديا كبيرا في عهد ماسينيسا الذي نشر الزراعة وتصدير الحبوب، وأنشأ أسطولا وتجارة نشطة مع دول حوض البحر الأبيض المتوسط.',
				tableRows: [
					[{ label: 'أهم محصول زراعي اشتهرت به نوميديا' }, { answer: 'القمح والشعير (الحبوب)', mark: '0.75' }],
					[{ label: 'عاصمة نوميديا الشرقية والموحدة' }, { answer: 'سيرتا (قسنطينة)', mark: '0.75' }],
					[{ label: 'تحول سياسي حققه ماسينيسا' }, { answer: 'توحيد المملكة النوميدية', mark: '0.75' }],
					[{ label: 'التحول الأعظم في القرن الأول هجري' }, { answer: 'الفتح الإسلامي لبلاد المغرب', mark: '0.75' }]
				],
				q2: '2) اذكر معلمين أثريين من معالم بلاد المغرب القديم في الجزائر وولايتيهما.',
				a2: '2) ضريح إيمدغاسن بولاية باتنة، والضريح الملكي الموريطاني بولاية تيبازة (أو تيمقاد بباتنة وجميلة بسطيف).',
				pairs: [
					{ left: 'مطمور روما بالحبوب', right: 'زراعة نوميديا المزدهرة' },
					{ left: 'سيرتا', right: 'عاصمة مملكة نوميديا' },
					{ left: 'تيمقاد', right: 'مدينة أثرية بباتنة' },
					{ left: 'الفتح الإسلامي', right: 'أعظم تحول تاريخي بالجزائر' }
				]
			}
		];

		const v = rng.pick(variants);
		const shuffledPairs = rng.shuffle(v.pairs);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'مادة التاريخ',
			points: 5,
			instruction: 'تأمّل لوحة معالم بلاد المغرب القديم واقرأ السند ثم أجب:',
			content: [
				buildIllustratedFigureBlock('hg_04_numidia_roman_monuments_algeria', {
					title: 'المعالم الأثرية في بلاد المغرب القديم ونوميديا',
					maxHeight: 112,
					width: '62%',
					mode: 'labeled',
					pins: []
				}),
				buildHistoricalDocumentBlock({
					title: 'سند تاريخي: بلاد المغرب القديم ونوميديا',
					text: v.docText
				}),
				{ type: 'text', content: '1) أكمل الجدول الآتي بالمعلومات التاريخية الدقيقة:' },
				buildHistoryTableBlock(['المعطى التاريخي', 'الإجابة'], v.tableRows),
				{ type: 'text', content: v.q2, answer: v.a2, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: 'hist_ancient',
			titleAr: `${this.titleAr} — ${v.label}`,
			onecRole: 'pri_history',
			quizQuestion: {
				type: 'matching',
				questionText: 'اربط كل معلم أو شخصية في بلاد المغرب القديم بما يناسبها:',
				questionTextAr: 'اربط كل عنصر بما يناسبه:',
				imageUrl: '/documents/illustrations/history_geo/hg_04_numidia_roman_monuments_algeria.webp',
				imageCaption: 'المعالم الأثرية في بلاد المغرب القديم ونوميديا',
				questionData: { pairs: shuffledPairs },
				explanation: 'وحّد الملك ماسينيسا مملكة نوميديا وعاصمتها سيرتا، وخلّفت تلك الحقبة معالم كإيمدغاسن وتيمقاد وتيبازة.'
			},
			sujetExercise,
			hints: [
				'سيرتا هي الاسم القديم لمدينة قسنطينة عاصمة مملكة نوميديا.',
				'إيمدغاسن وتيمقاد يقعان بولاية باتنة، وجميلة بسطيف، والضريح الملكي بتيبازة.',
				'التحول التاريخي يعني تغيرا عميقا ينقل المجتمع من حال إلى حال.'
			],
			solutionStepsAr: [...v.tableRows.map((r) => `${r[0].label}: ${r[1].answer}`), v.a2],
			finalAnswer: v.a2
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 3. الجغرافيا (5 نقاط): الموقع الجغرافي للجزائر وحدودها
// ───────────────────────────────────────────────────────────────────────────────
const tplGeoAlgeriaLocation: HistoryParameterizedTemplate = {
	id: 'his_tpl_4ap_t1_geo_algeria_location',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'geo_algeria',
	titleAr: 'الجغرافيا: الموقع الجغرافي للجزائر وحدودها',
	curriculumLessonId: 'his_lesson_4ap_t1_algeria_location_relief',
	defaultPoints: 5,
	onecRole: 'pri_geography',
	generate(seed: number, difficulty: Difficulty = 'medium'): HistoryGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				label: 'حدود الجزائر ومساحتها في القارة الإفريقية',
				tableRows: [
					[{ label: 'من الشمال' }, { answer: 'البحر الأبيض المتوسط', mark: '0.75' }],
					[{ label: 'من الشرق' }, { answer: 'تونس وليبيا', mark: '0.75' }],
					[{ label: 'من الغرب' }, { answer: 'المغرب الأقصى والصحراء الغربية وموريتانيا', mark: '0.75' }],
					[{ label: 'من الجنوب' }, { answer: 'مالي والنيجر', mark: '0.75' }]
				],
				q2: '2) كم تبلغ مساحة الجزائر، وما ترتيبها في إفريقيا والعالم العربي؟',
				a2: '2) تبلغ مساحتها 2381741 كيلومترا مربعا، وهي أكبر دولة إفريقية وعربية.',
				blankSentence: 'تقع الجزائر في شمال قارة ___ وتطل شمالا على البحر الأبيض المتوسط.',
				blankAnswers: ['إفريقيا', 'افريقيا', 'أفريقيا']
			},
			{
				label: 'الموقع المتوسطي والمغاربي للجزائر',
				tableRows: [
					[{ label: 'القارة التي تنتمي إليها الجزائر' }, { answer: 'قارة إفريقيا (الجزء الشمالي)', mark: '0.75' }],
					[{ label: 'الإقليم العربي المغاربي' }, { answer: 'قلب بلدان المغرب العربي', mark: '0.75' }],
					[{ label: 'طول الشريط الساحلي الجزائري' }, { answer: 'نحو 1622 كيلومترا', mark: '0.75' }],
					[{ label: 'الحدود البحرية شمالا' }, { answer: 'البحر الأبيض المتوسط', mark: '0.75' }]
				],
				q2: '2) اذكر الدولتين اللتين تحدان الجزائر من الشرق والدولتين من الجنوب.',
				a2: '2) من الشرق: تونس وليبيا. من الجنوب: مالي والنيجر.',
				blankSentence: 'يحدّ الجزائر من جهة الشمال البحر الأبيض ___.',
				blankAnswers: ['المتوسط']
			},
			{
				label: 'مقارنة موقع الجزائر مع جيرانها',
				tableRows: [
					[{ label: 'دولتان شرقي الجزائر' }, { answer: 'تونس وليبيا', mark: '0.75' }],
					[{ label: 'دولتان جنوبي الجزائر' }, { answer: 'مالي والنيجر', mark: '0.75' }],
					[{ label: 'جهة البحر الأبيض المتوسط' }, { answer: 'الشمال', mark: '0.75' }],
					[{ label: 'أقصى امتداد غربي وجنوب غربي' }, { answer: 'المغرب والصحراء الغربية وموريتانيا', mark: '0.75' }]
				],
				q2: '2) اذكر ميزة واحدة يمنحها الموقع الجغرافي الممتاز للجزائر.',
				a2: '2) تتوسط المغرب العربي وتشرف على البحر المتوسط وتعد بوابة إفريقيا نحو أوروبا.',
				blankSentence: 'تحدّ الجزائر من جهة الشرق كل من ليبيا ودولة ___.',
				blankAnswers: ['تونس']
			}
		];

		const v = rng.pick(variants);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'مادة الجغرافيا',
			points: 5,
			instruction: 'لاحظ المقطع التضاريسي للجزائر ثم أجب عن الأسئلة حول موقعها الجغرافي:',
			content: [
				buildIllustratedFigureBlock('hg_03_algeria_relief_climate_cross_section', {
					title: 'مقطع للجزائر من البحر المتوسط شمالا إلى الصحراء جنوبا',
					maxHeight: 108,
					width: '62%',
					mode: 'labeled',
					pins: []
				}),
				{ type: 'text', content: '1) أكمل الجدول الآتي بتحديد حدود الجزائر وموقعها الجغرافي:' },
				buildHistoryTableBlock(['الجهة أو المعلومة', 'الحد الجغرافي أو الإجابة'], v.tableRows),
				{ type: 'text', content: v.q2, answer: v.a2, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: 'geo_algeria',
			titleAr: `${this.titleAr} — ${v.label}`,
			onecRole: 'pri_geography',
			quizQuestion: {
				type: 'fill_blank',
				questionText: 'أكمل الفراغ بالكلمة الجغرافية المناسبة:',
				questionTextAr: 'اكتب الكلمة الناقصة لإكمال الجملة:',
				questionData: {
					sentence: v.blankSentence,
					answers: v.blankAnswers,
					acceptedAnswers: v.blankAnswers
				},
				explanation: `الإجابة الصحيحة: ${v.blankAnswers[0]}.`
			},
			sujetExercise,
			hints: [
				'الجزائر أكبر بلد إفريقي وعربي بمساحة 2381741 كيلومترا مربعا.',
				'يحدها شمالا البحر المتوسط، وشرقا تونس وليبيا، وجنوبا مالي والنيجر.',
				'غربا تحدها المغرب الأقصى والصحراء الغربية وموريتانيا.'
			],
			solutionStepsAr: [...v.tableRows.map((r) => `${r[0].label}: ${r[1].answer}`), v.a2],
			finalAnswer: v.blankAnswers[0]
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 4. الجغرافيا (5 نقاط): خريطة الأقاليم التضاريسية الكبرى في الجزائر
// ───────────────────────────────────────────────────────────────────────────────
const tplGeoReliefRegionsMap: HistoryParameterizedTemplate = {
	id: 'his_tpl_4ap_t1_geo_relief_regions_map',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'geo_algeria',
	titleAr: 'الجغرافيا: خريطة الأقاليم التضاريسية الكبرى في الجزائر',
	curriculumLessonId: 'his_lesson_4ap_t1_algeria_location_relief',
	defaultPoints: 5,
	onecRole: 'pri_geography',
	generate(seed: number, difficulty: Difficulty = 'medium'): HistoryGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				label: 'تسمية الأقاليم التضاريسية الأربعة على الخريطة الصماء',
				q1: '2) بمَ يتميز الإقليم رقم (4) عن الإقليم رقم (1) من حيث المساحة والتضاريس؟',
				a1: '2) الإقليم رقم (4) هو الإقليم الصحراوي الذي يشغل أكثر من 80 بالمئة من مساحة الجزائر وتنتشر فيه الرمال والحمادات والواحات وجبال الهقار، أما الإقليم (1) فهو ضيق وخصب.',
				q2: '3) اذكر اسم أعلى قمة جبلية في الجزائر وأين تقع.',
				a2: '3) قمة تاهات أتاكور (2918م) وتقع في جبال الهقار بالإقليم الصحراوي.',
				quizQ: 'أيُّ رقم على خريطة الأقاليم التضاريسية يمثّل إقليم السهول والهضاب العليا بين الأطلسين؟',
				correctOpt: 'الرقم (2) — السهول والهضاب العليا',
				distractors: [
					{ text: 'الرقم (1) — الشريط الساحلي وإقليم التل', diagnosticFeedback: 'الرقم (1) يمثل الشريط الساحلي وإقليم التل شمالا.' },
					{ text: 'الرقم (3) — سلسلة الأطلس الصحراوي', diagnosticFeedback: 'الرقم (3) يمثل جبال الأطلس الصحراوي الفاصلة عن الصحراء.' },
					{ text: 'الرقم (4) — الإقليم الصحراوي الجنوبي', diagnosticFeedback: 'الرقم (4) يمثل الإقليم الصحراوي الشاسع في الجنوب.' }
				]
			},
			{
				label: 'السهول والجبال في الأقاليم التضاريسية',
				q1: '2) أين تقع جبال جرجرة وسهل متيجة، وأين تقع جبال الأوراس؟',
				a1: '2) تقع جبال جرجرة وسهل متيجة في إقليم التل الساحلي (1)، بينما تقع جبال الأوراس في سلسلة الأطلس الصحراوي (3).',
				q2: '3) اذكر مظهرين تضاريسيين في الإقليم الصحراوي الجنوبي.',
				a2: '3) العرق الرملي، الرق الصخري، جبال الهقار والطاسيلي، والواحات.',
				quizQ: 'ما اسم السلسلة الجبلية المشار إليها بالرقم (3) التي تفصل الهضاب العليا عن الصحراء؟',
				correctOpt: 'سلسلة الأطلس الصحراوي',
				distractors: [
					{ text: 'سلسلة جبال الهقار', diagnosticFeedback: 'جبال الهقار تقع في أقصى الجنوب الصحراوي (الإقليم 4).' },
					{ text: 'سلسلة الأطلس التلي', diagnosticFeedback: 'الأطلس التلي يقع شمال الهضاب العليا ضمن الإقليم (1).' },
					{ text: 'سهل متيجة', diagnosticFeedback: 'سهل متيجة سهل ساحلي خصيب في الإقليم (1).' }
				]
			},
			{
				label: 'تدرج التضاريس من البحر المتوسط إلى الهقار',
				q1: '2) سمّ شطا من شطوط إقليم الهضاب العليا وسهلا خصبا من إقليم التل.',
				a1: '2) في الهضاب العليا: شط الحضنة أو الشط الشرقي. وفي إقليم التل: سهل متيجة أو سهل عنابة.',
				q2: '3) ماذا يميز السطح في الإقليم الصحراوي بين العرق والرق؟',
				a2: '3) العرق مساحات من الكثبان الرملية، بينما الرق سهول صحراوية مغطاة بالحصى والصخور.',
				quizQ: 'أيُّ إقليم يشغل النسبة الأكبر من مساحة الجزائر ويحتضن جبال الهقار والطاسيلي؟',
				correctOpt: 'الرقم (4) — الإقليم الصحراوي الجنوبي',
				distractors: [
					{ text: 'الرقم (1) — الشريط الساحلي وإقليم التل', diagnosticFeedback: 'إقليم التل يشغل شريطا ضيقا في الشمال رغم كثافته السكانية.' },
					{ text: 'الرقم (2) — السهول والهضاب العليا', diagnosticFeedback: 'الهضاب العليا تشغل الوسط بين الأطلسين فقط.' },
					{ text: 'الرقم (3) — سلسلة الأطلس الصحراوي', diagnosticFeedback: 'الأطلس الصحراوي سلسلة جبلية تفصل الهضاب عن الصحراء.' }
				]
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.correctOpt, v.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'مادة الجغرافيا',
			points: 5,
			instruction: 'لاحظ الخريطة الصماء للأقاليم التضاريسية الكبرى في الجزائر ثم أجب:',
			content: [
				{
					type: 'text',
					content: '1) سمِّ الأقاليم التضاريسية الأربعة المرقّمة من (1) إلى (4) في مفتاح الخريطة:'
				},
				buildIllustratedFigureBlock('hg_11_algeria_mute_map_regions_4', {
					title: 'خريطة الأقاليم التضاريسية الكبرى في الجزائر',
					maxHeight: 132,
					width: '60%',
					mode: 'quiz',
					markPerItem: '0.5',
					pins: []
				}),
				{ type: 'text', content: v.q1, answer: v.a1, mark: '1.5' },
				{ type: 'text', content: v.q2, answer: v.a2, mark: '1.5' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: 'geo_algeria',
			titleAr: `${this.titleAr} — ${v.label}`,
			onecRole: 'pri_geography',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizQ,
				questionTextAr: v.quizQ,
				imageUrl: '/documents/illustrations/history_geo/hg_11_algeria_mute_map_regions_4.webp',
				imageCaption: 'الأقاليم التضاريسية الأربعة في الجزائر',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الإجابة الصحيحة: ${v.correctOpt}.`
			},
			sujetExercise,
			hints: [
				'الأقاليم التضاريسية من الشمال إلى الجنوب هي: 1) التل، 2) الهضاب العليا، 3) الأطلس الصحراوي، 4) الصحراء.',
				'الهضاب العليا تتوسط سلسلتي الأطلس التلي والأطلس الصحراوي.',
				'أعلى قمة بالجزائر هي قمة تاهات (2918م) بجبال الهقار.'
			],
			solutionStepsAr: [
				'1) الشريط الساحلي والتل — 2) الهضاب العليا — 3) الأطلس الصحراوي — 4) الإقليم الصحراوي.',
				v.a1,
				v.a2
			],
			finalAnswer: v.correctOpt
		};
	}
};

export const TEMPLATES_4AP_T1: HistoryParameterizedTemplate[] = [
	tplHistCalendars,
	tplHistNumidiaMonuments,
	tplGeoAlgeriaLocation,
	tplGeoReliefRegionsMap
];
