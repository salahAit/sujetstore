import type { InteractiveLessonData, MathDomain } from '../../types';
import { adaptLessonForTrack } from '../../types';
import {
	svgCobwebSequencePlot,
	svgFunctionCurvePlot,
	svgVariationTable
} from '../../svg-secondary';
import { SHARED_LESSONS_3AS_T1 } from '../../secondary_shared_3as/lessons/t1';

type CurriculumLesson = InteractiveLessonData & { domain: MathDomain };

function adaptSharedT1(
	base: InteractiveLessonData,
	tail: string,
	overrides: {
		order: number;
		domain: MathDomain;
		sequenceId: string;
		sequenceTitleAr: string;
		titleAr: string;
		objectives: string[];
		keywordsAr: string[];
	} & Partial<Pick<InteractiveLessonData, 'discover' | 'summary' | 'practice'>>
): CurriculumLesson {
	const adapted = adaptLessonForTrack(base, '3as_math', tail);
	return {
		...adapted,
		id: `lesson_3as_math_${tail}`,
		slug: `3as-math-${tail.replaceAll('_', '-')}`,
		grade: '3as_math',
		yearSubjectId: 702,
		trimesterId: 't1',
		...overrides
	};
}

// ============================================================================
// Custom SVGs for 3AS Math T1 (Congruence Power Cycle & Base-b Numeration)
// ============================================================================

const svgMod7CycleClock = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 230" width="420" height="230" style="background:#ffffff;font-family:Arial,sans-serif">
  <rect x="8" y="8" width="404" height="214" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="210" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">الدورة الدورية لبواقي قوى العدد 3 بترديد 7 (الدور T = 6)</text>
  <!-- Cycle ring -->
  <circle cx="135" cy="126" r="68" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.6" stroke-dasharray="4,3"/>
  <text x="135" y="123" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">mod 7</text>
  <text x="135" y="138" text-anchor="middle" font-size="10" fill="#475569">× 3</text>
  <!-- 6 nodes around (135,126) r=68: angles -90, -30, 30, 90, 150, 210 deg -->
  <!-- k=0: r=1 at (135, 58) -->
  <circle cx="135" cy="58" r="15" fill="#1d4ed8"/>
  <text x="135" y="62" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#ffffff">1</text>
  <text x="135" y="39" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#1d4ed8">3⁰ ≡ 1</text>
  <!-- k=1: r=3 at (194, 92) -->
  <circle cx="194" cy="92" r="15" fill="#2563eb"/>
  <text x="194" y="96" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#ffffff">3</text>
  <text x="225" y="88" text-anchor="start" font-size="9.5" font-weight="bold" fill="#1e40af">3¹ ≡ 3</text>
  <!-- k=2: r=2 at (194, 160) -->
  <circle cx="194" cy="160" r="15" fill="#2563eb"/>
  <text x="194" y="164" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#ffffff">2</text>
  <text x="225" y="166" text-anchor="start" font-size="9.5" font-weight="bold" fill="#1e40af">3² ≡ 2</text>
  <!-- k=3: r=6 at (135, 194) -->
  <circle cx="135" cy="194" r="15" fill="#dc2626"/>
  <text x="135" y="198" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#ffffff">6</text>
  <text x="135" y="218" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#dc2626">3³ ≡ 6 ≡ -1</text>
  <!-- k=4: r=4 at (76, 160) -->
  <circle cx="76" cy="160" r="15" fill="#0f766e"/>
  <text x="76" y="164" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#ffffff">4</text>
  <text x="45" y="166" text-anchor="end" font-size="9.5" font-weight="bold" fill="#0f766e">3⁴ ≡ 4</text>
  <!-- k=5: r=5 at (76, 92) -->
  <circle cx="76" cy="92" r="15" fill="#0f766e"/>
  <text x="76" y="96" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#ffffff">5</text>
  <text x="45" y="88" text-anchor="end" font-size="9.5" font-weight="bold" fill="#0f766e">3⁵ ≡ 5</text>
  <!-- Summary Table on Right -->
  <rect x="268" y="48" width="132" height="156" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="334" y="66" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">جدول البواقي (k ∈ N)</text>
  <line x1="268" y1="73" x2="400" y2="73" stroke="#cbd5e1"/>
  <text x="334" y="90" text-anchor="middle" font-size="10" fill="#1e293b">n = 6k     ⇒ r = 1</text>
  <text x="334" y="108" text-anchor="middle" font-size="10" fill="#1e293b">n = 6k + 1 ⇒ r = 3</text>
  <text x="334" y="126" text-anchor="middle" font-size="10" fill="#1e293b">n = 6k + 2 ⇒ r = 2</text>
  <text x="334" y="144" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">n = 6k + 3 ⇒ r = 6</text>
  <text x="334" y="162" text-anchor="middle" font-size="10" fill="#1e293b">n = 6k + 4 ⇒ r = 4</text>
  <text x="334" y="180" text-anchor="middle" font-size="10" fill="#1e293b">n = 6k + 5 ⇒ r = 5</text>
</svg>`;

const svgNumerationBaseCascade = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 220" width="440" height="220" style="background:#ffffff;font-family:Arial,sans-serif">
  <rect x="8" y="8" width="424" height="204" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="220" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">الانتقال بين نظم التعداد: من الأساس 5 إلى الأساس 10 ثم إلى الأساس 7</text>
  <!-- Box 1: Base 5 -->
  <rect x="20" y="50" width="118" height="142" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
  <text x="79" y="70" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">النشر وفق الأساس 5</text>
  <text x="79" y="94" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">N = (2310)₅</text>
  <text x="79" y="118" text-anchor="middle" font-size="10" fill="#334155">2×5³ + 3×5²</text>
  <text x="79" y="135" text-anchor="middle" font-size="10" fill="#334155">+ 1×5¹ + 0×5⁰</text>
  <text x="79" y="158" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#15803d">= 250 + 75 + 5</text>
  <text x="79" y="178" text-anchor="middle" font-size="12" font-weight="bold" fill="#15803d">N = 330 (عشري)</text>
  <!-- Arrow -->
  <line x1="142" y1="120" x2="168" y2="120" stroke="#0f172a" stroke-width="1.8"/>
  <polygon points="172,120 164,116 164,124" fill="#0f172a"/>
  <!-- Box 2: Successive Divisions by 7 -->
  <rect x="176" y="50" width="242" height="142" rx="6" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="297" y="70" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f766e">القسمات الإقليدية المتتابعة على 7</text>
  <text x="242" y="98" text-anchor="middle" font-size="11" fill="#0f172a">330 = 7 × 47 +</text>
  <rect x="292" y="85" width="24" height="18" rx="3" fill="#fef2f2" stroke="#dc2626"/>
  <text x="304" y="98" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">1</text>
  <text x="358" y="98" text-anchor="middle" font-size="9.5" fill="#64748b">(a₀ آحاد)</text>

  <text x="242" y="124" text-anchor="middle" font-size="11" fill="#0f172a">47 = 7 × 6 +</text>
  <rect x="292" y="111" width="24" height="18" rx="3" fill="#fef2f2" stroke="#dc2626"/>
  <text x="304" y="124" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">5</text>
  <text x="358" y="124" text-anchor="middle" font-size="9.5" fill="#64748b">(a₁)</text>

  <text x="242" y="150" text-anchor="middle" font-size="11" fill="#0f172a">6 = 7 × 0 +</text>
  <rect x="292" y="137" width="24" height="18" rx="3" fill="#fef2f2" stroke="#dc2626"/>
  <text x="304" y="150" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">6</text>
  <text x="358" y="150" text-anchor="middle" font-size="9.5" fill="#64748b">(a₂ أعلى رتبة)</text>

  <text x="297" y="179" text-anchor="middle" font-size="12" font-weight="bold" fill="#dc2626">قراءة تصاعدية للبواقي: N = (651)₇</text>
</svg>`;

const RAW_LESSONS_3AS_MATH_T1: CurriculumLesson[] = [
	// =========================================================================
	// ORDER 1: CONTINUITY, IVT (TVI) & DERIVABILITY (SHARED CORE ADAPTED)
	// =========================================================================
	adaptSharedT1(SHARED_LESSONS_3AS_T1[0], 't1_continuity_ivt_derivability', {
		order: 1,
		domain: 'analysis',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: الاستمرارية والاشتقاقية والدالتان الأسية واللوغاريتمية',
		titleAr: 'الاستمرارية، مبرهنة القيم المتوسطة (TVI) والاشتقاقية وتطبيقاتها',
		objectives: [
			'توظيف استمرارية دالة على مجال ومبرهنة القيم المتوسطة (TVI) لإثبات وجود ووحدانية حلول المعادلة f(x) = k وحصر الجذور',
			'حساب العدد المشتق، مشتق الدالة المركبة، المشتقات المتتابعة، كتابة معادلة المماس والتقريب التآلفي وتعيين نقط الانعطاف',
			'دراسة قابلية الاشتقاق على اليمين وعلى اليسار (نصف المماس والمماس الشاقولي في الدوال الصماء) ودراسة الدوال كثيرات الحدود والناطقة والصماء والمثلثية'
		],
		keywordsAr: [
			'الاستمرارية على مجال',
			'مبرهنة القيم المتوسطة',
			'نصف المماس والمماس الشاقولي',
			'مشتق دالة مركبة',
			'التقريب التآلفي ونقطة الانعطاف'
		]
	}),

	// =========================================================================
	// ORDER 2: EXPONENTIAL FUNCTION (exp) & COMPOSITE exp ∘ u (SHARED CORE ADAPTED)
	// =========================================================================
	adaptSharedT1(SHARED_LESSONS_3AS_T1[1], 't1_exponential_functions', {
		order: 2,
		domain: 'analysis',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: الاستمرارية والاشتقاقية والدالتان الأسية واللوغاريتمية',
		titleAr: 'الدالة الأسية النيبيرية (exp) ودراسة الدوال من الشكل exp∘u',
		objectives: [
			"تعريف الدالة الأسية النيبيرية x ↦ e^x كحل وحيد للمعادلة التفاضلية y' = y يحقق y(0) = 1 واستنتاج خواصها الجبرية والتحليلية",
			'حل معادلات ومتراجحات أسية وإثبات متباينات شهيرة تتضمن الدالة الأسية (مثل e^x ≥ x + 1)',
			'دراسة الدوال x ↦ e^(kx) والدوال المركبة exp∘u وتمثيلها البياني وتوظيفها في مسائل التحليل'
		],
		keywordsAr: [
			'الدالة الأسية النيبيرية',
			"المعادلة التفاضلية y' = y",
			'معادلات ومتراجحات أسية',
			'الدالة المركبة exp∘u'
		]
	}),

	// =========================================================================
	// ORDER 3: LOGARITHMIC FUNCTION (ln), log & DIFF EQ y' = ay + b (SHARED CORE ADAPTED)
	// =========================================================================
	adaptSharedT1(SHARED_LESSONS_3AS_T1[2], 't1_logarithmic_functions_diff_eq', {
		order: 3,
		domain: 'analysis',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: الاستمرارية والاشتقاقية والدالتان الأسية واللوغاريتمية',
		titleAr: "الدالة اللوغاريتمية النيبيرية (ln)، اللوغاريتم العشري والمعادلات التفاضلية y' = ay + b",
		objectives: [
			'تعريف الدالة اللوغاريتمية النيبيرية x ↦ ln(x) على ]0, +∞[ واستنتاج خواصها الجبرية والتحليلية وتناظر منحنيها مع منحنى الدالة الأسية',
			'حل المعادلات والمتراجحات اللوغاريتمية ودراسة الدوال المركبة ln∘u و ln|u| وتعريف اللوغاريتم العشري log',
			"حل المعادلات التفاضلية من الشكل y' = ay و y' = ay + b والمعادلات التي تؤول إليها بتبديل المتغير"
		],
		keywordsAr: [
			'الدالة اللوغاريتمية النيبيرية',
			'اللوغاريتم العشري',
			'الدالة المركبة ln∘u',
			"المعادلة التفاضلية y' = ay + b"
		],
		summary: {
			...SHARED_LESSONS_3AS_T1[2].summary,
			rulesAr: [
				...SHARED_LESSONS_3AS_T1[2].summary.rulesAr,
				'**المعادلات التفاضلية التي تؤول إلى $y\' = ay + b$ بتبديل المتغير (خاص بمسائل التعمق)**: لحل معادلة غير خطية موجهة مثل $y\' = ay + b y^2$ (برنولي بوضع $z = \\frac{1}{y}$ حيث $y \\ne 0$) أو $y y\' = a y^2 + b$ (بوضع $z = y^2$ فيكون $z\' = 2y y\'$)، نعبر عن $z\'$ بدلالة $z$ فنحصل على معادلة خطية $z\' = \\alpha z + \\beta$ نحلها ثم نستنتج عبارة $y(x)$ مع مراعاة مجال التعريف والشرط الابتدائي.'
			]
		}
	}),

	// =========================================================================
	// ORDER 4: LIMITS, COMPARATIVE GROWTH, POWER FUNCTIONS & PARAMETRIC STUDY
	// =========================================================================
	adaptSharedT1(SHARED_LESSONS_3AS_T1[4], 't1_limits_comparative_growth_function_study', {
		order: 4,
		domain: 'analysis',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: النهايات والدراسة الشاملة للدوال والمتتاليات العددية',
		titleAr: 'النهايات، التزايد المقارن، دوال القوى والدراسة الشاملة للدوال والوسيطية',
		objectives: [
			'حساب النهايات بالعمليات الجبرية ومبرهنات الحصر والمقارنة ومركب دالتين والعدد المشتق ونهايات التزايد المقارن ودوال القوى (a^b = e^(b ln a))',
			'تعيين المستقيمات المقاربة الموازية للمحورين والمائلة والمنحنيات المقاربة ودراسة الوضعية النسبية والفروع اللانهائية',
			'إنجاز الدراسة التحليلية والبيانية الشاملة للدوال العددية وعائلات الدوال الوسيطية والمناقشة البيانية (الأفقية والمائلة والدورانية) ومسائل الاستمثال'
		],
		keywordsAr: [
			'النهايات والحصر',
			'التزايد المقارن',
			'دوال القوى والجذور النونية',
			'المنحنيات والمستقيمات المقاربة',
			'الدوال الوسيطية والمناقشة البيانية'
		],
		discover: {
			scenarioAr:
				'في المسألة الشاملة ($7$ نقاط) لبكالوريا شعبة الرياضيات، ندرس عائلة الدوال الوسيطية $f_m(x) = x^2 - 1 + \\frac{2\\ln x + m}{x}$ على $]0; +\\infty[$ ($m \\in \\mathbb{R}$)، ونركز في الدراسة البيانية على $f_0(x) = x^2 - 1 + \\frac{2\\ln x}{x}$ . كيف نوظف **التزايد المقارن**، **المنحنى المقارب** $(\\mathcal{P}): y = x^2 - 1$ ، النقاط الثابتة، و**المناقشة البيانية** لاستكشاف سلوك هذه العائلة بدقة؟',
			svg: svgFunctionCurvePlot({
				fn: (x) => (x > 0.08 ? x * x - 1 + (2 * Math.log(x)) / x : Number.NaN),
				xMin: -0.6,
				xMax: 3.4,
				yMin: -4,
				yMax: 9,
				curveLabel: 'f₀(x)',
				asymptotes: [{ kind: 'vertical', value: 0, label: 'x = 0', color: '#dc2626' }],
				points: [
					{ x: 1, y: 0, label: 'A(1, 0)', color: '#15803d' },
					{ x: Math.E, y: Math.E * Math.E - 1 + 2 / Math.E, label: 'B(e, f₀(e))', color: '#1d4ed8' }
				]
			}),
			steps: [
				{
					promptAr:
						'احسب النهاية $\\lim_{x \\to +\\infty} [f_0(x) - (x^2 - 1)]$ بتوظيف التزايد المقارن. ماذا تستنتج حول العلاقة الهندسية بين $(\\mathcal{C}_0)$ والقطع المكافئ $(\\mathcal{P}): y = x^2 - 1$ بجوار $+\\infty$ ؟',
					hintAr: 'لاحظ أن $f_0(x) - (x^2 - 1) = \\frac{2\\ln x}{x}$ وطبق نهاية التزايد المقارن الشهيرة.',
					expectedInput: '0',
					revealAr:
						'لدينا $\\lim_{x \\to +\\infty} [f_0(x) - (x^2 - 1)] = \\lim_{x \\to +\\infty} \\frac{2\\ln x}{x} = 0$ . إذن المنحنى $(\\mathcal{P})$ ذو المعادلة $y = x^2 - 1$ هو **منحنٍ مقارب** لـ $(\\mathcal{C}_0)$ بجوار $+\\infty$ ، ويقع $(\\mathcal{C}_0)$ فوق $(\\mathcal{P})$ على $]1; +\\infty[$ وتحته على $]0; 1[$ ويتقاطعان عند $A(1, 0)$ .'
				},
				{
					promptAr:
						'بتعريف دالة القوة الحقيقية $x^\\alpha = e^{\\alpha \\ln x}$ على $]0; +\\infty[$ ، احسب النهاية $\\lim_{x \\to 0^+} x^{\\sqrt{2}} \\ln x$ .',
					hintAr: 'ضع $X = x^{\\sqrt{2}}$ أي $\\ln x = \\frac{1}{\\sqrt{2}}\\ln X$ حيث $X \\to 0^+$ .',
					expectedInput: '0',
					revealAr:
						'بما أن $\\alpha = \\sqrt{2} > 0$ ، فإنه حسب مبرهنة التزايد المقارن المعممة على دوال القوى من أجل كل $\\alpha > 0$ : $\\lim_{x \\to 0^+} x^\\alpha \\ln x = 0^-$ (وبوضع $X = x^{\\sqrt{2}} \\to 0^+$ نجد $\\frac{1}{\\sqrt{2}} X \\ln X \\to 0$).'
				},
				{
					promptAr:
						'ادرس تقاطع عائلة المنحنيات $(\\mathcal{C}_m)$ عندما يتغير $m \\in \\mathbb{R}$ بحساب الفرق $f_{m_1}(x) - f_{m_2}(x)$ من أجل $m_1 \\ne m_2$ . ما هو عدد النقط المشتركة بين منحنيين مختلفين من العائلة؟',
					hintAr: 'احسب $f_{m_1}(x) - f_{m_2}(x) = \\frac{m_1 - m_2}{x}$ على $]0; +\\infty[$ .',
					expectedInput: '0',
					revealAr:
						'لدينا $f_{m_1}(x) - f_{m_2}(x) = \\frac{m_1 - m_2}{x} \\ne 0$ من أجل كل $x > 0$ متى كان $m_1 \\ne m_2$ . إذن لا توجد أي نقطة مشتركة (عدد نقط التقاطع يساوي $0$) بين أي منحنيين متمايزين من العائلة!'
				},
				{
					promptAr:
						'لإجراء مناقشة بيانية للمعادلة $x^3 - x + 2\\ln x = k x$ ($x > 0$) باستعمال المنحنى المرسوم $(\\mathcal{C}_0)$ ، اقسم الطرفين على $x > 0$ لكتابتها على الشكل $f_0(x) = k$ . ما نوع هذه المناقشة البيانية (اكتب `أفقية`)؟',
					hintAr: 'الطرف الأيمن $k$ ثابت مستقل عن المتغير $x$ .',
					expectedInput: 'أفقية',
					revealAr:
						'بقسمة الطرفين على $x > 0$ تكافئ المعادلة $x^2 - 1 + \\frac{2\\ln x}{x} = k \\iff f_0(x) = k$ ، فحلولها هي فواصل نقط تقاطع $(\\mathcal{C}_0)$ مع المستقيمات الموازية لمحور الفواصل $y = k$ ، وهي **مناقشة بيانية أفقية**.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**مبرهنات النهايات، دوال القوى والتزايد المقارن**: من أجل كل $a > 0$ و $b \\in \\mathbb{R}$ نعرف $a^b = e^{b\\ln a}$ . دالة القوة $x \\mapsto x^\\alpha = e^{\\alpha\\ln x}$ معرفة وقابلة للاشتقاق على $]0; +\\infty[$ ومشتقتها $\\alpha x^{\\alpha - 1}$ . من أجل كل $\\alpha > 0$ (الأسية تغلب القوى، والقوى تغلب اللوغاريتم):\n$$\\lim_{x \\to +\\infty} \\frac{e^x}{x^\\alpha} = +\\infty, \\quad \\lim_{x \\to -\\infty} |x|^\\alpha e^x = 0, \\quad \\lim_{x \\to +\\infty} \\frac{\\ln x}{x^\\alpha} = 0^+, \\quad \\lim_{x \\to 0^+} x^\\alpha \\ln x = 0^-$$',
				'**المستقيمات المقاربة، المنحنيات المقاربة والفروع اللانهائية**:\n- **المستقيم المقارب المائل**: $(\\Delta): y = ax + b$ مقارب لـ $(\\mathcal{C}_f)$ بجوار $\\pm\\infty \\iff \\lim_{x \\to \\pm\\infty}[f(x) - (ax + b)] = 0$ .\n- **المنحنى المقارب**: نقول إن $(\\mathcal{C}_f)$ و $(\\mathcal{C}_g)$ متقاربان بجوار $\\pm\\infty$ إذا كان $\\lim_{x \\to \\pm\\infty}[f(x) - g(x)] = 0$ ، وتُحدد وضعيتهما النسبية بإشارة الفرق $f(x) - g(x)$ .\n- **الفروع المكافئة**: إذا كان $\\lim_{x \\to \\pm\\infty} f(x) = \\pm\\infty$ ، نحسب $\\lim_{x \\to \\pm\\infty} \\frac{f(x)}{x}$ : إن ساوت $\\pm\\infty$ فالفرع مكافئ باتجاه $(Oy)$ ، وإن ساوت $0$ فالفرع مكافئ باتجاه $(Ox)$ .',
				...SHARED_LESSONS_3AS_T1[4].summary.rulesAr
			],
			visualSvg: SHARED_LESSONS_3AS_T1[4].summary.visualSvg,
			visualCaptionAr: SHARED_LESSONS_3AS_T1[4].summary.visualCaptionAr,
			examples: SHARED_LESSONS_3AS_T1[4].summary.examples,
			watchOutAr:
				'احذر أربعة مطبات دقيقة في بكالوريا الرياضيات: (1) يُمنع منعاً باتاً استعمال قاعدة لوبيتال في البكالوريا؛ استعمل التزايد المقارن أو العدد المشتق أو الحصر. (2) إذا كان $\\lim_{x \\to +\\infty}[f(x) - (ax + b)] = c \\ne 0$ فالمقارب المائل هو $y = ax + b + c$ وليس $y = ax + b$ . (3) في المناقشة البيانية الدورانية $f(x) = m(x - x_0) + y_0$ لا تنسَ دراسة المماس(ات) المارة من النقطة الثابتة $\\omega(x_0, y_0)$ كحالات حدية فاصلة. (4) ميّز بدقة بين $|f(x)|$ (تناظر الجزء السالب حول $(Ox)$) و $f(|x|)$ (دالة زوجية متناظرة حول $(Oy)$).'
		}
	}),

	// =========================================================================
	// ORDER 5: NUMERICAL SEQUENCES, INDUCTION & ADJACENT SEQUENCES
	// =========================================================================
	adaptSharedT1(SHARED_LESSONS_3AS_T1[5], 't1_numerical_sequences_induction', {
		order: 5,
		domain: 'analysis',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: النهايات والدراسة الشاملة للدوال والمتتاليات العددية',
		titleAr: 'المتتاليات العددية، الاستدلال بالتراجع والمتتاليتان المتجاورتان',
		objectives: [
			'دراسة المتتاليات الصريحة u_n = f(n) والتراجعية u_{n+1} = f(u_n) وتوظيف التمثيل البياني والمتتاليات الحسابية والهندسية',
			'إتقان البرهان بالتراجع لإثبات الخواص والمساويات والمتباينات وحصر متتالية بمتتالية هندسية متقاربة',
			'دراسة الرتابة والمحدودية والتقارب وإثبات تجاور متتاليتين واستثمار المتتاليتين المتجاورتين في حصر النهايات والمساحات'
		],
		keywordsAr: [
			'متتالية تراجعية',
			'الاستدلال بالتراجع',
			'تقارب وحصر متتالية',
			'المتتاليتان المتجاورتان'
		]
	}),

	// =========================================================================
	// ORDER 6: EUCLIDEAN DIVISION, CONGRUENCES IN Z & NUMERATION (STREAM EXCLUSIVE)
	// =========================================================================
	{
		id: 'lesson_3as_math_t1_euclidean_division_congruences_numeration',
		slug: '3as-math-t1-euclidean-division-congruences-numeration',
		grade: '3as_math',
		yearSubjectId: 702,
		trimesterId: 't1',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: القسمة الإقليدية والموافقات في Z والتعداد وإدماج الفصل الأول',
		order: 6,
		domain: 'arithmetic_z',
		titleAr: 'القسمة الإقليدية والموافقات في Z والتعداد',
		objectives: [
			'برهان وتوظيف خواص قابلية القسمة في Z وإجراء القسمة الإقليدية في Z وتعيين القاسم المشترك الأكبر (PGCD) بخوارزمية إقليدس وخواصه',
			'إتقان الحساب بالموافقات بترديد n في Z ودراسة دورية بواقي قسمة قوى عدد صحيح وقواعد قابلية القسمة وحل معادلات وجمل موافقات',
			'برهان وجود ووحدانية نشر عدد طبيعي وفق أساس α (N = a_n α^n + ... + a_0) والانتقال بين نظامي تعداد أساساهما α و β'
		],
		keywordsAr: [
			'قابلية القسمة في Z',
			'القسمة الإقليدية في Z',
			'خوارزمية إقليدس و PGCD',
			'الموافقات في Z',
			'التعداد وفق أساس'
		],
		discover: {
			scenarioAr:
				'يحتل **التمرين الثالث (5 نقاط)** في بكالوريا شعبة الرياضيات مكانة مميزة لقياس عمق التفكير الحسابي والبرهاني في المجموعة $\\mathbb{Z}$ . ننطلق من دراسة بواقي القسمة الإقليدية في $\\mathbb{Z}$ (بما فيها المقسوم السالب)، ثم نستكشف دورية بواقي قوى العدد $3$ بترديد $7$ لحساب باقي قسمة قوة هائلة مثل $2026^{2025}$ وإثبات قابلية القسمة بالتراجع والموافقات، وصولاً إلى تشفير الأعداد ونشرها وفق أساس تعداد كيفي $\\alpha \\ge 2$ .',
			svg: svgMod7CycleClock,
			steps: [
				{
					promptAr:
						'نريد تعيين حاصل وباقي القسمة الإقليدية للعدد الصحيح السالب $a = -137$ على $b = 7$ في $\\mathbb{Z}$ . علماً أن $-137 = 7(-19) - 4$ لا تمثل قسمة إقليدية لأن الباقي يجب أن يحقق $0 \\le r < 7$ ، اطرح $7$ وأضف $7$ لتحديد الباقي الصحيح $r$ .',
					hintAr: 'اكتب $-137 = 7(-19 - 1) + 7 - 4 = 7(-20) + r$ وتحقق أن $0 \\le r < 7$ .',
					expectedInput: '3',
					revealAr:
						'بإضافة وطرح المقسوم عليه $7$ نحصل على المساواة الوحيدة $-137 = 7 \\times (-20) + 3$ مع $0 \\le 3 < 7$ . إذن الحاصل هو $q = -20$ والباقي هو $r = 3$ ، ونكتب بلغة الموافقات $-137 \\equiv 3 \\pmod{7}$ .'
				},
				{
					promptAr:
						'بتأمل دورة بواقي $3^n$ بترديد $7$ في الشكل أعلاه ($3^0 \\equiv 1, 3^1 \\equiv 3, 3^2 \\equiv 2, 3^3 \\equiv 6, 3^4 \\equiv 4, 3^5 \\equiv 5, 3^6 \\equiv 1 \\pmod{7}$)، دور البواقي هو $T = 6$ . استنتج باقي القسمة الإقليدية للعدد $2026^{2025}$ على $7$ .',
					hintAr:
						'أولاً اختزل الأساس بترديد $7$ ($2026 = 7 \\times 289 + 3$)، ثم اختزل الأس على الدور $6$ ($2025 = 6 \\times 337 + 3$).',
					expectedInput: '6',
					revealAr:
						'لدينا $2026 = 7 \\times 289 + 3 \\implies 2026 \\equiv 3 \\pmod{7}$ ، ومنه $2026^{2025} \\equiv 3^{2025} \\pmod{7}$ .\nبقسمة الأس على الدور $6$ نجد $2025 = 6 \\times 337 + 3$ ، إذن:\n$$3^{2025} = (3^6)^{337} \\times 3^3 \\equiv 1^{337} \\times 6 \\equiv 6 \\pmod{7}$$\nوبما أن $0 \\le 6 < 7$ فإن الباقي المطلوب هو $6$ .'
				},
				{
					promptAr:
						'نضع من أجل كل $n \\in \\mathbb{N}$ : $A_n = 3^{2n + 1} + 2^{n + 2}$ . تحقق أن $A_{n + 1} = 2 A_n + k \\cdot 3^{2n + 1}$ وعين قيمة العدد الطبيعي $k$ لاستنتاج قابلية قسمة $A_n$ على $7$ بالتراجع.',
					hintAr: 'لاحظ أن $A_{n + 1} = 9 \\cdot 3^{2n + 1} + 2 \\cdot 2^{n + 2} = (7 + 2) \\cdot 3^{2n + 1} + 2 \\cdot 2^{n + 2}$ .',
					expectedInput: '7',
					revealAr:
						'لدينا $A_{n + 1} = 3^{2n + 3} + 2^{n + 3} = 9 \\cdot 3^{2n + 1} + 2 \\cdot 2^{n + 2} = 2(3^{2n + 1} + 2^{n + 2}) + 7 \\cdot 3^{2n + 1} = 2 A_n + 7 \\cdot 3^{2n + 1}$ (إذن $k = 7$).\nبما أن $A_0 = 3 + 4 = 7$ يقبل القسمة على $7$ ، فإن فرضية $7 \\mid A_n$ تستلزم فوراً $7 \\mid A_{n + 1}$ . (وبالموافقات مباشرةً: $3^{2n + 1} + 2^{n + 2} = 3 \\cdot 9^n + 4 \\cdot 2^n \\equiv 3 \\cdot 2^n + 4 \\cdot 2^n = 7 \\cdot 2^n \\equiv 0 \\pmod{7}$!).'
				},
				{
					promptAr:
						'يكتب عدد طبيعي $N$ في نظام التعداد ذي الأساس $5$ على الشكل $N = \\overline{2310}^{(5)}$ . انشر $N$ في النظام العشري ثم اكتبه في نظام التعداد ذي الأساس $7$ (اكتب أرقام النتيجة الثلاثة متتالية دون أقواس).',
					hintAr: 'احسب $N = 2(5^3) + 3(5^2) + 1(5) + 0 = 330$ ثم أنجز القسمات الإقليدية المتتابعة لـ $330$ على $7$ .',
					expectedInput: '651',
					revealAr:
						'في النظام العشري: $N = 2(125) + 3(25) + 5 + 0 = 330$ .\nبالقسمات الإقليدية المتتابعة على $7$ : $330 = 7 \\times 47 + 1$ ، ثم $47 = 7 \\times 6 + 5$ ، ثم $6 = 7 \\times 0 + 6$ .\nبقراءة البواقي من الأسفل إلى الأعلى نجد الكتابة الوحيدة $N = \\overline{651}^{(7)}$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**قابلية القسمة في $\\mathbb{Z}$ والتركيبات الخطية**: من أجل $a, b \\in \\mathbb{Z}$ ($a \\ne 0$)، نقول إن $a$ يقسم $b$ ($a \\mid b$) إذا وفقط إذا وُجد $k \\in \\mathbb{Z}$ بحيث $b = ka$ . **الخاصية الأساسية**: إذا كان $d \\mid a$ و $d \\mid b$ فإنه من أجل كل $(u, v) \\in \\mathbb{Z}^2$ يكون $d \\mid (ua + vb)$ (تُستثمر لحذف المتغير $n$ عند دراسة قواسم عبارتين مثل $3n + 7$ و $2n + 3$).',
				'**مبرهنة القسمة الإقليدية في $\\mathbb{Z}$ وخوارزمية إقليدس**: من أجل كل $a \\in \\mathbb{Z}$ وكل $b \\in \\mathbb{Z}^*$ ، توجد ثنائية **وحيدة** $(q, r) \\in \\mathbb{Z}^2$ تحقق:\n$$a = bq + r \\quad \\text{,}\\quad 0 \\le r < |b|$$\n(برهان الوحدانية: لو كان $bq + r = bq\' + r\'$ لكان $|b| \\cdot |q - q\'| = |r\' - r| < |b|$ ومنه $|q - q\'| = 0$ أي $q = q\'$ و $r = r\'$). وتعتمد خوارزمية إقليدس على المساواة $\\text{PGCD}(a, b) = \\text{PGCD}(b, r)$ حيث آخر باقٍ غير معدوم هو $\\text{PGCD}(a, b)$ ، مع خاصية التجانس $\\text{PGCD}(ka, kb) = |k|\\text{PGCD}(a, b)$ ($k \\in \\mathbb{Z}^*$).',
				'**الموافقات في $\\mathbb{Z}$ بترديد $n$ ($n \\in \\mathbb{N}^*, n \\ge 2$)**: يكون $a \\equiv b \\pmod{n} \\iff n \\mid (a - b) \\iff$ للعددين $a$ و $b$ نفس باقي القسمة الإقليدية على $n$ .\n- **التلاؤم مع العمليات**: إذا كان $a \\equiv b \\pmod{n}$ و $c \\equiv d \\pmod{n}$ فإن $a + c \\equiv b + d \\pmod{n}$ ، $a - c \\equiv b - d \\pmod{n}$ ، $ac \\equiv bd \\pmod{n}$ ، ومن أجل كل $k \\in \\mathbb{N}^*$ : $a^k \\equiv b^k \\pmod{n}$ ، ومن أجل كل كثير حدود $P$ ذي معاملات صحيحة: $P(a) \\equiv P(b) \\pmod{n}$ .\n- **قواعد قابلية القسمة في النظام العشري**: بما أن $10 \\equiv 1 \\pmod{3}$ و $10 \\equiv 1 \\pmod{9}$ فإن $\\overline{a_k \\dots a_0} \\equiv \\sum_{i=0}^k a_i \\pmod{9}$ ؛ وبما أن $10 \\equiv -1 \\pmod{11}$ فإن $\\overline{a_k \\dots a_0} \\equiv \\sum_{i=0}^k (-1)^i a_i \\pmod{11}$ .',
				'**مبرهنة التعداد وفق أساس $\\alpha$ ($\\alpha \\in \\mathbb{N}, \\alpha \\ge 2$)**: كل عدد طبيعي غير معدوم $N \\in \\mathbb{N}^*$ يكتب **بطريقة وحيدة** على الشكل المنشور:\n$$N = a_k \\alpha^k + a_{k - 1}\\alpha^{k - 1} + \\dots + a_1 \\alpha + a_0 = \\overline{a_k a_{k - 1}\\dots a_1 a_0}^{(\\alpha)}$$\nحيث $0 \\le a_i < \\alpha$ من أجل كل $i \\in \\{0, \\dots, k\\}$ و $a_k \\ne 0$ (وفي الأساس $\\alpha > 10$ نرمز للأرقام $10, 11, 12, \\dots$ بالحروف $A, B, C, \\dots$). للانتقال من الأساس $\\alpha$ إلى الأساس $\\beta$ ، ننشر العدد في النظام العشري ثم نجري القسمات الإقليدية المتتابعة على $\\beta$ .'
			],
			visualSvg: svgNumerationBaseCascade,
			visualCaptionAr:
				'آلية الانتقال بين نظامي تعداد غير عشريين عبر النشر كثير الحدودي والقسمات الإقليدية المتتابعة',
			examples: [
				{
					problemAr:
						'ليكن $n \\in \\mathbb{Z}$ . نضع $a = 3n + 7$ و $b = 2n + 3$ و $d = \\text{PGCD}(a, b)$ . أثبت أن القيم الممكنة للعدد $d$ هي $1$ أو $5$ ، ثم عين قيم $n$ الصحيحة التي يكون من أجلها $d = 5$ .',
					solutionAr:
						'1) **حصر قيم $d$ بحذف $n$**: بما أن $d$ يقسم كلاً من $a = 3n + 7$ و $b = 2n + 3$ ، فإنه يقسم كل تركيبة خطية لهما، وخاصةً:\n$$2a - 3b = 2(3n + 7) - 3(2n + 3) = 6n + 14 - 6n - 9 = 5$$\nبما أن $d \\in \\mathbb{N}^*$ و $d \\mid 5$ والعدد $5$ أولي، فإن $d \\in \\{1, 5\\}$ .\n\n2) **تعيين قيم $n$ حتى يكون $d = 5$**: يكون $d = 5 \\iff 5 \\mid a$ و $5 \\mid b$ .\nنحل الموافقة $2n + 3 \\equiv 0 \\pmod{5} \\iff 2n \\equiv -3 \\equiv 2 \\pmod{5}$ . بضرب الطرفين في $3$ (حيث $3 \\times 2 = 6 \\equiv 1 \\pmod{5}$) نجد $n \\equiv 6 \\equiv 1 \\pmod{5}$ ، أي $n = 5k + 1$ ($k \\in \\mathbb{Z}$).\n**التحقق العكسي**: من أجل $n = 5k + 1$ لدينا $b = 2(5k + 1) + 3 = 5(2k + 1)$ و $a = 3(5k + 1) + 7 = 5(3k + 2)$ ، وبما أن $2(3k + 2) - 3(2k + 1) = 1$ فإن $5$ يقسم $a$ و $b$ معاً فيكون $d = 5$ . ومنه: $d = 5$ إذا وفقط إذا كان $n = 5k + 1$ ($k \\in \\mathbb{Z}$)، و $d = 1$ في بقية الحالات.'
				},
				{
					problemAr:
						'عين جميع قيم العدد الطبيعي $\\alpha$ حتى يكتب العدد $N = \\overline{3421}^{(\\alpha)}$ في نظام التعداد ذي الأساس $\\alpha$ ويكون قابلاً للقسمة على $(\\alpha - 1)$ .',
					solutionAr:
						'1) **شرط وجود الكتابة في الأساس $\\alpha$**: يجب أن يكون الأساس الطبيعي $\\alpha$ أكبر تماماً من جميع الأرقام الظاهرة $\\{3, 4, 2, 1\\}$ ، أي $\\alpha > 4 \\iff \\alpha \\ge 5$ .\n2) **النشر واستعمال الموافقات بترديد $(\\alpha - 1)$**:\n$$N = 3\\alpha^3 + 4\\alpha^2 + 2\\alpha + 1$$\nبما أن $\\alpha = (\\alpha - 1) + 1$ فإن $\\alpha \\equiv 1 \\pmod{\\alpha - 1}$ (حيث $\\alpha - 1 \\ge 4 \\ge 2$). بتعويض القوى بترديد $(\\alpha - 1)$ نجد:\n$$N \\equiv 3(1)^3 + 4(1)^2 + 2(1) + 1 \\equiv 10 \\pmod{\\alpha - 1}$$\nإذن $(\\alpha - 1) \\mid N \\iff (\\alpha - 1) \\mid 10$ . القواسم الطبيعية للعدد $10$ هي $\\{1, 2, 5, 10\\}$ .\nوبمراعاة القيد الجوهري $\\alpha \\ge 5 \\iff \\alpha - 1 \\ge 4$ ، نرفض $1$ و $2$ ونحتفظ بـ $\\alpha - 1 = 5$ أو $\\alpha - 1 = 10$ ، أي $\\alpha \\in \\{6, 11\\}$ .'
				}
			],
			watchOutAr:
				'احذر ثلاثة فخاخ خطيرة في بكالوريا شعبة الرياضيات: (1) الباقي في القسمة الإقليدية في $\\mathbb{Z}$ **موجب أو معدوم دوماً** ويحقق $0 \\le r < |b|$ حصراً؛ فعند قسمة عدد سالب مثل $-45$ على $8$ لا تكتب الباقي $-5$ بل $-45 = 8(-6) + 3$ ! (2) **الاختزال في الموافقات ممنوع عموماً**: العلاقة $ka \\equiv kb \\pmod{n}$ لا تستلزم $a \\equiv b \\pmod{n}$ (مثلاً $2 \\times 3 \\equiv 2 \\times 8 \\pmod{10}$ لكن $3 \\not\\equiv 8 \\pmod{10}$ !). (3) في مسائل التعداد ذات الأساس المجهول $\\alpha$ ، ابدأ دائماً بتحديد الشرط الإلزامي $\\alpha > \\max(a_i)$ لرفض الأسس غير الصالحة.'
		},
		practice: [
			{
				questionAr:
					'حاصل $q$ وباقي $r$ القسمة الإقليدية للعدد الصحيح السالب $a = -2026$ على العدد $b = 11$ في $\\mathbb{Z}$ هما:',
				options: [
					'$q = -184$ و $r = -2$',
					'$q = -185$ و $r = 9$',
					'$q = -184$ و $r = 2$',
					'$q = 185$ و $r = 9$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ فادح: الباقي $r = -2$ سالب، بينما مبرهنة القسمة الإقليدية تشترط $0 \\le r < 11$ !',
					'إجابة صحيحة وممتازة! $2026 = 11(184) + 2 \\implies -2026 = 11(-184) - 2 = 11(-185) + 9$ مع $0 \\le 9 < 11$ .',
					'خطأ في المساواة الجبرية: $11(-184) + 2 = -2024 + 2 = -2022 \\ne -2026$ .',
					'خطأ في إشارة الحاصل: المقسوم سالب والمقسوم عليه موجب فالحاصل سالب حتماً.'
				],
				explanationAr:
					'نقسم أولاً $2026$ على $11$ فنجد $2026 = 11 \\times 184 + 2$ . بضرب المساواة في $-1$ نحصل على $-2026 = 11(-184) - 2$ . ولكي يصبح الباقي موجباً وأصغر تماماً من $11$ ، نطرح $11$ ونضيف $11$ : $-2026 = 11(-184 - 1) + (11 - 2) = 11(-185) + 9$ ، ومنه $q = -185$ و $r = 9$ .'
			},
			{
				questionAr:
					'مجموعة حلول معادلة الموافقة $4x \\equiv 6 \\pmod{10}$ في المجموعة $\\mathbb{Z}$ هي ($k \\in \\mathbb{Z}$):',
				options: [
					'$x = 10k + 4$ فقط',
					'$x = 5k + 4$',
					'$x = 10k + 3$',
					'المعادلة لا تقبل حلولاً في $\\mathbb{Z}$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'حل ناقص! اختزلت خطأً أو أغفلت الحل الثاني بترديد $10$ وهو $x \\equiv 9 \\pmod{10}$ لأن $4(9) = 36 \\equiv 6 \\pmod{10}$ !',
					'إجابة دقيقة وبامتياز! $4x \\equiv 6 \\pmod{10} \\iff 4x - 6 = 10m \\iff 2x - 3 = 5m \\iff 2x \\equiv 3 \\equiv 8 \\pmod{5} \\iff x \\equiv 4 \\pmod{5}$ أي $x = 5k + 4$ (وتجمع $10q + 4$ و $10q + 9$).',
					'خطأ: عند تعويض $x = 3$ نجد $4(3) = 12 \\equiv 2 \\not\\equiv 6 \\pmod{10}$ .',
					'خطأ: المعادلة تقبل حلولاً لأن $\\text{PGCD}(4, 10) = 2$ يقسم $6$ .'
				],
				explanationAr:
					'تكافئ الموافقة $4x \\equiv 6 \\pmod{10}$ وجود $m \\in \\mathbb{Z}$ بحيث $4x - 10m = 6 \\iff 2x - 5m = 3 \\iff 2x \\equiv 3 \\pmod{5}$ . بضرب الطرفين في $3$ (حيث $3 \\times 2 = 6 \\equiv 1 \\pmod{5}$) نجد $x \\equiv 9 \\equiv 4 \\pmod{5}$ ، أي $x = 5k + 4$ ($k \\in \\mathbb{Z}$).'
			},
			{
				questionAr:
					'ما هي قيمة أساس التعداد الطبيعي $\\alpha$ التي تتحقق فيها المساواة الحسابية $\\overline{23}^{(\\alpha)} \\times \\overline{15}^{(\\alpha)} = \\overline{411}^{(\\alpha)}$ ؟',
				options: [
					'$\\alpha = 5$',
					'$\\alpha = 6$',
					'$\\alpha = 7$',
					'$\\alpha = 8$'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ مبدئي فادح! الرقم $5$ ظاهر في الكتابة $\\overline{15}^{(\\alpha)}$ ، فيشترط حتماً $\\alpha > 5$ !',
					'خطأ حسابي: في الأساس $6$ لدينا $(12 + 3)(6 + 5) = 15 \\times 11 = 165$ بينما $\\overline{411}^{(6)} = 4(36) + 6 + 1 = 151 \\ne 165$ .',
					'إجابة صحيحة وممتازة! بالنشر $(2\\alpha + 3)(\\alpha + 5) = 4\\alpha^2 + \\alpha + 1 \\iff 2\\alpha^2 - 12\\alpha - 14 = 0 \\iff \\alpha^2 - 6\\alpha - 7 = 0$ ، والحل الوحيد المحقق لـ $\\alpha > 5$ هو $\\alpha = 7$ .',
					'خطأ حسابي: من أجل $\\alpha = 8$ نجد $19 \\times 13 = 247$ بينما $4(64) + 8 + 1 = 265 \\ne 247$ .'
				],
				explanationAr:
					'يشترط أولاً $\\alpha > \\max(2, 3, 1, 5, 4) = 5$ أي $\\alpha \\ge 6$ . ننشر الطرفين وفق قوى $\\alpha$ :\n$$(2\\alpha + 3)(\\alpha + 5) = 4\\alpha^2 + \\alpha + 1 \\iff 2\\alpha^2 + 13\\alpha + 15 = 4\\alpha^2 + \\alpha + 1$$\n$$\\iff 2\\alpha^2 - 12\\alpha - 14 = 0 \\iff \\alpha^2 - 6\\alpha - 7 = 0 \\iff (\\alpha - 7)(\\alpha + 1) = 0$$\nنرفض $\\alpha = -1$ ونقبل الأساس الوحيد $\\alpha = 7 > 5$ .'
			}
		]
	},

	// =========================================================================
	// ORDER 7: TRIMESTER 1 BAC MATH INTEGRATION & SYNTHESIS
	// =========================================================================
	adaptSharedT1(SHARED_LESSONS_3AS_T1[6], 't1_integration', {
		order: 7,
		domain: 'integration',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: القسمة الإقليدية والموافقات في Z والتعداد وإدماج الفصل الأول',
		titleAr: 'إدماج وحصيلة الفصل الأول: التحليل والمتتاليات والقسمة والموافقات في Z',
		objectives: [
			'حل مسائل تحليل معمقة تدمج الدوال الأسية واللوغاريتمية ودوال القوى والمناقشة البيانية الوسيطية',
			'تجنيد البرهان بالتراجع والمتتاليات العددية بالتكامل مع القسمة الإقليدية والموافقات في Z والتعداد في تمارين برهانية من نمط بكالوريا الرياضيات',
			'بناء استدلالات رياضية محكمة وصياغة براهين دقيقة تحترم سلم التنقيط الرسمي'
		],
		keywordsAr: [
			'مسائل تحليل معمقة',
			'دمج المتتاليات والموافقات',
			'نمط بكالوريا رياضيات',
			'حصيلة الفصل الأول'
		],
		discover: {
			scenarioAr:
				'تتميز مواضيع الفصل الأول لبكالوريا **شعبة الرياضيات (المعامل $7$)** بالربط الذكي بين المحاور: تمرين برهاني يدمج **المتتاليات العددية والموافقات في $\\mathbb{Z}$ والتعداد** ($5$ نقاط)، ومسألة شاملة في التحليل ($7$ نقاط) تربط دالة أسية بمتتالية تراجعية! لندرس المتتالية الصحيحة المعرفة بـ $u_0 = 2$ ومن أجل كل $n \\in \\mathbb{N}$ : $u_{n + 1} = 3 u_n - 1$ ، مع ربطها بالتحليل التراجعي وبواقي القسمة في $\\mathbb{Z}$ .',
			svg: svgCobwebSequencePlot({
				xMin: 0,
				xMax: 4.5,
				yMin: 0,
				yMax: 4.5,
				fn: (x) => x - 1 + 2 * Math.exp(-x),
				u0: 2,
				steps: 4,
				fixedPoint: Math.LN2
			}),
			steps: [
				{
					promptAr:
						'في التمرين الحسابي: نضع $v_n = 2 u_n - 1$ حيث $u_0 = 2$ و $u_{n + 1} = 3 u_n - 1$ . أثبت أن $(v_n)$ متتالية هندسية يطلب تحديد أساسها $q$ .',
					hintAr: 'احسب $v_{n + 1} = 2 u_{n + 1} - 1 = 2(3 u_n - 1) - 1 = 6 u_n - 3$ واستخرج $3$ عاملاً مشتركاً.',
					expectedInput: '3',
					revealAr:
						'لدينا $v_{n + 1} = 2(3 u_n - 1) - 1 = 6 u_n - 3 = 3(2 u_n - 1) = 3 v_n$ . إذن $(v_n)$ متتالية هندسية أساسها $q = 3$ وحدها الأول $v_0 = 2(2) - 1 = 3$ ، ومنه $v_n = 3^{n + 1}$ أي $u_n = \\frac{3^{n + 1} + 1}{2}$ .'
				},
				{
					promptAr:
						'بما أن $2 u_n = 3^{n + 1} + 1$ ، ادرس بترديد $7$ متى يقبل الحد $u_n$ القسمة على $7$ . علماً أن $3^k \\equiv 6 \\equiv -1 \\pmod{7}$ إذا وفقط إذا كان $k = 6m + 3$ ($m \\in \\mathbb{N}$)، ما هي أصغر قيمة للعدد الطبيعي $n$ تجعل $7$ يقسم $u_n$ ؟',
					hintAr: 'ضع الأس $n + 1 = 6m + 3$ وعوض $m = 0$ (تحقق من $u_2$ مباشرة!).',
					expectedInput: '2',
					revealAr:
						'من أجل $n = 2$ نجد $u_2 = \\frac{3^3 + 1}{2} = \\frac{28}{2} = 14 = 7 \\times 2$ ! وبصفة عامة: $7 \\mid u_n \\iff 7 \\mid 2 u_n \\iff 3^{n + 1} \\equiv -1 \\equiv 6 \\pmod{7} \\iff n + 1 = 6m + 3 \\iff n = 6m + 2$ ($m \\in \\mathbb{N}$)، وأصغرها عند $m = 0$ هو $n = 2$ .'
				},
				{
					promptAr:
						'اكتب العدد $2 u_3 - 1 = 3^4$ في نظام التعداد ذي الأساس $3$ (اكتب الأرقام متتالية من اليسار إلى اليمين).',
					hintAr: 'في نظام التعداد ذي الأساس $\\alpha$ ، القوة $\\alpha^k$ تكتب $1$ متبوعاً بـ $k$ أصفار!',
					expectedInput: '10000',
					revealAr:
						'لدينا $2 u_3 - 1 = 3^4 = 1 \\cdot 3^4 + 0 \\cdot 3^3 + 0 \\cdot 3^2 + 0 \\cdot 3^1 + 0 \\cdot 3^0 = \\overline{10000}^{(3)}$ .'
				},
				{
					promptAr:
						'في المسألة الشاملة: لتكن $f(x) = x - 1 + 2e^{-x}$ على $\\mathbb{R}$ ، ولتكن المتتالية $w_0 = 2$ و $w_{n + 1} = f(w_n)$ (الشكل أعلاه). علماً أن $\\ln 2 \\le w_n \\le 2$ وأن $f(x) - x = 2e^{-x} - 1 \\le 0$ على $[\\ln 2; +\\infty[$ ، ما هي القيمة الدقيقة للنهاية $\\lim_{n \\to +\\infty} w_n$ (اكتب `ln2`)؟',
					hintAr: 'المتتالية $(w_n)$ متناقصة ومحدودة من الأدنى بـ $\\ln 2$ ، ونهايتها تحقق $f(\\ell) = \\ell$ .',
					expectedInput: 'ln2',
					revealAr:
						'بما أن $(w_n)$ متناقصة ومحدودة من الأدنى بـ $\\ln 2$ فهي متقاربة نحو حل المعادلة $f(\\ell) = \\ell \\iff 2e^{-\\ell} - 1 = 0 \\iff \\ell = \\ln 2$ .'
				}
			]
		},
		summary: {
			...SHARED_LESSONS_3AS_T1[6].summary,
			rulesAr: [
				...SHARED_LESSONS_3AS_T1[6].summary.rulesAr,
				'**منهجية دمج المتتاليات الصحيحة مع الموافقات والتعداد (نمط التمرين الثالث — 5 نقاط)**:\n1) عندما تُعطى متتالية صحيحة $u_{n + 1} = a u_n + b$ ، ننتقل عبر المتتالية المساعدة الهندسية لاستخراج عبارة صريحة من الشكل $\\alpha u_n = q^n + c$ .\n2) لدراسة قابلية قسمة $u_n$ على عدد $m$ ، ننشئ جدول دورية بواقي $q^n$ بترديد $m$ ونحل موافقة الأس وفق الدور $T$ .\n3) لكتابة حد أو مجموع متتالية هندسية $1 + \\alpha + \\alpha^2 + \\dots + \\alpha^n$ في نظام التعداد ذي الأساس $\\alpha$ ، نلاحظ مباشرة أنه يساوي $\\overline{11\\dots 1}^{(\\alpha)}$ ($n + 1$ مرة الرقم $1$)!'
			]
		}
	})
];

export const LESSONS_3AS_MATH_T1: CurriculumLesson[] = RAW_LESSONS_3AS_MATH_T1;
