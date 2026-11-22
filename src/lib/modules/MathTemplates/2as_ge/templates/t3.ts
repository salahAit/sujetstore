import type { ExerciseBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng, simplifyFraction } from '../../rng';
import { saveSvgAsset } from '../../svg-helpers';
import { svgFunctionCurvePlot, svgProbabilityTree, svgVariationTable } from '../../svg-secondary';

// ═══════════════════════════════════════════════════════════════════════════════
// Dual Syntax Formatters & Local SVG Helpers — 2AS GE Trimester 3
// ═══════════════════════════════════════════════════════════════════════════════

function escXml(str: string): string {
	return str
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

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

function svgProbDistChart(items: Array<{ x: string; p: number }>): string {
	const w = 350;
	const h = 175;
	const ox = 40;
	const oy = 138;
	const plotW = 280;
	const plotH = 106;
	const slot = plotW / Math.max(1, items.length);
	const barW = Math.min(38, slot * 0.55);
	const parts: string[] = [
		`<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="8" fill="#ffffff" stroke="#cbd5e1"/>`,
		`<line x1="${ox}" y1="${oy - plotH}" x2="${ox}" y2="${oy}" stroke="#0f172a" stroke-width="1.5"/>`,
		`<line x1="${ox}" y1="${oy}" x2="${ox + plotW}" y2="${oy}" stroke="#0f172a" stroke-width="1.5"/>`
	];
	items.forEach((it, idx) => {
		const bh = Math.min(plotH, it.p * plotH);
		const bx = ox + idx * slot + (slot - barW) / 2;
		const by = oy - bh;
		parts.push(`<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${barW.toFixed(1)}" height="${bh.toFixed(1)}" fill="#2563eb" rx="2"/>`);
		parts.push(`<text x="${(bx + barW / 2).toFixed(1)}" y="${(by - 5).toFixed(1)}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e3a8a">${it.p}</text>`);
		parts.push(`<text x="${(bx + barW / 2).toFixed(1)}" y="${oy + 16}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">${escXml(it.x)}</text>`);
	});
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">${parts.join('')}</svg>`;
}

function svgLinearProgramPlot(opts: {
	xMax: number;
	yMax: number;
	polygon: Array<{ x: number; y: number; label?: string }>;
	lines: Array<{ a: number; b: number; c: number; label: string; color?: string }>;
	optPoint: { x: number; y: number; label: string };
}): string {
	const w = 380;
	const h = 250;
	const padL = 34;
	const padR = 20;
	const padT = 22;
	const padB = 28;
	const plotW = w - padL - padR;
	const plotH = h - padT - padB;
	const toPxX = (x: number) => padL + (x / opts.xMax) * plotW;
	const toPxY = (y: number) => padT + ((opts.yMax - y) / opts.yMax) * plotH;

	const parts: string[] = [
		`<defs><clipPath id="lp-clip"><rect x="${padL}" y="${padT}" width="${plotW}" height="${plotH}"/></clipPath></defs>`,
		`<rect x="${padL}" y="${padT}" width="${plotW}" height="${plotH}" fill="#f8fafc" stroke="#cbd5e1"/>`
	];

	const step = opts.xMax > 10 ? 2 : 1;
	for (let gx = 0; gx <= opts.xMax; gx += step) {
		const px = toPxX(gx);
		parts.push(`<line x1="${px.toFixed(1)}" y1="${padT}" x2="${px.toFixed(1)}" y2="${padT + plotH}" stroke="#e2e8f0" stroke-width="1"/>`);
		parts.push(`<text x="${px.toFixed(1)}" y="${padT + plotH + 13}" text-anchor="middle" font-size="9" fill="#475569">${gx}</text>`);
	}
	for (let gy = 0; gy <= opts.yMax; gy += step) {
		const py = toPxY(gy);
		parts.push(`<line x1="${padL}" y1="${py.toFixed(1)}" x2="${padL + plotW}" y2="${py.toFixed(1)}" stroke="#e2e8f0" stroke-width="1"/>`);
		if (gy > 0) {
			parts.push(`<text x="${padL - 5}" y="${(py + 3).toFixed(1)}" text-anchor="end" font-size="9" fill="#475569">${gy}</text>`);
		}
	}

	const polyStr = opts.polygon.map((p) => `${toPxX(p.x).toFixed(1)},${toPxY(p.y).toFixed(1)}`).join(' ');
	parts.push(`<polygon points="${polyStr}" fill="rgba(16,185,129,0.22)" stroke="#059669" stroke-width="2" clip-path="url(#lp-clip)"/>`);
	parts.push(`<line x1="${padL}" y1="${toPxY(0)}" x2="${padL + plotW}" y2="${toPxY(0)}" stroke="#0f172a" stroke-width="1.5"/>`);
	parts.push(`<line x1="${toPxX(0)}" y1="${padT}" x2="${toPxX(0)}" y2="${padT + plotH}" stroke="#0f172a" stroke-width="1.5"/>`);

	for (const ln of opts.lines) {
		const col = ln.color || '#1d4ed8';
		const x1 = 0;
		const y1 = ln.c / ln.b;
		const x2 = opts.xMax;
		const y2 = (ln.c - ln.a * x2) / ln.b;
		parts.push(`<line x1="${toPxX(x1).toFixed(1)}" y1="${toPxY(y1).toFixed(1)}" x2="${toPxX(x2).toFixed(1)}" y2="${toPxY(y2).toFixed(1)}" stroke="${col}" stroke-width="1.7" clip-path="url(#lp-clip)"/>`);
	}

	for (const v of opts.polygon) {
		parts.push(`<circle cx="${toPxX(v.x).toFixed(1)}" cy="${toPxY(v.y).toFixed(1)}" r="3.5" fill="#0f172a"/>`);
		if (v.label) {
			parts.push(`<text x="${(toPxX(v.x) + 4).toFixed(1)}" y="${(toPxY(v.y) - 5).toFixed(1)}" font-size="9" font-weight="bold" fill="#0f172a">${escXml(v.label)}</text>`);
		}
	}
	parts.push(`<circle cx="${toPxX(opts.optPoint.x).toFixed(1)}" cy="${toPxY(opts.optPoint.y).toFixed(1)}" r="5" fill="#dc2626" stroke="#ffffff" stroke-width="1.2"/>`);
	parts.push(`<text x="${(toPxX(opts.optPoint.x) + 6).toFixed(1)}" y="${(toPxY(opts.optPoint.y) - 6).toFixed(1)}" font-size="10" font-weight="bold" fill="#dc2626">${escXml(opts.optPoint.label)}</text>`);

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">${parts.join('')}</svg>`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Limits, Horizontal/Vertical/Oblique Asymptotes & Relative Position
// ═══════════════════════════════════════════════════════════════════════════════

const tplLimitsAsymptotes: ParameterizedTemplate = {
	id: 'tpl_2as_ge_t3_limits_asymptotes',
	grade: '2as_ge',
	trimesterId: 't3',
	domain: 'analysis',
	titleAr: 'النهايات، المستقيمات المقاربة (العمودية والأفقية والمائلة) والوضعية النسبية',
	curriculumLessonId: 'lesson_2as_ge_t3_limits_asymptotes',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const a = difficulty === 'easy' ? 1 : rng.pick([1, 2]);
		const b = rng.pick([-1, 1, 2, 3]);
		const d = rng.pick([1, 2, 3]);
		const c = rng.pick([2, 3, 4, -2, -3]);

		// f(x) = a*x + b + c/(x - d) = (a*x^2 + (b - a*d)*x + (c - b*d)) / (x - d)
		const numB = b - a * d;
		const numC = c - b * d;
		const fNumKatex = poly2Katex(a, numB, numC, 'x');
		const fNumTypst = poly2Typst(a, numB, numC, 'x');
		const fDenKatex = linearKatex(1, -d, 'x');
		const fDenTypst = linearTypst(1, -d, 'x');
		const asymKatex = linearKatex(a, b, 'x');
		const asymTypst = linearTypst(a, b, 'x');

		const curveSvg = svgFunctionCurvePlot({
			xMin: d - 4,
			xMax: d + 5,
			yMin: a * d + b - 6,
			yMax: a * d + b + 7,
			fn: (x) => (Math.abs(x - d) < 0.08 ? NaN : a * x + b + c / (x - d)),
			curveLabel: 'C_f',
			asymptotes: [
				{ kind: 'vertical', value: d, label: `x=${d}`, color: '#dc2626' },
				{ kind: 'oblique', a, b, label: 'Δ', color: '#059669' }
			]
		});
		const curveUrl = saveSvgAsset(`2as_ge_t3_lim_curve_${difficulty}_s${seed}`, curveSvg);

		const posRight = c > 0 ? 'فوق' : 'تحت';
		const posLeft = c > 0 ? 'تحت' : 'فوق';

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${d}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر الدالة $f(x) = \\frac{${fNumKatex}}{${fDenKatex}}$. يقبل المنحنى $(C_f)$ مستقيماً مقارباً عمودياً معادلته $x = a$. ما هي قيمة العدد $a$؟`,
				questionTextAr: `عيّن قيمة $a$ لمعادلة المقارب العمودي $x = a$ للدالة $f$:`,
				imageUrl: curveUrl,
				imageCaption: 'التمثيل البياني للدالة f ومقارباها',
				questionData: {
					answer: d,
					displayTemplate: 'x = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `القيمة التي تعدم المقام هي $x = ${d}$ وعندها تؤول النهاية إلى $\\pm\\infty$ (لأن البسط عند ${d} هو ${c} \\ne 0)، فالمقارب العمودي هو $x = ${d}$.`
			};
		} else if (difficulty === 'medium') {
			const wrongFlip = linearKatex(-a, b, 'x');
			const wrongShift = linearKatex(a, -b, 'x');
			const wrongZero = `${b}`;

			const mcq = buildUniqueMcqOptions(
				`$y = ${asymKatex}$`,
				[
					{
						text: `$y = ${wrongFlip}$`,
						diagnosticFeedback: `انتبه لإشارة معامل $x$: قسمة الحدين تعطي $+${a}x$ وليس $-${a}x$.`
					},
					{
						text: `$y = ${wrongShift}$`,
						diagnosticFeedback: `راجع إشارة الثابت $b = ${b}$ عند تفكيك الكسر.`
					},
					{
						text: `$y = ${wrongZero}$`,
						diagnosticFeedback: `درجة البسط ($2$) أكبر من درجة المقام ($1$) بـ $1$، فالمقارب مائل وليس أفقياً!`
					}
				],
				rng
			);
			finalAnswer = `y = ${asymKatex}`;
			quizQuestion = {
				type: 'mcq',
				questionText: `تُكتب الدالة $f$ على الشكل $f(x) = ${asymKatex} + \\frac{${c}}{${fDenKatex}}$. ما هي معادلة المستقيم المقارب المائل $(\\Delta)$ للمنحنى $(C_f)$ بجوار $\\pm\\infty$؟`,
				questionTextAr: `ما هي معادلة المقارب المائل $(\\Delta)$ للدالة $f$؟`,
				imageUrl: curveUrl,
				imageCaption: 'المنحنى (C_f) والمستقيم المقارب المائل',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `بما أن $\\lim_{x \\to \\pm\\infty} [f(x) - (${asymKatex})] = \\lim_{x \\to \\pm\\infty} \\frac{${c}}{${fDenKatex}} = 0$، فإن المستقيم $y = ${asymKatex}$ مقارب مائل.`
			};
		} else {
			const mcq = buildUniqueMcqOptions(
				`$(C_f)$ يقع ${posRight} $(\\Delta)$ على $]${d} ; +\\infty[$ و ${posLeft} $(\\Delta)$ على $]-\\infty ; ${d}[$`,
				[
					{
						text: `$(C_f)$ يقع ${posLeft} $(\\Delta)$ على $]${d} ; +\\infty[$ و ${posRight} $(\\Delta)$ على $]-\\infty ; ${d}[$`,
						diagnosticFeedback: `انتبه لإشارة البسط $c = ${c}$ عند دراسة إشارة الفرق $\\frac{${c}}{${fDenKatex}}$.`
					},
					{
						text: `$(C_f)$ يقع دائماً ${posRight} $(\\Delta)$ على كامل مجال التعريف`,
						diagnosticFeedback: `المقام $(${fDenKatex})$ يغيّر إشارته عند $x = ${d}$، وبالتالي تتبدل الوضعية النسبية!`
					},
					{
						text: `$(C_f)$ يقطع $(\\Delta)$ عند النقطة ذات الفاصلة $x = ${d}$`,
						diagnosticFeedback: `القيمة $x = ${d}$ ممنوعة أصلاً ولا تنتمي لمجموعة التعريف، والفرق $\\frac{${c}}{${fDenKatex}}$ لا ينعدم أبداً!`
					}
				],
				rng
			);
			finalAnswer = `${posRight} على ]${d}; +∞[`;
			quizQuestion = {
				type: 'mcq',
				questionText: `للدالة $f(x) = ${asymKatex} + \\frac{${c}}{${fDenKatex}}$ مقارب مائل $(\\Delta): y = ${asymKatex}$. ما هي الوضعية النسبية للمنحنى $(C_f)$ بالنسبة إلى $(\\Delta)$؟`,
				questionTextAr: `حدّد الوضعية النسبية لـ $(C_f)$ بالنسبة للمقارب $(\\Delta)$:`,
				imageUrl: curveUrl,
				imageCaption: 'الوضعية النسبية بين المنحنى والمقارب المائل',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `ندرس إشارة الفرق $f(x) - (${asymKatex}) = \\frac{${c}}{${fDenKatex}}$: على $]${d}; +\\infty[$ المقام موجب فتتبع الإشارة إشارة ${c} (${c > 0 ? '>0' : '<0'})، أي $(C_f)$ ${posRight} $(\\Delta)$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر الدالة العددية $f$ المعرفة على $D_f = ]-oo, ${d}[ union ]${d}, +oo[$ بـ:\n$f(x) = frac(${fNumTypst}, ${fDenTypst})$`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) احسب نهايات الدالة $f$ عند حدود مجموعة تعريفها ($-oo$، $+oo$، $${d}^-$ و $${d}^+$)، ثم استنتج معادلة المستقيم المقارب العمودي.\n2) تحقّق أنه من أجل كل $x != ${d}$: $f(x) = ${asymTypst} + frac(${c}, ${fDenTypst})$، ثم أثبت أن المستقيم $(Delta): y = ${asymTypst}$ مقارب مائل لـ $(C_f)$ بجوار $plus.minus oo$.`,
							answer: `1) النهايات:\n- $lim_(x arrow.r -oo) f(x) = -oo$ و $lim_(x arrow.r +oo) f(x) = +oo$.\n- عند $x = ${d}$ البسط يؤول إلى $${c}$ والمقام يؤول إلى $0$: إذا كان $c = ${c}$, فـ $lim_(x arrow.r ${d}^+) f(x) = ${c > 0 ? '+oo' : '-oo'}$ و $lim_(x arrow.r ${d}^-) f(x) = ${c > 0 ? '-oo' : '+oo'}$.\nإذن $x = ${d}$ مستقيم مقارب عمودي.\n2) التحقق بتوحيد المقامات: $(${asymTypst})(${fDenTypst}) + (${c}) = ${fNumTypst}$.\nوبما أن $lim_(x arrow.r plus.minus oo) [f(x) - (${asymTypst})] = lim_(x arrow.r plus.minus oo) frac(${c}, ${fDenTypst}) = 0$، فإن $(Delta): y = ${asymTypst}$ مقارب مائل.`,
							mark: '2'
						},
						{
							type: 'image',
							src: curveUrl,
							caption: 'المنحنى البياني (C_f) ومقارباه العمودي والمائل'
						}
					]
				},
				{
					type: 'text',
					content: `3) ادرس الوضعية النسبية للمنحنى $(C_f)$ بالنسبة إلى المستقيم المقارب المائل $(Delta)$.`,
					answer: `3) إشارة الفرق $d(x) = f(x) - (${asymTypst}) = frac(${c}, ${fDenTypst})$:\n- على $]-oo ; ${d}[$: المقام سالب، فالإشارة ${c > 0 ? 'سالبة' : 'موجبة'}، إذن $(C_f)$ يقع ${posLeft} $(Delta)$.\n- على $]${d} ; +oo[$: المقام موجب، فالإشارة ${c > 0 ? 'موجبة' : 'سالبة'}، إذن $(C_f)$ يقع ${posRight} $(Delta)$.`,
					mark: '1'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_ge',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`المقارب العمودي يوافق القيمة التي تعدم المقام وتجعل النهاية $\\pm\\infty$.`,
				`لإثبات المقارب المائل $y = ax + b$، احسب نهاية الفرق $\\lim_{x \\to \\pm\\infty}[f(x) - (ax + b)] = 0$.`,
				`الوضعية النسبية تتحدد بإشارة الفرق $f(x) - (ax + b)$ على كل مجال.`
			],
			solutionStepsAr: [
				`النهايات عند الحدود واستنتاج المقارب العمودي $x = ${d}$.`,
				`تفكيك $f(x) = ${asymKatex} + \\frac{${c}}{${fDenKatex}}$ وإثبات المقارب المائل $(\\Delta): y = ${asymKatex}$.`,
				`دراسة إشارة الفرق $\\frac{${c}}{${fDenKatex}}$ لتحديد الوضعية النسبية.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Complete Study of Homographic Function (Limits, Derivative, Symmetry, Curve)
// ═══════════════════════════════════════════════════════════════════════════════

const tplHomographicCurveStudy: ParameterizedTemplate = {
	id: 'tpl_2as_ge_t3_homographic_curve_study',
	grade: '2as_ge',
	trimesterId: 't3',
	domain: 'analysis',
	titleAr: 'دراسة دالة تناظرية: النهايات، المقاربات، المشتقة، مركز التناظر والتمثيل البياني',
	curriculumLessonId: 'lesson_2as_ge_t3_study_polynomial_homographic',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const a = difficulty === 'easy' ? rng.pick([2, 3]) : rng.pick([2, 3, 4]);
		const c = rng.pick([1, 2, -1]);
		const k = rng.pick([1, 2, -1, -2]);
		// f(x) = a + k/(x - c) = (a*x + b)/(x - c) where b = k - a*c
		const b = k - a * c;
		// f'(x) = -k / (x - c)^2
		const derivNum = -k;
		const isInc = derivNum > 0;
		const f0Katex = fracKatex(b, -c);
		const xRootKatex = fracKatex(-b, a);

		const fKatex = `\\frac{${linearKatex(a, b, 'x')}}{${linearKatex(1, -c, 'x')}}`;
		const fTypst = `frac(${linearTypst(a, b, 'x')}, ${linearTypst(1, -c, 'x')})`;

		const varTableSvg = svgVariationTable({
			fnName: 'f(x)',
			derivName: "f'(x)",
			xValues: ['-∞', `${c}`, '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: isInc ? '+' : '-' },
				{ kind: 'sign', value: '||' },
				{ kind: 'sign', value: isInc ? '+' : '-' }
			],
			variations: [
				{ value: `${a}`, position: isInc ? 'bottom' : 'top' },
				{ value: isInc ? '+∞ | -∞' : '-∞ | +∞', position: 'mid' },
				{ value: `${a}`, position: isInc ? 'top' : 'bottom' }
			]
		});
		const varTableUrl = saveSvgAsset(`2as_ge_t3_homo_var_${difficulty}_s${seed}`, varTableSvg);

		const curveSvg = svgFunctionCurvePlot({
			xMin: c - 4,
			xMax: c + 4,
			yMin: a - 5,
			yMax: a + 5,
			fn: (x) => (Math.abs(x - c) < 0.08 ? NaN : (a * x + b) / (x - c)),
			curveLabel: 'C_f',
			asymptotes: [
				{ kind: 'vertical', value: c, label: `x=${c}`, color: '#dc2626' },
				{ kind: 'horizontal', value: a, label: `y=${a}`, color: '#059669' }
			],
			points: [{ x: c, y: a, label: `Ω(${c};${a})`, color: '#7c3aed' }]
		});
		const curveUrl = saveSvgAsset(`2as_ge_t3_homo_curve_${difficulty}_s${seed}`, curveSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${a}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر الدالة التناظرية $f(x) = ${fKatex}$ المعرفة على $\\mathbb{R} \\setminus \\{${c}\\}$. احسب نهاية الدالة $\\lim_{x \\to +\\infty} f(x)$:`,
				questionTextAr: `احسب $\\lim_{x \\to +\\infty} ${fKatex}$:`,
				imageUrl: curveUrl,
				imageCaption: 'التمثيل البياني للدالة التناظرية f',
				questionData: {
					answer: a,
					displayTemplate: 'lim f(x) = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `عند $+\\infty$ نأخذ نسبة الحدين الأعلى درجة: $\\lim_{x \\to +\\infty} \\frac{${a}x}{x} = ${a}$.`
			};
		} else if (difficulty === 'medium') {
			const mcq = buildUniqueMcqOptions(
				`$\\Omega(${c} ; ${a})$`,
				[
					{
						text: `$\\Omega(${-c} ; ${a})$`,
						diagnosticFeedback: `أخطأت في إشارة الفاصلة: المقارب العمودي ينعدم عند $x - (${c}) = 0$ أي $x = ${c}$.`
					},
					{
						text: `$\\Omega(${a} ; ${c})$`,
						diagnosticFeedback: `بدّلت موضعي الفاصلة $x = ${c}$ والترتيبة $y = ${a}$!`
					},
					{
						text: `$\\Omega(${c} ; ${b})$`,
						diagnosticFeedback: `ترتيبة مركز التناظر هي المقارب الأفقي $y = ${a}$ وليس الحد الثابت في البسط.`
					}
				],
				rng
			);
			finalAnswer = `Ω(${c}; ${a})`;
			quizQuestion = {
				type: 'mcq',
				questionText: `نعتبر الدالة $f(x) = ${fKatex}$ على $\\mathbb{R} \\setminus \\{${c}\\}$. ما هي إحداثيات مركز تناظر منحناها $(C_f)$؟`,
				questionTextAr: `عيّن مركز التناظر $\\Omega$ لمنحنى $f(x) = ${fKatex}$:`,
				imageUrl: curveUrl,
				imageCaption: 'منحنى القطع الزائد ومركز تناظره',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نقطة تقاطع المقارب العمودي $x = ${c}$ والمقارب الأفقي $y = ${a}$ هي $\\Omega(${c} ; ${a})$ وهي مركز تناظر المنحنى.`
			};
		} else {
			finalAnswer = `${derivNum}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `مشتقة الدالة $f(x) = ${fKatex}$ تُكتب على الشكل $f'(x) = \\frac{\\alpha}{(${linearKatex(1, -c, 'x')})^2}$. احسب قيمة البسط $\\alpha$:`,
				questionTextAr: `عيّن البسط $\\alpha$ في مشتقة $f'(x) = \\frac{\\alpha}{(${linearKatex(1, -c, 'x')})^2}$:`,
				imageUrl: varTableUrl,
				imageCaption: 'جدول تغيرات الدالة التناظرية f',
				questionData: {
					answer: derivNum,
					displayTemplate: 'α = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `بقانون حاصل القسمة: $\\alpha = ${a}(-${c}) - 1(${b}) = ${-a * c - b} = ${derivNum}$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `نعتبر الدالة العددية $f$ المعرفة على $D_f = ]-oo, ${c}[ union ]${c}, +oo[$ بـ:\n$f(x) = ${fTypst}$\nوليكن $(C_f)$ تمثيلها البياني في معلم متعامد ومتجانس.`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) احسب نهايات $f$ عند حدود $D_f$، واستنتج معادلتي المستقيمين المقاربين لـ $(C_f)$.\n2) احسب المشتقة $f'(x)$ وادرس إشارتها، ثم شكّل جدول تغيرات $f$.`,
							answer: `1) $lim_(x arrow.r plus.minus oo) f(x) = ${a}$، إذن $y = ${a}$ مقارب أفقي.\n$lim_(x arrow.r ${c}^-) f(x) = ${isInc ? '+oo' : '-oo'}$ و $lim_(x arrow.r ${c}^+) f(x) = ${isInc ? '-oo' : '+oo'}$، إذن $x = ${c}$ مقارب عمودي.\n2) $f'(x) = frac(${derivNum}, (${linearTypst(1, -c, 'x')})^2)$ تحافظ على إشارة ${derivNum} (${isInc ? '> 0' : '< 0'})، فـ $f$ ${isInc ? 'متزايدة' : 'متناقصة'} تماماً على كل من مجالي تعريفها.`,
							mark: '2'
						},
						{
							type: 'image',
							src: varTableUrl,
							caption: 'جدول تغيرات الدالة f'
						}
					]
				},
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `3) بيّن أن النقطة $Omega (${c} ; ${a})$ هي مركز تناظر للمنحنى $(C_f)$.\n4) عيّن نقط تقاطع $(C_f)$ مع محوري الإحداثيات، ثم استنتج بيانياً عدد حلول المعادلة $f(x) = m$ حسب قيم $m in bb(R)$.`,
							answer: `3) لكل $x != ${c}$ لدينا $2(${c}) - x = ${2 * c} - x != ${c}$ و $f(${2 * c} - x) + f(x) = 2(${a})$، إذن $Omega (${c} ; ${a})$ مركز تناظر.\n4) مع $(Oy)$: $(0, ${f0Katex.replace('\\frac{', 'frac(').replace('}{', ', ').replace('}', ')')})$؛ مع $(Ox)$: $(${xRootKatex.replace('\\frac{', 'frac(').replace('}{', ', ').replace('}', ')')}, 0)$.\nالمعادلة $f(x) = m$ تقبل حلاً وحيداً لكل $m != ${a}$، ولا تقبل حلولاً عند $m = ${a}$.`,
							mark: '2'
						},
						{
							type: 'image',
							src: curveUrl,
							caption: 'التمثيل البياني (C_f) ومركز التناظر'
						}
					]
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_ge',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`النهاية عند $\\pm\\infty$ لدالة تناظرية تساوي نسبة معاملي $x$ في البسط والمقام.`,
				`إشارة $f'(x)$ ثابتة دائماً على مجالي التعريف ولا تنعدم أبداً.`,
				`لإثبات مركز التناظر $\\Omega(c; a)$، احسب $f(2c - x) + f(x) = 2a$.`
			],
			solutionStepsAr: [
				`النهايات والمقاربان $x = ${c}$ و $y = ${a}$.`,
				`حساب المشتقة $f'(x) = \\frac{${derivNum}}{(x - ${c})^2}$ وتشكيل جدول التغيرات.`,
				`إثبات مركز التناظر $\\Omega(${c}; ${a})$ وتعيين التقاطع مع المحورين.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Conditional Probability, Weighted Trees & Total Probability Formula
// ═══════════════════════════════════════════════════════════════════════════════

const tplConditionalProbTree: ParameterizedTemplate = {
	id: 'tpl_2as_ge_t3_conditional_prob_tree',
	grade: '2as_ge',
	trimesterId: 't3',
	domain: 'probability',
	titleAr: 'الاحتمالات الشرطية، شجرة الاحتمالات الموزونة ودستور الاحتمالات الكلية',
	curriculumLessonId: 'lesson_2as_ge_t3_conditional_probability_trees',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Clean decimals in 0.1 steps => exact 0.01 precision for P(D)
		const pool: Array<{ a: number; u: number; v: number }> = [
			{ a: 6, u: 5, v: 10 }, // Wait: u in hundredths! Let's store uPct, vPct
			{ a: 5, u: 4, v: 6 },
			{ a: 7, u: 2, v: 5 },
			{ a: 4, u: 5, v: 8 },
			{ a: 8, u: 3, v: 8 },
			{ a: 6, u: 4, v: 9 },
			{ a: 3, u: 6, v: 4 },
			{ a: 5, u: 3, v: 7 }
		];
		const cfg = rng.pick(pool);
		const pA10 = cfg.a; // P(A) = 0.a
		const pB10 = 10 - pA10;
		const pAD100 = cfg.u; // P_A(D) = 0.0u (e.g. 0.05)
		const pBD100 = cfg.v; // P_B(D) = 0.0v

		const pA = roundTo(pA10 / 10, 1);
		const pB = roundTo(pB10 / 10, 1);
		const pAD = roundTo(pAD100 / 100, 2);
		const pBD = roundTo(pBD100 / 100, 2);
		const pAConf = roundTo(1 - pAD, 2);
		const pBConf = roundTo(1 - pBD, 2);

		const pAndADNum = pA10 * pAD100; // out of 1000
		const pAndBDNum = pB10 * pBD100; // out of 1000
		const pDNum = pAndADNum + pAndBDNum; // out of 1000
		const pADec = roundTo(pAndADNum / 1000, 3);
		const pBDec = roundTo(pAndBDNum / 1000, 3);
		const pDDec = roundTo(pDNum / 1000, 3);

		const [bayesNum, bayesDen] = simplifyFraction(pAndADNum, pDNum); // P_D(A)

		const treeSvg = svgProbabilityTree({
			rootLabel: 'Ω',
			firstLevel: [
				{
					label: 'A',
					probLabel: `${pA}`,
					children: [
						{ label: 'D', probLabel: `${pAD}` },
						{ label: "D'", probLabel: `${pAConf}` }
					]
				},
				{
					label: 'B',
					probLabel: `${pB}`,
					children: [
						{ label: 'D', probLabel: `${pBD}` },
						{ label: "D'", probLabel: `${pBConf}` }
					]
				}
			]
		});
		const treeUrl = saveSvgAsset(`2as_ge_t3_cond_tree_${difficulty}_s${seed}`, treeSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${pADec}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `تتزود مؤسسة صناعية بقطع من ورشتين: الورشة $A$ ($${pA10 * 10}\\%$ من الإنتاج، نسبة العيوب فيها $${pAD100}\\%$) والورشة $B$ (الباقي). احسب احتمال أن تكون قطعة مسحوبة عشوائياً من الورشة $A$ ومعيبة معاً $P(A \\cap D)$:`,
				questionTextAr: `احسب احتمال التقاطع $P(A \\cap D)$:`,
				imageUrl: treeUrl,
				imageCaption: 'شجرة الاحتمالات الموزونة لمراقبة الجودة',
				questionData: {
					answer: pADec,
					displayTemplate: 'P(A ∩ D) = ?',
					variables: [],
					tolerance: 0.0005
				},
				explanation: `بتطبيق قانون جداء المسار على الشجرة: $P(A \\cap D) = P(A) \\times P_A(D) = ${pA} \\times ${pAD} = ${pADec}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${pDDec}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `بناءً على شجرة الاحتمالات المرفقة لمراقبة جودة وحدات إنتاجية ($P(A) = ${pA}$، $P_A(D) = ${pAD}$، $P_B(D) = ${pBD}$)، احسب الاحتمال الكلي $P(D)$ لكون القطعة المسحوبة معيبة:`,
				questionTextAr: `احسب الاحتمال الكلي $P(D)$:`,
				imageUrl: treeUrl,
				imageCaption: 'شجرة الاحتمالات الموزونة للمصنع',
				questionData: {
					answer: pDDec,
					displayTemplate: 'P(D) = ?',
					variables: [],
					tolerance: 0.0005
				},
				explanation: `بدستور الاحتمالات الكلية: $P(D) = ${pA} \\times ${pAD} + ${pB} \\times ${pBD} = ${pADec} + ${pBDec} = ${pDDec}$.`
			};
		} else {
			const mcq = buildUniqueMcqOptions(
				`$${fracKatex(bayesNum, bayesDen)}$`,
				[
					{
						text: `$${fracKatex(pAndADNum, 1000)}$`,
						diagnosticFeedback: `هذا احتمال التقاطع $P(A \\cap D)$ فقط؛ يجب القسمة على $P(D) = ${pDDec}$ لحساب الاحتمال الشرطي $P_D(A)$.`
					},
					{
						text: `$${fracKatex(pAD100, 100)}$`,
						diagnosticFeedback: `خلطت بين $P_A(D) = ${pAD}$ والاحتمال الشرطي المطلوب $P_D(A)$!`
					},
					{
						text: `$${fracKatex(pAndBDNum, pDNum)}$`,
						diagnosticFeedback: `هذه قيمة $P_D(B)$ وليست $P_D(A)$.`
					}
				],
				rng
			);
			finalAnswer = `${bayesNum}/${bayesDen}`;
			quizQuestion = {
				type: 'mcq',
				questionText: `إذا تبيّن أن القطعة المسحوبة معيبة ($D$)، فما هو الاحتمال الشرطي $P_D(A)$ أن يكون مصدرها الورشة $A$؟`,
				questionTextAr: `علماً أن القطعة معيبة ($D$)، ما قيمة $P_D(A)$؟`,
				imageUrl: treeUrl,
				imageCaption: 'شجرة الاحتمالات الموزونة',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `لدينا $P_D(A) = \\frac{P(A \\cap D)}{P(D)} = \\frac{${pAndADNum}}{${pDNum}} = ${fracKatex(bayesNum, bayesDen)}$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `تُصنّع مؤسسة أجهزة تغليف على خطّين: يوفر الخط $A$ نسبة $${pA10 * 10}$% من الإنتاج منها $${pAD100}$% معيبة، ويوفر الخط $B$ باقي الإنتاج بنسبة عيوب قدرها $${pBD100}$%. نسحب عشوائياً جهازاً من المخزون ونعتبر الحادثتين: $A$ «الجهاز من الخط $A$» و $D$ «الجهاز معيب».`,
			content: [
				{
					type: 'columns',
					widths: ['1.3fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) أنقل وأتمم شجرة الاحتمالات الموزونة المرفقة.\n2) احسب احتمال التقاطعين $P(A inter D)$ و $P(B inter D)$.`,
							answer: `1) إتمام الشجرة: $P(B) = 1 - ${pA} = ${pB}$، $P_A(overline(D)) = ${pAConf}$، $P_B(overline(D)) = ${pBConf}$.\n2) التقاطعان:\n- $P(A inter D) = ${pA} times ${pAD} = ${pADec}$.\n- $P(B inter D) = ${pB} times ${pBD} = ${pBDec}$.`,
							mark: '1.5'
						},
						{
							type: 'image',
							src: treeUrl,
							caption: 'شجرة الاحتمالات الموزونة لمراقبة الجودة'
						}
					]
				},
				{
					type: 'text',
					content: `3) بيّن أن احتمال سحب جهاز معيب هو $P(D) = ${pDDec}$.\n4) علماً أن الجهاز المسحوب معيب، احسب احتمال أن يكون مصدره الخط $A$ (اعط النتيجة على شكل كسر غير قابل للاختزال).`,
					answer: `3) بتطبيق دستور الاحتمالات الكلية:\n$P(D) = P(A inter D) + P(B inter D) = ${pADec} + ${pBDec} = ${pDDec}$.\n4) الاحتمال الشرطي:\n$P_D(A) = frac(P(A inter D), P(D)) = frac(${pADec}, ${pDDec}) = ${fracTypst(bayesNum, bayesDen)}$.`,
					mark: '2.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_ge',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`مجموع الاحتمالات على الفروع المنطلقة من نفس العقدة يساوي $1$.`,
				`احتمال المسار هو جداء احتمالات فروعه: $P(A \\cap D) = P(A) \\times P_A(D)$.`,
				`لحساب $P_D(A)$، اقسم $P(A \\cap D)$ على الاحتمال الكلي $P(D)$.`
			],
			solutionStepsAr: [
				`إكمال شجرة الاحتمالات وحساب $P(A \\cap D) = ${pADec}$ و $P(B \\cap D) = ${pBDec}$.`,
				`تطبيق دستور الاحتمالات الكلية: $P(D) = ${pDDec}$.`,
				`حساب الاحتمال الشرطي العكسي $P_D(A) = ${fracKatex(bayesNum, bayesDen)}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Random Variable, Probability Law, Expectation & Variance (Halal Commerce)
// ═══════════════════════════════════════════════════════════════════════════════

const tplRandomVariableCommerce: ParameterizedTemplate = {
	id: 'tpl_2as_ge_t3_random_variable_commerce',
	grade: '2as_ge',
	trimesterId: 't3',
	domain: 'probability',
	titleAr: 'المتغير العشوائي في التسيير: قانون الاحتمال، الأمل الرياضياتي، التباين والانحراف المعياري',
	curriculumLessonId: 'lesson_2as_ge_t3_random_variable_expectation_variance',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		interface RvConfig {
			xs: [number, number, number]; // net margin in 1000 DA (repair loss < 0, grade-2, grade-1)
			ps: [number, number, number]; // sum = 1.00
		}

		const pool: RvConfig[] =
			difficulty === 'easy'
				? [
						{ xs: [-5, 4, 10], ps: [0.1, 0.2, 0.7] },
						{ xs: [-4, 5, 10], ps: [0.1, 0.3, 0.6] },
						{ xs: [-6, 4, 8], ps: [0.1, 0.2, 0.7] },
						{ xs: [-5, 6, 12], ps: [0.1, 0.3, 0.6] }
					]
				: difficulty === 'medium'
					? [
							{ xs: [-8, 4, 10], ps: [0.05, 0.15, 0.8] },
							{ xs: [-6, 5, 12], ps: [0.05, 0.25, 0.7] },
							{ xs: [-10, 4, 15], ps: [0.1, 0.2, 0.7] },
							{ xs: [-8, 6, 14], ps: [0.05, 0.2, 0.75] }
						]
					: [
							{ xs: [-12, 5, 16], ps: [0.05, 0.2, 0.75] },
							{ xs: [-10, 6, 18], ps: [0.08, 0.22, 0.7] },
							{ xs: [-15, 8, 20], ps: [0.05, 0.25, 0.7] },
							{ xs: [-10, 4, 14], ps: [0.1, 0.15, 0.75] }
						];

		const cfg = rng.pick(pool);
		const [x1, x2, x3] = cfg.xs;
		const [p1, p2, p3] = cfg.ps;

		const ex = roundTo(x1 * p1 + x2 * p2 + x3 * p3, 4);
		const ex2 = roundTo(x1 * x1 * p1 + x2 * x2 * p2 + x3 * x3 * p3, 4);
		const vx = roundTo(ex2 - ex * ex, 4);
		const sigmaX = roundTo(Math.sqrt(vx), 2);
		const batchScale = 100;
		const exBatch = roundTo(batchScale * ex, 2);

		const distSvg = svgProbDistChart([
			{ x: `${x1}`, p: p1 },
			{ x: `${x2}`, p: p2 },
			{ x: `${x3}`, p: p3 }
		]);
		const distUrl = saveSvgAsset(`2as_ge_t3_rv_chart_${difficulty}_s${seed}`, distSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${ex}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `يمثل المتغير العشوائي $X$ الهامش الصافي (بآلاف الدنانير) لمنتج صناعي حسب جودة التصنيف: $X \\in \\{${x1} ; ${x2} ; ${x3}\\}$ باحتمالات $\\{${p1} ; ${p2} ; ${p3}\\}$ على الترتيب. احسب الأمل الرياضياتي $E(X)$ بآلاف الدنانير:`,
				questionTextAr: `احسب الأمل الرياضياتي $E(X)$ للمتغير العشوائي:`,
				imageUrl: distUrl,
				imageCaption: 'التمثيل البياني لقانون احتمال X',
				questionData: {
					answer: ex,
					displayTemplate: 'E(X) = ?',
					variables: [],
					tolerance: 0.01
				},
				explanation: `نضرب كل قيمة في احتمالها ونجمع: $E(X) = (${x1})(${p1}) + (${x2})(${p2}) + (${x3})(${p3}) = ${ex}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${vx}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `لقانون احتمال المتغير العشوائي $X \\in \\{${x1} ; ${x2} ; ${x3}\\}$ باحتمالات $\\{${p1} ; ${p2} ; ${p3}\\}$، لدينا $E(X) = ${ex}$ و $E(X^2) = ${ex2}$. احسب التباين $V(X)$:`,
				questionTextAr: `احسب تباين المتغير العشوائي $V(X)$:`,
				imageUrl: distUrl,
				imageCaption: 'التوزيع الاحتمالي لقيم X',
				questionData: {
					answer: vx,
					displayTemplate: 'V(X) = ?',
					variables: [],
					tolerance: 0.02
				},
				explanation: `نطبق قانون كونيغ-هيغنز: $V(X) = E(X^2) - [E(X)]^2 = ${ex2} - (${ex})^2 = ${vx}$.`
			};
		} else {
			finalAnswer = `${exBatch}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `يحقق منتج صناعي هامشاً صافياً متوسطه $E(X) = ${ex}$ ألف دينار للوحدة الواحدة. ما هو الأمل الرياضياتي $E(Y)$ لدفعة من $${batchScale}$ وحدة مستقلة ($Y = ${batchScale}X$) بآلاف الدنانير؟`,
				questionTextAr: `احسب الأمل الرياضياتي $E(${batchScale}X)$:`,
				questionData: {
					answer: exBatch,
					displayTemplate: 'E(Y) = ?',
					variables: [],
					tolerance: 0.05
				},
				explanation: `من خطية الأمل الرياضياتي: $E(${batchScale}X) = ${batchScale} \\times E(X) = ${batchScale} \\times ${ex} = ${exBatch}$ ألف دينار.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `تبيع مؤسسة تجارية أجهزة إلكترونية وتُصنفها عند المراقبة النهائية إلى ثلاث حالات:\n- الصنف الممتاز (احتمال $${p3}$): يحقق هامش ربح صافي قدره $${x3}$ آلاف دينار.\n- الصنف الثاني (احتمال $${p2}$): يحقق هامش ربح صافي قدره $${x2}$ آلاف دينار.\n- جهاز يتطلب إعادة الصيانة (احتمال $p_1$): يسبب تكلفة صافية قدرها $${x1}$ آلاف دينار.\nليكن $X$ المتغير العشوائي الذي يرفق بكل جهاز الهامش الصافي بآلاف الدنانير.`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'table',
							headers: ['$x_i$ (بآلاف الدنانير)', `$${x1}$`, `$${x2}$`, `$${x3}$`, 'المجموع'],
							cells: [],
							rows: [
								['$P(X = x_i)$', { content: '$p_1 = ...$', answer: `$${p1}$` }, `$${p2}$`, `$${p3}$`, '$1$']
							],
							headerBackground: true
						},
						{
							type: 'image',
							src: distUrl,
							caption: 'مخطط قانون احتمال المتغير العشوائي X'
						}
					]
				},
				{
					type: 'text',
					content: `1) عيّن قيمة الاحتمال $p_1$ حتى يكون الجدول قانون احتمال صحيحاً لـ $X$.\n2) احسب الأمل الرياضياتي $E(X)$ وفسّر النتيجة اقتصادياً.\n3) احسب التباين $V(X)$ ثم استنتج الانحراف المعياري $sigma(X)$ (مدوراً إلى $10^(-2)$).`,
					answer: `1) $p_1 = 1 - (${p2} + ${p3}) = ${p1}$.\n2) $E(X) = (${x1})(${p1}) + (${x2})(${p2}) + (${x3})(${p3}) = ${ex}$ ألف دينار (متوسط الهامش الصافي المتوقع لكل جهاز).\n3) $E(X^2) = (${x1})^2(${p1}) + (${x2})^2(${p2}) + (${x3})^2(${p3}) = ${ex2}$.\n$V(X) = ${ex2} - (${ex})^2 = ${vx}$، ومنه $sigma(X) = sqrt(${vx}) approx ${sigmaX}$ ألف دينار.`,
					mark: '4'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_ge',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`مجموع احتمالات جميع القيم الممكنة يساوي $1$ دوماً.`,
				`الأمل الرياضياتي هو $E(X) = \\sum x_i p_i$.`,
				`التباين هو $V(X) = \\sum x_i^2 p_i - [E(X)]^2$.`
			],
			solutionStepsAr: [
				`تعيين الاحتمال المفقود: $p_1 = 1 - (${p2} + ${p3}) = ${p1}$.`,
				`حساب الأمل الرياضياتي: $E(X) = ${ex}$ ألف دينار.`,
				`حساب التباين $V(X) = ${vx}$ والانحراف المعياري $\\sigma(X) \\approx ${sigmaX}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Linear Programming & Supply-Demand Market Equilibrium
// ═══════════════════════════════════════════════════════════════════════════════

const tplSupplyDemandLinearProg: ParameterizedTemplate = {
	id: 'tpl_2as_ge_t3_supply_demand_linear_prog',
	grade: '2as_ge',
	trimesterId: 't3',
	domain: 'algebra',
	titleAr: 'توازن العرض والطلب في السوق والبرمجة الخطية (القيود وتعظيم الربح)',
	curriculumLessonId: 'lesson_2as_ge_t3_supply_demand_linear_programming',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Part 1: Supply & Demand S(p) = sA*p - sB, D(p) = dB - dA*p
		const pStar = difficulty === 'easy' ? rng.pick([20, 30, 40]) : rng.pick([25, 35, 45, 50]);
		const sA = rng.pick([3, 4, 5]);
		const dA = rng.pick([2, 3, 5]);
		const qStar = rng.pick([60, 80, 90, 120]);
		const sB = sA * pStar - qStar; // ensure sB >= 10 by checking or adjusting
		const dB = qStar + dA * pStar;
		// Guarantee sB > 0: since sA >= 3, pStar >= 20 -> sA*pStar >= 60. Let's compute qStar safely:
		const qSafe = Math.min(qStar, sA * pStar - 15);
		const sBVal = sA * pStar - qSafe;
		const dBVal = qSafe + dA * pStar;

		// Part 2: 2-variable Linear Programming with guaranteed integer optimal corner B(xB, yB)
		// Constraints: 2x + y <= c1, x + y <= c2, x>=0, y>=0 with yB EVEN
		const xB = difficulty === 'easy' ? 3 : difficulty === 'medium' ? rng.pick([3, 4]) : rng.pick([4, 5]);
		const yB = difficulty === 'easy' ? 4 : difficulty === 'medium' ? rng.pick([4, 6]) : rng.pick([6, 8]);
		const c1 = 2 * xB + yB;
		const c2 = xB + yB;
		const xA = c1 / 2; // exact integer because yB is even!
		const yC = c2;

		// Objective Z(x, y) = alpha*x + beta*y with beta < alpha < 2*beta
		const beta = rng.pick([2, 3, 4]);
		const alpha = beta === 2 ? 3 : beta === 3 ? rng.pick([4, 5]) : rng.pick([5, 6, 7]);

		const zA = alpha * xA;
		const zB = alpha * xB + beta * yB;
		const zC = beta * yC;
		if (!(zB > zA && zB > zC)) {
			throw new Error(`LP optimality check failed: Z(B)=${zB}, Z(A)=${zA}, Z(C)=${zC}`);
		}

		const lpSvg = svgLinearProgramPlot({
			xMax: Math.max(c2 + 1, xA + 2),
			yMax: c1 + 1,
			polygon: [
				{ x: 0, y: 0, label: 'O' },
				{ x: xA, y: 0, label: `A(${xA};0)` },
				{ x: xB, y: yB },
				{ x: 0, y: yC, label: `C(0;${yC})` }
			],
			lines: [
				{ a: 2, b: 1, c: c1, label: `2x+y=${c1}`, color: '#1d4ed8' },
				{ a: 1, b: 1, c: c2, label: `x+y=${c2}`, color: '#7c3aed' }
			],
			optPoint: { x: xB, y: yB, label: `B(${xB};${yB})` }
		});
		const lpUrl = saveSvgAsset(`2as_ge_t3_lp_poly_${difficulty}_s${seed}`, lpSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${pStar}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `في سوق منتج غذائي، تُعطى دالة العرض بـ $S(p) = ${sA}p - ${sBVal}$ ودالة الطلب بـ $D(p) = ${dBVal} - ${dA}p$. احسب سعر التوازن $p^*$ الذي يحقق $S(p^*) = D(p^*)$:`,
				questionTextAr: `احسب سعر التوازن $p^*$ في السوق:`,
				questionData: {
					answer: pStar,
					displayTemplate: 'p* = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `نحل المعادلة $${sA}p - ${sBVal} = ${dBVal} - ${dA}p \\implies ${sA + dA}p = ${sBVal + dBVal} \\implies p^* = ${pStar}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${zB}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `منطقة الحلول الممكنة لورشة إنتاج رؤوسها $O(0; 0)$، $A(${xA}; 0)$، $B(${xB}; ${yB})$، و $C(0; ${yC})$. احسب القيمة العظمى لدالة الربح $Z(x, y) = ${alpha}x + ${beta}y$ (بآلاف الدنانير):`,
				questionTextAr: `احسب أقصى ربح ممكن $Z_{\\max}$ في مضلع الحلول:`,
				imageUrl: lpUrl,
				imageCaption: 'مضلع الحلول الممكنة للبرمجة الخطية',
				questionData: {
					answer: zB,
					displayTemplate: 'Z_max = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `بتقييم $Z$ عند الرؤوس: $Z(A) = ${zA}$، $Z(C) = ${zC}$، و $Z(B) = ${alpha}(${xB}) + ${beta}(${yB}) = ${zB}$، فالقيمة العظمى هي $${zB}$.`
			};
		} else {
			const mcq = buildUniqueMcqOptions(
				`سعر التوازن $p^* = ${pStar}$ وكمية التوازن $q^* = ${qSafe}$`,
				[
					{
						text: `سعر التوازن $p^* = ${qSafe}$ وكمية التوازن $q^* = ${pStar}$`,
						diagnosticFeedback: `بدّلت موضعي السعر $p^*$ والكمية $q^*$!`
					},
					{
						text: `سعر التوازن $p^* = ${pStar + 5}$ وكمية التوازن $q^* = ${qSafe + 10}$`,
						diagnosticFeedback: `تحقق من حل المعادلة الخطية ${sA + dA}p = ${sBVal + dBVal}.`
					},
					{
						text: `سعر التوازن $p^* = ${pStar}$ وكمية التوازن $q^* = ${dBVal}$`,
						diagnosticFeedback: `العدد $${dBVal}$ هو الطلب عند السعر $0$ ($D(0)$) وليس كمية التوازن $D(${pStar})$.`
					}
				],
				rng
			);
			finalAnswer = `p*=${pStar}, q*=${qSafe}`;
			quizQuestion = {
				type: 'mcq',
				questionText: `تخضع سلعة في السوق لدالة العرض $S(p) = ${sA}p - ${sBVal}$ ودالة الطلب $D(p) = ${dBVal} - ${dA}p$. ما هي نقطة توازن السوق $(p^* ; q^*)$؟`,
				questionTextAr: `عيّن سعر التوازن $p^*$ وكمية التوازن $q^*$:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نحل $S(p^*) = D(p^*) \\implies ${sA + dA}p^* = ${sBVal + dBVal} \\implies p^* = ${pStar}$، وبالتعويض نجد $q^* = ${sA}(${pStar}) - ${sBVal} = ${qSafe}$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `يتكوّن هذا التمرين من جزأين مستقلين في التحليل الاقتصادي التطبيقي:`,
			content: [
				{
					type: 'text',
					content: `*أولاً: توازن العرض والطلب*\nتُعطى دالة العرض لمنتج بـ $S(p) = ${sA} p - ${sBVal}$ ودالة الطلب بـ $D(p) = ${dBVal} - ${dA} p$ حيث $p$ هو السعر بالدينار.\n1) عيّن سعر التوازن $p^*$ وكمية التوازن $q^*$.\n2) ماذا يحدث في السوق إذا حُدد السعر عند $p = ${pStar + 5}$؟ احسب الفائض الناتج.`,
					answer: `أولاً:\n1) عند التوازن $S(p^*) = D(p^*)$:\n$${sA} p^* - ${sBVal} = ${dBVal} - ${dA} p^* arrow.r.double ${sA + dA} p^* = ${sBVal + dBVal} arrow.r.double p^* = ${pStar}$.\nكمية التوازن: $q^* = ${sA}(${pStar}) - ${sBVal} = ${qSafe}$.\n2) عند $p = ${pStar + 5}$: العرض $S(${pStar + 5}) = ${sA * (pStar + 5) - sBVal}$ والطلب $D(${pStar + 5}) = ${dBVal - dA * (pStar + 5)}$، فيحدث فائض في العرض قدره $${(sA + dA) * 5}$ وحدة.`,
					mark: '1.5'
				},
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `*ثانياً: البرمجة الخطية*\nتنتج ورشة يومياً $x$ وحدة من الصنف $P_1$ و $y$ وحدة من الصنف $P_2$ وفق القيود:\n$cases(x >= 0, y >= 0, 2 x + y <= ${c1}, x + y <= ${c2})$\nوتحقق دالة ربح (بآلاف الدنانير): $Z(x, y) = ${alpha} x + ${beta} y$.\n1) عيّن جبرياً إحداثيات نقطة التقاطع $B$ للمستقيمين $2 x + y = ${c1}$ و $x + y = ${c2}$.\n2) احسب قيمة $Z$ عند جميع رؤوس مضلع الحلول الممكنة الممثل جانباً، واستنتج برنامج الإنتاج الأمثل وأقصى ربح.`,
							answer: `ثانياً:\n1) بطرح المعادلة الثانية من الأولى نجد $x_B = ${c1} - ${c2} = ${xB}$، ومنه $y_B = ${c2} - ${xB} = ${yB}$ أي $B(${xB} ; ${yB})$.\n2) تقييم دالة الربح عند الرؤوس:\n- $Z(O(0;0)) = 0$\n- $Z(A(${xA};0)) = ${alpha}(${xA}) = ${zA}$\n- $Z(B(${xB};${yB})) = ${alpha}(${xB}) + ${beta}(${yB}) = ${zB}$\n- $Z(C(0;${yC})) = ${beta}(${yC}) = ${zC}$\nإذن يتحقق أقصى ربح قدره $${zB}$ ألف دينار بإنتاج $${xB}$ وحدة من $P_1$ و $${yB}$ وحدة من $P_2$.`,
							mark: '2.5'
						},
						{
							type: 'image',
							src: lpUrl,
							caption: 'مضلع الحلول الممكنة ورؤوسه الأربعة'
						}
					]
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2as_ge',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`نقطة التوازن تحقق المساواة $S(p^*) = D(p^*)$.`,
				`في البرمجة الخطية، يتحقق الحل الأمثل دائماً عند أحد رؤوس مضلع الحلول الممكنة.`,
				`لإيجاد نقطة التقاطع $B$، اطرح معادلة القيد الثاني $x + y = ${c2}$ من الأول $2x + y = ${c1}$.`
			],
			solutionStepsAr: [
				`توازن السوق: $p^* = ${pStar}$ و $q^* = ${qSafe}$.`,
				`رؤوس مضلع الحلول الممكنة: $O(0;0)$, $A(${xA};0)$, $B(${xB};${yB})$, $C(0;${yC})$.`,
				`تقييم دالة الربح: $Z_{\\max} = Z(${xB}; ${yB}) = ${zB}$ ألف دينار.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Comprehensive Integration Problem (7 Points): Economic Average Cost Rational Study
// ═══════════════════════════════════════════════════════════════════════════════

const tplEconomicSynthesisIntegration: ParameterizedTemplate = {
	id: 'tpl_2as_ge_t3_economic_synthesis_integration',
	grade: '2as_ge',
	trimesterId: 't3',
	domain: 'integration',
	isIntegration: true,
	titleAr: 'المسألة الشاملة: دراسة دالة كلفة متوسطة ناطقة، المقارب المائل، المماس والمناقشة البيانية',
	curriculumLessonId: 'lesson_2as_ge_t3_study_polynomial_homographic',
	defaultPoints: 7,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// f(x) = a*x + b + c / x on ]0 ; +oo[, where c = a * x0^2
		// f'(x) = a*(x^2 - x0^2)/x^2 => minimum at x0 > 0 with f(x0) = 2*a*x0 + b
		const a = difficulty === 'easy' ? 1 : rng.pick([1, 2]);
		const x0 = difficulty === 'easy' ? rng.pick([2, 3]) : difficulty === 'medium' ? rng.pick([3, 4]) : rng.pick([4, 5]);
		const b = rng.pick([2, 4, 5, 6]);
		const c = a * x0 * x0;
		const minVal = 2 * a * x0 + b;

		// Tangent at x1 = 1 (exact integer slope & value!)
		const f1 = a + b + c;
		const fp1 = a - c; // < 0 because x0 >= 2 => c >= 4*a > a
		const tgIntercept = f1 - fp1; // = b + 2c

		const fKatex = `${linearKatex(a, b, 'x')} + \\frac{${c}}{x}`;
		const fTypst = `${linearTypst(a, b, 'x')} + frac(${c}, x)`;
		const asymKatex = linearKatex(a, b, 'x');
		const asymTypst = linearTypst(a, b, 'x');
		const tgKatex = `y = ${linearKatex(fp1, tgIntercept, 'x')}`;
		const tgTypst = `y = ${linearTypst(fp1, tgIntercept, 'x')}`;

		const varTableSvg = svgVariationTable({
			fnName: 'f(x)',
			derivName: "f'(x)",
			xValues: ['0', `${x0}`, '+∞'],
			derivativeRow: [
				{ kind: 'sign', value: '||' },
				{ kind: 'sign', value: '-' },
				{ kind: 'sign', value: '0' },
				{ kind: 'sign', value: '+' }
			],
			variations: [
				{ value: '+∞', position: 'top' },
				{ value: `${minVal}`, position: 'bottom' },
				{ value: '+∞', position: 'top' }
			]
		});
		const varTableUrl = saveSvgAsset(`2as_ge_t3_int_vartable_${difficulty}_s${seed}`, varTableSvg);

		const curveSvg = svgFunctionCurvePlot({
			xMin: -0.5,
			xMax: x0 * 2.4,
			yMin: 0,
			yMax: Math.ceil(Math.max(f1 + 4, (x0 * 2) * a + b + 4)),
			fn: (x) => (x > 0.15 ? a * x + b + c / x : NaN),
			curveLabel: 'C_f',
			asymptotes: [
				{ kind: 'vertical', value: 0, label: 'x=0', color: '#dc2626' },
				{ kind: 'oblique', a, b, label: 'Δ', color: '#059669' }
			],
			tangents: [{ x: 1, y: f1, slope: fp1, halfSpan: 0.7, color: '#7c3aed' }],
			points: [
				{ x: 1, y: f1, label: `A(1;${f1})`, color: '#7c3aed' },
				{ x: x0, y: minVal, label: `Min(${x0};${minVal})`, color: '#dc2626' }
			]
		});
		const curveUrl = saveSvgAsset(`2as_ge_t3_int_curve_${difficulty}_s${seed}`, curveSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${minVal}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `تُنمذج الكلفة المتوسطة للوحدة على $]0 ; +\\infty[$ بالدالة $f(x) = ${fKatex}$. تبلغ الدالة قيمتها الحدية الصغرى عند $x_0 = ${x0}$. احسب قيمة هذا الحد الأدنى $f(${x0})$:`,
				questionTextAr: `احسب القيمة الحدية الصغرى $f(${x0})$:`,
				imageUrl: varTableUrl,
				imageCaption: 'جدول تغيرات الدالة f على ]0 ; +∞[',
				questionData: {
					answer: minVal,
					displayTemplate: `f(${x0}) = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `نعوض $x = ${x0}$ في العبارة: $f(${x0}) = ${a}(${x0}) + ${b} + \\frac{${c}}{${x0}} = ${a * x0} + ${b} + ${a * x0} = ${minVal}$.`
			};
		} else if (difficulty === 'medium') {
			const wrongForget = `y = ${linearKatex(fp1, f1, 'x')}`;
			const wrongSign = `y = ${linearKatex(-fp1, f1 + fp1, 'x')}`;
			const wrongSwap = `y = ${linearKatex(f1, fp1 - f1, 'x')}`;

			const mcq = buildUniqueMcqOptions(
				`$${tgKatex}$`,
				[
					{
						text: `$${wrongForget}$`,
						diagnosticFeedback: `نسيت طرح $f'(1) = ${fp1}$ عند نشر $y = f'(1)(x - 1) + f(1)$.`
					},
					{
						text: `$${wrongSign}$`,
						diagnosticFeedback: `أخطأت في إشارة العدد المشتق $f'(1) = ${a} - ${c} = ${fp1}$.`
					},
					{
						text: `$${wrongSwap}$`,
						diagnosticFeedback: `بدّلت موضعي $f'(1) = ${fp1}$ و $f(1) = ${f1}$.`
					}
				],
				rng
			);
			finalAnswer = tgKatex;
			quizQuestion = {
				type: 'mcq',
				questionText: `لتكن الدالة $f(x) = ${fKatex}$ على $]0 ; +\\infty[$. ما هي معادلة المماس $(T)$ للمنحنى $(C_f)$ عند النقطة ذات الفاصلة $x_1 = 1$؟`,
				questionTextAr: `ما هي معادلة المماس $(T)$ لـ $(C_f)$ عند $x_1 = 1$؟`,
				imageUrl: curveUrl,
				imageCaption: 'المنحنى (C_f) والمماس عند x = 1',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `لدينا $f(1) = ${f1}$ و $f'(1) = ${a} - \\frac{${c}}{1^2} = ${fp1}$، ومنه $y = ${fp1}(x - 1) + ${f1} \\implies ${tgKatex}$.`
			};
		} else {
			const mcq = buildUniqueMcqOptions(
				`لا توجد حلول إذا $m < ${minVal}$، حل وحيد إذا $m = ${minVal}$، وحلّان متمايزان إذا $m > ${minVal}$`,
				[
					{
						text: `حلّان متمايزان إذا $m < ${minVal}$، ولا توجد حلول إذا $m > ${minVal}$`,
						diagnosticFeedback: `النقطة $f(${x0}) = ${minVal}$ هي **قيمة صغرى** ($\\lim_{0^+} f = \\lim_{+\\infty} f = +\\infty$)، لذا يكون المنحنى فوق $y = ${minVal}$ وليس تحته!`
					},
					{
						text: `حل وحيد لكل $m \\in \\mathbb{R}$ لأن الدالة رتيبة تماماً`,
						diagnosticFeedback: `الدالة متناقصة على $]0; ${x0}]$ ثم متزايدة على $[${x0}; +\\infty[$، فهي ليست رتيبة تماماً.`
					},
					{
						text: `حلّان متمايزان فقط من أجل $${minVal} < m < ${f1}$`,
						diagnosticFeedback: `بما أن $\\lim_{+\\infty} f(x) = +\\infty$، فالمستقيم الأفقي يقطع المنحنى في نقطتين لكل $m > ${minVal}$ دون سقف أعلى.`
					}
				],
				rng
			);
			finalAnswer = `حلان من أجل m > ${minVal}`;
			quizQuestion = {
				type: 'mcq',
				questionText: `تبلغ الدالة $f(x) = ${fKatex}$ قيمتها الحدية الصغرى الشاملة $f(${x0}) = ${minVal}$ على $]0 ; +\\infty[$ مع $\\lim_{x \\to 0^+} f(x) = \\lim_{x \\to +\\infty} f(x) = +\\infty$. ما هي المناقشة البيانية الصحيحة لعدد حلول المعادلة $f(x) = m$ ($m \\in \\mathbb{R}$)؟`,
				questionTextAr: `حدّد المناقشة البيانية لعدد حلول المعادلة $f(x) = m$ على $]0 ; +\\infty[$:`,
				imageUrl: curveUrl,
				imageCaption: 'منحنى الدالة f للمناقشة البيانية الأفقية',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `حسب جدول التغيرات: تنزل $f$ من $+\\infty$ إلى القيمة الصغرى $${minVal}$ ثم تصعد إلى $+\\infty$. إذن: لا حلول إذا $m < ${minVal}$، حل وحيد إذا $m = ${minVal}$، وحلّان متمايزان إذا $m > ${minVal}$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			customTitle: 'التمرين الرابع — المسألة الاقتصادية الشاملة',
			instruction: `نعتبر على المجال $]0 ; +oo[$ الدالة العددية $f$ المعرفة بـ:\n$f(x) = ${fTypst}$\nوالتي تمثّل الكلفة المتوسطة للطن (بآلاف الدنانير) لإنتاج $x$ طن من مادة صناعية. ليكن $(C_f)$ تمثيلها البياني في معلم متعامد.`,
			content: [
				{
					type: 'columns',
					widths: ['1.4fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) احسب $lim_(x arrow.r 0^+) f(x)$ وفسّر النتيجة هندسياً، ثم احسب $lim_(x arrow.r +oo) f(x)$.\n2) بيّن أن المستقيم $(Delta): y = ${asymTypst}$ مقارب مائل لـ $(C_f)$ بجوار $+oo$، وحدّد الوضعية النسبية لـ $(C_f)$ و $(Delta)$.\n3) احسب $f'(x)$ وادرس إشارتها على $]0 ; +oo[$، ثم شكّل جدول تغيرات الدالة $f$.`,
							answer: `1) $lim_(x arrow.r 0^+) f(x) = +oo$، فالمستقيم $x = 0$ (حامل محور التراتيب) مقارب عمودي. و $lim_(x arrow.r +oo) f(x) = +oo$.\n2) $lim_(x arrow.r +oo) [f(x) - (${asymTypst})] = lim_(x arrow.r +oo) frac(${c}, x) = 0$، إذن $(Delta): y = ${asymTypst}$ مقارب مائل.\nعلى $]0 ; +oo[$ لدينا $frac(${c}, x) > 0$، إذن $(C_f)$ يقع دوماً فوق $(Delta)$.\n3) $f'(x) = ${a} - frac(${c}, x^2) = frac(${a}(x - ${x0})(x + ${x0}), x^2)$: سالبة على $]0 ; ${x0}[$ وموجبة على $]${x0} ; +oo[$.`,
							mark: '3.5'
						},
						{
							type: 'image',
							src: varTableUrl,
							caption: 'جدول تغيرات الكلفة المتوسطة f(x)'
						}
					]
				},
				{
					type: 'columns',
					widths: ['1.4fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `4) ما هي كمية الإنتاج التي تحقّق أدنى كلفة متوسطة للطن وما قيمتها؟\n5) اكتب معادلة المماس $(T)$ للمنحنى $(C_f)$ عند النقطة ذات الفاصلة $x_1 = 1$.\n6) ناقش بيانياً وحسب قيم سعر البيع المقترح $m in bb(R)$ عدد مستويات الإنتاج التي تحقق التوازن $f(x) = m$.`,
							answer: `4) تبلغ الكلفة المتوسطة حدها الأدنى عند $x_0 = ${x0}$ أطنان وتساوي $f(${x0}) = ${minVal}$ ألف دينار.\n5) عند $x_1 = 1$: $f(1) = ${f1}$ و $f'(1) = ${fp1}$، ومنه $(T): ${tgTypst}$.\n6) المناقشة البيانية الأفقية لـ $f(x) = m$:\n- إذا $m < ${minVal}$: لا تقبل المعادلة حلاً (سعر البيع أقل من أدنى كلفة).\n- إذا $m = ${minVal}$: حل وحيد $x = ${x0}$.\n- إذا $m > ${minVal}$: حلّان متمايزان في $]0 ; +oo[$.`,
							mark: '3.5'
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
			grade: '2as_ge',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`المستقيم $x = 0$ مقارب عمودي لأن $\\lim_{x \\to 0^+} f(x) = +\\infty$.`,
				`الفرق $f(x) - (${asymKatex}) = \\frac{${c}}{x} > 0$ يثبت المقارب المائل والوضعية فوق $(\\Delta)$ مباشرة.`,
				`في المناقشة الأفقية $f(x) = m$، اعتمد على جدول تغيرات $f$ والقيمة الحدية الصغرى $f(${x0}) = ${minVal}$.`
			],
			solutionStepsAr: [
				`النهايات والمقاربان: $x = 0$ عمودي و $(\\Delta): y = ${asymKatex}$ مائل، و $(C_f)$ فوق $(\\Delta)$.`,
				`المشتقة $f'(x) = \\frac{${a}(x^2 - ${x0 * x0})}{x^2}$ وأدنى كلفة متوسطة $f(${x0}) = ${minVal}$.`,
				`معادلة المماس $(T): ${tgKatex}$ والمناقشة البيانية لـ $f(x) = m$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 3 Parameterized Templates for 2AS GE
// ═══════════════════════════════════════════════════════════════════════════════

export const TEMPLATES_2AS_GE_T3: ParameterizedTemplate[] = [
	tplLimitsAsymptotes,
	tplHomographicCurveStudy,
	tplConditionalProbTree,
	tplRandomVariableCommerce,
	tplSupplyDemandLinearProg,
	tplEconomicSynthesisIntegration
];
