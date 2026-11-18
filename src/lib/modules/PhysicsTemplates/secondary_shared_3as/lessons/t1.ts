import type { PhysicsDomain, PhysicsInteractiveLessonData } from '../../types';
import { buildIceTable, chemEquation, chemSpecies } from '../../chem-helpers';
import { svgPhysicsCurvePlot, svgTitrationSetup, wrapPhysicsSvg } from '../../svg-physics';

export type SharedPhysicsLesson = PhysicsInteractiveLessonData & { domain: PhysicsDomain };

// ═══════════════════════════════════════════════════════════════════════════════
// Custom crisp SVGs for T1 Lessons (Kinetics, Kepler Orbits, Vertical Fall)
// ═══════════════════════════════════════════════════════════════════════════════

const eqIodidePeroxodisulfate = chemEquation(
	[
		{ coeff: 2, formula: 'I-', state: 'aq' },
		{ formula: 'S2O8^2-', state: 'aq' }
	],
	[
		{ formula: 'I2', state: 'aq' },
		{ coeff: 2, formula: 'SO4^2-', state: 'aq' }
	]
);

const iceKineticsLesson1 = buildIceTable({
	equation: eqIodidePeroxodisulfate,
	speciesHeaders: [
		chemSpecies('I-'),
		chemSpecies('S2O8^2-'),
		chemSpecies('I2'),
		chemSpecies('SO4^2-')
	],
	initial: [
		{ katex: '$n_1 = C_1 V_1$', typst: '$n_1 = C_1 V_1$' },
		{ katex: '$n_2 = C_2 V_2$', typst: '$n_2 = C_2 V_2$' },
		{ katex: '$0$', typst: '$0$' },
		{ katex: '$0$', typst: '$0$' }
	],
	intermediate: [
		{ katex: '$n_1 - 2x$', typst: '$n_1 - 2x$' },
		{ katex: '$n_2 - x$', typst: '$n_2 - x$' },
		{ katex: '$x$', typst: '$x$' },
		{ katex: '$2x$', typst: '$2x$' }
	],
	final: [
		{ katex: '$n_1 - 2x_{\\max}$', typst: '$n_1 - 2 x_max$' },
		{ katex: '$n_2 - x_{\\max}$', typst: '$n_2 - x_max$' },
		{ katex: '$x_{\\max}$', typst: '$x_max$' },
		{ katex: '$2x_{\\max}$', typst: '$2 x_max$' }
	]
});

const svgKineticsCurveWithHalfLife = svgPhysicsCurvePlot({
	title: 'تطور التقدم x(t) وتعيين زمن نصف التفاعل t_{1/2}',
	xMin: 0,
	xMax: 40,
	yMin: 0,
	yMax: 5,
	xStep: 10,
	yStep: 1,
	xLabel: 't (min)',
	yLabel: 'x (mmol)',
	curves: [
		{
			fn: (t) => 4 * (1 - Math.exp(-t / 10)),
			color: '#2563eb',
			label: 'x(t) (T₁)'
		},
		{
			fn: (t) => 4 * (1 - Math.exp(-t / 5)),
			color: '#059669',
			dashed: true,
			label: 'x(t) (T₂ > T₁)'
		}
	],
	dashedGuides: [
		{ x1: 0, y1: 4, x2: 40, y2: 4, color: '#475569', label: 'x_max = 4', labelPos: 'top' },
		{ x1: 0, y1: 2, x2: 6.93, y2: 2, color: '#dc2626' },
		{ x1: 6.93, y1: 0, x2: 6.93, y2: 2, color: '#dc2626', label: 't₁/₂ ≈ 6.9 min', labelPos: 'right' },
		{ x1: 0, y1: 0, x2: 10, y2: 4, color: '#d97706', label: 'المماس عند t=0', labelPos: 'left' }
	],
	points: [
		{ x: 6.93, y: 2, label: '(t₁/₂, x_max/2)', color: '#dc2626' }
	]
});

const svgCircularOrbitKepler = wrapPhysicsSvg(
	400,
	220,
	`<rect x="8" y="8" width="384" height="204" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
		`<text x="200" y="27" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">الحركة الدائرية المنتظمة لقمر اصطناعي في معلم جيو-مركزي</text>` +
		`<defs><marker id="kArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626"/></marker>` +
		`<marker id="vArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#2563eb"/></marker></defs>` +
		// Orbit ellipse/circle
		`<circle cx="170" cy="120" r="76" fill="none" stroke="#64748b" stroke-width="1.6" stroke-dasharray="5,4"/>` +
		// Earth
		`<circle cx="170" cy="120" r="24" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="1.8"/>` +
		`<text x="170" y="124" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">الأرض (M_T)</text>` +
		// Radius line
		`<line x1="170" y1="120" x2="224" y2="66" stroke="#0f172a" stroke-width="1.4" stroke-dasharray="3,2"/>` +
		`<text x="187" y="88" font-size="10.5" font-weight="bold" fill="#0f172a">r = R_T + h</text>` +
		// Satellite S
		`<rect x="219" y="61" width="12" height="10" rx="2" fill="#0f172a"/>` +
		`<text x="236" y="60" font-size="11" font-weight="bold" fill="#0f172a">S (m)</text>` +
		// Centripetal force F_T/S
		`<line x1="224" y1="66" x2="196" y2="94" stroke="#dc2626" stroke-width="2.2" marker-end="url(#kArr)"/>` +
		`<text x="206" y="102" font-size="10.5" font-weight="bold" fill="#dc2626">F_T/S</text>` +
		// Tangential velocity v
		`<line x1="224" y1="66" x2="262" y2="104" stroke="#2563eb" stroke-width="2.2" marker-end="url(#vArr)"/>` +
		`<text x="266" y="106" font-size="11" font-weight="bold" fill="#2563eb">v</text>` +
		// Formula box
		`<rect x="268" y="130" width="114" height="68" rx="5" fill="#ffffff" stroke="#94a3b8"/>` +
		`<text x="325" y="148" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e40af">التسارع الناظمي:</text>` +
		`<text x="325" y="165" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">a_n = v²/r = GM_T/r²</text>` +
		`<text x="325" y="185" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#b91c1c">T²/r³ = 4π²/(GM_T)</text>`
);

const svgVerticalFallDiagramAndCurve = wrapPhysicsSvg(
	460,
	215,
	`<rect x="8" y="8" width="150" height="199" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>` +
		`<text x="83" y="26" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">تمثيل القوى في المائع</text>` +
		`<defs><marker id="fArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#0f172a"/></marker></defs>` +
		// z-axis downwards
		`<line x1="30" y1="36" x2="30" y2="188" stroke="#334155" stroke-width="1.5" marker-end="url(#fArr)"/>` +
		`<text x="22" y="192" font-size="11" font-weight="bold">z</text>` +
		// Falling sphere
		`<circle cx="90" cy="112" r="14" fill="#fde68a" stroke="#b45309" stroke-width="1.8"/>` +
		// Weight P down
		`<line x1="90" y1="112" x2="90" y2="178" stroke="#dc2626" stroke-width="2.2" marker-end="url(#fArr)"/>` +
		`<text x="100" y="175" font-size="11.5" font-weight="bold" fill="#dc2626">P</text>` +
		// Archimedes Pi up
		`<line x1="86" y1="112" x2="86" y2="70" stroke="#059669" stroke-width="2" marker-end="url(#fArr)"/>` +
		`<text x="72" y="74" text-anchor="end" font-size="11.5" font-weight="bold" fill="#059669">Π</text>` +
		// Friction f up
		`<line x1="94" y1="112" x2="94" y2="54" stroke="#2563eb" stroke-width="2" marker-end="url(#fArr)"/>` +
		`<text x="104" y="58" font-size="11.5" font-weight="bold" fill="#2563eb">f</text>` +
		// Right side velocity curve
		`<rect x="168" y="8" width="284" height="199" rx="8" fill="#ffffff" stroke="#cbd5e1"/>` +
		`<text x="310" y="26" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">تطور السرعة v(t) في السقوط الشاقولي</text>` +
		`<line x1="205" y1="175" x2="432" y2="175" stroke="#0f172a" stroke-width="1.5" marker-end="url(#fArr)"/>` +
		`<line x1="205" y1="175" x2="205" y2="42" stroke="#0f172a" stroke-width="1.5" marker-end="url(#fArr)"/>` +
		`<text x="434" y="190" text-anchor="end" font-size="10.5" font-weight="bold">t (s)</text>` +
		`<text x="196" y="48" text-anchor="end" font-size="10.5" font-weight="bold">v</text>` +
		// Asymptote v_lim
		`<line x1="205" y1="68" x2="424" y2="68" stroke="#64748b" stroke-width="1.3" stroke-dasharray="5,3"/>` +
		`<text x="198" y="72" text-anchor="end" font-size="10.5" font-weight="bold" fill="#dc2626">v_lim</text>` +
		// Tangent at t=0
		`<line x1="205" y1="175" x2="265" y2="68" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4,3"/>` +
		`<line x1="265" y1="68" x2="265" y2="175" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3"/>` +
		`<text x="265" y="190" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#d97706">τ</text>` +
		// Curve v(t)
		`<path d="M 205,175 Q 245,86 300,73 T 422,69" fill="none" stroke="#2563eb" stroke-width="2.3"/>` +
		`<text x="355" y="102" font-size="10.5" font-weight="bold" fill="#2563eb">النظام الانتقالي</text>` +
		`<text x="375" y="60" font-size="10.5" font-weight="bold" fill="#059669">النظام الدائم</text>`
);

const RAW_SHARED_PHYSICS_LESSONS_3AS_T1: SharedPhysicsLesson[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 1: Time Monitoring of a Chemical Transformation (Methods & ICE)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'phy_lesson_3as_shared_t1_kinetics_progress_methods',
		slug: 'phy-3as-shared-t1-kinetics-progress-methods',
		grade: '3as_se',
		yearSubjectId: 683,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: المتابعة الزمنية لتحول كيميائي في وسط مائي',
		order: 1,
		domain: 'kinetics_eq',
		titleAr: 'المتابعة الزمنية لتحول كيميائي (المعايرة، الناقلية، القياسات الغازية)',
		objectives: [
			'تصنيف التحولات الكيميائية حسب مدتها الزمنية (سريعة، بطيئة، بطيئة جداً)',
			'تتبع تطور كمية المادة أو التقدم $x(t)$ تجريبياً عبر المعايرة اللونية، قياس الناقلية $\\sigma(t)$، وقياس ضغط أو حجم الغاز المنطلق'
		],
		keywordsAr: ['المتابعة الزمنية', 'تفاعل أكسدة-إرجاع', 'المعايرة اللونية', 'قياس الناقلية', 'جدول التقدم'],
		discover: {
			scenarioAr:
				`في المخبر، نمزج عند اللحظة $t = 0$ حجماً $V_1 = 50\\text{ mL}$ من محلول يود البوتاسيوم تركيزه $C_1 = 0.4\\text{ mol/L}$ مع حجم $V_2 = 50\\text{ mL}$ من محلول بيروكسوديكبريتات البوتاسيوم تركيزه $C_2 = 0.1\\text{ mol/L}$ وفق المعادلة: ${eqIodidePeroxodisulfate.katex}. نأخذ عينات متساوية في أوقات مختلفة ونضعها في ماء مثلج قبل معايرتها بمحلول ثيوكبريتات الصوديوم.`,
			svg: svgTitrationSetup({
				titrantLabel: 'ثيوكبريتات الصوديوم S₂O₃²⁻',
				analyteLabel: 'عينة التفاعل + ماء مثلج',
				sensorLabel: 'حمام جليدي (سقي)'
			}),
			steps: [
				{
					promptAr:
						'ما الغرض من إضافة الماء المثلج (السقي الكيميائي) إلى كل عينة قبل الشروع في المعايرة اللونية؟',
					hintAr: 'فكر في أثر خفض درجة الحرارة والتخفيف على سرعة التفاعل البطيء.',
					expectedInput: 'توقيف التفاعل',
					revealAr:
						'يؤدي السقي الفيزيائي (الماء المثلج + التمديد) إلى خفض درجة الحرارة وتراكيز المتفاعلات في آنٍ واحد، مما يُبطئ التفاعل بشدة (توقيف التفاعل مؤقتاً) لتثبيت كمية ثنائي اليود $\\ce{I2}$ المتشكلة عند اللحظة $t$.'
				},
				{
					promptAr:
						'احسب كميتي المادة الابتدائيتين $n_1(\\ce{I-})$ و $n_2(\\ce{S2O8^2-})$ بوحدة $\\text{mmol}$ ثم حدد المتفاعل المحد وقيمة التقدم الأعظمي $x_{\\max}$ (بالميليمول).',
					hintAr: 'اقسم كمية مادة كل متفاعل على معامله الستوكيومتري ($2$ لليودور و $1$ للبيروكسوديكبريتات).',
					expectedInput: '5',
					revealAr:
						'لدينا $n_1 = 0.4 \\times 50 = 20\\text{ mmol}$ و $n_2 = 0.1 \\times 50 = 5\\text{ mmol}$. نجد $\\frac{n_1}{2} = 10\\text{ mmol}$ و $\\frac{n_2}{1} = 5\\text{ mmol}$، إذن المتفاعل المحد هو $\\ce{S2O8^2-}$ و $x_{\\max} = 5\\text{ mmol}$.'
				},
				{
					promptAr:
						'أثناء المعايرة وفق المعادلة $\\ce{I2 + 2S2O3^2- -> 2I- + S4O6^2-}$، إذا كان حجم التكافؤ لعينة حجمها $V_0 = 10\\text{ mL}$ هو $V_E = 12\\text{ mL}$ بتركيز $C_3 = 0.05\\text{ mol/L}$، فكم تبلغ كمية مادة $\\ce{I2}$ في العينة بالميليمول؟',
					hintAr: 'عند التكافؤ: $n(\\ce{I2})_{\\text{عينة}} = \\frac{1}{2} C_3 V_E$.',
					expectedInput: '0.3',
					revealAr:
						'$n(\\ce{I2})_{\\text{عينة}} = \\frac{1}{2} \\times 0.05 \\times 12 = 0.3\\text{ mmol}$. وبما أن الحجم الكلي $V_T = 100\\text{ mL} = 10 V_0$، فإن التقدم الكلي في المزيج عند تلك اللحظة هو $x(t) = 10 \\times 0.3 = 3\\text{ mmol}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**تصنيف التحولات الكيميائية**: تحولات **سريعة** (لحظية كالمعايرة)، **بطيئة** (تدوم ثواني إلى دقائق وتُتابع مخبرياً)، و**بطيئة جداً** (أيام أو أشهر).',
				'**جدول التقدم للمتفاعلات والنواتج**: يُكتب بالكميات المولية لكل نوع كيميائي في الحالات الابتدائية ($0$) والانتقالية ($x$) والنهائية ($x_f$ أو $x_{\\max}$).\n\n' + iceKineticsLesson1.markdownTable,
				'**طرق المتابعة الزمنية**: (1) **المعايرة اللونية** (طريقة كيميائية متقطعة تتطلب السقي بالماء المثلج لتوقيف التفاعل)، (2) **قياس الناقلية النوعية** $\\sigma(t) = \\sum \\lambda_i [X_i]$ (طريقة فيزيائية مستمرة عند وجود شوارد تختلف موصلياتها المولية الشاردية)، (3) **قياس ضغط أو حجم غاز** باستعمال قانون الغازات المثالية $P V = n R T$.',
				'**الناقلية النوعية وعلاقتها بالتقدم**: تُعطى الناقلية النوعية بالعلاقة $\\sigma = \\sum \\lambda_i [X_i]$ بوحدة $\\text{S/m}$ مع تحويل التراكيز إلى $\\text{mol/m}^3$ ($1\\text{ mol/L} = 10^3\\text{ mol/m}^3$).'
			],
			visualSvg: svgTitrationSetup({
				titrantLabel: 'المحلول المعايِر',
				analyteLabel: 'المزيج التفاعلي',
				sensorLabel: 'مسبار ناقلية أو pH'
			}),
			visualCaptionAr: 'التركيب التجريبي للمتابعة الزمنية عن طريق المعايرة أو قياس الناقلية',
			examples: [
				{
					problemAr:
						'يتفاعل المغنيزيوم $\\ce{Mg(s)}$ مع شوارد $\\ce{H3O+(aq)}$ وفق المعادلة $\\ce{Mg(s) + 2H3O+(aq) -> Mg^2+(aq) + H2(g) + 2H2O(l)}$. في حجم محلول $V = 100\\text{ mL}$ بتركيز $C = 0.2\\text{ mol/L}$ وبزيادة من $\\ce{Mg}$، عبّر عن $\\sigma(t)$ بدلالة $x(t)$ علماً أن $\\lambda(\\ce{H3O+}) = 35\\text{ mS}\\cdot\\text{m}^2/\\text{mol}$ و $\\lambda(\\ce{Mg^2+}) = 10.6\\text{ mS}\\cdot\\text{m}^2/\\text{mol}$ و $\\lambda(\\ce{Cl-}) = 7.6\\text{ mS}\\cdot\\text{m}^2/\\text{mol}$.',
					solutionAr:
						'شوارد الكلور $\\ce{Cl-}$ متفرجة تركيزها $[\\ce{Cl-}] = C$. عند اللحظة $t$: $[\\ce{H3O+}] = \\frac{CV - 2x}{V}$ و $[\\ce{Mg^2+}] = \\frac{x}{V}$. إذن $\\sigma(t) = \\lambda_{\\ce{H3O+}} C + \\lambda_{\\ce{Cl-}} C + \\frac{\\lambda_{\\ce{Mg^2+}} - 2\\lambda_{\\ce{H3O+}}}{V} x(t)$، وبما أن $\\lambda_{\\ce{Mg^2+}} - 2\\lambda_{\\ce{H3O+}} = 10.6 - 70 = -59.4 < 0$ فإن الناقلية تتناقص بمرور الزمن.'
				}
			],
			watchOutAr:
				'احذر في حسابات الناقلية $\\sigma = \\sum \\lambda_i [X_i]$ من خطأ الوحدات الشائع: يجب أن يكون التركيز بوحدة $\\text{mol/m}^3$ وليس $\\text{mol/L}$ عند استخدام $\\lambda$ بوحدة $\\text{S}\\cdot\\text{m}^2/\\text{mol}$!'
		},
		practice: [
			{
				questionAr: 'الهدف الأساسي من سكب العينة المأخوذة في الماء المثلج قبل المعايرة اللونية هو:',
				options: [
					'توقيف التفاعل الكيميائي مؤقتاً لتثبيت كمية المادة عند تلك اللحظة',
					'رفع ثابت التوازن الكيميائي للتفاعل',
					'توفير وسيط كيميائي لتسريع المعايرة',
					'تغيير المتفاعل المحد للعينة'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'ثابت التوازن لا يتعلق إلا بدرجة الحرارة، والهدف ليس تغييره بل تجميد الحالة الحركية.',
					'الماء المثلج يبطئ التفاعل ولا يسرعه.',
					'كميات المادة الابتدائية للمزيج الكلي لا تتغير بالسقي قبل المعايرة.'
				],
				explanationAr:
					'السقي الكيميائي بالماء المثلج يجمع بين التبريد والتمديد مما يخفض سرعة التفاعل إلى قيم شبه معدومة فتبقى كمية المادة ثابتة أثناء المعايرة.'
			},
			{
				questionAr:
					'نفاعل $\\ce{CaCO3(s) + 2H3O+(aq) -> Ca^2+(aq) + CO2(g) + 3H2O(l)}$ في حوجلة حجمها الغازي $V_g = 0.5\\text{ L}$ عند $T = 300\\text{ K}$. إذا بلغ ضغط الغاز المنطلق $\\Delta P = 1.247\\times 10^4\\text{ Pa}$، فما قيمة التقدم $x$؟ ($R = 8.314\\text{ SI}$)',
				options: ['2.5 mmol', '5.0 mmol', '1.25 mmol', '25 mmol'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'تأكد من تحويل $V_g = 0.5\\text{ L} = 0.5\\times 10^{-3}\\text{ m}^3$.',
					'قسمت على $2$ دون مبرر؛ معامل $\\ce{CO2}$ في المعادلة هو $1$.',
					'تحقق من الأس في التحويل من $\\text{mol}$ إلى $\\text{mmol}$.'
				],
				explanationAr:
					'من قانون الغازات المثالية $x = n(\\ce{CO2}) = \\frac{\\Delta P \\cdot V_g}{R T} = \\frac{1.247\\times 10^4 \\times 0.5\\times 10^{-3}}{8.314 \\times 300} \\approx 2.5\\times 10^{-3}\\text{ mol} = 2.5\\text{ mmol}$.'
			},
			{
				questionAr:
					'في المتابعة الزمنية عن طريق قياس الناقلية، تتناقص $\\sigma(t)$ مع مرور الزمن عندما:',
				options: [
					'تُستبدل شوارد ذات موصلية مولية شاردة كبيرة بشوارد ذات موصلية أصغر أو غير مشحونة',
					'تزداد درجة حرارة الوسط التفاعلي',
					'يكون التفاعل أسترة سريعة',
					'تكون الشوارد المتفرجة هي الغالبة'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'رفع درجة الحرارة يزيد الموصلية الشاردية $\\lambda_i$ وبالتالي يرفع الناقلية.',
					'الأسترة تفاعل بطيء غير شاردي لا يُتابع بالناقلية.',
					'الشوارد المتفرجة تراكيزها ثابتة ولا تُفسر التناقص.'
				],
				explanationAr:
					'بما أن $\\sigma(t) = \\sigma_0 + \\frac{\\Delta \\lambda}{V} x(t)$، تتناقص $\\sigma(t)$ إذا كان $\\Delta \\lambda < 0$ مثل استهلاك $\\ce{H3O+}$ أو $\\ce{OH-}$ ذات القيم الكبيرة لـ $\\lambda$.'
			},
			{
				questionAr:
					'التحول الكيميائي التالي: $\\ce{2MnO4- + 5H2C2O4 + 6H+ -> 2Mn^2+ + 10CO2 + 8H2O}$. إذا كان $n_0(\\ce{MnO4-}) = 4\\text{ mmol}$ و $n_0(\\ce{H2C2O4}) = 15\\text{ mmol}$، فإن التقدم الأعظمي $x_{\\max}$ يساوي:',
				options: ['2 mmol', '3 mmol', '4 mmol', '15 mmol'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'هذا ناتج قسمة $15/5 = 3\\text{ mmol}$ لحمض الأكساليك وهو الأكبر وليس الأصغر.',
					'نسيت القسمة على المعامل الستوكيومتري $2$ لبرمنغنات البوتاسيوم.',
					'نسيت القسمة على المعامل الستوكيومتري $5$.'
				],
				explanationAr:
					'نقارن $\\frac{4}{2} = 2\\text{ mmol}$ مع $\\frac{15}{5} = 3\\text{ mmol}$. القيمة الأصغر هي $x_{\\max} = 2\\text{ mmol}$ والمحد هو $\\ce{MnO4-}$.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 2: Reaction Rates, Half-Life t_{1/2} & Kinetic Factors
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'phy_lesson_3as_shared_t1_reaction_rates_half_life_factors',
		slug: 'phy-3as-shared-t1-reaction-rates-half-life-factors',
		grade: '3as_se',
		yearSubjectId: 683,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: المتابعة الزمنية لتحول كيميائي في وسط مائي',
		order: 2,
		domain: 'kinetics_eq',
		titleAr: 'السرعة الحجمية للتفاعل، زمن نصف التفاعل $t_{1/2}$، والعوامل الحركية',
		objectives: [
			'حساب السرعة الحجمية للتفاعل $v_{\\text{vol}} = \\frac{1}{V_T}\\frac{dx}{dt}$ وسرعة التشكل والاختفاء بيانياً بطريقة المماس',
			'تعريف وتعيين زمن نصف التفاعل $t_{1/2}$ بيانياً، وتفسير أثر درجة الحرارة والتركيز الابتدائي والوسيط مجهرياً'
		],
		keywordsAr: ['السرعة الحجمية', 'زمن نصف التفاعل', 'العوامل الحركية', 'الوسيط', 'التصادمات الفعالة'],
		discover: {
			scenarioAr:
				'يمثل المنحنى الأزرق تطور التقدم $x(t)$ لتفاعل تام في حجم كلي $V_T = 100\\text{ mL}$ عند درجة حرارة $T_1 = 25^\\circ\\text{C}$، بينما يمثل المنحنى الأخضر المتقطع نفس التفاعل عند $T_2 = 45^\\circ\\text{C}$. يقطع المماس للمنحنى الأزرق عند $t = 0$ الخط المقارب الأفقي $x_{\\max} = 4\\text{ mmol}$ عند الفاصلة $t = 10\\text{ min}$.',
			svg: svgKineticsCurveWithHalfLife,
			steps: [
				{
					promptAr:
						'احسب السرعة الحجمية للتفاعل عند اللحظة $t = 0$ بوحدة $\\text{mmol}\\cdot\\text{L}^{-1}\\cdot\\text{min}^{-1}$ للمنحنى الأزرق ($V_T = 0.1\\text{ L}$).',
					hintAr: 'احسب ميل المماس $\\left(\\frac{dx}{dt}\\right)_0 = \\frac{4 - 0}{10 - 0}$ ثم اقسم على $V_T = 0.1\\text{ L}$.',
					expectedInput: '4',
					revealAr:
						'$\\left(\\frac{dx}{dt}\\right)_0 = \\frac{4}{10} = 0.4\\text{ mmol/min}$، ومنه $v_{\\text{vol}}(0) = \\frac{1}{0.1} \\times 0.4 = 4\\text{ mmol}\\cdot\\text{L}^{-1}\\cdot\\text{min}^{-1}$.'
				},
				{
					promptAr:
						'ما قيمة التقدم $x(t_{1/2})$ عند زمن نصف التفاعل بالميليمول، وما قيمة $t_{1/2}$ التقريبية من المنحنى الأزرق؟',
					hintAr: 'بما أن التفاعل تام فإن $x(t_{1/2}) = \\frac{x_f}{2} = \\frac{x_{\\max}}{2}$.',
					expectedInput: '2',
					revealAr:
						'$x(t_{1/2}) = \\frac{4}{2} = 2\\text{ mmol}$، وبالاسقاط على المنحنى الأزرق نجد $t_{1/2} \\approx 6.9\\text{ min}$.'
				},
				{
					promptAr:
						'لماذا وصل المنحنى الأخضر ($T_2 > T_1$) إلى نفس القيمة النهائية $x_{\\max} = 4\\text{ mmol}$ لكن بزمن نصف تفاعل أصغر؟',
					hintAr: 'اذكر أثر درجة الحرارة على التصادمات الفعالة وعلى كميات المادة الابتدائية.',
					expectedInput: 'التصادمات الفعالة',
					revealAr:
						'رفع درجة الحرارة يزيد من الطاقة الحركية للأفراد الكيميائية فيرتفع تواتر التصادمات الفعالة وتزداد السرعة الحجمية ويتناقص $t_{1/2}$، بينما تبقى الحالة النهائية $x_{\\max}$ ثابتة لأن كميات المادة الابتدائية لم تتغير.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**السرعة اللحظية والحجمية للتفاعل**: السرعة اللحظية هي $v(t) = \\frac{dx}{dt}$، والسرعة الحجمية للتفاعل هي $v_{\\text{vol}}(t) = \\frac{1}{V_T}\\frac{dx}{dt}$ بوحدة $\\text{mol}\\cdot\\text{L}^{-1}\\cdot\\text{s}^{-1}$ (أو $\\text{min}^{-1}$)، وتُحسب بيانياً بميل المماس للمنحنى $x(t)$ مقسوماً على $V_T$.',
				'**سرعة التشكل والاختفاء**: لنوع كيميائي ناتج $C$ معامله $c$: $v_{\\text{vol}}(C) = \\frac{d[C]}{dt} = c \\cdot v_{\\text{vol}}$؛ ولمتفاعل $A$ معامله $a$: $v_{\\text{vol,disp}}(A) = -\\frac{d[A]}{dt} = a \\cdot v_{\\text{vol}}$.',
				'**زمن نصف التفاعل $t_{1/2}$**: هو المدة الزمنية اللازمة لبلوغ تقدم التفاعل نصف قيمته النهائية: $x(t_{1/2}) = \\frac{x_f}{2}$. أهميته العملية أنه يسمح بمقارنة سرعات التحولات وتقدير مدة انتهاء التفاعل ($\\approx 4\\text{ إلى }7\\,t_{1/2}$).',
				'**العوامل الحركية وتفسيرها المجهري**: (1) **التركيز الابتدائي للمتفاعلات** و**درجة الحرارة** يرفعان عدد التصادمات الفعالة في وحدة الزمن فتزداد السرعة الحجمية (وتتناقص مع الزمن لتناقص تراكيز المتفاعلات). (2) **الوسيط** يسرع التفاعل دون أن يظهر في المعادلة أو يغيّر الحالة النهائية (وساطة متجانسة، غير متجانسة، أو إنزيمية).'
			],
			visualSvg: svgKineticsCurveWithHalfLife,
			visualCaptionAr: 'استغلال منحنى التقدم $x(t)$ لتعيين $v_{\\text{vol}}$ بالمماس و $t_{1/2}$ عند $x_{\\max}/2$',
			examples: [
				{
					problemAr:
						'إذا كان منحنى تطور تركيز الناتج $[\\ce{I2}](t)$ يبلغ قيمته النهائية $[\\ce{I2}]_f = 24\\text{ mmol/L}$، ومماس المنحنى عند $t = 2\\text{ min}$ يمر بالنقطتين $(0; 4\\text{ mmol/L})$ و $(6; 16\\text{ mmol/L})$ في التفاعل $\\ce{2I- + S2O8^2- -> I2 + 2SO4^2-}$. احسب $v_{\\text{vol}}(t=2\\text{ min})$ وسرعة اختفاء $\\ce{I-}$.',
					solutionAr:
						'بما أن معامل $\\ce{I2}$ يساوي $1$ فإن $v_{\\text{vol}} = \\frac{d[\\ce{I2}]}{dt} = \\frac{16 - 4}{6 - 0} = 2\\text{ mmol}\\cdot\\text{L}^{-1}\\cdot\\text{min}^{-1}$. وسرعة اختفاء $\\ce{I-}$ هي $v_{\\text{vol,disp}}(\\ce{I-}) = 2 \\, v_{\\text{vol}} = 4\\text{ mmol}\\cdot\\text{L}^{-1}\\cdot\\text{min}^{-1}$.'
				}
			],
			watchOutAr:
				'تتناقص السرعة الحجمية للتفاعل مع مرور الزمن رغم ثبوت درجة الحرارة بسبب التناقص المستمر في تراكيز المتفاعلات، وليس بسبب نفاذ الوسيط!'
		},
		practice: [
			{
				questionAr: 'في تفاعل $\\ce{A + 2B -> 3C}$، العلاقة الصحيحة بين سرعة تشكل $C$ وسرعة اختفاء $B$ هي:',
				options: [
					'$v_{\\text{vol}}(C) = \\frac{3}{2} v_{\\text{vol,disp}}(B)$',
					'$v_{\\text{vol}}(C) = \\frac{2}{3} v_{\\text{vol,disp}}(B)$',
					'$v_{\\text{vol}}(C) = 3 v_{\\text{vol,disp}}(B)$',
					'$v_{\\text{vol}}(C) = -\\frac{3}{2} v_{\\text{vol,disp}}(B)$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'عكست النسبة الستوكيومترية بين $C$ و $B$.',
					'أغفلت المعامل $2$ للمتفاعل $B$.',
					'سرعة الاختفاء وسرعة التشكل مقداراهما موجبان دوماً.'
				],
				explanationAr:
					'لدينا $v_{\\text{vol}} = \\frac{v_{\\text{vol}}(C)}{3} = \\frac{v_{\\text{vol,disp}}(B)}{2}$، ومنه $v_{\\text{vol}}(C) = \\frac{3}{2} v_{\\text{vol,disp}}(B)$.'
			},
			{
				questionAr: 'لماذا تكون السرعة الحجمية للتفاعل أعظمية عند اللحظة $t = 0$ ثم تتناقص؟',
				options: [
					'لأن تراكيز المتفاعلات تكون أعظمية عند $t=0$ ثم تتناقص باستهلاكها',
					'لأن درجة الحرارة تنخفض تلقائياً في كل التفاعلات',
					'لأن الوسيط يُستهلك تدريجياً خلال التفاعل',
					'لأن ثابت التوازن ينقص مع الزمن'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'معظم التفاعلات تجرى في حمام مائي ثابت الحرارة، أو قد تكون ناشرة للحرارة.',
					'الوسيط لا يُستهلك في الحصيلة الكيميائية.',
					'ثابت التوازن ثابت عند درجة حرارة ثابتة.'
				],
				explanationAr:
					'التركيز عامل حركي: عند $t=0$ يكون تواتر التصادمات الفعالة أعظمياً، وبمرور الزمن تقل تراكيز المتفاعلات فتتناقص التصادمات الفعالة وبالتالي تتناقص السرعة.'
			},
			{
				questionAr:
					'منحنى كمية مادة متفاعل محد $n_A(t)$ ينطلق من $n_0 = 12\\text{ mmol}$ وينعدم نهائياً. قيمة $n_A(t_{1/2})$ تساوي:',
				options: ['6 mmol', '3 mmol', '0 mmol', '4 mmol'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'هذه قيمة $n_0/4$ أي عند $2t_{1/2}$ في رتبة أولى.',
					'ينعدم $n_A$ في نهاية التفاعل وليس عند $t_{1/2}$.',
					'تحقق من نصف الكمية الابتدائية للمتفاعل المحد.'
				],
				explanationAr:
					'للمتفاعل المحد ينقص $n_A$ خطياً بدلالة $x$: $n_A(t) = n_0 - a x(t)$ مع $n_0 = a x_{\\max}$، إذن عند $x = x_{\\max}/2$ يكون $n_A(t_{1/2}) = n_0/2 = 6\\text{ mmol}$.'
			},
			{
				questionAr:
					'تفاعل حجمه الكلي $V_T = 200\\text{ mL}$ له ميل مماس عند $t = 0$ للمنحنى $x(t)$ يساوي $1.2\\times 10^{-3}\\text{ mol/min}$. السرعة الحجمية الابتدائية هي:',
				options: [
					'$6\\times 10^{-3}\\text{ mol}\\cdot\\text{L}^{-1}\\cdot\\text{min}^{-1}$',
					'$2.4\\times 10^{-4}\\text{ mol}\\cdot\\text{L}^{-1}\\cdot\\text{min}^{-1}$',
					'$1.2\\times 10^{-3}\\text{ mol}\\cdot\\text{L}^{-1}\\cdot\\text{min}^{-1}$',
					'$6\\times 10^{-6}\\text{ mol}\\cdot\\text{L}^{-1}\\cdot\\text{min}^{-1}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'ضربت في $0.2\\text{ L}$ بدلاً من القسمة عليها.',
					'لم تقسم على الحجم الكلي $V_T = 0.2\\text{ L}$.',
					'أخطأت في التحويل من $\\text{mL}$ إلى $\\text{L}$ ($200\\text{ mL} = 0.2\\text{ L}$).'
				],
				explanationAr:
					'$v_{\\text{vol}}(0) = \\frac{1}{0.2}\\times 1.2\\times 10^{-3} = 6\\times 10^{-3}\\text{ mol}\\cdot\\text{L}^{-1}\\cdot\\text{min}^{-1}$.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 3: Newton's Laws & Kepler's Laws (Planets & Satellites)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'phy_lesson_3as_shared_t1_newton_laws_kepler_satellites',
		slug: 'phy-3as-shared-t1-newton-laws-kepler-satellites',
		grade: '3as_se',
		yearSubjectId: 683,
		trimesterId: 't1',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدة 2: تطور جملة ميكانيكية (نيوتن، الكواكب، والسقوط الشاقولي)',
		order: 3,
		domain: 'mechanics',
		titleAr: 'القوانين الثلاثة لنيوتن وحركة الكواكب والأقمار الاصطناعية (قوانين كبلر)',
		objectives: [
			'تطبيق القانون الثاني لنيوتن $\\sum \\vec{F}_{\\text{ext}} = m\\vec{a}_G$ في المراجع الغاليلية لتفسير الحركة الدائرية المنتظمة للأقمار والكواكب',
			'صياغة قوانين كبلر الثلاثة وإثبات القانون الثالث $\\frac{T^2}{r^3} = \\frac{4\\pi^2}{GM}$ واستعماله لحساب كتلة الكوكب أو ارتفاع القمر الجيومستقر'
		],
		keywordsAr: ['القانون الثاني لنيوتن', 'قوانين كبلر', 'الأقمار الاصطناعية', 'القمر الجيومستقر', 'التسارع الناظمي'],
		discover: {
			scenarioAr:
				'يدور القمر الاصطناعي الجزائري **Alcomsat-1** (قمر جيومستقر) في مدار دائري في مستوى خط الاستواء على ارتفاع $h \\approx 35\\,800\\text{ km}$ عن سطح الأرض (نصف قطر الأرض $R_T = 6\\,380\\text{ km}$). ندرس حركته في المرجع الجيومركزي الذي نعتبره غاليلياً.',
			svg: svgCircularOrbitKepler,
			steps: [
				{
					promptAr:
						'ما المرجع الغاليلي المناسب لدراسة حركة قمر اصطناعي حول الأرض، وما القوة الوحيدة المطبقة عليه؟',
					hintAr: 'مرجع مبدؤه مركز الأرض ومحاوره متجهة نحو ثلاث نجوم ثابتة.',
					expectedInput: 'الجيومركزي',
					revealAr:
						'المرجع المناسب هو **المرجع الجيومركزي** (الأرضي المركزي)، والقوة الوحيدة المؤثرة هي قوة الجذب العام للأرض على القمر $\\vec{F}_{T/S} = G\\frac{M_T m}{r^2}\\vec{u}_n$ الموجهة نحو مركز الأرض.'
				},
				{
					promptAr:
						'بتطبيق القانون الثاني لنيوتن وإسقاطه على المحورين المماسي والناظمي في معلم فريني، بيّن أن الحركة دائرية منتظمة ثم استنتج عبارة السرعة المدارية $v$.',
					hintAr: 'على المماس $a_t = \\frac{dv}{dt} = 0$؛ وعلى الناظم $m\\frac{v^2}{r} = G\\frac{M_T m}{r^2}$.',
					expectedInput: 'v = sqrt(GM/r)',
					revealAr:
						'على المحور المماسي $\\sum F_t = 0 \\implies a_t = \\frac{dv}{dt} = 0$ فالحركة دائرية منتظمة. وعلى الناظم $\\frac{v^2}{r} = \\frac{GM_T}{r^2} \\implies v = \\sqrt{\\frac{GM_T}{r}}$ حيث $r = R_T + h$.'
				},
				{
					promptAr:
						'أثبت القانون الثالث لكبلر ثم احسب السرعة المدارية لـ Alcomsat-1 علماً أن $r = 42\\,180\\text{ km}$ ودور دورانه الجيومستقر $T = 86\\,164\\text{ s}$ (بوحدة $\\text{km/s}$ مقربة إلى رقم بعد الفاصلة).',
					hintAr: 'استعمل $v = \\frac{2\\pi r}{T}$.',
					expectedInput: '3.1',
					revealAr:
						'بما أن $T = \\frac{2\\pi r}{v}$ و $v^2 = \\frac{GM_T}{r}$ نجد $\\frac{T^2}{r^3} = \\frac{4\\pi^2}{GM_T}$. وقيمة السرعة هي $v = \\frac{2\\pi \\times 42180}{86164} \\approx 3.08 \\approx 3.1\\text{ km/s}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**المعلم الغاليلي والقوانين الثلاثة لنيوتن**: (1) **مبدأ العطالة**: $\\sum \\vec{F}_{\\text{ext}} = \\vec{0} \\iff \\vec{v}_G = \\vec{\\text{cte}}$؛ (2) **القانون الثاني**: $\\sum \\vec{F}_{\\text{ext}} = m\\vec{a}_G$؛ (3) **مبدأ الأفعال المتبادلة**: $\\vec{F}_{A/B} = -\\vec{F}_{B/A}$.',
				'**قوانين كبلر الثلاثة**: (1) **قانون المدارات**: تتحرك الكواكب في مدارات إهليلجية تحتل الشمس أحد محرقيها؛ (2) **قانون المساحات**: يمسح المستقيم الواصل بين مركز الشمس ومركز الكوكب مساحات متساوية في مجالات زمنية متساوية؛ (3) **قانون الأدوار**: $\\frac{T^2}{a^3} = \\frac{4\\pi^2}{GM} = \\text{cte}$ (وللمدار الدائري $a = r = R + h$).',
				'**خصائص الحركة الدائرية المنتظمة لقمر**: $a_t = 0$، التسارع ناظمي $a = a_n = \\frac{GM}{r^2}$، السرعة المدارية $v = \\sqrt{\\frac{GM}{r}}$ (مستقلة عن كتلة القمر $m$)، والدور المداري $T = 2\\pi\\sqrt{\\frac{r^3}{GM}}$.',
				'**القمر الجيومستقر (الساكن بالنسبة للأرض)**: يدور في مستوى خط الاستواء، في نفس جهة دوران الأرض حول محورها، وبدور يساوي دور الأرض النجمي ($T \\approx 23\\text{ h }56\\text{ min} \\approx 86\\,164\\text{ s}$).'
			],
			visualSvg: svgCircularOrbitKepler,
			visualCaptionAr: 'تمثيل شعاعي السرعة $\\vec{v}$ وقوة الجذب المركزية $\\vec{F}_{T/S}$ لقمر اصطناعي',
			examples: [
				{
					problemAr:
						'قمر اصطناعي يدور حول كوكب كتلته $M$ في مدار دائري نصف قطره $r_1$ بدور $T_1 = 2\\text{ h}$. ما دور قمر ثانٍ يدور حول نفس الكوكب في مدار نصف قطره $r_2 = 4 r_1$؟',
					solutionAr:
						'حسب القانون الثالث لكبلر: $\\frac{T_2^2}{r_2^3} = \\frac{T_1^2}{r_1^3} \\implies T_2 = T_1 \\sqrt{\\left(\\frac{r_2}{r_1}\\right)^3} = 2 \\sqrt{4^3} = 2 \\times 8 = 16\\text{ h}$.'
				}
			],
			watchOutAr:
				'في القانون الثالث لكبلر: $r = R_T + h$ هو البعد عن **مركز** الكوكب وليس الارتفاع $h$ عن السطح، ويجب تحويل $r$ إلى المتر ($\\text{m}$) و $T$ إلى الثانية ($\\text{s}$) عند حساب كتلة الكوكب $M$.'
		},
		practice: [
			{
				questionAr: 'تتناسب سرعة القمر الاصطناعي في مداره الدائري حول الأرض مع كتلة القمر $m$:',
				options: [
					'السرعة المدارية مستقلة تماماً عن كتلة القمر $m$',
					'تتناسب طرداً مع $m$',
					'تتناسب عكساً مع $\\sqrt{m}$',
					'تتناسب طرداً مع $m^2$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'تختزل كتلة القمر $m$ من طرفي معادلة القانون الثاني لنيوتن.',
					'تختزل $m$ لأن قوة الجذب متناسبة مع $m$ والقصور الذاتي متناسب مع $m$.',
					'راجع المعادلة $m v^2/r = G M_T m / r^2$.'
				],
				explanationAr:
					'من $m\\frac{v^2}{r} = G\\frac{M_T m}{r^2}$ نختزل $m$ فنحصل على $v = \\sqrt{\\frac{GM_T}{r}}$، أي أن السرعة تتعلق بكتلة الجسم المركزي $M_T$ ونصف قطر المدار $r$ فقط.'
			},
			{
				questionAr: 'أيّ شرط مما يلي ليس من شروط القمر الاصطناعي الجيومستقر؟',
				options: [
					'أن يمر مداره بالقطبين الشمالي والجنوبي',
					'أن يقع مداره في مستوى خط الاستواء',
					'أن يدور في نفس جهة دوران الأرض حول محورها',
					'أن يكون دوره المداري مساوياً لدور دوران الأرض حول محورها'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'المدار الاستوائي شرط أساسي ليبقى ثابتاً فوق نفس النقطة.',
					'الدوران في نفس الجهة شرط أساسي.',
					'تساوي الدور شرط أساسي.'
				],
				explanationAr:
					'القمر القطبي يمسح مختلف خطوط العرض ولا يكون ثابتاً بالنسبة لمراقب أرضي؛ القمر الجيومستقر مداره استوائي حصراً.'
			},
			{
				questionAr: 'المرجع الهيليومركزي (مركزي شمسي) مناسب لدراسة حركة:',
				options: [
					'الكواكب حول الشمس',
					'الأقمار الاصطناعية حول الأرض',
					'جسم يسقط شاقولياً داخل المخبر',
					'قذيفة في ملعب كرة قدم'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'الأقمار حول الأرض تُدرس في المرجع الجيومركزي.',
					'الحركات الأرضية القصيرة تُدرس في المرجع السطحي الأرضي.',
					'القذيفة على الأرض تُدرس في المرجع السطحي الأرضي.'
				],
				explanationAr:
					'المرجع الهيليومركزي مبدؤه مركز الشمس وهو المرجع الغاليلي المناسب لحركة الكواكب والمذنبات حول الشمس.'
			},
			{
				questionAr:
					'ميل البيان $T^2 = f(r^3)$ لقمر يدور حول المريخ يساوي $k = 9.2\\times 10^{-13}\\text{ s}^2/\\text{m}^3$. كتلة المريخ $M_M$ تساوي تقريباً ($G = 6.67\\times 10^{-11}\\text{ SI}$):',
				options: [
					'$6.4\\times 10^{23}\\text{ kg}$',
					'$6.0\\times 10^{24}\\text{ kg}$',
					'$1.5\\times 10^{23}\\text{ kg}$',
					'$3.2\\times 10^{22}\\text{ kg}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'تلك كتلة الأرض وليست ناتج العلاقة $M_M = 4\\pi^2 / (G \\cdot k)$.',
					'تحقق من قيمة $4\\pi^2 \\approx 39.48$.',
					'تحقق من قوى العشرة في القسمة.'
				],
				explanationAr:
					'من القانون الثالث لكبلر $k = \\frac{4\\pi^2}{G M_M} \\implies M_M = \\frac{4\\pi^2}{6.67\\times 10^{-11} \\times 9.2\\times 10^{-13}} \\approx 6.4\\times 10^{23}\\text{ kg}$.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 4: Vertical Fall in a Fluid & Free-Fall Model
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'phy_lesson_3as_shared_t1_vertical_fall_friction_freefall',
		slug: 'phy-3as-shared-t1-vertical-fall-friction-freefall',
		grade: '3as_se',
		yearSubjectId: 683,
		trimesterId: 't1',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدة 2: تطور جملة ميكانيكية (نيوتن، الكواكب، والسقوط الشاقولي)',
		order: 4,
		domain: 'mechanics',
		titleAr: 'دراسة حركة السقوط الشاقولي لجسم صلب في الهواء (المائع) والسقوط الحر',
		objectives: [
			'تمثيل القوى (الثقل $\\vec{P}$، دافعة أرخميدس $\\vec{\\Pi}$، قوة الاحتكاك $\\vec{f} = -k\\vec{v}$ أو $kv^2$) وكتابة المعادلة التفاضلية للسرعة',
			'استخراج السرعة الحدية $v_{\\text{lim}}$ والتسارع الابتدائي $a_0$ والزمن المميز $\\tau$، ودراسة نموذج السقوط الحر ومعادلاته الزمنية'
		],
		keywordsAr: ['السقوط الشاقولي', 'دافعة أرخميدس', 'السرعة الحدية', 'السقوط الحر', 'المعادلة التفاضلية'],
		discover: {
			scenarioAr:
				'تُسقط كرة صغيرة كتلتها $m = 50\\text{ g}$ وحجمها $V = 20\\text{ cm}^3$ بدون سرعة ابتدائية في سائل لزج كتلته الحجمية $\\rho_f = 1.0\\text{ g/cm}^3$ ($g = 10\\text{ m/s}^2$). تخضع الكرة لقوة احتكاك $f = k v$ ($k = 0.06\\text{ kg/s}$).',
			svg: svgVerticalFallDiagramAndCurve,
			steps: [
				{
					promptAr:
						'احسب شدة الثقل $P$ وشدة دافعة أرخميدس $\\Pi = \\rho_f V g$ بوحدة النيوتن ($\text{N}$).',
					hintAr: 'حوّل $m = 0.05\\text{ kg}$ و $V = 20\\times 10^{-6}\\text{ m}^3$ و $\\rho_f = 1000\\text{ kg/m}^3$.',
					expectedInput: '0.2',
					revealAr:
						'$P = m g = 0.05 \\times 10 = 0.5\\text{ N}$، و $\\Pi = \\rho_f V g = 1000 \\times 20\\times 10^{-6} \\times 10 = 0.2\\text{ N}$.'
				},
				{
					promptAr:
						'ما قيمة التسارع الابتدائي $a_0$ عند $t = 0$ حيث $v(0) = 0$ (بوحدة $\\text{m/s}^2$)؟',
					hintAr: 'عند $t=0$ يكون $f = 0$، ومنه $m a_0 = P - \\Pi$.',
					expectedInput: '6',
					revealAr:
						'$a_0 = \\frac{P - \\Pi}{m} = \\frac{0.5 - 0.2}{0.05} = 6\\text{ m/s}^2 < g$ (بسبب دافعة أرخميدس غير المهملة في السائل).'
				},
				{
					promptAr:
						'احسب السرعة الحدية $v_{\\text{lim}}$ في النظام الدائم (بوحدة $\\text{m/s}$) والثابت الزمني $\\tau = \\frac{m}{k}$.',
					hintAr: 'في النظام الدائم $\\frac{dv}{dt} = 0 \\implies k v_{\\text{lim}} = P - \\Pi$.',
					expectedInput: '5',
					revealAr:
						'$v_{\\text{lim}} = \\frac{P - \\Pi}{k} = \\frac{0.3}{0.06} = 5\\text{ m/s}$، والثابت الزمني $\\tau = \\frac{0.05}{0.06} \\approx 0.833\\text{ s}$ (لاحظ أن $a_0 = \\frac{v_{\\text{lim}}}{\\tau}$).'
				}
			]
		},
		summary: {
			rulesAr: [
				'**القوى المؤثرة على جسم يسقط شاقولياً في مائع**: الثقل $\\vec{P} = m\\vec{g}$ نحو الأسفل، دافعة أرخميدس $\\vec{\\Pi} = -\\rho_f V \\vec{g}$ نحو الأعلى، وقوة الاحتكاك $\\vec{f}$ المعاكسة للحركة ($f = kv$ في السرعات الضعيفة أو $f = kv^2$ في السرعات الكبيرة).',
				'**المعادلة التفاضلية للسرعة (حالة $f = kv$)**: بإسقاط $\\sum \\vec{F} = m\\vec{a}$ على المحور الشاقولي الموجه نحو الأسفل:\n$$\n\\frac{dv}{dt} + \\frac{k}{m}v = g\\left(1 - \\frac{\\rho_f}{\\rho_s}\\right)\n$$\nوحلها عند $v(0)=0$: $v(t) = v_{\\text{lim}}\\left(1 - e^{-t/\\tau}\\right)$ حيث $\\tau = \\frac{m}{k}$ و $v_{\\text{lim}} = a_0 \\tau$.',
				'**حالة السرعات الكبيرة ($f = kv^2$)**: المعادلة التفاضلية هي $\\frac{dv}{dt} + \\frac{k}{m}v^2 = a_0$، والسرعة الحدية هي $v_{\\text{lim}} = \\sqrt{\\frac{m a_0}{k}} = \\sqrt{\\frac{P - \\Pi}{k}}$.',
				'**السقوط الحر**: يتحقق عندما يكون الجسم خاضعاً لثقله فقط (بإهمال $\\Pi$ و $f$). تصبح الحركة مستقيمة متغيرة بانتظام بتسارع $a = g$: $v(t) = g t + v_0$ و $z(t) = \\frac{1}{2}g t^2 + v_0 t + z_0$.'
			],
			visualSvg: svgVerticalFallDiagramAndCurve,
			visualCaptionAr: 'تمثيل القوى الثلاث ومنحنى السرعة $v(t)$ وتعيين $v_{\\text{lim}}$ و $\\tau$',
			examples: [
				{
					problemAr:
						'يُظهر منحنى السقوط الشاقولي لقطرة مطر أن التسارع الابتدائي $a_0 = 9.8\\text{ m/s}^2$ والسرعة الحدية $v_{\\text{lim}} = 7.84\\text{ m/s}$. استنتج $\\tau$ وطبيعة دافعة أرخميدس.',
					solutionAr:
						'بما أن $a_0 = g$ فإن دافعة أرخميدس مهملة أمام الثقل (حالة جسم صلب/سائل في الهواء). وبما أن $a_0 = \\frac{v_{\\text{lim}}}{\\tau}$ فإن $\\tau = \\frac{7.84}{9.8} = 0.8\\text{ s}$.'
				}
			],
			watchOutAr:
				'العلاقة $\\tau = \\frac{v_{\\text{lim}}}{a_0}$ (ميل المماس عند $t=0$ يقطع المقارب $v = v_{\\text{lim}}$ عند $t = \\tau$) صالحة في نموذج $f = kv$ فقط! في نموذج $f = kv^2$ تبقى طريقة المماس مجرد تقدير تقريبي ولا تساوي $\\tau = m/k$.'
		},
		practice: [
			{
				questionAr:
					'إذا كان $a_0 < g$ في سقوط شاقولي بدون سرعة ابتدائية داخل مائع، فإن السبب الفيزيائي هو:',
				options: [
					'تأثير دافعة أرخميدس غير المهملة $\\Pi = \\rho_f V g$',
					'تأثير قوة الاحتكاك $f$ عند $t = 0$',
					'تغير تسارع الجاذبية مع الارتفاع الصغير',
					'نقصان كتلة الجسم أثناء السقوط'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'عند $t = 0$ تكون $v(0) = 0$ وبالتالي $f(0) = 0$.',
					'على ارتفاعات المخبر $g$ ثابتة.',
					'الكتلة محفوظة.'
				],
				explanationAr:
					'عند اللحظة $t=0$ تكون السرعة منعدمة فينعدم الاحتكاك $f(0)=0$، ومنه $a_0 = g\\left(1 - \\frac{\\rho_f}{\\rho_s}\\right) < g$ بسبب دافعة أرخميدس.'
			},
			{
				questionAr: 'البعد الفيزيائي للثابت $k$ في عبارة قوة الاحتكاك $f = kv^2$ هو:',
				options: [
					'$\\text{M}\\cdot\\text{L}^{-1}$ ($\\text{kg/m}$)',
					'$\\text{M}\\cdot\\text{T}^{-1}$ ($\\text{kg/s}$)',
					'$\\text{M}\\cdot\\text{L}\\cdot\\text{T}^{-2}$',
					'$\\text{L}\\cdot\\text{T}^{-1}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'هذا بعد $k$ في الحالة الخطية $f = kv$.',
					'هذا بعد القوة $F$ نفسها.',
					'هذا بعد السرعة $v$.'
				],
				explanationAr:
					'$[k] = \\frac{[F]}{[v]^2} = \\frac{\\text{M}\\cdot\\text{L}\\cdot\\text{T}^{-2}}{\\text{L}^2\\cdot\\text{T}^{-2}} = \\text{M}\\cdot\\text{L}^{-1}$.'
			},
			{
				questionAr:
					'في النظام الدائم لسقوط شاقولي خاضع لقوة احتكاك $f = kv$، تساوي النسبة $\\frac{v(\\tau)}{v_{\\text{lim}}}$:',
				options: ['0.63', '0.37', '0.50', '0.99'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'$0.37 = e^{-1}$ تمثل النسبة المتبقية أو نسبة التناقص.',
					'$0.50$ يوافق زمن النصف $t_{1/2} = \\tau \\ln 2$.',
					'$0.99$ يوافق $t = 5\\tau$.'
				],
				explanationAr:
					'$v(\\tau) = v_{\\text{lim}}(1 - e^{-1}) \\approx 0.632\\,v_{\\text{lim}}$.'
			},
			{
				questionAr:
					'في السقوط الحر الشاقولي انطلاقاً من السكون ($v_0 = 0$) مع $g = 10\\text{ m/s}^2$، المسافة المقطوعة بعد $t = 3\\text{ s}$ تساوي:',
				options: ['45 m', '30 m', '90 m', '15 m'],
				correctIndex: 0,
				diagnosticFeedback: [
					'',
					'تلك هي السرعة $v(3) = 30\\text{ m/s}$ وليست المسافة.',
					'نسيت العامل $\\frac{1}{2}$ في $z = \\frac{1}{2}gt^2$.',
					'تحقق من تربيع الزمن $3^2 = 9$.'
				],
				explanationAr:
					'$z(3) = \\frac{1}{2} \\times 10 \\times 3^2 = 45\\text{ m}$.'
			}
		]
	}
];

export const SHARED_PHYSICS_LESSONS_3AS_T1: SharedPhysicsLesson[] = RAW_SHARED_PHYSICS_LESSONS_3AS_T1;
