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
// 3AS GE BAC (الاقتصاد والمناجمنت) — Trimester 3: 5 Parameterized Templates
// ============================================================================

// [1] التمويل ومصادر التمويل المشروعة للمؤسسة (CAF، المرابحة، المشاركة، الإجارة) (4 ن)
const tpl3asEcoT3HalalFinancingCaf: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_3as_eco_t3_halal_financing_caf',
	grade: '3as_eco',
	trimesterId: 't3',
	domain: 'eco_micro',
	titleAr: 'التمويل المشروع للمؤسسة: القدرة على التمويل الذاتي والصيغ الإسلامية',
	curriculumLessonId: 'mgt_lesson_3as_eco_t3_halal_financing',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const netProfit = difficulty === 'easy' ? 10 : rng.pick([10, 12, 15]); // million DZD
		const depAlloc = rng.pick([4, 5, 6]); // million DZD
		const caf = netProfit + depAlloc;
		const divRatio = rng.pick([0.2, 0.25]);
		const dividends = roundTo(netProfit * divRatio, 2);
		const selfFinancing = roundTo(caf - dividends, 2);
		const projectCost = caf + rng.pick([12, 16, 20]);
		const externalNeed = roundTo(projectCost - selfFinancing, 2);

		const caseBlocks = buildCaseStudyBlocks({
			title: 'وضعية مالية: خطة تمويل استثمار توسعي في مؤسسة «الواحة للصناعات الغذائية»',
			facts: `تخطط مؤسسة «الواحة» لاقتناء خط تعبئة وتغليف بتكلفة إجمالية قدرها ${projectCost} مليون دج. أظهرت بياناتها الختامية للسنة المنتهية: نتيجة صافية ${netProfit} مليون دج، ومخصصات اهتلاكات ومؤونات غير نقدية بقيمة ${depAlloc} مليون دج، كما قررت الجمعية العامة توزيع ${roundTo(divRatio * 100, 0)}% من النتيجة الصافية أرباحاً على الشركاء. وتلتزم المؤسسة برفض القروض الربوية المحرمة والاعتماد على المصادر المشروعة فقط.`,
			questions: [
				{
					q: '1) احسب القدرة على التمويل الذاتي ($"CAF"$) ثم التمويل الذاتي المتاح للمؤسسة ($"AF"$).',
					a: `1) $"CAF" = "النتيجة الصافية" + "مخصصات الاهتلاك والمؤونات" = ${netProfit} + ${depAlloc} = ${caf}$ مليون دج.\nالأرباح الموزعة $= ${netProfit} times ${divRatio} = ${dividends}$ مليون دج.\nالتمويل الذاتي $"AF" = ${caf} - ${dividends} = ${selfFinancing}$ مليون دج.`,
					mark: '1.5'
				},
				{
					q: '2) احسب مبلغ التمويل الخارجي اللازم لتغطية تكلفة المشروع، واقترح صيغتين إسلاميتين مشروعتين لتعبئته.',
					a: `2) مبلغ التمويل الخارجي المطلوب $= ${projectCost} - ${selfFinancing} = ${externalNeed}$ مليون دج.\nالصيغتان المشروعتان: (أ) عقد المرابحة للآمر بالشراء لاقتناء التجهيز بأقساط وهامش ربح معلوم؛ أو (ب) الإجارة المنتهية بالتمليك؛ أو (ج) عقد المشاركة في رأس المال مع مصرف إسلامي أو مستثمرين لتقاسم الأرباح والخسائر، أو رفع رأس المال بأسهم عادية.`,
					mark: '1.5'
				},
				{
					q: '3) بيّن لماذا تحفظ صيغ التمويل الإسلامي التوازن المالي للمؤسسة بصورة أفضل من القروض الربوية المحرمة.',
					a: '3) لأن القروض الربوية محرمة شرعاً وتفرض أعباء ربوية مضمونة متراكمة حتى لو تعثر المشروع؛ أما المشاركة والمرابحة والإجارة فترتبط بأصول ومنافع حقيقية وبقواعد عادلة في تقاسم المخاطر أو ثبات الثمن.',
					mark: '1'
				}
			]
		});

		return {
			templateId: this.id,
			seed,
			grade: '3as_eco',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `حققت مؤسسة نتيجة صافية قدرها $${netProfit}\\text{ مليون دج}$، ومخصصات اهتلاكات ومؤونات غير نقدية بـ $${depAlloc}\\text{ مليون دج}$، ووزعت أرباحاً بقيمة $${dividends}\\text{ مليون دج}$ على الشركاء. احسب التمويل الذاتي الصافي المتاح للمؤسسة (بمليون دج):`,
				questionTextAr: 'احسب التمويل الذاتي المتاح (مليون دج):',
				questionData: {
					answer: selfFinancing,
					displayTemplate: 'AF = ? M DZD',
					variables: [],
					tolerance: 0.1
				},
				explanation: `$$CAF = ${netProfit} + ${depAlloc} = ${caf}\\text{ مليون دج} \\implies AF = ${caf} - ${dividends} = ${selfFinancing}\\text{ مليون دج}$$`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'ادرس الوضعية التمويلية الآتية وأجب عن الأسئلة الثلاثة بمنهجية:',
				content: caseBlocks
			},
			hints: [
				'تُضاف الاهتلاكات والمؤونات إلى النتيجة الصافية لأنها أعباء غير مدفوعة نقداً.',
				'التمويل الذاتي يساوي $CAF$ ناقص الأرباح الموزعة على الشركاء.',
				'تُغطى الفجوة التمويلية بالتمويل الإسلامي المشروع: المرابحة، الإجارة، أو المشاركة.'
			],
			solutionStepsAr: [
				`حساب $CAF = ${caf}$ مليون دج والتمويل الذاتي $= ${selfFinancing}$ مليون دج.`,
				`تحديد الحاجة للتمويل الخارجي $= ${externalNeed}$ مليون دج واقتراح المرابحة/الإجارة/المشاركة.`,
				'التعليل الشرعي والمالي لرفض القروض الربوية.'
			],
			finalAnswer: `${selfFinancing}`
		};
	}
};

// [2] الرقابة الإدارية ومعاييرها والموازنات (4 ن)
const tpl3asEcoT3AdministrativeControlVariances: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_3as_eco_t3_administrative_control_variances',
	grade: '3as_eco',
	trimesterId: 't3',
	domain: 'man_leadership_control',
	titleAr: 'الرقابة الإدارية ومعاييرها وتحليل انحرافات الموازنة',
	curriculumLessonId: 'mgt_lesson_3as_eco_t3_administrative_control',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const planRev = difficulty === 'easy' ? 10000000 : rng.pick([10000000, 12000000]);
		const actualRev = Math.round(planRev * rng.pick([0.92, 1.08]));
		const revDiff = actualRev - planRev;
		const revPct = roundTo((revDiff / planRev) * 100, 1);

		const planCost = Math.round(planRev * 0.6);
		const actualCost = Math.round(planCost * rng.pick([0.95, 1.1]));
		const costDiff = actualCost - planCost;
		const costPct = roundTo((costDiff / planCost) * 100, 1);

		const planTime = 48;
		const actualTime = rng.pick([36, 60]);
		const timeDiff = actualTime - planTime;

		const rows: Array<Array<{ label?: string; answer?: string; mark?: string; bold?: boolean }>> = [
			[
				{ label: 'رقم الأعمال الفصلي (معيار كمي/مالي)', bold: true },
				{ label: `${formatDzd(planRev)} دج` },
				{ label: `${formatDzd(actualRev)} دج` },
				{ answer: `${revDiff > 0 ? `+${formatDzd(revDiff)}` : formatDzd(revDiff)} دج (${revPct > 0 ? `+${revPct}` : revPct}%)`, mark: '0.5' },
				{ answer: revDiff >= 0 ? 'ملائم' : 'غير ملائم', mark: '0.25' }
			],
			[
				{ label: 'تكلفة الإنتاج الإجمالية (معيار تكاليف)', bold: true },
				{ label: `${formatDzd(planCost)} دج` },
				{ label: `${formatDzd(actualCost)} دج` },
				{ answer: `${costDiff > 0 ? `+${formatDzd(costDiff)}` : formatDzd(costDiff)} دج (${costPct > 0 ? `+${costPct}` : costPct}%)`, mark: '0.5' },
				{ answer: costDiff <= 0 ? 'ملائم (وفر)' : 'غير ملائم (تجاوز)', mark: '0.25' }
			],
			[
				{ label: 'مهلة تسليم الطلبيات (معيار زمني)', bold: true },
				{ label: `${planTime} ساعة` },
				{ label: `${actualTime} ساعة` },
				{ answer: `${timeDiff > 0 ? `+${timeDiff}` : timeDiff} ساعة`, mark: '0.5' },
				{ answer: timeDiff <= 0 ? 'ملائم (سرعة)' : 'غير ملائم (تأخر)', mark: '0.25' }
			]
		];

		const ddCategories = ['معايير كمية ومالية', 'معايير نوعية وزمنية'];
		const ddItems = [
			{ text: 'تحقيق رقم أعمال 12 مليون دج', category: 0 },
			{ text: 'سقف تكلفة الوحدة 500 دج', category: 0 },
			{ text: 'نسبة المنتجات المعيبة أقل من 0.5%', category: 1 },
			{ text: 'آجال تسليم الطلبيات خلال 48 ساعة', category: 1 }
		];

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: '1) يمثل الجدول الآتي مقتطفاً من لوحة القيادة الرقابية لمؤسسة صناعية. احسب الانحرافات وحدّد طبيعتها:'
			},
			buildManagementTableBlock(
				['المعيار الرقابي', 'المقدر', 'الفعلي', 'الانحراف (مطلق / نسبي)', 'الحكم الرقابي'],
				rows
			),
			{
				type: 'text',
				content:
					'2) اشرح دور «لوحة القيادة» و«الرقابة بالاستثناء» في تحقيق شرطي التوقيت المناسب والاقتصادية في نظام الرقابة الفعالة.',
				answer:
					'2) تلخّص لوحة القيادة المؤشرات الحرجة في شكل بصري دوري مختصر يضمن «التوقيت المناسب» لكشف الانحراف مبكراً؛ وتوجه «الرقابة بالاستثناء» جهد الإدارة نحو الانحرافات الجوهرية فقط دون إضاعة التكاليف والوقت في التفاصيل الروتينية، مما يحقق شرط «الاقتصادية في الرقابة».',
				mark: '1.75'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '3as_eco',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'drag_drop',
				questionText: 'صنّف المعايير الرقابية الآتية إلى معايير كمية/مالية ومعايير نوعية/زمنية:',
				questionTextAr: 'اسحب كل معيار إلى فئته الصحيحة:',
				questionData: {
					categories: ddCategories,
					items: rng.shuffle(ddItems)
				},
				explanation:
					'تنقسم معايير الرقابة الإدارية إلى أربعة أصناف رئيسية: كمية، مالية/تكاليف، نوعية (جودة)، وزمنية.'
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'استثمر معطيات لوحة القيادة المرفقة وأجب عن المطلوب:',
				content
			},
			hints: [
				'في المبيعات والأرباح: الفعلي أكبر من المقدر = ملائم؛ في التكاليف والزمن: الفعلي أقل من المقدر = ملائم.',
				'لوحة القيادة أداة إنذار مبكر دورية مختصرة.',
				'الرقابة بالاستثناء توفر الوقت والتكلفة الإدارية.'
			],
			solutionStepsAr: [
				`انحراف المبيعات: $${revPct}\\%$، انحراف التكاليف: $${costPct}\\%$، انحراف الزمن: $${timeDiff}\\text{ ساعة}$.`,
				'تفسير دور لوحة القيادة والرقابة بالاستثناء في تحقيق التوقيت المناسب والاقتصادية.'
			],
			finalAnswer: ddItems.map((it) => `${it.text}: ${ddCategories[it.category]}`).join(' | ')
		};
	}
};

// [3] التسيير التقديري واتخاذ القرار الإداري (مصفوفة العوائد الحلال) (4 ن)
const tpl3asEcoT3DecisionMakingPayoff: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_3as_eco_t3_decision_making_payoff',
	grade: '3as_eco',
	trimesterId: 't3',
	domain: 'man_functions',
	titleAr: 'التسيير التقديري واتخاذ القرار في بيئات المخاطرة وعدم التأكد',
	curriculumLessonId: 'mgt_lesson_3as_eco_t3_budgeting_decision_making',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const pBoom = difficulty === 'easy' ? 0.6 : rng.pick([0.6, 0.7]);
		const pSlow = roundTo(1 - pBoom, 2);

		// Clean payoffs (in million DZD)
		const aBoom = rng.pick([30, 40]);
		const aSlow = rng.pick([-5, -10]);
		const bBoom = rng.pick([20, 25]);
		const bSlow = rng.pick([8, 10]);
		const cBoom = 14;
		const cSlow = 12;

		const expA = roundTo(pBoom * aBoom + pSlow * aSlow, 2);
		const expB = roundTo(pBoom * bBoom + pSlow * bSlow, 2);
		const expC = roundTo(pBoom * cBoom + pSlow * cSlow, 2);

		const bestExp = Math.max(expA, expB, expC);
		const bestExpName = bestExp === expB ? 'البديل (ب)' : bestExp === expA ? 'البديل (أ)' : 'البديل (ج)';

		const lapA = roundTo((aBoom + aSlow) / 2, 2);
		const lapB = roundTo((bBoom + bSlow) / 2, 2);
		const lapC = roundTo((cBoom + cSlow) / 2, 2);
		const bestLapName =
			Math.max(lapA, lapB, lapC) === lapB ? 'البديل (ب)' : Math.max(lapA, lapB, lapC) === lapA ? 'البديل (أ)' : 'البديل (ج)';

		const rows: Array<Array<{ label?: string; answer?: string; mark?: string; bold?: boolean }>> = [
			[
				{ label: 'البديل (أ): توسيع مصنع بالكامل', bold: true },
				{ label: `${aBoom}` },
				{ label: `${aSlow}` },
				{ answer: `${expA} مليون دج`, mark: '0.5' }
			],
			[
				{ label: 'البديل (ب): خط إنتاج متوسط بالمشاركة', bold: true },
				{ label: `${bBoom}` },
				{ label: `${bSlow}` },
				{ answer: `${expB} مليون دج`, mark: '0.5' }
			],
			[
				{ label: 'البديل (ج): الحفاظ على الطاقة الحالية', bold: true },
				{ label: `${cBoom}` },
				{ label: `${cSlow}` },
				{ answer: `${expC} مليون دج`, mark: '0.5' }
			]
		];

		const mcq = buildUniqueMcqOptions(
			`${bestExpName} بقيمة متوقعة $${bestExp}\\text{ مليون دج}$`,
			[
				{
					text: `البديل (أ) بقيمة متوقعة $${roundTo((aBoom + aSlow) / 2, 2)}\\text{ مليون دج}$`,
					diagnosticFeedback: 'استعملت المتوسط البسيط (0.5 و0.5) وتجاهلت الاحتمالات المعطاة في بيئة المخاطرة.'
				},
				{
					text: `البديل (ج) بقيمة متوقعة $${cBoom}\\text{ مليون دج}$`,
					diagnosticFeedback: 'أخذت عائد الرواج فقط دون ضرب كل حالة في احتمالها.'
				},
				{
					text: `البديل (ب) بقيمة متوقعة $${bBoom + bSlow}\\text{ مليون دج}$`,
					diagnosticFeedback: 'جمعت العائدين مباشرة دون ترجيحهما بالاحتمالات.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `تدرس مؤسسة صناعية ثلاثة بدائل استثمارية مشروعة للسنة المقبلة، وتقدر احتمال الرواج الاقتصادي بـ $P_1 = ${pBoom}$ واحتمال الركود بـ $P_2 = ${pSlow}$. القيم في الجدول تمثل الأرباح الصافية الحلال بمليون دج:\n1) احسب القيمة المتوقعة $E(X)$ لكل بديل في الجدول، ثم حدّد البديل الأفضل في بيئة المخاطرة:`
			},
			buildManagementTableBlock(
				[
					'البدائل الاستثمارية',
					`حالة الرواج ($P_1 = ${pBoom}$)`,
					`حالة الركود ($P_2 = ${pSlow}$)`,
					'القيمة المتوقعة $E(X)$'
				],
				rows
			),
			{
				type: 'text',
				content:
					'2) بفرض غياب الاحتمالات تماماً (بيئة عدم التأكد)، ما البديل المختار وفق: (أ) معيار التفاؤل (أقصى الأقصى)، (ب) معيار التشاؤم لوالد (أقصى الأدنى)، (ج) معيار لابلاس؟',
				answer: `2) أ- معيار التفاؤل: أعلى الأرقام القصوى هو ${aBoom} ← يُختار البديل (أ).\nب- معيار التشاؤم لوالد (أقصى الأدنى): أدنى قيم كل صف هي (${aSlow}، ${bSlow}، ${cSlow}) وأعلاها ${cSlow} ← يُختار البديل (ج).\nج- معيار لابلاس: المتوسطات (${lapA}، ${lapB}، ${lapC}) ← يُختار ${bestLapName}.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content:
					'3) صنّف هذا القرار الاستثماري من حيث المستوى والتكرار، ثم اذكر الخطوات الأربع الأولى لعملية اتخاذ القرار.',
				answer:
					'3) قرار استراتيجي (طويل الأجل) وغير مبرمج (غير روتيني). الخطوات الأربع الأولى: تحديد المشكلة وتشخيصها، جمع المعلومات والبيانات، توليد وصياغة البدائل، تقييم البدائل واختيار الأمثل.',
				mark: '1'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '3as_eco',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في مصفوفة عوائد بمليون دج تحت احتمال رواج $P_1 = ${pBoom}$ واحتمال ركود $P_2 = ${pSlow}$: البديل (أ) يعطي $[${aBoom}, ${aSlow}]$، والبديل (ب) $[${bBoom}, ${bSlow}]$، والبديل (ج) $[${cBoom}, ${cSlow}]$. ما البديل ذو أعلى قيمة متوقعة $E(X)$؟`,
				questionTextAr: 'اختر البديل الأمثل وفق معيار القيمة المتوقعة:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `$E(\\text{أ}) = ${expA}$، $E(\\text{ب}) = ${expB}$، $E(\\text{ج}) = ${expC}$. الأعلى قيمة متوقعة هو ${bestExpName} ($${bestExp}\\text{ مليون دج}$).`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'ادرس مصفوفة القرار الآتية وأجب عن المطلوب:',
				content
			},
			hints: [
				'في بيئة المخاطرة نضرب كل عائد في احتماله ثم نجمع: $E(X) = P_1 X_1 + P_2 X_2$.',
				'في عدم التأكد: المتفائل يأخذ أعلى رقم بالجدول؛ والمتشائم يأخذ أعلى رقم من بين أسوأ قيم كل بديل.',
				'القرارات الاستثمارية الكبرى هي قرارات استراتيجية غير مبرمجة.'
			],
			solutionStepsAr: [
				`حساب $E(\\text{أ}) = ${expA}$، $E(\\text{ب}) = ${expB}$، $E(\\text{ج}) = ${expC}$.`,
				`تطبيق معايير عدم التأكد: التفاؤل (أ)، والد ($${cSlow}$ ← ج)، لابلاس (${bestLapName}).`,
				'تصنيف القرار وتعداد مراحل صناعة القرار الرشيد.'
			],
			finalAnswer: `${bestExpName} (${bestExp})`
		};
	}
};

// [4] وضعية إدماجية للبكالوريا (1): بيانات اقتصادية وطنية (ميزان المدفوعات، البطالة، التضخم) + قيادة وتمويل (8 ن)
const tpl3asEcoT3BacIntegrationMacroTrade: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_3as_eco_t3_bac_integration_macro_trade',
	grade: '3as_eco',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'وضعية إدماجية للبكالوريا: مؤشرات الاقتصاد الكلي وميزان المدفوعات والتمويل المشروع',
	curriculumLessonId: 'mgt_lesson_3as_eco_t3_bac_integration_methodology',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const exportsB = difficulty === 'easy' ? 48 : rng.pick([48, 52, 56]);
		const importsB = difficulty === 'easy' ? 40 : rng.pick([40, 44, 48]);
		const bc = exportsB - importsB;
		const tc = roundTo((exportsB / importsB) * 100, 2);

		const activePopM = rng.pick([12, 12.5]);
		const unempM = rng.pick([1.2, 1.5]);
		const uRate = roundTo((unempM / activePopM) * 100, 2);

		const ipc0 = 120;
		const ipc1 = rng.pick([129, 132]);
		const piRate = roundTo(((ipc1 - ipc0) / ipc0) * 100, 2);

		const dataRows: Array<Array<{ label?: string; answer?: string; mark?: string; bold?: boolean }>> = [
			[
				{ label: 'صادرات السلع $X$ / واردات السلع $M$', bold: true },
				{ label: `${exportsB} / ${importsB} مليار دولار` },
				{ answer: `$"BC" = +${bc}$ مليار دولار | $T_c = ${tc}$%`, mark: '1.5' }
			],
			[
				{ label: 'السكان الناشطون $L$ / البطالون $U$', bold: true },
				{ label: `${activePopM} / ${unempM} مليون نسمة` },
				{ answer: `معدل البطالة $u = ${uRate}$%`, mark: '1.5' }
			],
			[
				{ label: 'الرقم القياسي للأسعار ($"IPC"_0$ ← $"IPC"_1$)', bold: true },
				{ label: `${ipc0} ← ${ipc1} نقطة` },
				{ answer: `معدل التضخم $pi = ${piRate}$%`, mark: '1.5' }
			]
		];

		const content: ContentBlock[] = [
			buildManagementDocumentBlock({
				title: 'وضعية إدماجية لبكالوريا الاقتصاد والمناجمنت — الموضوع التطبيقي الأول',
				text: `يواجه اقتصاد بلدٍ ما تحدياً مزدوجاً يجمع بين الحفاظ على فائضه التجاري ومعالجة نسبة بطالة مرتفعة ومعدل تضخم متصاعد كما يبيّن الجدول الإحصائي المرفق. وللمساهمة في تنويع الصادرات خارج المحروقات وخلق مناصب شغل، تقرر مؤسسة صناعية توسيع طاقتها عبر التمويل الذاتي والمشاركة الإسلامية دون اللجوء للربا، مع اعتماد قيادة تشاركية وتحفيز مادي حلال ومعنوي للعمال.`,
				source: 'بكالوريا تجريبية نموذجية — الاقتصاد والمناجمنت'
			}),
			{
				type: 'text',
				content: '1) استثمر جدول المعطيات الآتي لحساب المؤشرات الاقتصادية الكلية وكتابة التفسير:'
			},
			buildManagementTableBlock(['البيانات الإحصائية للبلد', 'القيم المسجلة', 'الحساب والتفسير الاقتصادي'], dataRows),
			{
				type: 'text',
				content:
					'2) اقترح سياستين اقتصاديتين متكاملتين وخاليتين من الربا لتقليص البطالة والتضخم في الوقت نفسه مع تعزيز الصادرات.',
				answer:
					'2) (أ) ضبط السيولة بالاحتياطي الإلزامي وإصدار صكوك إسلامية حكومية موجهة لمشاريع البنية الإنتاجية لامتصاص التضخم؛ (ب) تحفيز الاستثمار المنتج والتكوين المهني وتمويل المؤسسات الصغيرة بالمرابحة والمشاركة لخلق مناصب شغل وزيادة العرض السلعي المحلي والتصديري.',
				mark: '1.75'
			},
			{
				type: 'text',
				content:
					'3) على مستوى المؤسسة المصدرة: حدّد الأسلوب القيادي المناسب وعنصراً من كل فئة في نظرية هيرزبرغ لتشجيع العمال على مضاعفة التصدير، مبيّناً لماذا تفضل المؤسسة التمويل الذاتي والمشاركة على القروض الربوية.',
				answer:
					'3) الأسلوب القيادي المناسب هو الديمقراطي التشاركي (قيادة الفريق 9، 9). حسب هيرزبرغ: توفير العوامل الوقائية (أجر مستقر وظروف عمل آمنة) مع العوامل الدافعة (تقدير الإنجاز، التفويض، الترقية، ومكافأة تصدير حلال). وتفضل المؤسسة التمويل الذاتي والمشاركة لتجنب حرمة الربا ومخاطر الأعباء المضمونة عند تقلب الأسواق الدولية.',
				mark: '1.75'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '3as_eco',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `من جدول بيانات البكالوريا: بلغت صادرات السلع $${exportsB}\\text{ مليار دولار}$ وواردات السلع $${importsB}\\text{ مليار دولار}$. احسب معدل التغطية $T_c$ (بالنسبة المئوية):`,
				questionTextAr: 'احسب معدل التغطية $T_c$ (%):',
				questionData: {
					answer: tc,
					displayTemplate: 'T_c = ? %',
					variables: [],
					tolerance: 0.2
				},
				explanation: `$$T_c = \\frac{${exportsB}}{${importsB}} \\times 100 = ${tc}\\%$$`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية للبكالوريا — الجزء الأول (08 نقاط)',
				points: this.defaultPoints,
				instruction: 'ادرس السند وجدول البيانات الاقتصادية الآتي وأجب عن الأسئلة الثلاثة:',
				content
			},
			hints: [
				'تحقق من الوحدات عند حساب $T_c$ ومعدل البطالة $u$ ومعدل التضخم $\\pi$.',
				'اربط السياسة النقدية المشروعة (الاحتياطي والصكوك) بزيادة العرض الإنتاجي.',
				'اجمع في الجزء التسييري بين القيادة التشاركية ونظرية هيرزبرغ والتمويل الحلال.'
			],
			solutionStepsAr: [
				`حساب $BC = +${bc}$ مليار دولار و $T_c = ${tc}\\%$.`,
				`حساب معدل البطالة $u = ${uRate}\\%$ ومعدل التضخم $\\pi = ${piRate}\\%$.`,
				'صياغة السياسات الكلية الحلال وتحليل القيادة والتحفيز والتمويل.'
			],
			finalAnswer: `${tc}`
		};
	}
};

// [5] وضعية إدماجية للبكالوريا (2): المرونات + توازن السوق + التسيير التقديري والرقابة والقرار (8 ن)
const tpl3asEcoT3BacIntegrationElasticityMgmt: ManagementParameterizedTemplate = {
	id: 'mgt_tpl_3as_eco_t3_bac_integration_elasticity_mgmt',
	grade: '3as_eco',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'وضعية إدماجية للبكالوريا: المرونات وتوازن السوق والتسيير التقديري والقرار',
	curriculumLessonId: 'mgt_lesson_3as_eco_t3_bac_integration_methodology',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): ManagementGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const p1 = difficulty === 'easy' ? 200 : rng.pick([200, 250]);
		const p2 = Math.round(p1 * 0.9); // -10%
		const q1 = 1000;
		const epVal = rng.pick([-2, -1.5]);
		const q2 = Math.round(q1 * (1 + epVal * -0.1));
		const pctQ = roundTo(((q2 - q1) / q1) * 100, 1);

		const rev1 = p1 * q1;
		const rev2 = p2 * q2;

		const planCost = 1500000;
		const actualCost = rng.pick([1380000, 1620000]);
		const costDev = actualCost - planCost;
		const costDevPct = roundTo((costDev / planCost) * 100, 1);

		// Decision payoff under risk
		const pHigh = 0.6;
		const pLow = 0.4;
		const alt1 = [25, 5]; // E = 17
		const alt2 = [18, 12]; // E = 15.6
		const exp1 = roundTo(pHigh * alt1[0] + pLow * alt1[1], 2);
		const exp2 = roundTo(pHigh * alt2[0] + pLow * alt2[1], 2);

		const dataRows: Array<Array<{ label?: string; answer?: string; mark?: string; bold?: boolean }>> = [
			[
				{ label: `الطلب السعري (السعر $${p1}$ ← $${p2}$ دج، الكمية $${q1}$ ← $${q2}$)`, bold: true },
				{ answer: `$E_p = ${epVal}$ (طلب مرن، ارتفع رقم الأعمال إلى $${formatDzd(rev2)}$ دج)`, mark: '1.5' }
			],
			[
				{ label: `الرقابة الموازناتية للتكلفة (المقدر $${formatDzd(planCost)}$ دج، الفعلي $${formatDzd(actualCost)}$ دج)`, bold: true },
				{ answer: `الانحراف $= ${costDev > 0 ? `+${formatDzd(costDev)}` : formatDzd(costDev)}$ دج (${costDevPct > 0 ? `+${costDevPct}` : costDevPct}%) — ${costDev <= 0 ? 'ملائم' : 'غير ملائم'}`, mark: '1.5' }
			],
			[
				{ label: `القرار بالمخاطرة ($P_1=${pHigh}$, $P_2=${pLow}$): بديل 1 $[25, 5]$ مقابل بديل 2 $[18, 12]$`, bold: true },
				{ answer: `$E_1 = ${exp1}$ مليون دج، $E_2 = ${exp2}$ مليون دج ← يُختار البديل الأول رياضياً`, mark: '1.5' }
			]
		];

		const content: ContentBlock[] = [
			buildManagementDocumentBlock({
				title: 'وضعية إدماجية لبكالوريا الاقتصاد والمناجمنت — الموضوع التطبيقي الثاني',
				text: `تستعد مؤسسة صناعية وطنية لتجديد استراتيجيتها التسويقية والمالية وفق بيانات السوق والتسيير التقديري المبينة أدناه. خفّضت المؤسسة سعر منتجها بنسبة 10% لدراسة استجابة السوق، وقارنت تكلفة الإنتاج الفعلية بالموازنة التقديرية، كما تفاضل بين مشروعين استثماريين مموّلين بصيغ إسلامية مشروعة (المرابحة أو المشاركة) تحت احتمال رواج 0.6 واحتمال تباطؤ 0.4.`,
				source: 'بكالوريا تجريبية نموذجية — الاقتصاد والمناجمنت'
			}),
			{
				type: 'text',
				content: '1) أكمل جدول الحسابات الاقتصادية والتسييرية الآتي موضحاً الصيغ والتفسير:'
			},
			buildManagementTableBlock(['المحور التحليلي ومعطياته', 'الحساب الكمي والاستنتاج'], dataRows),
			{
				type: 'text',
				content:
					'2) بفرض أن الدخل الفردي للمستهلكين ارتفع بنسبة $10$% فازداد طلبهم على هذه السلعة بنسبة $15$%، احسب مرونة الطلب الدخلية $E_R$ وصنّف هذه السلعة.',
					answer:
					'2) $E_R = frac(+0.15, +0.10) = +1.5$. وبما أن $E_R > 1$ فهي سلعة عادية كمالية.',
				mark: '1.5'
			},
			{
				type: 'text',
				content:
					'3) اذكر مرحلة من مراحل التسيير التقديري ومعيارين من معايير الرقابة الإدارية (غير التكلفة)، ثم بيّن كيف يضمن عقد الإجارة المنتهية بالتمليك أو المرابحة تنفيذ البديل الاستثماري المختار بعيداً عن الربا.',
				answer:
					'3) مراحل التسيير التقديري: التقدير (وضع الموازنات) ← التنفيذ ← مراقبة الانحرافات والتصحيح. معياران رقابيان آخران: المعايير النوعية (نسبة الجودة والعيوب) والمعايير الزمنية (آجال التسليم). تمويل المشروع بالمرابحة أو الإجارة المنتهية بالتمليك يتيح اقتناء التجهيزات بأقساط ثابتة معلومة مرتبطة بالأصل الحقيقي دون الوقوع في الفائدة الربوية المحرمة.',
				mark: '2'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '3as_eco',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `انخفض سعر سلعة من $${p1}\\text{ دج}$ إلى $${p2}\\text{ دج}$ فارتفعت الكمية المطلوبة من $${q1}$ إلى $${q2}$ وحدة. احسب مرونة الطلب السعرية $E_p$ (أدخل العدد بإشارته):`,
				questionTextAr: 'احسب مرونة الطلب السعرية $E_p$:',
				questionData: {
					answer: epVal,
					displayTemplate: 'E_p = ?',
					variables: [],
					tolerance: 0.05
				},
				explanation: `$$E_p = \\frac{(${q2} - ${q1})/${q1}}{(${p2} - ${p1})/${p1}} = \\frac{+${pctQ}\\%}{-10\\%} = ${epVal}$$`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية للبكالوريا — الجزء الثاني (08 نقاط)',
				points: this.defaultPoints,
				instruction: 'ادرس الوضعية التكاملية الآتية وأجب عن الأسئلة الثلاثة بوضوح ودقة:',
				content
			},
			hints: [
				'استخرج مرونة الطلب السعرية والدخلية مع الانتباه للإشارات والقيمة المطلقة.',
				'في انحرافات التكلفة: القيمة الفعلية الأقل من المقدرة ملائمة (وفر).',
				'احسب القيمة المتوقعة $E(X)$ بضرب كل عائد في احتماله وجمعهما.'
			],
			solutionStepsAr: [
				`حساب $E_p = ${epVal}$ وارتفاع رقم الأعمال من $${formatDzd(rev1)}$ إلى $${formatDzd(rev2)}\\text{ دج}$.`,
				`حساب انحراف التكلفة ($${costDevPct}\\%$) والقيم المتوقعة ($E_1=${exp1}$ مقابل $E_2=${exp2}$).`,
				'حساب المرونة الدخلية ($E_R = +1.5$) وتوضيح مراحل التسيير التقديري والتمويل الحلال.'
			],
			finalAnswer: `${epVal}`
		};
	}
};

export const TEMPLATES_3AS_ECO_T3: ManagementParameterizedTemplate[] = [
	tpl3asEcoT3HalalFinancingCaf,
	tpl3asEcoT3AdministrativeControlVariances,
	tpl3asEcoT3DecisionMakingPayoff,
	tpl3asEcoT3BacIntegrationMacroTrade,
	tpl3asEcoT3BacIntegrationElasticityMgmt
];
