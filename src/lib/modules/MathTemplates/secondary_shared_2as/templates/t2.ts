import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';
import { buildUniqueMcqOptions, gcd, SeededRng, simplifyFraction } from '../../rng';
import { saveSvgAsset } from '../../svg-helpers';
import { svgFunctionCurvePlot, svgTrigonometricCircle } from '../../svg-secondary';

// ═══════════════════════════════════════════════════════════════════════════════
// Dual Syntax Algebraic Formatters (Strict KaTeX vs Typst)
// ═══════════════════════════════════════════════════════════════════════════════

function fracKatex(n: number, d: number): string {
	if (d === 0) throw new Error('Zero denominator');
	if (d === 1) return `${n}`;
	if (d === -1) return `${-n}`;
	const [sn, sd] = simplifyFraction(n, d);
	if (sd === 1) return `${sn}`;
	return sn < 0 ? `-\\frac{${Math.abs(sn)}}{${sd}}` : `\\frac{${sn}}{${sd}}`;
}

function fracTypst(n: number, d: number): string {
	if (d === 0) throw new Error('Zero denominator');
	if (d === 1) return `${n}`;
	if (d === -1) return `${-n}`;
	const [sn, sd] = simplifyFraction(n, d);
	if (sd === 1) return `${sn}`;
	return sn < 0 ? `-frac(${Math.abs(sn)}, ${sd})` : `frac(${sn}, ${sd})`;
}

function linearKatex(a: number, b: number, varName = 'x'): string {
	let head = '';
	if (a === 1) head = varName;
	else if (a === -1) head = `-${varName}`;
	else if (a !== 0) head = `${a}${varName}`;

	if (head === '') return `${b}`;
	if (b === 0) return head;
	return b > 0 ? `${head} + ${b}` : `${head} - ${Math.abs(b)}`;
}

function linearTypst(a: number, b: number, varName = 'x'): string {
	let head = '';
	if (a === 1) head = varName;
	else if (a === -1) head = `-${varName}`;
	else if (a !== 0) head = `${a}${varName}`;

	if (head === '') return `${b}`;
	if (b === 0) return head;
	return b > 0 ? `${head} + ${b}` : `${head} - ${Math.abs(b)}`;
}

function quadraticKatex(a: number, b: number, c: number, varName = 'x'): string {
	const parts: string[] = [];
	if (a !== 0) {
		if (a === 1) parts.push(`${varName}^2`);
		else if (a === -1) parts.push(`-${varName}^2`);
		else parts.push(`${a}${varName}^2`);
	}
	if (b !== 0) {
		const absB = Math.abs(b);
		const term = absB === 1 ? varName : `${absB}${varName}`;
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

function quadraticTypst(a: number, b: number, c: number, varName = 'x'): string {
	const parts: string[] = [];
	if (a !== 0) {
		if (a === 1) parts.push(`${varName}^2`);
		else if (a === -1) parts.push(`-${varName}^2`);
		else parts.push(`${a}${varName}^2`);
	}
	if (b !== 0) {
		const absB = Math.abs(b);
		const term = absB === 1 ? varName : `${absB}${varName}`;
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

function signedConstKatex(val: number): string {
	return val >= 0 ? `+ ${val}` : `- ${Math.abs(val)}`;
}

function signedConstTypst(val: number): string {
	return val >= 0 ? `+ ${val}` : `- ${Math.abs(val)}`;
}

interface AngleReduction {
	p: number;
	kRem: number;
	sn: number;
	sd: number;
	rad: number;
	thetaKatex: string;
	thetaTypst: string;
	alphaKatex: string;
	alphaTypst: string;
	cosK: string;
	cosT: string;
	sinK: string;
	sinT: string;
}

function reduceAngle(K: number, M: number): AngleReduction {
	const p = Math.ceil((K - M) / (2 * M));
	let kRem = K - 2 * p * M;
	if (kRem === -M) kRem = M;
	const [sn, sd] = simplifyFraction(kRem, M);
	const rad = (sn * Math.PI) / sd;

	const formatAngleK = (n: number, d: number): string => {
		if (n === 0) return '0';
		if (d === 1) return n === 1 ? '\\pi' : n === -1 ? '-\\pi' : `${n}\\pi`;
		if (n === 1) return `\\frac{\\pi}{${d}}`;
		if (n === -1) return `-\\frac{\\pi}{${d}}`;
		return n < 0 ? `-\\frac{${Math.abs(n)}\\pi}{${d}}` : `\\frac{${n}\\pi}{${d}}`;
	};

	const formatAngleT = (n: number, d: number): string => {
		if (n === 0) return '0';
		if (d === 1) return n === 1 ? 'pi' : n === -1 ? '-pi' : `${n} pi`;
		if (n === 1) return `frac(pi, ${d})`;
		if (n === -1) return `-frac(pi, ${d})`;
		return n < 0 ? `-frac(${Math.abs(n)} pi, ${d})` : `frac(${n} pi, ${d})`;
	};

	let cosK = '0';
	let cosT = '0';
	let sinK = '0';
	let sinT = '0';

	if (sn === 0) {
		cosK = '1'; cosT = '1'; sinK = '0'; sinT = '0';
	} else if (sd === 1) {
		cosK = '-1'; cosT = '-1'; sinK = '0'; sinT = '0';
	} else if (sd === 2) {
		if (sn === 1) { cosK = '0'; cosT = '0'; sinK = '1'; sinT = '1'; }
		else { cosK = '0'; cosT = '0'; sinK = '-1'; sinT = '-1'; }
	} else if (sd === 3) {
		if (sn === 1) {
			cosK = '\\frac{1}{2}'; cosT = 'frac(1, 2)'; sinK = '\\frac{\\sqrt{3}}{2}'; sinT = 'frac(sqrt(3), 2)';
		} else if (sn === 2) {
			cosK = '-\\frac{1}{2}'; cosT = '-frac(1, 2)'; sinK = '\\frac{\\sqrt{3}}{2}'; sinT = 'frac(sqrt(3), 2)';
		} else if (sn === -1) {
			cosK = '\\frac{1}{2}'; cosT = 'frac(1, 2)'; sinK = '-\\frac{\\sqrt{3}}{2}'; sinT = '-frac(sqrt(3), 2)';
		} else {
			cosK = '-\\frac{1}{2}'; cosT = '-frac(1, 2)'; sinK = '-\\frac{\\sqrt{3}}{2}'; sinT = '-frac(sqrt(3), 2)';
		}
	} else if (sd === 4) {
		if (sn === 1) {
			cosK = '\\frac{\\sqrt{2}}{2}'; cosT = 'frac(sqrt(2), 2)'; sinK = '\\frac{\\sqrt{2}}{2}'; sinT = 'frac(sqrt(2), 2)';
		} else if (sn === 3) {
			cosK = '-\\frac{\\sqrt{2}}{2}'; cosT = '-frac(sqrt(2), 2)'; sinK = '\\frac{\\sqrt{2}}{2}'; sinT = 'frac(sqrt(2), 2)';
		} else if (sn === -1) {
			cosK = '\\frac{\\sqrt{2}}{2}'; cosT = 'frac(sqrt(2), 2)'; sinK = '-\\frac{\\sqrt{2}}{2}'; sinT = '-frac(sqrt(2), 2)';
		} else {
			cosK = '-\\frac{\\sqrt{2}}{2}'; cosT = '-frac(sqrt(2), 2)'; sinK = '-\\frac{\\sqrt{2}}{2}'; sinT = '-frac(sqrt(2), 2)';
		}
	} else if (sd === 6) {
		if (sn === 1) {
			cosK = '\\frac{\\sqrt{3}}{2}'; cosT = 'frac(sqrt(3), 2)'; sinK = '\\frac{1}{2}'; sinT = 'frac(1, 2)';
		} else if (sn === 5) {
			cosK = '-\\frac{\\sqrt{3}}{2}'; cosT = '-frac(sqrt(3), 2)'; sinK = '\\frac{1}{2}'; sinT = 'frac(1, 2)';
		} else if (sn === -1) {
			cosK = '\\frac{\\sqrt{3}}{2}'; cosT = 'frac(sqrt(3), 2)'; sinK = '-\\frac{1}{2}'; sinT = '-frac(1, 2)';
		} else {
			cosK = '-\\frac{\\sqrt{3}}{2}'; cosT = '-frac(sqrt(3), 2)'; sinK = '-\\frac{1}{2}'; sinT = '-frac(1, 2)';
		}
	}

	return {
		p,
		kRem,
		sn,
		sd,
		rad,
		thetaKatex: formatAngleK(K, M),
		thetaTypst: formatAngleT(K, M),
		alphaKatex: formatAngleK(sn, sd),
		alphaTypst: formatAngleT(sn, sd),
		cosK,
		cosT,
		sinK,
		sinT
	};
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Rational Function Limits at Infinity & Vertical Asymptotes (2AS Analysis)
// ═══════════════════════════════════════════════════════════════════════════════

export const limitsAsymptotesTemplate: ParameterizedTemplate = {
	id: 'tpl_2as_shared_t2_limits_asymptotes',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'analysis',
	titleAr: 'حساب نهايات الدوال الناطقة وتعيين المستقيمات المقاربة الأفقية والعمودية',
	curriculumLessonId: 'lesson_2as_se_t2_limits_asymptotes_horizontal_vertical',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		let x0 = rng.pick([-3, -2, -1, 1, 2, 3]);
		let a = rng.pick([-3, -2, -1, 1, 2, 3]);

		if (difficulty === 'easy') {
			// f(x) = (a*x + b) / (x - x0)
			const bCandidates = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].filter((k) => a * x0 + k !== 0);
			const b = rng.pick(bCandidates);
			const n0 = a * x0 + b;

			const numKatex = linearKatex(a, b);
			const numTypst = linearTypst(a, b);
			const denKatex = `x ${signedConstKatex(-x0)}`;
			const denTypst = `x ${signedConstTypst(-x0)}`;

			const fnKatex = `\\frac{${numKatex}}{${denKatex}}`;
			const fnTypst = `frac(${numTypst}, ${denTypst})`;

			const limRightKatex = n0 > 0 ? '+\\infty' : '-\\infty';
			const limRightTypst = n0 > 0 ? '+oo' : '-oo';
			const limLeftKatex = n0 > 0 ? '-\\infty' : '+\\infty';
			const limLeftTypst = n0 > 0 ? '-oo' : '+oo';

			const correctLimText = `$${limRightKatex}$`;
			const distractors = [
				{
					text: `$${limLeftKatex}$`,
					diagnosticFeedback: `انتبه: لما $x > ${x0}$ يكون المقام موجباً (${denKatex} > 0) والبسط إشارته ${n0 > 0 ? 'موجبة' : 'سالبة'}.`
				},
				{
					text: `$0$`,
					diagnosticFeedback: 'حاصل قسمة عدد غير معدوم على الصفر يؤول إلى اللانهاية وليس إلى الصفر.'
				},
				{
					text: `$${a}$`,
					diagnosticFeedback: `القيمة $${a}$ هي نهاية الدالة عند اللانهاية (المستقيم المقارب الأفقي) وليست النهاية عند $x = ${x0}$.`
				}
			];
			const mcq = buildUniqueMcqOptions(correctLimText, distractors, rng);

			const qTextKatex = `لتكن الدالة الناطقة $f(x) = ${fnKatex}$ المعرفة على $\\mathbb{R} \\setminus \\{${x0}\\}$. احسب نهاية الدالة $f$ عند $x = ${x0}$ بقيم كبرى، أي: $\\lim_{x \\to ${x0}^+} f(x)$.`;

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `نعتبر الدالة العددية $f$ المعرفة على $D_f = bb(R) backslash {${x0}}$ بالدستور: $f(x) = ${fnTypst}$. يُرمز لمنحناها البياني في مستو منسوب إلى معلم متعامد ومتجانس بـ $(C_f)$.`,
				content: [
					{
						type: 'text',
						content: `1) احسب نهايتي الدالة $f$ عند $+oo$ وعند $-oo$. فسر النتيجتين هندسيا.`,
						answer: `1) عند اللانهاية، نهاية الدالة الناطقة هي نهاية حاصل قسمة الحدين الأعلى درجة:\n$lim_(x -> +oo) f(x) = lim_(x -> +oo) frac(${a}x, x) = ${a}$ و $lim_(x -> -oo) f(x) = ${a}$.\nالتفسير الهندسي: المنحنى $(C_f)$ يقبل مستقيما مقاربا أفقيا معادلته $y = ${a}$ بجوار $+oo$ و $-oo$.`,
						mark: '1.25'
					},
					{
						type: 'text',
						content: `2) احسب نهاية الدالة $f$ عند $x = ${x0}$ بقيم صغرى ($x -> ${x0}^-$) ثم بقيم كبرى ($x -> ${x0}^+$).`,
						answer: `2) لما $x -> ${x0}$، البسط يؤول إلى $${n0}$.\nلما $x -> ${x0}^-$: المقام يؤول إلى $0^-$، إذن: $lim_(x -> ${x0}^-) f(x) = ${limLeftTypst}$.\nلما $x -> ${x0}^+$: المقام يؤول إلى $0^+$، إذن: $lim_(x -> ${x0}^+) f(x) = ${limRightTypst}$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) استنتج معادلة المستقيم المقارب العمودي للمنحنى $(C_f)$.`,
						answer: `3) بما أن $lim_(x -> ${x0}^pm) f(x) = pm oo$، فإن المنحنى $(C_f)$ يقبل مستقيما مقاربا عموديا معادلته $x = ${x0}$.`,
						mark: '1.25'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '2as_se',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qTextKatex,
					questionTextAr: qTextKatex,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						shuffle: false
					},
					explanation: `البسط عند $x = ${x0}$ يساوي $${a}(${x0}) ${signedConstKatex(b)} = ${n0}$. لما $x \\to ${x0}^+$ يكون $x - ${x0} > 0$ أي يؤول إلى $0^+$. ومنه $\\lim_{x \\to ${x0}^+} f(x) = ${limRightKatex}$.`
				},
				sujetExercise,
				hints: [
					`لحساب نهاية دالة ناطقة عند $\\pm\\infty$، نأخذ حاصل قسمة الحدين الأعلى درجة في البسط والمقام.`,
					`لدراسة النهاية عند القيمة الممنوعة $x_0$، ادرس إشارة المقام في جدول إشارة لتحديد $0^+$ و $0^-$.`,
					`إذا كانت النهاية عند $x_0$ غير منتهية ($\\pm\\infty$)، فإن المستقيم ذا المعادلة $x = x_0$ مستقيم مقارب عمودي.`
				],
				solutionStepsAr: [
					`حساب النهاية عند اللانهاية: $\\lim_{x \\to \\pm\\infty} f(x) = ${a}$، ومنه المستقيم $y = ${a}$ مقارب أفقي.`,
					`حساب النهاية عند $x_0$: البسط يؤول إلى $${n0}$ والمقام يؤول إلى $0^-$ عند اليسار و $0^+$ عند اليمين.`,
					`النهاية بقيم كبرى هي $\\lim_{x \\to ${x0}^+} f(x) = ${limRightKatex}$، والمستقيم $x = ${x0}$ مقارب عمودي.`
				],
				finalAnswer: `\\lim_{x \\to ${x0}^+} f(x) = ${limRightKatex}`
			};
		} else if (difficulty === 'medium') {
			// f(x) = (a*x + b) / (x - x0)^2
			const bCandidates = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].filter((k) => a * x0 + k !== 0);
			const b = rng.pick(bCandidates);
			const n0 = a * x0 + b;

			const numKatex = linearKatex(a, b);
			const numTypst = linearTypst(a, b);
			const denInnerKate = `x ${signedConstKatex(-x0)}`;
			const denInnerTyp = `x ${signedConstTypst(-x0)}`;

			const fnKatex = `\\frac{${numKatex}}{(${denInnerKate})^2}`;
			const fnTypst = `frac(${numTypst}, (${denInnerTyp})^2)`;

			const limBothKatex = n0 > 0 ? '+\\infty' : '-\\infty';
			const limBothTypst = n0 > 0 ? '+oo' : '-oo';

			const correctLimText = `$${limBothKatex}$`;
			const distractors = [
				{
					text: `$${n0 > 0 ? '-\\infty' : '+\\infty'}$`,
					diagnosticFeedback: `انتبه: المقام $(${denInnerKate})^2$ مربع تام وهو موجب دائما ($> 0$) بجوار $${x0}$.`
				},
				{
					text: `$0$`,
					diagnosticFeedback: 'البسط غير معدوم عند القيمة الممنوعة، فلا تكون النهاية صفراً.'
				},
				{
					text: `$${a}$`,
					diagnosticFeedback: `القيمة $${a}$ ليست نهاية الدالة لأن درجة المقام أعلى من درجة البسط.`
				}
			];
			const mcq = buildUniqueMcqOptions(correctLimText, distractors, rng);

			const qTextKatex = `لتكن الدالة الناطقة $f(x) = ${fnKatex}$ المعرفة على $\\mathbb{R} \\setminus \\{${x0}\\}$. احسب النهاية $\\lim_{x \\to ${x0}} f(x)$.`;

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `نعتبر الدالة العددية $f$ المعرفة على $D_f = bb(R) backslash {${x0}}$ بالدستور: $f(x) = ${fnTypst}$. نرمز بـ $(C_f)$ لتمثيلها البياني.`,
				content: [
					{
						type: 'text',
						content: `1) احسب نهاية الدالة $f$ عند $+oo$ وعند $-oo$. فسر النتيجة هندسيا.`,
						answer: `1) درجة المقام (2) أكبر من درجة البسط (1):\n$lim_(x -> +oo) f(x) = lim_(x -> +oo) frac(${a}x, x^2) = lim_(x -> +oo) frac(${a}, x) = 0$ و $lim_(x -> -oo) f(x) = 0$.\nالتفسير الهندسي: حامل محور الفواصل (المستقيم ذو المعادلة $y = 0$) مستقيم مقارب أفقي للمنحنى $(C_f)$ بجوار $+oo$ و $-oo$.`,
						mark: '1.25'
					},
					{
						type: 'text',
						content: `2) احسب نهاية الدالة $f$ عند $x = ${x0}$ مفسرا سلوك المقام.`,
						answer: `2) لما $x -> ${x0}$، البسط يؤول إلى $${n0}$.\nالمقام $(${denInnerTyp})^2$ موجب تماما دائما ويؤول إلى $0^+$ على يمين ويسار $${x0}$.\nإذن: $lim_(x -> ${x0}) f(x) = ${limBothTypst}$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) عيّن معادلتي المستقيمين المقاربين (الأفقي والعمودي) للمنحنى $(C_f)$.`,
						answer: `3) المستقيم المقارب الأفقي: $y = 0$.\nالمستقيم المقارب العمودي: $x = ${x0}$.`,
						mark: '1.25'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '2as_se',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qTextKatex,
					questionTextAr: qTextKatex,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						shuffle: false
					},
					explanation: `بما أن المقام مربع كامل، فإن $(${denInnerKate})^2 \\to 0^+$ على كلا الجانبين. البسط يؤول إلى $${n0} ${n0 > 0 ? '> 0' : '< 0'}$، إذن $\\lim_{x \\to ${x0}} f(x) = ${limBothKatex}$.`
				},
				sujetExercise,
				hints: [
					`المقام مربع تام، لذا فهو يؤول دائما إلى $0^+$ مهما كان اتجاه اقتراب $x$ من $x_0$.`,
					`درجة المقام أعلى من درجة البسط، وبالتالي النهاية عند اللانهاية تساوي $0$.`,
					`المستقيم المقارب الأفقي هو $y = 0$ والمستقيم المقارب العمودي هو $x = x_0$.`
				],
				solutionStepsAr: [
					`نهاية $f$ عند $\\pm\\infty$ هي $0$ لأن درجة المقام أعلى من البسط، فالمستقيم $y = 0$ مقارب أفقي.`,
					`المقام $(${denInnerKate})^2 \\to 0^+$ والبسط يؤول إلى $${n0}$.`,
					`النهاية عند $x = ${x0}$ هي $\\lim_{x \\to ${x0}} f(x) = ${limBothKatex}$، والمستقيم $x = ${x0}$ مقارب عمودي.`
				],
				finalAnswer: `\\lim_{x \\to ${x0}} f(x) = ${limBothKatex}`
			};
		} else {
			// Hard: f(x) = (a*x^2 + b) / (x^2 - x0^2) with two vertical asymptotes x = x0 and x = -x0
			const posRoot = Math.abs(x0) === 0 ? 2 : Math.abs(x0);
			const r2 = posRoot * posRoot;
			const bCandidates = [-7, -5, -3, 1, 3, 5, 7].filter((k) => a * r2 + k !== 0);
			const b = rng.pick(bCandidates);
			const n0 = a * r2 + b;

			const numKatex = quadraticKatex(a, 0, b);
			const numTypst = quadraticTypst(a, 0, b);
			const denKatex = `x^2 - ${r2}`;
			const denTypst = `x^2 - ${r2}`;

			const fnKatex = `\\frac{${numKatex}}{${denKatex}}`;
			const fnTypst = `frac(${numTypst}, ${denTypst})`;

			// At x -> posRoot^+: x^2 - r2 -> 0^+
			const limRightPosKatex = n0 > 0 ? '+\\infty' : '-\\infty';
			const limRightPosTypst = n0 > 0 ? '+oo' : '-oo';

			const correctAsympText = `$y = ${a}$ و $x = ${posRoot}$ و $x = -${posRoot}$`;
			const distractors = [
				{
					text: `$y = 0$ و $x = ${posRoot}$ و $x = -${posRoot}$`,
					diagnosticFeedback: `انتبه: درجة البسط تساوي درجة المقام، فالنهاية عند اللانهاية هي حاصل قسمة المعاملين $a / 1 = ${a}$ وليس $0$.`
				},
				{
					text: `$y = ${a}$ و $x = ${r2}$`,
					diagnosticFeedback: `قيم عدم التعيين تنجم عن حل $x^2 - ${r2} = 0$ أي $x = \\pm ${posRoot}$ وليس $x = ${r2}$.`
				},
				{
					text: `$y = ${b}$ و $x = ${posRoot}$`,
					diagnosticFeedback: 'المستقيم المقارب الأفقي يُعيّن بمعامل الحد الأعلى درجة وليس بالحد الثابت.'
				}
			];
			const mcq = buildUniqueMcqOptions(correctAsympText, distractors, rng);

			const qTextKatex = `عيّن معادلات جميع المستقيمات المقاربة (الأفقية والعمودية) للمنحنى $(C_f)$ للدالة $f(x) = ${fnKatex}$ المعرفة على $\\mathbb{R} \\setminus \\{-${posRoot} ; ${posRoot}\\}$.`;

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `نعتبر الدالة العددية $f$ المعرفة على $D_f = bb(R) backslash {-${posRoot}, ${posRoot}}$ بالدستور: $f(x) = ${fnTypst}$. نرمز بـ $(C_f)$ لتمثيلها البياني في معلم متعامد ومتجانس.`,
				content: [
					{
						type: 'text',
						content: `1) احسب نهايتي الدالة $f$ عند $+oo$ وعند $-oo$. فسر النتيجتين هندسيا.`,
						answer: `1) بما أن البسط والمقام من الدرجة الثانية:\n$lim_(x -> +oo) f(x) = lim_(x -> +oo) frac(${a}x^2, x^2) = ${a}$ و $lim_(x -> -oo) f(x) = ${a}$.\nالتفسير الهندسي: المنحنى $(C_f)$ يقبل مستقيما مقاربا أفقيا معادلته $y = ${a}$ بجوار $+oo$ و $-oo$.`,
						mark: '1.25'
					},
					{
						type: 'text',
						content: `2) ادرس إشارة المقام $x^2 - ${r2}$، ثم احسب نهايات الدالة $f$ عند طرفي المجال $]${posRoot}, +oo[$.`,
						answer: `2) المقام ينعدم عند $-${posRoot}$ و $${posRoot}$. يكون موجبا خارج مجال الجذرين وسالبا داخله.\nالبسط عند $x = ${posRoot}$ يؤول إلى $${n0}$.\nلما $x -> ${posRoot}^+$: المقام يؤول إلى $0^+$، إذن $lim_(x -> ${posRoot}^+) f(x) = ${limRightPosTypst}$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) استنتج معادلات جميع المستقيمات المقاربة للمنحنى $(C_f)$.`,
						answer: `3) المستقيمات المقاربة هي:\n- المستقيم المقارب الأفقي: $y = ${a}$.\n- المستقيمان المقاربان العموديان: $x = ${posRoot}$ و $x = -${posRoot}$.`,
						mark: '1.25'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '2as_se',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qTextKatex,
					questionTextAr: qTextKatex,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						shuffle: false
					},
					explanation: `نهاية $f$ عند $\\pm\\infty$ هي $\\frac{${a}}{1} = ${a}$ (مقارب أفقي $y = ${a}$). والقيمتان الممنوعتان هما حلا $x^2 - ${r2} = 0$ أي $x = ${posRoot}$ و $x = -${posRoot}$ (مقاربين عموديين).`
				},
				sujetExercise,
				hints: [
					`نهاية حاصل قسمة كثيري حدود من نفس الدرجة عند اللانهاية هي حاصل قسمة معاملي أعلى حدين.`,
					`المقام ينعدم عند قيمتين متناظرتين: $x = x_0$ و $x = -x_0$.`,
					`يقبل المنحنى ثلاثة مستقيمات مقاربة: واحد أفقي واثنان عموديان.`
				],
				solutionStepsAr: [
					`المستقيم المقارب الأفقي هو $y = ${a}$ لأن $\\lim_{x \\to \\pm\\infty} f(x) = ${a}$.`,
					`المستقيمان المقاربان العموديان هما $x = ${posRoot}$ و $x = -${posRoot}$ لأن النهاية عندهما غير منتهية.`,
					`معادلات المستقيمات المقاربة هي: $y = ${a}$، $x = ${posRoot}$، $x = -${posRoot}$.`
				],
				finalAnswer: `y = ${a} \\text{ ، } x = ${posRoot} \\text{ ، } x = -${posRoot}`
			};
		}
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Indeterminate Forms & Oblique Asymptotes with SVG Plot (2AS Analysis)
// ═══════════════════════════════════════════════════════════════════════════════

export const obliqueAsymptotePosTemplate: ParameterizedTemplate = {
	id: 'tpl_2as_shared_t2_oblique_asymptote_pos',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'analysis',
	titleAr: 'حالات عدم التعيين والمستقيم المقارب المائل ودراسة الوضع النسبي',
	curriculumLessonId: 'lesson_2as_se_t2_limits_indeterminate_forms_oblique_asymptotes',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const x0 = rng.pick([-2, -1, 1, 2]);
		const a = rng.pick([1, 2, -1]);
		const b = rng.pick([-2, -1, 0, 1, 2]);
		const c = rng.pick([-3, -2, 2, 3]);

		// f(x) = a*x + b + c/(x - x0) = (a*x^2 + (b - a*x0)*x + (c - b*x0)) / (x - x0)
		const coeffQuad = a;
		const coeffLin = b - a * x0;
		const coeffConst = c - b * x0;

		const numKatex = quadraticKatex(coeffQuad, coeffLin, coeffConst);
		const numTypst = quadraticTypst(coeffQuad, coeffLin, coeffConst);
		const denKatex = `x ${signedConstKatex(-x0)}`;
		const denTypst = `x ${signedConstTypst(-x0)}`;

		const asympKatex = linearKatex(a, b);
		const asympTypst = linearTypst(a, b);

		// Generate SVG plot of curve and oblique asymptote
		const fnPlot = (x: number): number => {
			if (Math.abs(x - x0) < 0.12) return NaN;
			return a * x + b + c / (x - x0);
		};

		const plotSvg = svgFunctionCurvePlot({
			fn: fnPlot,
			curveLabel: 'Cf',
			asymptotes: [
				{ kind: 'vertical', value: x0, label: `x = ${x0}`, color: '#dc2626' },
				{ kind: 'oblique', a, b, label: `(D): y = ${asympKatex}`, color: '#059669' }
			],
			xMin: x0 - 4.5,
			xMax: x0 + 4.5,
			yMin: Math.min(-5, Math.floor(b - 4)),
			yMax: Math.max(7, Math.ceil(b + 6)),
			width: 380,
			height: 250
		});
		const plotImgPath = saveSvgAsset(`2as_t2_oblique_${difficulty}_s${seed}`, plotSvg);

		const correctAsympEq = `$y = ${asympKatex}$`;
		const distractors = [
			{
				text: `$y = ${linearKatex(a, -b)}$`,
				diagnosticFeedback: 'تحقق من إشارة الحد الثابت $b$ عند المطابقة أو القسمة الإقليدية.'
			},
			{
				text: `$y = ${linearKatex(-a, b)}$`,
				diagnosticFeedback: 'معامل التوجيه $a$ هو حاصل قسمة معاملي الحدين الأعلى درجة.'
			},
			{
				text: `$y = ${linearKatex(a, b + 1)}$`,
				diagnosticFeedback: 'تأكد من دقة حساب باقي وحاصل القسمة الإقليدية.'
			}
		];
		const mcq = buildUniqueMcqOptions(correctAsympEq, distractors, rng);

		const qTextKatex = `لتكن الدالة الناطقة $f(x) = \\frac{${numKatex}}{${denKatex}}$ المعرفة على $\\mathbb{R} \\setminus \\{${x0}\\}$. عيّن معادلة المستقيم المقارب المائل $(D)$ للمنحنى $(C_f)$ بجوار $+\\infty$.`;

		// Position explanation
		const posAboveInterval = c > 0 ? `]${x0} ; +oo[` : `]-oo ; ${x0}[`;
		const posBelowInterval = c > 0 ? `]-oo ; ${x0}[` : `]${x0} ; +oo[`;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر الدالة العددية $f$ المعرفة على $D_f = bb(R) backslash {${x0}}$ بـ: $f(x) = frac(${numTypst}, ${denTypst})$. نرمز بـ $(C_f)$ لتمثيلها البياني في معلم متعامد ومتجانس.`,
			content: [
				{
					type: 'text',
					content: `1) بيّن أنه من أجل كل $x in D_f$ يمكن كتابة $f(x)$ على الشكل: $f(x) = ${asympTypst} + frac(${c}, ${denTypst})$.`,
					answer: `1) بتوحيد المقامات أو بإجراء القسمة الإقليدية لكثير الحدود في البسط على المقام $(x ${signedConstTypst(-x0)})$, نجد:\n$(${asympTypst})(x ${signedConstTypst(-x0)}) + ${c} = ${numTypst}$. إذن العبارة محققة.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) احسب $lim_(x -> +oo) [f(x) - (${asympTypst})]$ و $lim_(x -> -oo) [f(x) - (${asympTypst})]$، ثم فسر النتيجة هندسيا.`,
					answer: `2) لدينا: $f(x) - (${asympTypst}) = frac(${c}, ${denTypst})$.\n$lim_(x -> +oo) frac(${c}, ${denTypst}) = 0$ و $lim_(x -> -oo) frac(${c}, ${denTypst}) = 0$.\nالتفسير الهندسي: المستقيم $(D)$ ذو المعادلة $y = ${asympTypst}$ مستقيم مقارب مائل للمنحنى $(C_f)$ بجوار $+oo$ و $-oo$.`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `3) ادرس إشارة الفرق $f(x) - (${asympTypst})$ على $D_f$، ثم استنتج الوضع النسبي للمنحنى $(C_f)$ بالنسبة للمستقيم المقارب المائل $(D)$.`,
					answer: `3) إشارة الفرق هي إشارة الكسر $frac(${c}, ${denTypst})$:\n- على المجال $${posAboveInterval}$: الفرق موجب تماما ($> 0$)، فالمنحنى $(C_f)$ يقع فوق المستقيم $(D)$.\n- على المجال $${posBelowInterval}$: الفرق سالب تماما ($< 0$)، فالمنحنى $(C_f)$ يقع تحت المستقيم $(D)$.`,
					mark: '1.25'
				},
				{
					type: 'image',
					src: plotImgPath,
					caption: 'التمثيل البياني للمنحنى (Cf) والمستقيم المقارب المائل (D)',
					width: 380
				},
				{
					type: 'text',
					content: `4) بقراءة بيانية، اذكر معادلة المستقيم المقارب العمودي للمنحنى $(C_f)$.`,
					answer: `4) المستقيم المقارب العمودي هو $x = ${x0}$.`,
					mark: '0.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				imageUrl: plotImgPath,
				questionText: qTextKatex,
				questionTextAr: qTextKatex,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					shuffle: false
				},
				explanation: `عند قسمة البسط على المقام نجد $f(x) = ${asympKatex} + \\frac{${c}}{${denKatex}}$. وبما أن $\\lim_{x \\to +\\infty} \\frac{${c}}{${denKatex}} = 0$، فإن معادلة المستقيم المقارب المائل هي $y = ${asympKatex}$.`
			},
			sujetExercise,
			hints: [
				`لكتابة الدالة على شكل $ax + b + \\frac{c}{x - x_0}$، استعمل القسمة الإقليدية أو طريقة المطابقة.`,
				`المستقيم $y = ax + b$ مقارب مائل إذا وفقط إذا كانت نهاية الفرق $[f(x) - (ax + b)]$ عند اللانهاية معدومة.`,
				`لدراسة الوضع النسبي، ادرس إشارة الفرق: إذا كان موجباً فـ $(C_f)$ فوق المقارب، وإذا كان سالباً فهو تحته.`
			],
			solutionStepsAr: [
				`تفكيك عبارة الدالة: $f(x) = ${asympKatex} + \\frac{${c}}{${denKatex}}$.`,
				`حساب نهاية الفرق: $\\lim_{x \\to \\pm\\infty} [f(x) - (${asympKatex})] = 0$، إذن المستقيم $(D): y = ${asympKatex}$ مقارب مائل.`,
				`الوضع النسبي: المنحنى $(C_f)$ يقع فوق $(D)$ على المجال $${posAboveInterval.replace('+oo', '+\\infty').replace('-oo', '-\\infty')}$ وتحته على المجال الآخر.`
			],
			finalAnswer: `y = ${asympKatex}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Oriented Angles, Principal Measure & Trig Equations (2AS Geometry)
// ═══════════════════════════════════════════════════════════════════════════════

export const orientedAnglesTrigEqTemplate: ParameterizedTemplate = {
	id: 'tpl_2as_shared_t2_oriented_angles_trig_eq',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'geometry',
	titleAr: 'الزوايا الموجهة والقياس الرئيسي وحل المعادلات المثلثية',
	curriculumLessonId: 'lesson_2as_se_t2_oriented_angles_trig_circle_radian',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		let M = 3;
		let K = 25;

		if (difficulty === 'easy') {
			M = 3;
			K = rng.pick([7, 11, 13, 17, 19, 23, 25, -7, -11, -13, -17]);
		} else if (difficulty === 'medium') {
			M = 4;
			K = rng.pick([9, 11, 13, 15, 17, 19, 21, -9, -11, -13, -15]);
		} else {
			M = 6;
			K = rng.pick([13, 17, 19, 23, 25, 29, 31, 35, -13, -17, -19, -23]);
		}

		const red = reduceAngle(K, M);

		// SVG Trigonometric Circle with the principal angle highlighted
		const trigSvg = svgTrigonometricCircle({
			anglesRad: [{ rad: red.rad, label: `alpha`, color: '#dc2626' }]
		});
		const trigImgPath = saveSvgAsset(`2as_t2_trig_${difficulty}_s${seed}`, trigSvg);

		const correctAlphaText = `$${red.alphaKatex}$`;
		const absAlphaKatex = red.alphaKatex.replace(/^-/, '');
		const oppositeAlphaKatex = red.sn > 0 ? `-${absAlphaKatex}` : absAlphaKatex;
		const distractors = [
			{
				text: `$${oppositeAlphaKatex}$`,
				diagnosticFeedback: 'انتبه لإشارة الباقي الجبري عند حصر القيس في المجال $]-\\pi ; \\pi]$.'
			},
			{
				text: `$${red.thetaKatex}$`,
				diagnosticFeedback: 'الزاوية المعطاة ليست قَيساً رئيسياً لأن قيمتها المطلقة تتجاوز $\\pi$.'
			},
			{
				text: `$\\frac{\\pi}{${M}}$`,
				diagnosticFeedback: 'تحقق من حساب مضاعفات $2\\pi$ المطروحة من الزاوية الأصلية.'
			},
			{
				text: `$\\frac{2\\pi}{${M}}$`,
				diagnosticFeedback: 'راجع حصر القيس الرئيسي في المجال $]-\\pi ; \\pi]$.'
			},
			{
				text: `$\\frac{${M - 1}\\pi}{${M}}$`,
				diagnosticFeedback: 'تحقق من إشارة وقيمة باقي القسمة على $2\\pi$.'
			}
		];
		const mcq = buildUniqueMcqOptions(correctAlphaText, distractors, rng);

		const qTextKatex = `عيّن القياس الرئيسي للزاوية الموجهة التي قيسها $\\theta = ${red.thetaKatex}$ في المجال $]-\\pi ; \\pi]$.`;

		// Set up a simple trigonometric equation related to standard values
		let eqKatex = '';
		let eqTypst = '';
		let solKatex = '';
		let solTypst = '';

		if (M === 3) {
			eqKatex = '2\\cos(x) - 1 = 0';
			eqTypst = '2 cos(x) - 1 = 0';
			solKatex = 'S = \\left\\{-\\frac{\\pi}{3} ; \\frac{\\pi}{3}\\right\\}';
			solTypst = 'S = {-frac(pi, 3), frac(pi, 3)}';
		} else if (M === 4) {
			eqKatex = '2\\cos(x) + \\sqrt{2} = 0';
			eqTypst = '2 cos(x) + sqrt(2) = 0';
			solKatex = 'S = \\left\\{-\\frac{3\\pi}{4} ; \\frac{3\\pi}{4}\\right\\}';
			solTypst = 'S = {-frac(3 pi, 4), frac(3 pi, 4)}';
		} else {
			eqKatex = '2\\sin(x) - 1 = 0';
			eqTypst = '2 sin(x) - 1 = 0';
			solKatex = 'S = \\left\\{\\frac{\\pi}{6} ; \\frac{5\\pi}{6}\\right\\}';
			solTypst = 'S = {frac(pi, 6), frac(5 pi, 6)}';
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `تعتمد هذه المسألة على مفاهيم الزوايا الموجهة والقياس الرئيسي والحلول المضبوطة في حساب المثلثات.`,
			content: [
				{
					type: 'text',
					content: `1) عيّن القياس الرئيسي $alpha$ للزاوية الموجهة ذات القيس $theta = ${red.thetaTypst}$ في المجال $]-pi, pi]$. فسر خطوات الاختزال بالتفصيل.`,
					answer: `1) نكتب $theta$ على الشكل: $theta = alpha + 2k pi$ مع $alpha in ]-pi, pi]$ و $k in bb(Z)$:\n$frac(${K} pi, ${M}) = frac(${red.kRem} pi, ${M}) + ${2 * red.p} pi = ${red.alphaTypst} + ${red.p !== 0 ? (red.p > 0 ? `2 times ${red.p} pi` : `- 2 times ${Math.abs(red.p)} pi`) : '0'}$.\nإذن القياس الرئيسي هو: $alpha = ${red.alphaTypst}$.`,
					mark: '1.25'
				},
				{
					type: 'image',
					src: trigImgPath,
					caption: 'تمثيل الزاوية الموجهة alpha على الدائرة المثلثية',
					width: 220
				},
				{
					type: 'text',
					content: `2) احسب القيمتين المضبوطتين لكل من $cos(theta)$ و $sin(theta)$.`,
					answer: `2) بما أن $theta$ و $alpha$ يمثلان نفس النقطة على الدائرة المثلثية:\n$cos(theta) = cos(${red.alphaTypst}) = ${red.cosT}$ و $sin(theta) = sin(${red.alphaTypst}) = ${red.sinT}$.`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `3) حل في المجال $]-pi, pi]$ المعادلة المثلثية: $${eqTypst}$.`,
					answer: `3) لدينا: $${eqTypst}$. الحلول في المجال $]-pi, pi]$ هي:\n$${solTypst}$.`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				imageUrl: trigImgPath,
				questionText: qTextKatex,
				questionTextAr: qTextKatex,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					shuffle: false
				},
				explanation: `نكتب $\\theta = ${red.thetaKatex} = ${red.alphaKatex} + 2(${red.p})\\pi$. بما أن $${red.alphaKatex} \\in ]-\\pi ; \\pi]$، فإن القياس الرئيسي هو $\\alpha = ${red.alphaKatex}$.`
			},
			sujetExercise,
			hints: [
				`القياس الرئيسي لزاوية موجهة هو القيس الوحيد $\\alpha$ الذي يحقق $\\theta = \\alpha + 2k\\pi$ مع $-\\pi < \\alpha \\le \\pi$.`,
				`اطرح أو أضف مضاعفات زوجية للعدد $\\pi$ (أي $2k\\pi$) حتى يقع الكسر داخل المجال $]-1 ; 1]$.`,
				`قيم جيب التمام والجيب للزاوية الأصلية تساوي تماما قيم جيب التمام والجيب لقياسها الرئيسي.`
			],
			solutionStepsAr: [
				`تفكيك القيس: $${red.thetaKatex} = ${red.alphaKatex} + 2(${red.p})\\pi$.`,
				`القياس الرئيسي في $]-\\pi ; \\pi]$ هو $\\alpha = ${red.alphaKatex}$.`,
				`القيمتان المضبوطتان: $\\cos(\\theta) = ${red.cosK}$ و $\\sin(\\theta) = ${red.sinK}$، وحلول المعادلة هي $${solKatex}$.`
			],
			finalAnswer: red.alphaKatex
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Homothety Definition, Image Coordinates & Area Ratio (2AS Geometry)
// ═══════════════════════════════════════════════════════════════════════════════

export const homothetyRatioTemplate: ParameterizedTemplate = {
	id: 'tpl_2as_shared_t2_homothety_ratio',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'geometry',
	titleAr: 'التحاكي في المستوي: إحداثيات النقطة الصورة ونسبة المساحات',
	curriculumLessonId: 'lesson_2as_se_t2_homothety_definition_properties_constructions',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const xOmega = rng.pick([-2, -1, 0, 1, 2]);
		const yOmega = rng.pick([-2, -1, 0, 1, 2]);

		let k = 2;
		let kTypst = '2';
		let kKatex = '2';

		if (difficulty === 'easy') {
			k = rng.pick([2, 3]);
			kTypst = `${k}`;
			kKatex = `${k}`;
		} else if (difficulty === 'medium') {
			k = rng.pick([-2, -3]);
			kTypst = `${k}`;
			kKatex = `${k}`;
		} else {
			// Half-integers or fractional ratios
			const kChoices = [-1.5, 1.5, 2.5];
			k = rng.pick(kChoices);
			if (k === 1.5) {
				kTypst = 'frac(3, 2)';
				kKatex = '\\frac{3}{2}';
			} else if (k === -1.5) {
				kTypst = '-frac(3, 2)';
				kKatex = '-\\frac{3}{2}';
			} else {
				kTypst = 'frac(5, 2)';
				kKatex = '\\frac{5}{2}';
			}
		}

		// Pick delta integers so image coordinates are strictly integers
		const dxA = rng.pick([-2, 2, 4]);
		const dyA = rng.pick([-2, 2, 4]);
		const xA = xOmega + dxA;
		const yA = yOmega + dyA;

		const xAPrime = Math.round(xOmega + k * dxA);
		const yAPrime = Math.round(yOmega + k * dyA);

		// Triangle ABC right-angled at A with base dxB and height dyC
		const baseLen = rng.pick([3, 4, 6]);
		const heightLen = rng.pick([2, 4, 5]);
		const areaOrig = 0.5 * baseLen * heightLen;
		const areaPrime = k * k * areaOrig;

		const correctCoordText = `$A'(${xAPrime} ; ${yAPrime})$`;
		const distractors = [
			{
				text: `$A'(${Math.round(k * xA)} ; ${Math.round(k * yA)})$`,
				diagnosticFeedback: 'انتبه: صورة نقطة بالتحاكي تتطلب اعتبار المركز $\\Omega$: $\\vec{\\Omega A\'} = k \\vec{\\Omega A}$ وليس مجرد ضرب إحداثيات $A$ في $k$.'
			},
			{
				text: `$A'(${yAPrime} ; ${xAPrime})$`,
				diagnosticFeedback: 'لا تعكس بين الفاصلة والترتيب.'
			},
			{
				text: `$A'(${Math.round(xOmega - k * dxA)} ; ${Math.round(yOmega - k * dyA)})$`,
				diagnosticFeedback: 'تحقق من إشارة نسبة التحاكي $k$.'
			}
		];
		const mcq = buildUniqueMcqOptions(correctCoordText, distractors, rng);

		const qTextKatex = `في معلم متعامد ومتجانس، نعتبر النقطتين $\\Omega(${xOmega} ; ${yOmega})$ و $A(${xA} ; ${yA})$. عيّن إحداثيي النقطة $A'$ صورة النقطة $A$ بالتحاكي $h$ الذي مركزه $\\Omega$ ونسبته $k = ${kKatex}$.`;

		const kSquareKatex = k % 1 === 0 ? `${k * k}` : `${(k * k).toFixed(2)}`;
		const kSquareTypst = k % 1 === 0 ? `${k * k}` : `${(k * k).toFixed(2)}`;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `في المستوي المنسوب إلى معلم متعامد ومتجانس $(O; arrow(i), arrow(j))$، نعتبر النقطة $Omega(${xOmega}, ${yOmega})$ والتحاكي $h$ ذي المركز $Omega$ والنسبة $k = ${kTypst}$.`,
			content: [
				{
					type: 'text',
					content: `1) اذكر التعريف الشعاعي للتحاكي $h$، واكتب العبارة التحليلية لحساب إحداثيي النقطة $M'(x', y')$ صورة $M(x, y)$ بدلالة إحداثيات $Omega$ والنسبة $k$.`,
					answer: `1) التعريف الشعاعي: $arrow(Omega M') = ${kTypst} arrow(Omega M)$.\nالعبارة التحليلية:\n$x' - ${xOmega} = ${kTypst}(x - ${xOmega}) arrow.r.double x' = ${xOmega} + ${kTypst}(x - ${xOmega})$\n$y' - ${yOmega} = ${kTypst}(y - ${yOmega}) arrow.r.double y' = ${yOmega} + ${kTypst}(y - ${yOmega})$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) لتكن النقطة $A(${xA}, ${yA})$. احسب إحداثيي النقطة $A'$ صورة $A$ بالتحاكي $h$.`,
					answer: `2) $x_(A') = ${xOmega} + ${kTypst}(${xA} - ${xOmega}) = ${xAPrime}$ و $y_(A') = ${yOmega} + ${kTypst}(${yA} - ${yOmega}) = ${yAPrime}$.\nإذن: $A'(${xAPrime}, ${yAPrime})$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) نعتبر مثلثا $A B C$ قائم الزاوية في $A$ مساحته $cal(A) = ${areaOrig} upright("cm")^2$. احسب $cal(A)'$ مساحة المثلث $A' B' C'$ صورة المثلث $A B C$ بالتحاكي $h$.`,
					answer: `3) التحاكي الذي نسبته $k$ يضرب المساحات في $k^2$:\n$cal(A)' = k^2 times cal(A) = (${kTypst})^2 times ${areaOrig} = ${kSquareTypst} times ${areaOrig} = ${areaPrime} upright("cm")^2$.`,
					mark: '1'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qTextKatex,
				questionTextAr: qTextKatex,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					shuffle: false
				},
				explanation: `العلاقة الشعاعية للتحاكي هي $\\vec{\\Omega A'} = k \\vec{\\Omega A}$. إذن $x_{A'} = ${xOmega} + ${kKatex}(${xA} - ${xOmega}) = ${xAPrime}$ و $y_{A'} = ${yOmega} + ${kKatex}(${yA} - ${yOmega}) = ${yAPrime}$.`
			},
			sujetExercise,
			hints: [
				`العلاقة الشعاعية للتحاكي ذي المركز $\\Omega$ والنسبة $k$ هي $\\vec{\\Omega M'} = k \\vec{\\Omega M}$.`,
				`إحداثيات النقطة الصورة: $x' = x_\\Omega + k(x - x_\\Omega)$ و $y' = y_\\Omega + k(y - y_\\Omega)$.`,
				`التحاكي يضرب الأطوال في $|k|$ والمساحات في $k^2$.`
			],
			solutionStepsAr: [
				`تطبيق العلاقة الشعاعية: $\\vec{\\Omega A'} = ${kKatex} \\vec{\\Omega A}$.`,
				`حساب الإحداثيات: $x_{A'} = ${xAPrime}$ و $y_{A'} = ${yAPrime}$، إذن $A'(${xAPrime} ; ${yAPrime})$.`,
				`المساحة تتضاعف بالمعامل $k^2 = ${kSquareKatex}$، إذن $\\mathcal{A}' = ${areaPrime} \\text{ cm}^2$.`
			],
			finalAnswer: `A'(${xAPrime} ; ${yAPrime})`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Scalar Product, Normal Vector Line & Al-Kashi Theorem (2AS Geometry)
// ═══════════════════════════════════════════════════════════════════════════════

export const scalarProductCircleAlkashiTemplate: ParameterizedTemplate = {
	id: 'tpl_2as_shared_t2_scalar_product_circle_alkashi',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'geometry',
	titleAr: 'الجداء السلمي في المستوي: التعامد، معادلة مستقيم بشعاع ناظمي ومبرهنة الكاشي',
	curriculumLessonId: 'lesson_2as_se_t2_scalar_product_definition_analytic_line_circle',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const xA = rng.pick([-2, -1, 0, 1, 2]);
		const yA = rng.pick([-2, -1, 0, 1, 2]);

		// AB vector components (even for easy integer midpoint)
		const u1 = rng.pick([-4, -2, 2, 4]);
		const u2 = rng.pick([-2, 2, 4]);
		const xB = xA + u1;
		const yB = yA + u2;

		let v1 = 0;
		let v2 = 0;

		if (difficulty === 'easy') {
			// Orthogonal vectors AB . AC = 0
			// (u1, u2) . (-u2/2, u1/2) = -u1*u2/2 + u2*u1/2 = 0
			v1 = -u2;
			v2 = u1;
		} else {
			// Non-orthogonal
			const candidates = [-3, -2, -1, 1, 2, 3].filter((k) => k !== 0);
			v1 = rng.pick(candidates);
			v2 = rng.pick(candidates);
			if (u1 * v1 + u2 * v2 === 0) {
				v1 += 1;
			}
		}

		const xC = xA + v1;
		const yC = yA + v2;

		const dotProd = u1 * v1 + u2 * v2;
		const abSq = u1 * u1 + u2 * u2;
		const acSq = v1 * v1 + v2 * v2;
		const bcSq = (v1 - u1) * (v1 - u1) + (v2 - u2) * (v2 - u2);

		// Midpoint of [AB]
		const xI = xA + u1 / 2;
		const yI = yA + u2 / 2;
		const rSq = abSq / 4;

		// Line Delta through C perpendicular to (AB): normal vector is AB(u1, u2)
		// u1*(x - xC) + u2*(y - yC) = 0 => u1*x + u2*y - (u1*xC + u2*yC) = 0
		const cConst = -(u1 * xC + u2 * yC);

		const correctDotText = `$${dotProd}$`;
		const distractors = [
			{
				text: `$${u1 * v2 + u2 * v1}$`,
				diagnosticFeedback: 'انتبه: العبارة التحليلية للجداء السلمي هي $X X\' + Y Y\'$ وليس $X Y\' + Y X\'$.'
			},
			{
				text: `$${-dotProd}$`,
				diagnosticFeedback: 'تحقق من إشارات جداء المركبات.'
			},
			{
				text: `$${u1 * v1 - u2 * v2}$`,
				diagnosticFeedback: 'الجداء السلمي يتضمن جمع الجداءين ($X X\' + Y Y\'$) وليس طرحهما.'
			},
			{
				text: `$${dotProd + 2}$`,
				diagnosticFeedback: 'راجع الحساب العددي لمركبتي الشعاعين $\\vec{AB}$ و $\\vec{AC}$.'
			},
			{
				text: `$${dotProd - 3}$`,
				diagnosticFeedback: 'تأكد من طرح إحداثيات البداية $A$ عند حساب مركبتي كل شعاع.'
			}
		];
		const mcq = buildUniqueMcqOptions(correctDotText, distractors, rng);

		const qTextKatex = `في مستو منسوب إلى معلم متعامد ومتجانس، نعتبر النقط $A(${xA} ; ${yA})$ و $B(${xB} ; ${yB})$ و $C(${xC} ; ${yC})$. احسب الجداء السلمي $\\vec{AB} \\cdot \\vec{AC}$.`;

		const lineDeltaTypst = `${u1} x ${signedConstTypst(u2)} y ${signedConstTypst(cConst)} = 0`;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `في المستوي المنسوب إلى معلم متعامد ومتجانس $(O; arrow(i), arrow(j))$، نعتبر النقط: $A(${xA}, ${yA})$، $B(${xB}, ${yB})$، و $C(${xC}, ${yC})$.`,
			content: [
				{
					type: 'text',
					content: `1) عيّن مركبتي كل من الشعاعين $arrow(A B)$ و $arrow(A C)$، ثم احسب الجداء السلمي $arrow(A B) dot arrow(A C)$.`,
					answer: `1) مركبات الأشعة:\n$arrow(A B)(${u1}, ${u2})$ و $arrow(A C)(${v1}, ${v2})$.\nالجداء السلمي بالعبارة التحليلية:\n$arrow(A B) dot arrow(A C) = (${u1}) times (${v1}) + (${u2}) times (${v2}) = ${dotProd}$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) احسب الطولين $A B$ و $A C$.`,
					answer: `2) $A B = sqrt((${u1})^2 + (${u2})^2) = sqrt(${abSq})$\n$A C = sqrt((${v1})^2 + (${v2})^2) = sqrt(${acSq})$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) عيّن معادلة ديكارتية للمستقيم $(Delta)$ الذي يشمل النقطة $C$ ويقبل $arrow(A B)$ كشعاع ناظمي له.`,
					answer: `3) بما أن $arrow(A B)(${u1}, ${u2})$ شعاع ناظمي لـ $(Delta)$، فإن معادلته من الشكل $${u1} x ${signedConstTypst(u2)} y + c = 0$.\nبما أن $C(${xC}, ${yC}) in (Delta)$:\n$${u1}(${xC}) ${signedConstTypst(u2)}(${yC}) + c = 0 arrow.r.double c = ${cConst}$.\nإذن معادلة المستقيم $(Delta)$ هي: $${lineDeltaTypst}$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `4) بتطبيق مبرهنة الكاشي (قانون جيب التمام)، احسب الطول $B C$ واستنتج قيمة $cos(widehat(B A C))$.`,
					answer: `4) حسب مبرهنة الكاشي في المثلث $A B C$:\n$B C^2 = A B^2 + A C^2 - 2 (arrow(A B) dot arrow(A C)) = ${abSq} + ${acSq} - 2(${dotProd}) = ${bcSq}$.\nإذن: $B C = sqrt(${bcSq})$.\nواستنتاج جيب التمام:\n$cos(widehat(B A C)) = frac(arrow(A B) dot arrow(A C), A B times A C) = frac(${dotProd}, sqrt(${abSq}) times sqrt(${acSq}))$.`,
					mark: '1'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qTextKatex,
				questionTextAr: qTextKatex,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					shuffle: false
				},
				explanation: `مركبتا الشعاعين هما $\\vec{AB}(${u1} ; ${u2})$ و $\\vec{AC}(${v1} ; ${v2})$. إذن $\\vec{AB} \\cdot \\vec{AC} = (${u1})(${v1}) + (${u2})(${v2}) = ${dotProd}$.`
			},
			sujetExercise,
			hints: [
				`العبارة التحليلية للجداء السلمي في معلم متعامد ومتجانس هي $\\vec{u} \\cdot \\vec{v} = X X' + Y Y'$.`,
				`معادلة مستقيم بشعاع ناظمي $\\vec{n}(a ; b)$ هي من الشكل $a(x - x_0) + b(y - y_0) = 0$.`,
				`مبرهنة الكاشي في مثلث $ABC$: $BC^2 = AB^2 + AC^2 - 2 \\vec{AB} \\cdot \\vec{AC}$.`
			],
			solutionStepsAr: [
				`مركبات الأشعة: $\\vec{AB}(${u1} ; ${u2})$ و $\\vec{AC}(${v1} ; ${v2})$.`,
				`الجداء السلمي: $\\vec{AB} \\cdot \\vec{AC} = ${dotProd}$.`,
				`مبرهنة الكاشي: $BC^2 = ${abSq} + ${acSq} - 2(${dotProd}) = ${bcSq}$، ومنه $BC = \\sqrt{${bcSq}}$.`
			],
			finalAnswer: `${dotProd}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Comprehensive Problem Synthesis (Analytical Rational Function & Optimization)
// ═══════════════════════════════════════════════════════════════════════════════

export const problemSynthesisTemplate: ParameterizedTemplate = {
	id: 'tpl_2as_shared_t2_problem_synthesis',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'integration',
	isIntegration: true,
	titleAr: 'المسألة الشاملة: دراسة دالة ناطقة والمستقيمات المقاربة ومسألة استمثال اقتصادية',
	curriculumLessonId: 'lesson_2as_se_t2_scalar_product_applications_alkashi_median_loci',
	defaultPoints: 7,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const a = rng.pick([1, 2]);
		const k = difficulty === 'easy' ? rng.pick([2, 3]) : difficulty === 'medium' ? rng.pick([3, 4]) : rng.pick([4, 5]);
		const b = rng.pick([2, 3, 4, 5]);
		const c = a * k * k; // Derivative vanishes at x = k on ]0, +oo[

		// f(x) = a*x + b + c/x = (a*x^2 + b*x + c) / x
		const minVal = 2 * a * k + b; // f(k) = a*k + b + c/k = a*k + b + a*k = 2*a*k + b

		const asympKatex = linearKatex(a, b);
		const asympTypst = linearTypst(a, b);

		// SVG Plot for the rational function on ]0, +oo[ with oblique asymptote and minimum tangent
		const fnPlot = (x: number): number => {
			if (x <= 0.2) return NaN;
			return a * x + b + c / x;
		};

		const plotSvg = svgFunctionCurvePlot({
			fn: fnPlot,
			curveLabel: 'Cf',
			asymptotes: [
				{ kind: 'vertical', value: 0, label: 'x = 0', color: '#dc2626' },
				{ kind: 'oblique', a, b, label: `(Delta): y = ${asympKatex}`, color: '#2563eb' }
			],
			tangents: [{ x: k, y: minVal, slope: 0, halfSpan: 1.2, color: '#059669' }],
			points: [{ x: k, y: minVal, label: `S(${k}; ${minVal})`, color: '#dc2626' }],
			xMin: -0.5,
			xMax: Math.max(8, k + 4),
			yMin: -1,
			yMax: Math.ceil(minVal + 8),
			width: 380,
			height: 250
		});
		const plotImgPath = saveSvgAsset(`2as_t2_problem_${difficulty}_s${seed}`, plotSvg);

		const correctOptText = `$x^* = ${k}$`;
		const distractors = [
			{
				text: `$x^* = ${2 * k}$`,
				diagnosticFeedback: 'تنعدم المشتقة عندما يكون $x^2 = k^2$ أي $x = k$ وليس $2k$.'
			},
			{
				text: `$x^* = ${k * k}$`,
				diagnosticFeedback: 'القيمة $k^2$ هي حاصل قسمة الثابت $c$ على $a$ وليست القيمة الحرجة $x$.'
			},
			{
				text: `$x^* = ${k + 1}$`,
				diagnosticFeedback: 'تحقق من حل المعادلة $f\'(x) = 0$ على المجال $]0 ; +\\infty[$.'
			}
		];
		const mcq = buildUniqueMcqOptions(correctOptText, distractors, rng);

		const qTextKatex = `في المسألة الشاملة، ما هي كمية الإنتاج اليومية $x^*$ (بمئات الوحدات) التي تجعل التكلفة المتوسطة للوحدة $C_M(x) = f(x)$ أصغرية (دنيا)؟`;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `تتكون هذه المسألة الشاملة من شطرين متكاملين يهدفان لدراسة سلوك دالة ناطقة وتوظيفها في حل مسألة استمثال اقتصادية واقعية لوحدة إنتاجية.`,
			content: [
				{
					type: 'text',
					content: `الجزء الأول: الدراسة التحليلية للدالة $f$\nنعتبر الدالة العددية $f$ المعرفة على المجال $]0, +oo[$ بـ: $f(x) = ${asympTypst} + frac(${c}, x)$. نرمز بـ $(C_f)$ لتمثيلها البياني في معلم متعامد ومتجانس $(O; arrow(i), arrow(j))$.\n1) احسب نهايتي الدالة $f$ عند $0$ بقيم كبرى وعند $+oo$. فسر بيانيا النتيجة عند $0$.`,
					answer: `1) النهايات:\n- لما $x -> 0^+$: $lim_(x -> 0^+) (${asympTypst}) = ${b}$ و $lim_(x -> 0^+) frac(${c}, x) = +oo$، إذن $lim_(x -> 0^+) f(x) = +oo$.\nالتفسير البياني: حامل محور التراتيب (المستقيم ذو المعادلة $x = 0$) مستقيم مقارب عمودي للمنحنى $(C_f)$.\n- لما $x -> +oo$: $lim_(x -> +oo) (${asympTypst}) = +oo$ و $lim_(x -> +oo) frac(${c}, x) = 0$، إذن $lim_(x -> +oo) f(x) = +oo$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) بيّن أن المستقيم $(Delta)$ ذا المعادلة $y = ${asympTypst}$ مستقيم مقارب مائل للمنحنى $(C_f)$ بجوار $+oo$، ثم حدد الوضع النسبي بين $(C_f)$ و $(Delta)$ على المجال $]0, +oo[$.`,
					answer: `2) $lim_(x -> +oo) [f(x) - (${asympTypst})] = lim_(x -> +oo) frac(${c}, x) = 0$.\nإذن المستقيم $(Delta)$ ذو المعادلة $y = ${asympTypst}$ مستقيم مقارب مائل للمنحنى $(C_f)$ بجوار $+oo$.\nالوضع النسبي: من أجل كل $x > 0$ لدينا $frac(${c}, x) > 0$، ومنه المنحنى $(C_f)$ يقع تماما فوق المستقيم المقارب $(Delta)$ على المجال $]0, +oo[$.`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `3) بيّن أنه من أجل كل $x > 0$: $f'(x) = frac(${a}(x - ${k})(x + ${k}), x^2)$، ثم شكّل جدول تغيرات الدالة $f$.`,
					answer: `3) الدالة $f$ قابلة للاشتقاق على $]0, +oo[$ ودالتها المشتقة:\n$f'(x) = ${a} - frac(${c}, x^2) = frac(${a}x^2 - ${c}, x^2) = frac(${a}(x^2 - ${k * k}), x^2) = frac(${a}(x - ${k})(x + ${k}), x^2)$.\nبما أن $x > 0$ و $(x + ${k}) > 0$، فإن إشارة $f'(x)$ من إشارة $(x - ${k})$:\n- متناقصة تماما على $]0, ${k}]$.\n- متزايدة تماما على $[${k}, +oo[$.\n- تقبل قيمة حدية صغرى محلية هي $f(${k}) = ${minVal}$.`,
					mark: '1.5'
				},
				{
					type: 'image',
					src: plotImgPath,
					caption: 'التمثيل البياني للمنحنى (Cf) والمستقيم المقارب المائل (Delta) والمماس الأفقي',
					width: 380
				},
				{
					type: 'text',
					content: `4) اكتب معادلة المماس $(T)$ للمنحنى $(C_f)$ عند النقطة ذات الفاصلة $x = ${k}$.`,
					answer: `4) بما أن $f'(${k}) = 0$ و $f(${k}) = ${minVal}$، فإن المماس $(T)$ أفقي ومعادلته هي: $y = ${minVal}$.`,
					mark: '0.75'
				},
				{
					type: 'text',
					content: `الجزء الثاني: مسألة الاستمثال وتطبيق اقتصادي\nتنتج مؤسسة صيدلانية كمية يومية $x$ (بمئات الوحدات) من دواء وقائي، حيث $x in [1, 10]$. تُقدر التكلفة الإجمالية للإنتاج بآلاف الدنانير (kDA) بالدستور: $C_T(x) = ${a}x^2 + ${b}x + ${c}$.\n1) بيّن أن التكلفة المتوسطة لإنتاج الوحدة الواحدة $C_M(x) = frac(C_T(x), x)$ مطابقة للدالة $f(x)$ على المجال $[1, 10]$.`,
					answer: `1) $C_M(x) = frac(C_T(x), x) = frac(${a}x^2 + ${b}x + ${c}, x) = ${a}x + ${b} + frac(${c}, x) = f(x)$.`,
					mark: '0.75'
				},
				{
					type: 'text',
					content: `2) بالاعتماد على نتائج الجزء الأول، عيّن كمية الإنتاج $x^*$ التي تجعل التكلفة المتوسطة أصغرية (دنيا)، ثم احسب قيمة هذه التكلفة المتوسطة الدنيا بالدينار الجزائري (DA).`,
					answer: `2) تبلغ الدالة $f(x)$ قيمتها الصغرى على المجال $[1, 10]$ عند $x^* = ${k}$ (أي ${k * 100} وحدة).\nالتكلفة المتوسطة الدنيا هي: $C_M(${k}) = ${minVal}$ ألف دينار، أي $${minVal * 1000} upright("DA")$ للوحدة.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) إذا بيعت المئة وحدة بسعر ثابت قدره $P = ${minVal + 3}$ ألف دينار، احسب الربح اليومي الإجمالي المحقق عند مستوى الإنتاج الأمثل $x^* = ${k}$.`,
					answer: `3) عند $x^* = ${k}$:\n- الإيراد الإجمالي: $R(${k}) = P times ${k} = ${minVal + 3} times ${k} = ${(minVal + 3) * k}$ ألف دينار.\n- التكلفة الإجمالية: $C_T(${k}) = ${k} times C_M(${k}) = ${k} times ${minVal} = ${k * minVal}$ ألف دينار.\n- الربح الصافي: $B(${k}) = R(${k}) - C_T(${k}) = ${(minVal + 3) * k} - ${k * minVal} = ${3 * k}$ ألف دينار ($${3 * k * 1000} upright("DA")$).`,
					mark: '0.75'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				imageUrl: plotImgPath,
				questionText: qTextKatex,
				questionTextAr: qTextKatex,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					shuffle: false
				},
				explanation: `التكلفة المتوسطة هي $C_M(x) = f(x)$. ومن خلال جدول تغيرات $f$ في الجزء الأول، تنعدم المشتقة وتغير إشارتها من السالب إلى الموجب عند $x^* = ${k}$، حيث تبلغ التكلفة المتوسطة قيمتها الصغرى $f(${k}) = ${minVal}$ ألف دج.`
			},
			sujetExercise,
			hints: [
				`التكلفة المتوسطة $C_M(x)$ هي حاصل قسمة التكلفة الإجمالية $C_T(x)$ على الكمية المنتجة $x$.`,
				`تكون التكلفة المتوسطة أصغرية عند فاصلة القيمة الحدية الصغرى للدالة المشتقة $f'(x) = 0$.`,
				`المستقيم المقارب المائل يعبر عن السلوك التقاربي للتكلفة لما يؤول الإنتاج إلى قيم كبيرة.`
			],
			solutionStepsAr: [
				`دراسة سلوك الدالة: $f$ متناقصة على $]0 ; ${k}]$ ومتزايدة على $[${k} ; +\\infty[$.`,
				`تبلغ $f$ قيمتها الحدية الصغرى عند $x^* = ${k}$ وتساوي $f(${k}) = ${minVal}$.`,
				`الإنتاج الأمثل هو $x^* = ${k}$ مئات وحدات والتكلفة المتوسطة الدنيا هي $${minVal * 1000} \\text{ DA}$.`
			],
			finalAnswer: `x^* = ${k}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Export All 6 Shared Deterministic Templates for 2AS Trimester 2
// ═══════════════════════════════════════════════════════════════════════════════

export const SHARED_TEMPLATES_2AS_T2: ParameterizedTemplate[] = [
	limitsAsymptotesTemplate,
	obliqueAsymptotePosTemplate,
	orientedAnglesTrigEqTemplate,
	homothetyRatioTemplate,
	scalarProductCircleAlkashiTemplate,
	problemSynthesisTemplate
];
