import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate } from '../../types';
import { adaptTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, SeededRng, simplifyFraction } from '../../rng';
import { SHARED_TEMPLATES_2AS_T2 } from '../../secondary_shared_2as/templates/t2';

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

// 1. Limits & Asymptotes (Adapted)
const baseTpl1 = SHARED_TEMPLATES_2AS_T2[0];
const adaptedTpl1 = adaptTemplateForTrack(baseTpl1, '2as_math');
export const tpl2asMathT2LimitsAsymptotes: ParameterizedTemplate = {
	...adaptedTpl1,
	curriculumLessonId: 'lesson_2as_math_t2_limits_formal_asymptotes_comparison_theorems'
};

// 2. Indeterminate Forms & Oblique Asymptotes (Adapted)
const baseTpl2 = SHARED_TEMPLATES_2AS_T2[1];
const adaptedTpl2 = adaptTemplateForTrack(baseTpl2, '2as_math');
export const tpl2asMathT2ObliqueAsymptotePos: ParameterizedTemplate = {
	...adaptedTpl2,
	curriculumLessonId: 'lesson_2as_math_t2_limits_indeterminate_forms_rate_of_change_oblique_asymptotes'
};

// 3. Oriented Angles & Trigonometry (Adapted)
const baseTpl3 = SHARED_TEMPLATES_2AS_T2[2];
const adaptedTpl3 = adaptTemplateForTrack(baseTpl3, '2as_math');
export const tpl2asMathT2OrientedAnglesTrigEq: ParameterizedTemplate = {
	...adaptedTpl3,
	curriculumLessonId: 'lesson_2as_math_t2_trigonometry_advanced_formulas_linear_equations_inequalities'
};

// 6. Comprehensive Problem: Rational Function & Optimization (Adapted, 7 pts)
const baseTpl6 = SHARED_TEMPLATES_2AS_T2[5];
const adaptedTpl6 = adaptTemplateForTrack(baseTpl6, '2as_math');
export const tpl2asMathT2ProblemSynthesis: ParameterizedTemplate = {
	...adaptedTpl6,
	curriculumLessonId: 'lesson_2as_math_t2_scalar_product_metric_relations_loci_integration'
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Stream-Exclusive 2AS Math: Composite Homothety & Inscribed Angles
// ═══════════════════════════════════════════════════════════════════════════════

export const tpl2asMathT2CompositeHomothetyInscribedAngles: ParameterizedTemplate = {
	id: 'tpl_2as_math_t2_composite_homothety_inscribed_angles',
	grade: '2as_math',
	trimesterId: 't2',
	domain: 'geometry',
	titleAr: 'مركب التحاكيات ونظرية الزاوية المحيطية والرباعي الدائري',
	curriculumLessonId: 'lesson_2as_math_t2_homothety_composition_loci_geometric_transformations',
	defaultPoints: 3.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		let x1: number;
		let y1: number;
		let dx: number;
		let dy: number;

		if (difficulty === 'easy') {
			x1 = rng.pick([0, 1]);
			y1 = rng.pick([0, 1]);
			dx = 1;
			dy = 1;
		} else if (difficulty === 'medium') {
			x1 = rng.pick([1, 2, -1]);
			y1 = rng.pick([1, 2, 0]);
			dx = rng.pick([1, 2]);
			dy = rng.pick([1, -1]);
		} else {
			x1 = rng.pick([-2, 1, 3]);
			y1 = rng.pick([-1, 2, 4]);
			dx = rng.pick([1, 2, 3]);
			dy = rng.pick([-2, 1, 2]);
		}

		// Two homotheties:
		// h1 with center Omega1(x1, y1), ratio k1 = 2
		// h2 with center Omega2(x2, y2), ratio k2 = 2
		// x2 = x1 + 3 * dx, y2 = y1 + 3 * dy
		const x2 = x1 + 3 * dx;
		const y2 = y1 + 3 * dy;

		// Composite h = h2 o h1:
		// ratio k = k1 * k2 = 4 != 1
		// Center Omega: Omega1 Omega = (1 - k2) / (1 - k1 * k2) * Omega1 Omega2
		// = (1 - 2) / (1 - 4) * (3*dx, 3*dy) = (-1 / -3) * (3*dx, 3*dy) = (dx, dy)
		// Omega = (x1 + dx, y1 + dy)
		const xOmega = x1 + dx;
		const yOmega = y1 + dy;

		const correctOpt = `تحاكٍ نسبته $k = 4$ ومركزه $\\Omega(${xOmega} ; ${yOmega})$`;
		const dist1 = `انسحاب شعاعه $\\vec{u}(${xOmega}, ${yOmega})$`;
		const dist2 = `تحاكٍ نسبته $k = 2$ ومركزه $\\Omega_1(${x1} ; ${y1})$`;
		const dist3 = `تحاكٍ نسبته $k = 4$ ومركزه $\\Omega_2(${x2} ; ${y2})$`;

		const mcq = buildUniqueMcqOptions(
			correctOpt,
			[
				{
					text: dist1,
					diagnosticFeedback: `يكون مركب تحاكيين انسحاباً فقط إذا كان جداء النسبتين $k_1 \\cdot k_2 = 1$، بينما هنا $k_1 \\cdot k_2 = 4 \\neq 1$.`
				},
				{
					text: dist2,
					diagnosticFeedback: `نسبة مركب تحاكيين هي جداء النسبتين: $k = k_1 \\times k_2 = 2 \\times 2 = 4$.`
				},
				{
					text: dist3,
					diagnosticFeedback: `مركز التحاكي المركب $\\Omega$ يقع على المستقيم $(\\Omega_1 \\Omega_2)$ ويختلف عن $\\Omega_2$.`
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '2as_math',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في المستوي الموجه، نعتبر التحاكي $h_1$ الذي مركزه $\\Omega_1(${x1} ; ${y1})$ ونسبته $k_1 = 2$، والتحاكي $h_2$ الذي مركزه $\\Omega_2(${x2} ; ${y2})$ ونسبته $k_2 = 2$. التحويل النقطي المركب $h = h_2 \\circ h_1$ هو:`,
				questionTextAr: `عيّن طبيعة وعناصر التحويل المركب $h_2 \\circ h_1$:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices
				},
				explanation: `بما أن $k_1 \\cdot k_2 = 2 \\times 2 = 4 \\neq 1$، فإن مركب التحاكيين $h_2 \\circ h_1$ هو تحاكٍ نسبته $k = k_1 \\cdot k_2 = 4$.\nمركزه $\\Omega$ هو النقطة الصامدة الوحيدة التي تحقق $h(\\Omega) = \\Omega$.\nحسب الدستور الشعاعي:\n$\\vec{\\Omega_1 \\Omega} = \\frac{1 - k_2}{1 - k_1 k_2} \\vec{\\Omega_1 \\Omega_2} = \\frac{1 - 2}{1 - 4} \\vec{\\Omega_1 \\Omega_2} = \\frac{1}{3} \\vec{\\Omega_1 \\Omega_2}$.\nلدينا $\\vec{\\Omega_1 \\Omega_2}(${3 * dx}, ${3 * dy})$، إذن $\\vec{\\Omega_1 \\Omega}(${dx}, ${dy})$.\nومنه إحداثيات المركز: $x_\\Omega = ${x1} + ${dx} = ${xOmega}$ و $y_\\Omega = ${y1} + ${dy} = ${yOmega}$.\nإذن هو تحاكٍ نسبته $k = 4$ ومركزه $\\Omega(${xOmega} ; ${yOmega})$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'التمرين الثاني (شعبة رياضيات — مركب التحاكيات ونظرية الزاوية المحيطية)',
				instruction: `المستوي منسوب إلى معلم متعامد ومتجانس $(O; arrow(i), arrow(j))$.\nنعتبر النقطتين $Omega_1(${x1}, ${y1})$ و $Omega_2(${x2}, ${y2})$ والتحاكيين:\n$h_1 = h(Omega_1, 2)$ و $h_2 = h(Omega_2, 2)$.\nكما نعتبر الدائرة $(cal(C))$ ذات القطر $[A B]$ حيث $A(0, 0)$ و $B(4, 0)$.`,
				content: [
					{
						type: 'text',
						content: `*الجزء الأول: نظرية الزاوية المحيطية والرباعي الدائري (1.5 نقطة)*\n\n1) لتكن $C$ نقطة من الدائرة $(cal(C))$ تختلف عن $A$ و $B$، ولتكن $D$ نقطة أخرى من $(cal(C))$.\n   أ) برهن باستعمال الزوايا الموجهة أن $(arrow(C A), arrow(C B)) = frac(pi, 2) space [pi]$. ما هي طبيعة المثلث $A B C$؟\n   ب) بيّن أن $(arrow(C A), arrow(C B)) = (arrow(D A), arrow(D B)) space [pi]$، واستنتج أن النقط $A$، $B$، $C$، $D$ دائرية (تشكل رباعياً دائرياً).\n2) احسب مساحة القرص المحاط بالدائرة $(cal(C))$.`,
						answer: `1) دراسة الزوايا الموجهة والدائرية:\n   أ) بما أن $[A B]$ قطر للدائرة $(cal(C))$ و $C in (cal(C))$، فإن الزاوية المحيطية تحصر نصف دائرة:\nحسب مبرهنة الزاوية المحيطية والزاوية المركزية:\n$2 (arrow(C A), arrow(C B)) = (arrow(O' A), arrow(O' B)) space [2 pi] = pi space [2 pi]$ (حيث $O'$ مركز الدائرة).\nومنه: $(arrow(C A), arrow(C B)) = frac(pi, 2) space [pi]$.\nإذن المثلث $A B C$ قائم في $C$.\n   ب) وبالمثل تماماً للنقطة $D$ الواقعة على $(cal(C))$: $(arrow(D A), arrow(D B)) = frac(pi, 2) space [pi]$.\nومنه: $(arrow(C A), arrow(C B)) = (arrow(D A), arrow(D B)) space [pi]$.\nحسب الخاصية المميزة للرباعيات الدائرية بالزوايا الموجهة، فإن النقط $A$، $B$، $C$، $D$ تنتمي إلى نفس الدائرة (رباعي دائري).\n\n2) مساحة القرص:\nطول القطر $A B = 4$، إذن نصف القطر $R = 2$.\nمساحة القرص هي: $cal(A) = pi R^2 = pi times 2^2 = 4 pi$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `*الجزء الثاني: دراسة مركب التحاكيين وتطبيقاته (2 نقطة)*\n\n1) لتكن $M(x, y)$ نقطة من المستوي، و $M' = h_1(M)$ و $M'' = h_2(M')$.\n   أ) عبّر عن إحداثيات $M'$ بدلالة إحداثيات $M$.\n   ب) عبّر عن إحداثيات $M''$ بدلالة إحداثيات $M$.\n2) بيّن أن التحويل $h = h_2 compose h_1$ هو تحاكٍ، وعيّن نسبته $k$ وإحداثيات مركزه $Omega$.\n3) بيّن أن النقط $Omega_1$ و $Omega_2$ و $Omega$ في استقامية.\n4) عيّن صورة الدائرة $(cal(C))$ بالتحويل $h$، واستنتج مساحة صورتها $(cal(C)')$.`,
						answer: `1) العبارة التحليلية:\n   أ) $M' = h_1(M) arrow.l.r.double arrow(Omega_1 M') = 2 arrow(Omega_1 M)$:\n$cases(x' - ${x1} = 2(x - ${x1}), y' - ${y1} = 2(y - ${y1})) arrow.r.double cases(x' = 2x - ${x1}, y' = 2y - ${y1})$.\n   ب) $M'' = h_2(M') arrow.l.r.double arrow(Omega_2 M'') = 2 arrow(Omega_2 M')$:\n$cases(x'' - ${x2} = 2(x' - ${x2}), y'' - ${y2} = 2(y' - ${y2})) arrow.r.double cases(x'' = 2(2x - ${x1}) - ${x2} = 4x - 2(${x1}) - ${x2}, y'' = 2(2y - ${y1}) - ${y2} = 4y - 2(${y1}) - ${y2})$.\n\n2) طبيعة وعناصر التحاكي المركب $h$:\nنسبة التحاكي هي $k = k_1 times k_2 = 2 times 2 = 4$.\nالمركز $Omega(x_Omega, y_Omega)$ هو النقطة الصامدة ($h(Omega) = Omega$):\n$x_Omega = 4 x_Omega - ${2 * x1 + x2} arrow.r.double 3 x_Omega = ${2 * x1 + x2} arrow.r.double x_Omega = frac(${2 * x1 + x2}, 3) = ${xOmega}$.\n$y_Omega = 4 y_Omega - ${2 * y1 + y2} arrow.r.double 3 y_Omega = ${2 * y1 + y2} arrow.r.double y_Omega = frac(${2 * y1 + y2}, 3) = ${yOmega}$.\nإذن $h$ تحاكٍ مركزه $Omega(${xOmega}, ${yOmega})$ ونسبته $k = 4$.\n\n3) استقامية المراكز:\nلدينا $arrow(Omega_1 Omega)(${dx}, ${dy})$ و $arrow(Omega_1 Omega_2)(${3 * dx}, ${3 * dy}) = 3 arrow(Omega_1 Omega)$.\nالشعاعان مرتبطان خطياً، فالنقط $Omega_1$ و $Omega_2$ و $Omega$ على استقامة واحدة.\n\n4) صورة الدائرة $(cal(C))$ ومساحتها:\nصورة دائرة بتحاكٍ نسبته $k=4$ هي دائرة $(cal(C)')$ نصف قطرها $R' = |k| times R = 4 times 2 = 8$.\nمساحة صورتها تتضاعف بمعامل $k^2 = 16$:\n$cal(A)' = k^2 times cal(A) = 16 times 4 pi = 64 pi$.`,
						mark: '2'
					}
				]
			},
			hints: [
				`في الدائرة، كل زاوية محيطية تحصر قطراً هي زاوية قائمة قياسها $\\frac{\\pi}{2} \\pmod \\pi$.`,
				`نسبة مركب تحاكيين هي جداء النسبتين $k = k_1 \\cdot k_2$.`,
				`مركز التحاكي المركب $\\Omega$ هو النقطة الصامدة الوحيدة التي تحقق $h(\\Omega) = \\Omega$.`
			],
			solutionStepsAr: [
				`البرهان على تعامد المثلث والرباعي الدائري باستعمال الزوايا الموجهة.`,
				`إيجاد العبارة التحليلية للمركب وإثبات أن $h$ تحاكٍ نسبته $k = 4$.`,
				`تعيين إحداثيات المركز الصامد $\\Omega(${xOmega} ; ${yOmega})$.`,
				`إثبات استقامية المراكز وحساب مساحة الصورة $16 \\times 4\\pi = 64\\pi$.`
			],
			finalAnswer: `k = 4, Omega(${xOmega}, ${yOmega})`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Stream-Exclusive 2AS Math: Power of Point, Radical Axis & Median Theorem
// ═══════════════════════════════════════════════════════════════════════════════

export const tpl2asMathT2PowerOfPointRadicalAxis: ParameterizedTemplate = {
	id: 'tpl_2as_math_t2_power_of_point_radical_axis',
	grade: '2as_math',
	trimesterId: 't2',
	domain: 'geometry',
	titleAr: 'الجداء السلمي وقوة نقطة بالنسبة لدائرة والمحور الجذري ونظرية المتوسط',
	curriculumLessonId: 'lesson_2as_math_t2_scalar_product_bilinearity_analytic_distance_circles',
	defaultPoints: 3.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		let x1: number;
		let y1: number;
		let r1: number;
		let distCenters: number;

		if (difficulty === 'easy') {
			x1 = 1;
			y1 = 2;
			r1 = 3;
			distCenters = 4;
		} else if (difficulty === 'medium') {
			x1 = rng.pick([0, 1, 2]);
			y1 = rng.pick([1, 2, 3]);
			r1 = rng.pick([3, 4]);
			distCenters = 4;
		} else {
			x1 = rng.pick([-1, 0, 2]);
			y1 = rng.pick([0, 2, 4]);
			r1 = rng.pick([4, 5]);
			distCenters = 6;
		}

		// Circle 1: center O1(x1, y1), radius R1
		const r1Sq = r1 * r1;
		// Circle 2: center O2(x1 + distCenters, y1), radius R2 = r1 + 2
		const x2 = x1 + distCenters;
		const y2 = y1;
		const r2 = r1 + 2;
		const r2Sq = r2 * r2;

		// Exterior point M0(x2, y1 + 3)
		const x0 = x2;
		const y0 = y1 + 3;
		// Power of M0 wrt C1: (x0 - x1)^2 + (y0 - y1)^2 - R1^2
		// = distCenters^2 + 3^2 - R1^2
		const powM0 = distCenters * distCenters + 9 - r1Sq;
		const tangentLen = Math.sqrt(powM0);
		const isIntTangent = Number.isInteger(tangentLen);

		// Radical axis (Delta): P1(M) = P2(M)
		// (x - x1)^2 + (y - y1)^2 - R1^2 = (x - x2)^2 + (y - y2)^2 - R2^2
		// Since y1 = y2, the y-terms cancel out:
		// x^2 - 2x1 x + x1^2 - R1^2 = x^2 - 2x2 x + x2^2 - R2^2
		// 2(x2 - x1) x = (x2^2 - R2^2) - (x1^2 - R1^2)
		// 2 * distCenters * x = (x2^2 - x1^2) - (r2Sq - r1Sq)
		// = (x2 - x1)(x2 + x1) - (r2Sq - r1Sq) = distCenters * (2*x1 + distCenters) - (r2Sq - r1Sq)
		const xRadicalNumerator = distCenters * (2 * x1 + distCenters) - (r2Sq - r1Sq);
		const xRadicalDenominator = 2 * distCenters;
		const [rxNum, rxDen] = simplifyFraction(xRadicalNumerator, xRadicalDenominator);

		const correctOpt = `$${powM0}$`;
		const dist1 = `$${powM0 + 9}$`;
		const dist2 = `$${-powM0}$`;
		const dist3 = `$${r1Sq}$`;

		const mcq = buildUniqueMcqOptions(
			correctOpt,
			[
				{
					text: dist1,
					diagnosticFeedback: `نسيت طرح مربع نصف القطر $R_1^2 = ${r1Sq}$ من المسافة $M_0 O_1^2$.`
				},
				{
					text: dist2,
					diagnosticFeedback: `انتبه: النقطة $M_0$ تقع خارج الدائرة لأن $M_0 O_1 > R_1$، وبالتالي قوتها موجبة تماماً.`
				},
				{
					text: dist3,
					diagnosticFeedback: `هذا مربع نصف القطر وليس قوة النقطة بالنسبة للدائرة.`
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '2as_math',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في المستوي المنسوب إلى معلم متعامد ومتجانس، نعتبر الدائرة $(\\mathcal{C}_1)$ التي مركزها $O_1(${x1} ; ${y1})$ ونصف قطرها $R_1 = ${r1}$. ما هي قيمة قوة النقطة $M_0(${x0} ; ${y0})$ بالنسبة للدائرة $(\\mathcal{C}_1)$؟`,
				questionTextAr: `احسب قوة النقطة $M_0$ بالنسبة للدائرة $(\\mathcal{C}_1)$:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices
				},
				explanation: `قوة نقطة $M_0$ بالنسبة لدائرة $(\\mathcal{C})$ مركزها $O$ ونصف قطرها $R$ تُعطى بالدستور الدقيق:\n$\\mathcal{P}_{(\\mathcal{C})}(M_0) = M_0 O^2 - R^2$.\nنحسب المسافة $M_0 O_1^2$:\n$M_0 O_1^2 = (${x0} - ${x1})^2 + (${y0} - ${y1})^2 = (${distCenters})^2 + (3)^2 = ${distCenters * distCenters} + 9 = ${distCenters * distCenters + 9}$.\nبالتعويض:\n$\\mathcal{P}_{(\\mathcal{C}_1)}(M_0) = ${distCenters * distCenters + 9} - ${r1}^2 = ${distCenters * distCenters + 9} - ${r1Sq} = ${powM0}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'التمرين الثالث (شعبة رياضيات — قوة نقطة، المحور الجذري ونظرية المتوسط)',
				instruction: `المستوي منسوب إلى معلم متعامد ومتجانس $(O; arrow(i), arrow(j))$.\nنعتبر الدائرتين $(cal(C)_1)$ و $(cal(C)_2)$ المعرفتين بمركزهما ونصف قطرهما:\n- $(cal(C)_1)$ مركزها $O_1(${x1}, ${y1})$ ونصف قطرها $R_1 = ${r1}$.\n- $(cal(C)_2)$ مركزها $O_2(${x2}, ${y2})$ ونصف قطرها $R_2 = ${r2}$.\nوالنقطة $M_0(${x0}, ${y0})$.`,
				content: [
					{
						type: 'text',
						content: `*الجزء الأول: قوة نقطة والمماسات (1.5 نقطة)*\n\n1) اكتب معادلة ديكارتية لكل من الدائرتين $(cal(C)_1)$ و $(cal(C)_2)$.\n2) احسب قوة النقطة $M_0$ بالنسبة للدائرة $(cal(C)_1)$، واستنتج موضع النقطة $M_0$ بالنسبة لـ $(cal(C)_1)$.\n3) إذا رسمنا من النقطة $M_0$ مماساً للدائرة $(cal(C)_1)$ يمسها في النقطة $T$، فاحسب الطول $M_0 T$.`,
						answer: `1) المعادلتان الديكارتيتان للدائرتين:\n- للدائرة $(cal(C)_1)$:\n$(x - ${x1})^2 + (y - ${y1})^2 = ${r1Sq} arrow.l.r.double x^2 + y^2 - ${2 * x1} x - ${2 * y1} y + ${x1 * x1 + y1 * y1 - r1Sq} = 0$.\n- للدائرة $(cal(C)_2)$:\n$(x - ${x2})^2 + (y - ${y2})^2 = ${r2Sq} arrow.l.r.double x^2 + y^2 - ${2 * x2} x - ${2 * y2} y + ${x2 * x2 + y2 * y2 - r2Sq} = 0$.\n\n2) حساب قوة النقطة $M_0$ بالنسبة للدائرة $(cal(C)_1)$:\n$cal(P)_((cal(C)_1))(M_0) = M_0 O_1^2 - R_1^2 = (${x0} - ${x1})^2 + (${y0} - ${y1})^2 - ${r1Sq} = ${distCenters * distCenters} + 9 - ${r1Sq} = ${powM0}$.\nبما أن $cal(P)(M_0) = ${powM0} > 0$، فإن النقطة $M_0$ تقع خارج الدائرة $(cal(C)_1)$.\n\n3) حساب طول قطعة المماس $M_0 T$:\nبما أن المماس عمودي على نصف القطر عند نقطة التماس $T$، فإن المثلث $M_0 T O_1$ قائم في $T$.\nحسب مبرهنة فيثاغورس:\n$M_0 T^2 = M_0 O_1^2 - R_1^2 = cal(P)_((cal(C)_1))(M_0) = ${powM0}$.\nإذن: $M_0 T = sqrt(${powM0})${isIntTangent ? ` = ${tangentLen}` : ''}$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `*الجزء الثاني: المحور الجذري ونظرية المتوسط (2 نقطة)*\n\n1) المحور الجذري $(Delta)$ للدائرتين $(cal(C)_1)$ و $(cal(C)_2)$ هو مجموعة النقط $M(x, y)$ التي تتساوى قوتها بالنسبة للدائرتين.\n   أ) بيّن أن معادلة المحور الجذري $(Delta)$ هي من الشكل $x = ${fracTypst(rxNum, rxDen)}$.\n   ب) بيّن أن المحور الجذري $(Delta)$ عمودي على خط المركزين $(O_1 O_2)$.\n2) نعتبر النقطتين $A(-3, 0)$ و $B(3, 0)$ ومنتصفهما $O(0, 0)$.\nباستعمال نظرية المتوسط (Théorème de la médiane)، عيّن طبيعة وعناصر مجموعة النقط $M$ التي تحقق:\n$M A^2 + M B^2 = 50$.`,
						answer: `1) المحور الجذري $(Delta)$:\n   أ) بالتعريف: $cal(P)_1(M) = cal(P)_2(M)$:\n$(x - ${x1})^2 + (y - ${y1})^2 - ${r1Sq} = (x - ${x2})^2 + (y - ${y2})^2 - ${r2Sq}$.\nبما أن $y_1 = y_2 = ${y1}$، فإن حدي الترتيبة يختزلان:\n$x^2 - ${2 * x1} x + ${x1 * x1 - r1Sq} = x^2 - ${2 * x2} x + ${x2 * x2 - r2Sq}$.\n$2(${x2} - ${x1}) x = (${x2 * x2 - r2Sq}) - (${x1 * x1 - r1Sq}) = ${xRadicalNumerator}$.\n$${2 * distCenters} x = ${xRadicalNumerator} arrow.l.r.double x = ${fracTypst(rxNum, rxDen)}$.\n   ب) التعامد مع خط المركزين:\nخط المركزين $(O_1 O_2)$ يوازي محور الفواصل لأن $y_1 = y_2 = ${y1}$ (مستقيم أفقي).\nبما أن $(Delta)$ مستقيم شاقولي معادلته $x = cst$، فإنه يعامد حتماً خط المركزين $(O_1 O_2)$.\n\n2) تطبيق نظرية المتوسط:\nلدينا $O$ منتصف $[A B]$ وطول $A B = 6$، إذن $A B^2 / 2 = 36 / 2 = 18$.\nحسب نظرية المتوسط: لكل نقطة $M$ في المستوي:\n$M A^2 + M B^2 = 2 M O^2 + frac(A B^2, 2) = 2 M O^2 + 18$.\nالمعادلة المعطاة تكافئ:\n$2 M O^2 + 18 = 50 arrow.l.r.double 2 M O^2 = 32 arrow.l.r.double M O^2 = 16 arrow.l.r.double M O = 4$.\nإذن مجموعة النقط $M$ هي الدائرة التي مركزها $O(0, 0)$ ونصف قطرها $R = 4$.`,
						mark: '2'
					}
				]
			},
			hints: [
				`قوة النقطة $M$ بالنسبة لدائرة مركزها $O$ ونصف قطرها $R$ هي $\\mathcal{P}(M) = MO^2 - R^2$.`,
				`المحور الجذري هو المستقيم الذي تتساوى فيه القوتان $\\mathcal{P}_1(M) = \\mathcal{P}_2(M)$، وهو دائماً عمودي على خط المركزين.`,
				`دستور المتوسط هو: $MA^2 + MB^2 = 2MI^2 + \\frac{AB^2}{2}$ حيث $I$ منتصف $[AB]$.`
			],
			solutionStepsAr: [
				`حساب قوة النقطة $M_0$ بالنسبة لـ $(\\mathcal{C}_1)$ واستنتاج وقوعها خارج الدائرة.`,
				`حساب طول المماس $M_0 T = \\sqrt{\\mathcal{P}(M_0)}$.`,
				`إيجاد معادلة المحور الجذري وإثبات تعامده مع خط المركزين.`,
				`تطبيق نظرية المتوسط وتعيين الدائرة ذات المركز $O$ ونصف القطر $4$.`
			],
			finalAnswer: `${powM0}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 2 Parameterized Templates for 2AS Math Track (6 Templates)
// ═══════════════════════════════════════════════════════════════════════════════

export const TEMPLATES_2AS_MATH_T2: ParameterizedTemplate[] = [
	tpl2asMathT2LimitsAsymptotes,
	tpl2asMathT2ObliqueAsymptotePos,
	tpl2asMathT2OrientedAnglesTrigEq,
	tpl2asMathT2CompositeHomothetyInscribedAngles,
	tpl2asMathT2PowerOfPointRadicalAxis,
	tpl2asMathT2ProblemSynthesis
];
