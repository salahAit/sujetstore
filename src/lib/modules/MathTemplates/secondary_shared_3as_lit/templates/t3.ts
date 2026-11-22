import type { ExerciseBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';
import { buildUniqueMcqOptions, SeededRng, simplifyFraction } from '../../rng';
import { saveSvgAsset } from '../../svg-helpers';
import {
	svgCobwebSequencePlot,
	svgFunctionCurvePlot,
	svgVariationTable
} from '../../svg-secondary';

// ═══════════════════════════════════════════════════════════════════════════════
// 3AS Literary (LP / LE) — Trimester 3 Parameterized Templates (6 templates)
// Topics: Homographic Limits & Asymptotes, Homographic Tangents & Symmetry,
// Recursive & Word-Problem Sequences, Advanced Congruences & Calendar Dates,
// 08-pt Homographic BAC Synthesis, 08-pt Parametric Cubic BAC Synthesis.
// Dual Syntax: KaTeX ($...$) in quizQuestion/hints/solutionStepsAr/finalAnswer;
//              Pure Typst math in sujetExercise (frac, bb, equiv, lim, oo, etc.).
// Strictly Western digits 0-9. Zero riba/interest, zero prohibited symbols.
// ═══════════════════════════════════════════════════════════════════════════════

function linearKatex(coeff: number, constant: number, v = 'x'): string {
	let s = '';
	if (coeff === 1) s = v;
	else if (coeff === -1) s = `-${v}`;
	else if (coeff !== 0) s = `${coeff}${v}`;

	if (constant > 0) s += s ? ` + ${constant}` : `${constant}`;
	else if (constant < 0) s += s ? ` - ${Math.abs(constant)}` : `${constant}`;
	return s || '0';
}

function linearTypst(coeff: number, constant: number, v = 'x'): string {
	return linearKatex(coeff, constant, v);
}

function cubicKatex(c3: number, c2: number, c1: number, c0: number): string {
	const parts: string[] = [];
	const pushTerm = (coef: number, sym: string) => {
		if (coef === 0) return;
		const abs = Math.abs(coef);
		const mag = sym === '' ? `${abs}` : abs === 1 ? sym : `${abs}${sym}`;
		if (parts.length === 0) {
			parts.push(coef < 0 ? `-${mag}` : mag);
		} else {
			parts.push(coef < 0 ? ` - ${mag}` : ` + ${mag}`);
		}
	};
	pushTerm(c3, 'x^3');
	pushTerm(c2, 'x^2');
	pushTerm(c1, 'x');
	pushTerm(c0, '');
	return parts.length > 0 ? parts.join('') : '0';
}

function cubicTypst(c3: number, c2: number, c1: number, c0: number): string {
	return cubicKatex(c3, c2, c1, c0);
}

function quadKatex(c2: number, c1: number, c0: number): string {
	const parts: string[] = [];
	const pushTerm = (coef: number, sym: string) => {
		if (coef === 0) return;
		const abs = Math.abs(coef);
		const mag = sym === '' ? `${abs}` : abs === 1 ? sym : `${abs}${sym}`;
		if (parts.length === 0) parts.push(coef < 0 ? `-${mag}` : mag);
		else parts.push(coef < 0 ? ` - ${mag}` : ` + ${mag}`);
	};
	pushTerm(c2, 'x^2');
	pushTerm(c1, 'x');
	pushTerm(c0, '');
	return parts.length > 0 ? parts.join('') : '0';
}

function quadTypst(c2: number, c1: number, c0: number): string {
	return quadKatex(c2, c1, c0);
}

function fracKatex(num: number, den: number): string {
	const [sn, sd] = simplifyFraction(num, den);
	if (sd === 1) return `${sn}`;
	if (sn < 0) return `-\\frac{${Math.abs(sn)}}{${sd}}`;
	return `\\frac{${sn}}{${sd}}`;
}

function fracTypst(num: number, den: number): string {
	const [sn, sd] = simplifyFraction(num, den);
	if (sd === 1) return `${sn}`;
	if (sn < 0) return `-frac(${Math.abs(sn)}, ${sd})`;
	return `frac(${sn}, ${sd})`;
}

function shiftParensKatex(x0: number): string {
	if (x0 === 0) return 'x';
	return x0 > 0 ? `x - ${x0}` : `x + ${Math.abs(x0)}`;
}

const WEEKDAYS_AR = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

// ============================================================================
// Template 1: الدالة التناظرية — مجموعة التعريف، النهايات، المقاربان والمشتقة
// ============================================================================
const tplHomographicStudy: ParameterizedTemplate = {
	id: 'tpl_3as_shared_lit_t3_homographic_study',
	grade: '3as_lp',
	trimesterId: 't3',
	domain: 'analysis',
	titleAr: 'الدالة التناظرية: النهايات والمستقيمان المقاربان وجدول التغيرات',
	curriculumLessonId: 'lesson_3as_shared_lit_t3_homographic_limits_asymptotes',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const x0 = rng.pick(difficulty === 'easy' ? [-2, -1, 1, 2] : [-3, -2, -1, 1, 2, 3]);
		const a = rng.pick(difficulty === 'easy' ? [-1, 1, 2] : [-2, -1, 1, 2, 3]);
		const k = rng.pick(
			difficulty === 'easy' ? [-3, -2, -1, 1, 2, 3] : [-4, -3, -2, -1, 1, 2, 3, 4]
		);
		// f(x) = a + k/(x - x0) = (a*x + b)/(x - x0) with b = k - a*x0
		const b = k - a * x0;
		const fNumK = linearKatex(a, b, 'x');
		const fNumT = linearTypst(a, b, 'x');
		const fDen = shiftParensKatex(x0);
		const fExprK = `\\frac{${fNumK}}{${fDen}}`;
		const fExprT = `frac(${fNumT}, ${fDen})`;

		// f'(x) = (-k)/(x - x0)^2
		const derivNum = -k;
		const isInc = derivNum > 0;
		const limLeftK = isInc ? '+\\infty' : '-\\infty';
		const limRightK = isInc ? '-\\infty' : '+\\infty';
		const limLeftT = isInc ? '+oo' : '-oo';
		const limRightT = isInc ? '-oo' : '+oo';
		const signChar = isInc ? '+' : '-';

		const varSvg = svgVariationTable({
			fnName: 'f(x)',
			derivName: "f'(x)",
			xValues: ['-∞', `${x0}`, '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: signChar },
				{ kind: 'sign', value: '||' },
				{ kind: 'sign', value: signChar }
			],
			variations: [
				{ value: `${a}`, position: isInc ? 'bottom' : 'top' },
				{ value: isInc ? '+∞    -∞' : '-∞    +∞', position: 'mid' },
				{ value: `${a}`, position: isInc ? 'top' : 'bottom' }
			]
		});
		saveSvgAsset(`3as_shared_lit_t3_homog_var_${difficulty}_s${seed}`, varSvg);

		const yRangeLow = Math.min(a - Math.abs(k) - 3, -5);
		const yRangeHigh = Math.max(a + Math.abs(k) + 3, 5);
		const curveSvg = svgFunctionCurvePlot({
			xMin: x0 - 5,
			xMax: x0 + 5,
			yMin: yRangeLow,
			yMax: yRangeHigh,
			fn: (x) => (Math.abs(x - x0) < 0.14 ? Number.NaN : a + k / (x - x0)),
			curveLabel: '(C_f)',
			asymptotes: [
				{ kind: 'vertical', value: x0, label: `x = ${x0}`, color: '#dc2626' },
				{ kind: 'horizontal', value: a, label: `y = ${a}`, color: '#059669' }
			],
			points: [
				{ x: x0 - 1, y: a - k, label: `(${x0 - 1}, ${a - k})`, color: '#15803d' },
				{ x: x0 + 1, y: a + k, label: `(${x0 + 1}, ${a + k})`, color: '#15803d' }
			]
		});
		const curveUrl = saveSvgAsset(`3as_shared_lit_t3_homog_curve_${difficulty}_s${seed}`, curveSvg);

		const correctOpt = `$x = ${x0}$ (عمودي) و $y = ${a}$ (أفقي)`;
		const mcq = buildUniqueMcqOptions(
			correctOpt,
			[
				{
					text: `$x = ${-x0}$ (عمودي) و $y = ${a}$ (أفقي)`,
					diagnosticFeedback: `القيمة الممنوعة التي تعدم المقام $${fDen} = 0$ هي $x = ${x0}$ وليس $-${x0}$.`
				},
				{
					text: `$x = ${a}$ (عمودي) و $y = ${x0}$ (أفقي)`,
					diagnosticFeedback: `المقارب العمودي معادلته من الشكل $x = ${x0}$ (القيمة الممنوعة) والمقارب الأفقي $y = ${a}$.`
				},
				{
					text: `$x = ${x0}$ (عمودي) و $y = ${b}$ (أفقي)`,
					diagnosticFeedback: `النهاية عند اللانهاية هي نسبة معاملي $x$ ($\\frac{${a}}{1} = ${a}$) وليست الحد الثابت $${b}$.`
				},
				{
					text: `$x = ${-x0}$ (عمودي) و $y = ${-a}$ (أفقي)`,
					diagnosticFeedback: `تحقق من إشارة القيمة الممنوعة وحساب النهاية عند $\\pm\\infty$.`
				}
			],
			rng
		);

		const quizQuestion: QuizQuestionPayload = {
			type: 'mcq',
			questionText: `ما هما معادلتا المستقيمين المقاربين لمنحنى الدالة $f(x) = ${fExprK}$ ؟`,
			questionTextAr: `لتكن الدالة $f$ المعرفة على $\\mathbb{R} - \\{${x0}\\}$ بـ $f(x) = ${fExprK}$. ما هما المستقيمان المقاربان لـ $(\\mathcal{C}_f)$ ؟`,
			imageUrl: curveUrl,
			imageCaption: 'التمثيل البياني للدالة التناظرية والمقاربان',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `القيمة الممنوعة $x = ${x0}$ تعطي المقارب العمودي، والنهاية $\\lim_{x \\to \\pm\\infty} f(x) = ${a}$ تعطي المقارب الأفقي $y = ${a}$.`
		};

		const y0Frac = fracKatex(b, -x0);
		const y0FracT = fracTypst(b, -x0);
		const rootX = fracKatex(-b, a);
		const rootXT = fracTypst(-b, a);

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر الدالة العددية $f$ المعرفة على $D_f = bb(R) - {${x0}}$ بـ: $f(x) = ${fExprT}$ ، وليكن $(C_f)$ تمثيلها البياني في معلم متعامد ومتجانس.`,
			content: [
				{
					type: 'text',
					content: `1) احسب نهايتي $f$ عند $-oo$ و $+oo$، ثم احسب النهايتين على يسار وعلى يمين $${x0}$.`,
					answer: `1) عند اللانهاية: $lim_(x arrow.r -oo) f(x) = lim_(x arrow.r +oo) f(x) = ${a}$ .\nعند $${x0}$: $lim_(x arrow.r ${x0}^(-)) f(x) = ${limLeftT}$ و $lim_(x arrow.r ${x0}^(+)) f(x) = ${limRightT}$ .`,
					mark: '2'
				},
				{
					type: 'text',
					content: `2) استنتج معادلتي المستقيمين المقاربين $(D_1)$ و $(D_2)$ للمنحنى $(C_f)$.`,
					answer: `2) المستقيم المقارب الأفقي $(D_1): y = ${a}$، والمستقيم المقارب العمودي $(D_2): x = ${x0}$ .`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) بيّن أنه من أجل كل $x in D_f$: $f'(x) = frac(${derivNum}, (${fDen})^2)$، ثم شكل جدول تغيرات الدالة $f$.`,
					answer: `3) بتطبيق مشتقة حاصل القسمة: $f'(x) = frac(${a}(${fDen}) - (${fNumT})(1), (${fDen})^2) = frac(${derivNum}, (${fDen})^2)$ .\nبما أن إشارتها (${signChar}) دوماً، فالدالة $f$ ${isInc ? 'متزايدة تماماً' : 'متناقصة تماماً'} على كل من $]-oo ; ${x0}[$ و $]${x0} ; +oo[$ .`,
					mark: '2'
				},
				{
					type: 'text',
					content: `4) عيّن إحداثيي نقطتي تقاطع $(C_f)$ مع محوري الإحداثيات.`,
					answer: `4) التقاطع مع $(O y)$: $f(0) = ${y0FracT}$ أي النقطة $(0 ; ${y0FracT})$ .\nالتقاطع مع $(O x)$: $f(x) = 0 arrow.r.double ${fNumT} = 0 arrow.r.double x = ${rootXT}$ أي النقطة $(${rootXT} ; 0)$ .`,
					mark: '1'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_lp',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`تُعدم عبارة المقام عندما $${fDen} = 0$ أي $x = ${x0}$، وبالتالي $D_f = \\mathbb{R} - \\{${x0}\\}$.`,
				`عند $\\pm\\infty$ نستعمل نسبة الحدين الأعلى درجة: $\\lim_{x \\to \\pm\\infty} f(x) = \\frac{${a}}{1} = ${a}$.`,
				`بالتفكيك $f(x) = ${a} + \\frac{${k}}{${fDen}}$، أو بقانون $\\left(\\frac{u}{v}\\right)'$، نجد $f'(x) = \\frac{${derivNum}}{(${fDen})^2}$.`
			],
			solutionStepsAr: [
				`1. **مجموعة التعريف**: $D_f = ]-\\infty ; ${x0}[ \\cup ]${x0} ; +\\infty[$.`,
				`2. **النهايات والمقاربان**: $\\lim_{x \\to \\pm\\infty} f(x) = ${a} \\implies (D_1): y = ${a}$؛ وعند $x_0 = ${x0}$ نجد $\\lim_{x \\to ${x0}^-} f(x) = ${limLeftK}$ و $\\lim_{x \\to ${x0}^+} f(x) = ${limRightK} \\implies (D_2): x = ${x0}$.`,
				`3. **المشتقة واتجاه التغير**: $f'(x) = \\frac{${derivNum}}{(${fDen})^2}$، فالدالة $f$ ${isInc ? 'متزايدة تماماً' : 'متناقصة تماماً'} على كل مجال من $D_f$.`,
				`4. **التقاطع مع المحورين**: $f(0) = ${y0Frac}$ و $f(${rootX}) = 0$.`
			],
			finalAnswer: `المقاربان: $x = ${x0}$ و $y = ${a}$، والمشتقة $f'(x) = \\frac{${derivNum}}{(${fDen})^2}$`
		};
	}
};

// ============================================================================
// Template 2: مشتقة الدالة التناظرية، المماس ومركز التناظر
// ============================================================================
const tplHomographicTangentsSym: ParameterizedTemplate = {
	id: 'tpl_3as_shared_lit_t3_homographic_tangents_sym',
	grade: '3as_lp',
	trimesterId: 't3',
	domain: 'analysis',
	titleAr: 'المماس ومركز التناظر لمنحنى دالة تناظرية',
	curriculumLessonId: 'lesson_3as_shared_lit_t3_homographic_derivative_symmetry',
	defaultPoints: 5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const x0 = rng.pick([-2, -1, 1, 2]);
		const a = rng.pick([-2, -1, 1, 2, 3]);
		const d = rng.pick(difficulty === 'hard' ? [-2, -1, 1, 2] : [-1, 1]);
		const s = rng.pick(Math.abs(d) === 2 ? [-1, 1] : [-2, -1, 1, 2]);
		// k = s * d^2 ensures integer f(xA) and f'(xA) at xA = x0 + d
		const k = s * d * d;
		const b = k - a * x0;

		const xA = x0 + d;
		const yA = a + s * d;
		const xB = x0 - d;
		const yB = a - s * d;
		// f'(x) = -k / (x - x0)^2 => f'(xA) = -s
		const slope = -s;
		const intercept = yA - slope * xA;

		const fNumK = linearKatex(a, b, 'x');
		const fNumT = linearTypst(a, b, 'x');
		const fDen = shiftParensKatex(x0);
		const fExprK = `\\frac{${fNumK}}{${fDen}}`;
		const fExprT = `frac(${fNumT}, ${fDen})`;

		const tgEqK = `y = ${linearKatex(slope, intercept, 'x')}`;
		const tgEqT = `y = ${linearTypst(slope, intercept, 'x')}`;
		const tgEqBIntercept = yB - slope * xB;
		const tgEqBK = `y = ${linearKatex(slope, tgEqBIntercept, 'x')}`;
		const tgEqBT = `y = ${linearTypst(slope, tgEqBIntercept, 'x')}`;

		const plotSvg = svgFunctionCurvePlot({
			xMin: x0 - 5,
			xMax: x0 + 5,
			yMin: Math.min(a - Math.abs(k) - 3, yA - 3, -5),
			yMax: Math.max(a + Math.abs(k) + 3, yA + 3, 5),
			fn: (x) => (Math.abs(x - x0) < 0.14 ? Number.NaN : a + k / (x - x0)),
			curveLabel: '(C_f)',
			asymptotes: [
				{ kind: 'vertical', value: x0, label: `x = ${x0}`, color: '#dc2626' },
				{ kind: 'horizontal', value: a, label: `y = ${a}`, color: '#059669' }
			],
			points: [
				{ x: x0, y: a, label: `Ω(${x0}, ${a})`, color: '#7c3aed' },
				{ x: xA, y: yA, label: `A(${xA}, ${yA})`, color: '#dc2626' }
			],
			tangents: [{ x: xA, y: yA, slope, color: '#d97706' }]
		});
		const plotUrl = saveSvgAsset(`3as_shared_lit_t3_homog_tg_${difficulty}_s${seed}`, plotSvg);

		const mcq = buildUniqueMcqOptions(
			`$${tgEqK}$`,
			[
				{
					text: `$y = ${linearKatex(-slope, yA + slope * xA, 'x')}$`,
					diagnosticFeedback: `تحقق من إشارة معامل التوجيه $f'(${xA}) = \\frac{${-k}}{(${d})^2} = ${slope}$.`
				},
				{
					text: `$y = ${linearKatex(slope, yA + slope * xA, 'x')}$`,
					diagnosticFeedback: `في معادلة المماس $y = f'(x_A)(x - x_A) + f(x_A)$ انتبه لعلامة الطرح أمام $x_A$.`
				},
				{
					text: `$y = ${linearKatex(slope, intercept + 2 * d, 'x')}$`,
					diagnosticFeedback: `أعد حساب $f(${xA}) - (${slope})(${xA}) = ${intercept}$.`
				},
				{
					text: `$${tgEqBK}$`,
					diagnosticFeedback: `هذه معادلة المماس الموازي عند النقطة النظيرة $B(${xB} ; ${yB})$ وليست عند $A$.`
				}
			],
			rng
		);

		const quizQuestion: QuizQuestionPayload = {
			type: 'mcq',
			questionText: `ما معادلة المماس $(T)$ لمنحنى الدالة $f(x) = ${fExprK}$ عند النقطة $A$ ذات الفاصلة $x_A = ${xA}$ ؟`,
			questionTextAr: `عيّن معادلة المماس $(T)$ للمنحنى $(\\mathcal{C}_f)$ عند النقطة $A$ ذات الفاصلة $x_A = ${xA}$ :`,
			imageUrl: plotUrl,
			imageCaption: 'منحنى الدالة مع مركز التناظر والمماس عند النقطة A',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `نجد $f(${xA}) = ${yA}$ و $f'(${xA}) = ${slope}$، ثم نطبق $y = f'(${xA})(x - (${xA})) + f(${xA})$ فنجد $${tgEqK}$.`
		};

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `لتكن الدالة $f$ المعرفة على $D_f = bb(R) - {${x0}}$ بـ: $f(x) = ${fExprT}$ ، وليكن $(C_f)$ منحناها البياني.`,
			content: [
				{
					type: 'text',
					content: `1) احسب $f'(x)$ ثم عيّن معادلة المماس $(T)$ للمنحنى $(C_f)$ عند النقطة $A$ ذات الفاصلة $x_A = ${xA}$.`,
					answer: `1) $f'(x) = frac(${-k}, (${fDen})^2)$ ، ومنه $f(${xA}) = ${yA}$ و $f'(${xA}) = ${slope}$ .\nمعادلة المماس: $y = ${slope}(x ${xA >= 0 ? `- ${xA}` : `+ ${Math.abs(xA)}`}) + (${yA}) arrow.r.double (T): ${tgEqT}$ .`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `2) تحقق أنه من أجل كل $x in D_f$: $f(x) = ${a} + frac(${k}, ${fDen})$.`,
					answer: `2) بتوحيد المقامات: $${a} + frac(${k}, ${fDen}) = frac(${a}(${fDen}) + (${k}), ${fDen}) = frac(${fNumT}, ${fDen}) = f(x)$ .`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) بيّن أن النقطة $Omega (${x0} ; ${a})$ هي مركز تناظر للمنحنى $(C_f)$.`,
					answer: `3) من أجل كل $x in D_f$ لدينا $(${2 * x0} - x) in D_f$ و:\n$f(${2 * x0} - x) + f(x) = ${a} + frac(${k}, ${x0} - x) + ${a} + frac(${k}, x - ${x0}) = ${2 * a} = 2 times (${a})$ .\nإذن $Omega (${x0} ; ${a})$ مركز تناظر للمنحنى $(C_f)$ .`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `4) استنتج فاصلة النقطة $B$ من $(C_f)$ التي يكون عندها المماس $(T')$ موازياً لـ $(T)$، واكتب معادلته.`,
					answer: `4) بالتناظر حول $Omega$ أو بحل $f'(x) = ${slope}$ ($x eq ${xA}$)، نجد $B (${xB} ; ${yB})$ ومعادلة المماس الموازي $(T'): ${tgEqBT}$ .`,
					mark: '1'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_lp',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`تُحسب معادلة المماس $(T)$ عند الفاصلة $x_A = ${xA}$ بالعلاقة $y = f'(${xA})(x - ${xA}) + f(${xA})$.`,
				`بما أن $f'(x) = \\frac{${-k}}{(${fDen})^2}$، فإن $f'(${xA}) = ${slope}$ و $f(${xA}) = ${yA}$.`,
				`لإثبات أن $\\Omega(${x0} ; ${a})$ مركز تناظر، تحقق أن $f(${2 * x0} - x) + f(x) = ${2 * a}$.`
			],
			solutionStepsAr: [
				`1. **المشتقة ومعادلة المماس**: $f(${xA}) = ${yA}$ و $f'(${xA}) = ${slope} \\implies (T): ${tgEqK}$.`,
				`2. **التفكيك ومركز التناظر**: $f(x) = ${a} + \\frac{${k}}{${fDen}}$، ومنه $f(${2 * x0} - x) + f(x) = ${2 * a}$، إذن $\\Omega(${x0} ; ${a})$ مركز تناظر.`,
				`3. **المماس الموازي**: النقطة النظيرة $B(${xB} ; ${yB})$ تقبل مماساً موازياً $(T'): ${tgEqBK}$.`
			],
			finalAnswer: `المماس $(T): ${tgEqK}$، ومركز التناظر $\\Omega(${x0} ; ${a})$`
		};
	}
};

// ============================================================================
// Template 3: المتتاليات التراجعية الممزوجة والمواقف الإدماجية
// ============================================================================
const tplRecursiveSequence: ParameterizedTemplate = {
	id: 'tpl_3as_shared_lit_t3_recursive_sequence',
	grade: '3as_lp',
	trimesterId: 't3',
	domain: 'algebra',
	titleAr: 'المتتاليات التراجعية u_{n+1} = αu_n + β والمسائل الإدماجية',
	curriculumLessonId: 'lesson_3as_shared_lit_t3_recursive_mixed_sequences',
	defaultPoints: 5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const isContextual = difficulty === 'hard' || rng.next() < 0.45;

		let p = 1;
		let q = 2;
		let L = 4;
		let beta = 2;
		let u0 = 8;
		let alphaVal = 0.5;
		let alphaK = '\\frac{1}{2}';
		let alphaT = 'frac(1, 2)';
		let u1 = 6;
		let u2 = 5;

		if (isContextual) {
			// Contextual BAC modeling (strictly non-interest: municipal library books)
			const fracChoice = rng.pick([
				{ p: 1, q: 2 },
				{ p: 2, q: 3 },
				{ p: 4, q: 5 }
			]);
			p = fracChoice.p;
			q = fracChoice.q;
			alphaVal = p / q;
			alphaK = `\\frac{${p}}{${q}}`;
			alphaT = `frac(${p}, ${q})`;
			const mL = rng.int(10, 25);
			L = q * mL;
			beta = mL * (q - p);
			const deltaSign = rng.pick([-1, 1]);
			const mult = rng.pick([1, 2]);
			const candidateDelta = deltaSign * mult * q * q;
			const safeDelta = L + candidateDelta <= 0 ? mult * q * q : candidateDelta;
			u0 = L + safeDelta;
			u1 = Math.round(alphaVal * u0 + beta);
			u2 = Math.round(alphaVal * u1 + beta);
		} else {
			const divergent = difficulty !== 'easy' && rng.next() < 0.35;
			if (divergent) {
				p = rng.pick([2, 3]);
				q = 1;
				alphaVal = p;
				alphaK = `${p}`;
				alphaT = `${p}`;
				L = rng.pick([-3, -2, -1, 1, 2, 3]);
				beta = L * (1 - p);
				const v0Diff = rng.pick([-2, -1, 1, 2]);
				u0 = L + v0Diff;
				u1 = p * u0 + beta;
				u2 = p * u1 + beta;
			} else {
				const fracChoice = rng.pick([
					{ p: 1, q: 2 },
					{ p: 1, q: 3 },
					{ p: 2, q: 3 }
				]);
				p = fracChoice.p;
				q = fracChoice.q;
				alphaVal = p / q;
				alphaK = `\\frac{${p}}{${q}}`;
				alphaT = `frac(${p}, ${q})`;
				const mL = rng.pick([-2, -1, 1, 2, 3]);
				L = q * mL;
				beta = mL * (q - p);
				const k0 = rng.pick([-2, -1, 1, 2]);
				u0 = L + k0 * q * q;
				u1 = Math.round(alphaVal * u0 + beta);
				u2 = Math.round(alphaVal * u1 + beta);
			}
		}

		const v0 = u0 - L;
		const valsForPlot = [u0, u1, u2, L];
		const minPlot = Math.floor(Math.min(...valsForPlot)) - 2;
		const maxPlot = Math.ceil(Math.max(...valsForPlot)) + 2;

		const cobwebSvg = svgCobwebSequencePlot({
			xMin: minPlot,
			xMax: maxPlot,
			yMin: minPlot,
			yMax: maxPlot,
			fn: (x) => alphaVal * x + beta,
			u0,
			steps: 3,
			fixedPoint: L
		});
		const cobwebUrl = saveSvgAsset(`3as_shared_lit_t3_cobweb_${difficulty}_s${seed}`, cobwebSvg);

		const contextIntroK = isContextual
			? `تحتوي مكتبة بلدية مطلع سنة $2026$ على $${u0}$ كتاباً. في كل سنة يتم التبرع بـ $\\frac{${q - p}}{${q}}$ من الكتب القديمة لجمعيات محلية وتقتني البلدية $${beta}$ كتاباً جديداً. نرمز بـ $u_n$ لعدد الكتب بعد $n$ سنة ($u_0 = ${u0}$)، حيث $u_{n+1} = ${alphaK} u_n + ${beta}$.`
			: `لتكن $(u_n)$ المتتالية العددية المعرفة بحدها الأول $u_0 = ${u0}$ وبالعلاقة التراجعية: $u_{n+1} = ${alphaK} u_n ${beta >= 0 ? `+ ${beta}` : `- ${Math.abs(beta)}`}$.`;

		const contextIntroT = isContextual
			? `تحتوي مكتبة بلدية مطلع سنة $2026$ على $${u0}$ كتاباً. في كل سنة يتم التبرع بـ $frac(${q - p}, ${q})$ من الكتب القديمة وتبقى نسبة $frac(${p}, ${q})$، كما تقتني البلدية $${beta}$ كتاباً جديداً. نرمز بـ $u_n$ لعدد الكتب بعد $n$ سنة ($u_0 = ${u0}$)، حيث $u_(n+1) = ${alphaT} u_n + ${beta}$.`
			: `لتكن $(u_n)$ المتتالية العددية المعرفة بحدها الأول $u_0 = ${u0}$ ومن أجل كل عدد طبيعي $n$: $u_(n+1) = ${alphaT} u_n ${beta >= 0 ? `+ ${beta}` : `- ${Math.abs(beta)}`}$.`;

		const vnDefT = L >= 0 ? `v_n = u_n - ${L}` : `v_n = u_n + ${Math.abs(L)}`;
		const limStatementK =
			alphaVal < 1
				? `بما أن $-1 < ${alphaK} < 1$ فإن $\\lim_{n \\to +\\infty} \\left(${alphaK}\\right)^n = 0$، ومنه $\\lim_{n \\to +\\infty} u_n = ${L}$.`
				: `بما أن $q = ${alphaK} > 1$ و $v_0 = ${v0} \\neq 0$، فإن المتتالية $(u_n)$ متباعدة نحو ${v0 > 0 ? '+\\infty' : '-\\infty'}.`;
		const limStatementT =
			alphaVal < 1
				? `بما أن $q = ${alphaT} in ]-1 ; 1[$ فإن $lim_(n arrow.r +oo) u_n = ${L}$، أي ${isContextual ? `يستقر مخزون الكتب على المدى الطويل عند $${L}$ كتاباً.` : 'المتتالية متقاربة نحو ' + L + '.'}`
				: `بما أن $q = ${alphaT} > 1$ و $v_0 = ${v0} eq 0$، فالمتتالية $(u_n)$ متباعدة.`;

		const quizQuestion: QuizQuestionPayload = {
			type: 'calculated',
			questionText: `${contextIntroK}\nاحسب قيمة الحد $u_2$ :`,
			questionTextAr: `احسب $u_2$ علماً أن $u_0 = ${u0}$ و $u_{n+1} = ${alphaK} u_n ${beta >= 0 ? `+ ${beta}` : `- ${Math.abs(beta)}`}$ :`,
			imageUrl: cobwebUrl,
			imageCaption: 'التمثيل البياني للحدود الأولى على المستقيمين y = x و y = αx + β',
			questionData: {
				answer: u2,
				displayTemplate: 'u_2 = ?',
				variables: [],
				tolerance: 0
			},
			explanation: `نحسب $u_1 = ${alphaK}(${u0}) ${beta >= 0 ? `+ ${beta}` : `- ${Math.abs(beta)}`} = ${u1}$ ثم $u_2 = ${alphaK}(${u1}) ${beta >= 0 ? `+ ${beta}` : `- ${Math.abs(beta)}`} = ${u2}$.`
		};

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: contextIntroT,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) احسب كلاً من الحدين $u_1$ و $u_2$.\n2) نضع من أجل كل عدد طبيعي $n$: $${vnDefT}$. بيّن أن $(v_n)$ هندسية يطلب تعيين أساسها $q$ وحدها الأول $v_0$.\n3) اكتب عبارة $v_n$ ثم استنتج عبارة $u_n$ بدلالة $n$.\n4) احسب $lim_(n arrow.r +oo) u_n$ ${isContextual ? 'وفسّر النتيجة.' : 'واستنتج تقارب أو تباعد $(u_n)$.'}`,
							answer: `1) $u_1 = ${u1}$ و $u_2 = ${u2}$ .\n2) $v_(n+1) = u_(n+1) ${L >= 0 ? `- ${L}` : `+ ${Math.abs(L)}`} = ${alphaT} v_n$، إذن $(v_n)$ هندسية أساسها $q = ${alphaT}$ وحدها الأول $v_0 = ${v0}$ .\n3) $v_n = ${v0} times (${alphaT})^n$ ، ومنه $u_n = ${v0} times (${alphaT})^n ${L >= 0 ? `+ ${L}` : `- ${Math.abs(L)}`}$ .\n4) ${limStatementT}`,
							mark: '5'
						},
						{
							type: 'image',
							src: cobwebUrl,
							caption: 'التمثيل البياني التراجعي للمتتالية'
						}
					]
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_lp',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`احسب $u_1$ بتعويض $u_0 = ${u0}$ في العلاقة التراجعية، ثم احسب $u_2$ بتعويض $u_1$.`,
				`لإثبات أن $(v_n)$ هندسية، احسب $v_{n+1} = u_{n+1} ${L >= 0 ? `- ${L}` : `+ ${Math.abs(L)}`}$ وأخرج العامل المشترك $${alphaK}$.`,
				`عبارة الحد العام هي $v_n = ${v0} \\times (${alphaK})^n$، ومنه $u_n = v_n ${L >= 0 ? `+ ${L}` : `- ${Math.abs(L)}`}$.`
			],
			solutionStepsAr: [
				`1. **الحدود الأولى**: $u_1 = ${u1}$ و $u_2 = ${u2}$.`,
				`2. **طبيعة $(v_n)$**: $v_{n+1} = ${alphaK} v_n$، إذن $(v_n)$ هندسية أساسها $q = ${alphaK}$ وحدها الأول $v_0 = ${v0}$.`,
				`3. **عبارة الحد العام والنهاية**: $u_n = ${v0}\\left(${alphaK}\\right)^n ${L >= 0 ? `+ ${L}` : `- ${Math.abs(L)}`}$. ${limStatementK}`
			],
			finalAnswer: `$u_2 = ${u2}$، $v_0 = ${v0}$، $q = ${alphaK}$، $u_n = ${v0}\\left(${alphaK}\\right)^n ${L >= 0 ? `+ ${L}` : `- ${Math.abs(L)}`}$`
		};
	}
};

// ============================================================================
// Template 4: الموافقات المتقدمة وتطبيقات التواريخ والأعداد الكبيرة في البكالوريا
// ============================================================================
const tplAdvancedCongruencesDates: ParameterizedTemplate = {
	id: 'tpl_3as_shared_lit_t3_advanced_congruences_dates',
	grade: '3as_lp',
	trimesterId: 't3',
	domain: 'arithmetic_z',
	titleAr: 'الموافقات المتقدمة وتطبيقات البواقي والأيام في البكالوريا',
	curriculumLessonId: 'lesson_3as_shared_lit_t3_advanced_congruences_dates_bac',
	defaultPoints: 5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const useWeekday = rng.next() < 0.5 && difficulty !== 'easy';

		if (useWeekday) {
			const aSpec = rng.pick([
				{ a: 2, period: 3, rems: [1, 2, 4] },
				{ a: 4, period: 3, rems: [1, 4, 2] },
				{ a: 3, period: 6, rems: [1, 3, 2, 6, 4, 5] },
				{ a: 5, period: 6, rems: [1, 5, 4, 6, 2, 3] }
			]);
			const qMult = rng.int(20, 45);
			const A = 7 * qMult + aSpec.a;
			const yearExp = rng.pick([2025, 2026, 2027, 2028]);
			const rExp = yearExp % aSpec.period;
			const remPow = aSpec.rems[rExp];
			const startIdx = rng.int(0, 6);
			const startDay = WEEKDAYS_AR[startIdx];
			const targetIdx = (startIdx + remPow) % 7;
			const targetDay = WEEKDAYS_AR[targetIdx];

			const wrongDays = rng.shuffle(WEEKDAYS_AR.filter((_, i) => i !== targetIdx));
			const mcq = buildUniqueMcqOptions(
				targetDay,
				wrongDays.slice(0, 4).map((day) => ({
					text: day,
					diagnosticFeedback: `أضف الباقي $${remPow}$ إلى ترتيب يوم ${startDay} بترديد $7$ لتحصل على يوم ${targetDay}.`
				})),
				rng
			);

			const cyclePairs = aSpec.rems
				.map((r, i) => `${aSpec.a}^{${i}} \\equiv ${r} \\pmod{7}`)
				.join('\\;،\\;');
			const cycleTypst = aSpec.rems.map((r, i) => `$${aSpec.a}^${i} equiv ${r} [7]$`).join(' ، ');

			const quizQuestion: QuizQuestionPayload = {
				type: 'mcq',
				questionText: `إذا كان اليوم هو **${startDay}**، فما هو اليوم الموافق بعد مرور $${A}^{${yearExp}}$ يوماً؟`,
				questionTextAr: `ما هو اليوم الموافق بعد $${A}^{${yearExp}}$ يوماً انطلاقاً من يوم **${startDay}** ؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `لدينا $${A} \\equiv ${aSpec.a} \\pmod{7}$ ودور قوى $${aSpec.a}$ هو $${aSpec.period}$، ومنه $${A}^{${yearExp}} \\equiv ${remPow} \\pmod{7}$، وبعد $${remPow}$ أيام من **${startDay}** نصل إلى **${targetDay}**.`
			};

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `تطبيقات الموافقات بترديد $7$ على الأيام والأعداد الكبيرة.`,
				content: [
					{
						type: 'text',
						content: `1) عيّن باقي القسمة الإقليدية للعدد $${A}$ على $7$.`,
						answer: `1) لدينا $${A} = 7 times ${qMult} + ${aSpec.a}$ ، إذن $${A} equiv ${aSpec.a} [7]$ والباقي هو $${aSpec.a}$ .`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) ادرس حسب قيم العدد الطبيعي $n$ بواقي القسمة الإقليدية للعدد $${aSpec.a}^n$ على $7$.`,
						answer: `2) الدور هو $p = ${aSpec.period}$ : ${cycleTypst} .`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) استنتج باقي القسمة الإقليدية للعدد $${A}^(${yearExp})$ على $7$.`,
						answer: `3) $${yearExp} = ${aSpec.period} times ${Math.floor(yearExp / aSpec.period)} + ${rExp}$ ، ومنه $${A}^(${yearExp}) equiv ${aSpec.a}^(${rExp}) equiv ${remPow} [7]$ .`,
						mark: '1.25'
					},
					{
						type: 'text',
						content: `4) إذا صادف اليوم الأول من شهر معين يوم **${startDay}**، فما هو اليوم الموافق بعد مرور $${A}^(${yearExp})$ يوماً؟`,
						answer: `4) بما أن الباقي بترديد $7$ هو $${remPow}$، فبعد $${remPow}$ أيام من يوم **${startDay}** يكون اليوم هو **${targetDay}**.`,
						mark: '1.25'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints: [
					`نحسب باقي قسمة $${A}$ على $7$ فنجد $${A} \\equiv ${aSpec.a} \\pmod{7}$.`,
					`دور بواقي قوى $${aSpec.a}$ بترديد $7$ هو $d = ${aSpec.period}$ لأن $${aSpec.a}^{${aSpec.period}} \\equiv 1 \\pmod{7}$.`,
					`بما أن $${yearExp} = ${aSpec.period} \\times ${Math.floor(yearExp / aSpec.period)} + ${rExp}$، نضيف الباقي $${remPow}$ إلى يوم **${startDay}**.`
				],
				solutionStepsAr: [
					`1. **الموافقة الأولية**: $${A} \\equiv ${aSpec.a} \\pmod{7}$.`,
					`2. **دورية البواقي بترديد $7$**: $${cyclePairs}$ (الدور $p = ${aSpec.period}$).`,
					`3. **تطبيق على الأس**: $${A}^{${yearExp}} \\equiv ${aSpec.a}^{${rExp}} \\equiv ${remPow} \\pmod{7}$.`,
					`4. **تحديد اليوم**: بإضافة $${remPow}$ أيام إلى **${startDay}** نحصل على **${targetDay}**.`
				],
				finalAnswer: `$${A}^{${yearExp}} \\equiv ${remPow} \\pmod{7}$، واليوم الموافق هو **${targetDay}**`
			};
		}

		// Standard BAC modulo m large expression & congruence equation
		const specs = [
			{ m: 5, a: 2, period: 4, rems: [1, 2, 4, 3] },
			{ m: 5, a: 3, period: 4, rems: [1, 3, 4, 2] },
			{ m: 7, a: 2, period: 3, rems: [1, 2, 4] },
			{ m: 9, a: 4, period: 3, rems: [1, 4, 7] },
			{ m: 11, a: 3, period: 5, rems: [1, 3, 9, 5, 4] }
		];
		const spec = rng.pick(difficulty === 'easy' ? specs.slice(0, 3) : specs);
		const m = spec.m;
		const a = spec.a;
		const qA = rng.int(15, 60);
		const A = m * qA + a;
		const qB = rng.int(10, 40);
		const B = m * qB + (m - 1); // B ≡ -1 (mod m)

		const expA = rng.pick([2025, 2026, 2027, 2028]);
		const expB = rng.pick([1445, 1446, 1447, 2025]);
		const rExpA = expA % spec.period;
		const powARem = spec.rems[rExpA];
		const powBRem = expB % 2 === 0 ? 1 : m - 1;
		const cAdd = rng.int(1, m - 1);
		const totalRem = (powARem + powBRem + cAdd) % m;

		const targetR = rng.pick(spec.rems);
		const solIdx = spec.rems.indexOf(targetR);
		const eqConst = (m - targetR) % m;

		const cycleK = spec.rems.map((r, i) => `${a}^{${i}} \\equiv ${r} \\pmod{${m}}`).join('\\;،\\;');
		const cycleT = spec.rems.map((r, i) => `$${a}^${i} equiv ${r} [${m}]$`).join(' ، ');

		const quizQuestion: QuizQuestionPayload = {
			type: 'calculated',
			questionText: `ما هو باقي القسمة الإقليدية للعدد $N = ${A}^{${expA}} + ${B}^{${expB}} + ${cAdd}$ على $${m}$ ؟`,
			questionTextAr: `عيّن باقي قسمة $N = ${A}^{${expA}} + ${B}^{${expB}} + ${cAdd}$ على $${m}$ :`,
			questionData: {
				answer: totalRem,
				displayTemplate: 'R = ?',
				variables: [],
				tolerance: 0
			},
			explanation: `نستخدم $${A} \\equiv ${a} \\pmod{${m}}$ (دور ${spec.period}) و $${B} \\equiv -1 \\pmod{${m}}$، فنجد $N \\equiv ${powARem} + ${powBRem} + ${cAdd} \\equiv ${totalRem} \\pmod{${m}}$.`
		};

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `تطبيقات الموافقات بترديد $${m}$ وحل المعادلات في البكالوريا.`,
			content: [
				{
					type: 'text',
					content: `1) عيّن باقي قسمة كل من العددين $${A}$ و $${B}$ على $${m}$، ثم بيّن أن $${B} equiv -1 [${m}]$.`,
					answer: `1) $${A} equiv ${a} [${m}]$ و $${B} equiv ${m - 1} equiv -1 [${m}]$ .`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) ادرس حسب قيم العدد الطبيعي $n$ بواقي قسمة $${a}^n$ على $${m}$.`,
					answer: `2) الدور هو $p = ${spec.period}$ : ${cycleT} .`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `3) استنتج باقي القسمة الإقليدية للعدد $N = ${A}^(${expA}) + ${B}^(${expB}) + ${cAdd}$ على $${m}$.`,
					answer: `3) $N equiv ${powARem} + (${expB % 2 === 0 ? 1 : -1}) + ${cAdd} equiv ${totalRem} [${m}]$ ، فالباقي هو $${totalRem}$ .`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `4) عيّن قيم العدد الطبيعي $n$ بحيث يكون: $${a}^n + ${eqConst} equiv 0 [${m}]$.`,
					answer: `4) $${a}^n equiv ${targetR} [${m}] arrow.r.double n = ${spec.period} k + ${solIdx}$ حيث $k in bb(N)$ .`,
					mark: '1.25'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_lp',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`استعمل القسمة الإقليدية على $${m}$ لإيجاد باقي $${A}$ وباقي $${B}$ (انتبه أن $${B} \\equiv -1 \\pmod{${m}}$).`,
				`احسب دور قوى $${a}$ بترديد $${m}$ وهو $p = ${spec.period}$.`,
				`في المعادلة $${a}^n + ${eqConst} \\equiv 0 \\pmod{${m}}$ نحصل على $${a}^n \\equiv ${targetR} \\pmod{${m}}$ ثم نقرأ $n$ من جدول البواقي.`
			],
			solutionStepsAr: [
				`1. **البواقي الأولية**: $${A} \\equiv ${a} \\pmod{${m}}$ و $${B} \\equiv -1 \\pmod{${m}}$.`,
				`2. **جدول بواقي $${a}^n$**: $${cycleK}$ (الدور $p = ${spec.period}$).`,
				`3. **باقي $N$**: $N \\equiv ${powARem} + ${powBRem} + ${cAdd} \\equiv ${totalRem} \\pmod{${m}}$.`,
				`4. **حل المعادلة**: $n = ${spec.period}k + ${solIdx}$ ($k \\in \\mathbb{N}$).`
			],
			finalAnswer: `باقي $N$ على $${m}$ هو $${totalRem}$، وحل المعادلة $n = ${spec.period}k + ${solIdx}$ ($k \\in \\mathbb{N}$)`
		};
	}
};

// ============================================================================
// Template 5: مسألة بكالوريا شاملة حول دالة تناظرية والمناقشة البيانية (8 نقاط)
// ============================================================================
const tplIntegrationHomographicBac: ParameterizedTemplate = {
	id: 'tpl_3as_shared_lit_t3_integration_homographic_bac',
	grade: '3as_lp',
	trimesterId: 't3',
	domain: 'integration',
	isIntegration: true,
	titleAr: 'مسألة بكالوريا نموذجية (08 نقاط): دراسة شاملة لدالة تناظرية والمناقشة البيانية',
	curriculumLessonId: 'lesson_3as_shared_lit_t3_bac_comprehensive_synthesis',
	defaultPoints: 8,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const x0 = rng.pick([-2, -1, 1, 2]);
		const aBase = rng.pick([-2, -1, 1, 2]);
		const d = rng.pick(difficulty === 'easy' ? [1] : [-1, 1, 2]);
		const cK = Math.abs(d) === 2 ? rng.pick([-2, 2]) : rng.pick([-2, -1, 1, 2]);
		const aSafe = Math.abs(d) === 2 ? (aBase > 0 ? 2 : -2) : aBase;
		const kSafe = aSafe * cK;
		const b = kSafe - aSafe * x0; // ax + b = aSafe*(x - (x0 - cK)) => exact integer root xOx = x0 - cK
		const xOx = x0 - cK;

		const xA = x0 + d;
		const yA = aSafe + kSafe / d;
		const derivNum = -kSafe;
		const slopeA = derivNum / (d * d);
		const interceptA = yA - slopeA * xA;

		const fNumK = linearKatex(aSafe, b, 'x');
		const fNumT = linearTypst(aSafe, b, 'x');
		const fDen = shiftParensKatex(x0);
		const fExprK = `\\frac{${fNumK}}{${fDen}}`;
		const fExprT = `frac(${fNumT}, ${fDen})`;

		const isInc = derivNum > 0;
		const signChar = isInc ? '+' : '-';
		const limLeftK = isInc ? '+\\infty' : '-\\infty';
		const limRightK = isInc ? '-\\infty' : '+\\infty';
		const limLeftT = isInc ? '+oo' : '-oo';
		const limRightT = isInc ? '-oo' : '+oo';

		const y0FracK = fracKatex(b, -x0);
		const y0FracT = fracTypst(b, -x0);
		const tgEqK = `y = ${linearKatex(slopeA, interceptA, 'x')}`;
		const tgEqT = `y = ${linearTypst(slopeA, interceptA, 'x')}`;

		const lowRoot = Math.min(xOx, x0);
		const highRoot = Math.max(xOx, x0);
		const fPosSetK =
			aSafe > 0
				? `${lowRoot === xOx ? `]-\\infty ; ${lowRoot}]` : `]-\\infty ; ${lowRoot}[`} \\cup ${highRoot === xOx ? `[${highRoot} ; +\\infty[` : `]${highRoot} ; +\\infty[`}`
				: xOx < x0
					? `[${xOx} ; ${x0}[`
					: `]${x0} ; ${xOx}]`;
		const fPosSetT =
			aSafe > 0
				? `${lowRoot === xOx ? `]-oo ; ${lowRoot}]` : `]-oo ; ${lowRoot}[`} union ${highRoot === xOx ? `[${highRoot} ; +oo[` : `]${highRoot} ; +oo[`}`
				: xOx < x0
					? `[${xOx} ; ${x0}[`
					: `]${x0} ; ${xOx}]`;

		const varSvg = svgVariationTable({
			fnName: 'f(x)',
			derivName: "f'(x)",
			xValues: ['-∞', `${x0}`, '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: signChar },
				{ kind: 'sign', value: '||' },
				{ kind: 'sign', value: signChar }
			],
			variations: [
				{ value: `${aSafe}`, position: isInc ? 'bottom' : 'top' },
				{ value: isInc ? '+∞    -∞' : '-∞    +∞', position: 'mid' },
				{ value: `${aSafe}`, position: isInc ? 'top' : 'bottom' }
			]
		});
		saveSvgAsset(`3as_shared_lit_t3_int_homog_var_${difficulty}_s${seed}`, varSvg);

		const curveSvg = svgFunctionCurvePlot({
			xMin: Math.min(x0, xOx) - 4,
			xMax: Math.max(x0, xOx) + 4,
			yMin: Math.min(aSafe - Math.abs(kSafe) - 2, yA - 2, -5),
			yMax: Math.max(aSafe + Math.abs(kSafe) + 2, yA + 2, 5),
			fn: (x) => (Math.abs(x - x0) < 0.14 ? Number.NaN : aSafe + kSafe / (x - x0)),
			curveLabel: '(C_f)',
			asymptotes: [
				{ kind: 'vertical', value: x0, label: `x = ${x0}`, color: '#dc2626' },
				{ kind: 'horizontal', value: aSafe, label: `y = ${aSafe}`, color: '#059669' }
			],
			points: [
				{ x: x0, y: aSafe, label: `Ω(${x0}, ${aSafe})`, color: '#7c3aed' },
				{ x: xOx, y: 0, label: `(${xOx}, 0)`, color: '#15803d' },
				{ x: xA, y: yA, label: `A(${xA}, ${yA})`, color: '#dc2626' }
			],
			tangents: [{ x: xA, y: yA, slope: slopeA, color: '#d97706' }]
		});
		const curveUrl = saveSvgAsset(
			`3as_shared_lit_t3_int_homog_curve_${difficulty}_s${seed}`,
			curveSvg
		);

		const correctDisc = `$m = ${aSafe}$ (لا حلول)، و $m \\neq ${aSafe}$ (حل وحيد)`;
		const mcq = buildUniqueMcqOptions(
			correctDisc,
			[
				{
					text: `$m = ${x0}$ (لا حلول)، و $m \\neq ${x0}$ (حل وحيد)`,
					diagnosticFeedback: `$x = ${x0}$ هو المقارب العمودي، بينما نناقش المعادلة $f(x) = m$ عبر المستقيمات الأفقية $y = m$ ومقاربها $y = ${aSafe}$.`
				},
				{
					text: `$m = ${aSafe}$ (حل وحيد)، و $m \\neq ${aSafe}$ (حلان)`,
					diagnosticFeedback: `المقارب الأفقي $y = ${aSafe}$ لا يقطع المنحنى أبداً، وكل مستقيم أفقي آخر يقطع المنحنى مرة واحدة فقط.`
				},
				{
					text: `$m < ${aSafe}$ (لا حلول)، و $m > ${aSafe}$ (حلان)`,
					diagnosticFeedback: `الدالة التناظرية تأخذ قيماً أكبر وأصغر من $${aSafe}$ في آنٍ واحد على فرعيها.`
				},
				{
					text: `$m = ${yA}$ (لا حلول)، و $m \\neq ${yA}$ (حل وحيد)`,
					diagnosticFeedback: `$${yA}$ هو ترتيب نقطة المماس $A$ وليس المقارب الأفقي.`
				}
			],
			rng
		);

		const quizQuestion: QuizQuestionPayload = {
			type: 'mcq',
			questionText: `من البيان وجدول تغيرات الدالة $f(x) = ${fExprK}$، ما هي المناقشة الصحيحة لعدد حلول المعادلة $f(x) = m$ حسب الوسيط $m \\in \\mathbb{R}$ ؟`,
			questionTextAr: `ناقش عدد حلول المعادلة $f(x) = m$ لدالة $f(x) = ${fExprK}$ :`,
			imageUrl: curveUrl,
			imageCaption: 'منحنى الدالة التناظرية والمقاربان والمماس (T)',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `المستقيم المقارب الأفقي $y = ${aSafe}$ لا يتقاطع مع $(\\mathcal{C}_f)$ لذا تنعدم الحلول عند $m = ${aSafe}$، ويقطع أي مستقيم أفقي آخر $y = m$ ($m \\neq ${aSafe}$) المنحنى في نقطة وحيدة.`
		};

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر الدالة $f$ المعرفة على $D_f = bb(R) - {${x0}}$ بـ: $f(x) = ${fExprT}$ ، و $(C_f)$ تمثيلها البياني في معلم متعامد ومتجانس $(O ; arrow(i), arrow(j))$.`,
			content: [
				{
					type: 'text',
					content: `1) احسب نهايات $f$ عند حدود مجموعة التعريف $D_f$، ثم استنتج معادلتي المستقيمين المقاربين $(D_1)$ و $(D_2)$.`,
					answer: `1) $lim_(x arrow.r -oo) f(x) = lim_(x arrow.r +oo) f(x) = ${aSafe}$، و $lim_(x arrow.r ${x0}^(-)) f(x) = ${limLeftT}$، و $lim_(x arrow.r ${x0}^(+)) f(x) = ${limRightT}$ .\nالمقاربان: الأفقي $(D_1): y = ${aSafe}$ والعمودي $(D_2): x = ${x0}$ .`,
					mark: '2'
				},
				{
					type: 'text',
					content: `2) احسب $f'(x)$ وادرس إشارتها، ثم شكل جدول تغيرات الدالة $f$.`,
					answer: `2) $f'(x) = frac(${derivNum}, (${fDen})^2)$، إشارتها (${signChar}) دوماً؛ الدالة $f$ ${isInc ? 'متزايدة تماماً' : 'متناقصة تماماً'} على كل من $]-oo ; ${x0}[$ و $]${x0} ; +oo[$ .`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `3) عيّن نقطتي تقاطع $(C_f)$ مع محوري الإحداثيات، ثم اكتب معادلة المماس $(T)$ لـ $(C_f)$ عند النقطة $A$ ذات الفاصلة $x_A = ${xA}$.`,
					answer: `3) التقاطع مع $(O x)$: $(${xOx} ; 0)$، والتقاطع مع $(O y)$: $(0 ; ${y0FracT})$ .\nالمماس عند $x_A = ${xA}$: $f(${xA}) = ${yA}$ و $f'(${xA}) = ${slopeA}$، ومنه $(T): ${tgEqT}$ .`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `4) بيّن أن النقطة $Omega (${x0} ; ${aSafe})$ هي مركز تناظر للمنحنى $(C_f)$، ثم ارسم $(D_1)$، $(D_2)$، $(T)$ و $(C_f)$.`,
					answer: `4) من أجل كل $x in D_f$: $(${2 * x0} - x) in D_f$ و $f(${2 * x0} - x) + f(x) = ${2 * aSafe}$، إذن $Omega (${x0} ; ${aSafe})$ مركز تناظر لـ $(C_f)$ .`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `5) أ) ناقش بيانياً حسب قيم الوسيط الحقيقي $m$ عدد حلول المعادلة $f(x) = m$.\nب) حل بيانياً وجبرياً المتراجحة $f(x) >= 0$.`,
					answer: `5) أ) من أجل $m = ${aSafe}$: لا توجد حلول. من أجل $m eq ${aSafe}$: حل وحيد.\nب) $f(x) >= 0$ على المجموعة $S = ${fPosSetT}$ .`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_lp',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`ابدأ بالنهايات عند $\\pm\\infty$ وعند $x_0 = ${x0}$ بقيم أصغر وبقيم أكبر لتعيين المقاربين.`,
				`المشتقة $f'(x) = \\frac{${derivNum}}{(${fDen})^2}$ ثابتة الإشارة دوماً.`,
				`للمناقشة البيانية $f(x) = m$: المستقيم المقارب $y = ${aSafe}$ لا يقطع المنحنى أبداً.`
			],
			solutionStepsAr: [
				`1. **النهايات والمقاربان**: $y = ${aSafe}$ و $x = ${x0}$ ($\\lim_{x \\to ${x0}^-} f = ${limLeftK}$, $\\lim_{x \\to ${x0}^+} f = ${limRightK}$).`,
				`2. **المشتقة**: $f'(x) = \\frac{${derivNum}}{(${fDen})^2}$، فالدالة ${isInc ? 'متزايدة تماماً' : 'متناقصة تماماً'} على كل مجال.`,
				`3. **التقاطعات والمماس ومركز التناظر**: مع $(Ox)$ عند $${xOx}$، مع $(Oy)$ عند $${y0FracK}$، المماس $${tgEqK}$، مركز التناظر $\\Omega(${x0} ; ${aSafe})$.`,
				`4. **المناقشة والإشارة**: لـ $m = ${aSafe}$ لا حلول ولـ $m \\neq ${aSafe}$ حل وحيد؛ $f(x) \\ge 0$ على $${fPosSetK}$.`
			],
			finalAnswer: `المقاربان: $x=${x0}, y=${aSafe}$؛ $f(x)=m$: لا حل لـ $m=${aSafe}$ وحل وحيد لـ $m \\neq ${aSafe}$`
		};
	}
};

// ============================================================================
// Template 6: مسألة بكالوريا شاملة — تعيين الثوابت ودراسة كثيرة حدود درجة 3 (8 نقاط)
// ============================================================================
const tplIntegrationBacMockCubic: ParameterizedTemplate = {
	id: 'tpl_3as_shared_lit_t3_integration_bac_mock_cubic',
	grade: '3as_lp',
	trimesterId: 't3',
	domain: 'integration',
	isIntegration: true,
	titleAr: 'مسألة بكالوريا نموذجية (08 نقاط): تعيين ثوابت كثيرة حدود ودراسة شاملة ومناقشة بيانية',
	curriculumLessonId: 'lesson_3as_shared_lit_t3_bac_comprehensive_synthesis',
	defaultPoints: 8,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const s = rng.pick([-1, 1]);
		const p = rng.pick(difficulty === 'easy' ? [-1, 1] : [-1, 1, 2]);
		const yI = rng.pick([-1, 0, 1, 2, 3]);

		// f(x) = s * ((x - p)^3 - 3(x - p)) + yI = s*x^3 + a*x^2 + b*x + c
		const a = -3 * s * p;
		const b = 3 * s * (p * p - 1);
		const c = s * (-p * p * p + 3 * p) + yI;

		// Extrema at x1 = p - 1, x2 = p + 1
		const x1 = p - 1;
		const x2 = p + 1;
		const y1 = yI + 2 * s;
		const y2 = yI - 2 * s;
		const yMin = yI - 2;
		const yMax = yI + 2;

		const dp2 = 3 * s;
		const dp1 = 2 * a;
		const dp0 = b;

		const slopeI = -3 * s;
		const tgIntercept = yI - slopeI * p;
		const tgEqK = `y = ${linearKatex(slopeI, tgIntercept, 'x')}`;
		const tgEqT = `y = ${linearTypst(slopeI, tgIntercept, 'x')}`;

		const fExprK = cubicKatex(s, a, b, c);
		const fExprT = cubicTypst(s, a, b, c);
		const fpExprK = quadKatex(dp2, dp1, dp0);
		const fpExprT = quadTypst(dp2, dp1, dp0);
		const unknownExprT = `${s === 1 ? 'x^3' : '-x^3'} + a x^2 + b x + c`;

		const sOut = s > 0 ? '+' : '-';
		const sIn = s > 0 ? '-' : '+';
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
				{ value: s > 0 ? '-∞' : '+∞', position: s > 0 ? 'bottom' : 'top' },
				{ value: `${y1}`, position: s > 0 ? 'top' : 'bottom' },
				{ value: `${y2}`, position: s > 0 ? 'bottom' : 'top' },
				{ value: s > 0 ? '+∞' : '-∞', position: s > 0 ? 'top' : 'bottom' }
			]
		});
		saveSvgAsset(`3as_shared_lit_t3_int_cubic_var_${difficulty}_s${seed}`, varSvg);

		const curveSvg = svgFunctionCurvePlot({
			xMin: x1 - 2,
			xMax: x2 + 2,
			yMin: Math.min(yMin, c) - 2,
			yMax: Math.max(yMax, c) + 2,
			fn: (x) => s * (x * x * x) + a * x * x + b * x + c,
			curveLabel: '(C_f)',
			points: [
				{ x: x1, y: y1, label: `(${x1}, ${y1})`, color: '#15803d' },
				{ x: p, y: yI, label: `Ω(${p}, ${yI})`, color: '#7c3aed' },
				{ x: x2, y: y2, label: `(${x2}, ${y2})`, color: '#dc2626' }
			],
			tangents: [{ x: p, y: yI, slope: slopeI, color: '#d97706' }]
		});
		const curveUrl = saveSvgAsset(
			`3as_shared_lit_t3_int_cubic_curve_${difficulty}_s${seed}`,
			curveSvg
		);

		const correctDisc = `$m \\in ]${yMin} ; ${yMax}[$`;
		const mcq = buildUniqueMcqOptions(
			correctDisc,
			[
				{
					text: `$m \\in [${yMin} ; ${yMax}]$`,
					diagnosticFeedback: `عند الحدين $m = ${yMin}$ و $m = ${yMax}$ يمس المستقيم الذروة فنجد حلين فقط (لا ثلاثة).`
				},
				{
					text: `$m \\in ]-\\infty ; ${yMin}[ \\cup ]${yMax} ; +\\infty[$`,
					diagnosticFeedback: `في هذا المجال يقطع المستقيم $y = m$ المنحنى في نقطة واحدة فقط.`
				},
				{
					text: `$m \\in \\{${yMin} ; ${yMax}\\}$`,
					diagnosticFeedback: `هذه مجموعة القيم التي تعطي حلين متمايزين فقط.`
				},
				{
					text: `$m \\in ]${x1} ; ${x2}[$`,
					diagnosticFeedback: `المناقشة الأفقية $y = m$ تقرأ على محور التراتيب بين القيمتين الحديتين $[${yMin} ; ${yMax}]$ لا على الفواصل.`
				}
			],
			rng
		);

		const limNeg = s > 0 ? '-\\infty' : '+\\infty';
		const limPos = s > 0 ? '+\\infty' : '-\\infty';
		const limNegT = s > 0 ? '-oo' : '+oo';
		const limPosT = s > 0 ? '+oo' : '-oo';

		const quizQuestion: QuizQuestionPayload = {
			type: 'mcq',
			questionText: `من جدول تغيرات ومنحنى الدالة $f(x) = ${fExprK}$، ما هي مجموعة قيم الوسيط الحقيقي $m$ التي تقبل من أجلها المعادلة $f(x) = m$ **ثلاثة حلول متمايزة**؟`,
			questionTextAr: `عيّن قيم $m$ حتى تقبل المعادلة $f(x) = m$ ثلاثة حلول متمايزة:`,
			imageUrl: curveUrl,
			imageCaption: 'منحنى الدالة التكعيبية مع القيمتين الحديتين ونقطة الانعطاف',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `تقبل المعادلة $f(x) = m$ ثلاثة حلول متمايزة عندما يقطع المستقيم الأفقي $y = m$ الفروع الثلاثة للمنحنى، أي عندما يكون $m \\in ]${yMin} ; ${yMax}[$.`
		};

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `مسألة بكالوريا نموذجية من جزأين حول دالة كثيرة حدود من الدرجة الثالثة.`,
			content: [
				{
					type: 'text',
					content: `*الجزء الأول:* نعتبر الدالة $f$ المعرفة على $bb(R)$ بـ: $f(x) = ${unknownExprT}$ حيث $a, b, c$ أعداد حقيقية.\nعيّن $a$ و $b$ و $c$ علماً أن $(C_f)$ يقطع محور التراتيب عند الترتيب $${c}$ ويقبل عند الفاصلتين $x_1 = ${x1}$ و $x_2 = ${x2}$ قيمتين حديتين محليتين (أي $f'(${x1}) = 0$ و $f'(${x2}) = 0$).`,
					answer: `*الجزء الأول:* من $f(0) = ${c}$ نجد $c = ${c}$ .\nوبما أن $f'(x) = ${3 * s}(x ${x1 >= 0 ? `- ${x1}` : `+ ${Math.abs(x1)}`})(x ${x2 >= 0 ? `- ${x2}` : `+ ${Math.abs(x2)}`}) = ${fpExprT}$ وبالمطابقة مع $f'(x) = ${3 * s}x^2 + 2a x + b$ نجد $a = ${a}$ و $b = ${b}$ .`,
					mark: '2'
				},
				{
					type: 'text',
					content: `*الجزء الثاني:* نضع فيما يلي $f(x) = ${fExprT}$ .\n1) احسب نهايتي الدالة $f$ عند $-oo$ و $+oo$.\n2) ادرس إشارة $f'(x)$ على $bb(R)$ ثم شكل جدول تغيرات الدالة $f$.`,
					answer: `1) $lim_(x arrow.r -oo) f(x) = ${limNegT}$ و $lim_(x arrow.r +oo) f(x) = ${limPosT}$ .\n2) $f'(x)$ من إشارة $${s}$ خارج $[${x1} ; ${x2}]$ وعكسه داخله، والقيم الحدية المحلية هي $f(${x1}) = ${y1}$ و $f(${x2}) = ${y2}$ .`,
					mark: '2.5'
				},
				{
					type: 'text',
					content: `3) بيّن أن $(C_f)$ يقبل نقطة انعطاف $Omega (${p} ; ${yI})$ (وهي أيضاً مركز تناظر له)، ثم اكتب معادلة المماس $(T)$ عند $Omega$.\n4) أنشئ $(T)$ و $(C_f)$، ثم ناقش بيانياً حسب قيم الوسيط الحقيقي $m$ عدد حلول المعادلة $f(x) = m$.`,
					answer: `3) $f''(x) = ${6 * s}(x ${p >= 0 ? `- ${p}` : `+ ${Math.abs(p)}`})$ ينعدم مغيراً إشارته عند $x = ${p}$، و $f(${2 * p} - x) + f(x) = ${2 * yI}$ . المماس $(T): ${tgEqT}$ .\n4) للمعادلة $f(x) = m$: حل وحيد لـ $m in ]-oo ; ${yMin}[ union ]${yMax} ; +oo[$، حلان لـ $m in {${yMin} ; ${yMax}}$، و3 حلول متمايزة لـ $m in ]${yMin} ; ${yMax}[$ .`,
					mark: '3.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_lp',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`في الجزء الأول: $f(0) = c = ${c}$، وشرطا القيمتين الحديتين يعطيان $f'(${x1}) = 0$ و $f'(${x2}) = 0$.`,
				`في الجزء الثاني: $f''(x) = ${6 * s}x ${2 * a >= 0 ? `+ ${2 * a}` : `- ${Math.abs(2 * a)}`}$ ينعدم مغيرًا إشارته عند $x = ${p}$.`,
				`للمناقشة البيانية $f(x) = m$: حرك مستقيماً أفقياً $y = m$ بين القيمة الصغرى المحلية $${yMin}$ والقيمة العظمى المحلية $${yMax}$.`
			],
			solutionStepsAr: [
				`1. **تعيين الثوابت**: $c = f(0) = ${c}$، و $f'(x) = ${fpExprK}$ يعطي $a = ${a}$ و $b = ${b}$.`,
				`2. **النهايات والتغيرات**: عند $\\pm\\infty$ هما $${limNeg}$ و $${limPos}$؛ $f'(x)$ تنعدم عند $${x1}$ و $${x2}$ مع $f(${x1}) = ${y1}$ و $f(${x2}) = ${y2}$.`,
				`3. **نقطة الانعطاف والمماس**: $\\Omega(${p} ; ${yI})$ مركز تناظر ونقطة انعطاف، والمماس $(T): ${tgEqK}$.`,
				`4. **المناقشة البيانية**: $3$ حلول متمايزة من أجل $m \\in ]${yMin} ; ${yMax}[$، حلان عند $${yMin}$ و $${yMax}$، وحل وحيد خارجهما.`
			],
			finalAnswer: `$a = ${a}, b = ${b}, c = ${c}$؛ المماس $(T): ${tgEqK}$؛ $3$ حلول لـ $m \\in ]${yMin} ; ${yMax}[$`
		};
	}
};

export const SHARED_TEMPLATES_3AS_LIT_T3: ParameterizedTemplate[] = [
	tplHomographicStudy,
	tplHomographicTangentsSym,
	tplRecursiveSequence,
	tplAdvancedCongruencesDates,
	tplIntegrationHomographicBac,
	tplIntegrationBacMockCubic
];
