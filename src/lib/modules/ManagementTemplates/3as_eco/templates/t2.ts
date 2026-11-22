import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	ManagementGeneratedExerciseInstance,
	ManagementParameterizedTemplate
} from '../../types';
import {
	buildCaseStudyBlocks,
	buildManagementDocumentBlock,
	buildManagementTableBlock,
	formatDzd
} from '../../management-helpers';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';

// ============================================================================
// 3AS GE BAC (الاقتصاد والمناجمنت) — Trimester 2: 5 Parameterized Templates
// ============================================================================

// [1] البطالة: حساب معدل البطالة وأنواعها وسياسات علاجها (4 ن)
const tpl3asEcoT2UnemploymentRateTypes: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_3as_eco_t2_unemployment_rate_types',
	grade: '3as_eco',
	trimesterId: 't2',
	domain: 'eco_macro',
	titleAr: 'البطالة: حساب معدل البطالة وأنواعها وسياسات العلاج',
	curriculumLessonId: 'mgt_lesson_3as_eco_t2_unemployment',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const workingAgePop = difficulty === 'easy' ? 20000000 : rng.pick([24000000, 25000000]);
		const activityRate = rng.pick([0.5, 0.48]);
		const activePop = Math.round(workingAgePop * activityRate);
		const unempPct = rng.pick([10, 12, 15]);
		const unemployed = Math.round(activePop * (unempPct / 100));
		const employed = activePop - unemployed;
		const empRateWorkingAge = roundTo((employed / workingAgePop) * 100, 2);

		const rows: Array<Array<{ label?: string; answer?: string; mark?: string; bold?: boolean }>> = [
			[
				{ label: 'السكان في سن العمل (15 إلى 64 سنة)', bold: true },
				{ label: `${formatDzd(workingAgePop)} نسمة` },
				{ answer: 'تشمل الناشطين وغير الناشطين (طلبة، متقاعدون)', mark: '0.25' }
			],
			[
				{ label: 'المشتغلون الفعليون $E$', bold: true },
				{ label: `${formatDzd(employed)} نسمة` },
				{ answer: `معدل التشغيل من سن العمل $= ${empRateWorkingAge}$%`, mark: '0.5' }
			],
			[
				{ label: 'البطالون الباحثون بجدية عن عمل $U$', bold: true },
				{ label: `${formatDzd(unemployed)} نسمة` },
				{ answer: 'عاطلون قادرون ومستعدون حسب معيار BIT', mark: '0.25' }
			],
			[
				{ label: 'السكان الناشطون (القوى العاملة $L$)', bold: true },
				{ answer: `${formatDzd(activePop)} نسمة`, mark: '0.5' },
				{ answer: `معدل النشاط $= ${roundTo(activityRate * 100, 1)}$%`, mark: '0.5' }
			],
			[
				{ label: 'معدل البطالة $u = frac(U, L) times 100$', bold: true },
				{ answer: `${unempPct}%`, mark: '0.75' },
				{ answer: 'نسبة البطالين من الفئة النشيطة', mark: '0.25' }
			]
		];

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: '1) بالاعتماد على المعطيات الديموغرافية والاقتصادية لبلد ما، أكمل جدول مؤشرات سوق العمل الآتي:'
			},
			buildManagementTableBlock(['المؤشر الديموغرافي / الاقتصادي', 'العدد / الحساب', 'التفسير الاقتصادي'], rows),
			{
				type: 'text',
				content:
					'2) حدّد نوع البطالة في كل حالة: (أ) عمال توقفوا مؤقتاً أثناء انتقالهم لوظيفة أخرى؛ (ب) تراجع التوظيف نتيجة كساد اقتصادي عام؛ (ج) موظفون زائدون لا يضيفون إنتاجاً حدياً في مصلحة إدارية؛ ثم اذكر إجراءً نشطاً وإجراءً ساكناً لعلاج البطالة.',
				answer:
					'2) (أ) بطالة احتكاكية؛ (ب) بطالة دورية (ظرفية)؛ (ج) بطالة مقنعة.\nالإجراء النشط: التكوين المهني وإعادة التأهيل وتمويل المؤسسات الناشئة بصيغ إسلامية تشاركية لخلق مناصب شغل. الإجراء الساكن: صرف منحة البطالة والتغطية الاجتماعية لحفظ كرامة الباحث عن عمل مؤقتاً.',
				mark: '1'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '3as_eco',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `بلغ عدد المشتغلين في بلد $${employed}\\text{ شخصاً}$ وعدد البطالين $${unemployed}\\text{ شخصاً}$. احسب معدل البطالة $u$ (بالنسبة المئوية، أدخل الرقم فقط):`,
				questionTextAr: 'احسب معدل البطالة $u$ (%):',
				questionData: {
					answer: unempPct,
					displayTemplate: 'u = ? %',
					variables: [],
					tolerance: 0.1
				},
				explanation: `$$L = ${employed} + ${unemployed} = ${activePop} \\implies u = \\frac{${unemployed}}{${activePop}} \\times 100 = ${unempPct}\\%$$`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'ادرس بيانات سوق العمل التالية وأجب عن الأسئلة بدقة:',
				content
			},
			hints: [
				'السكان الناشطون = المشتغلون + البطالون (الطلبة والمتقاعدون خارج القوة العاملة).',
				'معدل البطالة يُقسم على السكان الناشطين $L$ وليس على إجمالي السكان.',
				'السياسات النشطة تخلق وظائف أو تؤهل الكفاءات، والساكنة تقدم منحاً اجتماعية.'
			],
			solutionStepsAr: [
				`حساب السكان الناشطين $L = ${formatDzd(activePop)}$ ومعدل النشاط (${roundTo(activityRate * 100, 1)}%).`,
				`حساب معدل البطالة $u = \\frac{${unemployed}}{${activePop}} \\times 100 = ${unempPct}\\%$.`,
				'تصنيف البطالة الاحتكاكية والدورية والمقنعة واقتراح سياسة نشطة وأخرى ساكنة.'
			],
			finalAnswer: `${unempPct}`
		};
	}
};

// [2] التضخم: حساب IPC ومعدل التضخم وأنواعه وعلاجه دون ربا (4 ن)
const tpl3asEcoT2InflationCpiRemedies: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_3as_eco_t2_inflation_cpi_remedies',
	grade: '3as_eco',
	trimesterId: 't2',
	domain: 'eco_macro',
	titleAr: 'التضخم: الرقم القياسي للأسعار ومعدل التضخم ووسائل المعالجة',
	curriculumLessonId: 'mgt_lesson_3as_eco_t2_inflation',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const ipc2023 = rng.pick([120, 125, 140]);
		const infRate = difficulty === 'easy' ? 10 : rng.pick([8, 10, 12]);
		const ipc2024 = roundTo(ipc2023 * (1 + infRate / 100), 2);
		const nominalWage = 60000;
		const realWage2024 = roundTo(nominalWage / (1 + infRate / 100), 2);
		const purchasingPowerLossPct = roundTo((1 - 1 / (1 + infRate / 100)) * 100, 2);

		const mcq = buildUniqueMcqOptions(
			`$${infRate}\\%$ (تضخم ظاهر أدى لتراجع القوة الشرائية للأجور الثابتة)`,
			[
				{
					text: `$${roundTo(ipc2024 - ipc2023, 2)}\\%$ (الفرق الحسابي المباشر بين المؤشرين)`,
					diagnosticFeedback: 'خطأ شائع! يجب قسمة الفرق على مؤشر السنة السابقة ثم الضرب في $100$.'
				},
				{
					text: `$${roundTo(((ipc2024 - ipc2023) / ipc2024) * 100, 2)}\\%$ (بالقسمة على مؤشر 2024)`,
					diagnosticFeedback: 'نسبة التطور تُحسب دائماً بالنسبة لمؤشر السنة المرجعية السابقة ($IPC_{2023}$).'
				},
				{
					text: `$${roundTo(ipc2024 - 100, 2)}\\%$ (التضخم السنوي لعام 2024)`,
					diagnosticFeedback: 'هذا هو الارتفاع التراكمي مقارنة بسنة الأساس $100$ وليس التضخم السنوي لسنة $2024$.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			buildManagementDocumentBlock({
				title: 'سند إحصائي: تطور المستوى العام للأسعار والكتلة النقدية',
				text: `أظهر تقرير اقتصادي ارتفاع الرقم القياسي لأسعار الاستهلاك (IPC) من ${ipc2023} نقطة في سنة 2023 إلى ${ipc2024} نقطة في سنة 2024 (باعتبار سنة الأساس 2020 = 100). وقد اقترن هذا الارتفاع بتوسع السيولة النقدية، وارتفاع كلفة بعض المدخلات المستوردة، وممارسات احتكارية في قنوات التوزيع، في حين بقي الأجر الاسمي الشهري لموظف عند ${formatDzd(nominalWage)} دج.`
			}),
			{
				type: 'text',
				content:
					'1) احسب معدل التضخم السنوي $pi$ لسنة 2024، ثم قارنه بمعدل التضخم التراكمي منذ سنة الأساس (2020).',
				answer: `1) معدل التضخم السنوي لسنة 2024: $pi = frac(${ipc2024} - ${ipc2023}, ${ipc2023}) times 100 = ${infRate}$%.\nأما التضخم التراكمي منذ سنة الأساس فهو $${roundTo(ipc2024 - 100, 2)}$%.`,
				mark: '1'
			},
			{
				type: 'text',
				content:
					'2) احسب القيمة الحقيقية للأجر الشهري الثابت ($60\\,000$ دج) مقوماً بأسعار 2023 بعد موجة التضخم، وحدّد الفئات الأكثر تضرراً.',
				answer: `2) الأجر الحقيقي مقارنة بـ 2023 $= frac(${nominalWage}, 1 + ${roundTo(infRate / 100, 2)}) approx ${formatDzd(realWage2024)}$ دج (تراجع القوة الشرائية بنحو $${purchasingPowerLossPct}$%). الفئات الأكثر تضرراً: أصحاب الدخول الثابتة (الأجراء والمتقاعدون) والمدخرون نقداً دون استثمار حقيقي.`,
				mark: '1.25'
			},
			{
				type: 'text',
				content:
					'3) ميّز بين «تضخم جذب الطلب» و«تضخم دفع التكاليف»، ثم اقترح ثلاث وسائل فعالة ومشروعة لمعالجة التضخم بعيداً عن الأدوات الربوية.',
				answer:
					'3) جذب الطلب ينشأ عن فائض الطلب الكلي والسيولة على العرض؛ ودفع التكاليف ينشأ عن ارتفاع أسعار الطاقة والمواد الخام والأجور. وسائل المعالجة المشروعة: (أ) نقدياً: رفع الاحتياطي الإلزامي وتقييد التمويل الاستهلاكي غير المنتج وإصدار صكوك إسلامية لامتصاص السيولة؛ (ب) مالياً: ترشيد الإنفاق العام؛ (ج) حقيقياً: دعم الإنتاج الوطني ومكافحة الاحتكار والمضاربة.',
				mark: '1.75'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '3as_eco',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `ارتفع الرقم القياسي لأسعار الاستهلاك ($IPC$) من $${ipc2023}$ نقطة في سنة $2023$ إلى $${ipc2024}$ نقطة في سنة $2024$. ما قيمة معدل التضخم السنوي في سنة $2024$؟`,
				questionTextAr: 'احسب معدل التضخم السنوي:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `$$\\pi_{2024} = \\frac{${ipc2024} - ${ipc2023}}{${ipc2023}} \\times 100 = ${infRate}\\%$$`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'ادرس السند الإحصائي المرفق وأجب عن الأسئلة الآتية بمنهجية:',
				content
			},
			hints: [
				'معدل التضخم السنوي = $\\frac{IPC_t - IPC_{t-1}}{IPC_{t-1}} \\times 100$.',
				'الأجر الحقيقي يتآكل عندما تبقى الدخول الاسمية ثابتة أمام التضخم.',
				'علاج التضخم المشروع يرتكز على الاحتياطي الإلزامي والصكوك وترشيد الميزانية وزيادة الإنتاج.'
			],
			solutionStepsAr: [
				`حساب معدل التضخم $\\pi = ${infRate}\\%$.`,
				`حساب الأجر الحقيقي ($${formatDzd(realWage2024)}\\text{ دج}$) وتحديد ضرر ذوي الدخل الثابت.`,
				'التمييز بين جذب الطلب ودفع التكاليف وتقديم وسائل المعالجة الخالية من الربا.'
			],
			finalAnswer: `${infRate}%`
		};
	}
};

// [3] القيادة الإدارية: الأساليب والعوامل المؤثرة (4 ن)
const tpl3asEcoT2LeadershipStyles: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_3as_eco_t2_leadership_styles',
	grade: '3as_eco',
	trimesterId: 't2',
	domain: 'man_leadership_control',
	titleAr: 'القيادة الإدارية: مصادر القوة وأساليب القيادة والعوامل المؤثرة',
	curriculumLessonId: 'mgt_lesson_3as_eco_t2_leadership',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'حالة تطبيقية: تحول القيادة في مؤسسة «التقنية المتطورة»',
				facts: `واجه قسم البرمجة في مؤسسة «التقنية المتطورة» الذي يضم 16 مهندساً من ذوي الكفاءة العالية أزمة تأخر المشاريع؛ فقد كان المدير السابق يعتمد الأسلوب الأوتوقراطي المحتكر للقرار والمستند إلى التهديد بالعقوبات الإدارية. عند تعيين مدير جديد حائز على خبرة هندسية واسعة واحترام كبير من الفريق، بادر إلى عقد جلسات تشاركية وتفويض القرارات الفنية للمهندسين، محتفظاً بالحزم الفوري عند تعطل الخوادم الحرجة.`,
				rows: [
					[
						{ label: 'أسلوب المدير السابق وأداته', bold: true },
						{ answer: 'الأوتوقراطي (التسلطي) — قوة شرعية وقوة إكراه', mark: '0.75' }
					],
					[
						{ label: 'أسلوب المدير الجديد ومصدر قوته', bold: true },
						{ answer: 'الديمقراطي التشاركي — قوة الخبرة والقوة المرجعية', mark: '0.75' }
					],
					[
						{ label: 'تصنيف الحزم عند تعطل الخوادم', bold: true },
						{ answer: 'القيادة الموقفية (ضيق الوقت والأزمات يفرض التوجيه الحازم)', mark: '0.75' }
					]
				],
				q3: '2) استنتج ثلاثة عوامل مؤثرة في اختيار أسلوب القيادة ظهرت في الحالة، ثم حدّد موقع الأسلوب الأمثل في الشبكة الإدارية لبليك وموتون.',
				a3: '2) العوامل المؤثرة: (أ) خصائص المرؤوسين (مهندسون ذوو كفاءة عالية يفضلون المشاركة)، (ب) خصائص القائد (الخبرة والثقة بالنفس)، (ج) طبيعة الموقف (ضغط الأزمات التقنية). الأسلوب الأمثل في الشبكة الإدارية هو «قيادة الفريق (9، 9)» الذي يجمع بين أعلى اهتمام بالإنتاج وأعلى اهتمام بالعاملين.',
				ddCategories: ['مصادر القوة الرسمية/التنظيمية', 'مصادر القوة الشخصية/المهنية'],
				ddItems: [
					{ text: 'القوة الشرعية (المركز الوظيفي)', category: 0 },
					{ text: 'قوة الإكراه (فرض العقوبات)', category: 0 },
					{ text: 'قوة الخبرة (الكفاءة العلمية)', category: 1 },
					{ text: 'القوة المرجعية (القدوة والاحترام)', category: 1 }
				]
			},
			{
				title: 'حالة تطبيقية: ضبط الأداء في مصنع لتعبئة التجهيزات الطبية',
				facts: `يشرف رئيس ورشة على 22 عاملاً جُدداً قيد التكوين في خط تعبئة دقيق يتطلب التزاماً صارماً بقواعد السلامة الصحية. أدرك القائد أن ترك العمال دون توجيه (القيادة الحرة) يرفع نسبة الأخطاء، فاعتمد توجيهاً قريباً ومنضبطاً في الأسابيع الأولى مع تشجيع العمال الملتزمين بعلاوات تقديرية وبناء علاقة قدوة وثقة متبادلة، تمهيداً لإشراكهم التدريجي في اقتراح التحسينات.`,
				rows: [
					[
						{ label: 'سبب عدم ملاءمة القيادة الحرة هنا', bold: true },
						{ answer: 'لأن العمال جدد وتجربة السلامة الدقيقة تتطلب تأطيراً وتنسيقاً', mark: '0.75' }
					],
					[
						{ label: 'مصادر القوة المستعملة للتشجيع', bold: true },
						{ answer: 'قوة المكافأة والقوة المرجعية (القدوة والثقة)', mark: '0.75' }
					],
					[
						{ label: 'التدرج المخطط نحو المشاركة', bold: true },
						{ answer: 'الانتقال الموقفي من التوجيهي إلى الديمقراطي مع نضج الفريق', mark: '0.75' }
					]
				],
				q3: '2) قارن بين «القيادة الديمقراطية» و«القيادة الحرة» من حيث دور القائد في اتخاذ القرار، ومتى تصلح القيادة الحرة؟',
				a3: '2) في القيادة الديمقراطية يشارك القائد المرؤوسين في صناعة القرار مع الاحتفاظ بمسؤولية التنسيق والرقابة؛ أما في القيادة الحرة فيفوض القرار بالكامل للفريق مع أدنى تدخل ممكن، ولا تصلح إلا مع مختصين ذوي تأهيل وانضباط ذاتي عالٍ كمخابر البحث العلمي.',
				ddCategories: ['مصادر القوة الرسمية/التنظيمية', 'مصادر القوة الشخصية/المهنية'],
				ddItems: [
					{ text: 'قوة المكافأة (منح العلاوات الرسمية)', category: 0 },
					{ text: 'القوة الشرعية للمدير', category: 0 },
					{ text: 'قوة الخبرة التقنية', category: 1 },
					{ text: 'القوة المرجعية وحسن القدوة', category: 1 }
				]
			}
		];

		const v = rng.pick(variants);
		const content: ContentBlock[] = [
			buildManagementDocumentBlock({
				title: v.title,
				text: v.facts,
				source: 'دراسة حالة في القيادة الإدارية — 3 ثانوي تسيير واقتصاد'
			}),
			{ type: 'text', content: '1) حلّل الحالة التسييرية الآتية بإكمال الجدول الموالي:' },
			buildManagementTableBlock(['عنصر التحليل القيادي', 'التحديد والتبرير من الحالة'], v.rows),
			{
				type: 'text',
				content: v.q3,
				answer: v.a3,
				mark: '1.75'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '3as_eco',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'drag_drop',
				questionText: 'صنّف مصادر قوة القائد الآتية إلى قوة رسمية تنظيمية وقوة شخصية مهنية:',
				questionTextAr: 'اسحب كل مصدر قوة إلى فئته المناسبة:',
				questionData: {
					categories: v.ddCategories,
					items: rng.shuffle(v.ddItems)
				},
				explanation:
					'تنقسم مصادر قوة القائد إلى مصادر تنظيمية (شرعية، مكافأة، إكراه) ومصادر شخصية (الخبرة، المرجعية والقدوة).'
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'ادرس الحالة الإدارية الآتية وأجب عن المطلوب بدقة:',
				content
			},
			hints: [
				'القيادة الديمقراطية توازن بين الشورى وتوجيه القائد؛ والقيادة الحرة تمنح حرية شبه كاملة.',
				'قوة الخبرة والقدوة تستمران حتى خارج الإطار الرسمي الضيق للمنصب.',
				'العوامل الموقفية تشمل القائد، المرؤوسين، وطبيعة المهمة والزمن.'
			],
			solutionStepsAr: [
				'تشخيص الأساليب القيادية ومصادر القوة في الجدول.',
				'تحديد العوامل الموقفية المؤثرة وتفسير التحول القيادي.',
				'الربط مع الشبكة الإدارية (9، 9) والمقارنة بين الديمقراطية والحرة.'
			],
			finalAnswer: v.ddItems.map((it) => `${it.text}: ${v.ddCategories[it.category]}`).join(' | ')
		};
	}
};

// [4] الاتصال الإداري والدافعية والتحفيز في المؤسسة (4 ن)
const tpl3asEcoT2CommunicationMotivation: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_3as_eco_t2_communication_motivation',
	grade: '3as_eco',
	trimesterId: 't2',
	domain: 'man_leadership_control',
	titleAr: 'الاتصال الإداري ونظريات الدافعية (ماسلو، هيرزبرغ، ماكغريغور)',
	curriculumLessonId: 'mgt_lesson_3as_eco_t2_communication_motivation',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const turnoverPct = difficulty === 'easy' ? 18 : rng.pick([22, 26, 30]);

		const caseBlocks = buildCaseStudyBlocks({
			title: 'دراسة حالة: أزمة الدافعية والتواصل في مؤسسة «الإتقان للخدمات الرقمية»',
			facts: `سجّلت مؤسسة «الإتقان» معدل استقالات مرتفعاً بلغ ${turnoverPct}% بين المبرمجين رغم توفر رواتب شهرية منتظمة ومكاتب مكيفة ومريحة. وعند تحليل المشكلة تبيّن أن المدير يرى أن الموظفين يتكاسلون تلقائياً ولا يعملون إلا تحت المراقبة اللصيقة، ولا يُبلغونه بأفكارهم بسبب غياب قنوات اتصال صاعدة، كما يغيب التقدير المعنوي وآفاق الترقية والمشاركة في أرباح المشاريع الناجحة.`,
			questions: [
				{
					q: '1) فسّر سبب استمرار استقالات المبرمجين رغم توفر المكاتب المريحة والأجور المنتظمة وفق نظرية العاملين لهيرزبرغ.',
					a: '1) حسب هيرزبرغ، الأجر الثابت والمكاتب المريحة «عوامل وقائية (صحية)» تمنع التذمر المادي فقط لكنها لا تخلق التحفيز الحقيقي؛ أما ما ينقص المؤسسة فهو «العوامل الدافعة» كالتقدير، المسؤولية، الإنجاز، وفرص الترقية والنمو.',
					mark: '1.5'
				},
				{
					q: '2) حدّد نظرية ماكغريغور التي يتبناها المدير الحالي، ثم بيّن ما يقابلها في النظرية البديلة.',
					a: '2) يتبنى المدير افتراضات نظرية X (المتشائمة) التي تفترض كسل العامل وتشدد على الرقابة الصارمة؛ والمطلوب التحول إلى نظرية Y التي تثق في حب الموظف للإبداع وتحمل المسؤولية متى توفرت الثقة والتحفيز.',
					mark: '1.25'
				},
				{
					q: '3) اقترح إجراءين في الاتصال الإداري وحافزين (مادياً حلالاً ومعنوياً) يوافقان المستويات العليا في هرم ماسلو.',
					a: '3) في الاتصال: إنشاء قناة اتصال صاعدة (لقاءات استماع وصندوق مقترحات بتغذية راجعة منتظمة) وتنشيط الاتصال الأفقي بين فرق العمل. في التحفيز: حافز مادي حلال عبر نظام مشاركة في أرباح المشاريع المنجزة، وحافز معنوي كالتكريم والترقية والتفويض لإشباع حاجتي التقدير وتحقيق الذات في هرم ماسلو.',
					mark: '1.25'
				}
			]
		});

		return {
			templateId: this.id,
			seed,
			grade: '3as_eco',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'matching',
				questionText: 'اربط كل نظرية أو مفهوم في الدافعية والاتصال بالعبارة المطابقة له:',
				questionTextAr: 'صل بين النظرية ومضمونها الصحيح:',
				questionData: {
					pairs: [
						{ left: 'العوامل الوقائية (هيرزبرغ)', right: 'الأجر الأساسي وظروف العمل تمنع الاستياء فقط' },
						{ left: 'العوامل الدافعة (هيرزبرغ)', right: 'التقدير والإنجاز والترقية تصنع التحفيز الحقيقي' },
						{ left: 'قمة هرم ماسلو', right: 'حاجة تحقيق الذات والإبداع المهني' },
						{ left: 'نظرية $Y$ لماكغريغور', right: 'العمل نشاط طبيعي والموظف يبادر عند وجود الثقة' }
					]
				},
				explanation:
					'تتكامل نظريات ماسلو وهيرزبرغ وماكغريغور في تفسير الانتقال من تلبية الحاجات المادية إلى إشباع التقدير والمسؤولية والاتصال المفتوح.'
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'ادرس الحالة الآتية وأجب عن الأسئلة الثلاثة باستحضار نظريات الدافعية والاتصال:',
				content: caseBlocks
			},
			hints: [
				'ميّز في نظرية هيرزبرغ بين ما يمنع الاستياء (الوقائية) وما يحفز فعلياً (الدافعة).',
				'نظرية X تقابل الإدارة المتسلطة، ونظرية Y تقابل الإدارة التشاركية.',
				'المستويات العليا في سلم ماسلو هي التقدير وتحقيق الذات.'
			],
			solutionStepsAr: [
				'تشخيص غياب العوامل الدافعة عند هيرزبرغ مقابل توفر العوامل الوقائية.',
				'تحديد نظرية X والدعوة للتحول إلى نظرية Y.',
				'اقتراح حلول الاتصال الصاعد والأفقي والحوافز المادية الحلال والمعنوية.'
			],
			finalAnswer: 'نظرية هيرزبرغ (غياب العوامل الدافعة) + التحول من X إلى Y + اتصال صاعد وحوافز مشاركة وتقدير'
		};
	}
};

// [5] وضعية إدماجية: البطالة والتضخم والقيادة والتحفيز (8 ن)
const tpl3asEcoT2IntegrationMacroMan: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_3as_eco_t2_integration_macro_man',
	grade: '3as_eco',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'وضعية إدماجية للبكالوريا (T2): البطالة والتضخم والقيادة والتحفيز',
	curriculumLessonId: 'mgt_lesson_3as_eco_t2_communication_motivation',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const employedM = difficulty === 'easy' ? 11.4 : rng.pick([10.8, 11.2, 12.6]);
		const unemployedM = difficulty === 'easy' ? 0.6 : rng.pick([1.2, 1.4, 1.4]);
		const activeM = roundTo(employedM + unemployedM, 2);
		const uRate = roundTo((unemployedM / activeM) * 100, 2);

		const ipc0 = 125;
		const ipc1 = rng.pick([135, 140]);
		const piRate = roundTo(((ipc1 - ipc0) / ipc0) * 100, 2);

		const content: ContentBlock[] = [
			buildManagementDocumentBlock({
				title: 'وضعية إدماجية للبكالوريا — الفصل الثاني (الاقتصاد الكلي والمناجمنت)',
				text: `في اقتصاد وطنٍ ما، بلغ عدد المشتغلين ${employedM} مليون شخص، وعدد البطالين الباحثين بجد عن عمل ${unemployedM} مليون شخص، كما انتقل الرقم القياسي العام لأسعار الاستهلاك (IPC) من ${ipc0} نقطة إلى ${ipc1} نقطة خلال سنة واحدة، مما خلق ضغطاً على الأجور الحقيقية. وفي سياق متصل، تواجه مؤسسة صناعية كبرى بطالة مقنعة في بعض مكاتبها مع تذمر المهندسين من ضعف التواصل الصاعد واتباع مديرها أسلوباً أوتوقراطياً يعتمد على الرقابة الشكلية والعقاب دون تقدير للكفاءات.`,
				source: 'وضعية تقويمية شاملة للبكالوريا — الفصل الثاني'
			}),
			{
				type: 'text',
				content:
					'1) احسب عدد السكان الناشطين (بالمليون) ومعدل البطالة $u$، ثم احسب معدل التضخم السنوي $pi$ وبيّن أثر هذا التضخم في القوة الشرائية للأجراء.',
				answer: `1) السكان الناشطون $L = ${employedM} + ${unemployedM} = ${activeM}$ مليون شخص.\nمعدل البطالة $u = frac(${unemployedM}, ${activeM}) times 100 = ${uRate}$%.\nمعدل التضخم $pi = frac(${ipc1} - ${ipc0}, ${ipc0}) times 100 = ${piRate}$%، مما يؤدي لتآكل الأجر الحقيقي والقدرة الشرائية لأصحاب المداخيل الثابتة ما لم تواكبه زيادة إنتاجية أو مراجعة عادلة للأجور.`,
				mark: '2.5'
			},
			{
				type: 'text',
				content:
					'2) اشرح معنى «البطالة المقنعة» الواردة في النص، وقدّم سياستين حلال لعلاج كل من البطالة والتضخم في آنٍ واحد دون ربا.',
				answer:
					'2) البطالة المقنعة هي وجود فائض عمالي في مناصب عمل بحيث لو سُحب جزء منهم لن ينخفض الإنتاج الكلي. لعلاج البطالة والتضخم معاً (دون ربا): تنشيط الاستثمار الإنتاجي الحقيقي عبر التمويل التشاركي الحلال (المشاركة والمرابحة الإنتاجية) والتكوين التحويلي لإعادة توظيف الفائض في ورشات منتجة، مع ضبط السيولة بالاحتياطي الإلزامي والصكوك لامتصاص التضخم.',
				mark: '2.5'
			},
			{
				type: 'text',
				content:
					'3) شخصّ أسلوب القيادة والخلل الاتصالي في المؤسسة، واقترح خطة تصحيحية توظف نظرية هيرزبرغ وسلم ماسلو.',
				answer:
					'3) يمارس المدير القيادة الأوتوقراطية (قوة إكراه) مع انقطاع الاتصال الصاعد. خطة التصحيح: (أ) التحول للقيادة الديمقراطية التشاركية (9، 9) وفتح قنوات اتصال صاعد وأفقي بتغذية راجعة؛ (ب) تطبيق عوامل هيرزبرغ الدافعة (الترقية بالكفاءة، التفويض، تقدير المبادرات) وربط حوافز مالية حلال برفع الإنتاجية وإشباع مستويات التقدير وتحقيق الذات في هرم ماسلو.',
				mark: '3'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '3as_eco',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `إذا بلغ عدد المشتغلين $${employedM}\\text{ مليون}$ وعدد البطالين $${unemployedM}\\text{ مليون}$ في بلد ما، احسب معدل البطالة $u$ (بالنسبة المئوية):`,
				questionTextAr: 'احسب معدل البطالة $u$ (%):',
				questionData: {
					answer: uRate,
					displayTemplate: 'u = ? %',
					variables: [],
					tolerance: 0.2
				},
				explanation: `$$L = ${employedM} + ${unemployedM} = ${activeM} \\implies u = \\frac{${unemployedM}}{${activeM}} \\times 100 = ${uRate}\\%$$`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية للبكالوريا (08 نقاط)',
				points: this.defaultPoints,
				instruction: 'ادرس الوضعية الاقتصادية والإدارية الشاملة الآتية وأجب عن الأسئلة الثلاثة:',
				content
			},
			hints: [
				'اجمع المشتغلين والبطالين للحصول على $L$ قبل حساب معدل البطالة.',
				'حلول التضخم والبطالة يجب أن تجمع بين زيادة الإنتاج وضبط السيولة دون ربا.',
				'استثمر هرم ماسلو ونظرية هيرزبرغ والشبكة الإدارية في المحور الإداري.'
			],
			solutionStepsAr: [
				`حساب $L = ${activeM}\\text{ مليون}$، $u = ${uRate}\\%$، ومعدل التضخم $\\pi = ${piRate}\\%$.`,
				'تعريف البطالة المقنعة ووضع سياسة تكاملية غير ربوية لعلاج البطالة والتضخم.',
				'تشخيص القيادة الأوتوقراطية ووضع خطة تحفيز واتصال وفق هيرزبرغ وماسلو.'
			],
			finalAnswer: `${uRate}`
		};
	}
};

export const TEMPLATES_3AS_ECO_T2: ManagementParameterizedTemplate[] = [
	tpl3asEcoT2UnemploymentRateTypes,
	tpl3asEcoT2InflationCpiRemedies,
	tpl3asEcoT2LeadershipStyles,
	tpl3asEcoT2CommunicationMotivation,
	tpl3asEcoT2IntegrationMacroMan
];
