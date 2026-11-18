import type { PhysicsInteractiveLessonData } from '../../types';
import {
	svgInclinedPlaneForces,
	svgPhysicsCurvePlot,
	wrapPhysicsSvg
} from '../../svg-physics';

// ============================================================================
// Custom SVG Diagrams for 2AS Shared Physics Trimester 1 Lessons
// ============================================================================

function svgEnergyChainAndBalance(): string {
	const body = `
  <rect x="8" y="8" width="424" height="204" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="220" y="28" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">السلسلة الطاقوية والحصيلة الطاقوية لجملة (جسم + أرض)</text>
  <!-- Energy chain ovals -->
  <ellipse cx="82" cy="76" rx="58" ry="22" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.8"/>
  <text x="82" y="74" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">جسم + أرض</text>
  <text x="82" y="90" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#2563eb">Ec , Epp</text>

  <line x1="142" y1="76" x2="196" y2="76" stroke="#dc2626" stroke-width="2"/>
  <polygon points="196,72 204,76 196,80" fill="#dc2626"/>
  <text x="171" y="68" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">Wm</text>

  <ellipse cx="264" cy="76" rx="56" ry="22" fill="#f0fdf4" stroke="#15803d" stroke-width="1.8"/>
  <text x="264" y="74" text-anchor="middle" font-size="11" font-weight="bold" fill="#14532d">المحيط (الاحتكاك)</text>
  <text x="264" y="90" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#15803d">Ei</text>

  <line x1="322" y1="76" x2="365" y2="76" stroke="#d97706" stroke-width="2"/>
  <polygon points="365,72 373,76 365,80" fill="#d97706"/>
  <text x="345" y="68" text-anchor="middle" font-size="11" font-weight="bold" fill="#d97706">Q</text>
  <text x="398" y="80" text-anchor="middle" font-size="11" font-weight="bold" fill="#475569">الهواء</text>

  <!-- Energy balance bubble -->
  <circle cx="220" cy="156" r="44" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
  <!-- Ec rising column -->
  <rect x="195" y="132" width="16" height="48" fill="#dbeafe" stroke="#2563eb" stroke-width="1.4"/>
  <line x1="203" y1="176" x2="203" y2="136" stroke="#2563eb" stroke-width="2"/>
  <polygon points="199,141 203,134 207,141" fill="#2563eb"/>
  <text x="203" y="128" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#1d4ed8">Ec</text>
  <!-- Epp falling column -->
  <rect x="229" y="132" width="16" height="48" fill="#fee2e2" stroke="#dc2626" stroke-width="1.4"/>
  <line x1="237" y1="136" x2="237" y2="176" stroke="#dc2626" stroke-width="2"/>
  <polygon points="233,171 237,178 241,171" fill="#dc2626"/>
  <text x="237" y="128" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#dc2626">Epp</text>

  <!-- Incoming/outgoing work -->
  <line x1="126" y1="156" x2="172" y2="156" stroke="#15803d" stroke-width="2"/>
  <polygon points="170,152 177,156 170,160" fill="#15803d"/>
  <text x="148" y="149" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#15803d">W(F)</text>

  <line x1="266" y1="156" x2="314" y2="156" stroke="#d97706" stroke-width="2"/>
  <polygon points="312,152 319,156 312,160" fill="#d97706"/>
  <text x="291" y="149" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#d97706">|W(f)|</text>
  <text x="372" y="160" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">ΔE = E_مكتسبة - E_مفقودة</text>
  `;
	return wrapPhysicsSvg(440, 220, body);
}

function svgSpringEnergyCurves(): string {
	return svgPhysicsCurvePlot({
		xMin: 0,
		xMax: 0.2,
		yMin: 0,
		yMax: 2.2,
		xStep: 0.05,
		yStep: 0.5,
		xLabel: 'x (m)',
		yLabel: 'E (J)',
		title: 'تغيرات الطاقة الكامنة المرونية والطاقات بدلالة الاستطالة x',
		curves: [
			{ fn: (x) => 0.5 * 100 * x * x, color: '#2563eb', label: 'E_pe(x)' },
			{ fn: (x) => 2 - 0.5 * 100 * x * x, color: '#059669', label: 'E_c(x)' },
			{ fn: () => 2, color: '#dc2626', dashed: true, label: 'E_m = cte' }
		],
		points: [{ x: 0.1414, y: 1.0, label: 'E_pe = E_c', color: '#7c3aed' }]
	});
}

function svgConductivityCalibration(): string {
	return svgPhysicsCurvePlot({
		xMin: 0,
		xMax: 10,
		yMin: 0,
		yMax: 140,
		xStep: 2,
		yStep: 25,
		xLabel: 'C (mmol/L)',
		yLabel: 'σ (mS/m)',
		title: 'منحنى المعايرة: الناقلية النوعية σ = f(C)',
		curves: [{ fn: (c) => 12.6 * c, color: '#2563eb', label: 'σ = k·C' }],
		dashedGuides: [
			{ x1: 6, y1: 0, x2: 6, y2: 75.6, color: '#dc2626' },
			{ x1: 0, y1: 75.6, x2: 6, y2: 75.6, color: '#dc2626' }
		],
		points: [{ x: 6, y: 75.6, label: 'C = 6 mmol/L', color: '#dc2626' }]
	});
}

function svgCalorimetryHeatingCurve(): string {
	const body = `
  <rect x="8" y="8" width="404" height="214" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="210" y="26" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">تغير درجة حرارة الجليد أثناء التسخين (التحويل الحراري وتغير الحالة)</text>
  <line x1="55" y1="185" x2="385" y2="185" stroke="#1e293b" stroke-width="1.6"/>
  <line x1="55" y1="195" x2="55" y2="38" stroke="#1e293b" stroke-width="1.6"/>
  <text x="382" y="200" text-anchor="end" font-size="11" font-weight="bold" fill="#0f172a">Q (kJ)</text>
  <text x="48" y="45" text-anchor="end" font-size="11" font-weight="bold" fill="#0f172a">θ (°C)</text>
  <!-- 0°C axis -->
  <line x1="55" y1="140" x2="375" y2="140" stroke="#94a3b8" stroke-dasharray="4,3" stroke-width="1.1"/>
  <text x="48" y="144" text-anchor="end" font-size="10.5" font-weight="bold" fill="#334155">0</text>
  <text x="48" y="176" text-anchor="end" font-size="10.5" fill="#2563eb">-10</text>
  <text x="48" y="74" text-anchor="end" font-size="10.5" fill="#dc2626">θ_f</text>
  <!-- Heating curve -->
  <polyline fill="none" stroke="#2563eb" stroke-width="2.6" points="55,172 115,140 245,140 355,70"/>
  <text x="80" y="168" font-size="10" font-weight="bold" fill="#1d4ed8">Q₁ = m·c_g·Δθ</text>
  <text x="180" y="132" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#059669">انصهار: Q₂ = m·L_f</text>
  <text x="315" y="114" font-size="10" font-weight="bold" fill="#dc2626">Q₃ = m·c_e·Δθ</text>
  `;
	return wrapPhysicsSvg(420, 230, body);
}

// ============================================================================
// 6 Shared Trimester 1 Interactive Lessons for 2AS (SE / TM / MATH)
// ============================================================================

export const SHARED_LESSONS_2AS_T1: PhysicsInteractiveLessonData[] = [
	// [0] Qualitative Energy Conservation
	{
		id: 'phy_lesson_2as_shared_t1_qualitative_energy_conservation',
		slug: '2as_shared-t1-qualitative-energy-conservation',
		grade: '2as_se',
		yearSubjectId: 673,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الميكانيك والطاقة',
		order: 1,
		titleAr: 'مقاربة كيفية لطاقة جملة وانحفاظها (الحصيلة الطاقوية)',
		objectives: [
			'تمييز أشكال الطاقة الأربعة (حركية، كامنة ثقالية، كامنة مرونية، داخلية) وأنماط التحويل (ميكانيكي، كهربائي، حراري، إشعاعي)',
			'بناء السلسلة الطاقوية والحصيلة الطاقوية لجملة وكتابة معادلة انحفاظ الطاقة وحساب استطاعة التحويل P = E/Δt'
		],
		keywordsAr: ['الحصيلة الطاقوية', 'انحفاظ الطاقة', 'أنماط التحويل', 'استطاعة التحويل'],
		discover: {
			scenarioAr:
				'ينزلق جسم صلب $(S)$ كتلته $m$ على مستوٍ مائل بوجود احتكاك تحت تأثير قوة جر ثابتة $\\vec{F}$. نختار الجملة المدروسة (جسم + أرض) لمتابعة تغير طاقاتها خلال الانتقال من الموضع $A$ إلى الموضع $B$.',
			svg: svgEnergyChainAndBalance(),
			steps: [
				{
					promptAr: 'ما هما شكلا الطاقة اللذان يتغيران داخل فقاعة الحصيلة الطاقوية للجملة (جسم + أرض) عند نزول الجسم وتسارعه؟',
					hintAr: 'تزداد سرعة الجسم وينخفض ارتفاعه عن سطح الأرض.',
					expectedInput: 'Ec و Epp',
					revealAr:
						'تتغير الطاقة الحركية $E_c$ (تزداد لأن السرعة تتزايد) والطاقة الكامنة الثقالية $E_{pp}$ (تتناقص لأن الارتفاع ينخفض).'
				},
				{
					promptAr: 'كيف يُنمذج عمل قوة الجر المحركة $\\vec{F}$ وعمل قوة الاحتكاك المقاومة $\\vec{f}$ في الحصيلة الطاقوية؟',
					hintAr: 'القوة المحركة تقدم طاقة للجملة، والاحتكاك يبدد طاقة نحو المحيط.',
					revealAr:
						'يدخل سهم العمل المحرك $W(\\vec{F})$ إلى الفقاعة (تحويل مكتسب)، ويخرج سهم قيمة مطلقة للعمل المقاوم $|W(\\vec{f})|$ من الفقاعة نحو المحيط.'
				},
				{
					promptAr: 'اكتب معادلة انحفاظ الطاقة للجملة (جسم + أرض) بين الموضعين $A$ و $B$.',
					hintAr: 'الطاقة الابتدائية + الطاقة المكتسبة - القيمة المطلقة للطاقة المفقودة = الطاقة النهائية.',
					revealAr:
						'معادلة انحفاظ الطاقة هي:\n$$E_{cA} + E_{ppA} + W_{AB}(\\vec{F}) - |W_{AB}(\\vec{f})| = E_{cB} + E_{ppB}$$'
				}
			]
		},
		summary: {
			rulesAr: [
				'**أشكال الطاقة المخزنة في الجملة**:\n- الطاقة الحركية $E_c$: مرتبطة بالحالة الحركية للجملة.\n- الطاقة الكامنة الثقالية $E_{pp}$: تظهر عند إدراج الأرض ضمن الجملة ($\\text{جسم} + \\text{أرض}$).\n- الطاقة الكامنة المرونية $E_{pe}$: تظهر عند إدراج النابض أو الجسم المرن في الجملة.\n- الطاقة الداخلية $E_i$: مرتبطة بالحالة المجهرية والحرارية للجملة.',
				'**أنماط التحويل الطاقوي الأربعة**:\n- التحويل الميكانيكي $W_m$ (بفعل قوة).\n- التحويل الكهربائي $W_e$ (بفعل تيار كهربائي).\n- التحويل الحراري $Q$ (بفعل اختلاف درجة الحرارة).\n- التحويل الإشعاعي $E_r$ (بفعل الإشعاعات الكهرومغناطيسية).',
				'**مبدأ انحفاظ الطاقة واستطاعة التحويل**:\n$$E_{\\text{ابتدائية}} + E_{\\text{مكتسبة}} - |E_{\\text{مقدمة}}| = E_{\\text{نهائية}}$$\nوتُعرّف استطاعة التحويل المتوسطة بالعلاقة:\n$$P = \\frac{|E|}{\\Delta t}$$ حيث $P$ بالواط ($\\text{W}$)، $E$ بالجول ($\\text{J}$)، و $\\Delta t$ بالثانية ($\\text{s}$). كما يُستعمل الكيلوواط-ساعي ($1\\text{ kWh} = 3.6 \\times 10^6\\text{ J}$).'
			],
			visualSvg: svgEnergyChainAndBalance(),
			visualCaptionAr: 'تمثيل السلسلة الطاقوية وفقاعة الحصيلة الطاقوية لجملة (جسم + أرض)',
			examples: [
				{
					problemAr:
						'مصعد كهربائي يرفع حمولة باستطاعة تحويل ميكانيكية $P = 2400\\text{ W}$ خلال مدة $\\Delta t = 15\\text{ s}$. احسب الطاقة المحولة بالجول ثم بالكيلوواط-ساعي.',
					solutionAr:
						'لدينا $E = P \\cdot \\Delta t = 2400 \\times 15 = 36000\\text{ J} = 36\\text{ kJ}$.\nوبالكيلوواط-ساعي:\n$$E = \\frac{36000}{3.6 \\times 10^6} = 0.01\\text{ kWh}$$'
				}
			],
			watchOutAr:
				'احذر إدراج الطاقة الكامنة الثقالية $E_{pp}$ إذا كانت الجملة المختارة هي (الجسم) فقط! عندما نختار (الجسم) وحده، يُعد الثقل قوة خارجية يُحسب عملها $W(\\vec{P})$ في طرف الطاقة المكتسبة أو المفقودة.'
		},
		practice: [
			{
				questionAr:
					'إذا اخترنا الجملة المدروسة (جسم) فقط أثناء سقوطه الحر الشاقولي من السكون دون احتكاك، فإن معادلة انحفاظ الطاقة بين موضعين $A$ و $B$ تُكتب:',
				options: [
					'$E_{cA} + W_{AB}(\\vec{P}) = E_{cB}$',
					'$E_{cA} + E_{ppA} = E_{cB} + E_{ppB}$',
					'$E_{cA} - W_{AB}(\\vec{P}) = E_{cB}$',
					'$E_{ppA} + W_{AB}(\\vec{P}) = E_{ppB}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! بما أن الأرض خارج الجملة، لا توجد طاقة كامنة ثقالية $E_{pp}$، ويُحسب عمل الثقل $W(\\vec{P})$ كتحويل ميكانيكي مكتسب.',
					'خطأ تشخيصي: هذه المعادلة تخص الجملة (جسم + أرض) وليس الجملة (جسم) وحدها.',
					'خطأ تشخيصي: أثناء السقوط الحر يكون عمل الثقل محركاً وموجباً فيزيد من الطاقة الحركية.',
					'خطأ تشخيصي: لا تملك الجملة (جسم) وحدها طاقة كامنة ثقالية.'
				],
				explanationAr:
					'عند اختيار الجملة (جسم) فقط، يكون الثقل $\\vec{P}$ قوة خارجية عملها محرك، فتُكتب المعادلة: $E_{cA} + W_{AB}(\\vec{P}) = E_{cB}$.'
			},
			{
				questionAr:
					'جهاز كهربائي استطاعته $P = 1.5\\text{ kW}$ يشتغل لمدة $2\\text{ h}$. ما هي الطاقة الكهربائية المحولة بوحدة $\\text{kWh}$ وبوحدة $\\text{MJ}$؟',
				options: [
					'$3\\text{ kWh}$ أي $10.8\\text{ MJ}$',
					'$0.75\\text{ kWh}$ أي $2.7\\text{ MJ}$',
					'$3\\text{ kWh}$ أي $3.6\\text{ MJ}$',
					'$3000\\text{ kWh}$ أي $10.8\\text{ MJ}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $E = 1.5 \\times 2 = 3\\text{ kWh} = 3 \\times 3.6\\text{ MJ} = 10.8\\text{ MJ}$.',
					'خطأ تشخيصي: قسمت الاستطاعة على الزمن بدلاً من ضربهما ($E = P \\cdot \\Delta t$).',
					'خطأ تشخيصي: $1\\text{ kWh} = 3.6\\text{ MJ}$ وليس $1.2\\text{ MJ}$.',
					'خطأ تشخيصي: حولت $1.5\\text{ kW}$ إلى واط ثم استخدمت وحدة $\\text{kWh}$ دون قسمة على $1000$.'
				],
				explanationAr:
					'نحسب الطاقة بالكيلوواط-ساعي: $E = P \\cdot \\Delta t = 1.5\\text{ kW} \\times 2\\text{ h} = 3\\text{ kWh}$. وبما أن $1\\text{ kWh} = 3.6\\text{ MJ}$، فإن $E = 3 \\times 3.6 = 10.8\\text{ MJ}$.'
			},
			{
				questionAr:
					'في الحصيلة الطاقوية لجملة تتناقص طاقتها الحركية من $E_{c1} > 0$ إلى $E_{c2} = 0$ دون تغير في الطاقة الكامنة، يكون شكل العمود داخل الفقاعة:',
				options: [
					'عموداً ممتلئاً جزئياً بسهم متجه نحو الأسفل يلامس قاعدة العمود',
					'عموداً فارغاً بسهم متجه نحو الأعلى',
					'عموداً متقطعاً بسهم أفقي',
					'عموداً ممتلئاً بسهم نحو الأسفل لا يلامس القاعدة'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! تناقص الطاقة يُمثل بسهم نحو الأسفل، وانعدام الطاقة النهائية يعني أن الخط المتصل يصل إلى قاع العمود.',
					'خطأ تشخيصي: السهم نحو الأعلى يمثل تزايد الطاقة وليس تناقصها.',
					'خطأ تشخيصي: الحصيلة الطاقوية تستعمل أسهماً شاقولية داخل الأعمدة.',
					'خطأ تشخيصي: عندما تنعدم الطاقة النهائية ($E_{c2} = 0$) يجب أن يلامس المستوى النهائي قاعدة العمود.'
				],
				explanationAr:
					'عندما تتناقص الطاقة إلى الصفر، يتجه السهم من المستوى الابتدائي (فوق القاعدة) نحو الأسفل ليصل تماماً إلى قاعدة العمود الموافقة للصفر.'
			}
		]
	},

	// [1] Work & Translational Kinetic Energy
	{
		id: 'phy_lesson_2as_shared_t1_work_translational_kinetic_energy',
		slug: '2as_shared-t1-work-translational-kinetic-energy',
		grade: '2as_se',
		yearSubjectId: 673,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الميكانيك والطاقة',
		order: 2,
		titleAr: 'العمل والطاقة الحركية (حالة حركة انسحابية)',
		objectives: [
			'حساب عمل قوة ثابتة W_{AB}(F) = F·AB·cos(α) وعمل قوة الثقل W(P) = ±mgh والتمييز بين العمل المحرك والمقاوم والمعدوم',
			'تطبيق عبارة الطاقة الحركية الانسحابية E_c = ½mv² ومبدأ انحفاظ الطاقة لحساب السرعات وقوة الاحتكاك'
		],
		keywordsAr: ['عمل قوة ثابتة', 'الطاقة الحركية', 'حركة انسحابية', 'عمل قوة الثقل'],
		discover: {
			scenarioAr:
				'ينزلق متزلج كتلته $m = 60\\text{ kg}$ على مستوٍ مائل طوله $AB = 20\\text{ m}$ وزاوية ميله $\\alpha = 30^\\circ$ عن الأفق، خاضعاً لثقله $\\vec{P}$ ورد فعل السطح $\\vec{R}_N$ وقوة احتكاك ثابتة $\\vec{f}$ معاكسة لجهة الحركة.',
			svg: svgInclinedPlaneForces({ angleDeg: 30, showFriction: true, angleLabel: 'α = 30°' }),
			steps: [
				{
					promptAr: 'احسب عمل قوة رد الفعل الناظمي $\\vec{R}_N$ خلال الانتقال $AB$.',
					hintAr: 'ما هي الزاوية بين الشعاع $\\vec{R}_N$ وشعاع الانتقال $\\overrightarrow{AB}$؟',
					expectedInput: '0',
					revealAr:
						'بما أن $\\vec{R}_N \\perp \\overrightarrow{AB}$ فإن $\\cos(90^\\circ) = 0$، ومنه $W_{AB}(\\vec{R}_N) = 0\\text{ J}$ (عمل معدوم).'
				},
				{
					promptAr: 'ما عبارة عمل قوة الثقل $\\vec{P}$ عند النزول على مستوٍ مائل طوله $AB$ وزاويته $\\alpha$؟',
					hintAr: 'استعمل فرق الارتفاع $h = AB \\sin\\alpha$ وعلاقة عمل الثقل.',
					revealAr:
						'عند النزول يكون عمل الثقل محركاً: $W_{AB}(\\vec{P}) = +mgh = +mg \\cdot AB \\sin\\alpha$.'
				},
				{
					promptAr: 'إذا انطلق المتزلج من السكون في $A$ وبلغ سرعة $v_B = 10\\text{ m/s}$ عند $B$، كيف نستنتج شدة قوة الاحتكاك $f$ باستعمال مبدأ انحفاظ الطاقة للجملة (متزلج)؟',
					hintAr: '$E_{cA} + W_{AB}(\\vec{P}) - |W_{AB}(\\vec{f})| = E_{cB}$ حيث $W_{AB}(\\vec{f}) = -f \\cdot AB$.',
					revealAr:
						'بما أن $E_{cA} = 0$ نجد:\n$$mgh - f \\cdot AB = \\frac{1}{2}m v_B^2 \\implies f = \\frac{mgh - \\frac{1}{2}m v_B^2}{AB}$$'
				}
			]
		},
		summary: {
			rulesAr: [
				'**عمل قوة ثابتة $\\vec{F}$ خلال انتقال مستقيم $\\overrightarrow{AB}$**:\n$$W_{AB}(\\vec{F}) = \\vec{F} \\cdot \\overrightarrow{AB} = F \\cdot AB \\cdot \\cos\\alpha$$\n- إذا كان $\\alpha < 90^\\circ$: $W > 0$ (عمل محرك).\n- إذا كان $\\alpha = 90^\\circ$: $W = 0$ (عمل معدوم).\n- إذا كان $\\alpha > 90^\\circ$: $W < 0$ (عمل مقاوم، مثل الاحتكاك حيث $\\alpha = 180^\\circ \\implies W(\\vec{f}) = -f \\cdot AB$).',
				'**عمل قوة الثقل $\\vec{P}$**:\nلا يتعلق بالمسار المسلوك بل بفرق الارتفاع $h = |z_A - z_B|$ فقط:\n$$W_{AB}(\\vec{P}) = mg(z_A - z_B) = \\pm mgh$$\n($+$ في حالة النزول، و $-$ في حالة الصعود).',
				'**الطاقة الحركية الانسحابية**:\n$$E_c = \\frac{1}{2} m v^2$$\nحيث $m$ الكتلة بـ $\\text{kg}$ و $v$ السرعة بـ $\\text{m/s}$ و $E_c$ بـ $\\text{J}$.'
			],
			visualSvg: svgInclinedPlaneForces({ angleDeg: 30, showFriction: true, showTraction: true }),
			visualCaptionAr: 'تمثيل القوى المؤثرة على جسم ينزلق على مستوٍ مائل لحساب أعمالها',
			examples: [
				{
					problemAr:
						'جسم كتلته $m = 2\\text{ kg}$ يتحرك على طريق أفقي لمسافة $AB = 10\\text{ m}$ تحت تأثير قوة جر $F = 25\\text{ N}$ تصنع زاوية $\\alpha = 60^\\circ$ مع الأفق، وقوة احتكاك $f = 5\\text{ N}$. احسب المحصلة الجبرية للأعمال.',
					solutionAr:
						'- $W(\\vec{F}) = 25 \\times 10 \\times \\cos(60^\\circ) = 250 \\times 0.5 = 125\\text{ J}$.\n- $W(\\vec{f}) = -5 \\times 10 = -50\\text{ J}$.\n- $W(\\vec{P}) = W(\\vec{R}_N) = 0\\text{ J}$ لأنها عمودية على المسار.\n- مجموع الأعمال: $\\sum W = 125 - 50 = 75\\text{ J}$.'
				}
			],
			watchOutAr:
				'انتبه عند حساب عمل قوة الثقل على مستوٍ مائل: الارتفاع العمودي هو $h = AB \\cdot \\sin\\alpha$ وليس $\\cos\\alpha$، وعند الصعود يكون عمل الثقل سالباً ($-mgh$) لأنه يقاوم الحركة.'
		},
		practice: [
			{
				questionAr:
					'تُسحب عربة على طريق أفقي لمسافة $d = 12\\text{ m}$ بقوة ثابتة شدتها $F = 40\\text{ N}$ تصنع زاوية $\\alpha = 60^\\circ$ مع شعاع الانتقال. ما قيمة عمل هذه القوة؟',
				options: ['$240\\text{ J}$', '$480\\text{ J}$', '$415.7\\text{ J}$', '$-240\\text{ J}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $W = F \\cdot d \\cdot \\cos(60^\\circ) = 40 \\times 12 \\times 0.5 = 240\\text{ J}$.',
					'خطأ تشخيصي: نسيت الضرب في $\\cos(60^\\circ) = 0.5$.',
					'خطأ تشخيصي: استعملت $\\sin(60^\\circ)$ بدلاً من $\\cos(60^\\circ)$.',
					'خطأ تشخيصي: الزاوية حادة ($60^\\circ < 90^\\circ$) فالعمل محرك وموجب.'
				],
				explanationAr:
					'بتطبيق علاقة عمل قوة ثابتة: $W(\\vec{F}) = F \\cdot d \\cdot \\cos\\alpha = 40 \\times 12 \\times \\cos(60^\\circ) = 480 \\times 0.5 = 240\\text{ J}$.'
			},
			{
				questionAr:
					'تتضاعف سرعة سيارة تتحرك انسحابياً مرتين ($v_2 = 2 v_1$). كيف تتغير طاقتها الحركية؟',
				options: ['تتضاعف 4 مرات', 'تتضاعف مرتين', 'تتضاعف 8 مرات', 'تبقى ثابتة'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! لأن $E_c = \\frac{1}{2}m v^2$ تتناسب طردياً مع مربع السرعة: $(2v_1)^2 = 4v_1^2$.',
					'خطأ تشخيصي: الطاقة الحركية تتناسب مع مربع السرعة $v^2$ وليس مع $v$.',
					'خطأ تشخيصي: $2^2 = 4$ وليس $8$.',
					'خطأ تشخيصي: تتغير الطاقة الحركية بتغير السرعة.'
				],
				explanationAr:
					'لدينا $E_{c2} = \\frac{1}{2}m(2v_1)^2 = 4 \\times \\left(\\frac{1}{2}mv_1^2\\right) = 4 E_{c1}$.'
			},
			{
				questionAr:
					'يصعد جسم كتلته $m = 5\\text{ kg}$ مستوياً مائلاً من ارتفاع $z_A = 1\\text{ m}$ إلى ارتفاع $z_B = 4\\text{ m}$ ($g = 10\\text{ m/s}^2$). قيمة عمل قوة الثقل $W_{AB}(\\vec{P})$ هي:',
				options: ['$-150\\text{ J}$', '$+150\\text{ J}$', '$-200\\text{ J}$', '$+50\\text{ J}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $W_{AB}(\\vec{P}) = mg(z_A - z_B) = 5 \\times 10 \\times (1 - 4) = -150\\text{ J}$.',
					'خطأ تشخيصي: الجسم يصعد للأعلى لذا فعمل الثقل مقاوم وسالب.',
					'خطأ تشخيصي: استعملت $z_B = 4\\text{ m}$ بدلاً من فرق الارتفاع $\\Delta z = 3\\text{ m}$.',
					'خطأ تشخيصي: استعملت $z_A = 1\\text{ m}$ فقط.'
				],
				explanationAr:
					'عمل قوة الثقل يعطى بالعلاقة $W_{AB}(\\vec{P}) = mg(z_A - z_B) = 5 \\times 10 \\times (1 - 4) = -150\\text{ J}$.'
			}
		]
	},

	// [2] Potential Energy & Mechanical Energy
	{
		id: 'phy_lesson_2as_shared_t1_potential_energy_mechanical',
		slug: '2as_shared-t1-potential-energy-mechanical',
		grade: '2as_se',
		yearSubjectId: 673,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الميكانيك والطاقة',
		order: 3,
		titleAr: 'الطاقة الكامنة (الثقالية والمرونية) والطاقة الميكانيكية',
		objectives: [
			'حساب الطاقة الكامنة الثقالية E_{pp} = mgz باختيار المستوى المرجعي والطاقة الكامنة المرونية E_{pe} = ½kx²',
			'تطبيق مبدأ انحفاظ الطاقة في جملة (جسم + أرض + نابض) واستنتاج منحنيات تغير الطاقة'
		],
		keywordsAr: ['الطاقة الكامنة الثقالية', 'الطاقة الكامنة المرونية', 'ثابت مرونة النابض', 'الطاقة الميكانيكية'],
		discover: {
			scenarioAr:
				'نضغط نابضاً مرناً ثابت مرونته $k = 100\\text{ N/m}$ بمقدار $x = 0.2\\text{ m}$ بوضع جسم كتلته $m$ أمامه على مستوٍ أفقي أملس، ثم نحرره فينطلق الجسم عندما يعود النابض لطوله الأصلي.',
			svg: svgSpringEnergyCurves(),
			steps: [
				{
					promptAr: 'احسب الطاقة الكامنة المرونية المخزنة في الجملة (جسم + نابض) عند الانضغاط $x = 0.2\\text{ m}$.',
					hintAr: 'استعمل العلاقة $E_{pe} = \\frac{1}{2} k x^2$.',
					expectedInput: '2',
					revealAr:
						'$E_{pe} = \\frac{1}{2} \\times 100 \\times (0.2)^2 = 50 \\times 0.04 = 2\\text{ J}$.'
				},
				{
					promptAr: 'بإهمال الاحتكاكات، ما قيمة الطاقة الميكانيكية $E_m = E_c + E_{pe}$ للجملة خلال الحركة؟',
					hintAr: 'عند غياب القوى غير المحافظة (الاحتكاك) تبقى الطاقة الميكانيكية ثابتة.',
					revealAr:
						'تنحفظ الطاقة الميكانيكية: $E_m = E_{c0} + E_{pe0} = 0 + 2 = 2\\text{ J}$ في كل لحظة.'
				},
				{
					promptAr: 'من المنحنيات البيانية، عند أي مقدار استطالة يتساوى $E_{pe}$ و $E_c$؟',
					hintAr: 'عند نقطة تقاطع المنحنيين يكون $E_{pe} = E_c = \\frac{1}{2} E_m$.',
					revealAr:
						'يتساوى المنحنيان عندما $E_{pe} = 1\\text{ J}$، أي $\\frac{1}{2}k x^2 = 1 \\implies x = \\sqrt{0.02} \\approx 0.141\\text{ m}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**الطاقة الكامنة الثقالية**:\n$$E_{pp} = m \\cdot g \\cdot z$$\nحيث $z$ هو ارتفاع مركز عطالة الجسم عن المستوى المرجعي المختار ($E_{pp} = 0$ عند $z = 0$). يمكن أن تكون موجبة أو سالبة أو معدومة حسب الموضع بالنسبة للمرجع.',
				'**الطاقة الكامنة المرونية**:\n$$E_{pe} = \\frac{1}{2} k x^2$$\nحيث $k$ ثابت مرونة النابض بـ $\\text{N/m}$ و $x = |l - l_0|$ مقدار الاستطالة أو الانضغاط بـ $\\text{m}$. وهي دوماً موجبة أو معدومة.',
				'**انحفاظ الطاقة الميكانيكية**:\n$$E_m = E_c + E_{pp} + E_{pe}$$\n- في غياب الاحتكاك والقوى الخارجية الأخرى: $\\Delta E_m = 0 \\iff E_{mA} = E_{mB}$.\n- بوجود احتكاك: $\\Delta E_m = E_{mB} - E_{mA} = W_{AB}(\\vec{f}) = -f \\cdot AB < 0$.'
			],
			visualSvg: svgSpringEnergyCurves(),
			visualCaptionAr: 'منحنيات الطاقة الكامنة المرونية والحركية والميكانيكية لجملة معزولة طاقوياً',
			examples: [
				{
					problemAr:
						'جسم كتلته $m = 0.5\\text{ kg}$ يُقذف نحو الأعلى بسرعة $v_0 = 6\\text{ m/s}$ ($g = 10\\text{ m/s}^2$). أوجد أقصى ارتفاع $h_{\\max}$ يبلغه الجسم بإهمال مقاومة الهواء.',
					solutionAr:
						'نختار المرجع $z = 0$ عند نقطة القذف. عند أقصى ارتفاع تنعدم السرعة ($v = 0$).\nبانحفاظ الطاقة الميكانيكية للجملة (جسم + أرض):\n$$\\frac{1}{2} m v_0^2 + 0 = 0 + m g h_{\\max} \\implies h_{\\max} = \\frac{v_0^2}{2g} = \\frac{36}{20} = 1.8\\text{ m}$$'
				}
			],
			watchOutAr:
				'في علاقة $E_{pe} = \\frac{1}{2} k x^2$ يجب دائماً تحويل الاستطالة أو الانضغاط $x$ من السنتيمتر ($\\text{cm}$) إلى المتر ($\\text{m}$) قبل التربيع! مثال: $x = 10\\text{ cm} = 0.1\\text{ m}$.'
		},
		practice: [
			{
				questionAr:
					'نابض ثابت مرونته $k = 200\\text{ N/m}$ يُضغط بمقدار $x = 5\\text{ cm}$. ما هي الطاقة الكامنة المرونية المخزنة فيه؟',
				options: ['$0.25\\text{ J}$', '$2500\\text{ J}$', '$5\\text{ J}$', '$0.5\\text{ J}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $x = 0.05\\text{ m} \\implies E_{pe} = \\frac{1}{2}(200)(0.05)^2 = 100 \\times 0.0025 = 0.25\\text{ J}$.',
					'خطأ تشخيصي: نسيت تحويل $x$ من $\\text{cm}$ إلى $\\text{m}$.',
					'خطأ تشخيصي: نسيت تربيع $x$ وحسبت $\\frac{1}{2}kx$.',
					'خطأ تشخيصي: نسيت معامل $\\frac{1}{2}$ في قانون الطاقة الكامنة المرونية.'
				],
				explanationAr:
					'نحول $x = 5\\text{ cm} = 0.05\\text{ m}$، ثم نطبق: $E_{pe} = \\frac{1}{2}k x^2 = 0.5 \\times 200 \\times (0.05)^2 = 0.25\\text{ J}$.'
			},
			{
				questionAr:
					'إذا اختير المستوى المرجعي للطاقة الكامنة الثقالية عند سطح الطاولة ($z = 0$)، فما هي قيمة $E_{pp}$ لجسم كتلته $m = 2\\text{ kg}$ موضوع على الأرض على عمق $0.8\\text{ m}$ أسفل الطاولة ($g = 10\\text{ m/s}^2$)؟',
				options: ['$-16\\text{ J}$', '$+16\\text{ J}$', '$0\\text{ J}$', '$-8\\text{ J}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! بما أن الجسم أسفل المرجع فإن $z = -0.8\\text{ m}$ ومنه $E_{pp} = 2 \\times 10 \\times (-0.8) = -16\\text{ J}$.',
					'خطأ تشخيصي: الجسم يقع تحت المستوى المرجعي لذا فإن الارتفاع الجبري $z$ سالب.',
					'خطأ تشخيصي: لا تنعدم $E_{pp}$ إلا عند المستوى المرجعي نفسه ($z = 0$).',
					'خطأ تشخيصي: تحقق من جداء $m \\cdot g \\cdot z$.'
				],
				explanationAr:
					'الفاصلة الشاقولية تحت المرجع سالبة: $z = -0.8\\text{ m}$، وعليه $E_{pp} = m g z = 2 \\times 10 \\times (-0.8) = -16\\text{ J}$.'
			},
			{
				questionAr:
					'يتحرك جسم على مسار أملس في جملة (جسم + أرض) معزولة طاقوياً. عند نزوله بمقدار $h$، فإن طاقته الميكانيكية $E_m$:',
				options: [
					'تبقى ثابتة لأن النقص في $E_{pp}$ يساوي الزيادة في $E_c$',
					'تزداد لأن السرعة تزداد',
					'تتناقص لأن الارتفاع ينخفض',
					'تنعدم عند بلوغ سطح المرجع'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $\\Delta E_m = \\Delta E_c + \\Delta E_{pp} = 0$ في غياب القوى غير المحافظة.',
					'خطأ تشخيصي: الذي يزداد هو $E_c$ فقط، بينما المجموع $E_c + E_{pp}$ ثابت.',
					'خطأ تشخيصي: الذي يتناقص هو $E_{pp}$ فقط.',
					'خطأ تشخيصي: عند $z = 0$ تنعدم $E_{pp}$ لكن $E_m = E_c \\neq 0$.'
				],
				explanationAr:
					'بانحفاظ الطاقة الميكانيكية في غياب الاحتكاك يكون $E_m = E_c + E_{pp} = \\text{cte}$، فأي نقصان في $E_{pp}$ يتحول كلياً إلى زيادة مساوية في $E_c$.'
			}
		]
	},

	// [3] Conductivity & Molar Concentration
	{
		id: 'phy_lesson_2as_shared_t1_conductivity_molar_concentration',
		slug: '2as_shared-t1-conductivity-molar-concentration',
		grade: '2as_se',
		yearSubjectId: 673,
		trimesterId: 't1',
		sequenceId: 'seq2',
		sequenceTitleAr: 'تعيين كمية المادة بالناقلية والطاقة الداخلية',
		order: 4,
		titleAr: 'تعيين كمية المادة عن طريق قياس الناقلية',
		objectives: [
			'حساب الناقلية G = I/U = 1/R والمقاومة النوعية والناقلية النوعية σ = G·L/S = G/k',
			'تطبيق قانون كولروش σ = ∑ λ_i [X_i] لتحديد التركيز المولي للمحلول الشاردي وكمية المادة'
		],
		keywordsAr: ['الناقلية G', 'الناقلية النوعية σ', 'قانون كولروش', 'ثابت الخلية', 'الناقلية المولية الشاردية'],
		discover: {
			scenarioAr:
				'نغمر خلية قياس ناقلية ثابتها $k = \\frac{S}{L} = 0.01\\text{ m}$ في محلول مائي لكلور الصوديوم $\\ce{Na+(aq) + Cl-(aq)}$ تركيزه $C$ مجهول، فنقيس شدة التيار $I = 3.78\\text{ mA}$ تحت توتر فعال $U = 5\\text{ V}$، ونستعمل منحنى المعايرة $\\sigma = f(C)$.',
			svg: svgConductivityCalibration(),
			steps: [
				{
					promptAr: 'احسب ناقلية جزء المحلول $G$ بوحدة السيمنس ($\\text{S}$) وبالميلي سيمنس ($\\text{mS}$).',
					hintAr: 'طبق القانون $G = \\frac{I}{U}$ مع تحويل $I$ إلى الأمبير.',
					expectedInput: '0.756 mS',
					revealAr:
						'$G = \\frac{3.78 \\times 10^{-3}}{5} = 0.756 \\times 10^{-3}\\text{ S} = 0.756\\text{ mS}$.'
				},
				{
					promptAr: 'استنتج الناقلية النوعية $\\sigma$ للمحلول بوحدة $\\text{mS/m}$.',
					hintAr: 'العلاقة هي $G = k \\cdot \\sigma \\implies \\sigma = \\frac{G}{k}$.',
					expectedInput: '75.6 mS/m',
					revealAr:
						'$\\sigma = \\frac{0.756 \\times 10^{-3}}{0.01} = 0.0756\\text{ S/m} = 75.6\\text{ mS/m}$.'
				},
				{
					promptAr: 'إذا كانت $\\lambda_{\\ce{Na+}} = 5.0\\text{ mS}\\cdot\\text{m}^2/\\text{mol}$ و $\\lambda_{\\ce{Cl-}} = 7.6\\text{ mS}\\cdot\\text{m}^2/\\text{mol}$، احسب التركيز المولي $C$ بقانون كولروش.',
					hintAr: '$\\sigma = (\\lambda_{\\ce{Na+}} + \\lambda_{\\ce{Cl-}}) \\cdot C$ مع الانتباه أن $[X_i]$ يجب أن يكون بـ $\\text{mol/m}^3$ إذا كانت $\\sigma$ بـ $\\text{S/m}$ و $\\lambda$ بـ $\\text{S}\\cdot\\text{m}^2/\\text{mol}$.',
					revealAr:
						'لدينا $\\lambda_{\\ce{Na+}} + \\lambda_{\\ce{Cl-}} = 12.6\\text{ mS}\\cdot\\text{m}^2/\\text{mol}$.\nإذن $C = \\frac{75.6}{12.6} = 6\\text{ mol/m}^3 = 6\\text{ mmol/L} = 6 \\times 10^{-3}\\text{ mol/L}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**الناقلية $G$ والناقلية النوعية $\\sigma$**:\n- الناقلية هي مقلوب المقاومة: $G = \\frac{1}{R} = \\frac{I}{U}$ (بالسيمنس $\\text{S}$).\n- ترتبط بالناقلية النوعية $\\sigma$ (بـ $\\text{S/m}$) عبر ثابت الخلية $k = \\frac{S}{L}$ (بـ $\\text{m}$):\n$$G = k \\cdot \\sigma = \\frac{S}{L} \\cdot \\sigma$$',
				'**قانون كولروش للمحاليل الشاردية الممددة ($C < 10^{-2}\\text{ mol/L}$)**:\n$$\\sigma = \\sum \\lambda_i [X_i]$$\nحيث $\\lambda_i$ الناقلية المولية الشاردية بـ $\\text{S}\\cdot\\text{m}^2/\\text{mol}$، و $[X_i]$ التركيز المولي الفعلي للشاردة بـ $\\text{mol/m}^3$.',
				'**التحويل الذهبي للتركيز**:\n$$1\\text{ mol/L} = 10^3\\text{ mol/m}^3 \\quad \\text{و} \\quad 1\\text{ mmol/L} = 1\\text{ mol/m}^3$$'
			],
			visualSvg: svgConductivityCalibration(),
			visualCaptionAr: 'استغلال منحنى المعايرة الخطي $\\sigma = f(C)$ لتعيين التركيز المولي لمحلول ممدد',
			examples: [
				{
					problemAr:
						'محلول مائي لكلور الكالسيوم $\\ce{Ca^{2+}(aq) + 2Cl-(aq)}$ تركيزه المولي $C = 2\\text{ mmol/L}$. احسب ناقليته النوعية علماً أن $\\lambda_{\\ce{Ca^{2+}}} = 12\\text{ mS}\\cdot\\text{m}^2/\\text{mol}$ و $\\lambda_{\\ce{Cl-}} = 7.6\\text{ mS}\\cdot\\text{m}^2/\\text{mol}$.',
					solutionAr:
						'لدينا $[\\ce{Ca^{2+}}] = C = 2\\text{ mol/m}^3$ و $[\\ce{Cl-}] = 2C = 4\\text{ mol/m}^3$.\n$$\\sigma = \\lambda_{\\ce{Ca^{2+}}}[\\ce{Ca^{2+}}] + \\lambda_{\\ce{Cl-}}[\\ce{Cl-}] = 12(2) + 7.6(4) = 24 + 30.4 = 54.4\\text{ mS/m}$$'
				}
			],
			watchOutAr:
				'أكبر خطأ شائع في البكالوريا و 2AS هو نسيان تحويل التركيز من $\\text{mol/L}$ إلى $\\text{mol/m}^3$ عند تطبيق قانون كولروش! تذكر دائماً: $C(\\text{mol/m}^3) = 1000 \\times C(\\text{mol/L})$، كما يجب الانتباه إلى المعاملات الستوكيوميترية للشوارد مثل $2\\ce{Cl-}$ في $\\ce{CaCl2}$.'
		},
		practice: [
			{
				questionAr:
					'إذا كانت الناقلية النوعية لمحلول مائي $\\sigma = 0.25\\text{ S/m}$ وثابت الخلية $k = 2\\text{ cm} = 0.02\\text{ m}$، فما قيمة الناقلية $G$؟',
				options: ['$5\\text{ mS}$', '$12.5\\text{ S}$', '$0.5\\text{ S}$', '$50\\text{ mS}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $G = k \\cdot \\sigma = 0.02 \\times 0.25 = 0.005\\text{ S} = 5\\text{ mS}$.',
					'خطأ تشخيصي: قسمت $\\sigma$ على $k$ بدلاً من ضربهما ($G = k\\cdot\\sigma$).',
					'خطأ تشخيصي: نسيت تحويل $k = 2\\text{ cm}$ إلى المتر ($0.02\\text{ m}$).',
					'خطأ تشخيصي: $0.005\\text{ S} = 5\\text{ mS}$ وليس $50\\text{ mS}$.'
				],
				explanationAr:
					'نحول ثابت الخلية إلى المتر: $k = 2\\text{ cm} = 0.02\\text{ m}$، ثم نطبق $G = k\\cdot\\sigma = 0.02 \\times 0.25 = 5 \\times 10^{-3}\\text{ S} = 5\\text{ mS}$.'
			},
			{
				questionAr:
					'في محلول مائي لكبريتات الصوديوم ($2\\ce{Na+(aq) + SO4^{2-}(aq)}$) تركيزه المولي $C$، كيف تُكتب عبارة الناقلية النوعية $\\sigma$ بدلالة $C$؟',
				options: [
					'$\\sigma = (2\\lambda_{\\ce{Na+}} + \\lambda_{\\ce{SO4^{2-}}}) C$',
					'$\\sigma = (\\lambda_{\\ce{Na+}} + \\lambda_{\\ce{SO4^{2-}}}) C$',
					'$\\sigma = (\\lambda_{\\ce{Na+}} + 2\\lambda_{\\ce{SO4^{2-}}}) C$',
					'$\\sigma = \\frac{\\lambda_{\\ce{Na+}} + \\lambda_{\\ce{SO4^{2-}}}}{C}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! لأن كل مول من المذاب يحرر $2\\text{ mol}$ من $\\ce{Na+}$ ومولاً واحداً من $\\ce{SO4^{2-}}$.',
					'خطأ تشخيصي: أغفلت المعامل الستوكيومتري $2$ أمام تركيز شوارد الصوديوم.',
					'خطأ تشخيصي: عكست المعاملات بين $\\ce{Na+}$ و $\\ce{SO4^{2-}}$.',
					'خطأ تشخيصي: الناقلية النوعية تتناسب طردياً مع التركيز $C$ وليس عكسياً.'
				],
				explanationAr:
					'بما أن $[\\ce{Na+}] = 2C$ و $[\\ce{SO4^{2-}}] = C$، فإن $\\sigma = \\lambda_{\\ce{Na+}}(2C) + \\lambda_{\\ce{SO4^{2-}}}(C) = (2\\lambda_{\\ce{Na+}} + \\lambda_{\\ce{SO4^{2-}}})C$.'
			},
			{
				questionAr:
					'تركيز محلول شاردي يساوي $C = 4 \\times 10^{-3}\\text{ mol/L}$. ما قيمته بوحدة $\\text{mol/m}^3$؟',
				options: ['$4\\text{ mol/m}^3$', '$4 \\times 10^{-6}\\text{ mol/m}^3$', '$40\\text{ mol/m}^3$', '$0.4\\text{ mol/m}^3$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! لأن $1\\text{ m}^3 = 1000\\text{ L}$ لذا نضرب في $1000$: $4 \\times 10^{-3} \\times 10^3 = 4\\text{ mol/m}^3$.',
					'خطأ تشخيصي: قسمت على $1000$ بدلاً من الضرب في $1000$.',
					'خطأ تشخيصي: ضربت في $10^4$ بدلاً من $10^3$.',
					'خطأ تشخيصي: ضربت في $100$ بدلاً من $1000$.'
				],
				explanationAr:
					'كل متر مكعب يحتوي على $1000\\text{ L}$، إذن $C(\\text{mol/m}^3) = 4 \\times 10^{-3} \\times 10^3 = 4\\text{ mol/m}^3$.'
			}
		]
	},

	// [4] Internal Energy & Calorimetry
	{
		id: 'phy_lesson_2as_shared_t1_internal_energy_calorimetry',
		slug: '2as_shared-t1-internal-energy-calorimetry',
		grade: '2as_se',
		yearSubjectId: 673,
		trimesterId: 't1',
		sequenceId: 'seq2',
		sequenceTitleAr: 'تعيين كمية المادة بالناقلية والطاقة الداخلية',
		order: 5,
		titleAr: 'الطاقة الداخلية والتحويل الحراري والمسعر الحراري',
		objectives: [
			'حساب التحويل الحراري المصاحب لتغير درجة الحرارة Q = m·c·ΔT والسعة الحرارية للمسعر C_cal',
			'حساب التحويل الحراري المصاحب لتغير الحالة الفيزيائية Q = m·L وحساب درجة حرارة التوازن الحراري'
		],
		keywordsAr: ['الطاقة الداخلية', 'التحويل الحراري', 'المسعر الحراري', 'السعة الحرارية الكتلية', 'الحرارة الكامنة'],
		discover: {
			scenarioAr:
				'نضع في مسعر حراري سعته الحرارية $C_{\\text{cal}} = 80\\text{ J/}^\\circ\\text{C}$ كتلة $m_1 = 200\\text{ g}$ من الماء عند درجة الحرارة الابتدائية $\\theta_1 = 20^\\circ\\text{C}$، ثم ندخل فيه قطعة جليد كتلتها $m_2 = 50\\text{ g}$ عند $\\theta_2 = 0^\\circ\\text{C}$ ($c_{\\text{eau}} = 4185\\text{ J/(kg}\\cdot^\\circ\\text{C)}$, $L_f = 335\\text{ kJ/kg}$).',
			svg: svgCalorimetryHeatingCurve(),
			steps: [
				{
					promptAr: 'ما هو التحويل الحراري $Q_{\\text{fusion}}$ اللازم لصهر قطعة الجليد كلياً عند $0^\\circ\\text{C}$؟',
					hintAr: 'استعمل العلاقة $Q = m_2 \\cdot L_f$ بعد تحويل $m_2$ إلى $\\text{kg}$.',
					expectedInput: '16750 J',
					revealAr:
						'$Q_{\\text{fusion}} = 0.05 \\times 335000 = 16750\\text{ J}$.'
				},
				{
					promptAr: 'ما مجموع السعات الحرارية للماء الابتدائي والمسعر معاً؟',
					hintAr: 'احسب $m_1 c_{\\text{eau}} + C_{\\text{cal}}$ حيث $m_1 = 0.2\\text{ kg}$.',
					revealAr:
						'$0.2 \\times 4185 + 80 = 837 + 80 = 917\\text{ J/}^\\circ\\text{C}$.'
				},
				{
					promptAr: 'بافتراض أن المسعر معزول حرارياً ($\\sum Q_i = 0$)، كيف نجد درجة حرارة التوازن النهائية $\\theta_f$؟',
					hintAr: 'الجليد يمتص $m_2 L_f + m_2 c_{\\text{eau}}(\\theta_f - 0)$، والماء والمسعر يفقدان $(m_1 c_{\\text{eau}} + C_{\\text{cal}})(\\theta_f - 20)$.',
					revealAr:
						'معادلة التوازن الحراري: $16750 + 0.05(4185)\\theta_f + 917(\\theta_f - 20) = 0 \\implies 1126.25\\theta_f = 1590 \\implies \\theta_f \\approx 1.41^\\circ\\text{C}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**التحويل الحراري بدون تغير الحالة الفيزيائية**:\n$$Q = m \\cdot c \\cdot (\\theta_f - \\theta_i) = C_{\\text{th}} \\cdot \\Delta\\theta$$\nحيث $c$ السعة الحرارية الكتلية ($\\text{J/(kg}\\cdot^\\circ\\text{C)}$) و $C_{\\text{cal}} = \\mu \\cdot c_{\\text{eau}}$ السعة الحرارية للمسعر ($\\mu$ مكافئته المائية).',
				'**التحويل الحراري المصاحب لتغير الحالة عند درجة حرارة ثابتة**:\n$$Q = m \\cdot L$$\n- للانصهار أو التبخر (تحويل ماص للحرارة): $Q = +m \\cdot L > 0$.\n- للتجمد أو التمييع (تحويل ناشر للحرارة): $Q = -m \\cdot L < 0$.',
				'**مبدأ التوازن الحراري داخل مسعر معزول (أدياباتيكي)**:\n$$\\sum Q_i = 0$$'
			],
			visualSvg: svgCalorimetryHeatingCurve(),
			visualCaptionAr: 'مراحل امتصاص التحويل الحراري: تسخين الجسم الصلب، ثم ثبات الحرارة أثناء الانصهار، ثم تسخين السائل',
			examples: [
				{
					problemAr:
						'نمزج $100\\text{ g}$ ماء عند $20^\\circ\\text{C}$ مع $100\\text{ g}$ ماء عند $60^\\circ\\text{C}$ في مسعر مهمل السعة الحرارية. أوجد درجة حرارة التوازن $\\theta_f$.',
					solutionAr:
						'بتطبيق $\\sum Q_i = 0$: $m_1 c(\\theta_f - 20) + m_2 c(\\theta_f - 60) = 0$.\nبما أن $m_1 = m_2$ نجد: $2\\theta_f = 80 \\implies \\theta_f = 40^\\circ\\text{C}$.'
				}
			],
			watchOutAr:
				'في معادلة $\\sum Q_i = 0$ اكتب دوماً $(\\theta_f - \\theta_i)$ ولا تعكس الترتيب أبداً! بهذه الطريقة يأخذ $Q$ تلقائياً إشارة موجبة للطرف البارد الذي يكتسب حرارة، وإشارة سالبة للطرف الساخن الذي يفقد حرارة.'
		},
		practice: [
			{
				questionAr:
					'ما مقدار التحويل الحراري اللازم لرفع درجة حرارة $500\\text{ g}$ من الماء من $20^\\circ\\text{C}$ إلى $80^\\circ\\text{C}$ ($c_{\\text{eau}} = 4180\\text{ J/(kg}\\cdot^\\circ\\text{C)}$)؟',
				options: ['$125.4\\text{ kJ}$', '$125.4\\text{ MJ}$', '$250.8\\text{ kJ}$', '$41.8\\text{ kJ}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $Q = 0.5 \\times 4180 \\times (80 - 20) = 2090 \\times 60 = 125400\\text{ J} = 125.4\\text{ kJ}$.',
					'خطأ تشخيصي: نسيت تحويل الكتلة $500\\text{ g}$ إلى الكيلوغرام ($0.5\\text{ kg}$).',
					'خطأ تشخيصي: حسبت لكتلة $1\\text{ kg}$ بدلاً من $0.5\\text{ kg}$.',
					'خطأ تشخيصي: ضربت في $\\theta_i = 20$ بدلاً من $\\Delta\\theta = 60^\\circ\\text{C}$.'
				],
				explanationAr:
					'نحول $m = 0.5\\text{ kg}$ و $\\Delta\\theta = 80 - 20 = 60^\\circ\\text{C}$، ثم نحسب: $Q = 0.5 \\times 4180 \\times 60 = 125400\\text{ J} = 125.4\\text{ kJ}$.'
			},
			{
				questionAr:
					'عند صهر كتلة $m = 200\\text{ g}$ من الجليد عند درجة $0^\\circ\\text{C}$ ($L_f = 335\\text{ kJ/kg}$)، فإن التحويل الحراري الممتص يساوي:',
				options: ['$67\\text{ kJ}$', '$67000\\text{ kJ}$', '$167.5\\text{ kJ}$', '$-67\\text{ kJ}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $Q = 0.2 \\times 335\\text{ kJ/kg} = 67\\text{ kJ}$.',
					'خطأ تشخيصي: ضربت في $200\\text{ g}$ دون التحويل إلى $\\text{kg}$.',
					'خطأ تشخيصي: حسبت لنصف كيلوغرام بدلاً من $0.2\\text{ kg}$.',
					'خطأ تشخيصي: الانصهار تحول ماص للحرارة لذا إشارته موجبة.'
				],
				explanationAr:
					'الانصهار عملية ماصة للحرارة، وبتحويل الكتلة $m = 0.2\\text{ kg}$ يكون $Q = m \\cdot L_f = 0.2 \\times 335 = 67\\text{ kJ}$.'
			},
			{
				questionAr:
					'يحتوي مسعر حراري سعته الحرارية $C_{\\text{cal}} = 100\\text{ J/}^\\circ\\text{C}$ على $0.2\\text{ kg}$ ماء ($c = 4180\\text{ J/(kg}\\cdot^\\circ\\text{C)}$) عند $20^\\circ\\text{C}$. إذا أدخلنا قطعة نحاس ساخنة تتناقص حرارتها إلى $\\theta_f = 25^\\circ\\text{C}$، فكم امتصت الجملة (مسعر + ماء)؟',
				options: ['$4680\\text{ J}$', '$4180\\text{ J}$', '$500\\text{ J}$', '$4280\\text{ J}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $Q = (m c + C_{\\text{cal}})\\Delta\\theta = (0.2 \\times 4180 + 100)(25 - 20) = 936 \\times 5 = 4680\\text{ J}$.',
					'خطأ تشخيصي: أهملت السعة الحرارية للمسعر $C_{\\text{cal}}$.',
					'خطأ تشخيصي: حسبت الحرارة الممتصة من طرف المسعر وحده.',
					'خطأ تشخيصي: نسيت ضرب $C_{\\text{cal}}$ في $\\Delta\\theta = 5^\\circ\\text{C}$.'
				],
				explanationAr:
					'يمتص الماء والمسعر معاً كمية الحرارة: $Q = (0.2 \\times 4180 + 100)(25 - 20) = (836 + 100) \\times 5 = 4680\\text{ J}$.'
			}
		]
	},

	// [5] Energy & Citizenship (used in T2 for SE and merged in T1 for TM/MATH)
	{
		id: 'phy_lesson_2as_shared_t1_energy_citizenship',
		slug: '2as_shared-t1-energy-citizenship',
		grade: '2as_se',
		yearSubjectId: 673,
		trimesterId: 't1',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الطاقة والمواطنة',
		order: 6,
		titleAr: 'الطاقة والمواطنة (الطاقات المتجددة وتخزين الطاقة)',
		objectives: [
			'التعرف على مصادر الطاقة المتجددة وغير المتجددة وحساب مردود التحويل الطاقوي',
			'مناقشة قضايا ترشيد استهلاك الطاقة وحماية البيئة من الانبعاثات الحرارية والغازية'
		],
		keywordsAr: ['الطاقة والمواطنة', 'الطاقات المتجددة', 'مردود التحويل'],
		discover: {
			scenarioAr:
				'تعتمد الجزائر مشاريع كبرى للطاقة الشمسية الكهروضوئية في الهضاب العليا والجنوب. يستقبل لوح شمسي مساحته $S = 2\\text{ m}^2$ استطاعة إشعاعية شمسية $P_r = 1000\\text{ W/m}^2$، ويحولها إلى استطاعة كهربائية مفيدة $P_e = 360\\text{ W}$.',
			steps: [
				{
					promptAr: 'احسب الاستطاعة الكلية المستقبلة $P_{\\text{tot}}$ من الشمس على سطح اللوح.',
					hintAr: 'اضرب الاستطاعة الإشعاعية السطحية في المساحة $S$.',
					expectedInput: '2000 W',
					revealAr:
						'$P_{\\text{tot}} = 1000 \\times 2 = 2000\\text{ W}$.'
				},
				{
					promptAr: 'ما هو مردود التحويل $\\eta$ لهذا اللوح الشمسي؟',
					hintAr: '$\\eta = \\frac{P_{\\text{مفيدة}}}{P_{\\text{مستهلكة}}} \\times 100\\%$.',
					expectedInput: '18%',
					revealAr:
						'$\\eta = \\frac{360}{2000} = 0.18 = 18\\%$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**مصادر الطاقة**:\n- **الطاقات غير المتجددة (الأحفورية والنووية)**: البترول، الغاز الطبيعي، الفحم، اليورانيوم (مخزون محدود وتسبب انبعاثات غازات الدفيئة مثل $\\ce{CO2}$).\n- **الطاقات المتجددة**: الشمسية (كهروضوئية وحرارية)، الهوائية (الرياح)، المائية، الجيوحرارية، والكتلة الحيوية.',
				'**مردود التحويل الطاقوي**:\n$$\\eta = \\frac{E_{\\text{مفيدة}}}{E_{\\text{الممتصة}}} = \\frac{P_{\\text{مفيدة}}}{P_{\\text{الممتصة}}} < 1$$\nالفرق $E_{\\text{ضائعة}} = E_{\\text{الممتصة}} - E_{\\text{مفيدة}}$ يتحول غالباً إلى حرارة (طاقة داخلية مبددة للمحيط).'
			],
			examples: [
				{
					problemAr:
						'محرك كهربائي يمتص طاقة $E_a = 5000\\text{ J}$ ويقدم عملاً ميكانيكياً مفيداً $W_u = 4250\\text{ J}$. احسب المردود الطاقوي والطاقة الضائعة.',
					solutionAr:
						'المردود: $\\eta = \\frac{4250}{5000} = 0.85 = 85\\%$.\nالطاقة الضائعة حرارياً: $Q_{\\text{ضائعة}} = 5000 - 4250 = 750\\text{ J}$.'
				}
			],
			watchOutAr:
				'المردود $\\eta$ دوماً مقدار بدون وحدة محصور بين $0$ و $1$ (أو بين $0\\%$ و $100\\%$). إذا وجدت $\\eta > 100\\%$ فهناك خلل في تحديد الطاقة المفيدة والطاقة الممتصة.'
		},
		practice: [
			{
				questionAr:
					'يستقبل محول طاقة $800\\text{ J}$ من الطاقة الكهربائية ويبدد $200\\text{ J}$ على شكل حرارة. ما هو مردود هذا الجهاز؟',
				options: ['$75\\%$', '$25\\%$', '$80\\%$', '$60\\%$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! الطاقة المفيدة هي $800 - 200 = 600\\text{ J}$، ومنه $\\eta = \\frac{600}{800} = 75\\%$.',
					'خطأ تشخيصي: هذه نسبة الطاقة الضائعة وليست نسبة المردود المفيد.',
					'خطأ تشخيصي: تحقق من القسمة $\\frac{600}{800}$.',
					'خطأ تشخيصي: المردود يُحسب بنسبة الطاقة المفيدة إلى الممتصة.'
				],
				explanationAr:
					'الطاقة المفيدة $E_u = 800 - 200 = 600\\text{ J}$، وبالتالي $\\eta = \\frac{600}{800} = 0.75 = 75\\%$.'
			},
			{
				questionAr:
					'أي من مصادر الطاقة التالية يُصنف ضمن الطاقات المتجددة النظيفة؟',
				options: ['الطاقة الهوائية والشمسية', 'الغاز الطبيعي', 'الفحم الحجري', 'البترول'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! الشمس والرياح مصادر طبيعية متجددة باستمرار ولا تلوث الجو.',
					'خطأ تشخيصي: الغاز الطبيعي طاقة أحفورية غير متجددة.',
					'خطأ تشخيصي: الفحم الحجري مصدر أحفوري ملوث وغير متجدد.',
					'خطأ تشخيصي: البترول طاقة أحفورية غير متجددة.'
				],
				explanationAr:
					'الطاقة الشمسية والهوائية والمائية مصادر متجددة لا تنضب ولا تطلق غازات دفيئة أثناء التشغيل.'
			},
			{
				questionAr:
					'يُفضل استبدال المصابيح المتوهجة بمصابيح $\\text{LED}$ لأن مصابيح $\\text{LED}$:',
				options: [
					'تملك مردوداً ضوئياً أعلى وتبدد طاقة حرارية أقل',
					'تستعمل تياراً بدون توتر كهربائي',
					'تنتج طاقة أكبر من الطاقة الكهربائية التي تستهلكها',
					'لها استطاعة كهربائية أكبر لنفس الإضاءة'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! تحول مصابيح LED معظم الطاقة الكهربائية إلى إشعاع ضوئي وتقلل الضياع الحراري.',
					'خطأ تشخيصي: كل الأجهزة الكهربائية تحتاج توتراً وتياراً لتشتغل.',
					'خطأ تشخيصي: هذا يناقض مبدأ انحفاظ الطاقة.',
					'خطأ تشخيصي: تستهلك مصابيح LED استطاعة أقل بكثير لنفس شدة الإضاءة.'
				],
				explanationAr:
					'ترتفع كفاءة مصابيح $\\text{LED}$ لأنها تحول نسبة كبيرة من الطاقة الكهربائية إلى ضوء وتقلل التحويل الحراري الضائع.'
			}
		]
	}
];
