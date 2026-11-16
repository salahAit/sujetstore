import type { InteractiveLessonData } from '../../types';
import { svgFunctionCurvePlot, svgVariationTable, svgTrigonometricCircle } from '../../svg-secondary';

// SVG Visual Helpers for 1AS TCST T2
const svgVectorChasles = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 220" width="380" height="220" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">
  <defs>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#1d4ed8"/>
    </marker>
    <marker id="arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#15803d"/>
    </marker>
    <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626"/>
    </marker>
    <marker id="arrow-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#7c3aed"/>
    </marker>
  </defs>
  <rect x="10" y="10" width="360" height="200" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <!-- Grid lines -->
  <line x1="40" y1="30" x2="40" y2="190" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="100" y1="30" x2="100" y2="190" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="160" y1="30" x2="160" y2="190" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="220" y1="30" x2="220" y2="190" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="280" y1="30" x2="280" y2="190" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="340" y1="30" x2="340" y2="190" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="20" y1="60" x2="360" y2="60" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="20" y1="110" x2="360" y2="110" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="20" y1="160" x2="360" y2="160" stroke="#e2e8f0" stroke-width="1"/>
  <!-- Chasles Triangle: A(50, 150), B(190, 130), C(310, 50) -->
  <line x1="60" y1="160" x2="196" y2="128" stroke="#1d4ed8" stroke-width="2.5" marker-end="url(#arrow-blue)"/>
  <line x1="200" y1="126" x2="306" y2="52" stroke="#15803d" stroke-width="2.5" marker-end="url(#arrow-green)"/>
  <line x1="60" y1="160" x2="306" y2="52" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="6,4" marker-end="url(#arrow-red)"/>
  <!-- Points -->
  <circle cx="60" cy="160" r="4.5" fill="#1e3a8a"/>
  <text x="48" y="176" font-size="12" font-weight="bold" fill="#0f172a">A(1, 2)</text>
  <circle cx="200" cy="126" r="4.5" fill="#15803d"/>
  <text x="206" y="142" font-size="12" font-weight="bold" fill="#0f172a">B(5, 4)</text>
  <circle cx="310" cy="50" r="4.5" fill="#dc2626"/>
  <text x="316" y="46" font-size="12" font-weight="bold" fill="#0f172a">C(7, 8)</text>
  <!-- Vector labels -->
  <rect x="110" y="152" width="60" height="20" rx="4" fill="#eff6ff" stroke="#93c5fd"/>
  <text x="140" y="166" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">u(4, 2)</text>
  <rect x="256" y="94" width="60" height="20" rx="4" fill="#f0fdf4" stroke="#86efac"/>
  <text x="286" y="108" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">v(2, 4)</text>
  <rect x="150" y="78" width="105" height="22" rx="4" fill="#fef2f2" stroke="#fca5a5"/>
  <text x="202" y="93" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">AC = u + v = (6, 6)</text>
</svg>`;

const svgVectorParallelogram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 200" width="380" height="200" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">
  <defs>
    <marker id="arr-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb"/>
    </marker>
    <marker id="arr-g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#059669"/>
    </marker>
    <marker id="arr-p" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#7c3aed"/>
    </marker>
  </defs>
  <rect x="10" y="10" width="360" height="180" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <polygon points="50,150 200,150 290,50 140,50" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="5,4"/>
  <line x1="50" y1="150" x2="194" y2="150" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arr-b)"/>
  <line x1="50" y1="150" x2="136" y2="54" stroke="#059669" stroke-width="2.5" marker-end="url(#arr-g)"/>
  <line x1="50" y1="150" x2="284" y2="54" stroke="#7c3aed" stroke-width="2.8" marker-end="url(#arr-p)"/>
  <circle cx="50" cy="150" r="4.5" fill="#0f172a"/>
  <text x="36" y="166" font-size="12" font-weight="bold" fill="#0f172a">A</text>
  <circle cx="200" cy="150" r="4.5" fill="#2563eb"/>
  <text x="210" y="166" font-size="12" font-weight="bold" fill="#2563eb">B</text>
  <circle cx="140" cy="50" r="4.5" fill="#059669"/>
  <text x="130" y="40" font-size="12" font-weight="bold" fill="#059669">C</text>
  <circle cx="290" cy="50" r="4.5" fill="#7c3aed"/>
  <text x="300" y="44" font-size="12" font-weight="bold" fill="#7c3aed">D</text>
  <text x="120" y="170" font-size="11" font-weight="bold" fill="#2563eb">AB</text>
  <text x="75" y="95" font-size="11" font-weight="bold" fill="#059669">AC</text>
  <text x="195" y="105" font-size="11" font-weight="bold" fill="#7c3aed">AD = AB + AC</text>
</svg>`;

const svgLineCartesian = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 230" width="380" height="230" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">
  <defs>
    <marker id="arr-cart" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#059669"/>
    </marker>
  </defs>
  <rect x="10" y="10" width="360" height="210" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <!-- Axes -->
  <line x1="30" y1="180" x2="350" y2="180" stroke="#0f172a" stroke-width="1.5"/>
  <polygon points="350,180 342,176 342,184" fill="#0f172a"/>
  <text x="345" y="196" font-size="11" font-weight="bold" fill="#0f172a">x</text>
  <line x1="80" y1="200" x2="80" y2="25" stroke="#0f172a" stroke-width="1.5"/>
  <polygon points="80,25 76,33 84,33" fill="#0f172a"/>
  <text x="90" y="32" font-size="11" font-weight="bold" fill="#0f172a">y</text>
  <text x="68" y="194" font-size="10" font-weight="bold" fill="#0f172a">O</text>
  <!-- Grid marks -->
  <line x1="140" y1="177" x2="140" y2="183" stroke="#0f172a" stroke-width="1"/>
  <text x="140" y="194" text-anchor="middle" font-size="9" fill="#475569">1</text>
  <line x1="200" y1="177" x2="200" y2="183" stroke="#0f172a" stroke-width="1"/>
  <text x="200" y="194" text-anchor="middle" font-size="9" fill="#475569">2</text>
  <line x1="260" y1="177" x2="260" y2="183" stroke="#0f172a" stroke-width="1"/>
  <text x="260" y="194" text-anchor="middle" font-size="9" fill="#475569">3</text>
  <line x1="77" y1="140" x2="83" y2="140" stroke="#0f172a" stroke-width="1"/>
  <text x="68" y="143" text-anchor="end" font-size="9" fill="#475569">1</text>
  <line x1="77" y1="100" x2="83" y2="100" stroke="#0f172a" stroke-width="1"/>
  <text x="68" y="103" text-anchor="end" font-size="9" fill="#475569">2</text>
  <line x1="77" y1="60" x2="83" y2="60" stroke="#0f172a" stroke-width="1"/>
  <text x="68" y="63" text-anchor="end" font-size="9" fill="#475569">3</text>
  <!-- Line (D): y = 0.5x + 1.5 => x=1, y=2 (140, 100); x=3, y=3 (260, 60) -->
  <line x1="40" y1="133" x2="330" y2="37" stroke="#1d4ed8" stroke-width="2.4"/>
  <!-- Point A(1, 2) -->
  <circle cx="140" cy="100" r="4.5" fill="#dc2626"/>
  <text x="146" y="94" font-size="11" font-weight="bold" fill="#dc2626">A(1, 2)</text>
  <!-- Direction vector u(2, 1) from A -->
  <line x1="140" y1="100" x2="254" y2="62" stroke="#059669" stroke-width="2.2" marker-end="url(#arr-cart)"/>
  <circle cx="260" cy="60" r="4" fill="#059669"/>
  <text x="206" y="90" font-size="11" font-weight="bold" fill="#059669">u(2, 1)</text>
  <!-- Label of Line -->
  <rect x="230" y="24" width="125" height="22" rx="4" fill="#eff6ff" stroke="#93c5fd"/>
  <text x="292" y="39" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">(D): x - 2y + 3 = 0</text>
</svg>`;

const svgLinearSystemIntersection = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 230" width="380" height="230" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">
  <rect x="10" y="10" width="360" height="210" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <!-- Axes -->
  <line x1="30" y1="170" x2="350" y2="170" stroke="#0f172a" stroke-width="1.5"/>
  <polygon points="350,170 342,166 342,174" fill="#0f172a"/>
  <text x="345" y="186" font-size="11" font-weight="bold" fill="#0f172a">x</text>
  <line x1="70" y1="200" x2="70" y2="25" stroke="#0f172a" stroke-width="1.5"/>
  <polygon points="70,25 66,33 74,33" fill="#0f172a"/>
  <text x="80" y="32" font-size="11" font-weight="bold" fill="#0f172a">y</text>
  <!-- Line (D1): 2x - y = 1 => y = 2x - 1, passes through (1, 1), (2, 3), (3, 5) -->
  <!-- Let px = 70 + x*50, py = 170 - y*26. For (3, 1): px = 220, py = 144 -->
  <!-- Line 1: y = -x + 4 passes through (0, 4)->(70, 66) and (4, 0)->(270, 170) -->
  <line x1="50" y1="56" x2="290" y2="180" stroke="#dc2626" stroke-width="2.2"/>
  <!-- Line 2: y = 2x - 5 passes through (1, -3) and (4, 3)->(270, 92) -->
  <line x1="130" y1="200" x2="290" y2="76" stroke="#2563eb" stroke-width="2.2"/>
  <!-- Intersection Point M(3, 1): px = 70 + 3*50 = 220, py = 170 - 1*26 = 144 -->
  <line x1="220" y1="170" x2="220" y2="144" stroke="#64748b" stroke-dasharray="3,3"/>
  <line x1="70" y1="144" x2="220" y2="144" stroke="#64748b" stroke-dasharray="3,3"/>
  <circle cx="220" cy="144" r="5" fill="#059669"/>
  <text x="220" y="184" text-anchor="middle" font-size="10" font-weight="bold" fill="#0f172a">3</text>
  <text x="58" y="148" text-anchor="end" font-size="10" font-weight="bold" fill="#0f172a">1</text>
  <text x="232" y="136" font-size="12" font-weight="bold" fill="#059669">M(3, 1)</text>
  <!-- Labels -->
  <rect x="22" y="40" width="105" height="20" rx="4" fill="#fef2f2" stroke="#fca5a5"/>
  <text x="74" y="54" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">(D1): x + y = 4</text>
  <rect x="235" y="55" width="115" height="20" rx="4" fill="#eff6ff" stroke="#93c5fd"/>
  <text x="292" y="69" text-anchor="middle" font-size="10" font-weight="bold" fill="#2563eb">(D2): 2x - y = 5</text>
</svg>`;

const svgSignTableQuadratic = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 150" width="380" height="150" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">
  <rect x="10" y="10" width="360" height="130" rx="6" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
  <line x1="10" y1="60" x2="370" y2="60" stroke="#0f172a" stroke-width="1.4"/>
  <line x1="120" y1="10" x2="120" y2="140" stroke="#0f172a" stroke-width="1.5"/>
  <!-- Row 1: x values -->
  <text x="65" y="40" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">x</text>
  <text x="145" y="40" text-anchor="middle" font-size="12" font-weight="bold" fill="#475569">-∞</text>
  <text x="205" y="40" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e40af">x₁</text>
  <text x="285" y="40" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e40af">x₂</text>
  <text x="345" y="40" text-anchor="middle" font-size="12" font-weight="bold" fill="#475569">+∞</text>
  <!-- Row 2: Sign of ax^2 + bx + c -->
  <text x="65" y="102" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">ax² + bx + c</text>
  <text x="165" y="104" text-anchor="middle" font-size="12" font-weight="bold" fill="#15803d">نفس إشارة a</text>
  <!-- Root zero lines -->
  <line x1="205" y1="60" x2="205" y2="140" stroke="#94a3b8" stroke-width="1.2"/>
  <circle cx="205" cy="100" r="9" fill="#ffffff" stroke="#dc2626" stroke-width="1.3"/>
  <text x="205" y="104" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">0</text>
  <text x="245" y="104" text-anchor="middle" font-size="12" font-weight="bold" fill="#b91c1c">عكس إشارة a</text>
  <line x1="285" y1="60" x2="285" y2="140" stroke="#94a3b8" stroke-width="1.2"/>
  <circle cx="285" cy="100" r="9" fill="#ffffff" stroke="#dc2626" stroke-width="1.3"/>
  <text x="285" y="104" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">0</text>
  <text x="325" y="104" text-anchor="middle" font-size="12" font-weight="bold" fill="#15803d">نفس إشارة a</text>
</svg>`;

export const LESSONS_1AS_TCST_T2: InteractiveLessonData[] = [
	// =========================================================================
	// LESSON 1: REFERENCE FUNCTIONS
	// =========================================================================
	{
		id: 'lesson_1as_tcst_t2_reference_functions_properties_graphs',
		slug: '1as-tcst-t2-reference-functions-properties-graphs',
		grade: '1as_tcst',
		yearSubjectId: 654,
		trimesterId: 't2',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: الدوال المرجعية، الشكل النموذجي وإشارة ثلاثي الحدود',
		order: 1,
		titleAr: 'الدوال المرجعية: دالة المربع، دالة المقلوب، دالة الجذر التربيعي ودالة القيمة المطلقة',
		objectives: [
			'دراسة اتجاه التغير وجدول التغيرات والتمثيل البياني لكل من الدوال المرجعية: دالة المربع (القطع المكافئ)، دالة المقلوب (القطع الزائد)، دالة الجذر التربيعي، ودالة القيمة المطلقة',
			'استنتاج منحنيات دوال انطلاقاً من الدوال المرجعية بواسطة التحويلات الهندسية البسيطة (الانسحاب وفق مركبتين أفقية وعمودية)',
			'مقارنة صور أعداد حقيقية باستعمال اتجاه تغير الدوال المرجعية وحل متراجحات بسيطة'
		],
		keywordsAr: [
			'الدوال المرجعية',
			'دالة المربع',
			'دالة المقلوب',
			'دالة الجذر التربيعي',
			'دالة القيمة المطلقة',
			'القطع المكافئ',
			'القطع الزائد',
			'الانسحاب البياني'
		],
		discover: {
			scenarioAr: 'يقوم مهندس معماري بدراسة نماذج رياضية لتصميم واجهات مبنى حديث. يقارن بين أربعة تصاميم رئيسية ممثلة بالدوال المرجعية: مسار قطع مكافئ $f(x) = x^2$ لقوس المدخل، ومنحنى قطع زائد $g(x) = \\frac{1}{x}$ لتوزيع الإضاءة العكسية، وقوس دالة الجذر التربيعي $h(x) = \\sqrt{x}$ للجدار المائل، وتصميم دالة القيمة المطلقة $k(x) = |x|$ للسقف المثلثي. كيف نحدد خصائص كل دالة (مجموعة التعريف، الشفعية، الرتابة) وكيف نستنتج منها منحنيات جديدة بالانسحاب؟',
			svg: svgFunctionCurvePlot({
				fn: (x) => x * x,
				xMin: -3,
				xMax: 3,
				yMin: -1,
				yMax: 9,
				curveLabel: 'f(x) = x²',
				points: [
					{ x: 0, y: 0, label: 'O(0,0)' },
					{ x: 1, y: 1, label: 'A(1,1)' },
					{ x: -1, y: 1, label: "A'(-1,1)" },
					{ x: 2, y: 4, label: 'B(2,4)' },
					{ x: -2, y: 4, label: "B'(-2,4)" }
				]
			}),
			steps: [
				{
					promptAr: 'احسب صورة كل من العددين $3$ و $-3$ بدالة المربع $f(x) = x^2$ . ماذا تستنتج بشأن شفعية الدالة وتناظر منحناها البياني؟',
					hintAr: 'احسب $3^2$ و $(-3)^2$ وقارن بينهما.',
					expectedInput: '9',
					revealAr: 'لدينا $f(3) = 3^2 = 9$ و $f(-3) = (-3)^2 = 9$ . بما أن $f(-x) = f(x)$ لكل $x \\in \\mathbb{R}$ ، فإن دالة المربع دالة **زوجية**، ومنحناها البياني (القطع المكافئ) متناظر بالنسبة لمحور التراتيب.'
				},
				{
					promptAr: 'عين مجموعة تعريف دالة المقلوب $g(x) = \\frac{1}{x}$ ، ثم احسب $g(-2)$ و $g(2)$ واستنتج نوع تناظر المنحنى.',
					hintAr: 'الكسر معرف عندما يكون المقام غير معدوم $x \\ne 0$ .',
					expectedInput: 'R*',
					revealAr: 'مجموعة تعريف دالة المقلوب هي $\\mathcal{D}_g = \\mathbb{R}^* = ]-\\infty, 0[ \\cup ]0, +\\infty[$ . لدينا $g(2) = 0.5$ و $g(-2) = -0.5 = -g(2)$ ، إذن $g$ دالة **فردية** ومنحناها البياني (القطع الزائد) متناظر بالنسبة لمبدأ المعلم $O(0,0)$ .'
				},
				{
					promptAr: 'لتكن دالة الجذر التربيعي $h(x) = \\sqrt{x}$ . ما هي مجموعة تعريفها؟ وهل تقبل سوابق للأعداد السالبة؟',
					hintAr: 'الجذر التربيعي معرف فقط للأعداد الحقيقية الموجبة أو المعدومة.',
					expectedInput: '[0, +inf[',
					revealAr: 'مجموعة تعريف دالة الجذر التربيعي هي $\\mathcal{D}_h = [0, +\\infty[$ . ولا يمكن حساب جذر عدد سالب في $\\mathbb{R}$ ، لذلك لا توجد سوابق للأعداد السالبة تماماً، ومنحناها يقع كلياً في الربع الأول من المعلم.'
				},
				{
					promptAr: 'إذا كانت لدينا الدالة $u(x) = (x - 2)^2 + 1$ ، فبأي تحويل هندسي بسيط (انسحاب) يمكن الحصول على منحنى $u$ انطلاقاً من منحنى دالة المربع $f(x) = x^2$ ؟',
					hintAr: 'قارن صيغة $f(x - x_0) + y_0$ بمركبات شعاع الانسحاب $\\vec{V}(x_0, y_0)$ .',
					expectedInput: '(2, 1)',
					revealAr: 'منحنى الدالة $u$ هو صورة القطع المكافئ للدالة $f$ بالانسحاب الذي شعاعه $\\vec{V}(2, 1)$ ، حيث يزيح ذروة القطع المكافئ من $O(0, 0)$ إلى النقطة $S(2, 1)$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**دالة المربع** ($x \\mapsto x^2$): معرفة على $\\mathbb{R}$ ، زوجية ($f(-x) = f(x)$)، متناقصة تماماً على $]-\\infty, 0]$ ومتزايدة تماماً على $[0, +\\infty[$ ، وتقبل قيمة حدية صغرى مطلقة هي $0$ عند $x = 0$ . تمثيلها البياني هو **قطع مكافئ** ذروته $O(0,0)$ ومحور تناظره محور التراتيب.',
				'**دالة المقلوب** ($x \\mapsto \\frac{1}{x}$): معرفة على $\\mathbb{R}^* = ]-\\infty, 0[ \\cup ]0, +\\infty[$ ، فردية ($g(-x) = -g(x)$)، متناقصة تماماً على المجال $]-\\infty, 0[$ ومتناقصة تماماً على المجال $]0, +\\infty[$ (احذر: لا يجوز القول إنها متناقصة على $\\mathbb{R}^*$). تمثيلها البياني هو **قطع زائد** متناظر بالنسبة للمبدأ $O$ ومستقيماه المقاربان هما محورا الإحداثيات ($x = 0$ و $y = 0$).',
				'**دالة الجذر التربيعي** ($x \\mapsto \\sqrt{x}$): معرفة على $[0, +\\infty[$ ، موجبة دائماً ومتزايدة تماماً على $[0, +\\infty[$ ، وتنطلق من النقطة $O(0,0)$ .',
				'**دالة القيمة المطلقة** ($x \\mapsto |x|$): معرفة على $\\mathbb{R}$ ، زوجية، تساوي $-x$ على $]-\\infty, 0]$ وتساوي $x$ على $[0, +\\infty[$ ، متناقصة تماماً على $]-\\infty, 0]$ ومتزايدة تماماً على $[0, +\\infty[$ ، وتمثيلها البياني نصفي مستقيمين يلتقيان في $O(0,0)$ .',
				'**الاستنتاج البياني بالانسحاب**: منحنى الدالة $x \\mapsto f(x - a) + b$ هو صورة منحنى الدالة $f$ بالانسحاب الذي شعاعه $\\vec{V}(a, b)$ .'
			],
			visualSvg: svgFunctionCurvePlot({
				fn: (x) => 1 / x,
				xMin: -4,
				xMax: 4,
				yMin: -4,
				yMax: 4,
				curveLabel: 'g(x) = 1/x',
				asymptotes: [
					{ kind: 'vertical', value: 0, label: 'x=0', color: '#dc2626' },
					{ kind: 'horizontal', value: 0, label: 'y=0', color: '#dc2626' }
				],
				points: [
					{ x: 1, y: 1, label: 'I(1,1)' },
					{ x: -1, y: -1, label: "I'(-1,-1)" },
					{ x: 2, y: 0.5, label: 'K(2, 0.5)' }
				]
			}),
			visualCaptionAr: 'منحنى دالة المقلوب $y = \\frac{1}{x}$ (قطع زائد) مع المستقيمين المقاربين وتناظره المركزي حول المبدأ $O$',
			examples: [
				{
					problemAr: 'قارن بين العددين $A = (-3.15)^2$ و $B = (-3.14)^2$ بالاعتماد على اتجاه تغير دالة المربع، ثم قارن بين $C = \\frac{1}{\\sqrt{5}}$ و $D = \\frac{1}{\\sqrt{7}}$ باستعمال اتجاه تغير دالة المقلوب.',
					solutionAr: '1) بمقارنة $A$ و $B$: لدينا $-3.15 < -3.14 \\le 0$ . وبما أن دالة المربع متناقصة تماماً على المجال $]-\\infty, 0]$ ، فإن الترتيب يعكس: $(-3.15)^2 > (-3.14)^2$ ، أي $A > B$ .\n\n2) بمقارنة $C$ و $D$: نعلم أن $0 < \\sqrt{5} < \\sqrt{7}$ . وبما أن دالة المقلوب متناقصة تماماً على المجال $]0, +\\infty[$ ، فإن الترتيب يعكس: $\\frac{1}{\\sqrt{5}} > \\frac{1}{\\sqrt{7}}$ ، أي $C > D$ .'
				},
				{
					problemAr: 'لتكن الدالة $h(x) = (x + 3)^2 - 2$ . اشرح كيف يتم إنشاء منحناها $(\\mathcal{C}_h)$ انطلاقاً من منحنى دالة المربع $f(x) = x^2$ ، وحدد إحداثيات ذروته ومعادلة محور تناظره.',
					solutionAr: 'نكتب الدالة على الشكل: $h(x) = f(x - (-3)) + (-2)$ .\nإذن المنحنى $(\\mathcal{C}_h)$ هو صورة منحنى دالة المربع $(\\mathcal{C}_f)$ بالانسحاب الذي شعاعه $\\vec{V}(-3, -2)$ .\n- إحداثيات ذروة القطع المكافئ هي $S(-3, -2)$ .\n- معادلة محور التناظر هي المستقيم العمودي ذو المعادلة $x = -3$ .'
				}
			],
			watchOutAr: 'احذر خطأين شائعين: (1) القول إن دالة المقلوب متناقصة تماماً على $\\mathbb{R}^*$ ! هذا خطأ فادح لأن $-2 < 2$ بينما $g(-2) = -0.5 < g(2) = 0.5$ ، بل الصواب أنها متناقصة تماماً على $]-\\infty, 0[$ وعلى $]0, +\\infty[$ كلٌّ على حدة. (2) في الانسحاب $f(x - a)$ ، الإزاحة الأفقية تكون بمقدار $+a$ نحو اليمين إذا كانت الإشارة ناقص، وبمقدار $-a$ نحو اليسار إذا كانت الإشارة زائد.'
		},
		practice: [
			{
				questionAr: 'ليكن العددان الحقيقيان $u = -4.5$ و $v = -3.2$ . بالمقارنة بين $u^2$ و $v^2$ اعتماداً على اتجاه تغير دالة المربع نجد:',
				options: [
					'$u^2 < v^2$ لأن دالة المربع متزايدة دائماً',
					'$u^2 > v^2$ لأن $-4.5 < -3.2 \\le 0$ ودالة المربع متناقصة تماماً على $]-\\infty, 0]$',
					'$u^2 = v^2$ لأن التربيع يلغي الإشارات السالبة',
					'$u^2 > v^2$ لأن الأعداد الموجبة دائماً أكبر من السالبة'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: دالة المربع ليست متزايدة على $\\mathbb{R}$ بل متناقصة تماماً على المجال السالب $]-\\infty, 0]$ .',
					'إجابة صحيحة وممتازة! بما أن كلا العددين سالبان و $u < v \\le 0$ ، فإن تناقص دالة المربع على $]-\\infty, 0]$ يقلب اتجاه المتباينة.',
					'خطأ: القيمة المطلقة لـ $-4.5$ تختلف عن القيمة المطلقة لـ $-3.2$ ، فلا يمكن أن يتساويا بالتربيع.',
					'خطأ: التعليل غير رياضي؛ المقارنة هنا بين مربعين موجبين وليس بين موجب وسالب.'
				],
				explanationAr: 'العددان $u$ و $v$ ينتميان إلى المجال $]-\\infty, 0]$ حيث $-4.5 < -3.2$ . وبما أن دالة المربع متناقصة تماماً على $]-\\infty, 0]$ ، فإنها تقلب ترتيب الأعداد: $(-4.5)^2 > (-3.2)^2$ أي $20.25 > 10.24$ .'
			},
			{
				questionAr: 'منحنى الدالة $k(x) = \\frac{1}{x - 3} + 2$ يُستنتج انطلاقاً من القطع الزائد لدالة المقلوب بالانسحاب الذي شعاعه:',
				options: [
					'$\\vec{V}(-3, 2)$',
					'$\\vec{V}(3, 2)$',
					'$\\vec{V}(3, -2)$',
					'$\\vec{V}(-3, -2)$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: العبارة تتضمن $x - 3$ في المقام، أي $x - a$ مع $a = 3$ وليس $-3$ .',
					'إجابة صحيحة! الدالة من الشكل $f(x - a) + b$ مع $a = 3$ و $b = 2$ ، فشعاع الانسحاب هو $\\vec{V}(3, 2)$ .',
					'خطأ: الإزاحة العمودية هي $+2$ وليست $-2$ .',
					'خطأ: عكست إشارة كلتا المركبتين.'
				],
				explanationAr: 'الدستور $k(x) = g(x - 3) + 2$ حيث $g(x) = \\frac{1}{x}$ . وفق خواص التحويلات الهندسية، منحنى $y = g(x - a) + b$ هو صورة منحنى $g$ بالانسحاب ذي الشعاع $\\vec{V}(a, b)$ ، وهنا $a = 3$ و $b = 2$ ، إذن $\\vec{V}(3, 2)$ .'
			},
			{
				questionAr: 'مجموعة حلول المتراجحة $\\sqrt{x} \\le 3$ في مجموعة الأعداد الحقيقية $\\mathbb{R}$ هي:',
				options: [
					'$S = ]-\\infty, 9]$',
					'$S = [0, 9]$',
					'$S = [0, 3]$',
					'$S = [3, 9]$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: دالة الجذر التربيعي غير معرفة للأعداد السالبة! لا يمكن لـ $x$ أن يكون سالباً.',
					'إجابة صحيحة! يجب أولاً مراعاة شرط الوجود $x \\ge 0$ ، ثم بتربيع الطرفين الموجبين نجد $x \\le 9$ ، فتكون الحلول $S = [0, 9]$ .',
					'خطأ: نسيت تربيع العدد $3$ في الطرف الأيمن.',
					'خطأ: المجال $[3, 9]$ يستثني الأعداد من $0$ إلى $3$ وهي تحقق المتراجحة تماماً (مثلاً $\\sqrt{1} = 1 \\le 3$).'
				],
				explanationAr: 'شرط تعريف العبارة هو $x \\in [0, +\\infty[$ . وبما أن الطرفين موجبين ودالة الجذر التربيعي متزايدة تماماً على $[0, +\\infty[$ ، فإن $\\sqrt{x} \\le 3 \\iff 0 \\le x \\le 3^2 \\iff x \\in [0, 9]$ .'
			}
		]
	},

	// =========================================================================
	// LESSON 2: CANONICAL FORM & DISCRIMINANT DELTA
	// =========================================================================
	{
		id: 'lesson_1as_tcst_t2_canonical_form_quadratic_discriminant',
		slug: '1as-tcst-t2-canonical-form-quadratic-discriminant',
		grade: '1as_tcst',
		yearSubjectId: 654,
		trimesterId: 't2',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: الدوال المرجعية، الشكل النموذجي وإشارة ثلاثي الحدود',
		order: 2,
		titleAr: 'الشكل النموذجي لثلاثي الحدود ax² + bx + c والمميز Δ وحل معادلات الدرجة الثانية',
		objectives: [
			'كتابة ثلاثي الحدود من الدرجة الثانية ax² + bx + c (حيث a ≠ 0) على الشكل النموذجي باستخدام المتطابقات الشهيرة',
			'حساب المميز Δ = b² - 4ac واستعماله لحل المعادلة ax² + bx + c = 0 ومناقشة عدد حلولها في R وفق إشارة Δ',
			'تحليل ثلاثي الحدود إلى جداء عاملين من الدرجة الأولى عندما Δ ≥ 0 واستعماله لتعيين سوابق عدد بدالة'
		],
		keywordsAr: [
			'ثلاثي الحدود من الدرجة الثانية',
			'الشكل النموذجي',
			'المميز دلتا Δ',
			'معادلات الدرجة الثانية',
			'جذور ثلاثي الحدود',
			'التحليل إلى جداء عاملين'
		],
		discover: {
			scenarioAr: 'يقوم مهندس مدني بحساب مسار قوس خرساني يمثل جسراً معلقاً فوق وادٍ، حيث يعبر عن ارتفاع القوس بالأمتار بالدالة التربيعية $P(x) = 2x^2 - 8x + 6$ حيث $x$ المسافة الأفقية. يريد المهندس معرفة أدنى نقطة يبلغها القوس (الذروة) ونقاط ارتكازه على سطح الأرض ($P(x) = 0$). كيف نحول هذه العبارة بإتمام المربع الكامل إلى شكل نموذجي يكشف الذروة والجذور مباشرة؟',
			svg: svgFunctionCurvePlot({
				fn: (x) => 2 * x * x - 8 * x + 6,
				xMin: -0.5,
				xMax: 4.5,
				yMin: -3,
				yMax: 7,
				curveLabel: 'P(x) = 2x² - 8x + 6',
				points: [
					{ x: 1, y: 0, label: 'x1=1' },
					{ x: 3, y: 0, label: 'x2=3' },
					{ x: 2, y: -2, label: 'S(2, -2)', color: '#dc2626' }
				],
				tangents: [{ x: 2, y: -2, slope: 0, halfSpan: 0.8, color: '#dc2626' }]
			}),
			steps: [
				{
					promptAr: 'استخرج المعامل $a = 2$ كعامل مشترك من الحدين الأولين في العبارة $P(x) = 2x^2 - 8x + 6$ . ما هو ثنائي الحد المتبقي داخل القوس؟',
					hintAr: 'اقسم كلاً من $2x^2$ و $-8x$ على $2$ .',
					expectedInput: 'x^2 - 4x',
					revealAr: 'باستخراج المعامل $2$ نجد: $P(x) = 2(x^2 - 4x) + 6$ .'
				},
				{
					promptAr: 'أتمم المربع الكامل لثنائي الحد $x^2 - 4x$ بملاحظة أن $(x - 2)^2 = x^2 - 4x + 4$ . كم يساوي $x^2 - 4x$ بدلالة $(x - 2)^2$ ؟',
					hintAr: 'اطرح $4$ من الطرفين: $(x - 2)^2 - 4$ .',
					expectedInput: '(x - 2)^2 - 4',
					revealAr: 'لدينا $x^2 - 4x = (x - 2)^2 - 4$ . وبالتعويض في عبارة $P(x)$ نجد: $P(x) = 2[(x - 2)^2 - 4] + 6 = 2(x - 2)^2 - 8 + 6 = 2(x - 2)^2 - 2$ . هذا هو الشكل النموذجي!'
				},
				{
					promptAr: 'احسب المميز $\\Delta = b^2 - 4ac$ لثلاثي الحدود $P(x) = 2x^2 - 8x + 6$ (حيث $a=2, b=-8, c=6$).',
					hintAr: 'احسب $(-8)^2 - 4(2)(6) = 64 - 48$ .',
					expectedInput: '16',
					revealAr: '$\\Delta = (-8)^2 - 4(2)(6) = 64 - 48 = 16$ . وبما أن $\\Delta > 0$ فإن ثلاثي الحدود يقبل جذرين متمايزين.'
				},
				{
					promptAr: 'انطلاقاً من الشكل النموذجي $2(x - 2)^2 - 2 = 0$ ، حل المعادلة $P(x) = 0$ واستنتج فواصل نقاط ارتكاز القوس.',
					hintAr: '$(x - 2)^2 = 1$ تكافئ $x - 2 = 1$ أو $x - 2 = -1$ .',
					expectedInput: '1, 3',
					revealAr: '$2(x - 2)^2 = 2 \\iff (x - 2)^2 = 1 \\iff x - 2 = 1$ أو $x - 2 = -1$ ، ومنه $x = 3$ أو $x = 1$ . إذن فواصل الارتكاز هما $x_1 = 1$ و $x_2 = 3$ ، وذروة القوس هي $S(2, -2)$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**الشكل النموذجي لثلاثي الحدود** ($a \\ne 0$): كل ثلاثي حدود $P(x) = ax^2 + bx + c$ يكتب على الشكل النموذجي:\n$$P(x) = a\\left[\\left(x + \\frac{b}{2a}\\right)^2 - \\frac{\\Delta}{4a^2}\\right] = a(x - \\alpha)^2 + \\beta$$\nحيث $\\alpha = -\\frac{b}{2a}$ ، $\\beta = P(\\alpha) = -\\frac{\\Delta}{4a}$ ، والمميز $\\Delta = b^2 - 4ac$ .',
				'**مناقشة حلول المعادلة** $ax^2 + bx + c = 0$ في $\\mathbb{R}$ وفق إشارة $\\Delta$ :\n- إذا كان $\\mathbf{\\Delta > 0}$ : للمعادلة حلان متمايزان هما:\n$$x_1 = \\frac{-b - \\sqrt{\\Delta}}{2a} \\quad \\text{و} \\quad x_2 = \\frac{-b + \\sqrt{\\Delta}}{2a}$$\n- إذا كان $\\mathbf{\\Delta = 0}$ : للمعادلة حل مضاعف وحيد هو:\n$$x_0 = -\\frac{b}{2a}$$\n- إذا كان $\\mathbf{\\Delta < 0}$ : المعادلة لا تقبل أي حل في $\\mathbb{R}$ ($S = \\emptyset$).',
				'**التحليل إلى جداء عاملين من الدرجة الأولى**:\n- عندما $\\Delta > 0$ : $ax^2 + bx + c = a(x - x_1)(x - x_2)$ .\n- عندما $\\Delta = 0$ : $ax^2 + bx + c = a(x - x_0)^2$ .\n- عندما $\\Delta < 0$ : لا يمكن تحليل ثلاثي الحدود إلى جداء عوامل من الدرجة الأولى في $\\mathbb{R}$ .',
				'**مجموع وجداء الحلين**: عندما $\\Delta \\ge 0$ ، فإن مجموع الحلين هو $S = x_1 + x_2 = -\\frac{b}{a}$ وجداؤهما هو $P = x_1 \\times x_2 = \\frac{c}{a}$ .'
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
					{ value: '-2', position: 'bottom' },
					{ value: '+∞', position: 'top' }
				],
				fnName: 'P(x)',
				derivName: 'إشارة التغير'
			}),
			visualCaptionAr: 'جدول تغيرات ثلاثي الحدود $P(x) = 2x^2 - 8x + 6$ وذروته $S(2, -2)$',
			examples: [
				{
					problemAr: 'اكتب ثلاثي الحدود $T(x) = 3x^2 - 12x + 9$ على الشكل النموذجي، ثم حلل العبارة إلى جداء عاملين وحل المعادلة $T(x) = 0$ .',
					solutionAr: '1) الشكل النموذجي:\n$T(x) = 3(x^2 - 4x) + 9 = 3[(x - 2)^2 - 4] + 9 = 3(x - 2)^2 - 12 + 9 = 3(x - 2)^2 - 3$ .\n\n2) التحليل إلى جداء عاملين:\n$T(x) = 3[(x - 2)^2 - 1] = 3(x - 2 - 1)(x - 2 + 1) = 3(x - 3)(x - 1)$ .\n\n3) حل المعادلة $T(x) = 0$ :\n$3(x - 3)(x - 1) = 0 \\iff x = 3$ أو $x = 1$ ، ومنه مجموعة الحلول $S = \\{1, 3\\}$ .'
				},
				{
					problemAr: 'حل في $\\mathbb{R}$ المعادلة $-2x^2 + 5x + 3 = 0$ بحساب المميز $\\Delta$ ، ثم عين سوابق العدد $3$ بالدالة $f(x) = -2x^2 + 5x + 3$ .',
					solutionAr: '1) حساب المميز:\nالمعاملات: $a = -2$ ، $b = 5$ ، $c = 3$ .\n$\\Delta = b^2 - 4ac = 5^2 - 4(-2)(3) = 25 + 24 = 49 = 7^2$ .\nبما أن $\\Delta > 0$ ، فللمعادلة حلان:\n$x_1 = \\frac{-5 - 7}{2(-2)} = \\frac{-12}{-4} = 3$\n$x_2 = \\frac{-5 + 7}{2(-2)} = \\frac{2}{-4} = -\\frac{1}{2}$\nإذن $S = \\{-\\frac{1}{2}, 3\\}$ .\n\n2) سوابق العدد $3$ بالدالة $f$ تعني حل المعادلة $f(x) = 3$ :\n$-2x^2 + 5x + 3 = 3 \\iff -2x^2 + 5x = 0 \\iff x(-2x + 5) = 0$ .\nإذن السوابق هي $x = 0$ و $x = \\frac{5}{2} = 2.5$ .'
				}
			],
			watchOutAr: 'احذر خطأين متكررين في الامتحانات: (1) عند حساب المميز $\\Delta$ عندما يكون $b$ سالباً، مثل $b = -5$ ، اكتب دائماً $(-5)^2 = +25$ وليس $-25$ . (2) عند تحليل ثلاثي الحدود إلى جداء عاملين، لا تنس ضرب القوسين في المعامل $a$ : التحليل هو $a(x - x_1)(x - x_2)$ وليس $(x - x_1)(x - x_2)$ !'
		},
		practice: [
			{
				questionAr: 'الشكل النموذجي لثلاثي الحدود $Q(x) = x^2 - 6x + 5$ هو:',
				options: [
					'$(x - 3)^2 + 4$',
					'$(x - 3)^2 - 4$',
					'$(x - 6)^2 - 31$',
					'$(x + 3)^2 - 4$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: حساب الثابت غير صحيح؛ $(x - 3)^2 = x^2 - 6x + 9$ ، إذن $x^2 - 6x = (x - 3)^2 - 9$ ، وبإضافة $5$ نحصل على $-4$ وليس $+4$ .',
					'إجابة صحيحة وممتازة! $x^2 - 6x + 5 = (x - 3)^2 - 9 + 5 = (x - 3)^2 - 4$ .',
					'خطأ: قسمت المعامل على $1$ بدلاً من $2$ في إتمام المربع.',
					'خطأ: إشارة الحد الأوسط سالبة $(-6x)$ ، فيجب أن تكون إشارة القوس سالبة $(x - 3)$ .'
				],
				explanationAr: 'لدينا $x^2 - 6x = (x - 3)^2 - 3^2 = (x - 3)^2 - 9$ . إذن: $Q(x) = (x - 3)^2 - 9 + 5 = (x - 3)^2 - 4$ .'
			},
			{
				questionAr: 'مميز المعادلة $2x^2 - 5x + 3 = 0$ وحلاها في $\\mathbb{R}$ هما:',
				options: [
					'$\\Delta = -1$ والمعادلة لا تقبل حلولاً في $\\mathbb{R}$',
					'$\\Delta = 1$ وحلاها هما $x_1 = 1$ و $x_2 = \\frac{3}{2}$',
					'$\\Delta = 49$ وحلاها هما $x_1 = -3$ و $x_2 = \\frac{1}{2}$',
					'$\\Delta = 1$ وحلاها هما $x_1 = -1$ و $x_2 = -\\frac{3}{2}$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: $\\Delta = (-5)^2 - 4(2)(3) = 25 - 24 = 1 > 0$ وليس $-1$ .',
					'إجابة صحيحة! $\\Delta = 1$ والحلان هما $x_1 = \\frac{5 - 1}{4} = 1$ و $x_2 = \\frac{5 + 1}{4} = \\frac{3}{2}$ .',
					'خطأ: أخطأت في حساب الجداء $4ac$ .',
					'خطأ: نسيت الإشارة السالبة لـ $b$ في القانون: $-b = -(-5) = +5$ وليس $-5$ .'
				],
				explanationAr: 'المعاملات هي $a = 2, b = -5, c = 3$ . المميز $\\Delta = (-5)^2 - 4(2)(3) = 25 - 24 = 1$ . الحلان هما: $x_1 = \\frac{5 - 1}{2(2)} = \\frac{4}{4} = 1$ و $x_2 = \\frac{5 + 1}{4} = \\frac{6}{4} = \\frac{3}{2}$ .'
			},
			{
				questionAr: 'التحليل إلى جداء عاملين لثلاثي الحدود $R(x) = 3x^2 + 5x - 2$ (علماً أن جذريه هما $-2$ و $\\frac{1}{3}$) هو:',
				options: [
					'$(x + 2)\\left(x - \\frac{1}{3}\\right)$',
					'$3(x - 2)\\left(x + \\frac{1}{3}\\right)$',
					'$3(x + 2)\\left(x - \\frac{1}{3}\\right) = (x + 2)(3x - 1)$',
					'$(3x + 2)(x - 1)$'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: نسيت ضرب التحليل في المعامل $a = 3$ .',
					'خطأ: عكست إشارات الجذور داخل الأقواس.',
					'إجابة صحيحة تماماً! قانون التحليل هو $a(x - x_1)(x - x_2) = 3(x - (-2))(x - 1/3) = (x + 2)(3x - 1)$ .',
					'خطأ: عند النشر ينتج $3x^2 - x - 2$ وهو يختلف عن ثلاثي الحدود الأصلي.'
				],
				explanationAr: 'قاعدة التحليل لثلاثي الحدود عندما $\\Delta > 0$ هي $R(x) = a(x - x_1)(x - x_2)$ . هنا $a = 3$ و $x_1 = -2$ و $x_2 = \\frac{1}{3}$ ، فيكون: $R(x) = 3(x - (-2))\\left(x - \\frac{1}{3}\\right) = (x + 2)(3x - 1)$ .'
			}
		]
	},

	// =========================================================================
	// LESSON 3: SIGN TABLES & RATIONAL INEQUALITIES
	// =========================================================================
	{
		id: 'lesson_1as_tcst_t2_sign_tables_rational_inequalities',
		slug: '1as-tcst-t2-sign-tables-rational-inequalities',
		grade: '1as_tcst',
		yearSubjectId: 654,
		trimesterId: 't2',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: الدوال المرجعية، الشكل النموذجي وإشارة ثلاثي الحدود',
		order: 3,
		titleAr: 'جدول إشارة ثلاثي الحدود، إشارة الجداء والحاصل، وحل المتراجحات الجبرية والكسرية',
		objectives: [
			'دراسة إشارة ثلاثي الحدود من الدرجة الثانية ax² + bx + c وتلخيصها في جدول إشارة بدلالة إشارتي a و Δ',
			'إنشاء جداول إشارة لعبارات جبرية مكتوبة على شكل جداء أو حاصل قسمة عوامل من الدرجة الأولى والثانية مع مراعاة القيم الممنوعة',
			'حل المتراجحات الكسرية والمتراجحات من الدرجة الثانية جبرياً وتحديد مجموعة الحلول في R وترييض مشكلات'
		],
		keywordsAr: [
			'جدول إشارة ثلاثي الحدود',
			'إشارة الجداء والحاصل',
			'المتراجحات الكسرية',
			'متراجحات الدرجة الثانية',
			'القيم الممنوعة',
			'ترييض مشكلات جبرية'
		],
		discover: {
			scenarioAr: 'تنتج مؤسسة متخصصة في الطاقة الشمسية ألواحاً كهروضوئية. يقدر الربح الصافي اليومي (بملايين السنتيمات) بالدالة $B(x) = -x^2 + 7x - 10$ حيث $x$ يمثل عدد مئات الألواح المصنعة ($x \\in [0, 8]$). تريد إدارة المؤسسة تحديد فترات تحقيق الربح ($B(x) > 0$)، ودراسة إشارة مؤشر المردودية الاقتصادية $M(x) = \\frac{-x^2 + 7x - 10}{x - 1}$ . كيف نلخص إشارة ثلاثي الحدود والكسر في جداول إشارة دقيقة ونعين القيم الممنوعة؟',
			svg: svgFunctionCurvePlot({
				fn: (x) => -x * x + 7 * x - 10,
				xMin: 0,
				xMax: 8,
				yMin: -6,
				yMax: 5,
				curveLabel: 'B(x) = -x² + 7x - 10',
				points: [
					{ x: 2, y: 0, label: 'x1=2', color: '#15803d' },
					{ x: 5, y: 0, label: 'x2=5', color: '#15803d' },
					{ x: 3.5, y: 2.25, label: 'الذروة (ربح أعظمي)', color: '#dc2626' }
				]
			}),
			steps: [
				{
					promptAr: 'عين جذور ثلاثي الحدود $-x^2 + 7x - 10 = 0$ بحساب المميز $\\Delta$ .',
					hintAr: 'احسب $\\Delta = 7^2 - 4(-1)(-10) = 49 - 40$ .',
					expectedInput: '2, 5',
					revealAr: '$\\Delta = 49 - 40 = 9 = 3^2$ . الحلان هما: $x_1 = \\frac{-7 - 3}{-2} = 5$ و $x_2 = \\frac{-7 + 3}{-2} = 2$ .'
				},
				{
					promptAr: 'اختبر إشارة $B(x)$ عند نقطة داخل مجال الجذرين (مثلاً $x = 3$) وعند نقطة خارجهما (مثلاً $x = 1$).',
					hintAr: 'احسب $B(3) = -(9) + 21 - 10$ و $B(1) = -(1) + 7 - 10$ .',
					expectedInput: '+2, -4',
					revealAr: '$B(3) = -9 + 21 - 10 = +2 > 0$ (موجبة داخل مجال الجذرين)، و $B(1) = -1 + 7 - 10 = -4 < 0$ (سالبة خارج مجال الجذرين). بما أن $a = -1 < 0$ ، فالإشارة داخل الجذرين هي عكس إشارة $a$ .'
				},
				{
					promptAr: 'ما هي القيمة الممنوعة للعبارة الكسرية $M(x) = \\frac{-x^2 + 7x - 10}{x - 1}$ ؟ وكيف نمثلها في جدول الإشارة؟',
					hintAr: 'الكسر غير معرّف عندما ينعدم المقام $x - 1 = 0$ .',
					expectedInput: '1',
					revealAr: 'القيمة الممنوعة هي $x = 1$ لأنها تجعل المقام معدوماً. ونمثلها في جدول الإشارة بخطين عموديين متوازيين ($||$) يمتدان حتى سطر الحاصل.'
				},
				{
					promptAr: 'استنتج مجموعة حلول المتراجحة $B(x) > 0$ (مجال الإنتاج الذي يحقق ربحاً صافياً).',
					hintAr: 'المجال الذي تكون فيه إشارة ثلاثي الحدود موجبة تماماً.',
					expectedInput: ']2, 5[',
					revealAr: 'المؤسسة تحقق ربحاً صافياً عندما يكون حجم الإنتاج محصوراً في المجال المفتوح $S = ]2, 5[$ مئات من الألواح (أي بين $200$ و $500$ لوح).'
				}
			]
		},
		summary: {
			rulesAr: [
				'**إشارة ثنائي الحد من الدرجة الأولى** ($ax + b$ مع $a \\ne 0$): ينعدم عند $x_0 = -\\frac{b}{a}$ . يكون **عكس إشارة $a$** قبل الانعدام (على $]-\\infty, x_0[$)، و**نفس إشارة $a$** بعد الانعدام (على $]x_0, +\\infty[$).',
				'**إشارة ثلاثي الحدود** ($ax^2 + bx + c$ مع $a \\ne 0$):\n- **إذا كان $\\mathbf{\\Delta > 0}$** : له جذران متمايزان $x_1 < x_2$ . إشارته **عكس إشارة $a$** داخل مجال الجذرين $]x_1, x_2[$ ، و**نفس إشارة $a$** خارج مجال الجذرين ($]-\\infty, x_1[ \\cup ]x_2, +\\infty[$).\n- **إذا كان $\\mathbf{\\Delta = 0}$** : له جذر مضاعف $x_0 = -\\frac{b}{2a}$ . إشارته **من نفس إشارة $a$** دوماً على $\\mathbb{R} \\setminus \\{x_0\\}$ وينعدم عند $x_0$ .\n- **إذا كان $\\mathbf{\\Delta < 0}$** : لا ينعدم وإشارته **من نفس إشارة $a$ تماماً** على كل $\\mathbb{R}$ .',
				'**إشارة الجداء والحاصل والقيم الممنوعة**:\n- لدراسة إشارة جداء أو حاصل قسمة، ندرس إشارة كل عامل في سطر مستقل ثم نطبق قاعدة الإشارات في السطر الإجمالي.\n- كل قيمة تعدم المقام في كسر تسمى **قيمة ممنوعة**، ويشار إليها حتماً بخطين متوازيين ($||$) وتُستثنى من مجموعة الحلول.',
				'**المنهجية الصارمة لحل المتراجحات الكسرية**: (1) نقل جميع الحدود إلى طرف واحد ليكون الطرف الآخر صفراً؛ (2) توحيد المقامات وتبسيط البسط؛ (3) تحليل البسط والمقام؛ (4) إنشاء جدول الإشارة الشامل؛ (5) استخراج الحلول مع استثناء القيم الممنوعة.'
			],
			visualSvg: svgSignTableQuadratic,
			visualCaptionAr: 'القاعدة العامة لجدول إشارة ثلاثي الحدود من الدرجة الثانية في حالة $\\Delta > 0$',
			examples: [
				{
					problemAr: 'ادرس إشارة ثلاثي الحدود $f(x) = 2x^2 - 3x - 2$ ثم حل في $\\mathbb{R}$ المتراجحة $2x^2 - 3x - 2 \\le 0$ .',
					solutionAr: '1) إيجاد الجذور:\n$\\Delta = (-3)^2 - 4(2)(-2) = 9 + 16 = 25 = 5^2 > 0$ .\nالجذران هما: $x_1 = \\frac{3 - 5}{4} = -\\frac{1}{2}$ و $x_2 = \\frac{3 + 5}{4} = 2$ .\n\n2) جدول الإشارة:\nبما أن $a = 2 > 0$ ، فإن إشارة $f(x)$ تكون سالبة (عكس إشارة $a$) داخل مجال الجذرين $[-\\frac{1}{2}, 2]$ وموجبة خارجه.\n\n3) حل المتراجحة $f(x) \\le 0$ :\nالمتراجحة تطلب القيم السالبة أو المعدومة، إذن: $S = \\left[-\\frac{1}{2}, 2\\right]$ .'
				},
				{
					problemAr: 'حل في $\\mathbb{R}$ المتراجحة الكسرية: $\\frac{2x - 4}{x^2 - 9} \\ge 0$ مع تحديد القيم الممنوعة بدقة.',
					solutionAr: '1) القيم الممنوعة: المقام $x^2 - 9 = 0 \\iff (x - 3)(x + 3) = 0 \\iff x = 3$ أو $x = -3$ . إذن القيمتان الممنوعتان هما $-3$ و $3$ .\n\n2) جذور البسط: $2x - 4 = 0 \\iff 2x = 4 \\iff x = 2$ .\n\n3) جدول الإشارة:\n- ثنائي الحد $2x - 4$ ينعدم عند $2$ (سالب قبل $2$ وموجب بعده).\n- ثلاثي الحدود $x^2 - 9$ ينعدم عند $-3$ و $3$ وموجب خارج الجذرين وسالب داخلهما ($a = 1 > 0$).\n\nبدمج الإشارات مع وضع ($||$) عند $-3$ و $3$:\n- على $]-\\infty, -3[$ : سالب / موجب = سالب.\n- على $]-3, 2]$ : سالب / سالب = موجب.\n- على $[2, 3[$ : موجب / سالب = سالب.\n- على $]3, +\\infty[$ : موجب / موجب = موجب.\n\nإذن مجموعة الحلول هي: $S = ]-3, 2] \\cup ]3, +\\infty[$ .'
				}
			],
			watchOutAr: 'تحذير قاطع: يُمنع منعاً باتاً ضرب طرفي المتراجحة الكسرية في المقام للتخلص منه (مثل ضرب طرفي $\\frac{A(x)}{B(x)} \\ge 0$ في $B(x)$)! لأن إشارة $B(x)$ قد تكون سالبة فيقلب اتجاه التفاوت دون انتباه. الطريقة الوحيدة الصحيحة هي تشكيل جدول إشارة مع وضع خطين عموديين ($||$) عند القيم الممنوعة.'
		},
		practice: [
			{
				questionAr: 'مجموعة حلول المتراجحة $-x^2 + 4x - 3 > 0$ في $\\mathbb{R}$ هي:',
				options: [
					'$S = ]-\\infty, 1[ \\cup ]3, +\\infty[$',
					'$S = ]1, 3[$',
					'$S = [1, 3]$',
					'$S = \\emptyset$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: هذا المجال يمثل خارج الجذرين حيث تكون إشارة ثلاثي الحدود من نفس إشارة $a = -1$ (سالبة).',
					'إجابة صحيحة وممتازة! جذرا ثلاثي الحدود هما $1$ و $3$ ، وبما أن $a = -1 < 0$ فإن الإشارة تكون موجبة (عكس إشارة $a$) داخل مجال الجذرين $]1, 3[$ .',
					'خطأ: المتراجحة تماماً ($> 0$) وليست أو تساوي، فيجب أن يكون المجالان مفتوحين.',
					'خطأ: المميز $\\Delta = 16 - 12 = 4 > 0$ وثلاثي الحدود يقبل حلولاً موجبة.'
				],
				explanationAr: 'جذرا المعادلة $-x^2 + 4x - 3 = 0$ هما $x_1 = 1$ و $x_2 = 3$ . وبما أن معامل $x^2$ هو $a = -1 < 0$ ، فإن ثلاثي الحدود يكون موجباً تماماً عكس إشارة $a$ داخل مجال الجذرين المفتوح: $S = ]1, 3[$ .'
			},
			{
				questionAr: 'إشارة ثلاثي الحدود $g(x) = 2x^2 + 4x + 5$ على مجموعة الأعداد الحقيقية $\\mathbb{R}$ هي:',
				options: [
					'موجبة تماماً على $\\mathbb{R}$ لأن $\\Delta < 0$ ومعامل $a = 2 > 0$',
					'سالبة تماماً على $\\mathbb{R}$ لأن $\\Delta < 0$',
					'تنعدم عند جذرين حقيقيين مختلفين في الإشارة',
					'موجبة خارج الجذرين وسالبة داخلهما'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة وممتازة! $\\Delta = 16 - 4(2)(5) = 16 - 40 = -24 < 0$ ، وبما أن $\\Delta < 0$ فإن إشارة ثلاثي الحدود تكون دائماً من نفس إشارة $a = 2 > 0$ على كامل $\\mathbb{R}$ .',
					'خطأ: عندما يكون $\\Delta < 0$ تأخذ العبارة إشارة $a$ ، وهنا $a = 2$ موجب وليس سالباً.',
					'خطأ: المميز سالب فلا توجد أي جذور حقيقية.',
					'خطأ: هذا ينطبق فقط عندما يكون $\\Delta > 0$ .'
				],
				explanationAr: 'نحسب المميز: $\\Delta = 4^2 - 4(2)(5) = 16 - 40 = -24 < 0$ . بما أن $\\Delta < 0$ فإن ثلاثي الحدود لا ينعدم في $\\mathbb{R}$ ، وتكون إشارته مماثلة لإشارة $a = 2$ ، أي موجبة تماماً على كل $\\mathbb{R}$ .'
			},
			{
				questionAr: 'مجموعة حلول المتراجحة الكسرية $\\frac{x - 3}{x + 1} \\le 0$ في $\\mathbb{R}$ هي:',
				options: [
					'$S = [-1, 3]$',
					'$S = ]-1, 3]$',
					'$S = ]-\\infty, -1[ \\cup [3, +\\infty[$',
					'$S = ]-1, 3[$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: القيمة $-1$ تعدم المقام فهي قيمة ممنوعة ولا يمكن إغلاق المجال عندها!',
					'إجابة صحيحة تماماً! البسط ينعدم عند $3$ (مجال مغلق) والمقام ينعدم عند $-1$ (قيمة ممنوعة يُفتح عندها المجال حتماً).',
					'خطأ: هذا المجال يمثل القيم الموجبة للكسر وليس السالبة.',
					'خطأ: البسط ينعدم عند $3$ والمتراجحة تقبل التساوي ($0 \\le$)، لذا يجب غلق المجال عند $3$ .'
				],
				explanationAr: 'القيمة الممنوعة هي $x = -1$ . ينعدم البسط عند $x = 3$ . بإنشاء جدول الإشارة: الكسر يكون سالباً بين $-1$ و $3$ . بما أن المتراجحة تتضمن مساواة الصفر، نغلق المجال عند $3$ ونفتحه وجوباً عند القيمة الممنوعة $-1$ : $S = ]-1, 3]$ .'
			}
		]
	},

	// =========================================================================
	// LESSON 4: PLANE VECTORS & COLLINEARITY
	// =========================================================================
	{
		id: 'lesson_1as_tcst_t2_plane_vectors_collinearity',
		slug: '1as-tcst-t2-plane-vectors-collinearity',
		grade: '1as_tcst',
		yearSubjectId: 654,
		trimesterId: 't2',
		sequenceId: 'seq5',
		sequenceTitleAr: 'المقطع الخامس: الحساب الشعاعي، معادلات المستقيمات وجمل المعادلات الخطية',
		order: 4,
		titleAr: 'الحساب الشعاعي في المستوي، تساوي وجمع الأشعة، وشرط الارتباط الخطي',
		objectives: [
			'تساوي شعاعين، ضرب شعاع بعدد حقيقي وتطبيقاته الهندسية (إنشاء نقطة تقسم قطعة مستقيم بنسبة معطاة)',
			'جمع الأشعة في المستوي وتطبيق علاقة شال وقاعدة متوازي الأضلاع في تبسيط العبارات الشعاعية وإثبات العلاقات الهندسية',
			'حساب إحداثيات شعاع في معلم، ومعرفة شرط الارتباط الخطي (xy\' - x\'y = 0) وتوظيفه لإثبات توازي مستقيمين واستقامية ثلاث نقط'
		],
		keywordsAr: [
			'الحساب الشعاعي',
			'علاقة شال',
			'قاعدة متوازي الأضلاع',
			'ضرب شعاع بعدد حقيقي',
			'إحداثيات شعاع',
			'شرط الارتباط الخطي',
			'استقامية النقط والتوازي'
		],
		discover: {
			scenarioAr: 'في الملاحة البحرية، تنطلق باخرة من ميناء $A(1, 2)$ وفق إزاحة يمثلها الشعاع $\\vec{u}(4, 2)$ لتصل إلى النقطة $B$ ، ثم تدفعها تيارات بحرية بإزاحة ثانية يمثلها الشعاع $\\vec{v}(2, 4)$ لتصل إلى النقطة $C$ . كيف نحسب إحداثيات موقع الوصول $C$ باستعمال علاقة شال؟ وإذا أرادت خفر السواحل اعتراض مسار الباخرة عند نقطة $D(7, 5)$ ، فهل النقط $A$ و $B$ و $D$ على استقامة واحدة؟',
			svg: svgVectorChasles,
			steps: [
				{
					promptAr: 'احسب إحداثيات النقطة $B$ إذا علمت أن $\\vec{AB} = \\vec{u}(4, 2)$ والنقطة $A$ إحداثياتها $(1, 2)$ .',
					hintAr: '$x_B = x_A + x_u$ و $y_B = y_A + y_u$ .',
					expectedInput: '(5, 4)',
					revealAr: '$x_B = 1 + 4 = 5$ و $y_B = 2 + 2 = 4$ ، إذن النقطة $B(5, 4)$ .'
				},
				{
					promptAr: 'بتطبيق علاقة شال $\\vec{AC} = \\vec{AB} + \\vec{BC} = \\vec{u} + \\vec{v}$ ، احسب مركبات الشعاع $\\vec{AC}$ وإحداثيات النقطة $C$ .',
					hintAr: 'اجمع المركبات: $(4 + 2, 2 + 4)$ .',
					expectedInput: '(6, 6)',
					revealAr: 'مركبات الشعاع $\\vec{AC}$ هي $(4 + 2, 2 + 4) = (6, 6)$ . وتكون إحداثيات النقطة $C$ هي $(1 + 6, 2 + 6) = (7, 8)$ .'
				},
				{
					promptAr: 'احسب مركبات الشعاع $\\vec{AD}$ حيث $A(1, 2)$ و $D(7, 5)$ .',
					hintAr: '$\\vec{AD}(x_D - x_A, y_D - y_A)$ .',
					expectedInput: '(6, 3)',
					revealAr: '$\\vec{AD}(7 - 1, 5 - 2) = \\vec{AD}(6, 3)$ .'
				},
				{
					promptAr: 'طبق شرط الارتباط الخطي $xy\' - x\'y = 0$ على الشعاعين $\\vec{AB}(4, 2)$ و $\\vec{AD}(6, 3)$ . هل النقط $A, B, D$ في استقامية؟',
					hintAr: 'احسب $4 \\times 3 - 2 \\times 6$ .',
					expectedInput: '0',
					revealAr: '$xy\' - x\'y = 4(3) - 2(6) = 12 - 12 = 0$ . بما أن المحدد معدوم، فالشعاعان $\\vec{AB}$ و $\\vec{AD}$ مرتبطان خطياً والنقط $A, B, D$ تقع على استقامة واحدة تماماً.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**تساوي شعاعين وإحداثيات شعاع**: في معلم $(O; \\vec{i}, \\vec{j})$ ، إذا كانت $A(x_A, y_A)$ و $B(x_B, y_B)$ فإن:\n$$\\vec{AB}\\begin{pmatrix} x_B - x_A \\\\ y_B - y_A \\end{pmatrix}$$\nيتساوى شعاعان إذا وفقط إذا تساوت مركبتاهما. وهندسياً $\\vec{AB} = \\vec{CD}$ يكافئ أن الرباعي $ABDC$ متوازي أضلاع.',
				'**جمع الأشعة وقواعد التبسيط**:\n- **علاقة شال**: من أجل كل نقط $A, B, C$ في المستوي: $\\vec{AB} + \\vec{BC} = \\vec{AC}$ .\n- **قاعدة متوازي الأضلاع**: إذا كان $ABDC$ متوازي أضلاع فإن $\\vec{AB} + \\vec{AC} = \\vec{AD}$ .\n- تحليلياً: إذا كان $\\vec{u}(x, y)$ و $\\vec{v}(x\', y\')$ فإن $(\\vec{u} + \\vec{v})(x + x\', y + y\')$ .',
				'**ضرب شعاع بعدد حقيقي** $k \\in \\mathbb{R}$ :\n- مركبات الشعاع $k\\vec{u}$ هي $(kx, ky)$ . ويكون له نفس اتجاه $\\vec{u}$ إذا كان $k > 0$ ، وعكس اتجاهه إذا كان $k < 0$ .\n- إحداثيات منتصف قطعة $[AB]$ هي $I\\left(\\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2}\\right)$ لأن $\\vec{AI} = \\frac{1}{2}\\vec{AB}$ .',
				'**شرط الارتباط الخطي (Colinéarité)**:\n- يكون الشعاعان $\\vec{u}(x, y)$ و $\\vec{v}(x\', y\')$ مرتبطان خطياً إذا وفقط إذا وجد عدد حقيقي $k$ بحيث $\\vec{v} = k\\vec{u}$ ، وهو ما يكافئ تحليلياً:\n$$xy\' - x\'y = 0 \\quad \\text{أو} \\quad \\det(\\vec{u}, \\vec{v}) = \\begin{vmatrix} x & x\' \\\\ y & y\' \\end{vmatrix} = 0$$\n- **التطبيقات الهندسية**:\n  1. النقط المتمايزة $A, B, C$ في استقامية إذا وفقط إذا كان الشعاعان $\\vec{AB}$ و $\\vec{AC}$ مرتبطين خطياً.\n  2. المستقيمان $(AB)$ و $(CD)$ متوازيان إذا وفقط إذا كان الشعاعان $\\vec{AB}$ و $\\vec{CD}$ مرتبطين خطياً.'
			],
			visualSvg: svgVectorParallelogram,
			visualCaptionAr: 'قاعدة متوازي الأضلاع في جمع الأشعة: $\\vec{AD} = \\vec{AB} + \\vec{AC}$',
			examples: [
				{
					problemAr: 'لتكن النقط $A(-2, 1)$ و $B(2, 3)$ و $C(6, 5)$ في معلم متعامد ومتجانس. احسب مركبات الشعاعين $\\vec{AB}$ و $\\vec{AC}$ ، ثم بين أن النقط $A, B, C$ على استقامة واحدة.',
					solutionAr: '1) حساب المركبات:\n$\\vec{AB}\\begin{pmatrix} 2 - (-2) \\\\ 3 - 1 \\end{pmatrix} = \\vec{AB}\\begin{pmatrix} 4 \\\\ 2 \\end{pmatrix}$\n$\\vec{AC}\\begin{pmatrix} 6 - (-2) \\\\ 5 - 1 \\end{pmatrix} = \\vec{AC}\\begin{pmatrix} 8 \\\\ 4 \\end{pmatrix}$\n\n2) اختبار شرط الارتباط الخطي:\nنحسب $xy\' - x\'y = 4(4) - 2(8) = 16 - 16 = 0$ .\nبما أن الشرط محقق (كما نلاحظ أن $\\vec{AC} = 2\\vec{AB}$)، فإن الشعاعين $\\vec{AB}$ و $\\vec{AC}$ مرتبطان خطياً، وبالتالي النقط $A, B, C$ على استقامة واحدة.'
				},
				{
					problemAr: 'ليكن الشعاعان $\\vec{u}(m + 1, 3)$ و $\\vec{v}(4, 6)$ . عين قيمة العدد الحقيقي $m$ حتى يكون الشعاعان $\\vec{u}$ و $\\vec{v}$ مرتبطين خطياً.',
					solutionAr: 'يكون الشعاعان $\\vec{u}$ و $\\vec{v}$ مرتبطين خطياً إذا وفقط إذا كان:\n$$xy\' - x\'y = 0 \\iff (m + 1)(6) - 3(4) = 0$$\n$$6m + 6 - 12 = 0 \\iff 6m - 6 = 0 \\iff 6m = 6 \\iff m = 1$$\nإذن يرتبط الشعاعان خطياً عندما يكون $m = 1$ (ويصبح $\\vec{u}(2, 3)$ و $\\vec{v} = 2\\vec{u}$).'
				}
			],
			watchOutAr: 'احذر الترتيب عند حساب إحداثيات شعاع: نبدأ دائماً بنهاية الشعاع مطروحاً منها بدايته: $\\vec{AB} = (x_B - x_A, y_B - y_A)$ وليس العكس. كذلك في شرط الارتباط الخطي احذر كتابة $xy - x\'y\'$ بل هو جداء الطرفين ناقص جداء الوسطين: $xy\' - x\'y = 0$ .'
		},
		practice: [
			{
				questionAr: 'في معلم للمستوي، إذا كانت النقطتان $A(3, -2)$ و $B(-1, 4)$ ، فإن مركبات الشعاع $\\vec{AB}$ وإحداثيات منتصف القطعة $[AB]$ هما:',
				options: [
					'$\\vec{AB}\\begin{pmatrix} -4 \\\\ 6 \\end{pmatrix}$ و $I(1, 1)$',
					'$\\vec{AB}\\begin{pmatrix} 4 \\\\ -6 \\end{pmatrix}$ و $I(2, 2)$',
					'$\\vec{AB}\\begin{pmatrix} 2 \\\\ 2 \\end{pmatrix}$ و $I(-4, 6)$',
					'$\\vec{AB}\\begin{pmatrix} -4 \\\\ 6 \\end{pmatrix}$ و $I(2, 1)$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة وممتازة! $\\vec{AB} = (-1 - 3, 4 - (-2)) = (-4, 6)$ ومنتصف القطعة هو $I((3 - 1)/2, (-2 + 4)/2) = (1, 1)$ .',
					'خطأ: حسبت مركبات الشعاع $\\vec{BA}$ بدلاً من $\\vec{AB}$ .',
					'خطأ: جمعت الإحداثيات بدلاً من طرحها في حساب مركبات الشعاع.',
					'خطأ: إحداثيات المنتصف غير صحيحة، $(3 + (-1))/2 = 1$ وليس $2$ .'
				],
				explanationAr: 'مركبات الشعاع هي: $x_B - x_A = -1 - 3 = -4$ و $y_B - y_A = 4 - (-2) = 6$ ، إذن $\\vec{AB}(-4, 6)$ . وإحداثيات المنتصف: $x_I = \\frac{3 + (-1)}{2} = 1$ و $y_I = \\frac{-2 + 4}{2} = 1$ ، إذن $I(1, 1)$ .'
			},
			{
				questionAr: 'تكون النقط $A(1, 2)$ و $B(3, 6)$ و $C(5, y)$ على استقامة واحدة إذا وفقط إذا كانت قيمة $y$ هي:',
				options: [
					'$y = 8$',
					'$y = 10$',
					'$y = 12$',
					'$y = 7$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: تعويض $y = 8$ يعطي محدد ارتباط خطي غير معدوم.',
					'إجابة صحيحة! $\\vec{AB}(2, 4)$ و $\\vec{AC}(4, y - 2)$ ، شرط الارتباط: $2(y - 2) - 4(4) = 0 \\implies 2y - 4 - 16 = 0 \\implies 2y = 20 \\implies y = 10$ .',
					'خطأ: قيمة $y = 12$ تجعل معامل التوجيه مختلفاً.',
					'خطأ: الحساب غير دقيق.'
				],
				explanationAr: 'لدينا $\\vec{AB}(3 - 1, 6 - 2) = \\vec{AB}(2, 4)$ و $\\vec{AC}(5 - 1, y - 2) = \\vec{AC}(4, y - 2)$ . النقط في استقامية تعني ارتباط الشعاعين خطياً: $2(y - 2) - 4(4) = 0 \\iff 2y - 4 - 16 = 0 \\iff 2y = 20 \\iff y = 10$ .'
			},
			{
				questionAr: 'لتكن النقط $A, B, C, D$ في المستوي. التبسيط الشعاعي للعبارة $\\vec{S} = \\vec{AB} - \\vec{CB} + \\vec{CD}$ هو:',
				options: [
					'$\\vec{S} = \\vec{AD}$',
					'$\\vec{S} = \\vec{AC}$',
					'$\\vec{S} = \\vec{0}$',
					'$\\vec{S} = 2\\vec{AB}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة وممتازة! نلاحظ أن $-\\vec{CB} = \\vec{BC}$ ، فتصبح $\\vec{S} = \\vec{AB} + \\vec{BC} + \\vec{CD} = \\vec{AC} + \\vec{CD} = \\vec{AD}$ بتطبيق علاقة شال مرتين.',
					'خطأ: توقفت عند جمع أول حدين ونسيت إضافة الشعاع $\\vec{CD}$ .',
					'خطأ: الأشعة لا تلغي بعضها هنا.',
					'خطأ: قاعدة جمع شال لم تطبق بالشكل الصحيح.'
				],
				explanationAr: 'نعلم أن المعاكس الشعاعي هو $-\\vec{CB} = +\\vec{BC}$ . بالتعويض في العبارة: $\\vec{S} = \\vec{AB} + \\vec{BC} + \\vec{CD}$ . بتطبيق علاقة شال على الحدين الأولين: $\\vec{AB} + \\vec{BC} = \\vec{AC}$ ، ثم إضافة الحد الثالث: $\\vec{AC} + \\vec{CD} = \\vec{AD}$ .'
			}
		]
	},

	// =========================================================================
	// LESSON 5: CARTESIAN EQUATIONS OF LINES
	// =========================================================================
	{
		id: 'lesson_1as_tcst_t2_cartesian_equations_of_lines',
		slug: '1as-tcst-t2-cartesian-equations-of-lines',
		grade: '1as_tcst',
		yearSubjectId: 654,
		trimesterId: 't2',
		sequenceId: 'seq5',
		sequenceTitleAr: 'المقطع الخامس: الحساب الشعاعي، معادلات المستقيمات وجمل المعادلات الخطية',
		order: 5,
		titleAr: 'المعادلات الديكارتية للمستقيمات في المستوي، معامل التوجيه وشعاع التوجيه',
		objectives: [
			'تعيين معادلة ديكارتية لمستقيم (الشكل العام ax + by + c = 0 أو x = c) انطلاقاً من نقطة وشعاع توجيه u(-b, a) أو نقطتين منه',
			'التعرف على المعادلة المختصرة لمستقيم y = mx + p وتفسير معامل التوجيه m والترتيب عند المبدأ p بيانياً وحسابياً',
			'إنشاء مستقيم علمت معادلته، وتحديد الأوضاع النسبية لمستقيمين (متوازيان، متقاطعان، متطابقان) انطلاقاً من معادلتيها الديكارتيتين'
		],
		keywordsAr: [
			'معادلة مستقيم ديكارتية',
			'المعادلة المختصرة',
			'معامل التوجيه',
			'شعاع التوجيه',
			'الترتيب عند المبدأ',
			'الأوضاع النسبية لمستقيمين'
		],
		discover: {
			scenarioAr: 'يخطط مهندس طبوغرافي لشق طريق مستقيم $(\\mathcal{D})$ يمر بمحطة المراقبة $A(1, 2)$ ويوجهه المتجه $\\vec{u}(2, 1)$ . لكي تقع أي نقطة $M(x, y)$ على مسار هذا الطريق، يجب أن يكون المتجه $\\vec{AM}$ مرتبطاً خطياً مع متجه التوجيه $\\vec{u}$ . كيف نستخرج علاقة جبرية تربط بين الفاصلة $x$ والترتيب $y$؟ وما هي المعادلة المختصرة للطريق ومعامل انحداره؟',
			svg: svgLineCartesian,
			steps: [
				{
					promptAr: 'عبر عن مركبات الشعاع $\\vec{AM}$ بدلالة إحداثيات النقطة $M(x, y)$ علماً أن $A(1, 2)$ .',
					hintAr: 'طرح الإحداثيات: $(x - x_A, y - y_A)$ .',
					expectedInput: '(x - 1, y - 2)',
					revealAr: 'مركبات الشعاع هي $\\vec{AM}\\begin{pmatrix} x - 1 \\\\ y - 2 \\end{pmatrix}$ .'
				},
				{
					promptAr: 'اكتب شرط الارتباط الخطي بين $\\vec{AM}(x - 1, y - 2)$ وشعاع التوجيه $\\vec{u}(2, 1)$ .',
					hintAr: '$(x - 1)(1) - (y - 2)(2) = 0$ .',
					expectedInput: 'x - 2y + 3 = 0',
					revealAr: '$(x - 1)(1) - (y - 2)(2) = 0 \\iff x - 1 - 2y + 4 = 0 \\iff x - 2y + 3 = 0$ . هذه هي المعادلة الديكارتية للمستقيم $(\\mathcal{D})$ .'
				},
				{
					promptAr: 'انطلاقاً من المعادلة الديكارتية $x - 2y + 3 = 0$ ، اعزل $y$ بدلالة $x$ للحصول على المعادلة المختصرة $y = mx + p$ .',
					hintAr: '$2y = x + 3$ ثم اقسم الطرفين على $2$ .',
					expectedInput: 'y = 0.5x + 1.5',
					revealAr: '$2y = x + 3 \\iff y = \\frac{1}{2}x + \\frac{3}{2}$ . معامل التوجيه هو $m = \\frac{1}{2}$ والترتيب عند المبدأ هو $p = \\frac{3}{2} = 1.5$ .'
				},
				{
					promptAr: 'هل تقع النقطة $K(5, 4)$ على هذا الطريق؟ تحقق بتعويض إحداثياتها في المعادلة الديكارتية.',
					hintAr: 'احسب $5 - 2(4) + 3$ .',
					expectedInput: 'نعم',
					revealAr: 'بالتعويض: $5 - 2(4) + 3 = 5 - 8 + 3 = 0$ . بما أن المساواة محققة، فإن النقطة $K(5, 4)$ تنتمي فعلاً إلى المستقيم $(\\mathcal{D})$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**المعادلة الديكارتية العامة للمستقيم**: كل مستقيم $(\\mathcal{D})$ في المستوي يقبل معادلة من الشكل:\n$$ax + by + c = 0 \\quad \\text{حيث } (a, b) \\ne (0, 0)$$\n- المتجه $\\vec{u}(-b, a)$ هو **شعاع توجيه** للمستقيم $(\\mathcal{D})$ .\n- كل متجه غير معدوم مرتبط خطياً بـ $\\vec{u}$ هو أيضاً شعاع توجيه للمستقيم.',
				'**المعادلة المختصرة للمستقيم** ($b \\ne 0$):\nإذا كان المستقيم غير موازٍ لمحور التراتيب ($b \\ne 0$)، فإن معادلته تكتب على الشكل المختصر:\n$$y = mx + p \\quad \\text{حيث } m = -\\frac{a}{b} \\text{ (معامل التوجيه) و } p = -\\frac{c}{b} \\text{ (الترتيب عند المبدأ)}$$\nوإذا علمنا نقطتين متمايزتين $A(x_A, y_A)$ و $B(x_B, y_B)$ منه مع $x_A \\ne x_B$ ، فإن:\n$$m = \\frac{y_B - y_A}{x_B - x_A}$$',
				'**المستقيمات الخاصة**:\n- إذا كان $b = 0$ ($a \\ne 0$): معادلته $x = k$ وهو مستقيم يوازي محور التراتيب (شعاع توجيهه $\\vec{u}(0, 1)$ ومعامل توجيهه غير معرّف).\n- إذا كان $a = 0$ ($b \\ne 0$): معادلته $y = p$ وهو مستقيم يوازي محور الفواصل (شعاع توجيهه $\\vec{u}(1, 0)$ ومعامل توجيهه معدوم $m = 0$).',
				'**الأوضاع النسبية لمستقيمين** $(\\mathcal{D}): ax + by + c = 0$ و $(\\mathcal{D}\'): a\'x + b\'y + c\' = 0$ :\n- **متوازيان تماماً أو متطابقان**: إذا وفقط إذا كان شعاعا توجيههما مرتبطين خطياً: $ab\' - a\'b = 0$ (أي $m = m\'$ في المعادلة المختصرة).\n- **متقاطعان في نقطة وحيدة**: إذا وفقط إذا كان $ab\' - a\'b \\ne 0$ (أي $m \\ne m\'$).'
			],
			visualSvg: svgLineCartesian,
			visualCaptionAr: 'المعادلة الديكارتية للمستقيم وشعاع توجيهه $\\vec{u}(-b, a)$ ومعامل التوجيه $m$',
			examples: [
				{
					problemAr: 'عين معادلة ديكارتية للمستقيم $(\\Delta)$ المار بالنقطة $A(2, -1)$ والموجه بالشعاع $\\vec{u}(-3, 2)$ ، ثم اكتب معادلته المختصرة.',
					solutionAr: '1) لتكن $M(x, y)$ نقطة من المستوي. $M \\in (\\Delta) \\iff \\vec{AM}$ و $\\vec{u}$ مرتبطان خطياً.\nلدينا $\\vec{AM}(x - 2, y + 1)$ و $\\vec{u}(-3, 2)$ .\nشرط الارتباط الخطي:\n$$(x - 2)(2) - (y + 1)(-3) = 0$$\n$$2x - 4 + 3y + 3 = 0 \\iff 2x + 3y - 1 = 0$$\nهذه هي المعادلة الديكارتية للمستقيم $(\\Delta)$ .\n\n2) المعادلة المختصرة:\n$$3y = -2x + 1 \\iff y = -\\frac{2}{3}x + \\frac{1}{3}$$'
				},
				{
					problemAr: 'لتكن النقطتان $E(-1, 4)$ و $F(3, 2)$ . عين معامل توجيه المستقيم $(EF)$ ثم اكتب معادلته المختصرة وادرس وضعه النسبي مع المستقيم $(D): x + 2y - 5 = 0$ .',
					solutionAr: '1) معامل التوجيه لـ $(EF)$:\n$$m = \\frac{y_F - y_E}{x_F - x_E} = \\frac{2 - 4}{3 - (-1)} = \\frac{-2}{4} = -\\frac{1}{2}$$\n\n2) المعادلة المختصرة: $y = -\\frac{1}{2}x + p$ . بما أن $E(-1, 4) \\in (EF)$:\n$$4 = -\\frac{1}{2}(-1) + p \\iff 4 = \\frac{1}{2} + p \\iff p = 4 - \\frac{1}{2} = \\frac{7}{2}$$\nإذن $(EF): y = -\\frac{1}{2}x + \\frac{7}{2}$ (أو بالشكل الديكارتي: $x + 2y - 7 = 0$).\n\n3) الوضع النسبي مع $(D): x + 2y - 5 = 0$:\nمعامل توجيه $(D)$ هو $m\' = -\\frac{1}{2}$ . بما أن $m = m\' = -\\frac{1}{2}$ ولكن $p = \\frac{7}{2} \\ne p\' = \\frac{5}{2}$ ، فإن المستقيمين **متوازيان تماماً** ولا يشتركان في أي نقطة.'
				}
			],
			watchOutAr: 'احذر إشارة مركبات شعاع التوجيه: في المعادلة الديكارتية $ax + by + c = 0$ ، شعاع التوجيه هو $\\vec{u}(-b, a)$ (المركبة الأولى $-b$ بعكس إشارة $b$ ، والمركبة الثانية $a$ بنفس إشارة $a$). كذلك لا تخلط بين المستقيم العمودي $x = k$ (الذي لا يملك معامل توجيه) والمستقيم الأفقي $y = p$ (الذي معامل توجيهه يساوي صفراً).'
		},
		practice: [
			{
				questionAr: 'شعاع التوجيه ومعامل التوجيه للمستقيم ذي المعادلة الديكارتية $3x - 2y + 6 = 0$ هما على الترتيب:',
				options: [
					'$\\vec{u}(2, 3)$ و $m = \\frac{3}{2}$',
					'$\\vec{u}(-2, 3)$ و $m = -\\frac{3}{2}$',
					'$\\vec{u}(3, -2)$ و $m = \\frac{2}{3}$',
					'$\\vec{u}(-3, 2)$ و $m = \\frac{3}{2}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة وممتازة! في المعادلة $ax + by + c = 0$ لدينا $a = 3$ و $b = -2$ ، فشعاع التوجيه هو $\\vec{u}(-b, a) = \\vec{u}(2, 3)$ ومعامل التوجيه هو $m = -a/b = -3/(-2) = 3/2$ .',
					'خطأ: نسيت الإشارة السالبة لـ $b$ في صيغة شعاع التوجيه $\\vec{u}(-b, a)$ .',
					'خطأ: عكست الترتيب؛ المركبة الأولى لشعاع التوجيه هي $-b$ وليست $a$ .',
					'خطأ: المركبة الأولى لشعاع التوجيه غير صحيحة.'
				],
				explanationAr: 'بالمطابقة مع الشكل العام $ax + by + c = 0$ : نجد $a = 3$ و $b = -2$ و $c = 6$ . شعاع التوجيه هو $\\vec{u}(-b, a) = \\vec{u}(-(-2), 3) = \\vec{u}(2, 3)$ . وبتحويلها للشكل المختصر: $2y = 3x + 6 \\implies y = \\frac{3}{2}x + 3$ ، فيكون معامل التوجيه $m = \\frac{3}{2}$ .'
			},
			{
				questionAr: 'المعادلة الديكارتية للمستقيم المار بالنقطة $A(1, 2)$ والموازي للمستقيم $(\\mathcal{D}): 2x - y + 4 = 0$ هي:',
				options: [
					'$2x - y = 0$',
					'$2x - y + 1 = 0$',
					'$x + 2y - 5 = 0$',
					'$2x + y - 4 = 0$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! التوازي يعني أن للمستقيم نفس معاملي $x$ و $y$ : $2x - y + c = 0$ . وبتعويض $A(1, 2)$ نجد $2(1) - 2 + c = 0 \\implies c = 0$ ، إذن $2x - y = 0$ .',
					'خطأ: تعويض إحداثيات $A(1, 2)$ يعطي $2(1) - 2 + 1 = 1 \\ne 0$ .',
					'خطأ: هذا المستقيم عمودي وليس موازياً.',
					'خطأ: غيرت إشارة $y$ مما يغير معامل التوجيه.'
				],
				explanationAr: 'بما أن المستقيم المطلوب يوازي $(\\mathcal{D})$ فلهما نفس شعاع التوجيه، وتكون معادلته من الشكل $2x - y + c = 0$ . وبما أنه يمر بالنقطة $A(1, 2)$ فإن إحداثياتها تحقق المعادلة: $2(1) - (2) + c = 0 \\iff 2 - 2 + c = 0 \\iff c = 0$ . ومنه المعادلة هي $2x - y = 0$ .'
			},
			{
				questionAr: 'المستقيمان $(d_1): 4x - 6y + 1 = 0$ و $(d_2): -2x + 3y + 5 = 0$ في المستوي هما مستقيمان:',
				options: [
					'متقاطعان في نقطة وحيدة',
					'متوازيان تماماً ولا يشتركان في أي نقطة',
					'متطابقان',
					'متعامدان'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: المحدد $ab\' - a\'b = 4(3) - (-6)(-2) = 12 - 12 = 0$ ، إذن المستقيمان متوازيان وليسا متقاطعين.',
					'إجابة صحيحة تماماً! شعاعا التوجيه مرتبطان خطياً لأن $4(3) - (-6)(-2) = 0$ ، والثابتان غير متناسبين مع المعاملات ($1/5 \\ne 4/-2$)، فهما متوازيان تماماً.',
					'خطأ: لكي يتطابقا يجب أن تكون النسبة متساوية بين جميع المعاملات بما فيها الحد الثابت.',
					'خطأ: جداء المعاملات لا يحقق التعامد.'
				],
				explanationAr: 'شعاع توجيه $(d_1)$ هو $\\vec{u}_1(6, 4)$ وشعاع توجيه $(d_2)$ هو $\\vec{u}_2(-3, -2)$ . نلاحظ أن $\\vec{u}_1 = -2\\vec{u}_2$ فهما مرتبطان خطياً، أي المستقيمين متوازيان. وبما أن $\\frac{4}{-2} = \\frac{-6}{3} = -2 \\ne \\frac{1}{5}$ ، فإن المستقيمين متوازيان منفصلان تماماً ($S = \\emptyset$).'
			}
		]
	},

	// =========================================================================
	// LESSON 6: LINEAR SYSTEMS WITH TWO VARIABLES
	// =========================================================================
	{
		id: 'lesson_1as_tcst_t2_linear_systems_two_variables',
		slug: '1as-tcst-t2-linear-systems-two-variables',
		grade: '1as_tcst',
		yearSubjectId: 654,
		trimesterId: 't2',
		sequenceId: 'seq5',
		sequenceTitleAr: 'المقطع الخامس: الحساب الشعاعي، معادلات المستقيمات وجمل المعادلات الخطية',
		order: 6,
		titleAr: 'جمل معادلتين خطيتين لمجهولين: الحل الجبري، التفسير الهندسي وترييض المشكلات',
		objectives: [
			'حل جملة معادلتين خطيتين من الدرجة الأولى بمجهولين بالطرق الجبرية: طريقة التعويض، طريقة الجمع، وطريقة المحدد',
			'التفسير الهندسي لحل جملة معادلتين كنقطة تقاطع مستقيمين والتمييز بين حالات: حل وحيد، لا توجد حلول، وعدد غير منته من الحلول',
			'ترييض مشكلات هندسية وفيزيائية واقتصادية تؤدي إلى جمل معادلات خطية بمجهولين وصياغة الحل وتفسيره'
		],
		keywordsAr: [
			'جملة معادلتين خطيتين',
			'طريقة التعويض',
			'طريقة الجمع',
			'الحل البياني لجملة معادلتين',
			'تقاطع مستقيمين',
			'ترييض المشكلات'
		],
		discover: {
			scenarioAr: 'اشترت إدارة ثانوية جزائرية في بداية الفصل الثاني كتباً علمية ومجلات ثقافية لمكتبة المؤسسة. الفاتورة الأولى تضمنت $3$ كتب علمية ومجلتين بمبلغ إجمالي قدره $2900\\text{ DA}$ . والفاتورة الثانية من نفس المورد تضمنت كتابين علميين و $4$ مجلات بمبلغ $3400\\text{ DA}$ . كيف ننمذج هذه الوضعية الواقعية في شكل جملة معادلتين خطيتين؟ وما هي الطرق الجبرية والبيانية لإيجاد سعر الكتاب الواحد وسعر المجلة الواحدة؟',
			svg: svgLinearSystemIntersection,
			steps: [
				{
					promptAr: 'نرمز لسعر الكتاب العلمي بـ $x$ وسعر المجلة الثقافية بـ $y$ . اكتب جملة المعادلتين الممثلة للفاتورتين.',
					hintAr: '$3x + 2y = 2900$ و $2x + 4y = 3400$ .',
					expectedInput: '3x + 2y = 2900, 2x + 4y = 3400',
					revealAr: 'الجملة هي:\n$$\\begin{cases} 3x + 2y = 2900 \\quad (1) \\\\ 2x + 4y = 3400 \\quad (2) \\end{cases}$$'
				},
				{
					promptAr: 'بقسمة طرفي المعادلة (2) على $2$ ، نجد $x + 2y = 1700$ . اعزل المجهول $x$ بدلالة $y$ .',
					hintAr: '$x = 1700 - 2y$ .',
					expectedInput: 'x = 1700 - 2y',
					revealAr: '$x = 1700 - 2y$ . هذه هي طريقة التعويض.'
				},
				{
					promptAr: 'عوض عبارة $x$ في المعادلة (1): $3(1700 - 2y) + 2y = 2900$ ، ثم احسب قيمة $y$ (سعر المجلة).',
					hintAr: '$5100 - 6y + 2y = 2900 \\implies -4y = -2200$ .',
					expectedInput: '550',
					revealAr: '$5100 - 4y = 2900 \\iff -4y = -2200 \\iff y = \\frac{-2200}{-4} = 550\\text{ DA}$ .'
				},
				{
					promptAr: 'استنتج قيمة $x$ (سعر الكتاب العلمي) وماذا تمثل الثنائية $(x, y)$ هندسياً بالنسبة للمستقيمين؟',
					hintAr: '$x = 1700 - 2(550)$ .',
					expectedInput: '600',
					revealAr: '$x = 1700 - 2(550) = 1700 - 1100 = 600\\text{ DA}$ . إذن سعر الكتاب العلمي $600\\text{ DA}$ وسعر المجلة $550\\text{ DA}$ ، والثنائية $(600, 550)$ تمثل هندسياً إحداثيات **نقطة تقاطع** المستقيمين الممثلين للمعادلتين.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**الشكل العام لجملة معادلتين خطيتين لمجهولين**:\n$$\\begin{cases} ax + by = c \\\\ a\'x + b\'y = c\' \\end{cases} \\quad \\text{حيث } (a, b) \\ne (0,0) \\text{ و } (a\', b\') \\ne (0,0)$$',
				'**طرق الحل الجبري**:\n- **طريقة التعويض**: عزل أحد المجهولين بدلالة الآخر في إحدى المعادلتين وتعويضه في المعادلة الأخرى.\n- **طريقة الجمع**: ضرب طرفي إحدى المعادلتين أو كلتيهما في أعداد تجعل معاملي أحد المجهولين متعاكسين، ثم جمع المعادلتين طرفاً لطرف للتخلص من ذلك المجهول.\n- **طريقة المحدد (Cramer)**:\n  نحسب محدد الجملة: $\\Delta = \\begin{vmatrix} a & b \\\\ a\' & b\' \\end{vmatrix} = ab\' - a\'b$ .\n  - إذا كان $\\mathbf{\\Delta \\ne 0}$ : للجملة **حل وحيد** هو الثنائية $(x, y)$ حيث:\n$$x = \\frac{\\Delta_x}{\\Delta} = \\frac{cb\' - c\'b}{ab\' - a\'b} \\quad \\text{و} \\quad y = \\frac{\\Delta_y}{\\Delta} = \\frac{ac\' - a\'c}{ab\' - a\'b}$$\n  - إذا كان $\\mathbf{\\Delta = 0}$ : فإما لا توجد حلول ($S = \\emptyset$) (مستقيمان متوازيان تماماً)، أو يوجد عدد غير منتهٍ من الحلول (مستقيمان متطابقان).',
				'**التفسير الهندسي البياني**:\n- المعادلتان تمثلان مستقيمين $(\\mathcal{D}_1)$ و $(\\mathcal{D}_2)$ في المستوي.\n- حل الجملة يمثل إحداثيات **نقطة تقاطع** المستقيمين $(\\mathcal{D}_1) \\cap (\\mathcal{D}_2) = \\{M(x_0, y_0)\\}$ .',
				'**منهجية ترييض مشكلة**:\n1. اختيار المجهولين وتحديد وحدتهما ومجال قيمتهما.\n2. صياغة معطيات النص في شكل جملة معادلتين خطيتين.\n3. حل الجملة جبرياً بالطريقة الأنسب.\n4. التحقق من صحة النتائج والإجابة بجملة لغوية واضحة.'
			],
			visualSvg: svgLinearSystemIntersection,
			visualCaptionAr: 'التفسير الهندسي لحل جملة معادلتين كنقطة تقاطع مستقيمين $M(3, 1)$',
			examples: [
				{
					problemAr: 'حل الجملة التالية بطريقة المحدد (كرامر) وطريقة الجمع:\n$$\\begin{cases} 2x + 3y = 7 \\\\ 5x - y = 9 \\end{cases}$$',
					solutionAr: '1) طريقة المحدد:\n$$\\Delta = \\begin{vmatrix} 2 & 3 \\\\ 5 & -1 \\end{vmatrix} = 2(-1) - 3(5) = -2 - 15 = -17 \\ne 0$$\nبما أن $\\Delta \\ne 0$ ، فللجملة حل وحيد:\n$$\\Delta_x = \\begin{vmatrix} 7 & 3 \\\\ 9 & -1 \\end{vmatrix} = 7(-1) - 3(9) = -7 - 27 = -34 \\implies x = \\frac{-34}{-17} = 2$$\n$$\\Delta_y = \\begin{vmatrix} 2 & 7 \\\\ 5 & 9 \\end{vmatrix} = 2(9) - 7(5) = 18 - 35 = -17 \\implies y = \\frac{-17}{-17} = 1$$\nإذن مجموعة الحلول هي: $S = \\{(2, 1)\\}$ .\n\n2) بالتحقق بطريقة الجمع:\nنضرب المعادلة الثانية في $3$:\n$$\\begin{cases} 2x + 3y = 7 \\\\ 15x - 3y = 27 \\end{cases}$$\nبالجمع طرفاً لطرف: $17x = 34 \\implies x = 2$ ، وبالتعويض: $2(2) + 3y = 7 \\implies 3y = 3 \\implies y = 1$ .'
				},
				{
					problemAr: 'ترييض مشكلة هندسية: مستطيل محيطه $48\\text{ cm}$ . إذا زدنا في طوله بمقدار $2\\text{ cm}$ ونقصنا من عرضه بمقدار $1\\text{ cm}$ ، بقيت مساحته دون تغيير. احسب بعدي هذا المستطيل.',
					solutionAr: 'نرمز لطول المستطيل بـ $x$ ولعرضه بـ $y$ (حيث $x > y > 0$).\n1) المحيط: $2(x + y) = 48 \\implies x + y = 24$ .\n2) المساحة: المساحة الأصلية هي $xy$ ، والمساحة الجديدة هي $(x + 2)(y - 1)$ .\n$$(x + 2)(y - 1) = xy \\iff xy - x + 2y - 2 = xy \\iff -x + 2y = 2$$\nنحصل على الجملة:\n$$\\begin{cases} x + y = 24 \\quad (1) \\\\ -x + 2y = 2 \\quad (2) \\end{cases}$$\nبجمع المعادلتين طرفاً لطرف للتخلص من $x$:\n$$3y = 26 \\implies \\text{عفواً: } 3y = 26$$\nدعنا نراجع: $-x + 2y = 2$ و $x + y = 24$ يعطي $3y = 26$ ، ومنه $y = \\frac{26}{3}\\text{ cm}$ و $x = 24 - \\frac{26}{3} = \\frac{46}{3}\\text{ cm}$ .\nإذن بعدا المستطيل هما: الطول $L = \\frac{46}{3} \\approx 15.33\\text{ cm}$ والعرض $l = \\frac{26}{3} \\approx 8.67\\text{ cm}$ .'
				}
			],
			watchOutAr: 'احذر كتابة مجموعة الحلول كعددين منفصلين؛ حل الجملة هو ثنائية مرتبة داخل حاصرتين: $S = \\{(x_0, y_0)\\}$ مع وضع الفاصلة $x$ أولاً والترتيب $y$ ثانياً. كذلك احذر قسمة كرامر إذا كان محدد الجملة معدوماً $\\Delta = 0$ ، ففي هذه الحالة لا يوجد حل وحيد ويجب دراسة توافق المعادلتين.'
		},
		practice: [
			{
				questionAr: 'محدد الجملة $\\begin{cases} 3x - 4y = 5 \\\\ 2x + y = 7 \\end{cases}$ وحلها الوحيد في $\\mathbb{R}^2$ هما:',
				options: [
					'$\\Delta = 11$ و $S = \\{(3, 1)\\}$',
					'$\\Delta = -5$ و $S = \\{(1, 3)\\}$',
					'$\\Delta = 11$ و $S = \\{(1, 3)\\}$',
					'$\\Delta = 7$ و $S = \\{(2, 3)\\}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة وممتازة! $\\Delta = 3(1) - (-4)(2) = 3 + 8 = 11$ . $\\Delta_x = 5(1) - (-4)(7) = 33 \\implies x = 3$ ، و $\\Delta_y = 3(7) - 5(2) = 11 \\implies y = 1$ . الحل هو $S = \\{(3, 1)\\}$ .',
					'خطأ: أخطأت في حساب المحدد؛ تذكر أن $-(-4 \\times 2) = +8$ وليس $-8$ .',
					'خطأ: عكست الترتيب في الثنائية الحل؛ $x = 3$ و $y = 1$ وليس العكس.',
					'خطأ: الحسابات غير صحيحة.'
				],
				explanationAr: 'نحسب محدد الجملة: $\\Delta = \\begin{vmatrix} 3 & -4 \\\\ 2 & 1 \\end{vmatrix} = 3(1) - (-4)(2) = 3 + 8 = 11 \\ne 0$ . لحساب $x$: $\\Delta_x = 5(1) - (-4)(7) = 5 + 28 = 33 \\implies x = \\frac{33}{11} = 3$ . لحساب $y$: $\\Delta_y = 3(7) - 5(2) = 21 - 10 = 11 \\implies y = \\frac{11}{11} = 1$ . إذن $S = \\{(3, 1)\\}$ .'
			},
			{
				questionAr: 'عدد حلول جملة المعادلتين الخطيتين $\\begin{cases} 2x - 6y = 8 \\\\ -x + 3y = -4 \\end{cases}$ في $\\mathbb{R}^2$ هو:',
				options: [
					'حل وحيد هو $(4, 0)$',
					'لا يوجد أي حل ($S = \\emptyset$)',
					'عدد غير منتهٍ من الحلول لأن المعادلتين متكافئتان والمستقيمين متطابقان',
					'حلان متمايزان'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: الزوج $(4, 0)$ هو حل لكنه ليس الحل الوحيد.',
					'خطأ: الجملة مقبولة الحلول لأن قسمة المعادلة الأولى على $-2$ تعطي تماماً المعادلة الثانية.',
					'إجابة صحيحة تماماً! بضرب المعادلة الثانية في $-2$ نجد $2x - 6y = 8$ وهي مطابقة تماماً للأولى، فالمستقيمان متطابقان والجملة تقبل مالا نهاية من الحلول.',
					'خطأ: جملة معادلتين خطيتين لا يمكن أن تملك حلين متمايزين فقط (إما 0، أو 1، أو مالا نهاية).'
				],
				explanationAr: 'نلاحظ أن معاملات المعادلة الأولى هي تماماً مضاعفات معاملات المعادلة الثانية مضروبة في $-2$ : $2 = -2(-1)$ ، $-6 = -2(3)$ ، $8 = -2(-4)$ . إذن المعادلتان تمثلان نفس المستقيم تماماً، وبالتالي تشتركان في عدد غير منتهٍ من الحلول (جميع نقط المستقيم).'
			},
			{
				questionAr: 'حقل مستطيل الشكل محيطه $70\\text{ m}$ ، وطوله يزيد عن عرضه بمقدار $5\\text{ m}$ . ما هو طول الحقل $L$ وعرضه $l$ ؟',
				options: [
					'$L = 20\\text{ m}$ و $l = 15\\text{ m}$',
					'$L = 25\\text{ m}$ و $l = 10\\text{ m}$',
					'$L = 40\\text{ m}$ و $l = 30\\text{ m}$',
					'$L = 22.5\\text{ m}$ و $l = 17.5\\text{ m}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة وممتازة! نصف المحيط $L + l = 35$ وفرقهما $L - l = 5$ . بالجمع: $2L = 40 \\implies L = 20\\text{ m}$ ومنه $l = 15\\text{ m}$ .',
					'خطأ: $L - l = 15$ وليس $5$ .',
					'خطأ: مجموع الطول والعرض هنا $70$ وليس نصف المحيط.',
					'خطأ: مجموعهما $40$ بينما نصف المحيط هو $35$ .'
				],
				explanationAr: 'نصف محيط المستطيل هو: $L + l = \\frac{70}{2} = 35$ . والشرط الثاني: $L - l = 5$ . نجمع المعادلتين طرفاً لطرف: $(L + l) + (L - l) = 35 + 5 \\implies 2L = 40 \\implies L = 20\\text{ m}$ . وبالتعويض نجد: $l = 35 - 20 = 15\\text{ m}$ .'
			}
		]
	},

	// =========================================================================
	// LESSON 7: ORIENTED TRIGONOMETRIC CIRCLE & RATIOS
	// =========================================================================
	{
		id: 'lesson_1as_tcst_t2_oriented_circle_trigonometric_ratios',
		slug: '1as-tcst-t2-oriented-circle-trigonometric-ratios',
		grade: '1as_tcst',
		yearSubjectId: 654,
		trimesterId: 't2',
		sequenceId: 'seq6',
		sequenceTitleAr: 'المقطع السادس: الحساب المثلثي الموجه والدائرة المثلثية',
		order: 7,
		titleAr: 'الدائرة المثلثية الموجهة، قياس الزوايا بالراديان والنسب المثلثية (cos, sin, tan)',
		objectives: [
			'تعريف الدائرة المثلثية والاتجاه الموجب المباشر وعلاقة كل عدد حقيقي بنقطة من الدائرة المثلثية بنموذج لف المستقيم العددي',
			'معرفة الراديان كوحدة لقياس الزوايا والتحويل من الدرجة إلى الراديان والعكس (π rad = 180°)',
			'تعريف cos(x) و sin(x) كفاصلة وترتيب نقطة على الدائرة المثلثية، وتعريف tan(x) = sin(x)/cos(x)، وحساب نسب الزوايا الشهيرة وتطبيق العلاقة الأساسية cos²x + sin²x = 1'
		],
		keywordsAr: [
			'الدائرة المثلثية',
			'الراديان',
			'لف المستقيم العددي',
			'جيب التمام cos',
			'الجيب sin',
			'الظل tan',
			'الزوايا الشهيرة',
			'العلاقة المثلثية الأساسية'
		],
		discover: {
			scenarioAr: 'في عجلة دوارة عملاقة (Grande Roue) نصف قطرها $R = 1\\text{ m}$ في مدينة ألعاب، تدور مقصورة انطلاقاً من النقطة $I(1, 0)$ في الاتجاه المباشر (عكس عقارب الساعة). ننمذج مسار الحركة بلف مستقيم حقيقي مدرج مماس للعجلة عند النقطة $I$ . عند قطع مسافة قوسية قدرها $x$ متر على المحيط، ما هو القياس بالراديان للزاوية المركزية؟ وكيف تحدد إحداثيات مقصورة الدوران $(\\cos x, \\sin x)$ على مستوى الدائرة؟',
			svg: svgTrigonometricCircle({
				anglesRad: [
					{ rad: 0, label: '0' },
					{ rad: Math.PI / 6, label: 'π/6 (30°)', color: '#dc2626' },
					{ rad: Math.PI / 4, label: 'π/4 (45°)', color: '#2563eb' },
					{ rad: Math.PI / 3, label: 'π/3 (60°)', color: '#15803d' },
					{ rad: Math.PI / 2, label: 'π/2 (90°)', color: '#7c3aed' }
				]
			}),
			steps: [
				{
					promptAr: 'بما أن نصف قطر الدائرة هو $R = 1$ ، فإن محيطها هو $2\\pi R = 2\\pi$ . ما هو القياس بالراديان للزاوية التي تقابل دورة كاملة ($360^\\circ$) ونصف دورة ($180^\\circ$)؟',
					hintAr: 'الدورة الكاملة تقابل القوس المحيطي كاملاً $2\\pi$ .',
					expectedInput: '2pi, pi',
					revealAr: 'الدورة الكاملة ($360^\\circ$) تقابل زاوية قيسها $2\\pi\\text{ rad}$ ، ونصف دورة ($180^\\circ$) تقابل $\\pi\\text{ rad}$ . ومنها القاعدة الذهبية: $\\pi\\text{ rad} = 180^\\circ$ .'
				},
				{
					promptAr: 'حول قيس زاوية شهيرة مقداره $60^\\circ$ إلى وحدة الراديان باستعمال النسبة والتناسب.',
					hintAr: 'احسب $\\frac{60 \\times \\pi}{180}$ ثم اختزل الكسر.',
					expectedInput: 'pi/3',
					revealAr: '$\\frac{60 \\times \\pi}{180} = \\frac{\\pi}{3}\\text{ rad}$ . وبنفس الطريقة $30^\\circ = \\frac{\\pi}{6}\\text{ rad}$ و $45^\\circ = \\frac{\\pi}{4}\\text{ rad}$ و $90^\\circ = \\frac{\\pi}{2}\\text{ rad}$ .'
				},
				{
					promptAr: 'إذا كانت النقطة $M$ على الدائرة المثلثية تقابل الزاوية $x$ ، فماذا تمثل فاصلة النقطة $M$ وترتيبها؟',
					hintAr: 'الإحداثيات الديكارتية للنقطة على دائرة الوحدة.',
					expectedInput: 'cos(x), sin(x)',
					revealAr: 'فاصلة النقطة $M$ هي جيب تمام الزاوية $\\cos(x)$ ، وترتيبها هو جيب الزاوية $\\sin(x)$ ، أي $M(\\cos x, \\sin x)$ .'
				},
				{
					promptAr: 'بتطبيق مبرهنة فيثاغورس في المثلث القائم $OHM$ حيث الوتر هو نصف القطر $OM = 1$ ، ما هي العلاقة الأساسية التي تربط بين $\\cos x$ و $\\sin x$ ؟',
					hintAr: '$OH^2 + HM^2 = OM^2$ .',
					expectedInput: 'cos^2(x) + sin^2(x) = 1',
					revealAr: 'بما أن $OH = |\\cos x|$ و $HM = |\\sin x|$ والوتر $OM = 1$ ، فإن:\n$$\\cos^2 x + \\sin^2 x = 1$$\nوهي العلاقة المثلثية الأساسية الصالحة لكل عدد حقيقي $x$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**تعريف الدائرة المثلثية والاتجاه الموجه**:\n- هي دائرة موجهة نصف قطرها $R = 1$ ومركزها مبدأ المعلم المتعامد والمتجانس $O(0, 0)$ .\n- الاتجاه المباشر (الموجب) هو **عكس اتجاه عقارب الساعة**.\n- نموذج **لف المستقيم العددي**: لكل عدد حقيقي $x \\in \\mathbb{R}$ ترفق نقطة وحيدة $M$ على الدائرة المثلثية. وكل نقطة $M$ تقبل ما لا نهاية من الأعداد من الشكل $x + 2k\\pi$ (حيث $k \\in \\mathbb{Z}$).',
				'**وحدة الراديان والتحويل**:\n- الراديان ($\\text{rad}$) هو قيس زاوية مركزية تحصر قوساً طوله مساوٍ لنصف قطر الدائرة.\n- العلاقة الأساسية: $\\mathbf{\\pi\\text{ rad} = 180^\\circ}$ .\n- للتحويل من الدرجات $D$ إلى الراديان $R$ : $R = \\frac{D \\times \\pi}{180}$ ، وللتحويل العكسي: $D = \\frac{R \\times 180}{\\pi}$ .',
				'**النسب المثلثية للعدد الحقيقي $x$**:\n- لكل $x \\in \\mathbb{R}$ ترفق النقطة $M(\\cos x, \\sin x)$ على الدائرة المثلثية:\n$$\\cos x = \\text{فاصلة النقطة } M \\quad \\text{و} \\quad \\sin x = \\text{ترتيب النقطة } M$$\n- الحصر الأساسي: $-\\mathbf{1 \\le \\cos x \\le 1}$ و $-\\mathbf{1 \\le \\sin x \\le 1}$ .\n- **العلاقة الأساسية**: $\\mathbf{\\cos^2 x + \\sin^2 x = 1}$ .\n- دالة الظل: معرّفة لكل $x \\ne \\frac{\\pi}{2} + k\\pi$ بـ $\\tan x = \\frac{\\sin x}{\\cos x}$ .',
				'**جدول نسب الزوايا الشهيرة في الربع الأول**:\n- $x = 0$ : $\\cos 0 = 1$ ، $\\sin 0 = 0$ ، $\\tan 0 = 0$\n- $x = \\frac{\\pi}{6}$ ($30^\\circ$): $\\cos\\frac{\\pi}{6} = \\frac{\\sqrt{3}}{2}$ ، $\\sin\\frac{\\pi}{6} = \\frac{1}{2}$ ، $\\tan\\frac{\\pi}{6} = \\frac{\\sqrt{3}}{3}$\n- $x = \\frac{\\pi}{4}$ ($45^\\circ$): $\\cos\\frac{\\pi}{4} = \\frac{\\sqrt{2}}{2}$ ، $\\sin\\frac{\\pi}{4} = \\frac{\\sqrt{2}}{2}$ ، $\\tan\\frac{\\pi}{4} = 1$\n- $x = \\frac{\\pi}{3}$ ($60^\\circ$): $\\cos\\frac{\\pi}{3} = \\frac{1}{2}$ ، $\\sin\\frac{\\pi}{3} = \\frac{\\sqrt{3}}{2}$ ، $\\tan\\frac{\\pi}{3} = \\sqrt{3}$\n- $x = \\frac{\\pi}{2}$ ($90^\\circ$): $\\cos\\frac{\\pi}{2} = 0$ ، $\\sin\\frac{\\pi}{2} = 1$ ، $\\tan\\frac{\\pi}{2}$ غير معرّف.',
				'**إشارات النسب حسب أرباع الدائرة المثلثية**:\n- الربع الأول $[0, \\frac{\\pi}{2}]$ : $\\cos x \\ge 0$ و $\\sin x \\ge 0$\n- الربع الثاني $[\\frac{\\pi}{2}, \\pi]$ : $\\cos x \\le 0$ و $\\sin x \\ge 0$\n- الربع الثالث $[\\pi, \\frac{3\\pi}{2}]$ : $\\cos x \\le 0$ و $\\sin x \\le 0$\n- الربع الرابع $[\\frac{3\\pi}{2}, 2\\pi]$ : $\\cos x \\ge 0$ و $\\sin x \\le 0$'
			],
			visualSvg: svgTrigonometricCircle({
				anglesRad: [
					{ rad: 0, label: '0' },
					{ rad: Math.PI / 6, label: 'π/6', color: '#dc2626' },
					{ rad: Math.PI / 4, label: 'π/4', color: '#2563eb' },
					{ rad: Math.PI / 3, label: 'π/3', color: '#15803d' },
					{ rad: Math.PI / 2, label: 'π/2', color: '#7c3aed' },
					{ rad: Math.PI, label: 'π', color: '#475569' }
				]
			}),
			visualCaptionAr: 'الدائرة المثلثية الموجهة وإحداثيات نقط الزوايا الشهيرة $(\\cos x, \\sin x)$',
			examples: [
				{
					problemAr: 'ليكن $x$ عدداً حقيقياً من المجال $[\\frac{\\pi}{2}, \\pi]$ بحيث $\\sin x = \\frac{3}{5}$ . احسب القيمة المضبوطة لكل من $\\cos x$ و $\\tan x$ .',
					solutionAr: '1) نطبق العلاقة الأساسية: $\\cos^2 x + \\sin^2 x = 1$ :\n$$\\cos^2 x = 1 - \\sin^2 x = 1 - \\left(\\frac{3}{5}\\right)^2 = 1 - \\frac{9}{25} = \\frac{16}{25}$$\nبما أن $x \\in [\\frac{\\pi}{2}, \\pi]$ (الربع الثاني)، فإن جيب التمام سالب: $\\cos x \\le 0$ .\nإذن:\n$$\\cos x = -\\sqrt{\\frac{16}{25}} = -\\frac{4}{5} = -0.8$$\n\n2) حساب $\\tan x$:\n$$\\tan x = \\frac{\\sin x}{\\cos x} = \\frac{3/5}{-4/5} = -\\frac{3}{4} = -0.75$$'
				},
				{
					problemAr: 'بسط العبارة المثلثية التالية: $E = \\cos(\\pi - x) + \\sin(\\pi - x) + \\cos(-x) + \\sin(-x)$ .',
					solutionAr: 'باستعمال دساتير الإرجاع إلى الربع الأول:\n- $\\cos(\\pi - x) = -\\cos x$\n- $\\sin(\\pi - x) = \\sin x$\n- $\\cos(-x) = \\cos x$ (لأن دالة جيب التمام زوجية)\n- $\\sin(-x) = -\\sin x$ (لأن دالة الجيب فردية)\n\nبالتعويض في العبارة:\n$$E = (-\\cos x) + (\\sin x) + (\\cos x) + (-\\sin x) = 0$$\nإذن العبارة معدومة: $E = 0$ .'
				}
			],
			watchOutAr: 'احذر تحديد إشارة $\\cos x$ دون مراعاة الربع الذي ينتمي إليه $x$ : المعادلة $\\cos^2 x = 1 - \\sin^2 x$ تعطي قيمتين متعاكستين $\\pm\\sqrt{1 - \\sin^2 x}$ . فإذا كان $x \\in [\\frac{\\pi}{2}, \\pi]$ (الربع الثاني) فإن فاصلة النقطة سالبة ومنه نختار حتماً القيمة السالبة: $\\cos x = -\\sqrt{1 - \\sin^2 x}$ .'
		},
		practice: [
			{
				questionAr: 'التحويل بالراديان لقيس الزاوية $150^\\circ$ هو:',
				options: [
					'$\\frac{5\\pi}{6}\\text{ rad}$',
					'$\\frac{3\\pi}{4}\\text{ rad}$',
					'$\\frac{2\\pi}{3}\\text{ rad}$',
					'$\\frac{7\\pi}{6}\\text{ rad}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة وممتازة! $R = \\frac{150 \\times \\pi}{180} = \\frac{15\\pi}{18} = \\frac{5\\pi}{6}\\text{ rad}$ .',
					'خطأ: $\\frac{3\\pi}{4}\\text{ rad} = 135^\\circ$ .',
					'خطأ: $\\frac{2\\pi}{3}\\text{ rad} = 120^\\circ$ .',
					'خطأ: $\\frac{7\\pi}{6}\\text{ rad} = 210^\\circ$ .'
				],
				explanationAr: 'نطبق قانون التحويل من الدرجة إلى الراديان: $R = \\frac{D \\times \\pi}{180}$ . بالتعويض بـ $D = 150^\\circ$ نجد: $R = \\frac{150\\pi}{180}$ ، وبقسمة البسط والمقام على $30$ نحصل على: $R = \\frac{5\\pi}{6}\\text{ rad}$ .'
			},
			{
				questionAr: 'إذا كان $x \\in [\\frac{\\pi}{2}, \\pi]$ وكانت $\\sin x = \\frac{\\sqrt{3}}{2}$ ، فإن قيمة $\\cos x$ هي:',
				options: [
					'$\\cos x = \\frac{1}{2}$',
					'$\\cos x = -\\frac{1}{2}$',
					'$\\cos x = -\\frac{\\sqrt{3}}{2}$',
					'$\\cos x = 0$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الزاوية تقع في الربع الثاني $[\\pi/2, \\pi]$ حيث جيب التمام سالب تماماً وليس موجباً.',
					'إجابة صحيحة وممتازة! $\\cos^2 x = 1 - (\\sqrt{3}/2)^2 = 1 - 3/4 = 1/4$ . وبما أن $x$ في الربع الثاني فإن $\\cos x = -\\sqrt{1/4} = -1/2$ .',
					'خطأ: $\\frac{\\sqrt{3}}{2}$ هي قيمة الجيب $\\sin x$ .',
					'خطأ: $\\cos x = 0$ يحدث فقط عندما يكون $x = \\frac{\\pi}{2}$ وحينها $\\sin x = 1$ وليس $\\frac{\\sqrt{3}}{2}$ .'
				],
				explanationAr: 'نطبق $\\cos^2 x = 1 - \\sin^2 x = 1 - \\left(\\frac{\\sqrt{3}}{2}\\right)^2 = 1 - \\frac{3}{4} = \\frac{1}{4}$ . بما أن $x \\in [\\frac{\\pi}{2}, \\pi]$ (الربع الثاني) فإن فاصلة النقطة على الدائرة المثلثية سالبة، ومنه $\\cos x = -\\sqrt{\\frac{1}{4}} = -\\frac{1}{2}$ .'
			},
			{
				questionAr: 'القيمة العددية للعبارة $E = \\cos^2\\left(\\frac{\\pi}{8}\\right) + \\cos^2\\left(\\frac{3\\pi}{8}\\right)$ هي (علماً أن $\\frac{3\\pi}{8} = \\frac{\\pi}{2} - \\frac{\\pi}{8}$):',
				options: [
					'$0$',
					'$1$',
					'$\\frac{1}{2}$',
					'$2$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: مجموع مربعي عددين حقيقيين غير معدومين لا يمكن أن يساوي صفراً.',
					'إجابة صحيحة تماماً! بما أن $\\frac{3\\pi}{8} = \\frac{\\pi}{2} - \\frac{\\pi}{8}$ ، فإن $\\cos\\left(\\frac{3\\pi}{8}\\right) = \\sin\\left(\\frac{\\pi}{8}\\right)$ . ومنه $E = \\cos^2\\left(\\frac{\\pi}{8}\\right) + \\sin^2\\left(\\frac{\\pi}{8}\\right) = 1$ .',
					'خطأ: الحساب غير دقيق.',
					'خطأ: قيمة $\\cos^2 x + \\sin^2 x$ تساوي دائماً $1$ وليس $2$ .'
				],
				explanationAr: 'نعلم أن $\\cos\\left(\\frac{\\pi}{2} - \\alpha\\right) = \\sin\\alpha$ . بوضع $\\alpha = \\frac{\\pi}{8}$ نجد: $\\cos\\left(\\frac{3\\pi}{8}\\right) = \\cos\\left(\\frac{\\pi}{2} - \\frac{\\pi}{8}\\right) = \\sin\\left(\\frac{\\pi}{8}\\right)$ . بالتعويض في العبارة: $E = \\cos^2\\left(\\frac{\\pi}{8}\\right) + \\sin^2\\left(\\frac{\\pi}{8}\\right) = 1$ بتطبيق العلاقة الأساسية.'
			}
		]
	}
];
