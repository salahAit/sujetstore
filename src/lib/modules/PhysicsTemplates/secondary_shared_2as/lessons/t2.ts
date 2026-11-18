import type { PhysicsInteractiveLessonData } from '../../types';
import { chemEquation, chemSpecies } from '../../chem-helpers';
import {
	svgCircuitDiagram,
	svgPhysicsCurvePlot,
	svgTitrationSetup,
	wrapPhysicsSvg
} from '../../svg-physics';

function svgMagneticSuperposition(): string {
	const body = `
  <rect x="8" y="8" width="384" height="204" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="200" y="26" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">تراكب حقلين مغناطيسيين متعامدين: B = B₁ + B₂</text>
  <defs>
    <marker id="mArrB1" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#2563eb"/></marker>
    <marker id="mArrB2" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#059669"/></marker>
    <marker id="mArrB" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626"/></marker>
  </defs>
  <!-- Point M -->
  <circle cx="110" cy="158" r="4" fill="#0f172a"/>
  <text x="96" y="172" font-size="12" font-weight="bold" fill="#0f172a">M</text>
  <!-- B1 horizontal -->
  <line x1="110" y1="158" x2="255" y2="158" stroke="#2563eb" stroke-width="2.2" marker-end="url(#mArrB1)"/>
  <text x="190" y="176" text-anchor="middle" font-size="12" font-weight="bold" fill="#2563eb">B₁ (H)</text>
  <!-- B2 vertical -->
  <line x1="110" y1="158" x2="110" y2="62" stroke="#059669" stroke-width="2.2" marker-end="url(#mArrB2)"/>
  <text x="86" y="106" text-anchor="end" font-size="12" font-weight="bold" fill="#059669">B₂ (ب)</text>
  <!-- Dashed rectangle -->
  <line x1="255" y1="158" x2="255" y2="62" stroke="#94a3b8" stroke-dasharray="4,3" stroke-width="1.4"/>
  <line x1="110" y1="62" x2="255" y2="62" stroke="#94a3b8" stroke-dasharray="4,3" stroke-width="1.4"/>
  <!-- Resultant B -->
  <line x1="110" y1="158" x2="255" y2="62" stroke="#dc2626" stroke-width="2.5" marker-end="url(#mArrB)"/>
  <text x="200" y="96" font-size="12.5" font-weight="bold" fill="#dc2626">B (المحصلة)</text>
  <text x="155" y="148" font-size="11.5" font-weight="bold" fill="#dc2626">α</text>
  <text x="295" y="105" font-size="11.5" font-weight="bold" fill="#0f172a">B = √(B₁² + B₂²)</text>
  <text x="295" y="130" font-size="11.5" font-weight="bold" fill="#0f172a">tan(α) = B₂ / B₁</text>
  `;
	return wrapPhysicsSvg(400, 220, body);
}

function svgLaplaceRails(): string {
	const body = `
  <rect x="8" y="8" width="404" height="204" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="210" y="26" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">سكتا لابلاص: قوة لابلاص الكهرومغناطيسية F = I·L·B·sin(α)</text>
  <defs>
    <marker id="lArrF" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626"/></marker>
    <marker id="lArrB" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#059669"/></marker>
    <marker id="lArrI" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#2563eb"/></marker>
  </defs>
  <!-- Rails -->
  <line x1="65" y1="88" x2="345" y2="88" stroke="#334155" stroke-width="3"/>
  <line x1="65" y1="158" x2="345" y2="158" stroke="#334155" stroke-width="3"/>
  <!-- Generator -->
  <line x1="65" y1="88" x2="65" y2="158" stroke="#0f172a" stroke-width="1.8"/>
  <circle cx="65" cy="123" r="14" fill="#ffffff" stroke="#0f172a" stroke-width="1.8"/>
  <text x="65" y="127" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">G</text>
  <!-- Copper rod MN -->
  <rect x="192" y="80" width="10" height="86" rx="2" fill="#d97706" stroke="#92400e" stroke-width="1.5"/>
  <text x="197" y="72" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#78350f">M</text>
  <text x="197" y="182" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#78350f">N</text>
  <!-- Current I arrow -->
  <line x1="125" y1="88" x2="165" y2="88" stroke="#2563eb" stroke-width="2" marker-end="url(#lArrI)"/>
  <text x="145" y="80" text-anchor="middle" font-size="11" font-weight="bold" fill="#2563eb">I</text>
  <!-- B vector upwards -->
  <line x1="252" y1="138" x2="252" y2="75" stroke="#059669" stroke-width="2.2" marker-end="url(#lArrB)"/>
  <text x="262" y="84" font-size="12" font-weight="bold" fill="#059669">B</text>
  <!-- Laplace Force F -->
  <line x1="202" y1="123" x2="310" y2="123" stroke="#dc2626" stroke-width="2.5" marker-end="url(#lArrF)"/>
  <text x="292" y="114" font-size="12.5" font-weight="bold" fill="#dc2626">F (قوة لابلاص)</text>
  `;
	return wrapPhysicsSvg(420, 220, body);
}

function svgConductimetricTitrationPlot(): string {
	return svgPhysicsCurvePlot({
		xMin: 0,
		xMax: 24,
		yMin: 0,
		yMax: 12,
		xStep: 4,
		yStep: 2,
		xLabel: 'Vb (mL)',
		yLabel: 'G (mS)',
		title: 'منحنى المعايرة الناقلية: G = f(Vb)',
		curves: [
			{
				fn: (v) => (v <= 12 ? 9.6 - 0.55 * v : 3.0 + 0.65 * (v - 12)),
				color: '#2563eb',
				label: 'G(Vb)'
			}
		],
		dashedGuides: [{ x1: 12, y1: 0, x2: 12, y2: 3.0, color: '#dc2626', label: 'VbE = 12 mL', labelPos: 'right' }],
		points: [{ x: 12, y: 3.0, label: 'E (نقطة التكافؤ)', color: '#dc2626' }]
	});
}

const eqAcidBase = chemEquation(
	[
		{ formula: 'H3O+', state: 'aq' },
		{ formula: 'HO-', state: 'aq' }
	],
	[{ coeff: 2, formula: 'H2O', state: 'l' }]
);

const eqRedoxPermanganate = chemEquation(
	[
		{ formula: 'MnO4-', state: 'aq' },
		{ coeff: 5, formula: 'Fe^2+', state: 'aq' },
		{ coeff: 8, formula: 'H3O+', state: 'aq' }
	],
	[
		{ formula: 'Mn^2+', state: 'aq' },
		{ coeff: 5, formula: 'Fe^3+', state: 'aq' },
		{ coeff: 12, formula: 'H2O', state: 'l' }
	]
);

export const SHARED_LESSONS_2AS_T2: PhysicsInteractiveLessonData[] = [
	// [0] Acid-Base Titration (Bronsted)
	{
		id: 'phy_lesson_2as_shared_t2_acid_base_titration',
		slug: '2as_shared-t2-acid-base-titration',
		grade: '2as_se',
		yearSubjectId: 673,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المعايرة الكيميائية: تفاعلات حمض-أساس',
		order: 1,
		titleAr: 'تعيين كمية المادة بالمعايرة: تفاعلات حمض-أساس',
		objectives: [
			'تعريف الحمض والأساس حسب برونشتد، تحديد الثنائيات (حمض/أساس)، وكتابة معادلة تفاعل حمض-أساس',
			'تعيين نقطة التكافؤ في المعايرة اللونية أو الناقلية واستنتاج التركيز المولي للمحلول المعاير'
		],
		keywordsAr: ['حمض وأساس برونشتد', 'معايرة حمض-أساس', 'نقطة التكافؤ', 'المعايرة اللونية', 'المعايرة الناقلية'],
		discover: {
			scenarioAr: `نعاير حجماً $V_a = 20\\text{ mL}$ من محلول حمض كلور الماء (${chemSpecies('H3O+', 'aq').katex} + ${chemSpecies('Cl-', 'aq').katex}) تركيزه $C_a$ مجهول، بمحلول هيدروكسيد الصوديوم (${chemSpecies('Na+', 'aq').katex} + ${chemSpecies('HO-', 'aq').katex}) تركيزه $C_b = 0.1\\text{ mol/L}$ باستعمال خلية قياس الناقلية.`,
			svg: svgTitrationSetup({
				titrantLabel: 'Na⁺ + HO⁻ (Cb)',
				analyteLabel: 'H₃O⁺ + Cl⁻ (Va)',
				sensorLabel: 'مسبار الناقلية'
			}),
			steps: [
				{
					promptAr: 'اكتب الثنائيتين (حمض/أساس) الداخلتين في التفاعل، ثم استنتج معادلة تفاعل المعايرة.',
					hintAr: 'يفقد ${\\ce{H3O+}}$ بروتوناً $\\ce{H+}$ ويكتسبه ${\\ce{HO-}}$.',
					revealAr: `الثنائيتان هما $(\\ce{H3O+}/\\ce{H2O})$ و $(\\ce{H2O}/\\ce{HO-})$.\nمعادلة تفاعل المعايرة: ${eqAcidBase.katex}`
				},
				{
					promptAr: 'لماذا تتناقص الناقلية $G$ قبل التكافؤ ثم تتزايد بعده عند معايرة $\\ce{H3O+}$ بـ $\\ce{HO-}$؟',
					hintAr: 'قارن الناقلية المولية الشاردية $\\lambda_{\\ce{H3O+}} = 35\\text{ mS}\\cdot\\text{m}^2/\\text{mol}$ بـ $\\lambda_{\\ce{Na+}} = 5.0\\text{ mS}\\cdot\\text{m}^2/\\text{mol}$.',
					revealAr:
						'قبل التكافؤ تُعوض شوارد $\\ce{H3O+}$ سريعة الحركة بشوارد $\\ce{Na+}$ الأقل ناقلية فتتناقص $G$. بعد التكافؤ تتراكم شوارد $\\ce{HO-}$ ($\lambda = 19.9$) و $\\ce{Na+}$ في البيشر فتتزايد $G$.'
				},
				{
					promptAr: 'إذا كان حجم التكافؤ المقروء بيانياً هو $V_{bE} = 12\\text{ mL}$، احسب التركيز $C_a$.',
					hintAr: 'عند التكافؤ يكون المزيج ستوكيومترياً: $C_a V_a = C_b V_{bE}$.',
					expectedInput: '0.06 mol/L',
					revealAr:
						'$C_a = \\frac{C_b \\cdot V_{bE}}{V_a} = \\frac{0.1 \\times 12}{20} = 0.06\\text{ mol/L}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**حمض وأساس برونشتد**:\n- **الحمض $HA$**: كل فرد كيميائي قادر على فقدان بروتون $\\ce{H+}$ خلال تحول كيميائي: $\\ce{HA = A- + H+}$.\n- **الأساس $B$**: كل فرد كيميائي قادر على اكتساب بروتون $\\ce{H+}$: $\\ce{B + H+ = BH+}$.\n- **تفاعل حمض-أساس**: تبادل بروتوني بين حمض الثنائية الأولى وأساس الثنائية الثانية.',
				'**خصائص تفاعل المعايرة**:\nيجب أن يكون التفاعل **سريعاً** و**تاماً** و**انتقائياً** (وحيداً).',
				'**علاقة التكافؤ**:\nللتفاعل $\\ce{a A + b B -> \\text{نواتج}}$، عند نقطة التكافؤ يختفي المتفاعلان معاً:\n$$\\frac{n_i(A)}{a} = \\frac{n_{\\text{مضاف}}(B)}{b} \\implies \\frac{C_a V_a}{a} = \\frac{C_b V_{bE}}{b}$$'
			],
			visualSvg: svgConductimetricTitrationPlot(),
			visualCaptionAr: 'تعيين نقطة التكافؤ بيانياً من تقاطع نصفي المستقيمين في المعايرة الناقلية',
			examples: [
				{
					problemAr:
						`اكتب معادلة تفاعل حمض الإيثانويك ${chemSpecies('CH3COOH', 'aq').katex} مع شوارد الهيدروكسيد ${chemSpecies('HO-', 'aq').katex}.`,
					solutionAr: chemEquation(
						[
							{ formula: 'CH3COOH', state: 'aq' },
							{ formula: 'HO-', state: 'aq' }
						],
						[
							{ formula: 'CH3COO-', state: 'aq' },
							{ formula: 'H2O', state: 'l' }
						]
					).katex
				}
			],
			watchOutAr:
				'في المعايرة اللونية يجب إضافة قطرات قليلة فقط من الكاشف الملون (مثل أزرق البروموتيمول BBT) لكي لا يؤثر على التركيز، كما يقرأ الحجم المكافئ $V_E$ عند بداية تغير اللون المستقر.'
		},
		practice: [
			{
				questionAr:
					'حسب تعريف برونشتد، ما هو الأساس المرافق لحمض الإيثانويك $\\ce{CH3COOH}$؟',
				options: ['$\\ce{CH3COO-}$', '$\\ce{CH3COOH2+}$', '$\\ce{HO-}$', '$\\ce{H3O+}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! بفقدان بروتون $\\ce{H+}$ يتحول $\\ce{CH3COOH}$ إلى الأساس المرافق $\\ce{CH3COO-}$.',
					'خطأ تشخيصي: هذا ناتج عن اكتساب بروتون وليس فقده.',
					'خطأ تشخيصي: $\\ce{HO-}$ هو الأساس المرافق للماء $\\ce{H2O}$.',
					'خطأ تشخيصي: $\\ce{H3O+}$ هو الحمض المرافق للماء.'
				],
				explanationAr:
					'الحمض يفقد بروتوناً $\\ce{H+}$ ليعطي أساسه المرافق وفق نصف المعادلة: $\\ce{CH3COOH = CH3COO- + H+}$.'
			},
			{
				questionAr:
					'نعاير $V_a = 10\\text{ mL}$ من محلول حمض كلور الماء بمحلول الصودا تركيزه $C_b = 0.2\\text{ mol/L}$. يحدث التكافؤ عند إضافة $V_{bE} = 15\\text{ mL}$. التركيز المولي $C_a$ يساوي:',
				options: ['$0.30\\text{ mol/L}$', '$0.13\\text{ mol/L}$', '$0.15\\text{ mol/L}$', '$0.60\\text{ mol/L}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $C_a = \\frac{0.2 \\times 15}{10} = 0.30\\text{ mol/L}$.',
					'خطأ تشخيصي: عكست العلاقة وحسبت $\\frac{C_b V_a}{V_{bE}}$.',
					'خطأ تشخيصي: نسيت الضرب في $C_b$ أو قسمت على $20$.',
					'خطأ تشخيصي: ضاعفت القيمة دون سبب.'
				],
				explanationAr:
					'عند التكافؤ $C_a V_a = C_b V_{bE} \\implies C_a = \\frac{0.2 \\times 15}{10} = 0.30\\text{ mol/L}$.'
			},
			{
				questionAr:
					'أي مما يلي ليس من شروط تفاعل المعايرة الكيميائية الناجحة؟',
				options: [
					'أن يكون بطيئاً ومحدوداً (عكوساً)',
					'أن يكون سريعاً',
					'أن يكون تاماً',
					'أن يكون وحيداً (انتقائياً)'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! تفاعل المعايرة لا يمكن أن يكون بطيئاً أو محدوداً، بل يجب أن يكون سريعاً وتاماً ووحيداً.',
					'خطأ تشخيصي: السرعة شرط أساسي لتعيين التكافؤ فوراً.',
					'خطأ تشخيصي: التمام شرط أساسي لاستهلاك المتفاعلات كلياً عند التكافؤ.',
					'خطأ تشخيصي: الانتقائية تمنع التفاعلات الجانبية المضللة.'
				],
				explanationAr:
					'يشترط في تفاعل المعايرة أن يكون سريعاً، تاماً، ووحيداً (غير مصحوب بتفاعلات ثانوية).'
			}
		]
	},

	// [1] Redox Titration
	{
		id: 'phy_lesson_2as_shared_t2_redox_titration',
		slug: '2as_shared-t2-redox-titration',
		grade: '2as_se',
		yearSubjectId: 673,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'تفاعلات الأكسدة-إرجاع والمعايرة',
		order: 2,
		titleAr: 'تفاعلات الأكسدة-إرجاع والمعايرة الأكسدة-إرجاعية',
		objectives: [
			'تعريف المؤكسد والمرجع، كتابة المعادلتين النصفيتين وموازنة معادلة الأكسدة-إرجاع في وسط مائي وحمضي',
			'توظيف جدول التقدم وعلاقة التكافؤ في المعايرة بالأكسدة-إرجاع (مثل برمنغنات البوتاسيوم واليود)'
		],
		keywordsAr: ['أكسدة-إرجاع', 'المؤكسد والمرجع', 'المعادلات النصفية', 'نقطة التكافؤ'],
		discover: {
			scenarioAr: `نعاير حجماً $V_1 = 20\\text{ mL}$ من محلول كبريتات الحديد الثنائي (${chemSpecies('Fe^2+', 'aq').katex} + ${chemSpecies('SO4^2-', 'aq').katex}) المحمض بحمض الكبريت المركز، بمحلول برمنغنات البوتاسيوم (${chemSpecies('K+', 'aq').katex} + ${chemSpecies('MnO4-', 'aq').katex}) البنفسجي تركيزه $C_2 = 0.02\\text{ mol/L}$.`,
			svg: svgTitrationSetup({
				titrantLabel: 'MnO₄⁻ (C₂ = 0.02 M)',
				analyteLabel: 'Fe²⁺ محمض (V₁ = 20 mL)'
			}),
			steps: [
				{
					promptAr: 'اكتب المعادلتين النصفيتين للثنائيتين $(\\ce{MnO4-}/\\ce{Mn^{2+}})$ و $(\\ce{Fe^{3+}}/\\ce{Fe^{2+}})$ في وسط حمضي.',
					hintAr: 'نوازن الأكسجين بـ $\\ce{H2O}$ والهيدروجين بـ $\\ce{H+}$ (أو $\\ce{H3O+}$) والشحنة بالإلكترونات $e^-$.',
					revealAr:
						'- إرجاع البرمنغنات: $\\ce{MnO4- + 8H+ + 5e- -> Mn^{2+} + 4H2O}$\n- أكسدة الحديد الثنائي: $\\ce{Fe^{2+} -> Fe^{3+} + e-}$'
				},
				{
					promptAr: 'استنتج المعادلة الإجمالية الموزونة للأكسدة-إرجاع.',
					hintAr: 'اضرب نصف معادلة الأكسدة في $5$ لمساواة عدد الإلكترونات المتبادلة.',
					revealAr: eqRedoxPermanganate.katex
				},
				{
					promptAr: 'إذا ظهر اللون البنفسجي الدائم عند إضافة $V_{2E} = 15\\text{ mL}$، فما هو التركيز $C_1$ لشوارد $\\ce{Fe^{2+}}$؟',
					hintAr: 'من المعادلة الموزونة: $\\frac{n(\\ce{Fe^{2+}})}{5} = \\frac{n(\\ce{MnO4-})}{1} \\implies C_1 V_1 = 5 C_2 V_{2E}$.',
					expectedInput: '0.075 mol/L',
					revealAr:
						'$C_1 = \\frac{5 C_2 V_{2E}}{V_1} = \\frac{5 \\times 0.02 \\times 15}{20} = 0.075\\text{ mol/L}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**المؤكسد والمرجع**:\n- **المؤكسد ($\\text{Ox}$)**: فرد كيميائي قادر على **اكتساب** إلكترون أو أكثر ($\\text{Ox} + n e^- = \\text{Red}$: عملية **إرجاع**).\n- **المرجع ($\\text{Red}$)**: فرد كيميائي قادر على **فقدان** إلكترون أو أكثر ($\\text{Red} = \\text{Ox} + n e^-$: عملية **أكسدة**).',
				'**خطوات موازنة نصف معادلة أكسدة-إرجاع في وسط حمضي**:\n1. موازنة العنصر الأساسي (غير $\\text{O}$ و $\\text{H}$).\n2. موازنة ذرات الأكسجين $\\text{O}$ بإضافة جزيئات $\\ce{H2O}$.\n3. موازنة ذرات الهيدروجين $\\text{H}$ بإضافة $\\ce{H+}$ (أو $\\ce{H3O+}$ مع تعديل $\\ce{H2O}$).\n4. موازنة الشحنة الكهربائية بإضافة الإلكترونات $e^-$.',
				'**المعايرة بالأكسدة-إرجاع**:\nعند التكافؤ للمعادلة $a\\,\\text{Ox}_1 + b\\,\\text{Red}_2 \\rightarrow \\dots$ يكون:\n$$\\frac{n_1}{a} = \\frac{n_2}{b}$$\nتُعد برمنغنات البوتاسيوم $\\ce{MnO4-}$ كاشفاً ذاتياً (يتغير اللون من عديم اللون إلى بنفسجي دائم عند التكافؤ).'
			],
			examples: [
				{
					problemAr:
						'وازن تفاعل ثنائي اليود $\\ce{I2}$ مع شوارد الثيوكبريتات $\\ce{S2O3^{2-}}$ علماً أن الثنائيتين هما $(\\ce{I2}/\\ce{I-})$ و $(\\ce{S4O6^{2-}}/\\ce{S2O3^{2-}})$.',
					solutionAr:
						'- إرجاع: $\\ce{I2 + 2e- -> 2I-}$\n- أكسدة: $\\ce{2S2O3^{2-} -> S4O6^{2-} + 2e-}$\n- المعادلة الإجمالية: ' +
						chemEquation(
							[
								{ formula: 'I2', state: 'aq' },
								{ coeff: 2, formula: 'S2O3^2-', state: 'aq' }
							],
							[
								{ coeff: 2, formula: 'I-', state: 'aq' },
								{ formula: 'S4O6^2-', state: 'aq' }
							]
						).katex
				}
			],
			watchOutAr:
				'في المعايرة الأكسدة-إرجاعية (مثل $\\ce{MnO4-}$ و $\\ce{Fe^{2+}}$ أو $\\ce{I2}$ و $\\ce{S2O3^{2-}}$) ليست المعاملات الستوكيوميترية دائماً $1:1$! اكتب جدول التقدم دائماً قبل كتابة علاقة التكافؤ لتفادي نسيان المعامل $5$ أو $2$.'
		},
		practice: [
			{
				questionAr:
					'في التحول الكيميائي: $\\ce{Zn(s) + 2H+(aq) -> Zn^{2+}(aq) + H2(g)}$، ما هو الفرد المؤكسِد (الذي حدثت له أكسدة) وما هو المؤكسَد (المؤكسِد)؟',
				options: [
					'$\\ce{Zn}$ مرجع يتأكسد و $\\ce{H+}$ مؤكسد يُرجَع',
					'$\\ce{Zn}$ مؤكسد يُرجَع و $\\ce{H+}$ مرجع يتأكسد',
					'$\\ce{Zn^{2+}}$ مرجع و $\\ce{H2}$ مؤكسد',
					'لا يوجد تبادل إلكتروني في هذا التفاعل'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! يفقد الزنك إلكترونين ($\\ce{Zn -> Zn^{2+} + 2e-}$) فهو مرجع يتأكسد، وتكتسبهما شوارد $\\ce{H+}$ فهي مؤكسد يُرجع.',
					'خطأ تشخيصي: عكست دوري المؤكسد والمرجع.',
					'خطأ تشخيصي: النواتج ليست هي المتفاعلات المؤكسدة/المرجعة.',
					'خطأ تشخيصي: هذا تفاعل أكسدة-إرجاع نموذجي بتبادل إلكترونين.'
				],
				explanationAr:
					'تتأكسد ذرات $\\ce{Zn}$ بفقدان $2e^-$ (مرجع)، وتُرجَع شوارد $\\ce{H+}$ باكتساب $2e^-$ (مؤكسد).'
			},
			{
				questionAr:
					'كم عدد الإلكترونات $n$ المتبادلة في نصف معادلة إرجاع شوارد ثنائي الكرومات إلى كروم ثلاثي: $\\ce{Cr2O7^{2-} + 14H+ + n e- -> 2Cr^{3+} + 7H2O}$؟',
				options: ['$n = 6$', '$n = 3$', '$n = 12$', '$n = 4$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! الشحنة في اليسار $(-2 + 14 - n)$ وفي اليمين $(+6)$، ومنه $12 - n = 6 \\implies n = 6$.',
					'خطأ تشخيصي: هذه الإلكترونات لذرة كروم واحدة فقط وليس لذرتي $\\ce{Cr}$.',
					'خطأ تشخيصي: أهملت شحنة $\\ce{2Cr^{3+}}$ في الطرف الأيمن.',
					'خطأ تشخيصي: أعد موازنة الشحنة الكهربائية بين الطرفين.'
				],
				explanationAr:
					'موازنة الشحنة تعطي: $(-2) + (+14) - n = 2(+3) \\implies 12 - n = 6 \\implies n = 6$.'
			},
			{
				questionAr:
					'نعاير $10\\text{ mL}$ من ثنائي اليود $\\ce{I2}$ بمحلول ثيوكبريتات الصوديوم $\\ce{S2O3^{2-}}$ تركيزه $0.1\\text{ mol/L}$ فيتحقق التكافؤ عند $V_E = 16\\text{ mL}$ وفق المعادلة $\\ce{I2 + 2S2O3^{2-} -> 2I- + S4O6^{2-}}$. تركيز ثنائي اليود هو:',
				options: ['$0.08\\text{ mol/L}$', '$0.16\\text{ mol/L}$', '$0.32\\text{ mol/L}$', '$0.04\\text{ mol/L}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $n(\\ce{I2}) = \\frac{1}{2}n(\\ce{S2O3^{2-}}) \\implies C_1 = \\frac{0.1 \\times 16}{2 \\times 10} = 0.08\\text{ mol/L}$.',
					'خطأ تشخيصي: نسيت القسمة على المعامل الستوكيومتري $2$ للثيوكبريتات.',
					'خطأ تشخيصي: ضربت في $2$ بدلاً من القسمة على $2$.',
					'خطأ تشخيصي: قسمت على $4$ بدلاً من $2$.'
				],
				explanationAr:
					'عند التكافؤ: $\\frac{C_1 V_1}{1} = \\frac{C_2 V_E}{2} \\implies C_1 = \\frac{0.1 \\times 16}{2 \\times 10} = 0.08\\text{ mol/L}$.'
			}
		]
	},

	// [2] Magnetic Field Vectors & Superposition
	{
		id: 'phy_lesson_2as_shared_t2_magnetic_field_vectors',
		slug: '2as_shared-t2-magnetic-field-vectors',
		grade: '2as_se',
		yearSubjectId: 673,
		trimesterId: 't2',
		sequenceId: 'seq4',
		sequenceTitleAr: 'الظواهر المغناطيسية والكهرومغناطيسية',
		order: 3,
		titleAr: 'مفهوم الحقل المغناطيسي وتراكب الحقول المغناطيسية',
		objectives: [
			'تحديد خصائص شعاع الحقل المغناطيسي المتولد عن مغناطيس، سلك مستقيم، حلقة، ووشيعة طويلة (حلزونية)',
			'تطبيق مبدأ تراكب الحقول المغناطيسية (B = B_1 + B_2) وحساب شدتها ووحدتها التسلا (T)'
		],
		keywordsAr: ['الحقل المغناطيسي', 'التسلا', 'الوشيعة الحلزونية', 'تراكب الحقول'],
		discover: {
			scenarioAr:
				'نضع إبرة ممغنطة داخل وشيعة حلزونية (طويلة) محورها أفقي عمودي على مستوى الزوال المغناطيسي الأرضي (حيث المركبة الأفقية للحقل الأرضي $B_h = 2 \\times 10^{-5}\\text{ T}$). نمرر تياراً كهربائياً في الوشيعة فتتولد شدة حقل $\\vec{B}_b$ عمودية على $\\vec{B}_h$ وتنحرف الإبرة بزاوية $\\alpha = 45^\\circ$.',
			svg: svgMagneticSuperposition(),
			steps: [
				{
					promptAr: 'ما هو اتجاه الحقل المغناطيسي الكلي $\\vec{B}$ الذي تصطف وفقه الإبرة الممغنطة؟',
					hintAr: 'الإبرة تأخذ جهة المحصلة الشعاعية $\\vec{B} = \\vec{B}_h + \\vec{B}_b$.',
					revealAr:
						'تصطف الإبرة وفق حامل وجهة شعاع الحقل المغناطيسي الكلي $\\vec{B} = \\vec{B}_h + \\vec{B}_b$ الذي يصنع زاوية $\\alpha$ مع $\\vec{B}_h$.'
				},
				{
					promptAr: 'احسب شدة حقل الوشيعة $B_b$ إذا كانت زاوية الانحراف $\\alpha = 45^\\circ$ و $B_h = 2 \\times 10^{-5}\\text{ T}$.',
					hintAr: 'في المثلث القائم: $\\tan\\alpha = \\frac{B_b}{B_h}$.',
					expectedInput: '2e-5 T',
					revealAr:
						'$B_b = B_h \\cdot \\tan(45^\\circ) = 2 \\times 10^{-5} \\times 1 = 2 \\times 10^{-5}\\text{ T}$.'
				},
				{
					promptAr: 'احسب شدة الحقل المغناطيسي المحصل $B$ في مركز الوشيعة.',
					hintAr: 'طبق مبرهنة فيثاغورس: $B = \\sqrt{B_h^2 + B_b^2}$.',
					revealAr:
						'$B = \\sqrt{(2)^2 + (2)^2} \\times 10^{-5} = 2\\sqrt{2} \\times 10^{-5} \\approx 2.83 \\times 10^{-5}\\text{ T}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**خصائص شعاع الحقل المغناطيسي $\\vec{B}$**:\n- المبدأ: النقطة المدروسة.\n- الحامل: مماسي لخط الحقل في تلك النقطة.\n- الجهة: من القطب الجنوبي $S$ نحو القطب الشمالي $N$ للإبرة الممغنطة (تُحدد بقاعدة اليد اليمنى للتيارات).\n- الشدة: وحدتها الدولية هي **التسلا** ($\\text{T}$).',
				'**شدة الحقل المغناطيسي داخل وشيعة طويلة (حلزونية)**:\n$$B = \\mu_0 \\cdot \\frac{N}{L} \\cdot I = 4\\pi \\times 10^{-7} \\cdot n \\cdot I$$\nحيث $N$ عدد اللفات، $L$ طول الوشيعة بـ $\\text{m}$، $n = N/L$ عدد اللفات في المتر، و $I$ شدة التيار بـ $\\text{A}$.',
				'**تراكب الحقول المغناطيسية**:\n$$\\vec{B} = \\vec{B}_1 + \\vec{B}_2$$\nإذا كانا متعامدين: $B = \\sqrt{B_1^2 + B_2^2}$ و $\\tan\\alpha = \\frac{B_2}{B_1}$.'
			],
			visualSvg: svgMagneticSuperposition(),
			visualCaptionAr: 'الجمع الشعاعي لحقلين مغناطيسيين متعامدين وتحديد زاوية انحراف الإبرة الممغنطة',
			examples: [
				{
					problemAr:
						'وشيعة حلزونية طولها $L = 0.4\\text{ m}$ تحتوي على $N = 800$ لفة ويجتازها تيار $I = 0.5\\text{ A}$. احسب شدة الحقل في مركزها ($\mu_0 = 4\\pi \\times 10^{-7}\\text{ SI}$).',
					solutionAr:
						'$B = 4\\pi \\times 10^{-7} \\times \\frac{800}{0.4} \\times 0.5 = 4\\pi \\times 10^{-7} \\times 1000 = 4\\pi \\times 10^{-4} \\approx 1.26\\text{ mT}$.'
				}
			],
			watchOutAr:
				'الحقل المغناطيسي مقدار **شعاعي** وليس جبرياً! لا تجمع الشدتين $B_1 + B_2$ عددياً إلا إذا كانا في نفس الجهة والحامل، أما إذا كانا متعاكسين فنطرح، وإذا كانا متعامدين نطبق فيثاغورس.'
		},
		practice: [
			{
				questionAr:
					'وشيعة طولها $L = 0.5\\text{ m}$ وعدد لفاتها $N = 1000$ لفة يجتازها تيار $I = 2\\text{ A}$. ما شدة الحقل المغناطيسي داخلها ($\mu_0 = 4\\pi \\times 10^{-7}\\text{ SI}$)؟',
				options: ['$5.03\\text{ mT}$', '$2.51\\text{ mT}$', '$10.05\\text{ mT}$', '$1.26\\text{ mT}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $B = 4\\pi \\times 10^{-7} \\times \\frac{1000}{0.5} \\times 2 = 16\\pi \\times 10^{-4} \\approx 5.03\\text{ mT}$.',
					'خطأ تشخيصي: نسيت قسمة $N$ على $L = 0.5\\text{ m}$ أو أغفلت $I = 2\\text{ A}$.',
					'خطأ تشخيصي: ضاعفت النتيجة خطأً.',
					'خطأ تشخيصي: ضربت في $L = 0.5$ بدلاً من القسمة عليه.'
				],
				explanationAr:
					'$B = \\mu_0 \\frac{N}{L} I = 4\\pi \\times 10^{-7} \\times \\frac{1000}{0.5} \\times 2 = 16\\pi \\times 10^{-4} \\approx 5.03 \\times 10^{-3}\\text{ T} = 5.03\\text{ mT}$.'
			},
			{
				questionAr:
					'يتراكب في نقطة $M$ حقلان مغناطيسيان متعامدان شدتهما $B_1 = 3\\text{ mT}$ و $B_2 = 4\\text{ mT}$. شدة الحقل المحصل $B$ هي:',
				options: ['$5\\text{ mT}$', '$7\\text{ mT}$', '$1\\text{ mT}$', '$12\\text{ mT}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! بما أنهما متعامدان: $B = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5\\text{ mT}$.',
					'خطأ تشخيصي: جمعت الشدتين جبرياً وكأنهما على نفس الحامل والجهة.',
					'خطأ تشخيصي: طرحت الشدتين وكأنهما متعاكسان.',
					'خطأ تشخيصي: ضربت الشدتين بدلاً من تطبيق فيثاغورس.'
				],
				explanationAr:
					'بتطبيق فيثاغورس على الحقلين المتعامدين: $B = \\sqrt{B_1^2 + B_2^2} = \\sqrt{3^2 + 4^2} = 5\\text{ mT}$.'
			},
			{
				questionAr:
					'تنحرف إبرة ممغنطة بزاوية $\\alpha = 30^\\circ$ عن الحقل الأرضي $B_h = 20\\,\\mu\\text{T}$ عند تشغيل وشيعة حقله عمودي على $\\vec{B}_h$. شدة حقل الوشيعة تساوي:',
				options: ['$11.55\\,\\mu\\text{T}$', '$34.64\\,\\mu\\text{T}$', '$10.00\\,\\mu\\text{T}$', '$17.32\\,\\mu\\text{T}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $B_b = B_h \\tan(30^\\circ) = 20 \\times \\frac{\\sqrt{3}}{3} \\approx 11.55\\,\\mu\\text{T}$.',
					'خطأ تشخيصي: قسمت على $\\tan(30^\\circ)$ بدلاً من الضرب فيها.',
					'خطأ تشخيصي: استعملت $\\sin(30^\\circ)$ بدلاً من $\\tan(30^\\circ)$.',
					'خطأ تشخيصي: استعملت $\\cos(30^\\circ)$ بدلاً من $\\tan(30^\\circ)$.'
				],
				explanationAr:
					'في مثلث تراكب الحقلين المتعامدين: $\\tan\\alpha = \\frac{B_b}{B_h} \\implies B_b = 20 \\times \\tan(30^\\circ) \\approx 11.55\\,\\mu\\text{T}$.'
			}
		]
	},

	// [3] Laplace Electromagnetic Force
	{
		id: 'phy_lesson_2as_shared_t2_laplace_electromagnetic_force',
		slug: '2as_shared-t2-laplace-electromagnetic-force',
		grade: '2as_se',
		yearSubjectId: 673,
		trimesterId: 't2',
		sequenceId: 'seq4',
		sequenceTitleAr: 'الظواهر المغناطيسية والكهرومغناطيسية',
		order: 4,
		titleAr: 'مقاربة الأفعال المتبادلة الكهرومغناطيسية (قوة لابلاص)',
		objectives: [
			'تحديد جهة وشدة قوة لابلاص المؤثرة على ناقل يجتازه تيار كهربائي في حقل مغناطيسي منتظم (F = I·L·B·sinα)',
			'تفسير مبدأ عمل المحرك الكهربائي البسيط ومضخم الصوت'
		],
		keywordsAr: ['قوة لابلاص', 'الأفعال المتبادلة الكهرومغناطيسية', 'المحرك الكهربائي'],
		discover: {
			scenarioAr:
				'نضع ساقاً نحاسية $MN$ طولها الفعال داخل الحقل $L = 10\\text{ cm}$ على سكتين أفقيتين متوازيتين داخل حقل مغناطيسي منتظم عمودي على مستوي السكتين شدته $B = 0.2\\text{ T}$، ونمرر فيها تياراً مستمراً شدته $I = 5\\text{ A}$.',
			svg: svgLaplaceRails(),
			steps: [
				{
					promptAr: 'ما الزاوية $\\alpha$ بين الساق الناقلة (جهة التيار) وشعاع الحقل المغناطيسي $\\vec{B}$ العمودي على السكتين؟',
					hintAr: 'الساق أفقية والحقل شاقولي عمودي على المستوي الأفقي.',
					expectedInput: '90°',
					revealAr:
						'الساق متعامدة مع شعاع الحقل المغناطيسي، إذن $\\alpha = 90^\\circ$ و $\\sin(90^\\circ) = 1$.'
				},
				{
					promptAr: 'احسب شدة قوة لابلاص $\\vec{F}$ المؤثرة على الساق.',
					hintAr: 'استعمل العلاقة $F = I \\cdot L \\cdot B \\cdot \\sin\\alpha$ مع تحويل $L$ إلى المتر.',
					expectedInput: '0.1 N',
					revealAr:
						'$F = 5 \\times 0.10 \\times 0.2 \\times 1 = 0.1\\text{ N}$.'
				},
				{
					promptAr: 'كيف نُحدد جهة القوة $\\vec{F}$ وماذا يحدث عند عكس قطبي المولد الكهربائي؟',
					hintAr: 'نستعمل قاعدة اليد اليمنى (أو أصابع اليد اليمنى الثلاثة).',
					revealAr:
						'تُحدد جهة $\\vec{F}$ بقاعدة اليد اليمنى (التيار يخرج من أطراف الأصابع، $\\vec{B}$ يخرج من باطن الكف، فالإبهام يشير إلى $\\vec{F}$). وعند عكس جهة التيار تنعكس جهة قوة لابلاص فتتحرك الساق في الاتجاه المعاكس.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**قانون لابلاص**:\nيخضع جزء مستقيم من ناقل طوله $L$ يجتازه تيار كهربائي شدته $I$ ومغمور في حقل مغناطيسي منتظم $\\vec{B}$ إلى قوة كهرومغناطيسية $\\vec{F}$ (قوة لابلاص) خصائصها:\n- نقطة التأثير: منتصف الجزء المغمور في الحقل.\n- الحامل: عمودي على المستوي المحدد بالناقل وشعاع الحقل $\\vec{B}$.\n- الجهة: تُحدد بقاعدة اليد اليمنى (أو ثلاثي أصابع اليد اليمنى).\n- الشدة:\n$$F = I \\cdot L \\cdot B \\cdot \\sin\\alpha$$',
				'**حالات خاصة وتطبيقات**:\n- تنعدم قوة لابلاص إذا كان الناقل موازياً لخطوط الحقل ($\\alpha = 0^\\circ$ أو $180^\\circ$).\n- تُعد قوة لابلاص أساس عمل **المحرك الكهربائي** (عجلة بارلو / الإطار الدوار) و**مكبر الصوت**.'
			],
			visualSvg: svgLaplaceRails(),
			visualCaptionAr: 'تمثيل شعاع التيار والحقل المغناطيسي وقوة لابلاص في تجربة سكتي لابلاص',
			examples: [
				{
					problemAr:
						'سلك مستقيم طوله $L = 20\\text{ cm}$ يجتازه تيار $I = 4\\text{ A}$ وموضوع في حقل $B = 0.5\\text{ T}$ يصنع معه زاوية $\\alpha = 30^\\circ$. احسب شدة قوة لابلاص.',
					solutionAr:
						'$F = 4 \\times 0.20 \\times 0.5 \\times \\sin(30^\\circ) = 0.4 \\times 0.5 = 0.2\\text{ N}$.'
				}
			],
			watchOutAr:
				'في علاقة $F = I \\cdot L \\cdot B \\cdot \\sin\\alpha$، يمثل $L$ فقط **طول الجزء من الناقل المغمور فعلاً داخل الحقل المغناطيسي** (وليس الطول الكلي للساق إذا كان المغناطيس يغطي جزءاً منها فقط)!'
		},
		practice: [
			{
				questionAr:
					'يخضع ناقل طوله المغمور $L = 15\\text{ cm}$ ويجتازه تيار $I = 2\\text{ A}$ لحقل مغناطيسي عمودي عليه شدته $B = 0.4\\text{ T}$. ما قيمة قوة لابلاص؟',
				options: ['$0.12\\text{ N}$', '$12\\text{ N}$', '$0.06\\text{ N}$', '$0.30\\text{ N}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $F = 2 \\times 0.15 \\times 0.4 \\times \\sin(90^\\circ) = 0.12\\text{ N}$.',
					'خطأ تشخيصي: نسيت تحويل $15\\text{ cm}$ إلى $0.15\\text{ m}$.',
					'خطأ تشخيصي: استعملت $\\sin(30^\\circ) = 0.5$ بدلاً من $\\sin(90^\\circ) = 1$.',
					'خطأ تشخيصي: نسيت الضرب في شدة الحقل $B = 0.4\\text{ T}$.'
				],
				explanationAr:
					'نحول $L = 0.15\\text{ m}$، وبما أن الحقل عمودي ($\\sin 90^\\circ = 1$): $F = 2 \\times 0.15 \\times 0.4 = 0.12\\text{ N}$.'
			},
			{
				questionAr:
					'متى تنعدم قوة لابلاص المؤثرة على ناقل يجتازه تيار كهربائي غير معدوم داخل حقل مغناطيسي؟',
				options: [
					'عندما يكون الناقل موازياً لخطوط الحقل المغناطيسي ($\\alpha = 0^\\circ$)',
					'عندما يكون الناقل عمودياً على خطوط الحقل ($\\alpha = 90^\\circ$)',
					'عندما يكون الحقل منتظماً',
					'عندما يكون التيار مستمراً'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! لأن $\\sin(0^\\circ) = 0$ فتكون $F = 0$.',
					'خطأ تشخيصي: عند $\\alpha = 90^\\circ$ تكون قوة لابلاص أعظمية ($\\sin 90^\\circ = 1$).',
					'خطأ تشخيصي: الانتظام يضمن ثبات $B$ ولا يعدم القوة.',
					'خطأ تشخيصي: التيار المستمر يولد قوة لابلاص ثابتة الجهة والشدة.'
				],
				explanationAr:
					'من العلاقة $F = I L B \\sin\\alpha$، تنعدم القوة إذا انعدمت $\\sin\\alpha$ أي عندما يوازي الناقل خطوط الحقل.'
			},
			{
				questionAr:
					'ساق نحاسية معلقة تتوازن مائلة بزاوية $\\theta$ عن الشاقول تحت تأثير ثقلها $P = 0.4\\text{ N}$ وقوة لابلاص أفقية $F = 0.3\\text{ N}$. ما قيمة $\\tan\\theta$؟',
				options: ['$0.75$', '$1.33$', '$0.60$', '$0.80$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! عند التوازن يكون $\\tan\\theta = \\frac{F}{P} = \\frac{0.3}{0.4} = 0.75$.',
					'خطأ تشخيصي: قلبت النسبة ($P/F$ بدلاً من $F/P$).',
					'خطأ تشخيصي: هذه قيمة $\\sin\\theta$ لأن الوتر يساوي $0.5\\text{ N}$.',
					'خطأ تشخيصي: هذه قيمة $\\cos\\theta$.'
				],
				explanationAr:
					'عند توازن الساق تحت ثلاث قوى ($\\vec{P} + \\vec{F} + \\vec{T} = \\vec{0}$)، يكون $\\tan\\theta = \\frac{F}{P} = \\frac{0.3}{0.4} = 0.75$.'
			}
		]
	},

	// [4] Electricity in Daily Life & Electrical Safety
	{
		id: 'phy_lesson_2as_shared_t2_electricity_daily_life',
		slug: '2as_shared-t2-electricity-daily-life',
		grade: '2as_se',
		yearSubjectId: 673,
		trimesterId: 't2',
		sequenceId: 'seq4',
		sequenceTitleAr: 'الظواهر المغناطيسية والكهرومغناطيسية',
		order: 5,
		titleAr: 'الكهرباء والحياة اليومية (توزيع الطاقة والأمن الكهربائي)',
		objectives: [
			'التعرف على مبادئ نقل الطاقة الكهربائية والأمن الكهربائي في الشبكات المنزلية (المنصهرة، القاطع التفاضلي، المأخذ الأرضي)',
			'اختيار المنصهرة المناسبة وحساب شدة التيار في الأجهزة المنزلية وفق الاستطاعة الاسمية'
		],
		keywordsAr: ['الكهرباء والحياة اليومية', 'الأمن الكهربائي', 'التيار الكهربائي', 'القاطع التفاضلي'],
		discover: {
			scenarioAr:
				'تشتغل شبكة منزلية بتوتر فعال $U = 220\\text{ V}$ وتضم ثلاجة ($P_1 = 220\\text{ W}$) ومدفأة كهربائية ($P_2 = 1980\\text{ W}$) موصولتين على التفرع عبر مأخذ مزود بمنصهرة ومأخذ أرضي وقاطع تفاضلي.',
			svg: svgCircuitDiagram({ kind: 'household_safety' }),
			steps: [
				{
					promptAr: 'احسب شدة التيار المارة في المدفأة عند تشغيلها وحدها تحت توتر $220\\text{ V}$.',
					hintAr: 'استعمل علاقة الاستطاعة الكهربائية $P = U \\cdot I$.',
					expectedInput: '9 A',
					revealAr: '$I_2 = \\frac{P_2}{U} = \\frac{1980}{220} = 9\\text{ A}$.'
				},
				{
					promptAr: 'إذا شُغلت الثلاجة والمدفأة معاً على نفس التفرع، ما هي الشدة الكلية $I_{\\text{tot}}$؟',
					hintAr: 'شدة الثلاجة $I_1 = \\frac{220}{220} = 1\\text{ A}$، في التفرع تُجمع الشدات.',
					expectedInput: '10 A',
					revealAr: '$I_{\\text{tot}} = I_1 + I_2 = 1 + 9 = 10\\text{ A}$.'
				},
				{
					promptAr: 'على أي سلك توصل المنصهرة والقاطعة في التركيب المنزلي، وما دور المأخذ الأرضي؟',
					hintAr: 'يحمل سلك الطور (Ph) التوتر $220\\text{ V}$ بالنسبة للأرض.',
					revealAr:
						'توصل المنصهرة والقاطعة دوماً على سلك الطور ($\\text{Ph}$) لحماية الجهاز والمستخدم عند الصيانة. ويحمي المأخذ الأرضي بالتعاون مع القاطع التفاضلي من الصعق الكهربائي عند تسرب التيار إلى الهيكل المعدني.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**أجهزة الحماية والأمن الكهربائي**:\n- **المنصهرة**: تحمي الأجهزة والأسلاك من الاستقصار وزيادة الحمولة وتُوصل دوماً على **سلك الطور** بعيار يفوق بقليل شدة التشغيل الاسمية $I = P/U$.\n- **القاطع التفاضلي**: يفصل الدارة آلياً عند حدوث استقصار أو تجاوز الشدة العظمى أو تسرب تيار نحو الأرض (فرق بين تيار الطور والحيادي).\n- **المأخذ الأرضي ($\\text{T}$)**: يوصل الهياكل المعدنية للأجهزة بالأرض لتفريغ التيارات المتسربة ومنع التكهرب.',
				'**نقل الطاقة الكهربائية**:\nلتقليل ضياع الطاقة بمفعول جول ($P_J = R I^2$) في خطوط النقل الطويلة، تُرفع قيمة التوتر الكهربائي عند محطات الإرسال ($I = P/U$ تنخفض)، ثم تُخفض قبل التوزيع المنزلي.'
			],
			visualSvg: svgCircuitDiagram({ kind: 'household_safety' }),
			visualCaptionAr: 'مخطط الأمن الكهربائي المنزلي: الطور Ph (أحمر)، الحيادي N (أزرق)، الأرضي T (أخضر)',
			examples: [
				{
					problemAr:
						'مكواة مكتوب عليها $(220\\text{ V} ; 1100\\text{ W})$. أي منصهرة نختار لحمايتها من بين $(2\\text{ A}, 5\\text{ A}, 6\\text{ A})$؟',
					solutionAr:
						'نحسب شدة التيار الاسمية: $I = \\frac{1100}{220} = 5\\text{ A}$.\nنختار منصهرة عيارها يساوي أو يفوق قليلاً $5\\text{ A}$ (مثل $6\\text{ A}$) حتى لا تنصهر أثناء التشغيل العادي.'
				}
			],
			watchOutAr:
				'لا توصل المنصهرة أو القاطعة أبداً على سلك الحيادي ($\\text{N}$)؛ لأن فتح القاطعة عندئذٍ يبقي الجهاز موصولاً بالطور ذي الجهد $220\\text{ V}$ مما يعرض الشخص لخطر الصعق!'
		},
		practice: [
			{
				questionAr:
					'جهاز تسخين كهربائي استطاعته $P = 2200\\text{ W}$ يشتغل تحت توتر $U = 220\\text{ V}$. ما شدة التيار التي يجتازه؟',
				options: ['$10\\text{ A}$', '$0.1\\text{ A}$', '$20\\text{ A}$', '$4.84\\text{ A}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! $I = \\frac{P}{U} = \\frac{2200}{220} = 10\\text{ A}$.',
					'خطأ تشخيصي: قسمت $U$ على $P$ بدلاً من $P$ على $U$.',
					'خطأ تشخيصي: ضاعفت القيمة دون مبرر.',
					'خطأ تشخيصي: أخطأت في حساب القسمة.'
				],
				explanationAr:
					'من علاقة الاستطاعة $P = U \\cdot I$ نستنتج $I = \\frac{2200}{220} = 10\\text{ A}$.'
			},
			{
				questionAr:
					'شعر مستعمل بصدمة كهربائية خفيفة عند لمس هيكل غسالة معدني رغم أن القاطعة مغلقة والجهاز يعمل. ما الإجراء الوقائي الغائب؟',
				options: [
					'توصيل الهيكل المعدني بالمأخذ الأرضي وتزويده بقاطع تفاضلي',
					'إزالة المنصهرة من سلك الطور',
					'استبدال سلك الطور بالحيادي فقط',
					'رفع توتر الشبكة المنزلية'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! ملامسة سلك الطور للهيكل المعدني تسبب تكهرباً إذا لم يُربط الهيكل بالمأخذ الأرضي.',
					'خطأ تشخيصي: إزالة المنصهرة تلغي الحماية ضد الاستقصار.',
					'خطأ تشخيصي: التبديل لا يمنع تسرب التيار من أحد الأسلاك إلى الهيكل.',
					'خطأ تشخيصي: رفع التوتر يزيد من خطورة الصعق.'
				],
				explanationAr:
					'التكهرب عند لمس هيكل معدني ينتج عن ملامسة الطور للهيكل في غياب التوصيل الأرضي والقاطع التفاضلي.'
			},
			{
				questionAr:
					'لماذا تُنقل الطاقة الكهربائية عبر المسافات الطويلة بتوتر كهربائي مرتفع جداً؟',
				options: [
					'لتخفيض شدة التيار $I$ وبالتالي تقليل الضياع الحراري بمفعول جول $R I^2$',
					'لزيادة مقاومة الأسلاك النحاسية',
					'لإلغاء الحاجة إلى الأعمدة الكهربائية',
					'لرفع قيمة الطاقة الضائعة في الأسلاك'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! عند نقل نفس الاستطاعة $P = U I$، رفع التوتر يخفض $I$ فيقل الضياع $P_J = R I^2$ تربيعياً.',
					'خطأ تشخيصي: مقاومة الأسلاك تعتمد على نوع المادة وطولها ومقطعها وليس التوتر.',
					'خطأ تشخيصي: التوتر المرتفع يتطلب أبراجاً أعلى وأكثر أماناً.',
					'خطأ تشخيصي: الهدف هو تقليل الضياع الحراري وليس رفعه.'
				],
				explanationAr:
					'للحفاظ على استطاعة منقولة $P = U\\cdot I$، يؤدي رفع التوتر $U$ إلى خفض شدة التيار $I$، ومنه تنخفض الطاقة الضائعة حرارياً $P_J = R I^2$ بشكل كبير.'
			}
		]
	}
];
