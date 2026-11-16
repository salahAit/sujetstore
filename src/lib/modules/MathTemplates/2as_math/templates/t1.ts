import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate } from '../../types';
import { adaptTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, SeededRng, simplifyFraction } from '../../rng';
import { SHARED_TEMPLATES_2AS_T1 } from '../../secondary_shared_2as/templates/t1';

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

// 1. Functions Composition & Symmetry (Adapted)
const baseTpl1 = SHARED_TEMPLATES_2AS_T1[0];
const adaptedTpl1 = adaptTemplateForTrack(baseTpl1, '2as_math');
export const tpl2asMathT1CompositionDomainSymmetry: ParameterizedTemplate = {
	...adaptedTpl1,
	curriculumLessonId: 'lesson_2as_math_t1_functions_operations_composition'
};

// 3. Derivatives, Tangents & Local Approximation (Adapted)
const baseTpl3 = SHARED_TEMPLATES_2AS_T1[2];
const adaptedTpl3 = adaptTemplateForTrack(baseTpl3, '2as_math');
export const tpl2asMathT1DerivativeTangentApprox: ParameterizedTemplate = {
	...adaptedTpl3,
	curriculumLessonId: 'lesson_2as_math_t1_derivatives_rate_of_change_tangent_half_tangents'
};

// 6. Comprehensive Problem: Rational Function & Optimization (Adapted, 7 pts)
const baseTpl6 = SHARED_TEMPLATES_2AS_T1[5];
const adaptedTpl6 = adaptTemplateForTrack(baseTpl6, '2as_math');
export const tpl2asMathT1ProblemSynthesis: ParameterizedTemplate = {
	...adaptedTpl6,
	curriculumLessonId: 'lesson_2as_math_t1_derivatives_composite_monotonicity_extrema_optimization',
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const inst = adaptedTpl6.generate(seed, difficulty);
		if (inst.sujetExercise?.content) {
			for (const block of inst.sujetExercise.content) {
				const b = block as { answer?: string };
				if (b.answer && typeof b.answer === 'string') {
					b.answer = b.answer.replace(
						/(- إذا كان )(\d+(?:\.\d+)? < m <= \d+(?:\.\d+)?\$)/g,
						(_m: string, p1: string, p2: string) => `${p1}$${p2}`
					);
				}
			}
		}
		return inst;
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Stream-Exclusive 2AS Math: Parametric Quadratic & Horner Polynomials
// ═══════════════════════════════════════════════════════════════════════════════

export const tpl2asMathT1ParametricHornerPolynomials: ParameterizedTemplate = {
	id: 'tpl_2as_math_t1_parametric_horner_polynomials',
	grade: '2as_math',
	trimesterId: 't1',
	domain: 'algebra',
	titleAr: 'كثيرات الحدود بالوسيط m وخوارزمية هورنر وعلاقات فييت',
	curriculumLessonId: 'lesson_2as_math_t1_polynomials_divisibility_horner_roots_equations',
	defaultPoints: 3.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		let k: number;
		let m0: number;

		if (difficulty === 'easy') {
			k = rng.pick([2, 3]);
			m0 = rng.pick([1, 4, 5]);
		} else if (difficulty === 'medium') {
			k = rng.pick([3, 4, 5]);
			m0 = rng.pick([-2, 1, 2, 6]);
			if (m0 === k) m0 = k + 1;
		} else {
			k = rng.pick([4, 5, 6]);
			m0 = rng.pick([-3, -2, 2, 7]);
			if (m0 === k) m0 = k + 2;
		}

		if (m0 === k) m0 = k + 1;

		// Cubic polynomial P(x) = x^3 - (k+2)x^2 + (2k-3)x + 6
		// Divisible by (x - 2) with quotient Q(x) = x^2 - k x - 3
		const bCubic = -(k + 2);
		const cCubic = 2 * k - 3;
		const dCubic = 6;

		// Parametric quadratic: (E_m): x^2 - (m + k)x + km = 0
		// S = m + k, P = km
		// x1^2 + x2^2 = S^2 - 2P = m^2 + k^2
		const kSq = k * k;
		const sumSqAtM0 = m0 * m0 + kSq;

		const correctOpt = `$m^2 + ${kSq}$`;
		const dist1 = `$(m + ${k})^2$`;
		const dist2 = `$m^2 - ${kSq}$`;
		const dist3 = `$m^2 - ${2 * k}m + ${kSq}$`;

		const mcq = buildUniqueMcqOptions(
			correctOpt,
			[
				{
					text: dist1,
					diagnosticFeedback: `المقدار $(m + ${k})^2$ هو $S^2 = (x_1 + x_2)^2$ فقط، نسيت طرح $2P = 2km$.`
				},
				{
					text: dist2,
					diagnosticFeedback: `انتبه للإشارة: عند نشر $(m+k)^2 - 2km$ نجد $m^2 + ${k}^2$ بإشارة موجبة.`
				},
				{
					text: dist3,
					diagnosticFeedback: `أخطأت في التبسيط بإدراج حد وسط $-${2 * k}m$ رغم أن $+${2 * k}m - 2km = 0$.`
				}
			],
			rng
		);

		const bCubicKatex = bCubic < 0 ? `- ${Math.abs(bCubic)}x^2` : `+ ${bCubic}x^2`;
		const cCubicKatex = cCubic < 0 ? `- ${Math.abs(cCubic)}x` : `+ ${cCubic}x`;
		const bCubicTypst = bCubic < 0 ? `- ${Math.abs(bCubic)} x^2` : `+ ${bCubic} x^2`;
		const cCubicTypst = cCubic < 0 ? `- ${Math.abs(cCubic)} x` : `+ ${cCubic} x`;

		return {
			templateId: this.id,
			seed,
			grade: '2as_math',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `نعتبر المعادلة ذات الوسيط الحقيقي $m$: $x^2 - (m + ${k})x + ${k}m = 0$. إذا كان $x_1$ و $x_2$ حلي هذه المعادلة، فما هي العبارة المبسطة للمجموع $x_1^2 + x_2^2$ بدلالة $m$؟`,
				questionTextAr: `عيّن عبارة $x_1^2 + x_2^2$ بدلالة $m$:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices
				},
				explanation: `باستعمال علاقتي فييت لمجموع وجداء الحلين: $S = x_1 + x_2 = m + ${k}$ و $P = x_1 x_2 = ${k}m$.\nنعلم أن المتطابقة الشهيرة تعطي: $x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2 x_1 x_2 = S^2 - 2P$.\nبالتعويض: $x_1^2 + x_2^2 = (m + ${k})^2 - 2(${k}m) = m^2 + 2(${k})m + ${kSq} - 2(${k}m) = m^2 + ${kSq}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'التمرين الثاني (شعبة رياضيات — كثيرات الحدود والوسيط m)',
				instruction: `نعتبر كثير الحدود $P(x)$ والمعادلة ذات الوسيط الحقيقي $m$ المعرفين كما يلي:\n$P(x) = x^3 ${bCubicTypst} ${cCubicTypst} + ${dCubic}$\n$(E_m): x^2 - (m + ${k})x + ${k}m = 0$.`,
				content: [
					{
						type: 'text',
						content: `*الجزء الأول: دراسة كثير الحدود وخوارزمية هورنر (1.5 نقطة)*\n\n1) احسب $P(2)$، ماذا تستنتج بالنسبة للعدد $2$؟\n2) باستعمال خوارزمية هورنر (Horner) أو القسمة الإقليدية، عيّن الأعداد الحقيقية $a$، $b$، و $c$ بحيث يكون من أجل كل عدد حقيقي $x$:\n$P(x) = (x - 2)(a x^2 + b x + c)$.\n3) حل في $RR$ المعادلة $P(x) = 0$.`,
						answer: `1) حساب $P(2)$:\n$P(2) = 2^3 ${bCubic < 0 ? `- ${Math.abs(bCubic)} times 4` : `+ ${bCubic} times 4`} ${cCubic < 0 ? `- ${Math.abs(cCubic)} times 2` : `+ ${cCubic} times 2`} + 6 = 8 - ${Math.abs(bCubic) * 4} + ${cCubic * 2} + 6 = 0$.\nالاستنتاج: العدد $2$ جذر لكثير الحدود $P(x)$، وبالتالي $P(x)$ يقبل القسمة على $(x - 2)$.\n\n2) تطبيق خوارزمية هورنر:\nمعاملات $P(x)$ هي $[1, ${bCubic}, ${cCubic}, ${dCubic}]$ والجذر هو $2$:\n- $a = 1$\n- $b = ${bCubic} + 2 times 1 = -${k}$\n- $c = ${cCubic} + 2 times (-${k}) = -3$\n- الباقي: $6 + 2 times (-3) = 0$.\nإذن: $P(x) = (x - 2)(x^2 - ${k} x - 3)$.\n\n3) حل المعادلة $P(x) = 0$:\n$P(x) = 0 arrow.l.r.double x - 2 = 0$ أو $x^2 - ${k} x - 3 = 0$.\n- الحل الأول: $x = 2$.\n- لمعادلة $x^2 - ${k} x - 3 = 0$: المميز $Delta = (-${k})^2 - 4(1)(-3) = ${kSq} + 12 > 0$.\nالحلان هما: $x' = frac(${k} - sqrt(${kSq + 12}), 2)$ و $x'' = frac(${k} + sqrt(${kSq + 12}), 2)$.\nإذن مجموعة الحلول هي: $S = { 2, frac(${k} - sqrt(${kSq + 12}), 2), frac(${k} + sqrt(${kSq + 12}), 2) }$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `*الجزء الثاني: المناقشة الوسيطية وعلاقات فييت (2 نقطة)*\n\n1) احسب مميز المعادلة $(E_m)$ بدلالة $m$، واستنتج وجود وعدد حلولها حسب قيم $m$.\n2) لتكن $x_1$ و $x_2$ حلي المعادلة $(E_m)$:\n   أ) اكتب عبارة مجموع الحلين $S = x_1 + x_2$ وجدائهما $P = x_1 x_2$ بدلالة $m$.\n   ب) بيّن أن $x_1^2 + x_2^2 = m^2 + ${kSq}$.\n   جـ) عيّن قيمة الوسيط $m$ حتى يكون: $x_1^2 + x_2^2 = ${sumSqAtM0}$.\n3) ناقش حسب قيم الوسيط $m$ إشارة حلي المعادلة $(E_m)$.`,
						answer: `1) حساب المميز $Delta$:\n$Delta = [-(m + ${k})]^2 - 4(1)(${k}m) = m^2 + 2(${k})m + ${kSq} - 4(${k})m = m^2 - 2(${k})m + ${kSq} = (m - ${k})^2$.\nبما أن $(m - ${k})^2 >= 0$ من أجل كل $m in RR$:\n- إذا كان $m = ${k}$، فإن $Delta = 0$ والمعادلة تقبل حلاً مضاعفاً وحيداً هو $x_0 = frac{m+k}{2} = ${k}$.\n- إذا كان $m != ${k}$، فإن $Delta > 0$ والمعادلة تقبل حلين متمايزين هما: $x_1 = ${k}$ و $x_2 = m$.\n\n2) علاقات فييت:\n   أ) $S = x_1 + x_2 = m + ${k}$ و $P = x_1 x_2 = ${k}m$.\n   ب) $x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2 x_1 x_2 = S^2 - 2P = (m + ${k})^2 - 2(${k}m) = m^2 + ${kSq}$.\n   جـ) تعيين $m$:\n$x_1^2 + x_2^2 = ${sumSqAtM0} arrow.l.r.double m^2 + ${kSq} = ${sumSqAtM0} arrow.l.r.double m^2 = ${m0 * m0} arrow.l.r.double m = ${Math.abs(m0)}$ أو $m = -${Math.abs(m0)}$.\n\n3) مناقشة إشارة الحلين حسب إشارة $P = ${k}m$ (مع $k = ${k} > 0$):\n- إذا كان $m < 0$: فإن $P < 0$، فالحلان من إشارتين مختلفتين (أحدهما موجب والآخر سالب).\n- إذا كان $m = 0$: فإن $P = 0$، أحد الحلين معدوم ($x_2 = 0$) والآخر موجب ($x_1 = ${k}$).极\n- إذا كان $m > 0$: فإن $P > 0$، فالحلان من نفس الإشارة وبما أن $S = m + ${k} > 0$ فهما موجبان تماماً.`,
						mark: '2'
					}
				]
			},
			hints: [
				`لإثبات أن $x=2$ جذر، احسب $P(2)$ وتحقق من أنه يساوي الصفر تماماً.`,
				`المميز يكتب على شكل مربع كامل: $\\Delta = (m - ${k})^2 \\ge 0$.`,
				`المتطابقة الشهيرة لمجموع المربعين هي: $x_1^2 + x_2^2 = (x_1+x_2)^2 - 2x_1 x_2 = S^2 - 2P$.`
			],
			solutionStepsAr: [
				`التحقق من أن $P(2) = 0$ وتطبيق هورنر لإيجاد $P(x) = (x - 2)(x^2 - ${k}x - 3)$.`,
				`حل المعادلة $P(x) = 0$ في $\\mathbb{R}$ بإيجاد الحلول الثلاثة.`,
				`حساب المميز $\\Delta = (m - ${k})^2$ ومناقشة الحلول.`,
				`استعمال علاقتي فييت لإثبات $x_1^2 + x_2^2 = m^2 + ${kSq}$ وحل المعادلة عند $m = \\pm ${Math.abs(m0)}$.`
			],
			finalAnswer: `m^2 + ${kSq}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Stream-Exclusive 2AS Math: Combinatorics & Random Variable
// ═══════════════════════════════════════════════════════════════════════════════

export const tpl2asMathT1CombinatoricsRandomVar: ParameterizedTemplate = {
	id: 'tpl_2as_math_t1_combinatorics_random_var',
	grade: '2as_math',
	trimesterId: 't1',
	domain: 'probability',
	titleAr: 'التحليل التوفيقي وحساب الاحتمالات وقانون المتغير العشوائي والأمل الرياضياتي',
	curriculumLessonId: 'lesson_2as_math_t1_counting_combinatorics_probability_random_variable',
	defaultPoints: 3.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		let w: number;
		let b: number;

		if (difficulty === 'easy') {
			w = rng.pick([3, 4]);
			b = rng.pick([4, 5]);
		} else if (difficulty === 'medium') {
			w = rng.pick([3, 4, 5]);
			b = rng.pick([5, 6]);
		} else {
			w = rng.pick([4, 5]);
			b = rng.pick([6, 7]);
		}

		const nTotal = w + b;
		// Drawing 3 balls simultaneously without replacement
		const totalOutcomes = (nTotal * (nTotal - 1) * (nTotal - 2)) / 6;

		// Combinations for X in {0, 1, 2, 3}
		// C(w, k) * C(b, 3 - k)
		const cBlack2 = (b * (b - 1)) / 2;
		const c0 = (b * (b - 1) * (b - 2)) / 6;
		const c1 = w * cBlack2;
		const c2 = ((w * (w - 1)) / 2) * b;
		const c3 = (w * (w - 1) * (w - 2)) / 6;

		// E(X) = 3 * w / nTotal
		const [eNum, eDen] = simplifyFraction(3 * w, nTotal);
		const eKatex = fracKatex(eNum, eDen);
		const eTypst = fracTypst(eNum, eDen);

		// V(X) = 3 * (w / nTotal) * (b / nTotal) * (nTotal - 3) / (nTotal - 1)
		const vNumRaw = 3 * w * b * (nTotal - 3);
		const vDenRaw = nTotal * nTotal * (nTotal - 1);
		const [vNum, vDen] = simplifyFraction(vNumRaw, vDenRaw);
		const vKatex = fracKatex(vNum, vDen);
		const vTypst = fracTypst(vNum, vDen);

		const correctOpt = `$${eKatex}$`;
		const dist1 = `$${fracKatex(w, nTotal)}$`;
		const dist2 = `$${fracKatex(3 * b, nTotal)}$`;
		const dist3 = `$${fracKatex(eNum + 1, eDen)}$`;

		const mcq = buildUniqueMcqOptions(
			correctOpt,
			[
				{
					text: dist1,
					diagnosticFeedback: `هذا احتمال سحب كرية بيضاء واحدة عند سحب كرية واحدة فقط، بينما نسحب 3 كريات معاً.`
				},
				{
					text: dist2,
					diagnosticFeedback: `هذا الأمل الرياضياتي لعدد الكريات السوداء وليس البيضاء.`
				},
				{
					text: dist3,
					diagnosticFeedback: `تحقق من دقة حساب المجموع $\\sum x_i P(X = x_i)$.`
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '2as_math',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `يحتوي كيس على $${w}$ كريات بيضاء و $${b}$ كريات سوداء متماثلة لا نفرق بينها باللمس. نسحب عشوائياً وفي آن واحد $3$ كريات من الكيس. ليكن $X$ المتغير العشوائي الذي يعبر عن عدد الكريات البيضاء المسحوبة. ما هي قيمة الأمل الرياضياتي $E(X)$؟`,
				questionTextAr: `احسب الأمل الرياضياتي $E(X)$:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices
				},
				explanation: `عدد الكريات الإجمالي هو $N = ${nTotal}$. عدد عناصر المجموعة الشاملة هو $\\binom{${nTotal}}{3} = ${totalOutcomes}$.\nقانون المتغير العشوائي $X$ يأخذ القيم $\\{0, 1, 2, 3\\}$.\nالأمل الرياضياتي لسحب $n=3$ عناصر دون إرجاع من مجتمع به $w$ عناصر بيضاء من أصل $N$ يُعطى بالقانون الدقيق:\n$E(X) = n \\cdot \\frac{w}{N} = 3 \\cdot \\frac{${w}}{${nTotal}} = ${eKatex}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'التمرين الثالث (شعبة رياضيات — التحليل التوفيقي وقانون المتغير العشوائي)',
				instruction: `يحتوي صندوق على $${nTotal}$ كريات متماثلة لا نفرق بينها عند اللمس، منها $${w}$ كريات بيضاء تحمل الرقم $1$ و $${b}$ كريات سوداء تحمل الرقم $0$.\nنسحب عشوائياً وفي آن واحد $3$ كريات من الصندوق.\nليكن $X$ المتغير العشوائي الذي يرفق بكل سحب عدد الكريات البيضاء المسحوبة.`,
				content: [
					{
						type: 'text',
						content: `*الجزء الأول: حساب الاحتمالات المنتهية (1.5 نقطة)*\n\n1) احسب عدد الحالات الممكنة الإجمالية لهذا السحب (استعمل التوفيقات $C_n^p$).\n2) احسب احتمال الحوادث التالية:\n   - $A$: "سحب $3$ كريات سوداء".\n   - $B$: "سحب كرية بيضاء واحدة على الأقل".\n   - $C$: "سحب كرية بيضاء واحدة بالضبط وكرتين سوداوين".`,
						answer: `1) عدد الحالات الممكنة الإجمالية:\nبما أن السحب في آن واحد، فإن عدد الحالات هو توفيقة $3$ عناصر من بين $${nTotal}$:\n$Omega = C_${nTotal}^3 = frac(${nTotal} times ${nTotal - 1} times ${nTotal - 2}, 3 times 2 times 1) = ${totalOutcomes}$.\n\n2) حساب احتمالات الحوادث:\n- الحادثة $A$ (3 سوداء):\n$P(A) = frac(C_${b}^3, ${totalOutcomes}) = frac(${c0}, ${totalOutcomes})$.\n- الحادثة $B$ (كرية بيضاء على الأقل): الحادثة العكسية هي $A$ (عدم سحب أي كرية بيضاء):\n$P(B) = 1 - P(A) = 1 - frac(${c0}, ${totalOutcomes}) = frac(${totalOutcomes - c0}, ${totalOutcomes})$.\n- الحادثة $C$ (كرية بيضاء واحدة بالضبط وكرتان سوداوان):\n$P(C) = frac(C_${w}^1 times C_${b}^2, ${totalOutcomes}) = frac(${w} times ${cBlack2}, ${totalOutcomes}) = frac(${c1}, ${totalOutcomes})$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `*الجزء الثاني: قانون الاحتمال والأمل والتباين (2 نقطة)*\n\n1) حدد القيم الممكنة للمتغير العشوائي $X$.\n2) عيّن قانون احتمال المتغير العشوائي $X$ ولخص نتائجه في جدول إحصائي.\n3) احسب الأمل الرياضياتي $E(X)$، وأعطِ تفسيراً عملياً للنتيجة المحصل عليها.\n4) احسب التباين $V(X)$ والانحراف المعياري $sigma(X)$.`,
						answer: `1) القيم الممكنة للمتغير العشوائي $X$ هي: $X(Omega) = { 0, 1, 2, 3 }$.\n\n2) قانون الاحتمال:\n- $P(X = 0) = frac(C_${b}^3, ${totalOutcomes}) = frac(${c0}, ${totalOutcomes})$\n- $P(X = 1) = frac(C_${w}^1 times C_${b}^2, ${totalOutcomes}) = frac(${c1}, ${totalOutcomes})$\n- $P(X = 2) = frac(C_${w}^2 times C_${b}^1, ${totalOutcomes}) = frac(${c2}, ${totalOutcomes})$\n- $P(X = 3) = frac(C_${w}^3, ${totalOutcomes}) = frac(${c3}, ${totalOutcomes})$\nتحقق: $frac(${c0} + ${c1} + ${c2} + ${c3}, ${totalOutcomes}) = frac(${totalOutcomes}, ${totalOutcomes}) = 1$.\n\nالجدول الملخص:\n#table(\n  columns: 5,\n  align: center + horizon,\n  [$x_i$], [$0$], [$1$], [$2$], [$3$],\n  [$P(X = x_i)$], [$frac(${c0}, ${totalOutcomes})$], [$frac(${c1}, ${totalOutcomes})$], [$frac(${c2}, ${totalOutcomes})$], [$frac(${c3}, ${totalOutcomes})$]\n)\n\n3) حساب الأمل الرياضياتي $E(X)$:\n$E(X) = sum_(i=0)^3 x_i P(X = x_i) = 0 times frac(${c0}, ${totalOutcomes}) + 1 times frac(${c1}, ${totalOutcomes}) + 2 times frac(${c2}, ${totalOutcomes}) + 3 times frac(${c3}, ${totalOutcomes}) = frac(${c1 + 2 * c2 + 3 * c3}, ${totalOutcomes}) = ${eTypst}$.\nالتفسير: عند تكرار السحب لعدد كبير من المرات في نفس الظروف، نتحصل في المتوسط على $${eTypst}$ كرية بيضاء في كل سحبة.\n\n4) التباين والانحراف المعياري:\n$E(X^2) = 0^2 times frac(${c0}, ${totalOutcomes}) + 1^2 times frac(${c1}, ${totalOutcomes}) + 2^2 times frac(${c2}, ${totalOutcomes}) + 3^2 times frac(${c3}, ${totalOutcomes}) = frac(${c1 + 4 * c2 + 9 * c3}, ${totalOutcomes})$.\n$V(X) = E(X^2) - [E(X)]^2 = ${vTypst}$.\nالانحراف المعياري: $sigma(X) = sqrt(V(X)) = sqrt(${vTypst})$.`,
						mark: '2'
					}
				]
			},
			hints: [
				`السحب في آن واحد يعني استخدام التوفيقات $C_n^p = \\frac{n!}{p!(n-p)!}$.`,
				`مجموع احتمالات قيم المتغير العشوائي يجب أن يساوي دائماً $1$.`,
				`الأمل الرياضياتي يحسب بالقانون: $E(X) = \\sum x_i P(X = x_i) = n \\cdot \\frac{w}{N}$.`
			],
			solutionStepsAr: [
				`حساب الحالات الإجمالية $\\binom{${nTotal}}{3} = ${totalOutcomes}$.`,
				`حساب احتمالات الحوادث $A$ و $B$ و $C$.`,
				`تعيين قانون الاحتمال للمتغير العشوائي $X$ وجدوله.`,
				`حساب الأمل $E(X) = ${eKatex}$ والتباين $V(X) = ${vKatex}$.`
			],
			finalAnswer: `${eKatex}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Stream-Exclusive 2AS Math: N-Point Barycenter & Metric Loci
// ═══════════════════════════════════════════════════════════════════════════════

export const tpl2asMathT1NPointBarycenterCeva: ParameterizedTemplate = {
	id: 'tpl_2as_math_t1_n_point_barycenter_ceva',
	grade: '2as_math',
	trimesterId: 't1',
	domain: 'geometry',
	titleAr: 'مرجح n نقطة مثقلة وخاصية التجميع ومبرهنة سيفا ومجموعات النقط',
	curriculumLessonId: 'lesson_2as_math_t1_barycenter_n_points_associativity_coordinates',
	defaultPoints: 3.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		let bcLength: number;
		let mult: number;

		if (difficulty === 'easy') {
			bcLength = rng.pick([4, 6]);
			mult = 2;
		} else if (difficulty === 'medium') {
			bcLength = rng.pick([6, 8]);
			mult = rng.pick([2, 4]);
		} else {
			bcLength = rng.pick([6, 8, 10]);
			mult = rng.pick([2, 4, 6]);
		}

		// Triangle ABC, weights: A(2), B(1), C(1)
		// Total weight = 4 != 0
		// A' midpoint of [BC], G midpoint of [AA']
		// || 2 MA + MB + MC || = mult * || MB - MC ||
		// || 4 MG || = mult * BC ==> MG = (mult * bcLength) / 4
		const radius = (mult * bcLength) / 4;

		const correctOpt = `دائرة مركزها $G$ ونصف قطرها $R = ${radius}\\text{ cm}$`;
		const dist1 = `دائرة مركزها $A$ ونصف قطرها $R = ${radius}\\text{ cm}$`;
		const dist2 = `المستقيم المحوري للقطعة $[BC]$`;
		const dist3 = `دائرة مركزها $A'$ ونصف قطرها $R = ${radius}\\text{ cm}$`;

		const mcq = buildUniqueMcqOptions(
			correctOpt,
			[
				{
					text: dist1,
					diagnosticFeedback: `المرجح للجملة هو النقطة $G$ وليس النقطة $A$.`
				},
				{
					text: dist2,
					diagnosticFeedback: `الطرف الأيمن ثابت ويساوي $BC$، لذا مجموعة النقط هي دائرة وليست مستقيماً محورياً.`
				},
				{
					text: dist3,
					diagnosticFeedback: `النقطة $A'$ هي مرجح النقطتين $B$ و $C$ فقط، بينما الجملة تضم النقطة $A$ أيضاً ومرجحها الشامل هو $G$.`
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '2as_math',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في المستوي، ليكن $ABC$ مثلثاً بحيث $BC = ${bcLength}\\text{ cm}$، و $G$ مرجح الجملة المثقلة $\\{(A, 2), (B, 1), (C, 1)\\}$. مجموعة النقط $M$ من المستوي التي تحقق العلاقة الشعاعية: $\\|2\\vec{MA} + \\vec{MB} + \\vec{MC}\\| = ${mult} \\|\\vec{MB} - \\vec{MC}\\|$ هي:`,
				questionTextAr: `عيّن طبيعة وعناصر مجموعة النقط $M$:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices
				},
				explanation: `مجموع المعاملات هو $2 + 1 + 1 = 4 \\neq 0$. حسب الخاصية الأساسية للمرجح فإن:\n$2\\vec{MA} + \\vec{MB} + \\vec{MC} = 4\\vec{MG}$.\nوبالنسبة للطرف الأيمن: $\\vec{MB} - \\vec{MC} = \\vec{CB}$، وبالتالي $\\|\\vec{MB} - \\vec{MC}\\| = BC = ${bcLength}\\text{ cm}$.\nتصبح المعادلة: $\\|4\\vec{MG}\\| = ${mult} \\cdot BC \\iff 4 MG = ${mult * bcLength} \\iff MG = ${radius}\\text{ cm}$.\nإذن مجموعة النقط $M$ هي دائرة مركزها $G$ ونصف قطرها $R = ${radius}\\text{ cm}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'التمرين الأول (شعبة رياضيات — مرجح n نقطة وخاصية التجميع ومجموعات النقط)',
				instruction: `المستوي منسوب إلى معلم متعامد ومتجانس $(O; arrow(i), arrow(j))$.\nليكن $A B C$ مثلثاً كيفياً، والنقطة $A'$ منتصف القطعة $[B C]$ حيث $B C = ${bcLength}$ cm.\nنعتبر الجملة المثقلة: $S = { (A, 2), (B, 1), (C, 1) }$.`,
				content: [
					{
						type: 'text',
						content: `*الجزء الأول: البرهان على وجود المرجح وخاصية التجميع (1.5 نقطة)*\n\n1) برّر وجود النقطة $G$ مرجح الجملة $S$.\n2) باستعمال خاصية التجميع، بيّن أن النقطة $G$ هي منتصف القطعة المستقيمة $[A A']$.\n3) أنشئ شكلاً هندسياً دقيقاً يوضح المثلث $A B C$ والنقط $A'$ و $G$.\n4) اكتب الشعاع $arrow(A G)$ بدلالة الشعاعين $arrow(A B)$ و $arrow(A C)$.`,
						answer: `1) تبرير وجود المرجح $G$:\nمجموع المعاملات هو $alpha + beta + gamma = 2 + 1 + 1 = 4$.\nبما أن $4 != 0$، فإن مرجح الجملة المثقلة موجود وهو نقطة وحيدة $G$.\n\n2) تطبيق خاصية التجميع:\nبما أن $A'$ منتصف $[B C]$، فإن $A'$ هي مرجح الجملة المثقلة { (B, 1), (C, 1) } بمعامل إجمالي $1 + 1 = 2$.\nحسب خاصية التجميع للمرجح، يكون $G$ مرجح الجملة المثقلة { (A, 2), (A', 2) }.\nوبما أن المعاملين متساويان ($2 = 2$)، فإن $G$ هي منتصف القطعة المستقيمة $[A A']$.\n\n3) الإنشاء الهندسي:\nنرسم المثلث $A B C$، نعيّن منتصف $[B C]$ ونسميه $A'$، ثم نصل القطعة المتوسطة $[A A']$ ونعيّن منتصفها $G$.\n\n4) كتابة $arrow(A G)$ بدلالة $arrow(A B)$ و $arrow(A C)$:\nلدينا $arrow(A G) = frac(1, 2) arrow(A A')$.\nوبما أن $A'$ منتصف $[B C]$، فإن $arrow(A A') = frac(1, 2) (arrow(A B) + arrow(A C))$.\nبالتعويض نجد: $arrow(A G) = frac(1, 4) arrow(A B) + frac(1, 4) arrow(A C)$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `*الجزء الثاني: دراسة وتعيين مجموعات النقط (2 نقطة)*\n\n1) لتكن $(Gamma_1)$ مجموعة النقط $M$ من المستوي التي تحقق:\n$norm(2 arrow(M A) + arrow(M B) + arrow(M C)) = ${mult} norm(arrow(M B) - arrow(M C))$.\nعيّن طبيعة المجموعة $(Gamma_1)$ وحدد عناصرها المميزة، ثم أنشئها.\n\n2) لتكن $(Gamma_2)$ مجموعة النقط $M$ من المستوي التي تحقق:\n$norm(2 arrow(M A) + arrow(M B) + arrow(M C)) = norm(2 arrow(M A) - arrow(M B) - arrow(M C))$.\n   أ) بيّن أن الشعاع $arrow(V) = 2 arrow(M A) - arrow(M B) - arrow(M C)$ شعاع مستقل عن النقطة $M$ ويساوي $2 arrow(A' A)$.\n   ب) استنتج طبيعة المجموعة $(Gamma_2)$ وبيّن أنها تشمل النقطة $A$.`,
						answer: `1) تحديد طبيعة $(Gamma_1)$:\nحسب الخاصية المميّزة للمرجح $G$:\n$2 arrow(M A) + arrow(M B) + arrow(M C) = (2 + 1 + 1) arrow(M G) = 4 arrow(M G)$.\nولدينا: $arrow(M B) - arrow(M C) = arrow(C B)$، إذن $norm(arrow(M B) - arrow(M C)) = B C = ${bcLength}$ cm.\nالعلاقة المعطاة تكافئ:\n$norm(4 arrow(M G)) = ${mult} times B C arrow.l.r.double 4 M G = ${mult} times ${bcLength} = ${mult * bcLength} arrow.l.r.double M G = ${radius}$ cm.\nإذن $(Gamma_1)$ هي دائرة مركزها $G$ ونصف قطرها $R = ${radius}$ cm.\n\n2) دراسة المجموعة $(Gamma_2)$:\n   أ) استقلالية الشعاع $arrow(V)$ عن $M$:\nمجموع معاملات هذا الشعاع هو $2 - 1 - 1 = 0$.\nنُدخل النقطة $A$ بعلاقة شال:\n$arrow(V) = 2 arrow(M A) - (arrow(M A) + arrow(A B)) - (arrow(M A) + arrow(A C)) = - (arrow(A B) + arrow(A C))$.\nوبما أن $A'$ منتصف $[B C]$ فإن $arrow(A B) + arrow(A C) = 2 arrow(A A')$.\nإذن: $arrow(V) = - 2 arrow(A A') = 2 arrow(A' A)$، وهو شعاع ثابت مستقل تماماً عن النقطة $M$.\n   ب) استنتاج المجموعة $(Gamma_2)$:\nالعلاقة تكافئ: $norm(4 arrow(M G)) = norm(2 arrow(A' A)) arrow.l.r.double 4 M G = 2 A' A arrow.l.r.double M G = frac(1, 2) A A'$.\nوبما أن $G$ منتصف $[A A']$، فإن $frac(1, 2) A A' = G A$.\nتصبح المعادلة: $M G = G A$.\nإذن $(Gamma_2)$ هي الدائرة التي مركزها $G$ ونصف قطرها $R' = G A$، وهي بالتعريف تشمل النقطة $A$.`,
						mark: '2'
					}
				]
			},
			hints: [
				`استعمل خاصية التجميع لتعويض النقطتين $B$ و $C$ بمنتصفهما $A'$.`,
				`في الطرف الأيمن، لاحظ أن $\\vec{MB} - \\vec{MC} = \\vec{CB}$ شعاع ثابت طوله $BC$.`,
				`عندما يكون مجموع المعاملات معدوماً ($2 - 1 - 1 = 0$)، فإن الشعاع يكون مستقلاً تماماً عن النقطة $M$.`
			],
			solutionStepsAr: [
				`تبرير وجود المرجح لأن مجموع المعاملات $4 \\neq 0$.`,
				`إثبات أن $G$ منتصف $[AA']$ باستعمال خاصية التجميع.`,
				`تحديد المجموعة $(\\Gamma_1)$ كدائرة مركزها $G$ ونصف قطرها $R = ${radius}\\text{ cm}$.`,
				`إثبات استقلالية الشعاع وتحديد $(\\Gamma_2)$ كدائرة مركزها $G$ وتمر بالنقطة $A$.`
			],
			finalAnswer: `R = ${radius} cm`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 1 Parameterized Templates for 2AS Math Track (6 Templates)
// ═══════════════════════════════════════════════════════════════════════════════

export const TEMPLATES_2AS_MATH_T1: ParameterizedTemplate[] = [
	tpl2asMathT1CompositionDomainSymmetry,
	tpl2asMathT1ParametricHornerPolynomials,
	tpl2asMathT1DerivativeTangentApprox,
	tpl2asMathT1CombinatoricsRandomVar,
	tpl2asMathT1NPointBarycenterCeva,
	tpl2asMathT1ProblemSynthesis
];
