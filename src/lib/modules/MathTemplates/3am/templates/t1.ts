import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate, QuizQuestionPayload } from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng, simplifyFraction } from '../../rng';
import { saveSvgAsset, svgThalesConfig, svgTriangle } from '../../svg-helpers';

// ─── Formatting Helpers (Strict KaTeX vs Typst Separation) ───────────────────

function fmtSignedPlain(n: number): string {
	return n < 0 ? `(${n})` : `${n}`;
}

function fmtSignedExplicit(n: number): string {
	return n >= 0 ? `(+${n})` : `(${n})`;
}

function fmtKatexFrac(num: number, den: number): string {
	const [p, q] = simplifyFraction(num, den);
	if (q === 1) return `${p}`;
	return p < 0 ? `-\\frac{${Math.abs(p)}}{${q}}` : `\\frac{${p}}{${q}}`;
}

function fmtKatexRawFrac(num: number, den: number): string {
	if (den === 1) return `${num}`;
	if (num < 0 && den > 0) return `-\\frac{${Math.abs(num)}}{${den}}`;
	if (num > 0 && den < 0) return `-\\frac{${num}}{${Math.abs(den)}}`;
	if (num < 0 && den < 0) return `\\frac{${Math.abs(num)}}{${Math.abs(den)}}`;
	return `\\frac{${num}}{${den}}`;
}

function fmtKatexSignedFracParen(num: number, den: number): string {
	const raw = fmtKatexRawFrac(num, den);
	const isNeg = num * den < 0;
	return isNeg ? `\\left(${raw}\\right)` : raw;
}

function fmtTypstFrac(num: number, den: number): string {
	const [p, q] = simplifyFraction(num, den);
	if (q === 1) return `${p}`;
	return p < 0 ? `-frac(${Math.abs(p)}, ${q})` : `frac(${p}, ${q})`;
}

function fmtTypstRawFrac(num: number, den: number): string {
	if (den === 1) return `${num}`;
	if (num < 0 && den > 0) return `-frac(${Math.abs(num)}, ${den})`;
	if (num > 0 && den < 0) return `-frac(${num}, ${Math.abs(den)})`;
	if (num < 0 && den < 0) return `frac(${Math.abs(num)}, ${Math.abs(den)})`;
	return `frac(${num}, ${den})`;
}

function fmtTypstSignedFracParen(num: number, den: number): string {
	const raw = fmtTypstRawFrac(num, den);
	const isNeg = num * den < 0;
	return isNeg ? `(${raw})` : raw;
}

function fmtKatexPow10(exp: number): string {
	return `10^{${exp}}`;
}

function fmtTypstPow10(exp: number): string {
	return exp < 0 ? `10^(${exp})` : `10^${exp}`;
}

function pow10ToDecimal(negExp: number): string {
	// For negative integer negExp in [-6, -1]
	const k = Math.abs(negExp);
	if (k === 0) return '1';
	return `0.${'0'.repeat(k - 1)}1`;
}

function posPow10ToStr(exp: number): string {
	return `1${'0'.repeat(exp)}`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Signed Numbers Multiplication, Division & Chains (جداء وقسمة الأعداد النسبية)
// ═══════════════════════════════════════════════════════════════════════════════
const signedMultDivTemplate: ParameterizedTemplate = {
	id: '3am_t1_signed_mult_div',
	grade: '3am',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'جداء وقسمة الأعداد النسبية وتبسيط سلاسل الحسابات',
	curriculumLessonId: 'lesson_3am_t1_signed_numbers_mult_div',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		if (difficulty === 'easy') {
			const aAbs = rng.int(3, 9);
			const bAbs = rng.int(2, 9);
			const bothNeg = seed % 2 === 0;
			const a = -aAbs;
			const b = bothNeg ? -bAbs : bAbs;
			const ansA = a * b;

			const cAbs = rng.int(4, 12);
			const dAbs = rng.int(2, 8);
			const c = -cAbs;
			const d = bothNeg ? dAbs : -dAbs;
			const ansB = c * d;

			const q1 = rng.int(3, 9);
			const div1 = rng.int(2, 7);
			const n1 = -q1 * div1;
			const q2 = rng.int(3, 9);
			const div2 = rng.int(2, 6);
			const n2 = q2 * div2;
			const ansC = n1 / -div1;
			const ansD = n2 / -div2;

			const f1 = -rng.int(2, 4);
			const f2 = rng.int(2, 3);
			const f3 = -rng.int(2, 3);
			const f4 = -rng.int(2, 4);
			const ansE = f1 * f2 * f3 * f4;

			const aDisp = fmtSignedExplicit(a);
			const bDisp = fmtSignedExplicit(b);
			const cDisp = fmtSignedExplicit(c);
			const dDisp = fmtSignedExplicit(d);

			return {
				templateId: this.id,
				seed,
				grade: '3am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: `احسب جداء العددين النسبيين التاليين:\n\n$$A = ${aDisp} \\times ${bDisp}$$`,
					questionTextAr: `احسب الجداء: $A = ${aDisp} \\times ${bDisp}$`,
					questionData: {
						answer: ansA,
						displayTemplate: `A = ${aDisp} × ${bDisp} = ?`,
						variables: [],
						tolerance: 0
					},
					explanation: bothNeg
						? `جداء عددين نسبيين سالبين (من نفس الإشارة) هو عدد موجب: $${aDisp} \\times ${bDisp} = +(${aAbs} \\times ${bAbs}) = ${ansA}$.`
						: `جداء عددين نسبيين مختلفين في الإشارة هو عدد سالب: $${aDisp} \\times ${bDisp} = -(${aAbs} \\times ${bAbs}) = ${ansA}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'احسب العبارات التالية مع تطبيق قاعدة الإشارات بدقة:',
					content: [
						{
							type: 'text',
							content: `1) احسب الجداءين: $A = ${aDisp} times ${bDisp}$ و $B = ${cDisp} times ${dDisp}$`,
							answer: `1) $A = ${ansA > 0 ? `+${ansA}` : ansA}$ ، و $B = ${ansB > 0 ? `+${ansB}` : ansB}$`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) احسب حاصلي القسمة: $C = ${fmtSignedExplicit(n1)} div ${fmtSignedExplicit(-div1)}$ و $D = ${fmtSignedExplicit(n2)} div ${fmtSignedExplicit(-div2)}$`,
							answer: `2) $C = +${ansC}$ (نفس الإشارة)، و $D = ${ansD}$ (إشارتان مختلفتان).`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) حدّد إشارة الجداء $E$ دون حساب ثم احسبه: $E = ${fmtSignedExplicit(f1)} times ${fmtSignedExplicit(f2)} times ${fmtSignedExplicit(f3)} times ${fmtSignedExplicit(f4)}$`,
							answer: `3) عدد العوامل السالبة هو $3$ (فردي)، إذن إشارة $E$ سالبة: $E = -(${Math.abs(f1)} times ${f2} times ${Math.abs(f3)} times ${Math.abs(f4)}) = ${ansE}$.`,
							mark: '1'
						}
					]
				},
				hints: [
					'تذكّر قاعدة الإشارات: جداء عددين من نفس الإشارة موجب، وجداء عددين مختلفي الإشارة سالب.',
					bothNeg
						? 'كلا العددين سالب (نفس الإشارة)، إذن الناتج موجب.'
						: 'أحد العددين سالب والآخر موجب (إشارتان مختلفتان)، إذن الناتج سالب.',
					`اضرب المسافتين إلى الصفر: $${aAbs} \\times ${bAbs} = ${aAbs * bAbs}$ وضع الإشارة المناسبة.`
				],
				solutionStepsAr: [
					`نضرب المسافتين إلى الصفر: $${aAbs} \\times ${bAbs} = ${aAbs * bAbs}$.`,
					bothNeg
						? `العددان لهما نفس الإشارة (سالبان)، فالإشارة موجبة: $A = +${ansA}$.`
						: `العددان مختلفان في الإشارة، فالإشارة سالبة: $A = ${ansA}$.`
				],
				finalAnswer: `${ansA}`
			};
		}

		if (difficulty === 'medium') {
			const decPairs: Array<[number, number, number]> = [
				[2.5, 4, 10],
				[1.5, 4, 6],
				[0.5, 8, 4],
				[3.5, 2, 7],
				[2.5, 8, 20],
				[1.5, 6, 9]
			];
			const [decA, intB, decProd] = rng.pick(decPairs);
			const cInt = rng.int(2, 5);
			const prodSign = seed % 2 === 0 ? -1 : 1;
			// (-decA) * (-intB) * (+/-cInt)
			const thirdFactor = prodSign * cInt;
			const ansA = decProd * thirdFactor;

			const rDiv = rng.int(2, 6);
			const mQuot = -rng.int(2, 5) * rDiv;
			const nQuot = -rng.int(2, 7);
			const ansB = (mQuot * nQuot) / -rDiv;

			const addTerm = rng.int(5, 14);
			const pMul = -rng.int(2, 6);
			const qMul = -rng.int(2, 5);
			const ansC = addTerm + pMul * qMul;

			const wrongSignAns = -ansA;
			const wrongSum = Math.round((-decA - intB + thirdFactor) * 10) / 10;
			const wrongOnlyTwo = decProd * (prodSign === -1 ? 1 : -1);

			const mcq = buildUniqueMcqOptions(
				`$${ansA}$`,
				[
					{
						text: `$${wrongSignAns}$`,
						diagnosticFeedback:
							'خطأ في قاعدة الإشارات! عدّ العوامل السالبة: إذا كان عددها زوجياً فالجداء موجب، وإذا كان فردياً فالجداء سالب.'
					},
					{
						text: `$${wrongOnlyTwo}$`,
						diagnosticFeedback:
							'تأكّد من ضرب العوامل الثلاثة جميعها ولا تنسَ العامل الأخير.'
					},
					{
						text: `$${wrongSum}$`,
						diagnosticFeedback:
							'العملية هي ضرب الأعداد النسبية وليس جمعها.'
					},
					{
						text: `$${decProd * (cInt + 1)}$`,
						diagnosticFeedback:
							'تحقق من حساب جداء العوامل الثلاثة.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '3am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `نظّم واحسب الجداء التالي:\n\n$$A = (-${decA}) \\times (-${intB}) \\times ${fmtSignedPlain(thirdFactor)}$$`,
					questionTextAr: `نظّم واحسب الجداء: $A = (-${decA}) \\times (-${intB}) \\times ${fmtSignedPlain(thirdFactor)}$`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `نجمع العاملين الأوّلين: $(-${decA}) \\times (-${intB}) = +${decProd}$، ثم نضرب في $${fmtSignedPlain(thirdFactor)}$: $(+${decProd}) \\times ${fmtSignedPlain(thirdFactor)} = ${ansA}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'نظّم وبسّط ثم احسب العبارات التالية:',
					content: [
						{
							type: 'text',
							content: `1) احسب الجداء بذكاء: $A = (-${decA}) times (-${intB}) times ${fmtSignedPlain(thirdFactor)}$`,
							answer: `1) $A = [(-${decA}) times (-${intB})] times ${fmtSignedPlain(thirdFactor)} = (+${decProd}) times ${fmtSignedPlain(thirdFactor)} = ${ansA}$`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) احسب حاصل القسمة: $B = frac(${fmtSignedPlain(mQuot)} times ${fmtSignedPlain(nQuot)}, ${fmtSignedPlain(-rDiv)})$`,
							answer: `2) $B = frac(${mQuot * nQuot}, ${-rDiv}) = ${ansB}$`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) احسب باحترام الأولوية: $C = ${addTerm} + ${fmtSignedPlain(pMul)} times ${fmtSignedPlain(qMul)}$`,
							answer: `3) $C = ${addTerm} + (+${pMul * qMul}) = ${ansC}$`,
							mark: '1'
						}
					]
				},
				hints: [
					`ابدأ بعدّ العوامل السالبة في الجداء لتحديد إشارة النتيجة (${thirdFactor < 0 ? '3 عوامل سالبة ← النتيجة سالبة' : 'عاملان سالبان ← النتيجة موجبة'}).`,
					`يمكنك تجميع $(-${decA}) \\times (-${intB}) = +${decProd}$ لتسهيل الحساب الذهني.`,
					`أنجز الضرب النهائي: $${decProd} \\times ${fmtSignedPlain(thirdFactor)}$.`
				],
				solutionStepsAr: [
					`نحدّد الإشارة: يوجد ${thirdFactor < 0 ? '3 عوامل سالبة (عدد فردي)' : 'عاملان سالبان (عدد زوجي)'}، إذن الجداء ${ansA < 0 ? 'سالب' : 'موجب'}.`,
					`نحسب بذكاء: $(-${decA}) \\times (-${intB}) = ${decProd}$.`,
					`نضرب في العامل الثالث: $${decProd} \\times ${fmtSignedPlain(thirdFactor)} = ${ansA}$.`
				],
				finalAnswer: `${ansA}`
			};
		}

		// hard: chain with priority, brackets, and quotient of products
		const a = rng.int(4, 15);
		const b = -rng.int(2, 6);
		const c = rng.int(2, 5);
		const e = -rng.int(2, 5);
		const qDiv = rng.int(2, 7);
		const d = -qDiv * Math.abs(e); // (-d) / (-e) -> exact negative or positive
		// Chain: A = a - b * c + d / e
		const termMul = b * c; // negative
		const termDiv = d / e; // positive since d<0, e<0
		const ansChain = a - termMul + termDiv;

		// Brackets chain: B = [(-x) + (+y)] * (-z) - (-w)
		const x = rng.int(6, 14);
		const y = rng.int(2, x - 2); // so -x + y is negative
		const z = rng.int(2, 5);
		const w = rng.int(3, 12);
		const ansBrackets = (-x + y) * -z - -w;

		// Quotient of products: C = ((-m) * (-n) * k) / ((-p) * q)
		const p = rng.int(2, 5);
		const q = rng.int(2, 4);
		const mMul = rng.int(2, 4);
		const nMul = rng.int(2, 5);
		const m = -p * mMul;
		const n = -q * nMul;
		const k = rng.int(2, 5);
		const ansQuot = (m * n * k) / (-p * q);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `احسب سلسلة العمليات التالية باحترام الأولويات:\n\n$$A = ${a} - ${fmtSignedPlain(b)} \\times ${c} + ${fmtSignedPlain(d)} \\div ${fmtSignedPlain(e)}$$`,
				questionTextAr: `احسب السلسلة: $A = ${a} - ${fmtSignedPlain(b)} \\times ${c} + ${fmtSignedPlain(d)} \\div ${fmtSignedPlain(e)}$`,
				questionData: {
					answer: ansChain,
					displayTemplate: 'A = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `الأولوية للضرب والقسمة: $${fmtSignedPlain(b)} \\times ${c} = ${termMul}$ و $${fmtSignedPlain(d)} \\div ${fmtSignedPlain(e)} = +${termDiv}$. ثم $${a} - (${termMul}) + ${termDiv} = ${a} + ${Math.abs(termMul)} + ${termDiv} = ${ansChain}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'احسب بتمعّن سلاسل العمليات التالية مبرزاً مراحل الحساب:',
				content: [
					{
						type: 'text',
						content: `1) $A = ${a} - ${fmtSignedPlain(b)} times ${c} + ${fmtSignedPlain(d)} div ${fmtSignedPlain(e)}$`,
						answer: `1) $A = ${a} - (${termMul}) + ${termDiv} = ${a} + ${Math.abs(termMul)} + ${termDiv} = ${ansChain}$`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) $B = [${fmtSignedPlain(-x)} + (+${y})] times ${fmtSignedPlain(-z)} - ${fmtSignedPlain(-w)}$`,
						answer: `2) $B = ${fmtSignedPlain(-x + y)} times ${fmtSignedPlain(-z)} + ${w} = ${(-x + y) * -z} + ${w} = ${ansBrackets}$`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) $C = frac(${fmtSignedPlain(m)} times ${fmtSignedPlain(n)} times (+${k}), ${fmtSignedPlain(-p)} times (+${q}))$`,
						answer: `3) البسط $= ${m * n * k}$ والمقام $= ${-p * q}$، إذن $C = ${ansQuot}$.`,
						mark: '1'
					}
				]
			},
			hints: [
				'الأولوية دائماً للضرب والقسمة قبل الجمع والطرح.',
				`احسب أولاً الجداء $${fmtSignedPlain(b)} \\times ${c} = ${termMul}$ وحاصل القسمة $${fmtSignedPlain(d)} \\div ${fmtSignedPlain(e)} = ${termDiv}$.`,
				`تذكّر أن طرح عدد سالب يتحول إلى جمع معاكسه: $${a} - (${termMul}) = ${a} + ${Math.abs(termMul)}$.`
			],
			solutionStepsAr: [
				`ننجز الضرب والقسمة أولاً: $${fmtSignedPlain(b)} \\times ${c} = ${termMul}$ و $${fmtSignedPlain(d)} \\div ${fmtSignedPlain(e)} = ${termDiv}$.`,
				`نعوّض في السلسلة: $A = ${a} - (${termMul}) + ${termDiv}$.`,
				`نحوّل الطرح إلى جمع المعاكس: $A = ${a} + ${Math.abs(termMul)} + ${termDiv} = ${ansChain}$.`
			],
			finalAnswer: `${ansChain}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Rational Numbers Operations (+, -, ×, ÷) & Reciprocal (الأعداد الناطقة)
// ═══════════════════════════════════════════════════════════════════════════════
const rationalOperationsTemplate: ParameterizedTemplate = {
	id: '3am_t1_rational_operations',
	grade: '3am',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'الكسور والأعداد الناطقة: المقلوب والعمليات الأربع',
	curriculumLessonId: 'lesson_3am_t1_rational_numbers_operations',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		if (difficulty === 'easy') {
			const dens = [2, 3, 4, 5, 7];
			const b = rng.pick(dens);
			const d = rng.pick(dens.filter((x) => x !== b));
			let a = rng.int(1, b + 2);
			if (a % b === 0) a++;
			let c = rng.int(2, d + 2);
			if (c % d === 0 || c === d) c = d === 2 ? 3 : 2;

			const signA = seed % 2 === 0 ? -1 : 1;
			const signC = seed % 2 === 0 ? 1 : -1;
			const num1 = signA * a;
			const num2 = signC * c;

			// Quotient: (num1 / b) ÷ (num2 / d) = (num1 * d) / (b * num2)
			const [qp, qq] = simplifyFraction(num1 * d, b * num2);
			const ansKatex = `$${fmtKatexFrac(qp, qq)}$`;

			// Distractor 1: forgot to invert second fraction -> (num1 * num2) / (b * d)
			const [w1p, w1q] = simplifyFraction(num1 * num2, b * d);
			// Distractor 2: inverted first fraction instead of second -> (b * num2) / (num1 * d)
			const [w2p, w2q] = simplifyFraction(b * num2, num1 * d);
			// Distractor 3: wrong sign on correct result
			const [w3p, w3q] = [-qp, qq];

			const mcq = buildUniqueMcqOptions(
				ansKatex,
				[
					{
						text: `$${fmtKatexFrac(w1p, w1q)}$`,
						diagnosticFeedback:
							'انتبه: لقسمة عدد ناطق على آخر نضرب العدد الأول في مقلوب العدد الثاني، ولا نضرب الكسرين مباشرة!'
					},
					{
						text: `$${fmtKatexFrac(w2p, w2q)}$`,
						diagnosticFeedback:
							'أخذت مقلوب الكسر الأول بدلاً من مقلوب الكسر الثاني (القاسم)!'
					},
					{
						text: `$${fmtKatexFrac(w3p, w3q)}$`,
						diagnosticFeedback:
							'تحقق من قاعدة الإشارات: قسمة عددين مختلفين في الإشارة تعطي عدداً سالباً.'
					},
					{
						text: `$${fmtKatexFrac(num1 * d + num2 * b, b * d)}$`,
						diagnosticFeedback:
							'العملية المطلوبة هي قسمة كسرين وليس جمعهما.'
					},
					{
						text: `$${fmtKatexFrac(-w1p, w1q)}$`,
						diagnosticFeedback:
							'لقسمة كسرين نضرب الكسر الأول في مقلوب الكسر الثاني، مع احترام قاعدة الإشارات.'
					}
				],
				rng
			);

			// Subquestion 1: reciprocals
			const recA = rng.int(2, 9);
			const recB = rng.pick([3, 5, 7, 11]);
			const recInt = -rng.int(2, 9);

			// Subquestion 2: multiplication
			const m1 = -rng.int(2, 5);
			const n1 = rng.pick([3, 5, 7]);
			const m2 = rng.int(2, 5);
			const n2 = rng.pick([2, 4, 6]);
			const [mp, mq] = simplifyFraction(m1 * m2, n1 * n2);

			// Subquestion 3: addition with related denominators
			const baseDen = rng.pick([3, 4, 5]);
			const kMult = rng.pick([2, 3]);
			const addNum1 = -rng.int(1, baseDen - 1);
			const addNum2 = rng.int(1, baseDen * kMult - 1);
			const [ap, aq] = simplifyFraction(addNum1 * kMult + addNum2, baseDen * kMult);

			return {
				templateId: this.id,
				seed,
				grade: '3am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `احسب واكتب الناتج في أبسط شكل ممكن:\n\n$$B = ${fmtKatexRawFrac(num1, b)} \\div ${fmtKatexSignedFracParen(num2, d)}$$`,
					questionTextAr: `احسب وبسّط: $B = ${fmtKatexRawFrac(num1, b)} \\div ${fmtKatexSignedFracParen(num2, d)}$`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `نضرب الكسر الأول في مقلوب الكسر الثاني: $B = ${fmtKatexRawFrac(num1, b)} \\times ${fmtKatexSignedFracParen(d, num2)} = ${fmtKatexFrac(num1 * d, b * num2)}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'أجب عن الأسئلة التالية حول المقلوب والعمليات على الأعداد الناطقة:',
					content: [
						{
							type: 'text',
							content: `1) أعطِ مقلوب كلّ من الأعداد الناطقة غير المعدومة التالية: $frac(${recA}, ${recB})$ ، $${recInt}$ ، و $-frac(2, ${recB})$`,
							answer: `1) مقلوب $frac(${recA}, ${recB})$ هو $frac(${recB}, ${recA})$ ، مقلوب $${recInt}$ هو $-frac(1, ${Math.abs(recInt)})$ ، ومقلوب $-frac(2, ${recB})$ هو $-frac(${recB}, 2)$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) احسب ثم بسّط الجداء وحاصل القسمة: $A = ${fmtTypstRawFrac(m1, n1)} times ${fmtTypstRawFrac(m2, n2)}$ و $B = ${fmtTypstRawFrac(num1, b)} div ${fmtTypstSignedFracParen(num2, d)}$`,
							answer: `2) $A = ${fmtTypstFrac(mp, mq)}$ ، و $B = ${fmtTypstRawFrac(num1, b)} times ${fmtTypstSignedFracParen(d, num2)} = ${fmtTypstFrac(qp, qq)}$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) احسب المجموع التالي بتوحيد المقامين: $C = ${fmtTypstRawFrac(addNum1, baseDen)} + frac(${addNum2}, ${baseDen * kMult})$`,
							answer: `3) $C = frac(${addNum1 * kMult}, ${baseDen * kMult}) + frac(${addNum2}, ${baseDen * kMult}) = ${fmtTypstFrac(ap, aq)}$.`,
							mark: '1'
						}
					]
				},
				hints: [
					'قسمة عدد ناطق على عدد ناطق غير معدوم تساوي ضرب العدد الأول في مقلوب الثاني.',
					`مقلوب الكسر $${fmtKatexRawFrac(num2, d)}$ هو $${fmtKatexRawFrac(d, num2)}$ (نحتفظ بالإشارة السالبة ونقلب البسط والمقام).`,
					`اضرب البسط في البسط والمقام في المقام، ثم بسّط الناتج.`
				],
				solutionStepsAr: [
					`مقلوب $${fmtKatexRawFrac(num2, d)}$ هو $${fmtKatexRawFrac(d, num2)}$.`,
					`نحول القسمة إلى ضرب: $B = ${fmtKatexRawFrac(num1, b)} \\times ${fmtKatexSignedFracParen(d, num2)} = ${fmtKatexRawFrac(num1 * d, b * num2)}$.`,
					`بعد التبسيط (الاختزال) نحصل على: $${fmtKatexFrac(qp, qq)}$.`
				],
				finalAnswer: `${qp}/${qq}`
			};
		}

		if (difficulty === 'medium') {
			const coprimePairs: Array<[number, number]> = [
				[2, 3],
				[3, 4],
				[2, 5],
				[3, 5],
				[4, 5],
				[3, 7]
			];
			const [b, d] = rng.pick(coprimePairs);
			const a = -rng.int(1, b + 1);
			let c = rng.int(1, d + 1);
			if (a + c === 0) c = c === d ? 1 : c + 1;
			const commonD = b * d;
			const [sp, sq] = simplifyFraction(a * d + c * b, commonD);
			const ansKatex = `$${fmtKatexFrac(sp, sq)}$`;

			// Distractor 1: naive addition of numerators and denominators
			const naiveDen = b + d;
			const [w1p, w1q] = simplifyFraction(a + c, naiveDen);
			// Distractor 2: forgot to multiply numerators when unifying denominators
			const [w2p, w2q] = simplifyFraction(a + c, commonD);
			// Distractor 3: wrong sign on a (treated -a/b as +a/b)
			const [w3p, w3q] = simplifyFraction(-a * d + c * b, commonD);
			// Backup distractors if two errors coincide numerically
			const [w4p, w4q] = simplifyFraction(a * c, commonD);
			const [w5p, w5q] = [-sp, sq];

			const mcq = buildUniqueMcqOptions(
				ansKatex,
				[
					{
						text: `$${fmtKatexFrac(w1p, w1q)}$`,
						diagnosticFeedback:
							'خطأ شائع: جمعت البسطين معاً والمقامين معاً! يجب توحيد المقامين أولاً.'
					},
					{
						text: `$${fmtKatexFrac(w2p, w2q)}$`,
						diagnosticFeedback:
							'وحّدت المقام المشترك، لكنك نسيت ضرب البسطين في نفس العدد الذي ضربت فيه المقامين!'
					},
					{
						text: `$${fmtKatexFrac(w3p, w3q)}$`,
						diagnosticFeedback:
							'انتبه إلى الإشارة السالبة أمام الكسر الأول عند جمع البسطين.'
					},
					{
						text: `$${fmtKatexFrac(w4p, w4q)}$`,
						diagnosticFeedback:
							'العملية المطلوبة هي جمع عددين ناطقين وليس ضربهما.'
					},
					{
						text: `$${fmtKatexFrac(w5p, w5q)}$`,
						diagnosticFeedback:
							'تحقق من إشارة مجموع البسطين بعد توحيد المقامين.'
					}
				],
				rng
			);

			// Subquestion 1: comparison of two negative rational numbers
			const cmpDen1 = rng.pick([3, 4, 5]);
			const cmpDen2 = cmpDen1 * 2;
			const cmpNum1 = -rng.int(2, cmpDen1 + 1);
			let cmpNum2 = -rng.int(3, cmpDen2 + 1);
			if (cmpNum1 * 2 === cmpNum2) cmpNum2 -= 1;
			const cmpSym = cmpNum1 * 2 < cmpNum2 ? '<' : '>';

			// Subquestion 2: difference with negative
			const [e, f] = rng.pick(coprimePairs);
			const g = -rng.int(1, f);
			const h = rng.int(1, e);
			const [dp, dq] = simplifyFraction(h * f - g * e, e * f);

			// Subquestion 3: division
			const p1 = -rng.int(2, 5);
			const q1 = rng.pick([3, 5, 7]);
			const r1 = -rng.int(2, 5);
			const s1 = rng.pick([2, 4, 6]);
			const [divP, divQ] = simplifyFraction(p1 * s1, q1 * r1);

			return {
				templateId: this.id,
				seed,
				grade: '3am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `احسب المجموع التالي واكتب الناتج على شكل كسر مبسّط:\n\n$$A = ${fmtKatexRawFrac(a, b)} + ${fmtKatexRawFrac(c, d)}$$`,
					questionTextAr: `احسب وبسّط: $A = ${fmtKatexRawFrac(a, b)} + ${fmtKatexRawFrac(c, d)}$`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `نوحد المقامين بجدائهما (${commonD}): $\\frac{${a * d}}{${commonD}} + \\frac{${c * b}}{${commonD}} = \\frac{${a * d + c * b}}{${commonD}} = ${fmtKatexFrac(sp, sq)}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'أنجز العمليات التالية على الأعداد الناطقة وبسّط النتائج:',
					content: [
						{
							type: 'text',
							content: `1) قارن بين العددين الناطقين مع التعليل: $${fmtTypstRawFrac(cmpNum1, cmpDen1)}$ و $${fmtTypstRawFrac(cmpNum2, cmpDen2)}$`,
							answer: `1) بتوحيد المقامين: $${fmtTypstRawFrac(cmpNum1, cmpDen1)} = ${fmtTypstRawFrac(cmpNum1 * 2, cmpDen2)}$ ، وبما أن $${cmpNum1 * 2} ${cmpSym} ${cmpNum2}$ فإن $${fmtTypstRawFrac(cmpNum1, cmpDen1)} ${cmpSym} ${fmtTypstRawFrac(cmpNum2, cmpDen2)}$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) احسب المجموع والفرق: $A = ${fmtTypstRawFrac(a, b)} + ${fmtTypstRawFrac(c, d)}$ و $B = ${fmtTypstRawFrac(h, e)} - ${fmtTypstSignedFracParen(g, f)}$`,
							answer: `2) $A = frac(${a * d} + ${c * b}, ${commonD}) = ${fmtTypstFrac(sp, sq)}$ ، و $B = frac(${h * f} + ${Math.abs(g) * e}, ${e * f}) = ${fmtTypstFrac(dp, dq)}$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) احسب حاصل القسمة: $C = ${fmtTypstRawFrac(p1, q1)} div ${fmtTypstSignedFracParen(r1, s1)}$`,
							answer: `3) $C = ${fmtTypstRawFrac(p1, q1)} times ${fmtTypstSignedFracParen(s1, r1)} = ${fmtTypstFrac(divP, divQ)}$.`,
							mark: '1'
						}
					]
				},
				hints: [
					`وحّد المقامين باختيار جداء المقامين: $${b} \\times ${d} = ${commonD}$.`,
					`اضرب بسط ومقام الكسر الأول في $${d}$، وبسط ومقام الكسر الثاني في $${b}$.`,
					`اجمع البسطين بإشارتيهما: $${a * d} + ${c * b}$ واحتفظ بالمقام $${commonD}$.`
				],
				solutionStepsAr: [
					`نوحد المقامين إلى $${commonD}$: $${fmtKatexRawFrac(a, b)} = \\frac{${a * d}}{${commonD}}$ و $${fmtKatexRawFrac(c, d)} = \\frac{${c * b}}{${commonD}}$.`,
					`نجمع البسطين مع الحفاظ على المقام الموحد: $\\frac{${a * d} + ${c * b}}{${commonD}} = ${fmtKatexRawFrac(a * d + c * b, commonD)}$.`,
					`نختزل الكسر إن أمكن فنجد $${fmtKatexFrac(sp, sq)}$.`
				],
				finalAnswer: `${sp}/${sq}`
			};
		}

		// hard: priority chain A = a/b + (c/d) ÷ (e/f) with signed rationals
		const pairs: Array<[number, number, number, number, number]> = [
			[2, 3, 4, 3, 2],
			[3, 4, 3, 2, 5],
			[2, 5, 2, 3, 4],
			[3, 5, 4, 3, 2],
			[4, 3, 2, 5, 3]
		];
		const [b, c, d, e, f] = rng.pick(pairs);
		const a = rng.int(1, 4);
		const signedC = -c;
		// divPart = (signedC/d) ÷ (e/f) = (signedC * f) / (d * e)
		const [dp, dq] = simplifyFraction(signedC * f, d * e);
		const [ansP, ansQ] = simplifyFraction(a * dq + dp * b, b * dq);
		const ansKatex = `$${fmtKatexFrac(ansP, ansQ)}$`;

		// Distractor 1: wrong priority (a/b + signedC/d) ÷ (e/f)
		const [sumFirstP, sumFirstQ] = simplifyFraction(a * d + signedC * b, b * d);
		const [w1p, w1q] = simplifyFraction(sumFirstP * f, sumFirstQ * e);
		// Distractor 2: multiplied instead of divided in second term: a/b + (signedC*e)/(d*f)
		const [mulP, mulQ] = simplifyFraction(signedC * e, d * f);
		const [w2p, w2q] = simplifyFraction(a * mulQ + mulP * b, b * mulQ);
		// Distractor 3: sign error (positive divPart instead of negative)
		const [w3p, w3q] = simplifyFraction(a * dq - dp * b, b * dq);

		const mcq = buildUniqueMcqOptions(
			ansKatex,
			[
				{
					text: `$${fmtKatexFrac(w1p, w1q)}$`,
					diagnosticFeedback:
						'خطأ في أولوية العمليات: أنجزت الجمع قبل القسمة! يجب حساب حاصل القسمة أولاً.'
				},
				{
					text: `$${fmtKatexFrac(w2p, w2q)}$`,
					diagnosticFeedback:
						'نسيت قلب الكسر المقسوم عليه عند تحويل القسمة إلى ضرب!'
				},
				{
					text: `$${fmtKatexFrac(w3p, w3q)}$`,
					diagnosticFeedback:
						'تحقق من الإشارة السالبة لحاصل القسمة عند جمعه مع الكسر الأول.'
				},
				{
					text: `$${fmtKatexFrac(-ansP, ansQ)}$`,
					diagnosticFeedback:
						'راجع إشارة النتيجة النهائية بعد توحيد المقامين.'
				}
			],
			rng
		);

		// Subquestion 2: brackets (-u/v - w/z) * (p/q)
		const u = -rng.int(1, 3);
		const v = rng.pick([2, 3]);
		const w = rng.int(1, 3);
		const z = v === 2 ? 3 : 2;
		const [brP, brQ] = simplifyFraction(u * z - w * v, v * z);
		const pMul = rng.pick([3, 5]);
		const qMul = rng.pick([2, 4]);
		const [bAnsP, bAnsQ] = simplifyFraction(brP * pMul, brQ * qMul);

		// Subquestion 3: division written as fraction bar (m/n) ÷ (-r/s)
		const m3 = rng.int(2, 5);
		const n3 = rng.pick([3, 5, 7]);
		const r3 = -rng.int(2, 5);
		const s3 = rng.pick([2, 4, 6]);
		const [cAnsP, cAnsQ] = simplifyFraction(m3 * s3, n3 * r3);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `احسب سلسلة العمليات التالية باحترام الأولويات، ثم بسّط الناتج:\n\n$$A = \\frac{${a}}{${b}} + ${fmtKatexRawFrac(signedC, d)} \\div \\frac{${e}}{${f}}$$`,
				questionTextAr: `احسب باحترام الأولويات: $A = \\frac{${a}}{${b}} + ${fmtKatexRawFrac(signedC, d)} \\div \\frac{${e}}{${f}}$`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الأولوية للقسمة: $${fmtKatexRawFrac(signedC, d)} \\div \\frac{${e}}{${f}} = ${fmtKatexRawFrac(signedC, d)} \\times \\frac{${f}}{${e}} = ${fmtKatexFrac(dp, dq)}$. ثم نجمع: $\\frac{${a}}{${b}} + ${fmtKatexSignedFracParen(dp, dq)} = ${fmtKatexFrac(ansP, ansQ)}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'احسب العبارات التالية باحترام أولوية العمليات واكتب كل نتيجة في أبسط شكل:',
				content: [
					{
						type: 'text',
						content: `1) $A = frac(${a}, ${b}) + ${fmtTypstRawFrac(signedC, d)} div frac(${e}, ${f})$`,
						answer: `1) الأولوية للقسمة: $A = frac(${a}, ${b}) + ${fmtTypstSignedFracParen(dp, dq)} = ${fmtTypstFrac(ansP, ansQ)}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) $B = (${fmtTypstRawFrac(u, v)} - frac(${w}, ${z})) times frac(${pMul}, ${qMul})$`,
						answer: `2) الأولوية للأقواس: $B = ${fmtTypstSignedFracParen(brP, brQ)} times frac(${pMul}, ${qMul}) = ${fmtTypstFrac(bAnsP, bAnsQ)}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) $C = frac(frac(${m3}, ${n3}), ${fmtTypstRawFrac(r3, s3)})$`,
						answer: `3) $C = frac(${m3}, ${n3}) div ${fmtTypstSignedFracParen(r3, s3)} = frac(${m3}, ${n3}) times ${fmtTypstSignedFracParen(s3, r3)} = ${fmtTypstFrac(cAnsP, cAnsQ)}$.`,
						mark: '1'
					}
				]
			},
			hints: [
				'في سلسلة عمليات دون أقواس، الأولوية للقسمة والضرب قبل الجمع والطرح.',
				`ابدأ بحساب $${fmtKatexRawFrac(signedC, d)} \\div \\frac{${e}}{${f}}$ بالضرب في المقلوب $\\frac{${f}}{${e}}$.`,
				`بعد الحصول على $${fmtKatexFrac(dp, dq)}$، وحّد المقامات لجمعه مع $\\frac{${a}}{${b}}$.`
			],
			solutionStepsAr: [
				`الأولوية للقسمة: $${fmtKatexRawFrac(signedC, d)} \\div \\frac{${e}}{${f}} = ${fmtKatexRawFrac(signedC, d)} \\times \\frac{${f}}{${e}} = ${fmtKatexFrac(dp, dq)}$.`,
				`نوحد مقامي $\\frac{${a}}{${b}}$ و $${fmtKatexFrac(dp, dq)}$ نحو المقام المشترك $${b * dq}$.`,
				`نحسب المجموع ونبسّط فنحصل على $${fmtKatexFrac(ansP, ansQ)}$.`
			],
			finalAnswer: `${ansP}/${ansQ}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Powers of 10 with Integer Exponents & Rules (قوى العدد 10 وقواعد الحساب)
// ═══════════════════════════════════════════════════════════════════════════════
const powersOf10Template: ParameterizedTemplate = {
	id: '3am_t1_powers_of_10',
	grade: '3am',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'قوى العدد 10 ذات الأسس الصحيحة النسبية وقواعد الحساب عليها',
	curriculumLessonId: 'lesson_3am_t1_powers_of_10',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		if (difficulty === 'easy') {
			const negK = rng.int(2, 5);
			const decDot = pow10ToDecimal(-negK);
			const decComma = decDot.replace('.', ',');

			const posN = rng.int(2, 5);
			const intDigits = rng.int(12, 89);
			const bigDec = `${intDigits}${'0'.repeat(posN)}`;
			const smallDigits = rng.int(13, 94);
			const smallPow = rng.int(3, 5);
			const smallDec = `0.${'0'.repeat(smallPow - 2)}${smallDigits}`;

			const m1 = rng.int(2, 6);
			const n1 = -rng.int(1, 5);
			const p2 = rng.int(3, 7);
			const q2 = rng.int(1, 5);
			const r3 = rng.int(2, 4);
			const s3 = rng.int(2, 3);

			return {
				templateId: this.id,
				seed,
				grade: '3am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'fill_blank',
					questionText: `اكتب القوة $${fmtKatexPow10(-negK)}$ في شكل عدد عشري (استعمل النقطة العشرية \`.\`):`,
					questionTextAr: `اكتب $${fmtKatexPow10(-negK)}$ في شكل عدد عشري:`,
					questionData: {
						sentence: `الكتابة العشرية للعدد 10^(${-negK}) هي: ___`,
						acceptedAnswers: [decDot, decComma],
						answers: [decDot, decComma]
					},
					explanation: `القوة ذات الأس السالب هي مقلوب القوة الموجبة: $10^{-${negK}} = \\frac{1}{10^{${negK}}} = \\frac{1}{${posPow10ToStr(negK)}} = ${decDot}$ (عدد موجب يحتوي على ${negK} أرقام بعد الفاصلة).`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'أجب عن الأسئلة التالية المتعلقة بقوى العدد $10$:',
					content: [
						{
							type: 'text',
							content: `1) أعطِ الكتابة العشرية لكل من: $${fmtTypstPow10(posN)}$ ، $${fmtTypstPow10(-negK)}$ ، و $10^0$`,
							answer: `1) $${fmtTypstPow10(posN)} = ${posPow10ToStr(posN)}$ ، $${fmtTypstPow10(-negK)} = ${decDot}$ ، و $10^0 = 1$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) اكتب العددين العشريين التاليين على الشكل $a times 10^n$ حيث $a$ عدد صحيح: $${bigDec}$ و $${smallDec}$`,
							answer: `2) $${bigDec} = ${intDigits} times ${fmtTypstPow10(posN)}$ ، و $${smallDec} = ${smallDigits} times ${fmtTypstPow10(-smallPow)}$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) اكتب على شكل قوة واحدة للعدد $10$: $A = ${fmtTypstPow10(m1)} times ${fmtTypstPow10(n1)}$ ، $B = frac(${fmtTypstPow10(p2)}, ${fmtTypstPow10(q2)})$ ، $C = (${fmtTypstPow10(r3)})^${s3}$`,
							answer: `3) $A = ${fmtTypstPow10(m1 + n1)}$ ، $B = ${fmtTypstPow10(p2 - q2)}$ ، $C = ${fmtTypstPow10(r3 * s3)}$.`,
							mark: '1'
						}
					]
				},
				hints: [
					`تذكّر أن القوة ذات الأس السالب $10^{-n}$ تساوي $\\frac{1}{10^n}$ وهي عدد موجب أصغر من $1$.`,
					`في $10^{-${negK}}$ يوجد $${negK}$ أرقام بعد الفاصلة (أي $0$ متبوعاً بـ $${negK - 1}$ أصفار ثم الرقم $1$).`,
					`القيمة العشرية هي عدد بين $0$ و $1$ ينتهي بالرقم $1$.`
				],
				solutionStepsAr: [
					`نطبّق تعريف الأس السالب: $10^{-${negK}} = \\frac{1}{10^{${negK}}}$.`,
					`بما أن $10^{${negK}} = ${posPow10ToStr(negK)}$، فإن $\\frac{1}{${posPow10ToStr(negK)}} = ${decDot}$.`
				],
				finalAnswer: decDot
			};
		}

		if (difficulty === 'medium') {
			const m = rng.int(3, 8);
			const n = -rng.int(2, 6);
			const p = -rng.int(1, 5);
			const ansExp = m + n - p;

			const dVal = rng.pick([2.4, 3.5, 4.8, 0.065, 0.37]);
			const shiftPow = dVal < 1 ? rng.int(3, 4) : -rng.int(2, 3);
			const decProd = roundTo(dVal * Math.pow(10, shiftPow), 5);

			const u = rng.int(-5, 6);
			const v = rng.int(-4, 5);
			const w = rng.int(-3, 4);

			return {
				templateId: this.id,
				seed,
				grade: '3am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: `بسّط العبارة التالية واكتبها على الشكل $10^k$، ثم أدخل قيمة الأس $k$:\n\n$$A = \\frac{${fmtKatexPow10(m)} \\times ${fmtKatexPow10(n)}}{${fmtKatexPow10(p)}}$$`,
					questionTextAr: `اكتب $A = \\frac{${fmtKatexPow10(m)} \\times ${fmtKatexPow10(n)}}{${fmtKatexPow10(p)}}$ على الشكل $10^k$. ما قيمة $k$؟`,
					questionData: {
						answer: ansExp,
						displayTemplate: 'k = ?',
						variables: [],
						tolerance: 0
					},
					explanation: `في البسط نجمع الأسين: $10^{${m} + (${n})} = 10^{${m + n}}$. ثم في القسمة نطرح أس المقام: $k = ${m + n} - (${p}) = ${m + n} + ${Math.abs(p)} = ${ansExp}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'وظّف قواعد الحساب على قوى العدد $10$ لحل ما يلي:',
					content: [
						{
							type: 'text',
							content: `1) احسب العبارة $D = ${dVal} times ${fmtTypstPow10(shiftPow)}$ وأعطِ الناتج بالكتابة العشرية.`,
							answer: `1) $D = ${decProd}$ (بإزاحة الفاصلة بـ $${Math.abs(shiftPow)}$ مراتب نحو ${shiftPow > 0 ? 'اليمين' : 'اليسار'}).`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) اكتب على شكل قوة واحدة للعدد $10$: $B = ${fmtTypstPow10(u)} times ${fmtTypstPow10(v)} times ${fmtTypstPow10(w)}$`,
							answer: `2) $B = 10^(${u} + ${v < 0 ? `(${v})` : v} + ${w < 0 ? `(${w})` : w}) = ${fmtTypstPow10(u + v + w)}$`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) بسّط على الشكل $10^k$: $A = frac(${fmtTypstPow10(m)} times ${fmtTypstPow10(n)}, ${fmtTypstPow10(p)})$`,
							answer: `3) $A = frac(${fmtTypstPow10(m + n)}, ${fmtTypstPow10(p)}) = 10^(${m + n} - (${p})) = ${fmtTypstPow10(ansExp)}$`,
							mark: '1'
						}
					]
				},
				hints: [
					'تذكّر القاعدتين: $10^m \\times 10^n = 10^{m+n}$ و $\\frac{10^a}{10^b} = 10^{a-b}$.',
					`احسب أولاً أس البسط: $${m} + (${n}) = ${m + n}$.`,
					`اطرح أس المقام: $${m + n} - (${p}) = ${m + n} + ${Math.abs(p)}$.`
				],
				solutionStepsAr: [
					`نحسب جداء البسط: $${fmtKatexPow10(m)} \\times ${fmtKatexPow10(n)} = 10^{${m} + (${n})} = ${fmtKatexPow10(m + n)}$.`,
					`نطبّق قاعدة القسمة بطرح الأسين: $\\frac{${fmtKatexPow10(m + n)}}{${fmtKatexPow10(p)}} = 10^{${m + n} - (${p})} = ${fmtKatexPow10(ansExp)}$.`,
					`إذن قيمة الأس المطلوب هي $k = ${ansExp}$.`
				],
				finalAnswer: `${ansExp}`
			};
		}

		// hard: power of a power + division by negative exponent + science application
		const m = -rng.int(2, 4);
		const n = rng.int(2, 3);
		const p = rng.int(3, 7);
		const q = -rng.int(2, 5);
		const top1 = m * n;
		const topSum = top1 + p;
		const ansK = topSum - q;
		const ansKatex = `$${fmtKatexPow10(ansK)}$`;

		// Distractors:
		// 1) added m + n instead of m * n
		const w1 = m + n + p - q;
		// 2) added q instead of subtracting q (sign error on -(-q))
		const w2 = topSum + q;
		// 3) multiplied top1 * p instead of top1 + p
		const w3 = top1 * p - q === ansK ? ansK + 2 : top1 * p - q;

		const mcq = buildUniqueMcqOptions(
			ansKatex,
			[
				{
					text: `$${fmtKatexPow10(w1)}$`,
					diagnosticFeedback:
						'خطأ في قاعدة قوة قوة: $(10^m)^n = 10^{m \\times n}$ وليس $10^{m + n}$!'
				},
				{
					text: `$${fmtKatexPow10(w2)}$`,
					diagnosticFeedback:
						'انتبه لإشارة أس المقام عند الطرح: $a - (-b) = a + b$ وليس $a - b$!'
				},
				{
					text: `$${fmtKatexPow10(w3)}$`,
					diagnosticFeedback:
						'عند ضرب قوتين لنفس الأساس $10$ نجمع الأسين ولا نضربهما.'
				},
				{
					text: `$${fmtKatexPow10(ansK + 1)}$`,
					diagnosticFeedback:
						'تحقق من جمع وطرح الأسس النسبية خطوة بخطوة.'
				}
			],
			rng
		);

		const a2 = rng.int(2, 4);
		const b2 = -rng.int(2, 3);
		const c2 = -rng.int(2, 4);
		const d2 = 2;
		const e2 = rng.int(1, 3);
		const ansBExp = a2 * b2 - (c2 * d2 + e2);

		const capMb = rng.pick([100, 1000]);
		const capPow = capMb === 100 ? 2 : 3;
		const bytePow = capPow + 6; // 1 MB = 10^6 bytes -> total = 10^(capPow+6) bytes

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `بسّط العبارة التالية واكتبها على شكل قوة واحدة للعدد $10$:\n\n$$A = \\frac{(${fmtKatexPow10(m)})^{${n}} \\times ${fmtKatexPow10(p)}}{${fmtKatexPow10(q)}}$$`,
				questionTextAr: `بسّط العبارة على شكل قوة واحدة للعدد $10$: $A = \\frac{(${fmtKatexPow10(m)})^{${n}} \\times ${fmtKatexPow10(p)}}{${fmtKatexPow10(q)}}$`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نبدأ بقوة القوة: $(${fmtKatexPow10(m)})^{${n}} = ${fmtKatexPow10(top1)}$. ثم الجداء: $${fmtKatexPow10(top1)} \\times ${fmtKatexPow10(p)} = ${fmtKatexPow10(topSum)}$. وأخيراً القسمة: $${topSum} - (${q}) = ${ansK}$، أي $${fmtKatexPow10(ansK)}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'بسّط العبارات التالية إلى قوة واحدة للعدد $10$ ثم حل التطبيق:',
				content: [
					{
						type: 'text',
						content: `1) $A = frac((${fmtTypstPow10(m)})^${n} times ${fmtTypstPow10(p)}, ${fmtTypstPow10(q)})$`,
						answer: `1) $A = frac(${fmtTypstPow10(top1)} times ${fmtTypstPow10(p)}, ${fmtTypstPow10(q)}) = frac(${fmtTypstPow10(topSum)}, ${fmtTypstPow10(q)}) = 10^(${topSum} - (${q})) = ${fmtTypstPow10(ansK)}$`,
						mark: '1.25'
					},
					{
						type: 'text',
						content: `2) $B = frac((${fmtTypstPow10(a2)})^(${b2}), (${fmtTypstPow10(c2)})^${d2} times ${fmtTypstPow10(e2)})$`,
						answer: `2) $B = frac(${fmtTypstPow10(a2 * b2)}, ${fmtTypstPow10(c2 * d2)} times ${fmtTypstPow10(e2)}) = frac(${fmtTypstPow10(a2 * b2)}, ${fmtTypstPow10(c2 * d2 + e2)}) = ${fmtTypstPow10(ansBExp)}$`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) في المعلوماتية، سعة قرص تخزين تساوي $${capMb}$ ميغابايت، علماً أن $1$ ميغابايت يساوي $${fmtTypstPow10(6)}$ بايت. عبّر عن سعة القرص بالبايت على شكل قوة للعدد $10$.`,
						answer: `3) $${capMb} = ${fmtTypstPow10(capPow)}$ ، إذن السعة بالبايت هي: $${fmtTypstPow10(capPow)} times ${fmtTypstPow10(6)} = ${fmtTypstPow10(bytePow)}$ بايت.`,
						mark: '0.75'
					}
				]
			},
			hints: [
				'الأولوية لقوة القوة $(10^m)^n = 10^{m \\times n}$ قبل الضرب والقسمة.',
				`احسب $(${fmtKatexPow10(m)})^{${n}} = ${fmtKatexPow10(top1)}$، ثم اضربه في $${fmtKatexPow10(p)}$ بجمع الأسين.`,
				`عند القسمة على $${fmtKatexPow10(q)}$ اطرح الأس السالب: $${topSum} - (${q}) = ${topSum} + ${Math.abs(q)}$.`
			],
			solutionStepsAr: [
				`قوة القوة: $(${fmtKatexPow10(m)})^{${n}} = 10^{${m} \\times ${n}} = ${fmtKatexPow10(top1)}$.`,
				`جداء البسط: $${fmtKatexPow10(top1)} \\times ${fmtKatexPow10(p)} = ${fmtKatexPow10(topSum)}$.`,
				`القسمة: $\\frac{${fmtKatexPow10(topSum)}}{${fmtKatexPow10(q)}} = 10^{${topSum} - (${q})} = ${fmtKatexPow10(ansK)}$.`
			],
			finalAnswer: `10^${ansK}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Triangle Congruence Cases (حالات تقايس مثلثين - svgTriangle)
// ═══════════════════════════════════════════════════════════════════════════════
const triangleCongruenceTemplate: ParameterizedTemplate = {
	id: '3am_t1_triangle_congruence',
	grade: '3am',
	trimesterId: 't1',
	domain: 'geometry',
	titleAr: 'حالات تقايس مثلثين وتطبيقاتها في البرهان',
	curriculumLessonId: 'lesson_3am_t1_triangle_congruence',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed)) || 1;

		if (difficulty === 'easy') {
			const isCAC = seed % 2 === 0;
			const ab = rng.int(5, 9);
			const bc = rng.int(6, 10);
			const angB = rng.pick([45, 50, 55, 60, 65, 70]);
			const angA = rng.pick([50, 55, 60, 65]);
			const thirdSide = rng.int(4, ab + bc - 2);
			// Curated triangle inequality subquestion
			const ineqGood = seed % 3 !== 0;
			const s1 = rng.int(3, 5);
			const s2 = rng.int(4, 6);
			const s3 = ineqGood ? rng.int(s2, s1 + s2 - 1) : s1 + s2 + rng.int(1, 3);

			const svg = svgTriangle({
				labels: ['A', 'B', 'C'],
				sideAB: `${ab} cm`,
				sideBC: isCAC ? `${bc} cm` : undefined,
				angleLabels: isCAC ? [undefined, `${angB}°`] : [`${angA}°`, `${angB}°`]
			});
			const imageUrl = saveSvgAsset(`3am_t1_cong_easy_${cleanSeed}`, svg);

			const correctCase = isCAC
				? 'تقايس ضلعين والزاوية المحصورة بينهما'
				: 'تقايس زاويتين والضلع المحصور بينهما';

			const mcq = buildUniqueMcqOptions(
				correctCase,
				[
					{
						text: isCAC
							? 'تقايس زاويتين والضلع المحصور بينهما'
							: 'تقايس ضلعين والزاوية المحصورة بينهما',
						diagnosticFeedback: isCAC
							? 'انظر إلى المعطيات: لدينا ضلعان معلومان وزاوية واحدة محصورة بينهما، وليس زاويتين.'
							: 'انظر إلى المعطيات: لدينا زاويتان وضلع واحد محصور بينهما، وليس ضلعين.'
					},
					{
						text: 'تقايس الأضلاع الثلاثة',
						diagnosticFeedback:
							'في المعطيات لم تُعطَ أطوال الأضلاع الثلاثة جميعها، بل ذُكرت زاوية أو زاويتان.'
					},
					{
						text: 'تقايس الزوايا الثلاث فقط',
						diagnosticFeedback:
							'تقايس الزوايا الثلاث ليس حالة لتقايس مثلثين! تذكّر أن المثلثات المتشابهة في الشكل قد تختلف في الحجم.'
					}
				],
				rng
			);

			const givenDescKatex = isCAC
				? `$AB = EF = ${ab}\\text{ cm}$، و $BC = FG = ${bc}\\text{ cm}$، و $\\widehat{ABC} = \\widehat{EFG} = ${angB}^\\circ$`
				: `$AB = EF = ${ab}\\text{ cm}$، و $\\widehat{BAC} = \\widehat{FEG} = ${angA}^\\circ$، و $\\widehat{ABC} = \\widehat{EFG} = ${angB}^\\circ$`;

			const givenDescTypst = isCAC
				? `$A B = E F = ${ab}$ سم، و $B C = F G = ${bc}$ سم، و $hat(A B C) = hat(E F G) = ${angB}°$`
				: `$A B = E F = ${ab}$ سم، و $hat(B A C) = hat(F E G) = ${angA}°$، و $hat(A B C) = hat(E F G) = ${angB}°$`;

			return {
				templateId: this.id,
				seed,
				grade: '3am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `في الشكل المقابل مثلث $ABC$، ونعتبر مثلثاً ثانياً $EFG$ بحيث: ${givenDescKatex}.\n\nبأي حالة من حالات تقايس مثلثين نُثبت أن المثلثين $ABC$ و $EFG$ متقايسان؟`,
					questionTextAr: `في المثلثين $ABC$ و $EFG$ لدينا ${givenDescKatex}. ما هي حالة التقايس المحققة؟`,
					imageUrl,
					imageCaption: 'المثلث ABC بالمعطيات الهندسية',
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: isCAC
						? `الزاوية $\\widehat{ABC}$ محصورة بين الضلعين $[AB]$ و $[BC]$، ونظيرتها $\\widehat{EFG}$ محصورة بين $[EF]$ و $[FG]$، إذن الحالة هي: تقايس ضلعين والزاوية المحصورة بينهما.`
						: `الضلع $[AB]$ محصور بين الزاويتين $\\widehat{A}$ و $\\widehat{B}$، ونظيره $[EF]$ محصور بين $\\widehat{E}$ و $\\widehat{F}$، إذن الحالة هي: تقايس زاويتين والضلع المحصور بينهما.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'تأمّل الشكل المقابل وأجب عن الأسئلة التالية مع التبرير:',
					content: [
						{
							type: 'columns',
							widths: ['1.5fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `نعتبر المثلثين $A B C$ و $E F G$ بحيث: ${givenDescTypst}.\n\n1) اذكر حالة التقايس التي تثبت أن المثلثين $A B C$ و $E F G$ متقايسان، مع كتابة عناصر التقايس الثلاثة.\n\n2) ${isCAC ? `إذا كان $A C = ${thirdSide}$ سم، فاستنتج طول الضلع $E G$.` : `احسب قيس الزاوية $hat(A C B)$، ثم استنتج قيس الزاوية $hat(E G F)$.`}\n\n3) هل يمكن إنشاء مثلث أطوال أضلاعه $${s1}$ سم، $${s2}$ سم، $${s3}$ سم؟ علّل.`,
									answer: `1) في المثلثين $A B C$ و $E F G$: ${givenDescTypst}، إذن يتقايس المثلثان حسب حالة (${correctCase}).\n\n2) ${isCAC ? `لأن العناصر المتماثلة متقايسة، فإن $E G = A C = ${thirdSide}$ سم.` : `مجموع زوايا المثلث $180°$، إذن $hat(A C B) = 180° - (${angA}° + ${angB}°) = ${180 - angA - angB}°$، ومن التقايس نجد $hat(E G F) = hat(A C B) = ${180 - angA - angB}°$.`}\n\n3) ${ineqGood ? `نعم يمكن، لأن $${s1} + ${s2} = ${s1 + s2} > ${s3}$ (المتباينة المثلثية محققة).` : `لا يمكن، لأن $${s1} + ${s2} = ${s1 + s2} < ${s3}$ (مجموع الضلعين الأصغرين أصغر من الضلع الأكبر).`}`,
									mark: '3'
								},
								{
									type: 'image',
									src: imageUrl,
									caption: 'المثلث ABC'
								}
							]
						}
					]
				},
				hints: [
					'عدّ العناصر المتقايسة المعطاة في نص التمرين (كم ضلعاً وكم زاوية؟).',
					isCAC
						? 'تأكّد أن الزاوية المعطاة تقع بين الضلعين المعلومين (محصورة بينهما).'
						: 'تأكّد أن الضلع المعلوم يصل بين رأسي الزاويتين المعلومتين (محصور بينهما).',
					`بما أن العناصر الثلاثة تنطبق على إحدى الحالات الثلاث، فالحالة هي: ${correctCase}.`
				],
				solutionStepsAr: [
					`نلاحظ المعطيات الثلاثة: ${givenDescKatex}.`,
					isCAC
						? `الزاوية $\\widehat{B}$ محصورة بين $[AB]$ و $[BC]$ والزاوية $\\widehat{F}$ محصورة بين $[EF]$ و $[FG]$.`
						: `الضلع $[AB]$ محصور بين $\\widehat{A}$ و $\\widehat{B}$ والضلع $[EF]$ محصور بين $\\widehat{E}$ و $\\widehat{F}$.`,
					`إذن المثلثان $ABC$ و $EFG$ متقايسان وفق حالة: ${correctCase}.`
				],
				finalAnswer: correctCase
			};
		}

		if (difficulty === 'medium') {
			// Right triangle congruence (hypotenuse + one leg) -> deduce acute angle
			const legAB = rng.int(4, 8);
			const hypBC = legAB + rng.int(3, 6);
			const angB = rng.pick([32, 35, 38, 42, 48, 52, 56]);
			const angC = 90 - angB;

			const svg = svgTriangle({
				labels: ['A', 'B', 'C'],
				sideAB: `${legAB} cm`,
				sideBC: `${hypBC} cm`,
				rightAngleAtA: true,
				angleLabels: ['90°', `${angB}°`]
			});
			const imageUrl = saveSvgAsset(`3am_t1_cong_med_${cleanSeed}`, svg);

			// Also an isosceles CCC subquestion in sujetExercise
			const isoSide = rng.int(6, 11);
			const baseHalf = rng.int(3, 5);

			return {
				templateId: this.id,
				seed,
				grade: '3am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: `في الشكل المقابل مثلث $ABC$ قائم في $A$ حيث $AB = ${legAB}\\text{ cm}$ ووتره $BC = ${hypBC}\\text{ cm}$ وقيس الزاوية $\\widehat{B} = ${angB}^\\circ$.\n\nإذا كان $EFG$ مثلثاً قائماً في $E$ بحيث $EF = ${legAB}\\text{ cm}$ ووتره $FG = ${hypBC}\\text{ cm}$، فما قيس الزاوية $\\widehat{G}$ بالدرجات؟`,
					questionTextAr: `$ABC$ قائم في $A$ ($AB=${legAB}$, $BC=${hypBC}$, $\\widehat{B}=${angB}^\\circ$) و $EFG$ قائم في $E$ ($EF=${legAB}$, $FG=${hypBC}$). ما قيس $\\widehat{G}$ بالدرجات؟`,
					imageUrl,
					imageCaption: 'المثلث القائم ABC',
					questionData: {
						answer: angC,
						displayTemplate: 'G = ?°',
						variables: [],
						tolerance: 0
					},
					explanation: `يتقايس المثلثان القائمان لتقايس الوتر وضلع قائم ($BC = FG$ و $AB = EF$). ومنه الزاويتان المتماثلتان $\\widehat{F} = \\widehat{B} = ${angB}^\\circ$، إذن في المثلث القائم $EFG$: $\\widehat{G} = 90^\\circ - ${angB}^\\circ = ${angC}^\\circ$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'تأمّل الشكل المقابل ثم أجب بدقة مع تحرير البرهان:',
					content: [
						{
							type: 'columns',
							widths: ['1.5fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `$A B C$ مثلث قائم في $A$ حيث $A B = ${legAB}$ سم، $B C = ${hypBC}$ سم و $hat(B) = ${angB}°$، و $E F G$ مثلث قائم في $E$ حيث $E F = ${legAB}$ سم و $F G = ${hypBC}$ سم.\n\n1) أثبت أن المثلثين القائمين $A B C$ و $E F G$ متقايسان.\n\n2) استنتج قيس الزاوية $hat(F)$ ثم احسب قيس الزاوية $hat(G)$.\n\n3) مسألة إضافية: $R S T$ مثلث متساوي الساقين رأسه الأساسي $R$ ($R S = R T = ${isoSide}$ سم) و $M$ منتصف $[S T]$ ($S M = M T = ${baseHalf}$ سم). بأي حالة يتقايس المثلثان $R S M$ و $R T M$؟`,
									answer: `1) في المثلثين القائمين $A B C$ و $E F G$: الوتران متقايسان ($B C = F G = ${hypBC}$ سم) وضلعان قائمان متقايسان ($A B = E F = ${legAB}$ سم)، إذن يتقايسان حسب حالة تقايس مثلثين قائمين (وتر وضلع قائم).\n\n2) من التقايس: $hat(F) = hat(B) = ${angB}°$، وفي المثلث القائم $E F G$: $hat(G) = 90° - ${angB}° = ${angC}°$.\n\n3) لدينا $R S = R T$ و $S M = T M$ و $[R M]$ ضلع مشترك، إذن يتقايس المثلثان $R S M$ و $R T M$ حسب حالة تقايس الأضلاع الثلاثة.`,
									mark: '3'
								},
								{
									type: 'image',
									src: imageUrl,
									caption: 'المثلث القائم ABC'
								}
							]
						}
					]
				},
				hints: [
					'في مثلثين قائمين، يكفي تقايس الوتر وضلع قائم لإثبات تقايسهما.',
					`بما أن المثلثين متقايسان، فإن $\\widehat{F} = \\widehat{B} = ${angB}^\\circ$.`,
					`الزاويتان الحادتان في المثلث القائم متتامتان: $\\widehat{G} = 90^\\circ - ${angB}^\\circ$.`
				],
				solutionStepsAr: [
					`المثلثان $ABC$ و $EFG$ قائمان في $A$ و $E$ ولهما الوتران $BC = FG = ${hypBC}\\text{ cm}$ وضلعان قائمان $AB = EF = ${legAB}\\text{ cm}$، فهما متقايسان.`,
					`نستنتج تقايس الزوايا المتماثلة: $\\widehat{F} = \\widehat{B} = ${angB}^\\circ$.`,
					`إذن $\\widehat{G} = 90^\\circ - ${angB}^\\circ = ${angC}^\\circ$.`
				],
				finalAnswer: `${angC}°`
			};
		}

		// hard: AAA misconception check (true_false) + CCC & intersecting segments proof
		const angA = rng.pick([50, 55, 65, 70]);
		const angB = rng.pick([45, 50, 60]);
		const angC = 180 - angA - angB;
		const ab = rng.int(4, 7);
		const bc = rng.int(5, 8);
		const isTrue = rng.int(0, 1) === 1;

		const svg = svgTriangle({
			labels: ['A', 'B', 'C'],
			sideAB: `${ab} cm`,
			angleLabels: [`${angA}°`, `${angB}°`, `${angC}°`]
		});
		const imageUrl = saveSvgAsset(`3am_t1_cong_hard_${cleanSeed}`, svg);

		const oa = rng.int(4, 7);
		const ob = rng.int(5, 9);
		const cd = rng.int(6, 10);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'true_false',
				questionText: isTrue
					? `تأمّل المثلث $ABC$ المقابل ($AB = ${ab}\\text{ cm}$، $\\widehat{A} = ${angA}^\\circ$، $\\widehat{B} = ${angB}^\\circ$). أجب بصحيح أو خطأ:\n\nإذا كان $EFG$ مثلثاً آخر بحيث $EF = ${ab}\\text{ cm}$ و $\\widehat{E} = ${angA}^\\circ$ و $\\widehat{F} = ${angB}^\\circ$، فإن المثلثين $ABC$ و $EFG$ متقايسان حتماً.`
					: `تأمّل المثلث $ABC$ المقابل ($\\widehat{A} = ${angA}^\\circ$، $\\widehat{B} = ${angB}^\\circ$، $\\widehat{C} = ${angC}^\\circ$). أجب بصحيح أو خطأ:\n\nإذا كان $EFG$ مثلثاً آخر بحيث $\\widehat{E} = ${angA}^\\circ$ و $\\widehat{F} = ${angB}^\\circ$ و $\\widehat{G} = ${angC}^\\circ$ (دون معرفة أي طول ضلع)، فإن المثلثين $ABC$ و $EFG$ متقايسان حتماً.`,
				questionTextAr: isTrue
					? `إذا تساوى $EF=AB=${ab}\\text{ cm}$ و $\\widehat{E}=\\widehat{A}=${angA}^\\circ$ و $\\widehat{F}=\\widehat{B}=${angB}^\\circ$ فهل $ABC$ و $EFG$ متقايسان حتماً؟`
					: `هل يكفي تقايس الزوايا الثلاث ($${angA}^\\circ, ${angB}^\\circ, ${angC}^\\circ$) دون تساوي أي ضلع لتقايس مثلثين حتماً؟`,
				imageUrl,
				imageCaption: 'المثلث ABC وزواياه الثلاث',
				questionData: {
					correctAnswer: isTrue
				},
				explanation: isTrue
					? 'صحيح: تحققت حالة تقايس زاويتين والضلع المحصور بينهما ($[AB]$ و $[EF]$).'
					: 'خطأ: تقايس الزوايا الثلاث لا يكفي لتقايس مثلثين! يمكن تكبير أو تصغير المثلث مع بقاء زواياه نفسها (تختلف أطوال الأضلاع).'
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'أجب عن جزأي التمرين مع التبرير الهندسي المنظم:',
				content: [
					{
						type: 'columns',
						widths: ['1.5fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) في الشكل المقابل لدينا $A B = ${ab}$ سم، و $hat(A) = ${angA}°$، و $hat(B) = ${angB}°$، و $hat(C) = ${angC}°$. هل يكفي تقايس الزوايا الثلاث مع مثلث $E F G$ لإثبات تقايسهما؟ برّر إجابتك بمثال مضاد.\n\n2) تتقاطع القطعتان $[I K]$ و $[J L]$ في منتصفهما $O$ بحيث $O I = O K = ${oa}$ سم و $O J = O L = ${ob}$ سم، و $I J = ${cd}$ سم.\nأ) أثبت أن المثلثين $O I J$ و $O K L$ متقايسان.\nب) استنتج طول القطعة $[K L]$ وبرّر أن $hat(O I J) = hat(O K L)$.`,
								answer: `1) لا يكفي، لأن تقايس الزوايا الثلاث يحفظ الشكل فقط دون الأبعاد (يمكن أن يكون $E F = ${2 * ab}$ سم بينما $A B = ${ab}$ سم).\n\n2) أ) في المثلثين $O I J$ و $O K L$: $O I = O K = ${oa}$ سم، $O J = O L = ${ob}$ سم، و $hat(I O J) = hat(K O L)$ (زاويتان متقابلتان بالرأس)، إذن يتقايسان حسب حالة ضلعين والزاوية المحصورة بينهما.\nب) من تقايس المثلثين نستنتج تقايس العناصر المتماثلة: $K L = I J = ${cd}$ سم و $hat(O I J) = hat(O K L)$.`,
								mark: '3'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'المثلث ABC'
							}
						]
					}
				]
			},
			hints: [
				'استحضر الحالات الثلاث لتقايس مثلثين كيفيين: في كل حالة يجب وجود ضلع واحد على الأقل.',
				isTrue
					? 'الضلع المعطى $[AB]$ محصور بين الزاويتين المعلومتين.'
					: 'فكّر: هل يمكن رسم مثلثين لهما نفس الزوايا وأحدهما أكبر من الآخر؟',
				'الحالة التي تعتمد على الزوايا فقط (AAA) لا تضمن التطابق.'
			],
			solutionStepsAr: [
				'نراجع شروط التقايس: لا بد من وجود ضلع متقايس على الأقل.',
				isTrue
					? `الضلع $[AB]$ محصور بين $\\widehat{A}$ و $\\widehat{B}$ ويقايس $[EF]$ المحصور بين $\\widehat{E}$ و $\\widehat{F}$، إذن العبارة صحيحة.`
					: `تقايس الزوايا الثلاث لا يمنع اختلاف أطوال الأضلاع (مثل مضاعفة كل الأضلاع)، إذن العبارة خاطئة.`
			],
			finalAnswer: isTrue ? 'صحيح' : 'خطأ'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Midsegment Theorem & Thales in a Triangle (مستقيم المنتصفين وطالس في المثلث)
// ═══════════════════════════════════════════════════════════════════════════════
const midsegmentThalesTemplate: ParameterizedTemplate = {
	id: '3am_t1_midsegment_thales',
	grade: '3am',
	trimesterId: 't1',
	domain: 'geometry',
	titleAr: 'مستقيم المنتصفين وتناسبية الأطوال في المثلث (طالس)',
	curriculumLessonId: 'lesson_3am_t1_midsegment_thales_triangle',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed)) || 1;

		if (difficulty === 'easy') {
			const askBC = seed % 2 === 0;
			const mn = rng.int(4, 11);
			const bc = 2 * mn;
			const am = rng.int(3, 7);
			const ab = 2 * am;
			const an = rng.int(4, 8);
			const ac = 2 * an;
			const perimSmall = mn + am + an;

			const svg = svgThalesConfig({
				mode: 'triangle',
				vertices: ['A', 'B', 'C', 'M', 'N'],
				sideLabels: {
					AM: `${am}`,
					AB: `${ab}`,
					AN: `${an}`,
					AC: `${ac}`,
					MN: askBC ? `${mn} cm` : '? cm',
					BC: askBC ? '? cm' : `${bc} cm`
				}
			});
			const imageUrl = saveSvgAsset(`3am_t1_thales_easy_${cleanSeed}`, svg);

			const targetAns = askBC ? bc : mn;

			return {
				templateId: this.id,
				seed,
				grade: '3am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: askBC
						? `في المثلث $ABC$ المقابل، النقطتان $M$ و $N$ هما منتصفا الضلعين $[AB]$ و $[AC]$ على الترتيب، وطول $MN = ${mn}\\text{ cm}$.\n\nما هو طول الضلع $BC$ بالسنتيمتر؟`
						: `في المثلث $ABC$ المقابل، النقطتان $M$ و $N$ هما منتصفا الضلعين $[AB]$ و $[AC]$ على الترتيب، وطول $BC = ${bc}\\text{ cm}$.\n\nما هو طول القطعة $MN$ بالسنتيمتر؟`,
					questionTextAr: askBC
						? `$M$ و $N$ منتصفا $[AB]$ و $[AC]$، و $MN = ${mn}\\text{ cm}$. ما طول $BC$ بالـ cm؟`
						: `$M$ و $N$ منتصفا $[AB]$ و $[AC]$، و $BC = ${bc}\\text{ cm}$. ما طول $MN$ بالـ cm؟`,
					imageUrl,
					imageCaption: 'المثلث ABC ومستقيم المنتصفين (MN)',
					questionData: {
						answer: targetAns,
						displayTemplate: askBC ? 'BC = ? cm' : 'MN = ? cm',
						variables: [],
						tolerance: 0
					},
					explanation: askBC
						? `حسب خاصية مستقيم المنتصفين: $MN = \\frac{1}{2} BC$، إذن $BC = 2 \\times MN = 2 \\times ${mn} = ${bc}\\text{ cm}$.`
						: `حسب خاصية مستقيم المنتصفين: $MN = \\frac{1}{2} BC = \\frac{${bc}}{2} = ${mn}\\text{ cm}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: `تأمّل الشكل المقابل حيث $M$ منتصف $[A B]$ و $N$ منتصف $[A C]$ ($A B = ${ab}$ سم، $A C = ${ac}$ سم):`,
					content: [
						{
							type: 'columns',
							widths: ['1.5fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) بيّن أن المستقيم $(M N)$ يوازي $(B C)$، ثم احسب الطول ${askBC ? `$B C$ علماً أن $M N = ${mn}$ سم` : `$M N$ علماً أن $B C = ${bc}$ سم`}.\n\n2) إذا رسمنا مستقيماً يشمل $M$ ويوازي $(A C)$ ويقطع $[B C]$ في $K$، ماذا تمثل النقطة $K$ بالنسبة إلى $[B C]$؟ علّل بالخاصية المناسبة.\n\n3) احسب محيط المثلث $A M N$.`,
									answer: `1) بما أن $M$ منتصف $[A B]$ و $N$ منتصف $[A C]$، فحسب خاصية مستقيم المنتصفين فإن $(M N) parallel (B C)$ و ${askBC ? `$B C = 2 times M N = 2 times ${mn} = ${bc}$ سم.` : `$M N = frac(1, 2) B C = frac(${bc}, 2) = ${mn}$ سم.`}\n\n2) حسب الخاصية العكسية لمستقيم المنتصفين: المستقيم الذي يشمل منتصف $[A B]$ ويوازي $(A C)$ يقطع الضلع الثالث $[B C]$ في منتصفه، إذن $K$ منتصف $[B C]$.\n\n3) $A M = ${am}$ سم، $A N = ${an}$ سم، $M N = ${mn}$ سم، فمحيط $A M N$ هو $${am} + ${an} + ${mn} = ${perimSmall}$ سم.`,
									mark: '3'
								},
								{
									type: 'image',
									src: imageUrl,
									caption: 'المثلث ABC ومستقيم المنتصفين'
								}
							]
						}
					]
				},
				hints: [
					'استحضر خاصية مستقيم المنتصفين في المثلث.',
					'طول القطعة الواصلة بين منتصفي ضلعين في مثلث يساوي نصف طول الضلع الثالث.',
					askBC ? `اضرب $${mn}$ في $2$.` : `اقسم $${bc}$ على $2$.`
				],
				solutionStepsAr: [
					`بما أن $M$ منتصف $[AB]$ و $N$ منتصف $[AC]$، فإن $MN = \\frac{1}{2} BC$.`,
					askBC
						? `ومنه $BC = 2 \\times MN = 2 \\times ${mn} = ${bc}\\text{ cm}$.`
						: `ومنه $MN = \\frac{${bc}}{2} = ${mn}\\text{ cm}$.`
				],
				finalAnswer: `${targetAns} cm`
			};
		}

		if (difficulty === 'medium') {
			// Direct Thales in triangle with clean scale factor p/q
			const ratios: Array<[number, number]> = [
				[2, 5],
				[3, 5],
				[3, 4],
				[2, 3],
				[3, 8]
			];
			const [p, q] = rng.pick(ratios);
			const u = rng.int(2, 3);
			const v = rng.int(2, 4);
			const w = rng.int(2, 3);
			const am = p * u;
			const ab = q * u;
			const mn = p * v;
			const bc = q * v;
			const an = p * w;
			const ac = q * w;
			const nc = ac - an;

			const svg = svgThalesConfig({
				mode: 'triangle',
				vertices: ['A', 'B', 'C', 'M', 'N'],
				sideLabels: {
					AM: `${am}`,
					AB: `${ab}`,
					AC: `${ac}`,
					MN: '? cm',
					BC: `${bc} cm`
				}
			});
			const imageUrl = saveSvgAsset(`3am_t1_thales_med_${cleanSeed}`, svg);

			return {
				templateId: this.id,
				seed,
				grade: '3am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: `في المثلث $ABC$ المقابل، $M \\in [AB]$ و $N \\in [AC]$ بحيث $(MN) \\parallel (BC)$.\n\nمعطى: $AM = ${am}\\text{ cm}$، $AB = ${ab}\\text{ cm}$، و $BC = ${bc}\\text{ cm}$. احسب الطول $MN$ بالسنتيمتر.`,
					questionTextAr: `$(MN) \\parallel (BC)$ حيث $AM = ${am}\\text{ cm}$، $AB = ${ab}\\text{ cm}$، $BC = ${bc}\\text{ cm}$. احسب $MN$ بالـ cm.`,
					imageUrl,
					imageCaption: 'وضعية طالس في المثلث ABC',
					questionData: {
						answer: mn,
						displayTemplate: 'MN = ? cm',
						variables: [],
						tolerance: 0.01
					},
					explanation: `حسب خاصية تناسبية الأطوال (طالس في المثلث): $\\frac{AM}{AB} = \\frac{MN}{BC}$، أي $\\frac{${am}}{${ab}} = \\frac{MN}{${bc}}$، ومنه $MN = \\frac{${am} \\times ${bc}}{${ab}} = ${mn}\\text{ cm}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: `في الشكل المقابل، $M in [A B]$ و $N in [A C]$ بحيث $(M N) parallel (B C)$ ($A M = ${am}$ سم، $A B = ${ab}$ سم، $A C = ${ac}$ سم، $B C = ${bc}$ سم):`,
					content: [
						{
							type: 'columns',
							widths: ['1.5fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) اذكر شروط تطبيق خاصية تناسبية الأطوال (طالس في المثلث) واكتب النسب المتساوية الثلاث.\n\n2) احسب الطول $M N$.\n\n3) احسب الطول $A N$ ثم استنتج الطول $N C$.`,
									answer: `1) في المثلث $A B C$: $M in [A B]$ و $N in [A C]$ و $(M N) parallel (B C)$، فحسب خاصية طالس في المثلث:\n$frac(A M, A B) = frac(A N, A C) = frac(M N, B C)$.\n\n2) $frac(${am}, ${ab}) = frac(M N, ${bc})$ ومنه $M N = frac(${am} times ${bc}, ${ab}) = ${mn}$ سم.\n\n3) $frac(${am}, ${ab}) = frac(A N, ${ac})$ ومنه $A N = frac(${am} times ${ac}, ${ab}) = ${an}$ سم، ونستنتج $N C = A C - A N = ${ac} - ${an} = ${nc}$ سم.`,
									mark: '3'
								},
								{
									type: 'image',
									src: imageUrl,
									caption: 'تناسبية الأطوال في المثلث ABC'
								}
							]
						}
					]
				},
				hints: [
					'بما أن $(MN) \\parallel (BC)$ داخل المثلث $ABC$، نطبق خاصية تناسبية الأطوال (طالس).',
					`النسبة تربط أضلاع المثلث الصغير بأضلاع المثلث الكبير: $\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}$.`,
					`عوّض بالأعداد واحسب الرابع المتناسب: $MN = \\frac{${am} \\times ${bc}}{${ab}}$.`
				],
				solutionStepsAr: [
					`نكتب نسب طالس في المثلث $ABC$: $\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}$.`,
					`نعوّض: $\\frac{${am}}{${ab}} = \\frac{MN}{${bc}}$.`,
					`نحسب الرابع المتناسب: $MN = \\frac{${am} \\times ${bc}}{${ab}} = \\frac{${am * bc}}{${ab}} = ${mn}\\text{ cm}$.`
				],
				finalAnswer: `${mn} cm`
			};
		}

		// hard: AM and MB given separately (watchOut: student must compute AB = AM + MB!)
		const ratios: Array<[number, number]> = [
			[2, 5],
			[3, 5],
			[2, 3],
			[3, 7]
		];
		const [p, q] = rng.pick(ratios);
		const u = rng.int(2, 3);
		const v = rng.int(2, 4);
		const w = rng.int(2, 3);
		const am = p * u;
		const ab = q * u;
		const mb = ab - am;
		const mn = p * v;
		const bc = q * v;
		const an = p * w;
		const ac = q * w;
		const perimAMN = am + an + mn;
		const perimABC = ab + ac + bc;

		const svg = svgThalesConfig({
			mode: 'triangle',
			vertices: ['A', 'B', 'C', 'M', 'N'],
			sideLabels: {
				AM: `${am}`,
				AB: `MB=${mb}`,
				AC: `${ac}`,
				MN: '? cm',
				BC: `${bc} cm`
			}
		});
		const imageUrl = saveSvgAsset(`3am_t1_thales_hard_${cleanSeed}`, svg);

		const wrongUseMB = roundTo((am / mb) * bc, 2);
		const wrongInvRatio = roundTo((ab / am) * bc, 2);
		const wrongCompl = roundTo((mb / ab) * bc, 2);

		const mcq = buildUniqueMcqOptions(
			`$${mn}\\text{ cm}$`,
			[
				{
					text: `$${wrongUseMB}\\text{ cm}$`,
					diagnosticFeedback:
						'خطأ شائع جداً! استعملت النسبة $\\frac{AM}{MB}$ بدلاً من $\\frac{AM}{AB}$؛ يجب أولاً حساب $AB = AM + MB$!'
				},
				{
					text: `$${wrongCompl}\\text{ cm}$`,
					diagnosticFeedback:
						'انتبه: في البسط نضع $AM$ (ضلع المثلث الصغير $AMN$) وليس $MB$!'
				},
				{
					text: `$${wrongInvRatio}\\text{ cm}$`,
					diagnosticFeedback:
						'عكست النسبة فحصلت على $MN > BC$ وهذا مستحيل لأن المثلث $AMN$ داخل $ABC$!'
				},
				{
					text: `$${roundTo(bc - am, 2)}\\text{ cm}$`,
					diagnosticFeedback:
						'في خاصية طالس نستعمل تناسبية الأطوال وليس طرحها.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في المثلث $ABC$ المقابل، $M \\in [AB]$ و $N \\in [AC]$ بحيث $(MN) \\parallel (BC)$.\n\nإذا علمت أن $AM = ${am}\\text{ cm}$ و $MB = ${mb}\\text{ cm}$ و $BC = ${bc}\\text{ cm}$، فما طول القطعة $MN$؟`,
				questionTextAr: `$(MN) \\parallel (BC)$، $AM = ${am}\\text{ cm}$، $MB = ${mb}\\text{ cm}$، $BC = ${bc}\\text{ cm}$. احسب $MN$.`,
				imageUrl,
				imageCaption: 'تطبيق طالس عندما يُعطى AM و MB',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نحسب أولاً $AB = AM + MB = ${am} + ${mb} = ${ab}\\text{ cm}$. ثم بتطبيق طالس: $\\frac{AM}{AB} = \\frac{MN}{BC}$ أي $\\frac{${am}}{${ab}} = \\frac{MN}{${bc}}$، ومنه $MN = \\frac{${am} \\times ${bc}}{${ab}} = ${mn}\\text{ cm}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `في المثلث $A B C$ المقابل، $M in [A B]$ و $N in [A C]$ و $(M N) parallel (B C)$ ($A M = ${am}$ سم، $M B = ${mb}$ سم، $A C = ${ac}$ سم، $B C = ${bc}$ سم):`,
				content: [
					{
						type: 'columns',
						widths: ['1.5fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) احسب الطول الكلي للضلع $A B$، ثم اكتب نسب طالس الثلاث في المثلث $A B C$.\n\n2) استنتج الطولين $M N$ و $A N$.\n\n3) احسب محيط المثلث $A M N$ ومحيط المثلث $A B C$، ثم قارن النسبة $frac(P_(A M N), P_(A B C))$ بالنسب السابقة.`,
								answer: `1) $A B = A M + M B = ${am} + ${mb} = ${ab}$ سم. حسب خاصية طالس: $frac(A M, A B) = frac(A N, A C) = frac(M N, B C)$.\n\n2) $M N = frac(${am} times ${bc}, ${ab}) = ${mn}$ سم، و $A N = frac(${am} times ${ac}, ${ab}) = ${an}$ سم.\n\n3) محيط $A M N$: $P_1 = ${am} + ${an} + ${mn} = ${perimAMN}$ سم. محيط $A B C$: $P_2 = ${ab} + ${ac} + ${bc} = ${perimABC}$ سم. نلاحظ أن $frac(${perimAMN}, ${perimABC}) = frac(${p}, ${q}) = frac(A M, A B)$.`,
								mark: '3'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'المثلث ABC مع أطوال AM و MB'
							}
						]
					}
				]
			},
			hints: [
				'انتبه: في خاصية طالس نستعمل الطول الكلي $AB$ وليس $MB$!',
				`احسب أولاً: $AB = AM + MB = ${am} + ${mb} = ${ab}\\text{ cm}$.`,
				`طبّق التناسب: $\\frac{${am}}{${ab}} = \\frac{MN}{${bc}}$ ثم احسب $MN$.`
			],
			solutionStepsAr: [
				`نحسب طول الضلع الكلي: $AB = AM + MB = ${am} + ${mb} = ${ab}\\text{ cm}$.`,
				`حسب طالس في المثلث: $\\frac{AM}{AB} = \\frac{MN}{BC}$ أي $\\frac{${am}}{${ab}} = \\frac{MN}{${bc}}$.`,
				`ومنه $MN = \\frac{${am} \\times ${bc}}{${ab}} = ${mn}\\text{ cm}$.`
			],
			finalAnswer: `${mn} cm`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. T1 Integration Situation (الوضعية الإدماجية - 8 pts, 3 Parts)
// ═══════════════════════════════════════════════════════════════════════════════
const integration3amT1Template: ParameterizedTemplate = {
	id: '3am_t1_integration',
	grade: '3am',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية: حصيلة الفصل الأول',
	curriculumLessonId: 'lesson_3am_t1_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed)) || 1;

		// Part 1: Triangular plot with parallel path (midsegment in easy; Thales in medium/hard)
		const geomConfig =
			difficulty === 'easy'
				? { p: 1, q: 2, u: rng.int(12, 20), v: rng.int(14, 24), w: rng.int(15, 22) }
				: difficulty === 'medium'
					? rng.pick([
							{ p: 2, q: 5, u: 8, v: 9, w: 10 },
							{ p: 3, q: 5, u: 7, v: 8, w: 9 },
							{ p: 3, q: 4, u: 9, v: 10, w: 11 }
						])
					: rng.pick([
							{ p: 2, q: 5, u: 9, v: 11, w: 12 },
							{ p: 3, q: 5, u: 8, v: 12, w: 10 },
							{ p: 2, q: 3, u: 12, v: 14, w: 15 }
						]);

		const am = geomConfig.p * geomConfig.u;
		const ab = geomConfig.q * geomConfig.u;
		const mb = ab - am;
		const mn = geomConfig.p * geomConfig.v;
		const bc = geomConfig.q * geomConfig.v;
		const an = geomConfig.p * geomConfig.w;
		const ac = geomConfig.q * geomConfig.w;
		const nc = ac - an;

		// Part 2: Rational shares on total area S (m^2)
		const shareScenarios: Array<{ n1: number; d1: number; n2: number; d2: number; areaPool: number[] }> = [
			{ n1: 1, d1: 3, n2: 1, d2: 4, areaPool: [600, 720, 840, 960] },
			{ n1: 2, d1: 5, n2: 1, d2: 4, areaPool: [600, 800, 1000, 1200] },
			{ n1: 1, d1: 3, n2: 2, d2: 5, areaPool: [600, 750, 900, 1050] },
			{ n1: 3, d1: 8, n2: 1, d2: 4, areaPool: [640, 800, 960, 1120] },
			{ n1: 1, d1: 4, n2: 2, d2: 5, areaPool: [600, 800, 1000, 1200] }
		];
		const sh = rng.pick(shareScenarios);
		const totalArea = rng.pick(sh.areaPool);
		const commonDen = sh.d1 * sh.d2;
		const [usedP, usedQ] = simplifyFraction(sh.n1 * sh.d2 + sh.n2 * sh.d1, commonDen);
		const [remP, remQ] = simplifyFraction(usedQ - usedP, usedQ);
		const remArea = (totalArea / remQ) * remP;
		const parcelDivisor = rng.pick([2, 3, 4]);
		const [eachP, eachQ] = simplifyFraction(remP, remQ * parcelDivisor);

		// Part 3: Path paving cost + signed budget balance
		const meterPrice = rng.priceDA(400, 900, 100);
		const pathCost = mn * meterPrice;
		const seedCost = rng.priceDA(12000, 25000, 1000);
		const subsidy = rng.priceDA(30000, 60000, 5000);
		const netBalance = subsidy - pathCost - seedCost;

		const svg = svgThalesConfig({
			mode: 'triangle',
			vertices: ['A', 'B', 'C', 'M', 'N'],
			sideLabels:
				difficulty === 'hard'
					? {
							AM: `${am}m`,
							AB: `MB=${mb}m`,
							AC: `${ac}m`,
							MN: '? m',
							BC: `${bc}m`
						}
					: {
							AM: `${am}m`,
							AB: `${ab}m`,
							AC: `${ac}m`,
							MN: '? m',
							BC: `${bc}m`
						}
		});
		const imageUrl = saveSvgAsset(`3am_t1_integration_${difficulty}_${cleanSeed}`, svg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${mn} m`;
			quizQuestion = {
				type: 'calculated',
				questionText: `يملك فلاح قطعة أرض مثلثة الشكل $ABC$، شقّ عبرها ممرّاً مستقيماً $[MN]$ يربط بين منتصفي الضلعين $[AB]$ و $[AC]$. إذا كان طول الواجهة $BC = ${bc}\\text{ m}$، فما طول الممر $MN$ بالمتر؟`,
				questionTextAr: `قطعة أرض مثلثة $ABC$، فيها $M$ و $N$ منتصفا $[AB]$ و $[AC]$، و $BC = ${bc}\\text{ m}$. ما طول الممر $MN$ بالمتر؟`,
				imageUrl,
				imageCaption: 'مخطط قطعة الأرض المثلثة ABC والممر MN',
				questionData: {
					answer: mn,
					displayTemplate: 'MN = ? m',
					variables: [],
					tolerance: 0
				},
				explanation: `بما أن $M$ و $N$ منتصفا $[AB]$ و $[AC]$، فحسب خاصية مستقيم المنتصفين: $MN = \\frac{1}{2} BC = \\frac{${bc}}{2} = ${mn}\\text{ m}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${remArea} m²`;
			quizQuestion = {
				type: 'calculated',
				questionText: `تبلغ المساحة الكلية لقطعة أرض فلاحية $S = ${totalArea}\\text{ m}^2$. خصّص الفلاح $\\frac{${sh.n1}}{${sh.d1}}$ من المساحة للقمح و $\\frac{${sh.n2}}{${sh.d2}}$ لأشجار الزيتون، وترك الجزء المتبقي للخضروات.\n\nما هي مساحة الجزء المخصّص للخضروات بالمتر المربع؟`,
				questionTextAr: `أرض مساحتها $${totalArea}\\text{ m}^2$؛ خُصِّص $\\frac{${sh.n1}}{${sh.d1}}$ للقمح و $\\frac{${sh.n2}}{${sh.d2}}$ للزيتون. ما مساحة الجزء المتبقي للخضروات؟`,
				imageUrl,
				imageCaption: 'مخطط القطعة المثلثة ABC وتقسيم المساحة',
				questionData: {
					answer: remArea,
					displayTemplate: 'S_rem = ? m²',
					variables: [],
					tolerance: 0
				},
				explanation: `مجموع الجزأين المزروعين: $\\frac{${sh.n1}}{${sh.d1}} + \\frac{${sh.n2}}{${sh.d2}} = \\frac{${usedP}}{${usedQ}}$. الكسر المتبقي للخضروات هو $1 - \\frac{${usedP}}{${usedQ}} = \\frac{${remP}}{${remQ}}$، ومساحته $${totalArea} \\times \\frac{${remP}}{${remQ}} = ${remArea}\\text{ m}^2$.`
			};
		} else {
			// hard: MCQ combining Thales (with MB given!) and paving cost of path MN
			const wrongUseMB = Math.round((am / mb) * bc * meterPrice);
			const wrongForgetPrice = mn;
			const wrongFullBase = bc * meterPrice;
			const mcq = buildUniqueMcqOptions(
				`$${pathCost}\\text{ DA}$`,
				[
					{
						text: `$${wrongUseMB}\\text{ DA}$`,
						diagnosticFeedback:
							'خطأ في تطبيق طالس: استعملت $MB$ بدلاً من $AB = AM + MB$ لحساب طول الممر $MN$!'
					},
					{
						text: `$${wrongFullBase}\\text{ DA}$`,
						diagnosticFeedback:
							'حسبت كلفة تهيئة الواجهة $BC$ بدلاً من الممر الداخلي $MN$.'
					},
					{
						text: `$${wrongForgetPrice}\\text{ DA}$`,
						diagnosticFeedback:
							'هذا هو طول الممر بالمتر ($MN$)، لا تنسَ الضرب في سعر المتر الواحد ($' + meterPrice + '\\text{ DA}$)!'
					},
					{
						text: `$${ab * meterPrice}\\text{ DA}$`,
						diagnosticFeedback:
							'الممر هو $[MN]$ وليس الضلع $[AB]$!'
					}
				],
				rng
			);
			finalAnswer = `${pathCost} DA`;
			quizQuestion = {
				type: 'mcq',
				questionText: `في قطعة الأرض المثلثة $ABC$ المقابلة، الممر $[MN]$ يوازي الضلع $[BC]$ حيث $AM = ${am}\\text{ m}$، $MB = ${mb}\\text{ m}$، و $BC = ${bc}\\text{ m}$.\n\nإذا كانت كلفة تهيئة المتر الواحد من الممر $[MN]$ هي $${meterPrice}\\text{ DA}$، فما كلفة تهيئة هذا الممر؟`,
				questionTextAr: `في القطعة $ABC$، $(MN) \\parallel (BC)$، $AM=${am}\\text{ m}$، $MB=${mb}\\text{ m}$، $BC=${bc}\\text{ m}$. ما كلفة تهيئة الممر $MN$ بسعر $${meterPrice}\\text{ DA/m}$؟`,
				imageUrl,
				imageCaption: 'القطعة المثلثة ABC والممر الموازي MN',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `أولاً: $AB = AM + MB = ${am} + ${mb} = ${ab}\\text{ m}$. بتطبيق طالس: $\\frac{${am}}{${ab}} = \\frac{MN}{${bc}} \\implies MN = ${mn}\\text{ m}$. إذن كلفة التهيئة: $${mn} \\times ${meterPrice} = ${pathCost}\\text{ DA}$.`
			};
		}

		const isMidsegmentMode = difficulty === 'easy';

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction:
					`يملك فلاح قطعة أرض مثلثة الشكل $A B C$ مساحتها الكلية $S = ${totalArea}$ م²، يمرّ عبرها ممرّ مستقيم $[M N]$ يوازي الضلع $[B C]$ حيث $M in [A B]$ و $N in [A C]$ (انظر الشكل).`,
				content: [
					{
						type: 'columns',
						widths: ['1.55fr', '1fr'],
						children: [
							{
								type: 'text',
								content: isMidsegmentMode
									? `الجزء الأول (هندسة المثلث — مستقيم المنتصفين):\n\nعيّن الفلاح النقطتين $M$ و $N$ في منتصفي الضلعين $[A B]$ و $[A C]$ على الترتيب، حيث $A B = ${ab}$ م، $A C = ${ac}$ م، و $B C = ${bc}$ م.\n\n1) برّر أن الممر $(M N)$ يوازي الطريق $(B C)$، ثم احسب طول الممر $M N$.\n\n2) استنتج الطولين $A N$ و $N C$.`
									: `الجزء الأول (هندسة المثلث — تناسبية الأطوال):\n\nالمعطيات: $A M = ${am}$ م، ${difficulty === 'hard' ? `$M B = ${mb}$ م` : `$A B = ${ab}$ م`}، $A C = ${ac}$ م، $B C = ${bc}$ م، و $(M N) parallel (B C)$.\n\n1) احسب طول الممر $M N$ مع ذكر الخاصية المستعملة.\n\n2) احسب الطول $A N$ ثم استنتج الطول $N C$.`,
								answer: isMidsegmentMode
									? `الجزء الأول:\n\n1) بما أن $M$ منتصف $[A B]$ و $N$ منتصف $[A C]$، فحسب خاصية مستقيم المنتصفين فإن $(M N) parallel (B C)$، وطول الممر هو $M N = frac(1, 2) B C = frac(${bc}, 2) = ${mn}$ م.\n\n2) بما أن $N$ منتصف $[A C]$ فإن $A N = N C = frac(${ac}, 2) = ${an}$ م.`
									: `الجزء الأول:\n\n1) ${difficulty === 'hard' ? `نحسب أولاً $A B = A M + M B = ${am} + ${mb} = ${ab}$ م. ` : ''}بما أن $M in [A B]$ و $N in [A C]$ و $(M N) parallel (B C)$، فحسب خاصية طالس في المثلث: $frac(A M, A B) = frac(A N, A C) = frac(M N, B C)$، أي $frac(${am}, ${ab}) = frac(M N, ${bc})$، ومنه $M N = frac(${am} times ${bc}, ${ab}) = ${mn}$ م.\n\n2) $A N = frac(${am} times ${ac}, ${ab}) = ${an}$ م، إذن $N C = ${ac} - ${an} = ${nc}$ م.`,
								mark: '3'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'مخطط قطعة الأرض المثلثة ABC'
							}
						]
					},
					{
						type: 'text',
						content: `الجزء الثاني (الكسور والأعداد الناطقة):\n\nاستغل الفلاح $frac(${sh.n1}, ${sh.d1})$ من المساحة الكلية لزراعة القمح، و $frac(${sh.n2}, ${sh.d2})$ لغرس أشجار الزيتون، وترك المساحة المتبقية لزراعة الخضروات.\n\n1) اكتب على شكل كسر مبسّط الكسر الذي يمثّل الجزء المستغل (قمح وزيتون معاً)، ثم استنتج الكسر الممثّل لمساحة الخضروات.\n\n2) احسب مساحة الجزء المخصّص للخضروات بالمتر المربع. ثم إذا قسّم الفلاح مساحة الخضروات بالتساوي إلى $${parcelDivisor}$ أحواض، فما الكسر الذي يمثّله كل حوض من المساحة الكلية للأرض؟`,
						answer: `الجزء الثاني:\n\n1) الكسر المستغل: $frac(${sh.n1}, ${sh.d1}) + frac(${sh.n2}, ${sh.d2}) = frac(${sh.n1 * sh.d2} + ${sh.n2 * sh.d1}, ${commonDen}) = ${fmtTypstFrac(usedP, usedQ)}$. الكسر المتبقي للخضروات: $1 - ${fmtTypstFrac(usedP, usedQ)} = ${fmtTypstFrac(remP, remQ)}$.\n\n2) مساحة الخضروات: $${totalArea} times ${fmtTypstFrac(remP, remQ)} = ${remArea}$ م². كسر كل حوض: $${fmtTypstFrac(remP, remQ)} div ${parcelDivisor} = ${fmtTypstFrac(remP, remQ)} times frac(1, ${parcelDivisor}) = ${fmtTypstFrac(eachP, eachQ)}$.`,
						mark: '3'
					},
					{
						type: 'text',
						content: `الجزء الثالث (الحساب المالي والأعداد النسبية):\n\nلتهيئة الممر $[M N]$، يدفع الفلاح $${meterPrice}$ دج للمتر الواحد، كما اشترى بذوراً وأسمدة بمبلغ $${seedCost}$ دج، وتلقّى دعماً فلاحياً قدره $${subsidy}$ دج.\n\n1) احسب كلفة تهيئة الممر $[M N]$.\n\n2) عبّر عن الرصيد المالي الصافي $R$ بسلسلة عمليات تتضمن أعداداً نسبية (الدعم بالموجب والنفقات بالسالب)، ثم احسبه وحدّد إن كان المبلغ كافياً أم توجد خسارة.`,
						answer: `الجزء الثالث:\n\n1) كلفة تهيئة الممر: $${mn} times ${meterPrice} = ${pathCost}$ دج.\n\n2) الرصيد الصافي: $R = (+${subsidy}) + (-${pathCost}) + (-${seedCost}) = ${netBalance >= 0 ? `+${netBalance}` : netBalance}$ دج.\n\nإذن ${netBalance >= 0 ? `الدعم كافٍ ويبقى للفلاح فائض قدره $${netBalance}$ دج.` : `الدعم غير كافٍ ويحتاج الفلاح إلى مبلغ إضافي قدره $${Math.abs(netBalance)}$ دج.`}`,
						mark: '2'
					}
				]
			},
			hints: [
				isMidsegmentMode
					? 'تذكّر خاصية مستقيم المنتصفين: $MN = \\frac{1}{2} BC$.'
					: 'طبّق خاصية طالس في المثلث: $\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}$ (انتبه إلى حساب $AB = AM + MB$ عند اللزوم).',
				`لتوحيد مقامي $\\frac{${sh.n1}}{${sh.d1}}$ و $\\frac{${sh.n2}}{${sh.d2}}$، استعمل المقام المشترك $${commonDen}$ ثم اطرح المجموع من $1$.`,
				`كلفة الممر تساوي $MN \\times ${meterPrice}$، والرصيد الصافي يحسب بجمع الدعم مع النفقات السالبة.`
			],
			solutionStepsAr: [
				isMidsegmentMode
					? `الجزء 1: بمستقيم المنتصفين $MN = \\frac{${bc}}{2} = ${mn}\\text{ m}$ و $AN = NC = ${an}\\text{ m}$.`
					: `الجزء 1: بتطبيق طالس في المثلث $ABC$ ($AB = ${ab}\\text{ m}$) نجد $MN = ${mn}\\text{ m}$ و $AN = ${an}\\text{ m}$ و $NC = ${nc}\\text{ m}$.`,
				`الجزء 2: الكسر المستغل $\\frac{${usedP}}{${usedQ}}$، المتبقي للخضروات $\\frac{${remP}}{${remQ}}$ ومساحته $${remArea}\\text{ m}^2$، ونصيب كل حوض $\\frac{${eachP}}{${eachQ}}$.`,
				`الجزء 3: كلفة الممر $= ${mn} \\times ${meterPrice} = ${pathCost}\\text{ DA}$، والرصيد الصافي $R = (+${subsidy}) + (-${pathCost}) + (-${seedCost}) = ${netBalance}\\text{ DA}$.`
			],
			finalAnswer
		};
	}
};

export const TEMPLATES_3AM_T1: ParameterizedTemplate[] = [
	signedMultDivTemplate,
	rationalOperationsTemplate,
	powersOf10Template,
	triangleCongruenceTemplate,
	midsegmentThalesTemplate,
	integration3amT1Template
];
