import type { ExamDocument, ExamMetadata, ExerciseBlock } from '../../modules/SujetBuilder/types';
import {
	buildIceTable,
	chemEquation,
	chemSpecies,
	nuclearEquation,
	nuclide
} from '../../modules/PhysicsTemplates/chem-helpers';
import {
	savePhysicsSvgAsset,
	svgCircuitDiagram,
	svgInclinedPlaneForces,
	svgNuclearEnergyDiagram,
	svgPhysicsCurvePlot,
	svgProjectileTrajectory
} from '../../modules/PhysicsTemplates/svg-physics';
import type { OfficialBacPhysicsPaperRecord } from './types';

function buildMetadata(year: '2023' | '2024' | '2025'): ExamMetadata {
	return {
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي',
		streamId: 'MATH',
		streamName: 'رياضيات',
		subjectId: 'PHY-MTM',
		subjectName: 'العلوم الفيزيائية',
		trimesterId: 't3',
		trimesterName: 'دورة بكالوريا رسمية',
		docType: 'exam',
		academicYear: year,
		duration: '04 ساعات و30 دقيقة',
		coefficient: 6,
		examSessionAr: 'دورة جوان ' + year,
		topicNumber: 1,
		customDocTitle: 'امتحان بكالوريا التعليم الثانوي (موضوع رسمي مُعاد تنسيقه)',
		siteUrl: 'https://sujetstore.com'
	};
}

function buildRecord(
	year: '2023' | '2024' | '2025',
	exercises: ExerciseBlock[]
): OfficialBacPhysicsPaperRecord {
	const examDoc: ExamDocument = {
		metadata: buildMetadata(year),
		exercises
	};

	return {
		slug: `bac-${year}-3as-math-physics`,
		grade: '3as_math',
		yearSubjectId: 703,
		streamId: 'MATH',
		streamNameAr: 'رياضيات',
		academicYear: year,
		sessionAr: 'دورة جوان ' + year,
		coefficient: 6,
		duration: '04 ساعات و30 دقيقة',
		titleAr: `بكالوريا رسمية في العلوم الفيزيائية — شعبة رياضيات (دورة جوان ${year} - الموضوع الأول)`,
		sourcePdfRelPath: `pipeline/references_physics/3as/bac_official/bac_${year}_math_tm_physics_subject.pdf`,
		sourceSolutionPdfRelPath: `pipeline/references_physics/3as/bac_official/bac_${year}_math_tm_physics_correction.pdf`,
		examDoc
	};
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. دورة جوان 2023 — شعبة رياضيات — الموضوع الأول (ONEC 2023 MTM Topic 1)
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2023MathPhysics(): OfficialBacPhysicsPaperRecord {
	const ex1AtUrl = savePhysicsSvgAsset(
		'bac_2023_math_phy_ex1_at',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 120.8,
			yMin: 0,
			yMax: 3.6,
			xStep: 30.2,
			yStep: 0.6,
			xLabel: 't (ans)',
			yLabel: 'A (×10¹⁰ Bq)',
			title: 'تناقص النشاط الإشعاعي A(t) لعينة السيزيوم 137',
			curves: [
				{
					fn: (t) => 3.0 * Math.exp((-t * Math.LN2) / 30.2),
					color: '#2563eb',
					label: 'A(t)'
				}
			],
			dashedGuides: [
				{ x1: 0, y1: 1.5, x2: 30.2, y2: 1.5, color: '#dc2626' },
				{ x1: 30.2, y1: 0, x2: 30.2, y2: 1.5, color: '#dc2626' }
			],
			points: [
				{ x: 0, y: 3.0, label: 'A₀ = 3,0×10¹⁰', color: '#1d4ed8' },
				{ x: 30.2, y: 1.5, label: 't₁/₂ = 30,2 ans', color: '#dc2626' }
			],
			width: 370,
			height: 230
		})
	);

	const ex2TrajUrl = savePhysicsSvgAsset(
		'bac_2023_math_phy_ex2_traj',
		svgProjectileTrajectory({
			angleLabel: 'α',
			v0Label: 'v₀ = 12,9 m/s',
			showApex: true,
			width: 330,
			height: 195
		})
	);

	const ex2RangeUrl = savePhysicsSvgAsset(
		'bac_2023_math_phy_ex2_xm',
		svgPhysicsCurvePlot({
			xMin: 33,
			xMax: 57,
			yMin: 17.67,
			yMax: 19.67,
			xStep: 6,
			yStep: 0.4,
			xLabel: 'α (°)',
			yLabel: 'xM (m)',
			title: 'تغيرات المسافة الأفقية xM بدلالة زاوية القذف α',
			curves: [
				{
					fn: (deg) => {
						const rad = (deg * Math.PI) / 180;
						const vx = 12.9 * Math.cos(rad);
						const vy = 12.9 * Math.sin(rad);
						const t = (vy + Math.sqrt(vy * vy + 2 * 9.8 * 2.1)) / 9.8;
						return 0.5 + vx * t;
					},
					color: '#2563eb',
					label: 'xM(α)'
				}
			],
			dashedGuides: [
				{ x1: 42, y1: 17.67, x2: 42, y2: 19.47, color: '#dc2626' },
				{ x1: 33, y1: 19.47, x2: 42, y2: 19.47, color: '#dc2626' }
			],
			points: [{ x: 42, y: 19.47, label: '(42° ; 19,47 m)', color: '#dc2626' }],
			width: 350,
			height: 220
		})
	);

	const ex3MgCurveUrl = savePhysicsSvgAsset(
		'bac_2023_math_phy_ex3_mg',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 25,
			yMin: 0,
			yMax: 45,
			xStep: 5,
			yStep: 9,
			xLabel: 't (min)',
			yLabel: 'mMg (mg)',
			title: 'الشكل (5): تطور كتلة المغنيزيوم المتبقية mMg(t)',
			curves: [
				{
					fn: (t) => 36 * Math.exp((-t * Math.LN2) / 5.0),
					color: '#2563eb',
					label: 'mMg(t)'
				}
			],
			dashedGuides: [
				{ x1: 0, y1: 36, x2: 7.5, y2: 0, color: '#dc2626', label: '(Δ)', labelPos: 'right' },
				{ x1: 0, y1: 18, x2: 5, y2: 18, color: '#059669' },
				{ x1: 5, y1: 0, x2: 5, y2: 18, color: '#059669' }
			],
			points: [
				{ x: 0, y: 36, label: 'm₀ (4 cm)', color: '#1d4ed8' },
				{ x: 5, y: 18, label: 't₁/₂ = 5 min', color: '#059669' },
				{ x: 7.5, y: 0, label: '7,5 min', color: '#dc2626' }
			],
			width: 350,
			height: 220
		})
	);

	const ex3H3oCurveUrl = savePhysicsSvgAsset(
		'bac_2023_math_phy_ex3_h3o',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 1.8,
			yMin: 0,
			yMax: 0.36,
			xStep: 0.3,
			yStep: 0.06,
			xLabel: 'x (mmol)',
			yLabel: '[H₃O⁺] (mol/L)',
			title: 'الشكل (6): تغيرات [H₃O⁺] بدلالة التقدم x',
			curves: [
				{
					fn: (x) => (x <= 1.5 ? 0.3 - 0.08 * x : Number.NaN),
					color: '#7c3aed',
					label: '[H₃O⁺](x)'
				}
			],
			points: [
				{ x: 0, y: 0.3, label: '0,30', color: '#1d4ed8' },
				{ x: 1.5, y: 0.18, label: '(1,5 ; 0,18)', color: '#dc2626' }
			],
			width: 350,
			height: 220
		})
	);

	const ex4RcCircuitUrl = savePhysicsSvgAsset(
		'bac_2023_math_phy_ex4_rc',
		svgCircuitDiagram({
			kind: 'rc',
			labels: { e: 'E = 6 V', r: 'R = 47 Ω', c: 'C', switchLabel: 'K' },
			width: 325,
			height: 190
		})
	);

	const ex4DischargeUrl = savePhysicsSvgAsset(
		'bac_2023_math_phy_ex4_disch',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 12,
			yMin: 0,
			yMax: 7.5,
			xStep: 2,
			yStep: 1.5,
			xLabel: 't (ms)',
			yLabel: 'uC (V)',
			title: 'الشكل (8): تفريغ المكثفة في الصمام الضوئي (الوضع 2)',
			curves: [
				{
					fn: (t) => (t <= 8 ? 6.0 * Math.exp(-t / 13.4) : Number.NaN),
					color: '#dc2626',
					label: 'uC(t)'
				}
			],
			dashedGuides: [
				{ x1: 0, y1: 6.0, x2: 12, y2: 0, color: '#2563eb', label: '(Δ)', labelPos: 'right' },
				{ x1: 0, y1: 3.3, x2: 8, y2: 3.3, color: '#059669' },
				{ x1: 8, y1: 0, x2: 8, y2: 3.3, color: '#059669' }
			],
			points: [
				{ x: 0, y: 6.0, label: '6,0 V', color: '#dc2626' },
				{ x: 8, y: 3.3, label: 'US = 3,3 V', color: '#059669' },
				{ x: 12, y: 0, label: "τ' = 12 ms", color: '#2563eb' }
			],
			width: 350,
			height: 220
		})
	);

	const ex4ChargeSolUrl = savePhysicsSvgAsset(
		'bac_2023_math_phy_ex4_charge_sol',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 100,
			yMin: 0,
			yMax: 7.0,
			xStep: 20,
			yStep: 1.0,
			xLabel: 't (ms)',
			yLabel: 'uC (V)',
			title: 'البيان التجريبي لشحن المكثفة uC(t)',
			curves: [
				{
					fn: (t) => 6.0 * (1 - Math.exp(-t / 23)),
					color: '#2563eb',
					label: 'uC(t)'
				}
			],
			dashedGuides: [
				{ x1: 0, y1: 3.78, x2: 23, y2: 3.78, color: '#dc2626' },
				{ x1: 23, y1: 0, x2: 23, y2: 3.78, color: '#dc2626' }
			],
			points: [{ x: 23, y: 3.78, label: 'τ = 23 ms', color: '#dc2626' }],
			width: 345,
			height: 215
		})
	);

	const ex1CsEq = nuclearEquation(
		[{ A: 137, Z: 55, symbol: 'Cs' }],
		[
			{ A: 137, Z: 56, symbol: 'Ba' },
			{ A: 0, Z: '(-1)', symbol: 'e' }
		],
		{ display: true }
	);

	const ex3MgEq = chemEquation(
		[
			{ formula: 'Mg', state: 's' },
			{ coeff: 2, formula: 'H3O+', state: 'aq' }
		],
		[
			{ formula: 'Mg^2+', state: 'aq' },
			{ formula: 'H2', state: 'g' },
			{ coeff: 2, formula: 'H2O', state: 'l' }
		],
		{ display: true }
	);

	const ex3Ice = buildIceTable({
		equation: ex3MgEq,
		speciesHeaders: [
			chemSpecies('Mg', 's'),
			chemSpecies('H3O+', 'aq'),
			chemSpecies('Mg^2+', 'aq'),
			chemSpecies('H2', 'g')
		],
		initial: [
			{ katex: 'n_0(Mg)', typst: '$n_0("Mg")$' },
			{ katex: 'c_0 V_0', typst: '$c_0 V_0$' },
			{ katex: '0', typst: '$0$' },
			{ katex: '0', typst: '$0$' }
		],
		intermediate: [
			{ katex: 'n_0(Mg)-x', typst: '$n_0("Mg") - x$' },
			{ katex: 'c_0 V_0-2x', typst: '$c_0 V_0 - 2 x$' },
			{ katex: 'x', typst: '$x$' },
			{ katex: 'x', typst: '$x$' }
		],
		final: [
			{ katex: '...', typst: '........' },
			{ katex: '...', typst: '........' },
			{ katex: '...', typst: '........' },
			{ katex: '...', typst: '........' }
		],
		finalAnswers: [
			{ katex: 'n_0(Mg)-x_f', typst: '$n_0("Mg") - x_f$' },
			{ katex: 'c_0 V_0-2x_f', typst: '$c_0 V_0 - 2 x_f$' },
			{ katex: 'x_f', typst: '$x_f$' },
			{ katex: 'x_f', typst: '$x_f$' }
		]
	});

	const exercises: ExerciseBlock[] = [
		{
			id: 'bac_2023_math_phy_ex1',
			num: 'الأول',
			customTitle: 'الجزء الأول — التمرين الأول',
			points: 4,
			instruction:
				'في 26 أفريل 1986، أدى خطأ في تشغيل مفاعل تشرنوبيل إلى تسرب أنوية السيزيوم 137 (' +
				nuclide(137, 55, 'Cs').typst +
				') المشعة. يهدف التمرين إلى دراسة التفكك الإشعاعي للسيزيوم 137. نعطي: $N_A = "6,02" times 10^(23) "mol"^(-1)$، $M(""^137 "Cs") = 137 "g" dot "mol"^(-1)$، $1 "an" = 31557600 "s"$.',
			content: [
				{
					type: 'image',
					src: ex1AtUrl,
					caption: 'الشكل (1): منحنى تناقص النشاط الإشعاعي A(t) للسيزيوم 137',
					width: 355
				},
				{
					type: 'text',
					content:
						'1) عرّف النواة المشعة، واذكر خصائص النشاط الإشعاعي. \\\n2) تتفكك نواة السيزيوم 137 وفق المعادلة: $""_55^137 "Cs" arrow.r ""_Z^A "X" + ""_(-1)^0 "e"$. \\\n1.2. بتطبيق قانوني انحفاظ صودي، جد $A$ و $Z$ محدّداً النواة الناتجة من السند: $""_57^137 "La"$، $""_56^137 "Ba"$، $""_55^134 "Cs"$، $""_54^132 "Xe"$. \\\n2.2. اذكر نمط التفكك وفسّر كيفية حدوثه، ثم مثّل التحول في المخطط $(N, Z)$.',
					answer:
						'1) النواة المشعة هي نواة غير مستقرة تتفكك تلقائياً لتتحول إلى نواة أكثر استقراراً مع إصدار إشعاعات. خصائص النشاط الإشعاعي: تلقائي، عشوائي، حتمي.\n2) 1.2. بانحفاظ العدد الكتلي $A = 137$ والعدد الشحني $Z = 56$؛ النواة الناتجة هي الباريوم ' +
						nuclide(137, 56, 'Ba').typst +
						':\n' +
						ex1CsEq.typst +
						'\n2.2. نمط التفكك هو $beta^-$: يتحول نيترون إلى بروتون داخل النواة مع انبعاث إلكترون: $""_0^1"n" arrow.r ""_1^1"p" + ""_(-1)^0"e"$. في المخطط $(N, Z)$ ننتقل من $(N=82, Z=55)$ إلى $(N=81, Z=56)$ نحو الأسفل واليمين.',
					mark: '2'
				},
				{
					type: 'text',
					content:
						'3) من الشكل (1)، حدّد زمن نصف عمر السيزيوم 137 ($t_(1/2)$). \\\n4) اكتب قانون تناقص النشاط $A(t)$، وبيّن أن $lambda = frac(ln 2, t_(1/2))$، ثم احسب الكتلة الابتدائية $m_0$ للعينة. \\\n5) احسب المدة الزمنية اللازمة لتفكك $99%$ من أنوية السيزيوم 137 الابتدائية، وهل أصبحت المنطقة آمنة بعد $37 "ans"$ من الحادثة؟',
					answer:
						'3) بيانياً عند $A = A_0 / 2 = "1,5" times 10^(10) "Bq"$ نجد: $t_(1/2) = "30,2" "ans"$.\n4) $A(t) = A_0 e^(-lambda t)$. عند $t = t_(1/2)$: $A_0 / 2 = A_0 e^(-lambda t_(1/2)) arrow.r.double lambda = frac(ln 2, t_(1/2))$. \\\n$m_0 = frac(A_0 M t_(1/2), N_A ln 2) = frac(3 times 10^(10) times 137 times "30,2" times 31557600, "6,02" times 10^(23) times "0,693") approx "9,39" times 10^(-3) "g"$.\n5) لتفكك $99%$ يتبقى $1%$: $frac(A_0, 100) = A_0 e^(-lambda t) arrow.r.double t = frac(t_(1/2), ln 2) ln 100 approx "200,5" "ans"$. \\\nبعد $37 "ans"$ لا تزال نسبة $frac(A(37), A_0) = e^(-(37 ln 2)/"30,2") approx 43%$ باقية، فالمطقة *غير آمنة* بعد.',
					mark: '2'
				}
			]
		},
		{
			id: 'bac_2023_math_phy_ex2',
			num: 'الثاني',
			customTitle: 'الجزء الأول — التمرين الثاني',
			points: 4,
			instruction:
				'في رياضة رمي الجلة، يقذف رياضي كرة معدنية كتلتها $m = "7,27" "kg"$ ($rho = 8000 "kg" dot "m"^(-3)$) من الموضع $M_0(x_0 = "0,5" "m" ; y_0 = "2,1" "m")$ عند $t = 0$ بسرعة ابتدائية $v_0 = "12,9" "m" dot "s"^(-1)$ يصنع حاملها زاوية $alpha$ مع الأفق، في معلم غاليلي $(O ; arrow(i), arrow(j))$ مرتبط بسطح الأرض. نعطي: $g = "9,8" "m" dot "s"^(-2)$، الكتلة الحجمية للهواء $rho_0 = "1,3" "kg" dot "m"^(-3)$.',
			content: [
				{
					type: 'columns',
					children: [
						{ type: 'image', src: ex2TrajUrl, caption: 'الشكل (2): قذف الكرة المعدنية', width: 310 },
						{ type: 'image', src: ex2RangeUrl, caption: 'الشكل (3): تغيرات المدى xM بدلالة α', width: 340 }
					]
				},
				{
					type: 'text',
					content:
						'*I.* 1) اكتب في اللحظة $t = 0$ العبارتين الشعاعيتين لكل من شعاع الموضع الابتدائي $arrow(O M)_0$ وشعاع السرعة الابتدائية $arrow(v)_0$ بدلالة $alpha$. \\\n2) بيّن أن كلاً من شدة دافعة أرخميدس $Pi$ وقوة احتكاك الهواء $f = "0,003" dot v^2$ (حيث $v <= 15 "m" dot "s"^(-1)$) مهملتان أمام ثقل الكرة.',
					answer:
						'*I.* 1) $arrow(O M)_0 = "0,5" arrow(i) + "2,1" arrow(j)$؛ و $arrow(v)_0 = ("12,9" cos alpha) arrow(i) + ("12,9" sin alpha) arrow(j)$.\n2) - نسبة الثقل إلى دافعة أرخميدس: $frac(P, Pi) = frac(rho V g, rho_0 V g) = frac(8000, "1,3") approx 6154 >> 1$، فهي مهملة. \\\n- نسبة الثقل إلى الاحتكاك الأعظمي: $frac(P, f_"max") = frac("7,27" times "9,8", "0,003" times 15^2) approx "105,5" >> 1$، فقوة الاحتكاك مهملة.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3) بتطبيق القانون الثاني لنيوتن، جد: العبارة الشعاعية لتسارع مركز العطالة $arrow(a)_G$، المعادلتين الزمنيتين للسرعتين $v_x(t)$ و $v_y(t)$، والمعادلتين الزمنيتين للموضع $x(t)$ و $y(t)$. \\\n*II.* اعتماداً على المنحنى البياني $x_M(alpha)$ (الشكل 3)، جد قيمة الزاوية $alpha$ التي تحقق أبعد مسافة أفقية، وقيمة $x_M$ الموافقة لها.',
					answer:
						'3) $arrow(P) = m arrow(a)_G arrow.r.double a_x = 0$ و $a_y = -g = -"9,8" "m" dot "s"^(-2)$، أي $arrow(a)_G = -"9,8" arrow(j)$. \\\n- السرعتان: $v_x(t) = v_0 cos alpha$ و $v_y(t) = -g t + v_0 sin alpha$. \\\n- الإحداثيان: $x(t) = v_0 (cos alpha) t + x_0$ و $y(t) = -frac(1, 2) g t^2 + v_0 (sin alpha) t + y_0$.\n*II.* من الشكل (3)، تتحقق أعظم مسافة عند الزاوية $alpha = 42 degree$ وتساوي $x_M = "19,47" "m"$.',
					mark: '2.5'
				}
			]
		},
		{
			id: 'bac_2023_math_phy_ex3',
			num: 'الثالث',
			customTitle: 'الجزء الأول — التمرين الثالث',
			points: 6,
			instruction:
				'يتفاعل معدن المغنيزيوم ' +
				chemSpecies('Mg', 's').typst +
				' ($M = 24 "g" dot "mol"^(-1)$) مع محلول حمض كلور الهيدروجين وفق تحول تام وبطيء ينطلق خلاله غاز ' +
				chemSpecies('H2', 'g').typst +
				' ($V_M = 24 "L" dot "mol"^(-1)$). ندخل في دورق عند $t = 0$ شريط مغنيزيوم كتلته $m_0$ وحجماً $V_0 = 10 "mL"$ من حمض كلور الهيدروجين تركيزه $c_0$ ثم نمدّده بالماء المقطر ليصبح حجم المحلول $V_T = 25 "mL"$.',
			content: [
				{
					type: 'columns',
					children: [
						{ type: 'image', src: ex3MgCurveUrl, caption: 'الشكل (5): كتلة المغنيزيوم المتبقية mMg(t)', width: 330 },
						{ type: 'image', src: ex3H3oCurveUrl, caption: 'الشكل (6): تغيرات [H₃O⁺] بدلالة x', width: 330 }
					]
				},
				{
					type: 'text',
					content:
						'1) استنتج الثنائيتين $(o x / r e d)$ المشاركتين في التفاعل المنمذج بالمعادلة التالية، ثم أكمل جدول التقدم:\n' +
						ex3MgEq.typst,
					answer:
						'1) الثنائيتان المشاركتان: $("Mg"^(2+)(a q) / "Mg"(s))$ و $("H"_3"O"^+(a q) / "H"_2(g))$.',
					mark: '1.25'
				},
				ex3Ice.typstBlock,
				{
					type: 'text',
					content:
						'2) اعتماداً على الشكل (6): \\\n1.2. حدّد المتفاعل المحدّ، ثم استنتج الكتلة الابتدائية $m_0("Mg")$ والحجم النهائي لغاز الهيدروجين $V_f("H"_2)$. \\\n2.2. استنتج سلم الرسم الناقص لمحور التراتيب في الشكل (5) (حيث تمثل $m_0$ بـ $4 "cm"$). \\\n3.2. جد قيمة التركيز المولي $c_0$ لحمض كلور الهيدروجين قبل التمديد.',
					answer:
						'2) 1.2. عند نهاية التفاعل يظهر الشكل (6) أن $["H"_3"O"^+]_f = "0,18" "mol" dot "L"^(-1) != 0$؛ بما أن التفاعل تام فالمتفاعل المحدّ هو المغنيزيوم ' +
						chemSpecies('Mg', 's').typst +
						'. \\\nمن الشكل (6): $x_f = "1,5" "mmol" = "1,5" times 10^(-3) "mol"$. \\\nكتلة المغنيزيوم: $m_0 = M dot x_f = 24 times "1,5" times 10^(-3) = "0,036" "g" = 36 "mg"$. \\\nحجم الغاز: $V_f("H"_2) = V_M dot x_f = 24 times "1,5" times 10^(-3) = "0,036" "L" = 36 "mL"$.\n2.2. السلم: $4 "cm" arrow.r 36 "mg" arrow.r.double 1 "cm" arrow.r 9 "mg"$.\n3.2. من الشكل (6) عند $x = 0$: $["H"_3"O"^+]_0 = "0,30" "mol" dot "L"^(-1) = frac(c_0 V_0, V_T) arrow.r.double c_0 = frac(25 times "0,30", 10) = "0,75" "mol" dot "L"^(-1)$.',
					mark: '2.5'
				},
				{
					type: 'text',
					content:
						'3) حدّد زمن نصف التفاعل $t_(1/2)$ من الشكل (5). \\\n4) بيّن أن عبارة السرعة الحجمية للتفاعل هي: $v_"vol" = -frac(1, V_T dot M("Mg")) frac(d m_"Mg", d t)$، ثم احسب قيمتها عند $t = 0$ بـ $"mol" dot "L"^(-1) dot "min"^(-1)$ واستنتج السرعة الحجمية لاختفاء شوارد الهيدرونيوم عند نفس اللحظة.',
					answer:
						'3) عند $t = t_(1/2)$ تكون $m_"Mg" = m_0 / 2 = 18 "mg"$. بالإسقاط في الشكل (5): $t_(1/2) = 5 "min"$.\n4) لدينا $x(t) = frac(m_0 - m(t), M("Mg"))$، بالاشتقاق: $v_"vol" = frac(1, V_T) frac(d x, d t) = -frac(1, V_T dot M("Mg")) frac(d m_"Mg", d t)$. \\\nميل المماس $(Delta)$ عند $t = 0$: $lr(|frac(d m, d t)|)_0 = -frac(36 times 10^(-3), "7,5") = -"4,8" times 10^(-3) "g" dot "min"^(-1)$. \\\nإذن: $v_"vol"(0) = -frac(-"4,8" times 10^(-3), 25 times 10^(-3) times 24) = "8,0" times 10^(-3) "mol" dot "L"^(-1) dot "min"^(-1)$. \\\nسرعة اختفاء ' +
						chemSpecies('H3O+', 'aq').typst +
						': $v_"vol"("H"_3"O"^+) = 2 v_"vol" = 16 times 10^(-3) "mol" dot "L"^(-1) dot "min"^(-1)$.',
					mark: '2.25'
				}
			]
		},
		{
			id: 'bac_2023_math_phy_ex4',
			num: 'الرابع',
			customTitle: 'الجزء الثاني — التمرين التجريبي',
			points: 6,
			instruction:
				'ننمذج الوماض الضوئي لجهاز الرادار بالدارة الكهربائية (الشكل 4) المكونة من مولد مثالي للتوتر $E$، ناقل أومي مقاومته $R = 47 Omega$، مكثفة فارغة سعتها $C$، صمام ثنائي ضوئي، وبادلة $K$.',
			content: [
				{
					type: 'columns',
					children: [
						{ type: 'image', src: ex4RcCircuitUrl, caption: 'الشكل (4): دارة الوماض الضوئي', width: 300 },
						{ type: 'image', src: ex4DischargeUrl, caption: 'الشكل (8): تفريغ المكثفة (الوضع 2)', width: 330 }
					]
				},
				{
					type: 'text',
					content:
						'*I. البادلة $K$ في الوضع (1) — شحن المكثفة:* \\\n1) اذكر كيف يمكن عملياً متابعة تطور التوتر $u_C(t)$ بدلالة الزمن. \\\n2) أعطت المتابعة التجريبية الجدول الآتي للتوتر $u_C(t)$:',
					answer:
						'*I.* 1) نظراً لصغر الفارق الزمني بين ومضتين (بضع أجزاء من الميلي ثانية)، نستعمل راسم اهتزاز ذو ذاكرة أو نظام $E x A O$.',
					mark: '0.5'
				},
				{
					type: 'table',
					headers: [
						'$t ("ms")$',
						'$0$',
						'$15$',
						'$25$',
						'$35$',
						'$45$',
						'$55$',
						'$65$',
						'$75$',
						'$85$',
						'$95$',
						'$100$'
					],
					cells: [
						'$u_C ("V")$',
						'$"0,00"$',
						'$"3,00"$',
						'$"4,00"$',
						'$"4,80"$',
						'$"5,20"$',
						'$"5,50"$',
						'$"5,70"$',
						'$"5,80"$',
						'$"5,90"$',
						'$"6,00"$',
						'$"6,00"$'
					],
					headerBackground: true,
					borders: 'grid',
					width: 'full'
				},
				{
					type: 'text',
					content:
						'1.2. ارسم المنحنى البياني $u_C = f(t)$ بالسلم: $1 "cm" arrow.r 10 "ms"$ و $1 "cm" arrow.r "0,5" "V"$. \\\n2.2. بتطبيق قانون جمع التوترات، جد المعادلة التفاضلية لتطور $u_C(t)$. \\\n3.2. يُعطى الحل بالشكل $u_C(t) = A(1 - e^(-t / alpha))$؛ حدّد عبارتي $A$ و $alpha$ بدلالة مميزات الدارة. \\\n4.2. عيّن بيانياً ثابت الزمن $tau$ ثم استنتج سعة المكثفة $C$.',
					answer:
						'1.2. المنحنى البياني للشحن:\n#align(center)[#image("/static' +
						ex4ChargeSolUrl +
						'", width: 52%)]\n2.2. $u_R(t) + u_C(t) = E arrow.r.double R C frac(d u_C, d t) + u_C = E$.\n3.2. بالاشتقاق والتعويض: $frac(A, alpha) R C e^(-t/alpha) + A - A e^(-t/alpha) = E arrow.r.double A = E = 6 "V"$ و $alpha = R C$.\n4.2. عند $t = tau$: $u_C(tau) = "0,63" E = "0,63" times 6 = "3,78" "V"$، بالإسقاط نجد $tau approx 23 "ms"$. \\\nسعة المكثفة: $C = frac(tau, R) = frac(23 times 10^(-3), 47) approx "4,89" times 10^(-4) "F" approx 490 mu"F"$.',
					mark: '3.25'
				},
				{
					type: 'text',
					content:
						'*II. البادلة $K$ في الوضع (2) — تفريغ المكثفة:* \\\nيصْدِر الصمام الضوئي ومضة وينطفئ عند التوتر $U_S$، فتتحول البادلة آلياً إلى الوضع (1). اعتماداً على الشكل (8): \\\n1) استنتج المدة الزمنية $Delta t$ لتفريغ المكثفة قبل شحنها من جديد، وثابت الزمن $tau\'$ للتفريغ ثم قارنه مع $tau$. \\\n2) حدّد قيمة التوتر $U_S$، ثم احسب التغير في الطاقة الكهربائية المخزنة في المكثفة $Delta E_C$ بين لحظتي الاشتعال والانطفاء، ووضّح على أي شكل تُستهلك.',
					answer:
						'*II.* 1) بيانياً: $Delta t = 8 "ms"$. بتمديد المماس $(Delta)$ عند $t = 0$: $tau\' approx 12 "ms"$. \\\nالمقارنة: $tau > tau\'$ لأن مقاومة دارة التفريغ أصغر من مقاومة دارة الشحن.\n2) بيانياً عند $t = 8 "ms"$: $U_S = "3,3" "V"$. \\\n- الطاقة عند $t = 0$: $E_C(0) = frac(1, 2) C E^2 = "0,5" times 490 times 10^(-6) times 6^2 = "8,8" times 10^(-3) "J"$. \\\n- الطاقة عند $t = 8 "ms"$: $E_C(8) = frac(1, 2) C U_S^2 = "0,5" times 490 times 10^(-6) times "3,3"^2 = "2,7" times 10^(-3) "J"$. \\\n- التغير: $Delta E_C = "2,7" times 10^(-3) - "8,8" times 10^(-3) approx -"6,0" times 10^(-3) "J"$. \\\nتُستهلك هذه الطاقة على شكل *ضوء وحرارة* لأن الصمام غير مثالي وله مقاومة داخلية.',
					mark: '2.25'
				}
			]
		}
	];

	return buildRecord('2023', exercises);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. دورة جوان 2024 — شعبة رياضيات — الموضوع الأول (Galvanic + Unit 7 Osc/RLC)
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2024MathPhysics(): OfficialBacPhysicsPaperRecord {
	const ex1DiagramUrl = savePhysicsSvgAsset(
		'bac_2024_math_phy_ex1_energy',
		svgNuclearEnergyDiagram({
			topLabel: '3 p + 2 n (نويات منفصلة)',
			reactantsLabel: '²H + ³He',
			productsLabel: '⁴He + ¹p',
			deltaELabel: '|ΔE| = 18,36 MeV',
			width: 340,
			height: 195
		})
	);

	const ex3PendulumEnergyUrl = savePhysicsSvgAsset(
		'bac_2024_math_phy_ex3_energy',
		svgPhysicsCurvePlot({
			xMin: -5,
			xMax: 5,
			yMin: 0,
			yMax: 60,
			xStep: 2.5,
			yStep: 10,
			xLabel: 'x (cm)',
			yLabel: 'E (mJ)',
			title: 'تغيرات الطاقة الحركية Ec والكامنة المرونية Epe بدلالة x',
			curves: [
				{
					fn: (x) => 2.0 * x * x,
					color: '#2563eb',
					label: 'Epe(x)'
				},
				{
					fn: (x) => 50 - 2.0 * x * x,
					color: '#dc2626',
					label: 'Ec(x)'
				}
			],
			points: [
				{ x: 0, y: 50, label: 'Em = 50 mJ', color: '#dc2626' },
				{ x: 5, y: 50, label: 'Xm = 5 cm', color: '#2563eb' }
			],
			width: 360,
			height: 220
		})
	);

	const ex4RlcCircuitUrl = savePhysicsSvgAsset(
		'bac_2024_math_phy_ex4_rlc',
		svgCircuitDiagram({
			kind: 'rlc',
			labels: { e: 'E = 8 V', r: 'r', c: 'C = 2 µF', l: '(L, r)', switchLabel: 'K' },
			width: 325,
			height: 195
		})
	);

	const ex4RlcCurveUrl = savePhysicsSvgAsset(
		'bac_2024_math_phy_ex4_uc',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 12,
			yMin: -8,
			yMax: 10,
			xStep: 2,
			yStep: 2,
			xLabel: 't (ms)',
			yLabel: 'uC (V)',
			title: 'التسجيل التجريبي للتوتر uC(t) في الدارة RLC',
			curves: [
				{
					fn: (t) => 8.0 * Math.exp(-t / 13.9) * Math.cos((2 * Math.PI * t) / 4.0),
					color: '#2563eb',
					label: 'uC(t)'
				}
			],
			points: [
				{ x: 0, y: 8.0, label: '8,0 V', color: '#dc2626' },
				{ x: 4.0, y: 6.0, label: '(4,0 ; 6,0)', color: '#059669' }
			],
			width: 365,
			height: 225
		})
	);

	const ex1FusionEq = nuclearEquation(
		[
			{ A: 2, Z: 1, symbol: 'H' },
			{ A: 3, Z: 2, symbol: 'He' }
		],
		[
			{ A: 4, Z: 2, symbol: 'He' },
			{ A: 1, Z: 1, symbol: 'p' }
		],
		{ display: true }
	);

	const ex2CellEq = chemEquation(
		[
			{ formula: 'Fe', state: 's' },
			{ coeff: 2, formula: 'Ag+', state: 'aq' }
		],
		[
			{ formula: 'Fe^2+', state: 'aq' },
			{ coeff: 2, formula: 'Ag', state: 's' }
		],
		{ reversible: true, display: true }
	);

	const ex2Ice = buildIceTable({
		equation: ex2CellEq,
		speciesHeaders: [
			chemSpecies('Fe', 's'),
			chemSpecies('Ag+', 'aq'),
			chemSpecies('Fe^2+', 'aq'),
			chemSpecies('Ag', 's')
		],
		initial: [
			{ katex: 'n_0(Fe)', typst: '$n_0("Fe")$' },
			{ katex: '0,010', typst: '$"0,010"$' },
			{ katex: '0,005', typst: '$"0,005"$' },
			{ katex: 'n_0(Ag)', typst: '$n_0("Ag")$' }
		],
		intermediate: [
			{ katex: 'n_0(Fe)-x', typst: '$n_0("Fe") - x$' },
			{ katex: '0,010-2x', typst: '$"0,010" - 2 x$' },
			{ katex: '0,005+x', typst: '$"0,005" + x$' },
			{ katex: 'n_0(Ag)+2x', typst: '$n_0("Ag") + 2 x$' }
		],
		final: [
			{ katex: '...', typst: '........' },
			{ katex: '...', typst: '........' },
			{ katex: '...', typst: '........' },
			{ katex: '...', typst: '........' }
		],
		finalAnswers: [
			{ katex: 'n_0(Fe)-x_f', typst: '$n_0("Fe") - x_f$' },
			{ katex: '0', typst: '$"0,010" - 2 x_f approx 0$' },
			{ katex: '0,010', typst: '$"0,010"$' },
			{ katex: 'n_0(Ag)+0,010', typst: '$n_0("Ag") + "0,010"$' }
		]
	});

	const exercises: ExerciseBlock[] = [
		{
			id: 'bac_2024_math_phy_ex1',
			num: 'الأول',
			customTitle: 'الجزء الأول — التمرين الأول',
			points: 4,
			instruction:
				'من تفاعلات الاندماج النظيفة الواعدة لإنتاج الطاقة دون نفايات مشعة طويلة الأمد اندماج الديتيريوم ' +
				nuclide(2, 1, 'H').typst +
				' مع الهيليوم-3 ' +
				nuclide(3, 2, 'He').typst +
				'. نعطي طاقات الربط: $E_ell(""^2"H") = "2,22" "MeV"$، $E_ell(""^3"He") = "7,72" "MeV"$، $E_ell(""^4"He") = "28,30" "MeV"$، $N_A = "6,02" times 10^(23) "mol"^(-1)$، $M(""^2"H") = "2,0" "g" dot "mol"^(-1)$، $1 "MeV" = "1,6" times 10^(-13) "J"$.',
			content: [
				{
					type: 'image',
					src: ex1DiagramUrl,
					caption: 'الشكل (1): مخطط الحصيلة الطاقوية للاندماج',
					width: 335
				},
				{
					type: 'text',
					content:
						'1) اكتب معادلة تفاعل الاندماج الحادث علماً أن الناتجين هما ' +
						nuclide(4, 2, 'He').typst +
						' وبروتون. \\\n2) احسب طاقة الربط لكل نوية للنواة ' +
						nuclide(3, 2, 'He').typst +
						' والنواة ' +
						nuclide(4, 2, 'He').typst +
						'، أيهما أكثر استقراراً؟',
					answer:
						'1) معادلة الاندماج:\n' +
						ex1FusionEq.typst +
						'\n2) $frac(E_ell(""^3"He"), 3) = frac("7,72", 3) = "2,57" "MeV/nucl"$؛ $frac(E_ell(""^4"He"), 4) = frac("28,30", 4) = "7,075" "MeV/nucl"$. \\\nالنواة ' +
						nuclide(4, 2, 'He').typst +
						' أكثر استقراراً لأن طاقة ربطها لكل نوية أكبر.',
					mark: '1.75'
				},
				{
					type: 'text',
					content:
						'3) اعتماداً على الشكل (1)، احسب الطاقة المحررة $Delta E_"lib"$ من تفاعل اندماج واحد، ثم استنتج الطاقة المحررة من اندماج $"1,0" "g"$ من الديتيريوم بالجول ($"J"$).',
					answer:
						'3) $Delta E_"lib" = E_ell(""^4"He") - E_ell(""^2"H") - E_ell(""^3"He") = "28,30" - "2,22" - "7,72" = "18,36" "MeV"$. \\\nعدد أنوية الديتيريوم في $"1,0" "g"$: $N = frac("1,0", "2,0") times "6,02" times 10^(23) = "3,01" times 10^(23)$. \\\nالطاقة المحررة: $E = "3,01" times 10^(23) times "18,36" times "1,6" times 10^(-13) approx "8,84" times 10^(11) "J"$.',
					mark: '2.25'
				}
			]
		},
		{
			id: 'bac_2024_math_phy_ex2',
			num: 'الثاني',
			customTitle: 'الجزء الأول — التمرين الثاني',
			points: 4,
			instruction:
				'ننجز عموداً كهربائياً حديد–فضة انطلاقاً من نصفي عمود موصولين بجسر ملحي: صفيحة حديد مغمورة في $V_1 = 100 "mL"$ من محلول كبريتات الحديد II ($["Fe"^(2+)]_i = "0,050" "mol" dot "L"^(-1)$) وصفيحة فضة مغمورة في $V_2 = 100 "mL"$ من محلول نترات الفضة ($["Ag"^+]_i = "0,10" "mol" dot "L"^(-1)$). ثابت توازن المعادلة الموافقة هو $K = 10^(41)$. نعطي: $F = 96500 "C" dot "mol"^(-1)$.',
			content: [
				{
					type: 'text',
					content:
						'1) احسب كسر التفاعل الابتدائي $Q_(r,i)$ للمعادلة التالية، ثم حدّد جهة التطور التلقائي للعمود وقطبيته:\n' +
						ex2CellEq.typst,
					answer:
						'1) $Q_(r,i) = frac(["Fe"^(2+)]_i, ["Ag"^+]_i^2) = frac("0,050", "0,10"^2) = "5,0" < K = 10^(41)$. \\\nتتطور الجملة في الاتجاه المباشر: صفيحة الحديد هي المصعد $(-)$ وصفيحة الفضة هي المهبط $(+)$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'2) أكمل جدول التقدم التالي (بافتراض صفيحة الحديد غير محدّة)، وحدّد التقدم الأعظمي $x_"max"$:',
					answer:
						'تُستهلك شوارد الفضة ' +
						chemSpecies('Ag+', 'aq').typst +
						' أولاً ($"0,010" - 2 x_"max" = 0 arrow.r.double x_"max" = "5,0" times 10^(-3) "mol"$).',
					mark: '1'
				},
				ex2Ice.typstBlock,
				{
					type: 'text',
					content:
						'3) احسب كمية الكهرباء الأعظمية $Q_"max"$ التي ينتجها العمود، ثم استنتج المدة الزمنية العظمى لاشتغاله عند ربطه بناقل يمرر تياراً ثابتاً شدته $I = "0,10" "A"$.',
					answer:
						'3) $Q_"max" = 2 F x_"max" = 2 times 96500 times "5,0" times 10^(-3) = 965 "C"$. \\\nالمدة الزمنية العظمى: $Delta t_"max" = frac(Q_"max", I) = frac(965, "0,10") = 9650 "s" approx 2 "h" 41 "min"$.',
					mark: '1.5'
				}
			]
		},
		{
			id: 'bac_2024_math_phy_ex3',
			num: 'الثالث',
			customTitle: 'الجزء الأول — التمرين الثالث',
			points: 6,
			instruction:
				'يتناول التمرين دراسة جملتين ميكانيكيتين: قمر اصطناعي ونواس مرن أفقي (الوحدة 7). نعطي: $G = "6,67" times 10^(-11) "S.I"$.',
			content: [
				{
					type: 'text',
					content:
						'*I. القمر الاصطناعي وحساب كتلة الأرض:* \\\nيدور قمر اصطناعي للملاحة حول مركز الأرض في مدار دائري نصف قطره $r = "2,66" times 10^7 "m"$ بدور مداري $T = 12 "h"$. \\\n1) بتطبيق القانون الثاني لنيوتن في معلم فريني، جد عبارة السرعة المدارية $v$ والدور $T$ بدلالة $G$ و $M_T$ و $r$. \\\n2) احسب السرعة المدارية $v$ ثم استنتج كتلة الأرض $M_T$.',
					answer:
						'*I.* 1) $G frac(M_T m, r^2) = m frac(v^2, r) arrow.r.double v = sqrt(frac(G M_T, r))$ و $T = frac(2 pi r, v) = 2 pi sqrt(frac(r^3, G M_T))$.\n2) $T = 12 times 3600 = 43200 "s" arrow.r.double v = frac(2 pi times "2,66" times 10^7, 43200) approx 3869 "m" dot "s"^(-1)$. \\\nكتلة الأرض: $M_T = frac(4 pi^2 r^3, G T^2) = frac(4 pi^2 ("2,66" times 10^7)^3, "6,67" times 10^(-11) times 43200^2) approx "5,97" times 10^(24) "kg"$.',
					mark: '2.5'
				},
				{
					type: 'image',
					src: ex3PendulumEnergyUrl,
					caption: 'الشكل (2): منحنيات الطاقة Ec(x) و Epe(x) للنواس المرن',
					width: 350
				},
				{
					type: 'text',
					content:
						'*II. النواس المرن الأفقي (الوحدة 7):* \\\nنربط جسماً صلباً كتلته $m = 250 "g"$ بنابض مرن أفقي مهمل الكتلة ثابت مرونته $k$، ونزيحه عن موضع توازنه ثم نحرره دون احتكاك. يمثّل الشكل (2) تغيرات الطاقة الحركية $E_c$ والطاقة الكامنة المرونية $E_(p e)$ بدلالة الفاصلة $x$. \\\n1) استنتج من الشكل (2) سعة الاهتزاز $X_m$، الطاقة الميكانيكية $E_m$، وثابت مرونة النابض $k$. \\\n2) اكتب المعادلة التفاضلية للفاصلة $x(t)$، ثم احسب الدور الخاص $T_0$ والسرعة العظمى $v_"max"$.',
					answer:
						'*II.* 1) بيانياً: $X_m = "5,0" "cm" = "0,050" "m"$ و $E_m = 50 "mJ" = "0,050" "J"$. \\\nمن $E_m = frac(1, 2) k X_m^2 arrow.r.double k = frac(2 E_m, X_m^2) = frac(2 times "0,050", "0,050"^2) = 40 "N" dot "m"^(-1)$.\n2) المعادلة التفاضلية: $frac(d^2 x, d t^2) + frac(k, m) x = 0$. \\\nالدور الخاص: $T_0 = 2 pi sqrt(frac(m, k)) = 2 pi sqrt(frac("0,25", 40)) approx "0,497" "s"$. \\\nالسرعة العظمى: $v_"max" = sqrt(frac(2 E_m, m)) = sqrt(frac("0,100", "0,25")) approx "0,632" "m" dot "s"^(-1)$.',
					mark: '3.5'
				}
			]
		},
		{
			id: 'bac_2024_math_phy_ex4',
			num: 'الرابع',
			customTitle: 'الجزء الثاني — التمرين التجريبي',
			points: 6,
			instruction:
				'لتحقيق الدارة المهتزة $(R, L, C)$ (الشكل 3)، نشحن مكثفة سعتها $C = "2,0" mu"F"$ بواسطة مولد توتر ثابت $E = "8,0" "V"$، ثم نفرغها عند $t = 0$ في وشيعة ذاتيتها $L$ ومقاومتها الداخلية $r$. نعاين التوتر $u_C(t)$ بواسطة برمجية $E x A O$ فنحصل على المنحنى الممثل في الشكل (4).',
			content: [
				{
					type: 'columns',
					children: [
						{ type: 'image', src: ex4RlcCircuitUrl, caption: 'الشكل (3): التركيب التجريبي للدارة RLC', width: 310 },
						{ type: 'image', src: ex4RlcCurveUrl, caption: 'الشكل (4): التوتر uC(t) المسجل بـ ExAO', width: 340 }
					]
				},
				{
					type: 'text',
					content:
						'1) كيف نبرهن عملياً أن تغيرات الشحنة $q(t)$ مماثلة في الشكل لتغيرات التوتر $u_C(t)$؟ وما طبيعة نظام الاهتزازات الملاحظ في الشكل (4)؟ \\\n2) بتطبيق قانون جمع التوترات، جد المعادلة التفاضلية التي يحقّقها التوتر $u_C(t)$ أثناء التفريغ.',
					answer:
						'1) لأن $q(t) = C u_C(t)$ تتناسب طرداً مع $u_C(t)$؛ النظام الملاحظ هو *نظام شبه دوري* بسبب وجود المقاومة الداخلية $r$ للوشيعة.\n2) $u_C + u_b = 0 arrow.r.double u_C + L frac(d i, d t) + r i = 0$. وبما أن $i = C frac(d u_C, d t)$ فإن:\n$frac(d^2 u_C, d t^2) + frac(r, L) frac(d u_C, d t) + frac(1, L C) u_C = 0$.',
					mark: '1.75'
				},
				{
					type: 'text',
					content:
						'3) باعتبار شبه الدور $T approx T_0 = 2 pi sqrt(L C)$، حدّد $T$ من الشكل (4) ثم احسب ذاتية الوشيعة $L$. \\\n4) احسب الطاقة الكلية المخزنة في الدارة عند اللحظتين $t = 0$ و $t = T$، ثم استنتج الطاقة المبددة خلال شبه الدور الأول.',
					answer:
						'3) بيانياً: $T = "4,0" "ms" = "4,0" times 10^(-3) "s"$. \\\nذاتية الوشيعة: $L = frac(T^2, 4 pi^2 C) = frac(("4,0" times 10^(-3))^2, 4 pi^2 times "2,0" times 10^(-6)) approx "0,20" "H"$.\n4) عند $t = 0$: $E_T(0) = frac(1, 2) C E^2 = "0,5" times "2,0" times 10^(-6) times "8,0"^2 = 64 mu"J"$. \\\nعند $t = T$: $i(T) = 0$ و $u_C(T) = "6,0" "V" arrow.r.double E_T(T) = "0,5" times "2,0" times 10^(-6) times "6,0"^2 = 36 mu"J"$. \\\nالطاقة المبددة: $|Delta E_T| = 64 - 36 = 28 mu"J"$.',
					mark: '2.5'
				},
				{
					type: 'text',
					content:
						'5) ندرج على التسلسل مع الوشيعة والمكثفة جهاز تغذية للاهتزازات يطبق توتراً $u_g(t) = k dot i(t)$. ما دور هذا الجهاز وما قيمة $k$ الموافقة للحصول على اهتزازات دورية غير متخامدة (علماً أن $r = 14 Omega$)؟',
					answer:
						'5) دور الجهاز هو *تعويض الطاقة المبددة بفعل جول* في الدارة لتغذية الاهتزازات. \\\nتصبح المعادلة التفاضلية: $L C frac(d^2 u_C, d t^2) + (r - k) C frac(d u_C, d t) + u_C = 0$؛ نحصل على نظام دوري غير متخامد عندما يكون $k = r = 14 Omega$.',
					mark: '1.75'
				}
			]
		}
	];

	return buildRecord('2024', exercises);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. دورة جوان 2025 — شعبة رياضيات — الموضوع الأول (Unit 7 RLC + Inclined/Proj + Ester)
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2025MathPhysics(): OfficialBacPhysicsPaperRecord {
	const ex1LnAUrl = savePhysicsSvgAsset(
		'bac_2025_math_phy_ex1_lna',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 11.4,
			yMin: 9.0,
			yMax: 12.6,
			xStep: 3.8,
			yStep: 0.9,
			xLabel: 't (jours)',
			yLabel: 'ln A',
			title: 'تغيرات ln A بدلالة الزمن t لعينة الرادون 222',
			curves: [
				{
					fn: (t) => 12.0 - 0.1824 * t,
					color: '#2563eb',
					label: 'ln A(t)'
				}
			],
			points: [
				{ x: 0, y: 12.0, label: '(0 ; 12,0)', color: '#dc2626' },
				{ x: 7.6, y: 10.61, label: '(7,6 ; 10,61)', color: '#059669' }
			],
			width: 360,
			height: 220
		})
	);

	const ex2RegimesUrl = savePhysicsSvgAsset(
		'bac_2025_math_phy_ex2_regimes',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 12,
			yMin: -10,
			yMax: 12,
			xStep: 2,
			yStep: 4,
			xLabel: 't (ms)',
			yLabel: 'uC (V)',
			title: 'أنظمة التفريغ الثلاثة في الدارة RLC',
			curves: [
				{
					fn: (t) => 10 * Math.cos((2 * Math.PI * t) / 4.0),
					color: '#2563eb',
					label: '(1) دوري',
					dashed: true
				},
				{
					fn: (t) => 10 * Math.exp(-t / 6.0) * Math.cos((2 * Math.PI * t) / 4.0),
					color: '#059669',
					label: '(2) شبه دوري'
				},
				{
					fn: (t) => 10 * (1 + t / 1.0) * Math.exp(-t / 1.0),
					color: '#dc2626',
					label: '(3) حرج/لادوري'
				}
			],
			width: 365,
			height: 225
		})
	);

	const ex3InclinedUrl = savePhysicsSvgAsset(
		'bac_2025_math_phy_ex3_inc',
		svgInclinedPlaneForces({
			angleDeg: 30,
			showFriction: false,
			angleLabel: 'α = 30°',
			width: 315,
			height: 190
		})
	);

	const ex3TrajUrl = savePhysicsSvgAsset(
		'bac_2025_math_phy_ex3_proj',
		svgProjectileTrajectory({
			angleLabel: '0°',
			v0Label: 'vB = 5,0 m/s',
			showApex: false,
			width: 315,
			height: 190
		})
	);

	const ex4EsterCurveUrl = savePhysicsSvgAsset(
		'bac_2025_math_phy_ex4_ester',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 90,
			yMin: 0,
			yMax: 0.4,
			xStep: 18,
			yStep: 0.1,
			xLabel: 't (min)',
			yLabel: 'n(ester) (mol)',
			title: 'تطور كمية مادة الأستر المتشكل بدلالة الزمن',
			curves: [
				{
					fn: (t) => 0.333 * (1 - Math.exp((-t * Math.LN2) / 18)),
					color: '#2563eb',
					label: 'n_ester(t)'
				}
			],
			dashedGuides: [
				{ x1: 0, y1: 0.333, x2: 90, y2: 0.333, color: '#64748b' },
				{ x1: 0, y1: 0, x2: 26, y2: 0.333, color: '#dc2626', label: '(Δ)', labelPos: 'left' },
				{ x1: 18, y1: 0, x2: 18, y2: 0.167, color: '#059669' },
				{ x1: 0, y1: 0.167, x2: 18, y2: 0.167, color: '#059669' }
			],
			points: [
				{ x: 18, y: 0.167, label: 't₁/₂ = 18 min', color: '#059669' },
				{ x: 26, y: 0.333, label: '(26 ; 0,333)', color: '#dc2626' }
			],
			width: 365,
			height: 225
		})
	);

	const ex1DecayEq = nuclearEquation(
		[{ A: 222, Z: 86, symbol: 'Rn' }],
		[
			{ A: 218, Z: 84, symbol: 'Po' },
			{ A: 4, Z: 2, symbol: 'He' }
		],
		{ display: true }
	);

	const ex4EsterEq = chemEquation(
		[
			{ formula: 'CH3COOH', state: 'l' },
			{ formula: 'C3H7OH', state: 'l' }
		],
		[
			{ formula: 'CH3COOC3H7', state: 'l' },
			{ formula: 'H2O', state: 'l' }
		],
		{ reversible: true, display: true }
	);

	const ex4Ice = buildIceTable({
		equation: ex4EsterEq,
		speciesHeaders: [
			chemSpecies('CH3COOH', 'l'),
			chemSpecies('C3H7OH', 'l'),
			chemSpecies('CH3COOC3H7', 'l'),
			chemSpecies('H2O', 'l')
		],
		initial: [
			{ katex: '0,50', typst: '$"0,50"$' },
			{ katex: '0,50', typst: '$"0,50"$' },
			{ katex: '0', typst: '$0$' },
			{ katex: '0', typst: '$0$' }
		],
		intermediate: [
			{ katex: '0,50-x', typst: '$"0,50" - x$' },
			{ katex: '0,50-x', typst: '$"0,50" - x$' },
			{ katex: 'x', typst: '$x$' },
			{ katex: 'x', typst: '$x$' }
		],
		final: [
			{ katex: '...', typst: '........' },
			{ katex: '...', typst: '........' },
			{ katex: '...', typst: '........' },
			{ katex: '...', typst: '........' }
		],
		finalAnswers: [
			{ katex: '0,50-x_f', typst: '$"0,50" - x_f$' },
			{ katex: '0,50-x_f', typst: '$"0,50" - x_f$' },
			{ katex: 'x_f', typst: '$x_f$' },
			{ katex: 'x_f', typst: '$x_f$' }
		]
	});

	const exercises: ExerciseBlock[] = [
		{
			id: 'bac_2025_math_phy_ex1',
			num: 'الأول',
			customTitle: 'الجزء الأول — التمرين الأول',
			points: 4,
			instruction:
				'الرادون 222 (' +
				nuclide(222, 86, 'Rn').typst +
				') غاز مشع باعث لأشعة $alpha$ يتحول إلى البولونيوم ' +
				nuclide(218, 84, 'Po').typst +
				'. نتابع نشاط عينة منه فنرسم البيان $ln A = f(t)$ (الشكل 1). نعطي: $N_A = "6,02" times 10^(23) "mol"^(-1)$، $M(""^222"Rn") = 222 "g" dot "mol"^(-1)$، $1 "jour" = 86400 "s"$.',
			content: [
				{
					type: 'image',
					src: ex1LnAUrl,
					caption: 'الشكل (1): تغيرات ln A(t) بدلالة الزمن t',
					width: 350
				},
				{
					type: 'text',
					content:
						'1) اكتب معادلة التفكك النووي للرادون 222. \\\n2) انطلاقاً من قانون التناقص الإشعاعي $A(t) = A_0 e^(-lambda t)$، جد العلاقة النظرية لـ $ln A(t)$ ثم استخرج من البيان قيمتي $A_0$ و $lambda$، واستنتج زمن نصف العمر $t_(1/2)$ بالأيام.',
					answer:
						'1) معادلة التفكك:\n' +
						ex1DecayEq.typst +
						'\n2) $ln A(t) = -lambda t + ln A_0$. \\\nمن البيان: $ln A_0 = "12,0" arrow.r.double A_0 = e^("12,0") approx "1,63" times 10^5 "Bq"$. \\\nالميل: $-lambda = frac("10,61" - "12,0", "7,6" - 0) = -"0,1824" "j"^(-1) arrow.r.double lambda = "0,1824" "j"^(-1)$. \\\nزمن نصف العمر: $t_(1/2) = frac(ln 2, lambda) = frac("0,693", "0,1824") approx "3,80" "jours"$.',
					mark: '2.5'
				},
				{
					type: 'text',
					content: '3) احسب الكتلة الابتدائية $m_0$ لعينة الرادون 222.',
					answer:
						'3) $lambda = frac("0,1824", 86400) = "2,11" times 10^(-6) "s"^(-1)$. \\\n$m_0 = frac(A_0 M, lambda N_A) = frac("1,63" times 10^5 times 222, "2,11" times 10^(-6) times "6,02" times 10^(23)) approx "2,85" times 10^(-11) "g"$.',
					mark: '1.5'
				}
			]
		},
		{
			id: 'bac_2025_math_phy_ex2',
			num: 'الثاني',
			customTitle: 'الجزء الأول — التمرين الثاني',
			points: 4,
			instruction:
				'في دارة $(R, L, C)$ على التسلسل (الوحدة 7)، نفرغ مكثفة سعتها $C = "4,0" mu"F"$ مشحونة تحت توتر $E = 10 "V"$ في وشيعة مثالية ذاتيتها $L = "0,10" "H"$ وناقل أومي متغير المقاومة $R_T$. يوضح الشكل (2) ثلاث منحنيات لتغير $u_C(t)$ من أجل ثلاث قيم للمقاومة الكلية $R_T$.',
			content: [
				{
					type: 'image',
					src: ex2RegimesUrl,
					caption: 'الشكل (2): أنظمة التفريغ الثلاثة في الدارة RLC',
					width: 355
				},
				{
					type: 'text',
					content:
						'1) اكتب المعادلة التفاضلية للتوتر $u_C(t)$ بدلالة $R_T$ و $L$ و $C$. \\\n2) أرفق كل منحنى بنظام الاهتزاز الموافق ورتّب قيم $R_T$ ($0 Omega$، $35 Omega$، $320 Omega$) وفقاً لذلك.',
					answer:
						'1) $L C frac(d^2 u_C, d t^2) + R_T C frac(d u_C, d t) + u_C = 0 arrow.r.double frac(d^2 u_C, d t^2) + frac(R_T, L) frac(d u_C, d t) + frac(1, L C) u_C = 0$.\n2) - المنحنى (1): نظام *دوري* ($R_T = 0 Omega$). \\\n- المنحنى (2): نظام *شبه دوري* ($R_T = 35 Omega$). \\\n- المنحنى (3): نظام *لادوري/حرج* ($R_T = 320 Omega$).',
					mark: '2'
				},
				{
					type: 'text',
					content:
						'3) احسب الدور الخاص $T_0$ للدارة في النظام الدوري (1). \\\n4) عبّر عن الطاقة الكلية $E_T(t)$ للدارة، وأثبت أن $frac(d E_T, d t) = -R_T i^2 <= 0$ مفسّراً دلالة الإشارة السالبة.',
					answer:
						'3) $T_0 = 2 pi sqrt(L C) = 2 pi sqrt("0,10" times "4,0" times 10^(-6)) approx "3,97" times 10^(-3) "s" approx "4,0" "ms"$.\n4) $E_T = frac(1, 2) C u_C^2 + frac(1, 2) L i^2$. بالاشتقاق: $frac(d E_T, d t) = i (u_C + L frac(d i, d t)) = i (-R_T i) = -R_T i^2 <= 0$. \\\nتتناقص الطاقة الكلية مع الزمن بسبب تبددها حرارياً بفعل جول في المقاومة $R_T$.',
					mark: '2'
				}
			]
		},
		{
			id: 'bac_2025_math_phy_ex3',
			num: 'الثالث',
			customTitle: 'الجزء الأول — التمرين الثالث',
			points: 6,
			instruction:
				'ينزلق جسم صلب $(S)$ كتلته $m = "0,50" "kg"$ دون سرعة ابتدائية من النقطة $A$ على مستوٍ مائل أملس $A B$ طوله $A B = "2,5" "m"$ وزاوية ميله $alpha = 30 degree$، ثم يغادر الموضع $B$ أفقياً بسرعة $arrow(v)_B$ نحو سطح الأرض الواقع على ارتفاع $h_B = "1,25" "m"$ تحت النقطة $B$. نهمل تأثير الهواء، ونعطي: $g = 10 "m" dot "s"^(-2)$.',
			content: [
				{
					type: 'columns',
					children: [
						{ type: 'image', src: ex3InclinedUrl, caption: 'الشكل (3): المرحلة الأولى AB', width: 300 },
						{ type: 'image', src: ex3TrajUrl, caption: 'الشكل (4): القذيفة الأفقية بعد B', width: 300 }
					]
				},
				{
					type: 'text',
					content:
						'*I. الحركة على المستوي المائل الأملس $A B$:* \\\n1) مثّل القوى المطبقة على $(S)$ على المستوي $A B$ واحسب تسارع مركز عطالته $a$. \\\n2) استنتج سرعة الجسم عند بلوغه النقطة $B$ ($v_B$).',
					answer:
						'*I.* 1) القوى: $arrow(P)$ و $arrow(R)_N$. بالإسقاط على محور الحركة: $m g sin alpha = m a arrow.r.double a = g sin 30 degree = "5,0" "m" dot "s"^(-2)$.\n2) $v_B^2 - 0 = 2 a A B arrow.r.double v_B = sqrt(2 times "5,0" times "2,5") = "5,0" "m" dot "s"^(-1)$.',
					mark: '2'
				},
				{
					type: 'text',
					content:
						'*II. حركة القذيفة في الهواء:* نختار مبدءاً للمعلم عند $B(0 ; 0)$ بمحور $B x$ أفقي ومحور $B y$ شاقولي موجه نحو الأسفل، ولحظة مغادرة $B$ مبدأ للأزمنة $t = 0$. \\\n1) جد المعادلتين الزمنيتين $x(t)$ و $y(t)$ ثم استنتج معادلة المسار $y(x)$. \\\n2) احسب زمن السقوط $t_P$ والمدى الأفقي $x_P$، ثم احسب سرعة الاصطدام بالأرض $v_P$.',
					answer:
						'*II.* 1) $a_x = 0 arrow.r.double x(t) = v_B t = "5,0" t$؛ و $a_y = g arrow.r.double y(t) = frac(1, 2) g t^2 = "5,0" t^2$. \\\nبحذف الزمن $t = x / 5$: $y(x) = frac(g, 2 v_B^2) x^2 = "0,20" x^2$.\n2) عند الأرض $y_P = h_B = "1,25" "m" arrow.r.double "5,0" t_P^2 = "1,25" arrow.r.double t_P = "0,50" "s"$. \\\nالمدى الأفقي: $x_P = "5,0" times "0,50" = "2,5" "m"$. \\\nسرعة الاصطدام: $v_(P x) = "5,0" "m/s"$، $v_(P y) = g t_P = "5,0" "m/s" arrow.r.double v_P = sqrt(5^2 + 5^2) approx "7,07" "m" dot "s"^(-1)$.',
					mark: '4'
				}
			]
		},
		{
			id: 'bac_2025_math_phy_ex4',
			num: 'الرابع',
			customTitle: 'الجزء الثاني — التمرين التجريبي',
			points: 6,
			instruction:
				'لتحضير إيثانوات البروبيل، نمزج في أنابيب مرقمة عند $80 degree"C"$ مزيجاً ابتدائياً متساوي المولات يتكوّن من $n_0 = "0,50" "mol"$ من حمض الإيثانويك و $"0,50" "mol"$ من بروبان-1-ول مع قطرات من حمض الكبريت المركز. نعاير الحمض المتبقي في كل أنبوب بعد التبريد الفجائي فنرسم المنحنى $n_"ester"(t)$ (الشكل 5).',
			content: [
				{
					type: 'image',
					src: ex4EsterCurveUrl,
					caption: 'الشكل (5): تطور كمية مادة الأستر المتشكل بدلالة الزمن',
					width: 355
				},
				{
					type: 'text',
					content:
						'1) لماذا نضع الأنابيب في حمام مائي بارد (ماء مثلج) قبل معايرة الحمض المتبقي؟ وما دور حمض الكبريت المركز؟ \\\n2) اكتب معادلة تفاعل الأسترة وأكمل جدول التقدم التالي:',
					answer:
						'1) التبريد الفجائي (السقي الكيميائي) يوقف التفاعل عملياً لتجميد التركيب المولي للمزيج قبل المعايرة. حمض الكبريت المركز وسيط يسرّع التفاعل دون تغيير حالة التوازن.\n2) معادلة الأسترة:\n' +
						ex4EsterEq.typst,
					mark: '1.75'
				},
				ex4Ice.typstBlock,
				{
					type: 'text',
					content:
						'3) عيّن بيانياً زمن نصف التفاعل $t_(1/2)$ والسرعة الابتدائية لتشكل الأستر عند $t = 0$. \\\n4) احسب مردود الأسترة $r$ وثابت التوازن $K$، ثم قارن المردود في حال استبدال بروبان-1-ول بكحول ثالثي (2-ميثيل بروبان-2-ول).',
					answer:
						'3) عند $t = t_(1/2)$: $n_"ester" = x_f / 2 = "0,167" "mol" arrow.r.double t_(1/2) = 18 "min"$. \\\nالسرعة الابتدائية لتشكل الأستر: $v(0) = lr(|frac(d n_"ester", d t)|)_0 = frac("0,333", 26) approx "1,28" times 10^(-2) "mol" dot "min"^(-1)$.\n4) المردود: $r = frac("0,333", "0,50") times 100% = "66,7"%$ (موافق لكحول أولي). \\\nثابت التوازن: $K = frac("0,333"^2, "0,167"^2) approx "4,0"$. \\\nعند استبدال الكحول الأولي بكحول ثالثي، ينخفض المردود بشكل كبير (إلى حدود $5%$ تقريباً).',
					mark: '4.25'
				}
			]
		}
	];

	return buildRecord('2025', exercises);
}

export function buildOfficialPhysicsBac3asMath(): OfficialBacPhysicsPaperRecord[] {
	return [buildBac2023MathPhysics(), buildBac2024MathPhysics(), buildBac2025MathPhysics()];
}
