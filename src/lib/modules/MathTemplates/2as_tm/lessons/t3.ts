import type { InteractiveLessonData } from '../../types';
import { adaptLessonForTrack } from '../../types';
import { SHARED_LESSONS_2AS_T3 } from '../../secondary_shared_2as/lessons/t3';

// ============================================================================
// SVG Visual Helpers for 2AS TM Trimester 3
// ============================================================================

const svgCubeSectionPlane = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 240" width="440" height="240" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">
  <rect x="10" y="10" width="420" height="220" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="220" y="30" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">المقطع المستوي لمكعب بمستوٍ يقطع أحرفه (إنشاء مضلع المقطع والتوازي)</text>
  
  <!-- Hidden Edges (dashed) -->
  <line x1="130" y1="180" x2="190" y2="140" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4"/>
  <line x1="190" y1="140" x2="310" y2="140" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4"/>
  <line x1="190" y1="140" x2="190" y2="50" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4"/>
  
  <!-- Visible Edges -->
  <line x1="130" y1="180" x2="250" y2="180" stroke="#334155" stroke-width="2"/>
  <line x1="250" y1="180" x2="310" y2="140" stroke="#334155" stroke-width="2"/>
  <line x1="130" y1="90" x2="250" y2="90" stroke="#334155" stroke-width="2"/>
  <line x1="250" y1="90" x2="310" y2="50" stroke="#334155" stroke-width="2"/>
  <line x1="310" y1="50" x2="190" y2="50" stroke="#334155" stroke-width="2"/>
  <line x1="190" y1="50" x2="130" y2="90" stroke="#334155" stroke-width="2"/>
  <line x1="130" y1="180" x2="130" y2="90" stroke="#334155" stroke-width="2"/>
  <line x1="250" y1="180" x2="250" y2="90" stroke="#334155" stroke-width="2"/>
  <line x1="310" y1="140" x2="310" y2="50" stroke="#334155" stroke-width="2"/>

  <!-- Cutting Plane Section (Polygon) -->
  <polygon points="190,180 280,160 310,95 220,70 130,135" fill="rgba(6,182,212,0.25)" stroke="#0891b2" stroke-width="2.5"/>

  <!-- Points labels -->
  <circle cx="190" cy="180" r="3.5" fill="#dc2626"/>
  <text x="190" y="196" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">I ∈ [AB]</text>
  <circle cx="280" cy="160" r="3.5" fill="#dc2626"/>
  <text x="296" y="172" font-size="10.5" font-weight="bold" fill="#dc2626">J ∈ [BC]</text>
  <circle cx="310" cy="95" r="3.5" fill="#dc2626"/>
  <text x="324" y="100" font-size="10.5" font-weight="bold" fill="#dc2626">K</text>
  <circle cx="220" cy="70" r="3.5" fill="#dc2626"/>
  <text x="220" y="62" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">L</text>
  <circle cx="130" cy="135" r="3.5" fill="#dc2626"/>
  <text x="114" y="138" font-size="10.5" font-weight="bold" fill="#dc2626">M</text>

  <!-- Note Badge -->
  <rect x="20" y="185" width="130" height="35" rx="4" fill="#ecfeff" stroke="#a5f3fc"/>
  <text x="85" y="200" text-anchor="middle" font-size="10" font-weight="bold" fill="#0e7490">الأوجه المتوازية</text>
  <text x="85" y="213" text-anchor="middle" font-size="9.5" fill="#0e7490">تُقطع في خطوط متوازية</text>
</svg>`;

const svgSurfacesOfRevolution3D = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 240" width="450" height="240" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">
  <rect x="10" y="10" width="430" height="220" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="225" y="30" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">سطوح مجسمات الدوران في معلم فضائي: الكرة والأسطوانة والمخروط</text>
  
  <!-- Left panel: Sphere -->
  <g transform="translate(15, 45)">
    <rect x="0" y="0" width="125" height="165" rx="6" fill="#ffffff" stroke="#e2e8f0"/>
    <text x="62" y="20" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">سطح الكرة</text>
    <circle cx="62" cy="75" r="38" fill="rgba(59,130,246,0.12)" stroke="#2563eb" stroke-width="2"/>
    <ellipse cx="62" cy="75" rx="38" ry="12" fill="none" stroke="#2563eb" stroke-width="1" stroke-dasharray="3,3"/>
    <circle cx="62" cy="75" r="3" fill="#dc2626"/>
    <line x1="62" y1="75" x2="95" y2="55" stroke="#dc2626" stroke-width="1.5"/>
    <text x="75" y="60" font-size="10" font-weight="bold" fill="#dc2626">R</text>
    <text x="62" y="132" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#0f172a">(x-x₀)² + (y-y₀)²</text>
    <text x="62" y="148" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#0f172a">+ (z-z₀)² = R²</text>
  </g>

  <!-- Middle panel: Cylinder -->
  <g transform="translate(160, 45)">
    <rect x="0" y="0" width="125" height="165" rx="6" fill="#ffffff" stroke="#e2e8f0"/>
    <text x="62" y="20" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#166534">الأسطوانة الدورانية</text>
    <!-- Axis Oz -->
    <line x1="62" y1="120" x2="62" y2="35" stroke="#64748b" stroke-width="1.2" stroke-dasharray="3,3"/>
    <!-- Top and bottom ellipses -->
    <ellipse cx="62" cy="50" rx="32" ry="10" fill="rgba(22,163,74,0.12)" stroke="#16a34a" stroke-width="2"/>
    <line x1="30" y1="50" x2="30" y2="105" stroke="#16a34a" stroke-width="2"/>
    <line x1="94" y1="50" x2="94" y2="105" stroke="#16a34a" stroke-width="2"/>
    <ellipse cx="62" cy="105" rx="32" ry="10" fill="rgba(22,163,74,0.08)" stroke="#16a34a" stroke-width="2"/>
    <text x="62" y="132" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">محورها (Oz):</text>
    <text x="62" y="148" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">x² + y² = R²</text>
  </g>

  <!-- Right panel: Cone -->
  <g transform="translate(305, 45)">
    <rect x="0" y="0" width="125" height="165" rx="6" fill="#ffffff" stroke="#e2e8f0"/>
    <text x="62" y="20" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#7c2d12">المخروط الدوراني</text>
    <!-- Axis Oz -->
    <line x1="62" y1="120" x2="62" y2="35" stroke="#64748b" stroke-width="1.2" stroke-dasharray="3,3"/>
    <!-- Cone sides meeting at vertex O(62, 105) -->
    <ellipse cx="62" cy="50" rx="34" ry="10" fill="rgba(217,119,6,0.12)" stroke="#d97706" stroke-width="2"/>
    <line x1="28" y1="50" x2="62" y2="105" stroke="#d97706" stroke-width="2"/>
    <line x1="96" y1="50" x2="62" y2="105" stroke="#d97706" stroke-width="2"/>
    <circle cx="62" cy="105" r="3" fill="#dc2626"/>
    <text x="74" y="108" font-size="9" font-weight="bold" fill="#dc2626">O(0,0,0)</text>
    <text x="62" y="132" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">رأسه O ومحوره (Oz):</text>
    <text x="62" y="148" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#b45309">x² + y² = (tan α)² z²</text>
  </g>
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
// LESSONS 2AS TM - TRIMESTER 3 (7 Lessons)
// ============================================================================

export const LESSONS_2AS_TM_T3: InteractiveLessonData[] = [
	// [1] lesson_2as_tm_t3_numerical_sequences_generation_monotonicity
	adaptShared(
		SHARED_LESSONS_2AS_T3[0],
		't3_numerical_sequences_generation_monotonicity',
		{
			order: 1,
			sequenceId: 'seq7',
			sequenceTitleAr: 'المقطع السابع: المتتاليات العددية وتطبيقات النمو والاندثار',
			titleAr: 'المتتاليات العددية: أنماط التوليد، التمثيل البياني للحدود، اتجاه التغير والمحدودية',
			objectives: [
				'توليد المتتاليات الصريحة والتراجعية وحساب حدودها ونمذجة ظواهر متقطعة',
				'التمثيل البياني لحدود متتالية تراجعية على محور الفواصل باستعمال المنصف الأول y = x ودراسة تقاربها بيانياً',
				'دراسة اتجاه تغير متتالية واستنتاج المحدودية وتخمين السلوك التقاربي للمتتالية عند اللانهاية'
			],
			keywordsAr: [
				'توليد متتالية',
				'التمثيل البياني بالمنصف الأول',
				'اتجاه تغير متتالية',
				'المتتالية المحدودة',
				'التقارب البياني'
			]
		}
	),

	// [2] lesson_2as_tm_t3_arithmetic_sequences_properties_sum
	adaptShared(
		SHARED_LESSONS_2AS_T3[1],
		't3_arithmetic_sequences_properties_sum',
		{
			order: 2,
			sequenceId: 'seq7',
			sequenceTitleAr: 'المقطع السابع: المتتاليات العددية وتطبيقات النمو والاندثار',
			titleAr: 'المتتاليات الحسابية: عبارة الحد العام، الوسط الحسابي، مجموع الحدود وتطبيقات النمو الخطي',
			objectives: [
				'التحكم في المتتاليات الحسابية وخصائصها الجبرية وحساب الأساس والحد الأول من جمل معادلات',
				'تطبيق دستور مجموع حدود متعاقبة في حل مسائل عددية وتراكمية ومسائل القياسات المتدرجة',
				'نمذجة وضعيات تقنية وهندسية واقتصادية تمثل ظواهر ذات نمو خطي منتظم'
			],
			keywordsAr: [
				'المتتالية الحسابية',
				'الحد العام',
				'الوسط الحسابي',
				'مجموع حدود متعاقبة',
				'النمو الخطي'
			]
		}
	),

	// [3] lesson_2as_tm_t3_geometric_sequences_properties_sum_convergence
	adaptShared(
		SHARED_LESSONS_2AS_T3[2],
		't3_geometric_sequences_properties_sum_convergence',
		{
			order: 3,
			sequenceId: 'seq7',
			sequenceTitleAr: 'المقطع السابع: المتتاليات العددية وتطبيقات النمو والاندثار',
			titleAr: 'المتتاليات الهندسية: عبارة الحد العام، المجموع، التقارب وتطبيقات النمو الأسي والاندثار',
			objectives: [
				'التحكم في المتتاليات الهندسية وحساب المجموع والحدود العامة بدلالة الأساس والحد الأول',
				'دراسة تقارب متتالية هندسية ونهايتها عند +∞ حسب قيم الأساس q واستنتاج سلوكها المستقبلي',
				'نمذجة ظواهر التحلل الإشعاعي، الشحن والتفريغ، الفائدة المركبة، وتناقص الضغط باستعمال المتتاليات الهندسية'
			],
			keywordsAr: [
				'المتتالية الهندسية',
				'الحد العام لمتتالية هندسية',
				'مجموع متتالية هندسية',
				'تقارب المتتالية الهندسية',
				'النمو الأسي والاندثار'
			]
		}
	),

	// [4] lesson_2as_tm_t3_space_geometry_solids_perspective_volumes
	adaptShared(
		SHARED_LESSONS_2AS_T3[3],
		't3_space_geometry_solids_perspective_volumes',
		{
			order: 4,
			sequenceId: 'seq8',
			sequenceTitleAr: 'المقطع الثامن: الهندسة في الفضاء: التمثيل، الأوضاع النسبية والمقاطع المستوية',
			titleAr: 'الهندسة في الفضاء: تمثيل المجسمات بالمنظور المتساوي القياس والتصميم وحساب الحجوم',
			objectives: [
				'التمثيل الدقيق للمجسمات المألوفة بالمنظور متساوي القياس والمساقط المتعامدة المستخدمة في الرسم التقني والصناعي',
				'إنشاء التصاميم الهندسية الدقيقة للأسطح القابلة للنشر (مكعب، موشور، أسطوانة، مخروط)',
				'حساب حجوم ومساحات القطع والأشكال المركبة وتطبيقاتها في حساب الكتل والكميات والمواد'
			],
			keywordsAr: [
				'المنظور متساوي القياس',
				'الرسم التقني والمساقط',
				'تصميم المجسمات',
				'حساب المساحات والحجوم',
				'الأشكال المركبة'
			]
		}
	),

	// [5] lesson_2as_tm_t3_space_geometry_relative_positions_parallelism_orthogonality
	adaptShared(
		SHARED_LESSONS_2AS_T3[4],
		't3_space_geometry_relative_positions_parallelism_orthogonality',
		{
			order: 5,
			sequenceId: 'seq8',
			sequenceTitleAr: 'المقطع الثامن: الهندسة في الفضاء: التمثيل، الأوضاع النسبية والمقاطع المستوية',
			titleAr: 'الأوضاع النسبية للمستقيمات والمستويات: قواعد التوازي والتعامد والإسقاط العمودي',
			objectives: [
				'دراسة تقاطع وتوازي المستقيمات والمستويات وتحديد مستقيم التقاطع بين مستويين بدقة إنشائية',
				'تطبيق مبرهنات التعامد في الفضاء وتعيين الإسقاط العمودي لنقطة أو مستقيم على مستو',
				'توظيف مبرهنات الخطين المتعامدين والمستوي المحوري في تبرير خواص الهياكل المجسمة والمنشآت'
			],
			keywordsAr: [
				'الأوضاع النسبية',
				'تقاطع المستويات',
				'التعامد والتوازي في الفضاء',
				'الإسقاط العمودي',
				'المستوي المحوري'
			]
		}
	),

	// [6] lesson_2as_tm_t3_space_geometry_plane_sections_cube_tetrahedron_vectors (STREAM EXCLUSIVE)
	{
		id: 'lesson_2as_tm_t3_space_geometry_plane_sections_cube_tetrahedron_vectors',
		slug: '2as-tm-t3-space-geometry-plane-sections-cube-tetrahedron-vectors',
		grade: '2as_tm',
		yearSubjectId: 712,
		trimesterId: 't3',
		sequenceId: 'seq8',
		sequenceTitleAr: 'المقطع الثامن: الهندسة في الفضاء: التمثيل، الأوضاع النسبية والمقاطع المستوية',
		order: 6,
		titleAr: 'المقاطع المستوية للمكعب ورباعي الوجوه والحساب الشعاعي في الفضاء وتطبيقاتها',
		objectives: [
			'إنشاء المقاطع المستوية للمكعب بمستو في وضعيات مختلفة وتحديد طبيعة المضلع الناتج (مثلث، رباعي، مسدس)',
			'إنشاء مقطع رباعي وجوه بمستو وتوظيف تقاطع المستويات لإيجاد نقاط الأثر بدقة هندسية',
			'ممارسة الحساب الشعاعي في الفضاء وتوظيفه لإثبات توازي المستقيمات والمستويات في الفضاء',
			'إثبات انطباق الأشعة في نفس المستوي واستعماله في التحقق من وجود نقاط في مستو واحد'
		],
		keywordsAr: [
			'المقاطع المستوية للمكعب',
			'مقطع رباعي الوجوه',
			'خطوط الأثر',
			'الحساب الشعاعي في الفضاء',
			'أشعة متحدة المستوي'
		],
		discover: {
			scenarioAr:
				'في ورشة التصنيع الميكانيكي، نقوم بقطع قطعة فولاذية على شكل مكعب $ABCDEFGH$ طول حرفه $a = 6\\text{ cm}$ بمستوٍ قاطع يمر بثلاث نقط معينة: النقطة $I$ منتصف $[AB]$، والنقطة $J$ منتصف $[BC]$، والنقطة $K$ من الحرف $[AE]$ بحيث $AK = 2\\text{ cm}$. نريد إنشاء مضلع المقطع المستوي بدقة هندسية، وتعيين خطوط الأثر على الأوجه المتوازية، واستعمال الحساب الشعاعي للتحقق من استوائية الأشعة وتوازي المستقيمات.',
			svg: svgCubeSectionPlane,
			steps: [
				{
					promptAr:
						'بما أن النقطتين $I$ و $J$ تقعان في الوجه السفلي $(ABCD)$، فإن القطعة $[IJ]$ هي أحد أضلاع المقطع. استعمل خاصية مستقيم المنتصفين لتحديد الوضع النسبي للمستقيمين $(IJ)$ و $(AC)$ وعلاقة الشعاعين $\\vec{IJ}$ و $\\vec{AC}$.',
					hintAr: 'في المثلث $ABC$، $I$ منتصف $[AB]$ و $J$ منتصف $[BC]$.',
					expectedInput: 'IJ = (1/2)AC',
					revealAr:
						'حسب مبرهنة مستقيم المنتصفين في المثلث $ABC$، المستقيم $(IJ)$ يوازي المستقيم $(AC)$، والعلاقة الشعاعية هي: $\\vec{IJ} = \\frac{1}{2}\\vec{AC}$.'
				},
				{
					promptAr:
						'الوجه العلوي $(EFGH)$ يوازي الوجه السفلي $(ABCD)$. ما هي العلاقة الهندسية بين أثر المستوي القاطع على الوجه العلوي والضلع $[IJ]$؟',
					hintAr: 'إذا قطع مستوٍ مستويين متوازيين، فإن خطي التقاطع...',
					expectedInput: 'متوازيان',
					revealAr:
						'مبرهنة أساسية في الفضاء: إذا قطع مستوٍ مستويين متوازيين، فإن مستقيمي التقاطع يكونان متوازيين تماماً. إذن أثر المقطع على الوجه العلوي $(EFGH)$ يوازي بالضرورة الضلع $[IJ]$ (وبالتالي يوازي $(EG)$ أيضاً).'
				},
				{
					promptAr:
						'هل الأشعة الثلاثة $\\vec{IJ}$، $\\vec{AC}$ و $\\vec{EG}$ متحدة المستوي (coplanar)؟ برر إجابتك شعاعياً.',
					hintAr: 'بين أن كل شعاع منها مرتبط خطياً بالشعاع الآخر أو يوازيه في الفضاء.',
					expectedInput: 'نعم',
					revealAr:
						'نعم، الأشعة متحدة المستوي لأنها متوازية جميعاً: لدينا $\\vec{IJ} = \\frac{1}{2}\\vec{AC}$ و $\\vec{EG} = \\vec{AC}$ لأن الرباعي $ACGE$ مستطيل. إذن الأشعة الثلاثة مرتبطة خطياً باتجاه واحد، ومنه فهي متحدة المستوي.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**قواعد إنشاء المقاطع المستوية للمجسمات**:\n- مقطع مجسم بمستوٍ هو مضلع محدب أضلاعه هي تقاطع المستوي القاطع مع أوجه المجسم.\n- **مبرهنة الأوجه المتوازية**: إذا قطع مستوٍ وجهين متوازيين لمكعب، فإن خطي التقاطع (الأثرين) متوازيان حتماً.\n- **طريقة خطوط الأثر (Traces)**: عندما لا تقع نقطتان من المستوي في نفس الوجه، نمدد المستقيمات في الأوجه المتقاطعة لإيجاد نقاط ارتكاز خارجية تقع في مستويات الأوجه المجاورة.',
				'**مقاطع رباعي الوجوه $ABCD$**:\n- مقطع رباعي وجوه بمستوٍ يمكن أن يكون مثلثاً (إذا قطع $3$ أوجه) أو رباعي أضلاع (إذا قطع الأوجه الأربعة).\n- إذا كان المستوي القاطع يوازي حرفين متقابلين في رباعي وجوه، فإن مقطع رباعي الوجوه هو **متوازي أضلاع**.',
				'**الحساب الشعاعي والاستوائية في الفضاء**:\n- تكون ثلاثة أشعة $\\vec{u}$، $\\vec{v}$ و $\\vec{w}$ **متحدة المستوي** إذا وفقط إذا وجد عددان حقيقيان $\\alpha$ و $\\beta$ بحيث: $\\vec{w} = \\alpha\\vec{u} + \\beta\\vec{v}$ (مع كون $\\vec{u}$ و $\\vec{v}$ غير مرتبطين خطياً).\n- تنتمي أربع نقط $A, B, C, D$ إلى نفس المستوي إذا وفقط إذا كانت الأشعة $\\vec{AB}, \\vec{AC}, \\vec{AD}$ متحدة المستوي.'
			],
			visualSvg: svgCubeSectionPlane,
			visualCaptionAr:
				'المقطع المستوي لمكعب بمستوٍ وتطبيق مبرهنة توازي خطوط الأثر على الأوجه المتوازية',
			examples: [
				{
					problemAr:
						'ليكن $ABCD$ رباعي وجوه. النقط $I, J, K, L$ هي منتصفات الأحرف $[AB], [BC], [CD], [DA]$ على الترتيب. بين أن الرباعي $IJKL$ متوازي أضلاع ومستوٍ.',
					solutionAr:
						'في المثلث $ABC$، $I$ منتصف $[AB]$ و $J$ منتصف $[BC]$، إذن حسب مبرهنة مستقيم المنتصفين: $\\vec{IJ} = \\frac{1}{2}\\vec{AC}$.\nفي المثلث $ADC$، $L$ منتصف $[AD]$ و $K$ منتصف $[CD]$، إذن: $\\vec{LK} = \\frac{1}{2}\\vec{AC}$.\nنستنتج أن $\\vec{IJ} = \\vec{LK}$.\nبما أن الشعاعين متساويان، فإن الرباعي $IJKL$ متوازي أضلاع، وبالتالي فالنقط $I, J, K, L$ تنتمي إلى نفس المستوي.'
				},
				{
					problemAr:
						'نعتبر الأشعة $\\vec{u}(1; 2; 0)$، $\\vec{v}(0; 1; 1)$ و $\\vec{w}(2; 5; 1)$. هل الأشعة $\\vec{u}, \\vec{v}, \\vec{w}$ متحدة المستوي؟',
					solutionAr:
						'نبحث عن عددين $\\alpha$ و $\\beta$ يحققان $\\vec{w} = \\alpha\\vec{u} + \\beta\\vec{v}$:\n$$\\begin{cases} \\alpha(1) + \\beta(0) = 2 \\\\ \\alpha(2) + \\beta(1) = 5 \\\\ \\alpha(0) + \\beta(1) = 1 \\end{cases}$$\nمن المعادلة الأولى نجد $\\alpha = 2$، ومن الثالثة نجد $\\beta = 1$.\nنعوض في المعادلة الثانية: $2(2) + 1(1) = 4 + 1 = 5$ (محققة).\nبما أن الجملة تقبل حلاً، فإن $\\vec{w} = 2\\vec{u} + \\vec{v}$، ومنه فالأشعة الثلاثة متحدة المستوي.'
				}
			],
			watchOutAr:
				'في إنشاء مقطع مجسم بمستوٍ، لا تقم أبداً بوصل نقطتين تقعان في وجهين مختلفين بخط مستقيم مباشر يمر داخل المجسم! يجب دوماً أن تكون أضلاع المقطع واقعة تماماً على أسطح وجوه المجسم الخارجية.'
		},
		practice: [
			{
				questionAr:
					'مقطع مكعب $ABCDEFGH$ بمستوٍ يوازي الوجه $(ABCD)$ ويقطع الحرف $[AE]$ في نقطة $M$ هو:',
				options: [
					'مربع يطابق أوجه المكعب',
					'مثلث متساوي الأضلاع',
					'مستطيل غير مربع',
					'شبه منحرف'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! أحسنت، كل مستوٍ يوازي أحد أوجه المكعب يقطع الأوجه الأربعة العمودية عليه في مقطع مربع يطابق أوجه المكعب.',
					'خطأ تشخيصي: ينتج المثلث إذا قطع المستوي ثلاثة أحرف متلاقية في رأس واحد، وليس مستوياً موازياً لأحد الأوجه.',
					'خطأ تشخيصي: أبعاد المقطع متساوية تماماً مع طول حرف المكعب، فالشكل مربع حتماً.',
					'خطأ تشخيصي: الأوجه المتقابلة متوازية والأضلاع متساوية ومتعامدة، فلا يمكن أن يكون شبه منحرف كيفي.'
				],
				explanationAr:
					'بما أن المستوي القاطع يوازي الوجه $(ABCD)$، فإنه يقطع الأوجه الجانبية الأربعة المتعامدة معه وفق خطوط توازي أضلاع المربع القاعدي وتساويها في الطول، وبالتالي فإن المقطع هو مربع مطابق تماماً لأوجه المكعب.'
			},
			{
				questionAr:
					'في رباعي الوجوه $ABCD$، إذا كانت النقطة $M$ معرفة بالعلاقة الشعاعية $\\vec{AM} = 2\\vec{AB} - 3\\vec{AC}$، فإن:',
				options: [
					'النقط $A$، $B$، $C$ و $M$ تنتمي إلى نفس المستوي',
					'المستقيم $(AM)$ يوازي المستقيم $(CD)$',
					'النقط $A$، $B$، $D$ و $M$ في استقامية',
					'الأشعة $\\vec{AM}$، $\\vec{AB}$ و $\\vec{AD}$ غير متحدة المستوي'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! أحسنت، بما أن $\\vec{AM}$ تركيب خطي للشعاعين $\\vec{AB}$ و $\\vec{AC}$، فإن النقطة $M$ تقع في مستوي المثلث $(ABC)$.',
					'خطأ تشخيصي: الشعاع $\\vec{AM}$ لا يحتوي المركبة $\\vec{AD}$ ولا يوازي $(CD)$.',
					'خطأ تشخيصي: النقطة $M$ لا تنتمي بالضرورة للمستقيم $(AB)$ لأن معامل $\\vec{AC}$ غير معدوم.',
					'خطأ تشخيصي: الأشعة $\\vec{AM}, \\vec{AB}, \\vec{AC}$ متحدة المستوي لأن $\\vec{AM}$ مركب منها مباشرة.'
				],
				explanationAr:
					'العلاقة $\\vec{AM} = 2\\vec{AB} - 3\\vec{AC}$ تبين أن الشعاع $\\vec{AM}$ هو تركيب خطي للشعاعين $\\vec{AB}$ و $\\vec{AC}$. هذا يعني أن الشعاع $\\vec{AM}$ يقع في المستوي الذي يعينه الشعاعان، أي المستوي $(ABC)$. وبالتالي فإن النقط $A, B, C, M$ تنتمي جميعاً إلى نفس المستوي.'
			},
			{
				questionAr:
					'إذا قطعنا رباعي وجوه $ABCD$ بمستوٍ يوازي في آن واحد الحرفين المتقابلين $[AB]$ و $[CD]$، فإن طبيعة المضلع الناتج عن المقطع هي:',
				options: [
					'متوازي أضلاع',
					'مثلث قائم',
					'شبه منحرف كيفي',
					'خماسي أضلاع'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! أحسنت، يقطع المستوي الأوجه الأربعة في أضلاع متوازية مثنى مثنى مع الحرفين $[AB]$ و $[CD]$، فيكون المقطع متوازي أضلاع.',
					'خطأ تشخيصي: المقطع يقطع الأوجه الأربعة، فلا يمكن أن يكون مثلثاً ذو ثلاثة أضلاع.',
					'خطأ تشخيصي: بما أن المستوي يوازي الحرفين معاً، فإن كل زوج من الأضلاع المتقابلة متوازيان، مما يجعله متوازي أضلاع وليس مجرد شبه منحرف.',
					'خطأ تشخيصي: رباعي الوجوه يملك $4$ أوجه فقط، فلا يمكن لأي مقطع مستوٍ أن يملك أكثر من $4$ أضلاع.'
				],
				explanationAr:
					'بما أن المستوي القاطع يوازي المستقيم $(AB)$، فإن خطي تقاطعه مع الوجهين $(ABC)$ و $(ABD)$ يوازيان $(AB)$. وبما أنه يوازي أيضاً المستقيم $(CD)$، فإن خطي تقاطعه مع الوجهين $(ACD)$ و $(BCD)$ يوازيان $(CD)$. إذن كل ضلعين متقابلين في المضلع الرباعي متوازيان، فالشكل الناتج هو متوازي أضلاع.'
			}
		]
	},

	// [7] lesson_2as_tm_t3_analytic_space_geometry_planes_lines_surfaces_of_revolution (STREAM EXCLUSIVE)
	{
		id: 'lesson_2as_tm_t3_analytic_space_geometry_planes_lines_surfaces_of_revolution',
		slug: '2as-tm-t3-analytic-space-geometry-planes-lines-surfaces-of-revolution',
		grade: '2as_tm',
		yearSubjectId: 712,
		trimesterId: 't3',
		sequenceId: 'seq9',
		sequenceTitleAr: 'المقطع التاسع: الهندسة التحليلية في الفضاء وسطوح مجسمات الدوران',
		order: 7,
		titleAr: 'الهندسة التحليلية في الفضاء: معادلات المستويات والمستقيمات، سطوح مجسمات الدوران (الكرة والأسطوانة والمخروط)',
		objectives: [
			'التمكن من المعلم الفضائي وحساب المركبات والأطوال وإحداثيات منتصف قطعة مستقيم والمسافة بين نقطتين',
			'تعيين معادلات المستقيمات الموجهة والمستويات الموازية للمستويات الإحداثية والمستويات الخاصة',
			'تعيين معادلات أسطح مجسمات الدوران: سطح الكرة، الأسطوانة الدورانية التي محورها أحد المحاور، والمخروط الدوراني الذي رأسه المبدأ',
			'دراسة تقاطع المجسمات الدورانية مع المستويات الإحداثية وحل مسائل تقنية وهندسية شاملة لختام السنة'
		],
		keywordsAr: [
			'الهندسة التحليلية في الفضاء',
			'المسافة بين نقطتين',
			'معادلات المستويات والمستقيمات',
			'سطح الكرة',
			'الأسطوانة الدورانية',
			'المخروط الدوراني'
		],
		discover: {
			scenarioAr:
				'في برمجيات التصميم الميكانيكي ثلاثي الأبعاد (CAD)، تُعرف الأشكال الهندسية بمعادلاتها الديكارتية في معلم متعامد ومتجانس $(O; \\vec{i}, \\vec{j}, \\vec{k})$. نريد نمذجة ثلاثة عناصر لقطعة صناعية مركبة: تجويف كروي مركزه $\\Omega(1, -2, 3)$ ونصف قطره $R = 5$، أسطوانة دورانية محورها محور الرواسم $(Oz)$ ونصف قطرها $R = 4$، ومخروط دوراني رأسه المبدأ $O$ ومحوره $(Oz)$. نريد استخراج معادلاتها التحليلية ودراسة مقاطعها المستوية.',
			svg: svgSurfacesOfRevolution3D,
			steps: [
				{
					promptAr:
						'النقطة $M(x, y, z)$ تنتمي إلى سطح الكرة ذات المركز $\\Omega(1, -2, 3)$ ونصف القطر $R = 5$ إذا وفقط إذا كانت المسافة $\\Omega M = 5$. اكتب المعادلة الديكارتية لسطح الكرة.',
					hintAr: 'المسافة في الفضاء: $\\Omega M^2 = (x - x_0)^2 + (y - y_0)^2 + (z - z_0)^2 = R^2$.',
					expectedInput: '(x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 25',
					revealAr:
						'المعادلة الديكارتية لسطح الكرة هي:\n$$(x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 25$$'
				},
				{
					promptAr:
						'في أسطوانة دورانية محور دورانها هو المحور $(Oz)$ ونصف قطرها $R = 4$، ما هو شرط إحداثيات النقطة $M(x, y, z)$ لكي تنتمي لسطح هذه الأسطوانة؟',
					hintAr: 'بعد النقطة $M$ عن المحور $(Oz)$ هو المسافة في المستوي الأفقي $\\sqrt{x^2 + y^2}$.',
					expectedInput: 'x^2 + y^2 = 16',
					revealAr:
						'بعد النقطة $M(x, y, z)$ عن المحور $(Oz)$ هو $\\sqrt{x^2 + y^2}$. وبما أن نصف القطر ثابت ويساوي $4$، فإن المعادلة هي: $x^2 + y^2 = 16$ مع أخذ $z$ أي قيمة حقيقية.'
				},
				{
					promptAr:
						'عين طبيعة تقاطع الأسطوانة $x^2 + y^2 = 16$ مع المستوي الأفقي ذي المعادلة $z = 2$.',
					hintAr: 'عوض $z = 2$ في جملة المعادلتين للأسطوانة والمستوي.',
					expectedInput: 'دائرة',
					revealAr:
						'تقاطع الأسطوانة مع المستوي $z = 2$ هو الدائرة التي مركزها النقطة $(0, 0, 2)$ ونصف قطرها $R = 4$ والواقعة في المستوي الأفقي $z = 2$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**المسافة وإحداثيات نقطة وشعاع في الفضاء**:\n- المسافة بين نقطتين $A(x_A, y_A, z_A)$ و $B(x_B, y_B, z_B)$:\n$$AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2 + (z_B - z_A)^2}$$\n- إحداثيات منتصف القطعة $[AB]$ هي: $I\\left(\\frac{x_A+x_B}{2}; \\frac{y_A+y_B}{2}; \\frac{z_A+z_B}{2}\\right)$.',
				'**المستويات الإحداثية والمستقيمات في الفضاء**:\n- المستوي $(Oxy)$ معادلته $z = 0$، والمستوي الموازي له عند الارتفاع $h$ معادلته $z = h$.\n- المستوي $(Oxz)$ معادلته $y = 0$، والمستوي $(Oyz)$ معادلته $x = 0$.\n- التمثيل الوسيطي لمستقيم يشمل $A(x_0, y_0, z_0)$ وموجه بالشعاع $\\vec{u}(a, b, c)$:\n$$\\begin{cases} x = x_0 + a t \\\\ y = y_0 + b t \\\\ z = z_0 + c t \\end{cases} \\quad (t \\in \\mathbb{R})$$',
				'**معادلات سطوح مجسمات الدوران (Surfaces of Revolution)**:\n- **سطح الكرة (Sphere)**: مركزها $\\Omega(x_0, y_0, z_0)$ ونصف قطرها $R$:\n$$(x - x_0)^2 + (y - y_0)^2 + (z - z_0)^2 = R^2$$\n- **الأسطوانة الدورانية (Circular Cylinder)**: محورها $(Oz)$ ونصف قطرها $R$:\n$$x^2 + y^2 = R^2 \\quad (z \\in \\mathbb{R})$$\n- **المخروط الدوراني (Circular Cone)**: رأسه المبدأ $O(0,0,0)$ ومحوره $(Oz)$ ونصف زاوية رأسه $\\alpha$:\n$$x^2 + y^2 = (\\tan\\alpha)^2 \\cdot z^2$$'
			],
			visualSvg: svgSurfacesOfRevolution3D,
			visualCaptionAr:
				'المعادلات التحليلية لسطوح مجسمات الدوران: الكرة والأسطوانة والمخروط في الفضاء',
			examples: [
				{
					problemAr:
						'عين طبيعة وعناصر مجموعة النقط $M(x, y, z)$ المعرفة بالمعادلة: $x^2 + y^2 + z^2 - 2x + 4y - 6z - 11 = 0$.',
					solutionAr:
						'نكتب العبارة بالشكل النموذجي:\n$$(x - 1)^2 - 1 + (y + 2)^2 - 4 + (z - 3)^2 - 9 - 11 = 0$$\n$$(x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 25 = 5^2$$\nإذن مجموعة النقط هي سطح كرة مركزها النقطة $\\Omega(1; -2; 3)$ ونصف قطرها $R = \\sqrt{25} = 5$.'
				},
				{
					problemAr:
						'أوجد معادلة المخروط الدوراني الذي رأسه المبدأ $O(0,0,0)$ ومحوره محور الرواسم $(Oz)$ ونصف زاوية رأسه $\\alpha = 45^\\circ$.',
					solutionAr:
						'بما أن نصف زاوية الرأس هي $\\alpha = 45^\\circ$، فإن $\\tan\\alpha = \\tan(45^\\circ) = 1$.\nتطبيق معادلة المخروط الدوراني ذي الرأس $O$ والمحور $(Oz)$:\n$$x^2 + y^2 = (\\tan\\alpha)^2 z^2 \\iff x^2 + y^2 = (1)^2 z^2 \\iff x^2 + y^2 = z^2$$.'
				}
			],
			watchOutAr:
				'في الفضاء ثلاثي الأبعاد، المعادلة $x^2 + y^2 = R^2$ تمثل أسطوانة دورانية كاملة تمتد على طول المحور $z$ وليس مجرد دائرة! لكي تمثل دائرة، يجب تحديد مستوٍ يقطعها، فتكون الدائرة معرفة بجملة معادلتين: $\\begin{cases} x^2 + y^2 = R^2 \\\\ z = z_0 \\end{cases}$.'
		},
		practice: [
			{
				questionAr:
					'مجموعة النقط $M(x, y, z)$ من الفضاء التي تحقق المعادلة $x^2 + y^2 + z^2 - 2x + 4y - 6z - 11 = 0$ هي:',
				options: [
					'سطح كرة مركزها $\\Omega(1; -2; 3)$ ونصف قطرها $R = 5$',
					'سطح كرة مركزها $\\Omega(-1; 2; -3)$ ونصف قطرها $R = 5$',
					'سطح كرة مركزها $\\Omega(1; -2; 3)$ ونصف قطرها $R = 25$',
					'المجموعة الخالية $\\emptyset$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! أحسنت، بإتمام المربعات نجد $(x-1)^2 + (y+2)^2 + (z-3)^2 = 25$، فالمركز $\\Omega(1; -2; 3)$ ونصف القطر $R = 5$.',
					'خطأ تشخيصي: عكست إشارات إحداثيات المركز: $(x - x_0)^2$ يعطي $x_0 = 1$ وليس $-1$.',
					'خطأ تشخيصي: القيمة $25$ هي $R^2$، ونصف القطر هو الجذر التربيعي $R = \\sqrt{25} = 5$.',
					'خطأ تشخيصي: الطرف الأيمن بعد إتمام المربعات موجب تماماً ($25 > 0$)، فالكرة موجودة وحقيقية وليست خالية.'
				],
				explanationAr:
					'نتمم المربعات لكل متغير:\n$$(x^2 - 2x) + (y^2 + 4y) + (z^2 - 6z) = 11$$\n$$(x - 1)^2 - 1 + (y + 2)^2 - 4 + (z - 3)^2 - 9 = 11$$\n$$(x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 11 + 14 = 25 = 5^2$$\nهذه معادلة سطح كرة مركزها $\\Omega(1; -2; 3)$ ونصف قطرها $R = 5$.'
			},
			{
				questionAr:
					'المعادلة الديكارتية لأسطوانة دورانية محورها محور الرواسم $(Oz)$ ونصف قطر قاعدتها $R = 4$ هي:',
				options: [
					'$x^2 + y^2 = 16$',
					'$x^2 + z^2 = 16$',
					'$x^2 + y^2 + z^2 = 16$',
					'$y^2 + z^2 = 4$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! أحسنت، المسافة عن المحور $(Oz)$ هي $\\sqrt{x^2+y^2} = 4 \\iff x^2+y^2=16$ مع $z \\in \\mathbb{R}$.',
					'خطأ تشخيصي: المعادلة $x^2 + z^2 = 16$ تمثل أسطوانة دورانية محورها $(Oy)$ وليس $(Oz)$.',
					'خطأ تشخيصي: المعادلة $x^2 + y^2 + z^2 = 16$ تمثل سطح كرة مركزها المبدأ وليست أسطوانة دورانية.',
					'خطأ تشخيصي: هذه أسطوانة محورها $(Ox)$ ونصف قطرها $2$ وليس $4$.'
				],
				explanationAr:
					'النقطة $M(x, y, z)$ تنتمي إلى الأسطوانة الدورانية التي محورها $(Oz)$ ونصف قطرها $R = 4$ إذا وفقط إذا كان بعدها عن المحور $(Oz)$ يساوي $4$. بما أن هذا البعد هو $\\sqrt{x^2 + y^2}$، فإن بتربيع الطرفين نجد: $x^2 + y^2 = 4^2 = 16$.'
			},
			{
				questionAr:
					'المعادلة $x^2 + y^2 = 3 z^2$ في معلم متعامد ومتجانس تمثل سطح مخروط دوراني رأسه المبدأ $O$ ومحوره $(Oz)$. نصف زاوية رأسه $\\alpha$ تحقق $\\tan\\alpha = \\sqrt{3}$، أي أن $\\alpha$ تساوي:',
				options: [
					'$\\frac{\\pi}{3}\\text{ rad}$ ($60^\\circ$)',
					'$\\frac{\\pi}{6}\\text{ rad}$ ($30^\\circ$)',
					'$\\frac{\\pi}{4}\\text{ rad}$ ($45^\\circ$)',
					'$\\frac{\\pi}{2}\\text{ rad}$ ($90^\\circ$)'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! أحسنت، $(\\tan\\alpha)^2 = 3 \\implies \\tan\\alpha = \\sqrt{3}$ (لأن $\\alpha$ زاوية حادة)، والزاوية الشهيرة هي $\\alpha = \\frac{\\pi}{3}\\text{ rad}$ ($60^\\circ$).',
					'خطأ تشخيصي: الزاوية $\\frac{\\pi}{6}$ ظلها هو $\\frac{1}{\\sqrt{3}}$ وليس $\\sqrt{3}$.',
					'خطأ تشخيصي: الزاوية $\\frac{\\pi}{4}$ ظلها هو $1$.',
					'خطأ تشخيصي: الزاوية $\\frac{\\pi}{2}$ ظلها غير معرف ومستحيل لمخروط دوراني.'
				],
				explanationAr:
					'معادلة المخروط الدوراني الذي رأسه المبدأ ومحوره $(Oz)$ هي: $x^2 + y^2 = (\\tan\\alpha)^2 z^2$.\nبالمطابقة مع $x^2 + y^2 = 3z^2$ نجد:\n$$(\\tan\\alpha)^2 = 3 \\implies \\tan\\alpha = \\sqrt{3}$$\nبما أن $\\alpha \\in \\left]0; \\frac{\\pi}{2}\\right[$، فإن: $\\alpha = \\frac{\\pi}{3}\\text{ rad} = 60^\\circ$.'
			}
		]
	}
];
