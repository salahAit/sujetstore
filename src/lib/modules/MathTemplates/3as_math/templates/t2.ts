import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';
import { adaptTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, gcd, simplifyFraction, SeededRng } from '../../rng';
import { saveSvgAsset } from '../../svg-helpers';
import { svgComplexPlane } from '../../svg-secondary';
import { SHARED_TEMPLATES_3AS_T2 } from '../../secondary_shared_3as/templates/t2';

// ═══════════════════════════════════════════════════════════════════════════════
// 3AS Mathematics stream (Coeff 7) — Trimester 2
// Shared core (adapted) + stream-exclusive:
//   (a) Primes, Bézout, Gauss, Fermat's little theorem, Diophantine ax + by = c
//   (b) Direct plane similitudes z' = az + b (center, ratio, angle, area scaling k^2)
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

/** Extended Euclid: returns [g, u, v] with a*u + b*v = g = gcd(a, b) (a, b > 0). */
function extGcd(a: number, b: number): [number, number, number] {
	let [r0, r1] = [a, b];
	let [s0, s1] = [1, 0];
	let [t0, t1] = [0, 1];
	while (r1 !== 0) {
		const q = Math.floor(r0 / r1);
		[r0, r1] = [r1, r0 - q * r1];
		[s0, s1] = [s1, s0 - q * s1];
		[t0, t1] = [t1, t0 - q * t1];
	}
	return [r0, s0, t0];
}

function euclidChain(a: number, b: number): { a: number; b: number; q: number; r: number }[] {
	const rows: { a: number; b: number; q: number; r: number }[] = [];
	let x = a;
	let y = b;
	while (y !== 0) {
		const q = Math.floor(x / y);
		const r = x - q * y;
		rows.push({ a: x, b: y, q, r });
		[x, y] = [y, r];
	}
	return rows;
}

function signedKatex(v: number): string {
	return v < 0 ? `(${v})` : `${v}`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// A. Primes, Bézout, Gauss, Fermat & Diophantine equations
// ═══════════════════════════════════════════════════════════════════════════════

const tplBezoutGaussFermatDiophantine: ParameterizedTemplate = {
	id: 'tpl_3as_math_t2_bezout_gauss_fermat_diophantine',
	grade: '3as_math',
	trimesterId: 't2',
	domain: 'arithmetic_z',
	titleAr: 'الأعداد الأولية، مبرهنتا بيزو وغوص، مبرهنة فيرما الصغرى والمعادلات الديوفانتية',
	curriculumLessonId: 'lesson_3as_math_t2_primes_bezout_gauss_fermat_diophantine',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// 1) Fermat: A^N mod p
		const pPool = difficulty === 'easy' ? [5, 7, 11] : difficulty === 'medium' ? [7, 11, 13] : [13, 17, 19, 23];
		const p = rng.pick(pPool);
		let A = rng.int(2, 40);
		while (A % p === 0) A += 1;
		const Nexp = rng.int(120, 2050);
		const qF = Math.floor(Nexp / (p - 1));
		const rF = Nexp % (p - 1);
		const fermatRem = modPow(A, Nexp, p);
		if (modPow(A, p - 1, p) !== 1) throw new Error('Fermat identity failed');
		if (fermatRem !== modPow(A, rF, p)) throw new Error('Fermat reduction failed');

		// 2) Bézout + 3) Diophantine a x + b y = c with gcd d | c
		const d = difficulty === 'easy' ? 1 : rng.pick([1, 2, 3]);
		let a1 = 0;
		let b1 = 0;
		for (let tries = 0; tries < 500; tries++) {
			a1 = difficulty === 'easy' ? rng.int(3, 13) : rng.int(5, 29);
			b1 = difficulty === 'easy' ? rng.int(3, 13) : rng.int(5, 29);
			if (a1 !== b1 && gcd(a1, b1) === 1) break;
		}
		if (gcd(a1, b1) !== 1) {
			a1 = 7;
			b1 = 11;
		}
		const a = d * a1;
		const b = d * b1;
		const [g1, u, v] = extGcd(a1, b1);
		if (g1 !== 1 || a1 * u + b1 * v !== 1) throw new Error('Bezout identity failed');
		const chain = euclidChain(a1, b1);

		const prodAB = a1 * b1;
		let c1 = rng.int(prodAB, 2 * prodAB + 15);
		const countPositive = (cc: number): number => {
			let cnt = 0;
			for (let x = 1; a1 * x < cc; x++) {
				if ((cc - a1 * x) % b1 === 0 && (cc - a1 * x) / b1 >= 1) cnt++;
			}
			return cnt;
		};
		while (countPositive(c1) < 2) c1 += prodAB;
		const c = d * c1;

		// particular solution (x0, y0) from Bézout, then normalised smallest non-negative x
		let x0 = u * c1;
		let y0 = v * c1;
		if (a * x0 + b * y0 !== c) throw new Error('Diophantine particular solution failed');
		const xMin = ((x0 % b1) + b1) % b1;
		const yMin = (c - a * xMin) / b;
		if (!Number.isInteger(yMin) || a * xMin + b * yMin !== c) throw new Error('Diophantine normalised solution failed');
		x0 = xMin;
		y0 = yMin;
		// general solution check for several k
		for (let k = -3; k <= 3; k++) {
			if (a * (x0 + b1 * k) + b * (y0 - a1 * k) !== c) throw new Error('Diophantine general solution failed');
		}
		const posCount = countPositive(c1);
		// closed form count via parametrisation: x0 + b1 k > 0, y0 - a1 k > 0
		let kLo = Math.floor(-x0 / b1) + 1;
		while (x0 + b1 * kLo <= 0) kLo++;
		let kHi = Math.ceil(y0 / a1) - 1;
		while (y0 - a1 * kHi <= 0) kHi--;
		const posCountParam = Math.max(0, kHi - kLo + 1);
		if (posCountParam !== posCount) throw new Error(`Positive solutions mismatch ${posCountParam} vs ${posCount}`);
		const posSolutions: string[] = [];
		for (let k = kLo; k <= kHi; k++) posSolutions.push(`(${x0 + b1 * k}, ${y0 - a1 * k})`);

		const eqK = `${a}x + ${b}y = ${c}`;
		const eqT = `${a} x + ${b} y = ${c}`;
		const chainT = chain.map((r) => `${r.a} = ${r.b} dot ${r.q} + ${r.r}`).join('، ');
		const chainK = chain.map((r) => `${r.a} = ${r.b} \\times ${r.q} + ${r.r}`).join('، ');
		const uvEq = `${a1} dot (${u}) + ${b1} dot (${v}) = 1`;

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${fermatRem}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `بما أن $${p}$ عدد أولي لا يقسم $${A}$، فإن $${A}^{${p - 1}} \\equiv 1 \\ [${p}]$ (مبرهنة فيرما الصغرى). أوجد باقي القسمة الإقليدية للعدد $${A}^{${Nexp}}$ على $${p}$:`,
				questionTextAr: `أوجد باقي قسمة $${A}^{${Nexp}}$ على العدد الأولي $${p}$:`,
				questionData: { answer: fermatRem, displayTemplate: 'r = ?', variables: [], tolerance: 0 },
				explanation: `$${Nexp} = ${p - 1} \\times ${qF} + ${rF}$ ، إذن $${A}^{${Nexp}} = (${A}^{${p - 1}})^{${qF}} \\times ${A}^{${rF}} \\equiv ${A}^{${rF}} \\equiv ${fermatRem} \\ [${p}]$.`
			};
		} else if (difficulty === 'medium') {
			const correctOpt = `$(x, y) = (${x0}, ${y0})$`;
			const candidates = [
				{ x: -x0, y: y0, why: 'تحقّق من إشارة $x$ عند التعويض في المعادلة.' },
				{ x: x0, y: -y0, why: 'تحقّق من إشارة $y$ عند التعويض في المعادلة.' },
				{ x: y0, y: x0, why: 'لا تبدّل مكان $x$ و $y$: المعاملان $a$ و $b$ مختلفان.' },
				{ x: x0 + 1, y: y0, why: 'ضع الثنائية في المعادلة واحسب $ax + by$ فلن تجد $c$.' },
				{ x: x0, y: y0 + 1, why: 'ضع الثنائية في المعادلة واحسب $ax + by$ فلن تجد $c$.' },
				{ x: x0 + b1, y: y0 + a1, why: 'الحلول العامة هي $(x_0 + b_1 k, y_0 - a_1 k)$ بإشارتين متعاكستين.' }
			].filter((cand) => a * cand.x + b * cand.y !== c);
			const mcq = buildUniqueMcqOptions(
				correctOpt,
				candidates.map((cand) => ({ text: `$(x, y) = (${cand.x}, ${cand.y})$`, diagnosticFeedback: cand.why })),
				rng
			);
			finalAnswer = `(${x0}, ${y0})`;
			quizQuestion = {
				type: 'mcq',
				questionText: `أي الثنائيات التالية $(x, y)$ من $\\mathbb{Z}^2$ حل للمعادلة $${eqK}$؟`,
				questionTextAr: `عيّن حلاً صحيحاً للمعادلة $${eqK}$ في $\\mathbb{Z}^2$:`,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `نتحقق: $${a} \\times ${signedKatex(x0)} + ${b} \\times ${signedKatex(y0)} = ${a * x0} + ${b * y0} = ${c}$ ، فالثنائية $(${x0}, ${y0})$ حل.`
			};
		} else {
			finalAnswer = `${posCount}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر في $\\mathbb{Z}^2$ المعادلة $${eqK}$. ما هو عدد الثنائيات $(x, y)$ حلول المعادلة والتي تحقق $x \\geq 1$ و $y \\geq 1$؟`,
				questionTextAr: `احسب عدد الحلول $(x, y)$ في الأعداد الصحيحة الطبيعية غير المنعدمة للمعادلة $${eqK}$:`,
				questionData: { answer: posCount, displayTemplate: 'N = ?', variables: [], tolerance: 0 },
				explanation: `حلول المعادلة: $(x, y) = (${x0} + ${b1}k, \\ ${y0} - ${a1}k)$ مع $k \\in \\mathbb{Z}$. الشرطان $x \\geq 1$ و $y \\geq 1$ يعطيان $${kLo} \\leq k \\leq ${kHi}$ ، أي ${posCount} حلاً: ${posSolutions.join('، ')}.`
			};
		}

		const divisorNoteT = d > 1 ? `بما أن $gcd(${a}, ${b}) = ${d}$ يقسم $${c}$ فللمعادلة حلول. نقسم على $${d}$: $${a1} x + ${b1} y = ${c1}$.` : `بما أن $gcd(${a}, ${b}) = 1$ يقسم $${c}$ فللمعادلة حلول.`;

		return {
			templateId: this.id,
			seed,
			grade: '3as_math',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نعتبر في المجموعة $bb(Z)$ الأعداد الصحيحة $a = ${a}$ و $b = ${b}$ و $c = ${c}$ والمعادلة $(E): ${eqT}$ ذات المجهولين $x$ و $y$. العدد $${p}$ أولي.`,
				content: [
					{
						type: 'text',
						content: `1) مبرهنة فيرما الصغرى: برّر أن $${A}^${p - 1} equiv 1 [${p}]$ ثم عيّن باقي قسمة $${A}^${Nexp}$ على $${p}$.`,
						answer: `1) العدد $${p}$ أولي ولا يقسم $${A}$ ، فحسب مبرهنة فيرما الصغرى $${A}^${p - 1} equiv 1 [${p}]$.\nلدينا $${Nexp} = ${p - 1} dot ${qF} + ${rF}$ ، إذن $${A}^${Nexp} = (${A}^${p - 1})^${qF} dot ${A}^${rF} equiv ${A}^${rF} equiv ${fermatRem} [${p}]$.\nفالباقي هو $${fermatRem}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) بيّن أن العددين $${a1}$ و $${b1}$ أوليان فيما بينهما، ثم عيّن (باستعمال خوارزمية إقليدس) عددين صحيحين $u$ و $v$ يحققان $${a1} u + ${b1} v = 1$ (مبرهنة بيزو).`,
						answer: `2) خوارزمية إقليدس: ${chainT}.\nآخر باقٍ غير معدوم هو $1$ ، إذن $gcd(${a1}, ${b1}) = 1$ والعددان أوليان فيما بينهما.\nبالصعود في المتساويات نجد $u = ${u}$ و $v = ${v}$ ، والتحقق: $${uvEq}$ ، أي $${a1 * u} + ${b1 * v} = 1$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) حل في $bb(Z)^2$ المعادلة $(E)$ مستعملاً مبرهنة غوص: ابدأ بحل خاص $(x_0, y_0)$ ثم استنتج جميع الحلول.`,
						answer: `3) ${divisorNoteT}\nمن السؤال 2: $(${u * c1}, ${v * c1})$ حل للمعادلة $${a1} x + ${b1} y = ${c1}$ ، وحل خاص مختزل لـ $(E)$ هو $(x_0, y_0) = (${x0}, ${y0})$ لأن $${a} dot ${x0} + ${b} dot ${y0} = ${a * x0} + ${b * y0} = ${c}$.\nليكن $(x, y)$ حلاً: بالطرح $${a1} (x - ${x0}) = ${b1} (${y0} - y)$.\nإذن $${b1}$ يقسم $${a1} (x - ${x0})$ و $gcd(${a1}, ${b1}) = 1$ ، فحسب مبرهنة غوص $${b1}$ يقسم $x - ${x0}$ ، أي $x = ${x0} + ${b1} k$ ومنه $y = ${y0} - ${a1} k$ مع $k in bb(Z)$.\nوالعكس صحيح بالتعويض المباشر.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `4) عيّن الثنائيات $(x, y)$ حلول $(E)$ التي تحقق $x >= 1$ و $y >= 1$.`,
						answer: `4) الشرطان $${x0} + ${b1} k >= 1$ و $${y0} - ${a1} k >= 1$ يعطيان $${kLo} <= k <= ${kHi}$.\nعدد الحلول $${posCount}$ وهي: ${posSolutions.map((s) => `$${s}$`).join('، ')}.`,
						mark: '1'
					}
				]
			},
			hints: [
				`مبرهنة فيرما: إذا كان $p$ أولياً و $p \\nmid a$ فإن $a^{p-1} \\equiv 1 \\ [p]$ ؛ اكتب الأس على الشكل $(p-1)q + r$.`,
				`مبرهنة بيزو: $\\gcd(a, b) = 1 \\iff \\exists (u, v) \\in \\mathbb{Z}^2 : au + bv = 1$ ؛ استعمل خوارزمية إقليدس ثم الصعود.`,
				`مبرهنة غوص: إذا كان $a \\mid bc$ و $\\gcd(a, b) = 1$ فإن $a \\mid c$. استعملها على $a'(x - x_0) = b'(y_0 - y)$.`
			],
			solutionStepsAr: [
				`فيرما: $${A}^{${p - 1}} \\equiv 1 \\ [${p}]$ و $${Nexp} = ${p - 1} \\times ${qF} + ${rF}$ ومنه $${A}^{${Nexp}} \\equiv ${fermatRem} \\ [${p}]$.`,
				`إقليدس: ${chainK} ، فـ $\\gcd(${a1}, ${b1}) = 1$ و $${a1} \\times (${u}) + ${b1} \\times (${v}) = 1$.`,
				`حل خاص: $(x_0, y_0) = (${x0}, ${y0})$ لأن $${a} \\times ${signedKatex(x0)} + ${b} \\times ${signedKatex(y0)} = ${c}$.`,
				`غوص: $b' \\mid a'(x - x_0)$ و $\\gcd(a', b') = 1$ ، فالحلول $(x, y) = (${x0} + ${b1}k, \\ ${y0} - ${a1}k)$ ، $k \\in \\mathbb{Z}$.`,
				`عدد الحلول الموجبة تماماً: ${posCount}.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// B. Direct plane similitudes z' = a z + b
// ═══════════════════════════════════════════════════════════════════════════════

type Cx = [number, number];

function cMul(p: Cx, q: Cx): Cx {
	return [p[0] * q[0] - p[1] * q[1], p[0] * q[1] + p[1] * q[0]];
}
function cAdd(p: Cx, q: Cx): Cx {
	return [p[0] + q[0], p[1] + q[1]];
}
function cSub(p: Cx, q: Cx): Cx {
	return [p[0] - q[0], p[1] - q[1]];
}
function cNorm2(p: Cx): number {
	return p[0] * p[0] + p[1] * p[1];
}
/** Exact complex division when the quotient has integer coordinates; throws otherwise. */
function cDivExact(p: Cx, q: Cx): Cx {
	const den = cNorm2(q);
	const re = p[0] * q[0] + p[1] * q[1];
	const im = p[1] * q[0] - p[0] * q[1];
	if (re % den !== 0 || im % den !== 0) throw new Error('Non-integer complex quotient');
	return [re / den, im / den];
}

function cxKatex(z: Cx): string {
	const [re, im] = z;
	const imAbs = Math.abs(im);
	const imTxt = imAbs === 1 ? 'i' : `${imAbs}i`;
	if (im === 0) return `${re}`;
	if (re === 0) return im < 0 ? `-${imTxt}` : imTxt;
	return `${re} ${im < 0 ? '-' : '+'} ${imTxt}`;
}
function cxTypst(z: Cx): string {
	const [re, im] = z;
	const imAbs = Math.abs(im);
	const imTxt = imAbs === 1 ? 'i' : `${imAbs} i`;
	if (im === 0) return `${re}`;
	if (re === 0) return im < 0 ? `-${imTxt}` : imTxt;
	return `${re} ${im < 0 ? '-' : '+'} ${imTxt}`;
}

/** sqrt(m) written as s*sqrt(r) (r squarefree) or an integer. Returns [coef, radicand]. */
function simplifyRadical(m: number): [number, number] {
	let coef = 1;
	let rad = m;
	for (let f = 2; f * f <= rad; f++) {
		while (rad % (f * f) === 0) {
			rad /= f * f;
			coef *= f;
		}
	}
	return [coef, rad];
}
function sqrtKatex(m: number): string {
	const [coef, rad] = simplifyRadical(m);
	if (rad === 1) return `${coef}`;
	return `${coef === 1 ? '' : coef}\\sqrt{${rad}}`;
}
function sqrtTypst(m: number): string {
	const [coef, rad] = simplifyRadical(m);
	if (rad === 1) return `${coef}`;
	return `${coef === 1 ? '' : `${coef} `}sqrt(${rad})`;
}

function normAngleUnits(m: number): number {
	return ((((m + 3) % 8) + 8) % 8) - 3;
}
/** m * pi / 4 */
function angleKatex(m: number): string {
	if (m === 0) return '0';
	const [n, dd] = simplifyFraction(Math.abs(m), 4);
	const sign = m < 0 ? '-' : '';
	const pi = n === 1 ? '\\pi' : `${n}\\pi`;
	return dd === 1 ? `${sign}${pi}` : `${sign}\\frac{${pi}}{${dd}}`;
}
function angleTypst(m: number): string {
	if (m === 0) return '0';
	const [n, dd] = simplifyFraction(Math.abs(m), 4);
	const sign = m < 0 ? '-' : '';
	const pi = n === 1 ? 'pi' : `${n} pi`;
	return dd === 1 ? `${sign}${pi}` : `${sign}frac(${pi}, ${dd})`;
}

const SIMILITUDE_COEFFS: { a: Cx; hard: boolean }[] = [
	{ a: [0, 1], hard: false },
	{ a: [0, -1], hard: false },
	{ a: [2, 0], hard: false },
	{ a: [-2, 0], hard: false },
	{ a: [0, 2], hard: false },
	{ a: [1, 1], hard: false },
	{ a: [1, -1], hard: false },
	{ a: [-1, 1], hard: true },
	{ a: [-1, -1], hard: true },
	{ a: [2, 2], hard: true },
	{ a: [-2, 2], hard: true },
	{ a: [0, 3], hard: true }
];

const tplDirectPlaneSimilitudes: ParameterizedTemplate = {
	id: 'tpl_3as_math_t2_direct_plane_similitudes',
	grade: '3as_math',
	trimesterId: 't2',
	domain: 'geometry',
	titleAr: 'التشابهات المستوية المباشرة z\' = az + b: المركز والنسبة والزاوية وتأثيرها على المساحات',
	curriculumLessonId: 'lesson_3as_math_t2_direct_plane_similitudes_composition',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const pool = SIMILITUDE_COEFFS.filter((e) => (difficulty === 'hard' ? true : !e.hard));
		const a = rng.pick(pool).a;
		const kSq = cNorm2(a);
		const mAngle = Math.round(Math.atan2(a[1], a[0]) / (Math.PI / 4));
		const range0 = difficulty === 'easy' ? 2 : 3;
		let omega: Cx = [0, 0];
		for (let tries = 0; tries < 100; tries++) {
			omega = [rng.int(-range0, range0), rng.int(-range0, range0)];
			if (omega[0] !== 0 || omega[1] !== 0) break;
		}
		if (omega[0] === 0 && omega[1] === 0) omega = [1, -1];
		// b = omega (1 - a)
		const b = cMul(omega, cSub([1, 0], a));
		const f = (z: Cx): Cx => cAdd(cMul(a, z), b);

		// Fixed point check: omega = b / (1 - a), f(omega) = omega
		const omegaComputed = cDivExact(b, cSub([1, 0], a));
		if (omegaComputed[0] !== omega[0] || omegaComputed[1] !== omega[1]) throw new Error('Center formula mismatch');
		const fo = f(omega);
		if (fo[0] !== omega[0] || fo[1] !== omega[1]) throw new Error('Center is not invariant');

		// Points A, B (non-collinear with O) and images
		let zA: Cx = [1, 2];
		let zB: Cx = [-2, 1];
		for (let tries = 0; tries < 200; tries++) {
			zA = [rng.int(-3, 3), rng.int(-3, 3)];
			zB = [rng.int(-3, 3), rng.int(-3, 3)];
			const det = zA[0] * zB[1] - zA[1] * zB[0];
			if (det !== 0) break;
		}
		const detAB = Math.abs(zA[0] * zB[1] - zA[1] * zB[0]);
		if (detAB === 0) {
			zA = [1, 2];
			zB = [-2, 1];
		}
		const D = Math.abs(zA[0] * zB[1] - zA[1] * zB[0]);
		const zA2 = f(zA);
		const zB2 = f(zB);
		const zO2 = f([0, 0]);
		const AB2 = cNorm2(cSub(zB, zA));
		const A2B22 = cNorm2(cSub(zB2, zA2));
		if (A2B22 !== kSq * AB2) throw new Error('Distance scaling failed');
		const D2 = Math.abs((zA2[0] - zO2[0]) * (zB2[1] - zO2[1]) - (zA2[1] - zO2[1]) * (zB2[0] - zO2[0]));
		if (D2 !== kSq * D) throw new Error('Area scaling failed');
		const S = D / 2;
		const S2 = (kSq * D) / 2;
		const [sN, sD] = simplifyFraction(D, 2);
		const [s2N, s2D] = simplifyFraction(kSq * D, 2);
		const fracT = (n: number, dd: number) => (dd === 1 ? `${n}` : `frac(${n}, ${dd})`);
		const fracK = (n: number, dd: number) => (dd === 1 ? `${n}` : `\\frac{${n}}{${dd}}`);

		// Illustration
		const maxCoord = Math.max(
			...[omega, zA, zB, zA2, zB2].flatMap((z) => [Math.abs(z[0]), Math.abs(z[1])])
		);
		const range = Math.max(4, Math.ceil(maxCoord) + 1);
		const svg = svgComplexPlane({
			range,
			points: [
				{ re: omega[0], im: omega[1], label: 'Ω', color: '#16a34a' },
				{ re: zA[0], im: zA[1], label: 'A', color: '#2563eb' },
				{ re: zB[0], im: zB[1], label: 'B', color: '#2563eb' },
				{ re: zA2[0], im: zA2[1], label: "A'", color: '#dc2626' },
				{ re: zB2[0], im: zB2[1], label: "B'", color: '#dc2626' }
			],
			segments: [
				{ from: [zA[0], zA[1]], to: [zB[0], zB[1]], color: '#2563eb' },
				{ from: [zA2[0], zA2[1]], to: [zB2[0], zB2[1]], color: '#dc2626' },
				{ from: [omega[0], omega[1]], to: [zA[0], zA[1]], color: '#94a3b8' },
				{ from: [omega[0], omega[1]], to: [zA2[0], zA2[1]], color: '#94a3b8' }
			]
		});
		const imageUrl = saveSvgAsset(`3as_math_t2_similitude_${difficulty}_${seed}`, svg);

		const aK = cxKatex(a);
		const aT = cxTypst(a);
		const bK = cxKatex(b);
		const bT = cxTypst(b);
		const oK = cxKatex(omega);
		const oT = cxTypst(omega);
		const ratioK = sqrtKatex(kSq);
		const ratioT = sqrtTypst(kSq);
		const thetaK = angleKatex(mAngle);
		const thetaT = angleTypst(mAngle);
		const fK = `z' = (${aK})z + (${bK})`;

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${S2}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `في المستوي المركب المنسوب إلى معلم متعامد ومتجانس، التشابه المباشر $s$ يحوّل كل نقطة $M(z)$ إلى $M'(z')$ حيث $${fK}$. مساحة المثلث $OAB$ حيث $A(${cxKatex(zA)})$ و $B(${cxKatex(zB)})$ هي $${S}$ وحدة مساحة. احسب مساحة المثلث $O'A'B'$ صورة $OAB$ بالتشابه $s$:`,
				questionTextAr: `مساحة $OAB$ تساوي $${S}$ والتشابه $s$ نسبته $k = ${ratioK}$. احسب مساحة صورته:`,
				imageUrl,
				imageCaption: 'المعلم المركب: النقط A و B وصورتاهما A\' و B\' والمركز Ω',
				questionData: { answer: S2, displayTemplate: "S' = ?", variables: [], tolerance: 0 },
				explanation: `نسبة التشابه $k = |${aK}| = ${ratioK}$ ، والمساحات تُضرب في $k^2 = ${kSq}$. إذن $S' = ${kSq} \\times ${S} = ${S2}$.`
			};
		} else if (difficulty === 'medium') {
			const rawCand: Array<{ z: Cx; isB?: boolean }> = [
				{ z: [-omega[0], -omega[1]] },
				{ z: [omega[0], -omega[1]] },
				{ z: b, isB: true },
				{ z: [omega[0] + 1, omega[1]] },
				{ z: [-omega[1], omega[0]] },
				{ z: [omega[0], omega[1] - 1] }
			];
			const cand = rawCand.filter((item) => !(item.z[0] === omega[0] && item.z[1] === omega[1]));
			const mcq = buildUniqueMcqOptions(
				`$\\omega = ${oK}$`,
				cand.map((item) => ({
					text: `$\\omega = ${cxKatex(item.z)}$`,
					diagnosticFeedback: item.isB
						? 'هذا هو $b$ أي صورة $O$ بالتشابه وليس المركز: المركز هو النقطة الصامدة $\\omega = \\frac{b}{1 - a}$.'
						: 'المركز $\\omega$ يحقق $a\\omega + b = \\omega$ أي $\\omega = \\frac{b}{1 - a}$.'
				})),
				rng
			);
			finalAnswer = `ω = ${oK}`;
			quizQuestion = {
				type: 'mcq',
				questionText: `التشابه المباشر $s$ في المستوي المركب صيغته $${fK}$. ما هو لاحق مركزه $\\Omega$؟`,
				questionTextAr: `عيّن مركز التشابه $s: ${fK}$:`,
				imageUrl,
				imageCaption: 'المعلم المركب: النقط A و B وصورتاهما A\' و B\' والمركز Ω',
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `المركز هو النقطة الصامدة: $\\omega = \\frac{b}{1 - a} = \\frac{${bK}}{1 - (${aK})} = ${oK}$.`
			};
		} else {
			const ratioSqWrong = kSq === 1 ? 4 : kSq * kSq;
			const describeK = (rSq: number, m: number, w: Cx) =>
				`النسبة $k = ${sqrtKatex(rSq)}$ ، الزاوية $\\theta = ${angleKatex(m)}$ ، المركز $\\omega = ${cxKatex(w)}$`;
			const correctOpt = describeK(kSq, mAngle, omega);
			const mcq = buildUniqueMcqOptions(
				correctOpt,
				[
					{ text: describeK(kSq, normAngleUnits(mAngle + 2), omega), diagnosticFeedback: 'الزاوية هي عمدة $a$: $\\theta = \\arg(a)$ ، تحقّق من الربع الذي يقع فيه $a$.' },
					{ text: describeK(ratioSqWrong, mAngle, omega), diagnosticFeedback: 'النسبة هي $k = |a|$ وليست $|a|^2$ (المربع هو نسبة تحويل المساحات).' },
					{ text: describeK(kSq, mAngle, [-omega[0], -omega[1]]), diagnosticFeedback: 'المركز يحقق $\\omega = \\frac{b}{1 - a}$ ؛ تحقق من الإشارة.' },
					{ text: describeK(kSq, normAngleUnits(mAngle + 4), omega), diagnosticFeedback: 'عمدة $a$ هي زاوية التشابه؛ لا تضف $\\pi$.' }
				],
				rng
			);
			finalAnswer = `k = ${ratioK}, θ = ${thetaK}, ω = ${oK}`;
			quizQuestion = {
				type: 'mcq',
				questionText: `التشابه المباشر $s$ يحوّل $M(z)$ إلى $M'(z')$ حيث $${fK}$. ما هي عناصره المميزة (النسبة، الزاوية، المركز)؟`,
				questionTextAr: `عيّن النسبة والزاوية والمركز للتشابه $s: ${fK}$:`,
				imageUrl,
				imageCaption: 'المعلم المركب: النقط A و B وصورتاهما A\' و B\' والمركز Ω',
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `$k = |${aK}| = ${ratioK}$ ، $\\theta = \\arg(${aK}) = ${thetaK}$ ، $\\omega = \\frac{${bK}}{1 - (${aK})} = ${oK}$.`
			};
		}

		return {
			templateId: this.id,
			seed,
			grade: '3as_math',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `المستوي المركب منسوب إلى معلم متعامد ومتجانس $(O ; arrow(u), arrow(v))$. نعتبر التحويل $s$ الذي يرفق بكل نقطة $M(z)$ النقطة $M'(z')$ حيث $z' = (${aT}) z + (${bT})$. نعتبر النقطتين $A(${cxTypst(zA)})$ و $B(${cxTypst(zB)})$.`,
				content: [
					{
						type: 'image',
						src: imageUrl,
						caption: "المعلم المركب: النقط A و B وصورتاهما A' و B' ومركز التشابه Ω",
						width: 55
					},
					{
						type: 'text',
						content: `1) بيّن أن للتحويل $s$ نقطة صامدة وحيدة $Omega$ يطلب تعيين لاحقها $omega$.`,
						answer: `1) النقطة الصامدة تحقق $omega = (${aT}) omega + (${bT})$ أي $(1 - (${aT})) omega = ${bT}$.\nبما أن $a != 1$ فإن $omega = frac(b, 1 - a) = frac(${bT}, ${cxTypst(cSub([1, 0], a))}) = ${oT}$.\nإذن $Omega (${oT})$ هي النقطة الصامدة الوحيدة.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) أثبت أن $z' - omega = a (z - omega)$ ثم حدّد طبيعة $s$ وعناصره المميزة: النسبة $k$ والزاوية $theta$.`,
						answer: `2) بطرح $omega = a omega + b$ من $z' = a z + b$ نجد $z' - omega = a (z - omega)$ مع $a = ${aT}$.\nإذن $s$ تشابه مباشر مركزه $Omega (${oT})$ ونسبته $k = abs(a) = ${ratioT}$ وزاويته $theta = arg(a) = ${thetaT} [2 pi]$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) عيّن لاحقي $A'$ و $B'$ صورتي $A$ و $B$ بالتشابه $s$، ثم تحقق أن $A' B' = k dot A B$.`,
						answer: `3) $z_(A') = (${aT})(${cxTypst(zA)}) + (${bT}) = ${cxTypst(zA2)}$ و $z_(B') = (${aT})(${cxTypst(zB)}) + (${bT}) = ${cxTypst(zB2)}$.\nلدينا $A B^2 = abs(z_B - z_A)^2 = ${AB2}$ و $A' B'^2 = abs(z_(B') - z_(A'))^2 = ${A2B22} = ${kSq} dot ${AB2} = k^2 dot A B^2$.\nإذن $A' B' = k dot A B$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `4) احسب مساحة المثلث $O A B$ ثم استنتج مساحة صورته $O' A' B'$ بالتشابه $s$.`,
						answer: `4) $S = frac(1, 2) abs(x_A y_B - y_A x_B) = ${fracT(sN, sD)}$ وحدة مساحة.\nالتشابه المباشر يضرب المساحات في $k^2 = ${kSq}$ ، فمساحة $O' A' B'$ هي $S' = k^2 S = ${kSq} dot ${fracT(sN, sD)} = ${fracT(s2N, s2D)}$ وحدة مساحة.`,
						mark: '1'
					}
				]
			},
			hints: [
				`النقطة الصامدة تحقق $z = az + b$ أي $z = \\frac{b}{1 - a}$ عندما $a \\neq 1$.`,
				`$z' - \\omega = a(z - \\omega)$ : النسبة $k = |a|$ والزاوية $\\theta = \\arg(a)$.`,
				`التشابه المباشر من نسبة $k$ يضرب الأطوال في $k$ والمساحات في $k^2$.`
			],
			solutionStepsAr: [
				`المركز: $\\omega = \\frac{b}{1 - a} = \\frac{${bK}}{1 - (${aK})} = ${oK}$ ، ونتحقق أن $a\\omega + b = \\omega$.`,
				`الشكل المركزي: $z' - \\omega = (${aK})(z - \\omega)$ ، النسبة $k = ${ratioK}$ والزاوية $\\theta = ${thetaK}$.`,
				`الصور: $A'(${cxKatex(zA2)})$ و $B'(${cxKatex(zB2)})$ ، و $A'B'^2 = ${A2B22} = ${kSq} \\times ${AB2}$.`,
				`المساحات: $S = ${fracK(sN, sD)}$ و $S' = k^2 S = ${kSq} \\times ${fracK(sN, sD)} = ${fracK(s2N, s2D)}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Adaptation of shared core templates → exact 3as_math curriculum lesson IDs
// ═══════════════════════════════════════════════════════════════════════════════

function adaptShared(index: number, lessonId: string): ParameterizedTemplate {
	const adapted = adaptTemplateForTrack(SHARED_TEMPLATES_3AS_T2[index], '3as_math');
	return { ...adapted, curriculumLessonId: lessonId };
}

const tplCondProbBinomial = adaptShared(1, 'lesson_3as_math_t2_conditional_probability_binomial_law');
const tplComplexEquations = adaptShared(2, 'lesson_3as_math_t2_complex_algebraic_equations_forms');
const tplComplexLoci = adaptShared(3, 'lesson_3as_math_t2_complex_loci_familiar_transformations');
const tplBacSynthesis = adaptShared(5, 'lesson_3as_math_t2_integration');

export const TEMPLATES_3AS_MATH_T2: ParameterizedTemplate[] = [
	tplCondProbBinomial,
	tplComplexEquations,
	tplComplexLoci,
	tplBezoutGaussFermatDiophantine,
	tplDirectPlaneSimilitudes,
	tplBacSynthesis
];
