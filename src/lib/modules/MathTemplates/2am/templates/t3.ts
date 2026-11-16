import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate } from '../../types';
import type { ContentBlock, TableCell } from '../../../SujetBuilder/types';
import { SeededRng, buildUniqueMcqOptions, roundTo, simplifyFraction } from '../../rng';
import { saveSvgAsset, svgBarChart, svgPrismCylinder } from '../../svg-helpers';

const PI = 3.14;

function fmtNum(n: number): string {
	const r = roundTo(n, 2);
	return Object.is(r, -0) ? '0' : String(r);
}

function acceptNum(n: number): string[] {
	const s = fmtNum(n);
	return s.includes('.') ? [s, s.replace('.', ',')] : [s];
}

function unitTagKaTeX(unit: 'cm' | 'dm' | 'm' | 'km' | 'cm2' | 'dm2' | 'm2' | 'cm3' | 'dm3' | 'm3' | 'L' | 'DA'): string {
	switch (unit) {
		case 'cm':
			return '\\text{cm}';
		case 'dm':
			return '\\text{dm}';
		case 'm':
			return '\\text{m}';
		case 'km':
			return '\\text{km}';
		case 'cm2':
			return '\\text{cm}^2';
		case 'dm2':
			return '\\text{dm}^2';
		case 'm2':
			return '\\text{m}^2';
		case 'cm3':
			return '\\text{cm}^3';
		case 'dm3':
			return '\\text{dm}^3';
		case 'm3':
			return '\\text{m}^3';
		case 'L':
			return '\\text{L}';
		case 'DA':
			return '\\text{DA}';
	}
}

function makeRng(seed: number, salt: number, difficulty: Difficulty): SeededRng {
	const diffOffset = difficulty === 'easy' ? 11 : difficulty === 'medium' ? 37 : 73;
	return new SeededRng(seed * 977 + salt * 131 + diffOffset);
}

// ============================================================================
// 1. Proportionality table, proportionality coefficient, fourth proportional & scale
// ============================================================================

const proportionalityScaleTemplate: ParameterizedTemplate = {
	id: '2am_t3_proportionality_scale',
	grade: '2am',
	trimesterId: 't3',
	domain: 'proportionality',
	titleAr: 'التناسبية والرابع المتناسب ومقياس التصميم',
	curriculumLessonId: 'lesson_2am_t3_proportionality_fourth_proportional',
	defaultPoints: 3,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 1, difficulty);

		if (difficulty === 'easy') {
			const contexts = [
				{
					intro: 'يمثل الجدول الآتي ثمن كراريس من نفس النوع بدلالة عددها.',
					row1: 'عدد الكراريس',
					row2: 'الثمن (دج)',
					itemSingular: 'كراس',
					itemPlural: 'كراريس',
					unitOut: 'دج',
					kPool: [35, 40, 45, 50, 60, 75, 80, 90, 120]
				},
				{
					intro: 'يمثل الجدول الآتي كتلة البرتقال وثمنها في أحد الأسواق.',
					row1: 'الكتلة (كغ)',
					row2: 'الثمن (دج)',
					itemSingular: 'كيلوغرام من البرتقال',
					itemPlural: 'كغ من البرتقال',
					unitOut: 'دج',
					kPool: [120, 140, 150, 160, 180, 200, 220, 250]
				},
				{
					intro: 'تقطع سيارة مسافة ثابتة في كل ساعة. يمثل الجدول الآتي المسافة المقطوعة بدلالة المدة الزمنية.',
					row1: 'المدة (سا)',
					row2: 'المسافة (كلم)',
					itemSingular: 'ساعة',
					itemPlural: 'ساعات',
					unitOut: 'كلم',
					kPool: [60, 70, 75, 80, 85, 90, 100]
				}
			];
			const ctx = rng.pick(contexts);
			const k = rng.pick(ctx.kPool);
			const xs = rng.pickDistinct([2, 3, 4, 5, 6, 7, 8, 9, 10, 12], 4).sort((a, b) => a - b);
			const [x1, x2, x3, x4] = xs;
			const [y1, y2, y3, y4] = xs.map((x) => x * k);

			const content: ContentBlock[] = [
				{
					type: 'table',
					headerBackground: true,
					headers: [ctx.row1, `$${x1}$`, `$${x2}$`, { content: '......', answer: `$${x3}$`, mark: '0.5' }, `$${x4}$`],
					cells: [],
					rows: [
						[
							ctx.row2,
							`$${y1}$`,
							{ content: '......', answer: `$${y2}$`, mark: '0.5' },
							`$${y3}$`,
							{ content: '......', answer: `$${y4}$`, mark: '0.5' }
						]
					]
				},
				{
					type: 'text',
					content: '1) احسب معامل التناسبية الذي يسمح بالمرور من السطر الأول إلى السطر الثاني.',
					answer: `1) معامل التناسبية هو: $k = ${y1} div ${x1} = ${k}$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: '2) أتمم جدول التناسبية مع توضيح طريقة حساب المجهول الأول.',
					answer: `2) نضرب قيم السطر الأول في $${k}$ (أو نقسم قيم السطر الثاني على $${k}$): $${x2} times ${k} = ${y2}$، و$${y3} div ${k} = ${x3}$، و$${x4} times ${k} = ${y4}$.`,
					mark: '0.5'
				}
			];

			const qText = `${ctx.intro} إذا كانت القيمة الموافقة للعدد $${x1}$ هي $${y1}$، أوجد القيمة الموافقة للعدد $${x2}$ (اكتب العدد فقط).`;

			return {
				templateId: this.id,
				seed,
				grade: '2am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'fill_blank',
					questionText: qText,
					questionTextAr: qText,
					questionData: {
						sentence: `في جدول التناسبية، القيمة الموافقة للعدد ${x2} تساوي ___ ${ctx.unitOut}.`,
						acceptedAnswers: acceptNum(y2)
					},
					explanation: `معامل التناسبية هو $${y1} \\div ${x1} = ${k}$، ومنه القيمة المطلوبة هي $${x2} \\times ${k} = ${y2}$.`
				},
				sujetExercise: {
					points: 3,
					instruction: `${ctx.intro} الجدول يمثل وضعية تناسبية:`,
					content
				},
				hints: [
					'تذكّر أن جدول التناسبية يربط بين السطر الأول والسطر الثاني عبر معامل ثابت يسمى معامل التناسبية.',
					`احسب معامل التناسبية بقسمة قيمة السطر الثاني على قيمة السطر الأول في العمود المعلوم: ${y1} ÷ ${x1}.`,
					`اضرب العدد ${x2} في معامل التناسبية الذي وجدته لتحصل على القيمة المجهولة.`
				],
				solutionStepsAr: [
					`نحسب معامل التناسبية: ${y1} ÷ ${x1} = ${k}.`,
					`لإيجاد القيمة الموافقة لـ ${x2} نضرب في معامل التناسبية: ${x2} × ${k} = ${y2}.`,
					`لإيجاد القيمة المجهولة في السطر الأول الموافقة لـ ${y3} نقسم على معامل التناسبية: ${y3} ÷ ${k} = ${x3}.`,
					`لإيجاد القيمة الموافقة لـ ${x4}: ${x4} × ${k} = ${y4}.`
				],
				finalAnswer: `${y2} ${ctx.unitOut}`
			};
		}

		if (difficulty === 'medium') {
			const d = rng.pick([2, 3, 4, 5]);
			const coprimes: [number, number][] = [
				[2, 3],
				[2, 5],
				[3, 4],
				[3, 5],
				[4, 5],
				[3, 7],
				[4, 7],
				[5, 7]
			];
			const [p, r] = rng.pick(coprimes);
			const validS = [3, 4, 5, 6, 7, 8, 9, 11].filter((v) => v % d !== 0);
			const s = rng.pick(validS);

			const a = d * p;
			const b = p * s;
			const c = d * r;
			const x = s * r; // Fourth proportional: (b * c) / a = s * r
			const a2 = a * 2;
			const b2 = b * 2;

			const scenarios = [
				{
					intro: `في مخبزة، يتطلب تحضير $${a}$ فطائر استعمال $${b}$ غراماً من الزبدة.`,
					row1: 'عدد الفطائر',
					row2: 'كمية الزبدة (غ)',
					unitOut: 'غ',
					questionObj: `كمية الزبدة اللازمة لتحضير $${c}$ فطيرة`
				},
				{
					intro: `يبيع تاجر $${a}$ أقلام بنفس السعر الإجمالي $${b}$ دج.`,
					row1: 'عدد الأقلام',
					row2: 'الثمن (دج)',
					unitOut: 'دج',
					questionObj: `ثمن $${c}$ قلماً`
				},
				{
					intro: `تستهلك آلة طباعة $${b}$ ورقة لطباعة $${a}$ كتيباً متماثلاً.`,
					row1: 'عدد الكتيبات',
					row2: 'عدد الأوراق',
					unitOut: 'ورقة',
					questionObj: `عدد الأوراق اللازمة لطباعة $${c}$ كتيباً`
				}
			];
			const sc = rng.pick(scenarios);

			const content: ContentBlock[] = [
				{
					type: 'table',
					headerBackground: true,
					headers: [sc.row1, `$${a}$`, `$${c}$`, `$${a2}$`],
					cells: [],
					rows: [
						[
							sc.row2,
							`$${b}$`,
							{ content: '$x$', answer: `$${x}$`, mark: '1.5' },
							{ content: '......', answer: `$${b2}$`, mark: '0.5' }
						]
					]
				},
				{
					type: 'text',
					content: `1) احسب الرابع المتناسب $x$ باستعمال الجداءين المتصالبين، ثم أتمم الجدول.`,
					answer: `1) بتطبيق مساواة الجداءين المتصالبين: $${a} times x = ${b} times ${c}$ أي $x = frac(${b} times ${c}, ${a}) = ${x}$، والعمود الأخير: $${b} times 2 = ${b2}$.`,
					mark: '1'
				}
			];

			const qText = `${sc.intro} احسب باستعمال الرابع المتناسب ${sc.questionObj} (اكتب العدد فقط).`;

			return {
				templateId: this.id,
				seed,
				grade: '2am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'fill_blank',
					questionText: qText,
					questionTextAr: qText,
					questionData: {
						sentence: `قيمة الرابع المتناسب x تساوي ___ ${sc.unitOut}.`,
						acceptedAnswers: acceptNum(x)
					},
					explanation: `باستعمال الرابع المتناسب: $x = \\frac{${b} \\times ${c}}{${a}} = ${x}$.`
				},
				sujetExercise: {
					points: 3,
					instruction: `${sc.intro} يمثل الجدول الآتي هذه الوضعية التناسبية:`,
					content
				},
				hints: [
					'في جدول التناسبية، الجداءان المتصالبان متساويان.',
					`اكتب المساواة: ${a} × x = ${b} × ${c}.`,
					`احسب (${b} × ${c}) ثم اقسم الناتج على ${a}.`
				],
				solutionStepsAr: [
					`نطبق خاصية الجداءين المتصالبين: ${a} × x = ${b} × ${c}.`,
					`نحسب الجداء: ${b} × ${c} = ${b * c}.`,
					`نقسم على ${a}: x = ${b * c} ÷ ${a} = ${x}.`,
					`لإتمام العمود الأخير نلاحظ أن ${a2} = 2 × ${a}، إذن القيمة الموافقة هي 2 × ${b} = ${b2}.`
				],
				finalAnswer: `${x} ${sc.unitOut}`
			};
		}

		// Hard: Map or plan scale (مقياس خريطة أو تصميم)
		const useMap = seed % 2 === 0;
		const scaleE = useMap
			? rng.pick([25000, 50000, 100000, 200000, 500000])
			: rng.pick([200, 500, 1000, 2000, 5000]);

		let d1: number;
		let d2: number;
		let d3: number;
		let D1: number;
		let D2: number;
		let D3: number;
		let realUnitAr: string;
		let realUnitEn: 'km' | 'm';
		let factorToCm: number;
		let contextText: string;

		if (useMap) {
			realUnitAr = 'كلم';
			realUnitEn = 'km';
			factorToCm = 100000;
			const stepCm = scaleE === 25000 ? 4 : scaleE === 50000 ? 2 : 1;
			const mults = rng.pickDistinct([2, 3, 4, 5, 6, 7], 3).sort((a, b) => a - b);
			d1 = mults[0] * stepCm;
			d2 = mults[1] * stepCm;
			d3 = mults[2] * stepCm;
			D1 = (d1 * scaleE) / factorToCm;
			D2 = (d2 * scaleE) / factorToCm;
			D3 = (d3 * scaleE) / factorToCm;
			contextText = `على خريطة، قيسَت المسافة بين مدينتين فكانت $${d1}$ سم، علماً أن المسافة الحقيقية بينهما هي $${D1}$ كلم.`;
		} else {
			realUnitAr = 'م';
			realUnitEn = 'm';
			factorToCm = 100;
			const mults = rng.pickDistinct([3, 4, 5, 6, 7, 8, 9, 10], 3).sort((a, b) => a - b);
			d1 = mults[0];
			d2 = mults[1];
			d3 = mults[2];
			D1 = (d1 * scaleE) / factorToCm;
			D2 = (d2 * scaleE) / factorToCm;
			D3 = (d3 * scaleE) / factorToCm;
			contextText = `يمثل تصميم ملعب بلدي قطعة مستقيم طولها على التصميم $${d1}$ سم وطولها الحقيقي $${D1}$ م.`;
		}

		const D1Cm = D1 * factorToCm;
		const correctScaleText = `$\\frac{1}{${scaleE}}$`;
		const noConvRatio = D1 % d1 === 0 ? `$\\frac{1}{${D1 / d1}}$` : `$\\frac{${d1}}{${D1}}$`;
		const tenOff = `$\\frac{1}{${scaleE * 10}}$`;
		const inverted = `$${scaleE}$`;

		const mcq = buildUniqueMcqOptions(
			correctScaleText,
			[
				{
					text: noConvRatio,
					diagnosticFeedback: `تذكّر تحويل المسافة الحقيقية (${D1} ${realUnitEn}) إلى السنتيمتر (cm) قبل القسمة لحساب المقياس.`
				},
				{
					text: tenOff,
					diagnosticFeedback: `تحقق من معامل التحويل بين ${realUnitEn} و cm (1 km = 100000 cm و 1 m = 100 cm).`
				},
				{
					text: inverted,
					diagnosticFeedback: 'المقياس هو نسبة المسافة على التصميم إلى المسافة الحقيقية (1 في البسط للتصغير)، وليس مقلوبها.'
				}
			],
			rng
		);

		const contextTypst = useMap
			? `على خريطة، قيسَت المسافة بين مدينتين فكانت $${d1}$ سم، علماً أن المسافة الحقيقية بينهما هي $${D1}$ كلم.`
			: `في تصميم ملعب، يمثل طول قدره $${d1}$ سم مسافة حقيقية تساوي $${D1}$ م.`;

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) احسب مقياس هذه الخريطة (أو التصميم) على الشكل $frac(1, a)$.`,
				answer: `1) نحول المسافة الحقيقية إلى السنتيمتر: $${D1}$ ${realUnitAr} = $${D1Cm}$ سم. المقياس:\n\n$frac(${d1}, ${D1Cm}) = frac(1, ${scaleE})$`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: '2) أتمم جدول التناسبية التالي:',
				answer: `2) نضرب المسافة على التصميم في $${scaleE}$ للحصول على المسافة الحقيقية بالسنتيمتر ثم نحولها إلى وحدة (${realUnitAr})، والعكس بالقسمة.`,
				mark: '0.5'
			},
			{
				type: 'table',
				headerBackground: true,
				headers: ['المسافة على التصميم (سم)', `$${d1}$`, `$${d2}$`, { content: '......', answer: `$${d3}$`, mark: '0.5' }],
				cells: [],
				rows: [
					[
						`المسافة الحقيقية (${realUnitAr})`,
						`$${D1}$`,
						{ content: '......', answer: `$${D2}$`, mark: '0.5' },
						`$${D3}$`
					]
				]
			}
		];

		const qText = `${contextText} ما هو مقياس هذا الرسم؟`;

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				questionData: mcq,
				explanation: `نحول $${D1}\\text{ ${realUnitEn}}$ إلى السنتيمتر: $${D1Cm}\\text{ cm}$. المقياس $= \\frac{${d1}}{${D1Cm}} = \\frac{1}{${scaleE}}$.`
			},
			sujetExercise: {
				points: 3,
				instruction: contextTypst,
				content
			},
			hints: [
				'المقياس يساوي: المسافة على التصميم ÷ المسافة الحقيقية، بشرط التعبير عنهما بنفس الوحدة (cm).',
				`حوّل المسافة الحقيقية (${D1} ${realUnitEn}) إلى السنتيمتر بالضرب في ${factorToCm}.`,
				`اختزل الكسر بقسمة البسط والمقام على ${d1} لتكتب المقياس على الشكل 1 على عدد طبيعي.`
			],
			solutionStepsAr: [
				`نحول المسافة الحقيقية إلى السنتيمتر: ${D1} × ${factorToCm} = ${D1Cm} cm.`,
				`نكتب نسبة المقياس ونختزل على ${d1}: ${d1} / ${D1Cm} = 1 / ${scaleE}.`,
				`المسافة الحقيقية الموافقة لـ ${d2} cm: (${d2} × ${scaleE}) ÷ ${factorToCm} = ${D2} ${realUnitEn}.`,
				`المسافة على التصميم الموافقة لـ ${D3} ${realUnitEn}: (${D3} × ${factorToCm}) ÷ ${scaleE} = ${d3} cm.`
			],
			finalAnswer: `1/${scaleE}`
		};
	}
};

// ============================================================================
// 2. Percentages (calculating %, discount/increase price, original price, rate)
// ============================================================================

const percentagesTemplate: ParameterizedTemplate = {
	id: '2am_t3_percentages',
	grade: '2am',
	trimesterId: 't3',
	domain: 'proportionality',
	titleAr: 'النسبة المئوية والتخفيض والزيادة',
	curriculumLessonId: 'lesson_2am_t3_percentage_scale_unit_conversions',
	defaultPoints: 3,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 2, difficulty);

		if (difficulty === 'easy') {
			const isFrequencyVariant = seed % 2 === 1;
			if (!isFrequencyVariant) {
				const items = ['حقيبة مدرسية', 'معطف شتوي', 'حذاء رياضي', 'موسوعة علمية', 'آلة حاسبة'];
				const item = rng.pick(items);
				const price = rng.priceDA(1000, 4800, 200);
				const rate = rng.pick([10, 15, 20, 25, 30, 40]);
				const discount = (price * rate) / 100;
				const newPrice = price - discount;

				const mcq = buildUniqueMcqOptions(
					`$${newPrice}\\text{ DA}$`,
					[
						{
							text: `$${discount}\\text{ DA}$`,
							diagnosticFeedback: 'هذا هو مبلغ التخفيض فقط، وليس السعر الجديد بعد التخفيض. يجب طرحه من السعر الأصلي.'
						},
						{
							text: `$${price + discount}\\text{ DA}$`,
							diagnosticFeedback: 'قمت بجمع قيمة التخفيض مع السعر الأصلي (زيادة) بدلاً من طرحها.'
						},
						{
							text: `$${price - rate}\\text{ DA}$`,
							diagnosticFeedback: 'لا نطرح النسبة المئوية مباشرة من السعر، بل نحسب قيمة التخفيض أولاً: (السعر × النسبة) ÷ 100.'
						}
					],
					rng
				);

				const qText = `يبلغ سعر ${item} $${price}\\text{ DA}$. استفاد زبون من تخفيض بنسبة $${rate}\\%$. ما هو السعر الجديد بعد التخفيض؟`;

				return {
					templateId: this.id,
					seed,
					grade: '2am',
					trimesterId: 't3',
					difficulty,
					domain: this.domain,
					titleAr: this.titleAr,
					quizQuestion: {
						type: 'mcq',
						questionText: qText,
						questionTextAr: qText,
						questionData: mcq,
						explanation: `قيمة التخفيض: $${price} \\times \\frac{${rate}}{100} = ${discount}\\text{ DA}$. السعر الجديد: $${price} - ${discount} = ${newPrice}\\text{ DA}$.`
					},
					sujetExercise: {
						points: 3,
						instruction: `يُعرض ${item} في متجر بسعر $${price}$ دج، وخُصص له تخفيض بنسبة $${rate}%$.`,
						content: [
							{
								type: 'text',
								content: '1) احسب مبلغ التخفيض بالدينار الجزائري.',
								answer: `1) مبلغ التخفيض: $${price} times frac(${rate}, 100) = ${discount}$ دج.`,
								mark: '1.5'
							},
							{
								type: 'text',
								content: '2) استنتج السعر الجديد للسلعة بعد التخفيض.',
								answer: `2) السعر الجديد: $${price} - ${discount} = ${newPrice}$ دج.`,
								mark: '1.5'
							}
						]
					},
					hints: [
						`لحساب ${rate}% من مبلغ، نضرب المبلغ في ${rate} ثم نقسم على 100.`,
						`احسب أولاً مبلغ التخفيض: (${price} × ${rate}) ÷ 100.`,
						'اطرح مبلغ التخفيض من السعر الأصلي للحصول على السعر الجديد.'
					],
					solutionStepsAr: [
						`حساب قيمة التخفيض: (${price} × ${rate}) ÷ 100 = ${discount} دج.`,
						`حساب السعر الجديد بعد التخفيض: ${price} - ${discount} = ${newPrice} دج.`
					],
					finalAnswer: `${newPrice} دج`
				};
			}

			// Percentage frequency variant
			const total = rng.pick([20, 25, 40, 50, 100, 200]);
			const validRates = [15, 20, 25, 30, 35, 40, 45, 60, 65, 70, 75, 80, 85].filter(
				(r) => ((total * r) / 100) % 1 === 0
			);
			const rate = rng.pick(validRates);
			const part = (total * rate) / 100;
			const rest = total - part;
			const complementRate = 100 - rate;
			const inverted = roundTo((total / part) * 100, 1);

			const mcq = buildUniqueMcqOptions(
				`$${rate}\\%$`,
				[
					{
						text: `$${complementRate}\\%$`,
						diagnosticFeedback: 'هذه النسبة تمثل عدد غير الناجحين (المكملة لـ 100%) وليس نسبة التلاميذ الناجحين.'
					},
					{
						text: `$${part}\\%$`,
						diagnosticFeedback: `العدد ${part} هو عدد التلاميذ وليس النسبة المئوية، يجب قسمته على المجموع الكلي (${total}) ثم الضرب في 100.`
					},
					{
						text: `$${inverted}\\%$`,
						diagnosticFeedback: 'قمت بقسمة المجموع الكلي على الجزء بدلاً من قسمة الجزء على المجموع الكلي.'
					}
				],
				rng
			);

			const qText = `في متوسطة، اجتاز الامتحان $${total}$ تلميذاً فنجح منهم $${part}$ تلميذاً. ما هي النسبة المئوية للتلاميذ الناجحين؟`;

			return {
				templateId: this.id,
				seed,
				grade: '2am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					questionData: mcq,
					explanation: `النسبة المئوية للناجحين هي $\\frac{${part}}{${total}} \\times 100 = ${rate}\\%$.`
				},
				sujetExercise: {
					points: 3,
					instruction: `تقدم للامتحان التجريبي $${total}$ تلميذاً من السنة الثانية متوسط، فنجح منهم $${part}$ تلميذاً.`,
					content: [
						{
							type: 'text',
							content: '1) احسب النسبة المئوية للتلاميذ الناجحين.',
							answer: `1) النسبة المئوية للناجحين: $frac(${part}, ${total}) times 100 = ${rate}%$.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: '2) احسب عدد التلاميذ غير الناجحين ثم استنتج نسبتهم المئوية.',
							answer: `2) عدد غير الناجحين: $${total} - ${part} = ${rest}$ تلميذاً، ونسبتهم: $100% - ${rate}% = ${complementRate}%$.`,
							mark: '1.5'
						}
					]
				},
				hints: [
					'النسبة المئوية لجزء من كل تساوي (الجزء ÷ الكل) × 100.',
					`اقسم عدد الناجحين (${part}) على العدد الكلي (${total}).`,
					'اضرب حاصل القسمة في 100 للحصول على النسبة المئوية.'
				],
				solutionStepsAr: [
					`نحسب النسبة المئوية للناجحين: (${part} ÷ ${total}) × 100 = ${rate}%.`,
					`عدد التلاميذ غير الناجحين: ${total} - ${part} = ${rest}.`,
					`النسبة المئوية لغير الناجحين: 100% - ${rate}% = ${complementRate}%.`
				],
				finalAnswer: `${rate}%`
			};
		}

		if (difficulty === 'medium') {
			const isIncrease = seed % 2 === 1;
			const price = rng.priceDA(1600, 16000, 200);
			const rate = rng.pick([12, 15, 18, 20, 25, 30, 35, 40]);
			const delta = (price * rate) / 100;
			const finalPrice = isIncrease ? price + delta : price - delta;
			const oppositePrice = isIncrease ? price - delta : price + delta;

			const labelOp = isIncrease ? 'زيادة' : 'تخفيض';
			const item = isIncrease ? rng.pick(['دراجة هوائية', 'هاتف نقال', 'طاولة خشبية', 'جهاز كهربائي']) : rng.pick(['لوحة إلكترونية', 'سترة جلدية', 'مكتب دراسة', 'ساعة ذكية']);

			const mcq = buildUniqueMcqOptions(
				`$${finalPrice}\\text{ DA}$`,
				[
					{
						text: `$${delta}\\text{ DA}$`,
						diagnosticFeedback: `هذا هو مبلغ الـ${labelOp} فقط، وليس السعر النهائي بعد الـ${labelOp}.`
					},
					{
						text: `$${oppositePrice}\\text{ DA}$`,
						diagnosticFeedback: isIncrease
							? 'طرحت مبلغ الزيادة بدلاً من إضافته إلى السعر الأصلي.'
							: 'أضفت مبلغ التخفيض بدلاً من طرحه من السعر الأصلي.'
					},
					{
						text: `$${isIncrease ? price + rate : price - rate}\\text{ DA}$`,
						diagnosticFeedback: `لا ${isIncrease ? 'نضيف' : 'نطرح'} العدد ${rate} مباشرة، بل نحسب ${rate}% من ${price} أولاً.`
					}
				],
				rng
			);

			const qText = `كان سعر ${item} $${price}\\text{ DA}$، ثم طرأ عليه ${labelOp} بنسبة $${rate}\\%$. ما هو السعر الجديد؟`;

			return {
				templateId: this.id,
				seed,
				grade: '2am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					questionData: mcq,
					explanation: `مقدار الـ${labelOp}: $${price} \\times \\frac{${rate}}{100} = ${delta}\\text{ DA}$. السعر الجديد: $${price} ${isIncrease ? '+' : '-'} ${delta} = ${finalPrice}\\text{ DA}$.`
				},
				sujetExercise: {
					points: 3,
					instruction: `بلغ سعر ${item} $${price}$ دج، وبعد فترة طبّق البائع ${labelOp} بنسبة $${rate}%$.`,
					content: [
						{
							type: 'text',
							content: `1) احسب قيمة الـ${labelOp} بالدينار الجزائري.`,
							answer: `1) قيمة الـ${labelOp}: $${price} times frac(${rate}, 100) = ${delta}$ دج.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `2) احسب السعر الجديد بعد الـ${labelOp}.`,
							answer: `2) السعر الجديد: $${price} ${isIncrease ? '+' : '-'} ${delta} = ${finalPrice}$ دج.`,
							mark: '1.5'
						}
					]
				},
				hints: [
					`احسب أولاً قيمة الـ${labelOp} التي تمثل ${rate}% من ${price} دج.`,
					`قيمة الـ${labelOp} = (${price} × ${rate}) ÷ 100.`,
					isIncrease ? 'أضف قيمة الزيادة إلى السعر الأصلي.' : 'اطرح قيمة التخفيض من السعر الأصلي.'
				],
				solutionStepsAr: [
					`حساب قيمة الـ${labelOp}: (${price} × ${rate}) ÷ 100 = ${delta} دج.`,
					`حساب السعر الجديد: ${price} ${isIncrease ? '+' : '-'} ${delta} = ${finalPrice} دج.`
				],
				finalAnswer: `${finalPrice} دج`
			};
		}

		// Hard: Reverse percentage (find original price) or find discount rate %
		const originalPrice = rng.pick([2000, 2500, 3000, 4000, 5000, 6000, 8000, 10000, 12000]);
		const rate = rng.pick([10, 20, 25, 30, 40]);
		const discount = (originalPrice * rate) / 100;
		const discountedPrice = originalPrice - discount;
		const paidRate = 100 - rate;

		if (seed % 2 === 0) {
			// Find original price given discountedPrice and discount rate
			const wrongAddOnDiscounted = roundTo(discountedPrice * (1 + rate / 100), 2);
			const wrongSubAgain = roundTo(discountedPrice * (1 - rate / 100), 2);
			const wrongPlusRate = discountedPrice + rate;

			const mcq = buildUniqueMcqOptions(
				`$${originalPrice}\\text{ DA}$`,
				[
					{
						text: `$${fmtNum(wrongAddOnDiscounted)}\\text{ DA}$`,
						diagnosticFeedback: `خطأ شائع: حساب ${rate}% من السعر الجديد (${discountedPrice}) وإضافتها لا يرجع السعر الأصلي؛ السعر الجديد يمثل ${paidRate}% من السعر الأصلي.`
					},
					{
						text: `$${fmtNum(wrongSubAgain)}\\text{ DA}$`,
						diagnosticFeedback: 'قمت بتخفيض السعر المخفّض مرة أخرى بدلاً من استرجاع السعر الأصلي.'
					},
					{
						text: `$${wrongPlusRate}\\text{ DA}$`,
						diagnosticFeedback: 'النسبة المئوية ليست مبلغاً بالدينار يضاف مباشرة إلى السعر.'
					}
				],
				rng
			);

			const qText = `بعد تخفيض بنسبة $${rate}\\%$، أصبح سعر معطف $${discountedPrice}\\text{ DA}$. ما هو السعر الأصلي قبل التخفيض؟`;

			return {
				templateId: this.id,
				seed,
				grade: '2am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					questionData: mcq,
					explanation: `السعر بعد التخفيض يمثل $(100 - ${rate})\\% = ${paidRate}\\%$ من السعر الأصلي. باستعمال الرابع المتناسب: $\\frac{${discountedPrice} \\times 100}{${paidRate}} = ${originalPrice}\\text{ DA}$.`
				},
				sujetExercise: {
					points: 3,
					instruction: `اشترى زبون معطفاً بمبلغ $${discountedPrice}$ دج بعد الاستفادة من تخفيض بنسبة $${rate}%$.`,
					content: [
						{
							type: 'text',
							content: '1) ما هي النسبة المئوية التي يمثلها السعر المدفوع من السعر الأصلي؟',
							answer: `1) يمثل السعر المدفوع نسبة: $100% - ${rate}% = ${paidRate}%$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: '2) باستعمال الرابع المتناسب (أو جدول التناسبية)، احسب السعر الأصلي للمعطف قبل التخفيض.',
							answer: `2) السعر الأصلي: $P_0 = frac(${discountedPrice} times 100, ${paidRate}) = ${originalPrice}$ دج.`,
							mark: '2'
						}
					]
				},
				hints: [
					`إذا كان التخفيض ${rate}% فإن المبلغ المدفوع يمثل (100 - ${rate})% من السعر الأصلي.`,
					`السعر ${discountedPrice} دج يقابل ${paidRate}%، والسعر الأصلي يقابل 100%.`,
					`استعمل الرابع المتناسب: (${discountedPrice} × 100) ÷ ${paidRate}.`
				],
				solutionStepsAr: [
					`النسبة المئوية الموافقة للسعر بعد التخفيض: 100% - ${rate}% = ${paidRate}%.`,
					`نطبق الرابع المتناسب: السعر الأصلي = (${discountedPrice} × 100) ÷ ${paidRate} = ${originalPrice} دج.`,
					`التحقق: ${rate}% من ${originalPrice} تساوي ${discount} دج، و${originalPrice} - ${discount} = ${discountedPrice} دج.`
				],
				finalAnswer: `${originalPrice} دج`
			};
		}

		// Find discount rate % given originalPrice and discountedPrice
		const wrongOverNew = roundTo((discount / discountedPrice) * 100, 1);

		const mcq = buildUniqueMcqOptions(
			`$${rate}\\%$`,
			[
				{
					text: `$${paidRate}\\%$`,
					diagnosticFeedback: 'هذه نسبة السعر المدفوع بعد التخفيض، والمطلوب هو نسبة التخفيض نفسها.'
				},
				{
					text: `$${discount}\\%$`,
					diagnosticFeedback: `العدد ${discount} يمثل مبلغ التخفيض بالدينار، ولتحويله إلى نسبة مئوية نقسمه على السعر الأصلي (${originalPrice}) ونضرب في 100.`
				},
				{
					text: `$${fmtNum(wrongOverNew)}\\%$`,
					diagnosticFeedback: 'النسبة المئوية للتخفيض تُحسب بقسمة مبلغ التخفيض على السعر الأصلي، وليس على السعر الجديد.'
				}
			],
			rng
		);

		const qText = `انخفض سعر غسالة ملابس من $${originalPrice}\\text{ DA}$ إلى $${discountedPrice}\\text{ DA}$. ما هي النسبة المئوية للتخفيض؟`;

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				questionData: mcq,
				explanation: `مبلغ التخفيض: $${originalPrice} - ${discountedPrice} = ${discount}\\text{ DA}$. نسبة التخفيض: $\\frac{${discount}}{${originalPrice}} \\times 100 = ${rate}\\%$.`
			},
			sujetExercise: {
				points: 3,
				instruction: `انخفض سعر منتج في متجر من $${originalPrice}$ دج إلى $${discountedPrice}$ دج.`,
				content: [
					{
						type: 'text',
						content: '1) احسب مبلغ التخفيض بالدينار الجزائري.',
						answer: `1) مبلغ التخفيض: $${originalPrice} - ${discountedPrice} = ${discount}$ دج.`,
						mark: '1'
					},
					{
						type: 'text',
						content: '2) احسب النسبة المئوية لهذا التخفيض.',
						answer: `2) نسبة التخفيض: $frac(${discount}, ${originalPrice}) times 100 = ${rate}%$.`,
						mark: '2'
					}
				]
			},
			hints: [
				'احسب أولاً مبلغ التخفيض بطرح السعر الجديد من السعر الأصلي.',
				`نسبة التخفيض تساوي (مبلغ التخفيض ÷ السعر الأصلي) × 100.`,
				`احسب (${discount} ÷ ${originalPrice}) × 100.`
			],
			solutionStepsAr: [
				`مبلغ التخفيض = ${originalPrice} - ${discountedPrice} = ${discount} دج.`,
				`النسبة المئوية للتخفيض = (${discount} ÷ ${originalPrice}) × 100 = ${rate}%.`
			],
			finalAnswer: `${rate}%`
		};
	}
};

// ============================================================================
// 3. Statistics: frequency, relative frequency (التكرار والتواتر), classes & bar charts
// ============================================================================

const statisticsTemplate: ParameterizedTemplate = {
	id: '2am_t3_statistics_frequency_barchart',
	grade: '2am',
	trimesterId: 't3',
	domain: 'proportionality',
	titleAr: 'تنظيم المعطيات: التكرار والتواتر والمخطط بالأعمدة',
	curriculumLessonId: 'lesson_2am_t3_statistics_classes_frequency',
	defaultPoints: 3,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 3, difficulty);

		// Choose N in {20, 25, 50, 100} so every relative frequency terminates cleanly in <= 2 decimals and % is an exact integer
		const N = difficulty === 'easy' ? rng.pick([20, 25]) : rng.pick([25, 50, 100]);

		// Partition N into 4 positive distinct-enough frequencies
		const minPart = Math.max(2, Math.floor(N * 0.1));
		const p0 = rng.int(minPart, Math.floor(N * 0.35));
		const p1 = rng.int(minPart, Math.floor((N - p0) * 0.45));
		const p2 = rng.int(minPart, Math.floor((N - p0 - p1) * 0.6));
		const p3 = N - p0 - p1 - p2;
		const freqs = [p0, p1, p2, p3];
		const relFreqs = freqs.map((f) => roundTo(f / N, 2));
		const pcts = freqs.map((f) => (f * 100) / N);

		if (difficulty === 'easy') {
			const themes = [
				{
					intro: 'يمثل المخطط بالأعمدة توزيع تلاميذ قسم حسب الرياضة المفضلة لديهم.',
					headerCol: 'الرياضة',
					labels: ['كرة القدم', 'السباحة', 'الجودو', 'العدو']
				},
				{
					intro: 'يمثل المخطط بالأعمدة وسيلة النقل التي يستعملها التلاميذ للوصول إلى المتوسطة.',
					headerCol: 'وسيلة النقل',
					labels: ['مشياً', 'حافلة', 'سيارة', 'دراجة']
				},
				{
					intro: 'يمثل المخطط بالأعمدة الهواية المفضلة لدى مجموعة من التلاميذ.',
					headerCol: 'الهواية',
					labels: ['المطالعة', 'الرسم', 'الشطرنج', 'المسرح']
				}
			];
			const th = rng.pick(themes);
			const bars = th.labels.map((label, idx) => ({ label, value: freqs[idx] }));
			const maxVal = Math.max(...freqs) + 2;
			const svgPath = saveSvgAsset(`2am_t3_stats_${difficulty}_s${seed}`, svgBarChart(bars, maxVal));

			const targetIdx = rng.int(0, 3);
			const targetLabel = th.labels[targetIdx];
			const fTarget = freqs[targetIdx];
			const rfTarget = relFreqs[targetIdx];
			const [sNum, sDen] = simplifyFraction(fTarget, N);

			const mcq = buildUniqueMcqOptions(
				`$${fmtNum(rfTarget)}$`,
				[
					{
						text: `$${fTarget}$`,
						diagnosticFeedback: `العدد ${fTarget} هو التكرار وليس التواتر. التواتر يساوي التكرار مقسوماً على التكرار الكلي (${N}).`
					},
					{
						text: `$${fmtNum(roundTo(1 - rfTarget, 2))}$`,
						diagnosticFeedback: 'هذا هو التواتر المكمل لبقية الفئات وليس تواتر الفئة المطلوبة.'
					},
					{
						text: `$${fmtNum(roundTo(fTarget / 100, 2))}$`,
						diagnosticFeedback: `قسمت على 100 بدلاً من القسمة على التكرار الكلي (${N}).`
					}
				],
				rng
			);

			const tableCellsRow1: (string | TableCell)[] = [
				'التكرار',
				...freqs.map((f, i) =>
					i === targetIdx ? { content: '......', answer: `$${f}$`, mark: '0.5' } : `$${f}$`
				),
				{ content: '......', answer: `$${N}$`, mark: '0.5' }
			];
			const tableCellsRow2: (string | TableCell)[] = [
				'التواتر',
				...relFreqs.map((rf, i) =>
					i === targetIdx
						? { content: '......', answer: `$frac(${freqs[i]}, ${N}) = ${fmtNum(rf)}$`, mark: '0.5' }
						: { content: '......', answer: `$${fmtNum(rf)}$` }
				),
				'$1$'
			];

			const qText = `${th.intro} احسب تواتر فئة (${targetLabel}) علماً أن التكرار الكلي هو $${N}$.`;

			return {
				templateId: this.id,
				seed,
				grade: '2am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: 'مخطط بالأعمدة لتوزيع التكرارات',
					questionData: mcq,
					explanation: `من المخطط، تكرار (${targetLabel}) هو $${fTarget}$ والتكرار الكلي هو $${N}$، إذن التواتر $= \\frac{${fTarget}}{${N}} = \\frac{${sNum}}{${sDen}} = ${fmtNum(rfTarget)}$.`
				},
				sujetExercise: {
					points: 3,
					instruction: th.intro,
					content: [
						{ type: 'image', src: svgPath, caption: 'مخطط بالأعمدة للتكرارات' },
						{
							type: 'text',
							content: '1) انطلاقاً من المخطط، أتمم الجدول الآتي (التكرار والتواتر):',
							answer: `1) مجموع التكرارات: $N = ${freqs.join(' + ')} = ${N}$، ونحسب كل تواتر بالقسمة على $${N}$ (مجموع التواترات يساوي $1$).`,
							mark: '1.5'
						},
						{
							type: 'table',
							headerBackground: true,
							headers: [th.headerCol, ...th.labels, 'المجموع'],
							cells: [],
							rows: [tableCellsRow1, tableCellsRow2]
						}
					]
				},
				hints: [
					'التكرار الكلي هو مجموع تكرارات كل الأعمدة الظاهرة في المخطط.',
					`التواتر (التكرار النسبي) لقيمة يساوي: تكرار القيمة ÷ التكرار الكلي (${N}).`,
					`اقرأ ارتفاع عمود (${targetLabel}) من المخطط (${fTarget}) ثم اقسمه على ${N}.`
				],
				solutionStepsAr: [
					`نقرأ التكرارات من المخطط: ${freqs.join(' ، ')}.`,
					`نحسب التكرار الكلي: ${freqs.join(' + ')} = ${N}.`,
					`تواتر (${targetLabel}) = ${fTarget} ÷ ${N} = ${fmtNum(rfTarget)}.`,
					`نتحقق أن مجموع التواترات يساوي: ${relFreqs.map(fmtNum).join(' + ')} = 1.`
				],
				finalAnswer: fmtNum(rfTarget)
			};
		}

		// Medium & Hard: Equal-width classes (فئات متساوية المدى)
		const classThemes = [
			{
				intro: 'يمثل المخطط بالأعمدة توزيع علامات تلاميذ قسم في فرض مادة الرياضيات على 20، منظمة في فئات متساوية المدى.',
				headerCol: 'فئة العلامات',
				classLabels: ['[0;5[', '[5;10[', '[10;15[', '[15;20]'],
				typstHeaders: ['$[0 ; 5[$', '$[5 ; 10[$', '$[10 ; 15[$', '$[15 ; 20]$'],
				splitDesc: 'علامة أكبر من أو تساوي $10$'
			},
			{
				intro: 'يمثل المخطط بالأعمدة توزيع مدة المطالعة اليومية (بالدقيقة) لمجموعة من التلاميذ في فئات متساوية المدى.',
				headerCol: 'المدة (دقيقة)',
				classLabels: ['[0;15[', '[15;30[', '[30;45[', '[45;60]'],
				typstHeaders: ['$[0 ; 15[$', '$[15 ; 30[$', '$[30 ; 45[$', '$[45 ; 60]$'],
				splitDesc: 'مدة مطالعة أكبر من أو تساوي $30$ دقيقة'
			}
		];
		const ct = rng.pick(classThemes);
		const bars = ct.classLabels.map((label, idx) => ({ label, value: freqs[idx] }));
		const maxVal = Math.max(...freqs) + Math.ceil(N * 0.08);
		const svgPath = saveSvgAsset(`2am_t3_stats_${difficulty}_s${seed}`, svgBarChart(bars, maxVal));

		// Combined upper two classes (>= midpoint)
		const upperFreq = freqs[2] + freqs[3];
		const upperPct = pcts[2] + pcts[3];
		const lowerPct = pcts[0] + pcts[1];
		const upperRel = roundTo(upperFreq / N, 2);

		const askUpper = difficulty === 'hard' || seed % 2 === 0;
		const targetSingleIdx = rng.int(0, 3);

		const correctPct = askUpper ? upperPct : pcts[targetSingleIdx];
		const wrongComplement = 100 - correctPct;
		const wrongRawCount = askUpper ? upperFreq : freqs[targetSingleIdx];
		const wrongDecimalAsPct = askUpper ? fmtNum(upperRel) : fmtNum(relFreqs[targetSingleIdx]);

		const mcq = buildUniqueMcqOptions(
			`$${correctPct}\\%$`,
			[
				{
					text: `$${wrongComplement}\\%$`,
					diagnosticFeedback: 'هذه النسبة تمثل الفئات المكملة (الأصغر من الحد المطلوب) وليس الفئات المعنية بالسؤال.'
				},
				{
					text: `$${wrongRawCount}\\%$`,
					diagnosticFeedback: `العدد ${wrongRawCount} هو التكرار وليس النسبة المئوية، يجب قسمته على المجموع الكلي (${N}) ثم الضرب في 100.`
				},
				{
					text: `$${wrongDecimalAsPct}\\%$`,
					diagnosticFeedback: 'القيمة العشرية هي التواتر؛ لتحويل التواتر إلى نسبة مئوية نضربه في 100.'
				}
			],
			rng
		);

		const hiddenIdx = difficulty === 'hard' ? rng.int(0, 3) : -1;

		const freqRow: (string | TableCell)[] = [
			'التكرار',
			...freqs.map((f, i) =>
				i === hiddenIdx ? { content: '......', answer: `$${f}$`, mark: '0.5' } : `$${f}$`
			),
			`$${N}$`
		];
		const relRow: (string | TableCell)[] = [
			'التواتر',
			...relFreqs.map((rf, i) =>
				i === 0
					? { content: '......', answer: `$frac(${freqs[i]}, ${N}) = ${fmtNum(rf)}$`, mark: '0.5' }
					: { content: '......', answer: `$${fmtNum(rf)}$` }
			),
			'$1$'
		];
		const pctRow: (string | TableCell)[] = [
			'النسبة المئوية',
			...pcts.map((p) => ({ content: '......', answer: `$${p}%$` })),
			'$100%$'
		];

		const qText = askUpper
			? `${ct.intro} ما هي النسبة المئوية للتلاميذ في الفئتين الأخيرتين (${ct.splitDesc})؟`
			: `${ct.intro} ما هي النسبة المئوية للفئة $${ct.classLabels[targetSingleIdx]}$؟`;

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: 'مخطط بالأعمدة للفئات متساوية المدى',
				questionData: mcq,
				explanation: askUpper
					? `تكرار الفئتين الأخيرتين $= ${freqs[2]} + ${freqs[3]} = ${upperFreq}$ من أصل $${N}$، أي تواتر $= ${fmtNum(upperRel)}$ ونسبة مئوية $= ${correctPct}\\%$.`
					: `تكرار الفئة يساوي $${freqs[targetSingleIdx]}$ من أصل $${N}$، أي $\\frac{${freqs[targetSingleIdx]}}{${N}} \\times 100 = ${correctPct}\\%$.`
			},
			sujetExercise: {
				points: 3,
				instruction: ct.intro,
				content: [
					{ type: 'image', src: svgPath, caption: 'مخطط بالأعمدة للفئات متساوية المدى' },
					{
						type: 'table',
						headerBackground: true,
						headers: [ct.headerCol, ...ct.typstHeaders, 'المجموع'],
						cells: [],
						rows: [freqRow, relRow, pctRow]
					},
					{
						type: 'text',
						content: `1) أتمم جدول التكرار والتواتر والنسب المئوية (مع التحقق من أن مجموع التواترات يساوي $1$).`,
						answer: `1) التكرار الكلي $N = ${N}$، والتواتر يحسب بقسمة كل تكرار على $${N}$ ثم نضرب في $100$ لإيجاد النسبة المئوية.`,
						mark: difficulty === 'hard' ? '1' : '1.5'
					},
					{
						type: 'text',
						content: `2) احسب عدد التلاميذ في الفئتين اللتين تحققان (${ct.splitDesc}) ثم استنتج نسبتهم المئوية.`,
						answer: `2) التكرار المطلوب: $${freqs[2]} + ${freqs[3]} = ${upperFreq}$ تلميذاً، والتواتر: $frac(${upperFreq}, ${N}) = ${fmtNum(upperRel)}$ أي بنسبة $${upperPct}%$ (بينما البقية نسبتهم $${lowerPct}%$).`,
						mark: '1'
					}
				]
			},
			hints: [
				`التكرار الكلي للسلسلة الإحصائية هو ${N}.`,
				'احسب التكرار الموافق من المخطط بالأعمدة ثم اقسمه على التكرار الكلي لإيجاد التواتر.',
				'للحصول على النسبة المئوية، اضرب التواتر في 100.'
			],
			solutionStepsAr: [
				`التكرارات من المخطط هي: ${freqs.join(' ، ')} ومجموعها ${N}.`,
				`التواترات هي: ${relFreqs.map(fmtNum).join(' ، ')} ومجموعها 1.`,
				askUpper
					? `مجموع تكرار الفئتين الأخيرتين = ${freqs[2]} + ${freqs[3]} = ${upperFreq}، والنسبة المئوية = (${upperFreq} ÷ ${N}) × 100 = ${upperPct}%.`
					: `نسبة الفئة المطلوبة = (${freqs[targetSingleIdx]} ÷ ${N}) × 100 = ${correctPct}%.`
			],
			finalAnswer: `${correctPct}%`
		};
	}
};

// ============================================================================
// 4. Right prism (الموشور القائم): lateral area, total area & volume V = B × h
// ============================================================================

const rightPrismTemplate: ParameterizedTemplate = {
	id: '2am_t3_right_prism',
	grade: '2am',
	trimesterId: 't3',
	domain: 'measurement',
	titleAr: 'الموشور القائم: المساحة الجانبية والكلية والحجم',
	curriculumLessonId: 'lesson_2am_t3_right_prism_net_area_volume',
	defaultPoints: 3,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 4, difficulty);

		// Valid triangular base configs with exact integer perimeter, altitude & area (no Pythagoras required!)
		const triConfigs = [
			{ kind: 'قائم', a: 3, b: 4, c: 5, baseDesc: 'مثلث قائم أطوال أضلاعه $3$ سم، $4$ سم و$5$ سم', baseDescKaTeX: 'مثلث قائم أطوال أضلاعه $3\\text{ cm}$ و$4\\text{ cm}$ و$5\\text{ cm}$', B: 6, P: 12, labelSvg: 'a=3, b=4, c=5 cm' },
			{ kind: 'قائم', a: 6, b: 8, c: 10, baseDesc: 'مثلث قائم أطوال أضلاعه $6$ سم، $8$ سم و$10$ سم', baseDescKaTeX: 'مثلث قائم أطوال أضلاعه $6\\text{ cm}$ و$8\\text{ cm}$ و$10\\text{ cm}$', B: 24, P: 24, labelSvg: 'a=6, b=8, c=10 cm' },
			{ kind: 'قائم', a: 5, b: 12, c: 13, baseDesc: 'مثلث قائم أطوال أضلاعه $5$ سم، $12$ سم و$13$ سم', baseDescKaTeX: 'مثلث قائم أطوال أضلاعه $5\\text{ cm}$ و$12\\text{ cm}$ و$13\\text{ cm}$', B: 30, P: 30, labelSvg: 'a=5, b=12, c=13 cm' },
			{ kind: 'قائم', a: 9, b: 12, c: 15, baseDesc: 'مثلث قائم أطوال أضلاعه $9$ سم، $12$ سم و$15$ سم', baseDescKaTeX: 'مثلث قائم أطوال أضلاعه $9\\text{ cm}$ و$12\\text{ cm}$ و$15\\text{ cm}$', B: 54, P: 36, labelSvg: 'a=9, b=12, c=15 cm' },
			{ kind: 'متساوي الساقين', a: 6, b: 5, c: 5, baseDesc: 'مثلث متساوي الساقين قاعدته $6$ سم، ساقه $5$ سم وارتفاعه المتعلق بالقاعدة $4$ سم', baseDescKaTeX: 'مثلث متساوي الساقين قاعدته $6\\text{ cm}$، ساقه $5\\text{ cm}$ وارتفاعه $4\\text{ cm}$', B: 12, P: 16, labelSvg: 'P=16 cm, B=12 cm²' },
			{ kind: 'متساوي الساقين', a: 8, b: 5, c: 5, baseDesc: 'مثلث متساوي الساقين قاعدته $8$ سم، ساقه $5$ سم وارتفاعه المتعلق بالقاعدة $3$ سم', baseDescKaTeX: 'مثلث متساوي الساقين قاعدته $8\\text{ cm}$، ساقه $5\\text{ cm}$ وارتفاعه $3\\text{ cm}$', B: 12, P: 18, labelSvg: 'P=18 cm, B=12 cm²' },
			{ kind: 'متساوي الساقين', a: 12, b: 10, c: 10, baseDesc: 'مثلث متساوي الساقين قاعدته $12$ سم، ساقه $10$ سم وارتفاعه المتعلق بالقاعدة $8$ سم', baseDescKaTeX: 'مثلث متساوي الساقين قاعدته $12\\text{ cm}$، ساقه $10\\text{ cm}$ وارتفاعه $8\\text{ cm}$', B: 48, P: 32, labelSvg: 'P=32 cm, B=48 cm²' }
		];

		const cfg = rng.pick(triConfigs);
		const H = rng.int(4, 15);
		const AL = cfg.P * H;
		const AT = AL + 2 * cfg.B;
		const V = cfg.B * H;

		const svgPath = saveSvgAsset(
			`2am_t3_prism_${difficulty}_s${seed}`,
			svgPrismCylinder({
				kind: 'prism',
				radiusOrBaseLabel: cfg.labelSvg,
				heightLabel: `h=${H}cm`
			})
		);

		if (difficulty === 'easy') {
			const askVolume = seed % 2 === 1;
			const target = askVolume ? V : AL;
			const targetUnit = askVolume ? 'cm3' : 'cm2';
			const wrongForgetHalf = cfg.a * cfg.b * H;
			const wrongOther = askVolume ? AL : V;
			const wrongOneBase = AL + cfg.B;

			const mcq = buildUniqueMcqOptions(
				`$${target}\\,${unitTagKaTeX(targetUnit)}$`,
				[
					{
						text: `$${wrongOther}\\,${unitTagKaTeX(targetUnit)}$`,
						diagnosticFeedback: askVolume
							? 'هذا ناتج محيط القاعدة × الارتفاع (المساحة الجانبية) وليس الحجم.'
							: 'هذا ناتج مساحة القاعدة × الارتفاع (الحجم) وليس المساحة الجانبية.'
					},
					{
						text: `$${wrongForgetHalf}\\,${unitTagKaTeX(targetUnit)}$`,
						diagnosticFeedback: 'تذكّر أن مساحة المثلث تساوي (القاعدة × الارتفاع) ÷ 2، ولا تنسَ القسمة على 2.'
					},
					{
						text: `$${wrongOneBase}\\,${unitTagKaTeX(targetUnit)}$`,
						diagnosticFeedback: 'تحقق من الفرق بين المساحة الجانبية (محيط القاعدة × الارتفاع) والحجم (مساحة القاعدة × الارتفاع).'
					}
				],
				rng
			);

			const qText = askVolume
				? `موشور قائم ارتفاعه $h = ${H}\\text{ cm}$ وقاعدته ${cfg.baseDescKaTeX}. ما هو حجمه $V$؟`
				: `موشور قائم ارتفاعه $h = ${H}\\text{ cm}$ وقاعدته ${cfg.baseDescKaTeX}. ما هي مساحته الجانبية $A_L$؟`;

			return {
				templateId: this.id,
				seed,
				grade: '2am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: 'تمثيل موشور قائم بالمنظور متساوي القياس',
					questionData: mcq,
					explanation: askVolume
						? `مساحة القاعدة $B = ${cfg.B}\\text{ cm}^2$، والحجم $V = B \\times h = ${cfg.B} \\times ${H} = ${V}\\text{ cm}^3$.`
						: `محيط القاعدة $P = ${cfg.a} + ${cfg.b} + ${cfg.c} = ${cfg.P}\\text{ cm}$، والمساحة الجانبية $A_L = P \\times h = ${cfg.P} \\times ${H} = ${AL}\\text{ cm}^2$.`
				},
				sujetExercise: {
					points: 3,
					instruction: `موشور قائم ارتفاعه $h = ${H}$ سم، قاعدته ${cfg.baseDesc}.`,
					content: [
						{
							type: 'columns',
							widths: ['2fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) احسب محيط القاعدة $P$ ثم استنتج المساحة الجانبية $A_L$ للموشور القائم.`,
									answer: `1) محيط القاعدة: $P = ${cfg.a} + ${cfg.b} + ${cfg.c} = ${cfg.P}$ سم، والمساحة الجانبية: $A_L = P times h = ${cfg.P} times ${H} = ${AL}$ سم².`,
									mark: '1.5'
								},
								{
									type: 'image',
									src: svgPath
								}
							]
						},
						{
							type: 'text',
							content: `2) احسب مساحة القاعدة $B$ ثم استنتج حجم الموشور القائم $V$.`,
							answer: `2) مساحة القاعدة المثلثة: $B = ${cfg.B}$ سم²، والحجم: $V = B times h = ${cfg.B} times ${H} = ${V}$ سم³.`,
							mark: '1.5'
						}
					]
				},
				hints: [
					'المساحة الجانبية لموشور قائم تساوي محيط القاعدة × الارتفاع (A_L = P × h).',
					'حجم موشور قائم يساوي مساحة القاعدة × الارتفاع (V = B × h).',
					`احسب أولاً P = ${cfg.P} cm و B = ${cfg.B} cm² ثم اضرب في الارتفاع ${H} cm.`
				],
				solutionStepsAr: [
					`محيط القاعدة: P = ${cfg.a} + ${cfg.b} + ${cfg.c} = ${cfg.P} cm.`,
					`المساحة الجانبية: A_L = ${cfg.P} × ${H} = ${AL} cm².`,
					`مساحة القاعدة المثلثة: B = ${cfg.B} cm².`,
					`حجم الموشور القائم: V = ${cfg.B} × ${H} = ${V} cm³.`
				],
				finalAnswer: askVolume ? `${V} cm³` : `${AL} cm²`
			};
		}

		if (difficulty === 'medium') {
			const wrongOneBase = AL + cfg.B;
			const mcq = buildUniqueMcqOptions(
				`$${AT}\\,${unitTagKaTeX('cm2')}$`,
				[
					{
						text: `$${wrongOneBase}\\,${unitTagKaTeX('cm2')}$`,
						diagnosticFeedback: 'الموشور القائم له قاعدتان متطابقتان: المساحة الكلية تساوي المساحة الجانبية + 2 × مساحة القاعدة.'
					},
					{
						text: `$${AL}\\,${unitTagKaTeX('cm2')}$`,
						diagnosticFeedback: 'هذه هي المساحة الجانبية فقط، ولم تضف مساحتي القاعدتين.'
					},
					{
						text: `$${V}\\,${unitTagKaTeX('cm2')}$`,
						diagnosticFeedback: 'هذا ناتج الحجم (B × h) وليس المساحة الكلية.'
					}
				],
				rng
			);

			const qText = `موشور قائم ارتفاعه $h = ${H}\\text{ cm}$ وقاعدته ${cfg.baseDescKaTeX}. ما هي مساحته الكلية $A_T$؟`;

			return {
				templateId: this.id,
				seed,
				grade: '2am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: 'موشور قائم ثلاثي',
					questionData: mcq,
					explanation: `المساحة الجانبية $A_L = ${cfg.P} \\times ${H} = ${AL}\\text{ cm}^2$، ومساحة القاعدة $B = ${cfg.B}\\text{ cm}^2$. المساحة الكلية $A_T = ${AL} + 2 \\times ${cfg.B} = ${AT}\\text{ cm}^2$.`
				},
				sujetExercise: {
					points: 3,
					instruction: `يمثل الشكل موشوراً قائماً ارتفاعه $h = ${H}$ سم، وقاعدته ${cfg.baseDesc}.`,
					content: [
						{
							type: 'columns',
							widths: ['2fr', '1fr'],
							children: [
								{
									type: 'text',
									content: '1) احسب المساحة الجانبية $A_L$ لهذا الموشور القائم.',
									answer: `1) محيط القاعدة $P = ${cfg.P}$ سم، ومنه:\n\n$A_L = P times h = ${cfg.P} times ${H} = ${AL}$ سم².`,
									mark: '1'
								},
								{
									type: 'image',
									src: svgPath
								}
							]
						},
						{
							type: 'text',
							content: '2) احسب المساحة الكلية $A_T$ للموشور القائم.',
							answer: `2) مساحة القاعدة $B = ${cfg.B}$ سم²، إذن:\n\n$A_T = A_L + 2 times B = ${AL} + 2 times ${cfg.B} = ${AT}$ سم².`,
							mark: '1'
						},
						{
							type: 'text',
							content: '3) احسب حجمه $V$.',
							answer: `3) الحجم: $V = B times h = ${cfg.B} times ${H} = ${V}$ سم³.`,
							mark: '1'
						}
					]
				},
				hints: [
					'احسب أولاً محيط القاعدة P ومساحتها B.',
					'المساحة الجانبية A_L = P × h.',
					'المساحة الكلية تساوي المساحة الجانبية مضافاً إليها ضعف مساحة القاعدة: A_T = A_L + 2 × B.'
				],
				solutionStepsAr: [
					`محيط القاعدة P = ${cfg.P} cm، ومساحة القاعدة B = ${cfg.B} cm².`,
					`المساحة الجانبية A_L = ${cfg.P} × ${H} = ${AL} cm².`,
					`المساحة الكلية A_T = ${AL} + 2 × ${cfg.B} = ${AT} cm².`,
					`الحجم V = ${cfg.B} × ${H} = ${V} cm³.`
				],
				finalAnswer: `${AT} cm²`
			};
		}

		// Hard: Given volume V and base dimensions, find height H then lateral area AL
		const svgPathHard = saveSvgAsset(
			`2am_t3_prism_${difficulty}_s${seed}`,
			svgPrismCylinder({
				kind: 'prism',
				radiusOrBaseLabel: cfg.labelSvg,
				heightLabel: 'h = ?'
			})
		);

		const wrongHeight = roundTo(V / cfg.P, 2);
		const wrongALFrom2B = cfg.P * H * 2;
		const wrongALUsingB = cfg.B * H;

		const mcq = buildUniqueMcqOptions(
			`$${AL}\\,${unitTagKaTeX('cm2')}$`,
			[
				{
					text: `$${wrongALUsingB}\\,${unitTagKaTeX('cm2')}$`,
					diagnosticFeedback: 'استعملت مساحة القاعدة B في حساب المساحة الجانبية بدلاً من محيط القاعدة P.'
				},
				{
					text: `$${wrongALFrom2B}\\,${unitTagKaTeX('cm2')}$`,
					diagnosticFeedback: 'تحقق من الارتفاع h = V ÷ B، فقد ضاعفت القيمة أو نسيت القسمة على 2 في مساحة المثلث.'
				},
				{
					text: `$${AT}\\,${unitTagKaTeX('cm2')}$`,
					diagnosticFeedback: 'هذه هي المساحة الكلية وليس المساحة الجانبية فقط.'
				}
			],
			rng
		);

		const qText = `موشور قائم حجمه $V = ${V}\\text{ cm}^3$ وقاعدته ${cfg.baseDescKaTeX}. أوجد ارتفاعه $h$ ثم احسب مساحته الجانبية $A_L$.`;

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPathHard,
				imageCaption: 'موشور قائم مجهول الارتفاع',
				questionData: mcq,
				explanation: `مساحة القاعدة $B = ${cfg.B}\\text{ cm}^2$، ومنه الارتفاع $h = \\frac{V}{B} = \\frac{${V}}{${cfg.B}} = ${H}\\text{ cm}$. المساحة الجانبية $A_L = P \\times h = ${cfg.P} \\times ${H} = ${AL}\\text{ cm}^2$.`
			},
			sujetExercise: {
				points: 3,
				instruction: `موشور قائم حجمه $V = ${V}$ سم³، وقاعدته ${cfg.baseDesc}.`,
				content: [
					{
						type: 'columns',
						widths: ['2fr', '1fr'],
						children: [
							{
								type: 'text',
								content: '1) احسب مساحة القاعدة $B$ ثم استنتج ارتفاع الموشور القائم $h$.',
								answer: `1) مساحة القاعدة $B = ${cfg.B}$ سم²، والارتفاع:\n\n$h = V div B = ${V} div ${cfg.B} = ${H}$ سم.`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: svgPathHard
							}
						]
					},
					{
						type: 'text',
						content: '2) احسب المساحة الجانبية $A_L$ ثم المساحة الكلية $A_T$ لهذا الموشور القائم.',
						answer: `2) محيط القاعدة $P = ${cfg.P}$ سم، إذن $A_L = ${cfg.P} times ${H} = ${AL}$ سم²، ومنه:\n\n$A_T = ${AL} + 2 times ${cfg.B} = ${AT}$ سم².`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'بما أن V = B × h، فإن الارتفاع h يساوي الحجم مقسوماً على مساحة القاعدة (h = V ÷ B).',
				`احسب مساحة القاعدة B = ${cfg.B} cm² ثم أوجد h = ${V} ÷ ${cfg.B}.`,
				`بعد إيجاد الارتفاع h = ${H} cm، احسب محيط القاعدة P واضربه في h (تجنب القسمة على P = ${wrongHeight} في الخطوة الأولى).`
			],
			solutionStepsAr: [
				`مساحة القاعدة: B = ${cfg.B} cm².`,
				`الارتفاع: h = V ÷ B = ${V} ÷ ${cfg.B} = ${H} cm.`,
				`محيط القاعدة: P = ${cfg.a} + ${cfg.b} + ${cfg.c} = ${cfg.P} cm.`,
				`المساحة الجانبية: A_L = ${cfg.P} × ${H} = ${AL} cm²، والمساحة الكلية: A_T = ${AL} + 2 × ${cfg.B} = ${AT} cm².`
			],
			finalAnswer: `${AL} cm²`
		};
	}
};

// ============================================================================
// 5. Cylinder of revolution (أسطوانة الدوران): lateral area, volume & capacity (1 dm³ = 1 L)
// ============================================================================

const cylinderTemplate: ParameterizedTemplate = {
	id: '2am_t3_cylinder',
	grade: '2am',
	trimesterId: 't3',
	domain: 'measurement',
	titleAr: 'أسطوانة الدوران: المساحة الجانبية والحجم والسعة',
	curriculumLessonId: 'lesson_2am_t3_cylinder_net_area_volume_capacity',
	defaultPoints: 3,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 5, difficulty);

		if (difficulty === 'easy') {
			const r = rng.pick([2, 3, 4, 5, 6, 8, 10]);
			const h = rng.pick([5, 6, 8, 10, 12, 15]);
			const P = roundTo(2 * PI * r, 2);
			const B = roundTo(PI * r * r, 2);
			const AL = roundTo(2 * PI * r * h, 2);
			const V = roundTo(PI * r * r * h, 2);

			const svgPath = saveSvgAsset(
				`2am_t3_cyl_${difficulty}_s${seed}`,
				svgPrismCylinder({
					kind: 'cylinder',
					radiusOrBaseLabel: `r = ${r} cm`,
					heightLabel: `h=${h}cm`
				})
			);

			const askVolume = seed % 2 === 1;
			const correctVal = askVolume ? V : AL;
			const targetUnit: 'cm3' | 'cm2' = askVolume ? 'cm3' : 'cm2';

			const mcq = buildUniqueMcqOptions(
				`$${fmtNum(correctVal)}\\,${unitTagKaTeX(targetUnit)}$`,
				[
					{
						text: `$${fmtNum(askVolume ? AL : V)}\\,${unitTagKaTeX(targetUnit)}$`,
						diagnosticFeedback: askVolume
							? 'هذا ناتج المساحة الجانبية (2πrh) وليس حجم الأسطوانة (πr²h).'
							: 'هذا ناتج الحجم (πr²h) وليس المساحة الجانبية (2πrh).'
					},
					{
						text: `$${fmtNum(roundTo(PI * r * h, 2))}\\,${unitTagKaTeX(targetUnit)}$`,
						diagnosticFeedback: askVolume
							? 'نسيت تربيع نصف القطر (r² = r × r) في قانون الحجم.'
							: 'نسيت الضرب في 2 في قانون محيط القاعدة والمساحة الجانبية (2πrh).'
					},
					{
						text: `$${fmtNum(roundTo(2 * PI * r * r * h, 2))}\\,${unitTagKaTeX(targetUnit)}$`,
						diagnosticFeedback: 'لا يوجد عامل 2 في قانون حجم الأسطوانة V = π × r² × h.'
					}
				],
				rng
			);

			const qText = askVolume
				? `أسطوانة دوران نصف قطر قاعدتها $r = ${r}\\text{ cm}$ وارتفاعها $h = ${h}\\text{ cm}$. احسب حجمها $V$ (نأخذ $\\pi \\approx 3.14$).`
				: `أسطوانة دوران نصف قطر قاعدتها $r = ${r}\\text{ cm}$ وارتفاعها $h = ${h}\\text{ cm}$. احسب مساحتها الجانبية $A_L$ (نأخذ $\\pi \\approx 3.14$).`;

			return {
				templateId: this.id,
				seed,
				grade: '2am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: 'أسطوانة دوران',
					questionData: mcq,
					explanation: askVolume
						? `مساحة القاعدة $B = \\pi \\times r^2 \\approx 3.14 \\times ${r}^2 = ${fmtNum(B)}\\text{ cm}^2$، والحجم $V = B \\times h \\approx ${fmtNum(B)} \\times ${h} = ${fmtNum(V)}\\text{ cm}^3$.`
						: `المساحة الجانبية $A_L = 2 \\times \\pi \\times r \\times h \\approx 2 \\times 3.14 \\times ${r} \\times ${h} = ${fmtNum(AL)}\\text{ cm}^2$.`
				},
				sujetExercise: {
					points: 3,
					instruction: `أسطوانة دوران نصف قطر قاعدتها $r = ${r}$ سم وارتفاعها $h = ${h}$ سم (نأخذ $pi approx 3.14$).`,
					content: [
						{
							type: 'columns',
							widths: ['2fr', '1fr'],
							children: [
								{
									type: 'text',
									content: '1) احسب المساحة الجانبية $A_L$ لهذه الأسطوانة.',
									answer: `1) محيط القاعدة $P = 2 times pi times r approx ${fmtNum(P)}$ سم، والمساحة الجانبية:\n\n$A_L = 2 times 3.14 times ${r} times ${h} = ${fmtNum(AL)}$ سم².`,
									mark: '1.5'
								},
								{
									type: 'image',
									src: svgPath
								}
							]
						},
						{
							type: 'text',
							content: '2) احسب مساحة القاعدة $B$ ثم استنتج حجم الأسطوانة $V$.',
							answer: `2) مساحة القاعدة: $B = 3.14 times ${r}^2 = ${fmtNum(B)}$ سم²، والحجم: $V = ${fmtNum(B)} times ${h} = ${fmtNum(V)}$ سم³.`,
							mark: '1.5'
						}
					]
				},
				hints: [
					'المساحة الجانبية لأسطوانة الدوران: A_L = 2 × π × r × h.',
					'حجم أسطوانة الدوران: V = π × r² × h.',
					`عوّض π بـ 3.14 و r بـ ${r} و h بـ ${h} (انتبه: r² = ${r * r}).`
				],
				solutionStepsAr: [
					`المساحة الجانبية: A_L = 2 × 3.14 × ${r} × ${h} = ${fmtNum(AL)} cm².`,
					`مساحة القاعدة: B = 3.14 × ${r}² = 3.14 × ${r * r} = ${fmtNum(B)} cm².`,
					`الحجم: V = ${fmtNum(B)} × ${h} = ${fmtNum(V)} cm³.`
				],
				finalAnswer: `${fmtNum(correctVal)} ${askVolume ? 'cm³' : 'cm²'}`
			};
		}

		if (difficulty === 'medium') {
			// Given diameter d = 2r in dm (so 1 dm³ = 1 L directly!)
			const r = rng.pick([2, 3, 4, 5, 6, 7]);
			const d = 2 * r;
			const h = rng.pick([5, 6, 8, 10, 12]);
			const AL = roundTo(2 * PI * r * h, 2);
			const B = roundTo(PI * r * r, 2);
			const AT = roundTo(AL + 2 * B, 2);
			const V = roundTo(PI * r * r * h, 2); // in dm³ = L

			const svgPath = saveSvgAsset(
				`2am_t3_cyl_${difficulty}_s${seed}`,
				svgPrismCylinder({
					kind: 'cylinder',
					radiusOrBaseLabel: `d = ${d} dm`,
					heightLabel: `h=${h}dm`
				})
			);

			const wrongDiameterAsRadius = roundTo(PI * d * d * h, 2);
			const wrongWrongConv = roundTo(V * 1000, 2);

			const mcq = buildUniqueMcqOptions(
				`$${fmtNum(V)}\\,${unitTagKaTeX('L')}$`,
				[
					{
						text: `$${fmtNum(wrongDiameterAsRadius)}\\,${unitTagKaTeX('L')}$`,
						diagnosticFeedback: `استعملت القطر (${d} dm) مباشرة مكان نصف القطر في القانون π × r² × h؛ يجب قسمة القطر على 2 أولاً (r = ${r} dm).`
					},
					{
						text: `$${fmtNum(AL)}\\,${unitTagKaTeX('L')}$`,
						diagnosticFeedback: 'هذا ناتج المساحة الجانبية (بوحدة dm²) وليس الحجم/السعة.'
					},
					{
						text: `$${fmtNum(wrongWrongConv)}\\,${unitTagKaTeX('L')}$`,
						diagnosticFeedback: 'تذكّر العلاقة الأساسية: 1 dm³ = 1 L تماماً (لا نضرب في 1000).'
					}
				],
				rng
			);

			const qText = `خزان أسطواني الشكل قطر قاعدته $d = ${d}\\text{ dm}$ وارتفاعه $h = ${h}\\text{ dm}$. ما هي سعته باللتر ($\\pi \\approx 3.14$)؟`;

			return {
				templateId: this.id,
				seed,
				grade: '2am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: 'خزان أسطواني بالقطر المعطى',
					questionData: mcq,
					explanation: `نصف القطر $r = ${d} \\div 2 = ${r}\\text{ dm}$. الحجم $V = 3.14 \\times ${r}^2 \\times ${h} = ${fmtNum(V)}\\text{ dm}^3$، وبما أن $1\\text{ dm}^3 = 1\\text{ L}$ فإن السعة هي $${fmtNum(V)}\\text{ L}$.`
				},
				sujetExercise: {
					points: 3,
					instruction: `دلو أسطواني الشكل قطر قاعدته $d = ${d}$ دسم وارتفاعه $h = ${h}$ دسم (نأخذ $pi approx 3.14$).`,
					content: [
						{
							type: 'columns',
							widths: ['2fr', '1fr'],
							children: [
								{
									type: 'text',
									content: '1) استنتج نصف القطر $r$ ثم احسب المساحة الجانبية $A_L$ والمساحة الكلية $A_T$.',
									answer: `1) $r = ${d} div 2 = ${r}$ دسم، ومنه:\n\n$A_L = 2 times 3.14 times ${r} times ${h} = ${fmtNum(AL)}$ دسم² و$B = 3.14 times ${r}^2 = ${fmtNum(B)}$ دسم²، إذن $A_T = ${fmtNum(AL)} + 2 times ${fmtNum(B)} = ${fmtNum(AT)}$ دسم².`,
									mark: '1.5'
								},
								{
									type: 'image',
									src: svgPath
								}
							]
						},
						{
							type: 'text',
							content: '2) احسب حجم الدلو بوحدة دسم³ ثم استنتج سعته باللتر.',
							answer: `2) الحجم: $V = 3.14 times ${r}^2 times ${h} = ${fmtNum(V)}$ دسم³، وبما أن $1$ دسم³ = $1$ لتر فإن السعة تساوي $${fmtNum(V)}$ لتر.`,
							mark: '1.5'
						}
					]
				},
				hints: [
					`المعطى هو القطر d = ${d} dm وليس نصف القطر؛ احسب r = d ÷ 2 أولاً.`,
					`احسب الحجم بوحدة dm³ باستعمال القانون V = 3.14 × r² × h.`,
					'تذكّر أن 1 dm³ = 1 L لتحويل الحجم مباشرة إلى السعة باللتر.'
				],
				solutionStepsAr: [
					`نحسب نصف القطر: r = ${d} ÷ 2 = ${r} dm.`,
					`المساحة الجانبية: A_L = 2 × 3.14 × ${r} × ${h} = ${fmtNum(AL)} dm²، والمساحة الكلية: A_T = ${fmtNum(AT)} dm².`,
					`الحجم: V = 3.14 × ${r}² × ${h} = ${fmtNum(V)} dm³.`,
					`السعة باللتر: بما أن 1 dm³ = 1 L فإن السعة = ${fmtNum(V)} L.`
				],
				finalAnswer: `${fmtNum(V)} L`
			};
		}

		// Hard: Mixed units (radius in cm, height in dm/m) + capacity in liters
		const rDm = rng.pick([2, 3, 4, 5]);
		const rCm = rDm * 10;
		const hDm = rng.pick([8, 10, 12, 15]);
		const hLabelSvg = hDm === 10 ? 'h=1m' : `h=${hDm}dm`;
		const hTypst = hDm === 10 ? `$1$ م` : `$${hDm}$ دسم`;
		const hKaTeX = hDm === 10 ? `$1\\text{ m}$` : `$${hDm}\\text{ dm}$`;

		const AL_dm2 = roundTo(2 * PI * rDm * hDm, 2);
		const V_dm3 = roundTo(PI * rDm * rDm * hDm, 2); // = L
		const V_cm3 = roundTo(V_dm3 * 1000, 0);

		const svgPath = saveSvgAsset(
			`2am_t3_cyl_${difficulty}_s${seed}`,
			svgPrismCylinder({
				kind: 'cylinder',
				radiusOrBaseLabel: `r = ${rCm} cm`,
				heightLabel: hLabelSvg
			})
		);

		const mcq = buildUniqueMcqOptions(
			`$${fmtNum(V_dm3)}\\,${unitTagKaTeX('L')}$`,
			[
				{
					text: `$${fmtNum(V_cm3)}\\,${unitTagKaTeX('L')}$`,
					diagnosticFeedback: 'لم تحول cm³ إلى dm³ (أو لم توحد الوحدات إلى dm)؛ تذكّر أن 1000 cm³ = 1 dm³ = 1 L.'
				},
				{
					text: `$${fmtNum(roundTo(V_dm3 * 10, 2))}\\,${unitTagKaTeX('L')}$`,
					diagnosticFeedback: 'تحقق من التحويل: 1 dm = 10 cm، وفي الحجم نقسم cm³ على 1000 وليس على 100.'
				},
				{
					text: `$${fmtNum(AL_dm2)}\\,${unitTagKaTeX('L')}$`,
					diagnosticFeedback: 'هذه قيمة المساحة الجانبية بوحدة dm² وليس الحجم/السعة.'
				}
			],
			rng
		);

		const qText = `برميل أسطواني الشكل نصف قطر قاعدته $r = ${rCm}\\text{ cm}$ وارتفاعه ${hKaTeX}. ما هي سعته باللتر ($\\pi \\approx 3.14$)؟`;

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: 'برميل أسطواني بوحدات مختلفة',
				questionData: mcq,
				explanation: `نحول الوحدات إلى الديسمتر: $r = ${rCm}\\text{ cm} = ${rDm}\\text{ dm}$ والارتفاع $h = ${hDm}\\text{ dm}$. الحجم $V = 3.14 \\times ${rDm}^2 \\times ${hDm} = ${fmtNum(V_dm3)}\\text{ dm}^3 = ${fmtNum(V_dm3)}\\text{ L}$.`
			},
			sujetExercise: {
				points: 3,
				instruction: `برميل أسطواني الشكل نصف قطر قاعدته $r = ${rCm}$ سم وارتفاعه ${hTypst} (نأخذ $pi approx 3.14$).`,
				content: [
					{
						type: 'columns',
						widths: ['2fr', '1fr'],
						children: [
							{
								type: 'text',
								content: '1) حوّل الأبعاد إلى الديسمتر (دسم) ثم احسب المساحة الجانبية $A_L$ بوحدة دسم².',
								answer: `1) $r = ${rCm}$ سم = $${rDm}$ دسم، و$h = ${hDm}$ دسم. المساحة الجانبية:\n\n$A_L = 2 times 3.14 times ${rDm} times ${hDm} = ${fmtNum(AL_dm2)}$ دسم².`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: svgPath
							}
						]
					},
					{
						type: 'text',
						content: '2) احسب حجم البرميل بوحدة دسم³ ثم استنتج سعته باللتر.',
						answer: `2) $V = 3.14 times ${rDm}^2 times ${hDm} = ${fmtNum(V_dm3)}$ دسم³ = $${fmtNum(V_dm3)}$ لتر.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'يجب توحيد وحدات القياس قبل الحساب: حوّل جميع الأطوال إلى الديسمتر (1 dm = 10 cm، و1 m = 10 dm).',
				`بعد التحويل: r = ${rDm} dm و h = ${hDm} dm.`,
				'احسب الحجم V = 3.14 × r² × h بالـ dm³، ثم استعمل 1 dm³ = 1 L.'
			],
			solutionStepsAr: [
				`نوحد الوحدات إلى الديسمتر: r = ${rCm} cm = ${rDm} dm، و h = ${hDm} dm.`,
				`المساحة الجانبية: A_L = 2 × 3.14 × ${rDm} × ${hDm} = ${fmtNum(AL_dm2)} dm².`,
				`الحجم: V = 3.14 × ${rDm}² × ${hDm} = ${fmtNum(V_dm3)} dm³.`,
				`السعة باللتر: بما أن 1 dm³ = 1 L فإن السعة = ${fmtNum(V_dm3)} L.`
			],
			finalAnswer: `${fmtNum(V_dm3)} L`
		};
	}
};

// ============================================================================
// 6. T3 Integration Situation (الوضعية الإدماجية: 8-pt format)
//    Cylindrical water tank volume/capacity (L) + proportionality fill rate / % + cost
// ============================================================================

const integrationTankTemplate: ParameterizedTemplate = {
	id: '2am_t3_integration_tank',
	grade: '2am',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية: الخزان الأسطواني والتناسبية والتكلفة',
	curriculumLessonId: 'lesson_2am_t3_integration',
	defaultPoints: 8,
	isIntegration: true,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 6, difficulty);

		const r = difficulty === 'easy' ? rng.pick([1, 2]) : rng.pick([1, 2, 3]);
		const d = 2 * r;
		const h = difficulty === 'easy' ? rng.pick([2, 3, 4]) : rng.pick([2, 3, 4, 5]);
		const V_m3 = roundTo(PI * r * r * h, 2);
		const capacityL = Math.round(V_m3 * 1000); // Exact integer since 3.14 * 1000 = 3140

		// Percentage already filled (exact integer liters since 4 | 3140 and 10 | 3140)
		const fillPct = rng.pick([25, 40, 50, 60, 75, 80]);
		const filledL = Math.round((capacityL * fillPct) / 100);
		const remainingL = capacityL - filledL;

		// Proportionality fill rate: q1 liters in t1 minutes -> pumped in t2 minutes
		const ratePerMin = rng.pick([40, 50, 60, 80, 100, 120]);
		const t1 = rng.pick([3, 4, 5]);
		const q1 = ratePerMin * t1;
		const t2 = rng.pick([30, 45, 60, 90, 120]);
		const pumpedL = ratePerMin * t2;
		const isEnough = pumpedL >= remainingL;

		// Cost per m³ + discount % such that (unitPrice * discPct) % 10000 === 0 -> exact integer DA
		const [unitPriceM3, discPct] = rng.pick([
			[500, 20],
			[400, 25],
			[1000, 10],
			[1000, 20],
			[200, 50]
		]);
		const baseCost = Math.round(V_m3 * unitPriceM3);
		const discountAmount = Math.round((baseCost * discPct) / 100);
		const finalCost = baseCost - discountAmount;

		const useDiameterInText = difficulty !== 'easy';
		const dimTextTypst = useDiameterInText
			? `قطر قاعدته $d = ${d}$ م وارتفاعه $h = ${h}$ م`
			: `نصف قطر قاعدته $r = ${r}$ م وارتفاعه $h = ${h}$ م`;
		const dimTextKaTeX = useDiameterInText
			? `قطر قاعدته $d = ${d}\\text{ m}$ وارتفاعه $h = ${h}\\text{ m}$`
			: `نصف قطر قاعدته $r = ${r}\\text{ m}$ وارتفاعه $h = ${h}\\text{ m}$`;

		const svgPath = saveSvgAsset(
			`2am_t3_tank_${difficulty}_s${seed}`,
			svgPrismCylinder({
				kind: 'cylinder',
				radiusOrBaseLabel: useDiameterInText ? `d = ${d} m` : `r = ${r} m`,
				heightLabel: `h=${h}m`
			})
		);

		const owners = [
			'يمتلك فلاح في بستانه خزان ماء أسطواني الشكل',
			'زُوّدت متوسطة بخزان ماء احتياطي أسطواني الشكل',
			'استفادت مزرعة نموذجية من خزان ماء أسطواني الشكل'
		];
		const ownerIntro = rng.pick(owners);

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `${ownerIntro} ${dimTextTypst} (نأخذ $pi approx 3.14$). يحتوي الخزان حالياً على نسبة $${fillPct}%$ من سعته الكلية.`
					},
					{
						type: 'image',
						src: svgPath
					}
				]
			},
			{
				type: 'text',
				content: '1) احسب حجم هذا الخزان بالمتر المكعب (م³)، ثم استنتج سعته باللتر.',
				answer: `1) ${useDiameterInText ? `نصف القطر: $r = ${d} div 2 = ${r}$ م. ` : ''}الحجم: $V = 3.14 times ${r}^2 times ${h} = ${fmtNum(V_m3)}$ م³. وبما أن $1$ م³ = $1000$ لتر فإن السعة:\n\n$${fmtNum(V_m3)} times 1000 = ${capacityL}$ لتر.`,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `2) احسب كمية الماء الموجودة حالياً في الخزان باللتر، ثم استنتج الكمية المتبقية لملئه تماماً. بعد ذلك، تُشغّل مضخة تدفقها منتظم بحيث تضخ $${q1}$ لتراً كل $${t1}$ دقائق؛ هل تكفي مدة $${t2}$ دقيقة لإتمام ملء الخزان؟ برّر إجابتك.`,
				answer: `2) الكمية الموجودة: $frac(${capacityL} times ${fillPct}, 100) = ${filledL}$ لتر. الكمية المتبقية: $${capacityL} - ${filledL} = ${remainingL}$ لتر.\n\nبتناسبية التدفق، تضخ المضخة في $${t2}$ دقيقة: $frac(${q1} times ${t2}, ${t1}) = ${pumpedL}$ لتر. ${isEnough ? `بما أن $${pumpedL} >= ${remainingL}$ فإن المدة تكفي لإتمام الملء.` : `بما أن $${pumpedL} < ${remainingL}$ فإن المدة لا تكفي لإتمام الملء.`}`,
				mark: '3'
			},
			{
				type: 'text',
				content: `3) يبلغ سعر تعبئة المتر المكعب الواحد من الماء $${unitPriceM3}$ دج، مع استفادة الزبون من تخفيض بنسبة $${discPct}%$. احسب التكلفة النهائية لملء الخزان كاملاً.`,
				answer: `3) التكلفة قبل التخفيض: $${fmtNum(V_m3)} times ${unitPriceM3} = ${baseCost}$ دج.\n\nقيمة التخفيض: $frac(${baseCost} times ${discPct}, 100) = ${discountAmount}$ دج.\n\nالتكلفة النهائية: $${baseCost} - ${discountAmount} = ${finalCost}$ دج.`,
				mark: '2.5'
			}
		];

		// Quiz question focuses on the integrated result appropriate to difficulty
		let qText: string;
		let explanation: string;
		let mcqData: ReturnType<typeof buildUniqueMcqOptions>;
		let finalAns: string;

		if (difficulty === 'easy') {
			qText = `${ownerIntro} ${dimTextKaTeX} ($\\pi \\approx 3.14$). ما هي سعة الخزان باللتر؟`;
			mcqData = buildUniqueMcqOptions(
				`$${capacityL}\\,${unitTagKaTeX('L')}$`,
				[
					{
						text: `$${fmtNum(V_m3)}\\,${unitTagKaTeX('L')}$`,
						diagnosticFeedback: 'هذا هو الحجم بالمتر المكعب (m³)؛ يجب الضرب في 1000 للتحويل إلى اللتر (1 m³ = 1000 L).'
					},
					{
						text: `$${Math.round(V_m3 * 100)}\\,${unitTagKaTeX('L')}$`,
						diagnosticFeedback: 'تذكّر أن 1 m³ = 1000 dm³ = 1000 L (وليس 100).'
					},
					{
						text: `$${Math.round(2 * PI * r * h * 1000)}\\,${unitTagKaTeX('L')}$`,
						diagnosticFeedback: 'استعملت قانون المساحة الجانبية (2πrh) بدلاً من قانون الحجم (πr²h).'
					}
				],
				rng
			);
			explanation = `الحجم $V = 3.14 \\times ${r}^2 \\times ${h} = ${fmtNum(V_m3)}\\text{ m}^3$، ومنه السعة $= ${fmtNum(V_m3)} \\times 1000 = ${capacityL}\\text{ L}$.`;
			finalAns = `${capacityL} L`;
		} else if (difficulty === 'medium') {
			qText = `${ownerIntro} ${dimTextKaTeX} ($\\pi \\approx 3.14$) ومملوء بنسبة $${fillPct}\\%$. كم لتراً من الماء يلزم لإتمام ملئه؟`;
			mcqData = buildUniqueMcqOptions(
				`$${remainingL}\\,${unitTagKaTeX('L')}$`,
				[
					{
						text: `$${filledL}\\,${unitTagKaTeX('L')}$`,
						diagnosticFeedback: 'هذه كمية الماء الموجودة حالياً في الخزان، والمطلوب هو الكمية المتبقية لملئه.'
					},
					{
						text: `$${capacityL}\\,${unitTagKaTeX('L')}$`,
						diagnosticFeedback: 'هذه السعة الكلية للخزان قبل طرح الكمية المملوءة.'
					},
					{
						text: `$${remainingL * 4}\\,${unitTagKaTeX('L')}$`,
						diagnosticFeedback: 'انتبه: المعطى هو القطر d، يجب حساب نصف القطر r = d ÷ 2 قبل حساب الحجم.'
					}
				],
				rng
			);
			explanation = `نصف القطر $r = ${r}\\text{ m}$، السعة الكلية $${capacityL}\\text{ L}$، الكمية الموجودة $${filledL}\\text{ L}$، والمتبقي $${capacityL} - ${filledL} = ${remainingL}\\text{ L}$.`;
			finalAns = `${remainingL} L`;
		} else {
			qText = `${ownerIntro} ${dimTextKaTeX} ($\\pi \\approx 3.14$). إذا كان سعر المتر المكعب الواحد من الماء $${unitPriceM3}\\text{ DA}$ مع تخفيض بنسبة $${discPct}\\%$، فما هي التكلفة النهائية لملئه كاملاً؟`;
			mcqData = buildUniqueMcqOptions(
				`$${finalCost}\\,${unitTagKaTeX('DA')}$`,
				[
					{
						text: `$${baseCost}\\,${unitTagKaTeX('DA')}$`,
						diagnosticFeedback: 'هذه هي التكلفة قبل تطبيق التخفيض؛ يجب حساب وطرح التخفيض.'
					},
					{
						text: `$${discountAmount}\\,${unitTagKaTeX('DA')}$`,
						diagnosticFeedback: 'هذا هو مبلغ التخفيض فقط، وليس التكلفة النهائية.'
					},
					{
						text: `$${baseCost + discountAmount}\\,${unitTagKaTeX('DA')}$`,
						diagnosticFeedback: 'قمت بجمع قيمة التخفيض بدلاً من طرحها من التكلفة.'
					}
				],
				rng
			);
			explanation = `نصف القطر $r = ${r}\\text{ m}$، الحجم $V = ${fmtNum(V_m3)}\\text{ m}^3$، التكلفة الأساسية $${baseCost}\\text{ DA}$، والتخفيض $${discountAmount}\\text{ DA}$، إذن التكلفة النهائية $${finalCost}\\text{ DA}$.`;
			finalAns = `${finalCost} DA`;
		}

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: 'خزان مائي أسطواني الشكل',
				questionData: mcqData,
				explanation
			},
			sujetExercise: {
				points: 8,
				customTitle: 'الوضعية الإدماجية',
				instruction: 'اقرأ السند جيداً وأجب عن الأسئلة الثلاثة مع توضيح خطوات الحل والوحدات:',
				content
			},
			hints: [
				`احسب أولاً حجم الخزان V = π × r² × h بالمتر المكعب (${useDiameterInText ? `تذكّر r = ${d} ÷ 2 = ${r} m` : `r = ${r} m`})، ثم حوّله إلى اللتر باستعمال 1 m³ = 1000 L.`,
				`استعمل النسبة المئوية (${fillPct}%) لإيجاد كمية الماء الحالية ثم اطرحها من السعة الكلية، واستعمل الرابع المتناسب لحساب ما تضخه المضخة في ${t2} دقيقة.`,
				`احسب تكلفة الماء (V × ${unitPriceM3}) ثم اطرح منها قيمة التخفيض (${discPct}%).`
			],
			solutionStepsAr: [
				`حجم الخزان: V = 3.14 × ${r}² × ${h} = ${fmtNum(V_m3)} m³، وسعته باللتر = ${capacityL} L.`,
				`الكمية المملوءة = (${capacityL} × ${fillPct}) ÷ 100 = ${filledL} L، والمتبقي = ${remainingL} L.`,
				`كمية الماء التي تضخها المضخة في ${t2} دقيقة = (${q1} × ${t2}) ÷ ${t1} = ${pumpedL} L (${isEnough ? 'تكفي' : 'لا تكفي'} لإتمام الملء).`,
				`التكلفة قبل التخفيض = ${fmtNum(V_m3)} × ${unitPriceM3} = ${baseCost} DA، والتخفيض = ${discountAmount} DA، والتكلفة النهائية = ${finalCost} DA.`
			],
			finalAnswer: finalAns
		};
	}
};

export const TEMPLATES_2AM_T3: ParameterizedTemplate[] = [
	proportionalityScaleTemplate,
	percentagesTemplate,
	statisticsTemplate,
	rightPrismTemplate,
	cylinderTemplate,
	integrationTankTemplate
];
