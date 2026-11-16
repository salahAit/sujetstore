import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate, QuizQuestionPayload } from '../../types';
import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, gcd, SeededRng, simplifyFraction } from '../../rng';
import { saveSvgAsset } from '../../svg-helpers';
import { svgCobwebSequencePlot, svgFunctionCurvePlot, svgSpace3DScene } from '../../svg-secondary';

// ═══════════════════════════════════════════════════════════════════════════════
// Pedagogical & Dual-Syntax Formatting Helpers (KaTeX vs Typst)
// Strictly Western digits 0-9; no Eastern Arabic-Indic numerals.
// ═══════════════════════════════════════════════════════════════════════════════

function fracKatex(n: number, d: number): string {
	if (d === 1) return `${n}`;
	if (d === -1) return `${-n}`;
	const [sn, sd] = simplifyFraction(n, d);
	if (sd === 1) return `${sn}`;
	return sn < 0 ? `-\\frac{${Math.abs(sn)}}{${sd}}` : `\\frac{${sn}}{${sd}}`;
}

function fracTypst(n: number, d: number): string {
	if (d === 1) return `${n}`;
	if (d === -1) return `${-n}`;
	const [sn, sd] = simplifyFraction(n, d);
	if (sd === 1) return `${sn}`;
	return sn < 0 ? `-frac(${Math.abs(sn)}, ${sd})` : `frac(${sn}, ${sd})`;
}

function linearKatex(a: number, b: number, varName = 'n'): string {
	let head = '';
	if (a === 1) head = varName;
	else if (a === -1) head = `-${varName}`;
	else if (a !== 0) head = `${a}${varName}`;

	if (head === '') return `${b}`;
	if (b === 0) return head;
	return b > 0 ? `${head} + ${b}` : `${head} - ${Math.abs(b)}`;
}

function linearTypst(a: number, b: number, varName = 'n'): string {
	let head = '';
	if (a === 1) head = varName;
	else if (a === -1) head = `-${varName}`;
	else if (a !== 0) head = `${a} ${varName}`;

	if (head === '') return `${b}`;
	if (b === 0) return head;
	return b > 0 ? `${head} + ${b}` : `${head} - ${Math.abs(b)}`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Numerical Sequences: Generation, Difference u_{n+1} - u_n, Monotonicity & Bounds
// ═══════════════════════════════════════════════════════════════════════════════

const tplSequencesMonotonicity: ParameterizedTemplate = {
	id: 'tpl_2as_shared_t3_sequences_monotonicity',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'numeric',
	titleAr: 'المتتاليات العددية: توليد متتالية، دراسة اتجاه التغير والمحدودية',
	curriculumLessonId: 'lesson_2as_se_t3_numerical_sequences_generation_monotonicity',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		interface Config1 {
			a: number;
			b: number;
			c: number;
		}

		let pool: Config1[];
		if (difficulty === 'easy') {
			pool = [
				{ a: 2, b: 1, c: 1 }, // Delta = 2(1)-1 = 1 > 0
				{ a: 3, b: 1, c: 2 }, // Delta = 3(2)-1 = 5 > 0
				{ a: 4, b: 2, c: 1 }, // Delta = 4(1)-2 = 2 > 0
				{ a: 2, b: 3, c: 1 }, // Delta = 2(1)-3 = -1 < 0
				{ a: 1, b: 4, c: 2 }, // Delta = 1(2)-4 = -2 < 0
				{ a: 3, b: 2, c: 1 }  // Delta = 3(1)-2 = 1 > 0
			];
		} else if (difficulty === 'medium') {
			pool = [
				{ a: 3, b: 2, c: 2 }, // Delta = 6-2 = 4 > 0
				{ a: 4, b: 1, c: 2 }, // Delta = 8-1 = 7 > 0
				{ a: 2, b: 5, c: 1 }, // Delta = 2-5 = -3 < 0
				{ a: 3, b: 7, c: 2 }, // Delta = 6-7 = -1 < 0
				{ a: 5, b: 2, c: 3 }, // Delta = 15-2 = 13 > 0
				{ a: 1, b: 6, c: 2 }, // Delta = 2-6 = -4 < 0
				{ a: 4, b: 5, c: 2 }  // Delta = 8-5 = 3 > 0
			];
		} else {
			pool = [
				{ a: 5, b: 3, c: 2 }, // Delta = 10-3 = 7 > 0
				{ a: 4, b: 9, c: 2 }, // Delta = 8-9 = -1 < 0
				{ a: 6, b: 1, c: 2 }, // Delta = 12-1 = 11 > 0
				{ a: 3, b: 11, c: 3 }, // Delta = 9-11 = -2 < 0
				{ a: 4, b: 3, c: 3 }, // Delta = 12-3 = 9 > 0
				{ a: 2, b: 9, c: 3 }, // Delta = 6-9 = -3 < 0
				{ a: 5, b: 4, c: 3 }  // Delta = 15-4 = 11 > 0
			];
		}

		const cfg = rng.pick(pool);
		const a = cfg.a;
		const b = cfg.b;
		const c = cfg.c;
		const delta = a * c - b;
		const isIncreasing = delta > 0;

		// Terms u_0, u_1, u_2
		const u0Num = b;
		const u0Den = c;
		const u1Num = a + b;
		const u1Den = 1 + c;
		const u2Num = 2 * a + b;
		const u2Den = 2 + c;

		const u0Katex = fracKatex(u0Num, u0Den);
		const u1Katex = fracKatex(u1Num, u1Den);
		const u2Katex = fracKatex(u2Num, u2Den);

		const u0Typst = fracTypst(u0Num, u0Den);
		const u1Typst = fracTypst(u1Num, u1Den);
		const u2Typst = fracTypst(u2Num, u2Den);

		const formulaKatex = `\\frac{${linearKatex(a, b)}}{n + ${c}}`;
		const formulaTypst = `frac(${linearTypst(a, b)}, n + ${c})`;

		const deltaSignTypst = delta > 0 ? '-' : '+';
		const absDelta = Math.abs(delta);

		// Monotonicity prose
		const monoAr = isIncreasing ? 'متزايدة تماماً' : 'متناقصة تماماً';
		const boundTypeAr = isIncreasing ? 'محدودة من الأعلى' : 'محدودة من الأسفل';
		const boundVal = a;

		// MCQ Quiz Question
		const correctText = `المتتالية ${monoAr} ومحدودة من الأعلى بالعدد $${isIncreasing ? boundVal : u0Katex}$ ومحدودة من الأسفل بالعدد $${isIncreasing ? u0Katex : boundVal}$`;
		const distractors = [
			{
				text: `المتتالية ${isIncreasing ? 'متناقصة تماماً' : 'متزايدة تماماً'} وغير محدودة`,
				diagnosticFeedback: 'راجع حساب إشارة الفرق $u_{n+1} - u_n$. إشارة البسط تحدد اتجاه التغير.'
			},
			{
				text: `المتتالية ${monoAr} ولكنها غير محدودة من أي جهة`,
				diagnosticFeedback: `المتتالية محدودة لأن $\\lim_{n \\to +\\infty} u_n = ${a}$، وقيمها محصورة بين $u_0$ و $${a}$.`
			},
			{
				text: `المتتالية ${isIncreasing ? 'متناقصة تماماً' : 'متزايدة تماماً'} ومحدودة بالعدد $0$ فقط`,
				diagnosticFeedback: 'تحقق من حساب الحدود الأولى وإشارة البسط في الفرق.'
			}
		];
		const mcq = buildUniqueMcqOptions(correctText, distractors, rng);

		const framingKatex = isIncreasing
			? `${u0Katex} \\le u_n < ${a}`
			: `${a} < u_n \\le ${u0Katex}`;
		const framingTypst = isIncreasing
			? `${u0Typst} <= u_n < ${a}`
			: `${a} < u_n <= ${u0Typst}`;

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `نعتبر المتتالية العددية $(u_n)_{n \\in \\mathbb{N}}$ المعرفة بعبارة حدها العام $u_n = ${formulaKatex}$.\nحدد اتجاه تغير المتتالية $(u_n)$ ومحدوديتها على $\\mathbb{N}$:`,
				questionTextAr: `حدد اتجاه تغير المتتالية ومحدوديتها:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices
				},
				explanation: `بحساب الفرق:\n$u_{n+1} - u_n = \\frac{${delta}}{(n + ${c + 1})(n + ${c})}$.\nبما أن المقام موجب قطعا والبسط يساوي $${delta}$ (${delta > 0 ? '> 0' : '< 0'})، فإن المتتالية ${monoAr}.\nوبما أن $u_n = ${a} ${delta > 0 ? '-' : '+'} \\frac{${absDelta}}{n + ${c}}$، فإن المتتالية محدودة بالحصر $${framingKatex}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نعتبر المتتالية العددية $(u_n)_(n in bb(N))$ المعرفة بعبارة حدها العام:\n$u_n = ${formulaTypst}$`,
				content: [
					{
						type: 'text',
						content: `1) احسب الحدود الثلاثة الأولى للمتتالية: $u_0$ ، $u_1$ و $u_2$.`,
						answer: `1) حساب الحدود الأولى:\n- $u_0 = frac(${linearTypst(a, b, '0')}, 0 + ${c}) = ${u0Typst}$\n- $u_1 = frac(${linearTypst(a, b, '1')}, 1 + ${c}) = ${u1Typst}$\n- $u_2 = frac(${linearTypst(a, b, '2')}, 2 + ${c}) = ${u2Typst}$`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) بيّن أنه من أجل كل عدد طبيعي $n$: $u_(n+1) - u_n = frac(${delta}, (n + ${c + 1})(n + ${c}))$ ، ثم استنتج اتجاه تغير المتتالية $(u_n)$.`,
						answer: `2) حساب الفرق $u_(n+1) - u_n$:\n$u_(n+1) - u_n = frac(${linearTypst(a, a + b)}, n + ${c + 1}) - frac(${linearTypst(a, b)}, n + ${c})$\n$= frac((${linearTypst(a, a + b)})(n + ${c}) - (${linearTypst(a, b)})(n + ${c + 1}), (n + ${c + 1})(n + ${c})) = frac(${delta}, (n + ${c + 1})(n + ${c}))$.\nبما أن $n in bb(N)$ فإن $(n + ${c + 1})(n + ${c}) > 0$، وإشارة الفرق من إشارة $${delta}$:\n- بما أن $${delta} ${delta > 0 ? '> 0' : '< 0'}$، فإن الفرق $u_(n+1) - u_n ${delta > 0 ? '> 0' : '< 0'}$ دائماً.\n- إذن المتتالية $(u_n)$ ${monoAr}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) تحقق أنه من أجل كل عدد طبيعي $n$: $u_n = ${a} ${deltaSignTypst} frac(${absDelta}, n + ${c})$ ، ثم بيّن أن المتتالية $(u_n)$ محدودة (عيّن حاصراً دقيقاً لها على $bb(N)$).`,
						answer: `3) تفكيك عبارة الحد العام والحصر:\n- التحقق: $${a} ${deltaSignTypst} frac(${absDelta}, n + ${c}) = frac(${a}(n + ${c}) ${delta > 0 ? '-' : '+'} ${absDelta}, n + ${c}) = frac(${a} n + ${a * c} ${delta > 0 ? '-' : '+'} ${absDelta}, n + ${c}) = ${formulaTypst} = u_n$.\n- الحصر: بما أن $n >= 0$ فإن $n + ${c} >= ${c}$ ومنه $0 < frac(${absDelta}, n + ${c}) <= frac(${absDelta}, ${c})$.\n- ينتج الحصر الدقيق: $${framingTypst}$.\n- نستنتج أن المتتالية $(u_n)$ محدودة من الأعلى ومن الأسفل، فهي إذن متتالية محدودة.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `4) احسب $lim_(n arrow.r +oo) u_n$ ، وماذا تستنتج بخصوص تقارب المتتالية $(u_n)$؟`,
						answer: `4) حساب النهاية والتقارب:\n$lim_(n arrow.r +oo) u_n = lim_(n arrow.r +oo) (${a} ${deltaSignTypst} frac(${absDelta}, n + ${c})) = ${a} - 0 = ${a}$.\nالاستنتاج: بما أن نهاية المتتالية عدد حقيقي منتهٍ ($${a}$)، فإن المتتالية $(u_n)$ متقاربة نحو العدد $${a}$.`,
						mark: '1'
					}
				]
			},
			hints: [
				`لحساب الحدود الأولى، عوّض $n$ بالقيم $0$ ثم $1$ ثم $2$ في عبارة الحد العام.`,
				`لدراسة اتجاه التغير، وحّد المقامات في الفرق $u_{n+1} - u_n$ وانشر البسط بعناية.`,
				`تكون المتتالية محدودة إذا وجد عددان $m$ و $M$ بحيث $m \\le u_n \\le M$ لكل $n \\in \\mathbb{N}$.`
			],
			solutionStepsAr: [
				`حساب الحدود الأولى: $u_0 = ${u0Katex}$ ، $u_1 = ${u1Katex}$ ، $u_2 = ${u2Katex}$.`,
				`حساب الفرق: $u_{n+1} - u_n = \\frac{${delta}}{(n + ${c + 1})(n + ${c})}$، ومنه المتتالية ${monoAr}.`,
				`التفكيك والحصر: $u_n = ${a} ${delta > 0 ? '-' : '+'} \\frac{${absDelta}}{n + ${c}}$، مما يعطي $${framingKatex}$، فالمتتالية محدودة ومتقاربة نحو $${a}$.`
			],
			finalAnswer: `${a}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Arithmetic Sequences: General Term, Arithmetic Mean & Finite Sum
// ═══════════════════════════════════════════════════════════════════════════════

const tplArithmeticSum: ParameterizedTemplate = {
	id: 'tpl_2as_shared_t3_arithmetic_sum',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'numeric',
	titleAr: 'المتتاليات الحسابية: عبارة الحد العام، الوسط الحسابي ومجموع حدود متعاقبة',
	curriculumLessonId: 'lesson_2as_se_t3_arithmetic_sequences_properties_sum',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		interface Config2 {
			K: number;
			r: number;
		}

		let pool: Config2[];
		if (difficulty === 'easy') {
			pool = [
				{ K: 5, r: 2 }, // u1=3, u2=5, u3=7, S3=15, P=21, u0=1
				{ K: 6, r: 2 }, // u1=4, u2=6, u3=8, S3=18, P=32, u0=2
				{ K: 7, r: 3 }, // u1=4, u2=7, u3=10, S3=21, P=40, u0=1
				{ K: 8, r: 3 }  // u1=5, u2=8, u3=11, S3=24, P=55, u0=2
			];
		} else if (difficulty === 'medium') {
			pool = [
				{ K: 9, r: 4 },  // u1=5, u2=9, u3=13, S3=27, P=65, u0=1
				{ K: 10, r: 3 }, // u1=7, u2=10, u3=13, S3=30, P=91, u0=4
				{ K: 10, r: 4 }, // u1=6, u2=10, u3=14, S3=30, P=84, u0=2
				{ K: 11, r: 4 }, // u1=7, u2=11, u3=15, S3=33, P=105, u0=3
				{ K: 12, r: 5 }  // u1=7, u2=12, u3=17, S3=36, P=119, u0=2
			];
		} else {
			pool = [
				{ K: 13, r: 5 }, // u1=8, u2=13, u3=18, S3=39, P=144, u0=3
				{ K: 14, r: 6 }, // u1=8, u2=14, u3=20, S3=42, P=160, u0=2
				{ K: 15, r: 4 }, // u1=11, u2=15, u3=19, S3=45, P=209, u0=7
				{ K: 16, r: 6 }, // u1=10, u2=16, u3=22, S3=48, P=220, u0=4
				{ K: 15, r: 7 }  // u1=8, u2=15, u3=22, S3=45, P=176, u0=1
			];
		}

		const cfg = rng.pick(pool);
		const K = cfg.K;
		const r = cfg.r;

		const u1 = K - r;
		const u2 = K;
		const u3 = K + r;
		const sum3 = 3 * K;
		const prodP = u1 * u3;

		const u0 = u1 - r;
		const targetN = 10;
		const u10 = u0 + 10 * r;
		// S_10 = (11) * (u0 + u10) / 2
		const sum10 = Math.floor((11 * (u0 + u10)) / 2);

		// Finding rank for an existing term
		const nStar = rng.pick([15, 20, 25]);
		const valNStar = u0 + nStar * r;
		const rankNStar = nStar + 1;

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `لتكن $(u_n)_{n \\in \\mathbb{N}}$ متتالية حسابية متزايدة تماماً حدها الأول $u_0 = ${u0}$ وأساسها $r = ${r}$.\nاحسب قيمة المجموع $S_{10} = u_0 + u_1 + \\dots + u_{10}$:`,
				questionTextAr: `احسب المجموع $S_{10} = u_0 + u_1 + \\dots + u_{10}$:`,
				questionData: {
					answer: sum10,
					displayTemplate: `S_10 = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `الحد ذو الدليل 10 هو $u_{10} = u_0 + 10r = ${u0} + 10(${r}) = ${u10}$.\nعدد الحدود هو $10 - 0 + 1 = 11$.\nنطبق قانون مجموع متتالية حسابية:\n$S_{10} = \\frac{11 \\times (u_0 + u_{10})}{2} = \\frac{11 \\times (${u0} + ${u10})}{2} = \\frac{11 \\times ${u0 + u10}}{2} = ${sum10}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نعتبر المتتالية الحسابية $(u_n)_(n in bb(N))$ المتزايدة تماماً والتي تحقق حدودها المتعاقبة $u_1$ ، $u_2$ و $u_3$ الجملة:\n$cases(u_1 + u_2 + u_3 = ${sum3}, u_1 times u_3 = ${prodP})$`,
				content: [
					{
						type: 'text',
						content: `1) باستعمال خاصية الوسط الحسابي، احسب قيمة الحد $u_2$.`,
						answer: `1) حساب $u_2$ بواسطة الوسط الحسابي:\nبما أن $u_1, u_2, u_3$ ثلاثة حدود متعاقبة لمتتالية حسابية، فإن $u_1 + u_3 = 2 u_2$.\nبالتعويض في المعادلة الأولى: $(u_1 + u_3) + u_2 = ${sum3} arrow.r.double 2 u_2 + u_2 = ${sum3} arrow.r.double 3 u_2 = ${sum3}$.\nإذن: $u_2 = frac(${sum3}, 3) = ${u2}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) بيّن أن أساس المتتالية هو $r = ${r}$، ثم استنتج قيمة الحد الأول $u_0$.`,
						answer: `2) تعيين الأساس $r$ والحد الأول $u_0$:\n- لدينا $u_1 = u_2 - r = ${u2} - r$ و $u_3 = u_2 + r = ${u2} + r$.\n- بالتعويض في المعادلة الثانية: $(${u2} - r)(${u2} + r) = ${prodP} arrow.r.double ${u2 * u2} - r^2 = ${prodP}$.\n- ومنه: $r^2 = ${u2 * u2} - ${prodP} = ${r * r}$.\n- بما أن المتتالية متزايدة تماماً فإن الأساس موجب تماماً ($r > 0$)، إذن $r = sqrt(${r * r}) = ${r}$.\n- الحد الأول: $u_0 = u_1 - r = (u_2 - r) - r = ${u2} - 2(${r}) = ${u0}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) اكتب عبارة الحد العام $u_n$ بدلالة $n$ ، ثم بيّن أن العدد $${valNStar}$ حد من حدود المتتالية $(u_n)$ وعيّن رتبته.`,
						answer: `3) عبارة الحد العام وتعيين الرتبة:\n- عبارة الحد العام: $u_n = u_0 + n r = ${linearTypst(r, u0)}$.\n- للتحقق من أن $${valNStar}$ حد من المتتالية، نحل في $bb(N)$ المعادلة $u_n = ${valNStar}$:\n  $${linearTypst(r, u0)} = ${valNStar} arrow.r.double ${r} n = ${valNStar - u0} arrow.r.double n = frac(${valNStar - u0}, ${r}) = ${nStar} in bb(N)$.\n- إذن $${valNStar}$ هو الحد ذو الدليل $n = ${nStar}$، أي $u_${nStar} = ${valNStar}$.\n- بما أن المتتالية تبدأ من $u_0$، فإن رتبة هذا الحد هي $${nStar} + 1 = ${rankNStar}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `4) احسب بدلالة $n$ المجموع $S_n = u_0 + u_1 + dots + u_n$ ، ثم استنتج قيمة $S_10$.`,
						answer: `4) حساب المجموع $S_n$ وقيمة $S_10$:\n- عدد حدود المجموع $S_n$ هو $n - 0 + 1 = n + 1$.\n- دستور المجموع: $S_n = frac(n + 1, 2) (u_0 + u_n) = frac(n + 1, 2) (${u0} + ${linearTypst(r, u0)}) = frac(n + 1, 2) (${linearTypst(r, 2 * u0)})$.\n- لحساب $S_10$، نعوض $n = 10$:\n  $u_10 = ${u0} + 10(${r}) = ${u10}$.\n  $S_10 = frac(11, 2) (${u0} + ${u10}) = frac(11, 2) times ${u0 + u10} = 11 times ${Math.floor((u0 + u10) / 2)} = ${sum10}$.`,
						mark: '1'
					}
				]
			},
			hints: [
				`خاصية الوسط الحسابي لثلاثة حدود متعاقبة هي: $u_1 + u_3 = 2u_2$.`,
				`عبّر عن $u_1$ و $u_3$ بدلالة $u_2$ والأساس $r$: $u_1 = u_2 - r$ و $u_3 = u_2 + r$.`,
				`مجموع حدود متتالية حسابية يساوي عدد الحدود في نصف مجموع الحدين الأول والأخير: $S = (n + 1) \\times \\frac{u_0 + u_n}{2}$.`
			],
			solutionStepsAr: [
				`الوسط الحسابي: $u_1 + u_3 = 2u_2 \\implies 3u_2 = ${sum3} \\implies u_2 = ${u2}$.`,
				`الجداء: $(${u2} - r)(${u2} + r) = ${prodP} \\implies r^2 = ${r * r} \\implies r = ${r}$، ومنه $u_0 = ${u0}$.`,
				`الحد العام: $u_n = ${linearKatex(r, u0)}$، والعدد $${valNStar}$ رتبته هي $${rankNStar}$.`,
				`المجموع: $S_{10} = \\frac{11 \\times (${u0} + ${u10})}{2} = ${sum10}$.`
			],
			finalAnswer: `${sum10}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Geometric / Auxiliary Sequences: Cobweb Plot, Sum & Limit Convergence
// ═══════════════════════════════════════════════════════════════════════════════

const tplGeometricConvergence: ParameterizedTemplate = {
	id: 'tpl_2as_shared_t3_geometric_convergence',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'numeric',
	titleAr: 'المتتاليات الهندسية: المتتالية المساعدة، المجموع ودراسة التقارب',
	curriculumLessonId: 'lesson_2as_se_t3_geometric_sequences_properties_sum_convergence',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		interface Config3 {
			qNum: number;
			qDen: number;
			alpha: number;
			u0: number;
		}

		let pool: Config3[];
		if (difficulty === 'easy') {
			pool = [
				{ qNum: 1, qDen: 2, alpha: 4, u0: 1 },  // b = 2, v0 = -3
				{ qNum: 1, qDen: 2, alpha: 6, u0: 2 },  // b = 3, v0 = -4
				{ qNum: 1, qDen: 2, alpha: 4, u0: 6 },  // b = 2, v0 = 2
				{ qNum: 1, qDen: 2, alpha: 8, u0: 4 }   // b = 4, v0 = -4
			];
		} else if (difficulty === 'medium') {
			pool = [
				{ qNum: 1, qDen: 3, alpha: 3, u0: 0 },  // b = 2, v0 = -3
				{ qNum: 1, qDen: 3, alpha: 6, u0: 3 },  // b = 4, v0 = -3
				{ qNum: 1, qDen: 3, alpha: 6, u0: 9 },  // b = 4, v0 = 3
				{ qNum: 1, qDen: 2, alpha: 10, u0: 2 }, // b = 5, v0 = -8
				{ qNum: 2, qDen: 3, alpha: 6, u0: 3 }   // b = 2, v0 = -3
			];
		} else {
			pool = [
				{ qNum: 1, qDen: 4, alpha: 4, u0: 0 },  // b = 3, v0 = -4
				{ qNum: 1, qDen: 4, alpha: 8, u0: 4 },  // b = 6, v0 = -4
				{ qNum: 3, qDen: 4, alpha: 8, u0: 4 },  // b = 2, v0 = -4
				{ qNum: 2, qDen: 5, alpha: 5, u0: 0 },  // b = 3, v0 = -5
				{ qNum: 1, qDen: 3, alpha: 9, u0: 3 }   // b = 6, v0 = -6
			];
		}

		const cfg = rng.pick(pool);
		const qNum = cfg.qNum;
		const qDen = cfg.qDen;
		const alpha = cfg.alpha;
		const u0 = cfg.u0;

		// Fixed point relation: alpha = (qNum/qDen)*alpha + b => b = alpha * (1 - qNum/qDen)
		const b = Math.round((alpha * (qDen - qNum)) / qDen);
		const v0 = u0 - alpha;
		const qVal = qNum / qDen;

		const qKatex = fracKatex(qNum, qDen);
		const qTypst = fracTypst(qNum, qDen);

		// First 3 terms
		const u1 = qVal * u0 + b;
		const u2 = qVal * u1 + b;

		// Generate authentic Algerian cobweb staircase diagram
		const xMinCob = Math.max(0, Math.min(u0, alpha) - 1);
		const xMaxCob = Math.max(u0, alpha) + 2;
		const cobwebSvg = svgCobwebSequencePlot({
			fn: (x: number) => qVal * x + b,
			u0,
			steps: 4,
			fixedPoint: alpha,
			xMin: xMinCob,
			xMax: xMaxCob,
			yMin: xMinCob,
			yMax: xMaxCob
		});
		const cobwebUrl = saveSvgAsset(`2as_se_t3_geom_cobweb_${difficulty}_s${seed}`, cobwebSvg);

		// Multiplier for sum T_n = v0 * (1 - q^{n+1}) / (1 - q)
		// v0 / (1 - q) = v0 * qDen / (qDen - qNum)
		const [sumCoeffNum, sumCoeffDen] = simplifyFraction(v0 * qDen, qDen - qNum);
		const sumCoeffKatex = fracKatex(sumCoeffNum, sumCoeffDen);
		const sumCoeffTypst = fracTypst(sumCoeffNum, sumCoeffDen);

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `نعتبر المتتالية العددية $(u_n)_{n \\in \\mathbb{N}}$ المعرفة بـ $u_0 = ${u0}$ ومن أجل كل $n \\in \\mathbb{N}$: $u_{n+1} = ${qKatex} u_n + ${b}$ .\nوالمتتالية المساعدة $(v_n)$ المعرفة بـ $v_n = u_n - ${alpha}$.\nاحسب نهاية المتتالية $(u_n)$ عندما يؤول $n$ إلى $+\infty$ (أي $\\lim_{n \\to +\\infty} u_n$):`,
				questionTextAr: `احسب نهاية المتتالية $\\lim_{n \\to +\\infty} u_n$:`,
				imageUrl: cobwebUrl,
				imageCaption: 'مخطط التراجع لتمثيل حدود المتتالية ومقارنتها بالمنصف الأول y = x',
				questionData: {
					answer: alpha,
					displayTemplate: `lim u_n = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `المتتالية $(v_n)$ هندسية أساسها $q = ${qKatex}$ وحدها الأول $v_0 = ${v0}$.\nعبارتها: $v_n = ${v0} \\left(${qKatex}\\right)^n$.\nبما أن $|q| = ${qKatex} < 1$ فإن $\\lim_{n \\to +\\infty} \\left(${qKatex}\\right)^n = 0$، ومنه $\\lim_{n \\to +\\infty} v_n = 0$.\nبما أن $u_n = v_n + ${alpha}$، فإن $\\lim_{n \\to +\\infty} u_n = 0 + ${alpha} = ${alpha}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نعتبر المتتالية العددية $(u_n)_(n in bb(N))$ المعرفة بحدها الأول $u_0 = ${u0}$ ومن أجل كل عدد طبيعي $n$:\n$u_(n+1) = ${qTypst} u_n + ${b}$\nيُمثّل الشكل المرفق مخطط التراجع لتمثيل الحدود الأولى للمتتالية باستعمال المستقيم $(D): y = ${qTypst} x + ${b}$ والمنصف الأول $(Delta): y = x$.`,
				content: [
					{
						type: 'image',
						src: cobwebUrl,
						caption: 'التمثيل البياني لحدود المتتالية على محور الفواصل بواسطة مخطط التراجع'
					},
					{
						type: 'text',
						content: `1) بقراءة بيانية لمخطط التراجع، عيّن على محور الفواصل الحدود $u_0$ ، $u_1$ ، $u_2$ و $u_3$ (دون حسابها)، ثم ضع تخميناً حول اتجاه تغير المتتالية $(u_n)$ وتقاربها.`,
						answer: `1) القراءة البيانية والتخمين:\n- انطلاقاً من $u_0 = ${u0}$ على محور الفواصل، نصعد عمودياً إلى المستقيم $(D)$ ثم أفقياً إلى المنصف $(Delta)$ لإسقاط $u_1$ على محور الفواصل، ونكرر العملية لتعيين $u_2$ و $u_3$.\n- التخمين: نلاحظ أن الحدود ${u0 < alpha ? 'تتزايد تدريجياً وتتقارب نحو فاصلة نقطة التقاطع' : 'تتناقص تدريجياً وتتقارب نحو فاصلة نقطة التقاطع'} $x = ${alpha}$.\n- نخمن أن المتتالية $(u_n)$ ${u0 < alpha ? 'متزايدة تماماً ومتقاربة نحو العدد' : 'متناقصة تماماً ومتقاربة نحو العدد'} $${alpha}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) نعتبر المتتالية العددية $(v_n)_(n in bb(N))$ المعرفة بـ: $v_n = u_n - ${alpha}$.\nأ) أثبت أن $(v_n)$ متتالية هندسية يُطلب تعيين أساسها $q$ وحدها الأول $v_0$.\nب) اكتب عبارة $v_n$ بدلالة $n$ ، ثم استنتج عبارة $u_n$ بدلالة $n$.`,
						answer: `2) دراسة المتتالية المساعدة $(v_n)$:\nأ) إثبات أنها هندسية:\n- لدينا لكل $n in bb(N)$: $v_(n+1) = u_(n+1) - ${alpha} = ${qTypst} u_n + ${b} - ${alpha}$.\n- بما أن $${b} - ${alpha} = -${alpha * (1 - qVal)} = -${qTypst} times ${alpha}$:\n  $v_(n+1) = ${qTypst} (u_n - ${alpha}) = ${qTypst} v_n$.\n- إذن $(v_n)$ متتالية هندسية أساسها $q = ${qTypst}$ وحدها الأول $v_0 = u_0 - ${alpha} = ${u0} - ${alpha} = ${v0}$.\nب) كتابة العبارات بدلالة $n$:\n- عبارة الحد العام: $v_n = v_0 times q^n = ${v0} (${qTypst})^n$.\n- استنتاج عبارة $u_n$: بما أن $u_n = v_n + ${alpha}$، فإن $u_n = ${alpha} ${v0 >= 0 ? '+ ' + v0 : '- ' + Math.abs(v0)} (${qTypst})^n$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) احسب $lim_(n arrow.r +oo) u_n$ مع التعليل، وماذا تستنتج؟`,
						answer: `3) حساب النهاية:\n- بما أن أساس المتتالية الهندسية يحقق $|q| = ${qTypst} < 1$، فإن $lim_(n arrow.r +oo) (${qTypst})^n = 0$.\n- ومنه: $lim_(n arrow.r +oo) v_n = 0$.\n- ينتج أن: $lim_(n arrow.r +oo) u_n = lim_(n arrow.r +oo) (${alpha} + v_n) = ${alpha} + 0 = ${alpha}$.\n- الاستنتاج: المتتالية $(u_n)$ متقاربة نحو نقطة الثبات $L = ${alpha}$، وهو ما يطابق التخمين البياني.`,
						mark: '0.5'
					},
					{
						type: 'text',
						content: `4) احسب بدلالة $n$ المجموعين:\n$T_n = v_0 + v_1 + dots + v_n$   و   $S_n = u_0 + u_1 + dots + u_n$`,
						answer: `4) حساب المجموعين:\n- المجموع $T_n$ لمتتالية هندسية:\n  $T_n = v_0 times frac(1 - q^(n+1), 1 - q) = ${v0} times frac(1 - (${qTypst})^(n+1), 1 - ${qTypst}) = ${sumCoeffTypst} (1 - (${qTypst})^(n+1))$.\n- المجموع $S_n$:\n  بما أن $u_k = v_k + ${alpha}$ من أجل كل $k$، فإن:\n  $S_n = sum_(k=0)^n (v_k + ${alpha}) = (sum_(k=0)^n v_k) + (sum_(k=0)^n ${alpha}) = T_n + (n + 1) times ${alpha}$.\n  إذن: $S_n = ${alpha}(n + 1) + ${sumCoeffTypst} (1 - (${qTypst})^(n+1))$.`,
						mark: '1'
					}
				]
			},
			hints: [
				`لتبيان أن $(v_n)$ هندسية، انطلق من $v_{n+1} = u_{n+1} - \\alpha$ واستخرج الأساس $q$ كعامل مشترك.`,
				`تذكر أن نهاية المتتالية الهندسية $q^n$ تكون صفراً عندما يكون $|q| < 1$.`,
				`المجموع $S_n$ يُحسب بتفكيك كل حد: $u_k = v_k + \\alpha$ واستعمال مجموع المتتالية الهندسية $T_n$.`
			],
			solutionStepsAr: [
				`القراءة البيانية لحدود المتتالية ومقارنتها بالمنصف الأول $y = x$.`,
				`إثبات أن $(v_n)$ متتالية هندسية أساسها $q = ${qKatex}$ وحدها الأول $v_0 = ${v0}$.`,
				`كتابة $v_n = ${v0} (${qKatex})^n$ و $u_n = ${alpha} ${v0 >= 0 ? '+ ' + v0 : '- ' + Math.abs(v0)} (${qKatex})^n$.`,
				`حساب النهاية: $\\lim_{n \\to +\\infty} u_n = ${alpha}$، وحساب المجموعين $T_n$ و $S_n$.`
			],
			finalAnswer: `${alpha}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Space Geometry: Vectors, Coplanarity & Cartesian Plane Equation
// ═══════════════════════════════════════════════════════════════════════════════

const tplSpaceVectorsCoplanarity: ParameterizedTemplate = {
	id: 'tpl_2as_shared_t3_space_vectors_coplanarity',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'geometry',
	titleAr: 'الهندسة في الفضاء: الحساب الشعاعي، استقامية النقط، المستويات والأشعة متحدة المستوي',
	curriculumLessonId: 'lesson_2as_se_t3_space_geometry_plane_sections_vector_calculus',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		interface Config4 {
			A: [number, number, number];
			B: [number, number, number];
			C: [number, number, number];
			xD: number;
			yD: number;
			alpha: number;
			beta: number;
		}

		let pool: Config4[];
		if (difficulty === 'easy') {
			pool = [
				{ A: [1, 2, 1], B: [2, 1, 3], C: [3, 3, 2], xD: 4, yD: 2, alpha: 1, beta: 1 },
				{ A: [0, 1, 2], B: [1, 3, 1], C: [2, 2, 3], xD: 3, yD: 4, alpha: 1, beta: 1 },
				{ A: [1, 1, 1], B: [2, 3, 0], C: [0, 2, 2], xD: 3, yD: 5, alpha: 2, beta: 0 }
			];
		} else if (difficulty === 'medium') {
			pool = [
				{ A: [2, 0, 1], B: [3, 2, 1], C: [1, 1, 3], xD: 1, yD: 4, alpha: 1, beta: 2 },
				{ A: [1, -1, 2], B: [2, 1, 1], C: [3, 0, 3], xD: 5, yD: 2, alpha: 2, beta: 1 },
				{ A: [0, 2, 1], B: [1, 1, 2], C: [2, 3, 1], xD: 3, yD: 2, alpha: 1, beta: 1 }
			];
		} else {
			pool = [
				{ A: [2, 1, 0], B: [3, 3, -1], C: [1, 2, 2], xD: 4, yD: 4, alpha: 1, beta: 1 },
				{ A: [1, 0, 2], B: [2, 2, 1], C: [0, 1, 4], xD: 2, yD: 3, alpha: 2, beta: 1 },
				{ A: [3, 1, 1], B: [4, 3, 0], C: [2, 2, 3], xD: 5, yD: 4, alpha: 1, beta: 2 }
			];
		}

		const cfg = rng.pick(pool);
		const [xA, yA, zA] = cfg.A;
		const [xB, yB, zB] = cfg.B;
		const [xC, yC, zC] = cfg.C;

		// Vector AB
		const uX = xB - xA;
		const uY = yB - yA;
		const uZ = zB - zA;

		// Vector AC
		const vX = xC - xA;
		const vY = yC - yA;
		const vZ = zC - zA;

		// Normal vector n = u x v
		let nX = uY * vZ - uZ * vY;
		let nY = uZ * vX - uX * vZ;
		let nZ = uX * vY - uY * vX;
		const gNorm = gcd(gcd(nX, nY), nZ);
		nX = Math.floor(nX / gNorm);
		nY = Math.floor(nY / gNorm);
		nZ = Math.floor(nZ / gNorm);
		// Normalize sign so first non-zero is positive
		if (nX < 0 || (nX === 0 && nY < 0) || (nX === 0 && nY === 0 && nZ < 0)) {
			nX = -nX;
			nY = -nY;
			nZ = -nZ;
		}

		// Plane equation: nX*x + nY*y + nZ*z + d = 0
		const dPlane = -(nX * xA + nY * yA + nZ * zA);

		// D(xD, yD, m) coplanar with ABC => nX*xD + nY*yD + nZ*m + dPlane = 0
		// m = -(nX*xD + nY*yD + dPlane) / nZ
		const mNumerator = -(nX * cfg.xD + nY * cfg.yD + dPlane);
		const mVal = Math.floor(mNumerator / nZ);

		// Vector AD = alpha * AB + beta * AC
		const alpha = cfg.alpha;
		const beta = cfg.beta;
		const wX = cfg.xD - xA;
		const wY = cfg.yD - yA;
		const wZ = mVal - zA;

		function fmtPlaneTypst(a: number, b: number, c: number, d: number): string {
			let s = '';
			if (a === 1) s += 'x';
			else if (a === -1) s += '-x';
			else if (a !== 0) s += `${a} x`;

			if (b !== 0) {
				const sign = b > 0 ? (s ? '+ ' : '') : '- ';
				const absB = Math.abs(b);
				s += ` ${sign}${absB === 1 ? 'y' : `${absB} y`}`;
			}
			if (c !== 0) {
				const sign = c > 0 ? (s ? '+ ' : '') : '- ';
				const absC = Math.abs(c);
				s += ` ${sign}${absC === 1 ? 'z' : `${absC} z`}`;
			}
			if (d !== 0) {
				const sign = d > 0 ? '+ ' : '- ';
				s += ` ${sign}${Math.abs(d)}`;
			}
			return s.trim() + ' = 0';
		}

		function fmtPlaneKatex(a: number, b: number, c: number, d: number): string {
			let s = '';
			if (a === 1) s += 'x';
			else if (a === -1) s += '-x';
			else if (a !== 0) s += `${a}x`;

			if (b !== 0) {
				const sign = b > 0 ? (s ? '+' : '') : '-';
				const absB = Math.abs(b);
				s += `${sign}${absB === 1 ? 'y' : `${absB}y`}`;
			}
			if (c !== 0) {
				const sign = c > 0 ? (s ? '+' : '') : '-';
				const absC = Math.abs(c);
				s += `${sign}${absC === 1 ? 'z' : `${absC}z`}`;
			}
			if (d !== 0) {
				const sign = d > 0 ? '+' : '-';
				s += `${sign}${Math.abs(d)}`;
			}
			return s.trim() + ' = 0';
		}

		const planeTypst = fmtPlaneTypst(nX, nY, nZ, dPlane);
		const planeKatex = fmtPlaneKatex(nX, nY, nZ, dPlane);

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `في الفضاء المنسوب إلى معلم متعامد ومتجانس $(O ; \\vec{i}, \\vec{j}, \\vec{k})$، نعتبر النقط:\n$A(${xA} ; ${yA} ; ${zA})$ ، $B(${xB} ; ${yB} ; ${zB})$ ، $C(${xC} ; ${yC} ; ${zC})$ و $D(${cfg.xD} ; ${cfg.yD} ; m)$ حيث $m \\in \\mathbb{R}$.\nاحسب قيمة $m$ حتى تكون النقط $A, B, C, D$ تنتمي إلى نفس المستوي (أو تكون الأشعة $\\vec{AB}, \\vec{AC}, \\vec{AD}$ متحدة المستوي):`,
				questionTextAr: `احسب قيمة $m$ حتى تكون النقط $A, B, C, D$ في نفس المستوي:`,
				questionData: {
					answer: mVal,
					displayTemplate: `m = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `مركبات الشعاعين:\n$\\vec{AB}(${uX} ; ${uY} ; ${uZ})$ و $\\vec{AC}(${vX} ; ${vY} ; ${vZ})$.\nالشعاع الناظمي للمستوي $(ABC)$ هو $\\vec{n}(${nX} ; ${nY} ; ${nZ})$.\nالمعادلة الديكارتية للمستوي $(ABC)$ هي: $${planeKatex}$.\nتنتمي النقطة $D(${cfg.xD} ; ${cfg.yD} ; m)$ إلى المستوي $(ABC)$ إذا وفقط إذا حققت إحداثياتها المعادلة:\n$${nX}(${cfg.xD}) + (${nY})(${cfg.yD}) + (${nZ})m + (${dPlane}) = 0 \\iff m = ${mVal}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `في الفضاء المنسوب إلى معلَم متعامد ومتجانس $(O ; arrow(i), arrow(j), arrow(k))$، نعتبر النقط:\n$A(${xA}, ${yA}, ${zA})$ ، $B(${xB}, ${yB}, ${zB})$ ، $C(${xC}, ${yC}, ${zC})$   و   $D(${cfg.xD}, ${cfg.yD}, m)$ حيث $m in bb(R)$.`,
				content: [
					{
						type: 'text',
						content: `1) احسب مركبات الشعاعين $arrow(A B)$ و $arrow(A C)$ ، ثم بيّن أن النقط $A$ ، $B$ و $C$ ليست في استقامية واستنتج أنها تعيّن مستوياً $(A B C)$.`,
						answer: `1) حساب مركبات الأشعة وإثبات تعيين المستوي:\n- لدينا $arrow(A B)(${xB} - (${xA}), ${yB} - (${yA}), ${zB} - (${zA})) = (${uX}, ${uY}, ${uZ})$.\n- ولدينا $arrow(A C)(${xC} - (${xA}), ${yC} - (${yA}), ${zC} - (${zA})) = (${vX}, ${vY}, ${vZ})$.\n- نلاحظ أن مركبات الشعاعين ليست متناسبة (لا يوجد عدد حقيقي $k$ يحقق $arrow(A C) = k arrow(A B)$)، فالشعاعان $arrow(A B)$ و $arrow(A C)$ ليسا مرتبطين خطياً.\n- ينتج أن النقط $A$ ، $B$ و $C$ ليست في استقامية، وبالتالي فهي تعيّن مستوياً وحيداً في الفضاء نرمز له بـ $(A B C)$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) بيّن أن الشعاع $arrow(n)(${nX}, ${nY}, ${nZ})$ عمودي على كل من $arrow(A B)$ و $arrow(A C)$ ، ثم استنتج معادلة ديكارتية للمستوي $(A B C)$.`,
						answer: `2) إثبات أن الشعاع ناظمي وكتابة المعادلة الديكارتية:\n- الجداء السلمي $arrow(n) dot arrow(A B) = (${nX})(${uX}) + (${nY})(${uY}) + (${nZ})(${uZ}) = ${nX * uX + nY * uY + nZ * uZ} = 0$.\n- الجداء السلمي $arrow(n) dot arrow(A C) = (${nX})(${vX}) + (${nY})(${vY}) + (${nZ})(${vZ}) = ${nX * vX + nY * vY + nZ * vZ} = 0$.\n- إذن الشعاع $arrow(n)$ عمودي على شعاعين غير مرتبطين خطياً من المستوي $(A B C)$، فهو شعاع ناظمي له.\n- المعادلة الديكارتية تكتب على الشكل: $${nX} (x - ${xA}) + (${nY}) (y - ${yA}) + (${nZ}) (z - ${zA}) = 0$.\n- بالنشر والتبسيط نجد: $${planeTypst}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) عيّن قيمة العدد الحقيقي $m$ حتى تنتمي النقطة $D$ إلى المستوي $(A B C)$.`,
						answer: `3) تعيين قيمة $m$:\n- تنتمي النقطة $D(${cfg.xD}, ${cfg.yD}, m)$ إلى المستوي $(A B C)$ إذا وفقط إذا حققت إحداثياتها معادلته الديكارتية:\n  $${nX}(${cfg.xD}) + (${nY})(${cfg.yD}) + (${nZ})m + (${dPlane}) = 0$\n  $arrow.r.double ${nX * cfg.xD + nY * cfg.yD + dPlane} + (${nZ})m = 0 arrow.r.double (${nZ})m = ${-mNumerator} arrow.r.double m = ${mVal}$.\n- إذن قيمة $m$ المطلوبة هي $m = ${mVal}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `4) نضع في هذا السؤال $m = ${mVal}$ (فتكون $D(${cfg.xD}, ${cfg.yD}, ${mVal})$).\nأوجد العددين الحقيقيين $alpha$ و $beta$ بحيث يتحقق: $arrow(A D) = alpha arrow(A B) + beta arrow(A C)$ ، وماذا تستنتج بالنسبة للأشعة الثلاثة؟`,
						answer: `4) التعبير عن $arrow(A D)$ والارتباط الخطي في الفضاء:\n- مركبات الشعاع: $arrow(A D)(${wX}, ${wY}, ${wZ})$.\n- نكتب المساواة الشعاعية في شكل جملة ثلاث معادلات ذات المجهولين $alpha$ و $beta$:\n  $cases(${uX} alpha + ${vX} beta = ${wX}, ${uY} alpha + ${vY} beta = ${wY}, ${uZ} alpha + ${vZ} beta = ${wZ})$\n- بحل الجملة نجد: $alpha = ${alpha}$ و $beta = ${beta}$.\n- التحقق: $(${alpha})(${uX}, ${uY}, ${uZ}) + (${beta})(${vX}, ${vY}, ${vZ}) = (${wX}, ${wY}, ${wZ}) = arrow(A D)$.\n- الاستنتاج: الأشعة $arrow(A B)$ ، $arrow(A C)$ و $arrow(A D)$ أشعة متحدة المستوي (Vecteurs coplanaires) لأن أحدها يكتب كتركيبة خطية للآخرين.`,
						mark: '1'
					}
				]
			},
			hints: [
				`تكون ثلاث نقط في الفضاء ليست في استقامية إذا كان الشعاعان $\\vec{AB}$ و $\\vec{AC}$ غير مرتبطين خطياً.`,
				`يكون $\\vec{n}$ شعاعاً ناظمياً لمستو إذا كان جداؤه السلمي مع شعاعي توجيه المستوي معدوماً.`,
				`تنتمي نقطة إلى مستو إذا حققت إحداثياتها معادلته الديكارتية $ax + by + cz + d = 0$.`
			],
			solutionStepsAr: [
				`حساب مركبات $\\vec{AB}(${uX} ; ${uY} ; ${uZ})$ و $\\vec{AC}(${vX} ; ${vY} ; ${vZ})$ وإثبات عدم استقامية النقط.`,
				`إثبات التعامد بالجداء السلمي واستنتاج المعادلة الديكارتية للمستوي: $${planeKatex}$.`,
				`التعويض وإيجاد $m = ${mVal}$.`,
				`حل الجملة لإيجاد $\\alpha = ${alpha}$ و $\\beta = ${beta}$، واستنتاج أن الأشعة متحدة المستوي.`
			],
			finalAnswer: `${mVal}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Space Analytic Geometry: Sphere Equation, Distance to Plane & Circle Cut
// ═══════════════════════════════════════════════════════════════════════════════

const tplSpaceSphereDistance: ParameterizedTemplate = {
	id: 'tpl_2as_shared_t3_space_sphere_distance',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'geometry',
	titleAr: 'الهندسة الفضائية: معادلة سطح كرة، المسافة إلى مستو والتقاطع',
	curriculumLessonId: 'lesson_2as_se_t3_analytic_space_geometry_coordinates_lines_planes_sphere',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		interface Config5 {
			omega: [number, number, number];
			n: [number, number, number]; // a^2 + b^2 + c^2 = 9 (norm = 3)
			dFactor: number;             // lambda = 1 => d = 3
			R: number;
		}

		let pool: Config5[];
		if (difficulty === 'easy') {
			pool = [
				{ omega: [1, 2, -1], n: [2, -2, 1], dFactor: 1, R: 5 }, // dist=3, r=4
				{ omega: [0, 1, 2], n: [1, 2, -2], dFactor: 1, R: 5 },  // dist=3, r=4
				{ omega: [2, 0, 1], n: [2, 1, 2], dFactor: 1, R: 5 }    // dist=3, r=4
			];
		} else if (difficulty === 'medium') {
			pool = [
				{ omega: [-1, 3, 2], n: [2, -1, 2], dFactor: 1, R: 5 }, // dist=3, r=4
				{ omega: [2, -1, 0], n: [1, -2, 2], dFactor: 1, R: 5 }, // dist=3, r=4
				{ omega: [1, 1, 1], n: [2, 2, -1], dFactor: 1, R: 5 },  // dist=3, r=4
				{ omega: [3, 2, 1], n: [2, -2, 1], dFactor: 1, R: 5 }   // dist=3, r=4
			];
		} else {
			pool = [
				{ omega: [2, 2, -1], n: [2, -2, 1], dFactor: 1, R: 5 },
				{ omega: [-2, 1, 3], n: [1, 2, -2], dFactor: 1, R: 5 },
				{ omega: [0, -2, 1], n: [2, 1, -2], dFactor: 1, R: 5 }
			];
		}

		const cfg = rng.pick(pool);
		const [x0, y0, z0] = cfg.omega;
		const [a, b, c] = cfg.n;
		const normSq = a * a + b * b + c * c; // 9
		const norm = Math.round(Math.sqrt(normSq)); // 3
		const R = cfg.R; // 5

		// Choose plane d so that dPlane = -9 - (a*x0 + b*y0 + c*z0)
		// Distance = |-9| / 3 = 3
		const dotOmega = a * x0 + b * y0 + c * z0;
		const dPlane = -normSq - dotOmega; // numerator = -9
		const dDist = Math.round(Math.abs(dotOmega + dPlane) / norm); // 3
		const rCircle = Math.round(Math.sqrt(R * R - dDist * dDist)); // 4

		// Orthogonal projection H = Omega + lambda * n
		// lambda = -(dotOmega + dPlane) / normSq = -(-9) / 9 = 1
		const Hx = x0 + a;
		const Hy = y0 + b;
		const Hz = z0 + c;

		// 3D Space Scene SVG
		const sceneSvg = svgSpace3DScene({
			points: [
				{ x: x0, y: y0, z: z0, label: `Ω(${x0},${y0},${z0})`, color: '#dc2626' },
				{ x: Hx, y: Hy, z: Hz, label: `H(${Hx},${Hy},${Hz})`, color: '#15803d' }
			],
			showPlanePatch: true,
			planeLabel: '(P)',
			normalVector: { x: a / 3, y: b / 3, z: c / 3, label: 'n' }
		});
		const sceneUrl = saveSvgAsset(`2as_se_t3_space_sphere_${difficulty}_s${seed}`, sceneSvg);

		function fmtPlaneTypst(pa: number, pb: number, pc: number, pd: number): string {
			let s = '';
			if (pa === 1) s += 'x';
			else if (pa === -1) s += '-x';
			else if (pa !== 0) s += `${pa} x`;

			if (pb !== 0) {
				const sign = pb > 0 ? (s ? '+ ' : '') : '- ';
				const absB = Math.abs(pb);
				s += ` ${sign}${absB === 1 ? 'y' : `${absB} y`}`;
			}
			if (pc !== 0) {
				const sign = pc > 0 ? (s ? '+ ' : '') : '- ';
				const absC = Math.abs(pc);
				s += ` ${sign}${absC === 1 ? 'z' : `${absC} z`}`;
			}
			if (pd !== 0) {
				const sign = pd > 0 ? '+ ' : '- ';
				s += ` ${sign}${Math.abs(pd)}`;
			}
			return s.trim() + ' = 0';
		}

		function fmtPlaneKatex(pa: number, pb: number, pc: number, pd: number): string {
			let s = '';
			if (pa === 1) s += 'x';
			else if (pa === -1) s += '-x';
			else if (pa !== 0) s += `${pa}x`;

			if (pb !== 0) {
				const sign = pb > 0 ? (s ? '+' : '') : '-';
				const absB = Math.abs(pb);
				s += `${sign}${absB === 1 ? 'y' : `${absB}y`}`;
			}
			if (pc !== 0) {
				const sign = pc > 0 ? (s ? '+' : '') : '-';
				const absC = Math.abs(pc);
				s += `${sign}${absC === 1 ? 'z' : `${absC}z`}`;
			}
			if (pd !== 0) {
				const sign = pd > 0 ? '+' : '-';
				s += `${sign}${Math.abs(pd)}`;
			}
			return s.trim() + ' = 0';
		}

		const planeTypst = fmtPlaneTypst(a, b, c, dPlane);
		const planeKatex = fmtPlaneKatex(a, b, c, dPlane);

		// Sphere expanded: x^2 + y^2 + z^2 - 2x0 x - 2y0 y - 2z0 z + (x0^2 + y0^2 + z0^2 - R^2) = 0
		const cConst = x0 * x0 + y0 * y0 + z0 * z0 - R * R;
		const sphereExpandedTypst = `x^2 + y^2 + z^2 ${-2 * x0 >= 0 ? '+ ' + -2 * x0 : '- ' + Math.abs(-2 * x0)} x ${-2 * y0 >= 0 ? '+ ' + -2 * y0 : '- ' + Math.abs(-2 * y0)} y ${-2 * z0 >= 0 ? '+ ' + -2 * z0 : '- ' + Math.abs(-2 * z0)} z ${cConst >= 0 ? '+ ' + cConst : '- ' + Math.abs(cConst)} = 0`;
		const sphereCanonicalTypst = `(x ${-x0 >= 0 ? '+ ' + -x0 : '- ' + Math.abs(x0)})^2 + (y ${-y0 >= 0 ? '+ ' + -y0 : '- ' + Math.abs(y0)})^2 + (z ${-z0 >= 0 ? '+ ' + -z0 : '- ' + Math.abs(z0)})^2 = ${R * R}`;

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `في الفضاء المنسوب إلى معلم متعامد ومتجانس، نعتبر سطح الكرة $(S)$ التي مركزها $\\Omega(${x0} ; ${y0} ; ${z0})$ ونصف قطرها $R = ${R}$، والمستوي $(P)$ ذي المعادلة $${planeKatex}$.\nاحسب المسافة العمودية $d(\\Omega, (P))$ من مركز الكرة $\\Omega$ إلى المستوي $(P)$:`,
				questionTextAr: `احسب المسافة العمودية $d(\\Omega, (P))$:`,
				imageUrl: sceneUrl,
				imageCaption: 'تمثيل مجسم الفضاء: المركز Ω، المستوي (P) والمسقط العمودي H',
				questionData: {
					answer: dDist,
					displayTemplate: `d(Ω, (P)) = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `دستور المسافة من نقطة إلى مستو في الفضاء:\n$d(\\Omega, (P)) = \\frac{|a x_0 + b y_0 + c z_0 + d|}{\\sqrt{a^2 + b^2 + c^2}}$.\nنعوض إحداثيات $\\Omega(${x0} ; ${y0} ; ${z0})$ في معادلة $(P)$:\n$|(${a})(${x0}) + (${b})(${y0}) + (${c})(${z0}) + (${dPlane})| = |${dotOmega + dPlane}| = ${Math.abs(dotOmega + dPlane)}$.\nطول الشعاع الناظمي: $\\sqrt{(${a})^2 + (${b})^2 + (${c})^2} = \\sqrt{${normSq}} = ${norm}$.\nإذن: $d(\\Omega, (P)) = \\frac{${Math.abs(dotOmega + dPlane)}}{${norm}} = ${dDist}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `في الفضاء المنسوب إلى معلَم متعامد ومتجانس $(O ; arrow(i), arrow(j), arrow(k))$، نعتبر النقطة $Omega(${x0}, ${y0}, ${z0})$ والمستوي $(P)$ ذا المعادلة الديكارتية:\n$${planeTypst}$`,
				content: [
					{
						type: 'image',
						src: sceneUrl,
						caption: 'التمثيل المجسم في الفضاء لسطح الكرة والمستوي والمسقط العمودي'
					},
					{
						type: 'text',
						content: `1) اكتب معادلة ديكارتية لسطح الكرة $(S)$ التي مركزها $Omega$ ونصف قطرها $R = ${R}$ (بالصيغة النموذجية ثم المنشورة).`,
						answer: `1) معادلة سطح الكرة $(S)$:\n- الصيغة النموذجية: $${sphereCanonicalTypst}$.\n- بالنشر والترتيب:\n  $x^2 - 2(${x0})x + ${x0 * x0} + y^2 - 2(${y0})y + ${y0 * y0} + z^2 - 2(${z0})z + ${z0 * z0} - ${R * R} = 0$.\n  نجد الصيغة المبسطة: $${sphereExpandedTypst}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) احسب المسافة $d(Omega, (P))$ بين مركز الكرة $Omega$ والمستوي $(P)$.`,
						answer: `2) حساب المسافة $d(Omega, (P))$:\n- شعاع ناظمي للمستوي هو $arrow(n)(${a}, ${b}, ${c})$.\n- نظيمه: $||arrow(n)|| = sqrt((${a})^2 + (${b})^2 + (${c})^2) = sqrt(${normSq}) = ${norm}$.\n- المسافة: $d(Omega, (P)) = frac(|(${a})(${x0}) + (${b})(${y0}) + (${c})(${z0}) + (${dPlane})|, ${norm}) = frac(|${dotOmega + dPlane}|, ${norm}) = frac(${Math.abs(dotOmega + dPlane)}, ${norm}) = ${dDist}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) استنتج الوضع النسبي لسطح الكرة $(S)$ والمستوي $(P)$، ثم حدد طبيعة تقاطعهما ونصف قطره $r$.`,
						answer: `3) استنتاج الوضع النسبي وطبيعة التقاطع:\n- بما أن $d(Omega, (P)) = ${dDist}$ ونصف قطر الكرة هو $R = ${R}$، نلاحظ أن: $d(Omega, (P)) < R$ ($${dDist} < ${R}$).\n- إذن المستوي $(P)$ يقطع سطح الكرة $(S)$ وفق دائرة $(cal(C))$.\n- نصف قطر دائرة التقاطع $r$ يُحسب بمبرهنة فيثاغورس:\n  $r = sqrt(R^2 - d^2) = sqrt(${R}^2 - ${dDist}^2) = sqrt(${R * R} - ${dDist * dDist}) = sqrt(${R * R - dDist * dDist}) = ${rCircle}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `4) عيّن إحداثيات النقطة $H$ مركز دائرة التقاطع $(cal(C))$ (المسقط العمودي للنقطة $Omega$ على المستوي $(P)$).`,
						answer: `4) تعيين إحداثيات مركز الدائرة $H$:\n- النقطة $H$ هي نقطة تقاطع المستوي $(P)$ مع المستقيم العمودي عليه والمار من $Omega$ ذي شعاع التوجيه $arrow(n)(${a}, ${b}, ${c})$.\n- التمثيل الوسيطي لهذا المستقيم: $cases(x = ${x0} + ${a} t, y = ${y0} + ${b} t, z = ${z0} + ${c} t)$ حيث $t in bb(R)$.\n- بتعويض إحداثيات المستقيم في معادلة المستوي $(P)$:\n  $${a}(${x0} + ${a} t) + ${b}(${y0} + ${b} t) + ${c}(${z0} + ${c} t) + (${dPlane}) = 0$\n  $arrow.r.double ${dotOmega} + (${normSq}) t + (${dPlane}) = 0 arrow.r.double ${normSq} t = ${Math.abs(dotOmega + dPlane)} arrow.r.double t = 1$.\n- بالتعويض بقيمة $t = 1$ في التمثيل الوسيطي نجد:\n  $x_H = ${x0} + ${a}(1) = ${Hx}$ ، $y_H = ${y0} + ${b}(1) = ${Hy}$ ، $z_H = ${z0} + ${c}(1) = ${Hz}$.\n- إذن مركز دائرة التقاطع هو النقطة $H(${Hx}, ${Hy}, ${Hz})$.`,
						mark: '1'
					}
				]
			},
			hints: [
				`معادلة سطح الكرة التي مركزها $\\Omega(x_0, y_0, z_0)$ ونصف قطرها $R$ هي $(x - x_0)^2 + (y - y_0)^2 + (z - z_0)^2 = R^2$.`,
				`إذا كانت المسافة $d < R$ فإن التقاطع هو دائرة نصف قطرها $r = \\sqrt{R^2 - d^2}$.`,
				`مركز الدائرة $H$ هو المسقط العمودي لـ $\\Omega$ على $(P)$، ويُحسب بتعويض التمثيل الوسيطي للمستقيم العمودي في معادلة المستوي.`
			],
			solutionStepsAr: [
				`معادلة سطح الكرة $(S)$: $${sphereCanonicalTypst}$.`,
				`حساب المسافة: $d(\\Omega, (P)) = \\frac{|${dotOmega + dPlane}|}{${norm}} = ${dDist}$.`,
				`المقارنة $d < R$ ($${dDist} < ${R}$)، إذن التقاطع دائرة نصف قطرها $r = \\sqrt{${R}^2 - ${dDist}^2} = ${rCircle}$.`,
				`إحداثيات مركز الدائرة $H(${Hx} ; ${Hy} ; ${Hz})$.`
			],
			finalAnswer: `${dDist}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Comprehensive Analytical Sequence + Optimization Problem (7 Points)
// Secondary MEN/ONEC BAC format: independent exercises + Comprehensive Problem
// NEVER Primary/Middle "الوضعية الإدماجية"!
// ═══════════════════════════════════════════════════════════════════════════════

const tplProblemSynthesis: ParameterizedTemplate = {
	id: 'tpl_2as_shared_t3_problem_synthesis',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'integration',
	isIntegration: true,
	defaultPoints: 7,
	titleAr: 'المسألة الشاملة: دراسة دالة عقلانية، متتالية تراجعية مرفقة واستمثال اقتصادي',
	curriculumLessonId: 'lesson_2as_se_t3_analytic_space_geometry_coordinates_lines_planes_sphere',
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		interface Config6 {
			L: number; // positive integer fixed point
			a: number; // a > L
		}

		let pool: Config6[];
		if (difficulty === 'easy') {
			pool = [
				{ L: 2, a: 3 }, // f(x) = (3x + 4)/(x + 3), a^2 - L^2 = 5 > 0
				{ L: 2, a: 4 }, // f(x) = (4x + 4)/(x + 4), a^2 - L^2 = 12 > 0
				{ L: 1, a: 2 }  // f(x) = (2x + 1)/(x + 2), a^2 - L^2 = 3 > 0
			];
		} else if (difficulty === 'medium') {
			pool = [
				{ L: 3, a: 4 }, // f(x) = (4x + 9)/(x + 4), a^2 - L^2 = 7 > 0
				{ L: 3, a: 5 }, // f(x) = (5x + 9)/(x + 5), a^2 - L^2 = 16 > 0
				{ L: 2, a: 5 }  // f(x) = (5x + 4)/(x + 5), a^2 - L^2 = 21 > 0
			];
		} else {
			pool = [
				{ L: 3, a: 6 }, // f(x) = (6x + 9)/(x + 6), a^2 - L^2 = 27 > 0
				{ L: 4, a: 5 }, // f(x) = (5x + 16)/(x + 5), a^2 - L^2 = 9 > 0
				{ L: 4, a: 6 }  // f(x) = (6x + 16)/(x + 6), a^2 - L^2 = 20 > 0
			];
		}

		const cfg = rng.pick(pool);
		const L = cfg.L;
		const a = cfg.a;
		const L2 = L * L;
		const diffSq = a * a - L2; // strictly positive
		const domainMax = 2 * L + 2;

		// f(0) = L^2 / a
		const [f0Num, f0Den] = simplifyFraction(L2, a);
		const f0Katex = fracKatex(f0Num, f0Den);
		const f0Typst = fracTypst(f0Num, f0Den);

		// First terms u_0 = 0
		// u_1 = f(0) = L^2 / a
		// u_2 = f(u_1) = (a * (L^2/a) + L^2) / (L^2/a + a) = (2 L^2) / ((L^2 + a^2)/a) = (2 a L^2) / (a^2 + L^2)
		const [u2Num, u2Den] = simplifyFraction(2 * a * L2, a * a + L2);
		const u2Katex = fracKatex(u2Num, u2Den);
		const u2Typst = fracTypst(u2Num, u2Den);
		const u2Val = (2 * a * L2) / (a * a + L2);

		// Quality threshold for Part 3
		const thresholdVal = Number((L * 0.85).toFixed(2));

		// Curve Plot
		const curveSvg = svgFunctionCurvePlot({
			xMin: 0,
			xMax: domainMax,
			yMin: 0,
			yMax: Math.max(a + 1, domainMax),
			fn: (x: number) => (a * x + L2) / (x + a),
			curveLabel: '(C_f)',
			asymptotes: [{ kind: 'horizontal', value: a, label: `y = ${a}`, color: '#dc2626' }],
			points: [
				{ x: 0, y: L2 / a, label: `A(0, ${f0Katex})`, color: '#15803d' },
				{ x: L, y: L, label: `E(${L}, ${L})`, color: '#dc2626' }
			],
			width: 380,
			height: 250
		});
		const curveUrl = saveSvgAsset(`2as_se_t3_prob_curve_${difficulty}_s${seed}`, curveSvg);

		const fTypst = `frac(${linearTypst(a, L2, 'x')}, x + ${a})`;
		const fKatex = `\\frac{${linearKatex(a, L2, 'x')}}{x + ${a}}`;

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `في المسألة الشاملة لدراسة الدالة $f(x) = ${fKatex}$ على المجال $[0 ; ${domainMax}]$ والمتتالية التراجعية المرفقة $u_0 = 0$ و $u_{n+1} = f(u_n)$:\nاحسب نهاية المتتالية $(u_n)$ عندما يؤول $n$ إلى $+\infty$ (أي فاصلة النقطة الصامدة $L$ التي يتقاطع عندها المنحنى $(C_f)$ مع المنصف الأول $y = x$):`,
				questionTextAr: `احسب نهاية المتتالية $\\lim_{n \\to +\\infty} u_n$:`,
				imageUrl: curveUrl,
				imageCaption: 'المنحنى البياني للدالة (C_f) والنقطة الصامدة E(L, L)',
				questionData: {
					answer: L,
					displayTemplate: `lim u_n = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `حل المعادلة $f(x) = x$ في المجال $[0 ; ${domainMax}]$:\n$x(x + ${a}) = ${a}x + ${L2} \\iff x^2 + ${a}x = ${a}x + ${L2} \\iff x^2 = ${L2}$.\nبما أن $x \\ge 0$ فإن الحل الموجب الوحيد هو $x = ${L}$.\nالمتتالية متزايدة ومحدودة من الأعلى بالعدد $${L}$، ونهايتها هي $L = ${L}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'التمرين الرابع — المسألة الشاملة',
				instruction: `نعتبر الدالة العددية $f$ المعرفة على المجال $I = [0, ${domainMax}]$ بـ:\n$f(x) = ${fTypst}$\nيُرمز لـ $(C_f)$ بمنحناها البياني في معلَم متعامد ومتجانس $(O ; arrow(i), arrow(j))$، ولـ $(Delta)$ بالمستقيم ذي المعادلة $y = x$.`,
				content: [
					{
						type: 'text',
						content: `*الجزء الأول: دراسة تغيرات الدالة $f$ وخواصها البيانية (2.5 نقطة)*\n\n1) احسب المشتقة $f'(x)$ من أجل كل $x in I$، ثم استنتج اتجاه تغير الدالة $f$ على المجال $I$.\n2) احسب $f(0)$ و $f(${L})$ ، ثم حل في المجال $I$ المعادلة: $f(x) = x$.\n3) بيّن أنه من أجل كل $x in I$: $f(x) - x = frac(${L2} - x^2, x + ${a})$ ، ثم استنتج الوضع النسبي للمنحنى $(C_f)$ والمستقيم $(Delta)$ على المجال $I$.\n4) اكتب معادلة المماس $(T)$ للمنحنى $(C_f)$ عند النقطة ذات الفاصلة $x_0 = ${L}$.`,
						answer: `الجزء الأول:\n1) حساب المشتقة واتجاه التغير:\n- الدالة $f$ قابلة للاشتقاق على $I$ كدالة عقلانية مقامها لا ينعدم على $I$.\n- $f'(x) = frac(${a}(x + ${a}) - 1(${linearTypst(a, L2, 'x')}), (x + ${a})^2) = frac(${a} x + ${a * a} - ${a} x - ${L2}, (x + ${a})^2) = frac(${diffSq}, (x + ${a})^2)$.\n- بما أن $${diffSq} > 0$ والمقام مربع موجب قطعا، فإن $f'(x) > 0$ تماماً على $I$.\n- إذن الدالة $f$ متزايدة تماماً على المجال $I = [0, ${domainMax}]$.\n2) حساب الصور وحل المعادلة $f(x) = x$:\n- $f(0) = frac(${L2}, ${a}) = ${f0Typst}$ ، و $f(${L}) = frac(${a}(${L}) + ${L2}, ${L} + ${a}) = frac(${a * L + L2}, ${L + a}) = frac(${L}(${a + L}), ${L + a}) = ${L}$.\n- المعادلة $f(x) = x arrow.r.double frac(${linearTypst(a, L2, 'x')}, x + ${a}) = x arrow.r.double x(x + ${a}) = ${linearTypst(a, L2, 'x')}$.\n- ينتج $x^2 + ${a} x = ${a} x + ${L2} arrow.r.double x^2 = ${L2}$.\n- بما أن $x in [0, ${domainMax}]$، فإن الحل المقبول هو $x = ${L}$.\n3) الوضع النسبي:\n- $f(x) - x = frac(${linearTypst(a, L2, 'x')}, x + ${a}) - x = frac(${linearTypst(a, L2, 'x')} - x^2 - ${a} x, x + ${a}) = frac(${L2} - x^2, x + ${a})$.\n- إشارة الفرق من إشارة $(${L} - x)(${L} + x)$:\n  • على المجال $[0, ${L}[$: $f(x) - x > 0$، فالمنحنى $(C_f)$ يقع فوق المستقيم $(Delta)$.\n  • عند $x = ${L}$: المنحنى $(C_f)$ يقطع المستقيم $(Delta)$ في النقطة $E(${L}, ${L})$.\n  • على المجال $]${L}, ${domainMax}]$: $f(x) - x < 0$، فالمنحنى $(C_f)$ يقع تحت المستقيم $(Delta)$.\n4) معادلة المماس $(T)$ عند $x_0 = ${L}$:\n- معامل التوجيه: $f'(${L}) = frac(${diffSq}, (${L} + ${a})^2) = frac(${diffSq}, ${(L + a) * (L + a)}) = frac(${a - L}, ${a + L})$.\n- معادلة المماس: $y = f'(${L})(x - ${L}) + f(${L}) = frac(${a - L}, ${a + L})(x - ${L}) + ${L}$.`,
						mark: '2.5'
					},
					{
						type: 'image',
						src: curveUrl,
						caption: 'المنحنى البياني (C_f) والمستقيم y = x والمستقيم المقارب الأفقي y = a'
					},
					{
						type: 'text',
						content: `*الجزء الثاني: دراسة المتتالية التراجعية المرفقة والتقارب (3 نقاط)*\n\nنعتبر المتتالية العددية $(u_n)_(n in bb(N))$ المعرفة بـ $u_0 = 0$ ومن أجل كل $n in bb(N)$: $u_(n+1) = f(u_n)$.\n\n1) مثّل على محور الفواصل الحدود $u_0$ ، $u_1$ ، $u_2$ و $u_3$ باستعمال المنحنى $(C_f)$ والمنصف الأول $(Delta)$ (دون حسابها)، ثم ضع تخميناً حول اتجاه تغير المتتالية $(u_n)$ وتقاربها.\n2) احسب القيمة المضبوطة للحدين $u_1$ و $u_2$.\n3) باستعمال اتجاه تغير الدالة $f$ ونتائج الوضع النسبي، برّر أن المتتالية $(u_n)$ متزايدة تماماً ومحدودة من الأعلى بالعدد $${L}$.\n4) بيّن أنه من أجل كل $n in bb(N)$: $${L} - u_(n+1) = frac(${a - L}, u_n + ${a}) (${L} - u_n)$ ، ثم استنتج أن المتتالية متقاربة واحسب $lim_(n arrow.r +oo) u_n$.`,
						answer: `الجزء الثاني:\n1) التمثيل البياني والتخمين:\n- انطلاقاً من $u_0 = 0$، نصعد عمودياً إلى $(C_f)$ لنعين الترتيبة $u_1 = f(0)$، ثم ننتقل أفقياً إلى $(Delta)$ لنسقط $u_1$ على محور الفواصل، ونكرر العملية لتعيين $u_2$ و $u_3$.\n- التخمين: نلاحظ أن $0 = u_0 < u_1 < u_2 < u_3 < ${L}$، فنخمن أن المتتالية $(u_n)$ متزايدة تماماً ومتقاربة نحو فاصلة نقطة التقاطع $L = ${L}$.\n2) حساب $u_1$ و $u_2$:\n- $u_1 = f(u_0) = f(0) = ${f0Typst}$.\n- $u_2 = f(u_1) = frac(${a}(${f0Typst}) + ${L2}, ${f0Typst} + ${a}) = frac(${L2} + ${L2}, frac(${L2} + ${a * a}, ${a})) = frac(2 times ${L2} times ${a}, ${a * a + L2}) = ${u2Typst}$.\n3) التبرير:\n- بما أن $u_0 = 0 < u_1 = ${f0Typst} < ${L}$ والدالة $f$ متزايدة تماماً على المجال $[0, ${L}]$ مع $f([0, ${L}]) = [${f0Typst}, ${L}] subset [0, ${L}]$:\n  فإن المتتالية متزايدة تماماً ومحدودة من الأعلى بالعدد $${L}$ (لأن $(C_f)$ يقع فوق $(Delta)$ على المجال $[0, ${L}[$).\n4) الانكماش وحساب النهاية:\n- لدينا: $${L} - u_(n+1) = ${L} - frac(${linearTypst(a, L2, 'u_n')}, u_n + ${a}) = frac(${L}(u_n + ${a}) - (${linearTypst(a, L2, 'u_n')}), u_n + ${a}) = frac(${L} u_n + ${a * L} - ${a} u_n - ${L2}, u_n + ${a}) = frac(${a - L}(${L} - u_n), u_n + ${a})$.\n- بما أن $u_n >= 0$ فإن $u_n + ${a} >= ${a}$، وبالتالي: $0 < ${L} - u_(n+1) <= frac(${a - L}, ${a}) (${L} - u_n)$.\n- بوضع $k = frac(${a - L}, ${a}) < 1$ وتكرار المتباينة نجد: $0 < ${L} - u_n <= k^n (${L} - u_0) = ${L} times k^n$.\n- بما أن $lim_(n arrow.r +oo) k^n = 0$ (لأن $0 < k < 1$)، فإن بنظرية الحصر: $lim_(n arrow.r +oo) (${L} - u_n) = 0$.\n- إذن المتتالية $(u_n)$ متقاربة ونهايتها هي: $lim_(n arrow.r +oo) u_n = ${L}$.`,
						mark: '3'
					},
					{
						type: 'text',
						content: `*الجزء الثالث: تطبيق في الاستمثال والنمذجة الواقعية (1.5 نقطة)*\n\nفي وحدة صناعية لإنتاج المحاليل الصيدلانية، تُمثل $u_n$ كمية المادة الفعالة المستخلصة (بالغرام في اللتر $upright("g/L")$) بعد إنجاز الدورة رقم $n$ من المعالجة والتنقية.\n\n1) ما هي القيمة الحدية النظرية القصوى لكمية المادة المستخلصة التي تستقر عندها العملية عند تكرار دورات المعالجة لعدد كبير من المرات؟\n2) تشترط معايير الجودة الصيدلانية بلوغ تركيز لا يقل عن $${thresholdVal}\\,upright("g/L")$ لاعتماد الدفعة المنتجة. هل تكفي دورتان ($n = 2$) لتحقيق هذا الشرط؟ برّر إجابتك بحساب القيمة العشرية المقربة لـ $u_2$.`,
						answer: `الجزء الثالث:\n1) القيمة الحدية النظرية المستقرة:\n- القيمة المستقرة لكمية المادة الفعالة على المدى الطويل توافق نهاية المتتالية $(u_n)$ عندما يؤول $n$ إلى $+oo$.\n- إذن القيمة الحدية القصوى هي $L = ${L} upright("g/L")$.\n2) فحص شرط الجودة بعد دورتين ($n = 2$):\n- لدينا القيمة المضبوطة بعد دورتين هي: $u_2 = ${u2Typst} upright("g/L")$.\n- بالقيمة العشرية المقربة: $u_2 approx ${u2Val.toFixed(3)} upright("g/L")$.\n- بمقارنة القيمة مع العتبة المطلوبة ($${thresholdVal} upright("g/L")$):\n  نلاحظ أن $u_2 approx ${u2Val.toFixed(3)} ${u2Val >= thresholdVal ? '>= ' + thresholdVal : '< ' + thresholdVal}$.\n  إذن ${u2Val >= thresholdVal ? 'دورتان تكفيان لتحقيق معايير الجودة الصيدلانية المطلوبة.' : 'دورتان غير كافيتين، ويتعين إجراء دورة ثالثة على الأقل لبلوغ العتبة المحددة.'}`,
						mark: '1.5'
					}
				]
			},
			hints: [
				`لحساب مشتقة دالة كسرية استخدم $(u/v)' = (u'v - uv') / v^2$، والحلول المشتركة مع المستقيم $y = x$ توافق النقط الصامدة $f(x) = x$.`,
				`في دراسة المتتالية التراجعية، انطلق من $L - u_{n+1}$ لتوحيد المقامات وإظهار عامل الانكماش بدلالة $(L - u_n)$.`,
				`في التطبيق الواقعي، قارن القيمة العشرية لـ $u_2$ مع العتبة المطلوبة مباشرة لمعرفة كفاية دورتين.`
			],
			solutionStepsAr: [
				`دراسة إشارة المشتقة $f'(x) = \\frac{${diffSq}}{(x + ${a})^2} > 0$ وحل $f(x) = x \\implies x = ${L}$.`,
				`التمثيل البياني لحدود المتتالية على محور الفواصل وملاحظة تقاربها نحو $L = ${L}$.`,
				`إثبات علاقة الانكماش $0 < ${L} - u_{n+1} \\le \\frac{${a - L}}{${a}} (${L} - u_n)$ واستنتاج $\\lim_{n \\to +\\infty} u_n = ${L}$.`,
				`التطبيق الصيدلاني: القيمة القصوى المستقرة هي $${L}\\,\\text{g/L}$، ومقارنة $u_2$ مع العتبة $${thresholdVal}\\,\\text{g/L}$.`
			],
			finalAnswer: `${L}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 3 Parameterized Templates for 2AS Shared Core
// ═══════════════════════════════════════════════════════════════════════════════

export const SHARED_TEMPLATES_2AS_T3: ParameterizedTemplate[] = [
	tplSequencesMonotonicity,
	tplArithmeticSum,
	tplGeometricConvergence,
	tplSpaceVectorsCoplanarity,
	tplSpaceSphereDistance,
	tplProblemSynthesis
];
