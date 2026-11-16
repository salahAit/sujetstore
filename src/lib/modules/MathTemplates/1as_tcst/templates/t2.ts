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
// Pedagogical & Algebraic Formatters (Strict Dual Syntax: KaTeX vs Typst)
// ═══════════════════════════════════════════════════════════════════════════════

function fracKatex(n: number, d: number): string {
	if (d === 1) return `${n}`;
	if (d === -1) return `${-n}`;
	const [sn, sd] = simplifyFraction(n, d);
	if (sd === 1) return `${sn}`;
	return sn < 0 ? `-\\frac{${Math.abs(sn)}}{${sd}}` : `\\frac{${sn}}{${sd}}`;
}

function fracTypst(n: number, d: number): string {
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
		if (parts.length === 0) {
			parts.push(b < 0 ? `-${term}` : term);
		} else {
			parts.push(b < 0 ? `- ${term}` : `+ ${term}`);
		}
	}
	if (c !== 0) {
		const absC = Math.abs(c);
		if (parts.length === 0) {
			parts.push(`${c}`);
		} else {
			parts.push(c < 0 ? `- ${absC}` : `+ ${absC}`);
		}
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
		if (parts.length === 0) {
			parts.push(b < 0 ? `-${term}` : term);
		} else {
			parts.push(b < 0 ? `- ${term}` : `+ ${term}`);
		}
	}
	if (c !== 0) {
		const absC = Math.abs(c);
		if (parts.length === 0) {
			parts.push(`${c}`);
		} else {
			parts.push(c < 0 ? `- ${absC}` : `+ ${absC}`);
		}
	}
	return parts.length === 0 ? '0' : parts.join(' ');
}

function lineEqKatex(a: number, b: number, c: number): string {
	const parts: string[] = [];
	if (a !== 0) {
		if (a === 1) parts.push('x');
		else if (a === -1) parts.push('-x');
		else parts.push(`${a}x`);
	}
	if (b !== 0) {
		const absB = Math.abs(b);
		const term = absB === 1 ? 'y' : `${absB}y`;
		if (parts.length === 0) parts.push(b < 0 ? `-${term}` : term);
		else parts.push(b < 0 ? `- ${term}` : `+ ${term}`);
	}
	if (c !== 0) {
		const absC = Math.abs(c);
		if (parts.length === 0) parts.push(`${c}`);
		else parts.push(c < 0 ? `- ${absC}` : `+ ${absC}`);
	}
	return `${parts.join(' ')} = 0`;
}

function lineEqTypst(a: number, b: number, c: number): string {
	const parts: string[] = [];
	if (a !== 0) {
		if (a === 1) parts.push('x');
		else if (a === -1) parts.push('-x');
		else parts.push(`${a}x`);
	}
	if (b !== 0) {
		const absB = Math.abs(b);
		const term = absB === 1 ? 'y' : `${absB}y`;
		if (parts.length === 0) parts.push(b < 0 ? `-${term}` : term);
		else parts.push(b < 0 ? `- ${term}` : `+ ${term}`);
	}
	if (c !== 0) {
		const absC = Math.abs(c);
		if (parts.length === 0) parts.push(`${c}`);
		else parts.push(c < 0 ? `- ${absC}` : `+ ${absC}`);
	}
	return `${parts.join(' ')} = 0`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Reference Functions & Geometric Translations (الدوال المرجعية والانسحاب)
// ═══════════════════════════════════════════════════════════════════════════════

const referenceFnTranslationTemplate: ParameterizedTemplate = {
	id: 'tpl_1as_tcst_t2_reference_fn_translation',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'analysis',
	titleAr: 'الدوال المرجعية والتحويلات الهندسية (الانسحاب)',
	curriculumLessonId: 'lesson_1as_tcst_t2_reference_functions_properties_graphs',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const x0Choices = [-3, -2, -1, 1, 2, 3];
		const y0Choices = [-4, -3, -2, -1, 1, 2, 3, 4];
		const x0 = rng.pick(x0Choices);
		const y0 = rng.pick(y0Choices);

		let fnKatex = '';
		let fnTypst = '';
		let refFnKatex = '';
		let refFnTypst = '';
		let domainKatex = '';
		let domainTypst = '';
		let variationsAr = '';
		let extremumAr = '';

		if (difficulty === 'easy') {
			// Parabola f(x) = (x - x0)^2 + y0
			const signX0 = x0 < 0 ? `+ ${Math.abs(x0)}` : `- ${x0}`;
			const signY0 = y0 >= 0 ? `+ ${y0}` : `- ${Math.abs(y0)}`;
			fnKatex = `(x ${signX0})^2 ${signY0}`;
			fnTypst = `(x ${signX0})^2 ${signY0}`;
			refFnKatex = 'g(x) = x^2';
			refFnTypst = 'g(x) = x^2';
			domainKatex = '\\mathbb{R}';
			domainTypst = 'bb(R)';
			variationsAr = `الدالة $f$ متناقصة تماماً على المجال $]-\\infty ; ${x0}]$ ومتزايدة تماماً على المجال $[${x0} ; +\\infty[$.`;
			extremumAr = `تقبل الدالة $f$ قيمة حدية صغرى هي $${y0}$ وتبلغها عند $x = ${x0}$.`;
		} else if (difficulty === 'medium') {
			// Hyperbola f(x) = k / (x - x0) + y0 with k in {1, -1, 2}
			const k = rng.pick([1, 2, -1]);
			const signX0 = x0 < 0 ? `+ ${Math.abs(x0)}` : `- ${x0}`;
			const signY0 = y0 >= 0 ? `+ ${y0}` : `- ${Math.abs(y0)}`;
			fnKatex = `\\frac{${k}}{x ${signX0}} ${signY0}`;
			fnTypst = `frac(${k}, x ${signX0}) ${signY0}`;
			refFnKatex = k === 1 ? 'g(x) = \\frac{1}{x}' : `g(x) = \\frac{${k}}{x}`;
			refFnTypst = k === 1 ? 'g(x) = frac(1, x)' : `g(x) = frac(${k}, x)`;
			domainKatex = `\\mathbb{R} \\setminus \\{${x0}\\}`;
			domainTypst = `bb(R) backslash {${x0}}`;
			if (k > 0) {
				variationsAr = `الدالة $f$ متناقصة تماماً على كل من المجالين $]-\\infty ; ${x0}[$ و $]${x0} ; +\\infty[$.`;
			} else {
				variationsAr = `الدالة $f$ متزايدة تماماً على كل من المجالين $]-\\infty ; ${x0}[$ و $]${x0} ; +\\infty[$.`;
			}
			extremumAr = `المنحنى $(C_f)$ يقبل مستقيمين مقاربين معادلتاهما $x = ${x0}$ و $y = ${y0}$.`;
		} else {
			// Inverted parabola f(x) = -(x - x0)^2 + y0
			const signX0 = x0 < 0 ? `+ ${Math.abs(x0)}` : `- ${x0}`;
			const signY0 = y0 >= 0 ? `+ ${y0}` : `- ${Math.abs(y0)}`;
			fnKatex = `-(x ${signX0})^2 ${signY0}`;
			fnTypst = `-(x ${signX0})^2 ${signY0}`;
			refFnKatex = 'g(x) = -x^2';
			refFnTypst = 'g(x) = -x^2';
			domainKatex = '\\mathbb{R}';
			domainTypst = 'bb(R)';
			variationsAr = `الدالة $f$ متزايدة تماماً على المجال $]-\\infty ; ${x0}]$ ومتناقصة تماماً على المجال $[${x0} ; +\\infty[$.`;
			extremumAr = `تقبل الدالة $f$ قيمة حدية عظمى هي $${y0}$ وتبلغها عند $x = ${x0}$.`;
		}

		const correctVecText = `$\\vec{v}(${x0} ; ${y0})$`;
		const distractors = [
			{
				text: `$\\vec{v}(${-x0} ; ${y0})$`,
				diagnosticFeedback: `انتبه: إزاحة المتغير $x$ تكون بالقيمة $x_0 = ${x0}$ وليس $-x_0$، لأن العبارة تتضمن $(x - x_0)$.`
			},
			{
				text: `$\\vec{v}(${x0} ; ${-y0})$`,
				diagnosticFeedback: `تحقق من إشارة الإزاحة العمودية $y_0 = ${y0}$.`
			},
			{
				text: `$\\vec{v}(${y0} ; ${x0})$`,
				diagnosticFeedback: 'انتبه: لا تعكس بين مركبة الفواصل ومركبة التراتيب في شعاع الانسحاب.'
			}
		];

		const mcq = buildUniqueMcqOptions(correctVecText, distractors, rng);

		const qTextKatex = `عيّن مركبتي شعاع الانسحاب $\\vec{v}$ الذي يسمح بإنشاء المنحنى $(C_f)$ للدالة $f(x) = ${fnKatex}$ انطلاقاً من منحنى الدالة المرجعية $${refFnKatex}$.`;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر الدالة العددية $f$ المعرفة بـ: $f(x) = ${fnTypst}$.`,
			content: [
				{
					type: 'text',
					content: `1) عيّن مجموعة تعريف الدالة $f$.`,
					answer: `1) مجموعة تعريف الدالة $f$ هي: $D_f = ${domainTypst}$.`,
					mark: '0.5'
				},
				{
					type: 'text',
					content: `2) ادرس اتجاه تغير الدالة $f$ على مجالي تعريفها، ثم شكّل جدول تغيراتها.`,
					answer: `2) ${variationsAr} ${extremumAr}`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `3) اشرح كيف يمكن إنشاء المنحنى $(C_f)$ انطلاقاً من منحنى الدالة المرجعية $${refFnTypst}$ مع تحديد شعاع الانسحاب $arrow(v)$.`,
					answer: `3) المنحنى $(C_f)$ هو صورة منحنى الدالة المرجعية بالانسحاب الذي شعاعه $arrow(v)(${x0}, ${y0}) = ${x0} arrow(i) ${y0 >= 0 ? '+ ' + y0 : '- ' + Math.abs(y0)} arrow(j)$.`,
					mark: '1.25'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
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
				explanation: `لكتابة الدالة على شكل $f(x) = g(x - x_0) + y_0$ نجد $x_0 = ${x0}$ و $y_0 = ${y0}$، ومنه فإن $(C_f)$ هو صورة منحنى الدالة المرجعية بالانسحاب ذي الشعاع $\\vec{v}(${x0} ; ${y0})$.`
			},
			sujetExercise,
			hints: [
				`تذكر أن منحنى الدالة $x \\mapsto g(x - x_0) + y_0$ يُستنتج من منحنى $g$ بانسحاب شعاعه $\\vec{v}(x_0 ; y_0)$.`,
				`حدد قيمة $x_0$ التي تجعل ما بين القوسين أو المقام مساوياً للصفر.`,
				`مركبتا شعاع الانسحاب هما فاصلة الإزاحة $x_0$ وترتيب الإزاحة $y_0$.`
			],
			solutionStepsAr: [
				`مجموعة تعريف الدالة $f$ هي $D_f = ${domainKatex}$.`,
				variationsAr,
				`المنحنى $(C_f)$ هو صورة منحنى الدالة المرجعية بالانسحاب الذي شعاعه $\\vec{v}(${x0} ; ${y0})$.`
			],
			finalAnswer: `\\vec{v}(${x0} ; ${y0})`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Canonical Form, Discriminant Δ & Quadratic Roots (الشكل النموذجي والمميز)
// ═══════════════════════════════════════════════════════════════════════════════

const canonicalDiscriminantTemplate: ParameterizedTemplate = {
	id: 'tpl_1as_tcst_t2_canonical_discriminant',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'algebra',
	titleAr: 'الشكل النموذجي لثلاثي الحدود والمميز Δ وحل معادلات الدرجة الثانية',
	curriculumLessonId: 'lesson_1as_tcst_t2_canonical_form_quadratic_discriminant',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		let a = 1;
		let x1 = -3;
		let x2 = 1;

		if (difficulty === 'easy') {
			a = 1;
			const oddPairs: [number, number][] = [
				[-5, -1],
				[-5, 1],
				[-3, 1],
				[-3, 3],
				[-1, 3],
				[-1, 5],
				[1, 5]
			];
			[x1, x2] = rng.pick(oddPairs);
		} else if (difficulty === 'medium') {
			a = rng.pick([-1, 2]);
			if (a === -1) {
				const pairs: [number, number][] = [
					[-4, 2],
					[-3, 1],
					[-2, 4],
					[-1, 3],
					[1, 5]
				];
				[x1, x2] = rng.pick(pairs);
			} else {
				// a = 2, roots both even so alpha is integer
				const evenPairs: [number, number][] = [
					[-4, -2],
					[-4, 2],
					[-2, 2],
					[-2, 4],
					[2, 4]
				];
				[x1, x2] = rng.pick(evenPairs);
			}
		} else {
			// hard: a = -2 or double root Delta = 0
			const isDouble = rng.pick([true, false]);
			if (isDouble) {
				a = rng.pick([1, -1, 2]);
				const x0 = rng.pick([-3, -2, -1, 1, 2, 3]);
				x1 = x0;
				x2 = x0;
			} else {
				a = rng.pick([-2, 3]);
				if (a === -2) {
					const evenPairs: [number, number][] = [
						[-4, 2],
						[-2, 2],
						[-2, 4]
					];
					[x1, x2] = rng.pick(evenPairs);
				} else {
					[x1, x2] = [-1, 1];
				}
			}
		}

		const isDoubleRoot = x1 === x2;
		const b = -a * (x1 + x2);
		const c = a * x1 * x2;
		const delta = b * b - 4 * a * c;
		const alpha = -b / (2 * a);
		const beta = -delta / (4 * a);

		const polyKatex = quadraticKatex(a, b, c);
		const polyTypst = quadraticTypst(a, b, c);

		// Canonical representation
		const alphaSignKatex = alpha === 0 ? 'x' : alpha > 0 ? `(x - ${alpha})` : `(x + ${Math.abs(alpha)})`;
		const alphaSignTypst = alpha === 0 ? 'x' : alpha > 0 ? `(x - ${alpha})` : `(x + ${Math.abs(alpha)})`;
		const aPrefixKatex = a === 1 ? '' : a === -1 ? '-' : `${a}`;
		const aPrefixTypst = a === 1 ? '' : a === -1 ? '-' : `${a}`;
		const betaSignKatex = beta === 0 ? '' : beta > 0 ? ` + ${beta}` : ` - ${Math.abs(beta)}`;
		const betaSignTypst = beta === 0 ? '' : beta > 0 ? ` + ${beta}` : ` - ${Math.abs(beta)}`;
		const canonKatex = `${aPrefixKatex}${alphaSignKatex}^2${betaSignKatex}`;
		const canonTypst = `${aPrefixTypst}${alphaSignTypst}^2${betaSignTypst}`;

		// Factorization
		let factorKatex = '';
		let factorTypst = '';
		if (isDoubleRoot) {
			factorKatex = `${aPrefixKatex}${alphaSignKatex}^2`;
			factorTypst = `${aPrefixTypst}${alphaSignTypst}^2`;
		} else {
			const x1Sign = x1 >= 0 ? `- ${x1}` : `+ ${Math.abs(x1)}`;
			const x2Sign = x2 >= 0 ? `- ${x2}` : `+ ${Math.abs(x2)}`;
			factorKatex = `${aPrefixKatex}(x ${x1Sign})(x ${x2Sign})`;
			factorTypst = `${aPrefixTypst}(x ${x1Sign})(x ${x2Sign})`;
		}

		const correctDeltaText = `$\\Delta = ${delta}$`;
		const distractors = [
			{
				text: `$\\Delta = ${b * b + 4 * a * c}$`,
				diagnosticFeedback: 'انتبه: قانون المميز هو $\\Delta = b^2 - 4ac$ مع إشارة ناقص قبل $4ac$.'
			},
			{
				text: `$\\Delta = ${b * b - 2 * a * c}$`,
				diagnosticFeedback: 'تذكر أن المعامل في المميز هو $4ac$ وليس $2ac$.'
			},
			{
				text: `$\\Delta = ${delta === 0 ? 4 : -delta}$`,
				diagnosticFeedback: 'تحقق من حسابات التربيع والضرب: $\\Delta = b^2 - 4ac$.'
			}
		];

		const mcq = buildUniqueMcqOptions(correctDeltaText, distractors, rng);

		const qTextKatex = `احسب المميز $\\Delta$ لثلاثي الحدود $P(x) = ${polyKatex}$.`;

		const rootsTextTypst = isDoubleRoot
			? `بما أن $Delta = 0$ فإن للمعادلة حلاً مضاعفاً هو: $x_0 = -frac(b, 2a) = ${x1}$، إذن $S = {${x1}}$.`
			: `بما أن $Delta = ${delta} > 0$ فإن للمعادلة حلين متمايزين هما: $x_1 = ${x1}$ و $x_2 = ${x2}$، إذن $S = {${x1}, ${x2}}$.`;

		const rootsTextKatex = isDoubleRoot
			? `بما أن $\\Delta = 0$ فإن للمعادلة حلاً مضاعفاً هو $x_0 = ${x1}$، إذن $S = \\{${x1}\\}$.`
			: `بما أن $\\Delta = ${delta} > 0$ فإن للمعادلة حلين متمايزين هما $x_1 = ${x1}$ و $x_2 = ${x2}$، إذن $S = \\{${x1} ; ${x2}\\}$.`;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر ثلاثي الحدود من الدرجة الثانية المعرّف على $bb(R)$ بـ: $P(x) = ${polyTypst}$.`,
			content: [
				{
					type: 'text',
					content: `1) اكتب ثلاثي الحدود $P(x)$ على الشكل النموذجي.`,
					answer: `1) الشكل النموذجي هو: $P(x) = a [ (x + frac(b, 2a))^2 - frac(Delta, 4a^2) ] = ${canonTypst}$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) احسب المميز $Delta$، ثم استنتج حلول المعادلة $P(x) = 0$ في $bb(R)$.`,
					answer: `2) لدينا $Delta = b^2 - 4 a c = (${b})^2 - 4(${a})(${c}) = ${delta}$. ${rootsTextTypst}`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) حلّل $P(x)$ إلى جداء عاملين من الدرجة الأولى.`,
					answer: `3) التحليل إلى جداء عوامل: $P(x) = ${factorTypst}$.`,
					mark: '1'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
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
				explanation: `نحسب المميز: $\\Delta = b^2 - 4ac = (${b})^2 - 4(${a})(${c}) = ${b * b} - (${4 * a * c}) = ${delta}$.`
			},
			sujetExercise,
			hints: [
				`لحساب المميز، عيّن أولاً المعاملات: $a = ${a}$، $b = ${b}$، $c = ${c}$.`,
				`طبّق القانون: $\\Delta = b^2 - 4ac$.`,
				`الشكل النموذجي يكتب على الصورة $a(x - \\alpha)^2 + \\beta$ حيث $\\alpha = -\\frac{b}{2a}$ و $\\beta = -\\frac{\\Delta}{4a}$.`
			],
			solutionStepsAr: [
				`المميز: $\\Delta = (${b})^2 - 4(${a})(${c}) = ${delta}$.`,
				rootsTextKatex,
				`الشكل النموذجي: $P(x) = ${canonKatex}$، وتحليله: $P(x) = ${factorKatex}$.`
			],
			finalAnswer: `\\Delta = ${delta}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Rational Signs & Inequalities with Forbidden Values (المتراجحات الكسرية)
// ═══════════════════════════════════════════════════════════════════════════════

const rationalSignIneqTemplate: ParameterizedTemplate = {
	id: 'tpl_1as_tcst_t2_rational_sign_ineq',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'algebra',
	titleAr: 'دراسة إشارة حاصل القسمة وحل المتراجحات الكسرية',
	curriculumLessonId: 'lesson_1as_tcst_t2_sign_tables_rational_inequalities',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// x0 = forbidden value, x1 = root of numerator
		const distinctVals = rng.pickDistinct([-4, -3, -2, -1, 1, 2, 3, 4], 2);
		const x0 = distinctVals[0]; // denominator root (forbidden)
		const x1 = distinctVals[1]; // numerator root

		let a = 1;
		let c = 1;
		let k = 0;
		let ineqType: '<=' | '>=' = '<=';

		if (difficulty === 'easy') {
			a = 1;
			c = 1;
			k = 0;
			ineqType = rng.pick(['<=', '>=']);
		} else if (difficulty === 'medium') {
			// Expressed as (ax + b)/(cx + d) <= k reducing to (x - x1)/(x - x0) <= 0
			k = rng.pick([1, 2]);
			c = 1;
			a = k + 1; // so a - k = 1
			ineqType = '<=';
		} else {
			// hard: negative leading coefficient a = -1
			a = -1;
			c = 1;
			k = 0;
			ineqType = rng.pick(['<=', '>=']);
		}

		// R(x) = (num) / (den) <= 0 (or >= 0)
		// Reduced numerator: a_red * x + b_red where a_red = a - k * c
		const aRed = a - k * c;
		const bRed = -aRed * x1;
		const cRed = c;
		const dRed = -c * x0;

		// Original numerator before reduction
		const origB = bRed - k * dRed;

		const origNumKatex = linearKatex(a, origB);
		const origNumTypst = linearTypst(a, origB);
		const origDenKatex = linearKatex(c, dRed);
		const origDenTypst = linearTypst(c, dRed);

		const ineqSymbolKatex = ineqType === '<=' ? '\\le' : '\\ge';
		const ineqSymbolTypst = ineqType === '<=' ? '<=' : '>=';

		const displayIneqKatex =
			k === 0
				? `\\frac{${origNumKatex}}{${origDenKatex}} ${ineqSymbolKatex} 0`
				: `\\frac{${origNumKatex}}{${origDenKatex}} ${ineqSymbolKatex} ${k}`;

		const displayIneqTypst =
			k === 0
				? `frac(${origNumTypst}, ${origDenTypst}) ${ineqSymbolTypst} 0`
				: `frac(${origNumTypst}, ${origDenTypst}) ${ineqSymbolTypst} ${k}`;

		const reducedNumKatex = linearKatex(aRed, bRed);
		const reducedNumTypst = linearTypst(aRed, bRed);

		// Solution intervals
		const u = Math.min(x0, x1);
		const v = Math.max(x0, x1);
		const prodLeading = aRed * cRed;

		let solKatex = '';
		let solTypst = '';

		// If prodLeading > 0, quotient is negative inside [u, v] and positive outside
		// If prodLeading < 0, quotient is positive inside [u, v] and negative outside
		const wantsNegative = ineqType === '<=';
		const isInside = (prodLeading > 0 && wantsNegative) || (prodLeading < 0 && !wantsNegative);

		if (isInside) {
			if (x1 < x0) {
				solKatex = `[${x1} ; ${x0}[`;
				solTypst = `[${x1}, ${x0}[`;
			} else {
				solKatex = `]${x0} ; ${x1}]`;
				solTypst = `]${x0}, ${x1}]`;
			}
		} else {
			if (x1 < x0) {
				solKatex = `]-\\infty ; ${x1}] \\cup ]${x0} ; +\\infty[`;
				solTypst = `]-infinity, ${x1}] union ]${x0}, +infinity[`;
			} else {
				solKatex = `]-\\infty ; ${x0}[ \\cup [${x1} ; +\\infty[`;
				solTypst = `]-infinity, ${x0}[ union [${x1}, +infinity[`;
			}
		}

		// Wrong distractor 1: closed bracket at forbidden value
		let wrongForbiddenKatex = '';
		if (isInside) {
			wrongForbiddenKatex = x1 < x0 ? `[${x1} ; ${x0}]` : `[${x0} ; ${x1}]`;
		} else {
			wrongForbiddenKatex =
				x1 < x0
					? `]-\\infty ; ${x1}] \\cup [${x0} ; +\\infty[`
					: `]-\\infty ; ${x0}] \\cup [${x1} ; +\\infty[`;
		}

		// Wrong distractor 2: inverted inequality
		let wrongInvertedKatex = '';
		if (!isInside) {
			wrongInvertedKatex = x1 < x0 ? `[${x1} ; ${x0}[` : `]${x0} ; ${x1}]`;
		} else {
			wrongInvertedKatex =
				x1 < x0
					? `]-\\infty ; ${x1}] \\cup ]${x0} ; +\\infty[`
					: `]-\\infty ; ${x0}[ \\cup [${x1} ; +\\infty[`;
		}

		// Wrong distractor 3: open at both ends
		let wrongOpenKatex = isInside
			? `]${u} ; ${v}[`
			: `]-\\infty ; ${u}[ \\cup ]${v} ; +\\infty[`;

		const correctSolText = `$S = ${solKatex}$`;
		const distractors = [
			{
				text: `$S = ${wrongForbiddenKatex}$`,
				diagnosticFeedback: `انتبه: القيمة الممنوعة $x = ${x0}$ تعدم المقام، لذا يجب فتح المجال عندها دوماً.`
			},
			{
				text: `$S = ${wrongInvertedKatex}$`,
				diagnosticFeedback: `تحقق من إشارة حاصل القسمة، المطلوب هو تلبية المتراجحة $${ineqSymbolKatex} 0$.`
			},
			{
				text: `$S = ${wrongOpenKatex}$`,
				diagnosticFeedback: `انتبه: عند بسط الكسر ينعدم حاصل القسمة، وبما أن المتراجحة غير مشددة (${ineqSymbolKatex}) يجب غلق المجال عند $x = ${x1}$.`
			}
		];

		const mcq = buildUniqueMcqOptions(correctSolText, distractors, rng);

		const qTextKatex = `عيّن مجموعة حلول المتراجحة الكسرية في $\\mathbb{R}$: $${displayIneqKatex}$.`;

		const reductionTypst =
			k === 0
				? ''
				: `ننقل $${k}$ إلى الطرف الأيسر ونوحد المقامات: $frac(${origNumTypst}, ${origDenTypst}) - ${k} = frac(${origNumTypst} - ${k}(${origDenTypst}), ${origDenTypst}) = frac(${reducedNumTypst}, ${origDenTypst}) <= 0$. `;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر المتراجحة الكسرية التالية المعرفة في $bb(R)$: $${displayIneqTypst}$.`,
			content: [
				{
					type: 'text',
					content: `1) عيّن القيمة الممنوعة لهذه المتراجحة، ثم استنتج مجموعة تعريف العبارة الكسرية.`,
					answer: `1) القيمة الممنوعة تعدم المقام $${origDenTypst} = 0 \\iff x = ${x0}$. إذن مجموعة التعريف هي: $D = bb(R) backslash {${x0}}$.`,
					mark: '0.5'
				},
				{
					type: 'text',
					content: `2) ادرس إشارة كل من البسط والمقام، ثم شكّل جدول إشارة منظم لحاصل القسمة.`,
					answer: `2) ${reductionTypst}البسط $${reducedNumTypst}$ ينعدم عند $x = ${x1}$، والمقام $${origDenTypst}$ ينعدم عند $x = ${x0}$ (قيمة ممنوعة بخطين متوازيين). حاصل القسمة يأخذ إشارة سالبة على المجال المطلوب.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `3) استنتج مجموعة حلول المتراجحة في $bb(R)$.`,
					answer: `3) انطلاقاً من جدول الإشارة، مجموعة الحلول هي: $S = ${solTypst}$.`,
					mark: '1'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
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
				explanation: `القيمة الممنوعة هي $x = ${x0}$ (المجال مفتوح عندها)، وجذر البسط هو $x = ${x1}$ (المجال مغلق عنده). بدراسة إشارة الجداء/القسمة نجد: $S = ${solKatex}$.`
			},
			sujetExercise,
			hints: [
				`عيّن أولاً القيمة الممنوعة بجعل المقام يساوي الصفر: $x = ${x0}$.`,
				`إذا كان الطرف الأيمن غير معدوم، انقله إلى الطرف الأيسر ووحد المقامات.`,
				`شكّل جدول إشارة يتضمن سطراً للبسط وسطراً للمقام وسطراً لحاصل القسمة (مع خطين متوازيين عند القيمة الممنوعة).`
			],
			solutionStepsAr: [
				`القيمة الممنوعة هي $x = ${x0}$، إذن مجموعة التعريف هي $D = \\mathbb{R} \\setminus \\{${x0}\\}$.`,
				`ينعدم البسط عند $x = ${x1}$، وينعدم المقام عند $x = ${x0}$.`,
				`بقراءة السطر الأخير من جدول الإشارة نجد: $S = ${solKatex}$.`
			],
			finalAnswer: `S = ${solKatex}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Plane Vectors, Collinearity & Cartesian Line (الأشعة ومعادلة المستقيم)
// ═══════════════════════════════════════════════════════════════════════════════

const vectorsCartesianLineTemplate: ParameterizedTemplate = {
	id: 'tpl_1as_tcst_t2_vectors_cartesian_line',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'geometry',
	titleAr: 'الحساب الشعاعي ومعادلة المستقيم الديكارتية وشعاع التوجيه',
	curriculumLessonId: 'lesson_1as_tcst_t2_cartesian_equations_of_lines',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const xA = rng.int(-3, 3);
		const yA = rng.int(-3, 3);

		// Vector AB components
		const pythTriples: [number, number][] = [
			[3, 4],
			[4, 3],
			[-3, 4],
			[3, -4],
			[-4, 3],
			[4, -3],
			[1, 2],
			[2, 1],
			[-2, 1],
			[1, -2]
		];
		const [uX, uY] = rng.pick(pythTriples);
		const xB = xA + uX;
		const yB = yA + uY;

		const distSq = uX * uX + uY * uY;
		const isPerfectDist = Math.round(Math.sqrt(distSq)) ** 2 === distSq;
		const distVal = isPerfectDist ? Math.round(Math.sqrt(distSq)) : 0;
		const distKatex = isPerfectDist ? `${distVal}` : `\\sqrt{${distSq}}`;
		const distTypst = isPerfectDist ? `${distVal}` : `sqrt(${distSq})`;

		// Line (AB) equation: uY*(x - xA) - uX*(y - yA) = 0
		// L_a * x + L_b * y + L_c = 0
		let la = uY;
		let lb = -uX;
		let lc = uX * yA - uY * xA;

		const g = gcd(gcd(Math.abs(la), Math.abs(lb)), Math.abs(lc));
		la /= g;
		lb /= g;
		lc /= g;
		if (la < 0 || (la === 0 && lb < 0)) {
			la = -la;
			lb = -lb;
			lc = -lc;
		}

		const eqKatex = lineEqKatex(la, lb, lc);
		const eqTypst = lineEqTypst(la, lb, lc);

		// Point C: collinear or non-collinear
		const isCollinear = rng.pick([true, false]);
		let xC = 0;
		let yC = 0;
		if (isCollinear) {
			const k = rng.pick([2, -1]);
			xC = xA + k * uX;
			yC = yA + k * uY;
		} else {
			xC = xA + uX + rng.pick([1, -1, 2]);
			yC = yA - uY + 1;
		}

		// det(AB, AC) = uX * (yC - yA) - uY * (xC - xA)
		const vX = xC - xA;
		const vY = yC - yA;
		const detVal = uX * vY - uY * vX;
		const collinearKatex =
			detVal === 0
				? `بما أن $\\det(\\vec{AB}, \\vec{AC}) = 0$ فإن الشعاعين مرتبطان خطياً، والنقط $A$، $B$ و $C$ في استقامية.`
				: `بما أن $\\det(\\vec{AB}, \\vec{AC}) = ${detVal} \\neq 0$ فإن الشعاعين غير مرتبطين خطياً، والنقط $A$، $B$ و $C$ ليست في استقامية (تشكل مثلثاً).`;
		const collinearTypst =
			detVal === 0
				? `بما أن $det(arrow(A B), arrow(A C)) = 0$ فإن الشعاعين مرتبطان خطياً، والنقط $A$، $B$ و $C$ في استقامية.`
				: `بما أن $det(arrow(A B), arrow(A C)) = ${detVal} != 0$ فإن الشعاعين غير مرتبطين خطياً، والنقط $A$، $B$ و $C$ ليست في استقامية (تشكل مثلثاً).`;

		const correctEqText = `$${eqKatex}$`;
		const distractors = [
			{
				text: `$${lineEqKatex(la, -lb, lc)}$`,
				diagnosticFeedback: 'انتبه لإشارة معامل $y$ في معادلة المستقيم الديكارتية.'
			},
			{
				text: `$${lineEqKatex(lb, la, lc)}$`,
				diagnosticFeedback: 'انتبه: لا تعكس بين معاملي $x$ و $y$ في المعادلة الديكارتية.'
			},
			{
				text: `$${lineEqKatex(la, lb, -lc)}$`,
				diagnosticFeedback: 'تحقق من حساب الحد الثابت $c$ بتعويض إحداثيات النقطة $A$.'
			}
		];

		const mcq = buildUniqueMcqOptions(correctEqText, distractors, rng);

		const qTextKatex = `عيّن معادلة ديكارتية للمستقيم $(AB)$ المار بالنقطتين $A(${xA} ; ${yA})$ و $B(${xB} ; ${yB})$.`;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `في المستوي المنسوب إلى معلَم متعامد ومتجانس $(O ; arrow(i), arrow(j))$، نعتبر النقط: $A(${xA}, ${yA})$، $B(${xB}, ${yB})$ و $C(${xC}, ${yC})$.`,
			content: [
				{
					type: 'text',
					content: `1) احسب مركبتي الشعاع $arrow(A B)$، ثم احسب المسافة المضبوطة $A B$.`,
					answer: `1) لدينا $arrow(A B)(${xB} - (${xA}), ${yB} - (${yA})) = (${uX}, ${uY})$. والمسافة: $A B = sqrt((${uX})^2 + (${uY})^2) = ${distTypst}$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) احسب مركبتي الشعاع $arrow(A C)$، ثم بيّن باستعمال شرط الارتباط الخطي هل النقط $A$، $B$ و $C$ في استقامية.`,
					answer: `2) لدينا $arrow(A C)(${vX}, ${vY})$. نحسب المحدد: $det(arrow(A B), arrow(A C)) = (${uX}) times (${vY}) - (${uY}) times (${vX}) = ${detVal}$. ${collinearTypst}`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) عيّن معادلة ديكارتية للمستقيم $(A B)$، وحدد شعاع توجيه $arrow(u)$ له.`,
					answer: `3) النقطة $M(x, y) in (A B) arrow.l.r.double det(arrow(A M), arrow(A B)) = 0$. نجد المعادلة الديكارتية المبسطة: $${eqTypst}$ وشعاع توجيهه $arrow(u)(${-lb}, ${la})$.`,
					mark: '1'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
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
				explanation: `مركبتا شعاع التوجيه هما $\\vec{AB}(${uX} ; ${uY})$. المعادلة تكتب على شكل $${uY}(x - (${xA})) - ${uX}(y - (${yA})) = 0$，بالتبسيط والقسمة على القاسم المشترك الأكبر نجد: $${eqKatex}$.`
			},
			sujetExercise,
			hints: [
				`مركبتا الشعاع $\\vec{AB}$ هما: $(x_B - x_A ; y_B - y_A)$.`,
				`المسافة $AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$.`,
				`النقطة $M(x ; y)$ تنتمي إلى المستقيم $(AB)$ إذا وفقط إذا كان الشعاعان $\\vec{AM}$ و $\\vec{AB}$ مرتبطين خطياً.`
			],
			solutionStepsAr: [
				`مركبتا الشعاع: $\\vec{AB}(${uX} ; ${uY})$، والمسافة $AB = ${distKatex}$.`,
				collinearKatex,
				`المعادلة الديكارتية للمستقيم $(AB)$ هي: $${eqKatex}$.`
			],
			finalAnswer: eqKatex
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Oriented Trig Circle, Radians & Trigonometric Ratios (الدائرة المثلثية)
// ═══════════════════════════════════════════════════════════════════════════════

const trigCircleRatiosTemplate: ParameterizedTemplate = {
	id: 'tpl_1as_tcst_t2_trig_circle_ratios',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'geometry',
	titleAr: 'الدائرة المثلثية، الزوايا بالراديان والنسب المثلثية',
	curriculumLessonId: 'lesson_1as_tcst_t2_oriented_circle_trigonometric_ratios',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Pythagorean triples: [p, q, r] where p^2 + r^2 = q^2
		// sin(x) = p / q, cos(x) = +- r / q
		const triples: [number, number, number][] = [
			[3, 5, 4],
			[4, 5, 3],
			[5, 13, 12],
			[12, 13, 5]
		];
		const [p, q, r] = rng.pick(triples);

		let quadrantNameAr = '';
		let intervalKatex = '';
		let intervalTypst = '';
		let cosSign = 1; // +1 or -1
		let sinVal = p / q;
		let angleRadApprox = 0;

		if (difficulty === 'easy') {
			quadrantNameAr = 'الربع الأول';
			intervalKatex = '[0 ; \\frac{\\pi}{2}]';
			intervalTypst = '[0, frac(pi, 2)]';
			cosSign = 1;
			angleRadApprox = Math.asin(sinVal);
		} else if (difficulty === 'medium') {
			quadrantNameAr = 'الربع الثاني';
			intervalKatex = '[\\frac{\\pi}{2} ; \\pi]';
			intervalTypst = '[frac(pi, 2), pi]';
			cosSign = -1;
			angleRadApprox = Math.PI - Math.asin(sinVal);
		} else {
			quadrantNameAr = 'الربع الثالث';
			intervalKatex = '[\\pi ; \\frac{3\\pi}{2}]';
			intervalTypst = '[pi, frac(3 pi, 2)]';
			cosSign = -1;
			// In quadrant 3, sin is negative: sin(x) = -p / q
			sinVal = -p / q;
			angleRadApprox = Math.PI + Math.asin(p / q);
		}

		const sinKatex = fracKatex(sinVal < 0 ? -p : p, q);
		const sinTypst = fracTypst(sinVal < 0 ? -p : p, q);
		const cosNum = cosSign * r;
		const cosKatex = fracKatex(cosNum, q);
		const cosTypst = fracTypst(cosNum, q);

		// tan(x) = sin(x) / cos(x) = (sinVal) / (cosSign * r / q)
		const tanNum = sinVal < 0 ? -p : p;
		const tanDen = cosNum;
		const [tanN, tanD] = simplifyFraction(tanNum, tanDen);
		const tanKatex = fracKatex(tanN, tanD);
		const tanTypst = fracTypst(tanN, tanD);

		// Expression E(x) = cos(pi - x) + sin(pi/2 - x) - 2*sin(pi - x) + cos(pi + x)
		// cos(pi - x) = -cos(x)
		// sin(pi/2 - x) = cos(x)
		// sin(pi - x) = sin(x)
		// cos(pi + x) = -cos(x)
		// E(x) = -cos(x) + cos(x) - 2*sin(x) - cos(x) = -cos(x) - 2*sin(x)
		const eNum = -cosNum * 1 - 2 * (sinVal < 0 ? -p : p);
		const [eSimpN, eSimpD] = simplifyFraction(eNum, q);
		const eKatex = fracKatex(eSimpN, eSimpD);
		const eTypst = fracTypst(eSimpN, eSimpD);

		// Generate SVG circle visualization
		const trigSvg = svgTrigonometricCircle({
			anglesRad: [{ rad: angleRadApprox, label: 'x', color: '#dc2626' }]
		});
		const trigImgPath = saveSvgAsset(`1as_tcst_t2_trig_${difficulty}_s${seed}`, trigSvg);

		const correctCosText = `$\\cos(x) = ${cosKatex}$`;
		const distractors = [
			{
				text: `$\\cos(x) = ${fracKatex(-cosNum, q)}$`,
				diagnosticFeedback: `انتبه: بما أن $x \\in ${intervalKatex}$ (${quadrantNameAr})، فإن $\\cos(x)$ يكون ${cosSign > 0 ? 'موجباً' : 'سالباً'}.`
			},
			{
				text: `$\\cos(x) = ${fracKatex(q - p, q)}$`,
				diagnosticFeedback: 'تذكر تطبيق العلاقة الأساسية بالتربيع $\\cos^2(x) + \\sin^2(x) = 1$ وليس الجمع المباشر.'
			},
			{
				text: `$\\cos(x) = ${fracKatex(cosNum * cosNum, q * q)}$`,
				diagnosticFeedback: 'لا تنس أخذ الجذر التربيعي للنتيجة بعد حساب $\\cos^2(x) = 1 - \\sin^2(x)$.'
			}
		];

		const mcq = buildUniqueMcqOptions(correctCosText, distractors, rng);

		const qTextKatex = `ليكن $x \\in ${intervalKatex}$ حيث $\\sin(x) = ${sinKatex}$. احسب القيمة المضبوطة لـ $\\cos(x)$.`;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر الدائرة المثلثية الموجهة في الاتجاه المباشر، وليكن $x$ عدداً حقيقياً من المجال $${intervalTypst}$ حيث: $sin(x) = ${sinTypst}$.`,
			content: [
				{
					type: 'text',
					content: `1) باستعمال العلاقة المثلثية الأساسية $cos^2(x) + sin^2(x) = 1$، احسب القيمة المضبوطة لـ $cos(x)$ مبرراً إشارتها.`,
					answer: `1) لدينا $cos^2(x) = 1 - sin^2(x) = 1 - (${sinTypst})^2 = frac(${r * r}, ${q * q})$. وبما أن $x in ${intervalTypst}$ (${quadrantNameAr})، فإن $cos(x) ${cosSign > 0 ? '>= 0' : '<= 0'}$، ومنه: $cos(x) = ${cosTypst}$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) احسب القيمة المضبوطة لـ $tan(x)$.`,
					answer: `2) لدينا $tan(x) = frac(sin(x), cos(x)) = frac(${sinTypst}, ${cosTypst}) = ${tanTypst}$.`,
					mark: '0.75'
				},
				{
					type: 'text',
					content: `3) بسّط العبارة المثلثية التالية ثم احسب قيمتها العددية: $E(x) = cos(pi - x) + sin(frac(pi, 2) - x) - 2 sin(pi - x) + cos(pi + x)$.`,
					answer: `3) باستعمال دساتير الزوايا المرفقة: $cos(pi - x) = -cos(x)$، $sin(frac(pi, 2) - x) = cos(x)$، $sin(pi - x) = sin(x)$، و $cos(pi + x) = -cos(x)$. إذن: $E(x) = -cos(x) - 2 sin(x) = -(${cosTypst}) - 2(${sinTypst}) = ${eTypst}$.`,
					mark: '1.25'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
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
				explanation: `نطبق العلاقة: $\\cos^2(x) = 1 - \\sin^2(x) = 1 - \\frac{${p * p}}{${q * q}} = \\frac{${r * r}}{${q * q}}$. بما أن $x \\in ${intervalKatex}$، فإن إشارة جيب التمام سالبة/موجبة، ومنه $\\cos(x) = ${cosKatex}$.`
			},
			sujetExercise,
			hints: [
				`طبّق العلاقة الأساسية: $\\cos^2(x) + \\sin^2(x) = 1$.`,
				`انتبه لإشارة $\\cos(x)$ في ${quadrantNameAr}: الفاصلة تكون ${cosSign > 0 ? 'موجبة' : 'سالبة'}.`,
				`لحساب $\\tan(x)$، اقسم الجيب على جيب التمام: $\\tan(x) = \\frac{\\sin(x)}{\\cos(x)}$.`
			],
			solutionStepsAr: [
				`حساب $\\cos(x)$: $\\cos^2(x) = 1 - (${sinKatex})^2 = \\frac{${r * r}}{${q * q}}$، ومنه $\\cos(x) = ${cosKatex}$.`,
				`حساب $\\tan(x)$: $\\tan(x) = \\frac{${sinKatex}}{${cosKatex}} = ${tanKatex}$.`,
				`تبسيط $E(x) = -\\cos(x) - 2\\sin(x) = ${eKatex}$.`
			],
			finalAnswer: `\\cos(x) = ${cosKatex}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Comprehensive Analytical Synthesis Problem (المسألة الشاملة — 8 نقاط)
// ═══════════════════════════════════════════════════════════════════════════════

const problemSynthesisTemplate: ParameterizedTemplate = {
	id: 'tpl_1as_tcst_t2_problem_synthesis',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'integration',
	isIntegration: true,
	titleAr: 'مسألة شاملة: دراسة دالة من الدرجة الثانية، نقط التقاطع وتطبيق في الاستمثال',
	curriculumLessonId: 'lesson_1as_tcst_t2_reference_functions_properties_graphs',
	defaultPoints: 8,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Quadratic function f(x) = -x^2 + 2*alpha*x on [0, 2*alpha]
		// Vertex at x = alpha, max value = alpha^2
		const alpha = rng.pick([2, 3, 4]);
		const twoAlpha = 2 * alpha;
		const maxVal = alpha * alpha;

		// Line (D): y = m*x + p intersecting curve at distinct integer points x1 < x2 in [0, 2*alpha]
		// We want -x^2 + 2*alpha*x = m*x + p  <=>  x^2 + (m - 2*alpha)*x + p = 0
		// Choosing x1, x2:
		let x1 = 1;
		let x2 = alpha + 1;
		if (alpha === 2) {
			x1 = 1;
			x2 = 3;
		} else if (alpha === 3) {
			const pairs: [number, number][] = [
				[1, 4],
				[1, 5],
				[2, 4]
			];
			[x1, x2] = rng.pick(pairs);
		} else {
			// alpha = 4
			const pairs: [number, number][] = [
				[1, 6],
				[2, 5],
				[2, 6]
			];
			[x1, x2] = rng.pick(pairs);
		}

		// m = 2*alpha - (x1 + x2), p = x1 * x2
		const m = twoAlpha - (x1 + x2);
		const p = x1 * x2;

		const f = (x: number) => -x * x + twoAlpha * x;
		const y1 = f(x1);
		const y2 = f(x2);

		const lineStrKatex = linearKatex(m, p);
		const lineStrTypst = linearTypst(m, p);

		// Area modeling: Rectangular plot with perimeter of 3 sides = 4*alpha
		// Width = x in [0, 2*alpha], Length = 4*alpha - 2*x
		// Area A(x) = x * (4*alpha - 2*x) = 2*(-x^2 + 2*alpha*x) = 2*f(x)
		const maxArea = 2 * maxVal;
		const optWidth = alpha;
		const optLength = 4 * alpha - 2 * optWidth;

		// Generate curve plot SVG using svgFunctionCurvePlot
		const plotSvg = svgFunctionCurvePlot({
			fn: (x) => -x * x + twoAlpha * x,
			xMin: -0.5,
			xMax: twoAlpha + 0.5,
			yMin: -1,
			yMax: maxVal + 2,
			curveLabel: 'C_f',
			asymptotes: [
				{
					kind: 'oblique',
					a: m,
					b: p,
					label: `(D): y = ${lineStrKatex}`,
					color: '#16a34a'
				}
			],
			points: [
				{ x: alpha, y: maxVal, label: `S(${alpha}, ${maxVal})`, color: '#dc2626' },
				{ x: x1, y: y1, label: `A(${x1}, ${y1})`, color: '#2563eb' },
				{ x: x2, y: y2, label: `B(${x2}, ${y2})`, color: '#2563eb' }
			],
			width: 380,
			height: 260
		});

		const plotImgPath = saveSvgAsset(`1as_tcst_t2_problem_${difficulty}_s${seed}`, plotSvg);

		const correctMaxText = `$${maxArea} \\text{ m}^2$`;
		const distractors = [
			{
				text: `$${maxVal} \\text{ m}^2$`,
				diagnosticFeedback: 'انتبه: مساحة القطعة هي $\\mathcal{A}(x) = 2f(x)$، نسيت الضرب في المعامل $2$.'
			},
			{
				text: `$${maxArea + 4} \\text{ m}^2$`,
				diagnosticFeedback: 'تحقق من حساب صورة الفاصلة المثلى $x = \\alpha$ في عبارة المساحة.'
			},
			{
				text: `$${optWidth * optLength * 2} \\text{ m}^2$`,
				diagnosticFeedback: 'مساحة المستطيل هي الطول في العرض، تحقق من جداء البعدين.'
			}
		];

		const mcq = buildUniqueMcqOptions(correctMaxText, distractors, rng);

		const qTextKatex = `في المسألة الشاملة، ما هي المساحة الأعظمية $\\mathcal{A}_{\\max}$ للقطعة المستطيلة بالمتر المربع (علماً أن $\\mathcal{A}(x) = 2f(x)$)؟`;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `تتكون هذه المسألة الشاملة من ثلاثة أجزاء مترابطة تهدف لدراسة دالة من الدرجة الثانية وتطبيقها في ترييض مشكلة هندسية واستثمار النتائج بيانيا وجبريا:`,
			content: [
				{
					type: 'text',
					content: `الجزء الأول: الدراسة التحليلية للدالة $f$\nنعتبر الدالة العددية $f$ المعرفة على المجال $[0, ${twoAlpha}]$ بالدستور: $f(x) = -x^2 + ${twoAlpha}x$.\n1) اكتب $f(x)$ على الشكل النموذجي: $f(x) = -(x - alpha)^2 + beta$.`,
					answer: `1) نخرج الإشارة السالبة عاملا مشتركا: $f(x) = -(x^2 - ${twoAlpha}x) = -[(x - ${alpha})^2 - ${maxVal}] = -(x - ${alpha})^2 + ${maxVal}$. إذن $alpha = ${alpha}$ و $beta = ${maxVal}$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) ادرس اتجاه تغير الدالة $f$ على المجالين $[0, ${alpha}]$ و $[${alpha}, ${twoAlpha}]$، ثم شكّل جدول تغيراتها.`,
					answer: `2) الدالة $f$ متزايدة تماما على $[0, ${alpha}]$ لأنها مكافئة لـ $-(x - ${alpha})^2$ مع إشارة سالبة، ومتناقصة تماما على $[${alpha}, ${twoAlpha}]$. جدول التغيرات يظهر تزايدا من $f(0) = 0$ إلى القيمة الحدية $f(${alpha}) = ${maxVal}$، ثم تناقصا إلى $f(${twoAlpha}) = 0$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) عيّن القيمة الحدية العظمى للدالة $f$ والسابقة التي تبلغها عندها.`,
					answer: `3) القيمة الحدية العظمى للدالة $f$ هي $M = ${maxVal}$ وتبلغها عند $x = ${alpha}$.`,
					mark: '0.5'
				},
				{
					type: 'image',
					src: plotImgPath,
					caption: 'التمثيل البياني للمنحنى (Cf) والمستقيم (D)',
					width: 380
				},
				{
					type: 'text',
					content: `4) بقراءة بيانية، حدد إحداثيات نقطتي تقاطع المنحنى $(C_f)$ مع محور الفواصل.`,
					answer: `4) يتقاطع $(C_f)$ مع محور الفواصل في النقطتين $(0, 0)$ و $(${twoAlpha}, 0)$.`,
					mark: '0.5'
				},
				{
					type: 'text',
					content: `الجزء الثاني: دراسة الأوضاع النسبية ونقط التقاطع\nليكن $(D)$ المستقيم ذا المعادلة الديكارتية: $y = ${lineStrTypst}$.\n1) حل جبريا في المجال $[0, ${twoAlpha}]$ المعادلة $f(x) = ${lineStrTypst}$، واستنتج إحداثيات نقطتي التقاطع $A$ و $B$ بين $(C_f)$ و $(D)$.`,
					answer: `1) $f(x) = ${lineStrTypst} arrow.l.r.double -x^2 + ${twoAlpha}x = ${lineStrTypst} arrow.l.r.double x^2 - ${x1 + x2}x + ${p} = 0$. حلول المعادلة هي $x_1 = ${x1}$ و $x_2 = ${x2}$. إذن نقطتا التقاطع هما $A(${x1}, ${y1})$ و $B(${x2}, ${y2})$.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `2) حدد الوضع النسبي للمنحنى $(C_f)$ والمستقيم $(D)$ على المجال $[0, ${twoAlpha}]$.`,
					answer: `2) ندرس إشارة الفرق $f(x) - (${lineStrTypst}) = -(x - ${x1})(x - ${x2})$. المنحنى $(C_f)$ يقع فوق $(D)$ على المجال $]${x1}, ${x2}[$، ويقع تحته على المجالين $[0, ${x1}[$ و $]${x2}, ${twoAlpha}]$، ويقطعه في النقطتين $A$ و $B$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `الجزء الثالث: ترييض مشكلة هندسية واستثمار النتائج (الاستمثال)\nيريد فلاح إحاطة قطعة أرض مستطيلة الشكل تقع بمحاذاة قناة ري مستقيمة (بحيث لا تحتاج سياجا من جهة القناة). طول السياج الإجمالي المتوفر هو $${4 * alpha}$ مترا. نرمز بـ $x$ لعرض القطعة المتعامد مع القناة (بالمتر)، حيث $0 <= x <= ${twoAlpha}$.\n1) بيّن أن مساحة القطعة بالمتر المربع تُعطى بالدستور: $cal(A)(x) = 2 f(x)$.`,
					answer: `1) طول القطعة الموازي للقناة هو $y = ${4 * alpha} - 2x$. إذن المساحة: $cal(A)(x) = x times y = x(${4 * alpha} - 2x) = -2x^2 + ${4 * alpha}x = 2(-x^2 + ${twoAlpha}x) = 2 f(x)$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) بالاعتماد على دراسة الجزء الأول، عيّن أبعاد القطعة المستطيلة ($x$ و $y$) حتى تكون مساحتها أعظمية، ثم احسب هذه المساحة الأعظمية بالمتر المربع ($m^2$).`,
					answer: `2) تبلغ الدالة $f(x)$ قيمتها العظمى $M = ${maxVal}$ عند $x = ${alpha}$. إذن تكون المساحة أعظمية عندما يكون العرض $x = ${optWidth} upright("m")$ والطول $y = ${4 * alpha} - 2(${optWidth}) = ${optLength} upright("m")$، والمساحة الأعظمية هي: $cal(A)(${alpha}) = 2 f(${alpha}) = 2 times ${maxVal} = ${maxArea} upright("m")^2$.`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
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
				explanation: `القيمة العظمى للدالة $f(x)$ هي $f(${alpha}) = ${maxVal}$. وبما أن $\\mathcal{A}(x) = 2f(x)$، فإن المساحة الأعظمية هي $\\mathcal{A}(${alpha}) = 2 \\times ${maxVal} = ${maxArea} \\text{ m}^2$.`
			},
			sujetExercise,
			hints: [
				`استعمل الشكل النموذجي لحساب القيمة الحدية العظمى للدالة $f$.`,
				`تقاطع المنحنى والمستقيم يكافئ حل المعادلة $f(x) = mx + p$.`,
				`المساحة $\\mathcal{A}(x) = 2f(x)$ تبلغ قيمتها العظمى عند نفس القيمة $x = ${alpha}$ التي تعظم الدالة $f$.`
			],
			solutionStepsAr: [
				`الشكل النموذجي للدالة: $f(x) = -(x - ${alpha})^2 + ${maxVal}$، وقيمتها العظمى هي $${maxVal}$ عند $x = ${alpha}$.`,
				`نقطتا تقاطع المنحنى $(C_f)$ مع المستقيم $(D)$ هما $A(${x1} ; ${y1})$ و $B(${x2} ; ${y2})$.`,
				`المساحة الأعظمية للقطعة هي $\\mathcal{A}(${alpha}) = 2 \\times ${maxVal} = ${maxArea} \\text{ m}^2$ عند $x = ${optWidth} \\text{ m}$ و $y = ${optLength} \\text{ m}$.`
			],
			finalAnswer: `${maxArea} \\text{ m}^2`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Export All 6 Deterministic Templates for 1AS TCST Trimester 2
// ═══════════════════════════════════════════════════════════════════════════════

export const TEMPLATES_1AS_TCST_T2: ParameterizedTemplate[] = [
	referenceFnTranslationTemplate,
	canonicalDiscriminantTemplate,
	rationalSignIneqTemplate,
	vectorsCartesianLineTemplate,
	trigCircleRatiosTemplate,
	problemSynthesisTemplate
];
