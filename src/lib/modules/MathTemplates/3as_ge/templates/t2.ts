import type { ExerciseBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng, simplifyFraction } from '../../rng';
import { saveSvgAsset } from '../../svg-helpers';
import { svgFunctionCurvePlot, svgVariationTable } from '../../svg-secondary';

// ═══════════════════════════════════════════════════════════════════════════════
// Dual Syntax Formatters & Numerical Verifiers — 3AS GE (BAC) Trimester 2
// Western digits 0-9 only; 100% Halal economic applications.
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

function assertCentralDiff(
	fn: (x: number) => number,
	deriv: (x: number) => number,
	xs: number[],
	label: string
): void {
	const h = 1e-5;
	for (const x of xs) {
		const approx = (fn(x + h) - fn(x - h)) / (2 * h);
		const exact = deriv(x);
		if (!Number.isFinite(approx) || !Number.isFinite(exact) || Math.abs(approx - exact) > 1e-4) {
			throw new Error(`Derivative mismatch (${label}) at x=${x}: approx=${approx}, exact=${exact}`);
		}
	}
}

function simpsonIntegral(fn: (x: number) => number, a: number, b: number, n = 120): number {
	const h = (b - a) / n;
	let sum = fn(a) + fn(b);
	for (let i = 1; i < n; i++) {
		sum += (i % 2 === 0 ? 2 : 4) * fn(a + i * h);
	}
	return (sum * h) / 3;
}

function bisectRoot(fn: (x: number) => number, lo: number, hi: number): number {
	let a = lo;
	let b = hi;
	let fa = fn(a);
	for (let i = 0; i < 60; i++) {
		const mid = 0.5 * (a + b);
		const fm = fn(mid);
		if (fa * fm <= 0) {
			b = mid;
		} else {
			a = mid;
			fa = fm;
		}
	}
	return 0.5 * (a + b);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Exponential Equations & Economic Saturation Model f(x) = (ax + b)e^(-x) + c
// ═══════════════════════════════════════════════════════════════════════════════

const tplExpEquationsStudy: ParameterizedTemplate = {
	id: 'tpl_3as_ge_t2_exp_equations_study',
	grade: '3as_ge',
	trimesterId: 't2',
	domain: 'analysis',
	titleAr: 'الدالة الأسية: حل معادلات ودراسة نموذج تشبّع سوقي',
	curriculumLessonId: 'lesson_3as_ge_t2_exponential_functions',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Part 1: Solve e^(2x) - (r - m)e^x - rm = 0 on R (r >= 2, m >= 1) => X = -m (rejected) or X = r => x = ln(r)
		const rPool = difficulty === 'easy' ? [2, 3] : difficulty === 'medium' ? [2, 3, 4, 5] : [3, 5, 6, 7];
		const r = rng.pick(rPool);
		const m = rng.int(1, 3);
		const midCoeff = r - m; // coefficient is -(r - m)
		const constTerm = r * m;

		let eqKatex = 'e^{2x}';
		if (midCoeff > 0) eqKatex += midCoeff === 1 ? ' - e^x' : ` - ${midCoeff}e^x`;
		else if (midCoeff < 0) eqKatex += midCoeff === -1 ? ' + e^x' : ` + ${Math.abs(midCoeff)}e^x`;
		eqKatex += ` - ${constTerm} = 0`;

		let eqTypst = 'e^(2x)';
		if (midCoeff > 0) eqTypst += midCoeff === 1 ? ' - e^x' : ` - ${midCoeff} e^x`;
		else if (midCoeff < 0) eqTypst += midCoeff === -1 ? ' + e^x' : ` + ${Math.abs(midCoeff)} e^x`;
		eqTypst += ` - ${constTerm} = 0`;

		// Part 2: f(x) = (a x + b) e^(-x) + c with b = -a(k - 1), k in {1, 2, 3}, c = a*k + 2
		// f'(x) = a(k - x)e^(-x), peak at x = k, inflection at x = k + 1, horizontal asymptote y = c
		const a = rng.int(2, difficulty === 'easy' ? 3 : 5);
		const k = difficulty === 'easy' ? 1 : rng.int(2, 3);
		const b = -a * (k - 1);
		const c = a * k + 2;

		const fFn = (x: number) => (a * x + b) * Math.exp(-x) + c;
		const fpFn = (x: number) => a * (k - x) * Math.exp(-x);
		assertCentralDiff(fFn, fpFn, [0, 0.7, k, k + 1.4], 'expSaturation');

		const f0 = b + c; // = a + 2
		const fp0 = a * k;
		const fPeak = roundTo(fFn(k), 2);
		const linAxBK = linearKatex(a, b, 'x');
		const linAxBT = linearTypst(a, b, 'x');
		const fFactorK = b === 0 ? `${a}x` : `(${linAxBK})`;
		const fFactorT = b === 0 ? `${a} x` : `(${linAxBT})`;
		const fKatex = `${fFactorK}e^{-x} + ${c}`;
		const fTypst = `${fFactorT} e^(-x) + ${c}`;

		const curveSvg = svgFunctionCurvePlot({
			xMin: -0.4,
			xMax: 6.5,
			yMin: 0,
			yMax: Math.ceil(fPeak + 2),
			fn: (x) => (x >= 0 ? fFn(x) : NaN),
			curveLabel: 'C_f',
			asymptotes: [{ kind: 'horizontal', value: c, label: `y=${c}`, color: '#059669' }],
			points: [
				{ x: 0, y: f0, label: `(0;${f0})`, color: '#1d4ed8' },
				{ x: k, y: fPeak, label: `(${k};${fPeak})`, color: '#dc2626' }
			]
		});
		const curveUrl = saveSvgAsset(`3as_ge_t2_exp_sat_${difficulty}_s${seed}`, curveSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${c}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `ننمذج وتيرة المبيعات الشهرية لمنتج صناعي بآلاف الوحدات بالدالة $f(x) = ${fKatex}$ على $[0 ; +\\infty[$. احسب نهاية التشبّع $\\lim_{x \\to +\\infty} f(x)$:`,
				questionTextAr: `احسب قيمة $\\lim_{x \\to +\\infty} f(x)$:`,
				imageUrl: curveUrl,
				imageCaption: 'منحنى نموذج التشبّع السوقي والمقارب الأفقي',
				questionData: {
					answer: c,
					displayTemplate: 'lim f(x) = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `نعلم أن $\\lim_{x \\to +\\infty} x e^{-x} = 0$ و$\\lim_{x \\to +\\infty} e^{-x} = 0$، ومنه $\\lim_{x \\to +\\infty} f(x) = ${c}$.`
			};
		} else if (difficulty === 'medium') {
			const mcq = buildUniqueMcqOptions(
				`$\\mathcal{S} = \\{\\ln ${r}\\}$`,
				[
					{
						text: `$\\mathcal{S} = \\{\\ln ${r} ; \\ln(-${m})\\}$`,
						diagnosticFeedback: `بوضع $X = e^x$ نجد $X = -${m}$ مرفوضا لأن $e^x > 0$ دوما على $\\mathbb{R}$.`
					},
					{
						text: `$\\mathcal{S} = \\{${r}\\}$`,
						diagnosticFeedback: `وجدت قيمة $X = e^x = ${r}$؛ لا تنس أخذ اللوغاريتم النيبيري لإيجاد $x = \\ln ${r}$.`
					},
					{
						text: `$\\mathcal{S} = \\{0 ; \\ln ${r}\\}$`,
						diagnosticFeedback: `عوّض $x = 0$ ($e^0 = 1$) في المعادلة لتتأكد أنه ليس حلا، فالمميز يعطي جذرين $-${m}$ و$${r}$.`
					}
				],
				rng
			);
			finalAnswer = `\\{\\ln ${r}\\}`;
			quizQuestion = {
				type: 'mcq',
				questionText: `ما هي مجموعة حلول المعادلة $${eqKatex}$ في $\\mathbb{R}$؟`,
				questionTextAr: `حل المعادلة الأسية في $\\mathbb{R}$:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `بوضع $X = e^x > 0$ تصبح المعادلة $(X - ${r})(X + ${m}) = 0$. الجذر $-${m} < 0$ مرفوض، ومنه $e^x = ${r} \\iff x = \\ln ${r}$.`
			};
		} else {
			finalAnswer = `f(${k}) = ${a}e^{-${k}} + ${c}`;
			const mcq = buildUniqueMcqOptions(
				`تبلغ ذروتها عند $x = ${k}$ وقيمتها $${a}e^{-${k}} + ${c}$`,
				[
					{
						text: `تبلغ ذروتها عند $x = ${k + 1}$ وقيمتها $${a * 2}e^{-${k + 1}} + ${c}$`,
						diagnosticFeedback: `عند $x = ${k + 1}$ ينعدم المشتق الثاني $f''(x)$ (نقطة انعطاف)، أما الذروة فتتحقق عند $f'(x) = 0$ أي $x = ${k}$.`
					},
					{
						text: `متزايدة تماما على $[0 ; +\\infty[$ ولا تقبل ذروة`,
						diagnosticFeedback: `إشارة $f'(x) = ${a}(${k} - x)e^{-x}$ تنعدم عند $x = ${k}$ وتنقلب من موجبة إلى سالبة.`
					},
					{
						text: `تبلغ ذروتها عند $x = ${k}$ وقيمتها $${a}e^{${k}} + ${c}$`,
						diagnosticFeedback: `انتبه لإشارة الأس السالب عند تعويض $x = ${k}$ في $e^{-x}$.`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `بالنسبة للدالة الاقتصادية $f(x) = ${fKatex}$ على $[0 ; +\\infty[$، ما هي إحداثيات ذروة المبيعات؟`,
				questionTextAr: `عيّن ذروة الدالة $f$ على $[0 ; +\\infty[$:`,
				imageUrl: curveUrl,
				imageCaption: 'ذروة الدالة الاقتصادية f وتقاربها نحو عتبة التشبّع',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `$f'(x) = ${a}e^{-x} - ${fFactorK}e^{-x} = ${a}(${k} - x)e^{-x}$. ينعدم عند $x = ${k}$ وتبلغ الدالة قيمتها الحدية العظمى $f(${k}) = ${a}e^{-${k}} + ${c}$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			id: `ex_${seed}`,
			num: 'التمرين 1',
			points: 4,
			instruction: 'الدالة الأسية وتطبيقها في دراسة تشبّع السوق:',
			content: [
				{
					type: 'text',
					content: `1) حل في $bb(R)$ المعادلة: $${eqTypst}$، ثم استنتج حلول المتراجحة $e^(2x) - ${midCoeff === 0 ? '' : midCoeff > 0 ? `${midCoeff} e^x` : `(-${Math.abs(midCoeff)}) e^x`} - ${constTerm} <= 0$.`.replace(
						'e^(2x) - (-',
						'e^(2x) + ('
					)
				},
				{
					type: 'text',
					content: `2) ننمذج وتيرة الطلب الشهري لمنتج صناعي (بآلاف الوحدات) بعد $x$ شهرا من إطلاقه على $[0 ; +oo[$ بالدالة: $f(x) = ${fTypst}$.`
				},
				{
					type: 'text',
					content: `أ) احسب $f(0)$ و$lim_(x arrow.r +oo) f(x)$، ثم فسّر النتيجة بيانيا واقتصاديا.`
				},
				{
					type: 'text',
					content: `ب) بيّن أنّه من أجل كل $x in [0 ; +oo[$: $f'(x) = ${a}(${k} - x) e^(-x)$، ثم شكل جدول تغيرات $f$ وحدّد الشهر $x_0$ الذي يبلغ فيه الطلب ذروته.`
				},
				{
					type: 'text',
					content: `ج) عيّن معادلة المماس $(T)$ للمنحنى $(cal(C)_f)$ عند الفاصلة $x = 0$.`
				},
				{
					type: 'image',
					src: curveUrl,
					caption: `التمثيل البياني للدالة f والمقارب الأفقي y = ${c}`
				}
			]
		};

		// Make step 1 Typst string completely clean regardless of midCoeff sign
		sujetExercise.content[0] = {
			type: 'text',
			content: `1) حل في $bb(R)$ المعادلة: $${eqTypst}$، ثم استنتج في $bb(R)$ مجموعة حلول المتراجحة $${eqTypst.replace('= 0', '<= 0')}$.`
		};

		return {
			templateId: this.id,
			seed,
			grade: this.grade,
			trimesterId: this.trimesterId,
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`ضع $X = e^x$ مع تذكّر الشرط الأساسي $X > 0$، فالجذور السالبة للمعادلة الوسيطية تُرفض مباشرة.`,
				`استخدم مشتق جداء $(u \\cdot v)' = u'v + u v'$ مع تذكر أن $(e^{-x})' = -e^{-x}$.`,
				`لحساب $\\lim_{x \\to +\\infty} f(x)$ استعمل النهاية الشهيرة $\\lim_{x \\to +\\infty} x e^{-x} = 0$.`
			],
			solutionStepsAr: [
				`بوضع $X = e^x > 0$ نجد $(X - ${r})(X + ${m}) = 0$. بما أن $-${m} < 0$ مرفوض فإن $e^x = ${r} \\iff x = \\ln ${r}$. وللمتراجحة $\\mathcal{S} = ]-\\infty ; \\ln ${r}]$.`,
				`$f(0) = ${f0}$ ألف وحدة، و$\\lim_{x \\to +\\infty} f(x) = ${c}$ (لأن $\\lim_{x \\to +\\infty} x e^{-x} = 0$)؛ أي $(C_f)$ يقبل مستقيما مقاربا أفقيا $y = ${c}$ وهو مستوى تشبّع السوق ($${c}$ ألف وحدة).`,
				`$f'(x) = ${a}e^{-x} - ${fFactorK}e^{-x} = ${a}(${k} - x)e^{-x}$. ينعدم عند $x = ${k}$: الدالة متزايدة على $[0 ; ${k}]$ ومتناقصة على $[${k} ; +\\infty[$, والذروة هي $f(${k}) = ${a}e^{-${k}} + ${c} \\approx ${fPeak}$.`,
				`المماس عند $x = 0$: $f'(0) = ${fp0}$ و$f(0) = ${f0}$، ومنه $(T): y = ${linearKatex(fp0, f0, 'x')}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Logarithmic Equations + Oblique Asymptote f(x) = a x + b + d ln((x+p)/x)
// ═══════════════════════════════════════════════════════════════════════════════

const tplLnDomainAsymptote: ParameterizedTemplate = {
	id: 'tpl_3as_ge_t2_ln_domain_asymptote',
	grade: '3as_ge',
	trimesterId: 't2',
	domain: 'analysis',
	titleAr: 'الدالة اللوغاريتمية النيبيرية: مجموعة التعريف والمقارب المائل',
	curriculumLessonId: 'lesson_3as_ge_t2_logarithmic_functions',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Part 1: ln(x + m) + ln(x - m) = ln(s) with s = r0^2 - m^2 (m >= 1, r0 > m)
		// Domain D = ]m ; +oo[ => unique root x = r0 (reject -r0)
		const m = rng.int(1, 3);
		const r0 = m + rng.int(2, difficulty === 'easy' ? 3 : 5);
		const s = r0 * r0 - m * m;

		// Part 2: f(x) = a x + b + d ln((x + p)/x) on ]0 ; +oo[ where d = a * r * (r + p) / p in N*
		interface LnCfg {
			a: number;
			b: number;
			p: number;
			r: number;
			d: number;
		}
		const pool: LnCfg[] =
			difficulty === 'easy'
				? [
						{ a: 1, b: 1, p: 1, r: 1, d: 2 },
						{ a: 1, b: 2, p: 2, r: 2, d: 4 },
						{ a: 2, b: 0, p: 1, r: 1, d: 4 }
					]
				: difficulty === 'medium'
					? [
							{ a: 1, b: -1, p: 1, r: 2, d: 6 },
							{ a: 2, b: 1, p: 2, r: 1, d: 3 },
							{ a: 1, b: 3, p: 1, r: 1, d: 2 }
						]
					: [
							{ a: 2, b: -2, p: 2, r: 2, d: 8 },
							{ a: 2, b: -1, p: 1, r: 1, d: 4 },
							{ a: 1, b: -2, p: 1, r: 2, d: 6 }
						];
		const cfg = rng.pick(pool);
		const { a, b, p, r, d } = cfg;

		const fFn = (x: number) => a * x + b + d * Math.log((x + p) / x);
		const fpFn = (x: number) => (a * x * x + a * p * x - d * p) / (x * (x + p));
		assertCentralDiff(fFn, fpFn, [0.5, r, r + 1.5], 'lnObliqueAsymp');

		const fMinVal = roundTo(fFn(r), 2);
		const asympK = linearKatex(a, b, 'x');
		const asympT = linearTypst(a, b, 'x');
		const fKatex = `${asympK} + ${d}\\ln\\left(\\frac{x + ${p}}{x}\\right)`;
		const fTypst = `${asympT} + ${d} ln(frac(x + ${p}, x))`;

		const numDerivK = poly2Katex(a, a * p, -d * p, 'x');
		const numDerivT = poly2Typst(a, a * p, -d * p, 'x');
		const factDerivK = `${a === 1 ? '' : `${a}`}(x - ${r})(x + ${r + p})`;
		const factDerivT = `${a === 1 ? '' : `${a} `}(x - ${r})(x + ${r + p})`;

		const curveSvg = svgFunctionCurvePlot({
			xMin: -0.4,
			xMax: 5.5,
			yMin: Math.floor(Math.min(-1, fMinVal - 2)),
			yMax: Math.ceil(Math.max(fFn(0.4) + 1, a * 5 + b + 3)),
			fn: (x) => (x > 0.15 ? fFn(x) : NaN),
			curveLabel: 'C_f',
			asymptotes: [
				{ kind: 'vertical', value: 0, label: 'x=0', color: '#dc2626' },
				{ kind: 'oblique', a, b, label: `y=${asympK.replace(/\s+/g, '')}`, color: '#059669' }
			],
			points: [{ x: r, y: fMinVal, label: `S(${r};${fMinVal})`, color: '#7c3aed' }]
		});
		const curveUrl = saveSvgAsset(`3as_ge_t2_ln_asymp_${difficulty}_s${seed}`, curveSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${r0}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `أوجد الحل الوحيد الصحيح في مجموعة التعريف $D = ]${m} ; +\\infty[$ للمعادلة اللوغاريتمية $\\ln(x + ${m}) + \\ln(x - ${m}) = \\ln(${s})$:`,
				questionTextAr: `أوجد قيمة الحل $x$ للمعادلة اللوغاريتمية:`,
				questionData: {
					answer: r0,
					displayTemplate: 'x = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `شرط التعريف $x > ${m}$. تصبح المعادلة $\\ln(x^2 - ${m * m}) = \\ln(${s}) \\iff x^2 = ${r0 * r0}$. بما أن $-${r0} \\notin D$ فإن الحل الوحيد هو $x = ${r0}$.`
			};
		} else if (difficulty === 'medium') {
			const mcq = buildUniqueMcqOptions(
				`المستقيم $(\\Delta): y = ${asympK}$ مقارب مائل، و$(C_f)$ يقع فوق $(\\Delta)$ على $]0 ; +\\infty[$`,
				[
					{
						text: `المستقيم $(\\Delta): y = ${asympK}$ مقارب مائل، و$(C_f)$ يقع تحت $(\\Delta)$ على $]0 ; +\\infty[$`,
						diagnosticFeedback: `بما أن $x > 0$ فإن $\\frac{x + ${p}}{x} = 1 + \\frac{${p}}{x} > 1$، وبالتالي $\\ln\\left(\\frac{x + ${p}}{x}\\right) > 0$، والفرق $f(x) - (${asympK}) > 0$.`
					},
					{
						text: `المستقيم $y = ${asympK} + ${d}$ مقارب مائل لأن $\\ln(x)$ يؤول إلى $1$`,
						diagnosticFeedback: `عند $+\\infty$ تؤول النسبة $\\frac{x + ${p}}{x}$ إلى $1$ ومنه $\\ln(1) = 0$ وليس $1$.`
					},
					{
						text: `$(C_f)$ يقطع $(\\Delta)$ عند $x = ${p}$`,
						diagnosticFeedback: `تنعدم دالة الفرق فقط إذا كان $\\frac{x + ${p}}{x} = 1$ وهذا مستحيل لأن $${p} \\ne 0$.`
					}
				],
				rng
			);
			finalAnswer = `y = ${asympK}`;
			quizQuestion = {
				type: 'mcq',
				questionText: `نعتبر الدالة $f(x) = ${fKatex}$ على $]0 ; +\\infty[$. ما هو المستقيم المقارب المائل للمنحنى $(C_f)$ بجوار $+\\infty$ وما وضعيته؟`,
				questionTextAr: `عيّن المقارب المائل ووضعية $(C_f)$ بالنسبة له:`,
				imageUrl: curveUrl,
				imageCaption: 'المنحنى (C_f) ومستقيماه المقاربان العمودي والمائل',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `$\\lim_{x \\to +\\infty} [f(x) - (${asympK})] = ${d}\\ln(1) = 0$. وكون $\\frac{x + ${p}}{x} > 1$ لكل $x > 0$ يعطي فرقا موجبا، أي $(C_f)$ فوق $(\\Delta)$.`
			};
		} else {
			finalAnswer = `x = ${r}`;
			const mcq = buildUniqueMcqOptions(
				`$f$ متناقصة على $]0 ; ${r}]$ ومتزايدة على $[${r} ; +\\infty[$، وقيمتها الصغرى عند $x = ${r}$`,
				[
					{
						text: `$f$ متزايدة تماما على $]0 ; +\\infty[$ ولا تقبل قيمة حدية`,
						diagnosticFeedback: `مشتق $\\ln\\left(\\frac{x + ${p}}{x}\\right)$ سالب لأن $\\frac{1}{x+${p}} - \\frac{1}{x} < 0$، وقد يتغلب على $${a}$ من أجل $x < ${r}$.`
					},
					{
						text: `$f$ متناقصة على $]0 ; ${r + p}]$ ومتزايدة على $[${r + p} ; +\\infty[$`,
						diagnosticFeedback: `تحقق من جذري البسط $${numDerivK}$: الجذر الموجب في $]0 ; +\\infty[$ هو $x = ${r}$ بينما $-${r + p} < 0$.`
					},
					{
						text: `$f$ متزايدة على $]0 ; ${r}]$ ومتناقصة على $[${r} ; +\\infty[$`,
						diagnosticFeedback: `اشارة كثير الحدود من الدرجة الثانية $${numDerivK}$ سالبة بين الجذرين وموجبة خارجهما ($x > ${r}$).`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `بملاحظة أن $f'(x) = \\frac{${numDerivK}}{x(x + ${p})} = \\frac{${factDerivK}}{x(x + ${p})}$ على $]0 ; +\\infty[$، ما هو اتجاه تغير $f$؟`,
				questionTextAr: `استنتج اتجاه تغير الدالة $f$ على $]0 ; +\\infty[$:`,
				imageUrl: curveUrl,
				imageCaption: 'جدول وتيرة تغيّر الدالة f وقيمتها الصغرى',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `على $]0 ; +\\infty[$ المقام $x(x + ${p}) > 0$ والعامل $(x + ${r + p}) > 0$، فإشارة $f'(x)$ من إشارة $(x - ${r})$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			id: `ex_${seed}`,
			num: 'التمرين 2',
			points: 4,
			instruction: 'الدالة اللوغاريتمية النيبيرية وتحديد المقارب المائل:',
			content: [
				{
					type: 'text',
					content: `1) حل في $bb(R)$ (مع تعيين مجموعة التعريف $D$ أولا) المعادلة: $ln(x + ${m}) + ln(x - ${m}) = ln(${s})$.`
				},
				{
					type: 'text',
					content: `2) نعتبر الدالة $f$ المعرفة على $]0 ; +oo[$ بـ: $f(x) = ${fTypst}$.`
				},
				{
					type: 'text',
					content: `أ) احسب $lim_(x arrow.r 0^+) f(x)$ و$lim_(x arrow.r +oo) f(x)$، ثم فسّر النتيجة الأولى بيانيا.`
				},
				{
					type: 'text',
					content: `ب) بيّن أن المستقيم $(Delta): y = ${asympT}$ مقارب مائل للمنحنى $(cal(C)_f)$ بجوار $+oo$، ثم ادرس وضعية $(cal(C)_f)$ بالنسبة إلى $(Delta)$.`
				},
				{
					type: 'text',
					content: `ج) احسب $f'(x)$ ثم تحقق أن $f'(x) = frac(${factDerivT}, x(x + ${p}))$، واستنتج اتجاه تغير $f$ وشكل جدول تغيراتها.`
				},
				{
					type: 'image',
					src: curveUrl,
					caption: `المنحنى $(C_f)$ والمقارب المائل $y = ${asympT}$`
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: this.grade,
			trimesterId: this.trimesterId,
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`مجموعة تعريف $\\ln(u(x))$ تفرض دوما $u(x) > 0$ في كلا الحدين قبل تطبيق خاصية $\\ln A + \\ln B = \\ln(AB)$.`,
				`استعمل خاصية $\\ln\\left(\\frac{x + ${p}}{x}\\right) = \\ln(x + ${p}) - \\ln x$ لتبسيط الاشتقاق.`,
				`لمعرفة الوضعية بالنسبة للمقارب $(\\Delta)$ قارن $\\frac{x + ${p}}{x}$ مع $1$ عندما $x > 0$.`
			],
			solutionStepsAr: [
				`الشرط: $x + ${m} > 0$ و$x - ${m} > 0 \\implies D = ]${m} ; +\\infty[$. نحل $x^2 - ${m * m} = ${s} \\iff x^2 = ${r0 * r0}$، فنقبل $x = ${r0}$ ونرفض $-${r0}$.`,
				`$\\lim_{x \\to 0^+} \\frac{x + ${p}}{x} = +\\infty \\implies \\lim_{x \\to 0^+} f(x) = +\\infty$، فمحور التراتيب $x = 0$ مقارب عمودي. و$\\lim_{x \\to +\\infty} f(x) = +\\infty$.`,
				`$\\lim_{x \\to +\\infty}[f(x) - (${asympK})] = \\lim_{x \\to +\\infty} ${d}\\ln\\left(1 + \\frac{${p}}{x}\\right) = 0$. بما أن $1 + \\frac{${p}}{x} > 1$ لكل $x > 0$ فالفرق موجب دوما و$(C_f)$ فوق $(\\Delta)$.`,
				`$f'(x) = ${a} + ${d}\\left(\\frac{1}{x + ${p}} - \\frac{1}{x}\\right) = \\frac{${numDerivK}}{x(x + ${p})} = \\frac{${factDerivK}}{x(x + ${p})}$. الدالة متناقصة على $]0 ; ${r}]$ ومتزايدة على $[${r} ; +\\infty[$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Primitives & Recovering Total Cost C_T(x) from Marginal Cost C_m(x)
// ═══════════════════════════════════════════════════════════════════════════════

const tplPrimitivesMarginalToTotal: ParameterizedTemplate = {
	id: 'tpl_3as_ge_t2_primitives_marginal_to_total',
	grade: '3as_ge',
	trimesterId: 't2',
	domain: 'analysis',
	titleAr: 'الدوال الأصلية وتحديد الكلفة الكلية انطلاقا من الكلفة الحدية',
	curriculumLessonId: 'lesson_3as_ge_t2_primitives_antiderivatives',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Part 1: Pure primitive G(x) of g(x) = p(2x + q) / (x^2 + q x + 1) on R with G(0) = y0
		// Notice x^2 +- x + 1 > 0 everywhere on R (Delta = -3 < 0) and at x=0 its value is 1 => ln(1) = 0!
		const p = rng.int(2, 5);
		const qSign = rng.pick([1, -1]);
		const y0 = rng.int(1, 8);
		const innerK = qSign === 1 ? 'x^2 + x + 1' : 'x^2 - x + 1';
		const innerT = qSign === 1 ? 'x^2 + x + 1' : 'x^2 - x + 1';
		const derivK = qSign === 1 ? '2x + 1' : '2x - 1';
		const derivT = qSign === 1 ? '2 x + 1' : '2 x - 1';

		// Part 2 (Halal Factory Cost):
		// C_m(x) = 2 a x + b - k e^(-x) (in thousand DZD/unit) with b > k so C_m(x) > 0 for all x >= 0!
		// C_T(x) = a x^2 + b x + k e^(-x) + C, fixed cost C_T(0) = C0 => C = C0 - k
		const a = rng.int(1, 3);
		const k = rng.int(2, difficulty === 'easy' ? 4 : 7);
		const b = k + rng.int(2, 5);
		const C0 = k + rng.int(4, 15);
		const constC = C0 - k;

		const cmFn = (x: number) => 2 * a * x + b - k * Math.exp(-x);
		const ctFn = (x: number) => a * x * x + b * x + k * Math.exp(-x) + constC;
		assertCentralDiff(ctFn, cmFn, [0, 1.2, 3.5], 'totalCostFromMarginal');

		const gFn = (x: number) => (p * (2 * x + qSign)) / (x * x + qSign * x + 1);
		const GFn = (x: number) => p * Math.log(x * x + qSign * x + 1) + y0;
		assertCentralDiff(GFn, gFn, [-1, 0, 1.5], 'primitiveLogRational');

		const cmK = `${poly2Katex(0, 2 * a, b, 'x')} - ${k}e^{-x}`;
		const cmT = `${poly2Typst(0, 2 * a, b, 'x')} - ${k} e^(-x)`;
		const ctK = `${poly2Katex(a, b, constC, 'x')} + ${k}e^{-x}`;
		const ctT = `${poly2Typst(a, b, constC, 'x')} + ${k} e^(-x)`;

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${constC}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `تُعطى الكلفة الحدية لمصنع بآلاف الدنانير بـ $C_m(x) = ${cmK}$، حيث $x \\in [0 ; 10]$ (بآلاف الوحدات). نكتب الكلفة الكلية على الشكل $C_T(x) = ${a === 1 ? 'x^2' : `${a}x^2`} + ${b}x + ${k}e^{-x} + C$. إذا علمت أن التكاليف الثابتة $C_T(0) = ${C0}$، فأوجد قيمة الثابت $C$:`,
				questionTextAr: `احسب قيمة الثابت $C$ من الشرط $C_T(0) = ${C0}$:`,
				questionData: {
					answer: constC,
					displayTemplate: 'C = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `نعوّض $x = 0$: $C_T(0) = ${k}e^0 + C = ${k} + C = ${C0}$، ومنه $C = ${C0} - ${k} = ${constC}$.`
			};
		} else if (difficulty === 'medium') {
			const correctG = `$G(x) = ${p}\\ln(${innerK}) + ${y0}$`;
			const mcq = buildUniqueMcqOptions(
				correctG,
				[
					{
						text: `$G(x) = ${p}\\ln(${innerK}) + ${y0 - p}$`,
						diagnosticFeedback: `عند $x = 0$ قيمة $(${innerK})$ تساوي $1$ و$\\ln(1) = 0$ وليس $1$، ومنه $C = ${y0}$.`
					},
					{
						text: `$G(x) = ${p * 2}\\ln(${innerK}) + ${y0}$`,
						diagnosticFeedback: `البسط هو $${p}(${derivK})$ وليس $2\\times ${p}(${derivK})$؛ تذكّر أن دالة أصلية لـ $\\frac{u'}{u}$ هي $\\ln(u)$ وليس $2\\ln(u)$.`
					},
					{
						text: `$G(x) = \\frac{${p}}{2}\\ln(${innerK}) + ${y0}$`,
						diagnosticFeedback: `لأن $u'(x) = ${derivK}$ موجود مباشرة في البسط، نضرب في المعامل $${p}$ فقط دون قسمة على $2$.`
					}
				],
				rng
			);
			finalAnswer = `G(x) = ${p}\\ln(${innerK}) + ${y0}`;
			quizQuestion = {
				type: 'mcq',
				questionText: `ما هي الدالة الأصلية $G$ للدالة $g(x) = \\frac{${p}(${derivK})}{${innerK}}$ على $\\mathbb{R}$ والتي تحقق $G(0) = ${y0}$؟`,
				questionTextAr: `عيّن الدالة الأصلية $G$ التي تحقق $G(0) = ${y0}$:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نلاحظ $x^2 ${qSign === 1 ? '+ x' : '- x'} + 1 > 0$ دوما على $\\mathbb{R}$ ($\\Delta = -3 < 0$) و$g(x) = ${p}\\frac{u'(x)}{u(x)}$. إذن $G(x) = ${p}\\ln(${innerK}) + C$ مع $G(0) = C = ${y0}$.`
			};
		} else {
			finalAnswer = `C_T(x) = ${ctK}`;
			const mcq = buildUniqueMcqOptions(
				`$C_T(x) = ${ctK}$`,
				[
					{
						text: `$C_T(x) = ${poly2Katex(a, b, constC, 'x')} - ${k}e^{-x}$`,
						diagnosticFeedback: `مشتق $+${k}e^{-x}$ هو $-${k}e^{-x}$ الموافق لـ $C_m(x)$، وليس $-${k}e^{-x}$ التي مشتقها $+${k}e^{-x}$.`
					},
					{
						text: `$C_T(x) = ${poly2Katex(a, b, C0, 'x')} + ${k}e^{-x}$`,
						diagnosticFeedback: `عند $x = 0$ قيمة $e^0 = 1$ وليست $0$! يجب طرح $${k}$ من $${C0}$ لتبقى $C_T(0) = ${C0}$.`
					},
					{
						text: `$C_T(x) = ${poly2Katex(2 * a, b, constC, 'x')} + ${k}e^{-x}$`,
						diagnosticFeedback: `دالة أصلية لـ $${2 * a}x$ هي $${a === 1 ? 'x^2' : `${a}x^2`}$ وليس $${2 * a}x^2$.`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `تنتج مؤسسة صناعية سلعة بكلفة حدية $C_m(x) = ${cmK}$ وبكلفة ثابتة $C_T(0) = ${C0}$ (بآلاف الدنانير). ما هي عبارة الكلفة الكلية $C_T(x)$؟`,
				questionTextAr: `عيّن عبارة الكلفة الكلية $C_T(x)$:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `$C_T(x)$ دالة أصلية لـ $C_m(x)$: $C_T(x) = ${a === 1 ? 'x^2' : `${a}x^2`} + ${b}x + ${k}e^{-x} + C$. وبما أن $C_T(0) = ${k} + C = ${C0}$ نجد $C = ${constC}$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			id: `ex_${seed}`,
			num: 'التمرين 3',
			points: 4,
			instruction: 'الدوال الأصلية وتطبيقاتها في حساب الكلفة الكلية:',
			content: [
				{
					type: 'text',
					content: `1) نعتبر الدالة $g$ المعرفة على $bb(R)$ بـ: $g(x) = frac(${p}(${derivT}), ${innerT})$.`
				},
				{
					type: 'text',
					content: `أ) تحقق أن $u(x) = ${innerT} > 0$ من أجل كل $x in bb(R)$، ثم عيّن الدالة الأصلية $G$ للدالة $g$ على $bb(R)$ التي تحقق $G(0) = ${y0}$.`
				},
				{
					type: 'text',
					content: `2) تقدر الكلفة الحدية لإنتاج $x$ ألف وحدة في مؤسسة صناعية ($x in [0 ; 10]$) بآلاف الدنانير بالدالة: $C_m (x) = ${cmT}$.`
				},
				{
					type: 'text',
					content: `أ) علما أن الكلفة الثابتة $C_T (0) = ${C0}$ ألف دينار، أوجد عبارة الكلفة الكلية $C_T (x)$ بدلالة $x$.`
				},
				{
					type: 'text',
					content: `ب) اكتب عبارة الكلفة المتوسطة $C_M (x) = frac(C_T (x), x)$ على $]0 ; 10]$ واحسب $C_M (2)$ بالتقريب إلى $0.01$.`
				}
			]
		};

		const cm2 = roundTo(ctFn(2) / 2, 2);

		return {
			templateId: this.id,
			seed,
			grade: this.grade,
			trimesterId: this.trimesterId,
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`دالة أصلية لـ $\\frac{u'}{u}$ عند $u(x) > 0$ هي $\\ln(u(x)) + C$.`,
				`تذكّر أن $C_T'(x) = C_m(x)$ وأن دالة أصلية لـ $e^{-x}$ هي $-e^{-x}$ وليس $+e^{-x}$.`,
				`عند التعويض بـ $x = 0$ لإيجاد ثابت التكامل $C$، انتبه إلى أن $e^0 = 1$ وليس $0$.`
			],
			solutionStepsAr: [
				`مميز $u(x) = ${innerK}$ هو $\\Delta = 1 - 4 = -3 < 0$ ومعامل $x^2$ موجب، إذن $u(x) > 0$ على $\\mathbb{R}$. لدينا $g(x) = ${p}\\frac{u'(x)}{u(x)}$، ومنه $G(x) = ${p}\\ln(${innerK}) + C$. وبما أن $G(0) = ${p}\\ln(1) + C = ${y0}$ نجد $G(x) = ${p}\\ln(${innerK}) + ${y0}$.`,
				`$C_T(x)$ دالة أصلية لـ $C_m(x) = ${cmK}$ على $[0 ; 10]$، أي $C_T(x) = ${a === 1 ? 'x^2' : `${a}x^2`} + ${b}x + ${k}e^{-x} + C$.`,
				`من الشرط $C_T(0) = ${k}e^0 + C = ${C0}$ نستنتج $C = ${C0} - ${k} = ${constC}$، وعليه $C_T(x) = ${ctK}$.`,
				`الكلفة المتوسطة: $C_M(x) = ${linearKatex(a, b, 'x')} + \\frac{${constC} + ${k}e^{-x}}{x}$، ومنه $C_M(2) \\approx ${cm2}$ ألف دينار للوحدة.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Definite Integrals, |h(x)| Chasles & Mean Value m = 1/(b-a) ∫ f(x)dx
// ═══════════════════════════════════════════════════════════════════════════════

const tplDefiniteIntegralMeanValue: ParameterizedTemplate = {
	id: 'tpl_3as_ge_t2_definite_integral_mean_value',
	grade: '3as_ge',
	trimesterId: 't2',
	domain: 'analysis',
	titleAr: 'التكامل المحدود، علاقة شال والقيمة المتوسطة لدالة اقتصادية',
	curriculumLessonId: 'lesson_3as_ge_t2_definite_integral_area_mean',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Part 1: Mean value of f(x) = 3a x^2 + 2b x + c on [0 ; L]:
		// int_0^L f(x) dx = a L^3 + b L^2 + c L => exact integer mean value m = a L^2 + b L + c!
		const a = rng.int(1, 2);
		const b = rng.int(1, 4);
		const c = rng.int(2, 6);
		const L = rng.pick(difficulty === 'easy' ? [2, 3] : [2, 3, 4]);
		const totalInt = a * L * L * L + b * L * L + c * L;
		const meanVal = a * L * L + b * L + c;

		// Part 2: int_0^(2r) k|x - r| dx = k r^2 (Chasles sign splitting!)
		const k = rng.int(2, 4);
		const r = rng.int(1, 3);
		const absIntVal = k * r * r;

		// Part 3: Exponential rate g(x) = 2*s*e^x + q on [0 ; 2] => mean = s(e^2 - 1) + q
		const s = rng.int(1, 4);
		const q = rng.int(2, 7);

		const fFn = (x: number) => 3 * a * x * x + 2 * b * x + c;
		const numInt = simpsonIntegral(fFn, 0, L);
		if (Math.abs(numInt - totalInt) > 1e-6) {
			throw new Error(`Simpson integral check failed: ${numInt} vs ${totalInt}`);
		}

		const fKatex = poly2Katex(3 * a, 2 * b, c, 'x');
		const fTypst = poly2Typst(3 * a, 2 * b, c, 'x');

		const curveSvg = svgFunctionCurvePlot({
			xMin: -0.3,
			xMax: L + 0.8,
			yMin: 0,
			yMax: Math.ceil(fFn(L) + 4),
			fn: (x) => (x >= 0 ? fFn(x) : NaN),
			curveLabel: 'C_f',
			shadedIntegral: { a: 0, b: L, color: 'rgba(16,185,129,0.22)' },
			points: [
				{ x: 0, y: c, label: `(0;${c})`, color: '#1d4ed8' },
				{ x: L, y: fFn(L), label: `(${L};${fFn(L)})`, color: '#1d4ed8' }
			]
		});
		const curveUrl = saveSvgAsset(`3as_ge_t2_mean_int_${difficulty}_s${seed}`, curveSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${meanVal}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `تُمثل $f(x) = ${fKatex}$ وتيرة الإنتاج اليومي في ورشة خلال $[0 ; ${L}]$ أسابيع. احسب القيمة المتوسطة $m = \\frac{1}{${L} - 0}\\int_0^{${L}} f(x)\\,dx$:`,
				questionTextAr: `احسب القيمة المتوسطة $m$ للدالة $f$ على $[0 ; ${L}]$:`,
				imageUrl: curveUrl,
				imageCaption: `المساحة المظللة تمثل التكامل المحدود على [0 ; ${L}]`,
				questionData: {
					answer: meanVal,
					displayTemplate: 'm = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `$\\int_0^{${L}} f(x)\\,dx = \\left[${a === 1 ? 'x^3' : `${a}x^3`} + ${b === 1 ? 'x^2' : `${b}x^2`} + ${c}x\\right]_0^{${L}} = ${totalInt}$، ومنه $m = \\frac{${totalInt}}{${L}} = ${meanVal}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${absIntVal}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `احسب التكامل التالي باستعمال علاقة شال وإزالة القيمة المطلقة: $J = \\int_0^{${2 * r}} ${k}|x - ${r}|\\,dx$`,
				questionTextAr: `احسب قيمة التكامل $J$:`,
				questionData: {
					answer: absIntVal,
					displayTemplate: 'J = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `نُجزّئ المجال عند $x = ${r}$: $J = \\int_0^{${r}} ${k}(${r} - x)\\,dx + \\int_{${r}}^{${2 * r}} ${k}(x - ${r})\\,dx = ${fracKatex(absIntVal, 2)} + ${fracKatex(absIntVal, 2)} = ${absIntVal}$.`
			};
		} else {
			const meanExp = `${s === 1 ? '' : `${s}`}(e^2 - 1) + ${q}`;
			finalAnswer = `m = ${meanExp}`;
			const mcq = buildUniqueMcqOptions(
				`$m = ${meanExp}$`,
				[
					{
						text: `$m = ${2 * s}(e^2 - 1) + ${2 * q}$`,
						diagnosticFeedback: `هذا ناتج التكامل المحدود $I = \\int_0^2 g(x)\\,dx$ قبل قسمته على طول المجال $2 - 0 = 2$!`
					},
					{
						text: `$m = ${s === 1 ? '' : `${s}`}e^2 + ${q}$`,
						diagnosticFeedback: `لا تنس أن $e^0 = 1$ (وليس $0$) عند حساب الفرق $F(2) - F(0)$!`
					},
					{
						text: `$m = ${s === 1 ? '' : `${s}`}(e^2 - 1) + ${2 * q}$`,
						diagnosticFeedback: `معامل $\\frac{1}{2}$ يُضرب في كامل التكامل بما في ذلك الحد الثابت $\\int_0^2 ${q}\\,dx = ${2 * q}$.`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `نعتبر دالة الإيراد الحدي $g(x) = ${2 * s}e^x + ${q}$ على $[0 ; 2]$. ما هي القيمة المتوسطة $m$ للدالة $g$ على $[0 ; 2]$؟`,
				questionTextAr: `عيّن القيمة المتوسطة للدالة $g$ على $[0 ; 2]$:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `$\\int_0^2 (${2 * s}e^x + ${q})\\,dx = \\left[${2 * s}e^x + ${q}x\\right]_0^2 = ${2 * s}(e^2 - 1) + ${2 * q}$. بالقسمة على $2 - 0 = 2$ نجد $m = ${meanExp}$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			id: `ex_${seed}`,
			num: 'التمرين 4',
			points: 4,
			instruction: 'حساب التكامل المحدود وعلاقة شال والقيمة المتوسطة:',
			content: [
				{
					type: 'text',
					content: `1) تُمثّل الدالة $f(x) = ${fTypst}$ وتيرة الإنتاج الأسبوعي لمؤسسة خلال $[0 ; ${L}]$ أسابيع.`
				},
				{
					type: 'text',
					content: `أ) احسب التكامل $I = integral_0^(${L}) (${fTypst}) dx$ ثم استنتج القيمة المتوسطة $m$ للإنتاج على $[0 ; ${L}]$.`
				},
				{
					type: 'text',
					content: `2) احسب باستعمال علاقة شال التكامل: $J = integral_0^(${2 * r}) ${k} |x - ${r}| dx$.`
				},
				{
					type: 'text',
					content: `3) نعتبر دالة الإيراد الحدي $g(x) = ${2 * s} e^x + ${q}$ على $[0 ; 2]$. احسب القيمة المتوسطة للدالة $g$ على $[0 ; 2]$.`
				},
				{
					type: 'image',
					src: curveUrl,
					caption: `الحيز المظلل تحت منحنى $f$ على $[0 ; ${L}]$`
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: this.grade,
			trimesterId: this.trimesterId,
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`القيمة المتوسطة على $[a ; b]$ تُحسب بالدستور $m = \\frac{1}{b - a}\\int_a^b f(x)\\,dx$.`,
				`لإزالة القيمة المطلقة $|x - ${r}|$، استعمل علاقة شال بتقسيم المجال عند $x = ${r}$.`,
				`عند حساب $[e^x + \\dots]_0^2$ تذكّر دوما أن $e^0 = 1$.`
			],
			solutionStepsAr: [
				`$I = \\left[${a === 1 ? 'x^3' : `${a}x^3`} + ${b === 1 ? 'x^2' : `${b}x^2`} + ${c}x\\right]_0^{${L}} = ${totalInt}$، والقيمة المتوسطة $m = \\frac{${totalInt}}{${L}} = ${meanVal}$.`,
				`$J = \\int_0^{${r}} ${k}(${r} - x)\\,dx + \\int_{${r}}^{${2 * r}} ${k}(x - ${r})\\,dx = ${k}\\left[${r}x - \\frac{x^2}{2}\\right]_0^{${r}} + ${k}\\left[\\frac{x^2}{2} - ${r}x\\right]_{${r}}^{${2 * r}} = ${absIntVal}$.`,
				`$\\int_0^2 (${2 * s}e^x + ${q})\\,dx = ${2 * s}e^2 + ${2 * q} - ${2 * s}e^0 = ${2 * s}(e^2 - 1) + ${2 * q}$، وبالقسمة على $2$ يكون $m = ${s === 1 ? '' : `${s}`}(e^2 - 1) + ${q}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Area Between Curve & Oblique Asymptote + cm^2 Unit Conversion
// ═══════════════════════════════════════════════════════════════════════════════

const tplAreaBetweenCurvesCm2: ParameterizedTemplate = {
	id: 'tpl_3as_ge_t2_area_between_curves_cm2',
	grade: '3as_ge',
	trimesterId: 't2',
	domain: 'analysis',
	titleAr: 'حساب مساحة حيز محصور بين منحنى ومقارب مائل بالـ u.a والـ cm²',
	curriculumLessonId: 'lesson_3as_ge_t2_definite_integral_area_mean',
	defaultPoints: 5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// f(x) = a x + b + (2k ln x)/x on [1 ; +oo[ (actually ]0 ; +oo[ with a >= 1, k <= 4 => f'(x) > 0 everywhere!)
		// Oblique asymptote (Delta): y = a x + b
		// Area between (C_f) and (Delta) on [1 ; e] is int_1^e (2k ln x)/x dx = [k (ln x)^2]_1^e = k u.a.!
		// Frame units: ||i|| = ux cm, ||j|| = uy cm => 1 u.a. = (ux * uy) cm^2 => Area_cm2 = k * ux * uy!
		const a = rng.int(1, 2);
		const b = rng.int(1, 4);
		const k = rng.int(2, difficulty === 'easy' ? 4 : 6);
		const ux = rng.pick([1, 2]);
		const uy = rng.pick([2, 3]);
		const areaUa = k;
		const areaCm2 = k * ux * uy;

		const fFn = (x: number) => a * x + b + (2 * k * Math.log(x)) / x;
		const fpFn = (x: number) => a + (2 * k * (1 - Math.log(x))) / (x * x);
		const diffFn = (x: number) => (2 * k * Math.log(x)) / x;
		assertCentralDiff(fFn, fpFn, [0.8, 1.5, Math.E, 4.0], 'areaLogCurve');
		const numArea = simpsonIntegral(diffFn, 1, Math.E);
		if (Math.abs(numArea - areaUa) > 1e-6) {
			throw new Error(`Area integral mismatch: ${numArea} vs ${areaUa}`);
		}

		const asympK = linearKatex(a, b, 'x');
		const asympT = linearTypst(a, b, 'x');
		const fKatex = `${asympK} + \\frac{${2 * k}\\ln x}{x}`;
		const fTypst = `${asympT} + frac(${2 * k} ln(x), x)`;
		const primHK = `${k}(\\ln x)^2`;
		const primHT = `${k} (ln(x))^2`;

		const curveSvg = svgFunctionCurvePlot({
			xMin: -0.2,
			xMax: 4.5,
			yMin: 0,
			yMax: Math.ceil(fFn(4.2) + 2),
			fn: (x) => (x > 0.35 ? fFn(x) : NaN),
			curveLabel: 'C_f',
			asymptotes: [{ kind: 'oblique', a, b, label: 'Δ', color: '#059669' }],
			shadedIntegral: { a: 1, b: Math.E, color: 'rgba(245,158,11,0.28)' },
			points: [
				{ x: 1, y: a + b, label: `A(1;${a + b})`, color: '#dc2626' },
				{ x: Math.E, y: roundTo(fFn(Math.E), 2), label: 'B(e;f(e))', color: '#1d4ed8' }
			]
		});
		const curveUrl = saveSvgAsset(`3as_ge_t2_area_cm2_${difficulty}_s${seed}`, curveSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${areaUa}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `لتكن $f(x) = ${fKatex}$ على $]0 ; +\\infty[$ ومستقيمها المقارب المائل $(\\Delta): y = ${asympK}$. احسب مساحة الحيّز المحصور بين $(C_f)$ و$(\\Delta)$ والمستقيمين $x = 1$ و$x = e$ بوحدة المساحات $\\text{u.a}$:`,
				questionTextAr: `احسب المساحة بوحدة المساحات $\\text{u.a}$:`,
				imageUrl: curveUrl,
				imageCaption: 'الحيز المظلل بين المنحنى (C_f) والمقارب المائل على [1 ; e]',
				questionData: {
					answer: areaUa,
					displayTemplate: 'A = ? u.a',
					variables: [],
					tolerance: 0
				},
				explanation: `على $[1 ; e]$، $f(x) - (${asympK}) = \\frac{${2 * k}\\ln x}{x} \\ge 0$، ومنه $\\mathcal{A} = \\left[${primHK}\\right]_1^e = ${k}(1 - 0) = ${areaUa}\\text{ u.a}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${areaCm2}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `إذا كانت مساحة الحيّز المحصور بين $(C_f)$ و$(\\Delta)$ على $[1 ; e]$ هي $\\mathcal{A} = \\int_1^e \\frac{${2 * k}\\ln x}{x}\\,dx$ بوحدة المساحات، وكان المستوي مزوّدا بمعلم متعامد فيه $\\|\\vec{\\imath}\\| = ${ux}\\text{ cm}$ و$\\|\\vec{\\jmath}\\| = ${uy}\\text{ cm}$، فما هي المساحة بالـ $\\text{cm}^2$؟`,
				questionTextAr: `احسب المساحة النهائية بالـ $\\text{cm}^2$:`,
				imageUrl: curveUrl,
				imageCaption: 'تحويل وحدة المساحة من u.a إلى cm² في معلم متعامد',
				questionData: {
					answer: areaCm2,
					displayTemplate: 'A = ? cm^2',
					variables: [],
					tolerance: 0
				},
				explanation: `نجد $\\mathcal{A} = ${areaUa}\\text{ u.a}$. بما أن $1\\text{ u.a} = \\|\\vec{\\imath}\\| \\times \\|\\vec{\\jmath}\\| = ${ux} \\times ${uy} = ${ux * uy}\\text{ cm}^2$، فإن $\\mathcal{A} = ${areaUa} \\times ${ux * uy} = ${areaCm2}\\text{ cm}^2$.`
			};
		} else {
			finalAnswer = `${areaCm2}\\text{ cm}^2`;
			const mcq = buildUniqueMcqOptions(
				`$\\mathcal{A} = ${areaCm2}\\text{ cm}^2$`,
				[
					{
						text: `$\\mathcal{A} = ${areaUa}\\text{ cm}^2$`,
						diagnosticFeedback: `نسيت ضرب النتيجة بوحدة المساحات (${areaUa} u.a) في مساحة الوحدة $${ux} \\times ${uy} = ${ux * uy}\\text{ cm}^2$!`
					},
					{
						text: `$\\mathcal{A} = ${(ux + uy) * areaUa}\\text{ cm}^2$`,
						diagnosticFeedback: `مساحة المستطيل المرجعي هي الجداء $\\|\\vec{\\imath}\\| \\times \\|\\vec{\\jmath}\\| = ${ux * uy}\\text{ cm}^2$ وليس المجموع $${ux + uy}$!`
					},
					{
						text: `$\\mathcal{A} = ${2 * areaCm2}\\text{ cm}^2$`,
						diagnosticFeedback: `دالة أصلية لـ $\\frac{2\\ln x}{x}$ هي $(\\ln x)^2$ (مشتقها $\\frac{2\\ln x}{x}$)، وليس $2(\\ln x)^2$.`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `نعتبر $f(x) = ${fKatex}$ على $[1 ; +\\infty[$ ومستقيمها المقارب المائل $(\\Delta): y = ${asympK}$ في معلم متعامد حيث $\\|\\vec{\\imath}\\| = ${ux}\\text{ cm}$ و$\\|\\vec{\\jmath}\\| = ${uy}\\text{ cm}$. ما هي مساحة الحيّز المحصور بين $(C_f)$ و$(\\Delta)$ والمستقيمين $x = 1$ و$x = e$ بالـ $\\text{cm}^2$؟`,
				questionTextAr: `عيّن المساحة بالـ $\\text{cm}^2$:`,
				imageUrl: curveUrl,
				imageCaption: 'التمثيل البياني والحيز المطلوب حساب مساحته',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `على $[1 ; e]$، $(C_f)$ فوق $(\\Delta)$ لأن $\\ln x \\ge 0$. ومنه $\\mathcal{A} = \\left[${primHK}\\right]_1^e \\times (${ux} \\times ${uy}) = ${areaUa} \\times ${ux * uy} = ${areaCm2}\\text{ cm}^2$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			id: `ex_${seed}`,
			num: 'التمرين 5',
			points: 5,
			instruction: 'حساب مساحة حيز مستو بالـ u.a ثم بالـ cm²:',
			content: [
				{
					type: 'text',
					content: `نعتبر الدالة $f$ المعرفة على $]0 ; +oo[$ بـ: $f(x) = ${fTypst}$. نرمز بـ $(cal(C)_f)$ لتمثيلها البياني في معلم متعامد حيث $||arrow(i)|| = ${ux}$ cm و$||arrow(j)|| = ${uy}$ cm.`
				},
				{
					type: 'text',
					content: `1) بيّن أن المستقيم $(Delta): y = ${asympT}$ مقارب مائل للمنحنى $(cal(C)_f)$ بجوار $+oo$، ثم ادرس وضعية $(cal(C)_f)$ بالنسبة إلى $(Delta)$ على $[1 ; +oo[$.`
				},
				{
					type: 'text',
					content: `2) تحقق أن $H(x) = ${primHT}$ دالة أصلية للدالة $h(x) = f(x) - (${asympT})$ على $]0 ; +oo[$.`
				},
				{
					type: 'text',
					content: `3) احسب مساحة الحيّز المستوي المحدّد بالمنحنى $(cal(C)_f)$، المستقيم $(Delta)$ والمستقيمين اللذين معادلتاهما $x = 1$ و$x = e$ بوحدة المساحات u.a ثم بـ $"cm"^2$.`
				},
				{
					type: 'image',
					src: curveUrl,
					caption: `الحيز المستوي المحصور بين $(C_f)$ والمقارب المائل $Delta$ على $[1 ; e]$`
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: this.grade,
			trimesterId: this.trimesterId,
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`بجوار $+\\infty$، نعلم أن $\\lim_{x \\to +\\infty} \\frac{\\ln x}{x} = 0$.`,
				`للتحقق أن $H$ أصلية لـ $h$، نشتق $H(x) = ${k}(\\ln x)^2$ باستعمال قاعدة $(u^2)' = 2 u' u$.`,
				`تحويل المساحة من وحدة المساحات إلى السنتيمتر المربع يتم بالضرب في $\\|\\vec{\\imath}\\| \\times \\|\\vec{\\jmath}\\|$.`
			],
			solutionStepsAr: [
				`$\\lim_{x \\to +\\infty} [f(x) - (${asympK})] = ${2 * k}\\lim_{x \\to +\\infty}\\frac{\\ln x}{x} = 0$، فالمستقيم $(\\Delta)$ مقارب مائل. وعلى $[1 ; +\\infty[$ لدينا $\\ln x \\ge 0$ ومنه $(C_f)$ فوق $(\\Delta)$.`,
				`اشتقاق $H$: $H'(x) = ${k} \\times 2 \\times \\frac{1}{x} \\times \\ln x = \\frac{${2 * k}\\ln x}{x} = h(x)$.`,
				`المساحة: $\\mathcal{A} = \\int_1^e [f(x) - (${asympK})]\\,dx = H(e) - H(1) = ${k}(1)^2 - ${k}(0)^2 = ${areaUa}\\text{ u.a}$.`,
				`بـ $\\text{cm}^2$: وحدة المساحة $1\\text{ u.a} = ${ux} \\times ${uy} = ${ux * uy}\\text{ cm}^2$، ومنه $\\mathcal{A} = ${areaUa} \\times ${ux * uy} = ${areaCm2}\\text{ cm}^2$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Comprehensive BAC T2 Exponential + Auxiliary TVI + Integral & Mean Value (7 pts)
// ═══════════════════════════════════════════════════════════════════════════════

const tplBacExpIntegralIntegration: ParameterizedTemplate = {
	id: 'tpl_3as_ge_t2_bac_exp_integral_integration',
	grade: '3as_ge',
	trimesterId: 't2',
	domain: 'integration',
	isIntegration: true,
	titleAr: 'المسألة الشاملة: دالة مساعدة أسية + TVI + مقارب مائل + مساحة وقيمة متوسطة',
	curriculumLessonId: 'lesson_3as_ge_t2_definite_integral_area_mean',
	defaultPoints: 7,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Part A: g(x) = a e^x + 2s x - 4s on [0 ; +oo[, with a < 4s and a*e > 2s => g(0) < 0 and g(1) > 0 => unique alpha in ]0; 1[
		// Part B: f(x) = a x + b - 2s (x - 1) e^(-x) on [0 ; +oo[
		//   f'(x) = g(x) e^(-x) (exact!)
		//   (Delta): y = a x + b oblique asymptote, intersects (C_f) at A(1 ; a + b)
		// Part C: H(x) = -2s x e^(-x) has H'(x) = (2s x - 2s) e^(-x) = (a x + b) - f(x)
		//   Area between (Delta) and (C_f) on [1 ; k] (k in {2, 3}): A = 2s(e^(-1) - k e^(-k)) u.a.
		//   Primitive of f(x): F(x) = (a/2) x^2 + b x + 2s x e^(-x) => mean value on [1 ; k]
		interface BacT2Cfg {
			a: number;
			s: number;
			b: number;
			k: number;
		}
		const pool: BacT2Cfg[] =
			difficulty === 'easy'
				? [
						{ a: 1, s: 1, b: 3, k: 2 }, // g(x) = e^x + 2x - 4
						{ a: 2, s: 1, b: 3, k: 2 }, // g(x) = 2e^x + 2x - 4
						{ a: 3, s: 2, b: 4, k: 2 } // g(x) = 3e^x + 4x - 8
					]
				: difficulty === 'medium'
					? [
							{ a: 2, s: 2, b: 4, k: 3 }, // g(x) = 2e^x + 4x - 8
							{ a: 3, s: 2, b: 5, k: 2 }, // g(x) = 3e^x + 4x - 8
							{ a: 1, s: 1, b: 4, k: 3 } // g(x) = e^x + 2x - 4
						]
					: [
							{ a: 4, s: 3, b: 5, k: 3 }, // g(x) = 4e^x + 6x - 12
							{ a: 5, s: 3, b: 4, k: 3 }, // g(x) = 5e^x + 6x - 12
							{ a: 2, s: 2, b: 5, k: 3 } // g(x) = 2e^x + 4x - 8
						];
		const cfg = rng.pick(pool);
		const { a, s, b, k } = cfg;
		const ux = rng.pick([1, 2]);
		const uy = rng.pick([2, 3]);
		const scaleFactor = ux * uy;

		const gFn = (x: number) => a * Math.exp(x) + 2 * s * x - 4 * s;
		const gpFn = (x: number) => a * Math.exp(x) + 2 * s;
		const fFn = (x: number) => a * x + b - 2 * s * (x - 1) * Math.exp(-x);
		const fpFn = (x: number) => gFn(x) * Math.exp(-x);
		const HFn = (x: number) => -2 * s * x * Math.exp(-x);
		const hFn = (x: number) => a * x + b - fFn(x); // = (2s x - 2s) e^(-x)
		const FFn = (x: number) => 0.5 * a * x * x + b * x + 2 * s * x * Math.exp(-x);

		assertCentralDiff(gFn, gpFn, [0, 0.5, 1.5], 'bacT2.gPrime');
		assertCentralDiff(fFn, fpFn, [0, 0.5, 1.5, 2.5], 'bacT2.fPrime');
		assertCentralDiff(HFn, hFn, [0.5, 1, 2, 3], 'bacT2.HPrime');
		assertCentralDiff(FFn, fFn, [0.5, 1, 2, 3], 'bacT2.FPrime');

		const alpha = bisectRoot(gFn, 0, 1);
		const tenth = Math.floor(alpha * 10);
		const alphaLo = roundTo(tenth / 10, 1);
		const alphaHi = roundTo((tenth + 1) / 10, 1);

		const areaExact = HFn(k) - HFn(1); // = 2s(e^(-1) - k e^(-k))
		const areaNum = simpsonIntegral(hFn, 1, k);
		if (Math.abs(areaExact - areaNum) > 1e-6) {
			throw new Error(`BAC T2 area mismatch: ${areaExact} vs ${areaNum}`);
		}

		const meanExact = (FFn(k) - FFn(1)) / (k - 1);
		const meanNum = simpsonIntegral(fFn, 1, k) / (k - 1);
		if (Math.abs(meanExact - meanNum) > 1e-6) {
			throw new Error(`BAC T2 mean value mismatch: ${meanExact} vs ${meanNum}`);
		}

		const f0 = b + 2 * s;
		const fp0 = a - 4 * s;
		const fAlphaRounded = roundTo(fFn(alpha), 2);
		const areaRounded = roundTo(areaExact * scaleFactor, 2);
		const meanRounded = roundTo(meanExact, 2);

		const gKatex = `${a === 1 ? '' : `${a}`}e^x + ${2 * s}x - ${4 * s}`;
		const gTypst = `${a === 1 ? '' : `${a} `}e^x + ${2 * s} x - ${4 * s}`;
		const asympK = linearKatex(a, b, 'x');
		const asympT = linearTypst(a, b, 'x');
		const fKatex = `${asympK} - ${2 * s}(x - 1)e^{-x}`;
		const fTypst = `${asympT} - ${2 * s}(x - 1) e^(-x)`;
		const HKatex = `-${2 * s}x e^{-x}`;
		const HTypst = `-${2 * s} x e^(-x)`;
		const hKatex = `(${2 * s}x - ${2 * s})e^{-x}`;
		const hTypst = `(${2 * s} x - ${2 * s}) e^(-x)`;

		const varSvg = svgVariationTable({
			fnName: 'f(x)',
			derivName: "f'(x)",
			xValues: ['0', 'α', '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: '-' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '+' }
			],
			variations: [
				{ value: `${f0}`, position: 'top' },
				{ value: 'f(α)', position: 'bottom' },
				{ value: '+∞', position: 'top' }
			]
		});
		const varUrl = saveSvgAsset(`3as_ge_t2_bac_var_${difficulty}_s${seed}`, varSvg);

		const curveSvg = svgFunctionCurvePlot({
			xMin: -0.3,
			xMax: k + 1.2,
			yMin: Math.floor(Math.min(0, fFn(alpha) - 1.5)),
			yMax: Math.ceil(Math.max(f0 + 2, fFn(k + 0.8) + 2)),
			fn: (x) => (x >= 0 ? fFn(x) : NaN),
			curveLabel: 'C_f',
			asymptotes: [{ kind: 'oblique', a, b, label: 'Δ', color: '#059669' }],
			shadedIntegral: { a: 1, b: k, color: 'rgba(37,99,235,0.22)' },
			points: [
				{ x: 0, y: f0, label: `(0;${f0})`, color: '#1d4ed8' },
				{ x: alpha, y: fFn(alpha), label: `S(α;${fAlphaRounded})`, color: '#dc2626' },
				{ x: 1, y: a + b, label: `A(1;${a + b})`, color: '#059669' }
			]
		});
		const curveUrl = saveSvgAsset(`3as_ge_t2_bac_curve_${difficulty}_s${seed}`, curveSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${f0}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر الدالة الاقتصادية $f(x) = ${fKatex}$ على $[0 ; +\\infty[$. احسب التكلفة الابتدائية $f(0)$:`,
				questionTextAr: `احسب القيمة المضبوطة لـ $f(0)$:`,
				imageUrl: curveUrl,
				imageCaption: 'المنحنى (C_f) والمقارب المائل Δ والحيز المظلل',
				questionData: {
					answer: f0,
					displayTemplate: 'f(0) = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `$f(0) = ${b} - ${2 * s}(0 - 1)e^0 = ${b} + ${2 * s} = ${f0}$.`
			};
		} else if (difficulty === 'medium') {
			const mcq = buildUniqueMcqOptions(
				`$H(x) = ${HKatex}$ لأن $H'(x) = ${hKatex}$`,
				[
					{
						text: `$H(x) = ${2 * s}x e^{-x}$ لأن $(x e^{-x})' = (x - 1)e^{-x}$`,
						diagnosticFeedback: `احسب بدقة: $(x e^{-x})' = (1 - x)e^{-x} = -(x - 1)e^{-x}$، ولذلك يجب وضع إشارة سالب أمام $${2 * s}x e^{-x}$.`
					},
					{
						text: `$H(x) = -${2 * s}x e^x$ لأن مشتق الأس يختزل الإشارة`,
						diagnosticFeedback: `الدالة تحتوي على الأسية $e^{-x}$ وليس $e^x$.`
					},
					{
						text: `$H(x) = (${2 * s}x + ${2 * s})e^{-x}$`,
						diagnosticFeedback: `اشتقاق $(x + 1)e^{-x}$ يعطي $-x e^{-x}$ ولا يُبقي الحد $-1$.`
					}
				],
				rng
			);
			finalAnswer = `H(x) = ${HKatex}`;
			quizQuestion = {
				type: 'mcq',
				questionText: `ما هي الدالة الأصلية $H$ للدالة $h(x) = (${asympK}) - f(x) = ${hKatex}$ على $[0 ; +\\infty[$ (بحيث $H(0) = 0$)؟`,
				questionTextAr: `عيّن الدالة الأصلية $H$ للفرق $(${asympK}) - f(x)$:`,
				imageUrl: varUrl,
				imageCaption: 'جدول تغيرات الدالة f على [0 ; +∞[',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نشتق الجداء $H(x) = ${HKatex}$: $H'(x) = -${2 * s}e^{-x} + ${2 * s}x e^{-x} = ${hKatex} = h(x)$.`
			};
		} else {
			const exactAreaK = `${2 * s * scaleFactor}(e^{-1} - ${k}e^{-${k}})`;
			finalAnswer = `${exactAreaK}\\text{ cm}^2`;
			const mcq = buildUniqueMcqOptions(
				`$\\mathcal{A} = ${exactAreaK}\\text{ cm}^2$`,
				[
					{
						text: `$\\mathcal{A} = ${2 * s}(e^{-1} - ${k}e^{-${k}})\\text{ cm}^2$`,
						diagnosticFeedback: `هذا مقدار المساحة بوحدة $\\text{u.a}$؛ لا تنس ضربه في مساحة الوحدة $${ux} \\times ${uy} = ${scaleFactor}\\text{ cm}^2$!`
					},
					{
						text: `$\\mathcal{A} = ${2 * s * scaleFactor}(${k}e^{-${k}} - e^{-1})\\text{ cm}^2$`,
						diagnosticFeedback: `بما أن $H(x) = -${2 * s}x e^{-x}$، فإن $H(${k}) - H(1) = -${2 * s * k}e^{-${k}} - (-${2 * s}e^{-1}) = ${2 * s}(e^{-1} - ${k}e^{-${k}}) > 0$.`
					},
					{
						text: `$\\mathcal{A} = ${2 * s * scaleFactor}(1 - ${k}e^{-${k}})\\text{ cm}^2$`,
						diagnosticFeedback: `عند الحد السفلي $x = 1$ نحصل على $e^{-1}$ وليس $e^0 = 1$!`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `في معلم متعامد حيث $\\|\\vec{\\imath}\\| = ${ux}\\text{ cm}$ و$\\|\\vec{\\jmath}\\| = ${uy}\\text{ cm}$، ما هي القيمة المضبوطة لمساحة الحيّز المحدّد بـ $(C_f)$ و$(\\Delta)$ والمستقيمين $x = 1$ و$x = ${k}$ بالـ $\\text{cm}^2$؟`,
				questionTextAr: `عيّن المساحة المضبوطة بالـ $\\text{cm}^2$ على $[1 ; ${k}]$:`,
				imageUrl: curveUrl,
				imageCaption: `الحيز المحصور بين المقارب المائل Δ والمنحنى (C_f) على [1 ; ${k}]`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `على $[1 ; ${k}]$ يقع $(\\Delta)$ فوق $(C_f)$، ومنه $\\mathcal{A} = (H(${k}) - H(1)) \\times ${scaleFactor} = ${exactAreaK}\\text{ cm}^2 \\approx ${areaRounded}\\text{ cm}^2$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			id: `ex_${seed}`,
			num: 'التمرين 4 (المسألة)',
			points: 7,
			instruction: 'الجزء الأول — دراسة دالة مساعدة؛ الجزء الثاني — دالة اقتصادية أسية وتكامل محدود:',
			content: [
				{
					type: 'text',
					content: `*الجزء الأول:* نعتبر الدالة $g$ المعرفة على $[0 ; +oo[$ بـ: $g(x) = ${gTypst}$.`
				},
				{
					type: 'text',
					content: `1) احسب $g'(x)$ وادرس اتجاه تغير الدالة $g$ على $[0 ; +oo[$ ثم احسب $lim_(x arrow.r +oo) g(x)$.`
				},
				{
					type: 'text',
					content: `2) بيّن أن المعادلة $g(x) = 0$ تقبل حلا وحيدا $alpha$ في المجال $]0 ; 1[$، وتحقق أن $${alphaLo} < alpha < ${alphaHi}$، ثم استنتج إشارة $g(x)$ على $[0 ; +oo[$.`
				},
				{
					type: 'text',
					content: `*الجزء الثاني:* نعتبر الدالة الاقتصادية $f$ المعرفة على $[0 ; +oo[$ بـ: $f(x) = ${fTypst}$. نرمز بـ $(cal(C)_f)$ لمنحناها البياني في معلم متعامد حيث $||arrow(i)|| = ${ux}$ cm و$||arrow(j)|| = ${uy}$ cm.`
				},
				{
					type: 'text',
					content: `1) احسب $f(0)$ و$lim_(x arrow.r +oo) f(x)$. بيّن أن المستقيم $(Delta): y = ${asympT}$ مقارب مائل لـ $(cal(C)_f)$ بجوار $+oo$ ثم ادرس الوضعية النسبية لـ $(cal(C)_f)$ و$(Delta)$ (نقطة التقاطع عند $x = 1$).`
				},
				{
					type: 'text',
					content: `2) بيّن أنّه من أجل كل $x in [0 ; +oo[$: $f'(x) = g(x) e^(-x)$، ثم شكل جدول تغيرات $f$ وعيّن قيمة تقريبية لـ $f(alpha)$.`
				},
				{
					type: 'text',
					content: `3) تحقق أن $H(x) = ${HTypst}$ دالة أصلية لـ $h(x) = (${asympT}) - f(x) = ${hTypst}$ على $[0 ; +oo[$، ثم احسب مساحة الحيز المحصور بين $(Delta)$ و$(cal(C)_f)$ و$x = 1$ و$x = ${k}$ بالـ $"cm"^2$.`
				},
				{
					type: 'text',
					content: `4) استنتج القيمة المتوسطة $m = frac(1, ${k} - 1) integral_1^(${k}) f(x) dx$ للدالة $f$ على المجال $[1 ; ${k}]$ بتدوير النتيجة إلى $10^(-2)$.`
				},
				{
					type: 'columns',
					widths: ['45%', '55%'],
					children: [
						{
							type: 'image',
							src: varUrl,
							caption: 'جدول تغيرات $f$ على $[0 ; +oo[$'
						},
						{
							type: 'image',
							src: curveUrl,
							caption: `المنحنى $(C_f)$ والمقارب المائل $Delta$ والمساحة المظللة على $[1 ; ${k}]$`
						}
					]
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: this.grade,
			trimesterId: this.trimesterId,
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`لإثبات وجود ووحدانية $\\alpha \\in ]0 ; 1[$ طبّق مبرهنة القيم المتوسطة بعد حساب $g(0)$ و$g(1)$.`,
				`لدراسة الوضعية النسبية بين $(C_f)$ و$(\\Delta)$ ندرس إشارة الفرق $f(x) - (${asympK}) = -${2 * s}(x - 1)e^{-x}$.`,
				`بما أن $f(x) = (${asympK}) - h(x)$، فإن دالة أصلية لـ $f$ هي $\\frac{${a}}{2}x^2 + ${b}x - H(x) = \\frac{${a}}{2}x^2 + ${b}x + ${2 * s}x e^{-x}$.`
			],
			solutionStepsAr: [
				`$g'(x) = ${a === 1 ? '' : `${a}`}e^x + ${2 * s} > 0$، فـ $g$ مستمرة ومتزايدة تماما. $g(0) = ${a - 4 * s} < 0$ و$g(1) = ${a}e - ${2 * s} > 0$؛ إذن يوجد حل وحيد $\\alpha \\in ]${alphaLo} ; ${alphaHi}[$ ($g(x) < 0$ على $[0 ; \\alpha[$ و$g(x) > 0$ على $]\\alpha ; +\\infty[$).`,
				`$f(0) = ${f0}$ و$f'(0) = ${fp0}$. بجوار $+\\infty$: $\\lim_{x \\to +\\infty} [f(x) - (${asympK})] = 0$ فـ $(\\Delta)$ مقارب مائل. فوق $(\\Delta)$ على $[0 ; 1[$، ويقطعه عند $A(1 ; ${a + b})$، وتحت $(\\Delta)$ على $]1 ; +\\infty[$.`,
				`$f'(x) = ${a} - ${2 * s}(e^{-x} - (x-1)e^{-x}) = (${gKatex})e^{-x} = g(x)e^{-x}$. القيمة الصغرى $f(\\alpha) \\approx ${fAlphaRounded}$.`,
				`$H'(x) = ${hKatex}$. المساحة على $[1 ; ${k}]$ هي $[H(x)]_1^{${k}} \\times ${scaleFactor} = ${2 * s * scaleFactor}(e^{-1} - ${k}e^{-${k}})\\text{ cm}^2 \\approx ${areaRounded}\\text{ cm}^2$.`,
				`دالة أصلية لـ $f(x)$ هي $F(x) = ${fracKatex(a, 2)}x^2 + ${b}x + ${2 * s}x e^{-x}$، ومنه القيمة المتوسطة $m = \\frac{F(${k}) - F(1)}{${k - 1}} \\approx ${meanRounded}$.`
			],
			finalAnswer
		};
	}
};

export const TEMPLATES_3AS_GE_T2: ParameterizedTemplate[] = [
	tplExpEquationsStudy,
	tplLnDomainAsymptote,
	tplPrimitivesMarginalToTotal,
	tplDefiniteIntegralMeanValue,
	tplAreaBetweenCurvesCm2,
	tplBacExpIntegralIntegration
];
