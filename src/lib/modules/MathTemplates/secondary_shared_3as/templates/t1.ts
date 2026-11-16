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
// Dual Syntax Formatters (KaTeX for Quiz / Hints / Steps, Typst for SujetExercise)
// Western digits 0-9 strictly enforced across all expressions.
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

function expTermKatex(k: number, v = 'x'): string {
	if (k === 1) return `e^{${v}}`;
	if (k === -1) return `e^{-${v}}`;
	return `e^{${k}${v}}`;
}

function expTermTypst(k: number, v = 'x'): string {
	if (k === 1) return `e^${v}`;
	if (k === -1) return `e^(-${v})`;
	return `e^(${k} ${v})`;
}

function signedTail(c: number): string {
	if (c === 0) return '';
	return c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`;
}

function formatShiftedVar(v: string, p: number): string {
	if (p === 0) return v;
	return p > 0 ? `(${v} - ${p})` : `(${v} + ${Math.abs(p)})`;
}

function assertCentralDifference(
	fn: (x: number) => number,
	fnPrime: (x: number) => number,
	points: number[],
	label: string
): void {
	const h = 1e-6;
	for (const x of points) {
		const exact = fnPrime(x);
		const approx = (fn(x + h) - fn(x - h)) / (2 * h);
		if (!Number.isFinite(exact) || !Number.isFinite(approx) || Math.abs(exact - approx) >= 1e-4) {
			throw new Error(`${label} derivative mismatch at x=${x}: exact=${exact}, approx=${approx}`);
		}
	}
}

function bisectMonotoneRoot(fn: (x: number) => number, lo: number, hi: number): number {
	let a = lo;
	let b = hi;
	let fa = fn(a);
	const fb = fn(b);
	if (fa * fb >= 0) {
		throw new Error(`TVI bracket failure on [${lo}, ${hi}]: f(lo)=${fa}, f(hi)=${fb}`);
	}
	for (let iter = 0; iter < 60; iter++) {
		const mid = 0.5 * (a + b);
		const fm = fn(mid);
		if (Math.abs(fm) < 1e-13) return mid;
		if (fa * fm < 0) {
			b = mid;
		} else {
			a = mid;
			fa = fm;
		}
	}
	const root = 0.5 * (a + b);
	if (Math.abs(fn(root)) > 1e-8) {
		throw new Error(`TVI root residual too high: |f(alpha)|=${Math.abs(fn(root))}`);
	}
	return root;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Continuity, Intermediate Value Theorem (TVI), Inflection & Tangent
// ═══════════════════════════════════════════════════════════════════════════════

const tplContinuityTviDerivability: ParameterizedTemplate = {
	id: 'tpl_3as_shared_t1_continuity_tvi_derivability',
	grade: '3as_se',
	trimesterId: 't1',
	domain: 'analysis',
	titleAr: 'الاستمرارية، مبرهنة القيم المتوسطة (TVI)، معادلة المماس ونقطة الانعطاف',
	curriculumLessonId: 'lesson_3as_se_t1_continuity_ivt_derivability',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Part 1: Piecewise continuity & real parameter m at x_c
		// h(x) = ((x - xc)(x - sc)) / (x - xc) for x != xc, and h(xc) = 2m + rc
		const xc = rng.pick(difficulty === 'easy' ? [1, 2, 3] : [1, 2, 3, -1, -2]);
		const scCandidates = [-3, -2, -1, 1, 2, 4].filter((v) => v !== xc);
		const sc = rng.pick(scCandidates);
		const numB = -(xc + sc);
		const numC = xc * sc;
		const limitH = xc - sc; // exact integer limit as x -> xc
		const mAns = rng.pick([-3, -2, -1, 1, 2, 3, 4]);
		const rc = limitH - 2 * mAns;

		// Part 2: Cubic f(x) = (x - p)^3 + q(x - p) + yI = x^3 + B x^2 + C x + D
		// Strictly increasing on R because f'(x) = 3(x - p)^2 + q >= q > 0
		// Unique inflection point Omega(p ; yI) because f''(x) = 6(x - p)
		// Unique TVI root alpha in ]p ; p + 1[ because f(p) = yI < 0 and f(p + 1) = 1 + q + yI > 0
		let p: number;
		let q: number;
		if (difficulty === 'easy') {
			p = rng.pick([1, 2]);
			q = rng.pick([2, 3]);
		} else if (difficulty === 'medium') {
			p = rng.pick([1, 2, -1, -2]);
			q = rng.pick([2, 3, 4]);
		} else {
			p = rng.pick([1, 2, -1, -2, 3]);
			q = rng.pick([3, 4, 5]);
		}
		const yIChoices: number[] = [];
		for (let val = -q; val <= -1; val++) yIChoices.push(val);
		const yI = rng.pick(yIChoices);

		const B = -3 * p;
		const C = 3 * p * p + q;
		const D = yI - p * p * p - q * p;

		const f = (x: number) => ((x - p) * (x - p) + q) * (x - p) + yI;
		const fExpanded = (x: number) => ((x + B) * x + C) * x + D;
		const fPrime = (x: number) => 3 * x * x + 2 * B * x + C;
		const fSecond = (x: number) => 6 * x + 2 * B;

		assertCentralDifference(fExpanded, fPrime, [-1.5, 0.2, 1.7, p], 'tpl1.fPrime');
		assertCentralDifference(fPrime, fSecond, [-1.5, 0.2, 1.7, p], 'tpl1.fSecond');
		if (Math.abs(f(0.7) - fExpanded(0.7)) > 1e-9) {
			throw new Error('Cubic expansion mismatch in tpl1');
		}

		const aInt = p;
		const bInt = p + 1;
		const fa = yI; // < 0
		const fb = 1 + q + yI; // >= 1 > 0
		const alpha = bisectMonotoneRoot(fExpanded, aInt, bInt);

		// Dichotomy at midpoint mid = p + 0.5
		const mid = aInt + 0.5;
		const fMid = roundTo(fExpanded(mid), 3); // exact eighth (0.125 + 0.5q + yI != 0)
		const subLo = fMid > 0 ? aInt : mid;
		const subHi = fMid > 0 ? mid : bInt;
		const otherLo = fMid > 0 ? mid : aInt;
		const otherHi = fMid > 0 ? bInt : mid;
		if (!(alpha > subLo && alpha < subHi)) {
			throw new Error(`Dichotomy mismatch: alpha=${alpha} not in ]${subLo}, ${subHi}[`);
		}

		// Tangent (T) at inflection point Omega(p ; yI): y = q(x - p) + yI = q x + kT
		const kT = yI - q * p;

		const hNumKatex = poly2Katex(1, numB, numC, 'x');
		const hNumTypst = poly2Typst(1, numB, numC, 'x');
		const hDenKatex = linearKatex(1, -xc, 'x');
		const hDenTypst = linearTypst(1, -xc, 'x');
		const hValKatex = linearKatex(2, rc, 'm');
		const hValTypst = linearTypst(2, rc, 'm');

		const fKatex = poly3Katex(1, B, C, D, 'x');
		const fTypst = poly3Typst(1, B, C, D, 'x');
		const fpKatex = poly2Katex(3, 2 * B, C, 'x');
		const fpTypst = poly2Typst(3, 2 * B, C, 'x');
		const fppKatex = linearKatex(6, 2 * B, 'x');
		const fppTypst = linearTypst(6, 2 * B, 'x');
		const shiftedX = formatShiftedVar('x', p);
		const tangentKatex = `y = ${linearKatex(q, kT, 'x')}`;
		const tangentTypst = `y = ${linearTypst(q, kT, 'x')}`;

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${mAns}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر الدالة $h$ المعرفة على $\\mathbb{R}$ بـ: $h(x) = \\frac{${hNumKatex}}{${hDenKatex}}$ من أجل $x \\neq ${xc}$، و $h(${xc}) = ${hValKatex}$. عيّن قيمة الوسيط الحقيقي $m$ حتى تكون الدالة $h$ مستمرة عند $x_0 = ${xc}$.`,
				questionTextAr: `عيّن قيمة $m$ حتى تكون $h$ مستمرة عند $x_0 = ${xc}$:`,
				questionData: {
					answer: mAns,
					displayTemplate: 'm = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `لأجل $x \\neq ${xc}$ لدينا $\\frac{${hNumKatex}}{${hDenKatex}} = \\frac{(${hDenKatex})(${linearKatex(1, -sc, 'x')})}{${hDenKatex}} = ${linearKatex(1, -sc, 'x')}$، ومنه $\\lim_{x \\to ${xc}} h(x) = ${xc} - (${sc}) = ${limitH}$. تكون $h$ مستمرة عند $${xc}$ إذا وفقط إذا كان $h(${xc}) = ${limitH}$ أي $${hValKatex} = ${limitH}$ ومنه $m = ${mAns}$.`
			};
		} else if (difficulty === 'medium') {
			const wrongSignShift = `y = ${linearKatex(q, yI + q * p, 'x')}`;
			const wrongSwapped = `y = ${linearKatex(yI, q - yI * p, 'x')}`;
			const wrongNoOrd = `y = ${linearKatex(q, -q * p, 'x')}`;
			const mcq = buildUniqueMcqOptions(
				`$${tangentKatex}$`,
				[
					{
						text: `$${wrongSignShift}$`,
						diagnosticFeedback: `انتبه لإشارة الفاصلة في دستور المماس $y = f'(${p})(x - (${p})) + f(${p})$.`
					},
					{
						text: `$${wrongSwapped}$`,
						diagnosticFeedback: `خلطت بين ميل المماس $f'(${p}) = ${q}$ والترتيبة $f(${p}) = ${yI}$.`
					},
					{
						text: `$${wrongNoOrd}$`,
						diagnosticFeedback: `نسيت إضافة الترتيبة $f(${p}) = ${yI}$ في معادلة المماس عند نقطة الانعطاف.`
					}
				],
				rng
			);
			finalAnswer = tangentKatex;
			quizQuestion = {
				type: 'mcq',
				questionText: `نعتبر الدالة $f$ المعرفة على $\\mathbb{R}$ بـ $f(x) = ${fKatex}$. ما هي معادلة المماس $(T)$ للمنحنى $(C_f)$ عند نقطة انعطافه $\\Omega$؟`,
				questionTextAr: `ما هي معادلة المماس $(T)$ للمنحنى $(C_f)$ عند نقطة انعطافه؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `لدينا $f'(x) = ${fpKatex}$ و $f''(x) = ${fppKatex} = 6${shiftedX}$. تنعدم $f''(x)$ مغيّرة إشارتها عند $x_0 = ${p}$، فنقطة الانعطاف هي $\\Omega(${p} ; ${yI})$، وميل المماس عندها $f'(${p}) = ${q}$. إذن $(T): y = ${q}${shiftedX}${signedTail(yI)} = ${linearKatex(q, kT, 'x')}$.`
			};
		} else {
			const mcq = buildUniqueMcqOptions(
				`$]${subLo} ; ${subHi}[$`,
				[
					{
						text: `$]${otherLo} ; ${otherHi}[$`,
						diagnosticFeedback: `راجع إشارة $f(${mid}) = ${fMid}$: الجذر $\\alpha$ يقع في نصف المجال الذي تغيّر فيه الدالة $f$ إشارتها.`
					},
					{
						text: `$]${aInt - 0.5} ; ${aInt}[$`,
						diagnosticFeedback: `الدالة $f$ متزايدة تماماً و $f(${aInt}) = ${fa} < 0$، فلا تنعدم على المجال $]${aInt - 0.5} ; ${aInt}[$.`
					},
					{
						text: `$]${bInt} ; ${bInt + 0.5}[$`,
						diagnosticFeedback: `الدالة $f$ متزايدة تماماً و $f(${bInt}) = ${fb} > 0$، فلا تنعدم على المجال $]${bInt} ; ${bInt + 0.5}[$.`
					}
				],
				rng
			);
			finalAnswer = `]${subLo} ; ${subHi}[`;
			quizQuestion = {
				type: 'mcq',
				questionText: `الدالة $f(x) = ${fKatex}$ مستمرة ومتزايدة تماماً على $\\mathbb{R}$، وتقبل المعادلة $f(x) = 0$ حلاً وحيداً $\\alpha \\in ]${aInt} ; ${bInt}[$. باستعمال طريقة التنصيف عند المركز $${mid}$، أيّ مجال سعته $0.5$ يحصر الجذر $\\alpha$؟`,
				questionTextAr: `أيّ مجال سعته $0.5$ يحصر الحل الوحيد $\\alpha$ للمعادلة $f(x) = 0$؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `لدينا $f(${aInt}) = ${fa} < 0$ و $f(${bInt}) = ${fb} > 0$. عند منتصف المجال $m = ${mid}$ نجد $f(${mid}) = ${fMid}$ (${fMid > 0 ? 'موجب تماماً' : 'سالب تماماً'}). وبما أن ${fMid > 0 ? `$f(${aInt}) \\times f(${mid}) < 0$` : `$f(${mid}) \\times f(${bInt}) < 0$`}، فإن $\\alpha \\in ]${subLo} ; ${subHi}[$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `يتكون هذا التمرين من جزأين مستقلين حول الاستمرارية ومبرهنة القيم المتوسطة ونقطة الانعطاف.`,
			content: [
				{
					type: 'text',
					content: `*الجزء الأول:* نعتبر الدالة $h$ المعرفة على $bb(R)$ بـ: $h(x) = frac(${hNumTypst}, ${hDenTypst})$ من أجل $x != ${xc}$، و $h(${xc}) = ${hValTypst}$ حيث $m$ وسيط حقيقي.\nعيّن قيمة العدد الحقيقي $m$ حتى تكون الدالة $h$ مستمرة عند $x_0 = ${xc}$.`,
					answer: `*الجزء الأول:* من أجل $x != ${xc}$ نحلّل البسط: $h(x) = frac((${hDenTypst})(${linearTypst(1, -sc, 'x')}), ${hDenTypst}) = ${linearTypst(1, -sc, 'x')}$.\nومنه $lim_(x arrow.r ${xc}) h(x) = ${xc} - (${sc}) = ${limitH}$.\nتكون $h$ مستمرة عند $${xc}$ إذا وفقط إذا كان $lim_(x arrow.r ${xc}) h(x) = h(${xc})$، أي $${hValTypst} = ${limitH}$، ومنه $m = ${mAns}$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `*الجزء الثاني:* نعتبر الدالة الكثيرة الحدود $f$ المعرفة على $bb(R)$ بـ: $f(x) = ${fTypst}$، وليكن $(C_f)$ تمثيلها البياني في معلم متعامد ومتجانس.\n1) احسب $f'(x)$ وتحقّق أنه من أجل كل $x in bb(R)$: $f'(x) = 3 ${shiftedX}^2 + ${q}$، ثم استنتج اتجاه تغير الدالة $f$ على $bb(R)$.\n2) بيّن أن المعادلة $f(x) = 0$ تقبل حلاً حقيقياً وحيداً $alpha$ حيث $${aInt} < alpha < ${bInt}$، ثم استنتج بطريقة التنصيف حصراً للعدد $alpha$ سعته $0.5$.`,
					answer: `*الجزء الثاني:*\n1) الدالة $f$ قابلة للاشتقاق على $bb(R)$ و $f'(x) = ${fpTypst} = 3 ${shiftedX}^2 + ${q}$.\nبما أن $3 ${shiftedX}^2 >= 0$ و $${q} > 0$، فإن $f'(x) >= ${q} > 0$ من أجل كل $x in bb(R)$، إذن الدالة $f$ متزايدة تماماً على $bb(R)$.\n2) الدالة $f$ مستمرة ومتزايدة تماماً على المجال $[${aInt} ; ${bInt}]$، ولدينا $f(${aInt}) = ${fa} < 0$ و $f(${bInt}) = ${fb} > 0$ أي $f(${aInt}) times f(${bInt}) < 0$.\nإذن حسب مبرهنة القيم المتوسطة، المعادلة $f(x) = 0$ تقبل حلاً وحيداً $alpha in ]${aInt} ; ${bInt}[$.\nعند المنتصف $x = ${mid}$ نجد $f(${mid}) = ${fMid}$، ومنه $${subLo} < alpha < ${subHi}$.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `3) احسب $f''(x)$ وبيّن أن المنحنى $(C_f)$ يقبل نقطة انعطاف وحيدة $Omega$ يُطلب تعيين إحداثييها، ثم اكتب معادلة المماس $(T)$ للمنحنى $(C_f)$ عند النقطة $Omega$.`,
					answer: `3) لدينا $f''(x) = ${fppTypst} = 6 ${shiftedX}$. تنعدم $f''(x)$ عند $x_0 = ${p}$ وتغيّر إشارتها (سالبة على $]-oo ; ${p}[$ وموجبة على $]${p} ; +oo[$).\nوبما أن $f(${p}) = ${yI}$، فإن $Omega(${p}, ${yI})$ هي نقطة انعطاف وحيدة للمنحنى $(C_f)$.\nولدينا $f'(${p}) = ${q}$، فمعادلة المماس $(T)$ عند $Omega$ هي: $y = f'(${p})${shiftedX} + f(${p}) = ${q}${shiftedX}${signedTail(yI)}$، أي $${tangentTypst}$.`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_se',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`لإثبات استمرارية $h$ عند $${xc}$، حلّل البسط باختزال العامل $(${hDenKatex})$ لحساب $\\lim_{x \\to ${xc}} h(x)$ ثم ساوِها مع $h(${xc})$.`,
				`لوحدانية الحل بمبرهنة القيم المتوسطة على $[${aInt} ; ${bInt}]$، اذكر الشروط الثلاثة: الاستمرارية، الرتابة التامة، وشرط تغيّر الإشارة $f(${aInt}) \\times f(${bInt}) < 0$.`,
				`تكون $\\Omega(x_0 ; f(x_0))$ نقطة انعطاف إذا انعدمت المشتقة الثانية $f''(x)$ عند $x_0$ مع تغيير إشارتها.`
			],
			solutionStepsAr: [
				`نهاية الدالة $h$ عند $${xc}$ تساوي $${limitH}$، وشرط الاستمرارية يعطي $m = ${mAns}$.`,
				`المشتقة $f'(x) = 3${shiftedX}^2 + ${q} > 0$، فالدالة $f$ مستمرة ومتزايدة تماماً، وبما أن $f(${aInt}) = ${fa}$ و $f(${bInt}) = ${fb}$ فإن $\\alpha \\in ]${subLo} ; ${subHi}[$.`,
				`المشتقة الثانية $f''(x) = 6${shiftedX}$ تنعدم مغيّرة إشارتها عند $x_0 = ${p}$، فنقطة الانعطاف $\\Omega(${p} ; ${yI})$ ومعادلة المماس عندها $${tangentKatex}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Exponential Function Study f(x) = (ax + b)e^(kx) + c & Variation Table
// ═══════════════════════════════════════════════════════════════════════════════

const tplExponentialFunctionStudy: ParameterizedTemplate = {
	id: 'tpl_3as_shared_t1_exponential_function_study',
	grade: '3as_se',
	trimesterId: 't1',
	domain: 'analysis',
	titleAr: 'دراسة الدالة الأسية f(x) = (ax + b)e^(kx) + c وجدول تغيراتها',
	curriculumLessonId: 'lesson_3as_se_t1_exponential_functions',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Unified design so critical point x0 is ALWAYS an integer:
		// f(x) = (a x + b) e^(k x) + c with a x0 + b = -a / k (exact non-zero integer coeffE)
		// => f'(x) = (k * a)(x - x0) e^(k x)
		let k: number;
		let a: number;
		let b: number;
		let x0: number;
		const c = rng.pick([-3, -2, -1, 1, 2, 3]);

		if (difficulty === 'easy') {
			k = 1;
			a = rng.pick([1, 2, -1, -2]);
			x0 = 0; // f(0) = c - a is an exact integer!
			b = -a;
		} else if (difficulty === 'medium') {
			k = rng.pick([1, -1]);
			a = rng.pick([1, 2, -1, -2]);
			x0 = rng.pick([-1, 0, 1, 2]);
			b = k === 1 ? -a * (x0 + 1) : a * (1 - x0);
		} else {
			k = 2;
			const m = rng.pick([1, 2, -1, -2]);
			a = 2 * m;
			x0 = rng.pick([-1, 0, 1]);
			b = -m * (2 * x0 + 1);
		}

		const derivLead = k * a; // f'(x) = derivLead * (x - x0) * e^(k x)
		const coeffEAtX0 = -a / k; // exact integer: a * x0 + b
		if (!Number.isInteger(coeffEAtX0)) {
			throw new Error('Non-integer extremum coefficient in tpl2');
		}

		const f = (x: number) => (a * x + b) * Math.exp(k * x) + c;
		const fPrime = (x: number) => derivLead * (x - x0) * Math.exp(k * x);
		assertCentralDifference(f, fPrime, [-1.2, -0.4, 0.3, 1.1, x0], 'tpl2.fPrime');

		// Exact formatted expressions for f(x0) across Katex, Typst, and plain SVG label
		const expPow = k * x0;
		let fx0Katex: string;
		let fx0Typst: string;
		let fx0SvgLabel: string;
		if (expPow === 0) {
			const exactInt = coeffEAtX0 + c;
			fx0Katex = `${exactInt}`;
			fx0Typst = `${exactInt}`;
			fx0SvgLabel = `${exactInt}`;
		} else {
			const ePartK = expPow === 1 ? 'e' : `e^{${expPow}}`;
			const ePartT = expPow === 1 ? 'e' : expPow > 0 ? `e^${expPow}` : `e^(${expPow})`;
			const ePartS = expPow === 1 ? 'e' : `e^(${expPow})`;
			const headK =
				coeffEAtX0 === 1 ? ePartK : coeffEAtX0 === -1 ? `-${ePartK}` : `${coeffEAtX0}${ePartK}`;
			const headT =
				coeffEAtX0 === 1 ? ePartT : coeffEAtX0 === -1 ? `-${ePartT}` : `${coeffEAtX0} ${ePartT}`;
			const headS =
				coeffEAtX0 === 1 ? ePartS : coeffEAtX0 === -1 ? `-${ePartS}` : `${coeffEAtX0}${ePartS}`;
			fx0Katex = `${headK}${signedTail(c)}`;
			fx0Typst = `${headT}${signedTail(c)}`;
			fx0SvgLabel = `${headS}${signedTail(c)}`;
		}

		// Limits at -inf and +inf
		const limNegInfKatex = k > 0 ? `${c}` : a > 0 ? '-\\infty' : '+\\infty';
		const limPosInfKatex = k > 0 ? (a > 0 ? '+\\infty' : '-\\infty') : `${c}`;
		const limNegInfTypst = k > 0 ? `${c}` : a > 0 ? '-oo' : '+oo';
		const limPosInfTypst = k > 0 ? (a > 0 ? '+oo' : '-oo') : `${c}`;
		const limNegInfSvg = k > 0 ? `${c}` : a > 0 ? '-∞' : '+∞';
		const limPosInfSvg = k > 0 ? (a > 0 ? '+∞' : '-∞') : `${c}`;
		const asymNeighborhoodAr = k > 0 ? 'بجوار $-oo$' : 'بجوار $+oo$';
		const asymNeighborhoodKatex = k > 0 ? 'بجوار $-\\infty$' : 'بجوار $+\\infty$';

		const isMin = derivLead > 0;
		const leftSign: '+' | '-' = isMin ? '-' : '+';
		const rightSign: '+' | '-' = isMin ? '+' : '-';

		const varTableSvg = svgVariationTable({
			fnName: 'f(x)',
			derivName: "f'(x)",
			xValues: ['-∞', `${x0}`, '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: leftSign },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: rightSign }
			],
			variations: [
				{ value: limNegInfSvg, position: isMin ? 'top' : 'bottom' },
				{ value: fx0SvgLabel, position: isMin ? 'bottom' : 'top' },
				{ value: limPosInfSvg, position: isMin ? 'top' : 'bottom' }
			]
		});
		const varTableUrl = saveSvgAsset(`3as_shared_t1_exp_vartable_${difficulty}_s${seed}`, varTableSvg);

		const linABKatex = linearKatex(a, b, 'x');
		const linABTypst = linearTypst(a, b, 'x');
		const fKatex = `(${linABKatex})${expTermKatex(k, 'x')}${signedTail(c)}`;
		const fTypst = `(${linABTypst}) ${expTermTypst(k, 'x')}${signedTail(c)}`;

		const shiftedX = formatShiftedVar('x', x0);
		const leadFactorK =
			derivLead === 1 ? '' : derivLead === -1 ? '-' : `${derivLead}`;
		const leadFactorT =
			derivLead === 1 ? '' : derivLead === -1 ? '-' : `${derivLead} `;
		const fpFactoredKatex = `${leadFactorK}${shiftedX}${expTermKatex(k, 'x')}`;
		const fpFactoredTypst = `${leadFactorT}${shiftedX} ${expTermTypst(k, 'x')}`;

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			const exactVal = coeffEAtX0 + c;
			finalAnswer = `${exactVal}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر الدالة $f$ المعرفة على $\\mathbb{R}$ بـ: $f(x) = ${fKatex}$. احسب القيمة الحدية المحلية للدالة $f$ على $\\mathbb{R}$.`,
				questionTextAr: `احسب القيمة الحدية المحلية للدالة $f(x) = ${fKatex}$:`,
				questionData: {
					answer: exactVal,
					displayTemplate: 'f(x_0) = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `لدينا $f'(x) = ${fpFactoredKatex}$، وتنعدم مغيّرة إشارتها عند $x_0 = 0$. إذن القيمة الحدية المحلية هي $f(0) = (${b})e^0${signedTail(c)} = ${exactVal}$.`
			};
		} else {
			// MCQ on the factored derivative f'(x) (does not get spoiled by variation table!)
			const wrongForgotProduct = `${a}${expTermKatex(k, 'x')}`;
			const wrongSignShift = `${leadFactorK}${formatShiftedVar('x', x0 === 0 ? 1 : -x0)}${expTermKatex(k, 'x')}`;
			const wrongKeepConst = `(${linABKatex})${expTermKatex(k, 'x')}`;
			const mcq = buildUniqueMcqOptions(
				`$f'(x) = ${fpFactoredKatex}$`,
				[
					{
						text: `$f'(x) = ${wrongForgotProduct}$`,
						diagnosticFeedback: `طبّق قاعدة مشتق الجداء $(u \\cdot v)' = u'v + uv'$ ولا تشتق العامل الخطي وحده.`
					},
					{
						text: `$f'(x) = ${wrongSignShift}$`,
						diagnosticFeedback: `تحقق من جمع الحدود المتشابهة عند إخراج العامل المشترك $${expTermKatex(k, 'x')}$.`
					},
					{
						text: `$f'(x) = ${wrongKeepConst}$`,
						diagnosticFeedback: `لم تضف مشتق العامل الأول $(${linABKatex})' = ${a}$ عند تطبيق مشتق الجداء.`
					}
				],
				rng
			);
			finalAnswer = `f'(x) = ${fpFactoredKatex}`;
			quizQuestion = {
				type: 'mcq',
				questionText: `ما هي العبارة المحلّلة للدالة المشتقة $f'(x)$ للدالة $f(x) = ${fKatex}$ المعرفة على $\\mathbb{R}$؟`,
				questionTextAr: `ما هي عبارة $f'(x)$ للدالة $f(x) = ${fKatex}$؟`,
				imageUrl: varTableUrl,
				imageCaption: `جدول تغيرات الدالة f على R`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `بتطبيق قاعدة مشتق جداء دالتين ومشتق $e^{kx}$ (وهو $k e^{kx}$): $f'(x) = ${a}${expTermKatex(k, 'x')} + ${k === 1 ? '' : k === -1 ? '-' : k}(${linABKatex})${expTermKatex(k, 'x')} = ${fpFactoredKatex}$.`
			};
		}

		const extremumKindAr = isMin ? 'قيمة حدية صغرى شاملة' : 'قيمة حدية عظمى شاملة';

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر الدالة العددية $f$ المعرفة على $bb(R)$ بـ: $f(x) = ${fTypst}$، وليكن $(C_f)$ تمثيلها البياني في معلم متعامد ومتجانس $(O ; arrow(i), arrow(j))$.`,
			content: [
				{
					type: 'text',
					content: `1) احسب $lim_(x arrow.r -oo) f(x)$ و $lim_(x arrow.r +oo) f(x)$ باستعمال التزايد المقارن، ثم فسّر النتيجة هندسياً.`,
					answer: `1) حساب النهايات:\n- عند $-oo$: $lim_(x arrow.r -oo) f(x) = ${limNegInfTypst}$.\n- عند $+oo$: $lim_(x arrow.r +oo) f(x) = ${limPosInfTypst}$ (باستعمال التزايد المقارن للدالة الأسية).\nالتفسير الهندسي: المنحنى $(C_f)$ يقبل مستقيماً مقارباً أفقياً معادلته $y = ${c}$ ${asymNeighborhoodAr}.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) بيّن أنه من أجل كل عدد حقيقي $x$: $f'(x) = ${fpFactoredTypst}$، ثم ادرس إشارة $f'(x)$ واستنتج اتجاه تغير الدالة $f$ على $bb(R)$.`,
					answer: `2) الدالة $f$ قابلة للاشتقاق على $bb(R)$، وبتطبيق مشتق الجداء:\n$f'(x) = ${a} ${expTermTypst(k, 'x')} + (${k})(${linABTypst}) ${expTermTypst(k, 'x')} = (${linearTypst(derivLead, -derivLead * x0, 'x')}) ${expTermTypst(k, 'x')} = ${fpFactoredTypst}$.\nبما أن $${expTermTypst(k, 'x')} > 0$ دوماً على $bb(R)$، فإن إشارة $f'(x)$ من إشارة $${leadFactorT}${shiftedX}$:\n- تنعدم $f'(x)$ عند $x_0 = ${x0}$.\n- على $]-oo ; ${x0}[$: $f'(x) ${isMin ? '< 0' : '> 0'}$ فالدالة $f$ ${isMin ? 'متناقصة تماماً' : 'متزايدة تماماً'}.\n- على $]${x0} ; +oo[$: $f'(x) ${isMin ? '> 0' : '< 0'}$ فالدالة $f$ ${isMin ? 'متزايدة تماماً' : 'متناقصة تماماً'}.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `3) احسب القيمة الحدية المحلية $f(${x0})$ وحدّد طبيعتها، ثم شكّل جدول تغيرات الدالة $f$ على $bb(R)$.`,
					answer: `3) لدينا $f(${x0}) = (${coeffEAtX0}) ${expTermTypst(k, `(${x0})`)}${signedTail(c)} = ${fx0Typst}$، وهي ${extremumKindAr} للدالة $f$ على $bb(R)$. جدول التغيرات مبيّن أسفله.`,
					mark: '1.5'
				},
				{
					type: 'image',
					src: varTableUrl,
					caption: 'جدول تغيرات الدالة $f$ على $bb(R)$'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_se',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`تذكّر نهاية التزايد المقارن المرجعية: $\\lim_{t \\to -\\infty} t e^t = 0$ و $\\lim_{t \\to -\\infty} e^t = 0$.`,
				`استعمل قاعدة اشتقاق الجداء $(u v)' = u' v + u v'$ مع $(e^{kx})' = k e^{kx}$ ثم استخرج $e^{kx}$ عاملاً مشتركاً.`,
				`بما أن $e^{kx} > 0$ من أجل كل $x \\in \\mathbb{R}$، فإن إشارة $f'(x)$ هي نفس إشارة العامل الخطي $${leadFactorK}${shiftedX}$.`
			],
			solutionStepsAr: [
				`حساب النهايتين: $\\lim_{x \\to -\\infty} f(x) = ${limNegInfKatex}$ و $\\lim_{x \\to +\\infty} f(x) = ${limPosInfKatex}$، مع مستقيم مقارب أفقي $y = ${c}$ ${asymNeighborhoodKatex}.`,
				`حساب المشتقة: $f'(x) = ${fpFactoredKatex}$ وتحديد انعدامها عند $x_0 = ${x0}$.`,
				`حساب القيمة الحدية $f(${x0}) = ${fx0Katex}$ (${extremumKindAr}) وتشكيل جدول التغيرات.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Logarithmic Equations / Domain & Differential Equation y' = ay + b
// ═══════════════════════════════════════════════════════════════════════════════

const tplLogarithmicDiffEq: ParameterizedTemplate = {
	id: 'tpl_3as_shared_t1_logarithmic_diff_eq',
	grade: '3as_se',
	trimesterId: 't1',
	domain: 'analysis',
	titleAr: 'المعادلات اللوغاريتمية والمعادلات التفاضلية من الشكل y\' = ay + b',
	curriculumLessonId: 'lesson_3as_se_t1_logarithmic_functions_diff_eq',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Part 2: Differential Equation (E): y' = ad * y + bd with y(0) = y0
		// Choose bd = -ad * K so steady state -bd / ad = K is an exact non-zero integer
		const ad = rng.pick([-3, -2, -1, 2, 3]);
		const K = rng.pick([-4, -3, -2, -1, 1, 2, 3, 4]);
		const bd = -ad * K;
		const C0 = rng.pick([-3, -2, -1, 1, 2, 3, 4]);
		const y0 = K + C0;
		const mBridge = rng.pick([2, 3, 5]);
		const targetVal = K + C0 * mBridge; // h(x) = targetVal <=> e^(ad * x) = mBridge <=> x = ln(mBridge) / ad

		const hSol = (x: number) => C0 * Math.exp(ad * x) + K;
		const hSolPrime = (x: number) => C0 * ad * Math.exp(ad * x);
		assertCentralDifference(hSol, hSolPrime, [-0.8, 0, 0.5, 1.1], 'tpl3.hSolPrime');
		if (Math.abs(hSol(0) - y0) > 1e-9 || Math.abs(hSolPrime(0.4) - (ad * hSol(0.4) + bd)) > 1e-8) {
			throw new Error('Differential equation solution check failed in tpl3');
		}

		const c0TermK = C0 === 1 ? '' : C0 === -1 ? '-' : `${C0}`;
		const c0TermT = C0 === 1 ? '' : C0 === -1 ? '-' : `${C0} `;
		const hExprKatex = `${c0TermK}${expTermKatex(ad, 'x')}${signedTail(K)}`;
		const hExprTypst = `${c0TermT}${expTermTypst(ad, 'x')}${signedTail(K)}`;
		const diffEqKatex = `y' = ${linearKatex(ad, bd, 'y')}`;
		const diffEqTypst = `y' = ${linearTypst(ad, bd, 'y')}`;

		// Part 1: Logarithmic Domain & Equation
		if (difficulty === 'easy') {
			// ln(p x + q) = ln(r x + s) with p > r >= 1 and exact integer root xStar in D
			const xStar = rng.pick([1, 2, 3, 4, 5]);
			const r = rng.pick([1, 2]);
			const p = r + rng.pick([1, 2, 3]);
			const argVal = rng.pick([3, 4, 5, 6, 7]); // positive common value inside ln(...)
			const q = argVal - p * xStar;
			const s = argVal - r * xStar;

			// Domain: x > -q/p and x > -s/r => x > max(-q/p, -s/r)
			const bound1 = -q / p;
			const bound2 = -s / r;
			const useFirst = bound1 >= bound2;
			const domKatex = useFirst ? fracKatex(-q, p) : fracKatex(-s, r);
			const domTypst = useFirst ? fracTypst(-q, p) : fracTypst(-s, r);
			if (!(p * xStar + q > 0 && r * xStar + s > 0)) {
				throw new Error('Logarithmic domain failure in tpl3 easy');
			}

			const lhsK = `\\ln(${linearKatex(p, q, 'x')})`;
			const rhsK = `\\ln(${linearKatex(r, s, 'x')})`;
			const lhsT = `ln(${linearTypst(p, q, 'x')})`;
			const rhsT = `ln(${linearTypst(r, s, 'x')})`;

			return {
				templateId: this.id,
				seed,
				grade: '3as_se',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: `حلّ في $\\mathbb{R}$ المعادلة اللوغاريتمية: $${lhsK} = ${rhsK}$ (أدخل الحل المقبول).`,
					questionTextAr: `ما هو حل المعادلة $${lhsK} = ${rhsK}$؟`,
					questionData: {
						answer: xStar,
						displayTemplate: 'x = ?',
						variables: [],
						tolerance: 0
					},
					explanation: `يشترط أن يكون $${linearKatex(p, q, 'x')} > 0$ و $${linearKatex(r, s, 'x')} > 0$ أي $x \\in ]${domKatex} ; +\\infty[$. على هذه المجموعة تكافئ المعادلة $${linearKatex(p, q, 'x')} = ${linearKatex(r, s, 'x')}$ أي $${p - r}x = ${s - q}$ ومنه $x = ${xStar}$ وهو ينتمي إلى مجموعة التعريف (إذ $${p}(${xStar})${signedTail(q)} = ${argVal} > 0$).`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: `يتكون هذا التمرين من جزأين مستقلين حول المعادلات اللوغاريتمية والمعادلات التفاضلية الخطية من الرتبة الأولى.`,
					content: [
						{
							type: 'text',
							content: `*الجزء الأول:* نعتبر المعادلة $(E_1)$ ذات المجهول الحقيقي $x$: $${lhsT} = ${rhsT}$.\n1) عيّن مجموعة التعريف $D$ للمعادلة $(E_1)$.\n2) حلّ في المجموعة $D$ المعادلة $(E_1)$.`,
							answer: `*الجزء الأول:*\n1) تكون المعادلة $(E_1)$ معرّفة إذا وفقط إذا كان $${linearTypst(p, q, 'x')} > 0$ و $${linearTypst(r, s, 'x')} > 0$، أي $x > ${fracTypst(-q, p)}$ و $x > ${fracTypst(-s, r)}$، ومنه $D = ]${domTypst} ; +oo[$.\n2) من أجل كل $x in D$: $${lhsT} = ${rhsT} arrow.r.l.double ${linearTypst(p, q, 'x')} = ${linearTypst(r, s, 'x')} arrow.r.l.double ${p - r} x = ${s - q} arrow.r.l.double x = ${xStar}$.\nوبما أن $${xStar} in D$، فإن مجموعة الحلول هي $S = { ${xStar} }$.`,
							mark: '2'
						},
						{
							type: 'text',
							content: `*الجزء الثاني:* نعتبر المعادلة التفاضلية $(E_2)$: $${diffEqTypst}$.\n1) حلّ في $bb(R)$ المعادلة التفاضلية $(E_2)$.\n2) عيّن الحل الخاص $h$ للمعادلة $(E_2)$ الذي يحقّق الشرط الابتدائي $h(0) = ${y0}$.`,
							answer: `*الجزء الثاني:*\n1) المعادلة $(E_2)$ من الشكل $y' = a y + b$ حيث $a = ${ad}$ و $b = ${bd}$. حلولها العامة على $bb(R)$ هي الدوال $x arrow.r.bar C ${expTermTypst(ad, 'x')} - frac(${bd}, ${ad})$ أي $y(x) = C ${expTermTypst(ad, 'x')}${signedTail(K)}$ حيث $C in bb(R)$.\n2) الشرط $h(0) = ${y0}$ يكافئ $C + (${K}) = ${y0}$ ومنه $C = ${C0}$. إذن الحل الخاص هو: $h(x) = ${hExprTypst}$.`,
							mark: '2'
						}
					]
				},
				hints: [
					`ابدأ دائماً بتحديد مجموعة تعريف المعادلة اللوغاريتمية بفرض ما بداخل كل $\\ln$ موجباً تماماً ($> 0$).`,
					`استعمل تكافؤ الرتابة التامة للدالة $\\ln$ على $]0 ; +\\infty[$: $\\ln(A) = \\ln(B) \\iff A = B$.`,
					`الحل العام للمعادلة التفاضلية $y' = a y + b$ ($a \\neq 0$) على $\\mathbb{R}$ هو $y(x) = C e^{ax} - \\frac{b}{a}$.`
				],
				solutionStepsAr: [
					`مجموعة التعريف $D = ]${domKatex} ; +\\infty[$، وحل المعادلة اللوغاريتمية يعطي $x = ${xStar} \\in D$.`,
					`الحل العام للمعادلة التفاضلية $${diffEqKatex}$ هو $y(x) = C ${expTermKatex(ad, 'x')}${signedTail(K)}$.`,
					`التعويض بالشرط الابتدائي $h(0) = ${y0}$ يعطي $C = ${C0}$، ومنه $h(x) = ${hExprKatex}$.`
				],
				finalAnswer: `${xStar}`
			};
		}

		// medium & hard: ln(x - u) + ln(x + v) = ln(W) with accepted root x1 = u + d > u and rejected root x2 = -(v + d) < -v
		const u = rng.pick([1, 2, 3]);
		const v = rng.pick([1, 2, 3, 4]);
		const dStep = rng.pick([1, 2, 3, 4]);
		const xAccepted = u + dStep;
		const xRejected = -(v + dStep);
		const W = dStep * (u + v + dStep);
		const quadB = v - u;
		const quadC = -(u * v + W);

		if ((xAccepted - u) * (xAccepted + v) !== W || (xRejected - u) * (xRejected + v) !== W) {
			throw new Error('Logarithmic quadratic identity failure in tpl3');
		}

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'medium') {
			const mcq = buildUniqueMcqOptions(
				`$S = \\{ ${xAccepted} \\}$`,
				[
					{
						text: `$S = \\{ ${xRejected} ; ${xAccepted} \\}$`,
						diagnosticFeedback: `انتبه لمجموعة التعريف $D = ]${u} ; +\\infty[$! الجذر $x = ${xRejected}$ مرفوض لأنه يجعل $x - ${u} < 0$.`
					},
					{
						text: `$S = \\{ ${xRejected} \\}$`,
						diagnosticFeedback: `العدد $${xRejected}$ لا ينتمي إلى مجموعة التعريف $]${u} ; +\\infty[$، بينما $${xAccepted} > ${u}$ هو الحل المقبول.`
					},
					{
						text: `$S = \\varnothing$`,
						diagnosticFeedback: `المعادلة تقبل حلاً مقبولاً لأن $x_1 = ${xAccepted} > ${u}$ يحقق الشرط $x \\in ]${u} ; +\\infty[$.`
					}
				],
				rng
			);
			finalAnswer = `S = { ${xAccepted} }`;
			quizQuestion = {
				type: 'mcq',
				questionText: `ما هي مجموعة حلول المعادلة اللوغاريتمية $\\ln(x - ${u}) + \\ln(x + ${v}) = \\ln(${W})$ في $\\mathbb{R}$؟`,
				questionTextAr: `ما هي مجموعة حلول $\\ln(x - ${u}) + \\ln(x + ${v}) = \\ln(${W})$ في $\\mathbb{R}$؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `مجموعة التعريف تشترط $x - ${u} > 0$ و $x + ${v} > 0$ أي $x \\in D = ]${u} ; +\\infty[$. على $D$ تصبح المعادلة $\\ln[(x - ${u})(x + ${v})] = \\ln(${W})$ أي $${poly2Katex(1, quadB, quadC, 'x')} = 0$، وجذراها $x_1 = ${xAccepted} \\in D$ (مقبول) و $x_2 = ${xRejected} \\notin D$ (مرفوض). إذن $S = \\{ ${xAccepted} \\}$.`
			};
		} else {
			// hard: MCQ on the particular differential-equation solution h(x)
			const wrongSignSteady = `${c0TermK}${expTermKatex(ad, 'x')}${signedTail(-K)}`;
			const wrongCIsY0 = `${y0 === 1 ? '' : y0 === -1 ? '-' : y0}${expTermKatex(ad, 'x')}${signedTail(K)}`;
			const wrongExpSign = `${c0TermK}${expTermKatex(-ad, 'x')}${signedTail(K)}`;
			const mcq = buildUniqueMcqOptions(
				`$h(x) = ${hExprKatex}$`,
				[
					{
						text: `$h(x) = ${wrongSignSteady}$`,
						diagnosticFeedback: `انتبه لإشارة الثابت في الحل العام $y(x) = C e^{ax} - \\frac{b}{a}$: هنا $-\\frac{${bd}}{${ad}} = ${K}$.`
					},
					{
						text: `$h(x) = ${wrongCIsY0}$`,
						diagnosticFeedback: `عند $x = 0$ لدينا $e^0 = 1$، فيكون $h(0) = C + (${K}) = ${y0}$ أي $C = ${C0}$ وليس $C = ${y0}$.`
					},
					{
						text: `$h(x) = ${wrongExpSign}$`,
						diagnosticFeedback: `معامل $x$ في الأسّ هو $a = ${ad}$ نفسه في المعادلة $y' = a y + b$.`
					}
				],
				rng
			);
			finalAnswer = `h(x) = ${hExprKatex}`;
			quizQuestion = {
				type: 'mcq',
				questionText: `ما هو الحل الخاص $h$ للمعادلة التفاضلية $(E): ${diffEqKatex}$ الذي يحقق الشرط الابتدائي $h(0) = ${y0}$؟`,
				questionTextAr: `عيّن الحل الخاص $h$ للمعادلة $${diffEqKatex}$ حيث $h(0) = ${y0}$:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الحل العام للمعادلة $${diffEqKatex}$ على $\\mathbb{R}$ هو $y(x) = C${expTermKatex(ad, 'x')} - \\frac{${bd}}{${ad}} = C${expTermKatex(ad, 'x')}${signedTail(K)}$. الشرط $h(0) = ${y0}$ يعطي $C + (${K}) = ${y0}$ أي $C = ${C0}$، ومنه $h(x) = ${hExprKatex}$.`
			};
		}

		const xBridgeTypst = ad < 0 ? `-frac(ln(${mBridge}), ${Math.abs(ad)})` : ad === 1 ? `ln(${mBridge})` : `frac(ln(${mBridge}), ${ad})`;
		const xBridgeKatex = ad < 0 ? `-\\frac{\\ln(${mBridge})}{${Math.abs(ad)}}` : ad === 1 ? `\\ln(${mBridge})` : `\\frac{\\ln(${mBridge})}{${ad}}`;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `يتكون هذا التمرين من جزأين مستقلين حول المعادلات اللوغاريتمية والمعادلة التفاضلية $y' = a y + b$.`,
			content: [
				{
					type: 'text',
					content: `*الجزء الأول:* نعتبر المعادلة اللوغاريتمية $(E_1)$: $ln(x - ${u}) + ln(x + ${v}) = ln(${W})$.\n1) عيّن مجموعة التعريف $D$ للمعادلة $(E_1)$.\n2) حلّ في المجموعة $D$ المعادلة $(E_1)$.`,
					answer: `*الجزء الأول:*\n1) يشترط أن يكون $x - ${u} > 0$ و $x + ${v} > 0$، أي $x > ${u}$ و $x > ${-v}$، ومنه $D = ]${u} ; +oo[$.\n2) من أجل كل $x in D$: باستعمال الخاصية $ln(A) + ln(B) = ln(A B)$ نحصل على $ln((x - ${u})(x + ${v})) = ln(${W})$، وهذا يكافئ:\n$${poly2Typst(1, quadB, quadC, 'x')} = 0$.\nمميزها $Delta = ${quadB * quadB - 4 * quadC} = ${(quadB === 0 ? 0 : quadB) ** 2 - 4 * quadC} = (${2 * dStep + u + v})^2$، فجذراها هما $x_1 = ${xAccepted}$ و $x_2 = ${xRejected}$.\nبما أن $${xAccepted} in D$ و $${xRejected} in.not D$، فإن مجموعة حلول $(E_1)$ هي $S = { ${xAccepted} }$.`,
					mark: '2'
				},
				{
					type: 'text',
					content: `*الجزء الثاني:* نعتبر المعادلة التفاضلية $(E_2)$: $${diffEqTypst}$.\n1) عيّن الحلول العامة للمعادلة $(E_2)$ على $bb(R)$، ثم استنتج الحل الخاص $h$ الذي يحقق $h(0) = ${y0}$.\n2) حلّ في $bb(R)$ المعادلة $h(x) = ${targetVal}$ (تُعطى القيمة المضبوطة للحل باستعمال $ln$).`,
					answer: `*الجزء الثاني:*\n1) الحلول العامة للمعادلة $${diffEqTypst}$ هي $y(x) = C ${expTermTypst(ad, 'x')} - frac(${bd}, ${ad}) = C ${expTermTypst(ad, 'x')}${signedTail(K)}$ ($C in bb(R)$).\nمن الشرط $h(0) = ${y0}$ نجد $C + (${K}) = ${y0}$ أي $C = ${C0}$، ومنه $h(x) = ${hExprTypst}$.\n2) المعادلة $h(x) = ${targetVal}$ تكافئ $${c0TermT}${expTermTypst(ad, 'x')} = ${C0 * mBridge}$ أي $${expTermTypst(ad, 'x')} = ${mBridge}$، وبإدخال اللوغاريتم النيبيري نجد $${ad} x = ln(${mBridge})$ أي $x = ${xBridgeTypst}$.`,
					mark: '2'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_se',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`مجموعة تعريف $\\ln(x - ${u}) + \\ln(x + ${v})$ هي تقاطع الشرطين $x > ${u}$ و $x > ${-v}$ أي $D = ]${u} ; +\\infty[$.`,
				`لا تطبّق الخاصية $\\ln(A) + \\ln(B) = \\ln(AB)$ إلا بعد حصر $x$ في مجموعة التعريف $D$، وارفض كل جذر خارج $D$.`,
				`في المعادلة التفاضلية $y' = a y + b$، الحل العام هو $y(x) = C e^{ax} - \\frac{b}{a}$، وبالتعويض بـ $x = 0$ استخرج الثابت $C$.`
			],
			solutionStepsAr: [
				`تحديد مجموعة التعريف $D = ]${u} ; +\\infty[$، وتحويل المعادلة إلى $${poly2Katex(1, quadB, quadC, 'x')} = 0$؛ قبول $x_1 = ${xAccepted}$ ورفض $x_2 = ${xRejected}$.`,
				`إيجاد الحل العام $y(x) = C${expTermKatex(ad, 'x')}${signedTail(K)}$ والحل الخاص $h(x) = ${hExprKatex}$.`,
				`حل المعادلة $h(x) = ${targetVal}$ يعطي $x = ${xBridgeKatex}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Comparative Growth Limits, Oblique Asymptote y = ax + b & Relative Position
// ═══════════════════════════════════════════════════════════════════════════════

const tplObliqueAsymptotePosition: ParameterizedTemplate = {
	id: 'tpl_3as_shared_t1_oblique_asymptote_position',
	grade: '3as_se',
	trimesterId: 't1',
	domain: 'analysis',
	titleAr: 'النهايات بالتزايد المقارن، المستقيم المقارب المائل والوضعية النسبية',
	curriculumLessonId: 'lesson_3as_se_t1_limits_asymptotes_comparative_growth',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		if (difficulty === 'hard') {
			// Logarithmic comparative growth on ]0 ; +oo[:
			// f(x) = a x + b + c * ln(x) / x
			const a = rng.pick([1, 2]);
			const b = rng.pick([-2, -1, 1, 2, 3]);
			const c = rng.pick([2, 3, -2, -3]);
			const yA = a + b; // intersection A(1 ; a + b) because ln(1) = 0

			const f = (x: number) => a * x + b + (c * Math.log(x)) / x;
			const fPrime = (x: number) => a + (c * (1 - Math.log(x))) / (x * x);
			assertCentralDifference(f, fPrime, [0.5, 1, 2, 3.5], 'tpl4.hard.fPrime');

			const curveSvg = svgFunctionCurvePlot({
				xMin: -0.5,
				xMax: 5.5,
				yMin: Math.min(-3, yA - 4),
				yMax: Math.max(8, a * 5 + b + 2),
				fn: (x: number) => (x > 0.08 ? f(x) : NaN),
				curveLabel: '(C_f)',
				asymptotes: [
					{ kind: 'vertical', value: 0, label: 'x=0', color: '#dc2626' },
					{ kind: 'oblique', a, b, label: '(Delta)', color: '#059669' }
				],
				points: [{ x: 1, y: yA, label: `A(1, ${yA})`, color: '#b91c1c' }],
				width: 380,
				height: 250
			});
			const curveUrl = saveSvgAsset(`3as_shared_t1_asym_curve_${difficulty}_s${seed}`, curveSvg);

			const linABK = linearKatex(a, b, 'x');
			const linABT = linearTypst(a, b, 'x');
			const cSign = c > 0 ? '+' : '-';
			const absC = Math.abs(c);
			const fKatex = `${linABK} ${cSign} \\frac{${absC}\\ln(x)}{x}`;
			const fTypst = `${linABT} ${cSign} frac(${absC} ln(x), x)`;

			const aboveOnRight = c > 0;
			const correctPosAr = aboveOnRight
				? `$(C_f)$ تحت $(\\Delta)$ على $]0 ; 1[$ وفوق $(\\Delta)$ على $]1 ; +\\infty[$ ويتقاطعان في $A(1 ; ${yA})$`
				: `$(C_f)$ فوق $(\\Delta)$ على $]0 ; 1[$ وتحت $(\\Delta)$ على $]1 ; +\\infty[$ ويتقاطعان في $A(1 ; ${yA})$`;
			const reversedPosAr = aboveOnRight
				? `$(C_f)$ فوق $(\\Delta)$ على $]0 ; 1[$ وتحت $(\\Delta)$ على $]1 ; +\\infty[$ ويتقاطعان في $A(1 ; ${yA})$`
				: `$(C_f)$ تحت $(\\Delta)$ على $]0 ; 1[$ وفوق $(\\Delta)$ على $]1 ; +\\infty[$ ويتقاطعان في $A(1 ; ${yA})$`;

			const mcq = buildUniqueMcqOptions(
				correctPosAr,
				[
					{
						text: reversedPosAr,
						diagnosticFeedback: `راجع إشارة $\\ln(x)$: تكون $\\ln(x) < 0$ على $]0 ; 1[$ و $\\ln(x) > 0$ على $]1 ; +\\infty[$، ثم اضرب في $c = ${c}$.`
					},
					{
						text: `$(C_f)$ يقع دوماً فوق $(\\Delta)$ على كامل المجال $]0 ; +\\infty[$ دون تقاطع`,
						diagnosticFeedback: `انتبه: $\\ln(x)$ تنعدم عند $x = 1$ وتغيّر إشارتها على $]0 ; +\\infty[$.`
					},
					{
						text: `$(C_f)$ يقطع $(\\Delta)$ عند الفاصلة $x = e$ في النقطة $A(e ; ${a}e${signedTail(b)})$`,
						diagnosticFeedback: `الفرق $\\frac{${c}\\ln(x)}{x}$ ينعدم عندما $\\ln(x) = 0$ أي $x = 1$ وليس $x = e$.`
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '3as_se',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `نعتبر على $]0 ; +\\infty[$ الدالة $f(x) = ${fKatex}$ والمستقيم المقارب المائل $(\\Delta): y = ${linABK}$. ما هي الوضعية النسبية الصحيحة للمنحنى $(C_f)$ بالنسبة إلى $(\\Delta)$؟`,
					questionTextAr: `حدّد الوضعية النسبية للمنحنى $(C_f)$ والمقارب المائل $(\\Delta): y = ${linABK}$:`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `ندرس إشارة الفرق $f(x) - (${linABK}) = \\frac{${c}\\ln(x)}{x}$ على $]0 ; +\\infty[$. بما أن $x > 0$، فالإشارة من إشارة $${c}\\ln(x)$ التي تنعدم عند $x = 1$، ومنه ${correctPosAr}.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: `نعتبر الدالة $f$ المعرفة على المجال $]0 ; +oo[$ بـ: $f(x) = ${fTypst}$، وليكن $(C_f)$ تمثيلها البياني في معلم متعامد ومتجانس.`,
					content: [
						{
							type: 'text',
							content: `1) احسب $lim_(x arrow.r 0^+) f(x)$ وفسّر النتيجة هندسياً، ثم احسب $lim_(x arrow.r +oo) f(x)$ باستعمال التزايد المقارن.`,
							answer: `1) لدينا $lim_(x arrow.r 0^+) ln(x) = -oo$ و $lim_(x arrow.r 0^+) frac(1, x) = +oo$، وبما أن $c = ${c}$ فإن $lim_(x arrow.r 0^+) f(x) = ${c > 0 ? '-oo' : '+oo'}$.\nالتفسير الهندسي: المستقيم ذو المعادلة $x = 0$ (محور التراتيب) مستقيم مقارب عمودي للمنحنى $(C_f)$.\nوعند $+oo$: بالتزايد المقارن $lim_(x arrow.r +oo) frac(ln(x), x) = 0$، ومنه $lim_(x arrow.r +oo) f(x) = +oo$.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `2) بيّن أن المستقيم $(Delta)$ ذا المعادلة $y = ${linABT}$ مقارب مائل للمنحنى $(C_f)$ بجوار $+oo$.`,
							answer: `2) نحسب نهاية الفرق عند $+oo$:\n$lim_(x arrow.r +oo) [f(x) - (${linABT})] = lim_(x arrow.r +oo) frac(${c} ln(x), x) = ${c} times 0 = 0$.\nإذن المستقيم $(Delta): y = ${linABT}$ مقارب مائل للمنحنى $(C_f)$ بجوار $+oo$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) ادرس الوضعية النسبية للمنحنى $(C_f)$ والمستقيم $(Delta)$ على المجال $]0 ; +oo[$ محدّداً نقطة تقاطعهما $A$.`,
							answer: `3) ندرس إشارة الفرق $d(x) = f(x) - (${linABT}) = frac(${c} ln(x), x)$ على $]0 ; +oo[$.\nبما أن $x > 0$، فإن إشارة $d(x)$ من إشارة $${c} ln(x)$، وتنعدم عند $ln(x) = 0$ أي $x = 1$:\n- يتقاطع $(C_f)$ و $(Delta)$ في النقطة $A(1, ${yA})$.\n- على $]0 ; 1[$: $ln(x) < 0$ ومنه $d(x) ${c > 0 ? '< 0' : '> 0'}$، فالمنحنى $(C_f)$ يقع ${c > 0 ? 'تحت' : 'فوق'} $(Delta)$.\n- على $]1 ; +oo[$: $ln(x) > 0$ ومنه $d(x) ${c > 0 ? '> 0' : '< 0'}$، فالمنحنى $(C_f)$ يقع ${c > 0 ? 'فوق' : 'تحت'} $(Delta)$.`,
							mark: '1.5'
						},
						{
							type: 'image',
							src: curveUrl,
							caption: 'المنحنى البياني $(C_f)$ والمقارب العمودي $x = 0$ والمقارب المائل $(Delta)$'
						}
					]
				},
				hints: [
					`استعمل نهاية التزايد المقارن الشهيرة $\\lim_{x \\to +\\infty} \\frac{\\ln(x)}{x} = 0$.`,
					`يكون $(\\Delta): y = ax + b$ مقارباً مائلاً بجوار $+\\infty$ إذا وفقط إذا كان $\\lim_{x \\to +\\infty} [f(x) - (ax + b)] = 0$.`,
					`لدراسة الوضعية النسبية ادرس إشارة الفرق $f(x) - y_\\Delta$ وانتبه لإشارة العامل $c = ${c}$ مضروباً في $\\ln(x)$.`
				],
				solutionStepsAr: [
					`حساب النهايتين: $\\lim_{x \\to 0^+} f(x) = ${c > 0 ? '-\\infty' : '+\\infty'}$ (مقارب عمودي $x = 0$) و $\\lim_{x \\to +\\infty} f(x) = +\\infty$.`,
					`إثبات أن $\\lim_{x \\to +\\infty} [f(x) - (${linABK})] = 0$ ومنه $(\\Delta): y = ${linABK}$ مقارب مائل بجوار $+\\infty$.`,
					`دراسة إشارة $\\frac{${c}\\ln(x)}{x}$ وتعيين نقطة التقاطع $A(1 ; ${yA})$.`
				],
				finalAnswer: `A(1 ; ${yA})`
			};
		}

		// easy & medium: Exponential comparative growth on R:
		// f(x) = a x + b + c(x - x0) e^(-x)
		const a = rng.pick([1, 2, -1]);
		const b = rng.pick([-3, -2, -1, 1, 2, 3]);
		const c = rng.pick([1, 2, -1, -2]);
		const x0 = rng.pick([-2, -1, 1, 2, 3]);
		const yA = a * x0 + b;

		const f = (x: number) => a * x + b + c * (x - x0) * Math.exp(-x);
		const fPrime = (x: number) => a + c * (1 - x + x0) * Math.exp(-x);
		assertCentralDifference(f, fPrime, [-1, 0, 1, 2, x0], 'tpl4.exp.fPrime');

		const linABK = linearKatex(a, b, 'x');
		const linABT = linearTypst(a, b, 'x');
		const diffLinK = linearKatex(c, -c * x0, 'x');
		const diffLinT = linearTypst(c, -c * x0, 'x');
		const fKatex = `${linABK} + (${diffLinK})e^{-x}`;
		const fTypst = `${linABT} + (${diffLinT}) e^(-x)`;

		const limNegInfTypst = c > 0 ? '-oo' : '+oo';
		const limPosInfTypst = a > 0 ? '+oo' : '-oo';
		const limNegInfKatex = c > 0 ? '-\\infty' : '+\\infty';
		const limPosInfKatex = a > 0 ? '+\\infty' : '-\\infty';

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			// Ask for ordinate yA of intersection point A(x0 ; yA) between (C_f) and oblique asymptote (Delta)
			finalAnswer = `${yA}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر على $\\mathbb{R}$ الدالة $f(x) = ${fKatex}$ ومقاربها المائل $(\\Delta): y = ${linABK}$ بجوار $+\\infty$. يتقاطع $(C_f)$ و $(\\Delta)$ في نقطة وحيدة $A(x_0 ; y_0)$. احسب الترتيبة $y_0$ للنقطة $A$.`,
				questionTextAr: `احسب الترتيبة $y_0$ لنقطة تقاطع المنحنى $(C_f)$ والمستقيم المقارب المائل $(\\Delta): y = ${linABK}$:`,
				questionData: {
					answer: yA,
					displayTemplate: 'y_0 = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `يتقاطع $(C_f)$ و $(\\Delta)$ عندما $f(x) - (${linABK}) = 0$ أي $(${diffLinK})e^{-x} = 0$. بما أن $e^{-x} > 0$ دوماً، نجد $x_0 = ${x0}$، وتكون الترتيبة $y_0 = ${a}(${x0})${signedTail(b)} = ${yA}$.`
			};
		} else {
			// medium: MCQ identifying the oblique asymptote equation near +oo
			const wrongAddC = `y = ${linearKatex(a + c, b - c * x0, 'x')}`;
			const wrongSwapAB = `y = ${linearKatex(b, a, 'x')}`;
			const wrongConstShift = `y = ${linearKatex(a, b - c * x0, 'x')}`;
			const mcq = buildUniqueMcqOptions(
				`$y = ${linABK}$`,
				[
					{
						text: `$${wrongAddC}$`,
						diagnosticFeedback: `وضعت $e^{-x} = 1$ بدلاً من حساب النهاية بجوار $+\\infty$ حيث $\\lim_{x \\to +\\infty} x e^{-x} = 0$.`
					},
					{
						text: `$${wrongSwapAB}$`,
						diagnosticFeedback: `انتبه لترتيب معامل التوجيه $a = ${a}$ والترتيب إلى المبدأ $b = ${b}$.`
					},
					{
						text: `$${wrongConstShift}$`,
						diagnosticFeedback: `بجوار $+\\infty$ لدينا $\\lim_{x \\to +\\infty} (${ -c * x0 })e^{-x} = 0$ فلا يبقى هذا الحد في معادلة المقارب.`
					}
				],
				rng
			);
			finalAnswer = `y = ${linABK}`;
			quizQuestion = {
				type: 'mcq',
				questionText: `نعتبر الدالة $f$ المعرفة على $\\mathbb{R}$ بـ $f(x) = ${fKatex}$. ما هي معادلة المستقيم المقارب المائل $(\\Delta)$ للمنحنى $(C_f)$ بجوار $+\\infty$؟`,
				questionTextAr: `ما هي معادلة المستقيم المقارب المائل للمنحنى $(C_f)$ بجوار $+\\infty$؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `بجوار $+\\infty$ لدينا بالتزايد المقارن $\\lim_{x \\to +\\infty} x e^{-x} = \\lim_{x \\to +\\infty} \\frac{x}{e^x} = 0$ و $\\lim_{x \\to +\\infty} e^{-x} = 0$، إذن $\\lim_{x \\to +\\infty} [f(x) - (${linABK})] = 0$، فالمقارب المائل هو $(\\Delta): y = ${linABK}$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر الدالة $f$ المعرفة على $bb(R)$ بـ: $f(x) = ${fTypst}$، وليكن $(C_f)$ تمثيلها البياني في معلم متعامد ومتجانس.`,
			content: [
				{
					type: 'text',
					content: `1) احسب $lim_(x arrow.r +oo) f(x)$ باستعمال التزايد المقارن، ثم احسب $lim_(x arrow.r -oo) f(x)$ (يمكن إخراج $x$ عاملاً مشتركاً عند الحاجة).`,
					answer: `1) حساب النهايات:\n- بجوار $+oo$: لدينا بالتزايد المقارن $lim_(x arrow.r +oo) x e^(-x) = lim_(x arrow.r +oo) frac(x, e^x) = 0$ و $lim_(x arrow.r +oo) e^(-x) = 0$، إذن $lim_(x arrow.r +oo) (${diffLinT}) e^(-x) = 0$، ومنه $lim_(x arrow.r +oo) f(x) = ${limPosInfTypst}$.\n- بجوار $-oo$: نكتب $f(x) = x (${a} + frac(${b}, x) + (${c} - frac(${c * x0}, x)) e^(-x))$. بما أن $lim_(x arrow.r -oo) e^(-x) = +oo$ فإن القوس يؤول إلى $${c > 0 ? '+oo' : '-oo'}$، ومنه $lim_(x arrow.r -oo) f(x) = ${limNegInfTypst}$.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `2) بيّن أن المستقيم $(Delta)$ ذا المعادلة $y = ${linABT}$ مقارب مائل للمنحنى $(C_f)$ بجوار $+oo$.`,
					answer: `2) نحسب نهاية الفرق بجوار $+oo$:\n$lim_(x arrow.r +oo) [f(x) - (${linABT})] = lim_(x arrow.r +oo) (${diffLinT}) e^(-x) = 0$.\nإذن المستقيم $(Delta): y = ${linABT}$ مقارب مائل للمنحنى $(C_f)$ بجوار $+oo$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) ادرس الوضعية النسبية للمنحنى $(C_f)$ والمستقيم $(Delta)$ على $bb(R)$، وعيّن إحداثيي نقطة تقاطعهما $A$.`,
					answer: `3) ندرس إشارة الفرق $d(x) = f(x) - (${linABT}) = ${c === 1 ? '' : c === -1 ? '-' : `${c} `}${formatShiftedVar('x', x0)} e^(-x)$.\nبما أن $e^(-x) > 0$ من أجل كل $x in bb(R)$، فإشارة $d(x)$ من إشارة $${diffLinT}$ التي تنعدم عند $x_0 = ${x0}$:\n- يتقاطع $(C_f)$ و $(Delta)$ في النقطة $A(${x0}, ${yA})$.\n- على $]-oo ; ${x0}[$: $(C_f)$ يقع ${c > 0 ? 'تحت' : 'فوق'} $(Delta)$.\n- على $]${x0} ; +oo[$: $(C_f)$ يقع ${c > 0 ? 'فوق' : 'تحت'} $(Delta)$.`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_se',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`بجوار $+\\infty$ استعمل نهاية التزايد المقارن $\\lim_{x \\to +\\infty} \\frac{x}{e^x} = 0$ لإثبات أن الحد الأسي يؤول إلى $0$.`,
				`لإثبات أن $(\\Delta): y = ax + b$ مقارب مائل بجوار $+\\infty$ يكفي إثبات أن $\\lim_{x \\to +\\infty} [f(x) - (ax + b)] = 0$.`,
				`بما أن $e^{-x} > 0$ دوماً على $\\mathbb{R}$، فإن إشارة الفرق $f(x) - y_\\Delta$ هي إشارة العامل الخطي $${diffLinK}$.`
			],
			solutionStepsAr: [
				`النهايات: $\\lim_{x \\to +\\infty} f(x) = ${limPosInfKatex}$ و $\\lim_{x \\to -\\infty} f(x) = ${limNegInfKatex}$.`,
				`إثبات أن $\\lim_{x \\to +\\infty} [f(x) - (${linABK})] = 0$ ومنه $(\\Delta): y = ${linABK}$ مقارب مائل بجوار $+\\infty$.`,
				`نقطة التقاطع هي $A(${x0} ; ${yA})$، وتحديد الوضعية النسبية حسب إشارة $${diffLinK}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Recursive Sequences, Induction, Auxiliary Geometric Sequence & Cobweb SVG
// ═══════════════════════════════════════════════════════════════════════════════

const tplSequencesInduction: ParameterizedTemplate = {
	id: 'tpl_3as_shared_t1_sequences_induction',
	grade: '3as_se',
	trimesterId: 't1',
	domain: 'analysis',
	titleAr: 'المتتاليات التراجعية، البرهان بالتراجع، المتتالية المساعدة وحساب المجاميع',
	curriculumLessonId: 'lesson_3as_se_t1_numerical_sequences_induction',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		if (difficulty === 'hard') {
			// Homographic sequence u_{n+1} = f(u_n) = (A u_n + L) / (u_n + D)
			// where A = D + L - 1, D in {2, 3}, L in {2, 3, 4}, u_0 = 0
			// Fixed points: -1 and L. Auxiliary sequence v_n = (u_n - L) / (u_n + 1)
			// is geometric with ratio q = (D - 1) / (D + L) and v_0 = -L!
			// Identity: (L + 1) / (u_n + 1) = 1 - v_n!
			const D = rng.pick([2, 3]);
			const L = rng.pick([2, 3, 4]);
			const A = D + L - 1;
			const u0 = 0;

			const [qNum, qDen] = simplifyFraction(D - 1, D + L);
			const qFloat = qNum / qDen;
			const v0 = -L;

			const fnSeq = (x: number) => (A * x + L) / (x + D);
			const fnPrime = (x: number) => ((D - 1) * (D + L)) / ((x + D) * (x + D));
			assertCentralDifference(fnSeq, fnPrime, [0, 1, L], 'tpl5.hard.fnPrime');

			// Verify recurrence vs closed-form u_n and sum S_n up to n = 8
			let uRec = u0;
			let directSum = 0;
			for (let n = 0; n <= 8; n++) {
				const vn = v0 * Math.pow(qFloat, n);
				const unClosed = (L + vn) / (1 - vn);
				if (Math.abs(uRec - unClosed) > 1e-9) {
					throw new Error(`Homographic sequence mismatch at n=${n}: rec=${uRec}, closed=${unClosed}`);
				}
				directSum += 1 / (uRec + 1);
				const sumV = (v0 * (1 - Math.pow(qFloat, n + 1))) / (1 - qFloat);
				const closedSum = (n + 1 - sumV) / (L + 1);
				if (Math.abs(directSum - closedSum) > 1e-9) {
					throw new Error(`Homographic sum mismatch at n=${n}: direct=${directSum}, closed=${closedSum}`);
				}
				uRec = fnSeq(uRec);
			}

			const cobwebSvg = svgCobwebSequencePlot({
				xMin: 0,
				xMax: L + 1,
				yMin: 0,
				yMax: L + 1,
				fn: fnSeq,
				u0,
				steps: 4,
				fixedPoint: L
			});
			const cobwebUrl = saveSvgAsset(`3as_shared_t1_seq_cobweb_${difficulty}_s${seed}`, cobwebSvg);

			const qKatex = fracKatex(qNum, qDen);
			const qTypst = fracTypst(qNum, qDen);
			const wrongQ1 = fracKatex(A, D);
			const wrongQ2 = fracKatex(D, D + L);
			const wrongQ3 = fracKatex(L, D + L);

			const mcq = buildUniqueMcqOptions(
				`$q = ${qKatex}$`,
				[
					{
						text: `$q = ${wrongQ1}$`,
						diagnosticFeedback: `قسمت معاملي $u_n$ مباشرة دون توحيد المقامات في $v_{n+1} = \\frac{u_{n+1} - ${L}}{u_{n+1} + 1}$.`
					},
					{
						text: `$q = ${wrongQ2}$`,
						diagnosticFeedback: `تحقق من تبسيط البسط $u_{n+1} - ${L} = \\frac{${D - 1}(u_n - ${L})}{u_n + ${D}}$.`
					},
					{
						text: `$q = ${wrongQ3}$`,
						diagnosticFeedback: `راجع قسمة البسط على المقام بعد تعويض $u_{n+1} = \\frac{${A}u_n + ${L}}{u_n + ${D}}$.`
					},
					{
						text: `$q = ${fracKatex(qNum + 1, qDen + 1)}$`,
						diagnosticFeedback: 'تحقق من معاملات التناسب عند كتابة $v_{n+1}$ بدلالة $v_n$.'
					},
					{
						text: `$q = ${fracKatex(-qNum, qDen)}$`,
						diagnosticFeedback: 'انتبه لإشارة البسط: الأساس $q$ موجب ومتناقص نحو $0$.'
					}
				],
				rng
			);

			const [coeffSumNum, coeffSumDen] = simplifyFraction(-v0 * qDen, (qDen - qNum) * (L + 1));
			const coeffSumTypst = fracTypst(coeffSumNum, coeffSumDen);
			const invLp1Typst = fracTypst(1, L + 1);

			return {
				templateId: this.id,
				seed,
				grade: '3as_se',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `نعتبر المتتالية $(u_n)$ المعرفة بـ $u_0 = 0$ ومن أجل كل $n \\in \\mathbb{N}$: $u_{n+1} = \\frac{${A}u_n + ${L}}{u_n + ${D}}$، ونضع $v_n = \\frac{u_n - ${L}}{u_n + 1}$. ما هو أساس المتتالية الهندسية $(v_n)$؟`,
					questionTextAr: `ما هو أساس المتتالية الهندسية $v_n = \\frac{u_n - ${L}}{u_n + 1}$؟`,
					imageUrl: cobwebUrl,
					imageCaption: `مخطط العنكبوت لتقارب المتتالية نحو الفاصلة الثابتة L = ${L}`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `لدينا $u_{n+1} - ${L} = \\frac{(${A} - ${L})u_n + ${L}(1 - ${D})}{u_n + ${D}} = \\frac{${D - 1}(u_n - ${L})}{u_n + ${D}}$، و $u_{n+1} + 1 = \\frac{${D + L}(u_n + 1)}{u_n + ${D}}$. بالقسمة نجد $v_{n+1} = \\frac{${D - 1}}{${D + L}} v_n = ${qKatex} v_n$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: `نعتبر الدالة $f$ المتزايدة تماماً على المجال $[0 ; +oo[$ والمعرفة بـ $f(x) = frac(${A} x + ${L}, x + ${D})$، والمتتالية $(u_n)$ المعرفة بحدها الأول $u_0 = 0$ ومن أجل كل $n in bb(N)$: $u_(n+1) = f(u_n)$.`,
					content: [
						{
							type: 'columns',
							widths: ['1.45fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) احسب $u_1$ و $u_2$، ثم خمّن انطلاقاً من مخطط العنكبوت المقابل اتجاه تغير المتتالية $(u_n)$ ونهايتها.\n2) برهن بالتراجع أنه من أجل كل عدد طبيعي $n$: $0 <= u_n < ${L}$، ثم ادرس اتجاه تغير $(u_n)$ واستنتج أنها متقاربة.`,
									answer: `1) $u_1 = frac(${L}, ${D}) = ${fracTypst(L, D)}$، و $u_2 = frac(${A * L + L * D}, ${L + D * D}) = ${fracTypst(A * L + L * D, L + D * D)}$. نخمّن أن $(u_n)$ متزايدة تماماً ومتقاربة نحو $${L}$.\n2) البرهان بالتراجع على $P(n): 0 <= u_n < ${L}$:\n- من أجل $n = 0$: $u_0 = 0$ فـ $0 <= 0 < ${L}$ محققة.\n- نفرض صحة $0 <= u_n < ${L}$: بما أن $f$ متزايدة تماماً على $[0 ; ${L}]$ فإن $f(0) <= f(u_n) < f(${L})$ أي $0 <= ${fracTypst(L, D)} <= u_(n+1) < ${L}$، فـ $P(n+1)$ صحيحة.\nولدينا $u_(n+1) - u_n = frac(-(u_n - ${L})(u_n + 1), u_n + ${D}) > 0$، فالمتتالية متزايدة تماماً ومحدودة من الأعلى بـ $${L}$ فهي متقاربة.`,
									mark: '2'
								},
								{
									type: 'image',
									src: cobwebUrl,
									caption: 'مخطط العنكبوت للمتتالية $(u_n)$'
								}
							]
						},
						{
							type: 'text',
							content: `3) نضع من أجل كل $n in bb(N)$: $v_n = frac(u_n - ${L}, u_n + 1)$. بيّن أن $(v_n)$ متتالية هندسية أساسها $q = ${qTypst}$ يُطلب حساب حدها الأول $v_0$، ثم اكتب $v_n$ و $u_n$ بدلالة $n$ واحسب $lim_(n arrow.r +oo) u_n$.`,
							answer: `3) لدينا $v_(n+1) = frac(u_(n+1) - ${L}, u_(n+1) + 1) = frac(${D - 1}(u_n - ${L}), ${D + L}(u_n + 1)) = ${qTypst} v_n$، إذن $(v_n)$ هندسية أساسها $q = ${qTypst}$ وحدها الأول $v_0 = ${v0}$.\nومنه $v_n = ${v0} times (${qTypst})^n$، ومن العلاقة $u_n = frac(${L} + v_n, 1 - v_n)$ وبما أن $0 < ${qTypst} < 1$ فإن $lim_(n arrow.r +oo) v_n = 0$ ومنه $lim_(n arrow.r +oo) u_n = ${L}$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `4) تحقّق أنه من أجل كل $n in bb(N)$: $frac(${L + 1}, u_n + 1) = 1 - v_n$، ثم استنتج بدلالة $n$ المجموع $S_n = frac(1, u_0 + 1) + frac(1, u_1 + 1) + dots.c + frac(1, u_n + 1)$.`,
							answer: `4) لدينا $1 - v_n = 1 - frac(u_n - ${L}, u_n + 1) = frac((u_n + 1) - (u_n - ${L}), u_n + 1) = frac(${L + 1}, u_n + 1)$.\nومنه $frac(1, u_k + 1) = ${invLp1Typst} (1 - v_k)$، وبجمع $(n + 1)$ حداً نجد:\n$S_n = ${invLp1Typst} (n + 1) + ${coeffSumTypst} (1 - (${qTypst})^(n + 1))$.`,
							mark: '1'
						}
					]
				},
				hints: [
					`للبرهان بالتراجع على $0 \\le u_n < ${L}$، استثمر رتابة الدالة المرفقة $f$ المتزايدة تماماً على المجال $[0 ; ${L}]$.`,
					`لإثبات أن $(v_n)$ هندسية، وحّد المقامات في كل من $u_{n+1} - ${L}$ و $u_{n+1} + 1$ ثم اختزل المقام المشترك $(u_n + ${D})$.`,
					`استعمل المتطابقة $\\frac{1}{u_k + 1} = \\frac{1}{${L + 1}}(1 - v_k)$ ولا تنسَ أن عدد الحدود من $k = 0$ إلى $k = n$ هو $(n + 1)$ حداً.`
				],
				solutionStepsAr: [
					`البرهان بالتراجع على $0 \\le u_n < ${L}$ وإثبات أن $(u_n)$ متزايدة تماماً ومتقاربة.`,
					`إثبات أن $(v_n)$ هندسية أساسها $q = ${qKatex}$ وحدها الأول $v_0 = ${v0}$، واستنتاج $\\lim_{n \\to +\\infty} u_n = ${L}$.`,
					`توظيف العلاقة $\\frac{${L + 1}}{u_n + 1} = 1 - v_n$ لحساب المجموع $S_n$ بدلالة $n$.`
				],
				finalAnswer: `q = ${qKatex}`
			};
		}

		// easy & medium: Arithmetico-geometric sequence u_{n+1} = q u_n + b
		// Choose q = pQ / dQ with dQ - pQ = 1 (so 1 / (1 - q) = dQ is an exact integer!),
		// L = mL * dQ (so b = L * (1 - q) = mL is an exact integer!),
		// and u0 = L - 2 * dQ >= 0 or L - dQ >= 0 (so u1 is ALSO an exact integer!)
		const [pQ, dQ] = rng.pick<[number, number]>(
			difficulty === 'easy'
				? [[1, 2]]
				: [
						[1, 2],
						[2, 3],
						[3, 4]
					]
		);
		const mL = rng.pick([2, 3, 4]);
		const L = mL * dQ; // exact integer fixed point
		const bSeq = mL * (dQ - pQ); // = mL (exact integer!)
		const multV0 = rng.pick([1, 2]);
		const u0 = Math.max(0, L - multV0 * dQ);
		const v0 = u0 - L; // negative integer divisible by dQ
		const u1 = (pQ * u0) / dQ + bSeq; // exact integer!
		const qFloat = pQ / dQ;

		const fnSeq = (x: number) => qFloat * x + bSeq;
		// Verify recurrence vs general term and sum S_n up to n = 8
		const sumGeomCoeff = v0 * dQ; // since 1 - q = 1 / dQ, v0 / (1 - q) = v0 * dQ (exact integer!)
		let uRec = u0;
		let directSum = 0;
		for (let n = 0; n <= 8; n++) {
			const unClosed = L + v0 * Math.pow(qFloat, n);
			if (Math.abs(uRec - unClosed) > 1e-9) {
				throw new Error(`Arithmetico-geometric term mismatch at n=${n}`);
			}
			directSum += uRec;
			const closedSum = (n + 1) * L + sumGeomCoeff * (1 - Math.pow(qFloat, n + 1));
			if (Math.abs(directSum - closedSum) > 1e-9) {
				throw new Error(`Arithmetico-geometric sum mismatch at n=${n}`);
			}
			uRec = fnSeq(uRec);
		}

		const cobwebSvg = svgCobwebSequencePlot({
			xMin: 0,
			xMax: L + 2,
			yMin: 0,
			yMax: L + 2,
			fn: fnSeq,
			u0,
			steps: 4,
			fixedPoint: L
		});
		const cobwebUrl = saveSvgAsset(`3as_shared_t1_seq_cobweb_${difficulty}_s${seed}`, cobwebSvg);

		const qKatex = fracKatex(pQ, dQ);
		const qTypst = fracTypst(pQ, dQ);
		const unKatex = `${L} - ${Math.abs(v0)}\\left(${qKatex}\\right)^n`;
		const unTypst = `${L} - ${Math.abs(v0)} (${qTypst})^n`;
		const snKatex = `${L}(n + 1) - ${Math.abs(sumGeomCoeff)}\\left(1 - \\left(${qKatex}\\right)^{n+1}\\right)`;
		const snTypst = `${L} (n + 1) - ${Math.abs(sumGeomCoeff)} (1 - (${qTypst})^(n + 1))`;

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${L}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر المتتالية التراجعية $(u_n)$ المعرفة بـ $u_0 = ${u0}$ ومن أجل كل عدد طبيعي $n$: $u_{n+1} = ${qKatex} u_n + ${bSeq}$. احسب نهاية المتتالية $\\lim_{n \\to +\\infty} u_n$.`,
				questionTextAr: `احسب نهاية المتتالية $u_{n+1} = ${qKatex} u_n + ${bSeq}$ ($u_0 = ${u0}$):`,
				imageUrl: cobwebUrl,
				imageCaption: `مخطط الدرج لتقارب المتتالية (u_n)`,
				questionData: {
					answer: L,
					displayTemplate: 'lim u_n = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `النقطة الثابتة تحقق $\\ell = ${qKatex}\\ell + ${bSeq}$ أي $\\frac{1}{${dQ}}\\ell = ${bSeq}$ ومنه $\\ell = ${L}$. المتتالية المساعدة $v_n = u_n - ${L}$ هندسية أساسها $${qKatex} \\in ]-1 ; 1[$، إذن $\\lim_{n \\to +\\infty} u_n = ${L}$.`
			};
		} else {
			// medium: MCQ on sum S_n = u_0 + u_1 + ... + u_n (classic BAC n vs n+1 terms trap!)
			const wrongNTerms = `${L}n - ${Math.abs(sumGeomCoeff)}\\left(1 - \\left(${qKatex}\\right)^n\\right)`;
			const wrongPlusSign = `${L}(n + 1) + ${Math.abs(sumGeomCoeff)}\\left(1 - \\left(${qKatex}\\right)^{n+1}\\right)`;
			const wrongNoOneMinusQ = `${L}(n + 1) - ${Math.abs(v0)}\\left(1 - \\left(${qKatex}\\right)^{n+1}\\right)`;
			const mcq = buildUniqueMcqOptions(
				`$S_n = ${snKatex}$`,
				[
					{
						text: `$S_n = ${wrongNTerms}$`,
						diagnosticFeedback: `انتبه لعدد الحدود! المجموع من $u_0$ إلى $u_n$ يضم $(n + 1)$ حداً وليس $n$ حداً.`
					},
					{
						text: `$S_n = ${wrongPlusSign}$`,
						diagnosticFeedback: `راجع إشارة الحد الأول للمتتالية الهندسية: $v_0 = u_0 - ${L} = ${v0} < 0$.`
					},
					{
						text: `$S_n = ${wrongNoOneMinusQ}$`,
						diagnosticFeedback: `نسيت القسمة على $(1 - q) = \\frac{1}{${dQ}}$ في مجموع المتتالية الهندسية $v_0 \\frac{1 - q^{n+1}}{1 - q}$.`
					}
				],
				rng
			);
			finalAnswer = `S_n = ${snKatex}`;
			quizQuestion = {
				type: 'mcq',
				questionText: `في المتتالية $(u_n)$ حيث $u_0 = ${u0}$ و $u_{n+1} = ${qKatex} u_n + ${bSeq}$، الحد العام هو $u_n = ${unKatex}$. ما هي عبارة المجموع $S_n = u_0 + u_1 + \\dots + u_n$ بدلالة $n$؟`,
				questionTextAr: `ما هي عبارة المجموع $S_n = u_0 + u_1 + \\dots + u_n$ بدلالة $n$؟`,
				imageUrl: cobwebUrl,
				imageCaption: `التمثيل البياني لحدود المتتالية (u_n)`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `عدد الحدود من $k = 0$ إلى $k = n$ هو $(n + 1)$ حداً: $\\sum_{k=0}^n ${L} = ${L}(n + 1)$، ومجموع الهندسية $\\sum_{k=0}^n v_k = ${v0} \\frac{1 - (${qKatex})^{n+1}}{1 - ${qKatex}} = ${sumGeomCoeff}\\left(1 - \\left(${qKatex}\\right)^{n+1}\\right)$، إذن $S_n = ${snKatex}$.`
			};
		}

		const [u2Num, u2Den] = simplifyFraction(pQ * u1 + bSeq * dQ, dQ);

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر المتتالية العددية $(u_n)$ المعرفة بحدها الأول $u_0 = ${u0}$ ومن أجل كل عدد طبيعي $n$: $u_(n+1) = ${qTypst} u_n + ${bSeq}$.`,
			content: [
				{
					type: 'columns',
					widths: ['1.45fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) احسب الحدين $u_1$ و $u_2$، ثم خمّن انطلاقاً من التمثيل البياني المقابل اتجاه تغير المتتالية $(u_n)$ وتقاربها.\n2) برهن بالتراجع أنه من أجل كل عدد طبيعي $n$: $u_n < ${L}$، ثم بيّن أن $(u_n)$ متزايدة تماماً واستنتج أنها متقاربة.`,
							answer: `1) $u_1 = ${qTypst} times ${u0} + ${bSeq} = ${u1}$، و $u_2 = ${qTypst} times ${u1} + ${bSeq} = ${fracTypst(u2Num, u2Den)}$. نخمّن أن $(u_n)$ متزايدة تماماً ومتقاربة نحو $${L}$.\n2) البرهان بالتراجع على $P(n): u_n < ${L}$:\n- من أجل $n = 0$: $u_0 = ${u0} < ${L}$ محققة.\n- نفرض أن $u_n < ${L}$: بالضرب في $${qTypst} > 0$ ثم إضافة $${bSeq}$ نجد $${qTypst} u_n + ${bSeq} < ${qTypst} times ${L} + ${bSeq} = ${L}$ أي $u_(n+1) < ${L}$. إذن من أجل كل $n in bb(N)$، $u_n < ${L}$.\nولدينا $u_(n+1) - u_n = -frac(1, ${dQ})(u_n - ${L}) > 0$ لأن $u_n < ${L}$، فالمتتالية $(u_n)$ متزايدة تماماً ومحدودة من الأعلى بالعدد $${L}$ فهي متقاربة.`,
							mark: '2'
						},
						{
							type: 'image',
							src: cobwebUrl,
							caption: 'تمثيل الحدود الأولى بمخطط الدرج للمتتالية $(u_n)$'
						}
					]
				},
				{
					type: 'text',
					content: `3) نضع من أجل كل عدد طبيعي $n$: $v_n = u_n - ${L}$. أثبت أن $(v_n)$ متتالية هندسية يُطلب تعيين أساسها $q$ وحدها الأول $v_0$، ثم اكتب $v_n$ و $u_n$ بدلالة $n$ واحسب $lim_(n arrow.r +oo) u_n$.`,
					answer: `3) لدينا $v_(n+1) = u_(n+1) - ${L} = ${qTypst} u_n + ${bSeq} - ${L} = ${qTypst} u_n - ${fracTypst(pQ * L, dQ)} = ${qTypst}(u_n - ${L}) = ${qTypst} v_n$.\nإذن $(v_n)$ متتالية هندسية أساسها $q = ${qTypst}$ وحدها الأول $v_0 = u_0 - ${L} = ${v0}$.\nومنه $v_n = ${v0} (${qTypst})^n$ و $u_n = ${unTypst}$. وبما أن $-1 < ${qTypst} < 1$ فإن $lim_(n arrow.r +oo) (${qTypst})^n = 0$ ومنه $lim_(n arrow.r +oo) u_n = ${L}$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `4) احسب بدلالة $n$ المجموع $S_n = u_0 + u_1 + dots.c + u_n$.`,
					answer: `4) لدينا $u_k = ${L} + v_k$، وبما أن عدد الحدود من $0$ إلى $n$ هو $(n + 1)$ حداً فإن:\n$S_n = sum_(k=0)^n (${L} + v_k) = ${L}(n + 1) + v_0 frac(1 - (${qTypst})^(n + 1), 1 - ${qTypst}) = ${snTypst}$.`,
					mark: '1'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_se',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`في البرهان بالتراجع على $u_n < ${L}$، تحقّق من صحة الخاصية عند $n = 0$ ثم ابنِ $u_{n+1}$ انطلاقاً من فرضية التراجع.`,
				`اثبت أن $v_{n+1} = q v_n$ بتعويض $u_{n+1}$ ثم إخراج $q = ${qKatex}$ عاملاً مشتركاً.`,
				`احذر من الفخ الشهير: المجموع من الدليل $0$ إلى الدليل $n$ يحتوي على $(n + 1)$ حداً.`
			],
			solutionStepsAr: [
				`البرهان بالتراجع أن $u_n < ${L}$ وإثبات أن $(u_n)$ متزايدة تماماً ومتقاربة.`,
				`إثبات أن $v_n = u_n - ${L}$ هندسية أساسها $${qKatex}$ وحدها الأول $v_0 = ${v0}$، والحد العام $u_n = ${unKatex}$ ونهايتها $${L}$.`,
				`حساب المجموع لـ $(n + 1)$ حداً: $S_n = ${snKatex}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Comprehensive ONEC BAC Analytical Function Synthesis Problem (7 Points)
// (التمرين الرابع — المسألة الشاملة: دالة مساعدة + TVI + دالة رئيسية + مقاربات + مناقشة)
// ═══════════════════════════════════════════════════════════════════════════════

const tplBacProblemSynthesis: ParameterizedTemplate = {
	id: 'tpl_3as_shared_t1_bac_problem_synthesis',
	grade: '3as_se',
	trimesterId: 't1',
	domain: 'integration',
	isIntegration: true,
	titleAr: 'التمرين الرابع — المسألة الشاملة: دراسة دالة مساعدة ودالة رئيسية ومناقشة بيانية',
	curriculumLessonId: 'lesson_3as_se_t1_integration',
	defaultPoints: 7,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Authentic ONEC BAC Analytical Function Problem on ]0 ; +oo[:
		// Part A: Auxiliary function g(x) = a x^2 - k + ln(x), where k = m + 1
		//   Choose (a, m) so g(1) = a - k < 0 and g(2) = 4a - k + ln(2) > 0 => unique alpha in ]1 ; 2[!
		// Part B: Main function f(x) = a x + b + (m - ln(x)) / x on ]0 ; +oo[
		//   f'(x) = (a x^2 - (m + 1) + ln(x)) / x^2 = g(x) / x^2!
		//   Using g(alpha) = 0 <=> ln(alpha) = m + 1 - a alpha^2:
		//   f(alpha) = a alpha + b + (m - (m + 1 - a alpha^2)) / alpha = 2a alpha + b - 1 / alpha!
		let a: number;
		let m: number;
		if (difficulty === 'easy') {
			a = 1;
			m = rng.pick([1, 2]); // k in {2, 3} => 4a - k >= 1 > 0
		} else if (difficulty === 'medium') {
			a = rng.pick([1, 2]);
			m = a === 1 ? rng.pick([1, 2, 3]) : rng.pick([2, 3, 4]);
		} else {
			a = 2;
			m = rng.pick([3, 4, 5, 6]); // k in {4..7} => g(1) = 2 - k < 0, g(2) = 8 - k + ln(2) >= 1.69 > 0
		}
		const k = m + 1;
		const b = rng.pick([-2, -1, 1, 2]);

		const g = (x: number) => a * x * x - k + Math.log(x);
		const gPrime = (x: number) => 2 * a * x + 1 / x;
		const f = (x: number) => a * x + b + (m - Math.log(x)) / x;
		const fPrime = (x: number) => g(x) / (x * x);

		assertCentralDifference(g, gPrime, [0.5, 1, 1.5, 2.5], 'tpl6.gPrime');
		assertCentralDifference(f, fPrime, [0.5, 1, 1.5, 2.5], 'tpl6.fPrime');

		const alpha = bisectMonotoneRoot(g, 1, 2);
		const fAlphaDirect = f(alpha);
		const fAlphaAlgebraic = 2 * a * alpha + b - 1 / alpha;
		if (Math.abs(fAlphaDirect - fAlphaAlgebraic) > 1e-8) {
			throw new Error(`f(alpha) identity mismatch: ${fAlphaDirect} vs ${fAlphaAlgebraic}`);
		}

		// Tight 0.1-amplitude bracket ]alphaLo ; alphaHi[ inside [1.0 ; 2.0]
		const tenthIdx = Math.floor(alpha * 10);
		const alphaLo = roundTo(tenthIdx / 10, 1);
		const alphaHi = roundTo((tenthIdx + 1) / 10, 1);
		if (!(g(alphaLo) < 0 && g(alphaHi) > 0)) {
			throw new Error(`0.1 bracket check failed for alpha=${alpha} on ]${alphaLo}, ${alphaHi}[`);
		}

		// Bound for f(alpha) using strictly increasing phi(u) = 2a u + b - 1/u on ]0 ; +oo[
		const phi = (u: number) => 2 * a * u + b - 1 / u;
		const fAlphaBoundLo = roundTo(phi(alphaLo), 2);
		const fAlphaBoundHi = roundTo(phi(alphaHi), 2);
		const fAlphaRounded = roundTo(fAlphaDirect, 2);

		// Tangent (T) at x0 = 1: exact integer slope & intercept!
		const f1 = a + b + m;
		const fp1 = a - k; // = a - m - 1 < 0
		const tgIntercept = f1 - fp1; // = b + 2m + 1
		const tgKatex = `y = ${linearKatex(fp1, tgIntercept, 'x')}`;
		const tgTypst = `y = ${linearTypst(fp1, tgIntercept, 'x')}`;

		// SVGs: Variation table + Analytical Curve Plot
		const varTableSvg = svgVariationTable({
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
		const varTableUrl = saveSvgAsset(`3as_shared_t1_prob_vartable_${difficulty}_s${seed}`, varTableSvg);

		const yPlotMin = Math.floor(Math.min(-1, fAlphaDirect - 2));
		const yPlotMax = Math.ceil(Math.max(f1 + 3, a * 5 + b + 2));
		const curveSvg = svgFunctionCurvePlot({
			xMin: -0.5,
			xMax: 5.5,
			yMin: yPlotMin,
			yMax: yPlotMax,
			fn: (x: number) => (x > 0.08 ? f(x) : NaN),
			curveLabel: '(C_f)',
			asymptotes: [
				{ kind: 'vertical', value: 0, label: 'x=0', color: '#dc2626' },
				{ kind: 'oblique', a, b, label: '(Delta)', color: '#059669' }
			],
			tangents: [{ x: 1, y: f1, slope: fp1, halfSpan: 0.9, color: '#7c3aed' }],
			points: [
				{ x: 1, y: f1, label: `B(1, ${f1})`, color: '#7c3aed' },
				{ x: alpha, y: fAlphaDirect, label: `S(α, ${fAlphaRounded})`, color: '#dc2626' }
			],
			width: 390,
			height: 260
		});
		const curveUrl = saveSvgAsset(`3as_shared_t1_prob_curve_${difficulty}_s${seed}`, curveSvg);

		const aTermK = a === 1 ? 'x^2' : `${a}x^2`;
		const aTermT = a === 1 ? 'x^2' : `${a} x^2`;
		const gKatex = `${aTermK} - ${k} + \\ln(x)`;
		const gTypst = `${aTermT} - ${k} + ln(x)`;
		const linABK = linearKatex(a, b, 'x');
		const linABT = linearTypst(a, b, 'x');
		const fKatex = `${linABK} + \\frac{${m} - \\ln(x)}{x}`;
		const fTypst = `${linABT} + frac(${m} - ln(x), x)`;
		const fAlphaExprK = `${2 * a}\\alpha${signedTail(b)} - \\frac{1}{\\alpha}`;
		const fAlphaExprT = `${2 * a} alpha${signedTail(b)} - frac(1, alpha)`;
		const xIntersectT = m === 1 ? 'e' : `e^${m}`;
		const yIntersectT = m === 1 ? `${a === 1 ? '' : `${a} `}e${signedTail(b)}` : `${a === 1 ? '' : `${a} `}e^${m}${signedTail(b)}`;

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			// Ask for f(1) or slope f'(1) — exact integer! Let's ask for slope f'(1) = g(1) = a - k
			finalAnswer = `${fp1}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `في المسألة الشاملة، نعتبر على $]0 ; +\\infty[$ الدالة المساعدة $g(x) = ${gKatex}$ والدالة الرئيسية $f(x) = ${fKatex}$ حيث $f'(x) = \\frac{g(x)}{x^2}$. احسب معامل توجيه المماس $(T)$ للمنحنى $(C_f)$ عند النقطة ذات الفاصلة $x_0 = 1$.`,
				questionTextAr: `احسب العدد المشتق $f'(1)$ (ميل المماس عند $x_0 = 1$):`,
				imageUrl: curveUrl,
				imageCaption: `المنحنى البياني (C_f) والمقارب المائل والمماس عند x = 1`,
				questionData: {
					answer: fp1,
					displayTemplate: "f'(1) = ?",
					variables: [],
					tolerance: 0
				},
				explanation: `لدينا $f'(1) = \\frac{g(1)}{1^2} = g(1) = ${a}(1)^2 - ${k} + \\ln(1) = ${a} - ${k} = ${fp1}$.`
			};
		} else if (difficulty === 'medium') {
			// MCQ on the exact algebraic expression of f(alpha) without ln(alpha)!
			const wrongSingleA = `${a === 1 ? '' : a}\\alpha${signedTail(b)} - \\frac{1}{\\alpha}`;
			const wrongPlusInv = `${2 * a}\\alpha${signedTail(b)} + \\frac{1}{\\alpha}`;
			const wrongKeepM = `${2 * a}\\alpha${signedTail(b)} + \\frac{${m}}{\\alpha}`;
			const mcq = buildUniqueMcqOptions(
				`$f(\\alpha) = ${fAlphaExprK}$`,
				[
					{
						text: `$f(\\alpha) = ${wrongSingleA}$`,
						diagnosticFeedback: `بعد تعويض $\\ln(\\alpha) = ${k} - ${a === 1 ? '' : a}\\alpha^2$ في البسط، ينتج $+\\frac{${a === 1 ? '' : a}\\alpha^2}{\\alpha} = +${a === 1 ? '' : a}\\alpha$ فيُجمع مع $${a === 1 ? '' : a}\\alpha$ الأول ليعطي $${2 * a}\\alpha$.`
					},
					{
						text: `$f(\\alpha) = ${wrongPlusInv}$`,
						diagnosticFeedback: `انتبه لإشارة الكسر: $${m} - (${k} - ${a === 1 ? '' : a}\\alpha^2) = ${a === 1 ? '' : a}\\alpha^2 - 1$، وبالقسمة على $\\alpha$ نحصل على $-\\frac{1}{\\alpha}$ وليس $+\\frac{1}{\\alpha}$.`
					},
					{
						text: `$f(\\alpha) = ${wrongKeepM}$`,
						diagnosticFeedback: `الثابت $${m}$ يختزل مع $-${k}$ ليترك $-1$ في البسط.`
					},
					{
						text: `$f(\\alpha) = ${2 * a}\\alpha${signedTail(b)} - \\frac{2}{\\alpha}$`,
						diagnosticFeedback: `راجع تعويض الثوابت في البسط بعد حذف $\\ln(\\alpha)$.`
					}
				],
				rng
			);
			finalAnswer = `f(\\alpha) = ${fAlphaExprK}`;
			quizQuestion = {
				type: 'mcq',
				questionText: `نعتبر على $]0 ; +\\infty[$ الدالة المساعدة $g(x) = ${gKatex}$ التي تنعدم عند $\\alpha$ ($g(\\alpha) = 0$)، والدالة $f(x) = ${fKatex}$. ما هي العبارة الجبرية لـ $f(\\alpha)$ بدلالة $\\alpha$ دون رمز اللوغاريتم؟`,
				questionTextAr: `عيّن العبارة المبسّطة لـ $f(\\alpha)$ بدلالة $\\alpha$ علماً أن $g(\\alpha) = 0$:`,
				imageUrl: varTableUrl,
				imageCaption: `جدول تغيرات الدالة f على ]0 ; +∞[`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `بما أن $g(\\alpha) = 0$ فإن $\\ln(\\alpha) = ${k} - ${a === 1 ? '' : a}\\alpha^2$. نعوّض في $f(\\alpha)$: $f(\\alpha) = ${a === 1 ? '' : a}\\alpha${signedTail(b)} + \\frac{${m} - (${k} - ${a === 1 ? '' : a}\\alpha^2)}{\\alpha} = ${a === 1 ? '' : a}\\alpha${signedTail(b)} + \\frac{${a === 1 ? '' : a}\\alpha^2 - 1}{\\alpha} = ${fAlphaExprK}$.`
			};
		} else {
			// hard: MCQ on parametric horizontal discussion f(x) = lambda (lambda in R)
			const mcq = buildUniqueMcqOptions(
				`تقبل حلّين متمايزين موجبين تماماً من أجل $\\lambda > f(\\alpha)$، وحلاً وحيداً من أجل $\\lambda = f(\\alpha)$، ولا تقبل حلولاً من أجل $\\lambda < f(\\alpha)$`,
				[
					{
						text: `تقبل حلاً وحيداً في $]0 ; +\\infty[$ من أجل كل قيمة حقيقية للوسيط $\\lambda \\in \\mathbb{R}$`,
						diagnosticFeedback: `الدالة $f$ ليست رتيبة تماماً على $]0 ; +\\infty[$ بل متناقصة على $]0 ; \\alpha]$ ثم متزايدة على $[\\alpha ; +\\infty[$ وتبلغ قيمة حدية صغرى $f(\\alpha)$.`
					},
					{
						text: `تقبل حلّين متمايزين من أجل $\\lambda < f(\\alpha)$، ولا تقبل حلولاً من أجل $\\lambda > f(\\alpha)$`,
						diagnosticFeedback: `انتبه: $f(\\alpha)$ قيمة حدية صغرى شاملة ($\\lim_{0^+} f = +\\infty$ و $\\lim_{+\\infty} f = +\\infty$)، فالمستقيم $y = \\lambda$ يقطع $(C_f)$ فوق $f(\\alpha)$ وليس تحته.`
					},
					{
						text: `تقبل حلّين متمايزين فقط عندما يكون $f(\\alpha) < \\lambda < ${f1}$`,
						diagnosticFeedback: `نهايتا $f$ عند $0^+$ وعند $+\\infty$ هما $+\\infty$ معاً، لذا يقطع المستقيم الأفقي $y = \\lambda$ فرعي المنحنى في نقطتين لكل $\\lambda > f(\\alpha)$.`
					}
				],
				rng
			);
			finalAnswer = `حلّان متمايزان من أجل λ > f(α)`;
			quizQuestion = {
				type: 'mcq',
				questionText: `الدالة $f(x) = ${fKatex}$ معرفة على $]0 ; +\\infty[$، نهايتاها عند $0^+$ وعند $+\\infty$ تساويان $+\\infty$، وتقبل قيمة حدية صغرى شاملة $f(\\alpha)$ عند $\\alpha \\in ]1 ; 2[$. ما هي المناقشة البيانية الصحيحة لعدد حلول المعادلة $f(x) = \\lambda$ ($\\lambda \\in \\mathbb{R}$)؟`,
				questionTextAr: `ما هو عدد حلول المعادلة الوسيطية $f(x) = \\lambda$ على $]0 ; +\\infty[$؟`,
				imageUrl: curveUrl,
				imageCaption: `المنحنى البياني (C_f) للمناقشة الأفقية y = λ`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `المعادلة $f(x) = \\lambda$ تمثّل فواصل تقاطع $(C_f)$ مع المستقيم الأفقي $y = \\lambda$. حسب جدول التغيرات تنزل $f$ من $+\\infty$ إلى $f(\\alpha)$ ثم تصعد إلى $+\\infty$، إذن: لا حلول إذا $\\lambda < f(\\alpha)$، حل وحيد $x = \\alpha$ إذا $\\lambda = f(\\alpha)$، وحلّان متمايزان في $]0 ; +\\infty[$ إذا $\\lambda > f(\\alpha)$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			customTitle: 'التمرين الرابع — المسألة الشاملة',
			instruction: `المستوي منسوب إلى معلم متعامد ومتجانس $(O ; arrow(i), arrow(j))$. تهدف هذه المسألة إلى دراسة دالة لوغاريتمية ومقارباتها ومناقشة معادلة وسيطية بيانياً.`,
			content: [
				{
					type: 'text',
					content: `*الجزء الأول: دراسة الدالة المساعدة $g$*\nنعتبر الدالة $g$ المعرفة على المجال $]0 ; +oo[$ بـ: $g(x) = ${gTypst}$.\n1) احسب $lim_(x arrow.r 0^+) g(x)$ و $lim_(x arrow.r +oo) g(x)$، ثم ادرس اتجاه تغير الدالة $g$ على $]0 ; +oo[$.\n2) بيّن أن المعادلة $g(x) = 0$ تقبل حلاً وحيداً $alpha$ على $]0 ; +oo[$، وتحقّق أن $${alphaLo} < alpha < ${alphaHi}$، ثم استنتج إشارة $g(x)$ على $]0 ; +oo[$.`,
					answer: `*الجزء الأول:*\n1) $lim_(x arrow.r 0^+) g(x) = -oo$ لأن $lim_(x arrow.r 0^+) ln(x) = -oo$، و $lim_(x arrow.r +oo) g(x) = +oo$.\nالدالة $g$ قابلة للاشتقاق على $]0 ; +oo[$ و $g'(x) = ${2 * a} x + frac(1, x) > 0$ تماماً، فـ $g$ متزايدة تماماً على $]0 ; +oo[$.\n2) بما أن $g$ مستمرة ومتزايدة تماماً من $-oo$ إلى $+oo$، فإن $g(x) = 0$ تقبل حلاً وحيداً $alpha in ]0 ; +oo[$.\nولدينا $g(${alphaLo}) approx ${roundTo(g(alphaLo), 3)} < 0$ و $g(${alphaHi}) approx ${roundTo(g(alphaHi), 3)} > 0$، إذن $${alphaLo} < alpha < ${alphaHi}$.\nإشارة $g(x)$: سالبة تماماً على $]0 ; alpha[$، معدومة عند $alpha$، وموجبة تماماً على $]alpha ; +oo[$.`,
					mark: '2'
				},
				{
					type: 'text',
					content: `*الجزء الثاني: دراسة الدالة الرئيسية $f$ والتمثيل البياني*\nنعتبر الدالة $f$ المعرفة على المجال $]0 ; +oo[$ بـ: $f(x) = ${fTypst}$، وليكن $(C_f)$ تمثيلها البياني.\n1) احسب $lim_(x arrow.r 0^+) f(x)$ وفسّر النتيجة هندسياً، ثم احسب $lim_(x arrow.r +oo) f(x)$.\n2) بيّن أن المستقيم $(Delta)$ ذا المعادلة $y = ${linABT}$ مقارب مائل للمنحنى $(C_f)$ بجوار $+oo$، ثم ادرس الوضعية النسبية لـ $(C_f)$ و $(Delta)$.`,
					answer: `*الجزء الثاني:*\n1) عند $0^+$: $lim_(x arrow.r 0^+) (${m} - ln(x)) = +oo$ و $lim_(x arrow.r 0^+) frac(1, x) = +oo$، إذن $lim_(x arrow.r 0^+) f(x) = +oo$، ومنه المستقيم $x = 0$ مقارب عمودي لـ $(C_f)$.\nعند $+oo$: بالتزايد المقارن $lim_(x arrow.r +oo) frac(ln(x), x) = 0$ و $lim_(x arrow.r +oo) frac(${m}, x) = 0$، ومنه $lim_(x arrow.r +oo) f(x) = +oo$.\n2) لدينا $lim_(x arrow.r +oo) [f(x) - (${linABT})] = lim_(x arrow.r +oo) frac(${m} - ln(x), x) = 0$، فالمستقيم $(Delta): y = ${linABT}$ مقارب مائل بجوار $+oo$.\nإشارة الفرق $frac(${m} - ln(x), x)$ على $]0 ; +oo[$ هي إشارة $${m} - ln(x)$: يتقاطعان في $A(${xIntersectT}, ${yIntersectT})$، و $(C_f)$ فوق $(Delta)$ على $]0 ; ${xIntersectT}[$ وتحت $(Delta)$ على $]${xIntersectT} ; +oo[$.`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) بيّن أنه من أجل كل $x in ]0 ; +oo[$: $f'(x) = frac(g(x), x^2)$، ثم استنتج اتجاه تغير الدالة $f$ وشكّل جدول تغيراتها.\n4) أثبت أن $f(alpha) = ${fAlphaExprT}$، ثم استنتج حصراً للعدد $f(alpha)$ مدوّراً إلى $10^(-2)$.`,
					answer: `3) $f'(x) = ${a} + frac((-frac(1, x)) x - 1 times (${m} - ln(x)), x^2) = frac(${aTermT} - 1 - ${m} + ln(x), x^2) = frac(${gTypst}, x^2) = frac(g(x), x^2)$.\nبما أن $x^2 > 0$، فإشارة $f'(x)$ من إشارة $g(x)$: الدالة $f$ متناقصة تماماً على $]0 ; alpha]$ ومتزايدة تماماً على $[alpha ; +oo[$.\n4) من $g(alpha) = 0$ نجد $ln(alpha) = ${k} - ${a === 1 ? '' : `${a} `}alpha^2$، وبالتعويض في $f(alpha)$:\n$f(alpha) = ${a === 1 ? '' : `${a} `}alpha${signedTail(b)} + frac(${m} - (${k} - ${a === 1 ? '' : `${a} `}alpha^2), alpha) = ${a === 1 ? '' : `${a} `}alpha${signedTail(b)} + frac(${a === 1 ? '' : `${a} `}alpha^2 - 1, alpha) = ${fAlphaExprT}$.\nوبما أن الدالة $u arrow.r.bar ${2 * a} u${signedTail(b)} - frac(1, u)$ متزايدة تماماً على $]0 ; +oo[$ و $${alphaLo} < alpha < ${alphaHi}$، فإن $${fAlphaBoundLo} < f(alpha) < ${fAlphaBoundHi}$.`,
					mark: '1.5'
				},
				{
					type: 'image',
					src: varTableUrl,
					caption: 'جدول تغيرات الدالة $f$ على المجال $]0 ; +oo[$'
				},
				{
					type: 'text',
					content: `5) اكتب معادلة المماس $(T)$ للمنحنى $(C_f)$ عند النقطة ذات الفاصلة $x_0 = 1$، ثم ناقش بيانياً وحسب قيم الوسيط الحقيقي $lambda$ عدد حلول المعادلة $f(x) = lambda$ على $]0 ; +oo[$.`,
					answer: `5) لدينا $f(1) = ${f1}$ و $f'(1) = g(1) = ${fp1}$، فمعادلة المماس $(T)$ هي: $y = ${fp1}(x - 1) + (${f1})$ أي $${tgTypst}$.\nالمناقشة البيانية الأفقية للمعادلة $f(x) = lambda$ (فواصل تقاطع $(C_f)$ مع المستقيم $y = lambda$):\n- إذا كان $lambda < f(alpha)$: لا تقبل المعادلة أي حل.\n- إذا كان $lambda = f(alpha)$: تقبل المعادلة حلاً مضاعفاً وحيداً هو $x = alpha$.\n- إذا كان $lambda > f(alpha)$: تقبل المعادلة حلّين متمايزين موجبين تماماً.`,
					mark: '1.5'
				},
				{
					type: 'image',
					src: curveUrl,
					caption: 'المنحنى البياني $(C_f)$ والمقارب المائل $(Delta)$ والمماس $(T)$'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_se',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`في الجزء الأول، مشتقة $g$ موجبة تماماً على $]0 ; +\\infty[$ ($g'(x) = ${2 * a}x + \\frac{1}{x} > 0$)، فإشارة $g(x)$ تتحدد مباشرة بموقع $x$ بالنسبة إلى الجذر $\\alpha$.`,
				`لتبسيط عبارة $f(\\alpha)$، استخرج $\\ln(\\alpha) = ${k} - ${aTermK.replace('x', '\\alpha')}$ من المعادلة $g(\\alpha) = 0$ وعوّضها في دستور $f(\\alpha)$.`,
				`في المناقشة البيانية الأفقية $f(x) = \\lambda$، اعتمد على جدول تغيرات $f$ من $+\\infty$ نزولاً إلى القيمة الحدية الصغرى $f(\\alpha)$ ثم صعوداً إلى $+\\infty$.`
			],
			solutionStepsAr: [
				`دراسة الدالة المساعدة $g(x) = ${gKatex}$ وإثبات وجود الجذر الوحيد $\\alpha \\in ]${alphaLo} ; ${alphaHi}[$ واستنتاج إشارة $g(x)$.`,
				`إثبات المقارب العمودي $x = 0$ والمقارب المائل $(\\Delta): y = ${linABK}$ وتحديد الوضعية النسبية.`,
				`إثبات $f'(x) = \\frac{g(x)}{x^2}$ وتشكيل جدول التغيرات، ثم برهان $f(\\alpha) = ${fAlphaExprK}$ وحصره بين $${fAlphaBoundLo}$ و $${fAlphaBoundHi}$.`,
				`كتابة معادلة المماس $(T): ${tgKatex}$ وإجراء المناقشة البيانية الأفقية للمعادلة $f(x) = \\lambda$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 1 Parameterized Templates for Secondary 3AS Shared Core
// ═══════════════════════════════════════════════════════════════════════════════

export const SHARED_TEMPLATES_3AS_T1: ParameterizedTemplate[] = [
	tplContinuityTviDerivability,
	tplExponentialFunctionStudy,
	tplLogarithmicDiffEq,
	tplObliqueAsymptotePosition,
	tplSequencesInduction,
	tplBacProblemSynthesis
];
