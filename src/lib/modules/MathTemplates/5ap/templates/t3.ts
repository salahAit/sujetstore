import type { ContentBlock, TableCell } from '../../../SujetBuilder/types';
import { buildIllustratedFigureBlock } from '../../../VisualAssets/illustrations-registry';
import { SeededRng, buildUniqueMcqOptions, gcd, roundTo } from '../../rng';
import { saveSvgAsset, svgAnalogClock, svgRectangle, svgTriangle } from '../../svg-helpers';
import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate } from '../../types';

function pad2(n: number): string {
	return String(Math.trunc(n)).padStart(2, '0');
}

function fmtNum(n: number): string {
	const rounded = roundTo(n, 4);
	return Object.is(rounded, -0) ? '0' : String(rounded);
}

function numericAnswers(n: number): string[] {
	const dot = fmtNum(n);
	const comma = dot.replace('.', ',');
	return dot === comma ? [dot] : [dot, comma];
}

function fmtDuration(h: number, m: number, s?: number): string {
	if (s === undefined) {
		return `${h} h ${pad2(m)} min`;
	}
	return `${h} h ${pad2(m)} min ${pad2(s)} s`;
}

function fmtClock(h: number, m: number, s?: number): string {
	if (s === undefined) {
		return `${pad2(h)} h ${pad2(m)} min`;
	}
	return `${pad2(h)} h ${pad2(m)} min ${pad2(s)} s`;
}

function ltr(text: string): string {
	return `#text(dir: ltr)[${text}]`;
}

// ============================================================================
// 1. Exact Terminating Decimal Quotient & Decimal-Fraction Equivalence
// ============================================================================

interface QuotientSpec {
	divisor: number;
	remainders: number[];
}

const QUOTIENT_SPECS: Record<Difficulty, QuotientSpec[]> = {
	easy: [
		{ divisor: 2, remainders: [1] },
		{ divisor: 4, remainders: [1, 2, 3] },
		{ divisor: 5, remainders: [1, 2, 3, 4] }
	],
	medium: [
		{ divisor: 4, remainders: [1, 2, 3] },
		{ divisor: 5, remainders: [1, 2, 3, 4] },
		{ divisor: 20, remainders: [4, 5, 8, 10, 12, 15, 16] },
		{ divisor: 25, remainders: [5, 10, 15, 20] }
	],
	hard: [
		{ divisor: 12, remainders: [3, 6, 9] },
		{ divisor: 15, remainders: [3, 6, 9, 12] },
		{ divisor: 20, remainders: [4, 5, 8, 10, 12, 15, 16] },
		{ divisor: 25, remainders: [5, 10, 15, 20] }
	]
};

const COMMON_FRACTIONS: { num: number; den: number; dec: number }[] = [
	{ num: 1, den: 2, dec: 0.5 },
	{ num: 1, den: 4, dec: 0.25 },
	{ num: 3, den: 4, dec: 0.75 },
	{ num: 1, den: 5, dec: 0.2 },
	{ num: 2, den: 5, dec: 0.4 },
	{ num: 3, den: 5, dec: 0.6 },
	{ num: 4, den: 5, dec: 0.8 }
];

const tplExactDecimalQuotient: ParameterizedTemplate = {
	id: 'tpl_5ap_t3_exact_decimal_quotient',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'numeric',
	titleAr: 'الحاصل العشري التام والكسور المألوفة',
	curriculumLessonId: 'lesson_5ap_t3_division_two_digit_exact_decimal',
	defaultPoints: 1.5,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 101 + 11);
		const spec = rng.pick(QUOTIENT_SPECS[difficulty]);
		const rem = rng.pick(spec.remainders);
		const qRange: [number, number] =
			difficulty === 'easy' ? [2, 14] : difficulty === 'medium' ? [12, 38] : [22, 75];
		const q = rng.int(qRange[0], qRange[1]);

		const dividend = q * spec.divisor + rem;
		const g = gcd(rem, spec.divisor);
		const simpNum = rem / g;
		const simpDen = spec.divisor / g;
		const decPart = roundTo(rem / spec.divisor, 2);
		const quotient = roundTo(q + decPart, 2);
		const quotientStr = fmtNum(quotient);
		const decPartStr = fmtNum(decPart);

		const otherFractions = COMMON_FRACTIONS.filter(
			(f) => !(f.num === simpNum && f.den === simpDen)
		);
		const eqFrac = rng.pick(otherFractions);
		const eqFracStr = fmtNum(eqFrac.dec);

		const askFractionForm = rng.int(0, 1) === 1;
		const remTimes10 = rem * 10;
		const tenthsDigit = Math.floor(remTimes10 / spec.divisor);
		const remAfterTenths = remTimes10 % spec.divisor;
		const hundredthsDigit =
			remAfterTenths > 0 ? Math.floor((remAfterTenths * 10) / spec.divisor) : 0;

		const stepTenths =
			remAfterTenths === 0
				? `نحوّل الباقي ${rem} إلى ${remTimes10} عشرا، ثم نقسم: ${remTimes10} ÷ ${spec.divisor} = ${tenthsDigit} والباقي 0.`
				: `نحوّل الباقي ${rem} إلى ${remTimes10} عشرا: ${remTimes10} ÷ ${spec.divisor} = ${tenthsDigit} والباقي ${remAfterTenths} أعشار، ثم نحوّله إلى ${remAfterTenths * 10} جزءا من مئة: ${remAfterTenths * 10} ÷ ${spec.divisor} = ${hundredthsDigit} والباقي 0.`;

		const questionText = askFractionForm
			? `اكتب المجموع الكسري الآتي على شكل عدد عشري بالفاصلة: $$${q} + \\frac{${simpNum}}{${simpDen}}$$`
			: `احسب الحاصل العشري التام للقسمة الآتية: $$${dividend} \\div ${spec.divisor}$$`;

		const sentence = askFractionForm
			? `${q} + ${simpNum}/${simpDen} = ___`
			: `${dividend} ÷ ${spec.divisor} = ___`;

		const explanation = askFractionForm
			? `نعلم أن ${simpNum}/${simpDen} = ${decPartStr}، إذن ${q} + ${decPartStr} = ${quotientStr}.`
			: `بقسمة ${dividend} على ${spec.divisor} نجد الحاصل الصحيح ${q} والباقي ${rem}؛ وبمواصلة القسمة العشرية نحصل على ${quotientStr}.`;

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) احسب الحاصل العشري التام للعملية الآتية: $${dividend} div ${spec.divisor}$`,
				answer: `1) حساب الحاصل العشري التام: $${dividend} div ${spec.divisor} = ${quotientStr}$ (الحاصل الصحيح $${q}$ والباقي $${rem}$ ثم تحويل الباقي إلى أعشار${remAfterTenths > 0 ? ' وأجزاء من مئة' : ''}).`,
				mark: '0.75'
			},
			{
				type: 'text',
				content: `2) أتمم المساويات الآتية بالكتابة العشرية المناسبة: $frac(${simpNum}, ${simpDen}) = ...$  ،  $${q} + frac(${simpNum}, ${simpDen}) = ...$  ،  $frac(${eqFrac.num}, ${eqFrac.den}) = ...$`,
				answer: `2) إتمام المساويات: $frac(${simpNum}, ${simpDen}) = ${decPartStr}$  ،  $${q} + frac(${simpNum}, ${simpDen}) = ${quotientStr}$  ،  $frac(${eqFrac.num}, ${eqFrac.den}) = ${eqFracStr}$`,
				mark: '0.75'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't3',
			difficulty,
			domain: 'numeric',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'fill_blank',
				questionText,
				questionTextAr: questionText,
				questionData: {
					sentence,
					acceptedAnswers: numericAnswers(quotient)
				},
				explanation
			},
			sujetExercise: {
				points: 1.5,
				instruction: 'أجب عن السؤالين الآتيين مع إبراز خطوات القسمة العشرية التامة:',
				content
			},
			hints: [
				`أجرِ القسمة الإقليدية أولاً: ما هو أكبر مضاعف للعدد ${spec.divisor} لا يتجاوز ${dividend}؟`,
				`ضع الفاصلة في الحاصل بعد ${q}، ثم أضف صفراً إلى يمين الباقي ${rem} لمواصلة القسمة إلى الأعشار.`,
				`تذكّر أن الكسر ${simpNum}/${simpDen} يساوي ${decPartStr} في الكتابة العشرية.`
			],
			solutionStepsAr: [
				`القسمة الإقليدية: ${dividend} = ${spec.divisor} × ${q} + ${rem}.`,
				stepTenths,
				`إذن الحاصل العشري التام هو: ${dividend} ÷ ${spec.divisor} = ${quotientStr}.`,
				`وبالكتابة الكسرية المألوفة: ${q} + ${simpNum}/${simpDen} = ${q} + ${decPartStr} = ${quotientStr}، وكذلك ${eqFrac.num}/${eqFrac.den} = ${eqFracStr}.`
			],
			finalAnswer: quotientStr
		};
	}
};

// ============================================================================
// 2. Percentages (%), Map Scale (المقياس), and Uniform Speed (السرعة المنتظمة)
// ============================================================================

const tplProportionalityPctScaleSpeed: ParameterizedTemplate = {
	id: 'tpl_5ap_t3_proportionality_pct_scale_speed',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'proportionality',
	titleAr: 'النسبة المئوية والمقياس والسرعة المنتظمة',
	curriculumLessonId: 'lesson_5ap_t3_percentages_charts_scale_speed',
	defaultPoints: 1.5,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 131 + 29);
		const subTopic = seed % 3; // 0: percentage, 1: map scale, 2: uniform speed

		if (subTopic === 0) {
			const items = [
				{ name: 'دراجة هوائية', basePrices: [4000, 5000, 6000, 8000, 9000] },
				{ name: 'محفظة مدرسية', basePrices: [1200, 1600, 2000, 2400, 2800] },
				{ name: 'موسوعة علمية', basePrices: [1000, 1500, 2000, 2500, 3000] },
				{ name: 'جهاز لوحي تربوي', basePrices: [8000, 10000, 12000, 16000] }
			];
			const chosenItem = rng.pick(items);
			const price = rng.pick(chosenItem.basePrices);
			const pctPool =
				difficulty === 'easy'
					? [10, 20, 25, 50]
					: difficulty === 'medium'
						? [15, 20, 25, 30, 40]
						: [12, 15, 25, 35];
			const pct = rng.pick(pctPool);
			const discount = Math.round((price * pct) / 100);
			const newPrice = price - discount;
			const increasedPrice = price + discount;

			const askNewPrice = difficulty !== 'easy';
			const isIncrease = difficulty === 'hard' && rng.int(0, 1) === 1;
			const targetVal = !askNewPrice ? discount : isIncrease ? increasedPrice : newPrice;
			const actionWord = isIncrease ? 'زيادة' : 'تخفيض';
			const questionFocus = !askNewPrice
				? 'قيمة التخفيض بالدينار'
				: isIncrease
					? 'الثمن الجديد بعد الزيادة'
					: 'الثمن الجديد بعد التخفيض';

			const distractors = !askNewPrice
				? [
						{
							text: `${newPrice} دج`,
							diagnosticFeedback:
								'هذا هو الثمن بعد التخفيض، بينما المطلوب هو قيمة التخفيض فقط.'
						},
						{
							text: `${Math.round(price / pct)} دج`,
							diagnosticFeedback:
								'انتبه! لحساب النسبة المئوية نضرب الثمن في النسبة ثم نقسم على 100، ولا نقسم الثمن على النسبة.'
						},
						{
							text: `${discount * 10} دج`,
							diagnosticFeedback:
								'تحقق من القسمة على 100؛ يبدو أنك قسمت على 10 بدلا من 100.'
						}
					]
				: isIncrease
					? [
							{
								text: `${discount} دج`,
								diagnosticFeedback:
									'هذا مبلغ الزيادة فقط؛ أضفه إلى الثمن الأصلي للحصول على الثمن الجديد.'
							},
							{
								text: `${newPrice} دج`,
								diagnosticFeedback:
									'لقد طرحت مبلغ النسبة بدلا من إضافته لأن المسألة تتعلق بزيادة وليس بتخفيض.'
							},
							{
								text: `${price + pct} دج`,
								diagnosticFeedback:
									'النسبة المئوية ليست مبلغا بالدينار؛ احسب أولا قيمة الزيادة من 100 ثم أضفها.'
							}
						]
					: [
							{
								text: `${discount} دج`,
								diagnosticFeedback:
									'هذا هو مبلغ التخفيض فقط؛ اطرحه من الثمن الأصلي لإيجاد الثمن الجديد.'
							},
							{
								text: `${increasedPrice} دج`,
								diagnosticFeedback:
									'انتبه! التخفيض يعني الطرح من الثمن الأصلي وليس الإضافة إليه.'
							},
							{
								text: `${price - pct} دج`,
								diagnosticFeedback:
									'لا نطرح النسبة المئوية مباشرة من السعر، بل نحسب قيمة التخفيض أولا.'
							}
						];

			const mcq = buildUniqueMcqOptions(`${targetVal} دج`, distractors, rng);

			const promptArabic = `ثمن ${chosenItem.name} هو $${price}$ دج. بمناسبة نهاية الفصل الدراسي، طبّق التاجر ${actionWord} بنسبة $${pct}\\%$ على هذا الثمن.`;
			const questionText = `${promptArabic}\n\nما هو **${questionFocus}**؟`;

			const tableBlock: ContentBlock = {
				type: 'table',
				headerBackground: true,
				align: 'center',
				borders: 'grid',
				headers: ['الثمن الأصلي (دج)', `نسبة ال${actionWord}`, `قيمة ال${actionWord} (دج)`, 'الثمن الجديد (دج)'],
				cells: [
					`$${price}$`,
					`${pct}%`,
					{ content: `$...$`, answer: `$${discount}$`, mark: '0.75' },
					{
						content: askNewPrice ? `$...$` : `$${newPrice}$`,
						answer: `$${isIncrease ? increasedPrice : newPrice}$`,
						mark: '0.75'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '5ap',
				trimesterId: 't3',
				difficulty,
				domain: 'proportionality',
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText,
					questionTextAr: questionText,
					questionData: mcq,
					explanation: `نحسب أولا قيمة ال${actionWord}: (${price} × ${pct}) ÷ 100 = ${discount} دج${askNewPrice ? `، ثم ${isIncrease ? `${price} + ${discount} = ${increasedPrice}` : `${price} - ${discount} = ${newPrice}`} دج` : ''}.`
				},
				sujetExercise: {
					points: 1.5,
					instruction: `ثمن ${chosenItem.name} هو $${price}$ دج، وطُبّق عليه ${actionWord} بنسبة ${pct}%. أتمم جدول التناسبية ثم احسب ${questionFocus}:`,
					content: [
						tableBlock,
						{
							type: 'text',
							content: `احسب قيمة ال${actionWord}، ثم استنتج الثمن الجديد لـ ${chosenItem.name}.`,
							answer: `قيمة ال${actionWord}: $(${price} times ${pct}) div 100 = ${discount}$ دج، والثمن الجديد: $${price} ${isIncrease ? '+' : '-'} ${discount} = ${isIncrease ? increasedPrice : newPrice}$ دج.`
						}
					]
				},
				hints: [
					`النسبة ${pct}% تعني أن كل 100 دج تقابلها ${pct} دج كـ ${actionWord}.`,
					`لحساب قيمة ال${actionWord}: اضرب ${price} في ${pct} ثم اقسم الناتج على 100.`,
					askNewPrice
						? `لإيجاد الثمن الجديد: ${isIncrease ? 'أضف' : 'اطرح'} قيمة ال${actionWord} ${isIncrease ? 'إلى' : 'من'} الثمن الأصلي ${price} دج.`
						: `تحقق من قسمة ناتج الضرب على 100 بحذف صفرين.`
				],
				solutionStepsAr: [
					`حساب قيمة ال${actionWord}: (${price} × ${pct}) ÷ 100 = ${discount} دج.`,
					askNewPrice
						? `حساب الثمن الجديد: ${price} ${isIncrease ? '+' : '-'} ${discount} = ${isIncrease ? increasedPrice : newPrice} دج.`
						: `إذن قيمة التخفيض هي: ${discount} دج.`
				],
				finalAnswer: `${targetVal} دج`
			};
		}

		if (subTopic === 1) {
			// Map Scale (المقياس)
			interface ScaleCase {
				scaleDen: number;
				mapCm: number;
				unit: 'm' | 'km';
				realVal: number;
				reverse: boolean;
			}
			const cases: Record<Difficulty, ScaleCase[]> = {
				easy: [
					{ scaleDen: 100, mapCm: rng.int(4, 15), unit: 'm', realVal: 0, reverse: false },
					{ scaleDen: 1000, mapCm: rng.int(3, 12), unit: 'm', realVal: 0, reverse: false }
				],
				medium: [
					{ scaleDen: 200, mapCm: rng.int(5, 14), unit: 'm', realVal: 0, reverse: false },
					{ scaleDen: 500, mapCm: rng.int(4, 12), unit: 'm', realVal: 0, reverse: false },
					{ scaleDen: 25000, mapCm: rng.pick([4, 6, 8, 10, 12]), unit: 'km', realVal: 0, reverse: false },
					{ scaleDen: 50000, mapCm: rng.pick([3, 4, 5, 6, 8, 10]), unit: 'km', realVal: 0, reverse: false }
				],
				hard: [
					{ scaleDen: 20000, mapCm: rng.pick([4.5, 6.5, 7.5, 12.5]), unit: 'km', realVal: 0, reverse: false },
					{ scaleDen: 50000, mapCm: rng.pick([3.5, 4.5, 6.5, 8.5]), unit: 'km', realVal: 0, reverse: false },
					{ scaleDen: 500, mapCm: rng.int(4, 14), unit: 'm', realVal: 0, reverse: true },
					{ scaleDen: 25000, mapCm: rng.pick([4, 8, 12, 16]), unit: 'km', realVal: 0, reverse: true }
				]
			};
			const sc = rng.pick(cases[difficulty]);
			const realCm = roundTo(sc.mapCm * sc.scaleDen, 2);
			sc.realVal = sc.unit === 'm' ? roundTo(realCm / 100, 2) : roundTo(realCm / 100000, 3);

			const realStr = fmtNum(sc.realVal);
			const mapStr = fmtNum(sc.mapCm);

			const correctLabel = sc.reverse ? `${mapStr} cm` : `${realStr} ${sc.unit}`;
			const distractors = sc.reverse
				? [
						{
							text: `${fmtNum(roundTo(sc.mapCm * 10, 2))} cm`,
							diagnosticFeedback:
								'انتبه عند تحويل المسافة الحقيقية إلى السنتيمتر قبل القسمة على مقام المقياس (أضفت صفراً زائداً).'
						},
						{
							text: `${fmtNum(roundTo(sc.realVal, 2))} cm`,
							diagnosticFeedback:
								'يجب ضرب المسافة الحقيقية في عامل التحويل إلى cm ثم القسمة على مقام المقياس.'
						},
						{
							text: `${fmtNum(roundTo(sc.mapCm / 2, 2))} cm`,
							diagnosticFeedback:
								'تحقق من عملية القسمة على مقام المقياس بعد توحيد الوحدات إلى cm.'
						}
					]
				: [
						{
							text: `${fmtNum(roundTo(sc.realVal * 10, 2))} ${sc.unit}`,
							diagnosticFeedback: `راجع التحويل من cm إلى ${sc.unit}؛ لقد نسيت صفراً أو أضفته خطأ أثناء التحويل.`
						},
						{
							text: `${fmtNum(roundTo(sc.realVal * 100, 2))} ${sc.unit}`,
							diagnosticFeedback: `لقد حسبت المسافة بالسنتيمتر أو نسيت تحويلها بشكل صحيح إلى ${sc.unit}.`
						},
						{
							text: `${fmtNum(roundTo(sc.realVal / 10, 3))} ${sc.unit}`,
							diagnosticFeedback: `انتبه لعدد الأصفار في التحويل: 1 m = 100 cm و 1 km = 100000 cm.`
						}
					];

			const mcq = buildUniqueMcqOptions(correctLabel, distractors, rng);
			const contextText =
				sc.unit === 'm'
					? `رُسم تصميم لفناء مدرسة بمقياس $\\frac{1}{${sc.scaleDen}}$.`
					: `على خريطة لشمال الجزائر مرسومة بمقياس $\\frac{1}{${sc.scaleDen}}$.`;

			const questionText = sc.reverse
				? `${contextText} إذا كان الطول الحقيقي هو $${realStr}\\text{ ${sc.unit}}$، فما هو الطول الموافق له على التصميم (الخريطة) بالسنتيمتر؟`
				: `${contextText} إذا كانت المسافة على التصميم (الخريطة) هي $${mapStr}\\text{ cm}$، فما هي المسافة الحقيقية بوحدة ${sc.unit}؟`;

			const typstIntro =
				sc.unit === 'm'
					? `رُسم تصميم لفناء مدرسة بمقياس $frac(1, ${sc.scaleDen})$.`
					: `على خريطة لشمال الجزائر مرسومة بمقياس $frac(1, ${sc.scaleDen})$.`;

			const tableBlock: ContentBlock = {
				type: 'table',
				headerBackground: true,
				align: 'center',
				borders: 'grid',
				headers: ['البعد على الخريطة (cm)', 'البعد الحقيقي (cm)', `البعد الحقيقي (${sc.unit})`],
				cells: [],
				rows: [
					[`$1$`, `$${sc.scaleDen}$`, `${ltr(`${fmtNum(sc.unit === 'm' ? sc.scaleDen / 100 : sc.scaleDen / 100000)} ${sc.unit}`)}`],
					[
						sc.reverse ? { content: `$...$`, answer: `$${mapStr}$`, mark: '0.75' } : `$${mapStr}$`,
						{ content: `$...$`, answer: `$${fmtNum(realCm)}$` },
						sc.reverse ? ltr(`${realStr} ${sc.unit}`) : { content: `$...$`, answer: ltr(`${realStr} ${sc.unit}`), mark: '0.75' }
					]
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '5ap',
				trimesterId: 't3',
				difficulty,
				domain: 'proportionality',
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText,
					questionTextAr: questionText,
					questionData: mcq,
					explanation: sc.reverse
						? `نحوّل ${realStr} ${sc.unit} إلى cm فنجد ${fmtNum(realCm)} cm، ثم نقسم على ${sc.scaleDen}: ${fmtNum(realCm)} ÷ ${sc.scaleDen} = ${mapStr} cm.`
						: `نضرب المسافة على الخريطة في مقام المقياس: ${mapStr} × ${sc.scaleDen} = ${fmtNum(realCm)} cm، ثم نحوّل إلى ${sc.unit} فنجد ${realStr} ${sc.unit}.`
				},
				sujetExercise: {
					points: 1.5,
					instruction: sc.reverse
						? `${typstIntro} الطول الحقيقي يساوي ${ltr(`${realStr} ${sc.unit}`)}. استعمل جدول التناسبية لإيجاد الطول على الخريطة:`
						: `${typstIntro} المسافة على الخريطة تساوي ${ltr(`${mapStr} cm`)}. استعمل جدول التناسبية لحساب المسافة الحقيقية بوحدة ${sc.unit}:`,
					content: [
						tableBlock,
						{
							type: 'text',
							content: sc.reverse
								? `احسب الطول على الخريطة بـ cm.`
								: `احسب المسافة الحقيقية بـ cm ثم حوّلها إلى ${sc.unit}.`,
							answer: sc.reverse
								? `تحويل الطول إلى cm: ${ltr(`${fmtNum(realCm)} cm`)}، ثم القسمة على $${sc.scaleDen}$: $${fmtNum(realCm)} div ${sc.scaleDen} = ${mapStr}$ cm.`
								: `المسافة الحقيقية بـ cm: $${mapStr} times ${sc.scaleDen} = ${fmtNum(realCm)}$ cm، وبالتحويل إلى ${sc.unit} نجد: ${ltr(`${realStr} ${sc.unit}`)}.`,
							mark: '0.75'
						}
					]
				},
				hints: [
					`المقياس 1/${sc.scaleDen} يعني أن كل 1 cm على الخريطة يمثل ${sc.scaleDen} cm في الحقيقة.`,
					sc.reverse
						? `حوّل المسافة الحقيقية أولاً من ${sc.unit} إلى cm (1 m = 100 cm، و 1 km = 100000 cm).`
						: `اضرب ${mapStr} في ${sc.scaleDen} للحصول على المسافة الحقيقية بوحدة cm أولاً.`,
					sc.reverse
						? `اقسم المسافة بالسنتيمتر على ${sc.scaleDen}.`
						: `حوّل الناتج من cm إلى ${sc.unit} (${sc.unit === 'm' ? 'بقسمته على 100' : 'بقسمته على 100000'}).`
				],
				solutionStepsAr: sc.reverse
					? [
							`تحويل المسافة الحقيقية إلى cm: ${realStr} ${sc.unit} = ${fmtNum(realCm)} cm.`,
							`حساب الطول على الخريطة: ${fmtNum(realCm)} ÷ ${sc.scaleDen} = ${mapStr} cm.`
						]
					: [
							`حساب المسافة الحقيقية بالـ cm: ${mapStr} × ${sc.scaleDen} = ${fmtNum(realCm)} cm.`,
							`التحويل إلى ${sc.unit}: ${fmtNum(realCm)} cm = ${realStr} ${sc.unit}.`
						],
				finalAnswer: correctLabel
			};
		}

		// Sub-topic 2: Uniform Speed (السرعة المنتظمة)
		const cities = [
			['الجزائر', 'سطيف'],
			['وهران', 'تلمسان'],
			['قسنطينة', 'عنابة'],
			['البليدة', 'الشلف']
		];
		const [c1, c2] = rng.pick(cities);
		const speed = rng.pick([60, 80, 100, 120]);

		let hours = 2;
		let mins = 0;
		let askSpeed = false;

		if (difficulty === 'easy') {
			hours = rng.int(2, 5);
			mins = 0;
			askSpeed = rng.int(0, 1) === 1;
		} else if (difficulty === 'medium') {
			hours = rng.pick([1, 2, 3]);
			mins = 30;
			askSpeed = false;
		} else {
			hours = rng.pick([1, 2]);
			mins = rng.pick([15, 30, 45]);
			askSpeed = rng.int(0, 1) === 1;
		}

		const totalMins = hours * 60 + mins;
		const dist = roundTo((speed * totalMins) / 60, 2);
		const durLabel = mins === 0 ? `${hours} h` : `${hours} h ${pad2(mins)} min`;

		const correctAnswer = askSpeed ? `${speed} km/h` : `${fmtNum(dist)} km`;
		const distractors = askSpeed
			? [
					{
						text: `${fmtNum(roundTo(dist / (hours + mins / 100), 1))} km/h`,
						diagnosticFeedback:
							mins > 0
								? `تذكّر أن ${mins} دقيقة ليست ${mins / 100} ساعة! حوّل المدة إلى دقائق (${totalMins} min) واستعمل التناسبية.`
								: 'راجع عملية القسمة على عدد الساعات.'
					},
					{
						text: `${fmtNum(roundTo(dist * hours, 0))} km/h`,
						diagnosticFeedback:
							'لمعرفة المسافة في ساعة واحدة نقسم المسافة على المدة ولا نضربها.'
					},
					{
						text: `${speed + 20} km/h`,
						diagnosticFeedback:
							'تحقق من الحساب بالتناسبية: ابحث عن المسافة المقطوعة في 15 دقيقة أو 30 دقيقة ثم استنتج المسافة في 60 دقيقة.'
					}
				]
			: [
					{
						text: `${fmtNum(roundTo(speed * (hours + mins / 100), 1))} km`,
						diagnosticFeedback:
							mins > 0
								? `خطأ شائع! ${hours} h ${pad2(mins)} min لا تساوي ${hours}.${mins} ساعة، لأن الساعة فيها 60 دقيقة وليس 100 دقيقة.`
								: 'تحقق من ضرب السرعة في عدد الساعات.'
					},
					{
						text: `${fmtNum(roundTo(dist + speed / 2, 1))} km`,
						diagnosticFeedback:
							'تأكّد من جمع المسافة المقطوعة في الساعات الكاملة مع المسافة المقطوعة في الدقائق الإضافية.'
					},
					{
						text: `${fmtNum(roundTo(speed * hours, 0))} km`,
						diagnosticFeedback:
							mins > 0
								? `لقد حسبت المسافة خلال ${hours} ساعة فقط ونسيت الدقائق الإضافية (${mins} min).`
								: 'تحقق من جدول الضرب.'
					}
				];

		const mcq = buildUniqueMcqOptions(correctAnswer, distractors, rng);
		const questionText = askSpeed
			? `قطعت سيارة مسافة $${fmtNum(dist)}\\text{ km}$ بين ${c1} و${c2} بسرعة منتظمة خلال مدة $${durLabel}$. ما هي سرعتها المنتظمة؟`
			: `تسير سيارة بين ${c1} و${c2} بسرعة منتظمة قدرها $${speed}\\text{ km/h}$. ما هي المسافة التي تقطعها خلال مدة $${durLabel}$؟`;

		const tableBlock: ContentBlock = {
			type: 'table',
			headerBackground: true,
			align: 'center',
			borders: 'grid',
			headers: ['المدة الزمنية (بالدقائق)', 'المسافة المقطوعة (km)'],
			cells: [],
			rows: [
				['$60$ min ($1$ h)', askSpeed ? { content: '$...$', answer: `$${speed}$`, mark: '0.75' } : `$${speed}$`],
				[
					`$${totalMins}$ min (${ltr(durLabel)})`,
					askSpeed ? `$${fmtNum(dist)}$` : { content: '$...$', answer: `$${fmtNum(dist)}$`, mark: '0.75' }
				]
			]
		};

		const stepNote =
			mins === 0
				? askSpeed
					? `المسافة في ساعة واحدة: ${dist} ÷ ${hours} = ${speed} km/h.`
					: `المسافة خلال ${hours} ساعات: ${speed} × ${hours} = ${dist} km.`
				: askSpeed
					? `في ${totalMins} دقيقة تقطع ${dist} km؛ بقسمة ${dist} على ${totalMins / 15} نجد ${speed / 4} km في كل 15 دقيقة، وبضربها في 4 نجد ${speed} km في 60 دقيقة (1 ساعة).`
					: `في 1 ساعة تقطع ${speed} km، وفي ${mins} دقيقة تقطع ${roundTo((speed * mins) / 60, 2)} km؛ المجموع = ${speed * hours} + ${roundTo((speed * mins) / 60, 2)} = ${dist} km.`;

		const stepNoteTypst =
			mins === 0
				? askSpeed
					? `المسافة في ساعة واحدة: $${dist} div ${hours} = ${speed}$ ${ltr('km/h')}.`
					: `المسافة خلال $${hours}$ ساعات: $${speed} times ${hours} = ${dist}$ km.`
				: askSpeed
					? `في $${totalMins}$ min تقطع $${dist}$ km؛ بقسمة $${dist}$ على $${totalMins / 15}$ نجد $${speed / 4}$ km في كل $15$ min، وبضربها في $4$ نجد $${speed}$ km في $60$ min ($1$ h).`
					: `في $1$ h تقطع $${speed}$ km، وفي $${mins}$ min تقطع $${roundTo((speed * mins) / 60, 2)}$ km؛ المجموع: $${speed * hours} + ${roundTo((speed * mins) / 60, 2)} = ${dist}$ km.`;

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't3',
			difficulty,
			domain: 'proportionality',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				questionData: mcq,
				explanation: stepNote
			},
			sujetExercise: {
				points: 1.5,
				instruction: askSpeed
					? `قطعت سيارة مسافة ${ltr(`${fmtNum(dist)} km`)} بين ${c1} و${c2} بسرعة منتظمة خلال مدة ${ltr(durLabel)}. أتمم جدول التناسبية واحسب سرعتها المنتظمة:`
					: `تسير سيارة بين ${c1} و${c2} بسرعة منتظمة قدرها ${ltr(`${speed} km/h`)}. أتمم جدول التناسبية واحسب المسافة المقطوعة خلال ${ltr(durLabel)}:`,
				content: [
					tableBlock,
					{
						type: 'text',
						content: askSpeed
							? 'احسب السرعة المنتظمة للسيارة بـ km/h.'
							: 'احسب المسافة المقطوعة بـ km.',
						answer: stepNoteTypst,
						mark: '0.75'
					}
				]
			},
			hints: [
				`السرعة المنتظمة تعني أن المسافة متناسبة مع المدة (1 ساعة = 60 دقيقة).`,
				mins > 0
					? `حوّل المدة ${durLabel} إلى دقائق: ${hours} × 60 + ${mins} = ${totalMins} دقيقة.`
					: `استعمل التناسبية بين 1 ساعة و ${hours} ساعات.`,
				askSpeed
					? `ابحث عن المسافة المقطوعة في 60 دقيقة (1 ساعة) باستعمال التناسبية.`
					: `احسب المسافة في ${hours} h ثم أضف المسافة في ${mins} min.`
			],
			solutionStepsAr: [
				`تحويل المدة إلى دقائق: ${durLabel} = ${totalMins} دقيقة.`,
				stepNote,
				`النتيجة: ${correctAnswer}.`
			],
			finalAnswer: correctAnswer
		};
	}
};

// ============================================================================
// 3. Mass, Capacity & Area Conversions (kg, q, t; L, cL, mL; m², dm², cm², a, ha)
// ============================================================================

interface ConversionItem {
	given: string;
	targetUnit: string;
	correctVal: string;
	wrongVal: string;
	noteAr: string;
}

const tplConversionsMatrix: ParameterizedTemplate = {
	id: 'tpl_5ap_t3_conversions_mass_cap_area',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'measurement',
	titleAr: 'تحويل وحدات الكتل والسعات والمساحات',
	curriculumLessonId: 'lesson_5ap_t3_mass_capacity_decimal_measures',
	defaultPoints: 1.5,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 151 + 43);

		let massItem: ConversionItem;
		let capItem: ConversionItem;
		let areaMetricItem: ConversionItem;
		let areaAgrItem: ConversionItem;

		if (difficulty === 'easy') {
			const tons = rng.int(2, 9);
			const q = rng.int(2, 9);
			const pickTon = rng.int(0, 1) === 0;
			massItem = pickTon
				? {
						given: `${tons} t`,
						targetUnit: 'kg',
						correctVal: `${tons * 1000}`,
						wrongVal: `${tons * 100}`,
						noteAr: '1 t = 1000 kg'
					}
				: {
						given: `${q} q`,
						targetUnit: 'kg',
						correctVal: `${q * 100}`,
						wrongVal: `${q * 1000}`,
						noteAr: '1 q = 100 kg'
					};

			const liters = rng.int(2, 9);
			const cl = rng.int(2, 8) * 100;
			capItem =
				rng.int(0, 1) === 0
					? {
							given: `${liters} L`,
							targetUnit: 'cL',
							correctVal: `${liters * 100}`,
							wrongVal: `${liters * 1000}`,
							noteAr: '1 L = 100 cL'
						}
					: {
							given: `${cl} cL`,
							targetUnit: 'L',
							correctVal: `${cl / 100}`,
							wrongVal: `${cl / 10}`,
							noteAr: '100 cL = 1 L'
						};

			const m2 = rng.int(2, 9);
			const dm2 = rng.int(2, 9);
			areaMetricItem =
				rng.int(0, 1) === 0
					? {
							given: `${m2} m²`,
							targetUnit: 'dm²',
							correctVal: `${m2 * 100}`,
							wrongVal: `${m2 * 10}`,
							noteAr: '1 m² = 100 dm²'
						}
					: {
							given: `${dm2} dm²`,
							targetUnit: 'cm²',
							correctVal: `${dm2 * 100}`,
							wrongVal: `${dm2 * 10}`,
							noteAr: '1 dm² = 100 cm²'
						};

			const ha = rng.int(2, 8);
			const ares = rng.int(2, 9);
			areaAgrItem =
				rng.int(0, 1) === 0
					? {
							given: `${ha} ha`,
							targetUnit: 'a',
							correctVal: `${ha * 100}`,
							wrongVal: `${ha * 10}`,
							noteAr: '1 ha = 100 a'
						}
					: {
							given: `${ares} a`,
							targetUnit: 'm²',
							correctVal: `${ares * 100}`,
							wrongVal: `${ares * 1000}`,
							noteAr: '1 a = 100 m²'
						};
		} else if (difficulty === 'medium') {
			const tonsDec = rng.pick([1.5, 2.5, 3.2, 4.5, 6.8]);
			const kgDec = rng.pick([1500, 2500, 3200, 4500]);
			massItem =
				rng.int(0, 1) === 0
					? {
							given: `${fmtNum(tonsDec)} t`,
							targetUnit: 'kg',
							correctVal: `${Math.round(tonsDec * 1000)}`,
							wrongVal: `${Math.round(tonsDec * 100)}`,
							noteAr: '1 t = 1000 kg'
						}
					: {
							given: `${kgDec} kg`,
							targetUnit: 'q',
							correctVal: `${fmtNum(kgDec / 100)}`,
							wrongVal: `${fmtNum(kgDec / 1000)}`,
							noteAr: '1 q = 100 kg'
						};

			const lDec = rng.pick([1.5, 2.4, 3.5, 4.8]);
			const mlVal = rng.pick([1500, 2500, 3500, 4200]);
			capItem =
				rng.int(0, 1) === 0
					? {
							given: `${fmtNum(lDec)} L`,
							targetUnit: 'mL',
							correctVal: `${Math.round(lDec * 1000)}`,
							wrongVal: `${Math.round(lDec * 100)}`,
							noteAr: '1 L = 1000 mL'
						}
					: {
							given: `${mlVal} mL`,
							targetUnit: 'cL',
							correctVal: `${mlVal / 10}`,
							wrongVal: `${mlVal / 100}`,
							noteAr: '1 cL = 10 mL'
						};

			const m2Val = rng.pick([1.5, 2.5, 3.4, 4]);
			const m2Int = rng.int(2, 6);
			areaMetricItem =
				rng.int(0, 1) === 0
					? {
							given: `${fmtNum(m2Val)} m²`,
							targetUnit: 'dm²',
							correctVal: `${Math.round(m2Val * 100)}`,
							wrongVal: `${Math.round(m2Val * 10)}`,
							noteAr: '1 m² = 100 dm²'
						}
					: {
							given: `${m2Int} m²`,
							targetUnit: 'cm²',
							correctVal: `${m2Int * 10000}`,
							wrongVal: `${m2Int * 1000}`,
							noteAr: '1 m² = 10000 cm²'
						};

			const haDec = rng.pick([1.5, 2.5, 0.5, 3.2]);
			areaAgrItem = {
				given: `${fmtNum(haDec)} ha`,
				targetUnit: 'm²',
				correctVal: `${Math.round(haDec * 10000)}`,
				wrongVal: `${Math.round(haDec * 1000)}`,
				noteAr: '1 ha = 10000 m²'
			};
		} else {
			// hard: compound conversions and tricky decimals
			const t = rng.int(1, 5);
			const q = rng.int(2, 8);
			const kgExtra = rng.pick([25, 50, 75]);
			massItem = {
				given: `${t} t ${q} q ${kgExtra} kg`,
				targetUnit: 'kg',
				correctVal: `${t * 1000 + q * 100 + kgExtra}`,
				wrongVal: `${t * 1000 + q * 10 + kgExtra}`,
				noteAr: '1 t = 1000 kg و 1 q = 100 kg'
			};

			const l = rng.int(1, 4);
			const cl = rng.pick([25, 50, 75]);
			capItem = {
				given: `${l} L ${cl} cL`,
				targetUnit: 'mL',
				correctVal: `${l * 1000 + cl * 10}`,
				wrongVal: `${l * 1000 + cl}`,
				noteAr: '1 L = 1000 mL و 1 cL = 10 mL'
			};

			const m2 = rng.int(1, 4);
			const dm2 = rng.pick([25, 50, 75]);
			areaMetricItem = {
				given: `${m2} m² ${dm2} dm²`,
				targetUnit: 'dm²',
				correctVal: `${m2 * 100 + dm2}`,
				wrongVal: `${m2 * 10 + dm2}`,
				noteAr: '1 m² = 100 dm²'
			};

			const ha = rng.int(1, 3);
			const a = rng.pick([25, 40, 75]);
			areaAgrItem = {
				given: `${ha} ha ${a} a`,
				targetUnit: 'm²',
				correctVal: `${ha * 10000 + a * 100}`,
				wrongVal: `${ha * 1000 + a * 100}`,
				noteAr: '1 ha = 10000 m² و 1 a = 100 m²'
			};
		}

		const items = [massItem, capItem, areaMetricItem, areaAgrItem];
		const truthFlags = rng.shuffle([true, true, false, false]);
		const statementRows = items.map((item, idx) => {
			const isTrue = truthFlags[idx];
			const shownVal = isTrue ? item.correctVal : item.wrongVal;
			return {
				statement: `${item.given} = ${shownVal} ${item.targetUnit}`,
				isTrue,
				item
			};
		});

		const marks = ['0.5', '0.25', '0.25', '0.5'];
		const tableRows: (string | TableCell)[][] = items.map((it, idx) => [
			ltr(it.given),
			ltr(it.targetUnit),
			{
				content: ltr(`...... ${it.targetUnit}`),
				answer: ltr(`${it.correctVal} ${it.targetUnit}`),
				mark: marks[idx]
			}
		]);

		const questionText =
			'تحقق من صحة كل تحويل مما يأتي باختيار **صحيح** أو **خطأ** (انتبه لمراتب جدول الكتل والسعات والمساحات):';

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't3',
			difficulty,
			domain: 'measurement',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'matrix',
				questionText,
				questionTextAr: questionText,
				questionData: {
					statements: statementRows.map((r) => r.statement),
					columns: ['صحيح', 'خطأ'],
					correctAnswers: statementRows.map((r) => (r.isTrue ? 0 : 1))
				},
				explanation: statementRows
					.map((r) => `${r.statement} (${r.isTrue ? 'صحيح' : `خطأ، الصواب: ${r.item.correctVal} ${r.item.targetUnit}`} — ${r.item.noteAr})`)
					.join(' | ')
			},
			sujetExercise: {
				points: 1.5,
				instruction: 'أكمل جدول التحويلات الآتي بالعدد المناسب في كل خانة:',
				content: [
					buildIllustratedFigureBlock('pri_math_07_measuring_vessels_liter', {
						maxHeight: 112,
						width: '58%'
					}),
					{
						type: 'table',
						headerBackground: true,
						align: 'center',
						borders: 'grid',
						headers: ['القياس المعطى', 'الوحدة المطلوبة', 'القياس المحوّل'],
						cells: [],
						rows: tableRows
					}
				]
			},
			hints: [
				'في الكتل: 1 t = 1000 kg و 1 q = 100 kg.',
				'في السعات: 1 L = 100 cL = 1000 mL.',
				'في المساحات: كل خانة تحوي رقمين (1 m² = 100 dm² = 10000 cm²)، و 1 ha = 100 a = 10000 m².'
			],
			solutionStepsAr: items.map(
				(it) => `${it.given} = ${it.correctVal} ${it.targetUnit} (${it.noteAr}).`
			),
			finalAnswer: items.map((it) => `${it.correctVal} ${it.targetUnit}`).join(' | ')
		};
	}
};

// ============================================================================
// 4. Time Duration Addition / Subtraction (h, min, s) with svgAnalogClock
// ============================================================================

const tplTimeDurations: ParameterizedTemplate = {
	id: 'tpl_5ap_t3_time_durations',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'measurement',
	titleAr: 'حساب المدد والأزمنة (جمع وطرح)',
	curriculumLessonId: 'lesson_5ap_t3_time_durations_calculations',
	defaultPoints: 1.5,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 173 + 57);
		const contexts = [
			{ vehicle: 'حافلة المسافرين', trip: 'رحلة بين ولايتين' },
			{ vehicle: 'القطار السريع', trip: 'رحلة تربط بين محطتين' },
			{ vehicle: 'سيارة العائلة', trip: 'نزهة سياحية' }
		];
		const ctx = rng.pick(contexts);

		let depH = 7;
		let depM = 15;
		let depS: number | undefined;
		let durH = 1;
		let durM = 20;
		let durS: number | undefined;
		let arrH = 8;
		let arrM = 35;
		let arrS: number | undefined;

		let mode: 'find_arrival' | 'find_duration' | 'find_departure' = 'find_arrival';

		if (difficulty === 'easy') {
			depH = rng.int(7, 9);
			depM = rng.pick([5, 10, 15, 20, 25]);
			durH = rng.int(1, 2);
			durM = rng.pick([10, 15, 20, 25, 30]);
			arrH = depH + durH;
			arrM = depM + durM; // always < 60 (no carry/borrow)
			mode = rng.int(0, 1) === 0 ? 'find_arrival' : 'find_duration';
		} else if (difficulty === 'medium') {
			// Guarantee sexagesimal carry (sum >= 60) or borrow (arrM < depM)
			depH = rng.int(7, 9);
			depM = rng.pick([35, 40, 45, 50, 55]);
			durH = rng.int(1, 2);
			durM = rng.pick([25, 30, 35, 40, 45]);
			const totalM = depM + durM;
			arrH = depH + durH + Math.floor(totalM / 60);
			arrM = totalM % 60;
			// Ensure arrH <= 11 so analog clock matches 07..11 cleanly if arrival is shown
			if (arrH > 11) {
				depH = 7;
				arrH = depH + durH + Math.floor(totalM / 60);
			}
			mode = rng.pick(['find_arrival', 'find_duration', 'find_departure']);
		} else {
			// Hard: include seconds s with sexagesimal carry/borrow
			depH = rng.int(7, 8);
			depM = rng.pick([35, 40, 45, 50]);
			depS = rng.pick([35, 40, 45, 50]);
			durH = rng.int(1, 2);
			durM = rng.pick([30, 35, 40, 45]);
			durS = rng.pick([30, 35, 40, 45]);

			const sumS = depS + durS;
			const carryM = Math.floor(sumS / 60);
			arrS = sumS % 60;

			const sumM = depM + durM + carryM;
			const carryH = Math.floor(sumM / 60);
			arrM = sumM % 60;
			arrH = depH + durH + carryH;
			mode = rng.int(0, 1) === 0 ? 'find_arrival' : 'find_duration';
		}

		const showArrivalClock = mode === 'find_departure';
		const clockH = showArrivalClock ? arrH : depH;
		const clockM = showArrivalClock ? arrM : depM;
		const svgPath = saveSvgAsset(`5ap_t3_clock_s${seed}_${difficulty}`, svgAnalogClock(clockH, clockM));
		const clockCaption = showArrivalClock
			? `ساعة الوصول: ${fmtClock(arrH, arrM, arrS)}`
			: `ساعة الانطلاق: ${fmtClock(depH, depM, depS)}`;

		const depStr = fmtClock(depH, depM, depS);
		const arrStr = fmtClock(arrH, arrM, arrS);
		const durStr = fmtDuration(durH, durM, durS);

		let questionText = '';
		let correctStr = '';
		let distractors: { text: string; diagnosticFeedback: string }[] = [];
		let explanation = '';
		let stepsAr: string[] = [];
		let stepsTypstAr: string[] = [];

		if (mode === 'find_arrival') {
			correctStr = arrStr;
			questionText = `انطلقت ${ctx.vehicle} صباحا كما تشير الساعة المرفقة على الساعة $${depStr}$، واستغرقت الرحلة مدة $${durStr}$. في أي ساعة وصلت؟`;
			const rawM = depM + durM + (depS !== undefined && durS !== undefined ? Math.floor((depS + durS) / 60) : 0);
			const wrongForgetCarryH = fmtClock(depH + durH, rawM % 60, arrS);
			const wrongBase100 =
				depS === undefined
					? `${pad2(depH + durH)} h ${depM + durM} min`
					: `${pad2(depH + durH)} h ${depM + durM} min ${depS + (durS || 0)} s`;
			const wrongMinusOneH = fmtClock(Math.max(1, arrH - 1), (arrM + 10) % 60, arrS);

			distractors = [
				{
					text: wrongForgetCarryH,
					diagnosticFeedback:
						'انتبه! عند تجاوز 60 دقيقة نبدّل كل 60 دقيقة بساعة واحدة ونضيفها إلى عمود الساعات.'
				},
				{
					text: wrongBase100,
					diagnosticFeedback:
						'لا تترك الدقائق أو الثواني أكبر من أو تساوي 60! النظام الزمني نظام ستيني (1 h = 60 min و 1 min = 60 s).'
				},
				{
					text: wrongMinusOneH,
					diagnosticFeedback: 'راجع عمليتي الجمع والاحتفاظ في الساعات والدقائق.'
				}
			];
			explanation = `وقت الوصول = وقت الانطلاق + المدة: ${depStr} + ${durStr} = ${arrStr}.`;
			stepsAr = [
				`نضع العملية عموديا بوضع الساعات تحت الساعات والدقائق تحت الدقائق${depS !== undefined ? ' والثواني تحت الثواني' : ''}.`,
				depS !== undefined && durS !== undefined
					? `الثواني: ${depS} + ${durS} = ${depS + durS} s، أي ${arrS} s ونحتفظ بـ 1 min.`
					: `نجمع الدقائق: ${depM} + ${durM} = ${depM + durM} min.`,
				`النتيجة النهائية لوقت الوصول: ${arrStr}.`
			];
			stepsTypstAr = [
				`نضع العملية عموديا بوضع الساعات تحت الساعات والدقائق تحت الدقائق${depS !== undefined ? ' والثواني تحت الثواني' : ''}.`,
				depS !== undefined && durS !== undefined
					? `الثواني: ${ltr(`${depS} + ${durS} = ${depS + durS} s`)}، أي ${ltr(`${arrS} s`)} ونحتفظ بـ ${ltr('1 min')}.`
					: `نجمع الدقائق: ${ltr(`${depM} + ${durM} = ${depM + durM} min`)}.`,
				`النتيجة النهائية لوقت الوصول: ${ltr(`${depStr} + ${durStr} = ${arrStr}`)}.`
			];
		} else if (mode === 'find_duration') {
			correctStr = durStr;
			questionText = `انطلقت ${ctx.vehicle} صباحا على الساعة $${depStr}$ (كما توضّح الساعة المرفقة) ووصلت إلى وجهتها على الساعة $${arrStr}$. ما هي المدة التي استغرقتها الرحلة؟`;
			const absDiffM = Math.abs(arrM - depM);
			const wrongBorrow100 = fmtDuration(arrH - depH - 1, arrM < depM ? arrM + 100 - depM : (absDiffM + 15) % 60, arrS !== undefined ? (arrS + 60 - (depS || 0)) % 60 : undefined);
			const wrongNoBorrowH = fmtDuration(arrH - depH, arrM < depM ? arrM + 60 - depM : (absDiffM + 20) % 60, arrS !== undefined ? durS : undefined);
			const wrongReversedSub = fmtDuration(arrH - depH, absDiffM === durM ? (durM + 10) % 60 : absDiffM, arrS !== undefined ? Math.abs(arrS - (depS || 0)) : undefined);

			distractors = [
				{
					text: wrongNoBorrowH,
					diagnosticFeedback:
						'انتبه! عند استلاف 1 ساعة (= 60 دقيقة) يجب إنقاص 1 من ساعات الوصول.'
				},
				{
					text: wrongReversedSub,
					diagnosticFeedback:
						'لا تطرح الدقائق الصغرى من الكبرى بالعكس! عندما تكون دقائق الوصول أصغر، استلف 60 دقيقة من الساعات.'
				},
				{
					text: wrongBorrow100,
					diagnosticFeedback:
						'عند الاستلاف من الساعات نضيف 60 دقيقة وليس 100 دقيقة.'
				}
			];
			explanation = `المدة المستغرقة = وقت الوصول − وقت الانطلاق: ${arrStr} − ${depStr} = ${durStr}.`;
			stepsAr = [
				`المدة المستغرقة = وقت الوصول (${arrStr}) − وقت الانطلاق (${depStr}).`,
				arrM < depM || (arrS !== undefined && depS !== undefined && arrS < depS)
					? `نستعمل المبادلة الستينية (1 h = 60 min${arrS !== undefined ? ' و 1 min = 60 s' : ''}) عند الحاجة.`
					: `نطرح الدقائق ثم الساعات مباشرة.`,
				`المدة المستغرقة هي: ${durStr}.`
			];
			stepsTypstAr = [
				`المدة المستغرقة: ${ltr(`${arrStr} - ${depStr}`)}.`,
				arrM < depM || (arrS !== undefined && depS !== undefined && arrS < depS)
					? `نستعمل المبادلة الستينية (${ltr('1 h = 60 min')}${arrS !== undefined ? ` و ${ltr('1 min = 60 s')}` : ''}) عند الحاجة.`
					: `نطرح الدقائق ثم الساعات مباشرة.`,
				`المدة المستغرقة هي: ${ltr(durStr)}.`
			];
		} else {
			// find_departure
			correctStr = depStr;
			questionText = `وصلت ${ctx.vehicle} إلى المحطة صباحا على الساعة $${arrStr}$ (كما تشير الساعة المرفقة) بعد رحلة دامت $${durStr}$. في أي ساعة انطلقت؟`;
			const wrongNoBorrow = fmtClock(arrH - durH, (arrM + 60 - durM) % 60);
			const wrongReversed = fmtClock(arrH - durH, Math.abs(arrM - durM));
			const wrongAdded = fmtClock(arrH + durH, (arrM + durM) % 60);

			distractors = [
				{
					text: wrongNoBorrow,
					diagnosticFeedback:
						'نسيت إنقاص 1 ساعة بعد استلاف 60 دقيقة من وقت الوصول!'
				},
				{
					text: wrongReversed,
					diagnosticFeedback:
						'لا تطرح دقائق الوصول من دقائق المدة بالعكس؛ استلف 60 دقيقة أولا.'
				},
				{
					text: wrongAdded,
					diagnosticFeedback:
						'لإيجاد وقت الانطلاق نطرح المدة من وقت الوصول ولا نجمعها.'
				}
			];
			explanation = `وقت الانطلاق = وقت الوصول − المدة المستغرقة: ${arrStr} − ${durStr} = ${depStr}.`;
			stepsAr = [
				`وقت الانطلاق = وقت الوصول (${arrStr}) − المدة (${durStr}).`,
				`نبادل 1 ساعة بـ 60 دقيقة من ${arrStr} عند الطرح.`,
				`إذن وقت الانطلاق هو: ${depStr}.`
			];
			stepsTypstAr = [
				`وقت الانطلاق: ${ltr(`${arrStr} - ${durStr}`)}.`,
				`نبادل ${ltr('1 h')} بـ ${ltr('60 min')} عند الطرح.`,
				`إذن وقت الانطلاق هو: ${ltr(depStr)}.`
			];
		}

		const mcq = buildUniqueMcqOptions(correctStr, distractors, rng);
		const typstPrompt =
			mode === 'find_arrival'
				? `انطلقت ${ctx.vehicle} صباحا على الساعة ${ltr(depStr)} (كما توضح الساعة المقابلة)، واستغرقت الرحلة مدة ${ltr(durStr)}.`
				: mode === 'find_duration'
					? `انطلقت ${ctx.vehicle} صباحا على الساعة ${ltr(depStr)} (الساعة المقابلة) ووصلت إلى وجهتها على الساعة ${ltr(arrStr)}.`
					: `وصلت ${ctx.vehicle} صباحا على الساعة ${ltr(arrStr)} (الساعة المقابلة) بعد رحلة دامت ${ltr(durStr)}.`;

		const typstQuestion =
			mode === 'find_arrival'
				? 'احسب وقت الوصول بوضع العملية العمودية.'
				: mode === 'find_duration'
					? 'احسب المدة المستغرقة في هذه الرحلة.'
					: 'احسب وقت الانطلاق بوضع العملية العمودية.';

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't3',
			difficulty,
			domain: 'measurement',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: clockCaption,
				questionData: mcq,
				explanation
			},
			sujetExercise: {
				points: 1.5,
				instruction: 'لاحظ الساعة المرفقة ثم أجب عن المطلوب مع إظهار الحساب في النظام الستيني:',
				content: [
					{
						type: 'columns',
						widths: ['2fr', '1fr'],
						children: [
							{ type: 'text', content: typstPrompt },
							{ type: 'image', src: svgPath, caption: ltr(clockCaption.replace('ساعة الانطلاق: ', '').replace('ساعة الوصول: ', '')) }
						]
					},
					{
						type: 'text',
						content: typstQuestion,
						answer: `${typstQuestion}\n\n${stepsTypstAr.join(' ')}`,
						mark: '1.5'
					}
				]
			},
			hints: [
				mode === 'find_arrival'
					? 'لإيجاد وقت الوصول نجمع: وقت الانطلاق + المدة المستغرقة.'
					: mode === 'find_duration'
						? 'لإيجاد المدة نطرح: وقت الوصول − وقت الانطلاق.'
						: 'لإيجاد وقت الانطلاق نطرح: وقت الوصول − المدة المستغرقة.',
				'تذكّر دوما القاعدة الستينية: 1 h = 60 min و 1 min = 60 s.',
				depS !== undefined
					? 'ابدأ بالثواني أولا، ثم الدقائق، ثم الساعات.'
					: 'ابدأ بعمود الدقائق أولا قبل الانتقال إلى عمود الساعات.'
			],
			solutionStepsAr: stepsAr,
			finalAnswer: correctStr
		};
	}
};

// ============================================================================
// 5. Quadrilaterals, Circle Properties (NO pi) & Solids (Cube / Cuboid)
// ============================================================================

interface GeomStmt {
	q: string;
	isTrue: boolean;
	c: string;
}

const tplGeometryQuadCircleSolids: ParameterizedTemplate = {
	id: 'tpl_5ap_t3_geometry_quad_circle_solids',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'geometry',
	titleAr: 'الرباعيات الخاصة والدائرة والمجسمات',
	curriculumLessonId: 'lesson_5ap_t3_quadrilaterals_circle_construction',
	defaultPoints: 1.5,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 193 + 71);
		const useTriangle = rng.int(0, 2) === 0;

		let svgStr = '';
		let shapeDescTypst = '';
		let shapeDescAr = '';
		let geomStmt: GeomStmt;

		if (useTriangle) {
			const a = rng.int(3, 8);
			const b = rng.int(4, 9);
			svgStr = svgTriangle({
				labels: ['A', 'B', 'C'],
				sideAB: `${a} cm`,
				sideAC: `${b} cm`,
				rightAngleAtA: true
			});
			shapeDescTypst = `الشكل المقابل مثلث قائم في $A$ حيث $A B = ${a}$ cm و $A C = ${b}$ cm.`;
			shapeDescAr = `في المثلث القائم $ABC$ المقابل ($AB = ${a}\\text{ cm}$ و $AC = ${b}\\text{ cm}$):`;

			const triOptions: GeomStmt[] =
				difficulty === 'easy'
					? [
							{
								q: 'المثلث القائم يحتوي على زاوية قائمة واحدة وضلعيها متعامدان.',
								isTrue: true,
								c: 'العبارة صحيحة.'
							},
							{
								q: 'المثلث القائم يحتوي على ثلاث زوايا قائمة.',
								isTrue: false,
								c: 'خطأ، المثلث القائم له زاوية قائمة واحدة فقط.'
							}
						]
					: [
							{
								q: `مساحة المثلث القائم $A B C$ تساوي نصف مساحة مستطيل بعداه ${ltr(`${a} cm`)} و ${ltr(`${b} cm`)}.`,
								isTrue: true,
								c: `العبارة صحيحة، مساحته هي $${a} times ${b} div 2 = ${fmtNum((a * b) / 2)}$ ${ltr('cm²')}.`
							},
							{
								q: `مساحة المثلث القائم $A B C$ تساوي ${ltr(`${a * b} cm²`)}.`,
								isTrue: false,
								c: `خطأ، مساحة المثلث القائم هي نصف جداء الضلعين القائمين أي ${ltr(`${fmtNum((a * b) / 2)} cm²`)} وليس ${ltr(`${a * b} cm²`)}.`
							}
						];
			geomStmt = rng.pick(triOptions);
		} else {
			const isSquare = rng.int(0, 1) === 0;
			const len = rng.int(5, 11);
			const wid = isSquare ? len : rng.int(3, len - 1);
			svgStr = svgRectangle({
				lengthLabel: `${len} cm`,
				widthLabel: `${wid} cm`,
				shapeLabel: isSquare ? 'مربع' : 'مستطيل',
				vertices: ['A', 'B', 'C', 'D']
			});
			shapeDescTypst = isSquare
				? `الشكل المقابل مربع $A B C D$ طول ضلعه $${len}$ cm.`
				: `الشكل المقابل مستطيل $A B C D$ طوله $${len}$ cm وعرضه $${wid}$ cm.`;
			shapeDescAr = isSquare
				? `في المربع $ABCD$ المقابل (طول ضلعه $${len}\\text{ cm}$):`
				: `في المستطيل $ABCD$ المقابل (طوله $${len}\\text{ cm}$ وعرضه $${wid}\\text{ cm}$):`;

			const quadOptions: GeomStmt[] = isSquare
				? [
						{
							q: 'قطرا المربع متقايسان ومتناصفان ومتعامدان.',
							isTrue: true,
							c: 'العبارة صحيحة، هذه من الخواص المميزة للمربع.'
						},
						{
							q: 'للمربع أربعة أضلاع متقايسة لكن زواياه ليست قائمة.',
							isTrue: false,
							c: 'خطأ، المربع له أربع زوايا قائمة (الذي زواياه ليست قائمة هو المعين).'
						}
					]
				: [
						{
							q: 'قطرا المستطيل متقايسان ويتناصفان، لكنهما غير متعامدين.',
							isTrue: true,
							c: 'العبارة صحيحة، قطرا المستطيل متقايسان ومتناصفان وليس بالضرورة متعامدين.'
						},
						{
							q: 'قطرا المستطيل متعامدان دائما.',
							isTrue: false,
							c: 'خطأ، قطرا المستطيل غير متعامدين (المتعامدان هما قطرا المعين والمربع).'
						}
					];
			geomStmt = rng.pick(quadOptions);
		}

		const svgPath = saveSvgAsset(`5ap_t3_geom_s${seed}_${difficulty}`, svgStr);

		// Circle statement (strictly radius/diameter only, NO pi)
		const radius =
			difficulty === 'easy'
				? rng.int(2, 8)
				: difficulty === 'medium'
					? rng.pick([2.5, 3.5, 4.5, 5.5, 6.5])
					: rng.pick([2.25, 3.25, 4.75, 6.25]);
		const diameter = roundTo(radius * 2, 2);
		const circlePool: GeomStmt[] = [
			{
				q: `في دائرة نصف قطرها ${ltr(`${fmtNum(radius)} cm`)}، يكون طول قطرها يساوي ${ltr(`${fmtNum(diameter)} cm`)}.`,
				isTrue: true,
				c: `العبارة صحيحة لأن القطر يساوي ضعف نصف القطر: ${ltr(`${fmtNum(radius)} × 2 = ${fmtNum(diameter)} cm`)}.`
			},
			{
				q: `في دائرة طول قطرها ${ltr(`${fmtNum(diameter)} cm`)}، يكون طول نصف قطرها يساوي ${ltr(`${fmtNum(diameter * 2)} cm`)}.`,
				isTrue: false,
				c: `خطأ، نصف القطر يساوي نصف طول القطر أي ${ltr(`${fmtNum(diameter)} ÷ 2 = ${fmtNum(radius)} cm`)}.`
			},
			{
				q: 'كل قطعة مستقيم تصل بين نقطتين من الدائرة وتمر بالمركز تسمى قطرا للدائرة.',
				isTrue: true,
				c: 'العبارة صحيحة، القطر هو وتر يمر من مركز الدائرة.'
			},
			{
				q: 'كل وتر في الدائرة يمر حتما من مركز الدائرة.',
				isTrue: false,
				c: 'خطأ، الوتر يصل بين نقطتين من الدائرة ولا يشترط أن يمر بالمركز.'
			}
		];
		const circleStmt = rng.pick(circlePool);

		// Solid statement (Cube / Cuboid: faces, vertices, edges - NO volume)
		const solidPool: GeomStmt[] = [
			{
				q: 'للمكعب 6 أوجه كلها مربعة متقايسة، و 8 رؤوس، و 12 حرفا.',
				isTrue: true,
				c: 'العبارة صحيحة، المكعب مجسم له 6 أوجه مربعة و8 رؤوس و12 حرفا.'
			},
			{
				q: 'لمتوازي المستطيلات 6 أوجه، 8 رؤوس، و 12 حرفا.',
				isTrue: true,
				c: 'العبارة صحيحة، متوازي المستطيلات يشترك مع المكعب في عدد الأوجه والرؤوس والأحرف.'
			},
			{
				q: 'للمكعب 8 أوجه، و 6 رؤوس، و 10 أحرف.',
				isTrue: false,
				c: 'خطأ، للمكعب 6 أوجه و8 رؤوس و12 حرفا.'
			},
			{
				q: 'جميع أوجه متوازي المستطيلات مثلثات.',
				isTrue: false,
				c: 'خطأ، أوجه متوازي المستطيلات مستطيلات (أو أربعة مستطيلات ومربعان).'
			}
		];
		const solidStmt = rng.pick(solidPool);

		// Choose which statement goes to quizQuestion (0 -> geomStmt with image, 1 -> circleStmt, 2 -> solidStmt)
		const quizPickIdx = seed % 3;
		const quizStmt = [geomStmt, circleStmt, solidStmt][quizPickIdx];

		const cleanPlain = (s: string) =>
			s
				.replace(/#text\(dir:\s*ltr\)\[([^\]]+)\]/g, '$1')
				.replaceAll('$A B C$', '$ABC$')
				.replaceAll('$A B C D$', '$ABCD$');

		const quizText =
			quizPickIdx === 0
				? `${shapeDescAr}\n\nهل العبارة الآتية صحيحة أم خاطئة؟\n**«${cleanPlain(quizStmt.q)}»**`
				: `هل العبارة الهندسية الآتية صحيحة أم خاطئة؟\n**«${cleanPlain(quizStmt.q)}»**`;

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't3',
			difficulty,
			domain: 'geometry',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'true_false',
				questionText: quizText,
				questionTextAr: quizText,
				imageUrl: quizPickIdx === 0 ? svgPath : null,
				imageCaption: quizPickIdx === 0 ? 'الشكل الهندسي المرفق' : null,
				questionData: {
					correctAnswer: quizStmt.isTrue
				},
				explanation: cleanPlain(quizStmt.c).replaceAll('$', '').replaceAll('times', '×').replaceAll('div', '÷')
			},
			sujetExercise: {
				points: 1.5,
				instruction: 'أجب بـ (صحيح) أو (خطأ) مع تصحيح الخطأ إن وُجد:',
				content: [
					{
						type: 'columns',
						widths: ['2fr', '1fr'],
						children: [
							{ type: 'text', content: shapeDescTypst },
							{ type: 'image', src: svgPath }
						]
					},
					buildIllustratedFigureBlock('pri_math_06_3d_geometric_solids', {
						maxHeight: 112,
						width: '58%',
						mode: 'image_only',
						title: 'تَذْكِيرٌ بَصَرِيٌّ بِالمُجَسَّمَاتِ الهَنْدَسِيَّةِ المَأْلُوفَةِ'
					}),
					{
						type: 'true_false',
						items: [
							{
								q: geomStmt.q,
								a: geomStmt.isTrue ? 'صحيح' : 'خطأ',
								c: geomStmt.c,
								mark: '0.5'
							},
							{
								q: circleStmt.q,
								a: circleStmt.isTrue ? 'صحيح' : 'خطأ',
								c: circleStmt.c,
								mark: '0.5'
							},
							{
								q: solidStmt.q,
								a: solidStmt.isTrue ? 'صحيح' : 'خطأ',
								c: solidStmt.c,
								mark: '0.5'
							}
						]
					}
				]
			},
			hints: [
				'ميّز بين خواص أقطار المربع (متقايسان ومتعامدان) والمستطيل (متقايسان وغير متعامدين) والمعين (متعامدان وغير متقايسين).',
				'في الدائرة: طول القطر يساوي ضعف نصف القطر (القطر = نصف القطر × 2).',
				'في المجسمات: المكعب ومتوازي المستطيلات لكل منهما 6 أوجه و 8 رؤوس و 12 حرفا.'
			],
			solutionStepsAr: [
				`العبارة الأولى: ${geomStmt.isTrue ? 'صحيح' : 'خطأ'} — ${cleanPlain(geomStmt.c)}`,
				`العبارة الثانية: ${circleStmt.isTrue ? 'صحيح' : 'خطأ'} — ${cleanPlain(circleStmt.c)}`,
				`العبارة الثالثة: ${solidStmt.isTrue ? 'صحيح' : 'خطأ'} — ${cleanPlain(solidStmt.c)}`
			],
			finalAnswer: quizStmt.isTrue ? 'صحيح' : 'خطأ'
		};
	}
};

// ============================================================================
// 6. Cinq / Competency Assessment (تقييم المكتسبات + ONEC Cinq) 3-Question Integration
// ============================================================================

const tplIntegrationCinq: ParameterizedTemplate = {
	id: 'tpl_5ap_t3_integration_cinq',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية (تقييم المكتسبات)',
	defaultPoints: 4,
	isIntegration: true,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 211 + 83);
		const theme = seed % 3; // 0: agriculture, 1: trade, 2: trip

		if (theme === 0) {
			// Agriculture (الفلاحة)
			const crops = [
				{ name: 'البرتقال', place: 'سهل متيجة', unitPriceChoices: [80, 90, 100, 120] },
				{ name: 'التمور', place: 'واحات بسكرة', unitPriceChoices: [200, 250, 300, 350] },
				{ name: 'البطاطا', place: 'هضاب سطيف', unitPriceChoices: [50, 60, 70, 80] }
			];
			const crop = rng.pick(crops);
			const len = difficulty === 'easy' ? rng.int(25, 45) : rng.int(45, 90);
			const wid = difficulty === 'easy' ? rng.int(15, 25) : rng.int(25, len - 10);
			const area = len * wid;

			const quintals = difficulty === 'easy' ? rng.int(8, 20) : rng.int(18, 45);
			const harvestKg = quintals * 100;
			const boxCap = rng.pick([10, 20, 25]);
			// Ensure clean division for harvestKg / boxCap (quintals*100 is always divisible by 10, 20, 25!)
			const boxes = harvestKg / boxCap;
			const pctSold = difficulty === 'easy' ? 50 : rng.pick([50, 60, 80]);
			const soldBoxes = Math.round((boxes * pctSold) / 100);
			const boxPrice = rng.pick(crop.unitPriceChoices) * boxCap;
			const revenue = soldBoxes * boxPrice;
			const transportCost = rng.priceDA(1500, Math.min(8000, Math.floor(revenue * 0.25)), 500);
			const netProfit = revenue - transportCost;

			const svgPath = saveSvgAsset(
				`5ap_t3_integ_s${seed}_${difficulty}`,
				svgRectangle({
					lengthLabel: `${len} m`,
					widthLabel: `${wid} m`,
					shapeLabel: `بستان ${crop.name}`,
					vertices: ['A', 'B', 'C', 'D']
				})
			);

			const distractors = [
				{
					text: `${revenue} دج`,
					diagnosticFeedback:
						'هذا هو ثمن بيع الصناديق الإجمالي، لكنك نسيت طرح مصاريف النقل والعاملين!'
				},
				{
					text: `${boxes * boxPrice - transportCost} دج`,
					diagnosticFeedback:
						`انتبه! الفلاح باع ${pctSold}% فقط من الصناديق وليس كل المحصول.`
				},
				{
					text: `${Math.max(500, Math.round(netProfit / 10))} دج`,
					diagnosticFeedback:
						'تحقق من تحويل القنطار إلى الكيلوغرام (1 q = 100 kg) قبل حساب عدد الصناديق.'
				}
			];
			const mcq = buildUniqueMcqOptions(`${netProfit} دج`, distractors, rng);

			const scenarioAr =
				`يمتلك فلاح في ${crop.place} بستانا مستطيل الشكل طوله $${len}\\text{ m}$ وعرضه $${wid}\\text{ m}$. جنى منه محصولا من ${crop.name} كتلته $${quintals}\\text{ q}$، فوضعه في صناديق يسع كل صندوق $${boxCap}\\text{ kg}$. باع الفلاح $${pctSold}\\%$ من الصناديق بسعر $${boxPrice}$ دج للصندوق الواحد، ودفع مصاريف النقل والعمال بقيمة $${transportCost}$ دج.\n\n` +
				`1) احسب مساحة هذا البستان.\n2) احسب عدد الصناديق المعبّأة ثم عدد الصناديق المباعة.\n3) ما هو **صافي المبلغ المتبقي** لدى الفلاح بعد دفع المصاريف؟`;

			const typstContext =
				`يمتلك فلاح في ${crop.place} بستانا مستطيل الشكل طوله ${ltr(`${len} m`)} وعرضه ${ltr(`${wid} m`)}. جنى منه محصولا من ${crop.name} كتلته ${ltr(`${quintals} q`)}، ووضعه في صناديق يسع كل صندوق ${ltr(`${boxCap} kg`)}. باع $${pctSold}%$ من الصناديق بسعر $${boxPrice}$ دج للصندوق، ودفع $${transportCost}$ دج كمصاريف للنقل والعمال.`;

			return {
				templateId: this.id,
				seed,
				grade: '5ap',
				trimesterId: 't3',
				difficulty,
				domain: 'integration',
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: scenarioAr,
					questionTextAr: scenarioAr,
					imageUrl: svgPath,
					imageCaption: `مخطط بستان ${crop.name}`,
					questionData: mcq,
					explanation: `1) المساحة: ${len}×${wid}=${area} m². 2) الكتلة: ${quintals}×100=${harvestKg} kg، الصناديق: ${harvestKg}÷${boxCap}=${boxes} صندوقا، المباع: (${boxes}×${pctSold})÷100=${soldBoxes}. 3) المدخول: ${soldBoxes}×${boxPrice}=${revenue} دج، الصافي: ${revenue}-${transportCost}=${netProfit} دج.`
				},
				sujetExercise: {
					customTitle: 'الوضعية الإدماجية (تقييم المكتسبات)',
					points: 4,
					instruction: 'اقرأ السندات بعناية ثم أجب عن المطالب الثلاثة مع وضع العمليات العمودية والتعبير عن الوحدة:',
					content: [
						{
							type: 'columns',
							widths: ['2fr', '1fr'],
							children: [
								{ type: 'text', content: typstContext },
								{ type: 'image', src: svgPath, caption: `مخطط البستان` }
							]
						},
						{
							type: 'table',
							headerBackground: true,
							align: 'center',
							borders: 'grid',
							headers: ['المحصول الكلي', 'سعة الصندوق', 'نسبة المبيعات', 'سعر الصندوق', 'المصاريف'],
							cells: [
								ltr(`${quintals} q`),
								ltr(`${boxCap} kg`),
								`${pctSold}%`,
								`${boxPrice} دج`,
								`${transportCost} دج`
							]
						},
						{
							type: 'text',
							content: '1) احسب مساحة هذا البستان بالمتر المربع.',
							answer: `1) مساحة البستان: $${len} times ${wid} = ${area}$ ${ltr('m²')}`,
							mark: '1.25'
						},
						{
							type: 'text',
							content: '2) حوّل كتلة المحصول إلى الكيلوغرام، ثم احسب عدد كل الصناديق وعدد الصناديق المباعة.',
							answer: `2) التحويل: ${ltr(`${quintals} q = ${harvestKg} kg`)}.\n\nعدد الصناديق: $${harvestKg} div ${boxCap} = ${boxes}$ صندوقا.\n\nالصناديق المباعة: $(${boxes} times ${pctSold}) div 100 = ${soldBoxes}$ صندوقا.`,
							mark: '1.25'
						},
						{
							type: 'text',
							content: '3) احسب ثمن بيع الصناديق، ثم استنتج صافي المبلغ المتبقي لدى الفلاح بعد طرح المصاريف.',
							answer: `3) ثمن البيع: $${soldBoxes} times ${boxPrice} = ${revenue}$ دج.\n\nصافي المبلغ المتبقي: $${revenue} - ${transportCost} = ${netProfit}$ دج.`,
							mark: '1.5'
						}
					]
				},
				hints: [
					`المطلب 1 مستقل: مساحة المستطيل = الطول × العرض (${len} × ${wid}).`,
					`المطلب 2: حوّل ${quintals} q إلى kg (بالضرب في 100)، ثم اقسم على ${boxCap} لتجد عدد الصناديق، واحسب ${pctSold}% منها.`,
					`المطلب 3: اضرب عدد الصناديق المباعة في ${boxPrice} دج، ثم اطرح المصاريف (${transportCost} دج).`
				],
				solutionStepsAr: [
					`1) مساحة البستان: ${len} × ${wid} = ${area} m².`,
					`2) كتلة المحصول بالكيلوغرام: ${quintals} × 100 = ${harvestKg} kg.`,
					`عدد الصناديق المعبأة: ${harvestKg} ÷ ${boxCap} = ${boxes} صندوقا.`,
					`عدد الصناديق المباعة: (${boxes} × ${pctSold}) ÷ 100 = ${soldBoxes} صندوقا.`,
					`3) ثمن البيع: ${soldBoxes} × ${boxPrice} = ${revenue} دج.`,
					`صافي المبلغ المتبقي: ${revenue} - ${transportCost} = ${netProfit} دج.`
				],
				finalAnswer: `${netProfit} دج`
			};
		}

		if (theme === 1) {
			// Trade (التجارة — مكتبة مدرسية)
			const nbQty = difficulty === 'easy' ? rng.int(20, 40) : rng.int(40, 80);
			const nbPrice = rng.pick([60, 80, 100, 120]);
			const bookQty = difficulty === 'easy' ? rng.int(10, 20) : rng.int(15, 35);
			const bookPrice = rng.pick([200, 250, 300]);
			const totalPurchase = nbQty * nbPrice + bookQty * bookPrice;

			const discountPct = difficulty === 'easy' ? 10 : rng.pick([10, 20, 25]);
			const discountAmount = Math.round((totalPurchase * discountPct) / 100);
			const paidWholesale = totalPurchase - discountAmount;

			// Retail selling: sell notebooks at nbSellPrice and books at bookSellPrice
			const nbSellPrice = nbPrice + rng.pick([20, 30, 40]);
			const bookSellPrice = bookPrice + rng.pick([50, 80, 100]);
			const totalSell = nbQty * nbSellPrice + bookQty * bookSellPrice;
			const profit = totalSell - paidWholesale;

			const distractors = [
				{
					text: `${totalSell - totalPurchase} دج`,
					diagnosticFeedback:
						`أحسنت حساب ثمن البيع الإجمالي، لكنك نسيت أن التاجر استفاد من تخفيض ${discountPct}% عند الشراء!`
				},
				{
					text: `${totalSell} دج`,
					diagnosticFeedback:
						'هذا هو ثمن البيع الإجمالي وليس الفائدة (الربح)؛ اطرح منه ثمن الشراء بعد التخفيض.'
				},
				{
					text: `${paidWholesale} دج`,
					diagnosticFeedback:
						'هذا هو ثمن الشراء بعد التخفيض؛ احسب ثمن البيع ثم اطرح منه ثمن الشراء لتجد الفائدة.'
				}
			];
			const mcq = buildUniqueMcqOptions(`${profit} دج`, distractors, rng);

			const scenarioAr =
				`اشترى صاحب مكتبة مدرسية استعدادا للدخول المدرسي $${nbQty}$ كراسا بسعر $${nbPrice}$ دج للكراس الواحد، و $${bookQty}$ كتابا تعليميا بسعر $${bookPrice}$ دج للكتاب الواحد.\n` +
				`بسبب الكمية الكبيرة، منحه الموزّع تخفيضا بنسبة $${discountPct}\\%$ على المبلغ الإجمالي للشراء. باع الكتبي بعدها كل الكراريس بسعر $${nbSellPrice}$ دج للواحد وكل الكتب بسعر $${bookSellPrice}$ دج للواحد.\n\n` +
				`1) احسب المبلغ الإجمالي قبل التخفيض.\n2) احسب قيمة التخفيض ثم المبلغ الذي دفعه صاحب المكتبة.\n3) ما هي **الفائدة الصافية (الربح)** التي حققها صاحب المكتبة؟`;

			const typstIntro = `اشترى صاحب مكتبة مدرسية $${nbQty}$ كراسا بسعر $${nbPrice}$ دج للكراس، و $${bookQty}$ كتابا بسعر $${bookPrice}$ دج للكتاب. استفاد من تخفيض بنسبة ${discountPct}% على المبلغ الإجمالي للشراء، ثم باع كل الكراريس بسعر $${nbSellPrice}$ دج للواحد وكل الكتب بسعر $${bookSellPrice}$ دج للواحد.`;

			return {
				templateId: this.id,
				seed,
				grade: '5ap',
				trimesterId: 't3',
				difficulty,
				domain: 'integration',
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: scenarioAr,
					questionTextAr: scenarioAr,
					questionData: mcq,
					explanation: `1) الشراء قبل التخفيض: ${nbQty}×${nbPrice}+${bookQty}×${bookPrice}=${totalPurchase} دج. 2) التخفيض: ${discountAmount} دج، المدفوع: ${paidWholesale} دج. 3) البيع: ${totalSell} دج، الربح: ${totalSell}-${paidWholesale}=${profit} دج.`
				},
				sujetExercise: {
					customTitle: 'الوضعية الإدماجية (تقييم المكتسبات)',
					points: 4,
					instruction: 'اعتمد على الجدول والسند للإجابة عن المطالب الثلاثة بوضوح:',
					content: [
						{ type: 'text', content: typstIntro },
						{
							type: 'table',
							headerBackground: true,
							align: 'center',
							borders: 'grid',
							headers: ['السلعة', 'الكمية', 'سعر الشراء للوحدة', 'سعر البيع للوحدة'],
							cells: [],
							rows: [
								['الكراريس', `$${nbQty}$`, `$${nbPrice}$ دج`, `$${nbSellPrice}$ دج`],
								['الكتب التعليمية', `$${bookQty}$`, `$${bookPrice}$ دج`, `$${bookSellPrice}$ دج`]
							]
						},
						{
							type: 'text',
							content: '1) احسب ثمن شراء الكراريس والكتب معاً قبل التخفيض.',
							answer: `1) ثمن الشراء قبل التخفيض: $(${nbQty} times ${nbPrice}) + (${bookQty} times ${bookPrice}) = ${nbQty * nbPrice} + ${bookQty * bookPrice} = ${totalPurchase}$ دج.`,
							mark: '1.25'
						},
						{
							type: 'text',
							content: `2) احسب قيمة التخفيض (${discountPct}%) ثم المبلغ الصافي الذي دفعه صاحب المكتبة.`,
							answer: `2) قيمة التخفيض: $(${totalPurchase} times ${discountPct}) div 100 = ${discountAmount}$ دج.\n\nالمبلغ المدفوع: $${totalPurchase} - ${discountAmount} = ${paidWholesale}$ دج.`,
							mark: '1.25'
						},
						{
							type: 'text',
							content: '3) احسب ثمن البيع الإجمالي، ثم استنتج الفائدة الصافية التي حققها صاحب المكتبة.',
							answer: `3) ثمن البيع: $(${nbQty} times ${nbSellPrice}) + (${bookQty} times ${bookSellPrice}) = ${totalSell}$ دج.\n\nالفائدة الصافية: $${totalSell} - ${paidWholesale} = ${profit}$ دج.`,
							mark: '1.5'
						}
					]
				},
				hints: [
					`المطلب 1 مستقل: احسب ثمن الكراريس ثم ثمن الكتب ثم اجمعهما.`,
					`المطلب 2: احسب ${discountPct}% من المجموع، ثم اطرحه لتجد ثمن الشراء المدفوع.`,
					`المطلب 3: احسب ثمن البيع الكلي، ثم اطرح منه ثمن الشراء المدفوع بعد التخفيض.`
				],
				solutionStepsAr: [
					`1) ثمن الكراريس: ${nbQty} × ${nbPrice} = ${nbQty * nbPrice} دج، وثمن الكتب: ${bookQty} × ${bookPrice} = ${bookQty * bookPrice} دج؛ المجموع = ${totalPurchase} دج.`,
					`2) التخفيض: (${totalPurchase} × ${discountPct}) ÷ 100 = ${discountAmount} دج.`,
					`المبلغ المدفوع: ${totalPurchase} - ${discountAmount} = ${paidWholesale} دج.`,
					`3) ثمن البيع: (${nbQty} × ${nbSellPrice}) + (${bookQty} × ${bookSellPrice}) = ${totalSell} دج.`,
					`الفائدة الصافية: ${totalSell} - ${paidWholesale} = ${profit} دج.`
				],
				finalAnswer: `${profit} دج`
			};
		}

		// Theme 2: School / Family Trip (الرحلة المدرسية)
		const destinations = ['آثار تيمقاد بباتنة', 'المدينة الأثرية بتيبازة', 'جسور قسنطينة المعلقة', 'متحف المجاهد بالجزائر'];
		const dest = rng.pick(destinations);
		const depH = rng.int(7, 8);
		const depM = rng.pick([15, 30, 45]);
		const speed = rng.pick([60, 80]);
		const travelHours = difficulty === 'easy' ? 2 : 1;
		const travelMins = difficulty === 'easy' ? 0 : 30;
		const totalTravelMins = travelHours * 60 + travelMins;
		const distanceKm = Math.round((speed * totalTravelMins) / 60);
		const arrTotalM = depM + travelMins;
		const arrH = depH + travelHours + Math.floor(arrTotalM / 60);
		const arrM = arrTotalM % 60;

		const pupils = rng.pick([30, 40, 50]);
		const ticketFull = rng.pick([200, 300, 400]);
		const ticketDiscountPct = rng.pick([25, 50]);
		const ticketReduced = Math.round(ticketFull * (1 - ticketDiscountPct / 100));
		const ticketsTotal = pupils * ticketReduced;
		const busCost = rng.pick([8000, 10000, 12000]);
		const subsidy = rng.pick([4000, 5000, 6000]);
		const totalTripCost = ticketsTotal + busCost;
		const remainingToShare = totalTripCost - subsidy;
		const perPupil = roundTo(remainingToShare / pupils, 2);

		const svgPath = saveSvgAsset(`5ap_t3_integ_s${seed}_${difficulty}`, svgAnalogClock(depH, depM));

		const distractors = [
			{
				text: `${fmtNum(roundTo(totalTripCost / pupils, 2))} دج`,
				diagnosticFeedback:
					'لقد نسيت طرح إعانة جمعية أولياء التلاميذ من التكلفة الإجمالية قبل القسمة!'
			},
			{
				text: `${fmtNum(roundTo((pupils * ticketFull + busCost - subsidy) / pupils, 2))} دج`,
				diagnosticFeedback:
					`انتبه! التلاميذ استفادوا من تخفيض بنسبة ${ticketDiscountPct}% على ثمن التذكرة.`
			},
			{
				text: `${remainingToShare} دج`,
				diagnosticFeedback:
					`هذا هو المبلغ الكلي على عاتق التلاميذ؛ اقسمه على ${pupils} لإيجاد مساهمة التلميذ الواحد.`
			}
		];
		const mcq = buildUniqueMcqOptions(`${fmtNum(perPupil)} دج`, distractors, rng);

		const scenarioAr =
			`نظّمت مدرسة رحلة إلى **${dest}** لفائدة $${pupils}$ تلميذا. انطلقت الحافلة على الساعة $${fmtClock(depH, depM)}$ بسرعة منتظمة قدرها $${speed}\\text{ km/h}$، ووصلت على الساعة $${fmtClock(arrH, arrM)}$.\n` +
			`بلغ كراء الحافلة $${busCost}$ دج، وثمن تذكرة الدخول للفرد $${ticketFull}$ دج مع تخفيض للتلاميذ بنسبة $${ticketDiscountPct}\\%$. ساهمت جمعية أولياء التلاميذ بمبلغ $${subsidy}$ دج، ووُزّع الباقي بالتساوي على التلاميذ.\n\n` +
			`1) احسب مدة السير ثم المسافة المقطوعة بين المدرسة و${dest}.\n2) احسب ثمن التذكرة بعد التخفيض ثم التكلفة الإجمالية للرحلة (الحافلة + التذاكر).\n3) ما هي **مساهمة التلميذ الواحد** بالدينار؟`;

		const typstIntro = `نظمت مدرسة رحلة لفائدة $${pupils}$ تلميذا إلى ${dest}. انطلقت الحافلة على الساعة ${ltr(fmtClock(depH, depM))} (كما توضح الساعة المقابلة) بسرعة منتظمة قدرها ${ltr(`${speed} km/h`)}، ووصلت على الساعة ${ltr(fmtClock(arrH, arrM))}.`;

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't3',
			difficulty,
			domain: 'integration',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: scenarioAr,
				questionTextAr: scenarioAr,
				imageUrl: svgPath,
				imageCaption: `ساعة الانطلاق: ${fmtClock(depH, depM)}`,
				questionData: mcq,
				explanation: `1) المدة: ${fmtDuration(travelHours, travelMins)}، المسافة: ${distanceKm} km. 2) التذكرة بعد التخفيض: ${ticketReduced} دج، التذاكر: ${ticketsTotal} دج، التكلفة: ${totalTripCost} دج. 3) بعد طرح الإعانة (${subsidy} دج) يبقى ${remainingToShare} دج؛ حصة التلميذ: ${remainingToShare} ÷ ${pupils} = ${fmtNum(perPupil)} دج.`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية (تقييم المكتسبات)',
				points: 4,
				instruction: 'استعن بالساعة والجدول للإجابة عن المطالب الثلاثة بكتابة العمليات والوحدات:',
				content: [
					{
						type: 'columns',
						widths: ['2fr', '1fr'],
						children: [
							{ type: 'text', content: typstIntro },
							{ type: 'image', src: svgPath, caption: ltr(fmtClock(depH, depM)) }
						]
					},
					{
						type: 'table',
						headerBackground: true,
						align: 'center',
						borders: 'grid',
						headers: ['كراء الحافلة', 'سعر التذكرة', 'تخفيض التلاميذ', 'إعانة الجمعية', 'عدد التلاميذ'],
						cells: [
							`${busCost} دج`,
							`${ticketFull} دج`,
							`${ticketDiscountPct}%`,
							`${subsidy} دج`,
							`$${pupils}$`
						]
					},
					{
						type: 'text',
						content: `1) احسب مدة السير، ثم استنتج المسافة المقطوعة بين المدرسة و${dest}.`,
						answer: `1) المدة: ${ltr(`${fmtClock(arrH, arrM)} - ${fmtClock(depH, depM)} = ${fmtDuration(travelHours, travelMins)}`)} (${ltr(`${totalTravelMins} min`)}).\n\nالمسافة: ${ltr(`${speed} km`)} في ${ltr('60 min')}، إذن المسافة في ${ltr(`${totalTravelMins} min`)} هي ${ltr(`${distanceKm} km`)}.`,
						mark: '1.25'
					},
					{
						type: 'text',
						content: '2) احسب سعر التذكرة بعد التخفيض، ثم التكلفة الإجمالية للرحلة (كراء الحافلة + التذاكر).',
						answer: `2) قيمة التخفيض: $(${ticketFull} times ${ticketDiscountPct}) div 100 = ${ticketFull - ticketReduced}$ دج، وسعر التذكرة المخفض: $${ticketReduced}$ دج.\n\nثمن التذاكر: $${pupils} times ${ticketReduced} = ${ticketsTotal}$ دج، والتكلفة الإجمالية: $${ticketsTotal} + ${busCost} = ${totalTripCost}$ دج.`,
						mark: '1.25'
					},
					{
						type: 'text',
						content: '3) اطرح إعانة الجمعية من التكلفة الإجمالية، ثم احسب مساهمة التلميذ الواحد.',
						answer: `3) المبلغ المتبقي: $${totalTripCost} - ${subsidy} = ${remainingToShare}$ دج.\n\nمساهمة التلميذ الواحد: $${remainingToShare} div ${pupils} = ${fmtNum(perPupil)}$ دج.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				`المطلب 1 مستقل: المدة = وقت الوصول − وقت الانطلاق، ثم استعمل التناسبية مع السرعة ${speed} km/h.`,
				`المطلب 2: احسب تخفيض ${ticketDiscountPct}% على ${ticketFull} دج، ثم اضرب السعر الجديد في ${pupils} وأضف كراء الحافلة.`,
				`المطلب 3: اطرح الإعانة (${subsidy} دج) من التكلفة الإجمالية، ثم اقسم الباقي على ${pupils}.`
			],
			solutionStepsAr: [
				`1) مدة السير: ${fmtClock(arrH, arrM)} - ${fmtClock(depH, depM)} = ${fmtDuration(travelHours, travelMins)}؛ المسافة: ${distanceKm} km.`,
				`2) سعر التذكرة بعد التخفيض: ${ticketFull} - ${ticketFull - ticketReduced} = ${ticketReduced} دج.`,
				`ثمن كل التذاكر: ${pupils} × ${ticketReduced} = ${ticketsTotal} دج؛ التكلفة الإجمالية: ${ticketsTotal} + ${busCost} = ${totalTripCost} دج.`,
				`3) المبلغ بعد خصم الإعانة: ${totalTripCost} - ${subsidy} = ${remainingToShare} دج.`,
				`مساهمة التلميذ الواحد: ${remainingToShare} ÷ ${pupils} = ${fmtNum(perPupil)} دج.`
			],
			finalAnswer: `${fmtNum(perPupil)} دج`
		};
	}
};

export const TEMPLATES_5AP_T3: ParameterizedTemplate[] = [
	tplExactDecimalQuotient,
	tplProportionalityPctScaleSpeed,
	tplConversionsMatrix,
	tplTimeDurations,
	tplGeometryQuadCircleSolids,
	tplIntegrationCinq
];
