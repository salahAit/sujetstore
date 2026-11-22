import type { ExerciseBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';
import { buildUniqueMcqOptions, SeededRng, simplifyFraction } from '../../rng';
import { saveSvgAsset } from '../../svg-helpers';
import { svgFunctionCurvePlot, svgVariationTable } from '../../svg-secondary';

// ═══════════════════════════════════════════════════════════════════════════════
// 3AS Literary (LP / LE) — Trimester 2 Parameterized Templates (6 templates)
// Topics: Limits & Asymptotes, Cubic Derivatives & Tangents, Cubic Variations &
// Inflection, Graphical Reading, Roots & Symmetry, 08-pt BAC Cubic Synthesis.
// Uses svgFunctionCurvePlot & svgVariationTable + saveSvgAsset.
// Dual Syntax: KaTeX vs pure Typst math in sujetExercise.
// ═══════════════════════════════════════════════════════════════════════════════

function signedTail(c: number): string {
	if (c === 0) return '';
	return c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`;
}

function linearKatex(a: number, b: number, v = 'x'): string {
	let head = '';
	if (a === 1) head = v;
	else if (a === -1) head = `-${v}`;
	else if (a !== 0) head = `${a}${v}`;
	if (!head) return `${b}`;
	return `${head}${signedTail(b)}`;
}

function linearTypst(a: number, b: number, v = 'x'): string {
	let head = '';
	if (a === 1) head = v;
	else if (a === -1) head = `-${v}`;
	else if (a !== 0) head = `${a} ${v}`;
	if (!head) return `${b}`;
	return `${head}${signedTail(b)}`;
}

function poly2Katex(a: number, b: number, c: number, v = 'x'): string {
	const parts: string[] = [];
	if (a !== 0) {
		if (a === 1) parts.push(`${v}^2`);
		else if (a === -1) parts.push(`-${v}^2`);
		else parts.push(`${a}${v}^2`);
	}
	if (b !== 0) {
		const absB = Math.abs(b);
		const term = absB === 1 ? v : `${absB}${v}`;
		if (parts.length === 0) parts.push(b < 0 ? `-${term}` : term);
		else parts.push(b < 0 ? `- ${term}` : `+ ${term}`);
	}
	if (c !== 0 || parts.length === 0) {
		if (parts.length === 0) parts.push(`${c}`);
		else parts.push(c < 0 ? `- ${Math.abs(c)}` : `+ ${c}`);
	}
	return parts.join(' ');
}

function poly2Typst(a: number, b: number, c: number, v = 'x'): string {
	const parts: string[] = [];
	if (a !== 0) {
		if (a === 1) parts.push(`${v}^2`);
		else if (a === -1) parts.push(`-${v}^2`);
		else parts.push(`${a} ${v}^2`);
	}
	if (b !== 0) {
		const absB = Math.abs(b);
		const term = absB === 1 ? v : `${absB} ${v}`;
		if (parts.length === 0) parts.push(b < 0 ? `-${term}` : term);
		else parts.push(b < 0 ? `- ${term}` : `+ ${term}`);
	}
	if (c !== 0 || parts.length === 0) {
		if (parts.length === 0) parts.push(`${c}`);
		else parts.push(c < 0 ? `- ${Math.abs(c)}` : `+ ${c}`);
	}
	return parts.join(' ');
}

function poly3Katex(a: number, b: number, c: number, d: number, v = 'x'): string {
	const parts: string[] = [];
	if (a !== 0) {
		if (a === 1) parts.push(`${v}^3`);
		else if (a === -1) parts.push(`-${v}^3`);
		else parts.push(`${a}${v}^3`);
	}
	if (b !== 0) {
		const absB = Math.abs(b);
		const term = absB === 1 ? `${v}^2` : `${absB}${v}^2`;
		if (parts.length === 0) parts.push(b < 0 ? `-${term}` : term);
		else parts.push(b < 0 ? `- ${term}` : `+ ${term}`);
	}
	if (c !== 0) {
		const absC = Math.abs(c);
		const term = absC === 1 ? v : `${absC}${v}`;
		if (parts.length === 0) parts.push(c < 0 ? `-${term}` : term);
		else parts.push(c < 0 ? `- ${term}` : `+ ${term}`);
	}
	if (d !== 0 || parts.length === 0) {
		if (parts.length === 0) parts.push(`${d}`);
		else parts.push(d < 0 ? `- ${Math.abs(d)}` : `+ ${d}`);
	}
	return parts.join(' ');
}

function poly3Typst(a: number, b: number, c: number, d: number, v = 'x'): string {
	const parts: string[] = [];
	if (a !== 0) {
		if (a === 1) parts.push(`${v}^3`);
		else if (a === -1) parts.push(`-${v}^3`);
		else parts.push(`${a} ${v}^3`);
	}
	if (b !== 0) {
		const absB = Math.abs(b);
		const term = absB === 1 ? `${v}^2` : `${absB} ${v}^2`;
		if (parts.length === 0) parts.push(b < 0 ? `-${term}` : term);
		else parts.push(b < 0 ? `- ${term}` : `+ ${term}`);
	}
	if (c !== 0) {
		const absC = Math.abs(c);
		const term = absC === 1 ? v : `${absC} ${v}`;
		if (parts.length === 0) parts.push(c < 0 ? `-${term}` : term);
		else parts.push(c < 0 ? `- ${term}` : `+ ${term}`);
	}
	if (d !== 0 || parts.length === 0) {
		if (parts.length === 0) parts.push(`${d}`);
		else parts.push(d < 0 ? `- ${Math.abs(d)}` : `+ ${d}`);
	}
	return parts.join(' ');
}

function factorKatex(r: number, v = 'x'): string {
	if (r === 0) return v;
	return r > 0 ? `(${v} - ${r})` : `(${v} + ${Math.abs(r)})`;
}

function factorTypst(r: number, v = 'x'): string {
	if (r === 0) return v;
	return r > 0 ? `(${v} - ${r})` : `(${v} + ${Math.abs(r)})`;
}

function assertCentralDifference(
	fn: (x: number) => number,
	fnPrime: (x: number) => number,
	points: number[],
	label: string
): void {
	const h = 1e-6;
	for (const x of points) {
		const exact = fnPrime(x);
		const approx = (fn(x + h) - fn(x - h)) / (2 * h);
		if (!Number.isFinite(exact) || !Number.isFinite(approx) || Math.abs(exact - approx) >= 1e-4) {
			throw new Error(`${label} derivative mismatch at x=${x}: exact=${exact}, approx=${approx}`);
		}
	}
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Limits (Polynomials & Homographic) + Horizontal & Vertical Asymptotes
// ═══════════════════════════════════════════════════════════════════════════════

const tplLimitsAsymptotes: ParameterizedTemplate = {
	id: 'tpl_3as_shared_lit_t2_limits_asymptotes',
	grade: '3as_lp',
	trimesterId: 't2',
	domain: 'analysis',
	titleAr: 'النهايات عند اللانهاية ومن جهة واحدة والمستقيمات المقاربة',
	curriculumLessonId: 'lesson_3as_shared_lit_t2_limits_asymptotes',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Part A: Cubic polynomial P(x)
		const p3 = rng.pick([-3, -2, -1, 1, 2, 3]);
		const p2 = rng.pick([-4, -2, 1, 3, 5]);
		const p1 = rng.pick([-5, -3, 2, 4]);
		const p0 = rng.pick([-7, -1, 3, 6]);
		const limPNegInfK = p3 > 0 ? '-\\infty' : '+\\infty';
		const limPNegInfT = p3 > 0 ? '-oo' : '+oo';
		const limPPosInfT = p3 > 0 ? '+oo' : '-oo';

		// Part B: Homographic f(x) = (a x + b) / (cDen * (x - x0)) with cDen = 1 or -1 (hard tests negative coeff in denom!)
		const x0 = rng.pick([-3, -2, -1, 1, 2, 3]);
		const a = rng.pick([-3, -2, -1, 1, 2, 3]);
		const cDen = difficulty === 'hard' ? -1 : 1;
		const kNum = rng.pick([-4, -3, -2, 2, 3, 4]); // a * x + b = a*(x - x0) + kNum so non-zero numerator at x0!
		const b = kNum - a * x0;
		const horizAsymp = a / cDen; // exact integer!
		// f(x) = (a x + b) / (cDen * x - cDen * x0)
		// At x -> x0^+: denom = cDen * (x - x0) has sign of cDen; num -> kNum
		const rightSignPositive = kNum * cDen > 0;
		const limRightK = rightSignPositive ? '+\\infty' : '-\\infty';
		const limRightT = rightSignPositive ? '+oo' : '-oo';
		const limLeftK = rightSignPositive ? '-\\infty' : '+\\infty';
		const limLeftT = rightSignPositive ? '-oo' : '+oo';

		const pKatex = poly3Katex(p3, p2, p1, p0);
		const pTypst = poly3Typst(p3, p2, p1, p0);
		const numK = linearKatex(a, b, 'x');
		const numT = linearTypst(a, b, 'x');
		const denK = linearKatex(cDen, -cDen * x0, 'x');
		const denT = linearTypst(cDen, -cDen * x0, 'x');
		const fKatex = `\\frac{${numK}}{${denK}}`;
		const fTypst = `frac(${numT}, ${denT})`;

		const curveSvg = svgFunctionCurvePlot({
			xMin: x0 - 4,
			xMax: x0 + 4,
			yMin: horizAsymp - 6,
			yMax: horizAsymp + 6,
			fn: (x) => (Math.abs(x - x0) > 0.1 ? (a * x + b) / (cDen * (x - x0)) : Number.NaN),
			curveLabel: '(C_f)',
			asymptotes: [
				{ kind: 'vertical', value: x0, label: `x = ${x0}`, color: '#dc2626' },
				{ kind: 'horizontal', value: horizAsymp, label: `y = ${horizAsymp}`, color: '#059669' }
			]
		});
		const curveUrl = saveSvgAsset(`3as_shared_lit_t2_limits_${difficulty}_s${seed}`, curveSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = p3 > 0 ? '-∞' : '+∞';
			const mcq = buildUniqueMcqOptions(
				`$${limPNegInfK}$`,
				[
					{
						text: `$${p3 > 0 ? '+\\infty' : '-\\infty'}$`,
						diagnosticFeedback: `انتبه لإشارة $(-\\infty)^3 = -\\infty$ ومعامل $x^3$ وهو $${p3}$ .`
					},
					{
						text: `$${p3}$`,
						diagnosticFeedback: `النهاية عند $-\\infty$ لكثير حدود غير ثابت هي غير منتهية وليست المعامل $${p3}$ .`
					},
					{
						text: `$${p0}$`,
						diagnosticFeedback: `الحد الثابت $${p0}$ يُهمل أمام الحد الأعلى درجة $${p3}x^3$ عند اللانهاية.`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `نعتبر كثير الحدود $P(x) = ${pKatex}$ . ما هي قيمة النهاية $\\lim_{x \\to -\\infty} P(x)$ ؟`,
				questionTextAr: `احسب $\\lim_{x \\to -\\infty} (${pKatex})$ :`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نهاية كثير الحدود عند $-\\infty$ هي نهاية حده الأعلى درجة: $\\lim_{x \\to -\\infty} (${p3}x^3) = ${limPNegInfK}$ .`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = rightSignPositive ? '+∞' : '-∞';
			const mcq = buildUniqueMcqOptions(
				`$${limRightK}$`,
				[
					{
						text: `$${limLeftK}$`,
						diagnosticFeedback: `عند $x \\to ${x0}^+$ تكون إشارة المقام $${denK}$ ${cDen > 0 ? 'موجبة ($0^+$)' : 'سالبة ($0^-$)'} والبسط يؤول إلى $${kNum}$ .`
					},
					{
						text: `$${horizAsymp}$`,
						diagnosticFeedback: `$${horizAsymp}$ هي نهاية الدالة عند $\\pm\\infty$ وليست عند القيمة الممنوعة $x = ${x0}$ .`
					},
					{
						text: `$0$`,
						diagnosticFeedback: `البسط يؤول إلى العدد غير المعدوم $${kNum}$ والمقام يؤول إلى $0$ ، فلا تساوي النهاية صفراً.`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `لتكن الدالة التناظرية $f(x) = ${fKatex}$ المعرفة على $\\mathbb{R} \\setminus \\{${x0}\\}$ . ما هي قيمة النهاية $\\lim_{x \\to ${x0}^+} f(x)$ ؟`,
				questionTextAr: `احسب النهاية من اليمين $\\lim_{x \\to ${x0}^+} ${fKatex}$ :`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `لما $x \\to ${x0}^+$ يؤول البسط إلى $${kNum}$ والمقام $${denK}$ يؤول إلى $${cDen > 0 ? '0^+' : '0^-'}$ ، ومنه $\\lim_{x \\to ${x0}^+} f(x) = ${limRightK}$ .`
			};
		} else {
			finalAnswer = `x = ${x0} , y = ${horizAsymp}`;
			const mcq = buildUniqueMcqOptions(
				`$x = ${x0}$ و $y = ${horizAsymp}$`,
				[
					{
						text: `$x = ${-x0}$ و $y = ${horizAsymp}$`,
						diagnosticFeedback: `القيمة التي تعدم المقام $${denK} = 0$ هي $x = ${x0}$ وليس $-${x0}$ .`
					},
					{
						text: `$x = ${x0}$ و $y = ${a}$`,
						diagnosticFeedback: `انتبه لإشارة معامل $x$ في المقام ($${cDen}$): المقارب الأفقي هو $y = \\frac{${a}}{${cDen}} = ${horizAsymp}$ .`
					},
					{
						text: `$x = ${horizAsymp}$ و $y = ${x0}$`,
						diagnosticFeedback: `المقارب العمودي معادلته $x = ${x0}$ والمقارب الأفقي معادلته $y = ${horizAsymp}$ .`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `عيّن معادلتي المستقيمين المقاربين (العمودي والأفقي) لمنحنى الدالة التناظرية $f(x) = ${fKatex}$ المعرفة على $\\mathbb{R} \\setminus \\{${x0}\\}$ :`,
				questionTextAr: `ما هما معادلتا المقاربين للمنحنى $(C_f)$ للدالة $f(x) = ${fKatex}$ ؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `ينعدم المقام عند $x = ${x0}$ (مقارب عمودي $x = ${x0}$)، والنهاية عند $\\pm\\infty$ تساوي $\\frac{${a}}{${cDen}} = ${horizAsymp}$ (مقارب أفقي $y = ${horizAsymp}$).`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `يتكون هذا التمرين من جزأين حول حساب النهايات وتعيين المستقيمات المقاربة.`,
			content: [
				{
					type: 'text',
					content: `*الجزء الأول:* نعتبر الدالة الكثيرة الحدود $P$ المعرفة على $bb(R)$ بـ: $P(x) = ${pTypst}$ .\nاحسب $lim_(x arrow.r -oo) P(x)$ و $lim_(x arrow.r +oo) P(x)$ .`,
					answer: `*الجزء الأول:* نهاية كثير الحدود عند اللانهاية هي نهاية حده الأعلى درجة:\n- $lim_(x arrow.r -oo) P(x) = lim_(x arrow.r -oo) (${p3} x^3) = ${limPNegInfT}$ .\n- $lim_(x arrow.r +oo) P(x) = lim_(x arrow.r +oo) (${p3} x^3) = ${limPPosInfT}$ .`,
					mark: '1'
				},
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `*الجزء الثاني:* نعتبر الدالة التناظرية $f$ المعرفة على $D_f = bb(R) - {${x0}}$ بـ: $f(x) = ${fTypst}$ .\n1) احسب نهايتي $f$ عند $-oo$ و $+oo$ ، وفسّر النتيجة هندسياً.\n2) احسب $lim_(x arrow.r ${x0}^-) f(x)$ و $lim_(x arrow.r ${x0}^+) f(x)$ ، ثم استنتج معادلة المقارب العمودي.`,
							answer: `*الجزء الثاني:*\n1) $lim_(x arrow.r -oo) f(x) = lim_(x arrow.r +oo) f(x) = frac(${a}, ${cDen}) = ${horizAsymp}$ .\nالتفسير الهندسي: المستقيم ذو المعادلة $y = ${horizAsymp}$ مقارب أفقي للمنحنى $(C_f)$ بجوار $-oo$ و $+oo$ .\n2) عند $x = ${x0}$ البسط يؤول إلى $${kNum}$ :\n- لما $x arrow.r ${x0}^-$ المقام يؤول إلى $${cDen > 0 ? '0^-' : '0^+'}$ ومنه $lim_(x arrow.r ${x0}^-) f(x) = ${limLeftT}$ .\n- لما $x arrow.r ${x0}^+$ المقام يؤول إلى $${cDen > 0 ? '0^+' : '0^-'}$ ومنه $lim_(x arrow.r ${x0}^+) f(x) = ${limRightT}$ .\nإذن المستقيم ذو المعادلة $x = ${x0}$ مقارب عمودي لـ $(C_f)$ .`,
							mark: '3'
						},
						{
							type: 'image',
							src: curveUrl,
							caption: `المنحنى البياني (C_f) والمستقيمان المقاربان x = ${x0} و y = ${horizAsymp}`
						}
					]
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_lp',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`نهاية كثير الحدود عند $\\pm\\infty$ هي نهاية حده الأعلى درجة $${p3}x^3$ فقط.`,
				`نهاية الدالة التناظرية عند $\\pm\\infty$ هي نسبة معاملي $x$ في البسط والمقام: $\\frac{${a}}{${cDen}} = ${horizAsymp}$ .`,
				`ادرس إشارة المقام $${denK}$ عن يمين $${x0}$ وعن يساره قبل تحديد إشارة اللانهاية.`
			],
			solutionStepsAr: [
				`نهايتا كثير الحدود: عند $-\\infty$ تساوي $${limPNegInfK}$ وعند $+\\infty$ تساوي $${p3 > 0 ? '+\\infty' : '-\\infty'}$ .`,
				`المقارب الأفقي لـ $f$ هو $y = ${horizAsymp}$ عند $\\pm\\infty$ .`,
				`النهايات عند $${x0}$ تعطي $\\lim_{x \\to ${x0}^-} f(x) = ${limLeftK}$ و $\\lim_{x \\to ${x0}^+} f(x) = ${limRightK}$ والمقارب العمودي $x = ${x0}$ .`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Cubic Derivatives, Tangent Equation & Parallel Tangents
// ═══════════════════════════════════════════════════════════════════════════════

const tplCubicTangentParallel: ParameterizedTemplate = {
	id: 'tpl_3as_shared_lit_t2_cubic_tangent_parallel',
	grade: '3as_lp',
	trimesterId: 't2',
	domain: 'analysis',
	titleAr: 'مشتق كثير حدود من الدرجة 3، معادلة المماس والمماسات الموازية لمستقيم',
	curriculumLessonId: 'lesson_3as_shared_lit_t2_derivability_tangents',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// f'(x) = 3(x - p)^2 - 3 k^2 + m => f'(x) = m at x1 = p - k and x2 = p + k
		const p = difficulty === 'easy' ? rng.pick([1, 2]) : rng.pick([-1, 1, 2]);
		const k = rng.pick([1, 2]);
		const m = rng.pick([-3, 3, 6, 9]);
		const d = rng.pick([-3, -1, 2, 4]);
		const x0 = p; // clean tangent at x0 = p where f'(p) = m - 3 k^2!

		const a3 = 1;
		const a2 = -3 * p;
		const a1 = 3 * (p * p - k * k) + m;
		const a0 = d;

		const f = (x: number) => a3 * x * x * x + a2 * x * x + a1 * x + a0;
		const fPrime = (x: number) => 3 * a3 * x * x + 2 * a2 * x + a1;
		assertCentralDifference(f, fPrime, [-1.5, 0, p, 2.3], 'lit_t2_tangent');

		const fx0 = f(x0);
		const fpX0 = fPrime(x0);
		const tgIntercept = fx0 - fpX0 * x0;

		const r1 = p - k;
		const r2 = p + k;
		const yR1 = f(r1);
		const yR2 = f(r2);
		if (fPrime(r1) !== m || fPrime(r2) !== m) {
			throw new Error('Parallel tangent slope mismatch');
		}

		const fKatex = poly3Katex(a3, a2, a1, a0);
		const fTypst = poly3Typst(a3, a2, a1, a0);
		const fpKatex = poly2Katex(3 * a3, 2 * a2, a1);
		const fpTypst = poly2Typst(3 * a3, 2 * a2, a1);
		const tgEqK = `y = ${linearKatex(fpX0, tgIntercept, 'x')}`;
		const tgEqT = `y = ${linearTypst(fpX0, tgIntercept, 'x')}`;

		const yVals = [fx0, yR1, yR2, f(r1 - 1), f(r2 + 1)];
		const curveSvg = svgFunctionCurvePlot({
			xMin: r1 - 1.5,
			xMax: r2 + 1.5,
			yMin: Math.floor(Math.min(...yVals) - 2),
			yMax: Math.ceil(Math.max(...yVals) + 2),
			fn: f,
			curveLabel: '(C_f)',
			tangents: [
				{ x: x0, y: fx0, slope: fpX0, halfSpan: 1.0, color: '#dc2626' },
				{ x: r1, y: yR1, slope: m, halfSpan: 0.9, color: '#059669' }
			],
			points: [
				{ x: x0, y: fx0, label: `A(${x0}, ${fx0})`, color: '#dc2626' },
				{ x: r1, y: yR1, label: `B(${r1}, ${yR1})`, color: '#059669' }
			]
		});
		const curveUrl = saveSvgAsset(`3as_shared_lit_t2_tangent_${difficulty}_s${seed}`, curveSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${fpX0}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر الدالة $f(x) = ${fKatex}$ المعرفة على $\\mathbb{R}$ . احسب العدد المشتق $f'(${x0})$ (معامل توجيه المماس عند الفاصلة $x_0 = ${x0}$) :`,
				questionTextAr: `احسب $f'(${x0})$ للدالة $f(x) = ${fKatex}$ :`,
				questionData: { answer: fpX0, displayTemplate: `f'(${x0}) = ?`, variables: [], tolerance: 0 },
				explanation: `المشتقة هي $f'(x) = ${fpKatex}$ ، وبالتعويض عند $x = ${x0}$ نجد $f'(${x0}) = ${fpX0}$ .`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = tgEqK;
			const mcq = buildUniqueMcqOptions(
				`$${tgEqK}$`,
				[
					{
						text: `$y = ${linearKatex(fpX0, fx0 + fpX0 * x0, 'x')}$`,
						diagnosticFeedback: `انتبه لإشارة $(x - (${x0}))$ في دستور المماس $y = f'(${x0})(x - (${x0})) + f(${x0})$ .`
					},
					{
						text: `$y = ${linearKatex(fx0, fpX0, 'x')}$`,
						diagnosticFeedback: `خلطت بين ميل المماس $f'(${x0}) = ${fpX0}$ وبين الترتيبة $f(${x0}) = ${fx0}$ .`
					},
					{
						text: `$y = ${linearKatex(fpX0, -fpX0 * x0, 'x')}$`,
						diagnosticFeedback: `نسيت إضافة الترتيبة $f(${x0}) = ${fx0}$ في معادلة المماس.`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `ما هي معادلة المماس $(T)$ لمنحنى الدالة $f(x) = ${fKatex}$ عند النقطة ذات الفاصلة $x_0 = ${x0}$ ؟`,
				questionTextAr: `عيّن معادلة المماس $(T)$ لـ $(C_f)$ عند $x_0 = ${x0}$ :`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `لدينا $f(${x0}) = ${fx0}$ و $f'(${x0}) = ${fpX0}$ ، إذن $(T): y = ${fpX0}(x - (${x0})) + (${fx0}) = ${linearKatex(fpX0, tgIntercept, 'x')}$ .`
			};
		} else {
			finalAnswer = `x = ${r1} ; x = ${r2}`;
			const mcq = buildUniqueMcqOptions(
				`$x = ${r1}$ و $x = ${r2}$`,
				[
					{
						text: `$x = ${-r1}$ و $x = ${-r2}$`,
						diagnosticFeedback: `تحقق من إشارة الجذرين عند حل المعادلة $f'(x) = ${m}$ .`
					},
					{
						text: `$x = ${x0}$ فقط`,
						diagnosticFeedback: `الفاصلة $x = ${x0}$ لا تحقق $f'(x) = ${m}$ بل هي مركز الانعطاف.`
					},
					{
						text: `$x = ${r1}$ فقط`,
						diagnosticFeedback: `المعادلة من الدرجة الثانية $3(x - ${p})^2 = ${3 * k * k}$ تقبل حلّين متمايزين!`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `ما هما فاصلتا نقطتي منحنى الدالة $f(x) = ${fKatex}$ اللتين يكون المماس عندهما موازياً للمستقيم $(\\Delta): y = ${m}x + 5$ ؟`,
				questionTextAr: `عيّن فواصل النقط ذات المماس الموازي لـ $y = ${m}x + 5$ :`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نحل المعادلة $f'(x) = ${m} \\iff ${fpKatex} = ${m} \\iff 3(x - (${p}))^2 = ${3 * k * k} \\iff x - (${p}) = \\pm ${k}$ ، أي $x = ${r1}$ و $x = ${r2}$ .`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر الدالة العددية $f$ المعرفة على $bb(R)$ بـ: $f(x) = ${fTypst}$ ، وليكن $(C_f)$ تمثيلها البياني.`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) احسب الدالة المشتقة $f'(x)$ من أجل كل $x in bb(R)$ ، ثم احسب $f(${x0})$ و $f'(${x0})$ .\n2) اكتب معادلة المماس $(T)$ للمنحنى $(C_f)$ عند النقطة ذات الفاصلة $x_0 = ${x0}$ .\n3) عيّن إحداثيي النقطتين من $(C_f)$ اللتين يكون المماس عندهما موازياً للمستقيم $(Delta): y = ${m} x + 5$ .`,
							answer: `1) المشتقة: $f'(x) = ${fpTypst}$ .\nعند $x_0 = ${x0}$ لدينا $f(${x0}) = ${fx0}$ و $f'(${x0}) = ${fpX0}$ .\n2) معادلة المماس $(T)$ : $y = f'(${x0})(x - (${x0})) + f(${x0}) arrow.r.double ${tgEqT}$ .\n3) التوازي يعني $f'(x) = ${m}$ أي $${fpTypst} = ${m} arrow.l.r.double 3 ${factorTypst(p)}^2 = ${3 * k * k} arrow.l.r.double ${factorTypst(p)} = plus.minus ${k}$ .\nومنه الفاصلتان هما $x_1 = ${r1}$ و $x_2 = ${r2}$ ، والنقطتان هما $B(${r1}, ${yR1})$ و $C(${r2}, ${yR2})$ .`,
							mark: '4'
						},
						{
							type: 'image',
							src: curveUrl,
							caption: `المنحنى (C_f) والمماس عند A والمماس الموازي عند B`
						}
					]
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_lp',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`اشتق كل حد باستعمال $(x^n)' = n x^{n-1}$ .`,
				`معادلة المماس عند $x_0$ هي $y = f'(x_0)(x - x_0) + f(x_0)$ .`,
				`يكون المماس موازياً للمستقيم $y = ${m}x + 5$ إذا كان لهما نفس معامل التوجيه: $f'(x) = ${m}$ .`
			],
			solutionStepsAr: [
				`حساب المشتقة: $f'(x) = ${fpKatex}$ ، وعند $${x0}$ نجد $f(${x0}) = ${fx0}$ و $f'(${x0}) = ${fpX0}$ .`,
				`معادلة المماس عند $x_0 = ${x0}$ هي $${tgEqK}$ .`,
				`حل $f'(x) = ${m}$ يعطي النقطتين $(${r1}; ${yR1})$ و $(${r2}; ${yR2})$ .`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Cubic Monotonicity, Variation Table, Extrema & Inflection Point
// ═══════════════════════════════════════════════════════════════════════════════

const tplCubicVariationsInflection: ParameterizedTemplate = {
	id: 'tpl_3as_shared_lit_t2_cubic_variations_inflection',
	grade: '3as_lp',
	trimesterId: 't2',
	domain: 'analysis',
	titleAr: 'اتجاه تغير دالة كثيرة حدود من الدرجة 3، القيم الحدية ونقطة الانعطاف',
	curriculumLessonId: 'lesson_3as_shared_lit_t2_cubic_variation_inflection',
	defaultPoints: 5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// f(x) = a * x^3 - 3*a*xI * x^2 + 3*a*(xI^2 - k^2) * x + d
		// f'(x) = 3*a*(x - (xI - k))*(x - (xI + k)), f''(x) = 6*a*(x - xI)
		const a = difficulty === 'easy' ? 1 : rng.pick([1, -1]);
		const xI = difficulty === 'easy' ? rng.pick([1, 2]) : rng.pick([-1, 0, 1, 2]);
		const k = rng.pick([1, 2]);
		const d = rng.pick([-3, -1, 1, 2, 4]);

		const b = -3 * a * xI;
		const c = 3 * a * (xI * xI - k * k);
		const f = (x: number) => ((a * x + b) * x + c) * x + d;
		const fPrime = (x: number) => 3 * a * x * x + 2 * b * x + c;
		const fSecond = (x: number) => 6 * a * x + 2 * b;

		assertCentralDifference(f, fPrime, [-1.4, xI, 2.6], 'lit_t2_var.fp');
		assertCentralDifference(fPrime, fSecond, [-1.4, xI, 2.6], 'lit_t2_var.fpp');

		const x1 = xI - k;
		const x2 = xI + k;
		const y1 = f(x1);
		const y2 = f(x2);
		const yI = f(xI);
		if (fPrime(x1) !== 0 || fPrime(x2) !== 0 || fSecond(xI) !== 0) {
			throw new Error('Critical/inflection point check failed');
		}

		const sOut: '+' | '-' = a > 0 ? '+' : '-';
		const sIn: '+' | '-' = a > 0 ? '-' : '+';

		const varSvg = svgVariationTable({
			fnName: 'f(x)',
			derivName: "f'(x)",
			xValues: ['-∞', `${x1}`, `${x2}`, '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: sOut },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: sIn },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: sOut }
			],
			variations: [
				{ value: a > 0 ? '-∞' : '+∞', position: a > 0 ? 'bottom' : 'top' },
				{ value: `${y1}`, position: a > 0 ? 'top' : 'bottom' },
				{ value: `${y2}`, position: a > 0 ? 'bottom' : 'top' },
				{ value: a > 0 ? '+∞' : '-∞', position: a > 0 ? 'top' : 'bottom' }
			]
		});
		const varUrl = saveSvgAsset(`3as_shared_lit_t2_vartable_${difficulty}_s${seed}`, varSvg);

		const yMinVal = Math.min(y1, y2);
		const yMaxVal = Math.max(y1, y2);
		const curveSvg = svgFunctionCurvePlot({
			xMin: x1 - 1.6,
			xMax: x2 + 1.6,
			yMin: yMinVal - 3,
			yMax: yMaxVal + 3,
			fn: f,
			curveLabel: '(C_f)',
			points: [
				{ x: x1, y: y1, label: `(${x1}, ${y1})`, color: '#15803d' },
				{ x: xI, y: yI, label: `Ω(${xI}, ${yI})`, color: '#7c3aed' },
				{ x: x2, y: y2, label: `(${x2}, ${y2})`, color: '#dc2626' }
			]
		});
		const curveUrl = saveSvgAsset(`3as_shared_lit_t2_varcurve_${difficulty}_s${seed}`, curveSvg);

		const fKatex = poly3Katex(a, b, c, d);
		const fTypst = poly3Typst(a, b, c, d);
		const fpKatex = poly2Katex(3 * a, 2 * b, c);
		const fpTypst = poly2Typst(3 * a, 2 * b, c);
		const fppKatex = linearKatex(6 * a, 2 * b);
		const fppTypst = linearTypst(6 * a, 2 * b);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${xI}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر الدالة $f(x) = ${fKatex}$ المعرفة على $\\mathbb{R}$ . اوجد فاصلة نقطة الانعطاف $x_0$ حيث تنعدم المشتقة الثانية $f''(x_0) = 0$ :`,
				questionTextAr: `ما هي فاصلة نقطة انعطاف الدالة $f(x) = ${fKatex}$ ؟`,
				questionData: { answer: xI, displayTemplate: 'x_0 = ?', variables: [], tolerance: 0 },
				explanation: `لدينا $f'(x) = ${fpKatex}$ و $f''(x) = ${fppKatex}$ . تنعدم $f''(x)$ مغيّرة إشارتها عند $x_0 = ${xI}$ .`
			};
		} else if (difficulty === 'medium') {
			const incDesc =
				a > 0
					? `متزايدة تماماً على $]-\\infty ; ${x1}]$ و $[${x2} ; +\\infty[$ ، ومتناقصة تماماً على $[${x1} ; ${x2}]$`
					: `متناقصة تماماً على $]-\\infty ; ${x1}]$ و $[${x2} ; +\\infty[$ ، ومتزايدة تماماً على $[${x1} ; ${x2}]$`;
			const oppDesc =
				a > 0
					? `متناقصة تماماً على $]-\\infty ; ${x1}]$ و $[${x2} ; +\\infty[$ ، ومتزايدة تماماً على $[${x1} ; ${x2}]$`
					: `متزايدة تماماً على $]-\\infty ; ${x1}]$ و $[${x2} ; +\\infty[$ ، ومتناقصة تماماً على $[${x1} ; ${x2}]$`;
			finalAnswer = incDesc;
			const mcq = buildUniqueMcqOptions(
				incDesc,
				[
					{
						text: oppDesc,
						diagnosticFeedback: `انتبه لإشارة معامل $x^2$ في $f'(x) = ${fpKatex}$ (${a > 0 ? 'موجب خارج الجذرين وسالب بينهما' : 'سالب خارج الجذرين وموجب بينهما'})!`
					},
					{
						text: `متزايدة تماماً على كل $\\mathbb{R}$ دون قيم حدية`,
						diagnosticFeedback: `المشتقة $f'(x)$ تنعدم وتغيّر إشارتها عند $${x1}$ و $${x2}$ .`
					},
					{
						text: `متناقصة تماماً على $]-\\infty ; ${xI}]$ ومتزايدة تماماً على $[${xI} ; +\\infty[$`,
						diagnosticFeedback: `الجذر $${xI}$ يعدم المشتقة الثانية $f''(x)$ وليس المشتقة الأولى $f'(x)$ !`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `نعتبر الدالة $f(x) = ${fKatex}$ ومشتقتها $f'(x) = ${3 * a}${factorKatex(x1)}${factorKatex(x2)}$ . ما هو اتجاه تغير الدالة $f$ على $\\mathbb{R}$ ؟`,
				questionTextAr: `حدد اتجاه تغير الدالة $f$ حيث $f'(x) = ${3 * a}${factorKatex(x1)}${factorKatex(x2)}$ :`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `تنعدم $f'(x)$ عند $${x1}$ و $${x2}$ . بما أن معامل $x^2$ هو $${3 * a}$ ، فإن إشارة $f'(x)$ تكون ${a > 0 ? 'موجبة خارج الجذرين وسالبة بينهما' : 'سالبة خارج الجذرين وموجبة بينهما'}.`
			};
		} else {
			finalAnswer = `${yMaxVal}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `لتكن $f(x) = ${fKatex}$ المعرفة على $\\mathbb{R}$ (مع $f'(x) = ${3 * a}${factorKatex(x1)}${factorKatex(x2)}$). احسب القيمة الحدية **العظمى المحلية** للدالة $f$ :`,
				questionTextAr: `ما هي القيمة الحدية العظمى المحلية للدالة $f(x) = ${fKatex}$ ؟`,
				questionData: { answer: yMaxVal, displayTemplate: 'y_max = ?', variables: [], tolerance: 0 },
				explanation: `القيمتان الحديتان المحليتان هما $f(${x1}) = ${y1}$ و $f(${x2}) = ${y2}$ ، والقيمة العظمى المحلية هي $${yMaxVal}$ .`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر الدالة العددية $f$ المعرفة على $bb(R)$ بـ: $f(x) = ${fTypst}$ ، وليكن $(C_f)$ تمثيلها البياني.`,
			content: [
				{
					type: 'text',
					content: `1) احسب $lim_(x arrow.r -oo) f(x)$ و $lim_(x arrow.r +oo) f(x)$ .\n2) احسب $f'(x)$ ، وتحقّق أن $f'(x) = ${3 * a} ${factorTypst(x1)} ${factorTypst(x2)}$ ، ثم ادرس إشارتها وشكّل جدول تغيرات $f$ (مع ذكر القيم الحدية المحلية).`,
					answer: `1) $lim_(x arrow.r -oo) f(x) = ${a > 0 ? '-oo' : '+oo'}$ و $lim_(x arrow.r +oo) f(x) = ${a > 0 ? '+oo' : '-oo'}$ .\n2) $f'(x) = ${fpTypst} = ${3 * a} ${factorTypst(x1)} ${factorTypst(x2)}$ .\nتنعدم $f'(x)$ عند $x_1 = ${x1}$ و $x_2 = ${x2}$ ، وإشارتها ${a > 0 ? 'موجبة خارج الجذرين وسالبة بينهما' : 'سالبة خارج الجذرين وموجبة بينهما'} .\nالقيمة الحدية عند $x_1 = ${x1}$ هي $f(${x1}) = ${y1}$ (${a > 0 ? 'عظمى محلية' : 'صغرى محلية'})، وعند $x_2 = ${x2}$ هي $f(${x2}) = ${y2}$ (${a > 0 ? 'صغرى محلية' : 'عظمى محلية'}).`,
					mark: '2.5'
				},
				{
					type: 'image',
					src: varUrl,
					caption: 'جدول تغيرات الدالة f على R'
				},
				{
					type: 'columns',
					widths: ['1.3fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `3) احسب المشتقة الثانية $f''(x)$ وبيّن أن المنحنى $(C_f)$ يقبل نقطة انعطاف $Omega$ يُطلب تعيين إحداثييها.`,
							answer: `3) $f''(x) = ${fppTypst} = ${6 * a} ${factorTypst(xI)}$ .\nتنعدم $f''(x)$ عند $x_0 = ${xI}$ وتغيّر إشارتها، وبما أن $f(${xI}) = ${yI}$ فإن $Omega(${xI}, ${yI})$ نقطة انعطاف للمنحنى $(C_f)$ .`,
							mark: '2.5'
						},
						{
							type: 'image',
							src: curveUrl,
							caption: `الذروتان ونقطة الانعطاف Ω(${xI}, ${yI})`
						}
					]
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_lp',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`إشارة ثلاثي الحدود $f'(x) = ${fpKatex}$ هي نفس إشارة $${3 * a}$ خارج الجذرين وعكسها بينهما.`,
				`تبلغ الدالة قيمة حدية محلية عندما تنعدم $f'(x)$ مع تغيير إشارتها.`,
				`تُعيّن نقطة الانعطاف بحل المعادلة $f''(x) = 0$ والتأكد من تغيّر إشارة $f''$ عندها.`
			],
			solutionStepsAr: [
				`النهايات عند اللانهاية ومشتقة الدالة $f'(x) = ${fpKatex}$ وجذراها $${x1}$ و $${x2}$ .`,
				`جدول التغيرات والقيم الحدية المحلية: $f(${x1}) = ${y1}$ و $f(${x2}) = ${y2}$ .`,
				`نقطة الانعطاف: $f''(x) = ${fppKatex} = 0 \\implies x_0 = ${xI}$ ، إذن $\\Omega(${xI}; ${yI})$ .`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Graphical Reading of Curves/Tables, Sign of f(x) & Solving f(x) = m
// ═══════════════════════════════════════════════════════════════════════════════

const tplGraphicalReading: ParameterizedTemplate = {
	id: 'tpl_3as_shared_lit_t2_graphical_reading',
	grade: '3as_lp',
	trimesterId: 't2',
	domain: 'analysis',
	titleAr: 'القراءة البيانية للمنحنيات وجداول التغيرات: الإشارة وحل f(x) = m',
	curriculumLessonId: 'lesson_3as_shared_lit_t2_graphical_reading_equations',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// f(x) = s * ((x - p)^3 - 3(x - p) + 2) = s*(x - (p - 2))*(x - (p + 1))^2
		// Extrema: x1 = p - 1 -> f(x1) = 4*s ; x2 = p + 1 -> f(x2) = 0
		const s = difficulty === 'easy' ? 1 : rng.pick([1, -1]);
		const p = rng.pick([-1, 0, 1, 2]);
		const a3 = s;
		const a2 = -3 * s * p;
		const a1 = s * (3 * p * p - 3);
		const a0 = s * (-p * p * p + 3 * p + 2);

		const f = (x: number) => s * ((x - p) * (x - p) * (x - p) - 3 * (x - p) + 2);
		const rSimple = p - 2;
		const rDouble = p + 1;
		const xExt1 = p - 1;
		const yExt1 = 4 * s;
		const xExt2 = p + 1;
		const yExt2 = 0;
		const yMinVal = Math.min(0, yExt1);
		const yMaxVal = Math.max(0, yExt1);
		const mInside = s > 0 ? 2 : -2;

		if (Math.abs(f(rSimple)) > 1e-9 || Math.abs(f(rDouble)) > 1e-9 || Math.abs(f(xExt1) - yExt1) > 1e-9) {
			throw new Error('Graphical reading cubic invariant failed');
		}

		const curveSvg = svgFunctionCurvePlot({
			xMin: rSimple - 1.5,
			xMax: rDouble + 2,
			yMin: yMinVal - 2.5,
			yMax: yMaxVal + 2.5,
			fn: f,
			curveLabel: '(C_f)',
			points: [
				{ x: rSimple, y: 0, label: `(${rSimple}, 0)`, color: '#1d4ed8' },
				{ x: xExt1, y: yExt1, label: `(${xExt1}, ${yExt1})`, color: '#15803d' },
				{ x: rDouble, y: 0, label: `(${rDouble}, 0)`, color: '#dc2626' }
			]
		});
		const curveUrl = saveSvgAsset(`3as_shared_lit_t2_graphread_${difficulty}_s${seed}`, curveSvg);

		const varSvg = svgVariationTable({
			fnName: 'f(x)',
			derivName: "f'(x)",
			xValues: ['-∞', `${xExt1}`, `${xExt2}`, '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: s > 0 ? '+' : '-' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: s > 0 ? '-' : '+' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: s > 0 ? '+' : '-' }
			],
			variations: [
				{ value: s > 0 ? '-∞' : '+∞', position: s > 0 ? 'bottom' : 'top' },
				{ value: `${yExt1}`, position: s > 0 ? 'top' : 'bottom' },
				{ value: '0', position: s > 0 ? 'bottom' : 'top' },
				{ value: s > 0 ? '+∞' : '-∞', position: s > 0 ? 'top' : 'bottom' }
			]
		});
		const varUrl = saveSvgAsset(`3as_shared_lit_t2_graphvar_${difficulty}_s${seed}`, varSvg);

		const fKatex = poly3Katex(a3, a2, a1, a0);
		const signPosIntervalK = s > 0 ? `[${rSimple} ; +\\infty[` : `]-\\infty ; ${rSimple}] \\cup \\{${rDouble}\\}`;
		const signPosIntervalT = s > 0 ? `[${rSimple} ; +oo[` : `]-oo ; ${rSimple}] union {${rDouble}}`;
		const signNegStrictK = s > 0 ? `]-\\infty ; ${rSimple}[` : `]${rSimple} ; ${rDouble}[ \\cup ]${rDouble} ; +\\infty[`;

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${yExt1}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `بقراءة بيانية للمنحنى $(C_f)$ المرفق لدالة كثيرة حدود من الدرجة الثالثة، ما هي قيمة الترتيبة الحدية عند الفاصلة $x = ${xExt1}$ (أي $f(${xExt1})$)؟`,
				questionTextAr: `اقرأ من المنحنى البياني قيمة $f(${xExt1})$ :`,
				imageUrl: curveUrl,
				imageCaption: 'التمثيل البياني (C_f) للدالة f',
				questionData: { answer: yExt1, displayTemplate: `f(${xExt1}) = ?`, variables: [], tolerance: 0 },
				explanation: `النقطة المميزة على المنحنى عند الفاصلة $x = ${xExt1}$ هي $(${xExt1} ; ${yExt1})$ ، إذن $f(${xExt1}) = ${yExt1}$ .`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = '3';
			const mcq = buildUniqueMcqOptions(
				'ثلاثة حلول متمايزة',
				[
					{
						text: 'حل واحد فقط',
						diagnosticFeedback: `تأمل المستقيم الأفقي $y = ${mInside}$ : قيمته محصورة بين القيمة الصغرى $${yMinVal}$ والعظمى $${yMaxVal}$ فيقطع المنحنى $3$ مرات!`
					},
					{
						text: 'حلان متمايزان',
						diagnosticFeedback: `يوجد حلان فقط عند الذروتين $m = ${yMinVal}$ أو $m = ${yMaxVal}$ .`
					},
					{
						text: 'لا تقبل أي حل',
						diagnosticFeedback: `المنحنى يقطع المستقيم $y = ${mInside}$ في كل من الفروع الثلاثة.`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `انطلاقاً من المنحنى البياني $(C_f)$ المرفق، ما هو عدد حلول المعادلة $f(x) = ${mInside}$ في $\\mathbb{R}$ ؟`,
				questionTextAr: `بقراءة بيانية، كم حلاً تقبل المعادلة $f(x) = ${mInside}$ ؟`,
				imageUrl: curveUrl,
				imageCaption: 'التمثيل البياني (C_f) للمناقشة البيانية الأفقية',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `القيمة $${mInside}$ محصورة تماماً بين القيمتين الحديتين $${yMinVal}$ و $${yMaxVal}$ ، ولذلك يقطع المستقيم الأفقي $y = ${mInside}$ المنحنى $(C_f)$ في $3$ نقط متمايزة.`
			};
		} else {
			finalAnswer = signPosIntervalK;
			const mcq = buildUniqueMcqOptions(
				`$S = ${signPosIntervalK}$`,
				[
					{
						text: `$S = ${signNegStrictK}$`,
						diagnosticFeedback: `هذا المجال يوافق $f(x) < 0$ (حيث يقع المنحنى تحت محور الفواصل) وليس $f(x) \\ge 0$ !`
					},
					{
						text: `$S = [${rSimple} ; ${rDouble}]$`,
						diagnosticFeedback: `لاحظ سلوك المنحنى بعد الفاصلة $x = ${rDouble}$ في الرسم المرفق!`
					},
					{
						text: `$S = ]${rSimple} ; +\\infty[$`,
						diagnosticFeedback: `انتبه إلى وجود المساواة $\\ge 0$ وإشارة المنحنى حول الجذور.`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `بقراءة بيانية للمنحنى $(C_f)$ المرفق، ما هي مجموعة حلول المتراجحة $f(x) \\ge 0$ في $\\mathbb{R}$ ؟`,
				questionTextAr: `حلّ بيانياً المتراجحة $f(x) \\ge 0$ :`,
				imageUrl: curveUrl,
				imageCaption: 'التمثيل البياني (C_f) ونقط تقاطعه مع محور الفواصل',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `يكون $f(x) \\ge 0$ عندما يقع المنحنى $(C_f)$ فوق أو على محور الفواصل، أي $S = ${signPosIntervalK}$ .`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `التمثيل البياني المرفق $(C_f)$ هو لمنحنى دالة $f$ معرفة وقابلة للاشتقاق على $bb(R)$ (عبارتها $f(x) = ${poly3Typst(a3, a2, a1, a0)}$)، وجدول تغيراتها موضح أيضاً.`,
			content: [
				{
					type: 'columns',
					widths: ['1fr', '1fr'],
					children: [
						{
							type: 'image',
							src: curveUrl,
							caption: 'المنحنى البياني (C_f)'
						},
						{
							type: 'image',
							src: varUrl,
							caption: 'جدول تغيرات الدالة f'
						}
					]
				},
				{
					type: 'text',
					content: `بقراءة بيانية ومن جدول التغيرات:\n1) عيّن فواصل نقط تقاطع $(C_f)$ مع محور الفواصل $(O x)$ ، واستنتج إشارة $f(x)$ على $bb(R)$ ثم حل المتراجحة $f(x) >= 0$ .\n2) عيّن العددين المشتقين $f'(${xExt1})$ و $f'(${xExt2})$ ، واذكر القيمتين الحديتين المحليتين لـ $f$ .\n3) ناقش بيانياً وحسب قيم الوسيط الحقيقي $m$ عدد حلول المعادلة $f(x) = m$ في $bb(R)$ .`,
					answer: `1) يقطع المنحنى $(C_f)$ محور الفواصل عند $x = ${rSimple}$ ويمسّه عند $x = ${rDouble}$ .\nحلول المتراجحة $f(x) >= 0$ هي $S = ${signPosIntervalT}$ .\n2) عند الذروتين المماس أفقي، إذن $f'(${xExt1}) = 0$ و $f'(${xExt2}) = 0$ .\nالقيمة الحدية ${s > 0 ? 'العظمى' : 'الصغرى'} المحلية هي $f(${xExt1}) = ${yExt1}$ ، والقيمة الحدية ${s > 0 ? 'الصغرى' : 'العظمى'} المحلية هي $f(${xExt2}) = 0$ .\n3) المناقشة البيانية الأفقية للمعادلة $f(x) = m$ :\n- إذا كان $m < ${yMinVal}$ أو $m > ${yMaxVal}$ : حل واحد فقط.\n- إذا كان $m = ${yMinVal}$ أو $m = ${yMaxVal}$ : حلان متمايزان.\n- إذا كان $${yMinVal} < m < ${yMaxVal}$ : ثلاثة حلول متمايزة.`,
					mark: '4'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_lp',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`تكون $f(x) \\ge 0$ عندما يقع المنحنى $(C_f)$ فوق محور الفواصل $(Ox)$ أو يلامسه.`,
				`عند نقط الذروة يكون المماس أفقياً أي معامل توجيهه معدوماً ($f'(x_0) = 0$).`,
				`عدد حلول $f(x) = m$ يساوي عدد نقط تقاطع $(C_f)$ مع المستقيم الأفقي $y = m$ .`
			],
			solutionStepsAr: [
				`قراءة الجذور $x = ${rSimple}$ و $x = ${rDouble}$ وحل المتراجحة $f(x) \\ge 0$ : $S = ${signPosIntervalK}$ .`,
				`قراءة الذروتين: $f(${xExt1}) = ${yExt1}$ و $f(${xExt2}) = 0$ مع انعدام $f'$ عندهما.`,
				`المناقشة الأفقية: $3$ حلول عند $m \\in ]${yMinVal} ; ${yMaxVal}[$ ، حلان عند $m \\in \\{${yMinVal}; ${yMaxVal}\\}$ ، وحل واحد خارجهما.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Cubic Roots, Factoring, Sign & Center of Symmetry Omega
// ═══════════════════════════════════════════════════════════════════════════════

const tplCubicSymmetryRoots: ParameterizedTemplate = {
	id: 'tpl_3as_shared_lit_t2_cubic_symmetry_roots',
	grade: '3as_lp',
	trimesterId: 't2',
	domain: 'analysis',
	titleAr: 'تحليل دالة تكعيبية بجذر ظاهر، إشارتها وإثبات مركز التناظر Ω',
	curriculumLessonId: 'lesson_3as_shared_lit_t2_cubic_variation_inflection',
	defaultPoints: 5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		interface RootTriple {
			r1: number;
			r2: number;
			r3: number;
			p: number; // (r1 + r2 + r3) / 3, strictly not in {r1, r2, r3}
		}

		const pool: RootTriple[] = [
			{ r1: -1, r2: 0, r3: 4, p: 1 },
			{ r1: -2, r2: 2, r3: 3, p: 1 },
			{ r1: -1, r2: 3, r3: 4, p: 2 },
			{ r1: -4, r2: 0, r3: 1, p: -1 },
			{ r1: -2, r2: 0, r3: 5, p: 1 },
			{ r1: -3, r2: 2, r3: 4, p: 1 }
		];
		const cfg = rng.pick(pool);
		const s = difficulty === 'hard' ? -1 : 1;
		const { r1, r2, r3, p } = cfg;

		// f(x) = s*(x - r1)*(x - r2)*(x - r3)
		// (x - r2)*(x - r3) = x^2 - (r2 + r3)x + r2*r3
		const qB = -(r2 + r3);
		const qC = r2 * r3;
		// Multiply by (x - r1) and s:
		const a3 = s;
		const a2 = s * (qB - r1);
		const a1 = s * (qC - r1 * qB);
		const a0 = s * (-r1 * qC);

		const f = (x: number) => s * (x - r1) * (x - r2) * (x - r3);
		const fExpanded = (x: number) => ((a3 * x + a2) * x + a1) * x + a0;
		const yI = f(p);

		// Verify expansion, roots, and center symmetry f(2p - x) + f(x) = 2 yI
		if (
			Math.abs(fExpanded(r1)) > 1e-9 ||
			Math.abs(fExpanded(r2)) > 1e-9 ||
			Math.abs(fExpanded(r3)) > 1e-9 ||
			Math.abs(fExpanded(2 * p - 1.37) + fExpanded(1.37) - 2 * yI) > 1e-8
		) {
			throw new Error('Cubic symmetry/roots invariant failed');
		}

		const [sMin, sMid, sMax] = [r1, r2, r3].sort((u, v) => u - v);
		const geZeroK =
			s > 0
				? `[${sMin} ; ${sMid}] \\cup [${sMax} ; +\\infty[`
				: `]-\\infty ; ${sMin}] \\cup [${sMid} ; ${sMax}]`;
		const geZeroT =
			s > 0
				? `[${sMin} ; ${sMid}] union [${sMax} ; +oo[`
				: `]-oo ; ${sMin}] union [${sMid} ; ${sMax}]`;
		const ltZeroK =
			s > 0
				? `]-\\infty ; ${sMin}[ \\cup ]${sMid} ; ${sMax}[`
				: `]${sMin} ; ${sMid}[ \\cup ]${sMax} ; +\\infty[`;

		const fKatex = poly3Katex(a3, a2, a1, a0);
		const fTypst = poly3Typst(a3, a2, a1, a0);
		const quadKatex = poly2Katex(s, s * qB, s * qC);
		const quadTypst = poly2Typst(s, s * qB, s * qC);

		const curveSvg = svgFunctionCurvePlot({
			xMin: sMin - 1.2,
			xMax: sMax + 1.2,
			yMin: Math.min(yI, -8) - 4,
			yMax: Math.max(yI, 8) + 4,
			fn: fExpanded,
			curveLabel: '(C_f)',
			points: [
				{ x: sMin, y: 0, label: `(${sMin}, 0)`, color: '#1d4ed8' },
				{ x: sMid, y: 0, label: `(${sMid}, 0)`, color: '#1d4ed8' },
				{ x: sMax, y: 0, label: `(${sMax}, 0)`, color: '#1d4ed8' },
				{ x: p, y: yI, label: `Ω(${p}, ${yI})`, color: '#dc2626' }
			]
		});
		const curveUrl = saveSvgAsset(`3as_shared_lit_t2_symroots_${difficulty}_s${seed}`, curveSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${sMax}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر الدالة $f(x) = ${fKatex}$ ، وعلماً أن $f(x) = ${factorKatex(r1)}(${quadKatex})$ . أوجد أكبر جذر للمعادلة $f(x) = 0$ :`,
				questionTextAr: `ما هو أكبر حل للمعادلة $f(x) = 0$ حيث $f(x) = ${factorKatex(r1)}(${quadKatex})$ ؟`,
				questionData: { answer: sMax, displayTemplate: 'x_max = ?', variables: [], tolerance: 0 },
				explanation: `جذور المعادلة $f(x) = 0$ هي جذر العامل الأول $x = ${r1}$ وجذرا ثلاثي الحدود $${quadKatex} = 0$ وهما $${r2}$ و $${r3}$ . إذن أكبر جذر هو $${sMax}$ .`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `Omega(${p} ; ${yI})`;
			const mcq = buildUniqueMcqOptions(
				`$\\Omega(${p} ; ${yI})$`,
				[
					{
						text: `$\\Omega(${-p} ; ${yI})$`,
						diagnosticFeedback: `انتبه لإشارة الفاصلة $x_I = -\\frac{b}{3a} = ${p}$ وليس $-${p}$ .`
					},
					{
						text: `$\\Omega(${p} ; ${-yI})$`,
						diagnosticFeedback: `تحقق من حساب الصورة $f(${p}) = ${yI}$ .`
					},
					{
						text: `$\\Omega(${yI} ; ${p})$`,
						diagnosticFeedback: `عكست بين الفاصلة $x_I = ${p}$ والترتيبة $y_I = ${yI}$ .`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `ما هما إحداثيا مركز التناظر $\\Omega$ (نقطة الانعطاف) لمنحنى الدالة $f(x) = ${fKatex}$ ؟`,
				questionTextAr: `عيّن مركز التناظر $\\Omega$ لمنحنى الدالة $f(x) = ${fKatex}$ :`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نحسب $f''(x) = ${linearKatex(6 * a3, 2 * a2)}$ فتنعدم عند $x_0 = ${p}$ ، وصورتها $f(${p}) = ${yI}$ ، ومنه مركز التناظر هو $\\Omega(${p} ; ${yI})$ .`
			};
		} else {
			finalAnswer = geZeroK;
			const mcq = buildUniqueMcqOptions(
				`$S = ${geZeroK}$`,
				[
					{
						text: `$S = ${ltZeroK}$`,
						diagnosticFeedback: `هذا المجال يوافق إشارة $f(x) < 0$ (لاحظ أن معامل $x^3$ هو $${s} < 0$!).`
					},
					{
						text: `$S = [${sMin} ; ${sMax}]$`,
						diagnosticFeedback: `تغيّر $f(x)$ إشارتها عند الجذر الأوسط $${sMid}$ أيضاً!`
					},
					{
						text: `$S = ]-\\infty ; ${sMin}[ \\cup ]${sMid} ; ${sMax}[$`,
						diagnosticFeedback: `المتراجحة هي $f(x) \\ge 0$ وتستلزم مجالات مغلقة عند الجذور.`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `الدالة $f(x) = ${fKatex}$ جذورها الثلاثة هي $${sMin}$ و $${sMid}$ و $${sMax}$ (ومعامل $x^3$ سالب يساوي $-1$). ما هي مجموعة حلول المتراجحة $f(x) \\ge 0$ ؟`,
				questionTextAr: `عيّن مجموعة حلول المتراجحة $f(x) \\ge 0$ لـ $f(x) = ${fKatex}$ :`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `بإنشاء جدول إشارة الجداء مع الجذور $${sMin}, ${sMid}, ${sMax}$ وانتباهنا لإشارة المعامل $-1 < 0$ بعد $${sMax}$ ، نجد $f(x) \\ge 0$ على $S = ${geZeroK}$ .`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر الدالة $f$ المعرفة على $bb(R)$ بـ: $f(x) = ${fTypst}$ ، وليكن $(C_f)$ تمثيلها البياني.`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) تحقّق أنه من أجل كل $x in bb(R)$ : $f(x) = ${factorTypst(r1)}(${quadTypst})$ .\n2) حل في $bb(R)$ المعادلة $f(x) = 0$ ، ثم استنتج حلول المتراجحة $f(x) >= 0$ .\n3) عيّن نقطة الانعطاف $Omega$ لـ $(C_f)$ ، ثم أثبت أن $Omega$ مركز تناظر للمنحنى $(C_f)$ .`,
							answer: `1) بالنشر: $${factorTypst(r1)}(${quadTypst}) = ${fTypst} = f(x)$ .\n2) $f(x) = 0 arrow.l.r.double x = ${r1}$ أو $${quadTypst} = 0$ (نجد $x = ${r2}$ و $x = ${r3}$). الجذور المرتبة هي $${sMin}, ${sMid}, ${sMax}$ .\nبجدول الإشارة نجد $f(x) >= 0$ من أجل $x in ${geZeroT}$ .\n3) $f''(x) = ${linearTypst(6 * a3, 2 * a2)} = 0 arrow.l.r.double x_0 = ${p}$ ، و $f(${p}) = ${yI}$ ، إذن $Omega(${p}, ${yI})$ .\nإثبات مركز التناظر: لكل $x in bb(R)$ لدينا $(${2 * p} - x) in bb(R)$ ، وبتبسيط $f(${2 * p} - x) + f(x)$ نجد $2(${yI}) = ${2 * yI}$ ، ومنه $Omega(${p}, ${yI})$ مركز تناظر لـ $(C_f)$ .`,
							mark: '5'
						},
						{
							type: 'image',
							src: curveUrl,
							caption: `المنحنى (C_f) وجذوره ومركز التناظر Ω(${p}, ${yI})`
						}
					]
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_lp',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`للتحقق من التحليل، انشر العبارة المحللة $${factorKatex(r1)}(${quadKatex})$ لمطابقة $f(x)$ .`,
				`ادرس إشارة كل عامل في جدول إشارة لتحديد مجالات $f(x) \\ge 0$ .`,
				`لإثبات مركز التناظر $\\Omega(${p}; ${yI})$ ، برهن أن $f(${2 * p} - x) + f(x) = ${2 * yI}$ .`
			],
			solutionStepsAr: [
				`التحقق من التحليل وتعيين الجذور الثلاثة $${sMin}, ${sMid}, ${sMax}$ .`,
				`استنتاج حلول المتراجحة $f(x) \\ge 0$ : $S = ${geZeroK}$ .`,
				`نقطة الانعطاف ومركز التناظر $\\Omega(${p}; ${yI})$ بالتحقق من $f(${2 * p} - x) + f(x) = ${2 * yI}$ .`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Comprehensive 08-Point BAC Cubic Synthesis Problem (isIntegration: true)
// ═══════════════════════════════════════════════════════════════════════════════

const tplCubicBacSynthesis: ParameterizedTemplate = {
	id: 'tpl_3as_shared_lit_t2_cubic_bac_synthesis',
	grade: '3as_lp',
	trimesterId: 't2',
	domain: 'integration',
	isIntegration: true,
	titleAr: 'مسألة بكالوريا نموذجية (08 نقاط): دراسة شاملة لدالة كثيرة حدود من الدرجة الثالثة',
	curriculumLessonId: 'lesson_3as_shared_lit_t2_cubic_bac_problem',
	defaultPoints: 8,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// f(x) = s * ((x - p)^3 - 3(x - p) + k0), with s in {1, -1}, p in {-1, 0, 1, 2}, k0 in {-2, 2}
		// Guaranteed exact integer extrema, inflection/symmetry point, tangent at Omega, and integer roots!
		const s = difficulty === 'easy' ? 1 : rng.pick([1, -1]);
		const p = difficulty === 'easy' ? rng.pick([0, 1]) : rng.pick([-1, 0, 1, 2]);
		const k0 = rng.pick([2, -2]);

		const a3 = s;
		const a2 = -3 * s * p;
		const a1 = s * (3 * p * p - 3);
		const a0 = s * (-p * p * p + 3 * p + k0);

		const f = (x: number) => s * ((x - p) * (x - p) * (x - p) - 3 * (x - p) + k0);
		const fExpanded = (x: number) => ((a3 * x + a2) * x + a1) * x + a0;
		const fPrime = (x: number) => 3 * a3 * x * x + 2 * a2 * x + a1;
		const fSecond = (x: number) => 6 * a3 * x + 2 * a2;

		assertCentralDifference(fExpanded, fPrime, [-1.5, p, 2.5], 'lit_t2_bac.fp');
		assertCentralDifference(fPrime, fSecond, [-1.5, p, 2.5], 'lit_t2_bac.fpp');

		const x1 = p - 1;
		const x2 = p + 1;
		const y1 = fExpanded(x1);
		const y2 = fExpanded(x2);
		const yMinVal = Math.min(y1, y2);
		const yMaxVal = Math.max(y1, y2);
		const yI = fExpanded(p);
		const f0 = a0;

		// Roots: if k0 = 2 => (x - p + 2)(x - p - 1)^2; if k0 = -2 => (x - p - 2)(x - p + 1)^2
		const rSimple = k0 === 2 ? p - 2 : p + 2;
		const rDouble = k0 === 2 ? p + 1 : p - 1;
		if (Math.abs(fExpanded(rSimple)) > 1e-9 || Math.abs(fExpanded(rDouble)) > 1e-9) {
			throw new Error('BAC cubic roots invariant failed');
		}

		// Tangent at Omega(p, yI): slope f'(p) = -3*s
		const slopeI = -3 * s;
		const tgIntercept = yI - slopeI * p;
		const tgEqK = `y = ${linearKatex(slopeI, tgIntercept, 'x')}`;
		const tgEqT = `y = ${linearTypst(slopeI, tgIntercept, 'x')}`;

		const varSvg = svgVariationTable({
			fnName: 'f(x)',
			derivName: "f'(x)",
			xValues: ['-∞', `${x1}`, `${x2}`, '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: s > 0 ? '+' : '-' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: s > 0 ? '-' : '+' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: s > 0 ? '+' : '-' }
			],
			variations: [
				{ value: s > 0 ? '-∞' : '+∞', position: s > 0 ? 'bottom' : 'top' },
				{ value: `${y1}`, position: s > 0 ? 'top' : 'bottom' },
				{ value: `${y2}`, position: s > 0 ? 'bottom' : 'top' },
				{ value: s > 0 ? '+∞' : '-∞', position: s > 0 ? 'top' : 'bottom' }
			]
		});
		const varUrl = saveSvgAsset(`3as_shared_lit_t2_bac_vartable_${difficulty}_s${seed}`, varSvg);

		const curveSvg = svgFunctionCurvePlot({
			xMin: Math.min(rSimple, x1) - 1.3,
			xMax: Math.max(rSimple, x2) + 1.3,
			yMin: yMinVal - 2.5,
			yMax: yMaxVal + 2.5,
			fn: fExpanded,
			curveLabel: '(C_f)',
			tangents: [{ x: p, y: yI, slope: slopeI, halfSpan: 1.1, color: '#7c3aed' }],
			points: [
				{ x: x1, y: y1, label: `(${x1}, ${y1})`, color: '#15803d' },
				{ x: p, y: yI, label: `Ω(${p}, ${yI})`, color: '#7c3aed' },
				{ x: x2, y: y2, label: `(${x2}, ${y2})`, color: '#dc2626' },
				{ x: rSimple, y: 0, label: `(${rSimple}, 0)`, color: '#1d4ed8' }
			],
			width: 390,
			height: 260
		});
		const curveUrl = saveSvgAsset(`3as_shared_lit_t2_bac_curve_${difficulty}_s${seed}`, curveSvg);

		const fKatex = poly3Katex(a3, a2, a1, a0);
		const fTypst = poly3Typst(a3, a2, a1, a0);
		const fpKatex = poly2Katex(3 * a3, 2 * a2, a1);
		const fpTypst = poly2Typst(3 * a3, 2 * a2, a1);
		const fppTypst = linearTypst(6 * a3, 2 * a2);
		const factoredK = `${s === -1 ? '-' : ''}${factorKatex(rSimple)}${factorKatex(rDouble)}^2`;
		const factoredT = `${s === -1 ? '-' : ''}${factorTypst(rSimple)} ${factorTypst(rDouble)}^2`;

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${f0}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `في مسألة البكالوريا للدالة $f(x) = ${fKatex}$ المعرفة على $\\mathbb{R}$ ، احسب ترتيبة نقطة تقاطع المنحنى $(C_f)$ مع محور التراتيب $(Oy)$ (أي $f(0)$) :`,
				questionTextAr: `احسب $f(0)$ للدالة $f(x) = ${fKatex}$ :`,
				questionData: { answer: f0, displayTemplate: 'f(0) = ?', variables: [], tolerance: 0 },
				explanation: `نقطة تقاطع المنحنى مع محور التراتيب تحقق $x = 0$ ، وبالتعويض نجد $f(0) = ${f0}$ .`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = tgEqK;
			const mcq = buildUniqueMcqOptions(
				`$${tgEqK}$`,
				[
					{
						text: `$y = ${linearKatex(slopeI, yI + slopeI * p, 'x')}$`,
						diagnosticFeedback: `راجع إشارة $-f'(${p})(${p})$ عند نشر معادلة المماس $y = f'(${p})(x - (${p})) + f(${p})$ .`
					},
					{
						text: `$y = ${linearKatex(-slopeI, yI + slopeI * p, 'x')}$`,
						diagnosticFeedback: `تحقق من إشارة العدد المشتق $f'(${p}) = ${slopeI}$ .`
					},
					{
						text: `$y = ${linearKatex(slopeI, -slopeI * p, 'x')}$`,
						diagnosticFeedback: `نسيت إضافة الترتيبة $f(${p}) = ${yI}$ .`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `في دراسة الدالة $f(x) = ${fKatex}$ ، نقطة الانعطاف هي $\\Omega(${p} ; ${yI})$ . ما هي معادلة المماس $(T)$ للمنحنى $(C_f)$ عند النقطة $\\Omega$ ؟`,
				questionTextAr: `ما هي معادلة المماس $(T)$ عند نقطة الانعطاف $\\Omega(${p} ; ${yI})$ ؟`,
				imageUrl: varUrl,
				imageCaption: 'جدول تغيرات الدالة f على R',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `لدينا $f'(${p}) = ${slopeI}$ و $f(${p}) = ${yI}$ ، فمعادلة المماس $(T)$ هي $y = ${slopeI}(x - (${p})) + (${yI}) = ${linearKatex(slopeI, tgIntercept, 'x')}$ .`
			};
		} else {
			finalAnswer = `]${yMinVal} ; ${yMaxVal}[`;
			const mcq = buildUniqueMcqOptions(
				`$m \\in ]${yMinVal} ; ${yMaxVal}[$`,
				[
					{
						text: `$m \\in [${yMinVal} ; ${yMaxVal}]$`,
						diagnosticFeedback: `عند الحدين $m = ${yMinVal}$ و $m = ${yMaxVal}$ تقبل المعادلة حلّين متمايزين فقط وليس $3$ حلول!`
					},
					{
						text: `$m \\in ]-\\infty ; ${yMinVal}[ \\cup ]${yMaxVal} ; +\\infty[$`,
						diagnosticFeedback: `خارج المجال $[${yMinVal} ; ${yMaxVal}]$ تقبل المعادلة حلاً وحيداً فقط.`
					},
					{
						text: `$m = ${yI}$ فقط`,
						diagnosticFeedback: `العديد من القيم في المجال المفتوح $]${yMinVal} ; ${yMaxVal}[$ تعطي $3$ حلول متمايزة.`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `انطلاقاً من جدول التغيرات والتمثيل البياني $(C_f)$ للدالة $f(x) = ${fKatex}$ ، من أجل أي قيم للوسيط الحقيقي $m$ تقبل المعادلة $f(x) = m$ **ثلاثة حلول متمايزة** في $\\mathbb{R}$ ؟`,
				questionTextAr: `متى تقبل المعادلة $f(x) = m$ ثلاثة حلول متمايزة؟`,
				imageUrl: curveUrl,
				imageCaption: 'المنحنى البياني (C_f) والمماس عند نقطة الانعطاف',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `يقطع المستقيم الأفقي $y = m$ المنحنى $(C_f)$ في ثلاث نقط متمايزة إذا وفقط إذا وقع $m$ تماماً بين القيمة الحدية الصغرى $${yMinVal}$ والعظمى $${yMaxVal}$ ، أي $m \\in ]${yMinVal} ; ${yMaxVal}[$ .`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			customTitle: 'المسألة الشاملة النموذجية (بكالوريا)',
			instruction: `نعتبر الدالة العددية $f$ المعرفة على $bb(R)$ بـ: $f(x) = ${fTypst}$ ، وليكن $(C_f)$ تمثيلها البياني في معلم متعامد ومتجانس $(O ; arrow(i), arrow(j))$ .`,
			content: [
				{
					type: 'text',
					content: `1) احسب $lim_(x arrow.r -oo) f(x)$ و $lim_(x arrow.r +oo) f(x)$ .\n2) احسب الدالة المشتقة $f'(x)$ ، وتحقّق أنها تكتب على الشكل $f'(x) = ${3 * a3} ${factorTypst(x1)} ${factorTypst(x2)}$ ، ثم ادرس اتجاه تغير الدالة $f$ وشكّل جدول تغيراتها.`,
					answer: `1) $lim_(x arrow.r -oo) f(x) = ${s > 0 ? '-oo' : '+oo'}$ و $lim_(x arrow.r +oo) f(x) = ${s > 0 ? '+oo' : '-oo'}$ .\n2) $f'(x) = ${fpTypst} = ${3 * a3} ${factorTypst(x1)} ${factorTypst(x2)}$ .\nتنعدم $f'(x)$ عند $x_1 = ${x1}$ و $x_2 = ${x2}$ ، مع $f(${x1}) = ${y1}$ و $f(${x2}) = ${y2}$ . جدول التغيرات مبين أدناه.`,
					mark: '2.5'
				},
				{
					type: 'image',
					src: varUrl,
					caption: 'جدول تغيرات الدالة f على R'
				},
				{
					type: 'text',
					content: `3) بيّن أن المنحنى $(C_f)$ يقبل نقطة انعطاف $Omega(${p}, ${yI})$ ، وأثبت أن $Omega$ مركز تناظر لـ $(C_f)$ ، ثم اكتب معادلة المماس $(T)$ للمنحنى $(C_f)$ عند $Omega$ .\n4) تحقّق أنه من أجل كل $x in bb(R)$ : $f(x) = ${factoredT}$ ، ثم عيّن نقط تقاطع $(C_f)$ مع محوري الإحداثيات.`,
					answer: `3) $f''(x) = ${fppTypst} = ${6 * a3} ${factorTypst(p)}$ تنعدم مغيّرة إشارتها عند $x = ${p}$ ، و $f(${p}) = ${yI}$ ، إذن $Omega(${p}, ${yI})$ نقطة انعطاف.\nإثبات مركز التناظر: لكل $x in bb(R)$ لدينا $f(${2 * p} - x) + f(x) = ${2 * yI} = 2(${yI})$ .\nمعادلة المماس $(T)$ عند $Omega$ : $f'(${p}) = ${slopeI}$ ومنه $${tgEqT}$ .\n4) بنشر $${factoredT}$ نحصل على $f(x)$ . يتقاطع $(C_f)$ مع $(O y)$ عند $(0, ${f0})$ ، ومع $(O x)$ عند $(${rSimple}, 0)$ و $(${rDouble}, 0)$ .`,
					mark: '3'
				},
				{
					type: 'text',
					content: `5) أنشئ المماس $(T)$ والمنحنى $(C_f)$ ، ثم ناقش بيانياً وحسب قيم الوسيط الحقيقي $m$ عدد حلول المعادلة $f(x) = m$ في $bb(R)$ .`,
					answer: `5) الرسم البياني موضح أدناه.\nالمناقشة البيانية للمعادلة $f(x) = m$ (تقاطع $(C_f)$ مع المستقيم الأفقي $y = m$):\n- إذا كان $m < ${yMinVal}$ أو $m > ${yMaxVal}$ : حل واحد فقط.\n- إذا كان $m = ${yMinVal}$ أو $m = ${yMaxVal}$ : حلان متمايزان.\n- إذا كان $${yMinVal} < m < ${yMaxVal}$ : ثلاثة حلول متمايزة.`,
					mark: '2.5'
				},
				{
					type: 'image',
					src: curveUrl,
					caption: `المنحنى البياني (C_f) والمماس (T) عند نقطة الانعطاف Ω(${p}, ${yI})`
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_lp',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`تنعدم المشتقة $f'(x) = ${fpKatex}$ عند $${x1}$ و $${x2}$ وتغيّر إشارتها.`,
				`نقطة الانعطاف $\\Omega(${p}; ${yI})$ تحقّق $f''(${p}) = 0$ ومعادلة المماس عندها $y = f'(${p})(x - ${p}) + f(${p})$ .`,
				`في المناقشة البيانية الأفقية، قارن الوسيط $m$ بقيمتي الذروتين $${yMinVal}$ و $${yMaxVal}$ .`
			],
			solutionStepsAr: [
				`النهايات والمشتقة $f'(x) = ${fpKatex}$ وجدول التغيرات بالذروتين $(${x1}; ${y1})$ و $(${x2}; ${y2})$ .`,
				`نقطة الانعطاف ومركز التناظر $\\Omega(${p}; ${yI})$ ومعادلة المماس $(T): ${tgEqK}$ .`,
				`التحليل $f(x) = ${factoredK}$ ونقط التقاطع مع المحورين، والمناقشة البيانية على حدود $[${yMinVal} ; ${yMaxVal}]$ .`
			],
			finalAnswer
		};
	}
};

export const SHARED_TEMPLATES_3AS_LIT_T2: ParameterizedTemplate[] = [
	tplLimitsAsymptotes,
	tplCubicTangentParallel,
	tplCubicVariationsInflection,
	tplGraphicalReading,
	tplCubicSymmetryRoots,
	tplCubicBacSynthesis
];
