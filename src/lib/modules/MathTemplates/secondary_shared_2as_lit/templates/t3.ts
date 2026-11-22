import type { ExerciseBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate
} from '../../types';
import { buildUniqueMcqOptions, SeededRng } from '../../rng';
import { saveSvgAsset } from '../../svg-helpers';
import { svgFunctionCurvePlot, svgVariationTable } from '../../svg-secondary';

function linearKatex(a: number, b: number, v = 'x'): string {
	let head = '';
	if (a === 1) head = v;
	else if (a === -1) head = `-${v}`;
	else if (a !== 0) head = `${a}${v}`;
	if (!head) return `${b}`;
	if (b === 0) return head;
	return b > 0 ? `${head} + ${b}` : `${head} - ${Math.abs(b)}`;
}

function linearTypst(a: number, b: number, v = 'x'): string {
	return linearKatex(a, b, v);
}

function poly2Str(a: number, b: number, c: number, v = 'x'): string {
	const parts: string[] = [];
	if (a !== 0) {
		if (a === 1) parts.push(`${v}^2`);
		else if (a === -1) parts.push(`-${v}^2`);
		else parts.push(`${a}${v}^2`);
	}
	if (b !== 0) {
		const ab = Math.abs(b);
		const t = ab === 1 ? v : `${ab}${v}`;
		if (parts.length === 0) parts.push(b < 0 ? `-${t}` : t);
		else parts.push(b < 0 ? `- ${t}` : `+ ${t}`);
	}
	if (c !== 0) {
		const ac = Math.abs(c);
		if (parts.length === 0) parts.push(`${c}`);
		else parts.push(c < 0 ? `- ${ac}` : `+ ${ac}`);
	}
	return parts.length === 0 ? '0' : parts.join(' ');
}

function poly3Str(a: number, b: number, c: number, d: number, v = 'x'): string {
	const parts: string[] = [];
	if (a !== 0) {
		if (a === 1) parts.push(`${v}^3`);
		else if (a === -1) parts.push(`-${v}^3`);
		else parts.push(`${a}${v}^3`);
	}
	if (b !== 0) {
		const ab = Math.abs(b);
		const t = ab === 1 ? `${v}^2` : `${ab}${v}^2`;
		if (parts.length === 0) parts.push(b < 0 ? `-${t}` : t);
		else parts.push(b < 0 ? `- ${t}` : `+ ${t}`);
	}
	if (c !== 0) {
		const ac = Math.abs(c);
		const t = ac === 1 ? v : `${ac}${v}`;
		if (parts.length === 0) parts.push(c < 0 ? `-${t}` : t);
		else parts.push(c < 0 ? `- ${t}` : `+ ${t}`);
	}
	if (d !== 0) {
		const ad = Math.abs(d);
		if (parts.length === 0) parts.push(`${d}`);
		else parts.push(d < 0 ? `- ${ad}` : `+ ${ad}`);
	}
	return parts.length === 0 ? '0' : parts.join(' ');
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Derivative Number, Differentiability & Tangent Line Equation
// ═══════════════════════════════════════════════════════════════════════════════

const tplDerivativeTangent: ParameterizedTemplate = {
	id: 'tpl_2as_shared_lit_t3_derivative_tangent',
	grade: '2as_lp',
	trimesterId: 't3',
	domain: 'analysis',
	titleAr: 'العدد المشتق، القابلية للاشتقاق ومعادلة المماس عند نقطة',
	curriculumLessonId: 'lesson_2as_shared_lit_t3_derivative_number_tangent',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// f(x) = a*x^2 + b*x + c with integer vertex x_s = -b/(2a)
		const a = difficulty === 'hard' ? rng.pick([2, -1]) : 1;
		const xs = rng.pick([1, 2, -1]);
		const b = -2 * a * xs;
		const c = rng.pick([1, 2, 3, -1]);
		const ys = a * xs * xs + b * xs + c;

		// Point x0 != xs so tangent is oblique
		const x0 = xs + rng.pick([1, 2]);
		const fx0 = a * x0 * x0 + b * x0 + c;
		const fPrimeX0 = 2 * a * x0 + b;
		const tangentC = fx0 - fPrimeX0 * x0;

		const fExpr = poly2Str(a, b, c);
		const tangentExpr = linearKatex(fPrimeX0, tangentC);

		const yVals = [ys, fx0, fx0 + 2, ys - 2];
		const curveSvg = svgFunctionCurvePlot({
			xMin: Math.min(xs, x0) - 2,
			xMax: Math.max(xs, x0) + 2,
			yMin: Math.min(...yVals) - 2,
			yMax: Math.max(...yVals) + 3,
			fn: (x) => a * x * x + b * x + c,
			curveLabel: 'Cf',
			tangents: [
				{ x: x0, y: fx0, slope: fPrimeX0, halfSpan: 1.1, color: '#dc2626' },
				{ x: xs, y: ys, slope: 0, halfSpan: 0.9, color: '#15803d' }
			],
			points: [
				{ x: xs, y: ys, label: `S(${xs}; ${ys})`, color: '#15803d' },
				{ x: x0, y: fx0, label: `A(${x0}; ${fx0})`, color: '#dc2626' }
			]
		});
		const curveUrl = saveSvgAsset(`2as_shared_lit_t3_tangent_${difficulty}_s${seed}`, curveSvg);

		const askIntercept = difficulty === 'hard';
		const quizAns = askIntercept ? tangentC : fPrimeX0;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر الدالة العددية $f$ المعرفة على $bb(R)$ بالعبارة: $f(x) = ${fExpr}$.\nوليكن $(C_f)$ تمثيلها البياني في معلم متعامد ومتجانس كما يوضحه الشكل المرفق.`,
			content: [
				{
					type: 'text',
					content: `1) احسب $f(${x0})$، ثم من أجل كل عدد حقيقي $h != 0$ احسب وبسّط نسبة التزايد $tau(h) = frac(f(${x0} + h) - f(${x0}), h)$.`,
					answer: `1) $f(${x0}) = ${fx0}$.\n$f(${x0} + h) = ${a}(${x0} + h)^2 ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}(${x0} + h) ${c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`} = ${fx0} + (${fPrimeX0})h + (${a})h^2$.\nومنه نسبة التزايد: $tau(h) = frac((${fPrimeX0})h + (${a})h^2, h) = ${fPrimeX0} ${a >= 0 ? `+ ${a}h` : `- ${Math.abs(a)}h`}$.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `2) استنتج أن $f$ قابلة للاشتقاق عند $x_0 = ${x0}$ وحدد العدد المشتق $f'(${x0})$.`,
					answer: `2) لما يؤول $h$ إلى $0$ فإن $lim_(h -> 0) tau(h) = ${fPrimeX0} in bb(R)$.\nإذن $f$ قابلة للاشتقاق عند $${x0}$ والعدد المشتق هو $f'(${x0}) = ${fPrimeX0}$.`,
					mark: '0.75'
				},
				{
					type: 'text',
					content: `3) اكتب معادلة المماس $(T)$ للمنحنى $(C_f)$ عند النقطة $A(${x0}, ${fx0})$.`,
					answer: `3) معادلة المماس: $y = f'(${x0})(x - ${x0}) + f(${x0}) = ${fPrimeX0}(x - ${x0}) + (${fx0}) arrow.r.double y = ${tangentExpr}$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `4) عند أي فاصلة $x_S$ يقبل المنحنى $(C_f)$ مماساً أفقياً؟ وما هي معادلته؟`,
					answer: `4) يقبل مماساً أفقياً لما تنعدم المشتقة $f'(x) = ${linearTypst(2 * a, b)} = 0 arrow.r.double x_S = ${xs}$.\nوبما أن $f(${xs}) = ${ys}$، فإن معادلة المماس الأفقي هي $y = ${ys}$.`,
					mark: '0.75'
				},
				{
					type: 'image',
					src: curveUrl,
					caption: 'منحنى الدالة والمماسان عند A و S'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_lp',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: askIntercept
					? `لتكن الدالة $f(x) = ${fExpr}$. علماً أن معادلة المماس $(T)$ للمنحنى $(C_f)$ عند الفاصلة $x_0 = ${x0}$ تُكتب على الشكل $y = ${fPrimeX0}x + p$، احسب قيمة العدد $p$:`
					: `نعتبر الدالة $f(x) = ${fExpr}$. احسب العدد المشتق $f'(${x0})$ (معامل توجيه المماس عند النقطة ذات الفاصلة $x_0 = ${x0}$):`,
				questionTextAr: askIntercept ? `احسب قيمة $p$:` : `احسب العدد المشتق $f'(${x0})$:`,
				imageUrl: curveUrl,
				imageCaption: 'التمثيل البياني للدالة ومماسها',
				questionData: {
					answer: quizAns,
					displayTemplate: askIntercept ? `p = ?` : `f'(${x0}) = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: askIntercept
					? `بما أن $f(${x0}) = ${fx0}$ و $f'(${x0}) = ${fPrimeX0}$، فإن $y = ${fPrimeX0}(x - ${x0}) + ${fx0} = ${tangentExpr}$، ومنه $p = ${tangentC}$.`
					: `نسبة التزايد عند $${x0}$ هي $${fPrimeX0} ${a >= 0 ? `+ ${a}h` : `- ${Math.abs(a)}h`}$، وبأخذ النهاية لما $h \\to 0$ نجد $f'(${x0}) = ${fPrimeX0}$.`
			},
			sujetExercise,
			hints: [
				'نسبة التزايد هي $\\frac{f(x_0+h) - f(x_0)}{h}$؛ انشر البسط واختزل $h$ قبل تعويض $h = 0$.',
				'معادلة المماس عند $x_0$ هي $y = f\'(x_0)(x - x_0) + f(x_0)$.',
				'يكون المماس أفقياً عندما ينعدم ميله، أي $f\'(x) = 0$.'
			],
			solutionStepsAr: [
				`تبسيط نسبة التزايد $\\tau(h) = ${fPrimeX0} ${a >= 0 ? `+ ${a}h` : `- ${Math.abs(a)}h`}$.`,
				`أخذ النهاية عند $h \\to 0$ واستنتاج $f'(${x0}) = ${fPrimeX0}$.`,
				`كتابة معادلة المماس $y = ${tangentExpr}$.`,
				`إيجاد فاصلة المماس الأفقي $x_S = ${xs}$ ومعادلته $y = ${ys}$.`
			],
			finalAnswer: `${quizAns}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Derivatives of Polynomials & Simple Homographic Functions
// ═══════════════════════════════════════════════════════════════════════════════

const tplDerivativePolyHomographic: ParameterizedTemplate = {
	id: 'tpl_2as_shared_lit_t3_derivative_poly_homographic',
	grade: '2as_lp',
	trimesterId: 't3',
	domain: 'analysis',
	titleAr: 'الدوال المشتقة لكثيرات الحدود والدوال التناظرية البسيطة',
	curriculumLessonId: 'lesson_2as_shared_lit_t3_derivative_rules_poly_homographic',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Part 1: Cubic polynomial P(x) = a3*x^3 + b3*x^2 + c3*x + d3
		const a3 = rng.pick([1, 2, 3]);
		const b3 = rng.pick([-3, -2, 2, 4]);
		const c3 = rng.pick([-5, -2, 3, 5]);
		const d3 = rng.pick([1, -4, 7]);
		const pStr = poly3Str(a3, b3, c3, d3);
		const pPrimeStr = poly2Str(3 * a3, 2 * b3, c3);
		const pPrimeAt1 = 3 * a3 + 2 * b3 + c3;

		// Part 2: Homographic g(x) = (alpha*x + beta) / (x - c) = alpha + k / (x - c)
		const c = rng.pick([1, 2, -1]);
		const alpha = rng.pick([2, 3]);
		const k = difficulty === 'easy' ? rng.pick([2, -2]) : rng.pick([-3, -4, 3, 4]);
		const beta = k - alpha * c;
		// g'(x) = (alpha*(x - c) - (alpha*x + beta)) / (x - c)^2 = -k / (x - c)^2
		const derivNum = -k;

		const numStr = linearKatex(alpha, beta);
		const denStr = linearKatex(1, -c);

		// Evaluate at x0 = c + 1 so (x0 - c)^2 = 1 -> clean integer!
		const x0 = c + 1;
		const gx0 = alpha + k;
		const gPrimeX0 = derivNum;
		const tanB = gx0 - gPrimeX0 * x0;

		const curveSvg = svgFunctionCurvePlot({
			xMin: c - 4,
			xMax: c + 4,
			yMin: alpha - 5,
			yMax: alpha + 5,
			fn: (x) => (Math.abs(x - c) > 0.08 ? (alpha * x + beta) / (x - c) : NaN),
			curveLabel: 'Cg',
			asymptotes: [
				{ kind: 'vertical', value: c, label: `x = ${c}`, color: '#dc2626' },
				{ kind: 'horizontal', value: alpha, label: `y = ${alpha}`, color: '#dc2626' }
			],
			tangents: [{ x: x0, y: gx0, slope: gPrimeX0, halfSpan: 0.7, color: '#059669' }],
			points: [{ x: x0, y: gx0, label: `A(${x0}; ${gx0})`, color: '#059669' }]
		});
		const curveUrl = saveSvgAsset(`2as_shared_lit_t3_deriv_homog_${difficulty}_s${seed}`, curveSvg);

		const correctMcq = `$g'(x) = \\frac{${derivNum}}{(${denStr})^2}$`;
		const mcq = buildUniqueMcqOptions(
			correctMcq,
			[
				{
					text: `$g'(x) = \\frac{${-derivNum}}{(${denStr})^2}$`,
					diagnosticFeedback: 'عكست إشارة البسط؛ تذكّر أن المشتقة هي $\\frac{u\'v - u v\'}{v^2}$ وليس $u v\' - u\' v$.'
				},
				{
					text: `$g'(x) = ${alpha}$`,
					diagnosticFeedback: 'لا تقسم مشتقة البسط على مشتقة المقام مباشرة؛ استعمل قاعدة مشتقة حاصل القسمة.'
				},
				{
					text: `$g'(x) = \\frac{${alpha * c + beta}}{(${denStr})^2}$`,
					diagnosticFeedback: 'تحقق من توزيع الإشارة السالبة على الحد الثابت في البسط.'
				}
			],
			rng
		);

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `أجب عن السؤالين المستقلين التاليين حول الدوال المشتقة:`,
			content: [
				{
					type: 'text',
					content: `1) لتكن الدالة كثير الحدود $P$ المعرفة على $bb(R)$ بـ: $P(x) = ${pStr}$.\nأ) احسب الدالة المشتقة $P'(x)$.\nب) استنتج قيمة العدد المشتق $P'(1)$.`,
					answer: `1) أ) بالاشتقاق حداً بحدّ:\n$P'(x) = ${pPrimeStr}$.\nب) بالتعويض عند $x = 1$: $P'(1) = ${3 * a3}(1)^2 ${2 * b3 >= 0 ? `+ ${2 * b3}` : `- ${Math.abs(2 * b3)}`}(1) ${c3 >= 0 ? `+ ${c3}` : `- ${Math.abs(c3)}`} = ${pPrimeAt1}$.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `2) لتكن الدالة التناظرية $g$ المعرفة على $bb(R) backslash {${c}}$ بالعبارة: $g(x) = frac(${numStr}, ${denStr})$.\nأ) احسب الدالة المشتقة $g'(x)$ وحدد إشارتها على كل من المجالين $]-oo, ${c}[$ و $]${c}, +oo[$.\nب) اكتب معادلة المماس $(T)$ للمنحنى $(C_g)$ عند النقطة ذات الفاصلة $x_0 = ${x0}$.`,
					answer: `2) أ) بقاعدة حاصل القسمة:\n$g'(x) = frac(${alpha}(${denStr}) - (${numStr})(1), (${denStr})^2) = frac(${derivNum}, (${denStr})^2)$.\nبما أن المقام مربع موجب تماماً فإن إشارة $g'(x)$ من إشارة البسط $${derivNum}$ ($g'(x) ${derivNum > 0 ? '> 0$' : '< 0$'} على كل مجال).\nب) عند $x_0 = ${x0}$: $g(${x0}) = ${gx0}$ و $g'(${x0}) = ${gPrimeX0}$.\nمعادلة المماس: $y = ${gPrimeX0}(x - ${x0}) + (${gx0}) = ${linearTypst(gPrimeX0, tanB)}$.`,
					mark: '2.5'
				},
				{
					type: 'image',
					src: curveUrl,
					caption: 'منحنى الدالة التناظرية ومماسها عند النقطة A'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_lp',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `ما هي عبارة الدالة المشتقة $g'(x)$ للدالة التناظرية $g(x) = \\frac{${numStr}}{${denStr}}$ على $\\mathbb{R} \\setminus \\{${c}\\}$؟`,
				questionTextAr: `عيّن الدالة المشتقة $g'(x)$:`,
				imageUrl: curveUrl,
				imageCaption: 'التمثيل البياني للدالة التناظرية (C_g)',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices
				},
				explanation: `نطبق $\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}$: $g'(x) = \\frac{${alpha}(${denStr}) - (${numStr})}{(${denStr})^2} = \\frac{${derivNum}}{(${denStr})^2}$.`
			},
			sujetExercise,
			hints: [
				'مشتقة كثير حدود تُحسب باشتقاق كل حدّ باستعمال $(x^n)\' = nx^{n-1}$.',
				'مشتقة حاصل قسمة $\\frac{u}{v}$ هي $\\frac{u\'v - u v\'}{v^2}$ ولا ننسى وضع الأقواس بعد إشارة الناقص.',
				'مربع المقام $(x - c)^2 > 0$ دوماً على مجال التعريف.'
			],
			solutionStepsAr: [
				`اشتقاق كثير الحدود $P'(x) = ${pPrimeStr}$ وإيجاد $P'(1) = ${pPrimeAt1}$.`,
				`تطبيق قاعدة حاصل القسمة لإيجاد $g'(x) = \\frac{${derivNum}}{(${denStr})^2}$.`,
				`كتابة معادلة المماس عند $x_0 = ${x0}$: $y = ${linearKatex(gPrimeX0, tanB)}$.`
			],
			finalAnswer: correctMcq
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Monotonicity, Derivative Sign & Variation Table (Cubic Polynomial)
// ═══════════════════════════════════════════════════════════════════════════════

const tplCubicVariationTable: ParameterizedTemplate = {
	id: 'tpl_2as_shared_lit_t3_cubic_variation_table',
	grade: '2as_lp',
	trimesterId: 't3',
	domain: 'analysis',
	titleAr: 'اتجاه التغير، إشارة المشتقة وجدول التغيرات',
	curriculumLessonId: 'lesson_2as_shared_lit_t3_monotonicity_sign_variation_table',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Roots of f'(x) = 3(x - r1)(x - r2) with same parity so b = -3(r1+r2)/2 is integer!
		const rootPair =
			difficulty === 'easy'
				? rng.pick([
						{ r1: -1, r2: 1 },
						{ r1: 0, r2: 2 }
					])
				: rng.pick([
						{ r1: -1, r2: 3 },
						{ r1: -3, r2: 1 },
						{ r1: -2, r2: 2 },
						{ r1: 1, r2: 3 }
					]);

		const { r1, r2 } = rootPair;
		const a = 1;
		const b = (-3 * (r1 + r2)) / 2;
		const c = 3 * r1 * r2;
		const d = rng.pick([1, 2, -2, 4]);

		const f = (x: number) => a * x * x * x + b * x * x + c * x + d;

		const xStart = r1 - 1;
		const xEnd = r2 + 1;
		const fStart = f(xStart);
		const fR1 = f(r1); // local max
		const fR2 = f(r2); // local min
		const fEnd = f(xEnd);

		const varSvg = svgVariationTable({
			xValues: [`${xStart}`, `${r1}`, `${r2}`, `${xEnd}`],
			derivativeRow: [
				{ kind: 'sign', value: '+' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '-' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '+' }
			],
			variations: [
				{ value: `${fStart}`, position: 'bottom' },
				{ value: `${fR1}`, position: 'top' },
				{ value: `${fR2}`, position: 'bottom' },
				{ value: `${fEnd}`, position: 'top' }
			],
			fnName: 'f(x)',
			derivName: "f'(x)"
		});
		const varUrl = saveSvgAsset(`2as_shared_lit_t3_cubic_vt_${difficulty}_s${seed}`, varSvg);

		const fStr = poly3Str(a, b, c, d);
		const fPrimeStr = poly2Str(3 * a, 2 * b, c);
		const askMin = difficulty === 'hard';
		const quizAns = askMin ? fR2 : fR1;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر الدالة العددية $f$ المعرفة على المجال $I = [${xStart}, ${xEnd}]$ بدستورها:\n$f(x) = ${fStr}$.`,
			content: [
				{
					type: 'text',
					content: `1) احسب الدالة المشتقة $f'(x)$، ثم تحقق أنه من أجل كل $x in I$: $f'(x) = 3(x ${r1 >= 0 ? `- ${r1}` : `+ ${Math.abs(r1)}`})(x ${r2 >= 0 ? `- ${r2}` : `+ ${Math.abs(r2)}`})$.`,
					answer: `1) $f'(x) = ${fPrimeStr} = 3(${poly2Str(1, -(r1 + r2), r1 * r2)}) = 3(x ${r1 >= 0 ? `- ${r1}` : `+ ${Math.abs(r1)}`})(x ${r2 >= 0 ? `- ${r2}` : `+ ${Math.abs(r2)}`})$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) ادرس إشارة $f'(x)$ على المجال $I$، ثم استنتج اتجاه تغير الدالة $f$.`,
					answer: `2) تنعدم المشتقة عند $x_1 = ${r1}$ و $x_2 = ${r2}$. لأن معامل $x^2$ موجب ($3 > 0$):\n- $f'(x) > 0$ على $[${xStart}, ${r1}[$ و $]${r2}, ${xEnd}]$، فالدالة متزايدة تماماً على كل من $[${xStart}, ${r1}]$ و $[${r2}, ${xEnd}]$.\n- $f'(x) < 0$ على $]${r1}, ${r2}[$، فالدالة متناقصة تماماً على $[${r1}, ${r2}]$.`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `3) احسب صور القيم $${xStart}$ و $${r1}$ و $${r2}$ و $${xEnd}$ بالدالة $f$، ثم شكّل جدول تغيراتها على $I$ وحدد القيمتين الحديتين المحليتين.`,
					answer: `3) $f(${xStart}) = ${fStart}$، $f(${r1}) = ${fR1}$ (قيمة حدية محلية كبرى)، $f(${r2}) = ${fR2}$ (قيمة حدية محلية صغرى)، و $f(${xEnd}) = ${fEnd}$. جدول التغيرات مبين في الشكل أدناه.`,
					mark: '1.75'
				},
				{
					type: 'image',
					src: varUrl,
					caption: 'جدول تغيرات الدالة f على المجال I'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_lp',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: askMin
					? `لتكن الدالة $f(x) = ${fStr}$ على المجال $[${xStart} ; ${xEnd}]$ ومشتقتها $f'(x) = ${fPrimeStr}$. احسب القيمة الحدية المحلية الصغرى للدالة $f$:`
					: `لتكن الدالة $f(x) = ${fStr}$ على المجال $[${xStart} ; ${xEnd}]$ ومشتقتها $f'(x) = ${fPrimeStr}$. احسب القيمة الحدية المحلية الكبرى للدالة $f$:`,
				questionTextAr: askMin ? `احسب القيمة الحدية المحلية الصغرى:` : `احسب القيمة الحدية المحلية الكبرى:`,
				imageUrl: varUrl,
				imageCaption: 'جدول التغيرات المساعد',
				questionData: {
					answer: quizAns,
					displayTemplate: askMin ? `f(${r2}) = ?` : `f(${r1}) = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: askMin
					? `تنعدم المشتقة عند $${r1}$ و $${r2}$ وتتغير من $-$ إلى $+$ عند $x = ${r2}$، فالقيمة الصغرى المحلية هي $f(${r2}) = ${fR2}$.`
					: `تنعدم المشتقة عند $${r1}$ و $${r2}$ وتتغير من $+$ إلى $-$ عند $x = ${r1}$، فالقيمة الكبرى المحلية هي $f(${r1}) = ${fR1}$.`
			},
			sujetExercise,
			hints: [
				'احسب المشتقة $f\'(x)$ وهي ثلاثي حدود من الدرجة الثانية وحل المعادلة $f\'(x) = 0$.',
				'إشارة ثلاثي الحدود عكس إشارة $a$ بين الجذرين ونفس إشارته خارجهما.',
				'القيمة الحدية الكبرى تقابل تحول إشارة المشتقة من $+$ إلى $-$، والصغرى من $-$ إلى $+$.'
			],
			solutionStepsAr: [
				`إيجاد المشتقة وتحليلها $f'(x) = 3(x ${r1 >= 0 ? `- ${r1}` : `+ ${Math.abs(r1)}`})(x ${r2 >= 0 ? `- ${r2}` : `+ ${Math.abs(r2)}`})$.`,
				`دراسة إشارة $f'(x)$: متزايدة على $[${xStart}; ${r1}]$ و $[${r2}; ${xEnd}]$، ومتناقصة على $[${r1}; ${r2}]$.`,
				`تعيين القيمة الكبرى $f(${r1}) = ${fR1}$ والقيمة الصغرى $f(${r2}) = ${fR2}$ وتشكيل جدول التغيرات.`
			],
			finalAnswer: `${quizAns}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Local Extrema & Simple Practical Optimization Problems
// ═══════════════════════════════════════════════════════════════════════════════

const tplLocalExtremaOptimization: ParameterizedTemplate = {
	id: 'tpl_2as_shared_lit_t3_local_extrema_optimization',
	grade: '2as_lp',
	trimesterId: 't3',
	domain: 'analysis',
	titleAr: 'القيم الحدية المحلية ومسائل الاستمثال البسيطة',
	curriculumLessonId: 'lesson_2as_shared_lit_t3_local_extrema_optimization',
	defaultPoints: 5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Rectangular reading courtyard along an existing wall with total fence length L (divisible by 4)
		const L =
			difficulty === 'easy'
				? rng.pick([16, 20, 24])
				: difficulty === 'medium'
					? rng.pick([28, 32, 36])
					: rng.pick([40, 44, 48]);
		const xMaxDomain = L / 2;
		const xOpt = L / 4;
		const otherSide = L - 2 * xOpt; // = L/2
		const areaMax = xOpt * otherSide;

		const curveSvg = svgFunctionCurvePlot({
			xMin: 0,
			xMax: xMaxDomain,
			yMin: 0,
			yMax: areaMax + Math.ceil(areaMax * 0.2),
			fn: (x) => -2 * x * x + L * x,
			curveLabel: `S(x)=-2x²+${L}x`,
			tangents: [{ x: xOpt, y: areaMax, slope: 0, halfSpan: xMaxDomain * 0.22, color: '#dc2626' }],
			points: [{ x: xOpt, y: areaMax, label: `Max(${xOpt}; ${areaMax})`, color: '#dc2626' }]
		});
		const curveUrl = saveSvgAsset(`2as_shared_lit_t3_optim_${difficulty}_s${seed}`, curveSvg);

		const askOptimalX = difficulty === 'easy';
		const quizAns = askOptimalX ? xOpt : areaMax;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `تريد إدارة ثانوية تهيئة فضاء مطالعة مستطيل الشكل بمحاذاة جدار الساحة باستعمال سياج طوله الإجمالي $${L}$ متراً يحيط بثلاثة أضلاع فقط (ضلعان عموديان على الجدار طول كل منهما $x$ وضلع موازٍ للجدار طوله $y$).`,
			content: [
				{
					type: 'text',
					content: `1) عبّر عن الطول $y$ بدلالة $x$، ثم حدد المجال الذي ينتمي إليه $x$ لتكون الأبعاد موجبة.`,
					answer: `1) مجموع أطوال الأضلاع المسيّجة هو $2x + y = ${L} arrow.r.double y = ${L} - 2x$.\nيشترط $x > 0$ و $y > 0 arrow.r.double ${L} - 2x > 0 arrow.r.double x < ${xMaxDomain}$. إذن $x in ]0, ${xMaxDomain}[$ (أو $[0, ${xMaxDomain}]$).`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) تحقق أن مساحة فضاء المطالعة تُعطى بالدالة: $S(x) = -2x^2 + ${L}x$.`,
					answer: `2) مساحة المستطيل هي $S(x) = x times y = x(${L} - 2x) = -2x^2 + ${L}x$.`,
					mark: '0.75'
				},
				{
					type: 'text',
					content: `3) احسب الدالة المشتقة $S'(x)$ وادرس إشارتها على $[0, ${xMaxDomain}]$، ثم شكّل جدول تغيرات الدالة $S$.`,
					answer: `3) $S'(x) = -4x + ${L}$. تنعدم عند $x = frac(${L}, 4) = ${xOpt}$.\n- على $[0, ${xOpt}[$: $S'(x) > 0$ فالمساحة متزايدة تماماً.\n- على $]${xOpt}, ${xMaxDomain}]$: $S'(x) < 0$ فالمساحة متناقصة تماماً.`,
					mark: '1.75'
				},
				{
					type: 'text',
					content: `4) استنتج البعدين $x$ و $y$ اللذين يجعلان مساحة الفضاء أكبر ما يمكن، واحسب هذه المساحة العظمى.`,
					answer: `4) تبلغ $S$ قيمتها الحدية الكبرى عند $x = ${xOpt}$ m، ويكون عندها $y = ${L} - 2(${xOpt}) = ${otherSide}$ m.\nالمساحة العظمى هي $S(${xOpt}) = ${xOpt} times ${otherSide} = ${areaMax}$ m^2.`,
					mark: '1.5'
				},
				{
					type: 'image',
					src: curveUrl,
					caption: 'منحنى دالة المساحة S(x) والقيمة الحدية الكبرى'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_lp',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: askOptimalX
					? `لإنشاء حديقة مستطيلة بمحاذاة جدار بسياج طوله $${L}$ متراً على ثلاثة أضلاع، تُعطى المساحة بالعلاقة $S(x) = -2x^2 + ${L}x$. ما هي قيمة العرض $x$ (بالمتر) التي تجعل المساحة أكبر ما يمكن؟`
					: `نُنمذج مساحة حديقة مستطيلة بمحاذاة جدار بسياج طوله $${L}$ متراً بالعلاقة $S(x) = -2x^2 + ${L}x$ على $[0 ; ${xMaxDomain}]$. احسب المساحة العظمى للحديقة بالمتر المربع:`,
				questionTextAr: askOptimalX ? `احسب قيمة $x$ المثلى:` : `احسب المساحة العظمى $S_{\\max}$:`,
				imageUrl: curveUrl,
				imageCaption: 'التمثيل البياني لدالة المساحة',
				questionData: {
					answer: quizAns,
					displayTemplate: askOptimalX ? `x = ? m` : `S_{max} = ? m^2`,
					variables: [],
					tolerance: 0
				},
				explanation: askOptimalX
					? `$S'(x) = -4x + ${L} = 0 \\implies x = ${xOpt}$ م.`
					: `تنعدم المشتقة $S'(x) = -4x + ${L}$ عند $x = ${xOpt}$ وتغير إشارتها من $+$ إلى $-$، ومنه المساحة العظمى $S(${xOpt}) = ${areaMax}$ م².`
			},
			sujetExercise,
			hints: [
				'الجدار يغطي أحد الطولين، لذا السياج يغطي ضلعين بطول $x$ وضلعاً واحداً بطول $y$: أي $2x + y = L$.',
				'المشتقة $S\'(x) = -4x + L$ تنعدم عند $x = \\frac{L}{4}$ وتغير إشارتها من $+$ إلى $-$.',
				'عوض قيمة $x$ المثلى في $S(x)$ لحساب المساحة العظمى.'
			],
			solutionStepsAr: [
				`إيجاد $y = ${L} - 2x$ ومجال التعريف $[0 ; ${xMaxDomain}]$.`,
				`استنتاج عبارة المساحة $S(x) = -2x^2 + ${L}x$.`,
				`اشتقاق $S'(x) = -4x + ${L}$ وتحديد نقطة الانعدام $x = ${xOpt}$.`,
				`استنتاج الأبعاد المثلى ($x=${xOpt}$ م و $y=${otherSide}$ م) والمساحة العظمى ${areaMax} م².`
			],
			finalAnswer: `${quizAns}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Full Study of a Homographic Function & Graphical Equations
// ═══════════════════════════════════════════════════════════════════════════════

const tplHomographicStudyGraph: ParameterizedTemplate = {
	id: 'tpl_2as_shared_lit_t3_homographic_study_graph',
	grade: '2as_lp',
	trimesterId: 't3',
	domain: 'analysis',
	titleAr: 'دراسة شاملة لدالة تناظرية والمستقيمات المقاربة والحل البياني',
	curriculumLessonId: 'lesson_2as_shared_lit_t3_full_study_graphical_equations',
	defaultPoints: 5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// f(x) = a + k/(x - c) = (a*x + b)/(x - c) where b = k - a*c
		const a = rng.pick([1, 2, 3]);
		const c = rng.pick([1, 2, -1]);
		const k = difficulty === 'easy' ? rng.pick([2, -2]) : rng.pick([2, 3, -2, -3]);
		const b = k - a * c;

		const numStr = linearKatex(a, b);
		const denStr = linearKatex(1, -c);
		const derivNum = -k; // f'(x) = -k / (x - c)^2
		const isInc = derivNum > 0;

		const x1 = c + 1;
		const f1 = a + k;
		const x2 = c + Math.abs(k);
		const f2 = a + (k > 0 ? 1 : -1);
		const xMaxRight = c + 5;
		const fRight = `${a}${k > 0 ? ` + ${k}/5` : ` - ${Math.abs(k)}/5`}`;

		// Variation table on [c, c+5] with leading double bar ||
		const varSvg = svgVariationTable({
			xValues: [`${c}`, `${xMaxRight}`],
			derivativeRow: [
				{ kind: 'sign', value: '||' },
				{ kind: 'sign', value: isInc ? '+' : '-' }
			],
			variations: [
				{ value: isInc ? '-∞' : '+∞', position: isInc ? 'bottom' : 'top' },
				{ value: fRight, position: isInc ? 'top' : 'bottom' }
			],
			fnName: 'f(x)',
			derivName: "f'(x)"
		});
		const varUrl = saveSvgAsset(`2as_shared_lit_t3_homog_vt_${difficulty}_s${seed}`, varSvg);

		const curveSvg = svgFunctionCurvePlot({
			xMin: c - 4,
			xMax: c + 5,
			yMin: a - 5,
			yMax: a + 5,
			fn: (x) => (Math.abs(x - c) > 0.08 ? (a * x + b) / (x - c) : NaN),
			curveLabel: 'Cf',
			asymptotes: [
				{ kind: 'vertical', value: c, label: `x = ${c}`, color: '#dc2626' },
				{ kind: 'horizontal', value: a, label: `y = ${a}`, color: '#dc2626' }
			],
			points: [
				{ x: x1, y: f1, label: `A(${x1}; ${f1})`, color: '#15803d' },
				{ x: c - 1, y: a - k, label: `B(${c - 1}; ${a - k})`, color: '#1d4ed8' }
			]
		});
		const curveUrl = saveSvgAsset(`2as_shared_lit_t3_homog_curve_${difficulty}_s${seed}`, curveSvg);

		// Graphical equation f(x) = f1 has exact solution x = x1; f(x) = a has 0 solutions!
		const correctMcq = `$x = ${c}$ و $y = ${a}$`;
		const mcq = buildUniqueMcqOptions(
			correctMcq,
			[
				{ text: `$x = ${-c}$ و $y = ${a}$`, diagnosticFeedback: 'انتبه لإشارة القيمة الممنوعة للمقام $x - c = 0$.' },
				{ text: `$x = ${a}$ و $y = ${c}$`, diagnosticFeedback: 'عكست بين المقارب العمودي ($x = c$) والمقارب الأفقي ($y = a$).' },
				{ text: `$x = ${c}$ و $y = ${b}$`, diagnosticFeedback: 'المقارب الأفقي يوافق حاصل قسمة معاملي $x$ وليس الحد الثابت في البسط.' }
			],
			rng
		);

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر الدالة التناظرية $f$ المعرفة على $D_f = bb(R) backslash {${c}}$ بالعبارة:\n$f(x) = frac(${numStr}, ${denStr})$، وليكن $(C_f)$ منحناها البياني.`,
			content: [
				{
					type: 'text',
					content: `1) تحقق أنه من أجل كل $x != ${c}$: $f(x) = ${a} ${k >= 0 ? `+ frac(${k}, ${denStr})` : `- frac(${Math.abs(k)}, ${denStr})`}$، ثم عين معادلتي المستقيمين المقاربين للمنحنى $(C_f)$.`,
					answer: `1) بتوحيد المقامات: $${a} ${k >= 0 ? `+ frac(${k}, ${denStr})` : `- frac(${Math.abs(k)}, ${denStr})`} = frac(${a}(${denStr}) ${k >= 0 ? `+ ${k}` : `- ${Math.abs(k)}`}, ${denStr}) = frac(${numStr}, ${denStr}) = f(x)$.\nالمقارب العمودي: $x = ${c}$، والمقارب الأفقي: $y = ${a}$.`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `2) احسب المشتقة $f'(x)$، ثم حدد اتجاه تغير الدالة $f$ على كل من المجالين $]-oo, ${c}[$ و $]${c}, +oo[$.`,
					answer: `2) $f'(x) = frac(${derivNum}, (${denStr})^2)$.\nبما أن البسط $${derivNum} ${isInc ? '> 0$' : '< 0$'} والمقام موجب تماماً، فإن $f$ ${isInc ? 'متزايدة تماماً' : 'متناقصة تماماً'} على $]-oo, ${c}[$ و${isInc ? 'متزايدة تماماً' : 'متناقصة تماماً'} على $]${c}, +oo[$. (جدول التغيرات على $]${c}, ${xMaxRight}]$ مرفق).`,
					mark: '1.25'
				},
				{
					type: 'image',
					src: varUrl,
					caption: `جدول تغيرات الدالة على المجال المفتوح $]${c}, ${xMaxRight}]$`
				},
				{
					type: 'text',
					content: `3) احسب $f(${x1})$ و $f(${x2})$، ثم اعتماداً على المنحنى المرفق $(C_f)$:\nأ) حل المعادلة $f(x) = ${f1}$.\nب) هل تقبل المعادلة $f(x) = ${a}$ حلاً في $D_f$؟ برّر.`,
					answer: `3) $f(${x1}) = ${f1}$ و $f(${x2}) = ${f2}$.\nأ) المستقيم الأفقي $y = ${f1}$ يقطع $(C_f)$ في نقطة واحدة فاصلتها $x = ${x1}$، إذن $S = {${x1}}$.\nب) المعادلة $f(x) = ${a}$ لا تقبل أي حل لأن المستقيم $y = ${a}$ مقارب أفقي لا يقطعه المنحنى (أي $frac(${k}, ${denStr}) = 0$ مستحيلة).`,
					mark: '2.5'
				},
				{
					type: 'image',
					src: curveUrl,
					caption: 'التمثيل البياني للدالة التناظرية (C_f) ومقارباها'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_lp',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `ما هما معادلتا المستقيمين المقاربين (العمودي والأفقي) لمنحنى الدالة التناظرية $f(x) = \\frac{${numStr}}{${denStr}}$ الموضح في الشكل؟`,
				questionTextAr: `عيّن معادلتي المستقيمين المقاربين للمنحنى $(C_f)$:`,
				imageUrl: curveUrl,
				imageCaption: 'منحنى الدالة التناظرية ومقارباها',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices
				},
				explanation: `بتحويل العبارة إلى $f(x) = ${a} ${k >= 0 ? `+ \\frac{${k}}{${denStr}}` : `- \\frac{${Math.abs(k)}}{${denStr}}`}$ نجد المقارب العمودي $x = ${c}$ والأفقي $y = ${a}$.`
			},
			sujetExercise,
			hints: [
				'لتفكيك الدالة التناظرية نوحد المقامات في $a + \\frac{k}{x - c}$.',
				'القيمة التي تعدم المقام هي معادلة المقارب العمودي، والثابت $a$ هو معادلة المقارب الأفقي.',
				'لا يمكن أن تساوي الدالة التناظرية قيمة مقاربها الأفقي $y = a$.'
			],
			solutionStepsAr: [
				`كتابة الشكل المفكك $f(x) = ${a} ${k >= 0 ? `+ \\frac{${k}}{${denStr}}` : `- \\frac{${Math.abs(k)}}{${denStr}}`}$ واستنتاج المقاربين $x=${c}$ و $y=${a}$.`,
				`حساب $f'(x) = \\frac{${derivNum}}{(${denStr})^2}$ ودراسة اتجاه التغير على كل مجال.`,
				`حل $f(x) = ${f1}$ بيانياً ($x = ${x1}$) وتبرير استحالة $f(x) = ${a}$.`
			],
			finalAnswer: correctMcq
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Comprehensive Synthesis Problem (Full Cubic Study + Tangents + Graphical Eq)
// ═══════════════════════════════════════════════════════════════════════════════

const tplProblemFullCubicStudy: ParameterizedTemplate = {
	id: 'tpl_2as_shared_lit_t3_problem_full_cubic_study',
	grade: '2as_lp',
	trimesterId: 't3',
	domain: 'integration',
	isIntegration: true,
	titleAr: 'المسألة الشاملة في التحليل: دراسة دالة كثير حدود، المماس والحل البياني',
	curriculumLessonId: 'lesson_2as_shared_lit_t3_full_study_graphical_equations',
	defaultPoints: 7,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// f(x) = x^3 - 3*p^2*x + d on [-2p, 2p]
		// p = 1 for easy/medium, p = 2 for hard
		const p = difficulty === 'hard' ? 2 : 1;
		const xBound = 2 * p;
		const cCoef = -3 * p * p;
		const d = rng.pick([-2, -1, 1, 2, 3]);

		const f = (x: number) => x * x * x + cCoef * x + d;
		const fStr = poly3Str(1, 0, cCoef, d);
		const fPrimeStr = poly2Str(3, 0, cCoef);

		const fLeft = f(-xBound); // = -2p^3 + d
		const fMax = f(-p); // = 2p^3 + d
		const fMin = f(p); // = -2p^3 + d
		const fRight = f(xBound); // = 2p^3 + d
		const fZero = d;
		const slopeAtZero = cCoef;

		const varSvg = svgVariationTable({
			xValues: [`-${xBound}`, `-${p}`, `${p}`, `${xBound}`],
			derivativeRow: [
				{ kind: 'sign', value: '+' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '-' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '+' }
			],
			variations: [
				{ value: `${fLeft}`, position: 'bottom' },
				{ value: `${fMax}`, position: 'top' },
				{ value: `${fMin}`, position: 'bottom' },
				{ value: `${fRight}`, position: 'top' }
			],
			fnName: 'f(x)',
			derivName: "f'(x)"
		});
		const varUrl = saveSvgAsset(`2as_shared_lit_t3_prob_vt_${difficulty}_s${seed}`, varSvg);

		const curveSvg = svgFunctionCurvePlot({
			xMin: -xBound - 0.5,
			xMax: xBound + 0.5,
			yMin: fMin - 2,
			yMax: fMax + 2,
			fn: f,
			curveLabel: 'Cf',
			tangents: [
				{ x: 0, y: fZero, slope: slopeAtZero, halfSpan: 0.7 * p, color: '#059669' },
				{ x: -p, y: fMax, slope: 0, halfSpan: 0.6 * p, color: '#dc2626' },
				{ x: p, y: fMin, slope: 0, halfSpan: 0.6 * p, color: '#dc2626' }
			],
			points: [
				{ x: -p, y: fMax, label: `M1(-${p}; ${fMax})`, color: '#dc2626' },
				{ x: 0, y: fZero, label: `I(0; ${fZero})`, color: '#059669' },
				{ x: p, y: fMin, label: `M2(${p}; ${fMin})`, color: '#dc2626' }
			]
		});
		const curveUrl = saveSvgAsset(`2as_shared_lit_t3_prob_curve_${difficulty}_s${seed}`, curveSvg);

		const askSlopeZero = difficulty === 'easy';
		const quizAns = askSlopeZero ? slopeAtZero : fMax;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			customTitle: 'التمرين الرابع — المسألة الشاملة',
			instruction: `نعتبر الدالة العددية $f$ المعرفة على المجال $I = [-${xBound}, ${xBound}]$ بدستورها:\n$f(x) = ${fStr}$.\nوليكن $(C_f)$ تمثيلها البياني في مستوٍ منسوب إلى معلم متعامد ومتجانس $(O; arrow(i), arrow(j))$.`,
			content: [
				{
					type: 'text',
					content: `*الجزء الأول: دراسة تغيرات الدالة (3 نقاط)*\n\n1) احسب $f'(x)$ ثم تحقق أن $f'(x) = 3(x - ${p})(x + ${p})$.\n2) ادرس إشارة $f'(x)$ على المجال $I$ واستنتج اتجاه تغير الدالة $f$.\n3) احسب صور الأعداد $-${xBound}$، $-${p}$، $${p}$ و $${xBound}$ ثم شكّل جدول التغيرات وحدد القيمتين الحديتين.`,
					answer: `1) $f'(x) = ${fPrimeStr} = 3(x^2 - ${p * p}) = 3(x - ${p})(x + ${p})$.\n2) تنعدم المشتقة عند $-${p}$ و $${p}$: موجبة على $[-${xBound}, -${p}[$ و $]${p}, ${xBound}]$ (الدالة متزايدة تماماً)، وسالبة على $]-${p}, ${p}[$ (الدالة متناقصة تماماً).\n3) $f(-${xBound}) = ${fLeft}$، $f(-${p}) = ${fMax}$ (قيمة حدية كبرى)، $f(${p}) = ${fMin}$ (قيمة حدية صغرى)، $f(${xBound}) = ${fRight}$.`,
					mark: '3'
				},
				{
					type: 'image',
					src: varUrl,
					caption: `جدول تغيرات الدالة على $[-${xBound}, ${xBound}]$`
				},
				{
					type: 'text',
					content: `*الجزء الثاني: المماس والحل البياني للمعادلات (2.5 نقطة)*\n\n1) اكتب معادلة المماس $(T)$ للمنحنى $(C_f)$ عند النقطة $I(0, ${fZero})$ ذات الفاصلة $x_0 = 0$.\n2) اعرض جدول القيم المساعد واحسب إحداثيي نقطة تقاطع $(C_f)$ مع محور التراتيب.\n3) اعتماداً على المنحنى $(C_f)$، ناقش بيانياً حسب قيم الوسيط الحقيقي $m$ عدد حلول المعادلة $f(x) = m$ في المجال $[-${xBound}, ${xBound}]$.`,
					answer: `1) عند $x_0 = 0$: $f(0) = ${fZero}$ و $f'(0) = ${slopeAtZero}$، إذن معادلة المماس $(T)$ هي $y = ${linearTypst(slopeAtZero, fZero)}$.\n2) نقطة التقاطع مع محور التراتيب هي $(0, ${fZero})$.\n3) المناقشة البيانية لـ $f(x) = m$:\n- إذا كان $m < ${fMin}$ أو $m > ${fMax}$: لا توجد أي حلول.\n- إذا كان $m = ${fMin}$ أو $m = ${fMax}$: يوجد حلان بالضبط.\n- إذا كان $${fMin} < m < ${fMax}$: توجد $3$ حلول متمايزة.`,
					mark: '2.5'
				},
				{
					type: 'image',
					src: curveUrl,
					caption: 'المنحنى البياني (C_f) ومماساه الأفقيان والمماس عند النقطة I'
				},
				{
					type: 'text',
					content: `*الجزء الثالث: متراجحة وتطبيق عددي (1.5 نقطة)*\n\n1) حل في المجال $[-${xBound}, ${xBound}]$ بيانياً المتراجحة $f(x) >= ${fZero}$ (استعمل التمثيل البياني ولاحظ أن $f(-${p}) > ${fZero}$ و $f(${p}) < ${fZero}$).\n2) ما هي القيمة العظمى والقيمة الصغرى للدالة $f$ على المجال $[-${xBound}, ${xBound}]$؟`,
					answer: `1) نلاحظ أن $f(x) - ${fZero} = x^3 ${cCoef}x = x(x^2 ${cCoef})$ فينعدم عند $x = 0$ و $x = plus.minus sqrt(${Math.abs(cCoef)})$.\nبيانياً، يكون المنحنى فوق المستقيم $y = ${fZero}$ على $[-sqrt(${Math.abs(cCoef)}), 0] union [sqrt(${Math.abs(cCoef)}), ${xBound}]$.\n2) القيمة العظمى على $I$ هي $${fMax}$ والقيمة الصغرى هي $${fMin}$.`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_lp',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: askSlopeZero
					? `في المسألة الشاملة لدراسة الدالة $f(x) = ${fStr}$ على $[-${xBound} ; ${xBound}]$، احسب معامل توجيه المماس للمنحنى $(C_f)$ عند النقطة ذات الفاصلة $x_0 = 0$:`
					: `في المسألة الشاملة لدراسة الدالة $f(x) = ${fStr}$ على $[-${xBound} ; ${xBound}]$، احسب القيمة الحدية الكبرى للدالة $f$:`,
				questionTextAr: askSlopeZero ? `احسب $f'(0)$:` : `احسب القيمة الحدية الكبرى:`,
				imageUrl: curveUrl,
				imageCaption: 'التمثيل البياني للدالة في المسألة الشاملة',
				questionData: {
					answer: quizAns,
					displayTemplate: askSlopeZero ? `f'(0) = ?` : `M = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: askSlopeZero
					? `$f'(x) = ${fPrimeStr}$، ومنه معامل توجيه المماس عند $0$ هو $f'(0) = ${slopeAtZero}$.`
					: `تنعدم المشتقة عند $-${p}$ و $${p}$، وتبلغ $f$ قيمتها الكبرى عند $x = -${p}$ بقيمة $f(-${p}) = ${fMax}$.`
			},
			sujetExercise,
			hints: [
				'حلل المشتقة $f\'(x) = 3(x^2 - p^2)$ باستعمال المتطابقة الشهيرة $a^2 - b^2$.',
				'عدد حلول $f(x) = m$ هو عدد نقط تقاطع المنحنى $(C_f)$ مع المستقيم الأفقي $y = m$.',
				'معادلة المماس عند $x_0 = 0$ هي $y = f\'(0)x + f(0)$.'
			],
			solutionStepsAr: [
				`اشتقاق الدالة $f'(x) = 3(x-${p})(x+${p})$ وتشكيل جدول التغيرات على $[-${xBound} ; ${xBound}]$.`,
				`تعيين المماس عند $x_0 = 0$: $y = ${linearKatex(slopeAtZero, fZero)}$.`,
				`المناقشة البيانية لعدد حلول $f(x) = m$ ($0$ أو $2$ أو $3$ حلول).`,
				`حل المتراجحة $f(x) \\ge ${fZero}$ واستنتاج القيم الحدية الكبرى $${fMax}$ والصغرى $${fMin}$.`
			],
			finalAnswer: `${quizAns}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 3 Parameterized Templates — 2AS Literary Shared Core
// ═══════════════════════════════════════════════════════════════════════════════

export const SHARED_TEMPLATES_2AS_LIT_T3: ParameterizedTemplate[] = [
	tplDerivativeTangent,
	tplDerivativePolyHomographic,
	tplCubicVariationTable,
	tplLocalExtremaOptimization,
	tplHomographicStudyGraph,
	tplProblemFullCubicStudy
];
