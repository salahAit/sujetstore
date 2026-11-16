import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate } from '../../types';
import { buildUniqueMcqOptions, gcd, lcm, SeededRng } from '../../rng';
import { saveSvgAsset } from '../../svg-helpers';
import { svgFunctionCurvePlot, svgVariationTable } from '../../svg-secondary';

// ═══════════════════════════════════════════════════════════════════════════════
// Dual Syntax Helpers (KaTeX for Quiz / Hints, Typst for SujetExercise)
// ═══════════════════════════════════════════════════════════════════════════════

interface PrimeFactor {
	p: number;
	exp: number;
}

function primeFactorize(n: number): PrimeFactor[] {
	let val = Math.trunc(Math.abs(n));
	const factors: PrimeFactor[] = [];
	let d = 2;
	while (d * d <= val) {
		if (val % d === 0) {
			let count = 0;
			while (val % d === 0) {
				count++;
				val = Math.floor(val / d);
			}
			factors.push({ p: d, exp: count });
		}
		d = d === 2 ? 3 : d + 2;
	}
	if (val > 1) {
		factors.push({ p: val, exp: 1 });
	}
	return factors;
}

function formatFactorsKatex(factors: PrimeFactor[]): string {
	if (factors.length === 0) return '1';
	return factors.map((f) => (f.exp === 1 ? `${f.p}` : `${f.p}^{${f.exp}}`)).join(' \\times ');
}

function formatFactorsTypst(factors: PrimeFactor[]): string {
	if (factors.length === 0) return '1';
	return factors.map((f) => (f.exp === 1 ? `${f.p}` : `${f.p}^${f.exp}`)).join(' times ');
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Prime Factorization, PGCD, PPCM & Classification of Numbers (Sequence 1)
// ═══════════════════════════════════════════════════════════════════════════════

const tplSetsPrimesPgcd: ParameterizedTemplate = {
	id: 'tpl_1as_tcst_t1_sets_primes_pgcd',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'مجموعات الأعداد والتحليل إلى جداء عوامل أولية و PGCD / PPCM',
	curriculumLessonId: 'lesson_1as_tcst_t1_number_sets_primes',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		let a: number;
		let b: number;

		if (difficulty === 'easy') {
			const pairs: [number, number][] = [
				[120, 180],
				[140, 210],
				[180, 270],
				[90, 150],
				[160, 240],
				[100, 250],
				[84, 126],
				[108, 144]
			];
			[a, b] = rng.pick(pairs);
		} else if (difficulty === 'medium') {
			const pairs: [number, number][] = [
				[252, 336],
				[360, 540],
				[280, 420],
				[315, 495],
				[216, 288],
				[300, 450],
				[420, 560],
				[396, 528]
			];
			[a, b] = rng.pick(pairs);
		} else {
			const pairs: [number, number][] = [
				[504, 756],
				[540, 810],
				[630, 945],
				[528, 792],
				[660, 990],
				[720, 1080],
				[588, 882],
				[840, 1260]
			];
			[a, b] = rng.pick(pairs);
		}

		const g = gcd(a, b);
		const l = lcm(a, b);
		const p = Math.floor(a / g);
		const q = Math.floor(b / g);

		const factsA = primeFactorize(a);
		const factsB = primeFactorize(b);
		const factsG = primeFactorize(g);
		const factsL = primeFactorize(l);

		// Smallest natural k > 0 such that k * a is a perfect square
		const k = factsA
			.filter((f) => f.exp % 2 !== 0)
			.reduce((acc, f) => acc * f.p, 1);
		const sqrtKa = Math.round(Math.sqrt(k * a));

		// Classify fraction a / b in N, D, Q
		let tempQ = q;
		while (tempQ % 2 === 0) tempQ = Math.floor(tempQ / 2);
		while (tempQ % 5 === 0) tempQ = Math.floor(tempQ / 5);
		const isDec = tempQ === 1;

		const setSymbolKatex = q === 1 ? '\\mathbb{N}' : isDec ? '\\mathbb{D}' : '\\mathbb{Q}';
		const setSymbolTypst = q === 1 ? 'bb(N)' : isDec ? 'bb(D)' : 'bb(Q)';
		const setReasonAr =
			q === 1
				? 'الكسر يختزل إلى عدد طبيعي مقامه 1'
				: isDec
					? 'مقام الكسر بعد الاختزال يكتب على الشكل 2^alpha times 5^beta فقط'
					: 'مقام الكسر بعد الاختزال يحتوي على عوامل أولية غير 2 و 5';

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `باستعمال التحليل إلى جداء عوامل أولية، احسب القاسم المشترك الأكبر للعددين $${a}$ و $${b}$، أي $\\text{PGCD}(${a} ; ${b})$:`,
				questionTextAr: `احسب $\\text{PGCD}(${a} ; ${b})$:`,
				questionData: {
					answer: g,
					displayTemplate: `PGCD(${a} ; ${b}) = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `تحليل العددين إلى جداء عوامل أولية:\n$${a} = ${formatFactorsKatex(factsA)}$ و $${b} = ${formatFactorsKatex(factsB)}$.\nالقاسم المشترك الأكبر هو جداء العوامل الأولية المشتركة بأصغر أس: $\\text{PGCD}(${a} ; ${b}) = ${formatFactorsKatex(factsG)} = ${g}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نعتبر العددين الطبيعيين $a = ${a}$ و $b = ${b}$:`,
				content: [
					{
						type: 'text',
						content: `1) فكّك كلاً من العددين $a$ و $b$ إلى جداء عوامل أولية.`,
						answer: `1) التحليل إلى جداء عوامل أولية:\n- $a = ${a} = ${formatFactorsTypst(factsA)}$\n- $b = ${b} = ${formatFactorsTypst(factsB)}$`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) احسب القاسم المشترك الأكبر $upright("PGCD")(a, b)$ والمضاعف المشترك الأصغر $upright("PPCM")(a, b)$.`,
						answer: `2) باستعمال التحليل:\n- $upright("PGCD")(a, b) = ${formatFactorsTypst(factsG)} = ${g}$\n- $upright("PPCM")(a, b) = ${formatFactorsTypst(factsL)} = ${l}$`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) اكتب الكسر $frac(a, b)$ على شكل غير قابل للاختزال، ثم عيّن أصغر مجموعة ينتمي إليها هذا العدد من بين المجموعات $bb(N) subset bb(Z) subset bb(D) subset bb(Q) subset bb(R)$ مع التعليل.`,
						answer: `3) الكسر غير القابل للاختزال هو $frac(a, b) = frac(${a}, ${b}) = frac(${p}, ${q})$.\nأصغر مجموعة ينتمي إليها هي $${setSymbolTypst}$ لأن ${setReasonAr}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `4) عيّن أصغر عدد طبيعي غير معدوم $k$ بحيث يكون $k times a$ مربعاً لعدد طبيعي (أي $sqrt(k times a) in bb(N)$).`,
						answer: `4) لكي يكون $k times a$ مربعاً تاماً، يجب أن تكون أسس عوامله الأولية زوجية.\nمن تحليل $a = ${formatFactorsTypst(factsA)}$، نجد: $k = ${k}$، ويكون $sqrt(${k} times ${a}) = sqrt(${k * a}) = ${sqrtKa} in bb(N)$.`,
						mark: '1'
					}
				]
			},
			hints: [
				`فكّك كل عدد بقسمته المتتالية على الأعداد الأولية $2, 3, 5, 7, \\dots$`,
				`$\\text{PGCD}$ هو جداء العوامل المشتركة بأصغر أس، بينما $\\text{PPCM}$ هو جداء العوامل المشتركة وغير المشتركة بأكبر أس.`,
				`يكون الكسر عشرياً إذا وفقط إذا كان مقامه بعد الاختزال لا يحتوي على عوامل أولية غير $2$ و $5$.`
			],
			solutionStepsAr: [
				`تحليل العددين: $a = ${formatFactorsKatex(factsA)}$ و $b = ${formatFactorsKatex(factsB)}$.`,
				`القاسم المشترك الأكبر: $\\text{PGCD}(a, b) = ${g}$، والمضاعف المشترك الأصغر: $\\text{PPCM}(a, b) = ${l}$.`,
				`الكسر المختزل هو $\\frac{${p}}{${q}}$ وينتمي إلى $${setSymbolKatex}$. وقيمة $k$ الأصغر هي $${k}$.`
			],
			finalAnswer: `${g}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Order in R, Intervals, Distance & Absolute Value (Sequence 2)
// ═══════════════════════════════════════════════════════════════════════════════

const tplOrderIntervalsAbs: ParameterizedTemplate = {
	id: 'tpl_1as_tcst_t1_order_intervals_abs',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'الترتيب في R والمجالات وحساب المسافة والقيمة المطلقة',
	curriculumLessonId: 'lesson_1as_tcst_t1_order_intervals_absolute_value',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const a1 = rng.int(-8, -3);
		const b1 = rng.int(-2, 1);
		const a2 = rng.int(3, 6);
		const b2 = rng.int(7, 11);

		const c = rng.int(-2, 4);
		const r = rng.int(2, 5);
		const xLeft = c - r;
		const xRight = c + r;

		const p1 = c;
		const p2 = c + r + 2;

		const correctIntervalKatex = `[${b1} ; ${a2}]`;
		const distractor1Katex = `[${a1} ; ${b2}]`;
		const distractor2Katex = `[${a1} ; ${b1}]`;
		const distractor3Katex = `[${a2} ; ${b2}]`;

		const mcq = buildUniqueMcqOptions(
			correctIntervalKatex,
			[
				{ text: distractor1Katex, diagnosticFeedback: 'هذا يمثل اتحاد المجالين I ∪ J وليس تقاطعهما I ∩ J.' },
				{ text: distractor2Katex, diagnosticFeedback: 'هذا الجزء لا ينتمي للمجال الثاني J.' },
				{ text: distractor3Katex, diagnosticFeedback: 'هذا الجزء لا ينتمي للمجال الأول I.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `عيّن تقاطع المجالين $I = [${a1} ; ${a2}]$ و $J = [${b1} ; ${b2}]$:`,
				questionTextAr: `عيّن تقاطع المجالين $I \\cap J$:`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `تقاطع المجالين $I \\cap J$ هو مجموعة العناصر المشتركة بينهما، أي الأعداد التي تحقق في آن واحد $${a1} \\le x \\le ${a2}$ و $${b1} \\le x \\le ${b2}$. إذن $I \\cap J = [${b1} ; ${a2}]$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نعتبر المجالين $I = [${a1}, ${a2}]$ و $J = [${b1}, ${b2}]$ من $bb(R)$:`,
				content: [
					{
						type: 'text',
						content: `1) عيّن كلاً من $I sect J$ و $I union J$ مع تمثيلهما على المستقيم العددي.`,
						answer: `1) بتعيين العناصر المشتركة واتحاد المجالات:\n- التقاطع: $I sect J = [${b1}, ${a2}]$\n- الاتحاد: $I union J = [${a1}, ${b2}]$`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) ليكن $x in bb(R)$ حيث $${xLeft} <= x <= ${xRight}$.\n- احسب مركز هذا المجال $c$ ونصف قطره $r$.\n- عبّر عن هذا الحصر باستعمال المسافة والقيمة المطلقة.`,
						answer: `2) حساب عناصر المجال:\n- المركز: $c = frac(${xLeft} + ${xRight}, 2) = ${c}$\n- نصف القطر: $r = frac(${xRight} - (${xLeft}), 2) = ${r}$\n- بالمسافة: $d(x, ${c}) <= ${r}$\n- بالقيمة المطلقة: $|x - ${c}| <= ${r}$`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) اكتب العبارة $E(x) = |x - ${p1}| + |x - ${p2}|$ دون رمز القيمة المطلقة حسب قيم $x$ في $bb(R)$.`,
						answer: `3) بدراسة إشارة ما داخل القيمة المطلقة، نلخص عبارة $E(x)$:\n- إذا كان $x in ]-oo, ${p1}]$: $E(x) = - (x - ${p1}) - (x - ${p2}) = -2x + ${p1 + p2}$\n- إذا كان $x in [${p1}, ${p2}]$: $E(x) = (x - ${p1}) - (x - ${p2}) = ${p2 - p1}$\n- إذا كان $x in [${p2}, +oo[$: $E(x) = (x - ${p1}) + (x - ${p2}) = 2x - ${p1 + p2}$`,
						mark: '1'
					}
				]
			},
			hints: [
				`تقاطع مجالين هو العناصر المشتركة، بينما الاتحاد يضم جميع عناصر المجالين معاً.`,
				`مركز المجال هو $c = \\frac{a+b}{2}$ ونصف قطره هو $r = \\frac{b-a}{2}$، والعلاقة هي $|x - c| \\le r$.`,
				`لكتابة عبارة دون رمز القيمة المطلقة، ادرس إشارة كل حد داخل القيمة المطلقة في جدول منظم.`
			],
			solutionStepsAr: [
				`التقاطع $I \\cap J = [${b1} ; ${a2}]$ والاتحاد $I \\cup J = [${a1} ; ${b2}]$.`,
				`المركز $c = ${c}$ ونصف القطر $r = ${r}$، ومنه $|x - ${c}| \\le ${r}$.`,
				`كتابة $E(x)$ دون قيمة مطلقة عبر المجالات الثلاثة.`
			],
			finalAnswer: `[${b1} ; ${a2}]`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Framing Rules, Inequalities & Binomial Sign Table (Sequence 2)
// ═══════════════════════════════════════════════════════════════════════════════

const tplFramingInequalities: ParameterizedTemplate = {
	id: 'tpl_1as_tcst_t1_framing_inequalities',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'algebra',
	titleAr: 'قواعد الحصر والمتباينات ودراسة إشارة ثنائي الحد',
	curriculumLessonId: 'lesson_1as_tcst_t1_inequalities_framing_approximations',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const x1 = rng.int(2, 4);
		const x2 = x1 + rng.int(2, 4);
		const y1 = rng.int(1, 3);
		const y2 = y1 + rng.int(2, 4);

		// Sum, difference, product
		const sumMin = x1 + y1;
		const sumMax = x2 + y2;
		const diffMin = x1 - y2;
		const diffMax = x2 - y1;
		const prodMin = x1 * y1;
		const prodMax = x2 * y2;

		// Linear expression E = 2x - 3y + 4
		const eMin = 2 * x1 - 3 * y2 + 4;
		const eMax = 2 * x2 - 3 * y1 + 4;

		// Product inequality P(x) = (x - r1)(x - r2) <= 0
		const r1 = rng.int(-4, -1);
		const r2 = rng.int(2, 5);

		const correctKatex = `${diffMin} < x - y < ${diffMax}`;
		const distractor1Katex = `${x1 - y1} < x - y < ${x2 - y2}`;
		const distractor2Katex = `${y1 - x2} < x - y < ${y2 - x1}`;
		const distractor3Katex = `${sumMin} < x - y < ${sumMax}`;

		const mcq = buildUniqueMcqOptions(
			correctKatex,
			[
				{
					text: distractor1Katex,
					diagnosticFeedback: 'خطأ شائع! لا يجوز طرح المتباينات طرفاً لطرف، بل نضرب حصر y في -1 ثم نجمع.'
				},
				{
					text: distractor2Katex,
					diagnosticFeedback: 'هذا يمثل تقريبياً حصر y - x وليس x - y.'
				},
				{
					text: distractor3Katex,
					diagnosticFeedback: 'هذا يمثل حصر المجموع x + y وليس حصر الفرق.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `ليكن $${x1} < x < ${x2}$ و $${y1} < y < ${y2}$. أوجد حصر الفرق $x - y$:`,
				questionTextAr: `أوجد حصر الفرق $x - y$:`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `لحصر $x - y$ نكتبه على شكل مجموع: $x - y = x + (-y)$.\nبضرب حصر $y$ في $-1$ تنعكس المتباينات: $-${y2} < -y < -${y1}$.\nبالجمع طرفاً لطرف مع حصر $x$: $${x1} + (-${y2}) < x - y < ${x2} + (-${y1})$، أي $${diffMin} < x - y < ${diffMax}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `ليكن $x$ و $y$ عددين حقيقيين حيث: $${x1} < x < ${x2}$ و $${y1} < y < ${y2}$.`,
				content: [
					{
						type: 'text',
						content: `1) أوجد حصرًا لكل من الأعداد الآتية: $x + y$ ، $x - y$ ، $x y$ ، و $frac(x, y)$.`,
						answer: `1) تطبيق قواعد الحصر:\n- المجموع: $${sumMin} < x + y < ${sumMax}$\n- الفرق: بما أن $-${y2} < -y < -${y1}$ فإن $${diffMin} < x - y < ${diffMax}$\n- الجداء: بما أن الأعداد موجبة فإن $${prodMin} < x y < ${prodMax}$\n- الحاصل: بما أن $frac(1, ${y2}) < frac(1, y) < frac(1, ${y1})$ فإن $frac(${x1}, ${y2}) < frac(x, y) < frac(${x2}, ${y1})$`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) أوجد حصرًا للعبارة الجبرية $E = 2x - 3y + 4$.`,
						answer: `2) حصر $E$:\n- لدينا $${2 * x1} < 2x < ${2 * x2}$\n- ولدينا $-${3 * y2} < -3y < -${3 * y1}$\n- بالجمع وإضافة 4: $${eMin} < 2x - 3y + 4 < ${eMax}$`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) ادرس في جدول إشارة العبارة $P(x) = (x ${r1 >= 0 ? '- ' + r1 : '+ ' + Math.abs(r1)})(x - ${r2})$.`,
						answer: `3) تنعدم العبارة عند $x = ${r1}$ و $x = ${r2}$:\n- تكون سالبة داخل مجال الجذرين: $x in [${r1}, ${r2}]$\n- وتكون موجبة خارج مجال الجذرين: $x in ]-oo, ${r1}] union [${r2}, +oo[$`,
						mark: '1'
					},
					{
						type: 'text',
						content: `4) استنتج في $bb(R)$ مجموعة حلول المتراجحة $P(x) <= 0$.`,
						answer: `4) من جدول الإشارة، حلول المتراجحة $P(x) <= 0$ هي المجال المغلق: $S = [${r1}, ${r2}]$.`,
						mark: '0.5'
					}
				]
			},
			hints: [
				`لا يجوز أبداً طرح المتباينات؛ بل نكتب الفرق $x - y = x + (-y)$ ونعكس اتجاه متباينة $y$.`,
				`لحصر $x/y$ نضرب حصر $x$ في حصر المقلوب $1/y$.`,
				`إشارة ثنائي الحد $ax + b$ تكون عكس إشارة $a$ قبل الجذر ونفس إشارة $a$ بعد الجذر.`
			],
			solutionStepsAr: [
				`حصر الفرق هو $${diffMin} < x - y < ${diffMax}$ وحصر الجداء هو $${prodMin} < x y < ${prodMax}$.`,
				`حصر العبارة $E$ هو $${eMin} < E < ${eMax}$.`,
				`مجموعة حلول المتراجحة $P(x) \\le 0$ هي المجال $[${r1} ; ${r2}]$.`
			],
			finalAnswer: `[${r1} ; ${r2}]`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Function Domain, Rate of Change & Monotonicity (Sequence 3)
// ═══════════════════════════════════════════════════════════════════════════════

const tplFunctionDomainVariation: ParameterizedTemplate = {
	id: 'tpl_1as_tcst_t1_function_domain_variation',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'analysis',
	titleAr: 'مجموعة تعريف دالة ونسبة التزايد واتجاه التغير وجدول التغيرات',
	curriculumLessonId: 'lesson_1as_tcst_t1_functions_generalities_graphs_monotonicity',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const alpha = rng.int(-2, 3);
		const beta = rng.int(-3, 5);
		const a = rng.pick([1, -1, 2]);

		// f(x) = a(x - alpha)^2 + beta = a x^2 - 2 a alpha x + (a alpha^2 + beta)
		const bCoeff = -2 * a * alpha;
		const cCoeff = a * alpha * alpha + beta;

		const fTypstCoeffA = a === 1 ? 'x^2' : a === -1 ? '-x^2' : `${a} x^2`;
		const fTypstCoeffB =
			bCoeff > 0
				? `+ ${bCoeff === 1 ? 'x' : `${bCoeff} x`}`
				: bCoeff < 0
					? `- ${Math.abs(bCoeff) === 1 ? 'x' : `${Math.abs(bCoeff)} x`}`
					: '';
		const fTypstCoeffC =
			cCoeff > 0 ? `+ ${cCoeff}` : cCoeff < 0 ? `- ${Math.abs(cCoeff)}` : '';
		const fTypst = `${fTypstCoeffA} ${fTypstCoeffB} ${fTypstCoeffC}`.replace(/\s+/g, ' ').trim();

		const fKatex = fTypst.replaceAll('times', '\\times');

		const canonicalTypst =
			a === 1
				? `(x ${alpha >= 0 ? '- ' + alpha : '+ ' + Math.abs(alpha)})^2 ${beta >= 0 ? '+ ' + beta : '- ' + Math.abs(beta)}`
				: a === -1
					? `-(x ${alpha >= 0 ? '- ' + alpha : '+ ' + Math.abs(alpha)})^2 ${beta >= 0 ? '+ ' + beta : '- ' + Math.abs(beta)}`
					: `${a}(x ${alpha >= 0 ? '- ' + alpha : '+ ' + Math.abs(alpha)})^2 ${beta >= 0 ? '+ ' + beta : '- ' + Math.abs(beta)}`;

		// Calculate image of a test point
		const evalX = alpha + 1;
		const evalY = a * Math.pow(evalX - alpha, 2) + beta;

		const isConcaveUp = a > 0;
		const extremumTypeAr = isConcaveUp ? 'قيمة حدية صغرى' : 'قيمة حدية عظمى';

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `لتكن الدالة $f$ المعرفة على $\\mathbb{R}$ بـ $f(x) = ${fKatex}$. احسب صورة العدد $${evalX}$ بالدالة $f$، أي $f(${evalX})$:`,
				questionTextAr: `احسب $f(${evalX})$:`,
				questionData: {
					answer: evalY,
					displayTemplate: `f(${evalX}) = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `بالتعويض المباشر في عبارة الدالة:\n$f(${evalX}) = ${a} \\times (${evalX} ${alpha >= 0 ? '- ' + alpha : '+ ' + Math.abs(alpha)})^2 ${beta >= 0 ? '+ ' + beta : '- ' + Math.abs(beta)} = ${a} \\times 1 + ${beta} = ${evalY}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نعتبر الدالة العددية $f$ المعرفة على $bb(R)$ بـ: $f(x) = ${fTypst}$.`,
				content: [
					{
						type: 'text',
						content: `1) تحقق أنه من أجل كل عدد حقيقي $x$: $f(x) = ${canonicalTypst}$.`,
						answer: `1) بنشر العبارة النموذجية:\n$${canonicalTypst} = ${fTypst} = f(x)$. العبارة محققة.`,
						mark: '0.75'
					},
					{
						type: 'text',
						content: `2) احسب $f(0)$ و $f(${alpha})$، ثم عيّن سابقة العدد $${beta}$ بالدالة $f$.`,
						answer: `2) الحساب:\n- $f(0) = ${cCoeff}$\n- $f(${alpha}) = ${beta}$\n- لتعيين سابقة $${beta}$، نحل المعادلة $f(x) = ${beta} <=> ${a}(x - ${alpha})^2 = 0 <=> x = ${alpha}$. إذن سابقة $${beta}$ هي $${alpha}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) ليكن $x_1$ و $x_2$ عددين حقيقيين متمايزين. بيّن أن نسبة التزايد للدالة $f$ تُعطى بـ: $frac(f(x_1) - f(x_2), x_1 - x_2) = ${a === 1 ? '' : a === -1 ? '-' : `${a}`}(x_1 + x_2 ${-2 * alpha >= 0 ? '+ ' + (-2 * alpha) : '- ' + Math.abs(-2 * alpha)})$.`,
						answer: `3) حساب نسبة التزايد:\n$frac(f(x_1) - f(x_2), x_1 - x_2) = frac(${a}(x_1 - ${alpha})^2 - ${a}(x_2 - ${alpha})^2, x_1 - x_2) = ${a}(x_1 + x_2 - ${2 * alpha})$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `4) استنتج اتجاه تغير الدالة $f$ على كل من المجالين $]-oo, ${alpha}]$ و $[${alpha}, +oo[$.`,
						answer: `4) اتجاه التغير:\n${
							isConcaveUp
								? `- على $]-oo, ${alpha}]$: لدينا $x_1 + x_2 < ${2 * alpha}$، فتكون نسبة التزايد سالبة والدالة متناقصة تماماً.\n- على $[${alpha}, +oo[$: لدينا $x_1 + x_2 > ${2 * alpha}$، فتكون نسبة التزايد موجبة والدالة متزايدة تماماً.`
								: `- على $]-oo, ${alpha}]$: نسبة التزايد موجبة، والدالة متزايدة تماماً.\n- على $[${alpha}, +oo[$: نسبة التزايد سالبة، والدالة متناقصة تماماً.`
						}`,
						mark: '0.75'
					},
					{
						type: 'text',
						content: `5) شكّل جدول تغيرات الدالة $f$ على $bb(R)$ وعيّن قيمتها الحدية.`,
						answer: `5) الدالة تقبل ${extremumTypeAr} قيمتها $${beta}$ وتبلغها عند $x = ${alpha}$.`,
						mark: '0.5'
					}
				]
			},
			hints: [
				`انشر العبارة المقترحة للمطابقة مع العبارة المنشورة للدالة $f(x)$.`,
				`نسبة التزايد هي $\\frac{f(x_1) - f(x_2)}{x_1 - x_2}$؛ إذا كانت موجبة فالدالة متزايدة، وإذا كانت سالبة فالدالة متناقصة.`,
				`القيمة الحدية تظهر مباشرة عند ذروة القطع المكافئ $x = \\alpha$.`
			],
			solutionStepsAr: [
				`إثبات الشكل النموذجي: $f(x) = ${canonicalTypst.replaceAll('times', '\\times')}$.`,
				`حساب صورة $${evalX}$ بالتعويض المباشر: $f(${evalX}) = ${evalY}$.`,
				`دراسة اتجاه التغير وتحديد القيمة الحدية $${beta}$ عند $x = ${alpha}$.`
			],
			finalAnswer: `${evalY}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Function Parity & Extrema (Sequence 3)
// ═══════════════════════════════════════════════════════════════════════════════

const tplFunctionParityExtrema: ParameterizedTemplate = {
	id: 'tpl_1as_tcst_t1_function_parity_extrema',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'analysis',
	titleAr: 'شفعية دالة عددية والقيم الحدية المحلية والمطلقة',
	curriculumLessonId: 'lesson_1as_tcst_t1_functions_parity_extrema',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const a = rng.pick([1, 2, 3]);
		const c = rng.int(3, 10);

		const fTypst = `-${a === 1 ? '' : `${a} `}x^2 + ${c}`;
		const fKatex = `-${a === 1 ? '' : a}x^2 + ${c}`;

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `احسب القيمة الحدية العظمى للدالة $f$ المعرفة على $\\mathbb{R}$ بـ $f(x) = ${fKatex}$:` ,
				questionTextAr: `احسب القيمة الحدية العظمى للدالة $f$:`,
				questionData: {
					answer: c,
					displayTemplate: `M = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `من أجل كل عدد حقيقي $x$، لدينا $x^2 \\ge 0$ ومنه $-${a === 1 ? '' : a}x^2 \\le 0$، أي $-${a === 1 ? '' : a}x^2 + ${c} \\le ${c}$.\nوبما أن $f(0) = ${c}$، فإن الدالة تقبل قيمة حدية عظمى مطلقة هي $${c}$ وتُبلغ عند $x = 0$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نعتبر الدالة العددية $f$ المعرفة على $bb(R)$ بـ: $f(x) = ${fTypst}$.`,
				content: [
					{
						type: 'text',
						content: `1) بيّن أن مجموعة التعريف $D_f = bb(R)$ متناظرة بالنسبة إلى الصفر.`,
						answer: `1) مجموعة التعريف متناظرة لأن لكل $x in bb(R)$ فإن $-x in bb(R)$.`,
						mark: '0.5'
					},
					{
						type: 'text',
						content: `2) ادرس شفعية الدالة $f$، ثم فسّر النتيجة هندسياً بالنسبة لمنحناها البياني $(C_f)$.`,
						answer: `2) دراسة الشفعية:\n- لكل $x in bb(R)$: $f(-x) = -${a === 1 ? '' : `${a}`}(-x)^2 + ${c} = -${a === 1 ? '' : `${a}`}x^2 + ${c} = f(x)$\n- إذن الدالة $f$ دالة زوجية.\n- التفسير الهندسي: المنحنى البياني $(C_f)$ متناظر بالنسبة لمحور التراتيب.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) أثبت جبرياً أنه من أجل كل $x in bb(R)$: $f(x) <= ${c}$.`,
						answer: `3) البرهان الجبري:\n- لدينا لكل $x in bb(R)$: $x^2 >= 0$\n- بالضرب في $-${a}$: $-${a === 1 ? '' : `${a}`}x^2 <= 0$\n- بإضافة $${c}$: $-${a === 1 ? '' : `${a}`}x^2 + ${c} <= ${c}$، أي $f(x) <= ${c}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `4) استنتج القيمة الحدية العظمى للدالة $f$ على $bb(R)$ وعيّن القيمة التي تبلغها عندها، ثم حل في $bb(R)$ المعادلة $f(x) = ${c}$.`,
						answer: `4) الاستنتاج:\n- بما أن $f(x) <= ${c}$ و $f(0) = ${c}$، فإن القيمة الحدية العظمى للدالة $f$ على $bb(R)$ هي $${c}$ وتُبلغ عند $x = 0$.\n- المعادلة: $f(x) = ${c} <=> -${a === 1 ? '' : `${a}`}x^2 = 0 <=> x = 0$. مجموعة الحلول هي $S = {0}$.`,
						mark: '1'
					}
				]
			},
			hints: [
				`الشرط الأول للشفعية هو أن تكون مجموعة التعريف متناظرة بالنسبة إلى الصفر (إذا كان $x \\in D_f$ فإن $-x \\in D_f$).`,
				`تكون الدالة زوجية إذا كان $f(-x) = f(x)$، ويكون منحناها متناظراً بالنسبة لمحور التراتيب.`,
				`لإثبات أن $M$ قيمة حدية عظمى، بيّن أن $f(x) - M \\le 0$ لجميع $x$ مع وجود سابقة تحقق $f(x_0) = M$.`
			],
			solutionStepsAr: [
				`التحقق من تناظر مجموعة التعريف ودراسة $f(-x) = f(x)$ لإثبات أن الدالة زوجية.`,
				`التفسير الهندسي: المنحنى متناظر بالنسبة لمحور التراتيب.`,
				`البرهان أن $f(x) \\le ${c}$ واستنتاج أن القيمة الحدية العظمى هي $${c}$ عند $x = 0$.`
			],
			finalAnswer: `${c}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Comprehensive Analytical Problem (المسألة الشاملة — 8 Points)
// ═══════════════════════════════════════════════════════════════════════════════

const tplProblemSynthesis: ParameterizedTemplate = {
	id: 'tpl_1as_tcst_t1_problem_synthesis',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'المسألة الشاملة: دراسة تحليلية وبيانية لدالة مع ترييض مشكلة واستغلال المنحنى',
	curriculumLessonId: 'lesson_1as_tcst_t1_quadratic_homographic_intro_equations',
	isIntegration: true,
	defaultPoints: 8,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const alpha = rng.pick([2, 3, 4]);
		const beta = rng.pick([0, 2, 4]);

		// Maximum value M = f(alpha) = alpha^2 + beta
		const maxM = alpha * alpha + beta;
		const domainMax = 2 * alpha;

		// Intermediate target value k = maxM - delta^2 where delta = 1 or 2
		const delta = alpha >= 3 ? rng.pick([1, 2]) : 1;
		const kVal = maxM - delta * delta;
		const root1 = alpha - delta;
		const root2 = alpha + delta;

		const fTypst = `-x^2 + ${2 * alpha} x ${beta > 0 ? '+ ' + beta : ''}`.trim();
		const fKatex = `-x^2 + ${2 * alpha}x ${beta > 0 ? '+ ' + beta : ''}`.trim();

		// Generate curve plot SVG and save asset
		const curveSvg = svgFunctionCurvePlot({
			xMin: -1,
			xMax: domainMax + 1,
			yMin: Math.min(-1, beta - 2),
			yMax: maxM + 2,
			fn: (x: number) => -Math.pow(x - alpha, 2) + maxM,
			curveLabel: '(C_f)',
			points: [
				{ x: 0, y: beta, label: `A(0, ${beta})`, color: '#15803d' },
				{ x: alpha, y: maxM, label: `S(${alpha}, ${maxM})`, color: '#dc2626' },
				{ x: domainMax, y: beta, label: `B(${domainMax}, ${beta})`, color: '#15803d' }
			],
			width: 380,
			height: 250
		});
		const curveUrl = saveSvgAsset(`1as_tcst_t1_prob_curve_${difficulty}_s${seed}`, curveSvg);

		// Generate variation table SVG and save asset
		const varTableSvg = svgVariationTable({
			fnName: 'f(x)',
			derivName: 'اتجاه التغير',
			xValues: ['0', `${alpha}`, `${domainMax}`],
			derivativeRow: [
				{ kind: 'sign', value: '+' },
				{ kind: 'sign', value: '-' }
			],
			variations: [
				{ value: `${beta}`, position: 'bottom' },
				{ value: `${maxM}`, position: 'top' },
				{ value: `${beta}`, position: 'bottom' }
			]
		});
		const varTableUrl = saveSvgAsset(`1as_tcst_t1_prob_vartable_${difficulty}_s${seed}`, varTableSvg);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `في المسألة الشاملة لدراسة الدالة $f(x) = ${fKatex}$ على المجال $[0 ; ${domainMax}]$، احسب القيمة الحدية العظمى للدالة $f$:`,
				questionTextAr: `احسب القيمة الحدية العظمى للدالة $f$:`,
				imageUrl: curveUrl,
				imageCaption: 'المنحنى البياني للدالة (C_f)',
				questionData: {
					answer: maxM,
					displayTemplate: `M = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `الدالة $f(x) = -(x - ${alpha})^2 + ${maxM}$ تبلغ ذروتها عند $x = ${alpha}$، وقيمتها الحدية العظمى هي $M = f(${alpha}) = ${maxM}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'التمرين الرابع — المسألة الشاملة',
				instruction: `نعتبر الدالة العددية $f$ المعرفة على المجال $I = [0, ${domainMax}]$ بدستورها: $f(x) = ${fTypst}$.`,
				content: [
					{
						type: 'text',
						content: `*الجزء الأول: الدراسة التحليلية للدالة $f$ (3.5 نقطة)*\n\n1) تحقق أنه من أجل كل $x in [0, ${domainMax}]$: $f(x) = -(x - ${alpha})^2 + ${maxM}$.\n2) احسب $f(0)$ ، $f(${alpha})$ و $f(${domainMax})$.\n3) بيّن أن الدالة $f$ متزايدة تماماً على المجال $[0, ${alpha}]$ ومتناقصة تماماً على المجال $[${alpha}, ${domainMax}]$.\n4) شكّل جدول تغيرات الدالة $f$ على المجال $[0, ${domainMax}]$.`,
						answer: `1) التحقق بالنشر:\n$-(x - ${alpha})^2 + ${maxM} = -(x^2 - ${2 * alpha} x + ${alpha * alpha}) + ${maxM} = ${fTypst} = f(x)$.\n2) الحساب: $f(0) = ${beta}$ ، $f(${alpha}) = ${maxM}$ ، $f(${domainMax}) = ${beta}$.\n3) اتجاه التغير:\n- على $[0, ${alpha}]$: إذا كان $x_1 < x_2 <= ${alpha}$ فإن $(x_1 - ${alpha})^2 > (x_2 - ${alpha})^2$ ومنه $f(x_1) < f(x_2)$، فالدالة متزايدة تماماً.\n- على $[${alpha}, ${domainMax}]$: بالمثل نجد أنها متناقصة تماماً.\n4) جدول التغيرات موضح في الرسم أدناه.`,
						mark: '3.5'
					},
					{
						type: 'image',
						src: varTableUrl,
						caption: 'جدول تغيرات الدالة f'
					},
					{
						type: 'text',
						content: `*الجزء الثاني: الاستغلال والقراءة البيانية (2.5 نقطة)*\n\nيُمثَّل المنحنى البياني $(C_f)$ للدالة $f$ في معلم متعامد ومتجانس كما في الشكل المرفق.\n\n1) بقراءة بيانية، عيّن سوابق العدد $${beta}$ بالدالة $f$.\n2) حل بيانياً في المجال $[0, ${domainMax}]$ المعادلة $f(x) = ${kVal}$.\n3) حل بيانياً في المجال $[0, ${domainMax}]$ المتراجحة $f(x) >= ${kVal}$ مع تفسير النتيجة هندسياً.`,
						answer: `1) سوابق $${beta}$ هي فواصل نقط تقاطع المنحنى $(C_f)$ مع المستقيم $y = ${beta}$، وهي: $x = 0$ و $x = ${domainMax}$.\n2) حلول المعادلة $f(x) = ${kVal}$ هي فواصل نقط تقاطع المنحنى $(C_f)$ مع المستقيم الأفقي $y = ${kVal}$، ونجد بيانياً: $S = {${root1}, ${root2}}$.\n3) حلول المتراجحة $f(x) >= ${kVal}$ هي فواصل النقط من $(C_f)$ الواقعة فوق أو على المستقيم $y = ${kVal}$، ومجموعة الحلول هي المجال: $S = [${root1}, ${root2}]$.`,
						mark: '2.5'
					},
					{
						type: 'image',
						src: curveUrl,
						caption: 'المنحنى البياني للدالة (C_f)'
					},
					{
						type: 'text',
						content: `*الجزء الثالث: ترييض مشكلة واقعية واستمثال (2 نقطة)*\n\nتنتج ورشة حرفية أواني خزفية، حيث يمثل $x$ كمية الإنتاج بوحدات المئات ($x in [0, ${domainMax}]$ أي من $0$ إلى $${domainMax * 100}$ قطعة).\nيُعطى الربح الصافي الإجمالي المحقق (بآلاف الدنانير الجزائريّة DA) بالدالة: $R(x) = f(x) = ${fTypst}$.\n\n1) حدد كمية الإنتاج $x$ التي تجعل الربح أعظمياً، ثم احسب قيمة هذا الربح الأعظمي بالدينار الجزائري (DA).\n2) ما هو مجال كمية الإنتاج الذي يضمن للورشة تحقيق ربح لا يقل عن $${kVal}$ ألف دينار (أي $${kVal * 1000}$ DA)؟`,
						answer: `1) الربح الأعظمي يوافق ذروة المنحنى البياني، ويتحقق عند إنتاج $x = ${alpha}$ مائة قطعة (أي $${alpha * 100}$ قطعة)، وقيمة الربح الأعظمي هي $${maxM}$ ألف دينار، أي $${maxM * 1000}$ DA.\n2) يضمن تحقيق ربح لا يقل عن $${kVal}$ ألف دينار إذا وفقط إذا كان $R(x) >= ${kVal}$، وهو ما يوافق حلول المتراجحة في الجزء الثاني، أي عندما تكون كمية الإنتاج محصورة في المجال $[${root1}, ${root2}]$ بالمئات (أي من $${root1 * 100}$ إلى $${root2 * 100}$ قطعة).`,
						mark: '2'
					}
				]
			},
			hints: [
				`في الجزء الأول، انشر العبارة النموذجية $-(x - \\alpha)^2 + M$ لمطابقتها مع $f(x)$.`,
				`الحلول البيانية لمعادلة $f(x) = k$ هي فواصل نقط تقاطع المنحنى مع المستقيم الأفقي $y = k$.`,
				`في المسائل التطبيقية، اربط القيمة الحدية العظمى بالاستمثال الاقتصادي (أقصى ربح أو أقل تكلفة).`
			],
			solutionStepsAr: [
				`إثبات الشكل النموذجي $f(x) = -(x - ${alpha})^2 + ${maxM}$ وتشكيل جدول التغيرات.`,
				`القراءة البيانية لحلول المعادلة $f(x) = ${kVal}$ والمتراجحة $f(x) \\ge ${kVal}$ في المجال $[${root1} ; ${root2}]$.`,
				`التطبيق الاقتصادي: الربح الأعظمي هو $${maxM * 1000}$ DA عند إنتاج $${alpha * 100}$ قطعة.`
			],
			finalAnswer: `${maxM}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 1 Parameterized Templates for 1AS TCST
// ═══════════════════════════════════════════════════════════════════════════════

export const TEMPLATES_1AS_TCST_T1: ParameterizedTemplate[] = [
	tplSetsPrimesPgcd,
	tplOrderIntervalsAbs,
	tplFramingInequalities,
	tplFunctionDomainVariation,
	tplFunctionParityExtrema,
	tplProblemSynthesis
];
