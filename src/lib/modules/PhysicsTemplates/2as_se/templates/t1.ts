import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate
} from '../../types';
import { adaptPhysicsTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { chemSpecies } from '../../chem-helpers';
import { savePhysicsSvgAsset, svgPhysicsCurvePlot } from '../../svg-physics';
import { SHARED_TEMPLATES_2AS_T1 } from '../../secondary_shared_2as/templates/t1';

// ============================================================================
// 2AS SE Templates - Trimester 1 (7 templates: 5 non-integration + 2 integration)
// Strictly excludes TM/MATH topics (rotational energy, induction, AC)
// ============================================================================

// SE-Specialized 1: Energy Chain, Energy Balance & Transfer Power (4 pts)
export const tpl2asSeT1EnergyBalancePower: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_se_t1_energy_balance_power',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'energy',
	titleAr: 'السلسلة الطاقوية، الحصيلة الطاقوية، واستطاعة التحويل',
	curriculumLessonId: 'phy_lesson_2as_se_t1_qualitative_energy_conservation',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const m = rng.pick(difficulty === 'easy' ? [40, 50, 60] : [50, 75, 80]);
		const g = 10;
		const h = rng.pick([10, 12, 15, 20]);
		const dtSec = rng.pick([10, 12, 15, 20]);
		const wUseful = roundTo(m * g * h, 1);
		const pUseful = roundTo(wUseful / dtSec, 1);
		const etaPct = rng.pick(difficulty === 'easy' ? [80] : [75, 80, 85]);
		const pElec = roundTo((pUseful * 100) / etaPct, 1);
		const qLost = roundTo((pElec - pUseful) * dtSec, 1);

		const mcq = buildUniqueMcqOptions(
			`$P_u = ${pUseful}\\text{ W}\\quad ;\\quad P_a = ${pElec}\\text{ W}$`,
			[
				{
					text: `$P_u = ${wUseful}\\text{ W}\\quad ;\\quad P_a = ${pElec}\\text{ W}$`,
					diagnosticFeedback: 'نسيت قسمة الطاقة المفيدة E = mgh على الزمن Δt لحساب الاستطاعة.'
				},
				{
					text: `$P_u = ${pUseful}\\text{ W}\\quad ;\\quad P_a = ${roundTo((pUseful * etaPct) / 100, 1)}\\text{ W}$`,
					diagnosticFeedback: 'الاستطاعة الكهربائية الممتصة أكبر من المفيدة (P_a = P_u / η).'
				},
				{
					text: `$P_u = ${roundTo(pUseful * 2, 1)}\\text{ W}\\quad ;\\quad P_a = ${roundTo(pElec * 2, 1)}\\text{ W}$`,
					diagnosticFeedback: 'تحقق من حساب الطاقة الميكانيكية mgh والاستطاعة P = E/Δt.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) أنشئ السلسلة الطاقوية ثم الحصيلة الطاقوية للجملة (حمولة + أرض) أثناء الصعود بسرعة ثابتة، واكتب معادلة انحفاظ الطاقة.`,
				answer: `1) السلسلة والحصيلة الطاقوية:\n- السلسلة: محرك كهربائي $(E_i, E_c)$ $arrow.r$ تحويل ميكانيكي $W_m$ $arrow.r$ (حمولة + أرض) $(E_"pp")$ ووسط خارجي $(Q)$.\n- الحصيلة للجملة (حمولة + أرض): عمود $E_"pp"$ يتزايد من $0$ إلى $E_"ppB"$ مع سهم داخل يمثل $W_m$ (بسبب سرعة ثابتة $Delta E_c = 0$).\n- معادلة انحفاظ الطاقة: $E_"ppA" + W_m = E_"ppB"$.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `2) احسب التحويل الميكانيكي المفيد $W_m = m g h$ ثم الاستطاعة الميكانيكية المفيدة $P_u$ للمحرك خلال مدة الصعود $Delta t = ${dtSec}" s"$ ($g = 10" m/s"^2$).`,
				answer: `2) الطاقة المفيدة والاستطاعة:\n- $W_m = m g h = ${m} times ${g} times ${h} = ${wUseful}" J"$.\n- $P_u = frac(W_m, Delta t) = frac(${wUseful}, ${dtSec}) = ${pUseful}" W"$.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `3) إذا كان مردود المحرك الكهربائي $eta = ${etaPct}\\%$، احسب الاستطاعة الكهربائية الممتصة $P_a$ والطاقة الحرارية الضائعة $Q$ للمحيط.`,
				answer: `3) الاستطاعة الممتصة والطاقة الضائعة:\n- $P_a = frac(P_u, eta) = frac(${pUseful}, ${etaPct / 100}) = ${pElec}" W"$.\n- الطاقة الضائعة: $Q = (P_a - P_u) dot Delta t = (${pElec} - ${pUseful}) times ${dtSec} = ${qLost}" J"$.`,
				mark: '1.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `يرفع محرك كهربائي مردوده $\\eta = ${etaPct}\\%$ حمولة كتلتها $m = ${m}\\text{ kg}$ بسرعة ثابتة نحو الأعلى بارتفاع $h = ${h}\\text{ m}$ خلال مدة $\\Delta t = ${dtSec}\\text{ s}$ ($g = 10\\text{ m/s}^2$).\nما هما الاستطاعة الميكانيكية المفيدة $P_u$ والاستطاعة الكهربائية الممتصة $P_a$؟`,
				questionTextAr: 'احسب الاستطاعة المفيدة $P_u$ والاستطاعة الممتصة $P_a$:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `الطاقة المفيدة $W_m = mgh = ${wUseful}\\text{ J}$، ومنه $P_u = W_m / \\Delta t = ${pUseful}\\text{ W}$ و $P_a = P_u / \\eta = ${pElec}\\text{ W}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يرفع محرك كهربائي حمولة كتلتها $m = ${m}" kg"$ بسرعة ثابتة على ارتفاع $h = ${h}" m"$ خلال مدة $Delta t = ${dtSec}" s"$ ($g = 10" m/s"^2$).`,
				content
			},
			hints: [
				`عند الصعود بسرعة ثابتة يكون تغير الطاقة الحركية معدوماً ($\\Delta E_c = 0$).`,
				`الاستطاعة المفيدة هي $P_u = \\frac{mgh}{\\Delta t}$.`,
				`المردود $\\eta = \\frac{P_u}{P_a} \\implies P_a = \\frac{P_u}{\\eta}$.`
			],
			solutionStepsAr: [
				`الحصيلة الطاقوية: تزايد $E_{pp}$ عبر تحويل ميكانيكي مكتسب $W_m$.`,
				`الاستطاعة المفيدة: $P_u = ${pUseful}\\text{ W}$.`,
				`الاستطاعة الممتصة $P_a = ${pElec}\\text{ W}$ والطاقة الضائعة $Q = ${qLost}\\text{ J}$.`
			],
			finalAnswer: `P_u = ${pUseful}\\text{ W}\\quad ;\\quad P_a = ${pElec}\\text{ W}`
		};
	}
};

// SE-Specialized 2 (Integration, Experimental): Calorimetry + Conductimetry (7 pts)
export const tpl2asSeT1IntegrationExperimentalConductimetry: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_se_t1_integration_experimental_conductimetry',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'التمرين التجريبي (2AS SE): المسعر الحراري وتعيين التركيز بالناقلية',
	curriculumLessonId: 'phy_lesson_2as_se_t1_internal_energy_calorimetry',
	defaultPoints: 7,
	isIntegration: true,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		// Part 1: Calorimetry melting ice in water
		const mWaterG = 250;
		const mWater = 0.25;
		const cWater = 4180;
		const cCal = 100;
		const thetaInit = rng.pick([25, 30, 35]);
		const mIceG = rng.pick([20, 25, 30]);
		const mIce = mIceG / 1000;
		const lFusion = 335000;
		// (mWater*cWater + cCal)*(thetaF - thetaInit) + mIce*lFusion + mIce*cWater*(thetaF - 0) = 0
		const capSys = mWater * cWater + cCal; // 1145
		const totalCap = capSys + mIce * cWater;
		const thetaF = roundTo((capSys * thetaInit - mIce * lFusion) / totalCap, 2);

		// Part 2: Conductimetry of NaCl physiological serum (diluted 100 times)
		const lambdaNa = 5.0;
		const lambdaCl = 7.6;
		const kSum = 12.6;
		const cDilutedMmol = rng.pick([1.5, 2.0, 2.5]); // mmol/L
		const sigmaMsM = roundTo(kSum * cDilutedMmol, 2);
		const cMotherMolL = roundTo((cDilutedMmol * 1e-3) * 100, 3);
		const massConcGL = roundTo(cMotherMolL * 58.5, 2);

		const svg = svgPhysicsCurvePlot({
			xMin: 0,
			xMax: 4,
			yMin: 0,
			yMax: 55,
			xStep: 1,
			yStep: 10,
			xLabel: 'C (mmol/L)',
			yLabel: 'σ (mS/m)',
			title: 'منحنى معايرة مصل فيزيولوجي مخفف (NaCl)',
			curves: [{ fn: (c) => kSum * c, color: '#2563eb', label: 'σ = 12.6·C' }],
			dashedGuides: [
				{ x1: cDilutedMmol, y1: 0, x2: cDilutedMmol, y2: sigmaMsM, color: '#dc2626' },
				{ x1: 0, y1: sigmaMsM, x2: cDilutedMmol, y2: sigmaMsM, color: '#dc2626' }
			],
			points: [{ x: cDilutedMmol, y: sigmaMsM, label: `C' = ${cDilutedMmol}`, color: '#dc2626' }]
		});
		const svgUrl = savePhysicsSvgAsset(`phy_2as_se_t1_exp_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$\\theta_f = ${thetaF}^\\circ\\text{C}\\quad ;\\quad C_0 = ${cMotherMolL}\\text{ mol/L}$`,
			[
				{
					text: `$\\theta_f = ${thetaF}^\\circ\\text{C}\\quad ;\\quad C_0 = ${roundTo(cDilutedMmol * 1e-3, 4)}\\text{ mol/L}$`,
					diagnosticFeedback: 'نسيت معامل التمديد (100 مرة) لإيجاد التركيز الأصلي C0 للمصل.'
				},
				{
					text: `$\\theta_f = ${roundTo((capSys * thetaInit) / totalCap, 2)}^\\circ\\text{C}\\quad ;\\quad C_0 = ${cMotherMolL}\\text{ mol/L}$`,
					diagnosticFeedback: 'أهملت الحرارة الكامنة لانصهار الجليد m·Lf في معادلة التوازن الحراري.'
				},
				{
					text: `$\\theta_f = ${roundTo(thetaF + 3.2, 2)}^\\circ\\text{C}\\quad ;\\quad C_0 = ${roundTo(cMotherMolL * 2, 3)}\\text{ mol/L}$`,
					diagnosticFeedback: 'تحقق من معادلة التوازن الحراري ومن معامل التمديد.'
				}
			],
			rng
		);

		const spNaCl = chemSpecies('NaCl', 'aq');
		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: 'منحنى معايرة الناقلية النوعية للمحلول المخفف 100 مرة',
				width: 320
			},
			{
				type: 'text',
				content: `الجزء الأول (المسعر الحراري): يحتوي مسعر سعته الحرارية $C_"cal" = ${cCal}" J/"deg"C"$ على $m_1 = ${mWaterG}" g"$ ماء عند $theta_1 = ${thetaInit} deg"C"$. ندخل فيه قطعة جليد كتلتها $m_2 = ${mIceG}" g"$ عند $0 deg"C"$ ($L_f = 335" kJ/kg"$، $c_"eau" = ${cWater}" J/(kg" dot deg"C)"$).\n1) احسب كمية الحرارة اللازمة لصهر الجليد كلياً، ثم اكتب معادلة التوازن الحراري واحسب درجة الحرارة النهائية $theta_f$.`,
				answer: `1) التوازن الحراري في المسعر:\n- حرارة انصهار الجليد: $Q_f = m_2 L_f = ${mIce} times 335000 = ${roundTo(mIce * lFusion, 1)}" J"$.\n- معادلة التوازن ($sum Q_i = 0$):\n$(m_1 c_"eau" + C_"cal")(theta_f - ${thetaInit}) + m_2 L_f + m_2 c_"eau"(theta_f - 0) = 0$\n$${capSys}(theta_f - ${thetaInit}) + ${roundTo(mIce * lFusion, 1)} + ${roundTo(mIce * cWater, 1)} theta_f = 0$\n$theta_f = ${thetaF} deg"C"$.`,
				mark: '3.5'
			},
			{
				type: 'text',
				content: `الجزء الثاني (الناقلية - تحليل مصل فيزيولوجي): نخفف عينة من مصل فيزيولوجي (${spNaCl.typst}) $100$ مرة للحصول على محلول مخفف تركيزه $C'$ وناقلية نوعية مقاسة $sigma = ${sigmaMsM}" mS/m"$.\n2) بالاعتماد على البيان وقانون كولروش ($lambda_("Na"^+) = ${lambdaNa}, lambda_("Cl"^-) = ${lambdaCl}$ بـ $"mS" dot "m"^2/"mol"$)، استنتج التركيز $C'$ ثم التركيز المولي الأصلي $C_0$ والتركيز الكتلي $C_m$ للمصل ($M("NaCl") = 58.5" g/mol"$).`,
				answer: `2) تحديد تراكيز المصل الفيزيولوجي:\n- من البيان أو بقانون كولروش: $sigma = (${lambdaNa} + ${lambdaCl}) C' = ${kSum} C' arrow.r.double C' = frac(${sigmaMsM}, ${kSum}) = ${cDilutedMmol}" mmol/L" = ${roundTo(cDilutedMmol * 1e-3, 5)}" mol/L"$.\n- التركيز المولي للمصل الأصلي (قبل التمديد $100$ مرة): $C_0 = 100 C' = ${cMotherMolL}" mol/L"$.\n- التركيز الكتلي: $C_m = C_0 dot M = ${cMotherMolL} times 58.5 = ${massConcGL}" g/L"$.`,
				mark: '3.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في تمرين تجريبي (2AS SE): (1) نُذيب $${mIceG}\\text{ g}$ جليد عند $0^\\circ\\text{C}$ داخل مسعر ($C_{\\text{cal}} = ${cCal}\\text{ J/}^\\circ\\text{C}$) به $${mWaterG}\\text{ g}$ ماء عند $${thetaInit}^\\circ\\text{C}$. (2) نخفف مصلاً فيزيولوجياً (${spNaCl.katex}) $100$ مرة فنقيس $\\sigma = ${sigmaMsM}\\text{ mS/m}$ (انظر البيان).\nما هما درجتا التوازن $\\theta_f$ والتركيز المولي الأصلي $C_0$؟`,
				questionTextAr: 'اختر القيمتين الصحيحتين لـ $\\theta_f$ و $C_0$:',
				imageUrl: svgUrl,
				imageCaption: 'منحنى معايرة المصل الفيزيولوجي المخفف',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `بتطبيق التوازن الحراري نجد $\\theta_f = ${thetaF}^\\circ\\text{C}$، ومن البيان $C' = ${cDilutedMmol}\\text{ mmol/L}$ وبعد الضرب في معامل التمديد $100$ نجد $C_0 = ${cMotherMolL}\\text{ mol/L}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'الجزء الثاني: التمرين التجريبي (2AS SE)',
				instruction: 'يعالج التمرين تجربة قياس التوازن الحراري في مسعر ثم مراقبة نوعية مصل فيزيولوجي بقياس الناقلية.',
				content
			},
			hints: [
				`تأكد من إدراج حرارة انصهار الجليد $m_2 L_f$ ثم حرارة تسخين الماء الناتج عن الجليد من $0^\\circ\\text{C}$ إلى $\\theta_f$.`,
				`البيان يعطي التركيز المخفف $C'$ بوحدة $\\text{mmol/L}$.`,
				`التركيز الأصلي يساوي التركيز المخفف مضروباً في معامل التمديد $F = 100$.`
			],
			solutionStepsAr: [
				`كتابة معادلة التوازن الحراري وإيجاد $\\theta_f = ${thetaF}^\\circ\\text{C}$.`,
				`استنتاج التركيز المخفف $C' = ${cDilutedMmol}\\text{ mmol/L}$.`,
				`حساب التركيز الأصلي $C_0 = ${cMotherMolL}\\text{ mol/L}$ والكتلي $C_m = ${massConcGL}\\text{ g/L}$.`
			],
			finalAnswer: `\\theta_f = ${thetaF}^\\circ\\text{C}\\quad ;\\quad C_0 = ${cMotherMolL}\\text{ mol/L}\\quad ;\\quad C_m = ${massConcGL}\\text{ g/L}`
		};
	}
};

export const PHYSICS_TEMPLATES_2AS_SE_T1: PhysicsParameterizedTemplate[] = [
	tpl2asSeT1EnergyBalancePower,
	adaptPhysicsTemplateForTrack(SHARED_TEMPLATES_2AS_T1[0], '2as_se'),
	adaptPhysicsTemplateForTrack(SHARED_TEMPLATES_2AS_T1[1], '2as_se'),
	adaptPhysicsTemplateForTrack(SHARED_TEMPLATES_2AS_T1[2], '2as_se'),
	adaptPhysicsTemplateForTrack(SHARED_TEMPLATES_2AS_T1[3], '2as_se'),
	adaptPhysicsTemplateForTrack(SHARED_TEMPLATES_2AS_T1[4], '2as_se'),
	tpl2asSeT1IntegrationExperimentalConductimetry
];
