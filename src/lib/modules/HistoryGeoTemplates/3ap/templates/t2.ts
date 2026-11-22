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
// قوالب التمارين — السنة الثالثة ابتدائي — التاريخ والجغرافيا — الفصل الثاني
// ═══════════════════════════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────────────────────────
// 1. التاريخ (5 نقاط): التاريخ المعلمي (الشخصي والأسري والوطني)
// ───────────────────────────────────────────────────────────────────────────────
const tplHistLandmarkHistory: HistoryParameterizedTemplate = {
	id: 'his_tpl_3ap_t2_hist_landmark_history',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'hist_ancient',
	titleAr: 'التاريخ: التاريخ المعلمي الشخصي والأسري والوطني',
	curriculumLessonId: 'his_lesson_3ap_t2_landmark_history',
	defaultPoints: 5,
	onecRole: 'pri_history',
	generate(seed: number, difficulty: Difficulty = 'medium'): HistoryGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				label: 'تصنيف التواريخ المعلمية الثلاثة',
				q1: '1) عرّف التاريخ المعلمي تعريفا مبسطا.',
				a1: '1) التاريخ المعلمي هو تاريخ بارز يرتبط بحدث مهم لا يُنسى في حياة الفرد أو الأسرة أو الوطن.',
				tableRows: [
					[{ label: 'تاريخ ميلادي ودخولي للمدرسة' }, { answer: 'تاريخ معلمي شخصي', mark: '0.75' }],
					[{ label: 'تاريخ انتقال أسرتي إلى مسكن جديد' }, { answer: 'تاريخ معلمي أسري', mark: '0.75' }],
					[{ label: 'عيد الاستقلال يوم 5 جويلية 1962' }, { answer: 'تاريخ معلمي وطني', mark: '0.75' }],
					[{ label: 'يوم العلم 16 أفريل' }, { answer: 'تاريخ معلمي وطني', mark: '0.75' }]
				],
				q3: '3) لماذا نحتفل يوم 16 أفريل بيوم العلم في الجزائر؟',
				a3: '3) تخليدا لذكرى العلامة الشيخ عبد الحميد بن باديس رحمه الله وتشجيعا على طلب العلم.',
				dragCategories: ['تاريخ معلمي شخصي', 'تاريخ معلمي أسري', 'تاريخ معلمي وطني'],
				dragItems: [
					{ text: 'يوم ميلادي الأول', category: 'تاريخ معلمي شخصي' },
					{ text: 'فوزي بجائزة القسم', category: 'تاريخ معلمي شخصي' },
					{ text: 'زواج أخي الأكبر', category: 'تاريخ معلمي أسري' },
					{ text: 'الانتقال إلى بيت جديد', category: 'تاريخ معلمي أسري' },
					{ text: 'أول نوفمبر 1954', category: 'تاريخ معلمي وطني' },
					{ text: 'عيد الاستقلال 5 جويلية', category: 'تاريخ معلمي وطني' }
				]
			},
			{
				label: 'المناسبات الوطنية والذاكرة المشتركة',
				q1: '1) اذكر مناسبتين وطنيتين خالـدتين في تاريخ الجزائر مع ذكر تاريخيهما.',
				a1: '1) اندلاع الثورة التحريرية يوم 1 نوفمبر 1954، وعيد الاستقلال يوم 5 جويلية 1962.',
				tableRows: [
					[{ label: '1 نوفمبر 1954' }, { answer: 'اندلاع الثورة التحريرية (تاريخ وطني)', mark: '0.75' }],
					[{ label: '5 جويلية 1962' }, { answer: 'عيد الاستقلال والشباب (تاريخ وطني)', mark: '0.75' }],
					[{ label: '18 فيفري' }, { answer: 'اليوم الوطني للشهيد (تاريخ وطني)', mark: '0.75' }],
					[{ label: 'عودة جدي من البقاع المقدسة' }, { answer: 'تاريخ معلمي أسري', mark: '0.75' }]
				],
				q3: '3) اذكر مثالا لتاريخ معلمي شخصي وآخر لتاريخ معلمي أسري.',
				a3: '3) مثال الشخصي: تاريخ ميلادي أو أول يوم دخلت فيه المدرسة. مثال الأسري: تاريخ عقيقة أختي أو انتقال العائلة لبيت جديد.',
				dragCategories: ['تاريخ معلمي شخصي وأسري', 'تاريخ معلمي وطني'],
				dragItems: [
					{ text: 'تاريخ دخولي للمدرسة', category: 'تاريخ معلمي شخصي وأسري' },
					{ text: 'انتقال العائلة لمسكن جديد', category: 'تاريخ معلمي شخصي وأسري' },
					{ text: 'تاريخ ميلادي', category: 'تاريخ معلمي شخصي وأسري' },
					{ text: 'اليوم الوطني للشهيد 18 فيفري', category: 'تاريخ معلمي وطني' },
					{ text: 'يوم العلم 16 أفريل', category: 'تاريخ معلمي وطني' },
					{ text: 'استقلال الجزائر 5 جويلية', category: 'تاريخ معلمي وطني' }
				]
			},
			{
				label: 'دفتر العائلة والتاريخ الشخصي',
				q1: '1) أين نجد تاريخ ميلاد التلميذ وتواريخ أفراد أسرته مسجلة رسميا؟',
				a1: '1) نجدها مسجلة في دفتر العائلة وشهادة الميلاد.',
				tableRows: [
					[{ label: 'أول يوم التحقت فيه بالقسم التحضيري' }, { answer: 'تاريخ معلمي شخصي', mark: '0.75' }],
					[{ label: 'يوم زواج والديّ' }, { answer: 'تاريخ معلمي أسري', mark: '0.75' }],
					[{ label: 'ذكرى 1 نوفمبر المجيدة' }, { answer: 'تاريخ معلمي وطني', mark: '0.75' }],
					[{ label: 'اليوم الوطني للعلم 16 أفريل' }, { answer: 'تاريخ معلمي وطني', mark: '0.75' }]
				],
				q3: '3) ما واجبنا نحو التواريخ المعلمية الوطنية وشهداء ثورتنا؟',
				a3: '3) أن نحفظها ونحيي ذكراها باعتزاز ونترحم على شهدائنا الأبرار.',
				dragCategories: ['تاريخ شخصي', 'تاريخ أسري', 'تاريخ وطني'],
				dragItems: [
					{ text: 'أول يوم في المدرسة', category: 'تاريخ شخصي' },
					{ text: 'نجاحي في السنة الثانية', category: 'تاريخ شخصي' },
					{ text: 'تاريخ زواج الوالدين', category: 'تاريخ أسري' },
					{ text: 'حفل عقيقة في البيت', category: 'تاريخ أسري' },
					{ text: '18 فيفري يوم الشهيد', category: 'تاريخ وطني' },
					{ text: '5 جويلية عيد الاستقلال', category: 'تاريخ وطني' }
				]
			}
		];

		const v = rng.pick(variants);
		const shuffledDrag = rng.shuffle(v.dragItems);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'مادة التاريخ',
			points: 5,
			instruction: 'أجب عن الأسئلة الآتية حول التاريخ المعلمي وأنواعه:',
			content: [
				{ type: 'text', content: v.q1, answer: v.a1, mark: '1' },
				{ type: 'text', content: '2) صنّف كل حدث في الجدول حسب نوع تاريخه المعلمي:' },
				buildHistoryTableBlock(['الحدث أو التاريخ', 'النوع / الدلالة'], v.tableRows),
				{ type: 'text', content: v.q3, answer: v.a3, mark: '1' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: 'hist_ancient',
			titleAr: `${this.titleAr} — ${v.label}`,
			onecRole: 'pri_history',
			quizQuestion: {
				type: 'drag_drop',
				questionText: 'صنّف الأحداث والتواريخ المعلمية الآتية في الفئة المناسبة:',
				questionTextAr: 'صنّف التواريخ المعلمية في فئاتها:',
				questionData: {
					categories: v.dragCategories,
					items: shuffledDrag
				},
				explanation: 'التاريخ الشخصي يخص الفرد، والأسري يخص العائلة، والوطني يهم الشعب الجزائري كله.'
			},
			sujetExercise,
			hints: [
				'ميّز بين الحدث الذي يخصك وحدك والحدث الذي يخص عائلتك والحدث الذي يخص الجزائر كلها.',
				'1 نوفمبر 1954 و5 جويلية 1962 و16 أفريل و18 فيفري تواريخ وطنية.',
				'شهادة الميلاد ودفتر العائلة يوثقان التواريخ الشخصية والأسرية.'
			],
			solutionStepsAr: [v.a1, ...v.tableRows.map((r) => `${r[0].label}: ${r[1].answer}`), v.a3],
			finalAnswer: v.a1
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 2. التاريخ (5 نقاط): الآثار القديمة في الجزائر ومصادر المعلومة التاريخية
// ───────────────────────────────────────────────────────────────────────────────
const tplHistAntiquities: HistoryParameterizedTemplate = {
	id: 'his_tpl_3ap_t2_hist_antiquities',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'hist_ancient',
	titleAr: 'التاريخ: الآثار القديمة في الجزائر ومصادر المعلومة',
	curriculumLessonId: 'his_lesson_3ap_t2_ancient_antiquities',
	defaultPoints: 5,
	onecRole: 'pri_history',
	generate(seed: number, difficulty: Difficulty = 'medium'): HistoryGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				label: 'المواقع الأثرية في الجزائر',
				docTitle: 'سند تاريخي: كنوزنا الأثرية',
				docText:
					'تحتضن الجزائر مواقع أثرية عريقة منها مدينة تيمقاد الأثرية بباتنة، وآثار تيبازة المطلة على البحر، ومدينة جميلة بسطيف، ونقوش الطاسيلي ناجر الصخرية في الصحراء.',
				tableRows: [
					[{ label: 'نقوش الطاسيلي ناجر الصخرية' }, { answer: 'الجنوب الشرقي (جانت وإليزي)', mark: '0.75' }],
					[{ label: 'مدينة تيمقاد الأثرية' }, { answer: 'ولاية باتنة', mark: '0.75' }],
					[{ label: 'آثار جميلة القديمة' }, { answer: 'ولاية سطيف', mark: '0.75' }],
					[{ label: 'الآثار الرومانية بتيبازة' }, { answer: 'ولاية تيبازة', mark: '0.75' }]
				],
				q2: '2) كيف نحافظ على هذه المعالم الأثرية عندما نزورها؟ (اذكر سلوكين)',
				a2: '2) عدم الكتابة على جدرانها أو تخريبها، والحفاظ على نظافة المواقع الأثرية وتوعية الزوار بقيمتها.',
				clozeSentence: 'تقع مدينة تيمقاد الأثرية في ولاية ___، بينما توجد النقوش الصخرية القديمة في الطاسيلي ناجر.',
				clozeCorrect: 'باتنة',
				clozeDistractors: ['وهران', 'تندوف', 'تلمسان']
			},
			{
				label: 'مصادر المعلومة التاريخية (المادية والمكتوبة)',
				docTitle: 'سند تاريخي: كيف يبحث المؤرخ عن الماضي؟',
				docText:
					'يعتمد المؤرخ على نوعين من المصادر: مصادر مادية ملموسة كالمسكوكات والأواني الفخارية والمعالم الحجرية، ومصادر مكتوبة كالمخطوطات والوثائق والكتب القديمة.',
				tableRows: [
					[{ label: 'الأواني الفخارية والمسكوكات' }, { answer: 'مصادر مادية', mark: '0.75' }],
					[{ label: 'المخطوطات والرسائل القديمة' }, { answer: 'مصادر مكتوبة', mark: '0.75' }],
					[{ label: 'أقواس مدينة تيمقاد الأثرية' }, { answer: 'مصادر مادية', mark: '0.75' }],
					[{ label: 'الكتب التاريخية والوثائق الرسمية' }, { answer: 'مصادر مكتوبة', mark: '0.75' }]
				],
				q2: '2) ماذا تكشف لنا الرسوم والنقوش الصخرية الموجودة في الطاسيلي ناجر؟',
				a2: '2) تكشف لنا عن نمط حياة السكان القدامى في الصحراء من صيد ورعي وحيوانات كانت تعيش فيها قديما.',
				clozeSentence: 'تُصنّف المسكوكات والأواني الفخارية والآثار العمرانية ضمن المصادر ___ للمعلومة التاريخية.',
				clozeCorrect: 'المادية',
				clozeDistractors: ['المكتوبة', 'السمعية فقط', 'الخيالية']
			},
			{
				label: 'متحف الصحراء المفتوح في الطاسيلي',
				docTitle: 'سند تاريخي: الطاسيلي ناجر وتيبازة',
				docText:
					'تُعد هضبة الطاسيلي ناجر متحفا مفتوحا يضم آلاف الرسوم الصخرية التي نقشها الإنسان القديم، كما تقف آثار تيبازة وجميلة شاهدا على حضارة قديمة في شمال الجزائر.',
				tableRows: [
					[{ label: 'أقدم الرسوم الصخرية في الصحراء' }, { answer: 'الطاسيلي ناجر', mark: '0.75' }],
					[{ label: 'آثار ساحلية غرب العاصمة' }, { answer: 'تيبازة', mark: '0.75' }],
					[{ label: 'بقايا مساكن وأوانٍ قديمة' }, { answer: 'مصدر مادي', mark: '0.75' }],
					[{ label: 'وثائق ومخطوطات تاريخية' }, { answer: 'مصدر مكتوب', mark: '0.75' }]
				],
				q2: '2) لماذا تُعد الآثار القديمة ثروة يجب حمايتها؟',
				a2: '2) لأنها تعرفنا بتاريخ أجدادنا وحضارات بلادنا وتجذب السياح والباحثين من كل العالم.',
				clozeSentence: 'توجد النقوش والرسوم الصخرية العريقة في هضبة ___ بالجنوب الشرقي للجزائر.',
				clozeCorrect: 'الطاسيلي ناجر',
				clozeDistractors: ['سهل متيجة', 'الأوراس', 'شاطئ بجاية']
			}
		];

		const v = rng.pick(variants);
		const clozeOptions = rng.shuffle([v.clozeCorrect, ...v.clozeDistractors]);
		const clozeCorrectIdx = clozeOptions.indexOf(v.clozeCorrect);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'مادة التاريخ',
			points: 5,
			instruction: 'تأمّل اللوحة التعليمية واقرأ السند ثم أجب عن الأسئلة:',
			content: [
				buildIllustratedFigureBlock('hg_01_timeline_historical_sources', {
					title: 'مصادر المعلومة التاريخية عبر العصور',
					maxHeight: 112,
					width: '62%',
					mode: 'labeled',
					pins: []
				}),
				buildHistoricalDocumentBlock({
					title: v.docTitle,
					text: v.docText
				}),
				{ type: 'text', content: '1) أكمل الجدول الآتي بالموقع أو بنوع المصدر التاريخي المناسب:' },
				buildHistoryTableBlock(['المعلم أو المصدر', 'الموقع / التصنيف التاريخي'], v.tableRows),
				{ type: 'text', content: v.q2, answer: v.a2, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: 'hist_ancient',
			titleAr: `${this.titleAr} — ${v.label}`,
			onecRole: 'pri_history',
			quizQuestion: {
				type: 'cloze',
				questionText: 'أكمل الفراغ بالكلمة التاريخية الصحيحة:',
				questionTextAr: 'اختر الكلمة المناسبة لإكمال الجملة:',
				questionData: {
					sentence: v.clozeSentence,
					options: clozeOptions,
					correctIndex: clozeCorrectIdx
				},
				explanation: `الإجابة الصحيحة هي: ${v.clozeCorrect}.`
			},
			sujetExercise,
			hints: [
				'تقع تيمقاد بباتنة، وجميلة بسطيف، والطاسيلي في الجنوب الشرقي.',
				'المصادر المادية أشياء ملموسة كالفخار والمسكوكات، والمصادر المكتوبة نصوص ومخطوطات.',
				'احترم المواقع الأثرية ولا تكتب على جدرانها.'
			],
			solutionStepsAr: [...v.tableRows.map((r) => `${r[0].label}: ${r[1].answer}`), v.a2],
			finalAnswer: v.clozeCorrect
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 3. الجغرافيا (5 نقاط): مظاهر السطح (الجبال، الهضاب، السهول، الصحراء)
// ───────────────────────────────────────────────────────────────────────────────
const tplGeoReliefForms: HistoryParameterizedTemplate = {
	id: 'his_tpl_3ap_t2_geo_relief_forms',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'geo_tools_relief',
	titleAr: 'الجغرافيا: مظاهر السطح في الجزائر',
	curriculumLessonId: 'his_lesson_3ap_t2_relief_map_elements',
	defaultPoints: 5,
	onecRole: 'pri_geography',
	generate(seed: number, difficulty: Difficulty = 'medium'): HistoryGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				label: 'التمييز بين التضاريس وأمثلتها',
				tableRows: [
					[{ label: 'أراضٍ مرتفعة لها قمم وسفوح مثل جرجرة والأوراس' }, { answer: 'الجبال', mark: '0.75' }],
					[{ label: 'أراضٍ مرتفعة ومستوية السطح في الوسط' }, { answer: 'الهضاب', mark: '0.75' }],
					[{ label: 'أراضٍ منبسطة خصبة مثل متيجة' }, { answer: 'السهول', mark: '0.75' }],
					[{ label: 'أراضٍ شاسعة بالجنوب بها عرق ورق وواحات' }, { answer: 'الصحراء', mark: '0.75' }]
				],
				q2: '2) بمَ يتميز السهل عن الجبل من حيث الشكل والنشاط البشري؟',
				a2: '2) السهل منبسط ومنخفض وخصب فتكثر فيه الزراعة، أما الجبل فمرتفع وله قمم شديدة الانحدار.',
				pairs: [
					{ left: 'جبال جرجرة والأوراس', right: 'الجبال' },
					{ left: 'سهل متيجة ووهران', right: 'السهول' },
					{ left: 'الهضاب العليا', right: 'الهضاب' },
					{ left: 'العرق والرق والواحات', right: 'الصحراء' }
				]
			},
			{
				label: 'ألوان الخريطة ومظاهر السطح',
				tableRows: [
					[{ label: 'اللون الأخضر على الخريطة الطبيعية' }, { answer: 'السهول الخصبة', mark: '0.75' }],
					[{ label: 'اللون البني على الخريطة الطبيعية' }, { answer: 'الجبال والمرتفعات', mark: '0.75' }],
					[{ label: 'اللون الأصفر الفاتح في الجنوب' }, { answer: 'الصحراء', mark: '0.75' }],
					[{ label: 'اللون الأزرق على الخريطة' }, { answer: 'البحار والأودية', mark: '0.75' }]
				],
				q2: '2) اذكر مثالين من التضاريس الموجودة في الجزائر (جبل وسهل).',
				a2: '2) مثال الجبل: جبال جرجرة أو الأوراس أو الهقار. مثال السهل: سهل متيجة أو سهل عنابة.',
				pairs: [
					{ left: 'اللون الأخضر', right: 'السهول' },
					{ left: 'اللون البني', right: 'الجبال' },
					{ left: 'اللون الأصفر', right: 'الصحراء' },
					{ left: 'اللون الأزرق', right: 'البحر والأنهار' }
				]
			},
			{
				label: 'المقارنة بين الهضبة والصحراء والسهل',
				tableRows: [
					[{ label: 'العرق الرملي والرق الصخري' }, { answer: 'مظاهر من الصحراء', mark: '0.75' }],
					[{ label: 'سهل متيجة غرب ووسط البلاد' }, { answer: 'سهل ساحلي خصب', mark: '0.75' }],
					[{ label: 'الهضاب العليا بين الأطلسين' }, { answer: 'هضاب مستوية مرتفعة', mark: '0.75' }],
					[{ label: 'قمم الهقار وجرجرة' }, { answer: 'سلاسل جبلية', mark: '0.75' }]
				],
				q2: '2) ما الفرق بين الجبل والهضبة في الارتفاع وشكل السطح؟',
				a2: '2) الجبل شديد الارتفاع وله قمة، بينما الهضبة أقل ارتفاعا وسطحها مستوٍ واسع.',
				pairs: [
					{ left: 'أرض منبسطة خضراء للزراعة', right: 'السهل' },
					{ left: 'أرض مرتفعة ذات قمة وسفوح', right: 'الجبل' },
					{ left: 'أرض مرتفعة سطحها مستوٍ', right: 'الهضبة' },
					{ left: 'كثبان رملية وواحات نخيل', right: 'الصحراء' }
				]
			}
		];

		const v = rng.pick(variants);
		const shuffledPairs = rng.shuffle(v.pairs);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'مادة الجغرافيا',
			points: 5,
			instruction: 'أجب عن الأسئلة الآتية حول مظاهر السطح في الجزائر:',
			content: [
				{ type: 'text', content: '1) أكمل الجدول الآتي بتحديد المظهر التضاريسي أو دلالته:' },
				buildHistoryTableBlock(['الوصف أو اللون', 'مظهر السطح المناسب'], v.tableRows),
				{ type: 'text', content: v.q2, answer: v.a2, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: 'geo_tools_relief',
			titleAr: `${this.titleAr} — ${v.label}`,
			onecRole: 'pri_geography',
			quizQuestion: {
				type: 'matching',
				questionText: 'اربط كل عنصر أو وصف في العمود الأيمن بمظهر السطح أو اللون المناسب له:',
				questionTextAr: 'اربط كل وصف بمظهر السطح المناسب:',
				questionData: { pairs: shuffledPairs },
				explanation: 'الجبال مرتفعات ذات قمم (بني)، والسهول منبسطة خصبة (أخضر)، والهضاب مستوية مرتفعة، والصحراء بالجنوب.'
			},
			sujetExercise,
			hints: [
				'الجبل له قمة، أما الهضبة فسطحها مستوٍ.',
				'السهل منبسط ومناسب للزراعة ويلوّن بالأخضر.',
				'العرق يعني الكثبان الرملية في الصحراء.'
			],
			solutionStepsAr: [...v.tableRows.map((r) => `${r[0].label}: ${r[1].answer}`), v.a2],
			finalAnswer: v.a2
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 4. الجغرافيا (5 نقاط): عناصر الخريطة الأساسية وقراءتها
// ───────────────────────────────────────────────────────────────────────────────
const tplGeoMapElements: HistoryParameterizedTemplate = {
	id: 'his_tpl_3ap_t2_geo_map_elements',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'geo_tools_relief',
	titleAr: 'الجغرافيا: عناصر الخريطة الأساسية',
	curriculumLessonId: 'his_lesson_3ap_t2_relief_map_elements',
	defaultPoints: 5,
	onecRole: 'pri_geography',
	generate(seed: number, difficulty: Difficulty = 'medium'): HistoryGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				label: 'وظيفة عناصر الخريطة الأربعة',
				q1: '1) عرّف الخريطة تعريفا جغرافيا مبسطا.',
				a1: '1) الخريطة هي رسم مصغر لسطح الأرض أو لجزء منه على ورقة مستوية باستخدام رموز وألوان.',
				tableRows: [
					[{ label: 'العنوان' }, { answer: 'يوضح موضوع الخريطة ومضمونها', mark: '0.75' }],
					[{ label: 'المفتاح' }, { answer: 'يشرح معاني الألوان والرموز في الخريطة', mark: '0.75' }],
					[{ label: 'المقياس' }, { answer: 'يبيّن نسبة تصغير المسافات الحقيقية', mark: '0.75' }],
					[{ label: 'الاتجاه (سهم الشمال)' }, { answer: 'يحدد جهة الشمال لتوجيه الخريطة', mark: '0.75' }]
				],
				quizQ: 'ما العنصر الذي يوضح لنا موضوع الخريطة مثل «خريطة تضاريس الجزائر»؟',
				correctOpt: 'عنوان الخريطة',
				distractors: [
					{ text: 'مقياس الرسم', diagnosticFeedback: 'المقياس يحدد نسبة تصغير المسافات الحقيقية.' },
					{ text: 'سهم الاتجاه', diagnosticFeedback: 'سهم الاتجاه يحدد جهة الشمال الجغرافي.' },
					{ text: 'خط الإطار', diagnosticFeedback: 'الإطار يحيط بالخريطة ولا يذكر موضوعها.' }
				]
			},
			{
				label: 'قراءة الخريطة من لوحة العناصر',
				q1: '1) اذكر العناصر الأربعة الأساسية التي تحتاجها كل خريطة صحيحة.',
				a1: '1) العنوان، المفتاح، المقياس، والاتجاه (وردة الرياح أو سهم الشمال).',
				tableRows: [
					[{ label: 'أين أقرأ موضوع الخريطة؟' }, { answer: 'في العنوان', mark: '0.75' }],
					[{ label: 'كيف أعرف معنى اللون الأخضر والبني؟' }, { answer: 'من المفتاح', mark: '0.75' }],
					[{ label: 'كيف أحسب المسافة الحقيقية بين مدينتين؟' }, { answer: 'باستعمال المقياس', mark: '0.75' }],
					[{ label: 'كيف أحدد الجهات الأربع على الخريطة؟' }, { answer: 'من رمز الاتجاه (الشمال)', mark: '0.75' }]
				],
				quizQ: 'أيُّ عنصر من عناصر الخريطة يُستعمل لحساب المسافة الحقيقية بين مدينتين مصغَّرتين على الورق؟',
				correctOpt: 'مقياس الرسم',
				distractors: [
					{ text: 'عنوان الخريطة', diagnosticFeedback: 'العنوان يدل على موضوع الخريطة فقط.' },
					{ text: 'مفتاح الألوان', diagnosticFeedback: 'المفتاح يفسر الرموز والألوان المستعملة.' },
					{ text: 'رقم الصفحة', diagnosticFeedback: 'رقم الصفحة ليس من العناصر الجغرافية للخريطة.' }
				]
			},
			{
				label: 'تطبيق عملي على خريطة التضاريس',
				q1: '1) لماذا تُرسم الخرائط بمقياس تصغير ولا تُرسم بالحجم الحقيقي للأرض؟',
				a1: '1) لأن مساحة الأرض والبلدان كبيرة جدا ولا يمكن رسمها بأبعادها الحقيقية على ورقة صغيرة.',
				tableRows: [
					[{ label: 'سهم الشمال في زاوية الخريطة' }, { answer: 'الاتجاه', mark: '0.75' }],
					[{ label: 'مربع يوضح الرموز كالجبل والنهر' }, { answer: 'المفتاح', mark: '0.75' }],
					[{ label: 'جملة في الأعلى: خريطة الجزائر' }, { answer: 'العنوان', mark: '0.75' }],
					[{ label: 'مسطرة صغيرة مقسمة بالكيلومترات' }, { answer: 'المقياس', mark: '0.75' }]
				],
				quizQ: 'ماذا يحدث إذا رُسمت خريطة بدون مفتاح؟',
				correctOpt: 'يصعب فهم معاني الألوان والرموز المرسومة عليها',
				distractors: [
					{ text: 'تصبح أكبر حجما من القارة الحقيقية', diagnosticFeedback: 'الحجم يتحكم فيه المقياس وليس المفتاح.' },
					{ text: 'تتحول كلها إلى اللون الأزرق', diagnosticFeedback: 'الألوان تبقى لكننا نعجز عن معرفة دلالاتها.' },
					{ text: 'تدل دائما على جهة الجنوب فقط', diagnosticFeedback: 'الجهة يحددها سهم الشمال ووردة الرياح.' }
				]
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.correctOpt, v.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'مادة الجغرافيا',
			points: 5,
			instruction: 'لاحظ لوحة عناصر الخريطة ثم أجب عن الأسئلة الآتية:',
			content: [
				buildIllustratedFigureBlock('hg_02_compass_directions_map_key', {
					title: 'عناصر الخريطة ووردة الرياح',
					maxHeight: 118,
					width: '62%',
					mode: 'labeled',
					pins: []
				}),
				{ type: 'text', content: v.q1, answer: v.a1, mark: '2' },
				{ type: 'text', content: '2) صل كل عبارة بعنصر الخريطة المناسب في الجدول:' },
				buildHistoryTableBlock(['الدلالة أو المثال', 'عنصر الخريطة'], v.tableRows)
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: 'geo_tools_relief',
			titleAr: `${this.titleAr} — ${v.label}`,
			onecRole: 'pri_geography',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizQ,
				questionTextAr: v.quizQ,
				imageUrl: '/documents/illustrations/history_geo/hg_02_compass_directions_map_key.webp',
				imageCaption: 'عناصر الخريطة الأساسية ووردة الرياح',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الإجابة الصحيحة: ${v.correctOpt}.`
			},
			sujetExercise,
			hints: [
				'العناصر الأساسية الأربعة للخريطة هي: العنوان، المفتاح، المقياس، والاتجاه.',
				'المفتاح يشرح الرموز والألوان، والمقياس يصغّر المسافات.',
				'سهم الشمال يوجه الخريطة نحو الأعلى.'
			],
			solutionStepsAr: [v.a1, ...v.tableRows.map((r) => `${r[0].label}: ${r[1].answer}`)],
			finalAnswer: v.correctOpt
		};
	}
};

export const TEMPLATES_3AP_T2: HistoryParameterizedTemplate[] = [
	tplHistLandmarkHistory,
	tplHistAntiquities,
	tplGeoReliefForms,
	tplGeoMapElements
];
