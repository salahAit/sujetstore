import type { ExerciseBlock } from '../../../SujetBuilder/types';
import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate } from '../../types';
import { adaptTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, gcd, SeededRng } from '../../rng';
import { SHARED_TEMPLATES_3AS_T1 } from '../../secondary_shared_3as/templates/t1';

// ═══════════════════════════════════════════════════════════════════════════════
// 3AS Technique-Mathématique — Trimester 1 (6 templates)
//   5 adapted/exclusive domain exercises (3-4 pts) + 1 BAC synthesis (7 pts)
// Dual syntax: KaTeX for quiz / hints / steps, pure Typst math for sujetExercise.
// Western digits 0-9 only. No Fermat's little theorem, no direct plane similitudes.
// ═══════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Adapted shared templates (exact 3as_tm lessonIds)
// ═══════════════════════════════════════════════════════════════════════════════

function adaptShared(index: number, curriculumLessonId: string): ParameterizedTemplate {
	const adapted = adaptTemplateForTrack(SHARED_TEMPLATES_3AS_T1[index], '3as_tm');
	return { ...adapted, curriculumLessonId };
}

export const tpl3asTmT1ContinuityTvi: ParameterizedTemplate = adaptShared(
	0,
	'lesson_3as_tm_t1_continuity_ivt_derivability'
);

export const tpl3asTmT1ExponentialStudy: ParameterizedTemplate = adaptShared(
	1,
	'lesson_3as_tm_t1_exponential_functions'
);

export const tpl3asTmT1LogarithmicDiffEq: ParameterizedTemplate = adaptShared(
	2,
	'lesson_3as_tm_t1_logarithmic_functions_diff_eq'
);

export const tpl3asTmT1SequencesInduction: ParameterizedTemplate = adaptShared(
	4,
	'lesson_3as_tm_t1_numerical_sequences_induction'
);

export const tpl3asTmT1BacSynthesis: ParameterizedTemplate = adaptShared(
	5,
	'lesson_3as_tm_t1_integration'
);

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Stream-exclusive: Euclidean division, congruences (power cycles) & numeration
// ═══════════════════════════════════════════════════════════════════════════════

function modPow(base: number, exp: number, mod: number): number {
	let result = 1 % mod;
	let b = ((base % mod) + mod) % mod;
	let e = exp;
	while (e > 0) {
		if (e % 2 === 1) result = (result * b) % mod;
		b = (b * b) % mod;
		e = Math.floor(e / 2);
	}
	return result;
}

/** Multiplicative order of `a` modulo `n` (gcd(a, n) = 1), found by direct cycle detection. */
function cycleLength(a: number, n: number): number {
	let value = a % n;
	let k = 1;
	while (value !== 1 && k <= n) {
		value = (value * a) % n;
		k++;
	}
	return k;
}

/** Digits (most significant first) of the natural number `value` written in base `base`. */
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

function distinctDistractors(correct: number, candidates: number[]): number[] {
	const out: number[] = [];
	const pool = [...candidates, correct + 1, correct - 1, correct + 2, correct - 2, correct + 3];
	for (const c of pool) {
		if (Number.isFinite(c) && c !== correct && !out.includes(c)) out.push(c);
		if (out.length === 3) break;
	}
	return out;
}

function eqKatex(a: number | string, r: number | string, n: number): string {
	return `${a} \\equiv ${r} \\pmod{${n}}`;
}

function eqTypst(a: number | string, r: number | string, n: number): string {
	return `${a} equiv ${r} quad (mod ${n})`;
}

export type EuclideanCongruenceParams =
	| {
			level: 'easy';
			a: number;
			b: number;
			q: number;
			r: number;
			c: number;
			rem2: number;
			beta: number;
			digits: number[];
	  }
	| {
			level: 'medium';
			a: number;
			n: number;
			period: number;
			residues: number[];
			K: number;
			m: number;
			s: number;
			remK: number;
			sPrime: number;
			target: number;
	  }
	| {
			level: 'hard';
			beta: number;
			x: number;
			y: number;
			z: number;
			N: number;
			modulus: number;
			q: number;
			r: number;
			x2: number;
			z2: number;
			ys: number[];
	  };

/** Deterministic parameter builder (exported so tests can replay the exact instance). */
export function euclideanCongruenceParams(
	seed: number,
	difficulty: Difficulty = 'medium'
): EuclideanCongruenceParams {
	const rng = new SeededRng(seed);

	if (difficulty === 'easy') {
		const b = rng.int(7, 19);
		const q = rng.int(12, 45);
		const r = rng.int(1, b - 1);
		const a = b * q + r;
		const c = rng.int(2, 5);
		const rem2 = (r * r + c * r) % b;
		const beta = rng.pick([2, 3, 4, 5]);
		return { level: 'easy', a, b, q, r, c, rem2, beta, digits: toBase(a, beta) };
	}

	if (difficulty === 'medium') {
		const pairs: { a: number; n: number; period: number }[] = [];
		for (let n = 7; n <= 19; n++) {
			for (let a = 2; a < n; a++) {
				if (gcd(a, n) !== 1) continue;
				const period = cycleLength(a, n);
				if (period >= 3 && period <= 6) pairs.push({ a, n, period });
			}
		}
		const { a, n, period } = rng.pick(pairs);
		const residues: number[] = [];
		for (let k = 0; k < period; k++) residues.push(modPow(a, k, n));
		let K = rng.int(1500, 2999);
		while (K % period === 0) K++;
		const m = Math.floor(K / period);
		const s = K % period;
		const sPrime = rng.int(1, period - 1);
		return {
			level: 'medium',
			a,
			n,
			period,
			residues,
			K,
			m,
			s,
			remK: residues[s],
			sPrime,
			target: residues[sPrime]
		};
	}

	const beta = rng.pick([5, 6, 7, 8, 9]);
	const modulus = beta - 1;
	let x = 1;
	let y = 0;
	let z = 0;
	do {
		x = rng.int(1, beta - 1);
		y = rng.int(0, beta - 1);
		z = rng.int(0, beta - 1);
	} while ((x + y + z) % modulus === 0);
	const N = x * beta * beta + y * beta + z;
	const q = Math.floor(N / modulus);
	const r = N % modulus;
	const x2 = rng.int(1, beta - 1);
	const z2 = rng.int(0, beta - 1);
	const ys: number[] = [];
	for (let d = 0; d <= beta - 1; d++) {
		if ((x2 + d + z2) % modulus === 0) ys.push(d);
	}
	return { level: 'hard', beta, x, y, z, N, modulus, q, r, x2, z2, ys };
}

export const tpl3asTmT1EuclideanCongruencesNumeration: ParameterizedTemplate = {
	id: 'tpl_3as_tm_t1_euclidean_congruences_numeration',
	grade: '3as_tm',
	trimesterId: 't1',
	domain: 'arithmetic_z',
	titleAr: 'القسمة الإقليدية والموافقات في Z (دورية البواقي) ونظم التعداد',
	curriculumLessonId: 'lesson_3as_tm_t1_euclidean_division_congruences_numeration',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const p = euclideanCongruenceParams(seed, difficulty);

		// ─────────────────────────── EASY ───────────────────────────
		if (p.level === 'easy') {
			const { a, b, q, r, c, rem2, beta, digits } = p;
			const steps: { n: number; q: number; d: number }[] = [];
			let cur = a;
			while (cur > 0) {
				steps.push({ n: cur, q: Math.floor(cur / beta), d: cur % beta });
				cur = Math.floor(cur / beta);
			}
			const baseLines = steps
				.map((s) => `$${s.n} = ${beta} times ${s.q} + ${s.d}$`)
				.join('\n');
			const digitsStr = digits.join('');

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `نعتبر العددين الطبيعيين $a = ${a}$ و $b = ${b}$.`,
				content: [
					{
						type: 'text',
						content: `1) أنجز القسمة الإقليدية للعدد $a$ على $b$، ثم اكتب موافقة $a$ بالنسبة إلى $b$.`,
						answer: `1) لدينا $${b} times ${q} = ${b * q}$ و $${a} - ${b * q} = ${r}$ حيث $0 <= ${r} < ${b}$، إذن:\n$${a} = ${b} times ${q} + ${r}$ ، أي خارج القسمة $q = ${q}$ والباقي $r = ${r}$.\nومنه: $${eqTypst(a, r, b)}$.`,
						mark: '1.25'
					},
					{
						type: 'text',
						content: `2) استنتج باقي القسمة الإقليدية للعدد $a^2 + ${c} a$ على $b$.`,
						answer: `2) بما أن $${eqTypst('a', r, b)}$ فإن $a^2 equiv ${r}^2 quad (mod ${b})$ و $${c} a equiv ${c * r} quad (mod ${b})$.\nإذن $a^2 + ${c} a equiv ${r * r + c * r} quad (mod ${b})$.\nوبما أن $${r * r + c * r} = ${b} times ${Math.floor((r * r + c * r) / b)} + ${rem2}$ مع $0 <= ${rem2} < ${b}$ فإن الباقي هو $${rem2}$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) اكتب العدد $a$ في نظام التعداد ذي الأساس $${beta}$.`,
						answer: `3) نقسم $a$ على $${beta}$ قسمات إقليدية متتالية إلى أن نحصل على خارج معدوم:\n${baseLines}\nنقرأ البواقي من الأخير إلى الأول: $a = overline(${digitsStr})^((${beta}))$.`,
						mark: '1.25'
					}
				]
			};

			const wrongA = distinctDistractors(r, [
				q % b,
				b - r,
				(r + 1) % b,
				Math.floor(a / 10)
			]).filter((v) => v !== r);
			const mcq = buildUniqueMcqOptions(
				`$${r}$`,
				wrongA.map((v, i) => ({
					text: `$${v}$`,
					diagnosticFeedback:
						i === 0
							? 'انتبه: خلطت بين الخارج $q$ والباقي $r$ في القسمة الإقليدية.'
							: 'تحقق من العلاقة $a = bq + r$ مع الشرط $0 \\le r < b$.'
				})),
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '3as_tm',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `ما هو باقي القسمة الإقليدية للعدد $${a}$ على $${b}$؟`,
					questionTextAr: `القسمة الإقليدية: $${a} = ${b}q + r$ مع $0 \\le r < ${b}$. ما قيمة $r$؟`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `$${b} \\times ${q} = ${b * q}$ و $${a} - ${b * q} = ${r}$ إذن $${a} = ${b} \\times ${q} + ${r}$ والباقي $r = ${r}$.`
				},
				sujetExercise,
				hints: [
					`القسمة الإقليدية للعدد $a$ على $b$: يوجد عددان وحيدان $(q, r)$ يحققان $a = bq + r$ و $0 \\le r < b$.`,
					`إذا كان $a \\equiv r \\pmod{b}$ فإن $a^k \\equiv r^k \\pmod{b}$ ويمكن جمع الموافقات وضربها.`,
					`للتحويل إلى الأساس $${beta}$ نكرر القسمة على $${beta}$ ونقرأ البواقي من الأخير إلى الأول.`
				],
				solutionStepsAr: [
					`$${a} = ${b} \\times ${q} + ${r}$ ، أي $${eqKatex(a, r, b)}$.`,
					`$a^2 + ${c}a \\equiv ${r * r + c * r} \\equiv ${rem2} \\pmod{${b}}$.`,
					`$${a} = \\overline{${digitsStr}}^{(${beta})}$.`
				],
				finalAnswer: `q = ${q}, r = ${r}, a^2 + ${c}a ≡ ${rem2} [${b}], a = (${digitsStr})_${beta}`
			};
		}

		// ─────────────────────────── MEDIUM ───────────────────────────
		if (p.level === 'medium') {
			const { a, n, period, residues, K, m, s, remK, sPrime, target } = p;
			const residueTypst = residues
				.map((rv, k) => `$${a}^${k} equiv ${rv} quad (mod ${n})$`)
				.join('، ');
			const cycleTypst = residues.join(', ');

			const allRes: number[] = [];
			for (let v = 0; v < n; v++) allRes.push(v);
			const candidates = [
				...residues.filter((v) => v !== remK),
				K % n,
				...allRes.filter((v) => v !== remK)
			];
			const wrong = distinctDistractors(remK, candidates);
			const mcq = buildUniqueMcqOptions(
				`$${remK}$`,
				wrong.map((v, i) => ({
					text: `$${v}$`,
					diagnosticFeedback:
						i === 0
							? `هذا باقي قوة أخرى في الدورة: الأس المناسب هو باقي قسمة $${K}$ على $${period}$ أي $${s}$.`
							: `اعتمد دورية البواقي $${period}$: $${a}^{${period}} \\equiv 1 \\pmod{${n}}$ ثم $${K} = ${period} \\times ${m} + ${s}$.`
				})),
				rng
			);

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `ليكن $n = ${n}$ و $a = ${a}$ حيث $a$ و $n$ أوليان فيما بينهما. ندرس بواقي قسمة قوى $a$ على $n$.`,
				content: [
					{
						type: 'text',
						content: `1) أنشئ جدول بواقي قسمة $${a}^k$ على $${n}$ من أجل $k$ من $0$ إلى $${period}$. استنتج أن $${a}^${period} equiv 1 quad (mod ${n})$ وأن بواقي القوى تتكرر بدورية يطلب تعيينها.`,
						answer: `1) نحسب تباعاً:\n${residueTypst}، ثم $${a}^${period} equiv ${(residues[period - 1] * a) % n} quad (mod ${n})$.\nالبواقي المتتالية للأسس $0, 1, ..., ${period - 1}$ هي ${cycleTypst}، ومن $${a}^${period} equiv 1$ نحصل على $${a}^(k + ${period}) equiv ${a}^k quad (mod ${n})$ من أجل كل عدد طبيعي $k$: الدورية هي $${period}$.`,
						mark: '1.25'
					},
					{
						type: 'text',
						content: `2) عيّن باقي القسمة الإقليدية للعدد $${a}^(${K})$ على $${n}$.`,
						answer: `2) نكتب $${K} = ${period} times ${m} + ${s}$ (قسمة إقليدية للأس على $${period}$).\nإذن $${a}^(${K}) = (${a}^${period})^(${m}) times ${a}^${s} equiv 1^(${m}) times ${a}^${s} equiv ${remK} quad (mod ${n})$.\nومنه باقي القسمة هو $${remK}$ لأن $0 <= ${remK} < ${n}$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) عيّن مجموعة الأعداد الطبيعية $k$ التي تحقق $${a}^k equiv ${target} quad (mod ${n})$.`,
						answer: `3) من الجدول، البواقي $${cycleTypst}$ المقابلة للأسس $0, ..., ${period - 1}$ مختلفة مثنى مثنى، والباقي $${target}$ يوافق الأس $${sPrime}$ فقط.\nباستعمال الدورية $${period}$: $${a}^k equiv ${target} quad (mod ${n}) <==> k equiv ${sPrime} quad (mod ${period})$.\nأي $k = ${period} q + ${sPrime}$ مع $q in bb(N)$.`,
						mark: '1.25'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_tm',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `بما أن $${a}^{${period}} \\equiv 1 \\pmod{${n}}$، ما هو باقي القسمة الإقليدية للعدد $${a}^{${K}}$ على $${n}$؟`,
					questionTextAr: `احسب باقي قسمة $${a}^{${K}}$ على $${n}$ باستعمال دورية البواقي.`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `$${K} = ${period} \\times ${m} + ${s}$ ومنه $${a}^{${K}} = (${a}^{${period}})^{${m}} \\times ${a}^{${s}} \\equiv ${a}^{${s}} \\equiv ${remK} \\pmod{${n}}$.`
				},
				sujetExercise,
				hints: [
					`احسب $${a}^1, ${a}^2, \\ldots$ بالتتالي بالنسبة إلى $${n}$ إلى أن تحصل على الباقي $1$ لأول مرة.`,
					`إذا كان $a^{${period}} \\equiv 1 \\pmod{${n}}$ فإن $a^{${period} q + s} \\equiv a^{s} \\pmod{${n}}$.`,
					`اكتب الأس $${K}$ على الشكل $${period}q + s$ حيث $0 \\le s < ${period}$ (قسمة إقليدية).`
				],
				solutionStepsAr: [
					`البواقي المتتالية: $${cycleTypstKatex(residues)}$ ثم يتكرر الباقي $1$ عند الأس $${period}$.`,
					`$${K} = ${period} \\times ${m} + ${s}$ ومنه $${a}^{${K}} \\equiv ${a}^{${s}} \\equiv ${remK} \\pmod{${n}}$.`,
					`$${a}^k \\equiv ${target} \\pmod{${n}} \\iff k \\equiv ${sPrime} \\pmod{${period}}$.`
				],
				finalAnswer: `${a}^${K} ≡ ${remK} [${n}] ; period = ${period}`
			};
		}

		// ─────────────────────────── HARD ───────────────────────────
		const { beta, x, y, z, N, modulus, q, r, x2, z2, ys } = p;
		const negQ = r > 0 ? -q - 1 : -q;
		const negR = r > 0 ? modulus - r : 0;
		const ysSet = ys.join(', ');
		const y0 = ys[0];
		const nPrimeValues = ys.map((d) => x2 * beta * beta + d * beta + z2);

		const valueReversed = z * beta * beta + y * beta + x;
		const wrong = distinctDistractors(N, [
			valueReversed,
			x + y + z,
			x * 100 + y * 10 + z,
			N + beta,
			N - beta
		]);
		const mcq = buildUniqueMcqOptions(
			`$${N}$`,
			wrong.map((v, i) => ({
				text: `$${v}$`,
				diagnosticFeedback:
					i === 0
						? 'احذر: قرأت الأرقام بترتيب معاكس؛ الرقم الأول (الأيسر) هو رقم المرتبة $\\beta^2$.'
						: `القيمة المطلوبة هي $x \\beta^2 + y \\beta + z$ بالأساس $\\beta = ${beta}$ وليس مجموع الأرقام أو قراءتها بالأساس عشرة.`
			})),
			rng
		);

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `ليكن العدد الطبيعي $N = overline(${x} ${y} ${z})^((${beta}))$ المكتوب في نظام التعداد ذي الأساس $${beta}$.`,
			content: [
				{
					type: 'text',
					content: `1) اكتب $N$ في النظام العشري، ثم أنجز القسمة الإقليدية لكل من $N$ و $-N$ على $${modulus}$.`,
					answer: `1) $N = ${x} times ${beta}^2 + ${y} times ${beta} + ${z} = ${x * beta * beta} + ${y * beta} + ${z} = ${N}$.\nالقسمة الإقليدية: $${N} = ${modulus} times ${q} + ${r}$ مع $0 <= ${r} < ${modulus}$.\nأما $-N$: $${-N} = ${modulus} times (${negQ}) + ${negR}$ مع $0 <= ${negR} < ${modulus}$ (الباقي يجب أن يبقى موجباً).`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `2) بيّن أن $${beta} equiv 1 quad (mod ${modulus})$ ثم أثبت أن $overline(a b c)^((${beta})) equiv a + b + c quad (mod ${modulus})$. استنتج باقي قسمة $N$ على $${modulus}$.`,
					answer: `2) $${beta} - 1 = ${modulus}$ إذن $${beta} equiv 1 quad (mod ${modulus})$ و $${beta}^2 equiv 1 quad (mod ${modulus})$.\nومنه $overline(a b c)^((${beta})) = a ${beta}^2 + b ${beta} + c equiv a + b + c quad (mod ${modulus})$.\nفي حالتنا $N equiv ${x} + ${y} + ${z} = ${x + y + z} equiv ${r} quad (mod ${modulus})$ وهو ما يتوافق مع القسمة المنجزة.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) عيّن الأرقام $y in {0, 1, ..., ${beta - 1}}$ التي تجعل العدد $overline(${x2} y ${z2})^((${beta}))$ قابلاً للقسمة على $${modulus}$.`,
					answer: `3) $overline(${x2} y ${z2})^((${beta})) equiv ${x2} + y + ${z2} quad (mod ${modulus})$، فالقابلية للقسمة على $${modulus}$ تكافئ $y + ${x2 + z2} equiv 0 quad (mod ${modulus})$ أي $y equiv ${y0} quad (mod ${modulus})$.\nمع $0 <= y <= ${beta - 1}$ نجد $y in {${ysSet}}$، أي العدد(ان): ${nPrimeValues.map((v) => `$${v}$`).join('، ')} في النظام العشري.`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_tm',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `ما هي القيمة في النظام العشري للعدد $N = \\overline{${x}${y}${z}}^{(${beta})}$ المكتوب في الأساس $${beta}$؟`,
				questionTextAr: `حوّل $\\overline{${x}${y}${z}}^{(${beta})}$ من الأساس $${beta}$ إلى الأساس عشرة.`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `$N = ${x} \\times ${beta}^2 + ${y} \\times ${beta} + ${z} = ${N}$.`
			},
			sujetExercise,
			hints: [
				`$\\overline{abc}^{(\\beta)} = a\\beta^2 + b\\beta + c$.`,
				`بما أن $\\beta \\equiv 1 \\pmod{${modulus}}$ فإن $\\beta^k \\equiv 1 \\pmod{${modulus}}$ من أجل كل $k \\in \\mathbb{N}$.`,
				`لقسمة $-N$ إقليدياً: إذا كان $N = dq + r$ مع $0 < r < d$ فإن $-N = d(-q-1) + (d - r)$.`
			],
			solutionStepsAr: [
				`$N = ${x} \\times ${beta}^2 + ${y} \\times ${beta} + ${z} = ${N}$ و $${N} = ${modulus} \\times ${q} + ${r}$.`,
				`$\\overline{abc}^{(${beta})} \\equiv a + b + c \\pmod{${modulus}}$ لأن $${beta} \\equiv 1 \\pmod{${modulus}}$.`,
				`$y \\in \\{${ysSet}\\}$ حتى يكون $${x2} + y + ${z2} \\equiv 0 \\pmod{${modulus}}$.`
			],
			finalAnswer: `N = ${N}; N ≡ ${r} [${modulus}]; y ∈ {${ysSet}}`
		};
	}
};

function cycleTypstKatex(residues: number[]): string {
	return residues.join(',\\ ');
}

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 1 Parameterized Templates for 3AS Technique-Mathématique
// ═══════════════════════════════════════════════════════════════════════════════

export const TEMPLATES_3AS_TM_T1: ParameterizedTemplate[] = [
	tpl3asTmT1ContinuityTvi,
	tpl3asTmT1ExponentialStudy,
	tpl3asTmT1LogarithmicDiffEq,
	tpl3asTmT1SequencesInduction,
	tpl3asTmT1EuclideanCongruencesNumeration,
	tpl3asTmT1BacSynthesis
];
