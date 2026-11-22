import type { ExerciseBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng, simplifyFraction } from '../../rng';
import { saveSvgAsset } from '../../svg-helpers';
import {
	svgCobwebSequencePlot,
	svgFunctionCurvePlot,
	svgVariationTable
} from '../../svg-secondary';

// ═══════════════════════════════════════════════════════════════════════════════
// Dual Syntax Formatters & Verification Helpers — 3AS GE (BAC) Trimester 1
// Strictly Western digits 0-9; 100% Halal economic contexts.
// ═══════════════════════════════════════════════════════════════════════════════

function fracKatex(n: number, d: number): string {
	const [sn, sd] = simplifyFraction(n, d);
	if (sd === 1) return `${sn}`;
	return sn < 0 ? `-\\frac{${Math.abs(sn)}}{${sd}}` : `\\frac{${sn}}{${sd}}`;
}

function fracTypst(n: number, d: number): string {
	const [sn, sd] = simplifyFraction(n, d);
	if (sd === 1) return `${sn}`;
	return sn < 0 ? `-frac(${Math.abs(sn)}, ${sd})` : `frac(${sn}, ${sd})`;
}

function linearKatex(a: number, b: number, v = 'x'): string {
	let head = '';
	if (a === 1) head = v;
	else if (a === -1) head = `-${v}`;
	else if (a !== 0) head = `${a}${v}`;

	if (head === '') return `${b}`;
	if (b === 0) return head;
	return b > 0 ? `${head} + ${b}` : `${head} - ${Math.abs(b)}`;
}

function linearTypst(a: number, b: number, v = 'x'): string {
	let head = '';
	if (a === 1) head = v;
	else if (a === -1) head = `-${v}`;
	else if (a !== 0) head = `${a} ${v}`;

	if (head === '') return `${b}`;
	if (b === 0) return head;
	return b > 0 ? `${head} + ${b}` : `${head} - ${Math.abs(b)}`;
}

function poly2Katex(a: number, b: number, c: number, v = 'x'): string {
	const parts: string[] = [];
	if (a !== 0) {
		if (a === 1) parts.push(`${v}^2`);
		else if (a === -1) parts.push(`-${v}^2`);
		else parts.push(`${a}${v}^2`);
	}
	if (b !== 0) {
		const absB = Math.abs(b);
		const term = absB === 1 ? v : `${absB}${v}`;
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

function poly2Typst(a: number, b: number, c: number, v = 'x'): string {
	const parts: string[] = [];
	if (a !== 0) {
		if (a === 1) parts.push(`${v}^2`);
		else if (a === -1) parts.push(`-${v}^2`);
		else parts.push(`${a} ${v}^2`);
	}
	if (b !== 0) {
		const absB = Math.abs(b);
		const term = absB === 1 ? v : `${absB} ${v}`;
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

function poly3Katex(a: number, b: number, c: number, d: number, v = 'x'): string {
	const parts: string[] = [];
	if (a !== 0) {
		if (a === 1) parts.push(`${v}^3`);
		else if (a === -1) parts.push(`-${v}^3`);
		else parts.push(`${a}${v}^3`);
	}
	if (b !== 0) {
		const absB = Math.abs(b);
		const term = absB === 1 ? `${v}^2` : `${absB}${v}^2`;
		if (parts.length === 0) parts.push(b < 0 ? `-${term}` : term);
		else parts.push(b < 0 ? `- ${term}` : `+ ${term}`);
	}
	if (c !== 0) {
		const absC = Math.abs(c);
		const term = absC === 1 ? v : `${absC}${v}`;
		if (parts.length === 0) parts.push(c < 0 ? `-${term}` : term);
		else parts.push(c < 0 ? `- ${term}` : `+ ${term}`);
	}
	if (d !== 0) {
		const absD = Math.abs(d);
		if (parts.length === 0) parts.push(`${d}`);
		else parts.push(d < 0 ? `- ${absD}` : `+ ${absD}`);
	}
	return parts.length === 0 ? '0' : parts.join(' ');
}

function poly3Typst(a: number, b: number, c: number, d: number, v = 'x'): string {
	const parts: string[] = [];
	if (a !== 0) {
		if (a === 1) parts.push(`${v}^3`);
		else if (a === -1) parts.push(`-${v}^3`);
		else parts.push(`${a} ${v}^3`);
	}
	if (b !== 0) {
		const absB = Math.abs(b);
		const term = absB === 1 ? `${v}^2` : `${absB} ${v}^2`;
		if (parts.length === 0) parts.push(b < 0 ? `-${term}` : term);
		else parts.push(b < 0 ? `- ${term}` : `+ ${term}`);
	}
	if (c !== 0) {
		const absC = Math.abs(c);
		const term = absC === 1 ? v : `${absC} ${v}`;
		if (parts.length === 0) parts.push(c < 0 ? `-${term}` : term);
		else parts.push(c < 0 ? `- ${term}` : `+ ${term}`);
	}
	if (d !== 0) {
		const absD = Math.abs(d);
		if (parts.length === 0) parts.push(`${d}`);
		else parts.push(d < 0 ? `- ${absD}` : `+ ${absD}`);
	}
	return parts.length === 0 ? '0' : parts.join(' ');
}

function bisectRoot(fn: (x: number) => number, lo: number, hi: number): number {
	let a = lo;
	let b = hi;
	let fa = fn(a);
	if (fa * fn(b) >= 0) {
		throw new Error(`TVI bracket failure on [${lo}, ${hi}]`);
	}
	for (let i = 0; i < 60; i++) {
		const mid = 0.5 * (a + b);
		const fm = fn(mid);
		if (Math.abs(fm) < 1e-13) return mid;
		if (fa * fm < 0) b = mid;
		else {
			a = mid;
			fa = fm;
		}
	}
	return 0.5 * (a + b);
}

function assertCentralDiff(fn: (x: number) => number, fnP: (x: number) => number, pts: number[], tag: string): void {
	const h = 1e-6;
	for (const x of pts) {
		const ex = fnP(x);
		const ap = (fn(x + h) - fn(x - h)) / (2 * h);
		if (!Number.isFinite(ex) || !Number.isFinite(ap) || Math.abs(ex - ap) >= 1e-4) {
			throw new Error(`${tag} derivative mismatch at x=${x}`);
		}
	}
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Recurrence Sequences u_{n+1} = a u_n + b, Induction, Convergence & Sum
// ═══════════════════════════════════════════════════════════════════════════════

const tplRecurrenceSeqInduction: ParameterizedTemplate = {
	id: 'tpl_3as_ge_t1_recurrence_seq_induction',
	grade: '3as_ge',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'المتتاليات التراجعية u_{n+1} = a u_n + b: البرهان بالتراجع، المتتالية المساعدة والمجموع',
	curriculumLessonId: 'lesson_3as_ge_t1_induction_monotonicity_convergence',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		interface SeqConfig {
			pQ: number;
			dQ: number; // q = pQ / dQ in (0, 1)
			L: number;
			u0: number; // < L
		}

		const pool: SeqConfig[] =
			difficulty === 'easy'
				? [
						{ pQ: 1, dQ: 2, L: 8, u0: 2 },
						{ pQ: 1, dQ: 2, L: 10, u0: 4 },
						{ pQ: 1, dQ: 2, L: 6, u0: 0 },
						{ pQ: 1, dQ: 3, L: 9, u0: 3 }
					]
				: difficulty === 'medium'
					? [
							{ pQ: 2, dQ: 3, L: 12, u0: 3 },
							{ pQ: 3, dQ: 4, L: 16, u0: 4 },
							{ pQ: 1, dQ: 3, L: 15, u0: 6 },
							{ pQ: 2, dQ: 5, L: 15, u0: 5 }
						]
					: [
							{ pQ: 3, dQ: 4, L: 20, u0: 4 },
							{ pQ: 3, dQ: 5, L: 25, u0: 5 },
							{ pQ: 4, dQ: 5, L: 30, u0: 10 },
							{ pQ: 2, dQ: 3, L: 18, u0: 6 }
						];

		const cfg = rng.pick(pool);
		const { pQ, dQ, L, u0 } = cfg;
		const qFloat = pQ / dQ;
		const bSeq = Math.round(L * (1 - qFloat));
		const v0 = u0 - L; // < 0
		const u1 = roundTo(qFloat * u0 + bSeq, 4);
		const [u2Num, u2Den] = simplifyFraction(pQ * u1 + bSeq * dQ, dQ);
		const [sumCoeffNum, sumCoeffDen] = simplifyFraction(v0 * dQ, dQ - pQ);

		const qKatex = fracKatex(pQ, dQ);
		const qTypst = fracTypst(pQ, dQ);
		const unKatex = `${L} - ${Math.abs(v0)}\\left(${qKatex}\\right)^n`;
		const unTypst = `${L} - ${Math.abs(v0)} (${qTypst})^n`;
		const absSumCoeffK = fracKatex(Math.abs(sumCoeffNum), sumCoeffDen);
		const absSumCoeffT = fracTypst(Math.abs(sumCoeffNum), sumCoeffDen);
		const snKatex = `${L}(n + 1) - ${absSumCoeffK}\\left(1 - \\left(${qKatex}\\right)^{n+1}\\right)`;
		const snTypst = `${L}(n + 1) - ${absSumCoeffT}(1 - (${qTypst})^(n + 1))`;

		const cobSvg = svgCobwebSequencePlot({
			xMin: 0,
			xMax: L + 3,
			yMin: 0,
			yMax: L + 3,
			fn: (x) => qFloat * x + bSeq,
			u0,
			steps: 4,
			fixedPoint: L
		});
		const cobUrl = saveSvgAsset(`3as_ge_t1_seq_cob_${difficulty}_s${seed}`, cobSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${L}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر المتتالية التراجعية $(u_n)$ المعرفة بـ $u_0 = ${u0}$ و $u_{n+1} = ${qKatex} u_n + ${bSeq}$. احسب نهاية المتتالية $\\lim_{n \\to +\\infty} u_n$:`,
				questionTextAr: `احسب نهاية المتتالية $u_{n+1} = ${qKatex} u_n + ${bSeq}$ ($u_0 = ${u0}$):`,
				imageUrl: cobUrl,
				imageCaption: 'مخطط الدرج لتقارب المتتالية (u_n)',
				questionData: {
					answer: L,
					displayTemplate: 'lim u_n = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `النقطة الثابتة تحقق $\\ell = ${qKatex}\\ell + ${bSeq} \\implies \\ell = ${L}$. المتتالية $v_n = u_n - ${L}$ هندسية أساسها $${qKatex} \\in ]0; 1[$، إذن $\\lim_{n \\to +\\infty} u_n = ${L}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${v0}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `في المتتالية $(u_n)$ حيث $u_0 = ${u0}$ و $u_{n+1} = ${qKatex} u_n + ${bSeq}$، نضع $v_n = u_n - ${L}$. احسب قيمة الحد الأول $v_0$ للمتتالية الهندسية $(v_n)$:`,
				questionTextAr: `احسب الحد الأول $v_0 = u_0 - ${L}$:`,
				imageUrl: cobUrl,
				imageCaption: 'التمثيل البياني للحدود الأولى من (u_n)',
				questionData: {
					answer: v0,
					displayTemplate: 'v_0 = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `نعوض $n = 0$: $v_0 = u_0 - ${L} = ${u0} - ${L} = ${v0}$.`
			};
		} else {
			const wrongNTerms = `${L}n - ${absSumCoeffK}\\left(1 - \\left(${qKatex}\\right)^n\\right)`;
			const wrongPlus = `${L}(n + 1) + ${absSumCoeffK}\\left(1 - \\left(${qKatex}\\right)^{n+1}\\right)`;
			const wrongNoDen = `${L}(n + 1) - ${Math.abs(v0)}\\left(1 - \\left(${qKatex}\\right)^{n+1}\\right)`;

			const mcq = buildUniqueMcqOptions(
				`$S_n = ${snKatex}$`,
				[
					{
						text: `$S_n = ${wrongNTerms}$`,
						diagnosticFeedback: `عدد الحدود من $u_0$ إلى $u_n$ هو $(n + 1)$ حداً وليس $n$ حداً!`
					},
					{
						text: `$S_n = ${wrongPlus}$`,
						diagnosticFeedback: `أخطأت في إشارة الحد الأول $v_0 = ${v0} < 0$.`
					},
					{
						text: `$S_n = ${wrongNoDen}$`,
						diagnosticFeedback: `نسيت القسمة على $(1 - q)$ في قانون مجموع المتتالية الهندسية.`
					}
				],
				rng
			);
			finalAnswer = snKatex;
			quizQuestion = {
				type: 'mcq',
				questionText: `بما أن $u_n = ${unKatex}$ لكل $n \\in \\mathbb{N}$، ما هي عبارة المجموع $S_n = u_0 + u_1 + \\dots + u_n$ بدلالة $n$؟`,
				questionTextAr: `عيّن عبارة المجموع $S_n = u_0 + u_1 + \\dots + u_n$ بدلالة $n$:`,
				imageUrl: cobUrl,
				imageCaption: 'مخطط الدرج للمتتالية (u_n)',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نجمع $(n + 1)$ حداً: $\\sum_{k=0}^n ${L} = ${L}(n + 1)$ و $\\sum_{k=0}^n v_k = ${v0}\\frac{1 - (${qKatex})^{n+1}}{1 - ${qKatex}}$، ومنه $S_n = ${snKatex}$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر المتتالية العددية $(u_n)_(n in bb(N))$ المعرفة بحدها الأول $u_0 = ${u0}$ ومن أجل كل عدد طبيعي $n$:\n$u_(n+1) = ${qTypst} u_n + ${bSeq}$.`,
			content: [
				{
					type: 'columns',
					widths: ['1.4fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) احسب الحدين $u_1$ و $u_2$، ثم خمّن انطلاقاً من التمثيل البياني اتجاه تغير $(u_n)$ وتقاربها.\n2) برهن بالتراجع أنه من أجل كل $n in bb(N)$: $u_n < ${L}$.`,
							answer: `1) $u_1 = ${u1}$ و $u_2 = ${fracTypst(u2Num, u2Den)}$. نخمّن أن $(u_n)$ متزايدة تماماً ومتقاربة نحو $${L}$.\n2) البرهان بالتراجع على $P(n): u_n < ${L}$:\n- من أجل $n = 0$: $u_0 = ${u0} < ${L}$ صحيحة.\n- نفرض $u_n < ${L}$: بالضرب في $${qTypst} > 0$ وإضافة $${bSeq}$ نجد $u_(n+1) < ${qTypst}(${L}) + ${bSeq} = ${L}$. إذن $u_n < ${L}$ لكل $n in bb(N)$.`,
							mark: '1.5'
						},
						{
							type: 'image',
							src: cobUrl,
							caption: 'مخطط الدرج للحدود الأولى من (u_n)'
						}
					]
				},
				{
					type: 'text',
					content: `3) ادرس اتجاه تغير $(u_n)$ واستنتج أنها متقاربة.\n4) نضع $v_n = u_n - ${L}$. بيّن أن $(v_n)$ هندسية، اكتب $u_n$ بدلالة $n$ واحسب $lim_(n arrow.r +oo) u_n$ ثم $S_n = u_0 + u_1 + dots.c + u_n$.`,
					answer: `3) $u_(n+1) - u_n = -${fracTypst(dQ - pQ, dQ)}(u_n - ${L}) > 0$ لأن $u_n < ${L}$، فهي متزايدة تماماً ومحدودة من الأعلى بـ $${L}$، إذن متقاربة.\n4) $v_(n+1) = ${qTypst} u_n + ${bSeq} - ${L} = ${qTypst} v_n$، فـ $(v_n)$ هندسية أساسها $q = ${qTypst}$ وحدها الأول $v_0 = ${v0}$.\nومنه $u_n = ${unTypst}$، ونهايتها $lim_(n arrow.r +oo) u_n = ${L}$.\nالمجموع: $S_n = ${snTypst}$.`,
					mark: '2.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_ge',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`في البرهان بالتراجع على $u_n < ${L}$، تحقق من صحة $u_0 < ${L}$ ثم ابنِ المتباينة نحو $u_{n+1}$.`,
				`أثبت أن $v_{n+1} = ${qKatex} v_n$ بإخراج الأساس عاملاً مشتركاً.`,
				`عدد الحدود في المجموع $S_n = u_0 + \\dots + u_n$ هو $(n + 1)$ حداً.`
			],
			solutionStepsAr: [
				`البرهان بالتراجع على $u_n < ${L}$ وإثبات أن $(u_n)$ متزايدة تماماً ومتقاربة.`,
				`إثبات أن $v_n = u_n - ${L}$ هندسية أساسها $${qKatex}$ وحدها الأول $v_0 = ${v0}$.`,
				`عبارة الحد العام $u_n = ${unKatex}$ والنهاية $${L}$ والمجموع $S_n = ${snKatex}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Halal Economic Sequence Application (Production / Export Stabilization)
// ═══════════════════════════════════════════════════════════════════════════════

const tplEconomicSeqProduction: ParameterizedTemplate = {
	id: 'tpl_3as_ge_t1_economic_seq_production',
	grade: '3as_ge',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'تطبيق اقتصادي للمتتاليات التراجعية: تطور إنتاج مؤسسة وتحديد سنة بلوغ الهدف',
	curriculumLessonId: 'lesson_3as_ge_t1_arith_geom_recurrence_sequences',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		interface EconSeqConfig {
			q: number; // retention/multiplier 0.75 or 0.8 or 0.9
			dropPct: number; // (1 - q)*100
			cAdd: number; // new annual units added
			u0: number; // initial units
			L: number; // = cAdd / (1 - q)
			target: number; // < L
		}

		const pool: EconSeqConfig[] =
			difficulty === 'easy'
				? [
						{ q: 0.8, dropPct: 20, cAdd: 120, u0: 200, L: 600, target: 500 },
						{ q: 0.8, dropPct: 20, cAdd: 100, u0: 150, L: 500, target: 420 },
						{ q: 0.5, dropPct: 50, cAdd: 200, u0: 100, L: 400, target: 350 }
					]
				: difficulty === 'medium'
					? [
							{ q: 0.8, dropPct: 20, cAdd: 160, u0: 300, L: 800, target: 700 },
							{ q: 0.75, dropPct: 25, cAdd: 150, u0: 200, L: 600, target: 520 },
							{ q: 0.9, dropPct: 10, cAdd: 100, u0: 400, L: 1000, target: 850 }
						]
					: [
							{ q: 0.85, dropPct: 15, cAdd: 300, u0: 500, L: 2000, target: 1600 },
							{ q: 0.75, dropPct: 25, cAdd: 250, u0: 400, L: 1000, target: 900 },
							{ q: 0.9, dropPct: 10, cAdd: 150, u0: 600, L: 1500, target: 1300 }
						];

		const cfg = rng.pick(pool);
		const { q, dropPct, cAdd, u0, L, target } = cfg;
		const v0 = u0 - L; // < 0
		const u1 = roundTo(q * u0 + cAdd, 2);
		const u2 = roundTo(q * u1 + cAdd, 2);
		const ratioThresh = (L - target) / Math.abs(v0);
		const nTarget = Math.ceil(Math.log(ratioThresh) / Math.log(q));
		const targetYear = 2024 + nTarget;
		const sumCoeff = Math.round(Math.abs(v0) / (1 - q));

		const cobSvg = svgCobwebSequencePlot({
			xMin: 0,
			xMax: L * 1.1,
			yMin: 0,
			yMax: L * 1.1,
			fn: (x) => q * x + cAdd,
			u0,
			steps: 4,
			fixedPoint: L
		});
		const cobUrl = saveSvgAsset(`3as_ge_t1_econ_seq_${difficulty}_s${seed}`, cobSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${u1}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `تبدأ مؤسسة خدمات رقمية سنة $2024$ بعدد مشتركين $u_0 = ${u0}$. في كل سنة، تحافظ على $${100 - dropPct}\\%$ من مشتركيها وتكتسب $${cAdd}$ مشتركاً جديداً ($u_{n+1} = ${q} u_n + ${cAdd}$). احسب عدد المشتركين $u_1$ سنة $2025$:`,
				questionTextAr: `احسب عدد المشتركين $u_1$ سنة $2025$:`,
				imageUrl: cobUrl,
				imageCaption: 'تطور عدد المشتركين نحو نقطة التوازن',
				questionData: {
					answer: u1,
					displayTemplate: 'u_1 = ?',
					variables: [],
					tolerance: 0.01
				},
				explanation: `لدينا $u_1 = ${q}(${u0}) + ${cAdd} = ${roundTo(q * u0, 2)} + ${cAdd} = ${u1}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${L}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `يُنمذج حجم إنتاج مصنع سنوياً بالمتتالية $u_0 = ${u0}$ و $u_{n+1} = ${q} u_n + ${cAdd}$. ما هو سقف الاستقرار الإنتاجي $\\lim_{n \\to +\\infty} u_n$ الذي يؤول إليه المصنع على المدى الطويل؟`,
				questionTextAr: `احسب النهاية $\\lim_{n \\to +\\infty} u_n$:`,
				imageUrl: cobUrl,
				imageCaption: 'تقارب الإنتاج نحو السقف L',
				questionData: {
					answer: L,
					displayTemplate: 'lim u_n = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `النقطة الثابتة تحقق $\\ell = ${q}\\ell + ${cAdd} \\implies ${roundTo(1 - q, 2)}\\ell = ${cAdd} \\implies \\ell = ${L}$.`
			};
		} else {
			finalAnswer = `${targetYear}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `عدد المشتركين في منصة تجارية سنة $(2024 + n)$ هو $u_n = ${L} - ${Math.abs(v0)}(${q})^n$. في أي سنة ميلادية يتجاوز عدد المشتركين العتبة $${target}$ لأول مرة؟`,
				questionTextAr: `عيّن السنة الميلادية التي يحقق فيها $u_n \\ge ${target}$:`,
				questionData: {
					answer: targetYear,
					displayTemplate: 'السنة = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `نحل ${L} - ${Math.abs(v0)}(${q})^n \\ge ${target} \\iff (${q})^n \\le \\frac{${L - target}}{${Math.abs(v0)}}، وبإدخال اللوغاريتم نجد $n \\ge ${roundTo(Math.log(ratioThresh) / Math.log(q), 2)}$، أي $n = ${nTarget}$، فتكون السنة هي $2024 + ${nTarget} = ${targetYear}$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `سجّلت مؤسسة جزائرية لتوزيع المنتجات الفلاحية سنة $2024$ عدد $u_0 = ${u0}$ زبوناً نشطاً. تشير المعطيات السنوية إلى انسحاب $${dropPct}$% من الزبائن كل سنة وانضمام $${cAdd}$ زبوناً جديداً. نرمز بـ $u_n$ لعدد الزبائن سنة $(2024 + n)$.`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) احسب $u_1$ و $u_2$، ثم برّر أن العلاقة التراجعية هي $u_(n+1) = ${q} u_n + ${cAdd}$.\n2) برهن بالتراجع أنه من أجل كل $n in bb(N)$: $u_n < ${L}$، ثم استنتج اتجاه تغير المتتالية $(u_n)$.`,
							answer: `1) المحافظة على $${100 - dropPct}$% تعني الضرب في $${q}$ مع إضافة $${cAdd}$، ومنه $u_(n+1) = ${q} u_n + ${cAdd}$.\n$u_1 = ${u1}$ و $u_2 = ${u2}$.\n2) بالتراجع: $u_0 = ${u0} < ${L}$، وإذا فرضنا $u_n < ${L}$ فـ $u_(n+1) < ${q}(${L}) + ${cAdd} = ${L}$.\nوبما أن $u_(n+1) - u_n = ${roundTo(1 - q, 2)}(${L} - u_n) > 0$، فالمتتالية متزايدة تماماً.`,
							mark: '2'
						},
						{
							type: 'image',
							src: cobUrl,
							caption: 'نموذج التوازن السنوي لعدد الزبائن'
						}
					]
				},
				{
					type: 'text',
					content: `3) نضع $v_n = u_n - ${L}$. بيّن أن $(v_n)$ هندسية، اكتب $u_n$ بدلالة $n$ واحسب $lim_(n arrow.r +oo) u_n$ مع التفسير الاقتصادي.\n4) ابتداءً من أي سنة يتجاوز عدد الزبائن $${target}$ زبوناً؟ ثم عبّر عن $S_n = sum_(k=0)^n u_k$ بدلالة $n$.`,
					answer: `3) $v_(n+1) = ${q} v_n$، فـ $(v_n)$ هندسية أساسها $${q}$ وحدها الأول $v_0 = ${v0}$.\nإذن $u_n = ${L} - ${Math.abs(v0)}(${q})^n$، ونهايتها $${L}$ (يستقر عدد الزبائن عند $${L}$ زبوناً على المدى البعيد).\n4) $u_n >= ${target} arrow.r.double (${q})^n <= ${roundTo(ratioThresh, 4)} arrow.r.double n >= ${nTarget}$، أي سنة $${targetYear}$.\nوالمجموع $S_n = ${L}(n + 1) - ${sumCoeff}(1 - (${q})^(n+1))$.`,
					mark: '2'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_ge',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`الاحتفاظ بـ $${100 - dropPct}\\%$ يكافئ الضرب في المعامل $${q}$، ثم إضافة $${cAdd}$.`,
				`استعمل $v_n = u_n - ${L}$ لإثبات المتتالية الهندسية أساسها $${q}$.`,
				`لإيجاد السنة، حلّ $(${q})^n \\le \\frac{${L - target}}{${Math.abs(v0)}}$ مع عكس المتراجحة عند القسمة على $\\ln(${q}) < 0$.`
			],
			solutionStepsAr: [
				`العلاقة التراجعية $u_{n+1} = ${q} u_n + ${cAdd}$ والبرهان بالتراجع أن $u_n < ${L}$.`,
				`المتتالية المساعدة $v_n = u_n - ${L}$ هندسية، ومنه $u_n = ${L} - ${Math.abs(v0)}(${q})^n$ ونهايتها $${L}$.`,
				`بلوغ الهدف $${target}$ يتحقق ابتداءً من سنة $${targetYear}$ ($n = ${nTarget}$).`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Continuity, TVI & Auxiliary Function Root Localization
// ═══════════════════════════════════════════════════════════════════════════════

const tplContinuityTviAuxiliary: ParameterizedTemplate = {
	id: 'tpl_3as_ge_t1_continuity_tvi_auxiliary',
	grade: '3as_ge',
	trimesterId: 't1',
	domain: 'analysis',
	titleAr: 'الاستمرارية، مبرهنة القيم المتوسطة (TVI)، حصر الجذر α وإشارة الدالة المساعدة',
	curriculumLessonId: 'lesson_3as_ge_t1_continuity_ivt_tvi',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Part 1: Piecewise continuity at xc
		const xc = rng.pick([1, 2, 3]);
		const sc = rng.pick([-2, -1, 4].filter((v) => v !== xc));
		const limitH = xc - sc;
		const mAns = rng.pick([1, 2, 3, -1]);
		const rc = limitH - 2 * mAns;

		// Part 2: g(x) = (x - p)^3 + q*(x - p) + yI = x^3 + B*x^2 + C*x + D
		const p = difficulty === 'easy' ? rng.pick([1, 2]) : rng.pick([1, 2, -1]);
		const q = rng.pick([2, 3, 4]);
		const yI = rng.int(-q, -1); // g(p) = yI < 0 and g(p + 1) = 1 + q + yI > 0

		const B = -3 * p;
		const C = 3 * p * p + q;
		const D = yI - p * p * p - q * p;

		const gFn = (x: number) => ((x + B) * x + C) * x + D;
		const gPrime = (x: number) => 3 * x * x + 2 * B * x + C;
		assertCentralDiff(gFn, gPrime, [p - 0.5, p, p + 0.7], 'tvi.gPrime');

		const alpha = bisectRoot(gFn, p, p + 1);
		const tenth = Math.floor(alpha * 10);
		const alphaLo = roundTo(tenth / 10, 1);
		const alphaHi = roundTo((tenth + 1) / 10, 1);
		const gp = yI;
		const gp1 = 1 + q + yI;

		const hNumKatex = poly2Katex(1, -(xc + sc), xc * sc, 'x');
		const hNumTypst = poly2Typst(1, -(xc + sc), xc * sc, 'x');
		const gKatex = poly3Katex(1, B, C, D, 'x');
		const gTypst = poly3Typst(1, B, C, D, 'x');
		const gpTypst = poly2Typst(3, 2 * B, C, 'x');

		const curveSvg = svgFunctionCurvePlot({
			xMin: p - 1.5,
			xMax: p + 2,
			yMin: Math.min(-4, gp - 2),
			yMax: Math.max(4, gp1 + 2),
			fn: gFn,
			curveLabel: 'C_g',
			asymptotes: [{ kind: 'horizontal', value: 0, label: 'y=0', color: '#64748b' }],
			points: [{ x: alpha, y: 0, label: `α≈${roundTo(alpha, 2)}`, color: '#dc2626' }]
		});
		const curveUrl = saveSvgAsset(`3as_ge_t1_tvi_curve_${difficulty}_s${seed}`, curveSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${mAns}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `لتكن $h$ المعرفة على $\\mathbb{R}$ بـ $h(x) = \\frac{${hNumKatex}}{x - ${xc}}$ من أجل $x \\ne ${xc}$ و $h(${xc}) = ${linearKatex(2, rc, 'm')}$. احسب قيمة الوسيط $m$ حتى تكون $h$ مستمرة عند $x_0 = ${xc}$:`,
				questionTextAr: `عيّن قيمة $m$ لاستمرارية $h$ عند $x_0 = ${xc}$:`,
				questionData: {
					answer: mAns,
					displayTemplate: 'm = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `نختزل البسط $(x - ${xc})(${linearKatex(1, -sc, 'x')})$ فنجد $\\lim_{x \\to ${xc}} h(x) = ${limitH}$. بالمساواة مع $2m ${rc >= 0 ? '+ ' + rc : '- ' + Math.abs(rc)}$ نحصل على $m = ${mAns}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${alphaLo}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `لتكن الدالة المستمرة والمتزايدة تماماً على $\\mathbb{R}$: $g(x) = ${gKatex}$. تقبل المعادلة $g(x) = 0$ حلاً وحيداً $\\alpha \\in ]${p} ; ${p + 1}[$ حيث $g(${alphaLo}) \\approx ${roundTo(gFn(alphaLo), 3)} < 0$ و $g(${alphaHi}) \\approx ${roundTo(gFn(alphaHi), 3)} > 0$. ما هو الطرف الأدنى للحصر $a < \\alpha < a + 0.1$؟`,
				questionTextAr: `عيّن الطرف الأدنى $a$ في الحصر $a < \\alpha < a + 0.1$:`,
				imageUrl: curveUrl,
				imageCaption: 'منحنى الدالة المساعدة g وموقع جذرها α',
				questionData: {
					answer: alphaLo,
					displayTemplate: 'a = ?',
					variables: [],
					tolerance: 0.01
				},
				explanation: `لأن $g(${alphaLo}) < 0$ و $g(${alphaHi}) > 0$ مع استمرارية $g$ ورتابتها، فإن $${alphaLo} < \\alpha < ${alphaHi}$.`
			};
		} else {
			const mcq = buildUniqueMcqOptions(
				`$g(x) < 0$ على $]-\\infty ; \\alpha[$، $g(\\alpha) = 0$، و $g(x) > 0$ على $]\\alpha ; +\\infty[$`,
				[
					{
						text: `$g(x) > 0$ على $]-\\infty ; \\alpha[$، $g(\\alpha) = 0$، و $g(x) < 0$ على $]\\alpha ; +\\infty[$`,
						diagnosticFeedback: `الدالة $g$ **متزايدة تماماً** على $\\mathbb{R}$، لذا تنتقل من القيم السالبة إلى القيم الموجبة وليس العكس!`
					},
					{
						text: `$g(x) < 0$ على $]-\\infty ; ${p}[$ و $g(x) > 0$ على $]${p + 1} ; +\\infty[$ ولا تنعدم`,
						diagnosticFeedback: `الدالة تنعدم عند $\\alpha \\in ]${p} ; ${p + 1}[$ وفق مبرهنة القيم المتوسطة.`
					},
					{
						text: `$g(x) > 0$ دوماً لأن $g'(x) > 0$ على $\\mathbb{R}$`,
						diagnosticFeedback: `لا تخلط بين إشارة المشتقة $g'(x) > 0$ (اتجاه التغير) وإشارة الدالة $g(x)$ نفسها!`
					}
				],
				rng
			);
			finalAnswer = `g<0 قبل α و g>0 بعد α`;
			quizQuestion = {
				type: 'mcq',
				questionText: `الدالة $g(x) = ${gKatex}$ متزايدة تماماً على $\\mathbb{R}$ وتنعدم عند $\\alpha \\in ]${p} ; ${p + 1}[$. ما هي إشارة $g(x)$ على $\\mathbb{R}$؟`,
				questionTextAr: `استنتج إشارة الدالة المساعدة $g(x)$ على $\\mathbb{R}$:`,
				imageUrl: curveUrl,
				imageCaption: 'التمثيل البياني للدالة g وإشارتها حول α',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `لأن $g$ متزايدة تماماً و $g(\\alpha) = 0$، فإن $x < \\alpha \\implies g(x) < 0$ و $x > \\alpha \\implies g(x) > 0$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `يتألف التمرين من جزأين مستقلين:`,
			content: [
				{
					type: 'text',
					content: `*الجزء الأول:* نعتبر الدالة $h$ المعرفة على $bb(R)$ بـ: $h(x) = frac(${hNumTypst}, x - ${xc})$ من أجل $x != ${xc}$، و $h(${xc}) = ${linearTypst(2, rc, 'm')}$. عيّن قيمة العدد الحقيقي $m$ حتى تكون $h$ مستمرة عند $x_0 = ${xc}$.`,
					answer: `*الجزء الأول:*\nمن أجل $x != ${xc}$: $h(x) = frac((x - ${xc})(${linearTypst(1, -sc, 'x')}), x - ${xc}) = ${linearTypst(1, -sc, 'x')}$.\nومنه $lim_(x arrow.r ${xc}) h(x) = ${limitH}$.\nتكون $h$ مستمرة عند $${xc}$ إذا تحقق $h(${xc}) = ${limitH} arrow.r.double ${linearTypst(2, rc, 'm')} = ${limitH} arrow.r.double m = ${mAns}$.`,
					mark: '1'
				},
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `*الجزء الثاني:* نعتبر الدالة المساعدة $g$ المعرفة على $bb(R)$ بـ: $g(x) = ${gTypst}$.\n1) احسب $g'(x)$، وادرس اتجاه تغير الدالة $g$ على $bb(R)$.\n2) بيّن أن المعادلة $g(x) = 0$ تقبل حلاً وحيداً $alpha$ في المجال $]${p} ; ${p + 1}[$، ثم تحقّق أن $${alphaLo} < alpha < ${alphaHi}$ واستنتج إشارة $g(x)$ على $bb(R)$.`,
							answer: `*الجزء الثاني:*\n1) $g'(x) = ${gpTypst} = 3(x - (${p}))^2 + ${q} > 0$ دوماً، فـ $g$ مستمرة ومتزايدة تماماً على $bb(R)$.\n2) لدينا $g(${p}) = ${gp} < 0$ و $g(${p + 1}) = ${gp1} > 0$، وبما أن $g$ مستمرة ومتزايدة تماماً على $[${p}; ${p + 1}]$، فإن $g(x) = 0$ تقبل حلاً وحيداً $alpha in ]${p}; ${p + 1}[$.\nالتحقق: $g(${alphaLo}) approx ${roundTo(gFn(alphaLo), 3)} < 0$ و $g(${alphaHi}) approx ${roundTo(gFn(alphaHi), 3)} > 0$، إذن $${alphaLo} < alpha < ${alphaHi}$.\nالإشارة: $g(x) < 0$ على $]-oo; alpha[$ و $g(x) > 0$ على $]alpha; +oo[$.`,
							mark: '3'
						},
						{
							type: 'image',
							src: curveUrl,
							caption: 'منحنى الدالة g وتقاطعه مع محور الفواصل عند α'
						}
					]
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_ge',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`لإزالة حالة عدم التعيين عند $${xc}$، حلل البسط بالعامل $(x - ${xc})$.`,
				`اكتب $g'(x)$ على الشكل $3(x - (${p}))^2 + ${q}$ لتبيان أنها موجبة تماماً على $\\mathbb{R}$.`,
				`اذكر الشروط الثلاثة لـ TVI: الاستمرارية والرتابة التامة وتغيّر الإشارة $g(${p}) \\times g(${p + 1}) < 0$.`
			],
			solutionStepsAr: [
				`الاستمرارية عند $${xc}$: $\\lim_{x \\to ${xc}} h(x) = ${limitH} \\implies m = ${mAns}$.`,
				`إثبات رتابة $g(x)$ تماماً على $\\mathbb{R}$ وحل $g(x) = 0$ بتطبيق TVI على $[${p}; ${p + 1}]$.`,
				`حصر الجذر $${alphaLo} < \\alpha < ${alphaHi}$ واستنتاج إشارة $g(x)$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Derivability, Inflection Point & Tangent Equations
// ═══════════════════════════════════════════════════════════════════════════════

const tplDerivabilityInflectionTangent: ParameterizedTemplate = {
	id: 'tpl_3as_ge_t1_derivability_inflection_tangent',
	grade: '3as_ge',
	trimesterId: 't1',
	domain: 'analysis',
	titleAr: 'الاشتقاقية: المماس، نقطة الانعطاف والتقريب التآلفي للدوال التكعيبية',
	curriculumLessonId: 'lesson_3as_ge_t1_derivability_tangents_inflection',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// f(x) = (x - p)^3 + q*(x - p) + yI => inflection at I(p, yI), tangent at I has slope q
		const p = difficulty === 'easy' ? rng.pick([1, 2]) : rng.pick([1, 2, 3]);
		const q = rng.pick([2, 3, 4]);
		const yI = rng.pick([4, 6, 8, 10]);

		const B = -3 * p;
		const C = 3 * p * p + q;
		const D = yI - p * p * p - q * p;
		const tgIntercept = yI - q * p;

		const fFn = (x: number) => ((x + B) * x + C) * x + D;
		const fpFn = (x: number) => 3 * x * x + 2 * B * x + C;
		const fppFn = (x: number) => 6 * x + 2 * B;
		assertCentralDiff(fFn, fpFn, [p - 0.3, p, p + 0.5], 'inflect.fp');
		assertCentralDiff(fpFn, fppFn, [p - 0.3, p, p + 0.5], 'inflect.fpp');

		const fKatex = poly3Katex(1, B, C, D, 'x');
		const fTypst = poly3Typst(1, B, C, D, 'x');
		const fpKatex = poly2Katex(3, 2 * B, C, 'x');
		const fpTypst = poly2Typst(3, 2 * B, C, 'x');
		const tgKatex = `y = ${linearKatex(q, tgIntercept, 'x')}`;
		const tgTypst = `y = ${linearTypst(q, tgIntercept, 'x')}`;

		// Parallel tangent point with slope mPar = q + 3*(1)^2 = q + 3 => x = p + 1 and p - 1
		const mPar = q + 3;
		const xPar1 = p - 1;
		const xPar2 = p + 1;

		const curveSvg = svgFunctionCurvePlot({
			xMin: p - 2.2,
			xMax: p + 2.2,
			yMin: yI - 8,
			yMax: yI + 8,
			fn: fFn,
			curveLabel: 'C_f',
			tangents: [{ x: p, y: yI, slope: q, halfSpan: 1.4, color: '#059669' }],
			points: [{ x: p, y: yI, label: `I(${p};${yI})`, color: '#dc2626' }]
		});
		const curveUrl = saveSvgAsset(`3as_ge_t1_inflect_curve_${difficulty}_s${seed}`, curveSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${p}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر الدالة $f(x) = ${fKatex}$ على $\\mathbb{R}$. احسب فاصلة نقطة الانعطاف $I$ للمنحنى $(C_f)$ حيث تنعدم $f''(x)$ وتغيّر إشارتها:`,
				questionTextAr: `احسب فاصلة نقطة الانعطاف $x_I$ للدالة $f(x) = ${fKatex}$:`,
				imageUrl: curveUrl,
				imageCaption: 'المنحنى (C_f) ونقطة انعطافه I',
				questionData: {
					answer: p,
					displayTemplate: 'x_I = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `لدينا $f'(x) = ${fpKatex}$ و $f''(x) = ${linearKatex(6, 2 * B, 'x')}$. تنعدم $f''(x)$ وتغيّر إشارتها عند $x_I = ${p}$.`
			};
		} else if (difficulty === 'medium') {
			const wrongForget = `y = ${linearKatex(q, yI, 'x')}`;
			const wrongSign = `y = ${linearKatex(q, yI + q * p, 'x')}`;
			const wrongSwap = `y = ${linearKatex(yI, q - yI * p, 'x')}`;

			const mcq = buildUniqueMcqOptions(
				`$${tgKatex}$`,
				[
					{
						text: `$${wrongForget}$`,
						diagnosticFeedback: `نسيت طرح $f'(${p}) \\times ${p}$ عند نشر $y = f'(${p})(x - ${p}) + f(${p})$.`
					},
					{
						text: `$${wrongSign}$`,
						diagnosticFeedback: `أخطأت في إشارة النشر: $y = ${q}(x - ${p}) + ${yI}$.`
					},
					{
						text: `$${wrongSwap}$`,
						diagnosticFeedback: `بدّلت موضعي معامل التوجيه $f'(${p}) = ${q}$ والترتيبة $f(${p}) = ${yI}$.`
					}
				],
				rng
			);
			finalAnswer = tgKatex;
			quizQuestion = {
				type: 'mcq',
				questionText: `ما هي معادلة المماس $(T)$ للمنحنى الممثل للدالة $f(x) = ${fKatex}$ عند نقطة الانعطاف $I(${p} ; ${yI})$؟`,
				questionTextAr: `عيّن معادلة المماس $(T)$ عند نقطة الانعطاف $I(${p} ; ${yI})$:`,
				imageUrl: curveUrl,
				imageCaption: 'المماس عند نقطة الانعطاف يخترق المنحنى',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `عند $x_I = ${p}$ لدينا $f(${p}) = ${yI}$ و $f'(${p}) = ${q}$، فمعادلة المماس هي $y = ${q}(x - ${p}) + ${yI} \\implies ${tgKatex}$.`
			};
		} else {
			finalAnswer = `${xPar2}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `للدالة $f(x) = ${fKatex}$، يقبل المنحنى $(C_f)$ مماسين يوازيان المستقيم $(d): y = ${mPar}x - 5$. احسب أكبر فاصلة $x_0$ لنقطة تماس تحقق $f'(x_0) = ${mPar}$:`,
				questionTextAr: `احسب أكبر فاصلة $x_0$ تحقق $f'(x_0) = ${mPar}$:`,
				questionData: {
					answer: xPar2,
					displayTemplate: 'x_0 = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `نحل $f'(x) = ${mPar} \\iff 3(x - ${p})^2 + ${q} = ${q + 3} \\iff (x - ${p})^2 = 1$، فنجد $x = ${xPar1}$ أو $x = ${xPar2}$، والأكبر هو $${xPar2}$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر الدالة العددية $f$ المعرفة على $bb(R)$ بـ: $f(x) = ${fTypst}$، وليكن $(C_f)$ تمثيلها البياني.`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) احسب المشتقة $f'(x)$، وبيّن أن $f$ متزايدة تماماً على $bb(R)$.\n2) احسب المشتقة الثانية $f''(x)$ وادرس إشارتها، ثم استنتج إحداثيي نقطة انعطاف المنحنى $(C_f)$ واكتب معادلة المماس $(T)$ عندها.`,
							answer: `1) $f'(x) = ${fpTypst} = 3(x - ${p})^2 + ${q} >= ${q} > 0$ دوماً، فالدالة $f$ متزايدة تماماً على $bb(R)$.\n2) $f''(x) = ${linearTypst(6, 2 * B, 'x')} = 6(x - ${p})$، تنعدم وتغيّر إشارتها عند $x_I = ${p}$.\nإذن نقطة الانعطاف هي $I(${p} ; ${yI})$.\nمعادلة المماس عند $I$: $f'(${p}) = ${q}$، ومنه $(T): y = ${q}(x - ${p}) + ${yI} arrow.r.double ${tgTypst}$.`,
							mark: '2.5'
						},
						{
							type: 'image',
							src: curveUrl,
							caption: 'المنحنى (C_f) ومماس نقطة الانعطاف I'
						}
					]
				},
				{
					type: 'text',
					content: `3) عيّن فواصل النقط من $(C_f)$ التي يكون عندها المماس موازياً للمستقيم $(d): y = ${mPar} x - 5$.`,
					answer: `3) المماس يوازي $(d)$ معناه $f'(x) = ${mPar}$:\n$3(x - ${p})^2 + ${q} = ${mPar} arrow.r.double 3(x - ${p})^2 = 3 arrow.r.double (x - ${p})^2 = 1$.\nإذن $x - ${p} = 1$ أو $x - ${p} = -1$، أي $x = ${xPar2}$ أو $x = ${xPar1}$.`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_ge',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`اكتب $f'(x)$ على الشكل النموذجي لإثبات أنها موجبة تماماً على $\\mathbb{R}$.`,
				`نقطة الانعطاف تقع عند انعدام $f''(x)$ مع تغيّر إشارتها.`,
				`شرط توازي مماس مع المستقيم $y = ${mPar}x - 5$ هو تساوي معامل التوجيه: $f'(x) = ${mPar}$.`
			],
			solutionStepsAr: [
				`إثبات تزايد $f$ تماماً عبر $f'(x) = 3(x - ${p})^2 + ${q} > 0$.`,
				`تحديد نقطة الانعطاف $I(${p}; ${yI})$ ومعادلة المماس $(T): ${tgKatex}$.`,
				`فواصل المماسات الموازية لـ $(d)$: $x_1 = ${xPar1}$ و $x_2 = ${xPar2}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Economic Cost & Profit Optimization: C_T(x), C_M(x), C_m(x) & Profit B(x)
// ═══════════════════════════════════════════════════════════════════════════════

const tplMarginalAverageCostOpt: ParameterizedTemplate = {
	id: 'tpl_3as_ge_t1_marginal_average_cost_opt',
	grade: '3as_ge',
	trimesterId: 't1',
	domain: 'analysis',
	titleAr: 'التطبيق الاقتصادي للاشتقاقية: الكلفة الحدية، الكلفة المتوسطة الصغرى وتعظيم الربح',
	curriculumLessonId: 'lesson_3as_ge_t1_marginal_average_cost_optimization',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// C_T(x) = x^3 - 3*k*x^2 + c1*x + d1, with d1 = x0^2*(2*x0 - 3*k) > 0
		// Then C_M'(x) = (2x^3 - 3k x^2 - d1)/x^2 = ((x - x0)*(2x^2 + A*x + x0*A))/x^2 where A = 2*x0 - 3*k > 0!
		// So minimum of C_M(x) is at x0, where C_M(x0) = C_m(x0) = 3*x0^2 - 6*k*x0 + c1
		interface EconOptCfg {
			k: number;
			x0: number; // > 1.5*k
			c1: number; // > 3*k^2 so C_m(x) > 0 everywhere
			r2: number; // > x0, optimal profit quantity
			qMax: number;
		}

		const pool: EconOptCfg[] =
			difficulty === 'easy'
				? [
						{ k: 2, x0: 4, c1: 20, r2: 6, qMax: 10 },
						{ k: 2, x0: 5, c1: 24, r2: 7, qMax: 10 },
						{ k: 3, x0: 6, c1: 36, r2: 8, qMax: 12 }
					]
				: difficulty === 'medium'
					? [
							{ k: 4, x0: 8, c1: 60, r2: 9, qMax: 14 },
							{ k: 3, x0: 5, c1: 40, r2: 8, qMax: 12 },
							{ k: 4, x0: 7, c1: 58, r2: 9, qMax: 13 }
						]
					: [
							{ k: 4, x0: 8, c1: 72, r2: 10, qMax: 15 },
							{ k: 5, x0: 9, c1: 88, r2: 11, qMax: 16 },
							{ k: 4, x0: 9, c1: 70, r2: 10, qMax: 15 }
						];

		const cfg = rng.pick(pool);
		const { k, x0, c1, r2, qMax } = cfg;
		const aLin = 2 * x0 - 3 * k; // > 0
		const d1 = x0 * x0 * aLin; // > 0

		const ctFn = (x: number) => ((x - 3 * k) * x + c1) * x + d1;
		const cmargFn = (x: number) => (3 * x - 6 * k) * x + c1;
		const cavgFn = (x: number) => x * x - 3 * k * x + c1 + d1 / x;

		const minAvgVal = cmargFn(x0); // = cavgFn(x0) exact integer!
		const r1 = 2 * k - r2; // < 0 because r2 > 2k
		const pSell = cmargFn(r2); // so B'(x) = pSell - C_m(x) = -3*(x - r1)*(x - r2)
		const bFn = (x: number) => pSell * x - ctFn(x);
		const maxProfit = bFn(r2);

		const ctTypst = poly3Typst(1, -3 * k, c1, d1, 'x');
		const ctKatex = poly3Katex(1, -3 * k, c1, d1, 'x');
		const cmargTypst = poly2Typst(3, -6 * k, c1, 'x');
		const cmargKatex = poly2Katex(3, -6 * k, c1, 'x');
		const cavgTypst = `${poly2Typst(1, -3 * k, c1, 'x')} + frac(${d1}, x)`;
		const quadFactTypst = poly2Typst(2, aLin, x0 * aLin, 'x');

		const varSvg = svgVariationTable({
			fnName: 'C_M(x)',
			derivName: "C_M'(x)",
			xValues: ['1', `${x0}`, `${qMax}`],
			derivativeRow: [
				{ kind: 'sign', value: '-' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '+' }
			],
			variations: [
				{ value: `${roundTo(cavgFn(1), 1)}`, position: 'top' },
				{ value: `${minAvgVal}`, position: 'bottom' },
				{ value: `${roundTo(cavgFn(qMax), 1)}`, position: 'top' }
			]
		});
		const varUrl = saveSvgAsset(`3as_ge_t1_cavg_var_${difficulty}_s${seed}`, varSvg);

		const curveSvg = svgFunctionCurvePlot({
			xMin: 0.5,
			xMax: qMax,
			yMin: 0,
			yMax: Math.ceil(Math.min(cavgFn(1), minAvgVal * 2.4)),
			fn: (x) => (x > 0.3 ? cavgFn(x) : NaN),
			curveLabel: 'C_M(x)',
			tangents: [{ x: x0, y: minAvgVal, slope: 0, halfSpan: 1.8, color: '#059669' }],
			points: [{ x: x0, y: minAvgVal, label: `Min(${x0};${minAvgVal})`, color: '#dc2626' }]
		});
		const curveUrl = saveSvgAsset(`3as_ge_t1_cavg_curve_${difficulty}_s${seed}`, curveSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${x0}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `الكلفة الكلية لإنتاج $x \\in [1 ; ${qMax}]$ طن هي $C_T(x) = ${ctKatex}$، وتُكتب مشتقة الكلفة المتوسطة على الشكل $C_M'(x) = \\frac{(x - ${x0})(2x^2 + ${aLin}x + ${x0 * aLin})}{x^2}$. عيّن الكمية $x_0$ التي تصغّر الكلفة المتوسطة:`,
				questionTextAr: `عيّن الإنتاج $x_0$ الذي يحقّق أدنى كلفة متوسطة للطن:`,
				imageUrl: curveUrl,
				imageCaption: 'منحنى الكلفة المتوسطة للوحدة C_M(x)',
				questionData: {
					answer: x0,
					displayTemplate: 'x_0 = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `على $[1; ${qMax}]$ لدينا $2x^2 + ${aLin}x + ${x0 * aLin} > 0$، فتتغير إشارة $C_M'(x)$ عند $x_0 = ${x0}$ من سالب إلى موجب، محققةً الحد الأدنى عند $x_0 = ${x0}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${minAvgVal}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `الكلفة الكلية لمؤسسة (بملايين الدنانير) هي $C_T(x) = ${ctKatex}$ على $[1 ; ${qMax}]$. تبلغ الكلفة المتوسطة للطن حدها الأدنى عند $x_0 = ${x0}$. احسب قيمة هذه الكلفة المتوسطة الصغرى $C_M(${x0})$ (والتي تساوي الكلفة الحدية $C_m(${x0})$):`,
				questionTextAr: `احسب أدنى كلفة متوسطة $C_M(${x0}) = C_m(${x0})$:`,
				imageUrl: varUrl,
				imageCaption: 'جدول تغيرات الكلفة المتوسطة C_M(x)',
				questionData: {
					answer: minAvgVal,
					displayTemplate: 'C_M(x_0) = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `نعوض $x_0 = ${x0}$ في الكلفة الحدية $C_m(x) = ${cmargKatex}$ أو في $C_M(${x0})$: $C_m(${x0}) = 3(${x0})^2 - ${6 * k}(${x0}) + ${c1} = ${minAvgVal}$.`
			};
		} else {
			finalAnswer = `${r2}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `تنتج مؤسسة $x \\in [1 ; ${qMax}]$ طن بكلفة كلية $C_T(x) = ${ctKatex}$ وتبيع كل طن بسعر ثابت $p = ${pSell}$ مليون دينار ($R(x) = ${pSell}x$). احسب الكمية المثلى $x^*$ التي تعظّم الربح الصافي $B(x) = R(x) - C_T(x)$:`,
				questionTextAr: `عيّن الكمية المثلى $x^*$ لتعظيم الربح الصافي:`,
				questionData: {
					answer: r2,
					displayTemplate: 'x* = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `مشتقة الربح هي $B'(x) = ${pSell} - C_m(x) = -3(x - (${r1}))(x - ${r2})$. تنعدم على $[1; ${qMax}]$ عند $x^* = ${r2}$ (موجبة قبله وسالبة بعده)، فتعظّم الربح عند $x^* = ${r2}$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `تُنمذج الكلفة الكلية لإنتاج $x$ طن من مادة صناعية ($x in [1 ; ${qMax}]$) بملايين الدنانير بالعبارة:\n$C_T(x) = ${ctTypst}$.`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) عبّر عن الكلفة الحدية $C_m(x) = C_T'(x)$، وعن الكلفة المتوسطة للطن $C_M(x) = frac(C_T(x), x)$.\n2) تحقّق أن $C_M'(x) = frac((x - ${x0})(${quadFactTypst}), x^2)$، ثم شكّل جدول تغيرات $C_M$ على $[1 ; ${qMax}]$.`,
							answer: `1) $C_m(x) = ${cmargTypst}$، و $C_M(x) = ${cavgTypst}$.\n2) $C_M'(x) = 2 x - ${3 * k} - frac(${d1}, x^2) = frac(2 x^3 - ${3 * k} x^2 - ${d1}, x^2)$.\nبنشر $(x - ${x0})(${quadFactTypst})$ نجد نفس البسط.\nعلى $[1 ; ${qMax}]$ لدينا $${quadFactTypst} > 0$، فـ $C_M$ متناقصة على $[1 ; ${x0}]$ ومتزايدة على $[${x0} ; ${qMax}]$.`,
							mark: '2'
						},
						{
							type: 'image',
							src: varUrl,
							caption: 'جدول تغيرات الكلفة المتوسطة C_M(x)'
						}
					]
				},
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `3) استنتج الكمية $x_0$ التي تحقّق أدنى كلفة متوسطة للطن، وتحقق حسابياً أن $C_M(x_0) = C_m(x_0)$.\n4) تبيع المؤسسة كل طن بسعر ثابت $p = ${pSell}$ مليون دينار. ادرس تغيرات دالة الربح $B(x) = ${pSell} x - C_T(x)$ وعيّن الكمية المثلى لتعظيم الربح.`,
							answer: `3) تبلغ $C_M$ حدها الأدنى عند $x_0 = ${x0}$ أطنان، ونجد $C_M(${x0}) = C_m(${x0}) = ${minAvgVal}$ مليون دج.\n4) $B'(x) = ${pSell} - (${cmargTypst}) = -3(x - (${r1}))(x - ${r2})$.\nعلى $[1 ; ${qMax}]$ تكون $B'(x) > 0$ على $[1 ; ${r2}[$ و $B'(x) < 0$ على $]${r2} ; ${qMax}]$، إذن أقصى ربح يبلغ $${maxProfit}$ مليون دج عند $x^* = ${r2}$ أطنان.`,
							mark: '2'
						},
						{
							type: 'image',
							src: curveUrl,
							caption: 'منحنى الكلفة المتوسطة C_M(x)'
						}
					]
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_ge',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`الكلفة الحدية هي $C_m(x) = C_T'(x)$ والكلفة المتوسطة هي $C_M(x) = \\frac{C_T(x)}{x}$.`,
				`انشر البسط $(x - ${x0})(2x^2 + ${aLin}x + ${x0 * aLin})$ للتحقق من عبارة $C_M'(x)$.`,
				`يتعظم الربح الصافي عند الكمية $x^*$ التي تحقق $B'(x^*) = 0 \\iff C_m(x^*) = ${pSell}$.`
			],
			solutionStepsAr: [
				`حساب $C_m(x) = ${cmargKatex}$ ومشتقة الكلفة المتوسطة $C_M'(x)$.`,
				`أدنى كلفة متوسطة تبلغ $${minAvgVal}$ مليون دج عند $x_0 = ${x0}$ حيث $C_M(${x0}) = C_m(${x0})$.`,
				`تعظيم الربح الصافي عند $x^* = ${r2}$ بمقدار $${maxProfit}$ مليون دج.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Comprehensive BAC T1 Economic Analysis Problem (7 Points)
// ═══════════════════════════════════════════════════════════════════════════════

const tplBacEconomicAnalysisIntegration: ParameterizedTemplate = {
	id: 'tpl_3as_ge_t1_bac_economic_analysis_integration',
	grade: '3as_ge',
	trimesterId: 't1',
	domain: 'integration',
	isIntegration: true,
	titleAr: 'التمرين الرابع — المسألة الشاملة: دالة مساعدة + TVI + دالة اقتصادية ناطقة ومناقشة بيانية',
	curriculumLessonId: 'lesson_3as_ge_t1_marginal_average_cost_optimization',
	defaultPoints: 7,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Part A: Auxiliary g(x) = a*x^3 + p*x - q, where a in {1, 2}, p > 0 EVEN (p = 2*c), q > 0 EVEN (q = 2*r)
		// Chosen so g(1) = a + p - q < 0 and g(2) = 8a + 2p - q > 0 => unique alpha in ]1 ; 2[!
		// Part B: Main f(x) = a*x + b - p/x + r/x^2 on ]0 ; +oo[
		//   f'(x) = a + p/x^2 - 2r/x^3 = (a x^3 + p x - q) / x^3 = g(x) / x^3!
		//   And since g(alpha) = 0 => r/alpha^2 = (a*alpha)/2 + p/(2*alpha):
		//   f(alpha) = (3*a/2)*alpha + b - p/(2*alpha) = (3*a/2)*alpha + b - c/alpha! (ALL integer when a=2!)
		interface BacT1Cfg {
			a: number;
			c: number; // p = 2*c
			r: number; // q = 2*r
			b: number;
		}

		const pool: BacT1Cfg[] =
			difficulty === 'easy'
				? [
						{ a: 2, c: 1, r: 4, b: 2 }, // g(1)=2+2-8=-4<0, g(2)=16+4-8=12>0
						{ a: 2, c: 2, r: 5, b: 1 }, // g(1)=2+4-10=-4<0, g(2)=16+8-10=14>0
						{ a: 2, c: 1, r: 5, b: 3 } // g(1)=-6<0, g(2)=10>0
					]
				: difficulty === 'medium'
					? [
							{ a: 2, c: 2, r: 6, b: -1 }, // g(1)=-6<0, g(2)=12>0
							{ a: 2, c: 3, r: 7, b: 2 }, // g(1)=-6<0, g(2)=14>0
							{ a: 2, c: 2, r: 7, b: 1 } // g(1)=-8<0, g(2)=10>0
						]
					: [
							{ a: 2, c: 3, r: 9, b: -2 }, // g(1)=-10<0, g(2)=10>0
							{ a: 2, c: 4, r: 10, b: 1 }, // g(1)=-10<0, g(2)=12>0
							{ a: 2, c: 2, r: 8, b: -1 } // g(1)=-10<0, g(2)=8>0
						];

		const cfg = rng.pick(pool);
		const { a, c, r, b } = cfg;
		const p = 2 * c;
		const q = 2 * r;

		const gFn = (x: number) => a * x * x * x + p * x - q;
		const gpFn = (x: number) => 3 * a * x * x + p;
		const fFn = (x: number) => a * x + b - p / x + r / (x * x);
		const fpFn = (x: number) => gFn(x) / (x * x * x);

		assertCentralDiff(gFn, gpFn, [0.8, 1.3, 2.2], 'bacT1.gPrime');
		assertCentralDiff(fFn, fpFn, [0.8, 1.3, 2.2], 'bacT1.fPrime');

		const alpha = bisectRoot(gFn, 1, 2);
		const fAlphaDirect = fFn(alpha);
		const fAlphaFormula = 3 * alpha + b - c / alpha; // since a = 2 => 3*a/2 = 3
		if (Math.abs(fAlphaDirect - fAlphaFormula) > 1e-8) {
			throw new Error(`f(alpha) identity mismatch: ${fAlphaDirect} vs ${fAlphaFormula}`);
		}

		const tenth = Math.floor(alpha * 10);
		const alphaLo = roundTo(tenth / 10, 1);
		const alphaHi = roundTo((tenth + 1) / 10, 1);
		const fAlphaRounded = roundTo(fAlphaDirect, 2);
		const phi = (u: number) => 3 * u + b - c / u;
		const fAlphaLo = roundTo(phi(alphaLo), 2);
		const fAlphaHi = roundTo(phi(alphaHi), 2);

		// Tangent at x0 = 1 (exact integers!)
		const f1 = a + b - p + r;
		const fp1 = gFn(1); // = a + p - q < 0
		const tgIntercept = f1 - fp1;

		// Intersection with oblique asymptote y = ax + b: -p/x + r/x^2 = 0 => x = r / p
		const [xIntN, xIntD] = simplifyFraction(r, p);
		const yIntN = a * xIntN + b * xIntD;

		const gKatex = `${a}x^3 + ${p}x - ${q}`;
		const gTypst = `${a} x^3 + ${p} x - ${q}`;
		const linABK = linearKatex(a, b, 'x');
		const linABT = linearTypst(a, b, 'x');
		const fKatex = `${linABK} - \\frac{${p}}{x} + \\frac{${r}}{x^2}`;
		const fTypst = `${linABT} - frac(${p}, x) + frac(${r}, x^2)`;
		const fAlphaExprK = `3\\alpha ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`} - \\frac{${c}}{\\alpha}`;
		const fAlphaExprT = `3 alpha ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`} - frac(${c}, alpha)`;
		const tgKatex = `y = ${linearKatex(fp1, tgIntercept, 'x')}`;
		const tgTypst = `y = ${linearTypst(fp1, tgIntercept, 'x')}`;

		const varSvg = svgVariationTable({
			fnName: 'f(x)',
			derivName: "f'(x)",
			xValues: ['0', 'α', '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: '||' },
				{ kind: 'sign', value: '-' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '+' }
			],
			variations: [
				{ value: '+∞', position: 'top' },
				{ value: 'f(α)', position: 'bottom' },
				{ value: '+∞', position: 'top' }
			]
		});
		const varUrl = saveSvgAsset(`3as_ge_t1_bac_var_${difficulty}_s${seed}`, varSvg);

		const curveSvg = svgFunctionCurvePlot({
			xMin: -0.4,
			xMax: 5,
			yMin: Math.floor(Math.min(-1, fAlphaDirect - 2)),
			yMax: Math.ceil(Math.max(f1 + 3, a * 4.5 + b + 2)),
			fn: (x) => (x > 0.25 ? fFn(x) : NaN),
			curveLabel: 'C_f',
			asymptotes: [
				{ kind: 'vertical', value: 0, label: 'x=0', color: '#dc2626' },
				{ kind: 'oblique', a, b, label: 'Δ', color: '#059669' }
			],
			tangents: [{ x: 1, y: f1, slope: fp1, halfSpan: 0.7, color: '#7c3aed' }],
			points: [
				{ x: 1, y: f1, label: `A(1;${f1})`, color: '#7c3aed' },
				{ x: alpha, y: fAlphaDirect, label: `S(α;${fAlphaRounded})`, color: '#dc2626' }
			]
		});
		const curveUrl = saveSvgAsset(`3as_ge_t1_bac_curve_${difficulty}_s${seed}`, curveSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${fp1}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر على $]0 ; +\\infty[$ الدالة المساعدة $g(x) = ${gKatex}$ والدالة الاقتصادية $f(x) = ${fKatex}$ التي تحقق $f'(x) = \\frac{g(x)}{x^3}$. احسب معامل توجيه المماس $(T)$ للمنحنى $(C_f)$ عند $x_0 = 1$:`,
				questionTextAr: `احسب العدد المشتق $f'(1)$:`,
				imageUrl: curveUrl,
				imageCaption: 'المنحنى (C_f) والمقارب المائل والمماس عند x=1',
				questionData: {
					answer: fp1,
					displayTemplate: "f'(1) = ?",
					variables: [],
					tolerance: 0
				},
				explanation: `لدينا $f'(1) = \\frac{g(1)}{1^3} = g(1) = ${a} + ${p} - ${q} = ${fp1}$.`
			};
		} else if (difficulty === 'medium') {
			const wrongOne = `2\\alpha ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`} - \\frac{${c}}{\\alpha}`;
			const wrongPlus = `3\\alpha ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`} + \\frac{${c}}{\\alpha}`;
			const wrongNoDiv = `3\\alpha ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`} - \\frac{${p}}{\\alpha}`;

			const mcq = buildUniqueMcqOptions(
				`$f(\\alpha) = ${fAlphaExprK}$`,
				[
					{
						text: `$f(\\alpha) = ${wrongOne}$`,
						diagnosticFeedback: `بعد تعويض $\\frac{${r}}{\\alpha^2} = \\alpha + \\frac{${c}}{\\alpha}$ نجمع $\\alpha$ مع $2\\alpha$ لنحصل على $3\\alpha$!`
					},
					{
						text: `$f(\\alpha) = ${wrongPlus}$`,
						diagnosticFeedback: `انتبه للإشارة: $-\\frac{${p}}{\\alpha} + \\frac{${c}}{\\alpha} = -\\frac{${c}}{\\alpha}$ وليس $+\\frac{${c}}{\\alpha}$.`
					},
					{
						text: `$f(\\alpha) = ${wrongNoDiv}$`,
						diagnosticFeedback: `اجمع الكسرين $-\\frac{${p}}{\\alpha} + \\frac{${c}}{\\alpha} = -\\frac{${c}}{\\alpha}$.`
					}
				],
				rng
			);
			finalAnswer = fAlphaExprK;
			quizQuestion = {
				type: 'mcq',
				questionText: `إذا علمت أن $g(\\alpha) = ${a}\\alpha^3 + ${p}\\alpha - ${q} = 0$، فما هي العبارة المبسّطة لـ $f(\\alpha) = ${a}\\alpha ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`} - \\frac{${p}}{\\alpha} + \\frac{${r}}{\\alpha^2}$ بدلالة $\\alpha$؟`,
				questionTextAr: `عيّن العبارة المبسّطة لـ $f(\\alpha)$:`,
				imageUrl: varUrl,
				imageCaption: 'جدول تغيرات الدالة f على ]0 ; +∞[',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `من $2\\alpha^3 + ${p}\\alpha = ${q} = 2(${r})$ نقسم على $2\\alpha^2$ فنجد $\\frac{${r}}{\\alpha^2} = \\alpha + \\frac{${c}}{\\alpha}$. بالتعويض في $f(\\alpha)$ نجد $f(\\alpha) = ${fAlphaExprK}$.`
			};
		} else {
			const mcq = buildUniqueMcqOptions(
				`حلّان متمايزان موجبان تماماً من أجل $\\lambda > f(\\alpha)$، حل وحيد إذا $\\lambda = f(\\alpha)$، ولا حلول إذا $\\lambda < f(\\alpha)$`,
				[
					{
						text: `حلّان متمايزان من أجل $\\lambda < f(\\alpha)$، ولا حلول إذا $\\lambda > f(\\alpha)$`,
						diagnosticFeedback: `النقطة $f(\\alpha)$ هي قيمة حدية **صغرى**، لأن النهايتين عند $0^+$ و $+\\infty$ هما $+\\infty$ معاً!`
					},
					{
						text: `حل وحيد في $]0 ; +\\infty[$ لكل $\\lambda \\in \\mathbb{R}$`,
						diagnosticFeedback: `الدالة متناقصة على $]0; \\alpha]$ ثم متزايدة على $[\\alpha; +\\infty[$، فهي ليست رتيبة على كامل المجال.`
					},
					{
						text: `حلّان متمايزان فقط عندما $f(\\alpha) < \\lambda < ${f1}$`,
						diagnosticFeedback: `بما أن $\\lim_{x \\to +\\infty} f(x) = +\\infty$ و $\\lim_{x \\to 0^+} f(x) = +\\infty$، فالمستقيم الأفقي يقطع المنحنى مرتين لكل $\\lambda > f(\\alpha)$.`
					}
				],
				rng
			);
			finalAnswer = `حلان من أجل λ > f(α)`;
			quizQuestion = {
				type: 'mcq',
				questionText: `تبلغ الدالة $f(x) = ${fKatex}$ قيمتها الحدية الصغرى $f(\\alpha)$ على $]0 ; +\\infty[$ مع $\\lim_{0^+} f = \\lim_{+\\infty} f = +\\infty$. ما هي المناقشة البيانية لعدد حلول المعادلة $f(x) = \\lambda$؟`,
				questionTextAr: `ناقش عدد حلول المعادلة $f(x) = \\lambda$ على $]0 ; +\\infty[$:`,
				imageUrl: curveUrl,
				imageCaption: 'منحنى الدالة f للمناقشة البيانية الأفقية',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `تنزل $f$ من $+\\infty$ نحو $f(\\alpha)$ ثم تصعد إلى $+\\infty$، فيوجد حلّان من أجل $\\lambda > f(\\alpha)$، وحل وحيد عند $\\lambda = f(\\alpha)$، ولا حلول إذا $\\lambda < f(\\alpha)$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			customTitle: 'التمرين الرابع — المسألة الاقتصادية الشاملة',
			instruction: `المستوي منسوب إلى معلم متعامد ومتجانس $(O ; arrow(i), arrow(j))$. تهدف المسألة لدراسة كلفة وحدوية متوسطة ناطقة وتحديد عتبة الإنتاج الأمثل.`,
			content: [
				{
					type: 'text',
					content: `*الجزء الأول: دراسة الدالة المساعدة $g$ (2 نقطتان)*\nنعتبر الدالة $g$ المعرفة على $bb(R)$ بـ: $g(x) = ${gTypst}$.\n1) ادرس اتجاه تغير الدالة $g$ على $bb(R)$.\n2) بيّن أن المعادلة $g(x) = 0$ تقبل حلاً وحيداً $alpha$ في $]1 ; 2[$، ثم تحقّق أن $${alphaLo} < alpha < ${alphaHi}$ واستنتج إشارة $g(x)$ على $]0 ; +oo[$.`,
					answer: `*الجزء الأول:*\n1) $g'(x) = ${3 * a} x^2 + ${p} > 0$ دوماً، فـ $g$ مستمرة ومتزايدة تماماً على $bb(R)$.\n2) $g(1) = ${fp1} < 0$ و $g(2) = ${gFn(2)} > 0$، فحسب TVI يوجد جذر وحيد $alpha in ]1 ; 2[$.\nالتحقق: $g(${alphaLo}) approx ${roundTo(gFn(alphaLo), 3)} < 0$ و $g(${alphaHi}) approx ${roundTo(gFn(alphaHi), 3)} > 0$، إذن $${alphaLo} < alpha < ${alphaHi}$.\nعلى $]0 ; +oo[$: $g(x) < 0$ على $]0 ; alpha[$ و $g(x) > 0$ على $]alpha ; +oo[$.`,
					mark: '2'
				},
				{
					type: 'columns',
					widths: ['1.4fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `*الجزء الثاني: دراسة الدالة الرئيسية $f$ (5 نقاط)*\nنعتبر الدالة $f$ المعرفة على $]0 ; +oo[$ بـ: $f(x) = ${fTypst}$.\n1) احسب $lim_(x arrow.r 0^+) f(x)$ وفسّر النتيجة هندسياً، ثم احسب $lim_(x arrow.r +oo) f(x)$.\n2) بيّن أن المستقيم $(Delta): y = ${linABT}$ مقارب مائل لـ $(C_f)$ بجوار $+oo$، وادرس الوضعية النسبية لـ $(C_f)$ و $(Delta)$.\n3) بيّن أن $f'(x) = frac(g(x), x^3)$ لكل $x > 0$، وشكّل جدول تغيرات $f$.`,
							answer: `1) $lim_(x arrow.r 0^+) f(x) = +oo$ لأن $frac(${r}, x^2)$ يغلب $-frac(${p}, x)$، فـ $x = 0$ مقارب عمودي. وعند $+oo$: النهاية $+oo$.\n2) $lim_(x arrow.r +oo) [f(x) - (${linABT})] = 0$، فـ $(Delta): y = ${linABT}$ مقارب مائل.\nإشارة الفرق $frac(-${p} x + ${r}, x^2)$: يتقاطعان عند $A(${fracTypst(xIntN, xIntD)}, ${fracTypst(yIntN, xIntD)})$؛ $(C_f)$ فوق $(Delta)$ على $]0 ; ${fracTypst(xIntN, xIntD)}[$ وتحته على $]${fracTypst(xIntN, xIntD)} ; +oo[$.\n3) $f'(x) = ${a} + frac(${p}, x^2) - frac(${q}, x^3) = frac(g(x), x^3)$، وإشارتها من إشارة $g(x)$ على $]0 ; +oo[$.`,
							mark: '3'
						},
						{
							type: 'image',
							src: varUrl,
							caption: 'جدول تغيرات الدالة $f$ على $]0 ; +oo[$'
						}
					]
				},
				{
					type: 'columns',
					widths: ['1.4fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `4) بيّن أن $f(alpha) = ${fAlphaExprT}$، ثم استنتج حصراً للعدد $f(alpha)$ مدوراً إلى $10^(-2)$.\n5) اكتب معادلة المماس $(T)$ عند $x_0 = 1$، ثم ناقش بيانياً حسب قيم $lambda in bb(R)$ عدد حلول المعادلة $f(x) = lambda$.`,
							answer: `4) من $g(alpha) = 0$ نجد $frac(${r}, alpha^2) = alpha + frac(${c}, alpha)$، وبالتعويض نجد $f(alpha) = ${fAlphaExprT}$.\nلأن $u arrow.r.bar 3 u ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`} - frac(${c}, u)$ متزايدة تماماً على $[1; 2]$ فإن $${fAlphaLo} < f(alpha) < ${fAlphaHi}$.\n5) $(T): ${tgTypst}$.\nالمناقشة البيانية: لا حلول إذا $lambda < f(alpha)$، حل وحيد إذا $lambda = f(alpha)$، وحلّان متمايزان موجبان إذا $lambda > f(alpha)$.`,
							mark: '2'
						},
						{
							type: 'image',
							src: curveUrl,
							caption: 'المنحنى البياني (C_f) والمقارب المائل والمماس'
						}
					]
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_ge',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`في الجزء الأول، مشتقة $g$ موجبة تماماً على $\\mathbb{R}$، فإشارة $g(x)$ تتبع موقع $x$ بالنسبة للجذر $\\alpha$.`,
				`لتبسيط $f(\\alpha)$، استعمل $2\\alpha^3 + ${p}\\alpha = 2(${r})$ بعد القسمة على $2\\alpha^2$.`,
				`في المناقشة البيانية $f(x) = \\lambda$، اعتمد على القيمة الحدية الصغرى $f(\\alpha)$ ونهايتي الدالة $+\\infty$.`
			],
			solutionStepsAr: [
				`دراسة $g(x) = ${gKatex}$ وإثبات وجود ووحدانية $\\alpha \\in ]${alphaLo} ; ${alphaHi}[$.`,
				`إثبات المقارب العمودي $x = 0$ والمقارب المائل $(\\Delta): y = ${linABK}$ والوضعية النسبية.`,
				`إثبات $f'(x) = \\frac{g(x)}{x^3}$ وحصر $f(\\alpha) \\in ]${fAlphaLo} ; ${fAlphaHi}[$ والمناقشة الأفقية.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 1 Parameterized Templates for 3AS GE BAC
// ═══════════════════════════════════════════════════════════════════════════════

export const TEMPLATES_3AS_GE_T1: ParameterizedTemplate[] = [
	tplRecurrenceSeqInduction,
	tplEconomicSeqProduction,
	tplContinuityTviAuxiliary,
	tplDerivabilityInflectionTangent,
	tplMarginalAverageCostOpt,
	tplBacEconomicAnalysisIntegration
];
