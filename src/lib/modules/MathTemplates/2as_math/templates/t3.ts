import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate } from '../../types';
import { adaptTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, SeededRng, simplifyFraction } from '../../rng';
import { saveSvgAsset } from '../../svg-helpers';
import { svgCobwebSequencePlot } from '../../svg-secondary';
import { SHARED_TEMPLATES_2AS_T3 } from '../../secondary_shared_2as/templates/t3';

// ═══════════════════════════════════════════════════════════════════════════════
// Dual Syntax Formatters (KaTeX for Quiz / Hints, Typst for SujetExercise)
// Western digits 0-9 strictly used across both targets.
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

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Adapted Core Templates from Shared 2AS Core
// ═══════════════════════════════════════════════════════════════════════════════

// 1. Sequences Generation & Monotonicity (Adapted)
const baseTpl1 = SHARED_TEMPLATES_2AS_T3[0];
const adaptedTpl1 = adaptTemplateForTrack(baseTpl1, '2as_math');
export const tpl2asMathT3SequencesMonotonicity: ParameterizedTemplate = {
	...adaptedTpl1,
	curriculumLessonId: 'lesson_2as_math_t3_numerical_sequences_generation_monotonicity_bounds'
};

// 2. Arithmetic Sequences & Sums (Adapted)
const baseTpl2 = SHARED_TEMPLATES_2AS_T3[1];
const adaptedTpl2 = adaptTemplateForTrack(baseTpl2, '2as_math');
export const tpl2asMathT3ArithmeticSum: ParameterizedTemplate = {
	...adaptedTpl2,
	curriculumLessonId: 'lesson_2as_math_t3_arithmetic_sequences_properties_sum_diophantine_connections'
};

// 4. Space Geometry: Vectors & Coplanarity (Adapted)
const baseTpl4 = SHARED_TEMPLATES_2AS_T3[3];
const adaptedTpl4 = adaptTemplateForTrack(baseTpl4, '2as_math');
export const tpl2asMathT3SpaceVectorsCoplanarity: ParameterizedTemplate = {
	...adaptedTpl4,
	curriculumLessonId: 'lesson_2as_math_t3_space_geometry_plane_sections_tetrahedron_coplanar_vectors'
};

// 6. Comprehensive Problem: Sequences & Analysis (Adapted, 7 pts)
const baseTpl6 = SHARED_TEMPLATES_2AS_T3[5];
const adaptedTpl6 = adaptTemplateForTrack(baseTpl6, '2as_math');
export const tpl2asMathT3ProblemSynthesis: ParameterizedTemplate = {
	...adaptedTpl6,
	curriculumLessonId: 'lesson_2as_math_t3_analytic_space_geometry_parametric_lines_planes_surfaces_synthesis'
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Stream-Exclusive 2AS Math: Arithmetico-Geometric Sequence & Cobweb Plot
// ═══════════════════════════════════════════════════════════════════════════════

export const tpl2asMathT3ArithmeticoGeometricConvergence: ParameterizedTemplate = {
	id: 'tpl_2as_math_t3_arithmetico_geometric_convergence',
	grade: '2as_math',
	trimesterId: 't3',
	domain: 'numeric',
	titleAr: 'المتتالية الحسابية-الهندسية والتمثيل بالمنصف الأول ودراسة التقارب',
	curriculumLessonId: 'lesson_2as_math_t3_geometric_sequences_arithmetico_geometric_convergence',
	defaultPoints: 3.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		let u0: number;
		let b: number;

		if (difficulty === 'easy') {
			u0 = rng.pick([1, 2]);
			b = rng.pick([2, 3]);
		} else if (difficulty === 'medium') {
			u0 = rng.pick([1, 3, 4]);
			b = rng.pick([3, 4]);
		} else {
			u0 = rng.pick([2, 5, 6]);
			b = rng.pick([4, 5]);
		}

		// Fixed point L: L = 1/2 * L + b ==> L = 2b
		const limitL = 2 * b;
		// Ensure u0 != limitL
		if (u0 === limitL) {
			u0 = limitL - 2;
		}

		// Auxiliary sequence: v_n = u_n - limitL
		// v0 = u0 - limitL
		const v0 = u0 - limitL;

		// Cobweb plot
		const plotMax = Math.max(u0, limitL) + 3;
		const cobwebSvg = svgCobwebSequencePlot({
			fn: (x: number) => 0.5 * x + b,
			u0,
			steps: 4,
			fixedPoint: limitL,
			xMin: 0,
			xMax: plotMax,
			yMin: 0,
			yMax: plotMax
		});
		const cobwebUrl = saveSvgAsset(`2as_math_t3_cobweb_${difficulty}_s${seed}`, cobwebSvg);

		const isIncreasing = u0 < limitL;
		const monotonicityAr = isIncreasing ? 'متزايدة تماماً' : 'متناقصة تماماً';
		const monotonicityTypst = isIncreasing ? 'متزايدة تماماً' : 'متناقصة تماماً';

		const correctOpt = `$${limitL}$`;
		const dist1 = `$${b}$`;
		const dist2 = `$${u0}$`;
		const dist3 = `$+\\infty$`;

		const mcq = buildUniqueMcqOptions(
			correctOpt,
			[
				{
					text: dist1,
					diagnosticFeedback: `العدد $b = ${b}$ هو الحد الثابت في علاقة التراجع، بينما النهاية هي النقطة الصامدة $L = \\frac{b}{1 - a} = 2b = ${limitL}$.`
				},
				{
					text: dist2,
					diagnosticFeedback: `العدد $u_0 = ${u0}$ هو الحد الأول للمتتالية فقط.`
				},
				{
					text: dist3,
					diagnosticFeedback: `بما أن أساس المتتالية الهندسية المساعدة هو $|q| = \\frac{1}{2} < 1$، فإن المتتالية متقاربة نحو نهاية حقيقية منتهية.`
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '2as_math',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `نعتبر المتتالية العددية $(u_n)$ المعرفة بـ $u_0 = ${u0}$ ومن أجل كل عدد طبيعي $n$: $u_{n+1} = \\frac{1}{2} u_n + ${b}$. ما هي نهاية المتتالية $(u_n)$ لما يؤول $n$ إلى $+\\infty$؟`,
				questionTextAr: `احسب نهاية المتتالية $(u_n)$:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices
				},
				explanation: `المتتالية حسابية-هندسية من الشكل $u_{n+1} = a u_n + b$ مع $a = \\frac{1}{2}$ و $b = ${b}$.\nالنقطة الصامدة تحقق المعادلة: $L = \\frac{1}{2} L + ${b} \\iff \\frac{1}{2} L = ${b} \\iff L = 2 \\times ${b} = ${limitL}$.\nالمتتالية المساعدة $v_n = u_n - ${limitL}$ هندسية أساسها $q = \\frac{1}{2}$ وحدها الأول $v_0 = ${v0}$.\nعبارة الحد العام هي: $u_n = ${v0} \\left(\\frac{1}{2}\\right)^n + ${limitL}$.\nبما أن $|\\frac{1}{2}| < 1$ فإن $\\lim_{n \\to +\\infty} \\left(\\frac{1}{2}\\right)^n = 0$، ومنه:\n$\\lim_{n \\to +\\infty} u_n = ${limitL}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'التمرين الأول (شعبة رياضيات — المتتالية الحسابية-الهندسية والتمثيل بالمنصف الأول)',
				instruction: `نعتبر المتتالية العددية $(u_n)$ المعرفة بحدها الأول $u_0 = ${u0}$ ومن أجل كل عدد طبيعي $n$ بالعلاقة التراجعية:\n$u_(n+1) = frac(1, 2) u_n + ${b}$.`,
				content: [
					{
						type: 'text',
						content: `*الجزء الأول: التمثيل البياني بالمنصف الأول والتخمين (1.5 نقطة)*\n\n1) في معلم متعامد ومتجانس، نعتبر المستقيم $(D)$ ذا المعادلة $y = frac(1, 2) x + ${b}$ والمنصف الأول $(Delta)$ ذا المعادلة $y = x$.\nباستعمال الشكل المرفق أدناه، مثّل على محور الفواصل الحدود $u_0$، $u_1$، $u_2$، و $u_3$ دون حسابها، مبيناً خطوط الإنشاء.\n2) ضع تخميناً حول اتجاه تغير المتتالية $(u_n)$ وتقاربها.`,
						answer: `1) التمثيل البياني للحدود:\nانطلاقاً من النقطة $(u_0, 0)$ على محور الفواصل، نصعد شاقولياً نحو المستقيم $(D)$ لنحصل على الترتيبة $u_1 = f(u_0)$، ثم نتحرك أفقياً نحو المنصف الأول $(Delta)$ لإسقاط القيمة $u_1$ على محور الفواصل، ونكرر العملية للحصول على $u_2$ و $u_3$.\n\n2) التخمين:\n- اتجاه التغير: نلاحظ أن الحدود في تزايد متتالي ($u_0 < u_1 < u_2 < u_3$) إذا كان $u_0 < ${limitL}$، فنخمن أن المتتالية ${monotonicityTypst}.\n- التقارب: تقترب الحدود تدريجياً من نقطة تقاطع المستقيمين $(D)$ و $(Delta)$ ذات الفاصلة $x = ${limitL}$، فنخمن أن المتتالية متقاربة نحو العدد $${limitL}$.`,
						mark: '1.5'
					},
					{
						type: 'image',
						src: cobwebUrl,
						caption: 'التمثيل البياني بالمنصف الأول للحدود الأولى للمتتالية (u_n)'
					},
					{
						type: 'text',
						content: `*الجزء الثاني: الدراسة التحليلية الدقيقة والتقارب (2 نقطة)*\n\nنعرّف المتتالية المساعدة $(v_n)$ من أجل كل $n in NN$ بـ: $v_n = u_n - ${limitL}$.\n1) بيّن أن $(v_n)$ متتالية هندسية يُطلب تعيين أساسها $q$ وحدها الأول $v_0$.\n2) اكتب عبارة الحد العام $v_n$ بدلالة $n$، ثم استنتج عبارة $u_n$ بدلالة $n$.\n3) ادرس اتجاه تغير المتتالية $(u_n)$ واحسب نهايتها $lim_(n -> +oo) u_n$.\n4) احسب بدلالة $n$ المجموع: $S_n = u_0 + u_1 + dots + u_n$.`,
						answer: `1) إثبات أن $(v_n)$ هندسية:\nمن أجل كل $n in NN$:\n$v_(n+1) = u_(n+1) - ${limitL} = (frac(1, 2) u_n + ${b}) - ${limitL} = frac(1, 2) u_n - ${b} = frac(1, 2) (u_n - 2 times ${b}) = frac(1, 2) (u_n - ${limitL}) = frac(1, 2) v_n$.\nإذن $(v_n)$ متتالية هندسية أساسها $q = frac(1, 2)$ وحدها الأول $v_0 = u_0 - ${limitL} = ${u0} - ${limitL} = ${v0}$.\n\n2) عبارة الحد العام:\n- عبارة $v_n$: $v_n = v_0 times q^n = ${v0} times (frac(1, 2))^n$.\n- عبارة $u_n$: بما أن $v_n = u_n - ${limitL}$، فإن:\n$u_n = v_n + ${limitL} = ${v0} times (frac(1, 2))^n + ${limitL}$.\n\n3) اتجاه التغير والنهاية:\n$u_(n+1) - u_n = v_(n+1) - v_n = ${v0} (frac(1, 2))^(n+1) - ${v0} (frac(1, 2))^n = ${v0} (frac(1, 2))^n (frac(1, 2) - 1) = - frac(${v0}, 2) times (frac(1, 2))^n$.\nبما أن $(frac(1, 2))^n > 0$ و $- frac(${v0}, 2) ${v0 < 0 ? '> 0' : '< 0'}$، فإن المتتالية $(u_n)$ ${monotonicityTypst}.\n- حساب النهاية: بما أن $-1 < frac(1, 2) < 1$، فإن $lim_(n -> +oo) (frac(1, 2))^n = 0$.\nومنه: $lim_(n -> +oo) u_n = ${v0} times 0 + ${limitL} = ${limitL}$.\n\n4) حساب المجموع $S_n$:\nنضع $T_n = v_0 + v_1 + dots + v_n = v_0 times frac(1 - q^(n+1), 1 - q) = ${v0} times frac(1 - (frac(1, 2))^(n+1), 1 - frac(1, 2)) = ${2 * v0} times (1 - (frac(1, 2))^(n+1))$.\nوبما أن $u_k = v_k + ${limitL}$، فإن:\n$S_n = sum_(k=0)^n u_k = sum_(k=0)^n (v_k + ${limitL}) = T_n + (n + 1) times ${limitL} = ${2 * v0} (1 - (frac(1, 2))^(n+1)) + ${limitL}(n + 1)$.`,
						mark: '2'
					}
				]
			},
			hints: [
				`النقطة الصامدة $L$ تحل المعادلة $f(L) = L$، وهي التي تجعل المتتالية المساعدة هندسية.`,
				`المتتالية الهندسية التي أساسها في المجال $]-1 ; 1[$ تؤول نهايتها إلى $0$.`,
				`مجموع حدود متتالية من الشكل $u_k = v_k + L$ هو مجموع المتتالية الهندسية مضافاً إليه $(n+1)L$.`
			],
			solutionStepsAr: [
				`التمثيل البياني بالمنصف الأول وتعيين الحدود الأولى.`,
				`البرهان على أن المتتالية المساعدة $(v_n)$ هندسية أساسها $q = 1/2$.`,
				`كتابة الحد العام $u_n = ${v0}(1/2)^n + ${limitL}$.`,
				`إثبات التقارب نحو النهاية $L = ${limitL}$ وحساب المجموع $S_n$.`
			],
			finalAnswer: `${limitL}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Stream-Exclusive 2AS Math: 3D Parametric Line & Plane Intersection
// ═══════════════════════════════════════════════════════════════════════════════

export const tpl2asMathT3ParametricLinePlaneIntersection: ParameterizedTemplate = {
	id: 'tpl_2as_math_t3_parametric_line_plane_intersection',
	grade: '2as_math',
	trimesterId: 't3',
	domain: 'geometry',
	titleAr: 'الهندسة التحليلية في الفضاء: التمثيل الوسيطي لمستقيم وتقاطع مستقيم ومستو',
	curriculumLessonId: 'lesson_2as_math_t3_analytic_space_geometry_parametric_lines_planes_surfaces_synthesis',
	defaultPoints: 3.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		let xA: number;
		let yA: number;
		let zA: number;
		let t0: number;

		if (difficulty === 'easy') {
			xA = 1;
			yA = 2;
			zA = 3;
			t0 = 1;
		} else if (difficulty === 'medium') {
			xA = rng.pick([0, 1, 2]);
			yA = rng.pick([1, 2, -1]);
			zA = rng.pick([2, 3, 4]);
			t0 = rng.pick([1, 2]);
		} else {
			xA = rng.pick([-2, 1, 3]);
			yA = rng.pick([-1, 2, 4]);
			zA = rng.pick([1, 3, 5]);
			t0 = rng.pick([-1, 1, 2]);
		}

		// Direction vector u = (1, 1, 1)
		// Normal vector n = (2, -2, 1)
		// u . n = 2(1) - 2(1) + 1(1) = 1 != 0 (strictly intersecting)
		// Target intersection point H:
		const xH = xA + t0;
		const yH = yA + t0;
		const zH = zA + t0;

		// Plane (P): 2(x - xH) - 2(y - yH) + 1(z - zH) = 0
		// 2x - 2y + z + dPlane = 0
		const dPlane = -(2 * xH - 2 * yH + zH);

		// Exterior point B for distance calculation: B(xH + 1, yH, zH + 1)
		// 2(xH + 1) - 2(yH) + (zH + 1) + dPlane = (2xH - 2yH + zH + dPlane) + 3 = 0 + 3 = 3
		// dist = |3| / sqrt(4 + 4 + 1) = 3 / 3 = 1
		const xB = xH + 1;
		const yB = yH;
		const zB = zH + 1;
		const distToPlane = 1;

		const correctOpt = `$H(${xH} ; ${yH} ; ${zH})$`;
		const dist1 = `$H(${xA} ; ${yA} ; ${zA})$`;
		const dist2 = `$H(${xH + 1} ; ${yH - 1} ; ${zH})$`;
		const dist3 = `$H(${xH} ; ${-yH} ; ${zH})$`;

		const mcq = buildUniqueMcqOptions(
			correctOpt,
			[
				{
					text: dist1,
					diagnosticFeedback: `النقطة $A(${xA} ; ${yA} ; ${zA})$ هي النقطة المعطاة على المستقيم $(D)$ عند $t = 0$ وليست نقطة التقاطع مع المستوي.`
				},
				{
					text: dist2,
					diagnosticFeedback: `تحقق من صحة تعويض التمثيل الوسيطي في معادلة المستوي لحساب قيمة الوسيط $t$.`
				},
				{
					text: dist3,
					diagnosticFeedback: `انتبه لإشارة ترتيب النقطة $H$.`
				}
			],
			rng
		);

		const dPlaneSignTypst = dPlane >= 0 ? `+ ${dPlane}` : `- ${Math.abs(dPlane)}`;
		const dPlaneSignKatex = dPlane >= 0 ? `+ ${dPlane}` : `- ${Math.abs(dPlane)}`;

		return {
			templateId: this.id,
			seed,
			grade: '2as_math',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في الفضاء المنسوب إلى معلم متعامد ومتجانس $(O; \\vec{i}, \\vec{j}, \\vec{k})$، نعتبر المستقيم $(D)$ ذا التمثيل الوسيطي:\n$$\\begin{cases} x = ${xA} + t \\\\ y = ${yA} + t \\\\ z = ${zA} + t \\end{cases} \\quad (t \\in \\mathbb{R})$$\nوالمستوي $(P)$ ذا المعادلة الديكارتية: $2x - 2y + z ${dPlaneSignKatex} = 0$.\nما هي إحداثيات نقطة تقاطع المستقيم $(D)$ مع المستوي $(P)$؟`,
				questionTextAr: `عيّن إحداثيات نقطة تقاطع المستقيم $(D)$ والمستوي $(P)$:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices
				},
				explanation: `نعوّض عبارات التمثيل الوسيطي للمستقيم $(D)$ في معادلة المستوي $(P)$:\n$2(${xA} + t) - 2(${yA} + t) + (${zA} + t) ${dPlaneSignKatex} = 0$\n$(${2 * xA} + 2t) - (${2 * yA} + 2t) + (${zA} + t) ${dPlaneSignKatex} = 0$\n$t + (${2 * xA - 2 * yA + zA + dPlane}) = 0 \\iff t - ${t0} = 0 \\iff t = ${t0}$.\nبالتعويض في التمثيل الوسيطي نجد إحداثيات نقطة التقاطع $H$:\n$x_H = ${xA} + (${t0}) = ${xH}$\n$y_H = ${yA} + (${t0}) = ${yH}$\n$z_H = ${zA} + (${t0}) = ${zH}$.\nإذن نقطة التقاطع هي $H(${xH} ; ${yH} ; ${zH})$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'التمرين الثاني (شعبة رياضيات — الهندسة التحليلية في الفضاء وتقاطع مستقيم ومستو)',
				instruction: `الفضاء منسوب إلى معلم متعامد ومتجانس $(O; arrow(i), arrow(j), arrow(k))$.\nنعتبر النقطة $A(${xA}, ${yA}, ${zA})$ والشعاع $arrow(u)(1, 1, 1)$.\nليكن $(D)$ المستقيم المار بالنقطة $A$ والموجّه بالشعاع $arrow(u)$.\nونعتبر المستوي $(P)$ ذا المعادلة الديكارتية: $2 x - 2 y + z ${dPlaneSignTypst} = 0$.\nوالنقطة $B(${xB}, ${yB}, ${zB})$.`,
				content: [
					{
						type: 'text',
						content: `*الجزء الأول: المستقيم والمستوي والتقاطع في الفضاء (2 نقطة)*\n\n1) اكتب تمثيلاً وسيطياً للمستقيم $(D)$.\n2) عيّن شعاعاً ناظمياً $arrow(n)$ للمستوي $(P)$.\n3) احسب الجداء السلمي $arrow(u) dot arrow(n)$، ماذا تستنتج بالنسبة للمستقيم $(D)$ والمستوي $(P)$؟\n4) بيّن أن المستقيم $(D)$ يقطع المستوي $(P)$ في نقطة وحيدة $H$ يُطلب تعيين إحداثياتها بدقة.`,
						answer: `1) التمثيل الوسيطي للمستقيم $(D)$:\nنقطة $M(x, y, z) in (D) arrow.l.r.double arrow(A M) = t arrow(u) space (t in RR)$:\n$cases(x - ${xA} = 1 times t, y - ${yA} = 1 times t, z - ${zA} = 1 times t) arrow.r.double cases(x = ${xA} + t, y = ${yA} + t, z = ${zA} + t) space (t in RR)$.\n\n2) الشعاع الناظمي للمستوي $(P)$:\nمعادلة المستوي هي $2 x - 2 y + z ${dPlaneSignTypst} = 0$، إذن الشعاع الناظمي هو: $arrow(n)(2, -2, 1)$.\n\n3) حساب الجداء السلمي:\n$arrow(u) dot arrow(n) = 1 times 2 + 1 times (-2) + 1 times 1 = 2 - 2 + 1 = 1$.\nالاستنتاج: بما أن $arrow(u) dot arrow(n) = 1 != 0$، فإن شعاع التوجيه ليس عمودياً على الناظم، وبالتالي المستقيم $(D)$ ليس موازياً للمستوي $(P)$، فهو يخترقه ويقطعه في نقطة وحيدة.\n\n4) تعيين إحداثيات نقطة التقاطع $H$:\nنعوّض إحداثيات المستقيم في معادلة المستوي:\n$2(${xA} + t) - 2(${yA} + t) + (${zA} + t) ${dPlaneSignTypst} = 0 arrow.r.double t - ${t0} = 0 arrow.r.double t = ${t0}$.\nبالتعويض في التمثيل الوسيطي نجد إحداثيات $H$:\n$cases(x_H = ${xA} + ${t0} = ${xH}, y_H = ${yA} + ${t0} = ${yH}, z_H = ${zA} + ${t0} = ${zH})$.\nإذن نقطة التقاطع هي $H(${xH}, ${yH}, ${zH})$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `*الجزء الثاني: المسافات ومعادلة سطح الكرة (1.5 نقطة)*\n\n1) احسب المسافة بين النقطة $B(${xB}, ${yB}, ${zB})$ والمستوي $(P)$.\n2) لتكن $(cal(S))$ سطح الكرة التي مركزها $B$ وتمس المستوي $(P)$.\n   أ) عيّن نصف قطر سطح الكرة $(cal(S))$.\n   ب) اكتب معادلة ديكارتية لسطح الكرة $(cal(S))$.`,
						answer: `1) حساب المسافة $d(B, (P))$:\nدستور مسافة نقطة عن مستو في الفضاء:\n$d(B, (P)) = frac(|2 x_B - 2 y_B + z_B ${dPlaneSignTypst}|, sqrt(2^2 + (-2)^2 + 1^2)) = frac(|2(${xB}) - 2(${yB}) + ${zB} ${dPlaneSignTypst}|, sqrt(4 + 4 + 1)) = frac(|3|, sqrt(9)) = frac(3, 3) = ${distToPlane}$.\n\n2) دراسة سطح الكرة $(cal(S))$:\n   أ) بما أن سطح الكرة تمس المستوي $(P)$، فإن نصف قطرها يساوي تماماً مسافة مركزها عن المستوي:\n$R = d(B, (P)) = ${distToPlane}$.\n   ب) المعادلة الديكارتية لسطح الكرة $(cal(S))$:\n$(x - x_B)^2 + (y - y_B)^2 + (z - z_B)^2 = R^2$\n$(x - ${xB})^2 + (y - ${yB})^2 + (z - ${zB})^2 = ${distToPlane * distToPlane}$.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				`المستقيم يقطع المستوي في نقطة وحيدة إذا وفقط إذا كان الجداء السلمي $u \\cdot n \\neq 0$.`,
				`لإيجاد نقطة التقاطع، عوّض عبارات $x, y, z$ بدلالة $t$ مباشرة في معادلة المستوي لحساب قيمة الوسيط $t$.`,
				`المسافة بين نقطة ومستو في الفضاء تُعطى بالدستور: $d = \\frac{|ax_0 + by_0 + cz_0 + d|}{\\sqrt{a^2 + b^2 + c^2}}$.`
			],
			solutionStepsAr: [
				`كتابة التمثيل الوسيطي للمستقيم وتعيين الناظم $n(2, -2, 1)$.`,
				`إثبات التقاطع بحساب $u \\cdot n = 1 \\neq 0$.`,
				`إيجاد نقطة التقاطع $H(${xH} ; ${yH} ; ${zH})$ بالتعويض المباشر.`,
				`حساب المسافة $d(B, (P)) = ${distToPlane}$ وكتابة معادلة سطح الكرة المماسة.`
			],
			finalAnswer: `H(${xH}, ${yH}, ${zH})`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 3 Parameterized Templates for 2AS Math Track (6 Templates)
// ═══════════════════════════════════════════════════════════════════════════════

export const TEMPLATES_2AS_MATH_T3: ParameterizedTemplate[] = [
	tpl2asMathT3SequencesMonotonicity,
	tpl2asMathT3ArithmeticSum,
	tpl2asMathT3ArithmeticoGeometricConvergence,
	tpl2asMathT3SpaceVectorsCoplanarity,
	tpl2asMathT3ParametricLinePlaneIntersection,
	tpl2asMathT3ProblemSynthesis
];
