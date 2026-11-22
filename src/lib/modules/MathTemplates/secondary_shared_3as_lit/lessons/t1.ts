import type { InteractiveLessonData, MathDomain } from '../../types';
import { svgCobwebSequencePlot, svgFunctionCurvePlot } from '../../svg-secondary';

type LessonWithDomain = InteractiveLessonData & { domain: MathDomain };

// ============================================================================
// Crisp Inline SVGs for 3AS Literary T1 (Arithmetic in Z & Sequences)
// ============================================================================

const svgEuclideanNegDivision = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 190" width="460" height="190" style="background:#ffffff;font-family:Arial,sans-serif">
  <rect x="8" y="8" width="444" height="174" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="230" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">القسمة الإقليدية في Z للعدد السالب a = -45 على b = 7</text>

  <!-- Number line -->
  <line x1="36" y1="92" x2="424" y2="92" stroke="#334155" stroke-width="1.8"/>
  <polygon points="428,92 420,88 420,96" fill="#334155"/>
  <!-- Ticks for -49, -45, -42, -35 -->
  <line x1="80" y1="84" x2="80" y2="100" stroke="#1d4ed8" stroke-width="2"/>
  <text x="80" y="116" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">-49 = 7(-7)</text>

  <circle cx="176" cy="92" r="5" fill="#dc2626"/>
  <text x="176" y="76" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#dc2626">a = -45</text>

  <line x1="248" y1="84" x2="248" y2="100" stroke="#64748b" stroke-width="1.8"/>
  <text x="248" y="116" text-anchor="middle" font-size="11" fill="#475569">-42 = 7(-6)</text>

  <line x1="392" y1="84" x2="392" y2="100" stroke="#64748b" stroke-width="1.5"/>
  <text x="392" y="116" text-anchor="middle" font-size="11" fill="#475569">-35 = 7(-5)</text>

  <!-- Positive remainder arc from -49 to -45 -->
  <path d="M 80 84 Q 128 52 176 84" fill="none" stroke="#15803d" stroke-width="2"/>
  <polygon points="176,84 167,81 171,74" fill="#15803d"/>
  <text x="128" y="56" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">+r = +4 (0 &lt;= r &lt; 7)</text>

  <!-- Bottom rule box -->
  <rect x="28" y="132" width="404" height="38" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
  <text x="230" y="150" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">-45 = 7(-6) - 3 = 7(-7) + 4  =&gt;  q = -7  ,  r = 4</text>
  <text x="230" y="165" text-anchor="middle" font-size="10.5" fill="#dc2626">الباقي r عدد طبيعي يحقق دوماً 0 &lt;= r &lt; |b|</text>
</svg>`;

const svgDivisorCombPipeline = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 190" width="460" height="190" style="background:#ffffff;font-family:Arial,sans-serif">
  <rect x="8" y="8" width="444" height="174" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="230" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">خاصية التركيبة الخطية لقواسم عددين في Z</text>

  <rect x="22" y="46" width="130" height="58" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.4"/>
  <text x="87" y="68" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1d4ed8">المعطى الأول</text>
  <text x="87" y="88" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">d يقسم a</text>

  <rect x="22" y="114" width="130" height="58" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.4"/>
  <text x="87" y="136" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1d4ed8">المعطى الثاني</text>
  <text x="87" y="156" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">d يقسم b</text>

  <line x1="152" y1="75" x2="198" y2="108" stroke="#475569" stroke-width="1.8"/>
  <line x1="152" y1="143" x2="198" y2="112" stroke="#475569" stroke-width="1.8"/>
  <polygon points="202,110 194,105 194,115" fill="#475569"/>

  <rect x="204" y="62" width="232" height="96" rx="6" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
  <text x="320" y="85" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#15803d">النتيجة لكل u, v من Z</text>
  <text x="320" y="110" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">d يقسم (u a + v b)</text>
  <text x="320" y="132" text-anchor="middle" font-size="10.5" fill="#334155">خاصة: d يقسم (a + b) و (a - b)</text>
  <text x="320" y="148" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">تُستثمر لحذف المتغير n في البكالوريا</text>
</svg>`;

const svgCongruenceClassesMod5 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 195" width="460" height="195" style="background:#ffffff;font-family:Arial,sans-serif">
  <rect x="8" y="8" width="444" height="179" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="230" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">توافق الأعداد الصحيحة بترديد n = 5 (نفس باقي القسمة على 5)</text>

  <rect x="20" y="44" width="76" height="92" rx="6" fill="#eff6ff" stroke="#2563eb"/>
  <text x="58" y="64" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1d4ed8">r = 0</text>
  <text x="58" y="86" text-anchor="middle" font-size="10.5" fill="#0f172a">..., -5, 0,</text>
  <text x="58" y="104" text-anchor="middle" font-size="10.5" fill="#0f172a">5, 10, 15</text>
  <text x="58" y="124" text-anchor="middle" font-size="9.5" fill="#15803d">مضاعفات 5</text>

  <rect x="106" y="44" width="76" height="92" rx="6" fill="#ffffff" stroke="#94a3b8"/>
  <text x="144" y="64" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">r = 1</text>
  <text x="144" y="86" text-anchor="middle" font-size="10.5" fill="#0f172a">..., -4, 1,</text>
  <text x="144" y="104" text-anchor="middle" font-size="10.5" fill="#0f172a">6, 11, 16</text>
  <text x="144" y="124" text-anchor="middle" font-size="9.5" fill="#64748b">5k + 1</text>

  <rect x="192" y="44" width="76" height="92" rx="6" fill="#ffffff" stroke="#94a3b8"/>
  <text x="230" y="64" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">r = 2</text>
  <text x="230" y="86" text-anchor="middle" font-size="10.5" fill="#0f172a">..., -3, 2,</text>
  <text x="230" y="104" text-anchor="middle" font-size="10.5" fill="#0f172a">7, 12, 17</text>
  <text x="230" y="124" text-anchor="middle" font-size="9.5" fill="#64748b">5k + 2</text>

  <rect x="278" y="44" width="76" height="92" rx="6" fill="#ffffff" stroke="#94a3b8"/>
  <text x="316" y="64" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">r = 3</text>
  <text x="316" y="86" text-anchor="middle" font-size="10.5" fill="#0f172a">..., -2, 3,</text>
  <text x="316" y="104" text-anchor="middle" font-size="10.5" fill="#0f172a">8, 13, 18</text>
  <text x="316" y="124" text-anchor="middle" font-size="9.5" fill="#64748b">5k + 3</text>

  <rect x="364" y="44" width="76" height="92" rx="6" fill="#fef2f2" stroke="#dc2626"/>
  <text x="402" y="64" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#dc2626">r = 4</text>
  <text x="402" y="86" text-anchor="middle" font-size="10.5" fill="#0f172a">..., -1, 4,</text>
  <text x="402" y="104" text-anchor="middle" font-size="10.5" fill="#0f172a">9, 14, 19</text>
  <text x="402" y="124" text-anchor="middle" font-size="9.5" fill="#dc2626">4 ≡ -1 [5]</text>

  <rect x="20" y="146" width="420" height="30" rx="5" fill="#f0fdf4" stroke="#86efac"/>
  <text x="230" y="165" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">a ≡ b [n]  &lt;=&gt;  (a - b) مضاعف لـ n  &lt;=&gt;  لـ a و b نفس الباقي على n</text>
</svg>`;

const svgCongruenceOpsDiagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 185" width="460" height="185" style="background:#ffffff;font-family:Arial,sans-serif">
  <rect x="8" y="8" width="444" height="169" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="230" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">تلاؤم الموافقة بترديد n مع الجمع والطرح والضرب والقوى</text>

  <rect x="20" y="42" width="420" height="34" rx="5" fill="#eff6ff" stroke="#93c5fd"/>
  <text x="230" y="63" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">الفرض: a ≡ r₁ [n]  و  b ≡ r₂ [n]</text>

  <rect x="20" y="88" width="132" height="74" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="86" y="108" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">الجمع والطرح</text>
  <text x="86" y="129" text-anchor="middle" font-size="10.5" fill="#0f172a">a + b ≡ r₁ + r₂ [n]</text>
  <text x="86" y="149" text-anchor="middle" font-size="10.5" fill="#0f172a">a - b ≡ r₁ - r₂ [n]</text>

  <rect x="164" y="88" width="132" height="74" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="230" y="108" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">الضرب في عدد أو جداء</text>
  <text x="230" y="129" text-anchor="middle" font-size="10.5" fill="#0f172a">k a ≡ k r₁ [n]</text>
  <text x="230" y="149" text-anchor="middle" font-size="10.5" fill="#0f172a">a b ≡ r₁ r₂ [n]</text>

  <rect x="308" y="88" width="132" height="74" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="374" y="108" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">الرفع إلى قوة k ∈ N*</text>
  <text x="374" y="129" text-anchor="middle" font-size="10.5" fill="#0f172a">a^k ≡ r₁^k [n]</text>
  <text x="374" y="149" text-anchor="middle" font-size="10" fill="#dc2626">تحقق دوماً 0 &lt;= r &lt; n</text>
</svg>`;

const svgPowerCycleMod7 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 210" width="460" height="210" style="background:#ffffff;font-family:Arial,sans-serif">
  <rect x="8" y="8" width="444" height="194" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="230" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">جدول دورية بواقي قوى العدد 3 بترديد 7 (الدور T = 6)</text>

  <rect x="22" y="42" width="416" height="80" rx="6" fill="#ffffff" stroke="#334155" stroke-width="1.3"/>
  <line x1="22" y1="82" x2="438" y2="82" stroke="#334155" stroke-width="1.2"/>
  <line x1="124" y1="42" x2="124" y2="122" stroke="#334155" stroke-width="1.3"/>
  <line x1="176" y1="42" x2="176" y2="122" stroke="#cbd5e1"/>
  <line x1="228" y1="42" x2="228" y2="122" stroke="#cbd5e1"/>
  <line x1="280" y1="42" x2="280" y2="122" stroke="#cbd5e1"/>
  <line x1="332" y1="42" x2="332" y2="122" stroke="#cbd5e1"/>
  <line x1="384" y1="42" x2="384" y2="122" stroke="#cbd5e1"/>

  <rect x="23" y="43" width="100" height="38" fill="#eff6ff"/>
  <text x="73" y="66" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">الأس n</text>
  <text x="150" y="66" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">6k</text>
  <text x="202" y="66" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">6k + 1</text>
  <text x="254" y="66" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">6k + 2</text>
  <text x="306" y="66" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">6k + 3</text>
  <text x="358" y="66" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">6k + 4</text>
  <text x="411" y="66" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">6k + 5</text>

  <rect x="23" y="83" width="100" height="38" fill="#f0fdf4"/>
  <text x="73" y="106" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">باقي 3^n على 7</text>
  <text x="150" y="106" text-anchor="middle" font-size="12" font-weight="bold" fill="#15803d">1</text>
  <text x="202" y="106" text-anchor="middle" font-size="12" font-weight="bold" fill="#1d4ed8">3</text>
  <text x="254" y="106" text-anchor="middle" font-size="12" font-weight="bold" fill="#1d4ed8">2</text>
  <text x="306" y="106" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">6</text>
  <text x="358" y="106" text-anchor="middle" font-size="12" font-weight="bold" fill="#1d4ed8">4</text>
  <text x="411" y="106" text-anchor="middle" font-size="12" font-weight="bold" fill="#1d4ed8">5</text>

  <rect x="22" y="134" width="416" height="54" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
  <text x="230" y="154" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">بما أن 3^6 ≡ 1 [7] فإن الدورة طولها 6: 3^(6k + r) ≡ 3^r [7]</text>
  <text x="230" y="174" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">مثال: 2026 ≡ 3 [7] و 2025 = 6 × 337 + 3  =&gt;  2026^2025 ≡ 3^3 ≡ 6 [7]</text>
</svg>`;

const svgArithmeticSeqSteps = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 195" width="460" height="195" style="background:#ffffff;font-family:Arial,sans-serif">
  <rect x="8" y="8" width="444" height="179" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="230" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">المتتالية الحسابية (u_n): الانتقال بإضافة الأساس الثابت r = +3</text>

  <circle cx="65" cy="96" r="20" fill="#dbeafe" stroke="#2563eb" stroke-width="1.8"/>
  <text x="65" y="101" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#1e3a8a">u₀=2</text>

  <circle cx="155" cy="96" r="20" fill="#dbeafe" stroke="#2563eb" stroke-width="1.8"/>
  <text x="155" y="101" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#1e3a8a">u₁=5</text>

  <circle cx="245" cy="96" r="20" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="245" y="101" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#15803d">u₂=8</text>

  <circle cx="335" cy="96" r="20" fill="#dbeafe" stroke="#2563eb" stroke-width="1.8"/>
  <text x="335" y="101" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#1e3a8a">u₃=11</text>

  <circle cx="415" cy="96" r="20" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.5"/>
  <text x="415" y="101" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1d4ed8">u_n</text>

  <path d="M 85 82 Q 110 56 135 82" fill="none" stroke="#dc2626" stroke-width="1.6"/>
  <text x="110" y="58" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">+3</text>
  <path d="M 175 82 Q 200 56 225 82" fill="none" stroke="#dc2626" stroke-width="1.6"/>
  <text x="200" y="58" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">+3</text>
  <path d="M 265 82 Q 290 56 315 82" fill="none" stroke="#dc2626" stroke-width="1.6"/>
  <text x="290" y="58" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">+3</text>

  <rect x="28" y="132" width="404" height="40" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
  <text x="230" y="150" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">الوسط الحسابي: u₁ + u₃ = 5 + 11 = 16 = 2 × 8 = 2u₂</text>
  <text x="230" y="166" text-anchor="middle" font-size="10.5" fill="#0f172a">الحد العام: u_n = u₀ + nr = 2 + 3n   |   المجموع: S_n = (n + 1)(u₀ + u_n) / 2</text>
</svg>`;

const RAW_LESSONS_3AS_LIT_T1: LessonWithDomain[] = [
	// =========================================================================
	// LESSON 1: EUCLIDEAN DIVISION IN Z, DIVISORS & MULTIPLES
	// =========================================================================
	{
		id: 'lesson_3as_shared_lit_t1_euclidean_division_divisors',
		slug: '3as-shared-lit-t1-euclidean-division-divisors',
		grade: '3as_lp',
		yearSubjectId: 768,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: القسمة الإقليدية والموافقات في Z',
		order: 1,
		domain: 'arithmetic_z',
		titleAr: 'القسمة الإقليدية في Z والقواسم والمضاعفات',
		objectives: [
			'التعرف على قابلية القسمة في مجموعة الأعداد الصحيحة Z وتوظيف خواص القواسم والمضاعفات',
			'إنجاز القسمة الإقليدية لعدد صحيح (موجب أو سالب) على عدد طبيعي غير معدوم بدقة مع احترام شرط الباقي 0 ≤ r < b',
			'تطبيق خاصية التركيبة الخطية للقواسم لتعيين قيم العدد الطبيعي n التي تجعل عبارة كسرية عدداً صحيحاً'
		],
		keywordsAr: [
			'القسمة الإقليدية في Z',
			'حاصل القسمة والباقي',
			'القواسم والمضاعفات',
			'التركيبة الخطية'
		],
		discover: {
			scenarioAr:
				'في أول محور من برنامج البكالوريا للشعب الأدبية، نتعامل مع الأعداد الصحيحة السالبة والموجبة في $\\mathbb{Z}$ . أخطأ تلميذ عند إنجاز القسمة الإقليدية للعدد السالب $a = -45$ على $b = 7$ فكتب $-45 = 7(-6) - 3$ وقال إن الباقي هو $-3$ ! لنصحح هذا الخطأ المنهجي ونكتشف شروط القسمة الإقليدية الصحيحة في $\\mathbb{Z}$ .',
			svg: svgEuclideanNegDivision,
			steps: [
				{
					promptAr:
						'لماذا تُعد الكتابة $-45 = 7(-6) - 3$ غير صالحة كقسمة إقليدية للعدد $-45$ على $7$ ؟ ما هو الشرط اللازم على الباقي $r$ في القسمة على $b = 7$ ؟',
					hintAr: 'يجب أن يكون الباقي $r$ عدداً طبيعياً محصوراً بين $0$ و $b - 1$ .',
					expectedInput: '0 <= r < 7',
					revealAr:
						'في القسمة الإقليدية على عدد طبيعي $b > 0$ ، يُشترط دوماً أن يكون الباقي **موجباً أو معدوماً** وأصغر تماماً من القاسم: $0 \\le r < 7$ . القيمة $-3$ سالبة، لذا فهي مرفوضة تماماً كباقٍ!'
				},
				{
					promptAr:
						'نطرح $7$ ونضيف $7$ في العبارة: $-45 = 7(-6) - 7 + 7 - 3 = 7(-6 - 1) + (7 - 3)$ . ما هو الباقي الصحيح $r$ ؟',
					hintAr: 'احسب $7 - 3$ وتأكد أنه يحقق $0 \\le r < 7$ .',
					expectedInput: '4',
					revealAr:
						'نجد $-45 = 7(-7) + 4$ ، حيث $0 \\le 4 < 7$ . إذن حاصل القسمة الإقليدية هو $q = -7$ والباقي الصحيح هو $r = 4$ .'
				},
				{
					promptAr:
						'أوجد جميع القواسم الطبيعية الموجبة للعدد $12$ ، ثم استنتج عددها الإجمالي.',
					hintAr: 'ابحث عن كل عدد طبيعي $d \\ge 1$ يقسم $12$ دون باقٍ ($1, 2, 3, \\dots$).',
					expectedInput: '6',
					revealAr:
						'القواسم الموجبة للعدد $12$ هي $\\{1, 2, 3, 4, 6, 12\\}$ ، وعددها $6$ قواسم موجبة (وبإدراج القواسم السالبة في $\\mathbb{Z}$ نضيف $\\{-1, -2, -3, -4, -6, -12\\}$).'
				}
			]
		},
		summary: {
			rulesAr: [
				'**قابلية القسمة في $\\mathbb{Z}$**: ليكن $a$ و $b$ عددين صحيحين مع $b \\ne 0$ . نقول إن $b$ يقسم $a$ (ونكتب $b \\mid a$) أو أن $a$ مضاعف لـ $b$ إذا وفقط إذا وُجد عدد صحيح $k \\in \\mathbb{Z}$ يحقق $a = kb$ .',
				'**خواص القواسم في $\\mathbb{Z}$**:\n- إذا كان $d \\mid a$ و $a \\mid c$ فإن $d \\mid c$ (التعدي).\n- **خاصية التركيبة الخطية**: إذا كان $d \\mid a$ و $d \\mid b$ فإنه من أجل كل عددين صحيحين $u, v \\in \\mathbb{Z}$ يكون $d \\mid (ua + vb)$ ، وبصفة خاصة $d \\mid (a + b)$ و $d \\mid (a - b)$ .',
				'**مبرهنة القسمة الإقليدية في $\\mathbb{Z}$**: من أجل كل عدد صحيح $a \\in \\mathbb{Z}$ وكل عدد طبيعي غير معدوم $b \\in \\mathbb{N}^*$ ، توجد ثنائية **وحيدة** $(q, r) \\in \\mathbb{Z} \\times \\mathbb{N}$ تحقق:\n$$a = bq + r \\quad \\text{مع} \\quad 0 \\le r < b$$\nيسمى $q$ حاصل القسمة ويسمى $r$ باقي القسمة الإقليدية لـ $a$ على $b$ .',
				'**قاعدة قسمة عدد صحيح سالب**: إذا كانت القسمة الإقليدية للعدد الموجب $A > 0$ على $b$ هي $A = bq + r$ مع $0 < r < b$ ، فإن:\n$$-A = b(-q) - r = b(-q - 1) + (b - r)$$\nوبالتالي حاصل قسمة $-A$ على $b$ هو $(-q - 1)$ والباقي هو $(b - r)$ . أما إذا كان $r = 0$ فالحاصل هو $-q$ والباقي $0$ .'
			],
			visualSvg: svgDivisorCombPipeline,
			visualCaptionAr: 'استثمار خاصية التركيبة الخطية للقواسم لتبسيط شروط قابلية القسمة في البكالوريا',
			examples: [
				{
					problemAr:
						'أنجز القسمة الإقليدية لكل من العددين $2026$ و $-2026$ على العدد $9$ .',
					solutionAr:
						'1) نقسم $2026$ على $9$ : لدينا $9 \\times 225 = 2025$ ، إذن:\n$$2026 = 9 \\times 225 + 1 \\quad (0 \\le 1 < 9)$$\nفالحاصل هو $q = 225$ والباقي هو $r = 1$ .\n\n2) بالنسبة إلى $-2026$ : نضرب المساواة في $-1$ فنجد $-2026 = 9(-225) - 1$ . ولكي نجعل الباقي موجباً وأصغر من $9$ نطرح $9$ ونضيف $9$ :\n$$-2026 = 9(-225 - 1) + (9 - 1) = 9(-226) + 8 \\quad (0 \\le 8 < 9)$$\nإذن حاصل قسمة $-2026$ على $9$ هو $q\' = -226$ والباقي هو $r\' = 8$ .'
				},
				{
					problemAr:
						'عيّن جميع قيم العدد الطبيعي $n$ التي يكون من أجلها الكسر $\\frac{3n + 11}{n + 2}$ عدداً طبيعياً.',
					solutionAr:
						'يكون $\\frac{3n + 11}{n + 2} \\in \\mathbb{N}$ إذا وفقط إذا كان $(n + 2)$ يقسم $(3n + 11)$ (مع $n + 2 > 0$ دوماً لأن $n \\in \\mathbb{N}$).\nنحاول إظهار $(n + 2)$ في البسط:\n$$3n + 11 = 3(n + 2) + 5$$\nومنه:\n$$\\frac{3n + 11}{n + 2} = 3 + \\frac{5}{n + 2}$$\nإذن $(n + 2)$ يقسم $(3n + 11)$ إذا وفقط إذا كان $(n + 2)$ يقسم $5$ . القواسم الطبيعية للعدد الأولي $5$ هي $1$ و $5$ .\n- حالة $n + 2 = 1 \\implies n = -1 \\notin \\mathbb{N}$ (مرفوض).\n- حالة $n + 2 = 5 \\implies n = 3 \\in \\mathbb{N}$ (مقبول، والنتيجة $\\frac{20}{5} = 4 \\in \\mathbb{N}$).\nومنه القيمة الوحيدة هي $n = 3$ .'
				}
			],
			watchOutAr:
				'أكبر خطأ يقع فيه مترشحو الشعب الأدبية في البكالوريا هو قبول باقٍ سالب أو باقٍ أكبر من القاسم! تذكّر دوماً: إذا قُسم $-38$ على $5$ ، فليست الإجابة $r = -3$ بل $r = 5 - 3 = 2$ لأن $-38 = 5(-8) + 2$ . كما أن $0$ مضاعف لكل عدد صحيح غير معدوم، بينما $0$ لا يقسم أي عدد.'
		},
		practice: [
			{
				questionAr:
					'ما هما حاصل القسمة $q$ وباقي القسمة الإقليدية $r$ للعدد الصحيح $-53$ على $6$ في $\\mathbb{Z}$ ؟',
				options: [
					'$q = -8$ و $r = -5$',
					'$q = -9$ و $r = 1$',
					'$q = -8$ و $r = 5$',
					'$q = -9$ و $r = 5$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الباقي $-5$ سالب ومرفوض في القسمة الإقليدية لأن الشرط هو $0 \\le r < 6$ .',
					'إجابة صحيحة وممتازة! $6(-9) + 1 = -54 + 1 = -53$ مع $0 \\le 1 < 6$ .',
					'خطأ حسابي: $6(-8) + 5 = -48 + 5 = -43 \\ne -53$ .',
					'خطأ حسابي: $6(-9) + 5 = -54 + 5 = -49 \\ne -53$ .'
				],
				explanationAr:
					'نعلم أن $53 = 6 \\times 8 + 5$ ، ومنه $-53 = 6(-8) - 5 = 6(-8 - 1) + (6 - 5) = 6(-9) + 1$ . وبما أن $0 \\le 1 < 6$ فإن $q = -9$ و $r = 1$ .'
			},
			{
				questionAr:
					'ما هو باقي القسمة الإقليدية للعدد $2027$ على $7$ ؟',
				options: [
					'$2$',
					'$3$',
					'$4$',
					'$5$'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'راجع عملية القسمة: $7 \\times 289 = 2023$ وليس $2025$ .',
					'راجع الطرح: $2027 - 2023 = 4$ وليس $3$ .',
					'إجابة صحيحة! $2027 = 7 \\times 289 + 4$ مع $0 \\le 4 < 7$ .',
					'خطأ: $2023 + 5 = 2028 \\ne 2027$ .'
				],
				explanationAr:
					'بقسمة $2027$ على $7$ نجد: $7 \\times 289 = 2023$ و $2027 - 2023 = 4$ ، إذن $2027 = 7 \\times 289 + 4$ والباقي هو $4$ .'
			},
			{
				questionAr:
					'ما هي جميع قيم العدد الطبيعي $n$ التي تجعل $(n + 1)$ قاسماً للعدد $(2n + 8)$ ؟',
				options: [
					'$n \\in \\{0, 1, 2, 5\\}$',
					'$n \\in \\{1, 2, 5\\}$',
					'$n \\in \\{0, 2, 5\\}$',
					'$n \\in \\{1, 3, 6\\}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة دقيقة! $2n + 8 = 2(n + 1) + 6$ ، فقواسم $6$ هي $1, 2, 3, 6$ مما يعطي $n \\in \\{0, 1, 2, 5\\}$ .',
					'نسيت القاسم $1$ : عندما $n + 1 = 1$ يكون $n = 0 \\in \\mathbb{N}$ وهو حل مقبول!',
					'أغفلت القاسم $2$ الموافق لـ $n + 1 = 2 \\implies n = 1$ .',
					'نسيت طرح $1$ من قواسم العدد $6$ عند حل $n + 1 = d$ .'
				],
				explanationAr:
					'نكتب $2n + 8 = 2(n + 1) + 6$ . إذن $(n + 1) \\mid (2n + 8) \\iff (n + 1) \\mid 6$ . القواسم الموجبة للعدد $6$ هي $1, 2, 3, 6$ ، وبوضع $n + 1 \\in \\{1, 2, 3, 6\\}$ نجد $n \\in \\{0, 1, 2, 5\\}$ .'
			}
		]
	},

	// =========================================================================
	// LESSON 2: CONGRUENCES MODULO n IN Z & PROPERTIES
	// =========================================================================
	{
		id: 'lesson_3as_shared_lit_t1_congruences_mod_n',
		slug: '3as-shared-lit-t1-congruences-mod-n',
		grade: '3as_lp',
		yearSubjectId: 768,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: القسمة الإقليدية والموافقات في Z',
		order: 2,
		domain: 'arithmetic_z',
		titleAr: 'الموافقات بترديد n في Z وخصائصها (التوافق، الجمع، الضرب، القوى)',
		objectives: [
			'فهم تعريف الموافقة بترديد n في Z والربط بين الموافقة وباقي القسمة الإقليدية',
			'إتقان خصائص الموافقة: الانعكاس، التناظر، التعدي، والتلاؤم مع الجمع والطرح والضرب والقوى',
			'حساب بواقي عبارات جبرية مثل a + b و a - b و ka + mb و a^2 + b^2 بترديد n وإثبات قابلية القسمة'
		],
		keywordsAr: [
			'الموافقة بترديد n',
			'التلاؤم مع العمليات',
			'باقي القسمة',
			'قابلية القسمة بالموافقات'
		],
		discover: {
			scenarioAr:
				'نعتبر العددين الصحيحين $a = 2026$ و $b = 1447$ ، ونريد معرفة باقي قسمة المجموع $a + b$ وباقي قسمة الجداء $a \\times b$ وباقي قسمة $a^2 - b^2$ على $5$ دون إجراء حسابات ضخمة! تتيح لنا **الموافقات بترديد $n$** استبدال الأعداد الكبيرة ببواقيها البسيطة.',
			svg: svgCongruenceClassesMod5,
			steps: [
				{
					promptAr:
						'أوجد باقي قسمة كل من $a = 2026$ و $b = 1447$ على $5$ ، واكتبهما بلغة الموافقات بترديد $5$ . ما قيمة باقي $b$ على $5$ ؟',
					hintAr: 'راقب رقم الآحاد في النظام العشري لتحديد الباقي على $5$ بسرعة.',
					expectedInput: '2',
					revealAr:
						'لدينا $2026 = 5 \\times 405 + 1$ إذن $2026 \\equiv 1 \\pmod{5}$ . ولدينا $1447 = 5 \\times 289 + 2$ إذن $1447 \\equiv 2 \\pmod{5}$ .'
				},
				{
					promptAr:
						'بتعويض $a$ و $b$ ببواقيهما بترديد $5$ ، استنتج باقي قسمة العبارة $3a + 2b$ على $5$ .',
					hintAr: 'احسب $3(1) + 2(2) = 7$ ثم خذ باقي قسمة $7$ على $5$ .',
					expectedInput: '2',
					revealAr:
						'من خصائص التلاؤم مع الضرب والجمع: $3a + 2b \\equiv 3(1) + 2(2) = 7 \\equiv 2 \\pmod{5}$ . وبما أن $0 \\le 2 < 5$ فإن الباقي هو $2$ .'
				},
				{
					promptAr:
						'ما هو باقي قسمة العبارة $a^3 - b^2$ على $5$ ؟ (انتبه: إذا طلع الناتج سالباً، أضف مضاعفاً مناسباً لـ $5$).',
					hintAr: 'احسب $1^3 - 2^2 = 1 - 4 = -3$ ثم أضف $5$ للحصول على باقٍ في $\\{0, 1, 2, 3, 4\\}$ .',
					expectedInput: '2',
					revealAr:
						'لدينا $a^3 \\equiv 1^3 = 1 \\pmod{5}$ و $b^2 \\equiv 2^2 = 4 \\pmod{5}$ ، إذن $a^3 - b^2 \\equiv 1 - 4 = -3 \\equiv -3 + 5 = 2 \\pmod{5}$ . الباقي هو $2$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**تعريف الموافقة بترديد $n$**: ليكن $n$ عدداً طبيعياً غير معدوم ($n \\ge 2$)، وليكن $a, b \\in \\mathbb{Z}$ . نقول إن $a$ يوافق $b$ بترديد $n$ ونكتب $a \\equiv b \\pmod{n}$ (أو $a \\equiv b\\ [n]$) إذا وفقط إذا كان للعددين $a$ و $b$ **نفس باقي القسمة الإقليدية على $n$**، وهو ما يكافئ أن الفرق $(a - b)$ مضاعف للعدد $n$ (أي $n \\mid (a - b)$).\n- بصفة خاصة: $a \\equiv 0 \\pmod{n} \\iff n \\mid a$ ($a$ يقبل القسمة على $n$).',
				'**الخصائص الأساسية للموافقة**: من أجل كل $a, b, c \\in \\mathbb{Z}$ :\n- **الانعكاس**: $a \\equiv a \\pmod{n}$ .\n- **التناظر**: إذا كان $a \\equiv b \\pmod{n}$ فإن $b \\equiv a \\pmod{n}$ .\n- **التعدي**: إذا كان $a \\equiv b \\pmod{n}$ و $b \\equiv c \\pmod{n}$ فإن $a \\equiv c \\pmod{n}$ .',
				'**التلاؤم مع العمليات (الجمع، الطرح، الضرب، القوى)**: إذا كان $a \\equiv b \\pmod{n}$ و $c \\equiv d \\pmod{n}$ فإنه:\n- $a + c \\equiv b + d \\pmod{n}$ و $a - c \\equiv b - d \\pmod{n}$\n- $ac \\equiv bd \\pmod{n}$ ، ومن أجل كل $k \\in \\mathbb{Z}$ : $ka \\equiv kb \\pmod{n}$\n- **القوى**: من أجل كل عدد طبيعي غير معدوم $p \\in \\mathbb{N}^*$ : $a^p \\equiv b^p \\pmod{n}$ .',
				'**التحويل إلى باقٍ موجب**: إذا وجدنا $E \\equiv -k \\pmod{n}$ مع $0 < k < n$ ، نضيف $n$ فنجد الباقي الموجب $(n - k)$ لأن $n \\equiv 0 \\pmod{n}$ . مثلاً $6 \\equiv -1 \\pmod{7}$ تعني أن استبدال $6$ بـ $-1$ يبسّط حساب القوى الزوجية والفردية كثيراً!'
			],
			visualSvg: svgCongruenceOpsDiagram,
			visualCaptionAr: 'خصائص التلاؤم للموافقات بترديد n التي تجيز تعويض أي عدد بباقيه الموجب أو السالب المكافئ',
			examples: [
				{
					problemAr:
						'ليكن $a = 1429$ و $b = 2025$ . عيّن باقي قسمة كل من $a$ و $b$ على $7$ ، ثم بيّن أن العدد $a^2 + 3b - 2$ يقبل القسمة على $7$ .',
					solutionAr:
						'1) بالقسمة الإقليدية على $7$ :\n- $1429 = 7 \\times 204 + 1 \\implies a \\equiv 1 \\pmod{7}$ .\n- $2025 = 7 \\times 289 + 2 \\implies b \\equiv 2 \\pmod{7}$ .\n2) نحسب الموافقة بترديد $7$ :\n$$a^2 + 3b - 2 \\equiv 1^2 + 3(2) - 2 = 1 + 6 - 2 = 5 \\pmod{7}$$\n(نلاحظ أن $5 \\not\\equiv 0 \\pmod{7}$ فلا يقبل القسمة على $7$ ، بينما $a^2 + 3b + 2 \\equiv 1 + 6 + 2 = 9 \\equiv 2 \\pmod{7}$ و $a^2 + 3b - 5 \\equiv 0 \\pmod{7}$ — لو كانت العبارة $a^2 + 3b - 5$ لكانت تقبل القسمة على $7$ !).'
				},
				{
					problemAr:
						'بيّن أن العدد $A = 2026^2 + 2026 + 4$ يقبل القسمة على $6$ .',
					solutionAr:
						'نقسم $2026$ على $6$ : لدينا $2026 = 6 \\times 337 + 4$ ، إذن $2026 \\equiv 4 \\pmod{6}$ (أو $2026 \\equiv -2 \\pmod{6}$).\nباستعمال التلاؤم مع القوى والجمع:\n$$A \\equiv 4^2 + 4 + 4 = 16 + 8 = 24 \\pmod{6}$$\nوبما أن $24 = 6 \\times 4$ فإن $24 \\equiv 0 \\pmod{6}$ ، ومنه $A \\equiv 0 \\pmod{6}$ أي أن $A$ يقبل القسمة على $6$ .'
				}
			],
			watchOutAr:
				'احذر خدعة شائعة جداً: **لا نختزل في الموافقات بالقسمة كما في المعادلات العادية!** مثلاً $2 \\times 4 \\equiv 2 \\times 1 \\pmod{6}$ صحيحة (لأن $8 \\equiv 2 \\pmod{6}$)، لكن اختزال العدد $2$ يعطي $4 \\equiv 1 \\pmod{6}$ وهي عبارة خاطئة! وكذلك: لا تقبل عدداً سالباً أو عدداً $\\ge n$ كباقي قسمة إقليدية نهائي، بل أضف أو اطرح مضاعفات $n$ حتى يقع الباقي في $\\{0, 1, \\dots, n - 1\\}$ .'
		},
		practice: [
			{
				questionAr:
					'إذا كان $a \\equiv 2 \\pmod{7}$ و $b \\equiv 5 \\pmod{7}$ ، فما هو باقي القسمة الإقليدية للعدد $a - b$ على $7$ ؟',
				options: [
					'$-3$',
					'$3$',
					'$4$',
					'$1$'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'الباقي في القسمة الإقليدية يجب أن يكون موجباً أو معدوماً: أضف $7$ إلى $-3$ .',
					'خطأ: حسبت $b - a = 3$ بدلاً من $a - b = -3$ .',
					'إجابة صحيحة! $a - b \\equiv 2 - 5 = -3 \\equiv -3 + 7 = 4 \\pmod{7}$ ، إذن الباقي هو $4$ .',
					'راجع عملية الطرح بترديد $7$ .'
				],
				explanationAr:
					'لدينا $a - b \\equiv 2 - 5 = -3 \\pmod{7}$ . وبما أن $7 \\equiv 0 \\pmod{7}$ نضيف $7$ فنجد $-3 + 7 = 4$ ، وهو يحقق $0 \\le 4 < 7$ ، فباقي القسمة الإقليدية هو $4$ .'
			},
			{
				questionAr:
					'إذا كان $x \\equiv 3 \\pmod{5}$ ، فما هو باقي قسمة العدد $x^2 + 2x + 4$ على $5$ ؟',
				options: [
					'$0$',
					'$4$',
					'$2$',
					'$1$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'تحقق من الحساب: $3^2 + 2(3) + 4 = 9 + 6 + 4 = 19$ وليس $20$ .',
					'إجابة صحيحة! $x^2 + 2x + 4 \\equiv 9 + 6 + 4 = 19 \\equiv 4 \\pmod{5}$ .',
					'تحقق من باقي قسمة $19$ على $5$ ($19 = 5 \\times 3 + 4$).',
					'خطأ في الحساب: عوض $x$ بـ $3$ ثم اقسم على $5$ .'
				],
				explanationAr:
					'بتعويض $x$ بـ $3$ بترديد $5$ نجد: $x^2 + 2x + 4 \\equiv 3^2 + 2(3) + 4 = 9 + 6 + 4 = 19 \\pmod{5}$ . وبما أن $19 = 5 \\times 3 + 4$ فإن الباقي هو $4$ .'
			},
			{
				questionAr:
					'من أجل $a \\equiv 4 \\pmod{9}$ و $b \\equiv 7 \\pmod{9}$ ، ما قيمة العدد الطبيعي $c \\in \\{0, 1, \\dots, 8\\}$ حتى يقبل العدد $2a + b + c$ القسمة على $9$ ؟',
				options: [
					'$c = 3$',
					'$c = 6$',
					'$c = 5$',
					'$c = 4$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $2(4) + 7 = 15 \\equiv 6 \\pmod{9}$ ، إذن $6 + c \\equiv 0 \\pmod{9} \\implies c = 3$ .',
					'$6$ هو باقي $2a + b$ على $9$ ، وليس القيمة المتممة $c$ التي تجعل المجموع يقبل القسمة على $9$ !',
					'تحقق: $15 + 5 = 20$ لا يقبل القسمة على $9$ .',
					'تحقق: $15 + 4 = 19$ لا يقبل القسمة على $9$ .'
				],
				explanationAr:
					'لدينا $2a + b \\equiv 2(4) + 7 = 15 \\equiv 6 \\pmod{9}$ . لكي يكون $2a + b + c \\equiv 0 \\pmod{9}$ يجب أن يكون $6 + c \\equiv 0 \\pmod{9}$ ، وبما أن $0 \\le c < 9$ نجد $c = 3$ .'
			}
		]
	},

	// =========================================================================
	// LESSON 3: POWER REMAINDERS CYCLES & LINEAR CONGRUENCE EQUATIONS
	// =========================================================================
	{
		id: 'lesson_3as_shared_lit_t1_power_remainders_congruence_equations',
		slug: '3as-shared-lit-t1-power-remainders-congruence-equations',
		grade: '3as_lp',
		yearSubjectId: 768,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: القسمة الإقليدية والموافقات في Z',
		order: 3,
		domain: 'arithmetic_z',
		titleAr: 'دراسة بواقي القسمة لقوى عدد طبيعي a^n ≡ r (mod m) وحل معادلات من الشكل ax + b ≡ c (mod n)',
		objectives: [
			'استكشاف دورية بواقي قسمة قوى عدد طبيعي a^n على m وتعيين دور البواقي بدقة',
			'حساب باقي قسمة قوى ذات أسس كبيرة (مثل 2026^2025) على m باستغلال الدورية',
			'تعيين قيم العدد الطبيعي n التي تحقق معادلة أو موافقة تتضمن قوى a^n',
			'حل معادلات الموافقة الخطية من الشكل ax + b ≡ c (mod n) في مجموعة الأعداد الصحيحة Z'
		],
		keywordsAr: [
			'دورية بواقي القوى',
			'قوى ذات أس كبير',
			'حل معادلة موافقة',
			'جدول البواقي'
		],
		discover: {
			scenarioAr:
				'يُعد سؤال «ادرس تبعاً لقيم العدد الطبيعي $n$ بواقي قسمة $a^n$ على $m$ ثم استنتج باقي قسمة عدد مثل $2026^{2025}$» التمرين الكلاسيكي الأول في بكالوريا الآداب واللغات! لنكتشف سر **دورية البواقي** انطلاقاً من جدول بواقي $3^n$ بترديد $7$ ، ثم نتدرب على حل المعادلات في $\\mathbb{Z}$ .',
			svg: svgPowerCycleMod7,
			steps: [
				{
					promptAr:
						'احسب بالتتابع بواقي $3^0, 3^1, 3^2, 3^3, 3^4, 3^5, 3^6$ بترديد $7$ . ما هو أصغر أس طبيعي غير معدوم $p$ يحقق $3^p \\equiv 1 \\pmod{7}$ ؟',
					hintAr: 'اقسم $1, 3, 9, 27, 81, 243, 729$ بترديد $7$ باستعمال ضرب الباقي السابق في $3$ كل مرة.',
					expectedInput: '6',
					revealAr:
						'نجد: $3^0 \\equiv 1$ ، $3^1 \\equiv 3$ ، $3^2 \\equiv 2$ ، $3^3 \\equiv 6$ ، $3^4 \\equiv 4$ ، $3^5 \\equiv 5$ ، ثم $3^6 \\equiv 5 \\times 3 = 15 \\equiv 1 \\pmod{7}$ . إذن أصغر أس هو $p = 6$ وهو **دور** البواقي.'
				},
				{
					promptAr:
						'باستعمال $2026 \\equiv 3 \\pmod{7}$ ودورية القوى $p = 6$ ، ما هو باقي قسمة $2026^{2025}$ على $7$ ؟',
					hintAr: 'اقسم الأس $2025$ على الدور $6$ : $2025 = 6 \\times 337 + 3$ ، ثم عوض في $3^3$ بترديد $7$ .',
					expectedInput: '6',
					revealAr:
						'لدينا $2026^{2025} \\equiv 3^{2025} \\pmod{7}$ . وبما أن $2025 = 6 \\times 337 + 3$ فإن:\n$$3^{2025} = (3^6)^{337} \\times 3^3 \\equiv 1^{337} \\times 3^3 = 27 \\equiv 6 \\pmod{7}$$\nفالباقي هو $6$ .'
				},
				{
					promptAr:
						'نريد حل المعادلة $3x + 2 \\equiv 4 \\pmod{5}$ في $\\mathbb{Z}$ . اختبر بواقي $x \\in \\{0, 1, 2, 3, 4\\}$ بترديد $5$ ، وعين قيمة الباقي $x_0$ الذي يحقق المعادلة.',
					hintAr: 'تبسّط المعادلة إلى $3x \\equiv 2 \\pmod{5}$ ، جرّب $x = 0, 1, 2, 3, 4$ .',
					expectedInput: '4',
					revealAr:
						'بتعويض القيم: من أجل $x = 4$ نجد $3(4) + 2 = 14 \\equiv 4 \\pmod{5}$ (لأن $14 - 4 = 10$ مضاعف لـ $5$). إذن $x \\equiv 4 \\pmod{5}$ ، ومجموعة الحلول في $\\mathbb{Z}$ هي $x = 5k + 4$ مع $k \\in \\mathbb{Z}$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**منهجية دراسة بواقي $a^n$ بترديد $m$**:\n1) نحسب بواقي $a^0, a^1, a^2, \\dots$ بترديد $m$ حتى نصل إلى أول أس $p \\ge 1$ يحقق $a^p \\equiv 1 \\pmod{m}$ (إذا كان $a$ و $m$ أوليين فيما بينهما).\n2) نستنتج أن البواقي تتكرر بدور يساوي $p$ : من أجل كل $k \\in \\mathbb{N}$ وكل $r \\in \\{0, 1, \\dots, p - 1\\}$ لدينا:\n$$a^{pk + r} = (a^p)^k \\cdot a^r \\equiv 1^k \\cdot a^r \\equiv a^r \\pmod{m}$$',
				'**حساب باقي قوة كبيرة $A^E$ بترديد $m$**:\n- **الخطوة 1**: نختزل **الأساس** $A$ بقسمته على $m$ : $A \\equiv r_A \\pmod{m}$ ، ومنه $A^E \\equiv r_A^E \\pmod{m}$ .\n- **الخطوة 2**: نختزل **الأس** $E$ بقسمته على **الدور $p$** (وليس على $m$!): $E = p q + s$ مع $0 \\le s < p$ ، ومنه $A^E \\equiv r_A^s \\pmod{m}$ .',
				'**حل معادلة الموافقة $ax + b \\equiv c \\pmod{n}$ في $\\mathbb{Z}$**:\n- ننقل $b$ إلى الطرف الثاني: $ax \\equiv c - b \\pmod{n}$ ونبسّط الطرف الأيمن ليصبح باقياً في $\\{0, \\dots, n - 1\\}$ .\n- الطريقة المضمونة في بكالوريا الشعب الأدبية هي **إنشاء جدول البواقي** لجميع القيم الممكنة لـ $x \\in \\{0, 1, \\dots, n - 1\\}$ بترديد $n$ ، ثم قراءة القيم الموافقة، وكتابة الحل على الشكل $x = n k + x_0$ ($k \\in \\mathbb{Z}$).'
			],
			visualSvg: svgPowerCycleMod7,
			visualCaptionAr: 'دورة البواقي الستة لـ 3^n بترديد 7 وكيفية اختزال الأس على الدور 6',
			examples: [
				{
					problemAr:
						'1) ادرس تبعاً لقيم العدد الطبيعي $n$ بواقي قسمة $2^n$ على $5$ .\n2) عيّن قيم العدد الطبيعي $n$ التي تجعل العدد $2^n + 3$ يقبل القسمة على $5$ .',
					solutionAr:
						'1) نحسب بواقي $2^n$ بترديد $5$ :\n- $2^0 \\equiv 1 \\pmod{5}$\n- $2^1 \\equiv 2 \\pmod{5}$\n- $2^2 \\equiv 4 \\pmod{5}$\n- $2^3 = 8 \\equiv 3 \\pmod{5}$\n- $2^4 = 16 \\equiv 1 \\pmod{5}$\nإذن دور البواقي هو $p = 4$ ، والبواقي الدورية للأسس $4k, 4k+1, 4k+2, 4k+3$ هي على الترتيب: $1, 2, 4, 3$ .\n\n2) يكون $2^n + 3$ قابلاً للقسمة على $5$ إذا وفقط إذا كان $2^n + 3 \\equiv 0 \\pmod{5} \\iff 2^n \\equiv -3 \\equiv 2 \\pmod{5}$ .\nمن جدول البواقي، نلاحظ أن الباقي $2$ يتحقق فقط عندما يكون $n = 4k + 1$ ($k \\in \\mathbb{N}$).'
				},
				{
					problemAr:
						'حل في $\\mathbb{Z}$ المعادلة: $4x - 1 \\equiv 2 \\pmod{7}$ .',
					solutionAr:
						'تكافئ المعادلة $4x \\equiv 3 \\pmod{7}$ . ننشئ جدول البواقي بترديد $7$ :\n- $x \\equiv 0 \\implies 4x \\equiv 0$\n- $x \\equiv 1 \\implies 4x \\equiv 4$\n- $x \\equiv 2 \\implies 4x \\equiv 8 \\equiv 1$\n- $x \\equiv 3 \\implies 4x \\equiv 12 \\equiv 5$\n- $x \\equiv 4 \\implies 4x \\equiv 16 \\equiv 2$\n- $x \\equiv 5 \\implies 4x \\equiv 20 \\equiv 6$\n- $x \\equiv 6 \\implies 4x \\equiv 24 \\equiv 3 \\pmod{7}$\nنلاحظ أن الحل الوحيد بترديد $7$ هو $x \\equiv 6 \\pmod{7}$ ، إذن مجموعة الحلول هي $S = \\{7k + 6 \\mid k \\in \\mathbb{Z}\\}$ .'
				}
			],
			watchOutAr:
				'الخطأ القاتل في هذا الدرس هو **قسمة الأس $E$ على الترديد $m$ بدلاً من قسمته على الدور $p$**! مثلاً لحساب باقي $3^{2025}$ على $7$ ، نقسم الأس $2025$ على الدور $p = 6$ وليس على $7$ . تذكر دوماً: الأساس يُختزل بترديد $m$ ، أما الأس فيُختزل بترديد الدور $p$ .'
		},
		practice: [
			{
				questionAr:
					'ما هو باقي القسمة الإقليدية للعدد $3^{100}$ على $5$ (علماً أن $3^4 \\equiv 1 \\pmod{5}$)؟',
				options: [
					'$1$',
					'$3$',
					'$4$',
					'$2$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $100 = 4 \\times 25 + 0$ ، إذن $3^{100} = (3^4)^{25} \\equiv 1^{25} = 1 \\pmod{5}$ .',
					'انتبه: الأس $100$ مضاعف للعدد $4$ وليس $4k + 1$ .',
					'خطأ: باقي $3^2$ هو $4$ ، بينما $100$ يقبل القسمة على $4$ .',
					'خطأ: باقي $3^3$ هو $2$ بترديد $5$ .'
				],
				explanationAr:
					'الدور هو $4$ لأن $3^4 = 81 \\equiv 1 \\pmod{5}$ . بما أن $100 = 4 \\times 25 + 0$ فإن $3^{100} = (3^4)^{25} \\equiv 1^{25} \\equiv 1 \\pmod{5}$ .'
			},
			{
				questionAr:
					'أيّ قيم للعدد الطبيعي $n$ تجعل العدد $5^n + 2$ قابلاً للقسمة على $7$ (مع $5^1\\equiv 5, 5^2\\equiv 4, 5^3\\equiv 6, 5^4\\equiv 2, 5^5\\equiv 3, 5^6\\equiv 1 \\pmod{7}$ )؟',
				options: [
					'$n = 6k + 2$ ($k \\in \\mathbb{N}$)',
					'$n = 6k + 1$ ($k \\in \\mathbb{N}$)',
					'$n = 6k + 4$ ($k \\in \\mathbb{N}$)',
					'$n = 6k + 5$ ($k \\in \\mathbb{N}$)'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'من أجل $n = 6k + 2$ يكون $5^n + 2 \\equiv 4 + 2 = 6 \\not\\equiv 0 \\pmod{7}$ .',
					'إجابة صحيحة! $5^n + 2 \\equiv 0 \\pmod{7} \\iff 5^n \\equiv -2 \\equiv 5 \\pmod{7}$ ، وهذا يتحقق فقط من أجل $n = 6k + 1$ .',
					'من أجل $n = 6k + 4$ يكون $5^n + 2 \\equiv 2 + 2 = 4 \\not\\equiv 0 \\pmod{7}$ .',
					'من أجل $n = 6k + 5$ يكون $5^n + 2 \\equiv 3 + 2 = 5 \\not\\equiv 0 \\pmod{7}$ .'
				],
				explanationAr:
					'الموافقة $5^n + 2 \\equiv 0 \\pmod{7}$ تكافئ $5^n \\equiv -2 \\equiv 5 \\pmod{7}$ . بالرجوع إلى دورية بواقي $5^n$ بترديد $7$ نجد الباقي $5$ في حالة واحدة فقط هي $n = 6k + 1$ ($k \\in \\mathbb{N}$).'
			},
			{
				questionAr:
					'مجموعة حلول المعادلة $2x + 3 \\equiv 4 \\pmod{5}$ في $\\mathbb{Z}$ هي ($k \\in \\mathbb{Z}$):',
				options: [
					'$x = 5k + 1$',
					'$x = 5k + 3$',
					'$x = 5k + 2$',
					'$x = 5k + 4$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'بالتعويض: $2(1) + 3 = 5 \\equiv 0 \\not\\equiv 4 \\pmod{5}$ .',
					'إجابة صحيحة! $2x \\equiv 1 \\equiv 6 \\pmod{5} \\implies x \\equiv 3 \\pmod{5}$ ، لأن $2(3) + 3 = 9 \\equiv 4 \\pmod{5}$ .',
					'بالتعويض: $2(2) + 3 = 7 \\equiv 2 \\not\\equiv 4 \\pmod{5}$ .',
					'بالتعويض: $2(4) + 3 = 11 \\equiv 1 \\not\\equiv 4 \\pmod{5}$ .'
				],
				explanationAr:
					'المعادلة تكافئ $2x \\equiv 4 - 3 = 1 \\pmod{5}$ . بتجريب بواقي $x \\in \\{0, 1, 2, 3, 4\\}$ نجد $2 \\times 3 = 6 \\equiv 1 \\pmod{5}$ فقط، ومنه $x = 5k + 3$ ($k \\in \\mathbb{Z}$).'
			}
		]
	},

	// =========================================================================
	// LESSON 4: ARITHMETIC SEQUENCES
	// =========================================================================
	{
		id: 'lesson_3as_shared_lit_t1_arithmetic_sequences',
		slug: '3as-shared-lit-t1-arithmetic-sequences',
		grade: '3as_lp',
		yearSubjectId: 768,
		trimesterId: 't1',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: المتتاليات العددية (الحسابية والهندسية)',
		order: 4,
		domain: 'algebra',
		titleAr: 'المتتاليات الحسابية: الحد العام، الأساس، الوسط الحسابي ومجموع n حداً وتحديد الرتبة',
		objectives: [
			'التعرف على المتتالية الحسابية وتحديد أساسها r وحدها الأول وإثبات أن متتالية حسابية',
			'كتابة عبارة الحد العام u_n بدلالة n وتوظيف خاصية الوسط الحسابي (a + c = 2b) لحل جمل البكالوريا',
			'حساب مجموع n حداً متعاقباً، والتحقق من انتماء عدد للمتتالية وتعيين رتبته بدقة'
		],
		keywordsAr: [
			'المتتالية الحسابية',
			'الأساس والحد العام',
			'الوسط الحسابي',
			'مجموع حدود متتابعة',
			'رتبة الحد'
		],
		discover: {
			scenarioAr:
				'تقرّر مكتبة بلدية زيادة رصيدها من الكتب الثقافية بمقدار ثابت كل شهر، فبدأت بـ $u_0 = 2$ مئة كتاب وأضافت $r = 3$ مئات كل شهر ($2, 5, 8, 11, \\dots$). كيف نستعمل خصائص **المتتالية الحسابية** لحساب أي حد دون عدّ جميع الأشهر، ومعرفة متى يبلغ الرصيد عدداً معيناً، وحساب المجموع؟',
			svg: svgArithmeticSeqSteps,
			steps: [
				{
					promptAr:
						'اكتب عبارة الحد العام $u_n$ بدلالة $n$ للمتتالية الحسابية التي حدها الأول $u_0 = 2$ وأساسها $r = 3$ ، ثم احسب قيمة $u_{10}$ .',
					hintAr: 'طبّق القانون $u_n = u_0 + n r$ وعوّض $n = 10$ .',
					expectedInput: '32',
					revealAr:
						'عبارة الحد العام هي $u_n = u_0 + nr = 2 + 3n$ . ومنه $u_{10} = 2 + 3(10) = 32$ .'
				},
				{
					promptAr:
						'هل العدد $101$ حد من حدود المتتالية $(u_n)$ ؟ وإذا كان كذلك، فما هو دليله $n$ وما هي **رتبته** (علماً أن الحد الأول هو $u_0$)؟',
					hintAr: 'حل المعادلة $2 + 3n = 101$ ؛ وتذكّر أن الرتبة هي $n + 1$ لأننا بدأنا العدّ من $u_0$ !',
					expectedInput: '34',
					revealAr:
						'نحل $2 + 3n = 101 \\iff 3n = 99 \\iff n = 33 \\in \\mathbb{N}$ . إذن $101 = u_{33}$ هو حد من المتتالية، وبما أن المتتالية تنطلق من $u_0$ فإن رتبته هي $33 + 1 = 34$ (الحد الرابع والثلاثون).'
				},
				{
					promptAr:
						'احسب المجموع $S_{10} = u_0 + u_1 + \\dots + u_{10}$ (علماً أن $u_0 = 2$ و $u_{10} = 32$).',
					hintAr: 'عدد الحدود هو $10 - 0 + 1 = 11$ ، واستعمل $S_{10} = 11 \\times \\frac{u_0 + u_{10}}{2}$ .',
					expectedInput: '187',
					revealAr:
						'عدد الحدود من $u_0$ إلى $u_{10}$ هو $11$ حداً. إذن $S_{10} = \\frac{11 \\times (2 + 32)}{2} = 11 \\times 17 = 187$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**التعريف**: تكون $(u_n)$ متتالية حسابية إذا وُجد عدد حقيقي ثابت $r$ (يسمى **الأساس**) بحيث من أجل كل $n$ : $u_{n+1} - u_n = r$ . تتزايد تماماً إذا كان $r > 0$ وتتناقص تماماً إذا كان $r < 0$ وتكون ثابتة إذا كان $r = 0$ .',
				'**عبارة الحد العام**: من أجل كل دليلين $n$ و $p$ :\n$$u_n = u_0 + n r \\quad \\text{، وبصفة عامة:} \\quad u_n = u_p + (n - p) r$$',
				'**خاصية الوسط الحسابي**: إذا كانت $a, b, c$ ثلاثة حدود متعاقبة من متتالية حسابية فإن:\n$$a + c = 2b$$\nوتسمح هذه الخاصية بتبسيط معادلات البكالوريا مثل $u_1 + u_2 + u_3 = 3u_2$ فوراً!',
				'**مجموع حدود متعاقبة وتعيين الرتبة**:\n- مجموع $N$ حداً متعاقباً من $u_p$ إلى $u_n$ (حيث عدد الحدود $N = n - p + 1$ ) هو:\n$$S = \\frac{n - p + 1}{2}(u_p + u_n)$$\n- **الرتبة**: إذا كان الحد الأول $u_0$ فإن رتبة الحد $u_n$ هي $(n + 1)$ ، وإذا كان الحد الأول $u_1$ فإن رتبة $u_n$ هي $n$ .'
			],
			visualSvg: svgFunctionCurvePlot({
				xMin: -0.5,
				xMax: 6.5,
				yMin: 0,
				yMax: 16,
				fn: (x) => 2 + 2 * x,
				curveLabel: 'u_n = 2 + 2n',
				points: [
					{ x: 0, y: 2, label: 'u0=2', color: '#dc2626' },
					{ x: 1, y: 4, label: 'u1=4', color: '#1d4ed8' },
					{ x: 2, y: 6, label: 'u2=6', color: '#15803d' },
					{ x: 3, y: 8, label: 'u3=8', color: '#1d4ed8' },
					{ x: 4, y: 10, label: 'u4=10', color: '#1d4ed8' }
				]
			}),
			visualCaptionAr: 'التمثيل النقطي للمتتالية الحسابية يقع دوماً على مستقيم معامل توجيهه يساوي الأساس r',
			examples: [
				{
					problemAr:
						'$(u_n)_{n \\in \\mathbb{N}}$ متتالية حسابية متزايدة تماماً حيث $u_1 + u_2 + u_3 = 27$ و $u_1 \\times u_3 = 65$ . احسب $u_2$ والأساس $r$ والحد الأول $u_0$ ، ثم عيّن $u_n$ بدلالة $n$ .',
					solutionAr:
						'1) باستعمال الوسط الحسابي: $u_1 + u_3 = 2u_2$ ، ومنه $2u_2 + u_2 = 27 \\implies 3u_2 = 27 \\implies u_2 = 9$ .\n2) نعبر عن $u_1$ و $u_3$ بدلالة $u_2$ والأساس $r$ : $u_1 = 9 - r$ و $u_3 = 9 + r$ .\nنعوض في الجداء: $(9 - r)(9 + r) = 65 \\implies 81 - r^2 = 65 \\implies r^2 = 16$ .\nبما أن المتتالية متزايدة تماماً فإن $r > 0$ ، أي $r = 4$ .\n3) الحد الأول: $u_0 = u_2 - 2r = 9 - 8 = 1$ ، والحد العام: $u_n = 1 + 4n$ .'
				},
				{
					problemAr:
						'$(w_n)$ متتالية حسابية معرفة على $\\mathbb{N}$ بـ $w_2 = 7$ و $w_6 = 19$ . احسب الأساس $r$ والحد الأول $w_0$ ، ثم المجموع $S = w_0 + w_1 + \\dots + w_{20}$ .',
					solutionAr:
						'1) لدينا $w_6 = w_2 + (6 - 2)r \\implies 19 = 7 + 4r \\implies 4r = 12 \\implies r = 3$ .\n2) ومنه $w_0 = w_2 - 2r = 7 - 6 = 1$ ، و $w_{20} = 1 + 20(3) = 61$ .\n3) عدد الحدود هو $20 - 0 + 1 = 21$ حداً، والمجموع:\n$$S = \\frac{21 \\times (1 + 61)}{2} = 21 \\times 31 = 651$$'
				}
			],
			watchOutAr:
				'انتبه لخطأين كلاسيكيين في البكالوريا: (1) عدد الحدود في المجموع $u_p + \\dots + u_n$ هو $(n - p + 1)$ وليس $(n - p)$ (مثلاً من $u_0$ إلى $u_n$ يوجد $n + 1$ حداً!). (2) عند تعيين **رتبة** الحد $u_k$ ، إذا انطلقت المتتالية من $u_0$ فالرتبة هي $k + 1$ ، وإذا انطلقت من $u_1$ فالرتبة هي $k$ .'
		},
		practice: [
			{
				questionAr:
					'متتالية حسابية $(u_n)_{n \\in \\mathbb{N}}$ تحقق $u_1 + u_2 + u_3 = 36$ . ما هي قيمة الحد $u_2$ ؟',
				options: [
					'$12$',
					'$18$',
					'$9$',
					'$15$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! بالوسط الحسابي $u_1 + u_3 = 2u_2$ إذن $3u_2 = 36 \\implies u_2 = 12$ .',
					'قسمت على $2$ بدلاً من $3$ : مجموع الحدود الثلاثة يساوي $3u_2$ وليس $2u_2$ .',
					'راجع القسمة: $36 \\div 3 = 12$ وليس $9$ .',
					'تأكد من خاصية الوسط الحسابي: $u_1 + u_2 + u_3 = 3u_2$ .'
				],
				explanationAr:
					'بما أن $u_1, u_2, u_3$ ثلاثة حدود متعاقبة من متتالية حسابية فإن $u_1 + u_3 = 2u_2$ ، ومنه $3u_2 = 36 \\implies u_2 = 12$ .'
			},
			{
				questionAr:
					'متتالية حسابية $(u_n)$ حدها الأول $u_0 = 5$ وأساسها $r = 4$ . ما هي **رتبة** الحد الذي قيمته $125$ ؟',
				options: [
					'$30$',
					'$31$',
					'$29$',
					'$32$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'$30$ هو الدليل $n$ للحد ($u_{30} = 125$)؛ وبما أن المتتالية تبدأ من $u_0$ فالرتبة هي $n + 1 = 31$ !',
					'إجابة دقيقة! $5 + 4n = 125 \\implies n = 30$ ، ولأن الحد الأول هو $u_0$ فإن الرتبة هي $30 + 1 = 31$ .',
					'تأكد من حل المعادلة $5 + 4n = 125$ ثم إضافة $1$ لأن البداية من $u_0$ .',
					'تحقق من الحساب: $5 + 4(31) = 129 \\ne 125$ .'
				],
				explanationAr:
					'نحل $u_n = 125 \\iff 5 + 4n = 125 \\iff 4n = 120 \\iff n = 30$ . وبما أن المتتالية تبدأ بالحد $u_0$ ، فإن رتبة الحد $u_{30}$ هي $30 + 1 = 31$ .'
			},
			{
				questionAr:
					'ما هو مجموع الحدود العشرة الأولى $S_9 = u_0 + u_1 + \\dots + u_9$ لمتتالية حسابية حدها الأول $u_0 = 3$ وأساسها $r = 2$ ؟',
				options: [
					'$120$',
					'$108$',
					'$110$',
					'$132$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $u_9 = 3 + 9(2) = 21$ وعدد الحدود $10$ ، إذن $S_9 = \\frac{10(3 + 21)}{2} = 120$ .',
					'عدد الحدود من $u_0$ إلى $u_9$ هو $10$ وليس $9$ .',
					'تحقق من حساب $u_9 = 3 + 18 = 21$ وليس $19$ .',
					'راجع تطبيق قانون المجموع: $\\frac{10 \\times (3 + 21)}{2} = 5 \\times 24 = 120$ .'
				],
				explanationAr:
					'لدينا $u_9 = u_0 + 9r = 3 + 18 = 21$ وعدد الحدود $9 - 0 + 1 = 10$ ، ومنه $S_9 = \\frac{10(3 + 21)}{2} = 5 \\times 24 = 120$ .'
			}
		]
	},

	// =========================================================================
	// LESSON 5: GEOMETRIC SEQUENCES
	// =========================================================================
	{
		id: 'lesson_3as_shared_lit_t1_geometric_sequences',
		slug: '3as-shared-lit-t1-geometric-sequences',
		grade: '3as_lp',
		yearSubjectId: 768,
		trimesterId: 't1',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: المتتاليات العددية (الحسابية والهندسية)',
		order: 5,
		domain: 'algebra',
		titleAr: 'المتتاليات الهندسية: الحد العام، الأساس، اتجاه التغير، والتقارب وحساب المجاميع',
		objectives: [
			'تعريف المتتالية الهندسية وإثبات أن متتالية هندسية بحساب النسبة v_{n+1} / v_n أو إثبات v_{n+1} = q v_n',
			'كتابة عبارة الحد العام v_n = v_0 q^n واستثمار خاصية الوسط الهندسي (a × c = b^2)',
			'دراسة اتجاه تغير المتتالية الهندسية وتقاربها حسب قيم الأساس q ، وحساب مجموع حدود متعاقبة'
		],
		keywordsAr: [
			'المتتالية الهندسية',
			'الوسط الهندسي',
			'اتجاه التغير والتقارب',
			'مجموع متتالية هندسية'
		],
		discover: {
			scenarioAr:
				'في مشروع تشجير بلدي لمكافحة التصحر، تُضاعف جمعية بيئية المساحة المغروسة أو تُقلّص كمية المياه المستهلكة بالري بالتقطير كل موسم بنسبة ثابتة. لنفترض أن استهلاك الماء في الموسم الأول كان $v_0 = 64$ متراً مكعباً وينخفض كل موسم إلى نصفه ($v_{n+1} = \\frac{1}{2} v_n$). لندرس هذه **المتتالية الهندسية** وحدّها العام وتقاربها ومجموعها.',
			svg: svgCobwebSequencePlot({
				xMin: 0,
				xMax: 70,
				yMin: 0,
				yMax: 70,
				fn: (x) => 0.5 * x,
				u0: 64,
				steps: 4,
				fixedPoint: 0
			}),
			steps: [
				{
					promptAr:
						'اكتب عبارة الحد العام $v_n$ بدلالة $n$ علماً أن $v_0 = 64$ و $q = \\frac{1}{2}$ ، ثم احسب قيمة $v_4$ .',
					hintAr: 'طبّق القانون $v_n = v_0 \\cdot q^n$ وعوض $n = 4$ ($64 \\div 16$).',
					expectedInput: '4',
					revealAr:
						'عبارة الحد العام هي $v_n = 64 \\left(\\frac{1}{2}\\right)^n$ . ومنه $v_4 = 64 \\times \\frac{1}{16} = 4$ .'
				},
				{
					promptAr:
						'بما أن الأساس $q = \\frac{1}{2}$ يحقق $-1 < q < 1$ ، ما هي نهاية المتتالية $\\lim_{n \\to +\\infty} v_n$ ؟',
					hintAr: 'عندما يكون $|q| < 1$ فإن $\\lim_{n \\to +\\infty} q^n = 0$ .',
					expectedInput: '0',
					revealAr:
						'بما أن $|q| = \\frac{1}{2} < 1$ فإن $\\lim_{n \\to +\\infty} \\left(\\frac{1}{2}\\right)^n = 0$ ، ومنه $\\lim_{n \\to +\\infty} v_n = 64 \\times 0 = 0$ . إذن المتتالية $(v_n)$ **متقاربة نحو $0$** .'
				},
				{
					promptAr:
						'احسب المجموع $S_4 = v_0 + v_1 + v_2 + v_3 + v_4$ (الاستهلاك الإجمالي خلال المواسم الخمسة الأولى).',
					hintAr: 'طبّق $S_4 = 64 \\times \\frac{1 - (1/2)^5}{1 - 1/2}$ أو اجمع $64 + 32 + 16 + 8 + 4$ .',
					expectedInput: '124',
					revealAr:
						'لدينا $S_4 = 64 \\times \\frac{1 - \\frac{1}{32}}{\\frac{1}{2}} = 128 \\times \\frac{31}{32} = 4 \\times 31 = 124$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**التعريف وعبارة الحد العام**: تكون $(v_n)$ متتالية هندسية أساسها $q \\ne 0$ إذا تحقق من أجل كل $n$ : $v_{n+1} = q \\cdot v_n$ .\n$$v_n = v_0 \\cdot q^n \\quad \\text{، وبصفة عامة:} \\quad v_n = v_p \\cdot q^{n - p}$$',
				'**خاصية الوسط الهندسي**: إذا كانت $a, b, c$ ثلاثة حدود متعاقبة من متتالية هندسية فإن $a \\times c = b^2$ .',
				'**اتجاه التغير والتقارب (حالة $v_0 > 0$ و $q > 0$)**:\n- نحسب الفرق $v_{n+1} - v_n = v_0 q^n (q - 1)$ : إذا كان $q > 1$ فهي **متزايدة تماماً** وتتباعد نحو $+\\infty$ ؛ وإذا كان $0 < q < 1$ فهي **متناقصة تماماً** وتتقارب نحو $0$ ؛ وإذا كان $q = 1$ فهي ثابتة.\n- **حالة عامة للتقارب**: إذا كان $-1 < q < 1$ فإن $\\lim_{n \\to +\\infty} q^n = 0$ (متقاربة نحو $0$)، وإذا كان $q \\le -1$ فالمتتالية متباعدة (متناوبة الإشارة لا نهاية لها).',
				'**مجموع حدود متعاقبة من متتالية هندسية ($q \\ne 1$)**:\n$$S = v_p + v_{p+1} + \\dots + v_n = v_p \\cdot \\frac{1 - q^{n - p + 1}}{1 - q} = v_p \\cdot \\frac{q^{n - p + 1} - 1}{q - 1}$$\n(حيث $n - p + 1$ هو عدد الحدود المضافة، والحد الأول في المجموع هو $v_p$ ).'
			],
			visualSvg: svgFunctionCurvePlot({
				xMin: -0.5,
				xMax: 5.5,
				yMin: -1,
				yMax: 18,
				fn: (x) => (x >= 0 ? Math.pow(2, x) : Number.NaN),
				curveLabel: 'v_n = 2^n',
				points: [
					{ x: 0, y: 1, label: 'v0=1', color: '#dc2626' },
					{ x: 1, y: 2, label: 'v1=2', color: '#1d4ed8' },
					{ x: 2, y: 4, label: 'v2=4', color: '#1d4ed8' },
					{ x: 3, y: 8, label: 'v3=8', color: '#15803d' },
					{ x: 4, y: 16, label: 'v4=16', color: '#15803d' }
				]
			}),
			visualCaptionAr: 'نمو أسي لحدود متتالية هندسية أساسها q = 2 > 1 (متزايدة تماماً ومتباعدة نحو +∞)',
			examples: [
				{
					problemAr:
						'$(v_n)_{n \\in \\mathbb{N}}$ متتالية هندسية حدودها موجبة تماماً تحقق $v_1 \\times v_3 = 36$ و $v_1 + v_2 + v_3 = 19$ . عيّن $v_2$ والأساس $q$ والحد الأول $v_0$ .',
					solutionAr:
						'1) باستعمال الوسط الهندسي: $v_1 \\times v_3 = v_2^2 \\implies v_2^2 = 36$ . وبما أن الحدود موجبة فإن $v_2 = 6$ .\n2) نعوض $v_2 = 6$ في المجموع: $v_1 + v_3 = 19 - 6 = 13$ . ولدينا $v_1 = \\frac{6}{q}$ و $v_3 = 6q$ ، إذن:\n$$\\frac{6}{q} + 6q = 13 \\iff 6q^2 - 13q + 6 = 0$$\nالمميز $\\Delta = 169 - 144 = 25$ ، فالحلان هما $q = \\frac{13 + 5}{12} = \\frac{3}{2}$ أو $q = \\frac{13 - 5}{12} = \\frac{2}{3}$ (وكلاهما يولد نفس الحدود بترتيب متزايد أو متناقص: مثلاً إذا كانت متزايدة فإن $q = \\frac{3}{2}$ و $v_0 = \\frac{v_2}{q^2} = \\frac{6}{9/4} = \\frac{8}{3}$ ).'
				},
				{
					problemAr:
						'$(v_n)$ متتالية هندسية حدها الأول $v_0 = 3$ وأساسها $q = 2$ . احسب بدلالة $n$ المجموع $S_n = v_0 + v_1 + \\dots + v_n$ ، ثم أوجد قيمة $n$ بحيث $S_n = 93$ .',
					solutionAr:
						'1) عدد الحدود هو $n + 1$ ، ومنه:\n$$S_n = 3 \\times \\frac{2^{n + 1} - 1}{2 - 1} = 3(2^{n + 1} - 1)$$\n2) نحل $S_n = 93 \\iff 3(2^{n + 1} - 1) = 93 \\iff 2^{n + 1} - 1 = 31 \\iff 2^{n + 1} = 32 = 2^5$ .\nإذن $n + 1 = 5 \\implies n = 4$ .'
				}
			],
			watchOutAr:
				'احذر ثلاثة أخطاء متكررة في المجاميع الهندسية: (1) الأس فوق $q$ في قانون المجموع هو **عدد الحدود $(n - p + 1)$** وليس الدليل الأخير $n$ وحده! (2) عند انعكاس الإشارة إذا كان $v_0 < 0$ و $q > 1$ ، تصبح المتتالية **متناقصة تماماً** رغم أن $q > 1$ ، لذا احسب دوماً إشارة الفرق $v_{n+1} - v_n = v_0 q^n(q - 1)$ . (3) التوقف دون التمييز بين $q > 1$ (متباعدة) و $|q| < 1$ (متقاربة نحو $0$).'
		},
		practice: [
			{
				questionAr:
					'متتالية هندسية $(v_n)$ حدودها موجبة تماماً تحقق $v_2 \\times v_4 = 100$ . ما هي قيمة الحد $v_3$ ؟',
				options: [
					'$10$',
					'$50$',
					'$25$',
					'$100$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! بالوسط الهندسي $v_3^2 = v_2 \\times v_4 = 100$ ، وبما أن $v_3 > 0$ فإن $v_3 = 10$ .',
					'انتبه: في المتتالية الهندسية الوسط هو الجذر التربيعي للجداء وليس نصف المجموع!',
					'راجع الجذر التربيعي للعدد $100$ .',
					'$100$ هو قيمة $v_3^2$ وليس $v_3$ .'
				],
				explanationAr:
					'بما أن $v_2, v_3, v_4$ ثلاثة حدود متعاقبة لمتتالية هندسية فإن $v_3^2 = v_2 \\times v_4 = 100$ . ولأن الحدود موجبة تماماً نأخذ الجذر الموجب $v_3 = 10$ .'
			},
			{
				questionAr:
					'إذا كانت $(v_n)$ متتالية هندسية حدها الأول $v_0 = 5$ وأساسها $q = \\frac{1}{3}$ ، فإنها:',
				options: [
					'متزايدة تماماً ومتباعدة نحو $+\\infty$',
					'متناقصة تماماً ومتقاربة نحو $0$',
					'متناقصة تماماً ومتقاربة نحو $\\frac{1}{3}$',
					'غير رتيبة ومتقاربة نحو $0$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'بما أن $0 < q = \\frac{1}{3} < 1$ و $v_0 = 5 > 0$ فإن الحدود تتناقص وتؤول إلى الصفر.',
					'إجابة صحيحة! $v_{n+1} - v_n = 5(\\frac{1}{3})^n(\\frac{1}{3} - 1) < 0$ فهي متناقصة تماماً، وبما أن $|q| < 1$ فإن نهايتها $0$ .',
					'نهاية متتالية هندسية أساسها $|q| < 1$ هي $0$ دائماً وليس قيمة الأساس $q$ !',
					'المتتالية رتيبة (متناقصة تماماً) لأن الأساس موجب.'
				],
				explanationAr:
					'لدينا $v_{n+1} - v_n = 5\\left(\\frac{1}{3}\\right)^n \\left(\\frac{1}{3} - 1\\right) = -\\frac{10}{3}\\left(\\frac{1}{3}\\right)^n < 0$ فالمتتالية متناقصة تماماً. وبما أن $-1 < \\frac{1}{3} < 1$ فإن $\\lim_{n \\to +\\infty} v_n = 0$ فهي متقاربة نحو $0$ .'
			},
			{
				questionAr:
					'ما هي عبارة المجموع $S_n = v_0 + v_1 + \\dots + v_n$ لمتتالية هندسية حدها الأول $v_0 = 2$ وأساسها $q = 3$ ؟',
				options: [
					'$3^n - 1$',
					'$3^{n+1} - 1$',
					'$2(3^{n+1} - 1)$',
					'$\\frac{3^{n+1} - 1}{2}$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'نسيت أن عدد الحدود من $v_0$ إلى $v_n$ هو $n + 1$ وليس $n$ !',
					'إجابة دقيقة! $S_n = 2 \\cdot \\frac{3^{n+1} - 1}{3 - 1} = 2 \\cdot \\frac{3^{n+1} - 1}{2} = 3^{n+1} - 1$ .',
					'نسيت القسمة على $q - 1 = 3 - 1 = 2$ في المقام.',
					'نسيت الضرب في الحد الأول $v_0 = 2$ في البسط.'
				],
				explanationAr:
					'عدد الحدود هو $n - 0 + 1 = n + 1$ . نطبق القانون: $S_n = v_0 \\cdot \\frac{q^{n+1} - 1}{q - 1} = 2 \\cdot \\frac{3^{n+1} - 1}{3 - 1} = 3^{n+1} - 1$ .'
			}
		]
	}
];

export const SHARED_LESSONS_3AS_LIT_T1: InteractiveLessonData[] = RAW_LESSONS_3AS_LIT_T1;
