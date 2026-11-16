import type { InteractiveLessonData, MathDomain } from '../../types';
import { adaptLessonForTrack } from '../../types';
import { SHARED_LESSONS_3AS_T2 } from '../../secondary_shared_3as/lessons/t2';
import {
	svgComplexPlane,
	svgProbabilityTree,
	svgTrigonometricCircle
} from '../../svg-secondary';

export type CurriculumInteractiveLesson = InteractiveLessonData & {
	domain: MathDomain;
};

// ============================================================================
// Custom Crisp SVGs for 3AS Technical Mathematics (TM) — Trimester 2
// ============================================================================

const svgDiophantinePipelineDiagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 225" width="460" height="225" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">
  <rect x="8" y="8" width="444" height="209" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="230" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">الخوارزمية المنهجية لحل المعادلة الديوفانتية ax + by = c في Z²</text>

  <!-- Step 1 -->
  <rect x="20" y="42" width="198" height="68" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.4"/>
  <text x="119" y="61" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1d4ed8">1) شرط الوجود والاختزال</text>
  <text x="119" y="80" text-anchor="middle" font-size="10.8" fill="#0f172a">نحسب d = PGCD(a, b)</text>
  <text x="119" y="97" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e40af">إذا d | c نقسم على d ⇐ a'x + b'y = c'</text>

  <!-- Step 2 -->
  <rect x="242" y="42" width="198" height="68" rx="6" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.4"/>
  <text x="341" y="61" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#15803d">2) الحل الخاص (x₀, y₀)</text>
  <text x="341" y="80" text-anchor="middle" font-size="10.8" fill="#0f172a">بالملاحظة أو الموافقات أو</text>
  <text x="341" y="97" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#166534">الصعود العكسي لخوارزمية إقليدس (بيزو)</text>

  <!-- Arrow 1 -> 2 -->
  <line x1="218" y1="76" x2="240" y2="76" stroke="#475569" stroke-width="1.8"/>
  <polygon points="242,76 235,72 235,80" fill="#475569"/>

  <!-- Step 3 -->
  <rect x="20" y="130" width="198" height="72" rx="6" fill="#fffbeb" stroke="#d97706" stroke-width="1.4"/>
  <text x="119" y="149" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#b45309">3) الطرح وتطبيق مبرهنة غوص</text>
  <text x="119" y="168" text-anchor="middle" font-size="10.8" fill="#0f172a">a'(x - x₀) = b'(y₀ - y)</text>
  <text x="119" y="186" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#92400e">PGCD(a', b') = 1 ⇐ a' يقسم (y₀ - y)</text>

  <!-- Step 4 -->
  <rect x="242" y="130" width="198" height="72" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="1.4"/>
  <text x="341" y="149" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#b91c1c">4) الحل العام في Z² (مع التحقق)</text>
  <text x="341" y="169" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">x = x₀ + k b' ,  y = y₀ - k a'</text>
  <text x="341" y="188" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">حيث k يمسح المجموعة Z</text>

  <!-- Arrow 3 -> 4 -->
  <line x1="218" y1="166" x2="240" y2="166" stroke="#475569" stroke-width="1.8"/>
  <polygon points="242,166 235,162 235,170" fill="#475569"/>
</svg>`;

const svgPrimeDivisorsSummary = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 195" width="460" height="195" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">
  <rect x="8" y="8" width="444" height="179" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="230" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">التحليل الوحيد إلى جداء عوامل أولية: N = 360 = 2³ × 3² × 5¹</text>

  <rect x="22" y="44" width="132" height="126" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
  <text x="88" y="66" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1d4ed8">العوامل والأسس</text>
  <text x="88" y="92" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">p₁ = 2 , α₁ = 3</text>
  <text x="88" y="116" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">p₂ = 3 , α₂ = 2</text>
  <text x="88" y="140" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">p₃ = 5 , α₃ = 1</text>

  <rect x="166" y="44" width="132" height="126" rx="6" fill="#f0fdf4" stroke="#86efac"/>
  <text x="232" y="66" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#15803d">عدد القواسم الموجبة</text>
  <text x="232" y="96" text-anchor="middle" font-size="11" fill="#0f172a">(α₁+1)(α₂+1)(α₃+1)</text>
  <text x="232" y="122" text-anchor="middle" font-size="12" font-weight="bold" fill="#166534">= 4 × 3 × 2</text>
  <text x="232" y="150" text-anchor="middle" font-size="13" font-weight="bold" fill="#15803d">24 قاسماً موجباً</text>

  <rect x="310" y="44" width="128" height="126" rx="6" fill="#fef2f2" stroke="#fca5a5"/>
  <text x="374" y="66" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#dc2626">علاقة PGCD و PPCM</text>
  <text x="374" y="96" text-anchor="middle" font-size="10.8" fill="#0f172a">PGCD: أصغر الأسس</text>
  <text x="374" y="118" text-anchor="middle" font-size="10.8" fill="#0f172a">PPCM: أكبر الأسس</text>
  <text x="374" y="148" text-anchor="middle" font-size="11" font-weight="bold" fill="#b91c1c">d × m = |a × b|</text>
</svg>`;

function adaptSharedT2(
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
// LESSONS 3AS TM — TRIMESTER 2 (7 Lessons, Grade '3as_tm', yearSubjectId 725)
// ============================================================================

export const LESSONS_3AS_TM_T2: CurriculumInteractiveLesson[] = [
	// =========================================================================
	// LESSON 1 (Order 1, Seq 4 — STREAM EXCLUSIVE FOR TM):
	// PRIMES, BEZOUT, GAUSS & LINEAR DIOPHANTINE EQUATIONS ax + by = c
	// =========================================================================
	{
		id: 'lesson_3as_tm_t2_primes_bezout_gauss_diophantine',
		slug: '3as-tm-t2-primes-bezout-gauss-diophantine',
		grade: '3as_tm',
		yearSubjectId: 725,
		trimesterId: 't2',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: مبرهنتا بيزو وغوص والمعادلات الديوفانتية والاحتمالات',
		order: 1,
		domain: 'arithmetic_z',
		titleAr: 'الأعداد الأولية ومبرهنتا بيزو وغوص والمعادلات الديوفانتية ax + by = c',
		objectives: [
			'اختبار أولية عدد طبيعي وتحليله إلى جداء عوامل أولية وتعيين قواسمه وعددها وحساب PGCD و PPCM وتوظيف العلاقة PGCD(a, b) × PPCM(a, b) = |ab|',
			'تطبيق مبرهنة بيزو لإثبات أولية عددين فيما بينهما وإيجاد ثنائية خاصة (u_0, v_0) تحقق au_0 + bv_0 = d',
			'توظيف مبرهنة غوص ونتائجها في براهين قابلية القسمة وفي حل المعادلات الديوفانتية الخطية ax + by = c في Z² والمسائل الحسابية المرتبطة بها'
		],
		keywordsAr: [
			'الأعداد الأولية',
			'المضاعف المشترك الأصغر PPCM',
			'مبرهنة بيزو',
			'مبرهنة غوص',
			'المعادلات الديوفانتية ax + by = c'
		],
		discover: {
			scenarioAr:
				'في ورشة هندسة ميكانيكية، يدور مسنن أول ذو $17$ سناً متشابكاً مع مسنن ثانٍ ذي $12$ سناً. نريد معرفة متى يتفوق عدد أسنان دورات الأول على الثاني بـ $3$ أسنان بالضبط، أي حل المعادلة الديوفانتية $17x - 12y = 3$ في $\\mathbb{Z}^2$ ، ثم توظيفها لحل جملة موافقتين بترديدين مختلفين! لنكتشف كيف تقودنا الأعداد الأولية ومبرهنتا **بيزو** و**غوص** إلى الحل العام بأناقة تامة.',
			svg: svgDiophantinePipelineDiagram,
			steps: [
				{
					promptAr:
						'نبدأ بتحليل الأعداد والقواسم: العدد $360$ يُحلل إلى جداء عوامل أولية على الشكل $360 = 2^3 \\times 3^2 \\times 5^1$ . ما هو عدد قواسمه الطبيعية الموجبة باستعمال دستور جداء الأسس مضافاً إليها واحد؟',
					hintAr: 'اضرب $(\\alpha_1 + 1)(\\alpha_2 + 1)(\\alpha_3 + 1) = (3 + 1)(2 + 1)(1 + 1)$ .',
					expectedInput: '24',
					revealAr:
						'عدد القواسم الموجبة للعدد $360$ هو $(3 + 1)(2 + 1)(1 + 1) = 4 \\times 3 \\times 2 = 24$ قاسماً موجباً (ومجموعها يُعطى بـ $\\frac{2^4 - 1}{2 - 1} \\times \\frac{3^3 - 1}{3 - 1} \\times \\frac{5^2 - 1}{5 - 1} = 15 \\times 13 \\times 6 = 1170$).'
				},
				{
					promptAr:
						'ننتقل إلى المعادلة $(E): 17x - 12y = 3$ . بما أن $17$ أولي ولا يقسم $12$ فإن $\\text{PGCD}(17, 12) = 1$ (فهما أوليان فيما بينهما حسب بيزو والمعادلة تقبل حلولاً في $\\mathbb{Z}^2$). عيّن قيمة $x_0$ للحل الخاص $(x_0, y_0)$ الموافق لـ $y_0 = 4$ .',
					hintAr: 'عوض $y_0 = 4$ في $17x_0 - 12(4) = 3 \\iff 17x_0 = 51$ .',
					expectedInput: '3',
					revealAr:
						'بتعويض $y_0 = 4$ نجد $17x_0 = 3 + 48 = 51 \\implies x_0 = 3$ . إذن الثنائية $(3, 4)$ حل خاص للمعادلة $(E)$ (ويمكن إيجاد حل خاص دوماً بالصعود العكسي لخوارزمية إقليدس: $17(5) - 12(7) = 1 \\implies 17(15) - 12(21) = 3$).'
				},
				{
					promptAr:
						'بطرح المساواة الخاصة $17(3) - 12(4) = 3$ من $(E)$ نحصل على $17(x - 3) = 12(y - 4)$ . بتطبيق **مبرهنة غوص** (بما أن $17 \\mid 12(y - 4)$ و $\\text{PGCD}(17, 12) = 1$ فإن $17 \\mid (y - 4)$ أي $y = 17k + 4$ مع $k \\in \\mathbb{Z}$)، استنتج عبارة $x = a k + 3$ . ما قيمة المعامل $a$ ؟',
					hintAr: 'عوض $y - 4 = 17k$ في $17(x - 3) = 12(y - 4)$ ثم اختزل العدد غير المعدوم $17$ .',
					expectedInput: '12',
					revealAr:
						'بالتعويض نجد $17(x - 3) = 12(17k) \\implies x - 3 = 12k \\implies x = 12k + 3$ ($k \\in \\mathbb{Z}$). بالتحقق العكسي: $17(12k + 3) - 12(17k + 4) = 51 - 48 = 3$ محققة، إذن $S = \\{(12k + 3,\\; 17k + 4) \\mid k \\in \\mathbb{Z}\\}$ ومعامل $k$ في $x$ هو $12$ .'
				},
				{
					promptAr:
						'نستثمر النتيجة لحل جملة الموافقتين $\\begin{cases} N \\equiv 2 \\pmod{17} \\\\ N \\equiv 5 \\pmod{12} \\end{cases}$ في $\\mathbb{N}$ . بكتابة $N = 17x + 2 = 12y + 5$ نجد $17x - 12y = 3$ نفسها! ما هو أصغر عدد طبيعي $N$ يحقق الجملة؟',
					hintAr: 'عوض $x = 12k + 3$ في $N = 17x + 2$ ثم خذ $k = 0$ .',
					expectedInput: '53',
					revealAr:
						'بالتعويض نجد $N = 17(12k + 3) + 2 = 204k + 53$ ($k \\in \\mathbb{N}$ لكي يكون $N \\ge 0$). أصغر عدد طبيعي يتحقق عند $k = 0$ وهو $N_{\\min} = 53$ (فعلاً $53 = 17(3) + 2$ و $53 = 12(4) + 5$).'
				}
			]
		},
		summary: {
			rulesAr: [
				'**الأعداد الأولية والتحليل الوحيد والقواسم**: العدد الطبيعي $p \\ge 2$ أولي إذا قَبِل قاسمين موجبين فقط هما $1$ و $p$ . لاختبار أولية $N \\ge 2$ نقسمه على الأعداد الأولية المتتابعة $p \\le \\sqrt{N}$ ؛ فإن لم يقبل القسمة على أيٍّ منها فهو أولي.\n- إذا كان التحليل الوحيد لـ $N \\ge 2$ هو $N = p_1^{\\alpha_1} p_2^{\\alpha_2} \\cdots p_r^{\\alpha_r}$ ، فإن **عدد قواسمه الموجبة** هو $\\tau(N) = (\\alpha_1 + 1)(\\alpha_2 + 1)\\cdots(\\alpha_r + 1)$ ، و**مجموع قواسمه الموجبة** هو $\\sigma(N) = \\prod_{i=1}^r \\frac{p_i^{\\alpha_i + 1} - 1}{p_i - 1}$ .',
				'**خواص $\\text{PGCD}$ و $\\text{PPCM}$ والاختزال القانوني**: من أجل $a, b \\in \\mathbb{Z}^*$ ، نضع $d = \\text{PGCD}(a, b)$ و $m = \\text{PPCM}(a, b)$ ، فتتحقق العلاقات الجوهرية:\n$$d \\times m = |ab|, \\qquad \\begin{cases} a = d a\' \\\\ b = d b\' \\end{cases} \\iff \\text{PGCD}(a\', b\') = 1, \\qquad m = d |a\' b\'|$$',
				'**مساواة ومبرهنة بيزو (Bézout)**:\n- **مساواة بيزو**: إذا كان $d = \\text{PGCD}(a, b)$ فإنه توجد ثنائية $(u, v) \\in \\mathbb{Z}^2$ تحقق $au + bv = d$ .\n- **مبرهنة بيزو (تكافؤ في الاتجاهين)**: يكون العددان الصحيحان غير المعدومين $a$ و $b$ **أوليين فيما بينهما** ($\\text{PGCD}(a, b) = 1$) إذا وفقط إذا وُجدت ثنائية $(u, v) \\in \\mathbb{Z}^2$ تحقق $au + bv = 1$ . (ملاحظة هامة: وجود $(u, v)$ بحيث $au + bv = k$ مع $|k| > 1$ لا يعني أن $\\text{PGCD}(a, b) = k$ ، بل يعني أن $\\text{PGCD}(a, b)$ يقسم $k$ فقط!).',
				'**مبرهنة غوص (Gauss) ونتائجها الأساسية في البكالوريا**:\n- **نص المبرهنة**: ليكن $a, b, c \\in \\mathbb{Z}^*$ . إذا كان **$a$ يقسم الجداء $bc$** وكان **$a$ أولياً مع $b$** ($\\text{PGCD}(a, b) = 1$)، فإن **$a$ يقسم $c$**.\n- **النتائج**: (1) إذا كان $a \\mid N$ و $b \\mid N$ و $\\text{PGCD}(a, b) = 1$ فإن $ab \\mid N$ . (2) إذا كان عدد أولي $p$ يقسم $ab$ فإنه يقسم $a$ أو يقسم $b$ . (3) **الاختزال في الموافقات**: إذا كان $ka \\equiv kb \\pmod{n}$ و $\\text{PGCD}(k, n) = 1$ ، فإنه بتطبيق مبرهنة غوص على $n \\mid k(a - b)$ نستنتج $a \\equiv b \\pmod{n}$ (وإذا كان $\\text{PGCD}(k, n) = d$ فإن $a \\equiv b \\pmod{\\frac{n}{d}}$).',
				'**حل المعادلة الديوفانتية $ax + by = c$ وجمل الموافقات**: تقبل $ax + by = c$ حلولاً في $\\mathbb{Z}^2$ إذا وفقط إذا كان $d = \\text{PGCD}(a, b)$ يقسم $c$ . بعد الاختزال على $d$ إلى $a\'x + b\'y = c\'$ (مع $\\text{PGCD}(a\', b\') = 1$) وإيجاد حل خاص $(x_0, y_0)$ ، نكتب $a\'(x - x_0) = b\'(y_0 - y)$ ونطبق **مبرهنة غوص** مرتين (أو مرة ثم التعويض مع التحقق العكسي) فنجد مجموعة الحلول:\n$$S = \\big\\{(x_0 + k b\',\\; y_0 - k a\') \\;\\big|\\; k \\in \\mathbb{Z}\\big\\}$$'
			],
			visualSvg: svgPrimeDivisorsSummary,
			visualCaptionAr:
				'ملخص التحليل إلى جداء عوامل أولية واستخراج عدد القواسم الموجبة وعلاقة الجداء $d \\times m = |ab|$',
			examples: [
				{
					problemAr:
						'من أجل كل عدد طبيعي $n$ نضع $A = 3n + 4$ و $B = 2n + 3$ .\n1) أثبت باستعمال مبرهنة بيزو أن العددين $A$ و $B$ أوليان فيما بينهما من أجل كل $n \\in \\mathbb{N}$ .\n2) استنتج $\\text{PGCD}(3n^2 + 4n,\\; 2n^2 + 3n)$ و $\\text{PPCM}(3n + 4,\\; 2n + 3)$ بدلالة $n \\in \\mathbb{N}^*$ .',
					solutionAr:
						'1) نبحث عن عددين صحيحين مستقلين عن $n$ يحذفان $n$ بين $A$ و $B$ :\n$$2A - 3B = 2(3n + 4) - 3(2n + 3) = 6n + 8 - 6n - 9 = -1$$\nومنه $(-2)A + 3B = 1$ . بما أنه وُجدت ثنائية صحيحة $(u, v) = (-2, 3) \\in \\mathbb{Z}^2$ تحقق $uA + vB = 1$ ، فإنه حسب مبرهنة بيزو $\\text{PGCD}(3n + 4,\\; 2n + 3) = 1$ من أجل كل $n \\in \\mathbb{N}$ .\n2) من أجل $n \\in \\mathbb{N}^*$ نطبق خاصية التجانس:\n$$\\text{PGCD}(3n^2 + 4n,\\; 2n^2 + 3n) = \\text{PGCD}\\big(n(3n + 4),\\; n(2n + 3)\\big) = n \\cdot \\text{PGCD}(3n + 4,\\; 2n + 3) = n$$\nومن العلاقة $d \\times m = AB$ مع $d = 1$ نستنتج $\\text{PPCM}(3n + 4,\\; 2n + 3) = (3n + 4)(2n + 3) = 6n^2 + 17n + 12$ .'
				},
				{
					problemAr:
						'نعتبر في $\\mathbb{Z}^2$ المعادلة $(E): 42x - 30y = 18$ .\n1) تحقق أن $(E)$ تقبل حلولاً في $\\mathbb{Z}^2$ ثم حلها.\n2) عيّن الثنائيات $(x, y) \\in \\mathbb{N}^2$ الحلول لـ $(E)$ التي تحقق $x + y < 40$ .',
					solutionAr:
						'1) لدينا $\\text{PGCD}(42, 30) = 6$ ، وبما أن $6$ يقسم $18$ فإن $(E)$ تقبل حلولاً في $\\mathbb{Z}^2$ . بالقسمة على $6$ تكافئ $(E)$ المعادلة المختزلة $(E\'): 7x - 5y = 3$ حيث $\\text{PGCD}(7, 5) = 1$ .\n- **حل خاص**: نلاحظ أن $7(4) - 5(5) = 28 - 25 = 3$ (أو $7(-1) - 5(-2) = 3$)، فالثنائية $(x_0, y_0) = (-1, -2)$ حل خاص لـ $(E\')$ .\n- **الحل العام بمبرهنة غوص**: بطرح $7(-1) - 5(-2) = 3$ من $(E\')$ نجد $7(x + 1) = 5(y + 2)$ . بما أن $7 \\mid 5(y + 2)$ و $\\text{PGCD}(7, 5) = 1$ ، فحسب مبرهنة غوص $7 \\mid (y + 2)$ أي يوجد $k \\in \\mathbb{Z}$ بحيث $y + 2 = 7k \\implies y = 7k - 2$ . بالتعويض نجد $7(x + 1) = 35k \\implies x = 5k - 1$ . بالتحقق: $7(5k - 1) - 5(7k - 2) = 3$ محققة، إذن $S = \\{(5k - 1,\\; 7k - 2) \\mid k \\in \\mathbb{Z}\\}$ .\n2) **تحديد الثنائيات الطبيعية مع $x + y < 40$**:\n- شرط الطبيعة: $5k - 1 \\ge 0$ و $7k - 2 \\ge 0 \\implies k \\ge 1$ .\n- شرط المجموع: $(5k - 1) + (7k - 2) < 40 \\iff 12k < 43 \\iff k \\le 3$ .\nإذن $k \\in \\{1, 2, 3\\}$ ، والثنائيات المطلوبة هي: $(4, 5)$ ، $(9, 12)$ ، و $(14, 19)$ .'
				}
			],
			watchOutAr:
				'احذر أربعة أخطاء جسيمة في سلم تنقيط بكالوريا تقني رياضي: (1) إغفال ذكر الشرط الجوهري $\\text{PGCD}(a, b) = 1$ عند استدعاء مبرهنة غوص يُضيع نصف علامة السؤال! (2) نسيان اختزال المعادلة $ax + by = c$ على $d = \\text{PGCD}(a, b)$ قبل تطبيق غوص. (3) الاستنتاج الخاطئ من $3A - 2B = 5$ أن $\\text{PGCD}(A, B) = 5$ ؛ الصحيح أن $\\text{PGCD}(A, B)$ قاسم موجب لـ $5$ فهو إما $1$ وإما $5$ ! (4) في شعبة تقني رياضي تُبرهن بواقي القوى بدراسة دورية البواقي وخواص الموافقات ومبرهنة غوص دون القفز إلى مبرهنات غير مقررة.'
		},
		practice: [
			{
				questionAr:
					'عددان طبيعيان غير معدومين $a$ و $b$ يحققان $\\text{PGCD}(a, b) = 12$ و $\\text{PPCM}(a, b) = 180$ مع $a < b$ . كم ثنائية $(a, b)$ تحقق هذه الشروط؟',
				options: [
					'ثنائية واحدة فقط هي $(12, 180)$',
					'ثنائيتان هما $(12, 180)$ و $(36, 60)$',
					'ثلاث ثنائيات هي $(12, 180)$ و $(24, 90)$ و $(36, 60)$',
					'ثنائية واحدة فقط هي $(36, 60)$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: أغفلت تفكيك $15 = 3 \\times 5$ الذي يعطي الثنائية الثانية $(3 \\times 12,\\; 5 \\times 12) = (36, 60)$ !',
					'إجابة صحيحة وممتازة! نضع $a = 12a\'$ و $b = 12b\'$ مع $\\text{PGCD}(a\', b\') = 1$ و $a\' < b\'$ ، ومن $12 a\' b\' = 180$ نجد $a\' b\' = 15$ ، فتكون $(a\', b\') \\in \\{(1, 15), (3, 5)\\}$ أي $(12, 180)$ و $(36, 60)$ .',
					'فخ كلاسيكي! في الثنائية $(24, 90)$ لدينا $\\text{PGCD}(24, 90) = 6 \\ne 12$ (كما أن $24 \\times 90 = 2160$ تعطي $a\' = 2, b\' = 7.5 \\notin \\mathbb{N}$!).',
					'خطأ: الثنائية $(12, 180)$ تحقق أيضاً $\\text{PGCD}(12, 180) = 12$ و $\\text{PPCM}(12, 180) = 180$ لأن $1$ و $15$ أوليان فيما بينهما.'
				],
				explanationAr:
					'نضع $a = 12a\'$ و $b = 12b\'$ حيث $\\text{PGCD}(a\', b\') = 1$ و $1 \\le a\' < b\'$ . من العلاقة $ab = d \\times m$ نجد $144 a\' b\' = 12 \\times 180 \\iff a\' b\' = 15$ . قواسم $15$ تعطي $(a\', b\') = (1, 15)$ أو $(a\', b\') = (3, 5)$ وكلاهما يحقق $\\text{PGCD}(a\', b\') = 1$ ، فالثنائيتان هما $(12, 180)$ و $(36, 60)$ .'
			},
			{
				questionAr:
					'في المجموعة $\\mathbb{Z}$ ، مجموعة حلول الموافقة $6x \\equiv 10 \\pmod{14}$ هي ($k \\in \\mathbb{Z}$):',
				options: [
					'لا تقبل حلولاً لأن $\\text{PGCD}(6, 14) = 2 \\ne 1$',
					'$x = 7k + 4$',
					'$x = 14k + 4$',
					'$x = 7k + 2$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: بما أن $d = \\text{PGCD}(6, 14) = 2$ يقسم $10$ ، فإن الموافقة تقبل حلولاً في $\\mathbb{Z}$ !',
					'إجابة صحيحة! $6x \\equiv 10 \\pmod{14} \\iff 14 \\mid (6x - 10) \\iff 7 \\mid (3x - 5) \\iff 3x \\equiv 5 \\equiv 12 \\pmod{7}$ ، وبما أن $\\text{PGCD}(3, 7) = 1$ فحسب مبرهنة غوص $x \\equiv 4 \\pmod{7}$ أي $x = 7k + 4$ .',
					'خطأ شائع: نسيت قسمة الترديد $14$ على $d = 2$ عند الاختزال، فضيّعت نصف الحلول (مثل $x = 11$ حيث $6(11) = 66 = 4(14) + 10$)!',
					'خطأ حسابي: عند $x = 2$ يكون $6(2) = 12 \\not\\equiv 10 \\pmod{14}$ .'
				],
				explanationAr:
					'الموافقة $6x \\equiv 10 \\pmod{14}$ تعني وجود $y \\in \\mathbb{Z}$ بحيث $6x - 14y = 10 \\iff 3x - 7y = 5 \\iff 3x \\equiv 5 \\pmod{7}$ . نلاحظ أن $5 \\equiv 12 \\pmod{7}$ فتصبح $3x \\equiv 3 \\times 4 \\pmod{7}$ ، وبما أن $\\text{PGCD}(3, 7) = 1$ فحسب غوص $x \\equiv 4 \\pmod{7}$ أي $x = 7k + 4$ ($k \\in \\mathbb{Z}$).'
			},
			{
				questionAr:
					'مجموعة حلول المعادلة الديوفانتية $9x + 4y = 5$ في $\\mathbb{Z}^2$ هي ($k \\in \\mathbb{Z}$):',
				options: [
					'$S = \\{(4k + 1,\\; 9k - 1) \\mid k \\in \\mathbb{Z}\\}$',
					'$S = \\{(4k + 1,\\; -9k - 1) \\mid k \\in \\mathbb{Z}\\}$',
					'$S = \\{(9k + 1,\\; -4k - 1) \\mid k \\in \\mathbb{Z}\\}$',
					'$S = \\{(4k - 1,\\; -9k + 1) \\mid k \\in \\mathbb{Z}\\}$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ في الإشارة! عند التعويض نجد $9(4k + 1) + 4(9k - 1) = 72k + 5 \\ne 5$ لأن المعادلة بالجمع $9x + 4y$ فإشارتا $k$ متعاكستان.',
					'إجابة صحيحة! الثنائية $(1, -1)$ حل خاص لأن $9(1) + 4(-1) = 5$ ، ومن $9(x - 1) = -4(y + 1)$ مع $\\text{PGCD}(9, 4) = 1$ نجد بغوص $x = 4k + 1$ و $y = -9k - 1$ .',
					'خطأ: عكست معاملي $k$ بين $x$ و $y$ ! معامل $k$ في $x$ هو $4$ وفي $y$ هو $-9$ .',
					'خطأ في الحل الخاص: عند $k = 0$ تعطي $(-1, 1)$ التي تحقق $9(-1) + 4(1) = -5 \\ne +5$ .'
				],
				explanationAr:
					'لدينا $\\text{PGCD}(9, 4) = 1$ ، والثنائية $(1, -1)$ حل خاص لأن $9(1) + 4(-1) = 5$ . بالطرح نجد $9(x - 1) = -4(y + 1) = 4(-y - 1)$ . بتطبيق مبرهنة غوص: $9 \\mid 4(-y - 1)$ و $\\text{PGCD}(9, 4) = 1 \\implies -y - 1 = 9k \\implies y = -9k - 1$ ، وبالتعويض $x - 1 = 4k \\implies x = 4k + 1$ ($k \\in \\mathbb{Z}$).'
			}
		]
	},

	// =========================================================================
	// LESSON 2 (Order 2, Seq 4): COUNTING, COMBINATORICS & RANDOM VARIABLES
	// =========================================================================
	adaptSharedT2(SHARED_LESSONS_3AS_T2[0], 't2_counting_combinatorics_random_variables', {
		order: 2,
		domain: 'probability',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: مبرهنتا بيزو وغوص والمعادلات الديوفانتية والاحتمالات',
		titleAr: 'المبدأ الأساسي للعد، التحليل التوفيقي والمتغيرات العشوائية المتقطعة',
		objectives: [
			'استعمال المبدأ الأساسي للعد وقوانين التحليل التوفيقي (القوائم، الترتيبات A_n^p، التبديلات n!، التوفيقات C_n^p) ودستور ثنائي الحد في حل مسائل العد والسحب',
			'تعيين قانون الاحتمال لمتغير عشوائي متقطع وحساب الأمل الرياضياتي E(X) والتباين V(X) والانحراف المعياري σ(X)',
			'استغلال خواص خطية الأمل الرياضياتي والتباين في حل مسائل احتمالية متنوعة'
		],
		keywordsAr: [
			'المبدأ الأساسي للعد',
			'القوائم والترتيبات والتبديلات',
			'التوفيقات ودستور ثنائي الحد',
			'المتغير العشوائي',
			'الأمل الرياضياتي والتباين'
		]
	}),

	// =========================================================================
	// LESSON 3 (Order 3, Seq 4): CONDITIONAL PROBABILITY, TREES & BINOMIAL LAW
	// =========================================================================
	adaptSharedT2(SHARED_LESSONS_3AS_T2[1], 't2_conditional_probability_binomial_law', {
		order: 3,
		domain: 'probability',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: مبرهنتا بيزو وغوص والمعادلات الديوفانتية والاحتمالات',
		titleAr: 'الاحتمالات الشرطية، شجرة الاحتمالات وقانون ثنائي الحد',
		objectives: [
			'التعرف على الاحتمال الشرطي واستقلال حادثتين وتوظيف شجرة الاحتمالات ودستور الاحتمالات الكلية في تجارب السحب المتتالي أو من عدة أوعية',
			'نمذجة التجارب المرجعية للسحب والإلقاء وتكرار تجارب برنولي المستقلة بقانون ثنائي الحد B(n, p)',
			'ربط حساب الاحتمالات بالمتتاليات العددية أو قابلية القسمة في تمارين مدمجة'
		],
		keywordsAr: [
			'الاحتمال الشرطي',
			'شجرة الاحتمالات',
			'دستور الاحتمالات الكلية',
			'قانون برنولي وثنائي الحد'
		]
	}),

	// =========================================================================
	// LESSON 4 (Order 4, Seq 5 — TAILORED FOR TM):
	// COMPLEX NUMBERS: ALGEBRAIC FORM, EQUATIONS IN C, TRIG/EXP FORMS & DE MOIVRE
	// =========================================================================
	{
		...adaptLessonForTrack(
			SHARED_LESSONS_3AS_T2[2],
			'3as_tm',
			't2_complex_algebraic_equations_forms'
		),
		id: 'lesson_3as_tm_t2_complex_algebraic_equations_forms',
		slug: '3as-tm-t2-complex-algebraic-equations-forms',
		order: 4,
		domain: 'complex',
		sequenceId: 'seq5',
		sequenceTitleAr: 'المقطع الخامس: الأعداد المركبة والتحويلات النقطية المألوفة',
		titleAr: 'الأعداد المركبة: الشكل الجبري، المعادلات في C، الشكل المثلثي والأسي ودستور موافر',
		objectives: [
			'إجراء العمليات في مجموعة الأعداد المركبة C وتوظيف المرافق والطويلة وتعيين الجذرين التربيعيين وحل معادلات الدرجة الثانية وما يؤول إليها في C',
			'حساب عمدة عدد مركب غير معدوم والانتقال بين الشكل الجبري والشكل المثلثي والشكل الأسي z = r e^(iθ) (ترميز أولير)',
			'توظيف خواص الطويلة والعمدة ودستور موافر في تبسيط القوى المركبة واستخراج دساتير مثلثية'
		],
		keywordsAr: [
			'الشكل الجبري والمرافق',
			'معادلات الدرجة الثانية في C',
			'الشكل المثلثي والأسي',
			'ترميز أولير',
			'دستور موافر'
		],
		discover: {
			scenarioAr:
				'في الهندسة الكهربائية والميكانيكية، تُمثَّل الممانعات المركبة والمطالات الجيبية بالأعداد المركبة $z \\in \\mathbb{C}$ حيث تتيح الكتابة الجبرية $x + iy$ حساب المجاميع وحل المعادلات، بينما تحوّل الكتابة الأسية $r e^{i\\theta}$ (ترميز أولير) ودستور موافر الضرب والقسمة والقوى العليا إلى عمليات فورية! لنحل في $\\mathbb{C}$ المعادلة $P(z) = (z - 2)(z^2 - 2\\sqrt{3}z + 4) = 0$ ونستثمر الشكل الأسي لجذورها.',
			svg: svgComplexPlane({
				range: 3,
				points: [
					{ re: 2, im: 0, label: 'A(2)', color: '#dc2626' },
					{ re: Math.sqrt(3), im: 1, label: 'B(√3+i)', color: '#1d4ed8' },
					{ re: Math.sqrt(3), im: -1, label: 'C(√3-i)', color: '#15803d' }
				],
				segments: [
					{ from: [0, 0], to: [Math.sqrt(3), 1], color: '#1d4ed8' },
					{ from: [0, 0], to: [Math.sqrt(3), -1], color: '#15803d' }
				],
				circles: [{ cx: 0, cy: 0, r: 2, color: '#64748b' }]
			}),
			steps: [
				{
					promptAr:
						'حل في $\\mathbb{C}$ المعادلة من الدرجة الثانية $z^2 - 2\\sqrt{3}z + 4 = 0$ . احسب المميز $\\Delta$ واكتب الطويلة المشتركة $r = |z_1| = |z_2|$ للجذرين المترافقين.',
					hintAr: 'لدينا $\\Delta = (-2\\sqrt{3})^2 - 4(1)(4) = 12 - 16 = -4 = (2i)^2$ ، ثم احسب $|\\sqrt{3} + i|$ .',
					expectedInput: '2',
					revealAr:
						'المميز $\\Delta = 12 - 16 = -4 = (2i)^2 < 0$ ، فالجذران المركبان المترافقان هما $z_1 = \\sqrt{3} + i$ و $z_2 = \\bar{z_1} = \\sqrt{3} - i$ ، وطويلتهما المشتركة $r = \\sqrt{(\\sqrt{3})^2 + 1^2} = \\sqrt{3 + 1} = 2$ .'
				},
				{
					promptAr:
						'اكتب الجذر $z_1 = \\sqrt{3} + i$ على الشكل المثلثي والشكل الأسي $r e^{i\\theta}$ . إذا كانت عمدته الرئيسية $\\theta = \\frac{\\pi}{n}$ ، فما قيمة العدد الطبيعي $n$ ؟',
					hintAr: 'استخرج $\\cos\\theta = \\frac{\\sqrt{3}}{2}$ و $\\sin\\theta = \\frac{1}{2}$ على الدائرة المثلثية.',
					expectedInput: '6',
					revealAr:
						'لدينا $z_1 = 2\\left(\\frac{\\sqrt{3}}{2} + i\\frac{1}{2}\\right) = 2\\left(\\cos\\frac{\\pi}{6} + i\\sin\\frac{\\pi}{6}\\right) = 2e^{i\\frac{\\pi}{6}}$ ، ومنه $n = 6$ ، ومرافقه هو $z_2 = 2e^{-i\\frac{\\pi}{6}}$ .'
				},
				{
					promptAr:
						'بتطبيق **دستور موافر**، احسب القيمة الجبرية المضبوطة للعدد $\\left(\\frac{z_1}{2}\\right)^{2028}$ .',
					hintAr: 'لاحظ أن $\\frac{z_1}{2} = e^{i\\frac{\\pi}{6}}$ ، واحسب $\\frac{2028}{6} = 338$ (عدد زوجي من أنصاف الدورات!).',
					expectedInput: '1',
					revealAr:
						'لدينا $\\left(\\frac{z_1}{2}\\right)^{2028} = \\left(e^{i\\frac{\\pi}{6}}\\right)^{2028} = e^{i(338\\pi)} = \\cos(338\\pi) + i\\sin(338\\pi) = 1$ لأن $338$ عدد زوجي.'
				},
				{
					promptAr:
						'أكتب العدد المركب $w = \\frac{z_1}{1 + i}$ على الشكل الأسي ثم الجبري لاستخراج القيمة المضبوطة لـ $\\cos\\left(\\frac{\\pi}{12}\\right)$ : كم يساوي فرق العمدتين $\\arg(z_1) - \\arg(1 + i)$ إذا علمت أن $\\arg(1 + i) \\equiv \\frac{\\pi}{4}$ (اكتب `-pi/12` )؟',
					hintAr: 'طبق خاصية عمدة حاصل القسمة: $\\arg\\left(\\frac{z_1}{1 + i}\\right) \\equiv \\frac{\\pi}{6} - \\frac{\\pi}{4} \\pmod{2\\pi}$ .',
					expectedInput: '-pi/12',
					revealAr:
						'أسياً: $1 + i = \\sqrt{2}e^{i\\frac{\\pi}{4}}$ ومنه $w = \\frac{2e^{i\\frac{\\pi}{6}}}{\\sqrt{2}e^{i\\frac{\\pi}{4}}} = \\sqrt{2}e^{-i\\frac{\\pi}{12}}$ (العمدة $-\\frac{\\pi}{12}$). وجبرياً بالضرب في المرافق: $w = \\frac{(\\sqrt{3} + i)(1 - i)}{2} = \\frac{\\sqrt{3} + 1}{2} + i\\frac{1 - \\sqrt{3}}{2}$ ، وبمطابقة الجزء الحقيقي نستنتج $\\cos\\left(\\frac{\\pi}{12}\\right) = \\frac{\\sqrt{6} + \\sqrt{2}}{4}$ !'
				}
			]
		},
		summary: {
			rulesAr: [
				'**الشكل الجبري، المرافق، والطويلة**: كل عدد مركب يُكتب بصفة وحيدة $z = x + iy$ ($x, y \\in \\mathbb{R}, i^2 = -1$). المرافق $\\bar{z} = x - iy$ يحقق $z\\bar{z} = x^2 + y^2 = |z|^2$ ، $z \\in \\mathbb{R} \\iff \\bar{z} = z$ ، و $z \\in i\\mathbb{R} \\iff \\bar{z} = -z$ . الطويلة $|z| = \\sqrt{x^2 + y^2}$ تتوافق مع الضرب والقسمة والقوى: $|z z\'| = |z||z\'|$ ، $\\left|\\frac{z}{z\'}\\right| = \\frac{|z|}{|z\'|}$ ، $|z^n| = |z|^n$ .',
				'**الجذران التربيعيان ومعادلات الدرجة الثانية في $\\mathbb{C}$**:\n- لتعيين الجذرين التربيعيين $\\delta = x + iy$ للعدد $a + ib$ نحل الجملة: $x^2 - y^2 = a$ ، $x^2 + y^2 = \\sqrt{a^2 + b^2}$ ، و $2xy = b$ (تحدد توافق أو اختلاف إشارتي $x$ و $y$).\n- المعادلة $az^2 + bz + c = 0$ ذات المعاملات الحقيقية ($a \\in \\mathbb{R}^*$) عندما $\\Delta = b^2 - 4ac < 0$ تقبل حلين مركبين مترافقين: $z_{1,2} = \\frac{-b \\pm i\\sqrt{-\\Delta}}{2a}$ . (وإذا كانت المعاملات مركبة عامة و $\\Delta = \\delta^2$ فالحلان هما $\\frac{-b \\pm \\delta}{2a}$ دون أن يكونا مترافقين بالضرورة!).',
				'**الشكل المثلثي والشكل الأسي (ترميز أولير)**: من أجل $z \\in \\mathbb{C}^*$ نضع $r = |z| > 0$ (طويلة موجبة تماماً!) و $\\theta = \\arg(z)$ حيث $\\cos\\theta = \\frac{x}{r}$ و $\\sin\\theta = \\frac{y}{r}$ ، فيُكتب:\n$$z = r(\\cos\\theta + i\\sin\\theta) = r e^{i\\theta} \\quad (r > 0)$$\nوتحقق العمدة: $\\arg(z z\') \\equiv \\arg(z) + \\arg(z\') \\pmod{2\\pi}$ ، $\\arg\\left(\\frac{z}{z\'}\\right) \\equiv \\arg(z) - \\arg(z\') \\pmod{2\\pi}$ ، $\\arg(\\bar{z}) \\equiv -\\arg(z) \\pmod{2\\pi}$ ، و $\\arg(-z) \\equiv \\arg(z) + \\pi \\pmod{2\\pi}$ .',
				'**دستورا موافر وأولير وتقنية نصف الزاوية**:\n- **دستور موافر**: من أجل كل $\\theta \\in \\mathbb{R}$ و $n \\in \\mathbb{Z}$ : $(\\cos\\theta + i\\sin\\theta)^n = \\cos(n\\theta) + i\\sin(n\\theta)$ أي $(r e^{i\\theta})^n = r^n e^{in\\theta}$ .\n- **دستورا أولير**: $\\cos\\theta = \\frac{e^{i\\theta} + e^{-i\\theta}}{2}$ و $\\sin\\theta = \\frac{e^{i\\theta} - e^{-i\\theta}}{2i}$ .\n- **تعميل نصف الزاوية**: $1 + e^{i\\theta} = 2\\cos\\left(\\frac{\\theta}{2}\\right)e^{i\\frac{\\theta}{2}}$ و $1 - e^{i\\theta} = -2i\\sin\\left(\\frac{\\theta}{2}\\right)e^{i\\frac{\\theta}{2}}$ (مع فحص إشارة المعامل قبل اعتباره طويلة!).'
			],
			visualSvg: svgTrigonometricCircle({
				anglesRad: [
					{ rad: Math.PI / 6, label: 'pi/6', color: '#1d4ed8' },
					{ rad: Math.PI / 4, label: 'pi/4', color: '#059669' },
					{ rad: (2 * Math.PI) / 3, label: '2pi/3', color: '#dc2626' }
				]
			}),
			visualCaptionAr:
				'قراءة العمدات الشهيرة على الدائرة المثلثية للانتقال الفوري بين الشكلين الجبري والأسي',
			examples: [
				{
					problemAr:
						'حل في المجموعة $\\mathbb{C}$ المعادلة ذات المعاملات المركبة $z^2 - (3 + i)z + 4 + 3i = 0$ .',
					solutionAr:
						'نحسب المميز $\\Delta = [-(3 + i)]^2 - 4(1)(4 + 3i) = (9 + 6i - 1) - (16 + 12i) = -8 - 6i$ .\nنبحث عن جذر تربيعي $\\delta = x + iy$ لـ $\\Delta = -8 - 6i$ :\n$$\\begin{cases} x^2 - y^2 = -8 \\\\ x^2 + y^2 = \\sqrt{64 + 36} = 10 \\\\ 2xy = -6 < 0 \\end{cases} \\implies \\begin{cases} x^2 = 1 \\implies x = \\pm 1 \\\\ y^2 = 9 \\implies y = \\pm 3 \\\\ xy < 0 \\end{cases}$$\nإذن نختار $\\delta = 1 - 3i$ (والآخر $-1 + 3i$). ومنه حلا المعادلة هما:\n$$z_1 = \\frac{(3 + i) - (1 - 3i)}{2} = \\frac{2 + 4i}{2} = 1 + 2i, \\qquad z_2 = \\frac{(3 + i) + (1 - 3i)}{2} = \\frac{4 - 2i}{2} = 2 - i$$'
				},
				{
					problemAr:
						'ليكن $z_A = -1 + i\\sqrt{3}$ و $z_B = 1 + i$ . اكتب $Z = \\frac{(z_A)^4}{(z_B)^6}$ على الشكل الأسي ثم الشكل الجبري، وعين قيم $n \\in \\mathbb{N}$ التي يكون من أجلها $(z_A)^n$ تخيلياً صرفاً.',
					solutionAr:
						'1) نكتب $z_A$ و $z_B$ على الشكل الأسي: $|z_A| = 2$ مع $\\cos\\theta_A = -\\frac{1}{2}, \\sin\\theta_A = \\frac{\\sqrt{3}}{2} \\implies z_A = 2e^{i\\frac{2\\pi}{3}}$ ؛ و $|z_B| = \\sqrt{2} \\implies z_B = \\sqrt{2}e^{i\\frac{\\pi}{4}}$ .\nبدستور موافر:\n$$Z = \\frac{2^4 e^{i\\frac{8\\pi}{3}}}{(\\sqrt{2})^6 e^{i\\frac{6\\pi}{4}}} = \\frac{16 e^{i\\frac{2\\pi}{3}}}{8 e^{i\\frac{3\\pi}{2}}} = 2 e^{i\\left(\\frac{2\\pi}{3} - \\frac{3\\pi}{2}\\right)} = 2 e^{-i\\frac{5\\pi}{6}}$$\nالشكل الجبري: $Z = 2\\left(-\\frac{\\sqrt{3}}{2} - i\\frac{1}{2}\\right) = -\\sqrt{3} - i$ .\n2) لدينا $(z_A)^n = 2^n e^{i\\frac{2n\\pi}{3}}$ . يكون $(z_A)^n$ تخيلياً صرفاً (غير معدوم لأن $2^n > 0$) إذا وفقط إذا كان $\\frac{2n\\pi}{3} \\equiv \\frac{\\pi}{2} \\pmod{\\pi} \\iff 4n = 3 + 6k$ ، وهو مستحيل في $\\mathbb{N}$ لأن الطرف الأيسر زوجي والأيمن فردي! إذن لا توجد أي قيمة لـ $n \\in \\mathbb{N}$ تجعل $(z_A)^n$ تخيلياً صرفاً.'
				}
			],
			watchOutAr:
				'احذر ثلاثة مطبات في بكالوريا تقني رياضي: (1) الكتابة $-2e^{i\\frac{\\pi}{5}}$ ليست شكلاً أسياً لأن الطويلة موجبة تماماً؛ حولها باستعمال $-1 = e^{i\\pi}$ إلى $2e^{i\\frac{6\\pi}{5}}$ . (2) الكتابة $2(\\sin\\theta + i\\cos\\theta)$ ليست شكلاً مثلثياً نظامياً؛ استعمل التحويل $\\sin\\theta = \\cos\\left(\\frac{\\pi}{2} - \\theta\\right)$ و $\\cos\\theta = \\sin\\left(\\frac{\\pi}{2} - \\theta\\right)$ . (3) لا تطبق قاعدة الجذرين المترافقين على معادلة معاملاتها غير حقيقية!'
		},
		practice: [
			{
				questionAr:
					'الشكل الأسي النظامي للعدد المركب $z = -2\\left(\\sin\\frac{\\pi}{5} + i\\cos\\frac{\\pi}{5}\\right)$ هو:',
				options: [
					'$2e^{i\\frac{13\\pi}{10}}$',
					'$-2e^{i\\frac{3\\pi}{10}}$',
					'$2e^{i\\frac{3\\pi}{10}}$',
					'$2e^{i\\frac{6\\pi}{5}}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة وممتازة! $\\sin\\frac{\\pi}{5} + i\\cos\\frac{\\pi}{5} = \\cos\\left(\\frac{\\pi}{2} - \\frac{\\pi}{5}\\right) + i\\sin\\left(\\frac{\\pi}{2} - \\frac{\\pi}{5}\\right) = e^{i\\frac{3\\pi}{10}}$ ، وبالضرب في $-2 = 2e^{i\\pi}$ نجد $2e^{i\\left(\\pi + \\frac{3\\pi}{10}\\right)} = 2e^{i\\frac{13\\pi}{10}}$ .',
					'خطأ فادح: الطويلة يجب أن تكون موجبة تماماً ($r = 2 > 0$) فلا تقبل إشارة سالبة.',
					'خطأ: حوّلت $\\sin + i\\cos$ إلى $e^{i\\frac{3\\pi}{10}}$ ببراعة، لكنك أهملت الإشارة السالبة في المعامل $-2 = 2e^{i\\pi}$ !',
					'خطأ: عاملت $\\sin\\frac{\\pi}{5} + i\\cos\\frac{\\pi}{5}$ وكأنها $\\cos\\frac{\\pi}{5} + i\\sin\\frac{\\pi}{5}$ !'
				],
				explanationAr:
					'نردّ القوس أولاً إلى الشكل المثلثي باستعمال الزاوية المتممة: $\\frac{\\pi}{2} - \\frac{\\pi}{5} = \\frac{3\\pi}{10}$ ، فيكون $\\sin\\frac{\\pi}{5} + i\\cos\\frac{\\pi}{5} = e^{i\\frac{3\\pi}{10}}$ . وبما أن $-2 = 2e^{i\\pi}$ ، فإن $z = 2e^{i\\pi} \\cdot e^{i\\frac{3\\pi}{10}} = 2e^{i\\frac{13\\pi}{10}}$ .'
			},
			{
				questionAr:
					'الجذران التربيعيان للعدد المركب $w = 3 - 4i$ في المجموعة $\\mathbb{C}$ هما:',
				options: [
					'$2 - i$ و $-2 + i$',
					'$2 + i$ و $-2 - i$',
					'$1 - 2i$ و $-1 + 2i$',
					'$4 - i$ و $-4 + i$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $(2 - i)^2 = 4 - 4i + i^2 = 3 - 4i$ والجذر الثاني معاكسه $-2 + i$ .',
					'خطأ في إشارة الجداء $2xy = -4 < 0$ : للعددين $x$ و $y$ إشارتان مختلفتان لأن $(2 + i)^2 = 3 + 4i$ .',
					'خطأ: $(1 - 2i)^2 = 1 - 4 - 4i = -3 - 4i$ (الجزء الحقيقي $-3$ بدلاً من $+3$).',
					'خطأ: $(4 - i)^2 = 15 - 8i \\ne 3 - 4i$ .'
				],
				explanationAr:
					'بوضع $\\delta = x + iy$ لدينا $|\\delta|^2 = |w| = \\sqrt{9 + 16} = 5$ . من $x^2 + y^2 = 5$ و $x^2 - y^2 = 3$ نجد $x^2 = 4$ و $y^2 = 1$ . ومن $2xy = -4 < 0$ نستنتج اختلاف الإشارة: $\\delta_1 = 2 - i$ و $\\delta_2 = -2 + i$ .'
			},
			{
				questionAr:
					'ليكن العدد المركب $z = \\sqrt{3} - i$ . مجموعة قيم العدد الطبيعي $n$ التي يكون من أجلها $z^n$ عدداً **حقيقياً موجباً تماماً** هي ($k \\in \\mathbb{N}$):',
				options: ['$n = 6k$', '$n = 12k$', '$n = 3k$', '$n = 6 + 12k$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'فخ شهير جداً في البكالوريا! من أجل $n = 6$ (أي $k = 1$) نجد $z^6 = 2^6 e^{-i\\pi} = -64$ وهو حقيقي **سالب** وليس موجباً!',
					'إجابة صحيحة وممتازة! $z = 2e^{-i\\frac{\\pi}{6}} \\implies z^n = 2^n e^{-i\\frac{n\\pi}{6}}$ ، ولكي تكون العمدة $0 \\pmod{2\\pi}$ يلزم $-\\frac{n\\pi}{6} = -2k\\pi \\iff n = 12k$ .',
					'خطأ: عند $n = 3$ نجد $z^3 = 8e^{-i\\frac{\\pi}{2}} = -8i$ وهو تخيلي صرف!',
					'خطأ: الصيغة $n = 6 + 12k$ تعطي الأعداد الحقيقية **السالبة تماماً** لأن عمدتها توافق $\\pi \\pmod{2\\pi}$ .'
				],
				explanationAr:
					'لدينا $|z| = 2$ و $z = 2e^{-i\\frac{\\pi}{6}}$ ، ومنه $z^n = 2^n e^{-i\\frac{n\\pi}{6}}$ . بما أن $2^n > 0$ ، يكون $z^n \\in \\mathbb{R}_+^*$ إذا وفقط إذا كان $-\\frac{n\\pi}{6} \\equiv 0 \\pmod{2\\pi} \\iff \\frac{n}{6} = 2k \\iff n = 12k$ ($k \\in \\mathbb{N}$).'
			}
		]
	},

	// =========================================================================
	// LESSON 5 (Order 5, Seq 5 — TAILORED FOR TM):
	// GEOMETRIC INTERPRETATION, POINT LOCI & FAMILIAR TRANSFORMATIONS
	// (Strictly Translation, Homothety, Rotation — ZERO Direct Similitudes!)
	// =========================================================================
	{
		...adaptLessonForTrack(
			SHARED_LESSONS_3AS_T2[4],
			'3as_tm',
			't2_complex_loci_familiar_transformations'
		),
		id: 'lesson_3as_tm_t2_complex_loci_familiar_transformations',
		slug: '3as-tm-t2-complex-loci-familiar-transformations',
		order: 5,
		domain: 'complex',
		sequenceId: 'seq5',
		sequenceTitleAr: 'المقطع الخامس: الأعداد المركبة والتحويلات النقطية المألوفة',
		titleAr: 'التفسير الهندسي للأعداد المركبة، مجموعات النقط والتحويلات النقطية المألوفة',
		objectives: [
			'توظيف التفسير الهندسي لطويلة وعمدة (z_B - z_A) و (z_C - z_A)/(z_B - z_A) لإثبات الاستقامية والتعامد وتحديد طبيعة المثلثات والرباعيات',
			'تعيين مجموعات النقط في المستوي المركب (دائرة، محور قطعة، نصف مستقيم) باستعمال الطويلة والعمدة والمرجح',
			'كتابة وتوظيف العبارة المركبة للتحويلات النقطية المألوفة (الانسحاب، التحاكي، والدوران) وتعيين عناصرها المميزة وصور الأشكال الهندسية بها'
		],
		keywordsAr: [
			'التفسير الهندسي للطويلة والعمدة',
			'مجموعات النقط',
			'الانسحاب والتحاكي والدوران',
			'الكتابة المركبة لتحويل مألوف'
		],
		discover: {
			scenarioAr:
				'في المستوي المركب المنسوب إلى معلم متعامد ومتجانس ومباشر $(O; \\vec{u}, \\vec{v})$ ، نعتبر النقط $A(1 + i)$ و $B(3 + i)$ و $C(1 + 3i)$ . نريد استثمار النسبة المركبة $\\frac{z_C - z_A}{z_B - z_A}$ لتحديد طبيعة المثلث $ABC$ ، ثم تعيين مجموعة النقط $(\\Gamma)$ باستعمال الطويلة والمرجح، وأخيراً استخراج التحويل النقطي المألوف الذي يحول $B$ إلى $C$ ويترك $A$ صامدة!',
			svg: svgComplexPlane({
				range: 4,
				points: [
					{ re: 1, im: 1, label: 'A(1+i)', color: '#dc2626' },
					{ re: 3, im: 1, label: 'B(3+i)', color: '#1d4ed8' },
					{ re: 1, im: 3, label: 'C(1+3i)', color: '#15803d' }
				],
				segments: [
					{ from: [1, 1], to: [3, 1], color: '#1d4ed8' },
					{ from: [1, 1], to: [1, 3], color: '#15803d' },
					{ from: [3, 1], to: [1, 3], color: '#94a3b8' }
				],
				circles: [{ cx: 1, cy: 1, r: 2, color: '#64748b' }]
			}),
			steps: [
				{
					promptAr:
						'احسب النسبة المركبة $L = \\frac{z_C - z_A}{z_B - z_A}$ انطلاقاً من $z_A = 1 + i$ و $z_B = 3 + i$ و $z_C = 1 + 3i$ ، واكتب قيمتها المبسطة.',
					hintAr: 'احسب البسط $z_C - z_A = 2i$ والمقام $z_B - z_A = 2$ ثم اختزل.',
					expectedInput: 'i',
					revealAr:
						'لدينا $\\frac{z_C - z_A}{z_B - z_A} = \\frac{2i}{2} = i = e^{i\\frac{\\pi}{2}}$ . بما أن $|L| = 1 \\implies AC = AB$ و $\\arg(L) \\equiv \\frac{\\pi}{2} \\pmod{2\\pi} \\implies (\\overrightarrow{AB}; \\overrightarrow{AC}) \\equiv \\frac{\\pi}{2} \\pmod{2\\pi}$ ، فالمثلث $ABC$ **قائم ومتساوي الساقين في $A$ ومباشر**.'
				},
				{
					promptAr:
						'نستنتج من $z_C - z_A = i(z_B - z_A)$ أن $C$ هي صورة $B$ بالدوران $R$ الذي مركزه $A(1 + i)$ وزاويته $\\frac{\\pi}{2}$ . اكتب العبارة المركبة المختصرة لـ $R$ على الشكل $z\' = iz + b$ ؛ ما قيمة العدد المركب $b$ ؟',
					hintAr: 'انشر $z\' - (1 + i) = i(z - 1 - i) \\iff z\' = iz - i - i^2 + 1 + i$ .',
					expectedInput: '2',
					revealAr:
						'لدينا $z\' = iz - i + 1 + 1 + i = iz + 2$ ، ومنه $b = 2$ . (بالتحقق من النقطة الصامدة: $\\omega = \\frac{2}{1 - i} = 1 + i = z_A$).'
				},
				{
					promptAr:
						'لتكن $G$ مرجح الجملة المثقلة $\\{(A, 1), (B, 1), (C, 2)\\}$ . احسب لاحقة المرجح $z_G = \\frac{z_A + z_B + 2z_C}{4}$ على الشكل الجبري (اكتب `1.5+2i` ).',
					hintAr: 'اجمع البسط $(1 + i) + (3 + i) + 2(1 + 3i) = 6 + 8i$ ثم اقسم الجزأين الحقيقي والتخيلي على مجموع المعاملات $4$ .',
					expectedInput: '1.5+2i',
					revealAr:
						'نحسب $z_G = \\frac{(1 + i) + (3 + i) + 2(1 + 3i)}{1 + 1 + 2} = \\frac{6 + 8i}{4} = \\frac{3}{2} + 2i = 1.5 + 2i$ . وعليه فإن أي علاقة شعاعية $\\|\\overrightarrow{MA} + \\overrightarrow{MB} + 2\\overrightarrow{MC}\\| = 12$ تؤول بالمرجح إلى $\\|4\\overrightarrow{MG}\\| = 12 \\iff GM = 3$ (دائرة مركزها $G$ ونصف قطرها $3$).'
				},
				{
					promptAr:
						'ما هو نصف قطر الدائرة $(\\mathcal{C}\')$ صورة الدائرة $(\\mathcal{C})$ ذات المركز $G$ ونصف القطر $R_0 = 3$ بالتحاكي $h$ الذي مركزه $A(1 + i)$ ونسبته $k = -2$ ؟',
					hintAr: 'التحاكي ذو النسبة $k$ يضرب أنصاف الأقطار والأطوال في القيمة المطلقة $|k|$ .',
					expectedInput: '6',
					revealAr:
						'صورة دائرة نصف قطرها $R_0 = 3$ بتحاكٍ نسبته $k = -2$ هي دائرة مركزها $G\' = h(G)$ ونصف قطرها $R\' = |-2| \\times 3 = 6$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**التفسير الهندسي للطويلة والعمدة وطبيعة الأشكال**:\n- $AB = |z_B - z_A|$ ، و $(\\vec{u}; \\overrightarrow{AB}) \\equiv \\arg(z_B - z_A) \\pmod{2\\pi}$ .\n- للنسبة $L = \\frac{z_C - z_A}{z_B - z_A}$ : $|L| = \\frac{AC}{AB}$ و $\\arg(L) \\equiv (\\overrightarrow{AB}; \\overrightarrow{AC}) \\pmod{2\\pi}$ .\n- $L \\in \\mathbb{R}^* \\iff A, B, C$ في استقامية؛ $L \\in i\\mathbb{R}^* \\iff (AB) \\perp (AC)$ ؛ $L = \\pm i \\iff ABC$ قائم ومتساوي الساقين في $A$ ؛ $L = e^{\\pm i\\frac{\\pi}{3}} \\iff ABC$ متقايس الأضلاع.',
				'**مجموعات النقط المرجعية $M(z)$ والمرجح في المستوي المركب**:\n1) $|z - z_A| = r$ ($r > 0$): دائرة مركزها $A$ ونصف قطرها $r$ .\n2) $|z - z_A| = |z - z_B|$ : محور القطعة $[AB]$ .\n3) $\\|\\alpha\\overrightarrow{MA} + \\beta\\overrightarrow{MB} + \\gamma\\overrightarrow{MC}\\| = k$ (مع $s = \\alpha + \\beta + \\gamma \\ne 0$ و $k > 0$): بإدخال المرجح $G$ ذي اللاحقة $z_G = \\frac{\\alpha z_A + \\beta z_B + \\gamma z_C}{s}$ تصبح $|s| \\cdot MG = k \\iff MG = \\frac{k}{|s|}$ (دائرة مركزها $G$ ونصف قطرها $\\frac{k}{|s|}$ )؛ أما إذا كان $s = 0$ فالشعاع ثابت أو يؤول لمحور.\n4) $\\arg(z - z_A) \\equiv \\theta \\pmod{2\\pi}$ : نصف مستقيم مفتوح مبدؤه $A$ (باستثناء $A$)؛ و $\\arg\\left(\\frac{z - z_A}{z - z_B}\\right) \\equiv \\frac{\\pi}{2} \\pmod{\\pi}$ : الدائرة ذات القطر $[AB]$ باستثناء $A$ و $B$ .',
				'**التحويلات النقطية المألوفة الثلاثة المقررة في شعبة تقني رياضي** ($z\' = az + b$):\n1) **الانسحاب** ($a = 1$): $z\' = z + b$ ، شعاعه $\\vec{w}$ ذو اللاحقة $b$ .\n2) **التحاكي** ($a = k \\in \\mathbb{R}^* \\setminus \\{1\\}$): نسبته $k$ ومركزه النقطة الصامدة الوحيدة $\\Omega(\\omega)$ حيث $\\omega = \\frac{b}{1 - k}$ ، وعبارته النموذجية $z\' - \\omega = k(z - \\omega)$ (يضرب المسافات في $|k|$ والمساحات في $k^2$ ويحفظ الزوايا الموجهة والمرجح).\n3) **الدوران** ($a \\in \\mathbb{C} \\setminus \\mathbb{R}$ مع $|a| = 1$ أي $a = e^{i\\theta}$): زاويته $\\theta = \\arg(a) \\pmod{2\\pi}$ ومركزه $\\Omega(\\omega)$ حيث $\\omega = \\frac{b}{1 - e^{i\\theta}}$ ، وعبارته النموذجية $z\' - \\omega = e^{i\\theta}(z - \\omega)$ (تقايس يحفظ الأطوال والزوايا الموجهة والمرجح).'
			],
			visualSvg: svgComplexPlane({
				range: 4,
				points: [
					{ re: 1, im: 1, label: 'Ω(1+i)', color: '#dc2626' },
					{ re: 2, im: 1, label: 'M(2+i)', color: '#1d4ed8' },
					{ re: -1, im: 1, label: "M'(-1+i)", color: '#15803d' },
					{ re: 1, im: 2, label: 'M"(1+2i)', color: '#7c3aed' }
				],
				segments: [
					{ from: [-1, 1], to: [2, 1], color: '#15803d' },
					{ from: [1, 1], to: [1, 2], color: '#7c3aed' }
				]
			}),
			visualCaptionAr:
				'صورة $M(2 + i)$ بالتحاكي $h(\\Omega, -2)$ هي $M\'(-1 + i)$ ، وصورتها بالدوران $R(\\Omega, \\frac{\\pi}{2})$ هي $M\'\'(1 + 2i)$ حول نفس المركز $\\Omega(1 + i)$',
			examples: [
				{
					problemAr:
						'لتكن النقط $A(2)$ ، $B(-1 + i\\sqrt{3})$ ، و $C(-1 - i\\sqrt{3})$ في المستوي المركب المباشر.\n1) عين زاوية الدوران $R$ الذي مركزه المبدأ $O$ ويحول $A$ إلى $B$ ، ثم الذي يحول $B$ إلى $C$ واستنتج طبيعة المثلث $ABC$ .\n2) عين مجموعة النقط $M(z)$ التي تحقق $|2z - 4| = |2\\bar{z} + 2 - 2i\\sqrt{3}|$ .',
					solutionAr:
						'1) نكتب اللواحق على الشكل الأسي: $z_A = 2 = 2e^{i0}$ ، $z_B = 2e^{i\\frac{2\\pi}{3}}$ ، و $z_C = \\bar{z_B} = 2e^{-i\\frac{2\\pi}{3}} = 2e^{i\\frac{4\\pi}{3}}$ .\nنلاحظ أن $z_B = e^{i\\frac{2\\pi}{3}} z_A$ و $z_C = e^{i\\frac{2\\pi}{3}} z_B$ و $z_A = e^{i\\frac{2\\pi}{3}} z_C$ !\nإذن الدوران $R\\left(O, \\frac{2\\pi}{3}\\right)$ يحول $A \\mapsto B \\mapsto C \\mapsto A$ ، وبما أنه تقايس فإن $AB = BC = CA$ ، فالمثلث $ABC$ **متقايس الأضلاع** مركز ثقله المبدأ $O$ .\n\n2) نبسط المعادلة بقسمة الطرفين على $2$ واستعمال $|\\bar{w}| = |w|$ على الطرف الثاني:\n$$|z - 2| = |\\bar{z} + 1 - i\\sqrt{3}| = |\\overline{\\bar{z} + 1 - i\\sqrt{3}}| = |z + 1 + i\\sqrt{3}| = |z - (-1 - i\\sqrt{3})|$$\nتُترجم هندسياً إلى $MA = MC$ ، فالمجموعة هي **محور القطعة المستقيمة $[AC]$** (وهو المستقيم $(OB)$ لأن $OA = OC = 2$ و $BA = BC$).'
				},
				{
					problemAr:
						'حدد طبيعة وعناصر التحويل النقطي $T$ المعرف بـ $z\' = \\left(\\frac{1}{2} + i\\frac{\\sqrt{3}}{2}\\right)z + \\frac{1}{2} - i\\frac{\\sqrt{3}}{2}$ ، ثم عين صورة الدائرة $(\\mathcal{C})$ ذات المركز $I(2)$ ونصف القطر $3$ بالتحويل $T$ .',
					solutionAr:
						'1) المعامل المضروب في $z$ هو $a = \\frac{1}{2} + i\\frac{\\sqrt{3}}{2} = e^{i\\frac{\\pi}{3}} \\notin \\mathbb{R}$ ويحقق $|a| = 1$ .\nإذن $T$ **دوران** زاويته $\\theta = \\frac{\\pi}{3}$ ، ومركزه النقطة الصامدة الوحيدة $\\Omega(\\omega)$ حيث:\n$$\\omega = \\frac{b}{1 - a} = \\frac{\\frac{1}{2} - i\\frac{\\sqrt{3}}{2}}{1 - \\left(\\frac{1}{2} + i\\frac{\\sqrt{3}}{2}\\right)} = \\frac{\\frac{1}{2} - i\\frac{\\sqrt{3}}{2}}{\\frac{1}{2} - i\\frac{\\sqrt{3}}{2}} = 1$$\nأي المركز هو $\\Omega(1, 0)$ .\n2) بما أن الدوران يحفظ المسافات، فإن صورة الدائرة $(\\mathcal{C})$ هي الدائرة $(\\mathcal{C}\')$ التي نصف قطرها $R\' = 3$ ومركزها $I\' = T(I)$ ذو اللاحقة:\n$$z_{I\'} = e^{i\\frac{\\pi}{3}}(2 - 1) + 1 = \\frac{1}{2} + i\\frac{\\sqrt{3}}{2} + 1 = \\frac{3}{2} + i\\frac{\\sqrt{3}}{2}$$'
				}
			],
			watchOutAr:
				'احذر ثلاثة أخطاء متكررة في البكالوريا: (1) الخلط بين اتجاه الشعاعين في عمدة النسبة: $\\arg\\left(\\frac{z_C - z_A}{z_B - z_A}\\right)$ تساوي الزاوية الموجهة من شعاع **المقام** إلى شعاع **البسط** $(\\overrightarrow{AB}; \\overrightarrow{AC})$ وليس العكس! (2) عند وجود $\\bar{z}$ داخل الطويلة مثل $|\\bar{z} - 2i| = 3$ طبّق المرافق داخل الطويلة أولاً $|z + 2i| = 3$ قبل قراءة لاحقة المركز $z_0 = -2i$ . (3) لا تنسَ القيمة المطلقة $|k|$ عند حساب نصف قطر صورة دائرة بالتحاكي ذي النسبة السالبة $k < 0$ .'
		},
		practice: [
			{
				questionAr:
					'في المستوي المركب المباشر، مجموعة النقط $M(z)$ التي تحقق $\\arg\\left(\\frac{z - 2i}{z + 1}\\right) \\equiv \\frac{\\pi}{2} \\pmod{2\\pi}$ (مع $z \\ne 2i$ و $z \\ne -1$) هي:',
				options: [
					'الدائرة ذات القطر $[AB]$ كاملة باستثناء $A(-1)$ و $B(2i)$',
					'نصف الدائرة المفتوح ذو الحد $[AB]$ (باستثناء $A(-1)$ و $B(2i)$) بحيث $(\\overrightarrow{MA}; \\overrightarrow{MB}) \\equiv \\frac{\\pi}{2} \\pmod{2\\pi}$',
					'المستقيم المحوري للقطعة $[AB]$',
					'المستقيم $(AB)$ باستثناء النقطتين $A$ و $B$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'فخ شهير في البكالوريا! الدائرة الكاملة (باستثناء $A, B$) تنتج عندما يكون الترديد $\\pmod{\\pi}$ ، أما هنا فالترديد $\\pmod{2\\pi}$ يفرض اتجاهاً مباشراً وحيداً للزاوية القائمة!',
					'إجابة دقيقة وممتازة! بوضع $z_A = -1$ و $z_B = 2i$ يكافئ الشرط $(\\overrightarrow{MA}; \\overrightarrow{MB}) \\equiv \\frac{\\pi}{2} \\pmod{2\\pi}$ ، وهو نصف الدائرة المفتوح الذي قطره $[AB]$ في الاتجاه المباشر.',
					'خطأ: المحور يقابل تساوي الطويلتين $|z - 2i| = |z + 1|$ لا العمدة.',
					'خطأ: المستقيم $(AB)$ يقابل العمدة $0 \\pmod{\\pi}$ لا $\\frac{\\pi}{2}$ .'
				],
				explanationAr:
					'نضع $A(-1)$ و $B(2i)$ فتصبح العلاقة $(\\overrightarrow{MA}; \\overrightarrow{MB}) \\equiv \\frac{\\pi}{2} \\pmod{2\\pi}$ . تعامد الشعاعين مع حفظ الاتجاه المباشر بترديد $2\\pi$ يعين نصف دائرة مفتوحاً قطره $[AB]$ (باستثناء $A$ و $B$).'
			},
			{
				questionAr:
					'طبيعة وعناصر التحويل النقطي $T$ ذي الكتابة المركبة $z\' = -2z + 6 - 3i$ في المستوي المركب هي:',
				options: [
					'انسحاب شعاعه ذو اللاحقة $6 - 3i$',
					'تحاكٍ نسبته $k = -2$ ومركزه $\\Omega(2 - i)$',
					'تحاكٍ نسبته $k = -2$ ومركزه $\\Omega(-6 + 3i)$',
					'دوران زاويته $\\pi$ ومركزه $\\Omega(2 - i)$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الانسحاب يقتضي أن يكون معامل $z$ مساوياً لـ $1$ بينما هنا $a = -2$ .',
					'إجابة صحيحة! بما أن $a = -2 \\in \\mathbb{R}^* \\setminus \\{1\\}$ فالتحويل تحاكٍ نسبته $k = -2$ ومركزه $\\omega = \\frac{6 - 3i}{1 - (-2)} = \\frac{6 - 3i}{3} = 2 - i$ .',
					'خطأ في إشارة المقام بقانون النقطة الصامدة: قسمت على $1 - 2 = -1$ بدلاً من $1 - (-2) = 3$ !',
					'خطأ: الدوران ذو الزاوية $\\pi$ (التناظر المركزي) يقابل $a = -1$ لأن $|-1| = 1$ ، أما هنا فـ $|-2| = 2 \\ne 1$ .'
				],
				explanationAr:
					'في العبارة $z\' = az + b$ لدينا $a = -2 \\in \\mathbb{R}^* \\setminus \\{1\\}$ ، فالتحويل تحاكٍ نسبته $k = -2$ . نحل معادلة النقطة الصامدة $\\omega = -2\\omega + 6 - 3i \\iff 3\\omega = 6 - 3i \\iff \\omega = 2 - i$ .'
			},
			{
				questionAr:
					'لتكن النقطتان $A(1 - i)$ و $B(3 + 3i)$ في المستوي المركب. مجموعة النقط $M(z)$ التي تحقق $\\|\\overrightarrow{MA} + 3\\overrightarrow{MB}\\| = 8$ هي:',
				options: [
					'الدائرة ذات المركز $G\\left(\\frac{5}{2} + 2i\\right)$ ونصف القطر $R = 2$',
					'الدائرة ذات المركز $G\\left(\\frac{5}{2} + 2i\\right)$ ونصف القطر $R = 8$',
					'الدائرة ذات المركز $G(2 + i)$ ونصف القطر $R = 2$',
					'محور القطعة المستقيمة $[AB]$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة وممتازة! مرجح $\\{(A, 1), (B, 3)\\}$ لاحقته $z_G = \\frac{(1 - i) + 3(3 + 3i)}{4} = \\frac{10 + 8i}{4} = \\frac{5}{2} + 2i$ ، والعلاقة تصبح $\\|4\\overrightarrow{MG}\\| = 8 \\iff MG = 2$ .',
					'خطأ شائع: نسيت قسمة الطرف الثاني $8$ على مجموع المعاملات $1 + 3 = 4$ بعد اختزال الشعاع إلى $4\\overrightarrow{MG}$ !',
					'خطأ: النقطة $2 + i$ هي منتصف $[AB]$ (معاملات متساوية) وليست مرجح الجملة المثقلة بالمعاملين $1$ و $3$ .',
					'خطأ: مجموع المعاملات $4 \\ne 0$ فالمجموعة دائرة مركزها المرجح وليست محوراً.'
				],
				explanationAr:
					'ندخل مرجح الجملة $\\{(A, 1), (B, 3)\\}$ ذا اللاحقة $z_G = \\frac{1(1 - i) + 3(3 + 3i)}{1 + 3} = \\frac{10 + 8i}{4} = \\frac{5}{2} + 2i$ . بخاصية الاختزال الشعاعي تصبح العلاقة $\\|4\\overrightarrow{MG}\\| = 8 \\iff 4MG = 8 \\iff MG = 2$ ، وهي دائرة مركزها $G$ ونصف قطرها $2$ .'
			}
		]
	},

	// =========================================================================
	// LESSON 6 (Order 6, Seq 6): PRIMITIVE FUNCTIONS & SIMPLE DIFF EQS
	// =========================================================================
	adaptSharedT2(SHARED_LESSONS_3AS_T2[5], 't2_primitive_functions', {
		order: 6,
		domain: 'analysis',
		sequenceId: 'seq6',
		sequenceTitleAr: 'المقطع السادس: الدوال الأصلية وإدماج الفصل الثاني',
		titleAr: "الدوال الأصلية على مجال والمعادلات التفاضلية من الشكل y' = f(x) و y'' = f(x)",
		objectives: [
			'تعريف الدالة الأصلية لدالة مستمرة على مجال وتعيين الدوال الأصلية للدوال المألوفة والدوال المركبة بتفكيك أو تهيئة العبارة',
			'إثبات وحدانية وتعيين الدالة الأصلية التي تأخذ قيمة معلومة y_0 عند x_0',
			"حل المعادلات التفاضلية البسيطة من الشكل y' = f(x) و y'' = f(x) وتطبيقاتها الميكانيكية والفيزيائية"
		],
		keywordsAr: [
			'الدالة الأصلية',
			'الدوال الأصلية المألوفة',
			'الشرط الابتدائي',
			'المعادلات التفاضلية'
		]
	}),

	// =========================================================================
	// LESSON 7 (Order 7, Seq 6 — TAILORED TM T2 INTEGRATION):
	// BEZOUT & GAUSS, PROBABILITIES, COMPLEX NUMBERS & PRIMITIVES
	// =========================================================================
	{
		id: 'lesson_3as_tm_t2_integration',
		slug: '3as-tm-t2-integration',
		grade: '3as_tm',
		yearSubjectId: 725,
		trimesterId: 't2',
		sequenceId: 'seq6',
		sequenceTitleAr: 'المقطع السادس: الدوال الأصلية وإدماج الفصل الثاني',
		order: 7,
		domain: 'integration',
		titleAr: 'إدماج وحصيلة الفصل الثاني: بيزو وغوص، الاحتمالات، الأعداد المركبة والدوال الأصلية',
		objectives: [
			'حل تمارين حسابية شاملة تجمع الموافقات والتعداد ومبرهنتي بيزو وغوص والمعادلات الديوفانتية ax + by = c',
			'تجنيد قوانين العد والاحتمالات والأعداد المركبة والتحويلات النقطية المألوفة في تمارين مستقلة من نمط البكالوريا',
			'استثمار الدوال الأصلية في التمهيد للمسائل التكاملية الشاملة'
		],
		keywordsAr: [
			'إدماج الحساب في Z',
			'مسائل الأعداد المركبة والاحتمالات',
			'الدوال الأصلية',
			'حصيلة الفصل الثاني'
		],
		discover: {
			scenarioAr:
				'نحاكي موضوع اختبار فصلي شامل وموضوع شهادة البكالوريا لشعبة **تقني رياضي** ($4 + 4 + 5 + 7 = 20$ نقطة، المدة $4\\text{ h }30\\text{ min}$ ، المعامل $6$) عبر أربع محطات متكاملة:\n1) **الحساب في $\\mathbb{Z}$ ($5$ نقاط)**: المعادلة الديوفانتية $7x - 5y = 2$ وربطها بجملة موافقات وتعداد.\n2) **الاحتمالات ($4$ نقاط)**: سحب من وعاءين بشجرة احتمالات موزونة.\n3) **الأعداد المركبة ($4$ نقاط)**: معادلة في $\\mathbb{C}$ ودوران مألوف $R\\left(O, \\frac{\\pi}{3}\\right)$.\n4) **الدوال الأصلية (تمهيد المسألة الشاملة — $7$ نقاط)**: تفكيك دالة وتعيين دالتها الأصلية بشرط ابتدائي.',
			svg: svgProbabilityTree({
				rootLabel: 'Ω',
				firstLevel: [
					{
						label: 'U1',
						probLabel: '2/5',
						children: [
							{ label: 'V', probLabel: '3/4' },
							{ label: 'R', probLabel: '1/4' }
						]
					},
					{
						label: 'U2',
						probLabel: '3/5',
						children: [
							{ label: 'V', probLabel: '1/2' },
							{ label: 'R', probLabel: '1/2' }
						]
					}
				]
			}),
			steps: [
				{
					promptAr:
						'**المحطة 1 (بيزو وغوص)**: في المعادلة الديوفانتية $7x - 5y = 2$ على $\\mathbb{Z}^2$ ، الثنائية $(1, 1)$ حل خاص لأن $7(1) - 5(1) = 2$ ، فيكون الحل العام بمبرهنة غوص $(x, y) = (5k + 1,\\; 7k + 1)$ ($k \\in \\mathbb{Z}$). ما هو أصغر عدد طبيعي $N$ يحقق في آنٍ واحد $N \\equiv 3 \\pmod{7}$ و $N \\equiv 5 \\pmod{5}$ (أي مضاعف لـ $5$)؟',
					hintAr: 'اكتب $N = 7x + 3 = 5y \\implies 5y - 7x = 3$ أو جرب مضاعفات $5$ الموجبة: $0, 5, 10, 15, \\dots$ للوصول إلى باقي $3$ على $7$ !',
					expectedInput: '10',
					revealAr:
						'نضع $N = 5y = 7x + 3 \\iff 5y - 7x = 3$ (أو باستعمال $7x - 5y = -3$: من $7(1) - 5(2) = -3$ نجد $x = 5k + 1, y = 7k + 2$ ومنه $N = 5(7k + 2) = 35k + 10$). أصغر عدد طبيعي يتحقق من أجل $k = 0$ وهو $N = 10$ (فعلاً $10 \\equiv 0 \\equiv 5 \\pmod{5}$ و $10 = 7(1) + 3 \\equiv 3 \\pmod{7}$).'
				},
				{
					promptAr:
						'**المحطة 2 (الاحتمالات الشرطية)**: انطلاقاً من شجرة الاحتمالات أعلاه حيث $P(U_1) = \\frac{2}{5}$ و $P_{U_1}(V) = \\frac{3}{4}$ و $P(U_2) = \\frac{3}{5}$ و $P_{U_2}(V) = \\frac{1}{2}$ ، احسب بدستور الاحتمالات الكلية احتمال سحب كرة خضراء $P(V)$ على شكل كسر عشري (مثل `0.6` ).',
					hintAr: 'احسب $\\frac{2}{5} \\times \\frac{3}{4} + \\frac{3}{5} \\times \\frac{1}{2} = \\frac{3}{10} + \\frac{3}{10}$ .',
					expectedInput: '0.6',
					revealAr:
						'بدستور الاحتمالات الكلية: $P(V) = P(U_1)P_{U_1}(V) + P(U_2)P_{U_2}(V) = \\frac{2}{5} \\cdot \\frac{3}{4} + \\frac{3}{5} \\cdot \\frac{1}{2} = \\frac{3}{10} + \\frac{3}{10} = \\frac{6}{10} = \\frac{3}{5} = 0.6$ .'
				},
				{
					promptAr:
						'**المحطة 3 (الأعداد المركبة والدوران)**: لتكن $A(2)$ و $B = R\\left(O, \\frac{\\pi}{3}\\right)(A)$ صورة $A$ بالدوران الذي مركزه $O$ وزاويته $\\frac{\\pi}{3}$ . لدينا $z_B = 2e^{i\\frac{\\pi}{3}} = 1 + i\\sqrt{3}$ . ما هي طبيعة المثلث $OAB$ (اكتب `متقايس الأضلاع` )؟',
					hintAr: 'بما أن $B$ صورة $A$ بدوران مركزه $O$ وزاويته $\\frac{\\pi}{3}$ فإن $OB = OA = 2$ والزاوية المحصورة $\\frac{\\pi}{3}$ .',
					expectedInput: 'متقايس الأضلاع',
					revealAr:
						'بخواص الدوران لدينا $OB = OA = 2$ و $(\\overrightarrow{OA}; \\overrightarrow{OB}) \\equiv \\frac{\\pi}{3} \\pmod{2\\pi}$ ، فالمثلث $OAB$ **متقايس الأضلاع** ومباشر.'
				},
				{
					promptAr:
						'**المحطة 4 (الدوال الأصلية)**: لتكن $f(x) = 2x - 1 + \\frac{2e^x}{e^x + 1}$ على $\\mathbb{R}$ . عين قيمة الثابت $c$ في الدالة الأصلية $F(x) = x^2 - x + 2\\ln(e^x + 1) + c$ التي تحقق $F(0) = \\ln 4 + 3$ .',
					hintAr: 'عوض $x = 0$ في $F(0) = 0 - 0 + 2\\ln(2) + c$ وتذكر أن $2\\ln 2 = \\ln 4$ .',
					expectedInput: '3',
					revealAr:
						'لدينا $F(0) = 2\\ln(1 + 1) + c = \\ln 4 + c$ . بالمطابقة مع الشرط $F(0) = \\ln 4 + 3$ نجد $c = 3$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**خطة حل تمرين الحساب في $\\mathbb{Z}$ في بكالوريا تقني رياضي ($5$ نقاط)**:\n1) ادرس دورية بواقي القوى $a^n \\pmod{m}$ في جدول منظم، واستنتج قواسم أو بواقي عبارات جبرية.\n2) أثبت أولية عبارتين فيما بينهما بتشكيل توليفة خطية مساوية لـ $\\pm 1$ وتطبيق **مبرهنة بيزو**.\n3) حل المعادلة الديوفانتية $ax + by = c$ باختزال $d = \\text{PGCD}(a, b)$ ، إيجاد حل خاص، وتطبيق **مبرهنة غوص** مع ذكر شرط الأولية فيما بينهما صراحةً، ثم استثمر الحلول في مسائل التعداد أو تقاطع المتتاليات.',
				'**ربط الحساب في $\\mathbb{Z}$ بالاحتمالات أو الأعداد المركبة**:\n- في تمارين الاحتمالات المدمجة بشعبة تقني رياضي، قد تُربط الحادثة بشرط حسابي مثل: «سحب رقمين $(x, y)$ يحققان $3x + 2y \\equiv 0 \\pmod{5}$» أو «العدد المركب $z^n$ حقيقي موجب ($n$ مضاعف لـ $6$ مثلاً)»، فنحصي المخارج الملائمة بدقة باستعمال الموافقات قبل حساب الاحتمال!',
				'**التكامل المنهجي بين الأعداد المركبة والدوال الأصلية**:\n- في المستوي المركب تقتصر التحويلات المألوفة في تقني رياضي على **الانسحاب، التحاكي، والدوران** ($z\' = az + b$ مع $a = 1$ أو $a \\in \\mathbb{R}^*$ أو $|a| = 1$).\n- في التحليل، تعيين الدالة الأصلية بتفكيك الكسور أو مطابقة معاملات $F(x) = (ax + b)e^{-x}$ يمهد مباشرة لحساب التكاملات والمساحات والحجوم الدورانية في الفصل الثالث.'
			],
			visualSvg: svgComplexPlane({
				range: 3,
				points: [
					{ re: 0, im: 0, label: 'O(0)', color: '#0f172a' },
					{ re: 2, im: 0, label: 'A(2)', color: '#dc2626' },
					{ re: 1, im: Math.sqrt(3), label: 'B(1+i√3)', color: '#1d4ed8' }
				],
				segments: [
					{ from: [0, 0], to: [2, 0], color: '#dc2626' },
					{ from: [0, 0], to: [1, Math.sqrt(3)], color: '#1d4ed8' },
					{ from: [2, 0], to: [1, Math.sqrt(3)], color: '#15803d' }
				],
				circles: [{ cx: 0, cy: 0, r: 2, color: '#94a3b8' }]
			}),
			visualCaptionAr:
				'المثلث متقايس الأضلاع $OAB$ الناتج عن صورة $A(2)$ بالدوران $R\\left(O, \\frac{\\pi}{3}\\right)$ في المستوي المركب',
			examples: [
				{
					problemAr:
						'تمرين مدمج (احتمالات + موافقات ومركبة): نرمي زهر نرد متوازناً أوجهه مرقمة من $1$ إلى $6$ مرتين متتاليتين ومستقلتين، ونسمي $(a, b)$ ثنائية الرقمين الظاهرين، ونضع العدد المركب $Z = \\left(\\frac{1}{2} + i\\frac{\\sqrt{3}}{2}\\right)^{2a + b}$ . احسب احتمال الحادثة $E$ : «العدد المركب $Z$ حقيقي».',
					solutionAr:
						'1) عدد المخارج الكلية هو $\\text{card}(\\Omega) = 6^2 = 36$ وهم متساوو الاحتمال.\n2) نكتب الأساس على الشكل الأسي: $\\frac{1}{2} + i\\frac{\\sqrt{3}}{2} = e^{i\\frac{\\pi}{3}}$ ، فيكون $Z = e^{i\\frac{(2a + b)\\pi}{3}}$ .\nيكون $Z \\in \\mathbb{R}$ إذا وفقط إذا كان $\\frac{(2a + b)\\pi}{3} \\equiv 0 \\pmod{\\pi} \\iff 2a + b \\equiv 0 \\pmod{3}$ .\nبما أن $2 \\equiv -1 \\pmod{3}$ ، فإن الشرط يكافئ $-a + b \\equiv 0 \\pmod{3} \\iff b \\equiv a \\pmod{3}$ !\n3) نقسم المجموعة $\\{1, 2, 3, 4, 5, 6\\}$ حسب بواقي القسمة على $3$ إلى ثلاث فئات متساوية الحجم (رقمان لكل باقٍ): $\\{3, 6\\}$ (الباقي $0$)، $\\{1, 4\\}$ (الباقي $1$)، و $\\{2, 5\\}$ (الباقي $2$).\nلكي يكون لـ $a$ و $b$ نفس الباقي بترديد $3$ ، توجد $3 \\times (2 \\times 2) = 12$ ثنائية ملائمة! إذن $P(E) = \\frac{12}{36} = \\frac{1}{3}$ .'
				},
				{
					problemAr:
						'نريد إيجاد جميع الأعداد الطبيعية $N$ المكتوبة في الأساس $8$ بثلاثة أرقام على الشكل $N = \\overline{a b a}^{8}$ ($a \\ne 0$) والتي تقبل القسمة على $5$ وعلى $7$ في آن واحد.',
					solutionAr:
						'1) شرط الكتابة في الأساس $8$ : $a \\in \\{1, 2, \\dots, 7\\}$ و $b \\in \\{0, 1, \\dots, 7\\}$ .\n2) النشر في النظام العشري: $N = 64a + 8b + a = 65a + 8b$ .\n3) ندرس الشرطين باستعمال الموافقات ومبرهنة غوص:\n- الشرط $5 \\mid N$ : بما أن $65a = 5(13a)$ مضاعف لـ $5$ دوماً، فإن $5 \\mid (65a + 8b) \\iff 5 \\mid 8b$ . وبما أن $\\text{PGCD}(5, 8) = 1$ فحسب مبرهنة غوص $5 \\mid b$ ! وبما أن $0 \\le b \\le 7$ فإما $b = 0$ وإما $b = 5$ .\n- الشرط $7 \\mid N$ : لدينا $65 \\equiv 2 \\pmod{7}$ و $8 \\equiv 1 \\pmod{7}$ ، إذن $2a + b \\equiv 0 \\pmod{7}$ .\n  * الحالة $b = 0$ : $2a \\equiv 0 \\pmod{7} \\implies 7 \\mid a$ (لأن $\\text{PGCD}(2, 7) = 1$)، وبما أن $1 \\le a \\le 7$ نجد $a = 7$ ، أي $N_1 = \\overline{707}^{8} = 455 = 35 \\times 13$ .\n  * الحالة $b = 5$ : $2a + 5 \\equiv 0 \\pmod{7} \\iff 2a \\equiv 2 \\pmod{7} \\implies a \\equiv 1 \\pmod{7}$ ، وبما أن $1 \\le a \\le 7$ نجد $a = 1$ ، أي $N_2 = \\overline{151}^{8} = 105 = 35 \\times 3$ .'
				}
			],
			watchOutAr:
				'تذكير منهجي حاسم لبكالوريا تقني رياضي: إذا كان العدد يقبل القسمة على $a$ وعلى $b$ ، فلا يجوز استنتاج أنه يقبل القسمة على جدائهما $ab$ إلا بعد التصريح الصريح بأن $\\text{PGCD}(a, b) = 1$ (نتيجة مبرهنة غوص)! مثلاً $12$ يقبل القسمة على $4$ وعلى $6$ لكنه لا يقبل القسمة على $24$ لأن $\\text{PGCD}(4, 6) = 2 \\ne 1$ .'
		},
		practice: [
			{
				questionAr:
					'إذا علمت أن العدد الطبيعي $N$ يقبل القسمة على $6$ وعلى $10$ في آنٍ واحد، فأي استنتاج مما يلي صحيح بالضرورة من أجل كل عدد من هذا النوع؟',
				options: [
					'$N$ يقبل القسمة حتماً على $60$',
					'$N$ يقبل القسمة حتماً على $30 = \\text{PPCM}(6, 10)$',
					'$N$ يقبل القسمة حتماً على $16$',
					'$N$ أولي مع $15$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'فخ شهير جداً! لا تطبق نتيجة غوص بضرب $6 \\times 10 = 60$ لأن $\\text{PGCD}(6, 10) = 2 \\ne 1$ (مثلاً $N = 30$ يقبل القسمة على $6$ و $10$ ولا يقبل القسمة على $60$!).',
					'إجابة دقيقة وممتازة! كل مضاعف مشترك لعددين هو مضاعف لمضاعفهما المشترك الأصغر $\\text{PPCM}(6, 10) = \\frac{60}{2} = 30$ .',
					'خطأ: العدد $30$ يقبل القسمة على $6$ و $10$ ولا يقبل القسمة على $16$ .',
					'خطأ: بما أن $6 \\mid N$ و $10 \\mid N$ فإن $3 \\mid N$ و $5 \\mid N$ فيكون $15 \\mid N$ وليس أولياً معه.'
				],
				explanationAr:
					'بما أن $\\text{PGCD}(6, 10) = 2 \\ne 1$ فلا يصح استنتاج $60 \\mid N$ . القاعدة العامة الصحيحة دوماً هي أن قابلية القسمة على $a$ وعلى $b$ تكافئ قابلية القسمة على $\\text{PPCM}(a, b) = \\frac{6 \\times 10}{2} = 30$ .'
			},
			{
				questionAr:
					'نرمي قطعة نقدية متوازنة $4$ مرات متتالية ومستقلة، وليكن $X$ عدد مرات ظهور الوجه $P$ . احتمال الحادثة «العدد $X$ قاسم للعدد $3$» هو:',
				options: [
					'$\\frac{5}{16}$',
					'$\\frac{1}{2}$',
					'$\\frac{9}{16}$',
					'$\\frac{3}{8}$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: جمعت $P(X = 0) + P(X = 3) = \\frac{1 + 4}{16} = \\frac{5}{16}$ مغفلاً $X = 1$ ومعتبراً خطأً أن $0$ قاسم لـ $3$ !',
					'إجابة صحيحة وممتازة! يتبع $X$ قانون ثنائي الحد $\\mathcal{B}\\left(4, \\frac{1}{2}\\right)$ ، وقواسم $3$ ضمن $\\{0, 1, 2, 3, 4\\}$ هما $1$ و $3$ فقط، ومنه $P(X = 1) + P(X = 3) = \\frac{C_4^1 + C_4^3}{16} = \\frac{4 + 4}{16} = \\frac{1}{2}$ .',
					'خطأ: العدد $0$ لا يقسم $3$ ، فلا تدخل $P(X = 0) = \\frac{1}{16}$ مع $P(X = 1) + P(X = 3)$ في المجموع.',
					'خطأ: القيمة $\\frac{6}{16} = \\frac{3}{8}$ توافق $P(X = 2)$ وحدها والعدد $2$ ليس قاسماً لـ $3$ .'
				],
				explanationAr:
					'يتبع $X$ قانون ثنائي الحد $\\mathcal{B}\\left(4, \\frac{1}{2}\\right)$ على المجموعة $\\{0, 1, 2, 3, 4\\}$ . قواسم العدد $3$ ضمن هذه المجموعة هما $1$ و $3$ (لأن $0$ لا يقسم $3$). إذن الاحتمال يساوي $P(X = 1) + P(X = 3) = C_4^1\\left(\\frac{1}{2}\\right)^4 + C_4^3\\left(\\frac{1}{2}\\right)^4 = \\frac{4 + 4}{16} = \\frac{1}{2}$ .'
			},
			{
				questionAr:
					'لتكن الدالة $f(x) = \\frac{2x + 1}{(x^2 + x + 1)^2}$ المعرفة على $\\mathbb{R}$ . الدالة الأصلية الوحيدة $F$ لـ $f$ على $\\mathbb{R}$ التي تنعدم عند $x = 0$ هي:',
				options: [
					'$F(x) = -\\frac{1}{x^2 + x + 1} + 1$',
					'$F(x) = -\\frac{1}{x^2 + x + 1}$',
					'$F(x) = \\ln(x^2 + x + 1)$',
					'$F(x) = \\frac{1}{x^2 + x + 1} - 1$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة وممتازة! العبارة من الشكل $\\frac{u\'(x)}{[u(x)]^2}$ حيث $u(x) = x^2 + x + 1 > 0$ ، فدالتها الأصلية $-\\frac{1}{x^2 + x + 1} + c$ ، ومن $F(0) = -1 + c = 0$ نجد $c = 1$ .',
					'خطأ كلاسيكي: وضعت $c = 0$ متناسياً أن $-\\frac{1}{0 + 0 + 1} = -1 \\ne 0$ !',
					'خطأ: الدالة الأصلية $\\ln|u|$ توافق المقام من الدرجة الأولى $\\frac{u\'}{u}$ وليس المربع $\\frac{u\'}{u^2}$ .',
					'خطأ في الإشارة: مشتقة $\\frac{1}{u}$ هي $-\\frac{u\'}{u^2}$ وليست $+\\frac{u\'}{u^2}$ .'
				],
				explanationAr:
					'نضع $u(x) = x^2 + x + 1$ (مميزها $\\Delta = -3 < 0$ فلا تنعدم أبداً على $\\mathbb{R}$)، ومشتقتها $u\'(x) = 2x + 1$ . إذن $f(x) = \\frac{u\'(x)}{[u(x)]^2}$ ، فتكون $F(x) = -\\frac{1}{x^2 + x + 1} + c$ . شرط الانعدام $F(0) = 0$ يعطي $-1 + c = 0 \\implies c = 1$ .'
			}
		]
	}
];
