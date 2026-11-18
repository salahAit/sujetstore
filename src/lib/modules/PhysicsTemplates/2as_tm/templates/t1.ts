import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate
} from '../../types';
import { adaptPhysicsTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { savePhysicsSvgAsset, svgPhysicsCurvePlot } from '../../svg-physics';
import { SHARED_TEMPLATES_2AS_T1 } from '../../secondary_shared_2as/templates/t1';

function adaptSharedTm(
	base: PhysicsParameterizedTemplate,
	curriculumLessonId: string
): PhysicsParameterizedTemplate {
	const adapted = adaptPhysicsTemplateForTrack(base, '2as_tm');
	return {
		...adapted,
		curriculumLessonId
	};
}

// ============================================================================
// 2AS TM Exclusive Template 1 (T1): Rotational Work & Kinetic Energy (5 pts)
// ============================================================================

export const tpl2asTmT1RotationalKineticEnergy: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_tm_t1_rotational_kinetic_energy',
	grade: '2as_tm',
	trimesterId: 't1',
	domain: 'energy',
	titleAr: 'العمل والطاقة الحركية الدورانية: جملة (بكرة + كتلة) وعزم العطالة',
	curriculumLessonId: 'phy_lesson_2as_tm_t1_rotational_work_kinetic_energy',
	defaultPoints: 5,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const mPulley = rng.pick([2, 4, 6]); // kg
		const rCm = rng.pick([10, 20]); // cm
		const rM = rCm / 100;
		const jDelta = roundTo(0.5 * mPulley * rM * rM, 4); // 1/2 M R^2
		const mEqPulley = roundTo(jDelta / (rM * rM), 2); // = M/2
		const mLoad = rng.pick(difficulty === 'easy' ? [1, 2] : [1.5, 2, 3]); // kg
		const g = 10;
		const h = rng.pick([1.5, 2.0, 2.5]);
		// mLoad * g * h = 0.5 * (mLoad + mEqPulley) * v^2
		const ePot = roundTo(mLoad * g * h, 2);
		const vLinear = roundTo(Math.sqrt((2 * ePot) / (mLoad + mEqPulley)), 2);
		const omega = roundTo(vLinear / rM, 2);
		const ecrPulley = roundTo(0.5 * jDelta * omega * omega, 2);
		const torqueFriction = difficulty === 'hard' ? 0.5 : 0;
		const thetaRad = roundTo(h / rM, 2);

		const mcq = buildUniqueMcqOptions(
			`$v = ${vLinear}\\text{ m/s}\\quad ;\\quad E_{cr} = ${ecrPulley}\\text{ J}$`,
			[
				{
					text: `$v = ${roundTo(Math.sqrt(2 * g * h), 2)}\\text{ m/s}\\quad ;\\quad E_{cr} = 0\\text{ J}$`,
					diagnosticFeedback: 'أهملت الطاقة الحركية الدورانية للبكرة 1/2 J_Δ ω² في معادلة انحفاظ الطاقة.'
				},
				{
					text: `$v = ${roundTo(Math.sqrt((2 * ePot) / (mLoad + mPulley)), 2)}\\text{ m/s}\\quad ;\\quad E_{cr} = ${roundTo(ecrPulley * 2, 2)}\\text{ J}$`,
					diagnosticFeedback: 'عزم عطالة الأسطوانة/القرص المتجانس هو 1/2 M R² وليس M R².'
				},
				{
					text: `$v = ${roundTo(vLinear * 1.5, 2)}\\text{ m/s}\\quad ;\\quad E_{cr} = ${roundTo(ecrPulley / 2, 2)}\\text{ J}$`,
					diagnosticFeedback: 'تحقق من علاقة v = R·ω ومن معادلة انحفاظ الطاقة.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) احسب عزم عطالة البكرة $J_Delta = frac(1, 2) M R^2$ حول محور دورانها الثابت $(Delta)$، ثم عبر عن السرعة الزاوية $omega$ بدلالة السرعة الخطية $v$ للحمولة ونصف القطر $R$.`,
				answer: `1) عزم العطالة والسرعة الزاوية:\n- $R = ${rCm}" cm" = ${rM}" m"$.\n- $J_Delta = frac(1, 2) M R^2 = 0.5 times ${mPulley} times (${rM})^2 = ${jDelta}" kg" dot "m"^2$.\n- عدم انزلاق الخيط يعطي: $v = R dot omega arrow.r.double omega = frac(v, R)$.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `2) اكتب معادلة انحفاظ الطاقة للجملة (بكرة + حمولة + أرض) عند نزول الحمولة من السكون مسافة $h = ${h}" m"$، ثم احسب السرعة الخطية $v$ والسرعة الزاوية $omega$ ($g = 10" m/s"^2$).`,
				answer: `2) معادلة انحفاظ الطاقة وحساب السرعتين:\n- $m g h = frac(1, 2) m v^2 + frac(1, 2) J_Delta omega^2 = frac(1, 2)(m + frac(J_Delta, R^2)) v^2$.\n- لدينا $frac(J_Delta, R^2) = frac(${jDelta}, ${roundTo(rM * rM, 4)}) = ${mEqPulley}" kg"$.\n- $v = sqrt(frac(2 m g h, m + ${mEqPulley})) = sqrt(frac(2 times ${ePot}, ${roundTo(mLoad + mEqPulley, 2)})) = ${vLinear}" m/s"$.\n- $omega = frac(v, R) = frac(${vLinear}, ${rM}) = ${omega}" rad/s"$.`,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `3) استنتج الطاقة الحركية الدورانية للبكرة $E_"cr"$ عند هذه اللحظة، واحسب الزاوية $theta$ التي دارت بها البكرة بوحدة الراديان${torqueFriction > 0 ? ` وعمل مزدوجة احتكاك مقاومة ثابتة عزمها $M_f = ${torqueFriction}" N" dot "m"$` : ''}.`,
				answer: `3) الطاقة الدورانية والزاوية الممسوحة:\n- $E_"cr" = frac(1, 2) J_Delta omega^2 = 0.5 times ${jDelta} times (${omega})^2 = ${ecrPulley}" J"$.\n- $theta = frac(h, R) = frac(${h}, ${rM}) = ${thetaRad}" rad"$.${torqueFriction > 0 ? `\n- عمل المزدوجة المقاومة الافتراضية: $W_f = -M_f dot theta = -${torqueFriction} times ${thetaRad} = -${roundTo(torqueFriction * thetaRad, 2)}" J"$.` : ''}`,
				mark: '1.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_tm',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في نظام رفع صناعي، تتدلى حمولة كتلتها $m = ${mLoad}\\text{ kg}$ من خيط غير قابل للامتطاط ملفوف حول بكرة أسطوانية متجانسة كتلتها $M = ${mPulley}\\text{ kg}$ ونصف قطرها $R = ${rCm}\\text{ cm}$ ($J_\\Delta = \\frac{1}{2}M R^2$). تنزل الحمولة من السكون مسافة $h = ${h}\\text{ m}$ ($g = 10\\text{ m/s}^2$).\nما هما السرعة الخطية $v$ للحمولة والطاقة الحركية الدورانية للبكرة $E_{cr}$؟`,
				questionTextAr: 'احسب السرعة الخطية $v$ والطاقة الدورانية $E_{cr}$:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `$J_\\Delta = ${jDelta}\\text{ kg}\\cdot\\text{m}^2$. من $mgh = \\frac{1}{2}mv^2 + \\frac{1}{2}J_\\Delta (v/R)^2$ نجد $v = ${vLinear}\\text{ m/s}$، و $\\omega = v/R = ${omega}\\text{ rad/s}$، ومنه $E_{cr} = ${ecrPulley}\\text{ J}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `تتكون جملة ميكانيكية تكنولوجية من بكرة أسطوانية متجانسة كتلتها $M = ${mPulley}" kg"$ ونصف قطرها $R = ${rCm}" cm"$ ($J_Delta = frac(1, 2) M R^2$) قابلة للدوران بدون احتكاك حول محور أفقي ثابت $(Delta)$، يلتف حولها خيط عديم الامتطاط يحمل جسماً كتلته $m = ${mLoad}" kg"$ ينطلق من السكون على مسافة $h = ${h}" m"$.`,
				content
			},
			hints: [
				`حول نصف القطر إلى المتر $R = ${rM}\\text{ m}$ واحسب $J_\\Delta = \\frac{1}{2} M R^2$.`,
				`اربط بين السرعتين بالعلاقة $v = R \\cdot \\omega$.`,
				`الطاقة الحركية الكلية للجملة هي مجموع الانسحابية والدورانية: $E_c = \\frac{1}{2}mv^2 + \\frac{1}{2}J_\\Delta \\omega^2$.`
			],
			solutionStepsAr: [
				`حساب عزم العطالة: $J_\\Delta = ${jDelta}\\text{ kg}\\cdot\\text{m}^2$.`,
				`استنتاج السرعة الخطية $v = ${vLinear}\\text{ m/s}$ والزاوية $\\omega = ${omega}\\text{ rad/s}$.`,
				`الطاقة الحركية الدورانية $E_{cr} = ${ecrPulley}\\text{ J}$ والزاوية $\\theta = ${thetaRad}\\text{ rad}$.`
			],
			finalAnswer: `v = ${vLinear}\\text{ m/s}\\quad ;\\quad E_{cr} = ${ecrPulley}\\text{ J}`
		};
	}
};

// ============================================================================
// 2AS TM Exclusive Integration (T1): Winch Rotation + Torsion + Efficiency (6 pts)
// ============================================================================

export const tpl2asTmT1IntegrationRotationEnergy: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_tm_t1_integration_rotation_energy',
	grade: '2as_tm',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'مسألة إدماجية (2AS TM): المحرك الدوراني، الطاقة الفتلية، والمردود الطاقوي',
	curriculumLessonId: 'phy_lesson_2as_tm_t1_rotational_work_kinetic_energy',
	defaultPoints: 6,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const jDelta = rng.pick([0.04, 0.05, 0.08]);
		const nRpm = rng.pick([300, 600, 900]);
		const omega = roundTo((2 * Math.PI * nRpm) / 60, 2); // 10pi, 20pi, 30pi
		const ecr = roundTo(0.5 * jDelta * omega * omega, 2);
		const torqueMotor = rng.pick([4, 5, 6]);
		const nTurns = rng.pick([10, 15, 20]);
		const thetaRad = roundTo(2 * Math.PI * nTurns, 2);
		const wMotor = roundTo(torqueMotor * thetaRad, 1);
		const pElec = rng.pick([500, 800, 1000]);
		const dtSec = 1;
		const etaPct = roundTo((ecr / (pElec * dtSec)) * 100, 2);
		const cTorsion = 0.2;
		const thetaTorsion = 2; // rad
		const ept = roundTo(0.5 * cTorsion * thetaTorsion * thetaTorsion, 3);

		const svg = svgPhysicsCurvePlot({
			xMin: 0,
			xMax: Math.ceil(omega * 1.1),
			yMin: 0,
			yMax: Math.ceil(ecr * 1.2),
			xStep: Math.ceil(omega / 4),
			yStep: Math.ceil(ecr / 4),
			xLabel: 'ω (rad/s)',
			yLabel: 'E_cr (J)',
			title: 'تغيرات الطاقة الحركية الدورانية بدلالة السرعة الزاوية ω',
			curves: [{ fn: (w) => 0.5 * jDelta * w * w, color: '#2563eb', label: 'E_cr = ½J_Δω²' }],
			points: [{ x: omega, y: ecr, label: `(${omega}, ${ecr})`, color: '#dc2626' }]
		});
		const svgUrl = savePhysicsSvgAsset(`phy_2as_tm_t1_integ_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$\\omega = ${omega}\\text{ rad/s}\\quad ;\\quad E_{cr} = ${ecr}\\text{ J}$`,
			[
				{
					text: `$\\omega = ${nRpm}\\text{ rad/s}\\quad ;\\quad E_{cr} = ${ecr}\\text{ J}$`,
					diagnosticFeedback: 'نسيت تحويل سرعة الدوران من tr/min إلى rad/s عبر ω = 2πN/60.'
				},
				{
					text: `$\\omega = ${omega}\\text{ rad/s}\\quad ;\\quad E_{cr} = ${roundTo(ecr * 2, 2)}\\text{ J}$`,
					diagnosticFeedback: 'نسيت معامل 1/2 في قانون الطاقة الحركية الدورانية.'
				},
				{
					text: `$\\omega = ${roundTo(omega / 2, 2)}\\text{ rad/s}\\quad ;\\quad E_{cr} = ${roundTo(ecr / 4, 2)}\\text{ J}$`,
					diagnosticFeedback: 'تحقق من حساب السرعة الزاوية ω = 2πN/60.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: 'منحنى الطاقة الحركية الدورانية E_cr بدلالة ω',
				width: 310
			},
			{
				type: 'text',
				content: `1) يدور دوّار محرك عزم عطالته $J_Delta = ${jDelta}" kg" dot "m"^2$ من السكون ليبلغ سرعة دوران $N = ${nRpm}" tr/min"$ خلال مدة وجيزة. احسب السرعة الزاوية $omega$ والطاقة الحركية الدورانية $E_"cr"$ عند هذه السرعة.`,
				answer: `1) السرعة الزاوية والطاقة الدورانية:\n- $omega = frac(2 pi N, 60) = frac(2 pi times ${nRpm}, 60) = ${omega}" rad/s"$.\n- $E_"cr" = frac(1, 2) J_Delta omega^2 = 0.5 times ${jDelta} times (${omega})^2 = ${ecr}" J"$.`,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `2) يطبق المحرك مزدوجة عزمها ثابت $M_Delta = ${torqueMotor}" N" dot "m"$ خلال $${nTurns}$ دورة. احسب عمل هذه المزدوجة $W(M_Delta)$، ثم احسب الطاقة الكامنة الفتلية المخزنة في سلك مرن ($C = ${cTorsion}" N" dot "m/rad"$) عند فتله بزاوية $theta_0 = ${thetaTorsion}" rad"$.`,
				answer: `2) عمل المزدوجة والطاقة الفتلية:\n- الزاوية بالراديان: $theta = 2 pi times ${nTurns} = ${thetaRad}" rad"$.\n- عمل المزدوجة: $W = M_Delta dot theta = ${torqueMotor} times ${thetaRad} = ${wMotor}" J"$.\n- الطاقة الكامنة الفتلية: $E_"pt" = frac(1, 2) C theta_0^2 = 0.5 times ${cTorsion} times (${thetaTorsion})^2 = ${ept}" J"$.`,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `3) إذا امتص المحرك خلال $Delta t = 1" s"$ طاقة كهربائية باستطاعة $P_a = ${pElec}" W"$ لإكساب الدوّار طاقة $E_"cr" = ${ecr}" J"$، احسب مردود هذا التحويل $eta$.`,
				answer: `3) المردود الطاقوي:\n$eta = frac(E_"cr", P_a dot Delta t) times 100 = frac(${ecr}, ${pElec}) times 100 = ${etaPct}\\%$.`,
				mark: '1.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_tm',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `يدور عمود محرك كهربائي عزم عطالته $J_\\Delta = ${jDelta}\\text{ kg}\\cdot\\text{m}^2$ بسرعة $N = ${nRpm}\\text{ tr/min}$.\nما هما سرعته الزاوية $\\omega$ وطاقته الحركية الدورانية $E_{cr}$؟`,
				questionTextAr: 'احسب $\\omega$ و $E_{cr}$ لعمود المحرك:',
				imageUrl: svgUrl,
				imageCaption: 'منحنى الطاقة الحركية الدورانية',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `$\\omega = \\frac{2\\pi\\times ${nRpm}}{60} = ${omega}\\text{ rad/s}$، والطاقة الدورانية $E_{cr} = \\frac{1}{2}(${jDelta})(${omega})^2 = ${ecr}\\text{ J}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'مسألة إدماجية (الحركة الدورانية والمردود - 2AS TM)',
				instruction: 'ندرس آلية دوارة في ورشة تقنية لحساب طاقتها الدورانية وعمل المزدوجة والطاقة الفتلية ومردود التحويل.',
				content
			},
			hints: [
				`حول $N$ إلى $\\text{rad/s}$ عبر العلاقة $\\omega = \\frac{2\\pi N}{60}$.`,
				`العمل الدوراني هو $W = \\mathcal{M}_\\Delta \\cdot \\theta$ مع $\\theta = 2\\pi n$.`,
				`الطاقة الكامنة الفتلية $E_{pt} = \\frac{1}{2}C\\theta_0^2$.`
			],
			solutionStepsAr: [
				`السرعة الزاوية $\\omega = ${omega}\\text{ rad/s}$ والطاقة الدورانية $E_{cr} = ${ecr}\\text{ J}$.`,
				`عمل المزدوجة $W = ${wMotor}\\text{ J}$ والطاقة الفتلية $E_{pt} = ${ept}\\text{ J}$.`,
				`المردود الطاقوي $\\eta = ${etaPct}\\%$.`
			],
			finalAnswer: `\\omega = ${omega}\\text{ rad/s}\\quad ;\\quad E_{cr} = ${ecr}\\text{ J}\\quad ;\\quad W = ${wMotor}\\text{ J}`
		};
	}
};

export const PHYSICS_TEMPLATES_2AS_TM_T1: PhysicsParameterizedTemplate[] = [
	adaptSharedTm(SHARED_TEMPLATES_2AS_T1[0], 'phy_lesson_2as_tm_t1_work_translational_kinetic_energy'),
	tpl2asTmT1RotationalKineticEnergy,
	adaptSharedTm(SHARED_TEMPLATES_2AS_T1[1], 'phy_lesson_2as_tm_t1_potential_energy_mechanical'),
	adaptSharedTm(SHARED_TEMPLATES_2AS_T1[2], 'phy_lesson_2as_tm_t1_conductivity_molar_concentration'),
	adaptSharedTm(SHARED_TEMPLATES_2AS_T1[3], 'phy_lesson_2as_tm_t1_internal_energy_citizenship'),
	adaptSharedTm(SHARED_TEMPLATES_2AS_T1[4], 'phy_lesson_2as_tm_t1_qualitative_energy_conservation'),
	tpl2asTmT1IntegrationRotationEnergy
];
