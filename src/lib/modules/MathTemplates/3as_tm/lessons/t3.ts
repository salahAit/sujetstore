import type { InteractiveLessonData, MathDomain } from '../../types';
import { adaptLessonForTrack } from '../../types';
import { SHARED_LESSONS_3AS_T3 } from '../../secondary_shared_3as/lessons/t3';
import {
	svgFunctionCurvePlot,
	svgSpace3DScene,
	svgVariationTable
} from '../../svg-secondary';

export type CurriculumInteractiveLesson = InteractiveLessonData & {
	domain: MathDomain;
};

// ============================================================================
// Custom Crisp SVGs for 3AS Technical Mathematics (TM) — Trimester 3
// ============================================================================

const svgSolidOfRevolutionDiagram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 220" width="460" height="220" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">
  <rect x="8" y="8" width="444" height="204" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="230" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">توليد المجسم الدوراني حول المحور (Ox): V = π ∫ [f(x)]² dx</text>

  <!-- Axes -->
  <line x1="36" y1="130" x2="424" y2="130" stroke="#0f172a" stroke-width="1.6"/>
  <polygon points="426,130 418,126 418,134" fill="#0f172a"/>
  <text x="430" y="134" font-size="11" font-weight="bold" fill="#0f172a">x</text>

  <line x1="70" y1="196" x2="70" y2="42" stroke="#0f172a" stroke-width="1.6"/>
  <polygon points="70,40 66,48 74,48" fill="#0f172a"/>
  <text x="78" y="48" font-size="11" font-weight="bold" fill="#0f172a">y</text>

  <!-- Shaded profile between x = a (120) and x = b (340) -->
  <path d="M 120,95 Q 220,55 340,72 L 340,188 Q 220,205 120,165 Z" fill="rgba(59,130,246,0.12)"/>

  <!-- Upper generating curve y = f(x) -->
  <path d="M 120,95 Q 220,55 340,72" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>
  <!-- Symmetric lower curve y = -f(x) -->
  <path d="M 120,165 Q 220,205 340,188" fill="none" stroke="#60a5fa" stroke-width="1.8" stroke-dasharray="5,3"/>

  <!-- End ellipses at x = a and x = b -->
  <ellipse cx="120" cy="130" rx="11" ry="35" fill="rgba(37,99,235,0.14)" stroke="#2563eb" stroke-width="1.5"/>
  <ellipse cx="340" cy="130" rx="15" ry="58" fill="rgba(37,99,235,0.18)" stroke="#1d4ed8" stroke-width="1.8"/>

  <!-- Cross-section disk at x (cx = 235, ry = 53) -->
  <ellipse cx="235" cy="130" rx="13" ry="53" fill="rgba(220,38,38,0.18)" stroke="#dc2626" stroke-width="2"/>
  <line x1="235" y1="130" x2="235" y2="77" stroke="#dc2626" stroke-width="2"/>
  <circle cx="235" cy="77" r="3.5" fill="#dc2626"/>
  <text x="244" y="106" font-size="10.5" font-weight="bold" fill="#dc2626">r = f(x)</text>

  <!-- Labels for a, x, b -->
  <text x="120" y="146" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">a</text>
  <text x="235" y="146" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">x</text>
  <text x="348" y="146" text-anchor="start" font-size="11" font-weight="bold" fill="#0f172a">b</text>
  <text x="290" y="58" font-size="11" font-weight="bold" fill="#1d4ed8">y = f(x)</text>

  <!-- Formula badge -->
  <rect x="92" y="182" width="276" height="22" rx="4" fill="#fef2f2" stroke="#fca5a5"/>
  <text x="230" y="197" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#b91c1c">مساحة المقطع الدائري: S(x) = π[f(x)]² ⇐ V = ∫ S(x) dx</text>
</svg>`;

const svgCylinderConeSurfaces3D = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 225" width="460" height="225" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">
  <rect x="8" y="8" width="444" height="209" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="230" y="27" text-anchor="middle" font-size="12.2" font-weight="bold" fill="#0f172a">السطوح الدورانية حول المحور (Oz): الأسطوانة الدورانية والمخروط الدوراني</text>

  <!-- Left Panel: Cylinder x² + y² = R² -->
  <rect x="18" y="38" width="204" height="168" rx="6" fill="#ffffff" stroke="#94a3b8"/>
  <text x="120" y="55" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#1d4ed8">الأسطوانة الدورانية: x² + y² = R²</text>
  <!-- z-axis -->
  <line x1="120" y1="184" x2="120" y2="62" stroke="#0f172a" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="128" y="70" font-size="10.5" font-weight="bold" fill="#0f172a">z</text>
  <!-- Cylinder body -->
  <ellipse cx="120" cy="86" rx="46" ry="13" fill="rgba(59,130,246,0.16)" stroke="#2563eb" stroke-width="1.7"/>
  <line x1="74" y1="86" x2="74" y2="160" stroke="#2563eb" stroke-width="1.7"/>
  <line x1="166" y1="86" x2="166" y2="160" stroke="#2563eb" stroke-width="1.7"/>
  <ellipse cx="120" cy="160" rx="46" ry="13" fill="rgba(59,130,246,0.10)" stroke="#2563eb" stroke-width="1.7"/>
  <!-- Radius segment HM = R -->
  <line x1="120" y1="122" x2="166" y2="122" stroke="#dc2626" stroke-width="2"/>
  <circle cx="120" cy="122" r="3" fill="#0f172a"/>
  <circle cx="166" cy="122" r="3.5" fill="#dc2626"/>
  <text x="105" y="126" font-size="10" font-weight="bold" fill="#0f172a">H(0,0,z)</text>
  <text x="143" y="116" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">R</text>
  <text x="120" y="196" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e40af">HM² = R² ⇐ x² + y² = R²</text>

  <!-- Right Panel: Cone x² + y² = (tan²θ) z² -->
  <rect x="238" y="38" width="204" height="168" rx="6" fill="#ffffff" stroke="#94a3b8"/>
  <text x="340" y="55" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#15803d">المخروط الدوراني: x² + y² = (tan²θ)z²</text>
  <!-- z-axis -->
  <line x1="340" y1="184" x2="340" y2="62" stroke="#0f172a" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="348" y="70" font-size="10.5" font-weight="bold" fill="#0f172a">z</text>
  <!-- Upper & lower nappes vertex at O(340, 134) -->
  <ellipse cx="340" cy="84" rx="46" ry="12" fill="rgba(22,163,74,0.16)" stroke="#16a34a" stroke-width="1.7"/>
  <line x1="294" y1="84" x2="366" y2="162" stroke="#16a34a" stroke-width="1.7"/>
  <line x1="386" y1="84" x2="314" y2="162" stroke="#16a34a" stroke-width="1.7"/>
  <ellipse cx="340" cy="162" rx="26" ry="7" fill="rgba(22,163,74,0.10)" stroke="#16a34a" stroke-width="1.4"/>
  <circle cx="340" cy="134" r="3.5" fill="#dc2626"/>
  <text x="328" y="139" text-anchor="end" font-size="10" font-weight="bold" fill="#dc2626">O</text>
  <!-- Radius at z: HM = |z| tan θ -->
  <line x1="340" y1="84" x2="386" y2="84" stroke="#dc2626" stroke-width="2"/>
  <text x="363" y="79" text-anchor="middle" font-size="9.8" font-weight="bold" fill="#dc2626">|z|tanθ</text>
  <text x="351" y="115" font-size="10" font-weight="bold" fill="#d97706">θ</text>
  <text x="340" y="196" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#166534">المقطع بـ z = k دائرة r = |k|tanθ</text>
</svg>`;

function adaptSharedT3(
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
	const cleanWatchOut = adapted.summary.watchOutAr
		? adapted.summary.watchOutAr.replaceAll('العلوم التجريبية', 'تقني رياضي').replaceAll('علوم تجريبية', 'تقني رياضي')
		: undefined;
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
		keywordsAr: override.keywordsAr,
		summary: {
			...adapted.summary,
			...(cleanWatchOut !== undefined ? { watchOutAr: cleanWatchOut } : {})
		}
	};
}

// ============================================================================
// LESSONS 3AS TM — TRIMESTER 3 (7 Lessons, Grade '3as_tm', yearSubjectId 725)
// ============================================================================

export const LESSONS_3AS_TM_T3: CurriculumInteractiveLesson[] = [
	// =========================================================================
	// LESSON 1 (Order 1, Seq 7 — TAILORED FOR TM):
	// DEFINITE INTEGRAL PROPERTIES, MEAN VALUE, BOUNDS, PARITY & PERIODICITY
	// =========================================================================
	{
		...adaptSharedT3(SHARED_LESSONS_3AS_T3[0], 't3_definite_integral_mean_value_bounds', {
			order: 1,
			domain: 'analysis',
			sequenceId: 'seq7',
			sequenceTitleAr: 'المقطع السابع: الحساب التكاملي المعمق وتطبيقاته في المساحات والحجوم',
			titleAr: 'الحساب التكاملي: خواص التكامل المحدد، القيمة المتوسطة وحصر التكاملات',
			objectives: [
				'حساب التكامل المحدد ∫_a^b f(x)dx وتوظيف خواص الخطية وعلاقة شال وإشارة التكامل والمقارنة بين تكاملين',
				'حساب القيمة المتوسطة لدالة مستمرة على مجال [a, b] وتوظيف مبرهنة حصر القيمة المتوسطة لحصر تكاملات يتعذر حسابها المباشر',
				'تفسير التكامل هندسيا في معلم متعامد واستغلال الشفعية والدورية في تبسيط حساب التكاملات'
			],
			keywordsAr: [
				'التكامل المحدد',
				'علاقة شال والخطية',
				'إشارة ومقارنة التكامل',
				'القيمة المتوسطة وحصر التكامل'
			]
		}),
		summary: {
			...SHARED_LESSONS_3AS_T3[0].summary,
			rulesAr: [
				...SHARED_LESSONS_3AS_T3[0].summary.rulesAr,
				'**توظيف الشفعية والدورية لتبسيط التكاملات**: لتكن $f$ مستمرة على مجال متناظر $[-a, a]$ ($a > 0$):\n- إذا كانت $f$ **دالة زوجية** ($f(-x) = f(x)$) فإن $\\int_{-a}^a f(x)\\,dx = 2\\int_0^a f(x)\\,dx$ .\n- إذا كانت $f$ **دالة فردية** ($f(-x) = -f(x)$) فإن $\\int_{-a}^a f(x)\\,dx = 0$ فوراً دون حساب دالة أصلية!\n- إذا كانت $f$ مستمرة و**دورية** على $\\mathbb{R}$ دورها $T > 0$ ($f(x + T) = f(x)$)، فإنه من أجل كل $a \\in \\mathbb{R}$ : $\\int_a^{a + T} f(x)\\,dx = \\int_0^T f(x)\\,dx$ .'
			]
		},
		practice: [
			SHARED_LESSONS_3AS_T3[0].practice[0],
			SHARED_LESSONS_3AS_T3[0].practice[1],
			{
				questionAr:
					'ما هي القيمة المضبوطة للتكامل $I = \\int_{-1}^{1} \\left(x^3 e^{x^2} + 3x^2\\right)\\,dx$ باستغلال الخطية والشفعية؟',
				options: ['$I = 2$', '$I = 0$', '$I = 1$', '$I = 2 + e$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة ذكية وسريعة! الدالة $g(x) = x^3 e^{x^2}$ فردية على المجال المتناظر $[-1, 1]$ فتكاملها معدوم $0$ ، والدالة $h(x) = 3x^2$ زوجية فتكاملها $2\\int_0^1 3x^2\\,dx = 2[x^3]_0^1 = 2$ .',
					'انتبه! الجزء الأول $x^3 e^{x^2}$ فردي فتكامله $0$ فعلاً، لكن الجزء الثاني $3x^2$ دالة زوجية موجبة لا ينعدم تكاملها!',
					'نسيت الضرب في $2$ عند تطبيق خاصية الدالة الزوجية $\\int_{-1}^1 3x^2\\,dx = 2\\int_0^1 3x^2\\,dx = 2$ .',
					'الدالة $x^3 e^{x^2}$ فردية لأن $(-x)^3 e^{(-x)^2} = -x^3 e^{x^2}$ ، فتكاملها على $[-1, 1]$ يساوي $0$ ولا يظهر العدد $e$ .'
				],
				explanationAr:
					'باستعمال خطية التكامل على المجال المتناظر $[-1, 1]$ : الدالة $x \\mapsto x^3 e^{x^2}$ مستمرة وفردية ومنه $\\int_{-1}^1 x^3 e^{x^2}\\,dx = 0$ ؛ والدالة $x \\mapsto 3x^2$ مستمرة وزوجية ومنه $\\int_{-1}^1 3x^2\\,dx = 2\\int_0^1 3x^2\\,dx = 2[x^3]_0^1 = 2$ . إذن $I = 0 + 2 = 2$ .'
			}
		]
	},

	// =========================================================================
	// LESSON 2 (Order 2, Seq 7 — STREAM EXCLUSIVE FOR TM):
	// DEEPER INTEGRALS: REPEATED IBP, INTEGRAL FUNCTIONS & SEQUENCES (I_n), AREAS & VOLUMES
	// =========================================================================
	{
		id: 'lesson_3as_tm_t3_deeper_integrals_by_parts_sequences_volumes',
		slug: '3as-tm-t3-deeper-integrals-by-parts-sequences-volumes',
		grade: '3as_tm',
		yearSubjectId: 725,
		trimesterId: 't3',
		sequenceId: 'seq7',
		sequenceTitleAr: 'المقطع السابع: الحساب التكاملي المعمق وتطبيقاته في المساحات والحجوم',
		order: 2,
		domain: 'analysis',
		titleAr: 'الحساب التكاملي المعمق: المكاملة بالتجزئة، الدوال والمتتاليات المعرفة بتكامل، والمساحات والحجوم',
		objectives: [
			'إتقان المكاملة بالتجزئة (البسيطة والمتكررة) لحساب تكاملات مركبة واستنتاج دوال أصلية',
			'دراسة الدوال الأصلية المعرفة بتكامل F(x) = ∫_a^x f(t)dt ودراسة المتتاليات المعرفة بتكامل I_n = ∫_a^b f_n(x)dx (الرتابة، الحصر، العلاقات التراجعية بالمكاملة بالتجزئة، والنهاية)',
			'حساب مساحات السطوح المستوية المحددة بمنحنيين وحساب حجوم المجسمات الدورانية V = ∫_a^b π[f(x)]²dx وحل مشكلات تقنية وفيزيائية'
		],
		keywordsAr: [
			'المكاملة بالتجزئة',
			'دالة معرفة بتكامل',
			'متتالية معرفة بتكامل',
			'حساب المساحات والحجوم الدورانية'
		],
		discover: {
			scenarioAr:
				'في الجزء الختامي من المسألة الشاملة ($7$ نقاط) لبكالوريا شعبة تقني رياضي، يُطلب غالباً دراسة **متتالية معرفة بتكامل** مثل $I_n = \\int_0^1 x^n e^{-x}\\,dx$ ($n \\in \\mathbb{N}$)، وإثبات علاقتها التراجعية بالمكاملة بالتجزئة، فضلاً عن حساب حجم مجسم دوراني هندسي أو صناعي! لنتدرج في حل هذه الوضعية الأصيلة خطوةً بخطوة.',
			svg: svgSolidOfRevolutionDiagram,
			steps: [
				{
					promptAr:
						'احسب الحد الأول $I_0 = \\int_0^1 e^{-x}\\,dx$ . إذا كُتبت النتيجة على الشكل $I_0 = a - e^{-1}$ ، فما قيمة العدد الصحيح $a$ ؟',
					hintAr: 'دالة أصلية لـ $e^{-x}$ هي $-e^{-x}$ ، فاحسب $[-e^{-x}]_0^1 = -e^{-1} - (-e^0)$ .',
					expectedInput: '1',
					revealAr:
						'لدينا $I_0 = [-e^{-x}]_0^1 = -e^{-1} - (-1) = 1 - e^{-1}$ ، ومنه $a = 1$ .'
				},
				{
					promptAr:
						'ندرس تقارب $(I_n)$ بالحصر: من أجل كل $x \\in [0, 1]$ لدينا $0 \\le e^{-x} \\le 1$ ، وبالضرب في $x^n \\ge 0$ نجد $0 \\le x^n e^{-x} \\le x^n$ . بمكاملة الأطراف على $[0, 1]$ نحصل على $0 \\le I_n \\le \\frac{1}{n + 1}$ . ما هي نهاية $\\lim_{n \\to +\\infty} I_n$ ؟',
					hintAr: 'طبق مبرهنة الحصر علماً أن $\\lim_{n \\to +\\infty} \\frac{1}{n + 1} = 0$ .',
					expectedInput: '0',
					revealAr:
						'بما أن $0 \\le I_n \\le \\frac{1}{n + 1}$ لكل $n \\in \\mathbb{N}$ و $\\lim_{n \\to +\\infty} \\frac{1}{n + 1} = 0$ ، فإنه حسب مبرهنة الحصر تتقارب المتتالية التكاملية $(I_n)$ ونهايتها $\\lim_{n \\to +\\infty} I_n = 0$ . (كما أنها متناقصة لأن $I_{n+1} - I_n = \\int_0^1 x^n(x - 1)e^{-x}\\,dx \\le 0$).'
				},
				{
					promptAr:
						'نطبق **المكاملة بالتجزئة** على $I_{n+1} = \\int_0^1 x^{n+1}e^{-x}\\,dx$ بوضع $u(x) = x^{n+1}$ و $v\'(x) = e^{-x}$ فنجد العلاقة التراجعية $I_{n+1} = (n + 1)I_n - e^{-1}$ . استنتج $I_1$ ثم $I_2$ (مكاملة بالتجزئة مرتين!): إذا كان $I_2 = 2 - k e^{-1}$ ، فما قيمة العدد الطبيعي $k$ ؟',
					hintAr: 'من أجل $n = 0$ : $I_1 = 1 \\cdot I_0 - e^{-1} = 1 - 2e^{-1}$ . ثم من أجل $n = 1$ : $I_2 = 2I_1 - e^{-1}$ .',
					expectedInput: '5',
					revealAr:
						'لدينا $I_{n+1} = [-x^{n+1}e^{-x}]_0^1 + (n + 1)\\int_0^1 x^n e^{-x}\\,dx = (n + 1)I_n - e^{-1}$ .\n- من أجل $n = 0$ : $I_1 = I_0 - e^{-1} = (1 - e^{-1}) - e^{-1} = 1 - 2e^{-1}$ .\n- من أجل $n = 1$ : $I_2 = 2I_1 - e^{-1} = 2(1 - 2e^{-1}) - e^{-1} = 2 - 5e^{-1}$ ، إذن $k = 5$ .'
				},
				{
					promptAr:
						'لتوليد مخروط دوراني نصف قطر قاعدته $R = 3$ وارتفاعه $h = 4$ ، نُدير قطعة المستقيم $y = \\frac{3}{4}x$ على المجال $[0, 4]$ دورة كاملة حول محور الفواصل $(Ox)$ . احسب الحجم $V = \\pi \\int_0^4 \\left(\\frac{3}{4}x\\right)^2\\,dx$ ؛ إذا كُتب $V = m\\pi\\,\\text{u.v}$ فما قيمة $m$ ؟',
					hintAr: 'احسب $\\pi \\cdot \\frac{9}{16} \\left[\\frac{x^3}{3}\\right]_0^4 = \\pi \\cdot \\frac{9}{16} \\cdot \\frac{64}{3}$ .',
					expectedInput: '12',
					revealAr:
						'نجد $V = \\pi \\frac{9}{16} \\times \\frac{64}{3} = 3 \\times 4 \\pi = 12\\pi\\,\\text{u.v}$ (وهو ما يبرهن الدستور الهندسي الشهير لحجم المخروط الدوراني $V = \\frac{1}{3}\\pi R^2 h = \\frac{1}{3}\\pi(9)(4) = 12\\pi$!).'
				}
			]
		},
		summary: {
			rulesAr: [
				'**المكاملة بالتجزئة البسيطة والمتكررة**: من أجل $u, v$ قابلتين للاشتقاق ومشتقتاهما مستمرتان على $[a, b]$ :\n$$\\int_a^b u(x)v\'(x)\\,dx = [u(x)v(x)]_a^b - \\int_a^b u\'(x)v(x)\\,dx$$\n- لحساب $\\int_a^b P(x)e^{\\alpha x}\\,dx$ حيث $\\deg(P) = 2$ نطبق المكاملة بالتجزئة **مرتين متتاليتين** باشتقاق كثير الحدود في كل مرة. ولحساب $\\int_a^b e^{\\alpha x}\\cos(\\beta x)\\,dx$ نطبقها مرتين فنعود للتكامل الأصلي $I$ ونستخرجه جبرياً.',
				'**الدوال المعرفة بتكامل**: إذا كانت $f$ مستمرة على مجال $I$ و $a \\in I$ ، فإن الدالة $F(x) = \\int_a^x f(t)\\,dt$ هي الدالة الأصلية الوحيدة لـ $f$ على $I$ التي تحقق $F(a) = 0$ ، فهي قابلة للاشتقاق على $I$ ومشتقتها $F\'(x) = f(x)$ . وإذا كانت $u$ قابلة للاشتقاق من $J$ نحو $I$ فإن مشتقة الدالة المركبة $G(x) = \\int_a^{u(x)} f(t)\\,dt$ هي $G\'(x) = u\'(x) \\cdot f(u(x))$ .',
				'**منهجية دراسة المتتاليات المعرفة بتكامل $I_n = \\int_a^b f_n(x)\\,dx$ ($a < b$)**:\n1) **الإشارة**: إذا كان $f_n(x) \\ge 0$ على $[a, b]$ فإن $I_n \\ge 0$ .\n2) **اتجاه التغير**: نحسب الفرق كتكامل واحد باستعمال الخطية: $I_{n+1} - I_n = \\int_a^b [f_{n+1}(x) - f_n(x)]\\,dx$ وندرس إشارة ما داخل التكامل على $[a, b]$ .\n3) **الحصر والنهاية**: نحصر العامل المتغير على $[a, b]$ للوصول إلى $0 \\le f_n(x) \\le g_n(x)$ (دالة يسهل حساب تكاملها كـ $M x^n$ أو $M e^{-nx}$)، ثم نكامل الأطراف ونطبق مبرهنة الحصر.\n4) **العلاقة التراجعية**: نربط $I_{n+1}$ بـ $I_n$ إما عبر المكاملة بالتجزئة وإما بتشكيل تركيبة خطية كـ $I_{n+1} + I_n$ تبسط الكسر داخل التكامل!',
				'**مساحات الحيز المستوي بين منحنيين**: في معلم متعامد $(O; \\vec{i}, \\vec{j})$ مع $a < b$ ، مساحة الحيز المحدد بـ $(C_f)$ و $(C_g)$ والمستقيمين $x = a$ و $x = b$ هي:\n$$\\mathcal{A} = \\left(\\int_a^b |f(x) - g(x)|\\,dx\\right) \\times \\|\\vec{i}\\| \\cdot \\|\\vec{j}\\| \\quad (\\text{cm}^2)$$',
				'**حجوم المجسمات والمجسمات الدورانية**: حجم مجسم محدد بمستويين $z = a$ و $z = b$ ($a < b$) مساحات مقاطعه المستوية هي $S(z)$ يُعطى بـ $V = \\int_a^b S(z)\\,dz$ . وبصفة خاصة، دوران منحنى دالة مستمرة $f$ على $[a, b]$ دورة كاملة حول $(Ox)$ يولد مجسماً دورانياً حجمه:\n$$V = \\pi \\int_a^b [f(x)]^2\\,dx \\;(\\text{u.v}), \\qquad 1\\,\\text{u.v} = \\|\\vec{i}\\| \\cdot \\|\\vec{j}\\| \\cdot \\|\\vec{k}\\|$$\n- **البراهين المرجعية**: حجم الكرة ($f(x) = \\sqrt{R^2 - x^2}$ على $[-R, R]$): $V = \\pi\\int_{-R}^R (R^2 - x^2)\\,dx = \\frac{4}{3}\\pi R^3$ ؛ وحجم المخروط الدوراني ($f(x) = \\frac{R}{h}x$ على $[0, h]$): $V = \\frac{1}{3}\\pi R^2 h$ .'
			],
			visualSvg: svgFunctionCurvePlot({
				xMin: -0.2,
				xMax: 1.3,
				yMin: -0.1,
				yMax: 1.1,
				fn: (x) => (x >= 0 ? x * Math.exp(-x) : Number.NaN),
				curveLabel: 'f₁(x) = xe⁻ˣ',
				shadedIntegral: { a: 0, b: 1, color: 'rgba(37,99,235,0.22)' },
				points: [
					{ x: 0, y: 0, label: 'O(0, 0)', color: '#0f172a' },
					{ x: 1, y: Math.exp(-1), label: '(1, 1/e)', color: '#dc2626' }
				]
			}),
			visualCaptionAr:
				'تفسير الحد $I_1 = \\int_0^1 x e^{-x}\\,dx = 1 - \\frac{2}{e}$ كمساحة تحت المنحنى $f_1(x) = x e^{-x}$ على $[0, 1]$ والتي تتناقص نحو $0$ كلما كبر $n$',
			examples: [
				{
					problemAr:
						'من أجل كل عدد طبيعي غير معدوم $n \\ge 1$ نعرف المتتالية التكاملية $J_n = \\int_1^e (\\ln x)^n\\,dx$ .\n1) أثبت أن $(J_n)$ متناقصة وموجبة على $\\mathbb{N}^*$ ثم استنتج أنها متقاربة.\n2) باستعمال المكاملة بالتجزئة، برهن أنه من أجل كل $n \\ge 1$ : $J_{n+1} = e - (n + 1)J_n$ ، ثم استنتج أن $\\frac{e}{n + 2} \\le J_n \\le \\frac{e}{n + 1}$ واحسب $\\lim_{n \\to +\\infty} J_n$ .',
					solutionAr:
						'1) على المجال $[1, e]$ لدينا $0 \\le \\ln x \\le 1$ ، ومنه $(\\ln x)^n \\ge 0 \\implies J_n \\ge 0$ . كما أن:\n$$J_{n+1} - J_n = \\int_1^e (\\ln x)^n (\\ln x - 1)\\,dx \\le 0$$\nلأن $(\\ln x)^n \\ge 0$ و $\\ln x - 1 \\le 0$ على $[1, e]$ . إذن $(J_n)$ متناقصة ومحدودة من الأدنى بـ $0$ فهي متقاربة.\n\n2) **العلاقة التراجعية**: في $J_{n+1} = \\int_1^e 1 \\cdot (\\ln x)^{n+1}\\,dx$ نضع $u(x) = (\\ln x)^{n+1} \\implies u\'(x) = \\frac{n + 1}{x}(\\ln x)^n$ و $v\'(x) = 1 \\implies v(x) = x$ :\n$$J_{n+1} = \\big[x(\\ln x)^{n+1}\\big]_1^e - \\int_1^e x \\cdot \\frac{n + 1}{x}(\\ln x)^n\\,dx = (e \\cdot 1 - 0) - (n + 1)J_n = e - (n + 1)J_n$$\n3) **الحصر والنهاية** (تقنية كلاسيكية رائعة في بكالوريا تقني رياضي!): بما أن $(J_n)$ متناقصة وموجبة فإن $0 \\le J_{n+1} \\le J_n$ :\n- من $J_{n+1} \\ge 0$ نجد $e - (n + 1)J_n \\ge 0 \\implies J_n \\le \\frac{e}{n + 1}$ .\n- من $J_{n+1} \\le J_n$ نجد $e - (n + 1)J_n \\le J_n \\iff e \\le (n + 2)J_n \\implies J_n \\ge \\frac{e}{n + 2}$ .\nإذن $\\frac{e}{n + 2} \\le J_n \\le \\frac{e}{n + 1}$ ، وحسب مبرهنة الحصر $\\lim_{n \\to +\\infty} J_n = 0$ (كما نستنتج أن $\\lim_{n \\to +\\infty} n J_n = e$ !).'
				},
				{
					problemAr:
						'احسب بالمكاملة بالتجزئة المتكررة التكامل $K = \\int_0^{\\frac{\\pi}{2}} e^x \\cos x\\,dx$ .',
					solutionAr:
						'- **المكاملة بالتجزئة الأولى**: نضع $u_1(x) = \\cos x \\implies u_1\'(x) = -\\sin x$ و $v_1\'(x) = e^x \\implies v_1(x) = e^x$ :\n$$K = \\big[e^x \\cos x\\big]_0^{\\frac{\\pi}{2}} - \\int_0^{\\frac{\\pi}{2}} (-\\sin x)e^x\\,dx = (0 - 1) + \\int_0^{\\frac{\\pi}{2}} e^x \\sin x\\,dx$$\n- **المكاملة بالتجزئة الثانية** على $\\int_0^{\\frac{\\pi}{2}} e^x \\sin x\\,dx$ : نضع $u_2(x) = \\sin x \\implies u_2\'(x) = \\cos x$ و $v_2\'(x) = e^x \\implies v_2(x) = e^x$ :\n$$\\int_0^{\\frac{\\pi}{2}} e^x \\sin x\\,dx = \\big[e^x \\sin x\\big]_0^{\\frac{\\pi}{2}} - \\int_0^{\\frac{\\pi}{2}} e^x \\cos x\\,dx = e^{\\frac{\\pi}{2}} - K$$\nنعوض في عبارة $K$ الأولى فنجد المعادلة الجبرية:\n$$K = -1 + e^{\\frac{\\pi}{2}} - K \\iff 2K = e^{\\frac{\\pi}{2}} - 1 \\iff K = \\frac{e^{\\frac{\\pi}{2}} - 1}{2}$$'
				}
			],
			watchOutAr:
				'احذر ثلاثة أخطاء شائعة في مسائل التكامل المعمق ببكالوريا تقني رياضي: (1) عند تطبيق المكاملة بالتجزئة مرتين على $\\int e^x \\cos x\\,dx$ حافظ على نفس الدور في المرتين (نشتق المثلثية ونكامل الأسية في كلتا المرتين)، لأن عكس الاختيار في المرة الثانية يُلغي الخطوة الأولى ويعيدك إلى $K = K$ ! (2) لإثبات اتجاه تغير متتالية تكاملية $I_n$ لا تقارن قيمتين عدديتين لـ $n = 0, 1$ فحسب، بل ادرس إشارة $f_{n+1}(x) - f_n(x)$ من أجل كل $x \\in [a, b]$ . (3) في حجم الدوران حول $(Ox)$ لمنحنى يقع بين منحنيين موجبين $0 \\le g(x) \\le f(x)$ ، الحجم هو $\\pi \\int_a^b ([f(x)]^2 - [g(x)]^2)\\,dx$ **وليس** $\\pi \\int_a^b [f(x) - g(x)]^2\\,dx$ !'
		},
		practice: [
			{
				questionAr:
					'نعتبر المتتالية المعرفة بتكامل من أجل كل $n \\in \\mathbb{N}^*$ بـ $I_n = \\int_0^1 \\frac{x^n}{x + 1}\\,dx$ . قيمة المجموع $I_n + I_{n+1}$ تساوي:',
				options: [
					'$\\frac{1}{n + 1}$',
					'$\\frac{1}{n}$',
					'$\\ln 2$',
					'$\\frac{1}{2n + 1}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة ممتازة! بخطية التكامل: $I_n + I_{n+1} = \\int_0^1 \\frac{x^n + x^{n+1}}{x + 1}\\,dx = \\int_0^1 \\frac{x^n(1 + x)}{x + 1}\\,dx = \\int_0^1 x^n\\,dx = \\left[\\frac{x^{n+1}}{n + 1}\\right]_0^1 = \\frac{1}{n + 1}$ .',
					'خطأ في أس الدالة الأصلية: الدالة الأصلية لـ $x^n$ هي $\\frac{x^{n+1}}{n + 1}$ وليست $\\frac{x^n}{n}$ .',
					'خطأ: القيمة $\\ln 2$ تساوي الحد $I_0 = \\int_0^1 \\frac{1}{x + 1}\\,dx$ وليست المجموع العام $I_n + I_{n+1}$ .',
					'خطأ في جمع الكسور داخل التكامل: $x^n + x^{n+1} = x^n(1 + x)$ ولا يساوي $x^{2n+1}$ .'
				],
				explanationAr:
					'نجمع التكاملين باستعمال خاصية الخطية:\n$$I_n + I_{n+1} = \\int_0^1 \\frac{x^n(1 + x)}{x + 1}\\,dx = \\int_0^1 x^n\\,dx = \\left[\\frac{x^{n+1}}{n + 1}\\right]_0^1 = \\frac{1}{n + 1}$$'
			},
			{
				questionAr:
					'لتكن الدالة $G$ المعرفة والقابلة للاشتقاق على $]0, +\\infty[$ بـ $G(x) = \\int_1^{x^2} \\frac{e^t}{t}\\,dt$ . عبارة المشتقة $G\'(x)$ هي:',
				options: [
					'$G\'(x) = \\frac{e^{x^2}}{x^2}$',
					'$G\'(x) = \\frac{2e^{x^2}}{x}$',
					'$G\'(x) = \\frac{e^{x^2} - e}{x^2}$',
					'$G\'(x) = \\frac{e^x}{x}$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'فخ كلاسيكي! نسيت الضرب في مشتقة الحد العلوي المركب $(x^2)\' = 2x$ وفق قاعدة اشتقاق المركب $G\'(x) = u\'(x) f(u(x))$ !',
					'إجابة صحيحة ودقيقة! بوضع $f(t) = \\frac{e^t}{t}$ و $u(x) = x^2$ نجد $G\'(x) = u\'(x) f(u(x)) = 2x \\cdot \\frac{e^{x^2}}{x^2} = \\frac{2e^{x^2}}{x}$ .',
					'خطأ: الثابت السفلي $1$ يعطي $F(1)$ وهي ثابتة مشتقتها صفر، فلا يظهر $-e$ في المشتقة.',
					'خطأ: الحد العلوي للتكامل هو $x^2$ وليس $x$ .'
				],
				explanationAr:
					'لتكن $F$ دالة أصلية للدالة المستمرة $t \\mapsto \\frac{e^t}{t}$ على $]0, +\\infty[$ . إذن $G(x) = F(x^2) - F(1)$ ، وباشتقاق المركب نجد $G\'(x) = (x^2)\' F\'(x^2) = 2x \\cdot \\frac{e^{x^2}}{x^2} = \\frac{2e^{x^2}}{x}$ .'
			},
			{
				questionAr:
					'في الفضاء المنسوب إلى معلم متعامد ومتجانس وحدة الطول فيه $2\\,\\text{cm}$ ، نُدير نصف القرص المحدد بـ $y = \\sqrt{9 - x^2}$ ومحور الفواصل على $[-3, 3]$ دورة كاملة حول $(Ox)$ . حجم الكرة المولدة مقدراً بـ $\\text{cm}^3$ هو:',
				options: [
					'$36\\pi\\,\\text{cm}^3$',
					'$288\\pi\\,\\text{cm}^3$',
					'$72\\pi\\,\\text{cm}^3$',
					'$144\\pi\\,\\text{cm}^3$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'انتبه! القيمة $36\\pi$ هي الحجم مقدراً بوحدة الحجم $(\\text{u.v})$ ، ونسيت ضربه في $1\\,\\text{u.v} = 2^3 = 8\\,\\text{cm}^3$ !',
					'إجابة صحيحة وممتازة! $V = \\pi \\int_{-3}^3 (9 - x^2)\\,dx = 2\\pi\\left[9x - \\frac{x^3}{3}\\right]_0^3 = 36\\pi\\,\\text{u.v}$ ، وبما أن $1\\,\\text{u.v} = (2\\,\\text{cm})^3 = 8\\,\\text{cm}^3$ فإن $V = 36\\pi \\times 8 = 288\\pi\\,\\text{cm}^3$ .',
					'خطأ في تحويل وحدة الحجم: ضربت في $2$ (وحدة الطول) بدلاً من مكعبها $2^3 = 8\\,\\text{cm}^3$ !',
					'خطأ في تحويل وحدة الحجم: ضربت في $2^2 = 4$ (وحدة المساحة) بدلاً من وحدة الحجم $2^3 = 8\\,\\text{cm}^3$ !'
				],
				explanationAr:
					'بوحدة الحجم: $V = \\pi \\int_{-3}^3 (9 - x^2)\\,dx = \\frac{4}{3}\\pi (3)^3 = 36\\pi\\,\\text{u.v}$ . وبما أن المعلم متجانس وحدة الطول فيه $\\|\\vec{i}\\| = 2\\,\\text{cm}$ ، فإن وحدة الحجم هي $1\\,\\text{u.v} = 2^3 = 8\\,\\text{cm}^3$ ، ومنه $V = 36\\pi \\times 8 = 288\\pi\\,\\text{cm}^3$ .'
			}
		]
	},

	// =========================================================================
	// LESSON 3 (Order 3, Seq 8 — TAILORED FOR TM):
	// SPACE VECTORS, SPHERE, CYLINDER OF REVOLUTION & CONE OF REVOLUTION
	// =========================================================================
	{
		...adaptSharedT3(SHARED_LESSONS_3AS_T3[2], 't3_space_vectors_sphere_cylinder_cone', {
			order: 3,
			domain: 'geometry',
			sequenceId: 'seq8',
			sequenceTitleAr: 'المقطع الثامن: الحساب الشعاعي، السطوح الدورانية والجداء السلمي في الفضاء',
			titleAr: 'الحساب الشعاعي والتعليم في الفضاء ومعادلات سطح الكرة والأسطوانة والمخروط الدوراني',
			objectives: [
				'توظيف الأشعة في الفضاء لإثبات توازي شعاعين، استقامية ثلاث نقط، وانتماء أشعة أو أربع نقط إلى نفس المستوي',
				'حساب المسافة بين نقطتين في معلم متعامد ومتجانس في الفضاء وكتابة المعادلة الديكارتية لسطح الكرة',
				'استعمال دستور المسافة لتعيين المعادلة الديكارتية لكل من الأسطوانة الدورانية والمخروط الدوراني اللذين محورهما أحد محاور الإحداثيات'
			],
			keywordsAr: [
				'الأشعة في الفضاء',
				'المسافة بين نقطتين',
				'معادلة سطح الكرة',
				'الأسطوانة الدورانية والمخروط الدوراني'
			]
		}),
		discover: {
			scenarioAr:
				'في التصميم الهندسي الثلاثي الأبعاد (CAD) بفضاء منسوب إلى معلم متعامد ومتجانس $(O; \\vec{i}, \\vec{j}, \\vec{k})$ ، ننمذج ثلاثة سطوح دورانية أساسية باستعمال دستور المسافة الإقليدية: **سطح الكرة**، **الأسطوانة الدورانية** ذات المحور $(Oz)$ ونصف القطر $R$ ، و**المخروط الدوراني** ذي الرأس $O$ والمحور $(Oz)$ ونصف زاوية الرأس $\\theta$ ! كيف نستنتج معادلاتها الديكارتية وطبيعة مقاطعها المستوية؟',
			svg: svgCylinderConeSurfaces3D,
			steps: [
				{
					promptAr:
						'لتكن $M(x, y, z)$ نقطة من الفضاء، ومسقطها العمودي على المحور $(Oz)$ هو $H(0, 0, z)$ . احسب مربع المسافة $HM^2$ بدلالة $x$ و $y$ ؛ إذا كانت $M$ تنتمي للأسطوانة الدورانية التي محورها $(Oz)$ ونصف قطرها $R = 3$ (أي $HM = 3$)، فما الطرف الأيمن للمعادلة $x^2 + y^2 = k$ ؟',
					hintAr: 'لدينا $HM^2 = (x - 0)^2 + (y - 0)^2 + (z - z)^2 = x^2 + y^2$ ، وعوض $HM = 3$ .',
					expectedInput: '9',
					revealAr:
						'تنتمي $M(x, y, z)$ إلى الأسطوانة الدورانية ذات المحور $(Oz)$ ونصف القطر $R = 3$ إذا وفقط إذا كان $HM = 3 \\iff HM^2 = 9 \\iff x^2 + y^2 = 9$ (المتغير $z$ حر يمسح $\\mathbb{R}$ كاملة!).'
				},
				{
					promptAr:
						'نعتبر الآن المخروط الدوراني $(\\Sigma)$ الذي رأسه المبدأ $O$ ومحوره $(Oz)$ ونصف زاوية رأسه $\\theta = \\frac{\\pi}{6}$ . في المثلث القائم $OHM$ في $H(0, 0, z)$ لدينا $HM = OH \\cdot \\tan\\theta$ حيث $OH = |z|$ . ما قيمة المعامل $c$ في معادلة المخروط $x^2 + y^2 = c z^2$ (اكتب كسراً مثل `1/3` )؟',
					hintAr: 'نعلم أن $\\tan\\left(\\frac{\\pi}{6}\\right) = \\frac{1}{\\sqrt{3}}$ ، فاحسب $c = \\tan^2\\left(\\frac{\\pi}{6}\\right)$ .',
					expectedInput: '1/3',
					revealAr:
						'شرط انتماء $M(x, y, z)$ إلى المخروط الدوراني $(\\Sigma)$ هو $HM^2 = (\\tan^2\\theta) OH^2 \\iff x^2 + y^2 = \\tan^2\\left(\\frac{\\pi}{6}\\right) z^2 \\iff x^2 + y^2 = \\frac{1}{3}z^2$ (أو $3x^2 + 3y^2 - z^2 = 0$).'
				},
				{
					promptAr:
						'نقطع المخروط الدوراني $(\\Sigma): x^2 + y^2 = \\frac{1}{3}z^2$ بالمستوي الأفقي ذي المعادلة $z = 6$ . ما هو مربع نصف القطر $r^2$ للدائرة الناتجة عن هذا التقاطع في المستوي $z = 6$ ؟',
					hintAr: 'عوض $z = 6$ في المعادلة $x^2 + y^2 = \\frac{1}{3}(6)^2$ لحساب $r^2$ .',
					expectedInput: '12',
					revealAr:
						'بتعويض $z = 6$ نحصل على جملة المعادلتين $\\begin{cases} x^2 + y^2 = 12 \\\\ z = 6 \\end{cases}$ ، وهي دائرة تقع في المستوي $z = 6$ مركزها $H(0, 0, 6)$ ومربع نصف قطرها $r^2 = 12$ أي نصف قطرها $r = 2\\sqrt{3}$ .'
				},
				{
					promptAr:
						'لتكن المجموعة $(S)$ المعرفة في الفضاء بالمعادلة $x^2 + y^2 + z^2 - 2x + 4y - 4 = 0$ . بالإتمام إلى مربعات تامة، ما هو نصف قطر سطح الكرة $(S)$ ؟',
					hintAr: 'اكتب $(x - 1)^2 - 1 + (y + 2)^2 - 4 + z^2 - 4 = 0$ .',
					expectedInput: '3',
					revealAr:
						'بالإتمام إلى مربعات تامة نجد $(x - 1)^2 + (y + 2)^2 + z^2 = 9$ ، فـ $(S)$ سطح كرة مركزه $\\Omega(1, -2, 0)$ ونصف قطره $R = \\sqrt{9} = 3$ .'
				}
			]
		},
		summary: {
			rulesAr: [
				'**الارتباط الخطي وانتماء أربع نقط إلى نفس المستوي**: تكون الأشعة $\\vec{u}, \\vec{v}, \\vec{w}$ (مع $\\vec{u}, \\vec{v}$ غير مرتبطين خطياً) من نفس المستوي إذا وفقط إذا وُجد $(\\alpha, \\beta) \\in \\mathbb{R}^2$ يحقق $\\vec{w} = \\alpha\\vec{u} + \\beta\\vec{v}$ . وتنتمي $D$ إلى المستوي $(ABC)$ إذا وفقط إذا كان $\\overrightarrow{AD} = \\alpha\\overrightarrow{AB} + \\beta\\overrightarrow{AC}$ .',
				'**المسافة الإقليدية ومعادلة سطح الكرة**: في معلم متعامد ومتجانس $(O; \\vec{i}, \\vec{j}, \\vec{k})$ ، $AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2 + (z_B - z_A)^2}$ .\n- معادلة سطح الكرة ذي المركز $\\Omega(x_0, y_0, z_0)$ ونصف القطر $R > 0$ : $(x - x_0)^2 + (y - y_0)^2 + (z - z_0)^2 = R^2$ .\n- معادلة سطح الكرة ذي القطر $[AB]$ : $\\overrightarrow{MA} \\cdot \\overrightarrow{MB} = 0 \\iff (x - x_A)(x - x_B) + (y - y_A)(y - y_B) + (z - z_A)(z - z_B) = 0$ .',
				'**المعادلة الديكارتية للأسطوانة الدورانية ذات نصف القطر $R > 0$**: هي مجموعة النقط $M(x, y, z)$ التي تبعد بمسافة ثابتة $R$ عن محور الدوران:\n- محورها $(Oz)$ : $x^2 + y^2 = R^2$ .\n- محورها $(Oy)$ : $x^2 + z^2 = R^2$ .\n- محورها $(Ox)$ : $y^2 + z^2 = R^2$ .\nمقطع أسطوانة محورها $(Oz)$ بمستوٍ أفقي $z = k$ هو دائرة مركزها $(0, 0, k)$ ونصف قطرها $R$ .',
				'**المعادلة الديكارتية للمخروط الدوراني ذي الرأس $O$ ونصف زاوية الرأس $\\theta \\in \\left]0, \\frac{\\pi}{2}\\right[$**:\n- محوره $(Oz)$ : $x^2 + y^2 = (\\tan^2\\theta)\\,z^2$ .\n- محوره $(Oy)$ : $x^2 + z^2 = (\\tan^2\\theta)\\,y^2$ .\n- محوره $(Ox)$ : $y^2 + z^2 = (\\tan^2\\theta)\\,x^2$ .\nمقطع مخروط محوره $(Oz)$ بمستوٍ $z = k$ ($k \\ne 0$) هو دائرة مركزها $(0, 0, k)$ ونصف قطرها $r = |k|\\tan\\theta$ (وعند $k = 0$ يقتصر التقاطع على الرأس $\\{O\\}$).'
			],
			visualSvg: svgCylinderConeSurfaces3D,
			visualCaptionAr:
				'استنتاج معادلتي الأسطوانة الدورانية والمخروط الدوراني حول $(Oz)$ بتطبيق دستور المسافة على المسقط $H(0, 0, z)$',
			examples: [
				{
					problemAr:
						'في الفضاء المنسوب إلى معلم متعامد ومتجانس، نعتبر السطح $(\\Gamma)$ ذا المعادلة $x^2 + z^2 = 3y^2$ .\n1) عيّن طبيعة السطح $(\\Gamma)$ وعناصره المميزة (الرأس، المحور، ونصف زاوية الرأس $\\theta$).\n2) عيّن طبيعة وعناصر تقاطع $(\\Gamma)$ مع المستوي $(P)$ ذي المعادلة $y = -2$ .',
					solutionAr:
						'1) المعادلة من الشكل $x^2 + z^2 = k y^2$ حيث $k = 3 > 0$ . إذن $(\\Gamma)$ **مخروط دوراني** رأسه المبدأ $O(0, 0, 0)$ ومحوره حامل محور التراتيب $(Oy)$ ، ونصف زاوية رأسه $\\theta \\in \\left]0, \\frac{\\pi}{2}\\right[$ تحقق:\n$$\\tan^2\\theta = 3 \\implies \\tan\\theta = \\sqrt{3} \\implies \\theta = \\frac{\\pi}{3}$$\n2) نعوض $y = -2$ في معادلة $(\\Gamma)$ فنجد:\n$$\\begin{cases} x^2 + z^2 = 3(-2)^2 = 12 \\\\ y = -2 \\end{cases}$$\nفي المستوي $y = -2$ ، النقطة $H(0, -2, 0)$ تحقق $H M^2 = x^2 + (y + 2)^2 + z^2 = x^2 + z^2 = 12$ . إذن التقاطع هو **دائرة** تقع في المستوي $y = -2$ ، مركزها $H(0, -2, 0)$ ونصف قطرها $r = \\sqrt{12} = 2\\sqrt{3}$ .'
				},
				{
					problemAr:
						'نعتبر الأسطوانة الدورانية $(\\mathcal{C})$ التي محورها $(Ox)$ وتشمل النقطة $A(4, 3, -4)$ . اكتب معادلتها الديكارتية، ثم حدد تقاطعها مع سطح الكرة $(S)$ ذي المركز $O$ ونصف القطر $R_S = \\sqrt{41}$ .',
					solutionAr:
						'1) معادلة أسطوانة دورانية محورها $(Ox)$ تُكتب على الشكل $y^2 + z^2 = R^2$ . بما أن $A(4, 3, -4) \\in (\\mathcal{C})$ فإن $3^2 + (-4)^2 = R^2 \\implies R^2 = 9 + 16 = 25$ ، أي نصف قطر الأسطوانة $R = 5$ ومعادلتها $y^2 + z^2 = 25$ .\n2) معادلة سطح الكرة $(S)$ هي $x^2 + y^2 + z^2 = 41$ . لتعيين $(\\mathcal{C}) \\cap (S)$ نحل الجملة:\n$$\\begin{cases} y^2 + z^2 = 25 \\\\ x^2 + (y^2 + z^2) = 41 \\end{cases} \\iff \\begin{cases} y^2 + z^2 = 25 \\\\ x^2 = 16 \\end{cases} \\iff \\begin{cases} y^2 + z^2 = 25 \\\\ x = \\pm 4 \\end{cases}$$\nإذن يتقاطع سطح الكرة والأسطوانة وفق **دائرتين** متقايستين نصف قطرهما $r = 5$ : الأولى في المستوي $x = 4$ مركزها $I_1(4, 0, 0)$ ، والثانية في المستوي $x = -4$ مركزها $I_2(-4, 0, 0)$ !'
				}
			],
			watchOutAr:
				'احذر ثلاثة فخاخ شائعة في الهندسة الفضائية لشعبة تقني رياضي: (1) في الفضاء، المعادلة $x^2 + y^2 = 9$ **لا تمثل دائرة** بل تمثل **أسطوانة دورانية** غير محدودة محورها $(Oz)$ لأن المتغير $z$ حر يأخذ جميع قيم $\\mathbb{R}$ (الدائرة في الفضاء تتطلب معادلة ثانية لمستوٍ قاطع مثل $z = 2$!). (2) محور المخروط أو الأسطوانة يُعرف دائماً بالمتغير الوحيد المعزول في الطرف الآخر أو الغائب عن المعادلة. (3) عند استخراج نصف زاوية رأس المخروط من $x^2 + y^2 = k z^2$ تذكر أن $k = \\tan^2\\theta$ وليس $\\tan\\theta$ !'
		},
		practice: [
			{
				questionAr:
					'في الفضاء المنسوب إلى معلم متعامد ومتجانس $(O; \\vec{i}, \\vec{j}, \\vec{k})$ ، ماذا تمثل مجموعة النقط $M(x, y, z)$ التي تحقق المعادلة $y^2 + z^2 = 16$ ؟',
				options: [
					'دائرة مركزها $O$ ونصف قطرها $4$',
					'أسطوانة دورانية محورها حامل المحور $(Ox)$ ونصف قطرها $R = 4$',
					'أسطوانة دورانية محورها حامل المحور $(Oz)$ ونصف قطرها $R = 4$',
					'سطح كرة مركزه $O$ ونصف قطره $4$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'فخ شهير جداً في البكالوريا! في المستوي تمثل دائرة، أما في الفضاء فغياب $x$ يعني أن $x$ يمسح كامل $\\mathbb{R}$ فتتولد أسطوانة دورانية!',
					'إجابة صحيحة وممتازة! المسافة بين $M(x, y, z)$ ومسقطها $H(x, 0, 0)$ على $(Ox)$ هي $\\sqrt{y^2 + z^2} = 4$ ، فهي أسطوانة دورانية محورها $(Ox)$ ونصف قطرها $4$ .',
					'خطأ في تحديد المحور: المتغير الغائب عن المعادلة $y^2 + z^2 = 16$ هو $x$ ، فالمحور هو $(Ox)$ وليس $(Oz)$ .',
					'خطأ: معادلة سطح الكرة تتضمن مربعات الإحداثيات الثلاث معاً $x^2 + y^2 + z^2 = 16$ .'
				],
				explanationAr:
					'المتغير $x$ غائب عن المعادلة $y^2 + z^2 = 16$ فهو يمسح $\\mathbb{R}$ ، وبما أن بعد $M(x, y, z)$ عن النقطة $H(x, 0, 0) \\in (Ox)$ يساوي $\\sqrt{y^2 + z^2} = 4$ ، فالمجموعة أسطوانة دورانية محورها $(Ox)$ ونصف قطرها $4$ .'
			},
			{
				questionAr:
					'المعادلة الديكارتية للمخروط الدوراني الذي رأسه المبدأ $O$ ومحوره $(Oz)$ ويشمل النقطة $A(3, 4, 5)$ هي:',
				options: [
					'$x^2 + y^2 = z^2$',
					'$x^2 + y^2 = 5z^2$',
					'$x^2 + z^2 = y^2$',
					'$x^2 + y^2 + z^2 = 50$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! تكتب المعادلة $x^2 + y^2 = k z^2$ ، وبالتعويض بإحداثيات $A(3, 4, 5)$ نجد $9 + 16 = 25k \\implies k = 1$ (أي $\\tan\\theta = 1 \\implies \\theta = \\frac{\\pi}{4}$)، ومنه $x^2 + y^2 = z^2$ .',
					'خطأ في الحساب: $3^2 + 4^2 = 25$ و $z_A^2 = 5^2 = 25$ وليس $5$ ، لذا $k = \\frac{25}{25} = 1$ .',
					'خطأ في المحور: المعادلة $x^2 + z^2 = y^2$ تمثل مخروطاً محوره $(Oy)$ ولا تشمل $A(3, 4, 5)$ لأن $9 + 25 \\ne 16$ .',
					'خطأ: هذه معادلة سطح الكرة المار من $A$ ذي المركز $O$ وليست معادلة المخروط الدوراني.'
				],
				explanationAr:
					'معادلة مخروط دوراني رأسه $O$ ومحوره $(Oz)$ هي من الشكل $x^2 + y^2 = k z^2$ ($k = \\tan^2\\theta > 0$). انتماء $A(3, 4, 5)$ يعطي $3^2 + 4^2 = k(5^2) \\iff 25 = 25k \\implies k = 1$ ، أي $x^2 + y^2 = z^2$ .'
			},
			SHARED_LESSONS_3AS_T3[2].practice[2]
		]
	},

	// =========================================================================
	// LESSON 4 (Order 4, Seq 8): SCALAR PRODUCT, PLANES, DISTANCE & LOCI
	// =========================================================================
	adaptSharedT3(SHARED_LESSONS_3AS_T3[3], 't3_space_scalar_product_planes_loci', {
		order: 4,
		domain: 'geometry',
		sequenceId: 'seq8',
		sequenceTitleAr: 'المقطع الثامن: الحساب الشعاعي، السطوح الدورانية والجداء السلمي في الفضاء',
		titleAr: 'الجداء السلمي في الفضاء، المعادلة الديكارتية لمستو، المسافة ومجموعات النقط',
		objectives: [
			'توظيف الجداء السلمي وعبارته التحليلية في الفضاء لإثبات تعامد مستقيمين، تعامد مستويين، وتعامد مستقيم ومستو',
			'كتابة المعادلة الديكارتية ax + by + cz + d = 0 لمستو وحساب المسافة بين نقطة ومستو',
			'تعيين مجموعات النقط في الفضاء المعرفة بالعلاقات AM·u = k و αMA² + βMB² = k باستعمال الجداء السلمي والمرجح'
		],
		keywordsAr: [
			'الجداء السلمي في الفضاء',
			'الشعاع الناظمي',
			'المعادلة الديكارتية لمستو',
			'المسافة بين نقطة ومستو',
			'مجموعات النقط في الفضاء'
		]
	}),

	// =========================================================================
	// LESSON 5 (Order 5, Seq 9 — TAILORED FOR TM):
	// LINES & PLANES IN SPACE: PARAMETRIC REPRESENTATIONS & BARYCENTER CHARACTERIZATION
	// =========================================================================
	{
		...adaptSharedT3(SHARED_LESSONS_3AS_T3[4], 't3_space_lines_parametric_barycenter', {
			order: 5,
			domain: 'geometry',
			sequenceId: 'seq9',
			sequenceTitleAr: 'المقطع التاسع: المستقيمات والأوضاع النسبية في الفضاء والتحضير للبكالوريا',
			titleAr: 'المستقيمات والمستويات في الفضاء: التمثيلات الوسيطية والتمييز بالمرجح',
			objectives: [
				'كتابة التمثيل الوسيطي لمستقيم ومستو في الفضاء والانتقال بين جملة معادلتين ديكارتيتين لمستقيم أو معادلة مستو والتمثيل الوسيطي',
				'توظيف التمييز بالمرجح لتعريف مستقيم أو قطعة مستقيم أو مستو كمجموعة مراجح نقط مرفقة بمعاملات',
				'حل مسائل الاستقامية والتلاقي وانتماء أربع نقط إلى نفس المستوي باستعمال التمثيلات الوسيطية والمرجح'
			],
			keywordsAr: [
				'التمثيل الوسيطي لمستقيم ومستو',
				'التمييز بالمرجح في الفضاء',
				'جملة معادلتين لمستقيم',
				'انتماء أربع نقط لمستو'
			]
		}),
		summary: {
			...SHARED_LESSONS_3AS_T3[4].summary,
			rulesAr: [
				...SHARED_LESSONS_3AS_T3[4].summary.rulesAr,
				'**التمييز بالمرجح للمستقيمات والقطع والمستويات في الفضاء**:\n- **المستقيم $(AB)$** ($A \\ne B$): هو مجموعة مراجح الجملة $\\{(A, 1 - t), (B, t)\\}$ عندما يمسح $t$ المجموعة $\\mathbb{R}$ (ويُولد ذلك مباشرة التمثيل الوسيطي $\\overrightarrow{OM} = (1 - t)\\overrightarrow{OA} + t\\overrightarrow{OB} = \\overrightarrow{OA} + t\\overrightarrow{AB}$).\n- **القطعة المستقيمة $[AB]$**: هي مجموعة مراجح $\\{(A, 1 - t), (B, t)\\}$ من أجل $t \\in [0, 1]$ (أي معاملان من نفس الإشارة).\n- **المستوي $(ABC)$** ($A, B, C$ ليست على استقامية): هو مجموعة مراجح الجملة $\\{(A, \\alpha), (B, \\beta), (C, \\gamma)\\}$ حيث $\\alpha + \\beta + \\gamma \\ne 0$ (وبأخذ $\\alpha = 1 - t - s, \\beta = t, \\gamma = s$ نحصل على التمثيل الوسيطي للمستوي!). وبالتالي إذا كانت $D$ مرجحاً للنقط $A, B, C$ فإن النقط الأربع $A, B, C, D$ تنتمي حتماً إلى نفس المستوي.'
			]
		},
		practice: [
			SHARED_LESSONS_3AS_T3[4].practice[0],
			SHARED_LESSONS_3AS_T3[4].practice[1],
			{
				questionAr:
					'لتكن $A$ و $B$ نقطتين متمايزتين في الفضاء. ما هي مجموعة النقط $G_t$ مرجح الجملة المثقلة $\\{(A, 1 - t), (B, t)\\}$ عندما يمسح الوسيط الحقيقي $t$ المجال المغلق $[0, 1]$ ؟',
				options: [
					'القطعة المستقيمة $[AB]$ كاملة',
					'المستقيم $(AB)$ كاملاً',
					'نصف المستقيم $[AB)$',
					'منتصف القطعة $[AB]$ فقط'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة وممتازة! مجموع المعاملات $(1 - t) + t = 1 \\ne 0$ ومنه $\\overrightarrow{AG_t} = t\\overrightarrow{AB}$ ؛ عندما يمسح $t$ المجال $[0, 1]$ تمسح $G_t$ القطعة المستقيمة $[AB]$ من $A$ ($t = 0$) إلى $B$ ($t = 1$).',
					'انتبه! المستقيم $(AB)$ كاملاً ينتج عندما يمسح $t$ المجموعة $\\mathbb{R}$ كلها وليس المجال $[0, 1]$ فقط.',
					'نصف المستقيم $[AB)$ يوافق $t \\in [0, +\\infty[$ وليس المجال المحدود $[0, 1]$ .',
					'منتصف $[AB]$ يوافق القيمة الوحيدة $t = \\frac{1}{2}$ بينما $t$ يمسح كامل المجال $[0, 1]$ .'
				],
				explanationAr:
					'مجموع المعاملين $(1 - t) + t = 1 \\ne 0$ . من علاقة تعريف المرجح $(1 - t)\\overrightarrow{G_t A} + t\\overrightarrow{G_t B} = \\vec{0} \\iff \\overrightarrow{AG_t} = t\\overrightarrow{AB}$ . ولما يتغير $t$ في $[0, 1]$ تمسح النقطة $G_t$ القطعة المستقيمة $[AB]$ .'
			}
		]
	},

	// =========================================================================
	// LESSON 6 (Order 6, Seq 9): RELATIVE POSITIONS & INTERSECTIONS (INCL. 3 PLANES)
	// =========================================================================
	adaptSharedT3(SHARED_LESSONS_3AS_T3[5], 't3_space_relative_positions_intersections', {
		order: 6,
		domain: 'geometry',
		sequenceId: 'seq9',
		sequenceTitleAr: 'المقطع التاسع: المستقيمات والأوضاع النسبية في الفضاء والتحضير للبكالوريا',
		titleAr: 'الأوضاع النسبية وتقاطع المستقيمات والمستويات (بما فيها تقاطع 3 مستويات) في الفضاء',
		objectives: [
			'تحديد الوضع النسبي لمستويين، ولمستقيم ومستو، ولمستقيمين في الفضاء وتعيين عناصر التقاطع والمسقط العمودي',
			'دراسة وتعيين تقاطع ثلاثة مستويات في الفضاء وتأويل حلول جملة ثلاث معادلات خطية بثلاثة مجاهيل هندسيا',
			'دراسة الأوضاع النسبية وتقاطعات المستويات والمستقيمات مع سطح الكرة في الفضاء'
		],
		keywordsAr: [
			'الأوضاع النسبية في الفضاء',
			'تقاطع مستويين ومستقيم ومستو',
			'تقاطع ثلاثة مستويات',
			'تقاطع كرة ومستو'
		]
	}),

	// =========================================================================
	// LESSON 7 (Order 7, Seq 9 — TAILORED TM T3 BAC INTEGRATION):
	// FULL BAC SYNTHESIS FOR TECHNICAL MATHEMATICS (COEFF 6, 4h30m, 4+4+5+7=20)
	// =========================================================================
	{
		id: 'lesson_3as_tm_t3_integration',
		slug: '3as-tm-t3-integration',
		grade: '3as_tm',
		yearSubjectId: 725,
		trimesterId: 't3',
		sequenceId: 'seq9',
		sequenceTitleAr: 'المقطع التاسع: المستقيمات والأوضاع النسبية في الفضاء والتحضير للبكالوريا',
		order: 7,
		domain: 'integration',
		titleAr: 'إدماج وحصيلة الفصل الثالث والتحضير الشامل لبكالوريا شعبة تقني رياضي',
		objectives: [
			'دمج الدراسة الشاملة للدوال مع التكامل بالتجزئة والمتتاليات التكاملية وحساب المساحات والحجوم في المسألة الشاملة (7 نقاط)',
			'حل مواضيع بكالوريا شاملة لشعبة تقني رياضي تجمع الحساب في Z (موافقات، بيزو، غوص، معادلات ديوفانتية) والاحتمالات والأعداد المركبة والهندسة الفضائية',
			'التحكم في إدارة الوقت (4 ساعات و 30 دقيقة) والتحرير المنهجي وفق هيكلة امتحان البكالوريا الرسمي (4 + 4 + 5 + 7 = 20 نقطة)'
		],
		keywordsAr: [
			'مواضيع بكالوريا تقني رياضي',
			'المسألة الشاملة',
			'التكامل المعمق والحساب في Z',
			'الهندسة الفضائية',
			'تحضير البكالوريا'
		],
		discover: {
			scenarioAr:
				'محاكاة كاملة لامتحان شهادة البكالوريا لشعبة **تقني رياضي** (المدة الرسمية $4\\text{ h }30\\text{ min}$ ، المعامل $6$ ، الهيكلة $4 + 4 + 5 + 7 = 20$ نقطة):\n- **خاتمة المسألة الشاملة ($7$ نقاط)**: الدالة $f(x) = x + (x + 1)e^{-x}$ ومقاربها $(\\Delta): y = x$ في معلم متجانس $\\|\\vec{i}\\| = 2\\,\\text{cm}$ ، وحجم الدوران للدالة $h(x) = \\sqrt{x + 1}\\,e^{-\\frac{x}{2}}$ على $[0, 1]$ .\n- **تمرين الهندسة الفضائية ($4$ نقاط)**: تقاطع سطح الكرة $(S): (x - 1)^2 + y^2 + (z - 2)^2 = 9$ مع المستوي $(P): 2x - 2y + z - 4 = 0$ .\n- **تمرين الحساب في $\\mathbb{Z}$ ($5$ نقاط)**: المعادلة الديوفانتية $11x - 7y = 4$ في $\\mathbb{Z}^2$ .',
			svg: svgFunctionCurvePlot({
				xMin: -0.6,
				xMax: 3.4,
				yMin: -0.5,
				yMax: 3.8,
				fn: (x) => x + (x + 1) * Math.exp(-x),
				curveLabel: 'C_f',
				shadedIntegral: { a: 0, b: 2, color: 'rgba(245,158,11,0.22)' },
				asymptotes: [{ kind: 'oblique', a: 1, b: 0, label: '(Delta): y = x', color: '#dc2626' }],
				points: [
					{ x: 0, y: 1, label: 'A(0, 1)', color: '#15803d' },
					{ x: 2, y: 2 + 3 * Math.exp(-2), label: 'B(2, f(2))', color: '#1d4ed8' }
				]
			}),
			steps: [
				{
					promptAr:
						'**محطة المسألة الشاملة (المساحة والحجم)**: باستعمال الدالة الأصلية $H(x) = -(x + 2)e^{-x}$ للدالة $(x + 1)e^{-x}$ ، نجد $\\int_0^1 (x + 1)e^{-x}\\,dx = 2 - 3e^{-1}$ . استنتج حجم المجسم الدوراني المولد بدوران منحنى $h(x) = \\sqrt{x + 1}\\,e^{-\\frac{x}{2}}$ على $[0, 1]$ حول $(Ox)$ ؛ إذا كُتب $V = \\pi(a - 3e^{-1})\\,\\text{u.v}$ فما قيمة $a$ ؟',
					hintAr: 'لاحظ أن $[h(x)]^2 = (x + 1)e^{-x}$ تماماً! طبق $V = \\pi \\int_0^1 [h(x)]^2\\,dx$ .',
					expectedInput: '2',
					revealAr:
						'بتربيع عبارة $h(x)$ نحصل على $[h(x)]^2 = (x + 1)e^{-x}$ ، ومنه $V = \\pi \\int_0^1 (x + 1)e^{-x}\\,dx = \\pi(2 - 3e^{-1})\\,\\text{u.v}$ أي $a = 2$ (وبالضرب في $1\\,\\text{u.v} = 2^3 = 8\\,\\text{cm}^3$ نجد $8\\pi(2 - 3e^{-1})\\,\\text{cm}^3$).'
				},
				{
					promptAr:
						'**محطة الهندسة الفضائية**: لسطح الكرة $(S)$ ذي المركز $\\Omega(1, 0, 2)$ ونصف القطر $R = 3$ والمستوي $(P): 2x - 2y + z - 4 = 0$ ، احسب المسافة $d(\\Omega, (P))$ .',
					hintAr: 'عوض في $d = \\frac{|2(1) - 2(0) + 2 - 4|}{\\sqrt{2^2 + (-2)^2 + 1^2}}$ .',
					expectedInput: '0',
					revealAr:
						'نجد $d(\\Omega, (P)) = \\frac{|2 - 0 + 2 - 4|}{3} = 0$ ، أي $\\Omega \\in (P)$ ، فالمستوي $(P)$ يقطع $(S)$ وفق دائرة كبرى مركزها $\\Omega(1, 0, 2)$ ونصف قطرها $r = R = 3$ .'
				},
				{
					promptAr:
						'**محطة الحساب في $\\mathbb{Z}$**: في المعادلة الديوفانتية $11x - 7y = 4$ ، الثنائية $(1, 1)$ حل خاص لأن $11(1) - 7(1) = 4$ ، ومنه بمبرهنة غوص $x = 7k + 1$ و $y = 11k + 1$ ($k \\in \\mathbb{Z}$). ما هي أكبر قيمة ممكنة للقاسم المشترك الأكبر $\\text{PGCD}(x, y)$ لأي حل $(x, y)$ من هذه الحلول؟',
					hintAr: 'كل قاسم مشترك موجب $d = \\text{PGCD}(x, y)$ يقسم التوليفة الخطية $11x - 7y = 4$ ، واختبر الحالة $k = 1$ حيث $(x, y) = (8, 12)$ .',
					expectedInput: '4',
					revealAr:
						'بما أن أي قاسم مشترك موجب $d = \\text{PGCD}(x, y)$ يقسم $x$ و $y$ فإنه يقسم توليفتهما الخطية $11x - 7y = 4$ ، إذن $d \\in \\{1, 2, 4\\}$ وأكبر قيمة ممكنة لـ $\\text{PGCD}(x, y)$ هي $4$ (تتحقق مثلاً من أجل $k = 1$ حيث $x = 8, y = 12$ و $\\text{PGCD}(8, 12) = 4$).'
				},
				{
					promptAr:
						'**إدارة وقت البكالوريا ($4\\text{ h }30\\text{ min} = 270\\text{ min}$)**: وفق التوزيع النسبي للنقاط ($20$ نقطة)، كم دقيقة تقريباً تُخصص للمسألة الشاملة ذات $7$ نقاط مع ترك $30$ دقيقة للمراجعة والتحقق النهائي (أي توزع $240$ دقيقة على $20$ نقطة بمعدل $12$ دقيقة لكل نقطة)؟',
					hintAr: 'اضرب $7 \\times 12$ دقيقة.',
					expectedInput: '84',
					revealAr:
						'بتخصيص $30$ دقيقة لقراءة الموضوعين بهدوء والمراجعة الختامية، تتوزع $240$ دقيقة بمعدل $12$ دقيقة لكل نقطة: التمرين الأول ($4$ ن $\\approx 48$ د)، التمرين الثاني ($4$ ن $\\approx 48$ د)، التمرين الثالث ($5$ ن $\\approx 60$ د)، والمسألة الشاملة ($7$ ن $\\approx 84$ دقيقة أي قرابة ساعة ونصف).'
				}
			]
		},
		summary: {
			rulesAr: [
				'**البنية الرسمية لاختبار الرياضيات في بكالوريا شعبة تقني رياضي (ONEC)**: المدة **$4$ ساعات و $30$ دقيقة**، المعامل **$6$**، ويختار المترشح أحد موضوعين يتكون كل منهما من **أربعة تمارين مستقلة ($4 + 4 + 5 + 7 = 20$ نقطة)**:\n- **التمرين الأول ($4$ نقاط)**: حساب الاحتمالات (السحب، المتغير العشوائي، شجرة الاحتمالات، قانون ثنائي الحد) أو المتتاليات العددية.\n- **التمرين الثاني ($4$ نقاط)**: الأعداد المركبة والتحويلات النقطية المألوفة (الانسحاب، التحاكي، الدوران) أو الهندسة الفضائية (مستويات، مستقيمات، كرة، أسطوانة/مخروط دوراني)، وقد يُصاغ بصواب أو خطأ مع التعليل.\n- **التمرين الثالث ($5$ نقاط)**: التمرين المميز لشعبة تقني رياضي في **الأعداد والحساب في $\\mathbb{Z}$** (القسمة، الموافقات، التعداد، الأعداد الأولية، مبرهنتا بيزو وغوص، المعادلات الديوفانتية $ax + by = c$) مدمجاً أحياناً مع المتتاليات.\n- **التمرين الرابع — المسألة الشاملة ($7$ نقاط)**: دالة مساعدة + دالة رئيسية، مقاربات ومبرهنة القيم المتوسطة ومناقشة بيانية، متبوعة بـ**الحساب التكاملي المعمق** (المكاملة بالتجزئة، متتالية معرفة بتكامل، مساحة حيز مستوٍ، أو حجم مجسم دوراني).',
				'**وصايا التحرير الرياضي الكامل يوم البكالوريا (لحصد العلامة $20/20$)**:\n1) اذكر شروط كل مبرهنة قبل استنتاج نتيجتها: الاستمرارية والرتابة التامة في $(TVI)$ ، و $\\text{PGCD}(a, b) = 1$ في مبرهنة غوص، و $0 \\le r < b$ في باقي القسمة الإقليدية، و $0 \\le a_i < \\alpha$ في التعداد.\n2) تحقق من التجانس الهندسي للوحدات: اضرب المساحة بوحدة المساحة في $\\|\\vec{i}\\|\\|\\vec{j}\\|$ للحصول على $\\text{cm}^2$ ، واضرب الحجم بوحدة الحجم في $\\|\\vec{i}\\|\\|\\vec{j}\\|\\|\\vec{k}\\|$ للحصول على $\\text{cm}^3$ .\n3) في تقاطع ثلاثة مستويات، أوِل الحلول هندسياً بدقة: حل وحيد (يتقاطعون في نقطة)، مستقيم وسطي بوسيط $t$ (يتقاطعون وفق مستقيم مشترك — حزمة مستويات)، أو جملة مستحيلة (لا يوجد تقاطع مشترك).'
			],
			visualSvg: svgSpace3DScene({
				showPlanePatch: true,
				planeLabel: '(P)',
				normalVector: { x: 0.8, y: 0.8, z: 1.1, label: 'n(2,-2,1)' },
				points: [
					{ x: 1.5, y: 1.5, z: 1.2, label: 'Omega in (P)', color: '#dc2626' },
					{ x: 0.7, y: 2.3, z: 1.2, label: 'M in (C)', color: '#1d4ed8' }
				]
			}),
			visualCaptionAr:
				'مقطع قطري لسطح الكرة $(S)$ بالمستوي $(P)$ المار من المركز $\\Omega$ ($d = 0$) وفق دائرة كبرى نصف قطرها $r = R$',
			examples: [
				{
					problemAr:
						'مسألة شاملة مصغرة (تحليل + مساحة و $\\alpha$): لتكن $f(x) = x + 2 - x e^{x - 1}$ على $\\mathbb{R}$ ، وليكن $\\alpha \\in ]1.5,\\; 1.6[$ الحل الوحيد لـ $f(x) = 0$ ، و $(\\Delta): y = x + 2$ المقارب المائل بجوار $-\\infty$ . احسب بوحدة المساحة $\\mathcal{A}(\\alpha)$ مساحة الحيز المحدد بـ $(C_f)$ و $(\\Delta)$ والمستقيمين $x = 1$ و $x = \\alpha$ ، ثم أثبت أن $\\mathcal{A}(\\alpha) = \\frac{\\alpha^2 + \\alpha - 2}{\\alpha}\\,\\text{u.a}$ .',
					solutionAr:
						'1) على المجال $[1, \\alpha]$ لدينا $x > 0$ و $e^{x - 1} > 0$ ، ومنه $f(x) - (x + 2) = -x e^{x - 1} < 0$ (المنحنى $(C_f)$ يقع تحت $(\\Delta)$). إذن:\n$$\\mathcal{A}(\\alpha) = \\int_1^\\alpha \\big[(x + 2) - f(x)\\big]\\,dx = \\int_1^\\alpha x e^{x - 1}\\,dx$$\n2) **المكاملة بالتجزئة**: نضع $u(x) = x \\implies u\'(x) = 1$ و $v\'(x) = e^{x - 1} \\implies v(x) = e^{x - 1}$ :\n$$\\mathcal{A}(\\alpha) = \\big[x e^{x - 1}\\big]_1^\\alpha - \\int_1^\\alpha e^{x - 1}\\,dx = (\\alpha e^{\\alpha - 1} - 1) - \\big[e^{x - 1}\\big]_1^\\alpha = \\alpha e^{\\alpha - 1} - 1 - (e^{\\alpha - 1} - 1) = (\\alpha - 1)e^{\\alpha - 1}$$\n3) **التعبير الناطق بدلالة $\\alpha$**: بما أن $f(\\alpha) = 0$ فإن $\\alpha + 2 - \\alpha e^{\\alpha - 1} = 0 \\iff e^{\\alpha - 1} = \\frac{\\alpha + 2}{\\alpha}$ . بالتعويض نجد:\n$$\\mathcal{A}(\\alpha) = (\\alpha - 1) \\cdot \\frac{\\alpha + 2}{\\alpha} = \\frac{\\alpha^2 + \\alpha - 2}{\\alpha}\\,\\text{u.a}$$'
				},
				{
					problemAr:
						'تمرين شامل (تقاطع ثلاثة مستويات + معادلة ديوفانتية): نعتبر المستويات $(P_1): x + y + z = 4$ ، $(P_2): 2x - y + z = 5$ ، و $(P_3): 4x + y + 3z = m$ ($m \\in \\mathbb{R}$).\n1) عيّن قيمة $m$ حتى تتقاطع المستويات الثلاثة وفق مستقيم مشترك $(\\Delta)$ يُطلب تمثيله الوسيطي.\n2) من أجل تلك القيمة لـ $m$ ، عيّن نقط $(\\Delta)$ ذات الإحداثيات الصحيحة $(x, y, z) \\in \\mathbb{Z}^3$ .',
					solutionAr:
						'1) نلاحظ أن الشعاع الناظمي لـ $(P_3)$ يحقق $\\vec{n}_3(4, 1, 3) = 2\\vec{n}_1(1, 1, 1) + \\vec{n}_2(2, -1, 1)$ ! وبالفعل بضرب معادلة $(P_1)$ في $2$ وجمعها مع $(P_2)$ نجد:\n$$2(x + y + z) + (2x - y + z) = 2(4) + 5 \\iff 4x + y + 3z = 13$$\n- إذا كان $m \\ne 13$ فالجملة مستحيلة والتقاطع خالٍ $\\varnothing$ .\n- إذا كان $m = 13$ فالمعادلة الثالثة ناتجة عن الأوليين، فيكون $(P_1) \\cap (P_2) \\cap (P_3) = (P_1) \\cap (P_2) = (\\Delta)$ . بوضع $z = t$ ($t \\in \\mathbb{R}$) وجمع $(P_1)$ و $(P_2)$ نجد $3x + 2t = 9 \\implies x = 3 - \\frac{2}{3}t$ و $y = 4 - x - t = 1 - \\frac{1}{3}t$ (أو بوضع $t = 3k$ نحصل على التمثيل الخالي من الكسور: $x = 3 - 2s,\\; y = 1 - s,\\; z = 3s$ مع $s \\in \\mathbb{R}$).\n2) **النقط الصحيحة على $(\\Delta)$**: من $3x + 2z = 9$ في $\\mathbb{Z}^2$ (معادلة ديوفانتية مع $\\text{PGCD}(3, 2) = 1$ وحل خاص $(3, 0)$) نجد بمبرهنة غوص $x = 3 - 2k$ و $z = 3k$ ($k \\in \\mathbb{Z}$)، وبالتعويض في $y = 4 - x - z$ نجد $y = 1 - k \\in \\mathbb{Z}$ تلقائياً! إذن النقط ذات الإحداثيات الصحيحة هي $M_k(3 - 2k,\\; 1 - k,\\; 3k)$ حيث $k \\in \\mathbb{Z}$ .'
				}
			],
			watchOutAr:
				'توصية ختامية لمترشحي بكالوريا شعبة تقني رياضي: استثمر النصف ساعة الأولى في الاختيار الواعي لأحد الموضوعين بعد قراءتهما كاملين، ولا تغادر التمرين الثالث ($5$ نقاط في $\\mathbb{Z}$) أو خاتمة المسألة الشاملة ($7$ نقاط) دون مراجعة الإشارات وشروط المبرهنات ووحدات المساحة والحجم!'
		},
		practice: [
			{
				questionAr:
					'من أجل كل عدد طبيعي $n \\ge 1$ ، لتكن المتتالية المعرفة بتكامل $I_n = \\int_0^1 x^n \\ln(x + 1)\\,dx$ . باتجاه تغير $(I_n)$ وحصر $\\ln(x + 1)$ على $[0, 1]$ (حيث $0 \\le \\ln(x + 1) \\le \\ln 2$)، أي خاصية مما يلي صحيحة؟',
				options: [
					'$(I_n)$ متناقصة وتحقق $0 \\le I_n \\le \\frac{\\ln 2}{n + 1}$ فهي متقاربة نحو $0$',
					'$(I_n)$ متزايدة ومتقاربة نحو $\\ln 2$',
					'$(I_n)$ متناقصة ومتقاربة نحو $\\ln 2$',
					'$(I_n)$ متباعدة لأن $x^n$ يتغير مع $n$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة شاملة وممتازة! على $[0, 1]$ لدينا $x^{n+1} - x^n = x^n(x - 1) \\le 0$ و $\\ln(x + 1) \\ge 0$ فـ $(I_n)$ متناقصة، ومن $0 \\le x^n\\ln(x + 1) \\le (\\ln 2)x^n$ نجد بالـمكاملة $0 \\le I_n \\le \\frac{\\ln 2}{n + 1} \\to 0$ .',
					'خطأ: على المجال $[0, 1]$ كلما كبر الأس $n$ صغر المقدار $x^n$ ($x^{n+1} \\le x^n$) فتكون $(I_n)$ متناقصة وليست متزايدة.',
					'خطأ: الطرف الأيمن للحصر هو $\\ln 2 \\int_0^1 x^n\\,dx = \\frac{\\ln 2}{n + 1}$ الذي يؤول إلى $0$ وليس $\\ln 2$ .',
					'خطأ: المتتالية متناقصة ومحدودة من الأدنى بـ $0$ فهي متقاربة حتماً ونهايتها $0$ .'
				],
				explanationAr:
					'من أجل كل $x \\in [0, 1]$ لدينا $0 \\le \\ln(x + 1) \\le \\ln 2$ . بالضرب في $x^n \\ge 0$ ومكاملة الأطراف على $[0, 1]$ نجد $0 \\le I_n \\le (\\ln 2)\\left[\\frac{x^{n+1}}{n + 1}\\right]_0^1 = \\frac{\\ln 2}{n + 1}$ . وبما أن $I_{n+1} - I_n = \\int_0^1 x^n(x - 1)\\ln(x + 1)\\,dx \\le 0$ ، فإن $(I_n)$ متناقصة ومتقاربة نحو $0$ .'
			},
			{
				questionAr:
					'في الفضاء المنسوب إلى معلم متعامد ومتجانس، ما طبيعة تقاطع المخروط الدوراني $(\\Sigma): x^2 + y^2 = 4z^2$ مع المستوي $(P)$ ذي المعادلة $z = 3$ ؟',
				options: [
					'دائرة تقع في المستوي $z = 3$ مركزها $H(0, 0, 3)$ ونصف قطرها $r = 6$',
					'دائرة تقع في المستوي $z = 3$ مركزها $H(0, 0, 3)$ ونصف قطرها $r = 36$',
					'دائرة تقع في المستوي $z = 3$ مركزها $O(0, 0, 0)$ ونصف قطرها $r = 6$',
					'أسطوانة دورانية نصف قطرها $6$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة وممتازة! بتعويض $z = 3$ نجد $x^2 + y^2 = 4(9) = 36 = 6^2$ في المستوي $z = 3$ ، وهي دائرة مركزها المسقط $H(0, 0, 3)$ ونصف قطرها $r = 6$ .',
					'خطأ: نسيت أخذ الجذر التربيعي لـ $r^2 = 36$ فأخذت $36$ بدلاً من $r = 6$ .',
					'فخ شائع! المبدأ $O(0, 0, 0)$ لا ينتمي للمستوي $z = 3$ أصلاً؛ مركز الدائرة في المستوي $z = 3$ هو $H(0, 0, 3)$ .',
					'خطأ: التقاطع مع المستوي $z = 3$ يثبت قيمة $z = 3$ فيعطي دائرة مستوية وليس أسطوانة.'
				],
				explanationAr:
					'بحل الجملة $x^2 + y^2 = 4z^2$ و $z = 3$ نحصل على $x^2 + y^2 = 36$ و $z = 3$ ، أي $(x - 0)^2 + (y - 0)^2 + (z - 3)^2 = 6^2$ مع $z = 3$ ، وهي دائرة في المستوي $z = 3$ مركزها $H(0, 0, 3)$ ونصف قطرها $r = 6$ .'
			},
			{
				questionAr:
					'لتكن في $\\mathbb{Z}^2$ المعادلة الديوفانتية $15x - 9y = 12$ . مجموعة حلولها في $\\mathbb{Z}^2$ هي ($k \\in \\mathbb{Z}$):',
				options: [
					'$S = \\{(3k + 2,\\; 5k + 2) \\mid k \\in \\mathbb{Z}\\}$',
					'$S = \\{(9k + 2,\\; 15k + 2) \\mid k \\in \\mathbb{Z}\\}$',
					'لا تقبل حلولاً لأن $\\text{PGCD}(15, 9) = 3 \\ne 1$',
					'$S = \\{(3k + 2,\\; -5k + 2) \\mid k \\in \\mathbb{Z}\\}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة وممتازة! نقسم على $\\text{PGCD}(15, 9) = 3$ (الذي يقسم $12$) فنحصل على $5x - 3y = 4$ ؛ الحل الخاص $(2, 2)$ يحقق $10 - 6 = 4$ ، وبمبرهنة غوص $5(x - 2) = 3(y - 2) \\implies x = 3k + 2$ و $y = 5k + 2$ .',
					'خطأ كلاسيكي: طبقت صيغة الحل العام قبل اختزال المعادلة على $\\text{PGCD}(15, 9) = 3$ ، ففقدت ثلثي الحلول الصحيحة (مثل $(5, 7)$ حيث $75 - 63 = 12$)!',
					'خطأ: بما أن $\\text{PGCD}(15, 9) = 3$ يقسم الطرف الثاني $12$ ، فالمعادلة تقبل عدداً غير منتهٍ من الحلول في $\\mathbb{Z}^2$ .',
					'خطأ في الإشارة: المعادلة بالطرح $5x - 3y = 4$ ، فيجب أن يكون لمعاملي $k$ نفس الإشارة حتى يختزلا ($5(3k) - 3(5k) = 0$).'
				],
				explanationAr:
					'لدينا $\\text{PGCD}(15, 9) = 3$ و $3 \\mid 12$ . بالقسمة على $3$ تكافئ المعادلة $5x - 3y = 4$ مع $\\text{PGCD}(5, 3) = 1$ . الثنائية $(2, 2)$ حل خاص لأن $5(2) - 3(2) = 4$ ، ومن $5(x - 2) = 3(y - 2)$ نجد بمبرهنة غوص $x = 3k + 2$ و $y = 5k + 2$ ($k \\in \\mathbb{Z}$).'
			}
		]
	}
];
