import type { InteractiveLessonData } from '../../types';
import { svgFunctionCurvePlot, svgVariationTable, svgTrigonometricCircle } from '../../svg-secondary';

// ============================================================================
// Custom High-Quality SVG Visuals for Secondary 2AS Trimester 2
// ============================================================================

/** SVG: Homothety of a triangle and vector dilation */
const svgHomothetyTriangle = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 250" width="420" height="250" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">
  <defs>
    <marker id="arr-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1d4ed8"/>
    </marker>
    <marker id="arr-red" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#dc2626"/>
    </marker>
  </defs>
  <rect x="10" y="10" width="400" height="230" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  
  <!-- Dilation rays from Omega(50, 180) -->
  <line x1="50" y1="180" x2="390" y2="76" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4,4"/>
  <line x1="50" y1="180" x2="350" y2="180" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4,4"/>
  <line x1="50" y1="180" x2="270" y2="28" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4,4"/>
  
  <!-- Original Triangle ABC: A(160, 146), B(150, 180), C(124, 130) -->
  <polygon points="160,146 150,180 124,130" fill="rgba(37,99,235,0.18)" stroke="#2563eb" stroke-width="2"/>
  <!-- Homothetic Triangle A'B'C' (k = 2.5): A'(325, 96), B'(300, 180), C'(235, 55) -->
  <polygon points="325,96 300,180 235,55" fill="rgba(220,38,38,0.15)" stroke="#dc2626" stroke-width="2.2"/>
  
  <!-- Center Omega -->
  <circle cx="50" cy="180" r="5" fill="#0f172a"/>
  <text x="44" y="202" font-size="12" font-weight="bold" fill="#0f172a">Ω (المركز)</text>
  
  <!-- Points Triangle 1 -->
  <circle cx="160" cy="146" r="3.5" fill="#2563eb"/>
  <text x="166" y="148" font-size="11" font-weight="bold" fill="#2563eb">A</text>
  <circle cx="150" cy="180" r="3.5" fill="#2563eb"/>
  <text x="146" y="200" font-size="11" font-weight="bold" fill="#2563eb">B</text>
  <circle cx="124" cy="130" r="3.5" fill="#2563eb"/>
  <text x="110" y="126" font-size="11" font-weight="bold" fill="#2563eb">C</text>
  
  <!-- Points Triangle 2 -->
  <circle cx="325" cy="96" r="4" fill="#dc2626"/>
  <text x="334" y="98" font-size="11.5" font-weight="bold" fill="#dc2626">A'</text>
  <circle cx="300" cy="180" r="4" fill="#dc2626"/>
  <text x="300" y="202" font-size="11.5" font-weight="bold" fill="#dc2626">B'</text>
  <circle cx="235" cy="55" r="4" fill="#dc2626"/>
  <text x="230" y="46" font-size="11.5" font-weight="bold" fill="#dc2626">C'</text>
  
  <!-- Labels and notes -->
  <rect x="220" y="20" width="180" height="24" rx="4" fill="#fef2f2" stroke="#fca5a5"/>
  <text x="310" y="36" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">ΩM' = k ΩM (k = 2.5)</text>
  <text x="175" y="170" font-size="10.5" fill="#1e3a8a">المثلث الأصلي S</text>
  <text x="270" y="130" font-size="11" font-weight="bold" fill="#b91c1c">S' = k² × S</text>
</svg>`;

/** SVG: Dot Product Projection and Normal Vector to a Straight Line */
const svgDotProductOrthogonalProjection = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 230" width="400" height="230" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">
  <defs>
    <marker id="arr-green" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669"/>
    </marker>
    <marker id="arr-blue2" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1d4ed8"/>
    </marker>
  </defs>
  <rect x="10" y="10" width="380" height="210" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  
  <!-- Line AB baseline -->
  <line x1="30" y1="170" x2="370" y2="170" stroke="#94a3b8" stroke-width="1.2"/>
  
  <!-- Vector AB -->
  <line x1="60" y1="170" x2="274" y2="170" stroke="#1d4ed8" stroke-width="2.6" marker-end="url(#arr-blue2)"/>
  <!-- Vector AC -->
  <line x1="60" y1="170" x2="216" y2="64" stroke="#059669" stroke-width="2.6" marker-end="url(#arr-green)"/>
  
  <!-- Projection line CH perpendicular to AB -->
  <line x1="220" y1="60" x2="220" y2="170" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="4,4"/>
  <!-- Right angle mark at H(220, 170) -->
  <rect x="206" y="156" width="14" height="14" fill="none" stroke="#dc2626" stroke-width="1.4"/>
  
  <!-- Points -->
  <circle cx="60" cy="170" r="4.5" fill="#0f172a"/>
  <text x="50" y="192" font-size="12" font-weight="bold" fill="#0f172a">A</text>
  <circle cx="280" cy="170" r="4.5" fill="#1d4ed8"/>
  <text x="286" y="192" font-size="12" font-weight="bold" fill="#1d4ed8">B</text>
  <circle cx="220" cy="60" r="4.5" fill="#059669"/>
  <text x="226" y="56" font-size="12" font-weight="bold" fill="#059669">C</text>
  <circle cx="220" cy="170" r="4" fill="#dc2626"/>
  <text x="224" y="192" font-size="12" font-weight="bold" fill="#dc2626">H (المسقط العمودي)</text>
  
  <!-- Angle theta arc -->
  <path d="M 100 170 A 40 40 0 0 0 88 136" fill="none" stroke="#d97706" stroke-width="1.8"/>
  <text x="106" y="146" font-size="12" font-weight="bold" fill="#d97706">θ</text>
  
  <!-- Math Formula Box -->
  <rect x="250" y="24" width="134" height="48" rx="6" fill="#eff6ff" stroke="#bfdbfe"/>
  <text x="317" y="43" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">AB · AC = AB × AH</text>
  <text x="317" y="61" text-anchor="middle" font-size="10.5" fill="#1e3a8a">= ||AB|| ||AC|| cos θ</text>
</svg>`;

/** SVG: Triangle with Median and Al-Kashi Configuration */
const svgTriangleAlKashiMedian = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="400" height="240" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">
  <rect x="10" y="10" width="380" height="220" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  
  <!-- Triangle ABC: A(140, 45), B(50, 190), C(350, 190) -->
  <polygon points="140,45 50,190 350,190" fill="rgba(59,130,246,0.08)" stroke="#1e3a8a" stroke-width="2.2"/>
  
  <!-- Midpoint I of [BC]: I(200, 190) -->
  <!-- Median [AI] -->
  <line x1="140" y1="45" x2="200" y2="190" stroke="#dc2626" stroke-width="2.2" stroke-dasharray="5,4"/>
  
  <!-- Equal segment marks on BI and IC -->
  <line x1="120" y1="184" x2="120" y2="196" stroke="#0f172a" stroke-width="1.5"/>
  <line x1="124" y1="184" x2="124" y2="196" stroke="#0f172a" stroke-width="1.5"/>
  <line x1="270" y1="184" x2="270" y2="196" stroke="#0f172a" stroke-width="1.5"/>
  <line x1="274" y1="184" x2="274" y2="196" stroke="#0f172a" stroke-width="1.5"/>
  
  <!-- Points -->
  <circle cx="140" cy="45" r="4.5" fill="#1e3a8a"/>
  <text x="136" y="34" font-size="12" font-weight="bold" fill="#1e3a8a">A</text>
  <circle cx="50" cy="190" r="4.5" fill="#1e3a8a"/>
  <text x="36" y="206" font-size="12" font-weight="bold" fill="#1e3a8a">B</text>
  <circle cx="350" cy="190" r="4.5" fill="#1e3a8a"/>
  <text x="356" y="206" font-size="12" font-weight="bold" fill="#1e3a8a">C</text>
  <circle cx="200" cy="190" r="4.5" fill="#dc2626"/>
  <text x="196" y="210" font-size="12" font-weight="bold" fill="#dc2626">I (منتصف [BC])</text>
  
  <!-- Side labels -->
  <text x="80" y="112" font-size="11" font-weight="bold" fill="#2563eb">c = AB</text>
  <text x="254" y="110" font-size="11" font-weight="bold" fill="#2563eb">b = AC</text>
  <text x="200" y="180" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">a = BC</text>
  <text x="180" y="120" font-size="11" font-weight="bold" fill="#dc2626">المتوسط [AI]</text>
  
  <!-- Summary Box -->
  <rect x="220" y="20" width="160" height="48" rx="6" fill="#fef2f2" stroke="#fca5a5"/>
  <text x="300" y="38" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#991b1b">مبرهنة الكاشي:</text>
  <text x="300" y="56" text-anchor="middle" font-size="10" fill="#991b1b">a² = b² + c² - 2bc cos A</text>
</svg>`;

/** SVG: Circle with Diameter [AB] and Locus of Right Angle Points */
const svgCircleDiameterScalarProduct = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 230" width="380" height="230" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">
  <rect x="10" y="10" width="360" height="210" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  
  <!-- Circle of diameter [AB] centered at Omega(190, 115) with radius R = 75 -->
  <circle cx="190" cy="115" r="75" fill="rgba(37,99,235,0.06)" stroke="#2563eb" stroke-width="2"/>
  
  <!-- Diameter [AB]: A(115, 115), B(265, 115) -->
  <line x1="115" y1="115" x2="265" y2="115" stroke="#0f172a" stroke-width="1.8"/>
  <circle cx="190" cy="115" r="3.5" fill="#475569"/>
  <text x="186" y="132" font-size="11" fill="#475569">Ω</text>
  
  <!-- Point M on Circle: M(145, 55) -->
  <line x1="115" y1="115" x2="145" y2="55" stroke="#059669" stroke-width="2"/>
  <line x1="265" y1="115" x2="145" y2="55" stroke="#059669" stroke-width="2"/>
  
  <!-- Right Angle Symbol at M -->
  <!-- Vector MA: (-30, 60), Vector MB: (120, 60) -> perpendicular -->
  <path d="M 136 73 L 148 79 L 157 61" fill="none" stroke="#dc2626" stroke-width="1.6"/>
  
  <!-- Points -->
  <circle cx="115" cy="115" r="4.5" fill="#1e3a8a"/>
  <text x="102" y="120" font-size="12" font-weight="bold" fill="#1e3a8a">A</text>
  <circle cx="265" cy="115" r="4.5" fill="#1e3a8a"/>
  <text x="272" y="120" font-size="12" font-weight="bold" fill="#1e3a8a">B</text>
  <circle cx="145" cy="55" r="4.5" fill="#dc2626"/>
  <text x="142" y="44" font-size="12" font-weight="bold" fill="#dc2626">M</text>
  
  <!-- Text Label -->
  <rect x="180" y="24" width="180" height="26" rx="4" fill="#eff6ff" stroke="#93c5fd"/>
  <text x="270" y="41" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">MA · MB = 0 ⇔ M ∈ الدائرة (C)</text>
</svg>`;


// ============================================================================
// EXPORT: SHARED LESSONS 2AS TRIMESTER 2 (7 Interactive Lessons)
// ============================================================================

export const SHARED_LESSONS_2AS_T2: InteractiveLessonData[] = [
	// =========================================================================
	// LESSON 1: LIMITS & ASYMPTOTES (HORIZONTAL & VERTICAL)
	// =========================================================================
	{
		id: 'lesson_2as_se_t2_limits_asymptotes_horizontal_vertical',
		slug: '2as-se-t2-limits-asymptotes-horizontal-vertical',
		grade: '2as_se',
		yearSubjectId: 672,
		trimesterId: 't2',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: النهايات والسلوك التقاربي لمنحنى دالة',
		order: 1,
		titleAr: 'النهايات والسلوك التقاربي: النهايات عند اللانهاية ونهايات الدوال الناطقة والمستقيمات المقاربة',
		objectives: [
			'مفهوم نهاية دالة لما يؤول المتغير $x$ إلى $+\\infty$ أو $-\\infty$ والتفسير البياني للمستقيم المقارب الأفقي $y = L$',
			'مفهوم نهاية غير منتهية لدالة عند عدد حقيقي $a$ والتفسير البياني للمستقيم المقارب العمودي $x = a$',
			'تطبيق مبرهنات العمليات على النهايات (المجموع، الجداء، المقلوب، وحاصل القسمة) بدقة منهجية',
			'حساب نهايات كثيرات الحدود والدوال الناطقة عند اللانهاية باستعمال نهاية الحد الأعلى درجة وحاصل قسمة الحدين الأعلى درجة'
		],
		keywordsAr: [
			'نهاية دالة',
			'السلوك التقاربي',
			'المستقيم المقارب الأفقي',
			'المستقيم المقارب العمودي',
			'الدوال الناطقة'
		],
		discover: {
			scenarioAr: 'يقوم مهندس كيميائي بمراقبة تركيز مادة فعالة في مفاعل حيوي عبر الزمن $t$ (بالساعات)، حيث يُعطى التركيز $C(t)$ بالدالة الناطقة $C(t) = \\frac{3t + 2}{t + 1}$ لكل $t \\ge 0$ . في اللحظات الأولى يتغير التركيز بسرعة، ولكن ماذا يحدث للتركيز بعد مرور وقت طويل جداً ($t \\to +\\infty$)؟ وماذا يحدث بيانيا لمنحنى دالة مقلوبة بجوار القيم الممنوعة التي تعدم المقام؟ كيف نفسر هندسيا استقرار التركيز واقتراب منحنى الدالة من خطوط مستقيمة ثابتة؟',
			svg: svgFunctionCurvePlot({
				fn: (x) => (3 * x + 2) / (x + 1),
				xMin: -4,
				xMax: 6,
				yMin: -6,
				yMax: 8,
				curveLabel: 'C(t) = (3t+2)/(t+1)',
				asymptotes: [
					{ kind: 'vertical', value: -1, label: 'x = -1', color: '#dc2626' },
					{ kind: 'horizontal', value: 3, label: 'y = 3', color: '#15803d' }
				]
			}),
			steps: [
				{
					promptAr: 'احسب نهاية تركيز المادة $C(t) = \\frac{3t + 2}{t + 1}$ لما يؤول الزمن $t$ إلى $+\\infty$ باختزال الحدين ذوي الدرجة الأعلى $\\frac{3t}{t}$ . ما هي القيمة الحدية للتركيز؟',
					hintAr: 'عند اللانهاية، نهاية دالة ناطقة تساوي نهاية حاصل قسمة الحدين الأعلى درجة: $\\lim_{t \\to +\\infty} \\frac{3t}{t}$ .',
					expectedInput: '3',
					revealAr: 'لدينا $\\lim_{t \\to +\\infty} \\frac{3t + 2}{t + 1} = \\lim_{t \\to +\\infty} \\frac{3t}{t} = 3$ . هذا يعني أن التركيز يستقر عند القيمة $3$ كلما كبر الزمن، وبيانياً يقترب منحنى الدالة من المستقيم الأفقي ذي المعادلة $y = 3$ (مستقيم مقارب أفقي).'
				},
				{
					promptAr: 'لتكن الدالة $f(x) = \\frac{2x + 1}{x - 1}$ المعرفة على $\\mathbb{R} \\setminus \\{1\\}$ . عندما تقترب $x$ من القيمة الممنوعة $1$ بقيم أكبر ($x > 1$)، ما إشارة المقام $x - 1$ ؟',
					hintAr: 'إذا كان $x > 1$ فإن $x - 1 > 0$ ، أي يؤول المقام إلى $0^+$ .',
					expectedInput: '0+',
					revealAr: 'عندما $x \\to 1^+$ فإن $x - 1 \\to 0^+$ (صفر بقيم موجبة)، بينما يؤول البسط إلى $2(1) + 1 = 3 > 0$ . ومنه $\\lim_{x \\to 1^+} \\frac{2x + 1}{x - 1} = +\\infty$ .'
				},
				{
					promptAr: 'احسب الآن $\\lim_{x \\to 1^-} f(x)$ عندما تقترب $x$ من $1$ بقيم أصغر ($x < 1$).',
					hintAr: 'البسط يؤول إلى $3$ والمقام يؤول إلى $0^-$ . احسب حاصل قسمة عدد موجب على $0^-$ .',
					expectedInput: '-inf',
					revealAr: 'بما أن البسط يؤول إلى $3 > 0$ والمقام يؤول إلى $0^-$ ، فإن $\\lim_{x \\to 1^-} f(x) = -\\infty$ . بيانيا، المستقيم ذو المعادلة $x = 1$ مستقيم مقارب عمودي للمنحنى $(\\mathcal{C}_f)$ .'
				},
				{
					promptAr: 'احسب نهاية كثير الحدود $P(x) = -2x^3 + 5x^2 - 7$ عند $+\\infty$ بتطبيق مبرهنة الحد الأعلى درجة.',
					hintAr: 'نهاية كثير حدود عند اللانهاية هي نهاية حده ذي الدرجة الأعلى: $\\lim_{x \\to +\\infty} (-2x^3)$ .',
					expectedInput: '-inf',
					revealAr: '$\\lim_{x \\to +\\infty} P(x) = \\lim_{x \\to +\\infty} (-2x^3) = -2 \\times (+\\infty) = -\\infty$ . نأخذ دائماً حد الدرجة الأعلى مع إشارته ومعامله كاملاً.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**المستقيم المقارب الأفقي**: القول إن $\\lim_{x \\to +\\infty} f(x) = L$ أو $\\lim_{x \\to -\\infty} f(x) = L$ (حيث $L \\in \\mathbb{R}$) يعني هندسياً أن المستقيم $(\\Delta)$ ذا المعادلة $y = L$ مستقيم مقارب أفقي لمنحنى الدالة $(\\mathcal{C}_f)$ بجوار $+\\infty$ (أو $-\\infty$).',
				'**المستقيم المقارب العمودي**: إذا كانت نهاية الدالة $f$ عند عدد حقيقي $a$ غير منتهية، أي $\\lim_{x \\to a^+} f(x) = \\pm\\infty$ أو $\\lim_{x \\to a^-} f(x) = \\pm\\infty$ ، فإن المستقيم ذو المعادلة $x = a$ مستقيم مقارب عمودي للمنحنى $(\\mathcal{C}_f)$ .',
				'**نهاية كثير حدود عند اللانهاية**: نهاية أي دالة كثير حدود عند $+\\infty$ أو $-\\infty$ هي نهاية حدها ذي الدرجة الأعلى بمفرده: $\\lim_{x \\to \\pm\\infty} (a_n x^n + \\dots + a_1 x + a_0) = \\lim_{x \\to \\pm\\infty} (a_n x^n)$ .',
				'**نهاية دالة ناطقة عند اللانهاية**: نهاية أي دالة ناطقة $f(x) = \\frac{P(x)}{Q(x)}$ عند $+\\infty$ أو $-\\infty$ هي نهاية حاصل قسمة الحدين ذوي الدرجة الأعلى في البسط والمقام: $\\lim_{x \\to \\pm\\infty} \\frac{a_n x^n + \\dots}{b_m x^m + \\dots} = \\lim_{x \\to \\pm\\infty} \\frac{a_n x^n}{b_m x^m}$ .',
				'**قواعد الإشارة مع الصفر في المقام**: إذا كان البسط يؤول إلى عدد حقيقي غير معدوم $c \\ne 0$ والمقام يؤول إلى $0$ ، فإن النهاية تكون غير منتهية وفق قاعدة الإشارات: $\\frac{c}{0^+} = +\\infty$ إذا كان $c > 0$ ، و $\\frac{c}{0^+} = -\\infty$ إذا كان $c < 0$ .'
			],
			visualSvg: svgFunctionCurvePlot({
				fn: (x) => (2 * x - 1) / (x + 1),
				xMin: -5,
				xMax: 4,
				yMin: -6,
				yMax: 8,
				curveLabel: 'f(x) = (2x-1)/(x+1)',
				asymptotes: [
					{ kind: 'vertical', value: -1, label: 'x = -1', color: '#dc2626' },
					{ kind: 'horizontal', value: 2, label: 'y = 2', color: '#1d4ed8' }
				],
				points: [
					{ x: 0, y: -1, label: 'A(0,-1)' },
					{ x: 0.5, y: 0, label: 'B(0.5,0)' }
				]
			}),
			visualCaptionAr: 'منحنى الدالة الناطقة $f(x) = \\frac{2x - 1}{x + 1}$ موضحاً المستقيم المقارب الأفقي $y = 2$ والمستقيم المقارب العمودي $x = -1$',
			examples: [
				{
					problemAr: 'احسب النهايات التالية وفسر النتائج بيانياً إن وُجد مستقيم مقارب:\n1) $\\lim_{x \\to -\\infty} \\frac{4x^2 - 3x + 1}{2x^2 + 5}$\n2) $\\lim_{x \\to 2^+} \\frac{x - 5}{x - 2}$ و $\\lim_{x \\to 2^-} \\frac{x - 5}{x - 2}$',
					solutionAr: '1) عند $-\\infty$ ، نطبق قاعدة حاصل قسمة الحدين الأعلى درجة:\n$$\\lim_{x \\to -\\infty} \\frac{4x^2 - 3x + 1}{2x^2 + 5} = \\lim_{x \\to -\\infty} \\frac{4x^2}{2x^2} = \\lim_{x \\to -\\infty} 2 = 2$$\nالتفسير البياني: المستقيم ذو المعادلة $y = 2$ مستقيم مقارب أفقي للمنحنى بجوار $-\\infty$ .\n\n2) عند $x = 2$ : البسط يؤول إلى $2 - 5 = -3 < 0$ .\n- لما $x \\to 2^+$ : المقام $x - 2 \\to 0^+$ ، ومنه $\\lim_{x \\to 2^+} \\frac{x - 5}{x - 2} = \\frac{-3}{0^+} = -\\infty$ .\n- لما $x \\to 2^-$ : المقام $x - 2 \\to 0^-$ ، ومنه $\\lim_{x \\to 2^-} \\frac{x - 5}{x - 2} = \\frac{-3}{0^-} = +\\infty$ .\nالتفسير البياني: المستقيم ذو المعادلة $x = 2$ مستقيم مقارب عمودي للمنحنى.'
				},
				{
					problemAr: 'احسب نهاية كثير الحدود $g(x) = 3x^4 - 2x^3 + 7$ عند $-\\infty$ ، ثم احسب نهاية الدالة الناطقة $h(x) = \\frac{5x - 1}{x^3 + 2}$ عند $+\\infty$ .',
					solutionAr: '- لكثير الحدود $g$: $\\lim_{x \\to -\\infty} (3x^4 - 2x^3 + 7) = \\lim_{x \\to -\\infty} (3x^4) = 3 \\times (+\\infty) = +\\infty$ (لأن الأس $4$ زوجي).\n- للدالة الناطقة $h$: $\\lim_{x \\to +\\infty} \\frac{5x - 1}{x^3 + 2} = \\lim_{x \\to +\\infty} \\frac{5x}{x^3} = \\lim_{x \\to +\\infty} \\frac{5}{x^2} = \\frac{5}{+\\infty} = 0$ .\nالتفسير البياني: محور الفواصل ذو المعادلة $y = 0$ مستقيم مقارب أفقي للمنحنى $(\\mathcal{C}_h)$ بجوار $+\\infty$ .'
				}
			],
			watchOutAr: 'احذر خطأً شائعاً جداً: مبرهنة "الحد الأعلى درجة" في كثيرات الحدود وحاصل قسمة الحدين الأعلى درجة في الدوال الناطقة تُطبَّق **فقط وفقط عند اللانهاية** ($+\\infty$ أو $-\\infty$)، ويُمنع منعاً باتاً تطبيقها لحساب النهاية عند عدد حقيقي $x \\to a$ ! عند عدد حقيقي، نقوم بالتعويض المباشر ودراسة إشارة المقام.'
		},
		practice: [
			{
				questionAr: 'نهاية الدالة $f(x) = \\frac{-6x^3 + 4x - 1}{2x^3 - 5x^2 + 3}$ لما يؤول $x$ إلى $-\\infty$ هي:',
				options: [
					'$-3$',
					'$+3$',
					'$-\\infty$',
					'$0$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة وممتازة! نأخذ حاصل قسمة الحدين الأعلى درجة: $\\lim_{x \\to -\\infty} \\frac{-6x^3}{2x^3} = \\frac{-6}{2} = -3$ . والمستقيم $y = -3$ مقارب أفقي.',
					'خطأ: انتبه للإشارة السالبة في البسط؛ $-6 \\div 2 = -3$ وليس $+3$ .',
					'خطأ: درجتا البسط والمقام متساويتان (الدرجة $3$)، لذلك الناتج عدد حقيقي منتهٍ وليس لانهاية.',
					'خطأ: درجة البسط تساوي درجة المقام، فلا تؤول النهاية إلى الصفر.'
				],
				explanationAr: 'الدالة ناطقة وعند $-\\infty$ نطبق مبرهنة الحدين الأعلى درجة: $\\lim_{x \\to -\\infty} \\frac{-6x^3 + 4x - 1}{2x^3 - 5x^2 + 3} = \\lim_{x \\to -\\infty} \\frac{-6x^3}{2x^3} = -3$ .'
			},
			{
				questionAr: 'لتكن الدالة $g(x) = \\frac{2x - 5}{3 - x}$ . قيمة $\\lim_{x \\to 3^+} g(x)$ والتفسير البياني الموافق هما:',
				options: [
					'$\\lim_{x \\to 3^+} g(x) = +\\infty$ والمستقيم $x = 3$ مقارب عمودي',
					'$\\lim_{x \\to 3^+} g(x) = -\\infty$ والمستقيم $x = 3$ مقارب عمودي',
					'$\\lim_{x \\to 3^+} g(x) = -2$ والمستقيم $y = -2$ مقارب أفقي',
					'$\\lim_{x \\to 3^+} g(x) = +\\infty$ والمستقيم $y = 3$ مقارب أفقي'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! عند $x \\to 3^+$ يكون $x > 3$ إذن $3 - x < 0$ (أي يؤول المقام إلى $0^-$)، والبسط يؤول إلى $2(3) - 5 = 1 > 0$ . حاصل قسمة $1$ على $0^-$ هو $-\\infty$... انتظر! تحقق من إشارة البسط والمقام بدقة!',
					'إجابة ممتازة وصحيحة رياضياً! البسط يؤول إلى $2(3)-5 = 1 > 0$ والمقام $3 - x$ سالب لأن $x > 3$ (يؤول إلى $0^-$)، ومنه $\\frac{1}{0^-} = -\\infty$ ، والمستقيم $x = 3$ مستقيم مقارب عمودي.',
					'خطأ: أنت حسبت نهاية الدالة عند اللانهاية وليس عند $3^+$ !',
					'خطأ: المستقيم المقارب العمودي معادلته $x = a$ وليس $y = a$ .'
				],
				explanationAr: 'عند $x \\to 3^+$ (أي $x > 3$): البسط يؤول إلى $2(3) - 5 = 1$ (موجب)، والمقام $3 - x$ يؤول إلى $0^-$ لأن $x > 3 \\implies 3 - x < 0$ . إذن $\\frac{1}{0^-} = -\\infty$ ، والمستقيم $x = 3$ مقارب عمودي.'
			},
			{
				questionAr: 'إذا كانت دالة $h$ معرفة على $\\mathbb{R} \\setminus \\{1\\}$ بـ $h(x) = \\frac{x^2 - 4x + 3}{x - 1}$ ، فإن قيمة $\\lim_{x \\to 1} h(x)$ هي:',
				options: [
					'$-2$',
					'$+\\infty$',
					'$-\\infty$',
					'$0$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة وذكية جداً! بالتعويض نجد حالة عدم تعيين $\\frac{0}{0}$ ، وبتحليل البسط: $x^2 - 4x + 3 = (x - 1)(x - 3)$ ، نختزل $(x - 1)$ فيتبقى $\\lim_{x \\to 1} (x - 3) = 1 - 3 = -2$ . المنحنى يقبل ثقباً وليس مقارباً عمودياً.',
					'خطأ: البسط ينعدم أيضاً عند $x = 1$ ، لذا لا يمكن الاستنتاج مباشرة أن النهاية غير منتهية بل يجب التحليل والاختزال أولاً.',
					'خطأ: هذه حالة عدم تعيين $\\frac{0}{0}$ تقتضي الاختزال قبل الحكم.',
					'خطأ: بعد الاختزال نحسب $1 - 3 = -2$ وليس $0$ .'
				],
				explanationAr: 'البسط ينعدم عند $1$ لأن $1^2 - 4(1) + 3 = 0$ ، والمقام ينعدم عند $1$ . بتحليل ثلاثي الحدود: $x^2 - 4x + 3 = (x - 1)(x - 3)$ . من أجل كل $x \\ne 1$: $h(x) = x - 3$ . إذن $\\lim_{x \\to 1} h(x) = 1 - 3 = -2$ .'
			}
		]
	},

	// =========================================================================
	// LESSON 2: INDETERMINATE FORMS & OBLIQUE ASYMPTOTES
	// =========================================================================
	{
		id: 'lesson_2as_se_t2_limits_indeterminate_forms_oblique_asymptotes',
		slug: '2as-se-t2-limits-indeterminate-forms-oblique-asymptotes',
		grade: '2as_se',
		yearSubjectId: 672,
		trimesterId: 't2',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: النهايات والسلوك التقاربي لمنحنى دالة',
		order: 2,
		titleAr: 'حالات عدم التعيين وإزالتها: المستقيم المقارب المائل، الوضع النسبي، والمنحنيات المقاربة',
		objectives: [
			'التعرف على حالات عدم التعيين الأربع ($+\\infty - \\infty$ ، $0 \\times \\infty$ ، $\\frac{0}{0}$ ، $\\frac{\\infty}{\\infty}$) وتحديد أسباب ظهورها',
			'توظيف تقنيات إزالة حالات عدم التعيين: التحليل والاختزال، استخراج العامل المشترك، واستعمال المرافق',
			'إثبات أن المستقيم معادلته $y = ax + b$ مستقيم مقارب مائل لمنحنى دالة بحساب $\\lim_{x \\to \\pm\\infty} [f(x) - (ax + b)] = 0$',
			'دراسة الوضع النسبي لمنحنى دالة بالنسبة لمستقيم مقارب بحساب إشارة الفرق $f(x) - y$'
		],
		keywordsAr: [
			'حالات عدم التعيين',
			'طريقة المرافق',
			'المستقيم المقارب المائل',
			'الوضع النسبي',
			'دراسة إشارة الفرق'
		],
		discover: {
			scenarioAr: 'لتكن الدالة $f(x) = \\frac{x^2 - x - 2}{x - 1}$ المعرفة على $\\mathbb{R} \\setminus \\{1\\}$ . بإجراء القسمة الإقليدية للبسط على المقام، نكتب الدالة على الشكل التفكيكي: $f(x) = x - \\frac{2}{x - 1}$ . نلاحظ أنه كلما كبرت قيمة $x$ جداً في الاتجاهين الموجب أو السالب ($x \\to \\pm\\infty$)، يقترب الكسر $\\frac{2}{x - 1}$ من الصفر، مما يجعل الفرق بين ترتيب نقطة من المنحنى وترتيب نقطة من المستقيم $y = x$ يؤول إلى الصفر تماماً! ما هو التعريف الرياضي للمستقيم المقارب المائل؟ وكيف نحدد موضعه بالنسبة للمنحنى بدراسة إشارة الفرق؟ وكيف نتغلب على حالات عدم التعيين الأربع؟',
			svg: svgFunctionCurvePlot({
				fn: (x) => x - 2 / (x - 1),
				xMin: -4,
				xMax: 6,
				yMin: -6,
				yMax: 8,
				curveLabel: 'f(x) = x - 2/(x-1)',
				asymptotes: [
					{ kind: 'vertical', value: 1, label: 'x = 1', color: '#dc2626' },
					{ kind: 'oblique', a: 1, b: 0, label: 'y = x', color: '#2563eb' }
				]
			}),
			steps: [
				{
					promptAr: 'عند حساب $\\lim_{x \\to +\\infty} (\\sqrt{x^2 + 4x} - x)$ نجد مباشرة حالة عدم تعيين من الشكل $(+\\infty - \\infty)$. نضرب ونقسم على العبارة المرافقة $(\\sqrt{x^2 + 4x} + x)$ . بسّط البسط $(\\sqrt{x^2 + 4x} - x)(\\sqrt{x^2 + 4x} + x)$ باستعمال المتطابقة الشهيرة $(A - B)(A + B) = A^2 - B^2$ . ما هو المقدار الناتج في البسط؟',
					hintAr: '$(\\sqrt{x^2 + 4x})^2 - x^2 = x^2 + 4x - x^2$ .',
					expectedInput: '4x',
					revealAr: 'البسط يصبح $(x^2 + 4x) - x^2 = 4x$ . بعد استخراج $x$ عاملاً مشتركاً من الجذر في المقام: $x(\\sqrt{1 + 4/x} + 1)$ ، نختزل $x$ مع البسط لنحصل على $\\lim_{x \\to +\\infty} \\frac{4}{\\sqrt{1 + 4/x} + 1} = \\frac{4}{1 + 1} = 2$ .'
				},
				{
					promptAr: 'احسب نهاية الدالة $g(x) = \\frac{x^2 - 5x + 6}{x - 2}$ لما يؤول $x$ إلى $2$ . (حالة عدم تعيين $\\frac{0}{0}$ تُزال بتحليل البسط إلى جداء عاملين).',
					hintAr: 'حلل البسط: $x^2 - 5x + 6 = (x - 2)(x - 3)$ ثم اختزل العامل المشترك.',
					expectedInput: '-1',
					revealAr: 'لدينا $\\frac{(x - 2)(x - 3)}{x - 2} = x - 3$ لكل $x \\ne 2$ . إذن $\\lim_{x \\to 2} (x - 3) = 2 - 3 = -1$ .'
				},
				{
					promptAr: 'في الدالة $f(x) = x - \\frac{2}{x - 1}$ ، احسب الفرق $f(x) - x$ ثم احسب نهايته لما يؤول $x$ إلى $+\\infty$ .',
					hintAr: 'احسب الفرق مباشرة ثم احسب نهاية كسر مقامه يؤول إلى $+\\infty$ .',
					expectedInput: '0',
					revealAr: 'لدينا $f(x) - x = -\\frac{2}{x - 1}$ . وبما أن $\\lim_{x \\to +\\infty} (-\\frac{2}{x - 1}) = 0$ ، فإن المستقيم $(\\Delta)$ ذو المعادلة $y = x$ هو مستقيم مقارب مائل لمنحنى الدالة $(\\mathcal{C}_f)$ بجوار $+\\infty$ وبجوار $-\\infty$ .'
				},
				{
					promptAr: 'على المجال $]1, +\\infty[$ ، ما إشارة الفرق $f(x) - x = -\\frac{2}{x - 1}$ ؟ وهل يقع المنحنى فوق أم تحت المقارب المائل؟',
					hintAr: 'إذا كان $x > 1$ فإن المقام $x - 1 > 0$ ، فما إشارة الكسر المسبوق بإشارة ناقص؟',
					expectedInput: 'سالب',
					revealAr: 'بما أن $x - 1 > 0$ على $]1, +\\infty[$ ، فإن الفرق $f(x) - x < 0$ (سالب تماماً). وبالتالي فإن منحنى الدالة $(\\mathcal{C}_f)$ يقع **تحت** المستقيم المقارب المائل $(\\Delta)$ على هذا المجال.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**حالات عدم التعيين الأربع**: هي الحالات التي لا تمكننا العمليات الجبرية المباشرة من تعيين نهايتها فوراً، وهي: $(+\\infty - \\infty)$ ، $(0 \\times \\infty)$ ، $\\left(\\frac{0}{0}\\right)$ ، و $\\left(\\frac{\\infty}{\\infty}\\right)$ .',
				'**طرق إزالة عدم التعيين**: (1) **التحليل والاختزال** (خاصة لحالة $\\frac{0}{0}$ في الدوال الناطقة بواسطة قسمة إقليدية أو متطابقات شهيرة). (2) **استخراج العامل المشترك الأكبر** (عند اللانهاية). (3) **طريقة المرافق** (عند وجود الجذور التربيعية لفك حالة $+\\infty - \\infty$ أو $\\frac{0}{0}$).',
				'**تعريف المستقيم المقارب المائل**: يكون المستقيم $(\\Delta)$ ذو المعادلة $y = ax + b$ (مع $a \\ne 0$) مستقيماً مقارباً مائلاً لمنحنى الدالة $(\\mathcal{C}_f)$ عند $+\\infty$ (أو عند $-\\infty$) إذا وفقط إذا كان:\n$$\\lim_{x \\to \\pm\\infty} [f(x) - (ax + b)] = 0$$',
				'**دراسة الوضع النسبي**: لدراسة موضع المنحنى $(\\mathcal{C}_f)$ بالنسبة لمستقيم مقارب $(\\Delta): y = ax + b$ ، ندرس إشارة الفرق $d(x) = f(x) - (ax + b)$ على مجال التعريف:\n- إذا كان $f(x) - y > 0$ فإن $(\\mathcal{C}_f)$ يقع **فوق** $(\\Delta)$ .\n- إذا كان $f(x) - y < 0$ فإن $(\\mathcal{C}_f)$ يقع **تحت** $(\\Delta)$ .\n- إذا كان $f(x) - y = 0$ فإن $(\\mathcal{C}_f)$ يقطع $(\\Delta)$ في النقطة ذات الفاصلة $x$ .',
				'**شكل الدالة الناطقة المقاربة**: عندما تكون درجة البسط أكبر من درجة المقام بواحد تماماً، يمكن كتابة $f(x) = ax + b + \\frac{R(x)}{Q(x)}$ حيث $\\lim_{x \\to \\pm\\infty} \\frac{R(x)}{Q(x)} = 0$ ، فيكون المستقيم $y = ax + b$ مقارباً مائلاً مباشرة.'
			],
			visualSvg: svgFunctionCurvePlot({
				fn: (x) => 0.5 * x + 1 + 1 / (x - 1),
				xMin: -4,
				xMax: 6,
				yMin: -4,
				yMax: 6,
				curveLabel: 'f(x) = 0.5x + 1 + 1/(x-1)',
				asymptotes: [
					{ kind: 'vertical', value: 1, label: 'x = 1', color: '#dc2626' },
					{ kind: 'oblique', a: 0.5, b: 1, label: 'y = 0.5x + 1', color: '#16a34a' }
				]
			}),
			visualCaptionAr: 'المستقيم المقارب المائل $y = \\frac{1}{2}x + 1$ والمستقيم المقارب العمودي $x = 1$ مع توضيح الوضع النسبي للمنحنى',
			examples: [
				{
					problemAr: 'احسب النهاية: $L = \\lim_{x \\to +\\infty} (\\sqrt{x^2 + 6x} - x)$ باستعمال طريقة المرافق.',
					solutionAr: 'نضرب ونقسم على المرافق $\\sqrt{x^2 + 6x} + x$ :\n$$L = \\lim_{x \\to +\\infty} \\frac{(\\sqrt{x^2 + 6x} - x)(\\sqrt{x^2 + 6x} + x)}{\\sqrt{x^2 + 6x} + x} = \\lim_{x \\to +\\infty} \\frac{(x^2 + 6x) - x^2}{\\sqrt{x^2(1 + 6/x)} + x}$$\nبما أن $x > 0$ ، فإن $\\sqrt{x^2} = |x| = x$ ، إذن:\n$$L = \\lim_{x \\to +\\infty} \\frac{6x}{x(\\sqrt{1 + 6/x} + 1)} = \\lim_{x \\to +\\infty} \\frac{6}{\\sqrt{1 + 6/x} + 1} = \\frac{6}{\\sqrt{1 + 0} + 1} = \\frac{6}{2} = 3$$'
				},
				{
					problemAr: 'لتكن الدالة $f(x) = \\frac{2x^2 + 3x - 1}{x + 1}$ المعرفة على $\\mathbb{R} \\setminus \\{-1\\}$ .\n1) عين الأعداد $a, b, c$ بحيث: $f(x) = ax + b + \\frac{c}{x + 1}$ .\n2) أثبت أن المستقيم $(\\Delta): y = 2x + 1$ مقارب مائل لـ $(\\mathcal{C}_f)$ بجوار $\\pm\\infty$ وادرس وضعه النسبي.',
					solutionAr: '1) بالقسمة الإقليدية لـ $2x^2 + 3x - 1$ على $x + 1$ نجد الحاصل $2x + 1$ والباقي $-2$ :\n$$f(x) = 2x + 1 - \\frac{2}{x + 1}$$\nأي أن $a = 2$ و $b = 1$ و $c = -2$ .\n\n2) إثبات المقارب المائل: نحسب نهاية الفرق:\n$$\\lim_{x \\to \\pm\\infty} [f(x) - (2x + 1)] = \\lim_{x \\to \\pm\\infty} \\left(-\\frac{2}{x + 1}\\right) = 0$$\nإذن المستقيم $(\\Delta): y = 2x + 1$ مستقيم مقارب مائل بجوار $+\\infty$ و $-\\infty$ .\n\n- دراسة الوضع النسبي: إشارة الفرق $f(x) - y = -\\frac{2}{x + 1}$ :\n* على المجال $]-\\infty, -1[$ : $x + 1 < 0$ ومنه الكسر موجب $\\implies (\\mathcal{C}_f)$ يقع **فوق** $(\\Delta)$ .\n* على المجال $]-1, +\\infty[$ : $x + 1 > 0$ ومنه الكسر سالب $\\implies (\\mathcal{C}_f)$ يقع **تحت** $(\\Delta)$ .'
				}
			],
			watchOutAr: 'احذر بشدة عند إخراج $x$ من تحت الجذر التربيعي عند $-\\infty$ ! القاعدة الرياضية الصارمة هي $\\sqrt{x^2} = |x|$ . وبالتالي إذا كان $x \\to -\\infty$ فإن $x < 0$ ومنه $\\sqrt{x^2} = -x$ وليس $+x$ ! نسيان هذه الإشارة السالبة يقلب إشارة النهاية بالكامل ويعد أشهر فخ في مواضيع البكالوريا.'
		},
		practice: [
			{
				questionAr: 'قيمة النهاية $\\lim_{x \\to +\\infty} (\\sqrt{x^2 + 2x + 3} - x)$ هي:',
				options: [
					'$1$',
					'$0$',
					'$+\\infty$',
					'$2$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة ومتقنة! بالضرب في المرافق نحصل على $\\frac{2x + 3}{\\sqrt{x^2+2x+3} + x}$ ، وباستخراج $x$ عاملاً مشتركاً نجد $\\frac{2}{1 + 1} = 1$ .',
					'خطأ: التعويض الشكلي السريع يوقعك في فخ الصفر؛ استخدم المرافق للتأكد من النهاية المضبوطة.',
					'خطأ: هذه حالة عدم تعيين $(+\\infty - \\infty)$ ولا يمكن الحكم بـ $+\\infty$ دون فك عدم التعيين.',
					'خطأ: قسمت $2$ على $1$ فقط ونسيت جمع معاملي $x$ في المقام ($1 + 1 = 2$).'
				],
				explanationAr: 'نضرب ونقسم بالمرافق: $\\frac{(x^2 + 2x + 3) - x^2}{\\sqrt{x^2(1 + 2/x + 3/x^2)} + x} = \\frac{2x + 3}{x(\\sqrt{1 + 2/x + 3/x^2} + 1)}$ . باختزال $x$ لما $x \\to +\\infty$ نجد $\\frac{2}{1 + 1} = 1$ .'
			},
			{
				questionAr: 'إذا كانت $f(x) = 3x - 2 + \\frac{5}{x^2 + 1}$ ، فإن المستقيم $(\\Delta)$ ذو المعادلة $y = 3x - 2$ يمثل:',
				options: [
					'مستقيماً مقارباً مائلاً للمنحنى بجوار $+\\infty$ وبجوار $-\\infty$',
					'مستقيماً مقارباً أفقياً للمنحنى بجوار $+\\infty$',
					'مستقيماً مقارباً عمودياً للمنحنى عند $x = 0$',
					'مماساً للمنحنى عند نقطة انعطاف فقط'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! الفرق $f(x) - (3x - 2) = \\frac{5}{x^2 + 1}$ يؤول إلى $0$ عند $+\\infty$ وعند $-\\infty$ ، ومعادلته من الدرجة الأولى $y = ax + b$ .',
					'خطأ: المعادلة $y = 3x - 2$ فيها ميل $a = 3 \\ne 0$ فهو مستقيم مائل وليس أفقياً.',
					'خطأ: المستقيم العمودي معادلته $x = k$ وليس $y = ax + b$ .',
					'خطأ: هذا خط مقارب للمنحنى عند اللانهاية وفق التعريف الصارم.'
				],
				explanationAr: '$\\lim_{x \\to \\pm\\infty} [f(x) - (3x - 2)] = \\lim_{x \\to \\pm\\infty} \\frac{5}{x^2 + 1} = 0$ . وحسب التعريف، $y = 3x - 2$ مستقيم مقارب مائل عند $+\\infty$ وعند $-\\infty$ .'
			},
			{
				questionAr: 'ليكن المستقيم $(\\Delta): y = 2x - 1$ والمنحنى $(\\mathcal{C}_f)$ المعرف بـ $f(x) = 2x - 1 - \\frac{4}{x - 3}$ على المجال $]3, +\\infty[$ . الوضع النسبي للمنحنى بالنسبة للمستقيم هو:',
				options: [
					'$(\\mathcal{C}_f)$ يقع تماماً تحت المستقيم $(\\Delta)$',
					'$(\\mathcal{C}_f)$ يقع تماماً فوق المستقيم $(\\Delta)$',
					'$(\\mathcal{C}_f)$ يقطع المستقيم $(\\Delta)$ في النقطة ذات الفاصلة $x = 3$',
					'$(\\mathcal{C}_f)$ ينطبق تماماً على المستقيم $(\\Delta)$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة وممتازة! الفرق $f(x) - y = -\\frac{4}{x - 3}$ . على المجال $]3, +\\infty[$ يكون $x - 3 > 0$ ، وبالتالي الفرق سالب تماماً مما يعني أن المنحنى تحت المستقيم.',
					'خطأ: انتبه للإشارة السالبة أمام الكسر؛ المقام موجب والبسط سالب فالكسر ككل سالب.',
					'خطأ: القيمة $x = 3$ قيمة ممنوعة أصلاً تعدم المقام ولا تنتمي لمجال تعريف الدالة.',
					'خطأ: الفرق لا يساوي الصفر على أي مجال بل يؤول إلى الصفر فقط عند اللانهاية.'
				],
				explanationAr: 'الفرق $f(x) - y = -\\frac{4}{x - 3}$ . من أجل كل $x > 3$ ، لدينا $x - 3 > 0$ ومنه $-\\frac{4}{x - 3} < 0$ . إذن الفرق سالب تماماً، مما يعني أن $(\\mathcal{C}_f)$ يقع تحت $(\\Delta)$ على هذا المجال.'
			}
		]
	},

	// =========================================================================
	// LESSON 3: ORIENTED ANGLES & TRIGONOMETRIC CIRCLE
	// =========================================================================
	{
		id: 'lesson_2as_se_t2_oriented_angles_trig_circle_radian',
		slug: '2as-se-t2-oriented-angles-trig-circle-radian',
		grade: '2as_se',
		yearSubjectId: 672,
		trimesterId: 't2',
		sequenceId: 'seq5',
		sequenceTitleAr: 'المقطع الخامس: الزوايا الموجهة وحساب المثلثات',
		order: 3,
		titleAr: 'الزوايا الموجهة: الدائرة المثلثية، الراديان، الزوايا الموجهة لشعاعين والأقياس الرئيسية',
		objectives: [
			'التعرف على الراديان كوحدة لقياس الزوايا والتحويل بين الدرجات والراديان ومفهوم التوجيه المباشر',
			'تعريف الزاوية الموجهة لشعاعين غير معدومين $(\\vec{u}, \\vec{v})$ وكتابة القياس العام $(\\vec{u}, \\vec{v}) = \\alpha + 2k\\pi$ مع $k \\in \\mathbb{Z}$',
			'تعيين القياس الرئيسي لزاوية موجهة في المجال نصف المفتوح $]-\\pi; \\pi]$ وتمثيله على الدائرة المثلثية',
			'توظيف خواص الزوايا الموجهة: علاقة شال، والزوايا المتعاكسة والمتكاملة لحساب أقياس الزوايا'
		],
		keywordsAr: [
			'الدائرة المثلثية',
			'الراديان',
			'الزاوية الموجهة لشعاعين',
			'القياس الرئيسي',
			'علاقة شال للزوايا'
		],
		discover: {
			scenarioAr: 'في نظام التوجيه والملاحة الفضائية وتحريك أذرع الروبوتات، لا يكفي معرفة مقدار الانفراج الزاوي بين محورين، بل يجب تحديد اتجاه الدوران بدقة (موجب عكس عقارب الساعة أو سالب معها) وعدد الدورات الكاملة المنجزة. إذا دارت ذراع ميكانيكية بزاوية قدرها $\\theta = \\frac{25\\pi}{4}$ راديان، فكم دورة كاملة أنجزتها الذراع، وما هو موضعها النهائي الدقيق الممثل بالقياس الرئيسي $\\alpha \\in ]-\\pi; \\pi]$ على الدائرة المثلثية؟',
			svg: svgTrigonometricCircle({
				anglesRad: [
					{ rad: Math.PI / 4, label: 'pi/4', color: '#1d4ed8' },
					{ rad: (3 * Math.PI) / 4, label: '3pi/4', color: '#15803d' },
					{ rad: -Math.PI / 2, label: '-pi/2', color: '#dc2626' }
				]
			}),
			steps: [
				{
					promptAr: 'نعلم أن زاوية مستقيمة قياسها بالدرجات $180^\\circ$ يقابلها بالراديان $\\pi$ راد. حوّل الزاوية $150^\\circ$ إلى الراديان على شكل كسر غير قابل للاختزال بدلالة $\\pi$ .',
					hintAr: 'استعمل العلاقة الثلاثية: $\\alpha = 150 \\times \\frac{\\pi}{180}$ ثم اختزل الكسر $\\frac{150}{180}$ .',
					expectedInput: '5pi/6',
					revealAr: '$\\alpha = \\frac{150\\pi}{180} = \\frac{5\\pi}{6}$ راد. وبالمثل كل زاوية شهيرة لها قياس مباشر بالراديان: $30^\\circ = \\frac{\\pi}{6}$ ، $45^\\circ = \\frac{\\pi}{4}$ ، $60^\\circ = \\frac{\\pi}{3}$ ، $90^\\circ = \\frac{\\pi}{2}$ .'
				},
				{
					promptAr: 'حوّل الزاوية $\\beta = \\frac{7\\pi}{4}$ راد إلى الدرجات.',
					hintAr: 'عوض $\\pi$ بـ $180^\\circ$ واحسب: $\\frac{7 \\times 180}{4}$ .',
					expectedInput: '315',
					revealAr: '$\\beta = \\frac{7 \\times 180^\\circ}{4} = 7 \\times 45^\\circ = 315^\\circ$ .'
				},
				{
					promptAr: 'لتعيين القياس الرئيسي للزاوية $\\theta = \\frac{25\\pi}{4}$ ، نكتب الكسر على شكل $2k\\pi + \\alpha$ مع $\\alpha \\in ]-\\pi, \\pi]$ . نلاحظ أن $25 = 24 + 1 = 4 \\times 6 + 1$ ، إذن $\\frac{25\\pi}{4} = 6\\pi + \\frac{\\pi}{4} = 3(2\\pi) + \\frac{\\pi}{4}$ . ما هو القياس الرئيسي للزاوية؟',
					hintAr: 'القياس الرئيسي هو القيمة المتبقية بعد طرح الدورات الزوجية $2k\\pi$ بشرط أن تنتمي للمجال $]-\\pi, \\pi]$ .',
					expectedInput: 'pi/4',
					revealAr: 'القياس الرئيسي هو $\\alpha = \\frac{\\pi}{4}$ راديان (لأن $\\frac{\\pi}{4} \\in ]-\\pi, \\pi]$)، والذراع أنجزت $3$ دورات كاملة واستقرت عند $\\frac{\\pi}{4}$ .'
				},
				{
					promptAr: 'لتكن ثلاثة أشعة غير معدومة $\\vec{u}, \\vec{v}, \\vec{w}$ حيث $(\\vec{u}, \\vec{v}) = \\frac{\\pi}{3}$ و $(\\vec{v}, \\vec{w}) = \\frac{\\pi}{2}$ . احسب قياس الزاوية $(\\vec{u}, \\vec{w})$ بتطبيق علاقة شال للزوايا الموجهة.',
					hintAr: 'علاقة شال: $(\\vec{u}, \\vec{w}) = (\\vec{u}, \\vec{v}) + (\\vec{v}, \\vec{w})$ . وحد المقامات واجمع.',
					expectedInput: '5pi/6',
					revealAr: 'حسب علاقة شال: $(\\vec{u}, \\vec{w}) = \\frac{\\pi}{3} + \\frac{\\pi}{2} = \\frac{2\\pi + 3\\pi}{6} = \\frac{5\\pi}{6} [2\\pi]$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**الدائرة المثلثية والراديان**: الدائرة المثلثية هي دائرة موجهة توجيهاً مباشراً (عكس اتجاه عقارب الساعة) نصف قطرها $R = 1$ ومزودة بمعلم متعامد ومتجانس $(O; \\vec{i}, \\vec{j})$ . الراديان هو قياس زاوية مركزية تحصر قوساً طوله يساوي نصف القطر، ويكون $\\pi \\text{ rad} = 180^\\circ$ .',
				'**الزاوية الموجهة لشعاعين**: إذا كان $\\vec{u}$ و $\\vec{v}$ شعاعين غير معدومين، فإن الزاوية الموجهة $(\\vec{u}, \\vec{v})$ تقبل عدداً غير منتهٍ من الأقياس بالراديان تختلف عن بعضها بمضاعفات صحيحة لـ $2\\pi$ :\n$$(\\vec{u}, \\vec{v}) = \\alpha + 2k\\pi \\quad (k \\in \\mathbb{Z})$$',
				'**القياس الرئيسي**: من بين جميع أقياس الزاوية الموجهة $(\\vec{u}, \\vec{v})$ ، يوجد قياس وحيد ينتمي إلى المجال نصف المفتوح $]-\\pi; \\pi]$ ويُسمى **القياس الرئيسي** للزاوية الموجهة.',
				'**علاقة شال للأشعة**: لكل ثلاثة أشعة غير معدومة $\\vec{u}, \\vec{v}, \\vec{w}$ في المستوي:\n$$(\\vec{u}, \\vec{v}) + (\\vec{v}, \\vec{w}) = (\\vec{u}, \\vec{w}) + 2k\\pi \\quad (k \\in \\mathbb{Z})$$',
				'**خواص المعاكس والأشعة المضروبة بثابت**:\n- $(\\vec{v}, \\vec{u}) = -(\\vec{u}, \\vec{v}) + 2k\\pi$\n- $(-\\vec{u}, \\vec{v}) = (\\vec{u}, \\vec{v}) + \\pi + 2k\\pi$\n- $(-\\vec{u}, -\\vec{v}) = (\\vec{u}, \\vec{v}) + 2k\\pi$\n- إذا كان $k k\' > 0$ فإن $(k\\vec{u}, k\'\\vec{v}) = (\\vec{u}, \\vec{v})$ ، وإذا كان $k k\' < 0$ فإن $(k\\vec{u}, k\'\\vec{v}) = (\\vec{u}, \\vec{v}) + \\pi$ .'
			],
			visualSvg: svgTrigonometricCircle({
				anglesRad: [
					{ rad: Math.PI / 6, label: 'pi/6', color: '#2563eb' },
					{ rad: Math.PI / 4, label: 'pi/4', color: '#16a34a' },
					{ rad: Math.PI / 3, label: 'pi/3', color: '#7c3aed' },
					{ rad: Math.PI / 2, label: 'pi/2', color: '#dc2626' },
					{ rad: (2 * Math.PI) / 3, label: '2pi/3', color: '#d97706' }
				]
			}),
			visualCaptionAr: 'الدائرة المثلثية الموجهة توجيهاً مباشراً مع تمثيل أهم الأقياس الشهيرة بالراديان',
			examples: [
				{
					problemAr: 'عين القياس الرئيسي للزاويتين الموجهتين التاليتين ومثلهما على الدائرة المثلثية:\n1) $\\alpha = \\frac{73\\pi}{6}$\n2) $\\beta = -\\frac{43\\pi}{4}$',
					solutionAr: '1) نقسم $73$ على $6$ : $73 = 12 \\times 6 + 1$ ، إذن:\n$$\\alpha = \\frac{72\\pi + \\pi}{6} = 12\\pi + \\frac{\\pi}{6} = 6(2\\pi) + \\frac{\\pi}{6}$$\nبما أن $\\frac{\\pi}{6} \\in ]-\\pi; \\pi]$ ، فإن القياس الرئيسي هو $\\frac{\\pi}{6}$ .\n\n2) نقسم $-43$ على $4$ : أقرب مضاعف زوجي للعدد $4$ هو $-44$ حيث $-43 = -44 + 1$ ، إذن:\n$$\\beta = \\frac{-44\\pi + \\pi}{4} = -11\\pi + \\frac{\\pi}{4}$$\nلكن $-11\\pi$ فردي! لنأخذ مضاعفاً زوجياً لـ $2\\pi$ : $-43 = -40 - 3$ أو $-48 + 5$ :\n$$\\beta = \\frac{-40\\pi - 3\\pi}{4} = -10\\pi - \\frac{3\\pi}{4} = -5(2\\pi) - \\frac{3\\pi}{4}$$\nبما أن $-\\frac{3\\pi}{4} \\in ]-\\pi; \\pi]$ ، فإن القياس الرئيسي لـ $\\beta$ هو $-\\frac{3\\pi}{4}$ .'
				},
				{
					problemAr: 'ليكن $(\\vec{u}, \\vec{v}) = \\frac{2\\pi}{3} [2\\pi]$ . احسب أقياس الزوايا الموجهة التالية:\n1) $(\\vec{v}, \\vec{u})$\n2) $(-\\vec{u}, \\vec{v})$\n3) $(-3\\vec{u}, 2\\vec{v})$',
					solutionAr: '1) $(\\vec{v}, \\vec{u}) = -(\\vec{u}, \\vec{v}) = -\\frac{2\\pi}{3} [2\\pi]$ .\n2) $(-\\vec{u}, \\vec{v}) = (\\vec{u}, \\vec{v}) + \\pi = \\frac{2\\pi}{3} + \\pi = \\frac{5\\pi}{3} \\equiv -\\frac{\\pi}{3} [2\\pi]$ .\n3) $(-3\\vec{u}, 2\\vec{v})$: المعامل الأول $-3 < 0$ والثاني $2 > 0$ ، إذن جداؤهما سالب! وبالتالي:\n$$(-3\\vec{u}, 2\\vec{v}) = (\\vec{u}, \\vec{v}) + \\pi = \\frac{2\\pi}{3} + \\pi = \\frac{5\\pi}{3} \\equiv -\\frac{\\pi}{3} [2\\pi]$$'
				}
			],
			watchOutAr: 'تذكر دائماً أن القياس الرئيسي ينتمي حصراً إلى المجال $]-\\pi; \\pi]$ : مفتوح عند $-\\pi$ ومغلق عند $+\\pi$ . فإذا كانت النتيجة الحسابية $-\\pi$ ، فإن قياسها الرئيسي الصحيح هو $+\\pi$ وليس $-\\pi$ !'
		},
		practice: [
			{
				questionAr: 'القياس الرئيسي للزاوية الموجهة $\\theta = \\frac{31\\pi}{4}$ هو:',
				options: [
					'$-\\frac{\\pi}{4}$',
					'$\\frac{\\pi}{4}$',
					'$\\frac{3\\pi}{4}$',
					'$-\\frac{3\\pi}{4}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة وممتازة! $\\frac{31\\pi}{4} = \\frac{32\\pi - \\pi}{4} = 8\\pi - \\frac{\\pi}{4} = 4(2\\pi) - \\frac{\\pi}{4}$ . وبما أن $-\\frac{\\pi}{4} \\in ]-\\pi, \\pi]$ فهو القياس الرئيسي.',
					'خطأ: $31 = 32 - 1$ وليس $32 + 1$ ، إذن الإشارة سالبة $-\\frac{\\pi}{4}$ .',
					'خطأ: راجع قسمة $31$ على $4$ ؛ أقرب مضاعف لـ $8$ هو $32$ .',
					'خطأ: هذا القياس لا يعطي $31\\pi/4$ بعد إضافة دورات كاملة.'
				],
				explanationAr: '$\\frac{31\\pi}{4} = \\frac{32\\pi - \\pi}{4} = 8\\pi - \\frac{\\pi}{4} = 4(2\\pi) - \\frac{\\pi}{4}$ . بما أن $-\\frac{\\pi}{4} \\in ]-\\pi; \\pi]$ ، فإن القياس الرئيسي هو $-\\frac{\\pi}{4}$ .'
			},
			{
				questionAr: 'إذا كان $(\\vec{u}, \\vec{v}) = \\frac{3\\pi}{4} [2\\pi]$ ، فإن قياس الزاوية الموجهة $(-\\vec{u}, \\vec{v})$ هو:',
				options: [
					'$-\\frac{\\pi}{4}$',
					'$\\frac{3\\pi}{4}$',
					'$\\frac{\\pi}{4}$',
					'$-\\frac{3\\pi}{4}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $(-\\vec{u}, \\vec{v}) = (\\vec{u}, \\vec{v}) + \\pi = \\frac{3\\pi}{4} + \\pi = \\frac{7\\pi}{4}$ . وقياسها الرئيسي: $\\frac{7\\pi}{4} - 2\\pi = -\\frac{\\pi}{4}$ .',
					'خطأ: نسيت إضافة $\\pi$ الناتجة عن إشارة الناقص في الشعاع الأول.',
					'خطأ: $\\frac{3\\pi}{4} + \\pi = \\frac{7\\pi}{4} \\equiv -\\frac{\\pi}{4}$ وليس $+\\frac{\\pi}{4}$ .',
					'خطأ: هذا قياس المعاكس المباشر $(\\vec{v}, \\vec{u})$ .'
				],
				explanationAr: 'حسب خواص الزوايا الموجهة: $(-\\vec{u}, \\vec{v}) = (\\vec{u}, \\vec{v}) + \\pi = \\frac{3\\pi}{4} + \\pi = \\frac{7\\pi}{4}$ . وبطرح دورة كاملة $2\\pi$ : $\\frac{7\\pi}{4} - 2\\pi = -\\frac{\\pi}{4} \\in ]-\\pi, \\pi]$ .'
			},
			{
				questionAr: 'في مثلث $ABC$ مباشر، إذا كان $(\\vec{AB}, \\vec{AC}) = \\frac{\\pi}{3}$ و $(\\vec{BA}, \\vec{BC}) = \\frac{\\pi}{4}$ ، فإن قياس الزاوية $(\\vec{CA}, \\vec{CB})$ يساوي:',
				options: [
					'$\\frac{5\\pi}{12}$',
					'$\\frac{7\\pi}{12}$',
					'$\\frac{\\pi}{12}$',
					'$-\\frac{5\\pi}{12}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة وممتازة! مجموع زوايا المثلث هو $\\pi$ ، إذن زاوية الرأس $C$ هي $\\pi - (\\frac{\\pi}{3} + \\frac{\\pi}{4}) = \\pi - \\frac{7\\pi}{12} = \\frac{5\\pi}{12}$ ، وبما أن المثلث مباشر فإن الاتجاه موجب.',
					'خطأ: $\\frac{7\\pi}{12}$ هو مجموع زاويتي $A$ و $B$ ، وعليك طرحه من $\\pi$ للحصول على زاوية $C$ .',
					'خطأ: احسب توحيد المقامات بعناية: $\\pi - \\frac{7\\pi}{12} = \\frac{5\\pi}{12}$ .',
					'خطأ: المثلث مباشر فتكون الزاوية موجبة.'
				],
				explanationAr: 'في المثلث $ABC$ المباشر، مجموع الأقياس الهندسية للزوايا يساوي $\\pi$ : $\\widehat{C} = \\pi - (\\widehat{A} + \\widehat{B}) = \\pi - \\left(\\frac{\\pi}{3} + \\frac{\\pi}{4}\\right) = \\pi - \\frac{7\\pi}{12} = \\frac{5\\pi}{12}$ . ومنه $(\\vec{CA}, \\vec{CB}) = \\frac{5\\pi}{12} [2\\pi]$ .'
			}
		]
	},

	// =========================================================================
	// LESSON 4: TRIGONOMETRIC FORMULAS & EQUATIONS
	// =========================================================================
	{
		id: 'lesson_2as_se_t2_trigonometry_addition_formulas_equations',
		slug: '2as-se-t2-trigonometry-addition-formulas-equations',
		grade: '2as_se',
		yearSubjectId: 672,
		trimesterId: 't2',
		sequenceId: 'seq5',
		sequenceTitleAr: 'المقطع الخامس: الزوايا الموجهة وحساب المثلثات',
		order: 4,
		titleAr: 'حساب المثلثات: دساتير التحويل، المعادلات والمتراجحات المثلثية الأساسية',
		objectives: [
			'معرفة وتطبيق دساتير الجمع: $\\cos(a \\pm b)$ و $\\sin(a \\pm b)$ واستنتاج دساتير الضعف $\\cos(2a)$ و $\\sin(2a)$',
			'استعمال دساتير التحويل لتبسيط عبارات مثلثية وحساب القيم المضبوطة لنسب مثلثية لزوايا غير شهيرة',
			'حل المعادلات المثلثية الأساسية: $\\cos x = \\cos \\alpha$ و $\\sin x = \\sin \\alpha$ و $\\tan x = \\tan \\alpha$ على $\\mathbb{R}$ وفي مجال محدد',
			'حل متراجحات مثلثية بسيطة بالاعتماد على التمثيل والقراءة المباشرة على الدائرة المثلثية'
		],
		keywordsAr: [
			'دساتير الجمع',
			'دساتير الضعف',
			'المعادلات المثلثية',
			'المتراجحات المثلثية',
			'القيم المضبوطة'
		],
		discover: {
			scenarioAr: 'في هندسة الاتصالات وتوليد الإشارات الكهرومغناطيسية، ينتج عن تراكب موجتين جيبيتين تردد مقداره $u(t) = \\cos(\\omega t) + \\sqrt{3}\\sin(\\omega t)$ . لكتابة هذه الإشارة على شكل موجة جيبية وحيدة $u(t) = 2 \\cos\\left(\\omega t - \\frac{\\pi}{3}\\right)$ ولحساب قيمتها الدقيقة عند زاوية غير شهيرة مثل $\\frac{\\pi}{12}$ بدقة مطلقة دون آلة حاسبة، نحتاج إلى توظيف دساتير الجمع ودساتير الضعف في حساب المثلثات. كيف نشتق هذه القوانين ونوظفها في حل المعادلات والمتراجحات؟',
			svg: svgTrigonometricCircle({
				anglesRad: [
					{ rad: Math.PI / 6, label: 'pi/6', color: '#1d4ed8' },
					{ rad: Math.PI / 4, label: 'pi/4', color: '#16a34a' },
					{ rad: Math.PI / 3, label: 'pi/3', color: '#dc2626' }
				]
			}),
			steps: [
				{
					promptAr: 'نلاحظ أن $\\frac{\\pi}{12} = \\frac{\\pi}{3} - \\frac{\\pi}{4}$ . بتطبيق دستور الجمع $\\cos(a - b) = \\cos a \\cos b + \\sin a \\sin b$ على الزاويتين $a = \\frac{\\pi}{3}$ و $b = \\frac{\\pi}{4}$ ، احسب القيمة المضبوطة لـ $\\cos\\left(\\frac{\\pi}{12}\\right)$ . ما هو بسط هذا المقدار بعد توحيد المقام على $4$ ؟',
					hintAr: 'نعلم أن $\\cos\\frac{\\pi}{3} = \\frac{1}{2}$ و $\\cos\\frac{\\pi}{4} = \\frac{\\sqrt{2}}{2}$ و $\\sin\\frac{\\pi}{3} = \\frac{\\sqrt{3}}{2}$ و $\\sin\\frac{\\pi}{4} = \\frac{\\sqrt{2}}{2}$ .',
					expectedInput: 'sqrt(6)+sqrt(2)',
					revealAr: '$\\cos\\left(\\frac{\\pi}{12}\\right) = \\frac{1}{2} \\times \\frac{\\sqrt{2}}{2} + \\frac{\\sqrt{3}}{2} \\times \\frac{\\sqrt{2}}{2} = \\frac{\\sqrt{2} + \\sqrt{6}}{4} = \\frac{\\sqrt{6} + \\sqrt{2}}{4}$ . هذه هي القيمة المضبوطة.'
				},
				{
					promptAr: 'إذا علمت أن $\\sin a = \\frac{3}{5}$ وزاويتك حادة $a \\in [0, \\frac{\\pi}{2}]$ ، فإن $\\cos a = \\sqrt{1 - (3/5)^2} = \\frac{4}{5}$ . احسب القيمة المضبوطة لـ $\\sin(2a)$ باستعمال دستور الضعف $\\sin(2a) = 2 \\sin a \\cos a$ .',
					hintAr: 'احسب $2 \\times \\frac{3}{5} \\times \\frac{4}{5}$ .',
					expectedInput: '24/25',
					revealAr: '$\\sin(2a) = 2 \\times \\frac{3}{5} \\times \\frac{4}{5} = \\frac{24}{25} = 0.96$ .'
				},
				{
					promptAr: 'حل في المجال $[0, 2\\pi[$ المعادلة المثلثية $\\cos x = \\frac{1}{2}$ . ما هما الحلان في هذا المجال؟',
					hintAr: 'نعلم أن $\\cos\\frac{\\pi}{3} = \\frac{1}{2}$ ، والحل الثاني هو $2\\pi - \\frac{\\pi}{3}$ .',
					expectedInput: 'pi/3, 5pi/3',
					revealAr: 'حلول $\\cos x = \\frac{1}{2}$ في $[0, 2\\pi[$ هما $x_1 = \\frac{\\pi}{3}$ و $x_2 = 2\\pi - \\frac{\\pi}{3} = \\frac{5\\pi}{3}$ (أو $-\\frac{\\pi}{3}$ في المجال $]-\\pi, \\pi]$).'
				},
				{
					promptAr: 'على المجال $[-\\pi, \\pi]$ ، حدد مجموعة حلول المتراجحة $\\cos x \\ge \\frac{1}{2}$ بالقراءة المباشرة على محور الفواصل في الدائرة المثلثية.',
					hintAr: 'نحدد القوس المقابل للقيم الأكبر من أو تساوي $1/2$ على محور الفواصل بين $-\\frac{\\pi}{3}$ و $+\\frac{\\pi}{3}$ .',
					expectedInput: '[-pi/3, pi/3]',
					revealAr: 'قيم جيب التمام الأكبر من $\\frac{1}{2}$ تقع على يمين النقطتين $\\frac{\\pi}{3}$ و $-\\frac{\\pi}{3}$ ، إذن مجموعة الحلول هي المجال المغلق $S = \\left[-\\frac{\\pi}{3}, \\frac{\\pi}{3}\\right]$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**دساتير الجمع (Formules d\'addition)**:\n- $\\cos(a - b) = \\cos a \\cos b + \\sin a \\sin b$\n- $\\cos(a + b) = \\cos a \\cos b - \\sin a \\sin b$\n- $\\sin(a + b) = \\sin a \\cos b + \\cos a \\sin b$\n- $\\sin(a - b) = \\sin a \\cos b - \\cos a \\sin b$',
				'**دساتير الضعف (Formules de duplication)**:\n- $\\sin(2a) = 2 \\sin a \\cos a$\n- $\\cos(2a) = \\cos^2 a - \\sin^2 a = 2\\cos^2 a - 1 = 1 - 2\\sin^2 a$',
				'**دساتير خفض الدرجة (Linéarisation)**:\n$$\\cos^2 a = \\frac{1 + \\cos(2a)}{2} \\qquad \\sin^2 a = \\frac{1 - \\cos(2a)}{2}$$',
				'**حل المعادلات المثلثية الأساسية في $\\mathbb{R}$**:\n- $\\cos x = \\cos \\alpha \\iff x = \\alpha + 2k\\pi \\quad \\text{أو} \\quad x = -\\alpha + 2k\\pi \\quad (k \\in \\mathbb{Z})$\n- $\\sin x = \\sin \\alpha \\iff x = \\alpha + 2k\\pi \\quad \\text{أو} \\quad x = \\pi - \\alpha + 2k\\pi \\quad (k \\in \\mathbb{Z})$',
				'**حل المتراجحات المثلثية**: لحل متراجحة مثل $\\cos x \\ge c$ أو $\\sin x \\le c$ ، نعيّن أولاً حلول المعادلة على الدائرة المثلثية، ثم نحدد القوس (أو الأقواس) التي تحقق المتراجحة، ونكتب مجالات الحلول مراعين بدقة المجال المطلوب (مثل $[0, 2\\pi[$ أو $]-\\pi, \\pi]$).'
			],
			visualSvg: svgTrigonometricCircle({
				anglesRad: [
					{ rad: Math.PI / 4, label: 'pi/4', color: '#16a34a' },
					{ rad: -Math.PI / 4, label: '-pi/4', color: '#16a34a' },
					{ rad: (3 * Math.PI) / 4, label: '3pi/4', color: '#dc2626' },
					{ rad: -(3 * Math.PI) / 4, label: '-3pi/4', color: '#dc2626' }
				]
			}),
			visualCaptionAr: 'تمثيل حلول المعادلة $\\cos x = \\frac{\\sqrt{2}}{2}$ والقوس المحقق للمتراجحة على الدائرة المثلثية',
			examples: [
				{
					problemAr: '1) احسب القيمة المضبوطة لـ $\\sin\\left(\\frac{5\\pi}{12}\\right)$ بكتابة $\\frac{5\\pi}{12} = \\frac{\\pi}{6} + \\frac{\\pi}{4}$ .\n2) استنتج $\\cos\\left(\\frac{5\\pi}{12}\\right)$ .',
					solutionAr: '1) نطبق دستور الجمع لجيب الزاوية:\n$$\\sin\\left(\\frac{\\pi}{6} + \\frac{\\pi}{4}\\right) = \\sin\\frac{\\pi}{6} \\cos\\frac{\\pi}{4} + \\cos\\frac{\\pi}{6} \\sin\\frac{\\pi}{4} = \\frac{1}{2} \\times \\frac{\\sqrt{2}}{2} + \\frac{\\sqrt{3}}{2} \\times \\frac{\\sqrt{2}}{2} = \\frac{\\sqrt{6} + \\sqrt{2}}{4}$$\n\n2) لحساب جيب التمام:\n$$\\cos\\left(\\frac{\\pi}{6} + \\frac{\\pi}{4}\\right) = \\cos\\frac{\\pi}{6} \\cos\\frac{\\pi}{4} - \\sin\\frac{\\pi}{6} \\sin\\frac{\\pi}{4} = \\frac{\\sqrt{3}}{2} \\times \\frac{\\sqrt{2}}{2} - \\frac{1}{2} \\times \\frac{\\sqrt{2}}{2} = \\frac{\\sqrt{6} - \\sqrt{2}}{4}$$'
				},
				{
					problemAr: 'حل في المجال $[0, 2\\pi[$ المعادلة: $2\\sin^2 x - 3\\sin x + 1 = 0$ .',
					solutionAr: 'نضع المتغير المساعد $X = \\sin x$ بشرط $-1 \\le X \\le 1$ . تصبح المعادلة من الدرجة الثانية: $2X^2 - 3X + 1 = 0$ .\n- المميز $\\Delta = (-3)^2 - 4(2)(1) = 9 - 8 = 1 > 0$ .\n- الجذران: $X_1 = \\frac{3 - 1}{4} = \\frac{1}{2}$ و $X_2 = \\frac{3 + 1}{4} = 1$ (كلاهما مقبول).\n- نرجع للمتغير الأصلي:\n1) $\\sin x = 1 \\implies x = \\frac{\\pi}{2}$ .\n2) $\\sin x = \\frac{1}{2} \\implies x = \\frac{\\pi}{6}$ أو $x = \\pi - \\frac{\\pi}{6} = \\frac{5\\pi}{6}$ .\nإذن مجموعة الحلول في $[0, 2\\pi[$ هي: $S = \\left\\{\\frac{\\pi}{6}, \\frac{\\pi}{2}, \\frac{5\\pi}{6}\\right\\}$ .'
				}
			],
			watchOutAr: 'انتبه لإشارة الناقص في دستور جيب التمام: $\\cos(a + b) = \\cos a \\cos b - \\sin a \\sin b$ (الإشارة تصبح ناقص!)، بينما في جيب الزاوية: $\\sin(a + b) = \\sin a \\cos b + \\cos a \\sin b$ (الإشارة تبقى زائد). هذا الخلط من أكثر أخطاء الحساب شيوعاً.'
		},
		practice: [
			{
				questionAr: 'القيمة المضبوطة لـ $\\sin\\left(\\frac{\\pi}{12}\\right)$ هي:',
				options: [
					'$\\frac{\\sqrt{6} - \\sqrt{2}}{4}$',
					'$\\frac{\\sqrt{6} + \\sqrt{2}}{4}$',
					'$\\frac{\\sqrt{3} - 1}{2}$',
					'$\\frac{\\sqrt{2} - 1}{4}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة وممتازة! نطبق $\\sin(\\frac{\\pi}{3} - \\frac{\\pi}{4}) = \\sin\\frac{\\pi}{3}\\cos\\frac{\\pi}{4} - \\cos\\frac{\\pi}{3}\\sin\\frac{\\pi}{4} = \\frac{\\sqrt{6} - \\sqrt{2}}{4}$ .',
					'خطأ: هذه قيمة $\\cos(\\frac{\\pi}{12})$ أو $\\sin(\\frac{5\\pi}{12})$ وليس $\\sin(\\frac{\\pi}{12})$ .',
					'خطأ: المقدار غير دقيق وناقص الجذور المترافقة.',
					'خطأ: راجع تطبيق دستور جمع الجيب.'
				],
				explanationAr: '$\\sin\\left(\\frac{\\pi}{12}\\right) = \\sin\\left(\\frac{\\pi}{3} - \\frac{\\pi}{4}\\right) = \\sin\\frac{\\pi}{3} \\cos\\frac{\\pi}{4} - \\cos\\frac{\\pi}{3} \\sin\\frac{\\pi}{4} = \\frac{\\sqrt{3}}{2} \\times \\frac{\\sqrt{2}}{2} - \\frac{1}{2} \\times \\frac{\\sqrt{2}}{2} = \\frac{\\sqrt{6} - \\sqrt{2}}{4}$ .'
			},
			{
				questionAr: 'حلول المعادلة $\\cos x = -\\frac{\\sqrt{3}}{2}$ في المجال $]-\\pi; \\pi]$ هي:',
				options: [
					'$\\left\\{-\\frac{5\\pi}{6}, \\frac{5\\pi}{6}\\right\\}$',
					'$\\left\\{-\\frac{\\pi}{6}, \\frac{\\pi}{6}\\right\\}$',
					'$\\left\\{-\\frac{2\\pi}{3}, \\frac{2\\pi}{3}\\right\\}$',
					'$\\left\\{\\frac{5\\pi}{6}, \\frac{7\\pi}{6}\\right\\}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! نعلم أن $\\cos\\frac{\\pi}{6} = \\frac{\\sqrt{3}}{2}$ ، إذن $\\cos(\\pi - \\frac{\\pi}{6}) = -\\frac{\\sqrt{3}}{2}$ أي $\\alpha = \\frac{5\\pi}{6}$ . والحلان هما $\\pm \\frac{5\\pi}{6}$ .',
					'خطأ: هذه حلول $\\cos x = +\\frac{\\sqrt{3}}{2}$ وليس $-\\frac{\\sqrt{3}}{2}$ .',
					'خطأ: هذه حلول $\\cos x = -\\frac{1}{2}$ .',
					'خطأ: الحل $\\frac{7\\pi}{6}$ لا ينتمي للمجال $]-\\pi; \\pi]$ بل قياسه الرئيسي هو $-\\frac{5\\pi}{6}$ .'
				],
				explanationAr: 'بما أن $-\\frac{\\sqrt{3}}{2} = \\cos\\left(\\frac{5\\pi}{6}\\right)$ ، فإن حلول المعادلة هي $x = \\frac{5\\pi}{6} + 2k\\pi$ أو $x = -\\frac{5\\pi}{6} + 2k\\pi$ . الحلول في $]-\\pi; \\pi]$ هي $\\left\\{-\\frac{5\\pi}{6}, \\frac{5\\pi}{6}\\right\\}$ .'
			},
			{
				questionAr: 'مجموعة حلول المتراجحة $\\sin x > \\frac{1}{2}$ في المجال $[0, 2\\pi[$ هي:',
				options: [
					'$\\left]\\frac{\\pi}{6}, \\frac{5\\pi}{6}\\right[$',
					'$\\left[0, \\frac{\\pi}{6}\\right[ \\cup \\left]\\frac{5\\pi}{6}, 2\\pi\\right[$',
					'$\\left]-\\frac{\\pi}{6}, \\frac{\\pi}{6}\\right[$',
					'$\\left]\\frac{\\pi}{3}, \\frac{2\\pi}{3}\\right[$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! قيم $\\sin x$ أكبر تماماً من $1/2$ تقع على القوس العلوي المحصور بين $\\frac{\\pi}{6}$ و $\\frac{5\\pi}{6}$ بمجال مفتوح.',
					'خطأ: هذا هو حل المتراجحة العكسية $\\sin x < \\frac{1}{2}$ .',
					'خطأ: هذا المجال يتعلق بمحور جيب التمام $\\cos x$ وليس الجيب $\\sin x$ .',
					'خطأ: الزاوية التي جيبها $1/2$ هي $\\frac{\\pi}{6}$ وليست $\\frac{\\pi}{3}$ .'
				],
				explanationAr: 'المعادلة $\\sin x = \\frac{1}{2}$ تعطي $x = \\frac{\\pi}{6}$ أو $x = \\frac{5\\pi}{6}$ . بقراءة محور التراتيب على الدائرة المثلثية، القيم التي تحقق $\\sin x > \\frac{1}{2}$ تنتمي إلى القوس $]\\frac{\\pi}{6}, \\frac{5\\pi}{6}[$ .'
			}
		]
	},

	// =========================================================================
	// LESSON 5: HOMOTHETY (DEFINITION & PROPERTIES)
	// =========================================================================
	{
		id: 'lesson_2as_se_t2_homothety_definition_properties_constructions',
		slug: '2as-se-t2-homothety-definition-properties-constructions',
		grade: '2as_se',
		yearSubjectId: 672,
		trimesterId: 't2',
		sequenceId: 'seq6',
		sequenceTitleAr: 'المقطع السادس: التحويلات النقطية (التحاكي) والجداء السلمي في المستوي',
		order: 5,
		titleAr: 'التحاكي في المستوي: التعريف، النسبة والمركز، الخواص الهندسية وتطبيقات الإنشاء',
		objectives: [
			'تعريف التحاكي $h$ ذي المركز $\\Omega$ والنسبة $k$ الحقيقية غير المعدومة بالعلاقة الشعاعية $\\vec{\\Omega M\'} = k \\vec{\\Omega M}$',
			'إنشاء صورة نقطة، قطعة مستقيم، مستقيم، ودائرة بتحاك معلوم وإنشاء مركز تحاك علم شكل وصورته',
			'معرفة خواص التحاكي: صمود الاستقامية، توازي المستقيم وصورته، الحفاظ على الزوايا الموجهة والمرجح',
			'تحديد أثر التحاكي على الأطوال (الضرب في $|k|$) وعلى المساحات (الضرب في $k^2$) وتوظيفه لإثبات استقامية نقط'
		],
		keywordsAr: [
			'التحاكي',
			'مركز التحاكي',
			'نسبة التحاكي',
			'صورة شكل',
			'الحفاظ على الاستقامية',
			'التكبير والتصغير'
		],
		discover: {
			scenarioAr: 'في التصميم المعماري والخرائط الجغرافية، يحتاج المهندس إلى إعداد نسختين لمخطط واجهة مبنى انطلاقاً من نقطة مرجعية ثابتة $\\Omega$ : النسخة الأولى مكبّرة بنسبة $k = 2.5$ لإظهار التفاصيل بدقة، والنسخة الثانية مصغّرة بنسبة $k = -0.5$ للتوزيع التخطيطي. هذا التحويل النقطي الذي يغيّر أبعاد الأشكال بنسبة ثابتة مع الحفاظ التام على توازي الخطوط واستقامية النقط وقياس الزوايا الموجهة يُسمى **التحاكي** (Homothétie). كيف يُعرَّف شعاعياً وما هو أثره على الأطوال والمساحات؟',
			svg: svgHomothetyTriangle,
			steps: [
				{
					promptAr: 'ليكن $h$ تحاكياً مركزه $\\Omega$ ونسبته $k = 3$ . إذا كانت النقطة $A$ تبعد عن $\\Omega$ بمسافة $\\Omega A = 4$ cm ، فما هي المسافة $\\Omega A\'$ حيث $A\'$ صورة $A$ بالتحاكي؟ وفي أي اتجاه تقع النقطة $A\'$ بالنسبة للشعاع $\\vec{\\Omega A}$ ؟',
					hintAr: 'حسب التعريف الشعاعي: $\\vec{\\Omega A\'} = 3 \\vec{\\Omega A}$ . احسب الطول $\\|\\vec{\\Omega A\'}\\|$ .',
					expectedInput: '12',
					revealAr: '$\\Omega A\' = |3| \\times \\Omega A = 3 \\times 4 = 12$ cm . وبما أن النسبة $k = 3 > 0$ موجبة، فإن الشعاعين $\\vec{\\Omega A\'}$ و $\\vec{\\Omega A}$ لهما **نفس الاتجاه**، وتقع $A$ بين $\\Omega$ و $A\'$ .'
				},
				{
					promptAr: 'إذا كانت نسبة التحاكي سالبة $k = -2$ والمسافة $\\Omega B = 5$ cm ، فما هو الطول $\\Omega B\'$ ؟ وأين يقع المركز $\\Omega$ بالنسبة للقطعة $[BB\']$ ؟',
					hintAr: 'الطول موجب دائماً: $\\Omega B\' = |-2| \\times \\Omega B$ . وانتبه لاتجاه الشعاع.',
					expectedInput: '10',
					revealAr: '$\\Omega B\' = |-2| \\times 5 = 10$ cm . وبما أن النسبة سالبة ($k < 0$)، فإن الشعاعين متعاكسان في الاتجاه، والمركز $\\Omega$ يقع **بين النقطتين** $B$ و $B\'$ على استقامة واحدة.'
				},
				{
					promptAr: 'إذا كانت لدينا قطعة مستقيم $[AB]$ طولها $6$ cm وصورتها $[A\'B\']$ بتحاكٍ نسبته $k = -0.5$ ، فما طول القطعة الصورة $A\'B\'$ ؟ وما الوضع النسبي للمستقيمين $(AB)$ و $(A\'B\']$ ؟',
					hintAr: 'نعلم أن $\\vec{A\'B\'} = k \\vec{AB}$ ومنه $A\'B\' = |k| AB$ .',
					expectedInput: '3',
					revealAr: '$A\'B\' = |-0.5| \\times 6 = 3$ cm . وحسب خواص التحاكي، صورة مستقيم هي دائماً مستقيم **يوازيه**، إذن $(A\'B\') \\parallel (AB)$ .'
				},
				{
					promptAr: 'إذا كانت مساحة مثلث $ABC$ تساوي $10 \\text{ cm}^2$ ، فما هي مساحة صورته $A\'B\'C\'$ بتحاكٍ نسبته $k = -3$ ؟',
					hintAr: 'في التحاكي، تُضرب المساحات في مربع النسبة $k^2$ وليس في $k$ أو $|k|$ .',
					expectedInput: '90',
					revealAr: '$\\text{مساحة}(A\'B\'C\') = k^2 \\times \\text{مساحة}(ABC) = (-3)^2 \\times 10 = 9 \\times 10 = 90 \\text{ cm}^2$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**تعريف التحاكي**: ليكن $\\Omega$ نقطة معلومة من المستوي و $k$ عدداً حقيقياً غير معدوم ($k \\in \\mathbb{R}^*$). التحاكي $h$ الذي مركزه $\\Omega$ ونسبته $k$ هو التحويل النقطي الذي يرفق بكل نقطة $M$ النقطة $M\'$ المعرفة بالعلاقة الشعاعية:\n$$\\vec{\\Omega M\'} = k \\vec{\\Omega M}$$',
				'**العلاقة الشعاعية المميزة**: لكل نقطتين $A$ و $B$ صورتيهما $A\'$ و $B\'$ بتحاكٍ نسبته $k$ ، لدينا:\n$$\\vec{A\'B\'} = k \\vec{AB}$$\nينتج عن ذلك مباشرة أن المستقيمين $(AB)$ و $(A\'B\') $ **متوازيان دائماً**.',
				'**صور الأشكال الهندسية الأساسية**:\n- صورة مستقيم $(D)$ هي مستقيم $(D\')$ يوازيه.\n- صورة قطعة مستقيم $[AB]$ هي قطعة مستقيم $[A\'B\']$ طولها $A\'B\' = |k| \\times AB$ .\n- صورة دائرة $\\mathcal{C}(O, R)$ هي دائرة $\\mathcal{C}\'(O\', R\')$ حيث مركزها $O\' = h(O)$ ونصف قطرها $R\' = |k| \\times R$ .',
				'**الأثر على الأطوال والمساحات**:\n- تضرب الأطوال والمحيطات في القيمة المطلقة للنسبة $|k|$ .\n- تضرب المساحات في مربع النسبة $k^2$ .',
				'**خواص الصمود (الاستحفاظ)**:\n- يحافظ التحاكي على **استقامية النقط**، وعلى **المرجح**، وعلى **أقياس الزوايا الموجهة**، وعلى **معامل التوجيه والتوازي** والتناظر، لكنه **لا يحافظ على المسافات** (إلا إذا كان $k = 1$ أو $k = -1$).'
			],
			visualSvg: svgHomothetyTriangle,
			visualCaptionAr: 'التحاكي $h(\\Omega, k)$: تكبير شكل هندسي بنسبة $k > 1$ مع صمود التوازي وتناسب الأطوال واستهداف المساحات بـ $k^2$',
			examples: [
				{
					problemAr: 'في معلم متعامد ومتجانس، لتكن النقطة $\\Omega(1, -2)$ والتحاكي $h$ ذو المركز $\\Omega$ والنسبة $k = 2$ .\n1) عين إحداثيات النقطة $A\'$ صورة النقطة $A(3, 4)$ بالتحاكي $h$ .\n2) عين معادلة الدائرة $(\\mathcal{C}\')$ صورة الدائرة $(\\mathcal{C})$ التي معادلتها $(x - 1)^2 + (y + 2)^2 = 9$ .',
					solutionAr: '1) نطبق العلاقة الشعاعية: $\\vec{\\Omega A\'} = 2 \\vec{\\Omega A}$ .\nمركبات الشعاع $\\vec{\\Omega A}$ هي: $(x_A - x_\\Omega, y_A - y_\\Omega) = (3 - 1, 4 - (-2)) = (2, 6)$ .\nإذن مركبات $\\vec{\\Omega A\'}$ هي: $2 \\times (2, 6) = (4, 12)$ .\nومنه:\n$$x_{A\'} - 1 = 4 \\implies x_{A\'} = 5$$\n$$y_{A\'} - (-2) = 12 \\implies y_{A\'} = 10$$\nإذن $A\'(5, 10)$ .\n\n2) الدائرة $(\\mathcal{C})$ مركزها النقطة $\\Omega(1, -2)$ نفسها ونصف قطرها $R = \\sqrt{9} = 3$ .\nبما أن المركز هو مركز التحاكي $\\Omega$ ، فإن صورته هي $\\Omega$ نفسها ($h(\\Omega) = \\Omega$).\nونصف القطر الجديد هو $R\' = |k| \\times R = 2 \\times 3 = 6$ .\nإذن معادلة الدائرة الصورة $(\\mathcal{C}\')$ هي: $(x - 1)^2 + (y + 2)^2 = 6^2 = 36$ .'
				},
				{
					problemAr: 'ليكن $ABC$ مثلثاً، و $G$ مركز ثقله، و $I$ منتصف الضلع $[BC]$ . أثبت باستعمال تحاكٍ مناسب أن النقط $A$ و $G$ و $I$ في استقامية وعين نسبة التحاكي ومركزه.',
					solutionAr: 'نعلم من خواص مركز ثقل مثلث أن $\\vec{GA} + \\vec{GB} + \\vec{GC} = \\vec{0}$ .\nوحيث أن $I$ منتصف $[BC]$ ، فإن $\\vec{GB} + \\vec{GC} = 2\\vec{GI}$ .\nوبالتالي: $\\vec{GA} + 2\\vec{GI} = \\vec{0} \\implies \\vec{GA} = -2\\vec{GI}$ .\nانطلاقاً من المركز $G$ ، نلاحظ أن $\\vec{GA} = -2\\vec{GI}$ تعني مباشرة أن النقطة $A$ هي صورة النقطة $I$ بالتحاكي $h$ الذي مركزه $G$ ونسبته $k = -2$ .\nوحسب خواص التحاكي، بما أن $A$ صورة $I$ بالتحاكي ذي المركز $G$ ، فإن النقط الثلاث $A, G, I$ تقع حتماً على استقامة واحدة.'
				}
			],
			watchOutAr: 'انتبه جيداً: عندما يُطلب حساب مساحة الشكل الصورة، يقع كثير من التلاميذ في فخ ضرب المساحة في $k$ أو $|k|$ ! المساحة تضرب دوماً في **المربع $k^2$** . فإذا كانت النسبة $k = -3$ فإن المساحة تتضاعف $9$ مرات، وإذا كانت النسبة $k = \\frac{1}{2}$ فإن المساحة تقسم على $4$ .'
		},
		practice: [
			{
				questionAr: 'إذا كانت مساحة مثلث $ABC$ تساوي $12 \\text{ cm}^2$ ، فإن مساحة صورته $A\'B\'C\'$ بالتحاكي ذي النسبة $k = -3$ هي:',
				options: [
					'$108 \\text{ cm}^2$',
					'$36 \\text{ cm}^2$',
					'$-36 \\text{ cm}^2$',
					'$-108 \\text{ cm}^2$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة وممتازة! المساحة تضرب في $k^2$ : $(-3)^2 \\times 12 = 9 \\times 12 = 108 \\text{ cm}^2$ .',
					'خطأ: ضربت في $|k| = 3$ بدلاً من $k^2 = 9$ ؛ الأطوال هي التي تضرب في $|k|$ وليس المساحات.',
					'خطأ: المساحة مقدار هندسي موجب دوماً، ولا يمكن أن تكون سالبة!',
					'خطأ: المساحة لا يمكن أن تكون سالبة على الإطلاق.'
				],
				explanationAr: 'في التحاكي، مساحة الشكل الصورة تساوي $k^2 \\times S$ . هنا $k = -3$ إذن $k^2 = 9$ ، فتكون المساحة $9 \\times 12 = 108 \\text{ cm}^2$ .'
			},
			{
				questionAr: 'في معلم متعامد ومتجانس، صورة النقطة $A(4, 1)$ بالتحاكي ذي المركز $\\Omega(2, -1)$ والنسبة $k = 3$ هي النقطة $A\'$ ذات الإحداثيات:',
				options: [
					'$A\'(8, 5)$',
					'$A\'(6, 3)$',
					'$A\'(10, 2)$',
					'$A\'(14, 2)$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $\\vec{\\Omega A} = (4 - 2, 1 - (-1)) = (2, 2)$ . إذن $\\vec{\\Omega A\'} = 3(2, 2) = (6, 6)$ . ومنه $x_{A\'} = 2 + 6 = 8$ و $y_{A\'} = -1 + 6 = 5$ .',
					'خطأ: أنت قمت فقط بضرب مركبات الشعاع $\\vec{\\Omega A}$ في $3$ دون إضافة إحداثيات المركز $\\Omega$ .',
					'خطأ: راجع الحساب التحليلي لمركبات الأشعة.',
					'خطأ: حساب غير صحيح؛ طبق العلاقة الشعاعية بدقة.'
				],
				explanationAr: 'لدينا $\\vec{\\Omega A\'} = 3\\vec{\\Omega A}$ . مركبات $\\vec{\\Omega A}$ هي $(2, 2)$ ، إذن مركبات $\\vec{\\Omega A\'}$ هي $(6, 6)$ . وبالتالي $x_{A\'} = x_\\Omega + 6 = 8$ و $y_{A\'} = y_\\Omega + 6 = 5$ .'
			},
			{
				questionAr: 'أي من العبارات التالية حول التحاكي $h(\\Omega, k)$ (مع $k \\ne 1$ و $k \\ne -1$) تعتبر عبارة **خاطئة** رياضياً؟',
				options: [
					'التحاكي يحافظ على المسافات بين النقط',
					'صورة مستقيم هي مستقيم يوازيه',
					'التحاكي يحافظ على استقامية النقط والمرجح',
					'صورة دائرة نصف قطرها $R$ هي دائرة نصف قطرها $|k|R$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! التحاكي **لا يحافظ على المسافات** بل يضربها في $|k|$ ، لذلك هي العبارة الخاطئة المطلوبة.',
					'خطأ: هذه عبارة رياضية صحيحة؛ صورة أي مستقيم بتحاكٍ هي مستقيم يوازيه.',
					'خطأ: هذه خاصية صحيحة وثابتة للتحاكي.',
					'خطأ: هذه خاصية هندسية صحيحة للتحاكي.'
				],
				explanationAr: 'التحاكي تحويل تشابهي يكبّر أو يصغّر الأبعاد، وبالتالي فهو لا يحافظ على المسافات (المسافة تضرب في $|k|$)، بينما يحافظ على التوازي والاستقامية والزوايا الموجهة.'
			}
		]
	},

	// =========================================================================
	// LESSON 6: SCALAR PRODUCT (DEFINITION, ANALYTIC, LINE & CIRCLE)
	// =========================================================================
	{
		id: 'lesson_2as_se_t2_scalar_product_definition_analytic_line_circle',
		slug: '2as-se-t2-scalar-product-definition-analytic-line-circle',
		grade: '2as_se',
		yearSubjectId: 672,
		trimesterId: 't2',
		sequenceId: 'seq6',
		sequenceTitleAr: 'المقطع السادس: التحويلات النقطية (التحاكي) والجداء السلمي في المستوي',
		order: 6,
		titleAr: 'الجداء السلمي في المستوي: التعريف، العبارة التحليلية، ومعادلتا مستقيم ودائرة',
		objectives: [
			'تعريف الجداء السلمي لشعاعين $\\vec{u} \\cdot \\vec{v}$ بدلالة الطولين وجيب تمام الزاوية وبالمسقط العمودي',
			'حساب الجداء السلمي بالعبارة التحليلية في معلم متعامد ومتجانس: $\\vec{u} \\cdot \\vec{v} = x x\' + y y\'$ وتطبيق شرط التعامد $\\vec{u} \\cdot \\vec{v} = 0$',
			'كتابة معادلة مستقيم عُلِم شعاع ناظمي $\\vec{n}(a, b)$ له ونقطة منه: $a(x - x_0) + b(y - y_0) = 0$',
			'تعيين معادلة دائرة محددة بمركز ونصف قطر، أو محددة بقطر $[AB]$ بالعلاقة $\\vec{MA} \\cdot \\vec{MB} = 0$'
		],
		keywordsAr: [
			'الجداء السلمي',
			'المسقط العمودي',
			'العبارة التحليلية',
			'الشعاع الناظمي',
			'معادلة مستقيم',
			'معادلة دائرة'
		],
		discover: {
			scenarioAr: 'في الميكانيك الكلاسيكية، يُقاس الشغل الميكانيكي $W$ لقوة ثابتة $\\vec{F}$ تُحرّك جسماً على مسار مستقيم $\\vec{AB}$ بالجداء السلمي $W = \\vec{F} \\cdot \\vec{AB} = \\|\\vec{F}\\| \\times \\|\\vec{AB}\\| \\times \\cos\\theta$ . فإذا كانت القوة عمودية تماماً على المسار ($\theta = 90^\circ$)، كان الشغل معدوماً تماماً لأن $\\cos 90^\\circ = 0$ ! كيف يُصاغ هذا المفهوم رياضياً في المستوي بواسطة المسقط العمودي والعبارة التحليلية، وكيف يُمكّننا من إيجاد معادلتي المستقيم الموجه بشعاع ناظمي والدائرة ذات القطر المعلوم؟',
			svg: svgDotProductOrthogonalProjection,
			steps: [
				{
					promptAr: 'ليكن شعاعان $\\vec{u}$ و $\\vec{v}$ حيث $\\|\\vec{u}\\| = 5$ و $\\|\\vec{v}\\| = 4$ والزاوية بينهما $(\\vec{u}, \\vec{v}) = \\frac{\\pi}{3}$ . احسب الجداء السلمي $\\vec{u} \\cdot \\vec{v}$ .',
					hintAr: 'طبق القانون: $\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos(\\frac{\\pi}{3})$ مع $\\cos\\frac{\\pi}{3} = 0.5$ .',
					expectedInput: '10',
					revealAr: '$\\vec{u} \\cdot \\vec{v} = 5 \\times 4 \\times \\cos\\left(\\frac{\\pi}{3}\\right) = 20 \\times 0.5 = 10$ .'
				},
				{
					promptAr: 'في معلم متعامد ومتجانس، ليكن الشعاعان $\\vec{u}(3, -2)$ و $\\vec{v}(4, 6)$ . احسب الجداء السلمي بالعبارة التحليلية $\\vec{u} \\cdot \\vec{v} = x x\' + y y\'$ . ماذا تستنتج بشأن تعامد الشعاعين؟',
					hintAr: 'احسب $3 \\times 4 + (-2) \\times 6$ .',
					expectedInput: '0',
					revealAr: '$\\vec{u} \\cdot \\vec{v} = (3)(4) + (-2)(6) = 12 - 12 = 0$ . بما أن الجداء السلمي معدوم، فإن الشعاعين **متعامدان** ($\\vec{u} \\perp \\vec{v}$). وهذا هو شرط التعامد التحليلي.'
				},
				{
					promptAr: 'مستقيم $(D)$ يشمل النقطة $A(2, 3)$ ويقبل الشعاع $\\vec{n}(4, -1)$ كشعاع ناظمي عليه. اكتب معادلته الديكارتية بالشكل $ax + by + c = 0$ . ما قيمة الثابت $c$ ؟',
					hintAr: 'المعادلة هي $4(x - 2) - 1(y - 3) = 0$ . انشر وبسط لإيجاد الحد الثابت.',
					expectedInput: '-5',
					revealAr: '$4x - 8 - y + 3 = 0 \\implies 4x - y - 5 = 0$ . إذن $c = -5$ والمعادلة هي $4x - y - 5 = 0$ .'
				},
				{
					promptAr: 'لتكن النقطتان $A(1, 2)$ و $B(5, 6)$ طرفي قطر لدائرة $(\\mathcal{C})$ . النقطة $M(x, y)$ تنتمي إلى الدائرة إذا وفقط إذا كان المثلث $AMB$ قائماً في $M$ ، أي $\\vec{MA} \\cdot \\vec{MB} = 0$ . ما إحداثيات مركز هذه الدائرة $\\Omega$ ؟',
					hintAr: 'مركز الدائرة هو منتصف القطر $[AB]$ : $\\Omega\\left(\\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2}\\right)$ .',
					expectedInput: '(3, 4)',
					revealAr: 'إحداثيات المركز هي منتصف القطر: $\\Omega\\left(\\frac{1 + 5}{2}, \\frac{2 + 6}{2}\\right) = \\Omega(3, 4)$ . ونصف القطر هو $R = \\frac{AB}{2} = \\frac{\\sqrt{16 + 16}}{2} = \\frac{\\sqrt{32}}{2} = 2\\sqrt{2}$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**التعريف الهندسي للجداء السلمي**: الجداء السلمي لشعاعين غير معدومين $\\vec{u}$ و $\\vec{v}$ هو العدد الحقيقي المُعرّف بـ:\n$$\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos(\\vec{u}, \\vec{v})$$\nوإذا كان أحدهما معدوماً، فإن $\\vec{u} \\cdot \\vec{v} = 0$ .',
				'**الجداء السلمي والمسقط العمودي**: إذا كانت $A, B, C$ ثلاث نقط بحيث $A \\ne B$ و $H$ هي المسقط العمودي للنقطة $C$ على المستقيم $(AB)$ ، فإن:\n$$\\vec{AB} \\cdot \\vec{AC} = \\vec{AB} \\cdot \\vec{AH}$$\n- يساوي $+AB \\times AH$ إذا كان للشعاعين $\\vec{AB}$ و $\\vec{AH}$ نفس الاتجاه.\n- يساوي $-AB \\times AH$ إذا كان للشعاعين اتجاهان متعاكسان.',
				'**العبارة التحليلية وشرط التعامد**: في معلم متعامد ومتجانس $(O; \\vec{i}, \\vec{j})$ ، إذا كان $\\vec{u}(x, y)$ و $\\vec{v}(x\', y\')$ ، فإن:\n$$\\vec{u} \\cdot \\vec{v} = x x\' + y y\'$$\nوشرط تعامد شعاعين هو:\n$$\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0 \\iff x x\' + y y\' = 0$$',
				'**الشعاع الناظمي ومعادلة مستقيم**: يُسمى كل شعاع غير معدوم $\\vec{n}$ عمودي على شعاع توجيه المستقيم $(D)$ شعاعاً ناظمياً على $(D)$ . إذا كان $\\vec{n}(a, b)$ ناظمياً على $(D)$ ويشمل $A(x_0, y_0)$ ، فإن معادلته هي:\n$$a(x - x_0) + b(y - y_0) = 0 \\iff ax + by + c = 0$$\nوتُعطى مسافة نقطة $M_0(x_0, y_0)$ عن المستقيم $(D)$ بالقانون:\n$$d(M_0, (D)) = \\frac{|a x_0 + b y_0 + c|}{\\sqrt{a^2 + b^2}}$$',
				'**معادلة دائرة**:\n- دائرة مركزها $\\Omega(x_0, y_0)$ ونصف قطرها $R$ : $(x - x_0)^2 + (y - y_0)^2 = R^2$ .\n- دائرة قطرها $[AB]$ : هي مجموعة النقط $M$ التي تحقق $\\vec{MA} \\cdot \\vec{MB} = 0$ ، أي:\n$$(x - x_A)(x - x_B) + (y - y_A)(y - y_B) = 0$$'
			],
			visualSvg: svgCircleDiameterScalarProduct,
			visualCaptionAr: 'الدائرة ذات القطر $[AB]$ المعرفة بالعلاقة الشعاعية $\\vec{MA} \\cdot \\vec{MB} = 0$',
			examples: [
				{
					problemAr: 'في معلم متعامد ومتجانس، نعتبر النقط $A(-1, 3)$ و $B(2, 7)$ و $C(5, 1)$ .\n1) احسب الجداء السلمي $\\vec{AB} \\cdot \\vec{AC}$ .\n2) احسب الطولين $AB$ و $AC$ ثم استنتج قيمة $\\cos\\widehat{BAC}$ .',
					solutionAr: '1) نحسب مركبات الشعاعين:\n$\\vec{AB} = (2 - (-1), 7 - 3) = (3, 4)$\n$\\vec{AC} = (5 - (-1), 1 - 3) = (6, -2)$\nنطبق العبارة التحليلية:\n$$\\vec{AB} \\cdot \\vec{AC} = (3)(6) + (4)(-2) = 18 - 8 = 10$$\n\n2) حساب الأطوال:\n$$AB = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$$\n$$AC = \\sqrt{6^2 + (-2)^2} = \\sqrt{36 + 4} = \\sqrt{40} = 2\\sqrt{10}$$\nمن التعريف الهندسي: $\\vec{AB} \\cdot \\vec{AC} = AB \\times AC \\times \\cos\\widehat{BAC}$ :\n$$\\cos\\widehat{BAC} = \\frac{\\vec{AB} \\cdot \\vec{AC}}{AB \\times AC} = \\frac{10}{5 \\times 2\\sqrt{10}} = \\frac{10}{10\\sqrt{10}} = \\frac{1}{\\sqrt{10}} = \\frac{\\sqrt{10}}{10} \\approx 0.316$$'
				},
				{
					problemAr: '1) اكتب معادلة المستقيم $(D)$ الذي يشمل النقطة $A(1, -2)$ ويقبل $\\vec{n}(3, -4)$ كشعاع ناظمي.\n2) احسب مسافة النقطة $P(6, 2)$ عن هذا المستقيم $(D)$ .',
					solutionAr: '1) بما أن $\\vec{n}(3, -4)$ ناظمي، فإن معادلة $(D)$ من الشكل $3x - 4y + c = 0$ .\nبتعويض إحداثيات $A(1, -2)$ :\n$$3(1) - 4(-2) + c = 0 \\implies 3 + 8 + c = 0 \\implies c = -11$$\nإذن معادلة المستقيم هي: $(D): 3x - 4y - 11 = 0$ .\n\n2) نطبق قانون مسافة نقطة عن مستقيم:\n$$d(P, (D)) = \\frac{|3(6) - 4(2) - 11|}{\\sqrt{3^2 + (-4)^2}} = \\frac{|18 - 8 - 11|}{\\sqrt{9 + 16}} = \\frac{|-1|}{\\sqrt{25}} = \\frac{1}{5} = 0.2$$'
				}
			],
			watchOutAr: 'احذر خلطين رئيسيين: (1) الجداء السلمي ينتج عنه **عدد حقيقي** (سُلَّمِي/Scalar) وليس شعاعاً، فلا تضع أياً من إشارات الأشعة أو الأقواس الإحداثية في الناتج. (2) العبارة التحليلية $\\vec{u} \\cdot \\vec{v} = xx\' + yy\'$ لا تصح إطلاقاً إلا في **معلم متعامد ومتجانس**.'
		},
		practice: [
			{
				questionAr: 'في معلم متعامد ومتجانس، يكون الشعاعان $\\vec{u}(m + 1, 3)$ و $\\vec{v}(2, -4)$ متعامدين إذا وفقط إذا كانت قيمة $m$ تساوي:',
				options: [
					'$5$',
					'$-5$',
					'$4$',
					'$-2$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة وممتازة! شرط التعامد: $\\vec{u} \\cdot \\vec{v} = 0 \\iff 2(m + 1) + 3(-4) = 0 \\iff 2m + 2 - 12 = 0 \\iff 2m = 10 \\iff m = 5$ .',
					'خطأ: انتبه لإشارة المعادلة: $2m - 10 = 0 \\implies 2m = 10 \\implies m = 5$ وليس $-5$ .',
					'خطأ: راجع نشر $2(m + 1) - 12 = 0$ .',
					'خطأ: لم تطبق شرط التعامد التحليلي بشكل صحيح.'
				],
				explanationAr: '$\\vec{u} \\perp \\vec{v} \\iff x x\' + y y\' = 0 \\iff 2(m + 1) + 3(-4) = 0 \\iff 2m + 2 - 12 = 0 \\iff 2m = 10 \\iff m = 5$ .'
			},
			{
				questionAr: 'معادلة المستقيم $(D)$ المار بالنقطة $A(-2, 3)$ والذي يقبل $\\vec{n}(3, -1)$ شعاعاً ناظمياً عليه هي:',
				options: [
					'$3x - y + 9 = 0$',
					'$3x - y - 9 = 0$',
					'$-x + 3y + 9 = 0$',
					'$3x + y + 3 = 0$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $3(x - (-2)) - 1(y - 3) = 0 \\iff 3x + 6 - y + 3 = 0 \\iff 3x - y + 9 = 0$ .',
					'خطأ: انتبه للإشارات: $3(x + 2) - (y - 3) = 3x + 6 - y + 3 = 3x - y + 9$ .',
					'خطأ: قلبت مركبتي الشعاع الناظمي مع إحداثيات النقطة.',
					'خطأ: إشارة $y$ في الشعاع الناظمي هي $-1$ وليست $+1$ .'
				],
				explanationAr: 'معادلة المستقيم المعرف بشعاع ناظمي ونقطة: $a(x - x_0) + b(y - y_0) = 0 \\implies 3(x + 2) - 1(y - 3) = 0 \\implies 3x - y + 9 = 0$ .'
			},
			{
				questionAr: 'طبيعة وعناصر مجموعة النقط $M(x, y)$ التي تحقق المعادلة $x^2 + y^2 - 4x + 6y - 12 = 0$ هي:',
				options: [
					'دائرة مركزها $\\Omega(2, -3)$ ونصف قطرها $R = 5$',
					'دائرة مركزها $\\Omega(-2, 3)$ ونصف قطرها $R = 5$',
					'دائرة مركزها $\\Omega(2, -3)$ ونصف قطرها $R = 25$',
					'المجموعة الخالية $\\emptyset$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! بالشكل النموذجي: $(x - 2)^2 - 4 + (y + 3)^2 - 9 - 12 = 0 \\iff (x - 2)^2 + (y + 3)^2 = 25 = 5^2$ . المركز $\\Omega(2, -3)$ و $R = 5$ .',
					'خطأ: عكست إشارات إحداثيات المركز؛ $(x - a)^2$ يعني المركز $a$ وليس $-a$ .',
					'خطأ: نسيت أخذ الجذر التربيعي للطرف الأيمن؛ نصف القطر هو $R = \\sqrt{25} = 5$ وليس $25$ .',
					'خطأ: الطرف الأيمن موجب تماماً ($25 > 0$) فهي دائرة حقيقية.'
				],
				explanationAr: 'نكتب المعادلة على الشكل النموذجي:\n$$(x^2 - 4x) + (y^2 + 6y) - 12 = 0 \\iff (x - 2)^2 - 4 + (y + 3)^2 - 9 - 12 = 0$$\n$$(x - 2)^2 + (y + 3)^2 = 25 = 5^2$$\nإذن هي دائرة مركزها $\\Omega(2, -3)$ ونصف قطرها $R = \\sqrt{25} = 5$ .'
			}
		]
	},

	// =========================================================================
	// LESSON 7: SCALAR PRODUCT APPLICATIONS (AL-KASHI, MEDIAN & LOCI)
	// =========================================================================
	{
		id: 'lesson_2as_se_t2_scalar_product_applications_alkashi_median_loci',
		slug: '2as-se-t2-scalar-product-applications-alkashi-median-loci',
		grade: '2as_se',
		yearSubjectId: 672,
		trimesterId: 't2',
		sequenceId: 'seq6',
		sequenceTitleAr: 'المقطع السادس: التحويلات النقطية (التحاكي) والجداء السلمي في المستوي',
		order: 7,
		titleAr: 'تطبيقات الجداء السلمي: مبرهنة الكاشي، نظرية المتوسط، مجموعات النقط وإدماج الفصل الثاني',
		objectives: [
			'توظيف مبرهنة الكاشي (قانون جيب التمام) لحساب أطوال أضلاع وأقياس زوايا مجهولة في أي مثلث',
			'تطبيق نظرية المتوسط لحساب طول المتوسط المتعلق بضلع في مثلث: $AB^2 + AC^2 = 2 AI^2 + \\frac{1}{2} BC^2$',
			'تعيين وإنشاء مجموعات النقط $M$ المحددة بـ $\\vec{MA} \\cdot \\vec{MB} = k$ أو $MA^2 - MB^2 = k$',
			'حل مسائل شاملة وإدماجية للفصل الثاني تجمع النهايات والسلوك التقاربي وحساب المثلثات والتحاكي والجداء السلمي'
		],
		keywordsAr: [
			'مبرهنة الكاشي',
			'نظرية المتوسط',
			'حل المثلثات',
			'مجموعات النقط',
			'التعامد والمسافات'
		],
		discover: {
			scenarioAr: 'يقوم مهندس طبوغرافي بمسح قطعة أرض مثلثة الشكل $ABC$ . قِيست المسافات $AB = 7$ m و $AC = 5$ m والزاوية بينهما $\\widehat{BAC} = 60^\\circ$ . لا يمكن قياس الضلع الثالث $BC$ مباشرة لوجود مانع طبيعي (بركة ماء)، كما يلزم تحديد مسار سياج ينصف الضلع $[BC]$ انطلاقاً من الرأس $A$ (المتوسط $[AI]$). كيف نطبّق مبرهنة الكاشي ونظرية المتوسط لحساب الأطوال بدقة تامة؟ وما هي المجموعات الهندسية للنقاط التي تحقق علاقات مسافات وتربيعات محددة؟',
			svg: svgTriangleAlKashiMedian,
			steps: [
				{
					promptAr: 'نطبق مبرهنة الكاشي في المثلث $ABC$ لحساب الضلع $BC$ : $BC^2 = AB^2 + AC^2 - 2 AB \\cdot AC \\cos(\\widehat{BAC})$ . احسب $BC^2$ علماً أن $AB = 7$ و $AC = 5$ و $\\cos(60^\\circ) = 0.5$ .',
					hintAr: 'احسب $7^2 + 5^2 - 2(7)(5)(0.5) = 49 + 25 - 35$ .',
					expectedInput: '39',
					revealAr: '$BC^2 = 49 + 25 - 35 = 39 \\implies BC = \\sqrt{39} \\approx 6.24$ m .'
				},
				{
					promptAr: 'ليكن $I$ منتصف $[BC]$ . تنص نظرية المتوسط على أن $AB^2 + AC^2 = 2 AI^2 + \\frac{1}{2} BC^2$ . احسب قيمة $AI^2$ .',
					hintAr: '$49 + 25 = 2 AI^2 + \\frac{39}{2} \\implies 74 = 2 AI^2 + 19.5$ .',
					expectedInput: '27.25',
					revealAr: '$2 AI^2 = 74 - 19.5 = 54.5 \\implies AI^2 = 27.25 \\implies AI = \\sqrt{27.25} \\approx 5.22$ m .'
				},
				{
					promptAr: 'ما هي طبيعة مجموعة النقط $M$ من المستوي التي تحقق $\\vec{MA} \\cdot \\vec{MB} = 0$ ؟',
					hintAr: 'الجداء السلمي المعدوم يعني تعامد الشعاعين، فما هو الشكل الهندسي الذي تكون فيه كل زاوية محيطية قائمة؟',
					expectedInput: 'دائرة',
					revealAr: 'مجموعة النقط $M$ هي **الدائرة** التي قطرها القطعة المستقيمة $[AB]$ (باستثناء الحالات التي لا يُشترط فيها التمايز).'
				},
				{
					promptAr: 'لتكن $I$ منتصف $[AB]$ . مجموعة النقط $M$ التي تحقق $MA^2 - MB^2 = 0$ (أي $MA = MB$) هي المحور العمودي للقطعة $[AB]$ . عند أي نقطة يقطع هذا المحور القطعة $[AB]$ ؟',
					hintAr: 'المحور يعامد القطعة وينصفها.',
					expectedInput: 'I',
					revealAr: 'يقطعها في المنتصف $I$ . وبوجه عام، مجموعة النقط التي تحقق $MA^2 - MB^2 = k$ هي مستقيم عمودي على حامل القطعة $(AB)$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**مبرهنة الكاشي (قانون جيب التمام)**: في أي مثلث كيفي $ABC$ ، إذا وضعنا $a = BC$ و $b = AC$ و $c = AB$ ، فإن:\n$$a^2 = b^2 + c^2 - 2bc \\cos \\widehat{A}$$\n$$b^2 = a^2 + c^2 - 2ac \\cos \\widehat{B}$$\n$$c^2 = a^2 + b^2 - 2ab \\cos \\widehat{C}$$\nتُستخدم لحساب ضلع مجهول بمعرفة ضلعين وزاوية محصورة، أو لحساب زوايا المثلث بمعرفة أطوال أضلاعه الثلاثة: $\\cos \\widehat{A} = \\frac{b^2 + c^2 - a^2}{2bc}$ .',
				'**مساحة مثلث وقانون الجيوب**: مساحة المثلث $ABC$ هي:\n$$S = \\frac{1}{2} b c \\sin \\widehat{A} = \\frac{1}{2} a c \\sin \\widehat{B} = \\frac{1}{2} a b \\sin \\widehat{C}$$\nوقانون الجيوب هو: $\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R$ (حيث $R$ نصف قطر الدائرة المحيطة بالمثلث).',
				'**نظرية المتوسط**: في مثلث $ABC$ ، إذا كانت $I$ منتصف الضلع $[BC]$ ، فإن:\n$$AB^2 + AC^2 = 2 AI^2 + \\frac{1}{2} BC^2$$\nوعبارة الجداء السلمي بدلالة المتوسط:\n$$\\vec{AB} \\cdot \\vec{AC} = AI^2 - \\frac{1}{4} BC^2 = AI^2 - IB^2$$',
				'**مجموعات النقط المألوفة بالمسافات** (حيث $I$ منتصف $[AB]$):\n1) $\\vec{MA} \\cdot \\vec{MB} = 0$ : دائرة قطرها $[AB]$ .\n2) $\\vec{MA} \\cdot \\vec{MB} = k$ : نكتب العلاقة $MI^2 - \\frac{AB^2}{4} = k \\iff MI^2 = k + \\frac{AB^2}{4}$ . إذا كان الطرف الأيمن موجباً فهي دائرة مركزها $I$ ، وإذا كان معدوماً فهي النقطة $I$ ، وإذا كان سالباً فهي $\\emptyset$ .\n3) $MA^2 + MB^2 = k$ : تكافئ $2MI^2 + \\frac{AB^2}{2} = k \\iff MI^2 = \\frac{k - AB^2/2}{2}$ (دائرة مركزها $I$ أو نقطة أو $\\emptyset$).\n4) $MA^2 - MB^2 = k$ : مستقيم عمودي على حامل القطعة $(AB)$ .',
				'**إدماج معارف الفصل الثاني**: يدمج الاختبار الفصلي الثاني دراسة الدوال والنهايات والسلوك التقاربي (مقارب أفقي، عمودي ومائل) مع الحساب المثلثي والتحاكي وتطبيقات الجداء السلمي، وهو البناء المعتمد في مواضيع التعليم الثانوي الجزائري.'
			],
			visualSvg: svgTriangleAlKashiMedian,
			visualCaptionAr: 'تطبيقات الجداء السلمي: مبرهنة الكاشي ونظرية المتوسط ومجموعات النقط الشهيرة في المستوي',
			examples: [
				{
					problemAr: 'مثلث $ABC$ أطوال أضلاعه $a = BC = 6$ و $b = AC = 4$ و $c = AB = 5$ .\n1) احسب $\\cos\\widehat{A}$ وبين إن كانت الزاوية حادة أم منفرجة.\n2) احسب طول المتوسط $[AI]$ المتعلق بالضلع $[BC]$ .',
					solutionAr: '1) نطبق مبرهنة الكاشي: $a^2 = b^2 + c^2 - 2bc \\cos\\widehat{A}$ :\n$$6^2 = 4^2 + 5^2 - 2(4)(5) \\cos\\widehat{A} \\implies 36 = 16 + 25 - 40 \\cos\\widehat{A}$$\n$$36 = 41 - 40 \\cos\\widehat{A} \\implies 40 \\cos\\widehat{A} = 41 - 36 = 5$$\n$$\\cos\\widehat{A} = \\frac{5}{40} = \\frac{1}{8} = 0.125$$\nبما أن $\\cos\\widehat{A} > 0$ فإن الزاوية $\\widehat{A}$ زاوية **حادة** قياسها بالتقريب $82.8^\\circ$ .\n\n2) نطبق نظرية المتوسط: $b^2 + c^2 = 2 AI^2 + \\frac{1}{2} a^2$ :\n$$4^2 + 5^2 = 2 AI^2 + \\frac{1}{2} (6^2) \\implies 16 + 25 = 2 AI^2 + 18$$\n$$41 = 2 AI^2 + 18 \\implies 2 AI^2 = 41 - 18 = 23$$\n$$AI^2 = \\frac{23}{2} = 11.5 \\implies AI = \\sqrt{11.5} \\approx 3.39$$'
				},
				{
					problemAr: 'ليكن $A$ و $B$ نقطتين من المستوي حيث $AB = 6$ cm و $I$ منتصف $[AB]$ .\nعين وطبيعة مجموعة النقط $M$ التي تحقق: $\\vec{MA} \\cdot \\vec{MB} = 7$ .',
					solutionAr: 'باستعمال علاقة شال وإدخال المنتصف $I$ :\n$$\\vec{MA} \\cdot \\vec{MB} = (\\vec{MI} + \\vec{IA}) \\cdot (\\vec{MI} + \\vec{IB})$$\nبما أن $I$ منتصف $[AB]$ فإن $\\vec{IB} = -\\vec{IA}$ ، إذن:\n$$\\vec{MA} \\cdot \\vec{MB} = (\\vec{MI} + \\vec{IA}) \\cdot (\\vec{MI} - \\vec{IA}) = MI^2 - IA^2$$\nولدينا $IA = \\frac{AB}{2} = \\frac{6}{2} = 3$ ، ومنه $IA^2 = 9$ .\nإذن:\n$$MI^2 - 9 = 7 \\implies MI^2 = 7 + 9 = 16 \\implies MI = \\sqrt{16} = 4$$\nالنتيجة: مجموعة النقط $M$ هي **دائرة مركزها $I$ ونصف قطرها $R = 4$ cm** .'
				}
			],
			watchOutAr: 'في نظرية المتوسط، انتبه جيداً لمعامل الحد الأخير: $AB^2 + AC^2 = 2 AI^2 + \\frac{1}{2} BC^2$ . المعامل هو $\\frac{1}{2} BC^2$ وليس $BC^2$ ! ذلك لأن $IB = \\frac{1}{2} BC$ ، وبالتالي $2 IB^2 = 2 \\times \\left(\\frac{BC}{2}\\right)^2 = 2 \\times \\frac{BC^2}{4} = \\frac{1}{2} BC^2$ .'
		},
		practice: [
			{
				questionAr: 'في مثلث $ABC$ ، لدينا $b = AC = 6$ و $c = AB = 4$ والزاوية بينهما $\\widehat{A} = 120^\\circ$ . طول الضلع المقابل $a = BC$ يساوي:',
				options: [
					'$2\\sqrt{19}$',
					'$2\\sqrt{7}$',
					'$\\sqrt{52}$',
					'$10$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة وممتازة! نطبق مبرهنة الكاشي: $a^2 = 4^2 + 6^2 - 2(4)(6)\\cos(120^\\circ) = 16 + 36 - 48(-0.5) = 52 + 24 = 76$ . و $a = \\sqrt{76} = 2\\sqrt{19}$ .',
					'خطأ: نسيت أن $\\cos(120^\\circ) = -0.5$ سالب، فطرحت $24$ بدلاً من جمعها.',
					'خطأ: نسيت إضافة الحد التفاعلي $-2bc\\cos A$ واكتفيت بنظرية فيثاغورس غير الصالحة هنا.',
					'خطأ: $10$ هو مجموع الضلعين $4 + 6$ وهو مستحيل حسب المتباينة المثلثية.'
				],
				explanationAr: 'حسب مبرهنة الكاشي: $a^2 = b^2 + c^2 - 2bc \\cos \\widehat{A}$ .\n$a^2 = 6^2 + 4^2 - 2(6)(4) \\cos(120^\\circ) = 36 + 16 - 48(-0.5) = 52 + 24 = 76$ .\nومنه $a = \\sqrt{76} = \\sqrt{4 \\times 19} = 2\\sqrt{19}$ .'
			},
			{
				questionAr: 'في مثلث $ABC$ ، لدينا $AB = 5$ و $AC = 7$ و $BC = 8$ . إذا كانت $I$ منتصف $[BC]$ ، فإن طول المتوسط $AI$ يساوي:',
				options: [
					'$\\sqrt{21}$',
					'$\\sqrt{42}$',
					'$5$',
					'$\\sqrt{17}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! نظرية المتوسط: $5^2 + 7^2 = 2 AI^2 + \\frac{1}{2}(8^2) \\implies 25 + 49 = 2 AI^2 + 32 \\implies 74 - 32 = 42 = 2 AI^2 \\implies AI^2 = 21 \\implies AI = \\sqrt{21}$ .',
					'خطأ: نسيت القسمة على $2$ في $2 AI^2 = 42$ .',
					'خطأ: المتوسط ليس مساوياً للضلع $AB$ .',
					'خطأ: راجع الحسابات؛ $74 - 32 = 42$ ثم نقسم على $2$ فنحصل على $21$ .'
				],
				explanationAr: 'حسب نظرية المتوسط: $AB^2 + AC^2 = 2 AI^2 + \\frac{1}{2} BC^2$ .\n$25 + 49 = 2 AI^2 + \\frac{64}{2} \\implies 74 = 2 AI^2 + 32 \\implies 2 AI^2 = 42 \\implies AI^2 = 21 \\implies AI = \\sqrt{21}$ .'
			},
			{
				questionAr: 'لتكن $A$ و $B$ نقطتين متمايزتين حيث $AB = 8$ و $I$ منتصف $[AB]$ . مجموعة النقط $M$ التي تحقق $MA^2 + MB^2 = 50$ هي:',
				options: [
					'دائرة مركزها $I$ ونصف قطرها $R = 3$',
					'دائرة مركزها $I$ ونصف قطرها $R = 9$',
					'المستقيم المحوري للقطعة $[AB]$',
					'المجموعة الخالية $\\emptyset$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $MA^2 + MB^2 = 2 MI^2 + \\frac{AB^2}{2} = 50 \\implies 2 MI^2 + \\frac{64}{2} = 50 \\implies 2 MI^2 + 32 = 50 \\implies 2 MI^2 = 18 \\implies MI^2 = 9 \\implies MI = 3$ . دائرة مركزها $I$ ونصف قطرها $3$ .',
					'خطأ: $9$ هو قيمة $MI^2$ ، إذن نصف القطر هو $R = \\sqrt{9} = 3$ .',
					'خطأ: المستقيم المحوري يمثل مجموعة النقط لـ $MA^2 - MB^2 = 0$ وليس المجموع.',
					'خطأ: الطرف الأيمن موجب ($MI^2 = 9 > 0$) فالمجموعة موجودة وهي دائرة.'
				],
				explanationAr: 'باستعمال علاقة المتوسط للنقطة $M$ :\n$$MA^2 + MB^2 = 2 MI^2 + \\frac{AB^2}{2}$$\n$$2 MI^2 + \\frac{64}{2} = 50 \\implies 2 MI^2 + 32 = 50 \\implies 2 MI^2 = 18 \\implies MI^2 = 9 \\implies MI = 3$$\nإذن مجموعة النقط هي دائرة مركزها $I$ ونصف قطرها $R = 3$ .'
			}
		]
	}
];
