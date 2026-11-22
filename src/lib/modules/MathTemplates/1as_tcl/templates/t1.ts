import type { ExerciseBlock } from '../../../SujetBuilder/types';
import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate } from '../../types';
import { buildUniqueMcqOptions, gcd, lcm, roundTo, SeededRng, simplifyFraction } from '../../rng';
import { saveSvgAsset, svgNumberLine } from '../../svg-helpers';

// ===========================================================================
// Helpers for 1AS TCL — Trimester 1 Templates (Dual Syntax: KaTeX vs Typst)
// ===========================================================================

const DIFF_SALT: Record<Difficulty, number> = {
	easy: 17,
	medium: 53,
	hard: 97
};

function makeRng(seed: number, salt: number, difficulty: Difficulty): SeededRng {
	const s = Math.trunc(seed);
	return new SeededRng(((s * 997 + salt * 131 + DIFF_SALT[difficulty]) >>> 0) || 1);
}

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

function buildMcqData(
	correctText: string,
	correctFeedback: string,
	distractors: { text: string; diagnosticFeedback: string }[],
	rng: SeededRng
) {
	const mcq = buildUniqueMcqOptions(correctText, distractors, rng);
	const diagnosticFeedback = mcq.options.map((opt, idx) =>
		idx === mcq.correctIndices[0]
			? correctFeedback
			: opt.diagnosticFeedback || 'راجع خطوات الحساب وتحقق من النتيجة.'
	);
	return {
		options: mcq.options,
		correctIndex: mcq.correctIndices[0],
		correctIndices: mcq.correctIndices,
		correctIndexes: mcq.correctIndices,
		diagnosticFeedback,
		shuffle: false
	};
}

// ===========================================================================
// 1. Prime Factorization, PGCD, PPCM & Book Distribution
// ===========================================================================

const tplPrimesPgcdPpcm: ParameterizedTemplate = {
	id: 'tpl_1as_tcl_t1_primes_pgcd_ppcm',
	grade: '1as_tcl',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'التحليل إلى جداء عوامل أولية و PGCD / PPCM واختزال الكسور',
	curriculumLessonId: 'lesson_1as_tcl_t1_divisors_multiples_primes_pgcd_ppcm',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 11, difficulty);

		const pairsByDiff: Record<Difficulty, [number, number][]> = {
			easy: [
				[60, 84],
				[72, 108],
				[84, 126],
				[90, 120],
				[96, 144]
			],
			medium: [
				[126, 180],
				[140, 210],
				[168, 252],
				[150, 225],
				[144, 216]
			],
			hard: [
				[360, 504],
				[420, 588],
				[315, 495],
				[540, 720],
				[450, 630]
			]
		};

		const [a, b] = rng.pick(pairsByDiff[difficulty]);
		const g = gcd(a, b);
		const l = lcm(a, b);
		const p = Math.floor(a / g);
		const q = Math.floor(b / g);

		const factsA = primeFactorize(a);
		const factsB = primeFactorize(b);
		const factsG = primeFactorize(g);
		const factsL = primeFactorize(l);

		let tempQ = q;
		while (tempQ % 2 === 0) tempQ = Math.floor(tempQ / 2);
		while (tempQ % 5 === 0) tempQ = Math.floor(tempQ / 5);
		const isDec = tempQ === 1;

		const setKatex = q === 1 ? '\\mathbb{N}' : isDec ? '\\mathbb{D}' : '\\mathbb{Q}';
		const setTypst = q === 1 ? 'bb(N)' : isDec ? 'bb(D)' : 'bb(Q)';
		const setReason =
			q === 1
				? 'مقام الكسر المختزل يساوي 1 فهو عدد طبيعي'
				: isDec
					? 'مقام الكسر المختزل لا يحوي في تحليله سوى العاملين الأوليين 2 أو 5'
					: 'مقام الكسر المختزل يحوي عاملاً أولياً يختلف عن 2 و 5';

		const correctOpt = `$${g}$`;
		const qd = buildMcqData(
			correctOpt,
			`إجابة صحيحة! العوامل المشتركة بأصغر أس تعطي $\\text{PGCD}(${a} ; ${b}) = ${formatFactorsKatex(factsG)} = ${g}$.`,
			[
				{
					text: `$${l}$`,
					diagnosticFeedback: `هذا يمثل المضاعف المشترك الأصغر $\\text{PPCM}(${a} ; ${b})$ وليس القاسم المشترك الأكبر.`
				},
				{
					text: `$${Math.max(2, Math.floor(g / 2))}$`,
					diagnosticFeedback: 'انتبه: أغفلت أحد العوامل الأولية المشتركة أو أخذت أساً أصغر من اللازم.'
				},
				{
					text: `$${g * 2}$`,
					diagnosticFeedback: 'تأكد من أخذ **أصغر** أس للعوامل الأولية المشتركة بين العددين.'
				},
				{
					text: `$${p + q}$`,
					diagnosticFeedback: 'القاسم المشترك الأكبر يحسب بجداء العوامل الأولية المشتركة بأصغر أس.'
				}
			],
			rng
		);

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر العددين الطبيعيين $a = ${a}$ و $b = ${b}$ .`,
			content: [
				{
					type: 'text',
					content: `1) حلّل كلاً من العددين $a$ و $b$ إلى جداء عوامل أولية.`,
					answer: `1) التحليل إلى جداء عوامل أولية:\n\n- $a = ${a} = ${formatFactorsTypst(factsA)}$\n\n- $b = ${b} = ${formatFactorsTypst(factsB)}$`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `2) احسب القاسم المشترك الأكبر $upright("PGCD")(a, b)$ والمضاعف المشترك الأصغر $upright("PPCM")(a, b)$.`,
					answer: `2) - $upright("PGCD")(a, b) = ${formatFactorsTypst(factsG)} = ${g}$ (العوامل المشتركة بأصغر أس).\n\n- $upright("PPCM")(a, b) = ${formatFactorsTypst(factsL)} = ${l}$ (جميع العوامل بأكبر أس).`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `3) اختزل الكسر $frac(a, b)$ ثم عيّن أصغر مجموعة عددية ينتمي إليها من بين $bb(N)$ و $bb(Z)$ و $bb(D)$ و $bb(Q)$ مع التعليل.`,
					answer: `3) الكسر المختزل هو $frac(${a}, ${b}) = frac(${a} div ${g}, ${b} div ${g}) = frac(${p}, ${q})$ .\n\nأصغر مجموعة عددية ينتمي إليها هي $${setTypst}$ لأن ${setReason}.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `4) تملك مكتبة الثانوية $${a}$ كتاباً في الأدب العربي و $${b}$ ديواناً شعرياً، وتريد توزيعها على أكبر عدد ممكن من الرفوف المتماثلة دون باقٍ. كم رفاً يمكن تكوينه؟ وما محتوى كل رف؟`,
					answer: `4) أكبر عدد ممكن من الرفوف هو $upright("PGCD")(${a}, ${b}) = ${g}$ رفاً.\n\nيحتوي كل رف على $${p}$ كتاباً في الأدب العربي و $${q}$ ديواناً شعرياً.`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `باستعمال التحليل إلى جداء عوامل أولية للعددين $${a} = ${formatFactorsKatex(factsA)}$ و $${b} = ${formatFactorsKatex(factsB)}$، ما هي قيمة $\\text{PGCD}(${a} ; ${b})$ ؟`,
				questionTextAr: `ما هي قيمة $\\text{PGCD}(${a} ; ${b})$ ؟`,
				questionData: qd,
				explanation: `نأخذ العوامل الأولية المشتركة بين $${a}$ و $${b}$ بأصغر أس: $\\text{PGCD}(${a} ; ${b}) = ${formatFactorsKatex(factsG)} = ${g}$ .`
			},
			sujetExercise,
			hints: [
				`اقسم كل عدد تباعاً على الأعداد الأولية الصغيرة $2$ ثم $3$ ثم $5$ ثم $7$.`,
				`$\\text{PGCD}$ هو جداء العوامل المشتركة بأصغر أس، و $\\text{PPCM}$ هو جداء جميع العوامل بأكبر أس.`,
				`لاختزال الكسر $\\frac{a}{b}$ اقسم كلاً من بسطه ومقامه على $\\text{PGCD}(a, b)$.`
			],
			solutionStepsAr: [
				`التحليل: $${a} = ${formatFactorsKatex(factsA)}$ و $${b} = ${formatFactorsKatex(factsB)}$.`,
				`$\\text{PGCD}(${a}, ${b}) = ${g}$ و $\\text{PPCM}(${a}, ${b}) = ${l}$.`,
				`الكسر المختزل هو $\\frac{${p}}{${q}} \\in ${setKatex}$، وأكبر عدد من الرفوف هو $${g}$ رفاً.`
			],
			finalAnswer: `${g}`
		};
	}
};

// ===========================================================================
// 2. Integer Powers, Scientific Notation & Order of Magnitude
// ===========================================================================

const tplPowersScientificNotation: ParameterizedTemplate = {
	id: 'tpl_1as_tcl_t1_powers_scientific_notation',
	grade: '1as_tcl',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'القوى الصحيحة والكتابة العلمية ورتبة مقدار عدد',
	curriculumLessonId: 'lesson_1as_tcl_t1_powers_scientific_notation_order_magnitude',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 22, difficulty);

		interface SciCase {
			c1: number;
			e1: number;
			c2: number;
			e2: number;
			d1: number;
			ed: number;
			mantissa: number;
			exp: number;
			basePow: number;
			m1: number;
			m2: number;
			m3: number;
		}

		const casesByDiff: Record<Difficulty, SciCase[]> = {
			easy: [
				{ c1: 3.6, e1: 5, c2: 2, e2: -2, d1: 1.5, ed: 2, mantissa: 4.8, exp: 1, basePow: 2, m1: 5, m2: -2, m3: 1 },
				{ c1: 4.5, e1: 4, c2: 2, e2: 3, d1: 2.5, ed: 4, mantissa: 3.6, exp: 3, basePow: 3, m1: 4, m2: -1, m3: 2 },
				{ c1: 2.4, e1: 6, c2: 3, e2: -1, d1: 1.2, ed: 3, mantissa: 6, exp: 2, basePow: 5, m1: 3, m2: 2, m3: 4 }
			],
			medium: [
				{ c1: 4.8, e1: 5, c2: 5, e2: -2, d1: 1.2, ed: 4, mantissa: 2, exp: 0, basePow: 2, m1: 6, m2: -3, m3: 1 },
				{ c1: 6.4, e1: -3, c2: 5, e2: 7, d1: 1.6, ed: 2, mantissa: 2, exp: 3, basePow: 3, m1: 5, m2: -2, m3: 4 },
				{ c1: 7.2, e1: 4, c2: 5, e2: -6, d1: 1.8, ed: -3, mantissa: 2, exp: 2, basePow: 2, m1: 7, m2: -4, m3: 2 }
			],
			hard: [
				{ c1: 5.4, e1: -4, c2: 5, e2: 8, d1: 0.9, ed: 2, mantissa: 3, exp: 3, basePow: 3, m1: 8, m2: -5, m3: 2 },
				{ c1: 4.2, e1: 7, c2: 6, e2: -3, d1: 0.7, ed: 6, mantissa: 3.6, exp: -1, basePow: 2, m1: 9, m2: -4, m3: 3 },
				{ c1: 8.1, e1: -2, c2: 4, e2: 6, d1: 0.9, ed: 5, mantissa: 3.6, exp: 0, basePow: 5, m1: 6, m2: -3, m3: 2 }
			]
		};

		const cfg = rng.pick(casesByDiff[difficulty]);
		const rawRatio = roundTo((cfg.c1 * cfg.c2) / cfg.d1, 2);
		const rawExp = cfg.e1 + cfg.e2 - cfg.ed;
		// Normalize rawRatio * 10^rawExp to m * 10^n with 1 <= m < 10
		let m = rawRatio;
		let n = rawExp;
		while (m >= 10) {
			m = roundTo(m / 10, 4);
			n += 1;
		}
		while (m < 1) {
			m = roundTo(m * 10, 4);
			n -= 1;
		}
		const orderExp = m >= 5 ? n + 1 : n;

		const powResultExp = cfg.m1 + cfg.m2 - cfg.m3;
		const powResultVal =
			powResultExp >= 0
				? `${Math.pow(cfg.basePow, powResultExp)}`
				: `frac(1, ${Math.pow(cfg.basePow, -powResultExp)})`;

		const numToRound = roundTo(m + 0.046, 3);
		const rounded2 = roundTo(numToRound, 2);

		const correctSciKatex = `$${m} \\times 10^{${n}}$`;
		const qd = buildMcqData(
			correctSciKatex,
			`إجابة صحيحة! القيمة هي $${rawRatio} \\times 10^{${rawExp}}$ وبعد ضبط المعامل في $[1 ; 10[$ نحصل على $${m} \\times 10^{${n}}$.`,
			[
				{
					text: `$${m} \\times 10^{${n + 1}}$`,
					diagnosticFeedback: 'تحقق من حساب أس القوة $10$ بعد ضبط المعامل بين $1$ و $10$.'
				},
				{
					text: `$${m} \\times 10^{${n - 1}}$`,
					diagnosticFeedback: 'انتبه لإشارة الأس عند القسمة على قوة العدد $10$ في المقام.'
				},
				{
					text: `$${roundTo(m * 10, 2)} \\times 10^{${n - 1}}$`,
					diagnosticFeedback: 'المعامل أكبر من $10$، لذا فهذه الكتابة ليست كتابة علمية.'
				},
				{
					text: `$${roundTo(m / 10, 3)} \\times 10^{${n + 1}}$`,
					diagnosticFeedback: 'المعامل أصغر من $1$، والكتابة العلمية تشترط $1 \\leq a < 10$.'
				}
			],
			rng
		);

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `أجب عن الأسئلة التالية المتعلقة بالقوى والكتابة العلمية:`,
			content: [
				{
					type: 'text',
					content: `1) بسّط العبارة $A = frac(${cfg.basePow}^(${cfg.m1}) times ${cfg.basePow}^(${cfg.m2}), ${cfg.basePow}^(${cfg.m3}))$ على شكل قوة وحيدة للعدد $${cfg.basePow}$، ثم احسب قيمتها المضبوطة.`,
					answer: `1) $A = ${cfg.basePow}^(${cfg.m1} + (${cfg.m2}) - ${cfg.m3}) = ${cfg.basePow}^(${powResultExp}) = ${powResultVal}$.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `2) احسب العدد $B = frac(${cfg.c1} times 10^(${cfg.e1}) times ${cfg.c2} times 10^(${cfg.e2}), ${cfg.d1} times 10^(${cfg.ed}))$ واكتبه على الشكل العلمي.`,
					answer: `2) نفصل الأعداد عن قوى $10$:\n\n$B = frac(${cfg.c1} times ${cfg.c2}, ${cfg.d1}) times frac(10^(${cfg.e1}) times 10^(${cfg.e2}), 10^(${cfg.ed})) = ${rawRatio} times 10^(${rawExp}) = ${m} times 10^(${n})$.`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) استنتج رتبة مقدار العدد $B$ .`,
					answer: `3) بما أن $${m} ${m >= 5 ? '>= 5' : '< 5'}$ فإن رتبة مقدار العدد $B$ هي $10^(${orderExp})$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `4) أعط مدور العدد $${numToRound}$ إلى $10^(-2)$، ثم مدوره إلى الوحدة.`,
					answer: `4) - المدور إلى $10^(-2)$ هو $${rounded2}$.\n\n- المدور إلى الوحدة هو $${Math.round(numToRound)}$.`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `ما هي الكتابة العلمية للعدد $B = \\frac{${cfg.c1} \\times 10^{${cfg.e1}} \\times ${cfg.c2} \\times 10^{${cfg.e2}}}{${cfg.d1} \\times 10^{${cfg.ed}}}$ ؟`,
				questionTextAr: `ما هي الكتابة العلمية للعدد $B$ ؟`,
				questionData: qd,
				explanation: `نحسب الأعداد: $\\frac{${cfg.c1} \\times ${cfg.c2}}{${cfg.d1}} = ${rawRatio}$ ونحسب قوى $10$: $10^{${cfg.e1} + (${cfg.e2}) - (${cfg.ed})} = 10^{${rawExp}}$ . بالضبط في $[1 ; 10[$ نحصل على $${m} \\times 10^{${n}}$ .`
			},
			sujetExercise,
			hints: [
				`افصل المعاملات العشرية عن قوى العدد $10$ في البسط والمقام.`,
				`الكتابة العلمية هي $a \\times 10^n$ مع $1 \\leq a < 10$.`,
				`رتبة المقدار هي $10^n$ إذا كان $a < 5$ و $10^{n+1}$ إذا كان $a \\geq 5$.`
			],
			solutionStepsAr: [
				`تبسيط $A = ${cfg.basePow}^{${powResultExp}}$.`,
				`الكتابة العلمية للعدد $B$ هي $${m} \\times 10^{${n}}$.`,
				`رتبة مقدار $B$ هي $10^{${orderExp}}$ والمدور إلى $10^{-2}$ هو $${rounded2}$.`
			],
			finalAnswer: `${m} \\times 10^{${n}}`
		};
	}
};

// ===========================================================================
// 3. Square Roots, Simplification & Rationalizing Denominators
// ===========================================================================

const tplRadicalsRationalize: ParameterizedTemplate = {
	id: 'tpl_1as_tcl_t1_radicals_rationalize',
	grade: '1as_tcl',
	trimesterId: 't1',
	domain: 'algebra',
	titleAr: 'الجذور التربيعية وتبسيط العبارات الجذرية والمقام الناطق',
	curriculumLessonId: 'lesson_1as_tcl_t1_square_roots_simplifying_rationalizing',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 33, difficulty);

		const d = rng.pick(difficulty === 'easy' ? [2, 3] : difficulty === 'medium' ? [2, 3, 5] : [3, 5, 6]);
		const kSets: [number, number, number][] =
			difficulty === 'easy'
				? [
						[3, 2, 1],
						[4, 2, 3],
						[5, 2, 4]
					]
				: difficulty === 'medium'
					? [
							[5, 3, 2],
							[4, 3, 2],
							[6, 2, 3]
						]
					: [
							[6, 4, 3],
							[7, 3, 4],
							[5, 4, 2]
						];
		const [k1, k2, k3] = rng.pick(kSets);
		const r1 = k1 * k1 * d;
		const r2 = k2 * k2 * d;
		const r3 = k3 * k3 * d;
		const coeff = k1 + k2 - k3;
		const aSquared = coeff * coeff * d;

		// Rationalization expression:
		// Easy: c / sqrt(d) where c is a multiple of d
		// Medium / Hard: c / (sqrt(d) - u) or c / (u - sqrt(d)) where |d - u^2| divides c
		const u = d === 2 ? 1 : d === 3 ? 1 : d === 5 ? 2 : 2; // d - u^2: d=2->1, d=3->2, d=5->1, d=6->2
		const denomDiff = d - u * u; // always 1 or 2 > 0
		const mult = rng.pick([2, 3, 4]);
		const cNum = mult * denomDiff;

		const exprKatex = `\\sqrt{${r1}} + \\sqrt{${r2}} - \\sqrt{${r3}}`;
		const exprTypst = `sqrt(${r1}) + sqrt(${r2}) - sqrt(${r3})`;
		const simpKatex = `${coeff}\\sqrt{${d}}`;
		const simpTypst = `${coeff}sqrt(${d})`;

		const qd = buildMcqData(
			`$${simpKatex}$`,
			`إجابة صحيحة! $\\sqrt{${r1}} = ${k1}\\sqrt{${d}}$ و $\\sqrt{${r2}} = ${k2}\\sqrt{${d}}$ و $\\sqrt{${r3}} = ${k3}\\sqrt{${d}}$ ، فالناتج $${simpKatex}$.`,
			[
				{
					text: `$${k1 + k2 + k3}\\sqrt{${d}}$`,
					diagnosticFeedback: `انتبه للإشارة السالبة أمام $\\sqrt{${r3}}$: نطرح $${k3}$ ولا نجمعه.`
				},
				{
					text: `$\\sqrt{${r1 + r2 - r3}}$`,
					diagnosticFeedback: 'خطأ شائع: لا نجمع أو نطرح الأعداد الموجودة تحت الجذر التربيعي أبداً!'
				},
				{
					text: `$${coeff + 1}\\sqrt{${d}}$`,
					diagnosticFeedback: 'تحقق من الجذر التربيعي لكل مربع تام استخرجته من تحت الجذر.'
				},
				{
					text: `$${coeff}\\sqrt{${d * 2}}$`,
					diagnosticFeedback: 'العامل المشترك تحت الجذر هو $\\sqrt{' + d + '}$ ولا يتغير عند جمع الحدود المتشابهة.'
				}
			],
			rng
		);

		const ratAnswerTypst =
			difficulty === 'easy'
				? `frac(${d * mult}, sqrt(${d})) = frac(${d * mult} sqrt(${d}), ${d}) = ${mult} sqrt(${d})`
				: `frac(${cNum}, sqrt(${d}) - ${u}) = frac(${cNum}(sqrt(${d}) + ${u}), (sqrt(${d}) - ${u})(sqrt(${d}) + ${u})) = frac(${cNum}(sqrt(${d}) + ${u}), ${d} - ${u * u}) = ${mult}(sqrt(${d}) + ${u})`;

		const ratQuestionTypst =
			difficulty === 'easy'
				? `frac(${d * mult}, sqrt(${d}))`
				: `frac(${cNum}, sqrt(${d}) - ${u})`;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر العبارتين الجذريتين $A = ${exprTypst}$ و $B = ${ratQuestionTypst}$ .`,
			content: [
				{
					type: 'text',
					content: `1) اكتب العبارة $A$ على الشكل $k sqrt(${d})$ حيث $k$ عدد طبيعي.`,
					answer: `1) بتفكيك ما تحت الجذر إلى مربعات تامة مضروبة في $${d}$:\n\n$A = sqrt(${k1 * k1} times ${d}) + sqrt(${k2 * k2} times ${d}) - sqrt(${k3 * k3} times ${d}) = ${k1}sqrt(${d}) + ${k2}sqrt(${d}) - ${k3}sqrt(${d}) = ${simpTypst}$.`,
					mark: '2'
				},
				{
					type: 'text',
					content: `2) احسب $A^2$ وتحقق أنه عدد طبيعي.`,
					answer: `2) $A^2 = (${simpTypst})^2 = ${coeff}^2 times (sqrt(${d}))^2 = ${coeff * coeff} times ${d} = ${aSquared} in bb(N)$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) اكتب العدد $B$ بنسبة مقامها عدد ناطق.`,
					answer: `3) ${difficulty === 'easy' ? 'نضرب البسط والمقام في $sqrt(' + d + ')$:' : 'نضرب البسط والمقام في المرافق $sqrt(' + d + ') + ' + u + '$:'}\n\n$${ratAnswerTypst}$.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `4) قطعة أرض مستطيلة الشكل طولها $L = ${k1} sqrt(${d}) upright("m")$ وعرضها $l = ${k2} sqrt(${d}) upright("m")$. احسب مساحتها $cal(A)$ بالمتر المربع.`,
					answer: `4) المساحة هي $cal(A) = L times l = (${k1} sqrt(${d})) times (${k2} sqrt(${d})) = ${k1 * k2} times ${d} = ${k1 * k2 * d} upright("m")^2$.`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `بسّط العبارة الجذرية $A = ${exprKatex}$ إلى الشكل $k\\sqrt{${d}}$ :`,
				questionTextAr: `ما هو الشكل المبسط للعبارة $A$ ؟`,
				questionData: qd,
				explanation: `$\\sqrt{${r1}} = ${k1}\\sqrt{${d}}$ و $\\sqrt{${r2}} = ${k2}\\sqrt{${d}}$ و $\\sqrt{${r3}} = ${k3}\\sqrt{${d}}$ ، إذن $A = (${k1} + ${k2} - ${k3})\\sqrt{${d}} = ${simpKatex}$ .`
			},
			sujetExercise,
			hints: [
				`فكّك كل عدد تحت الجذر إلى جداء مربع تام ($4, 9, 16, 25, 36, 49$) في العدد $${d}$.`,
				`لحساب $(k\\sqrt{d})^2$ نربع $k$ ونضربه في $d$.`,
				`لتنطيق المقام $\\sqrt{a} - b$ نضرب البسط والمقام في المرافق $\\sqrt{a} + b$.`
			],
			solutionStepsAr: [
				`تبسيط الجذور الثلاثة يعطي $A = ${simpKatex}$.`,
				`مربع العبارة هو $A^2 = ${aSquared}$.`,
				`تنطيق المقام ومساحة المستطيل $${k1 * k2 * d}\\text{ m}^2$.`
			],
			finalAnswer: simpKatex
		};
	}
};

// ===========================================================================
// 4. Order, Comparison, Framing & Intervals in R
// ===========================================================================

const tplOrderFramingIntervals: ParameterizedTemplate = {
	id: 'tpl_1as_tcl_t1_order_framing_intervals',
	grade: '1as_tcl',
	trimesterId: 't1',
	domain: 'algebra',
	titleAr: 'الترتيب والمقارنة والحصر والمجالات في R',
	curriculumLessonId: 'lesson_1as_tcl_t1_order_comparison_framing_intervals',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 44, difficulty);

		const a1 = rng.int(-6, -2);
		const b1 = rng.int(-1, 2);
		const a2 = rng.int(4, 7);
		const b2 = rng.int(8, 12);

		// x and y framing bounds
		const x1 = difficulty === 'easy' ? rng.int(1, 3) : rng.int(2, 4);
		const x2 = x1 + rng.int(2, 4);
		const y1 = difficulty === 'easy' ? rng.int(1, 2) : rng.int(2, 4);
		const y2 = y1 + rng.int(2, 3);

		const sumMin = x1 + y1;
		const sumMax = x2 + y2;
		const diffMin = x1 - y2;
		const diffMax = x2 - y1;

		const coefA = difficulty === 'easy' ? 2 : rng.pick([2, 3]);
		const coefB = difficulty === 'hard' ? 3 : 2;
		const cConst = rng.int(1, 4);
		const linMin = coefA * x1 - coefB * y2 + cConst;
		const linMax = coefA * x2 - coefB * y1 + cConst;

		// Radical comparison: u * sqrt(2) vs v
		const u = rng.pick([2, 3, 4]);
		const uSq2 = 2 * u * u;
		const v = Math.floor(Math.sqrt(uSq2)) + (rng.pick([0, 1]) === 0 ? 0 : 1);
		const vSq = v * v;
		const cmpSign = uSq2 > vSq ? '>' : '<';

		const correctKatex = `$]${b1} ; ${a2}]$`;
		const qd = buildMcqData(
			correctKatex,
			`إجابة صحيحة! التقاطع يضم الأعداد الموجودة في $I$ و $J$ معاً، و القوس عند $${b1}$ مفتوح لأنه خارج $J$.`,
			[
				{
					text: `$[${a1} ; ${b2}]$`,
					diagnosticFeedback: 'هذا يمثل اتحاد المجالين $I \\cup J$ وليس تقاطعهما $I \\cap J$.'
				},
				{
					text: `$[${b1} ; ${a2}]$`,
					diagnosticFeedback: `انتبه لنوع القوس عند $${b1}$: في المجال $J = ]${b1} ; ${b2}]$ القوس مفتوح، إذن $${b1} \\notin J$.`
				},
				{
					text: `$[${a1} ; ${b1}[$`,
					diagnosticFeedback: 'هذا الجزء ينتمي للمجال $I$ فقط ولا ينتمي للمجال $J$.'
				},
				{
					text: `$]${a2} ; ${b2}]$`,
					diagnosticFeedback: 'هذا الجزء ينتمي للمجال $J$ فقط ولا ينتمي للمجال $I$.'
				}
			],
			rng
		);

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `أجب عن الأسئلة المستقلة الآتية:`,
			content: [
				{
					type: 'text',
					content: `1) قارن مع التعليل بين العددين $${u} sqrt(2)$ و $${v}$ .`,
					answer: `1) العددان موجبان، نقارن مربعيهما:\n\n$(${u} sqrt(2))^2 = ${u * u} times 2 = ${uSq2}$ و $${v}^2 = ${vSq}$ .\n\nبما أن $${uSq2} ${cmpSign} ${vSq}$ فإن $${u} sqrt(2) ${cmpSign} ${v}$ .`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) نعتبر المجالين $I = [${a1} ; ${a2}]$ و $J = ]${b1} ; ${b2}]$ . عيّن كلاً من $I sect J$ و $I union J$ .`,
					answer: `2) - التقاطع: $I sect J = ]${b1} ; ${a2}]$ .\n\n- الاتحاد: $I union J = [${a1} ; ${b2}]$ .`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `3) ليكن $x$ و $y$ عددين حقيقيين حيث $${x1} <= x <= ${x2}$ و $${y1} <= y <= ${y2}$ . أوجد حصراً لكل من $x + y$ و $x - y$ .`,
					answer: `3) - حصر المجموع: $${sumMin} <= x + y <= ${sumMax}$ .\n\n- حصر الفرق: لدينا $-${y2} <= -y <= -${y1}$ ، وبالجمع مع حصر $x$ نجد: $${diffMin} <= x - y <= ${diffMax}$ .`,
					mark: '2'
				},
				{
					type: 'text',
					content: `4) استنتج حصراً للعبارة $E = ${coefA} x - ${coefB} y + ${cConst}$ .`,
					answer: `4) لدينا $${coefA * x1} <= ${coefA} x <= ${coefA * x2}$ و $-${coefB * y2} <= -${coefB} y <= -${coefB * y1}$ .\n\nبالجمع وإضافة $${cConst}$: $${linMin} <= ${coefA} x - ${coefB} y + ${cConst} <= ${linMax}$ .`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `نعتبر المجالين $I = [${a1} ; ${a2}]$ و $J = ]${b1} ; ${b2}]$ . ما هو تقاطع المجالين $I \\cap J$ ؟`,
				questionTextAr: `ما هو تقاطع المجالين $I \\cap J$ ؟`,
				questionData: qd,
				explanation: `تقاطع المجالين $I \\cap J$ هو مجموعة الأعداد التي تنتمي في آن واحد إلى $I$ وإلى $J$ ، أي $${b1} < x \\leq ${a2}$ ، ومنه $I \\cap J = ]${b1} ; ${a2}]$ .`
			},
			sujetExercise,
			hints: [
				`لمقارنة عددين موجبين يكفي مقارنة مربعيهما.`,
				`عند تقاطع مجالين، الطرف المشترك يبقى مفتوحاً إذا كان مفتوحاً في أحد المجالين.`,
				`لحصر $x - y$ نعكس متباينة $y$ بالضرب في $-1$ ثم نجمعها مع متباينة $x$.`
			],
			solutionStepsAr: [
				`المقارنة: $(${u}\\sqrt{2})^2 = ${uSq2}$ و $${v}^2 = ${vSq}$ ومنه $${u}\\sqrt{2} ${cmpSign} ${v}$.`,
				`$I \\cap J = ]${b1} ; ${a2}]$ و $I \\cup J = [${a1} ; ${b2}]$.`,
				`حصر $x - y$: $${diffMin} \\leq x - y \\leq ${diffMax}$ وحصر $E$: $${linMin} \\leq E \\leq ${linMax}$.`
			],
			finalAnswer: `]${b1} ; ${a2}]`
		};
	}
};

// ===========================================================================
// 5. Absolute Value, Distance on Number Line & |x - a| = r
// ===========================================================================

const tplAbsoluteValueDistance: ParameterizedTemplate = {
	id: 'tpl_1as_tcl_t1_absolute_value_distance',
	grade: '1as_tcl',
	trimesterId: 't1',
	domain: 'algebra',
	titleAr: 'القيمة المطلقة والمسافة على المستقيم العددي وحل معادلات ومتراجحات',
	curriculumLessonId: 'lesson_1as_tcl_t1_absolute_value_distance_equations',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 55, difficulty);

		const a = difficulty === 'easy' ? rng.int(1, 5) : rng.int(-4, 5);
		const r = rng.int(2, 5);
		const left = a - r;
		const right = a + r;

		// Second interval [alpha, beta] with integer center & radius
		const c2 = rng.int(-3, 4);
		const rad2 = rng.int(2, 4);
		const alpha = c2 - rad2;
		const beta = c2 + rad2;

		// Radical abs expression: |u - sqrt(m)|
		const radCases: Array<{ u: number; m: number; signPositive: boolean }> = [
			{ u: 2, m: 7, signPositive: false },
			{ u: 3, m: 5, signPositive: true },
			{ u: 4, m: 11, signPositive: true },
			{ u: 3, m: 13, signPositive: false }
		];
		const rc = rng.pick(radCases);
		const absRadSimpKatex = rc.signPositive ? `${rc.u} - \\sqrt{${rc.m}}` : `\\sqrt{${rc.m}} - ${rc.u}`;
		const absRadSimpTypst = rc.signPositive ? `${rc.u} - sqrt(${rc.m})` : `sqrt(${rc.m}) - ${rc.u}`;

		const absAExprKatex = a === 0 ? '|x|' : a > 0 ? `|x - ${a}|` : `|x + ${Math.abs(a)}|`;
		const absAExprTypst = a === 0 ? 'abs(x)' : a > 0 ? `abs(x - ${a})` : `abs(x + ${Math.abs(a)})`;
		const absC2ExprTypst = c2 === 0 ? 'abs(x)' : c2 > 0 ? `abs(x - ${c2})` : `abs(x + ${Math.abs(c2)})`;

		const lineSvg = svgNumberLine({
			min: left - 2,
			max: right + 2,
			step: 1,
			marks: [
				{ value: left, label: `${left}`, color: '#2563eb' },
				{ value: a, label: `a=${a}`, color: '#dc2626' },
				{ value: right, label: `${right}`, color: '#2563eb' }
			]
		});
		const svgPath = saveSvgAsset(`1as_tcl_t1_abs_${difficulty}_s${seed}`, lineSvg);

		const correctSolKatex = `$\\{${left} ; ${right}\\}$`;
		const qd = buildMcqData(
			correctSolKatex,
			`إجابة صحيحة! المسافة عن $${a}$ تساوي $${r}$ تعطي قيمتين هما $${a} - ${r} = ${left}$ و $${a} + ${r} = ${right}$.`,
			[
				{
					text: `$\\{${right}\\}$`,
					diagnosticFeedback: 'نسيت الحالة السالبة داخل القيمة المطلقة (التحرك يساراً من المركز).'
				},
				{
					text: `$[${left} ; ${right}]$`,
					diagnosticFeedback: `المجال $[${left} ; ${right}]$ هو حل المتراجحة $${absAExprKatex} \\leq ${r}$ وليس المعادلة.`
				},
				{
					text: `$\\{${-right} ; ${-left}\\}$`,
					diagnosticFeedback: `تحقق من إشارة المركز $a = ${a}$ .`
				},
				{
					text: `$\\{${a - 1} ; ${a + 1}\\}$`,
					diagnosticFeedback: `المسافة المحددة هي $r = ${r}$ وليس $1$.`
				}
			],
			rng
		);

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `أجب عن الأسئلة الآتية:`,
			content: [
				{
					type: 'image',
					src: svgPath,
					caption: 'التمثيل على المستقيم العددي'
				},
				{
					type: 'text',
					content: `1) اكتب العدد $A = abs(${rc.u} - sqrt(${rc.m}))$ دون رمز القيمة المطلقة مع التعليل.`,
					answer: `1) نقارن $${rc.u}$ و $sqrt(${rc.m})$ : لدينا $${rc.u}^2 = ${rc.u * rc.u}$ و $(sqrt(${rc.m}))^2 = ${rc.m}$.\n\nبما أن $${rc.u * rc.u} ${rc.signPositive ? '>' : '<'} ${rc.m}$ فإن $${rc.u} - sqrt(${rc.m}) ${rc.signPositive ? '> 0' : '< 0'}$ ، وعليه $A = ${absRadSimpTypst}$ .`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `2) حل في $bb(R)$ المعادلة $${absAExprTypst} = ${r}$ ثم المتراجحة $${absAExprTypst} <= ${r}$ مع كتابة الحلول على شكل مجال.`,
					answer: `2) - المعادلة: $x - (${a}) = ${r}$ أو $x - (${a}) = -${r}$ ، ومنه $x = ${right}$ أو $x = ${left}$ ، أي $S = { ${left} , ${right} }$ .\n\n- المتراجحة: $-${r} <= x - (${a}) <= ${r}$ أي $${left} <= x <= ${right}$ ، فالمجال هو $S = [${left} ; ${right}]$ .`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) ليكن المجال $I = [${alpha} ; ${beta}]$ . عيّن مركزه $c$ ونصف قطره $r'$، ثم عبر عن $x in I$ باستعمال القيمة المطلقة.`,
					answer: `3) - المركز: $c = frac(${alpha} + ${beta}, 2) = ${c2}$ .\n\n- نصف القطر: $r' = frac(${beta} - (${alpha}), 2) = ${rad2}$ .\n\n- بالقيمة المطلقة: $${absC2ExprTypst} <= ${rad2}$ .`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `4) احسب المسافة على المستقيم العددي بين النقطتين $M(${left})$ و $N(${beta})$ .`,
					answer: `4) $M N = abs(${beta} - (${left})) = ${Math.abs(beta - left)}$ .`,
					mark: '1'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `ما هي مجموعة حلول المعادلة $${absAExprKatex} = ${r}$ في $\\mathbb{R}$ ؟`,
				questionTextAr: `ما هي مجموعة حلول المعادلة $${absAExprKatex} = ${r}$ ؟`,
				imageUrl: svgPath,
				imageCaption: 'المركز ونصف القطر على المستقيم العددي',
				questionData: qd,
				explanation: `المعادلة $${absAExprKatex} = ${r}$ تعني أن المسافة بين $x$ و $${a}$ تساوي $${r}$ ، ومنه $x = ${a} - ${r} = ${left}$ أو $x = ${a} + ${r} = ${right}$ .`
			},
			sujetExercise,
			hints: [
				`لمعرفة إشارة $u - \\sqrt{m}$ قارن $u^2$ و $m$.`,
				`المعادلة $|x - a| = r$ ($r > 0$) تعطي $x = a - r$ أو $x = a + r$.`,
				`مركز المجال $[\\alpha ; \\beta]$ هو $\\frac{\\alpha + \\beta}{2}$ ونصف قطره $\\frac{\\beta - \\alpha}{2}$.`
			],
			solutionStepsAr: [
				`تبسيط القيمة المطلقة: $A = ${absRadSimpKatex}$.`,
				`حلول المعادلة هي $\\{${left} ; ${right}\\}$ وحلول المتراجحة هي $[${left} ; ${right}]$.`,
				`المجال $[${alpha} ; ${beta}]$ مركزه $${c2}$ ونصف قطره $${rad2}$.`
			],
			finalAnswer: `\\{${left} ; ${right}\\}`
		};
	}
};

// ===========================================================================
// 6. Integration Problem (المسألة الشاملة — 8 Points)
// ===========================================================================

const tplT1IntegrationProblem: ParameterizedTemplate = {
	id: 'tpl_1as_tcl_t1_integration_problem',
	grade: '1as_tcl',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'المسألة الشاملة: تجهيز المكتبة المدرسية (الأعداد والحساب والمجالات)',
	curriculumLessonId: 'lesson_1as_tcl_t1_divisors_multiples_primes_pgcd_ppcm',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 66, difficulty);

		const configs = [
			{ litBooks: 180, dicts: 120, packMassG: 450, hallAreaD: 2, hallSideK: 4, minBudget: 14, maxBudget: 20 },
			{ litBooks: 210, dicts: 140, packMassG: 500, hallAreaD: 3, hallSideK: 5, minBudget: 16, maxBudget: 24 },
			{ litBooks: 240, dicts: 160, packMassG: 650, hallAreaD: 2, hallSideK: 6, minBudget: 18, maxBudget: 26 },
			{ litBooks: 150, dicts: 100, packMassG: 350, hallAreaD: 5, hallSideK: 3, minBudget: 12, maxBudget: 18 }
		];
		const cfg = rng.pick(configs);
		const g = gcd(cfg.litBooks, cfg.dicts);
		const litPerPack = cfg.litBooks / g;
		const dictPerPack = cfg.dicts / g;
		const factsLit = primeFactorize(cfg.litBooks);
		const factsDict = primeFactorize(cfg.dicts);

		// Total mass in grams = g * packMassG
		const totalMassG = g * cfg.packMassG;
		let sciM = totalMassG;
		let sciExp = 0;
		while (sciM >= 10) {
			sciM = roundTo(sciM / 10, 4);
			sciExp++;
		}
		const orderExp = sciM >= 5 ? sciExp + 1 : sciExp;

		// Square hall area = hallSideK^2 * hallAreaD -> side = hallSideK * sqrt(hallAreaD), perim = 4 * hallSideK * sqrt(hallAreaD)
		const areaVal = cfg.hallSideK * cfg.hallSideK * cfg.hallAreaD;
		const perimK = 4 * cfg.hallSideK;

		// Budget interval [minBudget, maxBudget] -> center & radius
		const budCenter = (cfg.minBudget + cfg.maxBudget) / 2;
		const budRadius = (cfg.maxBudget - cfg.minBudget) / 2;

		const qd = buildMcqData(
			`$${g}$`,
			`إجابة صحيحة! أكبر عدد من العلب المتماثلة هو $\\text{PGCD}(${cfg.litBooks} ; ${cfg.dicts}) = ${g}$ علبة.`,
			[
				{
					text: `$${lcm(cfg.litBooks, cfg.dicts)}$`,
					diagnosticFeedback: 'هذا المضاعف المشترك الأصغر، بينما المطلوب في التوزيع هو القاسم المشترك الأكبر.'
				},
				{
					text: `$${Math.floor(g / 2)}$`,
					diagnosticFeedback: 'هذا قاسم مشترك لكنه ليس القاسم المشترك **الأكبر**.'
				},
				{
					text: `$${litPerPack + dictPerPack}$`,
					diagnosticFeedback: `العدد $${litPerPack + dictPerPack}$ هو مجموع الكتب داخل كل علبة، وليس عدد العلب.`
				},
				{
					text: `$${g * 2}$`,
					diagnosticFeedback: `تحقق من القسمة: $${g * 2}$ لا يقسم كلاً من $${cfg.litBooks}$ و $${cfg.dicts}$ معاً.`
				}
			],
			rng
		);

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			customTitle: 'المسألة الشاملة (8 نقاط)',
			instruction: `بمناسبة افتتاح معرض الكتاب المدرسي، تبرّع محسنون بمجموعة من $${cfg.litBooks}$ كتاباً أدبياً و $${cfg.dicts}$ معجماً لغوياً لتوزيعها في رزم متماثلة داخل قاعة مطالعة مربعة الشكل.`,
			content: [
				{
					type: 'text',
					content: `*الجزء الأول: التوزيع المتساوي للكتب (3 نقاط)*\n\n1) حلّل العددين $${cfg.litBooks}$ و $${cfg.dicts}$ إلى جداء عوامل أولية، ثم احسب $upright("PGCD")(${cfg.litBooks} ; ${cfg.dicts})$ .\n\n2) ما هو أكبر عدد ممكن من الرزم المتماثلة التي يمكن تكوينها؟ وما محتوى كل رزمة؟`,
					answer: `1) التحليل:\n\n- $${cfg.litBooks} = ${formatFactorsTypst(factsLit)}$\n\n- $${cfg.dicts} = ${formatFactorsTypst(factsDict)}$\n\n- $upright("PGCD")(${cfg.litBooks} ; ${cfg.dicts}) = ${g}$ .\n\n2) أكبر عدد من الرزم هو $${g}$ رزمة، تحتوي كل رزمة على $${litPerPack}$ كتباً أدبية و $${dictPerPack}$ معاجم.`,
					mark: '3'
				},
				{
					type: 'text',
					content: `*الجزء الثاني: الحساب العلمي وتقدير الكتلة (2.5 نقطة)*\n\nتزن الرزمة الواحدة $${cfg.packMassG} upright("g")$ .\n\n1) احسب الكتلة الإجمالية $M$ لجميع الرزم بالغرام، ثم اكتبها على الشكل العلمي.\n\n2) حدد رتبة مقدار الكتلة $M$ بالغرام.`,
					answer: `1) الكتلة الإجمالية: $M = ${g} times ${cfg.packMassG} = ${totalMassG} upright("g")$.\n\nالكتابة العلمية: $M = ${sciM} times 10^(${sciExp}) upright("g")$.\n\n2) بما أن $${sciM} ${sciM >= 5 ? '>= 5' : '< 5'}$ فإن رتبة مقدار الكتلة هي $10^(${orderExp}) upright("g")$.`,
					mark: '2.5'
				},
				{
					type: 'text',
					content: `*الجزء الثالث: تهيئة القاعة وحصر الميزانية (2.5 نقطة)*\n\n1) مساحة القاعة المربعة هي $S = ${areaVal} upright("m")^2$ . احسب طول ضلعها $L$ ومحيطها $P$ على الشكل $k sqrt(${cfg.hallAreaD})$ .\n\n2) تُقدّر ميزانية التهيئة بـ $x$ (بآلاف الدنانير) بحيث $x in [${cfg.minBudget} ; ${cfg.maxBudget}]$ . عيّن مركز هذا المجال ونصف قطره، ثم عبّر عن $x$ باستعمال القيمة المطلقة.`,
					answer: `1) طول الضلع: $L = sqrt(${areaVal}) = sqrt(${cfg.hallSideK * cfg.hallSideK} times ${cfg.hallAreaD}) = ${cfg.hallSideK} sqrt(${cfg.hallAreaD}) upright("m")$.\n\nالمحيط: $P = 4 L = ${perimK} sqrt(${cfg.hallAreaD}) upright("m")$.\n\n2) المركز: $c = frac(${cfg.minBudget} + ${cfg.maxBudget}, 2) = ${budCenter}$ ، ونصف القطر: $r = frac(${cfg.maxBudget} - ${cfg.minBudget}, 2) = ${budRadius}$ .\n\nباستعمال القيمة المطلقة: $abs(x - ${budCenter}) <= ${budRadius}$ .`,
					mark: '2.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في مسألة تجهيز المعرض ($${cfg.litBooks}$ كتاباً أدبياً و $${cfg.dicts}$ معجماً)، ما هو أكبر عدد ممكن من الرزم المتماثلة التي يمكن تكوينها؟`,
				questionTextAr: `ما هو أكبر عدد ممكن من الرزم المتماثلة؟`,
				questionData: qd,
				explanation: `نحسب القاسم المشترك الأكبر: $\\text{PGCD}(${cfg.litBooks} ; ${cfg.dicts}) = ${g}$ رزمة.`
			},
			sujetExercise,
			hints: [
				`في التوزيع المتساوي بأكبر عدد من الرزم نبحث عن $\\text{PGCD}$.`,
				`الكتابة العلمية تكتب بمعامل محصور بين $1$ و $10$ مضروب في قوة للعدد $10$.`,
				`طول ضلع المربع هو الجذر التربيعي لمساحته، والمحيط يساوي $4$ مرات طول الضلع.`
			],
			solutionStepsAr: [
				`$\\text{PGCD}(${cfg.litBooks}, ${cfg.dicts}) = ${g}$ رزمة، في كل رزمة $${litPerPack}$ كتباً و $${dictPerPack}$ معاجم.`,
				`الكتلة الإجمالية $M = ${sciM} \\times 10^{${sciExp}}\\text{ g}$ ورتبة مقدارها $10^{${orderExp}}\\text{ g}$.`,
				`المحيط $P = ${perimK}\\sqrt{${cfg.hallAreaD}}\\text{ m}$ والميزانية تحقق $|x - ${budCenter}| \\leq ${budRadius}$.`
			],
			finalAnswer: `${g}`
		};
	}
};

export const TEMPLATES_1AS_TCL_T1: ParameterizedTemplate[] = [
	tplPrimesPgcdPpcm,
	tplPowersScientificNotation,
	tplRadicalsRationalize,
	tplOrderFramingIntervals,
	tplAbsoluteValueDistance,
	tplT1IntegrationProblem
];
