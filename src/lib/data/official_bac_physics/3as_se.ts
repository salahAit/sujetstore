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
	svgProjectileTrajectory,
	svgTitrationSetup
} from '../../modules/PhysicsTemplates/svg-physics';
import type { OfficialBacPhysicsPaperRecord } from './types';

function buildMetadata(year: '2023' | '2024' | '2025'): ExamMetadata {
	return {
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي',
		streamId: 'SE',
		streamName: 'علوم تجريبية',
		subjectId: 'PHY-SE',
		subjectName: 'العلوم الفيزيائية',
		trimesterId: 't3',
		trimesterName: 'دورة بكالوريا رسمية',
		docType: 'exam',
		academicYear: year,
		duration: '03 ساعات و30 دقيقة',
		coefficient: 5,
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
		slug: `bac-${year}-3as-se-physics`,
		grade: '3as_se',
		yearSubjectId: 683,
		streamId: 'SE',
		streamNameAr: 'علوم تجريبية',
		academicYear: year,
		sessionAr: 'دورة جوان ' + year,
		coefficient: 5,
		duration: '03 ساعات و30 دقيقة',
		titleAr: `بكالوريا رسمية في العلوم الفيزيائية — شعبة علوم تجريبية (دورة جوان ${year} - الموضوع الأول)`,
		sourcePdfRelPath: `pipeline/references_physics/3as/bac_official/bac_${year}_se_physics_subject.pdf`,
		sourceSolutionPdfRelPath: `pipeline/references_physics/3as/bac_official/bac_${year}_se_physics_correction.pdf`,
		examDoc
	};
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. دورة جوان 2023 — شعبة علوم تجريبية — الموضوع الأول (ONEC 2023)
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2023SePhysics(): OfficialBacPhysicsPaperRecord {
	// Ex 1: F(t) = P - f(t) curve with tangent at t = 0 intersecting t = tau = 0.1 s
	const ex1FtSubjUrl = savePhysicsSvgAsset(
		'bac_2023_se_phy_ex1_ft_subj',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 0.6,
			yMin: 0,
			yMax: 18,
			xStep: 0.1,
			yStep: 3,
			xLabel: 't (s)',
			yLabel: 'F (×10⁻² N)',
			title: 'تطور محصلة القوى F بدلالة الزمن t',
			curves: [
				{
					fn: (t) => 14.7 * Math.exp(-t / 0.1),
					color: '#2563eb',
					label: 'F(t)'
				}
			],
			dashedGuides: [
				{
					x1: 0,
					y1: 14.7,
					x2: 0.1,
					y2: 0,
					color: '#dc2626',
					label: '(Δ)',
					labelPos: 'right'
				}
			],
			points: [
				{ x: 0, y: 14.7, label: 'F₀ = 14,7', color: '#dc2626' },
				{ x: 0.1, y: 0, label: 't₁ = 0,1 s', color: '#dc2626' }
			],
			width: 390,
			height: 245
		})
	);

	const ex1AtSolUrl = savePhysicsSvgAsset(
		'bac_2023_se_phy_ex1_at_sol',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 0.6,
			yMin: 0,
			yMax: 12,
			xStep: 0.1,
			yStep: 2,
			xLabel: 't (s)',
			yLabel: 'aG (m/s²)',
			title: 'المنحنى الكيفي لتغيرات التسارع aG(t)',
			curves: [
				{
					fn: (t) => 10 * Math.exp(-t / 0.1),
					color: '#059669',
					label: 'aG(t)'
				}
			],
			points: [{ x: 0, y: 10, label: 'g = 10', color: '#dc2626' }],
			width: 340,
			height: 210
		})
	);

	// Ex 2: [Cr2O7^2-](t) curve & pH titration curve
	const ex2ConcSubjUrl = savePhysicsSvgAsset(
		'bac_2023_se_phy_ex2_conc_subj',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 30,
			yMin: 0,
			yMax: 0.6,
			xStep: 5,
			yStep: 0.1,
			xLabel: 't (min)',
			yLabel: '[Cr₂O₇²⁻] (mol/L)',
			title: 'تطور التركيز المولي لشوارد ثنائي الكرومات',
			curves: [
				{
					fn: (t) => 0.48 - 0.3868 * (1 - Math.exp((-t * Math.LN2) / 5.6)),
					color: '#2563eb',
					label: '[Cr₂O₇²⁻](t)'
				}
			],
			dashedGuides: [
				{ x1: 0, y1: 0.093, x2: 30, y2: 0.093, color: '#64748b' },
				{ x1: 0, y1: 0.29, x2: 5.6, y2: 0.29, color: '#dc2626' },
				{ x1: 5.6, y1: 0, x2: 5.6, y2: 0.29, color: '#dc2626', label: 't₁/₂', labelPos: 'right' }
			],
			points: [
				{ x: 0, y: 0.48, label: '0,48', color: '#1d4ed8' },
				{ x: 5.6, y: 0.29, label: '(5,6 ; 0,29)', color: '#dc2626' }
			],
			width: 380,
			height: 240
		})
	);

	const ex2PhSubjUrl = savePhysicsSvgAsset(
		'bac_2023_se_phy_ex2_ph_subj',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 30,
			yMin: 0,
			yMax: 14,
			xStep: 5,
			yStep: 2,
			xLabel: 'Vb (mL)',
			yLabel: 'pH',
			title: 'منحنى المعايرة الـ pH-مترية لحمض الإيثانويك',
			curves: [
				{
					fn: (vb) => {
						if (vb <= 0.1) return 3.4;
						if (vb < 19.8) return 4.8 + Math.log10(vb / (20 - vb));
						if (vb <= 20.2) return 8.4;
						return 12 + Math.log10((vb - 20) / (20 + vb));
					},
					color: '#7c3aed',
					label: 'pH(Vb)'
				}
			],
			dashedGuides: [
				{ x1: 0, y1: 4.8, x2: 10, y2: 4.8, color: '#059669' },
				{ x1: 10, y1: 0, x2: 10, y2: 4.8, color: '#059669' },
				{ x1: 0, y1: 8.4, x2: 20, y2: 8.4, color: '#dc2626' },
				{ x1: 20, y1: 0, x2: 20, y2: 8.4, color: '#dc2626' }
			],
			points: [
				{ x: 10, y: 4.8, label: 'pKA = 4,8', color: '#059669' },
				{ x: 20, y: 8.4, label: 'E(20 ; 8,4)', color: '#dc2626' }
			],
			width: 380,
			height: 240
		})
	);

	// Ex 3: RC Circuit + u_G2(t) linear curve + i(t) discharge curve
	const ex3RcCircuitUrl = savePhysicsSvgAsset(
		'bac_2023_se_phy_ex3_rc_circuit',
		svgCircuitDiagram({
			kind: 'rc',
			labels: { e: 'E = 6 V', r: 'R = 250 Ω', c: 'C', switchLabel: 'K' },
			width: 350,
			height: 200
		})
	);

	const ex3Ug2SubjUrl = savePhysicsSvgAsset(
		'bac_2023_se_phy_ex3_ug2_subj',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 0.25,
			yMin: 0,
			yMax: 15,
			xStep: 0.05,
			yStep: 3,
			xLabel: 't (ms)',
			yLabel: 'uG2 (V)',
			title: 'تغيرات التوتر uG2(t) بدلالة الزمن (الوضع 3)',
			curves: [
				{
					fn: (t) => 30 * t + 6,
					color: '#2563eb',
					label: 'uG2(t)'
				}
			],
			points: [
				{ x: 0, y: 6, label: '(0 ; 6)', color: '#dc2626' },
				{ x: 0.2, y: 12, label: '(0,2 ; 12)', color: '#dc2626' }
			],
			width: 370,
			height: 235
		})
	);

	const ex3ItSolUrl = savePhysicsSvgAsset(
		'bac_2023_se_phy_ex3_it_sol',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 1.0,
			yMin: -25,
			yMax: 5,
			xStep: 0.2,
			yStep: 5,
			xLabel: 't (ms)',
			yLabel: 'i (mA)',
			title: 'المنحنى الكيفي لشدة التيار i(t) أثناء التفريغ',
			curves: [
				{
					fn: (t) => -24 * Math.exp(-t / 0.2),
					color: '#dc2626',
					label: 'i(t)'
				}
			],
			points: [{ x: 0, y: -24, label: '-I₀', color: '#dc2626' }],
			width: 340,
			height: 210
		})
	);

	const ex2OxEq = chemEquation(
		[
			{ coeff: 2, formula: 'Cr2O7^2-', state: 'aq' },
			{ coeff: 3, formula: 'C2H5OH', state: 'l' },
			{ coeff: 16, formula: 'H+', state: 'aq' }
		],
		[
			{ coeff: 4, formula: 'Cr^3+', state: 'aq' },
			{ coeff: 3, formula: 'CH3CO2H', state: 'l' },
			{ coeff: 11, formula: 'H2O', state: 'l' }
		],
		{ display: true }
	);

	const ex2Ice = buildIceTable({
		equation: ex2OxEq,
		speciesHeaders: [
			chemSpecies('Cr2O7^2-', 'aq'),
			chemSpecies('C2H5OH', 'l'),
			chemSpecies('Cr^3+', 'aq'),
			chemSpecies('CH3CO2H', 'l')
		],
		initial: [
			{ katex: 'n_{01}', typst: '$n_(01)$' },
			{ katex: 'n_{02}', typst: '$n_(02)$' },
			{ katex: '0', typst: '$0$' },
			{ katex: '0', typst: '$0$' }
		],
		intermediate: [
			{ katex: 'n_{01}-2x', typst: '$n_(01) - 2 x$' },
			{ katex: 'n_{02}-3x', typst: '$n_(02) - 3 x$' },
			{ katex: '4x', typst: '$4 x$' },
			{ katex: '3x', typst: '$3 x$' }
		],
		final: [
			{ katex: '...', typst: '........' },
			{ katex: '...', typst: '........' },
			{ katex: '...', typst: '........' },
			{ katex: '...', typst: '........' }
		],
		finalAnswers: [
			{ katex: 'n_{01}-2x_f', typst: '$n_(01) - 2 x_f$' },
			{ katex: 'n_{02}-3x_f', typst: '$n_(02) - 3 x_f$' },
			{ katex: '4x_f', typst: '$4 x_f$' },
			{ katex: '3x_f', typst: '$3 x_f$' }
		]
	});

	const ex2TitrationEq = chemEquation(
		[
			{ formula: 'CH3COOH', state: 'aq' },
			{ formula: 'HO-', state: 'aq' }
		],
		[
			{ formula: 'CH3COO-', state: 'aq' },
			{ formula: 'H2O', state: 'l' }
		],
		{ display: true }
	);

	const exercises: ExerciseBlock[] = [
		{
			id: 'bac_2023_se_phy_ex1',
			num: 'الأول',
			customTitle: 'الجزء الأول — التمرين الأول',
			points: 6,
			instruction:
				'يهدف التمرين إلى دراسة السقوط الشاقولي لجسم صلب $(S)$ كتلته $m = 15 "g"$ في الهواء انطلاقاً من السكون في مرجع سطحي أرضي. نعطي تسارع الجاذبية الأرضية: $g = 10 "m" dot "s"^(-2)$.',
			content: [
				{
					type: 'text',
					content:
						'*I. المبدأ الأساسي للتحريك:*\nورد في كتاب إسحاق نيوتن: «تغيرات الحركة تتناسب مع القوة المحركة المطبقة». \\\n1) عبّر عن كل مصطلح من المصطلحين الآتيين بالمقدار الفيزيائي الموافق: «تغيرات الحركة» و «القوة المحركة».',
					answer:
						'*I.* 1) التعبير بالمقدار الفيزيائي الموافق:\n- تغيرات الحركة: $Delta arrow(v)$ و/أو شعاع التسارع $arrow(a)$.\n- القوة المحركة: محصلة القوى الخارجية $sum arrow(F)_"ext"$.',
					mark: '0.5'
				},
				{
					type: 'text',
					content:
						'2) 1.2. ما اسم القانون الخاص بالمبدأ الأساسي للتحريك؟ \\\n2.2. اذكر نص هذا القانون وعبّر عنه بعلاقة رياضية.',
					answer:
						'2) 1.2. اسم القانون: القانون الثاني لنيوتن.\n2.2. *نص القانون الثاني لنيوتن:* «في مرجع غاليلي، المجموع الشعاعي للقوى الخارجية المطبقة على جملة مادية يساوي في كل لحظة جداء كتلتها في شعاع تسارع مركز عطالتها». \\\nالعلاقة الرياضية: $sum arrow(F)_"ext" = m dot arrow(a)_G$.',
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'*II. خطوات تطبيق المبدأ الأساسي للتحريك:*\n1) اشرح كيف يحقّق المرجع السطحي الأرضي شرط المرجع الغاليلي أثناء دراسة حركة السقوط الشاقولي.',
					answer:
						'*II.* 1) حتى نعتبر المرجع السطحي الأرضي غاليلياً، يجب أن تكون مدة دراسة حركة السقوط في الهواء صغيرة جداً مقارنة بمدة حركة الأرض حول نفسها ($24 "h"$)، وهذا ما يتحقق مادام السقوط تمّ من ارتفاع صغير.',
					mark: '0.25'
				},
				{
					type: 'text',
					content:
						'2) اذكر الخطوات المنهجية لتطبيق القانون الثاني لنيوتن. \\\n3) مثّل دون سلم القوى المؤثرة على $(S)$ عند اللحظة $t = 0 "s"$ وعند اللحظة $t > 0 "s"$ (حيث قوة الاحتكاك $arrow(f) = -k dot arrow(v)_G$).',
					answer:
						'2) خطوات تطبيق القانون الثاني لنيوتن: اختيار الجملة الميكانيكية المدروسة؛ تحديد مرجع الدراسة الغاليلي المزود بمعلم متعامد؛ إحصاء وتمثيل القوى الخارجية المطبقة؛ تطبيق العلاقة $sum arrow(F)_"ext" = m dot arrow(a)_G$.\n3) التمثيل الكيفي للقوى:\n- عند $t = 0 "s"$: الثقل $arrow(P)$ نحو الأسفل ودافعة أرخميدس $arrow(Pi)$ نحو الأعلى (حيث $P > Pi$).\n- عند $t > 0 "s"$: الثقل $arrow(P)$ نحو الأسفل، ودافعة أرخميدس $arrow(Pi)$ وقوة الاحتكاك $arrow(f)$ نحو الأعلى.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'*III. الدراسة التجريبية لحركة مركز عطالة $(S)$:*\nمكّنت برمجية مناسبة من رسم المنحنى البياني الممثل لتغيرات محصلة القوى $F(t)$ بدلالة الزمن $t$، حيث $(Delta)$ يمثل المماس للمنحنى عند $t = 0$.',
					answer: '',
					mark: ''
				},
				{
					type: 'image',
					src: ex1FtSubjUrl,
					caption: 'الشكل (1): تطور شدة محصلة القوى F(t) بدلالة الزمن t',
					width: 360
				},
				{
					type: 'text',
					content:
						'1) حدّد بيانياً قيمة $F_0$ عند $t = 0$، ثم تأكّد من إهمال دافعة أرخميدس $Pi$ أمام الثقل $P$.',
					answer:
						'*III.* 1) بيانياً: $F_0 approx "14,7" times 10^(-2) "N"$. \\\nبتطبيق القانون الثاني لنيوتن عند $t = 0$: $arrow(P) + arrow(Pi) = arrow(F)_0$، وبالإسقاط على محور الحركة: $F_0 = P - Pi arrow.r.double Pi = m g - F_0 = 15 times 10^(-3) times 10 - "0,147" = "0,3" times 10^(-2) "N"$. \\\nنحسب النسبة: $frac(P, Pi) = frac(15 times 10^(-2), "0,3" times 10^(-2)) = 50 >> 1$، نستنتج أن شدة دافعة أرخميدس $arrow(Pi)$ مهملة أمام شدة الثقل $arrow(P)$.',
					mark: '0.75'
				},
				{
					type: 'text',
					content: '2) توقع وارسم بشكل كيفي البيان $a_G = f(t)$.',
					answer:
						'2) حسب القانون الثاني لنيوتن $F = m dot a_G$، فإن $a_G$ تتناسب طرداً مع $F$؛ لذلك تتناقص $a_G$ أسياً من قيمة عظمى $a_0 approx g = 10 "m" dot "s"^(-2)$ نحو الصفر في النظام الدائم:\n#align(center)[#image("/static' +
						ex1AtSolUrl +
						'", width: 52%)]',
					mark: '0.5'
				},
				{
					type: 'text',
					content:
						'3) بإهمال دافعة أرخميدس، أثبت المعادلة التفاضلية للسرعة $v_G(t)$ ثم استنتج عبارة الزمن المميز للحركة $tau$.',
					answer:
						'3) الجملة: الجسم $(S)$، المرجع: سطحي أرضي غاليلي مزود بمحور شاقولي موجه نحو الأسفل $(O, arrow(j))$. \\\nالقوى الخارجية: $arrow(P)$ و $arrow(f)$. بتطبيق القانون الثاني لنيوتن: $arrow(P) + arrow(f) = m dot arrow(a)_G$. \\\nبالإسقاط على محور الحركة: $m g - k v_G = m frac(d v_G, d t) arrow.r.double frac(d v_G, d t) + frac(k, m) v_G = g$. \\\nبالمطابقة مع الشكل القياسي للمعادلة التفاضلية نجد: $tau = frac(m, k)$.',
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'4) أثبت أن المماس $(Delta)$ للمنحنى $F(t)$ عند $t = 0$ يقطع محور الأزمنة عند اللحظة $t_1 = tau$.',
					answer:
						'4) معامل توجيه المماس $(Delta)$ عند $t = 0$ هو: $K = lr(|frac(d F, d t)|)_(t = 0) = frac(0 - F_0, t_1 - 0) = -frac(m a_0, t_1)$. \\\nولدينا $F(t) = P - f = m g - k v_G(t)$، بالاشتقاق عند $t = 0$: $lr(|frac(d F, d t)|)_(t = 0) = -k lr(|frac(d v_G, d t)|)_(t = 0) = -k a_0$. \\\nبالمساواة نجد: $-frac(m a_0, t_1) = -k a_0 arrow.r.double t_1 = frac(m, k) = tau$.',
					mark: '0.75'
				},
				{
					type: 'text',
					content: '5) استنتج قيمة معامل الاحتكاك $k$ والسرعة الحدية $v_"lim"$.',
					answer:
						'5) بيانياً: $tau = t_1 = "0,1" "s"$. \\\n- حساب $k$: $k = frac(m, tau) = frac(15 times 10^(-3), "0,1") = "0,15" "kg" dot "s"^(-1)$. \\\n- حساب $v_"lim"$: في النظام الدائم $frac(d v_G, d t) = 0$ ومنه $v_"lim" = frac(m g, k) = tau dot g = "0,1" times 10 = 1 "m" dot "s"^(-1)$.',
					mark: '0.75'
				}
			]
		},
		{
			id: 'bac_2023_se_phy_ex2',
			num: 'الثاني',
			customTitle: 'الجزء الأول — التمرين الثاني',
			points: 7,
			instruction:
				'ينقسم التمرين إلى جزأين مستقلين في الكيمياء الحركية والأحماض والأسس. \\\n*I. دراسة حركية لتفاعل اصطناع حمض الإيثانويك:* نمزج عند $t = 0$ حجماً $V_1 = 100 "mL"$ من محلول ثنائي كرومات البوتاسيوم تركيزه المولي $c = "0,50" "mol" dot "L"^(-1)$ المحمّض بحمض الكبريت المركز، مع حجم $V_2 = "3,4" "mL"$ من الإيثانول ' +
				chemSpecies('C2H5OH', 'l').typst +
				' ($rho = "0,81" "g" dot "mL"^(-1)$، $M = 46 "g" dot "mol"^(-1)$).',
			content: [
				{
					type: 'text',
					content:
						'1) 1.1. بيّن أن التفاعل الحادث تفاعل أكسدة–إرجاع وحدّد الثنائيتين $(o x / r e d)$ المشاركتين في التفاعل، ثم اكتب معادلة التفاعل الإجمالية.',
					answer:
						'*I.* 1.1. المعادلتان النصفيتان:\n- للأكسدة: $3 times ("C"_2"H"_5"OH" + "H"_2"O" arrow.r "CH"_3"CO"_2"H" + 4 "H"^+ + 4 e^-)$\n- للإرجاع: $2 times ("Cr"_2"O"_7^(2-) + 14 "H"^+ + 6 e^- arrow.r 2 "Cr"^(3+) + 7 "H"_2"O")$\nالثنائيتان المشاركتان: $("CH"_3"CO"_2"H" / "C"_2"H"_5"OH")$ و $("Cr"_2"O"_7^(2-) / "Cr"^(3+))$. \\\nمعادلة التفاعل الإجمالية:\n' +
						ex2OxEq.typst,
					mark: '1'
				},
				{
					type: 'text',
					content:
						'2.1. وضّح دور حمض الكبريت المركز في الوسط التفاعلي. \\\n3.1. تأكد أن كميتي المادة الابتدائيتين هما: $n_(01)("Cr"_2"O"_7^(2-)) = 50 "mmol"$ و $n_(02)("C"_2"H"_5"OH") approx 60 "mmol"$.',
					answer:
						'2.1. يوفر حمض الكبريت المركز شوارد ' +
						chemSpecies('H+', 'aq').typst +
						' اللازمة لتمكين المؤكسد ' +
						chemSpecies('Cr2O7^2-', 'aq').typst +
						' من اكتساب الإلكترونات المفقودة من المرجع الإيثانول.\n3.1. كميتا المادة الابتدائيتان:\n- $n_(01)("Cr"_2"O"_7^(2-)) = c dot V_1 = "0,50" times "0,100" = "0,050" "mol" = 50 "mmol"$. \\\n- $n_(02)("C"_2"H"_5"OH") = frac(rho dot V_2, M) = frac("0,81" times "3,4", 46) approx "0,060" "mol" = 60 "mmol"$.',
					mark: '1'
				},
				{
					type: 'text',
					content: '4.1. أكمل جدول تقدم التفاعل التالي في حالته النهائية، ثم استنتج قيمة التقدم الأعظمي $x_"max"$:',
					answer:
						'بفرض ' +
						chemSpecies('Cr2O7^2-', 'aq').typst +
						' محدّاً: $50 - 2 x_"max" = 0 arrow.r.double x_"max" = 25 "mmol"$. \\\nبفرض ' +
						chemSpecies('C2H5OH', 'l').typst +
						' محدّاً: $60 - 3 x_"max" = 0 arrow.r.double x_"max" = 20 "mmol"$. \\\nنأخذ أصغر قيمة، ومنه المتفاعل المحدّ هو الإيثانول و $x_"max" = 20 "mmol"$.',
					mark: '1.25'
				},
				ex2Ice.typstBlock,
				{
					type: 'image',
					src: ex2ConcSubjUrl,
					caption: 'الشكل (2): تطور التركيز المولي [Cr₂O₇²⁻](t) بدلالة الزمن',
					width: 360
				},
				{
					type: 'text',
					content:
						'2) 1.2. أثبت أن التركيز المولي لشوارد ثنائي الكرومات يكتب بالعلاقة: $["Cr"_2"O"_7^(2-)](t) = "0,48" - "19,34" dot x(t)$ (حيث $x(t)$ بالمول). \\\n2.2. عرّف زمن نصف التفاعل $t_(1/2)$ وحدّد قيمته بيانياً اعتماداً على الشكل (2).',
					answer:
						'2) 1.2. من جدول التقدم: $["Cr"_2"O"_7^(2-)](t) = frac(n_(01) - 2 x(t), V_1 + V_2) = frac(50 times 10^(-3), "0,1034") - frac(2, "0,1034") x(t) = "0,48" - "19,34" dot x(t)$.\n2.2. زمن نصف التفاعل $t_(1/2)$ هو الزمن اللازم لبلوغ تقدم التفاعل نصف قيمته النهائية ($x = x_f / 2$). \\\nعند $t = t_(1/2)$ يكون $x = 10 "mmol" = "0,01" "mol"$، بالتعويض: $["Cr"_2"O"_7^(2-)](t_(1/2)) = "0,48" - "19,34" times "0,01" approx "0,29" "mol" dot "L"^(-1)$. \\\nبالإسقاط على البيان نجد: $t_(1/2) approx "5,6" "min"$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'*II. تحديد ثابت الحموضة للثنائية $("CH"_3"COOH" / "CH"_3"COO"^-)$:* \\\nنعاير حجماً $V_a = 20 "mL"$ من محلول مائي لحمض الإيثانويك تركيزه $c_a$ بواسطة محلول هيدروكسيد الصوديوم تركيزه $c_b = 10^(-2) "mol" dot "L"^(-1)$ بمتابعة تغيرات الـ $"pH"$ بدلالة الحجم المضاف $V_b$ (الشكل 3).',
					answer: '',
					mark: ''
				},
				{
					type: 'image',
					src: ex2PhSubjUrl,
					caption: 'الشكل (3): منحنى المعايرة الـ pH-مترية',
					width: 360
				},
				{
					type: 'text',
					content:
						'1) اكتب معادلة تفاعل المعايرة. \\\n2) استنتج حجم الأساس عند التكافؤ $V_(b E)$ ثم احسب التركيز المولي $c_a$. \\\n3) استنتج قيمة ثابت الحموضة $"pK"_A$ للثنائية المدروسة.',
					answer:
						'*II.* 1) معادلة تفاعل المعايرة:\n' +
						ex2TitrationEq.typst +
						'\n2) بطريقة المماسات المتوازية (أو من نقطة نصف التكافؤ $V_b = 10 "mL"$): $V_(b E) = 20 "mL"$. \\\nعند التكافؤ: $c_a V_a = c_b V_(b E) arrow.r.double c_a = frac(10^(-2) times 20, 20) = 10^(-2) "mol" dot "L"^(-1)$.\n3) لدينا $"pH" = "pK"_A + log frac(["CH"_3"COO"^-], ["CH"_3"COOH"])$؛ عند نقطة نصف التكافؤ ($V_b = V_(b E)/2 = 10 "mL"$) يتساوى التركيزان ومنه $"pK"_A = "pH" = "4,8"$.',
					mark: '2.25'
				}
			]
		},
		{
			id: 'bac_2023_se_phy_ex3',
			num: 'الثالث',
			customTitle: 'الجزء الثاني — التمرين التجريبي',
			points: 7,
			instruction:
				'لدراسة تطور التوتر الكهربائي بين طرفي مكثفة سعتها $C$، نحقّق التركيب الكهربائي المبيّن في الشكل (4)، والمكوّن من: مولد مثالي للتوتر $E = 6 "V"$، ناقل أومي مقاومته $R = 250 Omega$، مكثفة فارغة سعتها $C$، بادلة $K$ ذات ثلاثة أوضاع، ومولد للتيار الثابت $G_2$ (في الوضع 3) يعطي تياراً شدته ثابتة $I$.',
			content: [
				{
					type: 'columns',
					children: [
						{ type: 'image', src: ex3RcCircuitUrl, caption: 'الشكل (4): الدارة الكهربائية', width: 320 },
						{ type: 'image', src: ex3Ug2SubjUrl, caption: 'الشكل (5): تطور uG2(t) في الوضع (3)', width: 330 }
					]
				},
				{
					type: 'text',
					content:
						'*I. البادلة $K$ في الوضع (1) — شحن المكثفة:* \\\n1) كيف نربط راسم الاهتزاز ذو الذاكرة لمعاينة التوتر $u_C(t)$ والتوتر $u_R(t)$؟ وما الغرض التجريبي من شحن المكثفة تحت توتر ثابت $E$؟',
					answer:
						'*I.* 1) نربط الهيكل (الكتلة الأرضية) بين المكثفة والناقل الأومي، ونصل المدخل $Y_1$ بطرف المكثفة لمعاينة $u_C(t)$ والمدخل $Y_2$ بالطرف الآخر للناقل الأومي لمعاينة $-u_R(t)$ (مع عكس الإشارة في المدخل $Y_2$). الغرض هو دراسة النظامين الانتقالي والدائم وتحديد ثابت الزمن $tau = R C$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'2) اكتب المعادلة التفاضلية التي يحقّقها التوتر $u_C(t)$ أثناء الشحن، وتحقق أن $u_C(t) = E (1 - e^(-t / (R C)))$ حل لها.',
					answer:
						'2) حسب قانون جمع التوترات: $u_C(t) + u_R(t) = E$ وبما أن $u_R(t) = R C frac(d u_C, d t)$ فإن: $frac(d u_C, d t) + frac(1, R C) u_C = frac(E, R C)$. \\\nبالاشتقاق: $frac(d u_C, d t) = frac(E, R C) e^(-t/(R C))$. بالتعويض في المعادلة التفاضلية نجد $frac(E, R C) e^(-t/(R C)) + frac(E, R C)(1 - e^(-t/(R C))) = frac(E, R C)$، فالحل محقق.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'*II. البادلة $K$ في الوضع (2) — تفريغ المكثفة:* \\\nبعد تمام شحن المكثفة، نضع البادلة $K$ في الوضع (2) عند لحظة نعتبرها مبدأ جديداً للأزمنة $t = 0$. \\\n1) أثبت المعادلة التفاضلية التي تحقّقها شدة التيار الكهربائي $i(t)$ المار في الدارة.',
					answer:
						'*II.* 1) حسب قانون جمع التوترات: $u_C(t) + u_R(t) = 0 arrow.r.double frac(q(t), C) + R i(t) = 0$. \\\nبالاشتقاق بالنسبة للزمن مع $i(t) = frac(d q, d t)$: $frac(1, C) i(t) + R frac(d i(t), d t) = 0 arrow.r.double frac(d i(t), d t) + frac(1, R C) i(t) = 0$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'2) من بين العبارتين التاليتين، اختر الحل المناسب وتحقق منه: $i(t) = I_0 e^(-t/(R C))$ أو $i(t) = -I_0 e^(-t/(R C))$. \\\n3) مثّل بشكل كيفي البيان $i = f(t)$.',
					answer:
						'2) عند $t = 0$ أثناء التفريغ يكون التيار معاكساً لجهة الشحن، فالحل المناسب هو $i(t) = -I_0 e^(-t/(R C))$ حيث $I_0 = E / R$. \\\nالتحقق: $frac(d i, d t) = frac(I_0, R C) e^(-t/(R C))$، وبالتعويض: $frac(I_0, R C) e^(-t/(R C)) - frac(I_0, R C) e^(-t/(R C)) = 0$ (محقق).\n3) التمثيل الكيفي للبيان $i(t)$:\n#align(center)[#image("/static' +
						ex3ItSolUrl +
						'", width: 52%)]',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'*III. البادلة $K$ في الوضع (3) — الشحن بتيار ثابت $I$:* \\\nنفرغ المكثفة كلياً ثم نصلها بمولد للتيار الثابت $G_2$ على التسلسل مع الناقل الأومي $R = 250 Omega$. \\\n1) جد العبارة اللحظية للتوتر $u_(G 2)(t)$ بين طرفي المولد بدلالة $I$ و $C$ و $R$ و $t$.',
					answer:
						'*III.* 1) حسب قانون جمع التوترات: $u_(G 2)(t) = u_C(t) + u_R(t)$. \\\nحيث $q(t) = I dot t arrow.r.double u_C(t) = frac(I, C) t$، و $u_R(t) = R dot I$. \\\nومنه: $u_(G 2)(t) = frac(I, C) t + R dot I$.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'2) باستثمار منحنى الشكل (5)، جد قيمة شدة التيار $I$، ثم تحقق أن سعة المكثفة هي $C = "0,8" mu"F"$.',
					answer:
						'2) معادلة المستقيم من الشكل: $u_(G 2)(t) = a dot t + b$. \\\nبالمطابقة مع العبارة النظرية: $R dot I = b$ و $frac(I, C) = a$. \\\nمن البيان: $b = 6 "V" arrow.r.double I = frac(b, R) = frac(6, 250) = "0,024" "A" = 24 "mA"$. \\\nوميل المستقيم: $a = frac(Delta u_(G 2), Delta t) = frac(12 - 6, "0,2" times 10^(-3)) = 3 times 10^4 "V" dot "s"^(-1)$. \\\nإذن: $C = frac(I, a) = frac("0,024", 3 times 10^4) = 8 times 10^(-7) "F" = "0,8" mu"F"$.',
					mark: '1.5'
				}
			]
		}
	];

	return buildRecord('2023', exercises);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. دورة جوان 2024 — شعبة علوم تجريبية — الموضوع الأول (ONEC Format)
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2024SePhysics(): OfficialBacPhysicsPaperRecord {
	const ex1CurveUrl = savePhysicsSvgAsset(
		'bac_2024_se_phy_ex1_at',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 32,
			yMin: 0,
			yMax: 1.2,
			xStep: 8,
			yStep: 0.2,
			xLabel: 't (jours)',
			yLabel: 'A (×10⁸ Bq)',
			title: 'منحنى التناقص الإشعاعي لعينة اليود 131',
			curves: [
				{
					fn: (t) => 1.0 * Math.exp((-t * Math.LN2) / 8),
					color: '#2563eb',
					label: 'A(t)'
				}
			],
			dashedGuides: [
				{ x1: 0, y1: 0.5, x2: 8, y2: 0.5, color: '#dc2626' },
				{ x1: 8, y1: 0, x2: 8, y2: 0.5, color: '#dc2626', label: 't₁/₂ = 8 j', labelPos: 'right' }
			],
			points: [
				{ x: 0, y: 1.0, label: 'A₀', color: '#1d4ed8' },
				{ x: 8, y: 0.5, label: 'A₀/2', color: '#dc2626' }
			],
			width: 370,
			height: 230
		})
	);

	const ex1EnergyDiagramUrl = savePhysicsSvgAsset(
		'bac_2024_se_phy_ex1_energy',
		svgNuclearEnergyDiagram({
			topLabel: '92 p + 144 n (نويات معزولة)',
			reactantsLabel: '²³⁵U + ¹n',
			productsLabel: '⁹⁴Sr + ¹³⁹Xe + 3 ¹n',
			deltaELabel: '|ΔE| = 180,5 MeV',
			width: 350,
			height: 205
		})
	);

	const ex2InclinedUrl = savePhysicsSvgAsset(
		'bac_2024_se_phy_ex2_inclined',
		svgInclinedPlaneForces({
			angleDeg: 30,
			showFriction: true,
			angleLabel: 'α = 30°',
			width: 340,
			height: 200
		})
	);

	const ex2V2xUrl = savePhysicsSvgAsset(
		'bac_2024_se_phy_ex2_v2x',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 2.5,
			yMin: 0,
			yMax: 15,
			xStep: 0.5,
			yStep: 3,
			xLabel: 'x (m)',
			yLabel: 'v² (m²/s²)',
			title: 'تغيرات مربع السرعة v² بدلالة المسافة x',
			curves: [
				{
					fn: (x) => 6 * x,
					color: '#2563eb',
					label: 'v²(x)'
				}
			],
			points: [{ x: 2.0, y: 12.0, label: '(2,0 ; 12,0)', color: '#dc2626' }],
			width: 360,
			height: 225
		})
	);

	const ex3TitrationSetupUrl = savePhysicsSvgAsset(
		'bac_2024_se_phy_ex3_setup',
		svgTitrationSetup({
			titrantLabel: 'NaOH (cb = 0,1 mol/L)',
			analyteLabel: 'C₂H₅COOH (20 mL)',
			sensorLabel: 'مسبار pH-متر',
			width: 320,
			height: 220
		})
	);

	const ex3PhCurveUrl = savePhysicsSvgAsset(
		'bac_2024_se_phy_ex3_ph',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 25,
			yMin: 0,
			yMax: 14,
			xStep: 5,
			yStep: 2,
			xLabel: 'Vb (mL)',
			yLabel: 'pH',
			title: 'منحنى المعايرة الـ pH-مترية لحمض البروبانويك',
			curves: [
				{
					fn: (vb) => {
						if (vb <= 0.1) return 3.0;
						if (vb < 15.8) return 4.9 + Math.log10(vb / (16 - vb));
						if (vb <= 16.2) return 8.7;
						return 12.5 + Math.log10((vb - 16) / (20 + vb));
					},
					color: '#7c3aed',
					label: 'pH(Vb)'
				}
			],
			dashedGuides: [
				{ x1: 0, y1: 4.9, x2: 8, y2: 4.9, color: '#059669' },
				{ x1: 8, y1: 0, x2: 8, y2: 4.9, color: '#059669' },
				{ x1: 0, y1: 8.7, x2: 16, y2: 8.7, color: '#dc2626' },
				{ x1: 16, y1: 0, x2: 16, y2: 8.7, color: '#dc2626' }
			],
			points: [
				{ x: 8, y: 4.9, label: 'pKA = 4,9', color: '#059669' },
				{ x: 16, y: 8.7, label: 'E(16 ; 8,7)', color: '#dc2626' }
			],
			width: 370,
			height: 235
		})
	);

	const ex1BetaEq = nuclearEquation(
		[{ A: 131, Z: 53, symbol: 'I' }],
		[
			{ A: 131, Z: 54, symbol: 'Xe' },
			{ A: 0, Z: '(-1)', symbol: 'e' }
		],
		{ display: true }
	);

	const ex1FissionEq = nuclearEquation(
		[
			{ A: 235, Z: 92, symbol: 'U' },
			{ A: 1, Z: 0, symbol: 'n' }
		],
		[
			{ A: 94, Z: 38, symbol: 'Sr' },
			{ A: 139, Z: 54, symbol: 'Xe' },
			{ coeff: 3, A: 1, Z: 0, symbol: 'n' }
		],
		{ display: true }
	);

	const ex3TitrationEq = chemEquation(
		[
			{ formula: 'C2H5COOH', state: 'aq' },
			{ formula: 'HO-', state: 'aq' }
		],
		[
			{ formula: 'C2H5COO-', state: 'aq' },
			{ formula: 'H2O', state: 'l' }
		],
		{ display: true }
	);

	const ex3EsterEq = chemEquation(
		[
			{ formula: 'C2H5COOH', state: 'l' },
			{ formula: 'C2H5OH', state: 'l' }
		],
		[
			{ formula: 'C2H5COOC2H5', state: 'l' },
			{ formula: 'H2O', state: 'l' }
		],
		{ reversible: true, display: true }
	);

	const ex3Ice = buildIceTable({
		equation: ex3EsterEq,
		speciesHeaders: [
			chemSpecies('C2H5COOH', 'l'),
			chemSpecies('C2H5OH', 'l'),
			chemSpecies('C2H5COOC2H5', 'l'),
			chemSpecies('H2O', 'l')
		],
		initial: [
			{ katex: '0,30', typst: '$"0,30"$' },
			{ katex: '0,30', typst: '$"0,30"$' },
			{ katex: '0', typst: '$0$' },
			{ katex: '0', typst: '$0$' }
		],
		intermediate: [
			{ katex: '0,30-x', typst: '$"0,30" - x$' },
			{ katex: '0,30-x', typst: '$"0,30" - x$' },
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
			{ katex: '0,30-x_f', typst: '$"0,30" - x_f$' },
			{ katex: '0,30-x_f', typst: '$"0,30" - x_f$' },
			{ katex: 'x_f', typst: '$x_f$' },
			{ katex: 'x_f', typst: '$x_f$' }
		]
	});

	const exercises: ExerciseBlock[] = [
		{
			id: 'bac_2024_se_phy_ex1',
			num: 'الأول',
			customTitle: 'الجزء الأول — التمرين الأول',
			points: 6,
			instruction:
				'تُستعمل التحولات النووية في المجال الطبي لتشخيص وعلاج أمراض الغدة الدرقية باستعمال نظير اليود ' +
				nuclide(131, 53, 'I').typst +
				'، وفي المجال الطاقوي عبر انشطار اليورانيوم ' +
				nuclide(235, 92, 'U').typst +
				'. نعطي: $N_A = "6,02" times 10^(23) "mol"^(-1)$، $M(""^131 "I") = 131 "g" dot "mol"^(-1)$، $1 "jour" = 86400 "s"$.',
			content: [
				{
					type: 'text',
					content:
						'*I. الطب النووي — النشاط الإشعاعي لليود 131:*\nتتفكك نواة ' +
						nuclide(131, 53, 'I').typst +
						' إلى نواة الزينون ' +
						nuclide(131, 54, 'Xe').typst +
						'. يمثّل الشكل (1) تطور النشاط الإشعاعي $A(t)$ لعينة من اليود 131 حقن بها مريض عند $t = 0$.',
					answer: '',
					mark: ''
				},
				{
					type: 'image',
					src: ex1CurveUrl,
					caption: 'الشكل (1): منحنى التناقص الإشعاعي A(t) لليود 131',
					width: 350
				},
				{
					type: 'text',
					content:
						'1) اكتب معادلة التفكك النووي مبيناً قانوني الانحفاظ المستعملين، وحدّد نمط التفكك.',
					answer:
						'*I.* 1) بتطبيق قانوني صودي لانحفاظ العدد الكتلي ($131 = 131 + A$) والعدد الشحني ($53 = 54 + Z arrow.r.double Z = -1$):\n' +
						ex1BetaEq.typst +
						'\nنمط التفكك هو إشعاع $beta^-$.',
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'2) حدّد بيانياً زمن نصف العمر $t_(1/2)$ لليود 131، ثم احسب ثابت التفكك $lambda$ بـ $"s"^(-1)$. \\\n3) احسب الكتلة الابتدائية $m_0$ لعينة اليود 131 المحقونة عند $t = 0$.',
					answer:
						'2) بيانياً: عند $A = A_0 / 2 = "0,5" times 10^8 "Bq"$ نجد $t_(1/2) = 8 "jours"$. \\\nثابت التفكك: $lambda = frac(ln 2, t_(1/2)) = frac("0,693", 8 times 86400) = "1,00" times 10^(-6) "s"^(-1)$.\n3) لدينا $A_0 = lambda N_0 = lambda frac(m_0, M) N_A arrow.r.double m_0 = frac(A_0 M, lambda N_A) = frac("1,0" times 10^8 times 131, "1,00" times 10^(-6) times "6,02" times 10^(23)) = "2,18" times 10^(-8) "g"$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) بعد كم يوم يصبح نشاط العينة مساوياً لـ $"12,5"%$ من قيمته الابتدائية؟',
					answer:
						'4) $A(t) = "0,125" A_0 = frac(A_0, 8) = frac(A_0, 2^3) arrow.r.double t = 3 t_(1/2) = 3 times 8 = 24 "jours"$.',
					mark: '0.75'
				},
				{
					type: 'text',
					content:
						'*II. الانشطار النووي لليورانيوم 235:*\nنقذف نواة ' +
						nuclide(235, 92, 'U').typst +
						' بنيترون بطيء فتنقسم إلى نواتي ' +
						nuclide(94, 38, 'Sr').typst +
						' و ' +
						nuclide(139, 54, 'Xe').typst +
						' مع انبعاث نيترونات. نعطي طاقات الربط: $E_ell(""^235 "U") = "1783,9" "MeV"$، $E_ell(""^94 "Sr") = "808,4" "MeV"$، $E_ell(""^139 "Xe") = "1156,0" "MeV"$.',
					answer: '',
					mark: ''
				},
				{
					type: 'image',
					src: ex1EnergyDiagramUrl,
					caption: 'الشكل (2): الحصيلة الطاقوية لتفاعل الانشطار النووي',
					width: 340
				},
				{
					type: 'text',
					content:
						'1) اكتب معادلة تفاعل الانشطار محدّداً عدد النيترونات المنبعثة. \\\n2) قارن استقرار النواة ' +
						nuclide(235, 92, 'U').typst +
						' والنواة ' +
						nuclide(94, 38, 'Sr').typst +
						' بحساب طاقة الربط لكل نوية. \\\n3) استعن بمخطط الطاقة (الشكل 2) لحساب الطاقة المحررة $Delta E_"lib"$ لانشطار نواة واحدة من اليورانيوم 235، ثم احسب الطاقة المحررة من انشطار $1 "g"$ منه بالجول ($"J"$).',
					answer:
						'*II.* 1) معادلة الانشطار (بانحفاظ $A$ و $Z$ نجد $3$ نيترونات):\n' +
						ex1FissionEq.typst +
						'\n2) $frac(E_ell(""^235 "U"), 235) = "7,59" "MeV/nucl"$ و $frac(E_ell(""^94 "Sr"), 94) = "8,60" "MeV/nucl"$؛ إذن ' +
						nuclide(94, 38, 'Sr').typst +
						' أكثر استقراراً.\n3) $Delta E_"lib" = E_ell(""^94 "Sr") + E_ell(""^139 "Xe") - E_ell(""^235 "U") = "808,4" + "1156,0" - "1783,9" = "180,5" "MeV"$. \\\nمن أجل $m = 1 "g"$: $N = frac(1, 235) times "6,02" times 10^(23) = "2,56" times 10^(21)$ نواة. \\\n$E_"tot" = N times Delta E_"lib" times "1,6" times 10^(-13) = "2,56" times 10^(21) times "180,5" times "1,6" times 10^(-13) approx "7,40" times 10^(10) "J"$.',
					mark: '3'
				}
			]
		},
		{
			id: 'bac_2024_se_phy_ex2',
			num: 'الثاني',
			customTitle: 'الجزء الأول — التمرين الثاني',
			points: 7,
			instruction:
				'يعالج التمرين دراسة حركتين ميكانيكيتين مستقلتين في معلم غاليلي. نعطي: $G = "6,67" times 10^(-11) "S.I"$، كتلة الأرض $M_T = "5,98" times 10^(24) "kg"$، نصف قطر الأرض $R_T = 6380 "km"$، $g = "9,8" "m" dot "s"^(-2)$.',
			content: [
				{
					type: 'text',
					content:
						'*I. حركة القمر الاصطناعي الجزائري ألسات-2ب (AlSat-2B):* \\\nيدور القمر الاصطناعي ألسات-2ب حول مركز الأرض في مدار دائري على ارتفاع $h = 670 "km"$ من سطحها. \\\n1) عرّف المرجع الجيومركزي وبيّن شروط تطبيقه كمرجع غاليلي. \\\n2) بتطبيق القانون الثاني لنيوتن في معلم فريني، بيّن أن الحركة الدائرية منتظمة ثم جد عبارة السرعة المدارية $v$ بدلالة $G$ و $M_T$ و $R_T$ و $h$.',
					answer:
						'*I.* 1) المرجع الجيومركزي مبدؤه مركز الأرض ومحاوره الثلاثة متجهة نحو ثلاثة نجوم بعيدة وثابتة؛ يُعتبر غاليلياً إذا كانت مدة دراسة حركة القمر الاصطناعي صغيرة جداً مقارنة بدور الأرض حول الشمس ($"365,25" "j"$).\n2) القوة الوحيدة هي قوة الجذب العام $arrow(F)_(T/S) = G frac(M_T m, (R_T + h)^2) arrow(n)$. \\\nبالإسقاط على المماس $arrow(t)$: $a_t = frac(d v, d t) = 0 arrow.r.double v = "cte"$ (حركة دائرية منتظمة). \\\nبالإسقاط على الناظم $arrow(n)$: $frac(v^2, r) = G frac(M_T, r^2) arrow.r.double v = sqrt(frac(G M_T, R_T + h))$ حيث $r = R_T + h$.',
					mark: '1.75'
				},
				{
					type: 'text',
					content:
						'3) احسب قيمة السرعة المدارية $v$ والدور المداري $T$ للقمر ألسات-2ب. \\\n4) برهن القانون الثالث لكبلر: $frac(T^2, r^3) = "cte"$، واحسب قيمة الثابت.',
					answer:
						'3) $r = 6380 + 670 = 7050 "km" = "7,05" times 10^6 "m"$. \\\n$v = sqrt(frac("6,67" times 10^(-11) times "5,98" times 10^(24), "7,05" times 10^6)) approx 7522 "m" dot "s"^(-1)$. \\\n$T = frac(2 pi r, v) = frac(2 pi times "7,05" times 10^6, 7522) approx 5889 "s" approx "98,1" "min"$.\n4) لدينا $T = frac(2 pi r, v) arrow.r.double T^2 = frac(4 pi^2 r^2, v^2) = frac(4 pi^2 r^3, G M_T) arrow.r.double frac(T^2, r^3) = frac(4 pi^2, G M_T) = "cte"$. \\\nالقيمة العددية: $frac(4 pi^2, "6,67" times 10^(-11) times "5,98" times 10^(24)) approx "9,90" times 10^(-14) "s"^2 dot "m"^(-3)$.',
					mark: '1.75'
				},
				{
					type: 'text',
					content:
						'*II. حركة جسم صلب على مستوٍ مائل:* \\\nنترك جسماً صلباً $(S)$ كتلته $m = "0,50" "kg"$ ينزلق دون سرعة ابتدائية من أعلى مستوٍ مائل يميل عن الأفق بزاوية $alpha = 30 degree$ (الشكل 3)، فيخضع لقوة احتكاك ثابتة $arrow(f)$ معاكسة لجهة الحركة. سمحت المتابعة بالتصوير المتعاقب برسم البيان $v^2 = f(x)$ (الشكل 4).',
					answer: '',
					mark: ''
				},
				{
					type: 'columns',
					children: [
						{ type: 'image', src: ex2InclinedUrl, caption: 'الشكل (3): القوى المطبقة على (S)', width: 320 },
						{ type: 'image', src: ex2V2xUrl, caption: 'الشكل (4): البيان v²(x)', width: 330 }
					]
				},
				{
					type: 'text',
					content:
						'1) بتطبيق القانون الثاني لنيوتن، جد عبارة تسارع مركز عطالة الجسم $a$ بدلالة $g$ و $alpha$ و $f$ و $m$، واستنتج طبيعة الحركة. \\\n2) باستغلال محذوفية الزمن والمنحنى $v^2 = f(x)$، حدّد قيمة التسارع $a$ تجريبياً.',
					answer:
						'*II.* 1) الجملة: $(S)$، المرجع: سطحي أرضي غاليلي. القوى: $arrow(P)$، $arrow(R)_N$، $arrow(f)$. \\\nبالإسقاط على محور الحركة: $m g sin alpha - f = m a arrow.r.double a = g sin alpha - frac(f, m) = "cte"$، فالحركة مستقيمة متغيرة بانتظام (متسارعة).\n2) من علاقة محذوفية الزمن ($v_0 = 0$): $v^2 = 2 a x$. \\\nمن البيان: ميل المستقيم يساوي $2 a = frac("12,0", "2,0") = "6,0" "m" dot "s"^(-2) arrow.r.double a = "3,0" "m" dot "s"^(-2)$.',
					mark: '2'
				},
				{
					type: 'text',
					content: '3) استنتج شدة قوة الاحتكاك $f$، ثم احسب شدة رد فعل المستوي $R$.',
					answer:
						'3) من عبارة التسارع: $f = m (g sin alpha - a) = "0,50" times ("9,8" times "0,5" - "3,0") = "0,95" "N"$. \\\nبالإسقاط على الناظم: $R_N = m g cos alpha = "0,50" times "9,8" times cos 30 degree = "4,24" "N"$. \\\nشدة رد الفعل الكلي: $R = sqrt(R_N^2 + f^2) = sqrt("4,24"^2 + "0,95"^2) approx "4,35" "N"$.',
					mark: '1.5'
				}
			]
		},
		{
			id: 'bac_2024_se_phy_ex3',
			num: 'الثالث',
			customTitle: 'الجزء الثاني — التمرين التجريبي',
			points: 7,
			instruction:
				'يهدف التمرين التجريبي إلى تحديد تركيز محلول مائي لحمض البروبانويك ' +
				chemSpecies('C2H5COOH', 'aq').typst +
				' ومعامل التوازن لتفاعل أسترته مع الإيثانول.',
			content: [
				{
					type: 'text',
					content:
						'*I. المعايرة الـ $"pH"$-مترية لحمض البروبانويك:* \\\nلتحضير ومعايرة حجم $V_a = 20 "mL"$ من محلول حمض البروبانويك تركيزه المولي $c_a$، نستعمل محلول هيدروكسيد الصوديوم تركيزه $c_b = "0,10" "mol" dot "L"^(-1)$. \\\n1) اذكر الزجاجيات والأجهزة المستعملة لإجراء المعايرة الـ $"pH"$-مترية بدقة (مع ذكر سعة الماصة العيارية).',
					answer:
						'*I.* 1) الزجاجيات والأجهزة: ماصة عيارية $20 "mL"$ مزودة بإجاصة مص، سحاحة مدرجة $25 "mL"$، بيشر $100 "mL"$، مخلاط مغناطيسي وقضيب ممغنط، وجهاز $"pH"$-متر معاير بمحلولين موقيين.',
					mark: '0.75'
				},
				{
					type: 'columns',
					children: [
						{ type: 'image', src: ex3TitrationSetupUrl, caption: 'الشكل (5): التركيب التجريبي للمعايرة', width: 300 },
						{ type: 'image', src: ex3PhCurveUrl, caption: 'الشكل (6): منحنى المعايرة pH = f(Vb)', width: 340 }
					]
				},
				{
					type: 'text',
					content:
						'2) اكتب معادلة تفاعل المعايرة الحادث. \\\n3) حدّد إحداثيي نقطة التكافؤ $E(V_(b E) ; "pH"_E)$ ثم استنتج التركيز المولي $c_a$ للمحلول الحمضي.',
					answer:
						'2) معادلة تفاعل المعايرة:\n' +
						ex3TitrationEq.typst +
						'\n3) بطريقة المماسات المتوازية على الشكل (6): $V_(b E) = 16 "mL"$ و $"pH"_E = "8,7"$. \\\nعند التكافؤ: $c_a V_a = c_b V_(b E) arrow.r.double c_a = frac("0,10" times 16, 20) = "0,080" "mol" dot "L"^(-1)$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'4) علماً أن $"pH"$ المحلول الحمضي قبل إضافة الأساس هو $"pH"_0 = "3,0"$، احسب نسبة التقدم النهائي $tau_f$ لتفاعل الحمض مع الماء. ماذا تستنتج؟ \\\n5) استنتج من الشكل (6) قيمة $"pK"_A$ للثنائية $("C"_2"H"_5"COOH" / "C"_2"H"_5"COO"^-)$ وحدّد النوع الغالب في المزيج عند $"pH" = "6,0"$.',
					answer:
						'4) $tau_f = frac(["H"_3"O"^+]_f, c_a) = frac(10^(-"pH"_0), c_a) = frac(10^(-"3,0"), "0,080") = "0,0125" = "1,25"% < 1$. \\\nنستنتج أن حمض البروبانويك حمض ضعيف وتفاعله مع الماء محدود.\n5) عند نقطة نصف التكافؤ ($V_b = V_(b E)/2 = 8 "mL"$): $"pK"_A = "pH" = "4,9"$. \\\nعند $"pH" = "6,0" > "pK"_A$: النوع الأساسي المرافق ' +
						chemSpecies('C2H5COO-', 'aq').typst +
						' هو الغالب.',
					mark: '1.75'
				},
				{
					type: 'text',
					content:
						'*II. تفاعل الأسترة ومردوده:* \\\nنمزج في حوجلة $"0,30" "mol"$ من حمض البروبانويك النقي و $"0,30" "mol"$ من الإيثانول النقي مع قطرات من حمض الكبريت المركز ونسخن بالتقطير المرتد. \\\n1) اكتب معادلة تفاعل الأسترة الحادث وسمّ الأستر المتشكل، وما فائدة التقطير المرتد؟ \\\n2) أكمل جدول التقدم التالي، علماً أنه عند التوازن تتبقى كمية $n_f("acide") = "0,10" "mol"$ من الحمض:',
					answer:
						'*II.* 1) معادلة الأسترة:\n' +
						ex3EsterEq.typst +
						'\nاسم الأستر: بروبانوات الإيثيل. فائدة التقطير المرتد: تسريع التفاعل بالتسخين دون ضياع المتفاعلات أو النواتج المتطايرة.\n2) عند التوازن: $"0,30" - x_f = "0,10" arrow.r.double x_f = "0,20" "mol"$.',
					mark: '1.5'
				},
				ex3Ice.typstBlock,
				{
					type: 'text',
					content:
						'3) احسب مردود التفاعل $r$ وثابت التوازن $K$. \\\n4) اقترح طريقتين تجريبيتين لتحسين مردود اصطناع هذا الأستر.',
					answer:
						'3) المردود: $r = frac(x_f, x_"max") times 100% = frac("0,20", "0,30") times 100% = "66,7"%$. \\\nثابت التوازن: $K = frac(x_f^2, ("0,30" - x_f)^2) = frac("0,20"^2, "0,10"^2) = "4,0"$.\n4) طريقتان لتحسين المردود: (أ) استعمال أحد المتفاعلين بوفرة أو نزع الأستر/الماء أثناء التشكل؛ (ب) تعويض الحمض الكربوكسيلي بكلور البروبانويل لجعل التفاعل تاماً ($r approx 100%$).',
					mark: '1.5'
				}
			]
		}
	];

	return buildRecord('2024', exercises);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. دورة جوان 2025 — شعبة علوم تجريبية — الموضوع الأول (ONEC Format)
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2025SePhysics(): OfficialBacPhysicsPaperRecord {
	const ex1TrajUrl = savePhysicsSvgAsset(
		'bac_2025_se_phy_ex1_traj',
		svgProjectileTrajectory({
			angleLabel: 'α = 45°',
			v0Label: 'v₀ = 10 m/s',
			showApex: true,
			width: 350,
			height: 205
		})
	);

	const ex1VyCurveUrl = savePhysicsSvgAsset(
		'bac_2025_se_phy_ex1_vy',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 1.5,
			yMin: -8,
			yMax: 8,
			xStep: 0.3,
			yStep: 2,
			xLabel: 't (s)',
			yLabel: 'vy (m/s)',
			title: 'تطور المركبة الشاقولية للسرعة vy(t)',
			curves: [
				{
					fn: (t) => 7.07 - 10 * t,
					color: '#2563eb',
					label: 'vy(t)'
				}
			],
			points: [
				{ x: 0, y: 7.07, label: 'v0y = 7,07', color: '#dc2626' },
				{ x: 0.707, y: 0, label: 'tS = 0,71 s', color: '#059669' }
			],
			width: 350,
			height: 220
		})
	);

	const ex2SigmaUrl = savePhysicsSvgAsset(
		'bac_2025_se_phy_ex2_sigma',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 24,
			yMin: 0,
			yMax: 3.0,
			xStep: 4,
			yStep: 0.5,
			xLabel: 't (min)',
			yLabel: 'σ (mS/cm)',
			title: 'تطور الناقلية النوعية σ(t) بدلالة الزمن',
			curves: [
				{
					fn: (t) => 0.91 + 1.59 * Math.exp((-t * Math.LN2) / 4.0),
					color: '#2563eb',
					label: 'σ(t)'
				}
			],
			dashedGuides: [
				{ x1: 0, y1: 2.5, x2: 5.77, y2: 0.91, color: '#dc2626', label: '(Δ)', labelPos: 'right' },
				{ x1: 0, y1: 0.91, x2: 24, y2: 0.91, color: '#64748b' },
				{ x1: 0, y1: 1.705, x2: 4.0, y2: 1.705, color: '#059669' },
				{ x1: 4.0, y1: 0, x2: 4.0, y2: 1.705, color: '#059669' }
			],
			points: [
				{ x: 0, y: 2.5, label: 'σ₀ = 2,50', color: '#1d4ed8' },
				{ x: 4.0, y: 1.705, label: 't₁/₂ = 4,0 min', color: '#059669' }
			],
			width: 375,
			height: 235
		})
	);

	const ex3RlCircuitUrl = savePhysicsSvgAsset(
		'bac_2025_se_phy_ex3_rl_circuit',
		svgCircuitDiagram({
			kind: 'rl',
			labels: { e: 'E = 12 V', r: 'R = 90 Ω', l: '(L, r)', switchLabel: 'K' },
			width: 340,
			height: 195
		})
	);

	const ex3UrCurveUrl = savePhysicsSvgAsset(
		'bac_2025_se_phy_ex3_ur',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 25,
			yMin: 0,
			yMax: 12,
			xStep: 5,
			yStep: 2,
			xLabel: 't (ms)',
			yLabel: 'uR (V)',
			title: 'منحنى تطور التوتر uR(t) بين طرفي الناقل الأومي',
			curves: [
				{
					fn: (t) => 10.8 * (1 - Math.exp(-t / 5.0)),
					color: '#2563eb',
					label: 'uR(t)'
				}
			],
			dashedGuides: [
				{ x1: 0, y1: 10.8, x2: 25, y2: 10.8, color: '#64748b' },
				{ x1: 0, y1: 0, x2: 5.0, y2: 10.8, color: '#dc2626', label: '(Δ)', labelPos: 'left' },
				{ x1: 5.0, y1: 0, x2: 5.0, y2: 10.8, color: '#dc2626' }
			],
			points: [
				{ x: 5.0, y: 10.8, label: 'τ = 5,0 ms', color: '#dc2626' },
				{ x: 0, y: 10.8, label: 'UR,max = 10,8 V', color: '#1d4ed8' }
			],
			width: 375,
			height: 235
		})
	);

	const ex2SapEq = chemEquation(
		[
			{ formula: 'CH3COOC2H5', state: 'aq' },
			{ formula: 'HO-', state: 'aq' }
		],
		[
			{ formula: 'CH3COO-', state: 'aq' },
			{ formula: 'C2H5OH', state: 'aq' }
		],
		{ display: true }
	);

	const ex2Ice = buildIceTable({
		equation: ex2SapEq,
		speciesHeaders: [
			chemSpecies('CH3COOC2H5', 'aq'),
			chemSpecies('HO-', 'aq'),
			chemSpecies('CH3COO-', 'aq'),
			chemSpecies('C2H5OH', 'aq')
		],
		initial: [
			{ katex: 'n_0', typst: '$n_0$' },
			{ katex: 'n_0', typst: '$n_0$' },
			{ katex: '0', typst: '$0$' },
			{ katex: '0', typst: '$0$' }
		],
		intermediate: [
			{ katex: 'n_0-x', typst: '$n_0 - x$' },
			{ katex: 'n_0-x', typst: '$n_0 - x$' },
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
			{ katex: '0', typst: '$n_0 - x_f = 0$' },
			{ katex: '0', typst: '$n_0 - x_f = 0$' },
			{ katex: 'x_f = n_0', typst: '$x_f = n_0$' },
			{ katex: 'x_f = n_0', typst: '$x_f = n_0$' }
		]
	});

	const exercises: ExerciseBlock[] = [
		{
			id: 'bac_2025_se_phy_ex1',
			num: 'الأول',
			customTitle: 'الجزء الأول — التمرين الأول',
			points: 6,
			instruction:
				'في حصة رياضية، يقذف لاعب كرة كتلتها $m = "0,60" "kg"$ من ارتفاع $h_0 = "2,0" "m"$ عن سطح الأرض بسرعة ابتدائية $v_0 = 10 "m" dot "s"^(-1)$ يصنع حاملها زاوية $alpha = 45 degree$ مع الأفق. ندرس حركة مركز عطالة الكرة في معلم متعامد ومتجانس $(O ; arrow(i), arrow(j))$ مرتبط بالأرض ونعتبره غاليلياً، بإهمال تأثير الهواء. نعطي: $g = 10 "m" dot "s"^(-2)$.',
			content: [
				{
					type: 'columns',
					children: [
						{ type: 'image', src: ex1TrajUrl, caption: 'الشكل (1): مسار القذيفة في المعلم (O, i, j)', width: 320 },
						{ type: 'image', src: ex1VyCurveUrl, caption: 'الشكل (2): مخطط المركبة vy(t)', width: 320 }
					]
				},
				{
					type: 'text',
					content:
						'1) اكتب مركبتي شعاعي الموضع الابتدائي $arrow(O M)_0$ والسرعة الابتدائية $arrow(v)_0$ عند $t = 0$. \\\n2) بتطبيق القانون الثاني لنيوتن، جد المعادلتين الزمنيتين للسرعة $v_x(t)$ و $v_y(t)$ ثم المعادلتين الزمنيتين للموضع $x(t)$ و $y(t)$.',
					answer:
						'1) عند $t = 0$: $x_0 = 0$، $y_0 = "2,0" "m"$؛ $v_(0 x) = v_0 cos alpha = 10 cos 45 degree approx "7,07" "m" dot "s"^(-1)$، $v_(0 y) = v_0 sin alpha approx "7,07" "m" dot "s"^(-1)$.\n2) بتطبيق القانون الثاني لنيوتن: $arrow(P) = m arrow(a)_G arrow.r.double a_x = 0$ و $a_y = -g = -10 "m" dot "s"^(-2)$. \\\nبالتكامل نجد: $v_x(t) = v_0 cos alpha = "7,07" "m" dot "s"^(-1)$ و $v_y(t) = -g t + v_0 sin alpha = -10 t + "7,07"$. \\\nوبتكامل ثانٍ: $x(t) = (v_0 cos alpha) t = "7,07" t$ و $y(t) = -frac(1, 2) g t^2 + (v_0 sin alpha) t + h_0 = -5 t^2 + "7,07" t + "2,0"$.',
					mark: '2'
				},
				{
					type: 'text',
					content:
						'3) استنتج معادلة المسار $y(x)$ مبيناً أن القيم العددية تجعلها تكتب: $y(x) = -"0,1" x^2 + x + "2,0"$. \\\n4) استخرج من الشكل (2) لحظة بلوغ الذروة $t_S$ ثم احسب إحداثيي الذروة $S(x_S ; y_S)$.',
					answer:
						'3) من $x(t)$ لدينا $t = frac(x, v_0 cos alpha)$، بالتعويض في $y(t)$:\n$y(x) = -frac(g, 2 v_0^2 cos^2 alpha) x^2 + (tan alpha) x + h_0 = -frac(10, 2 times 100 times "0,5") x^2 + x + "2,0" = -"0,1" x^2 + x + "2,0"$.\n4) عند الذروة $v_y(t_S) = 0$ ومن الشكل (2) نجد $t_S approx "0,71" "s"$. \\\nالإحداثيات: $x_S = "7,07" times "0,707" = "5,0" "m"$، و $y_S = -"0,1"("5,0")^2 + "5,0" + "2,0" = "4,5" "m"$.',
					mark: '2'
				},
				{
					type: 'text',
					content:
						'5) أحسب سرعة الكرة لحظة بلوغها ارتفاعاً يساوي $y = "2,0" "m"$ في طريق النزول، ثم احسب المدى الأفقي $x_P$ عند اصطدامها بسطح الأرض ($y_P = 0$).',
					answer:
						'5) حسب انحفاظ الطاقة الميكانيكية (أو من التناظر حول الذروة)، عند العودة إلى نفس الارتفاع $y = h_0 = "2,0" "m"$ تكون قيمة السرعة $v = v_0 = 10 "m" dot "s"^(-1)$. \\\nعند سطح الأرض $y_P = 0$: $-"0,1" x_P^2 + x_P + "2,0" = 0 arrow.r.double x_P^2 - 10 x_P - 20 = 0$. \\\nالمميز $Delta = 100 + 80 = 180$، والحل الموجب: $x_P = frac(10 + sqrt(180), 2) approx "11,71" "m"$.',
					mark: '2'
				}
			]
		},
		{
			id: 'bac_2025_se_phy_ex2',
			num: 'الثاني',
			customTitle: 'الجزء الأول — التمرين الثاني',
			points: 7,
			instruction:
				'لتصبن إيثانوات الإيثيل ' +
				chemSpecies('CH3COOC2H5', 'aq').typst +
				' بواسطة محلول هيدروكسيد الصوديوم، نمزج عند درجة حرارة ثابتة حجماً $V = 200 "mL"$ يحتوي على $n_0 = "2,0" "mmol"$ من إيثانوات الإيثيل و $n_0 = "2,0" "mmol"$ من شوارد ' +
				chemSpecies('HO-', 'aq').typst +
				'. نتابع التفاعل عن طريق قياس الناقلية النوعية $sigma(t)$ (الشكل 3). \\\nنعطي الناقليات المولية الشاردية: $lambda_("Na"^+) = "5,0" "mS" dot "m"^2 dot "mol"^(-1)$، $lambda_("HO"^-) = "20,0" "mS" dot "m"^2 dot "mol"^(-1)$، $lambda_("CH"_3"COO"^-) = "4,1" "mS" dot "m"^2 dot "mol"^(-1)$.',
			content: [
				{
					type: 'image',
					src: ex2SigmaUrl,
					caption: 'الشكل (3): تطور الناقلية النوعية σ(t) بدلالة الزمن',
					width: 360
				},
				{
					type: 'text',
					content:
						'1) اكتب معادلة التفاعل الكيميائي التام المنمذج لهذا التحول. \\\n2) فسّر مجهرياً تناقص الناقلية النوعية $sigma(t)$ مع مرور الزمن. \\\n3) أكمل جدول التقدم التالي لهذا التفاعل:',
					answer:
						'1) معادلة التفاعل:\n' +
						ex2SapEq.typst +
						'\n2) تتناقص الناقلية النوعية $sigma(t)$ لأن شوارد ' +
						chemSpecies('HO-', 'aq').typst +
						' ذات الناقلية المولية الشاردية الكبيرة ($"20,0"$) تُستهلك وتُعوَّض بشوارد ' +
						chemSpecies('CH3COO-', 'aq').typst +
						' ذات الناقلية الأصغر ($"4,1"$).',
					mark: '1.75'
				},
				ex2Ice.typstBlock,
				{
					type: 'text',
					content:
						'4) عبّر عن الناقلية النوعية $sigma(t)$ بدلالة التقدم $x(t)$ والناقليات المولية الشاردية، ثم استنتج العلاقة العددية $sigma(t) = "2,50" - 795 dot x(t)$ (حيث $sigma$ بـ $"mS" dot "cm"^(-1)$ و $x$ بـ $"mol"$).',
					answer:
						'4) بتطبيق قانون كولروش ($V = "2,0" times 10^(-4) "m"^3$): \\\n$sigma(t) = lambda_("Na"^+) frac(n_0, V) + lambda_("HO"^-) frac(n_0 - x, V) + lambda_("CH"_3"COO"^-) frac(x, V) = (lambda_("Na"^+) + lambda_("HO"^-) ) frac(n_0, V) - frac(lambda_("HO"^-) - lambda_("CH"_3"COO"^-), V) x(t)$. \\\nبالتعويض العددي (بالتحويل من $"mS" dot "m"^(-1)$ إلى $"mS" dot "cm"^(-1)$ بالقسمة على $100$): \\\n$sigma_0 = frac("25,0" times "2,0" times 10^(-3), "2,0" times 10^(-4) times 100) = "2,50" "mS" dot "cm"^(-1)$، والمعامل $frac("20,0" - "4,1", "2,0" times 10^(-4) times 100) = 795$. ومنه $sigma(t) = "2,50" - 795 dot x(t)$.',
					mark: '2'
				},
				{
					type: 'text',
					content:
						'5) عيّن بيانياً قيمة زمن نصف التفاعل $t_(1/2)$، مبرراً طريقة التعيين. \\\n6) أثبت عبارة السرعة الحجمية للتفاعل بدلالة $frac(d sigma, d t)$ ثم احسب قيمتها عند $t = 0$ بـ $"mol" dot "L"^(-1) dot "min"^(-1)$. \\\n7) كيف يتغير $t_(1/2)$ عند رفع درجة حرارة الوسط التفاعلي؟ فسّر ذلك مجهرياً.',
					answer:
						'5) عند $t = t_(1/2)$ يكون $x = x_f / 2 arrow.r.double sigma(t_(1/2)) = frac(sigma_0 + sigma_f, 2) = frac("2,50" + "0,91", 2) = "1,705" "mS" dot "cm"^(-1)$. بالإسقاط نجد $t_(1/2) = "4,0" "min"$.\n6) باشتقاق $sigma(t) = "2,50" - 795 x(t)$: $frac(d x, d t) = -frac(1, 795) frac(d sigma, d t) arrow.r.double v_"vol" = -frac(1, 795 V) frac(d sigma, d t)$. \\\nميل المماس $(Delta)$ عند $t = 0$: $lr(|frac(d sigma, d t)|)_0 = frac("0,91" - "2,50", "5,77" - 0) = -"0,275" "mS" dot "cm"^(-1) dot "min"^(-1)$. \\\nإذن: $v_"vol"(0) = -frac(-"0,275", 795 times "0,200") approx "1,73" times 10^(-3) "mol" dot "L"^(-1) dot "min"^(-1)$.\n7) برفع درجة الحرارة يتناقص $t_(1/2)$ لأن زيادة الطاقة الحركية للجزيئات ترفع تواتر التصادمات الفعالة فتزداد سرعة التفاعل.',
					mark: '3.25'
				}
			]
		},
		{
			id: 'bac_2025_se_phy_ex3',
			num: 'الثالث',
			customTitle: 'الجزء الثاني — التمرين التجريبي',
			points: 7,
			instruction:
				'لغرض تعيين المميزات $(L, r)$ لوشيعة تحريضية، أنجز فوج من التلاميذ التركيب التجريبي الموضح في الشكل (4)، والمكون من: مولد مثالي للتوتر قوته المحركة الكهربائية $E = 12 "V"$، ناقل أومي مقاومته $R = 90 Omega$، وشيعة $(L, r)$، وقاطعة $K$. نغلق القاطعة عند $t = 0$ ونسجل التوتر $u_R(t)$ بواسطة برمجية $E x A O$ فنتحصل على البيان الممثل في الشكل (5).',
			content: [
				{
					type: 'columns',
					children: [
						{ type: 'image', src: ex3RlCircuitUrl, caption: 'الشكل (4): الدارة الكهربائية RL', width: 310 },
						{ type: 'image', src: ex3UrCurveUrl, caption: 'الشكل (5): تطور التوتر uR(t)', width: 340 }
					]
				},
				{
					type: 'text',
					content:
						'1) كيف يمكن عملياً عبر لاقطي التوتر في نظام $E x A O$ متابعة التطور اللحظي لكل من $u_R(t)$ وشدة التيار $i(t)$؟ وما الاحتياط الواجب اتخاذه عند فتح الدارة لحماية التجهيز من الشرارة الكهربائية؟',
					answer:
						'1) نربط لاقط التوتر بين طرفي الناقل الأومي لمعاينة $u_R(t)$، وبما أن $i(t) = u_R(t)/R$ فإن تغيرات $i(t)$ مماثلة لتغيرات $u_R(t)$، ونبرمج الحاسوب لقسمة القيم على $R$. \\\nعند فتح الدارة، نركّب صماماً ثنائياً (للتفريغ الحر) على التفرع مع الوشيعة لتفادي فرط التوتر وظهور الشرارة الكهربائية.',
					mark: '1.25'
				},
				{
					type: 'text',
					content:
						'2) بتطبيق قانون جمع التوترات، جد المعادلة التفاضلية التي تحقّقها شدة التيار $i(t)$، ثم استنتج المعادلة التفاضلية التي يحقّقها التوتر $u_R(t)$.',
					answer:
						'2) قانون جمع التوترات: $u_b(t) + u_R(t) = E arrow.r.double L frac(d i, d t) + (R + r) i(t) = E arrow.r.double frac(d i, d t) + frac(R + r, L) i(t) = frac(E, L)$. \\\nبضرب طرفي المعادلة في $R$ (حيث $u_R = R i$): $frac(d u_R, d t) + frac(R + r, L) u_R(t) = frac(R E, L)$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3) حل المعادلة التفاضلية يكتب بالشكل $u_R(t) = U_(R,"max")(1 - e^(-t / tau))$. جد عبارة كل من $U_(R,"max")$ وثابت الزمن $tau$. \\\n4) استخرج من الشكل (5) قيمة $U_(R,"max")$ وقيمة ثابت الزمن $tau$، ثم استنتج الشدة العظمى $I_p$ في النظام الدائم.',
					answer:
						'3) باشتقاق الحل والتعويض في المعادلة التفاضلية نجد: $tau = frac(L, R + r)$ و $U_(R,"max") = frac(R E, R + r)$.\n4) من الشكل (5): $U_(R,"max") = "10,8" "V"$، وبتقاطع المماس $(Delta)$ عند $t = 0$ مع الخط المقارب الأفقي نجد $tau = "5,0" "ms"$. \\\nشدة التيار في النظام الدائم: $I_p = frac(U_(R,"max"), R) = frac("10,8", 90) = "0,12" "A"$.',
					mark: '1.75'
				},
				{
					type: 'text',
					content:
						'5) احسب المقاومة الداخلية $r$ للوشيعة وذاتيتها $L$. \\\n6) احسب قيمة التوتر $u_b$ بين طرفي الوشيعة في النظام الدائم، ثم احسب الطاقة المغناطيسية المخزنة فيها عندئذ.',
					answer:
						'5) في النظام الدائم: $I_p = frac(E, R + r) arrow.r.double R + r = frac(12, "0,12") = 100 Omega arrow.r.double r = 100 - 90 = 10 Omega$. \\\nمن ثابت الزمن: $L = tau (R + r) = "5,0" times 10^(-3) times 100 = "0,50" "H"$.\n6) في النظام الدائم $frac(d i, d t) = 0$، ومنه $u_b = r I_p = 10 times "0,12" = "1,2" "V"$. \\\nالطاقة المغناطيسية المخزنة: $E_L = frac(1, 2) L I_p^2 = frac(1, 2) times "0,50" times ("0,12")^2 = "3,6" times 10^(-3) "J" = "3,6" "mJ"$.',
					mark: '2.5'
				}
			]
		}
	];

	return buildRecord('2025', exercises);
}

export function buildOfficialPhysicsBac3asSe(): OfficialBacPhysicsPaperRecord[] {
	return [buildBac2023SePhysics(), buildBac2024SePhysics(), buildBac2025SePhysics()];
}
