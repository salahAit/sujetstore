import type { InteractiveLessonData } from '../../types';
import {
	svgFunctionCurvePlot,
	svgTrigonometricCircle
} from '../../svg-secondary';

// ============================================================================
// SVG Helper Diagrams for 2AS Mathematics Stream (T2)
// ============================================================================

function svgSqueezeTheoremDiagram(): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 220" width="420" height="220" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">
  <rect x="8" y="8" width="404" height="204" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="210" y="26" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">مبرهنة الحصر (الساندويتش): -1/x ≤ (cos x)/x ≤ 1/x عند +∞</text>
  <!-- Axes -->
  <line x1="30" y1="120" x2="395" y2="120" stroke="#64748b" stroke-width="1.2"/>
  <line x1="60" y1="30" x2="60" y2="200" stroke="#64748b" stroke-width="1.2"/>
  <text x="398" y="124" font-size="11" fill="#64748b">x</text>
  <text x="64" y="42" font-size="11" fill="#64748b">y</text>
  <!-- Upper curve y = 1/x (blue dashed) -->
  <path d="M 80,45 Q 150,95 240,110 T 380,116" fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="4,3"/>
  <text x="330" y="105" font-size="10.5" font-weight="bold" fill="#2563eb">y = 1/x</text>
  <!-- Lower curve y = -1/x (red dashed) -->
  <path d="M 80,195 Q 150,145 240,130 T 380,124" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="4,3"/>
  <text x="330" y="142" font-size="10.5" font-weight="bold" fill="#dc2626">y = -1/x</text>
  <!-- Oscillating squeezed curve (cos x)/x (green) -->
  <path d="M 80,60 C 100,160 120,70 150,140 C 180,95 210,135 240,112 C 270,126 300,115 340,122 T 380,120" fill="none" stroke="#16a34a" stroke-width="2.2"/>
  <text x="210" y="75" text-anchor="middle" font-size="11" font-weight="bold" fill="#16a34a">f(x) = (cos x)/x محصورة بينهما</text>
  <!-- Limit label -->
  <rect x="220" y="160" width="170" height="26" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="305" y="177" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">lim (cos x)/x = 0 عند +∞</text>
</svg>`;
}

function svgCurvilinearAsymptoteDiagram(): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 220" width="420" height="220" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">
  <rect x="8" y="8" width="404" height="204" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="210" y="26" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">المنحنى المقارب المكافئ: f(x) = x² - 2 + 1/x يقارب y = x² - 2</text>
  <!-- Axes -->
  <line x1="30" y1="160" x2="390" y2="160" stroke="#94a3b8" stroke-width="1.2"/>
  <line x1="210" y1="35" x2="210" y2="200" stroke="#94a3b8" stroke-width="1.2"/>
  <!-- Parabolic asymptote (P): y = x² - 2 (purple dashed) -->
  <path d="M 110,50 Q 210,210 310,50" fill="none" stroke="#7c3aed" stroke-width="2" stroke-dasharray="5,4"/>
  <text x="315" y="60" font-size="11" font-weight="bold" fill="#7c3aed">(P): y = x² - 2</text>
  <!-- Function curve Cf approaching (P) for x > 0 and x < 0 -->
  <path d="M 105,45 Q 170,165 195,195" fill="none" stroke="#2563eb" stroke-width="2.2"/>
  <path d="M 225,195 Q 240,165 315,45" fill="none" stroke="#2563eb" stroke-width="2.2"/>
  <text x="140" y="100" font-size="11" font-weight="bold" fill="#2563eb">(Cf)</text>
  <!-- Asymptotic behavior label -->
  <rect x="70" y="172" width="280" height="24" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="210" y="188" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">lim [f(x) - (x² - 2)] = lim (1/x) = 0 عند ±∞</text>
</svg>`;
}

function svgInscribedAngleDiagram(): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 230" width="400" height="230" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">
  <rect x="8" y="8" width="384" height="214" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="200" y="26" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">نظرية الزاوية المحيطية والرباعي الدائري</text>
  <!-- Circle centered at (200, 125), R = 75 -->
  <circle cx="200" cy="125" r="75" fill="none" stroke="#64748b" stroke-width="1.8"/>
  <circle cx="200" cy="125" r="3" fill="#0f172a"/>
  <text x="195" y="140" font-size="11" font-weight="bold" fill="#0f172a">O</text>
  <!-- Points: A(135, 160), B(265, 160), M(175, 52), N(225, 52) -->
  <line x1="200" y1="125" x2="135" y2="160" stroke="#dc2626" stroke-width="1.5"/>
  <line x1="200" y1="125" x2="265" y2="160" stroke="#dc2626" stroke-width="1.5"/>
  <!-- Central angle arc -->
  <text x="200" y="168" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">(OA, OB) = 2θ</text>
  <!-- Inscribed angle lines from M -->
  <line x1="175" y1="52" x2="135" y2="160" stroke="#2563eb" stroke-width="1.5"/>
  <line x1="175" y1="52" x2="265" y2="160" stroke="#2563eb" stroke-width="1.5"/>
  <!-- Inscribed angle lines from N -->
  <line x1="225" y1="52" x2="135" y2="160" stroke="#16a34a" stroke-width="1.4" stroke-dasharray="3,3"/>
  <line x1="225" y1="52" x2="265" y2="160" stroke="#16a34a" stroke-width="1.4" stroke-dasharray="3,3"/>
  <!-- Points markers -->
  <circle cx="135" cy="160" r="4" fill="#1e3a8a"/>
  <text x="122" y="172" font-size="11" font-weight="bold" fill="#1e3a8a">A</text>
  <circle cx="265" cy="160" r="4" fill="#1e3a8a"/>
  <text x="278" y="172" font-size="11" font-weight="bold" fill="#1e3a8a">B</text>
  <circle cx="175" cy="52" r="4" fill="#2563eb"/>
  <text x="165" y="46" font-size="11" font-weight="bold" fill="#2563eb">M (θ)</text>
  <circle cx="225" cy="52" r="4" fill="#16a34a"/>
  <text x="235" y="46" font-size="11" font-weight="bold" fill="#16a34a">N (θ)</text>
  <text x="200" y="212" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">2(MA, MB) = (OA, OB) [2π] ⇐ الزوايا المحيطية متساوية</text>
</svg>`;
}

function svgRadicalAxisDiagram(): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 220" width="420" height="220" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">
  <rect x="8" y="8" width="404" height="204" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="210" y="26" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">المحور الجذري لدائرتين: المحل الهندسي للنقط متساوية القوى</text>
  <!-- Circle C1 center O1(120, 115), R = 50 -->
  <circle cx="120" cy="115" r="50" fill="rgba(37,99,235,0.06)" stroke="#2563eb" stroke-width="2"/>
  <circle cx="120" cy="115" r="3" fill="#2563eb"/>
  <text x="120" y="132" text-anchor="middle" font-size="11" font-weight="bold" fill="#2563eb">O₁</text>
  <!-- Circle C2 center O2(300, 115), R = 65 -->
  <circle cx="300" cy="115" r="65" fill="rgba(22,163,74,0.06)" stroke="#16a34a" stroke-width="2"/>
  <circle cx="300" cy="115" r="3" fill="#16a34a"/>
  <text x="300" y="132" text-anchor="middle" font-size="11" font-weight="bold" fill="#16a34a">O₂</text>
  <!-- Line of centers (O1 O2) -->
  <line x1="50" y1="115" x2="385" y2="115" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4,4"/>
  <!-- Radical Axis (perpendicular line at x = 195) -->
  <line x1="195" y1="36" x2="195" y2="195" stroke="#dc2626" stroke-width="2.5"/>
  <text x="202" y="52" font-size="11" font-weight="bold" fill="#dc2626">المحور الجذري (Δ)</text>
  <!-- Right angle marker -->
  <rect x="187" y="107" width="8" height="8" fill="none" stroke="#dc2626" stroke-width="1"/>
  <!-- Point P on axis -->
  <circle cx="195" cy="70" r="4.5" fill="#dc2626"/>
  <text x="182" y="74" text-anchor="end" font-size="11" font-weight="bold" fill="#dc2626">P</text>
  <text x="210" y="206" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">لكل P على (Δ): P O₁² - R₁² = P O₂² - R₂² (تساوي القوى)</text>
</svg>`;
}

// ============================================================================
// 2AS MATHEMATICS STREAM — TRIMESTER 2 LESSONS (7 LESSONS)
// ============================================================================

export const LESSONS_2AS_MATH_T2: InteractiveLessonData[] = [
	// --------------------------------------------------------------------------
	// 1. Formal Limits, Asymptotes & Squeeze/Comparison Theorems
	// --------------------------------------------------------------------------
	{
		id: 'lesson_2as_math_t2_limits_formal_asymptotes_comparison_theorems',
		slug: '2as-math-limits-formal-asymptotes-comparison-theorems',
		grade: '2as_math',
		yearSubjectId: 692,
		trimesterId: 't2',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: النهايات المعمقة، مبرهنات الحصر والسلوك التقاربي',
		order: 1,
		titleAr: 'النهايات والسلوك التقاربي المعمق: التعريف الرياضي، المستقيمات المقاربة ومبرهنات المقارنة والحصر',
		objectives: [
			'المقاربة الدقيقة لمفهوم النهاية المنتهية وغير المنتهية (المجالات المفتوحة التي تشمل L أو القيم الكبيرة)',
			'مبرهنات المقارنة والحصر (مبرهنة الساندويتش/الحصر) لحساب نهايات الدوال المثلثية والدوال المعقدة عند اللانهاية',
			'دراسة السلوك التقاربي وتعيين المستقيمات المقاربة الأفقية والعمودية للدوال متعددة الفروع والتناظرية',
			'حساب نهايات تتضمن القيمة المطلقة والدوال المتناوبة وحساب نهايات الدوال الصماء'
		],
		keywordsAr: [
			'مبرهنة الحصر (الساندويتش)',
			'مبرهنات المقارنة',
			'نهايات الدوال المثلثية',
			'المستقيمات المقاربة',
			'السلوك التقاربي الصارم'
		],
		discover: {
			scenarioAr: 'نعتبر الدالة $f(x) = \\frac{\\cos x}{x}$ المعرفة على $\\mathbb{R}^*$. عند محاولة حساب نهايتها عند $+\\infty$ مباشرة نجد أن دالة جيب التمام $\\cos x$ دالة متناوبة دورية لا تقبل نهاية عند اللانهاية. كيف نوظف مبرهنة الحصر (الساندويتش) لحصر الدالة بصرامة واستنتاج نهايتها الدقيقة وسلوكها المقارب؟',
			svg: svgSqueezeTheoremDiagram(),
			steps: [
				{
					promptAr: 'ما هو حصر الدالة المثلثية $\\cos x$ من أجل كل عدد حقيقي $x$؟',
					hintAr: 'قيم جيب التمام محصورة دوماً بين أصغر قيمة وأكبر قيمة على الدائرة المثلثية.',
					expectedInput: '-1 <= cos x <= 1',
					revealAr: 'من أجل كل $x \\in \\mathbb{R}$، نعلم قطباً أن قيم جيب التمام محصورة دوماً في المجال $[-1; 1]$:\n$$-1 \\le \\cos x \\le 1$$'
				},
				{
					promptAr: 'احصر النسبة $\\frac{\\cos x}{x}$ من أجل $x > 0$ بقسمة أطراف الحصر على $x$.',
					hintAr: 'بما أن $x > 0$ فإن القسمة عليه تحافظ على اتجاه المتباينات.',
					expectedInput: '-1/x <= (cos x)/x <= 1/x',
					revealAr: 'بقسمة أطراف المتباينة على $x > 0$:\n$$-\\frac{1}{x} \\le \\frac{\\cos x}{x} \\le \\frac{1}{x}$$'
				},
				{
					promptAr: 'احسب نهايتي طرفي الحصر عند $+\\infty$، واستنتج نهاية $f(x)$ بتطبيق مبرهنة الحصر.',
					hintAr: 'نهاية مقلوب $x$ عند اللانهاية هي $0$.',
					expectedInput: 'lim f(x) = 0',
					revealAr: 'لدينا: $\\lim_{x \\to +\\infty} \\left(-\\frac{1}{x}\\right) = 0$ و $\\lim_{x \\to +\\infty} \\left(\\frac{1}{x}\\right) = 0$.\nبما أن الدالة $f(x)$ محصورة بين دالتين تؤول كلتاهما إلى نفس النهاية $0$ عند $+\\infty$، فحسب **مبرهنة الحصر**:\n$$\\lim_{x \\to +\\infty} \\frac{\\cos x}{x} = 0$$\nالتفسير الهندسي: المستقيم ذو المعادلة $y = 0$ (محور الفواصل) مقارب أفقي للمنحنى عند $+\\infty$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**مبرهنة الحصر (Théorème des gendarmes / Squeeze Theorem)**:\nلتكن $f$ و $g$ و $h$ ثلاث دوال معرفة على مجال من الشكل $]a; +\\infty[$. إذا كان:\n$$g(x) \\le f(x) \\le h(x) \\quad \\quad ; \quad \\quad \\lim_{x \\to +\\infty} g(x) = \\lim_{x \\to +\\infty} h(x) = L$$\nفإن الدالة $f$ تقبل نهاية عند $+\\infty$ ويكون: $$\\lim_{x \\to +\\infty} f(x) = L$$ (تبقى المبرهنة صحيحة عند $-\\infty$ وعند أي نقطة $x_0$).',
				'**مبرهنات المقارنة لعدم التناهي**:\n- إذا كان $f(x) \\ge g(x)$ وكانت $\\lim_{x \\to +\\infty} g(x) = +\\infty$، فإن: $\\lim_{x \\to +\\infty} f(x) = +\\infty$.\n- إذا كان $f(x) \\le h(x)$ وكانت $\\lim_{x \\to +\\infty} h(x) = -\\infty$، فإن: $\\lim_{x \\to +\\infty} f(x) = -\\infty$.',
				'**المستقيمات المقاربة الأفقية والعمودية**:\n- **المقارب الأفقي**: إذا كان $\\lim_{x \\to \\pm\\infty} f(x) = L$، فإن المستقيم ذو المعادلة $y = L$ مستقيم مقارب أفقي للمنحنى $(C_f)$ بجوار $\\pm\\infty$.\n- **المقارب العمودي**: إذا كان $\\lim_{x \\to x_0} f(x) = \\pm\\infty$، فإن المستقيم ذو المعادلة $x = x_0$ مستقيم مقارب عمودي للمنحنى $(C_f)$.',
				'**نهايات الدوال الصماء والقيمة المطلقة**:\nعند حساب النهايات التي تتضمن القيمة المطلقة $|x - a|$، يجب دوماً دراسة النهاية على اليمين $x \\to a^+$ وعلى اليسار $x \\to a^-$ بعد كتابة العبارة دون رمز القيمة المطلقة.'
			],
			visualSvg: svgSqueezeTheoremDiagram(),
			visualCaptionAr: 'حصر الدالة المتذبذبة بين منحنيين يؤولان إلى الصفر يفرض على الدالة المحصورة التقارب نحو الصفر',
			examples: [
				{
					problemAr: 'احسب النهاية: $\\lim_{x \\to 0} x^2 \\sin\\left(\\frac{1}{x}\\right)$.',
					solutionAr: 'الدالة غير معرّفة عند $0$. نعلم أنه لكل $x \\ne 0$:\n$$-1 \\le \\sin\\left(\\frac{1}{x}\\right) \\le 1$$\nبما أن $x^2 > 0$ من أجل كل $x \\ne 0$، نضرب أطراف المتباينة في $x^2$ دون تغيير الترتيب:\n$$-x^2 \\le x^2 \\sin\\left(\\frac{1}{x}\\right) \\le x^2$$\nنحسب نهايتي الطرفين عند $0$:\n$$\\lim_{x \\to 0} (-x^2) = 0 \\quad \\quad , \quad \\quad \\lim_{x \\to 0} (x^2) = 0$$\nوحسب مبرهنة الحصر، فإن: $\\lim_{x \\to 0} x^2 \\sin\\left(\\frac{1}{x}\\right) = 0$.'
				},
				{
					problemAr: 'أثبت أن $\\lim_{x \\to +\\infty} (2x - 3\\sin x) = +\\infty$ باستعمال مبرهنات المقارنة.',
					solutionAr: 'نعلم أن $\\sin x \\le 1$ لكل $x \\in \\mathbb{R}$. بالضرب في $-3$ نجد $-3\\sin x \\ge -3$.\nنضيف $2x$ إلى الطرفين:\n$$2x - 3\\sin x \\ge 2x - 3$$\nنحسب نهاية الطرف الأصغر عند $+\\infty$:\n$$\\lim_{x \\to +\\infty} (2x - 3) = +\\infty$$\nبما أن الدالة أكبر من أو تساوي دالة تؤول إلى $+\\infty$، فحسب مبرهنة المقارنة:\n$$\\lim_{x \\to +\\infty} (2x - 3\\sin x) = +\\infty$$.'
				}
			],
			watchOutAr: 'في مبرهنة الحصر، تأكد أن الدالتين الحاصرتين تؤولان إلى **نفس النهاية المنتهية $L$ تماماً**! فإذا كانت إحداهما تؤول إلى $1$ والأخرى إلى $2$، فلا يمكن استنتاج نهاية الدالة المحصورة بينهما.'
		},
		practice: [
			{
				questionAr: 'نهاية الدالة $f(x) = \\frac{2x + \\sin x}{x - 1}$ عند $+\\infty$ هي:',
				options: [
					'$2$',
					'$1$',
					'$+\\infty$',
					'غير موجودة بسبب التذبذب'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة ومبرهنة! نستخرج $x$ عاملاً مشتركاً: $\\frac{x(2 + \\frac{\\sin x}{x})}{x(1 - \\frac{1}{x})} = \\frac{2 + \\frac{\\sin x}{x}}{1 - \\frac{1}{x}}$. بما أن $\\lim \\frac{\\sin x}{x} = 0$ بالحصر، فإن النهاية تساوي $\\frac{2+0}{1-0} = 2$.',
					'خطأ تشخيصي: معامل $x$ في البسط هو $2$ وليس $1$.',
					'خطأ تشخيصي: درجات البسط والمقام متساوية من الدرجة الأولى فلا تؤول إلى اللانهاية.',
					'خطأ تشخيصي: أثر $\\sin x$ يتلاشى عند القسمة على $x$ الكبيرة جداً وفق مبرهنة الحصر.'
				],
				explanationAr: 'نحلل العبارة باستخراج $x$ كعامل مشترك في البسط والمقام:\n$$f(x) = \\frac{x\\left(2 + \\frac{\\sin x}{x}\\right)}{x\\left(1 - \\frac{1}{x}\\right)} = \\frac{2 + \\frac{\\sin x}{x}}{1 - \\frac{1}{x}}$$\nبما أن $-1 \\le \\sin x \\le 1$، فإن $-\\frac{1}{x} \\le \\frac{\\sin x}{x} \\le \\frac{1}{x}$. ومنه $\\lim_{x \\to +\\infty} \\frac{\\sin x}{x} = 0$.\nكذلك $\\lim_{x \\to +\\infty} \\frac{1}{x} = 0$.\nبالتعويض نجد: $\\lim_{x \\to +\\infty} f(x) = \\frac{2 + 0}{1 - 0} = 2$.'
			},
			{
				questionAr: 'إذا كانت الدالة $g$ تحقق من أجل كل $x > 3$: $g(x) \\ge x^2 - 4x$. فإن $\\lim_{x \\to +\\infty} g(x)$ تساوي:',
				options: [
					'$+\\infty$',
					'$0$',
					'$-\\infty$',
					'لا يمكن التحديد'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $\\lim_{x \\to +\\infty} (x^2 - 4x) = \\lim x^2 = +\\infty$. وحسب مبرهنة المقارنة، إذا كانت $g(x) \\ge u(x)$ و $\\lim u(x) = +\\infty$ فإن $\\lim g(x) = +\\infty$.',
					'خطأ تشخيصي: الطرف الأصغر يؤول إلى $+\\infty$ فكيف تؤول الدالة الأكبر إلى $0$؟',
					'خطأ تشخيصي: المتباينة $g(x) \\ge +\\infty$ لا تسمح بأن تكون النتيجة $-\\infty$.',
					'خطأ تشخيصي: مبرهنة المقارنة تحسم هذه الحالة تماماً.'
				],
				explanationAr: 'نهاية كثير الحدود الأصغر عند $+\\infty$ هي نهاية حده الأعلى درجة: $\\lim_{x \\to +\\infty} (x^2 - 4x) = \\lim_{x \\to +\\infty} x^2 = +\\infty$.\nبما أن $g(x) \\ge x^2 - 4x$ على المجال، فحسب مبرهنة المقارنة المباشرة تكون نهاية $g(x)$ هي $+\\infty$.'
			},
			{
				questionAr: 'معادلات المستقيمات المقاربة للدالة $f(x) = \\frac{3x - 1}{x + 2}$ هي:',
				options: [
					'$x = -2$ مستقيم مقارب عمودي و $y = 3$ مستقيم مقارب أفقي',
					'$x = 2$ مستقيم مقارب عمودي و $y = 3$ مستقيم مقارب أفقي',
					'$x = 3$ مستقيم مقارب عمودي و $y = -2$ مستقيم مقارب أفقي',
					'$y = 3x$ مستقيم مقارب مائل'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! مقام الدالة ينعدم عند $x = -2$ والنهاية عنده غير منتهية ($x = -2$ عمودي). ونهاية حاصل قسمة أكبر حدين عند $\\pm\\infty$ هي $\\frac{3x}{x} = 3$ ($y = 3$ أفقي).',
					'خطأ تشخيصي: القيمة الممنوعة هي جذر المقام $x + 2 = 0 \\iff x = -2$ وليس $+2$.',
					'خطأ تشخيصي: عكست بين الفاصلة والترتيبة للمقاربين.',
					'خطأ تشخيصي: الدالة التناظرية من الشكل $\\frac{ax+b}{cx+d}$ لا تقبل مقارباً مائلاً بل أفقي وعمودي فقط.'
				],
				explanationAr: '1) عند القيمة الممنوعة $x = -2$: المقام ينعدم والبسط يساوي $3(-2) - 1 = -7 \\ne 0$. إذن $\\lim_{x \\to -2} f(x) = \\pm\\infty$، والمستقيم $x = -2$ مقارب عمودي.\n2) عند $\\pm\\infty$: $\\lim_{x \\to \\pm\\infty} \\frac{3x - 1}{x + 2} = \\lim_{x \\to \\pm\\infty} \\frac{3x}{x} = 3$. إذن المستقيم $y = 3$ مقارب أفقي.'
			}
		]
	},

	// --------------------------------------------------------------------------
	// 2. Indeterminate Forms: Derivative Rate, Conjugate, Oblique & Curvilinear
	// --------------------------------------------------------------------------
	{
		id: 'lesson_2as_math_t2_limits_indeterminate_forms_rate_of_change_oblique_asymptotes',
		slug: '2as-math-limits-indeterminate-forms-rate-of-change-oblique-asymptotes',
		grade: '2as_math',
		yearSubjectId: 692,
		trimesterId: 't2',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: النهايات المعمقة، مبرهنات الحصر والسلوك التقاربي',
		order: 2,
		titleAr: 'إزالة حالات عدم التعيين بطريقة العدد المشتق والمرافق: المقاربات المائلة والمنحنيات المقاربة وفروع الشلل',
		objectives: [
			'توظيف تعريف العدد المشتق لإزالة حالات عدم التعيين من الشكل 0/0 خاصة في الدوال المثلثية والجذرية مثل lim (sin x / x) و lim ((√(1+x)-1)/x)',
			'البحث المنهجي عن المقارب المائل بحساب lim f(x)/x = a ثم lim [f(x) - ax] = b',
			'دراسة السلوك التقاربي والمقاربات المنحنية (منحنى مقارب مكافئ) والفروع اللانهائية وشبه الشلجمية',
			'دراسة وضعية المنحنى بالنسبة للمماسات والمقاربات وتعيين نقاط التقاطع والتماس بيانيا وحسابيا'
		],
		keywordsAr: [
			'إزالة عدم التعيين بالعدد المشتق',
			'نهاية sin x / x',
			'المقارب المائل المنهجي',
			'المنحنى المقارب',
			'الفروع اللانهائية'
		],
		discover: {
			scenarioAr: 'نريد حساب النهاية الشهيرة $\\lim_{x \\to 0} \\frac{\\sin x}{x}$ والنهاية الجذرية $\\lim_{x \\to 0} \\frac{\\sqrt{1+x} - 1}{x}$. كلتاهما تعطي حالة عدم تعيين من الشكل $\\frac{0}{0}$. كيف نوظف التعريف الدقيق للعدد المشتق كنسبة تزايد لإزالة عدم التعيين بلمح البصر، وكيف نكشف المقاربات المنحنية ذات الدرجة الثانية؟',
			svg: svgCurvilinearAsymptoteDiagram(),
			steps: [
				{
					promptAr: 'نعرّف الدالة $g(x) = \\sin x$. عبر عن النسبة $\\frac{\\sin x}{x}$ بصيغة نسبة تزايد عند النقطة $x_0 = 0$.',
					hintAr: 'لاحظ أن $\\sin(0) = 0$، إذن $\\frac{\\sin x}{x} = \\frac{\\sin x - \\sin 0}{x - 0}$.',
					expectedInput: '(g(x) - g(0))/(x - 0)',
					revealAr: 'نضع $g(x) = \\sin x$. بما أن $g(0) = \\sin(0) = 0$، فإن:\n$$\\frac{\\sin x}{x} = \\frac{g(x) - g(0)}{x - 0}$$'
				},
				{
					promptAr: 'احسب نهاية نسبة التزايد هذه عند $0$ بالاعتماد على مشتقة دالة الجيب.',
					hintAr: 'مشتقة $\\sin x$ هي $\\cos x$. احسب $g\'(0) = \\cos(0)$.',
					expectedInput: '1',
					revealAr: 'الدالة $g(x) = \\sin x$ قابلة للاشتقاق عند $0$ ومشتقتها هي $g\'(x) = \\cos x$.\nبالتالي:\n$$\\lim_{x \\to 0} \\frac{\\sin x}{x} = g\'(0) = \\cos(0) = 1$$\nوهي النهاية الشهيرة الأساسية لحساب نهايات حساب المثلثات.'
				},
				{
					promptAr: 'نعتبر الدالة $f(x) = x^2 - 2 + \\frac{1}{x}$. بين أن المنحنى المكافئ $(P): y = x^2 - 2$ منحنى مقارب لـ $(C_f)$ عند $\\pm\\infty$.',
					hintAr: 'احسب نهاية الفرق $\\lim_{x \\to \\pm\\infty} [f(x) - (x^2 - 2)]$.',
					expectedInput: 'lim [f(x) - (x^2-2)] = lim (1/x) = 0',
					revealAr: 'نحسب نهاية الفرق:\n$$\\lim_{x \\to \\pm\\infty} [f(x) - (x^2 - 2)] = \\lim_{x \\to \\pm\\infty} \\frac{1}{x} = 0$$\nبما أن نهاية الفرق معدومة، فإن المنحنى $(P)$ ذو المعادلة $y = x^2 - 2$ هو **منحنى مقارب مكافئ (Courbe asymptote)** للمنحنى $(C_f)$ بجوار $+\\infty$ و $-\\infty$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**إزالة عدم التعيين $\\frac{0}{0}$ بطريقة العدد المشتق**:\nإذا كانت $f$ دالة قابلة للاشتقاق عند $x_0$ وكان $f(x_0) = 0$، فإنه لكل دالة من الشكل $\\frac{f(x)}{x - x_0}$:\n$$\\lim_{x \\to x_0} \\frac{f(x)}{x - x_0} = \\lim_{x \\to x_0} \\frac{f(x) - f(x_0)}{x - x_0} = f\'(x_0)$$\n- نهايات مثلثية شهيرة:\n  * $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$\n  * $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2} = \\frac{1}{2}$\n  * $\\lim_{x \\to 0} \\frac{\\tan x}{x} = 1$',
				'**المقارب المائل المنهجي $(\\Delta): y = ax + b$**:\nيكون المستقيم $(\\Delta)$ مقارباً مائلاً للمنحنى $(C_f)$ عند اللانهاية إذا وفقط إذا تحقق: $$\\lim_{x \\to \\pm\\infty} [f(x) - (ax + b)] = 0$$\nالبحث المنهجي عن $a$ و $b$:\n1) نحسب المعامل: $a = \\lim_{x \\to \\pm\\infty} \\frac{f(x)}{x}$ (حيث $a \\in \\mathbb{R}^*$).\n2) نحسب الثابت: $b = \\lim_{x \\to \\pm\\infty} [f(x) - ax]$ (حيث $b \\in \\mathbb{R}$).',
				'**المنحنيات المقاربة والفروع شبه الشلجمية**:\n- **منحنى مقارب**: إذا كانت $\\lim_{x \\to \\pm\\infty} [f(x) - g(x)] = 0$ حيث $g(x) = ax^2 + bx + c$، فإن المنحنى $(C_g)$ منحنى مقارب منحني لـ $(C_f)$.\n- **فرع شلجمي (شبه مكافئ)**: إذا كان $\\lim \\frac{f(x)}{x} = \\pm\\infty$، فإن المنحنى يقبل فرعاً شلجمياً باتجاه محور التراتيب. وإذا كان $\\lim \\frac{f(x)}{x} = 0$، فإنه يقبل فرعاً باتجاه محور الفواصل.'
			],
			visualSvg: svgCurvilinearAsymptoteDiagram(),
			visualCaptionAr: 'تقارب منحنى الدالة من قطع مكافئ مقارب عند اللانهاية بانعدام المسافة العمودية بينهما',
			examples: [
				{
					problemAr: 'احسب باستعمال العدد المشتق: $\\lim_{x \\to 0} \\frac{\\sqrt{x + 4} - 2}{x}$.',
					solutionAr: 'نضع $g(x) = \\sqrt{x + 4}$. الدالة معرّفة وقابلة للاشتقاق على $]-4; +\\infty[$.\nنلاحظ أن $g(0) = \\sqrt{0 + 4} = 2$.\nالنسبة تصبح: $\\frac{g(x) - g(0)}{x - 0}$.\nمشتقة الدالة $g$: $g\'(x) = \\frac{1}{2\\sqrt{x + 4}}$.\nعند $x = 0$: $g\'(0) = \\frac{1}{2\\sqrt{4}} = \\frac{1}{4}$.\nإذن: $\\lim_{x \\to 0} \\frac{\\sqrt{x + 4} - 2}{x} = g\'(0) = \\frac{1}{4}$.'
				},
				{
					problemAr: 'لتكن $f(x) = \\frac{2x^2 - 3x + 1}{x - 1}$. بين وجود مقارب مائل وعين وضعيته بالنسبة للمنحنى.',
					solutionAr: 'بالقسمة الإقليدية: $2x^2 - 3x + 1 = (x - 1)(2x - 1)$.\nعند كل $x \\ne 1$: $f(x) = 2x - 1$.\nالمنحنى ينطبق تماماً على المستقيم $y = 2x - 1$ ما عدا النقطة ذات الفاصلة $1$ التي تشكل ثقباً (نقطة معزولة).\nأما للدالة $h(x) = \\frac{2x^2 - 3x + 5}{x - 1} = 2x - 1 + \\frac{4}{x - 1}$:\n$\\lim_{x \\to \\pm\\infty} [h(x) - (2x - 1)] = \\lim_{x \\to \\pm\\infty} \\frac{4}{x - 1} = 0$.\nإذن المستقيم $(\\Delta): y = 2x - 1$ مقارب مائل لـ $(C_h)$.\nالوضعية: إشارة الفرق $h(x) - y = \\frac{4}{x - 1}$ موجبة عند $x > 1$ ($(C_h)$ فوق المقارب)، وسالبة عند $x < 1$ ($(C_h)$ تحت المقارب).'
				}
			],
			watchOutAr: 'عند إزالة عدم التعيين في الجذور $\\sqrt{A} - B$ عند اللانهاية بواسطة العامل المرافق، انتبه عند استخراج $x$ من تحت الجذر التربيعي: $\\sqrt{x^2} = |x|$، وهو يساوي $x$ عندما $x \\to +\\infty$ ويساوي $-x$ عندما $x \\to -\\infty$!'
		},
		practice: [
			{
				questionAr: 'قيمة النهاية $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2}$ تساوي:',
				options: [
					'$\\frac{1}{2}$',
					'$0$',
					'$1$',
					'$+\\infty$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! بالضرب في المرافق $(1 + \\cos x)$: البسط يصبح $1 - \\cos^2 x = \\sin^2 x$. فتكون النهاية $\\lim \\left(\\frac{\\sin x}{x}\\right)^2 \\times \\frac{1}{1 + \\cos x} = 1^2 \\times \\frac{1}{2} = \\frac{1}{2}$.',
					'خطأ تشخيصي: التعويض المباشر يعطي حالة عدم تعيين $0/0$ ولا يساوي صفراً.',
					'خطأ تشخيصي: $1$ هي نهاية $\\frac{\\sin x}{x}$ أو $\\frac{1 - \\cos x}{x}$ بالعدد المشتق.',
					'خطأ تشخيصي: النهاية منتهية ومضبوطة وتساوي نصفاً.'
				],
				explanationAr: 'نضرب البسط والمقام في المرافق $(1 + \\cos x)$:\n$$\\frac{1 - \\cos x}{x^2} = \\frac{(1 - \\cos x)(1 + \\cos x)}{x^2 (1 + \\cos x)} = \\frac{1 - \\cos^2 x}{x^2(1 + \\cos x)} = \\left(\\frac{\\sin x}{x}\\right)^2 \\times \\frac{1}{1 + \\cos x}$$\nبما أن $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ و $\\lim_{x \\to 0} (1 + \\cos x) = 2$، فإن حاصل النهاية هو: $1^2 \\times \\frac{1}{2} = \\frac{1}{2}$.'
			},
			{
				questionAr: 'معادلة المقارب المائل للمنحنى الممثل للدالة $f(x) = \\frac{x^2 + 3x - 2}{x + 1}$ بجوار $+\\infty$ هي:',
				options: [
					'$y = x + 2$',
					'$y = x + 3$',
					'$y = x - 1$',
					'$y = x$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! بقسمة البسط على المقام: $x^2 + 3x - 2 = (x + 1)(x + 2) - 4$. إذن $f(x) = x + 2 - \\frac{4}{x + 1}$. نهاية الفرق هي $\\lim -\\frac{4}{x+1} = 0$. إذن المقارب هو $y = x + 2$.',
					'خطأ تشخيصي: أخذت المعامل الثابت للبسط دون إتمام القسمة الإقليدية.',
					'خطأ تشخيصي: خطأ في إشارة حاصل القسمة الإقليدية.',
					'خطأ تشخيصي: أهملت الحد الثابت الناتج عن القسمة.'
				],
				explanationAr: 'نكتب $f(x)$ على الشكل النموذجي بالقسمة الإقليدية:\n$$f(x) = \\frac{(x+1)(x+2) - 4}{x+1} = (x + 2) - \\frac{4}{x + 1}$$\nنحسب نهاية الفرق: $\\lim_{x \\to +\\infty} [f(x) - (x + 2)] = \\lim_{x \\to +\\infty} \\left(-\\frac{4}{x+1}\\right) = 0$.\nبالتالي المستقيم ذو المعادلة $y = x + 2$ مقارب مائل للمنحنى $(C_f)$.'
			},
			{
				questionAr: 'إذا كانت $\\lim_{x \\to +\\infty} \\frac{f(x)}{x} = +\\infty$، فإن التفسير البياني لسلوك المنحنى $(C_f)$ هو:',
				options: [
					'المنحنى يقبل فرعاً شلجمياً باتجاه محور التراتيب',
					'المنحنى يقبل فرعاً شلجمياً باتجاه محور الفواصل',
					'المنحنى يقبل مستقيماً مقارباً مائلاً',
					'المنحنى يقبل مستقيماً مقارباً أفقياً'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! عندما ينمو المنحنى أسرع بكثير من $x$ وتكون نهاية $\\frac{f(x)}{x}$ غير منتهية، فإن المنحنى يبتعد شلجمياً بمحاذاة محور التراتيب.',
					'خطأ تشخيصي: فرع محور الفواصل يحدث عندما تكون النهاية معدومة $\\lim \\frac{f(x)}{x} = 0$.',
					'خطأ تشخيصي: المقارب المائل يتطلب أن تكون $\\lim \\frac{f(x)}{x} = a$ عدداً حقيقياً منتهياً غير معدوم.',
					'خطأ تشخيصي: المقارب الأفقي يتطلب أن تكون نهاية $f(x)$ نفسها منتهية.'
				],
				explanationAr: 'وفق تصنيف الفروع اللانهائية: إذا كانت $\\lim_{x \\to +\\infty} f(x) = \\pm\\infty$ وكانت $\\lim_{x \\to +\\infty} \\frac{f(x)}{x} = \\pm\\infty$، فإن المنحنى $(C_f)$ يقبل فرعاً شلجمياً (Branche parabolique) باتجاه محور التراتيب.'
			}
		]
	},

	// --------------------------------------------------------------------------
	// 3. Oriented Angles, Inscribed Angle Theorem & Cocyclicity
	// --------------------------------------------------------------------------
	{
		id: 'lesson_2as_math_t2_oriented_angles_properties_inscribed_angle_theorem',
		slug: '2as-math-oriented-angles-properties-inscribed-angle-theorem',
		grade: '2as_math',
		yearSubjectId: 692,
		trimesterId: 't2',
		sequenceId: 'seq5',
		sequenceTitleAr: 'المقطع الخامس: الزوايا الموجهة المعمقة وحساب المثلثات المتقدم',
		order: 3,
		titleAr: 'الزوايا الموجهة المعمقة: الخواص الشعاعية، نظرية الزاوية المحيطية والرباعيات الدائرية',
		objectives: [
			'البرهان على خواص الزوايا الموجهة لشعاعين وعلاقة شال وتطبيقاتها الشعاعية الصارمة',
			'البرهان على نظرية الزاوية المحيطية بالزوايا الموجهة: 2(MA, MB) = (OA, OB) [2π]',
			'شرط دائرية أربع نقط (Cocyclycity) باستعمال الزوايا الموجهة لإثبات وقوع 4 نقط على دائرة واحدة',
			'استعمال الزوايا الموجهة لإثبات الاستقامية وتعامد المستقيمات ومحاور التناظر الدوراني'
		],
		keywordsAr: [
			'الزوايا الموجهة الشعاعية',
			'نظرية الزاوية المحيطية',
			'الرباعي الدائري',
			'دائرية أربع نقط',
			'التعامد بالزوايا الموجهة'
		],
		discover: {
			scenarioAr: 'لتكن دائرة $(\\mathcal{C})$ مركزها $O$ ونقطتان متمايزتان $A$ و $B$ منها. نعتبر نقطة متحركة $M$ على محيط الدائرة تختلف عن $A$ و $B$. نريد دراسة الزاوية الموجهة للوترين $(\\vec{MA}, \\vec{MB})$ وعلاقتها بالزاوية المركزية $(\\vec{OA}, \\vec{OB})$، واستنتاج الشرط الرياضي الصارم لوقوع أربع نقط على دائرة واحدة (دائرية النقط Cocyclicity).',
			svg: svgInscribedAngleDiagram(),
			steps: [
				{
					promptAr: 'في المثلث المتساوي الساقين $OAM$ (حيث $OA = OM = R$)، عبر عن مجموع زواياه بدلالة الزوايا الموجهة.',
					hintAr: 'المثلث متساوي الساقين في $O$، إذن زاوية القاعدة $(\\vec{MA}, \\vec{MO}) = (\\vec{OA}, \\vec{OM})$ بترديد مناسب.',
					expectedInput: '(OA, OM) + 2(MA, MO) = π [2π]',
					revealAr: 'في المثلث المتساوي الساقين $OAM$:\n$$(\\vec{OA}, \\vec{OM}) + 2(\\vec{MO}, \\vec{MA}) \\equiv \\pi \\pmod{2\\pi}$$\nوبالمثل في المثلث المتساوي الساقين $OBM$:\n$$(\\vec{OM}, \\vec{OB}) + 2(\\vec{MB}, \\vec{MO}) \\equiv \\pi \\pmod{2\\pi}$$'
				},
				{
					promptAr: 'اجمع العلاقتين باستخدام علاقة شال واستنتج العلاقة بين الزاوية المحيطية والزاوية المركزية.',
					hintAr: 'علاقة شال: $(\\vec{OA}, \\vec{OM}) + (\\vec{OM}, \\vec{OB}) = (\\vec{OA}, \\vec{OB})$.',
					expectedInput: '2(MA, MB) = (OA, OB) [2π]',
					revealAr: 'بجمع المعادلتين وتطبيق علاقة شال للأشعة:\n$$(\\vec{OA}, \\vec{OB}) + 2(\\vec{MA}, \\vec{MB}) \\equiv 2\\pi \\equiv 0 \\pmod{2\\pi}$$\nومنه نصل إلى الدستور الأساسي لنظرية الزاوية المحيطية:\n$$2(\\vec{MA}, \\vec{MB}) \\equiv (\\vec{OA}, \\vec{OB}) \\pmod{2\\pi}$$'
				},
				{
					promptAr: 'لتكن $N$ نقطة أخرى من الدائرة. ما هي العلاقة بين الزاويتين المحيطيتين $(\\vec{MA}, \\vec{MB})$ و $(\\vec{NA}, \\vec{NB})$؟',
					hintAr: 'كلاهما يحقق ضعف الزاوية مساوٍ لنفس الزاوية المركزية.',
					expectedInput: '(MA, MB) = (NA, NB) [π]',
					revealAr: 'لدينا $2(\\vec{MA}, \\vec{MB}) \\equiv (\\vec{OA}, \\vec{OB}) \\pmod{2\\pi}$ و $2(\\vec{NA}, \\vec{NB}) \\equiv (\\vec{OA}, \\vec{OB}) \\pmod{2\\pi}$.\nبالتالي: $2(\\vec{MA}, \\vec{MB}) \\equiv 2(\\vec{NA}, \\vec{NB}) \\pmod{2\\pi}$.\nوبالقسمة على $2$ نجد **شرط الدائرية**:\n$$(\\vec{MA}, \\vec{MB}) \\equiv (\\vec{NA}, \\vec{NB}) \\pmod{\\pi}$$\nأي أن النقط الأربع $A, B, M, N$ تنتمي إلى دائرة واحدة (أو على استقامة واحدة).'
				}
			]
		},
		summary: {
			rulesAr: [
				'**خواص الزوايا الموجهة لشعاعين**:\n- علاقة شال (Relation de Chasles): $(\\vec{u}, \\vec{v}) + (\\vec{v}, \\vec{w}) \\equiv (\\vec{u}, \\vec{w}) \\pmod{2\\pi}$\n- التناظر والتعاكس:\n  * $(\\vec{v}, \\vec{u}) \\equiv -(\\vec{u}, \\vec{v}) \\pmod{2\\pi}$\n  * $(-\\vec{u}, \\vec{v}) \\equiv (\\vec{u}, \\vec{v}) + \\pi \\pmod{2\\pi}$\n  * $(-\\vec{u}, -\\vec{v}) \\equiv (\\vec{u}, \\vec{v}) \\pmod{2\\pi}$',
				'**الاستقامية والتعامد بالزوايا الموجهة**:\n- يكون الشعاعان $\\vec{u}$ و $\\vec{v}$ **مرتبطين خطياً** (النقط على استقامة واحدة) إذا وفقط إذا كان: $(\\vec{u}, \\vec{v}) \\equiv 0 \\pmod{\\pi}$.\n- يكون الشعاعان $\\vec{u}$ و $\\vec{v}$ **متعامدين** إذا وفقط إذا كان: $(\\vec{u}, \\vec{v}) \\equiv \\frac{\\pi}{2} \\pmod{\\pi}$.',
				'**مبرهنة الزاوية المحيطية (Théorème de l\'angle inscrit)**:\nلتكن $(\\mathcal{C})$ دائرة مركزها $O$، و $A, B$ نقطتان منها. من أجل كل نقطة $M$ من الدائرة تختلف عن $A$ و $B$:\n$$2(\\vec{MA}, \\vec{MB}) \\equiv (\\vec{OA}, \\vec{OB}) \\pmod{2\\pi}$$',
				'**شرط دائرية أربع نقط (Cocyclicity)**:\nتكون أربع نقط $A, B, C, D$ متمايزة مثنى مثنى واقعة على **دائرة واحدة** (أو على استقامة واحدة) إذا وفقط إذا تحقق: $$(\\vec{CA}, \\vec{CB}) \\equiv (\\vec{DA}, \\vec{DB}) \\pmod{\\pi}$$\nوفي رباعي محدب دائري $ABCD$: مجموع الزاويتين المتقابلتين يساوي $\\pi$ (متكاملتان).'
			],
			visualSvg: svgInscribedAngleDiagram(),
			visualCaptionAr: 'العلاقة بين الزاوية المحيطية والزاوية المركزية الحاصرتين لنفس القوس وثبات قياس الزاوية المحيطية بترديد π',
			examples: [
				{
					problemAr: 'ليكن $ABC$ مثلثاً متساوي الأضلاع مباشر، ولتكن $(\\mathcal{C})$ الدائرة المحيطة به. احسب قيس الزاوية المركزية $(\\vec{OB}, \\vec{OC})$ والزاوية المحيطية $(\\vec{AB}, \\vec{AC})$.',
					solutionAr: 'بما أن المثلث متساوي الأضلاع ومباشر، فإن الزاوية المحيطية عند الرأس $A$ هي:\n$$(\\vec{AB}, \\vec{AC}) \\equiv -\\frac{\\pi}{3} \\pmod{2\\pi} \\quad \\quad ; \quad \\quad (\\vec{AC}, \\vec{AB}) \\equiv \\frac{\\pi}{3} \\pmod{2\\pi}$$\nحسب نظرية الزاوية المحيطية: $(\\vec{OB}, \\vec{OC}) \\equiv 2(\\vec{AB}, \\vec{AC}) \\pmod{2\\pi}$.\nإذن: $(\\vec{OB}, \\vec{OC}) \\equiv 2\\left(\\frac{\\pi}{3}\\right) = \\frac{2\\pi}{3} \\pmod{2\\pi}$.'
				},
				{
					problemAr: 'أثبت أن النقط $A, B, C, D$ تنتمي إلى دائرة واحدة إذا كان المثلثان $ABC$ و $ABD$ قائمين في $C$ و $D$ على التوالي ويشتركان في الوتر $[AB]$.',
					solutionAr: 'بما أن المثلث $ABC$ قائم في $C$، فإن الوتر هو $[AB]$ ويكون: $(\\vec{CA}, \\vec{CB}) \\equiv \\frac{\\pi}{2} \\pmod{\\pi}$.\nوبما أن المثلث $ABD$ قائم في $D$، فإن: $(\\vec{DA}, \\vec{DB}) \\equiv \\frac{\\pi}{2} \\pmod{\\pi}$.\nنلاحظ أن: $(\\vec{CA}, \\vec{CB}) \\equiv (\\vec{DA}, \\vec{DB}) \\equiv \\frac{\\pi}{2} \\pmod{\\pi}$.\nبما أن شرط الدائرية محقق بترديد $\\pi$، فإن النقط الأربع $A, B, C, D$ **تنتمي إلى نفس الدائرة**، ومركز هذه الدائرة هو منتصف الوتر المشترك $[AB]$ ونصف قطرها $\\frac{AB}{2}$.'
				}
			],
			watchOutAr: 'انتبه بشدة إلى الترديد! عند الحديث عن الأشعة والاتجاه المباشر يكون الترديد $[2\\pi]$، لكن عند الانتقال إلى شرط الدائرية للنقط أو المستقيمات يصبح الترديد $[\\pi]$ لأن النقطة $M$ إذا انتقلت إلى القوس المقابل ينقلب الاتجاه ويضاف $\\pi$ إلى الزاوية.'
		},
		practice: [
			{
				questionAr: 'إذا كانت $(\\vec{u}, \\vec{v}) \\equiv \\frac{\\pi}{4} [2\\pi]$ و $(\\vec{w}, \\vec{v}) \\equiv \\frac{2\\pi}{3} [2\\pi]$، فإن قيس الزاوية $(\\vec{u}, \\vec{w})$ هو:',
				options: [
					'$-\\frac{5\\pi}{12} [2\\pi]$',
					'$\\frac{11\\pi}{12} [2\\pi]$',
					'$\\frac{5\\pi}{12} [2\\pi]$',
					'$-\\frac{11\\pi}{12} [2\\pi]$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! نطبق علاقة شال: $(\\vec{u}, \\vec{w}) = (\\vec{u}, \\vec{v}) + (\\vec{v}, \\vec{w}) = (\\vec{u}, \\vec{v}) - (\\vec{w}, \\vec{v}) = \\frac{\\pi}{4} - \\frac{2\\pi}{3} = \\frac{3\\pi - 8\\pi}{12} = -\\frac{5\\pi}{12} [2\\pi]$.',
					'خطأ تشخيصي: جمعت الزاويتين مباشرة دون الانتباه إلى أن الشعاع الثاني معكوس $(\\vec{w}, \\vec{v}) = -(\\vec{v}, \\vec{w})$.',
					'خطأ تشخيصي: نسيت الإشارة السالبة لناتج الطرح $3\\pi - 8\\pi = -5\\pi$.',
					'خطأ تشخيصي: الحساب غير مطابق لعلاقة شال.'
				],
				explanationAr: 'وفق علاقة شال للزوايا الموجهة:\n$$(\\vec{u}, \\vec{w}) \\equiv (\\vec{u}, \\vec{v}) + (\\vec{v}, \\vec{w}) \\pmod{2\\pi}$$\nنعلم أن $(\\vec{v}, \\vec{w}) \\equiv -(\\vec{w}, \\vec{v}) = -\\frac{2\\pi}{3}$.\nنعوض:\n$$(\\vec{u}, \\vec{w}) \\equiv \\frac{\\pi}{4} - \\frac{2\\pi}{3} = \\frac{3\\pi - 8\\pi}{12} = -\\frac{5\\pi}{12} \\pmod{2\\pi}$$.'
			},
			{
				questionAr: 'الشرط اللازم والكافي لتكون أربع نقط متمايزة $A, B, C, D$ دائرية (تقع على دائرة واحدة) هو:',
				options: [
					'$(\\vec{CA}, \\vec{CB}) \\equiv (\\vec{DA}, \\vec{DB}) [\\pi]$',
					'$(\\vec{CA}, \\vec{CB}) \\equiv (\\vec{DA}, \\vec{DB}) [2\\pi]$ فقط',
					'$(\\vec{CA}, \\vec{CB}) + (\\vec{DA}, \\vec{DB}) \\equiv 0 [2\\pi]$',
					'$CA \\times CB = DA \\times DB$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة ودقيقة! شرط الدائرية العام يجب أن يكون بترديد $\\pi$ ليشمل وقوع النقطتين $C$ و $D$ في نفس الجهة من الوتر $[AB]$ أو في جهتين متقابلتين.',
					'خطأ تشخيصي: الترديد $[2\\pi]$ يشترط وقوع النقطتين في نفس القوس فقط ويهمل حالة القوس المقابل حيث تختلف الزاوية بـ $\\pi$.',
					'خطأ تشخيصي: هذا شرط تماثل خاص وليس شرط الدائرية العام.',
					'خطأ تشخيصي: جداء الأطوال لا يعبر عن دائرية النقط دون الزوايا.'
				],
				explanationAr: 'مبرهنة دائرية أربع نقط تنص على أن النقط $A, B, C, D$ تقع على دائرة واحدة إذا وفقط إذا تساوت الزاويتان المحيطيتان بترديد $\\pi$: $(\\vec{CA}, \\vec{CB}) \\equiv (\\vec{DA}, \\vec{DB}) \\pmod{\\pi}$.'
			},
			{
				questionAr: 'في دائرة $(\\mathcal{C})$، إذا كانت الزاوية المركزية $(\\vec{OA}, \\vec{OB}) \\equiv \\frac{2\\pi}{3} [2\\pi]$، فإن قيس الزاوية المحيطية $(\\vec{MA}, \\vec{MB})$ للنقطة $M$ الواقعة على القوس الأكبر هو:',
				options: [
					'$\\frac{\\pi}{3} [\\pi]$',
					'$\\frac{2\\pi}{3} [\\pi]$',
					'$\\frac{4\\pi}{3} [2\\pi]$',
					'$\\frac{\\pi}{6} [\\pi]$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! حسب نظرية الزاوية المحيطية: $2(\\vec{MA}, \\vec{MB}) \\equiv (\\vec{OA}, \\vec{OB}) \\equiv \\frac{2\\pi}{3} [2\\pi]$. بالقسمة على $2$ نجد $(\\vec{MA}, \\vec{MB}) \\equiv \\frac{\\pi}{3} [\\pi]$.',
					'خطأ تشخيصي: الزاوية المحيطية تساوي نصف الزاوية المركزية وليس نفسها.',
					'خطأ تشخيصي: ضاعفت الزاوية بدلاً من قسمتها على $2$.',
					'خطأ تشخيصي: قسمت على $4$ بدلاً من القسمة على $2$.'
				],
				explanationAr: 'حسب نظرية الزاوية المحيطية:\n$$2(\\vec{MA}, \\vec{MB}) \\equiv (\\vec{OA}, \\vec{OB}) \\equiv \\frac{2\\pi}{3} \\pmod{2\\pi}$$\nبقسمة الطرفين والترديد على $2$:\n$$(\\vec{MA}, \\vec{MB}) \\equiv \\frac{1}{2} \\left(\\frac{2\\pi}{3}\\right) = \\frac{\\pi}{3} \\pmod{\\pi}$$.'
			}
		]
	},

	// --------------------------------------------------------------------------
	// 4. Advanced Trigonometry: Carnot & Simpson Formulas, Equations & Inequalities
	// --------------------------------------------------------------------------
	{
		id: 'lesson_2as_math_t2_trigonometry_advanced_formulas_linear_equations_inequalities',
		slug: '2as-math-trigonometry-advanced-formulas-linear-equations-inequalities',
		grade: '2as_math',
		yearSubjectId: 692,
		trimesterId: 't2',
		sequenceId: 'seq5',
		sequenceTitleAr: 'المقطع الخامس: الزوايا الموجهة المعمقة وحساب المثلثات المتقدم',
		order: 4,
		titleAr: 'حساب المثلثات المعمق: دساتير التحويل، تحويل الجداء إلى مجموع والعكس، والمعادلات والمتراجحات المثلثية',
		objectives: [
			'البرهان الهندسي والجبري الصارم على دساتير الجمع بواسطة الجداء السلمي',
			'دساتير تحويل الجداءات إلى مجاميع والمجاميع إلى جداءات (صيغ كارنو وسيمبسون)',
			'حل ومناقشة المعادلات المثلثية من الشكل a cos x + b sin x = c وحساب القيم المضبوطة للزوايا غير الشهيرة (مثل π/12 و π/8)',
			'حل متراجحات مثلثية غير خطية ودراسة إشارة عبارات مثلثية على مجالات دورية'
		],
		keywordsAr: [
			'دساتير كارنو وسيمبسون',
			'تحويل الجداء إلى مجموع',
			'المعادلات a cos x + b sin x = c',
			'القيم المضبوطة لـ π/12',
			'المتراجحات المثلثية المتقدمة'
		],
		discover: {
			scenarioAr: 'نريد حساب القيمة المضبوطة لـ $\\cos\\left(\\frac{\\pi}{12}\\right)$ و $\\sin\\left(\\frac{\\pi}{12}\\right)$، وحل المعادلة المثلثية الخطية الشهيرة: $\\sqrt{3}\\cos x + \\sin x = \\sqrt{2}$. كيف نوظف دساتير الجمع والتحويل وتحويل العبارة التآلفية إلى جيب تمام زاوية وحيدة $R\\cos(x - \\varphi)$ للوصول إلى الحلول المضبوطة؟',
			svg: svgTrigonometricCircle({
				anglesRad: [
					{ rad: Math.PI / 6, label: 'π/6', color: '#2563eb' },
					{ rad: Math.PI / 4, label: 'π/4', color: '#16a34a' },
					{ rad: Math.PI / 12, label: 'π/12', color: '#dc2626' }
				]
			}),
			steps: [
				{
					promptAr: 'عبر عن $\\frac{\\pi}{12}$ كفرق بين زاويتين شهيرتين، ثم طبق دستور جمع جيب التمام $\\cos(a - b)$.',
					hintAr: 'لاحظ أن $\\frac{\\pi}{12} = \\frac{\\pi}{3} - \\frac{\\pi}{4}$ (أو $\\frac{\\pi}{4} - \\frac{\\pi}{6}$).',
					expectedInput: 'cos(π/12) = (√6 + √2)/4',
					revealAr: 'نكتب $\\frac{\\pi}{12} = \\frac{\\pi}{4} - \\frac{\\pi}{6}$.\nدستور الجمع: $\\cos(a - b) = \\cos a \\cos b + \\sin a \\sin b$.\n$$\\cos\\left(\\frac{\\pi}{12}\\right) = \\cos\\left(\\frac{\\pi}{4}\\right)\\cos\\left(\\frac{\\pi}{6}\\right) + \\sin\\left(\\frac{\\pi}{4}\\right)\\sin\\left(\\frac{\\pi}{6}\\right)$$\n$$= \\left(\\frac{\\sqrt{2}}{2}\\right)\\left(\\frac{\\sqrt{3}}{2}\\right) + \\left(\\frac{\\sqrt{2}}{2}\\right)\\left(\\frac{1}{2}\\right) = \\frac{\\sqrt{6} + \\sqrt{2}}{4}$$'
				},
				{
					promptAr: 'حول العبارة $\\sqrt{3}\\cos x + \\sin x$ إلى الشكل $R\\cos(x - \\varphi)$.',
					hintAr: 'احسب $R = \\sqrt{a^2 + b^2} = \\sqrt{(\\sqrt{3})^2 + 1^2} = \\sqrt{4} = 2$. ثم اقسم على $R$.',
					expectedInput: '2 cos(x - π/6)',
					revealAr: '$R = \\sqrt{(\\sqrt{3})^2 + 1^2} = 2$.\nنستخرج $2$ كعامل مشترك:\n$$\\sqrt{3}\\cos x + \\sin x = 2\\left(\\frac{\\sqrt{3}}{2}\\cos x + \\frac{1}{2}\\sin x\\right)$$\nبما أن $\\cos\\left(\\frac{\\pi}{6}\\right) = \\frac{\\sqrt{3}}{2}$ و $\\sin\\left(\\frac{\\pi}{6}\\right) = \\frac{1}{2}$، نجد بتطبيق دستور الجمع:\n$$2\\left(\\cos x \\cos\\frac{\\pi}{6} + \\sin x \\sin\\frac{\\pi}{6}\\right) = 2\\cos\\left(x - \\frac{\\pi}{6}\\right)$$'
				},
				{
					promptAr: 'حل في المجال $]-\\pi; \\pi]$ المعادلة $\\sqrt{3}\\cos x + \\sin x = \\sqrt{2}$.',
					hintAr: 'المعادلة تكافئ $2\\cos(x - \\pi/6) = \\sqrt{2} \\iff \\cos(x - \\pi/6) = \\frac{\\sqrt{2}}{2} = \\cos(\\pi/4)$.',
					expectedInput: 'x = 5π/12 أو x = -π/12',
					revealAr: 'المعادلة تكافئ: $\\cos\\left(x - \\frac{\\pi}{6}\\right) = \\frac{\\sqrt{2}}{2} = \\cos\\left(\\frac{\\pi}{4}\\right)$.\nإذن:\n1) $x - \\frac{\\pi}{6} = \\frac{\\pi}{4} \\iff x = \\frac{\\pi}{4} + \\frac{\\pi}{6} = \\frac{5\\pi}{12}$.\n2) $x - \\frac{\\pi}{6} = -\\frac{\\pi}{4} \\iff x = -\\frac{\\pi}{4} + \\frac{\\pi}{6} = -\\frac{\\pi}{12}$.\nكلا الحلين ينتمي إلى المجال $]-\\pi; \\pi]$. إذن مجموعة الحلول هي: $S = \\left\\{-\\frac{\\pi}{12}; \\frac{5\\pi}{12}\\right\\}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**دساتير الجمع الأساسية (Formules d\'addition)**:\n- $\\cos(a + b) = \\cos a \\cos b - \\sin a \\sin b$\n- $\\cos(a - b) = \\cos a \\cos b + \\sin a \\sin b$\n- $\\sin(a + b) = \\sin a \\cos b + \\cos a \\sin b$\n- $\\sin(a - b) = \\sin a \\cos b - \\cos a \\sin b$',
				'**دساتير مضاعفة الزاوية ونصفها (صيغ كارنو Carnot)**:\n- $\\cos(2a) = \\cos^2 a - \\sin^2 a = 2\\cos^2 a - 1 = 1 - 2\\sin^2 a$\n- $\\sin(2a) = 2\\sin a \\cos a$\n- دساتير خفض الدرجة: $$\\cos^2 a = \\frac{1 + \\cos(2a)}{2} \\quad \\quad , \quad \\quad \\sin^2 a = \\frac{1 - \\cos(2a)}{2}$$',
				'**دساتير سيمبسون (Simpson) لتحويل الجداء إلى مجموع والعكس**:\n- **من جداء إلى مجموع**:\n  * $\\cos a \\cos b = \\frac{1}{2}[\\cos(a+b) + \\cos(a-b)]$\n  * $\\sin a \\sin b = \\frac{1}{2}[\\cos(a-b) - \\cos(a+b)]$\n  * $\\sin a \\cos b = \\frac{1}{2}[\\sin(a+b) + \\sin(a-b)]$\n- **من مجموع إلى جداء** ($p = a+b, q = a-b$):\n  * $\\cos p + \\cos q = 2\\cos\\left(\\frac{p+q}{2}\\right)\\cos\\left(\\frac{p-q}{2}\\right)$\n  * $\\cos p - \\cos q = -2\\sin\\left(\\frac{p+q}{2}\\right)\\sin\\left(\\frac{p-q}{2}\\right)$\n  * $\\sin p + \\sin q = 2\\sin\\left(\\frac{p+q}{2}\\right)\\cos\\left(\\frac{p-q}{2}\\right)$',
				'**حل المعادلة الخطية $a\\cos x + b\\sin x = c$** ($a^2 + b^2 \\ne 0$):\nنضع $R = \\sqrt{a^2 + b^2}$، ونعين الزاوية $\\varphi$ بحيث $\\cos\\varphi = \\frac{a}{R}$ و $\\sin\\varphi = \\frac{b}{R}$.\nتتحول المعادلة إلى: $$R \\cos(x - \\varphi) = c \\iff \\cos(x - \\varphi) = \\frac{c}{R}$$\n- تقبل حلولاً إذا وفقط إذا كان $|c| \\le \\sqrt{a^2 + b^2}$.'
			],
			visualSvg: svgTrigonometricCircle({
				anglesRad: [
					{ rad: 0, label: '0', color: '#475569' },
					{ rad: Math.PI / 6, label: 'π/6', color: '#2563eb' },
					{ rad: Math.PI / 4, label: 'π/4', color: '#16a34a' },
					{ rad: Math.PI / 3, label: 'π/3', color: '#dc2626' },
					{ rad: Math.PI / 2, label: 'π/2', color: '#475569' }
				]
			}),
			visualCaptionAr: 'الدائرة المثلثية للربط بين الزوايا الشهيرة ودساتير الجمع والتحويل لتحديد القيم المضبوطة',
			examples: [
				{
					problemAr: 'احسب القيمة المضبوطة لـ $\\cos\\left(\\frac{\\pi}{8}\\right)$ باستعمال دساتير كارنو.',
					solutionAr: 'نضع $a = \\frac{\\pi}{8}$، فيكون $2a = \\frac{\\pi}{4}$.\nنطبق دستور خفض الدرجة: $\\cos^2 a = \\frac{1 + \\cos(2a)}{2}$.\n$$\\cos^2\\left(\\frac{\\pi}{8}\\right) = \\frac{1 + \\cos(\\pi/4)}{2} = \\frac{1 + \\frac{\\sqrt{2}}{2}}{2} = \\frac{2 + \\sqrt{2}}{4}$$\nبما أن $\\frac{\\pi}{8} \\in \\left]0; \\frac{\\pi}{2}\\right[$ فإن جيب التمام موجب تماماً، ومنه:\n$$\\cos\\left(\\frac{\\pi}{8}\\right) = \\frac{\\sqrt{2 + \\sqrt{2}}}{2}$$.'
				},
				{
					problemAr: 'حل في المجال $[0; 2\\pi[$ المتراجحة المثلثية: $2\\cos x - 1 \\ge 0$.',
					solutionAr: 'المتراجحة تكافئ: $\\cos x \\ge \\frac{1}{2}$.\nعلى الدائرة المثلثية، النقط التي فاصلتها أكبر من أو تساوي $\\frac{1}{2}$ تقع على القوس المحصور بين $-\\frac{\\pi}{3}$ و $\\frac{\\pi}{3}$.\nبتحويل المجال إلى $[0; 2\\pi[$:\n- الجزء الأول: $\\left[0; \\frac{\\pi}{3}\\right]$\n- الجزء الثاني: $\\left[\\frac{5\\pi}{3}; 2\\pi\\right[$\nإذن مجموعة حلول المتراجحة هي: $S = \\left[0; \\frac{\\pi}{3}\\right] \\cup \\left[\\frac{5\\pi}{3}; 2\\pi\\right[$.'
				}
			],
			watchOutAr: 'في المتراجحات المثلثية، احذر كتابة الحلول كمجال واحد سالب-موجب إذا كان المجال المفروض في نص التمرين هو $[0; 2\\pi[$! فالقوس $\\left[-\\frac{\\pi}{3}; \\frac{\\pi}{3}\\right]$ يجب تجزئته إلى $\\left[0; \\frac{\\pi}{3}\\right] \\cup \\left[\\frac{5\\pi}{3}; 2\\pi\\right[$ ليتوافق مع شروط المجال المطلوب.'
		},
		practice: [
			{
				questionAr: 'القيمة المضبوطة لـ $\\sin\\left(\\frac{\\pi}{12}\\right)$ هي:',
				options: [
					'$\\frac{\\sqrt{6} - \\sqrt{2}}{4}$',
					'$\\frac{\\sqrt{6} + \\sqrt{2}}{4}$',
					'$\\frac{\\sqrt{3} - 1}{2}$',
					'$\\frac{\\sqrt{2} - 1}{2}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! نطبق $\\sin(\\frac{\\pi}{4} - \\frac{\\pi}{6}) = \\sin\\frac{\\pi}{4}\\cos\\frac{\\pi}{6} - \\cos\\frac{\\pi}{4}\\sin\\frac{\\pi}{6} = \\frac{\\sqrt{2}}{2}\\frac{\\sqrt{3}}{2} - \\frac{\\sqrt{2}}{2}\\frac{1}{2} = \\frac{\\sqrt{6}-\\sqrt{2}}{4}$.',
					'خطأ تشخيصي: هذه قيمة جيب التمام $\\cos(\\pi/12)$ وليس الجيب $\\sin(\\pi/12)$.',
					'خطأ تشخيصي: هذا تقريب غير دقيق وناقص عامل الجذر التربيعي بالمقام.',
					'خطأ تشخيصي: الحساب غير مطابق لدساتير الجمع.'
				],
				explanationAr: 'باستعمال دستور فرق زاويتين: $\\sin(a - b) = \\sin a \\cos b - \\cos a \\sin b$.\nنضع $a = \\frac{\\pi}{4}$ و $b = \\frac{\\pi}{6}$:\n$$\\sin\\left(\\frac{\\pi}{12}\\right) = \\sin\\left(\\frac{\\pi}{4}\\right)\\cos\\left(\\frac{\\pi}{6}\\right) - \\cos\\left(\\frac{\\pi}{4}\\right)\\sin\\left(\\frac{\\pi}{6}\\right) = \\frac{\\sqrt{2}}{2}\\frac{\\sqrt{3}}{2} - \\frac{\\sqrt{2}}{2}\\frac{1}{2} = \\frac{\\sqrt{6} - \\sqrt{2}}{4}$$.'
			},
			{
				questionAr: 'تحويل المجموع $\\cos(3x) + \\cos(x)$ إلى جداء باستعمال دساتير سيمبسون يعطي:',
				options: [
					'$2\\cos(2x)\\cos(x)$',
					'$2\\cos(4x)\\cos(2x)$',
					'$-2\\sin(2x)\\sin(x)$',
					'$2\\sin(2x)\\cos(x)$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! قاعدة سيمبسون: $\\cos p + \\cos q = 2\\cos(\\frac{p+q}{2})\\cos(\\frac{p-q}{2})$. هنا $p = 3x$ و $q = x$، إذن $\\frac{p+q}{2} = 2x$ و $\\frac{p-q}{2} = x$. النتيجة $2\\cos(2x)\\cos(x)$.',
					'خطأ تشخيصي: نسيت القسمة على $2$ في الزوايا الداخلية.',
					'خطأ تشخيصي: هذا تحويل فرق جيب التمام $\\cos p - \\cos q$ وليس المجموع.',
					'خطأ تشخيصي: تحويل مجموع جيبي التمام ينتج جداء جيبي تمام وليس جيباً وجيب تمام.'
				],
				explanationAr: 'دستور سيمبسون لمجموع جيبي تمام هو:\n$$\\cos p + \\cos q = 2\\cos\\left(\\frac{p + q}{2}\\right)\\cos\\left(\\frac{p - q}{2}\\right)$$\nبتعويض $p = 3x$ و $q = x$:\n$$\\cos(3x) + \\cos(x) = 2\\cos\\left(\\frac{3x + x}{2}\\right)\\cos\\left(\\frac{3x - x}{2}\\right) = 2\\cos(2x)\\cos(x)$$.'
			},
			{
				questionAr: 'المعادلة المثلثية $\\cos x - \\sqrt{3}\\sin x = 3$ تقبل في $\\mathbb{R}$:',
				options: [
					'المجموعة الخالية $\\emptyset$ (لا تقبل أي حل)',
					'حلين متمايزين بترديد $2\\pi$',
					'حلاً وحيداً مضاعفاً',
					'عدداً غير منته من الحلول لأن الدالة دورية'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'تحليل ممتاز! نحسب $R = \\sqrt{a^2 + b^2} = \\sqrt{1^2 + (-\\sqrt{3})^2} = \\sqrt{4} = 2$. والطرف الأيمن $c = 3$. بما أن $|c| = 3 > R = 2$، فإن المعادلة مستحيلة الحل لأن قيمة جيب التمام لا يمكن أن تتجاوز $1$.',
					'خطأ تشخيصي: لم تقارن الطرف الأيمن بالسعة القصوى $R = 2$.',
					'خطأ تشخيصي: الطرف الأيمن أكبر من السعة القصوى $R$ فلا وجود لأي حل.',
					'خطأ تشخيصي: الدورية لا تعني وجود حلول إذا كانت المعادلة مستحيلة أصلاً.'
				],
				explanationAr: 'للمعادلة من الشكل $a\\cos x + b\\sin x = c$ حل في $\\mathbb{R}$ إذا وفقط إذا كان $|c| \\le \\sqrt{a^2 + b^2}$.\nهنا: $a = 1$ و $b = -\\sqrt{3}$، ومنه $\\sqrt{a^2 + b^2} = \\sqrt{1 + 3} = 2$.\nالطرف الأيمن هو $c = 3$.\nبما أن $3 > 2$، فإن المعادلة تكافئ $\\cos(x - \\varphi) = \\frac{3}{2} = 1.5 > 1$، وهي مستحيلة الحل في $\\mathbb{R}$ لأن جيب التمام محصور دوماً في $[-1; 1]$. إذن مجموعة الحلول هي $S = \\emptyset$.'
			}
		]
	},

	// --------------------------------------------------------------------------
	// 5. Advanced Homothety: Composition, Loci & Euler Line
	// --------------------------------------------------------------------------
	{
		id: 'lesson_2as_math_t2_homothety_composition_loci_geometric_transformations',
		slug: '2as-math-homothety-composition-loci-geometric-transformations',
		grade: '2as_math',
		yearSubjectId: 692,
		trimesterId: 't2',
		sequenceId: 'seq6',
		sequenceTitleAr: 'المقطع السادس: التحاكي المعمق والجداء السلمي المتقدم في المستوي',
		order: 5,
		titleAr: 'التحاكي المعمق: تركيب التحاكيات، تعيين المحل الهندسي، وحل مسائل الإنشاء الهندسية',
		objectives: [
			'دراسة مركب تحاكيين لهما نفس المركز أو مركزان مختلفان (مركب تحاكيين بنسبة جداء 1 هو انسحاب، وبنسبة ≠ 1 هو تحاك)',
			'البرهان على العبارة المركبة أو التحليلية للتحاكي في معلم (O; i, j)',
			'تعيين المحلات الهندسية (Lieux géométriques) لمتحولات هندسية بواسطة التحاكي',
			'توظيف التحاكي في حل مسائل الإنشاء الهندسي الصعبة وبرهان استقامية نقط أويلر في المثلث (المعاملات والمرجح)'
		],
		keywordsAr: [
			'مركب تحاكيين',
			'نسبة ومركز التحاكي المركب',
			'المحل الهندسي بالتحاكي',
			'مستقيم أويلر',
			'مسائل الإنشاءات الهندسية'
		],
		discover: {
			scenarioAr: 'ليكن $h_1$ تحاكياً مركزه $\\Omega_1$ ونسبته $k_1 = 2$، و $h_2$ تحاكياً مركزه $\\Omega_2$ ونسبته $k_2 = \\frac{1}{2}$. نريد دراسة طبيعة التحويل المركب $h = h_2 \\circ h_1$ عندما يكون جداء النسبتين $k_1 k_2 = 1$ مقارنة بالحالة التي يكون فيها $k_1 k_2 \\ne 1$، وتطبيق ذلك لإثبات استقامية مراكز المثلث على مستقيم أويلر (Droite d\'Euler).',
			svg: svgInscribedAngleDiagram(),
			steps: [
				{
					promptAr: 'عبر شعاعياً عن صورة نقطة $M$ بالتحاكي $h_1(\\Omega_1, k_1)$ ثم بالتحاكي $h_2(\\Omega_2, k_2)$ لتحديد $\\vec{M M\'\'}$.',
					hintAr: 'صورة $M$ هي $M\'$ بحيث $\\vec{\\Omega_1 M\'} = k_1 \\vec{\\Omega_1 M}$. ثم صورة $M\'$ هي $M\'\'$ بحيث $\\vec{\\Omega_2 M\'\'} = k_2 \\vec{\\Omega_2 M\'}$.',
					expectedInput: 'k = k1 * k2',
					revealAr: 'إذا كانت النسبة الكلية $k_1 k_2 \\ne 1$، فإن المركب $h_2 \\circ h_1$ هو تحاك وحيد $h(\\Omega, k)$ نسبته $k = k_1 k_2$.\nأما إذا كان $k_1 k_2 = 1$ مع مركزين مختلفين، فإن المركب هو **انسحاب** شعاعه ثابت ومستقل عن النقطة $M$.'
				},
				{
					promptAr: 'في مثلث $ABC$ غير متقايس الأضلاع، لتكن $O$ مركز الدائرة المحيطة و $G$ مركز الثقل و $H$ نقطة تلاقي الارتفاعات. ما هو التحاكي الذي يحول $O$ إلى $H$ عبر $G$؟',
					hintAr: 'نعلم من خواص المرجح والمتوسطات أن $\\vec{GH} = -2\\vec{GO}$.',
					expectedInput: 'تحاك مركزه G ونسبته -2',
					revealAr: 'العلاقة المتجهية الشهيرة لأويلر تثبت أن:\n$$\\vec{GH} = -2\\vec{GO} \\iff \\vec{OH} = 3\\vec{OG}$$\nهذه العلاقة تعني هندسياً أن النقطة $H$ هي صورة النقطة $O$ بالتحاكي الذي **مركزه $G$ ونسبته $k = -2$**.'
				},
				{
					promptAr: 'ماذا تستنتج حول الوضعية النسبية للنقط $O, G, H$ في أي مثلث؟',
					hintAr: 'صورة نقطة بتحاك تقع دوماً على استقامة واحدة مع مركز التحاكي.',
					expectedInput: 'على استقامة واحدة (مستقيم أويلر)',
					revealAr: 'بما أن $H = h(O)$ حيث مركز التحاكي هو $G$، فإن النقط $O$ و $G$ و $H$ **على استقامة واحدة بالضرورة**. ويسمى المستقيم الحامل لها **مستقيم أويلر (Droite d\'Euler)** للمثلث.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**تعريف التحاكي وعلاقته الشعاعية والتحليلية**:\nالتحاكي $h(\\Omega, k)$ ذو المركز $\\Omega(x_0, y_0)$ والنسبة الحقيقية غير المعدومة $k \\ne 0$ يرفق بكل نقطة $M(x, y)$ النقطة $M\'(x\', y\')$ بحيث:\n$$\\vec{\\Omega M\'} = k \\vec{\\Omega M}$$\nالعبارة التحليلية في معلم $(O; \\vec{i}, \\vec{j})$:\n$$\\begin{cases} x\' - x_0 = k(x - x_0) \\\\ y\' - y_0 = k(y - y_0) \\end{cases} \\iff \\begin{cases} x\' = kx + (1-k)x_0 \\\\ y\' = ky + (1-k)y_0 \\end{cases}$$',
				'**مبرهنة مركب تحاكيين (Composition d\'homothéties)**:\nليكن $h_1(\\Omega_1, k_1)$ و $h_2(\\Omega_2, k_2)$ تحاكيين في المستوي:\n1) إذا كان $k_1 k_2 = 1$ مع $\\Omega_1 \\ne \\Omega_2$: فإن المركب $h_2 \\circ h_1$ هو **انسحاب** شعاعه $\\vec{u} = (1 - k_2)\\vec{\\Omega_1 \\Omega_2}$.\n2) إذا كان $k_1 k_2 \\ne 1$: فإن المركب $h_2 \\circ h_1$ هو **تحاك وحيد** $h(\\Omega, k)$ نسبته $k = k_1 k_2$، ومركزه $\\Omega$ يقع بالضرورة على المستقيم الحامل للمركزين $(\\Omega_1 \\Omega_2)$.',
				'**المحل الهندسي بالتحاكي (Lieu géométrique)**:\nإذا كانت نقطة متحركة $M$ تصف مجموعة نقطية $(\\mathcal{E})$ (مستقيماً أو دائرة أو قطعة)، وكانت نقطة $M\'$ مرتبطة بـ $M$ بتحاك $M\' = h(M)$، فإن المحل الهندسي لـ $M\'$ هو المجموعة $(\\mathcal{E}\') = h(\\mathcal{E})$:\n- صورة مستقيم هي مستقيم يوازيه.\n- صورة دائرة مركزها $I$ ونصف قطرها $R$ هي دائرة مركزها $I\' = h(I)$ ونصف قطرها $R\' = |k| R$.',
				'**مستقيم أويلر (Droite d\'Euler)**: في أي مثلث غير متقايس الأضلاع، تقع النقط الثلاث:\n- $O$ مركز الدائرة المحيطة\n- $G$ مركز الثقل\n- $H$ نقطة تلاقي الارتفاعات\nعلى استقامة واحدة وتحقق: $\\vec{OH} = 3\\vec{OG}$ و $\\vec{GH} = -2\\vec{GO}$.'
			],
			visualSvg: svgInscribedAngleDiagram(),
			visualCaptionAr: 'استقامية مراكز المثلث على مستقيم أويلر بتطبيق التحاكي ذي النسبة السالبة',
			examples: [
				{
					problemAr: 'عين العبارة التحليلية للتحاكي $h$ الذي مركزه $\\Omega(2; -1)$ ونسبته $k = -3$.',
					solutionAr: 'نطبق الدستور التحليلي: $\\vec{\\Omega M\'} = -3\\vec{\\Omega M}$.\n$$\\begin{cases} x\' - 2 = -3(x - 2) \\\\ y\' - (-1) = -3(y - (-1)) \\end{cases}$$\n$$\\begin{cases} x\' - 2 = -3x + 6 \\\\ y\' + 1 = -3y - 3 \\end{cases} \\iff \\begin{cases} x\' = -3x + 8 \\\\ y\' = -3y - 4 \\end{cases}$$'
				},
				{
					problemAr: 'لتكن $(\\mathcal{C})$ دائرة معرّفة بالمعادلة $x^2 + y^2 - 4x = 0$. عين معادلة صورتها $(\\mathcal{C}\')$ بالتحاكي الذي مركزه المبدأ $O(0; 0)$ ونسبته $k = 2$.',
					solutionAr: 'نحدد عناصر الدائرة $(\\mathcal{C})$: $(x - 2)^2 + y^2 = 4$.\nإذن مركزها النقطة $I(2; 0)$ ونصف قطرها $R = 2$.\nصورة المركز بالتحاكي $h(O, 2)$ هي النقطة $I\' = h(I)$:\n$$\\vec{OI\'} = 2\\vec{OI} \\implies I\'(2 \\times 2; 2 \\times 0) = I\'(4; 0)$$\nنصف قطر الدائرة الصورة هو: $R\' = |k| R = 2 \\times 2 = 4$.\nمعادلة الدائرة الصورة $(\\mathcal{C}\')$ هي:\n$$(x - 4)^2 + (y - 0)^2 = 4^2 \\iff (x - 4)^2 + y^2 = 16$$.'
				}
			],
			watchOutAr: 'في مركب تحاكيين مختلفي المركز، احذر افتراض أن المركب تبديلي! فعموماً $h_2 \\circ h_1 \\ne h_1 \\circ h_2$؛ صحيح أن كلاهما له نفس النسبة $k_1 k_2$، لكن مركزيهما يختلفان على المستقيم $(\\Omega_1 \\Omega_2)$.'
		},
		practice: [
			{
				questionAr: 'مركب تحاكيين $h_1(\\Omega_1, 3)$ و $h_2(\\Omega_2, \\frac{1}{3})$ حيث $\\Omega_1 \\ne \\Omega_2$ هو:',
				options: [
					'انسحاب شعاعه غير معدوم',
					'تحاك نسبته $1$',
					'تحاك مركزه منتصف $[\Omega_1 \Omega_2]$',
					'تناظر مركزي'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة ومبرهنة! جداء النسبتين هو $k = 3 \\times \\frac{1}{3} = 1$. وحسب مبرهنة مركب التحاكيات، عندما يكون جداء النسبتين مساوياً للواحد والمركزان مختلفين، يتحول التحاكي إلى انسحاب خالص.',
					'خطأ تشخيصي: التحاكي الذي نسبته $1$ هو التطابق $Id$ فقط إذا تطابق المركزان، أما مع مركزين مختلفين فالتحويل هو انسحاب.',
					'خطأ تشخيصي: لا يوجد مركز صامد لمركب تحاكيين جداء نسبتهما $1$.',
					'خطأ تشخيصي: التناظر المركزي هو تحاك نسبته $-1$ وليس $1$.'
				],
				explanationAr: 'وفق مبرهنة مركب تحاكيين: إذا كان $k_1 k_2 = 1$ مع $\\Omega_1 \\ne \\Omega_2$، فإن التحويل المركب $h_2 \\circ h_1$ لا يقبل أي نقطة صامدة ويكون عبارة عن **انسحاب** شعاعه $\\vec{u} = (1 - k_2)\\vec{\\Omega_1 \\Omega_2}$.'
			},
			{
				questionAr: 'صورة النقطة $A(3; -1)$ بالتحاكي الذي مركزه $\\Omega(1; 2)$ ونسبته $k = -2$ هي:',
				options: [
					'$A\'(-3; 8)$',
					'$A\'(-6; 2)$',
					'$A\'(5; -4)$',
					'$A\'(-3; 6)$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! نطبق $\\vec{\\Omega A\'} = -2\\vec{\\Omega A}$. لدينا $\\vec{\\Omega A} = (3-1; -1-2) = (2; -3)$. إذن $\\vec{\\Omega A\'} = (-4; 6)$. منه $x\' = 1 - 4 = -3$ و $y\' = 2 + 6 = 8$.',
					'خطأ تشخيصي: ضربت إحداثيات $A$ مباشرة في $-2$ وتجاهلت إحداثيات المركز $\\Omega$.',
					'خطأ تشخيصي: أخطأت في إشارة النسبة $k$.',
					'خطأ تشخيصي: خطأ حسابي في الترتيبة.'
				],
				explanationAr: 'نحسب إحداثيات الشعاع $\\vec{\\Omega A}$:\n$$\\vec{\\Omega A} = (x_A - x_\\Omega; y_A - y_\\Omega) = (3 - 1; -1 - 2) = (2; -3)$$\nبالتالي: $\\vec{\\Omega A\'} = -2\\vec{\\Omega A} = -2(2; -3) = (-4; 6)$.\nإحداثيات $A\'$ هي:\n$$x_{A\'} = x_\\Omega + (-4) = 1 - 4 = -3$$\n$$y_{A\'} = y_\\Omega + 6 = 2 + 6 = 8$$\nإذن $A\'(-3; 8)$.'
			},
			{
				questionAr: 'في مثلث $ABC$، إذا كان $O$ مركز الدائرة المحيطة و $G$ مركز الثقل و $H$ نقطة تلاقي الارتفاعات، فإن العلاقة الشعاعية الصحيحة هي:',
				options: [
					'$\\vec{OH} = 3\\vec{OG}$',
					'$\\vec{OG} = 3\\vec{OH}$',
					'$\\vec{GH} = 2\\vec{GO}$',
					'$\\vec{OH} = \\vec{OG}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة تماماً! هذه هي علاقة أويلر الشعاعية الشهيرة التي تبين أن النقط الثلاث مستقيمة وأن بعد $H$ عن $O$ يساوي ثلاثة أضعاف بعد $G$ عن $O$.',
					'خطأ تشخيصي: عكست موضع النقطتين $G$ و $H$.',
					'خطأ تشخيصي: العلاقة الصحيحة تتضمن إشارة سالبة: $\\vec{GH} = -2\\vec{GO}$.',
					'خطأ تشخيصي: النقط متمايزة في المثلثات غير متقايسة الأضلاع.'
				],
				explanationAr: 'في أي مثلث، تنص مبرهنة أويلر على أن مركز الدائرة المحيطة $O$ ومركز الثقل $G$ ونقطة تلاقي الارتفاعات $H$ تقع على استقامة واحدة (مستقيم أويلر) وتحقق العلاقة الشعاعية المميزة: $\\vec{OH} = 3\\vec{OG}$، والتي تكافئ أيضاً $\\vec{GH} = -2\\vec{GO}$.'
			}
		]
	},

	// --------------------------------------------------------------------------
	// 6. Advanced Scalar Product: Bilinearity, Line-Distance, Circles & Radical Axis
	// --------------------------------------------------------------------------
	{
		id: 'lesson_2as_math_t2_scalar_product_bilinearity_analytic_distance_circles',
		slug: '2as-math-scalar-product-bilinearity-analytic-distance-circles',
		grade: '2as_math',
		yearSubjectId: 692,
		trimesterId: 't2',
		sequenceId: 'seq6',
		sequenceTitleAr: 'المقطع السادس: التحاكي المعمق والجداء السلمي المتقدم في المستوي',
		order: 6,
		titleAr: 'الجداء السلمي المعمق: الثنائية الخطية، معادلات المستقيم والدائرة، المسافة وقوة نقطة بالنسبة لدائرة',
		objectives: [
			'الخواص الجبرية للجداء السلمي (الشكل الخطي الثنائي المتناظر الموجب المعرف) والمتطابقات الشهيرة للجداء السلمي',
			'المسافة بين نقطة ومستقيم معادلته ax + by + c = 0 بالدستور d = |ax_0 + by_0 + c| / √(a²+b²) والبرهان عليه',
			'معادلة الدائرة، تقاطع دائرتين، والمماس لدائرة عند نقطة منها بالمعادلة القطبية',
			'مفهوم قوة نقطة بالنسبة إلى دائرة والمحور الجذري لدائرتين (Axe radical)'
		],
		keywordsAr: [
			'الثنائية الخطية للجداء السلمي',
			'دستور مسافة نقطة عن مستقيم',
			'قوة نقطة بالنسبة لدائرة',
			'المحور الجذري لدائرتين',
			'مماس دائرة'
		],
		discover: {
			scenarioAr: 'لتكن دائرة $(\\mathcal{C})$ مركزها $\\Omega(a, b)$ ونصف قطرها $R$، ونقطة كيفية $P$ في المستوي. نرسم من $P$ قاطعاً يقطع الدائرة في النقطتين $A$ و $B$. نريد إثبات أن الجداء السلمي $\\vec{PA} \\cdot \\vec{PB}$ مقدار ثابت لا يتعلق بوضعية القاطع ويسمى **قوة النقطة $P$ بالنسبة للدائرة**، واستنتاج معادلة المحور الجذري لدائرتين.',
			svg: svgRadicalAxisDiagram(),
			steps: [
				{
					promptAr: 'ادخل مركز الدائرة $\\Omega$ بعلاقة شال في الشعاعين $\\vec{PA}$ و $\\vec{PB}$ بافتراض أن القاطع يمر بالمركز $\\Omega$ (قطر الدائرة).',
					hintAr: 'إذا كان القاطع قطراً، فإن $A$ و $B$ متناظرتان بالنسبة إلى $\\Omega$، ومنه $\\vec{\\Omega B} = -\\vec{\\Omega A}$ وطولهما $R$.',
					expectedInput: 'PA · PB = PΩ² - R²',
					revealAr: 'ليكن القاطع ماراً بالمركز $\\Omega$، حيث $A$ و $B$ طرفا قطر. إذن $\\vec{\\Omega A} = -\\vec{\\Omega B}$ و $\\Omega A = \\Omega B = R$.\n$$\\vec{PA} \\cdot \\vec{PB} = (\\vec{P\\Omega} + \\vec{\\Omega A}) \\cdot (\\vec{P\\Omega} + \\vec{\\Omega B}) = (\\vec{P\\Omega} + \\vec{\\Omega A}) \\cdot (\\vec{P\\Omega} - \\vec{\\Omega A})$$\n$$= \\|\\vec{P\\Omega}\\|^2 - \\|\\vec{\\Omega A}\\|^2 = P\\Omega^2 - R^2$$\nهذا المقدار الثابت يسمى **قوة النقطة $P$ بالنسبة للدائرة $(\\mathcal{C})$** ونرمز له بـ $\\mathcal{P}_{(\\mathcal{C})}(P) = P\\Omega^2 - R^2$.'
				},
				{
					promptAr: 'ما هي إشارة قوة النقطة $\\mathcal{P}(P)$ بحسب موقع النقطة $P$ بالنسبة للدائرة؟',
					hintAr: 'قارن المسافة $P\\Omega$ بنصف القطر $R$.',
					expectedInput: 'موجبة خارج الدائرة، معدومة على المحيط، سالبة داخلها',
					revealAr: '- إذا كانت $P$ **خارج الدائرة**: $P\\Omega > R \\iff P\\Omega^2 - R^2 > 0$ (القوة موجبة، وتساوي مربع طول المماس $PT^2$).\n- إذا كانت $P$ **على محيط الدائرة**: $P\\Omega = R \\iff \\mathcal{P}(P) = 0$ (القوة معدومة).\n- إذا كانت $P$ **داخل الدائرة**: $P\\Omega < R \\iff P\\Omega^2 - R^2 < 0$ (القوة سالبة تماماً).'
				},
				{
					promptAr: 'نعتبر دائرتين غير متحدتي المركز $(\\mathcal{C}_1)$ و $(\\mathcal{C}_2)$. ما هي طبيعة مجموعة النقط $M$ التي لها نفس القوة بالنسبة للدائرتين؟',
					hintAr: 'المعادلة: $M\\Omega_1^2 - R_1^2 = M\\Omega_2^2 - R_2^2$. فكك المسافات في معلم.',
					expectedInput: 'مستقيم عمودي على خط المركزين (المحور الجذري)',
					revealAr: 'المعادلة $M\\Omega_1^2 - R_1^2 = M\\Omega_2^2 - R_2^2 \\iff M\\Omega_1^2 - M\\Omega_2^2 = R_1^2 - R_2^2$.\nباستعمال مبرهنة المتوسط أو بالإحداثيات، نجد أنها معادلة من الدرجة الأولى من الشكل $Ax + By + C = 0$.\nتمثل هذه المجموعة **مستقيماً عمودياً على خط المركزين $(\\Omega_1 \\Omega_2)$** ويسمى **المحور الجذري (Axe radical)** للدائرتين.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**الثنائية الخطية وشكل الجداء السلمي**:\nالجداء السلمي في المستوي هو شكل خطي ثنائي متناظر وموجب معرف، يحقق لكل أشعة $\\vec{u}, \\vec{v}, \\vec{w}$ ولكل $\\lambda \\in \\mathbb{R}$:\n- التناظر: $\\vec{u} \\cdot \\vec{v} = \\vec{v} \\cdot \\vec{u}$\n- الخطية: $(\\vec{u} + \\vec{v}) \\cdot \\vec{w} = \\vec{u} \\cdot \\vec{w} + \\vec{v} \\cdot \\vec{w}$ و $(\\lambda\\vec{u}) \\cdot \\vec{v} = \\lambda(\\vec{u} \\cdot \\vec{v})$\n- الموجبية والمعرّفية: $\\vec{u}^2 \\ge 0$ و $\\vec{u}^2 = 0 \\iff \\vec{u} = \\vec{0}$\n- متطابقات الجداء السلمي: $\\|\\vec{u} + \\vec{v}\\|^2 = \\|\\vec{u}\\|^2 + \\|\\vec{v}\\|^2 + 2\\vec{u} \\cdot \\vec{v}$',
				'**دستور مسافة نقطة عن مستقيم**:\nفي معلم متعامد ومتجانس، المسافة بين النقطة $M_0(x_0, y_0)$ والمستقيم $(\\mathcal{D})$ ذي المعادلة الديكارتية $ax + by + c = 0$ هي: $$d(M_0, \\mathcal{D}) = \\frac{|a x_0 + b y_0 + c|}{\\sqrt{a^2 + b^2}}$$',
				'**معادلة الدائرة والمماس**:\n- معادلة الدائرة ذات المركز $\\Omega(a, b)$ ونصف القطر $R$: $$(x - a)^2 + (y - b)^2 = R^2 \\iff x^2 + y^2 - 2ax - 2by + (a^2+b^2-R^2) = 0$$\n- معادلة المماس للدائرة عند نقطة $A(x_A, y_A)$ منها: $\\vec{AM} \\cdot \\vec{\\Omega A} = 0$.',
				'**قوة نقطة بالنسبة لدائرة والمحور الجذري**:\n- **قوة نقطة $P$ بالنسبة لدائرة $(\\mathcal{C})$** مركزها $\\Omega$ ونصف قطرها $R$: $$\\mathcal{P}_{(\\mathcal{C})}(P) = P\\Omega^2 - R^2$$\n  إذا كان $PT$ مماساً للدائرة من $P$، فإن: $\\mathcal{P}(P) = PT^2$.\n- **المحور الجذري لدائرتين (Axe radical)**: هو المحل الهندسي للنقط $M$ التي تحقق: $$\\mathcal{P}_{(\\mathcal{C}_1)}(M) = \\mathcal{P}_{(\\mathcal{C}_2)}(M)$$\n  وهو مستقيم عمودي على خط المركزين $(\\Omega_1 \\Omega_2)$. وإذا تقاطعت الدائرتان في نقطتين، فإن المحور الجذري هو المستقيم الحامل للوتر المشترك.'
			],
			visualSvg: svgRadicalAxisDiagram(),
			visualCaptionAr: 'المحور الجذري لدائرتين هو المستقيم العمودي على خط المركزين الذي تتساوى عنده قوة النقط بالنسبة للدائرتين',
			examples: [
				{
					problemAr: 'احسب مسافة النقطة $A(2; -3)$ عن المستقيم $(\\mathcal{D})$ ذي المعادلة $3x - 4y + 2 = 0$.',
					solutionAr: 'نطبق دستور المسافة مباشرة مع $x_0 = 2$ و $y_0 = -3$ والمعاملات $a = 3, b = -4, c = 2$:\n$$d(A, \\mathcal{D}) = \\frac{|3(2) - 4(-3) + 2|}{\\sqrt{3^2 + (-4)^2}} = \\frac{|6 + 12 + 2|}{\\sqrt{9 + 16}} = \\frac{|20|}{\\sqrt{25}} = \\frac{20}{5} = 4$$.'
				},
				{
					problemAr: 'احسب قوة النقطة $P(5; 4)$ بالنسبة للدائرة $(\\mathcal{C})$ ذات المعادلة $(x - 1)^2 + (y - 1)^2 = 9$، واستنتج طول المماس المرسوم من $P$ إلى الدائرة.',
					solutionAr: 'مركز الدائرة هو $\\Omega(1; 1)$ ومربع نصف قطرها $R^2 = 9$.\nنحسب مربع المسافة $P\\Omega^2$:\n$$P\\Omega^2 = (5 - 1)^2 + (4 - 1)^2 = 4^2 + 3^2 = 16 + 9 = 25$$\nقوة النقطة $P$ بالنسبة للدائرة هي:\n$$\\mathcal{P}_{(\\mathcal{C})}(P) = P\\Omega^2 - R^2 = 25 - 9 = 16$$\nبما أن $\\mathcal{P}(P) > 0$ فالنقطة خارج الدائرة، وطول المماس $PT$ هو الجذر التربيعي للقوة:\n$$PT = \\sqrt{\\mathcal{P}(P)} = \\sqrt{16} = 4$$.'
				}
			],
			watchOutAr: 'في دستور مسافة نقطة عن مستقيم، لا تنس رمز القيمة المطلقة في البسط $|ax_0 + by_0 + c|$! فالمسافة مقدار موجب تماماً، وحذف القيمة المطلقة قد يعطي نتيجة سالبة خاطئة تماماً.'
		},
		practice: [
			{
				questionAr: 'مسافة النقطة $B(-1; 2)$ عن المستقيم ذي المعادلة $4x + 3y + 8 = 0$ تساوي:',
				options: [
					'$2$',
					'$10$',
					'$5$',
					'$\\frac{18}{5}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! نطبق الدستور: $d = \\frac{|4(-1) + 3(2) + 8|}{\\sqrt{4^2 + 3^2}} = \\frac{|-4 + 6 + 8|}{\\sqrt{25}} = \\frac{|10|}{5} = 2$.',
					'خطأ تشخيصي: نسيت القسمة على المنظم $\\sqrt{a^2 + b^2} = 5$.',
					'خطأ تشخيصي: أخطأت في حساب البسط.',
					'خطأ تشخيصي: أخطأت في إشارة $-4$.'
				],
				explanationAr: 'نعوض إحداثيات النقطة في دستور المسافة:\n$$d = \\frac{|4(-1) + 3(2) + 8|}{\\sqrt{4^2 + 3^2}} = \\frac{|-4 + 6 + 8|}{\\sqrt{16 + 9}} = \\frac{10}{5} = 2$$.'
			},
			{
				questionAr: 'إذا كانت قوة النقطة $P$ بالنسبة لدائرة سالبة تماماً $\\mathcal{P}(P) < 0$، فإن النقطة $P$ تقع:',
				options: [
					'داخل الدائرة تماماً',
					'خارج الدائرة تماماً',
					'على محيط الدائرة بالضبط',
					'في مركز الدائرة بالضرورة'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! القوة هي $\\mathcal{P}(P) = P\\Omega^2 - R^2$. تكون سالبة إذا وفقط إذا كان $P\\Omega < R$، أي أن النقطة تقع داخل القرص المفتوح للدائرة.',
					'خطأ تشخيصي: النقطة خارج الدائرة تكون قوتها موجبة تماماً $P\\Omega > R$.',
					'خطأ تشخيصي: النقطة الواقعة على المحيط تكون قوتها معدومة تماماً $\\mathcal{P}(P) = 0$.',
					'خطأ تشخيصي: عند المركز تكون القوة $-R^2$، لكنها سالبة أيضاً في أي نقطة أخرى داخل الدائرة.'
				],
				explanationAr: 'حسب تعريف قوة نقطة بالنسبة لدائرة: $\\mathcal{P}_{(\\mathcal{C})}(P) = P\\Omega^2 - R^2$. يكون هذا المقدار سالباً تماماً إذا وفقط إذا كان $P\\Omega^2 < R^2 \\iff P\\Omega < R$، وهو الشرط الهندسي الدقيق لوقوع النقطة داخل الدائرة.'
			},
			{
				questionAr: 'المحور الجذري لدائرتين متقاطعتين في نقطتين متمايزتين $A$ و $B$ هو:',
				options: [
					'المستقيم الحامل للوتر المشترك $(AB)$',
					'محور القطعة المستقيمة $[AB]$',
					'مستقيم يوازي خط المركزين',
					'دائرة تشمل النقطتين $A$ و $B$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! بما أن $A$ و $B$ تنتميان إلى كلتا الدائرتين، فإن قوتهما معدومة بالنسبة لكلتيهما: $\\mathcal{P}_1(A) = \\mathcal{P}_2(A) = 0$ و $\\mathcal{P}_1(B) = \\mathcal{P}_2(B) = 0$. إذن النقطتان تنتميان إلى المحور الجذري، والمحور الجذري مستقيم فهو المستقيم $(AB)$ نفسه.',
					'خطأ تشخيصي: محور القطعة $[AB]$ هو خط المركزين $(\\Omega_1 \\Omega_2)$ وليس المحور الجذري.',
					'خطأ تشخيصي: المحور الجذري عمودي دوماً على خط المركزين ولا يوازيه.',
					'خطأ تشخيصي: المحور الجذري مستقيم دوماً وليس دائرة.'
				],
				explanationAr: 'النقطتان $A$ و $B$ نقطتا تقاطع الدائرتين، إذن هما نقطتان من محيط كلتا الدائرتين، فقوتهما بالنسبة للدائرتين معدومة: $\\mathcal{P}_1(A) = \\mathcal{P}_2(A) = 0$ و $\\mathcal{P}_1(B) = \\mathcal{P}_2(B) = 0$. بالتالي النقطتان $A$ و $B$ تنتميان إلى المحور الجذري. وبما أن المحور الجذري مستقيم، فهو بالضرورة المستقيم $(AB)$ الحامل للوتر المشترك.'
			}
		]
	},

	// --------------------------------------------------------------------------
	// 7. Metric Relations in Triangles, Scalar Level Sets & Trimester 2 Synthesis
	// --------------------------------------------------------------------------
	{
		id: 'lesson_2as_math_t2_scalar_product_metric_relations_loci_integration',
		slug: '2as-math-scalar-product-metric-relations-loci-integration',
		grade: '2as_math',
		yearSubjectId: 692,
		trimesterId: 't2',
		sequenceId: 'seq6',
		sequenceTitleAr: 'المقطع السادس: التحاكي المعمق والجداء السلمي المتقدم في المستوي',
		order: 7,
		titleAr: 'تطبيقات الجداء السلمي المعمقة: العلاقات المترية في المثلث، خطوط المستوى ومجموعات النقط وإدماج الفصل الثاني',
		objectives: [
			'البرهان على العلاقات المترية في المثلث (الكاشي، نظرية المتوسط، مساحة المثلث بدلالة الجيب S = (1/2)ab sin C، صيغة هيرون)',
			'دراسة خطوط المستوى للدوال السلّمية f(M) = MA . MB و f(M) = α MA² + β MB² وتحديد طبيعتها بدقة',
			'البرهان على تعامد الارتفاعات واستقامة مراكز المثلث وتطبيقات الجداء السلمي في الهندسة الإقليدية الصرفة',
			'حل مسائل تحليلية تركيبية متقدمة للفصل الثاني تجمع التحليل والهندسة وحساب المثلثات وفق المستوى البكالوريا'
		],
		keywordsAr: [
			'العلاقات المترية في المثلث',
			'صيغة هيرون لحساب المساحة',
			'خطوط المستوى السلمية',
			'تعامد الارتفاعات الصارم',
			'المسائل التركيبية التحليلية'
		],
		discover: {
			scenarioAr: 'في مثلث $ABC$ أطوال أضلاعه $BC = a$ و $AC = b$ و $AB = c$، ونصف محيطه $p = \\frac{a+b+c}{2}$. نريد برهان مبرهنة الكاشي (مبرهنة فيثاغورس المعممة) بواسطة الجداء السلمي، واشتقاق نظرية المتوسط وصيغة هيرون الشهيرة للمساحة $S = \\sqrt{p(p-a)(p-b)(p-c)}$، وتحديد خطوط المستوى السلمية.',
			svg: svgRadicalAxisDiagram(),
			steps: [
				{
					promptAr: 'انطلق من العلاقة الشعاعية $\\vec{BC} = \\vec{BA} + \\vec{AC} = \\vec{AC} - \\vec{AB}$ وربع الطرفين سلمياً لبرهان مبرهنة الكاشي.',
					hintAr: 'احسب $\\|\\vec{BC}\\|^2 = (\\vec{AC} - \\vec{AB})^2 = AC^2 + AB^2 - 2\\vec{AB} \\cdot \\vec{AC}$.',
					expectedInput: 'a² = b² + c² - 2bc cos A',
					revealAr: '$$\\|\\vec{BC}\\|^2 = (\\vec{AC} - \\vec{AB})^2 = \\|\\vec{AC}\\|^2 + \\|\\vec{AB}\\|^2 - 2\\vec{AB} \\cdot \\vec{AC}$$\nبما أن $\\vec{AB} \\cdot \\vec{AC} = AB \\times AC \\times \\cos(\\widehat{BAC}) = b c \\cos A$، نجد مباشرة **مبرهنة الكاشي**:\n$$a^2 = b^2 + c^2 - 2bc\\cos A$$'
				},
				{
					promptAr: 'لتكن $I$ منتصف $[BC]$. برهن مبرهنة المتوسط $AB^2 + AC^2 = 2AI^2 + \\frac{BC^2}{2}$ بإدخال $I$ بعلاقة شال.',
					hintAr: '$\\vec{AB} = \\vec{AI} + \\vec{IB}$ و $\\vec{AC} = \\vec{AI} + \\vec{IC}$ مع $\\vec{IB} + \\vec{IC} = \\vec{0}$.',
					expectedInput: 'AB² + AC² = 2AI² + a²/2',
					revealAr: '$$AB^2 + AC^2 = (\\vec{AI} + \\vec{IB})^2 + (\\vec{AI} + \\vec{IC})^2$$\n$$= 2AI^2 + IB^2 + IC^2 + 2\\vec{AI} \\cdot (\\vec{IB} + \\vec{IC})$$\nبما أن $I$ منتصف $[BC]$ فإن $\\vec{IB} + \\vec{IC} = \\vec{0}$ و $IB = IC = \\frac{a}{2}$.\n$$IB^2 + IC^2 = 2\\left(\\frac{a}{2}\\right)^2 = \\frac{a^2}{2}$$\nإذن نصل إلى **مبرهنة المتوسط**:\n$$AB^2 + AC^2 = 2AI^2 + \\frac{a^2}{2}$$'
				},
				{
					promptAr: 'عين مجموعة النقط $M$ في المستوي التي تحقق: $\\vec{MA} \\cdot \\vec{MB} = k$ حيث $k \\in \\mathbb{R}$.',
					hintAr: 'ادخل $I$ منتصف $[AB]$: $\\vec{MA} \\cdot \\vec{MB} = MI^2 - \\frac{AB^2}{4}$.',
					expectedInput: 'دائرة مركزها I إذا كان k > -AB²/4',
					revealAr: '$$\\vec{MA} \\cdot \\vec{MB} = (\\vec{MI} + \\vec{IA}) \\cdot (\\vec{MI} - \\vec{IA}) = MI^2 - IA^2 = MI^2 - \\frac{AB^2}{4}$$\nالمعادلة تكافئ: $MI^2 = k + \\frac{AB^2}{4}$.\n- إذا كان $k > -\\frac{AB^2}{4}$: المجموعة هي **دائرة مركزها $I$** ونصف قطرها $R = \\sqrt{k + \\frac{AB^2}{4}}$.\n- إذا كان $k = -\\frac{AB^2}{4}$: المجموعة هي **النقطة $I$ وحدها**.\n- إذا كان $k < -\\frac{AB^2}{4}$: المجموعة هي **المجموعة الخالية $\\emptyset$**.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**العلاقات المترية الأساسية في المثلث**:\n- **مبرهنة الكاشي (فيثاغورس المعممة)**:\n  * $a^2 = b^2 + c^2 - 2bc\\cos A$\n  * $b^2 = a^2 + c^2 - 2ac\\cos B$\n  * $c^2 = a^2 + b^2 - 2ab\\cos C$\n- **مبرهنة المتوسط (Théorème de la médiane)**: إذا كانت $I$ منتصف $[BC]$:\n  $$AB^2 + AC^2 = 2AI^2 + \\frac{BC^2}{2} \\iff AI^2 = \\frac{2b^2 + 2c^2 - a^2}{4}$$',
				'**حساب مساحة المثلث وصيغة هيرون (Formule de Héron)**:\n- مساحة المثلث $S$:\n  $$S = \\frac{1}{2} a b \\sin C = \\frac{1}{2} b c \\sin A = \\frac{1}{2} a c \\sin B$$\n- بدلالة نصف قطر الدائرة المحيطة $R$ ونصف قطر الدائرة المحاطة $r$:\n  $$S = \\frac{abc}{4R} = p \\cdot r \\quad \\quad ; \quad \\quad p = \\frac{a+b+c}{2}$$\n- **صيغة هيرون**: $$S = \\sqrt{p(p - a)(p - b)(p - c)}$$',
				'**خطوط المستوى للدوال السلّمية**:\n- خط المستوى للدالة $f(M) = \\vec{MA} \\cdot \\vec{MB} = k$ هو دوماً دائرة متحدة المركز مركزها $I$ منتصف $[AB]$ ونصف قطرها $R = \\sqrt{k + \\frac{AB^2}{4}}$ (بشرط $k \\ge -\\frac{AB^2}{4}$).\n- خط المستوى للدالة $f(M) = \\vec{AM} \\cdot \\vec{u} = k$ هو مستقيم عمودي على الشعاع $\\vec{u}$.',
				'**تعامد الارتفاعات في المثلث بواسطة الجداء السلمي**:\nالبرهان الصارم على تلاقي الارتفاعات يعتمد على المتطابقة المتجهية: $\\vec{HA} \\cdot \\vec{BC} + \\vec{HB} \\cdot \\vec{CA} + \\vec{HC} \\cdot \\vec{AB} = 0$. فإذا كان $H$ نقطة تقاطع ارتفاعين، فإن الحدين الأولين ينعدمان، فيلزم انعدام الحد الثالث، مما يثبت أن $(HC)$ عمودي على $(AB)$.'
			],
			visualSvg: svgRadicalAxisDiagram(),
			visualCaptionAr: 'توظيف الجداء السلمي في برهان العلاقات المترية وخطوط المستوى الدائرية والمستقيمة',
			examples: [
				{
					problemAr: 'في مثلث $ABC$، لدينا $a = 7\\text{ cm}$ و $b = 5\\text{ cm}$ و $c = 6\\text{ cm}$. احسب القيمة المضبوطة لـ $\\cos A$ ثم احسب مساحة المثلث $S$ باستعمال صيغة هيرون.',
					solutionAr: '1) بتطبيق مبرهنة الكاشي: $a^2 = b^2 + c^2 - 2bc\\cos A$:\n$$7^2 = 5^2 + 6^2 - 2(5)(6)\\cos A \\iff 49 = 25 + 36 - 60\\cos A$$\n$$49 = 61 - 60\\cos A \\iff 60\\cos A = 12 \\iff \\cos A = \\frac{12}{60} = \\frac{1}{5} = 0.2$$\n2) بصيغة هيرون: نصف المحيط $p = \\frac{7 + 5 + 6}{2} = \\frac{18}{2} = 9\\text{ cm}$.\n$$S = \\sqrt{p(p-a)(p-b)(p-c)} = \\sqrt{9(9-7)(9-5)(9-6)} = \\sqrt{9 \\times 2 \\times 4 \\times 3} = \\sqrt{216} = 6\\sqrt{6}\\text{ cm}^2$$.'
				},
				{
					problemAr: 'قطعة مستقيمة $[AB]$ طولها $AB = 6\\text{ cm}$. عين طبيعة وعناصر مجموعة النقط $M$ التي تحقق: $\\vec{MA} \\cdot \\vec{MB} = 7$.',
					solutionAr: 'ليكن $I$ منتصف $[AB]$. نعلم أن: $\\vec{MA} \\cdot \\vec{MB} = MI^2 - \\frac{AB^2}{4}$.\nلدينا $\\frac{AB^2}{4} = \\frac{6^2}{4} = \\frac{36}{4} = 9$.\nالمعادلة تصبح:\n$$MI^2 - 9 = 7 \\iff MI^2 = 16 \\iff MI = 4$$\nبما أن $MI = 4\\text{ cm}$ مسافة ثابتة، فإن مجموعة النقط $M$ هي **الدائرة التي مركزها $I$ منتصف $[AB]$ ونصف قطرها $R = 4\\text{ cm}$**.'
				}
			],
			watchOutAr: 'في صيغة هيرون لحساب المساحة، تأكد من حساب نصف المحيط $p = \\frac{a+b+c}{2}$ وليس المحيط الكامل $2p$! كذلك احرص على التحقق من وجود المثلث بمتباينة المثلث ($a < b + c$) لضمان أن كل العوامل $(p-a), (p-b), (p-c)$ موجبة تماماً تحت الجذر التربيعي.'
		},
		practice: [
			{
				questionAr: 'في مثلث $ABC$ حيث $b = 4$ و $c = 5$ والزاوية $A = 60^\\circ$. طول الضلع $a$ يساوي:',
				options: [
					'$\\sqrt{21}$',
					'$\\sqrt{41}$',
					'$\\sqrt{61}$',
					'$21$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! نطبق مبرهنة الكاشي: $a^2 = b^2 + c^2 - 2bc\\cos A = 16 + 25 - 2(4)(5)\\cos(60^\\circ) = 41 - 40(0.5) = 41 - 20 = 21$. إذن $a = \\sqrt{21}$.',
					'خطأ تشخيصي: أهملت حد الجداء السلمي $-2bc\\cos A$ وجمعت المربعين فقط $16+25=41$.',
					'خطأ تشخيصي: وضعت إشارة $+$ أمام حد الجداء السلمي بدلاً من الإشارة $-$.',
					'خطأ تشخيصي: $21$ هو مربع الطول $a^2$ ونسيت أخذ الجذر التربيعي.'
				],
				explanationAr: 'حسب مبرهنة الكاشي:\n$$a^2 = b^2 + c^2 - 2bc\\cos A = 4^2 + 5^2 - 2(4)(5)\\cos(60^\\circ) = 16 + 25 - 40\\left(\\frac{1}{2}\\right) = 41 - 20 = 21$$\nبما أن الطول موجب: $a = \\sqrt{21}$.'
			},
			{
				questionAr: 'إذا كان $AB = 8$ و $I$ منتصف $[AB]$، فإن مجموعة النقط $M$ التي تحقق $\\vec{MA} \\cdot \\vec{MB} = -16$ هي:',
				options: [
					'النقطة $I$ وحدها',
					'دائرة مركزها $I$ ونصف قطرها $4$',
					'المجموعة الخالية $\\emptyset$',
					'الدائرة التي قطرها $[AB]$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة وذكية! $\\vec{MA} \\cdot \\vec{MB} = MI^2 - \\frac{AB^2}{4} = MI^2 - 16$. المعادلة تصبح $MI^2 - 16 = -16 \\iff MI^2 = 0 \\iff MI = 0$. النقطة الوحيدة التي تحقق المسافة صفر هي المركز $I$ نفسه.',
					'خطأ تشخيصي: نصف القطر $4$ ينتج لو كانت المساواة مع الصفر $\\vec{MA} \\cdot \\vec{MB} = 0$.',
					'خطأ تشخيصي: $MI^2 = 0$ تقبل حلاً حقيقياً هو النقطة $I$ وليست خالية.',
					'خطأ تشخيصي: دائرة القطر تتوافق مع الجداء السلمي المعدوم.'
				],
				explanationAr: 'نعوض في العلاقة الشهيرة: $\\vec{MA} \\cdot \\vec{MB} = MI^2 - \\frac{AB^2}{4}$.\nلدينا $\\frac{AB^2}{4} = \\frac{64}{4} = 16$.\nالمعادلة: $MI^2 - 16 = -16 \\iff MI^2 = 0 \\iff MI = 0$.\nالمسافة بين $M$ و $I$ معدومة، إذن $M = I$. مجموعة النقط هي **النقطة $I$ وحدها** (منتصف القطعة).'
			},
			{
				questionAr: 'في مثلث $ABC$ متساوي الساقين في $A$ حيث $AB = 5$ و $AC = 5$ و $BC = 6$. طول المتوسط $AI$ المتعلق بالضلع $[BC]$ هو:',
				options: [
					'$4$',
					'$\\sqrt{32}$',
					'$5$',
					'$\\sqrt{19}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! مبرهنة المتوسط: $AB^2 + AC^2 = 2AI^2 + \\frac{BC^2}{2} \\implies 25 + 25 = 2AI^2 + 18 \\implies 2AI^2 = 32 \\implies AI^2 = 16 \\implies AI = 4$.',
					'خطأ تشخيصي: $32$ هي قيمة $2AI^2$ ونسيت القسمة على $2$ وأخذ الجذر التربيعي.',
					'خطأ تشخيصي: $5$ هو طول الضلع $AB$، والمتوسط في المثلث القائم/المتساوي الساقين أصغر من الوتر.',
					'خطأ تشخيصي: الحساب غير دقيق لمبرهنة المتوسط.'
				],
				explanationAr: 'وفق مبرهنة المتوسط: $AB^2 + AC^2 = 2AI^2 + \\frac{BC^2}{2}$.\nنعوض الأطوال: $5^2 + 5^2 = 2AI^2 + \\frac{6^2}{2} \\iff 50 = 2AI^2 + 18$.\n$$2AI^2 = 50 - 18 = 32 \\iff AI^2 = 16 \\iff AI = \\sqrt{16} = 4$$.\n(وبما أن المثلث متساوي الساقين، فالمتوسط هو أيضاً ارتفاع، ونظرية فيثاغورس تعطي مباشرة $AI = \\sqrt{5^2 - 3^2} = \\sqrt{16} = 4$).'
			}
		]
	}
];
