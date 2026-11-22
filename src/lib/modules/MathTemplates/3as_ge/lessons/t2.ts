import type { InteractiveLessonData } from '../../types';
import { svgFunctionCurvePlot, svgVariationTable } from '../../svg-secondary';

// ═══════════════════════════════════════════════════════════════════════════════
// 3AS GE (BAC) — Trimester 2 Interactive Lessons (5 Lessons, yearSubjectId: 749)
// 100% Halal Economic & Managerial Contexts (Zero usurious interest)
// ═══════════════════════════════════════════════════════════════════════════════

export const LESSONS_3AS_GE_T2: InteractiveLessonData[] = [
	// ---------------------------------------------------------------------------
	// 1. Exponential Function exp(u(x))
	// ---------------------------------------------------------------------------
	{
		id: 'lesson_3as_ge_t2_exponential_functions',
		slug: '3as-ge-t2-exponential-functions',
		grade: '3as_ge',
		yearSubjectId: 749,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: الدوال الأسية واللوغاريتمية والمقاربات',
		order: 1,
		titleAr: 'الدالة الأسية النيبيرية $e^x$ والدالة المركبة $e^{u(x)}$ وتطبيقاتها الاقتصادية',
		objectives: [
			'استعمال الخواص الجبرية للدالة الأسية لحل معادلات ومتراجحات أسية في $\\mathbb{R}$',
			'حساب النهايات المرجعية للدالة الأسية ونهايات التزايد المقارن $\\lim_{+\\infty} \\frac{e^x}{x^n} = +\\infty$ و $\\lim_{-\\infty} x^n e^x = 0$',
			'اشتقاق الدوال المركبة من الشكل $e^{u(x)}$ ودراسة دوال اقتصادية أسية (نمو المبيعات وتشبع السوق)'
		],
		keywordsAr: [
			'الدالة الأسية',
			'معادلات أسية',
			'التزايد المقارن',
			'الدالة المركبة e^{u(x)}',
			'منحنى التشبع'
		],
		discover: {
			scenarioAr:
				'تُنمذج المبيعات السنوية لمنصة تجارة إلكترونية (بآلاف الطلبيات) بعد $x$ سنة من انطلاقها بالدالة $f(x) = 20 - 16e^{-0.5x}$ على $[0; +\\infty[$، بينما نحتاج في التحليل الجبري لحل معادلات مثل $e^{2x} - (e^2 + 1)e^x + e^2 = 0$ ودراسة دوال مركبة $e^{u(x)}$.',
			svg: svgFunctionCurvePlot({
				xMin: -0.5,
				xMax: 7,
				yMin: 0,
				yMax: 24,
				fn: (x) => 20 - 16 * Math.exp(-0.5 * x),
				curveLabel: 'f(x) = 20 - 16e^(-0.5x)',
				asymptotes: [{ kind: 'horizontal', value: 20, label: 'y = 20', color: '#dc2626' }],
				points: [
					{ x: 0, y: 4, label: 'f(0)=4', color: '#1d4ed8' },
					{ x: 2, y: 20 - 16 * Math.exp(-1), label: 'x=2', color: '#15803d' }
				]
			}),
			steps: [
				{
					promptAr: 'احسب عدد الطلبيات الابتدائية عند الانطلاق $f(0) = 20 - 16e^0$ (بآلاف الطلبيات).',
					hintAr: 'تذكر القاعدة الأساسية: $e^0 = 1$.',
					expectedInput: '4',
					revealAr: 'لدينا $f(0) = 20 - 16(1) = 4$ آلاف طلبية.'
				},
				{
					promptAr:
						'احسب النهاية $\\lim_{x \\to +\\infty} f(x)$ التي تمثّل سقف تشبع السوق علماً أن $\\lim_{x \\to +\\infty} e^{-0.5x} = 0$.',
					hintAr: 'عوض نهاية $e^{-0.5x}$ بالصفر.',
					expectedInput: '20',
					revealAr:
						'بما أن $\\lim_{x \\to +\\infty} e^{-0.5x} = 0$ فإن $\\lim_{x \\to +\\infty} f(x) = 20$، والمستقيم $y = 20$ مقارب أفقي.'
				},
				{
					promptAr:
						'لحل المعادلة $e^{2x} - (e^2 + 1)e^x + e^2 = 0$ نضع $X = e^x > 0$، فنجد $X_1 = 1$ أو $X_2 = e^2$. ما هو مجموع حلّي المعادلة بالنسبة إلى $x$؟',
					hintAr: 'حل $e^x = e^0$ و $e^x = e^2$ واجمع الحلين.',
					expectedInput: '2',
					revealAr:
						'لدينا $e^x = 1 = e^0 \\iff x = 0$، و $e^x = e^2 \\iff x = 2$. فمجموعة الحلول هي $S = \\{0; 2\\}$ ومجموعها $0 + 2 = 2$.'
				},
				{
					promptAr:
						'احسب النهاية $\\lim_{x \\to 0} \\frac{e^{5x} - 1}{x}$ بتوظيف نهاية العدد المشتق $\\lim_{u \\to 0} \\frac{e^u - 1}{u} = 1$.',
					hintAr: 'اكتب العبارة على الشكل $5 \\times \\frac{e^{5x} - 1}{5x}$.',
					expectedInput: '5',
					revealAr: 'بوضع $u = 5x \\to 0$ نجد $\\lim_{x \\to 0} \\frac{e^{5x} - 1}{x} = 5 \\times 1 = 5$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**الخواص الأساسية والجبرية للدالة الأسية**: الدالة $x \\mapsto e^x$ معرفة، مستمرة، قابلة للاشتقاق و**موجبة تماماً** ($e^x > 0$) ومتزايدة تماماً على $\\mathbb{R}$.\n- $e^0 = 1$، $e^{a+b} = e^a e^b$، $e^{-a} = \\frac{1}{e^a}$، $e^{a-b} = \\frac{e^a}{e^b}$، $(e^a)^n = e^{na}$.\n- **حل المعادلات والمتراجحات**: $e^a = e^b \\iff a = b$، و $e^a < e^b \\iff a < b$.',
				'**النهايات المرجعية والتزايد المقارن**:\n- $\\lim_{x \\to -\\infty} e^x = 0^+$ و $\\lim_{x \\to +\\infty} e^x = +\\infty$ و $\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1$.\n- **التزايد المقارن**: من أجل كل $n \\in \\mathbb{N}^*$: $\\lim_{x \\to +\\infty} \\frac{e^x}{x^n} = +\\infty$ و $\\lim_{x \\to -\\infty} x^n e^x = 0$.',
				'**اشتقاق الدالة المركبة $e^{u(x)}$**: إذا كانت $u$ قابلة للاشتقاق على $I$ فإن $(e^{u(x)})\' = u\'(x) e^{u(x)}$. وبما أن $e^{u(x)} > 0$ دوماً، فإن إشارة $(e^{u(x)})\'$ هي **نفس إشارة $u\'(x)$**.'
			],
			visualSvg: svgVariationTable({
				xValues: ['-∞', '2', '+∞'],
				derivativeRow: [
					{ kind: 'sign', value: '-' },
					{ kind: 'sign', value: '0' },
					{ kind: 'sign', value: '+' }
				],
				variations: [
					{ value: '+∞', position: 'top' },
					{ value: '-1', position: 'bottom' },
					{ value: '0', position: 'top' }
				],
				fnName: 'h(x)',
				derivName: "h'(x)"
			}),
			visualCaptionAr: 'جدول تغيرات الدالة $h(x) = (x - 3)e^{-x}$ على $\\mathbb{R}$ (نهاية $-\\infty$ هي $+\\infty$؟ كلا، مثال: $g(x) = (1 - x)e^{-x}$!)',
			examples: [
				{
					problemAr: 'ادرس تغيرات الدالة $f(x) = (x - 2)e^x + 3$ على $\\mathbb{R}$ واحسب نهايتيها.',
					solutionAr:
						'- عند $-\\infty$: بالتزايد المقارن $\\lim_{x \\to -\\infty} x e^x = 0$ و $\\lim_{x \\to -\\infty} e^x = 0$، إذن $\\lim_{x \\to -\\infty} f(x) = 3$ (مقارب أفقي $y = 3$).\n- عند $+\\infty$: $\\lim_{x \\to +\\infty} (x - 2) = +\\infty$ و $\\lim_{x \\to +\\infty} e^x = +\\infty \\implies \\lim_{x \\to +\\infty} f(x) = +\\infty$.\n- المشتقة: $f\'(x) = 1\\cdot e^x + (x - 2)e^x = (x - 1)e^x$. تنعدم عند $x = 1$: متناقصة على $]-\\infty; 1]$ ومتزايدة على $[1; +\\infty[$، وحدتها الصغرى $f(1) = 3 - e$.'
				},
				{
					problemAr: 'حل في $\\mathbb{R}$ المتراجحة $e^{2x} - 5e^x + 4 \\le 0$.',
					solutionAr:
						'نضع $X = e^x > 0$: تصبح $X^2 - 5X + 4 \\le 0 \\iff (X - 1)(X - 4) \\le 0 \\iff 1 \\le X \\le 4$.\nأي $e^0 \\le e^x \\le e^{\\ln 4} \\iff 0 \\le x \\le \\ln 4$، ومنه $S = [0 ; \\ln 4]$.'
				}
			],
			watchOutAr:
				'تذكّر دائماً أن $e^x > 0$ **تماماً** لكل $x \\in \\mathbb{R}$! المعادلة $e^x = -2$ أو $e^x = 0$ **مستحيلة الحل** في $\\mathbb{R}$؛ لذا عند وضع $X = e^x$ في معادلة الدرجة الثانية، ارفض مباشرة أي جذر سالب أو معدوم.'
		},
		practice: [
			{
				questionAr: 'ما هي مشتقة الدالة المركبة $f(x) = e^{-2x^2 + 4x}$ المعرفة على $\\mathbb{R}$؟',
				options: [
					'$f\'(x) = (-4x + 4)e^{-2x^2 + 4x}$',
					'$f\'(x) = e^{-4x + 4}$',
					'$f\'(x) = (-2x^2 + 4x)e^{-2x^2 + 4x - 1}$',
					'$f\'(x) = 4e^{-2x^2 + 4x}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! حسب القاعدة $(e^{u})\' = u\' e^u$: مشتقة $u(x) = -2x^2 + 4x$ هي $u\'(x) = -4x + 4$.',
					'خطأ شائع: نحتفظ بالأس الأصلي $e^{u(x)}$ كما هو ونضرب في $u\'(x)$ من الخارج، ولا نشتق داخل الأس!',
					'طبّقت قاعدة القوة $x^n$ خطأً على الأسية.',
					'نسيت الحد $-4x$ عند اشتقاق $-2x^2$.'
				],
				explanationAr:
					'نطبق قاعدة اشتقاق الدالة الأسية المركبة $(e^{u(x)})\' = u\'(x)e^{u(x)}$ مع $u(x) = -2x^2 + 4x \\implies u\'(x) = -4x + 4$.'
			},
			{
				questionAr: 'ما هي مجموعة حلول المعادلة $e^{2x} - 2e^x - 8 = 0$ في $\\mathbb{R}$؟',
				options: ['$S = \\{\\ln 4\\}$', '$S = \\{\\ln 4 ; \\ln(-2)\\}$', '$S = \\{4\\}$', '$S = \\{2\\ln 2 ; 0\\}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! بوضع $X = e^x > 0$ نجد $(X - 4)(X + 2) = 0$: الجذر $X = -2$ مرفوض لأن $e^x > 0$، ومن $e^x = 4$ نجد $x = \\ln 4$.',
					'لا يوجد لوغاريتم لعدد سالب! $e^x = -2$ مستحيلة الحل في $\\mathbb{R}$.',
					'$4$ هو قيمة $e^x$ وليس $x$؛ يجب إدخال اللوغاريتم النيبيري.',
					'$X = 1$ ليس جذراً للمعادلة ($1 - 2 - 8 \\ne 0$).'
				],
				explanationAr:
					'نضع $X = e^x > 0$: $X^2 - 2X - 8 = 0 \\implies X = 4$ أو $X = -2$ (مرفوض). ومنه $e^x = 4 \\iff x = \\ln 4$.'
			},
			{
				questionAr: 'احسب النهاية $\\lim_{x \\to -\\infty} (3x + 5)e^x$:',
				options: ['$0$', '$-\\infty$', '$+\\infty$', '$5$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! نكتب $(3x + 5)e^x = 3(x e^x) + 5e^x$. بالتزايد المقارن $\\lim_{-\\infty} x e^x = 0$ و $\\lim_{-\\infty} e^x = 0$، فالنهاية $0$.',
					'$-\\infty \\times 0$ حالة عدم تعيين تُرفع بالتزايد المقارن لتعطي $0$!',
					'تحقق من إشارة $(3x + 5)$ ونهاية التزايد المقارن $x e^x \\to 0$ عند $-\\infty$.',
					'$e^x \\to 0$ عند $-\\infty$ لذا يختفي الحد $5e^x$ إلى $0$ أيضاً.'
				],
				explanationAr:
					'بنشر الجداء نحصل على $3 x e^x + 5 e^x$، وحسب نهايات التزايد المقارن عند $-\\infty$ تؤول كل من $x e^x$ و $e^x$ إلى $0$.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// 2. Logarithmic Function ln(u(x))
	// ---------------------------------------------------------------------------
	{
		id: 'lesson_3as_ge_t2_logarithmic_functions',
		slug: '3as-ge-t2-logarithmic-functions',
		grade: '3as_ge',
		yearSubjectId: 749,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: الدوال الأسية واللوغاريتمية والمقاربات',
		order: 2,
		titleAr: 'الدالة اللوغاريتمية النيبيرية $\\ln(x)$ والدالة المركبة $\\ln(u(x))$',
		objectives: [
			'تعيين مجموعة تعريف دالة تتضمن $\\ln(u(x))$ بالشرط $u(x) > 0$ وحل معادلات ومتراجحات لوغاريتمية مع التحقق من شروط القبول',
			'استعمال الخواص الجبرية للوغاريتم ونهايات التزايد المقارن ($\\lim_{+\\infty} \\frac{\\ln x}{x^n} = 0$ و $\\lim_{0^+} x^n \\ln x = 0$)',
			'اشتقاق الدوال المركبة $(\\ln u)\' = \\frac{u\'}{u}$ ودراسة دوال اقتصادية لوغاريتمية (الكلفة الحدية وتزايد المردودية)'
		],
		keywordsAr: [
			'اللوغاريتم النيبيري',
			'مجموعة التعريف',
			'معادلات لوغاريتمية',
			'التزايد المقارن',
			'اشتقاق ln(u)'
		],
		discover: {
			scenarioAr:
				'تُنمذج الكلفة المتوسطة لإنتاج $x > 0$ وحدة في مصنع بالدالة $f(x) = x^2 - 2\\ln(x)$ (بآلاف الدنانير). نريد دراسة تغيراتها على $]0; +\\infty[$ وإيجاد قيمتها الصغرى، ثم حل معادلة لوغاريتمية بمراقبة شروط مجموعة التعريف.',
			svg: svgFunctionCurvePlot({
				xMin: -0.3,
				xMax: 3.2,
				yMin: -0.5,
				yMax: 7,
				fn: (x) => (x > 0.05 ? x * x - 2 * Math.log(x) : NaN),
				curveLabel: 'f(x) = x² - 2ln(x)',
				asymptotes: [{ kind: 'vertical', value: 0, label: 'x=0', color: '#dc2626' }],
				tangents: [{ x: 1, y: 1, slope: 0, halfSpan: 0.7, color: '#059669' }],
				points: [{ x: 1, y: 1, label: 'Min(1; 1)', color: '#15803d' }]
			}),
			steps: [
				{
					promptAr:
						'احسب $f\'(x) = 2x - \\frac{2}{x} = \\frac{2(x - 1)(x + 1)}{x}$ للدالة $f(x) = x^2 - 2\\ln(x)$ على $]0; +\\infty[$. عند أي قيمة $x_0 > 0$ تبلغ الدالة $f$ قيمتها الصغرى؟',
					hintAr: 'على $]0; +\\infty[$ يكون $x > 0$ و $x + 1 > 0$، فابحث عن الجذر الموجب لـ $x - 1 = 0$.',
					expectedInput: '1',
					revealAr:
						'إشارة $f\'(x)$ على $]0; +\\infty[$ هي من إشارة $(x - 1)$: سالبة على $]0; 1[$ وموجبة على $]1; +\\infty[$، إذن تبلغ الدالة قيمتها الحدية الصغرى عند $x_0 = 1$.'
				},
				{
					promptAr: 'احسب القيمة الحدية الصغرى $f(1) = 1^2 - 2\\ln(1)$.',
					hintAr: 'تذكر أن $\\ln(1) = 0$.',
					expectedInput: '1',
					revealAr: 'لدينا $f(1) = 1 - 2(0) = 1$.'
				},
				{
					promptAr: 'حل في المجال $]3; +\\infty[$ المعادلة $\\ln(2x - 6) = 0$.',
					hintAr: 'استعمل $\\ln(u) = 0 \\iff u = 1$.',
					expectedInput: '3.5',
					revealAr:
						'لدينا $\\ln(2x - 6) = \\ln(1) \\iff 2x - 6 = 1 \\iff 2x = 7 \\iff x = 3.5$، وهي قيمة مقبولة لأن $3.5 > 3$.'
				},
				{
					promptAr: 'احسب باستعمال الخواص الجبرية قيمة العدد $A = \\ln(e^5) - 2\\ln(e) + \\ln(1)$.',
					hintAr: 'استعمل $\\ln(e^k) = k$ و $\\ln(1) = 0$.',
					expectedInput: '3',
					revealAr: 'لدينا $A = 5 - 2(1) + 0 = 3$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**التعريف ومجموعة التعريف**: الدالة $\\ln$ معرفة على $]0; +\\infty[$ وهي الدالة العكسية للدالة الأسية: $y = \\ln(x) \\iff x = e^y$ (من أجل $x > 0$ و $y \\in \\mathbb{R}$).\n- تكون $\\ln(u(x))$ معرفة إذا وفقط إذا كان $u(x) > 0$ **تماماً**.',
				'**الخواص الجبرية** (من أجل $a > 0, b > 0, n \\in \\mathbb{Z}$):\n- $\\ln(1) = 0$ و $\\ln(e) = 1$ و $\\ln(e^x) = x$.\n- $\\ln(a \\cdot b) = \\ln a + \\ln b$، و $\\ln\\left(\\frac{a}{b}\\right) = \\ln a - \\ln b$، و $\\ln\\left(\\frac{1}{b}\\right) = -\\ln b$، و $\\ln(a^n) = n\\ln a$.',
				'**النهايات المرجعية والتزايد المقارن**:\n- $\\lim_{x \\to 0^+} \\ln(x) = -\\infty$، و $\\lim_{x \\to +\\infty} \\ln(x) = +\\infty$، و $\\lim_{x \\to 1} \\frac{\\ln x}{x - 1} = 1$.\n- **التزايد المقارن**: $\\lim_{x \\to +\\infty} \\frac{\\ln x}{x^n} = 0$ و $\\lim_{x \\to 0^+} x^n \\ln(x) = 0$ ($n \\in \\mathbb{N}^*$).',
				'**المشتقة**: $(\\ln x)\' = \\frac{1}{x}$ على $]0; +\\infty[$، ومشتقة الدالة المركبة $(\\ln(u(x)))\' = \\frac{u\'(x)}{u(x)}$ حيث $u(x) > 0$.'
			],
			visualSvg: svgVariationTable({
				xValues: ['0', '1', '+∞'],
				derivativeRow: [
					{ kind: 'sign', value: '||' },
					{ kind: 'sign', value: '-' },
					{ kind: 'sign', value: '0' },
					{ kind: 'sign', value: '+' }
				],
				variations: [
					{ value: '+∞', position: 'top' },
					{ value: '1', position: 'bottom' },
					{ value: '+∞', position: 'top' }
				],
				fnName: 'f(x)',
				derivName: "f'(x)"
			}),
			visualCaptionAr: 'جدول تغيرات الدالة $f(x) = x^2 - 2\\ln(x)$ على $]0; +\\infty[$ مع الخطين المزدوجين عند $0$',
			examples: [
				{
					problemAr: 'حل في $\\mathbb{R}$ المعادلة: $\\ln(x - 1) + \\ln(x + 2) = \\ln(4)$.',
					solutionAr:
						'- **مجموعة التعريف (إجبارية أولاً!)**: يجب $x - 1 > 0$ و $x + 2 > 0$، أي $x \\in ]1; +\\infty[$.\n- على $]1; +\\infty[$: $\\ln[(x - 1)(x + 2)] = \\ln(4) \\iff x^2 + x - 2 = 4 \\iff x^2 + x - 6 = 0$.\n- الجذران هما $x_1 = 2$ و $x_2 = -3$. القيمة $-3 \\notin ]1; +\\infty[$ (مرفوضة)، والقيمة $2 \\in ]1; +\\infty[$ (مقبولة). إذن $S = \\{2\\}$.'
				},
				{
					problemAr: 'احسب المشتقة $g\'(x)$ للدالة $g(x) = \\ln(x^2 + 4x + 5)$ المعرفة على $\\mathbb{R}$.',
					solutionAr:
						'نلاحظ أن $x^2 + 4x + 5 = (x + 2)^2 + 1 > 0$ دوماً، فـ $D_g = \\mathbb{R}$.\nبتطبيق $\\frac{u\'(x)}{u(x)}$ نجد: $g\'(x) = \\frac{2x + 4}{x^2 + 4x + 5}$.'
				}
			],
			watchOutAr:
				'أكثر خطأ في البكالوريا عند حل معادلة مثل $\\ln(x - 1) + \\ln(x + 2) = \\ln(4)$ هو **نسيان تعيين مجموعة التعريف $D$ قبل جمع اللوغاريتمين**! فكتابة $\\ln(x - 1) + \\ln(x + 2) = \\ln((x - 1)(x + 2))$ لا تصح إلا عندما يكون كل عامل موجباً تماماً على حدة، وإلا فقد تقبل حلاً سالباً مثل $x = -3$ يعدم ويسلب ما داخل اللوغاريتم الأصلي!'
		},
		practice: [
			{
				questionAr: 'ما هي مجموعة تعريف الدالة $f(x) = \\ln(2x - 8)$؟',
				options: ['$]4 ; +\\infty[$', '$[4 ; +\\infty[$', '$\\mathbb{R} \\setminus \\{4\\}$', '$]-\\infty ; 4[$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! يشترط داخل اللوغاريتم $2x - 8 > 0$ تماماً أي $x > 4$، فالمجال مفتوح عند $4$: $]4; +\\infty[$.',
					'لا يوجد لوغاريتم للصفر ($\\ln 0$ غير معرّف)، لذا يجب فتح المجال عند $4$!',
					'الأعداد الأصغر من $4$ تجعل $2x - 8 < 0$، واللوغاريتم غير معرف للأعداد السالبة.',
					'عكست اتجاه المتراجحة $2x - 8 > 0$.'
				],
				explanationAr:
					'تكون الدالة اللوغاريتمية معرفة عندما يكون ما داخلها موجباً تماماً: $2x - 8 > 0 \\iff x > 4 \\iff D_f = ]4; +\\infty[$.'
			},
			{
				questionAr: 'ما هي مشتقة الدالة $g(x) = \\frac{\\ln(x)}{x}$ على المجال $]0; +\\infty[$؟',
				options: [
					'$g\'(x) = \\frac{1 - \\ln(x)}{x^2}$',
					'$g\'(x) = \\frac{1}{x^2}$',
					'$g\'(x) = \\frac{\\ln(x) - 1}{x^2}$',
					'$g\'(x) = \\frac{1 + \\ln(x)}{x^2}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! بقانون حاصل القسمة: $g\'(x) = \\frac{\\frac{1}{x} \\cdot x - 1 \\cdot \\ln(x)}{x^2} = \\frac{1 - \\ln(x)}{x^2}$.',
					'اشتققت البسط والمقام منفصلين خطأً، نسيت قاعدة حاصل القسمة $\\frac{u\'v - uv\'}{v^2}$.',
					'عكست ترتيب الطرح في $u\'v - uv\'$.',
					'انتبه للإشارة السالبة في قانون مشتق القسمة: $1 - \\ln(x)$ وليس $1 + \\ln(x)$.'
				],
				explanationAr:
					'بقانون $\\left(\\frac{u}{v}\\right)\' = \\frac{u\'v - uv\'}{v^2}$ مع $u = \\ln x \\implies u\' = \\frac{1}{x}$ و $v = x \\implies v\' = 1$: $g\'(x) = \\frac{1 - \\ln(x)}{x^2}$.'
			},
			{
				questionAr: 'احسب النهاية $\\lim_{x \\to +\\infty} \\left(2x - 3\\frac{\\ln x}{x}\\right)$:',
				options: ['$+\\infty$', '$0$', '$-\\infty$', '$2$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! بالتزايد المقارن $\\lim_{x \\to +\\infty} \\frac{\\ln x}{x} = 0$ و $\\lim_{x \\to +\\infty} 2x = +\\infty$، فالنهاية $+\\infty$.',
					'$0$ هو نهاية الكسر $\\frac{\\ln x}{x}$ فقط، لكن الحد $2x$ يؤول إلى $+\\infty$.',
					'راجع إشارة $2x$ عندما يؤول $x$ إلى $+\\infty$.',
					'لو كانت العبارة $\\frac{2x - 3\\ln x}{x}$ لكانت النهاية $2$، أما هنا فلدينا $2x$.'
				],
				explanationAr:
					'عند $+\\infty$ لدينا $\\lim_{x \\to +\\infty} \\frac{\\ln x}{x} = 0$ بالتزايد المقارن، ومنه $\\lim_{x \\to +\\infty} (2x - 3\\frac{\\ln x}{x}) = +\\infty - 0 = +\\infty$.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// 3. Oblique Asymptotes, Relative Position & f(alpha) in BAC Problems
	// ---------------------------------------------------------------------------
	{
		id: 'lesson_3as_ge_t2_oblique_asymptotes_exp_ln_study',
		slug: '3as-ge-t2-oblique-asymptotes-exp-ln-study',
		grade: '3as_ge',
		yearSubjectId: 749,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: الدوال الأسية واللوغاريتمية والمقاربات',
		order: 3,
		titleAr: 'دراسة دوال أسية ولوغاريتمية ذات مقارب مائل، الوضعية النسبية والمناقشة البيانية',
		objectives: [
			'إثبات أن مستقيماً $(\\Delta): y = ax + b$ مقارب مائل لمنحنى دالة أسية أو لوغاريتمية بجوار $+\\infty$ أو $-\\infty$',
			'دراسة الوضعية النسبية للمنحنى $(C_f)$ بالنسبة للمقارب المائل $(\\Delta)$ وتعيين نقطة التقاطع',
			'استغلال علاقة $g(\\alpha) = 0$ لتبسيط $f(\\alpha)$ وإجراء المناقشة البيانية الأفقية أو المائلة في مسائل البكالوريا'
		],
		keywordsAr: [
			'المقارب المائل',
			'الوضعية النسبية',
			'تبسيط f(α)',
			'المناقشة البيانية',
			'مسائل البكالوريا'
		],
		discover: {
			scenarioAr:
				'في مسألة اقتصادية، تُعطى الدالة $f$ على $]0; +\\infty[$ بـ $f(x) = 2x - 1 + \\frac{3 - \\ln(x)}{x}$. نريد إثبات أن المستقيم $(\\Delta): y = 2x - 1$ مقارب مائل لـ $(C_f)$ بجوار $+\\infty$، وتحديد موضع التقاطع والوضعية النسبية ثم معادلة المماس عند $x_0 = 1$.',
			svg: svgFunctionCurvePlot({
				xMin: -0.4,
				xMax: 6,
				yMin: -1,
				yMax: 12,
				fn: (x) => (x > 0.15 ? 2 * x - 1 + (3 - Math.log(x)) / x : NaN),
				curveLabel: 'C_f',
				asymptotes: [
					{ kind: 'vertical', value: 0, label: 'x=0', color: '#dc2626' },
					{ kind: 'oblique', a: 2, b: -1, label: 'Δ: y=2x-1', color: '#059669' }
				],
				tangents: [{ x: 1, y: 4, slope: -2, halfSpan: 0.7, color: '#7c3aed' }],
				points: [{ x: 1, y: 4, label: 'A(1; 4)', color: '#7c3aed' }]
			}),
			steps: [
				{
					promptAr:
						'احسب $\\lim_{x \\to +\\infty} [f(x) - (2x - 1)] = \\lim_{x \\to +\\infty} \\left(\\frac{3}{x} - \\frac{\\ln x}{x}\\right)$ لإثبات المقارب المائل $(\\Delta)$.',
					hintAr: 'استعمل $\\lim_{x \\to +\\infty} \\frac{\\ln x}{x} = 0$ (تزايد مقارن).',
					expectedInput: '0',
					revealAr:
						'لدينا $\\lim_{x \\to +\\infty} \\frac{3}{x} = 0$ و $\\lim_{x \\to +\\infty} \\frac{\\ln x}{x} = 0$، ومنه نهاية الفرق تساوي $0$، فالمستقيم $(\\Delta): y = 2x - 1$ مقارب مائل بجوار $+\\infty$.'
				},
				{
					promptAr:
						'يتقاطع $(C_f)$ مع $(\\Delta)$ عندما ينعدم الفرق $\\frac{3 - \\ln(x)}{x} = 0$، أي $\\ln(x) = k$. ما قيمة $k$ (فتكون فاصلة التقاطع $x = e^k$)?',
					hintAr: 'ساوِ البسط $3 - \\ln(x)$ بالصفر.',
					expectedInput: '3',
					revealAr:
						'ينعدم الفرق عند $3 - \\ln(x) = 0 \\iff \\ln(x) = 3 \\iff x = e^3$. يكون $(C_f)$ فوق $(\\Delta)$ على $]0; e^3[$ وتحته على $]e^3; +\\infty[$.'
				},
				{
					promptAr:
						'احسب مشتقة $f(x)$ فتجد $f\'(x) = \\frac{2x^2 - 4 + \\ln(x)}{x^2}$. احسب معامل توجيه المماس عند $x_0 = 1$ أي $f\'(1)$.',
					hintAr: 'عوّض $x = 1$ وتذكر أن $\\ln(1) = 0$.',
					expectedInput: '-2',
					revealAr: 'لدينا $f\'(1) = \\frac{2(1)^2 - 4 + 0}{1^2} = -2$.'
				},
				{
					promptAr:
						'إذا علمت أن $2\\alpha^2 - 4 + \\ln(\\alpha) = 0$ (الجذر $\\alpha$ للدالة المساعدة $g(x) = 2x^2 - 4 + \\ln x$)، وبالتعويض $\\ln(\\alpha) = 4 - 2\\alpha^2$ في $f(\\alpha)$ نجد $f(\\alpha) = A\\alpha - 1 - \\frac{1}{\\alpha}$. ما قيمة $A$؟',
					hintAr: 'احسب $2\\alpha - 1 + \\frac{3 - (4 - 2\\alpha^2)}{\\alpha} = 2\\alpha - 1 + \\frac{2\\alpha^2 - 1}{\\alpha}$.',
					expectedInput: '4',
					revealAr:
						'نجد $f(\\alpha) = 2\\alpha - 1 + 2\\alpha - \\frac{1}{\\alpha} = 4\\alpha - 1 - \\frac{1}{\\alpha}$، ومنه $A = 4$!'
				}
			]
		},
		summary: {
			rulesAr: [
				'**إثبات المقارب المائل $(\\Delta): y = ax + b$**: نحسب الفرق $d(x) = f(x) - (ax + b)$، ثم نثبت أن $\\lim_{x \\to +\\infty} d(x) = 0$ (أو عند $-\\infty$). في الدوال الأسية واللوغاريتمية يظهر دوماً حدّ من التزايد المقارن مثل $\\frac{\\ln x}{x} \\to 0$ أو $x e^{-x} \\to 0$.',
				'**الوضعية النسبية بين $(C_f)$ و $(\\Delta)$**: ندرس إشارة $d(x) = f(x) - (ax + b)$:\n- $d(x) > 0 \\implies (C_f)$ فوق $(\\Delta)$.\n- $d(x) < 0 \\implies (C_f)$ تحت $(\\Delta)$.\n- $d(x) = 0 \\implies$ نقطة تقاطع $(C_f)$ و $(\\Delta)$.',
				'**مناقشة بيانية للمعادلة $f(x) = m$ و $f(x) = ax + m$**:\n- $f(x) = m$: نقط تقاطع $(C_f)$ مع المستقيم **الأفقي** $y = m$.\n- $f(x) = ax + m$: نقط تقاطع $(C_f)$ مع المستقيم **المائل الموازي لـ $(\\Delta)$** ذي المعادلة $y = ax + m$ (بمعامل توجيه $a$ ثابت!).'
			],
			visualSvg: svgFunctionCurvePlot({
				xMin: -2.5,
				xMax: 4,
				yMin: -4,
				yMax: 6,
				fn: (x) => x - 1 + Math.exp(-x),
				curveLabel: 'f(x)=x-1+e^(-x)',
				asymptotes: [{ kind: 'oblique', a: 1, b: -1, label: 'y = x - 1', color: '#059669' }],
				tangents: [{ x: 0, y: 0, slope: 0, halfSpan: 1.2, color: '#dc2626' }],
				points: [{ x: 0, y: 0, label: 'Min(0; 0)', color: '#dc2626' }]
			}),
			visualCaptionAr: 'منحنى الدالة $f(x) = x - 1 + e^{-x}$ يقع دائماً فوق مقاربه المائل $y = x - 1$ لأن $e^{-x} > 0$',
			examples: [
				{
					problemAr:
						'لتكن $f(x) = 2x - 3 + 4e^{-x}$ على $\\mathbb{R}$. أثبت أن $(\\Delta): y = 2x - 3$ مقارب مائل بجوار $+\\infty$ وحدد الوضعية النسبية.',
					solutionAr:
						'- لدينا $\\lim_{x \\to +\\infty} [f(x) - (2x - 3)] = \\lim_{x \\to +\\infty} 4e^{-x} = 0$، فالمستقيم $(\\Delta): y = 2x - 3$ مقارب مائل بجوار $+\\infty$.\n- بما أن $4e^{-x} > 0$ تماماً لكل $x \\in \\mathbb{R}$، فإن المنحنى $(C_f)$ يقع **دوماً فوق** $(\\Delta)$ على $\\mathbb{R}$.'
				},
				{
					problemAr:
						'في نفس المثال، اكتب معادلة المماس $(T)$ الموازي للمقارب $(\\Delta)$ إن وجد، أو عند $x_0 = \\ln 2$.',
					solutionAr:
						'نشتق: $f\'(x) = 2 - 4e^{-x}$.\n- نلاحظ أن $f\'(x) = 2 \\iff -4e^{-x} = 0$ مستحيل (لا يوجد مماس يوازي $(\\Delta)$).\n- عند $x_0 = \\ln 2$: $f(\\ln 2) = 2\\ln 2 - 3 + 4(\\frac{1}{2}) = 2\\ln 2 - 1$، و $f\'(\\ln 2) = 2 - 4(\\frac{1}{2}) = 0$ (مماس أفقي $y = 2\\ln 2 - 1$).'
				}
			],
			watchOutAr:
				'انتبه لجهة اللانهاية في المقارب المائل! الدالة $f(x) = x - 1 + e^{-x}$ تقبل $y = x - 1$ مقارباً مائلاً بجوار **$+\\infty$ فقط** (لأن $\\lim_{+\\infty} e^{-x} = 0$)، أما بجوار $-\\infty$ فإن $\\lim_{-\\infty} e^{-x} = +\\infty$ فلا يكون مقارباً بجوار $-\\infty$!'
		},
		practice: [
			{
				questionAr:
					'لتكن الدالة $f(x) = -x + 4 + (2x - 1)e^{-x}$ على $\\mathbb{R}$. ما هي معادلة المستقيم المقارب المائل للمنحنى $(C_f)$ بجوار $+\\infty$؟',
				options: ['$y = -x + 4$', '$y = 2x - 1$', '$y = x - 4$', '$x = 0$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! بالتزايد المقارن $\\lim_{x \\to +\\infty} (2x - 1)e^{-x} = 0$، إذن $\\lim_{x \\to +\\infty} [f(x) - (-x + 4)] = 0$.',
					'$(2x - 1)e^{-x}$ يؤول إلى $0$ عند $+\\infty$ وليس معادلة مقارب.',
					'عكست إشارتي المستقيم التآلفي $-x + 4$.',
					'الدالة معرفة على $\\mathbb{R}$ كله فلا تقبل مقارباً عمودياً عند $0$.'
				],
				explanationAr:
					'نكتب $f(x) - (-x + 4) = 2 x e^{-x} - e^{-x}$. عند $+\\infty$ تؤول كل من $x e^{-x}$ و $e^{-x}$ إلى $0$ بالتزايد المقارن، فالمستقيم $y = -x + 4$ مقارب مائل.'
			},
			{
				questionAr:
					'نعتبر $f(x) = 3x + 2 - \\frac{\\ln x}{x}$ على $]0; +\\infty[$. على أي مجال يقع المنحنى $(C_f)$ **تحت** المقارب المائل $(\\Delta): y = 3x + 2$؟',
				options: ['$]1 ; +\\infty[$', '$]0 ; 1[$', '$]0 ; e[$', '$]0 ; +\\infty[$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! الفرق هو $d(x) = -\\frac{\\ln x}{x}$؛ على $]1; +\\infty[$ يكون $\\ln x > 0$ فـ $d(x) < 0$ أي $(C_f)$ تحت $(\\Delta)$.',
					'على $]0; 1[$ لدينا $\\ln x < 0$ وبوجود الإشارة السالبة يصبح $d(x) > 0$ أي $(C_f)$ **فوق** $(\\Delta)$!',
					'ينعدم $\\ln x$ عند $x = 1$ وليس عند $x = e$.',
					'يتقاطع المنحنى والمقارب عند $x = 1$ فتتبدل الوضعية النسبية!'
				],
				explanationAr:
					'إشارة الفرق $f(x) - (3x + 2) = -\\frac{\\ln x}{x}$ هي عكس إشارة $\\ln x$: سالبة على $]1; +\\infty[$ (تحت) وموجبة على $]0; 1[$ (فوق).'
			},
			{
				questionAr:
					'إذا علمت أن $\\alpha$ يحقق المعادلة المساعدة $g(\\alpha) = \\alpha^2 - 3 + \\ln(\\alpha) = 0$، فما هي العبارة المبسطة لـ $f(\\alpha) = \\alpha + 1 + \\frac{2 - \\ln(\\alpha)}{\\alpha}$ دون $\\ln(\\alpha)$؟',
				options: [
					'$f(\\alpha) = 2\\alpha + 1 - \\frac{1}{\\alpha}$',
					'$f(\\alpha) = 2\\alpha + 1 + \\frac{1}{\\alpha}$',
					'$f(\\alpha) = \\alpha + 1 - \\frac{1}{\\alpha}$',
					'$f(\\alpha) = 2\\alpha + 1 + \\frac{5}{\\alpha}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! من $g(\\alpha) = 0$ نجد $\\ln(\\alpha) = 3 - \\alpha^2$، وبالتعويض: $2 - (3 - \\alpha^2) = \\alpha^2 - 1$، وبالقسمة على $\\alpha$ ينتج $\\alpha - \\frac{1}{\\alpha}$ ليصبح المجموع $2\\alpha + 1 - \\frac{1}{\\alpha}$.',
					'أخطأت في إشارة $2 - 3 = -1$ وليس $+1$.',
					'نسيت جمع $\\frac{\\alpha^2}{\\alpha} = \\alpha$ مع الحد الأول $\\alpha$.',
					'جمعت $2 + 3 = 5$ بدلاً من $2 - 3 = -1$ عند فتح القوسين.'
				],
				explanationAr:
					'نستخرج $\\ln(\\alpha) = 3 - \\alpha^2$ ونعوض في $f(\\alpha) = \\alpha + 1 + \\frac{2 - (3 - \\alpha^2)}{\\alpha} = \\alpha + 1 + \\alpha - \\frac{1}{\\alpha} = 2\\alpha + 1 - \\frac{1}{\\alpha}$.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// 4. Antiderivatives (Primitives) & Total Cost Recovery from Marginal Cost
	// ---------------------------------------------------------------------------
	{
		id: 'lesson_3as_ge_t2_primitives_antiderivatives',
		slug: '3as-ge-t2-primitives-antiderivatives',
		grade: '3as_ge',
		yearSubjectId: 749,
		trimesterId: 't2',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: الدوال الأصلية والحساب التكاملي وتطبيقاته الاقتصادية',
		order: 4,
		titleAr: 'الدوال الأصلية: القواعد، الأشكال المرجعية واستنتاج الكلفة الكلية من الكلفة الحدية',
		objectives: [
			'تعيين مجموعة الدوال الأصلية لدالة مستمرة على مجال باستعمال جدول الدوال الأصلية المألوفة',
			'التعرف على الأشكال المركبة الأساسية $u\' u^n$ و $u\' e^u$ و $\\frac{u\'}{u}$ لإيجاد دوالها الأصلية',
			'تعيين الدالة الأصلية الوحيدة $F$ التي تحقق شرطاً ابتدائياً $F(x_0) = y_0$ وتطبيقها لاستنتاج الكلفة الكلية $C_T(x)$ من الكلفة الحدية $C_m(x)$'
		],
		keywordsAr: [
			'الدالة الأصلية',
			'ثابت التكامل',
			'الشرط الابتدائي',
			'استنتاج الكلفة الكلية',
			'الأشكال المرجعية'
		],
		discover: {
			scenarioAr:
				'قُدّرت الكلفة الحدية الشهرية لمؤسسة صناعية (بآلاف الدنانير) بالعبارة $C_m(x) = 4 + 6e^{-x}$ من أجل $x \\in [0; 10]$، وتبلغ التكاليف الثابتة عند التوقف عن الإنتاج $C_T(0) = 20$ ألف دينار. بما أن $C_m(x) = C_T\'(x)$، كيف نسترجع عبارة دالة الكلفة الكلية $C_T(x)$؟',
			svg: svgFunctionCurvePlot({
				xMin: 0,
				xMax: 6,
				yMin: 0,
				yMax: 50,
				fn: (x) => 4 * x - 6 * Math.exp(-x) + 26,
				curveLabel: 'C_T(x)',
				points: [
					{ x: 0, y: 20, label: 'C_T(0)=20', color: '#dc2626' },
					{ x: 3, y: 38 - 6 * Math.exp(-3), label: 'x=3', color: '#15803d' }
				]
			}),
			steps: [
				{
					promptAr:
						'عيّن الدوال الأصلية للدالة $C_m(x) = 4 + 6e^{-x}$ على الشكل $C_T(x) = 4x + k e^{-x} + C$. ما قيمة المعامل $k$؟',
					hintAr: 'مشتق $e^{-x}$ هو $-e^{-x}$، إذن دالة أصلية لـ $6e^{-x}$ هي $-6e^{-x}$.',
					expectedInput: '-6',
					revealAr:
						'الدالة الأصلية لـ $4$ هي $4x$، والدالة الأصلية لـ $6e^{-x}$ هي $-6e^{-x}$، ومنه $C_T(x) = 4x - 6e^{-x} + C$ أي $k = -6$.'
				},
				{
					promptAr:
						'استعمل شرط التكاليف الثابتة $C_T(0) = 20$ لإيجاد ثابت التكامل $C$.',
					hintAr: 'عوض $x = 0$ في $4x - 6e^{-x} + C = 20$ وتذكر أن $e^0 = 1$.',
					expectedInput: '26',
					revealAr:
						'لدينا $C_T(0) = 0 - 6(1) + C = 20 \\implies C = 26$، فتكون عبارة الكلفة الكلية الوحيدة هي $C_T(x) = 4x - 6e^{-x} + 26$.'
				},
				{
					promptAr:
						'لتكن الدالة $g(x) = \\frac{2x}{x^2 + 3}$ المعرفة على $\\mathbb{R}$. نلاحظ أنها من الشكل $\\frac{u\'(x)}{u(x)}$. ما هي قيمة الدالة الأصلية $G(1)$ التي تنعدم عند $0$ ($G(0) = 0$)؟ إذا كانت $G(1) = \\ln(a) - \\ln(3)$ فما قيمة $a$؟',
					hintAr: 'دالة أصلية لـ $\\frac{u\'}{u}$ (حيث $u > 0$) هي $\\ln(u(x)) + C$. عوض $x=0$ ثم $x=1$.',
					expectedInput: '4',
					revealAr:
						'الدالة الأصلية لـ $g$ هي $G(x) = \\ln(x^2 + 3) + C$. من $G(0) = 0$ نجد $C = -\\ln(3)$، ومنه $G(1) = \\ln(4) - \\ln(3)$ أي $a = 4$.'
				},
				{
					promptAr: 'ما هو معامل $x^3$ في الدالة الأصلية للدالة $p(x) = 9x^2 - 4x + 5$؟',
					hintAr: 'تذكر أن دالة أصلية لـ $x^2$ هي $\\frac{x^3}{3}$.',
					expectedInput: '3',
					revealAr: 'لدينا $9 \\times \\frac{x^3}{3} = 3x^3$، فمعامل $x^3$ هو $3$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**تعريف الدالة الأصلية**: نقول إن $F$ دالة أصلية للدالة $f$ على مجال $I$ إذا كانت $F$ قابلة للاشتقاق على $I$ وتحقق $F\'(x) = f(x)$ لكل $x \\in I$. جميع الدوال الأصلية لـ $f$ على $I$ هي من الشكل $F(x) + C$ ($C \\in \\mathbb{R}$). وتوجد دالة أصلية **وحيدة** تحقق الشرط $F(x_0) = y_0$.',
				'**جدول الدوال الأصلية المألوفة والأشكال المركبة**:\n- $x^n \\mapsto \\frac{x^{n+1}}{n+1}$ ($n \\ne -1$) و $u\' u^n \\mapsto \\frac{u^{n+1}}{n+1}$.\n- $\\frac{1}{x^2} \\mapsto -\\frac{1}{x}$ و $\\frac{1}{2\\sqrt{x}} \\mapsto \\sqrt{x}$.\n- $e^{ax+b} \\mapsto \\frac{1}{a}e^{ax+b}$ ($a \\ne 0$) و $u\' e^u \\mapsto e^u$.\n- $\\frac{1}{x} \\mapsto \\ln(x)$ (على $]0; +\\infty[$) و $\\frac{u\'}{u} \\mapsto \\ln(u)$ (حيث $u(x) > 0$).',
				'**التطبيق الاقتصادي**: بما أن الكلفة الحدية هي مشتقة الكلفة الكلية $C_m(x) = C_T\'(x)$، فإن $C_T(x)$ هي الدالة الأصلية الوحيدة لـ $C_m(x)$ التي تحقق شرط التكاليف الثابتة $C_T(0) = C_0$.'
			],
			visualSvg: svgFunctionCurvePlot({
				xMin: -2,
				xMax: 2.5,
				yMin: -2,
				yMax: 7,
				fn: (x) => x * x + 1,
				curveLabel: 'F(x) = x² + C',
				asymptotes: [{ kind: 'oblique', a: 0, b: 3, label: 'C = 3', color: '#059669' }],
				points: [
					{ x: 0, y: 1, label: 'F1(0)=1', color: '#1d4ed8' },
					{ x: 0, y: 3, label: 'F2(0)=3', color: '#059669' }
				]
			}),
			visualCaptionAr: 'عائلة الدوال الأصلية تختلف بثابت مضاف $C$ يُحدَّد بالشرط الابتدائي $F(x_0) = y_0$',
			examples: [
				{
					problemAr:
						'تحقّق أن الدالة $F(x) = (x + 2)e^{-x}$ هي دالة أصلية للدالة $f(x) = (-x - 1)e^{-x}$ على $\\mathbb{R}$.',
					solutionAr:
						'نشتق الدالة $F$ كجداء دالتين: $F\'(x) = 1\\cdot e^{-x} + (x + 2)(-e^{-x}) = (1 - x - 2)e^{-x} = (-x - 1)e^{-x} = f(x)$ لكل $x \\in \\mathbb{R}$، فـ $F$ دالة أصلية لـ $f$.'
				},
				{
					problemAr:
						'عيّن الدالة الأصلية $H$ للدالة $h(x) = \\frac{3}{x} + 2e^{2x}$ على $]0; +\\infty[$ التي تحقق $H(1) = e^2$.',
					solutionAr:
						'- الدوال الأصلية لـ $h$ على $]0; +\\infty[$ هي $H(x) = 3\\ln(x) + e^{2x} + C$.\n- الشرط الابتدائي: $H(1) = 3\\ln(1) + e^2 + C = e^2 \\implies C = 0$.\n- إذن $H(x) = 3\\ln(x) + e^{2x}$.'
				}
			],
			watchOutAr:
				'احذر عند إيجاد دالة أصلية لـ $e^{ax}$ أن تضرب في $a$ بدلاً من القسمة على $a$! دالة أصلية لـ $e^{3x}$ هي $\\frac{1}{3}e^{3x}$ (تحقق دائماً بالاشتقاق العكسي: إذا اشتققت نتيجتك ولم تعد لنفس الدالة الأصلية فراجِع المعامل!).'
		},
		practice: [
			{
				questionAr: 'أيٌّ مما يلي يمثّل دالة أصلية للدالة $f(x) = 6e^{2x} + \\frac{4}{x}$ على المجال $]0; +\\infty[$؟',
				options: [
					'$F(x) = 3e^{2x} + 4\\ln(x)$',
					'$F(x) = 12e^{2x} + 4\\ln(x)$',
					'$F(x) = 3e^{2x} - \\frac{4}{x^2}$',
					'$F(x) = 6e^{2x} + 4\\ln(x)$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! باشتقاق $3e^{2x} + 4\\ln(x)$ نجد $3(2e^{2x}) + \\frac{4}{x} = 6e^{2x} + \\frac{4}{x} = f(x)$.',
					'ضربت في $2$ بدل القسمة على $2$ عند مكاملة $e^{2x}$!',
					'خلطت بين مشتقة $\\frac{4}{x}$ (وهي $-\\frac{4}{x^2}$) ودالتها الأصلية (وهي $4\\ln x$).',
					'نسيت القسمة على معامل الأس $2$ في دالة $6e^{2x}$.'
				],
				explanationAr:
					'دالة أصلية لـ $e^{2x}$ هي $\\frac{1}{2}e^{2x}$ فيكون $6 \\times \\frac{1}{2}e^{2x} = 3e^{2x}$، ودالة أصلية لـ $\\frac{4}{x}$ على $]0; +\\infty[$ هي $4\\ln(x)$.'
			},
			{
				questionAr:
					'تُعطى الكلفة الحدية لمصنع بـ $C_m(x) = 3x^2 - 4x + 10$ (بآلاف الدنانير)، وتبلغ التكاليف الثابتة $C_T(0) = 50$. ما هي عبارة الكلفة الكلية $C_T(x)$؟',
				options: [
					'$C_T(x) = x^3 - 2x^2 + 10x + 50$',
					'$C_T(x) = x^3 - 2x^2 + 10x$',
					'$C_T(x) = 6x - 4 + 50$',
					'$C_T(x) = x^3 - 4x^2 + 10x + 50$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! نكامل $3x^2 - 4x + 10$ فنجد $x^3 - 2x^2 + 10x + C$، ومن $C_T(0) = 50$ نجد $C = 50$.',
					'نسيت إضافة التكاليف الثابتة $C_T(0) = 50$ كثابت تكامل!',
					'اشتققت $C_m(x)$ بدلاً من إيجاد دالتها الأصلية!',
					'نسيت القسمة على $2$ في دالة $-4x$ الأصلية (وهي $-2x^2$).'
				],
				explanationAr:
					'الدوال الأصلية لـ $C_m(x)$ هي $x^3 - 2x^2 + 10x + C$. الشرط $C_T(0) = 50$ يعطي $C = 50$.'
			},
			{
				questionAr:
					'ما هي الدالة الأصلية الوحيدة $F$ للدالة $f(x) = \\frac{4x + 2}{x^2 + x + 1}$ على $\\mathbb{R}$ التي تحقق $F(0) = 3$؟',
				options: [
					'$F(x) = 2\\ln(x^2 + x + 1) + 3$',
					'$F(x) = \\ln(x^2 + x + 1) + 3$',
					'$F(x) = 2\\ln(x^2 + x + 1)$',
					'$F(x) = \\frac{1}{2}\\ln(x^2 + x + 1) + 3$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! نلاحظ أن $4x + 2 = 2(2x + 1) = 2 u\'(x)$، فالدالة الأصلية هي $2\\ln(x^2 + x + 1) + C$، ومن $F(0) = 3$ نجد $C = 3$.',
					'نسيت المعامل $2$ في البسط $4x + 2 = 2(2x + 1)$.',
					'نسيت الشرط الابتدائي $F(0) = 3$.',
					'معامل $u\'$ هو $2$ وليس $\\frac{1}{2}$.'
				],
				explanationAr:
					'نكتب $f(x) = 2 \\cdot \\frac{2x + 1}{x^2 + x + 1}$، ومنه $F(x) = 2\\ln(x^2 + x + 1) + C$. وبما أن $F(0) = 2\\ln(1) + C = 3$ فإن $C = 3$.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// 5. Definite Integral, Area in cm² & Mean Value m = 1/(b-a) ∫ f(x)dx
	// ---------------------------------------------------------------------------
	{
		id: 'lesson_3as_ge_t2_definite_integral_area_mean',
		slug: '3as-ge-t2-definite-integral-area-mean',
		grade: '3as_ge',
		yearSubjectId: 749,
		trimesterId: 't2',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: الدوال الأصلية والحساب التكاملي وتطبيقاته الاقتصادية',
		order: 5,
		titleAr: 'التكامل المحدود، حساب المساحات والقيمة المتوسطة للدالة $m = \\frac{1}{b-a}\\int_a^b f(x)\\,dx$',
		objectives: [
			'حساب التكامل المحدود $\\int_a^b f(x)\\,dx = F(b) - F(a)$ وتوظيف الخطية وعلاقة شال والحصر',
			'حساب مساحة حيز مستوٍ محدد بمنحنى دالة ومحور الفواصل أو مقارب مائل بوحدة المساحة $(\\text{u.a})$ ثم بـ $\\text{cm}^2$',
			'حساب القيمة المتوسطة للدالة $m = \\frac{1}{b - a}\\int_a^b f(x)\\,dx$ وتفسيرها الاقتصادي (متوسط الكلفة أو الإيراد أو الإنتاج خلال فترة)'
		],
		keywordsAr: [
			'التكامل المحدود',
			'علاقة شال',
			'مساحة حيز مستو',
			'القيمة المتوسطة للدالة',
			'وحدة المساحة'
		],
		discover: {
			scenarioAr:
				'في مستوٍ منسوب إلى معلم متعامد ومتجانس حيث $\\|\\vec{i}\\| = \\|\\vec{j}\\| = 2\\,\\text{cm}$ ($1\\,\\text{u.a} = 4\\,\\text{cm}^2$)، تُنمذج وتيرة الإنتاج في مصنع خلال المدة الزمنية $[0; 2]$ بالدالة $f(x) = 4e^{-x} + 2$. نريد حساب التكامل $I = \\int_0^2 f(x)\\,dx$، واستنتاج المساحة المظللة بـ $\\text{cm}^2$، ثم حساب القيمة المتوسطة $m = \\frac{1}{2 - 0}\\int_0^2 f(x)\\,dx$.',
			svg: svgFunctionCurvePlot({
				xMin: -0.4,
				xMax: 2.6,
				yMin: -0.4,
				yMax: 6.8,
				fn: (x) => 4 * Math.exp(-x) + 2,
				curveLabel: 'f(x)=4e^(-x)+2',
				shadedIntegral: { a: 0, b: 2, color: 'rgba(37,99,235,0.22)' },
				asymptotes: [
					{
						kind: 'horizontal',
						value: 4 - 2 * Math.exp(-2),
						label: 'y = m',
						color: '#dc2626'
					}
				],
				points: [
					{ x: 0, y: 6, label: 'A(0; 6)', color: '#15803d' },
					{ x: 2, y: 2 + 4 * Math.exp(-2), label: 'B(2; f(2))', color: '#1d4ed8' }
				]
			}),
			steps: [
				{
					promptAr:
						'احسب التكامل $I = \\int_0^2 (4e^{-x} + 2)\\,dx = [-4e^{-x} + 2x]_0^2$. إذا كتبنا $I = A - 4e^{-2}$ فما قيمة العدد الطبيعي $A$؟',
					hintAr: 'عوض $x = 2$ و $x = 0$: $(-4e^{-2} + 4) - (-4e^0 + 0)$. انتبه لإشارة $-(-4)$.',
					expectedInput: '8',
					revealAr:
						'لدينا $I = (-4e^{-2} + 4) - (-4 + 0) = 8 - 4e^{-2}\\,\\text{u.a}$، ومنه $A = 8$.'
				},
				{
					promptAr:
						'بما أن $f(x) > 0$ على $[0; 2]$ ووحدة المساحة $1\\,\\text{u.a} = 2\\,\\text{cm} \\times 2\\,\\text{cm} = 4\\,\\text{cm}^2$، ما قيمة الثابت $B$ في عبارة المساحة $\\mathcal{A} = (B - 16e^{-2})\\,\\text{cm}^2$؟',
					hintAr: 'اضرب $I = 8 - 4e^{-2}$ في $4\\,\\text{cm}^2$.',
					expectedInput: '32',
					revealAr: 'المساحة بـ $\\text{cm}^2$ هي $\\mathcal{A} = 4(8 - 4e^{-2}) = (32 - 16e^{-2})\\,\\text{cm}^2$، أي $B = 32$.'
				},
				{
					promptAr:
						'احسب القيمة المتوسطة للدالة $f$ على المجال $[0; 2]$ بالعلاقة $m = \\frac{1}{2 - 0}\\int_0^2 f(x)\\,dx = k - 2e^{-2}$. ما قيمة $k$؟',
					hintAr: 'اقسم $I = 8 - 4e^{-2}$ على طول المجال $b - a = 2$.',
					expectedInput: '4',
					revealAr:
						'القيمة المتوسطة هي $m = \\frac{8 - 4e^{-2}}{2} = 4 - 2e^{-2} \\approx 3.73$. اقتصادياً، هذا يمثل معدل الإنتاج الثابت المكافئ على الفترة $[0; 2]$.'
				},
				{
					promptAr:
						'باستعمال علاقة شال وفك القيمة المطلقة عند $x = 1$، احسب القيمة المضبوطة للتكامل $J = \\int_0^3 |2x - 2|\\,dx$.',
					hintAr: 'احسب $\\int_0^1 (2 - 2x)\\,dx + \\int_1^3 (2x - 2)\\,dx$.',
					expectedInput: '5',
					revealAr:
						'نجد $\\int_0^1 (2 - 2x)\\,dx = [2x - x^2]_0^1 = 1$، و $\\int_1^3 (2x - 2)\\,dx = [x^2 - 2x]_1^3 = (9 - 6) - (1 - 2) = 4$، فالمجموع $J = 1 + 4 = 5$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**التكامل المحدود وخواصه**: إذا كانت $F$ دالة أصلية لدالة مستمرة $f$ على $I$، فإن:\n$$\\int_a^b f(x)\\,dx = [F(x)]_a^b = F(b) - F(a)$$\n- **الخطية**: $\\int_a^b (\\alpha f(x) + \\beta g(x))\\,dx = \\alpha \\int_a^b f(x)\\,dx + \\beta \\int_a^b g(x)\\,dx$.\n- **علاقة شال**: $\\int_a^c f(x)\\,dx + \\int_c^b f(x)\\,dx = \\int_a^b f(x)\\,dx$.',
				'**حساب المساحة المستوية**: في معلم متعامد، وحدة المساحة $1\\,\\text{u.a} = \\|\\vec{i}\\| \\cdot \\|\\vec{j}\\|$:\n- مساحة الحيز المحصور بين $(C_f)$ ومحور الفواصل والمستقيمين $x = a$ و $x = b$ ($a < b$) هي $\\mathcal{A} = \\left(\\int_a^b |f(x)|\\,dx\\right)\\,\\text{u.a}$.\n- مساحة الحيز المحصور بين $(C_f)$ والمستقيم المقارب $(\\Delta): y = \\alpha x + \\beta$ على $[a; b]$ هي $\\mathcal{A} = \\left(\\int_a^b |f(x) - (\\alpha x + \\beta)|\\,dx\\right) \\cdot \\|\\vec{i}\\|\\|\\vec{j}\\|\\,\\text{cm}^2$.',
				'**القيمة المتوسطة للدالة على $[a; b]$** ($a < b$):\n$$m = \\frac{1}{b - a}\\int_a^b f(x)\\,dx$$\nوهي تحقق الحصر: إذا كان $\\mu \\le f(x) \\le M$ على $[a; b]$ فإن $\\mu \\le m \\le M$ و $\\mu(b - a) \\le \\int_a^b f(x)\\,dx \\le M(b - a)$.'
			],
			visualSvg: svgFunctionCurvePlot({
				xMin: 0.4,
				xMax: 3.5,
				yMin: -0.4,
				yMax: 2,
				fn: (x) => (x > 0.1 ? 1 / x : NaN),
				curveLabel: 'y = 1/x',
				shadedIntegral: { a: 1, b: Math.E, color: 'rgba(16,185,129,0.24)' },
				points: [
					{ x: 1, y: 1, label: '(1; 1)', color: '#15803d' },
					{ x: Math.E, y: 1 / Math.E, label: '(e; 1/e)', color: '#1d4ed8' }
				]
			}),
			visualCaptionAr: 'المساحة تحت منحنى $y = \\frac{1}{x}$ على $[1; e]$ تساوي $\\int_1^e \\frac{1}{x}\\,dx = [\\ln x]_1^e = 1\\,\\text{u.a}$',
			examples: [
				{
					problemAr:
						'لتكن $f(x) = 2x + 1 + \\frac{4}{x}$ على $]0; +\\infty[$. احسب بـ $\\text{cm}^2$ مساحة الحيز المحصور بين $(C_f)$ ومقاربه المائل $(\\Delta): y = 2x + 1$ والمستقيمين $x = 1$ و $x = e^2$ (حيث $\\|\\vec{i}\\| = \\|\\vec{j}\\| = 2\\,\\text{cm}$).',
					solutionAr:
						'- على $[1; e^2]$ لدينا $f(x) - (2x + 1) = \\frac{4}{x} > 0$، فالمساحة بوحدة المساحة هي:\n$$\\int_1^{e^2} \\frac{4}{x}\\,dx = [4\\ln(x)]_1^{e^2} = 4\\ln(e^2) - 4\\ln(1) = 4(2) - 0 = 8\\,\\text{u.a}$$\n- التحويل إلى $\\text{cm}^2$: وحدة المساحة $1\\,\\text{u.a} = 2 \\times 2 = 4\\,\\text{cm}^2$، إذن $\\mathcal{A} = 8 \\times 4 = 32\\,\\text{cm}^2$.'
				},
				{
					problemAr:
						'تُعطى الكلفة الحدية اليومية بالعبارة $C_m(x) = 3x^2 + 4$ من أجل $x \\in [1; 3]$. احسب القيمة المتوسطة للكلفة الحدية على المجال $[1; 3]$.',
					solutionAr:
						'$$m = \\frac{1}{3 - 1}\\int_1^3 (3x^2 + 4)\\,dx = \\frac{1}{2}[x^3 + 4x]_1^3 = \\frac{1}{2}((27 + 12) - (1 + 4)) = \\frac{34}{2} = 17$$'
				}
			],
			watchOutAr:
				'احذر ثلاثة أخطاء شائعة في الحساب التكاملي: (1) نسيان قيمة $e^0 = 1$ عند التعويض بالحد الأدنى $x = 0$! (2) نسيان علامة الفرق الصحيحة في المساحات (إذا كان المنحنى $(C_f)$ **تحت** المقارب $(\\Delta)$ على $[a; b]$ نكامل $(\\alpha x + \\beta) - f(x)$ حتى تكون المساحة موجبة). (3) نسيان القسمة على $(b - a)$ عند حساب القيمة المتوسطة $m$.'
		},
		practice: [
			{
				questionAr: 'ما هي القيمة المتوسطة $m$ للدالة $f(x) = 6e^{2x} + 4$ على المجال $[0 ; 1]$؟',
				options: [
					'$m = 3e^2 + 1$',
					'$m = 3e^2 + 4$',
					'$m = 6e^2 + 4$',
					'$m = 3e^2 - 3$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! دالة أصلية هي $F(x) = 3e^{2x} + 4x$، ومنه $F(1) - F(0) = (3e^2 + 4) - (3 + 0) = 3e^2 + 1$، وبالقسمة على $1 - 0 = 1$ يبقى $3e^2 + 1$.',
					'نسيت طرح قيمة الدالة الأصلية عند الصفر: $F(0) = 3e^0 = 3 \\ne 0$!',
					'نسيت القسمة على $2$ عند مكاملة $6e^{2x}$ وأهملت $F(0)$.',
					'انتبه لإشارة $4 - 3 = +1$ وليس $-3$.'
				],
				explanationAr:
					'القيمة المتوسطة على $[0; 1]$ هي $m = \\frac{1}{1 - 0}[3e^{2x} + 4x]_0^1 = (3e^2 + 4) - (3 + 0) = 3e^2 + 1$.'
			},
			{
				questionAr:
					'في معلم متعامد حيث $\\|\\vec{i}\\| = 2\\,\\text{cm}$ و $\\|\\vec{j}\\| = 3\\,\\text{cm}$، إذا كانت المساحة المحصورة تحت منحنى دالة موجبة على $[1; e]$ تساوي $\\int_1^e \\frac{5}{x}\\,dx = 5\\,\\text{u.a}$، فكم تساوي بالسنتيمتر المربع $(\\text{cm}^2)$؟',
				options: ['$30\\,\\text{cm}^2$', '$5\\,\\text{cm}^2$', '$25\\,\\text{cm}^2$', '$10\\,\\text{cm}^2$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! وحدة المساحة هي $1\\,\\text{u.a} = \\|\\vec{i}\\| \\times \\|\\vec{j}\\| = 2 \\times 3 = 6\\,\\text{cm}^2$، ومنه $\\mathcal{A} = 5 \\times 6 = 30\\,\\text{cm}^2$.',
					'$5$ هي المساحة بوحدة المساحة (u.a)، نسيت الضرب في $\\|\\vec{i}\\|\\|\\vec{j}\\| = 6$!',
					'المعلم متعامد وليس متجانساً: وحدتا الطول $2$ و $3$ مختلفتان.',
					'ضربت في $\\|\\vec{i}\\| = 2$ فقط وأهملت $\\|\\vec{j}\\| = 3$.'
				],
				explanationAr:
					'وحدة المساحة هي $1\\,\\text{u.a} = 2 \\times 3 = 6\\,\\text{cm}^2$، وبالتالي المساحة تساوي $5 \\times 6 = 30\\,\\text{cm}^2$.'
			},
			{
				questionAr: 'احسب القيمة المضبوطة للتكامل المحدود $I = \\int_1^e \\frac{3x + 2}{x}\\,dx$:',
				options: ['$3e - 1$', '$3e + 2$', '$3e - 3$', '$3e + 1$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! نفكك الكسر $\\frac{3x + 2}{x} = 3 + \\frac{2}{x}$، فالدالة الأصلية $3x + 2\\ln x$ تعطي $(3e + 2) - (3 + 0) = 3e - 1$.',
					'نسيت طرح قيمة الدالة الأصلية عند $x = 1$: $3(1) + 2\\ln(1) = 3$!',
					'نسيت قيمة $2\\ln(e) = 2$ عند التعويض في الحد الأعلى $e$.',
					'تحقق من الطرح: $+2 - 3 = -1$ وليس $+1$.'
				],
				explanationAr:
					'نبسط الكسر أولاً: $\\int_1^e (3 + \\frac{2}{x})\\,dx = [3x + 2\\ln(x)]_1^e = (3e + 2) - (3 + 0) = 3e - 1$.'
			}
		]
	}
];
