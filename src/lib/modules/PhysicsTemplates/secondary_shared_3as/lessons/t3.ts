import {
	buildIceTable,
	chemEquation,
	chemSpecies,
	nuclearEquation,
	nuclide
} from '../../chem-helpers';
import {
	svgNuclearEnergyDiagram,
	svgPhysicsCurvePlot,
	wrapPhysicsSvg
} from '../../svg-physics';
import type { SharedPhysicsLesson } from './t1';

// ═══════════════════════════════════════════════════════════════════════════════
// Custom crisp SVGs & Chem/Nuclear Helpers for T3 Shared Lessons
// ═══════════════════════════════════════════════════════════════════════════════

const eqC14Decay = nuclearEquation(
	[{ A: 14, Z: 6, symbol: 'C' }],
	[
		{ A: 14, Z: 7, symbol: 'N' },
		{ A: 0, Z: -1, symbol: 'e' }
	]
);

const eqFissionU235 = nuclearEquation(
	[
		{ A: 235, Z: 92, symbol: 'U' },
		{ A: 1, Z: 0, symbol: 'n' }
	],
	[
		{ A: 94, Z: 38, symbol: 'Sr' },
		{ A: 139, Z: 54, symbol: 'Xe' },
		{ coeff: 3, A: 1, Z: 0, symbol: 'n' }
	]
);

const eqEsterification = chemEquation(
	[
		{ formula: 'CH3COOH', state: 'l' },
		{ formula: 'C2H5OH', state: 'l' }
	],
	[
		{ formula: 'CH3COOC2H5', state: 'l' },
		{ formula: 'H2O', state: 'l' }
	],
	{ reversible: true }
);

const iceEsterLesson = buildIceTable({
	equation: eqEsterification,
	speciesHeaders: [
		chemSpecies('CH3COOH'),
		chemSpecies('C2H5OH'),
		chemSpecies('CH3COOC2H5'),
		chemSpecies('H2O')
	],
	initial: [
		{ katex: '$n_0$', typst: '$n_0$' },
		{ katex: '$n_0$', typst: '$n_0$' },
		{ katex: '$0$', typst: '$0$' },
		{ katex: '$0$', typst: '$0$' }
	],
	intermediate: [
		{ katex: '$n_0 - x$', typst: '$n_0 - x$' },
		{ katex: '$n_0 - x$', typst: '$n_0 - x$' },
		{ katex: '$x$', typst: '$x$' },
		{ katex: '$x$', typst: '$x$' }
	],
	final: [
		{ katex: '$n_0 - x_f$', typst: '$n_0 - x_f$' },
		{ katex: '$n_0 - x_f$', typst: '$n_0 - x_f$' },
		{ katex: '$x_f$', typst: '$x_f$' },
		{ katex: '$x_f$', typst: '$x_f$' }
	]
});

const svgDecayCurve = svgPhysicsCurvePlot({
	title: 'قانون التناقص الإشعاعي N(t) = N₀ e^(-λt) وزمن نصف العمر t₁/₂',
	xMin: 0,
	xMax: 24,
	yMin: 0,
	yMax: 1.1,
	xStep: 4,
	yStep: 0.2,
	xLabel: 't (ans × 10³)',
	yLabel: 'N(t) / N₀',
	curves: [
		{
			fn: (t) => Math.exp((-Math.LN2 * t) / 5.73),
			color: '#2563eb',
			label: '¹⁴C (t₁/₂ = 5730 ans)'
		}
	],
	dashedGuides: [
		{ x1: 0, y1: 1, x2: 8.27, y2: 0, color: '#d97706', label: 'τ ≈ 8270 ans', labelPos: 'right' },
		{ x1: 0, y1: 0.5, x2: 5.73, y2: 0.5, color: '#dc2626' },
		{ x1: 5.73, y1: 0, x2: 5.73, y2: 0.5, color: '#dc2626' }
	],
	points: [
		{ x: 5.73, y: 0.5, label: 't₁/₂', color: '#dc2626' },
		{ x: 8.27, y: 0.368, label: '(τ, 0.37)', color: '#d97706' }
	]
});

const svgAstonCurve = wrapPhysicsSvg(
	420,
	215,
	`<rect x="8" y="8" width="404" height="199" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>` +
		`<text x="210" y="27" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">منحنى أستون: تغيرات −E_ℓ/A بدلالة العدد الكتلي A</text>` +
		`<defs><marker id="asArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#0f172a"/></marker></defs>` +
		`<line x1="48" y1="175" x2="392" y2="175" stroke="#0f172a" stroke-width="1.5" marker-end="url(#asArr)"/>` +
		`<line x1="48" y1="175" x2="48" y2="42" stroke="#0f172a" stroke-width="1.5" marker-end="url(#asArr)"/>` +
		`<text x="394" y="190" text-anchor="end" font-size="11" font-weight="bold">A</text>` +
		`<text x="42" y="48" text-anchor="end" font-size="10.5" font-weight="bold">−E_ℓ/A</text>` +
		// Valley curve
		`<path d="M 55,62 Q 80,148 145,155 T 370,136" fill="none" stroke="#2563eb" stroke-width="2.4"/>` +
		// Stability zone Fe-56
		`<rect x="115" y="138" width="76" height="24" rx="4" fill="rgba(5,150,105,0.14)" stroke="#059669" stroke-dasharray="3,2"/>` +
		`<circle cx="145" cy="155" r="3.5" fill="#059669"/>` +
		`<text x="145" y="132" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#059669">منطقة الاستقرار (⁵⁶Fe)</text>` +
		// Fusion arrow
		`<line x1="64" y1="74" x2="112" y2="128" stroke="#dc2626" stroke-width="2" marker-end="url(#asArr)"/>` +
		`<text x="98" y="84" font-size="10.5" font-weight="bold" fill="#dc2626">اندماج (أنوية خفيفة)</text>` +
		// Fission arrow
		`<line x1="352" y1="132" x2="215" y2="146" stroke="#d97706" stroke-width="2" marker-end="url(#asArr)"/>` +
		`<text x="292" y="122" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#d97706">انشطار (أنوية ثقيلة ²³⁵U)</text>`
);

const svgEsterificationCurve = svgPhysicsCurvePlot({
	title: 'حركية تفاعل الأسترة (تساوي المولات الابتدائية n₀ = 1 mol)',
	xMin: 0,
	xMax: 12,
	yMin: 0,
	yMax: 1.1,
	xStep: 2,
	yStep: 0.2,
	xLabel: 't (h)',
	yLabel: 'n_ester (mol)',
	curves: [
		{
			fn: (t) => 0.67 * (1 - Math.exp(-t / 1.8)),
			color: '#2563eb',
			label: 'بدون وسيط (T₁)'
		},
		{
			fn: (t) => 0.67 * (1 - Math.exp(-t / 0.7)),
			color: '#059669',
			dashed: true,
			label: 'بإضافة H₂SO₄ ورفع T'
		}
	],
	dashedGuides: [
		{ x1: 0, y1: 0.67, x2: 12, y2: 0.67, color: '#dc2626', label: 'n_f = 0.67 mol (مردود 67%)', labelPos: 'top' }
	],
	points: [{ x: 0, y: 0.67, label: '0.67', color: '#dc2626' }]
});

const RAW_SHARED_PHYSICS_LESSONS_3AS_T3: SharedPhysicsLesson[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 1: Radioactivity, Segrè (N,Z), Decay Law & Carbon-14 Dating
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'phy_lesson_3as_shared_t3_radioactivity_decay_law',
		slug: 'phy-3as-shared-t3-radioactivity-decay-law',
		grade: '3as_se',
		yearSubjectId: 683,
		trimesterId: 't3',
		sequenceId: 'seq6',
		sequenceTitleAr: 'الوحدة 5: التحولات النووية',
		order: 1,
		domain: 'nuclear',
		titleAr: 'النشاط الإشعاعي، مخطط $(N, Z)$، وقانون التناقص الإشعاعي والتأريخ',
		objectives: [
			'تفسير استقرار الأنوية بمخطط سيغري $(N, Z)$ وكتابة معادلات التفكك $(\\alpha, \\beta^-, \\beta^+, \\gamma)$ بتطبيق قانوني صودي',
			'توظيف قانون التناقص الإشعاعي $N(t) = N_0 e^{-\\lambda t}$ والنشاط $A(t) = \\lambda N(t)$ وزمن نصف العمر $t_{1/2}$ في التأريخ'
		],
		keywordsAr: ['النشاط الإشعاعي', 'قانونا صودي', 'قانون التناقص الإشعاعي', 'ثابت التفكك λ', 'التأريخ'],
		discover: {
			scenarioAr:
				`في علم الآثار، يُستعمل الكربون المشع ${nuclide(14, 6, 'C').katex} (نصف عمره $t_{1/2} = 5730\\text{ ans}$) لتأريخ البقايا العضوية. يتفكك وفق النمط $\\beta^-$ إلى الآزوت ${nuclide(14, 7, 'N').katex}. قاس مخبر نشاط عينة خشبية قديمة فوجد أن نشاطها يساوي ربع ($25\\%$) نشاط عينة حديثة لها نفس الكتلة.`,
			svg: svgDecayCurve,
			steps: [
				{
					promptAr:
						'اكتب معادلة التفكك الإشعاعي للكربون 14 مع التحقق من قانوني صودي للانحفاظ.',
					hintAr: 'في التفكك $\\beta^-$ ينبعث إلكترون ${}^{0}_{-1}\\mathrm{e}$ مع حفظ $A$ و $Z$.',
					expectedInput: eqC14Decay.katex,
					revealAr:
						`معادلة التفكك هي: ${eqC14Decay.katex}، حيث $14 = 14 + 0$ (انحفاظ العدد الكتلي $A$) و $6 = 7 + (-1)$ (انحفاظ العدد الذري $Z$).`
				},
				{
					promptAr:
						'ما العلاقة بين ثابت التفكك $\\lambda$ وزمن نصف العمر $t_{1/2}$؟ واحسب عمر العينة الخشبية إذا كان $A(t) = \\frac{1}{4}A_0$.',
					hintAr: '$\\frac{1}{4} = \\left(\\frac{1}{2}\\right)^2$، أي انقضى زمنا نصف عمر $2 t_{1/2}$.',
					expectedInput: '11460',
					revealAr:
						'$t_{1/2} = \\frac{\\ln 2}{\\lambda}$. وبما أن $A(t) = A_0 e^{-\\lambda t} = \\frac{A_0}{4} \\implies e^{\\lambda t} = 4 \\implies t = \\frac{\\ln 4}{\\lambda} = 2 t_{1/2} = 2 \\times 5730 = 11\\,460\\text{ ans}$.'
				},
				{
					promptAr:
						'احسب ثابت الزمن $\\tau = \\frac{1}{\\lambda}$ لعنصر الكربون 14 بالسنوات (مقرباً إلى أقرب عدد صحيح، $\\ln 2 \\approx 0.693$).',
					hintAr: '$\\tau = \\frac{t_{1/2}}{\\ln 2}$.',
					expectedInput: '8268',
					revealAr:
						'$\\tau = \\frac{5730}{0.69315} \\approx 8267\\text{ إلى }8268\\text{ ans}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**تركيب النواة والنظائر**: تتكون النواة ${}^{A}_{Z}\\mathrm{X}$ من $Z$ بروتون و $N = A - Z$ نيوترون. النظائر أنوية لها نفس $Z$ وتختلف في $A$.',
				'**قانونا صودي للانحفاظ**: في أي تحول نووي ينحفظ العدد الكتلي $A$ والعدد الشحني $Z$. أنماط التفكك: $\\alpha$ (انبعاث ${}^{4}_{2}\\mathrm{He}$)، $\\beta^-$ (انبعاث ${}^{0}_{-1}\\mathrm{e}$ في منطقة فائض النيوترونات فوق حزام الاستقرار)، $\\beta^+$ (انبعاث ${}^{0}_{+1}\\mathrm{e}$ في منطقة فائض البروتونات)، و $\\gamma$ (إزالة إثارة نواة وليدة).',
				'**قانون التناقص الإشعاعي**:\n$$\nN(t) = N_0 e^{-\\lambda t}, \\qquad m(t) = m_0 e^{-\\lambda t}, \\qquad A(t) = -\\frac{dN}{dt} = \\lambda N(t) = A_0 e^{-\\lambda t}\n$$\nوحدة النشاط $A$ هي البيكريل ($1\\text{ Bq} = 1\\text{ تفكك/ثانية}$).',
				'**نصف العمر $t_{1/2}$ وثابت الزمن $\\tau$**: $t_{1/2} = \\frac{\\ln 2}{\\lambda} = \\tau\\ln 2$. عند $t = n\\,t_{1/2}$ يكون $N(t) = \\frac{N_0}{2^n}$. عدد الأنوية الابتدائية من الكتلة $m_0$: $N_0 = \\frac{m_0}{M} N_A$.'
			],
			visualSvg: svgDecayCurve,
			visualCaptionAr: 'منحنى التناقص الإشعاعي وتعيين $t_{1/2}$ و $\\tau$',
			examples: [
				{
					problemAr:
						'عينة من اليود المشع ${}^{131}_{53}\\mathrm{I}$ ($t_{1/2} = 8\\text{ jours}$) كتلتها الابتدائية $m_0 = 2.0\\text{ mg}$ ($N_A = 6.02\\times 10^{23}\\text{ mol}^{-1}$). احسب النشاط الابتدائي $A_0$ بالبيكريل.',
					solutionAr:
						'نحسب $N_0 = \\frac{2.0\\times 10^{-3}}{131}\\times 6.02\\times 10^{23} \\approx 9.19\\times 10^{18}\\text{ نواة}$. ونحوّل $t_{1/2} = 8 \\times 86400 = 6.912\\times 10^5\\text{ s} \\implies \\lambda = \\frac{\\ln 2}{6.912\\times 10^5} \\approx 1.003\\times 10^{-6}\\text{ s}^{-1}$. ومنه $A_0 = \\lambda N_0 \\approx 9.22\\times 10^{12}\\text{ Bq}$.'
				}
			],
			watchOutAr:
				'عند حساب النشاط $A(t) = \\lambda N(t)$ بالبيكريل ($\\text{Bq} = \\text{s}^{-1}$)، يجب حتماً تحويل ثابت التفكك $\\lambda$ إلى $\\text{s}^{-1}$ بتحويل $t_{1/2}$ إلى الثواني!'
		},
		practice: [
			{
				questionAr: 'في التفكك الإشعاعي من النمط $\\beta^+$، تتحول نواة ${}^{A}_{Z}\\mathrm{X}$ إلى نواة ابنة:',
				options: [
					'${}^{A}_{Z-1}\\mathrm{Y} + {}^{0}_{+1}\\mathrm{e}$',
					'${}^{A}_{Z+1}\\mathrm{Y} + {}^{0}_{-1}\\mathrm{e}$',
					'${}^{A-4}_{Z-2}\\mathrm{Y} + {}^{4}_{2}\\mathrm{He}$',
					'${}^{A-1}_{Z}\\mathrm{Y} + {}^{1}_{0}\\mathrm{n}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'هذا تفكك $\\beta^-$ الذي يظهر في الأنوية الغنية بالنيوترونات.',
					'هذا تفكك $\\alpha$.',
					'تفكك $\\beta^+$ يحفظ العدد الكتلي $A$.'
				],
				explanationAr:
					'بتطبيق قانوني صودي مع انبعاث البوزيترون ${}^{0}_{+1}\\mathrm{e}$، يبقى $A$ ثابتاً وينقص $Z$ بمقدار $1$.'
			},
			{
				questionAr:
					'يمثل البيان $\\ln A(t)$ بدلالة الزمن $t$ مستقيماً معادلته $\\ln A = -0.05\\,t + 15$ (حيث $t$ بالساعات). زمن نصف العمر $t_{1/2}$ يساوي تقريباً:',
				options: ['13.86 h', '20 h', '0.05 h', '6.93 h'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'تلك قيمة ثابت الزمن $\\tau = 1/0.05 = 20\\text{ h}$؛ نسيت ضربها في $\\ln 2$.',
					'تلك قيمة $\\lambda$ وليست $t_{1/2}$.',
					'تحقق من $\\ln 2 / 0.05$.'
				],
				explanationAr:
					'ميل المستقيم هو $-\\lambda = -0.05\\text{ h}^{-1}$، ومنه $t_{1/2} = \\frac{\\ln 2}{0.05} \\approx 13.86\\text{ h}$.'
			},
			{
				questionAr: 'بعد مرور مدة زمنية $t = 3\\,t_{1/2}$، النسبة المتبقية من الأنوية المشعة $\\frac{N(t)}{N_0}$ تساوي:',
				options: ['$12.5\\%$', '$25\\%$', '$33.3\\%$', '$87.5\\%$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'$25\\%$ توافق $t = 2\\,t_{1/2}$.',
					'التناقص أسي وليس خطياً.',
					'$87.5\\%$ هي نسبة الأنوية **المتفككة** وليست المتبقية.'
				],
				explanationAr:
					'$\\frac{N(3t_{1/2})}{N_0} = \\frac{1}{2^3} = \\frac{1}{8} = 0.125 = 12.5\\%$.'
			},
			{
				questionAr: 'التحول النووي العفوي يكون مستقلاً عن:',
				options: [
					'درجة الحرارة والضغط والتركيب الكيميائي للعينة',
					'ثابت التفكك الإشعاعي $\\lambda$',
					'زمن نصف العمر $t_{1/2}$',
					'العدد الابتدائي للأنوية $N_0$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'$\\lambda$ هو المميز الأساسي لاحتمال التفكك.',
					'$t_{1/2} = \\ln 2/\\lambda$ يحدد سرعة التناقص.',
					'$N_0$ يحدد النشاط الابتدائي $A_0 = \\lambda N_0$.'
				],
				explanationAr:
					'النشاط الإشعاعي ظاهرة عشوائية، تلقائية، حتمية، ومستقلة عن العوامل الفيزيوكيميائية الخارجية (الضغط، الحرارة، الروابط الكيميائية).'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 2: Binding Energy, Aston Curve, Fission & Fusion
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'phy_lesson_3as_shared_t3_nuclear_fission_fusion_energy',
		slug: 'phy-3as-shared-t3-nuclear-fission-fusion-energy',
		grade: '3as_se',
		yearSubjectId: 683,
		trimesterId: 't3',
		sequenceId: 'seq6',
		sequenceTitleAr: 'الوحدة 5: التحولات النووية',
		order: 2,
		domain: 'nuclear',
		titleAr: 'طاقة الربط، منحنى أستون، وتفاعلات الانشطار والاندماج النووي',
		objectives: [
			'حساب النقص الكتلي $\\Delta m$ وطاقة الربط $E_\\ell$ وطاقة الربط لكل نوية $\\frac{E_\\ell}{A}$ ومقارنة استقرار الأنوية عبر منحنى أستون',
			'حساب الطاقة المحررة $E_{\\text{lib}}$ من تفاعلات الانشطار والاندماج النووي بوحدة $\\text{MeV}$ والجول'
		],
		keywordsAr: ['طاقة الربط', 'النقص الكتلي', 'منحنى أستون', 'الانشطار النووي', 'الاندماج النووي', 'الطاقة المحررة'],
		discover: {
			scenarioAr:
				`في مفاعل نووي، تنشطر نواة اليورانيوم 235 بقذفها بنيوترون بطيء وفق المعادلة: ${eqFissionU235.katex}. نُعطي: $m({}^{235}\\mathrm{U}) = 234.9935\\text{ u}$، $m({}^{94}\\mathrm{Sr}) = 93.8945\\text{ u}$، $m({}^{139}\\mathrm{Xe}) = 138.8892\\text{ u}$، $m_n = 1.00866\\text{ u}$، و $1\\text{ u}\\cdot c^2 = 931.5\\text{ MeV}$.`,
			svg: svgNuclearEnergyDiagram({
				topLabel: 'نويات منفصلة (Z p + N n)',
				reactantsLabel: '²³⁵U + ¹n',
				productsLabel: '⁹⁴Sr + ¹³⁹Xe + 3¹n',
				deltaELabel: '|ΔE_lib|'
			}),
			steps: [
				{
					promptAr:
						'احسب تغير الكتلة $|\\Delta m| = |(m_{\\text{نواتج}} - m_{\\text{متفاعلات}})|$ بوحدة الكتلة الذرية ($\\text{u}$) لهذا التفاعل.',
					hintAr: 'انتبه لوجود $3$ نيوترونات في النواتج مقابل نيوترون واحد في المتفاعلات (أو اختزل $n$ من الطرفين ليتبقى $2 m_n$).',
					expectedInput: '0.19248',
					revealAr:
						'$\\Delta m = (m_{\\text{Sr}} + m_{\\text{Xe}} + 2 m_n) - m_{\\text{U}} = (93.8945 + 138.8892 + 2.01732) - 234.9935 = -0.19248\\text{ u}$.'
				},
				{
					promptAr:
						'استنتج الطاقة المحررة $E_{\\text{lib}} = |\\Delta m|\\cdot c^2$ للانشطار الواحد بوحدة $\\text{MeV}$ (مقربة إلى رقم بعد الفاصلة).',
					hintAr: 'اضرب $|\\Delta m|$ في $931.5\\text{ MeV/u}$.',
					expectedInput: '179.3',
					revealAr:
						'$E_{\\text{lib}} = 0.19248 \\times 931.5 \\approx 179.3\\text{ MeV}$.'
				},
				{
					promptAr:
						'ما المردود الطاقوي النسبي إذا حُوّل إلى الجول ($1\\text{ MeV} = 1.6\\times 10^{-13}\\text{ J}$)؟ كم تساوي الطاقة المحررة بوحدة $10^{-11}\\text{ J}$؟',
					hintAr: '$E_{\\text{lib}}(\\text{J}) = 179.3 \\times 1.6\\times 10^{-13}$.',
					expectedInput: '2.87',
					revealAr:
						'$E_{\\text{lib}} = 179.3 \\times 1.6\\times 10^{-13} \\approx 2.87\\times 10^{-11}\\text{ J}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**علاقة أينشتاين والنقص الكتلي**: $E = m c^2$. النقص الكتلي لنواة ${}^{A}_{Z}\\mathrm{X}$ هو الفرق بين كتلة نوياتها منفصلة وكتلتها متماسكة: $\\Delta m = Z m_p + (A - Z) m_n - m({}^{A}_{Z}\\mathrm{X}) > 0$.',
				'**طاقة الربط وطاقة الربط لكل نوية**: $E_\\ell = \\Delta m \\cdot c^2$. تقاس مدى استقرار النواة بمقدار **طاقة الربط لكل نوية** $\\frac{E_\\ell}{A}$ (كلما كبرت القيمة كانت النواة أكثر استقراراً).',
				'**منحنى أستون**: يقع الأكثر استقراراً في قاع المنحنى ($40 < A < 180$، وخاصة الحديد ${}^{56}\\mathrm{Fe}$ حيث $E_\\ell/A \\approx 8.8\\text{ MeV/nucléon}$). تتطور الأنوية الخفيفة نحو الاستقرار بـ**الاندماج** والأنوية الثقيلة بـ**الانشطار**.',
				'**الطاقة المحررة في تفاعل نووي**: $E_{\\text{lib}} = |\\Delta E| = |\\sum m_{\\text{products}} - \\sum m_{\\text{reactants}}| c^2 = \\sum E_\\ell(\\text{products}) - \\sum E_\\ell(\\text{reactants})$.'
			],
			visualSvg: svgAstonCurve,
			visualCaptionAr: 'منحنى أستون وتحديد مناطق الاندماج والانشطار وقاع الاستقرار',
			examples: [
				{
					problemAr:
						'تندمج نواتا ديتيريوم ${}^{2}_{1}\\mathrm{H}$ وتريتيوم ${}^{3}_{1}\\mathrm{H}$ لإعطاء الهيليوم ${}^{4}_{2}\\mathrm{He}$ ونيوترون ${}^{1}_{0}\\mathrm{n}$. إذا كانت $E_\\ell({}^{2}\\mathrm{H}) = 2.22\\text{ MeV}$، $E_\\ell({}^{3}\\mathrm{H}) = 8.48\\text{ MeV}$، و $E_\\ell({}^{4}\\mathrm{He}) = 28.30\\text{ MeV}$، احسب $E_{\\text{lib}}$.',
					solutionAr:
						'النيوترون المنفرد ليس له طاقة ربط ($E_\\ell(n) = 0$). إذن $E_{\\text{lib}} = E_\\ell(\\text{نواتج}) - E_\\ell(\\text{متفاعلات}) = 28.30 - (2.22 + 8.48) = 17.60\\text{ MeV}$.'
				}
			],
			watchOutAr:
				'انتبه لإشارة فرق طاقات الربط في حساب $E_{\\text{lib}}$: بالكتل نكتب $m_{\\text{متفاعلات}} - m_{\\text{نواتج}}$، أما بطاقات الربط فنكتب $E_\\ell(\\text{نواتج}) - E_\\ell(\\text{متفاعلات})$ لأن النواتج أكثر استقراراً!'
		},
		practice: [
			{
				questionAr:
					'منحنى أستون يسمح بمقارنة استقرار الأنوية انطلاقاً من:',
				options: [
					'طاقة الربط لكل نوية $E_\\ell / A$',
					'الكتلة المولية الذرية $M$',
					'زمن نصف العمر $t_{1/2}$',
					'طاقة الربط الكلية $E_\\ell$ فقط'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'الكتلة المولية لا تحدد الاستقرار النووي.',
					'منحنى أستون يخص طاقة الربط لكل نوية وليس النشاط الإشعاعي.',
					'نواة اليورانيوم لها $E_\\ell$ كلية أكبر من الحديد لكنها أقل استقراراً لأن $E_\\ell/A$ أصغر.'
				],
				explanationAr:
					'النواة الأكثر استقراراً هي التي تملك أكبر قيمة لطاقة الربط لكل نوية $E_\\ell / A$.'
			},
			{
				questionAr: 'في تفاعل نووي ناشر للطاقة، تكون كتلة النواتج مقارنة بكتلة المتفاعلات:',
				options: [
					'أصغر من كتلة المتفاعلات ($\\Delta m < 0$)',
					'أكبر من كتلة المتفاعلات ($\\Delta m > 0$)',
					'مساوية لكتلة المتفاعلات ($\\Delta m = 0$)',
					'مضاعفة لكتلة المتفاعلات'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'زيادة الكتلة تعني امتصاص طاقة وليس تحريرها.',
					'الكتلة لا تنحفظ بدقة في التحولات النووية بل الكتلة-الطاقة.',
					'راجع تكافؤ كتلة-طاقة لأينشتاين.'
				],
				explanationAr:
					'يتحول النقص في الكتلة $|\\Delta m|$ إلى طاقة محررة وفق $E_{\\text{lib}} = |\\Delta m| c^2$.'
			},
			{
				questionAr: 'طاقة الربط لنواة الهيليوم ${}^{4}_{2}\\mathrm{He}$ تساوي $28.3\\text{ MeV}$. طاقة الربط لكل نوية فيها هي:',
				options: ['7.075 MeV/nucléon', '14.15 MeV/nucléon', '28.3 MeV/nucléon', '113.2 MeV/nucléon'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'قسمت على $Z = 2$ بدلاً من $A = 4$.',
					'نسيت القسمة على عدد النويات $A = 4$.',
					'ضربت في $4$ بدلاً من القسمة.'
				],
				explanationAr:
					'$\\frac{E_\\ell}{A} = \\frac{28.3}{4} = 7.075\\text{ MeV/nucléon}$.'
			},
			{
				questionAr:
					'إذا حرر انشطار كتلة $m = 1\\text{ g}$ من ${}^{235}\\mathrm{U}$ طاقة $E = 8.2\\times 10^{10}\\text{ J}$، فكم تساوي هذه الطاقة بـ $\\text{MeV}$ ($1\\text{ MeV} = 1.6\\times 10^{-13}\\text{ J}$)?',
				options: [
					'$5.125\\times 10^{23}\\text{ MeV}$',
					'$1.31\\times 10^{-2}\\text{ MeV}$',
					'$5.125\\times 10^{20}\\text{ MeV}$',
					'$8.2\\times 10^{23}\\text{ MeV}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'ضربت في $1.6\\times 10^{-13}$ بدلاً من القسمة عليها.',
					'خطأ في قوى العشرة عند القسمة.',
					'نسيت القسمة على $1.6$.'
				],
				explanationAr:
					'$E(\\text{MeV}) = \\frac{8.2\\times 10^{10}}{1.6\\times 10^{-13}} = 5.125\\times 10^{23}\\text{ MeV}$.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 3: Spontaneous Evolution & Esterification / Hydrolysis / Saponification
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'phy_lesson_3as_shared_t3_spontaneous_evolution_esterification',
		slug: 'phy-3as-shared-t3-spontaneous-evolution-esterification',
		grade: '3as_se',
		yearSubjectId: 683,
		trimesterId: 't3',
		sequenceId: 'seq7',
		sequenceTitleAr: 'الوحدة 6: مراقبة تطور جملة كيميائية والتحضير للبكالوريا',
		order: 3,
		domain: 'organic_chem',
		titleAr: 'التطور التلقائي لجملة كيميائية وتفاعلات الأسترة وإماهة الأستر',
		objectives: [
			'توقع جهة التطور التلقائي لجملة كيميائية بمقارنة $Q_{r,i}$ مع ثابت التوازن $K$',
			'كتابة معادلة الأسترة وإماهة الأستر، تحديد خصائصها ومردودها، وتوظيف العوامل المراقبة للسرعة والمردود (كلور الأسيل، التصبن، نزع الماء)'
		],
		keywordsAr: ['التطور التلقائي', 'الأسترة', 'إماهة الأستر', 'مردود التفاعل', 'التصبن', 'كلور الأسيل'],
		discover: {
			scenarioAr:
				`نمزج عند درجة حرارة ثابتة $1.0\\text{ mol}$ من حمض الإيثانويك $\\ce{CH3COOH}$ مع $1.0\\text{ mol}$ من الإيثانول $\\ce{C2H5OH}$ وبضع قطرات من حمض الكبريت المركّز، ثم نسخن المزيج بالتقطير المرتد وفق المعادلة: ${eqEsterification.katex} (حيث $K = 4$).`,
			svg: svgEsterificationCurve,
			steps: [
				{
					promptAr:
						'لماذا نستعمل التسخين بالتقطير المرتد (الارتداد) ونضيف قطرات من حمض الكبريت المركّز $\\ce{H2SO4}$؟',
					hintAr: 'تفاعل الأسترة بطيء ومحدود؛ ما دور الحرارة والوسيط والارتداد؟',
					expectedInput: 'تسريع التفاعل',
					revealAr:
						'رفع درجة الحرارة وإضافة حمض الكبريت المركز (وسيط) يسرعان التفاعل دون تغيير حالة التوازن النهائية، بينما يمنع التقطير المرتد ضياع الأبخرة المتطايرة من الوسط التفاعلي.'
				},
				{
					promptAr:
						'باستعمال جدول التقدم وثابت التوازن $K = \\frac{x_f^2}{(n_0 - x_f)^2} = 4$ عند $n_0 = 1\\text{ mol}$، احسب التقدم النهائي $x_f$ والمردود $r$ بالنسبة المئوية.',
					hintAr: 'خذ الجذر التربيعي للطرفين: $\\frac{x_f}{1 - x_f} = 2$.',
					expectedInput: '67',
					revealAr:
						'$\\frac{x_f}{1 - x_f} = 2 \\implies x_f = \\frac{2}{3} \\approx 0.67\\text{ mol}$، ومنه المردود $r = \\frac{x_f}{n_{\\max}}\\times 100 = 66.7\\% \\approx 67\\%$ (كحول أولي).'
				},
				{
					promptAr:
						'إذا أضفنا عند التوازن $1\\text{ mol}$ من الماء النقي دون تغيير باقي الكميات، ما قيمة كسر التفاعل الجديد $Q_r$، وفي أي جهة يتطور التفاعل تلقائياً؟',
					hintAr: 'احسب $Q_r = \\frac{0.67 \\times (0.67 + 1)}{0.33 \\times 0.33}$ وقارنه بـ $K = 4$.',
					expectedInput: 'العكسية',
					revealAr:
						'يرتفع البسط بسبب زيادة كمية الماء فيصبح $Q_r \\approx 10.3 > K = 4$، لذلك تتطور الجملة تلقائياً في **الجهة العكسية** (إماهة الأستر).'
				}
			]
		},
		summary: {
			rulesAr: [
				'**معيار التطور التلقائي**: بمقارنة كسر التفاعل الابتدائي $Q_{r,i}$ مع ثابت التوازن $K$: إذا كان $Q_{r,i} < K$ تتطور الجملة في الجهة المباشرة؛ $Q_{r,i} > K$ في الجهة العكسية؛ $Q_{r,i} = K$ الجملة في حالة توازن.',
				'**الأسترة وإماهة الأستر**: الأسترة ($\\text{حمض} + \\text{كحول} \\rightleftharpoons \\text{أستر} + \\text{ماء}$) وإماهة الأستر هما تحولان متعاكسان، **بطيئان، محدودان (غير تامين)، ولا حراريان**.',
				'**جدول تقدم الأسترة (مزيج متساوي المولات $n_0$)**:\n\n' + iceEsterLesson.markdownTable,
				'**مردود الأسترة لمزيج متساوي المولات**: للكحول **الأولي** $r = 67\\%$ ($K = 4$)، لل**ثانوي** $r = 60\\%$ ($K = 2.25$)، ولل**ثالثي** $r \\approx 5\\text{–}10\\%$. المردود مستقل عن درجة الحرارة والوسيط.',
				'**مراقبة المردود والسرعة**: لرفع المردود: (1) استعمال أحد المتفاعلين بزيادة، (2) نزع الماء أو الأستر أثناء التشكل، أو (3) استبدال الحمض بـ**كلور الأسيل** $\\ce{RCOCl}$ لجعل التفاعل **سريعاً وتاماً** ($r = 100\\%$). **التصبن**: إماهة الأستر في وسط قاعدي ($\\ce{OH-}$) لإعطاء كحول وصابون ($\\ce{RCOO- Na+}$) وهو تفاعل **تام**.'
			],
			visualSvg: svgEsterificationCurve,
			visualCaptionAr: 'تأثير الوسيط والحرارة على سرعة الأسترة مع ثبات المردود النهائي ($67\\%$)',
			examples: [
				{
					problemAr:
						'سمِّ الأستر $\\ce{HCOOC2H5}$ واكتب معادلة تصبنه بوجود الصودا $\\ce{NaOH}$.',
					solutionAr:
						'الاسم النظامي: **ميثانوات الإيثيل**. معادلة التصبن التامة: $\\ce{HCOOC2H5 + OH- -> HCOO- + C2H5OH}$.'
				}
			],
			watchOutAr:
				'في تفاعل الأسترة وإماهة الأستر: يدخل الماء $\\ce{H2O}$ حتماً في عبارة كسر التفاعل $Q_r = \\frac{n(\\text{ester})\\cdot n(\\text{H}_2\\text{O})}{n(\\text{acid})\\cdot n(\\text{alcohol})}$ لأنه ليس مذيباً بل متفاعل/ناتج عضوي!'
		},
		practice: [
			{
				questionAr: 'ما اسم الأستر ذي الصيغة نصف المفصلة $\\ce{CH3-CH2-COO-CH3}$؟',
				options: [
					'بروبانوات المثيل',
					'ميثانوات البروبيل',
					'إيثانوات الإيثيل',
					'بوتانوات المثيل'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'عكست شق الحمض (3 ذرات كربون = بروبانوات) وشق الكحول (ذرة واحدة = المثيل).',
					'إيثانوات الإيثيل يحوي ذرتي كربون في كل شق.',
					'عدّ ذرات الكربون في السلسلة الكربوكسيلية ($3$ ذرات).'
				],
				explanationAr:
					'الشق الحمضي $\\ce{CH3-CH2-COO-}$ يضم 3 ذرات كربون (بروبانوات) والشق الكحولي $\\ce{-CH3}$ يضم ذرة واحدة (المثيل).'
			},
			{
				questionAr:
					'عند مزج $1\\text{ mol}$ من حمض كربوكسيلي مع $1\\text{ mol}$ من كحول ثانوي ($K = 2.25$)، فإن المردود عند التوازن يساوي:',
				options: ['$60\\%$', '$67\\%$', '$50\\%$', '$100\\%$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'$67\\%$ يوافق الكحول الأولي ($K = 4$).',
					'تحقق من حل $\\frac{x_f}{1 - x_f} = \\sqrt{2.25} = 1.5$.',
					'الأسترة تفاعل محدود وليس تاماً.'
				],
				explanationAr:
					'$\\frac{x_f}{1 - x_f} = \\sqrt{2.25} = 1.5 \\implies x_f = \\frac{1.5}{2.5} = 0.60\\text{ mol} \\implies r = 60\\%$.'
			},
			{
				questionAr: 'لتحويل تفاعل الأسترة إلى تفاعل سريع وتام بمردود $100\\%$، نستبدل الحمض الكربوكسيلي بـ:',
				options: [
					'كلور الأسيل $\\ce{R-COCl}$',
					'كمية إضافية من حمض الكبريت $\\ce{H2SO4}$',
					'الماء المقطر بوفرة',
					'التبريد في حمام جليدي'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'حمض الكبريت وسيط يسرع التفاعل فقط ولا يجعله تاماً.',
					'الماء يزيح التوازن نحو إماهة الأستر فيخفض المردود.',
					'التبريد يبطئ التفاعل ولا يغير التوازن.'
				],
				explanationAr:
					'تفاعل كلور الأسيل مع الكحول ($\ce{RCOCl + R\'OH -> RCOOR\' + HCl}$) تفاعل سريع، ناشر للحرارة، وتام.'
			},
			{
				questionAr:
					'في جملة كيميائية ثابت توازنها $K = 4$، حسبنا كسر التفاعل الابتدائي فوجدناه $Q_{r,i} = 1.2$. تتطور الجملة تلقائياً:',
				options: [
					'في الاتجاه المباشر (نحو تشكل النواتج)',
					'في الاتجاه العكسي (نحو تشكل المتفاعلات)',
					'تبقى ساكنة في حالة توازن',
					'يتوقف التفاعل لعدم وجود وسيط'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'الاتجاه العكسي يحدث عندما $Q_{r,i} > K$.',
					'حالة التوازن تتحقق فقط عند $Q_{r,i} = K$.',
					'الوسيط يؤثر في السرعة وليس في جهة التطور التلقائي.'
				],
				explanationAr:
					'بما أن $Q_{r,i} = 1.2 < K = 4$ فإن الجملة تتطور تلقائياً في الاتجاه المباشر حتى يصبح $Q_r = K$.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 4: BAC Integration & Synthesis (3AS SE ONEC Format)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'phy_lesson_3as_shared_t3_integration',
		slug: 'phy-3as-shared-t3-integration',
		grade: '3as_se',
		yearSubjectId: 683,
		trimesterId: 't3',
		sequenceId: 'seq7',
		sequenceTitleAr: 'الوحدة 6: مراقبة تطور جملة كيميائية والتحضير للبكالوريا',
		order: 4,
		domain: 'integration',
		titleAr: 'إدماج وحصيلة والتحضير الشامل لبكالوريا العلوم الفيزيائية',
		objectives: [
			'حل مواضيع بكالوريا كاملة بالالتزام الصارم بالهيكلة الرسمية لـ ONEC وتنقيط الخطوات (خطوة دنيا 0.25 نقطة)',
			'التحكم في رسم وقراءة المنحنيات البيانية، التحليل البعدي، وكتابة الوحدات الدولية في التمرين التجريبي'
		],
		keywordsAr: ['بكالوريا علوم تجريبية', 'دليل بناء الاختبار', 'التمرين التجريبي', 'التحليل البعدي'],
		discover: {
			scenarioAr:
				'في التمرين التجريبي للبكالوريا (الجزء الثاني)، يطلب المصحح من المترشح استغلال بيان خطي مثل $\\ln A = f(t)$ أو $\\sigma = f(x)$ أو $v^2 = f(x)$ لتعيين مقدار فيزيائي مجهول ثم التحقق من تجانس عبارته بالتحليل البعدي.',
			steps: [
				{
					promptAr:
						'كيف تُثبت تجانس عبارة ثابت الزمن $\\tau = RC$ في الكهرباء و $\\tau = \\frac{m}{k}$ في السقوط الشاقولي (باحتكاك $f = kv$)؟',
					hintAr: 'استعمل الوحدات الأساسية في النظام الدولي ($\\text{M, L, T, I}$) انطلاقاً من القوانين الفيزيائية.',
					expectedInput: 'T',
					revealAr:
						'من $u_R = R i$ و $i = C \\frac{du_C}{dt}$ نجد $[R][C] = \\frac{[U]}{[I]}\\cdot\\frac{[I][T]}{[U]} = \\text{T}$. ومن $f = kv$ نجد $[k] = \\frac{[F]}{[v]} = \\frac{\\text{M}\\cdot\\text{L}\\cdot\\text{T}^{-2}}{\\text{L}\\cdot\\text{T}^{-1}} = \\text{M}\\cdot\\text{T}^{-1} \\implies \\left[\\frac{m}{k}\\right] = \\text{T}$.'
				},
				{
					promptAr:
						'عند استغلال بيان خطي يقطع محور التراتيب معادلته التجريبية $y = a x + b$، ما الخطوتان المنهجيتان الإلزاميتان في البكالوريا لإيجاد ثابت فيزيائي؟',
					hintAr: 'اكتب العلاقة البيانية ثم العلاقة النظرية وطابق بين الميل والترتيب عند المبدأ.',
					expectedInput: 'المطابقة',
					revealAr:
						'(1) كتابة **العبارة البيانية** $y = a x + b$ وحساب الميل $a$ باستعمال نقطتين متباعدتين من المستقيم مع الوحدات، (2) كتابة **العلاقة النظرية** بنفس المتغيرات ثم **المطابقة** بينهما لاستخراج الثابت المجهول.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**منهجية التحليل البعدي**: يُكتب كل مقدار بين حاضنتين $[X]$ بدلالة الأبعاد الأساسية: الطول $\\text{L}$، الكتلة $\\text{M}$، الزمن $\\text{T}$، وشدة التيار $\\text{I}$.',
				'**منهجية استغلال المنحنيات البيانية**: (1) في المنحنيات الأسية ($RC, RL$, تناقص إشعاعي، سقوط شاقولي): رسم المماس عند $t=0$ لإيجاد $\\tau$ أو حساب السرعة الحجمية؛ (2) في المنحنيات الخطية: كتابة المعادلة البيانية + المعادلة النظرية + المطابقة؛ (3) في المعايرة: طريقة المماسات المتوازية لإيجاد $E$ ونصف التكافؤ لإيجاد $pK_a$.',
				'**قواعد التنقيط الرسمية (ONEC)**: سلم التنقيط مجزأ بخطوة دنيا $0.25$ نقطة، مع منح نقاط صريحة على: كتابة المعادلة الكيميائية/النووية، تمثيل القوى في مرجع مناسب، ذكر قانون جمع التوترات أو القانون الثاني لنيوتن، التحويل الصحيح للوحدات، وذكر الوحدة مع النتيجة النهائية.'
			],
			examples: [
				{
					problemAr:
						'تأكد من تجانس عبارة الطاقة المحررة أو المخزنة $E = \\frac{1}{2} L I^2$ مع وحدة الجول ($\\text{kg}\\cdot\\text{m}^2\\cdot\\text{s}^{-2}$).',
					solutionAr:
						'من $u = L\\frac{di}{dt}$ و $P = U I = \\frac{E}{t}$ لدينا $[U] = [E][I]^{-1}[T]^{-1}$ و $[L] = [U][T][I]^{-1} = [E][I]^{-2}$. إذن $[L I^2] = [E][I]^{-2}[I]^2 = [E]$ (جول).'
				}
			],
			watchOutAr:
				'في البكالوريا الرسمية، كتابة النتيجة العددية دون وحدة أو دون ذكر القانون الفيزيائي قبل التعويض يفقدك نصف علامة السؤال في التصحيح النموذجي!'
		},
		practice: [
			{
				questionAr:
					'التحليل البعدي لمقدار يعطى بالعلاقة $\\frac{L}{R}$ (حيث $L$ ذاتية وشيعة و $R$ مقاومة) يوافق بُعد:',
				options: ['الزمن ($\\text{T}$)', 'التردد ($\\text{T}^{-1}$)', 'الطاقة', 'الشحنة الكهربائية'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'$\\frac{R}{L}$ هو الذي له بُعد التردد ($\\text{T}^{-1}$).',
					'الطاقة $\\frac{1}{2}LI^2$ لها بُعد الجول.',
					'الشحنة $Q = I\\cdot t$ لها بُعد $\\text{I}\\cdot\\text{T}$.'
				],
				explanationAr:
					'$\\tau = \\frac{L}{R}$ هو ثابت الزمن لثنائي القطب $RL$ وبُعده الزمن $\\text{T}$ (الثانية).'
			},
			{
				questionAr:
					'في التمرين التجريبي، إذا كانت العلاقة النظرية هي $\\ln N(t) = \\ln N_0 - \\lambda t$ والمنحنى البياني مستقيم ميله $-0.1386\\text{ min}^{-1}$، فإن قيمة $t_{1/2}$ هي:',
				options: ['5 min', '7.2 min', '0.14 min', '10 min'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'تلك قيمة $\\tau = 1/0.1386 \\approx 7.21\\text{ min}$؛ اضرب في $\\ln 2$.',
					'تلك قيمة $\\lambda$ تقريباً.',
					'راجع $\\ln 2 / 0.1386$.'
				],
				explanationAr:
					'بالمطابقة $\\lambda = 0.1386\\text{ min}^{-1} \\implies t_{1/2} = \\frac{0.693}{0.1386} = 5\\text{ min}$.'
			},
			{
				questionAr:
					'أيّ من المجموعات التالية يحتوي على وحدات دولية ($\\text{SI}$) صحيحة بالكامل؟',
				options: [
					'المتر ($\\text{m}$)، الكيلوغرام ($\\text{kg}$)، الثانية ($\\text{s}$)، الأمبير ($\\text{A}$)',
					'السنتيمتر ($\\text{cm}$)، الغرام ($\\text{g}$)، الدقيقة ($\\text{min}$)، الفولط ($\\text{V}$)',
					'الكيلومتر ($\\text{km}$)، الساعة ($\\text{h}$)، المول ($\\text{mol}$)، الأوم ($\\Omega$)',
					'الميليمول ($\\text{mmol}$)، اللتر ($\\text{L}$)، الباسكال ($\\text{Pa}$)، الهنري ($\\text{H}$)'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'السنتيمتر والغرام والدقيقة ليست وحدات دولية أساسية.',
					'الكيلومتر والساعة وحدات مشتقة/عملية وليست دولية ($\\text{SI}$).',
					'الميليمول واللتر ليست وحدات أساسية في $\\text{SI}$ (الحجم في $\\text{SI}$ هو $\\text{m}^3$).'
				],
				explanationAr:
					'الوحدات الأساسية في النظام الدولي ($\text{SI}$) هي المتر، الكيلوغرام، الثانية، الأمبير، الكلفن، والمول.'
			},
			{
				questionAr:
					'لضمان الدقة في حساب ميل مستقيم تجريبي $y = a x + b$، يجب اختيار:',
				options: [
					'نقطتين تنتميان إلى المستقيم المرسوم متباعدتين قدر الإمكان',
					'أول نقطتين تجريبيتين من الجدول دائماً',
					'نقطة المبدأ $(0,0)$ مع أول نقطة تجريبية',
					'نقطة واحدة فقط وحساب $y/x$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'قد لا تقع النقاط التجريبية بدقة على المستقيم الموفق بسبب أخطاء القياس.',
					'المستقيم قد لا يمر بالمبدأ $(0,0)$ أصلاً!',
					'العلاقة $y/x$ لا تصلح عندما $b \\neq 0$.'
				],
				explanationAr:
					'تُقرأ النقطتان من المستقيم المرسوم (المعدّل) وليس من القيم الخام في الجدول، ويكون التباعد بينهما كبيراً لتقليص خطأ القراءة.'
			}
		]
	}
];

export const SHARED_PHYSICS_LESSONS_3AS_T3: SharedPhysicsLesson[] = RAW_SHARED_PHYSICS_LESSONS_3AS_T3;
