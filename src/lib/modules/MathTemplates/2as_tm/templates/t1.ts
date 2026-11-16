import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';
import { adaptTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, SeededRng } from '../../rng';
import { SHARED_TEMPLATES_2AS_T1 } from '../../secondary_shared_2as/templates/t1';

// ═══════════════════════════════════════════════════════════════════════════════
// Dual Syntax Formatters (KaTeX for Quiz / Hints, Typst for SujetExercise)
// Western digits 0-9 strictly enforced across both targets.
// ═══════════════════════════════════════════════════════════════════════════════

function poly2Katex(a: number, b: number, c: number, varName = 'x'): string {
	const parts: string[] = [];
	if (a !== 0) {
		if (a === 1) parts.push(`${varName}^2`);
		else if (a === -1) parts.push(`-${varName}^2`);
		else parts.push(`${a}${varName}^2`);
	}
	if (b !== 0) {
		const absB = Math.abs(b);
		const term = absB === 1 ? varName : `${absB}${varName}`;
		if (parts.length === 0) parts.push(b < 0 ? `-${term}` : term);
		else parts.push(b < 0 ? `- ${term}` : `+ ${term}`);
	}
	if (c !== 0) {
		const absC = Math.abs(c);
		if (parts.length === 0) parts.push(`${c}`);
		else parts.push(c < 0 ? `- ${absC}` : `+ ${absC}`);
	}
	return parts.length === 0 ? '0' : parts.join(' ');
}

function poly2Typst(a: number, b: number, c: number, varName = 'x'): string {
	const parts: string[] = [];
	if (a !== 0) {
		if (a === 1) parts.push(`${varName}^2`);
		else if (a === -1) parts.push(`-${varName}^2`);
		else parts.push(`${a} ${varName}^2`);
	}
	if (b !== 0) {
		const absB = Math.abs(b);
		const term = absB === 1 ? varName : `${absB} ${varName}`;
		if (parts.length === 0) parts.push(b < 0 ? `-${term}` : term);
		else parts.push(b < 0 ? `- ${term}` : `+ ${term}`);
	}
	if (c !== 0) {
		const absC = Math.abs(c);
		if (parts.length === 0) parts.push(`${c}`);
		else parts.push(c < 0 ? `- ${absC}` : `+ ${absC}`);
	}
	return parts.length === 0 ? '0' : parts.join(' ');
}

function poly3Katex(c3: number, c2: number, c1: number, c0: number, varName = 'x'): string {
	const parts: string[] = [];
	if (c3 !== 0) {
		if (c3 === 1) parts.push(`${varName}^3`);
		else if (c3 === -1) parts.push(`-${varName}^3`);
		else parts.push(`${c3}${varName}^3`);
	}
	if (c2 !== 0) {
		const absC2 = Math.abs(c2);
		const term = absC2 === 1 ? `${varName}^2` : `${absC2}${varName}^2`;
		if (parts.length === 0) parts.push(c2 < 0 ? `-${term}` : term);
		else parts.push(c2 < 0 ? `- ${term}` : `+ ${term}`);
	}
	if (c1 !== 0) {
		const absC1 = Math.abs(c1);
		const term = absC1 === 1 ? varName : `${absC1}${varName}`;
		if (parts.length === 0) parts.push(c1 < 0 ? `-${term}` : term);
		else parts.push(c1 < 0 ? `- ${term}` : `+ ${term}`);
	}
	if (c0 !== 0) {
		const absC0 = Math.abs(c0);
		if (parts.length === 0) parts.push(`${c0}`);
		else parts.push(c0 < 0 ? `- ${absC0}` : `+ ${absC0}`);
	}
	return parts.length === 0 ? '0' : parts.join(' ');
}

function poly3Typst(c3: number, c2: number, c1: number, c0: number, varName = 'x'): string {
	const parts: string[] = [];
	if (c3 !== 0) {
		if (c3 === 1) parts.push(`${varName}^3`);
		else if (c3 === -1) parts.push(`-${varName}^3`);
		else parts.push(`${c3} ${varName}^3`);
	}
	if (c2 !== 0) {
		const absC2 = Math.abs(c2);
		const term = absC2 === 1 ? `${varName}^2` : `${absC2} ${varName}^2`;
		if (parts.length === 0) parts.push(c2 < 0 ? `-${term}` : term);
		else parts.push(c2 < 0 ? `- ${term}` : `+ ${term}`);
	}
	if (c1 !== 0) {
		const absC1 = Math.abs(c1);
		const term = absC1 === 1 ? varName : `${absC1} ${varName}`;
		if (parts.length === 0) parts.push(c1 < 0 ? `-${term}` : term);
		else parts.push(c1 < 0 ? `- ${term}` : `+ ${term}`);
	}
	if (c0 !== 0) {
		const absC0 = Math.abs(c0);
		if (parts.length === 0) parts.push(`${c0}`);
		else parts.push(c0 < 0 ? `- ${absC0}` : `+ ${absC0}`);
	}
	return parts.length === 0 ? '0' : parts.join(' ');
}

function poly3WithParamKatex(c3: number, c2: number, c0: number, varName = 'x'): string {
	const parts: string[] = [];
	if (c3 !== 0) {
		if (c3 === 1) parts.push(`${varName}^3`);
		else if (c3 === -1) parts.push(`-${varName}^3`);
		else parts.push(`${c3}${varName}^3`);
	}
	if (c2 !== 0) {
		const absC2 = Math.abs(c2);
		const term = absC2 === 1 ? `${varName}^2` : `${absC2}${varName}^2`;
		if (parts.length === 0) parts.push(c2 < 0 ? `-${term}` : term);
		else parts.push(c2 < 0 ? `- ${term}` : `+ ${term}`);
	}
	parts.push(`+ m${varName}`);
	if (c0 !== 0) {
		const absC0 = Math.abs(c0);
		parts.push(c0 < 0 ? `- ${absC0}` : `+ ${absC0}`);
	}
	return parts.join(' ');
}

function poly3WithParamTypst(c3: number, c2: number, c0: number, varName = 'x'): string {
	const parts: string[] = [];
	if (c3 !== 0) {
		if (c3 === 1) parts.push(`${varName}^3`);
		else if (c3 === -1) parts.push(`-${varName}^3`);
		else parts.push(`${c3} ${varName}^3`);
	}
	if (c2 !== 0) {
		const absC2 = Math.abs(c2);
		const term = absC2 === 1 ? `${varName}^2` : `${absC2} ${varName}^2`;
		if (parts.length === 0) parts.push(c2 < 0 ? `-${term}` : term);
		else parts.push(c2 < 0 ? `- ${term}` : `+ ${term}`);
	}
	parts.push(`+ m ${varName}`);
	if (c0 !== 0) {
		const absC0 = Math.abs(c0);
		parts.push(c0 < 0 ? `- ${absC0}` : `+ ${absC0}`);
	}
	return parts.join(' ');
}

// ═══════════════════════════════════════════════════════════════════════════════
// Helper to Adapt Shared Parameterized Template for Track 2AS TM
// ═══════════════════════════════════════════════════════════════════════════════

function adaptShared(
	base: ParameterizedTemplate,
	curriculumLessonId: string
): ParameterizedTemplate {
	const adapted = adaptTemplateForTrack(base, '2as_tm');
	return {
		...adapted,
		curriculumLessonId,
		generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
			const res = adapted.generate(seed, difficulty);
			return {
				...res,
				grade: '2as_tm'
			};
		}
	};
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2AS TM Stream-Exclusive Template 1: Horner Algorithm, Divisibility & Roots
// ═══════════════════════════════════════════════════════════════════════════════

interface HornerConfig {
	alpha: number;
	A: number;
	r1: number;
	r2: number;
	r2_text_k: string;
	r2_text_t: string;
}

const HORNER_CONFIGS: HornerConfig[] = [
	// Easy
	{ alpha: 2, A: 1, r1: -3, r2: 1, r2_text_k: '1', r2_text_t: '1' },
	{ alpha: 1, A: 1, r1: -4, r2: 2, r2_text_k: '2', r2_text_t: '2' },
	{ alpha: -2, A: 1, r1: 1, r2: 4, r2_text_k: '4', r2_text_t: '4' },
	{ alpha: 3, A: 1, r1: -2, r2: 1, r2_text_k: '1', r2_text_t: '1' },
	// Medium (including fractions)
	{ alpha: 3, A: 2, r1: -2, r2: 0.5, r2_text_k: '\\frac{1}{2}', r2_text_t: 'frac(1, 2)' },
	{ alpha: -2, A: 2, r1: -1, r2: 1.5, r2_text_k: '\\frac{3}{2}', r2_text_t: 'frac(3, 2)' },
	{ alpha: 2, A: 1, r1: -1, r2: 3, r2_text_k: '3', r2_text_t: '3' },
	{ alpha: -3, A: 1, r1: -1, r2: 2, r2_text_k: '2', r2_text_t: '2' },
	// Hard
	{ alpha: 1, A: 2, r1: -1, r2: 3, r2_text_k: '3', r2_text_t: '3' },
	{ alpha: -1, A: 2, r1: -3, r2: 2, r2_text_k: '2', r2_text_t: '2' },
	{ alpha: 1, A: 1, r1: -3, r2: 4, r2_text_k: '4', r2_text_t: '4' },
	{ alpha: -1, A: 1, r1: -2, r2: 3, r2_text_k: '3', r2_text_t: '3' }
];

export const tplHornerDivisibilityRoots: ParameterizedTemplate = {
	id: 'tpl_2as_tm_t1_horner_divisibility_roots',
	grade: '2as_tm',
	trimesterId: 't1',
	domain: 'algebra',
	titleAr: 'كثيرات الحدود: خوارزمية هورنر، قابلية القسمة والتحليل وحل المتراجحات',
	curriculumLessonId: 'lesson_2as_tm_t1_polynomials_divisibility_roots_factoring',
	defaultPoints: 5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		let pool: HornerConfig[];
		if (difficulty === 'easy') {
			pool = HORNER_CONFIGS.slice(0, 4);
		} else if (difficulty === 'medium') {
			pool = HORNER_CONFIGS.slice(4, 8);
		} else {
			pool = HORNER_CONFIGS.slice(8, 12);
		}

		const cfg = pool[(seed - 1) % pool.length];
		const { alpha, A, r1, r2, r2_text_k, r2_text_t } = cfg;

		// Q(x) = A*(x - r1)*(x - r2) = A*x^2 + B*x + C
		const B = Math.round(-A * (r1 + r2));
		const C = Math.round(A * r1 * r2);

		// P(x) = (x - alpha)*Q(x) = c3*x^3 + c2*x^2 + c1*x + c0
		const c3 = A;
		const c2 = B - A * alpha;
		const c1 = C - alpha * B;
		const c0 = -alpha * C;

		// Horner algorithm intermediate values
		const b2 = c3;
		const b1 = c2 + alpha * b2; // = B
		const b0 = c1 + alpha * b1; // = C
		const rem = c0 + alpha * b0; // = 0

		// Sorted roots for inequality sign table
		interface RootItem {
			val: number;
			textK: string;
			textT: string;
		}
		const rootItems: RootItem[] = [
			{ val: alpha, textK: `${alpha}`, textT: `${alpha}` },
			{ val: r1, textK: `${r1}`, textT: `${r1}` },
			{ val: r2, textK: r2_text_k, textT: r2_text_t }
		].sort((a, b) => a.val - b.val);

		const [rt1, rt2, rt3] = rootItems;

		const pmKatex = poly3WithParamKatex(c3, c2, c0);
		const pmTypst = poly3WithParamTypst(c3, c2, c0);
		const pKatex = poly3Katex(c3, c2, c1, c0);
		const pTypst = poly3Typst(c3, c2, c1, c0);
		const qKatex = poly2Katex(A, B, C);
		const qTypst = poly2Typst(A, B, C);

		const alphaFactorKatex = alpha >= 0 ? `(x - ${alpha})` : `(x + ${Math.abs(alpha)})`;
		const alphaFactorTypst = alpha >= 0 ? `(x - ${alpha})` : `(x + ${Math.abs(alpha)})`;

		// MCQ Quiz Question
		const correctOpt = `$m = ${c1}$`;
		const dist1 = `$m = ${c1 + (alpha > 0 ? alpha : -alpha)}$`;
		const dist2 = `$m = ${-c1}$`;
		const dist3 = `$m = ${c1 - 2}$`;

		const mcq = buildUniqueMcqOptions(
			correctOpt,
			[
				{ text: dist1, diagnosticFeedback: 'انتبه لإشارة الباقي عند التعويض المباشر بقيمة الجذر.' },
				{ text: dist2, diagnosticFeedback: 'انتبه: حل المعادلة P(alpha) = 0 يتطلب نقل الثابت بالإشارة المعاكسة.' },
				{ text: dist3, diagnosticFeedback: 'تحقق من حساب قوى alpha بدقة: alpha^3 و alpha^2.' }
			],
			rng
		);

		const ineqSolKatex = `[${rt1.textK} ; ${rt2.textK}] \\cup [${rt3.textK} ; +\\infty[`;
		const ineqSolTypst = `[${rt1.textT}, ${rt2.textT}] union [${rt3.textT}, +oo[`;

		return {
			templateId: this.id,
			seed,
			grade: '2as_tm',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `نعتبر كثير الحدود $P_m(x) = ${pmKatex}$ للمتغير الحقيقي $x$ حيث $m$ وسيط حقيقي.\nما هي قيمة الوسيط $m$ حتى يقبل $P_m(x)$ القسمة على $${alphaFactorKatex}$؟`,
				questionTextAr: `عيّن قيمة الوسيط الحقيقي $m$ حتى يقبل كثير الحدود القسمة على $${alphaFactorKatex}$:`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `يقبل كثير الحدود $P_m(x)$ القسمة على $${alphaFactorKatex}$ إذا وفقط إذا كان $${alpha}$ جذراً له، أي:\n$P_m(${alpha}) = 0 \\iff ${c3}(${alpha})^3 + (${c2})(${alpha})^2 + m(${alpha}) + (${c0}) = 0$\n$\\iff ${c3 * alpha ** 3 + c2 * alpha ** 2 + c0} + ${alpha}m = 0 \\iff ${alpha}m = ${-c1 * alpha} \\iff m = ${c1}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نعتبر كثير الحدود $P_m(x)$ للمتغير الحقيقي $x$ المعرف بالعبارة: $P_m(x) = ${pmTypst}$، حيث $m$ وسيط حقيقي.`,
				content: [
					{
						type: 'text',
						content: `1) عيّن قيمة الوسيط الحقيقي $m$ حتى يقبل $P_m(x)$ القسمة على الثنائية $${alphaFactorTypst}$.`,
						answer: `1) تعيين قيمة الوسيط $m$:\n- يقبل $P_m(x)$ القسمة على $${alphaFactorTypst}$ إذا وفقط إذا كان $P_m(${alpha}) = 0$.\n- بالتعويض: $P_m(${alpha}) = ${c3}(${alpha})^3 + (${c2})(${alpha})^2 + m(${alpha}) + (${c0}) = 0$.\n- التبسيط: $${c3 * alpha ** 3 + c2 * alpha ** 2 + c0} + ${alpha} m = 0 arrow.r.double ${alpha} m = ${-c1 * alpha} arrow.r.double m = ${c1}$.\nإذن القيمة المطلوبة هي: $m = ${c1}$.`,
						mark: '1.0'
					},
					{
						type: 'text',
						content: `2) نضع في كل ما يلي: $m = ${c1}$، فيصبح $P(x) = ${pTypst}$.\nباستعمال خوارزمية هورنر (أو القسمة الإقليدية)، عيّن كثير الحدود $Q(x)$ بحيث: $P(x) = ${alphaFactorTypst} Q(x)$.`,
						answer: `2) تطبيق خوارزمية هورنر على كثير الحدود $P(x)$ بالجذر $alpha = ${alpha}$:\n- سطر المعاملات الأصلية: $[${c3}, ${c2}, ${c1}, ${c0}]$.\n- الحساب التكراري لهورنر:\n  * معامل الدرجة الثانية: $b_2 = ${c3} = ${b2}$.\n  * معامل الدرجة الأولى: $b_1 = ${c2} + (${alpha} times ${b2}) = ${b1}$.\n  * الحد الثابت: $b_0 = ${c1} + (${alpha} times ${b1}) = ${b0}$.\n  * الباقي: $R = ${c0} + (${alpha} times ${b0}) = ${rem} = 0$.\nومنه حاصل القسمة هو: $Q(x) = ${qTypst}$، وتكون العبارة المحللة: $P(x) = ${alphaFactorTypst} (${qTypst})$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) أ) حل في المجموعة $bb(R)$ المعادلة: $Q(x) = 0$.\nب) استنتج مجموعة حلول المعادلة: $P(x) = 0$.`,
						answer: `3) أ) حل المعادلة $Q(x) = 0$:\n- $Q(x) = ${qTypst} = 0$.\n- المميز: $Delta = (${B})^2 - 4(${A})(${C}) = ${B * B - 4 * A * C}$.\n- بما أن $Delta > 0$ فالمعادلة تقبل حلين متمايزين: $x' = ${r1}$ و $x'' = ${r2_text_t}$.\n\nب) حلول المعادلة $P(x) = 0$:\n$P(x) = 0 arrow.r.double ${alphaFactorTypst} = 0$ أو $Q(x) = 0$.\nمجموعة الحلول هي: $S = {${rt1.textT}, ${rt2.textT}, ${rt3.textT}}$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) شكّل جدول إشارة كثير الحدود $P(x)$ على $bb(R)$، ثم استنتج مجموعة حلول المتراجحة: $P(x) >= 0$.`,
						answer: `4) جدول الإشارة وحل المتراجحة:\n- الجذور مرتبة تصاعدياً: $x_1 = ${rt1.textT}$، $x_2 = ${rt2.textT}$، $x_3 = ${rt3.textT}$.\n- إشارة العامل $${alphaFactorTypst}$ وإشارة $Q(x)$ على المجالات الجزئية تعطي:\n  * على $]-oo, ${rt1.textT}]$: $P(x) <= 0$\n  * على $[${rt1.textT}, ${rt2.textT}]$: $P(x) >= 0$\n  * على $[${rt2.textT}, ${rt3.textT}]$: $P(x) <= 0$\n  * على $[${rt3.textT}, +oo[$: $P(x) >= 0$\nإذن مجموعة حلول المتراجحة $P(x) >= 0$ هي:\n$S = ${ineqSolTypst}$.`,
						mark: '1.0'
					}
				]
			},
			hints: [
				`يقبل كثير الحدود $P_m(x)$ القسمة على $(x - \\alpha)$ إذا وفقط إذا كان $\\alpha$ جذراً له، أي $P_m(\\alpha) = 0$.`,
				`في خوارزمية هورنر: أنزل المعامل الأول $b_2 = a_3$، ثم اضرب في الجذر $\\alpha$ واجمع مع المعامل الموالي حتى تجد الباقي معدوماً.`,
				`في جدول إشارة كثير الحدود من الدرجة الثالثة بجذور متمايزة ومعامل رئيسي موجب، تتناوب الإشارة: سالب، موجب، سالب، موجب.`
			],
			solutionStepsAr: [
				`تعيين الوسيط: حل $P_m(${alpha}) = 0 \\implies m = ${c1}$.`,
				`تحليل هورنر: استخراج المعاملات $[${b2}, ${b1}, ${b0}]$ واستنتاج $Q(x) = ${qKatex}$.`,
				`حل المعادلة $P(x) = 0$: إيجاد الجذور الثلاثة $\\{${rt1.textK} ; ${rt2.textK} ; ${rt3.textK}\\}$.`,
				`دراسة الإشارة: تشكيل جدول الإشارة واستنتاج حلول $P(x) \\ge 0$ وهي $S = ${ineqSolKatex}$.`
			],
			finalAnswer: `m = ${c1} \\quad ; \\quad S = \\{${rt1.textK} ; ${rt2.textK} ; ${rt3.textK}\\}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 1 Parameterized Templates for 2AS Technical Mathematics
// Exactly 6 templates matching curriculum sequences and Algerian BAC stream rules
// ═══════════════════════════════════════════════════════════════════════════════

export const TEMPLATES_2AS_TM_T1: ParameterizedTemplate[] = [
	adaptShared(SHARED_TEMPLATES_2AS_T1[0], 'lesson_2as_tm_t1_functions_operations_composition'),
	tplHornerDivisibilityRoots,
	adaptShared(SHARED_TEMPLATES_2AS_T1[2], 'lesson_2as_tm_t1_derivatives_rate_of_change_tangent'),
	adaptShared(SHARED_TEMPLATES_2AS_T1[3], 'lesson_2as_tm_t1_finite_probability_random_variable_expectation'),
	adaptShared(SHARED_TEMPLATES_2AS_T1[4], 'lesson_2as_tm_t1_barycenter_two_three_points_properties'),
	adaptShared(SHARED_TEMPLATES_2AS_T1[5], 'lesson_2as_tm_t1_derivatives_rules_rational_functions_optimization')
];
