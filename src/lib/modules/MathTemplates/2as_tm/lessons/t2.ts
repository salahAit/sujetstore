import type { InteractiveLessonData } from '../../types';
import { adaptLessonForTrack } from '../../types';
import { SHARED_LESSONS_2AS_T2 } from '../../secondary_shared_2as/lessons/t2';

// ============================================================================
// SVG Visual Helpers for 2AS TM Trimester 2
// ============================================================================

const svgPhasorFresnel = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 220" width="440" height="220" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">
  <rect x="10" y="10" width="420" height="200" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="220" y="30" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">تمثيل المتجهات (فرينل): a cos(x) + b sin(x) = r cos(x - φ)</text>
  <!-- Axes -->
  <line x1="50" y1="150" x2="390" y2="150" stroke="#64748b" stroke-width="1.5"/>
  <line x1="120" y1="190" x2="120" y2="40" stroke="#64748b" stroke-width="1.5"/>
  <text x="380" y="142" font-size="11" font-weight="bold" fill="#64748b">x</text>
  <text x="126" y="50" font-size="11" font-weight="bold" fill="#64748b">y</text>
  
  <!-- Right triangle: a = sqrt(3) -> 150 px, b = 1 -> 86 px -->
  <line x1="120" y1="150" x2="270" y2="150" stroke="#2563eb" stroke-width="2.5"/>
  <text x="195" y="168" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#2563eb">a = √3</text>
  
  <line x1="270" y1="150" x2="270" y2="64" stroke="#16a34a" stroke-width="2.5"/>
  <text x="295" y="110" font-size="11.5" font-weight="bold" fill="#16a34a">b = 1</text>
  
  <!-- Hypotenuse Vector r -->
  <line x1="120" y1="150" x2="270" y2="64" stroke="#dc2626" stroke-width="3"/>
  <circle cx="270" cy="64" r="4.5" fill="#dc2626"/>
  <text x="175" y="98" font-size="12" font-weight="bold" fill="#dc2626">r = √(a² + b²) = 2</text>
  
  <!-- Angle phi arc -->
  <path d="M 160,150 A 40,40 0 0,0 155,130" fill="none" stroke="#d97706" stroke-width="2"/>
  <text x="170" y="140" font-size="11.5" font-weight="bold" fill="#d97706">φ = π/6</text>
  
  <!-- Summary Box -->
  <rect x="250" y="155" width="165" height="42" rx="4" fill="#fef2f2" stroke="#fca5a5"/>
  <text x="332" y="172" text-anchor="middle" font-size="11" font-weight="bold" fill="#991b1b">السعة: r = 2</text>
  <text x="332" y="188" text-anchor="middle" font-size="11" font-weight="bold" fill="#991b1b">فرق الطور: φ = π/6</text>
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
// LESSONS 2AS TM - TRIMESTER 2 (7 Lessons)
// ============================================================================

export const LESSONS_2AS_TM_T2: InteractiveLessonData[] = [
	// [1] lesson_2as_tm_t2_limits_asymptotes_horizontal_vertical
	adaptShared(
		SHARED_LESSONS_2AS_T2[0],
		't2_limits_asymptotes_horizontal_vertical',
		{
			order: 1,
			sequenceId: 'seq4',
			sequenceTitleAr: 'المقطع الرابع: النهايات والسلوك التقاربي لمنحنيات الدوال',
			titleAr: 'النهايات والسلوك التقاربي: النهايات عند الحدود، المستقيمات المقاربة الأفقية والعمودية',
			objectives: [
				'حساب نهايات الدوال العددية عند أطراف مجالات تعريفها وتفسير السلوك التقاربي للمنحنى بيانيا',
				'تعيين معادلات المستقيمات المقاربة الموازية لمحوري الإحداثيات وتفسيرها هندسيا وفيزيائيا كحالات استقرار',
				'تطبيق نظريات العمليات على النهايات بدقة وتبرير القواعد الحسابية في مجموع وجداء وحاصل قسمة الدوال'
			],
			keywordsAr: [
				'النهايات عند الحدود',
				'المستقيم المقارب الأفقي',
				'المستقيم المقارب العمودي',
				'السلوك التقاربي',
				'العمليات على النهايات'
			]
		}
	),

	// [2] lesson_2as_tm_t2_limits_indeterminate_forms_oblique_asymptotes
	adaptShared(
		SHARED_LESSONS_2AS_T2[1],
		't2_limits_indeterminate_forms_oblique_asymptotes',
		{
			order: 2,
			sequenceId: 'seq4',
			sequenceTitleAr: 'المقطع الرابع: النهايات والسلوك التقاربي لمنحنيات الدوال',
			titleAr: 'حالات عدم التعيين، تقنيات الإزالة، المستقيم المقارب المائل، والوضع النسبي',
			objectives: [
				'التحكم في تقنيات إزالة حالات عدم التعيين باستعمال المرافق والتحليل والاختزال',
				'البحث عن المستقيم المقارب المائل وتعيين معادلته y = ax + b وطريقة إيجاد الثوابت الحسابية في الدوال الناطقة',
				'دراسة الوضع النسبي لمنحنى دالة بالنسبة لمستقيم مقارب وتفسير نقاط التقاطع بيانياً',
				'التعرف على التفسير البياني لدوال غير قابلة للاشتقاق وظهور أنصاف المماسات العمودية'
			],
			keywordsAr: [
				'حالات عدم التعيين',
				'المستقيم المقارب المائل',
				'الوضع النسبي',
				'طريقة المرافق',
				'إيجاد الثوابت'
			]
		}
	),

	// [3] lesson_2as_tm_t2_oriented_angles_trig_circle_radian
	adaptShared(
		SHARED_LESSONS_2AS_T2[2],
		't2_oriented_angles_trig_circle_radian',
		{
			order: 3,
			sequenceId: 'seq5',
			sequenceTitleAr: 'المقطع الخامس: الزوايا الموجهة وحساب المثلثات وتطبيقاتها الخطية',
			titleAr: 'الزوايا الموجهة وحساب المثلثات: الراديان، الدائرة المثلثية، خواص الزوايا الموجهة والأقياس الرئيسية',
			objectives: [
				'التمكن من الدائرة المثلثية والقراءة المباشرة للجيب وجيب التمام والظل للزوايا الشهيرة والمرفقة',
				'تعيين الأقياس المختلفة والقياس الرئيسي لزاوية موجهة واستعمال علاقة شال للزوايا الموجهة',
				'توظيف خواص الزوايا الموجهة لإثبات تقايس الزوايا وتوازي وتعامد الأشعة في الأشكال الميكانيكية والهندسية'
			],
			keywordsAr: [
				'الراديان',
				'الدائرة المثلثية',
				'الزاوية الموجهة لشعاعين',
				'القياس الرئيسي',
				'علاقة شال'
			]
		}
	),

	// [4] lesson_2as_tm_t2_trigonometry_transformation_formulas_linear_equations (STREAM EXCLUSIVE)
	{
		id: 'lesson_2as_tm_t2_trigonometry_transformation_formulas_linear_equations',
		slug: '2as-tm-t2-trigonometry-transformation-formulas-linear-equations',
		grade: '2as_tm',
		yearSubjectId: 712,
		trimesterId: 't2',
		sequenceId: 'seq5',
		sequenceTitleAr: 'المقطع الخامس: الزوايا الموجهة وحساب المثلثات وتطبيقاتها الخطية',
		order: 4,
		titleAr: 'حساب المثلثات: دساتير التحويل، تحويل العبارة a cos x + b sin x، وحل المعادلات والمتراجحات',
		objectives: [
			'توظيف دساتير الجمع والضعف في تبسيط عبارات مثلثية وإثبات متطابقات مثلثية مركبة',
			'تحويل العبارة الخطية a cos x + b sin x إلى الشكل r cos(x - φ) حيث r = √(a²+b²)',
			'حل المعادلة a cos x + b sin x = c والمتراجحات المرتبطة بها في التطبيقات الكهربائية والميكانيكية (التيار المتناوب والاهتزازات)',
			'حل متراجحات مثلثية وتحديد المجالات الحلولية بدقة على الدائرة المثلثية'
		],
		keywordsAr: [
			'دساتير التحويل',
			'تحويل a cos x + b sin x',
			'المعادلات المثلثية الخطية',
			'الطور والسعة (التيار المتناوب)',
			'المتراجحات المثلثية'
		],
		discover: {
			scenarioAr:
				'في الهندسة الكهربائية وهندسة الطرائق، يُعبر عن التوتر المتناوب الجيبي اللحظي لدائرة كهربائية بالعبارة: $u(t) = \\sqrt{3}\\cos(\\omega t) + \\sin(\\omega t)$ (بالفولط). نريد تحويل هذه العبارة الخطية إلى الشكل الجيبي البسيط $u(t) = r\\cos(\\omega t - \\varphi)$ لتحديد السعة العظمى $r$ وزاوية الطور الابتدائية $\\varphi$، ثم حل المعادلة $u(t) = 1$ لإيجاد اللحظات الزمنية التي يبلغ فيها التوتر $1\\text{ V}$.',
			svg: svgPhasorFresnel,
			steps: [
				{
					promptAr:
						'احسب السعة العظمى $r = \\sqrt{a^2 + b^2}$ حيث $a = \\sqrt{3}$ و $b = 1$.',
					hintAr: 'احسب $(\\sqrt{3})^2 + 1^2$ ثم استخرج الجذر التربيعي.',
					expectedInput: '2',
					revealAr:
						'لدينا $r = \\sqrt{(\\sqrt{3})^2 + 1^2} = \\sqrt{3 + 1} = \\sqrt{4} = 2$. إذن سعة التوتر الأعظمي هي $U_{\\max} = 2\\text{ V}$.'
				},
				{
					promptAr:
						'عين زاوية الطور $\\varphi \\in ]-\\pi; \\pi]$ بحيث $\\cos\\varphi = \\frac{a}{r} = \\frac{\\sqrt{3}}{2}$ و $\\sin\\varphi = \\frac{b}{r} = \\frac{1}{2}$.',
					hintAr:
						'ما هي الزاوية الشهيرة في الربع الأول التي جيب تمامها $\\frac{\\sqrt{3}}{2}$ وجيبها $\\frac{1}{2}$؟',
					expectedInput: 'pi/6',
					revealAr:
						'الزاوية الشهيرة التي تحقق $\\cos\\varphi = \\frac{\\sqrt{3}}{2}$ و $\\sin\\varphi = \\frac{1}{2}$ هي $\\varphi = \\frac{\\pi}{6}\\text{ rad}$ ($30^\\circ$).\nوبالتالي تُكتب العبارة:\n$$u(t) = 2\\left(\\frac{\\sqrt{3}}{2}\\cos(\\omega t) + \\frac{1}{2}\\sin(\\omega t)\\right) = 2\\cos\\left(\\omega t - \\frac{\\pi}{6}\\right)$$'
				},
				{
					promptAr:
						'حل المعادلة $2\\cos\\left(\\omega t - \\frac{\\pi}{6}\\right) = 1$ في المجال $[0; 2\\pi[$ بوضع $X = \\omega t$.',
					hintAr:
						'اقسم الطرفين على $2$ لتحصل على $\\cos\\left(X - \\frac{\\pi}{6}\\right) = \\frac{1}{2} = \\cos\\frac{\\pi}{3}$.',
					revealAr:
						'لدينا $\\cos\\left(X - \\frac{\\pi}{6}\\right) = \\frac{1}{2} = \\cos\\frac{\\pi}{3}$:\n- إما $X - \\frac{\\pi}{6} = \\frac{\\pi}{3} \\implies X = \\frac{\\pi}{6} + \\frac{\\pi}{3} = \\frac{\\pi}{2}$.\n- أو $X - \\frac{\\pi}{6} = -\\frac{\\pi}{3} \\implies X = \\frac{\\pi}{6} - \\frac{\\pi}{3} = -\\frac{\\pi}{6} \\equiv \\frac{11\\pi}{6}$.\nإذن حلول المعادلة في $[0; 2\\pi[$ هي: $X \\in \\left\\{\\frac{\\pi}{2}; \\frac{11\\pi}{6}\\right\\}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**دساتير الجمع والتحويل المثلثية الأساسية**:\n- $\\cos(a - b) = \\cos a \\cos b + \\sin a \\sin b$\n- $\\cos(a + b) = \\cos a \\cos b - \\sin a \\sin b$\n- $\\sin(a + b) = \\sin a \\cos b + \\cos a \\sin b$\n- $\\sin(a - b) = \\sin a \\cos b - \\cos a \\sin b$\n- دساتير الضعف: $\\cos(2a) = 2\\cos^2 a - 1 = 1 - 2\\sin^2 a$ و $\\sin(2a) = 2\\sin a \\cos a$',
				'**تحويل العبارة الخطية $a\\cos x + b\\sin x$**:\nمن أجل كل عددين حقيقيين $a$ و $b$ غير معدومين معاً، نضع $r = \\sqrt{a^2 + b^2}$. يوجد عدد حقيقي وحيد $\\varphi \\in ]-\\pi; \\pi]$ يحقق:\n$$\\cos\\varphi = \\frac{a}{r}, \\quad \\sin\\varphi = \\frac{b}{r}$$\nوتُكتب العبارة بالشكل المبسط:\n$$a\\cos x + b\\sin x = r\\cos(x - \\varphi)$$',
				'**حل المعادلة المثلثية الخطية $a\\cos x + b\\sin x = c$**:\nبالقسمة على $r = \\sqrt{a^2 + b^2}$ تؤول المعادلة إلى: $\\cos(x - \\varphi) = \\frac{c}{r}$.\n- إذا كان $c^2 > a^2 + b^2$، فإن المعادلة **مستحيلة الحل** في $\\mathbb{R}$ لأن $\\left|\\frac{c}{r}\\right| > 1$.\n- إذا كان $c^2 \\le a^2 + b^2$، نضع $\\cos\\alpha = \\frac{c}{r}$، فتكون الحلول:\n$$x - \\varphi = \\alpha + 2k\\pi \\quad \\text{or} \\quad x - \\varphi = -\\alpha + 2k\\pi \\quad (k \\in \\mathbb{Z})$$'
			],
			visualSvg: svgPhasorFresnel,
			visualCaptionAr:
				'تمثيل فرينل لتحويل العبارة الخطية $\\sqrt{3}\\cos x + \\sin x = 2\\cos\\left(x - \\frac{\\pi}{6}\\right)$',
			examples: [
				{
					problemAr:
						'حل في المجال $]-\\pi; \\pi]$ المعادلة: $\\cos x - \\sin x = \\sqrt{2}$.',
					solutionAr:
						'لدينا $a = 1$ و $b = -1$. إذن $r = \\sqrt{1^2 + (-1)^2} = \\sqrt{2}$.\nنعين $\\varphi$: $\\cos\\varphi = \\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}$ و $\\sin\\varphi = -\\frac{1}{\\sqrt{2}} = -\\frac{\\sqrt{2}}{2} \\implies \\varphi = -\\frac{\\pi}{4}$.\nتتحول المعادلة إلى:\n$$\\sqrt{2}\\cos\\left(x - \\left(-\\frac{\\pi}{4}\\right)\\right) = \\sqrt{2} \\iff \\cos\\left(x + \\frac{\\pi}{4}\\right) = 1$$\nالحلول: $x + \\frac{\\pi}{4} = 2k\\pi \\implies x = -\\frac{\\pi}{4} + 2k\\pi$.\nفي المجال $]-\\pi; \\pi]$، الحل الوحيد هو: $S = \\left\\{-\\frac{\\pi}{4}\\right\\}$.'
				},
				{
					problemAr:
						'حل في المجال $[0; 2\\pi[$ المتراجحة المثلثية: $2\\sin(2x) - \\sqrt{3} \\ge 0$.',
					solutionAr:
						'تؤول المتراجحة إلى: $\\sin(2x) \\ge \\frac{\\sqrt{3}}{2} = \\sin\\frac{\\pi}{3}$.\nعلى الدائرة المثلثية، يكون الجيب أكبر من أو يساوي $\\frac{\\sqrt{3}}{2}$ عندما ينتمي القوس إلى $\\left[\\frac{\\pi}{3}; \\frac{2\\pi}{3}\\right]$ دورياً:\n$$\\frac{\\pi}{3} + 2k\\pi \\le 2x \\le \\frac{2\\pi}{3} + 2k\\pi \\iff \\frac{\\pi}{6} + k\\pi \\le x \\le \\frac{\\pi}{3} + k\\pi$$\n- من أجل $k = 0$: $x \\in \\left[\\frac{\\pi}{6}; \\frac{\\pi}{3}\\right]$.\n- من أجل $k = 1$: $x \\in \\left[\\frac{7\\pi}{6}; \\frac{4\\pi}{3}\\right]$.\nإذن: $S = \\left[\\frac{\\pi}{6}; \\frac{\\pi}{3}\\right] \\cup \\left[\\frac{7\\pi}{6}; \\frac{4\\pi}{3}\\right]$.'
				}
			],
			watchOutAr:
				'قبل الشروع في حل المعادلة $a\\cos x + b\\sin x = c$، تحقق دوماً من شرط وجود الحلول: $c^2 \\le a^2 + b^2$! إذا كان $|c| > \\sqrt{a^2 + b^2}$، فإن المعادلة لا تقبل أي حل في $\\mathbb{R}$ لأن جيب التمام محصور دوماً بين $-1$ و $1$.'
		},
		practice: [
			{
				questionAr:
					'تحويل العبارة $\\sqrt{3}\\cos x - \\sin x$ إلى الشكل $r \\cos(x - \\varphi)$ يعطي:',
				options: [
					'$2\\cos\\left(x + \\frac{\\pi}{6}\\right)$',
					'$2\\cos\\left(x - \\frac{\\pi}{6}\\right)$',
					'$\\sqrt{2}\\cos\\left(x + \\frac{\\pi}{4}\\right)$',
					'$2\\sin\\left(x + \\frac{\\pi}{3}\\right)$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! أحسنت، $r = 2$ والزاوية $\\varphi = -\\frac{\\pi}{6}$ لأن $\\cos\\varphi = \\frac{\\sqrt{3}}{2}$ و $\\sin\\varphi = -\\frac{1}{2}$، ومنه $x - \\varphi = x + \\frac{\\pi}{6}$.',
					'خطأ تشخيصي: أهملت إشارة الناقص في معامل الجيب: $b = -1$ يجعل الزاوية في الربع الرابع $\\varphi = -\\frac{\\pi}{6}$.',
					'خطأ تشخيصي: السعة هي $\\sqrt{(\\sqrt{3})^2 + (-1)^2} = \\sqrt{4} = 2$ وليست $\\sqrt{2}$.',
					'خطأ تشخيصي: التحويل المطلوب هو بدلالة جيب التمام $r\\cos(x-\\varphi)$ وليس الجيب.'
				],
				explanationAr:
					'لدينا $a = \\sqrt{3}$ و $b = -1$:\n- السعة: $r = \\sqrt{(\\sqrt{3})^2 + (-1)^2} = \\sqrt{3 + 1} = 2$.\n- الزاوية $\\varphi$: $\\cos\\varphi = \\frac{\\sqrt{3}}{2}$ و $\\sin\\varphi = -\\frac{1}{2} \\implies \\varphi = -\\frac{\\pi}{6}$.\nإذن: $\\sqrt{3}\\cos x - \\sin x = 2\\cos\\left(x - \\left(-\\frac{\\pi}{6}\\right)\\right) = 2\\cos\\left(x + \\frac{\\pi}{6}\\right)$.'
			},
			{
				questionAr:
					'المعادلة $\\cos x + \\sqrt{3}\\sin x = m$ تقبل حلولاً في $\\mathbb{R}$ إذا وفقط إذا كان الوسيط الحقيقي $m$ ينتمي إلى:',
				options: [
					'$[-2; 2]$',
					'$[-4; 4]$',
					'$[-1; 1]$',
					'$]-\\infty; 2]$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! أحسنت، السعة هي $r = \\sqrt{1 + 3} = 2$، وشرط وجود الحلول هو $|m| \\le r \\iff m \\in [-2; 2]$.',
					'خطأ تشخيصي: قمت بتربيع السعة $r^2 = 4$ بدلاً من أخذ السعة نفسها $r = 2$.',
					'خطأ تشخيصي: هذا شرط حل $\\cos x = m$ البسيطة، بينما هنا العبارة مضروبة في السعة $r = 2$.',
					'خطأ تشخيصي: قيمة جيب التمام محدودة من الأسفل أيضاً بـ $-1$، فلا يمكن أن يمتد المجال إلى $-\\infty$.'
				],
				explanationAr:
					'نحول الطرف الأيسر: $a = 1, b = \\sqrt{3} \\implies r = \\sqrt{1^2 + (\\sqrt{3})^2} = 2$.\nتصبح المعادلة: $2\\cos\\left(x - \\frac{\\pi}{3}\\right) = m \\iff \\cos\\left(x - \\frac{\\pi}{3}\\right) = \\frac{m}{2}$.\nتقبل المعادلة حلولاً في $\\mathbb{R}$ إذا وفقط إذا كان:\n$$-1 \\le \\frac{m}{2} \\le 1 \\iff -2 \\le m \\le 2 \\iff m \\in [-2; 2]$$.'
			},
			{
				questionAr:
					'حلول المعادلة $\\cos x + \\sin x = \\sqrt{2}$ في المجال $[0; 2\\pi[$ هي:',
				options: [
					'$\\left\\{\\frac{\\pi}{4}\\right\\}$',
					'$\\left\\{\\frac{\\pi}{4}; \\frac{3\\pi}{4}\\right\\}$',
					'$\\left\\{-\\frac{\\pi}{4}; \\frac{\\pi}{4}\\right\\}$',
					'$\\emptyset$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! أحسنت، $\\cos x + \\sin x = \\sqrt{2}\\cos\\left(x - \\frac{\\pi}{4}\\right) = \\sqrt{2} \\iff \\cos\\left(x - \\frac{\\pi}{4}\\right) = 1 \\iff x = \\frac{\\pi}{4}$.',
					'خطأ تشخيصي: القيمة $\\frac{3\\pi}{4}$ تعطي $\\cos\\frac{3\\pi}{4} + \\sin\\frac{3\\pi}{4} = -\\frac{\\sqrt{2}}{2} + \\frac{\\sqrt{2}}{2} = 0 \\neq \\sqrt{2}$.',
					'خطأ تشخيصي: الزاوية $-\\frac{\\pi}{4}$ لا تنتمي إلى المجال المعطى $[0; 2\\pi[$.',
					'خطأ تشخيصي: المعادلة تقبل حلاً لأن الطرف الأيمن $\\sqrt{2}$ يساوي تماماً السعة $r = \\sqrt{1^2 + 1^2} = \\sqrt{2}$.'
				],
				explanationAr:
					'نحول العبارة: $\\cos x + \\sin x = \\sqrt{2}\\left(\\frac{\\sqrt{2}}{2}\\cos x + \\frac{\\sqrt{2}}{2}\\sin x\\right) = \\sqrt{2}\\cos\\left(x - \\frac{\\pi}{4}\\right)$.\nالمعادلة تصبح:\n$$\\sqrt{2}\\cos\\left(x - \\frac{\\pi}{4}\\right) = \\sqrt{2} \\iff \\cos\\left(x - \\frac{\\pi}{4}\\right) = 1$$\nالحل العام: $x - \\frac{\\pi}{4} = 2k\\pi \\iff x = \\frac{\\pi}{4} + 2k\\pi$.\nفي المجال $[0; 2\\pi[$، الحل الوحيد هو $x = \\frac{\\pi}{4}$.'
			}
		]
	},

	// [5] lesson_2as_tm_t2_homothety_properties_geometric_constructions
	adaptShared(
		SHARED_LESSONS_2AS_T2[4],
		't2_homothety_properties_geometric_constructions',
		{
			order: 5,
			sequenceId: 'seq6',
			sequenceTitleAr: 'المقطع السادس: التحاكي والجداء السلمي في المستوي وتطبيقاتهما',
			titleAr: 'التحاكي وتطبيقاته: الخواص الهندسية، الإنشاءات، الحفاظ على النسب وتكبير وتصغير الأشكال',
			objectives: [
				'التحكم في مفهوم التحاكي واستعمال العلاقة الشعاعية ΩM\' = k ΩM للإنشاءات الهندسية الدقيقة',
				'استعمال التحاكي لإثبات استقامية نقط وتوازي مستقيمات وتلاقي مستقيمات في الأشكال المستوية',
				'تطبيقات التحاكي في التكبير والتصغير والمقاييس الهندسية وتصميم النماذج الصناعية والقطع الميكانيكية'
			],
			keywordsAr: [
				'التحاكي',
				'مركز التحاكي',
				'نسبة التحاكي',
				'الإنشاءات الهندسية',
				'التكبير والتصغير',
				'النماذج الصناعية'
			]
		}
	),

	// [6] lesson_2as_tm_t2_scalar_product_definition_analytic_line_circle
	adaptShared(
		SHARED_LESSONS_2AS_T2[5],
		't2_scalar_product_definition_analytic_line_circle',
		{
			order: 6,
			sequenceId: 'seq6',
			sequenceTitleAr: 'المقطع السادس: التحاكي والجداء السلمي في المستوي وتطبيقاتهما',
			titleAr: 'الجداء السلمي: العبارة التحليلية، الخواص، معادلة المستقيم بناظم ومعادلة الدائرة',
			objectives: [
				'حساب الجداء السلمي هندسياً وتحليلياً في معلم متعامد ومتجانس واستعماله لإثبات التعامد وتعيين أقياس الزوايا',
				'تعيين معادلة مستقيم انطلاقا من شعاعه الناظمي n(a, b) وتعيين المسافة بين نقطة ومستقيم',
				'تعيين معادلة دائرة وتحديد مركزها ونصف قطرها ودراسة الأوضاع النسبية لمستقيم ودائرة'
			],
			keywordsAr: [
				'الجداء السلمي',
				'العبارة التحليلية للجداء السلمي',
				'الشعاع الناظمي',
				'معادلة المستقيم',
				'معادلة الدائرة'
			]
		}
	),

	// [7] lesson_2as_tm_t2_scalar_product_applications_alkashi_median_loci
	adaptShared(
		SHARED_LESSONS_2AS_T2[6],
		't2_scalar_product_applications_alkashi_median_loci',
		{
			order: 7,
			sequenceId: 'seq6',
			sequenceTitleAr: 'المقطع السادس: التحاكي والجداء السلمي في المستوي وتطبيقاتهما',
			titleAr: 'تطبيقات الجداء السلمي: مبرهنة الكاشي، نظرية المتوسط، مجموعات النقط وحساب الشغل الميكانيكي',
			objectives: [
				'استعمال مبرهنة الكاشي ونظرية المتوسط في حل المثلثات وحساب القياسات المجهولة في الهياكل المعدنية والجمالونات',
				'تعيين مجموعات النقط ذات الطبيعة السلمية (دوائر، مستقيمات محورية) ورسمها بدقة',
				'تطبيق الجداء السلمي في حساب الشغل الميكانيكي لقوة W = F . AB وعزم الازدواج',
				'حل مسائل نموذجية لإدماج الفصل الثاني تجمع النهايات وحساب المثلثات والتحاكي والجداء السلمي'
			],
			keywordsAr: [
				'مبرهنة الكاشي',
				'نظرية المتوسط',
				'مجموعات النقط',
				'الشغل الميكانيكي',
				'عزم الازدواج'
			]
		}
	)
];
