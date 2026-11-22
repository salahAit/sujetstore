import type { InteractiveLessonData } from '../../types';
import { svgCobwebSequencePlot, svgFunctionCurvePlot, svgProbabilityTree } from '../../svg-secondary';

function escXml(str: string): string {
	return str
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

function svgScatterRegressionPlot(opts: {
	points: Array<{ x: number; y: number }>;
	meanPoint: { x: number; y: number };
	slope: number;
	intercept: number;
	xMax: number;
	yMax: number;
	lineLabel?: string;
}): string {
	const w = 390;
	const h = 250;
	const padL = 38;
	const padR = 20;
	const padT = 22;
	const padB = 28;
	const plotW = w - padL - padR;
	const plotH = h - padT - padB;
	const toPxX = (x: number) => padL + (x / opts.xMax) * plotW;
	const toPxY = (y: number) => padT + ((opts.yMax - y) / opts.yMax) * plotH;

	const parts: string[] = [
		`<defs><clipPath id="scat-clip"><rect x="${padL}" y="${padT}" width="${plotW}" height="${plotH}"/></clipPath></defs>`,
		`<rect x="${padL}" y="${padT}" width="${plotW}" height="${plotH}" fill="#f8fafc" stroke="#cbd5e1"/>`
	];

	const xStep = opts.xMax > 10 ? 2 : 1;
	const yStep = Math.max(5, Math.ceil(opts.yMax / 6 / 5) * 5);
	for (let gx = 0; gx <= opts.xMax; gx += xStep) {
		const px = toPxX(gx);
		parts.push(`<line x1="${px.toFixed(1)}" y1="${padT}" x2="${px.toFixed(1)}" y2="${padT + plotH}" stroke="#e2e8f0"/>`);
		parts.push(`<text x="${px.toFixed(1)}" y="${padT + plotH + 14}" text-anchor="middle" font-size="9.5" fill="#475569">${gx}</text>`);
	}
	for (let gy = 0; gy <= opts.yMax; gy += yStep) {
		const py = toPxY(gy);
		parts.push(`<line x1="${padL}" y1="${py.toFixed(1)}" x2="${padL + plotW}" y2="${py.toFixed(1)}" stroke="#e2e8f0"/>`);
		parts.push(`<text x="${padL - 5}" y="${(py + 3).toFixed(1)}" text-anchor="end" font-size="9.5" fill="#475569">${gy}</text>`);
	}
	parts.push(`<line x1="${padL}" y1="${toPxY(0)}" x2="${padL + plotW}" y2="${toPxY(0)}" stroke="#0f172a" stroke-width="1.5"/>`);
	parts.push(`<line x1="${toPxX(0)}" y1="${padT}" x2="${toPxX(0)}" y2="${padT + plotH}" stroke="#0f172a" stroke-width="1.5"/>`);

	// Regression line
	const y0 = opts.intercept;
	const yEnd = opts.slope * opts.xMax + opts.intercept;
	parts.push(`<line x1="${toPxX(0).toFixed(1)}" y1="${toPxY(y0).toFixed(1)}" x2="${toPxX(opts.xMax).toFixed(1)}" y2="${toPxY(yEnd).toFixed(1)}" stroke="#059669" stroke-width="2" clip-path="url(#scat-clip)"/>`);

	// Scatter points
	for (const pt of opts.points) {
		parts.push(`<circle cx="${toPxX(pt.x).toFixed(1)}" cy="${toPxY(pt.y).toFixed(1)}" r="4" fill="#1d4ed8" stroke="#ffffff" stroke-width="1"/>`);
	}

	// Mean point G
	const gxPx = toPxX(opts.meanPoint.x);
	const gyPx = toPxY(opts.meanPoint.y);
	parts.push(`<circle cx="${gxPx.toFixed(1)}" cy="${gyPx.toFixed(1)}" r="5.5" fill="#dc2626" stroke="#ffffff" stroke-width="1.2"/>`);
	parts.push(`<text x="${(gxPx + 7).toFixed(1)}" y="${(gyPx - 6).toFixed(1)}" font-size="10.5" font-weight="bold" fill="#dc2626">G(${opts.meanPoint.x}; ${opts.meanPoint.y})</text>`);

	if (opts.lineLabel) {
		parts.push(`<rect x="${padL + 8}" y="${padT + 8}" width="118" height="18" rx="4" fill="rgba(255,255,255,0.92)" stroke="#10b981"/>`);
		parts.push(`<text x="${padL + 67}" y="${padT + 21}" text-anchor="middle" font-size="10" font-weight="bold" fill="#047857">${escXml(opts.lineLabel)}</text>`);
	}

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">${parts.join('')}</svg>`;
}

function svgBinomialChart(probs: Array<{ k: number; p: number }>): string {
	const w = 360;
	const h = 175;
	const ox = 42;
	const oy = 138;
	const plotW = 290;
	const plotH = 105;
	const slot = plotW / Math.max(1, probs.length);
	const barW = Math.min(36, slot * 0.58);
	const maxP = Math.max(0.55, ...probs.map((x) => x.p * 1.15));
	const parts: string[] = [
		`<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="8" fill="#ffffff" stroke="#cbd5e1"/>`,
		`<line x1="${ox}" y1="${oy - plotH}" x2="${ox}" y2="${oy}" stroke="#0f172a" stroke-width="1.5"/>`,
		`<line x1="${ox}" y1="${oy}" x2="${ox + plotW}" y2="${oy}" stroke="#0f172a" stroke-width="1.5"/>`
	];
	probs.forEach((item, idx) => {
		const bh = (item.p / maxP) * plotH;
		const bx = ox + idx * slot + (slot - barW) / 2;
		const by = oy - bh;
		parts.push(`<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${barW.toFixed(1)}" height="${bh.toFixed(1)}" fill="#2563eb" rx="2"/>`);
		parts.push(`<text x="${(bx + barW / 2).toFixed(1)}" y="${(by - 5).toFixed(1)}" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e3a8a">${item.p}</text>`);
		parts.push(`<text x="${(bx + barW / 2).toFixed(1)}" y="${oy + 16}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">k=${item.k}</text>`);
	});
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">${parts.join('')}</svg>`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3AS GE (BAC) — Trimester 3 Interactive Lessons (5 Lessons, yearSubjectId: 749)
// 100% Halal Economic & Managerial Contexts (Zero usurious interest)
// ═══════════════════════════════════════════════════════════════════════════════

export const LESSONS_3AS_GE_T3: InteractiveLessonData[] = [
	// ---------------------------------------------------------------------------
	// 1. Bivariate Statistics: Scatter Plot, Mean Point G, Variance & Covariance
	// ---------------------------------------------------------------------------
	{
		id: 'lesson_3as_ge_t3_bivariate_stats_mean_point',
		slug: '3as-ge-t3-bivariate-stats-mean-point',
		grade: '3as_ge',
		yearSubjectId: 749,
		trimesterId: 't3',
		sequenceId: 'seq5',
		sequenceTitleAr: 'المقطع الخامس: الإحصاء ثنائي المتغير والتنبؤ الاقتصادي',
		order: 1,
		titleAr: 'الإحصاء ثنائي المتغير $(x_i, y_i)$: سحابة النقط، النقطة المتوسطة $G(\\bar{x}, \\bar{y})$ والتغاير',
		objectives: [
			'تمثيل سلسلة إحصائية لمتغيرين عدديين $(x_i, y_i)$ بسحابة نقط $M_i(x_i, y_i)$ في معلم متعامد',
			'حساب إحداثيي النقطة المتوسطة $G(\\bar{x}, \\bar{y})$ وتعيين موضعها على سحابة النقط',
			'حساب التباين $V(X)$ والتغاير $\\text{Cov}(X, Y)$ وتقدير مدى ملاءمة التعديل الخطي'
		],
		keywordsAr: [
			'الإحصاء ثنائي المتغير',
			'سحابة النقط',
			'النقطة المتوسطة',
			'التباين',
			'التغاير Cov(X,Y)'
		],
		discover: {
			scenarioAr:
				'سجلت مؤسسة وطنية لإنتاج الألواح الشمسية رقم أعمالها السنوي $y_i$ (بملايين الدنانير) خلال $5$ سنوات مرتبة بالرتبة $x_i \\in \\{1; 2; 3; 4; 5\\}$، فكانت القيم $y_i \\in \\{10; 14; 16; 22; 28\\}$ على الترتيب. نريد تمثيل سحابة النقط وتعيين النقطة المتوسطة $G(\\bar{x}, \\bar{y})$ وحساب التغاير $\\text{Cov}(X, Y)$.',
			svg: svgScatterRegressionPlot({
				points: [
					{ x: 1, y: 10 },
					{ x: 2, y: 14 },
					{ x: 3, y: 16 },
					{ x: 4, y: 22 },
					{ x: 5, y: 28 }
				],
				meanPoint: { x: 3, y: 18 },
				slope: 4.4,
				intercept: 4.8,
				xMax: 7,
				yMax: 34,
				lineLabel: 'y = 4.4x + 4.8'
			}),
			steps: [
				{
					promptAr:
						'احسب الإحداثي الأول $\\bar{x} = \\frac{1 + 2 + 3 + 4 + 5}{5}$ والإحداثي الثاني $\\bar{y} = \\frac{10 + 14 + 16 + 22 + 28}{5}$. ما هي قيمة $\\bar{y}$؟',
					hintAr: 'اجمع $10 + 14 + 16 + 22 + 28$ واقسم على $5$.',
					expectedInput: '18',
					revealAr:
						'لدينا $\\bar{x} = \\frac{15}{5} = 3$ و $\\bar{y} = \\frac{90}{5} = 18$، إذن النقطة المتوسطة هي $G(3; 18)$.'
				},
				{
					promptAr:
						'احسب التباين $V(X) = \\frac{1}{5}\\sum x_i^2 - \\bar{x}^2$ للقيم $\\{1; 2; 3; 4; 5\\}$.',
					hintAr: 'احسب $\\frac{1 + 4 + 9 + 16 + 25}{5} - 3^2 = \\frac{55}{5} - 9$.',
					expectedInput: '2',
					revealAr: 'لدينا $V(X) = 11 - 9 = 2$.'
				},
				{
					promptAr:
						'احسب مجموع الجداءات $\\sum_{i=1}^5 x_i y_i = 1(10) + 2(14) + 3(16) + 4(22) + 5(28)$.',
					hintAr: 'احسب $10 + 28 + 48 + 88 + 140$.',
					expectedInput: '314',
					revealAr: 'مجموع الجداءات هو $\\sum x_i y_i = 314$.'
				},
				{
					promptAr:
						'احسب التغاير $\\text{Cov}(X, Y) = \\frac{1}{5}\\sum x_i y_i - \\bar{x}\\bar{y} = \\frac{314}{5} - 3 \\times 18$.',
					hintAr: 'احسب $62.8 - 54$.',
					expectedInput: '8.8',
					revealAr:
						'التغاير هو $\\text{Cov}(X, Y) = 62.8 - 54 = 8.8 > 0$، وبما أن النقط متقاربة على استقامة واحدة تقريباً فالتعديل الخطي وجيه جداً.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**سحابة النقط والنقطة المتوسطة**: لسلسلة إحصائية ثنائية المتغير $(x_i, y_i)_{1 \\le i \\le N}$:\n- مجموعة النقط $M_i(x_i, y_i)$ في معلم متعامد تسمى **سحابة النقط**.\n- **النقطة المتوسطة** هي النقطة $G(\\bar{x}; \\bar{y})$ حيث $\\bar{x} = \\frac{1}{N}\\sum_{i=1}^N x_i$ و $\\bar{y} = \\frac{1}{N}\\sum_{i=1}^N y_i$.',
				'**التباين والتغاير**:\n- تباين $X$: $V(X) = \\frac{1}{N}\\sum_{i=1}^N (x_i - \\bar{x})^2 = \\left(\\frac{1}{N}\\sum_{i=1}^N x_i^2\\right) - \\bar{x}^2$.\n- **التغاير (Covariance)** بين $X$ و $Y$:\n$$\\text{Cov}(X, Y) = \\frac{1}{N}\\sum_{i=1}^N (x_i - \\bar{x})(y_i - \\bar{y}) = \\left(\\frac{1}{N}\\sum_{i=1}^N x_i y_i\\right) - \\bar{x}\\bar{y}$$',
				'**التعديل الخطي (Ajustement linéaire)**: إذا بدت سحابة النقط ممدودة في اتجاه خطي، نقبل تقريبها بمستقيم يمر من النقطة المتوسطة $G(\\bar{x}; \\bar{y})$. وإشارة التغاير $\\text{Cov}(X, Y)$ تحدد اتجاه الميل (موجب للتزايد المشترك، سالب للتناقص).'
			],
			visualSvg: svgScatterRegressionPlot({
				points: [
					{ x: 1, y: 12 },
					{ x: 2, y: 15 },
					{ x: 3, y: 20 },
					{ x: 4, y: 23 },
					{ x: 5, y: 30 }
				],
				meanPoint: { x: 3, y: 20 },
				slope: 4.4,
				intercept: 6.8,
				xMax: 7,
				yMax: 36,
				lineLabel: 'G يمر منه المستقيم'
			}),
			visualCaptionAr: 'تمثيل سحابة النقط $M_i(x_i, y_i)$ وموقع النقطة المتوسطة $G(3; 20)$ عليها',
			examples: [
				{
					problemAr:
						'لسلسلة إحصائية مكونة من $6$ ملاحظات لدينا: $\\sum x_i = 21$، $\\sum y_i = 120$، $\\sum x_i^2 = 91$، و $\\sum x_i y_i = 476$. احسب $\\bar{x}$، $\\bar{y}$، $V(X)$، و $\\text{Cov}(X, Y)$.',
					solutionAr:
						'- $\\bar{x} = \\frac{21}{6} = 3.5$، و $\\bar{y} = \\frac{120}{6} = 20$.\n- $V(X) = \\frac{91}{6} - (3.5)^2 = 15.167 - 12.25 \\approx 2.917$.\n- $\\text{Cov}(X, Y) = \\frac{476}{6} - (3.5)(20) = 79.333 - 70 = 9.333$.'
				},
				{
					problemAr:
						'إذا علمت أن مجموع قيم $X$ لـ $4$ سنوات هو $10$ ومجموع قيم $Y$ هو $80$، وأضيف عام خامس بقيمة $(x_5, y_5) = (5, 30)$. ما هي إحداثيات النقطة المتوسطة الجديدة $G\'$؟',
					solutionAr:
						'- المجموع الجديد لـ $X$: $10 + 5 = 15 \\implies \\bar{x}\' = \\frac{15}{5} = 3$.\n- المجموع الجديد لـ $Y$: $80 + 30 = 110 \\implies \\bar{y}\' = \\frac{110}{5} = 22$. إذن $G\'(3; 22)$.'
				}
			],
			watchOutAr:
				'احذر من الخطأ في صيغة التغاير $\\text{Cov}(X, Y) = \\frac{1}{N}\\sum x_i y_i - \\bar{x}\\bar{y}$: نقسم المجموع $\\sum x_i y_i$ فقط على $N$ ثم نطرح الجداء $\\bar{x}\\bar{y}$ (ولا نقسم $\\bar{x}\\bar{y}$ على $N$!). كما أن $\\text{Cov}(X, Y)$ قد يكون سالباً إذا كانت العلاقة عكسية، بخلاف $V(X) \\ge 0$.'
		},
		practice: [
			{
				questionAr:
					'تضم سلسلة إحصائية ثنائية $6$ نقط إحداثياتها: $(1; 8)$، $(2; 11)$، $(3; 14)$، $(4; 17)$، $(5; 20)$، $(6; 26)$. ما هي إحداثيات النقطة المتوسطة $G(\\bar{x}; \\bar{y})$؟',
				options: ['$G(3.5 ; 16)$', '$G(3 ; 16)$', '$G(3.5 ; 15.5)$', '$G(4 ; 17)$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! $\\bar{x} = \\frac{21}{6} = 3.5$ و $\\bar{y} = \\frac{8 + 11 + 14 + 17 + 20 + 26}{6} = \\frac{96}{6} = 16$.',
					'تحقق من متوسط الرتب من $1$ إلى $6$: $(1+2+3+4+5+6)/6 = 21/6 = 3.5$ وليس $3$.',
					'تحقق من جمع قيم $y_i$: $8+11+14+17+20+26 = 96$ و $96/6 = 16$.',
					'هذه إحداثيات النقطة الرابعة فقط وليست النقطة المتوسطة $G$.'
				],
				explanationAr:
					'المجموع $\\sum x_i = 21 \\implies \\bar{x} = 3.5$، والمجموع $\\sum y_i = 96 \\implies \\bar{y} = 16$، إذن $G(3.5; 16)$.'
			},
			{
				questionAr:
					'إذا كان $N = 5$، $\\bar{x} = 4$، $\\bar{y} = 12$، و $\\sum_{i=1}^5 x_i y_i = 265$، فما هي قيمة التغاير $\\text{Cov}(X, Y)$؟',
				options: ['$5$', '$53$', '$217$', '$-5$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! $\\text{Cov}(X, Y) = \\frac{265}{5} - (4 \\times 12) = 53 - 48 = 5$.',
					'$53$ هو $\\frac{1}{5}\\sum x_i y_i$ قبل طرح $\\bar{x}\\bar{y} = 48$!',
					'نسيت القسمة على $N = 5$ للمجموع $265$.',
					'أخطأت في ترتيب الطرح: $53 - 48 = +5$.'
				],
				explanationAr:
					'نطبق الدستور: $\\text{Cov}(X, Y) = \\frac{265}{5} - 4 \\times 12 = 53 - 48 = 5$.'
			},
			{
				questionAr:
					'إذا كانت $N = 4$ وقيم $X$ هي $\\{1; 2; 3; 6\\}$ (حيث $\\bar{x} = 3$)، فما هي قيمة التباين $V(X)$؟',
				options: ['$3.5$', '$12.5$', '$14$', '$2.5$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! مجموع المربعات $1 + 4 + 9 + 36 = 50$، ومنه $V(X) = \\frac{50}{4} - 3^2 = 12.5 - 9 = 3.5$.',
					'$12.5$ هو معدل المربعات $\\frac{1}{4}\\sum x_i^2$ قبل طرح $\\bar{x}^2 = 9$!',
					'أخطأت في جمع مربعات القيم أو طرح $\\bar{x}^2$.',
					'تحقق من الحساب: $50/4 = 12.5$ و $12.5 - 9 = 3.5$.'
				],
				explanationAr:
					'لدينا $\\frac{1^2 + 2^2 + 3^2 + 6^2}{4} = \\frac{50}{4} = 12.5$، وبالتالي $V(X) = 12.5 - 3^2 = 3.5$.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// 2. Least Squares Linear Regression y = ax + b & Economic Forecasting
	// ---------------------------------------------------------------------------
	{
		id: 'lesson_3as_ge_t3_least_squares_regression_forecasting',
		slug: '3as-ge-t3-least-squares-regression-forecasting',
		grade: '3as_ge',
		yearSubjectId: 749,
		trimesterId: 't3',
		sequenceId: 'seq5',
		sequenceTitleAr: 'المقطع الخامس: الإحصاء ثنائي المتغير والتنبؤ الاقتصادي',
		order: 2,
		titleAr: 'مستقيم الانحدار الخطي بالمربعات الدنيا $y = ax + b$ والتنبؤ بالإنتاج والمبيعات',
		objectives: [
			'تعيين معادلة مستقيم الانحدار بالمربعات الدنيا لـ $y$ بدلالة $x$: $y = ax + b$ بحساب $a = \\frac{\\text{Cov}(X, Y)}{V(X)}$ و $b = \\bar{y} - a\\bar{x}$',
			'استعمال مستقيم الانحدار للتنبؤ بمستوى الإنتاج أو المبيعات مستقبلاً وتحديد السنة التي يُبلغ فيها هدف محدد',
			'تطبيق التعديل غير الخطي بتغيير المتغير ($z_i = \\ln(y_i)$) لاشتقاق نموذج نمو أسي $y = A e^{ax}$'
		],
		keywordsAr: [
			'مستقيم الانحدار',
			'المربعات الدنيا',
			'التنبؤ بالمبيعات',
			'معامل التوجيه',
			'التعديل الأسي'
		],
		discover: {
			scenarioAr:
				'تراقب مؤسسة لإنتاج مواد التغليف حجم مبيعاتها السنوية $y_i$ (بآلاف الأطنان) خلال $5$ سنوات برتب $x_i \\in \\{1; 2; 3; 4; 5\\}$، فكانت $y_i \\in \\{12; 15; 20; 23; 30\\}$. نريد إيجاد معادلة مستقيم الانحدار الخطي بالمربعات الدنيا $y = ax + b$ والتنبؤ بالمبيعات في السنة الثامنة ($x = 8$).',
			svg: svgScatterRegressionPlot({
				points: [
					{ x: 1, y: 12 },
					{ x: 2, y: 15 },
					{ x: 3, y: 20 },
					{ x: 4, y: 23 },
					{ x: 5, y: 30 }
				],
				meanPoint: { x: 3, y: 20 },
				slope: 4.4,
				intercept: 6.8,
				xMax: 9,
				yMax: 46,
				lineLabel: 'y = 4.4x + 6.8'
			}),
			steps: [
				{
					promptAr:
						'علماً أن $V(X) = 2$ و $\\text{Cov}(X, Y) = 8.8$، احسب معامل التوجيه $a = \\frac{\\text{Cov}(X, Y)}{V(X)}$ لمستقيم الانحدار $y = ax + b$.',
					hintAr: 'اقسم $8.8$ على $2$.',
					expectedInput: '4.4',
					revealAr: 'معامل التوجيه هو $a = \\frac{\\text{Cov}(X, Y)}{V(X)} = \\frac{8.8}{2} = 4.4$.'
				},
				{
					promptAr:
						'بما أن مستقيم الانحدار يمر حتماً من النقطة المتوسطة $G(3; 20)$، احسب الترتيب عند المبدأ $b = \\bar{y} - a\\bar{x}$.',
					hintAr: 'احسب $20 - 4.4 \\times 3 = 20 - 13.2$.',
					expectedInput: '6.8',
					revealAr:
						'لدينا $b = 20 - 4.4(3) = 20 - 13.2 = 6.8$، إذن معادلة مستقيم الانحدار هي $(D): y = 4.4x + 6.8$.'
				},
				{
					promptAr:
						'باستعمال مستقيم الانحدار $y = 4.4x + 6.8$، تنبأ بحجم المبيعات المتوقع في السنة الثامنة ($x = 8$) بآلاف الأطنان.',
					hintAr: 'عوض $x = 8$ في $4.4(8) + 6.8 = 35.2 + 6.8$.',
					expectedInput: '42',
					revealAr:
						'عند $x = 8$: $y = 4.4(8) + 6.8 = 35.2 + 6.8 = 42$ ألف طن.'
				},
				{
					promptAr:
						'ابتداءً من أي رتبة سنة $x$ يتجاوز حجم المبيعات المتوقع العتبة $50.8$ ألف طن ($4.4x + 6.8 \\ge 50.8$)؟',
					hintAr: 'حل المتراجحة $4.4x \\ge 50.8 - 6.8 = 44$.',
					expectedInput: '10',
					revealAr: 'لدينا $4.4x \\ge 44 \\implies x \\ge 10$، أي ابتداءً من السنة ذات الرتبة $x = 10$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**معادلة مستقيم الانحدار الخطي بالمربعات الدنيا ($y$ بدلالة $x$)**:\nيمر مستقيم الانحدار $(D): y = ax + b$ حتماً من النقطة المتوسطة $G(\\bar{x}; \\bar{y})$، وتُعطى ثوابته بالصيغتين:\n$$a = \\frac{\\text{Cov}(X, Y)}{V(X)} = \\frac{\\sum_{i=1}^N (x_i - \\bar{x})(y_i - \\bar{y})}{\\sum_{i=1}^N (x_i - \\bar{x})^2} \\qquad \\text{و} \\qquad b = \\bar{y} - a\\bar{x}$$',
				'**استغلال المستقيم للتنبؤ الاقتصادي**:\n- لتقدير الإنتاج أو المبيعات في سنة مستقبلية رتبتها $x_k$، نعوض $x = x_k$ في $y = ax_k + b$.\n- لتحديد السنة التي يبلغ فيها الإنتاج مستوىً مستهدفاً $Y_0$، نحل المتراجحة $ax + b \\ge Y_0$ ونأخذ أصغر عدد طبيعي يحققها.',
				'**التعديل غير الخطي بتغيير المتغير (كلاسيكي في البكالوريا)**: إذا كانت السحابة $(x_i, y_i)$ تتزايد بشكل أسي، نضع $z_i = \\ln(y_i)$، نعيّن مستقيم الانحدار لـ $z$ بدلالة $x$: $z = ax + b$، ثم نستنتج عبارة $y$ بأخذ الأسية: $y = e^{ax + b} = A e^{ax}$ حيث $A = e^b$.'
			],
			visualSvg: svgFunctionCurvePlot({
				xMin: 0,
				xMax: 7,
				yMin: 0,
				yMax: 45,
				fn: (x) => 10 * Math.exp(0.2 * x),
				curveLabel: 'تعديل أسي y=10e^(0.2x)',
				points: [
					{ x: 1, y: 10 * Math.exp(0.2), label: 'x=1', color: '#1d4ed8' },
					{ x: 5, y: 10 * Math.exp(1), label: 'x=5', color: '#15803d' }
				]
			}),
			visualCaptionAr: 'التعديل الأسي $y = e^b e^{ax}$ الناتج عن التعديل الخطي للمتغير المساعد $z_i = \\ln(y_i)$',
			examples: [
				{
					problemAr:
						'لسلسلة $(x_i, y_i)$ وُجد $\\bar{x} = 4$، $\\bar{y} = 25$، $V(X) = 2.5$، و $\\text{Cov}(X, Y) = 15$. أوجد معادلة مستقيم الانحدار $y = ax + b$، وتنبأ بـ $y$ عند $x = 7$.',
					solutionAr:
						'- $a = \\frac{15}{2.5} = 6$.\n- $b = 25 - 6(4) = 25 - 24 = 1$.\n- معادلة مستقيم الانحدار: $y = 6x + 1$.\n- التنبؤ عند $x = 7$: $y = 6(7) + 1 = 43$.'
				},
				{
					problemAr:
						'في دراسة نمو رقم أعمال تطبيق رقمي خلال $4$ سنوات، بعد وضع $z_i = \\ln(y_i)$ وُجد مستقيم الانحدار $z = 0.2x + 2.3$. اكتب $y$ بدلالة $x$ على الشكل $y = A e^{0.2x}$ (مع تدوير $A$ إلى الوحدة).',
					solutionAr:
						'لدينا $\\ln(y) = 0.2x + 2.3 \\implies y = e^{0.2x + 2.3} = e^{2.3} e^{0.2x}$.\nبما أن $e^{2.3} \\approx 9.97 \\approx 10$، فإن النموذج الأسي هو $y \\approx 10 e^{0.2x}$.'
				}
			],
			watchOutAr:
				'احذر عند حساب معامل التوجيه $a$: المقام هو دائماً تباين المتغير التفسيري $V(X)$ (وليس $V(Y)$) عندما تكون المعادلة المطلوبة هي $y = ax + b$ ($y$ بدلالة $x$)! كما تأكد دائماً أن المستقيم الذي تحصل عليه يمرّ عند التعويض بـ $\\bar{x}$ بالقيمة $\\bar{y}$ بالضبط.'
		},
		practice: [
			{
				questionAr:
					'لسلسلة إحصائية ثنائية لدينا: $G(4 ; 18)$، $V(X) = 2.5$، و $\\text{Cov}(X, Y) = 7.5$. ما هي معادلة مستقيم الانحدار الخطي $y = ax + b$؟',
				options: ['$y = 3x + 6$', '$y = 3x + 18$', '$y = 0.33x + 6$', '$y = 3x - 6$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! $a = \\frac{7.5}{2.5} = 3$، و $b = \\bar{y} - a\\bar{x} = 18 - 3(4) = 6$، إذن $y = 3x + 6$.',
					'وضعت $\\bar{y} = 18$ كترتيب عند المبدأ $b$ دون طرح $a\\bar{x} = 12$!',
					'قلبت الكسر فقسمت $V(X)$ على $\\text{Cov}(X, Y)$!',
					'أخطأت في الطرح: $18 - 12 = +6$ وليس $-6$.'
				],
				explanationAr:
					'معامل التوجيه $a = \\frac{\\text{Cov}(X, Y)}{V(X)} = \\frac{7.5}{2.5} = 3$، والترتيب عند المبدأ $b = 18 - 3(4) = 6$.'
			},
			{
				questionAr:
					'بناءً على مستقيم الانحدار $y = 2.5x + 12$ حيث $x = 1$ توافق سنة $2020$، ما هو الإنتاج المتوقع سنة $2027$؟',
				options: ['$32$', '$29.5$', '$34.5$', '$27$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! سنة $2027$ توافق الرتبة $x = 1 + (2027 - 2020) = 8$، ومنه $y = 2.5(8) + 12 = 20 + 12 = 32$.',
					'انتبه لترقيم الرتبة! إذا كانت $2020$ رتبتها $1$ (وليس $0$)، فإن $2027$ رتبتها $8$ وليست $7$!',
					'استعملت الرتبة $x = 9$ بدل $x = 8$.',
					'تحقق من الحساب: $2.5 \\times 8 = 20$ و $20 + 12 = 32$.'
				],
				explanationAr:
					'سنة $2020$ لها الرتبة $1$، إذن سنة $2027$ لها الرتبة $x = 8$. بالتعويض نجد $y = 2.5(8) + 12 = 32$.'
			},
			{
				questionAr:
					'بعد تغيير المتغير $z_i = \\ln(y_i)$، وُجد مستقيم الانحدار $z = 0.4x + \\ln(5)$. ما هي العبارة الدقيقة لـ $y$ بدلالة $x$؟',
				options: ['$y = 5e^{0.4x}$', '$y = e^{0.4x} + 5$', '$y = 5x + 0.4$', '$y = 0.4e^{5x}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! لدينا $\\ln(y) = 0.4x + \\ln(5) \\implies y = e^{0.4x + \\ln(5)} = e^{\\ln(5)} \\cdot e^{0.4x} = 5e^{0.4x}$.',
					'الأُسية تحوّل الجمع إلى جداء ($e^{a+b} = e^a e^b$) وليس جمعاً!',
					'نسيت تطبيق الدالة الأسية على الطرفين للتخلص من $\\ln(y)$.',
					'بدّلت موضعي المعامل $0.4$ والثابت $5$.'
				],
				explanationAr:
					'بإدخال الدالة الأسية على طرفي $\\ln(y) = 0.4x + \\ln(5)$ نجد $y = e^{0.4x} \\cdot e^{\\ln(5)} = 5e^{0.4x}$.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// 3. Conditional Probability, Weighted Trees, Total Probability & Bayes
	// ---------------------------------------------------------------------------
	{
		id: 'lesson_3as_ge_t3_conditional_probability_total_prob',
		slug: '3as-ge-t3-conditional-probability-total-prob',
		grade: '3as_ge',
		yearSubjectId: 749,
		trimesterId: 't3',
		sequenceId: 'seq6',
		sequenceTitleAr: 'المقطع السادس: الاحتمالات الشرطية، دستور الاحتمالات الكلية وقانون برنولي',
		order: 3,
		titleAr: 'الاحتمالات الشرطية $P_A(B)$، دستور الاحتمالات الكلية ودستور بيز',
		objectives: [
			'حساب الاحتمال الشرطي $P_A(B) = \\frac{P(A \\cap B)}{P(A)}$ وبناء شجرة احتمالات موزونة ذات فرعين أو ثلاثة فروع',
			'تطبيق دستور الاحتمالات الكلية $P(B) = \\sum_{i} P(A_i) P_{A_i}(B)$ لحساب احتمال حادثة مركبة',
			'استعمال دستور بيز $P_B(A_i) = \\frac{P(A_i \\cap B)}{P(B)}$ واختبار استقلال حادثتين في مسائل التسيير'
		],
		keywordsAr: [
			'الاحتمال الشرطي',
			'شجرة الاحتمالات',
			'الاحتمالات الكلية',
			'دستور بيز',
			'الاستقلال'
		],
		discover: {
			scenarioAr:
				'تشتري مؤسسة تجارية بضائعها من مموّنَين: المموّن $A$ يوفر $60\\%$ من الطلبات بنسبة عيوب $10\\%$، والمموّن $B$ يوفر $40\\%$ من الطلبات بنسبة عيوب $5\\%$. نسحب سلعة عشوائياً ونسمي $D$ حادثة «السلعة معيبة».',
			svg: svgProbabilityTree({
				rootLabel: 'Ω',
				firstLevel: [
					{
						label: 'A',
						probLabel: '0.60',
						children: [
							{ label: 'D', probLabel: '0.10' },
							{ label: "D'", probLabel: '0.90' }
						]
					},
					{
						label: 'B',
						probLabel: '0.40',
						children: [
							{ label: 'D', probLabel: '0.05' },
							{ label: "D'", probLabel: '0.95' }
						]
					}
				]
			}),
			steps: [
				{
					promptAr: 'احسب احتمال التقاطع $P(A \\cap D) = P(A) \\times P_A(D)$.',
					hintAr: 'اضرب $0.60 \\times 0.10$.',
					expectedInput: '0.06',
					revealAr: 'لدينا $P(A \\cap D) = 0.60 \\times 0.10 = 0.06$.'
				},
				{
					promptAr: 'احسب احتمال التقاطع الثاني $P(B \\cap D) = P(B) \\times P_B(D)$.',
					hintAr: 'اضرب $0.40 \\times 0.05$.',
					expectedInput: '0.02',
					revealAr: 'لدينا $P(B \\cap D) = 0.40 \\times 0.05 = 0.02$.'
				},
				{
					promptAr: 'بتطبيق دستور الاحتمالات الكلية، احسب الاحتمال الكلي $P(D)$.',
					hintAr: 'اجمع $P(A \\cap D) + P(B \\cap D) = 0.06 + 0.02$.',
					expectedInput: '0.08',
					revealAr: 'لدينا $P(D) = 0.06 + 0.02 = 0.08$ ($8\\%$).'
				},
				{
					promptAr:
						'علماً أن السلعة المسحوبة معيبة ($D$)، احسب الاحتمال الشرطي العكسي $P_D(A)$ أن يكون مصدرها المموّن $A$.',
					hintAr: 'طبق دستور بيز: $P_D(A) = \\frac{P(A \\cap D)}{P(D)} = \\frac{0.06}{0.08}$.',
					expectedInput: '0.75',
					revealAr:
						'لدينا $P_D(A) = \\frac{0.06}{0.08} = \\frac{3}{4} = 0.75$ ($75\\%$ من السلع المعيبة مصدرها المموّن $A$).'
				}
			]
		},
		summary: {
			rulesAr: [
				'**الاحتمال الشرطي**: إذا كانت $P(A) > 0$ فإن:\n$$P_A(B) = \\frac{P(A \\cap B)}{P(A)} \\qquad \\text{ومنه} \\qquad P(A \\cap B) = P(A) \\times P_A(B)$$',
				'**دستور الاحتمالات الكلية**: إذا شكّلت الحوادث $(A_1, A_2, \\dots, A_k)$ تجزئة لكون الإمكانيات $\\Omega$ (متنافية مثنى مثنى واتحادها $\\Omega$)، فإنه لكل حادثة $D$:\n$$P(D) = P(A_1)P_{A_1}(D) + P(A_2)P_{A_2}(D) + \\dots + P(A_k)P_{A_k}(D)$$',
				'**دستور بيز (الاحتمال الشرطي العكسي)**:\n$$P_D(A_i) = \\frac{P(A_i \\cap D)}{P(D)} = \\frac{P(A_i) \\times P_{A_i}(D)}{P(D)}$$',
				'**استقلال حادثتين**: تكون $A$ و $B$ مستقلتين إذا وفقط إذا كان $P(A \\cap B) = P(A) \\times P(B)$ (أي $P_A(B) = P(B)$).'
			],
			visualSvg: svgProbabilityTree({
				rootLabel: 'Ω',
				firstLevel: [
					{
						label: 'A1',
						probLabel: '0.5',
						children: [
							{ label: 'B', probLabel: '0.2' },
							{ label: "B'", probLabel: '0.8' }
						]
					},
					{
						label: 'A2',
						probLabel: '0.3',
						children: [
							{ label: 'B', probLabel: '0.4' },
							{ label: "B'", probLabel: '0.6' }
						]
					},
					{
						label: 'A3',
						probLabel: '0.2',
						children: [
							{ label: 'B', probLabel: '0.1' },
							{ label: "B'", probLabel: '0.9' }
						]
					}
				]
			}),
			visualCaptionAr: 'شجرة احتمالات موزونة بثلاثة فروع أولية ($A_1, A_2, A_3$) لتطبيق دستور الاحتمالات الكلية',
			examples: [
				{
					problemAr:
						'تنتج شركة من ثلاث ورشات $A_1, A_2, A_3$ بحصص $50\\%, 30\\%, 20\\%$ على الترتيب، ونسب عدم المطابقة ($B$) هي $2\\%, 4\\%, 1\\%$. احسب $P(B)$ ثم $P_B(A_2)$.',
					solutionAr:
						'- دستور الاحتمالات الكلية: $P(B) = 0.5(0.02) + 0.3(0.04) + 0.2(0.01) = 0.010 + 0.012 + 0.002 = 0.024$.\n- دستور بيز: $P_B(A_2) = \\frac{0.012}{0.024} = 0.5$.'
				},
				{
					problemAr:
						'إذا كان $P(A) = 0.4$ و $P(B) = 0.5$ و $P(A \\cup B) = 0.7$. احسب $P(A \\cap B)$، ثم $P_A(B)$، وهل الحادثتان مستقلتان؟',
					solutionAr:
						'- $P(A \\cap B) = P(A) + P(B) - P(A \\cup B) = 0.4 + 0.5 - 0.7 = 0.2$.\n- $P_A(B) = \\frac{0.2}{0.4} = 0.5 = P(B)$ (أو $P(A)\\times P(B) = 0.2 = P(A \\cap B)$)، إذن $A$ و $B$ **مستقلتان**.'
				}
			],
			watchOutAr:
				'احذر عند كتابة الاحتمال الشرطي في البكالوريا من عكس الدليلين: $P_A(B) = \\frac{P(A \\cap B)}{P(A)}$ (المقسوم عليه هو الحادثة المعلومة $A$ أسفل الحرف $P$) يختلف كلياً عن $P_B(A) = \\frac{P(A \\cap B)}{P(B)}$!'
		},
		practice: [
			{
				questionAr:
					'إذا كان $P(A) = 0.7$ و $P_A(B) = 0.3$ و $P_{\\overline{A}}(B) = 0.5$، فما هي قيمة الاحتمال الكلي $P(B)$؟',
				options: ['$0.36$', '$0.80$', '$0.21$', '$0.15$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! $P(\\overline{A}) = 0.3$، ومنه $P(B) = 0.7(0.3) + 0.3(0.5) = 0.21 + 0.15 = 0.36$.',
					'لا نجمع الاحتمالين الشرطيين مباشرة دون أوزانهما $P(A)$ و $P(\\overline{A})$!',
					'هذا $P(A \\cap B) = 0.21$ فقط.',
					'هذا $P(\\overline{A} \\cap B) = 0.15$ فقط.'
				],
				explanationAr:
					'بدستور الاحتمالات الكلية: $P(B) = 0.7 \\times 0.3 + (1 - 0.7) \\times 0.5 = 0.21 + 0.15 = 0.36$.'
			},
			{
				questionAr:
					'من بيانات السؤال السابق ($P(A \\cap B) = 0.21$ و $P(B) = 0.36$)، ما هي قيمة الاحتمال الشرطي العكسي $P_B(A)$؟',
				options: ['$\\frac{7}{12}$', '$\\frac{3}{10}$', '$\\frac{5}{12}$', '$\\frac{21}{50}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! $P_B(A) = \\frac{P(A \\cap B)}{P(B)} = \\frac{0.21}{0.36} = \\frac{21}{36} = \\frac{7}{12}$.',
					'$\\frac{3}{10} = 0.3$ هو $P_A(B)$ وليس $P_B(A)$.',
					'$\\frac{5}{12} = \\frac{0.15}{0.36}$ هو $P_B(\\overline{A})$.',
					'تحقق من الاختزال: $\\frac{21}{36} = \\frac{7}{12}$.'
				],
				explanationAr:
					'حسب دستور بيز: $P_B(A) = \\frac{P(A \\cap B)}{P(B)} = \\frac{0.21}{0.36} = \\frac{7}{12}$.'
			},
			{
				questionAr:
					'لتكن حادثتان $A$ و $B$ حيث $P(A) = 0.5$ و $P(B) = 0.6$ و $P(A \\cap B) = 0.2$. هل الحادثتان مستقلتان؟',
				options: [
					'غير مستقلتين لأن $P(A) \\times P(B) = 0.3 \\ne 0.2$',
					'مستقلتان لأن $P(A \\cap B) \\ne 0$',
					'متنافيتان لأن $P(A) \\times P(B) \\ne P(A \\cap B)$',
					'مستقلتان لأن $P_A(B) = 0.4$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! شرط الاستقلال هو المساواة $P(A \\cap B) = P(A) \\times P(B)$، وهنا $0.2 \\ne 0.5 \\times 0.6 = 0.3$.',
					'عدم التنافي لا يعني الاستقلال!',
					'التنافي يعني $P(A \\cap B) = 0$ بينما هنا التقاطع يساوي $0.2$.',
					'لدينا $P_A(B) = 0.4 \\ne P(B) = 0.6$ وهذا يثبت عدم الاستقلال!'
				],
				explanationAr:
					'نحسب الجداء $P(A) \\times P(B) = 0.5 \\times 0.6 = 0.3 \\ne P(A \\cap B) = 0.2$، إذن الحادثتان ليستا مستقلتين.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// 4. Bernoulli Trial, Binomial Law B(n, p) & Random Variables
	// ---------------------------------------------------------------------------
	{
		id: 'lesson_3as_ge_t3_bernoulli_binomial_random_var',
		slug: '3as-ge-t3-bernoulli-binomial-random-var',
		grade: '3as_ge',
		yearSubjectId: 749,
		trimesterId: 't3',
		sequenceId: 'seq6',
		sequenceTitleAr: 'المقطع السادس: الاحتمالات الشرطية، دستور الاحتمالات الكلية وقانون برنولي',
		order: 4,
		titleAr: 'قانون برنولي، الاختبارات المتكررة (ثنائي الحد $B(n, p)$) والمتغير العشوائي في التسيير',
		objectives: [
			'تمييز تجربة برنولي ($p$) والاختبارات المتكررة والمستقلة التي يتبع فيها المتغير العشوائي قانون ثنائي الحد $B(n, p)$',
			'حساب الاحتمالات $P(X = k) = C_n^k p^k (1 - p)^{n-k}$ والأمل $E(X) = np$ والتباين $V(X) = np(1 - p)$',
			'حساب احتمال حدث واحد على الأقل $P(X \\ge 1) = 1 - (1 - p)^n$ وإيجاد أصغر عدد تجارب $n$ يضمن عتبة احتمال معطاة باستعمال $\\ln$'
		],
		keywordsAr: [
			'قانون برنولي',
			'قانون ثنائي الحد',
			'الاختبارات المتكررة',
			'الأمل الرياضياتي np',
			'مراقبة العينات'
		],
		discover: {
			scenarioAr:
				'في مصنع للأجهزة الكهربائية، احتمال أن تكون وحدة منتجة بحاجة إلى تعديل تقني هو $p = 0.2$ (مستقل من وحدة لأخرى). نسحب عشوائياً وبإرجاع (أو من مخزون ضخم جداً) عينة من $n = 3$ وحدات، ونسمي $X$ عدد الوحدات التي تحتاج لتعديل في العينة.',
			svg: svgBinomialChart([
				{ k: 0, p: 0.512 },
				{ k: 1, p: 0.384 },
				{ k: 2, p: 0.096 },
				{ k: 3, p: 0.008 }
			]),
			steps: [
				{
					promptAr:
						'يتبع $X$ قانون ثنائي الحد $B(3; 0.2)$. احسب الأمل الرياضياتي $E(X) = n \\cdot p$.',
					hintAr: 'اضرب $n = 3$ في $p = 0.2$.',
					expectedInput: '0.6',
					revealAr: 'لدينا $E(X) = n p = 3 \\times 0.2 = 0.6$ وحدة.'
				},
				{
					promptAr:
						'احسب تباين المتغير العشوائي $V(X) = n p (1 - p)$ لقانون ثنائي الحد $B(3; 0.2)$.',
					hintAr: 'احسب $3 \\times 0.2 \\times 0.8$.',
					expectedInput: '0.48',
					revealAr: 'التباين هو $V(X) = 3 \\times 0.2 \\times 0.8 = 0.48$، والانحراف المعياري $\\sigma(X) = \\sqrt{0.48} \\approx 0.69$.'
				},
				{
					promptAr:
						'احسب احتمال الحصول على وحدة واحدة بالضبط تحتاج لتعديل $P(X = 1) = C_3^1 (0.2)^1 (0.8)^2$.',
					hintAr: 'لاحظ أن $C_3^1 = 3$ و $(0.8)^2 = 0.64$، فاحسب $3 \\times 0.2 \\times 0.64$.',
					expectedInput: '0.384',
					revealAr: 'لدينا $P(X = 1) = 3 \\times 0.2 \\times 0.64 = 0.384$.'
				},
				{
					promptAr:
						'احسب احتمال وجود وحدة واحدة **على الأقل** تحتاج لتعديل $P(X \\ge 1) = 1 - P(X = 0)$ علماً أن $0.8^3 = 0.512$.',
					hintAr: 'اطرح $0.512$ من $1$.',
					expectedInput: '0.488',
					revealAr:
						'باستعمال الحادثة العكسية: $P(X \\ge 1) = 1 - P(X = 0) = 1 - (0.8)^3 = 1 - 0.512 = 0.488$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**تجربة برنولي وقانون برنولي**: هي كل تجربة عشوائية لها مخرجان فقط: نجاح (احتماله $p$) وإخفاق (احتماله $1 - p$). المتغير العشوائي $X$ الذي يأخذ $1$ عند النجاح و $0$ عند الإخفاق يتبع قانون برنولي ذا الوسيط $p$، وأمله $E(X) = p$ وتباينه $V(X) = p(1 - p)$.',
				'**قانون ثنائي الحد $B(n, p)$**: عند تكرار تجربة برنولي ذات الوسيط $p$ عدد $n$ مرة بصورة **متطابقة ومستقلة** (أو سحب بإرجاع)، فإن عدد النجاحات $X$ يتبع قانون ثنائي الحد $B(n, p)$ بحيث من أجل كل $k \\in \\{0, 1, \\dots, n\\}$:\n$$P(X = k) = C_n^k \\cdot p^k (1 - p)^{n - k}$$\n- **الأمل الرياضياتي والتباين**: $E(X) = n p$، و $V(X) = n p (1 - p)$، و $\\sigma(X) = \\sqrt{n p (1 - p)}$.',
				'**حساب عتبة حجم العينة $n$**: لإيجاد أصغر عدد وحدات $n$ يحقق $P(X \\ge 1) \\ge 0.99$ مثلاً:\n$$1 - (1 - p)^n \\ge 0.99 \\iff (1 - p)^n \\le 0.01 \\iff n \\ln(1 - p) \\le \\ln(0.01)$$\nثم نقسم على $\\ln(1 - p) < 0$ مع **عكس اتجاه المتراجحة** لنحصل على $n \\ge \\frac{\\ln(0.01)}{\\ln(1 - p)}$.'
			],
			visualSvg: svgProbabilityTree({
				rootLabel: 'B(2,p)',
				firstLevel: [
					{
						label: 'S',
						probLabel: 'p',
						children: [
							{ label: 'S (2)', probLabel: 'p' },
							{ label: 'E (1)', probLabel: '1-p' }
						]
					},
					{
						label: 'E',
						probLabel: '1-p',
						children: [
							{ label: 'S (1)', probLabel: 'p' },
							{ label: 'E (0)', probLabel: '1-p' }
						]
					}
				]
			}),
			visualCaptionAr: 'شجرة تكرار تجربتي برنولي مستقلتين $B(2, p)$ واستنتاج مسارات $X \\in \\{0, 1, 2\\}$',
			examples: [
				{
					problemAr:
						'احتمال تعرض طلبية لتأخر لوجستي هو $p = 0.1$. نفحص عينة مستقلة من $n = 4$ طلبيات. احسب $P(X = 0)$، $P(X \\ge 1)$، و $E(X)$.',
					solutionAr:
						'يتبع $X$ قانون ثنائي الحد $B(4; 0.1)$:\n- $P(X = 0) = C_4^0 (0.1)^0 (0.9)^4 = 0.6561$.\n- $P(X \\ge 1) = 1 - P(X = 0) = 1 - 0.6561 = 0.3439$.\n- $E(X) = 4 \\times 0.1 = 0.4$ طلبية.'
				},
				{
					problemAr:
						'كم طلبية $n$ على الأقل يجب فحصها ليكون احتمال إيجاد طلبية متأخرة واحدة على الأقل أكبر من أو يساوي $0.90$ (علماً أن $p = 0.1$ و $\\ln(0.1) \\approx -2.303$ و $\\ln(0.9) \\approx -0.1054$)؟',
					solutionAr:
						'نحل $1 - 0.9^n \\ge 0.90 \\iff 0.9^n \\le 0.1 \\iff n \\ln(0.9) \\le \\ln(0.1)$.\nبما أن $\\ln(0.9) < 0$ ينعكس الترتيب: $n \\ge \\frac{-2.303}{-0.1054} \\approx 21.85$، إذن $n_{\\min} = 22$ طلبية.'
				}
			],
			watchOutAr:
				'احذر عند حل المتراجحة $(1 - p)^n \\le \\varepsilon$ باستعمال اللوغاريتم: بما أن $0 < 1 - p < 1$ فإن $\\ln(1 - p) < 0$ **سالب تماماً**! عند القسمة عليه يجب **عكس اتجاه المتراجحة**، وإلا ستحصل على $n \\le 21.85$ بدل $n \\ge 21.85$!'
		},
		practice: [
			{
				questionAr:
					'يتبع متغير عشوائي $X$ قانون ثنائي الحد $B(5 ; 0.4)$. ما هي قيمتا الأمل الرياضياتي $E(X)$ والتباين $V(X)$؟',
				options: [
					'$E(X) = 2$ و $V(X) = 1.2$',
					'$E(X) = 2$ و $V(X) = 0.8$',
					'$E(X) = 3$ و $V(X) = 1.2$',
					'$E(X) = 0.4$ و $V(X) = 0.24$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! $E(X) = n p = 5 \\times 0.4 = 2$، و $V(X) = n p (1 - p) = 5 \\times 0.4 \\times 0.6 = 1.2$.',
					'نسيت الضرب في $(1 - p) = 0.6$ بصورة صحيحة ($2 \\times 0.6 = 1.2$ وليس $0.8$).',
					'استعملت $1 - p = 0.6$ مكان $p = 0.4$ في الأمل الرياضياتي.',
					'هذه قيم تجربة برنولي واحدة $n = 1$ وليست لـ $n = 5$!'
				],
				explanationAr:
					'في قانون ثنائي الحد $B(5; 0.4)$: $E(X) = 5 \\times 0.4 = 2$ و $V(X) = 5 \\times 0.4 \\times 0.6 = 1.2$.'
			},
			{
				questionAr:
					'نكرر تجربة برنولي $n = 4$ مرات بصورة مستقلة باحتمال نجاح $p = \\frac{1}{2}$. ما هو احتمال الحصول على نجاحين بالضبط $P(X = 2)$؟',
				options: ['$\\frac{3}{8}$', '$\\frac{1}{16}$', '$\\frac{1}{4}$', '$\\frac{1}{2}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! لدينا $C_4^2 = 6$، ومنه $P(X = 2) = 6 \\times \\left(\\frac{1}{2}\\right)^2 \\left(\\frac{1}{2}\\right)^2 = \\frac{6}{16} = \\frac{3}{8}$.',
					'نسيت الضرب في معامل التوفيقة $C_4^2 = 6$ (هناك $6$ مسارات تحقق نجاحين)!',
					'تحقق من قيمة التوفيقة: $C_4^2 = \\frac{4 \\times 3}{2} = 6$ وليس $4$.',
					'$\\frac{1}{2}$ هو احتمال النجاح الواحد $p$ وليس $P(X = 2)$.'
				],
				explanationAr:
					'بتطبيق قانون ثنائي الحد: $P(X = 2) = C_4^2 (\\frac{1}{2})^4 = \\frac{6}{16} = \\frac{3}{8}$.'
			},
			{
				questionAr:
					'لإيجاد أصغر عدد طبيعي $n$ يحقق $1 - (0.7)^n \\ge 0.99$، نكتب $(0.7)^n \\le 0.01$. أي خطوة تالية صحيحة؟',
				options: [
					'$n \\ge \\frac{\\ln(0.01)}{\\ln(0.7)}$ لأن $\\ln(0.7) < 0$',
					'$n \\le \\frac{\\ln(0.01)}{\\ln(0.7)}$',
					'$n \\ge \\ln\\left(\\frac{0.01}{0.7}\\right)$',
					'$n \\ge \\frac{0.01}{0.7}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! بإدخال اللوغاريتم نجد $n\\ln(0.7) \\le \\ln(0.01)$، وبما أن $\\ln(0.7) < 0$ ينعكس اتجاه المتراجحة عند القسمة عليه.',
					'نسيت قلب اتجاه المتراجحة عند القسمة على العدد السالب $\\ln(0.7) < 0$!',
					'$\\frac{\\ln(a)}{\\ln(b)}$ لا يساوي $\\ln(a/b)$!',
					'اللوغاريتم ضروري لإنزال الأس المجهول $n$.'
				],
				explanationAr:
					'تتزايد الدالة $\\ln$ فتُحافظ على المتراجحة $n \\ln(0.7) \\le \\ln(0.01)$، ثم عند القسمة على $\\ln(0.7) < 0$ ينعكس الاتجاه إلى $n \\ge \\frac{\\ln(0.01)}{\\ln(0.7)}$.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// 5. Comprehensive BAC GE Economic Synthesis Methodology
	// ---------------------------------------------------------------------------
	{
		id: 'lesson_3as_ge_t3_bac_comprehensive_synthesis',
		slug: '3as-ge-t3-bac-comprehensive-synthesis',
		grade: '3as_ge',
		yearSubjectId: 749,
		trimesterId: 't3',
		sequenceId: 'seq7',
		sequenceTitleAr: 'المقطع السابع: منهجية حل موضوع بكالوريا متكامل — تسيير واقتصاد',
		order: 5,
		titleAr: 'منهجية المسألة الاقتصادية الشاملة في البكالوريا (الدوال، المتتاليات، الإحصاء والاحتمالات)',
		objectives: [
			'الربط بين محاور بكالوريا تسيير واقتصاد الأربعة في مسألة واحدة (متتالية تراجعية، احتمالات شرطية، دالة اقتصادية، وتكامل)',
			'إتقان استغلال النتائج الوسيطة: إشارة دالة مساعدة $\\implies$ اتجاه تغير الدالة الرئيسية $\\implies$ حساب مساحة أو قيمة متوسطة',
			'مراجعة الفخاخ الكلاسيكية في البكالوريا (الأدلة $n+1$ في المجموع، شرط الرتابة في TVI، إشارة التكامل والقيمة المتوسطة)'
		],
		keywordsAr: [
			'بكالوريا تسيير واقتصاد',
			'منهجية التحرير',
			'مسألة شاملة',
			'القيمة المتوسطة',
			'مراجعة نهائية'
		],
		discover: {
			scenarioAr:
				'في موضوع بكالوريا نموذجي لشعبة تسيير واقتصاد، ندرس تطور إنتاج مؤسسة عبر $u_{n+1} = 0.5 u_n + 10$ ($u_0 = 4$)، ثم ندرس دالة الكلفة أو العائد $f(x) = 2x - 1 + 4e^{-x}$ على $[0; 4]$ بمقاربها المائل $y = 2x - 1$، ونختم بحساب القيمة المتوسطة للدالة $f$ على $[0; 2]$. لنتدرب على الربط السليم بين الأسئلة!',
			svg: svgFunctionCurvePlot({
				xMin: -0.4,
				xMax: 4,
				yMin: -0.5,
				yMax: 8,
				fn: (x) => 2 * x - 1 + 4 * Math.exp(-x),
				curveLabel: 'f(x)=2x-1+4e^(-x)',
				shadedIntegral: { a: 0, b: 2, color: 'rgba(16,185,129,0.2)' },
				asymptotes: [{ kind: 'oblique', a: 2, b: -1, label: 'Δ: y=2x-1', color: '#059669' }],
				points: [
					{ x: 0, y: 3, label: 'f(0)=3', color: '#1d4ed8' },
					{ x: Math.log(2), y: 2 * Math.log(2) + 1, label: 'Min(ln2)', color: '#dc2626' }
				]
			}),
			steps: [
				{
					promptAr:
						'في محور المتتاليات: ما هي النهاية $\\ell$ التي تتقارب نحوها المتتالية $u_{n+1} = 0.5 u_n + 10$ ($u_0 = 4$)؟',
					hintAr: 'حل $\\ell = 0.5 \\ell + 10$.',
					expectedInput: '20',
					revealAr: 'لدينا $0.5 \\ell = 10 \\implies \\ell = 20$، والمتتالية $v_n = u_n - 20$ هندسية أساسها $0.5$.'
				},
				{
					promptAr:
						'في محور الدوال: احسب مشتقة $f(x) = 2x - 1 + 4e^{-x}$ وأوجد القيمة $x_0$ التي تنعدم عندها $f\'(x)$ (على الشكل $\\ln(k)$ أو قيمة $k$ فقط: $f\'(x_0) = 0 \\iff e^{x_0} = k$). ما قيمة $k$؟',
					hintAr: 'لدينا $f\'(x) = 2 - 4e^{-x} = 0 \\iff e^x = \\frac{4}{2}$.',
					expectedInput: '2',
					revealAr:
						'لدينا $f\'(x) = 2 - 4e^{-x} = 0 \\iff e^x = 2 \\iff x_0 = \\ln(2)$ (حيث $k = 2$).'
				},
				{
					promptAr:
						'احسب التكامل $I = \\int_0^2 (2x - 1 + 4e^{-x})\\,dx = [x^2 - x - 4e^{-x}]_0^2$. إذا كتبنا $I = A - 4e^{-2}$ فما قيمة العدد الطبيعي $A$؟',
					hintAr: 'عوض $2$ و $0$: $(4 - 2 - 4e^{-2}) - (0 - 0 - 4e^0)$.',
					expectedInput: '6',
					revealAr: 'نجد $I = (2 - 4e^{-2}) - (-4) = 6 - 4e^{-2}$، ومنه $A = 6$.'
				},
				{
					promptAr:
						'استنتج القيمة المتوسطة $m = \\frac{1}{2 - 0} I$ على $[0; 2]$ على الشكل $k - 2e^{-2}$. ما قيمة $k$؟',
					hintAr: 'اقسم $6 - 4e^{-2}$ على $2$.',
					expectedInput: '3',
					revealAr: 'القيمة المتوسطة هي $m = \\frac{6 - 4e^{-2}}{2} = 3 - 2e^{-2}$، أي $k = 3$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**خريطة موضوع بكالوريا تسيير واقتصاد (20 نقطة)**:\n1. **الاحتمالات والإحصاء ثنائي المتغير**: شجرة احتمالات، دستور الاحتمالات الكلية، برنولي $B(n, p)$، أو النقطة المتوسطة $G(\\bar{x}, \\bar{y})$ ومستقيم الانحدار $y = ax + b$ للتنبؤ.\n2. **المتتاليات العددية**: متتالية تراجعية $u_{n+1} = a u_n + b$ مع البرهان بالتراجع، المتتالية المساعدة الهندسية، التقارب والمجموع $S_n$.\n3. **المسألة الاقتصادية الشاملة (دالة أسية أو لوغاريتمية)**: دالة مساعدة وإشارتها بـ TVI، دراسة الدالة الرئيسية (نهايات، مقاربات، مشتقة، جدول تغيرات، مماس، تمثيل بياني)، ثم دالة أصلية، تكامل ومساحة وقيمة متوسطة $m = \\frac{1}{b-a}\\int_a^b f(x)\\,dx$.',
				'**قائمة التحقق الذهبية قبل تسليم ورقة البكالوريا**:\n- هل ذكرت الشروط الثلاثة في مبرهنة القيم المتوسطة (الاستمرارية + الرتابة التامة + تغير الإشارة)؟\n- هل تحققت من عدد الحدود $(n + 1)$ في $S_n = u_0 + \\dots + u_n$؟\n- هل وضعت $e^0 = 1$ و $\\ln(1) = 0$ بدقة عند تعويض الحدود؟\n- هل قسمت على $(b - a)$ في القيمة المتوسطة وضربت في $\\|\\vec{i}\\|\\|\\vec{j}\\|$ في المساحة بـ $\\text{cm}^2$؟'
			],
			visualSvg: svgCobwebSequencePlot({
				xMin: 0,
				xMax: 24,
				yMin: 0,
				yMax: 24,
				fn: (x) => 0.5 * x + 10,
				u0: 4,
				steps: 4,
				fixedPoint: 20
			}),
			visualCaptionAr: 'مخطط الدرج لتقارب المتتالية $u_{n+1} = 0.5u_n + 10$ نحو النقطة الثابتة $L = 20$',
			examples: [
				{
					problemAr:
						'كيف توظف إشارة دالة مساعدة $g(x)$ في إثبات اتجاه تغير الدالة الرئيسية $f(x)$ في البكالوريا؟',
					solutionAr:
						'في معظم مسائل البكالوريا، نحسب $f\'(x)$ فنختزلها لتصبح من الشكل $f\'(x) = \\frac{g(x)}{x^2}$ (في اللوغاريتمية) أو $f\'(x) = g(x) e^{-x}$ (في الأسية). وبما أن $x^2 > 0$ و $e^{-x} > 0$ تماماً، فإن إشارة $f\'(x)$ مطابقة تماماً لإشارة $g(x)$ التي استنتجناها في الجزء الأول عبر $\\alpha$!'
				},
				{
					problemAr:
						'ما الفرق بين السؤال «احسب $f(\\alpha)$» والسؤال «استنتج حصراً للعدد $f(\\alpha)$ علماً أن $1.2 < \\alpha < 1.3$»؟',
					solutionAr:
						'- في السؤال الأول نعوض $\\ln(\\alpha)$ أو $e^{\\alpha}$ باستعمال $g(\\alpha) = 0$ للتخلص من الدالة المتسامية.\n- في السؤال الثاني نستعمل رتابة العبارة الجبرية الناتجة (أو نجمع طرفي الحصر باتجاه واحد إن أمكن) لإيجاد حصر عددي دقيق لـ $f(\\alpha)$.'
				}
			],
			watchOutAr:
				'في التمارين الاقتصادية بالبكالوريا، لا تتوقف عند النتيجة الرياضية المجردة إذا طُلب التفسير الاقتصادي! اربط كل نتيجة بسياقها: مثلاً $\\alpha$ يمثل عتبة التعادل أو الإنتاج الأمثل، $m = \\frac{1}{b-a}\\int_a^b f(x)\\,dx$ يمثل متوسط الكلفة أو الإيراد خلال الفترة، و $\\lim_{n \\to +\\infty} u_n = L$ يمثل سقف الاستقرار الإنتاجي للمؤسسة.'
		},
		practice: [
			{
				questionAr:
					'إذا كانت دالة الكلفة الحدية لمصنع هي $C_m(x) = 3 + 2e^{-x}$ على $[0; 2]$، فما هو متوسط الكلفة الحدية (القيمة المتوسطة) على المجال $[0; 2]$؟',
				options: ['$4 - e^{-2}$', '$8 - 2e^{-2}$', '$3 - e^{-2}$', '$4 + e^{-2}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! نحسب $\\int_0^2 (3 + 2e^{-x})\\,dx = [3x - 2e^{-x}]_0^2 = (6 - 2e^{-2}) - (-2) = 8 - 2e^{-2}$، وبالقسمة على $2 - 0 = 2$ نجد $4 - e^{-2}$.',
					'هذه قيمة التكامل $\\int_0^2 C_m(x)\\,dx$؛ نسيت القسمة على طول المجال $b - a = 2$!',
					'نسيت قيمة $-2e^0 = -2$ عند التعويض بالحد الأدنى $x = 0$!',
					'أخطأت في إشارة الدالة الأصلية لـ $2e^{-x}$ (وهي $-2e^{-x}$).'
				],
				explanationAr:
					'القيمة المتوسطة هي $m = \\frac{1}{2}[3x - 2e^{-x}]_0^2 = \\frac{1}{2}((6 - 2e^{-2}) - (-2)) = \\frac{8 - 2e^{-2}}{2} = 4 - e^{-2}$.'
			},
			{
				questionAr:
					'في مسألة بكالوريا، إذا كانت $f\'(x) = \\frac{g(x)}{x^2}$ على $]0; +\\infty[$ وكانت $g$ متناقصة تماماً وتنعدم عند $\\alpha$، فما هو اتجاه تغير $f$؟',
				options: [
					'متزايدة تماماً على $]0; \\alpha]$ ومتناقصة تماماً على $[\\alpha; +\\infty[$',
					'متناقصة تماماً على $]0; \\alpha]$ ومتزايدة تماماً على $[\\alpha; +\\infty[$',
					'متناقصة تماماً على كل $]0; +\\infty[$ لأن $g$ متناقصة',
					'متزايدة تماماً على كل $]0; +\\infty[$ لأن $x^2 > 0$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! بما أن $g$ متناقصة وتنعدم عند $\\alpha$، فإن $g(x) > 0$ على $]0; \\alpha[$ و $g(x) < 0$ على $]\\alpha; +\\infty[$، فتتبعها $f\'(x)$ وتكون $f$ متزايدة ثم متناقصة!',
					'هذا اتجاه تغير $f$ لو كانت $g$ متزايدة، بينما المعطى أن $g$ متناقصة تماماً!',
					'اتجاه تغير $f$ تحدده **إشارة** $f\'(x)$ أي **إشارة** $g(x)$ وليس اتجاه تغير $g$!',
					'إشارة $f\'(x)$ تعتمد على البسط $g(x)$ أيضاً وليس المقام $x^2$ فقط.'
				],
				explanationAr:
					'بما أن $g$ متناقصة و $g(\\alpha) = 0$، فإن $g(x) > 0$ قبل $\\alpha$ و $g(x) < 0$ بعده، ومنه $f$ متزايدة على $]0; \\alpha]$ ومتناقصة على $[\\alpha; +\\infty[$.'
			},
			{
				questionAr:
					'للتنبؤ بالإنتاج عبر مستقيم الانحدار $y = 4x + 10$ حيث $G(\\bar{x}; \\bar{y})$ نقطته المتوسطة، إذا كان $\\bar{x} = 5$ فما قيمة $\\bar{y}$؟',
				options: ['$30$', '$20$', '$10$', '$25$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! لأن مستقيم الانحدار يمر حتماً بالنقطة المتوسطة $G(\\bar{x}; \\bar{y})$، فإن $\\bar{y} = 4(5) + 10 = 30$.',
					'نسيت إضافة الترتيب عند المبدأ $+10$.',
					'$10$ هو الترتيب عند المبدأ $b$ وليس $\\bar{y}$.',
					'تحقق من الحساب: $4 \\times 5 + 10 = 30$.'
				],
				explanationAr:
					'يمر مستقيم الانحدار بالمربعات الدنيا دوماً بالنقطة المتوسطة $G(\\bar{x}; \\bar{y})$، ومنه $\\bar{y} = 4\\bar{x} + 10 = 4(5) + 10 = 30$.'
			}
		]
	}
];
