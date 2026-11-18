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
	svgTitrationSetup
} from '../../modules/PhysicsTemplates/svg-physics';
import type { OfficialBacPhysicsPaperRecord } from './types';

function buildMetadata(year: '2023' | '2024' | '2025', topicNumber: 1 | 2 = 1): ExamMetadata {
	return {
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي',
		streamId: 'TM',
		streamName: 'تقني رياضي',
		subjectId: 'PHY-MTM',
		subjectName: 'العلوم الفيزيائية',
		trimesterId: 't3',
		trimesterName: 'دورة بكالوريا رسمية',
		docType: 'exam',
		academicYear: year,
		duration: '04 ساعات و30 دقيقة',
		coefficient: 5,
		examSessionAr: 'دورة جوان ' + year,
		topicNumber,
		customDocTitle: 'امتحان بكالوريا التعليم الثانوي (موضوع رسمي مُعاد تنسيقه)',
		siteUrl: 'https://sujetstore.com'
	};
}

function buildRecord(
	year: '2023' | '2024' | '2025',
	exercises: ExerciseBlock[],
	topicNumber: 1 | 2 = 1
): OfficialBacPhysicsPaperRecord {
	const examDoc: ExamDocument = {
		metadata: buildMetadata(year, topicNumber),
		exercises
	};

	return {
		slug: `bac-${year}-3as-tm-physics`,
		grade: '3as_tm',
		yearSubjectId: 726,
		streamId: 'TM',
		streamNameAr: 'تقني رياضي',
		academicYear: year,
		sessionAr: 'دورة جوان ' + year,
		coefficient: 5,
		duration: '04 ساعات و30 دقيقة',
		titleAr: `بكالوريا رسمية في العلوم الفيزيائية — شعبة تقني رياضي (دورة جوان ${year} - ${topicNumber === 2 ? 'الموضوع الثاني' : 'الموضوع الأول'})`,
		sourcePdfRelPath: `pipeline/references_physics/3as/bac_official/bac_${year}_math_tm_physics_subject.pdf`,
		sourceSolutionPdfRelPath: `pipeline/references_physics/3as/bac_official/bac_${year}_math_tm_physics_correction.pdf`,
		examDoc
	};
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. دورة جوان 2023 — شعبة تقني رياضي — الموضوع الثاني (ONEC 2023 MTM)
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2023TmPhysics(): OfficialBacPhysicsPaperRecord {
	const ex1AstonUrl = savePhysicsSvgAsset(
		'bac_2023_tm_phy_ex1_aston',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 240,
			yMin: -10,
			yMax: 0,
			xStep: 40,
			yStep: 2,
			xLabel: 'A',
			yLabel: '-El/A (MeV/nucl)',
			title: 'منحنى أستون (-El/A) بدلالة عدد النويات A',
			curves: [
				{
					fn: (A) => {
						if (A < 1) return 0;
						if (A <= 4) return -7.07 * Math.pow((A - 1) / 3, 1.45);
						if (A <= 56) return -7.07 - 1.72 * Math.sin(((A - 4) / 52) * (Math.PI / 2));
						return -8.79 + 1.25 * Math.pow((A - 56) / 184, 1.3);
					},
					color: '#2563eb'
				}
			],
			points: [
				{ x: 2, y: -1.11, label: '²H (-1,11)', color: '#dc2626' },
				{ x: 3, y: -2.82, label: '³H (-2,82)', color: '#d97706' },
				{ x: 4, y: -7.07, label: '⁴He (-7,07)', color: '#059669' },
				{ x: 56, y: -8.79, label: '⁵⁶Fe', color: '#475569' }
			],
			width: 375,
			height: 235
		})
	);

	const ex2FallSubjUrl = savePhysicsSvgAsset(
		'bac_2023_tm_phy_ex2_vt_subj',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 12,
			yMin: 0,
			yMax: 60,
			xStep: 2,
			yStep: 10,
			xLabel: 't (s)',
			yLabel: 'v (m/s)',
			title: 'المرحلة الأولى: تطور السرعة v(t) قبل فتح المظلة',
			curves: [
				{
					fn: (t) => 52.9 * Math.tanh((9.8 * t) / 52.9),
					color: '#2563eb',
					label: 'v(t)'
				}
			],
			points: [{ x: 12, y: 52.0, label: '(12 ; 52)', color: '#dc2626' }],
			width: 360,
			height: 225
		})
	);

	const ex2FallSolUrl = savePhysicsSvgAsset(
		'bac_2023_tm_phy_ex2_vt_sol',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 20,
			yMin: 0,
			yMax: 60,
			xStep: 4,
			yStep: 10,
			xLabel: 't (s)',
			yLabel: 'v (m/s)',
			title: 'التطور الكيفي للسرعة v(t) لكامل السقوط',
			curves: [
				{
					fn: (t) => {
						if (t <= 12) return 52.9 * Math.tanh((9.8 * t) / 52.9);
						return 4.5 + (52.0 - 4.5) * Math.exp(-(t - 12) / 1.1);
					},
					color: '#059669',
					label: 'v(t)'
				}
			],
			dashedGuides: [
				{ x1: 12, y1: 0, x2: 12, y2: 52.0, color: '#dc2626' },
				{ x1: 0, y1: 4.5, x2: 20, y2: 4.5, color: '#64748b' }
			],
			points: [
				{ x: 12, y: 52.0, label: 'فتح المظلة', color: '#dc2626' },
				{ x: 16, y: 4.5, label: "v'lim = 4,5", color: '#059669' }
			],
			width: 350,
			height: 215
		})
	);

	const ex3RcCircuitUrl = savePhysicsSvgAsset(
		'bac_2023_tm_phy_ex3_circuit',
		svgCircuitDiagram({
			kind: 'rc',
			labels: { e: 'E', r: 'R₀ = 10 Ω', c: 'AB (C أو L,r)', switchLabel: 'K' },
			width: 330,
			height: 190
		})
	);

	const ex3CurvesUrl = savePhysicsSvgAsset(
		'bac_2023_tm_phy_ex3_ur0',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 0.06,
			yMin: 0,
			yMax: 12,
			xStep: 0.01,
			yStep: 2,
			xLabel: 't (s)',
			yLabel: 'uR0 (V)',
			title: 'منحنى تغيرات التوتر uR0(t) في الدارتين (a) و (b)',
			curves: [
				{
					fn: (t) => 10 * Math.exp(-t / 0.01),
					color: '#2563eb',
					label: '(a)'
				},
				{
					fn: (t) => 5 * (1 - Math.exp(-t / 0.01)),
					color: '#dc2626',
					label: '(b)'
				}
			],
			dashedGuides: [
				{ x1: 0, y1: 10, x2: 0.01, y2: 0, color: '#2563eb' },
				{ x1: 0, y1: 0, x2: 0.01, y2: 5, color: '#dc2626' },
				{ x1: 0, y1: 5, x2: 0.06, y2: 5, color: '#64748b' }
			],
			points: [
				{ x: 0.01, y: 0, label: 'τ = 0,01 s', color: '#2563eb' },
				{ x: 0.01, y: 5, label: '(0,01 ; 5)', color: '#dc2626' }
			],
			width: 375,
			height: 230
		})
	);

	const ex4TitrationSetupUrl = savePhysicsSvgAsset(
		'bac_2023_tm_phy_ex4_setup',
		svgTitrationSetup({
			titrantLabel: 'NaOH (cb = 2×10⁻² mol/L)',
			analyteLabel: 'حمض S₁ (V₁ = 10 mL)',
			sensorLabel: 'مسبار pH-متر',
			width: 310,
			height: 215
		})
	);

	const ex4PhCurveUrl = savePhysicsSvgAsset(
		'bac_2023_tm_phy_ex4_ph',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 20,
			yMin: 0,
			yMax: 14,
			xStep: 4,
			yStep: 2,
			xLabel: 'Vb (mL)',
			yLabel: 'pH',
			title: 'منحنى المعايرة الـ pH-مترية للمحلول S₁',
			curves: [
				{
					fn: (vb) => {
						if (vb <= 0.1) return 3.2;
						if (vb < 11.8) return 4.8 + Math.log10(vb / (12 - vb));
						if (vb <= 12.2) return 8.4;
						return 12 + Math.log10((vb - 12) / (10 + vb));
					},
					color: '#7c3aed',
					label: 'pH(Vb)'
				}
			],
			dashedGuides: [
				{ x1: 0, y1: 4.8, x2: 6, y2: 4.8, color: '#059669' },
				{ x1: 6, y1: 0, x2: 6, y2: 4.8, color: '#059669' },
				{ x1: 0, y1: 8.4, x2: 12, y2: 8.4, color: '#dc2626' },
				{ x1: 12, y1: 0, x2: 12, y2: 8.4, color: '#dc2626' }
			],
			points: [
				{ x: 6, y: 4.8, label: 'pKA = 4,8', color: '#059669' },
				{ x: 12, y: 8.4, label: 'E(12 ; 8,4)', color: '#dc2626' }
			],
			width: 365,
			height: 230
		})
	);

	const ex1FusionEq = nuclearEquation(
		[
			{ A: 2, Z: 1, symbol: 'H' },
			{ A: 3, Z: 1, symbol: 'H' }
		],
		[
			{ A: 4, Z: 2, symbol: 'He' },
			{ A: 1, Z: 0, symbol: 'n' }
		],
		{ display: true }
	);

	const ex4TitrationEq = chemEquation(
		[
			{ formula: 'C3H7COOH', state: 'aq' },
			{ formula: 'HO-', state: 'aq' }
		],
		[
			{ formula: 'C3H7COO-', state: 'aq' },
			{ formula: 'H2O', state: 'l' }
		],
		{ display: true }
	);

	const ex4EsterEq = chemEquation(
		[
			{ formula: 'C3H7COOH', state: 'l' },
			{ formula: 'R-OH', state: 'l' }
		],
		[
			{ formula: 'C3H7COOR', state: 'l' },
			{ formula: 'H2O', state: 'l' }
		],
		{ reversible: true, display: true }
	);

	const ex4Ice = buildIceTable({
		equation: ex4EsterEq,
		speciesHeaders: [
			chemSpecies('C3H7COOH', 'l'),
			chemSpecies('R-OH', 'l'),
			chemSpecies('C3H7COOR', 'l'),
			chemSpecies('H2O', 'l')
		],
		initial: [
			{ katex: '0,1', typst: '$"0,1"$' },
			{ katex: '0,1', typst: '$"0,1"$' },
			{ katex: '0', typst: '$0$' },
			{ katex: '0', typst: '$0$' }
		],
		intermediate: [
			{ katex: '0,1-x', typst: '$"0,1" - x$' },
			{ katex: '0,1-x', typst: '$"0,1" - x$' },
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
			{ katex: '0,1-x_f', typst: '$"0,1" - x_f$' },
			{ katex: '0,1-x_f', typst: '$"0,1" - x_f$' },
			{ katex: 'x_f', typst: '$x_f$' },
			{ katex: 'x_f', typst: '$x_f$' }
		]
	});

	const exercises: ExerciseBlock[] = [
		{
			id: 'bac_2023_tm_phy_ex1',
			num: 'الأول',
			customTitle: 'الجزء الأول — التمرين الأول',
			points: 4,
			instruction:
				'يهدف التمرين إلى دراسة تفاعل الاندماج النووي بين نظيري الهيدروجين: الديتيريوم ' +
				nuclide(2, 1, 'H').typst +
				' والتريتيوم ' +
				nuclide(3, 1, 'H').typst +
				'، الذي ينتج عنه نواة الهيليوم ' +
				nuclide(4, 2, 'He').typst +
				' وانبعاث جسيم مع تحرير طاقة. نعطي: $1 "u" c^2 = "931,5" "MeV"$، $1 "u" = "1,66" times 10^(-27) "kg"$.',
			content: [
				{
					type: 'text',
					content:
						'1) 1.1. أعط تركيب نواتي الديتيريوم والتريتيوم، ولماذا ندعوهما بنظيري عنصر الهيدروجين؟ \\\n2.1. اكتب معادلة تفاعل الاندماج النووي الحادث مذكراً بالقوانين المستعملة، وما اسم الجسيم المنبعث؟ \\\n3.1. اشرح لماذا يتطلب الاندماج النووي درجة حرارة عالية وضغطاً كبيراً.',
					answer:
						'1) 1.1. نواة الديتيريوم ' +
						nuclide(2, 1, 'H').typst +
						': $Z = 1$ بروتون و $N = 1$ نيترون؛ نواة التريتيوم ' +
						nuclide(3, 1, 'H').typst +
						': $Z = 1$ بروتون و $N = 2$ نيترون. يُدعيان بنظيرين لأن لهما نفس العدد الذري $Z$ ويختلفان في العدد الكتلي $A$.\n2.1. بتطبيق قانوني انحفاظ صودي ($2 + 3 = 4 + A arrow.r.double A = 1$ و $1 + 1 = 2 + Z arrow.r.double Z = 0$):\n' +
						ex1FusionEq.typst +
						'\nالجسيم المنبعث هو *نيترون*.\n3.1. يتطلب الاندماج حرارة عالية وضغطاً كبيراً للتغلب على قوى التنافر الكهربائي (الكولومي) بين النواتين الموجبتين.',
					mark: '1.5'
				},
				{
					type: 'image',
					src: ex1AstonUrl,
					caption: 'الشكل (1): منحنى أستون (-El / A) بدلالة A',
					width: 360
				},
				{
					type: 'text',
					content:
						'2) 1.2. ما اسم المنحنى الموضح في الشكل (1) وما الفائدة منه؟ \\\n2.2. عرّف تفاعل الاندماج النووي. \\\n3.2. رتّب تصاعدياً الأنوية الموضحة في المنحنى ($""_1^1"H"$، $""_1^2"H"$، $""_1^3"H"$، $""_2^4"He"$) من حيث استقرارها مع التعليل.',
					answer:
						'2) 1.2. يُسمى المنحنى *منحنى أستون*. الفائدة منه: تحديد طاقة الربط لكل نوية لمختلف الأنوية، وتحديد منطقة الاستقرار ومنطقتي الانشطار والاندماج.\n2.2. الاندماج النووي هو تحول نووي مفتعل تتحد فيه نواتان خفيفتان لتكوين نواة أثقل وأكثر استقراراً مع تحرير طاقة كبيرة.\n3.2. الترتيب التصاعدي للاستقرار: ' +
						nuclide(1, 1, 'H').typst +
						' $<$ ' +
						nuclide(2, 1, 'H').typst +
						' $<$ ' +
						nuclide(3, 1, 'H').typst +
						' $<$ ' +
						nuclide(4, 2, 'He').typst +
						'؛ لأن $frac(E_ell(""^1"H"), 1) < frac(E_ell(""^2"H"), 2) < frac(E_ell(""^3"H"), 3) < frac(E_ell(""^4"He"), 4)$ وكلما كبرت طاقة الربط لكل نوية زاد استقرار النواة.',
					mark: '1.25'
				},
				{
					type: 'text',
					content:
						'3) 1.3. اكتب علاقة التكافؤ كتلة–طاقة لأينشتاين. \\\n2.3. تحقق من الشكل (1) أن الطاقة المحررة من تفاعل الاندماج السابق تساوي $"17,6" "MeV"$. \\\n3.3. استنتج قيمة النقص الكتلي $Delta m$ بوحدة الغرام ($"g"$).',
					answer:
						'3) 1.3. علاقة أينشتاين: $E = m dot c^2$.\n2.3. $E_"lib" = E_ell(""^4"He") - E_ell(""^2"H") - E_ell(""^3"H") = ("7,07" times 4) - ("1,11" times 2) - ("2,82" times 3) = "28,28" - "2,22" - "8,46" = "17,6" "MeV"$.\n3.3. $Delta m("u") = frac(E_"lib", "931,5") = frac("17,6", "931,5") "u" arrow.r.double Delta m = frac("17,6" times "1,66" times 10^(-24), "931,5") approx "3,14" times 10^(-26) "g"$.',
					mark: '1.25'
				}
			]
		},
		{
			id: 'bac_2023_tm_phy_ex2',
			num: 'الثاني',
			customTitle: 'الجزء الأول — التمرين الثاني',
			points: 4,
			instruction:
				'يسقط مظلي مصحوباً بلوازمه (الجملة $S$ كتلتها $m = 80 "kg"$ ومركز عطالتها $G$) بدون سرعة ابتدائية من مروحية متوقفة على ارتفاع $h = 1000 "m"$ من سطح الأرض. ندرس الحركة في معلم شاقولي $(O, arrow(k))$ غاليلي موجه نحو الأسفل. نعطي: $g = "9,8" "m" dot "s"^(-2)$، ونهمل دافعة أرخميدس.',
			content: [
				{
					type: 'text',
					content:
						'*بفرض إهمال مقاومة الهواء $arrow(f)$ أمام الثقل $arrow(P)$:* \\\n1) ماذا نسمّي هذا السقوط؟ \\\n2) بتطبيق القانون الثاني لنيوتن، حدّد طبيعة حركة مركز عطالة الجملة $S$. \\\n3) احسب سرعة مركز العطالة لحظة الاصطدام بسطح الأرض بوحدة $"km" dot "h"^(-1)$، وعلّق على القيمة.',
					answer:
						'1) يُسمى هذا السقوط *سقوطاً حراً* لأن الجملة تخضع لثقلها $arrow(P)$ فقط.\n2) بتطبيق القانون الثاني لنيوتن: $arrow(P) = m arrow(a)_G arrow.r.double m g = m a_G arrow.r.double a_G = g = "cte"$. المسار مستقيم والتسارع ثابت وموجب، فالحركة مستقيمة متسارعة بانتظام.\n3) $v^2 - v_0^2 = 2 g h arrow.r.double v = sqrt(2 times "9,8" times 1000) = 140 "m" dot "s"^(-1) = 504 "km" dot "h"^(-1)$. \\\nالتعليق: هي سرعة كبيرة جداً وخطيرة على المظلي عند اصطدامه بالأرض لولا مقاومة الهواء وفتح المظلة.',
					mark: '1.5'
				},
				{
					type: 'image',
					src: ex2FallSubjUrl,
					caption: 'الشكل (2): تغيرات سرعة المظلي v(t) قبل فتح المظلة',
					width: 350
				},
				{
					type: 'text',
					content:
						'*I. المرحلة الأولى (مقاومة الهواء $f = k v^2$ حيث $k = "0,28" "kg" dot "m"^(-1)$):* \\\n1) بتطبيق القانون الثاني لنيوتن، جد المعادلة التفاضلية لسرعة مركز عطالة الجملة. \\\n2) استنتج عبارة السرعة الحدية $v_"lim"$ ثم احسب قيمتها. \\\n3) كم من نظام يظهره بيان الشكل (2)؟ حدّد طبيعة الحركة عندئذ.',
					answer:
						'*I.* 1) بتطبيق القانون الثاني لنيوتن: $arrow(P) + arrow(f) = m arrow(a)_G arrow.r.double m g - k v^2 = m frac(d v, d t) arrow.r.double frac(d v, d t) + frac(k, m) v^2 = g$.\n2) في النظام الدائم $frac(d v, d t) = 0 arrow.r.double v_"lim" = sqrt(frac(m g, k)) = sqrt(frac(80 times "9,8", "0,28")) approx "52,9" "m" dot "s"^(-1)$.\n3) يظهر البيان *نظاماً واحداً فقط وهو النظام الانتقالي* لأن آخر قيمة عند $t = 12 "s"$ هي $52 "m" dot "s"^(-1) < v_"lim"$. الحركة مستقيمة متسارعة دون انتظام.',
					mark: '1.75'
				},
				{
					type: 'text',
					content:
						'*II. المرحلة الثانية:* عند $t = 12 "s"$ يفتح المظلي مظلته، فتصبح قوة الاحتكاك $f\' = k\' v^2$ وتثبت السرعة عند قيمة حدية جديدة $v\'_"lim" = "4,5" "m" dot "s"^(-1)$ بعد مدة $Delta t = 4 "s"$. \\\n1) حدّد قيمة $k\'$. \\\n2) مثّل بشكل كيفي تطور السرعة $v(t)$ لكامل السقوط ($0 <= t <= 20 "s"$).',
					answer:
						'*II.* 1) $k\' = frac(m g, v\'_"lim"^2) = frac(80 times "9,8", "4,5"^2) approx "38,7" "kg" dot "m"^(-1)$.\n2) التمثيل الكيفي لكامل السقوط:\n#align(center)[#image("/static' +
						ex2FallSolUrl +
						'", width: 54%)]',
					mark: '0.75'
				}
			]
		},
		{
			id: 'bac_2023_tm_phy_ex3',
			num: 'الثالث',
			customTitle: 'الجزء الأول — التمرين الثالث',
			points: 6,
			instruction:
				'لإبراز تأثير المكثفة والوشيعة على شدة التيار الكهربائي في دارة، نربط النقطتين $A$ و $B$ في الدارة (الشكل 3) المكونة من مولد مثالي للتوتر $E$، قاطعة $K$، وناقل أومي $R_0 = 10 Omega$، تارة بمكثفة فارغة سعتها $C$ وتارة بوشيعة تحريضية $(L, r)$. عند غلق القاطعة في $t = 0$ نعاين $u_(R_0)(t)$ براسم اهتزاز ذي ذاكرة فنحصل على المنحنيين $(a)$ و $(b)$ (الشكل 4).',
			content: [
				{
					type: 'columns',
					children: [
						{ type: 'image', src: ex3RcCircuitUrl, caption: 'الشكل (3): التركيب التجريبي', width: 300 },
						{ type: 'image', src: ex3CurvesUrl, caption: 'الشكل (4): المنحنيان (a) و (b)', width: 350 }
					]
				},
				{
					type: 'text',
					content:
						'1) فسّر لماذا متابعة تطور التوتر $u_(R_0)(t)$ تمكننا من معرفة تطور شدة التيار $i(t)$. \\\n2) تُعطى عبارة الشدة الأعظمية بـ $I_"max" = E / R$. اكتب عبارة المقاومة المكافئة $R$ في كل دارة، ثم أرفق كل منحنى بالدارة الموافقة.',
					answer:
						'1) حسب قانون أوم $u_(R_0)(t) = R_0 i(t) arrow.r.double i(t) = frac(u_(R_0)(t), R_0)$؛ إذن $i(t)$ يتناسب طرداً مع $u_(R_0)(t)$ ولهما نفس التغيرات.\n2) المقاومة المكافئة:\n- في الدارة $(R C)$: $R = R_0$ ومنه $I_"max"(R C) = E / R_0$.\n- في الدارة $(R L)$: $R = R_0 + r$ ومنه $I_"max"(R L) = E / (R_0 + r) < I_"max"(R C)$.\nمن البيان: للمنحنى $(a)$ نجد $I_"max" = 10 / 10 = 1 "A"$، وللمنحنى $(b)$ نجد $I_"max" = 5 / 10 = "0,5" "A"$. \\\nإذن المنحنى $(a)$ يوافق الدارة $(R C)$ والمنحنى $(b)$ يوافق الدارة $(R L)$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3) أبرز ما تأثير كل من المكثفة والوشيعة على شدة التيار المار في الدارة في النظامين الانتقالي والدائم. \\\n4) بتطبيق قانون جمع التوترات، بيّن أن المعادلة التفاضلية لشدة التيار في كل دارة تكتب بالشكل: $tau frac(d i(t), d t) + i(t) = I_P$.',
					answer:
						'3) المكثفة: تكون الشدة أعظمية لحظة الغلق $i(0) = I_"max"$ ثم تتناقص لتنعدم في النظام الدائم. \\\nالوشيعة التحريضية: تمنع الانقطاع أو البلوغ الآني للتيار حيث $i(0) = 0$ ثم يتزايد رتيباً ليبلغ قيمة ثابتة $I_P$ في النظام الدائم.\n4) - في الدارة $(R C)$: $R_0 i + frac(q, C) = E$، بالاشتقاق والضرب في $C$: $R_0 C frac(d i, d t) + i = 0$.\n- في الدارة $(R L)$: $L frac(d i, d t) + (R_0 + r) i = E arrow.r.double frac(L, R_0 + r) frac(d i, d t) + i = frac(E, R_0 + r)$.',
					mark: '1.75'
				},
				{
					type: 'text',
					content:
						'5) استنتج لكل دارة عبارة $tau$ وقيمة $I_P$. \\\n6) باستثمار المنحنيين $(a)$ و $(b)$، جد قيمة $E$، وسعة المكثفة $C$، ومميزتي الوشيعة $(L, r)$.',
					answer:
						'5) بالمطابقة: في $(R C)$ لدينا $tau = R_0 C$ و $I_P = 0$؛ في $(R L)$ لدينا $tau = frac(L, R_0 + r)$ و $I_P = I_"max" = "0,5" "A"$.\n6) - من المنحنى $(a)$: عند $t = 0$ يكون $u_(R_0)(0) = E = 10 "V"$. وبما أن $tau = "0,01" "s"$ فإن $C = frac(tau, R_0) = frac("0,01", 10) = 10^(-3) "F" = 1 "mF"$.\n- من المنحنى $(b)$: في النظام الدائم $R_0 I_"max" + r I_"max" = E arrow.r.double 5 + "0,5" r = 10 arrow.r.double r = 10 Omega$. \\\nومن $tau = "0,01" "s"$: $L = tau (R_0 + r) = "0,01" times (10 + 10) = "0,2" "H"$.',
					mark: '2.75'
				}
			]
		},
		{
			id: 'bac_2023_tm_phy_ex4',
			num: 'الرابع',
			customTitle: 'الجزء الثاني — التمرين التجريبي',
			points: 6,
			instruction:
				'لتحضير أستر بنكهة الأناناس انطلاقاً من قارورة حمض كربوكسيلي نقي ملصقتها متلفة، قام الأستاذ أولاً بتحديد صيغة الحمض بالمعايرة الـ $"pH"$-مترية لحجم $V_1 = 10 "mL"$ من محلول مخفف $S_1$ بواسطة محلول هيدروكسيد الصوديوم تركيزه $c_b = 2 times 10^(-2) "mol" dot "L"^(-1)$. نعطي: $M("H") = 1$، $M("C") = 12$، $M("O") = 16 "g" dot "mol"^(-1)$.',
			content: [
				{
					type: 'columns',
					children: [
						{ type: 'image', src: ex4TitrationSetupUrl, caption: 'الشكل (5): التركيب التجريبي للمعايرة', width: 300 },
						{ type: 'image', src: ex4PhCurveUrl, caption: 'الشكل (6): منحنى تغيرات الـ pH بدلالة Vb', width: 340 }
					]
				},
				{
					type: 'text',
					content:
						'*I. التعرف على الحمض الكربوكسيلي:* \\\n1) اكتب الصيغة المجملة العامة للأحماض الكربوكسيلية. \\\n2) ارسم/سمّ بيانات التركيب التجريبي لعملية المعايرة، واكتب معادلة تفاعل المعايرة.',
					answer:
						'*I.* 1) الصيغة العامة للأحماض الكربوكسيلية: $"C"_n"H"_(2 n + 1)"COOH"$ (أو $"C"_m"H"_(2 m)"O"_2$).\n2) البيانات: (1) سحاحة مدرجة تحوي المحلول المعايِر ($"NaOH"$)، (2) بيشر يحوي المحلول المعايَر ($S_1$)، (3) مسبار جهاز الـ $"pH"$-متر، (4) مخلاط مغناطيسي وقضيب ممغنط. \\\nمعادلة المعايرة:\n' +
						ex4TitrationEq.typst,
					mark: '1'
				},
				{
					type: 'text',
					content:
						'3) من الشكل (6)، حدّد إحداثيي نقطة التكافؤ واستنتج التركيز المولي $c_1$ للمحلول $S_1$. \\\n4) استنتج قيمة $"pK"_A$ للثنائية، ثم حدّد صيغة الحمض واسمه (علماً أن سلسلته غير متفرعة، ومن بين الثنائيات: $"HCO"_2"H" / "HCO"_2^-$ ($"pK"_a = "3,80"$) و $"C"_3"H"_7"CO"_2"H" / "C"_3"H"_7"CO"_2^-$ ($"pK"_a = "4,82"$)).',
					answer:
						'3) بطريقة المماسات: $E(V_(b E) = 12 "mL" ; "pH"_E = "8,4")$. \\\nعند التكافؤ: $c_1 V_1 = c_b V_(b E) arrow.r.double c_1 = frac(2 times 10^(-2) times 12, 10) = "2,4" times 10^(-2) "mol" dot "L"^(-1)$.\n4) عند نصف التكافؤ ($V_b = 6 "mL"$): $"pK"_A = "pH" = "4,8"$. \\\nبالمطابقة مع الجدول، الحمض هو $"C"_3"H"_7"COOH"$، وبما أن سلسلته غير متفرعة فهو *حمض البوتانويك* ($"CH"_3-"CH"_2-"CH"_2-"COOH"$).',
					mark: '1.75'
				},
				{
					type: 'text',
					content:
						'*II. تحضير أستر بنكهة الأناناس:* نمزج $n_0 = "0,1" "mol"$ من حمض البوتانويك مع $n_0 = "0,1" "mol"$ من كحول نقي $"R-OH"$ وقطرات من حمض الكبريت المركز. عند التوازن تتبقى كتلة $m_f = "2,9" "g"$ من الحمض. \\\n1) ما دور حمض الكبريت المركز؟ اكتب معادلة الأسترة واذكر مميزاتها. \\\n2) أكمل جدول التقدم التالي ثم استنتج مردود التفاعل $r$:',
					answer:
						'*II.* 1) حمض الكبريت المركز يعمل كـ *وسيط* لتسريع التفاعل. \\\nمعادلة الأسترة:\n' +
						ex4EsterEq.typst +
						'\nمميزاته: بطيء، محدود (عكوس)، ولاحراري.\n2) $M("C"_3"H"_7"COOH") = 88 "g" dot "mol"^(-1)$. كمية الحمض المتبقية: $n_f = frac("2,9", 88) = "0,033" "mol"$. \\\nومنه $x_f = "0,1" - "0,033" = "0,067" "mol"$. المردود: $r = frac(x_f, x_"max") times 100% = frac("0,067", "0,1") times 100% = 67%$.',
					mark: '1.75'
				},
				ex4Ice.typstBlock,
				{
					type: 'text',
					content:
						'3) جد التركيب المولي للمزيج عند التوازن واحسب ثابت التوازن $K$. \\\n4) علماً أن الكتلة المولية للأستر المتشكل هي $M = 116 "g" dot "mol"^(-1)$، اكتب صيغته نصف المفصلة واسمه، ثم اقترح طريقتين لتحسين المردود.',
					answer:
						'3) التركيب المولي: $n_f("ester") = n_f("eau") = "0,067" "mol"$؛ $n_f("acide") = n_f("alcool") = "0,033" "mol"$. \\\n$K = frac("0,067"^2, "0,033"^2) approx "4,12"$.\n4) $M("C"_3"H"_7"COOC"_n"H"_(2 n + 1)) = 88 + 14 n = 116 arrow.r.double n = 2$. \\\nالصيغة نصف المفصلة: $"CH"_3"CH"_2"CH"_2"COOCH"_2"CH"_3$، واسمه: *بوتانوات الإيثيل*. \\\nتحسين المردود: تعويض الحمض بكلور البوتانويل (مردود يقارب $100%$)، أو نزع الأستر المتشكل لإزاحة التوازن نحو النواتج.',
					mark: '1.5'
				}
			]
		}
	];

	return buildRecord('2023', exercises, 2);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. دورة جوان 2024 — شعبة تقني رياضي — الموضوع الأول (ONEC + Unit 7 RLC + الأعمدة)
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2024TmPhysics(): OfficialBacPhysicsPaperRecord {
	const ex2RnUrl = savePhysicsSvgAsset(
		'bac_2024_tm_phy_ex2_c14',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 17190,
			yMin: 0,
			yMax: 0.3,
			xStep: 5730,
			yStep: 0.05,
			xLabel: 't (ans)',
			yLabel: 'A (Bq/g)',
			title: 'منحنى تناقص النشاط النوعي للكربون 14',
			curves: [
				{
					fn: (t) => 0.25 * Math.exp((-t * Math.LN2) / 5730),
					color: '#2563eb',
					label: 'A(t)'
				}
			],
			dashedGuides: [
				{ x1: 0, y1: 0.125, x2: 5730, y2: 0.125, color: '#dc2626' },
				{ x1: 5730, y1: 0, x2: 5730, y2: 0.125, color: '#dc2626' }
			],
			points: [
				{ x: 0, y: 0.25, label: 'A₀ = 0,250', color: '#1d4ed8' },
				{ x: 5730, y: 0.125, label: 't₁/₂ = 5730 ans', color: '#dc2626' }
			],
			width: 370,
			height: 230
		})
	);

	const ex3RlcCircuitUrl = savePhysicsSvgAsset(
		'bac_2024_tm_phy_ex3_rlc_circuit',
		svgCircuitDiagram({
			kind: 'rlc',
			labels: { e: 'E = 6 V', r: 'r', c: 'C = 10 µF', l: '(L, r)', switchLabel: 'K' },
			width: 340,
			height: 200
		})
	);

	const ex3UcIdealUrl = savePhysicsSvgAsset(
		'bac_2024_tm_phy_ex3_uc_ideal',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 30,
			yMin: -8,
			yMax: 8,
			xStep: 5,
			yStep: 2,
			xLabel: 't (ms)',
			yLabel: 'uC (V)',
			title: 'تفريغ المكثفة في وشيعة صافية (r = 0)',
			curves: [
				{
					fn: (t) => 6 * Math.cos((2 * Math.PI * t) / 12.57),
					color: '#2563eb',
					label: 'uC(t)'
				}
			],
			points: [
				{ x: 0, y: 6, label: 'E = 6 V', color: '#dc2626' },
				{ x: 12.57, y: 6, label: 'T₀ = 12,57 ms', color: '#059669' }
			],
			width: 365,
			height: 225
		})
	);

	const ex3UcDampedUrl = savePhysicsSvgAsset(
		'bac_2024_tm_phy_ex3_uc_damped',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 30,
			yMin: -8,
			yMax: 8,
			xStep: 5,
			yStep: 2,
			xLabel: 't (ms)',
			yLabel: 'uC (V)',
			title: 'نظام شبه دوري لدارة RLC حقيقية (r = 15 Ω)',
			curves: [
				{
					fn: (t) => 6 * Math.exp(-t / 53.3) * Math.cos((2 * Math.PI * t) / 12.6),
					color: '#dc2626',
					label: 'uC(t)'
				}
			],
			points: [
				{ x: 0, y: 6, label: '6 V', color: '#dc2626' },
				{ x: 12.6, y: 4.74, label: '4,74 V', color: '#7c3aed' }
			],
			width: 365,
			height: 225
		})
	);

	const ex4InclinedUrl = savePhysicsSvgAsset(
		'bac_2024_tm_phy_ex4_inclined',
		svgInclinedPlaneForces({
			angleDeg: 30,
			showFriction: false,
			angleLabel: 'α = 30°',
			width: 320,
			height: 190
		})
	);

	const ex4V2xUrl = savePhysicsSvgAsset(
		'bac_2024_tm_phy_ex4_v2x',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 2.0,
			yMin: 0,
			yMax: 20,
			xStep: 0.5,
			yStep: 4,
			xLabel: 'x (m)',
			yLabel: 'v² (m²/s²)',
			title: 'تغيرات مربع السرعة v²(x) على المسار الأفقي AB',
			curves: [
				{
					fn: (x) => 16 - 6 * x,
					color: '#2563eb',
					label: 'v²(x)'
				}
			],
			points: [
				{ x: 0, y: 16, label: '(0 ; 16)', color: '#dc2626' },
				{ x: 2.0, y: 4, label: '(2,0 ; 4)', color: '#059669' }
			],
			width: 360,
			height: 220
		})
	);

	const ex1CellEq = chemEquation(
		[
			{ formula: 'Zn', state: 's' },
			{ formula: 'Cu^2+', state: 'aq' }
		],
		[
			{ formula: 'Zn^2+', state: 'aq' },
			{ formula: 'Cu', state: 's' }
		],
		{ reversible: true, display: true }
	);

	const ex1Ice = buildIceTable({
		equation: ex1CellEq,
		speciesHeaders: [
			chemSpecies('Zn', 's'),
			chemSpecies('Cu^2+', 'aq'),
			chemSpecies('Zn^2+', 'aq'),
			chemSpecies('Cu', 's')
		],
		initial: [
			{ katex: 'n_0(Zn)', typst: '$n_0("Zn")$' },
			{ katex: '0,010', typst: '$"0,010"$' },
			{ katex: '0,010', typst: '$"0,010"$' },
			{ katex: 'n_0(Cu)', typst: '$n_0("Cu")$' }
		],
		intermediate: [
			{ katex: 'n_0(Zn)-x', typst: '$n_0("Zn") - x$' },
			{ katex: '0,010-x', typst: '$"0,010" - x$' },
			{ katex: '0,010+x', typst: '$"0,010" + x$' },
			{ katex: 'n_0(Cu)+x', typst: '$n_0("Cu") + x$' }
		],
		final: [
			{ katex: '...', typst: '........' },
			{ katex: '...', typst: '........' },
			{ katex: '...', typst: '........' },
			{ katex: '...', typst: '........' }
		],
		finalAnswers: [
			{ katex: 'n_0(Zn)-x_f', typst: '$n_0("Zn") - x_f$' },
			{ katex: '0,010-x_f', typst: '$"0,010" - x_f$' },
			{ katex: '0,010+x_f', typst: '$"0,010" + x_f$' },
			{ katex: 'n_0(Cu)+x_f', typst: '$n_0("Cu") + x_f$' }
		]
	});

	const ex2DecayEq = nuclearEquation(
		[{ A: 14, Z: 6, symbol: 'C' }],
		[
			{ A: 14, Z: 7, symbol: 'N' },
			{ A: 0, Z: '(-1)', symbol: 'e' }
		],
		{ display: true }
	);

	const exercises: ExerciseBlock[] = [
		{
			id: 'bac_2024_tm_phy_ex1',
			num: 'الأول',
			customTitle: 'الجزء الأول — التمرين الأول',
			points: 4,
			instruction:
				'نركّب عموداً كهربائياً (عمود دانييل) بغمر صفيحة من الزنك ' +
				chemSpecies('Zn', 's').typst +
				' في حجم $V_1 = 100 "mL"$ من محلول كبريتات الزنك تركيزه $c_1 = "0,10" "mol" dot "L"^(-1)$، وصفيحة من النحاس ' +
				chemSpecies('Cu', 's').typst +
				' في حجم $V_2 = 100 "mL"$ من محلول كبريتات النحاس II تركيزه $c_2 = "0,10" "mol" dot "L"^(-1)$، موصولين بجسر ملحي يحتوي على محلول نترات البوتاسيوم. ثابت التوازن لتفاعل الأكسدة–إرجاع هو $K = 10^(37)$ عند $25 degree"C"$. نعطي: $F = 96500 "C" dot "mol"^(-1)$، $M("Zn") = "65,4" "g" dot "mol"^(-1)$، $M("Cu") = "63,5" "g" dot "mol"^(-1)$.',
			content: [
				{
					type: 'text',
					content:
						'1) اكتب معادلة التفاعل المنمذج لاشتغال العمود، ثم احسب كسر التفاعل الابتدائي $Q_(r,i)$ وحدّد جهة التطور التلقائي للجملة.',
					answer:
						'1) المعادلة المنمذجة:\n' +
						ex1CellEq.typst +
						'\nكسر التفاعل الابتدائي: $Q_(r,i) = frac(["Zn"^(2+)]_i, ["Cu"^(2+)]_i) = frac("0,10", "0,10") = 1$. \\\nبما أن $Q_(r,i) = 1 < K = 10^(37)$، تتطور الجملة تلقائياً في *الاتجاه المباشر* (تآكل الزنك وترسب النحاس).',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'2) حدّد قطبية العمود (المصعد والمهبط)، جهة حركة الإلكترونات في الدارة الخارجية، ودور الجسر الملحي، ثم اكتب الرمز الاصطلاحي للعمود.',
					answer:
						'2) صفيحة الزنك تتأكسد ($"Zn" arrow.r "Zn"^(2+) + 2 e^-$) فهي *المصعد* والقطب السالب $(-)$، وصفيحة النحاس يحدث عندها الإرجاع فهي *المهبط* والقطب الموجب $(+)$. \\\nتتحرك الإلكترونات في الدارة الخارجية من صفيحة الزنك نحو صفيحة النحاس. \\\nدور الجسر الملحي: إغلاق الدارة الكهربائية وضمان التعادل الكهربائي للمحلولين. \\\nالرمز الاصطلاحي: $(-) "Zn"(s) | "Zn"^(2+)(a q) || "Cu"^(2+)(a q) | "Cu"(s) (+)$.',
					mark: '1.25'
				},
				{
					type: 'text',
					content: '3) أكمل جدول تقدم التفاعل التالي للعمود (باعتبار كتلتي الصفيحتين وافرتين):',
					answer: 'تُملأ الحالة النهائية في الجدول أعلاه بدلالة التقدم النهائي $x_f$.',
					mark: '0.5'
				},
				ex1Ice.typstBlock,
				{
					type: 'text',
					content:
						'4) يشتغل العمود لمدة $Delta t = 2 "h"$ معطياً تياراً ثابتاً شدته $I = 50 "mA"$. احسب التغير في كتلة كل من صفيحتي النحاس والزنك، ثم احسب كمية الكهرباء الأعظمية $Q_"max"$ التي يمكن للعمود توليدها.',
					answer:
						'4) كمية الكهرباء: $Q = I dot Delta t = 50 times 10^(-3) times 7200 = 360 "C"$. \\\nكمية مادة الإلكترونات المتبادلة: $n(e^-) = frac(Q, F) = frac(360, 96500) = "3,73" times 10^(-3) "mol"$. \\\nتقدم التفاعل: $x = frac(n(e^-), 2) = "1,865" times 10^(-3) "mol"$. \\\n- تغير كتلة النحاس: $Delta m("Cu") = +x dot M("Cu") = +"1,865" times 10^(-3) times "63,5" approx +"0,118" "g"$. \\\n- تغير كتلة الزنك: $Delta m("Zn") = -x dot M("Zn") = -"1,865" times 10^(-3) times "65,4" approx -"0,122" "g"$. \\\nكمية الكهرباء الأعظمية ($x_"max" = "0,010" "mol"$): $Q_"max" = 2 F x_"max" = 2 times 96500 times "0,010" = 1930 "C"$.',
					mark: '1.25'
				}
			]
		},
		{
			id: 'bac_2024_tm_phy_ex2',
			num: 'الثاني',
			customTitle: 'الجزء الأول — التمرين الثاني',
			points: 4,
			instruction:
				'يستعمل الكربون 14 (' +
				nuclide(14, 6, 'C').typst +
				') في تأريخ البقايا العضوية الأثرية، حيث يتحول إلى نواة الآزوت ' +
				nuclide(14, 7, 'N').typst +
				'. يمثّل الشكل (1) تطور النشاط النوعي $A(t)$ (لكل غرام من الكربون) بدلالة الزمن.',
			content: [
				{
					type: 'image',
					src: ex2RnUrl,
					caption: 'الشكل (1): منحنى التناقص الإشعاعي للكربون 14',
					width: 355
				},
				{
					type: 'text',
					content:
						'1) اكتب معادلة التفكك النووي للكربون 14 محدّداً نمط الإشعاع ومفسّراً آلية حدوثه داخل النواة. \\\n2) حدّد بيانياً زمن نصف العمر $t_(1/2)$ للكربون 14، ثم استنتج ثابت التفكك $lambda$ بوحدة $"ans"^(-1)$.',
					answer:
						'1) معادلة التفكك:\n' +
						ex2DecayEq.typst +
						'\nنمط الإشعاع: $beta^-$، ويحدث بتحول نيترون داخل النواة إلى بروتون مع انبعاث إلكترون: $""_0^1"n" arrow.r ""_1^1"p" + ""_(-1)^0"e"$.\n2) بيانياً عند $A = A_0 / 2 = "0,125" "Bq/g"$ نجد $t_(1/2) = 5730 "ans"$. \\\nثابت التفكك: $lambda = frac(ln 2, t_(1/2)) = frac("0,693", 5730) approx "1,21" times 10^(-4) "ans"^(-1)$.',
					mark: '1.75'
				},
				{
					type: 'text',
					content:
						'3) أثبت قانون التناقص الإشعاعي للنشاط $A(t) = A_0 e^(-lambda t)$ انطلاقاً من $frac(d N, d t) = -lambda N$. \\\n4) أعطى قياس نشاط عينة خشب أثرية في موقع تيبازة القيمة $A = "0,177" "Bq/g"$ بينما كان نشاط الخشب الحي $A_0 = "0,250" "Bq/g"$. احسب عمر العينة الأثرية.',
					answer:
						'3) حل المعادلة التفاضلية $frac(d N, d t) + lambda N = 0$ هو $N(t) = N_0 e^(-lambda t)$. وبما أن $A(t) = lambda N(t)$ و $A_0 = lambda N_0$ ينتج $A(t) = A_0 e^(-lambda t)$.\n4) $t = frac(1, lambda) ln(frac(A_0, A)) = frac(5730, ln 2) ln(frac("0,250", "0,177")) approx 2850 "ans"$.',
					mark: '2.25'
				}
			]
		},
		{
			id: 'bac_2024_tm_phy_ex3',
			num: 'الثالث',
			customTitle: 'الجزء الأول — التمرين الثالث',
			points: 6,
			instruction:
				'ندرس في هذا التمرين الاهتزازات الكهربائية الحرة والمغذاة في الدارة $(R, L, C)$ (الشكل 2). نشحن مكثفة سعتها $C = 10 mu"F"$ كلياً تحت توتر $E = "6,0" "V"$ ثم نفرغها عند $t = 0$ في وشيعة ذاتيتها $L$ ومقاومتها الداخلية $r$.',
			content: [
				{
					type: 'image',
					src: ex3RlcCircuitUrl,
					caption: 'الشكل (2): الدارة الكهربائية RLC',
					width: 325
				},
				{
					type: 'columns',
					children: [
						{ type: 'image', src: ex3UcIdealUrl, caption: 'الشكل (3): حالة وشيعة صافية (r = 0)', width: 330 },
						{ type: 'image', src: ex3UcDampedUrl, caption: 'الشكل (4): حالة وشيعة حقيقية (r = 15 Ω)', width: 330 }
					]
				},
				{
					type: 'text',
					content:
						'*I. حالة وشيعة صافية ($r = 0$ — الشكل 3):* \\\n1) أثبت المعادلة التفاضلية للتوتر $u_C(t)$ بين طرفي المكثفة. \\\n2) يُعطى حلها بالشكل $u_C(t) = U_m cos(omega_0 t + varphi)$. استنتج عبارة النبض الخاص $omega_0$ والدور الخاص $T_0$، ثم حدّد قيمتي $U_m$ و $varphi$ من الشروط الابتدائية.',
					answer:
						'*I.* 1) قانون جمع التوترات: $u_L(t) + u_C(t) = 0 arrow.r.double L frac(d i, d t) + u_C = 0$. وبما أن $i = C frac(d u_C, d t)$ فإن: $L C frac(d^2 u_C, d t^2) + u_C = 0 arrow.r.double frac(d^2 u_C, d t^2) + frac(1, L C) u_C = 0$.\n2) بالتعويض بالحل: $(-omega_0^2 + frac(1, L C)) U_m cos(omega_0 t + varphi) = 0 arrow.r.double omega_0 = frac(1, sqrt(L C))$ و $T_0 = 2 pi sqrt(L C)$. \\\nعند $t = 0$: $u_C(0) = E = "6,0" "V"$ و $i(0) = 0 arrow.r.double sin varphi = 0$ ومنه $U_m = "6,0" "V"$ و $varphi = 0 "rad"$.',
					mark: '2'
				},
				{
					type: 'text',
					content:
						'3) اقرأ قيمة الدور الخاص $T_0$ من الشكل (3) ثم استنتج ذاتية الوشيعة $L$. \\\n4) احسب الطاقة الكهربائية الكلية $E_T$ المخزنة في الدارة، وبين أنها محفوظة.',
					answer:
						'3) من الشكل (3): $T_0 = "12,57" "ms" = 4 pi times 10^(-3) "s"$. \\\nمن $T_0^2 = 4 pi^2 L C$ نجد: $L = frac(T_0^2, 4 pi^2 C) = frac(("12,57" times 10^(-3))^2, 4 pi^2 times 10 times 10^(-6)) = "0,40" "H"$.\n4) $E_T = frac(1, 2) C E^2 = frac(1, 2) times 10^(-5) times "6,0"^2 = "1,8" times 10^(-4) "J" = "0,18" "mJ"$. \\\nالمشتق: $frac(d E_T, d t) = C u_C frac(d u_C, d t) + L i frac(d i, d t) = i (u_C + L frac(d i, d t)) = 0$، فـ $E_T$ محفوظة.',
					mark: '1.75'
				},
				{
					type: 'text',
					content:
						'*II. حالة وشيعة حقيقية ($r = 15 Omega$ — الشكل 4):* \\\n1) سمّ نظام الاهتزازات المبيّن في الشكل (4)، واحسب الطاقة المبددة خلال شبه الدور الأول ($T approx "12,6" "ms"$). في أي شكل تتبدد؟ \\\n2) لتعويض التخامد وجعل الاهتزازات جيبية مستمرة، ندرج على التسلسل ثنائي قطب يعطي توتراً $u_g = R_0 i$. جد الشرط الذي يحققه $R_0$ وقيمته.',
					answer:
						'*II.* 1) النظام هو *شبه دوري*. \\\nعند $t = 0$: $E_T(0) = "0,180" "mJ"$. عند $t = T$: $u_C(T) = "4,74" "V" arrow.r.double E_T(T) = frac(1, 2) C u_C^2(T) = "0,112" "mJ"$. \\\nالطاقة المبددة: $|Delta E_T| = "0,180" - "0,112" = "0,068" "mJ"$، وتتبدد بفعل جول في مقاومة الوشيعة $r$.\n2) بتطبيق قانون جمع التوترات: $L frac(d i, d t) + (r - R_0) i + u_C = 0$. \\\nللحصول على اهتزازات مستمرة يجب تعويض التخامد: $r - R_0 = 0 arrow.r.double R_0 = r = 15 Omega$.',
					mark: '2.25'
				}
			]
		},
		{
			id: 'bac_2024_tm_phy_ex4',
			num: 'الرابع',
			customTitle: 'الجزء الثاني — التمرين التجريبي',
			points: 6,
			instruction:
				'لدراسة حركة جسم صلب $(S)$ كتلته $m = "0,40" "kg"$ على مسار يتكوّن من جزء أفقي خشن $A B$ طوله $L = "2,0" "m"$ يليه مستوٍ مائل أملس $B C$ يميل عن الأفق بزاوية $alpha = 30 degree$ (الشكل 5)، نقذف الجسم من $A$ بسرعة ابتدائية $v_A$ ونتتبع حركته بالتصوير المتعاقب. نعطي: $g = 10 "m" dot "s"^(-2)$.',
			content: [
				{
					type: 'columns',
					children: [
						{ type: 'image', src: ex4V2xUrl, caption: 'الشكل (5): البيان التجريبي v²(x) على المسار AB', width: 340 },
						{ type: 'image', src: ex4InclinedUrl, caption: 'الشكل (6): صعود الجسم على المستوي المائل BC', width: 310 }
					]
				},
				{
					type: 'text',
					content:
						'1) صف البروتوكول التجريبي المتبع لقياس السرعات اللحظية على المسار $A B$ باستعمال كاميرا رقمية وبرمجية متابعة فيديو (مثل $A v i m e c a$). \\\n2) من الشكل (5)، استخرج قيمة السرعة الابتدائية $v_A$ والسرعة $v_B$ عند نهاية المسار الأفقي.',
					answer:
						'1) نثبّت الكاميرا الرقمية بشكل عمودي على مستوي الحركة مع وضع سلم مرجعي واضح ($1 "m"$ مثلاً)، نسجل شريط الفيديو ثم نستثمر المواضع المتتالية خلال أزمنة متساوية $tau$ لحساب السرعة اللحظية $v_i = frac(M_(i-1) M_(i+1), 2 tau)$.\n2) عند $x = 0$: $v_A^2 = 16 arrow.r.double v_A = "4,0" "m" dot "s"^(-1)$. \\\nعند $x = "2,0" "m"$: $v_B^2 = "4,0" arrow.r.double v_B = "2,0" "m" dot "s"^(-1)$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3) بتطبيق القانون الثاني لنيوتن على المسار $A B$، جد عبارة التسارع $a_1$، ثم احسب قيمته من الشكل (5) واستنتج شدة قوة الاحتكاك $f$. \\\n4) احسب معامل الاحتكاك الحركي $mu = f / R_N$.',
					answer:
						'3) على $A B$: $arrow(P) + arrow(R)_N + arrow(f) = m arrow(a)_1$. بالإسقاط على محور الحركة: $-f = m a_1 arrow.r.double a_1 = -frac(f, m)$. \\\nمن البيان ($v^2 = v_A^2 + 2 a_1 x$): الميل $2 a_1 = frac(4 - 16, "2,0" - 0) = -"6,0" arrow.r.double a_1 = -"3,0" "m" dot "s"^(-2)$. \\\nشدة الاحتكاك: $f = m |a_1| = "0,40" times "3,0" = "1,2" "N"$.\n4) على الناظم $R_N = m g = "0,40" times 10 = "4,0" "N" arrow.r.double mu = frac("1,2", "4,0") = "0,30"$.',
					mark: '2.25'
				},
				{
					type: 'text',
					content:
						'5) يصعد الجسم المستوي المائل الأملس $B C$ انطلاقاً من $B$ بالسرعة $v_B = "2,0" "m" dot "s"^(-1)$. \\\nأ) مثّل القوى المؤثرة على $(S)$ على المستوي $B C$ واحسب تسارعه $a_2$. \\\nب) احسب أقصى مسافة $B M$ يبلغها الجسم على المستوي المائل قبل أن يتوقف لحظياً، ثم تحقق من النتيجة بتطبيق مبدأ انحفاظ الطاقة.',
					answer:
						'5) أ) على المستوي المائل الأملس: القوى هي $arrow(P)$ و $arrow(R)_N$. \\\nبالإسقاط على محور الصعود: $-m g sin alpha = m a_2 arrow.r.double a_2 = -g sin 30 degree = -"5,0" "m" dot "s"^(-2)$.\nب) عند التوقف $v_M = 0$: $0 - v_B^2 = 2 a_2 B M arrow.r.double B M = frac(-"4,0", 2 times (-"5,0")) = "0,40" "m"$. \\\nالتحقق الطاقوي: $E_(c B) = E_(p p M) arrow.r.double frac(1, 2) m v_B^2 = m g B M sin alpha arrow.r.double B M = frac(v_B^2, 2 g sin alpha) = frac("4,0", 2 times 10 times "0,5") = "0,40" "m"$.',
					mark: '2.25'
				}
			]
		}
	];

	return buildRecord('2024', exercises, 1);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. دورة جوان 2025 — شعبة تقني رياضي — الموضوع الأول (Unit 7 Mechanical Osc + RL + pH)
// ═══════════════════════════════════════════════════════════════════════════════

function buildBac2025TmPhysics(): OfficialBacPhysicsPaperRecord {
	const ex1XtUrl = savePhysicsSvgAsset(
		'bac_2025_tm_phy_ex1_xt',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 1.256,
			yMin: -5,
			yMax: 5,
			xStep: 0.314,
			yStep: 1,
			xLabel: 't (s)',
			yLabel: 'x (cm)',
			title: 'تطور الفاصلة x(t) للنواس المرن الأفقي',
			curves: [
				{
					fn: (t) => 4.0 * Math.cos(10 * t),
					color: '#2563eb',
					label: 'x(t)'
				}
			],
			points: [
				{ x: 0, y: 4.0, label: 'Xm = 4 cm', color: '#dc2626' },
				{ x: 0.628, y: 4.0, label: 'T₀ = 0,628 s', color: '#059669' }
			],
			width: 370,
			height: 225
		})
	);

	const ex2O2Url = savePhysicsSvgAsset(
		'bac_2025_tm_phy_ex2_vo2',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 30,
			yMin: 0,
			yMax: 280,
			xStep: 6,
			yStep: 40,
			xLabel: 't (min)',
			yLabel: 'VO2 (mL)',
			title: 'تطور حجم غاز الأكسجين المنطلق VO2(t)',
			curves: [
				{
					fn: (t) => 240 * (1 - Math.exp((-t * Math.LN2) / 6.0)),
					color: '#2563eb',
					label: 'VO2(t)'
				}
			],
			dashedGuides: [
				{ x1: 0, y1: 240, x2: 30, y2: 240, color: '#64748b' },
				{ x1: 0, y1: 120, x2: 6, y2: 120, color: '#059669' },
				{ x1: 6, y1: 0, x2: 6, y2: 120, color: '#059669' },
				{ x1: 0, y1: 0, x2: 8.66, y2: 240, color: '#dc2626', label: '(Δ)', labelPos: 'left' }
			],
			points: [{ x: 6, y: 120, label: 't₁/₂ = 6 min', color: '#059669' }],
			width: 370,
			height: 225
		})
	);

	const ex3RlCircuitUrl = savePhysicsSvgAsset(
		'bac_2025_tm_phy_ex3_rl',
		svgCircuitDiagram({
			kind: 'rl',
			labels: { e: 'E = 12 V', r: 'R = 40 Ω', l: '(L, r)', switchLabel: 'K' },
			width: 325,
			height: 190
		})
	);

	const ex3ItUrl = savePhysicsSvgAsset(
		'bac_2025_tm_phy_ex3_it',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 25,
			yMin: 0,
			yMax: 0.3,
			xStep: 5,
			yStep: 0.05,
			xLabel: 't (ms)',
			yLabel: 'i (A)',
			title: 'تطور شدة التيار الكهربائي i(t) في الدارة RL',
			curves: [
				{
					fn: (t) => 0.24 * (1 - Math.exp(-t / 5.0)),
					color: '#dc2626',
					label: 'i(t)'
				}
			],
			dashedGuides: [
				{ x1: 0, y1: 0.24, x2: 25, y2: 0.24, color: '#64748b' },
				{ x1: 0, y1: 0, x2: 5.0, y2: 0.24, color: '#2563eb', label: '(Δ)', labelPos: 'left' },
				{ x1: 5.0, y1: 0, x2: 5.0, y2: 0.24, color: '#2563eb' }
			],
			points: [
				{ x: 0, y: 0.24, label: 'Ip = 0,24 A', color: '#dc2626' },
				{ x: 5.0, y: 0.24, label: 'τ = 5,0 ms', color: '#2563eb' }
			],
			width: 365,
			height: 225
		})
	);

	const ex4TitrationSetupUrl = savePhysicsSvgAsset(
		'bac_2025_tm_phy_ex4_setup',
		svgTitrationSetup({
			titrantLabel: 'NaOH (cb = 0,05 mol/L)',
			analyteLabel: 'حليب (Va = 20 mL)',
			sensorLabel: 'مسبار pH-متر',
			width: 310,
			height: 215
		})
	);

	const ex4PhUrl = savePhysicsSvgAsset(
		'bac_2025_tm_phy_ex4_ph',
		svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 20,
			yMin: 0,
			yMax: 14,
			xStep: 4,
			yStep: 2,
			xLabel: 'Vb (mL)',
			yLabel: 'pH',
			title: 'منحنى المعايرة الـ pH-مترية لحمض اللبن في الحليب',
			curves: [
				{
					fn: (vb) => {
						if (vb <= 0.1) return 2.7;
						if (vb < 11.8) return 3.9 + Math.log10(vb / (12 - vb));
						if (vb <= 12.2) return 8.2;
						return 12.1 + Math.log10((vb - 12) / (20 + vb));
					},
					color: '#7c3aed',
					label: 'pH(Vb)'
				}
			],
			dashedGuides: [
				{ x1: 0, y1: 3.9, x2: 6, y2: 3.9, color: '#059669' },
				{ x1: 6, y1: 0, x2: 6, y2: 3.9, color: '#059669' },
				{ x1: 0, y1: 8.2, x2: 12, y2: 8.2, color: '#dc2626' },
				{ x1: 12, y1: 0, x2: 12, y2: 8.2, color: '#dc2626' }
			],
			points: [
				{ x: 6, y: 3.9, label: 'pKA = 3,9', color: '#059669' },
				{ x: 12, y: 8.2, label: 'E(12 ; 8,2)', color: '#dc2626' }
			],
			width: 365,
			height: 225
		})
	);

	const ex2H2o2Eq = chemEquation(
		[{ coeff: 2, formula: 'H2O2', state: 'aq' }],
		[
			{ coeff: 2, formula: 'H2O', state: 'l' },
			{ formula: 'O2', state: 'g' }
		],
		{ display: true }
	);

	const ex2Ice = buildIceTable({
		equation: ex2H2o2Eq,
		speciesHeaders: [
			chemSpecies('H2O2', 'aq'),
			chemSpecies('H2O', 'l'),
			chemSpecies('O2', 'g')
		],
		initial: [
			{ katex: '20 mmol', typst: '$20 "mmol"$' },
			{ katex: 'بوفرة', typst: 'بوفرة' },
			{ katex: '0', typst: '$0$' }
		],
		intermediate: [
			{ katex: '20-2x', typst: '$20 - 2 x$' },
			{ katex: 'بوفرة', typst: 'بوفرة' },
			{ katex: 'x', typst: '$x$' }
		],
		final: [
			{ katex: '...', typst: '........' },
			{ katex: 'بوفرة', typst: 'بوفرة' },
			{ katex: '...', typst: '........' }
		],
		finalAnswers: [
			{ katex: '0', typst: '$20 - 2 x_f = 0$' },
			{ katex: 'بوفرة', typst: 'بوفرة' },
			{ katex: '10 mmol', typst: '$x_f = 10 "mmol"$' }
		]
	});

	const ex2CellEq = chemEquation(
		[
			{ formula: 'Cu', state: 's' },
			{ coeff: 2, formula: 'Ag+', state: 'aq' }
		],
		[
			{ formula: 'Cu^2+', state: 'aq' },
			{ coeff: 2, formula: 'Ag', state: 's' }
		],
		{ reversible: true, display: true }
	);

	const ex4TitrationEq = chemEquation(
		[
			{ formula: 'CH3CH(OH)COOH', state: 'aq' },
			{ formula: 'HO-', state: 'aq' }
		],
		[
			{ formula: 'CH3CH(OH)COO-', state: 'aq' },
			{ formula: 'H2O', state: 'l' }
		],
		{ display: true }
	);

	const exercises: ExerciseBlock[] = [
		{
			id: 'bac_2025_tm_phy_ex1',
			num: 'الأول',
			customTitle: 'الجزء الأول — التمرين الأول',
			points: 4,
			instruction:
				'ندرس الاهتزازات الميكانيكية الحرة لنواس مرن أفقي يتكوّن من جسم صلب $(S)$ كتلته $m = 200 "g"$ مربوط بنابض مرن حلقاته غير متلاصقة ثابت مرونته $k$، ينزلق دون احتكاك على مستوٍ أفقي. نزيح الجسم عن موضع توازنه $O$ بمقدار $X_m$ في الاتجاه الموجب ونحرره دون سرعة ابتدائية عند $t = 0$.',
			content: [
				{
					type: 'image',
					src: ex1XtUrl,
					caption: 'الشكل (1): المخطط الزمني للفاصلة x(t)',
					width: 360
				},
				{
					type: 'text',
					content:
						'1) مثّل القوى المؤثرة على الجسم $(S)$ أثناء حركته، ثم بتطبيق القانون الثاني لنيوتن أثبت المعادلة التفاضلية للفاصلة $x(t)$. \\\n2) يُعطى حل المعادلة التفاضلية بالشكل $x(t) = X_m cos(omega_0 t + varphi)$. حدّد عبارة $omega_0$ والدور الخاص $T_0$ بدلالة $m$ و $k$.',
					answer:
						'1) القوى المؤثرة: الثقل $arrow(P)$، رد فعل المستوي $arrow(R)_N$، وقوة إرجاع النابض $arrow(F) = -k x arrow(i)$. \\\nبالإسقاط على محور الحركة $O x$: $-k x = m frac(d^2 x, d t^2) arrow.r.double frac(d^2 x, d t^2) + frac(k, m) x = 0$.\n2) بالتعويض بالحل: $omega_0 = sqrt(frac(k, m))$ و $T_0 = 2 pi sqrt(frac(m, k))$.',
					mark: '1.25'
				},
				{
					type: 'text',
					content:
						'3) من الشكل (1)، حدّد السعة $X_m$، الطور الابتدائي $varphi$، والدور الخاص $T_0$، ثم استنتج ثابت مرونة النابض $k$. \\\n4) احسب السرعة العظمى $v_"max"$ والطاقة الميكانيكية $E_m$ للنواس. \\\n5) أكمل جدول التطابق (ميكانيك–كهرباء) بين النواس المرن الأفقي والدارة المهتزة $(L, C)$:',
					answer:
						'3) بيانياً: $X_m = "4,0" "cm" = "0,040" "m"$، عند $t = 0$ لدينا $x(0) = +X_m arrow.r.double cos varphi = 1 arrow.r.double varphi = 0 "rad"$. \\\nالدور الخاص: $T_0 = "0,628" "s" = "0,2" pi "s" arrow.r.double omega_0 = frac(2 pi, T_0) = 10 "rad" dot "s"^(-1)$. \\\nثابت المرونة: $k = m omega_0^2 = "0,20" times 10^2 = 20 "N" dot "m"^(-1)$.\n4) $v_"max" = omega_0 X_m = 10 times "0,040" = "0,40" "m" dot "s"^(-1)$، و $E_m = frac(1, 2) k X_m^2 = "0,5" times 20 times "0,040"^2 = "1,6" times 10^(-2) "J"$.\n5) التطابق: $x arrow.l.r q$، $v arrow.l.r i$، $m arrow.l.r L$، و $k arrow.l.r 1/C$.',
					mark: '2.75'
				}
			]
		},
		{
			id: 'bac_2025_tm_phy_ex2',
			num: 'الثاني',
			customTitle: 'الجزء الأول — التمرين الثاني',
			points: 4,
			instruction:
				'يعالج التمرين دراسة تحولين كيميائيين مستقلين: التفكك الذاتي للماء الأكسجيني واشتغال عمود فضة–نحاس. نعطي الحجم المولي للغازات $V_M = 24 "L" dot "mol"^(-1)$.',
			content: [
				{
					type: 'image',
					src: ex2O2Url,
					caption: 'الشكل (2): حجم غاز O2 المنطلق بدلالة الزمن',
					width: 355
				},
				{
					type: 'text',
					content:
						'*I. المتابعة الزمنية لتفكك الماء الأكسجيني:* نضع حجماً $V_0 = 50 "mL"$ من محلول ' +
						chemSpecies('H2O2', 'aq').typst +
						' تركيزه $c_0 = "0,40" "mol" dot "L"^(-1)$ مع بضع قطرات من محلول شوارد ' +
						chemSpecies('Fe^3+', 'aq').typst +
						'. \\\n1) ما دور شوارد الحديد الثلاثي؟ اكتب معادلة التفاعل التام الحادث وأكمل جدول التقدم التالي:',
					answer:
						'*I.* 1) شوارد الحديد الثلاثي ' +
						chemSpecies('Fe^3+', 'aq').typst +
						' تلعب دور *وسيط متجانس* لتسريع التفاعل. \\\nمعادلة التفاعل:\n' +
						ex2H2o2Eq.typst,
					mark: '1'
				},
				ex2Ice.typstBlock,
				{
					type: 'text',
					content:
						'2) حدّد بيانياً زمن نصف التفاعل $t_(1/2)$، واحسب السرعة الحجمية للتفاعل عند $t = 0$ بـ $"mmol" dot "L"^(-1) dot "min"^(-1)$.',
					answer:
						'2) عند $t = t_(1/2)$ يكون $V_("O"_2) = V_f / 2 = 120 "mL" arrow.r.double t_(1/2) = "6,0" "min"$. \\\n$v_"vol"(0) = frac(1, V_0 V_M) lr(|frac(d V_("O"_2), d t)|)_0 = frac(1, "0,050" times 24) times frac(240 times 10^(-3), "8,66") approx "0,023" "mol" dot "L"^(-1) dot "min"^(-1) = 23 "mmol" dot "L"^(-1) dot "min"^(-1)$.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'*II. العمود الكهربائي فضة–نحاس:* ننجز عموداً معادلته المنمذجة:\n' +
						ex2CellEq.typst +
						'\nثابت توازنه $K = 2 times 10^(15)$. إذا كانت التراكيز الابتدائية $["Ag"^+]_i = "0,10" "mol" dot "L"^(-1)$ و $["Cu"^(2+)]_i = "0,010" "mol" dot "L"^(-1)$، حدّد جهة التطور التلقائي للعمود وقطبيته.',
					answer:
						'*II.* $Q_(r,i) = frac(["Cu"^(2+)]_i, ["Ag"^+]_i^2) = frac("0,010", "0,10"^2) = "1,0" < K$. \\\nتتطور الجملة في الاتجاه المباشر: صفيحة النحاس ' +
						chemSpecies('Cu', 's').typst +
						' هي المصعد (القطب السالب) وصفيحة الفضة ' +
						chemSpecies('Ag', 's').typst +
						' هي المهبط (القطب الموجب).',
					mark: '1.5'
				}
			]
		},
		{
			id: 'bac_2025_tm_phy_ex3',
			num: 'الثالث',
			customTitle: 'الجزء الأول — التمرين الثالث',
			points: 6,
			instruction:
				'تحتوي الدارة الكهربائية الموضحة في الشكل (3) على مولد مثالي للتوتر $E = 12 "V"$، ناقل أومي مقاومته $R = 40 Omega$، وشيعة $(L, r)$، وقاطعة $K$. نغلق القاطعة عند $t = 0$ ونسجل تطور شدة التيار $i(t)$ (الشكل 4).',
			content: [
				{
					type: 'columns',
					children: [
						{ type: 'image', src: ex3RlCircuitUrl, caption: 'الشكل (3): الدارة RL', width: 300 },
						{ type: 'image', src: ex3ItUrl, caption: 'الشكل (4): منحنى تطور شدة التيار i(t)', width: 340 }
					]
				},
				{
					type: 'text',
					content:
						'1) اكتب المعادلة التفاضلية التي تحقّقها شدة التيار $i(t)$ أثناء تأسيس التيار، ثم بيّن أن $i(t) = I_p (1 - e^(-t / tau))$ حل لها محدّداً عبارتي $I_p$ و $tau$.',
					answer:
						'1) قانون جمع التوترات: $L frac(d i, d t) + (R + r) i = E arrow.r.double frac(d i, d t) + frac(R + r, L) i = frac(E, L)$. \\\nبالتعويض بالحل: $I_p = frac(E, R + r)$ و $tau = frac(L, R + r)$.',
					mark: '1.75'
				},
				{
					type: 'text',
					content:
						'2) استنتج من الشكل (4) قيمتي $I_p$ و $tau$، ثم احسب المقاومة الداخلية $r$ للوشيعة وذاتيتها $L$. \\\n3) احسب شدة التيار $i$ عند اللحظة $t = tau$، ثم احسب الطاقة المغناطيسية المخزنة في الوشيعة عند النظام الدائم وعند $t = tau$.',
					answer:
						'2) بيانياً: $I_p = "0,24" "A"$ و $tau = "5,0" "ms"$. \\\n$R + r = frac(E, I_p) = frac(12, "0,24") = 50 Omega arrow.r.double r = 50 - 40 = 10 Omega$. \\\n$L = tau (R + r) = "5,0" times 10^(-3) times 50 = "0,25" "H"$.\n3) عند $t = tau$: $i(tau) = "0,63" I_p = "0,63" times "0,24" approx "0,151" "A"$. \\\nالطاقة في النظام الدائم: $E_L(oo) = frac(1, 2) L I_p^2 = "0,5" times "0,25" times "0,24"^2 = "7,2" times 10^(-3) "J" = "7,2" "mJ"$. \\\nعند $t = tau$: $E_L(tau) = frac(1, 2) L i(tau)^2 = "0,5" times "0,25" times "0,151"^2 approx "2,85" "mJ"$.',
					mark: '2.75'
				},
				{
					type: 'text',
					content:
						'4) اكتب عبارة التوتر $u_b(t)$ بين طرفي الوشيعة بدلالة الزمن $t$، ثم احسب قيمته عند $t = 0$ وعند النظام الدائم.',
					answer:
						'4) $u_b(t) = E - R i(t) = 12 - "9,6" (1 - e^(-t / 5))$ (حيث $t$ بـ $"ms"$)، أي $u_b(t) = "2,4" + "9,6" e^(-t / 5) "V"$. \\\nعند $t = 0$: $u_b(0) = E = 12 "V"$؛ وفي النظام الدائم: $u_b(oo) = r I_p = 10 times "0,24" = "2,4" "V"$.',
					mark: '1.5'
				}
			]
		},
		{
			id: 'bac_2025_tm_phy_ex4',
			num: 'الرابع',
			customTitle: 'الجزء الثاني — التمرين التجريبي',
			points: 6,
			instruction:
				'لتقييم طزاجة حليب بقري عن طريق قياس حموضته الناتجة عن حمض اللبن ' +
				chemSpecies('CH3CH(OH)COOH', 'aq').typst +
				' ($M = 90 "g" dot "mol"^(-1)$)، يعاير مخبري حجماً $V_a = 20 "mL"$ من الحليب بواسطة محلول هيدروكسيد الصوديوم تركيزه $c_b = "0,050" "mol" dot "L"^(-1)$. يُعتبر الحليب طازجاً إذا لم يتجاوز التركيز الكتلي لحمض اللبن فيه القيمة $C_(m,"max") = "1,80" "g" dot "L"^(-1)$.',
			content: [
				{
					type: 'columns',
					children: [
						{ type: 'image', src: ex4TitrationSetupUrl, caption: 'الشكل (5): تجهيز المعايرة الـ pH-مترية', width: 300 },
						{ type: 'image', src: ex4PhUrl, caption: 'الشكل (6): منحنى المعايرة pH(Vb)', width: 340 }
					]
				},
				{
					type: 'text',
					content:
						'1) ما الغرض من إضافة الماء المقطر إلى الحليب في البيشر قبل بدء المعايرة (كي لا تتغير كمية مادة الحمض)، وهل يؤثر ذلك على حجم التكافؤ $V_(b E)$؟ \\\n2) اكتب معادلة تفاعل المعايرة، واذكر مميزاته.',
					answer:
						'1) نضيف الماء المقطر لغمر مسبار جهاز الـ $"pH"$-متر جيداً دون التأثير على كمية مادة الحمض المعايَر؛ وبالتالي لا يتغير حجم التكافؤ $V_(b E)$.\n2) معادلة المعايرة:\n' +
						ex4TitrationEq.typst +
						'\nتفاعل المعايرة سريع وتام ووحيد.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3) استخرج من الشكل (6) إحداثيي نقطة التكافؤ، ثم احسب التركيز المولي $c_a$ لحمض اللبن في الحليب المدروس. \\\n4) استنتج قيمة $"pK"_A$ للثنائية $("حمض اللبن / شاردة اللاكتات")$، وحدّد النوع الغالب عند $"pH" = "5,0"$.',
					answer:
						'3) بطريقة المماسات: $E(V_(b E) = 12 "mL" ; "pH"_E = "8,2")$. \\\nعند التكافؤ: $c_a = frac(c_b V_(b E), V_a) = frac("0,050" times 12, 20) = "0,030" "mol" dot "L"^(-1)$.\n4) عند نصف التكافؤ ($V_b = 6 "mL"$): $"pK"_A = "pH" = "3,9"$. \\\nعند $"pH" = "5,0" > "pK"_A$: النوع الأساسي المرافق (شاردة اللاكتات ' +
						chemSpecies('CH3CH(OH)COO-', 'aq').typst +
						') هو الغالب.',
					mark: '2.25'
				},
				{
					type: 'text',
					content:
						'5) احسب التركيز الكتلي $C_m$ لحمض اللبن في الحليب، ثم استنتج هل هذا الحليب طازج أم فاسد؟ \\\n6) اقترح كاشفاً ملوناً مناسباً لهذه المعايرة من بين: الهيليانتين $["3,1" - "4,4"]$، أزرق البروموتيمول $["6,0" - "7,6"]$، الفينول فتالين $["8,2" - "10,0"]$. علّل.',
					answer:
						'5) التركيز الكتلي: $C_m = c_a dot M = "0,030" times 90 = "2,70" "g" dot "L"^(-1)$. \\\nبما أن $C_m = "2,70" "g" dot "L"^(-1) > "1,80" "g" dot "L"^(-1)$، فالحليب غير طازج (متخثر/فاسد).\n6) الكاشف المناسب هو *الفينول فتالين* لأن مجال تغيره اللوني $["8,2" - "10,0"]$ يشمل قيمة $"pH"_E = "8,2"$ (أو عند حدودها).',
					mark: '2.25'
				}
			]
		}
	];

	return buildRecord('2025', exercises, 1);
}

export function buildOfficialPhysicsBac3asTm(): OfficialBacPhysicsPaperRecord[] {
	return [buildBac2023TmPhysics(), buildBac2024TmPhysics(), buildBac2025TmPhysics()];
}
