import type { InteractiveLessonData } from '../../types';
import { adaptLessonForTrack } from '../../types';
import { SHARED_LESSONS_2AS_T1 } from '../../secondary_shared_2as/lessons/t1';

// ============================================================================
// SVG Visual Helpers for 2AS TM Trimester 1
// ============================================================================

const svgHornerSchemeVisual = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 210" width="460" height="210" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">
  <rect x="10" y="10" width="440" height="190" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="230" y="32" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">مخطط خوارزمية هورنر لتحليل P(x) = 2x³ - 3x² - 11x + 6 بالجذر α = 3</text>
  
  <!-- Table Header -->
  <rect x="30" y="46" width="400" height="32" fill="#1e293b" rx="4"/>
  <text x="75" y="67" text-anchor="middle" font-size="12" font-weight="bold" fill="#38bdf8">الجذر α</text>
  <line x1="120" y1="46" x2="120" y2="78" stroke="#475569" stroke-width="1.5"/>
  <text x="160" y="67" text-anchor="middle" font-size="12" font-weight="bold" fill="#f8fafc">معامل x³ (2)</text>
  <text x="240" y="67" text-anchor="middle" font-size="12" font-weight="bold" fill="#f8fafc">معامل x² (-3)</text>
  <text x="320" y="67" text-anchor="middle" font-size="12" font-weight="bold" fill="#f8fafc">معامل x (-11)</text>
  <text x="395" y="67" text-anchor="middle" font-size="12" font-weight="bold" fill="#f8fafc">الثابت (6)</text>
  
  <!-- Multipliers Row -->
  <rect x="30" y="82" width="400" height="32" fill="#f1f5f9"/>
  <text x="75" y="103" text-anchor="middle" font-size="13" font-weight="bold" fill="#d97706">α = 3</text>
  <line x1="120" y1="82" x2="120" y2="114" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="160" y="103" text-anchor="middle" font-size="12" fill="#94a3b8">—</text>
  <text x="240" y="103" text-anchor="middle" font-size="12" font-weight="bold" fill="#2563eb">+6 (3×2)</text>
  <text x="320" y="103" text-anchor="middle" font-size="12" font-weight="bold" fill="#2563eb">+9 (3×3)</text>
  <text x="395" y="103" text-anchor="middle" font-size="12" font-weight="bold" fill="#2563eb">-6 (3×(-2))</text>
  
  <!-- Divider -->
  <line x1="30" y1="116" x2="430" y2="116" stroke="#0284c7" stroke-width="2"/>
  
  <!-- Results Row -->
  <rect x="30" y="118" width="400" height="36" fill="#e0f2fe"/>
  <text x="75" y="141" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1">المعاملات الناتجة</text>
  <line x1="120" y1="118" x2="120" y2="154" stroke="#93c5fd" stroke-width="1.5"/>
  <circle cx="160" cy="136" r="14" fill="#1d4ed8"/>
  <text x="160" y="141" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff">2</text>
  <circle cx="240" cy="136" r="14" fill="#1d4ed8"/>
  <text x="240" y="141" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff">3</text>
  <circle cx="320" cy="136" r="14" fill="#1d4ed8"/>
  <text x="320" y="141" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff">-2</text>
  <circle cx="395" cy="136" r="14" fill="#16a34a"/>
  <text x="395" y="141" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff">0</text>
  
  <text x="230" y="180" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">الحاصل: Q(x) = 2x² + 3x - 2 والباقي R = 0 ⇐ P(x) = (x - 3)(2x² + 3x - 2)</text>
</svg>`;

const svgOptimizationCurve = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 230" width="420" height="230" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">
  <rect x="10" y="10" width="400" height="210" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <!-- Axes -->
  <line x1="50" y1="190" x2="390" y2="190" stroke="#334155" stroke-width="1.8"/>
  <polyline points="384,186 392,190 384,194" fill="none" stroke="#334155" stroke-width="1.8"/>
  <text x="385" y="206" font-size="11" font-weight="bold" fill="#334155">x (الإنتاج)</text>
  <line x1="60" y1="200" x2="60" y2="25" stroke="#334155" stroke-width="1.8"/>
  <polyline points="56,31 60,23 64,31" fill="none" stroke="#334155" stroke-width="1.8"/>
  <text x="35" y="32" font-size="11" font-weight="bold" fill="#334155">C_m(x)</text>

  <!-- Asymptote y = x -->
  <line x1="60" y1="190" x2="350" y2="40" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4"/>
  <text x="340" y="35" font-size="10.5" font-weight="bold" fill="#64748b">المقارب المائل y = x</text>

  <!-- Curve f(x) = x + 100/x -->
  <path d="M 80,35 Q 110,135 150,115 T 200,105 Q 260,102 360,65" fill="none" stroke="#2563eb" stroke-width="2.6"/>

  <!-- Extrema Point at x=10, y=20 (px=200, py=105) -->
  <line x1="160" y1="105" x2="240" y2="105" stroke="#dc2626" stroke-width="2"/>
  <circle cx="200" cy="105" r="4.5" fill="#dc2626"/>
  <!-- Projections -->
  <line x1="200" y1="105" x2="200" y2="190" stroke="#dc2626" stroke-width="1.2" stroke-dasharray="3,3"/>
  <text x="200" y="204" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">x = 10</text>
  <line x1="60" y1="105" x2="200" y2="105" stroke="#dc2626" stroke-width="1.2" stroke-dasharray="3,3"/>
  <text x="45" y="109" text-anchor="end" font-size="11" font-weight="bold" fill="#dc2626">20</text>

  <!-- Label badge -->
  <rect x="180" y="60" width="170" height="24" rx="4" fill="#eff6ff" stroke="#bfdbfe"/>
  <text x="265" y="76" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">قيمة صغرى مطلقة: f(10) = 20</text>
</svg>`;

function cleanMathInString(str: string): string {
	return str
		.replace(/\\text\{مساحة\}/g, '\\operatorname{Area}')
		.replace(/\\text\{عدد الحدود\}/g, '\\text{terms}')
		.replace(/\\text\{الحد الأول\}/g, 'u_{\\text{first}}')
		.replace(/\\text\{الحد الأخير\}/g, 'u_{\\text{last}}')
		.replace(/\\text\{الحد الأول للمجموع\}/g, 'u_{\\text{first}}')
		.replace(/\\quad \\text\{و\} \\quad/g, ',\\quad ')
		.replace(/\\text\{و\}/g, '\\text{and}');
}

function deepClean<T>(obj: T): T {
	if (typeof obj === 'string') return cleanMathInString(obj) as unknown as T;
	if (Array.isArray(obj)) return obj.map(deepClean) as unknown as T;
	if (obj && typeof obj === 'object') {
		const res: any = {};
		for (const [k, v] of Object.entries(obj as Record<string, any>)) {
			res[k] = k === 'svg' || k === 'visualSvg' ? v : deepClean(v);
		}
		return res;
	}
	return obj;
}

// Helper for shared core adaptation
function adaptShared(
	sharedLesson: InteractiveLessonData,
	exactTail: string,
	override: {
		order: number;
		sequenceId: string;
		sequenceTitleAr: string;
		titleAr: string;
		objectives: string[];
		keywordsAr: string[];
	}
): InteractiveLessonData {
	const adapted = adaptLessonForTrack(sharedLesson, '2as_tm', exactTail);
	const cleaned = deepClean(adapted);
	return {
		...cleaned,
		id: `lesson_2as_tm_${exactTail}`,
		slug: `2as-tm-${exactTail.replace(/_/g, '-')}`,
		order: override.order,
		sequenceId: override.sequenceId,
		sequenceTitleAr: override.sequenceTitleAr,
		titleAr: override.titleAr,
		objectives: override.objectives,
		keywordsAr: override.keywordsAr
	};
}

// ============================================================================
// LESSONS 2AS TM - TRIMESTER 1 (7 Lessons)
// ============================================================================

export const LESSONS_2AS_TM_T1: InteractiveLessonData[] = [
	// [1] lesson_2as_tm_t1_functions_operations_composition
	adaptShared(
		SHARED_LESSONS_2AS_T1[0],
		't1_functions_operations_composition',
		{
			order: 1,
			sequenceId: 'seq1',
			sequenceTitleAr: 'المقطع الأول: الدوال العددية وكثيرات الحدود وقابلية القسمة',
			titleAr: 'عموميات على الدوال: العمليات، تركيب الدوال، وتفكيك دالة ودراسة التناظر',
			objectives: [
				'تعيين مجموعة تعريف دوال ناتجة عن العمليات الجبرية ومركب دالتين f o g بدقة',
				'تفكيك دالة عددية باستعمال الدوال المرجعية المألوفة (التآلفية، المربع، المقلوب، الجذر التربيعي)',
				'دراسة اتجاه تغير مركب دالتين وتحديد جهة تغير دوال مركبة وتشكيل جدول التغيرات',
				'استنتاج المنحنيات البيانية بواسطة التحويلات النقطية (الانسحاب) وإثبات محاور ومراكز التناظر'
			],
			keywordsAr: [
				'العمليات على الدوال',
				'تركيب الدوال',
				'تفكيك دالة',
				'اتجاه التغير',
				'محور التناظر',
				'مركز التناظر'
			]
		}
	),

	// [2] lesson_2as_tm_t1_polynomials_divisibility_roots_factoring (STREAM EXCLUSIVE)
	{
		id: 'lesson_2as_tm_t1_polynomials_divisibility_roots_factoring',
		slug: '2as-tm-t1-polynomials-divisibility-roots-factoring',
		grade: '2as_tm',
		yearSubjectId: 712,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: الدوال العددية وكثيرات الحدود وقابلية القسمة',
		order: 2,
		titleAr: 'كثيرات الحدود: خوارزمية هورنر، القسمة الإقليدية، الجذور والتحليل وحل المعادلات والمتراجحات',
		objectives: [
			'تحديد درجة كثير حدود وتساوي كثيري حدود وتعيين المعاملات بطريقة المطابقة',
			'توظيف مبرهنة قابلية قسمة كثير حدود على (x - a) وتعيين الجذر الظاهر لكثير حدود من الدرجة الثالثة',
			'إجراء القسمة الإقليدية لكثيرات الحدود وتطبيق خوارزمية هورنر (Horner) للتحليل السريع',
			'حل معادلات ومتراجحات من الدرجتين 2 و 3 باستعمال التحليل ودراسة الإشارة، وحل المعادلات مضاعفة التربيع'
		],
		keywordsAr: [
			'كثيرات الحدود',
			'خوارزمية هورنر',
			'القسمة الإقليدية لكثيرات الحدود',
			'الجذر الظاهر',
			'المعادلات مضاعفة التربيع',
			'المطابقة'
		],
		discover: {
			scenarioAr:
				'نعتبر كثير الحدود من الدرجة الثالثة المعرف على $\\mathbb{R}$ بالعبارة $P(x) = 2x^3 - 3x^2 - 11x + 6$. نريد إيجاد جذر ظاهر لهذا الكثير حدود، ثم تحليله إلى جداء كثير حدود من الدرجة الأولى وكثير حدود من الدرجة الثانية باستخدام خوارزمية هورنر السريعة، وأخيراً حل المعادلة $P(x) = 0$ والمتراجحة $P(x) \\le 0$.',
			svg: svgHornerSchemeVisual,
			steps: [
				{
					promptAr: 'احسب قيمة $P(3)$ للتحقق مما إذا كان العدد $3$ جذراً لكثير الحدود $P(x)$.',
					hintAr: 'عوض $x$ بالعدد $3$ في عبارة $P(x)$: $2(3)^3 - 3(3)^2 - 11(3) + 6$.',
					expectedInput: '0',
					revealAr:
						'لدينا $P(3) = 2(27) - 3(9) - 11(3) + 6 = 54 - 27 - 33 + 6 = 0$. إذن العدد $3$ جذر لكثير الحدود $P(x)$، وبالتالي $P(x)$ يقبل القسمة على $(x - 3)$.'
				},
				{
					promptAr:
						'استعمل خوارزمية هورنر (أو المطابقة) لتعيين معاملات كثير الحدود $Q(x) = ax^2 + bx + c$ بحيث يكون $P(x) = (x - 3) Q(x)$.',
					hintAr:
						'سطر المعاملات هو $(2, -3, -11, 6)$ والجذر هو $3$. ننزل المعامل الأول $2$، ثم نضرب في $3$ ونجمع.',
					revealAr:
						'تطبيق جدول هورنر بالجذر $\\alpha = 3$:\n- المعامل الأول: $a = 2$\n- المعامل الثاني: $b = -3 + (3 \\times 2) = 3$\n- المعامل الثالث: $c = -11 + (3 \\times 3) = -2$\n- الباقي: $R = 6 + (3 \\times -2) = 0$.\nومنه نحصل على: $Q(x) = 2x^2 + 3x - 2$.'
				},
				{
					promptAr:
						'حل المعادلة $2x^2 + 3x - 2 = 0$ في $\\mathbb{R}$ لاستنتاج جميع حلول المعادلة $P(x) = 0$.',
					hintAr: 'احسب المميز $\\Delta = b^2 - 4ac = 3^2 - 4(2)(-2)$.',
					revealAr:
						'المميز: $\\Delta = 9 + 16 = 25 > 0$. إذن لثلاثي الحدود جذران متمايزان:\n$x_1 = \\frac{-3 - 5}{4} = -2$ و $x_2 = \\frac{-3 + 5}{4} = \\frac{1}{2}$.\nإذن حلول المعادلة $P(x) = 0$ في $\\mathbb{R}$ هي المجموعة: $S = \\left\\{-2; \\frac{1}{2}; 3\\right\\}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**تعريف وقابلية القسمة لكثير حدود**:\n- يكون $a$ جذراً لكثير الحدود $P(x)$ إذا وفقط إذا كان $P(a) = 0$.\n- مبرهنة: إذا كان $a$ جذراً لكثير الحدود $P(x)$ من الدرجة $n$ ($n \\ge 1$)، فإنه يوجد كثير حدود $Q(x)$ وحيد من الدرجة $(n - 1)$ بحيث:\n$$P(x) = (x - a) Q(x)$$',
				'**خوارزمية هورنر (Horner\'s Scheme)**:\nطريقة جدولية سريعة لحساب حاصل قسمة كثير حدود على $(x - a)$ وباقي القسمة دون الحاجة للقسمة المطولة:\n- ننزل المعامل الرئيسي $a_n$.\n- في كل خطوة نضرب الناتج السابق في $a$ ونجمعه مع المعامل التالي: $b_{k} = a_k + a \\cdot b_{k+1}$.\n- العدد الأخير في السطر هو باقي القسمة $P(a)$ (إذا كان $a$ جذراً، فإن الباقي هو $0$).',
				'**المعادلات مضاعفة التربيع (Biquadratic Equations)**:\nهي معادلات من الشكل $a x^4 + b x^2 + c = 0$ حيث $a \\neq 0$. لحلها نضع المجهول المساعد $X = x^2$ مع شرط $X \\ge 0$ فتتحول إلى معادلة من الدرجة الثانية $a X^2 + b X + c = 0$.'
			],
			visualSvg: svgHornerSchemeVisual,
			visualCaptionAr:
				'مخطط خوارزمية هورنر لتحليل كثير الحدود $2x^3 - 3x^2 - 11x + 6$ بالجذر الظاهر $\\alpha = 3$',
			examples: [
				{
					problemAr: 'حل في $\\mathbb{R}$ المعادلة مضاعفة التربيع: $x^4 - 5x^2 + 4 = 0$.',
					solutionAr:
						'بوضع $X = x^2$ مع $X \\ge 0$ تصبح المعادلة: $X^2 - 5X + 4 = 0$.\nالمميز $\\Delta = (-5)^2 - 4(1)(4) = 25 - 16 = 9$.\nالجذران هما: $X_1 = \\frac{5 - 3}{2} = 1$ و $X_2 = \\frac{5 + 3}{2} = 4$.\nكلا الحلين موجب ويحقق الشرط $X \\ge 0$:\n- $x^2 = 1 \\iff x = 1$ أو $x = -1$.\n- $x^2 = 4 \\iff x = 2$ أو $x = -2$.\nإذن مجموعة الحلول في $\\mathbb{R}$ هي: $S = \\{-2; -1; 1; 2\\}$.'
				},
				{
					problemAr:
						'باستعمال المطابقة، عين الأعداد الحقيقية $a$، $b$ و $c$ بحيث يكون من أجل كل $x$: $x^3 - 2x^2 - 5x + 6 = (x - 1)(ax^2 + bx + c)$.',
					solutionAr:
						'ننشر الطرف الأيمن:\n$(x - 1)(ax^2 + bx + c) = ax^3 + (b - a)x^2 + (c - b)x - c$.\nبالمطابقة مع $x^3 - 2x^2 - 5x + 6$ نجد جملة المعادلات:\n- $a = 1$\n- $b - a = -2 \\implies b = -1$\n- $c - b = -5 \\implies c = -5 + (-1) = -6$\n- $-c = 6 \\implies c = -6$.\nإذن: $ax^2 + bx + c = x^2 - x - 6$.'
				}
			],
			watchOutAr:
				'احذر عند تطبيق خوارزمية هورنر إذا كان أحد حدود كثير الحدود منعدماً (معامله $0$)! يجب إدراج المعامل $0$ في موضعه بالجدول، وإلا ستختل درجات جميع المعاملات وتصبح النتائج خاطئة تماماً.'
		},
		practice: [
			{
				questionAr:
					'نعتبر كثير الحدود $P(x) = x^3 - 4x^2 + x + 6$. إذا علمت أن العدد $2$ جذر لـ $P(x)$، فإن حاصل قسمة $P(x)$ على $(x - 2)$ بواسطة خوارزمية هورنر هو:',
				options: [
					'$x^2 - 2x - 3$',
					'$x^2 - 6x + 13$',
					'$x^2 + 2x - 3$',
					'$x^2 - 4x + 1$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! أحسنت، تطبيق جدول هورنر على المعاملات $(1, -4, 1, 6)$ بالجذر $2$ يعطي المعاملات $(1, -2, -3)$ والباقي $0$.',
					'خطأ تشخيصي: قمت بطرح الأعداد في السطر بدلاً من جمع نواتج الضرب مع المعاملات.',
					'خطأ تشخيصي: انتبه لإشارة المعامل الثاني: $-4 + 2(1) = -2$ وليس $+2$.',
					'خطأ تشخيصي: هذه ليست معاملات حاصل القسمة، بل نسيت إجراء عملية الضرب بالجذر $2$.'
				],
				explanationAr:
					'تطبيق خوارزمية هورنر على $P(x) = x^3 - 4x^2 + x + 6$ بالجذر $\\alpha = 2$:\n- المعامل الأول: $1$\n- المعامل الثاني: $-4 + (2 \\times 1) = -2$\n- المعامل الثالث: $1 + (2 \\times -2) = -3$\n- الباقي: $6 + (2 \\times -3) = 0$.\nإذن حاصل القسمة هو $Q(x) = x^2 - 2x - 3$.'
			},
			{
				questionAr:
					'ما هي مجموعة حلول المعادلة مضاعفة التربيع $x^4 - 13x^2 + 36 = 0$ في $\\mathbb{R}$؟',
				options: [
					'$\\{-3; -2; 2; 3\\}$',
					'$\\{4; 9\\}$',
					'$\\{-9; -4; 4; 9\\}$',
					'$\\{-2; 2\\}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! أحسنت، بوضع $X = x^2$ نجد $X = 4$ أو $X = 9$، ومنه $x = \\pm 2$ و $x = \\pm 3$.',
					'خطأ تشخيصي: هذه قيم المجهول المساعد $X = x^2$ وليست قيم المجهول الأصلي $x$.',
					'خطأ تشخيصي: لا نأخذ الإشارة السالبة لقيم $X$ مباشرة، بل نأخذ الجذر التربيعي الموجب والسالب للقيم الموجبة $4$ و $9$.',
					'خطأ تشخيصي: أغفلت حلول المعادلة $x^2 = 9$ واكتفيت فقط بحلول $x^2 = 4$.'
				],
				explanationAr:
					'نضع $X = x^2$ مع $X \\ge 0$. تصبح المعادلة: $X^2 - 13X + 36 = 0$.\nالمميز: $\\Delta = (-13)^2 - 4(1)(36) = 169 - 144 = 25$.\nالحلان هما: $X_1 = \\frac{13 - 5}{2} = 4$ و $X_2 = \\frac{13 + 5}{2} = 9$.\nبما أن الحلين موجبان:\n- $x^2 = 4 \\implies x = 2$ أو $x = -2$.\n- $x^2 = 9 \\implies x = 3$ أو $x = -3$.\nإذن: $S = \\{-3; -2; 2; 3\\}$.'
			},
			{
				questionAr:
					'يكون كثير الحدود $P(x) = 2x^3 - x^2 + m x + 6$ قابلاً للقسمة على $(x - 2)$ إذا وفقط إذا كانت قيمة الوسيط الحقيقي $m$ تساوي:',
				options: [
					'$-9$',
					'$9$',
					'$-18$',
					'$3$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! أحسنت، شرط قابلية القسمة على $(x - 2)$ هو $P(2) = 0 \\iff 18 + 2m = 0 \\iff m = -9$.',
					'خطأ تشخيصي: خطأ في إشارة المعادلة الناتجة: $2m = -18$ يعطي $m = -9$ وليس $+9$.',
					'خطأ تشخيصي: نسيت القسمة على معامل $m$ وهو $2$.',
					'خطأ تشخيصي: حسبت $P(0) = 6$ أو عوضت بقيمة خاطئة للمتغير.'
				],
				explanationAr:
					'يكون $P(x)$ قابلاً للقسمة على $(x - 2)$ إذا وفقط إذا كان $2$ جذراً لـ $P(x)$، أي $P(2) = 0$:\n$$P(2) = 2(2)^3 - (2)^2 + m(2) + 6 = 2(8) - 4 + 2m + 6 = 16 - 4 + 2m + 6 = 18 + 2m$$\nنحل المعادلة: $18 + 2m = 0 \\iff 2m = -18 \\iff m = -9$.'
			}
		]
	},

	// [3] lesson_2as_tm_t1_derivatives_rate_of_change_tangent
	adaptShared(
		SHARED_LESSONS_2AS_T1[2],
		't1_derivatives_rate_of_change_tangent',
		{
			order: 3,
			sequenceId: 'seq2',
			sequenceTitleAr: 'المقطع الثاني: الاشتقاقية ودراسة الدوال وتطبيقات الاستمثال التقني',
			titleAr: 'الاشتقاقية: العدد المشتق، التفسير الهندسي، معادلة المماس والتقريب التآلفي',
			objectives: [
				'تعريف قابلية الاشتقاق عند نقطة وحساب العدد المشتق f\'(x_0) كنهاية لنسبة التزايد',
				'التفسير الهندسي للعدد المشتق ومعادلة المماس والإنشاء الدقيق للمماسات في المنحنيات البيانية',
				'التقريب التآلفي المحلي واستعماله في الحساب التقريبي وحساب الارتياب في القياسات الفيزيائية',
				'التعرف على التفسير الحركي للعدد المشتق كالسرعة اللحظية ومعدل التغير الآني'
			],
			keywordsAr: [
				'العدد المشتق',
				'نسبة التزايد',
				'معادلة المماس',
				'التقريب التآلفي',
				'السرعة اللحظية'
			]
		}
	),

	// [4] lesson_2as_tm_t1_derivatives_rules_rational_functions_optimization (TM SPECIALIZED)
	{
		id: 'lesson_2as_tm_t1_derivatives_rules_rational_functions_optimization',
		slug: '2as-tm-t1-derivatives-rules-rational-functions-optimization',
		grade: '2as_tm',
		yearSubjectId: 712,
		trimesterId: 't1',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: الاشتقاقية ودراسة الدوال وتطبيقات الاستمثال التقني',
		order: 4,
		titleAr: 'قواعد الاشتقاق ودراسة الدوال الناطقة واتجاه التغير ومسائل الاستمثال التقني',
		objectives: [
			'التمكن من قواعد اشتقاق الدوال المألوفة والدوال الناطقة وكثيرات الحدود ومشتقة f(ax+b)',
			'توظيف المشتقة لدراسة اتجاه تغير الدوال وتعيين القيم الحدية المحلية العظمى والصغرى',
			'تطبيق الاشتقاقية في حل مسائل الاستمثال الهندسية والفيزيائية والتقنية وتحديد الأبعاد والمقاييس المثلى (أكبر مساحة، أقل تكلفة، أكبر سعة)',
			'قراءة جدول التغيرات واستنتاج إشارة دالة وإيجاد حصر لقيمها على مجالات معطاة'
		],
		keywordsAr: [
			'قواعد الاشتقاق',
			'الدوال الناطقة',
			'جدول التغيرات',
			'القيم الحدية',
			'مسائل الاستمثال التقني'
		],
		discover: {
			scenarioAr:
				'في ورشة ميكانيكية صناعية، تكلفة إنتاج $x$ قطعة يومياً (بآلاف الدنانير) تُنمذج بالدالة الإجمالية $C(x) = x^2 + 100$ حيث $x \\in ]0; +\\infty[$. التكلفة المتوسطة لإنتاج القطعة الواحدة هي $f(x) = \\frac{C(x)}{x} = x + \\frac{100}{x}$. نريد تحديد عدد القطع $x$ التي يجب إنتاجها يومياً لجعل التكلفة المتوسطة للقطعة أدنى ما يمكن (الاستمثال التقني).',
			svg: svgOptimizationCurve,
			steps: [
				{
					promptAr:
						'احسب الدالة المشتقة $f\'(x)$ للدالة الناطقة $f(x) = x + \\frac{100}{x}$ على المجال $]0; +\\infty[$.',
					hintAr: 'مشتقة $x$ هي $1$، ومشتقة $\\frac{1}{x}$ هي $-\\frac{1}{x^2}$. وحد المقامات.',
					expectedInput: '(x^2 - 100) / x^2',
					revealAr:
						'لدينا $f\'(x) = 1 - \\frac{100}{x^2} = \\frac{x^2 - 100}{x^2}$.'
				},
				{
					promptAr:
						'ادرس إشارة $f\'(x)$ على المجال $]0; +\\infty[$، وحدد القيمة التي تنعدم عندها الدالة المشتقة.',
					hintAr: 'بما أن المقام $x^2 > 0$ دوماً، فإن إشارة $f\'(x)$ هي نفس إشارة البسط $x^2 - 100 = (x - 10)(x + 10)$.',
					revealAr:
						'تنعدم المشتقة عند $x = 10$ لأن $x > 0$:\n- على المجال $]0; 10[$: $f\'(x) < 0$ والدالة $f$ متناقصة تماماً.\n- على المجال $]10; +\\infty[$: $f\'(x) > 0$ والدالة $f$ متزايدة تماماً.'
				},
				{
					promptAr:
						'استنتج حجم الإنتاج اليومي الأمثل $x$، وقيمة التكلفة المتوسطة الصغرى الموافقة.',
					hintAr: 'احسب $f(10)$ بتعويض $x = 10$ في عبارة التكلفة المتوسطة.',
					revealAr:
						'تبلغ التكلفة المتوسطة قيمة حدية صغرى مطلقة عند إنتاج $x = 10$ قطع يومياً، وقيمتها الدنيا هي:\n$$f(10) = 10 + \\frac{100}{10} = 10 + 10 = 20$$\nأي $20$ ألف دينار ($20000\\text{ DZD}$) للقطعة الواحدة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**قاعدة مشتقة حاصل قسمة دالتين (الدوال الناطقة)**:\nإذا كانت $u$ و $v$ دالتين قابلتين للاشتقاق على مجال $I$ مع $v(x) \\neq 0$ على $I$، فإن الدالة $\\frac{u}{v}$ قابلة للاشتقاق على $I$ ولدينا:\n$$\\left(\\frac{u}{v}\\right)\' = \\frac{u\'v - uv\'}{v^2}$$',
				'**مشتقة مركب دالة تآلفية $f(ax + b)$**:\nإذا كانت $f$ قابلة للاشتقاق على مجال $J$، فإن الدالة $g(x) = f(ax + b)$ قابلة للاشتقاق ولدينا:\n$$g\'(x) = a \\cdot f\'(ax + b)$$',
				'**العلاقة بين المشتقة والقيم الحدية والاستمثال**:\n- تنعدم المشتقة $f\'(x_0) = 0$ وتغير إشارتها $\\implies f(x_0)$ قيمة حدية محلية (عظمى إذا تغيرت من $+$ إلى $-$، وصغرى إذا تغيرت من $-$ إلى $+$).\n- في مسائل الاستمثال التقني: نحدد المتغير $x$ ومجال تعريفه الفيزيائي، نعبر عن المقدار المراد استمثاله بدالة $f(x)$، نحسب $f\'(x)$، ونعين القيمة الحدية من جدول التغيرات.'
			],
			visualSvg: svgOptimizationCurve,
			visualCaptionAr:
				'دراسة اتجاه تغير دالة التكلفة المتوسطة $f(x) = x + \\frac{100}{x}$ وتعيين القيمة الصغرى عند $x = 10$',
			examples: [
				{
					problemAr:
						'احسب مشتقة الدالة الناطقة $f(x) = \\frac{2x - 3}{x + 1}$ على $\\mathbb{R} \\setminus \\{-1\\}$ وادرس اتجاه تغيرها.',
					solutionAr:
						'نطبق قاعدة حاصل القسمة حيث $u(x) = 2x - 3 \\implies u\'(x) = 2$ و $v(x) = x + 1 \\implies v\'(x) = 1$:\n$$f\'(x) = \\frac{2(x + 1) - (2x - 3)(1)}{(x + 1)^2} = \\frac{2x + 2 - 2x + 3}{(x + 1)^2} = \\frac{5}{(x + 1)^2}$$\nبما أن البسط $5 > 0$ والمقام $(x + 1)^2 > 0$ على المجالين $]-\\infty; -1[$ و $]-1; +\\infty[$، فإن $f\'(x) > 0$ تماماً، والدالة $f$ متزايدة تماماً على كل من المجالين.'
				},
				{
					problemAr:
						'نريد إحاطة قطعة أرض مستطيلة الشكل محاذية لنهر بسياج طوله $200\\text{ m}$ دون تسييج جهة النهر. ما هما بعدا القطعة اللذان يجعلان مساحتها أكبر ما يمكن؟',
					solutionAr:
						'نفرض عرض القطعة العمودي على النهر هو $x$ (بالمتر). طول القطعة الموازي للنهر هو $200 - 2x$ مع $x \\in ]0; 100[$.\nالمساحة: $S(x) = x(200 - 2x) = 200x - 2x^2$.\nالمشتقة: $S\'(x) = 200 - 4x$.\nتنعدم المشتقة عند $200 - 4x = 0 \\iff x = 50\\text{ m}$.\nالمشتقة موجبة قبل $50$ وسالبة بعدها، إذن المساحة عظمى عند $x = 50\\text{ m}$ والطول $200 - 2(50) = 100\\text{ m}$، والمساحة العظمى هي $S(50) = 5000\\text{ m}^2$.'
				}
			],
			watchOutAr:
				'في مشتقة حاصل القسمة $\\left(\\frac{u}{v}\\right)\' = \\frac{u\'v - uv\'}{v^2}$ احذر نسيان إشارة السالب في البسط أو نشر المقام! اترك المقام دوماً بالشكل $(v(x))^2$ لأنه مربع موجب تماماً، وركز دراسة الإشارة على إشارة البسط فقط.'
		},
		practice: [
			{
				questionAr:
					'مشتقة الدالة الناطقة $f(x) = \\frac{2x + 1}{x - 3}$ المعرفة على $\\mathbb{R} \\setminus \\{3\\}$ هي:',
				options: [
					'$f\'(x) = \\frac{-7}{(x - 3)^2}$',
					'$f\'(x) = \\frac{7}{(x - 3)^2}$',
					'$f\'(x) = \\frac{-5}{(x - 3)^2}$',
					'$f\'(x) = 2$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! أحسنت، $u\'v - uv\' = 2(x - 3) - 1(2x + 1) = 2x - 6 - 2x - 1 = -7$.',
					'خطأ تشخيصي: نسيت توزيع إشارة السالب على حدود القوس الثاني: $-(2x + 1) = -2x - 1$.',
					'خطأ تشخيصي: خطأ في الحساب العددي: $2(-3) - 1 = -7$ وليس $-5$.',
					'خطأ تشخيصي: قمت باشتقاق البسط وحده والمقام وحده، وهذا خطأ جسيم، بل يجب تطبيق قاعدة مشتقة حاصل القسمة.'
				],
				explanationAr:
					'نطبق قاعدة مشتقة حاصل القسمة $\\left(\\frac{u}{v}\\right)\' = \\frac{u\'v - uv\'}{v^2}$:\n$$u(x) = 2x + 1 \\implies u\'(x) = 2, \\quad v(x) = x - 3 \\implies v\'(x) = 1$$\n$$f\'(x) = \\frac{2(x - 3) - (2x + 1)(1)}{(x - 3)^2} = \\frac{2x - 6 - 2x - 1}{(x - 3)^2} = \\frac{-7}{(x - 3)^2}$$.'
			},
			{
				questionAr:
					'لتكن الدالة $f(x) = x + \\frac{4}{x}$ المعرفة على $]0; +\\infty[$. القيمة الحدية الصغرى المحلية للدالة $f$ هي:',
				options: [
					'$4$ وتبلغها عند $x = 2$',
					'$2$ وتبلغها عند $x = 4$',
					'$0$ وتبلغها عند $x = 2$',
					'لا تقبل قيمة حدية صغرى'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! أحسنت، المشتقة $f\'(x) = 1 - \\frac{4}{x^2} = \\frac{x^2 - 4}{x^2}$ تنعدم عند $x = 2$، وقيمتها $f(2) = 2 + 2 = 4$.',
					'خطأ تشخيصي: خلطت بين سابقة القيمة الصغرى $x = 2$ وقيمة الدالة نفسها $f(2) = 4$.',
					'خطأ تشخيصي: القيمة $0$ ليست صورة $x = 2$ بالدالة $f$، بل هي قيمة المشتقة $f\'(2) = 0$.',
					'خطأ تشخيصي: المشتقة تغير إشارتها من السالب إلى الموجب عند $x = 2$، مما يثبت وجود قيمة صغرى محلية.'
				],
				explanationAr:
					'المشتقة: $f\'(x) = 1 - \\frac{4}{x^2} = \\frac{x^2 - 4}{x^2}$.\nعلى المجال $]0; +\\infty[$، تنعدم المشتقة عند $x^2 = 4 \\implies x = 2$.\nإشارة المشتقة سالبة على $]0; 2[$ وموجبة على $]2; +\\infty[$، إذن $f$ تبلغ قيمة حدية صغرى محلية عند $x = 2$، وقيمتها هي:\n$$f(2) = 2 + \\frac{4}{2} = 2 + 2 = 4$$.'
			},
			{
				questionAr:
					'يراد إحاطة حقل مستطيل الشكل بمحاذاة جدار مستقيم بسياج طوله $100\\text{ m}$ (دون تسييج جهة الجدار). المساحة العظمى الممكنة للحقل هي:',
				options: [
					'$1250\\text{ m}^2$',
					'$2500\\text{ m}^2$',
					'$625\\text{ m}^2$',
					'$1000\\text{ m}^2$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! أحسنت، الدالة $A(x) = x(100 - 2x) = 100x - 2x^2$ مشتقتها $100 - 4x = 0 \\implies x = 25$، فتكون المساحة $25 \\times 50 = 1250\\text{ m}^2$.',
					'خطأ تشخيصي: اعتبرت السياج يحيط بجميع الأضلاع الأربعة كالمربع، متجاهلاً أن جهة الجدار غير مسيجة.',
					'خطأ تشخيصي: هذه نصف المساحة العظمى الناتجة عن خطأ في حساب أبعاد المستطيل.',
					'خطأ تشخيصي: هذا ناتج فرض أبعاد عشوائية مثل $10 \\times 80$ بدلاً من تطبيق المشتقة لتعيين القيمة العظمى.'
				],
				explanationAr:
					'نفرض عرضي الحقل العموديين على الجدار هما $x$ و $x$. الطول الموازي للجدار هو $100 - 2x$ مع $x \\in ]0; 50[$.\nالمساحة: $A(x) = x(100 - 2x) = 100x - 2x^2$.\nالمشتقة: $A\'(x) = 100 - 4x$.\nتنعدم المشتقة عند $100 - 4x = 0 \\iff x = 25\\text{ m}$.\nالمساحة العظمى هي:\n$$A(25) = 25(100 - 50) = 25 \\times 50 = 1250\\text{ m}^2$$.'
			}
		]
	},

	// [5] lesson_2as_tm_t1_finite_probability_random_variable_expectation
	adaptShared(
		SHARED_LESSONS_2AS_T1[4],
		't1_finite_probability_random_variable_expectation',
		{
			order: 5,
			sequenceId: 'seq3',
			sequenceTitleAr: 'المقطع الثالث: الاحتمالات المنتهية وتطبيقات المرجح في المستوي',
			titleAr: 'الاحتمالات المنتهية وتطبيقاتها: قانون الاحتمال، الشجرة، والمتغير العشوائي ومؤشرات التشتت',
			objectives: [
				'وصف وتوصيف تجربة عشوائية منتهية ونمذجتها بقانون احتمال وتفسير استقرار التواترات',
				'توظيف شجرة الاحتمالات ومبدأ الجداء وحساب احتمال اتحاد وتقاطع حوادث وتساوي الاحتمالات',
				'تعيين قانون الاحتمال لمتغير عشوائي وحساب الأمل الرياضياتي والتباين والانحراف المعياري',
				'حل مسائل احتمالية تطبيقية في مراقبة الجودة الصناعية وموثوقية الأنظمة التقنية'
			],
			keywordsAr: [
				'قانون الاحتمال',
				'شجرة الاحتمالات',
				'المتغير العشوائي',
				'الأمل الرياضياتي',
				'التباين والانحراف المعياري',
				'مراقبة الجودة'
			]
		}
	),

	// [6] lesson_2as_tm_t1_barycenter_two_three_points_properties
	adaptShared(
		SHARED_LESSONS_2AS_T1[5],
		't1_barycenter_two_three_points_properties',
		{
			order: 6,
			sequenceId: 'seq3',
			sequenceTitleAr: 'المقطع الثالث: الاحتمالات المنتهية وتطبيقات المرجح في المستوي',
			titleAr: 'المرجح في المستوي: مرجح نقطتين وثلاث نقط، خاصية التجميع، والحساب التحليلي',
			objectives: [
				'تعريف مرجح نقطتين وثلاث نقط مثقلة والشرط الأساسي لمجموع المعاملات غير المعدوم',
				'توظيف خاصية الصمود للضرب في عدد حقيقي غير معدوم وخاصية التجميع لإنشاء نقط المرجح',
				'حساب إحداثيات المرجح في معلم للمستوي وتعيين مركز ثقل مثلث وصفائح مستوية',
				'الربط بين مفهوم المرجح الرياضي ومركز الكتلة ومركز الثقل وتوازن القوى في الميكانيكا'
			],
			keywordsAr: [
				'مرجح نقطتين',
				'مرجح ثلاث نقط',
				'خاصية التجميع',
				'مركز الثقل',
				'إحداثيات المرجح',
				'توازن القوى'
			]
		}
	),

	// [7] lesson_2as_tm_t1_barycenter_applications_loci_concurrency
	adaptShared(
		SHARED_LESSONS_2AS_T1[6],
		't1_barycenter_applications_loci_concurrency',
		{
			order: 7,
			sequenceId: 'seq3',
			sequenceTitleAr: 'المقطع الثالث: الاحتمالات المنتهية وتطبيقات المرجح في المستوي',
			titleAr: 'تطبيقات المرجح الهندسية والميكانيكية: استقامية النقط، تلاقي المستقيمات ومجموعات النقط',
			objectives: [
				'استعمال المرجح في إثبات استقامية النقط وتلاقي المستقيمات والمحاور في الأشكال الهندسية',
				'تعيين ودراسة مجموعات النقط M التي تحقق مساواة أطوال أشعة مرجحية وإنشاؤها بدقة',
				'توظيف المرجح في حساب عزم القوى وتوازن الجمل الميكانيكية وتعيين مركز ثقل المقاطع المستوية',
				'حل مسائل نموذجية لإدماج الفصل الأول تجمع الدوال وكثيرات الحدود والاحتمالات والمرجح وفق المنهاج الوزاري'
			],
			keywordsAr: [
				'استقامية النقط',
				'تلاقي المستقيمات',
				'مجموعات النقط',
				'المحل الهندسي',
				'عزم القوى'
			]
		}
	)
];
