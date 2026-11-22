import type { ExerciseBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';
import { buildUniqueMcqOptions, gcd, SeededRng, simplifyFraction } from '../../rng';

// ═══════════════════════════════════════════════════════════════════════════════
// 3AS Literary (LP / LE) — Trimester 1 Parameterized Templates (6 templates)
// Dual Syntax: KaTeX ($...$) in quizQuestion/hints/steps/finalAnswer;
//              Pure Typst math in sujetExercise (frac, equiv, bb, arrow.r, etc.).
// Strictly Western digits 0-9. Zero riba/interest, zero forbidden symbols.
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

function multiplicativeOrder(a: number, m: number): number {
	let cur = ((a % m) + m) % m;
	let p = 1;
	while (cur !== 1 && p <= m) {
		cur = (cur * a) % m;
		p++;
	}
	return p;
}

function linearKatex(a: number, b: number, v = 'n'): string {
	let head = '';
	if (a === 1) head = v;
	else if (a === -1) head = `-${v}`;
	else if (a !== 0) head = `${a}${v}`;
	if (!head) return `${b}`;
	if (b === 0) return head;
	return b > 0 ? `${head} + ${b}` : `${head} - ${Math.abs(b)}`;
}

function linearTypst(a: number, b: number, v = 'n'): string {
	let head = '';
	if (a === 1) head = v;
	else if (a === -1) head = `-${v}`;
	else if (a !== 0) head = `${a} ${v}`;
	if (!head) return `${b}`;
	if (b === 0) return head;
	return b > 0 ? `${head} + ${b}` : `${head} - ${Math.abs(b)}`;
}

function fracKatex(num: number, den: number): string {
	const [sn, sd] = simplifyFraction(num, den);
	if (sd === 1) return `${sn}`;
	return sn < 0 ? `-\\frac{${Math.abs(sn)}}{${sd}}` : `\\frac{${sn}}{${sd}}`;
}

function fracTypst(num: number, den: number): string {
	const [sn, sd] = simplifyFraction(num, den);
	if (sd === 1) return `${sn}`;
	return sn < 0 ? `-frac(${Math.abs(sn)}, ${sd})` : `frac(${sn}, ${sd})`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Euclidean Division in Z, Negative Dividends & Divisors
// ═══════════════════════════════════════════════════════════════════════════════

const tplEuclideanDivisibility: ParameterizedTemplate = {
	id: 'tpl_3as_shared_lit_t1_euclidean_divisibility',
	grade: '3as_lp',
	trimesterId: 't1',
	domain: 'arithmetic_z',
	titleAr: 'القسمة الإقليدية في Z (للأعداد الموجبة والسالبة) وقواسم عدد صحيح',
	curriculumLessonId: 'lesson_3as_shared_lit_t1_euclidean_division_divisors',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const b1 = difficulty === 'easy' ? rng.int(6, 11) : rng.int(7, 17);
		const q1 = difficulty === 'easy' ? rng.int(12, 35) : rng.int(25, 85);
		const r1 = rng.int(1, b1 - 1);
		const a1 = b1 * q1 + r1;
		if (a1 !== b1 * q1 + r1 || r1 < 0 || r1 >= b1) {
			throw new Error('Euclidean division invariant failed');
		}

		// Negative dividend: -a2 = b2 * (-q2 - 1) + (b2 - r2)
		const b2 = rng.int(5, 12);
		const q2 = rng.int(8, 28);
		const r2 = rng.int(1, b2 - 1);
		const a2 = b2 * q2 + r2;
		const negDividend = -a2;
		const negQ = -q2 - 1;
		const negR = b2 - r2;
		if (negDividend !== b2 * negQ + negR || negR < 0 || negR >= b2) {
			throw new Error('Negative Euclidean division invariant failed');
		}

		// Divisibility: find n in N such that (n + k1) divides (c*n + k2) = c(n + k1) + D
		const k1 = rng.pick([1, 2, 3]);
		const c = rng.pick([2, 3, 4]);
		const dPool = difficulty === 'easy' ? [6, 8] : [10, 12, 15];
		const D = rng.pick(dPool);
		const k2 = c * k1 + D;
		const divisorsOfD: number[] = [];
		for (let d = 1; d <= D; d++) {
			if (D % d === 0) divisorsOfD.push(d);
		}
		const validN = divisorsOfD.filter((d) => d - k1 >= 0).map((d) => d - k1);
		if (validN.length === 0) throw new Error('No valid natural solutions for divisibility');
		const maxValidN = validN[validN.length - 1];

		const numExprK = linearKatex(c, k2, 'n');
		const numExprT = linearTypst(c, k2, 'n');
		const denExprK = `n + ${k1}`;
		const denExprT = `n + ${k1}`;

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${r1}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `أنجز القسمة الإقليدية للعدد $${a1}$ على $${b1}$ واكتُبها على الشكل $${a1} = ${b1}q + r$ مع $0 \\le r < ${b1}$. ما هو الباقي $r$ ؟`,
				questionTextAr: `ما هو باقي القسمة الإقليدية للعدد $${a1}$ على $${b1}$ ؟`,
				questionData: { answer: r1, displayTemplate: 'r = ?', variables: [], tolerance: 0 },
				explanation: `لدينا $${b1} \\times ${q1} = ${b1 * q1}$ و $${a1} - ${b1 * q1} = ${r1}$ ، إذن $${a1} = ${b1} \\times ${q1} + ${r1}$ مع $0 \\le ${r1} < ${b1}$ ، والباقي هو $r = ${r1}$ .`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `q = ${negQ}, r = ${negR}`;
			const correct = `$q = ${negQ}$ و $r = ${negR}$`;
			const mcq = buildUniqueMcqOptions(
				correct,
				[
					{
						text: `$q = ${-q2}$ و $r = ${-r2}$`,
						diagnosticFeedback: `خطأ: في القسمة الإقليدية يجب أن يكون الباقي موجباً أو معدوماً ($0 \\le r < ${b2}$)، ولا يقبل الباقي السالب $-${r2}$ !`
					},
					{
						text: `$q = ${-q2}$ و $r = ${r2}$`,
						diagnosticFeedback: `تحقق من المساواة: $${b2}(${-q2}) + ${r2} = ${-b2 * q2 + r2} \\ne ${negDividend}$ .`
					},
					{
						text: `$q = ${negQ}$ و $r = ${r2}$`,
						diagnosticFeedback: `الباقي الصحيح للعدد السالب هو $${b2} - ${r2} = ${negR}$ وليس $${r2}$ .`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `ما هما حاصل القسمة $q$ وباقي القسمة الإقليدية $r$ للعدد الصحيح السالب $${negDividend}$ على $${b2}$ في $\\mathbb{Z}$ ؟`,
				questionTextAr: `عيّن حاصل وباقي القسمة الإقليدية للعدد $${negDividend}$ على $${b2}$ :`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نعلم أن $${a2} = ${b2}(${q2}) + ${r2}$ ، ومنه $${negDividend} = ${b2}(${-q2}) - ${r2} = ${b2}(${-q2 - 1}) + (${b2} - ${r2}) = ${b2}(${negQ}) + ${negR}$ مع $0 \\le ${negR} < ${b2}$ .`
			};
		} else {
			finalAnswer = `${maxValidN}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `ما هي أكبر قيمة للعدد الطبيعي $n$ التي تجعل العدد $(${denExprK})$ قاسماً للعدد $(${numExprK})$ ؟`,
				questionTextAr: `أوجد أكبر عدد طبيعي $n$ يحقق $(${denExprK}) \\mid (${numExprK})$ :`,
				questionData: { answer: maxValidN, displayTemplate: 'n_max = ?', variables: [], tolerance: 0 },
				explanation: `نكتب $${numExprK} = ${c}(${denExprK}) + ${D}$ . إذن $(${denExprK})$ يقسم $(${numExprK})$ إذا وفقط إذا قسم $(${denExprK})$ العدد $${D}$ . أكبر قاسم موجب للعدد $${D}$ هو $${D}$ نفسه، ومنه $n + ${k1} = ${D} \\implies n = ${maxValidN}$ .`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `يتناول هذا التمرين القسمة الإقليدية في المجموعة $bb(Z)$ وقواسم عدد صحيح.`,
			content: [
				{
					type: 'text',
					content: `1) أنجز القسمة الإقليدية للعدد $${a1}$ على $${b1}$ في $bb(Z)$ .`,
					answer: `1) لدينا $${b1} times ${q1} = ${b1 * q1}$ و $${a1} - ${b1 * q1} = ${r1}$ ، إذن $${a1} = ${b1} times ${q1} + ${r1}$ مع $0 <= ${r1} < ${b1}$ .\nالحاصل هو $q = ${q1}$ والباقي هو $r = ${r1}$ .`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) عيّن حاصل القسمة وباقي القسمة الإقليدية للعدد الصحيح السالب $${negDividend}$ على $${b2}$ في $bb(Z)$ .`,
					answer: `2) لدينا $${a2} = ${b2} times ${q2} + ${r2}$ ، وبضرب المساواة في $-1$ نجد $${negDividend} = ${b2}(-${q2}) - ${r2}$ .\nنطرح $${b2}$ ونضيف $${b2}$ ليصبح الباقي موجباً: $${negDividend} = ${b2}(${negQ}) + ${negR}$ مع $0 <= ${negR} < ${b2}$ .\nإذن الحاصل هو $q' = ${negQ}$ والباقي هو $r' = ${negR}$ .`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `3) أ) تحقّق أنه من أجل كل عدد طبيعي $n$ : $${numExprT} = ${c}(${denExprT}) + ${D}$ .\nب) عيّن جميع قيم العدد الطبيعي $n$ التي يكون من أجلها الكسر $frac(${numExprT}, ${denExprT})$ عدداً طبيعياً.`,
					answer: `3) أ) بالنشر: $${c}(${denExprT}) + ${D} = ${c} n + ${c * k1} + ${D} = ${numExprT}$ .\nب) يكون $frac(${numExprT}, ${denExprT}) = ${c} + frac(${D}, ${denExprT})$ عدداً طبيعياً إذا وفقط إذا كان $(${denExprT})$ قاسماً للعدد $${D}$ .\nالقواسم الموجبة للعدد $${D}$ هي ${divisorsOfD.join('، ')} .\nبوضع $n + ${k1} in {${divisorsOfD.join(', ')}}$ مع $n in bb(N)$ نجد القيم المقبولة: $n in {${validN.join(', ')}}$ .`,
					mark: '1.75'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_lp',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`في القسمة الإقليدية لـ $a$ على $b > 0$ يُشترط أن يحقق الباقي $0 \\le r < b$ دوماً.`,
				`عند قسمة عدد سالب $-A$ على $b$ ، أضف $b$ إلى الباقي السالب وأنقص $1$ من الحاصل.`,
				`اكتب البسط بدلالة المقام لإظهار باقٍ ثابت لا يحتوي على $n$ ثم ادرس قواسم هذا الثابت.`
			],
			solutionStepsAr: [
				`القسمة الإقليدية الموجبة: $${a1} = ${b1} \\times ${q1} + ${r1}$ .`,
				`القسمة الإقليدية السالبة: $${negDividend} = ${b2}(${negQ}) + ${negR}$ .`,
				`قابلية القسمة: $${numExprK} = ${c}(${denExprK}) + ${D}$ تعطي $n \\in \\{${validN.join(' ; ')}\\}$ .`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Congruences Modulo n & Algebraic Compatibility Properties
// ═══════════════════════════════════════════════════════════════════════════════

const tplCongruenceProperties: ParameterizedTemplate = {
	id: 'tpl_3as_shared_lit_t1_congruence_properties',
	grade: '3as_lp',
	trimesterId: 't1',
	domain: 'arithmetic_z',
	titleAr: 'الموافقات بترديد n وخصائص الجمع والطرح والضرب والقوى',
	curriculumLessonId: 'lesson_3as_shared_lit_t1_congruences_mod_n',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const mPool = difficulty === 'easy' ? [5, 7] : [7, 9, 11];
		const m = rng.pick(mPool);

		// Pick 1 <= ra < rb < m so ra - rb < 0 tests positive adjustment
		const ra = rng.int(1, m - 2);
		const rb = rng.int(ra + 1, m - 1);
		const a = m * rng.int(18, 85) + ra;
		const b = m * rng.int(15, 75) + rb;

		const remSum = (ra + rb) % m;
		const remDiff = (ra - rb + m) % m; // positive since ra < rb => ra - rb + m in [1, m-1]
		const k1 = rng.pick([2, 3]);
		const k2 = rng.pick([2, 3, 4]);
		const remLin = (k1 * ra + k2 * rb) % m;
		const remSq = (ra * ra + rb * rb) % m;

		// Ensure c0 in {1..m-1} such that a^2 + 2b + c0 = 0 [m]
		const rawExprMod = (ra * ra + 2 * rb) % m;
		const c0 = rawExprMod === 0 ? m : m - rawExprMod;
		if ((a * a + 2 * b + c0) % m !== 0) {
			throw new Error('Congruence divisibility check failed');
		}

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${remSum}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر العددين الصحيحين $a = ${a}$ و $b = ${b}$ . عيّن باقي القسمة الإقليدية للمجموع $a + b$ على $${m}$ :`,
				questionTextAr: `ما هو باقي قسمة $${a} + ${b}$ على $${m}$ ؟`,
				questionData: { answer: remSum, displayTemplate: 'r = ?', variables: [], tolerance: 0 },
				explanation: `لدينا $${a} \\equiv ${ra} \\pmod{${m}}$ و $${b} \\equiv ${rb} \\pmod{${m}}$ ، ومنه $a + b \\equiv ${ra} + ${rb} = ${ra + rb} \\equiv ${remSum} \\pmod{${m}}$ .`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${remDiff}`;
			const negDiff = ra - rb;
			const mcq = buildUniqueMcqOptions(
				`$${remDiff}$`,
				[
					{
						text: `$${negDiff}$`,
						diagnosticFeedback: `انتبه: الباقي في القسمة الإقليدية لا يمكن أن يكون سالباً ($${negDiff} < 0$)! أضف $${m}$ للحصول على الباقي الصحيح.`
					},
					{
						text: `$${rb - ra}$`,
						diagnosticFeedback: `هذا باقي $b - a$ وليس $a - b$ .`
					},
					{
						text: `$${(remDiff + 1) % m}$`,
						diagnosticFeedback: `تحقق من جمع $${negDiff} + ${m} = ${remDiff}$ .`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `علماً أن $a \\equiv ${ra} \\pmod{${m}}$ و $b \\equiv ${rb} \\pmod{${m}}$ ، ما هو باقي القسمة الإقليدية للفرق $a - b$ على $${m}$ ؟`,
				questionTextAr: `ما هو باقي قسمة $a - b$ على $${m}$ ؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `$a - b \\equiv ${ra} - ${rb} = ${negDiff} \\equiv ${negDiff} + ${m} = ${remDiff} \\pmod{${m}}$ ، وبما أن $0 \\le ${remDiff} < ${m}$ فإن الباقي هو $${remDiff}$ .`
			};
		} else {
			finalAnswer = `${c0}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `إذا كان $a \\equiv ${ra} \\pmod{${m}}$ و $b \\equiv ${rb} \\pmod{${m}}$ ، فما هو أصغر عدد طبيعي غير معدوم $c$ يجعل العدد $a^2 + 2b + c$ يقبل القسمة على $${m}$ ؟`,
				questionTextAr: `أوجد أصغر $c \\in \\mathbb{N}^*$ يحقق $a^2 + 2b + c \\equiv 0 \\pmod{${m}}$ :`,
				questionData: { answer: c0, displayTemplate: 'c = ?', variables: [], tolerance: 0 },
				explanation: `لدينا $a^2 + 2b \\equiv ${ra}^2 + 2(${rb}) = ${ra * ra + 2 * rb} \\equiv ${rawExprMod} \\pmod{${m}}$ . لكي يقبل $a^2 + 2b + c$ القسمة على $${m}$ يكفي أن يكون $c \\equiv ${m} - ${rawExprMod} = ${c0} \\pmod{${m}}$ ، وأصغر قيمة موجبة هي $c = ${c0}$ .`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر العددين الصحيحين $a = ${a}$ و $b = ${b}$ ، ونرمز بـ $[${m}]$ إلى الموافقة بترديد $${m}$ .`,
			content: [
				{
					type: 'text',
					content: `1) عيّن باقي القسمة الإقليدية لكل من العددين $a$ و $b$ على $${m}$ ، ثم اكتب الموافقتين الموافقتين بترديد $${m}$ .`,
					answer: `1) بقسمة $a$ و $b$ على $${m}$ :\n- $${a} = ${m} times ${Math.floor(a / m)} + ${ra}$ ، ومنه $a equiv ${ra} [${m}]$ .\n- $${b} = ${m} times ${Math.floor(b / m)} + ${rb}$ ، ومنه $b equiv ${rb} [${m}]$ .`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) استنتج باقي القسمة الإقليدية على $${m}$ لكل من الأعداد: $a + b$ ، $a - b$ ، و $${k1} a + ${k2} b$ .`,
					answer: `2) باستعمال خواص التلاؤم مع الجمع والطرح والضرب:\n- $a + b equiv ${ra} + ${rb} = ${ra + rb} equiv ${remSum} [${m}]$ ، فالباقي هو $${remSum}$ .\n- $a - b equiv ${ra} - ${rb} = ${ra - rb} equiv ${ra - rb} + ${m} = ${remDiff} [${m}]$ ، فالباقي هو $${remDiff}$ .\n- $${k1} a + ${k2} b equiv ${k1}(${ra}) + ${k2}(${rb}) = ${k1 * ra + k2 * rb} equiv ${remLin} [${m}]$ ، فالباقي هو $${remLin}$ .`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `3) احسب باقي قسمة $a^2 + b^2$ على $${m}$ ، ثم بيّن أن العدد $a^2 + 2 b + ${c0}$ يقبل القسمة على $${m}$ .`,
					answer: `3) حساب القوى والمجموع:\n- $a^2 + b^2 equiv ${ra}^2 + ${rb}^2 = ${ra * ra + rb * rb} equiv ${remSq} [${m}]$ ، فالباقي هو $${remSq}$ .\n- لدينا $a^2 + 2 b + ${c0} equiv ${ra}^2 + 2(${rb}) + ${c0} = ${ra * ra + 2 * rb + c0} equiv 0 [${m}]$ .\nإذن العدد $a^2 + 2 b + ${c0}$ يقبل القسمة على $${m}$ .`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_lp',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`إذا كان $a \\equiv r_1 \\pmod{${m}}$ و $b \\equiv r_2 \\pmod{${m}}$ يمكنك استبدال $a$ بـ $r_1$ و $b$ بـ $r_2$ في الجمع والضرب والقوى.`,
				`إذا نتج عدد سالب أثناء الطرح مثل $r_1 - r_2 < 0$ ، أضف إليه $${m}$ لتحصل على باقٍ موجب في $\\{0, \\dots, ${m - 1}\\}$ .`,
				`العدد $E$ يقبل القسمة على $${m}$ إذا وفقط إذا كان $E \\equiv 0 \\pmod{${m}}$ .`
			],
			solutionStepsAr: [
				`تحديد البواقي: $a \\equiv ${ra} \\pmod{${m}}$ و $b \\equiv ${rb} \\pmod{${m}}$ .`,
				`تطبيق التلاؤم: $a + b \\equiv ${remSum}$ و $a - b \\equiv ${remDiff}$ و $${k1}a + ${k2}b \\equiv ${remLin} \\pmod{${m}}$ .`,
				`المربع والموافقة الصفرية: $a^2 + b^2 \\equiv ${remSq} \\pmod{${m}}$ و $a^2 + 2b + ${c0} \\equiv 0 \\pmod{${m}}$ .`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Power Remainders Cycles a^n ≡ r [m] & Linear Congruence Equations
// ═══════════════════════════════════════════════════════════════════════════════

const tplPowerCyclesEquations: ParameterizedTemplate = {
	id: 'tpl_3as_shared_lit_t1_power_cycles_equations',
	grade: '3as_lp',
	trimesterId: 't1',
	domain: 'arithmetic_z',
	titleAr: 'دورية بواقي قوى عدد طبيعي a^n وحل معادلات الموافقة ax + b ≡ c [m]',
	curriculumLessonId: 'lesson_3as_shared_lit_t1_power_remainders_congruence_equations',
	defaultPoints: 5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const mPool = difficulty === 'easy' ? [5, 7] : [5, 7, 9];
		const m = rng.pick(mPool);

		let a = 2;
		let period = 1;
		for (let tries = 0; tries < 200; tries++) {
			const cand = rng.int(2, m - 1);
			if (gcd(cand, m) === 1) {
				const ord = multiplicativeOrder(cand, m);
				if (ord >= 3) {
					a = cand;
					period = ord;
					break;
				}
			}
		}
		if (gcd(a, m) !== 1 || period < 3) {
			a = 2;
			period = multiplicativeOrder(2, m);
		}

		const cycle: number[] = [];
		for (let k = 0; k < period; k++) cycle.push(modPow(a, k, m));

		const A = a + m * rng.int(2, 5);
		let E = rng.int(1440, 2030);
		while (E % period === 0) E++;
		const Eq = Math.floor(E / period);
		const Er = E % period;
		const remPow = modPow(A, E, m);
		if (remPow !== cycle[Er]) {
			throw new Error('Power cycle remainder mismatch');
		}

		// Find n such that a^n + cDiv = 0 [m]
		const sStar = rng.int(1, period - 1);
		const targetRem = cycle[sStar];
		const cDiv = m - targetRem; // so a^n + cDiv = 0 [m] <=> a^n = targetRem [m] <=> n = period*k + sStar

		// Linear congruence u*x + bEq = cEq [m] with gcd(u, m) = 1
		let u = 2;
		for (let tries = 0; tries < 100; tries++) {
			const cand = rng.int(2, m - 1);
			if (gcd(cand, m) === 1) {
				u = cand;
				break;
			}
		}
		const x0 = rng.int(1, m - 1);
		const bEq = rng.int(1, m - 1);
		const cEq = (u * x0 + bEq) % m;
		const rhsClean = (cEq - bEq + m) % m;
		if ((u * x0 + bEq) % m !== cEq) {
			throw new Error('Linear congruence solution verification failed');
		}

		const cycleTypst = cycle.map((r, k) => `$${a}^${k} equiv ${r} [${m}]$`).join('، ');
		const cycleKatex = cycle.map((r, k) => `$${a}^{${k}} \\equiv ${r} \\pmod{${m}}$`).join('، ');
		const resTableT: string[] = [];
		for (let x = 0; x < m; x++) {
			resTableT.push(`${x} arrow.r ${(u * x) % m}`);
		}

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${period}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `ندرس بواقي قسمة $a^n$ على $${m}$ من أجل $a = ${a}$ . ما هو دور هذه البواقي (أصغر أس طبيعي غير معدوم $p$ يحقق $${a}^p \\equiv 1 \\pmod{${m}}$)؟`,
				questionTextAr: `ما هو دور بواقي قسمة $${a}^n$ على $${m}$ ؟`,
				questionData: { answer: period, displayTemplate: 'p = ?', variables: [], tolerance: 0 },
				explanation: `بحساب القوى المتتابعة بترديد $${m}$ : ${cycleKatex} ، ونجد $${a}^{${period}} \\equiv 1 \\pmod{${m}}$ ، إذن الدور هو $p = ${period}$ .`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${remPow}`;
			const mcq = buildUniqueMcqOptions(
				`$${remPow}$`,
				[
					{
						text: `$${modPow(A, E % m, m)}$`,
						diagnosticFeedback: `انتبه: يُختزل الأس على الدور $p = ${period}$ وليس على الترديد $${m}$ !`
					},
					{
						text: `$${cycle[(Er + 1) % period]}$`,
						diagnosticFeedback: `راجع باقي قسمة الأس $${E}$ على $${period}$ : $${E} = ${period} \\times ${Eq} + ${Er}$ .`
					},
					{
						text: `$${(remPow + 1) % m}$`,
						diagnosticFeedback: `تحقق من القيمة الموافقة للباقي $${Er}$ في جدول البواقي.`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `علماً أن $${A} \\equiv ${a} \\pmod{${m}}$ وأن دور بواقي $${a}^n$ بترديد $${m}$ هو $p = ${period}$ ، ما هو باقي قسمة $${A}^{${E}}$ على $${m}$ ؟`,
				questionTextAr: `ما هو باقي قسمة $${A}^{${E}}$ على $${m}$ ؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نقسم الأس على الدور $${period}$ : $${E} = ${period} \\times ${Eq} + ${Er}$ . ومنه $${A}^{${E}} \\equiv ${a}^{${E}} \\equiv ${a}^{${Er}} \\equiv ${remPow} \\pmod{${m}}$ .`
			};
		} else {
			finalAnswer = `${x0}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `حل في $\\mathbb{Z}$ معادلة الموافقة: $${u}x + ${bEq} \\equiv ${cEq} \\pmod{${m}}$ . ما هو أصغر حل طبيعي $x_0 \\in \\{0, 1, \\dots, ${m - 1}\\}$ ؟`,
				questionTextAr: `أوجد $x_0 \\in \\{0, \\dots, ${m - 1}\\}$ الذي يحقق $${u}x + ${bEq} \\equiv ${cEq} \\pmod{${m}}$ :`,
				questionData: { answer: x0, displayTemplate: 'x_0 = ?', variables: [], tolerance: 0 },
				explanation: `تكافئ المعادلة $${u}x \\equiv ${cEq} - ${bEq} \\equiv ${rhsClean} \\pmod{${m}}$ . باختبار البواقي $0, \\dots, ${m - 1}$ نجد $${u}(${x0}) + ${bEq} = ${u * x0 + bEq} \\equiv ${cEq} \\pmod{${m}}$ ، إذن $x_0 = ${x0}$ .`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `ندرس بواقي قوى العدد $${a}$ بترديد $${m}$ وحل معادلة موافقة في المجموعة $bb(Z)$ .`,
			content: [
				{
					type: 'text',
					content: `1) ادرس تبعاً لقيم العدد الطبيعي $n$ بواقي القسمة الإقليدية للعدد $${a}^n$ على $${m}$ ، وعيّن دور البواقي.`,
					answer: `1) نحسب بواقي $${a}^k$ بترديد $${m}$ :\n${cycleTypst}، ثم $${a}^${period} equiv 1 [${m}]$ .\nإذن تتكرر البواقي بدور $p = ${period}$ : من أجل كل $k in bb(N)$ ، $n = ${period} k + r$ مع $r in {0, ..., ${period - 1}}$ يعطي $${a}^n equiv ${a}^r [${m}]$ .`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `2) تحقّق أن $${A} equiv ${a} [${m}]$ ، ثم استنتج باقي القسمة الإقليدية للعدد $${A}^(${E})$ على $${m}$ .`,
					answer: `2) لدينا $${A} = ${m} times ${Math.floor(A / m)} + ${a}$ إذن $${A} equiv ${a} [${m}]$ .\nوبقسمة الأس على الدور $${period}$ : $${E} = ${period} times ${Eq} + ${Er}$ .\nومنه $${A}^(${E}) equiv ${a}^(${E}) = (${a}^${period})^(${Eq}) times ${a}^(${Er}) equiv 1^(${Eq}) times ${remPow} = ${remPow} [${m}]$ .\nالباقي هو $${remPow}$ .`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `3) عيّن قيم العدد الطبيعي $n$ حتى يقبل العدد $${a}^n + ${cDiv}$ القسمة على $${m}$ .`,
					answer: `3) يقبل $${a}^n + ${cDiv}$ القسمة على $${m}$ إذا وفقط إذا كان $${a}^n + ${cDiv} equiv 0 [${m}] arrow.l.r.double ${a}^n equiv -${cDiv} equiv ${targetRem} [${m}]$ .\nمن جدول البواقي نجد الباقي $${targetRem}$ عندما $n = ${period} k + ${sStar}$ مع $k in bb(N)$ .`,
					mark: '1'
				},
				{
					type: 'text',
					content: `4) حل في $bb(Z)$ المعادلة: $${u} x + ${bEq} equiv ${cEq} [${m}]$ .`,
					answer: `4) المعادلة تكافئ $${u} x equiv ${cEq} - ${bEq} equiv ${rhsClean} [${m}]$ .\nباختبار بواقي $x$ بترديد $${m}$ ($x arrow.r ${u} x [${m}]$): ${resTableT.join('، ')}.\nنجد الحل الوحيد بترديد $${m}$ هو $x equiv ${x0} [${m}]$ ، أي $x = ${m} k + ${x0}$ حيث $k in bb(Z)$ .`,
					mark: '1.25'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_lp',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`احسب $${a}^0, ${a}^1, ${a}^2, \\dots$ بترديد $${m}$ حتى ظهور الباقي $1$ لتعيين الدور $p$ .`,
				`اقسم الأس الكبير $${E}$ على الدور $p = ${period}$ وليس على $${m}$ .`,
				`لحل $${u}x \\equiv ${rhsClean} \\pmod{${m}}$ أنشئ جدول بواقي $x \\in \\{0, \\dots, ${m - 1}\\}$ .`
			],
			solutionStepsAr: [
				`دورية القوى: ${cycleKatex} والدور $p = ${period}$ .`,
				`باقي $${A}^{${E}}$ على $${m}$ هو $${remPow}$ لأن $${E} = ${period} \\times ${Eq} + ${Er}$ .`,
				`قابلية القسمة: $${a}^n + ${cDiv} \\equiv 0 \\pmod{${m}} \\iff n = ${period}k + ${sStar}$ .`,
				`حل المعادلة: $x = ${m}k + ${x0}$ ($k \\in \\mathbb{Z}$).`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Arithmetic Sequences: General Term, Mean, Rank & Sum
// ═══════════════════════════════════════════════════════════════════════════════

const tplArithmeticSequence: ParameterizedTemplate = {
	id: 'tpl_3as_shared_lit_t1_arithmetic_sequence',
	grade: '3as_lp',
	trimesterId: 't1',
	domain: 'algebra',
	titleAr: 'المتتاليات الحسابية: الوسط الحسابي، الأساس، الرتبة والمجموع',
	curriculumLessonId: 'lesson_3as_shared_lit_t1_arithmetic_sequences',
	defaultPoints: 5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const isDecreasing = difficulty === 'hard' && rng.int(0, 1) === 1;
		const rAbs = difficulty === 'easy' ? rng.pick([2, 3]) : rng.pick([3, 4, 5]);
		const r = isDecreasing ? -rAbs : rAbs;
		const u0 = isDecreasing ? rng.int(35, 65) : rng.int(1, 9);
		const u1 = u0 + r;
		const u2 = u0 + 2 * r;
		const u3 = u0 + 3 * r;
		const sum3 = u1 + u2 + u3; // = 3 * u2
		const prod13 = u1 * u3; // = u2^2 - r^2

		const nStar = rng.int(15, 35);
		const targetTerm = u0 + nStar * r;
		const rankStar = nStar + 1;

		const nSum = 10;
		const u10 = u0 + nSum * r;
		const s10 = Math.floor(((nSum + 1) * (u0 + u10)) / 2);

		if (sum3 !== 3 * u2 || prod13 !== u2 * u2 - r * r) {
			throw new Error('Arithmetic sequence mean invariant failed');
		}

		const monoAr = r > 0 ? 'متزايدة تماماً' : 'متناقصة تماماً';
		const uExprK = linearKatex(r, u0, 'n');
		const uExprT = linearTypst(r, u0, 'n');
		const sumInnerT = linearTypst(r, 2 * u0, 'n');

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${u2}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر متتالية حسابية $(u_n)_{n \\in \\mathbb{N}}$ تحقق $u_1 + u_2 + u_3 = ${sum3}$ . باستعمال خاصية الوسط الحسابي، احسب قيمة الحد $u_2$ :`,
				questionTextAr: `احسب $u_2$ علماً أن $u_1 + u_2 + u_3 = ${sum3}$ :`,
				questionData: { answer: u2, displayTemplate: 'u_2 = ?', variables: [], tolerance: 0 },
				explanation: `بالوسط الحسابي: $u_1 + u_3 = 2u_2$ ، ومنه $3u_2 = ${sum3} \\implies u_2 = \\frac{${sum3}}{3} = ${u2}$ .`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${rankStar}`;
			const mcq = buildUniqueMcqOptions(
				`الرتبة $${rankStar}$ (الدليل $n = ${nStar}$)`,
				[
					{
						text: `الرتبة $${nStar}$ (الدليل $n = ${nStar - 1}$)`,
						diagnosticFeedback: `انتبه: الدليل $n = ${nStar}$ صحيح، لكن بما أن الحد الأول هو $u_0$ فإن الرتبة هي $n + 1 = ${rankStar}$ !`
					},
					{
						text: `الرتبة $${rankStar + 1}$ (الدليل $n = ${nStar + 1}$)`,
						diagnosticFeedback: `راجع حل المعادلة $${uExprK} = ${targetTerm}$ .`
					},
					{
						text: `العدد $${targetTerm}$ ليس حداً من حدود المتتالية`,
						diagnosticFeedback: `بلى، القسمة $\\frac{${targetTerm - u0}}{${r}} = ${nStar} \\in \\mathbb{N}$ تامة.`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `لتكن $(u_n)_{n \\in \\mathbb{N}}$ متتالية حسابية حدها الأول $u_0 = ${u0}$ وأساسها $r = ${r}$ . ما هي **رتبة** الحد الذي قيمته $${targetTerm}$ ؟`,
				questionTextAr: `عيّن رتبة الحد الذي يساوي $${targetTerm}$ علماً أن الحد الأول $u_0 = ${u0}$ والأساس $r = ${r}$ :`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `عبارة الحد العام $u_n = ${uExprK}$ . نحل $${uExprK} = ${targetTerm} \\iff ${r}n = ${targetTerm - u0} \\iff n = ${nStar} \\in \\mathbb{N}$ . ولأن البداية من $u_0$ فإن الرتبة هي $${nStar} + 1 = ${rankStar}$ .`
			};
		} else {
			finalAnswer = `${s10}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `متتالية حسابية $(u_n)_{n \\in \\mathbb{N}}$ حدها الأول $u_0 = ${u0}$ وأساسها $r = ${r}$ . احسب المجموع $S_{10} = u_0 + u_1 + \\dots + u_{10}$ :`,
				questionTextAr: `احسب قيمة المجموع $S_{10} = u_0 + u_1 + \\dots + u_{10}$ :`,
				questionData: { answer: s10, displayTemplate: 'S_10 = ?', variables: [], tolerance: 0 },
				explanation: `الحد الحادي عشر هو $u_{10} = ${u0} + 10(${r}) = ${u10}$ ، وعدد الحدود $11$ ، ومنه $S_{10} = \\frac{11 \\times (${u0} + ${u10})}{2} = ${s10}$ .`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر المتتالية الحسابية $(u_n)_(n in bb(N))$ ال${monoAr}، والتي تحقق حدودها المتعاقبة $u_1$ ، $u_2$ و $u_3$ الجملة:\n$cases(u_1 + u_2 + u_3 = ${sum3}, u_1 times u_3 = ${prod13})$`,
			content: [
				{
					type: 'text',
					content: `1) باستعمال خاصية الوسط الحسابي، احسب $u_2$ .`,
					answer: `1) بما أن $u_1, u_2, u_3$ ثلاثة حدود متعاقبة من متتالية حسابية، فإن $u_1 + u_3 = 2 u_2$ .\nبالتعويض في المعادلة الأولى: $3 u_2 = ${sum3} arrow.r.double u_2 = frac(${sum3}, 3) = ${u2}$ .`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) عيّن أساس المتتالية $r$ وحدّها الأول $u_0$ ، ثم اكتب عبارة الحد العام $u_n$ بدلالة $n$ .`,
					answer: `2) لدينا $u_1 = ${u2} - r$ و $u_3 = ${u2} + r$ . نعوّض في المعادلة الثانية:\n$(${u2} - r)(${u2} + r) = ${prod13} arrow.r.double ${u2 * u2} - r^2 = ${prod13} arrow.r.double r^2 = ${r * r}$ .\nبما أن المتتالية ${monoAr} فإن $${r > 0 ? 'r > 0' : 'r < 0'}$ ، ومنه $r = ${r}$ .\nالحد الأول: $u_0 = u_2 - 2 r = ${u2} - 2(${r}) = ${u0}$ .\nعبارة الحد العام: $u_n = u_0 + n r = ${uExprT}$ .`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `3) تحقّق أن العدد $${targetTerm}$ حد من حدود المتتالية $(u_n)$ وعيّن رتبته.`,
					answer: `3) نحل في $bb(N)$ المعادلة $u_n = ${targetTerm}$ :\n$${uExprT} = ${targetTerm} arrow.r.double ${r} n = ${targetTerm - u0} arrow.r.double n = ${nStar} in bb(N)$ .\nإذن $${targetTerm} = u_${nStar}$ حد من المتتالية، وبما أنها تنطلق من $u_0$ فإن رتبته هي $${nStar} + 1 = ${rankStar}$ .`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `4) احسب بدلالة $n$ المجموع $S_n = u_0 + u_1 + dots + u_n$ ، ثم استنتج قيمة $S_10$ .`,
					answer: `4) عدد حدود المجموع $S_n$ هو $n + 1$ :\n$S_n = frac(n + 1, 2) (u_0 + u_n) = frac(n + 1, 2) (${sumInnerT})$ .\nمن أجل $n = 10$ : $u_10 = ${u10}$ و $S_10 = frac(11, 2)(${u0} + ${u10}) = ${s10}$ .`,
					mark: '1.25'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_lp',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`خاصية الوسط الحسابي: $u_1 + u_3 = 2 u_2$ فتصبح المعادلة الأولى $3 u_2 = ${sum3}$ .`,
				`عبر عن $u_1 = u_2 - r$ و $u_3 = u_2 + r$ لحساب $r^2$ ثم اختر الإشارة المناسبة للرتابة.`,
				`إذا بدأت المتتالية من $u_0$ فإن رتبة الحد $u_n$ هي $(n + 1)$ وعدد حدود $S_n$ هو $(n + 1)$ .`
			],
			solutionStepsAr: [
				`الوسط الحسابي يعطي $u_2 = ${u2}$ .`,
				`الجداء $(${u2} - r)(${u2} + r) = ${prod13}$ يعطي $r = ${r}$ و $u_0 = ${u0}$ وعبارة الحد العام $u_n = ${uExprK}$ .`,
				`العدد $${targetTerm}$ يوافق $n = ${nStar}$ ورتبته $${rankStar}$ ، والمجموع $S_{10} = ${s10}$ .`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Geometric Sequences: General Term, Mean, Monotonicity, Convergence & Sum
// ═══════════════════════════════════════════════════════════════════════════════

const tplGeometricSequence: ParameterizedTemplate = {
	id: 'tpl_3as_shared_lit_t1_geometric_sequence',
	grade: '3as_lp',
	trimesterId: 't1',
	domain: 'algebra',
	titleAr: 'المتتاليات الهندسية: الوسط الهندسي، اتجاه التغير، التقارب والمجاميع',
	curriculumLessonId: 'lesson_3as_shared_lit_t1_geometric_sequences',
	defaultPoints: 5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		interface GeomConfig {
			v0: number;
			qNum: number;
			qDen: number;
		}

		const pool: GeomConfig[] =
			difficulty === 'easy'
				? [
						{ v0: 2, qNum: 2, qDen: 1 },
						{ v0: 3, qNum: 2, qDen: 1 },
						{ v0: 2, qNum: 3, qDen: 1 },
						{ v0: 5, qNum: 2, qDen: 1 }
					]
				: difficulty === 'medium'
					? [
							{ v0: 3, qNum: 3, qDen: 1 },
							{ v0: 4, qNum: 2, qDen: 1 },
							{ v0: 4, qNum: 3, qDen: 1 },
							{ v0: 5, qNum: 3, qDen: 1 }
						]
					: [
							{ v0: 32, qNum: 1, qDen: 2 },
							{ v0: 64, qNum: 1, qDen: 2 },
							{ v0: 48, qNum: 1, qDen: 2 },
							{ v0: 80, qNum: 1, qDen: 2 }
						];

		const cfg = rng.pick(pool);
		const { v0, qNum, qDen } = cfg;
		const qVal = qNum / qDen;
		const isConvergent = qVal < 1;

		const v1 = Math.round(v0 * qVal);
		const v2 = Math.round(v1 * qVal);
		const v3 = Math.round(v2 * qVal);
		const v4 = Math.round(v3 * qVal);
		const prod13 = v1 * v3;
		const sum123 = v1 + v2 + v3;
		const s4 = v0 + v1 + v2 + v3 + v4;

		if (prod13 !== v2 * v2) {
			throw new Error('Geometric sequence mean invariant failed');
		}

		const qKatex = fracKatex(qNum, qDen);
		const qTypst = fracTypst(qNum, qDen);
		const qPowK = qDen === 1 ? `${qNum}^n` : `\\left(${qKatex}\\right)^n`;
		const qPowT = qDen === 1 ? `${qNum}^n` : `(${qTypst})^n`;

		const sFormulaK =
			qDen === 1
				? qNum === 2
					? `${v0}(2^{n+1} - 1)`
					: `${fracKatex(v0, qNum - 1)}(${qNum}^{n+1} - 1)`
				: `${2 * v0}\\left(1 - \\left(\\frac{1}{2}\\right)^{n+1}\\right)`;
		const sFormulaT =
			qDen === 1
				? qNum === 2
					? `${v0}(2^(n+1) - 1)`
					: `${fracTypst(v0, qNum - 1)}(${qNum}^(n+1) - 1)`
				: `${2 * v0}(1 - (frac(1, 2))^(n+1))`;

		const monoAr = isConvergent ? 'متناقصة تماماً' : 'متزايدة تماماً';
		const limitVal = isConvergent ? '0' : '+\\infty';
		const limitTypst = isConvergent ? '0' : '+oo';

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${v2}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر متتالية هندسية $(v_n)_{n \\in \\mathbb{N}}$ حدودها موجبة تماماً، وتحقق $v_1 \\times v_3 = ${prod13}$ . باستعمال الوسط الهندسي، احسب $v_2$ :`,
				questionTextAr: `احسب $v_2 > 0$ علماً أن $v_1 \\times v_3 = ${prod13}$ :`,
				questionData: { answer: v2, displayTemplate: 'v_2 = ?', variables: [], tolerance: 0 },
				explanation: `بالوسط الهندسي: $v_2^2 = v_1 \\times v_3 = ${prod13}$ . وبما أن الحدود موجبة تماماً فإن $v_2 = \\sqrt{${prod13}} = ${v2}$ .`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = sFormulaK;
			const mcq = buildUniqueMcqOptions(
				`$S_n = ${sFormulaK}$`,
				[
					{
						text: `$S_n = ${v0} \\cdot ${qNum}^{n}$`,
						diagnosticFeedback: `هذه عبارة الحد العام (باستثناء معامل) وليست صيغة المجموع $v_0 \\frac{q^{n+1} - 1}{q - 1}$ !`
					},
					{
						text: `$S_n = ${qNum}^{n+1} - 1$`,
						diagnosticFeedback: `تحقق من الضرب في الحد الأول $v_0 = ${v0}$ والقسمة على $(q - 1) = ${qNum - 1}$ .`
					},
					{
						text: `$S_n = ${v0}(${qNum}^{n} - 1)$`,
						diagnosticFeedback: `عدد الحدود من $v_0$ إلى $v_n$ هو $n + 1$ وليس $n$ !`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `متتالية هندسية $(v_n)_{n \\in \\mathbb{N}}$ حدها الأول $v_0 = ${v0}$ وأساسها $q = ${qKatex}$ . ما هي عبارة المجموع $S_n = v_0 + v_1 + \\dots + v_n$ بدلالة $n$ ؟`,
				questionTextAr: `ما هي عبارة $S_n = v_0 + v_1 + \\dots + v_n$ بدلالة $n$ ؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `عدد الحدود هو $n + 1$ ، ومنه $S_n = v_0 \\cdot \\frac{q^{n+1} - 1}{q - 1} = ${v0} \\cdot \\frac{${qNum}^{n+1} - 1}{${qNum} - 1} = ${sFormulaK}$ .`
			};
		} else {
			finalAnswer = `${s4}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `متتالية هندسية $(v_n)_{n \\in \\mathbb{N}}$ حدها الأول $v_0 = ${v0}$ وأساسها $q = \\frac{1}{2}$ . احسب قيمة المجموع $S_4 = v_0 + v_1 + v_2 + v_3 + v_4$ :`,
				questionTextAr: `احسب $S_4 = v_0 + v_1 + \\dots + v_4$ حيث $v_0 = ${v0}$ و $q = \\frac{1}{2}$ :`,
				questionData: { answer: s4, displayTemplate: 'S_4 = ?', variables: [], tolerance: 0 },
				explanation: `الحدود الخمسة الأولى هي $${v0}, ${v1}, ${v2}, ${v3}, ${v4}$ ، ومجموعها $S_4 = ${v0} \\times \\frac{1 - (1/2)^5}{1 - 1/2} = ${s4}$ .`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر المتتالية الهندسية $(v_n)_(n in bb(N))$ التي حدودها موجبة تماماً و${monoAr}، بحيث:\n$cases(v_1 times v_3 = ${prod13}, v_1 + v_2 + v_3 = ${sum123})$`,
			content: [
				{
					type: 'text',
					content: `1) باستعمال خاصية الوسط الهندسي، عيّن قيمة الحد $v_2$ .`,
					answer: `1) في المتتالية الهندسية لدينا $v_1 times v_3 = v_2^2$ ، أي $v_2^2 = ${prod13}$ .\nوبما أن الحدود موجبة تماماً فإن $v_2 = sqrt(${prod13}) = ${v2}$ .`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) عيّن أساس المتتالية $q$ وحدّها الأول $v_0$ ، ثم اكتب عبارة الحد العام $v_n$ بدلالة $n$ .`,
					answer: `2) لدينا $v_1 + v_3 = ${sum123} - ${v2} = ${v1 + v3}$ ، ومع $v_1 = frac(${v2}, q)$ و $v_3 = ${v2} q$ نجد:\n$frac(${v2}, q) + ${v2} q = ${v1 + v3} arrow.r.double ${v2} q^2 - ${v1 + v3} q + ${v2} = 0$ .\nبالتحليل أو بالمميز نجد الحلين $${qTypst}$ ومقلوبه، وبما أن المتتالية ${monoAr} فإن $q = ${qTypst}$ .\nومنه $v_0 = frac(v_1, q) = ${v0}$ ، وعبارة الحد العام هي: $v_n = ${v0} times ${qPowT}$ .`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `3) ادرس اتجاه تغير المتتالية $(v_n)$ ، ثم احسب $lim_(n arrow.r +oo) v_n$ واستنتج هل هي متقاربة أم متباعدة.`,
					answer: `3) حساب الفرق: $v_(n+1) - v_n = v_0 (${qTypst})^n (${qTypst} - 1)$ .\nبما أن $v_0 > 0$ و $${isConvergent ? 'q - 1 < 0' : 'q - 1 > 0'}$ ، فإن $v_(n+1) - v_n ${isConvergent ? '< 0' : '> 0'}$ ، إذن $(v_n)$ ${monoAr} .\nالنهاية: بما أن $${isConvergent ? '|q| = frac(1, 2) < 1' : `q = ${qTypst} > 1`}$ فإن $lim_(n arrow.r +oo) v_n = ${limitTypst}$ ، فالمتتالية ${isConvergent ? 'متقاربة نحو 0' : 'متباعدة'} .`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `4) احسب بدلالة $n$ المجموع $S_n = v_0 + v_1 + dots + v_n$ ، ثم احسب قيمة $S_4$ .`,
					answer: `4) عدد الحدود هو $n + 1$ :\n$S_n = v_0 times frac(1 - q^(n+1), 1 - q) = ${sFormulaT}$ .\nمن أجل $n = 4$ نجد $S_4 = ${v0} + ${v1} + ${v2} + ${v3} + ${v4} = ${s4}$ .`,
					mark: '1.25'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_lp',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`خاصية الوسط الهندسي: $v_1 \\times v_3 = v_2^2$ مع $v_2 > 0$ .`,
				`عبر عن $v_1 = \\frac{v_2}{q}$ و $v_3 = v_2 q$ لتشكيل معادلة من الدرجة الثانية في $q$ .`,
				`تتقارب المتتالية الهندسية نحو $0$ إذا كان $|q| < 1$ ، وتتباعد نحو $+\\infty$ إذا كان $q > 1$ و $v_0 > 0$ .`
			],
			solutionStepsAr: [
				`الوسط الهندسي: $v_2 = \\sqrt{${prod13}} = ${v2}$ .`,
				`تحديد الأساس والحد الأول: $q = ${qKatex}$ و $v_0 = ${v0}$ ، ومنه $v_n = ${v0} \\cdot ${qPowK}$ .`,
				`اتجاه التغير والتقارب: المتتالية ${monoAr} و $\\lim_{n \\to +\\infty} v_n = ${limitVal}$ .`,
				`المجموع: $S_n = ${sFormulaK}$ و $S_4 = ${s4}$ .`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. T1 BAC Integration Synthesis (Congruences + Arithmetic Sequence)
// ═══════════════════════════════════════════════════════════════════════════════

const tplT1IntegrationArithSeq: ParameterizedTemplate = {
	id: 'tpl_3as_shared_lit_t1_integration_arith_seq',
	grade: '3as_lp',
	trimesterId: 't1',
	domain: 'integration',
	isIntegration: true,
	titleAr: 'مسألة إدماجية نموذجية: الموافقات بترديد n والمتتاليات الحسابية',
	curriculumLessonId: 'lesson_3as_shared_lit_t1_power_remainders_congruence_equations',
	defaultPoints: 7,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Part 1: Power cycle mod m in {5, 7}
		const m = rng.pick([5, 7]);
		const a = m === 5 ? rng.pick([2, 3]) : rng.pick([3, 5]);
		const period = multiplicativeOrder(a, m);
		const cycle: number[] = [];
		for (let k = 0; k < period; k++) cycle.push(modPow(a, k, m));

		const yearA = a + m * rng.int(280, 405);
		let expE = rng.int(2020, 2035);
		while (expE % period === 0) expE++;
		const expRem = expE % period;
		const powRem = modPow(yearA, expE, m);

		// Part 2: Arithmetic sequence u_n = alpha*n + beta with even alpha in {2, 4, 6} coprime to m
		const alpha = rng.pick([2, 4, 6]); // gcd(alpha, 5) = 1 and gcd(alpha, 7) = 1
		const halfAlpha = alpha / 2;
		const beta = rng.pick([1, 2, 3, 4]);
		// S_n = (n + 1)(halfAlpha * n + beta)
		const u0 = beta;
		const u5 = alpha * 5 + beta;
		const s4 = 5 * (halfAlpha * 4 + beta);

		// Solve u_n = 0 [m] <=> alpha*n + beta = 0 [m]
		let nSol0 = -1;
		for (let n = 0; n < m; n++) {
			if ((alpha * n + beta) % m === 0) {
				nSol0 = n;
				break;
			}
		}
		if (nSol0 < 0 || (alpha * nSol0 + beta) % m !== 0) {
			throw new Error('Failed to solve linear sequence congruence');
		}
		// Smallest n >= 10 such that m | u_n
		let nMinGe10 = nSol0;
		while (nMinGe10 < 10) nMinGe10 += m;
		if ((alpha * nMinGe10 + beta) % m !== 0) {
			throw new Error('nMinGe10 verification failed');
		}

		// Link power cycle and sequence: check u_{expRem} or remainder of u_n when n = expRem
		const uExprK = `${alpha}n + ${beta}`;
		const uExprT = `${alpha} n + ${beta}`;
		const sExprK = `(n + 1)(${linearKatex(halfAlpha, beta, 'n')})`;
		const sExprT = `(n + 1)(${linearTypst(halfAlpha, beta, 'n')})`;

		const cycleT = cycle.map((r, k) => `$${a}^${k} equiv ${r} [${m}]$`).join('، ');
		const cycleK = cycle.map((r, k) => `$${a}^{${k}} \\equiv ${r} \\pmod{${m}}$`).join('، ');

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${u5}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `في مسألة إدماجية، نعتبر المتتالية الحسابية $(u_n)_{n \\in \\mathbb{N}}$ المعرفة بحدها العام $u_n = ${uExprK}$ . احسب قيمة الحد $u_5$ :`,
				questionTextAr: `احسب $u_5$ حيث $u_n = ${uExprK}$ :`,
				questionData: { answer: u5, displayTemplate: 'u_5 = ?', variables: [], tolerance: 0 },
				explanation: `بالتعويض $n = 5$ نجد $u_5 = ${alpha}(5) + ${beta} = ${u5}$ .`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `n = ${m}k + ${nSol0}`;
			const correct = `$n = ${m}k + ${nSol0}$ ($k \\in \\mathbb{N}$)`;
			const alt1 = (nSol0 + 1) % m;
			const alt2 = (nSol0 + 2) % m;
			const mcq = buildUniqueMcqOptions(
				correct,
				[
					{
						text: `$n = ${m}k + ${alt1}$ ($k \\in \\mathbb{N}$)`,
						diagnosticFeedback: `جرّب $n = ${alt1}$ : $u_{${alt1}} = ${alpha * alt1 + beta}$ لا يقبل القسمة على $${m}$ !`
					},
					{
						text: `$n = ${m}k + ${alt2}$ ($k \\in \\mathbb{N}$)`,
						diagnosticFeedback: `جرّب $n = ${alt2}$ : $u_{${alt2}} = ${alpha * alt2 + beta}$ لا يقبل القسمة على $${m}$ !`
					},
					{
						text: `$n = ${alpha}k + ${nSol0}$ ($k \\in \\mathbb{N}$)`,
						diagnosticFeedback: `الترديد هو $${m}$ وليس أساس المتتالية $${alpha}$ !`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `نعتبر المتتالية $(u_n)_{n \\in \\mathbb{N}}$ المعرفة بـ $u_n = ${uExprK}$ . ما هي جميع قيم العدد الطبيعي $n$ التي تجعل الحد $u_n$ قابلاً للقسمة على $${m}$ ؟`,
				questionTextAr: `عيّن قيم $n \\in \\mathbb{N}$ التي يحقق فيها $u_n \\equiv 0 \\pmod{${m}}$ :`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `$${uExprK} \\equiv 0 \\pmod{${m}}$ . باختبار بواقي $n \\in \\{0, \\dots, ${m - 1}\\}$ بترديد $${m}$ نجد الحل الوحيد $n \\equiv ${nSol0} \\pmod{${m}}$ ، أي $n = ${m}k + ${nSol0}$ ($k \\in \\mathbb{N}$).`
			};
		} else {
			finalAnswer = `${nMinGe10}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر المتتالية الحسابية $u_n = ${uExprK}$ . ما هو أصغر عدد طبيعي $n \\ge 10$ يجعل الحد $u_n$ قابلاً للقسمة على $${m}$ ؟`,
				questionTextAr: `أوجد أصغر $n \\ge 10$ يحقق $${m} \\mid (${uExprK})$ :`,
				questionData: { answer: nMinGe10, displayTemplate: 'n = ?', variables: [], tolerance: 0 },
				explanation: `نحل $${uExprK} \\equiv 0 \\pmod{${m}}$ فنجد $n = ${m}k + ${nSol0}$ . بتعويض $k$ نجد أول قيمة تحقق $n \\ge 10$ هي $n = ${nMinGe10}$ (حيث $u_{${nMinGe10}} = ${alpha * nMinGe10 + beta} = ${m} \\times ${Math.floor((alpha * nMinGe10 + beta) / m)}$).`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			customTitle: 'مسألة إدماجية نموذجية — الفصل الأول',
			instruction: `تربط هذه المسألة بين الموافقات بترديد $${m}$ ودراسة متتالية حسابية من نمط البكالوريا.`,
			content: [
				{
					type: 'text',
					content: `*الجزء الأول (3 نقاط): الموافقات*\n1) ادرس تبعاً لقيم العدد الطبيعي $n$ بواقي قسمة $${a}^n$ على $${m}$ .\n2) تحقّق أن $${yearA} equiv ${a} [${m}]$ ، ثم استنتج باقي قسمة $${yearA}^(${expE})$ على $${m}$ .`,
					answer: `*الجزء الأول:*\n1) حساب البواقي بترديد $${m}$ :\n${cycleT} ، ثم $${a}^${period} equiv 1 [${m}]$ . فالدور هو $p = ${period}$ .\n2) لدينا $${yearA} = ${m} times ${Math.floor(yearA / m)} + ${a}$ إذن $${yearA} equiv ${a} [${m}]$ .\nنقسم الأس على الدور $${period}$ : $${expE} = ${period} times ${Math.floor(expE / period)} + ${expRem}$ .\nومنه $${yearA}^(${expE}) equiv ${a}^(${expRem}) equiv ${powRem} [${m}]$ .`,
					mark: '3'
				},
				{
					type: 'text',
					content: `*الجزء الثاني (4 نقاط): المتتالية الحسابية وقابلية القسمة*\nنعتبر المتتالية العددية $(u_n)_(n in bb(N))$ المعرفة بعبارة حدها العام: $u_n = ${uExprT}$ .\n1) بيّن أن $(u_n)$ متتالية حسابية يُطلب تعيين أساسها $r$ وحدّها الأول $u_0$ ، ثم احسب $u_5$ .\n2) احسب بدلالة $n$ المجموع $S_n = u_0 + u_1 + dots + u_n$ ، ثم استنتج قيمة $S_4$ .\n3) عيّن قيم العدد الطبيعي $n$ التي يكون من أجلها $u_n$ قابلاً للقسمة على $${m}$ ، ثم استنتج أصغر قيمة لـ $n >= 10$ تحقق ذلك.`,
					answer: `*الجزء الثاني:*\n1) لدينا $u_(n+1) - u_n = (${alpha}(n + 1) + ${beta}) - (${uExprT}) = ${alpha}$ ثابت، إذن $(u_n)$ متتالية حسابية أساسها $r = ${alpha}$ وحدها الأول $u_0 = ${u0}$ ، و $u_5 = ${u5}$ .\n2) $S_n = frac(n + 1, 2)(u_0 + u_n) = frac(n + 1, 2)(${alpha} n + ${2 * beta}) = ${sExprT}$ ، ومنه $S_4 = ${s4}$ .\n3) $u_n equiv 0 [${m}] arrow.l.r.double ${uExprT} equiv 0 [${m}]$ . باختبار بواقي $n in {0, ..., ${m - 1}}$ نجد $n equiv ${nSol0} [${m}]$ ، أي $n = ${m} k + ${nSol0}$ ($k in bb(N)$).\nأصغر قيمة لـ $n >= 10$ هي $n = ${nMinGe10}$ .`,
					mark: '4'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_lp',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`في الجزء الأول، ابحث عن دور بواقي $${a}^n$ بترديد $${m}$ ثم اقسم الأس $${expE}$ على الدور.`,
				`لإثبات أن $(u_n)$ حسابية، احسب الفرق $u_{n+1} - u_n$ وتأكد أنه عدد ثابت مستقل عن $n$ .`,
				`لحل $${uExprK} \\equiv 0 \\pmod{${m}}$ عوّض قيم $n \\in \\{0, 1, \\dots, ${m - 1}\\}$ لاكتشاف الباقي الموافق.`
			],
			solutionStepsAr: [
				`دورية القوى بترديد $${m}$ : ${cycleK} (الدور $${period}$) ومنه $${yearA}^{${expE}} \\equiv ${powRem} \\pmod{${m}}$ .`,
				`المتتالية حسابية أساسها $r = ${alpha}$ وحدها الأول $u_0 = ${u0}$ ، والمجموع $S_n = ${sExprK}$ .`,
				`قابلية القسمة: $u_n \\equiv 0 \\pmod{${m}} \\iff n = ${m}k + ${nSol0}$ ، وأصغر قيمة $\\ge 10$ هي $n = ${nMinGe10}$ .`
			],
			finalAnswer
		};
	}
};

export const SHARED_TEMPLATES_3AS_LIT_T1: ParameterizedTemplate[] = [
	tplEuclideanDivisibility,
	tplCongruenceProperties,
	tplPowerCyclesEquations,
	tplArithmeticSequence,
	tplGeometricSequence,
	tplT1IntegrationArithSeq
];
