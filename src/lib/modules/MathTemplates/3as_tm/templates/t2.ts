import type { ExerciseBlock } from '../../../SujetBuilder/types';
import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate } from '../../types';
import { adaptTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, gcd, SeededRng } from '../../rng';
import { SHARED_TEMPLATES_3AS_T2 } from '../../secondary_shared_3as/templates/t2';

// ═══════════════════════════════════════════════════════════════════════════════
// 3AS Technique-Mathématique — Trimester 2 (6 templates)
//   Bézout/Gauss/Diophantine + 4 adapted domain exercises + 1 BAC synthesis (7 pts)
// Dual syntax: KaTeX for quiz / hints / steps, pure Typst math for sujetExercise.
// Western digits 0-9 only. No Fermat's little theorem, no direct plane similitudes.
// ═══════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Adapted shared templates (exact 3as_tm lessonIds)
// ═══════════════════════════════════════════════════════════════════════════════

function adaptShared(index: number, curriculumLessonId: string): ParameterizedTemplate {
	const adapted = adaptTemplateForTrack(SHARED_TEMPLATES_3AS_T2[index], '3as_tm');
	return { ...adapted, curriculumLessonId };
}

export const tpl3asTmT2CountingRandomVar: ParameterizedTemplate = adaptShared(
	0,
	'lesson_3as_tm_t2_counting_combinatorics_random_variables'
);

export const tpl3asTmT2CondProbBinomial: ParameterizedTemplate = adaptShared(
	1,
	'lesson_3as_tm_t2_conditional_probability_binomial_law'
);

export const tpl3asTmT2ComplexEquations: ParameterizedTemplate = adaptShared(
	2,
	'lesson_3as_tm_t2_complex_algebraic_equations_forms'
);

export const tpl3asTmT2PrimitiveDiffEq: ParameterizedTemplate = adaptShared(
	4,
	'lesson_3as_tm_t2_primitive_functions'
);

export const tpl3asTmT2BacSynthesis: ParameterizedTemplate = adaptShared(
	5,
	'lesson_3as_tm_t2_integration'
);

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Stream-exclusive: Bézout, Gauss & linear Diophantine equations ax + by = c
// ═══════════════════════════════════════════════════════════════════════════════

interface EuclidRow {
	q: number;
	r: number;
	s: number;
	t: number;
}

/** Extended Euclid table: every row satisfies r = a*s + b*t. Last row has r = 0. */
function extendedEuclid(a: number, b: number): { rows: EuclidRow[]; g: number; u: number; v: number } {
	const rows: EuclidRow[] = [
		{ q: 0, r: a, s: 1, t: 0 },
		{ q: 0, r: b, s: 0, t: 1 }
	];
	while (rows[rows.length - 1].r !== 0) {
		const prev = rows[rows.length - 2];
		const cur = rows[rows.length - 1];
		const q = Math.floor(prev.r / cur.r);
		rows.push({ q, r: prev.r - q * cur.r, s: prev.s - q * cur.s, t: prev.t - q * cur.t });
	}
	const last = rows[rows.length - 2];
	return { rows, g: last.r, u: last.s, v: last.t };
}

function euclidLinesTypst(rows: EuclidRow[]): string {
	const lines: string[] = [];
	for (let i = 2; i < rows.length; i++) {
		lines.push(`$${rows[i - 2].r} = ${rows[i - 1].r} times ${rows[i].q} + ${rows[i].r}$`);
	}
	return lines.join('\n');
}

function bezoutRowsTypst(rows: EuclidRow[], a: number, b: number): string {
	const lines: string[] = [];
	for (let i = 2; i < rows.length - 1; i++) {
		lines.push(`$${rows[i].r} = ${a} times (${rows[i].s}) + ${b} times (${rows[i].t})$`);
	}
	return lines.join('\n');
}

function euclidLinesKatex(rows: EuclidRow[]): string {
	const parts: string[] = [];
	for (let i = 2; i < rows.length; i++) {
		parts.push(`${rows[i - 2].r} = ${rows[i - 1].r} \\times ${rows[i].q} + ${rows[i].r}`);
	}
	return parts.join(' ;\\ ');
}

function posMod(n: number, m: number): number {
	return ((n % m) + m) % m;
}

function coprimePair(rng: SeededRng, aMin: number, aMax: number, bMin: number): [number, number] {
	for (let guard = 0; guard < 500; guard++) {
		const a = rng.int(aMin, aMax);
		const b = rng.int(bMin, a - 1);
		if (b >= bMin && gcd(a, b) === 1 && a % b !== 0) return [a, b];
	}
	return [aMax, aMax - 1];
}

export interface DiophantineParams {
	level: 'easy' | 'medium' | 'hard';
	/** coefficients of (E): a x + b y = c, with a > b > 0 */
	a: number;
	b: number;
	c: number;
	/** d = PGCD(a, b) and the reduced equation aR x + bR y = cR */
	d: number;
	aR: number;
	bR: number;
	cR: number;
	/** Bézout coefficients: aR*u + bR*v = 1 */
	u: number;
	v: number;
	/** particular solution of (E) with 0 <= x0 < bR */
	x0: number;
	y0: number;
	/** all solutions in N^2 */
	naturalSolutions: [number, number][];
}

/** Deterministic parameter builder (exported so tests can replay the exact instance). */
export function diophantineParams(seed: number, difficulty: Difficulty = 'medium'): DiophantineParams {
	const rng = new SeededRng(seed);

	let d = 1;
	let aR: number;
	let bR: number;
	if (difficulty === 'easy') {
		[aR, bR] = coprimePair(rng, 13, 47, 5);
	} else if (difficulty === 'medium') {
		[aR, bR] = coprimePair(rng, 7, 19, 3);
	} else {
		d = rng.int(2, 5);
		[aR, bR] = coprimePair(rng, 7, 17, 3);
	}
	const a = d * aR;
	const b = d * bR;

	const { u, v } = extendedEuclid(aR, bR);
	let x0: number;
	let y0: number;
	let cR: number;
	if (difficulty === 'easy') {
		// (E): a x + b y = 1 → modular inverse of a modulo b
		cR = 1;
		x0 = posMod(cR * u, bR);
		y0 = (cR - aR * x0) / bR;
	} else {
		const m = rng.int(2, 4);
		const xs = rng.int(1, bR - 1);
		const rest = rng.int(0, aR - 1);
		const ys = aR * (m - 1) + rest;
		cR = aR * xs + bR * ys;
		x0 = posMod(cR * u, bR);
		y0 = (cR - aR * x0) / bR;
	}
	const c = d * cR;

	const naturalSolutions: [number, number][] = [];
	for (let x = 0; x * a <= c; x++) {
		const rem = c - a * x;
		if (rem % b === 0) naturalSolutions.push([x, rem / b]);
	}
	return { level: difficulty, a, b, c, d, aR, bR, cR, u, v, x0, y0, naturalSolutions };
}

function pairText(x: number, y: number): string {
	return `$(${x}, ${y})$`;
}

export const tpl3asTmT2BezoutGaussDiophantine: ParameterizedTemplate = {
	id: 'tpl_3as_tm_t2_bezout_gauss_diophantine',
	grade: '3as_tm',
	trimesterId: 't2',
	domain: 'arithmetic_z',
	titleAr: 'مبرهنتا بيزو وغوص والمعادلات الديوفانتية الخطية ax + by = c',
	curriculumLessonId: 'lesson_3as_tm_t2_primes_bezout_gauss_diophantine',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const P = diophantineParams(seed, difficulty);
		const { a, b, c, d, aR, bR, cR, u, v, x0, y0, naturalSolutions } = P;

		// Algebraic self-checks (Bézout identity and particular solution).
		if (aR * u + bR * v !== 1) throw new Error('Bezout identity failed');
		if (a * x0 + b * y0 !== c) throw new Error('Particular Diophantine solution failed');

		const euclid = extendedEuclid(a, b);
		const natCount = naturalSolutions.length;
		const natListTypst = naturalSolutions.map(([x, y]) => `$(${x}, ${y})$`).join('، ');
		const kMax = natCount - 1;

		// ─────────────────────────── EASY ───────────────────────────
		if (difficulty === 'easy') {
			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `نعتبر العددين الطبيعيين $a = ${a}$ و $b = ${b}$.`,
				content: [
					{
						type: 'text',
						content: `1) بتطبيق خوارزمية إقليدس، احسب $upright("PGCD")(${a}, ${b})$. ماذا تستنتج بالنسبة إلى العددين $a$ و $b$؟`,
						answer: `1) خوارزمية إقليدس:\n${euclidLinesTypst(euclid.rows)}\nآخر باقٍ غير معدوم هو $${euclid.g}$، إذن $upright("PGCD")(${a}, ${b}) = ${euclid.g}$ وهما أوليان فيما بينهما.`,
						mark: '1.25'
					},
					{
						type: 'text',
						content: `2) عيّن ثنائية $(u, v)$ من $bb(Z)^2$ تحقق $${a} u + ${b} v = 1$ (مبرهنة بيزو).`,
						answer: `2) نعبّر عن كل باقٍ بدلالة $${a}$ و $${b}$ (صعوداً من خوارزمية إقليدس):\n${bezoutRowsTypst(euclid.rows, a, b)}\nومنه $${a} times (${u}) + ${b} times (${v}) = ${a * u} + (${b * v}) = 1$ فالثنائية $(u, v) = (${u}, ${v})$ تناسب.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) استنتج العدد الصحيح $x_0$ من المجال $[1, ${b - 1}]$ الذي يحقق $${a} x_0 equiv 1 quad (mod ${b})$.`,
						answer: `3) من $${a} u + ${b} v = 1$ نجد $${a} u equiv 1 quad (mod ${b})$ أي $${a} times (${u}) equiv 1 quad (mod ${b})$.\nنختار الممثل الموجب: $x_0 = ${u} + ${b} k$ مع $0 < x_0 < ${b}$ فنجد $x_0 = ${x0}$.\nتحقق: $${a} times ${x0} = ${a * x0} = ${b} times ${(a * x0 - 1) / b} + 1$، إذن $${a} times ${x0} equiv 1 quad (mod ${b})$.`,
						mark: '1.25'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_tm',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: `$${a}$ و $${b}$ أوليان فيما بينهما. ما هو العدد الصحيح $x$ من المجال $[1, ${b - 1}]$ الذي يحقق $${a}x \\equiv 1 \\pmod{${b}}$؟`,
					questionTextAr: `أوجد مقلوب $${a}$ بالنسبة إلى $${b}$: $${a}x \\equiv 1 \\pmod{${b}}$ مع $1 \\le x \\le ${b - 1}$.`,
					questionData: {
						answer: x0,
						displayTemplate: `${a}x ≡ 1 [${b}]`,
						variables: [],
						tolerance: 0
					},
					explanation: `بمبرهنة بيزو $${a} \\times (${u}) + ${b} \\times (${v}) = 1$ ومنه $${a} \\times ${x0} = ${a * x0} = ${b} \\times ${(a * x0 - 1) / b} + 1$ أي $x = ${x0}$.`
				},
				sujetExercise,
				hints: [
					`خوارزمية إقليدس: $${euclidLinesKatex(euclid.rows)}$.`,
					`مبرهنة بيزو: $\\text{PGCD}(a, b) = 1 \\iff \\exists (u, v) \\in \\mathbb{Z}^2 : au + bv = 1$.`,
					`إذا كان $au + bv = 1$ فإن $au \\equiv 1 \\pmod{b}$؛ خذ باقي القسمة الموجب لـ $u$ على $b$.`
				],
				solutionStepsAr: [
					`$\\text{PGCD}(${a}, ${b}) = ${euclid.g}$.`,
					`$${a} \\times (${u}) + ${b} \\times (${v}) = 1$ (بيزو).`,
					`$x_0 = ${x0}$ لأن $${a} \\times ${x0} \\equiv 1 \\pmod{${b}}$ و $0 < ${x0} < ${b}$.`
				],
				finalAnswer: `x = ${x0}`
			};
		}

		// Shared general solution text for medium / hard
		const xp = cR * u;
		const yp = cR * v;
		const shiftK = (xp - x0) / bR;

		const generalTypst = `(x, y) = (${x0} + ${bR} k, ${y0} - ${aR} k)`;

		// ─────────────────────────── MEDIUM ───────────────────────────
		if (difficulty === 'medium') {
			const cands: [number, number][] = [
				[y0, x0],
				[-x0, y0],
				[x0, -y0],
				[x0 + 1, y0],
				[x0, y0 + 1],
				[x0 - 1, y0 + 1],
				[x0 + 2, y0 - 1]
			];
			const wrongPairs = cands
				.filter(([x, y]) => a * x + b * y !== c)
				.filter(([x, y], i, arr) => arr.findIndex(([x2, y2]) => x2 === x && y2 === y) === i)
				.slice(0, 3);
			const mcq = buildUniqueMcqOptions(
				pairText(x0, y0),
				wrongPairs.map(([x, y], i) => ({
					text: pairText(x, y),
					diagnosticFeedback:
						i === 0
							? 'تحقق بالتعويض في المعادلة: هذه الثنائية لا تحقق $ax + by = c$ (ربما بدلت ترتيب $x$ و $y$ أو أخطأت في الإشارة).'
							: 'عوّض الثنائية في $ax + by$ وقارن بالطرف الثاني $c$؛ الثنائية الصحيحة تحقق المساواة تماماً.'
				})),
				rng
			);

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `نعتبر في $bb(Z)^2$ المعادلة $(E): ${a} x + ${b} y = ${c}$.`,
				content: [
					{
						type: 'text',
						content: `1) بيّن أن $upright("PGCD")(${a}, ${b}) = 1$ ثم عيّن ثنائية $(u, v)$ تحقق $${a} u + ${b} v = 1$.`,
						answer: `1) خوارزمية إقليدس:\n${euclidLinesTypst(euclid.rows)}\nآخر باقٍ غير معدوم هو $${euclid.g}$ إذن $upright("PGCD")(${a}, ${b}) = 1$.\nعلاقات بيزو الصاعدة:\n${bezoutRowsTypst(euclid.rows, a, b)}\nومنه $${a} times (${u}) + ${b} times (${v}) = 1$.`,
						mark: '1.25'
					},
					{
						type: 'text',
						content: `2) استنتج حلاً خاصاً $(x_0, y_0)$ للمعادلة $(E)$ حيث $0 <= x_0 < ${b}$.`,
						answer: `2) بضرب العلاقة السابقة في $${c}$: $${a} times (${xp}) + ${b} times (${yp}) = ${c}$، فالثنائية $(${xp}, ${yp})$ حل خاص.\nنقسم $${xp}$ على $${b}$: $${xp} = ${b} times (${shiftK}) + ${x0}$ فنأخذ $x_0 = ${x0}$ و $y_0 = ${yp} + ${a} times (${shiftK}) = ${y0}$.\nتحقق: $${a} times ${x0} + ${b} times ${y0} = ${a * x0} + ${b * y0} = ${c}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) باستعمال مبرهنة غوص، حل المعادلة $(E)$ في $bb(Z)^2$، ثم عيّن كل الثنائيات $(x, y)$ من $bb(N)^2$ حلول $(E)$.`,
						answer: `3) إذا كان $(x, y)$ حلاً فإن $${a} x + ${b} y = ${a} ${x0} + ${b} ${y0}$ أي $${a} (x - ${x0}) = ${b} (${y0} - y)$.\nإذن $${b} divides ${a} (x - ${x0})$ وبما أن $upright("PGCD")(${a}, ${b}) = 1$ فحسب مبرهنة غوص $${b} divides (x - ${x0})$: $x = ${x0} + ${b} k$ مع $k in bb(Z)$، ثم $y = ${y0} - ${a} k$.\nالعكس: كل ثنائية $(${x0} + ${b} k, ${y0} - ${a} k)$ حل. مجموعة الحلول: $S = {${generalTypst} : k in bb(Z)}$.\nفي $bb(N)^2$: $x >= 0 <==> k >= 0$ (لأن $0 <= ${x0} < ${b}$) و $y >= 0 <==> k <= ${Math.floor(y0 / aR)}$.\nإذن $k in {0, 1, ..., ${kMax}}$ والحلول: ${natListTypst}.`,
						mark: '1.75'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_tm',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `نعتبر المعادلة $(E): ${a}x + ${b}y = ${c}$ في $\\mathbb{Z}^2$. أي ثنائية $(x_0, y_0)$ حل للمعادلة $(E)$ مع $0 \\le x_0 < ${b}$؟`,
					questionTextAr: `ما هو الحل الخاص $(x_0, y_0)$ للمعادلة $${a}x + ${b}y = ${c}$ حيث $0 \\le x_0 < ${b}$؟`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `$${a} \\times ${x0} + ${b} \\times ${y0} = ${a * x0} + ${b * y0} = ${c}$ و $0 \\le ${x0} < ${b}$.`
				},
				sujetExercise,
				hints: [
					`خوارزمية إقليدس: $${euclidLinesKatex(euclid.rows)}$ ثم عبّر عن $1$ بدلالة $${a}$ و $${b}$.`,
					`إذا كان $au + bv = 1$ فإن $(cu, cv)$ حل خاص للمعادلة $ax + by = c$.`,
					`مبرهنة غوص: إذا كان $a \\mid bc$ و $\\text{PGCD}(a, b) = 1$ فإن $a \\mid c$.`
				],
				solutionStepsAr: [
					`$${a} \\times (${u}) + ${b} \\times (${v}) = 1$ ومنه $(${xp}, ${yp})$ حل خاص لـ $(E)$.`,
					`$(x_0, y_0) = (${x0}, ${y0})$ حيث $${a} \\times ${x0} + ${b} \\times ${y0} = ${c}$.`,
					`$(x, y) = (${x0} + ${b}k,\\ ${y0} - ${a}k)$ مع $k \\in \\mathbb{Z}$؛ وفي $\\mathbb{N}^2$: $k \\in \\{0, \\ldots, ${kMax}\\}$ أي ${natCount} حلاً.`
				],
				finalAnswer: `(x0, y0) = (${x0}, ${y0})`
			};
		}

		// ─────────────────────────── HARD ───────────────────────────
		const cNo = c + 1;
		const hardSujet: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر في $bb(Z)^2$ المعادلتين $(E): ${a} x + ${b} y = ${c}$ و $(E'): ${a} x + ${b} y = ${cNo}$.`,
			content: [
				{
					type: 'text',
					content: `1) احسب $d = upright("PGCD")(${a}, ${b})$ بخوارزمية إقليدس، ثم بيّن أن المعادلة $(E')$ لا تقبل أي حل في $bb(Z)^2$.`,
					answer: `1) خوارزمية إقليدس:\n${euclidLinesTypst(euclid.rows)}\nآخر باقٍ غير معدوم $d = ${euclid.g}$.\nلو وُجد حل $(x, y)$ للمعادلة $(E')$ لكان $d$ يقسم $${a} x + ${b} y = ${cNo}$ لأنه يقسم $${a}$ و $${b}$؛ لكن $${cNo} = ${d} times ${cR} + 1$ ليس مضاعفاً لـ $${d}$. تناقض: $(E')$ بلا حلول.`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `2) بيّن أن $(E)$ تكافئ المعادلة $(E''): ${aR} x + ${bR} y = ${cR}$ ثم عيّن حلاً خاصاً $(x_0, y_0)$ لها حيث $0 <= x_0 < ${bR}$.`,
					answer: `2) بما أن $${a} = ${d} times ${aR}$ و $${b} = ${d} times ${bR}$ و $${c} = ${d} times ${cR}$ فبالقسمة على $${d} != 0$: $(E) <==> (E'')$ و $upright("PGCD")(${aR}, ${bR}) = 1$.\nبيزو: $${aR} times (${u}) + ${bR} times (${v}) = 1$ فـ $(${cR * u}, ${cR * v})$ حل خاص.\nباقي قسمة $${cR * u}$ على $${bR}$ هو $${x0}$، إذن $x_0 = ${x0}$ و $y_0 = ${y0}$.\nتحقق: $${aR} times ${x0} + ${bR} times ${y0} = ${aR * x0 + bR * y0} = ${cR}$.`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `3) حل المعادلة $(E)$ في $bb(Z)^2$ باستعمال مبرهنة غوص، ثم عيّن عدد الثنائيات $(x, y)$ من $bb(N)^2$ حلول $(E)$ واكتبها.`,
					answer: `3) $(E'') : ${aR} (x - ${x0}) = ${bR} (${y0} - y)$ إذن $${bR} divides ${aR} (x - ${x0})$ و $upright("PGCD")(${aR}, ${bR}) = 1$، فحسب مبرهنة غوص $${bR} divides (x - ${x0})$.\nإذن $x = ${x0} + ${bR} k$ و $y = ${y0} - ${aR} k$ مع $k in bb(Z)$ (والعكس صحيح).\nفي $bb(N)^2$: $k >= 0$ و $k <= ${Math.floor(y0 / aR)}$ إذن ${natCount} حلاً: ${natListTypst}.`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_tm',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `نعتبر المعادلة $(E): ${a}x + ${b}y = ${c}$. كم ثنائية $(x, y)$ من $\\mathbb{N}^2$ تحقق $(E)$؟`,
				questionTextAr: `ما هو عدد حلول $${a}x + ${b}y = ${c}$ في $\\mathbb{N}^2$؟`,
				questionData: {
					answer: natCount,
					displayTemplate: `Card(S ∩ N²) = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `بعد الاختزال بـ $${d}$: $${aR}x + ${bR}y = ${cR}$ وحلها العام $(${x0} + ${bR}k,\\ ${y0} - ${aR}k)$؛ الشرطان $x, y \\ge 0$ يعطيان $0 \\le k \\le ${kMax}$ أي ${natCount} حلاً.`
			},
			sujetExercise: hardSujet,
			hints: [
				`إذا كان $d = \\text{PGCD}(a, b)$ فإن $d \\mid ax + by$ من أجل كل $(x, y) \\in \\mathbb{Z}^2$.`,
				`اقسم المعادلة على $d$ للحصول على معادلة معاملاتها أولية فيما بينها ثم طبّق بيزو.`,
				`من $a'(x - x_0) = b'(y_0 - y)$ مع $\\text{PGCD}(a', b') = 1$ استعمل مبرهنة غوص لاستنتاج $b' \\mid x - x_0$.`
			],
			solutionStepsAr: [
				`$d = \\text{PGCD}(${a}, ${b}) = ${d}$ و $${cNo} \\not\\equiv 0 \\pmod{${d}}$ إذن $(E')$ بلا حلول.`,
				`$(E) \\iff ${aR}x + ${bR}y = ${cR}$ وحل خاص $(x_0, y_0) = (${x0}, ${y0})$ يحقق $${aR} \\times ${x0} + ${bR} \\times ${y0} = ${cR}$.`,
				`$(x, y) = (${x0} + ${bR}k,\\ ${y0} - ${aR}k)$ ، $k \\in \\{0, \\ldots, ${kMax}\\}$ في $\\mathbb{N}^2$: ${natCount} حلاً.`
			],
			finalAnswer: `d = ${d}; (x0, y0) = (${x0}, ${y0}); ${natCount} natural solutions`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 2 Parameterized Templates for 3AS Technique-Mathématique
// ═══════════════════════════════════════════════════════════════════════════════

export const TEMPLATES_3AS_TM_T2: ParameterizedTemplate[] = [
	tpl3asTmT2BezoutGaussDiophantine,
	tpl3asTmT2CountingRandomVar,
	tpl3asTmT2CondProbBinomial,
	tpl3asTmT2ComplexEquations,
	tpl3asTmT2PrimitiveDiffEq,
	tpl3asTmT2BacSynthesis
];
