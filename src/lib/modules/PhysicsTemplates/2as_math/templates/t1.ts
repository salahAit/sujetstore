import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate
} from '../../types';
import { adaptPhysicsTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { SHARED_TEMPLATES_2AS_T1 } from '../../secondary_shared_2as/templates/t1';
import { tpl2asTmT1IntegrationRotationEnergy } from '../../2as_tm/templates/t1';

function adaptSharedMath(
	base: PhysicsParameterizedTemplate,
	curriculumLessonId: string
): PhysicsParameterizedTemplate {
	const adapted = adaptPhysicsTemplateForTrack(base, '2as_math');
	return {
		...adapted,
		curriculumLessonId
	};
}

// ============================================================================
// 2AS MATH Exclusive Template 1 (T1): Analytical Rolling & Rotational Energy (5 pts)
// ============================================================================

export const tpl2asMathT1RotationalAnalytical: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_2as_math_t1_rotational_kinetic_energy',
	grade: '2as_math',
	trimesterId: 't1',
	domain: 'energy',
	titleAr: 'الدراسة التحليلية للحركة الدورانية والانسحابية المترابطة (تدحرج أسطوانة)',
	curriculumLessonId: 'phy_lesson_2as_math_t1_rotational_work_kinetic_energy',
	defaultPoints: 5,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const m = rng.pick([2, 3, 4]);
		const rCm = rng.pick([10, 20]);
		const rM = rCm / 100;
		const g = 10;
		const h = rng.pick(difficulty === 'easy' ? [1.5, 3.0] : [1.5, 2.4, 3.0]);
		// Solid cylinder rolling without slipping: J_Delta = 1/2 m R^2, v = R*omega
		// mgh = 1/2 m v^2 + 1/2 (1/2 m R^2)(v/R)^2 = 3/4 m v^2 => v = sqrt(4gh/3)
		const vCyl = roundTo(Math.sqrt((4 * g * h) / 3), 2);
		const vSlide = roundTo(Math.sqrt(2 * g * h), 2);
		const omegaCyl = roundTo(vCyl / rM, 2);
		const jDelta = roundTo(0.5 * m * rM * rM, 4);
		const ecTrans = roundTo(0.5 * m * vCyl * vCyl, 2);
		const ecRot = roundTo(0.5 * jDelta * omegaCyl * omegaCyl, 2);

		const mcq = buildUniqueMcqOptions(
			`$v = \\sqrt{\\frac{4}{3}g h} \\approx ${vCyl}\\text{ m/s}$`,
			[
				{
					text: `$v = \\sqrt{2 g h} \\approx ${vSlide}\\text{ m/s}$`,
					diagnosticFeedback: 'هذه سرعة جسم ينزلق دون دوران! عند التدحرج يتوزع جزء من الطاقة إلى طاقة دورانية.'
				},
				{
					text: `$v = \\sqrt{g h} \\approx ${roundTo(Math.sqrt(g * h), 2)}\\text{ m/s}$`,
					diagnosticFeedback: 'هذه سرعة حلقة رقيقة (J_Δ = mR²) وليس أسطوانة مصمتة (J_Δ = ½mR²).'
				},
				{
					text: `$v = \\sqrt{\\frac{3}{4}g h} \\approx ${roundTo(Math.sqrt(0.75 * g * h), 2)}\\text{ m/s}$`,
					diagnosticFeedback: 'قلبت المعامل 4/3 إلى 3/4 عند عزل v² من المعادلة 3/4 mv² = mgh.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) برهن تحليلياً أن الطاقة الحركية الكلية لأسطوانة مصمتة متجانسة كتلتها $m$ ونصف قطرها $R$ ($J_Delta = frac(1, 2) m R^2$) تتدحرج دون انزلاق تكتب بالعبارة: $E_"c,tot" = frac(3, 4) m v^2$.`,
				answer: `1) البرهان التحليلي:\n$E_"c,tot" = E_"ct" + E_"cr" = frac(1, 2) m v^2 + frac(1, 2) J_Delta omega^2$.\nبشرط التدحرج دون انزلاق ($omega = frac(v, R)$) و $J_Delta = frac(1, 2) m R^2$:\n$E_"c,tot" = frac(1, 2) m v^2 + frac(1, 2) (frac(1, 2) m R^2) frac(v^2, R^2) = frac(1, 2) m v^2 + frac(1, 4) m v^2 = frac(3, 4) m v^2$.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) تتدحرج الأسطوانة من السكون انطلاقاً من ارتفاع $h = ${h}" m"$ على مستوٍ مائل دون ضياع طاقوي. استنتج العبارة الحرفية للسرعة $v$ في أسفل المستوي واحسب قيمتها والسرعة الزاوية $omega$ ($R = ${rCm}" cm"$, $g = 10" m/s"^2$).`,
				answer: `2) انحفاظ الطاقة وحساب السرعة:\n$m g h = frac(3, 4) m v^2 arrow.r.double v = sqrt(frac(4, 3) g h) = sqrt(frac(4 times 10 times ${h}, 3)) approx ${vCyl}" m/s"$.\nالسرعة الزاوية: $omega = frac(v, R) = frac(${vCyl}, ${rM}) = ${omegaCyl}" rad/s"$.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `3) لكتلة $m = ${m}" kg"$، احسب حصتي الطاقة الحركية الانسحابية $E_"ct"$ والدورانية $E_"cr"$ عند أسفل المستوي، وتأكد أن $E_"cr" / E_"ct" = frac(1, 2)$.`,
				answer: `3) حصتا الطاقة:\n- $E_"ct" = frac(1, 2) m v^2 = 0.5 times ${m} times (${vCyl})^2 = ${ecTrans}" J"$.\n- $E_"cr" = frac(1, 2) J_Delta omega^2 = 0.5 times ${jDelta} times (${omegaCyl})^2 = ${ecRot}" J"$.\n- النسبة: $frac(E_"cr", E_"ct") approx frac(1, 2)$.`,
				mark: '1.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_math',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `تتدحرج أسطوانة مصمتة متجانسة كتلتها $m = ${m}\\text{ kg}$ ونصف قطرها $R = ${rCm}\\text{ cm}$ ($J_\\Delta = \\frac{1}{2}m R^2$) دون انزلاق من السكون من ارتفاع $h = ${h}\\text{ m}$ ($g = 10\\text{ m/s}^2$).\nما هي العبارة الحرفية والقيمة العددية لسرعة مركز عطالتها في أسفل المنحدر؟`,
				questionTextAr: 'اختر العبارة الحرفية والقيمة الصحيحة للسرعة $v$:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices
				},
				explanation: `بانحفاظ الطاقة $mgh = \\frac{1}{2}mv^2 + \\frac{1}{2}(\\frac{1}{2}mR^2)(v/R)^2 = \\frac{3}{4}mv^2 \\implies v = \\sqrt{\\frac{4}{3}gh} \\approx ${vCyl}\\text{ m/s}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `تتدحرج أسطوانة مصمتة متجانسة كتلتها $m = ${m}" kg"$ ونصف قطرها $R = ${rCm}" cm"$ ($J_Delta = frac(1, 2) m R^2$) دون انزلاق من السكون على مستوٍ مائل ارتفاعه $h = ${h}" m"$ ($g = 10" m/s"^2$).`,
				content
			},
			hints: [
				`شرط التدحرج دون انزلاق يربط بين السرعة الخطية والزاوية: $v = R\\omega$.`,
				`عوض $J_\\Delta = \\frac{1}{2}m R^2$ و $\\omega = v/R$ في $E_{c,\\text{tot}} = \\frac{1}{2}mv^2 + \\frac{1}{2}J_\\Delta \\omega^2$.`,
				`تختزل الكتلة $m$ في معادلة انحفاظ الطاقة $mgh = \\frac{3}{4}mv^2$.`
			],
			solutionStepsAr: [
				`إثبات $E_{c,\\text{tot}} = \\frac{3}{4}m v^2$.`,
				`استنتاج $v = \\sqrt{\\frac{4}{3}gh} \\approx ${vCyl}\\text{ m/s}$ و $\\omega = ${omegaCyl}\\text{ rad/s}$.`,
				`حساب $E_{ct} = ${ecTrans}\\text{ J}$ و $E_{cr} = ${ecRot}\\text{ J}$.`
			],
			finalAnswer: `v = \\sqrt{\\frac{4}{3}gh} \\approx ${vCyl}\\text{ m/s}\\quad ;\\quad E_{cr} = ${ecRot}\\text{ J}`
		};
	}
};

const integrationRotationMath: PhysicsParameterizedTemplate = {
	...adaptPhysicsTemplateForTrack(tpl2asTmT1IntegrationRotationEnergy, '2as_math'),
	id: 'phy_tpl_2as_math_t1_integration_rotation_energy',
	grade: '2as_math',
	curriculumLessonId: 'phy_lesson_2as_math_t1_rotational_work_kinetic_energy'
};

export const PHYSICS_TEMPLATES_2AS_MATH_T1: PhysicsParameterizedTemplate[] = [
	adaptSharedMath(SHARED_TEMPLATES_2AS_T1[0], 'phy_lesson_2as_math_t1_work_translational_kinetic_energy'),
	tpl2asMathT1RotationalAnalytical,
	adaptSharedMath(SHARED_TEMPLATES_2AS_T1[1], 'phy_lesson_2as_math_t1_potential_energy_mechanical'),
	adaptSharedMath(SHARED_TEMPLATES_2AS_T1[2], 'phy_lesson_2as_math_t1_conductivity_molar_concentration'),
	adaptSharedMath(SHARED_TEMPLATES_2AS_T1[3], 'phy_lesson_2as_math_t1_internal_energy_citizenship'),
	adaptSharedMath(SHARED_TEMPLATES_2AS_T1[4], 'phy_lesson_2as_math_t1_qualitative_energy_conservation'),
	integrationRotationMath
];
