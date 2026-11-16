import type { InteractiveLessonData, MathDomain } from '../../types';
import { adaptLessonForTrack } from '../../types';
import { SHARED_LESSONS_3AS_T1 } from '../../secondary_shared_3as/lessons/t1';
import {
	svgCobwebSequencePlot,
	svgFunctionCurvePlot,
	svgVariationTable
} from '../../svg-secondary';

export type CurriculumInteractiveLesson = InteractiveLessonData & {
	domain: MathDomain;
};

// ============================================================================
// Custom Crisp SVGs for 3AS Technical Mathematics (TM) — Trimester 1
// ============================================================================

const svgPowerCycleModTable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 215" width="460" height="215" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">
  <rect x="8" y="8" width="444" height="199" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="230" y="29" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">جدول دورية بواقي القسمة الإقليدية لقوى 3ⁿ على 7 (الدور p = 6)</text>

  <!-- Table Container -->
  <rect x="22" y="42" width="416" height="82" rx="6" fill="#ffffff" stroke="#334155" stroke-width="1.4"/>
  <line x1="22" y1="83" x2="438" y2="83" stroke="#334155" stroke-width="1.2"/>
  <line x1="124" y1="42" x2="124" y2="124" stroke="#334155" stroke-width="1.4"/>
  <line x1="176" y1="42" x2="176" y2="124" stroke="#cbd5e1" stroke-width="1"/>
  <line x1="228" y1="42" x2="228" y2="124" stroke="#cbd5e1" stroke-width="1"/>
  <line x1="280" y1="42" x2="280" y2="124" stroke="#cbd5e1" stroke-width="1"/>
  <line x1="332" y1="42" x2="332" y2="124" stroke="#cbd5e1" stroke-width="1"/>
  <line x1="384" y1="42" x2="384" y2="124" stroke="#cbd5e1" stroke-width="1"/>

  <!-- Row 1: Exponents mod 6 -->
  <rect x="23" y="43" width="100" height="39" fill="#eff6ff"/>
  <text x="73" y="67" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">الأس n (mod 6)</text>
  <text x="150" y="67" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">6k</text>
  <text x="202" y="67" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">6k + 1</text>
  <text x="254" y="67" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">6k + 2</text>
  <text x="306" y="67" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">6k + 3</text>
  <text x="358" y="67" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">6k + 4</text>
  <text x="411" y="67" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">6k + 5</text>

  <!-- Row 2: Remainders mod 7 -->
  <rect x="23" y="84" width="100" height="39" fill="#f0fdf4"/>
  <text x="73" y="108" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#15803d">باقي 3ⁿ على 7</text>
  <circle cx="150" cy="103" r="13" fill="#dcfce7" stroke="#16a34a" stroke-width="1.4"/>
  <text x="150" y="108" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#15803d">1</text>
  <text x="202" y="108" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#1d4ed8">3</text>
  <text x="254" y="108" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#1d4ed8">2</text>
  <circle cx="306" cy="103" r="13" fill="#fee2e2" stroke="#dc2626" stroke-width="1.4"/>
  <text x="306" y="108" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#dc2626">6</text>
  <text x="358" y="108" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#1d4ed8">4</text>
  <text x="411" y="108" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#1d4ed8">5</text>

  <!-- Cycle Banner -->
  <rect x="22" y="138" width="416" height="54" rx="6" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.2"/>
  <text x="230" y="158" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e40af">3⁶ ≡ 1 [7] ⇐ دور البواقي هو أصغر أس موجب يحقق الموافقة لـ 1 وهو p = 6</text>
  <text x="230" y="179" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#dc2626">مثال: 2026 ≡ 3 [7] و 2025 = 6 × 337 + 3 ⇐ 2026²⁰²⁵ ≡ 3³ ≡ 6 [7]</text>
</svg>`;

const svgBaseNumerationDiagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 220" width="460" height="220" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">
  <rect x="8" y="8" width="444" height="204" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="230" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">نشر العدد N = (342)₇ والانتقال إلى الأساس 5 بالقسمات الإقليدية المتتابعة</text>

  <!-- Left panel: Expansion in base 7 -->
  <rect x="20" y="42" width="198" height="154" rx="6" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2"/>
  <text x="119" y="61" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1d4ed8">1) النشر القانوني وفق الأساس 7</text>
  <rect x="44" y="72" width="42" height="34" rx="5" fill="#dbeafe" stroke="#2563eb"/>
  <text x="65" y="94" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e3a8a">3</text>
  <rect x="98" y="72" width="42" height="34" rx="5" fill="#dbeafe" stroke="#2563eb"/>
  <text x="119" y="94" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e3a8a">4</text>
  <rect x="152" y="72" width="42" height="34" rx="5" fill="#dbeafe" stroke="#2563eb"/>
  <text x="173" y="94" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e3a8a">2</text>
  <text x="65" y="121" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#475569">× 7²</text>
  <text x="119" y="121" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#475569">× 7¹</text>
  <text x="173" y="121" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#475569">× 7⁰</text>
  <text x="119" y="148" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">3(49) + 4(7) + 2(1)</text>
  <rect x="44" y="160" width="150" height="24" rx="4" fill="#dcfce7" stroke="#16a34a"/>
  <text x="119" y="176" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#15803d">N = 177 في النظام العشري</text>

  <!-- Right panel: Successive divisions by 5 -->
  <rect x="234" y="42" width="206" height="154" rx="6" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2"/>
  <text x="337" y="61" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#dc2626">2) القسمات المتتابعة لـ 177 على 5</text>
  <text x="337" y="84" text-anchor="middle" font-size="11" fill="#0f172a">177 = 5 × 35 + 2  (a₀ = 2)</text>
  <text x="337" y="104" text-anchor="middle" font-size="11" fill="#0f172a">35  = 5 × 7  + 0  (a₁ = 0)</text>
  <text x="337" y="124" text-anchor="middle" font-size="11" fill="#0f172a">7   = 5 × 1  + 2  (a₂ = 2)</text>
  <text x="337" y="144" text-anchor="middle" font-size="11" fill="#0f172a">1   = 5 × 0  + 1  (a₃ = 1)</text>
  <rect x="252" y="160" width="170" height="24" rx="4" fill="#fef2f2" stroke="#dc2626"/>
  <text x="337" y="176" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#b91c1c">القراءة من الأسفل: N = (1202)₅</text>
</svg>`;

function adaptSharedT1(
	sharedLesson: InteractiveLessonData,
	exactTail: string,
	override: {
		order: number;
		domain: MathDomain;
		sequenceId: string;
		sequenceTitleAr: string;
		titleAr: string;
		objectives: string[];
		keywordsAr: string[];
	}
): CurriculumInteractiveLesson {
	const adapted = adaptLessonForTrack(sharedLesson, '3as_tm', exactTail);
	return {
		...adapted,
		id: `lesson_3as_tm_${exactTail}`,
		slug: `3as-tm-${exactTail.replace(/_/g, '-')}`,
		order: override.order,
		domain: override.domain,
		sequenceId: override.sequenceId,
		sequenceTitleAr: override.sequenceTitleAr,
		titleAr: override.titleAr,
		objectives: override.objectives,
		keywordsAr: override.keywordsAr
	};
}

// ============================================================================
// LESSONS 3AS TM — TRIMESTER 1 (7 Lessons, Grade '3as_tm', yearSubjectId 725)
// ============================================================================

export const LESSONS_3AS_TM_T1: CurriculumInteractiveLesson[] = [
	// =========================================================================
	// LESSON 1 (Order 1, Seq 1): CONTINUITY, IVT (TVI) & DERIVABILITY
	// =========================================================================
	adaptSharedT1(SHARED_LESSONS_3AS_T1[0], 't1_continuity_ivt_derivability', {
		order: 1,
		domain: 'analysis',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: الاستمرارية والاشتقاقية والدالتان الأسية واللوغاريتمية',
		titleAr: 'الاستمرارية، مبرهنة القيم المتوسطة (TVI) والاشتقاقية وتطبيقاتها',
		objectives: [
			'توظيف استمرارية دالة على مجال ومبرهنة القيم المتوسطة (TVI) لإثبات وجود ووحدانية حلول المعادلة f(x) = k وحصرها بالتنصيف',
			'حساب العدد المشتق ومشتق الدالة المركبة والمشتقات المتتابعة، كتابة معادلة المماس والتقريب التآلفي وتعيين نقط الانعطاف',
			'استعمال المشتقات لدراسة اتجاه تغير الدوال كثيرات الحدود والناطقة والصماء (مع المماس الشاقولي) والدوال المثلثية'
		],
		keywordsAr: [
			'الاستمرارية',
			'مبرهنة القيم المتوسطة',
			'مشتق دالة مركبة',
			'التقريب التآلفي',
			'نقطة الانعطاف'
		]
	}),

	// =========================================================================
	// LESSON 2 (Order 2, Seq 1): EXPONENTIAL FUNCTIONS
	// =========================================================================
	adaptSharedT1(SHARED_LESSONS_3AS_T1[1], 't1_exponential_functions', {
		order: 2,
		domain: 'analysis',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: الاستمرارية والاشتقاقية والدالتان الأسية واللوغاريتمية',
		titleAr: 'الدالة الأسية النيبيرية (exp) ودراسة الدوال من الشكل exp∘u',
		objectives: [
			"تعريف الدالة الأسية النيبيرية x ↦ e^x كحل وحيد للمعادلة التفاضلية y' = y يحقق y(0) = 1 واستنتاج خواصها الجبرية والتحليلية",
			'حل المعادلات والمتراجحات الأسية ودراسة إشارة عبارات جبرية تتضمن الدالة الأسية',
			'دراسة الدوال x ↦ e^(kx) والدوال المركبة exp∘u وتمثيلها البياني وتوظيفها في نمذجة الظواهر الفيزيائية والتقنية'
		],
		keywordsAr: [
			'الدالة الأسية النيبيرية',
			"المعادلة y' = y",
			'معادلات ومتراجحات أسية',
			'الدالة المركبة exp∘u'
		]
	}),

	// =========================================================================
	// LESSON 3 (Order 3, Seq 1): LOGARITHMIC FUNCTIONS & y' = ay + b
	// =========================================================================
	adaptSharedT1(SHARED_LESSONS_3AS_T1[2], 't1_logarithmic_functions_diff_eq', {
		order: 3,
		domain: 'analysis',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: الاستمرارية والاشتقاقية والدالتان الأسية واللوغاريتمية',
		titleAr: "الدالة اللوغاريتمية النيبيرية (ln)، اللوغاريتم العشري والمعادلات التفاضلية y' = ay + b",
		objectives: [
			'تعريف الدالة اللوغاريتمية النيبيرية x ↦ ln(x) على ]0, +∞[ واستنتاج خواصها الجبرية والتحليلية وتناظر منحنيها مع منحنى الدالة الأسية',
			'حل معادلات ومتراجحات لوغاريتمية ودراسة الدوال المركبة ln∘u وتعريف اللوغاريتم العشري log وتطبيقاته الهندسية والتقنية',
			"حل المعادلات التفاضلية الخطية من الشكل y' = ay و y' = ay + b وتعيين الحل الخاص المحقق لشرط ابتدائي"
		],
		keywordsAr: [
			'الدالة اللوغاريتمية النيبيرية',
			'اللوغاريتم العشري',
			'الدالة المركبة ln∘u',
			"المعادلة التفاضلية y' = ay + b"
		]
	}),

	// =========================================================================
	// LESSON 4 (Order 4, Seq 2 — TAILORED FOR TM):
	// LIMITS, COMPARATIVE GROWTH, POWER FUNCTIONS, ASYMPTOTIC CURVES & PARAMETRIC STUDY
	// =========================================================================
	{
		...adaptLessonForTrack(
			SHARED_LESSONS_3AS_T1[3],
			'3as_tm',
			't1_limits_comparative_growth_function_study'
		),
		id: 'lesson_3as_tm_t1_limits_comparative_growth_function_study',
		slug: '3as-tm-t1-limits-comparative-growth-function-study',
		order: 4,
		domain: 'analysis',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: النهايات والدراسة الشاملة للدوال والمتتاليات العددية',
		titleAr: 'النهايات، التزايد المقارن، دوال القوى والدراسة الشاملة للدوال والوسيطية',
		objectives: [
			'حساب النهايات باستعمال العمليات الجبرية ومبرهنات المقارنة والحصر ومركب دالتين ونهايات التزايد المقارن الشهيرة ودوال القوى (a^b = e^(b ln a))',
			'دراسة السلوك التقاربي وتعيين المستقيمات المقاربة الموازية للمحورين والمائلة والمنحنيات المقاربة ودراسة الوضعية النسبية',
			'إنجاز الدراسة الشاملة للدوال العددية والوسيطية ومراكز ومحاور التناظر والمناقشة البيانية الوسيطية وحل مسائل الاستمثال'
		],
		keywordsAr: [
			'النهايات والحصر',
			'التزايد المقارن',
			'المستقيم المقارب المائل',
			'دوال القوى',
			'المناقشة البيانية الوسيطية',
			'مسائل الاستمثال'
		],
		discover: {
			scenarioAr:
				'في المسألة الشاملة ($7$ نقاط) لبكالوريا شعبة تقني رياضي، ندمج حساب نهايات التزايد المقارن ودوال القوى مع تعيين المستقيمات والمنحنيات المقاربة والمناقشة البيانية الوسيطية. نعتبر الدالة $f(x) = x - 1 + \\frac{2\\ln x}{x}$ المعرفة على $]0; +\\infty[$ ، وعائلة الدوال الوسيطية $f_m(x) = x - 1 + \\frac{m\\ln x}{x}$ ($m \\in \\mathbb{R}^*$). كيف نحلل السلوك التقاربي، النقطة الثابتة، وأنواع المناقشة البيانية؟',
			svg: svgFunctionCurvePlot({
				fn: (x) => (x > 0 ? x - 1 + (2 * Math.log(x)) / x : Number.NaN),
				xMin: -0.6,
				xMax: 6,
				yMin: -3.5,
				yMax: 5.5,
				curveLabel: 'f(x) = x-1+2ln(x)/x',
				asymptotes: [
					{ kind: 'vertical', value: 0, label: 'x = 0', color: '#dc2626' },
					{ kind: 'oblique', a: 1, b: -1, label: 'y = x - 1', color: '#059669' }
				],
				points: [{ x: 1, y: 0, label: 'A(1, 0)', color: '#1d4ed8' }]
			}),
			steps: [
				{
					promptAr:
						'احسب النهاية $\\lim_{x \\to +\\infty} \\left[f(x) - (x - 1)\\right]$ بتوظيف نهايات التزايد المقارن، واستنتج معادلة المستقيم المقارب المائل $(\\Delta)$ عند $+\\infty$ . ما قيمة هذه النهاية؟',
					hintAr: 'لاحظ أن $f(x) - (x - 1) = \\frac{2\\ln x}{x}$ واستعمل النهاية المرجعية $\\lim_{x \\to +\\infty} \\frac{\\ln x}{x} = 0$ .',
					expectedInput: '0',
					revealAr:
						'لدينا $\\lim_{x \\to +\\infty} \\left[f(x) - (x - 1)\\right] = \\lim_{x \\to +\\infty} \\frac{2\\ln x}{x} = 0$ حسب التزايد المقارن. إذن المستقيم $(\\Delta): y = x - 1$ مقارب مائل لـ $(\\mathcal{C}_f)$ بجوار $+\\infty$ ، ويقع $(\\mathcal{C}_f)$ تحته على $]0; 1[$ وفوقه على $]1; +\\infty[$ متقاطعين في $A(1, 0)$ .'
				},
				{
					promptAr:
						'لو اعتبرنا الدالة $h(x) = x^2 + \\frac{2\\ln x}{x}$ على $]0; +\\infty[$ ، فإن $\\lim_{x \\to +\\infty} [h(x) - x^2] = 0$ ، فنقول إن القطع المكافئ $y = x^2$ **منحنى مقارب** لـ $(\\mathcal{C}_h)$ عند $+\\infty$ . احسب الآن بدستور دوال القوى $x^x = e^{x\\ln x}$ النهاية $\\lim_{x \\to 0^+} x^x$ .',
					hintAr: 'من التزايد المقارن $\\lim_{x \\to 0^+} x\\ln x = 0^-$ ، ثم طبق استمرارية الدالة الأسية عند $0$ .',
					expectedInput: '1',
					revealAr:
						'بما أن $\\lim_{x \\to 0^+} (x\\ln x) = 0^-$ و $\\exp$ مستمرة عند $0$ ، فإن $\\lim_{x \\to 0^+} x^x = e^0 = 1$ .'
				},
				{
					promptAr:
						'ننظر في الحزمة الوسيطية $(\\mathcal{C}_m)$ المعرفة بـ $f_m(x) = x - 1 + m\\frac{\\ln x}{x}$ على $]0; +\\infty[$ . عين فاصلة النقطة الثابتة $A$ التي تشملها جميع المنحنيات $(\\mathcal{C}_m)$ مهما تغير الوسيط $m \\in \\mathbb{R}$ .',
					hintAr: 'تستقل $f_m(x)$ عن الوسيط $m$ عندما ينعدم معامل $m$ أي $\\frac{\\ln x}{x} = 0$ .',
					expectedInput: '1',
					revealAr:
						'نحل $\\frac{\\ln x}{x} = 0 \\iff \\ln x = 0 \\iff x = 1$ ، وعندئذٍ $f_m(1) = 1 - 1 + 0 = 0$ مهما كان $m \\in \\mathbb{R}$ . إذن جميع المنحنيات $(\\mathcal{C}_m)$ تمر بالنقطة الثابتة الوحيدة $A(1, 0)$ .'
				},
				{
					promptAr:
						'ما طبيعة المناقشة البيانية لعدد حلول المعادلة $2\\ln x = mx$ على $]0; +\\infty[$ باستعمال المنحنى $(\\mathcal{C}_f)$ حيث $f(x) = x - 1 + \\frac{2\\ln x}{x}$ (اكتب `مائلة` أو `أفقية` )؟',
					hintAr: 'اقسم طرفي المعادلة على $x > 0$ ثم أضف $(x - 1)$ للطرفين لإظهار $f(x)$ في الطرف الأيسر.',
					expectedInput: 'مائلة',
					revealAr:
						'من أجل $x > 0$ تكافئ المعادلة $\\frac{2\\ln x}{x} = m \\iff x - 1 + \\frac{2\\ln x}{x} = x + m - 1 \\iff f(x) = x + m - 1$ . حلولها هي فواصل تقاطع $(\\mathcal{C}_f)$ مع المستقيمات $y = x + m - 1$ الموازية للمقارب المائل $(\\Delta): y = x - 1$ (معامل التوجيه ثابت يساوي $1$)، فهي مناقشة بيانية **مائلة**.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**مبرهنات المقارنة والحصر ودوال القوى**: إذا تحقق $g(x) \\le f(x) \\le h(x)$ بجوار $+\\infty$ (أو $x_0$) مع $\\lim g = \\lim h = \\ell \\in \\mathbb{R}$ فإن $\\lim f = \\ell$ . من أجل كل $a > 0$ و $b \\in \\mathbb{R}$ نعرف **دالة القوة** $a^b = e^{b\\ln a}$ ؛ وعلى $]0; +\\infty[$ لدينا $(x^\\alpha)\' = \\alpha x^{\\alpha - 1}$ و $(a^x)\' = (\\ln a) a^x$ .',
				'**سلم التزايد المقارن الشهير** (من أجل كل عدد حقيقي $\\alpha > 0$ ، الأسية تغلب القوى والقوى تغلب اللوغاريتم):\n$$\\lim_{x \\to +\\infty} \\frac{e^x}{x^\\alpha} = +\\infty, \\quad \\lim_{x \\to -\\infty} |x|^\\alpha e^x = 0, \\quad \\lim_{x \\to +\\infty} \\frac{\\ln x}{x^\\alpha} = 0^+, \\quad \\lim_{x \\to 0^+} x^\\alpha \\ln x = 0^-$$',
				'**المستقيم المقارب المائل والمنحنى المقارب والوضعية النسبية**:\n- إذا كان $\\lim_{x \\to \\pm\\infty} [f(x) - (ax + b)] = 0$ فالمستقيم $(\\Delta): y = ax + b$ مقارب مائل لـ $(\\mathcal{C}_f)$ .\n- بصفة أعم (خاصة في شعبة تقني رياضي): إذا كان $\\lim_{x \\to \\pm\\infty} [f(x) - g(x)] = 0$ فنقول إن $(\\mathcal{C}_f)$ و $(\\mathcal{C}_g)$ **منحنيان مقاربان** بجوار $\\pm\\infty$ ، وتُحدد وضعيتهما النسبية بدراسة إشارة الفرق $f(x) - g(x)$ .',
				'**التناظر واستنتاج المنحنيات والدالة المساعدة**: المستقيم $x = a$ محور تناظر إذا كان $f(2a - x) = f(x)$ ، والنقطة $\\Omega(a, b)$ مركز تناظر إذا كان $f(2a - x) + f(x) = 2b$ . في المسائل الشاملة نستثمر المعادلة $g(\\alpha) = 0$ للتعبير عن $e^\\alpha$ أو $\\ln \\alpha$ كعبارة ناطقة بدلالة $\\alpha$ وحصر $f(\\alpha)$ بدقة.',
				'**المناقشة البيانية الوسيطية ومسائل الاستمثال التقني**:\n- **أفقية** $f(x) = k(m)$ (موازية لـ $(Ox)$ )، **مائلة** $f(x) = ax + k(m)$ (موازية للمقارب أو المماس ذي الميل الثابت $a$ )، **دورانية** $f(x) = m(x - x_0) + y_0$ (تدور حول النقطة الثابتة $\\omega(x_0, y_0)$ ).\n- في **مسائل الاستمثال الهندسي والصناعي** نصوغ المقدار المطلوب أمثَلته كدالة $S(x)$ على مجال القيود الفيزيائية وندرس إشارة $S\'(x)$ لتعيين القيمة الحدية الشاملة.'
			],
			visualSvg: svgVariationTable({
				xValues: ['0', 'α', '+∞'],
				derivativeRow: [
					{ kind: 'sign', value: '||' },
					{ kind: 'sign', value: '-' },
					{ kind: 'sign', value: '0' },
					{ kind: 'sign', value: '+' }
				],
				variations: [
					{ value: '+∞', position: 'top' },
					{ value: 'f(α)', position: 'bottom' },
					{ value: '+∞', position: 'top' }
				],
				fnName: 'f(x)',
				derivName: "f'(x)"
			}),
			visualCaptionAr:
				'جدول التغيرات النموذجي لدالة رئيسية $f$ على $]0; +\\infty[$ مشتقتها مرتبطة بإشارة دالة مساعدة $g$ تنعدم عند $\\alpha$',
			examples: [
				{
					problemAr:
						'نعتبر الدالة $f(x) = x^2 - 1 + \\frac{2\\ln x + 1}{x}$ على $]0; +\\infty[$ والقطع المكافئ $(P): y = x^2 - 1$ . أثبت أن $(P)$ منحنى مقارب لـ $(\\mathcal{C}_f)$ بجوار $+\\infty$ وادرس وضعيتهما النسبية على $]0; +\\infty[$ .',
					solutionAr:
						'1) نحسب نهاية الفرق عند $+\\infty$ :\n$$\\lim_{x \\to +\\infty} \\left[f(x) - (x^2 - 1)\\right] = \\lim_{x \\to +\\infty} \\left(2\\frac{\\ln x}{x} + \\frac{1}{x}\\right) = 2(0) + 0 = 0$$\nإذن المنحنى $(P)$ ذو المعادلة $y = x^2 - 1$ **منحنى مقارب** لـ $(\\mathcal{C}_f)$ بجوار $+\\infty$ .\n2) **الوضعية النسبية**: بما أن $x > 0$ فإن إشارة الفرق $f(x) - (x^2 - 1) = \\frac{2\\ln x + 1}{x}$ من إشارة $2\\ln x + 1$ :\n$$2\\ln x + 1 = 0 \\iff \\ln x = -\\frac{1}{2} \\iff x = e^{-\\frac{1}{2}} = \\frac{1}{\\sqrt{e}}$$\nومنه $(\\mathcal{C}_f)$ يقع تحت $(P)$ على $\\left]0; \\frac{1}{\\sqrt{e}}\\right[$ ، ويقطعه عند الفاصلة $x = \\frac{1}{\\sqrt{e}}$ ، ويقع فوق $(P)$ على $\\left]\\frac{1}{\\sqrt{e}}; +\\infty\\right[$ .'
				},
				{
					problemAr:
						'مسألة استمثال تقني: يُراد تصميم قناة تصريف مياه مقطعها العرضي مستطيل مفتوح من الأعلى، مساحته الداخلية ثابتة $S = 8\\text{ m}^2$ . إذا كان عرض القاعدة $x > 0$ وارتفاع الجدارين الجانبيين $y > 0$ ، فعيّن البعدين $(x, y)$ لتكون كلفة التبطين (الممثلة بالمحيط المبلل $L(x) = x + 2y$) أصغرية.',
					solutionAr:
						'من قيد المساحة $xy = 8$ نستخرج $y = \\frac{8}{x}$ ($x > 0$). نعوض في دالة المحيط المبلل:\n$$L(x) = x + \\frac{16}{x} \\quad (x \\in ]0; +\\infty[)$$\nنشتق $L$ على $]0; +\\infty[$ : $L\'(x) = 1 - \\frac{16}{x^2} = \\frac{(x - 4)(x + 4)}{x^2}$ .\nبما أن $x + 4 > 0$ و $x^2 > 0$ ، فإن $L\'(x)$ سالبة على $]0; 4[$ وموجبة على $]4; +\\infty[$ وتنعدم عند $x = 4$ .\nإذن يبلغ المحيط المبلل قيمته الحدية الصغرى الشاملة $L(4) = 8\\text{ m}$ من أجل عرض قاعدة $x = 4\\text{ m}$ وارتفاع $y = \\frac{8}{4} = 2\\text{ m}$ (أي $x = 2y$).'
				}
			],
			watchOutAr:
				'احذر ثلاثة فخاخ منهجية في بكالوريا تقني رياضي: (1) يُمنع منعاً باتاً استعمال قاعدة لوبيتال في حساب النهايات؛ اعتمد حصراً على التزايد المقارن أو العدد المشتق أو التحليل والمرافق. (2) في المناقشة البيانية من الشكل $f(x) = ax + e^m$ (أو $f(x) = m^2$) انتبه لقيد مسح الوسيط المساعد $Y = e^m > 0$ (أو $Y = m^2 \\ge 0$) قبل استنتاج قيم $m$ ! (3) إذا كانت $\\lim_{x \\to +\\infty} [f(x) - ax] = b \\in \\mathbb{R}$ فالمقارب المائل هو $y = ax + b$ وليس $y = ax$ .'
		},
		practice: [
			{
				questionAr:
					'من أجل كل $x > 0$ نعتبر الدالة $f(x) = e^x - x^3 - \\ln x$ . قيمة النهاية $\\lim_{x \\to +\\infty} f(x)$ بتوظيف التزايد المقارن هي:',
				options: ['$0$', '$-\\infty$', '$+\\infty$', '$1$'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: الدالة الأسية $e^x$ تنمو أسرع بكثير من $x^3$ ومن $\\ln x$ فلا يتكافأ الطرح نحو الصفر.',
					'خطأ: القوة $x^3$ لا تغلب الأسية $e^x$ بجوار $+\\infty$ .',
					'إجابة صحيحة وممتازة! بإخراج $e^x$ عاملاً مشتركاً نجد $e^x\\left(1 - \\frac{x^3}{e^x} - \\frac{\\ln x}{x} \\cdot \\frac{x}{e^x}\\right) \\to +\\infty \\times (1 - 0 - 0) = +\\infty$ .',
					'خطأ: النهاية غير منتهية لتفوق الدالة الأسية في هرم التزايد المقارن.'
				],
				explanationAr:
					'نخرج الحد الأقوى $e^x$ عاملاً مشتركاً من أجل $x > 0$ : $f(x) = e^x\\left(1 - \\frac{x^3}{e^x} - \\frac{\\ln x}{e^x}\\right)$ . وحسب التزايد المقارن $\\lim_{x \\to +\\infty} \\frac{x^3}{e^x} = 0$ و $\\lim_{x \\to +\\infty} \\frac{\\ln x}{e^x} = 0$ ، ومنه $\\lim_{x \\to +\\infty} f(x) = +\\infty$ .'
			},
			{
				questionAr:
					'نعتبر على $\\mathbb{R}$ حزمة الدوال الوسيطية $f_m(x) = 2x - 1 + (mx - 2m)e^{-x}$ حيث $m \\in \\mathbb{R}$ . جميع المنحنيات $(\\mathcal{C}_m)$ تشمل نقطة ثابتة وحيدة $I$ وتقبل عند $+\\infty$ مستقيماً مقارباً مائلاً مشتركاً $(\\Delta)$ هما:',
				options: [
					'$I(2, 3)$ و $(\\Delta): y = 2x - 1$',
					'$I(2, 0)$ و $(\\Delta): y = 2x - 1$',
					'$I(0, -1)$ و $(\\Delta): y = 2x - 2m$',
					'$I(-2, -5)$ و $(\\Delta): y = 2x + 1$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! نكتب $f_m(x) = 2x - 1 + m(x - 2)e^{-x}$ ؛ ينعدم معامل $m$ عند $x = 2$ فتعطي $y = 2(2) - 1 = 3$ ، وعند $+\\infty$ يؤول $m(x - 2)e^{-x}$ إلى $0$ بالتزايد المقارن فيكون $(\\Delta): y = 2x - 1$ مقارباً مشتركاً.',
					'خطأ: وجدت الفاصلة الثابتة $x = 2$ بدقة لكن نسيت التعويض في $2x - 1$ لحساب الترتيب $y = 3$ .',
					'خطأ: عند $x = 0$ يكون $f_m(0) = -1 - 2m$ وهو متعلق بـ $m$ ، كما أن معادلة المقارب المشترك مستقلة عن $m$ .',
					'خطأ في إشارة الجذر: $x - 2 = 0$ تعطي $x = +2$ وليس $-2$ .'
				],
				explanationAr:
					'بتعميل $m$ نجد $f_m(x) = 2x - 1 + m(x - 2)e^{-x}$ . تنعدم مساهمة $m$ مهما تغير في $\\mathbb{R}$ إذا وفقط إذا كان $(x - 2)e^{-x} = 0 \\iff x = 2$ ، ومنه $y = f_m(2) = 3$ أي $I(2, 3)$ . وبجوار $+\\infty$ لدينا $\\lim_{x \\to +\\infty} m(x - 2)e^{-x} = 0$ ، فالمستقيم $(\\Delta): y = 2x - 1$ مقارب مائل مشترك لجميع $(\\mathcal{C}_m)$ .'
			},
			{
				questionAr:
					'إذا كان المنحنى $(\\mathcal{C}_f)$ يحقق من أجل كل $x \\in \\mathbb{R}$ العلاقة $f(2 - x) + f(x) = 6$ ، ولدينا $(g(x) = 5^x)$ ، فإن مركز تناظر $(\\mathcal{C}_f)$ ومشتقة $g$ هما:',
				options: [
					'$\\Omega(2, 6)$ و $g\'(x) = x \\cdot 5^{x - 1}$',
					'$\\Omega(1, 3)$ و $g\'(x) = (\\ln 5) \\cdot 5^x$',
					'$\\Omega(1, 6)$ و $g\'(x) = 5^x$',
					'$\\Omega(2, 3)$ و $g\'(x) = \\frac{5^x}{\\ln 5}$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ مزدوج: نسيت قسمة $2a = 2$ و $2b = 6$ على $2$ ، وطبقت قانون اشتقاق $x^n$ بدلاً من دالة القوة الأسية $a^x = e^{x\\ln a}$ !',
					'إجابة دقيقة وممتازة! بمطابقة $f(2a - x) + f(x) = 2b$ نجد $a = 1, b = 3$ أي $\\Omega(1, 3)$ ، ومن $5^x = e^{x\\ln 5}$ نجد $g\'(x) = (\\ln 5) \\cdot 5^x$ .',
					'خطأ: نسيت قسمة $2b = 6$ على $2$ ونسيت الضرب في $\\ln 5$ عند اشتقاق $5^x$ .',
					'خطأ: $2a = 2$ تعطي $a = 1$ لا $2$ ، والقسمة على $\\ln 5$ تخص الدالة الأصلية لا المشتقة.'
				],
				explanationAr:
					'من دستور مركز التناظر $f(2a - x) + f(x) = 2b$ نطابق $2a = 2 \\implies a = 1$ و $2b = 6 \\implies b = 3$ ، فمركز التناظر هو $\\Omega(1, 3)$ . ولدينا $g(x) = 5^x = e^{x\\ln 5}$ ومشتقتها $g\'(x) = (\\ln 5)e^{x\\ln 5} = (\\ln 5) \\cdot 5^x$ .'
			}
		]
	},

	// =========================================================================
	// LESSON 5 (Order 5, Seq 2): NUMERICAL SEQUENCES, INDUCTION & ADJACENT SEQUENCES
	// =========================================================================
	adaptSharedT1(SHARED_LESSONS_3AS_T1[5], 't1_numerical_sequences_induction', {
		order: 5,
		domain: 'analysis',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: النهايات والدراسة الشاملة للدوال والمتتاليات العددية',
		titleAr: 'المتتاليات العددية، الاستدلال بالتراجع والمتتاليتان المتجاورتان',
		objectives: [
			'توليد متتالية عددية صريحة u_n = f(n) أو تراجعية u_{n+1} = f(u_n) وتخمين سلوكها وتقاربها بيانيا واستثمار المتتاليات الحسابية والهندسية',
			'إتقان مبدأ الاستدلال بالتراجع لإثبات الخواص والمساويات والمتباينات وحصر الحدود بدلالة n',
			'دراسة الرتابة والمحدودية والتقارب وإثبات تجاور متتاليتين واستنتاج تقاربهما نحو نفس النهاية'
		],
		keywordsAr: [
			'متتالية تراجعية',
			'البرهان بالتراجع',
			'المتتالية الحسابية والهندسية',
			'تقارب متتالية',
			'المتتاليتان المتجاورتان'
		]
	}),

	// =========================================================================
	// LESSON 6 (Order 6, Seq 3 — STREAM EXCLUSIVE FOR TM):
	// EUCLIDEAN DIVISION, CONGRUENCES IN Z & NUMERATION BASES
	// =========================================================================
	{
		id: 'lesson_3as_tm_t1_euclidean_division_congruences_numeration',
		slug: '3as-tm-t1-euclidean-division-congruences-numeration',
		grade: '3as_tm',
		yearSubjectId: 725,
		trimesterId: 't1',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: القسمة الإقليدية والموافقات في Z والتعداد وإدماج الفصل الأول',
		order: 6,
		domain: 'arithmetic_z',
		titleAr: 'القسمة الإقليدية والموافقات في Z والتعداد',
		objectives: [
			'برهان وتوظيف خواص قابلية القسمة في Z وإجراء القسمة الإقليدية في Z (a = bq + r مع 0 ≤ r < |b|)',
			'حساب القاسم المشترك الأكبر (PGCD) لعددين صحيحين باستعمال خوارزمية إقليدس وتوظيف خواصه PGCD(ka, kb) = |k|PGCD(a, b)',
			'معرفة وتوظيف خواص الموافقات بترديد n في Z (التلاؤم مع الجمع والضرب والقوى) لتعيين بواقي القسمة ودراسة قابلية القسمة وحل معادلات موافقات',
			'كتابة ونشر عدد طبيعي وفق أساس α (N = a_n α^n + ... + a_1 α + a_0) والانتقال بين نظامي تعداد أساساهما α و β'
		],
		keywordsAr: [
			'قابلية القسمة في Z',
			'القسمة الإقليدية في Z',
			'خوارزمية إقليدس و PGCD',
			'الموافقات في Z',
			'بواقي القسمة',
			'التعداد وفق أساس'
		],
		discover: {
			scenarioAr:
				'يُعد محور **الأعداد والحساب في $\\mathbb{Z}$** ركيزة مميزة لشعبة تقني رياضي في امتحان البكالوريا (التمرين الثالث ذو $5$ نقاط غالباً)، وتطبيقاته حاسمة في التشفير الرقمي وأنظمة العد الحاسوبية. لنتتبع أربع محطات مترابطة: القسمة الإقليدية لعدد سالب في $\\mathbb{Z}$ ، خوارزمية إقليدس، دورية بواقي القسمة لقوى عدد طبيعي بترديد $n$ ، والانتقال بين نظم التعداد!',
			svg: svgPowerCycleModTable,
			steps: [
				{
					promptAr:
						'أجرِ القسمة الإقليدية للعدد الصحيح السالب $a = -137$ على العدد الطبيعي $b = 11$ في $\\mathbb{Z}$ بكتابته على الشكل $-137 = 11q + r$ مع الشرط الصارم $0 \\le r < 11$ . ما هي قيمة الباقي الإقليدي $r$ ؟',
					hintAr: 'لدينا $137 = 11 \\times 12 + 5 \\implies -137 = 11(-12) - 5$ . اطرح $11$ وأضف $11$ لكي يصبح الباقي موجباً محصوراً بين $0$ و $10$ !',
					expectedInput: '6',
					revealAr:
						'من $137 = 11 \\times 12 + 5$ نضرب في $-1$ فنجد $-137 = 11(-12) - 5 = 11(-12 - 1) + (11 - 5) = 11(-13) + 6$ . بما أن $0 \\le 6 < 11$ ، فإن الحاصل هو $q = -13$ والباقي الإقليدي الوحيد هو $r = 6$ .'
				},
				{
					promptAr:
						'طبّق خوارزمية إقليدس لتعيين القاسم المشترك الأكبر $d = \\text{PGCD}(252, 198)$ . ما قيمة $d$ ؟',
					hintAr: 'نفذ القسمات المتتابعة: $252 = 198 \\times 1 + 54$ ، ثم $198 = 54 \\times 3 + 36$ ، ثم اقسم $54$ على $36$ إلى آخر باقٍ غير معدوم.',
					expectedInput: '18',
					revealAr:
						'نجري القسمات الإقليدية المتتابعة:\n- $252 = 198 \\times 1 + 54$\n- $198 = 54 \\times 3 + 36$\n- $54 = 36 \\times 1 + 18$\n- $36 = 18 \\times 2 + 0$\nآخر باقٍ غير معدوم هو $18$ ، إذن $\\text{PGCD}(252, 198) = 18$ .'
				},
				{
					promptAr:
						'بالاستعانة بجدول دورية بواقي $3^n$ بترديد $7$ الموضح في الشكل أعلاه (حيث الدور $p = 6$ و $3^6 \\equiv 1 \\pmod{7}$ )، استنتج باقي القسمة الإقليدية للعدد الكبير $2026^{2025}$ على $7$ .',
					hintAr: 'اختزل الأساس أولاً بترديد $7$ ($2026 = 7 \\times 289 + 3$) ثم اختزل الأس $2025$ بترديد الدور $6$ ($2025 = 6 \\times 337 + 3$).',
					expectedInput: '6',
					revealAr:
						'1) الأساس: $2026 = 7 \\times 289 + 3 \\implies 2026 \\equiv 3 \\pmod{7}$ ، ومنه $2026^{2025} \\equiv 3^{2025} \\pmod{7}$ .\n2) الأس: نقسم $2025$ على الدور $6$ فنجد $2025 = 6 \\times 337 + 3$ .\nإذن $3^{2025} = (3^6)^{337} \\times 3^3 \\equiv 1^{337} \\times 27 \\equiv 6 \\pmod{7}$ . الباقي المطلوب هو $6$ .'
				},
				{
					promptAr:
						'يُكتب عدد طبيعي $N$ في نظام التعداد ذي الأساس $7$ على الشكل $N = \\overline{342}^{7}$ . انشر $N$ وفق قوى الأساس $7$ واحسب قيمته في النظام العشري (الأساس $10$).',
					hintAr: 'طبق دستور النشر الموضعي: $N = 3 \\times 7^2 + 4 \\times 7^1 + 2 \\times 7^0$ .',
					expectedInput: '177',
					revealAr:
						'النشر القانوني يعطي $N = 3 \\times 49 + 4 \\times 7 + 2 \\times 1 = 147 + 28 + 2 = 177$ . وبالقسمات المتتابعة لـ $177$ على $5$ نحصل على كتابته في النظام الخماسي $N = \\overline{1202}^{5}$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**قابلية القسمة في $\\mathbb{Z}$ وخاصية التوليف الخطي**: نقول إن العدد الصحيح غير المعدوم $a$ يقسم $b$ (ونكتب $a \\mid b$) إذا وُجد $k \\in \\mathbb{Z}$ بحيث $b = ka$ . **الخاصية الذهبية في البكالوريا**: إذا كان $d \\mid a$ و $d \\mid b$ فإنه من أجل كل $(\\alpha, \\beta) \\in \\mathbb{Z}^2$ لدينا $d \\mid (\\alpha a + \\beta b)$ (تُستعمل لحذف المجهول $n$ عند حصر القواسم المشتركة لعبارتين تتعلقان بـ $n$).',
				'**القسمة الإقليدية في $\\mathbb{Z}$ وخوارزمية إقليدس**: من أجل كل $a \\in \\mathbb{Z}$ وكل $b \\in \\mathbb{Z}^*$ توجد ثنائية وحيدة $(q, r) \\in \\mathbb{Z}^2$ تحقق:\n$$a = bq + r, \\qquad 0 \\le r < |b|$$\n- لحساب $\\text{PGCD}(a, b)$ لعددين طبيعيين غير معدومين نستعمل خوارزمية إقليدس اعتماداً على $\\text{PGCD}(a, b) = \\text{PGCD}(b, r)$ (آخر باقٍ غير معدوم)، مع خاصية التجانس: من أجل كل $k \\in \\mathbb{Z}^*$ ، $\\text{PGCD}(ka, kb) = |k|\\,\\text{PGCD}(a, b)$ .',
				'**الموافقات في $\\mathbb{Z}$ بترديد $n$ ($n \\in \\mathbb{N}^*, n \\ge 2$)**: نكتب $a \\equiv b \\pmod{n}$ (أو $a \\equiv b\\;[n]$) إذا وفقط إذا كان $n \\mid (a - b)$ (أي لـ $a$ و $b$ نفس باقي القسمة الإقليدية على $n$). يكون $r$ باقي قسمة $a$ على $n$ إذا وفقط إذا تحقق **الشرطان معاً**: $a \\equiv r \\pmod{n}$ **و** $0 \\le r < n$ .\n- **خواص التلاؤم**: إذا كان $a \\equiv b \\pmod{n}$ و $c \\equiv d \\pmod{n}$ فإن $a + c \\equiv b + d \\pmod{n}$ ، $a - c \\equiv b - d \\pmod{n}$ ، $ac \\equiv bd \\pmod{n}$ ، ومن أجل كل $k \\in \\mathbb{N}^*$ : $a^k \\equiv b^k \\pmod{n}$ .',
				'**منهجية دراسة بواقي القوى $a^n$ بترديد $m$**: نحسب بواقي $a^0, a^1, a^2, \\dots$ على $m$ حتى نصادف أول أس $p \\in \\mathbb{N}^*$ يحقق $a^p \\equiv 1 \\pmod{m}$ (يُسمى $p$ دور البواقي). عندئذٍ من أجل كل $n = pq + r$ ($0 \\le r < p$) يكون $a^n = (a^p)^q \\cdot a^r \\equiv a^r \\pmod{m}$ ، ونلخص المناقشة في جدول تبعاً لبواقي $n$ على $p$ .',
				'**نظم التعداد ذات الأساس $\\alpha$ ($\\alpha \\in \\mathbb{N}, \\alpha \\ge 2$)**: كل عدد طبيعي غير معدوم $N$ يُنشر بطريقة وحيدة وفق قوى الأساس $\\alpha$ :\n$$N = \\overline{a_k a_{k-1} \\dots a_1 a_0}^{\\alpha} = a_k \\alpha^k + a_{k-1}\\alpha^{k-1} + \\dots + a_1 \\alpha + a_0$$\nمع **شرط الأرقام الإلزامي**: $0 \\le a_i < \\alpha$ لكل $i$ و $a_k \\ne 0$ (وفي الأساس $\\alpha > 10$ تُرمز الأرقام $10, 11, 12, \\dots$ بالحروف $A, B, C, \\dots$). للانتقال من الأساس $\\alpha$ إلى الأساس $\\beta$ نمر عبر النشر في الأساس $10$ ثم القسمات الإقليدية المتتابعة على $\\beta$ (مع وجود اختصار التجميع المباشر إذا كان $\\beta = \\alpha^m$ كالانتقال بين الأساسين $2$ و $8 = 2^3$ أو $16 = 2^4$).'
			],
			visualSvg: svgBaseNumerationDiagram,
			visualCaptionAr:
				'آلية الانتقال المزدوج بين نظامين للتعداد (من الأساس $7$ إلى الأساس $5$ مروراً بالنشر العشري والقسمات المتتابعة)',
			examples: [
				{
					problemAr:
						'1) ادرس حسب قيم العدد الطبيعي $n$ بواقي القسمة الإقليدية للعدد $4^n$ على $11$ .\n2) استنتج أنه من أجل كل عدد طبيعي $n$ يقبل العدد $A_n = 4^{5n + 2} + 3 \\times 15^n + 2 \\times (-7)^{5n}$ القسمة على $11$ (من أجل $n$ زوجي، ثم عين الشرط العام لـ $n$).',
					solutionAr:
						'1) نحسب القوى المتتابعة لـ $4$ بترديد $11$ :\n- $4^0 \\equiv 1 \\pmod{11}$ ، $4^1 \\equiv 4 \\pmod{11}$ ، $4^2 = 16 \\equiv 5 \\pmod{11}$ ، $4^3 \\equiv 20 \\equiv 9 \\pmod{11}$ ، $4^4 \\equiv 36 \\equiv 3 \\pmod{11}$ ، $4^5 \\equiv 12 \\equiv 1 \\pmod{11}$ .\nإذن دور بواقي $4^n$ على $11$ هو $p = 5$ : من أجل $n = 5k + r$ ($r \\in \\{0, 1, 2, 3, 4\\}$) توافق $4^n$ على الترتيب $1, 4, 5, 9, 3$ بترديد $11$ .\n\n2) نبسط حدود $A_n$ بترديد $11$ : نلاحظ أن $15 \\equiv 4 \\pmod{11}$ و $-7 \\equiv 4 \\pmod{11}$ ! إذن:\n- $4^{5n + 2} = (4^5)^n \\times 4^2 \\equiv 1^n \\times 5 \\equiv 5 \\pmod{11}$\n- $3 \\times 15^n \\equiv 3 \\times 4^n \\pmod{11}$\n- $2 \\times (-7)^{5n} \\equiv 2 \\times 4^{5n} = 2 \\times (4^5)^n \\equiv 2 \\times 1^n \\equiv 2 \\pmod{11}$\nبالجمع نجد: $A_n \\equiv 5 + 3 \\times 4^n + 2 \\equiv 7 + 3 \\times 4^n \\pmod{11}$ .\nيكون $11 \\mid A_n \\iff 3 \\times 4^n + 7 \\equiv 0 \\pmod{11} \\iff 3 \\times 4^n \\equiv 4 \\pmod{11}$ .\nبفحص جدول الحالات الخمس لـ $4^n \\pmod{11}$ نجد $3(1)+7=10$ ، $3(4)+7=19\\equiv 8$ ، $3(5)+7=22 \\equiv 0 \\pmod{11}$ (محققة فقط عند $4^n \\equiv 5$!)، $3(9)+7=34\\equiv 1$ ، $3(3)+7=16\\equiv 5$ . إذن $11 \\mid A_n \\iff n = 5k + 2$ ($k \\in \\mathbb{N}$).'
				},
				{
					problemAr:
						'عيّن الأساس الطبيعي $\\alpha$ الذي تتحقق فيه المساواة $\\overline{231}^{\\alpha} = \\overline{133}^{\\alpha + 2}$ ، ثم اكتب هذا العدد في النظام العشري وفي النظام الثنائي (الأساس $2$).',
					solutionAr:
						'1) **شرط وجود الكتابتين في التعداد**: الأرقام المستعملة في الأساس $\\alpha$ هي $1, 2, 3$ فيلزم $\\alpha > 3$ (أي $\\alpha \\ge 4$)، وفي الأساس $\\alpha + 2$ يظهر الرقم $3$ فيلزم $\\alpha + 2 > 3 \\iff \\alpha > 1$ . الشرط المشترك هو $\\alpha \\in \\mathbb{N}$ و $\\alpha \\ge 4$ .\n2) **النشر الجبري وفق الأساسين**:\n$$2\\alpha^2 + 3\\alpha + 1 = 1(\\alpha + 2)^2 + 3(\\alpha + 2) + 3 = \\alpha^2 + 7\\alpha + 13$$\n$$\\alpha^2 - 4\\alpha - 12 = 0 \\iff (\\alpha - 6)(\\alpha + 2) = 0$$\nنرفض $\\alpha = -2$ ونقبل الحل الوحيد $\\alpha = 6 \\ge 4$ .\n3) **الكتابة العشرية والثنائية**: في الأساس $10$ لدينا $N = 2(6^2) + 3(6) + 1 = 72 + 18 + 1 = 91$ . وفي النظام الثنائي: $91 = 64 + 16 + 8 + 2 + 1 = 2^6 + 2^4 + 2^3 + 2^1 + 2^0 = \\overline{1011011}^{2}$ .'
				}
			],
			watchOutAr:
				'أربعة فخاخ قاتلة في تمارين الحساب بـ $\\mathbb{Z}$ في البكالوريا: (1) التصريح بأن $-3$ أو $12$ هو «باقي» قسمة عدد على $9$ ! الموافقة $a \\equiv -3 \\pmod{9}$ صحيحة كموافقة، لكن **الباقي الإقليدي** يجب أن يحقق $0 \\le r < 9$ أي $r = 6$ . (2) الاختزال العشوائي في الموافقات: من $2x \\equiv 4 \\pmod{6}$ لا ينتج $x \\equiv 2 \\pmod{6}$ فقط، بل $x \\equiv 2 \\pmod{3}$ أي $x \\equiv 2$ أو $x \\equiv 5 \\pmod{6}$ (استعمل جدول الموافقات بترديد $6$). (3) نسيان شرط التعداد $\\alpha > \\max(a_i)$ قبل حل معادلة الأساس $\\alpha$ . (4) إياك وتطبيق الموافقة في الأس مباشرة: من $a \\equiv b \\pmod{n}$ **لا ينتج** $c^a \\equiv c^b \\pmod{n}$ بل يجب اختزال الأس بترديد **دور القوى $p$** وليس بترديد $n$ !'
		},
		practice: [
			{
				questionAr:
					'الحاصل $q$ والباقي $r$ للقسمة الإقليدية للعدد الصحيح $a = -2026$ على $b = 9$ في $\\mathbb{Z}$ هما:',
				options: [
					'$q = -225$ و $r = -1$',
					'$q = -226$ و $r = 8$',
					'$q = -225$ و $r = 1$',
					'$q = 226$ و $r = 8$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ كلاسيكي في البكالوريا! رغم أن $9(-225) - 1 = -2026$ ، إلا أن الباقي الإقليدي لا يمكن أن يكون سالباً ($r \\ge 0$ دائماً)!',
					'إجابة صحيحة وممتازة! مجموع أرقام $2026$ هو $10 = 9(1) + 1$ فـ $2026 = 9(225) + 1$ ، ومنه $-2026 = 9(-225) - 1 = 9(-226) + 8$ مع $0 \\le 8 < 9$ .',
					'خطأ حسابي: $9(-225) + 1 = -2025 + 1 = -2024 \\ne -2026$ .',
					'خطأ في إشارة الحاصل: بما أن المقسوم سالب والمقسوم عليه موجب فإن الحاصل سالب حتماً.'
				],
				explanationAr:
					'لدينا $2026 = 9 \\times 225 + 1$ . بالضرب في $-1$ نحصل على $-2026 = 9(-225) - 1 = 9(-225 - 1) + (9 - 1) = 9(-226) + 8$ . وبما أن $0 \\le 8 < 9$ ، فإن الثنائية الوحيدة هي $(q, r) = (-226, 8)$ .'
			},
			{
				questionAr:
					'باقي القسمة الإقليدية للعدد $5^{2026}$ على $13$ هو:',
				options: ['$1$', '$5$', '$12$', '$8$'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: الباقي $1$ يوافق الأسس المضاعفة للدور $4$ ($2024$ مثلاً)، بينما $2026 = 4 \\times 506 + 2$ .',
					'خطأ: الباقي $5$ يوافق الأسس من الشكل $4k + 1$ وليس $4k + 2$ .',
					'إجابة صحيحة! نلاحظ أن $5^2 = 25 \\equiv -1 \\equiv 12 \\pmod{13}$ ومنه $5^4 \\equiv 1 \\pmod{13}$ (الدور $4$). وبما أن $2026 = 4(506) + 2$ فإن $5^{2026} \\equiv 5^2 \\equiv 12 \\pmod{13}$ .',
					'خطأ: القيمة $8$ توافق $5^3 = 125 = 13(9) + 8$ أي حالة الأس $4k + 3$ .'
				],
				explanationAr:
					'نحسب قوى $5$ بترديد $13$ : $5^1 \\equiv 5$ ، $5^2 = 25 = 2(13) - 1 \\equiv 12 \\equiv -1 \\pmod{13}$ ، وبتربيعها $5^4 \\equiv (-1)^2 \\equiv 1 \\pmod{13}$ . إذن دور البواقي هو $4$ . نقسم الأس $2026$ على $4$ فنجد $2026 = 4 \\times 506 + 2$ ، ومنه $5^{2026} = (5^4)^{506} \\times 5^2 \\equiv 1 \\times 12 \\equiv 12 \\pmod{13}$ ، وبما أن $0 \\le 12 < 13$ فالباقي هو $12$ .'
			},
			{
				questionAr:
					'إذا علمت أن العدد الطبيعي $N$ يُكتب في نظام التعداد ذي الأساس $\\alpha$ على الشكل $N = \\overline{304}^{\\alpha}$ ويساوي $151$ في النظام العشري، فإن قيمة الأساس $\\alpha$ هي:',
				options: ['$\\alpha = 4$', '$\\alpha = 7$', '$\\alpha = -7$', '$\\alpha = 6$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ فادح في شرط التعداد! يظهر الرقم $4$ في الكتابة $\\overline{304}^{\\alpha}$ فيستحيل أن يكون الأساس $\\alpha = 4$ (يجب $\\alpha > 4$).',
					'إجابة صحيحة! الشرط $\\alpha > 4$ ، وبالنشر $3\\alpha^2 + 0\\cdot\\alpha + 4 = 151 \\iff 3\\alpha^2 = 147 \\iff \\alpha^2 = 49$ ، وبما أن $\\alpha > 4$ فإن $\\alpha = 7$ .',
					'خطأ: أساس نظام التعداد عدد طبيعي أكبر من أو يساوي $2$ دوماً ولا يمكن أن يكون سالباً.',
					'خطأ حسابي: من أجل $\\alpha = 6$ نجد $3(36) + 4 = 112 \\ne 151$ .'
				],
				explanationAr:
					'بما أن الرقم $4$ مستعمل في الكتابة $\\overline{304}^{\\alpha}$ فيشترط $\\alpha \\in \\mathbb{N}$ و $\\alpha > 4$ . النشر وفق الأساس $\\alpha$ يعطي $3\\alpha^2 + 4 = 151 \\iff 3\\alpha^2 = 147 \\iff \\alpha^2 = 49$ ، ومنه $\\alpha = 7$ (لأن $\\alpha > 4$).'
			}
		]
	},

	// =========================================================================
	// LESSON 7 (Order 7, Seq 3 — TAILORED TM T1 INTEGRATION):
	// FUNCTIONS, SEQUENCES & ARITHMETIC IN Z (CONGRUENCES + NUMERATION)
	// =========================================================================
	{
		id: 'lesson_3as_tm_t1_integration',
		slug: '3as-tm-t1-integration',
		grade: '3as_tm',
		yearSubjectId: 725,
		trimesterId: 't1',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: القسمة الإقليدية والموافقات في Z والتعداد وإدماج الفصل الأول',
		order: 7,
		domain: 'integration',
		titleAr: 'إدماج وحصيلة الفصل الأول: الدوال والمتتاليات والقسمة والموافقات في Z',
		objectives: [
			'حل مسائل شاملة في التحليل تدمج الدوال الأسية واللوغاريتمية والتزايد المقارن ومبرهنة القيم المتوسطة والمناقشة البيانية',
			'تجنيد البرهان بالتراجع والمتتاليات المتجاورتين بالتكامل مع بواقي القسمة والموافقات في Z ونظم التعداد في تمارين مركبة من نمط بكالوريا تقني رياضي',
			'ترسيخ منهجية الصياغة البرهانية الدقيقة وفق سلم التنقيط الرسمي للبكالوريا'
		],
		keywordsAr: [
			'مسائل شاملة في التحليل',
			'تمارين الموافقات والمتتاليات',
			'نمط بكالوريا تقني رياضي',
			'حصيلة الفصل الأول'
		],
		discover: {
			scenarioAr:
				'في مواضيع بكالوريا **شعبة تقني رياضي** (المدة $4$ ساعات و $30$ دقيقة، المعامل $6$)، يتجلى التميز في نوعين من التمارين المركبة خلال الفصل الأول:\n1) **دمج المتتاليات مع الموافقات والتعداد في $\\mathbb{Z}$** (التمرين الثالث — $5$ نقاط): متتالية معرفة بـ $v_0 = 5$ و $v_{n+1} = 4v_n - 3$ ندرس بواقي حدودها بترديد $5$ ونكتب حدها العام في نظام التعداد ذي الأساس $4$ !\n2) **دمج الدالة الأسية مع المتتالية التراجعية** (المسألة الشاملة — $7$ نقاط): $f(x) = x - 1 + 2e^{-x}$ والمتتالية $u_0 = 2, u_{n+1} = f(u_n)$ .',
			svg: svgCobwebSequencePlot({
				xMin: 0,
				xMax: 3,
				yMin: 0,
				yMax: 3,
				fn: (x) => x - 1 + 2 * Math.exp(-x),
				u0: 2,
				steps: 4,
				fixedPoint: Math.LN2
			}),
			steps: [
				{
					promptAr:
						'**التمرين الأول (متتاليات + موافقات وتعداد)**: في المتتالية $v_0 = 5$ و $v_{n+1} = 4v_n - 3$ ، نضع $w_n = v_n - 1$ فتكون $(w_n)$ هندسية أساسها $4$ وحدها الأول $w_0 = 4$ ، ومنه $v_n = 4^{n+1} + 1$ . ما هو باقي القسمة الإقليدية للحد $v_{2025}$ على $5$ ؟',
					hintAr: 'لاحظ أن $4 \\equiv -1 \\pmod{5}$ ، إذن $v_n = 4^{n+1} + 1 \\equiv (-1)^{n+1} + 1 \\pmod{5}$ وعوض $n = 2025$ (فيصبح الأس $2026$ زوجياً).',
					expectedInput: '2',
					revealAr:
						'بما أن $4 \\equiv -1 \\pmod{5}$ فإن $v_n \\equiv (-1)^{n+1} + 1 \\pmod{5}$ . من أجل $n = 2025$ يكون $n + 1 = 2026$ عدداً زوجياً، إذن $v_{2025} \\equiv (-1)^{2026} + 1 = 1 + 1 = 2 \\pmod{5}$ . وبما أن $0 \\le 2 < 5$ فالباقي هو $2$ (بينما من أجل $n$ زوجي يقبل $v_n$ القسمة على $5$!).'
				},
				{
					promptAr:
						'نريد كتابة الحد $v_3 = 4^4 + 1$ في نظام التعداد ذي الأساس $4$ . ما هي الكتابة الرمزية المضبوطة لـ $v_3$ في الأساس $4$ (اكتب الأرقام فقط مثل `10001` )؟',
					hintAr: 'انشر القوى: $4^4 + 1 = 1 \\times 4^4 + 0 \\times 4^3 + 0 \\times 4^2 + 0 \\times 4^1 + 1 \\times 4^0$ .',
					expectedInput: '10001',
					revealAr:
						'بما أن $v_3 = 1 \\cdot 4^4 + 0 \\cdot 4^3 + 0 \\cdot 4^2 + 0 \\cdot 4^1 + 1 \\cdot 4^0$ والأرقام $0, 1 < 4$ ، فإن $v_3 = \\overline{10001}^{4}$ ! وبصفة عامة يُكتب $v_n$ في الأساس $4$ على الشكل $\\overline{1\\underbrace{00\\dots0}_{n\\text{ zeros}}1}^{4}$ (عدد أرقامه $n + 2$).'
				},
				{
					promptAr:
						'**التمرين الثاني (تحليل + متتالية تراجعية)**: في الدالة $f(x) = x - 1 + 2e^{-x}$ ، لدينا $f\'(x) = 1 - 2e^{-x}$ وتنعدم عند $x = \\ln 2$ حيث $f(\\ln 2) = \\ln 2$ ، وعلى $[\\ln 2; +\\infty[$ يتحقق $f(x) \\le x$ . إذا كانت $u_0 = 2$ و $u_{n+1} = f(u_n)$ بحيث $\\ln 2 \\le u_n \\le 2$ ، فما هو اتجاه تغير $(u_n)$ (اكتب `متناقصة` )؟',
					hintAr: 'قارن $u_{n+1} - u_n = f(u_n) - u_n$ مع إشارة $f(x) - x$ على المجال $[\\ln 2; +\\infty[$ .',
					expectedInput: 'متناقصة',
					revealAr:
						'بما أن $u_n \\in [\\ln 2; 2]$ لكل $n \\in \\mathbb{N}$ ولدينا $f(x) - x = 2e^{-x} - 1 \\le 0$ لكل $x \\ge \\ln 2$ ، فإنه بتعويض $x = u_n$ نجد $u_{n+1} - u_n \\le 0$ ، فالمتتالية $(u_n)$ **متناقصة** ومحدودة من الأدنى بـ $\\ln 2$ .'
				},
				{
					promptAr:
						'استنتج النهاية المضبوطة $\\ell = \\lim_{n \\to +\\infty} u_n$ للمتتالية المتقاربة $(u_n)$ (اكتب `ln2` ).',
					hintAr: 'بفضل استمرارية $f$ على $[\\ln 2; 2]$ تحقق النهاية $\\ell$ معادلة النقطة الصامدة $f(\\ell) = \\ell$ .',
					expectedInput: 'ln2',
					revealAr:
						'بما أن $(u_n)$ متقاربة نحو $\\ell \\in [\\ln 2; 2]$ و $f$ مستمرة، فإن $f(\\ell) = \\ell \\iff 2e^{-\\ell} - 1 = 0 \\iff e^\\ell = 2 \\iff \\ell = \\ln 2$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**منهجية التمرين الهجين (متتاليات + موافقات وتعداد في $\\mathbb{Z}$ ) لشعبة تقني رياضي**:\n1) لاستنتاج قابلية قسمة علاقة تراجعية $u_{n+1} = a u_n + b$ بترديد $m$ دون حساب الحد العام، نبرهن الخاصية المطلوبة **بالتراجع على $n$** باستعمال تلاؤم الموافقات مع الضرب والجمع.\n2) إذا عُرف الحد العام على الشكل $u_n = k \\cdot \\alpha^n + r$ مع $0 < k < \\alpha$ و $0 \\le r < \\alpha$ ($n \\ge 1$)، فهذه العبارة هي مباشرة **النشر القانوني للعدد $u_n$ في نظام التعداد ذي الأساس $\\alpha$** حيث رقم آحاده $r$ ورقم أعلى مرتبة $\\alpha^n$ هو $k$ وبقية المراتب البينية أصفار!',
				'**منهجية المسألة الشاملة في التحليل (7 نقاط)**:\n1) الجزء الأول: دراسة دالة مساعدة $g$ ، تطبيق مبرهنة القيم المتوسطة لإثبات وجود ووحدانية $g(\\alpha) = 0$ ، ثم تلخيص **جدول إشارة $g(x)$**.\n2) الجزء الثاني: إثبات أن $f\'(x)$ من إشارة $g(x)$ ، حساب النهايات بالتزايد المقارن وتحديد المقارب المائل $(\\Delta)$ والوضعية النسبية، تبسيط وحصر $f(\\alpha)$ انطلاقاً من $g(\\alpha) = 0$ ، ثم رسم $(\\Delta)$ و $(\\mathcal{C}_f)$ وإجراء المناقشة البيانية الوسيطية.\n3) الجزء الثالث: ربط متتالية تراجعية $u_{n+1} = f(u_n)$ بالمنحنى $(\\mathcal{C}_f)$ على مجال صامد $[a; b]$ واستنتاج رتابتها من الوضعية النسبية مع $y = x$ ونهايتها بحل $f(\\ell) = \\ell$ .',
				'**حساب مجاميع قوى في الموافقات**: لحساب باقي مجموع متتالية هندسية $S_n = 1 + a + a^2 + \\dots + a^n = \\frac{a^{n+1} - 1}{a - 1}$ بترديد $m$ :\n- إما ندرس دورية $a^{n+1} - 1$ (مع الحذر الشديد: لا نقسم في الموافقات على $a - 1$ مباشرة إذا لم يكن أولياً مع $m$ بل ندرس $S_n$ بدلالة مجموع بواقي دور كامل!).\n- وإما نلاحظ أن مجموع $p$ حداً متتابعاً من دور طوله $p$ يتكرر بانتظام فنقسّم عدد الحدود $(n + 1)$ إقليدياً على الدور $p$ .'
			],
			visualSvg: svgFunctionCurvePlot({
				fn: (x) => x - 1 + 2 * Math.exp(-x),
				xMin: -1,
				xMax: 4.5,
				yMin: -1,
				yMax: 4.5,
				curveLabel: 'f(x) = x-1+2e⁻ˣ',
				asymptotes: [
					{ kind: 'oblique', a: 1, b: -1, label: 'y = x - 1', color: '#dc2626' },
					{ kind: 'oblique', a: 1, b: 0, label: 'y = x', color: '#64748b' }
				],
				tangents: [{ x: Math.LN2, y: Math.LN2, slope: 0, halfSpan: 0.85, color: '#059669' }],
				points: [
					{ x: Math.LN2, y: Math.LN2, label: 'M(ln2, ln2)', color: '#059669' },
					{ x: 0, y: 1, label: 'A(0, 1)', color: '#1d4ed8' }
				]
			}),
			visualCaptionAr:
				'تكامل الدراسة البيانية للدالة $f(x) = x - 1 + 2e^{-x}$ مع مقاربها المائل $y = x - 1$ والمنصف الأول $y = x$ لدراسة المتتالية $u_{n+1} = f(u_n)$',
			examples: [
				{
					problemAr:
						'لتكن المتتالية $(u_n)$ المعرفة بـ $u_0 = 2$ ومن أجل كل $n \\in \\mathbb{N}$ : $u_{n+1} = 3u_n + 2$ .\n1) برهن بالتراجع أنه من أجل كل $n \\in \\mathbb{N}$ : $u_n = 3^{n+1} - 1$ .\n2) عين قيم العدد الطبيعي $n$ التي يقبل من أجلها $u_n$ القسمة على $8$ ، ثم اكتب $u_3$ في نظام التعداد ذي الأساس $3$ .',
					solutionAr:
						'1) **البرهان بالتراجع**: من أجل $n = 0$ لدينا $3^1 - 1 = 2 = u_0$ محققة. نفرض أن $u_n = 3^{n+1} - 1$ لعدد طبيعي كيفي $n$ ، فنحسب:\n$$u_{n+1} = 3(3^{n+1} - 1) + 2 = 3^{n+2} - 3 + 2 = 3^{n+2} - 1$$\nإذن الخاصية صحيحة من أجل كل $n \\in \\mathbb{N}$ .\n\n2) **قابلية القسمة على $8$**: ندرس قوى $3$ بترديد $8$ : $3^1 \\equiv 3 \\pmod{8}$ و $3^2 = 9 \\equiv 1 \\pmod{8}$ (الدور $p = 2$). ومنه:\n- إذا كان $n$ فردياً ($n = 2k + 1$) فإن $n + 1 = 2k + 2$ زوجي، فيكون $3^{n+1} = (3^2)^{k+1} \\equiv 1 \\pmod{8} \\implies u_n \\equiv 0 \\pmod{8}$ .\n- إذا كان $n$ زوجياً ($n = 2k$) فإن $n + 1 = 2k + 1$ فردي، فيكون $3^{n+1} \\equiv 3 \\pmod{8} \\implies u_n \\equiv 2 \\pmod{8}$ .\nإذن $8 \\mid u_n$ إذا وفقط إذا كان $n$ عدداً طبيعياً فردياً ($n = 2k + 1, k \\in \\mathbb{N}$).\n\n3) **كتابة $u_3$ في الأساس $3$**: لدينا $u_3 = 3^4 - 1 = 80$ . وبما أن $3^4 - 1 = (3 - 1)(3^3 + 3^2 + 3^1 + 1) = 2 \\cdot 3^3 + 2 \\cdot 3^2 + 2 \\cdot 3^1 + 2 \\cdot 3^0$ مع $0 \\le 2 < 3$ ، فإن $u_3 = \\overline{2222}^{3}$ !'
				},
				{
					problemAr:
						'لتكن $g(x) = e^x - x - 2$ على $\\mathbb{R}$ ، علماً أن المعادلة $g(x) = 0$ تقبل في المجال $]1; 2[$ حلاً وحيداً $\\alpha$ (حيث $1.14 < \\alpha < 1.15$). نعتبر الدالة الرئيسية $f(x) = e^x - \\frac{1}{2}x^2 - 2x + 1$ على $\\mathbb{R}$ . أثبت أن $f\'(x) = g(x)$ ، ثم بيّن أن $f(\\alpha) = -\\frac{1}{2}\\alpha^2 - \\alpha + 3$ واستنتج حصراً للعدد $f(\\alpha)$ .',
					solutionAr:
						'1) الدالة $f$ قابلة للاشتقاق على $\\mathbb{R}$ ولدينا:\n$$f\'(x) = e^x - \\frac{1}{2}(2x) - 2 = e^x - x - 2 = g(x)$$\n2) **إثبات عبارة $f(\\alpha)$ دون $e^\\alpha$**: بما أن $\\alpha$ حل للمعادلة $g(x) = 0$ فإن $e^\\alpha - \\alpha - 2 = 0 \\iff e^\\alpha = \\alpha + 2$ . نعوض $e^\\alpha$ في عبارة $f(\\alpha)$ :\n$$f(\\alpha) = (\\alpha + 2) - \\frac{1}{2}\\alpha^2 - 2\\alpha + 1 = -\\frac{1}{2}\\alpha^2 - \\alpha + 3$$\n3) **حصر $f(\\alpha)$**: من $1.14 < \\alpha < 1.15$ نجد $1.2996 < \\alpha^2 < 1.3225 \\implies -0.66125 < -\\frac{1}{2}\\alpha^2 < -0.6498$ ، وبجمعها مع $-1.15 < -\\alpha < -1.14$ ثم إضافة $3$ نحصل على الحصر الدقيق $1.18 < f(\\alpha) < 1.22$ .'
				}
			],
			watchOutAr:
				'توجيهات حاسمة لسلم تنقيط بكالوريا تقني رياضي: (1) في أسئلة ربط التعداد بالمتتاليات، كتابة $3^4 - 1$ في الأساس $3$ ليست $\\overline{10000}^{3} - 1$ ككتابة نهائية بل يجب إظهار جميع أرقامها المحصورة بين $0$ و $2$ أي $\\overline{2222}^{3}$ . (2) عند تبسيط $f(\\alpha)$ استعمل المساواة المضبوطة $g(\\alpha) = 0$ فقط، ولا تعوض $\\alpha$ بقيمتها التقريبية قبل الانتهاء من البرهان الحرفي!'
		},
		practice: [
			{
				questionAr:
					'من أجل كل عدد طبيعي غير معدوم $n \\ge 1$ ، نضع $A_n = 7^n - 1$ . ما هي الكتابة الرمزية للعدد $A_4 = 7^4 - 1$ في نظام التعداد ذي الأساس $7$ ؟',
				options: [
					'$\\overline{10000}^{7}$',
					'$\\overline{6666}^{7}$',
					'$\\overline{7777}^{7}$',
					'$\\overline{666}^{7}$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: العدد $\\overline{10000}^{7}$ يساوي $7^4$ تماماً وليس $7^4 - 1$ .',
					'إجابة صحيحة وممتازة! $7^4 - 1 = (7 - 1)(7^3 + 7^2 + 7^1 + 1) = 6\\cdot 7^3 + 6\\cdot 7^2 + 6\\cdot 7 + 6 = \\overline{6666}^{7}$ وكل الأرقام محصورة بين $0$ و $6$ .',
					'خطأ فادح: الرقم $7$ ممنوع في نظام التعداد ذي الأساس $7$ (أكبر رقم مسموح به هو $\\alpha - 1 = 6$).',
					'خطأ في عدد المراتب: $\\overline{666}^{7} = 7^3 - 1$ (ثلاثة أرقام) بينما $7^4 - 1$ يتكون من أربعة أرقام.'
				],
				explanationAr:
					'باستعمال المتطابقة الشهيرة $a^4 - 1 = (a - 1)(a^3 + a^2 + a + 1)$ من أجل $a = 7$ نجد $7^4 - 1 = 6 \\times 7^3 + 6 \\times 7^2 + 6 \\times 7^1 + 6 \\times 7^0$ . وبما أن $0 \\le 6 < 7$ ، فإن الكتابة الوحيدة في الأساس $7$ هي $\\overline{6666}^{7}$ .'
			},
			{
				questionAr:
					'لتكن $(u_n)$ متتالية عددية معرفة بـ $u_0 = 3$ ومن أجل كل $n \\in \\mathbb{N}$ : $u_{n+1} = 2u_n + 5$ . باقي القسمة الإقليدية للحد $u_n$ على $7$ من أجل كل عدد طبيعي $n$ يقبل القسمة على $3$ ($n = 3k$) هو:',
				options: ['$3$', '$0$', '$4$', '$2$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! نحسب الحدود الأولى بترديد $7$ : $u_0 \\equiv 3$ ، $u_1 = 11 \\equiv 4$ ، $u_2 = 13 \\equiv 6$ ، $u_3 = 17 \\equiv 3 \\pmod{7}$ ؛ تتكرر البواقي بدور $3$ ومنه $u_{3k} \\equiv 3 \\pmod{7}$ .',
					'خطأ: جرب $k = 0$ أي $u_0 = 3$ فباقي قسمته على $7$ هو $3 \\ne 0$ !',
					'خطأ: الباقي $4$ يوافق الحدود من الرتبة $n = 3k + 1$ (مثل $u_1 = 11 = 7 + 4$).',
					'خطأ حسابي: لا يظهر الباقي $2$ في دور هذه المتتالية بترديد $7$ (البواقي هي $3, 4, 6$).'
				],
				explanationAr:
					'بما أن $u_n = 8 \\cdot 2^n - 5 \\equiv 1 \\cdot 2^n + 2 \\pmod{7}$ ولدينا $2^3 = 8 \\equiv 1 \\pmod{7}$ ، فإنه من أجل $n = 3k$ يكون $2^{3k} = (2^3)^k \\equiv 1 \\pmod{7}$ ، ومنه $u_{3k} \\equiv 1 + 2 = 3 \\pmod{7}$ .'
			},
			{
				questionAr:
					'لتكن $f$ دالة مستمرة و**متناقصة تماماً** على المجال الصامد $I = [1; 3]$ بحيث $f([1; 3]) \\subset [1; 3]$ ، ونعرف المتتالية $u_0 = 1$ و $u_{n+1} = f(u_n)$ (مع $f(1) \\ne 1$). أي عبارة مما يلي صحيحة؟',
				options: [
					'المتتالية $(u_n)$ متناقصة تماماً على $\\mathbb{N}$',
					'المتتالية $(u_n)$ متزايدة تماماً على $\\mathbb{N}$',
					'المتتالية $(u_n)$ ليست رتيبة، بينما المتتاليتان الجزئيتان $(u_{2n})$ و $(u_{2n+1})$ رتيبتان في اتجاهين متعاكسين',
					'المتتالية $(u_n)$ غير محدودة'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'فخ شهير في البكالوريا! تناقص الدالة المرفقة $f$ لا يجعل $u_{n+1} = f(u_n)$ متناقصة، بل يعكس اتجاه المتباينة في كل خطوة!',
					'خطأ: صحيح أن $u_1 = f(1) > 1 = u_0$ ، لكن بتطبيق $f$ المتناقصة نجد $u_2 = f(u_1) < f(u_0) = u_1$ فينعكس الترتيب!',
					'إجابة ممتازة! بما أن $f$ متناقصة تماماً فإن المركب $f \\circ f$ دالة **متزايدة تماماً** على $[1; 3]$ ، فتكون $(u_{2n})$ و $(u_{2n+1})$ رتيبتين متعاكستين بينما $(u_n)$ متذبذبة حول النقطة الصامدة.',
					'خطأ: بما أن $u_0 \\in [1; 3]$ و $f([1; 3]) \\subset [1; 3]$ فإن $1 \\le u_n \\le 3$ بالتراجع، فهي محدودة.'
				],
				explanationAr:
					'عندما تكون $f$ متناقصة تماماً على المجال الصامد $[1; 3]$ ، فإنها تعكس الترتيب في كل انتقال ($u_0 < u_1 \\implies u_1 > u_2 \\implies u_2 < u_3$) فلا تكون $(u_n)$ رتيبة، في حين أن الدالة المركبة $g = f \\circ f$ متزايدة تماماً فتضمن رتابة كل من $(u_{2n})$ و $(u_{2n+1})$ .'
			}
		]
	}
];
