import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';
import { adaptTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, gcd, SeededRng } from '../../rng';
import { SHARED_TEMPLATES_3AS_T1 } from '../../secondary_shared_3as/templates/t1';

// ═══════════════════════════════════════════════════════════════════════════════
// 3AS Mathematics stream (Coeff 7) — Trimester 1
// Shared core (adapted from secondary_shared_3as) + stream-exclusive Arithmetic in Z
//   Euclidean division, congruences mod n, power cycles & base-b numeration.
// quizQuestion = KaTeX ($...$), sujetExercise = pure Typst math (zero LaTeX commands).
// ═══════════════════════════════════════════════════════════════════════════════

function modPow(base: number, exp: number, mod: number): number {
	let result = 1;
	let b = ((base % mod) + mod) % mod;
	let e = exp;
	while (e > 0) {
		if (e % 2 === 1) result = (result * b) % mod;
		b = (b * b) % mod;
		e = Math.floor(e / 2);
	}
	return result;
}

function multiplicativeOrder(a: number, n: number): number {
	let p = 1;
	let cur = a % n;
	while (cur !== 1 && p <= n) {
		cur = (cur * a) % n;
		p++;
	}
	return p;
}

function toBase(value: number, base: number): number[] {
	if (value === 0) return [0];
	const digits: number[] = [];
	let v = value;
	while (v > 0) {
		digits.unshift(v % base);
		v = Math.floor(v / base);
	}
	return digits;
}

function fromBase(digits: number[], base: number): number {
	return digits.reduce((acc, d) => acc * base + d, 0);
}

const tplEuclideanCongruencesNumeration: ParameterizedTemplate = {
	id: 'tpl_3as_math_t1_euclidean_congruences_numeration',
	grade: '3as_math',
	trimesterId: 't1',
	domain: 'arithmetic_z',
	titleAr: 'القسمة الإقليدية والموافقات في Z ودورات القوى والتعداد',
	curriculumLessonId: 'lesson_3as_math_t1_euclidean_division_congruences_numeration',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// 1) Euclidean division N = b q + r
		const bDiv = difficulty === 'easy' ? rng.int(11, 39) : rng.int(23, 97);
		let N = difficulty === 'easy' ? rng.int(400, 2500) : rng.int(1200, 9800);
		if (N % bDiv === 0) N += 1;
		const qDiv = Math.floor(N / bDiv);
		const rDiv = N % bDiv;

		// 2) Power cycle: A^E mod n
		const modPool = difficulty === 'easy' ? [7, 9, 11] : difficulty === 'medium' ? [7, 9, 11, 13] : [11, 13, 17, 19];
		const n = rng.pick(modPool);
		let a = 2;
		let period = 1;
		for (let tries = 0; tries < 200; tries++) {
			a = rng.int(2, n - 1);
			period = multiplicativeOrder(a, n);
			if (gcd(a, n) === 1 && period >= 3) break;
		}
		if (gcd(a, n) !== 1 || period < 3) {
			a = 2;
			period = multiplicativeOrder(2, n);
		}
		const A = a + n * rng.int(1, 3);
		let E = rng.int(200, 2040);
		while (E % period === 0) E += 1;
		const rPow = modPow(A, E, n);
		const rPeriodic = modPow(A, E % period, n);
		if (rPow !== rPeriodic) throw new Error(`Cycle mismatch: ${A}^${E} mod ${n}`);
		const cycle: number[] = [];
		for (let k = 1; k <= period; k++) cycle.push(modPow(A, k, n));
		const Eq = Math.floor(E / period);
		const Er = E % period;

		// 3) Linear congruence u x = v [m]
		const mPool = difficulty === 'easy' ? [5, 7] : difficulty === 'medium' ? [7, 9, 11] : [11, 13, 17];
		const m = rng.pick(mPool);
		let u = 2;
		for (let tries = 0; tries < 200; tries++) {
			u = rng.int(2, m - 1);
			if (gcd(u, m) === 1) break;
		}
		const v = rng.int(1, m - 1);
		let x0 = -1;
		for (let x = 0; x < m; x++) {
			if ((u * x) % m === v) {
				x0 = x;
				break;
			}
		}
		if (x0 < 0 || (u * x0) % m !== v) throw new Error('Linear congruence has no solution');
		const uTable: string[] = [];
		for (let x = 0; x < m; x++) uTable.push(`${x}:${(u * x) % m}`);

		// 4) Numeration in base beta
		const beta = difficulty === 'easy' ? rng.pick([2, 3, 5]) : rng.pick([2, 3, 5, 7]);
		const M = difficulty === 'easy' ? rng.int(25, 120) : rng.int(60, 450);
		const digits = toBase(M, beta);
		if (fromBase(digits, beta) !== M) throw new Error('Base conversion mismatch');
		const digitsK = digits.join('');
		const digitsT = digits.join(' ');
		const expandK = digits.map((d, i) => `${d} \\times ${beta}^{${digits.length - 1 - i}}`).join(' + ');
		const expandT = digits.map((d, i) => `${d} dot ${beta}^${digits.length - 1 - i}`).join(' + ');

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${rDiv}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `بإجراء القسمة الإقليدية للعدد $${N}$ على $${bDiv}$ نكتب $${N} = ${bDiv}q + r$ مع $0 \\leq r < ${bDiv}$. أوجد الباقي $r$:`,
				questionTextAr: `أوجد باقي القسمة الإقليدية للعدد $${N}$ على $${bDiv}$:`,
				questionData: { answer: rDiv, displayTemplate: 'r = ?', variables: [], tolerance: 0 },
				explanation: `$${bDiv} \\times ${qDiv} = ${bDiv * qDiv}$ و $${N} - ${bDiv * qDiv} = ${rDiv}$ ، إذن $${N} = ${bDiv} \\times ${qDiv} + ${rDiv}$ مع $0 \\leq ${rDiv} < ${bDiv}$ ومنه $r = ${rDiv}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${rPow}`;
			const correct = `${rPow}`;
			const wrongEMod = `${E % n}`;
			const wrongNoCycle = `${modPow(A, E % n, n)}`;
			const wrongOffByOne = `${(rPow + 1) % n}`;
			const wrongShift = `${modPow(A, (E % period) + 1, n)}`;
			const mcq = buildUniqueMcqOptions(
				correct,
				[
					{ text: wrongNoCycle, diagnosticFeedback: `لا يمكن اختزال الأس بالقياس $${n}$: دورة القوى تحسب بالقياس $${period}$ (رتبة $${A}$ modulo $${n}$) وليس $${n}$.` },
					{ text: wrongShift, diagnosticFeedback: `راجع الأسّ المتبقي: $${E} = ${period} \\times ${Eq} + ${Er}$ ، ومنه نحتاج $${A}^{${Er}}$ modulo $${n}$.` },
					{ text: wrongEMod, diagnosticFeedback: `هذا باقي قسمة الأس $${E}$ على $${n}$، لا باقي $${A}^{${E}}$.` },
					{ text: wrongOffByOne, diagnosticFeedback: 'تحقّق من جدول قوى العدد بالقياس المعطى.' }
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `ما هو باقي القسمة الإقليدية للعدد $${A}^{${E}}$ على $${n}$؟`,
				questionTextAr: `باقي قسمة $${A}^{${E}}$ على $${n}$:`,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `$${A}^{${period}} \\equiv 1 \\ [${n}]$ ، و $${E} = ${period} \\times ${Eq} + ${Er}$ ، إذن $${A}^{${E}} = (${A}^{${period}})^{${Eq}} \\times ${A}^{${Er}} \\equiv ${A}^{${Er}} \\equiv ${rPow} \\ [${n}]$.`
			};
		} else {
			finalAnswer = `${x0}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `حل المعادلة $${u}x \\equiv ${v} \\ [${m}]$ في $\\mathbb{Z}$. ما هو أصغر حل موجب $x_0$ (مع $0 \\leq x_0 < ${m}$)؟`,
				questionTextAr: `أوجد أصغر حل $x_0 \\in \\{0, 1, \\dots, ${m - 1}\\}$ للموافقة $${u}x \\equiv ${v} \\ [${m}]$:`,
				questionData: { answer: x0, displayTemplate: 'x_0 = ?', variables: [], tolerance: 0 },
				explanation: `بما أن $\\gcd(${u}, ${m}) = 1$ فالعدد $${u}$ قابل للقلب بالقياس $${m}$. باختبار البواقي $0, \\dots, ${m - 1}$ نجد $${u} \\times ${x0} = ${u * x0} \\equiv ${v} \\ [${m}]$. إذن $x \\equiv ${x0} \\ [${m}]$.`
			};
		}

		const tableK = cycle.map((c, i) => `$${A}^{${i + 1}} \\equiv ${c} \\ [${n}]$`).join('، ');
		const tableT = cycle.map((c, i) => `$${A}^${i + 1} equiv ${c} [${n}]$`).join('، ');

		return {
			templateId: this.id,
			seed,
			grade: '3as_math',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `في هذا التمرين، $n$ عدد طبيعي ونرمز بـ $[n]$ إلى «بالتوافق بترديد $n$» في المجموعة $bb(Z)$.`,
				content: [
					{
						type: 'text',
						content: `1) أنجز القسمة الإقليدية للعدد $${N}$ على $${bDiv}$، ثم استنتج باقي قسمة $${N}$ على $${bDiv}$ ومعنى الموافقة $${N} equiv ... [${bDiv}]$.`,
						answer: `1) لدينا $${bDiv} dot ${qDiv} = ${bDiv * qDiv}$ و $${N} - ${bDiv * qDiv} = ${rDiv}$ ، أي $${N} = ${bDiv} dot ${qDiv} + ${rDiv}$ مع $0 <= ${rDiv} < ${bDiv}$.\nإذن حاصل القسمة $q = ${qDiv}$ والباقي $r = ${rDiv}$ ، ومنه $${N} equiv ${rDiv} [${bDiv}]$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) أ) أنشئ جدول البواقي لـ $${A}^k$ بترديد $${n}$ من أجل $k = 1, 2, ...$ إلى أن تتكرر القيمة $1$. ب) استنتج باقي قسمة $${A}^${E}$ على $${n}$.`,
						answer: `2) أ) ${tableT}.\nنلاحظ أن $${A}^${period} equiv 1 [${n}]$ ، فالدورة طولها $${period}$.\nب) $${E} = ${period} dot ${Eq} + ${Er}$ ، إذن $${A}^${E} = (${A}^${period})^${Eq} dot ${A}^${Er} equiv 1^${Eq} dot ${A}^${Er} equiv ${rPow} [${n}]$.\nفباقي القسمة هو $${rPow}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) حل في $bb(Z)$ المعادلة ذات المجهول $x$ التالية: $${u} x equiv ${v} [${m}]$.`,
						answer: `3) نختبر بواقي $x$ بترديد $${m}$ (القيمة: $x$ ثم باقي $${u} x$): ${uTable.join('، ')}.\nالقيمة $${v}$ تظهر فقط من أجل $x equiv ${x0} [${m}]$.\nإذن مجموعة الحلول هي $x = ${x0} + ${m} k$ مع $k in bb(Z)$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `4) أكتب العدد $${M}$ في نظام التعداد ذي الأساس $${beta}$، ثم تحقّق من الكتابة بنشرها.`,
						answer: `4) بالقسمات المتتالية على $${beta}$ نحصل على الأرقام (من اليمين إلى اليسار): ${[...digits].reverse().join('، ')}.\nإذن $${M} = (${digitsT})_${beta}$.\nالتحقق: $${expandT} = ${M}$.`,
						mark: '1'
					}
				]
			},
			hints: [
				`$a = bq + r$ مع $0 \\leq r < b$ ؛ الباقي هو $a - b \\times \\lfloor a / b \\rfloor$.`,
				`أنشئ جدول $a^k \\ [n]$ حتى الحصول على $1$، ثم اكتب الأس بالشكل $E = p q + r$ حيث $p$ طول الدورة.`,
				`في التعداد بالأساس $\\beta$: اقسم على $\\beta$ مراراً واجمع البواقي من الأخير إلى الأول.`
			],
			solutionStepsAr: [
				`القسمة الإقليدية: $${N} = ${bDiv} \\times ${qDiv} + ${rDiv}$ مع $0 \\leq ${rDiv} < ${bDiv}$.`,
				`دورة القوى: ${tableK} ، وطول الدورة $${period}$.`,
				`$${E} = ${period} \\times ${Eq} + ${Er}$ ومنه $${A}^{${E}} \\equiv ${rPow} \\ [${n}]$.`,
				`المعادلة $${u}x \\equiv ${v} \\ [${m}]$ حلها $x \\equiv ${x0} \\ [${m}]$.`,
				`التعداد: $${M} = (${digitsK})_{${beta}} = ${expandK}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Adaptation of shared core templates → exact 3as_math curriculum lesson IDs
// ═══════════════════════════════════════════════════════════════════════════════

function adaptShared(index: number, lessonId: string): ParameterizedTemplate {
	const adapted = adaptTemplateForTrack(SHARED_TEMPLATES_3AS_T1[index], '3as_math');
	return {
		...adapted,
		curriculumLessonId: lessonId,
		generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
			const out = adapted.generate(seed, difficulty);
			// Typst sanitizer splits unknown words (`in.not` -> `in.n o t`): use the Unicode ∉ symbol instead.
			return JSON.parse(JSON.stringify(out).replace(/in\.not\b/g, '∉')) as GeneratedExerciseInstance;
		}
	};
}

const tplContinuityTvi = adaptShared(0, 'lesson_3as_math_t1_continuity_ivt_derivability');
const tplExponential = adaptShared(1, 'lesson_3as_math_t1_exponential_functions');
const tplLogDiffEq = adaptShared(2, 'lesson_3as_math_t1_logarithmic_functions_diff_eq');
const tplSequences = adaptShared(4, 'lesson_3as_math_t1_numerical_sequences_induction');
const tplBacSynthesis = adaptShared(5, 'lesson_3as_math_t1_integration');

export const TEMPLATES_3AS_MATH_T1: ParameterizedTemplate[] = [
	tplContinuityTvi,
	tplExponential,
	tplLogDiffEq,
	tplSequences,
	tplEuclideanCongruencesNumeration,
	tplBacSynthesis
];
