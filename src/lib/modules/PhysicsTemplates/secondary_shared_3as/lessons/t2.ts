import type { PhysicsInteractiveLessonData } from '../../types';
import { buildIceTable, chemEquation, chemSpecies } from '../../chem-helpers';
import {
	svgCircuitDiagram,
	svgInclinedPlaneForces,
	svgPhysicsCurvePlot,
	svgProjectileTrajectory,
	svgTitrationSetup
} from '../../svg-physics';
import type { SharedPhysicsLesson } from './t1';

// ═══════════════════════════════════════════════════════════════════════════════
// Custom crisp SVGs & Chem Helpers for T2 Shared Lessons
// ═══════════════════════════════════════════════════════════════════════════════

const svgRcChargeCurve = svgPhysicsCurvePlot({
	title: 'منحنى شحن مكثفة وتعيين ثابت الزمن τ = RC',
	xMin: 0,
	xMax: 60,
	yMin: 0,
	yMax: 12,
	xStep: 10,
	yStep: 2,
	xLabel: 't (ms)',
	yLabel: 'u_C (V)',
	curves: [
		{
			fn: (t) => 10 * (1 - Math.exp(-t / 10)),
			color: '#2563eb',
			label: 'u_C(t) (الشحن)'
		},
		{
			fn: (t) => 10 * Math.exp(-t / 10),
			color: '#059669',
			dashed: true,
			label: 'u_R(t) (المقاومة)'
		}
	],
	dashedGuides: [
		{ x1: 0, y1: 10, x2: 60, y2: 10, color: '#475569', label: 'E = 10 V', labelPos: 'top' },
		{ x1: 0, y1: 0, x2: 10, y2: 10, color: '#dc2626', label: 'المماس عند t=0', labelPos: 'right' },
		{ x1: 10, y1: 0, x2: 10, y2: 10, color: '#dc2626' },
		{ x1: 0, y1: 6.32, x2: 10, y2: 6.32, color: '#d97706' }
	],
	points: [
		{ x: 10, y: 10, label: 'τ = 10 ms', color: '#dc2626' },
		{ x: 10, y: 6.32, label: '0.63 E', color: '#d97706' }
	]
});

const svgRlGrowthCurve = svgPhysicsCurvePlot({
	title: 'تأسيس التيار i(t) في وشيعة حقيقية (L, r) وتعيين τ',
	xMin: 0,
	xMax: 25,
	yMin: 0,
	yMax: 0.3,
	xStep: 5,
	yStep: 0.05,
	xLabel: 't (ms)',
	yLabel: 'i (A)',
	curves: [
		{
			fn: (t) => 0.25 * (1 - Math.exp(-t / 4)),
			color: '#2563eb',
			label: 'i(t)'
		}
	],
	dashedGuides: [
		{ x1: 0, y1: 0.25, x2: 25, y2: 0.25, color: '#475569', label: 'I₀ = E/(R+r) = 0.25 A', labelPos: 'top' },
		{ x1: 0, y1: 0, x2: 4, y2: 0.25, color: '#dc2626', label: 'المماس عند t=0', labelPos: 'right' },
		{ x1: 4, y1: 0, x2: 4, y2: 0.25, color: '#dc2626' }
	],
	points: [
		{ x: 4, y: 0.25, label: 'τ = 4 ms', color: '#dc2626' },
		{ x: 4, y: 0.158, label: '0.63 I₀', color: '#059669' }
	]
});

const eqWeakAcid = chemEquation(
	[
		{ formula: 'CH3COOH', state: 'aq' },
		{ formula: 'H2O', state: 'l' }
	],
	[
		{ formula: 'CH3COO-', state: 'aq' },
		{ formula: 'H3O+', state: 'aq' }
	],
	{ reversible: true }
);

const iceWeakAcid = buildIceTable({
	equation: eqWeakAcid,
	speciesHeaders: [
		chemSpecies('CH3COOH'),
		chemSpecies('H2O'),
		chemSpecies('CH3COO-'),
		chemSpecies('H3O+')
	],
	initial: [
		{ katex: '$C V$', typst: '$C V$' },
		{ katex: 'بوفرة', typst: 'بوفرة' },
		{ katex: '$0$', typst: '$0$' },
		{ katex: '$0$', typst: '$0$' }
	],
	intermediate: [
		{ katex: '$C V - x$', typst: '$C V - x$' },
		{ katex: 'بوفرة', typst: 'بوفرة' },
		{ katex: '$x$', typst: '$x$' },
		{ katex: '$x$', typst: '$x$' }
	],
	final: [
		{ katex: '$C V - x_f$', typst: '$C V - x_f$' },
		{ katex: 'بوفرة', typst: 'بوفرة' },
		{ katex: '$x_f$', typst: '$x_f$' },
		{ katex: '$x_f$', typst: '$x_f$' }
	]
});

// Realistic Henderson-Hasselbalch + strong-base titration curve for pKa = 4.8, V_E = 20 mL
function weakAcidTitrationPh(vb: number): number {
	const ca = 0.1;
	const va = 20;
	const cb = 0.1;
	const pKa = 4.8;
	const ka = Math.pow(10, -pKa);
	const ve = (ca * va) / cb; // 20 mL
	const vt = va + vb;
	if (vb <= 0.01) {
		return 0.5 * (pKa - Math.log10(ca));
	}
	if (vb < ve - 0.8) {
		const ratio = vb / (ve - vb);
		return pKa + Math.log10(ratio);
	}
	if (Math.abs(vb - ve) <= 0.8) {
		// Smooth inflection across equivalence pH_E ≈ 8.75
		const cSalt = (ca * va) / vt;
		const phE = 7 + 0.5 * (pKa + Math.log10(cSalt));
		const t = (vb - (ve - 0.8)) / 1.6;
		const phLeft = pKa + Math.log10((ve - 0.8) / 0.8);
		const phRight = 14 + Math.log10((cb * 0.8) / (va + ve + 0.8));
		if (t < 0.5) return phLeft + 2 * t * (phE - phLeft);
		return phE + 2 * (t - 0.5) * (phRight - phE);
	}
	const excessOh = (cb * (vb - ve)) / vt;
	return 14 + Math.log10(excessOh);
}

const svgPhTitrationCurve = svgPhysicsCurvePlot({
	title: 'منحنى المعايرة الـ pH-مترية: حمض ضعيف بأساس قوي',
	xMin: 0,
	xMax: 35,
	yMin: 0,
	yMax: 14,
	xStep: 5,
	yStep: 2,
	xLabel: 'V_b (mL)',
	yLabel: 'pH',
	curves: [
		{
			fn: weakAcidTitrationPh,
			color: '#2563eb',
			label: 'pH = f(V_b)'
		}
	],
	dashedGuides: [
		{ x1: 20, y1: 0, x2: 20, y2: 8.7, color: '#dc2626' },
		{ x1: 0, y1: 8.7, x2: 20, y2: 8.7, color: '#dc2626' },
		{ x1: 10, y1: 0, x2: 10, y2: 4.8, color: '#059669' },
		{ x1: 0, y1: 4.8, x2: 10, y2: 4.8, color: '#059669' }
	],
	points: [
		{ x: 20, y: 8.7, label: 'E(20 ; 8.7)', color: '#dc2626' },
		{ x: 10, y: 4.8, label: 'E₁/₂(10 ; pK_a=4.8)', color: '#059669' }
	]
});

const RAW_SHARED_PHYSICS_LESSONS_3AS_T2: SharedPhysicsLesson[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 1: Parabolic Projectile & Inclined/Horizontal Plane
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'phy_lesson_3as_shared_t2_projectile_inclined_plane',
		slug: 'phy-3as-shared-t2-projectile-inclined-plane',
		grade: '3as_se',
		yearSubjectId: 683,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'تتمة الوحدة 2: القذيفة والمستوي الأفقي والمائل',
		order: 1,
		domain: 'mechanics',
		titleAr: 'حركة القذيفة في حقل الجاذبية وحركة جسم على مستو أفقي ومائل',
		objectives: [
			'استنتاج المعادلات الزمنية $x(t), y(t)$ ومعادلة المسار $y(x)$ لقذيفة وتعيين إحداثيات الذروة والمدى الأفقي',
			'تفسير حركة جسم صلب على مستو أفقي أو مائل بتطبيق القانون الثاني لنيوتن ومبدأ انحفاظ الطاقة'
		],
		keywordsAr: ['حركة قذيفة', 'معادلة المسار', 'الذروة والمدى', 'المستوي المائل', 'قوة الاحتكاك'],
		discover: {
			scenarioAr:
				'تُقذف كرة من المبدأ $O(0,0)$ بسرعة ابتدائية $v_0 = 20\\text{ m/s}$ يصنع حاملها زاوية $\\alpha = 30^\\circ$ مع المحور الأفقي $(Ox)$ في حقل جاذبية منتظم $g = 10\\text{ m/s}^2$ وبإهمال تأثير الهواء.',
			svg: svgProjectileTrajectory({ v0Label: 'v₀ = 20 m/s', angleLabel: 'α = 30°', showApex: true }),
			steps: [
				{
					promptAr:
						'بتطبيق القانون الثاني لنيوتن $\\vec{P} = m\\vec{a}$، ما هي مركبتا شعاع التسارع $(a_x, a_y)$، وما نوع الحركة على المحورين $(Ox)$ و $(Oy)$؟',
					hintAr: 'المحور $(Ox)$ أفقي و $(Oy)$ شاقولي موجه نحو الأعلى.',
					expectedInput: 'a_x = 0',
					revealAr:
						'بإسقاط $\\vec{P} = m\\vec{g}$: $a_x = 0$ (حركة مستقيمة منتظمة على $Ox$) و $a_y = -g$ (حركة مستقيمة متغيرة بانتظام على $Oy$).'
				},
				{
					promptAr:
						'اكتب المعادلتين الزمنيتين $x(t)$ و $y(t)$ ثم استنتج ارتفاع الذروة $y_S$ بالمتر (حيث تنعدم $v_y(t_S) = 0$).',
					hintAr: '$v_{0y} = v_0 \\sin 30^\\circ = 10\\text{ m/s}$ و $v_y(t) = -g t + v_{0y}$.',
					expectedInput: '5',
					revealAr:
						'لدينا $x(t) = (v_0 \\cos\\alpha) t$ و $y(t) = -\\frac{1}{2}gt^2 + (v_0 \\sin\\alpha) t$. عند الذروة $v_y(t_S) = -10 t_S + 10 = 0 \\implies t_S = 1\\text{ s}$، ومنه $y_S = -5(1)^2 + 10(1) = 5\\text{ m}$.'
				},
				{
					promptAr:
						'احسب المدى الأفقي $x_P$ عند عودة القذيفة إلى نفس المستوى الأفقي $y = 0$ (حيث $\\cos 30^\\circ \\approx 0.866$).',
					hintAr: 'المدى الأفقي $x_P = \\frac{v_0^2 \\sin(2\\alpha)}{g}$ أو $x(2 t_S)$.',
					expectedInput: '34.64',
					revealAr:
						'$x_P = (20 \\cos 30^\\circ) \\times 2 = 40 \\times 0.866 \\approx 34.64\\text{ m}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**حركة قذيفة (بإهمال مقاومة الهواء)**: $a_x = 0$ و $a_y = -g$. المعادلات الزمنية:\n$$\nx(t) = (v_0 \\cos\\alpha) t, \\qquad y(t) = -\\frac{1}{2}g t^2 + (v_0 \\sin\\alpha) t + y_0\n$$',
				'**معادلة المسار والذروة والمدى**:\n$$\ny(x) = -\\frac{g}{2 v_0^2 \\cos^2\\alpha} x^2 + (\\tan\\alpha)\\,x + y_0\n$$\nالذروة $S$: $v_y = 0 \\implies t_S = \\frac{v_0 \\sin\\alpha}{g}$ و $y_S = \\frac{v_0^2 \\sin^2\\alpha}{2g} + y_0$. المدى عند $y_0=0$: $x_P = \\frac{v_0^2 \\sin(2\\alpha)}{g}$ (أعظمي لـ $\\alpha = 45^\\circ$).',
				'**الحركة على مستو مائل بزاوية $\\alpha$ (محور $Ox$ موازٍ للمستوي)**: أثناء النزول بتأثير الثقل ورد الفعل والاحتكاك $f$ المعاكس للحركة: $a = g\\sin\\alpha - \\frac{f}{m}$؛ وأثناء الصعود: $a = -g\\sin\\alpha - \\frac{f}{m}$. وعند انعدام الاحتكاك ($f=0$): $a = \\pm g\\sin\\alpha$.',
				'**تطبيق انحفاظ الطاقة**: $\\Delta E_c = \\sum W(\\vec{F}_{\\text{ext}}) = W(\\vec{P}) + W(\\vec{R}_N) + W(\\vec{f})$ مع $W(\\vec{R}_N) = 0$ و $W(\\vec{f}) = -f \\cdot d$.'
			],
			visualSvg: svgInclinedPlaneForces({ angleDeg: 25, showFriction: true, angleLabel: 'α' }),
			visualCaptionAr: 'تمثيل القوى المؤثرة على جسم صلب على مستو مائل بزاوية α',
			examples: [
				{
					problemAr:
						'ينزلق جسم كتلته $m = 2\\text{ kg}$ بدون سرعة ابتدائية من قمة مستو مائل طوله $d = 5\\text{ m}$ وزاوية ميله $\\alpha = 30^\\circ$ فيبلغ أسفله بسرعة $v = 6\\text{ m/s}$ ($g = 10\\text{ m/s}^2$). احسب التسارع $a$ وقوة الاحتكاك $f$.',
					solutionAr:
						'من محذوفية الزمن: $v^2 - v_0^2 = 2 a d \\implies a = \\frac{36}{2 \\times 5} = 3.6\\text{ m/s}^2$. ومن القانون الثاني لنيوتن: $m g \\sin 30^\\circ - f = m a \\implies f = 2(10\\times 0.5 - 3.6) = 2.8\\text{ N}$.'
				}
			],
			watchOutAr:
				'قوة رد الفعل الناظمي $\\vec{R}_N$ عمودية دوماً على المستوي المائل فتساوي $R_N = m g \\cos\\alpha$ (وليس $m g$!) وعملها معدوم، بينما قوة الاحتكاك $\\vec{f}$ تعاكس جهة الحركة دوماً.'
		},
		practice: [
			{
				questionAr: 'عند ذروة مسار قذيفة ($S$) في حقل الجاذبية المنتظم، تكون سرعة القذيفة:',
				options: [
					'أفقية وتساوي $v_0 \\cos\\alpha$ (لا تنعدم!)',
					'معدومة تماماً ($v_S = 0$)',
					'شاقولية وتساوي $v_0 \\sin\\alpha$',
					'مساوية لـ $v_0$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'المركبة الشاقولية $v_y$ فقط هي التي تنعدم عند الذروة، بينما تبقى $v_x$ ثابتة.',
					'المركبة الشاقولية تنعدم عند الذروة.',
					'بما أن $v_y=0$ فإن $v_S = v_x = v_0\\cos\\alpha < v_0$.'
				],
				explanationAr:
					'الحركة الأفقية منتظمة ($v_x = v_0\\cos\\alpha = \\text{cte}$)، وعند الذروة تنعدم $v_y = 0$، لذلك تكون السرعة أفقية غير معدومة قيمتها $v_S = v_0\\cos\\alpha$.'
			},
			{
				questionAr:
					'منحنى $v^2 = f(x)$ لجسم ينزلق بدون سرعة ابتدائية على مستو مائل هو خط مستقيم يمر بالمبدأ ميله $p = 8\\text{ m/s}^2$. تسارع الحركة $a$ يساوي:',
				options: ['$4\\text{ m/s}^2$', '$8\\text{ m/s}^2$', '$16\\text{ m/s}^2$', '$2\\text{ m/s}^2$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'تذكر العلاقة $v^2 = 2 a x$؛ الميل هو $2a$ وليس $a$.',
					'ضربت الميل في $2$ بدلاً من القسمة على $2$.',
					'قسمت على $4$ بدلاً من $2$.'
				],
				explanationAr:
					'من العلاقة $v^2 - v_0^2 = 2 a x$ وبما أن $v_0=0$ يكون ميل المستقيم $p = 2a = 8 \\implies a = 4\\text{ m/s}^2$.'
			},
			{
				questionAr:
					'تُسجل أكبر مسافة مدى أفقي $x_P$ لقذيفة تُطلق من سطح الأرض ($y_0 = 0$) بنفس السرعة الابتدائية $v_0$ عندما تكون زاوية القذف:',
				options: ['$\\alpha = 45^\\circ$', '$\\alpha = 30^\\circ$', '$\\alpha = 60^\\circ$', '$\\alpha = 90^\\circ$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'$\\sin(60^\\circ) = 0.866 < 1$.',
					'$\\sin(120^\\circ) = 0.866 < 1$.',
					'عند $90^\\circ$ تسقط القذيفة في نقطة إطلاقها ($x_P = 0$).'
				],
				explanationAr:
					'عبارة المدى $x_P = \\frac{v_0^2 \\sin(2\\alpha)}{g}$ تبلغ قيمتها العظمى عندما $\\sin(2\\alpha) = 1 \\iff 2\\alpha = 90^\\circ \\iff \\alpha = 45^\\circ$.'
			},
			{
				questionAr:
					'ينزلق جسم على مستو مائل بزاوية $\\alpha$ دون احتكاك انطلاقاً من السكون. عبارة تسارعه هي:',
				options: ['$a = g \\sin\\alpha$', '$a = g \\cos\\alpha$', '$a = g \\tan\\alpha$', '$a = g$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'$mg\\cos\\alpha$ هو إسقاط الثقل على المحور الناظمي ويكافئ $R_N$.',
					'راجع إسقاط شعاع الثقل على المحور المماس للمستوي.',
					'$a = g$ حالة السقوط الحر الشاقولي ($\alpha = 90^\\circ$).'
				],
				explanationAr:
					'بإسقاط القانون الثاني لنيوتن على محور المستوي الموجه نحو الأسفل: $m g \\sin\\alpha = m a \\implies a = g \\sin\\alpha$.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 2: RC Dipole (Charging, Discharging & Stored Energy)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'phy_lesson_3as_shared_t2_rc_circuit_charge_discharge',
		slug: 'phy-3as-shared-t2-rc-circuit-charge-discharge',
		grade: '3as_se',
		yearSubjectId: 683,
		trimesterId: 't2',
		sequenceId: 'seq4',
		sequenceTitleAr: 'الوحدة 3: دراسة ظواهر كهربائية (ثنائي القطب RC و RL)',
		order: 2,
		domain: 'electricity',
		titleAr: 'ثنائي القطب RC (شحن وتفريغ مكثفة والطاقة المخزنة)',
		objectives: [
			'كتابة وحل المعادلة التفاضلية للتوتر $u_C(t)$ والشحنة $q(t)$ أثناء شحن وتفريغ مكثفة',
			'تعيين ثابت الزمن $\\tau = RC$ بيانياً وبالتحليل البعدي، وحساب الطاقة الكهربائية المخزنة $E_C = \\frac{1}{2} C u_C^2$'
		],
		keywordsAr: ['ثنائي القطب RC', 'المكثفة', 'ثابت الزمن τ', 'المعادلة التفاضلية', 'الطاقة المخزنة'],
		discover: {
			scenarioAr:
				'نركب على التسلسل مولداً مثالياً للتوتر قوته المحركة الكهربائية $E = 10\\text{ V}$، ناقلاً أومياً مقاومته $R = 500\\text{ }\\Omega$، ومكثفة فارغة سعتها $C$. نضع البادلة في الوضع $(1)$ لشحن المكثفة ونسجل التوتر $u_C(t)$ بين طرفيها.',
			svg: svgCircuitDiagram({ kind: 'rc', labels: { e: 'E = 10 V', r: 'R = 500 Ω', c: 'C', switchLabel: 'K' } }),
			steps: [
				{
					promptAr:
						'بتطبيق قانون جمع التوترات في وضع الشحن (1) والعلاقات $i = \\frac{dq}{dt}$ و $q = C u_C$، استنتج المعادلة التفاضلية للتوتر $u_C(t)$.',
					hintAr: 'اكتب $u_R + u_C = E$ وعوض $u_R = R i = R C \\frac{du_C}{dt}$.',
					expectedInput: 'du_C/dt + u_C/(RC) = E/(RC)',
					revealAr:
						'من قانون جمع التوترات: $R C \\frac{du_C}{dt} + u_C = E$، وبالقسمة على $RC$: $\\frac{du_C}{dt} + \\frac{1}{RC}u_C = \\frac{E}{RC}$.'
				},
				{
					promptAr:
						'المماس للمنحنى $u_C(t)$ عند $t = 0$ يقطع المستقيم المقارب $u_C = E = 10\\text{ V}$ عند اللحظة $t = 10\\text{ ms}$. استنتج ثابت الزمن $\\tau$ وسعة المكثفة $C$ بوحدة الميكروفاراد ($\\mu\\text{F}$).',
					hintAr: '$\tau = RC \implies C = \frac{\tau}{R}$ مع $\tau = 10\\times 10^{-3}\\text{ s}$.',
					expectedInput: '20',
					revealAr:
						'نقطة تقاطع المماس عند $t=0$ مع $u_C = E$ تعطي $\\tau = 10\\text{ ms} = 0.01\\text{ s}$. ومنه $C = \\frac{0.01}{500} = 2\\times 10^{-5}\\text{ F} = 20\\text{ }\\mu\\text{F}$.'
				},
				{
					promptAr:
						'احسب الطاقة الكهربائية العظمى المخزنة في المكثفة عند نهاية الشحن ($u_C = E = 10\\text{ V}$) بوحدة الميليجول ($\\text{mJ}$).',
					hintAr: '$E_{C,\\max} = \\frac{1}{2} C E^2$.',
					expectedInput: '1',
					revealAr:
						'$E_{C,\\max} = \\frac{1}{2} \\times 20\\times 10^{-6} \\times 10^2 = 10^{-3}\\text{ J} = 1\\text{ mJ}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**العلاقات الأساسية**: $q = C u_C$، $i(t) = \\frac{dq}{dt} = C\\frac{du_C}{dt}$، $u_R = R i$. وحدة السعة هي الفاراد ($\\text{F}$).',
				'**الشحن (البادلة في الوضع 1)**: المعادلة التفاضلية $\\frac{du_C}{dt} + \\frac{1}{\\tau}u_C = \\frac{E}{\\tau}$، حلها $u_C(t) = E\\left(1 - e^{-t/\\tau}\\right)$، وشدة التيار $i(t) = \\frac{E}{R} e^{-t/\\tau}$.',
				'**التفريغ (البادلة في الوضع 2)**: المعادلة التفاضلية $\\frac{du_C}{dt} + \\frac{1}{\\tau}u_C = 0$، حلها $u_C(t) = E\\,e^{-t/\\tau}$، وشدة التيار $i(t) = -\\frac{E}{R} e^{-t/\\tau}$.',
				'**التحليل البعدي لـ $\\tau = RC$**: $[R] = \\frac{[U]}{[I]}$ و $[C] = \\frac{[Q]}{[U]} = \\frac{[I][T]}{[U]}$، ومنه $[\\tau] = [R][C] = \\text{T}$ (زمن بالثانية $\\text{s}$). يتم الشحن/التفريغ عملياً بعد $t \\approx 5\\tau$.',
				'**الطاقة المخزنة**: $E_C(t) = \\frac{1}{2} C u_C^2(t) = \\frac{1}{2}\\frac{q^2(t)}{C}$. عند $t = \\tau$ في الشحن: $u_C(\\tau) = 0.63 E$ و في التفريغ $u_C(\\tau) = 0.37 E$.'
			],
			visualSvg: svgRcChargeCurve,
			visualCaptionAr: 'منحنى $u_C(t)$ و $u_R(t)$ خلال الشحن وتعيين $\\tau$ بطريقة المماس أو $0.63 E$',
			examples: [
				{
					problemAr:
						'خلال تفريغ مكثفة سعتها $C = 100\\text{ }\\mu\\text{F}$ مشحونة تحت $E = 12\\text{ V}$ في ناقل أومي $R = 200\\text{ }\\Omega$، أوجد الزمن اللازم لتتناقص طاقتها المخزنة إلى ربع قيمتها العظمى ($E_C(t) = \\frac{1}{4}E_{C,\\max}$).',
					solutionAr:
						'بما أن $E_C(t) = \\frac{1}{2}C u_C^2(t)$ فإن $\\frac{E_C(t)}{E_{C,\\max}} = e^{-2t/\\tau} = \\frac{1}{4} \\implies e^{-t/\\tau} = \\frac{1}{2} \\implies t = \\tau \\ln 2$. لدينا $\\tau = 200 \\times 10^{-4} = 20\\text{ ms}$، ومنه $t = 20 \\ln 2 \\approx 13.86\\text{ ms}$.'
				}
			],
			watchOutAr:
				'زمن نصف التناقص للطاقة المخزنة في المكثفة يساوي $\\frac{\\tau \\ln 2}{2}$ وليس $\\tau \\ln 2$، لأن $E_C(t) \\propto u_C^2(t) \\propto e^{-2t/\\tau}$!'
		},
		practice: [
			{
				questionAr: 'في حالة شحن مكثفة، التوتر $u_C(t)$ عند اللحظة $t = \\tau$ يساوي:',
				options: ['$0.63\\,E$', '$0.37\\,E$', '$0.50\\,E$', '$0.99\\,E$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'$0.37\\,E$ هي قيمة $u_C(\\tau)$ أثناء التفريغ أو $u_R(\\tau)$ أثناء الشحن.',
					'$0.50\\,E$ يوافق $t_{1/2} = \\tau\\ln 2$.',
					'$0.99\\,E$ يوافق $t = 5\\tau$.'
				],
				explanationAr:
					'$u_C(\\tau) = E(1 - e^{-1}) \\approx 0.632\\,E$.'
			},
			{
				questionAr:
					'إذا ضاعفنا قيمة المقاومة $R$ وقلصنا سعة المكثفة $C$ إلى النصف، فإن ثابت الزمن $\\tau = RC$:',
				options: [
					'يبقى ثابتاً لا يتغير',
					'يتضاعف مرتين',
					'ينقص إلى النصف',
					'يتضاعف أربع مرات'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'نسيت أثر تقليص $C$ إلى النصف.',
					'نسيت أثر مضاعفة $R$.',
					'الجداء $2R \\times (C/2) = RC$.'
				],
				explanationAr:
					'$\\tau\' = (2R) \\times \\left(\\frac{C}{2}\\right) = RC = \\tau$.'
			},
			{
				questionAr:
					'خلال شحن مكثفة، ميل المماس للمنحنى $u_C(t)$ عند اللحظة $t = 0$ يساوي $200\\text{ V/s}$ والتوتر الأعظمي $E = 12\\text{ V}$. قيمة ثابت الزمن $\\tau$ هي:',
				options: ['60 ms', '2400 ms', '16.7 ms', '6 ms'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'ضربت $E$ في الميل بدلاً من القسمة.',
					'عكست النسبة ($\\text{الميل} / E$).',
					'راجع الفاصلة العشرية في $\\frac{12}{200} = 0.06\\text{ s} = 60\\text{ ms}$.'
				],
				explanationAr:
					'من المعادلة التفاضلية عند $t=0$ ($u_C(0)=0$): $\\left(\\frac{du_C}{dt}\\right)_0 = \\frac{E}{\\tau} \\implies \\tau = \\frac{12}{200} = 0.06\\text{ s} = 60\\text{ ms}$.'
			},
			{
				questionAr:
					'بيان $\\ln(u_C)$ بدلالة $t$ خلال تفريغ مكثفة هو خط مستقيم معامل توجيهه $-25\\text{ s}^{-1}$. قيمة $\\tau$ تساوي:',
				options: ['40 ms', '25 ms', '4 ms', '250 ms'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'ميل المستقيم هو $-1/\\tau$ وليس $-\\tau$.',
					'تحقق من التحويل: $1/25 = 0.04\\text{ s} = 40\\text{ ms}$.',
					'تحقق من الحساب $1/25$.'
				],
				explanationAr:
					'$\\ln(u_C(t)) = \\ln E - \\frac{1}{\\tau}t$، إذن $-\\frac{1}{\\tau} = -25 \\implies \\tau = \\frac{1}{25} = 0.04\\text{ s} = 40\\text{ ms}$.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 3: RL Dipole (Current Growth, Decay & Magnetic Energy)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'phy_lesson_3as_shared_t2_rl_circuit_current_energy',
		slug: 'phy-3as-shared-t2-rl-circuit-current-energy',
		grade: '3as_se',
		yearSubjectId: 683,
		trimesterId: 't2',
		sequenceId: 'seq4',
		sequenceTitleAr: 'الوحدة 3: دراسة ظواهر كهربائية (ثنائي القطب RC و RL)',
		order: 3,
		domain: 'electricity',
		titleAr: 'ثنائي القطب RL (تأسيس وانقطاع التيار في وشيعة والطاقة المغناطيسية)',
		objectives: [
			'نمذجة الوشيعة الحقيقية $(L, r)$ وكتابة وحل المعادلة التفاضلية لشدة التيار $i(t)$ عند غلق وفتح القاطعة',
			'تعيين ثابت الزمن $\\tau = \\frac{L}{R+r}$ وقيمة التيار الدائم $I_0$، وحساب الطاقة المغناطيسية المخزنة $E_L = \\frac{1}{2} L i^2$'
		],
		keywordsAr: ['ثنائي القطب RL', 'الوشيعة', 'تأسيس التيار', 'انقطاع التيار', 'الطاقة المغناطيسية'],
		discover: {
			scenarioAr:
				'نحقق دارة على التسلسل تضم مولداً مثالياً $E = 12\\text{ V}$، ناقلاً أومياً $R = 40\\text{ }\\Omega$، ووشيعة حقيقية ذاتيتها $L$ ومقاومتها الداخلية $r$. عند غلق القاطعة $K$ نلاحظ أن شدة التيار تبلغ قيمة دائمة $I_0 = 0.25\\text{ A}$ وأن ثابت الزمن المقاس بيانياً هو $\\tau = 4\\text{ ms}$.',
			svg: svgCircuitDiagram({ kind: 'rl', labels: { e: 'E = 12 V', r: 'R = 40 Ω', l: '(L, r)', switchLabel: 'K' } }),
			steps: [
				{
					promptAr:
						'اكتب عبارة التوتر $u_b(t)$ بين طرفي الوشيعة الحقيقية $(L, r)$ بدلالة $i$ و $\\frac{di}{dt}$، ثم استنتج المقاومة الداخلية $r$ للوشيعة.',
					hintAr: 'في النظام الدائم $\\frac{di}{dt} = 0$ و $E = (R + r)I_0$.',
					expectedInput: '8',
					revealAr:
						'$u_b = L\\frac{di}{dt} + r i$. في النظام الدائم: $R + r = \\frac{E}{I_0} = \\frac{12}{0.25} = 48\\text{ }\\Omega \\implies r = 48 - 40 = 8\\text{ }\\Omega$.'
				},
				{
					promptAr:
						'استنتج ذاتية الوشيعة $L$ بوحدة الميليهنري ($\\text{mH}$) انطلاقاً من $\\tau = 4\\text{ ms}$.',
					hintAr: '$\\tau = \\frac{L}{R + r} \\implies L = \\tau (R + r)$.',
					expectedInput: '192',
					revealAr:
						'$L = 4\\times 10^{-3} \\times 48 = 0.192\\text{ H} = 192\\text{ mH}$.'
				},
				{
					promptAr:
						'احسب الطاقة المغناطيسية المخزنة في الوشيعة في النظام الدائم بوحدة الميليجول ($\\text{mJ}$).',
					hintAr: '$E_{L,\\max} = \\frac{1}{2} L I_0^2$.',
					expectedInput: '6',
					revealAr:
						'$E_{L,\\max} = \\frac{1}{2} \\times 0.192 \\times (0.25)^2 = 0.006\\text{ J} = 6\\text{ mJ}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**الوشيعة الحقيقية**: تُنمذج بذاتية $L$ (بالهنري $\\text{H}$) ومقاومة داخلية $r$ على التسلسل: $u_b(t) = L\\frac{di}{dt} + r\\,i$. في النظام الدائم ($\\frac{di}{dt}=0$): $u_b = r I_0$.',
				'**تأسيس التيار (غلق القاطعة)**: المعادلة التفاضلية $\\frac{di}{dt} + \\frac{R+r}{L} i = \\frac{E}{L}$. الحل: $i(t) = I_0\\left(1 - e^{-t/\\tau}\\right)$ حيث $I_0 = \\frac{E}{R+r}$ و $\\tau = \\frac{L}{R+r}$.',
				'**انقطاع التيار (فتح القاطعة)**: المعادلة التفاضلية $\\frac{di}{dt} + \\frac{R_{\\text{tot}}}{L} i = 0$ وحلها $i(t) = I_0\\,e^{-t/\\tau\'}$. يُركب **صمام ثنائي** على التفرع مع الوشيعة لحماية القاطعة من شرارة فرط التوتر عند الفتح.',
				'**التحليل البعدي لـ $\\tau = \\frac{L}{R_t}$**: من $u = L\\frac{di}{dt}$ لدينا $[L] = \\frac{[U][T]}{[I]}$ و $[R_t] = \\frac{[U]}{[I]}$، إذن $[\\tau] = \\frac{[L]}{[R_t]} = \\text{T}$ (زمن بالثانية).',
				'**الطاقة المغناطيسية المخزنة**: $E_L(t) = \\frac{1}{2} L i^2(t)$؛ وهي تتعارض الوشيعة مع تغيرات التيار اللحظية ($i(t)$ دالة مستمرة دوماً!).'
			],
			visualSvg: svgRlGrowthCurve,
			visualCaptionAr: 'منحنى تأسيس التيار $i(t)$ في ثنائي القطب RL وتعيين $I_0$ و $\\tau$',
			examples: [
				{
					problemAr:
						'دارة $RL$ فيها $E = 6\\text{ V}$ و $R = 50\\text{ }\\Omega$ ووشيعة $(L, r)$. إذا كان التوتر بين طرفي الوشيعة في النظام الدائم $u_b(\\infty) = 1\\text{ V}$، احسب $r$ و $I_0$.',
					solutionAr:
						'في النظام الدائم $u_R(\\infty) = E - u_b(\\infty) = 5\\text{ V}$، إذن $I_0 = \\frac{u_R(\\infty)}{R} = \\frac{5}{50} = 0.1\\text{ A}$، ومنه $r = \\frac{u_b(\\infty)}{I_0} = \\frac{1}{0.1} = 10\\text{ }\\Omega$.'
				}
			],
			watchOutAr:
				'احذر عند رسم أو حساب التوتر بين طرفي الوشيعة الحقيقية في النظام الدائم: لا ينعدم $u_b(\\infty)$ إلا إذا كانت الوشيعة مثالية ($r = 0$)؛ أما إذا كانت حقيقية ($r > 0$) فإن $u_b(\\infty) = r I_0 > 0$!'
		},
		practice: [
			{
				questionAr: 'مباشرة عند لحظة غلق القاطعة ($t = 0^+$) في دارة RL، يكون التوتر بين طرفي الوشيعة $(L, r)$ مساوياً لـ:',
				options: ['$E$', '$0$', '$r I_0$', '$\\frac{E}{2}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'ينعدم $u_R(0) = R i(0) = 0$ لأن $i(0)=0$، وليس $u_b(0)$.',
					'$r I_0$ هو التوتر في النظام الدائم ($t \\to \\infty$).',
					'في اللحظة $t=0$ يقع كامل توتر المولد على الوشيعة.'
				],
				explanationAr:
					'بما أن التيار مستمر عند $t=0$ فإن $i(0)=0 \\implies u_R(0)=0$، وبقانون جمع التوترات $u_b(0) = E - u_R(0) = E$.'
			},
			{
				questionAr: 'ما الدور الأساسي للصمام الثنائي الموصول على التفرع مع الوشيعة عند فتح القاطعة؟',
				options: [
					'حماية القاطعة من شرارة التوتر المفرط الناتجة عن انقطاع التيار المفاجئ',
					'شحن الوشيعة بسرعة أكبر',
					'رفع قيمة التيار الدائم $I_0$',
					'تقليل المقاومة الداخلية $r$ للوشيعة'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'الصمام مسدود خلال التأسيس ولا يؤثر في الشحن.',
					'الصمام لا يرفع $I_0$.',
					'المقاومة $r$ ثابتة للوشيعة.'
				],
				explanationAr:
					'عند فتح القاطعة يسعى الصمام الثنائي لتأمين استمرارية مرور تيار التفريغ في حلقة الوشيعة وتفادي فرط التوتر $L\\frac{di}{dt}$ عبر مربطي القاطعة.'
			},
			{
				questionAr:
					'دارة تضم $E = 9\\text{ V}$ و $R = 35\\text{ }\\Omega$ ووشيعة $(L = 0.2\\text{ H}, r = 5\\text{ }\\Omega)$. قيمة ثابت الزمن $\\tau$ هي:',
				options: ['5 ms', '5.7 ms', '40 ms', '8 ms'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'أغفلت جمع المقاومة الداخلية $r = 5\\text{ }\\Omega$ مع $R$.',
					'راجع القسمة $0.2 / 40 = 0.005\\text{ s} = 5\\text{ ms}$.',
					'تحقق من المعادلة $\\tau = L/(R+r)$.'
				],
				explanationAr:
					'$\\tau = \\frac{L}{R + r} = \\frac{0.2}{35 + 5} = 0.005\\text{ s} = 5\\text{ ms}$.'
			},
			{
				questionAr:
					'يمثل البيان $u_b(t)$ لتأسيس التيار في وشيعة مثالية ($r=0$) دالة أسية متناقصة من $E$ نحو $0$. إذا انقطع المماس عند $t=0$ لمحور الزمن عند $t = 8\\text{ ms}$، وبلغ $I_0 = 0.4\\text{ A}$ تحت $E = 12\\text{ V}$، فإن $L$ تساوي:',
				options: ['0.24 H', '0.30 H', '0.12 H', '2.4 H'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'استعملت $R = E/I_0 = 30\\text{ }\\Omega$ ثم أخطأت في $L = R \\tau$.',
					'قسمت على $2$ دون مبرر.',
					'راجع تحويل $8\\text{ ms} = 8\\times 10^{-3}\\text{ s}$.'
				],
				explanationAr:
					'لدينا $R = \\frac{E}{I_0} = \\frac{12}{0.4} = 30\\text{ }\\Omega$ و $\\tau = 8\\times 10^{-3}\\text{ s}$، ومنه $L = R \\tau = 30 \\times 8\\times 10^{-3} = 0.24\\text{ H}$.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 4: pH, Acids/Bases, τ_f, Q_r, K & pKa
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'phy_lesson_3as_shared_t2_ph_acids_bases_equilibrium',
		slug: 'phy-3as-shared-t2-ph-acids-bases-equilibrium',
		grade: '3as_se',
		yearSubjectId: 683,
		trimesterId: 't2',
		sequenceId: 'seq5',
		sequenceTitleAr: 'الوحدة 4: تطور جملة كيميائية نحو حالة التوازن',
		order: 4,
		domain: 'kinetics_eq',
		titleAr: 'الـ pH، الأحماض والأسس، نسبة التقدم النهائي $\\tau_f$، وكسر التفاعل وثابت التوازن $K$',
		objectives: [
			'التمييز بين الحمض/الأساس القوي والضعيف بحساب نسبة التقدم النهائي $\\tau_f = \\frac{x_f}{x_{\\max}}$',
			'حساب كسر التفاعل $Q_r$ وثابت التوازن $K$ وثابت الحموضة $K_a$ والـ $pK_a$، وتطبيق علاقة هندرسون لتحديد الصفة الغالبة'
		],
		keywordsAr: ['نسبة التقدم النهائي', 'كسر التفاعل Q_r', 'ثابت التوازن K', 'ثابت الحموضة pK_a', 'التوازن الكيميائي'],
		discover: {
			scenarioAr:
				`نحضر محلولاً مائياً لحمض الإيثانويك $\\ce{CH3COOH}$ تركيزه المولي $C = 1.0\\times 10^{-2}\\text{ mol/L}$ عند $25^\\circ\\text{C}$، فنجد باستعمال جهاز الـ pH-متر أن قيمة $pH = 3.4$. معادلة التفاعل مع الماء هي: ${eqWeakAcid.katex}`,
			steps: [
				{
					promptAr:
						'احسب التركيز النهائي لشوارد الهيدرونيوم $[\\ce{H3O+}]_f$ بوحدة $\\text{mol/L}$ (علماً أن $10^{-3.4} \\approx 3.98\\times 10^{-4}$).',
					hintAr: 'استعمل تعريف الـ pH: $[\\ce{H3O+}] = 10^{-pH}$.',
					expectedInput: '3.98e-4',
					revealAr:
						'$[\\ce{H3O+}]_f = 10^{-3.4} \\approx 3.98\\times 10^{-4}\\text{ mol/L}$.'
				},
				{
					promptAr:
						'باستعمال جدول التقدم، احسب نسبة التقدم النهائي $\\tau_f = \\frac{x_f}{x_{\\max}}$ (بالنسبة المئوية) واستنتج هل الحمض قوي أم ضعيف.',
					hintAr: '$\\tau_f = \\frac{[\\ce{H3O+}]_f}{C}$.',
					expectedInput: '4',
					revealAr:
						'$\\tau_f = \\frac{3.98\\times 10^{-4}}{1.0\\times 10^{-2}} \\approx 0.0398 \\approx 4\\% < 100\\%$، إذن التحول غير تام وحمض الإيثانويك **حمض ضعيف**.'
				},
				{
					promptAr:
						'احسب كسر التفاعل عند التوازن $Q_{r,\\text{eq}} = K_a$ ثم استنتج قيمة الـ $pK_a$ للثنائية $\\ce{CH3COOH}/\\ce{CH3COO-}$ (مقربة إلى رقم بعد الفاصلة).',
					hintAr: '$K_a = \\frac{[\\ce{H3O+}]_f^2}{C - [\\ce{H3O+}]_f}$ و $pK_a = -\\log K_a$.',
					expectedInput: '4.8',
					revealAr:
						'$K_a = \\frac{(3.98\\times 10^{-4})^2}{10^{-2} - 3.98\\times 10^{-4}} \\approx 1.65\\times 10^{-5}$، ومنه $pK_a = -\\log(1.65\\times 10^{-5}) \\approx 4.78 \\approx 4.8$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**جدول التقدم لانحلال حمض ضعيف $HA$ في الماء**:\n\n' + iceWeakAcid.markdownTable,
				'**نسبة التقدم النهائي $\\tau_f$**: $\\tau_f = \\frac{x_f}{x_{\\max}}$. للحمض القوي $\\tau_f = 1$ ($pH = -\\log C$)، وللحمض الضعيف $\\tau_f < 1$ ويزداد التمديد (نقصان $C$) فيزيد $\\tau_f$.',
				'**كسر التفاعل $Q_r$ وثابت التوازن $K$**: للتفاعل $aA + bB \\rightleftharpoons cC + dD$، $Q_r = \\frac{[C]^c [D]^d}{[A]^a [B]^b}$ (لا يظهر الماء المذيب والأجسام الصلبة في العبارة!). عند التوازن $Q_{r,\\text{eq}} = K$ ويتعلق $K$ بدرجة الحرارة فقط.',
				'**الجداء الشاردي للماء وثابت الحموضة**: $K_e = [\\ce{H3O+}][\\ce{OH-}] = 10^{-14}$ عند $25^\\circ\\text{C}$ ($pK_e = 14$). وللثنائية $HA/A^-$: $K_a = \\frac{[A^-]_{\\text{eq}}[\\ce{H3O+}]_{\\text{eq}}}{[HA]_{\\text{eq}}}$ و $pH = pK_a + \\log\\frac{[A^-]}{[HA]}$ (علاقة هندرسون).',
				'**مجال التغلب**: إذا كان $pH < pK_a$ فالحمض $HA$ غالب؛ إذا كان $pH > pK_a$ فالأساس $A^-$ غالب؛ وإذا كان $pH = pK_a$ فإن $[HA] = [A^-]$.'
			],
			examples: [
				{
					problemAr:
						'في محلول مائي للنشادر $\\ce{NH3}$ ($pK_a(\\ce{NH4+}/\\ce{NH3}) = 9.2$) عند $25^\\circ\\text{C}$، قيس $pH = 10.6$. احسب ثابت التوازن $K$ لتفاعل النشادر مع الماء، وحدد الصفة الغالبة.',
					solutionAr:
						'تفاعل الأساس مع الماء: $\\ce{NH3 + H2O <=> NH4+ + OH-}$. لدينا $K = \\frac{K_e}{K_a} = 10^{pK_a - 14} = 10^{9.2 - 14} = 10^{-4.8} \\approx 1.58\\times 10^{-5}$. وبما أن $pH = 10.6 > pK_a = 9.2$ فإن الصفة الغالبة هي الأساس $\\ce{NH3}$.'
				}
			],
			watchOutAr:
				'قيمة ثابت التوازن $K$ (و $K_a$) لا تتغير بتمديد المحلول أو بتغيير التراكيز الابتدائية عند ثبوت درجة الحرارة، بينما تزداد نسبة التقدم النهائي $\\tau_f$ عند التمديد!'
		},
		practice: [
			{
				questionAr:
					'عند تمديد محلول مائي لحمض ضعيف $HA$ بإضافة الماء المقطر عند درجة حرارة ثابتة، فإن:',
				options: [
					'تزداد نسبة التقدم النهائي $\\tau_f$ ويبقى ثابت الحموضة $K_a$ ثابتاً',
					'تنقص $\\tau_f$ ويزداد $K_a$',
					'تبقى $\\tau_f$ ثابتة ويزداد $K_a$',
					'ينقص الـ $pH$ وتنقص $\\tau_f$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'$K_a$ يتعلق بالحرارة فقط ويزداد تشرد الحمض الضعيف بالتمديد.',
					'$\\tau_f$ يزداد بالتمديد لأن كسر التفاعل يقل مؤقتاً فيتطور التفاعل في الاتجاه المباشر.',
					'بالتمديد يقل $[\\ce{H3O+}]$ فيرتفع الـ $pH$.'
				],
				explanationAr:
					'ثابت الحموضة $K_a$ يعتمد على درجة الحرارة فقط، وعند التمديد يتشرد الحمض أكثر فتزداد $\\tau_f$ ويرتفع $pH$.'
			},
			{
				questionAr:
					'تفاعل حمض $HA_1$ ($pK_{a1} = 3.8$) مع أساس $A_2^-$ ($pK_{a2} = 9.2$): $\\ce{HA1 + A2- <=> A1- + HA2}$. قيمة ثابت التوازن $K$ هي:',
				options: ['$10^{5.4}$', '$10^{-5.4}$', '$10^{13}$', '$10^{-13}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'عكست إشارة الأس $K = K_{a1}/K_{a2} = 10^{pK_{a2} - pK_{a1}}$.',
					'جمعت الـ $pK_a$ بدلاً من طرحهما.',
					'راجع العلاقة $K = \\frac{K_{a1}}{K_{a2}}$.'
				],
				explanationAr:
					'$K = \\frac{[A_1^-][HA_2]}{[HA_1][A_2^-]} = \\frac{K_{a1}}{K_{a2}} = 10^{pK_{a2} - pK_{a1}} = 10^{9.2 - 3.8} = 10^{5.4} > 10^4$ (تفاعل تام عملياً).'
			},
			{
				questionAr: 'في محلول حمض الإيثانويك ($pK_a = 4.8$) ذي $pH = 5.8$، النسبة $\\frac{[\\ce{CH3COO-}]}{[\\ce{CH3COOH}]}$ تساوي:',
				options: ['10', '0.1', '1', '100'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'تلك هي نسبة الحمض إلى الأساس.',
					'تتساوى النسبة عند $pH = pK_a = 4.8$.',
					'الفرق $pH - pK_a = 1$ وليس $2$.'
				],
				explanationAr:
					'$\\log\\frac{[A^-]}{[HA]} = pH - pK_a = 5.8 - 4.8 = 1 \\implies \\frac{[A^-]}{[HA]} = 10^1 = 10$.'
			},
			{
				questionAr: 'محلول حمض كلور الهيدروجين $\\ce{HCl}$ القوي تركيزه $C = 10^{-3}\\text{ mol/L}$ له $pH$ يساوي:',
				options: ['3', '11', '1', '4'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'$11$ هي قيمة الـ $pH$ لأساس قوي تركيزه $10^{-3}\\text{ mol/L}$.',
					'$pH = 1$ يوافق $C = 0.1\\text{ mol/L}$.',
					'تحقق من $-\\log(10^{-3})$.'
				],
				explanationAr:
					'للحمض القوي $[\\ce{H3O+}] = C = 10^{-3}\\text{ mol/L} \\implies pH = -\\log(10^{-3}) = 3$.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 5: pH-Metric Titration (Equivalence & Half-Equivalence)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'phy_lesson_3as_shared_t2_ph_metric_titration',
		slug: 'phy-3as-shared-t2-ph-metric-titration',
		grade: '3as_se',
		yearSubjectId: 683,
		trimesterId: 't2',
		sequenceId: 'seq5',
		sequenceTitleAr: 'الوحدة 4: تطور جملة كيميائية نحو حالة التوازن',
		order: 5,
		domain: 'kinetics_eq',
		titleAr: 'المعايرة الـ pH-مترية (تحديد نقطة التكافؤ ونصف التكافؤ)',
		objectives: [
			'استغلال منحنى المعايرة $pH = f(V)$ لتعيين نقطة التكافؤ بطريقة المماسات المتوازية أو المشتق $\\frac{dpH}{dV}$',
			'استثمار نقطة نصف التكافؤ ($pH = pK_a$) واختيار الكاشف الملون المناسب للمعايرة'
		],
		keywordsAr: ['المعايرة الـ pH-مترية', 'طريقة المماسات', 'نقطة نصف التكافؤ', 'الكاشف الملون'],
		discover: {
			scenarioAr:
				'نعاير حجماً $V_a = 20\\text{ mL}$ من محلول حمض الإيثانويك $\\ce{CH3COOH}$ مجهول التركيز $C_a$ بواسطة محلول هيدروكسيد الصوديوم $(\\ce{Na+ + OH-})$ تركيزه $C_b = 0.10\\text{ mol/L}$ باستعمال جهاز الـ pH-متر. يوضح المنحنى تغيرات الـ $pH$ بدلالة حجم الأساس المضاف $V_b$.',
			svg: svgPhTitrationCurve,
			steps: [
				{
					promptAr:
						'اكتب معادلة تفاعل المعايرة الكلي، ثم حدد إحداثيي نقطة التكافؤ $E(V_{bE}, pH_E)$ من المنحنى.',
					hintAr: 'اقرأ فاصلة وترتيب النقطة $E$ المحددة بطريقة المماسات المتوازية.',
					expectedInput: '20',
					revealAr:
						'معادلة المعايرة التامة: $\\ce{CH3COOH + OH- -> CH3COO- + H2O}$. من المنحنى نجد $V_{bE} = 20\\text{ mL}$ و $pH_E \\approx 8.7 > 7$ (الوسط قاعدي عند التكافؤ لوجود الأساس المرافق $\\ce{CH3COO-}$).'
				},
				{
					promptAr:
						'احسب التركيز المولي $C_a$ لحمض الإيثانويك بوحدة $\\text{mol/L}$.',
					hintAr: 'عند التكافؤ: $C_a V_a = C_b V_{bE}$.',
					expectedInput: '0.1',
					revealAr:
						'$C_a = \\frac{C_b V_{bE}}{V_a} = \\frac{0.10 \\times 20}{20} = 0.10\\text{ mol/L}$.'
				},
				{
					promptAr:
						'عيّن حجم نصف التكافؤ $V_{b,1/2}$ واستنتج من المنحنى قيمة $pK_a$ للثنائية $\\ce{CH3COOH}/\\ce{CH3COO-}$.',
					hintAr: 'عند $V_b = \\frac{V_{bE}}{2} = 10\\text{ mL}$ يكون $[\\ce{CH3COOH}] = [\\ce{CH3COO-}]$.',
					expectedInput: '4.8',
					revealAr:
						'عند $V_{b,1/2} = 10\\text{ mL}$ يتساوى تركيز الحمض وأساسه المرافق فيكون $pH = pK_a = 4.8$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**خصائص تفاعل المعايرة**: تفاعل **سريع، تام، ووحيد** ($K \\gg 10^4$). مثال حمض ضعيف بأساس قوي: $\\ce{HA + OH- -> A- + H2O}$ ($K = \\frac{K_a}{K_e} = 10^{14 - pK_a}$).',
				'**طرق تعيين نقطة التكافؤ $E(V_E, pH_E)$**: (1) **طريقة المماسات المتوازية** (مماسين عند انعطاف المنحنى ومستقيم منصف في المنتصف)، (2) **طريقة المنحنى المشتق** $\\frac{dpH}{dV}$ حيث يوافق $V_E$ الذروة الحادة.',
				'**قيمة $pH_E$ عند التكافؤ**: في معايرة حمض قوي بأساس قوي $pH_E = 7$؛ حمض ضعيف بأساس قوي $pH_E > 7$؛ أساس ضعيف بحمض قوي $pH_E < 7$.',
				'**نقطة نصف التكافؤ**: عند $V = \\frac{V_E}{2}$ يكون $[HA] = [A^-]$ وبالتالي $pH = pK_a$ (وهي خاصة بالمعايرة التي تضم ثنائية حمض/أساس ضعيفة).',
				'**اختيار الكاشف الملون**: نختار الكاشف الذي يحتوي **مجال تغيره اللوني** على قيمة $pH_E$ (مثلاً الفينول فتالين $[8.2; 10.0]$ لمعايرة حمض ضعيف بأساس قوي، وأحمر المثيل $[4.2; 6.2]$ لأساس ضعيف بحمض قوي).'
			],
			visualSvg: svgPhTitrationCurve,
			visualCaptionAr: 'منحنى معايرة حمض ضعيف بأساس قوي ونقطتا التكافؤ $E$ ونصف التكافؤ $E_{1/2}$',
			examples: [
				{
					problemAr:
						'نعاير $V_b = 10\\text{ mL}$ من محلول النشادر $\\ce{NH3}$ ($pK_a = 9.2$) بحمض كلور الهيدروجين $\\ce{HCl}$ تركيزه $C_a = 0.05\\text{ mol/L}$. يحدث التكافؤ عند $V_{aE} = 16\\text{ mL}$ و $pH_E = 5.3$. احسب $C_b$ واختر الكاشف المناسب بين: الهيليانتين $[3.1; 4.4]$، أحمر المثيل $[4.2; 6.2]$، والفينول فتالين $[8.2; 10.0]$.',
					solutionAr:
						'$C_b = \\frac{C_a V_{aE}}{V_b} = \\frac{0.05 \\times 16}{10} = 0.08\\text{ mol/L}$. بما أن $pH_E = 5.3 \\in [4.2; 6.2]$، فالكاشف المناسب هو **أحمر المثيل**.'
				}
			],
			watchOutAr:
				'إضافة الماء المقطر إلى البيشر قبل المعايرة تغيّر قيمة الـ $pH$ الابتدائي ولا تغيّر حجم التكافؤ $V_E$ مطلقاً، لأن كمية مادة الحمض (أو الأساس) المعايَر لم تتغير!'
		},
		practice: [
			{
				questionAr: 'في معايرة حمض ضعيف بأساس قوي، لماذا يكون $pH_E > 7$ عند نقطة التكافؤ؟',
				options: [
					'لوجود الأساس المرافق الضعيف $A^-$ المتفاعل مع الماء في المزيج عند التكافؤ',
					'لأن الأساس القوي يكون بالزيادة عند التكافؤ',
					'لأن الحمض الضعيف لم يتفاعل كلياً عند التكافؤ',
					'لأن الجداء الشاردي للماء $K_e$ أكبر من $10^{-14}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'عند التكافؤ يتكافأ المتفاعلان تماماً ولا توجد زيادة من $OH^-$.',
					'تفاعل المعايرة تام فيُستهلك كل الحمض $HA$.',
					'$K_e = 10^{-14}$ عند $25^\\circ\\text{C}$.'
				],
				explanationAr:
					'عند التكافؤ يتحول كل الحمض $HA$ إلى أساسه المرافق $A^-$، الذي يتفاعل جزئياً مع الماء منتجاً $\\ce{OH-}$ فيصبح الوسط قاعدياً ($pH_E > 7$).'
			},
			{
				questionAr: 'عند إضافة الماء المقطر إلى البيشر المحتوي على الحمض قبل بدء المعايرة:',
				options: [
					'يبقى حجم التكافؤ $V_E$ ثابتاً دون تغيير',
					'يزداد حجم التكافؤ $V_E$',
					'ينقص حجم التكافؤ $V_E$',
					'يتغير ثابت الحموضة $pK_a$ للحمض'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'كمية مادة الحمض في البيشر $n_a = C_a V_a$ لم تتغير بإضافة الماء.',
					'الماء المقطر لا يستهلك الحمض.',
					'$pK_a$ يتعلق بدرجة الحرارة فقط.'
				],
				explanationAr:
					'علاقة التكافؤ تعتمد على كمية المادة الابتدائية $n_a = C_b V_{bE}$ وهي لا تتأثر بالتمديد.'
			},
			{
				questionAr:
					'إذا كان حجم التكافؤ في معايرة حمض ضعيف بأساس قوي هو $V_{bE} = 18\\text{ mL}$، فإننا نقرأ قيمة $pK_a$ مباشرة من المنحنى عند الحجم:',
				options: ['$9\\text{ mL}$', '$18\\text{ mL}$', '$36\\text{ mL}$', '$4.5\\text{ mL}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'عند $18\\text{ mL}$ نكون عند التكافؤ ($pH_E$) وليس نصف التكافؤ.',
					'بعد التكافؤ يسود الأساس القوي المضاف.',
					'نصف $18$ هو $9$ وليس $4.5$.'
				],
				explanationAr:
					'نقطة نصف التكافؤ تقع عند $V_b = \\frac{V_{bE}}{2} = 9\\text{ mL}$ حيث $[HA] = [A^-] \\implies pH = pK_a$.'
			},
			{
				questionAr:
					'أي كاشف ملون نختاره لمعايرة محلول حمض الميثانويك بهيدروكسيد الصوديوم حيث $pH_E = 8.4$؟',
				options: [
					'الفينول فتالين ($[8.2 ; 10.0]$)',
					'أزرق البروموثيمول ($[6.0 ; 7.6]$)',
					'الهيليانتين ($[3.1 ; 4.4]$)',
					'أحمر المثيل ($[4.2 ; 6.2]$)'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'الـ $pH_E = 8.4$ خارج المجال $[6.0 ; 7.6]$.',
					'هذا المجال حمضي جداً.',
					'هذا المجال حمضي جداً.'
				],
				explanationAr:
					'يجب أن ينتمي $pH_E = 8.4$ إلى مجال التغير اللوني للكاشف، وهذا يتحقق مع الفينول فتالين $[8.2 ; 10.0]$.'
			}
		]
	}
];

export const SHARED_PHYSICS_LESSONS_3AS_T2: SharedPhysicsLesson[] = RAW_SHARED_PHYSICS_LESSONS_3AS_T2;
