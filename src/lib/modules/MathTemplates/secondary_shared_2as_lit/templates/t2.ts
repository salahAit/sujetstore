import type { ExerciseBlock, TableBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate
} from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng, simplifyFraction } from '../../rng';
import { saveSvgAsset } from '../../svg-helpers';
import { svgCobwebSequencePlot, svgFunctionCurvePlot, svgProbabilityTree } from '../../svg-secondary';

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

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Sequence Generation, Monotonicity & Graphical Representation
// ═══════════════════════════════════════════════════════════════════════════════

const tplSequenceTermsMonotonicity: ParameterizedTemplate = {
	id: 'tpl_2as_shared_lit_t2_sequence_terms_monotonicity',
	grade: '2as_lp',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'المتتاليات العددية: طرق التوليد، حساب الحدود، اتجاه التغير والتمثيل',
	curriculumLessonId: 'lesson_2as_shared_lit_t2_sequences_generation_graph',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const pool =
			difficulty === 'easy'
				? [
						{ a: 2, b: 1, c: 1 },
						{ a: 3, b: 1, c: 2 },
						{ a: 1, b: 4, c: 1 }
					]
				: difficulty === 'medium'
					? [
							{ a: 3, b: 2, c: 2 },
							{ a: 4, b: 1, c: 2 },
							{ a: 2, b: 5, c: 1 },
							{ a: 1, b: 6, c: 2 }
						]
					: [
							{ a: 5, b: 2, c: 3 },
							{ a: 4, b: 9, c: 2 },
							{ a: 3, b: 7, c: 2 }
						];

		const cfg = rng.pick(pool);
		const { a, b, c } = cfg;
		const delta = a * c - b;
		const isInc = delta > 0;

		const u0K = fracKatex(b, c);
		const u1K = fracKatex(a + b, 1 + c);
		const u2K = fracKatex(2 * a + b, 2 + c);

		const u0T = fracTypst(b, c);
		const u1T = fracTypst(a + b, 1 + c);
		const u2T = fracTypst(2 * a + b, 2 + c);

		// Choose target nTarget to solve u_n = targetVal
		const nTarget = rng.pick([4, 5, 6]);
		const tNum = a * nTarget + b;
		const tDen = nTarget + c;
		const targetK = fracKatex(tNum, tDen);
		const targetT = fracTypst(tNum, tDen);

		const seqPlotSvg = svgFunctionCurvePlot({
			xMin: 0,
			xMax: 5,
			yMin: 0,
			yMax: Math.max(a, Math.ceil(b / c)) + 2,
			fn: (x) => (a * x + b) / (x + c),
			curveLabel: `y=(${a}x+${b})/(x+${c})`,
			asymptotes: [{ kind: 'horizontal', value: a, label: `y = ${a}`, color: '#dc2626' }],
			points: [
				{ x: 0, y: b / c, label: 'u0' },
				{ x: 1, y: (a + b) / (1 + c), label: 'u1' },
				{ x: 2, y: (2 * a + b) / (2 + c), label: 'u2' },
				{ x: 3, y: (3 * a + b) / (3 + c), label: 'u3' }
			]
		});
		const plotUrl = saveSvgAsset(`2as_shared_lit_t2_seq_graph_${difficulty}_s${seed}`, seqPlotSvg);

		// Part 2: simple recurrence v_0, v_{n+1} = 2 v_n + k
		const v0 = rng.pick([1, 2, 3]);
		const kRec = rng.pick([1, -1, 3]);
		const v1 = 2 * v0 + kRec;
		const v2 = 2 * v1 + kRec;

		const quizAns = nTarget;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `لتكن المتتالية العددية $(u_n)$ المعرفة على $bb(N)$ بحدها العام: $u_n = frac(${a}n + ${b}, n + ${c})$.`,
			content: [
				{
					type: 'text',
					content: `1) احسب الحدود الثلاثة الأولى: $u_0$، $u_1$ و $u_2$.`,
					answer: `1) بالتعويض المباشر:\n- $u_0 = frac(${b}, ${c}) = ${u0T}$.\n- $u_1 = frac(${a} + ${b}, 1 + ${c}) = ${u1T}$.\n- $u_2 = frac(${2 * a} + ${b}, 2 + ${c}) = ${u2T}$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) اكتب عبارة $u_(n+1) - u_n$ بدلالة $n$، ثم استنتج اتجاه تغير المتتالية $(u_n)$ على $bb(N)$.`,
					answer: `2) حساب الفرق:\n$u_(n+1) - u_n = frac(${a}(n + 1) + ${b}, n + ${c + 1}) - frac(${a}n + ${b}, n + ${c}) = frac(${delta}, (n + ${c + 1})(n + ${c}))$.\nبما أن $n in bb(N)$ فإن المقام موجب تماماً والبسط $${delta} ${isInc ? '> 0' : '< 0'}$، ومنه المتتالية $(u_n)$ ${isInc ? 'متزايدة تماماً' : 'متناقصة تماماً'} على $bb(N)$.`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `3) هل العدد $${targetT}$ حد من حدود المتتالية $(u_n)$؟ وإذا كان كذلك فما رتبته؟`,
					answer: `3) نحل المعادلة $u_n = ${targetT}$:\n$frac(${a}n + ${b}, n + ${c}) = ${targetT} arrow.r.double n = ${nTarget} in bb(N)$.\nإذن نعم، العدد $${targetT}$ هو الحد $u_${nTarget}$ (رتبته $${nTarget + 1}$ ابتداءً من $u_0$).`,
					mark: '1'
				},
				{
					type: 'text',
					content: `4) نعتبر من جهة أخرى المتتالية $(v_n)$ المعرفة بـ $v_0 = ${v0}$ و $v_(n+1) = 2 v_n ${kRec >= 0 ? `+ ${kRec}` : `- ${Math.abs(kRec)}`}$. احسب $v_1$ و $v_2$.`,
					answer: `4) $v_1 = 2(${v0}) ${kRec >= 0 ? `+ ${kRec}` : `- ${Math.abs(kRec)}`} = ${v1}$، ثم $v_2 = 2(${v1}) ${kRec >= 0 ? `+ ${kRec}` : `- ${Math.abs(kRec)}`} = ${v2}$.`,
					mark: '0.75'
				},
				{
					type: 'image',
					src: plotUrl,
					caption: 'تمثيل النقط الموافقة لحدود المتتالية في المعلم'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_lp',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `لتكن المتتالية $(u_n)$ المعرفة على $\\mathbb{N}$ بالحد العام $u_n = \\frac{${a}n + ${b}}{n + ${c}}$. أوجد الدليل $n \\in \\mathbb{N}$ الذي يحقق $u_n = ${targetK}$:`,
				questionTextAr: `عيّن الدليل $n$ الموافق للحد $u_n = ${targetK}$:`,
				imageUrl: plotUrl,
				imageCaption: 'تمثيل حدود المتتالية (u_n)',
				questionData: {
					answer: quizAns,
					displayTemplate: `n = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `بحل المعادلة $\\frac{${a}n + ${b}}{n + ${c}} = ${targetK}$ باستخدام الجداء المتصالب نجد $n = ${nTarget}$.`
			},
			sujetExercise,
			hints: [
				'لحساب $u_k$ نعوض كل $n$ في عبارة الحد العام بالعدد $k$.',
				'لدراسة اتجاه التغير، احسب الفرق $u_{n+1} - u_n$ بتوحيد المقامين وادرس إشارة البسط والمقام.',
				'لمعرفة ما إذا كان عدد ما حداً من حدود $(u_n)$ نحل المعادلة $u_n = \\text{العدد}$ ونتحقق أن الحل عدد طبيعي $n \\in \\mathbb{N}$.'
			],
			solutionStepsAr: [
				`حساب الحدود الأولى: $u_0 = ${u0K}$، $u_1 = ${u1K}$، $u_2 = ${u2K}$.`,
				`إيجاد الفرق $u_{n+1} - u_n = \\frac{${delta}}{(n+${c + 1})(n+${c})}$ ومنه المتتالية ${isInc ? 'متزايدة تماماً' : 'متناقصة تماماً'}.`,
				`حل المعادلة $u_n = ${targetK}$ لإيجاد $n = ${nTarget}$.`,
				`حساب $v_1 = ${v1}$ و $v_2 = ${v2}$.`
			],
			finalAnswer: `${quizAns}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Arithmetic Sequences: General Term, Common Difference, Mean & Sum
// ═══════════════════════════════════════════════════════════════════════════════

const tplArithmeticSequence: ParameterizedTemplate = {
	id: 'tpl_2as_shared_lit_t2_arithmetic_sequence',
	grade: '2as_lp',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'المتتالية الحسابية: الأساس، الحد العام، الوسط الحسابي والمجموع',
	curriculumLessonId: 'lesson_2as_shared_lit_t2_arithmetic_sequences',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const u0 = difficulty === 'easy' ? rng.pick([2, 3, 5]) : rng.pick([-4, -2, 3, 7]);
		const r = difficulty === 'easy' ? rng.pick([2, 3, 4]) : rng.pick([3, 4, 5, -3]);

		const p = rng.pick([2, 3]);
		const q = p + rng.pick([3, 4, 5]);
		const up = u0 + p * r;
		const uq = u0 + q * r;

		const nTarget = rng.pick([10, 12, 15]);
		const uTarget = u0 + nTarget * r;

		const sumEnd = difficulty === 'hard' ? 14 : 10;
		const uSumEnd = u0 + sumEnd * r;
		const sumVal = ((sumEnd + 1) * (u0 + uSumEnd)) / 2;

		const askSum = difficulty !== 'easy';
		const quizAns = askSum ? sumVal : r;

		const exprTypst = `${u0} ${r >= 0 ? `+ ${r}n` : `- ${Math.abs(r)}n`}`;
		const exprKatex = `${u0} ${r >= 0 ? `+ ${r}n` : `- ${Math.abs(r)}n`}`;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `$(u_n)$ متتالية حسابية معرفة على $bb(N)$ بحيث: $u_${p} = ${up}$ و $u_${q} = ${uq}$.`,
			content: [
				{
					type: 'text',
					content: `1) احسب الأساس $r$ للمتتالية $(u_n)$ ثم استنتج حدها الأول $u_0$.`,
					answer: `1) لدينا $u_${q} = u_${p} + (${q} - ${p})r arrow.r.double ${uq} = ${up} + ${q - p}r arrow.r.double r = frac(${uq - up}, ${q - p}) = ${r}$.\nالحد الأول: $u_0 = u_${p} - ${p}r = ${up} - ${p}(${r}) = ${u0}$.`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `2) اكتب عبارة الحد العام $u_n$ بدلالة $n$، ثم تحقق من خاصية الوسط الحسابي للحدود $u_1$ و $u_2$ و $u_3$.`,
					answer: `2) عبارة الحد العام: $u_n = u_0 + n r = ${exprTypst}$.\nلدينا $u_1 = ${u0 + r}$، $u_2 = ${u0 + 2 * r}$، $u_3 = ${u0 + 3 * r}$.\nالتحقق من الوسط الحسابي: $u_1 + u_3 = ${u0 + r} + (${u0 + 3 * r}) = ${2 * (u0 + 2 * r)} = 2 u_2$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) عيّن العدد الطبيعي $n$ الذي يحقق $u_n = ${uTarget}$.`,
					answer: `3) نحل المعادلة $${exprTypst} = ${uTarget} arrow.r.double ${r}n = ${uTarget - u0} arrow.r.double n = ${nTarget}$.`,
					mark: '0.75'
				},
				{
					type: 'text',
					content: `4) احسب المجموع: $S = u_0 + u_1 + dots + u_${sumEnd}$.`,
					answer: `4) عدد الحدود من $0$ إلى $${sumEnd}$ هو $${sumEnd + 1}$، و $u_${sumEnd} = ${uSumEnd}$.\n$S = frac(${sumEnd + 1}, 2)(u_0 + u_${sumEnd}) = frac(${sumEnd + 1}, 2)(${u0} + (${uSumEnd})) = ${sumVal}$.`,
					mark: '1'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_lp',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: askSum
					? `$(u_n)$ متتالية حسابية حدها الأول $u_0 = ${u0}$ وأساسها $r = ${r}$. احسب المجموع $S = u_0 + u_1 + \\dots + u_{${sumEnd}}$:`
					: `$(u_n)$ متتالية حسابية حيث $u_{${p}} = ${up}$ و $u_{${q}} = ${uq}$. احسب أساسها $r$:`,
				questionTextAr: askSum ? `احسب المجموع $S$:` : `احسب الأساس $r$:`,
				questionData: {
					answer: quizAns,
					displayTemplate: askSum ? `S = ?` : `r = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: askSum
					? `عدد الحدود هو $${sumEnd + 1}$ و $u_{${sumEnd}} = ${uSumEnd}$. إذن $S = \\frac{${sumEnd + 1}}{2}(${u0} + (${uSumEnd})) = ${sumVal}$.`
					: `$r = \\frac{u_{${q}} - u_{${p}}}{${q} - ${p}} = \\frac{${uq} - (${up})}{${q - p}} = ${r}$.`
			},
			sujetExercise,
			hints: [
				'العلاقة بين أي حدين في متتالية حسابية هي $u_q = u_p + (q - p)r$.',
				'الحد العام بدلالة $u_0$ هو $u_n = u_0 + nr$.',
				'في مجموع حدود متتابعة من $u_0$ إلى $u_N$ يوجد $N + 1$ حداً، والمجموع هو $\\frac{N+1}{2}(u_0 + u_N)$.'
			],
			solutionStepsAr: [
				`إيجاد الأساس $r = ${r}$ والحد الأول $u_0 = ${u0}$.`,
				`كتابة الحد العام $u_n = ${exprKatex}$ والتحقق من الوسط الحسابي.`,
				`إيجاد الدليل $n = ${nTarget}$ الموافق للقيمة $${uTarget}$.`,
				`حساب المجموع $S = ${sumVal}$.`
			],
			finalAnswer: `${quizAns}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Geometric Sequences: Ratio, General Term, Geometric Mean & Sum
// ═══════════════════════════════════════════════════════════════════════════════

const tplGeometricSequence: ParameterizedTemplate = {
	id: 'tpl_2as_shared_lit_t2_geometric_sequence',
	grade: '2as_lp',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'المتتالية الهندسية: الأساس، الحد العام، الوسط الهندسي والمجموع',
	curriculumLessonId: 'lesson_2as_shared_lit_t2_geometric_sequences',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const v0 = difficulty === 'easy' ? rng.pick([2, 3, 5]) : rng.pick([2, 3, 4, 5]);
		const q = difficulty === 'easy' ? 2 : rng.pick([2, 3]);
		const v1 = v0 * q;
		const v2 = v1 * q;
		const v3 = v2 * q;
		const v4 = v3 * q;

		const sumN = difficulty === 'hard' ? 5 : 4;
		const qPow = Math.pow(q, sumN + 1);
		const sumVal = (v0 * (qPow - 1)) / (q - 1);

		const askSum = difficulty !== 'easy';
		const quizAns = askSum ? sumVal : v0;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `$(v_n)$ متتالية هندسية حدودها موجبة تماماً معرفة على $bb(N)$ حيث: $v_1 = ${v1}$ و $v_3 = ${v3}$.`,
			content: [
				{
					type: 'text',
					content: `1) احسب الأساس $q$ للمتتالية $(v_n)$، ثم استنتج حدها الأول $v_0$.`,
					answer: `1) لدينا $v_3 = v_1 times q^(3 - 1) = v_1 q^2 arrow.r.double q^2 = frac(${v3}, ${v1}) = ${q * q}$.\nبما أن حدود المتتالية موجبة تماماً فإن $q > 0$، ومنه $q = ${q}$.\nالحد الأول: $v_0 = frac(v_1, q) = frac(${v1}, ${q}) = ${v0}$.`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `2) اكتب عبارة الحد العام $v_n$ بدلالة $n$، ثم احسب $v_2$ و $v_4$.`,
					answer: `2) عبارة الحد العام: $v_n = v_0 times q^n = ${v0} times ${q}^n$.\n$v_2 = ${v0} times ${q}^2 = ${v2}$، و $v_4 = ${v0} times ${q}^4 = ${v4}$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) تحقق من خاصية الوسط الهندسي للحدود $v_1$ و $v_2$ و $v_3$.`,
					answer: `3) $v_1 times v_3 = ${v1} times ${v3} = ${v1 * v3}$ و $v_2^2 = (${v2})^2 = ${v2 * v2}$. إذن $v_2^2 = v_1 times v_3$.`,
					mark: '0.75'
				},
				{
					type: 'text',
					content: `4) احسب المجموع: $S = v_0 + v_1 + dots + v_${sumN}$.`,
					answer: `4) عدد الحدود من $0$ إلى $${sumN}$ هو $${sumN + 1}$.\n$S = v_0 times frac(q^(${sumN + 1}) - 1, q - 1) = ${v0} times frac(${q}^(${sumN + 1}) - 1, ${q} - 1) = ${v0} times frac(${qPow - 1}, ${q - 1}) = ${sumVal}$.`,
					mark: '1'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_lp',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: askSum
					? `$(v_n)$ متتالية هندسية حدها الأول $v_0 = ${v0}$ وأساسها $q = ${q}$. احسب المجموع $S = v_0 + v_1 + \\dots + v_{${sumN}}$:`
					: `$(v_n)$ متتالية هندسية حدودها موجبة تماماً حيث $v_1 = ${v1}$ و $v_3 = ${v3}$. احسب الحد الأول $v_0$:`,
				questionTextAr: askSum ? `احسب المجموع $S$:` : `احسب الحد الأول $v_0$:`,
				questionData: {
					answer: quizAns,
					displayTemplate: askSum ? `S = ?` : `v_0 = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: askSum
					? `عدد الحدود هو $${sumN + 1}$، إذن $S = ${v0} \\times \\frac{${q}^{${sumN + 1}} - 1}{${q} - 1} = ${sumVal}$.`
					: `$q^2 = \\frac{${v3}}{${v1}} = ${q * q} \\implies q = ${q}$، ومنه $v_0 = \\frac{${v1}}{${q}} = ${v0}$.`
			},
			sujetExercise,
			hints: [
				'استعمل $v_n = v_p \\cdot q^{n-p}$ لإيجاد $q^2 = \\frac{v_3}{v_1}$ وبما أن الحدود موجبة فإن $q > 0$.',
				'الحد العام لمتتالية هندسية بدلالة $v_0$ هو $v_n = v_0 \\cdot q^n$.',
				'قانون المجموع: $S = v_0 \\cdot \\frac{q^{\\text{عدد الحدود}} - 1}{q - 1}$.'
			],
			solutionStepsAr: [
				`حساب الأساس الموجب $q = ${q}$ والحد الأول $v_0 = ${v0}$.`,
				`كتابة الحد العام $v_n = ${v0} \\times ${q}^n$ وحساب $v_2 = ${v2}, v_4 = ${v4}$.`,
				`التحقق من الوسط الهندسي $v_2^2 = v_1 v_3 = ${v2 * v2}$.`,
				`حساب المجموع $S = ${sumVal}$.`
			],
			finalAnswer: `${quizAns}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Monotonicity, Sequence Comparison & Halal Production / Saving Apps
// ═══════════════════════════════════════════════════════════════════════════════

const tplHalalSavingsProduction: ParameterizedTemplate = {
	id: 'tpl_2as_shared_lit_t2_halal_savings_production',
	grade: '2as_lp',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'تطبيقات المتتاليات: التزايد الإنتاجي والادخار الحلال ومقارنة متتاليتين',
	curriculumLessonId: 'lesson_2as_shared_lit_t2_monotonicity_comparison_halal_apps',
	defaultPoints: 5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Part 1: Halal regular monthly saving in a home savings box / zero-interest CCP
		const u1 = rng.pick([4000, 5000, 6000, 8000]);
		const rStep = rng.pick([1000, 1500, 2000]);
		const months = difficulty === 'easy' ? 6 : 12;
		const uLast = u1 + (months - 1) * rStep;
		const totalSaved = (months * (u1 + uLast)) / 2;

		// Part 2: Halal agricultural cooperative olive/dates production growth at t% per year
		const prod0 = rng.pick([1000, 2000, 2500]);
		const pctGrowth = rng.pick([10, 20]);
		const qProd = roundTo(1 + pctGrowth / 100, 2);
		const prod2 = roundTo(prod0 * qProd * qProd, 2);
		const prod3 = roundTo(prod0 * qProd * qProd * qProd, 2);

		const askTotalSaved = difficulty !== 'hard';
		const quizAns = askTotalSaved ? totalSaved : prod2;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `يتناول هذا التمرين تطبيقين للمتتاليات في الادخار المنزلي المنتظم والتنمية الفلاحية:`,
			content: [
				{
					type: 'text',
					content: `*أولاً: الادخار الحلال المنتظم*\nيدخر تلميذ في حصالته المنزلية مبلغاً شهرياً لشراء مكتبة منزلية. وضع في الشهر الأول $u_1 = ${u1}$ دج، وفي كل شهر موالٍ يزيد المبلغ المدخر بـ $${rStep}$ دج مقارنة بالشهر الذي يسبقه.\n1) عبّر عن $u_(n+1)$ بدلالة $u_n$، ثم حدد طبيعة المتتالية $(u_n)$ واتجاه تغيرها.\n2) احسب المبلغ الذي يضعه في الشهر رقم $${months}$، ثم احسب المبلغ الإجمالي المدخر خلال $${months}$ شهراً.`,
					answer: `1) $u_(n+1) = u_n + ${rStep}$، ومنه $(u_n)$ متتالية حسابية أساسها $r = ${rStep} > 0$ وحدها الأول $u_1 = ${u1}$. وهي متزايدة تماماً لأن $u_(n+1) - u_n = ${rStep} > 0$.\n2) المبلغ في الشهر $${months}$: $u_${months} = ${u1} + (${months} - 1) times ${rStep} = ${uLast}$ دج.\nالمبلغ الإجمالي المدخر: $S = frac(${months}, 2)(u_1 + u_${months}) = ${months / 2} times (${u1} + ${uLast}) = ${totalSaved}$ دج.`,
					mark: '2.5'
				},
				{
					type: 'text',
					content: `*ثانياً: التزايد الإنتاجي الفلاحي*\nأنتجت تعاونية فلاحية سنة $2024$ كمية $p_0 = ${prod0}$ قنطار من الحبوب، وتخطط لزيادة إنتاجها بنسبة $${pctGrowth}%$ سنوياً عبر توسيع المساحة المزروعة ($p_n$ يمثل الإنتاج بعد $n$ سنة).\n1) بيّن أن $(p_n)$ متتالية هندسية يُطلب تعيين أساسها $q$، ثم اكتب $p_n$ بدلالة $n$ وادرس اتجاه تغيرها.\n2) احسب كمية الإنتاج المتوقعة بعد سنتين ($p_2$) وبعد ثلاث سنوات ($p_3$).`,
					answer: `1) الزيادة بنسبة $${pctGrowth}%$ تعني الضرب في $q = 1 + frac(${pctGrowth}, 100) = ${qProd}$.\nإذن $p_(n+1) = ${qProd} p_n$، فهي متتالية هندسية أساسها $q = ${qProd}$ وحدها الأول $p_0 = ${prod0}$.\nالحد العام: $p_n = ${prod0} times (${qProd})^n$.\nوبما أن $p_0 > 0$ و $q = ${qProd} > 1$ فإن $(p_n)$ متزايدة تماماً.\n2) $p_2 = ${prod0} times (${qProd})^2 = ${prod2}$ قنطاراً، و $p_3 = ${prod0} times (${qProd})^3 = ${prod3}$ قنطاراً.`,
					mark: '2.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_lp',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: askTotalSaved
					? `يدخر شاب في حصالته المنزلية مبلغاً شهرياً منتظماً: وضع $u_1 = ${u1}$ دج في الشهر الأول، ويزيد كل شهر بـ $${rStep}$ دج. احسب المجموع الكلي المدخر خلال $${months}$ شهراً:`
					: `أنتجت مزرعة $p_0 = ${prod0}$ قنطار من الحبوب سنة $2024$، ويزداد إنتاجها بنسبة $${pctGrowth}\\%$ سنوياً. احسب الإنتاج المتوقع بعد سنتين ($p_2$) بالقنطار:`,
				questionTextAr: askTotalSaved
					? `احسب المجموع الإجمالي المدخر خلال $${months}$ شهراً:`
					: `احسب الإنتاج بعد سنتين $p_2$:`,
				questionData: {
					answer: quizAns,
					displayTemplate: askTotalSaved ? `S = ? DA` : `p_2 = ?`,
					variables: [],
					tolerance: 0.01
				},
				explanation: askTotalSaved
					? `$u_{${months}} = ${u1} + ${months - 1} \\times ${rStep} = ${uLast}$ دج، ومنه المجموع $S = \\frac{${months}}{2}(${u1} + ${uLast}) = ${totalSaved}$ دج.`
					: `الزيادة بـ $${pctGrowth}\\%$ توافق أساساً هندسياً $q = ${qProd}$، إذن $p_2 = ${prod0} \\times (${qProd})^2 = ${prod2}$.`
			},
			sujetExercise,
			hints: [
				'الزيادة بمقدار ثابت $r$ تعطي متتالية حسابية، بينما الزيادة بنسبة مئوية ثابتة $t\\%$ تعطي متتالية هندسية أساسها $q = 1 + \\frac{t}{100}$.',
				'إذا بدأ الترقيم من $u_1$ فإن $u_n = u_1 + (n - 1)r$ والمجموع هو $\\frac{n}{2}(u_1 + u_n)$.',
				'للمتتالية الهندسية الموجبة ($p_0 > 0$)، يكون اتجاه التغير متزايداً إذا كان $q > 1$.'
			],
			solutionStepsAr: [
				`نمذجة الادخار بمتتالية حسابية $u_n = ${u1} + (n-1)\\times ${rStep}$ وحساب $u_{${months}} = ${uLast}$ دج.`,
				`حساب مجموع الادخار الحلال خلال $${months}$ شهراً: $S = ${totalSaved}$ دج.`,
				`نمذجة الإنتاج بمتتالية هندسية $p_n = ${prod0} \\times (${qProd})^n$ وحساب $p_2 = ${prod2}$ و $p_3 = ${prod3}$.`
			],
			finalAnswer: `${quizAns}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Probability Basics: Equiprobability, Events Operations & Probability Tree
// ═══════════════════════════════════════════════════════════════════════════════

const tplProbabilityUrnEvents: ParameterizedTemplate = {
	id: 'tpl_2as_shared_lit_t2_probability_urn_events',
	grade: '2as_lp',
	trimesterId: 't2',
	domain: 'probability',
	titleAr: 'مبادئ الاحتمالات: تساوي الاحتمال، الحوادث والعمليات عليها',
	curriculumLessonId: 'lesson_2as_shared_lit_t2_probability_basics_events',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Part 1: Numbered cards 1..N (N = 10 or 12 or 15) -> Event A: multiple of d1, Event B: <= k or even
		const totalCards = difficulty === 'easy' ? 10 : rng.pick([12, 15]);
		const dA = rng.pick([2, 3]);
		const divB = dA === 2 ? 3 : 2; // distinct small divisors -> clean A, B, A cap B!

		const cards = Array.from({ length: totalCards }, (_, i) => i + 1);
		const setA = cards.filter((x) => x % dA === 0);
		const setB = cards.filter((x) => x % divB === 0);
		const setInter = cards.filter((x) => x % dA === 0 && x % divB === 0);
		const setUnion = cards.filter((x) => x % dA === 0 || x % divB === 0);

		const nA = setA.length;
		const nB = setB.length;
		const nInter = setInter.length;
		const nUnion = setUnion.length;
		const nCompA = totalCards - nA;

		const pAK = fracKatex(nA, totalCards);
		const pBK = fracKatex(nB, totalCards);
		const pInterK = fracKatex(nInter, totalCards);
		const pUnionK = fracKatex(nUnion, totalCards);
		const pCompAK = fracKatex(nCompA, totalCards);

		const pAT = fracTypst(nA, totalCards);
		const pBT = fracTypst(nB, totalCards);
		const pInterT = fracTypst(nInter, totalCards);
		const pUnionT = fracTypst(nUnion, totalCards);
		const pCompAT = fracTypst(nCompA, totalCards);

		// Part 2: Two-stage draw with replacement in an urn for tree diagram
		const rBalls = rng.pick([2, 3, 4]);
		const bBalls = rng.pick([2, 3]);
		const totBalls = rBalls + bBalls;
		const treeSvg = svgProbabilityTree({
			rootLabel: 'بداية',
			firstLevel: [
				{
					label: 'R',
					probLabel: `${rBalls}/${totBalls}`,
					children: [
						{ label: 'R', probLabel: `${rBalls}/${totBalls}` },
						{ label: 'B', probLabel: `${bBalls}/${totBalls}` }
					]
				},
				{
					label: 'B',
					probLabel: `${bBalls}/${totBalls}`,
					children: [
						{ label: 'R', probLabel: `${rBalls}/${totBalls}` },
						{ label: 'B', probLabel: `${bBalls}/${totBalls}` }
					]
				}
			]
		});
		const treeUrl = saveSvgAsset(`2as_shared_lit_t2_prob_tree_${difficulty}_s${seed}`, treeSvg);

		const correctOpt = `$${pUnionK}$`;
		const mcq = buildUniqueMcqOptions(
			correctOpt,
			[
				{
					text: `$${fracKatex(nA + nB, totalCards)}$`,
					diagnosticFeedback: `جمعت $P(A) + P(B)$ ونسيت طرح التقاطع $P(A \\cap B) = ${pInterK}$.`
				},
				{
					text: `$${pInterK}$`,
					diagnosticFeedback: `هذا هو احتمال التقاطع $P(A \\cap B)$ ("و") وليس الاتحاد $P(A \\cup B)$ ("أو").`
				},
				{
					text: `$${pCompAK}$`,
					diagnosticFeedback: `هذا هو احتمال الحادثة المعاكسة $P(\\bar{A})$.`
				}
			],
			rng
		);

		const labelA = dA === 2 ? 'عدد زوجي' : 'مضاعف للعدد 3';
		const labelB = divB === 2 ? 'عدد زوجي' : 'مضاعف للعدد 3';

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `يحتوي كيس على $${totalCards}$ بطاقة متماثلة مرقمة من $1$ إلى $${totalCards}$ (كل البطاقات لها نفس احتمال السحب). نسحب عشوائياً بطاقة واحدة.\nنعتبر الحادثتين: $A$: "سحب ${labelA}" ، و $B$: "سحب ${labelB}".`,
			content: [
				{
					type: 'text',
					content: `1) احسب احتمالات الحوادث التالية: $P(A)$ ، $P(B)$ ، و $P(overline(A))$.`,
					answer: `1) عدد الحالات الممكنة هو $"card"(Omega) = ${totalCards}$.\n- $A = {${setA.join(', ')}} arrow.r.double P(A) = frac(${nA}, ${totalCards}) = ${pAT}$.\n- $B = {${setB.join(', ')}} arrow.r.double P(B) = frac(${nB}, ${totalCards}) = ${pBT}$.\n- $P(overline(A)) = 1 - P(A) = 1 - ${pAT} = ${pCompAT}$.`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `2) عيّن الحادثة $A inter B$ واحسب $P(A inter B)$، ثم استنتج $P(A union B)$.`,
					answer: `2) $A inter B = {${setInter.join(', ')}} arrow.r.double P(A inter B) = frac(${nInter}, ${totalCards}) = ${pInterT}$.\nوباستعمال دستور الاتحاد:\n$P(A union B) = P(A) + P(B) - P(A inter B) = ${pAT} + ${pBT} - ${pInterT} = ${pUnionT}$.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `3) في تجربة ثانية، نضع في صندوق $${rBalls}$ كريات حمراء ($R$) و $${bBalls}$ كريات زرقاء ($B$) ونسحب كريتين على التوالي مع الإرجاع كما في الشجرة المرفقة. احسب احتمال سحب كريتين من نفس اللون.`,
					answer: `3) احتمال سحب كريتين من نفس اللون ($R R$ أو $B B$):\n$P(R R) + P(B B) = (frac(${rBalls}, ${totBalls}))^2 + (frac(${bBalls}, ${totBalls}))^2 = frac(${rBalls * rBalls + bBalls * bBalls}, ${totBalls * totBalls}) = ${fracTypst(rBalls * rBalls + bBalls * bBalls, totBalls * totBalls)}$.`,
					mark: '1.25'
				},
				{
					type: 'image',
					src: treeUrl,
					caption: 'شجرة الاحتمالات للسحب على التوالي مع الإرجاع'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_lp',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `نسحب عشوائياً بطاقة واحدة من صندوق به $${totalCards}$ بطاقة متماثلة مرقمة من $1$ إلى $${totalCards}$. لتكن $A$ حادثة الحصول على ${labelA} ($P(A)=${pAK}$) و $B$ حادثة الحصول على ${labelB} ($P(B)=${pBK}$). ما قيمة $P(A \\cup B)$؟`,
				questionTextAr: `احسب $P(A \\cup B)$:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices
				},
				explanation: `التقاطع $A \\cap B = \\{${setInter.join(' ; ')}\\}$ احتماله $${pInterK}$. إذن $P(A \\cup B) = ${pAK} + ${pBK} - ${pInterK} = ${pUnionK}$.`
			},
			sujetExercise,
			hints: [
				'في حالة تساوي الاحتمال، $P(E) = \\frac{\\text{card}(E)}{\\text{card}(\\Omega)}$.',
				'الحادثة المعاكسة $\\bar{A}$ تحقق $P(\\bar{A}) = 1 - P(A)$.',
				'استعمل دستور الاتحاد: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.'
			],
			solutionStepsAr: [
				`تحديد $P(A) = ${pAK}$ و $P(B) = ${pBK}$ و $P(\\bar{A}) = ${pCompAK}$.`,
				`إيجاد التقاطع $P(A \\cap B) = ${pInterK}$ ثم الاتحاد $P(A \\cup B) = ${pUnionK}$.`,
				`حساب احتمال سحب كريتين من نفس اللون من الشجرة: $${fracKatex(rBalls * rBalls + bBalls * bBalls, totBalls * totBalls)}$.`
			],
			finalAnswer: pUnionK
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Comprehensive Synthesis Problem (Auxiliary Sequence + 2-Way Probability Table)
// ═══════════════════════════════════════════════════════════════════════════════

const tplProblemSequencesProb: ParameterizedTemplate = {
	id: 'tpl_2as_shared_lit_t2_problem_sequences_prob',
	grade: '2as_lp',
	trimesterId: 't2',
	domain: 'integration',
	isIntegration: true,
	titleAr: 'المسألة الشاملة: دراسة متتالية تراجعية وجدول احتمالات',
	curriculumLessonId: 'lesson_2as_shared_lit_t2_monotonicity_comparison_halal_apps',
	defaultPoints: 7,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Part 1: u_0 = alpha + v0, u_{n+1} = 0.5 u_n + b where alpha = 2*b
		// Choose v0 divisible by 16 so u_0..u_4 are ALL exact integers!
		const b = rng.pick([100, 150, 200]);
		const alpha = 2 * b;
		const v0 = rng.pick([160, 320, 480]);
		const u0 = alpha + v0;
		const u1 = 0.5 * u0 + b;
		const u2 = 0.5 * u1 + b;
		const u3 = 0.5 * u2 + b;

		// Sum S_3 = u_0 + u_1 + u_2 + u_3
		const sumU3 = u0 + u1 + u2 + u3;

		const cobwebSvg = svgCobwebSequencePlot({
			fn: (x) => 0.5 * x + b / 100,
			u0: u0 / 100,
			steps: 4,
			fixedPoint: alpha / 100,
			xMin: 0,
			xMax: Math.ceil(u0 / 100) + 1,
			yMin: 0,
			yMax: Math.ceil(u0 / 100) + 1
		});
		const cobwebUrl = saveSvgAsset(`2as_shared_lit_t2_prob_cobweb_${difficulty}_s${seed}`, cobwebSvg);

		// Part 2: 2-way probability table for 100 Literary students (LP vs LE and Book Choice)
		const nLpLit = rng.pick([25, 30, 35]);
		const nLpLang = 55 - nLpLit;
		const nLeLit = rng.pick([15, 20]);
		const nLeLang = 45 - nLeLit;
		const totalStudents = 100;
		const totLit = nLpLit + nLeLit;
		const totLang = nLpLang + nLeLang;

		// Event A: LP (55/100), Event B: Literature book (totLit/100)
		// A cap B = nLpLit / 100, A cup B = (55 + totLit - nLpLit) / 100 = (55 + nLeLit) / 100
		const unionCount = 55 + nLeLit;

		const pAK = fracKatex(55, totalStudents);
		const pBK = fracKatex(totLit, totalStudents);
		const pInterK = fracKatex(nLpLit, totalStudents);
		const pUnionK = fracKatex(unionCount, totalStudents);

		const pAT = fracTypst(55, totalStudents);
		const pBT = fracTypst(totLit, totalStudents);
		const pInterT = fracTypst(nLpLit, totalStudents);
		const pUnionT = fracTypst(unionCount, totalStudents);

		const probTable: TableBlock = {
			type: 'table',
			headers: ['الشعبة \\ الاختيار', 'كتاب أدب وفلسفة ($B$)', 'كتاب لغات أجنبية', 'المجموع'],
			cells: [],
			rows: [
				['آداب وفلسفة ($A$)', `$${nLpLit}$`, `$${nLpLang}$`, '$55$'],
				['لغات أجنبية ($overline(A)$)', `$${nLeLit}$`, `$${nLeLang}$`, '$45$'],
				['المجموع', `$${totLit}$`, `$${totLang}$`, '$100$']
			],
			align: 'center',
			borders: 'grid',
			headerBackground: true
		};

		const askSum = difficulty !== 'easy';
		const quizAns = askSum ? sumU3 : u2;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			customTitle: 'التمرين الرابع — المسألة الشاملة',
			instruction: `يتابع مركز ثقافي بلدي تطور عدد زواره الأسبوعي واختياراتهم القرائية:`,
			content: [
				{
					type: 'text',
					content: `*الجزء الأول: دراسة متتالية عددية (4 نقاط)*\n\nفي الأسبوع الأول ($n = 0$) زار المركز $u_0 = ${u0}$ قارئاً، ويُنمذج تطور عدد الزوار بالعلاقة التراجعية:\n$u_(n+1) = 0.5 u_n + ${b}$ من أجل كل $n in bb(N)$.\n1) احسب الحدود $u_1$ و $u_2$ و $u_3$.\n2) نضع من أجل كل $n in bb(N)$: $v_n = u_n - ${alpha}$.\nأ) بيّن أن $(v_n)$ متتالية هندسية أساسها $q = 0.5$ وحدد حدها الأول $v_0$.\nب) اكتب عبارة $v_n$ ثم استنتج عبارة $u_n$ بدلالة $n$.\n3) احسب المجموع $S_3 = u_0 + u_1 + u_2 + u_3$.`,
					answer: `1) $u_1 = 0.5(${u0}) + ${b} = ${u1}$، $u_2 = 0.5(${u1}) + ${b} = ${u2}$، $u_3 = 0.5(${u2}) + ${b} = ${u3}$.\n2) أ) $v_(n+1) = u_(n+1) - ${alpha} = 0.5 u_n + ${b} - ${alpha} = 0.5 u_n - ${b} = 0.5(u_n - ${alpha}) = 0.5 v_n$.\nإذن $(v_n)$ متتالية هندسية أساسها $q = 0.5$ وحدها الأول $v_0 = u_0 - ${alpha} = ${v0}$.\nب) $v_n = ${v0} times (0.5)^n$، ومنه $u_n = ${alpha} + ${v0} times (0.5)^n$.\n3) $S_3 = 4(${alpha}) + ${v0} times frac(1 - (0.5)^4, 1 - 0.5) = ${4 * alpha} + ${2 * v0} times frac(15, 16) = ${4 * alpha} + ${(v0 * 15) / 8} = ${sumU3}$.`,
					mark: '4'
				},
				{
					type: 'image',
					src: cobwebUrl,
					caption: 'التمثيل التراجعي للحدود الأولى (بالمئات)'
				},
				{
					type: 'text',
					content: `*الجزء الثاني: الاحتمالات بالجدول ذي المدخلين (3 نقاط)*\n\nاختير تلميذ عشوائياً من بين $100$ تلميذ مسجل في المركز، حيث يوضح الجدول التالي توزيعهم حسب الشعبة ونوع الكتاب المستعار:`,
					answer: `تقديم معطيات الجدول ذي المدخلين ($N = 100$).`,
					mark: '0.5'
				},
				probTable,
				{
					type: 'text',
					content: `لتكن $A$ حادثة "التلميذ من شعبة آداب وفلسفة" و $B$ حادثة "استعار كتاب أدب وفلسفة".\n1) احسب الاحتمالين $P(A)$ و $P(B)$.\n2) عيّن $P(A inter B)$ (تلميذ من آداب وفلسفة واستعار كتاب أدب وفلسفة).\n3) استنتج احتمال الحادثة $A union B$ (تلميذ من آداب وفلسفة أو استعار كتاب أدب وفلسفة).`,
					answer: `1) $P(A) = frac(55, 100) = ${pAT}$، و $P(B) = frac(${totLit}, 100) = ${pBT}$.\n2) من تقاطع السطر الأول والعمود الأول: $P(A inter B) = frac(${nLpLit}, 100) = ${pInterT}$.\n3) باستعمال دستور الاتحاد:\n$P(A union B) = P(A) + P(B) - P(A inter B) = frac(55 + ${totLit} - ${nLpLit}, 100) = frac(${unionCount}, 100) = ${pUnionT}$.`,
					mark: '2.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_lp',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: askSum
					? `في المسألة الشاملة، المتتالية $(u_n)$ معرفة بـ $u_0 = ${u0}$ و $u_{n+1} = 0.5 u_n + ${b}$. احسب المجموع $S_3 = u_0 + u_1 + u_2 + u_3$:`
					: `في المسألة الشاملة، المتتالية $(u_n)$ معرفة بـ $u_0 = ${u0}$ و $u_{n+1} = 0.5 u_n + ${b}$. احسب الحد $u_2$:`,
				questionTextAr: askSum ? `احسب المجموع $S_3$:` : `احسب قيمة $u_2$:`,
				imageUrl: cobwebUrl,
				imageCaption: 'التمثيل البياني للمتتالية التراجعية (بالمئات)',
				questionData: {
					answer: quizAns,
					displayTemplate: askSum ? `S_3 = ?` : `u_2 = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: askSum
					? `الحدود هي $u_0 = ${u0}, u_1 = ${u1}, u_2 = ${u2}, u_3 = ${u3}$ ومجموعها $S_3 = ${sumU3}$.`
					: `$u_1 = 0.5(${u0}) + ${b} = ${u1}$، ثم $u_2 = 0.5(${u1}) + ${b} = ${u2}$.`
			},
			sujetExercise,
			hints: [
				'لإثبات أن $(v_n)$ هندسية، احسب $v_{n+1} = u_{n+1} - \\alpha$ وعوض $u_{n+1}$ ثم اخرج $0.5$ عاملاً مشتركاً.',
				'مجموع $u_k = \\alpha + v_k$ يساوي مجموع الثوابت $(n+1)\\alpha$ مضافاً إليه مجموع حدود المتتالية الهندسية $(v_k)$.',
				'في الجدول ذي المدخلين، نقرأ $P(A \\cap B)$ مباشرة من الخانة المشتركة ثم نطبق $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.'
			],
			solutionStepsAr: [
				`حساب الحدود $u_1 = ${u1}$ و $u_2 = ${u2}$ و $u_3 = ${u3}$.`,
				`إثبات أن $v_n = u_n - ${alpha}$ هندسية أساسها $0.5$ وحدها الأول $${v0}$.`,
				`استنتاج $u_n = ${alpha} + ${v0}(0.5)^n$ وحساب المجموع $S_3 = ${sumU3}$.`,
				`حساب الاحتمالات: $P(A)=${pAK}$، $P(B)=${pBK}$، $P(A \\cap B)=${pInterK}$، و $P(A \\cup B)=${pUnionK}$.`
			],
			finalAnswer: `${quizAns}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 2 Parameterized Templates — 2AS Literary Shared Core
// ═══════════════════════════════════════════════════════════════════════════════

export const SHARED_TEMPLATES_2AS_LIT_T2: ParameterizedTemplate[] = [
	tplSequenceTermsMonotonicity,
	tplArithmeticSequence,
	tplGeometricSequence,
	tplHalalSavingsProduction,
	tplProbabilityUrnEvents,
	tplProblemSequencesProb
];
