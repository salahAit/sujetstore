import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate } from '../../types';
import { buildIllustratedFigureBlock } from '../../../VisualAssets/illustrations-registry';
import { buildUniqueMcqOptions, SeededRng } from '../../rng';
import { saveSvgAsset, svgBarChart, svgGridPoints } from '../../svg-helpers';

interface StudentPerson {
	name: string;
	isFemale: boolean;
}

const STUDENTS: readonly StudentPerson[] = [
	{ name: 'أمين', isFemale: false },
	{ name: 'سلمى', isFemale: true },
	{ name: 'ياسين', isFemale: false },
	{ name: 'مريم', isFemale: true },
	{ name: 'آدم', isFemale: false },
	{ name: 'لينا', isFemale: true },
	{ name: 'نور', isFemale: true },
	{ name: 'إلياس', isFemale: false }
];

function pickDistinctNumbers(
	correct: number,
	candidates: { val: number; feedback: string }[],
	minVal: number,
	maxVal: number
): { val: number; feedback: string }[] {
	const seen = new Set<number>([correct]);
	const out: { val: number; feedback: string }[] = [];
	for (const c of candidates) {
		const v = Math.trunc(c.val);
		if (v >= minVal && v <= maxVal && !seen.has(v)) {
			seen.add(v);
			out.push({ val: v, feedback: c.feedback });
		}
		if (out.length === 3) break;
	}
	let delta = 10;
	while (out.length < 3) {
		for (const candidate of [correct + delta, correct - delta, correct + delta / 2, correct - delta / 2]) {
			const v = Math.trunc(candidate);
			if (v >= minVal && v <= maxVal && !seen.has(v)) {
				seen.add(v);
				out.push({ val: v, feedback: 'راجع خطوات الحساب العمودي وتأكد من النتيجة.' });
				if (out.length === 3) break;
			}
		}
		delta += 10;
	}
	return out;
}

/**
 * 1. Subtraction with borrowing (< 1000) — الطرح بالاستعارة لأعداد أصغر من 1000
 */
const subtractionBorrowTemplate: ParameterizedTemplate = {
	id: '2ap_t3_subtraction_borrow',
	grade: '2ap',
	trimesterId: 't3',
	domain: 'numeric',
	titleAr: 'الطرح بالاستعارة لأعداد أصغر من 1000',
	curriculumLessonId: 'lesson_2ap_t3_subtraction_with_borrow',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 97 + (difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3));

		let a = 0;
		let b = 0;

		if (difficulty === 'easy') {
			// 2-digit subtraction with 1 unit borrow: uA < uB and tA > tB
			const tA = rng.int(4, 9);
			const tB = rng.int(1, tA - 2);
			const uA = rng.int(0, 6);
			const uB = rng.int(uA + 1, 9);
			a = tA * 10 + uA;
			b = tB * 10 + uB;
		} else if (difficulty === 'medium') {
			// 3-digit subtraction with 1 borrow (either units or tens)
			const borrowUnits = seed % 2 === 0;
			const hA = rng.int(3, 9);
			const hB = rng.int(1, hA - 1);
			if (borrowUnits) {
				const tA = rng.int(2, 9);
				const tB = rng.int(1, tA - 1);
				const uA = rng.int(0, 6);
				const uB = rng.int(uA + 1, 9);
				a = hA * 100 + tA * 10 + uA;
				b = hB * 100 + tB * 10 + uB;
			} else {
				const tA = rng.int(0, 6);
				const tB = rng.int(tA + 1, 9);
				const uA = rng.int(2, 9);
				const uB = rng.int(0, uA);
				a = hA * 100 + tA * 10 + uA;
				b = hB * 100 + tB * 10 + uB;
			}
		} else {
			// hard: 3-digit subtraction with 2 borrows (units and tens, including zeros in tens)
			const hA = rng.int(4, 9);
			const hB = rng.int(1, hA - 2);
			const tA = seed % 3 === 0 ? 0 : rng.int(1, 5);
			const tB = rng.int(Math.max(1, tA), 8);
			const uA = rng.int(0, 6);
			const uB = rng.int(uA + 1, 9);
			a = hA * 100 + tA * 10 + uA;
			b = hB * 100 + tB * 10 + uB;
		}

		const ans = a - b;
		const hA = Math.floor(a / 100);
		const tA = Math.floor((a % 100) / 10);
		const uA = a % 10;
		const hB = Math.floor(b / 100);
		const tB = Math.floor((b % 100) / 10);
		const uB = b % 10;

		const revCols = 100 * Math.abs(hA - hB) + 10 * Math.abs(tA - tB) + Math.abs(uA - uB);
		const forgotTensReturn = ans + 10;
		const forgotHundredsReturn = ans + 100;
		const borrowOffByTen = ans >= 20 ? ans - 10 : ans + 20;

		const candidateDistractors: { val: number; feedback: string }[] = [
			{
				val: revCols,
				feedback:
					'طرحت الرقم الأصغر من الرقم الأكبر في نفس العمود بدل الاستعارة! تذكر أن نستعير عشرة أو مئة عندما يكون الرقم العلوي أصغر.'
			},
			{
				val: forgotTensReturn,
				feedback:
					'استعرت للوحدات لكنك نسيت إنقاص 1 من العشرات (أو إرجاع العشرة المستعارة إلى المطروح).'
			},
			{
				val: forgotHundredsReturn,
				feedback: 'تأكد من عمود المئات: بعد الاستعارة من المئات، ينقص رقم المئات بمقدار 1.'
			},
			{
				val: borrowOffByTen,
				feedback: 'أخطأت في حساب رقم العشرات بعد عملية الاستعارة.'
			}
		];

		const chosen = pickDistinctNumbers(ans, candidateDistractors, 1, 999);
		const mcq = buildUniqueMcqOptions(
			`$${ans}$`,
			chosen.map((d) => ({ text: `$${d.val}$`, diagnosticFeedback: d.feedback })),
			rng
		);

		const questionText = `احسب نتيجة الطرح بالاستعارة: $${a} - ${b}$`;

		return {
			templateId: this.id,
			seed,
			grade: this.grade,
			trimesterId: this.trimesterId,
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: null,
				imageCaption: null,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نضع العملية عمودياً: نبدأ بالوحدات، وإذا كان رقم المطروح منه أصغر نستعير من المرتبة المجاورة، ثم نتحقق بالجمع: ${ans} + ${b} = ${a}.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'ضع وأنجز عملية الطرح العمودية التالية، ثم تحقق من صحة النتيجة بالجمع:',
				content: [
					{
						type: 'text',
						content: `أحسب الفرق: $${a} - ${b} = "..........."$`,
						answer: `الفرق هو: $${a} - ${b} = ${ans}$`,
						mark: '1'
					},
					{
						type: 'text',
						content: `التحقق بالجمع: $"..........." + ${b} = ${a}$`,
						answer: `التحقق: $${ans} + ${b} = ${a}$`,
						mark: '0.5'
					}
				]
			},
			hints: [
				'ضع الوحدات تحت الوحدات، والعشرات تحت العشرات، والمئات تحت المئات.',
				'عندما يكون الرقم في الأعلى أصغر من الرقم في الأسفل، استعر 10 من المرتبة المجاورة ولا تنس إرجاعها.',
				`يمكنك التحقق من نتيجتك بجمعها مع ${b} لتجد ${a}.`
			],
			solutionStepsAr: [
				`نضع العدد الأكبر ${a} في الأعلى والعدد ${b} في الأسفل مع احترام المراتب.`,
				uA < uB
					? `في الوحدات: ${uA} أصغر من ${uB}، نستعير 10 فنحسب (${10 + uA} - ${uB} = ${10 + uA - uB}) ونُرجع 1 إلى عشرات المطروح.`
					: `في الوحدات: ${uA} - ${uB} = ${uA - uB}.`,
				`نُكمل طرح العشرات ثم المئات فنجد النتيجة ${ans}.`,
				`للتحقق بالجمع: ${ans} + ${b} = ${a}.`
			],
			finalAnswer: String(ans)
		};
	}
};

/**
 * 2. Multiplication tables (2, 3, 4, 5, 10) & repeated addition equivalence
 */
const multiplicationTablesTemplate: ParameterizedTemplate = {
	id: '2ap_t3_mult_tables_repeated_add',
	grade: '2ap',
	trimesterId: 't3',
	domain: 'numeric',
	titleAr: 'مفهوم الضرب والجمع المتكرر (جداول 2، 3، 4، 5، 10)',
	curriculumLessonId: 'lesson_2ap_t3_multiplication_intro_tables',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 131 + (difficulty === 'easy' ? 11 : difficulty === 'medium' ? 22 : 33));

		const tablePool =
			difficulty === 'easy'
				? ([2, 5, 10] as const)
				: difficulty === 'medium'
					? ([3, 4, 5] as const)
					: ([3, 4, 5, 10] as const);

		const m = rng.pick(tablePool);
		const k =
			difficulty === 'easy'
				? rng.int(2, 5)
				: difficulty === 'medium'
					? rng.int(3, 6)
					: rng.int(5, 8);
		const product = k * m;
		const sumStr = Array.from({ length: k }, () => String(m)).join(' + ');

		const askFactor = seed % 2 === 0;
		const expectedAnswer = askFactor ? k : product;

		const questionText = askFactor
			? `أكمل المساواة بكتابة العدد المناسب لربط الجمع المتكرر بالضرب: $${sumStr} = \\square \\times ${m}$`
			: `حوّل الجمع المتكرر إلى ضرب ثم احسب الناتج: $${sumStr} = ${k} \\times ${m} = \\square$`;

		const sentence = askFactor ? `${sumStr} = ___ × ${m}` : `${sumStr} = ${k} × ${m} = ___`;

		const otherTables = ([2, 3, 4, 5, 10] as const).filter((t) => t !== m);
		const m2 = rng.pick(otherTables);
		const k2 = rng.int(2, 5);
		const sumStr2 = Array.from({ length: k2 }, () => String(m2)).join(' + ');

		const m3 = rng.pick(otherTables.filter((t) => t !== m2));
		const k3 = rng.int(3, 6);
		const sumStr3 = Array.from({ length: k3 }, () => String(m3)).join(' + ');

		return {
			templateId: this.id,
			seed,
			grade: this.grade,
			trimesterId: this.trimesterId,
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'fill_blank',
				questionText,
				questionTextAr: questionText,
				imageUrl: null,
				imageCaption: null,
				questionData: {
					sentence,
					acceptedAnswers: [String(expectedAnswer)],
					answers: [String(expectedAnswer)]
				},
				explanation: `تكرر العدد ${m} في الجمع ${k} مرات، إذن ${sumStr} = ${k} × ${m} = ${product}.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'أكمل الجدول التالي بالربط بين الجمع المتكرر والكتابة الضربية والنتيجة:',
				content: [
					{
						type: 'table',
						headers: ['الجمع المتكرر', 'الكتابة الضربية', 'النتيجة'],
						cells: [],
						rows: [
							[
								`$${sumStr}$`,
								{ content: '............', answer: `$${k} times ${m}$`, mark: '0.25' },
								{ content: '............', answer: `$${product}$`, mark: '0.25' }
							],
							[
								{ content: '............', answer: `$${sumStr2}$`, mark: '0.25' },
								`$${k2} times ${m2}$`,
								{ content: '............', answer: `$${k2 * m2}$`, mark: '0.25' }
							],
							[
								`$${sumStr3}$`,
								{ content: '............', answer: `$${k3} times ${m3}$`, mark: '0.5' },
								`$${k3 * m3}$`
							]
						],
						align: 'center',
						borders: 'grid',
						headerBackground: true,
						width: 'full'
					}
				]
			},
			hints: [
				`عدّ كم مرة تكرر العدد ${m} في عملية الجمع.`,
				'عدد المرات يُكتب أولاً قبل علامة الضرب (×).',
				`احسب الناتج باستعمال جدول الضرب في ${m}: ${k} × ${m} = ${product}.`
			],
			solutionStepsAr: [
				`نلاحظ أن العدد ${m} تكرر ${k} مرات في الجمع المتكرر.`,
				`نكتب الكتابة الضربية الموافقة: ${k} × ${m}.`,
				`من جدول الضرب في ${m} نجد النتيجة: ${k} × ${m} = ${product}.`
			],
			finalAnswer: String(expectedAnswer)
		};
	}
};

/**
 * 3. Multiplying by 10 / tens & 2-digit × 1-digit (<= 5 so product < 1000)
 */
const multiplicationTens2DigitTemplate: ParameterizedTemplate = {
	id: '2ap_t3_mult_tens_2digit',
	grade: '2ap',
	trimesterId: 't3',
	domain: 'numeric',
	titleAr: 'الضرب في 10 ومضاعفاتها وضرب عدد ذي رقمين في رقم واحد',
	curriculumLessonId: 'lesson_2ap_t3_multiplication_tens_2digit',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 149 + (difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 15));

		let a = 12;
		let b = 10;
		let mode: 'by10' | 'byMult10' | 'twoDigitNoCarry' | 'twoDigitCarry' = 'by10';

		if (difficulty === 'easy') {
			a = rng.int(12, 89);
			b = 10;
			mode = 'by10';
		} else if (difficulty === 'medium') {
			if (seed % 2 === 0) {
				a = rng.int(2, 9) * 10;
				b = rng.pick([2, 3, 4, 5] as const);
				mode = 'byMult10';
			} else {
				b = rng.pick([2, 3] as const);
				const t = rng.int(1, b === 2 ? 4 : 3);
				const u = rng.int(1, b === 2 ? 4 : 3);
				a = t * 10 + u;
				mode = 'twoDigitNoCarry';
			}
		} else {
			b = rng.pick([2, 3, 4, 5] as const);
			const t = rng.int(2, 9);
			const minU = Math.ceil(10 / b);
			const u = rng.int(minU, 9);
			a = t * 10 + u;
			mode = 'twoDigitCarry';
		}

		const product = a * b;
		const tPart = Math.floor(a / 10) * 10;
		const uPart = a % 10;

		const questionText =
			mode === 'by10'
				? `احسب الجداء التالي: $${a} \\times 10$`
				: mode === 'byMult10'
					? `احسب الجداء التالي باستعمال الضرب في مضاعفات 10: $${a} \\times ${b}$`
					: `احسب الجداء التالي باستعمال التفكيك النموذجي للعدد $${a}$: $${a} \\times ${b}$`;

		const extraBy10 = rng.int(11, 79);

		const sujetContent: GeneratedExerciseInstance['sujetExercise']['content'] =
			mode === 'by10'
				? [
						{
							type: 'text',
							content: `احسب الجداء: $${a} times 10 = "..........."$`,
							answer: `الجداء هو: $${a} times 10 = ${product}$`,
							mark: '1'
						},
						{
							type: 'text',
							content: `أكمل بالعدد المناسب: $"..........." times 10 = ${extraBy10 * 10}$`,
							answer: `العدد المناسب هو: $${extraBy10} times 10 = ${extraBy10 * 10}$`,
							mark: '0.5'
						}
					]
				: mode === 'byMult10'
					? [
							{
								type: 'text',
								content: `احسب الجداء بكتابة خطوة الحساب: $${a} times ${b} = "..........."$`,
								answer: `النتيجة: $${a / 10} times ${b} = ${(a / 10) * b}$ ومنه $${a} times ${b} = ${product}$`,
								mark: '1.5'
							}
						]
					: [
							{
								type: 'text',
								content: `أكمل الحساب بالتفكيك النموذجي: $${a} times ${b} = (${tPart} + ${uPart}) times ${b} = "..........."$`,
								answer: `الحساب: $(${tPart} times ${b}) + (${uPart} times ${b}) = ${tPart * b} + ${uPart * b} = ${product}$`,
								mark: '1.5'
							}
						];

		const hints: [string, string, string] =
			mode === 'by10'
				? [
						'عند ضرب أي عدد طبيعي في 10 نحتفظ بأرقامه كما هي.',
						'نضيف صفراً واحداً (0) على يمين العدد.',
						`جرب كتابة ${a} ثم أضف صفراً على يمينه.`
					]
				: mode === 'byMult10'
					? [
							`اكتب ${a} على شكل ${a / 10} عشرات.`,
							`اضرب ${a / 10} في ${b} أولاً لتجد ${(a / 10) * b}.`,
							`أضف صفراً على يمين النتيجة ${(a / 10) * b} لتحصل على الجداء.`
						]
					: [
							`فكّك العدد ${a} إلى عشرات ووحدات: ${tPart} + ${uPart}.`,
							`اضرب كل جزء في ${b}: (${tPart} × ${b}) و (${uPart} × ${b}).`,
							`اجمع النتيجتين ${tPart * b} + ${uPart * b}.`
						];

		const solutionStepsAr =
			mode === 'by10'
				? [
						`لضرب العدد ${a} في 10 نحتفظ بأرقامه كما هي ثم نضيف صفراً واحداً (0) على يمينه: ${a} × 10 = ${product}.`,
						`وبالمثل في السؤال الثاني، نحذف صفراً من يمين ${extraBy10 * 10} لنجد العدد الناقص: ${extraBy10} × 10 = ${extraBy10 * 10}.`
					]
				: mode === 'byMult10'
					? [
							`نضرب رقم العشرات في ${b}: ${a / 10} × ${b} = ${(a / 10) * b}.`,
							`نضيف صفراً على اليمين لأن ${a} = ${a / 10} × 10، فنجد ${product}.`
						]
					: [
							`نفكك العدد إلى عشرات ووحدات: ${a} = ${tPart} + ${uPart}.`,
							`نوزع الضرب: ${tPart} × ${b} = ${tPart * b} و ${uPart} × ${b} = ${uPart * b}.`,
							`نجمع النتيجتين: ${tPart * b} + ${uPart * b} = ${product}.`
						];

		return {
			templateId: this.id,
			seed,
			grade: this.grade,
			trimesterId: this.trimesterId,
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText,
				questionTextAr: questionText,
				imageUrl: null,
				imageCaption: null,
				questionData: {
					answer: product,
					displayTemplate: `${a} × ${b} = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: solutionStepsAr.join(' ')
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'احسب الجداء التالي مستعملاً الطريقة المناسبة (الضرب في 10 أو التفكيك النموذجي):',
				content: sujetContent
			},
			hints,
			solutionStepsAr,
			finalAnswer: String(product)
		};
	}
};

/**
 * 4. Masses (kg, g) comparison & bar chart reading (using svgBarChart + saveSvgAsset)
 */
const massBarChartTemplate: ParameterizedTemplate = {
	id: '2ap_t3_mass_bar_chart',
	grade: '2ap',
	trimesterId: 't3',
	domain: 'measurement',
	titleAr: 'مقارنة وقياس الكتل وقراءة التمثيل البياني بالأعمدة',
	curriculumLessonId: 'lesson_2ap_t3_mass_and_bar_chart',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 173 + (difficulty === 'easy' ? 7 : difficulty === 'medium' ? 14 : 21));

		const labelPools = [
			['تفاح', 'برتقال', 'بطاطا', 'جزر'],
			['سكر', 'دقيق', 'زبدة', 'تمر'],
			['موز', 'عنب', 'خوخ', 'تين'],
			['أرز', 'عدس', 'سميد', 'حمص']
		] as const;
		const labels = rng.pick(labelPools);

		const unit: 'kg' | 'g' = difficulty === 'easy' ? 'kg' : 'g';
		const unitArLong = unit === 'kg' ? 'الكيلوغرام' : 'الغرام';
		const unitArShort = unit === 'kg' ? 'كلغ' : 'غ';

		const valuePool =
			difficulty === 'easy'
				? [3, 5, 7, 9, 11, 13, 15, 17]
				: difficulty === 'medium'
					? [100, 150, 200, 250, 300, 350, 400, 450]
					: [150, 200, 250, 300, 350, 400, 450, 500];

		const pickedVals = rng.pickDistinct(valuePool, 4);
		const bars = labels.map((label, i) => ({ label, value: pickedVals[i] }));
		const maxVal = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 500 : 600;

		const svgStr = svgBarChart(bars, maxVal);
		const svgPath = saveSvgAsset(`2ap_t3_mass_${difficulty}_s${seed}`, svgStr);

		const sorted = [...bars].sort((x, y) => x.value - y.value);
		const lightest = sorted[0];
		const heaviest = sorted[sorted.length - 1];
		const sumSmallestTwo = sorted[0].value + sorted[1].value;
		const diffMaxMin = heaviest.value - lightest.value;

		let questionText = '';
		let correctOptionText = '';
		let distractorSpecs: { text: string; diagnosticFeedback: string }[] = [];
		let explanation = '';
		let finalAns = '';

		if (difficulty === 'easy') {
			const askHeaviest = seed % 2 === 0;
			if (askHeaviest) {
				questionText = `يمثل المخطط بالأعمدة كتل بعض السلع بـ (${unit}). ما هي السلعة الأثقل كتلة؟`;
				correctOptionText = `${heaviest.label} ($${heaviest.value}$ ${unit})`;
				distractorSpecs = [
					{
						text: `${lightest.label} ($${lightest.value}$ ${unit})`,
						diagnosticFeedback: 'هذه السلعة لها أقصر عمود فهي الأخف كتلة وليست الأثقل.'
					},
					{
						text: `${sorted[1].label} ($${sorted[1].value}$ ${unit})`,
						diagnosticFeedback: 'قارن ارتفاعات الأعمدة جميعاً لاختيار العمود الأطول.'
					},
					{
						text: `${sorted[2].label} ($${sorted[2].value}$ ${unit})`,
						diagnosticFeedback: 'يوجد عمود آخر أطول من هذا العمود في التمثيل البياني.'
					}
				];
				explanation = `نبحث عن أطول عمود في التمثيل البياني: نجد أنه عمود ${heaviest.label} بكتلة ${heaviest.value} ${unit}.`;
				finalAns = `${heaviest.label} (${heaviest.value} ${unit})`;
			} else {
				const sumTwo = sorted[0].value + sorted[2].value;
				questionText = `يمثل المخطط بالأعمدة كتل سلع بـ (${unit}). ما مجموع كتلتَي ${sorted[0].label} و ${sorted[2].label}؟`;
				correctOptionText = `$${sumTwo}$ ${unit}`;
				const dVals = pickDistinctNumbers(
					sumTwo,
					[
						{ val: sorted[2].value - sorted[0].value, feedback: 'طرحت الكتلتين بدل جمعهما.' },
						{ val: sorted[0].value + sorted[1].value, feedback: 'تحقق من قراءة عمود السلعة الثانية بشكل صحيح.' },
						{ val: sumTwo + 2, feedback: 'أعد جمع الكتلتين بدقة من المخطط.' }
					],
					1,
					999
				);
				distractorSpecs = dVals.map((d) => ({ text: `$${d.val}$ ${unit}`, diagnosticFeedback: d.feedback }));
				explanation = `من المخطط: كتلة ${sorted[0].label} هي ${sorted[0].value} ${unit} وكتلة ${sorted[2].label} هي ${sorted[2].value} ${unit}، والمجموع ${sumTwo} ${unit}.`;
				finalAns = `${sumTwo} ${unit}`;
			}
		} else if (difficulty === 'medium') {
			questionText = `يمثل المخطط بالأعمدة كتل مواد غذائية بالغرام (g). ما مجموع كتلتَي ${sorted[0].label} و ${sorted[1].label} معاً؟`;
			correctOptionText = `$${sumSmallestTwo}$ g`;
			const dVals = pickDistinctNumbers(
				sumSmallestTwo,
				[
					{ val: sorted[1].value - sorted[0].value, feedback: 'طرحت الكتلتين بدل حساب مجموعهما.' },
					{ val: sorted[0].value + sorted[2].value, feedback: 'اخترت قيمة عمود آخر غير المطلوب في السؤال.' },
					{ val: sumSmallestTwo + 50, feedback: 'أعد جمع الكتلتين بدقة.' }
				],
				50,
				999
			);
			distractorSpecs = dVals.map((d) => ({ text: `$${d.val}$ g`, diagnosticFeedback: d.feedback }));
			explanation = `كتلة ${sorted[0].label} = ${sorted[0].value} g وكتلة ${sorted[1].label} = ${sorted[1].value} g، ومجموعهما ${sorted[0].value} + ${sorted[1].value} = ${sumSmallestTwo} g.`;
			finalAns = `${sumSmallestTwo} g`;
		} else {
			if (seed % 2 === 0) {
				questionText = `يمثل المخطط بالأعمدة كتل أربعة أكياس بالغرام (g). بكم تزيد كتلة ${heaviest.label} عن كتلة ${lightest.label}؟`;
				correctOptionText = `$${diffMaxMin}$ g`;
				const dVals = pickDistinctNumbers(
					diffMaxMin,
					[
						{ val: heaviest.value + lightest.value, feedback: 'جمعت الكتلتين بدل حساب الفرق بينهما.' },
						{ val: diffMaxMin + 50, feedback: 'تحقق من عملية الطرح بين أعلى وأقصر عمود.' },
						{ val: sorted[2].value - lightest.value, feedback: 'استعملت ثاني أكبر كتلة بدل أكبر كتلة.' }
					],
					50,
					999
				);
				distractorSpecs = dVals.map((d) => ({ text: `$${d.val}$ g`, diagnosticFeedback: d.feedback }));
				explanation = `أثقل كتلة هي ${heaviest.label} (${heaviest.value} g) وأخف كتلة هي ${lightest.label} (${lightest.value} g). الفرق: ${heaviest.value} - ${lightest.value} = ${diffMaxMin} g.`;
				finalAns = `${diffMaxMin} g`;
			} else {
				const targetMass = 950;
				const missing = targetMass - sumSmallestTwo;
				questionText = `يمثل المخطط كتل سلع بالغرام (g). كم غراماً ينقص مجموع كتلتَي ${sorted[0].label} و ${sorted[1].label} ليصل إلى $950$ g؟`;
				correctOptionText = `$${missing}$ g`;
				const dVals = pickDistinctNumbers(
					missing,
					[
						{ val: sumSmallestTwo, feedback: 'هذا هو مجموع الكتلتين فقط، والمطلوب هو الكمية الناقصة للوصول إلى 950 g.' },
						{ val: targetMass - sorted[0].value, feedback: 'طرحت كتلة واحدة فقط من 950 g بدل مجموع الكتلتين.' },
						{ val: missing + 100, feedback: 'انتبه للاستعارة عند طرح المجموع من 950.' }
					],
					50,
					999
				);
				distractorSpecs = dVals.map((d) => ({ text: `$${d.val}$ g`, diagnosticFeedback: d.feedback }));
				explanation = `مجموع الكتلتين: ${sorted[0].value} + ${sorted[1].value} = ${sumSmallestTwo} g. ينقصنا: 950 - ${sumSmallestTwo} = ${missing} g.`;
				finalAns = `${missing} g`;
			}
		}

		const mcq = buildUniqueMcqOptions(correctOptionText, distractorSpecs, rng);

		const comparePrompt =
			unit === 'g'
				? `3) أكمل باستعمال (أثقل من / أخف من): كتلة $1$ كلغ (kg) .............. كتلة ${heaviest.label} ($${heaviest.value}$ غ).`
				: `3) أكمل باستعمال (أثقل من / أخف من): كتلة ${heaviest.label} ($${heaviest.value}$ كلغ) .............. كتلة ${lightest.label} ($${lightest.value}$ كلغ).`;
		const compareAnswer =
			unit === 'g'
				? `كتلة $1$ كلغ أثقل من كتلة ${heaviest.label} ($${heaviest.value}$ غ).`
				: `كتلة ${heaviest.label} ($${heaviest.value}$ كلغ) أثقل من كتلة ${lightest.label} ($${lightest.value}$ كلغ).`;

		return {
			templateId: this.id,
			seed,
			grade: this.grade,
			trimesterId: this.trimesterId,
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: `التمثيل البياني للكتل بـ (${unit})`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `تأمّل التمثيل البياني بالأعمدة لكتل المشتريات (بوحدة ${unitArLong} ${unit}) ثم أجب:`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) ما هي السلعة الأثقل كتلة وما هي السلعة الأخف كتلة؟`,
								answer: `الأثقل: ${heaviest.label} ($${heaviest.value}$ ${unitArShort})، والأخف: ${lightest.label} ($${lightest.value}$ ${unitArShort}).`,
								mark: '0.5'
							},
							{
								type: 'image',
								src: svgPath,
								caption: `تمثيل بياني للكتل (${unit})`
							}
						]
					},
					{
						type: 'text',
						content: `2) احسب مجموع كتلتَي ${sorted[0].label} و ${sorted[1].label}: ..............`,
						answer: `المجموع هو $${sumSmallestTwo}$ ${unitArShort} لأن $${sorted[0].value} + ${sorted[1].value} = ${sumSmallestTwo}$.`,
						mark: '0.5'
					},
					{
						type: 'text',
						content: comparePrompt,
						answer: compareAnswer,
						mark: '0.5'
					},
					buildIllustratedFigureBlock('pri_math_04_two_pan_balance', {
						maxHeight: 112,
						width: '58%',
						mode: 'image_only',
						title: 'المِيزَانُ ذُو الكِفَّتَيْنِ لِقِيَاسِ وَمُقَارَنَةِ الكُتَلِ'
					})
				]
			},
			hints: [
				'اقرأ العدد المكتوب فوق كل عمود بدقة.',
				'العمود الأطول يمثل الكتلة الأثقل، والعمود الأقصر يمثل الكتلة الأخف.',
				'تأكد من اختيار العملية الصحيحة (الجمع للمجموع، والطرح للفرق أو الناقص).'
			],
			solutionStepsAr: [
				`نقرأ الكتل من التمثيل البياني: ${bars.map((b) => `${b.label} = ${b.value} ${unit}`).join('، ')}.`,
				`أثقل كتلة هي ${heaviest.label} (${heaviest.value} ${unit}) وأخف كتلة هي ${lightest.label} (${lightest.value} ${unit}).`,
				`النتيجة المطلوبة هي ${finalAns}.`
			],
			finalAnswer: finalAns
		};
	}
};

/**
 * 5. Symmetry / figure reproduction on المرصوفة & solids (المكعب ومتوازي المستطيلات)
 */
const gridSymmetryAndSolidsTemplate: ParameterizedTemplate = {
	id: '2ap_t3_grid_symmetry_solids',
	grade: '2ap',
	trimesterId: 't3',
	domain: 'geometry',
	titleAr: 'التناظر على المرصوفة والمجسمات (المكعب ومتوازي المستطيلات)',
	curriculumLessonId: 'lesson_2ap_t3_grid_enlargement_symmetry',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 197 + (difficulty === 'easy' ? 4 : difficulty === 'medium' ? 8 : 12));

		const cols = 6;
		const rows = difficulty === 'easy' ? 4 : 5;
		const colLabels = ['1', '2', '3', '4', '5', '6'];
		const rowLabels = ['A', 'B', 'C', 'D', 'E'].slice(0, rows);

		const isSymmetryQuiz = seed % 2 === 0;

		if (isSymmetryQuiz) {
			const targetColIdx = rng.int(0, 2);
			const targetRowIdx = rng.int(0, rows - 1);
			const symColIdx = cols - 1 - targetColIdx;

			const candidateLeftCells: { col: number; row: number }[] = [];
			for (let c = 0; c <= 2; c++) {
				for (let r = 0; r < rows; r++) {
					if (c !== targetColIdx || r !== targetRowIdx) {
						candidateLeftCells.push({ col: c, row: r });
					}
				}
			}
			const patternCount = difficulty === 'easy' ? 2 : 3;
			const patternCells = rng.pickDistinct(candidateLeftCells, patternCount);

			const shadedCells = [
				...patternCells.map((cell) => ({ col: cell.col, row: cell.row, color: '#93c5fd' })),
				{ col: targetColIdx, row: targetRowIdx, color: '#fb923c' }
			];

			const svgStr = svgGridPoints({
				cols,
				rows,
				colLabels,
				rowLabels,
				shadedCells,
				polygon: [
					{ col: 3, row: 0 },
					{ col: 3, row: rows }
				]
			});
			const svgPath = saveSvgAsset(`2ap_t3_sym_${difficulty}_s${seed}`, svgStr);

			const tCol = colLabels[targetColIdx];
			const tRow = rowLabels[targetRowIdx];
			const sCol = colLabels[symColIdx];
			const altRow = rowLabels[(targetRowIdx + 1) % rows];
			const adjCol = colLabels[symColIdx === 3 ? 4 : symColIdx - 1];

			const correctPos = `العمود ${sCol}، السطر ${tRow}`;
			const mcq = buildUniqueMcqOptions(
				correctPos,
				[
					{
						text: `العمود ${tCol}، السطر ${tRow}`,
						diagnosticFeedback: 'هذه هي الخانة الأصلية نفسها! المطلوب نظيرتها في الجهة المقابلة لمحور التناظر.'
					},
					{
						text: `العمود ${adjCol}، السطر ${tRow}`,
						diagnosticFeedback: 'احسب عدد الخانات التي تبعدها الخانة البرتقالية عن الخط الأزرق وعدّ نفس المسافة في الجهة اليمنى.'
					},
					{
						text: `العمود ${sCol}، السطر ${altRow}`,
						diagnosticFeedback: 'السطر لا يتغير عند التناظر بالنسبة لمحور عمودي!'
					}
				],
				rng
			);

			const questionText = `تأمّل المرصوفة والخط الأزرق (محور التناظر). ما هو موقع الخانة المناظرة للخانة البرتقالية الموجودة في (العمود ${tCol}، السطر ${tRow})؟`;

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText,
					questionTextAr: questionText,
					imageUrl: svgPath,
					imageCaption: 'المرصوفة ومحور التناظر العمودي',
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `الخانة البرتقالية تقع في السطر ${tRow} وتبعد عن محور التناظر بـ ${3 - targetColIdx} خانة نحو اليسار، إذن نظيرتها تقع في نفس السطر ${tRow} وتبعد بـ ${3 - targetColIdx} خانة نحو اليمين، أي في العمود ${sCol}.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'تأمّل المرصوفة ثم أجب عن السؤالين حول التناظر والمجسمات (المكعب والبلاطة القائمة):',
					content: [
						{
							type: 'columns',
							widths: ['1.15fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) حدّد موقع الخانة المناظرة للخانة البرتقالية (العمود ${tCol}، السطر ${tRow}) بالنسبة لمحور التناظر الأزرق: ..............`,
									answer: `الموقع المناظر هو: ${correctPos}`,
									mark: '0.5'
								},
								{
									type: 'image',
									src: svgPath,
									caption: 'المرصوفة ومحور التناظر'
								}
							]
						},
						buildIllustratedFigureBlock('pri_math_06_3d_geometric_solids', {
							maxHeight: 112,
							width: '58%',
							mode: 'image_only',
							title: '2) أَكْمِلْ جَدْوَلَ خَصَائِصِ المُجَسَّمَاتِ المَأْلُوفَةِ'
						}),
						{
							type: 'table',
							headers: ['المجسم', 'عدد الوجوه', 'عدد الأحرف', 'عدد الرؤوس', 'شكل الوجوه'],
							cells: [],
							rows: [
								[
									'المكعب',
									{ content: '........', answer: '$6$', mark: '0.25' },
									'$12$',
									{ content: '........', answer: '$8$', mark: '0.25' },
									'مربع'
								],
								[
									'متوازي المستطيلات',
									'$6$',
									{ content: '........', answer: '$12$', mark: '0.25' },
									'$8$',
									{ content: '........', answer: 'مستطيل', mark: '0.25' }
								]
							],
							align: 'center',
							borders: 'grid',
							headerBackground: true,
							width: 'full'
						}
					]
				},
				hints: [
					'عند التناظر حول محور عمودي، يبقى السطر (الحرف) نفسه ولا يتغير.',
					`عدّ كم خانة تفصل الخانة البرتقالية (العمود ${tCol}) عن الخط الأزرق.`,
					`انطلق من الخط الأزرق نحو اليمين بنفس عدد الخانات لتجد العمود ${sCol}.`
				],
				solutionStepsAr: [
					`الخانة البرتقالية تقع في العمود ${tCol} والسطر ${tRow}.`,
					`تبعد عن محور التناظر بمقدار ${3 - targetColIdx} خانة إلى اليسار.`,
					`إذن نظيرتها في نفس السطر ${tRow} وعلى مسافة ${3 - targetColIdx} خانة إلى اليمين في العمود ${sCol}.`,
					'وللمكعب ومتوازي المستطيلات: 6 وجوه و12 حرفاً و8 رؤوس.'
				],
				finalAnswer: correctPos
			};
		} else {
			const netVariant = seed % 4 === 1 ? 't_cross' : 'step_cross';
			const netCells =
				netVariant === 't_cross'
					? [
							{ col: 2, row: 0, color: '#a5f3fc' },
							{ col: 1, row: 1, color: '#93c5fd' },
							{ col: 2, row: 1, color: '#60a5fa' },
							{ col: 3, row: 1, color: '#93c5fd' },
							{ col: 4, row: 1, color: '#a5f3fc' },
							{ col: 2, row: 2, color: '#a5f3fc' }
						]
					: [
							{ col: 1, row: 0, color: '#a5f3fc' },
							{ col: 1, row: 1, color: '#93c5fd' },
							{ col: 2, row: 1, color: '#60a5fa' },
							{ col: 3, row: 1, color: '#93c5fd' },
							{ col: 4, row: 1, color: '#a5f3fc' },
							{ col: 3, row: 2, color: '#a5f3fc' }
						];

			const svgStr = svgGridPoints({
				cols: 6,
				rows: 4,
				colLabels,
				rowLabels: ['A', 'B', 'C', 'D'],
				shadedCells: netCells
			});
			const svgPath = saveSvgAsset(`2ap_t3_solid_${difficulty}_s${seed}`, svgStr);

			const solidName =
				difficulty === 'easy' ? 'المكعب' : rng.pick(['المكعب', 'متوازي المستطيلات (البلاطة القائمة)'] as const);
			const aspect = rng.pick(['faces', 'vertices', 'edges'] as const);

			let qPrompt = '';
			let correctVal = '$6$';
			let distractors: { text: string; diagnosticFeedback: string }[] = [];

			if (aspect === 'faces') {
				qPrompt = `يمثل الرسم على المرصوفة منشور مجسم المكعب. كم عدد وجوه ${solidName}؟`;
				correctVal = '$6$';
				distractors = [
					{ text: '$8$', diagnosticFeedback: 'العدد 8 هو عدد الرؤوس وليس عدد الوجوه!' },
					{ text: '$12$', diagnosticFeedback: 'العدد 12 هو عدد الأحرف وليس عدد الوجوه!' },
					{ text: '$4$', diagnosticFeedback: 'حسبت الوجوه الجانبية فقط ونسيت القاعدتين!' }
				];
			} else if (aspect === 'vertices') {
				qPrompt = `كم عدد رؤوس مجسم ${solidName}؟`;
				correctVal = '$8$';
				distractors = [
					{ text: '$6$', diagnosticFeedback: 'العدد 6 هو عدد الوجوه وليس عدد الرؤوس!' },
					{ text: '$12$', diagnosticFeedback: 'العدد 12 هو عدد الأحرف وليس عدد الرؤوس!' },
					{ text: '$4$', diagnosticFeedback: '4 رؤوس توجد في وجه واحد فقط، وللمجسم 4 رؤوس في الأعلى و4 في الأسفل.' }
				];
			} else {
				qPrompt = `كم عدد أحرف مجسم ${solidName}؟`;
				correctVal = '$12$';
				distractors = [
					{ text: '$6$', diagnosticFeedback: 'العدد 6 هو عدد الوجوه وليس عدد الأحرف!' },
					{ text: '$8$', diagnosticFeedback: 'العدد 8 هو عدد الرؤوس وليس عدد الأحرف!' },
					{ text: '$10$', diagnosticFeedback: 'تأكد من العد: 4 أحرف في القاعدة العلوية، 4 في السفلية، و4 عمودية.' }
				];
			}

			const mcq = buildUniqueMcqOptions(correctVal, distractors, rng);

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qPrompt,
					questionTextAr: qPrompt,
					imageUrl: svgPath,
					imageCaption: 'منشور المكعب على المرصوفة (6 وجوه مربعة)',
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'كل من المكعب ومتوازي المستطيلات (البلاطة القائمة) له 6 وجوه، و8 رؤوس، و12 حرفاً.'
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'لاحظ المنشور المرسوم على المرصوفة ثم أكمل ملء الجدول حول المجسمات (المكعب والبلاطة القائمة):',
					content: [
						{
							type: 'columns',
							widths: ['1.15fr', '1fr'],
							children: [
								{
									type: 'text',
									content: '1) ما اسم المجسم الذي يمثله هذا المنشور على المرصوفة؟ ..............',
									answer: 'المكعب (لأن وجوهه الستة كلها مربعات متقايسة).',
									mark: '0.5'
								},
								{
									type: 'image',
									src: svgPath,
									caption: 'منشور مجسم على المرصوفة'
								}
							]
						},
						buildIllustratedFigureBlock('pri_math_06_3d_geometric_solids', {
							maxHeight: 112,
							width: '58%',
							mode: 'image_only',
							title: '2) أَكْمِلْ جَدْوَلَ خَصَائِصِ المُجَسَّمَاتِ المَأْلُوفَةِ'
						}),
						{
							type: 'table',
							headers: ['المجسم', 'عدد الوجوه', 'عدد الأحرف', 'عدد الرؤوس', 'شكل الوجوه'],
							cells: [],
							rows: [
								[
									'المكعب',
									{ content: '........', answer: '$6$', mark: '0.25' },
									{ content: '........', answer: '$12$', mark: '0.25' },
									'$8$',
									'مربع'
								],
								[
									'متوازي المستطيلات',
									'$6$',
									'$12$',
									{ content: '........', answer: '$8$', mark: '0.25' },
									{ content: '........', answer: 'مستطيل', mark: '0.25' }
								]
							],
							align: 'center',
							borders: 'grid',
							headerBackground: true,
							width: 'full'
						}
					]
				},
				hints: [
					'عدّ المربعات الملونة في المنشور لتعرف عدد وجوه المكعب.',
					'الرؤوس هي النقاط التي تلتقي فيها الأحرف (4 في الأعلى و4 في الأسفل).',
					'الأحرف هي الأضلاع التي تصل بين الرؤوس (4 في الأعلى + 4 في الأسفل + 4 جانبية).'
				],
				solutionStepsAr: [
					'المكعب ومتوازي المستطيلات (البلاطة القائمة) يتشابهان في عدد الوجوه والرؤوس والأحرف.',
					'عدد الوجوه = 6 (نعدّ 6 مربعات في المنشور).',
					'عدد الرؤوس = 8، وعدد الأحرف = 12.',
					'الفرق بينهما هو شكل الوجوه: مربعات في المكعب، ومستطيلات في متوازي المستطيلات.'
				],
				finalAnswer: correctVal.replace(/\$/g, '')
			};
		}
	}
};

/**
 * 6. Multi-item purchase/change integration situation in DA (< 1000)
 */
const integrationPurchaseChangeTemplate: ParameterizedTemplate = {
	id: '2ap_t3_integration_purchase_change',
	grade: '2ap',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: الشراء والمضاعفة وإرجاع الباقي بالدينار الجزائري',
	curriculumLessonId: 'lesson_2ap_t3_integration',
	defaultPoints: 4,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 211 + (difficulty === 'easy' ? 9 : difficulty === 'medium' ? 18 : 27));
		const student = rng.pick(STUDENTS);
		const verbOwn = student.isFemale ? 'تملك' : 'يملك';
		const verbBuy = student.isFemale ? 'اشترت' : 'اشترى';

		const scenarios = [
			{
				context: 'بمناسبة التحضير لحفل نهاية السنة',
				unitItemSingular: 'علبة عصير',
				unitItemDual: 'علبتَي عصير',
				unitItemPlural: 'علب عصير',
				unitItemDefPlural: 'علب العصير',
				extraItem: 'كعكة صغيرة'
			},
			{
				context: student.isFemale ? 'عند ذهابها إلى المكتبة لشراء الأدوات' : 'عند ذهابه إلى المكتبة لشراء الأدوات',
				unitItemSingular: 'كراس رسم',
				unitItemDual: 'كراسَي رسم',
				unitItemPlural: 'كراريس رسم',
				unitItemDefPlural: 'كراريس الرسم',
				extraItem: 'مقلمة جميلة'
			},
			{
				context: 'أثناء التسوق في متجر الحي',
				unitItemSingular: 'علبة بسكويت',
				unitItemDual: 'علبتَي بسكويت',
				unitItemPlural: 'علب بسكويت',
				unitItemDefPlural: 'علب البسكويت',
				extraItem: 'قارورة ماء كبيرة'
			}
		] as const;

		const sc = rng.pick(scenarios);

		let qty = 3;
		let unitPrice = 30;
		let extraPrice = 120;
		let budget = 500;

		if (difficulty === 'easy') {
			qty = rng.pick([2, 3, 4, 5] as const);
			unitPrice = rng.pick([10, 20, 30, 40, 50] as const);
			extraPrice = rng.priceDA(60, 200, 10);
			const total = qty * unitPrice + extraPrice;
			const minBudget = Math.ceil((total + 40) / 50) * 50;
			budget = Math.min(950, Math.max(minBudget, rng.priceDA(minBudget, 850, 50)));
		} else if (difficulty === 'medium') {
			qty = rng.pick([3, 4, 5] as const);
			unitPrice = rng.pick([15, 25, 35, 45] as const);
			extraPrice = rng.priceDA(115, 285, 5);
			const total = qty * unitPrice + extraPrice;
			const baseH = Math.min(9, Math.ceil((total + 60) / 100));
			const candidateBudget = baseH * 100;
			budget = candidateBudget > total && candidateBudget <= 950 ? candidateBudget : Math.min(950, total + 85);
		} else {
			qty = rng.pick([3, 4, 5] as const);
			const t = rng.int(2, 5);
			const u = rng.pick([3, 4, 6, 7, 8] as const);
			unitPrice = t * 10 + u;
			extraPrice = rng.int(124, 298);
			const total = qty * unitPrice + extraPrice;
			const uTotal = total % 10;
			const uBudget = uTotal > 0 ? rng.int(0, uTotal - 1) : 0;
			const baseUpper = Math.ceil((total + 55) / 10) * 10;
			budget = Math.min(990, baseUpper) + uBudget;
			if (budget > 999) budget = 990 + Math.min(9, uBudget);
			if (budget <= total) budget = Math.min(999, total + 45);
		}

		const itemsCost = qty * unitPrice;
		const totalCost = itemsCost + extraPrice;
		const change = budget - totalCost;
		const qtyPhrase = qty === 2 ? sc.unitItemDual : `$${qty}$ ${sc.unitItemPlural}`;

		const questionText = `${sc.context}، ${verbOwn} ${student.name} مبلغ $${budget}$ دج (DA). ${verbBuy} ${qtyPhrase} بسعر $${unitPrice}$ دج للواحدة، و${sc.extraItem} بسعر $${extraPrice}$ دج. كم ديناراً بقي مع ${student.name}؟`;

		const forgotMultiply = budget - (unitPrice + extraPrice);
		const forgotExtra = budget - itemsCost;
		const dVals = pickDistinctNumbers(
			change,
			[
				{
					val: forgotMultiply,
					feedback: `نسيت ضرب سعر القطعة الواحدة (${unitPrice} DA) في عددها (${qty})!`
				},
				{
					val: forgotExtra,
					feedback: `نسيت إضافة ثمن ${sc.extraItem} (${extraPrice} DA) إلى المشتريات!`
				},
				{
					val: totalCost,
					feedback: `هذا هو المبلغ الإجمالي للمشتريات (${totalCost} DA)، والمطلوب هو المبلغ المتبقي مع ${student.name}.`
				},
				{
					val: change + 10,
					feedback: 'تحقق من عملية الطرح بالاستعارة عند حساب الباقي.'
				}
			],
			1,
			999
		);

		const mcq = buildUniqueMcqOptions(
			`$${change}$ DA`,
			dVals.map((d) => ({ text: `$${d.val}$ DA`, diagnosticFeedback: d.feedback })),
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: this.grade,
			trimesterId: this.trimesterId,
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: null,
				imageCaption: null,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `ثمن ${sc.unitItemDefPlural}: ${unitPrice} × ${qty} = ${itemsCost} DA. المجموع: ${itemsCost} + ${extraPrice} = ${totalCost} DA. الباقي: ${budget} - ${totalCost} = ${change} DA.`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: this.defaultPoints,
				instruction: `${sc.context}، ${verbOwn} ${student.name} مبلغ $${budget}$ دج (DA). ${verbBuy} ${qtyPhrase} بثمن $${unitPrice}$ دج للواحدة، و${sc.extraItem} بثمن $${extraPrice}$ دج.`,
				content: [
					{
						type: 'text',
						content: `1) احسب ثمن ${sc.unitItemDefPlural} ثم احسب المبلغ الإجمالي للمشتريات.`,
						answer: `ثمن ${sc.unitItemDefPlural}: $${unitPrice} times ${qty} = ${itemsCost}$ دج، والمجموع: $${itemsCost} + ${extraPrice} = ${totalCost}$ دج.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `2) كم ديناراً بقي مع ${student.name}؟`,
						answer: `الباقي مع ${student.name}: $${budget} - ${totalCost} = ${change}$ دج.`,
						mark: '2'
					}
				]
			},
			hints: [
				`ابدأ بحساب ثمن ${qty} ${sc.unitItemPlural} باستعمال الضرب: ${unitPrice} × ${qty}.`,
				`أضف ثمن ${sc.extraItem} (${extraPrice} DA) إلى النتيجة لتعرف المبلغ الإجمالي للمشتريات.`,
				`اطرح المبلغ الإجمالي للمشتريات من المبلغ الذي كان مع ${student.name} (${budget} DA).`
			],
			solutionStepsAr: [
				`ثمن ${sc.unitItemDefPlural}: ${unitPrice} × ${qty} = ${itemsCost} DA.`,
				`المبلغ الإجمالي للمشتريات: ${itemsCost} + ${extraPrice} = ${totalCost} DA.`,
				`المبلغ المتبقي مع ${student.name}: ${budget} - ${totalCost} = ${change} DA.`
			],
			finalAnswer: `${change} DA`
		};
	}
};

export const TEMPLATES_2AP_T3: ParameterizedTemplate[] = [
	subtractionBorrowTemplate,
	multiplicationTablesTemplate,
	multiplicationTens2DigitTemplate,
	massBarChartTemplate,
	gridSymmetryAndSolidsTemplate,
	integrationPurchaseChangeTemplate
];
