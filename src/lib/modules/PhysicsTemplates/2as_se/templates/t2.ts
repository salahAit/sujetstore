import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate
} from '../../types';
import { adaptPhysicsTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { buildIceTable, chemEquation, chemSpecies } from '../../chem-helpers';
import {
	savePhysicsSvgAsset,
	svgCircuitDiagram,
	svgPhysicsCurvePlot
} from '../../svg-physics';
import { SHARED_TEMPLATES_2AS_T2 } from '../../secondary_shared_2as/templates/t2';

// ============================================================================
// 2AS SE Templates - Trimester 2 (7 templates: 5 non-integration + 2 integration)
// Strictly excludes TM/MATH topics (rotational energy, induction, AC, transformers)
// ============================================================================

// SE-Specialized 1: Household Electrical Safety & Energy Citizenship (4 pts)
export const tpl2asSeT2ElectricitySafetyEfficiency: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_se_t2_electricity_safety_efficiency',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'electricity',
	titleAr: 'الأمن الكهربائي في الشبكة المنزلية والطاقة والمواطنة',
	curriculumLessonId: 'phy_lesson_2as_se_t2_electricity_daily_life',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const uMains = 220;
		const pHeater = rng.pick(difficulty === 'easy' ? [1100, 2200] : [1320, 1760, 2200]);
		const pLamp = rng.pick([110, 220]);
		const iHeater = roundTo(pHeater / uMains, 2);
		const iLamp = roundTo(pLamp / uMains, 2);
		const iTotal = roundTo(iHeater + iLamp, 2);
		const hours = rng.pick([2, 3, 4]);
		const eKwh = roundTo(((pHeater + pLamp) / 1000) * hours, 3);
		const fuseRating = iHeater <= 6 ? 8 : iHeater <= 10 ? 12 : 16;

		const svg = svgCircuitDiagram({ kind: 'household_safety' });
		const svgUrl = savePhysicsSvgAsset(`phy_2as_se_t2_safety_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$I_{\\text{tot}} = ${iTotal}\\text{ A}\\quad ;\\quad E = ${eKwh}\\text{ kWh}$`,
			[
				{
					text: `$I_{\\text{tot}} = ${roundTo(iTotal * 2, 2)}\\text{ A}\\quad ;\\quad E = ${eKwh}\\text{ kWh}$`,
					diagnosticFeedback: 'راجع قسمة الاستطاعة الكلية على التوتر U = 220 V.'
				},
				{
					text: `$I_{\\text{tot}} = ${iTotal}\\text{ A}\\quad ;\\quad E = ${roundTo(eKwh * 1000, 1)}\\text{ kWh}$`,
					diagnosticFeedback: 'نسيت تحويل الاستطاعة من الواط إلى الكيلوواط لحساب الطاقة بـ kWh.'
				},
				{
					text: `$I_{\\text{tot}} = ${iHeater}\\text{ A}\\quad ;\\quad E = ${roundTo(eKwh / 2, 3)}\\text{ kWh}$`,
					diagnosticFeedback: 'في التوصيل على التفرع تُجمع شدات التيار للأجهزة المشتغلة معاً.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: 'مخطط الشبكة الكهربائية المنزلية وأجهزة الحماية',
				width: 310
			},
			{
				type: 'text',
				content: `1) اذكر دور كل من: المنصهرة (وعلى أي سلك توصل؟)، القاطع التفاضلي، والمأخذ الأرضي في التركيب المنزلي الممثل في الشكل.`,
				answer: `1) قواعد الأمن الكهربائي:\n- المنصهرة: تحمي الأجهزة من الاستقصار وتُوصل دوماً على سلك الطور ($"Ph"$).\n- القاطع التفاضلي: يقطع التيار تلقائياً عند تجاوز الشدة العظمى أو تسرب تيار نحو الأرض.\n- المأخذ الأرضي ($"T"$): يحمي الأشخاص من الصعق بتفريغ التيار المتسرب إلى الأرض.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `2) احسب شدة التيار المارة في كل جهاز، ثم الشدة الكلية $I_"tot"$ عند تشغيلهما معاً على التفرع تحت توتر $U = ${uMains}" V"$، وحدد عيار المنصهرة المناسب للمدفأة (من بين: $2" A", 8" A", 12" A", 16" A"$).`,
				answer: `2) حساب شدات التيار:\n- المدفأة: $I_1 = frac(${pHeater}, ${uMains}) = ${iHeater}" A"$ (نختار منصهرة عيارها $${fuseRating}" A"$).\n- الإنارة: $I_2 = frac(${pLamp}, ${uMains}) = ${iLamp}" A"$.\n- الشدة الكلية: $I_"tot" = I_1 + I_2 = ${iHeater} + ${iLamp} = ${iTotal}" A"$.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `3) احسب الطاقة الكهربائية المستهلكة $E$ بوحدة $"kWh"$ عند اشتغالهما معاً لمدة $${hours}" h"$، واقترح إجراءين لترشيد استهلاك الطاقة.`,
				answer: `3) الاستهلاك والترشيد:\n- الاستطاعة الكلية: $P_"tot" = ${pHeater + pLamp}" W" = ${roundTo((pHeater + pLamp) / 1000, 3)}" kW"$.\n- الطاقة المستهلكة: $E = P_"tot" dot Delta t = ${roundTo((pHeater + pLamp) / 1000, 3)} times ${hours} = ${eKwh}" kWh"$.\n- للترشيد: استعمال مصابيح $"LED"$، العزل الحراري للمنزل، والاستفادة من الطاقة الشمسية.`,
				mark: '1.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في شبكة منزلية توترها الفعال $U = ${uMains}\\text{ V}$، نُشغّل على التفرع جهاز تدفئة ($P_1 = ${pHeater}\\text{ W}$) ومجموعة مصابيح ($P_2 = ${pLamp}\\text{ W}$) لمدة $${hours}\\text{ h}$.\nما هما شدة التيار الكلية $I_{\\text{tot}}$ والطاقة المستهلكة $E$ بوحدة $\\text{kWh}$؟`,
				questionTextAr: 'احسب الشدة الكلية $I_{\\text{tot}}$ والطاقة المستهلكة $E$:',
				imageUrl: svgUrl,
				imageCaption: 'مخطط الأمن الكهربائي المنزلي',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `الشدة الكلية $I_{\\text{tot}} = \\frac{${pHeater}+${pLamp}}{${uMains}} = ${iTotal}\\text{ A}$، والطاقة $E = \\frac{${pHeater}+${pLamp}}{1000}\\times ${hours} = ${eKwh}\\text{ kWh}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `تشتغل في منزل تحت التوتر $U = ${uMains}" V"$ مدفأة كهربائية استطاعتها $P_1 = ${pHeater}" W"$ وجهاز إنارة استطاعته $P_2 = ${pLamp}" W"$ موصولان على التفرع.`,
				content
			},
			hints: [
				`تحسب شدة التيار في كل جهاز بالعلاقة $I = P / U$.`,
				`في التفرع تُجمع شدات التيار $I_{\\text{tot}} = I_1 + I_2$.`,
				`للحصول على الطاقة بـ $\\text{kWh}$: حول الاستطاعة إلى $\\text{kW}$ ثم اضرب في الزمن بالساعات.`
			],
			solutionStepsAr: [
				`تبيان دور المنصهرة (على الطور)، القاطع التفاضلي، والمأخذ الأرضي.`,
				`حساب الشدات: $I_1 = ${iHeater}\\text{ A}$، $I_2 = ${iLamp}\\text{ A}$، $I_{\\text{tot}} = ${iTotal}\\text{ A}$.`,
				`حساب الطاقة: $E = ${eKwh}\\text{ kWh}$.`
			],
			finalAnswer: `I_{\\text{tot}} = ${iTotal}\\text{ A}\\quad ;\\quad E = ${eKwh}\\text{ kWh}`
		};
	}
};

// SE-Specialized 2 (Integration, Experimental): Conductimetric Titration & Commercial Vinegar Purity (7 pts)
export const tpl2asSeT2IntegrationConductimetricTitration: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_se_t2_integration_conductimetric_titration',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'التمرين التجريبي (2AS SE): معايرة الخل التجاري بالناقلية وتعيين النقاوة',
	curriculumLessonId: 'phy_lesson_2as_se_t2_acid_base_titration',
	defaultPoints: 7,
	isIntegration: true,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const vaMl = 20;
		const cb = 0.1;
		const vbeMl = rng.pick([12, 14, 16]);
		const caDiluted = roundTo((cb * vbeMl) / vaMl, 4); // e.g., 0.06, 0.07, 0.08 mol/L
		const dilFactor = 10;
		const c0 = roundTo(caDiluted * dilFactor, 3); // 0.6, 0.7, 0.8 mol/L
		const massPerLitreG = roundTo(c0 * 60, 2); // M(CH3COOH) = 60 g/mol
		const densityGPerL = 1000;
		const purityPct = roundTo((massPerLitreG / densityGPerL) * 100, 2);

		const spAcid = chemSpecies('CH3COOH', 'aq');
		const spBase = chemSpecies('HO-', 'aq');
		const spAcetate = chemSpecies('CH3COO-', 'aq');
		const spWater = chemSpecies('H2O', 'l');
		const eq = chemEquation(
			[
				{ formula: 'CH3COOH', state: 'aq' },
				{ formula: 'HO-', state: 'aq' }
			],
			[
				{ formula: 'CH3COO-', state: 'aq' },
				{ formula: 'H2O', state: 'l' }
			]
		);

		const ice = buildIceTable({
			equation: eq,
			speciesHeaders: [spAcid, spBase, spAcetate, spWater],
			initial: [
				{ katex: `$C_a V_a$`, typst: `$C_a V_a$` },
				{ katex: `$C_b V_b$`, typst: `$C_b V_b$` },
				{ katex: `$0$`, typst: `$0$` },
				{ katex: 'بوفرة', typst: 'بوفرة' }
			],
			intermediate: [
				{ katex: `$C_a V_a - x$`, typst: `$C_a V_a - x$` },
				{ katex: `$C_b V_b - x$`, typst: `$C_b V_b - x$` },
				{ katex: `$x$`, typst: `$x$` },
				{ katex: 'بوفرة', typst: 'بوفرة' }
			],
			final: [
				{ katex: `$0$`, typst: `$0$` },
				{ katex: `$0$`, typst: `$0$` },
				{ katex: `$x_E = C_b V_{bE}$`, typst: `$x_E = C_b V_"bE"$` },
				{ katex: 'بوفرة', typst: 'بوفرة' }
			]
		});

		const svg = svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 24,
			yMin: 0,
			yMax: 10,
			xStep: 4,
			yStep: 2,
			xLabel: 'Vb (mL)',
			yLabel: 'σ (mS/cm)',
			title: 'منحنى معايرة محلول خل مخفف 10 مرات بواسطة الصودا',
			curves: [
				{
					fn: (v) => (v <= vbeMl ? 1.2 + 0.14 * v : 1.2 + 0.14 * vbeMl + 0.45 * (v - vbeMl)),
					color: '#2563eb',
					label: 'σ(Vb)'
				}
			],
			dashedGuides: [
				{
					x1: vbeMl,
					y1: 0,
					x2: vbeMl,
					y2: roundTo(1.2 + 0.14 * vbeMl, 2),
					color: '#dc2626',
					label: `VbE = ${vbeMl} mL`,
					labelPos: 'right'
				}
			],
			points: [{ x: vbeMl, y: roundTo(1.2 + 0.14 * vbeMl, 2), label: 'E', color: '#dc2626' }]
		});
		const svgUrl = savePhysicsSvgAsset(`phy_2as_se_t2_exp_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$C_0 = ${c0}\\text{ mol/L}\\quad ;\\quad P = ${purityPct}\\%$`,
			[
				{
					text: `$C_0 = ${caDiluted}\\text{ mol/L}\\quad ;\\quad P = ${roundTo(purityPct / 10, 2)}\\%$`,
					diagnosticFeedback: 'نسيت الضرب في معامل التمديد 10 لإيجاد التركيز الأصلي للخل التجاري.'
				},
				{
					text: `$C_0 = ${c0}\\text{ mol/L}\\quad ;\\quad P = ${roundTo(purityPct * 2, 2)}\\%$`,
					diagnosticFeedback: 'تحقق من حساب الدرجة الحمضية: الكتلة المولية لحمض الإيثانويك 60 g/mol.'
				},
				{
					text: `$C_0 = ${roundTo(c0 / 2, 3)}\\text{ mol/L}\\quad ;\\quad P = ${roundTo(purityPct / 2, 2)}\\%$`,
					diagnosticFeedback: 'راجع القراءة البيانية لحجم التكافؤ VbE وعلاقة التكافؤ.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: 'منحنى تغير الناقلية النوعية σ بدلالة حجم الصودا المضاف Vb',
				width: 320
			},
			{
				type: 'text',
				content: `1) اذكر البروتوكول التجريبي لتخفيف الخل التجاري $10$ مرات للحصول على $100" mL"$ من المحلول المخفف، ثم اكتب معادلة تفاعل المعايرة وجدول التقدم.`,
				answer: `1) البروتوكول والمعادلة:\n- نأخذ حجماً $V_0 = 10" mL"$ من الخل التجاري بماصة عيارية، ونضعه في حوجلة عيارية سعتها $100" mL"$ ثم نكمل بالماء المقطر إلى خط العيار مع الرج.\n- معادلة التفاعل: ${eq.typst}`,
				mark: '2.0'
			},
			ice.typstBlock,
			{
				type: 'text',
				content: `2) فسر تغير ميل المستقيم قبل التكافؤ وبعده (لماذا تزداد الناقلية ببطء قبل التكافؤ ثم بسرعة بعده؟)، ثم عيّن بيانياً حجم التكافؤ $V_"bE"$.`,
				answer: `2) التفسير والحجم المكافئ:\n- قبل التكافؤ يتفكك الحمض الضعيف وتُنتج شوارد $"CH"_3"COO"^-$ و $"Na"^+$ فتزداد الناقلية ببطء.\n- بعد التكافؤ تتراكم شوارد $"HO"^-$ ($lambda$ كبيرة) و $"Na"^+$ فتزداد الناقلية بسرعة أكبر.\n- من تقاطع نصفي المستقيمين: $V_"bE" = ${vbeMl}" mL"$.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `3) احسب التركيز المولي للمحلول المخفف $C_a$، ثم استنتج التركيز المولي الأصلي $C_0$ للخل والدرجة الحمضية (النقاوة الكتلية في $100" g"$ من الخل) علماً أن $M("CH"_3"COOH") = 60" g/mol"$ والكتلة الحجمية للخل $rho = 1000" g/L"$.`,
				answer: `3) الحساب الكمي والنقاوة:\n- $C_a = frac(C_b dot V_"bE", V_a) = frac(${cb} times ${vbeMl}, ${vaMl}) = ${caDiluted}" mol/L"$.\n- التركيز الأصلي: $C_0 = 10 dot C_a = ${c0}" mol/L"$.\n- الكتلة في $1" L"$: $m = C_0 dot M = ${c0} times 60 = ${massPerLitreG}" g"$.\n- الدرجة الحمضية: $P = frac(${massPerLitreG}, ${densityGPerL}) times 100 = ${purityPct}\\%$.`,
				mark: '3.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `للتحقق من الدرجة الحمضية لخل تجاري (${spAcid.katex}) كتلته الحجمية $1000\\text{ g/L}$، نمدده $10$ مرات ثم نعاير حجماً $V_a = ${vaMl}\\text{ mL}$ منه بمحلول هيدروكسيد الصوديوم ($C_b = ${cb}\\text{ mol/L}$) كما يوضح البيان ($V_{bE} = ${vbeMl}\\text{ mL}$).\nما هما التركيز الأصلي $C_0$ والدرجة الحمضية $P$؟`,
				questionTextAr: 'احسب التركيز الأصلي $C_0$ والدرجة الحمضية $P$:',
				imageUrl: svgUrl,
				imageCaption: 'منحنى المعايرة الناقلية للخل التجاري',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `عند التكافؤ $C_a = \\frac{${cb}\\times ${vbeMl}}{${vaMl}} = ${caDiluted}\\text{ mol/L}$، ومع معامل التمديد $10$ يكون $C_0 = ${c0}\\text{ mol/L}$ والدرجة الحمضية $P = \\frac{${c0}\\times 60}{1000}\\times 100 = ${purityPct}\\%$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'الجزء الثاني: التمرين التجريبي (المعايرة الناقلية للخل)',
				instruction: `نريد مراقبة جودة خل تجاري يحتوي على حمض الإيثانويك (${spAcid.typst}). نمدد الخل $10$ مرات، ثم نأخذ حجماً $V_a = ${vaMl}" mL"$ من المحلول المخفف ونعايره بمحلول الصودا تركيزه $C_b = ${cb}" mol/L"$ بمتابعة الناقلية النوعية.`,
				content
			},
			hints: [
				`لتحضير $100\\text{ mL}$ مخففة $10$ مرات نأخذ $10\\text{ mL}$ من المحلول الأصلي.`,
				`نقطة التكافؤ هي تقاطع نصفي المستقيمين عند $V_{bE} = ${vbeMl}\\text{ mL}$.`,
				`الدرجة الحمضية هي كتلة الحمض النقي في $100\\text{ g}$ من الخل التجاري.`
			],
			solutionStepsAr: [
				`تحديد $V_{bE} = ${vbeMl}\\text{ mL}$ وحساب $C_a = ${caDiluted}\\text{ mol/L}$.`,
				`استنتاج التركيز الأصلي $C_0 = 10 C_a = ${c0}\\text{ mol/L}$.`,
				`حساب الدرجة الحمضية: $P = ${purityPct}\\%$.`
			],
			finalAnswer: `C_0 = ${c0}\\text{ mol/L}\\quad ;\\quad P = ${purityPct}\\%`
		};
	}
};

export const PHYSICS_TEMPLATES_2AS_SE_T2: PhysicsParameterizedTemplate[] = [
	adaptPhysicsTemplateForTrack(SHARED_TEMPLATES_2AS_T2[0], '2as_se'),
	adaptPhysicsTemplateForTrack(SHARED_TEMPLATES_2AS_T2[1], '2as_se'),
	adaptPhysicsTemplateForTrack(SHARED_TEMPLATES_2AS_T2[2], '2as_se'),
	adaptPhysicsTemplateForTrack(SHARED_TEMPLATES_2AS_T2[3], '2as_se'),
	tpl2asSeT2ElectricitySafetyEfficiency,
	adaptPhysicsTemplateForTrack(SHARED_TEMPLATES_2AS_T2[4], '2as_se'),
	tpl2asSeT2IntegrationConductimetricTitration
];
