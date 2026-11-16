import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';
import { adaptTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../rng';
import { SHARED_TEMPLATES_3AS_T3 } from '../../secondary_shared_3as/templates/t3';

// ═══════════════════════════════════════════════════════════════════════════════
// 3AS Mathematics stream (Coeff 7) — Trimester 3
// Shared core (adapted) + stream-exclusive deeper integral calculus:
//   I_n = integral_0^1 x^n e^(-x) dx, integration by parts recurrence, squeeze,
//   volume of revolution V = pi * integral y^2 dx = c^2 pi I_(2m) checked by Simpson.
// quizQuestion = KaTeX ($...$), sujetExercise = pure Typst math (zero LaTeX commands).
// ═══════════════════════════════════════════════════════════════════════════════

function factorial(n: number): number {
	let r = 1;
	for (let i = 2; i <= n; i++) r *= i;
	return r;
}

/** A_n = sum_{k=0}^{n} n!/k!  (integer) so that I_n = n! - A_n / e. */
function sumA(n: number): number {
	let s = 0;
	for (let k = 0; k <= n; k++) s += factorial(n) / factorial(k);
	return s;
}

function simpson(fn: (x: number) => number, lo: number, hi: number, n = 2000): number {
	const h = (hi - lo) / n;
	let acc = fn(lo) + fn(hi);
	for (let i = 1; i < n; i++) acc += fn(lo + i * h) * (i % 2 === 1 ? 4 : 2);
	return (acc * h) / 3;
}

/** I_n = integral_0^1 x^n e^(-x) dx through the recurrence I_(n+1) = (n+1) I_n - 1/e. */
function integralByRecurrence(n: number): number {
	let val = 1 - Math.exp(-1);
	for (let j = 0; j < n; j++) val = (j + 1) * val - Math.exp(-1);
	return val;
}

function closedFormValue(n: number): number {
	return factorial(n) - sumA(n) * Math.exp(-1);
}

const tplIntegralSequencesVolumes: ParameterizedTemplate = {
	id: 'tpl_3as_math_t3_integral_sequences_volumes',
	grade: '3as_math',
	trimesterId: 't3',
	domain: 'analysis',
	titleAr: 'المتتاليات المعرفة بتكامل، المكاملة بالتجزئة وحساب حجوم الدوران',
	curriculumLessonId: 'lesson_3as_math_t3_deeper_integrals_by_parts_sequences_volumes',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const m = difficulty === 'easy' ? rng.pick([1, 2]) : rng.pick([1, 2, 3]);
		const c = difficulty === 'easy' ? 1 : rng.pick([1, 2]);
		const kTarget = difficulty === 'easy' ? rng.pick([2, 3]) : rng.pick([3, 4, 5]);
		const nRec = rng.int(2, 6);

		// Numerical sanity: closed form == recurrence == Simpson on [0, 1]
		for (const n of [0, 1, kTarget, 2 * m, nRec]) {
			const viaRec = integralByRecurrence(n);
			const viaClosed = closedFormValue(n);
			const viaSimpson = simpson((x) => Math.pow(x, n) * Math.exp(-x), 0, 1);
			if (Math.abs(viaRec - viaSimpson) >= 1e-4 || Math.abs(viaClosed - viaSimpson) >= 1e-4) {
				throw new Error(`I_${n} mismatch: rec=${viaRec}, closed=${viaClosed}, simpson=${viaSimpson}`);
			}
		}

		const Ik = closedFormValue(kTarget);
		const IkRounded = roundTo(Ik, 3);
		const I2m = closedFormValue(2 * m);
		const V = c * c * Math.PI * I2m;
		const VSimpson = Math.PI * simpson((x) => Math.pow(c * Math.pow(x, m) * Math.exp(-x / 2), 2), 0, 1);
		if (!Number.isFinite(V) || Math.abs(V - VSimpson) >= 1e-4) {
			throw new Error(`Volume mismatch: closed=${V}, simpson=${VSimpson}`);
		}
		const VRounded = roundTo(V, 3);

		// Closed forms I_j = j! - A_j e^(-1) for j = 1..kTarget
		const closedK: string[] = [];
		const closedT: string[] = [];
		for (let j = 1; j <= kTarget; j++) {
			closedK.push(`I_{${j}} = ${j}I_{${j - 1}} - e^{-1} = ${factorial(j)} - ${sumA(j)}e^{-1}`);
			closedT.push(`I_${j} = ${j} I_${j - 1} - e^(-1) = ${factorial(j)} - ${sumA(j)} e^(-1)`);
		}

		const cK = c === 1 ? '' : `${c}`;
		const cT = c === 1 ? '' : `${c} `;
		const xmK = m === 1 ? 'x' : `x^{${m}}`;
		const xmT = m === 1 ? 'x' : `x^${m}`;
		const curveK = `y = ${cK}${xmK}e^{-x/2}`;
		const curveT = `y = ${cT}${xmT} e^(-x/2)`;
		const coef2m = c * c;
		const V_exactK = `${coef2m === 1 ? '' : coef2m}\\pi\\left(${factorial(2 * m)} - ${sumA(2 * m)}e^{-1}\\right)`;
		const V_exactT = `${coef2m === 1 ? '' : `${coef2m} `}pi (${factorial(2 * m)} - ${sumA(2 * m)} e^(-1))`;

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${IkRounded}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `لتكن $I_n = \\int_0^1 x^n e^{-x}\\,dx$ . علماً أن $I_0 = 1 - e^{-1}$ وأن $I_{n+1} = (n+1)I_n - e^{-1}$ ، احسب $I_{${kTarget}}$ مدوراً إلى $10^{-3}$:`,
				questionTextAr: `احسب $I_{${kTarget}}$ مدوراً إلى $0.001$ حيث $I_n = \\int_0^1 x^n e^{-x}\\,dx$:`,
				questionData: { answer: IkRounded, displayTemplate: 'I = ?', variables: [], tolerance: 0.001 },
				explanation: `${closedK.map((e) => `$${e}$`).join('، ')} ، ومنه $I_{${kTarget}} = ${factorial(kTarget)} - ${sumA(kTarget)}e^{-1} \\approx ${IkRounded}$.`
			};
		} else if (difficulty === 'medium') {
			const correctOpt = `$I_{${nRec + 1}} = ${nRec + 1}I_{${nRec}} - e^{-1}$`;
			const mcq = buildUniqueMcqOptions(
				correctOpt,
				[
					{ text: `$I_{${nRec + 1}} = ${nRec + 1}I_{${nRec}} + e^{-1}$`, diagnosticFeedback: 'أخطأت في إشارة الحد المتكامل: $[-x^{n+1}e^{-x}]_0^1 = -e^{-1}$.' },
					{ text: `$I_{${nRec + 1}} = ${nRec}I_{${nRec}} - e^{-1}$`, diagnosticFeedback: 'مشتق $x^{n+1}$ هو $(n+1)x^n$ وليس $nx^n$.' },
					{ text: `$I_{${nRec + 1}} = ${nRec + 1}I_{${nRec}} - 1$`, diagnosticFeedback: 'الحد المتكامل $[-x^{n+1}e^{-x}]_0^1$ يساوي $-e^{-1}$ وليس $-1$.' },
					{ text: `$I_{${nRec + 1}} = \\frac{I_{${nRec}}}{${nRec + 1}} - e^{-1}$`, diagnosticFeedback: 'في المكاملة بالتجزئة نضرب $I_n$ في $(n+1)$ ولا نقسم.' }
				],
				rng
			);
			finalAnswer = `I_${nRec + 1} = ${nRec + 1} I_${nRec} - e^-1`;
			quizQuestion = {
				type: 'mcq',
				questionText: `لتكن $I_n = \\int_0^1 x^n e^{-x}\\,dx$ . باستعمال المكاملة بالتجزئة ($u = x^{n+1}$ و $v' = e^{-x}$) ، ما العلاقة التي تربط $I_{${nRec + 1}}$ بـ $I_{${nRec}}$؟`,
				questionTextAr: `عبّر عن $I_{${nRec + 1}}$ بدلالة $I_{${nRec}}$ حيث $I_n = \\int_0^1 x^n e^{-x}\\,dx$:`,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `$I_{n+1} = \\left[-x^{n+1}e^{-x}\\right]_0^1 + (n+1)\\int_0^1 x^n e^{-x}\\,dx = (n+1)I_n - e^{-1}$ ، فمن أجل $n = ${nRec}$: $I_{${nRec + 1}} = ${nRec + 1}I_{${nRec}} - e^{-1}$.`
			};
		} else {
			finalAnswer = `${VRounded}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `الحيز المستوي المحدد بالمنحنى $(C): ${curveK}$ ومحور الفواصل والمستقيمين $x = 0$ و $x = 1$ يدور حول محور الفواصل. باستعمال $I_n = \\int_0^1 x^n e^{-x}\\,dx = n! - e^{-1}\\sum_{k=0}^{n}\\frac{n!}{k!}$ ، احسب الحجم $V$ للمجسم الناتج (بوحدة الحجم) مدوراً إلى $10^{-3}$:`,
				questionTextAr: `احسب حجم الدوران $V = \\pi\\int_0^1 y^2\\,dx$ للمنحنى $${curveK}$ مدوراً إلى $0.001$:`,
				questionData: { answer: VRounded, displayTemplate: 'V = ?', variables: [], tolerance: 0.001 },
				explanation: `$V = \\pi\\int_0^1 \\left(${cK}${xmK}e^{-x/2}\\right)^2 dx = ${coef2m === 1 ? '' : coef2m}\\pi I_{${2 * m}} = ${V_exactK} \\approx ${VRounded}$.`
			};
		}

		const answerNote = `$I_(${kTarget}) approx ${roundTo(Ik, 4)}$`;

		return {
			templateId: this.id,
			seed,
			grade: '3as_math',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `من أجل كل عدد طبيعي $n$ نضع $I_n = integral_0^1 x^n e^(-x) dif x$.`,
				content: [
					{
						type: 'text',
						content: `1) احسب $I_0$ ثم باستعمال المكاملة بالتجزئة بيّن أنه من أجل كل عدد طبيعي $n$: $I_(n+1) = (n+1) I_n - e^(-1)$.`,
						answer: `1) $I_0 = integral_0^1 e^(-x) dif x = [-e^(-x)]_0^1 = 1 - e^(-1)$.\nنضع $u(x) = x^(n+1)$ و $v'(x) = e^(-x)$ ، أي $u'(x) = (n+1) x^n$ و $v(x) = -e^(-x)$ :\n$I_(n+1) = [-x^(n+1) e^(-x)]_0^1 + (n+1) integral_0^1 x^n e^(-x) dif x = -e^(-1) + (n+1) I_n$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) أ) بيّن أنه من أجل كل $n$: $frac(e^(-1), n+1) <= I_n <= frac(1, n+1)$. ب) بيّن أن المتتالية $(I_n)$ متناقصة ثم استنتج أنها متقاربة وعيّن نهايتها.`,
						answer: `2) أ) من أجل $x in [0, 1]$: $e^(-1) <= e^(-x) <= 1$ ، فـ $e^(-1) x^n <= x^n e^(-x) <= x^n$ وبالمكاملة على $[0, 1]$ مع $integral_0^1 x^n dif x = frac(1, n+1)$ نجد $frac(e^(-1), n+1) <= I_n <= frac(1, n+1)$.\nب) $I_(n+1) - I_n = integral_0^1 x^n (x - 1) e^(-x) dif x <= 0$ لأن $x^n (x - 1) e^(-x) <= 0$ على $[0, 1]$ ، فالمتتالية متناقصة ومحدودة من الأسفل بـ $0$ ، إذن متقاربة. وبما أن $0 <= I_n <= frac(1, n+1)$ فإن $lim_(n arrow.r +oo) I_n = 0$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) استنتج القيمة المضبوطة للعدد $I_${kTarget}$ ثم قيمته المقربة إلى $10^(-3)$.`,
						answer: `3) من العلاقة التراجعية: ${closedT.map((s) => `$${s}$`).join('، ')}.\nإذن $I_${kTarget} = ${factorial(kTarget)} - ${sumA(kTarget)} e^(-1)$ ، أي ${answerNote}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `4) المنحنى $(C)$ معرف بالعبارة $${curveT}$ على المجال $[0, 1]$. أحسب حجم المجسم الناتج عن دوران الحيز المحصور بين $(C)$ ومحور الفواصل حول محور الفواصل (وحدة الحجم).`,
						answer: `4) $V = pi integral_0^1 y^2 dif x = pi integral_0^1 (${cT}${xmT} e^(-x/2))^2 dif x = ${coef2m === 1 ? '' : `${coef2m} `}pi integral_0^1 x^${2 * m} e^(-x) dif x = ${coef2m === 1 ? '' : `${coef2m} `}pi I_${2 * m}$.\nإذن $V = ${V_exactT} approx ${roundTo(V, 4)}$ وحدة حجم.`,
						mark: '1'
					}
				]
			},
			hints: [
				`المكاملة بالتجزئة: $\\int u v' = [uv] - \\int u' v$ مع $u = x^{n+1}$ و $v' = e^{-x}$.`,
				`على $[0, 1]$ لدينا $e^{-1} \\leq e^{-x} \\leq 1$ ؛ ضرب المتباينة في $x^n \\geq 0$ ثم المكاملة.`,
				`حجم الدوران حول محور الفواصل: $V = \\pi\\int_a^b y^2\\,dx$ ؛ وهنا $y^2 = ${coef2m === 1 ? '' : coef2m}x^{${2 * m}}e^{-x}$.`
			],
			solutionStepsAr: [
				`$I_0 = 1 - e^{-1}$ و $I_{n+1} = (n+1)I_n - e^{-1}$ (مكاملة بالتجزئة).`,
				`الحصر: $\\frac{e^{-1}}{n+1} \\leq I_n \\leq \\frac{1}{n+1}$ ، المتتالية متناقصة ونهايتها $0$.`,
				`${closedK.map((e) => `$${e}$`).join('، ')}.`,
				`الحجم: $V = ${coef2m === 1 ? '' : coef2m}\\pi I_{${2 * m}} = ${V_exactK} \\approx ${roundTo(V, 4)}$ (تحقق عددي بطريقة سيمبسون).`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Adaptation of shared core templates → exact 3as_math curriculum lesson IDs
// ═══════════════════════════════════════════════════════════════════════════════

function adaptShared(index: number, lessonId: string): ParameterizedTemplate {
	const adapted = adaptTemplateForTrack(SHARED_TEMPLATES_3AS_T3[index], '3as_math');
	return { ...adapted, curriculumLessonId: lessonId };
}

const tplDefiniteIntegral = adaptShared(0, 'lesson_3as_math_t3_primitives_definite_integral_mean_value');
const tplSpaceSphere = adaptShared(2, 'lesson_3as_math_t3_space_vectors_sphere_cylinder_cone');
const tplSpacePlanes = adaptShared(3, 'lesson_3as_math_t3_space_scalar_product_planes_loci');
const tplSpaceParametric = adaptShared(4, 'lesson_3as_math_t3_space_relative_positions_intersections');
const tplBacSynthesis = adaptShared(5, 'lesson_3as_math_t3_integration');

export const TEMPLATES_3AS_MATH_T3: ParameterizedTemplate[] = [
	tplDefiniteIntegral,
	tplIntegralSequencesVolumes,
	tplSpaceSphere,
	tplSpacePlanes,
	tplSpaceParametric,
	tplBacSynthesis
];
