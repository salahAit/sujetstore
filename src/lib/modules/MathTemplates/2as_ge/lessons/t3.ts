import type { InteractiveLessonData } from '../../types';
import { svgFunctionCurvePlot, svgProbabilityTree, svgVariationTable } from '../../svg-secondary';

function escXml(str: string): string {
	return str
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

function svgLinearProgramPlot(opts: {
	xMax: number;
	yMax: number;
	polygon: Array<{ x: number; y: number; label?: string }>;
	lines: Array<{ a: number; b: number; c: number; label: string; color?: string }>;
	optPoint: { x: number; y: number; label: string };
	title?: string;
}): string {
	const w = 390;
	const h = 260;
	const padL = 36;
	const padR = 22;
	const padT = 28;
	const padB = 30;
	const plotW = w - padL - padR;
	const plotH = h - padT - padB;
	const toPxX = (x: number) => padL + (x / opts.xMax) * plotW;
	const toPxY = (y: number) => padT + ((opts.yMax - y) / opts.yMax) * plotH;

	const parts: string[] = [];
	parts.push(`<defs><clipPath id="lp-clip"><rect x="${padL}" y="${padT}" width="${plotW}" height="${plotH}"/></clipPath></defs>`);
	parts.push(`<rect x="${padL}" y="${padT}" width="${plotW}" height="${plotH}" fill="#f8fafc" stroke="#cbd5e1"/>`);
	if (opts.title) {
		parts.push(`<text x="${w / 2}" y="18" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">${escXml(opts.title)}</text>`);
	}

	// Grid
	const xStep = opts.xMax > 10 ? 2 : 1;
	const yStep = opts.yMax > 10 ? 2 : 1;
	for (let gx = 0; gx <= opts.xMax; gx += xStep) {
		const px = toPxX(gx);
		parts.push(`<line x1="${px.toFixed(1)}" y1="${padT}" x2="${px.toFixed(1)}" y2="${padT + plotH}" stroke="#e2e8f0" stroke-width="1"/>`);
		parts.push(`<text x="${px.toFixed(1)}" y="${padT + plotH + 14}" text-anchor="middle" font-size="9.5" fill="#475569">${gx}</text>`);
	}
	for (let gy = 0; gy <= opts.yMax; gy += yStep) {
		const py = toPxY(gy);
		parts.push(`<line x1="${padL}" y1="${py.toFixed(1)}" x2="${padL + plotW}" y2="${py.toFixed(1)}" stroke="#e2e8f0" stroke-width="1"/>`);
		if (gy > 0) {
			parts.push(`<text x="${padL - 6}" y="${(py + 3).toFixed(1)}" text-anchor="end" font-size="9.5" fill="#475569">${gy}</text>`);
		}
	}

	// Feasible polygon
	const polyStr = opts.polygon.map((p) => `${toPxX(p.x).toFixed(1)},${toPxY(p.y).toFixed(1)}`).join(' ');
	parts.push(`<polygon points="${polyStr}" fill="rgba(16,185,129,0.22)" stroke="#059669" stroke-width="2" clip-path="url(#lp-clip)"/>`);

	// Axes
	parts.push(`<line x1="${padL}" y1="${toPxY(0)}" x2="${padL + plotW}" y2="${toPxY(0)}" stroke="#0f172a" stroke-width="1.6"/>`);
	parts.push(`<line x1="${toPxX(0)}" y1="${padT}" x2="${toPxX(0)}" y2="${padT + plotH}" stroke="#0f172a" stroke-width="1.6"/>`);

	// Constraint lines a*x + b*y = c
	for (const ln of opts.lines) {
		const col = ln.color || '#1d4ed8';
		const pts: [number, number][] = [];
		if (ln.b !== 0) {
			pts.push([0, ln.c / ln.b]);
			pts.push([opts.xMax, (ln.c - ln.a * opts.xMax) / ln.b]);
		} else if (ln.a !== 0) {
			pts.push([ln.c / ln.a, 0]);
			pts.push([ln.c / ln.a, opts.yMax]);
		}
		if (pts.length === 2) {
			parts.push(
				`<line x1="${toPxX(pts[0][0]).toFixed(1)}" y1="${toPxY(pts[0][1]).toFixed(1)}" x2="${toPxX(pts[1][0]).toFixed(1)}" y2="${toPxY(pts[1][1]).toFixed(1)}" stroke="${col}" stroke-width="1.8" clip-path="url(#lp-clip)"/>`
			);
			const lx = Math.min(opts.xMax * 0.7, ln.a > 0 ? (ln.c / ln.a) * 0.45 : 1);
			const ly = ln.b !== 0 ? (ln.c - ln.a * lx) / ln.b : opts.yMax * 0.7;
			if (ly > 0.3 && ly < opts.yMax - 0.3) {
				parts.push(`<text x="${(toPxX(lx) + 6).toFixed(1)}" y="${(toPxY(ly) - 5).toFixed(1)}" font-size="10" font-weight="bold" fill="${col}">${escXml(ln.label)}</text>`);
			}
		}
	}

	// Vertices & Optimal Point
	for (const v of opts.polygon) {
		parts.push(`<circle cx="${toPxX(v.x).toFixed(1)}" cy="${toPxY(v.y).toFixed(1)}" r="3.5" fill="#0f172a"/>`);
		if (v.label) {
			parts.push(`<text x="${(toPxX(v.x) + 5).toFixed(1)}" y="${(toPxY(v.y) - 5).toFixed(1)}" font-size="9.5" font-weight="bold" fill="#0f172a">${escXml(v.label)}</text>`);
		}
	}
	parts.push(`<circle cx="${toPxX(opts.optPoint.x).toFixed(1)}" cy="${toPxY(opts.optPoint.y).toFixed(1)}" r="5" fill="#dc2626" stroke="#ffffff" stroke-width="1.2"/>`);
	parts.push(`<text x="${(toPxX(opts.optPoint.x) + 7).toFixed(1)}" y="${(toPxY(opts.optPoint.y) - 6).toFixed(1)}" font-size="10.5" font-weight="bold" fill="#dc2626">${escXml(opts.optPoint.label)}</text>`);

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">${parts.join('')}</svg>`;
}

function svgProbDistChart(items: Array<{ x: string; p: number }>): string {
	const w = 360;
	const h = 180;
	const ox = 42;
	const oy = 142;
	const plotW = 290;
	const plotH = 110;
	const slot = plotW / Math.max(1, items.length);
	const barW = Math.min(40, slot * 0.55);
	const parts: string[] = [
		`<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="8" fill="#ffffff" stroke="#cbd5e1"/>`,
		`<line x1="${ox}" y1="${oy - plotH}" x2="${ox}" y2="${oy}" stroke="#0f172a" stroke-width="1.6"/>`,
		`<line x1="${ox}" y1="${oy}" x2="${ox + plotW}" y2="${oy}" stroke="#0f172a" stroke-width="1.6"/>`
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

// ═══════════════════════════════════════════════════════════════════════════════
// 2AS GE — Trimester 3 Interactive Lessons (5 Lessons, yearSubjectId: 738)
// 100% Halal Economic & Managerial Contexts (Zero usurious interest)
// ═══════════════════════════════════════════════════════════════════════════════

export const LESSONS_2AS_GE_T3: InteractiveLessonData[] = [
	// ---------------------------------------------------------------------------
	// 1. Limits & Asymptotes (Horizontal, Vertical & Oblique)
	// ---------------------------------------------------------------------------
	{
		id: 'lesson_2as_ge_t3_limits_asymptotes',
		slug: '2as-ge-t3-limits-asymptotes',
		grade: '2as_ge',
		yearSubjectId: 738,
		trimesterId: 't3',
		sequenceId: 'seq7',
		sequenceTitleAr: 'المقطع السابع: النهايات، المستقيمات المقاربة ودراسة الدوال',
		order: 1,
		titleAr: 'النهايات والمستقيمات المقاربة (الأفقية والعمودية والمائلة)',
		objectives: [
			'حساب نهايات الدوال كثيرات الحدود والناطقة عند $\\pm\\infty$ وعند القيم الممنوعة (بقيم صغرى وبقيم كبرى)',
			'رفع حالات عدم التعيين المألوفة ($\\frac{\\infty}{\\infty}$ و $\\frac{0}{0}$ و $+\\infty - \\infty$) باستعمال قاعدة الحد الأعلى درجة أو التحليل والاختزال',
			'استنتاج معادلات المستقيمات المقاربة الأفقية والعمودية والمائلة ودراسة الوضعية النسبية للمنحنى بالنسبة لمقاربه'
		],
		keywordsAr: [
			'النهايات',
			'مقارب أفقي',
			'مقارب عمودي',
			'مقارب مائل',
			'الوضعية النسبية'
		],
		discover: {
			scenarioAr:
				'تُمثّل دالة الكلفة المتوسطة لإنتاج $x > 2$ طن من التمور المصنعة بالعبارة $f(x) = x + 1 + \\frac{4}{x - 2} = \\frac{x^2 - x + 2}{x - 2}$. عندما يقترب $x$ من $2^+$ أو يؤول إلى $+\\infty$، كيف يتصرف المنحنى $(C_f)$ وما علاقته بالمستقيم $(\\Delta): y = x + 1$؟',
			svg: svgFunctionCurvePlot({
				xMin: -2,
				xMax: 7,
				yMin: -4,
				yMax: 11,
				fn: (x) => (Math.abs(x - 2) < 0.08 ? NaN : x + 1 + 4 / (x - 2)),
				curveLabel: 'C_f',
				asymptotes: [
					{ kind: 'vertical', value: 2, label: 'x = 2', color: '#dc2626' },
					{ kind: 'oblique', a: 1, b: 1, label: 'y = x + 1', color: '#059669' }
				],
				points: [
					{ x: 0, y: -1, label: '(0; -1)', color: '#1d4ed8' },
					{ x: 4, y: 7, label: 'Min(4; 7)', color: '#15803d' }
				]
			}),
			steps: [
				{
					promptAr:
						'احسب $\\lim_{x \\to +\\infty} \\frac{4}{x - 2}$، ثم استنتج نهاية الفرق $\\lim_{x \\to +\\infty} [f(x) - (x + 1)]$.',
					hintAr: 'عندما يؤول المقام $x - 2$ إلى $+\\infty$، إلى ماذا يؤول الكسر $\\frac{4}{x - 2}$؟',
					expectedInput: '0',
					revealAr:
						'لدينا $\\lim_{x \\to +\\infty} [f(x) - (x + 1)] = \\lim_{x \\to +\\infty} \\frac{4}{x - 2} = 0$، إذن المستقيم $(\\Delta): y = x + 1$ **مقارب مائل** للمنحنى $(C_f)$ بجوار $+\\infty$ (و $-\\infty$).'
				},
				{
					promptAr:
						'عندما يؤول $x$ إلى $2^+$ ($x > 2$)، فإن $x - 2 \\to 0^+$، فتكون $\\lim_{x \\to 2^+} f(x) = +\\infty$. ما هي معادلة المستقيم المقارب العمودي $x = a$؟ اكتب قيمة $a$ فقط.',
					hintAr: 'القيمة التي تجعل النهاية غير منتهية هي القيمة الممنوعة للمقام.',
					expectedInput: '2',
					revealAr:
						'بما أن $\\lim_{x \\to 2^+} f(x) = +\\infty$ و $\\lim_{x \\to 2^-} f(x) = -\\infty$، فإن المستقيم ذا المعادلة $x = 2$ مستقيم **مقارب عمودي** للمنحنى $(C_f)$.'
				},
				{
					promptAr:
						'لدراسة الوضعية النسبية بين $(C_f)$ والمقارب $(\\Delta)$ على $]2; +\\infty[$، ندرس إشارة الفرق $f(x) - (x + 1) = \\frac{4}{x - 2}$. هل يقع $(C_f)$ فوق $(\\Delta)$ أم تحته على $]2; +\\infty[$؟ (اكتب: فوق أو تحت)',
					hintAr: 'من أجل $x > 2$ لدينا $x - 2 > 0$ والبسط $4 > 0$.',
					expectedInput: 'فوق',
					revealAr:
						'من أجل $x > 2$ يكون $\\frac{4}{x - 2} > 0$ أي $f(x) > x + 1$، وبالتالي يقع المنحنى $(C_f)$ **فوق** المستقيم المقارب $(\\Delta)$ على $]2; +\\infty[$ (وتحته على $]-\\infty; 2[$).'
				},
				{
					promptAr:
						'احسب النهاية عند $+\\infty$ للدالة التناظرية $g(x) = \\frac{6x^2 - 5x + 1}{2x^2 + 3}$ باستعمال قاعدة الحدين الأعلى درجة.',
					hintAr: 'تؤوول الدالة عند $+\\infty$ إلى نهاية نسبة الحدين الأعلى درجة $\\frac{6x^2}{2x^2}$.',
					expectedInput: '3',
					revealAr:
						'لدينا $\\lim_{x \\to +\\infty} g(x) = \\lim_{x \\to +\\infty} \\frac{6x^2}{2x^2} = 3$، والمستقيم $y = 3$ مقارب أفقي لـ $(C_g)$ بجوار $\\pm\\infty$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**نهايات كثيرات الحدود والدوال الناطقة عند $\\pm\\infty$**:\n- نهاية كثير حدود عند $\\pm\\infty$ هي نهاية **حده الأعلى درجة**.\n- نهاية دالة ناطقة $\\frac{P(x)}{Q(x)}$ عند $\\pm\\infty$ هي نهاية **حاصل قسمة الحدين الأعلى درجة** في البسط والمقام بعد الاختزال.',
				'**النهاية عند عدد حقيقي $a$ وحالات عدم التعيين**: إذا آلت الدالة إلى $\\frac{L}{0}$ مع $L \\ne 0$ فالنهاية $\\pm\\infty$ (تتحدد بإشارة البسط والمقام يميناً ويساراً). أما إذا ظهرت حالة عدم التعيين $\\frac{0}{0}$ في دالة ناطقة، فنحلل البسط والمقام بالعامل $(x - a)$ ونختزله.',
				'**المستقيمات المقاربة الثلاثة**:\n- **مقارب عمودي** ($x = a$): إذا كانت $\\lim_{x \\to a} f(x) = \\pm\\infty$ (من اليمين أو اليسار).\n- **مقارب أفقي** ($y = b$): إذا كانت $\\lim_{x \\to \\pm\\infty} f(x) = b \\in \\mathbb{R}$.\n- **مقارب مائل** ($y = ax + b$ مع $a \\ne 0$): إذا كانت $\\lim_{x \\to \\pm\\infty} [f(x) - (ax + b)] = 0$.',
				'**الوضعية النسبية**: لدراسة وضع $(C_f)$ بالنسبة للمقارب $(\\Delta): y = ax + b$، ندرس إشارة الفرق $d(x) = f(x) - (ax + b)$: إذا كان $d(x) > 0$ فـ $(C_f)$ فوق $(\\Delta)$، وإذا كان $d(x) < 0$ فـ $(C_f)$ تحته، وإذا انعدم فهما يتقاطعان.'
			],
			visualSvg: svgFunctionCurvePlot({
				xMin: -3,
				xMax: 5,
				yMin: -3,
				yMax: 7,
				fn: (x) => (Math.abs(x - 1) < 0.08 ? NaN : (2 * x + 1) / (x - 1)),
				curveLabel: 'f(x)=(2x+1)/(x-1)',
				asymptotes: [
					{ kind: 'vertical', value: 1, label: 'x = 1', color: '#dc2626' },
					{ kind: 'horizontal', value: 2, label: 'y = 2', color: '#059669' }
				],
				points: [{ x: 1, y: 2, label: 'Ω(1; 2)', color: '#7c3aed' }]
			}),
			visualCaptionAr: 'المقارب العمودي $x = 1$ والمقارب الأفقي $y = 2$ لمنحنى دالة تناظرية',
			examples: [
				{
					problemAr: 'احسب النهاية $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$ بعد إزالة حالة عدم التعيين.',
					solutionAr:
						'بالتعويض المباشر نجد $\\frac{0}{0}$ (حالة عدم تعيين).\nنحلل البسط باستعمال المتطابقة الشهيرة: $x^2 - 9 = (x - 3)(x + 3)$.\nمن أجل $x \\ne 3$: $\\frac{x^2 - 9}{x - 3} = x + 3$، ومنه $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3} = \\lim_{x \\to 3} (x + 3) = 6$.'
				},
				{
					problemAr:
						'لتكن $f(x) = \\frac{2x^2 - x + 3}{x - 1}$ على $\\mathbb{R} \\setminus \\{1\\}$. عيّن $a, b, c$ بحيث $f(x) = ax + b + \\frac{c}{x - 1}$، واستنتج معادلة المقارب المائل.',
					solutionAr:
						'بتوحيد المقامات في $ax + b + \\frac{c}{x - 1} = \\frac{ax^2 + (b - a)x + (c - b)}{x - 1}$ وبالمطابقة:\n$a = 2$، $b - 2 = -1 \\implies b = 1$، $c - 1 = 3 \\implies c = 4$.\nإذن $f(x) = 2x + 1 + \\frac{4}{x - 1}$. بما أن $\\lim_{x \\to \\pm\\infty} \\frac{4}{x - 1} = 0$، فإن المستقيم $y = 2x + 1$ مقارب مائل لـ $(C_f)$.'
				}
			],
			watchOutAr:
				'انتبه عند حساب النهايات عند قيمة ممنوعة $x_0$: يجب دراسة إشارة المقام يمين $x_0$ ويسار $x_0$ للتمييز بين $+\\infty$ و $-\\infty$! كما أن قاعدة الحد الأعلى درجة تُطبق **فقط** عند $+\\infty$ و $-\\infty$ ولا تُطبق أبداً عند عدد منتهٍ $x_0$.'
		},
		practice: [
			{
				questionAr: 'ما هي النهاية $\\lim_{x \\to +\\infty} \\frac{4x^3 - 2x + 7}{2x^3 + x^2 - 1}$؟',
				options: ['$2$', '$4$', '$0$', '$+\\infty$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! نهاية الدالة الناطقة عند $+\\infty$ تساوي نسبة الحدين الأعلى درجة: $\\frac{4x^3}{2x^3} = 2$.',
					'أهملت معامل المقام $2$ في $2x^3$.',
					'درجتا البسط والمقام متساويتان ($3 = 3$)، فالنهاية لا تساوي $0$.',
					'النهاية منتهية وتساوي $2$ لأن البسط والمقام من نفس الدرجة.'
				],
				explanationAr:
					'بتطبيق قاعدة الحدين الأعلى درجة عند $+\\infty$: $\\lim_{x \\to +\\infty} \\frac{4x^3}{2x^3} = 2$.'
			},
			{
				questionAr: 'إذا كانت الدالة $f$ معرفة على $]1; +\\infty[$ بالعبارة $f(x) = -2x + 5 + \\frac{3}{x - 1}$، فما هي معادلة مستقيمها المقارب المائل بجوار $+\\infty$؟',
				options: ['$y = -2x + 5$', '$x = 1$', '$y = 3$', '$y = 2x + 5$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! لأن $\\lim_{x \\to +\\infty} [f(x) - (-2x + 5)] = \\lim_{x \\to +\\infty} \\frac{3}{x - 1} = 0$.',
					'$x = 1$ هو مستقيم مقارب عمودي وليس مقارباً مائلاً!',
					'$y = 3$ ليس مقارباً؛ الجزء التآلفي هو $-2x + 5$.',
					'انتبه لإشارة معامل $x$: هي $-2$ وليست $+2$.'
				],
				explanationAr:
					'بما أن $\\lim_{x \\to +\\infty} [f(x) - (-2x + 5)] = \\lim_{x \\to +\\infty} \\frac{3}{x - 1} = 0$، فإن المستقيم ذا المعادلة $y = -2x + 5$ مقارب مائل.'
			},
			{
				questionAr: 'احسب $\\lim_{x \\to 2^+} \\frac{x + 3}{x - 2}$:',
				options: ['$+\\infty$', '$-\\infty$', '$1$', '$0$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! البسط يؤول إلى $2 + 3 = 5 > 0$ والمقام $x - 2$ يؤول إلى $0^+$ (موجب لأن $x > 2$)، فالحاصل $+\\infty$.',
					'لو كان $x \\to 2^-$ لكان المقام سالباً والنهاية $-\\infty$، لكن هنا $x \\to 2^+$.',
					'قاعدة نسبة المعاملات $1/1$ تطبق عند $\\pm\\infty$ وليس عند $x \\to 2^+$.',
					'المقام هو الذي يؤول إلى $0$ وليس البسط، لذا الناتج غير منتهٍ.'
				],
				explanationAr:
					'من أجل $x \\to 2^+$ ($x > 2$) لدينا $\\lim_{x \\to 2^+} (x + 3) = 5 > 0$ و $\\lim_{x \\to 2^+} (x - 2) = 0^+$، إذن النهاية تساوي $+\\infty$.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// 2. Complete Function Study (Polynomials & Homographic Functions)
	// ---------------------------------------------------------------------------
	{
		id: 'lesson_2as_ge_t3_study_polynomial_homographic',
		slug: '2as-ge-t3-study-polynomial-homographic',
		grade: '2as_ge',
		yearSubjectId: 738,
		trimesterId: 't3',
		sequenceId: 'seq7',
		sequenceTitleAr: 'المقطع السابع: النهايات، المستقيمات المقاربة ودراسة الدوال',
		order: 2,
		titleAr: 'دراسة دوال كثيرات حدود ودوال تناظرية وتمثيلها البياني',
		objectives: [
			'تنفيذ خطة دراسة دالة كثيرة حدود من الدرجة 3 (مجموعة التعريف، النهايات، المشتقة، جدول التغيرات، نقط التقاطع مع المحورين، التمثيل البياني)',
			'دراسة دالة تناظرية $f(x) = \\frac{ax + b}{cx + d}$ (القيمة الممنوعة، المقاربان، المشتقة، ومركز التناظر $\\Omega(-\\frac{d}{c} ; \\frac{a}{c})$)',
			'حل معادلات بيانياً مثل $f(x) = m$ ومناقشة عدد حلولها وفق الوسيط الحقيقي $m$'
		],
		keywordsAr: [
			'دالة تناظرية',
			'كثير حدود من الدرجة 3',
			'جدول التغيرات',
			'مركز التناظر',
			'المناقشة البيانية'
		],
		discover: {
			scenarioAr:
				'نعتبر الدالة التناظرية $f$ المعرفة على $\\mathbb{R} \\setminus \\{1\\}$ بـ $f(x) = \\frac{3x - 2}{x - 1}$. نريد كتابتها على الشكل المختزل، تعيين مقاربيها ومركز تناظرها $\\Omega$، وتحديد اتجاه تغيرها لرسم منحناها $(C_f)$.',
			svg: svgFunctionCurvePlot({
				xMin: -3,
				xMax: 5,
				yMin: -2,
				yMax: 8,
				fn: (x) => (Math.abs(x - 1) < 0.08 ? NaN : (3 * x - 2) / (x - 1)),
				curveLabel: 'C_f',
				asymptotes: [
					{ kind: 'vertical', value: 1, label: 'x = 1', color: '#dc2626' },
					{ kind: 'horizontal', value: 3, label: 'y = 3', color: '#059669' }
				],
				points: [
					{ x: 1, y: 3, label: 'Ω(1; 3)', color: '#7c3aed' },
					{ x: 0, y: 2, label: '(0; 2)', color: '#1d4ed8' },
					{ x: 2, y: 4, label: '(2; 4)', color: '#15803d' }
				]
			}),
			steps: [
				{
					promptAr:
						'اكتب $f(x) = \\frac{3x - 2}{x - 1} = \\frac{3(x - 1) + k}{x - 1} = 3 + \\frac{k}{x - 1}$. ما قيمة الثابت $k$؟',
					hintAr: 'انشر $3(x - 1) = 3x - 3$ وقارنه مع البسط $3x - 2$.',
					expectedInput: '1',
					revealAr:
						'لدينا $3x - 2 = 3(x - 1) + 1$، إذن $f(x) = 3 + \\frac{1}{x - 1}$، ومنه $k = 1$.'
				},
				{
					promptAr:
						'احسب المشتقة $f\'(x) = \\frac{a}{(x - 1)^2}$ للدالة $f$. ما قيمة البسط $a$؟',
					hintAr: 'اشتق $3 + \\frac{1}{x - 1}$ أو طبق قاعدة حاصل القسمة $\\frac{3(x - 1) - 1(3x - 2)}{(x - 1)^2}$.',
					expectedInput: '-1',
					revealAr:
						'نجد $f\'(x) = \\frac{-1}{(x - 1)^2} < 0$ تماماً لكل $x \\ne 1$، فالدالة $f$ متناقصة تماماً على كل من $]-\\infty; 1[$ و $]1; +\\infty[$.'
				},
				{
					promptAr:
						'بما أن المقارب العمودي هو $x = 1$ والمقارب الأفقي هو $y = 3$، فإن تقاطعهما $\\Omega(1; 3)$ مركز تناظر للمنحنى $(C_f)$. تحقق من قيمة $f(2 - x) + f(x)$.',
					hintAr: 'عوض $2 - x$ في $3 + \\frac{1}{x - 1}$ واجمع مع $3 + \\frac{1}{x - 1}$.',
					expectedInput: '6',
					revealAr:
						'لدينا $f(2 - x) + f(x) = \\left(3 + \\frac{1}{1 - x}\\right) + \\left(3 + \\frac{1}{x - 1}\\right) = 6 = 2(3)$، ومنه $\\Omega(1; 3)$ مركز تناظر للمنحنى (قطع زائد).'
				},
				{
					promptAr:
						'بقراءة المنحنى، لأي قيمة حقيقية وحيدة للوسيط $m$ لا تقبل المعادلة $f(x) = m$ أي حل في $\\mathbb{R} \\setminus \\{1\\}$؟',
					hintAr: 'المستقيم الأفقي $y = m$ الذي لا يقطع القطع الزائد هو المقارب الأفقي.',
					expectedInput: '3',
					revealAr:
						'عندما $m = 3$، المعادلة $\\frac{3x - 2}{x - 1} = 3 \\iff 3x - 2 = 3x - 3 \\iff -2 = -3$ مستحيلة، لأن المستقيم $y = 3$ مقارب أفقي لا يقطعه المنحنى.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**خطة الدراسة الشاملة لدالة $f$**: (1) تعيين $D_f$، (2) حساب النهايات عند الحدود المفتوحة والأطراف (واستنتاج المقاربات)، (3) حساب $f\'(x)$ ودراسة إشارتها، (4) تشكيل جدول التغيرات، (5) نقط التقاطع مع المحورين $(Ox)$ و $(Oy)$، (6) رسم المنحنى $(C_f)$ مع المقاربات والمماسات المميزة.',
				'**خواص الدالة التناظرية $f(x) = \\frac{ax + b}{cx + d}$ ($c \\ne 0, ad - bc \\ne 0$)**:\n- مجموعة التعريف: $\\mathbb{R} \\setminus \\left\\{-\\frac{d}{c}\\right\\}$.\n- المستقيم $x = -\\frac{d}{c}$ مقارب عمودي، والمستقيم $y = \\frac{a}{c}$ مقارب أفقي.\n- المشتقة: $f\'(x) = \\frac{ad - bc}{(cx + d)^2}$ تحافظ على إشارة ثابتة هي إشارة المحدد $ad - bc$.\n- تقاطع المقاربين $\\Omega\\left(-\\frac{d}{c} ; \\frac{a}{c}\\right)$ هو **مركز تناظر** للمنحنى (قطع زائد).',
				'**دراسة دالة كثيرة حدود من الدرجة 3**: $P(x) = ax^3 + bx^2 + cx + d$ معرفة ومستمرة وقابلة للاشتقاق على $\\mathbb{R}$، مشتقتها $P\'(x) = 3ax^2 + 2bx + c$ ثلاثي حدود من الدرجة 2 تُدرس إشارته بالمميز $\\Delta$، وإذا انعدمت $P\'\'(x) = 6ax + 2b$ عند $x_I = -\\frac{b}{3a}$ فإن $I(x_I; P(x_I))$ نقطة انعطاف ومركز تناظر للمنحنى.'
			],
			visualSvg: svgVariationTable({
				xValues: ['-∞', '0', '2', '+∞'],
				derivativeRow: [
					{ kind: 'sign', value: '+' },
					{ kind: 'sign', value: '0' },
					{ kind: 'sign', value: '-' },
					{ kind: 'sign', value: '0' },
					{ kind: 'sign', value: '+' }
				],
				variations: [
					{ value: '-∞', position: 'bottom' },
					{ value: '4', position: 'top' },
					{ value: '0', position: 'bottom' },
					{ value: '+∞', position: 'top' }
				],
				fnName: 'P(x)',
				derivName: "P'(x)"
			}),
			visualCaptionAr: 'جدول تغيرات كثير الحدود $P(x) = x^3 - 3x^2 + 4$ ومناقشة حلول المعادلة $P(x) = m$',
			examples: [
				{
					problemAr:
						'لتكن $P(x) = x^3 - 3x^2 + 4$ على $\\mathbb{R}$. ادرس تغيرات $P$ وناقش بيانياً عدد حلول المعادلة $P(x) = m$.',
					solutionAr:
						'- النهايات: $\\lim_{-\\infty} P(x) = -\\infty$ و $\\lim_{+\\infty} P(x) = +\\infty$.\n- المشتقة: $P\'(x) = 3x^2 - 6x = 3x(x - 2)$، تنعدم عند $0$ و $2$.\n- القيمة الحدية العظمى المحلية $P(0) = 4$ والصغرى المحلية $P(2) = 0$.\n- **المناقشة البيانية $P(x) = m$**:\n  - إذا $m < 0$ أو $m > 4$: حل وحيد.\n  - إذا $m = 0$ أو $m = 4$: حلّان (أحدهما مضاعف).\n  - إذا $0 < m < 4$: ثلاثة حلول متمايزة.'
				},
				{
					problemAr: 'عيّن نقط تقاطع منحنى $f(x) = \\frac{3x - 2}{x - 1}$ مع محوري الإحداثيات.',
					solutionAr:
						'- مع $(Oy)$ ($x = 0$): $f(0) = \\frac{-2}{-1} = 2 \\implies (0; 2)$.\n- مع $(Ox)$ ($f(x) = 0$): $3x - 2 = 0 \\implies x = \\frac{2}{3} \\implies \\left(\\frac{2}{3}; 0\\right)$.'
				}
			],
			watchOutAr:
				'في الدالة التناظرية $f(x) = \\frac{ax + b}{cx + d}$، لا تنسَ وضع **الخطين المزدوجين** ($||$) تحت القيمة الممنوعة $-\\frac{d}{c}$ في جدول التغيرات! وبيانياً، يتكون المنحنى من فرعين منفصلين في ربعين متقابلين حول مركز التناظر $\\Omega$.'
		},
		practice: [
			{
				questionAr: 'ما هي إحداثيات مركز التناظر $\\Omega$ لمنحنى الدالة التناظرية $f(x) = \\frac{4x + 1}{2x - 6}$؟',
				options: ['$\\Omega(3 ; 2)$', '$\\Omega(6 ; 4)$', '$\\Omega(-3 ; 2)$', '$\\Omega(2 ; 3)$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! القيمة الممنوعة تعدم $2x - 6 = 0 \\implies x = 3$، والنهاية عند $\\pm\\infty$ هي $\\frac{4}{2} = 2$، إذن $\\Omega(3; 2)$.',
					'لم تقسم على معامل $x$ في المقام ($2$): القيمة الممنوعة هي $3$ والمقارب الأفقي $2$.',
					'انتبه للإشارة: $2x - 6 = 0$ تعطي $x = +3$ وليس $-3$.',
					'بدّلت موضعي الفاصلة $3$ والترتيبة $2$.'
				],
				explanationAr:
					'المقارب العمودي هو $x = \\frac{6}{2} = 3$ والمقارب الأفقي هو $y = \\frac{4}{2} = 2$، فتقاطعهما $\\Omega(3; 2)$ هو مركز تناظر المنحنى.'
			},
			{
				questionAr:
					'إذا كان جدول تغيرات الدالة $P(x) = x^3 - 3x + 2$ يُظهر قيمة حدية عظمى محلية $P(-1) = 4$ وصغرى محلية $P(1) = 0$ (مع $\\lim_{-\\infty} P = -\\infty$ و $\\lim_{+\\infty} P = +\\infty$)، فكم حلاً للمعادلة $P(x) = 2$؟',
				options: ['ثلاثة حلول متمايزة', 'حلان فقط', 'حل وحيد', 'لا توجد حلول'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! لأن القيمة $m = 2$ محصورة تماماً بين $0$ و $4$ ($0 < 2 < 4$)، فيقطع المستقيم $y = 2$ الفروع الثلاثة للمنحنى.',
					'عدد الحلول هو $2$ فقط عند $m = 0$ أو $m = 4$.',
					'يكون الحل وحيداً عندما $m < 0$ أو $m > 4$.',
					'بما أن النهايات $\\pm\\infty$ فالمعادلة $P(x) = m$ تقبل دوماً حلاً واحداً على الأقل لكل $m \\in \\mathbb{R}$.'
				],
				explanationAr:
					'على كل من المجالات $]-\\infty; -1]$ و $[-1; 1]$ و $[1; +\\infty[$ تقطع القيمة $2 \\in ]0; 4[$ مدى الدالة مرة واحدة، إذن للمعادلة $3$ حلول متمايزة.'
			},
			{
				questionAr:
					'لتكن $f(x) = \\frac{2x + 5}{x + 1}$ على $\\mathbb{R} \\setminus \\{-1\\}$. هل الدالة $f$ متزايدة أم متناقصة على كل من مجالي تعريفها؟',
				options: [
					'متناقصة تماماً لأن $f\'(x) = \\frac{-3}{(x + 1)^2} < 0$',
					'متزايدة تماماً لأن معامل البسط $2 > 0$',
					'متناقصة على $]-\\infty; -1[$ ومتزايدة على $]-1; +\\infty[$',
					'متزايدة تماماً لأن $f\'(x) = \\frac{7}{(x + 1)^2} > 0$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! حسب قانون القسمة: $f\'(x) = \\frac{2(x + 1) - 1(2x + 5)}{(x + 1)^2} = \\frac{2 - 5}{(x + 1)^2} = \\frac{-3}{(x + 1)^2} < 0$.',
					'إشارة مشتقة الدالة التناظرية تتبع المحدد $ad - bc = 2(1) - 5(1) = -3 < 0$ وليس $a$ وحده.',
					'المقام $(x + 1)^2$ مربع موجب تماماً دائماً، لذا لا تتغير إشارة $f\'(x)$ بين المجاليين.',
					'انتبه للإشارة في $-1(2x + 5) = -2x - 5$: $2 - 5 = -3$ وليس $+7$.'
				],
				explanationAr:
					'مشتقة $f$ هي $f\'(x) = \\frac{2(x+1) - (2x+5)}{(x+1)^2} = \\frac{-3}{(x+1)^2} < 0$، فالدالة متناقصة تماماً على كل من $]-\\infty; -1[$ و $]-1; +\\infty[$.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// 3. Conditional Probability & Weighted Probability Trees
	// ---------------------------------------------------------------------------
	{
		id: 'lesson_2as_ge_t3_conditional_probability_trees',
		slug: '2as-ge-t3-conditional-probability-trees',
		grade: '2as_ge',
		yearSubjectId: 738,
		trimesterId: 't3',
		sequenceId: 'seq8',
		sequenceTitleAr: 'المقطع الثامن: الاحتمالات الشرطية والمتغيرات العشوائية في التسيير',
		order: 3,
		titleAr: 'الاحتمالات، الاحتمالات الشرطية وشجرة الاحتمالات الموزونة',
		objectives: [
			'حساب احتمال حادثة وتوظيف قوانين الاتحاد ($P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$) والحادثة العكسية',
			'تعريف وحساب الاحتمال الشرطي $P_A(B) = \\frac{P(A \\cap B)}{P(A)}$ وإنشاء شجرة الاحتمالات الموزونة وتطبيق قواعدها',
			'تطبيق دستور الاحتمالات الكلية $P(B) = P(A)P_A(B) + P(\\overline{A})P_{\\overline{A}}(B)$ والتحقق من استقلال حادثتين'
		],
		keywordsAr: [
			'الاحتمال الشرطي',
			'شجرة الاحتمالات',
			'الاحتمالات الكلية',
			'الاستقلال',
			'مراقبة الجودة'
		],
		discover: {
			scenarioAr:
				'ينتج مصنع أغلفة تغليف بخطي إنتاج: الخط $A$ يوفر $60\\%$ من الإنتاج وتبلغ نسبة القطع المعيبة ($D$) فيه $5\\%$، بينما يوفر الخط $B$ النسبة المتبقية ($40\\%$) بنسبة عيوب $10\\%$. نسحب قطعة عشوائياً من المخزون الكلي للمصنع.',
			svg: svgProbabilityTree({
				rootLabel: 'Ω',
				firstLevel: [
					{
						label: 'A',
						probLabel: '0.60',
						children: [
							{ label: 'D', probLabel: '0.05' },
							{ label: "D'", probLabel: '0.95' }
						]
					},
					{
						label: 'B',
						probLabel: '0.40',
						children: [
							{ label: 'D', probLabel: '0.10' },
							{ label: "D'", probLabel: '0.90' }
						]
					}
				]
			}),
			steps: [
				{
					promptAr:
						'ما هي قيمة الاحتمال الشرطي $P_A(\\overline{D})$ (احتمال أن تكون القطعة صالحة علماً أنها من الخط $A$)؟',
					hintAr: 'مجموع احتمالي الفرعين المنطلقين من نفس العقدة $A$ يساوي $1$.',
					expectedInput: '0.95',
					revealAr:
						'من عقدة $A$ لدينا $P_A(D) + P_A(\\overline{D}) = 1 \\implies P_A(\\overline{D}) = 1 - 0.05 = 0.95$.'
				},
				{
					promptAr: 'احسب احتمال التقاطع $P(A \\cap D)$ (قطعة من الخط $A$ ومعيبة).',
					hintAr: 'احتمال مسار يساوي جداء الاحتمالات على أغصانه: $P(A) \\times P_A(D)$.',
					expectedInput: '0.03',
					revealAr: 'لدينا $P(A \\cap D) = P(A) \\times P_A(D) = 0.60 \\times 0.05 = 0.03$.'
				},
				{
					promptAr:
						'بتطبيق دستور الاحتمالات الكلية، احسب احتمال أن تكون القطعة المسحوبة معيبة $P(D)$.',
					hintAr: 'اجمع احتمالي المسارين المؤديين إلى $D$: $P(A \\cap D) + P(B \\cap D) = 0.03 + 0.40 \\times 0.10$.',
					expectedInput: '0.07',
					revealAr:
						'حسب دستور الاحتمالات الكلية: $P(D) = P(A)P_A(D) + P(B)P_B(D) = 0.03 + 0.04 = 0.07$ ($7\\%$).'
				},
				{
					promptAr:
						'علماً أن القطعة المسحوبة كانت معيبة ($D$)، احسب احتمال أن يكون مصدرها الخط $B$ أي $P_D(B)$ (اكتب الكسر المدوّر إلى رقمين بعد الفاصلة مثلاً 0.57، علماً أن $\\frac{4}{7} \\approx 0.57$).',
					hintAr: 'طبق تعريف الاحتمال الشرطي: $P_D(B) = \\frac{P(B \\cap D)}{P(D)} = \\frac{0.04}{0.07}$.',
					expectedInput: '0.57',
					revealAr:
						'لدينا $P_D(B) = \\frac{P(B \\cap D)}{P(D)} = \\frac{0.04}{0.07} = \\frac{4}{7} \\approx 0.57$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**الاحتمال الشرطي**: لتكن $A$ و $B$ حادثتين مع $P(A) > 0$. احتمال تحقق الحادثة $B$ علماً أن الحادثة $A$ محققة هو:\n$$P_A(B) = \\frac{P(A \\cap B)}{P(A)} \\quad \\Longleftrightarrow \\quad P(A \\cap B) = P(A) \\times P_A(B)$$',
				'**قواعد شجرة الاحتمالات الموزونة**:\n1. مجموع الاحتمالات على الأغصان الصادرة عن نفس العقدة يساوي $1$.\n2. احتمال مسار يساوي **جداء** احتمالات أغصانه ($P(A \\cap B) = P(A) \\times P_A(B)$).\n3. احتمال حادثة $B$ يساوي **مجموع** احتمالات كل المسارات التي تنتهي عند $B$ (**دستور الاحتمالات الكلية**): إذا شكّلت $A_1, A_2, \\dots, A_n$ تجزئة لـ $\\Omega$ فإن:\n$$P(B) = P(A_1)P_{A_1}(B) + P(A_2)P_{A_2}(B) + \\dots + P(A_n)P_{A_n}(B)$$',
				'**استقلال حادثتين**: نقول إن الحادثتين $A$ و $B$ مستقلتان إذا وفقط إذا كان $P(A \\cap B) = P(A) \\times P(B)$ (وهو ما يكافئ $P_A(B) = P(B)$ عندما $P(A) > 0$).'
			],
			visualSvg: svgProbabilityTree({
				rootLabel: 'Ω',
				firstLevel: [
					{
						label: 'M1',
						probLabel: '0.7',
						children: [
							{ label: 'C', probLabel: '0.9' },
							{ label: "C'", probLabel: '0.1' }
						]
					},
					{
						label: 'M2',
						probLabel: '0.3',
						children: [
							{ label: 'C', probLabel: '0.8' },
							{ label: "C'", probLabel: '0.2' }
						]
					}
				]
			}),
			visualCaptionAr: 'نموذج شجرة احتمالات موزونة لتقييم مطابقة المنتجات ($C$) عبر آلتين $M_1$ و $M_2$',
			examples: [
				{
					problemAr:
						'تستورد شركة قطع غيار من مُمونَين: $M_1$ ($70\\%$ من المخزون، نسبة المطابقة $90\\%$) و $M_2$ ($30\\%$ من المخزون، نسبة المطابقة $80\\%$). احسب احتمال سحب قطعة مطابقة للمعايير ($C$) ثم احسب $P_C(M_1)$.',
					solutionAr:
						'- دستور الاحتمالات الكلية: $P(C) = 0.7 \\times 0.9 + 0.3 \\times 0.8 = 0.63 + 0.24 = 0.87$.\n- احتمال أن تكون من $M_1$ علماً أنها مطابقة: $P_C(M_1) = \\frac{P(M_1 \\cap C)}{P(C)} = \\frac{0.63}{0.87} = \\frac{21}{29} \\approx 0.724$.'
				},
				{
					problemAr:
						'في دراسة تجارية لـ $200$ زبون: $120$ زبوناً يفضلون الدفع الإلكتروني ($E$)، $90$ يفضلون التوصيل السريع ($L$)، و $54$ يفضلون الخدمة معاً ($E \\cap L$). هل الحادثتان $E$ و $L$ مستقلتان؟',
					solutionAr:
						'لدينا $P(E) = \\frac{120}{200} = 0.6$، و $P(L) = \\frac{90}{200} = 0.45$، و $P(E \\cap L) = \\frac{54}{200} = 0.27$.\nبما أن $P(E) \\times P(L) = 0.6 \\times 0.45 = 0.27 = P(E \\cap L)$، فإن الحادثتين $E$ و $L$ **مستقلتان**.'
				}
			],
			watchOutAr:
				'أشهر فخ في الاحتمالات الشرطية هو الخلط بين $P_A(B)$ (احتمال $B$ علماً أن $A$ وقع) و $P(A \\cap B)$ (احتمال وقوعهما معاً)! تذكر أن القراءة على الشجرة في المستوى الثاني تُعطي $P_A(B)$ (الشرطي) وليس $P(A \\cap B)$ (الذي ينتج عن **ضرب** فرعي المسار).'
		},
		practice: [
			{
				questionAr:
					'إذا كان $P(A) = 0.4$ و $P_A(B) = 0.35$، فما هي قيمة احتمال التقاطع $P(A \\cap B)$؟',
				options: ['$0.14$', '$0.75$', '$0.875$', '$0.05$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! حسب تعريف الاحتمال الشرطي: $P(A \\cap B) = P(A) \\times P_A(B) = 0.4 \\times 0.35 = 0.14$.',
					'لا نجمع الاحتمالين لحساب التقاطع!',
					'قسمت $0.35$ على $0.4$ بدلاً من ضربهما.',
					'طرحت الاحتمالين بدل ضربهما.'
				],
				explanationAr:
					'نطبق علاقة الجداء: $P(A \\cap B) = P(A) \\times P_A(B) = 0.4 \\times 0.35 = 0.14$.'
			},
			{
				questionAr:
					'من شجرة احتمالات: $P(E) = 0.5$ و $P_E(F) = 0.2$ و $P_{\\overline{E}}(F) = 0.6$. ما هي قيمة الاحتمال الكلي $P(F)$؟',
				options: ['$0.4$', '$0.8$', '$0.3$', '$0.1$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! لدينا $P(\\overline{E}) = 1 - 0.5 = 0.5$، ومنه $P(F) = 0.5(0.2) + 0.5(0.6) = 0.1 + 0.3 = 0.4$.',
					'جمعت الاحتمالين الشرطيين $0.2 + 0.6 = 0.8$ دون ضربهما في احتمالي $E$ و $\\overline{E}$!',
					'هذا $P(\\overline{E} \\cap F) = 0.3$ فقط؛ نسيت إضافة المسار الأول $P(E \\cap F) = 0.1$.',
					'هذا $P(E \\cap F) = 0.1$ فقط.'
				],
				explanationAr:
					'بدستور الاحتمالات الكلية: $P(F) = P(E)P_E(F) + P(\\overline{E})P_{\\overline{E}}(F) = 0.5 \\times 0.2 + 0.5 \\times 0.6 = 0.10 + 0.30 = 0.40$.'
			},
			{
				questionAr:
					'علماً أن $P(A) = 0.5$ و $P(B) = 0.4$ والحادثتان $A$ و $B$ **مستقلتان**، ما هي قيمة $P(A \\cup B)$؟',
				options: ['$0.7$', '$0.9$', '$0.2$', '$0.5$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! بالاستقلال نجد $P(A \\cap B) = 0.5 \\times 0.4 = 0.2$، ومنه $P(A \\cup B) = 0.5 + 0.4 - 0.2 = 0.7$.',
					'نسيت طرح $P(A \\cap B)$! الحادثتان مستقلتان وليستا متنافيتين (غير متلائمتين).',
					'$0.2$ هو احتمال التقاطع $P(A \\cap B)$ وليس الاتحاد $P(A \\cup B)$.',
					'تحقق من قانون الاتحاد: $P(A) + P(B) - P(A \\cap B) = 0.9 - 0.2 = 0.7$.'
				],
				explanationAr:
					'لأن $A$ و $B$ مستقلتان فإن $P(A \\cap B) = 0.5 \\times 0.4 = 0.2$، وبقانون الاتحاد: $P(A \\cup B) = 0.5 + 0.4 - 0.2 = 0.7$.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// 4. Random Variables, Expectation, Variance & Standard Deviation
	// ---------------------------------------------------------------------------
	{
		id: 'lesson_2as_ge_t3_random_variable_expectation_variance',
		slug: '2as-ge-t3-random-variable-expectation-variance',
		grade: '2as_ge',
		yearSubjectId: 738,
		trimesterId: 't3',
		sequenceId: 'seq8',
		sequenceTitleAr: 'المقطع الثامن: الاحتمالات الشرطية والمتغيرات العشوائية في التسيير',
		order: 4,
		titleAr: 'المتغير العشوائي، قانون الاحتمال، الأمل الرياضياتي والتباين',
		objectives: [
			'تعيين مجموعة قيم متغير عشوائي متقطع $X$ وإنشاء جدول قانون احتماله مع التحقق من $\\sum p_i = 1$',
			'حساب الأمل الرياضياتي $E(X)$ وتفسيره اقتصادياً كمتوسط الهامش الصافي أو الكلفة المتوقعة للوحدة',
			'حساب التباين $V(X) = E(X^2) - [E(X)]^2$ والانحراف المعياري $\\sigma(X)$ وتطبيق خواص $aX + b$'
		],
		keywordsAr: [
			'المتغير العشوائي',
			'قانون الاحتمال',
			'الأمل الرياضياتي',
			'التباين',
			'الانحراف المعياري'
		],
		discover: {
			scenarioAr:
				'تُصنّع مؤسسة أجهزة لوحية وتُصنّفها عند المراقبة النهائية إلى ثلاث فئات: $80\\%$ من الصنف الأول بهامش ربح صافي $10$ آلاف دج، $15\\%$ من الصنف الثاني بهامش ربح صافي $4$ آلاف دج، و $5\\%$ تتطلب إعادة تهيئة بتكلفة صافية قدرها $-8$ آلاف دج. ليكن $X$ المتغير العشوائي الذي يمثل الهامش الصافي (بآلاف الدنانير) لجهاز مسحوب عشوائياً.',
			svg: svgProbDistChart([
				{ x: 'x1=-8', p: 0.05 },
				{ x: 'x2=4', p: 0.15 },
				{ x: 'x3=10', p: 0.8 }
			]),
			steps: [
				{
					promptAr:
						'تحقق أن مجموع الاحتمالات $p_1 + p_2 + p_3 = 0.05 + 0.15 + 0.80$ يساوي القيمة المرجعية $S$. ما قيمة $S$؟',
					hintAr: 'مجموع احتمالات جميع قيم المتغير العشوائي ثابت دوماً.',
					expectedInput: '1',
					revealAr: 'لدينا $0.05 + 0.15 + 0.80 = 1$، وهو شرط صحة أي قانون احتمال.'
				},
				{
					promptAr:
						'احسب الأمل الرياضياتي $E(X) = (-8)(0.05) + 4(0.15) + 10(0.80)$ بآلاف الدنانير.',
					hintAr: 'احسب $-0.4 + 0.6 + 8$.',
					expectedInput: '8.2',
					revealAr:
						'الأمل الرياضياتي هو $E(X) = -0.4 + 0.6 + 8 = 8.2$ ألف دينار ($8\\,200\\text{ DA}$)، وهو متوسط الهامش الصافي المتوقع لكل جهاز على المدى الطويل.'
				},
				{
					promptAr:
						'احسب $E(X^2) = (-8)^2(0.05) + 4^2(0.15) + 10^2(0.80)$.',
					hintAr: 'احسب $64(0.05) + 16(0.15) + 100(0.80) = 3.2 + 2.4 + 80$.',
					expectedInput: '85.6',
					revealAr: 'لدينا $E(X^2) = 3.2 + 2.4 + 80 = 85.6$.'
				},
				{
					promptAr:
						'استنتج تباين المتغير العشوائي $V(X) = E(X^2) - [E(X)]^2$.',
					hintAr: 'احسب $85.6 - (8.2)^2 = 85.6 - 67.24$.',
					expectedInput: '18.36',
					revealAr:
						'التباين هو $V(X) = 85.6 - 67.24 = 18.36$، ومنه الانحراف المعياري $\\sigma(X) = \\sqrt{18.36} \\approx 4.28$ ألف دينار.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**المتغير العشوائي وقانون احتماله**: ليكن $\\Omega$ كون إمكانيات تجربة عشوائية. المتغير العشوائي $X$ هو دالة ترفق بكل مخرج عدداً حقيقياً. مجموعة قيمه $X(\\Omega) = \\{x_1, x_2, \\dots, x_k\\}$، ويُعرّف قانون احتماله بإرفاق كل قيمة $x_i$ باحتمالها $p_i = P(X = x_i)$ بحيث $\\sum_{i=1}^{k} p_i = 1$.',
				'**الأمل الرياضياتي $E(X)$**: هو القيمة المتوسطة المرجحة بالاحتمالات:\n$$E(X) = \\sum_{i=1}^{k} x_i \\cdot p_i$$',
				'**التباين $V(X)$ والانحراف المعياري $\\sigma(X)$**:\n$$V(X) = \\sum_{i=1}^{k} (x_i - E(X))^2 p_i = \\left(\\sum_{i=1}^{k} x_i^2 p_i\\right) - [E(X)]^2 = E(X^2) - [E(X)]^2$$\nوالانحراف المعياري هو $\\sigma(X) = \\sqrt{V(X)}$.',
				'**الخطية ($Y = aX + b$)**: $E(aX + b) = a E(X) + b$، و $V(aX + b) = a^2 V(X)$، و $\\sigma(aX + b) = |a|\\sigma(X)$.'
			],
			visualSvg: svgProbDistChart([
				{ x: '0', p: 0.25 },
				{ x: '1', p: 0.5 },
				{ x: '2', p: 0.25 }
			]),
			visualCaptionAr: 'تمثيل بالأعمدة لقانون احتمال متناظر ($X \\in \\{0, 1, 2\\}$) حيث $E(X) = 1$ و $V(X) = 0.5$',
			examples: [
				{
					problemAr:
						'قانون احتمال متغير عشوائي $X$ معرّف على $\\{0, 1, 2\\}$ بـ $P(X=0) = 0.2$، $P(X=1) = 2a$، $P(X=2) = 3a$. عيّن $a$ ثم احسب $E(X)$ و $V(X)$.',
					solutionAr:
						'- من شرط المجموع $0.2 + 2a + 3a = 1 \\implies 5a = 0.8 \\implies a = 0.16$.\n- إذن $p_0 = 0.20$, $p_1 = 0.32$, $p_2 = 0.48$.\n- $E(X) = 0(0.20) + 1(0.32) + 2(0.48) = 0.32 + 0.96 = 1.28$.\n- $E(X^2) = 0 + 1(0.32) + 4(0.48) = 2.24 \\implies V(X) = 2.24 - 1.28^2 = 2.24 - 1.6384 = 0.6016$.'
				},
				{
					problemAr:
						'في المثال السابق، إذا كان $Y = 500X + 200$، احسب $E(Y)$ و $V(Y)$ دون إعادة تشكيل جدول $Y$.',
					solutionAr:
						'- $E(Y) = 500 E(X) + 200 = 500(1.28) + 200 = 840$.\n- $V(Y) = 500^2 V(X) = 250\\,000 \\times 0.6016 = 150\\,400$.'
				}
			],
			watchOutAr:
				'احذر عند حساب $V(X) = E(X^2) - [E(X)]^2$ من إهمال تربيع $E(X)$ أو من تربيع الاحتمال $p_i^2$ بدل قيمة المتغير $x_i^2$! القاعدة هي $\\sum x_i^2 p_i$ (نربّع $x_i$ فقط ولا نربع $p_i$).'
		},
		practice: [
			{
				questionAr:
					'يأخذ متغير عشوائي $X$ القيم $\\{1, 2, 4\\}$ باحتمالات $\\{0.5, 0.3, p_3\\}$ على الترتيب. ما قيمة $p_3$ والأمل الرياضياتي $E(X)$؟',
				options: [
					'$p_3 = 0.2$ و $E(X) = 1.9$',
					'$p_3 = 0.2$ و $E(X) = 2.33$',
					'$p_3 = 0.8$ و $E(X) = 4.3$',
					'$p_3 = 0.3$ و $E(X) = 2.3$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! لدينا $p_3 = 1 - (0.5 + 0.3) = 0.2$، ومنه $E(X) = 1(0.5) + 2(0.3) + 4(0.2) = 0.5 + 0.6 + 0.8 = 1.9$.',
					'حسبت الوسط الحسابي غير المرجّح $(1+2+4)/3$! في المتغير العشوائي نضرب كل قيمة في احتمالها.',
					'نسيت طرح $0.8$ من $1$: مجموع الاحتمالات يجب أن يساوي $1$.',
					'تحقق من جمع الاحتمالات: $0.5 + 0.3 + 0.3 = 1.1 > 1$ وهو مستحيل.'
				],
				explanationAr:
					'مجموع الاحتمالات يساوي $1$ إذن $p_3 = 1 - 0.8 = 0.2$. الأمل الرياضياتي $E(X) = 1(0.5) + 2(0.3) + 4(0.2) = 1.9$.'
			},
			{
				questionAr:
					'إذا كان $E(X) = 6$ و $V(X) = 4$، فما هي قيمة الانحراف المعياري $\\sigma(Y)$ للمتغير $Y = 3X - 10$؟',
				options: ['$6$', '$12$', '$36$', '$2$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! لدينا $\\sigma(X) = \\sqrt{4} = 2$، وبما أن $\\sigma(aX + b) = |a|\\sigma(X)$ فإن $\\sigma(Y) = 3 \\times 2 = 6$.',
					'العدد $12$ ينتج عن $3 \\times 4$ (ضربت في $V(X)$ بدل $\\sigma(X)$ دون جذر).',
					'العدد $36$ هو التباين $V(Y) = 3^2 \\times 4 = 36$ وليس الانحراف المعياري!',
					'نسيت الضرب في معامل التحويل $|a| = 3$.'
				],
				explanationAr:
					'لدينا $\\sigma(X) = \\sqrt{V(X)} = 2$، وبما أن الإزاحة $-10$ لا تغير التشتت فإن $\\sigma(3X - 10) = 3 \\sigma(X) = 6$.'
			},
			{
				questionAr:
					'متغير عشوائي يأخذ القيمتين $0$ و $1$ باحتمال $P(X = 1) = 0.4$ و $P(X = 0) = 0.6$. ما هي قيمة تباينه $V(X)$؟',
				options: ['$0.24$', '$0.4$', '$0.16$', '$0.36$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! $E(X) = 0.4$ و $E(X^2) = 1^2(0.4) = 0.4$، ومنه $V(X) = 0.4 - 0.4^2 = 0.4 - 0.16 = 0.24$ (أو $p(1-p) = 0.4 \\times 0.6$).',
					'العدد $0.4$ هو $E(X)$ وليس $V(X)$.',
					'العدد $0.16$ هو مربع الأمل $[E(X)]^2$.',
					'العدد $0.36$ هو $(0.6)^2$.'
				],
				explanationAr:
					'لدينا $E(X) = 0.4$ و $E(X^2) = 0.4$، إذن $V(X) = E(X^2) - [E(X)]^2 = 0.4 - 0.16 = 0.24$.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// 5. Linear Programming & Supply-Demand Market Equilibrium
	// ---------------------------------------------------------------------------
	{
		id: 'lesson_2as_ge_t3_supply_demand_linear_programming',
		slug: '2as-ge-t3-supply-demand-linear-programming',
		grade: '2as_ge',
		yearSubjectId: 738,
		trimesterId: 't3',
		sequenceId: 'seq9',
		sequenceTitleAr: 'المقطع التاسع: البرمجة الخطية وتوازن العرض والطلب',
		order: 5,
		titleAr: 'البرمجة الخطية (القيود وتعظيم الربح) وتقاطع منحنيي العرض والطلب',
		objectives: [
			'ترجمة قيود الإنتاج والموارد إلى جملة متراجحات خطية بمتغيرين وتعيين مضلع الحلول الممكنة بيانياً',
			'إيجاد الحل الأمثل (تعظيم الربح أو تقليص التكلفة) بحساب قيمة دالة الهدف $Z = \\alpha x + \\beta y$ عند رؤوس مضلع الحلول',
			'تحديد سعر وكمية التوازن في السوق ($p^*, q^*$) بتقاطع دالة العرض ودالة الطلب جبرياً وبيانياً'
		],
		keywordsAr: [
			'البرمجة الخطية',
			'منطقة الحلول الممكنة',
			'دالة الهدف',
			'توازن السوق',
			'العرض والطلب'
		],
		discover: {
			scenarioAr:
				'تنتج ورشة نجارة يومياً $x$ طاولة و $y$ كرسياً. يتطلب كل منتج ساعات نجارة وطلاء محدودة وفق القيود: $x \\ge 0$، $y \\ge 0$، $2x + y \\le 10$ (ساعات النجارة)، و $x + y \\le 7$ (ساعات الطلاء). تحقق الطاولة ربحاً قدره $3$ آلاف دج والكرسي ربحاً قدره $2$ ألف دج، أي دالة الهدف $Z(x, y) = 3x + 2y$. ما هو برنامج الإنتاج الأمثل؟',
			svg: svgLinearProgramPlot({
				xMax: 8,
				yMax: 11,
				polygon: [
					{ x: 0, y: 0, label: 'O(0;0)' },
					{ x: 5, y: 0, label: 'A(5;0)' },
					{ x: 3, y: 4 },
					{ x: 0, y: 7, label: 'C(0;7)' }
				],
				lines: [
					{ a: 2, b: 1, c: 10, label: '2x+y=10', color: '#1d4ed8' },
					{ a: 1, b: 1, c: 7, label: 'x+y=7', color: '#7c3aed' }
				],
				optPoint: { x: 3, y: 4, label: 'الأمثل B(3; 4)' },
				title: 'منطقة الحلول الممكنة ومستقيمات القيود الخطية'
			}),
			steps: [
				{
					promptAr:
						'تحدّ القيود مضلعاً رباعياً رؤوسه $O(0; 0)$ و $A(5; 0)$ و $C(0; 7)$ ونقطة تقاطع $B$ للمستقيمين $2x + y = 10$ و $x + y = 7$. ما هي الفاصلة $x_B$ لنقطة التقاطع $B$؟',
					hintAr: 'اطرح المعادلة الثانية $x + y = 7$ من الأولى $2x + y = 10$.',
					expectedInput: '3',
					revealAr:
						'بطرح المعادلتين نجد $(2x + y) - (x + y) = 10 - 7 \\implies x_B = 3$، وبالتعويض في الثانية $y_B = 7 - 3 = 4$، إذن $B(3; 4)$.'
				},
				{
					promptAr:
						'احسب قيمة دالة الربح $Z(x, y) = 3x + 2y$ عند الرأس $A(5; 0)$ وعند الرأس $C(0; 7)$. ما هي قيمة $Z(A)$؟',
					hintAr: 'عوض $x = 5$ و $y = 0$ في $3x + 2y$.',
					expectedInput: '15',
					revealAr: 'لدينا $Z(A) = 3(5) + 2(0) = 15$، بينما $Z(C) = 3(0) + 2(7) = 14$.'
				},
				{
					promptAr: 'احسب قيمة دالة الربح $Z(B)$ عند نقطة التقاطع $B(3; 4)$.',
					hintAr: 'عوض $x = 3$ و $y = 4$ في $3x + 2y$.',
					expectedInput: '17',
					revealAr:
						'لدينا $Z(B) = 3(3) + 2(4) = 9 + 8 = 17$ ألف دينار، وهي القيمة الأكبر بين جميع الرؤوس ($17 > 15 > 14 > 0$)!'
				},
				{
					promptAr:
						'في تطبيق موازٍ لتوازن السوق لسلعة، دالة العرض هي $S(p) = 4p - 40$ ودالة الطلب هي $D(p) = 200 - 2p$. احسب سعر التوازن $p^*$ الذي يحقق $S(p^*) = D(p^*)$.',
					hintAr: 'حل المعادلة الخطية $4p - 40 = 200 - 2p$.',
					expectedInput: '40',
					revealAr:
						'نحل $4p + 2p = 200 + 40 \\implies 6p = 240 \\implies p^* = 40$، وتكون كمية التوازن $q^* = 4(40) - 40 = 120$ وحدة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**البرمجة الخطية بمتغيرين ($x, y$)**:\n1. نختار المتغيرين ($x \\ge 0, y \\ge 0$) ونكتب قيود الموارد على شكل متراجحات خطية $a_i x + b_i y \\le c_i$.\n2. نرسم المستقيمات الحدية $a_i x + b_i y = c_i$ في معلم متعامد، ونحدّد **منطقة الحلول الممكنة** (مضلع محدّب) باختبار نقطة مثل $(0; 0)$.\n3. **المبرهنة الأساسية**: تبلغ الدالة الخطية للهدف $Z = \\alpha x + \\beta y$ قيمتها العظمى (أو الصغرى) عند **أحد رؤوس مضلع الحلول الممكنة**؛ لذا يكفي حساب إحداثيات جميع الرؤوس وتقييم $Z$ عندها.',
				'**توازن السوق (العرض والطلب)**:\n- **دالة العرض $S(p)$**: متزايدة بالنسبة للسعر $p$ (كلما ارتفع السعر زاد المنتجون العرض).\n- **دالة الطلب $D(p)$**: متناقصة بالنسبة للسعر $p$ (كلما ارتفع السعر قلّ الطلب).\n- **نقطة التوازن $(p^*; q^*)$**: هي نقطة تقاطع منحنيي العرض والطلب، حيث $S(p^*) = D(p^*) = q^*$؛ إذا كان $p > p^*$ يحدث فائض في العرض، وإذا كان $p < p^*$ يحدث فائض في الطلب.'
			],
			visualSvg: svgFunctionCurvePlot({
				xMin: 10,
				xMax: 70,
				yMin: 0,
				yMax: 220,
				fn: (p) => 4 * p - 40,
				curveLabel: 'العرض S(p) والطلب D(p)',
				asymptotes: [{ kind: 'oblique', a: -2, b: 200, label: 'الطلب D(p)', color: '#dc2626' }],
				points: [{ x: 40, y: 120, label: 'التوازن (40; 120)', color: '#15803d' }]
			}),
			visualCaptionAr: 'تقاطع منحنى العرض المتزايد $S(p) = 4p - 40$ ومنحنى الطلب المتناقص $D(p) = 200 - 2p$',
			examples: [
				{
					problemAr:
						'ورشة تخيط صنفين $x$ و $y$ وفق القيود: $x \\ge 0$، $y \\ge 0$، $x + 2y \\le 12$، و $3x + 2y \\le 24$. أوجد أقصى ربح $Z = 5x + 4y$.',
					solutionAr:
						'- رؤوس المضلع الممكن هي $O(0; 0)$، $A(8; 0)$ (من $3x = 24$)، $C(0; 6)$ (من $2y = 12$)، وتقاطع $B$ بحل الجملة $\\begin{cases} x + 2y = 12 \\\\ 3x + 2y = 24 \\end{cases} \\implies 2x = 12 \\implies x = 6, y = 3$.\n- نحسب $Z$ عند الرؤوس:\n  $Z(O) = 0$، $Z(A) = 40$، $Z(C) = 24$، $Z(B) = 5(6) + 4(3) = 42$.\n- إذن أقصى ربح هو $42$ عند إنتاج $x = 6$ و $y = 3$.'
				},
				{
					problemAr:
						'سوق لمنتج غذائي يخضع لدالة عرض $S(p) = 5p - 15$ ودالة طلب $D(p) = 135 - 10p$. عيّن سعر التوازن $p^*$ وكمية التوازن $q^*$، وماذا يحدث إذا فُرض سعر $p = 12$؟',
					solutionAr:
						'- التوازن: $5p - 15 = 135 - 10p \\implies 15p = 150 \\implies p^* = 10$، ومنه $q^* = 5(10) - 15 = 35$ وحدة.\n- عند $p = 12 > p^*$: العرض $S(12) = 45$ والطلب $D(12) = 15$، فيحدث **فائض في العرض** قدره $45 - 15 = 30$ وحدة.'
				}
			],
			watchOutAr:
				'احذر في البرمجة الخطية من أخذ تقاطع مستقيمين يقع **خارج** منطقة الحلول الممكنة (أي لا يحقق قيداً ثالثاً)! تحقق دائماً بالتعويض أن الرأس المرشح $(x, y)$ يحقق **جميع** المتراجحات في آنٍ واحد قبل مقارنته في دالة الهدف $Z$.'
		},
		practice: [
			{
				questionAr:
					'منطقة الحلول الممكنة لمسألة برمجة خطية رؤوسها $O(0; 0)$، $A(6; 0)$، $B(4; 3)$، و $C(0; 5)$. ما هي القيمة العظمى لدالة الربح $Z = 4x + 5y$؟',
				options: ['$31$', '$24$', '$25$', '$35$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! عند $B(4; 3)$ نجد $Z = 4(4) + 5(3) = 16 + 15 = 31$ وهو أكبر من $Z(A) = 24$ و $Z(C) = 25$.',
					'$24$ هو الربح عند الرأس $A(6; 0)$ وليس الأكبر.',
					'$25$ هو الربح عند الرأس $C(0; 5)$.',
					'تحقق من الحساب عند $B(4; 3)$: $16 + 15 = 31$ وليس $35$.'
				],
				explanationAr:
					'نحسب دالة الهدف عند كل رأس: $Z(0; 0) = 0$، $Z(6; 0) = 24$، $Z(0; 5) = 25$، $Z(4; 3) = 4(4) + 5(3) = 31$، فالقيمة العظمى هي $31$.'
			},
			{
				questionAr:
					'إذا كانت دالة العرض لسلعة هي $S(p) = 3p - 30$ ودالة الطلب هي $D(p) = 170 - 2p$، فما هي كمية التوازن $q^*$ في السوق؟',
				options: ['$90$', '$40$', '$110$', '$140$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! أولاً سعر التوازن $3p - 30 = 170 - 2p \\implies 5p = 200 \\implies p^* = 40$، ثم كمية التوازن $q^* = 3(40) - 30 = 90$.',
					'العدد $40$ هو **سعر** التوازن $p^*$، بينما السؤال يطلب **كمية** التوازن $q^*$!',
					'راجع تعويض $p^* = 40$: $3(40) - 30 = 120 - 30 = 90$.',
					'تحقق من المعادلة: $170 - 2(40) = 170 - 80 = 90$.'
				],
				explanationAr:
					'من $S(p^*) = D(p^*)$ نجد $5p^* = 200 \\implies p^* = 40$. نعوض في $S(40) = 3(40) - 30 = 90$ وحدة.'
			},
			{
				questionAr:
					'كيف نتحقق بسهولة أن النقطة $M(2; 3)$ تنتمي إلى نصف المستوي المحدّد بالمتراجحة $3x + 2y \\le 10$؟',
				options: [
					'نعوّض فنجد $3(2) + 2(3) = 12 > 10$، إذن $M$ لا تنتمي لمنطقة الحلول',
					'نعوّض فنجد $3(2) + 2(3) = 12 \\ge 10$، إذن $M$ تنتمي لمنطقة الحلول',
					'بما أن $2 > 0$ و $3 > 0$ فهي تنتمي تلقائياً للمنطقة',
					'نقارن $2 + 3 = 5 < 10$ فتكون مقبولة'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! التعويض يعطي $12$ وهو أكبر من الحد الأقصى $10$، فالنقطة $M(2; 3)$ تخالف القيد ولا تنتمي للمنطقة الممكنة.',
					'انتبه لاتجاه المتراجحة $\\le 10$ (الموارد المتاحة محدودة بـ $10$ ساعات مثلاً)، والنتيجة $12$ تتجاوز $10$!',
					'الموجبية $x \\ge 0, y \\ge 0$ وحدها لا تكفي لتحقيق قيود الموارد.',
					'يجب ضرب الإحداثيات في معاملاتها ($3$ و $2$) قبل المقارنة مع $10$.'
				],
				explanationAr:
					'بتعويض $(x, y) = (2, 3)$ في الطرف الأيسر نجد $3(2) + 2(3) = 6 + 6 = 12 > 10$، مما يخالف الشرط $\\le 10$، فالنقطة لا تنتمي لمنطقة الحلول.'
			}
		]
	}
];
