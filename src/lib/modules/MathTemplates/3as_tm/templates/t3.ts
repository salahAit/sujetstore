import type { ExerciseBlock } from '../../../SujetBuilder/types';
import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate } from '../../types';
import { adaptTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../rng';
import { SHARED_TEMPLATES_3AS_T3 } from '../../secondary_shared_3as/templates/t3';

// ═══════════════════════════════════════════════════════════════════════════════
// 3AS Technique-Mathématique — Trimester 3 (6 templates)
//   Integral calculus + 3D space (adapted) + integral sequences (exclusive)
//   + 1 BAC synthesis (7 pts)
// Dual syntax: KaTeX for quiz / hints / steps, pure Typst math for sujetExercise.
// Western digits 0-9 only. No Fermat's little theorem, no direct plane similitudes.
// ═══════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Adapted shared templates (exact 3as_tm lessonIds)
// ═══════════════════════════════════════════════════════════════════════════════

function adaptShared(index: number, curriculumLessonId: string): ParameterizedTemplate {
	const adapted = adaptTemplateForTrack(SHARED_TEMPLATES_3AS_T3[index], '3as_tm');
	return { ...adapted, curriculumLessonId };
}

export const tpl3asTmT3DefiniteIntegralMean: ParameterizedTemplate = adaptShared(
	0,
	'lesson_3as_tm_t3_definite_integral_mean_value_bounds'
);

export const tpl3asTmT3SpaceSphereCylinderCone: ParameterizedTemplate = adaptShared(
	2,
	'lesson_3as_tm_t3_space_vectors_sphere_cylinder_cone'
);

export const tpl3asTmT3SpacePlanesDistance: ParameterizedTemplate = adaptShared(
	3,
	'lesson_3as_tm_t3_space_scalar_product_planes_loci'
);

export const tpl3asTmT3SpaceParametricIntersections: ParameterizedTemplate = adaptShared(
	4,
	'lesson_3as_tm_t3_space_relative_positions_intersections'
);

export const tpl3asTmT3BacSynthesis: ParameterizedTemplate = adaptShared(
	5,
	'lesson_3as_tm_t3_integration'
);

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Stream-exclusive: I_n = ∫_0^b x^n e^{-x} dx — integration by parts & recurrence
// ═══════════════════════════════════════════════════════════════════════════════

/** Composite Simpson rule on [lo, hi] with an even number `steps` of sub-intervals. */
export function simpsonIntegral(f: (x: number) => number, lo: number, hi: number, steps = 2000): number {
	const n = steps % 2 === 0 ? steps : steps + 1;
	const h = (hi - lo) / n;
	let sum = f(lo) + f(hi);
	for (let i = 1; i < n; i++) {
		sum += f(lo + i * h) * (i % 2 === 0 ? 2 : 4);
	}
	return (sum * h) / 3;
}

export interface IntegralSeqTerm {
	/** I_n = p + r * e^{-b} with integers p and r (r < 0) */
	p: number;
	r: number;
	value: number;
}

/** Exact value of I_n = ∫_0^b x^n e^{-x} dx from the integration-by-parts recurrence. */
export function integralSequenceTerm(n: number, b: number): IntegralSeqTerm {
	let p = 1;
	let r = -1;
	for (let k = 0; k < n; k++) {
		p = (k + 1) * p;
		r = (k + 1) * r - Math.pow(b, k + 1);
	}
	return { p, r, value: p + r * Math.exp(-b) };
}

/** Same recurrence but with a common student mistake (used to build MCQ distractors). */
function wrongSequenceTerm(n: number, b: number, variant: 1 | 2 | 3): { p: number; r: number } {
	let p = 1;
	let r = -1;
	for (let k = 0; k < n; k++) {
		if (variant === 1) {
			p = (k + 1) * p;
			r = (k + 1) * r + Math.pow(b, k + 1);
		} else if (variant === 2) {
			p = k * p;
			r = k * r - Math.pow(b, k + 1);
		} else {
			p = (k + 1) * p;
			r = (k + 1) * r - (k + 1) * Math.pow(b, k + 1);
		}
	}
	return { p, r };
}

function expKatex(b: number): string {
	return `e^{-${b}}`;
}

function expTypst(b: number): string {
	return `e^(-${b})`;
}

function termKatex(p: number, r: number, b: number): string {
	if (r === 0) return `${p}`;
	const abs = Math.abs(r);
	const coef = abs === 1 ? '' : `${abs} `;
	return `${p} ${r < 0 ? '-' : '+'} ${coef}${expKatex(b)}`;
}

function termTypst(p: number, r: number, b: number): string {
	if (r === 0) return `${p}`;
	const abs = Math.abs(r);
	const coef = abs === 1 ? '' : `${abs} `;
	return `${p} ${r < 0 ? '-' : '+'} ${coef}${expTypst(b)}`;
}

export interface IntegralSequenceParams {
	level: Difficulty;
	/** upper bound of integration (lower bound is 0) */
	b: number;
	/** index of the term requested */
	n: number;
}

/** Deterministic parameter builder (exported so tests can replay the exact instance). */
export function integralSequenceParams(
	seed: number,
	difficulty: Difficulty = 'medium'
): IntegralSequenceParams {
	const rng = new SeededRng(seed);
	if (difficulty === 'easy') {
		return { level: 'easy', b: rng.pick([1, 2]), n: 1 };
	}
	if (difficulty === 'medium') {
		return { level: 'medium', b: rng.pick([1, 2]), n: rng.int(2, 4) };
	}
	return { level: 'hard', b: 1, n: rng.int(3, 5) };
}

export const tpl3asTmT3IntegralSequencesByParts: ParameterizedTemplate = {
	id: 'tpl_3as_tm_t3_integral_sequences_by_parts',
	grade: '3as_tm',
	trimesterId: 't3',
	domain: 'analysis',
	titleAr: 'المكاملة بالتجزئة والمتتاليات المعرفة بتكامل: علاقة تراجعية وحصر',
	curriculumLessonId: 'lesson_3as_tm_t3_deeper_integrals_by_parts_sequences_volumes',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const { b, n } = integralSequenceParams(seed, difficulty);
		const term = integralSequenceTerm(n, b);

		// Numerical guard: the closed form must agree with Simpson's rule on [0, b].
		for (let k = 0; k <= n; k++) {
			const exact = integralSequenceTerm(k, b).value;
			const approx = simpsonIntegral((x) => Math.pow(x, k) * Math.exp(-x), 0, b, 2000);
			if (!Number.isFinite(exact) || Math.abs(exact - approx) >= 1e-4) {
				throw new Error(`Integral sequence mismatch for n=${k}, b=${b}`);
			}
		}

		const terms = Array.from({ length: n + 1 }, (_, k) => integralSequenceTerm(k, b));
		const valuesTypst = terms
			.map((t, k) => `$I_${k} = ${termTypst(t.p, t.r, b)}$`)
			.join('، ');
		const stepsKatex = terms.map((t, k) => `$I_{${k}} = ${termKatex(t.p, t.r, b)}$`).join('، ');

		const I0 = terms[0];
		const I1 = integralSequenceTerm(1, b);
		const I1Approx = roundTo(I1.value, 3);
		const boundValue = Math.pow(b, n + 1) / (n + 1);
		const boundTypst = `frac(${Math.pow(b, n + 1)}, ${n + 1})`;
		const boundKatex = `\\frac{${Math.pow(b, n + 1)}}{${n + 1}}`;
		const recurrenceTypst = `I_(n+1) = (n + 1) I_n - ${b === 1 ? '' : `${b}^(n+1) `}${expTypst(b)}`;
		const recurrenceKatex = `I_{n+1} = (n + 1) I_n - ${b === 1 ? '' : `${b}^{n+1} `}${expKatex(b)}`;
		const intDef = `integral_0^${b} x^n e^(-x) dif x`;
		const intDefKatex = `\\int_0^{${b}} x^n e^{-x}\\,dx`;

		const byPartsAnswer = `نضع $u(x) = x^(n+1)$ و $v'(x) = e^(-x)$ فيكون $u'(x) = (n+1) x^n$ و $v(x) = -e^(-x)$ (الدالتان $u$ و $v$ من الصنف $C^1$ على $[0, ${b}]$).\nبالمكاملة بالتجزئة: $I_(n+1) = [-x^(n+1) e^(-x)]_0^${b} + (n+1) integral_0^${b} x^n e^(-x) dif x = -${b}^(n+1) e^(-${b}) + (n+1) I_n$.\nإذن من أجل كل $n in bb(N)$: $${recurrenceTypst}$.`;

		// ─────────────────────────── EASY ───────────────────────────
		if (difficulty === 'easy') {
			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `من أجل كل عدد طبيعي $n$ نضع $I_n = ${intDef}$.`,
				content: [
					{
						type: 'text',
						content: `1) احسب $I_0$.`,
						answer: `1) $I_0 = integral_0^${b} e^(-x) dif x = [-e^(-x)]_0^${b} = -e^(-${b}) + 1 = ${termTypst(I0.p, I0.r, b)}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) باستعمال المكاملة بالتجزئة، احسب القيمة المضبوطة للتكامل $I_1 = integral_0^${b} x e^(-x) dif x$.`,
						answer: `2) نضع $u(x) = x$ و $v'(x) = e^(-x)$ إذن $u'(x) = 1$ و $v(x) = -e^(-x)$.\n$I_1 = [-x e^(-x)]_0^${b} + integral_0^${b} e^(-x) dif x = -${b} e^(-${b}) + I_0 = -${b} e^(-${b}) + ${termTypst(I0.p, I0.r, b)} = ${termTypst(I1.p, I1.r, b)}$.`,
						mark: '1.75'
					},
					{
						type: 'text',
						content: `3) أعط قيمة مقربة إلى $10^(-3)$ للعدد $I_1$ ثم فسّر هندسياً هذا العدد.`,
						answer: `3) $I_1 approx ${I1Approx}$.\n$I_1$ هو مساحة الحيز المحدد بالمنحنى $y = x e^(-x)$ ومحور الفواصل والمستقيمين $x = 0$ و $x = ${b}$ (بوحدات المساحة) لأن $x e^(-x) >= 0$ على $[0, ${b}]$.`,
						mark: '1.25'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_tm',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: `احسب بالمكاملة بالتجزئة التكامل $I_1 = \\int_0^{${b}} x e^{-x}\\,dx$ (مقرباً إلى $10^{-3}$).`,
					questionTextAr: `القيمة المقربة إلى $10^{-3}$ للتكامل $\\int_0^{${b}} x e^{-x}\\,dx$ هي:`,
					questionData: {
						answer: I1Approx,
						displayTemplate: `I_1 ≈ ?`,
						variables: [],
						tolerance: 0.001
					},
					explanation: `بوضع $u = x$ و $v' = e^{-x}$: $I_1 = [-x e^{-x}]_0^{${b}} + \\int_0^{${b}} e^{-x}\\,dx = ${termKatex(I1.p, I1.r, b)} \\approx ${I1Approx}$.`
				},
				sujetExercise,
				hints: [
					`المكاملة بالتجزئة: $\\int_a^b u v'\\,dx = [uv]_a^b - \\int_a^b u' v\\,dx$.`,
					`اختر $u(x) = x$ (يختزل عند الاشتقاق) و $v'(x) = e^{-x}$ أي $v(x) = -e^{-x}$.`,
					`$I_0 = \\int_0^{${b}} e^{-x}\\,dx = 1 - ${expKatex(b)}$ ثم عوّض في $I_1 = -${b} ${expKatex(b)} + I_0$.`
				],
				solutionStepsAr: [
					`$I_0 = ${termKatex(I0.p, I0.r, b)}$.`,
					`$I_1 = [-x e^{-x}]_0^{${b}} + I_0 = ${termKatex(I1.p, I1.r, b)}$.`,
					`$I_1 \\approx ${I1Approx}$ وهو مساحة الحيز تحت المنحنى $y = x e^{-x}$ على $[0, ${b}]$.`
				],
				finalAnswer: `I_1 = ${termKatex(I1.p, I1.r, b)} ≈ ${I1Approx}`
			};
		}

		// ─────────────────────────── MEDIUM ───────────────────────────
		if (difficulty === 'medium') {
			const correctText = `$${termKatex(term.p, term.r, b)}$`;
			const wrongTerms = ([1, 2, 3] as const).map((variant) => {
				const w = wrongSequenceTerm(n, b, variant);
				return { variant, ...w };
			});
			const feedback: Record<number, string> = {
				1: 'خطأ في إشارة الحد المتكامل: عند المكاملة بالتجزئة يظهر $-[x^{n+1}e^{-x}]_0^b$ بإشارة سالبة.',
				2: 'معامل $I_n$ في العلاقة التراجعية هو $(n+1)$ (مشتق $x^{n+1}$) وليس $n$.',
				3: 'الحد المتكامل $-b^{n+1}e^{-b}$ لا يُضرب في $(n+1)$؛ المعامل $(n+1)$ يخص $I_n$ فقط.'
			};
			const mcq = buildUniqueMcqOptions(
				correctText,
				wrongTerms.map((w) => ({
					text: `$${termKatex(w.p, w.r, b)}$`,
					diagnosticFeedback: feedback[w.variant]
				})),
				rng
			);

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `من أجل كل عدد طبيعي $n$ نضع $I_n = ${intDef}$.`,
				content: [
					{
						type: 'text',
						content: `1) باستعمال المكاملة بالتجزئة، بيّن أنه من أجل كل $n in bb(N)$: $${recurrenceTypst}$.`,
						answer: `1) ${byPartsAnswer}`,
						mark: '1.25'
					},
					{
						type: 'text',
						content: `2) احسب $I_0$ ثم استنتج القيم المضبوطة لـ $I_1, ..., I_${n}$.`,
						answer: `2) $I_0 = [-e^(-x)]_0^${b} = ${termTypst(I0.p, I0.r, b)}$.\nبتطبيق العلاقة التراجعية بالتتابع:\n${valuesTypst}.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) بيّن أنه من أجل كل $n$: $0 <= I_n <= frac(${b}^(n+1), n+1)$ ثم تحقق من هذا الحصر من أجل $n = ${n}$.`,
						answer: `3) من أجل $x in [0, ${b}]$ لدينا $0 <= e^(-x) <= 1$ إذن $0 <= x^n e^(-x) <= x^n$، وبالمكاملة (الحفاظ على الترتيب):\n$0 <= I_n <= integral_0^${b} x^n dif x = [frac(x^(n+1), n+1)]_0^${b} = frac(${b}^(n+1), n+1)$.\nمن أجل $n = ${n}$: $I_${n} approx ${roundTo(term.value, 4)}$ و $frac(${b}^${n + 1}, ${n + 1}) = ${roundTo(boundValue, 4)}$ إذن $0 <= ${roundTo(term.value, 4)} <= ${roundTo(boundValue, 4)}$.`,
						mark: '1.25'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_tm',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `نضع $I_n = ${intDefKatex}$ ونعلم أنه من أجل كل $n$: $${recurrenceKatex}$. ما هي القيمة المضبوطة لـ $I_{${n}}$؟`,
					questionTextAr: `احسب $I_{${n}}$ انطلاقاً من $I_0 = 1 - ${expKatex(b)}$ والعلاقة التراجعية.`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `نطبق العلاقة بالتتابع انطلاقاً من $I_0$: ${stepsKatex}.`
				},
				sujetExercise,
				hints: [
					`ضع $u(x) = x^{n+1}$ و $v'(x) = e^{-x}$ أي $u'(x) = (n+1)x^n$ و $v(x) = -e^{-x}$.`,
					`$I_0 = \\int_0^{${b}} e^{-x}\\,dx = 1 - ${expKatex(b)}$؛ ثم احسب $I_1$ فـ $I_2$ ... بتطبيق العلاقة.`,
					`على $[0, ${b}]$: $0 \\le e^{-x} \\le 1$ فيكون $0 \\le x^n e^{-x} \\le x^n$ ثم كامل المتراجحة.`
				],
				solutionStepsAr: [
					`المكاملة بالتجزئة: $${recurrenceKatex}$.`,
					`القيم: ${stepsKatex}.`,
					`الحصر: $0 \\le I_{n} \\le ${boundKatex}$ ومن أجل $n = ${n}$: $0 \\le ${roundTo(term.value, 4)} \\le ${roundTo(boundValue, 4)}$.`
				],
				finalAnswer: `I_${n} = ${termKatex(term.p, term.r, b)}`
			};
		}

		// ─────────────────────────── HARD (b = 1) ───────────────────────────
		const approxT = roundTo(term.value, 3);
		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `من أجل كل عدد طبيعي $n$ نضع $I_n = integral_0^1 x^n e^(-x) dif x$.`,
			content: [
				{
					type: 'text',
					content: `1) بيّن أنه من أجل كل $n in bb(N)$: $I_(n+1) = (n + 1) I_n - e^(-1)$ ثم احسب $I_0$ و $I_${n}$ بدقة.`,
					answer: `1) ${byPartsAnswer}\n$I_0 = [-e^(-x)]_0^1 = 1 - e^(-1)$، وبتطبيق العلاقة:\n${valuesTypst}.`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `2) بيّن أنه من أجل كل $n$: $0 <= I_n <= frac(1, n+1)$ ثم استنتج $lim_(n -> +infinity) I_n$.`,
					answer: `2) على $[0, 1]$: $0 <= e^(-x) <= 1$ إذن $0 <= x^n e^(-x) <= x^n$ ومنه $0 <= I_n <= integral_0^1 x^n dif x = frac(1, n+1)$.\nبما أن $lim_(n -> +infinity) frac(1, n+1) = 0$ فحسب مبرهنة الحصر $lim_(n -> +infinity) I_n = 0$.\nتحقق عددي: $I_${n} approx ${approxT}$ و $frac(1, ${n + 1}) approx ${roundTo(1 / (n + 1), 3)}$.`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `3) نضع $J_n = frac(I_n, n!)$. بيّن أن $J_(n+1) = J_n - frac(e^(-1), (n+1)!)$ ثم أن $J_n = 1 - e^(-1) sum_(k=0)^n frac(1, k!)$، واستنتج $lim_(n -> +infinity) sum_(k=0)^n frac(1, k!)$.`,
					answer: `3) بقسمة العلاقة $I_(n+1) = (n+1) I_n - e^(-1)$ على $(n+1)!$ نجد $J_(n+1) = frac(I_n, n!) - frac(e^(-1), (n+1)!) = J_n - frac(e^(-1), (n+1)!)$.\nبالجمع الحدي من $0$ إلى $n-1$ مع $J_0 = I_0 = 1 - e^(-1)$: $J_n = 1 - e^(-1) sum_(k=0)^n frac(1, k!)$.\nلدينا $0 <= J_n <= frac(1, (n+1) n!)$ إذن $lim J_n = 0$ ومنه $e^(-1) sum_(k=0)^n frac(1, k!) -> 1$، أي $lim_(n -> +infinity) sum_(k=0)^n frac(1, k!) = e$.`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_tm',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `نضع $I_n = \\int_0^{1} x^n e^{-x}\\,dx$ ونعلم أن $I_{n+1} = (n+1) I_n - e^{-1}$ و $I_0 = 1 - e^{-1}$. احسب $I_{${n}}$ مقرباً إلى $10^{-3}$.`,
				questionTextAr: `القيمة المقربة إلى $10^{-3}$ للعدد $I_{${n}} = \\int_0^1 x^{${n}} e^{-x}\\,dx$ هي:`,
				questionData: {
					answer: approxT,
					displayTemplate: `I_${n} ≈ ?`,
					variables: [],
					tolerance: 0.001
				},
				explanation: `بتطبيق العلاقة التراجعية: ${stepsKatex}؛ إذن $I_{${n}} = ${termKatex(term.p, term.r, 1)} \\approx ${approxT}$.`
			},
			sujetExercise,
			hints: [
				`المكاملة بالتجزئة بوضع $u(x) = x^{n+1}$ و $v'(x) = e^{-x}$ تعطي $I_{n+1} = -e^{-1} + (n+1) I_n$.`,
				`على $[0, 1]$: $0 \\le e^{-x} \\le 1$ ومنه $0 \\le I_n \\le \\int_0^1 x^n\\,dx = \\frac{1}{n+1}$ ثم طبّق مبرهنة الحصر.`,
				`اقسم العلاقة التراجعية على $(n+1)!$ لتحصل على فرق متتالي $J_{n+1} - J_n$ ثم اجمع حدياً.`
			],
			solutionStepsAr: [
				`$I_{n+1} = (n+1) I_n - e^{-1}$ و ${stepsKatex}.`,
				`$0 \\le I_n \\le \\frac{1}{n+1}$ إذن $\\lim_{n \\to +\\infty} I_n = 0$.`,
				`$J_n = 1 - e^{-1} \\sum_{k=0}^{n} \\frac{1}{k!}$ و $J_n \\to 0$ ومنه $\\sum_{k=0}^{n} \\frac{1}{k!} \\to e$.`
			],
			finalAnswer: `I_${n} = ${termKatex(term.p, term.r, 1)} ≈ ${approxT}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 3 Parameterized Templates for 3AS Technique-Mathématique
// ═══════════════════════════════════════════════════════════════════════════════

export const TEMPLATES_3AS_TM_T3: ParameterizedTemplate[] = [
	tpl3asTmT3DefiniteIntegralMean,
	tpl3asTmT3IntegralSequencesByParts,
	tpl3asTmT3SpaceSphereCylinderCone,
	tpl3asTmT3SpacePlanesDistance,
	tpl3asTmT3SpaceParametricIntersections,
	tpl3asTmT3BacSynthesis
];
