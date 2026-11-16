import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';
import { buildUniqueMcqOptions, gcd, roundTo, SeededRng } from '../../rng';
import { saveSvgAsset } from '../../svg-helpers';
import { svgFunctionCurvePlot, svgSpace3DScene, svgVariationTable } from '../../svg-secondary';

// ═══════════════════════════════════════════════════════════════════════════════
// Dual-Syntax Formatting Helpers (KaTeX for Web Quiz vs Typst for SujetBuilder)
// Strictly Western digits 0-9 across all expressions and prose.
// ═══════════════════════════════════════════════════════════════════════════════

type Vec3 = readonly [number, number, number];

function dot3(u: Vec3, v: Vec3): number {
	return u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
}

function sub3(b: Vec3, a: Vec3): Vec3 {
	return [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
}

function add3(a: Vec3, b: Vec3): Vec3 {
	return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function scale3(k: number, u: Vec3): Vec3 {
	return [k * u[0], k * u[1], k * u[2]];
}

function normSq3(u: Vec3): number {
	return u[0] * u[0] + u[1] * u[1] + u[2] * u[2];
}

function fmtPtKatex(p: Vec3): string {
	return `(${p[0]} ; ${p[1]} ; ${p[2]})`;
}

function fmtPtTypst(p: Vec3): string {
	return `(${p[0]}, ${p[1]}, ${p[2]})`;
}

function fmtLinearKatex(a: number, b: number, v = 'x'): string {
	let head = '';
	if (a === 1) head = v;
	else if (a === -1) head = `-${v}`;
	else if (a !== 0) head = `${a}${v}`;

	if (!head) return `${b}`;
	if (b === 0) return head;
	return b > 0 ? `${head} + ${b}` : `${head} - ${Math.abs(b)}`;
}

function fmtLinearTypst(a: number, b: number, v = 'x'): string {
	let head = '';
	if (a === 1) head = v;
	else if (a === -1) head = `-${v}`;
	else if (a !== 0) head = `${a} ${v}`;

	if (!head) return `${b}`;
	if (b === 0) return head;
	return b > 0 ? `${head} + ${b}` : `${head} - ${Math.abs(b)}`;
}

function fmtPlaneKatex(a: number, b: number, c: number, d: number): string {
	const terms: string[] = [];
	const pushVar = (coeff: number, name: string) => {
		if (coeff === 0) return;
		const absC = Math.abs(coeff);
		const body = absC === 1 ? name : `${absC}${name}`;
		if (terms.length === 0) {
			terms.push(coeff < 0 ? `-${body}` : body);
		} else {
			terms.push(coeff < 0 ? `- ${body}` : `+ ${body}`);
		}
	};
	pushVar(a, 'x');
	pushVar(b, 'y');
	pushVar(c, 'z');
	if (d !== 0) {
		terms.push(d < 0 ? `- ${Math.abs(d)}` : `+ ${d}`);
	}
	return `${terms.join(' ')} = 0`;
}

function fmtPlaneTypst(a: number, b: number, c: number, d: number): string {
	const terms: string[] = [];
	const pushVar = (coeff: number, name: string) => {
		if (coeff === 0) return;
		const absC = Math.abs(coeff);
		const body = absC === 1 ? name : `${absC} ${name}`;
		if (terms.length === 0) {
			terms.push(coeff < 0 ? `-${body}` : body);
		} else {
			terms.push(coeff < 0 ? `- ${body}` : `+ ${body}`);
		}
	};
	pushVar(a, 'x');
	pushVar(b, 'y');
	pushVar(c, 'z');
	if (d !== 0) {
		terms.push(d < 0 ? `- ${Math.abs(d)}` : `+ ${d}`);
	}
	return `${terms.join(' ')} = 0`;
}

function fmtSqTermKatex(v: string, c0: number): string {
	if (c0 === 0) return `${v}^2`;
	return c0 > 0 ? `( ${v} - ${c0} )^2`.replace('( ', '(').replace(' )', ')') : `(${v} + ${Math.abs(c0)})^2`;
}

function fmtSqTermTypst(v: string, c0: number): string {
	if (c0 === 0) return `${v}^2`;
	return c0 > 0 ? `(${v} - ${c0})^2` : `(${v} + ${Math.abs(c0)})^2`;
}

function fmtSphereCanonicalKatex(center: Vec3, R: number): string {
	return `${fmtSqTermKatex('x', center[0])} + ${fmtSqTermKatex('y', center[1])} + ${fmtSqTermKatex('z', center[2])} = ${R * R}`;
}

function fmtSphereCanonicalTypst(center: Vec3, R: number): string {
	return `${fmtSqTermTypst('x', center[0])} + ${fmtSqTermTypst('y', center[1])} + ${fmtSqTermTypst('z', center[2])} = ${R * R}`;
}

function fmtSphereExpandedKatex(center: Vec3, R: number): string {
	const parts: string[] = ['x^2 + y^2 + z^2'];
	const coeffs: [number, string][] = [
		[-2 * center[0], 'x'],
		[-2 * center[1], 'y'],
		[-2 * center[2], 'z']
	];
	for (const [k, name] of coeffs) {
		if (k === 0) continue;
		const absK = Math.abs(k);
		const body = absK === 1 ? name : `${absK}${name}`;
		parts.push(k < 0 ? `- ${body}` : `+ ${body}`);
	}
	const cConst = normSq3(center) - R * R;
	if (cConst !== 0) {
		parts.push(cConst < 0 ? `- ${Math.abs(cConst)}` : `+ ${cConst}`);
	}
	return `${parts.join(' ')} = 0`;
}

function fmtSphereExpandedTypst(center: Vec3, R: number): string {
	const parts: string[] = ['x^2 + y^2 + z^2'];
	const coeffs: [number, string][] = [
		[-2 * center[0], 'x'],
		[-2 * center[1], 'y'],
		[-2 * center[2], 'z']
	];
	for (const [k, name] of coeffs) {
		if (k === 0) continue;
		const absK = Math.abs(k);
		const body = absK === 1 ? name : `${absK} ${name}`;
		parts.push(k < 0 ? `- ${body}` : `+ ${body}`);
	}
	const cConst = normSq3(center) - R * R;
	if (cConst !== 0) {
		parts.push(cConst < 0 ? `- ${Math.abs(cConst)}` : `+ ${cConst}`);
	}
	return `${parts.join(' ')} = 0`;
}

function fmtParamCoordKatex(p0: number, dir: number, param = 't'): string {
	if (dir === 0) return `${p0}`;
	const absD = Math.abs(dir);
	const tPart = absD === 1 ? param : `${absD}${param}`;
	if (p0 === 0) return dir < 0 ? `-${tPart}` : tPart;
	return dir < 0 ? `${p0} - ${tPart}` : `${p0} + ${tPart}`;
}

function fmtParamCoordTypst(p0: number, dir: number, param = 't'): string {
	if (dir === 0) return `${p0}`;
	const absD = Math.abs(dir);
	const tPart = absD === 1 ? param : `${absD} ${param}`;
	if (p0 === 0) return dir < 0 ? `-${tPart}` : tPart;
	return dir < 0 ? `${p0} - ${tPart}` : `${p0} + ${tPart}`;
}

function fmtParamSystemKatex(pt: Vec3, dir: Vec3, param = 't'): string {
	return `\\begin{cases} x = ${fmtParamCoordKatex(pt[0], dir[0], param)} \\\\ y = ${fmtParamCoordKatex(pt[1], dir[1], param)} \\\\ z = ${fmtParamCoordKatex(pt[2], dir[2], param)} \\end{cases}`;
}

function fmtParamSystemTypst(pt: Vec3, dir: Vec3, param = 't'): string {
	return `cases(x = ${fmtParamCoordTypst(pt[0], dir[0], param)}, y = ${fmtParamCoordTypst(pt[1], dir[1], param)}, z = ${fmtParamCoordTypst(pt[2], dir[2], param)})`;
}

function fmtExpDiffKatex(c0: number, c1: number, bExp: number): string {
	const expStr = c1 === 1 ? `e^{-${bExp}}` : `${c1}e^{-${bExp}}`;
	if (c0 === 0) return `-${expStr}`;
	return `${c0} - ${expStr}`;
}

function fmtExpDiffTypst(c0: number, c1: number, bExp: number): string {
	const expStr = c1 === 1 ? `e^(-${bExp})` : `${c1} e^(-${bExp})`;
	if (c0 === 0) return `-${expStr}`;
	return `${c0} - ${expStr}`;
}

function reduceNormal(n: Vec3): Vec3 {
	const g = gcd(Math.abs(n[0]), gcd(Math.abs(n[1]), Math.abs(n[2])));
	let rx = n[0] / g;
	let ry = n[1] / g;
	let rz = n[2] / g;
	const firstNonZero = rx !== 0 ? rx : ry !== 0 ? ry : rz;
	if (firstNonZero < 0) {
		rx = -rx;
		ry = -ry;
		rz = -rz;
	}
	return [rx, ry, rz];
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Definite Integral Properties, Chasles Splitting, Mean Value & Inequalities
// ═══════════════════════════════════════════════════════════════════════════════

const tplDefiniteIntegralMean: ParameterizedTemplate = {
	id: 'tpl_3as_shared_t3_definite_integral_mean',
	grade: '3as_se',
	trimesterId: 't3',
	domain: 'analysis',
	titleAr: 'الحساب التكاملي: خواص التكامل المحدد، علاقة شال، القيمة المتوسطة والحصر',
	curriculumLessonId: 'lesson_3as_se_t3_definite_integral_mean_value',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		interface IntegralConfig {
			b: number;
			k: number; // m = k * b so mean value mu = (c + k) - k * e^(-b) has integer coefficients
			c: number;
			alpha: number;
			aAbs: number;
			r: number; // 0 < r < b for Chasles splitting
		}

		const pool: IntegralConfig[] =
			difficulty === 'easy'
				? [
						{ b: 2, k: 1, c: 1, alpha: 2, aAbs: 1, r: 1 },
						{ b: 2, k: 2, c: 1, alpha: 2, aAbs: 2, r: 1 },
						{ b: 2, k: 1, c: 2, alpha: 3, aAbs: 1, r: 1 },
						{ b: 3, k: 1, c: 1, alpha: 2, aAbs: 1, r: 1 },
						{ b: 3, k: 1, c: 2, alpha: 2, aAbs: 1, r: 2 },
						{ b: 2, k: 2, c: 3, alpha: 2, aAbs: 3, r: 1 }
					]
				: difficulty === 'medium'
					? [
							{ b: 2, k: 3, c: 2, alpha: 2, aAbs: 2, r: 1 },
							{ b: 3, k: 2, c: 1, alpha: 2, aAbs: 2, r: 1 },
							{ b: 3, k: 2, c: 2, alpha: 3, aAbs: 3, r: 2 },
							{ b: 4, k: 1, c: 2, alpha: 2, aAbs: 2, r: 1 },
							{ b: 4, k: 1, c: 3, alpha: 3, aAbs: 1, r: 3 },
							{ b: 2, k: 3, c: 4, alpha: 3, aAbs: 2, r: 1 }
						]
					: [
							{ b: 3, k: 3, c: 2, alpha: 3, aAbs: 3, r: 1 },
							{ b: 3, k: 3, c: 4, alpha: 2, aAbs: 2, r: 2 },
							{ b: 4, k: 2, c: 1, alpha: 3, aAbs: 3, r: 1 },
							{ b: 4, k: 2, c: 3, alpha: 2, aAbs: 2, r: 3 },
							{ b: 4, k: 3, c: 2, alpha: 3, aAbs: 4, r: 1 },
							{ b: 3, k: 2, c: 3, alpha: 4, aAbs: 3, r: 2 }
						];

		const cfg = rng.pick(pool);
		const { b, k, c, alpha, aAbs, r } = cfg;
		const m = k * b;

		// Exact symbolic quantities:
		// f(x) = m * e^(-x) + c on [0, b]
		// I = int_0^b f(x) dx = [-m e^(-x) + c x]_0^b = (c*b + m) - m e^(-b)
		const iConst = c * b + m;
		const kConst = alpha * iConst + b * b;
		const kExpCoeff = alpha * m;

		// Mean value mu = I / b = (c + k) - k e^(-b)
		const muConst = c + k;
		const muExactVal = muConst - k * Math.exp(-b);
		const muApprox = roundTo(muExactVal, 2);

		// Chasles absolute value integral:
		// h(x) = 2*aAbs*(x - r) = 2*aAbs*x - 2*aAbs*r on [0, b]
		// J = int_0^b |h(x)| dx = int_0^r (-h(x)) dx + int_r^b h(x) dx = aAbs * r^2 + aAbs * (b - r)^2
		const jPart1 = aAbs * r * r;
		const jPart2 = aAbs * (b - r) * (b - r);
		const jExact = jPart1 + jPart2;

		// Bounding of I and mu on [0, b]:
		// Since f'(x) = -m e^(-x) < 0, f is strictly decreasing on [0, b]:
		// c + m e^(-b) <= f(x) <= c + m
		// b*c + b*m e^(-b) <= I <= b*(c + m)
		const upperF = c + m;
		const upperI = b * upperF;
		const lowerIConst = b * c;
		const lowerIExpCoeff = b * m;

		const fKatex = `${m}e^{-x} + ${c}`;
		const fTypst = `${m} e^(-x) + ${c}`;
		const hKatex = fmtLinearKatex(2 * aAbs, -2 * aAbs * r, 'x');
		const hTypst = fmtLinearTypst(2 * aAbs, -2 * aAbs * r, 'x');

		const iExactKatex = fmtExpDiffKatex(iConst, m, b);
		const iExactTypst = fmtExpDiffTypst(iConst, m, b);
		const kExactKatex = fmtExpDiffKatex(kConst, kExpCoeff, b);
		const kExactTypst = fmtExpDiffTypst(kConst, kExpCoeff, b);
		const muExactKatex = fmtExpDiffKatex(muConst, k, b);
		const muExactTypst = fmtExpDiffTypst(muConst, k, b);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${jExact}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `بتوظيف علاقة شال وفك رمز القيمة المطلقة عند نقطة انعدام العبارة، احسب القيمة المضبوطة للتكامل المحدد:\n$$J = \\int_0^{${b}} |${hKatex}|\\,dx$$`,
				questionTextAr: `احسب القيمة المضبوطة للتكامل $J = \\int_0^{${b}} |${hKatex}|\\,dx$:`,
				questionData: {
					answer: jExact,
					displayTemplate: 'J = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `تنعدم العبارة $${hKatex} = ${2 * aAbs}(x - ${r})$ عند $x = ${r} \\in ]0 ; ${b}[$.\nبتطبيق علاقة شال:\n$J = \\int_0^{${r}} (${fmtLinearKatex(-2 * aAbs, 2 * aAbs * r, 'x')})\\,dx + \\int_{${r}}^{${b}} (${hKatex})\\,dx = ${jPart1} + ${jPart2} = ${jExact}$.`
			};
		} else if (difficulty === 'medium') {
			const wrongNoDivide = `$${iExactKatex}$`;
			const wrongSign = `$${c - k === 0 ? '' : `${c - k} + `}${k === 1 ? '' : k}e^{-${b}}$`;
			const wrongZeroAt0 = `$${fmtExpDiffKatex(c, k, b)}$`;

			const mcq = buildUniqueMcqOptions(
				`$${muExactKatex}$`,
				[
					{
						text: wrongNoDivide,
						diagnosticFeedback: `هذه قيمة التكامل $\\int_0^{${b}} f(x)\\,dx$؛ لحساب القيمة المتوسطة $\\mu$ يجب القسمة على طول المجال $b - a = ${b}$.`
					},
					{
						text: wrongSign,
						diagnosticFeedback: `انتبه لإشارة الدالة الأصلية: دالة أصلية لـ $${m}e^{-x}$ هي $-${m}e^{-x}$ وليست $+${m}e^{-x}$.`
					},
					{
						text: wrongZeroAt0,
						diagnosticFeedback: `تذكر أن $e^0 = 1 \\neq 0$ عند التعويض بالحد الأدنى $x = 0$ في الدالة الأصلية $-${m}e^{-x} + ${c}x$.`
					}
				],
				rng
			);
			finalAnswer = muExactKatex;
			quizQuestion = {
				type: 'mcq',
				questionText: `نعتبر الدالة $f(x) = ${fKatex}$ المعرفة على المجال $[0 ; ${b}]$. ما هي القيمة المضبوطة للقيمة المتوسطة $\\mu$ للدالة $f$ على المجال $[0 ; ${b}]$؟`,
				questionTextAr: `ما هي القيمة المتوسطة $\\mu$ للدالة $f(x) = ${fKatex}$ على $[0 ; ${b}]$؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نحسب أولاً $I = \\int_0^{${b}} (${fKatex})\\,dx = [-${m}e^{-x} + ${c}x]_0^{${b}} = ${iExactKatex}$.\nالقيمة المتوسطة هي $\\mu = \\frac{1}{${b} - 0} I = \\frac{${iExactKatex}}{${b}} = ${muExactKatex}$.`
			};
		} else {
			const correctBound = `$${lowerIConst} + ${lowerIExpCoeff}e^{-${b}} \\le I \\le ${upperI}$`;
			const wrongNoLength = `$${c} + ${m}e^{-${b}} \\le I \\le ${upperF}$`;
			const wrongZeroExp = `$${lowerIConst} \\le I \\le ${lowerIConst + lowerIExpCoeff}e^{-${b}}$`;
			const wrongHalf = `$${c} + ${m}e^{-${b}} \\le I \\le ${upperI}$`;

			const mcq = buildUniqueMcqOptions(
				correctBound,
				[
					{
						text: wrongNoLength,
						diagnosticFeedback: `هذا حصر للدالة $f(x)$ (أو القيمة المتوسطة $\\mu$)؛ لحصر التكامل $I$ يجب الضرب في طول المجال $(b - a) = ${b}$.`
					},
					{
						text: wrongZeroExp,
						diagnosticFeedback: `على المجال $[0 ; ${b}]$ الدالة $f$ متناقصة تماماً وقيمتها العظمى هي $f(0) = ${upperF}$ والصغرى هي $f(${b}) = ${c} + ${m}e^{-${b}}$.`
					},
					{
						text: wrongHalf,
						diagnosticFeedback: `نسيت ضرب الحد الأدنى $m = f(${b}) = ${c} + ${m}e^{-${b}}$ في طول المجال $${b}$ وفق قاعدة $m(b - a) \\le I \\le M(b - a)$.`
					}
				],
				rng
			);
			finalAnswer = `${lowerIConst} + ${lowerIExpCoeff}e^-${b} <= I <= ${upperI}`;
			quizQuestion = {
				type: 'mcq',
				questionText: `لتكن الدالة $f(x) = ${fKatex}$ على المجال $[0 ; ${b}]$، ونضع $I = \\int_0^{${b}} f(x)\\,dx$. بالاعتماد على اتجاه تغير $f$ ومبرهنة حصر التكامل، أي حصر مما يلي صحيح؟`,
				questionTextAr: `أي حصر مما يلي يمثل الحصر الأدق للتكامل $I = \\int_0^{${b}} (${fKatex})\\,dx$؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `لدينا $f'(x) = -${m}e^{-x} < 0$، فالدالة $f$ متناقصة تماماً على $[0 ; ${b}]$.\nإذن من أجل كل $x \\in [0 ; ${b}]$: $f(${b}) \\le f(x) \\le f(0)$ أي $${c} + ${m}e^{-${b}} \\le f(x) \\le ${upperF}$.\nبضرب أطراف المتباينة في طول المجال $(${b} - 0) = ${b}$ نجد: $${lowerIConst} + ${lowerIExpCoeff}e^{-${b}} \\le I \\le ${upperI}$.`
			};
		}

		return {
			templateId: this.id,
			seed,
			grade: '3as_se',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نعتبر على المجال $[0 ; ${b}]$ الدالتين العدديتين $f$ و $h$ المعرفتين بـ: $f(x) = ${fTypst}$ و $h(x) = ${hTypst}$.`,
				content: [
					{
						type: 'text',
						content: `1) عيّن دالة أصلية $F$ للدالة $f$ على $bb(R)$، واحسب التكامل $I = integral_0^${b} f(x) dif x$، ثم استنتج بخاصية الخطية قيمة $K = integral_0^${b} (${alpha} f(x) + 2 x) dif x$.`,
						answer: `1) دالة أصلية لـ $f$ على $bb(R)$ هي $F(x) = -${m} e^(-x) + ${c} x$.\n- حساب $I$: $I = [-${m} e^(-x) + ${c} x]_0^${b} = (-${m} e^(-${b}) + ${c * b}) - (-${m} + 0) = ${iExactTypst}$.\n- باستعمال خطية التكامل: $K = ${alpha} integral_0^${b} f(x) dif x + integral_0^${b} 2 x dif x = ${alpha}(${iExactTypst}) + [x^2]_0^${b} = ${alpha * iConst} - ${kExpCoeff} e^(-${b}) + ${b * b} = ${kExactTypst}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) ادرس إشارة $h(x)$ على المجال $[0 ; ${b}]$، ثم بتوظيف علاقة شال احسب التكامل $J = integral_0^${b} abs(${hTypst}) dif x$.`,
						answer: `2) إشارة $h(x) = ${2 * aAbs}(x - ${r})$:\n- تنعدم عند $x = ${r} in ]0 ; ${b}[$، وتكون سالبة على $[0 ; ${r}]$ وموجبة على $[${r} ; ${b}]$.\n- بتطبيق علاقة شال:\n  $J = integral_0^${r} (-h(x)) dif x + integral_${r}^${b} h(x) dif x = [-${aAbs}(x - ${r})^2]_0^${r} + [${aAbs}(x - ${r})^2]_${r}^${b} = ${jPart1} + ${jPart2} = ${jExact}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) احسب القيمة المضبوطة للقيمة المتوسطة $mu$ للدالة $f$ على المجال $[0 ; ${b}]$، ثم أعطِ مدورها إلى $10^(-2)$.`,
						answer: `3) القيمة المتوسطة للدالة $f$ على $[0 ; ${b}]$:\n$mu = frac(1, ${b} - 0) integral_0^${b} f(x) dif x = frac(${iExactTypst}, ${b}) = ${muExactTypst} approx ${muApprox}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `4) بيّن أن الدالة $f$ متناقصة تماماً على $[0 ; ${b}]$، واستنتج أنه من أجل كل $x in [0 ; ${b}]$: $${c} + ${m} e^(-${b}) <= f(x) <= ${upperF}$، ثم استنتج حصراً للتكامل $I$.`,
						answer: `4) من أجل كل $x in [0 ; ${b}]$: $f'(x) = -${m} e^(-x) < 0$، ومنه $f$ متناقصة تماماً على $[0 ; ${b}]$.\n- إذن $f(${b}) <= f(x) <= f(0)$، أي $${c} + ${m} e^(-${b}) <= f(x) <= ${upperF}$.\n- بتطبيق مبرهنة حصر التكامل على المجال $[0 ; ${b}]$ طوله $${b}$:\n  $${b}(${c} + ${m} e^(-${b})) <= integral_0^${b} f(x) dif x <= ${b} times ${upperF}$، أي $${lowerIConst} + ${lowerIExpCoeff} e^(-${b}) <= I <= ${upperI}$.`,
						mark: '1'
					}
				]
			},
			hints: [
				`دالة أصلية للدالة $x \\mapsto ${m}e^{-x} + ${c}$ هي $F(x) = -${m}e^{-x} + ${c}x$، وانتبه إلى أن $F(0) = -${m}$.`,
				`لفك القيمة المطلقة $|${hKatex}|$ على $[0 ; ${b}]$، جزّئ المجال عند $x = ${r}$ باستعمال علاقة شال.`,
				`القيمة المتوسطة هي $\\mu = \\frac{1}{${b}} I$، ولحصر $I$ استثمر تناقص $f$ ثم اضرب أطراف الحصر في طول المجال $${b}$.`
			],
			solutionStepsAr: [
				`حساب التكامل والخطية: $I = [-${m}e^{-x} + ${c}x]_0^{${b}} = ${iExactKatex}$، ومنه $K = ${alpha}I + ${b * b} = ${kExactKatex}$.`,
				`علاقة شال: $J = \\int_0^{${r}} ${2 * aAbs}(${r} - x)\\,dx + \\int_{${r}}^{${b}} ${2 * aAbs}(x - ${r})\\,dx = ${jPart1} + ${jPart2} = ${jExact}$.`,
				`القيمة المتوسطة: $\\mu = \\frac{1}{${b}} I = ${muExactKatex} \\approx ${muApprox}$.`,
				`حصر التكامل: بما أن $f$ متناقصة تماماً على $[0 ; ${b}]$ فإن $${lowerIConst} + ${lowerIExpCoeff}e^{-${b}} \\le I \\le ${upperI}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Integration by Parts, Planar Area in cm² & Solid of Revolution Volume
// ═══════════════════════════════════════════════════════════════════════════════

const tplIntegrationPartsAreaVolume: ParameterizedTemplate = {
	id: 'tpl_3as_shared_t3_integration_parts_area_volume',
	grade: '3as_se',
	trimesterId: 't3',
	domain: 'analysis',
	titleAr: 'المكاملة بالتجزئة، المساحات المستوية بالسنتيمتر المربع وحجوم المجسمات الدورانية',
	curriculumLessonId: 'lesson_3as_se_t3_integration_by_parts_areas_volumes',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		interface IbpAreaVolConfig {
			c: number;
			d: number;
			b: number;
			uCm: number; // ||i|| = ||j|| = uCm cm => 1 u.a = uCm^2 cm^2
			pLn: number; // L = int_1^e pLn^2 * x^(pLn-1) * ln(x) dx = (pLn - 1)*e^pLn + 1
		}

		const pool: IbpAreaVolConfig[] =
			difficulty === 'easy'
				? [
						{ c: 1, d: 1, b: 1, uCm: 2, pLn: 1 },
						{ c: 1, d: 2, b: 1, uCm: 2, pLn: 1 },
						{ c: 2, d: 1, b: 1, uCm: 2, pLn: 2 },
						{ c: 1, d: 1, b: 2, uCm: 2, pLn: 1 },
						{ c: 2, d: 2, b: 2, uCm: 2, pLn: 2 },
						{ c: 1, d: 3, b: 2, uCm: 3, pLn: 1 }
					]
				: difficulty === 'medium'
					? [
							{ c: 2, d: 1, b: 2, uCm: 2, pLn: 2 },
							{ c: 2, d: 3, b: 2, uCm: 3, pLn: 2 },
							{ c: 3, d: 1, b: 2, uCm: 2, pLn: 2 },
							{ c: 2, d: 1, b: 3, uCm: 2, pLn: 3 },
							{ c: 3, d: 2, b: 2, uCm: 3, pLn: 2 },
							{ c: 1, d: 2, b: 3, uCm: 3, pLn: 3 }
						]
					: [
							{ c: 3, d: 2, b: 3, uCm: 2, pLn: 3 },
							{ c: 4, d: 1, b: 2, uCm: 3, pLn: 3 },
							{ c: 3, d: 1, b: 3, uCm: 3, pLn: 3 },
							{ c: 4, d: 3, b: 2, uCm: 2, pLn: 2 },
							{ c: 2, d: 3, b: 3, uCm: 3, pLn: 3 },
							{ c: 4, d: 2, b: 3, uCm: 2, pLn: 3 }
						];

		const cfg = rng.pick(pool);
		const { c, d, b, uCm, pLn } = cfg;

		// g(x) = (c*x + d)*e^(-x) > 0 on [0, b]
		// I = int_0^b (c*x + d)*e^(-x) dx = (c + d) - (c*b + c + d)*e^(-b)
		const A0 = c + d;
		const A1 = c * b + c + d;
		const uaCm2 = uCm * uCm;
		const areaConstCm2 = uaCm2 * A0;
		const areaExpCm2 = uaCm2 * A1;
		const iNumeric = A0 - A1 * Math.exp(-b);
		const areaNumericCm2 = roundTo(uaCm2 * iNumeric, 2);
		const volNumericUv = roundTo(Math.PI * iNumeric, 2);

		// Logarithmic IBP: L = int_1^e pLn^2 * x^(pLn - 1) * ln(x) dx = (pLn - 1) * e^pLn + 1
		const lnIntegrandKatex =
			pLn === 1 ? '\\ln(x)' : pLn === 2 ? '4x\\ln(x)' : '9x^2\\ln(x)';
		const lnIntegrandTypst =
			pLn === 1 ? 'ln(x)' : pLn === 2 ? '4 x ln(x)' : '9 x^2 ln(x)';
		const lnResultKatex =
			pLn === 1 ? '1' : pLn === 2 ? 'e^2 + 1' : '2e^3 + 1';
		const lnResultTypst =
			pLn === 1 ? '1' : pLn === 2 ? 'e^2 + 1' : '2 e^3 + 1';
		const v1Typst = pLn === 1 ? 'x' : pLn === 2 ? '2 x^2' : '3 x^3';

		// Curve plot with shadedIntegral on [0, b]
		const gFn = (x: number) => (c * x + d) * Math.exp(-x);
		// Maximum of g on [-0.4, b+1]: g'(x) = (c - d - c*x)e^(-x), critical point x* = 1 - d/c
		const xCrit = 1 - d / c;
		const peakY = Math.max(gFn(0), gFn(b), xCrit >= 0 && xCrit <= b ? gFn(xCrit) : d);
		const yMaxPlot = Math.ceil(peakY + 1.2);

		const plotSvg = svgFunctionCurvePlot({
			xMin: -0.5,
			xMax: b + 1,
			yMin: -0.6,
			yMax: yMaxPlot,
			fn: gFn,
			curveLabel: '(C_g)',
			shadedIntegral: { a: 0, b, color: 'rgba(37,99,235,0.22)' },
			points: [
				{ x: 0, y: d, label: `A(0, ${d})`, color: '#15803d' },
				{ x: b, y: gFn(b), label: `B(${b}, g(${b}))`, color: '#1d4ed8' }
			]
		});
		const imageUrl = saveSvgAsset(`3as_shared_t3_ibp_area_${difficulty}_s${seed}`, plotSvg);

		const linKatex = fmtLinearKatex(c, d, 'x');
		const linTypst = fmtLinearTypst(c, d, 'x');
		const iExactKatex = fmtExpDiffKatex(A0, A1, b);
		const iExactTypst = fmtExpDiffTypst(A0, A1, b);
		const areaExactKatex = fmtExpDiffKatex(areaConstCm2, areaExpCm2, b);
		const areaExactTypst = fmtExpDiffTypst(areaConstCm2, areaExpCm2, b);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			const wrongMinusIbp = `$${d - c} - ${c * b - c + d}e^{-${b}}$`;
			const wrongPlusSign = `$${A0} + ${A1}e^{-${b}}$`;
			const wrongNoConst = `$${d} - ${c * b + d}e^{-${b}}$`;

			const mcq = buildUniqueMcqOptions(
				`$${iExactKatex}$`,
				[
					{
						text: wrongMinusIbp,
						diagnosticFeedback: `انتبه لإشارة القانون $\\int u v' = [u v] - \\int u' v$: بما أن $v(x) = -e^{-x}$ فإن $-\\int u'v$ يصبح $+\\int ${c}e^{-x}\\,dx$.`
					},
					{
						text: wrongPlusSign,
						diagnosticFeedback: `راجع إشارة التعويض عند الحد الأعلى $x = ${b}$ في $[- (${linKatex})e^{-x} - ${c}e^{-x}]_0^{${b}}$.`
					},
					{
						text: wrongNoConst,
						diagnosticFeedback: `هذا فقط $[-(${linKatex})e^{-x}]_0^{${b}}$؛ نسيت إضافة تكامل الجزء الثاني $\\int_0^{${b}} ${c}e^{-x}\\,dx$.`
					}
				],
				rng
			);
			finalAnswer = iExactKatex;
			quizQuestion = {
				type: 'mcq',
				questionText: `باستعمال المكاملة بالتجزئة، ما هي القيمة المضبوطة للتكامل المحدد $I = \\int_0^{${b}} (${linKatex})e^{-x}\\,dx$؟`,
				questionTextAr: `احسب بالمكاملة بالتجزئة التكامل $I = \\int_0^{${b}} (${linKatex})e^{-x}\\,dx$:`,
				imageUrl,
				imageCaption: `الحيز المستوي المحدد بالمنحنى (C_g) على المجال [0 ; ${b}]`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نضع $u(x) = ${linKatex}$ ($u'(x) = ${c}$) و $v'(x) = e^{-x}$ ($v(x) = -e^{-x}$).\nبالمكاملة بالتجزئة: $I = [-(${linKatex})e^{-x}]_0^{${b}} + \\int_0^{${b}} ${c}e^{-x}\\,dx = ${d} - ${c * b + d}e^{-${b}} + [-${c}e^{-x}]_0^{${b}} = ${iExactKatex}$.`
			};
		} else if (difficulty === 'medium') {
			const correctCm2 = `$(${areaExactKatex})\\text{ cm}^2$`;
			const wrongForgetUnit = `$(${iExactKatex})\\text{ cm}^2$`;
			const wrongLinearScale = `$(${fmtExpDiffKatex(uCm * A0, uCm * A1, b)})\\text{ cm}^2$`;
			const wrongSignArea = `$(${areaConstCm2} + ${areaExpCm2}e^{-${b}})\\text{ cm}^2$`;

			const mcq = buildUniqueMcqOptions(
				correctCm2,
				[
					{
						text: wrongForgetUnit,
						diagnosticFeedback: `هذه المساحة بوحدة المساحة $(\\text{u.a})$؛ للتحويل إلى $\\text{cm}^2$ نضرب في $\\|\\vec{i}\\| \\times \\|\\vec{j}\\| = ${uCm} \\times ${uCm} = ${uaCm2}\\text{ cm}^2$.`
					},
					{
						text: wrongLinearScale,
						diagnosticFeedback: `انتبه: ضربت في $${uCm}$ بدلاً من وحدة المساحة $${uCm} \\times ${uCm} = ${uaCm2}\\text{ cm}^2$!`
					},
					{
						text: wrongSignArea,
						diagnosticFeedback: `تحقق من إشارة التعويض في المكاملة بالتجزئة عند $x = ${b}$.`
					}
				],
				rng
			);
			finalAnswer = `(${areaExactKatex}) cm^2`;
			quizQuestion = {
				type: 'mcq',
				questionText: `في معلم متعامد ومتجانس $(O; \\vec{i}, \\vec{j})$ وحدة الطول فيه $\\|\\vec{i}\\| = \\|\\vec{j}\\| = ${uCm}\\text{ cm}$، نعتبر الدالة الموجبة $g(x) = (${linKatex})e^{-x}$ على $[0 ; ${b}]$. ما هي مساحة الحيز المظلل المحدد بـ $(C_g)$ ومحور الفواصل والمستقيمين $x = 0$ و $x = ${b}$ مقدرة بـ $\\text{cm}^2$؟`,
				questionTextAr: `احسب بـ $\\text{cm}^2$ مساحة الحيز المحدد بـ $(C_g)$ ومحور الفواصل و $x = 0$ و $x = ${b}$ (وحدة الطول $${uCm}\\text{ cm}$):`,
				imageUrl,
				imageCaption: `الحيز المستوي المظلل تحت المنحنى (C_g) على [0 ; ${b}]`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `بالمكاملة بالتجزئة نجد $\\int_0^{${b}} g(x)\\,dx = ${iExactKatex}\\text{ u.a}$.\nوبما أن $1\\text{ u.a} = ${uCm} \\times ${uCm} = ${uaCm2}\\text{ cm}^2$ فإن $\\mathcal{A} = ${uaCm2}(${iExactKatex}) = (${areaExactKatex})\\text{ cm}^2$.`
			};
		} else {
			const correctVol = `$\\pi(${iExactKatex})\\text{ u.v}$`;
			const wrongNoPi = `$(${iExactKatex})\\text{ u.v}$`;
			const wrongTwoPi = `$2\\pi(${iExactKatex})\\text{ u.v}$`;
			const wrongSignVol = `$\\pi(${A0} + ${A1}e^{-${b}})\\text{ u.v}$`;

			const mcq = buildUniqueMcqOptions(
				correctVol,
				[
					{
						text: wrongNoPi,
						diagnosticFeedback: `لا تنسَ العامل $\\pi$ في دستور حجم المجسم الدوراني $V = \\pi \\int_a^b [h(x)]^2\\,dx$!`
					},
					{
						text: wrongTwoPi,
						diagnosticFeedback: `دستور الحجم الدوراني حول محور الفواصل هو $V = \\pi \\int_a^b [h(x)]^2\\,dx$ (مساحة قرص نصف قطره $h(x)$ هي $\\pi [h(x)]^2$ وليست $2\\pi$).`
					},
					{
						text: wrongSignVol,
						diagnosticFeedback: `راجع إشارة الحد الأسي في المكاملة بالتجزئة للتكامل $\\int_0^{${b}} (${linKatex})e^{-x}\\,dx$.`
					}
				],
				rng
			);
			finalAnswer = `pi(${iExactKatex}) u.v`;
			quizQuestion = {
				type: 'mcq',
				questionText: `نعتبر على المجال $[0 ; ${b}]$ الدالة الموجبة $h(x) = \\sqrt{${linKatex}}\\,e^{-x/2}$. ما هو الحجم $V$ (بوحدة الحجوم $\\text{u.v}$) للمجسم الناتج عن دوران منحنى الدالة $h$ دورة كاملة حول محور الفواصل على المجال $[0 ; ${b}]$؟`,
				questionTextAr: `ما هو حجم المجسم الدوراني $V = \\pi \\int_0^{${b}} [h(x)]^2\\,dx$ حيث $h(x) = \\sqrt{${linKatex}}\\,e^{-x/2}$؟`,
				imageUrl,
				imageCaption: `منحنى الدالة المربعة g(x) = [h(x)]^2 على [0 ; ${b}]`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `لدينا $[h(x)]^2 = (${linKatex})(e^{-x/2})^2 = (${linKatex})e^{-x}$.\nبتطبيق دستور الحجم الدوراني والمكاملة بالتجزئة:\n$V = \\pi \\int_0^{${b}} (${linKatex})e^{-x}\\,dx = \\pi(${iExactKatex})\\text{ u.v}$.`
			};
		}

		return {
			templateId: this.id,
			seed,
			grade: '3as_se',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `المستوي منسوب إلى معلم متعامد ومتجانس $(O ; arrow(i), arrow(j))$ حيث $norm(arrow(i)) = norm(arrow(j)) = ${uCm} upright("cm")$. نعتبر على المجال $[0 ; ${b}]$ الدالة $g$ المعرفة بـ: $g(x) = (${linTypst}) e^(-x)$، وليكن $(C_g)$ تمثيلها البياني.`,
				content: [
					{
						type: 'columns',
						widths: ['1.45fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) باستعمال المكاملة بالتجزئة، احسب القيمة المضبوطة للتكامل:\n$I = integral_0^${b} (${linTypst}) e^(-x) dif x$.\n\n2) باستعمال المكاملة بالتجزئة، احسب القيمة المضبوطة للتكامل اللوغاريتمي:\n$L = integral_1^e ${lnIntegrandTypst} dif x$.`,
								answer: `1) نضع $u(x) = ${linTypst}$ ($u'(x) = ${c}$) و $v'(x) = e^(-x)$ ($v(x) = -e^(-x)$).\nبالمكاملة بالتجزئة:\n$I = [-(${linTypst}) e^(-x)]_0^${b} + integral_0^${b} ${c} e^(-x) dif x = ${d} - ${c * b + d} e^(-${b}) + [-${c} e^(-x)]_0^${b} = ${iExactTypst}$.\n\n2) نضع $u_1(x) = ln(x)$ ($u'_1(x) = frac(1, x)$) و $v'_1(x) = ${pLn === 1 ? '1' : pLn === 2 ? '4 x' : '9 x^2'}$ ($v_1(x) = ${v1Typst}$).\nبالمكاملة بالتجزئة:\n$L = [${v1Typst} ln(x)]_1^e - integral_1^e ${pLn === 1 ? '1' : pLn === 2 ? '2 x' : '3 x^2'} dif x = ${pLn} e^${pLn === 1 ? '1' : pLn} - [x^${pLn === 1 ? '1' : pLn}]_1^e = ${lnResultTypst}$.`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: `المنحنى (C_g) والحيز المستوي المظلل على [0 ; ${b}]`
							}
						]
					},
					{
						type: 'text',
						content: `3) تحقّق أن $g(x) > 0$ من أجل كل $x in [0 ; ${b}]$، ثم استنتج مساحة الحيز المستوي $(cal(D))$ المحدد بالمنحنى $(C_g)$ ومحور الفواصل والمستقيمين $x = 0$ و $x = ${b}$ بوحدة المساحة $(upright("u.a"))$ ثم بالسنتيمتر المربع $(upright("cm")^2)$ (مع إعطاء المدور إلى $10^(-2)$).`,
						answer: `3) من أجل كل $x in [0 ; ${b}]$ لدينا $${linTypst} >= ${d} > 0$ و $e^(-x) > 0$، إذن $g(x) > 0$.\n- بوحدة المساحة: $cal(A) = integral_0^${b} g(x) dif x = (${iExactTypst}) upright("u.a")$.\n- بالسنتيمتر المربع ($1 upright("u.a") = ${uCm} times ${uCm} = ${uaCm2} upright("cm")^2$):\n  $cal(A) = ${uaCm2}(${iExactTypst}) = (${areaExactTypst}) upright("cm")^2 approx ${areaNumericCm2} upright("cm")^2$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `4) نعتبر على المجال $[0 ; ${b}]$ الدالة الموجبة $h(x) = sqrt(${linTypst}) e^(-frac(x, 2))$. احسب بوحدة الحجوم $(upright("u.v"))$ حجم المجسم الدوراني $V$ الناتج عن دوران منحنى الدالة $h$ دورة كاملة حول محور الفواصل على $[0 ; ${b}]$.`,
						answer: `4) من أجل كل $x in [0 ; ${b}]$ لدينا $[h(x)]^2 = (${linTypst}) e^(-x) = g(x)$.\nبتطبيق دستور حجم مجسم دوراني:\n$V = pi integral_0^${b} [h(x)]^2 dif x = pi integral_0^${b} g(x) dif x = pi (${iExactTypst}) upright("u.v") approx ${volNumericUv} upright("u.v")$.`,
						mark: '1'
					}
				]
			},
			hints: [
				`في المكاملة بالتجزئة لـ $\\int_0^{${b}} (${linKatex})e^{-x}\\,dx$، اختر $u(x) = ${linKatex}$ لخفض درجة كثير الحدود و $v'(x) = e^{-x}$.`,
				`في التكامل اللوغاريتمي $\\int_1^e ${lnIntegrandKatex}\\,dx$، اختر دائماً $u_1(x) = \\ln(x)$ لتشتقها إلى $\\frac{1}{x}$.`,
				`للتحويل إلى $\\text{cm}^2$ اضرب في $\\|\\vec{i}\\| \\times \\|\\vec{j}\\| = ${uaCm2}$، وللحجم الدوراني طبّق $V = \\pi \\int_0^{${b}} [h(x)]^2\\,dx$.`
			],
			solutionStepsAr: [
				`المكاملة بالتجزئة الأولى: $I = [-(${linKatex})e^{-x}]_0^{${b}} + \\int_0^{${b}} ${c}e^{-x}\\,dx = ${iExactKatex}$.`,
				`المكاملة بالتجزئة الثانية: $L = \\int_1^e ${lnIntegrandKatex}\\,dx = ${lnResultKatex}$.`,
				`مساحة الحيز $(C_g)$ بـ $\\text{cm}^2$: $\\mathcal{A} = ${uaCm2} I = (${areaExactKatex})\\text{ cm}^2 \\approx ${areaNumericCm2}\\text{ cm}^2$.`,
				`حجم المجسم الدوراني: $V = \\pi \\int_0^{${b}} [h(x)]^2\\,dx = \\pi I = \\pi(${iExactKatex})\\text{ u.v}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Space Vectors, Coplanarity, Sphere Equations & Tangent Plane
// ═══════════════════════════════════════════════════════════════════════════════

const tplSpaceVectorsSphere: ParameterizedTemplate = {
	id: 'tpl_3as_shared_t3_space_vectors_sphere',
	grade: '3as_se',
	trimesterId: 't3',
	domain: 'geometry',
	titleAr: 'الحساب الشعاعي في الفضاء، انتماء أربع نقط لنفس المستوي، سطح الكرة والمستوي المماس',
	curriculumLessonId: 'lesson_3as_se_t3_space_vectors_coordinates_sphere',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		interface SphereCoplanarConfig {
			omega: Vec3;
			uHalf: Vec3; // ||uHalf|| = R (integer Pythagorean quadruple)
			R: number;
			vAC: Vec3; // AB_x * AC_y - AB_y * AC_x != 0 so z_D is uniquely determined by (x_D, y_D)
			alpha: number;
			beta: number;
		}

		const pool: SphereCoplanarConfig[] =
			difficulty === 'easy'
				? [
						{ omega: [1, 2, -1], uHalf: [1, 2, 2], R: 3, vAC: [1, 0, 1], alpha: 1, beta: 1 },
						{ omega: [2, -1, 1], uHalf: [2, 1, 2], R: 3, vAC: [0, 1, 2], alpha: 1, beta: 2 },
						{ omega: [0, 1, 2], uHalf: [2, 2, 1], R: 3, vAC: [1, -1, 2], alpha: 2, beta: 1 },
						{ omega: [-1, 2, 0], uHalf: [1, -2, 2], R: 3, vAC: [2, 1, 0], alpha: 1, beta: -1 },
						{ omega: [1, 0, 1], uHalf: [2, -1, 2], R: 3, vAC: [1, 2, -1], alpha: 2, beta: -1 },
						{ omega: [2, 1, -2], uHalf: [1, 2, -2], R: 3, vAC: [2, 0, 1], alpha: 1, beta: 2 }
					]
				: difficulty === 'medium'
					? [
							{ omega: [1, -1, 2], uHalf: [2, 4, 4], R: 6, vAC: [1, 0, -1], alpha: 1, beta: 2 },
							{ omega: [-1, 2, 1], uHalf: [2, 3, 6], R: 7, vAC: [1, -1, 1], alpha: 1, beta: -1 },
							{ omega: [2, 0, -1], uHalf: [3, -2, 6], R: 7, vAC: [1, 2, 0], alpha: 1, beta: 2 },
							{ omega: [0, -2, 1], uHalf: [4, 2, -4], R: 6, vAC: [1, 2, 1], alpha: 2, beta: -1 },
							{ omega: [1, 3, 0], uHalf: [2, -3, 6], R: 7, vAC: [2, 1, -1], alpha: 1, beta: 1 },
							{ omega: [-2, 1, 2], uHalf: [4, -4, 2], R: 6, vAC: [1, 1, 2], alpha: 1, beta: -2 }
						]
					: [
							{ omega: [2, -1, 3], uHalf: [2, 3, 6], R: 7, vAC: [1, -2, 1], alpha: 2, beta: -1 },
							{ omega: [-1, 2, -2], uHalf: [1, 4, 8], R: 9, vAC: [2, 1, -1], alpha: 1, beta: 2 },
							{ omega: [3, 1, -1], uHalf: [4, 4, 7], R: 9, vAC: [1, -1, 2], alpha: 1, beta: -2 },
							{ omega: [0, -3, 2], uHalf: [3, 6, -6], R: 9, vAC: [1, 0, 2], alpha: 1, beta: 3 },
							{ omega: [1, -2, 1], uHalf: [4, -4, 7], R: 9, vAC: [1, 2, -1], alpha: 2, beta: 1 },
							{ omega: [-2, 0, 3], uHalf: [6, -2, 3], R: 7, vAC: [1, 2, 1], alpha: -1, beta: 2 }
						];

		const cfg = rng.pick(pool);
		const { omega, uHalf, R, vAC, alpha, beta } = cfg;

		const A = sub3(omega, uHalf);
		const B = add3(omega, uHalf);
		const AB = scale3(2, uHalf);
		const C = add3(A, vAC);
		const AC = vAC;
		const AD = add3(scale3(alpha, AB), scale3(beta, AC));
		const D = add3(A, AD);

		// Tangent plane (T) to sphere (S) at B: normal is omega->B = uHalf (reduced)
		const nT = reduceNormal(uHalf);
		const dT = -dot3(nT, B);
		const tangentPlaneKatex = fmtPlaneKatex(nT[0], nT[1], nT[2], dT);
		const tangentPlaneTypst = fmtPlaneTypst(nT[0], nT[1], nT[2], dT);

		const sphereExpKatex = fmtSphereExpandedKatex(omega, R);
		const sphereExpTypst = fmtSphereExpandedTypst(omega, R);
		const sphereCanTypst = fmtSphereCanonicalTypst(omega, R);

		const sceneSvg = svgSpace3DScene({
			points: [
				{ x: A[0] * 0.35, y: A[1] * 0.35, z: A[2] * 0.35, label: 'A', color: '#15803d' },
				{ x: omega[0] * 0.35, y: omega[1] * 0.35, z: omega[2] * 0.35, label: 'Omega', color: '#dc2626' },
				{ x: B[0] * 0.35, y: B[1] * 0.35, z: B[2] * 0.35, label: 'B', color: '#1d4ed8' },
				{ x: C[0] * 0.35, y: C[1] * 0.35, z: C[2] * 0.35, label: 'C', color: '#7c3aed' }
			],
			showPlanePatch: true,
			planeLabel: '(T)',
			normalVector: {
				x: (uHalf[0] / R) * 1.4,
				y: (uHalf[1] / R) * 1.4,
				z: (uHalf[2] / R) * 1.4,
				label: 'n'
			}
		});
		const imageUrl = saveSvgAsset(`3as_shared_t3_space_sphere_${difficulty}_s${seed}`, sceneSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${R}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `في الفضاء المنسوب إلى معلم متعامد ومتجانس $(O; \\vec{i}, \\vec{j}, \\vec{k})$، نعتبر سطح الكرة $(S)$ المعرف بمعادلته المنشورة:\n$$${sphereExpKatex}$$\nاحسب نصف القطر $R$ لسطح الكرة $(S)$:`,
				questionTextAr: `ما هو نصف قطر سطح الكرة $(S): ${sphereExpKatex}$؟`,
				imageUrl,
				imageCaption: 'تمثيل في الفضاء لسطح الكرة (S) ومستويه المماس (T)',
				questionData: {
					answer: R,
					displayTemplate: 'R = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `بإتمام المربعات نحصل على الشكل النموذجي $${fmtSphereCanonicalKatex(omega, R)}$، ومنه مركز الكرة هو $\\Omega${fmtPtKatex(omega)}$ ونصف قطرها $R = \\sqrt{${R * R}} = ${R}$.`
			};
		} else if (difficulty === 'medium') {
			const dWrongOmega = -dot3(nT, omega);
			const wrongThroughOmega = `$${fmtPlaneKatex(nT[0], nT[1], nT[2], dWrongOmega)}$`;
			const wrongSignD = `$${fmtPlaneKatex(nT[0], nT[1], nT[2], dT === 0 ? R : -dT)}$`;
			const wrongNormalSwap = `$${fmtPlaneKatex(nT[1], -nT[0], nT[2], -(nT[1] * B[0] - nT[0] * B[1] + nT[2] * B[2]))}$`;

			const mcq = buildUniqueMcqOptions(
				`$${tangentPlaneKatex}$`,
				[
					{
						text: wrongThroughOmega,
						diagnosticFeedback: `هذا المستوي يمر من المركز $\\Omega$ وليس من نقطة التماس $B${fmtPtKatex(B)}$!`
					},
					{
						text: wrongSignD,
						diagnosticFeedback: `انتبه لإشارة الثابت $d$ عند نشر الجداء السلمي $\\vec{BM} \\cdot \\vec{\\Omega B} = 0$.`
					},
					{
						text: wrongNormalSwap,
						diagnosticFeedback: `الشعاع الناظمي للمستوي المماس عند $B$ هو $\\vec{\\Omega B}${fmtPtKatex(uHalf)}$؛ تحقق من مركباته.`
					}
				],
				rng
			);
			finalAnswer = tangentPlaneKatex;
			quizQuestion = {
				type: 'mcq',
				questionText: `في الفضاء المنسوب إلى معلم متعامد ومتجانس، نعتبر سطح الكرة $(S)$ التي مركزها $\\Omega${fmtPtKatex(omega)}$ وتشمل النقطة $B${fmtPtKatex(B)}$. ما هي المعادلة الديكارتية للمستوي $(T)$ المماس لسطح الكرة $(S)$ عند النقطة $B$؟`,
				questionTextAr: `ما معادلة المستوي $(T)$ المماس لسطح الكرة $(S)$ ذات المركز $\\Omega${fmtPtKatex(omega)}$ عند $B${fmtPtKatex(B)}$؟`,
				imageUrl,
				imageCaption: 'المستوي المماس (T) لسطح الكرة (S) عند النقطة B',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الشعاع $\\vec{\\Omega B}${fmtPtKatex(uHalf)}$ ناظمي على المستوي المماس $(T)$ عند $B$. بعد الاختزال نستعمل الناظم $\\vec{n}${fmtPtKatex(nT)}$:\n$M(x; y; z) \\in (T) \\iff \\vec{BM} \\cdot \\vec{n} = 0 \\iff ${tangentPlaneKatex}$.`
			};
		} else {
			finalAnswer = `${D[2]}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `في الفضاء المنسوب إلى معلم متعامد ومتجانس، نعتبر النقط غير الاستقامية $A${fmtPtKatex(A)}$، $B${fmtPtKatex(B)}$، $C${fmtPtKatex(C)}$. عيّن قيمة الراقم $z_D$ للنقطة $D(${D[0]} ; ${D[1]} ; z_D)$ حتى تنتمي النقط $A, B, C, D$ إلى نفس المستوي:`,
				questionTextAr: `عيّن $z_D$ حتى تنتمي $D(${D[0]} ; ${D[1]} ; z_D)$ إلى المستوي $(ABC)$:`,
				imageUrl,
				imageCaption: 'تمثيل النقط والأشعة في الفضاء',
				questionData: {
					answer: D[2],
					displayTemplate: 'z_D = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `لدينا $\\vec{AB}${fmtPtKatex(AB)}$ و $\\vec{AC}${fmtPtKatex(AC)}$. بحل الجملة $x_D - x_A = \\alpha x_{\\vec{AB}} + \\beta x_{\\vec{AC}}$ و $y_D - y_A = \\alpha y_{\\vec{AB}} + \\beta y_{\\vec{AC}}$ نجد $\\alpha = ${alpha}$ و $\\beta = ${beta}$.\nومنه $z_D = z_A + (${alpha})(${AB[2]}) + (${beta})(${AC[2]}) = ${D[2]}$.`
			};
		}

		const omegaC2 = normSq3(sub3(C, omega));
		const posCAr =
			omegaC2 === R * R
				? 'تنتمي إلى سطح الكرة $(S)$'
				: omegaC2 < R * R
					? 'تقع داخل الكرة $(S)$'
					: 'تقع خارج سطح الكرة $(S)$';

		return {
			templateId: this.id,
			seed,
			grade: '3as_se',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `في الفضاء المنسوب إلى معلم متعامد ومتجانس $(O ; arrow(i), arrow(j), arrow(k))$، نعتبر النقط $A${fmtPtTypst(A)}$، $B${fmtPtTypst(B)}$، $C${fmtPtTypst(C)}$ و $D${fmtPtTypst(D)}$.`,
				content: [
					{
						type: 'columns',
						widths: ['1.5fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) احسب مركبات الأشعة $arrow(A B)$، $arrow(A C)$ و $arrow(A D)$، وتحقّق أن النقط $A, B, C$ ليست في استقامية، ثم عيّن العددين الحقيقيين $alpha$ و $beta$ بحيث $arrow(A D) = alpha arrow(A B) + beta arrow(A C)$ واستنتج أن النقط $A, B, C, D$ تقع في نفس المستوي.\n\n2) لتكن $(S)$ مجموعة النقط $M(x, y, z)$ من الفضاء التي تحقق $arrow(M A) dot arrow(M B) = 0$. اكتب المعادلة الديكارتية المنشورة ثم النموذجية لسطح الكرة $(S)$ وعيّن مركزها $Omega$ ونصف قطرها $R$.`,
								answer: `1) حساب المركبات: $arrow(A B) ${fmtPtTypst(AB)}$، $arrow(A C) ${fmtPtTypst(AC)}$، $arrow(A D) ${fmtPtTypst(AD)}$.\n- مركبات $arrow(A B)$ و $arrow(A C)$ غير متناسبة ($${AB[0]} times (${AC[1]}) - (${AB[1]}) times (${AC[0]}) = ${AB[0] * AC[1] - AB[1] * AC[0]} != 0$)، فالنقط $A, B, C$ تُعيّن مستوياً وحيداً.\n- نلاحظ أن $(${alpha}) arrow(A B) + (${beta}) arrow(A C) = ${fmtPtTypst(AD)} = arrow(A D)$، أي $alpha = ${alpha}$ و $beta = ${beta}$، ومنه $A, B, C, D$ تنتمي إلى نفس المستوي.\n\n2) مجموعة النقط التي تحقق $arrow(M A) dot arrow(M B) = 0$ هي سطح الكرة $(S)$ التي قطرها $[A B]$:\n- مركزها منتصف $[A B]$ هو $Omega${fmtPtTypst(omega)}$، ونصف قطرها $R = Omega B = sqrt((${uHalf[0]})^2 + (${uHalf[1]})^2 + (${uHalf[2]})^2) = ${R}$.\n- المعادلة النموذجية: $${sphereCanTypst}$.\n- المعادلة المنشورة: $${sphereExpTypst}$.`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'تمثيل مجسم الفضاء وسطح الكرة والمستوي المماس (T)'
							}
						]
					},
					{
						type: 'text',
						content: `3) احسب الطول $Omega C$ وحدّد وضعية النقطة $C$ بالنسبة إلى سطح الكرة $(S)$، وتحقّق حسابياً أن النقطة $B$ تنتمي إلى $(S)$.`,
						answer: `3) لدينا $Omega C = sqrt((${C[0] - omega[0]})^2 + (${C[1] - omega[1]})^2 + (${C[2] - omega[2]})^2) = sqrt(${omegaC2})$ بينما $R = sqrt(${R * R}) = ${R}$، إذن النقطة $C$ ${posCAr}.\nوبالتعويض بإحداثيات $B${fmtPtTypst(B)}$ نجد $Omega B^2 = ${R * R} = R^2$، فالنقطة $B in (S)$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `4) اكتب معادلة ديكارتية للمستوي $(T)$ المماس لسطح الكرة $(S)$ عند النقطة $B$.`,
						answer: `4) المستوي $(T)$ المماس لـ $(S)$ عند $B$ يقبل الشعاع $arrow(Omega B) ${fmtPtTypst(uHalf)}$ (أو الشعاع المختزل $arrow(n) ${fmtPtTypst(nT)}$) شعاعاً ناظمياً له:\n$M(x, y, z) in (T) arrow.r.double arrow(B M) dot arrow(n) = 0 arrow.r.double ${tangentPlaneTypst}$.`,
						mark: '1'
					}
				]
			},
			hints: [
				`تكون أربع نقط $A, B, C, D$ في نفس المستوي إذا وُجد عددان حقيقيان $\\alpha, \\beta$ يحققان $\\vec{AD} = \\alpha \\vec{AB} + \\beta \\vec{AC}$.`,
				`مجموعة النقط $M$ التي تحقق $\\vec{MA} \\cdot \\vec{MB} = 0$ هي سطح الكرة التي قطرها $[AB]$ ومركزها منتصف $[AB]$.`,
				`المستوي $(T)$ المماس لسطح الكرة $(S)$ عند $B$ يعامد نصف القطر $[\\Omega B]$، أي $\\vec{BM} \\cdot \\vec{\\Omega B} = 0$.`
			],
			solutionStepsAr: [
				`انتماء النقط لنفس المستوي: $\\vec{AD} = (${alpha})\\vec{AB} + (${beta})\\vec{AC}$ حيث $\\vec{AB}${fmtPtKatex(AB)}$ و $\\vec{AC}${fmtPtKatex(AC)}$.`,
				`معادلة سطح الكرة $(S)$ ذات القطر $[AB]$: المركز $\\Omega${fmtPtKatex(omega)}$، نصف القطر $R = ${R}$، والمعادلة $${sphereExpKatex}$.`,
				`وضعية $C$: $\\Omega C = \\sqrt{${omegaC2}}$ مقارنةً مع $R = \\sqrt{${R * R}}$.`,
				`معادلة المستوي المماس $(T)$ عند $B$: $\\vec{BM} \\cdot \\vec{n} = 0 \\iff ${tangentPlaneKatex}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Cartesian Plane Equation, Orthogonal Distance, Projection & Sphere-Plane Circle
// ═══════════════════════════════════════════════════════════════════════════════

const tplSpacePlanesDistance: ParameterizedTemplate = {
	id: 'tpl_3as_shared_t3_space_planes_distance',
	grade: '3as_se',
	trimesterId: 't3',
	domain: 'geometry',
	titleAr: 'الجداء السلمي في الفضاء، المعادلة الديكارتية لمستو، المسافة وتقاطع كرة ومستو',
	curriculumLessonId: 'lesson_3as_se_t3_space_scalar_product_planes_distance',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		interface PlaneDistCircleConfig {
			n: Vec3; // ||n|| = normN
			normN: number;
			H: Vec3; // orthogonal projection of A onto (P); B = H
			u1: Vec3; // n . u1 = 0
			u2: Vec3; // n . u2 = 0, non-collinear with u1
			sStep: number; // A = H + sStep * n => d(A, (P)) = |sStep| * normN
			R: number; // r = sqrt(R^2 - d^2) exact integer
		}

		const pool: PlaneDistCircleConfig[] =
			difficulty === 'easy'
				? [
						{ n: [1, 2, 2], normN: 3, H: [1, 0, -1], u1: [2, -1, 0], u2: [0, 1, -1], sStep: 1, R: 5 },
						{ n: [2, 1, 2], normN: 3, H: [0, 2, 1], u1: [1, -2, 0], u2: [0, 2, -1], sStep: 1, R: 5 },
						{ n: [2, 2, -1], normN: 3, H: [1, -1, 2], u1: [1, -1, 0], u2: [1, 0, 2], sStep: -1, R: 5 },
						{ n: [1, -2, 2], normN: 3, H: [2, 1, 0], u1: [2, 1, 0], u2: [0, 1, 1], sStep: 2, R: 10 },
						{ n: [2, -1, 2], normN: 3, H: [-1, 1, 1], u1: [1, 2, 0], u2: [0, 2, 1], sStep: -2, R: 10 },
						{ n: [1, 2, -2], normN: 3, H: [1, 2, 1], u1: [2, -1, 0], u2: [0, 1, 1], sStep: 1, R: 5 }
					]
				: difficulty === 'medium'
					? [
							{ n: [1, 2, 2], normN: 3, H: [2, -1, 1], u1: [2, -1, 0], u2: [0, 1, -1], sStep: 2, R: 10 },
							{ n: [2, -1, 2], normN: 3, H: [1, 3, -1], u1: [1, 2, 0], u2: [0, 2, 1], sStep: 3, R: 15 },
							{ n: [2, 2, -1], normN: 3, H: [-1, 2, 0], u1: [1, -1, 0], u2: [1, 0, 2], sStep: -4, R: 13 },
							{ n: [2, 3, 6], normN: 7, H: [1, 0, -1], u1: [3, -2, 0], u2: [0, 2, -1], sStep: 1, R: 25 },
							{ n: [3, -2, 6], normN: 7, H: [0, 1, 2], u1: [2, 3, 0], u2: [0, 3, 1], sStep: -1, R: 25 },
							{ n: [1, -2, 2], normN: 3, H: [-2, 1, 3], u1: [2, 1, 0], u2: [0, 1, 1], sStep: 4, R: 13 }
						]
					: [
							{ n: [2, 3, 6], normN: 7, H: [-1, 2, 1], u1: [3, -2, 0], u2: [0, 2, -1], sStep: -1, R: 25 },
							{ n: [3, 6, -2], normN: 7, H: [2, -1, 0], u1: [2, -1, 0], u2: [0, 1, 3], sStep: 1, R: 25 },
							{ n: [1, 4, 8], normN: 9, H: [1, -1, 2], u1: [4, -1, 0], u2: [0, 2, -1], sStep: 1, R: 15 },
							{ n: [4, -4, 7], normN: 9, H: [0, 2, -1], u1: [1, 1, 0], u2: [7, 0, -4], sStep: -1, R: 15 },
							{ n: [2, -1, 2], normN: 3, H: [3, -2, 1], u1: [1, 2, 0], u2: [0, 2, 1], sStep: 4, R: 13 },
							{ n: [1, -4, 8], normN: 9, H: [-1, 1, 0], u1: [4, 1, 0], u2: [0, 2, 1], sStep: -1, R: 15 }
						];

		const cfg = rng.pick(pool);
		const { n, normN, H, u1, u2, sStep, R } = cfg;

		const B = H;
		const C = add3(H, u1);
		const D = add3(H, u2);
		const A = add3(H, scale3(sStep, n));

		const dP = -dot3(n, H);
		const planeKatex = fmtPlaneKatex(n[0], n[1], n[2], dP);
		const planeTypst = fmtPlaneTypst(n[0], n[1], n[2], dP);

		const evalAtA = dot3(n, A) + dP; // = sStep * normN^2
		const dDist = Math.abs(sStep) * normN;
		const rCircle = Math.round(Math.sqrt(R * R - dDist * dDist));
		const tProj = -sStep; // A + t * n = H when t = -sStep

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${dDist}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `في الفضاء المنسوب إلى معلم متعامد ومتجانس، نعتبر النقطة $A${fmtPtKatex(A)}$ والمستوي $(P)$ ذا المعادلة الديكارتية $${planeKatex}$.\nاحسب المسافة العمودية $d(A, (P))$ بين النقطة $A$ والمستوي $(P)$:`,
				questionTextAr: `احسب المسافة $d(A, (P))$ حيث $A${fmtPtKatex(A)}$ و $(P): ${planeKatex}$:`,
				questionData: {
					answer: dDist,
					displayTemplate: 'd(A, (P)) = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `نطبق دستور المسافة: $d(A, (P)) = \\frac{|(${n[0]})(${A[0]}) + (${n[1]})(${A[1]}) + (${n[2]})(${A[2]}) + (${dP})|}{\\sqrt{(${n[0]})^2 + (${n[1]})^2 + (${n[2]})^2}} = \\frac{|${evalAtA}|}{${normN}} = ${dDist}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${rCircle}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `في الفضاء المنسوب إلى معلم متعامد ومتجانس، نعتبر سطح الكرة $(S)$ ذات المركز $A${fmtPtKatex(A)}$ ونصف القطر $R = ${R}$، والمستوي $(P): ${planeKatex}$.\nيقطع المستوي $(P)$ سطح الكرة $(S)$ وفق دائرة $(\\mathcal{C})$. احسب نصف قطرها $r$:`,
				questionTextAr: `احسب نصف قطر دائرة تقاطع الكرة $(S)(A, R=${R})$ مع المستوي $(P): ${planeKatex}$:`,
				questionData: {
					answer: rCircle,
					displayTemplate: 'r = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `نحسب أولاً بُعد المركز $A$ عن المستوي $(P)$: $d = d(A, (P)) = \\frac{|${evalAtA}|}{${normN}} = ${dDist} < ${R}$.\nومنه نصف قطر دائرة التقاطع هو $r = \\sqrt{R^2 - d^2} = \\sqrt{${R}^2 - ${dDist}^2} = \\sqrt{${R * R - dDist * dDist}} = ${rCircle}$.`
			};
		} else {
			const HWrongFlip = add3(A, scale3(sStep, n)); // used t = +sStep instead of -sStep
			const correctOpt = `المركز $H${fmtPtKatex(H)}$ ونصف القطر $r = ${rCircle}$`;
			const wrongSignOpt = `المركز $H${fmtPtKatex(HWrongFlip)}$ ونصف القطر $r = ${rCircle}$`;
			const wrongNoSqrtOpt = `المركز $H${fmtPtKatex(H)}$ ونصف القطر $r = ${R * R - dDist * dDist}$`;
			const wrongUseDistOpt = `المركز $H${fmtPtKatex(H)}$ ونصف القطر $r = ${dDist}$`;

			const mcq = buildUniqueMcqOptions(
				correctOpt,
				[
					{
						text: wrongSignOpt,
						diagnosticFeedback: `أخطأت في إشارة الوسيط $t$ عند تعويض التمثيل الوسيطي للمستقيم العمودي في معادلة المستوي $(P)$ ($t = ${tProj}$).`
					},
					{
						text: wrongNoSqrtOpt,
						diagnosticFeedback: `هذا يمثل $r^2 = R^2 - d^2 = ${R * R - dDist * dDist}$؛ لا تنسَ أخذ الجذر التربيعي لإيجاد نصف القطر $r = ${rCircle}$.`
					},
					{
						text: wrongUseDistOpt,
						diagnosticFeedback: `العدد $${dDist}$ هو المسافة العمودية $d(A, (P))$، أما نصف قطر الدائرة فهو $r = \\sqrt{R^2 - d^2} = ${rCircle}$.`
					}
				],
				rng
			);
			finalAnswer = `H${fmtPtKatex(H)}, r = ${rCircle}`;
			quizQuestion = {
				type: 'mcq',
				questionText: `نعتبر في الفضاء سطح الكرة $(S)$ التي مركزها $A${fmtPtKatex(A)}$ ونصف قطرها $R = ${R}$، والمستوي $(P): ${planeKatex}$. ما هما المركز $H$ ونصف القطر $r$ لدائرة تقاطع $(S)$ و $(P)$؟`,
				questionTextAr: `عيّن المركز $H$ ونصف القطر $r$ لدائرة تقاطع $(S)(A, ${R})$ والمستوي $(P): ${planeKatex}$:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `المسافة $d(A, (P)) = ${dDist} < ${R}$، فنصف القطر $r = \\sqrt{${R}^2 - ${dDist}^2} = ${rCircle}$.\nالمسقط العمودي $H$ يحقق $\\vec{AH} = t\\vec{n}$ مع $H \\in (P)$ أي $t = ${tProj}$، ومنه $H${fmtPtKatex(H)}$.`
			};
		}

		return {
			templateId: this.id,
			seed,
			grade: '3as_se',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `في الفضاء المنسوب إلى معلم متعامد ومتجانس $(O ; arrow(i), arrow(j), arrow(k))$، نعتبر النقط $B${fmtPtTypst(B)}$، $C${fmtPtTypst(C)}$، $D${fmtPtTypst(D)}$ والنقطة $A${fmtPtTypst(A)}$، والشعاع $arrow(n) ${fmtPtTypst(n)}$.`,
				content: [
					{
						type: 'text',
						content: `1) تحقّق أن النقط $B, C, D$ تعيّن مستوياً $(P)$، وبيّن باستعمال الجداء السلمي أن الشعاع $arrow(n)$ ناظمي للمستوي $(P)$، ثم استنتج معادلة ديكارتية للمستوي $(P)$.`,
						answer: `1) لدينا $arrow(B C) ${fmtPtTypst(u1)}$ و $arrow(B D) ${fmtPtTypst(u2)}$ غير مرتبطين خطياً، فالنقط $B, C, D$ تعيّن مستوياً $(P)$.\n- نحسب الجداء السلمي: $arrow(n) dot arrow(B C) = (${n[0]})(${u1[0]}) + (${n[1]})(${u1[1]}) + (${n[2]})(${u1[2]}) = 0$ و $arrow(n) dot arrow(B D) = (${n[0]})(${u2[0]}) + (${n[1]})(${u2[1]}) + (${n[2]})(${u2[2]}) = 0$.\n- بما أن $arrow(n)$ عمودي على شعاعين غير مرتبطين خطياً من $(P)$ فهو ناظمي له.\n- معادلة $(P)$: $arrow(B M) dot arrow(n) = 0 arrow.r.double ${planeTypst}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) احسب المسافة العمودية $d(A, (P))$ بين النقطة $A$ والمستوي $(P)$.`,
						answer: `2) لدينا $norm(arrow(n)) = sqrt((${n[0]})^2 + (${n[1]})^2 + (${n[2]})^2) = sqrt(${normN * normN}) = ${normN}$.\nومنه $d(A, (P)) = frac(abs((${n[0]})(${A[0]}) + (${n[1]})(${A[1]}) + (${n[2]})(${A[2]}) + (${dP})), ${normN}) = frac(abs(${evalAtA}), ${normN}) = ${dDist}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) اكتب تمثيلاً وسيطياً للمستقيم $(Delta)$ المار من $A$ والعمودي على المستوي $(P)$، ثم استنتج إحداثيات النقطة $H$ المسقط العمودي للنقطة $A$ على $(P)$.`,
						answer: `3) المستقيم $(Delta)$ يشمل $A$ ويقبل $arrow(n) ${fmtPtTypst(n)}$ شعاع توجيه له: $${fmtParamSystemTypst(A, n, 't')}$ ($t in bb(R)$).\nبتعويض إحداثيات نقطة من $(Delta)$ في معادلة $(P)$ نجد: $${evalAtA} + ${normN * normN} t = 0 arrow.r.double t = ${tProj}$.\nومنه إحداثيات المسقط العمودي هي $H${fmtPtTypst(H)}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `4) ليكن $(S)$ سطح الكرة ذات المركز $A$ ونصف القطر $R = ${R}$. ادرس الوضع النسبي لسطح الكرة $(S)$ والمستوي $(P)$، وحدّد العناصر المميزة لتقاطعهما.`,
						answer: `4) بما أن $d(A, (P)) = ${dDist} < R = ${R}$، فإن المستوي $(P)$ يقطع سطح الكرة $(S)$ وفق دائرة $(cal(C))$:\n- مركزها هو المسقط العمودي $H${fmtPtTypst(H)}$.\n- نصف قطرها هو $r = sqrt(R^2 - d^2) = sqrt(${R}^2 - ${dDist}^2) = sqrt(${R * R - dDist * dDist}) = ${rCircle}$.`,
						mark: '1'
					}
				]
			},
			hints: [
				`لإثبات أن $\\vec{n}$ ناظمي للمستوي $(BCD)$، يكفي التحقق أن $\\vec{n} \\cdot \\vec{BC} = 0$ و $\\vec{n} \\cdot \\vec{BD} = 0$ باستعمال العبارة التحليلية للجداء السلمي.`,
				`المسافة العمودية تُعطى بالقانون $d(A, (P)) = \\frac{|ax_A + by_A + cz_A + d|}{\\sqrt{a^2 + b^2 + c^2}}$.`,
				`المسقط العمودي $H$ هو تقاطع $(P)$ مع المستقيم المار من $A$ والموجه بـ $\\vec{n}$، ونصف قطر دائرة التقاطع $r = \\sqrt{R^2 - d^2}$.`
			],
			solutionStepsAr: [
				`الشعاع الناظمي ومعادلة المستوي: $\\vec{n} \\cdot \\vec{BC} = 0$ و $\\vec{n} \\cdot \\vec{BD} = 0$، ومنه $(P): ${planeKatex}$.`,
				`حساب المسافة العمودية: $d(A, (P)) = \\frac{|${evalAtA}|}{${normN}} = ${dDist}$.`,
				`المسقط العمودي: بحل $(\\Delta) \\cap (P)$ نجد $t = ${tProj}$ ومنه $H${fmtPtKatex(H)}$.`,
				`تقاطع الكرة والمستوي: دائرة $(\\mathcal{C})$ مركزها $H${fmtPtKatex(H)}$ ونصف قطرها $r = \\sqrt{${R}^2 - ${dDist}^2} = ${rCircle}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Parametric Space Lines, Plane Intersection & Relative Positions
// ═══════════════════════════════════════════════════════════════════════════════

const tplSpaceParametricIntersections: ParameterizedTemplate = {
	id: 'tpl_3as_shared_t3_space_parametric_intersections',
	grade: '3as_se',
	trimesterId: 't3',
	domain: 'geometry',
	titleAr: 'التمثيل الوسيطي لمستقيم، تقاطع مستقيم ومستو والأوضاع النسبية في الفضاء',
	curriculumLessonId: 'lesson_3as_se_t3_space_relative_positions_intersections',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		interface ParametricInterConfig {
			I: Vec3; // intersection of (D1) and (P), and also (D1) and (D2)
			nP: Vec3;
			u1: Vec3; // nP . u1 != 0
			t0: number; // A = I - t0 * u1
			u2: Vec3; // nP . u2 == 0 and non-collinear with u1
			s0: number; // B = I - s0 * u2 => (D2) subset (P)
			nQ: Vec3; // nP . nQ == 0 => (P) perp (Q)
			dQ: number;
		}

		const pool: ParametricInterConfig[] =
			difficulty === 'easy'
				? [
						{ I: [1, 2, -1], nP: [1, 1, 1], u1: [1, 2, -1], t0: 2, u2: [1, -1, 0], s0: 1, nQ: [1, 0, -1], dQ: -2 },
						{ I: [2, 0, 1], nP: [2, -1, 1], u1: [1, 1, 1], t0: 1, u2: [1, 2, 0], s0: 2, nQ: [1, 1, -1], dQ: 1 },
						{ I: [-1, 1, 2], nP: [1, 2, -1], u1: [2, 1, 1], t0: 2, u2: [1, 0, 1], s0: -1, nQ: [1, -1, -1], dQ: 3 },
						{ I: [0, 2, 3], nP: [1, -1, 2], u1: [1, 0, 1], t0: 3, u2: [1, 1, 0], s0: 1, nQ: [1, 1, 0], dQ: -4 },
						{ I: [3, -1, 1], nP: [2, 1, -1], u1: [1, 1, 0], t0: 2, u2: [1, -1, 1], s0: 1, nQ: [1, -1, 1], dQ: 2 },
						{ I: [1, -2, 2], nP: [1, -2, 1], u1: [2, 0, 1], t0: 1, u2: [1, 1, 1], s0: 2, nQ: [1, 1, 1], dQ: -1 }
					]
				: difficulty === 'medium'
					? [
							{ I: [2, -1, 3], nP: [2, 1, -1], u1: [1, 2, 1], t0: -2, u2: [1, -1, 1], s0: 2, nQ: [1, -1, 1], dQ: -3 },
							{ I: [-2, 3, 1], nP: [1, -2, 3], u1: [2, 1, 1], t0: 2, u2: [2, 1, 0], s0: -1, nQ: [1, 2, 1], dQ: 2 },
							{ I: [1, 3, -2], nP: [3, -1, 2], u1: [1, 0, 1], t0: -1, u2: [1, 3, 0], s0: 2, nQ: [1, 1, -1], dQ: 4 },
							{ I: [3, 1, -1], nP: [2, 3, 1], u1: [1, 1, -1], t0: 3, u2: [1, -1, 1], s0: -2, nQ: [1, -1, 1], dQ: -5 },
							{ I: [-1, -2, 2], nP: [1, 3, -2], u1: [2, -1, -1], t0: 2, u2: [3, -1, 0], s0: 1, nQ: [1, 1, 2], dQ: 1 },
							{ I: [2, 2, -3], nP: [3, -2, 1], u1: [1, -1, 1], t0: -2, u2: [1, 2, 1], s0: 1, nQ: [1, 1, -1], dQ: -2 }
						]
					: [
							{ I: [3, -2, 1], nP: [2, -3, 1], u1: [1, -1, 2], t0: -2, u2: [1, 1, 1], s0: 2, nQ: [1, 1, 1], dQ: -4 },
							{ I: [-2, 1, 4], nP: [3, 1, -2], u1: [2, 1, 1], t0: 3, u2: [1, -1, 1], s0: -2, nQ: [1, -1, 1], dQ: 3 },
							{ I: [1, -3, 2], nP: [2, 1, 3], u1: [1, 2, 1], t0: -2, u2: [1, -2, 0], s0: 3, nQ: [3, 0, -2], dQ: 1 },
							{ I: [4, 0, -2], nP: [1, -2, 4], u1: [1, 1, 1], t0: -3, u2: [2, 1, 0], s0: 2, nQ: [2, 3, 1], dQ: -5 },
							{ I: [-3, 2, -1], nP: [3, 2, -1], u1: [1, 1, -1], t0: 2, u2: [1, -1, 1], s0: -3, nQ: [1, -1, 1], dQ: 4 },
							{ I: [2, -1, -2], nP: [4, -1, 2], u1: [1, 1, 1], t0: 2, u2: [1, 2, -1], s0: -2, nQ: [1, 2, -1], dQ: -3 }
						];

		const cfg = rng.pick(pool);
		const { I, nP, u1, t0, u2, s0, nQ, dQ } = cfg;

		const dP = -dot3(nP, I);
		const A = sub3(I, scale3(t0, u1));
		const B = sub3(I, scale3(s0, u2));
		const C = add3(B, nP); // C not in (P); line (D3) through C with u2 is strictly parallel to (P) and skew with (D1)

		const nDotU1 = dot3(nP, u1);
		const evalAtA = dot3(nP, A) + dP; // = -t0 * nDotU1
		const evalAtC = dot3(nP, C) + dP; // = ||nP||^2 != 0

		const planePKatex = fmtPlaneKatex(nP[0], nP[1], nP[2], dP);
		const planePTypst = fmtPlaneTypst(nP[0], nP[1], nP[2], dP);
		const planeQTypst = fmtPlaneTypst(nQ[0], nQ[1], nQ[2], dQ);

		const d1Katex = fmtParamSystemKatex(A, u1, 't');
		const d1Typst = fmtParamSystemTypst(A, u1, 't');
		const d2Typst = fmtParamSystemTypst(B, u2, 's');
		const d3Katex = fmtParamSystemKatex(C, u2, 'k');
		const d3Typst = fmtParamSystemTypst(C, u2, 'k');

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${t0}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `في الفضاء المنسوب إلى معلم متعامد ومتجانس، نعتبر المستوي $(P): ${planePKatex}$ والمستقيم $(D_1)$ المعرف بتمثيله الوسيطي:\n$$${d1Katex} \\quad (t \\in \\mathbb{R})$$\nاحسب قيمة الوسيط الحقيقي $t$ الموافقة لنقطة تقاطع المستقيم $(D_1)$ والمستوي $(P)$:`,
				questionTextAr: `ما قيمة الوسيط $t$ لنقطة تقاطع $(D_1)$ مع المستوي $(P): ${planePKatex}$؟`,
				questionData: {
					answer: t0,
					displayTemplate: 't = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `بتعويض إحداثيات $(D_1)$ في معادلة $(P)$ نجد: $${evalAtA} + (${nDotU1})t = 0 \\implies (${nDotU1})t = ${-evalAtA} \\implies t = ${t0}$.`
			};
		} else if (difficulty === 'medium') {
			const IWrongSign = add3(A, scale3(-t0, u1));
			const IPlusOne = add3(A, scale3(t0 + 1, u1));

			const mcq = buildUniqueMcqOptions(
				`$I${fmtPtKatex(I)}$`,
				[
					{
						text: `$I${fmtPtKatex(IWrongSign)}$`,
						diagnosticFeedback: `أخطأت في إشارة الوسيط $t$ عند حل المعادلة الخطية (عوّضت $t = ${-t0}$ بدلاً من $t = ${t0}$).`
					},
					{
						text: `$I${fmtPtKatex(A)}$`,
						diagnosticFeedback: `النقطة $A${fmtPtKatex(A)}$ توافق $t = 0$ على $(D_1)$ لكنها لا تحقق معادلة المستوي $(P)$!`
					},
					{
						text: `$I${fmtPtKatex(IPlusOne)}$`,
						diagnosticFeedback: `تحقق من تعويض $t = ${t0}$ في التمثيل الوسيطي للمستقيم $(D_1)$.`
					}
				],
				rng
			);
			finalAnswer = `I${fmtPtKatex(I)}`;
			quizQuestion = {
				type: 'mcq',
				questionText: `في الفضاء المنسوب إلى معلم متعامد ومتجانس، ما هي إحداثيات نقطة تقاطع المستوي $(P): ${planePKatex}$ والمستقيم $(D_1)$ المعرف بـ:\n$$${d1Katex} \\quad (t \\in \\mathbb{R})$$`,
				questionTextAr: `عيّن إحداثيات نقطة تقاطع المستقيم $(D_1)$ والمستوي $(P): ${planePKatex}$:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `لدينا $\\vec{n}_P \\cdot \\vec{u}_1 = ${nDotU1} \\neq 0$. بالتعويض في معادلة $(P)$ نجد $t = ${t0}$، ومنه نقطة التقاطع هي $I${fmtPtKatex(I)}$.`
			};
		} else {
			const mcq = buildUniqueMcqOptions(
				`المستقيمان $(D_1)$ و $(D_3)$ ليسا من نفس المستوي`,
				[
					{
						text: `المستقيمان $(D_1)$ و $(D_3)$ متقاطعان في النقطة $I${fmtPtKatex(I)}$`,
						diagnosticFeedback: `المستقيم $(D_3)$ موازٍ تماماً للمستوي $(P)$ (${evalAtC} $\\neq 0$) بينما $(D_1)$ يقطع $(P)$ في $I$ فقط، فلا يمكن أن يتقاطعا!`
					},
					{
						text: `المستقيمان $(D_1)$ و $(D_3)$ متوازيان تماماً`,
						diagnosticFeedback: `شعاعا التوجيه $\\vec{u}_1${fmtPtKatex(u1)}$ و $\\vec{u}_2${fmtPtKatex(u2)}$ غير مرتبطين خطياً، فالمستقيمان غير متوازيين.`
					},
					{
						text: `المستقيمان $(D_1)$ و $(D_3)$ منطبقان`,
						diagnosticFeedback: `مركبات شعاعي التوجيه غير متناسبة أصلاً، فلا يمكن أن يكونا متوازيين أو منطبقين.`
					}
				],
				rng
			);
			finalAnswer = 'ليسا من نفس المستوي';
			quizQuestion = {
				type: 'mcq',
				questionText: `في الفضاء المنسوب إلى معلم متعامد ومتجانس، نعتبر المستقيم $(D_1)$ المار من $A${fmtPtKatex(A)}$ والموجه بـ $\\vec{u}_1${fmtPtKatex(u1)}$، والمستقيم $(D_3)$ المعرف بـ:\n$$${d3Katex} \\quad (k \\in \\mathbb{R})$$\nما هو الوضع النسبي للمستقيمين $(D_1)$ و $(D_3)$ في الفضاء؟`,
				questionTextAr: `حدّد الوضع النسبي للمستقيمين $(D_1)$ و $(D_3)$ في الفضاء:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `شعاعا التوجيه $\\vec{u}_1${fmtPtKatex(u1)}$ و $\\vec{u}_2${fmtPtKatex(u2)}$ غير مرتبطين خطياً، فالمستقيمان غير متوازيين.\nكما أن $(D_3)$ موازٍ تماماً للمستوي $(P): ${planePKatex}$ بينما $(D_1)$ يقطع $(P)$ في نقطة وحيدة $I${fmtPtKatex(I)} \\notin (D_3)$، فالجملة لا تقبل حلاً، إذن $(D_1)$ و $(D_3)$ ليسا من نفس المستوي.`
			};
		}

		return {
			templateId: this.id,
			seed,
			grade: '3as_se',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `في الفضاء المنسوب إلى معلم متعامد ومتجانس $(O ; arrow(i), arrow(j), arrow(k))$، نعتبر المستوي $(P)$ ذا المعادلة $${planePTypst}$، والمستقيم $(D_1)$ المار من النقطة $A${fmtPtTypst(A)}$ والموجه بالشعاع $arrow(u)_1 ${fmtPtTypst(u1)}$، والمستقيم $(D_2)$ ذا التمثيل الوسيطي $${d2Typst}$ ($s in bb(R)$).`,
				content: [
					{
						type: 'text',
						content: `1) اكتب تمثيلاً وسيطياً للمستقيم $(D_1)$، ثم بيّن أن $(D_1)$ يقطع المستوي $(P)$ في نقطة وحيدة $I$ يُطلب تعيين إحداثياتها.`,
						answer: `1) التمثيل الوسيطي للمستقيم $(D_1)$: $${d1Typst}$ ($t in bb(R)$).\n- شعاع ناظمي لـ $(P)$ هو $arrow(n)_P ${fmtPtTypst(nP)}$، ولدينا $arrow(n)_P dot arrow(u)_1 = ${nDotU1} != 0$، فالمستقيم $(D_1)$ يقطع $(P)$ في نقطة وحيدة.\n- بالتعويض في معادلة $(P)$: $${evalAtA} + (${nDotU1}) t = 0 arrow.r.double t = ${t0}$، ومنه $I${fmtPtTypst(I)}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) ادرس الوضع النسبي للمستقيم $(D_2)$ والمستوي $(P)$.`,
						answer: `2) المستقيم $(D_2)$ يشمل النقطة $B${fmtPtTypst(B)}$ وموجه بالشعاع $arrow(u)_2 ${fmtPtTypst(u2)}$.\n- لدينا $arrow(n)_P dot arrow(u)_2 = (${nP[0]})(${u2[0]}) + (${nP[1]})(${u2[1]}) + (${nP[2]})(${u2[2]}) = 0$.\n- وبالتعويض بإحداثيات $B$ في معادلة $(P)$ نجد $(${nP[0]})(${B[0]}) + (${nP[1]})(${B[1]}) + (${nP[2]})(${B[2]}) + (${dP}) = 0$ أي $B in (P)$.\n- إذن المستقيم $(D_2)$ محتوى كلياً في المستوي $(P)$ ($(D_2) subset (P)$).`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) ادرس الوضع النسبي للمستقيمين $(D_1)$ و $(D_2)$ في الفضاء وعيّن تقاطعهما.`,
						answer: `3) مركبات $arrow(u)_1 ${fmtPtTypst(u1)}$ و $arrow(u)_2 ${fmtPtTypst(u2)}$ غير متناسبة، فالمستقيمان غير متوازيين.\n- نلاحظ من أجل $t = ${t0}$ و $s = ${s0}$ أن النقطة $I${fmtPtTypst(I)}$ تنتمي إلى $(D_1)$ وإلى $(D_2)$ معاً.\n- إذن المستقيمان $(D_1)$ و $(D_2)$ متقاطعان في النقطة الوحيدة $I${fmtPtTypst(I)}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `4) نعتبر المستوي $(Q)$ ذا المعادلة $${planeQTypst}$، والمستقيم $(D_3)$ ذا التمثيل الوسيطي $${d3Typst}$ ($k in bb(R)$). بيّن أن المستويين $(P)$ و $(Q)$ متعامدان، ثم حدّد الوضع النسبي لـ $(D_3)$ مع $(P)$ واستنتج الوضع النسبي للمستقيمين $(D_1)$ و $(D_3)$.`,
						answer: `4) ناظم $(Q)$ هو $arrow(n)_Q ${fmtPtTypst(nQ)}$، ولدينا $arrow(n)_P dot arrow(n)_Q = 0$، إذن المستويان $(P)$ و $(Q)$ متعامدان.\n- المستقيم $(D_3)$ موجه بـ $arrow(u)_2$ ($arrow(n)_P dot arrow(u)_2 = 0$) ويشمل $C${fmtPtTypst(C)}$ حيث $(${nP[0]})(${C[0]}) + (${nP[1]})(${C[1]}) + (${nP[2]})(${C[2]}) + (${dP}) = ${evalAtC} != 0$، إذن $(D_3)$ موازٍ تماماً لـ $(P)$ ($(D_3) inter (P) = emptyset$).\n- بما أن $(D_1)$ يقطع $(P)$ في $I$ فقط بينما $(D_3) inter (P) = emptyset$، وشعاعا توجيههما غير مرتبطين خطياً، فإن $(D_1)$ و $(D_3)$ ليسا من نفس المستوي.`,
						mark: '1'
					}
				]
			},
			hints: [
				`لإيجاد تقاطع مستقيم ومستو، عوّض عبارات $x(t), y(t), z(t)$ من التمثيل الوسيطي في المعادلة الديكارتية للمستوي.`,
				`إذا كان $\\vec{n}_P \\cdot \\vec{u} = 0$ فإن المستقيم إما محتوى في $(P)$ (إذا انتمت نقطة منه إلى $(P)$) أو موازٍ تماماً له.`,
				`مستقيمان شعاعا توجيههما غير مرتبطين خطياً ولا يتقاطعان هما مستقيمان ليسا من نفس المستوي.`
			],
			solutionStepsAr: [
				`تقاطع $(D_1)$ و $(P)$: $\\vec{n}_P \\cdot \\vec{u}_1 = ${nDotU1} \\neq 0$، وبالتعويض نجد $t = ${t0}$ ومنه $I${fmtPtKatex(I)}$.`,
				`الوضع النسبي لـ $(D_2)$ و $(P)$: $\\vec{n}_P \\cdot \\vec{u}_2 = 0$ و $B \\in (P)$، إذن $(D_2) \\subset (P)$.`,
				`المستقيمان $(D_1)$ و $(D_2)$ غير متوازيين ومتقاطعان في النقطة $I${fmtPtKatex(I)}$ ($t = ${t0}, s = ${s0}$).`,
				`تعامد المستويين $\\vec{n}_P \\cdot \\vec{n}_Q = 0$، و $(D_3)$ موازٍ تماماً لـ $(P)$، ومنه $(D_1)$ و $(D_3)$ ليسا من نفس المستوي.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Authentic ONEC BAC Analytical Function + Integral Area + Limit Problem (7 pts)
//    التمرين الرابع — المسألة الشاملة
// ═══════════════════════════════════════════════════════════════════════════════

const tplBacProblemSynthesis: ParameterizedTemplate = {
	id: 'tpl_3as_shared_t3_bac_problem_synthesis',
	grade: '3as_se',
	trimesterId: 't3',
	domain: 'integration',
	isIntegration: true,
	defaultPoints: 7,
	titleAr: 'التمرين الرابع — المسألة الشاملة: دراسة دالة أسية، مساحة حيز مستو ونهاية A(λ)',
	curriculumLessonId: 'lesson_3as_se_t3_integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		interface BacProblemConfig {
			k: number; // f(x) = k * (x + c) * e^(-x)
			c: number; // c in {1, 2, 3}, root at x = -c, max at x0 = 1 - c, inflection at xW = 2 - c
			uCm: number; // ||i|| = ||j|| = uCm cm => 1 u.a = uCm^2 cm^2
		}

		const pool: BacProblemConfig[] =
			difficulty === 'easy'
				? [
						{ k: 1, c: 1, uCm: 2 },
						{ k: 2, c: 1, uCm: 2 },
						{ k: 3, c: 1, uCm: 2 },
						{ k: 1, c: 2, uCm: 2 },
						{ k: 2, c: 1, uCm: 3 },
						{ k: 1, c: 1, uCm: 3 }
					]
				: difficulty === 'medium'
					? [
							{ k: 2, c: 2, uCm: 2 },
							{ k: 3, c: 1, uCm: 3 },
							{ k: 2, c: 2, uCm: 3 },
							{ k: 3, c: 2, uCm: 2 },
							{ k: 4, c: 1, uCm: 2 },
							{ k: 1, c: 3, uCm: 2 }
						]
					: [
							{ k: 3, c: 2, uCm: 3 },
							{ k: 2, c: 3, uCm: 2 },
							{ k: 2, c: 3, uCm: 3 },
							{ k: 4, c: 2, uCm: 2 },
							{ k: 3, c: 3, uCm: 2 },
							{ k: 4, c: 2, uCm: 3 }
						];

		const cfg = rng.pick(pool);
		const { k, c, uCm } = cfg;

		// Analytical properties of f(x) = k*(x + c)*e^(-x) on R:
		// 1) lim_{x -> -inf} f(x) = -inf ; lim_{x -> +inf} f(x) = 0 (horizontal asymptote y = 0 near +inf)
		// 2) f'(x) = k*(1 - c - x)*e^(-x), vanishes at x0 = 1 - c
		//    Global maximum M = f(1 - c) = k * e^(c - 1)
		// 3) TVI: f(x) = -k has a unique solution alpha in ]-c - 1 ; -c[ because f(-c - 1) = -k*e^(c + 1) < -k < 0 = f(-c)
		// 4) Tangent (T0) at x = 0: f(0) = k*c, f'(0) = k*(1 - c) => y = k*(1 - c)*x + k*c
		// 5) Inflection point: f''(x) = k*(x + c - 2)*e^(-x), vanishes at xW = 2 - c, yW = 2*k*e^(c - 2)
		// 6) Integral on [0, lambda] (lambda > 0):
		//    I(lambda) = int_0^lambda k*(x + c)*e^(-x) dx = [-k*(x + c + 1)*e^(-x)]_0^lambda
		//              = k*(c + 1) - k*(lambda + c + 1)*e^(-lambda)
		// 7) Planar area in cm^2: A(lambda) = uCm^2 * I(lambda)
		//    lim_{lambda -> +inf} A(lambda) = uCm^2 * k * (c + 1) cm^2

		const xMaxPt = 1 - c;
		const xInflect = 2 - c;
		const uaCm2 = uCm * uCm;
		const iLimUa = k * (c + 1);
		const areaLimCm2 = uaCm2 * iLimUa;
		const areaCoeffLambda = uaCm2 * k;
		const lambdaShift = c + 1;

		const fFn = (x: number) => k * (x + c) * Math.exp(-x);
		const maxValNumeric = k * Math.exp(c - 1);
		const maxLabelSvg =
			c === 1 ? `${k}` : c === 2 ? `${k === 1 ? '' : k}e` : `${k === 1 ? '' : k}e^2`;
		const maxKatex =
			c === 1 ? `${k}` : c === 2 ? `${k === 1 ? '' : k}e` : `${k === 1 ? '' : k}e^2`;
		const maxTypst =
			c === 1 ? `${k}` : c === 2 ? `${k === 1 ? '' : k} e` : `${k === 1 ? '' : k} e^2`;

		const yInflectTypst =
			c === 1
				? `${2 * k} e^(-1)`
				: c === 2
					? `${2 * k}`
					: `${2 * k} e`;

		const fExprKatex = `${k === 1 ? '' : k}(x + ${c})e^{-x}`;
		const fExprTypst = `${k === 1 ? '' : `${k} `}(x + ${c}) e^(-x)`;
		const fPrimeInsideKatex = fmtLinearKatex(-1, 1 - c, 'x');
		const fPrimeInsideTypst = fmtLinearTypst(-1, 1 - c, 'x');
		const fSecondInsideTypst = fmtLinearTypst(1, c - 2, 'x');
		const tangent0Typst = fmtLinearTypst(k * (1 - c), k * c, 'x');

		const area1Numeric = roundTo(uaCm2 * (iLimUa - k * (1 + c + 1) * Math.exp(-1)), 2);

		// Generate Variation Table SVG + Curve Plot SVG with shadedIntegral
		const varTableSvg = svgVariationTable({
			xValues: ['-∞', `${xMaxPt}`, '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: '+' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '-' }
			],
			variations: [
				{ value: '-∞', position: 'bottom' },
				{ value: maxLabelSvg, position: 'top' },
				{ value: '0', position: 'bottom' }
			],
			fnName: 'f(x)',
			derivName: "f'(x)"
		});
		const varTableUrl = saveSvgAsset(
			`3as_shared_t3_bac_vartable_${difficulty}_s${seed}`,
			varTableSvg
		);

		const lambdaPlot = 3;
		const curveSvg = svgFunctionCurvePlot({
			xMin: -c - 1.2,
			xMax: 4.5,
			yMin: Math.max(-4, -k - 1.5),
			yMax: Math.min(18, Math.ceil(maxValNumeric + 1.5)),
			fn: fFn,
			curveLabel: '(C_f)',
			shadedIntegral: { a: 0, b: lambdaPlot, color: 'rgba(37,99,235,0.22)' },
			tangents: [{ x: xMaxPt, y: maxValNumeric, slope: 0, halfSpan: 0.9, color: '#059669' }],
			points: [
				{ x: -c, y: 0, label: `A(-${c}, 0)`, color: '#dc2626' },
				{ x: xMaxPt, y: maxValNumeric, label: `M(${xMaxPt}, ${maxLabelSvg})`, color: '#15803d' }
			]
		});
		const curveUrl = saveSvgAsset(`3as_shared_t3_bac_curve_${difficulty}_s${seed}`, curveSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${iLimUa}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `في المسألة الشاملة، نعتبر الدالة $f(x) = ${fExprKatex}$ المعرفة على $\\mathbb{R}$، ومن أجل كل $\\lambda > 0$ نضع $I(\\lambda) = \\int_0^{\\lambda} f(x)\\,dx$.\nاحسب النهاية $\\lim_{\\lambda \\to +\\infty} I(\\lambda)$:`,
				questionTextAr: `احسب النهاية $\\lim_{\\lambda \\to +\\infty} \\int_0^{\\lambda} ${fExprKatex}\\,dx$:`,
				imageUrl: curveUrl,
				imageCaption: 'المنحنى البياني (C_f) والحيز المستوي المظلل على [0 ; λ]',
				questionData: {
					answer: iLimUa,
					displayTemplate: 'lim I(λ) = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `بالمكاملة بالتجزئة نجد $I(\\lambda) = [-${k === 1 ? '' : k}(x + ${lambdaShift})e^{-x}]_0^{\\lambda} = ${iLimUa} - ${k === 1 ? '' : k}(\\lambda + ${lambdaShift})e^{-\\lambda}$.\nوبالتزايد المقارن $\\lim_{\\lambda \\to +\\infty} \\lambda e^{-\\lambda} = 0$ و $\\lim_{\\lambda \\to +\\infty} e^{-\\lambda} = 0$، إذن $\\lim_{\\lambda \\to +\\infty} I(\\lambda) = ${iLimUa}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${areaLimCm2}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `المستوي منسوب إلى معلم متعامد ومتجانس $(O; \\vec{i}, \\vec{j})$ حيث $\\|\\vec{i}\\| = \\|\\vec{j}\\| = ${uCm}\\text{ cm}$. نعتبر الدالة $f(x) = ${fExprKatex}$، ونرمز بـ $\\mathcal{A}(\\lambda)$ إلى مساحة الحيز المستوي المحدد بـ $(C_f)$ ومحور الفواصل والمستقيمين $x = 0$ و $x = \\lambda$ ($\\lambda > 0$) مقدرة بـ $\\text{cm}^2$.\nاحسب القيمة المضبوطة للنهاية $\\lim_{\\lambda \\to +\\infty} \\mathcal{A}(\\lambda)$ بـ $\\text{cm}^2$:`,
				questionTextAr: `ما قيمة $\\lim_{\\lambda \\to +\\infty} \\mathcal{A}(\\lambda)$ بـ $\\text{cm}^2$ (علماً أن وحدة الطول $${uCm}\\text{ cm}$):`,
				imageUrl: curveUrl,
				imageCaption: 'الحيز المستوي (D_λ) تحت المنحنى (C_f)',
				questionData: {
					answer: areaLimCm2,
					displayTemplate: 'lim A(λ) = ? cm²',
					variables: [],
					tolerance: 0
				},
				explanation: `لدينا $\\mathcal{A}(\\lambda) = ${uaCm2} \\int_0^{\\lambda} f(x)\\,dx = ${areaLimCm2} - ${areaCoeffLambda}(\\lambda + ${lambdaShift})e^{-\\lambda}\\text{ cm}^2$.\nعندما يؤول $\\lambda$ إلى $+\\infty$ تؤول $(\\lambda + ${lambdaShift})e^{-\\lambda}$ إلى $0$ بالتزايد المقارن، ومنه $\\lim_{\\lambda \\to +\\infty} \\mathcal{A}(\\lambda) = ${areaLimCm2}\\text{ cm}^2$.`
			};
		} else {
			const correctAns = `$\\mathcal{A}(\\lambda) = ${areaLimCm2} - ${areaCoeffLambda}(\\lambda + ${lambdaShift})e^{-\\lambda}\\text{ cm}^2$ و $\\lim_{\\lambda \\to +\\infty} \\mathcal{A}(\\lambda) = ${areaLimCm2}\\text{ cm}^2$`;
			const wrongNoScale = `$\\mathcal{A}(\\lambda) = ${iLimUa} - ${k === 1 ? '' : k}(\\lambda + ${lambdaShift})e^{-\\lambda}\\text{ cm}^2$ و $\\lim_{\\lambda \\to +\\infty} \\mathcal{A}(\\lambda) = ${iLimUa}\\text{ cm}^2$`;
			const wrongLinScale = `$\\mathcal{A}(\\lambda) = ${uCm * iLimUa} - ${uCm * k}(\\lambda + ${lambdaShift})e^{-\\lambda}\\text{ cm}^2$ و $\\lim_{\\lambda \\to +\\infty} \\mathcal{A}(\\lambda) = ${uCm * iLimUa}\\text{ cm}^2$`;
			const wrongIbpSign = `$\\mathcal{A}(\\lambda) = ${uaCm2 * k * Math.max(1, c - 1)} - ${areaCoeffLambda}(\\lambda + ${c})e^{-\\lambda}\\text{ cm}^2$ و $\\lim_{\\lambda \\to +\\infty} \\mathcal{A}(\\lambda) = +\\infty$`;

			const mcq = buildUniqueMcqOptions(
				correctAns,
				[
					{
						text: wrongNoScale,
						diagnosticFeedback: `انتبه لوحدة المساحة: $1\\text{ u.a} = \\|\\vec{i}\\| \\times \\|\\vec{j}\\| = ${uCm} \\times ${uCm} = ${uaCm2}\\text{ cm}^2$!`
					},
					{
						text: wrongLinScale,
						diagnosticFeedback: `ضربت في وحدة الطول $${uCm}$ بدلاً من وحدة المساحة $${uCm}^2 = ${uaCm2}\\text{ cm}^2$!`
					},
					{
						text: wrongIbpSign,
						diagnosticFeedback: `راجع المكاملة بالتجزئة ونهاية التزايد المقارن $\\lim_{\\lambda \\to +\\infty} \\lambda e^{-\\lambda} = 0$ (النهاية منتهية وليست $+\\infty$).`
					}
				],
				rng
			);
			finalAnswer = `${areaLimCm2} cm^2`;
			quizQuestion = {
				type: 'mcq',
				questionText: `في معلم متعامد ومتجانس $(O; \\vec{i}, \\vec{j})$ وحدة الطول فيه $${uCm}\\text{ cm}$، نعتبر $f(x) = ${fExprKatex}$. ما هي عبارة مساحة الحيز $\\mathcal{A}(\\lambda)$ المحدد بـ $(C_f)$ ومحور الفواصل والمستقيمين $x = 0$ و $x = \\lambda$ ($\\lambda > 0$) بـ $\\text{cm}^2$ وما نهايتها لما $\\lambda \\to +\\infty$؟`,
				questionTextAr: `عيّن عبارة $\\mathcal{A}(\\lambda)$ بـ $\\text{cm}^2$ ونهايتها لما $\\lambda \\to +\\infty$:`,
				imageUrl: curveUrl,
				imageCaption: 'المنحنى (C_f) والحيز المستوي المحدد على [0 ; λ]',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `دالة أصلية لـ $f$ هي $F(x) = -${k === 1 ? '' : k}(x + ${lambdaShift})e^{-x}$، ومنه $I(\\lambda) = ${iLimUa} - ${k === 1 ? '' : k}(\\lambda + ${lambdaShift})e^{-\\lambda}\\text{ u.a}$.\nبالضرب في $${uaCm2}\\text{ cm}^2$ وحساب النهاية بالتزايد المقارن نحصل على $\\lim_{\\lambda \\to +\\infty} \\mathcal{A}(\\lambda) = ${areaLimCm2}\\text{ cm}^2$.`
			};
		}

		return {
			templateId: this.id,
			seed,
			grade: '3as_se',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				customTitle: 'التمرين الرابع — المسألة الشاملة',
				points: this.defaultPoints,
				instruction: `المستوي منسوب إلى معلم متعامد ومتجانس $(O ; arrow(i), arrow(j))$ حيث $norm(arrow(i)) = norm(arrow(j)) = ${uCm} upright("cm")$.\nنعتبر الدالة العددية $f$ المعرفة على $bb(R)$ بـ: $f(x) = ${fExprTypst}$، وليكن $(C_f)$ تمثيلها البياني.`,
				content: [
					{
						type: 'columns',
						widths: ['1.45fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `*الجزء الأول: النهايات، اتجاه التغير ومبرهنة القيم المتوسطة (2.25 نقطة)*\n\n1) احسب $lim_(x arrow.r -oo) f(x)$، ثم بيّن بالتزايد المقارن أن $lim_(x arrow.r +oo) f(x) = 0$ وفسّر النتيجة بيانياً.\n\n2) بيّن أنه من أجل كل $x in bb(R)$: $f'(x) = ${k === 1 ? '' : `${k} `}(${fPrimeInsideTypst}) e^(-x)$، ثم ادرس اتجاه تغير الدالة $f$ وشكّل جدول تغيراتها.\n\n3) بيّن أن المعادلة $f(x) = -${k}$ تقبل في $bb(R)$ حلاً وحيداً $alpha$، وتحقّق أن $-${c + 1} < alpha < -${c}$.`,
								answer: `الجزء الأول:\n1) النهايات:\n- عند $-oo$: $lim_(x arrow.r -oo) (x + ${c}) = -oo$ و $lim_(x arrow.r -oo) e^(-x) = +oo$، إذن $lim_(x arrow.r -oo) f(x) = -oo$.\n- عند $+oo$: $f(x) = ${k === 1 ? '' : `${k} `}(x e^(-x) + ${c} e^(-x))$، وبالتزايد المقارن $lim_(x arrow.r +oo) x e^(-x) = 0$ و $lim_(x arrow.r +oo) e^(-x) = 0$، إذن $lim_(x arrow.r +oo) f(x) = 0$. التفسير البياني: حامل محور الفواصل $y = 0$ مستقيم مقارب أفقي لـ $(C_f)$ بجوار $+oo$.\n\n2) المشتقة واتجاه التغير:\n- $f'(x) = ${k} e^(-x) - ${k}(x + ${c}) e^(-x) = ${k === 1 ? '' : `${k} `}(${fPrimeInsideTypst}) e^(-x)$.\n- إشارة $f'(x)$ من إشارة $(${fPrimeInsideTypst})$: موجبة على $]-oo ; ${xMaxPt}[$ وسالبة على $]${xMaxPt} ; +oo[$، فالدالة متزايدة تماماً على $]-oo ; ${xMaxPt}]$ ومتناقصة تماماً على $[${xMaxPt} ; +oo[$، وقيمتها الحدية العظمى $f(${xMaxPt}) = ${maxTypst}$.\n\n3) مبرهنة القيم المتوسطة:\n- على $[${xMaxPt} ; +oo[$ لدينا $f(x) > 0 > -${k}$. وعلى $]-oo ; ${xMaxPt}]$ الدالة مستمرة ومتزايدة تماماً من $-oo$ إلى $${maxTypst} > -${k}$، فالمعادلة $f(x) = -${k}$ تقبل حلاً وحيداً $alpha$ في $bb(R)$.\n- بما أن $f(-${c}) = 0 > -${k}$ و $f(-${c + 1}) = -${k} e^${c + 1} < -${k}$، فإن $-${c + 1} < alpha < -${c}$.`,
								mark: '2.25'
							},
							{
								type: 'image',
								src: varTableUrl,
								caption: 'جدول تغيرات الدالة f على R'
							}
						]
					},
					{
						type: 'columns',
						widths: ['1.45fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `*الجزء الثاني: المماس، نقطة الانعطاف والمناقشة البيانية (2.25 نقطة)*\n\n1) اكتب معادلة المماس $(T)$ للمنحنى $(C_f)$ عند النقطة ذات الفاصلة $x_0 = 0$.\n\n2) احسب $f''(x)$ وادرس إشارتها على $bb(R)$، ثم استنتج إحداثيي نقطة الانعطاف $W$ للمنحنى $(C_f)$.\n\n3) أرسم $(C_f)$، ثم ناقش بيانياً وحسب قيم الوسيط الحقيقي $m$ عدد حلول المعادلة $f(x) = m$.`,
								answer: `الجزء الثاني:\n1) معادلة المماس عند $x_0 = 0$: لدينا $f(0) = ${k * c}$ و $f'(0) = ${k * (1 - c)}$، ومنه $(T): y = ${tangent0Typst}$.\n\n2) المشتقة الثانية ونقطة الانعطاف:\n- $f''(x) = -${k === 1 ? '' : `${k} `}e^(-x) - ${k === 1 ? '' : `${k} `}(${fPrimeInsideTypst}) e^(-x) = ${k === 1 ? '' : `${k} `}(${fSecondInsideTypst}) e^(-x)$.\n- تنعدم $f''(x)$ وتغيّر إشارتها عند $x_W = ${xInflect}$، ومنه نقطة الانعطاف هي $W(${xInflect}, ${yInflectTypst})$.\n\n3) المناقشة البيانية الأفقية لعدد حلول $f(x) = m$:\n- إذا كان $m <= 0$: حل وحيد.\n- إذا كان $0 < m < ${maxTypst}$: حلان متمايزان.\n- إذا كان $m = ${maxTypst}$: حل مضاعف وحيد ($x = ${xMaxPt}$).\n- إذا كان $m > ${maxTypst}$: لا توجد حلول في $bb(R)$.`,
								mark: '2.25'
							},
							{
								type: 'image',
								src: curveUrl,
								caption: 'المنحنى (C_f) والحيز المستوي المظلل على [0 ; λ]'
							}
						]
					},
					{
						type: 'text',
						content: `*الجزء الثالث: التكامل المحدد، مساحة الحيز المستوي $cal(A)(lambda)$ ونهايتها (2.5 نقطة)*\n\nليكن $lambda$ عدداً حقيقياً موجباً تماماً ($lambda > 0$). نرمز بـ $(cal(D)_lambda)$ إلى الحيز المستوي المحدد بالمنحنى $(C_f)$ وحامل محور الفواصل والمستقيمين ذوي المعادلتين $x = 0$ و $x = lambda$.\n\n1) باستعمال المكاملة بالتجزئة، بيّن أنه من أجل كل $lambda > 0$:\n$I(lambda) = integral_0^lambda f(x) dif x = ${iLimUa} - ${k === 1 ? '' : `${k} `}(lambda + ${lambdaShift}) e^(-lambda)$.\n\n2) برّر أن $f(x) > 0$ على المجال $[0 ; lambda]$، ثم عبّر بدلالة $lambda$ عن المساحة $cal(A)(lambda)$ للحيز $(cal(D)_lambda)$ مقدرة بالسنتيمتر المربع $(upright("cm")^2)$، واحسب مدور $cal(A)(1)$ إلى $10^(-2)$.\n\n3) احسب النهاية $lim_(lambda arrow.r +oo) cal(A)(lambda)$ وفسّر النتيجة هندسياً.`,
						answer: `الجزء الثالث:\n1) المكاملة بالتجزئة: نضع $u(x) = ${k === 1 ? '' : `${k} `}(x + ${c})$ ($u'(x) = ${k}$) و $v'(x) = e^(-x)$ ($v(x) = -e^(-x)$):\n$I(lambda) = [-${k === 1 ? '' : `${k} `}(x + ${c}) e^(-x)]_0^lambda + integral_0^lambda ${k} e^(-x) dif x = [-${k === 1 ? '' : `${k} `}(x + ${lambdaShift}) e^(-x)]_0^lambda = ${iLimUa} - ${k === 1 ? '' : `${k} `}(lambda + ${lambdaShift}) e^(-lambda)$.\n\n2) عبارة المساحة بـ $upright("cm")^2$:\n- من أجل كل $x in [0 ; lambda]$ لدينا $x + ${c} >= ${c} > 0$ و $e^(-x) > 0$، إذن $f(x) > 0$.\n- بما أن $1 upright("u.a") = ${uCm} times ${uCm} = ${uaCm2} upright("cm")^2$:\n  $cal(A)(lambda) = ${uaCm2} I(lambda) = ${areaLimCm2} - ${areaCoeffLambda}(lambda + ${lambdaShift}) e^(-lambda) upright("cm")^2$.\n- من أجل $lambda = 1$: $cal(A)(1) = ${areaLimCm2} - ${areaCoeffLambda * (1 + lambdaShift)} e^(-1) approx ${area1Numeric} upright("cm")^2$.\n\n3) حساب النهاية والتفسير الهندسي:\n- لدينا $cal(A)(lambda) = ${areaLimCm2} - ${areaCoeffLambda} lambda e^(-lambda) - ${areaCoeffLambda * lambdaShift} e^(-lambda)$.\n- بالتزايد المقارن $lim_(lambda arrow.r +oo) lambda e^(-lambda) = 0$ و $lim_(lambda arrow.r +oo) e^(-lambda) = 0$، إذن $lim_(lambda arrow.r +oo) cal(A)(lambda) = ${areaLimCm2} upright("cm")^2$.\n- التفسير الهندسي: عندما يمتد الحيز المستوي غير المحدود تحت $(C_f)$ على $[0 ; +oo[$ فإن مساحته تقترب من القيمة المنتهية $${areaLimCm2} upright("cm")^2$.`,
						mark: '2.5'
					}
				]
			},
			hints: [
				`عند $+\\infty$ انشر $f(x) = ${k === 1 ? '' : k}(xe^{-x} + ${c}e^{-x})$ وطبق نهاية التزايد المقارن الشهيرة $\\lim_{x \\to +\\infty} xe^{-x} = 0$.`,
				`في الجزء الثالث، استعمل المكاملة بالتجزئة بوضع $u(x) = ${k === 1 ? '' : k}(x + ${c})$ و $v'(x) = e^{-x}$، ثم اضرب في وحدة المساحة $${uCm}^2 = ${uaCm2}\\text{ cm}^2$.`,
				`لحساب $\\lim_{\\lambda \\to +\\infty} \\mathcal{A}(\\lambda)$، استثمر $\\lim_{\\lambda \\to +\\infty} \\lambda e^{-\\lambda} = 0$.`
			],
			solutionStepsAr: [
				`النهايات واتجاه التغير: $\\lim_{x \\to -\\infty} f(x) = -\\infty$، $\\lim_{x \\to +\\infty} f(x) = 0$، و $f'(x) = ${k === 1 ? '' : k}(${fPrimeInsideKatex})e^{-x}$ تنعدم عند $x_0 = ${xMaxPt}$ بقيمة حدية عظمى $${maxKatex}$.`,
				`مبرهنة القيم المتوسطة ونقطة الانعطاف: $f(-${c + 1}) < -${k} < f(-${c}) \\implies -${c + 1} < \\alpha < -${c}$، ونقطة الانعطاف عند $x_W = ${xInflect}$.`,
				`المكاملة بالتجزئة والمساحة: $I(\\lambda) = ${iLimUa} - ${k === 1 ? '' : k}(\\lambda + ${lambdaShift})e^{-\\lambda}$، ومنه $\\mathcal{A}(\\lambda) = ${areaLimCm2} - ${areaCoeffLambda}(\\lambda + ${lambdaShift})e^{-\\lambda}\\text{ cm}^2$.`,
				`النهاية الهندسية: بالتزايد المقارن $\\lim_{\\lambda \\to +\\infty} \\mathcal{A}(\\lambda) = ${areaLimCm2}\\text{ cm}^2$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 3 Shared Parameterized Templates for 3AS
// ═══════════════════════════════════════════════════════════════════════════════

export const SHARED_TEMPLATES_3AS_T3: ParameterizedTemplate[] = [
	tplDefiniteIntegralMean,
	tplIntegrationPartsAreaVolume,
	tplSpaceVectorsSphere,
	tplSpacePlanesDistance,
	tplSpaceParametricIntersections,
	tplBacProblemSynthesis
];
