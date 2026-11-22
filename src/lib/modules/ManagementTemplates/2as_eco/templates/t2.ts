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
import {
	buildIllustratedFigureBlock,
	getIllustrationWebpUrl
} from '../../../VisualAssets/illustrations-registry';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';

// ============================================================================
// 2AS GE (الاقتصاد والمناجمنت) — Trimester 2: 5 Parameterized Templates
// ============================================================================

// [1] توازن السوق وقانون العرض والطلب (4 ن) — يستخدم mgt_02_supply_demand_equilibrium
const tpl2asEcoT2MarketEquilibrium: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_2as_eco_t2_market_equilibrium',
	grade: '2as_eco',
	trimesterId: 't2',
	domain: 'eco_micro',
	titleAr: 'توازن السوق وقانون العرض والطلب والفائض والعجز',
	curriculumLessonId: 'mgt_lesson_2as_eco_t2_market_supply_demand',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const pStar = difficulty === 'easy' ? rng.pick([30, 40, 50]) : rng.pick([35, 45, 60]);
		const b = rng.pick([2, 3]);
		const d = rng.pick([1, 2]);
		const qStar = rng.pick([80, 100, 120]);
		const a = qStar + b * pStar;
		const c = qStar - d * pStar;
		// Ensure c >= 0 cleanly
		const safeC = Math.max(10, c);
		const safeQStar = safeC + d * pStar;
		const safeA = safeQStar + b * pStar;

		const pHigh = pStar + 10;
		const qdHigh = safeA - b * pHigh;
		const qoHigh = safeC + d * pHigh;
		const surplus = qoHigh - qdHigh;

		const pLow = pStar - 10;
		const qdLow = safeA - b * pLow;
		const qoLow = safeC + d * pLow;
		const shortage = qdLow - qoLow;

		const rows: Array<Array<{ label?: string; answer?: string; mark?: string; bold?: boolean }>> = [
			[
				{ label: `${pLow} دج`, bold: true },
				{ answer: `${qdLow} وحدة`, mark: '0.25' },
				{ answer: `${qoLow} وحدة`, mark: '0.25' },
				{ answer: `فائض طلب (عجز) بـ ${shortage} وحدة`, mark: '0.5' }
			],
			[
				{ label: `${pStar} دج`, bold: true },
				{ answer: `${safeQStar} وحدة`, mark: '0.25' },
				{ answer: `${safeQStar} وحدة`, mark: '0.25' },
				{ answer: 'حالة توازن السوق ($Q_d = Q_o$)', mark: '0.5' }
			],
			[
				{ label: `${pHigh} دج`, bold: true },
				{ answer: `${qdHigh} وحدة`, mark: '0.25' },
				{ answer: `${qoHigh} وحدة`, mark: '0.25' },
				{ answer: `فائض عرض بـ ${surplus} وحدة`, mark: '0.5' }
			]
		];

		const mcq = buildUniqueMcqOptions(
			`$P^* = ${pStar}\\text{ دج}$ و $Q^* = ${safeQStar}\\text{ وحدة}$`,
			[
				{
					text: `$P^* = ${pHigh}\\text{ دج}$ و $Q^* = ${qoHigh}\\text{ وحدة}$`,
					diagnosticFeedback: 'عند هذا السعر يوجد فائض عرض، والكمية المعروضة أكبر من المطلوبة.'
				},
				{
					text: `$P^* = ${pLow}\\text{ دج}$ و $Q^* = ${qdLow}\\text{ وحدة}$`,
					diagnosticFeedback: 'عند هذا السعر يوجد عجز في السوق لأن الكمية المطلوبة تفوق المعروضة.'
				},
				{
					text: `$P^* = ${pStar + 5}\\text{ دج}$ و $Q^* = ${safeQStar + 10}\\text{ وحدة}$`,
					diagnosticFeedback: 'راجع حل المعادلة $Q_d = Q_o$ بجمع معاملات السعر $P$ بدقة.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			buildIllustratedFigureBlock('mgt_02_supply_demand_equilibrium', {
				title: 'تمثيل منحنيي الطلب والعرض ونقطة التوازن في السوق',
				mode: 'image_only',
				pins: [],
				width: '62%',
				maxHeight: 130,
				caption: 'يتحدد التوازن عند تقاطع منحنى الطلب (D) ومنحنى العرض (O)'
			}),
			{
				type: 'text',
				content: `في سوق سلعة غذائية وطنية، تُعطى دالة الطلب بدلالة السعر $P$ بالعلاقة $Q_d = ${safeA} - ${b}P$، ودالة العرض بالعلاقة $Q_o = ${safeC} + ${d}P$.\n1) احسب جبرياً سعر التوازن $P^*$ وكمية التوازن $Q^*$.`,
				answer: `1) شرط التوازن: $Q_d = Q_o ==>\n${safeA} - ${b}P = ${safeC} + ${d}P ==>\n${safeA - safeC} = ${b + d}P ==>\nP^* = frac(${safeA - safeC}, ${b + d}) = ${pStar}$ دج.\nبالتعويض: $Q^* = ${safeC} + ${d} times ${pStar} = ${safeQStar}$ وحدة.`,
				mark: '1'
			},
			{
				type: 'text',
				content: '2) أكمل جدول حالات السوق الآتي عند مستويات الأسعار المقترحة:'
			},
			buildManagementTableBlock(
				['السعر $P$', 'الكمية المطلوبة $Q_d$', 'الكمية المعروضة $Q_o$', 'وضعية السوق'],
				rows
			)
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_eco',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `تُعطى دالتا الطلب والعرض لسلعة بالعلاقتين: $Q_d = ${safeA} - ${b}P$ و $Q_o = ${safeC} + ${d}P$. ما هما سعر التوازن $P^*$ وكمية التوازن $Q^*$؟`,
				questionTextAr: 'اختر إحداثيي نقطة توازن السوق:',
				imageUrl: getIllustrationWebpUrl('mgt_02_supply_demand_equilibrium'),
				imageCaption: 'منحنى العرض والطلب ونقطة التوازن',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `بتسوية $Q_d = Q_o$: $${safeA} - ${b}P = ${safeC} + ${d}P \\implies ${b + d}P = ${safeA - safeC} \\implies P^* = ${pStar}\\text{ دج}$ و $Q^* = ${safeQStar}\\text{ وحدة}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'ادرس دالتي العرض والطلب والشكل المرفق ثم أجب عن الأسئلة الآتية:',
				content
			},
			hints: [
				'يتحقق التوازن عند تساوي الكمية المطلوبة مع الكمية المعروضة ($Q_d = Q_o$).',
				'إذا كان السعر أعلى من $P^*$ تكون $Q_o > Q_d$ (فائض عرض).',
				'إذا كان السعر أقل من $P^*$ تكون $Q_d > Q_o$ (عجز / فائض طلب).'
			],
			solutionStepsAr: [
				`حل المعادلة $${safeA} - ${b}P = ${safeC} + ${d}P$ لإيجاد $P^* = ${pStar}\\text{ دج}$.`,
				`حساب كمية التوازن $Q^* = ${safeQStar}$ وحدة.`,
				`إكمال جدول السوق: عجز $${shortage}$ عند $${pLow}\\text{ دج}$ وفائض عرض $${surplus}$ عند $${pHigh}\\text{ دج}$.`
			],
			finalAnswer: `$P^* = ${pStar}\\text{ دج}$ و $Q^* = ${safeQStar}\\text{ وحدة}$`
		};
	}
};

// [2] مرونة الطلب السعرية والدخلية والتقاطعية ومرونة العرض (4 ن)
const tpl2asEcoT2DemandSupplyElasticity: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_2as_eco_t2_demand_supply_elasticity',
	grade: '2as_eco',
	trimesterId: 't2',
	domain: 'eco_micro',
	titleAr: 'حساب وتفسير مرونات الطلب والعرض',
	curriculumLessonId: 'mgt_lesson_2as_eco_t2_elasticities',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const p1 = rng.pick([100, 200]);
		const p2 = p1 === 100 ? (difficulty === 'easy' ? 80 : 120) : difficulty === 'easy' ? 160 : 240;
		const pctP = roundTo(((p2 - p1) / p1) * 100, 2); // +/- 20%
		const epTarget = rng.pick([-1.5, -2.0, -0.5]);
		const pctQ = roundTo(epTarget * pctP, 2);
		const q1 = rng.pick([500, 1000]);
		const q2 = Math.round(q1 * (1 + pctQ / 100));
		const absEp = Math.abs(epTarget);
		const epNature =
			absEp > 1 ? 'طلب مرن ($|E_p| > 1$)' : absEp < 1 ? 'طلب غير مرن ($|E_p| < 1$)' : 'متكافئ المرونة';

		const r1 = 60000;
		const r2 = 75000; // +25%
		const erTarget = rng.pick([1.6, 0.4, -0.4]);
		const qR1 = 100;
		const qR2 = Math.round(qR1 * (1 + erTarget * 0.25));
		const erNature =
			erTarget > 1 ? 'سلعة عادية كمالية ($E_R > 1$)' : erTarget > 0 ? 'سلعة عادية ضرورية ($0 < E_R <= 1$)' : 'سلعة دنيا/رديئة ($E_R < 0$)';

		const qo1 = 400;
		const eoTarget = rng.pick([1.25, 0.75]);
		const qo2 = Math.round(qo1 * (1 + eoTarget * (Math.abs(pctP) / 100)));
		const pSupply2 = Math.round(p1 * (1 + Math.abs(pctP) / 100));

		const rows: Array<Array<{ label?: string; answer?: string; mark?: string; bold?: boolean }>> = [
			[
				{ label: 'مرونة الطلب السعرية $E_p$', bold: true },
				{ label: `انتقال السعر من $${p1}$ إلى $${p2}$ دج والكمية من $${q1}$ إلى $${q2}$` },
				{ answer: `$E_p = ${epTarget}$`, mark: '0.5' },
				{ answer: epNature, mark: '0.5' }
			],
			[
				{ label: 'مرونة الطلب الدخلية $E_R$', bold: true },
				{ label: `انتقال الدخل من $${r1}$ إلى $${r2}$ دج والكمية من $${qR1}$ إلى $${qR2}$` },
				{ answer: `$E_R = ${erTarget}$`, mark: '0.5' },
				{ answer: erNature, mark: '0.5' }
			],
			[
				{ label: 'مرونة العرض السعرية $E_o$', bold: true },
				{ label: `ارتفاع السعر من $${p1}$ إلى $${pSupply2}$ دج والكمية المعروضة من $${qo1}$ إلى $${qo2}$` },
				{ answer: `$E_o = +${eoTarget}$`, mark: '0.5' },
				{ answer: eoTarget > 1 ? 'عرض مرن ($E_o > 1$)' : 'عرض غير مرن ($E_o < 1$)', mark: '0.5' }
			]
		];

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: '1) احسب المرونات المطلوبة في الجدول الآتي وحدد طبيعة الطلب أو السلعة أو العرض:'
			},
			buildManagementTableBlock(
				['نوع المرونة', 'المعطيات الاقتصادية', 'قيمة المرونة', 'التفسير الاقتصادي'],
				rows
			),
			{
				type: 'text',
				content:
					'2) قارن رقم أعمال المؤسسة ($P times Q$) للسلعة الأولى قبل تغير السعر وبعده، واستنتج القاعدة التسويقية الرابطة بين مرونة الطلب السعرية ورقم الأعمال.',
				answer: `2) رقم الأعمال الأول: $${p1} times ${q1} = ${formatDzd(p1 * q1)}$ دج. رقم الأعمال الثاني: $${p2} times ${q2} = ${formatDzd(p2 * q2)}$ دج. القاعدة: إذا كان الطلب مرناً ($|E_p| > 1$) فإن خفض السعر يرفع رقم الأعمال، أما إذا كان غير مرن ($|E_p| < 1$) فإن رفع السعر هو الذي يرفع رقم الأعمال.`,
				mark: '1'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_eco',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `انتقل سعر سلعة من $${p1}\\text{ دج}$ إلى $${p2}\\text{ دج}$، فتغيرت الكمية المطلوبة من $${q1}$ إلى $${q2}$ وحدة. احسب مرونة الطلب السعرية $E_p$ (أدخل العدد بإشارته):`,
				questionTextAr: 'احسب مرونة الطلب السعرية $E_p$:',
				questionData: {
					answer: epTarget,
					displayTemplate: 'E_p = ?',
					variables: [],
					tolerance: 0.05
				},
				explanation: `$$E_p = \\frac{(${q2} - ${q1})/${q1}}{(${p2} - ${p1})/${p1}} = \\frac{${pctQ}\\%}{${pctP}\\%} = ${epTarget}$$`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'اعتماداً على بيانات السوق المبيّنة في الجدول، أجب عما يلي:',
				content
			},
			hints: [
				'المرونة تساوي التغير النسبي في الكمية مقسوماً على التغير النسبي في السعر أو الدخل.',
				'نحكم على مرونة الطلب السعرية بأخذ القيمة المطلقة $|E_p|$.',
				'في المرونة الدخلية $E_R$: السالبة تعني سلعة دنيا، وبين 0 و1 ضرورية، وفوق 1 كمالية.'
			],
			solutionStepsAr: [
				`حساب $E_p = \\frac{${pctQ}\\%}{${pctP}\\%} = ${epTarget}$.`,
				`حساب $E_R = ${erTarget}$ وتصنيف السلعة، وحساب $E_o = +${eoTarget}$.`,
				`حساب رقم الأعمال قبل ($${formatDzd(p1 * q1)}$) وبعد ($${formatDzd(p2 * q2)}$) وتفسير الأثر.`
			],
			finalAnswer: `${epTarget}`
		};
	}
};

// [3] المؤسسة الاقتصادية: تصنيفها وهيكلها التنظيمي (4 ن)
const tpl2asEcoT2EnterpriseClassificationOrg: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_2as_eco_t2_enterprise_classification_org',
	grade: '2as_eco',
	trimesterId: 't2',
	domain: 'man_functions',
	titleAr: 'دراسة حالة: تصنيف المؤسسة الاقتصادية وهيكلها التنظيمي',
	curriculumLessonId: 'mgt_lesson_2as_eco_t2_enterprise_structure',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'دراسة حالة: مؤسسة «الصحراء للطاقة الشمسية»',
				facts: `تأسست مؤسسة «الصحراء للطاقة الشمسية» بولاية ورقلة برأسمال مختلط (60% لمؤسسة عمومية و40% لشركاء خواص) بهدف تصنيع الألواح الكهروضوئية وبيعها في السوق الوطنية. تشغل المؤسسة حالياً 180 عاملاً، وتتوزع مديرياتها تحت إشراف المدير العام إلى: مديرية التموين، مديرية الإنتاج، مديرية التسويق، ومديرية المالية والمحاسبة.`,
				legalType: 'مؤسسة مختلطة (قطاع عام + قطاع خاص)',
				sectorType: 'مؤسسة صناعية (القطاع الثانوي)',
				sizeType: 'مؤسسة متوسطة (من 50 إلى 249 عاملاً)',
				structType: 'هيكل تنظيمي وظيفي (تقسيم حسب الوظائف)',
				qAdv: '3) اذكر ميزتين اثنتين للهيكل التنظيمي المعتمد في هذه المؤسسة، ثم بيّن متى يُنصح بالتحول إلى الهيكل القطاعي.',
				aAdv: '3) مزايا الهيكل الوظيفي: تعميق التخصص المهني، وتقليص ازدواجية الموارد والتكاليف، وسهولة الرقابة المركزية. ويُنصح بالتحول إلى الهيكل القطاعي (الأقسام) عندما تتوسع المؤسسة وتُنتج خطوط منتجات متعددة جداً أو تفتح فروعاً جهوية مستقلة.',
				ddCategories: ['التصنيف حسب الحجم', 'التصنيف حسب النشاط الاقتصادي', 'التصنيف حسب المعيار القانوني'],
				ddItems: [
					{ text: 'مؤسسة متوسطة (180 عاملاً)', category: 0 },
					{ text: 'مؤسسة مصغرة (6 عمال)', category: 0 },
					{ text: 'مؤسسة صناعية تحويلية', category: 1 },
					{ text: 'مؤسسة مختلطة (عام وخاص)', category: 2 }
				]
			},
			{
				title: 'دراسة حالة: شركة «الأوراس للخدمات اللوجستية والنقل»',
				facts: `تُعد شركة «الأوراس للنقل» شركة مساهمة مملوكة بالكامل لمستثمرين خواص، تقدم خدمات النقل المبرّد للمواد الغذائية عبر التراب الوطني، وتشغل 320 موظفاً وسائقاً. نظراً لاتساع نشاطها عبر ثلاث جهات (الشرق، الوسط، الغرب)، أنشأت إدارة عامة تتفرع عنها ثلاث وحدات إقليمية مستقلة لكل منها مصلحة تموين وتسويق وصيانة خاصة بها.`,
				legalType: 'مؤسسة خاصة (شركة أموال / مساهمة)',
				sectorType: 'مؤسسة خدمية (القطاع الثالثي)',
				sizeType: 'مؤسسة كبيرة (250 عاملاً فأكثر)',
				structType: 'هيكل تنظيمي قطاعي/جغرافي (حسب المناطق)',
				qAdv: '3) اذكر ميزتين اثنتين للهيكل القطاعي المعتمد في شركة «الأوراس»، وميّز بين المؤسسة الاقتصادية والإدارة العمومية.',
				aAdv: '3) مزايا الهيكل القطاعي: سرعة الاستجابة لخصوصيات كل منطقة جغرافية، ووضوح مسؤولية كل فرع عن نتائجه. الفرق الجوهري: المؤسسة الاقتصادية تنتج سلعاً وخدمات سوقية تباع بسعر لتحقيق الربح المشروع، بينما الإدارة العمومية تقدم خدمات عمومية غير تجارية.',
				ddCategories: ['التصنيف حسب الحجم', 'التصنيف حسب النشاط الاقتصادي', 'التصنيف حسب المعيار القانوني'],
				ddItems: [
					{ text: 'مؤسسة كبيرة (320 عاملاً)', category: 0 },
					{ text: 'مؤسسة صغيرة (28 عاملاً)', category: 0 },
					{ text: 'مؤسسة خدمية ونقل', category: 1 },
					{ text: 'مؤسسة خاصة (شركة مساهمة)', category: 2 }
				]
			}
		];

		const v = rng.pick(variants);
		const rows: Array<Array<{ label?: string; answer?: string; mark?: string; bold?: boolean }>> = [
			[{ label: 'المعيار القانوني (الملكية)', bold: true }, { answer: v.legalType, mark: '0.75' }],
			[{ label: 'معيار النشاط الاقتصادي', bold: true }, { answer: v.sectorType, mark: '0.75' }],
			[{ label: 'معيار الحجم (التشريع الجزائري)', bold: true }, { answer: v.sizeType, mark: '0.75' }],
			[{ label: 'نوع الهيكل التنظيمي', bold: true }, { answer: v.structType, mark: '0.75' }]
		];

		const content: ContentBlock[] = [
			buildManagementDocumentBlock({
				title: v.title,
				text: v.facts,
				source: 'دراسة حالة تطبيقية في اقتصاد المؤسسة — 2 ثانوي'
			}),
			{ type: 'text', content: '1) صنّف المؤسسة وحدّد هيكلها التنظيمي في الجدول التالي:' },
			buildManagementTableBlock(['معيار التصنيف / التنظيم', 'التحديد الدقيق من الحالة'], rows),
			{
				type: 'text',
				content: v.qAdv,
				answer: v.aAdv,
				mark: '1'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_eco',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'drag_drop',
				questionText: 'صنّف كل وصف للمؤسسات الآتية في معيار التصنيف الصحيح:',
				questionTextAr: 'اسحب كل بطاقة إلى معيارها التصنيفي:',
				questionData: {
					categories: v.ddCategories,
					items: rng.shuffle(v.ddItems)
				},
				explanation:
					'تُصنف المؤسسات وفق المعايير الثلاثة: القانوني (الملكية)، الاقتصادي (طبيعة النشاط)، والحجم (عدد العمال).'
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'ادرس الحالة المرفقة ثم أجب عن المطلوب بمنهجية:',
				content
			},
			hints: [
				'حسب التشريع الجزائري: مصغرة (1-9)، صغيرة (10-49)، متوسطة (50-249)، كبيرة (250 فأكثر).',
				'تأمل هل التقسيم الإداري قائم على التخصص الوظيفي أم على المناطق والمنتجات.',
				'الربط بين القطاع الأولي (فلاحة) والثانوي (صناعة) والثالثي (تجارة وخدمات).'
			],
			solutionStepsAr: [
				`تحديد التصنيف القانوني (${v.legalType}) والنشاط (${v.sectorType}) والحجم (${v.sizeType}).`,
				`تحديد نوع الهيكل التنظيمي (${v.structType}).`,
				'إبراز مزايا الهيكل المعتمد وشروط تطوره.'
			],
			finalAnswer: `${v.legalType} | ${v.sectorType} | ${v.sizeType} | ${v.structType}`
		};
	}
};

// [4] وظائف المؤسسة الاقتصادية: التموين والإنتاج والتسويق (4 ن)
const tpl2asEcoT2SupplyProdMarketing: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_2as_eco_t2_supply_prod_marketing',
	grade: '2as_eco',
	trimesterId: 't2',
	domain: 'man_functions',
	titleAr: 'وظائف المؤسسة: التموين والإنتاج والمزيج التسويقي',
	curriculumLessonId: 'mgt_lesson_2as_eco_t2_enterprise_functions',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const weeklyUsage = difficulty === 'easy' ? rng.pick([100, 200]) : rng.pick([150, 250, 300]);
		const leadWeeks = rng.pick([2, 3]);
		const safetyWeeks = 1;
		const leadStock = weeklyUsage * leadWeeks;
		const safetyStock = weeklyUsage * safetyWeeks;
		const reorderPoint = leadStock + safetyStock;

		const caseBlocks = buildCaseStudyBlocks({
			title: 'حالة عملية: تسيير التموين والتسويق في مصنع «الهضاب للعجائن»',
			facts: `تستهلك مؤسسة «الهضاب للعجائن الغذائية» ${weeklyUsage} طناً من السميد أسبوعياً، وتستغرق مهلة التوريد من المطحنة ${leadWeeks} أسابيع، وتحتفظ المؤسسة بمخزون أمان يكفي أسبوعاً واحداً. وفي الجانب التجاري، اعتمدت عبوات صحية قابلة لإعادة التدوير، بسعر تنافسي عادل، ووزعتها عبر متاجر التجزئة، مع حملة إشهارية صادقة توضح المكونات وتاريخ الصلاحية بوضوح.`,
			questions: [
				{
					q: '1) احسب كمية مخزون الأمان، ثم استنتج نقطة إعادة الطلب (المخزون الإنذاري) التي يجب عندها إرسال طلبية شراء جديدة.',
					a: `1) مخزون الأمان $= ${weeklyUsage} times ${safetyWeeks} = ${safetyStock}$ طناً.\nاستهلاك مهلة الانتظار $= ${weeklyUsage} times ${leadWeeks} = ${leadStock}$ طناً.\nنقطة إعادة الطلب $= ${leadStock} + ${safetyStock} = ${reorderPoint}$ طناً.`,
					mark: '1.5'
				},
				{
					q: '2) استخرج من النص سياسات المزيج التسويقي الأربعة ($4P$) المطبقة، مع إبراز الضابط الأخلاقي في الترويج.',
					a: '2) سياسة المنتج (عبوات صحية قابلة للتدوير)، سياسة السعر (سعر تنافسي عادل)، سياسة التوزيع (متاجر التجزئة)، سياسة الترويج (حملة إشهارية صادقة تحترم أمانة الإفصاح عن المكونات وتمنع الغش والتدليس).',
					mark: '1.5'
				},
				{
					q: '3) اذكر معيارين اثنين لاختيار الموردين في وظيفة التموين ومهمتين لـ وظيفة الإنتاج.',
					a: '3) معيارا اختيار المورد: الجودة والمطابقة، واحترام آجال التسليم والأسعار وشروط الدفع. مهمتا وظيفة الإنتاج: جدولة عمليات التصنيع ومراقبة الجودة والصيانة الوقائية للآلات.',
					mark: '1'
				}
			]
		});

		return {
			templateId: this.id,
			seed,
			grade: '2as_eco',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `تستهلك مؤسسة صناعية $${weeklyUsage}\\text{ طن}$ من المادة الأولية أسبوعياً، وتبلغ مهلة انتظار التوريد $${leadWeeks}$ أسابيع، ومخزون الأمان يكفي لأسبوع واحد ($${safetyStock}\\text{ طن}$). احسب نقطة إعادة الطلب بالطن:`,
				questionTextAr: 'احسب نقطة إعادة الطلب (بالطن):',
				questionData: {
					answer: reorderPoint,
					displayTemplate: 'R = ? t',
					variables: [],
					tolerance: 0
				},
				explanation: `نقطة إعادة الطلب = (الاستهلاك الأسبوعي × مهلة الانتظار) + مخزون الأمان = $(${weeklyUsage} \\times ${leadWeeks}) + ${safetyStock} = ${reorderPoint}\\text{ طناً}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'حلّل الوضعية العملية الآتية وأجب عن الأسئلة بدقة:',
				content: caseBlocks
			},
			hints: [
				'نقطة إعادة الطلب = استهلاك مدة الانتظار + مخزون الأمان.',
				'عناصر المزيج التسويقي هي: المنتج، السعر، التوزيع، والترويج.',
				'تتحكم وظيفة التموين في تدفق المواد دون انقطاع أو تكديس مفرط.'
			],
			solutionStepsAr: [
				`حساب مخزون الأمان ($${safetyStock}\\text{ طن}$) ونقطة إعادة الطلب ($${reorderPoint}\\text{ طن}$).`,
				'تحديد السياسات الأربع للمزيج التسويقي ($4P$) والالتزام بالأمانة التجارية.',
				'بيان معايير اختيار الموردين ومهام وظيفة الإنتاج.'
			],
			finalAnswer: `${reorderPoint}`
		};
	}
};

// [5] وضعية إدماجية: تحليل السوق والمرونة ووظائف المؤسسة (8 ن)
const tpl2asEcoT2IntegrationMarketEnterprise: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_2as_eco_t2_integration_market_enterprise',
	grade: '2as_eco',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: توازن السوق ومرونة الطلب وهيكلة ووظائف المؤسسة',
	curriculumLessonId: 'mgt_lesson_2as_eco_t2_enterprise_functions',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const pStar = rng.pick([100, 120]);
		const qStar = rng.pick([400, 600]);
		const b = 5;
		const d = 3;
		const a = qStar + b * pStar;
		const c = qStar - d * pStar;
		const safeC = Math.max(40, c);
		const safeQStar = safeC + d * pStar;
		const safeA = safeQStar + b * pStar;

		// Price reduction from pStar by 20% -> Q increases by 30% (Ep = -1.5)
		const pNew = Math.round(pStar * 0.8);
		const qNew = Math.round(safeQStar * 1.3);
		const caOld = pStar * safeQStar;
		const caNew = pNew * qNew;

		const rows: Array<Array<{ label?: string; answer?: string; mark?: string; bold?: boolean }>> = [
			[
				{ label: 'سعر التوازن $P^*$ وكمية التوازن $Q^*$', bold: true },
				{ answer: `$P^* = ${pStar}$ دج، $Q^* = ${safeQStar}$ علبة`, mark: '1.5' }
			],
			[
				{ label: 'مرونة الطلب السعرية $E_p$ وتفسيرها', bold: true },
				{ answer: `$E_p = -1.5$ (طلب مرن لأن $|E_p| = 1.5 > 1$)`, mark: '1.5' }
			],
			[
				{ label: 'أثر التخفيض السعري على رقم الأعمال', bold: true },
				{ answer: `ارتفع من $${formatDzd(caOld)}$ دج إلى $${formatDzd(caNew)}$ دج`, mark: '1.5' }
			]
		];

		const content: ContentBlock[] = [
			buildManagementDocumentBlock({
				title: 'وضعية إدماجية شاملة: مؤسسة «النخيل لتعليب التمور»',
				text: `تنشط مؤسسة «النخيل» الخاصة في تعليب التمور بولاية بسكرة، وتشغل 75 عاملاً ضمن هيكل تنظيمي يضم أربع مديريات: التموين، الإنتاج، التسويق، والمالية. أظهرت دراسة السوق لعلب التمر الفاخرة أن دالة الطلب اليومي هي Qd = ${safeA} - ${b}P، ودالة العرض هي Qo = ${safeC} + ${d}P. درست المؤسسة خيار تخفيض السعر من ${pStar} دج إلى ${pNew} دج لترتفع الكمية المطلوبة من ${safeQStar} علبة إلى ${qNew} علبة، مع تعزيز مخزون التغليف وتطوير التوزيع نحو نقاط بيع جديدة.`,
				source: 'وضعية تقويمية للفصل الثاني — 2 ثانوي تسيير واقتصاد'
			}),
			{
				type: 'text',
				content: '1) أجرِ الحسابات السوقية المطلوبة وأكمل الجدول الآتي (مع توضيح خطوات الحل):'
			},
			buildManagementTableBlock(['المؤشر السوقي', 'النتيجة والتحليل الاقتصادي'], rows),
			{
				type: 'text',
				content:
					'2) صنّف مؤسسة «النخيل» حسب معايير الملكية والنشاط والحجم، وحدّد نوع هيكلها التنظيمي.',
				answer:
					'2) حسب المعيار القانوني: مؤسسة خاصة؛ حسب النشاط: مؤسسة صناعية (صناعة غذائية تحويلية - القطاع الثانوي)؛ حسب الحجم: مؤسسة متوسطة (75 عاملاً ضمن مجال 50 إلى 249 عاملاً). الهيكل التنظيمي: هيكل وظيفي قائم على تقسيم المديريات حسب التخصص الوظيفي.',
				mark: '2'
			},
			{
				type: 'text',
				content:
					'3) اقترح إجراءً عملياً في وظيفة التموين وإجراءً في وظيفة الإنتاج لمواكبة زيادة الطلب البالغة 30% دون الإخلال بالجودة.',
				answer:
					'3) في وظيفة التموين: رفع مخزون الأمان لعلب التغليف وتنويع عقود توريد التمور الجيدة؛ في وظيفة الإنتاج: تفعيل الصيانة الوقائية وتمديد ساعات التشغيل أو إضافة وردية عمل مع تشديد مراقبة الجودة الصحية قبل التوزيع.',
				mark: '1.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_eco',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'matching',
				questionText: 'اربط كل مفهوم اقتصادي أو تسييري بالعبارة الموافقة له في وضعية مؤسسة «النخيل»:',
				questionTextAr: 'صل بين المفهوم ودلالته الصحيحة:',
				questionData: {
					pairs: [
						{ left: 'مرونة الطلب السعرية $E_p = -1.5$', right: 'طلب مرن يرفع رقم الأعمال عند تخفيض السعر' },
						{ left: 'تشغيل $75$ عاملاً في الصناعة الغذائية', right: 'مؤسسة متوسطة في القطاع الثانوي' },
						{ left: 'مديريات التموين والإنتاج والتسويق والمالية', right: 'هيكل تنظيمي وظيفي' },
						{ left: 'الاحتفاظ بمخزون احتياطي للعبوات', right: 'مهمة وظيفة التموين لمنع التوقف' }
					]
				},
				explanation:
					'تجمع الوضعية الإدماجية بين تحليل السوق (التوازن والمرونة) وتشخيص بنية المؤسسة ووظائفها.'
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية (08 نقاط)',
				points: this.defaultPoints,
				instruction: 'ادرس ملف مؤسسة «النخيل» وأجب عن الأسئلة التحليلية والحسابية الآتية:',
				content
			},
			hints: [
				'استخرج التوازن من تساوي الدالتين $Q_d = Q_o$، ثم احسب التغير النسبي في السعر والكمية.',
				'قارن رقم الأعمال الإجمالي $P \\times Q$ قبل وبعد التخفيض السعري.',
				'تذكّر معايير تصنيف المؤسسة والربط بين وظيفتي التموين والإنتاج عند نمو الطلب.'
			],
			solutionStepsAr: [
				`إيجاد $P^* = ${pStar}\\text{ دج}$ و $Q^* = ${safeQStar}\\text{ علبة}$.`,
				`حساب $E_p = \\frac{+30\\%}{-20\\%} = -1.5$ وارتفاع رقم الأعمال من $${formatDzd(caOld)}$ إلى $${formatDzd(caNew)}\\text{ دج}$.`,
				'تصنيف المؤسسة وتقديم خطة مواكبة الإنتاج والتموين.'
			],
			finalAnswer: `P*=${pStar}, Q*=${safeQStar}, Ep=-1.5`
		};
	}
};

export const TEMPLATES_2AS_ECO_T2: ManagementParameterizedTemplate[] = [
	tpl2asEcoT2MarketEquilibrium,
	tpl2asEcoT2DemandSupplyElasticity,
	tpl2asEcoT2EnterpriseClassificationOrg,
	tpl2asEcoT2SupplyProdMarketing,
	tpl2asEcoT2IntegrationMarketEnterprise
];
