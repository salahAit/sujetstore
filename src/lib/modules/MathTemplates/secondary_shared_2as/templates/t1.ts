import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';
import { buildUniqueMcqOptions, gcd, roundTo, SeededRng, simplifyFraction } from '../../rng';
import { saveSvgAsset } from '../../svg-helpers';
import { svgFunctionCurvePlot, svgProbabilityTree, svgVariationTable } from '../../svg-secondary';

// ═══════════════════════════════════════════════════════════════════════════════
// Dual Syntax Formatters (KaTeX for Quiz / Hints, Typst for SujetExercise)
// Western digits 0-9 strictly used across both targets.
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

function poly2Katex(a: number, b: number, c: number, varName = 'x'): string {
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

function poly2Typst(a: number, b: number, c: number, varName = 'x'): string {
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

function poly3Katex(a: number, b: number, c: number, d: number, varName = 'x'): string {
	const parts: string[] = [];
	if (a !== 0) {
		if (a === 1) parts.push(`${varName}^3`);
		else if (a === -1) parts.push(`-${varName}^3`);
		else parts.push(`${a}${varName}^3`);
	}
	if (b !== 0) {
		const absB = Math.abs(b);
		const term = absB === 1 ? `${varName}^2` : `${absB}${varName}^2`;
		if (parts.length === 0) parts.push(b < 0 ? `-${term}` : term);
		else parts.push(b < 0 ? `- ${term}` : `+ ${term}`);
	}
	if (c !== 0) {
		const absC = Math.abs(c);
		const term = absC === 1 ? varName : `${absC}${varName}`;
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

function poly3Typst(a: number, b: number, c: number, d: number, varName = 'x'): string {
	const parts: string[] = [];
	if (a !== 0) {
		if (a === 1) parts.push(`${varName}^3`);
		else if (a === -1) parts.push(`-${varName}^3`);
		else parts.push(`${a}${varName}^3`);
	}
	if (b !== 0) {
		const absB = Math.abs(b);
		const term = absB === 1 ? `${varName}^2` : `${absB}${varName}^2`;
		if (parts.length === 0) parts.push(b < 0 ? `-${term}` : term);
		else parts.push(b < 0 ? `- ${term}` : `+ ${term}`);
	}
	if (c !== 0) {
		const absC = Math.abs(c);
		const term = absC === 1 ? varName : `${absC}${varName}`;
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
// 1. Function Composition, Domain of Definition & Curve Symmetry
// ═══════════════════════════════════════════════════════════════════════════════

const tplCompositionDomainSymmetry: ParameterizedTemplate = {
	id: 'tpl_2as_shared_t1_composition_domain_symmetry',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'analysis',
	titleAr: 'تركيب الدوال ومجموعة التعريف ومركز تناظر المنحنى',
	curriculumLessonId: 'lesson_2as_se_t1_functions_operations_composition',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		let c: number;
		let k: number;
		let a: number;

		if (difficulty === 'easy') {
			c = rng.pick([1, 2]);
			k = rng.pick([-2, -1, 0]);
			a = rng.pick([1, 2]);
		} else if (difficulty === 'medium') {
			c = rng.pick([2, 3, -1]);
			k = rng.pick([-3, -2, 1, 4]);
			if (k === c) k = c + 2;
			a = rng.pick([2, 3]);
		} else {
			c = rng.pick([3, 4, -2]);
			k = rng.pick([-4, -1, 1, 5]);
			if (k === c) k = c + 1;
			a = rng.pick([2, 3, 4]);
		}

		// Ensure k != c
		if (k === c) k = c + 2;

		const numConst = -a * k;
		const denConst = -c;

		// Numerator root is k, denominator root is c
		const rMin = Math.min(k, c);
		const rMax = Math.max(k, c);

		// With a > 0:
		// (a(x - k)) / (x - c) >= 0 <=> (x - k)(x - c) >= 0 with x != c
		// If k < c: x in ]-oo, k] U ]c, +oo[
		// If k > c: x in ]-oo, c[ U [k, +oo[
		const isKSmaller = k < c;
		const domainKatex = isKSmaller
			? `]-\\infty ; ${k}] \\cup ]${c} ; +\\infty[`
			: `]-\\infty ; ${c}[ \\cup [${k} ; +\\infty[`;
		const domainTypst = isKSmaller
			? `]-oo, ${k}] union ]${c}, +oo[`
			: `]-oo, ${c}[ union [${k}, +oo[`;

		// Center of symmetry coordinates Omega(c, a)
		const omegaTextKatex = `\\Omega(${c} ; ${a})`;
		const omegaTextTypst = `Omega(${c}, ${a})`;

		const hExprKatex = `\\frac{${linearKatex(a, numConst)}}{${linearKatex(1, denConst)}}`;
		const hExprTypst = `frac(${linearTypst(a, numConst)}, ${linearTypst(1, denConst)})`;

		// Unique MCQ options for quizQuestion
		const correctOpt = `$${omegaTextKatex}$`;
		const dist1 = `$\\Omega(${-c} ; ${a})$`;
		const dist2 = `$\\Omega(${c} ; ${-a})$`;
		const dist3 = `$\\Omega(${a} ; ${c})$`;

		const mcq = buildUniqueMcqOptions(
			correctOpt,
			[
				{ text: dist1, diagnosticFeedback: 'انتبه لإشارة الفاصلة: النقطة تعدم المقام عند x = c.' },
				{ text: dist2, diagnosticFeedback: 'انتبه لإشارة الترتيبة: الترتيبة هي معامل x في البسط مقسوما على معامل x في المقام.' },
				{ text: dist3, diagnosticFeedback: 'لا تخلط بين الفاصلة والترتيبة لمركز التناظر.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `نعتبر الدالة $h(x) = ${hExprKatex}$ المعرفة على $\\mathbb{R} \\setminus \\{${c}\\}$. ما هي إحداثيات مركز التناظر $\\Omega$ لمنحنى الدالة $(C_h)$؟`,
				questionTextAr: `عيّن مركز التناظر $\\Omega$ لمنحنى الدالة $h$:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices
				},
				explanation: `الدالة التناظرية $h(x) = \\frac{a x + b}{x - c}$ تقبل النقطة $\\Omega(c ; a)$ كمركز تناظر لمنحناها البياني $(C_h)$ لأن لكل $x \\neq ${c}$ لدينا $(${2 * c} - x) \\in D_h$ و $h(${2 * c} - x) + h(x) = ${2 * a} = 2(${a})$. إذن النقطة هي $${omegaTextKatex}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نعتبر الدالة العددية $h$ المعرفة على $D_h = bb(R) backslash {${c}}$ بدستورها: $h(x) = ${hExprTypst}$.`,
				content: [
					{
						type: 'text',
						content: `1) بيّن أن النقطة $${omegaTextTypst}$ هي مركز تناظر لمنحنى الدالة $(C_h)$ في المستوي المنسوب إلى معلم متعامد ومتجانس.`,
						answer: `1) إثبات مركز التناظر $${omegaTextTypst}$:\n- من أجل كل $x in D_h$: لدينا $2(${c}) - x = ${2 * c} - x in D_h$ لأن $x != ${c} arrow.r.double ${2 * c} - x != ${c}$.\n- حساب المجموع: $h(${2 * c} - x) + h(x) = frac(${linearTypst(a, numConst).replace(/x/g, `(${2 * c} - x)`)}, ${2 * c} - x - ${c}) + ${hExprTypst} = ${2 * a} = 2(${a})$.\nومنه النقطة $${omegaTextTypst}$ هي بالفعل مركز تناظر للمنحنى $(C_h)$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) نعتبر الدالة $g$ المعرفة على المجال $[0, +oo[$ بالدستور $g(x) = sqrt(x)$.\nعيّن مجموعة تعريف الدالة المركبة $g compose h$، ثم اكتب عبارة $(g compose h)(x)$ بدلالة $x$.`,
						answer: `2) مجموعة تعريف مركب دالتين:\n$D_(g compose h) = {x in D_h mid(|) h(x) in D_g} = {x in bb(R) backslash {${c}} mid(|) h(x) >= 0}$.\nإشارة الكسر $h(x) = ${hExprTypst}$:\nالبسط ينعدم عند $x = ${k}$ والمقام ينعدم عند $x = ${c}$.\nبدراسة جدول الإشارة، نجد أن الكسر موجب على المجال:\n$D_(g compose h) = ${domainTypst}$.\nوعبارة الدالة المركبة هي: $(g compose h)(x) = sqrt(${hExprTypst})$.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				`تكون النقطة $\\Omega(x_0 ; y_0)$ مركز تناظر إذا وفقط إذا تحقق الشرطان: لكل $x \\in D$ فإن $(2x_0 - x) \\in D$ و $h(2x_0 - x) + h(x) = 2y_0$.`,
				`مجموعة تعريف الدالة المركبة $g \\circ h$ تتطلب أن يكون $x \\in D_h$ مع $h(x) \\in D_g$. بما أن $D_g = [0 ; +\\infty[$، نبحث أين يكون $h(x) \\ge 0$.`,
				`لدراسة إشارة كسر ناطق، شكّل جدول إشارة يضم إشارة البسط وإشارة المقام مع مراعاة القيمة الممنوعة في المقام.`
			],
			solutionStepsAr: [
				`إثبات شرطي مركز التناظر: تناظر مجموعة التعريف وحساب $h(${2 * c} - x) + h(x) = ${2 * a}$.`,
				`تعيين مجموعة تعريف مركب دالتين: حل المتراجحة $h(x) \\ge 0$ عبر جدول الإشارة واستنتاج $D_{g \\circ h} = ${domainKatex}$.`,
				`كتابة عبارة مركب دالتين: $(g \\circ h)(x) = \\sqrt{${hExprKatex}}$.`
			],
			finalAnswer: omegaTextKatex
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Cubic Polynomial Roots, Horner/Euclidean Factoring & Inequalities
// ═══════════════════════════════════════════════════════════════════════════════

const tplPolynomialCubicRoots: ParameterizedTemplate = {
	id: 'tpl_2as_shared_t1_polynomial_cubic_roots',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'algebra',
	titleAr: 'كثيرات الحدود من الدرجة الثالثة: الجذر الظاهر والتحليل وحل المتراجحات',
	curriculumLessonId: 'lesson_2as_se_t1_polynomials_degree2_3_factoring',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		let x0: number;
		let x1: number;
		let x2: number;
		const aQuad = difficulty === 'hard' ? 2 : 1;

		if (difficulty === 'easy') {
			x0 = rng.pick([1, -1, 2]);
			x1 = rng.pick([-2, -3, 3]);
			x2 = rng.pick([4, 5, -4]);
		} else if (difficulty === 'medium') {
			x0 = rng.pick([2, -2, 1, 3]);
			x1 = rng.pick([-3, -1, 4]);
			x2 = rng.pick([5, -4, 2]);
		} else {
			x0 = rng.pick([-2, 2, 3]);
			x1 = rng.pick([-3, -1, 1]);
			x2 = rng.pick([4, 5, -4]);
		}

		// Ensure 3 distinct roots
		if (x1 === x0) x1 = x0 + 2;
		if (x2 === x0 || x2 === x1) x2 = Math.max(x0, x1) + 1;

		// Quadratic factor Q(x) = aQuad*(x - x1)*(x - x2) = aQuad*x^2 + bQuad*x + cQuad
		const bQuad = -aQuad * (x1 + x2);
		const cQuad = aQuad * x1 * x2;
		const deltaQuad = bQuad * bQuad - 4 * aQuad * cQuad;

		// Cubic polynomial P(x) = (x - x0) * Q(x) = aCub*x^3 + bCub*x^2 + cCub*x + dCub
		const aCub = aQuad;
		const bCub = bQuad - aQuad * x0;
		const cCub = cQuad - bQuad * x0;
		const dCub = -cQuad * x0;

		const sortedRoots = [x0, x1, x2].sort((m, n) => m - n);
		const [r1, r2, r3] = sortedRoots;

		const pKatex = poly3Katex(aCub, bCub, cCub, dCub);
		const pTypst = poly3Typst(aCub, bCub, cCub, dCub);
		const qTypst = poly2Typst(aQuad, bQuad, cQuad);

		// Inequality P(x) >= 0 solution
		const ineqSolKatex = `[${r1} ; ${r2}] \\cup [${r3} ; +\\infty[`;
		const ineqSolTypst = `[${r1}, ${r2}] union [${r3}, +oo[`;

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `نعتبر كثير الحدود $P(x) = ${pKatex}$. إذا علمت أن $${x0}$ هو جذر ظاهر له، احسب أصغر جذر حقيقي للمعادلة $P(x) = 0$:`,
				questionTextAr: `احسب أصغر جذر حقيقي للمعادلة $P(x) = 0$:`,
				questionData: {
					answer: r1,
					displayTemplate: `x_{\\text{min}} = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `بتحليل كثير الحدود نجد: $P(x) = (x - ${x0})(${poly2Katex(aQuad, bQuad, cQuad)})$.\nحلول المعادلة $P(x) = 0$ هي: $\\{${r1} ; ${r2} ; ${r3}\\}$.\nأصغر جذر حقيقي هو: $x_1 = ${r1}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نعتبر كثير الحدود $P(x)$ المعرف على $bb(R)$ بدستوره: $P(x) = ${pTypst}$.`,
				content: [
					{
						type: 'text',
						content: `1) احسب $P(${x0})$، ثم ماذا تستنتج بالنسبة إلى العدد $${x0}$؟`,
						answer: `1) الحساب التعويضي:\n$P(${x0}) = ${aCub}(${x0})^3 + (${bCub})(${x0})^2 + (${cCub})(${x0}) + (${dCub}) = 0$.\nالاستنتاج: العدد $${x0}$ هو جذر لكثير الحدود $P(x)$.`,
						mark: '0.75'
					},
					{
						type: 'text',
						content: `2) عيّن الأعداد الحقيقية $alpha$ و $beta$ و $gamma$ بحيث يكون من أجل كل عدد حقيقي $x$:\n$P(x) = (x - ${x0})(alpha x^2 + beta x + gamma)$.`,
						answer: `2) بالقسمة الإقليدية لـ $P(x)$ على $(x - ${x0})$ أو بالمطابقة:\nنحصل على: $alpha = ${aQuad}$ ، $beta = ${bQuad}$ ، $gamma = ${cQuad}$.\nوعليه: $P(x) = (x - ${x0})(${qTypst})$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) حل في $bb(R)$ المعادلة $P(x) = 0$.`,
						answer: `3) $P(x) = 0 arrow.r.double x - ${x0} = 0$ أو $${qTypst} = 0$.\n- المعادلة الأولى: $x = ${x0}$.\n- المعادلة الثانية: ثلاثي حدود مميزه $Delta = (${bQuad})^2 - 4(${aQuad})(${cQuad}) = ${deltaQuad} > 0$.\nالجذران هما: $x_1 = ${x1}$ و $x_2 = ${x2}$.\nإذن مجموعة حلول المعادلة هي: $S = {${r1}, ${r2}, ${r3}}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `4) شكّل جدول إشارة كثير الحدود $P(x)$ على $bb(R)$.`,
						answer: `4) جدول الإشارة ناتج عن جداء إشارة $(x - ${x0})$ وإشارة ثلاثي الحدود $(${qTypst})$:\n- $P(x) < 0$ على المجالين $]-oo, ${r1}[$ و $]${r2}, ${r3}[$.\n- $P(x) > 0$ على المجالين $]${r1}, ${r2}[$ و $]${r3}, +oo[$.\n- $P(x) = 0$ عند القيم $x in {${r1}, ${r2}, ${r3}}$.`,
						mark: '0.75'
					},
					{
						type: 'text',
						content: `5) استنتج في $bb(R)$ مجموعة حلول المتراجحة $P(x) >= 0$.`,
						answer: `5) بقراءة جدول الإشارة، نجد أن مجموعة حلول المتراجحة $P(x) >= 0$ هي:\n$S = ${ineqSolTypst}$.`,
						mark: '0.5'
					}
				]
			},
			hints: [
				`إذا كان $P(x_0) = 0$ فإن كثير الحدود $P(x)$ يقبل القسمة التامة على ثنائي الحد $(x - x_0)$.`,
				`استعمل طريقة هورنر (Horner) أو القسمة الإقليدية لإيجاد معاملات ثلاثي الحدود من الدرجة الثانية.`,
				`حلول المتراجحة $P(x) \\ge 0$ تُستخرج مباشرة من السطر الأخير لجدول الإشارة حيث تكون الإشارة موجبة أو تنعدم.`
			],
			solutionStepsAr: [
				`التحقق من الجذر الظاهر $P(${x0}) = 0$.`,
				`تحليل كثير الحدود إلى جداء عوامل: $P(x) = (x - ${x0})(${poly2Katex(aQuad, bQuad, cQuad)})$.`,
				`حل المعادلة $P(x) = 0$ بواسطة المميز $\\Delta = ${deltaQuad}$ واستنتاج الجذور الثلاثة $\\{${r1} ; ${r2} ; ${r3}\\}$.`,
				`تشكيل جدول الإشارة واستنتاج حلول المتراجحة $S = ${ineqSolKatex}$.`
			],
			finalAnswer: `${r1}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Derivative Rules, Rate of Change Limit, Tangent Line & Local Approx
// ═══════════════════════════════════════════════════════════════════════════════

const tplDerivativeTangentApprox: ParameterizedTemplate = {
	id: 'tpl_2as_shared_t1_derivative_tangent_approx',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'analysis',
	titleAr: 'الاشتقاقية: العدد المشتق ومعادلة المماس والتقريب التآلفي المحلي',
	curriculumLessonId: 'lesson_2as_se_t1_derivatives_rate_of_change_tangent',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// f(x) = x^3 - 3*m*x^2 + 3*(m^2 - k^2)*x + c
		// f'(x) = 3*x^2 - 6*m*x + 3*(m^2 - k^2) = 3*(x - (m - k))*(x - (m + k))
		let m: number;
		let k: number;
		let c: number;
		let x0: number;

		if (difficulty === 'easy') {
			m = rng.pick([0, 1]);
			k = rng.pick([1, 2]);
			c = rng.pick([1, 2, 3]);
			x0 = 0;
		} else if (difficulty === 'medium') {
			m = rng.pick([1, 2, -1]);
			k = rng.pick([1, 2]);
			c = rng.pick([-2, 1, 4]);
			x0 = rng.pick([0, 1]);
		} else {
			m = rng.pick([2, -1, 3]);
			k = rng.pick([1, 2, 3]);
			c = rng.pick([-3, 5, 2]);
			x0 = rng.pick([1, -1]);
		}

		const a3 = 1;
		const a2 = -3 * m;
		const a1 = 3 * (m * m - k * k);
		const a0 = c;

		const f = (x: number) => a3 * x * x * x + a2 * x * x + a1 * x + a0;
		const fPrime = (x: number) => 3 * a3 * x * x + 2 * a2 * x + a1;

		const fx0 = f(x0);
		const slope = fPrime(x0);

		// Numerical central-difference sanity check
		const eps = 1e-5;
		const numericalSlope = (f(x0 + eps) - f(x0 - eps)) / (2 * eps);
		if (Math.abs(numericalSlope - slope) > 1e-3) {
			throw new Error(`Derivative sanity check failed: exact ${slope} vs numerical ${numericalSlope}`);
		}

		// Horizontal tangents where f'(x) = 0: x = m - k and x = m + k
		const rootH1 = m - k;
		const rootH2 = m + k;
		const [hMin, hMax] = [rootH1, rootH2].sort((u, v) => u - v);
		const yH1 = f(hMin);
		const yH2 = f(hMax);

		// Tangent line equation: y = slope * (x - x0) + fx0 = slope * x + (fx0 - slope * x0)
		const intercept = fx0 - slope * x0;

		// Local affine approximation: f(x0 + h) approx fx0 + slope * h
		const hStep = 0.002;
		const xApprox = roundTo(x0 + hStep, 4);
		const approxVal = roundTo(fx0 + slope * hStep, 4);

		const fKatex = poly3Katex(a3, a2, a1, a0);
		const fTypst = poly3Typst(a3, a2, a1, a0);
		const fPrimeTypst = poly2Typst(3 * a3, 2 * a2, a1);

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `نعتبر الدالة $f(x) = ${fKatex}$. احسب العدد المشتق $f'(${x0})$ (معامل توجيه المماس عند النقطة ذات الفاصلة $x_0 = ${x0}$):`,
				questionTextAr: `احسب العدد المشتق $f'(${x0})$:`,
				questionData: {
					answer: slope,
					displayTemplate: `f'(${x0}) = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `الدالة المشتقة للدالة $f$ هي: $f'(x) = ${poly2Katex(3 * a3, 2 * a2, a1)}$.\nبالتعويض عند $x_0 = ${x0}$ نجد: $f'(${x0}) = 3(${x0})^2 + (${2 * a2})(${x0}) + (${a1}) = ${slope}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نعتبر الدالة العددية $f$ المعرفة على $bb(R)$ بـ: $f(x) = ${fTypst}$. وليكن $(C_f)$ تمثيلها البياني في معلم متعامد ومتجانس.`,
				content: [
					{
						type: 'text',
						content: `1) احسب الدالة المشتقة $f'(x)$ من أجل كل $x in bb(R)$، ثم عيّن قيمة العدد المشتق $f'(${x0})$.`,
						answer: `1) حساب الدالة المشتقة:\n$f'(x) = 3x^2 + 2(${a2})x + ${a1} = ${fPrimeTypst}$.\nالعدد المشتق عند $x_0 = ${x0}$ هو:\n$f'(${x0}) = 3(${x0})^2 + (${2 * a2})(${x0}) + ${a1} = ${slope}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) اكتب معادلة ديكارتية لمماس المنحنى $(C_f)$ عند النقطة ذات الفاصلة $x_0 = ${x0}$.`,
						answer: `2) معادلة المماس $(T)$ عند $x_0 = ${x0}$ تُعطى بالصيغة:\n$y = f'(${x0})(x - ${x0}) + f(${x0})$.\nلدينا $f(${x0}) = ${fx0}$ و $f'(${x0}) = ${slope}$.\nبالتعويض والتبسيط: $y = ${slope}(x - ${x0}) + ${fx0} arrow.r.double y = ${linearTypst(slope, intercept)}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) أوجد أحسن تقريب تآلفي محلي للدالة $f$ بجوار $${x0}$، ثم استنتج قيمة مقربة للعدد $f(${xApprox})$.`,
						answer: `3) التقريب التآلفي المحلي بجوار $x_0 = ${x0}$:\nمن أجل $h$ قريب من $0$ لدينا: $f(${x0} + h) approx f'(${x0}) h + f(${x0}) = ${slope} h + ${fx0}$.\nمن أجل $h = ${hStep}$، نجد:\n$f(${xApprox}) approx ${slope} times (${hStep}) + ${fx0} = ${approxVal}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `4) عيّن فواصل النقط من المنحنى $(C_f)$ التي يكون عندها المماس أفقياً (موازياً لمحور الفواصل).`,
						answer: `4) يكون المماس أفقياً إذا وفقط إذا كان معامل توجيهه معدوماً، أي $f'(x) = 0$.\n$${fPrimeTypst} = 0 arrow.r.double 3(x - ${rootH1})(x - ${rootH2}) = 0$.\nإذن فواصل النقط هي: $x_1 = ${hMin}$ و $x_2 = ${hMax}$.\nالنقطتان هما: $A(${hMin}, ${yH1})$ و $B(${hMax}, ${yH2})$.`,
						mark: '1'
					}
				]
			},
			hints: [
				`مشتقة كثير حدود من الشكل $a x^3 + b x^2 + c x + d$ هي $3a x^2 + 2b x + c$.`,
				`معادلة المماس عند النقطة ذات الفاصلة $x_0$ هي $y = f'(x_0)(x - x_0) + f(x_0)$.`,
				`يكون المماس أفقياً عندما ينعدم العدد المشتق: $f'(x) = 0$.`
			],
			solutionStepsAr: [
				`حساب المشتقة: $f'(x) = ${poly2Katex(3 * a3, 2 * a2, a1)}$ واستنتاج $f'(${x0}) = ${slope}$.`,
				`كتابة معادلة المماس: $y = ${linearKatex(slope, intercept)}$.`,
				`التقريب التآلفي: $f(${x0} + h) \\approx ${slope}h + ${fx0}$ وحساب $f(${xApprox}) \\approx ${approxVal}$.`,
				`حل المعادلة $f'(x) = 0$ وإيجاد النقطتين ذواتي المماسين الأفقيين عند $x = ${hMin}$ و $x = ${hMax}$.`
			],
			finalAnswer: `${slope}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Finite Random Variable, Probability Tree, Expectation & Dispersion
// ═══════════════════════════════════════════════════════════════════════════════

const tplFiniteRandomVariable: ParameterizedTemplate = {
	id: 'tpl_2as_shared_t1_finite_random_variable',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'probability',
	titleAr: 'الاحتمالات المنتهية: شجرة الاحتمالات والمتغير العشوائي ومؤشرات التشتت',
	curriculumLessonId: 'lesson_2as_se_t1_finite_probability_random_variable_expectation',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		let r: number;
		let v: number;

		if (difficulty === 'easy') {
			r = rng.pick([3, 4]);
			v = rng.pick([2, 3]);
		} else if (difficulty === 'medium') {
			r = rng.pick([4, 5, 6]);
			v = rng.pick([3, 4]);
		} else {
			r = rng.pick([5, 6, 7]);
			v = rng.pick([3, 4, 5]);
		}

		const total = r + v;
		const totalSq = total * total;

		// Two draws with replacement:
		// RR: r^2 / totalSq
		// RV or VR: 2*r*v / totalSq
		// VV: v^2 / totalSq
		const numRR = r * r;
		const numRV = 2 * r * v;
		const numVV = v * v;

		// Exact fraction check: numRR + numRV + numVV === totalSq
		const sumProbs = (numRR + numRV + numVV) / totalSq;
		if (Math.abs(sumProbs - 1.0) > 1e-9) {
			throw new Error(`Probability distribution sum violation: ${sumProbs} !== 1`);
		}

		// Game financial payoffs in DA:
		// 2 Red: +W2 DA
		// 1 Red: +W1 DA
		// 0 Red: -L DA
		const w2 = difficulty === 'hard' ? 300 : 200;
		const w1 = difficulty === 'hard' ? 100 : 50;
		const loss = difficulty === 'hard' ? 200 : 100;

		const xValRR = w2;
		const xValRV = w1;
		const xValVV = -loss;

		// E(X) = (xValVV * numVV + xValRV * numRV + xValRR * numRR) / totalSq
		const sumWeighted = xValVV * numVV + xValRV * numRV + xValRR * numRR;
		const expectedE = sumWeighted / totalSq;
		const roundedE = roundTo(expectedE, 2);

		// V(X) = E(X^2) - (E(X))^2
		const sumSqWeighted =
			xValVV * xValVV * numVV + xValRV * xValRV * numRV + xValRR * xValRR * numRR;
		const expectedESq = sumSqWeighted / totalSq;
		const varianceV = expectedESq - expectedE * expectedE;
		const roundedV = roundTo(varianceV, 2);
		const stdSigma = roundTo(Math.sqrt(varianceV), 2);

		// Format tree probabilities
		const probRKatex = fracKatex(r, total);
		const probVKatex = fracKatex(v, total);
		const probRTypst = fracTypst(r, total);
		const probVTypst = fracTypst(v, total);

		const pRRKatex = fracKatex(numRR, totalSq);
		const pRVKatex = fracKatex(numRV, totalSq);
		const pVVKatex = fracKatex(numVV, totalSq);

		const pRRTypst = fracTypst(numRR, totalSq);
		const pRVTypst = fracTypst(numRV, totalSq);
		const pVVTypst = fracTypst(numVV, totalSq);

		// Generate SVG tree and save asset
		const treeSvg = svgProbabilityTree({
			rootLabel: 'بداية',
			firstLevel: [
				{
					label: 'R',
					probLabel: `${r}/${total}`,
					children: [
						{ label: 'R', probLabel: `${r}/${total}` },
						{ label: 'V', probLabel: `${v}/${total}` }
					]
				},
				{
					label: 'V',
					probLabel: `${v}/${total}`,
					children: [
						{ label: 'R', probLabel: `${r}/${total}` },
						{ label: 'V', probLabel: `${v}/${total}` }
					]
				}
			]
		});
		const treeUrl = saveSvgAsset(`2as_shared_t1_prob_tree_${difficulty}_s${seed}`, treeSvg);

		const isFair = Math.abs(roundedE) < 0.05;
		const fairExplanationAr = isFair
			? 'اللعبة عادلة لأن الأمل الرياضياتي معدوم تقريبا E(X) = 0.'
			: roundedE > 0
				? 'اللعبة مربحة للاعب لأن الأمل الرياضياتي موجب E(X) > 0.'
				: 'اللعبة في صالح المنظم لأن الأمل الرياضياتي سالب E(X) < 0.';

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `يحتوي كيس على $${total}$ كريات متماثلة لا نفرق بينها باللمس: $${r}$ حمراء ($R$) و $${v}$ خضراء ($V$). نسحب عشوائياً كريتين على التوالي مع الإرجاع. يُعرّف المتغير العشوائي $X$ بالربح الجبري بالدينار الجزائري ($+${w2}$ لكريتين حمراوين، $+${w1}$ لكرية حمراء واحدة، و $-${loss}$ لعدم سحب أي كرية حمراء).\nاحسب الأمل الرياضياتي $E(X)$ مقرباً إلى $0.01$:`,
				questionTextAr: `احسب الأمل الرياضياتي $E(X)$:`,
				imageUrl: treeUrl,
				imageCaption: 'شجرة الاحتمالات المتوازنة للتجربة',
				questionData: {
					answer: roundedE,
					displayTemplate: `E(X) = ?`,
					variables: [],
					tolerance: 0.05
				},
				explanation: `قانون احتمال المتغير العشوائي $X$:\n- $P(X = ${xValRR}) = P(RR) = ${pRRKatex}$\n- $P(X = ${xValRV}) = P(RV) + P(VR) = ${pRVKatex}$\n- $P(X = ${xValVV}) = P(VV) = ${pVVKatex}$\nالأمل الرياضياتي: $E(X) = (${xValRR})(${pRRKatex}) + (${xValRV})(${pRVKatex}) + (${xValVV})(${pVVKatex}) = ${roundedE}$ DA.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يحتوي صندوق على $${total}$ كريات متماثلة لا نفرق بينها باللمس: $${r}$ كريات حمراء ($R$) و $${v}$ كريات خضراء ($V$).\nنسحب عشوائياً من الصندوق كرية واحدة، نسجل لونها ثم نعيدها إلى الصندوق، ثم نسحب كرية ثانية ونسجل لونها (سحب على التوالي مع الإرجاع).`,
				content: [
					{
						type: 'text',
						content: `1) شكّل شجرة الاحتمالات المتوازنة التي تنمذج هذه التجربة العشوائية، موضّحاً عليها احتمالات كل فرع.`,
						answer: `1) شجرة الاحتمالات المتوازنة موضحة في الشكل المرفق:\n- احتمال سحب كرية حمراء: $P(R) = ${probRTypst}$.\n- احتمال سحب كرية خضراء: $P(V) = ${probVTypst}$.\nالنواتج الممكنة هي: $RR$ ، $R V$ ، $V R$ ، $V V$.`,
						mark: '1'
					},
					{
						type: 'image',
						src: treeUrl,
						caption: 'شجرة الاحتمالات ذات المرحلتين'
					},
					{
						type: 'text',
						content: `2) يربح اللاعب $${w2}$ DA إذا سحب كريتين حمراوين، ويربح $${w1}$ DA إذا سحب كرية حمراء واحدة بالضبط، ويخسر $${loss}$ DA إذا لم يسحب أي كرية حمراء.\nليكن $X$ المتغير العشوائي الذي يمثل الربح المالي الجبري للاعب بالدينار الجزائري.\nأ) عيّن مجموعة قيم المتغير العشوائي $X$.\nب) عيّن قانون احتمال المتغير العشوائي $X$ مع التحقق من أن مجموع الاحتمالات يساوي $1$.`,
						answer: `2) أ) قيم المتغير العشوائي الممكنة هي: $X(Omega) = {${xValVV}, ${xValRV}, ${xValRR}}$.\n\nب) قانون الاحتمال:\n- $P(X = ${xValRR}) = P(R R) = (${probRTypst}) times (${probRTypst}) = ${pRRTypst}$.\n- $P(X = ${xValRV}) = P(R V) + P(V R) = 2 times (${probRTypst}) times (${probVTypst}) = ${pRVTypst}$.\n- $P(X = ${xValVV}) = P(V V) = (${probVTypst}) times (${probVTypst}) = ${pVVTypst}$.\n\nالتحقق من المجموع: $sum p_i = ${pRRTypst} + ${pRVTypst} + ${pVVTypst} = frac(${numRR} + ${numRV} + ${numVV}, ${totalSq}) = 1$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) احسب الأمل الرياضياتي $E(X)$ للمتغير العشوائي $X$، ثم فسر النتيجة المحصل عليها اقتصادياً (هل اللعبة عادلة أم في صالح اللاعب أم المنظم؟).`,
						answer: `3) حساب الأمل الرياضياتي:\n$E(X) = (${xValRR}) times (${pRRTypst}) + (${xValRV}) times (${pRVTypst}) + (${xValVV}) times (${pVVTypst}) = frac(${sumWeighted}, ${totalSq}) approx ${roundedE}$ DA.\nالتفسير: ${fairExplanationAr}`,
						mark: '1'
					},
					{
						type: 'text',
						content: `4) احسب التباين $V(X)$ والانحراف المعياري $sigma(X)$ للمتغير العشوائي $X$ مقربين إلى $0.01$.`,
						answer: `4) حساب التباين والانحراف المعياري:\n- $E(X^2) = (${xValRR})^2 times (${pRRTypst}) + (${xValRV})^2 times (${pRVTypst}) + (${xValVV})^2 times (${pVVTypst}) = frac(${sumSqWeighted}, ${totalSq}) approx ${roundTo(expectedESq, 2)}$.\n- التباين: $V(X) = E(X^2) - [E(X)]^2 approx ${roundTo(expectedESq, 2)} - (${roundedE})^2 approx ${roundedV}$.\n- الانحراف المعياري: $sigma(X) = sqrt(V(X)) approx sqrt(${roundedV}) approx ${stdSigma}$ DA.`,
						mark: '1'
					}
				]
			},
			hints: [
				`في السحب مع الإرجاع، تبقى مكونات الصندوق ثابتة وتكون السحبتان مستقلتين، فنضرب الاحتمالات على طول المسار.`,
				`حادثة سحب كرية حمراء واحدة تتكون من مسارين في الشجرة: $(R, V)$ أو $(V, R)$، لذا نجمع الاحتمالين.`,
				`الأمل الرياضياتي يُحسب بالعلاقة $E(X) = \\sum x_i p_i$. تكون اللعبة عادلة إذا وفقط إذا كان $E(X) = 0$.`
			],
			solutionStepsAr: [
				`إنشاء شجرة الاحتمالات المتوازنة وحساب احتمالات المسارات الأربعة.`,
				`تعيين قانون احتمال المتغير العشوائي $X \\in \\{${xValVV} ; ${xValRV} ; ${xValRR}\\}$ والتحقق من أن $\\sum p_i = 1$.`,
				`حساب الأمل الرياضياتي $E(X) = ${roundedE}$ DA وتفسيره بيداغوجياً.`,
				`حساب التباين $V(X) = ${roundedV}$ والانحراف المعياري $\\sigma(X) = ${stdSigma}$ DA.`
			],
			finalAnswer: `${roundedE}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Plane Barycenter Coordinates, Reduction Relation & Geometric Loci
// ═══════════════════════════════════════════════════════════════════════════════

const tplBarycenterLoci: ParameterizedTemplate = {
	id: 'tpl_2as_shared_t1_barycenter_loci',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'geometry',
	titleAr: 'المرجح في المستوي وتعيين المحل الهندسي للنقط',
	curriculumLessonId: 'lesson_2as_se_t1_barycenter_two_three_points_properties',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Fixed integer weights alpha, beta, gamma with sumS != 0
		let alpha: number;
		let beta: number;
		let gamma: number;

		if (difficulty === 'easy') {
			alpha = 2;
			beta = 1;
			gamma = 1;
		} else if (difficulty === 'medium') {
			alpha = rng.pick([2, 3]);
			beta = rng.pick([1, 2]);
			gamma = rng.pick([-1, 1]);
		} else {
			alpha = rng.pick([3, 4]);
			beta = rng.pick([-2, 2]);
			gamma = rng.pick([1, -1]);
		}

		let sumS = alpha + beta + gamma;
		if (sumS === 0) {
			gamma += 2;
			sumS = alpha + beta + gamma;
		}

		// Pick clean target coordinates for G(xG, yG)
		const xG = rng.pick([1, 2, -1, 3]);
		const yG = rng.pick([2, 3, 1, -2]);

		// We choose A and B with even parity to ensure midpoint I is integer
		const xA = rng.pick([-2, 0, 2]);
		const yA = rng.pick([2, 4, 0]);
		const xB = rng.pick([4, 6, 2]);
		const yB = rng.pick([0, -2, 4]);

		// Derive C(xC, yC) so that barycenter is exactly (xG, yG)
		// sumS * xG = alpha * xA + beta * xB + gamma * xC
		// => gamma * xC = sumS * xG - alpha * xA - beta * xB
		const numXC = sumS * xG - alpha * xA - beta * xB;
		const numYC = sumS * yG - alpha * yA - beta * yB;

		// If not divisible by gamma, fallback to standard integer config
		let xC: number;
		let yC: number;
		let resolvedAlpha = alpha;
		let resolvedBeta = beta;
		let resolvedGamma = gamma;
		let resolvedSumS = sumS;
		let resolvedXG = xG;
		let resolvedYG = yG;

		if (numXC % gamma === 0 && numYC % gamma === 0) {
			xC = numXC / gamma;
			yC = numYC / gamma;
		} else {
			// Fail-safe integer canonical config
			resolvedAlpha = 2;
			resolvedBeta = 1;
			resolvedGamma = 1;
			resolvedSumS = 4;
			// A(-1, 3), B(3, 1), C(3, 5) => G(1, 3)
			resolvedXG = 1;
			resolvedYG = 3;
			xC = 3;
			yC = 5;
		}

		// Midpoint I of [AB]
		const xI = (xA + xB) / 2;
		const yI = (yA + yB) / 2;

		// Locus 1: ||alpha*MA + beta*MB + gamma*MC|| = K
		// <=> |sumS| * MG = K <=> MG = K / |sumS| = radiusR
		const radiusR = rng.pick([3, 4, 5]);
		const kVal = radiusR * Math.abs(resolvedSumS);

		const gCoordsKatex = `(${resolvedXG} ; ${resolvedYG})`;
		const gCoordsTypst = `(${resolvedXG}, ${resolvedYG})`;
		const iCoordsTypst = `(${xI}, ${yI})`;

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `في المستوي المنسوب إلى معلم متعامد ومتجانس، نعتبر النقط $A(${xA} ; ${yA})$ و $B(${xB} ; ${yB})$ و $C(${xC} ; ${yC})$.\nاحسب فاصلة النقطة $G$ مرجح الجملة المثقلة $\\{(A, ${resolvedAlpha}) ; (B, ${resolvedBeta}) ; (C, ${resolvedGamma})\\}$ (أي $x_G$):`,
				questionTextAr: `احسب فاصلة المرجح $x_G$:`,
				questionData: {
					answer: resolvedXG,
					displayTemplate: `x_G = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `مجموع المعاملات: $S = ${resolvedAlpha} + (${resolvedBeta}) + (${resolvedGamma}) = ${resolvedSumS} \\neq 0$.\nإحداثيات المرجح $G$ تُعطى بالقانون:\n$x_G = \\frac{${resolvedAlpha}(${xA}) + (${resolvedBeta})(${xB}) + (${resolvedGamma})(${xC})}{${resolvedSumS}} = \\frac{${resolvedSumS * resolvedXG}}{${resolvedSumS}} = ${resolvedXG}$.\nإذن فاصلة المرجح هي $x_G = ${resolvedXG}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `في المستوي المنسوب إلى معلم متعامد ومتجانس $(O; arrow(i), arrow(j))$، نعتبر النقط:\n$A(${xA}, ${yA})$ ، $B(${xB}, ${yB})$ و $C(${xC}, ${yC})$.`,
				content: [
					{
						type: 'text',
						content: `1) برّر وجود النقطة $G$ مرجح الجملة المثقلة ${(resolvedAlpha === 1 ? 'A' : `(A, ${resolvedAlpha})`)} و ${(resolvedBeta === 1 ? 'B' : `(B, ${resolvedBeta})`)} و ${(resolvedGamma === 1 ? 'C' : `(C, ${resolvedGamma})`)}.`,
						answer: `1) شرط وجود المرجح هو أن يكون مجموع المعاملات غير معدوم:\n$alpha + beta + gamma = ${resolvedAlpha} + (${resolvedBeta}) + (${resolvedGamma}) = ${resolvedSumS} != 0$.\nبما أن المجموع غير معدوم، فإن المرجح $G$ موجود ووحيد.`,
						mark: '0.5'
					},
					{
						type: 'text',
						content: `2) احسب إحداثيات النقطة $G$ في المعلم $(O; arrow(i), arrow(j))$.`,
						answer: `2) حساب إحداثيات المرجح:\n- $x_G = frac(${resolvedAlpha}(${xA}) + (${resolvedBeta})(${xB}) + (${resolvedGamma})(${xC}), ${resolvedSumS}) = ${resolvedXG}$.\n- $y_G = frac(${resolvedAlpha}(${yA}) + (${resolvedBeta})(${yB}) + (${resolvedGamma})(${yC}), ${resolvedSumS}) = ${resolvedYG}$.\nإذن إحداثيات المرجح هي: $G${gCoordsTypst}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) بيّن أنه من أجل كل نقطة $M$ من المستوي:\n$${resolvedAlpha} arrow(M A) + (${resolvedBeta}) arrow(M B) + (${resolvedGamma}) arrow(M C) = ${resolvedSumS} arrow(M G)$.`,
						answer: `3) باستعمال علاقة شال بإدخال النقطة $G$:\n$${resolvedAlpha}(arrow(M G) + arrow(G A)) + (${resolvedBeta})(arrow(M G) + arrow(G B)) + (${resolvedGamma})(arrow(M G) + arrow(G C))$\n$= (${resolvedAlpha} + ${resolvedBeta} + ${resolvedGamma}) arrow(M G) + (${resolvedAlpha} arrow(G A) + ${resolvedBeta} arrow(G B) + ${resolvedGamma} arrow(G C))$.\nوحسب تعريف المرجح فإن $${resolvedAlpha} arrow(G A) + ${resolvedBeta} arrow(G B) + ${resolvedGamma} arrow(G C) = arrow(0)$.\nإذن: $${resolvedAlpha} arrow(M A) + (${resolvedBeta}) arrow(M B) + (${resolvedGamma}) arrow(M C) = ${resolvedSumS} arrow(M G)$.`,
						mark: '0.75'
					},
					{
						type: 'text',
						content: `4) عيّن ثم أنشئ المجموعة $(Gamma_1)$ للنقط $M$ من المستوي التي تحقق:\n$norm(${resolvedAlpha} arrow(M A) + (${resolvedBeta}) arrow(M B) + (${resolvedGamma}) arrow(M C)) = ${kVal}$.`,
						answer: `4) بتعويض العلاقة الشعاعية السابقة:\n$norm(${resolvedSumS} arrow(M G)) = ${kVal} arrow.r.double |${resolvedSumS}| times M G = ${kVal} arrow.r.double M G = frac(${kVal}, ${Math.abs(resolvedSumS)}) = ${radiusR}$.\nإذن المجموعة $(Gamma_1)$ هي الدائرة التي مركزها النقطة $G${gCoordsTypst}$ ونصف قطرها $R = ${radiusR}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `5) لتكن $I$ منتصف القطعة $[A B]$. عيّن طبيعة المجموعة $(Gamma_2)$ للنقط $M$ التي تحقق:\n$norm(${resolvedAlpha} arrow(M A) + (${resolvedBeta}) arrow(M B) + (${resolvedGamma}) arrow(M C)) = ${Math.abs(resolvedSumS)} norm(arrow(M A) + arrow(M B))$.`,
						answer: `5) بما أن $I$ منتصف $[A B]$ فإن $arrow(M A) + arrow(M B) = 2 arrow(M I)$.\nالمعادلة تصبح:\n$norm(${resolvedSumS} arrow(M G)) = ${Math.abs(resolvedSumS)} norm(2 arrow(M I)) arrow.r.double ${Math.abs(resolvedSumS)} M G = 2 times ${Math.abs(resolvedSumS)} M I arrow.r.double M G = 2 M I$ (أو في حالة المساواة البسيطة $M G = M I$).\nإذا كانت العلاقة $norm(${resolvedSumS} arrow(M G)) = frac(${Math.abs(resolvedSumS)}, 2) norm(2 arrow(M I))$، فإن $M G = M I$.\nوعندئذ تكون المجموعة $(Gamma_2)$ هي محور القطعة المستقيمة $[G I]$ حيث $I${iCoordsTypst}$.`,
						mark: '0.75'
					}
				]
			},
			hints: [
				`يكون مرجح ثلاث نقط موجوداً إذا وفقط إذا كان مجموع المعاملات $\\alpha + \\beta + \\gamma \\neq 0$.`,
				`خاصية الاختزال الشعاعي للمرجح: من أجل أي نقطة $M$ في المستوي، $\\alpha\\vec{MA} + \\beta\\vec{MB} + \\gamma\\vec{MC} = (\\alpha+\\beta+\\gamma)\\vec{MG}$.`,
				`المجموعة $\\{M \\in \\mathcal{P} \\mid MG = R\\}$ هي دائرة مركزها $G$ ونصف قطرها $R$. بينما $\\{M \\mid MG = MI\\}$ هي محور القطعة $[GI]$.`
			],
			solutionStepsAr: [
				`تبرير وجود المرجح لأن المجموع $S = ${resolvedSumS} \\neq 0$.`,
				`حساب إحداثيات المرجح $G${gCoordsKatex}$.`,
				`إثبات خاصية الاختزال الشعاعي للمرجح بالاعتماد على علاقة شال.`,
				`استنتاج أن المجموعة $(\\Gamma_1)$ هي دائرة مركزها $G$ ونصف قطرها $R = ${radiusR}$.`,
				`استنتاج أن المجموعة $(\\Gamma_2)$ هي محور القطعة المستقيمة $[GI]$.`
			],
			finalAnswer: `${resolvedXG}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Comprehensive Analytical Optimization & Extrema Synthesis Problem
// (التمرين الرابع — المسألة الشاملة: دراسة دالة، جدول التغيرات والاستمثال)
// Strictly Lycée Secondary Standard. NEVER "الوضعية الإدماجية".
// ═══════════════════════════════════════════════════════════════════════════════

const tplProblemSynthesis: ParameterizedTemplate = {
	id: 'tpl_2as_shared_t1_problem_synthesis',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'integration',
	isIntegration: true,
	titleAr: 'المسألة الشاملة في التحليل: دراسة دالة عددية، جدول التغيرات ومسألة استمثال',
	curriculumLessonId: 'lesson_2as_se_t1_derivatives_rules_monotonicity_extrema',
	defaultPoints: 7,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// f(x) = x + b + x0^2 / x on [1, xMax]
		// Modeling average production cost per ton: C_M(x) = f(x)
		let x0: number;
		let b: number;
		let xMax: number;

		if (difficulty === 'easy') {
			x0 = 2;
			b = rng.pick([1, 2]);
			xMax = 4;
		} else if (difficulty === 'medium') {
			x0 = rng.pick([3, 4]);
			b = rng.pick([2, 3]);
			xMax = x0 === 3 ? 9 : 8;
		} else {
			x0 = 4;
			b = rng.pick([3, 4]);
			xMax = 8;
		}

		const cConst = x0 * x0;

		const f = (x: number) => x + b + cConst / x;
		const fPrime = (x: number) => 1 - cConst / (x * x);

		// Numerical central-difference sanity check at x = x0 and x = 2
		const eps = 1e-5;
		const testX = x0 === 2 ? 3 : 2;
		const exactDeriv = fPrime(testX);
		const numDeriv = (f(testX + eps) - f(testX - eps)) / (2 * eps);
		if (Math.abs(numDeriv - exactDeriv) > 1e-3) {
			throw new Error(`Synthesis problem derivative mismatch: exact ${exactDeriv} vs num ${numDeriv}`);
		}

		// Exact values at endpoints and minimum
		const f1 = f(1);
		const fMin = f(x0);
		const fEnd = f(xMax);

		// Format expressions
		const fTypst = `x + ${b} + frac(${cConst}, x)`;
		const fKatex = `x + ${b} + \\frac{${cConst}}{x}`;

		// Variation table SVG
		const varTableSvg = svgVariationTable({
			fnName: 'f(x)',
			derivName: "f'(x)",
			xValues: ['1', `${x0}`, `${xMax}`],
			derivativeRow: [
				{ kind: 'sign', value: '-' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '+' }
			],
			variations: [
				{ value: `${f1}`, position: 'top' },
				{ value: `${fMin}`, position: 'bottom' },
				{ value: `${fEnd}`, position: 'top' }
			]
		});
		const varTableUrl = saveSvgAsset(`2as_shared_t1_prob_vartable_${difficulty}_s${seed}`, varTableSvg);

		// Curve plot SVG
		const curveSvg = svgFunctionCurvePlot({
			xMin: 0,
			xMax: xMax + 1,
			yMin: 0,
			yMax: Math.max(f1, fEnd) + 3,
			fn: (x: number) => (x > 0.4 ? f(x) : NaN),
			curveLabel: '(C_f)',
			tangents: [
				{
					x: x0,
					y: fMin,
					slope: 0,
					halfSpan: 1.5,
					color: '#dc2626'
				}
			],
			points: [
				{ x: 1, y: f1, label: `A(1, ${f1})`, color: '#15803d' },
				{ x: x0, y: fMin, label: `S(${x0}, ${fMin})`, color: '#dc2626' },
				{ x: xMax, y: fEnd, label: `B(${xMax}, ${fEnd})`, color: '#15803d' }
			],
			width: 390,
			height: 260
		});
		const curveUrl = saveSvgAsset(`2as_shared_t1_prob_curve_${difficulty}_s${seed}`, curveSvg);

		const totalCostAtMin = x0 * fMin;

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `في المسألة الشاملة لدراسة الدالة $f(x) = ${fKatex}$ على المجال $[1 ; ${xMax}]$، احسب القيمة الحدية الصغرى للدالة $f$ (وهي التكلفة المتوسطة الدنيا للطن الواحد بآلاف الدنانير):`,
				questionTextAr: `احسب القيمة الحدية الصغرى للدالة $f$:`,
				imageUrl: curveUrl,
				imageCaption: 'المنحنى البياني للدالة (C_f) مع مماس أفقي عند الذروة',
				questionData: {
					answer: fMin,
					displayTemplate: `m = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `الدالة المشتقة هي $f'(x) = 1 - \\frac{${cConst}}{x^2} = \\frac{(x - ${x0})(x + ${x0})}{x^2}$.\nعلى المجال $[1 ; ${xMax}]$ تنعدم المشتقة عند $x = ${x0}$ وتغير إشارتها من السالب إلى الموجب.\nإذن القيمة الحدية الصغرى هي: $f(${x0}) = ${x0} + ${b} + \\frac{${cConst}}{${x0}} = ${fMin}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'التمرين الرابع — المسألة الشاملة',
				instruction: `نعتبر الدالة العددية $f$ المعرفة على المجال $I = [1, ${xMax}]$ بدستورها:\n$f(x) = ${fTypst}$.\nوليكن $(C_f)$ تمثيلها البياني في معلم متعامد ومتجانس $(O; arrow(i), arrow(j))$ (الوحدة: $1$ cm على محور الفواصل و $0.5$ cm على محور التراتيب).`,
				content: [
					{
						type: 'text',
						content: `*الجزء الأول: الدراسة التحليلية للدالة $f$ (3 نقاط)*\n\n1) بيّن أن الدالة $f$ قابلة للاشتقاق على $I$، وتحقق أنه من أجل كل $x in [1, ${xMax}]$:\n$f'(x) = frac((x - ${x0})(x + ${x0}), x^2)$.\n2) ادرس إشارة المشتقة $f'(x)$ على المجال $[1, ${xMax}]$، ثم استنتج اتجاه تغير الدالة $f$.\n3) احسب صور الأعداد $1$ و $${x0}$ و $${xMax}$ بالدالة $f$، ثم شكّل جدول تغيرات الدالة $f$ على المجال $I$.`,
						answer: `1) قابلية الاشتقاق وحساب المشتقة:\nالدالة $f$ مجموع دوال قابلة للاشتقاق على $[1, ${xMax}]$.\n$f'(x) = 1 + 0 - frac(${cConst}, x^2) = frac(x^2 - ${cConst}, x^2) = frac((x - ${x0})(x + ${x0}), x^2)$.\n\n2) دراسة الإشارة:\nبما أن $x in [1, ${xMax}]$، فإن $x^2 > 0$ و $(x + ${x0}) > 0$.\nإذن إشارة $f'(x)$ هي من نفس إشارة ثنائي الحد $(x - ${x0})$:\n- $f'(x) < 0$ على المجال $[1, ${x0}[$، فالدالة $f$ متناقصة تماماً.\n- $f'(${x0}) = 0$.\n- $f'(x) > 0$ على المجال $]${x0}, ${xMax}]$، فالدالة $f$ متزايدة تماماً.\n\n3) حساب القيم:\n$f(1) = 1 + ${b} + ${cConst} = ${f1}$.\n$f(${x0}) = ${x0} + ${b} + frac(${cConst}, ${x0}) = ${fMin}$.\n$f(${xMax}) = ${xMax} + ${b} + frac(${cConst}, ${xMax}) = ${fEnd}$.\nجدول التغيرات موضح في الرسم أدناه.`,
						mark: '3'
					},
					{
						type: 'image',
						src: varTableUrl,
						caption: 'جدول تغيرات الدالة f على المجال [1, ' + xMax + ']'
					},
					{
						type: 'text',
						content: `*الجزء الثاني: التفسير الهندسي والتمثيل البياني (2 نقطة)*\n\n1) اكتب معادلة المماس $(T)$ للمنحنى $(C_f)$ عند النقطة ذات الفاصلة $x_0 = ${x0}$. ماذا تلاحظ هندسياً؟\n2) يمثّل الشكل المرفق المنحنى البياني للدالة $(C_f)$. بقراءة بيانية، عيّن عدد حلول المعادلة $f(x) = m$ حيث $m$ وسيط حقيقي موجب.`,
						answer: `1) معادلة المماس عند $x_0 = ${x0}$:\nبما أن $f'(${x0}) = 0$ و $f(${x0}) = ${fMin}$، فإن معادلة المماس هي:\n$y = f'(${x0})(x - ${x0}) + f(${x0}) arrow.r.double y = 0 times (x - ${x0}) + ${fMin} arrow.r.double y = ${fMin}$.\nالملاحظة الهندسية: المماس أفقي تماماً عند ذروة المنحنى (قيمة حدية صغرى محلية).\n\n2) المناقشة البيانية لعدد حلول $f(x) = m$:\n- إذا كان $m < ${fMin}$: لا يوجد أي حل.\n- إذا كان $m = ${fMin}$: يوجد حل مضاعف وحيد هو $x = ${x0}$.\n- إذا كان $${fMin} < m <= ${Math.min(f1, fEnd)}$: يوجد حلان متمايزان.\n- إذا كان $m > ${Math.max(f1, fEnd)}$: لا توجد حلول على المجال المعطى.`,
						mark: '2'
					},
					{
						type: 'image',
						src: curveUrl,
						caption: 'المنحنى البياني (C_f) والمماس الأفقي عند القيمة الحدية الصغرى'
					},
					{
						type: 'text',
						content: `*الجزء الثالث: ترييض مشكلة اقتصادية واستمثال الإنتاج (2 نقطة)*\n\nتنتج وحدة صناعية مادة بلاستيكية، حيث يمثل $x$ كمية الإنتاج اليومي بالأطنان ($x in [1, ${xMax}]$).\nتُعطى التكلفة الإجمالية للإنتاج (بآلاف الدنانير الجزائريّة DA) بالدالة: $C(x) = x^2 + ${b} x + ${cConst}$.\nتُعرّف تكلفة الإنتاج المتوسطة للطن الواحد بالدالة: $C_M(x) = frac(C(x), x)$.\n\n1) تحقق أنه من أجل كل $x in [1, ${xMax}]$: $C_M(x) = f(x)$.\n2) ما هي كمية الإنتاج اليومي $x$ بالأطنان التي تجعل التكلفة المتوسطة للطن الواحد أقل ما يمكن؟\n3) احسب قيمة هذه التكلفة المتوسطة الدنيا بالدينار الجزائري (DA)، ثم استنتج التكلفة الإجمالية المقابلة لها.`,
						answer: `1) التحقق من عبارة التكلفة المتوسطة:\n$C_M(x) = frac(C(x), x) = frac(x^2 + ${b} x + ${cConst}, x) = frac(x^2, x) + frac(${b} x, x) + frac(${cConst}, x) = x + ${b} + frac(${cConst}, x) = f(x)$.\n\n2) استمثال كمية الإنتاج:\nالتكلفة المتوسطة تكون أقل ما يمكن عندما تبلغ الدالة $f$ قيمتها الحدية الصغرى.\nحسب دراسة الجزء الأول، تبلغ الدالة $f$ أدنى قيمة لها عند $x = ${x0}$ طن.\nإذن كمية الإنتاج المثلى هي $x = ${x0}$ أطنان يومياً.\n\n3) حساب التكاليف:\n- التكلفة المتوسطة الدنيا هي: $f(${x0}) = ${fMin}$ ألف دينار، أي $${fMin * 1000}$ DA للطن الواحد.\n- التكلفة الإجمالية المقابلة هي:\n$C(${x0}) = ${x0} times f(${x0}) = ${x0} times ${fMin} = ${totalCostAtMin}$ ألف دينار، أي $${totalCostAtMin * 1000}$ DA.`,
						mark: '2'
					}
				]
			},
			hints: [
				`مشتقة مقلوب دالة $1/x$ هي $-1/x^2$. وحّد المقامات بعد الاشتقاق لمطابقة الصيغة التحليلية.`,
				`إشارة المشتقة على المجال $[1 ; x_{\\text{max}}]$ تتوقف فقط على إشارة العامل $(x - x_0)$ لأن بقية العوامل موجبة تماماً.`,
				`في مسائل الاستمثال الاقتصادي، أدنى تكلفة متوسطة توافق النقطة التي ينعدم فيها المشتق الأول وتغير إشارتها من السالب إلى الموجب.`
			],
			solutionStepsAr: [
				`حساب المشتقة وإثبات التحليل $f'(x) = \\frac{(x - ${x0})(x + ${x0})}{x^2}$.`,
				`دراسة إشارة المشتقة وتشكيل جدول التغيرات: الدالة متناقصة ثم متزايدة وتبلغ أدنى قيمة عند $x = ${x0}$.`,
				`كتابة معادلة المماس الأفقي $y = ${fMin}$ وتفسير المنحنى بيانياً.`,
				`التطبيق الاقتصادي: كمية الإنتاج المثلى هي $${x0}$ أطنان، والتكلفة المتوسطة الصغرى هي $${fMin * 1000}$ DA.`
			],
			finalAnswer: `${fMin}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 1 Parameterized Templates for Secondary 2AS Shared Core
// ═══════════════════════════════════════════════════════════════════════════════

export const SHARED_TEMPLATES_2AS_T1: ParameterizedTemplate[] = [
	tplCompositionDomainSymmetry,
	tplPolynomialCubicRoots,
	tplDerivativeTangentApprox,
	tplFiniteRandomVariable,
	tplBarycenterLoci,
	tplProblemSynthesis
];
