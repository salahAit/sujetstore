import type { ExerciseBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng, simplifyFraction } from '../../rng';
import { saveSvgAsset, svgBarChart } from '../../svg-helpers';
import { svgCobwebSequencePlot, svgFunctionCurvePlot, svgVariationTable } from '../../svg-secondary';

// ═══════════════════════════════════════════════════════════════════════════════
// Dual Syntax Formatters (KaTeX vs Typst) — Western digits 0-9, 100% Halal
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

// ═══════════════════════════════════════════════════════════════════════════════
// 1. General Properties of Functions: Domain, Parity & Reference Variations
// ═══════════════════════════════════════════════════════════════════════════════

const tplDomainParityVariations: ParameterizedTemplate = {
	id: 'tpl_2as_ge_t2_domain_parity_variations',
	grade: '2as_ge',
	trimesterId: 't2',
	domain: 'analysis',
	titleAr: 'عموميات على الدوال: مجموعة التعريف، الشفعية، التفكيك واتجاه التغير',
	curriculumLessonId: 'lesson_2as_ge_t2_functions_generality_reference',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const c = rng.pick(difficulty === 'easy' ? [1, 2] : [2, 3, 4]);
		const kNum = rng.pick([2, 3, 4]);
		const bShift = rng.pick([1, 2, 3]);
		const isOddG = rng.pick([true, false]);
		const gConst = rng.pick([1, 2, 3]);
		const xTest = rng.pick([2, 3]);

		// f(x) = kNum / (x - c) + bShift on R \ {c}
		const x1 = c + 1;
		const x2 = c + 2;
		const fx1 = kNum + bShift;
		const fx2 = roundTo(kNum / 2 + bShift, 2);
		const rate12 = roundTo(fx2 - fx1, 2); // = -kNum / 2 < 0

		// g(x) = (x^3)/(x^2 + gConst) if isOddG else (x^2)/(x^2 + gConst)
		const gKatex = isOddG ? `\\frac{x^3}{x^2 + ${gConst}}` : `\\frac{x^2}{x^2 + ${gConst}}`;
		const gTypst = isOddG ? `frac(x^3, x^2 + ${gConst})` : `frac(x^2, x^2 + ${gConst})`;
		const gAtX = isOddG
			? fracKatex(xTest * xTest * xTest, xTest * xTest + gConst)
			: fracKatex(xTest * xTest, xTest * xTest + gConst);
		const gAtNegX = isOddG
			? fracKatex(-xTest * xTest * xTest, xTest * xTest + gConst)
			: gAtX;
		const parityAr = isOddG ? 'فردية' : 'زوجية';

		const curveSvg = svgFunctionCurvePlot({
			xMin: c - 4,
			xMax: c + 5,
			yMin: bShift - 5,
			yMax: bShift + 6,
			fn: (x) => (Math.abs(x - c) < 0.08 ? NaN : kNum / (x - c) + bShift),
			curveLabel: 'C_f',
			asymptotes: [
				{ kind: 'vertical', value: c, label: `x=${c}`, color: '#dc2626' },
				{ kind: 'horizontal', value: bShift, label: `y=${bShift}`, color: '#059669' }
			],
			points: [{ x: x1, y: fx1, label: `A(${x1};${fx1})`, color: '#1d4ed8' }]
		});
		const curveUrl = saveSvgAsset(`2as_ge_t2_dom_curve_${difficulty}_s${seed}`, curveSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${c}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر الدالة العددية $f(x) = \\frac{${kNum}}{x - ${c}} + ${bShift}$. ما هي القيمة الحقيقية الممنوعة $x_0$ التي لا تنتمي إلى مجموعة تعريف الدالة $D_f$؟`,
				questionTextAr: `عيّن القيمة الممنوعة في مجموعة تعريف $f(x) = \\frac{${kNum}}{x - ${c}} + ${bShift}$:`,
				imageUrl: curveUrl,
				imageCaption: 'التمثيل البياني للدالة f',
				questionData: {
					answer: c,
					displayTemplate: 'x_0 = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `المقام ينعدم عند $x - ${c} = 0 \\iff x = ${c}$، إذن مجموعة التعريف هي $\\mathbb{R} \\setminus \\{${c}\\}$ والقيمة الممنوعة هي $${c}$.`
			};
		} else if (difficulty === 'medium') {
			const mcq = buildUniqueMcqOptions(
				`دالة ${parityAr} ومنحناها متناظر بالنسبة ${isOddG ? 'للمبدأ $O(0; 0)$' : 'لمحور التراتيب $(Oy)$'}`,
				[
					{
						text: `دالة ${isOddG ? 'زوجية' : 'فردية'} ومنحناها متناظر بالنسبة ${isOddG ? 'لمحور التراتيب $(Oy)$' : 'للمبدأ $O(0; 0)$'}`,
						diagnosticFeedback: `تحقق من إشارة البسط عند تعويض $(-x)$: ${isOddG ? '$(-x)^3 = -x^3$ (فردية)' : '$(-x)^2 = x^2$ (زوجية)'}.`
					},
					{
						text: 'ليست زوجية وليست فردية لعدم تناظر مجموعة التعريف',
						diagnosticFeedback: `المقام $x^2 + ${gConst} > 0$ دوماً، فمجموعة التعريف هي $\\mathbb{R}$ وهي متناظرة بالنسبة إلى $0$!`
					},
					{
						text: 'دالة فردية وزوجية في آنٍ واحد على $\\mathbb{R}$',
						diagnosticFeedback: 'الدالة المعدومة فقط هي التي تكون زوجية وفردية معاً.'
					}
				],
				rng
			);
			finalAnswer = parityAr;
			quizQuestion = {
				type: 'mcq',
				questionText: `لتكن الدالة $g(x) = ${gKatex}$ المعرفة على $\\mathbb{R}$. ما هي شفعية الدالة $g$ وما تفسيرها الهندسي؟`,
				questionTextAr: `حدّد شفعية الدالة $g(x) = ${gKatex}$ والتفسير الهندسي:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `مجموعة التعريف $\\mathbb{R}$ متناظرة بالنسبة إلى $0$، ولدينا $g(-x) = ${isOddG ? '-g(x)' : 'g(x)'}$، إذن $g$ دالة ${parityAr}.`
			};
		} else {
			finalAnswer = `${rate12}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر الدالة $f(x) = \\frac{${kNum}}{x - ${c}} + ${bShift}$ على المجال $]${c} ; +\\infty[$. احسب نسبة التزايد $\\tau = \\frac{f(${x2}) - f(${x1})}{${x2} - ${x1}}$ بين $${x1}$ و $${x2}$:`,
				questionTextAr: `احسب نسبة التزايد لـ $f$ بين $${x1}$ و $${x2}$:`,
				imageUrl: curveUrl,
				imageCaption: 'تغير الدالة f على المجال ]c ; +∞[',
				questionData: {
					answer: rate12,
					displayTemplate: 'τ = ?',
					variables: [],
					tolerance: 0.01
				},
				explanation: `لدينا $f(${x1}) = ${fx1}$ و $f(${x2}) = ${fx2}$، ومنه $\\tau = \\frac{${fx2} - ${fx1}}{${x2} - ${x1}} = ${rate12} < 0$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر الدالتين $f$ و $g$ المعرفتين بـ: $f(x) = frac(${kNum}, x - ${c}) + ${bShift}$ و $g(x) = ${gTypst}$.`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) عيّن مجموعة تعريف كل من الدالتين $f$ و $g$.\n2) احسب نسبة التزايد للدالة $f$ بين $x_1 = ${x1}$ و $x_2 = ${x2}$، ثم استنتج اتجاه تغير الدالة $f$ على المجال $]${c} ; +oo[$ باستعمال الدوال المرجعية.`,
							answer: `1) $D_f = ]-oo, ${c}[ union ]${c}, +oo[$ لأن المقام ينعدم عند $x = ${c}$.\nبما أن $x^2 + ${gConst} >= ${gConst} > 0$ لكل $x in bb(R)$، فإن $D_g = bb(R)$.\n2) لدينا $f(${x1}) = ${fx1}$ و $f(${x2}) = ${fx2}$، ومنه نسبة التزايد هي $frac(${fx2} - ${fx1}, ${x2} - ${x1}) = ${rate12} < 0$.\nعلى $]${c} ; +oo[$ الدالة $x arrow.r.bar x - ${c}$ متزايدة وموجبة تماماً، وبدالة المقلوب تكون $f$ متناقصة تماماً على $]${c} ; +oo[$.`,
							mark: '2'
						},
						{
							type: 'image',
							src: curveUrl,
							caption: 'المنحنى البياني (C_f)'
						}
					]
				},
				{
					type: 'text',
					content: `3) ادرس شفعية الدالة $g$، ثم قارن بين $g(${xTest})$ و $g(-${xTest})$ مع التفسير الهندسي.`,
					answer: `3) $D_g = bb(R)$ متناظرة بالنسبة إلى $0$. لكل $x in bb(R)$: $g(-x) = ${isOddG ? '-g(x)' : 'g(x)'}$.\nإذن $g$ دالة ${parityAr} ومنحناها متناظر بالنسبة ${isOddG ? 'للمبدأ $O(0, 0)$' : 'لمحور التراتيب $(Oy)$'}.\nوعليه $g(-${xTest}) = ${isOddG ? '-' : ''}g(${xTest}) = ${gAtNegX.replace('\\frac{', 'frac(').replace('}{', ', ').replace('}', ')')}$.`,
					mark: '1'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_ge',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`مجموعة تعريف دالة ناطقة هي $\\mathbb{R}$ باستثناء القيم التي تعدم المقام.`,
				`للشفعية، تحقق أولاً من تناظر $D_g$ بالنسبة إلى $0$، ثم احسب $g(-x)$.`,
				`نسبة التزايد بين $x_1$ و $x_2$ هي $\\frac{f(x_2) - f(x_1)}{x_2 - x_1}$.`
			],
			solutionStepsAr: [
				`مجموعة التعريف: $D_f = \\mathbb{R} \\setminus \\{${c}\\}$ و $D_g = \\mathbb{R}$.`,
				`نسبة التزايد لـ $f$ بين $${x1}$ و $${x2}$ هي $${rate12}$، والدالة متناقصة تماماً على $]${c}; +\\infty[$.`,
				`شفعية $g$: دالة ${parityAr} ومنه $g(${xTest}) = ${gAtX}$ و $g(-${xTest}) = ${gAtNegX}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Derivability, Derivative Function, Tangent Line & Affine Approximation
// ═══════════════════════════════════════════════════════════════════════════════

const tplDerivativeTangentApprox: ParameterizedTemplate = {
	id: 'tpl_2as_ge_t2_derivative_tangent_approx',
	grade: '2as_ge',
	trimesterId: 't2',
	domain: 'analysis',
	titleAr: 'الاشتقاقية: الدالة المشتقة، معادلة المماس والتقريب التآلفي',
	curriculumLessonId: 'lesson_2as_ge_t2_derivability_tangent',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// f(x) = x^3 + b*x^2 + c*x + d with tangent at x0
		const x0 = difficulty === 'easy' ? rng.pick([1, 2]) : rng.pick([1, 2, -1]);
		const b = rng.pick([-3, -2, 0, 2]);
		const c = rng.pick([-3, 1, 2, 4]);
		const d = rng.pick([1, 2, 3, -1]);

		const fx0 = x0 * x0 * x0 + b * x0 * x0 + c * x0 + d;
		const fpx0 = 3 * x0 * x0 + 2 * b * x0 + c;
		const tgIntercept = fx0 - fpx0 * x0;
		const hApprox = 0.01;
		const approxVal = roundTo(fx0 + hApprox * fpx0, 2);
		const xQuery = roundTo(x0 + hApprox, 2);

		const fKatex = poly3Katex(1, b, c, d, 'x');
		const fTypst = poly3Typst(1, b, c, d, 'x');
		const fpKatex = poly2Katex(3, 2 * b, c, 'x');
		const fpTypst = poly2Typst(3, 2 * b, c, 'x');
		const tgKatex = `y = ${linearKatex(fpx0, tgIntercept, 'x')}`;
		const tgTypst = `y = ${linearTypst(fpx0, tgIntercept, 'x')}`;

		const curveSvg = svgFunctionCurvePlot({
			xMin: x0 - 2.2,
			xMax: x0 + 2.2,
			yMin: Math.min(-4, fx0 - 6),
			yMax: Math.max(6, fx0 + 6),
			fn: (x) => ((x + b) * x + c) * x + d,
			curveLabel: 'C_f',
			tangents: [{ x: x0, y: fx0, slope: fpx0, halfSpan: 0.9, color: '#059669' }],
			points: [{ x: x0, y: fx0, label: `A(${x0};${fx0})`, color: '#dc2626' }]
		});
		const curveUrl = saveSvgAsset(`2as_ge_t2_tg_curve_${difficulty}_s${seed}`, curveSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${fpx0}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر الدالة $f(x) = ${fKatex}$ المعرفة على $\\mathbb{R}$. احسب معامل توجيه المماس $(T)$ للمنحنى $(C_f)$ عند النقطة ذات الفاصلة $x_0 = ${x0}$ (أي $f'(${x0})$):`,
				questionTextAr: `احسب العدد المشتق $f'(${x0})$ للدالة $f(x) = ${fKatex}$:`,
				imageUrl: curveUrl,
				imageCaption: `المنحنى (C_f) والمماس عند x_0 = ${x0}`,
				questionData: {
					answer: fpx0,
					displayTemplate: `f'(${x0}) = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `الدالة المشتقة هي $f'(x) = ${fpKatex}$، ومنه $f'(${x0}) = 3(${x0})^2 + 2(${b})(${x0}) + (${c}) = ${fpx0}$.`
			};
		} else if (difficulty === 'medium') {
			const wrongForgetSign = `y = ${linearKatex(fpx0, fx0, 'x')}`;
			const wrongSwap = `y = ${linearKatex(fx0, fpx0 - fx0 * x0, 'x')}`;
			const wrongPlus = `y = ${linearKatex(fpx0, fx0 + fpx0 * x0, 'x')}`;

			const mcq = buildUniqueMcqOptions(
				`$${tgKatex}$`,
				[
					{
						text: `$${wrongForgetSign}$`,
						diagnosticFeedback: `نسيت طرح $f'(${x0}) \\times (${x0})$ في الدستور $y = f'(${x0})(x - ${x0}) + f(${x0})$!`
					},
					{
						text: `$${wrongSwap}$`,
						diagnosticFeedback: `بدّلت موضعي العدد المشتق $f'(${x0}) = ${fpx0}$ والصورة $f(${x0}) = ${fx0}$.`
					},
					{
						text: `$${wrongPlus}$`,
						diagnosticFeedback: `أخطأت في إشارة النشر داخل القوس $(x - (${x0}))$.`
					}
				],
				rng
			);
			finalAnswer = tgKatex;
			quizQuestion = {
				type: 'mcq',
				questionText: `نعتبر الدالة $f(x) = ${fKatex}$. ما هي معادلة المماس $(T)$ للمنحنى $(C_f)$ عند النقطة ذات الفاصلة $x_0 = ${x0}$؟`,
				questionTextAr: `ما هي معادلة المماس $(T)$ لـ $(C_f)$ عند $x_0 = ${x0}$؟`,
				imageUrl: curveUrl,
				imageCaption: `المماس (T) عند A(${x0}; ${fx0})`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `لدينا $f(${x0}) = ${fx0}$ و $f'(${x0}) = ${fpx0}$، ومنه $y = ${fpx0}(x - (${x0})) + (${fx0}) \\implies ${tgKatex}$.`
			};
		} else {
			finalAnswer = `${approxVal}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `للدالة $f(x) = ${fKatex}$ لدينا $f(${x0}) = ${fx0}$ و $f'(${x0}) = ${fpx0}$. باستعمال التقريب التآلفي بجوار $x_0 = ${x0}$، احسب القيمة التقريبية للعدد $f(${xQuery})$:`,
				questionTextAr: `احسب التقريب التآلفي للعدد $f(${xQuery})$ بجوار $x_0 = ${x0}$:`,
				questionData: {
					answer: approxVal,
					displayTemplate: `f(${xQuery}) ≈ ?`,
					variables: [],
					tolerance: 0.005
				},
				explanation: `نطبق دستور التقريب التآلفي $f(${x0} + h) \\approx f(${x0}) + h \\cdot f'(${x0})$ من أجل $h = ${hApprox}$: $f(${xQuery}) \\approx ${fx0} + ${hApprox} \\times (${fpx0}) = ${approxVal}$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر الدالة العددية $f$ المعرفة على $bb(R)$ بـ: $f(x) = ${fTypst}$، وليكن $(C_f)$ تمثيلها البياني في معلم متعامد ومتجانس.`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) احسب الدالة المشتقة $f'(x)$، ثم احسب $f(${x0})$ و $f'(${x0})$.\n2) اكتب معادلة المماس $(T)$ للمنحنى $(C_f)$ عند النقطة $A$ ذات الفاصلة $x_0 = ${x0}$.`,
							answer: `1) المشتقة: $f'(x) = ${fpTypst}$.\nلدينا $f(${x0}) = ${fx0}$ و $f'(${x0}) = ${fpx0}$.\n2) معادلة المماس $(T)$ عند $A(${x0}, ${fx0})$:\n$y = f'(${x0})(x - (${x0})) + f(${x0}) = ${fpx0}(x - (${x0})) + (${fx0}) arrow.r.double ${tgTypst}$.`,
							mark: '2.5'
						},
						{
							type: 'image',
							src: curveUrl,
							caption: `المنحنى (C_f) والمماس عند x_0 = ${x0}`
						}
					]
				},
				{
					type: 'text',
					content: `3) أعطِ التقريب التآلفي للدالة $f$ بجوار $x_0 = ${x0}$، ثم استنتج قيمة تقريبية للعدد $f(${xQuery})$.`,
					answer: `3) التقريب التآلفي بجوار $x_0 = ${x0}$:\n$f(${x0} + h) approx f(${x0}) + h f'(${x0}) = ${fx0} + (${fpx0}) h$.\nمن أجل $h = ${hApprox}$ نجد: $f(${xQuery}) approx ${fx0} + ${hApprox} times (${fpx0}) = ${approxVal}$.`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_ge',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`اشتق كثير الحدود حداً بحد: $(x^3)' = 3x^2$ و $(x^2)' = 2x$.`,
				`معادلة المماس عند $x_0$ هي $y = f'(x_0)(x - x_0) + f(x_0)$.`,
				`التقريب التآلفي يعطى بالدستور $f(x_0 + h) \\approx f(x_0) + h \\cdot f'(x_0)$.`
			],
			solutionStepsAr: [
				`حساب المشتقة $f'(x) = ${fpKatex}$ وقيمتي $f(${x0}) = ${fx0}$ و $f'(${x0}) = ${fpx0}$.`,
				`معادلة المماس $(T): ${tgKatex}$.`,
				`التقريب التآلفي: $f(${xQuery}) \\approx ${approxVal}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Marginal Cost & Minimum Average Cost Optimization
// ═══════════════════════════════════════════════════════════════════════════════

const tplMarginalAverageCost: ParameterizedTemplate = {
	id: 'tpl_2as_ge_t2_marginal_average_cost',
	grade: '2as_ge',
	trimesterId: 't2',
	domain: 'analysis',
	titleAr: 'التطبيق الاقتصادي للاشتقاقية: الكلفة الحدية والكلفة المتوسطة الصغرى',
	curriculumLessonId: 'lesson_2as_ge_t2_variations_extrema_marginal_cost',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// C_T(q) = a*q^2 + b*q + c where c = a * q0^2
		// C_M(q) = a*q + b + c/q => C_M'(q) = a*(q^2 - q0^2)/q^2 = 0 at q = q0!
		// C_M(q0) = 2*a*q0 + b = C_m(q0) (exact integer!)
		const a = difficulty === 'easy' ? 1 : difficulty === 'medium' ? rng.pick([1, 2]) : rng.pick([2, 3]);
		const q0 = difficulty === 'easy' ? rng.pick([4, 5, 6]) : difficulty === 'medium' ? rng.pick([5, 6, 8]) : rng.pick([6, 8, 10]);
		const b = rng.pick([6, 8, 10, 12]);
		const c = a * q0 * q0;
		const qMax = q0 + 6;
		const minAvg = 2 * a * q0 + b;
		const ctAtQ0 = q0 * minAvg; // = a*q0^2 + b*q0 + c = 2*a*q0^2 + b*q0
		const cm1 = roundTo(a * 1 + b + c / 1, 2);
		const cmEnd = roundTo(a * qMax + b + c / qMax, 2);

		const ctKatex = poly2Katex(a, b, c, 'q');
		const ctTypst = poly2Typst(a, b, c, 'q');
		const cmargKatex = linearKatex(2 * a, b, 'q');
		const cmargTypst = linearTypst(2 * a, b, 'q');
		const cavgKatex = `${linearKatex(a, b, 'q')} + \\frac{${c}}{q}`;
		const cavgTypst = `${linearTypst(a, b, 'q')} + frac(${c}, q)`;

		const varTableSvg = svgVariationTable({
			fnName: 'C_M(q)',
			derivName: "C_M'(q)",
			xValues: ['1', `${q0}`, `${qMax}`],
			derivativeRow: [
				{ kind: 'sign', value: '-' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '+' }
			],
			variations: [
				{ value: `${cm1}`, position: 'top' },
				{ value: `${minAvg}`, position: 'bottom' },
				{ value: `${cmEnd}`, position: 'top' }
			]
		});
		const varTableUrl = saveSvgAsset(`2as_ge_t2_cavg_var_${difficulty}_s${seed}`, varTableSvg);

		const curveSvg = svgFunctionCurvePlot({
			xMin: 0.5,
			xMax: qMax + 1,
			yMin: 0,
			yMax: Math.ceil(Math.min(cm1, minAvg * 2.5)),
			fn: (q) => (q > 0.2 ? a * q + b + c / q : NaN),
			curveLabel: 'C_M(q)',
			tangents: [{ x: q0, y: minAvg, slope: 0, halfSpan: 1.5, color: '#059669' }],
			points: [{ x: q0, y: minAvg, label: `Min(${q0};${minAvg})`, color: '#dc2626' }]
		});
		const curveUrl = saveSvgAsset(`2as_ge_t2_cavg_curve_${difficulty}_s${seed}`, curveSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${q0}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `تُعطى الكلفة الكلية لإنتاج $q \\in [1 ; ${qMax}]$ وحدة بالعبارة $C_T(q) = ${ctKatex}$. احسب الكمية المثلى $q_0$ التي تجعل الكلفة المتوسطة للوحدة $C_M(q) = \\frac{C_T(q)}{q}$ في حدها الأدنى:`,
				questionTextAr: `عيّن الكمية $q_0$ التي تقلّص الكلفة المتوسطة للوحدة إلى حدها الأدنى:`,
				imageUrl: curveUrl,
				imageCaption: 'منحنى الكلفة المتوسطة C_M(q)',
				questionData: {
					answer: q0,
					displayTemplate: 'q_0 = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `لدينا $C_M(q) = ${cavgKatex}$، ومشتقتها $C_M'(q) = ${a} - \\frac{${c}}{q^2} = \\frac{${a}(q^2 - ${q0 * q0})}{q^2}$ تنعدم عند $q_0 = ${q0}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${minAvg}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `تُعطى الكلفة الكلية بآلاف الدنانير بالعبارة $C_T(q) = ${ctKatex}$ على المجال $[1 ; ${qMax}]$. احسب أدنى قيمة تبلغها الكلفة المتوسطة للوحدة $C_M(q_0)$:`,
				questionTextAr: `احسب القيمة الصغرى للكلفة المتوسطة $C_M(q_0)$ بآلاف الدنانير:`,
				imageUrl: varTableUrl,
				imageCaption: 'جدول تغيرات الكلفة المتوسطة C_M(q)',
				questionData: {
					answer: minAvg,
					displayTemplate: 'C_M(q_0) = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `تنعدم $C_M'(q)$ عند $q_0 = ${q0}$، وعندها تساوي الكلفة المتوسطة الصغرى $C_M(${q0}) = ${a}(${q0}) + ${b} + \\frac{${c}}{${q0}} = ${minAvg}$ (وهي تساوي الكلفة الحدية $C_m(${q0}) = ${minAvg}$).`
			};
		} else {
			const mcq = buildUniqueMcqOptions(
				`تتساوى الكلفة الحدية والكلفة المتوسطة: $C_m(${q0}) = C_M(${q0}) = ${minAvg}$`,
				[
					{
						text: `تكون الكلفة الحدية معدومة: $C_m(${q0}) = 0$`,
						diagnosticFeedback: `لا تنعدم الكلفة الحدية $C_T'(q)$ عند أدنى كلفة متوسطة؛ بل المشتقة التي تنعدم هي مشتقة **الكلفة المتوسطة** $C_M'(q) = 0$.`
					},
					{
						text: `تكون الكلفة الحدية أكبر تماماً من الكلفة المتوسطة: $C_m(${q0}) > C_M(${q0})$`,
						diagnosticFeedback: `عند $C_M'(q) = \\frac{C_m(q) - C_M(q)}{q} = 0$ يتساوى المقداران تماماً!`
					},
					{
						text: `تكون الكلفة الكلية معدومة عند $q_0 = ${q0}$`,
						diagnosticFeedback: `الكلفة الكلية عند $q_0 = ${q0}$ موجبة وتساوي $C_T(${q0}) = ${ctAtQ0}$.`
					}
				],
				rng
			);
			finalAnswer = `C_m(${q0}) = C_M(${q0}) = ${minAvg}`;
			quizQuestion = {
				type: 'mcq',
				questionText: `للكلفة الكلية $C_T(q) = ${ctKatex}$، تبلغ الكلفة المتوسطة $C_M(q)$ حدها الأدنى عند $q_0 = ${q0}$. ما هي العلاقة المحققة عند $q_0 = ${q0}$ بين الكلفة الحدية $C_m$ والكلفة المتوسطة $C_M$؟`,
				questionTextAr: `ما هي العلاقة الاقتصادية المحققة عند أدنى كلفة متوسطة $q_0 = ${q0}$؟`,
				imageUrl: varTableUrl,
				imageCaption: 'جدول تغيرات الكلفة المتوسطة C_M(q)',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `بما أن $C_M'(q) = \\frac{C_m(q) - C_M(q)}{q}$، فإن انعدام $C_M'(${q0}) = 0$ يكافئ $C_m(${q0}) = C_M(${q0}) = ${minAvg}$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `تنتج وحدة صناعية $q$ طناً شهرياً ($q in [1 ; ${qMax}]$) بكلفة كلية (بآلاف الدنانير) تُعطى بـ: $C_T(q) = ${ctTypst}$.`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) عبّر عن الكلفة الحدية $C_m(q) = C_T'(q)$ وعن الكلفة المتوسطة للطن $C_M(q) = frac(C_T(q), q)$.\n2) بيّن أن $C_M'(q) = frac(${a}(q - ${q0})(q + ${q0}), q^2)$، ثم استنتج اتجاه تغير $C_M$ وشكّل جدول تغيراتها على $[1 ; ${qMax}]$.`,
							answer: `1) الكلفة الحدية: $C_m(q) = ${cmargTypst}$.\nالكلفة المتوسطة: $C_M(q) = ${cavgTypst}$.\n2) المشتقة: $C_M'(q) = ${a} - frac(${c}, q^2) = frac(${a} q^2 - ${c}, q^2) = frac(${a}(q - ${q0})(q + ${q0}), q^2)$.\nعلى $[1 ; ${qMax}]$، $q + ${q0} > 0$ و $q^2 > 0$، فتكون $C_M$ متناقصة تماماً على $[1 ; ${q0}]$ ومتزايدة تماماً على $[${q0} ; ${qMax}]$.`,
							mark: '2.5'
						},
						{
							type: 'image',
							src: varTableUrl,
							caption: 'جدول تغيرات الكلفة المتوسطة C_M(q)'
						}
					]
				},
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `3) حدّد كمية الإنتاج $q_0$ التي تجعل الكلفة المتوسطة في حدها الأدنى، ثم احسب $C_M(q_0)$ وقارنها بـ $C_m(q_0)$. ماذا تلاحظ؟`,
							answer: `3) تبلغ الكلفة المتوسطة حدها الأدنى عند $q_0 = ${q0}$ أطنان.\nالقيمة الصغرى هي $C_M(${q0}) = ${a}(${q0}) + ${b} + frac(${c}, ${q0}) = ${minAvg}$ ألف دينار.\nوبالتعويض في الكلفة الحدية: $C_m(${q0}) = ${2 * a}(${q0}) + ${b} = ${minAvg}$.\nنلاحظ أن $C_M(q_0) = C_m(q_0)$ عند نقطة الكلفة المتوسطة الصغرى.`,
							mark: '1.5'
						},
						{
							type: 'image',
							src: curveUrl,
							caption: 'منحنى الكلفة المتوسطة ومماسها الأفقي عند q_0'
						}
					]
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_ge',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`الكلفة الحدية هي مشتقة الكلفة الكلية $C_m(q) = C_T'(q)$، والكلفة المتوسطة هي $C_M(q) = \\frac{C_T(q)}{q}$.`,
				`اشتق $C_M(q) = ${a}q + ${b} + \\frac{${c}}{q}$ بتذكر أن $(\\frac{1}{q})' = -\\frac{1}{q^2}$.`,
				`عند الكمية المثلى $q_0$ التي تصغّر الكلفة المتوسطة تتساوى دائماً $C_M(q_0) = C_m(q_0)$.`
			],
			solutionStepsAr: [
				`تحديد $C_m(q) = ${cmargKatex}$ و $C_M(q) = ${cavgKatex}$.`,
				`حساب المشتقة $C_M'(q) = \\frac{${a}(q - ${q0})(q + ${q0})}{q^2}$ وتشكيل جدول التغيرات.`,
				`استنتاج $q_0 = ${q0}$ وأدنى كلفة متوسطة $C_M(${q0}) = C_m(${q0}) = ${minAvg}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Arithmetic Sequences in Management (Linear Depreciation & Production)
// ═══════════════════════════════════════════════════════════════════════════════

const tplArithmeticDepreciationGe: ParameterizedTemplate = {
	id: 'tpl_2as_ge_t2_arithmetic_depreciation_ge',
	grade: '2as_ge',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'المتتاليات الحسابية في التسيير: الاهتلاك الخطي للأصول وتطور الإنتاج',
	curriculumLessonId: 'lesson_2as_ge_t2_arithmetic_sequences_ge',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Part A: Linear depreciation V_n = V_0 - n * A (in 1000 DA)
		const lifeYears = difficulty === 'easy' ? rng.pick([5, 6, 8]) : rng.pick([6, 8, 10]);
		const annDep = difficulty === 'easy' ? rng.pick([40, 50]) : difficulty === 'medium' ? rng.pick([45, 60, 75]) : rng.pick([55, 80, 90]);
		const v0 = lifeYears * annDep; // in 1000 DA
		const kQuery = Math.floor(lifeYears / 2);
		const vkQuery = v0 - kQuery * annDep;

		// Part B: Arithmetic factory output u_n = u_0 + n * r
		const u0 = rng.pick([100, 120, 150, 200]);
		const r = rng.pick([15, 20, 25, 30]);
		const nSum = difficulty === 'easy' ? 7 : difficulty === 'medium' ? 9 : 11; // nSum + 1 terms is even => exact integer sum!
		const uLast = u0 + nSum * r;
		const sumOut = Math.round(((nSum + 1) * (u0 + uLast)) / 2);

		const depChartSvg = svgBarChart(
			[0, 1, 2, 3, 4].map((yr) => ({ label: `سنة ${yr}`, value: Math.max(0, v0 - yr * annDep) })),
			Math.ceil(v0 * 1.1)
		);
		const depChartUrl = saveSvgAsset(`2as_ge_t2_arith_dep_${difficulty}_s${seed}`, depChartSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${vkQuery}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `اقتنت مؤسسة آلة إنتاجية بمبلغ $V_0 = ${v0}$ ألف دينار، وتُهتلك خطياً بقسط سنوي ثابت قدره $A = ${annDep}$ ألف دينار. احسب القيمة المحاسبية الصافية $V_${kQuery}$ للآلة بعد $${kQuery}$ سنوات (بآلاف الدنانير):`,
				questionTextAr: `احسب القيمة المحاسبية الصافية $V_${kQuery}$ بعد $${kQuery}$ سنوات:`,
				imageUrl: depChartUrl,
				imageCaption: 'الاهتلاك الخطي للآلة (بآلاف الدنانير)',
				questionData: {
					answer: vkQuery,
					displayTemplate: `V_${kQuery} = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `المتتالية $(V_n)$ حسابية أساسها $r = -${annDep}$ وحدها الأول $V_0 = ${v0}$، ومنه $V_${kQuery} = ${v0} - ${kQuery} \\times ${annDep} = ${vkQuery}$ ألف دينار.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${sumOut}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `تُنتج ورشة $u_0 = ${u0}$ وحدة في الشهر الأول، وتزيد إنتاجها بمقدار ثابت $r = ${r}$ وحدة كل شهر. احسب الإنتاج الإجمالي المتراكم $S_{${nSum}} = u_0 + u_1 + \\dots + u_{${nSum}}$ خلال $${nSum + 1}$ شهراً:`,
				questionTextAr: `احسب المجموع $S_{${nSum}} = u_0 + u_1 + \\dots + u_{${nSum}}$:`,
				questionData: {
					answer: sumOut,
					displayTemplate: `S_${nSum} = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `عدد الحدود هو $${nSum} - 0 + 1 = ${nSum + 1}$، والحد الأخير $u_{${nSum}} = ${u0} + ${nSum}(${r}) = ${uLast}$. إذن $S_{${nSum}} = ${nSum + 1} \\times \\frac{${u0} + ${uLast}}{2} = ${sumOut}$.`
			};
		} else {
			const wrongNTerms = Math.round((nSum * (u0 + uLast)) / 2);
			const wrongLast = Math.round(((nSum + 1) * (u0 + u0 + (nSum - 1) * r)) / 2);
			const mcq = buildUniqueMcqOptions(
				`$${sumOut}$ وحدة`,
				[
					{
						text: `$${wrongNTerms}$ وحدة`,
						diagnosticFeedback: `عدد الحدود من $u_0$ إلى $u_{${nSum}}$ هو $${nSum + 1}$ حداً وليس $${nSum}$ حداً!`
					},
					{
						text: `$${wrongLast}$ وحدة`,
						diagnosticFeedback: `تأكد من حساب الحد الأخير: $u_{${nSum}} = u_0 + ${nSum}r = ${uLast}$ وليس $u_0 + ${nSum - 1}r$.`
					},
					{
						text: `$${uLast}$ وحدة`,
						diagnosticFeedback: `هذا هو إنتاج الشهر الأخير $u_{${nSum}}$ فقط وليس المجموع التراكمي!`
					}
				],
				rng
			);
			finalAnswer = `${sumOut}`;
			quizQuestion = {
				type: 'mcq',
				questionText: `نعتبر المتتالية الحسابية لإنتاج مصنع شهرياً حيث $u_0 = ${u0}$ وأساسها $r = ${r}$. ما هي قيمة المجموع التراكمي $S_{${nSum}} = u_0 + u_1 + \\dots + u_{${nSum}}$؟`,
				questionTextAr: `احسب المجموع $S_{${nSum}} = u_0 + \\dots + u_{${nSum}}$:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الحد الأخير $u_{${nSum}} = ${u0} + ${nSum}(${r}) = ${uLast}$ وعدد الحدود $${nSum + 1}$، ومنه $S_{${nSum}} = ${nSum + 1} \\times \\frac{${u0} + ${uLast}}{2} = ${sumOut}$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `يتألف التمرين من جزأين مستقلين في تسيير المؤسسة:`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `*أولاً: الاهتلاك الخطي للأصول*\nاقتنت مؤسسة تجهيزات مكتبية بمبلغ $V_0 = ${v0}$ ألف دينار جزائري، وتُهتلك خطياً بقسط سنوي ثابت قدره $A = ${annDep}$ ألف دج. نرمز بـ $V_n$ للقيمة المحاسبية الصافية بعد $n$ سنة.\n1) عبّر عن $V_(n+1)$ بدلالة $V_n$، واستنتج طبيعة المتتالية $(V_n)$ ثم اكتب $V_n$ بدلالة $n$.\n2) احسب القيمة الصافية $V_${kQuery}$ بعد $${kQuery}$ سنوات، وحدد بعد كم سنة تصبح الآلة مهتلكة كلياً ($V_n = 0$).`,
							answer: `أولاً:\n1) في نهاية كل سنة تنقص القيمة بـ $${annDep}$ ألف دج: $V_(n+1) = V_n - ${annDep}$.\nإذن $(V_n)$ متتالية حسابية حدها الأول $V_0 = ${v0}$ وأساسها $r_1 = -${annDep}$، وعبارتها $V_n = ${v0} - ${annDep} n$.\n2) $V_${kQuery} = ${v0} - ${annDep}(${kQuery}) = ${vkQuery}$ ألف دج.\n$V_n = 0 arrow.r.double ${v0} - ${annDep} n = 0 arrow.r.double n = ${lifeYears}$ سنوات.`,
							mark: '2'
						},
						{
							type: 'image',
							src: depChartUrl,
							caption: 'تناقص القيمة المحاسبية الصافية بالاهتلاك الخطي'
						}
					]
				},
				{
					type: 'text',
					content: `*ثانياً: تطور الإنتاج الشهري*\nتنتج ورشة في شهر الانطلاق $u_0 = ${u0}$ قطعة، وترفع إنتاجها كل شهر بزيادة ثابتة قدرها $${r}$ قطعة.\n1) اكتب عبارة الحد العام $u_n$ بدلالة $n$، ثم احسب $u_${nSum}$.\n2) احسب الإنتاج الكلي المتراكم $S_${nSum} = u_0 + u_1 + dots.c + u_${nSum}$ خلال $${nSum + 1}$ شهراً.`,
					answer: `ثانياً:\n1) $(u_n)$ متتالية حسابية حدها الأول $u_0 = ${u0}$ وأساسها $r = ${r}$:\n$u_n = ${u0} + ${r} n$، ومنه $u_${nSum} = ${u0} + ${r}(${nSum}) = ${uLast}$ قطعة.\n2) عدد الحدود من $0$ إلى $${nSum}$ هو $${nSum + 1}$ حداً:\n$S_${nSum} = ${nSum + 1} times frac(u_0 + u_${nSum}, 2) = ${nSum + 1} times frac(${u0} + ${uLast}, 2) = ${sumOut}$ قطعة.`,
					mark: '2'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_ge',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`الاهتلاك الخطي يمثل متتالية حسابية أساسها سالب يساوي $-A$.`,
				`الحد العام للمتتالية الحسابية هو $u_n = u_0 + nr$.`,
				`مجموع حدود متتالية حسابية من $u_0$ إلى $u_n$ يحتوي على $(n + 1)$ حداً: $S_n = (n + 1)\\frac{u_0 + u_n}{2}$.`
			],
			solutionStepsAr: [
				`الاهتلاك الخطي: $V_n = ${v0} - ${annDep}n$، ومنه $V_${kQuery} = ${vkQuery}$ وتنتهي مدة الاهتلاك بعد $${lifeYears}$ سنوات.`,
				`متتالية الإنتاج: $u_n = ${u0} + ${r}n$، و $u_{${nSum}} = ${uLast}$.`,
				`الإنتاج المتراكم: $S_{${nSum}} = ${sumOut}$ قطعة.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Geometric Sequences in Management: Production Growth & Export Forecast
// ═══════════════════════════════════════════════════════════════════════════════

const tplGeometricProductionGe: ParameterizedTemplate = {
	id: 'tpl_2as_ge_t2_geometric_production_ge',
	grade: '2as_ge',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'المتتاليات الهندسية في التسيير: نمو الإنتاج السنوي، الصادرات والمجموع المتراكم',
	curriculumLessonId: 'lesson_2as_ge_t2_geometric_sequences_ge',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		interface GeomConfig {
			p0: number;
			ratePct: number; // +ratePct %
			q: number; // 1 + ratePct/100
		}

		const pool: GeomConfig[] =
			difficulty === 'easy'
				? [
						{ p0: 100, ratePct: 10, q: 1.1 },
						{ p0: 200, ratePct: 10, q: 1.1 },
						{ p0: 250, ratePct: 20, q: 1.2 },
						{ p0: 500, ratePct: 20, q: 1.2 }
					]
				: difficulty === 'medium'
					? [
							{ p0: 400, ratePct: 15, q: 1.15 },
							{ p0: 1000, ratePct: 12, q: 1.12 },
							{ p0: 500, ratePct: 25, q: 1.25 },
							{ p0: 800, ratePct: 10, q: 1.1 }
						]
					: [
							{ p0: 1200, ratePct: 15, q: 1.15 },
							{ p0: 1600, ratePct: 25, q: 1.25 },
							{ p0: 2000, ratePct: 8, q: 1.08 },
							{ p0: 1500, ratePct: 20, q: 1.2 }
						];

		const cfg = rng.pick(pool);
		const { p0, ratePct, q } = cfg;
		const p1 = roundTo(p0 * q, 2);
		const p2 = roundTo(p0 * q * q, 2);
		const p3 = roundTo(p0 * q * q * q, 2);
		const p4 = roundTo(p0 * q * q * q * q, 2);
		// Cumulative sum S_3 = P_0 + P_1 + P_2 + P_3 (4 years)
		const sum4 = roundTo(p0 + p1 + p2 + p3, 2);
		const sum4Formula = roundTo((p0 * (Math.pow(q, 4) - 1)) / (q - 1), 2);
		if (Math.abs(sum4 - sum4Formula) > 0.05) {
			throw new Error(`Geometric sum mismatch: ${sum4} vs ${sum4Formula}`);
		}

		const cobSvg = svgCobwebSequencePlot({
			xMin: 0,
			xMax: p3 * 1.1,
			yMin: 0,
			yMax: p3 * 1.1,
			fn: (x) => q * x,
			u0: p0,
			steps: 3
		});
		const cobUrl = saveSvgAsset(`2as_ge_t2_geom_cob_${difficulty}_s${seed}`, cobSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${p2}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `تصدّر تعاونية فلاحية $P_0 = ${p0}$ طن سنة $2024$، وتخطط لزيادة صادراتها بنسبة ثابتة قدرها $+${ratePct}\\%$ سنوياً. احسب كمية الصادرات المتوقعة $P_2$ سنة $2026$ (بالأطنان):`,
				questionTextAr: `احسب قيمة $P_2$ بمعدل نمو سنوي $+${ratePct}\\%$:`,
				imageUrl: cobUrl,
				imageCaption: 'نمو متتالية الصادرات الهندسية',
				questionData: {
					answer: p2,
					displayTemplate: 'P_2 = ? طن',
					variables: [],
					tolerance: 0.05
				},
				explanation: `المتتالية $(P_n)$ هندسية أساسها $q = ${q}$، ومنه $P_2 = ${p0} \\times (${q})^2 = ${p2}$ طناً.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${sum4}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `للمتتالية الهندسية للإنتاج السنوي حدها الأول $P_0 = ${p0}$ وأساسها $q = ${q}$. احسب الإنتاج التراكمي للأعوام الأربعة الأولى $S_3 = P_0 + P_1 + P_2 + P_3$:`,
				questionTextAr: `احسب المجموع $S_3 = P_0 + P_1 + P_2 + P_3$:`,
				questionData: {
					answer: sum4,
					displayTemplate: 'S_3 = ?',
					variables: [],
					tolerance: 0.1
				},
				explanation: `بتطبيق قانون مجموع متتالية هندسية لـ $4$ حدود: $S_3 = ${p0} \\times \\frac{${q}^4 - 1}{${q} - 1} = ${sum4}$.`
			};
		} else {
			const wrongThreeTerms = roundTo(p0 + p1 + p2, 2);
			const wrongArith = roundTo(p0 * 4 + (p0 * (ratePct / 100) * 6), 2);
			const wrongQOnly = roundTo(p4, 2);

			const mcq = buildUniqueMcqOptions(
				`$S_3 = ${sum4}$ طناً`,
				[
					{
						text: `$S_3 = ${wrongThreeTerms}$ طناً`,
						diagnosticFeedback: `المجموع من $P_0$ إلى $P_3$ يضم $4$ حدود ($P_0, P_1, P_2, P_3$) وليس $3$ حدود!`
					},
					{
						text: `$S_3 = ${wrongArith}$ طناً`,
						diagnosticFeedback: `النمو بنسب مئوية ثابتة هو متتالية **هندسية** أساسها $q = ${q}$ وليس متتالية حسابية!`
					},
					{
						text: `$S_3 = ${wrongQOnly}$ طناً`,
						diagnosticFeedback: `هذه قيمة الحد $P_4$ وحده، وليست مجموع الحدود الأربعة الأولى.`
					}
				],
				rng
			);
			finalAnswer = `${sum4}`;
			quizQuestion = {
				type: 'mcq',
				questionText: `مؤسسة إنتاجية تصدّر $P_0 = ${p0}$ طناً وتنمو صادراتها بنسبة $+${ratePct}\\%$ كل سنة ($q = ${q}$). ما هو مجموع الصادرات خلال السنوات الأربع الأولى $S_3 = P_0 + P_1 + P_2 + P_3$؟`,
				questionTextAr: `ما هو المجموع $S_3 = P_0 + P_1 + P_2 + P_3$؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `عدد الحدود $4$، إذن $S_3 = ${p0} \\times \\frac{${q}^4 - 1}{${q} - 1} = ${sum4}$ طناً.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `صدّرت شركة جزائرية للصناعات الغذائية $P_0 = ${p0}$ طن سنة $2024$. تتوقع الخطة الاستراتيجية للشركة نمو الصادرات بنسبة ثابتة قدرها $+${ratePct}$% كل سنة. نرمز بـ $P_n$ لكمية الصادرات سنة $(2024 + n)$.`,
			content: [
				{
					type: 'text',
					content: `1) احسب $P_1$ و $P_2$، ثم بيّن أن $(P_n)$ متتالية هندسية يُطلب تعيين أساسها $q$ وحدها الأول $P_0$.`,
					answer: `1) حساب الحدود وإثبات الطبيعة الهندسية:\n- $P_1 = ${p0} times (1 + frac(${ratePct}, 100)) = ${p0} times ${q} = ${p1}$ طن.\n- $P_2 = ${p1} times ${q} = ${p2}$ طن.\n- من أجل كل $n in bb(N)$: $P_(n+1) = ${q} P_n$، إذن $(P_n)$ متتالية هندسية أساسها $q = ${q}$ وحدها الأول $P_0 = ${p0}$.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `2) اكتب عبارة الحد العام $P_n$ بدلالة $n$، ثم احسب كمية الصادرات المتوقعة سنة $2028$ ($n = 4$).`,
					answer: `2) عبارة الحد العام هي $P_n = ${p0} times (${q})^n$.\nسنة $2028$ ($n = 4$): $P_4 = ${p0} times (${q})^4 = ${p4}$ طن.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) احسب الكمية الإجمالية المتراكمة للصادرات خلال $4$ سنوات (من $2024$ إلى $2027$): $S_3 = P_0 + P_1 + P_2 + P_3$.`,
					answer: `3) عدد الحدود هو $4$:\n$S_3 = P_0 times frac(q^4 - 1, q - 1) = ${p0} times frac((${q})^4 - 1, ${q} - 1) = ${sum4}$ طن.`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_ge',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`النمو بنسبة مئوية ثابتة $+${ratePct}\\%$ يعني الضرب كل سنة في المعامل الضربي $q = 1 + \\frac{${ratePct}}{100} = ${q}$.`,
				`عبارة الحد العام للمتتالية الهندسية هي $P_n = P_0 \\cdot q^n$.`,
				`انتبه لعدد الحدود في $S_3 = P_0 + P_1 + P_2 + P_3$: يوجد $4$ حدود، فالأس في البسط هو $4$.`
			],
			solutionStepsAr: [
				`إثبات أن $(P_n)$ متتالية هندسية أساسها $q = ${q}$ وحدها الأول $P_0 = ${p0}$.`,
				`عبارة الحد العام $P_n = ${p0}(${q})^n$ وتقدير $P_4 = ${p4}$ طن.`,
				`المجموع المتراكم لأربع سنوات: $S_3 = ${sum4}$ طن.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Comprehensive Integration Problem (7 Points): Cubic Cost, Revenue & Profit Study
// ═══════════════════════════════════════════════════════════════════════════════

const tplCostProfitCubicIntegration: ParameterizedTemplate = {
	id: 'tpl_2as_ge_t2_cost_profit_cubic_integration',
	grade: '2as_ge',
	trimesterId: 't2',
	domain: 'integration',
	isIntegration: true,
	titleAr: 'المسألة الشاملة: دراسة دالة الكلفة الكلية التكعيبية، المشتقة، المماس وتعظيم الربح',
	curriculumLessonId: 'lesson_2as_ge_t2_variations_extrema_marginal_cost',
	defaultPoints: 7,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// C_T(x) = x^3 - 3*k*x^2 + cCost*x + dCost (strictly increasing on R because cCost > 3*k^2)
		// Profit B(x) = pSell*x - C_T(x) = -x^3 + 3*k*x^2 - 3*r1*r2*x - dCost
		// where r1 < 0 < r2 and r1 + r2 = 2*k, so B'(x) = -3*(x - r1)*(x - r2)
		// pSell = cCost - 3*r1*r2
		interface CubicEconConfig {
			k: number;
			r1: number; // < 0
			r2: number; // = 2*k - r1 > 0
			cCost: number; // > 3*k^2
			dCost: number;
			qMax: number;
		}

		const pool: CubicEconConfig[] =
			difficulty === 'easy'
				? [
						{ k: 2, r1: -2, r2: 6, cCost: 15, dCost: 20, qMax: 10 },
						{ k: 2, r1: -1, r2: 5, cCost: 15, dCost: 15, qMax: 9 },
						{ k: 3, r1: -2, r2: 8, cCost: 30, dCost: 32, qMax: 12 },
						{ k: 2, r1: -3, r2: 7, cCost: 16, dCost: 24, qMax: 11 }
					]
				: difficulty === 'medium'
					? [
							{ k: 3, r1: -1, r2: 7, cCost: 30, dCost: 25, qMax: 11 },
							{ k: 3, r1: -3, r2: 9, cCost: 32, dCost: 40, qMax: 13 },
							{ k: 4, r1: -2, r2: 10, cCost: 52, dCost: 50, qMax: 14 },
							{ k: 4, r1: -1, r2: 9, cCost: 50, dCost: 36, qMax: 13 }
						]
					: [
							{ k: 4, r1: -3, r2: 11, cCost: 54, dCost: 60, qMax: 15 },
							{ k: 5, r1: -2, r2: 12, cCost: 80, dCost: 70, qMax: 16 },
							{ k: 5, r1: -1, r2: 11, cCost: 78, dCost: 55, qMax: 15 },
							{ k: 4, r1: -4, r2: 12, cCost: 55, dCost: 64, qMax: 16 }
						];

		const cfg = rng.pick(pool);
		const { k, r1, r2, cCost, dCost, qMax } = cfg;
		const pSell = cCost - 3 * r1 * r2;
		const bCoeff = 3 * k;
		const bLinearB = -3 * r1 * r2; // > 0

		const ctFn = (x: number) => ((x - bCoeff) * x + cCost) * x + dCost;
		const cmFn = (x: number) => (3 * x - 2 * bCoeff) * x + cCost;
		const bFn = (x: number) => ((-x + bCoeff) * x + bLinearB) * x - dCost;

		const maxProfit = bFn(r2);
		const bAt0 = -dCost;
		const bAtEnd = bFn(qMax);
		const ctAt0 = dCost;
		const ctAtEnd = ctFn(qMax);

		// Tangent at x0 = k (inflection point of C_T)
		const xInf = k;
		const ctInf = ctFn(xInf);
		const cmInf = cmFn(xInf); // = cCost - 3*k^2 > 0
		const tgIntercept = ctInf - cmInf * xInf;

		const ctKatex = poly3Katex(1, -bCoeff, cCost, dCost, 'x');
		const ctTypst = poly3Typst(1, -bCoeff, cCost, dCost, 'x');
		const cmTypst = poly2Typst(3, -2 * bCoeff, cCost, 'x');
		const bKatex = poly3Katex(-1, bCoeff, bLinearB, -dCost, 'x');
		const bTypst = poly3Typst(-1, bCoeff, bLinearB, -dCost, 'x');
		const bpTypst = poly2Typst(-3, 2 * bCoeff, bLinearB, 'x');

		const varTableSvg = svgVariationTable({
			fnName: 'B(x)',
			derivName: "B'(x)",
			xValues: ['0', `${r2}`, `${qMax}`],
			derivativeRow: [
				{ kind: 'sign', value: '+' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '-' }
			],
			variations: [
				{ value: `${bAt0}`, position: 'bottom' },
				{ value: `${maxProfit}`, position: 'top' },
				{ value: `${bAtEnd}`, position: 'bottom' }
			]
		});
		const varTableUrl = saveSvgAsset(`2as_ge_t2_int_vartable_${difficulty}_s${seed}`, varTableSvg);

		const curveSvg = svgFunctionCurvePlot({
			xMin: 0,
			xMax: qMax,
			yMin: Math.min(-50, bAtEnd - 20, bAt0 - 20),
			yMax: maxProfit + 40,
			fn: bFn,
			curveLabel: 'الربح B(x)',
			asymptotes: [{ kind: 'horizontal', value: 0, label: 'y=0', color: '#64748b' }],
			tangents: [{ x: r2, y: maxProfit, slope: 0, halfSpan: 1.8, color: '#059669' }],
			points: [{ x: r2, y: maxProfit, label: `Max(${r2};${maxProfit})`, color: '#15803d' }]
		});
		const curveUrl = saveSvgAsset(`2as_ge_t2_int_curve_${difficulty}_s${seed}`, curveSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${r2}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `تُنمذج دالة الربح الصافي لمصنع على المجال $[0 ; ${qMax}]$ بالعبارة $B(x) = ${bKatex}$ حيث $B'(x) = -3(x - (${r1}))(x - ${r2})$. احسب كمية الإنتاج المثلى $x^*$ التي تعظّم الربح:`,
				questionTextAr: `عيّن الكمية المثلى $x^*$ لتعظيم الربح $B(x)$ على $[0 ; ${qMax}]$:`,
				imageUrl: curveUrl,
				imageCaption: 'منحنى دالة الربح B(x)',
				questionData: {
					answer: r2,
					displayTemplate: 'x* = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `على المجال $[0 ; ${qMax}]$ لدينا $x - (${r1}) > 0$، فتنعدم $B'(x)$ عند $x^* = ${r2}$ (موجبة قبله وسالبة بعده)، فتعظّم الربح عند $x^* = ${r2}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${maxProfit}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `الكلفة الكلية لإنتاج $x \\in [0 ; ${qMax}]$ طن (بآلاف الدنانير) هي $C_T(x) = ${ctKatex}$، وسعر بيع الطن الواحد هو $${pSell}$ ألف دج ($R(x) = ${pSell}x$). احسب قيمة الربح الأعظمي $B(${r2})$ بآلاف الدنانير:`,
				questionTextAr: `احسب أقصى ربح $B(${r2})$ بآلاف الدنانير:`,
				imageUrl: varTableUrl,
				imageCaption: 'جدول تغيرات دالة الربح B(x)',
				questionData: {
					answer: maxProfit,
					displayTemplate: 'B_max = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `الربح هو $B(x) = ${bKatex}$، وبالتعويض عند القيمة المثلى $x^* = ${r2}$ نجد $B(${r2}) = ${maxProfit}$ ألف دينار.`
			};
		} else {
			finalAnswer = `${cmInf}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `تُعطى دالة الكلفة الكلية لإنتاج $x \\in [0 ; ${qMax}]$ وحدة بالعبارة $C_T(x) = ${ctKatex}$. احسب الكلفة الحدية الصغرى (أي معامل توجيه المماس لـ $(C_T)$ عند نقطة انعطافه $x_0 = ${xInf}$):`,
				questionTextAr: `احسب الكلفة الحدية $C_m(${xInf}) = C_T'(${xInf})$:`,
				questionData: {
					answer: cmInf,
					displayTemplate: `C_m(${xInf}) = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `الكلفة الحدية هي $C_m(x) = C_T'(x) = 3(x - ${xInf})^2 + ${cmInf}$، وتبلغ أدنى قيمة لها عند $x_0 = ${xInf}$ وتساوي $${cmInf}$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			customTitle: 'التمرين الرابع — المسألة الاقتصادية الشاملة',
			instruction: `تنتج مؤسسة صناعية $x$ طن من مادة أولية ($x in [0 ; ${qMax}]$). تُقدر الكلفة الكلية (بآلاف الدنانير) بالدالة:\n$C_T(x) = ${ctTypst}$\nوتبيع المؤسسة كل طن بسعر ثابت قدره $${pSell}$ ألف دينار.`,
			content: [
				{
					type: 'text',
					content: `*الجزء الأول: دراسة الكلفة الكلية والكلفة الحدية (2.5 نقطة)*\n1) احسب التكاليف الثابتة $C_T(0)$ وكلفة أقصى طاقة إنتاجية $C_T(${qMax})$.\n2) احسب الكلفة الحدية $C_m(x) = C_T'(x)$، ثم بيّن أن $C_m(x) = 3(x - ${xInf})^2 + ${cmInf}$، واستنتج أن الكلفة الكلية متزايدة تماماً على $[0 ; ${qMax}]$.\n3) اكتب معادلة المماس $(T)$ لمنحنى الكلفة $(C_T)$ عند النقطة ذات الفاصلة $x_0 = ${xInf}$.`,
					answer: `الجزء الأول:\n1) $C_T(0) = ${ctAt0}$ ألف دج، و $C_T(${qMax}) = ${ctAtEnd}$ ألف دج.\n2) $C_m(x) = ${cmTypst} = 3(x - ${xInf})^2 + ${cmInf} > 0$ دوماً، إذن $C_T$ متزايدة تماماً على $[0 ; ${qMax}]$.\n3) عند $x_0 = ${xInf}$: $C_T(${xInf}) = ${ctInf}$ و $C_m(${xInf}) = ${cmInf}$، ومنه $(T): y = ${linearTypst(cmInf, tgIntercept, 'x')}$.`,
					mark: '2.5'
				},
				{
					type: 'columns',
					widths: ['1.4fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `*الجزء الثاني: تعظيم الربح الصافي (4.5 نقاط)*\n1) عبّر عن الإيراد $R(x)$، ثم تحقق أن دالة الربح $B(x) = R(x) - C_T(x)$ تُكتب:\n$B(x) = ${bTypst}$.\n2) احسب $B'(x)$ وتحقق أن $B'(x) = -3(x - (${r1}))(x - ${r2})$، ثم ادرس إشارة $B'(x)$ وشكّل جدول تغيرات $B$ على $[0 ; ${qMax}]$.`,
							answer: `الجزء الثاني:\n1) $R(x) = ${pSell} x$، ومنه $B(x) = ${pSell} x - (${ctTypst}) = ${bTypst}$.\n2) $B'(x) = ${bpTypst} = -3(x - (${r1}))(x - ${r2})$.\nعلى $[0 ; ${qMax}]$ لدينا $x - (${r1}) > 0$، فتكون $B'(x) > 0$ على $[0 ; ${r2}[$ و $B'(x) < 0$ على $]${r2} ; ${qMax}]$.`,
							mark: '2.5'
						},
						{
							type: 'image',
							src: varTableUrl,
							caption: 'جدول تغيرات دالة الربح B(x)'
						}
					]
				},
				{
					type: 'columns',
					widths: ['1.4fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `3) استنتج الكمية المثلى $x^*$ التي تعظّم الربح وأقصى ربح ممكن.\n4) بقراءة المنحنى البياني المقابل لـ $B(x)$، قارن بين الكمية المثلى التي تحقق الربح الأعظمي ومجال الخسارة.`,
							answer: `3) تبلغ الدالة $B$ قيمتها الحدية العظمى عند $x^* = ${r2}$ طناً، ويساوي أقصى ربح $B(${r2}) = ${maxProfit}$ ألف دج.\n4) تتجاوز المؤسسة منطقة الخسارة بمجرد تجاوز عتبة التعادل وتبلغ قمة المردودية عند $x^* = ${r2}$.`,
							mark: '2'
						},
						{
							type: 'image',
							src: curveUrl,
							caption: 'التمثيل البياني لدالة الربح B(x)'
						}
					]
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_ge',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`اكتب $C_m(x) = C_T'(x)$ على الشكل النموذجي $3(x - ${xInf})^2 + ${cmInf}$ لإثبات إشارتها الموجبة تماماً.`,
				`احسب $B(x) = ${pSell}x - C_T(x)$ وانشر $-3(x - (${r1}))(x - ${r2})$ للتحقق من المشتقة $B'(x)$.`,
				`الكمية التي تعظّم الربح هي $x^* = ${r2}$ حيث تنعدم $B'(x)$ وتتحول من الموجب إلى السالب.`
			],
			solutionStepsAr: [
				`الكلفة الحدية $C_m(x) = ${cmInf} + 3(x - ${xInf})^2 > 0$ ومعادلة المماس عند $x_0 = ${xInf}$.`,
				`دالة الربح $B(x) = ${bKatex}$ ومشتقتها $B'(x) = -3(x - (${r1}))(x - ${r2})$.`,
				`أقصى ربح يبلغ $${maxProfit}$ ألف دج عند $x^* = ${r2}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 2 Parameterized Templates for 2AS GE
// ═══════════════════════════════════════════════════════════════════════════════

export const TEMPLATES_2AS_GE_T2: ParameterizedTemplate[] = [
	tplDomainParityVariations,
	tplDerivativeTangentApprox,
	tplMarginalAverageCost,
	tplArithmeticDepreciationGe,
	tplGeometricProductionGe,
	tplCostProfitCubicIntegration
];
