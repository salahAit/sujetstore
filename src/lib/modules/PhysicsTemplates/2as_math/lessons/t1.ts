import type { PhysicsInteractiveLessonData } from '../../types';
import { adaptPhysicsLessonForTrack } from '../../types';
import { SHARED_LESSONS_2AS_T1 } from '../../secondary_shared_2as/lessons/t1';
import { PHYSICS_LESSONS_2AS_TM_T1 } from '../../2as_tm/lessons/t1';

/**
 * 2AS MATH Interactive Lessons - Trimester 1
 * Stream: Mathématiques (MATH) | YearSubjectId: 693 | Coefficient: 6
 *
 * 6 Lessons aligned with 2as_math_curriculum_map.json (T1),
 * emphasizing analytical formulation & symbolic derivations.
 */

const rotationalLessonMath: PhysicsInteractiveLessonData = {
	...PHYSICS_LESSONS_2AS_TM_T1[2],
	id: 'phy_lesson_2as_math_t1_rotational_work_kinetic_energy',
	slug: 'phy-2as-math-t1-rotational-work-kinetic-energy',
	grade: '2as_math',
	yearSubjectId: 693,
	summary: {
		...PHYSICS_LESSONS_2AS_TM_T1[2].summary,
		rulesAr: [
			...PHYSICS_LESSONS_2AS_TM_T1[2].summary.rulesAr,
			'**الصياغة التحليلية لجسم يتدحرج دون انزلاق أو جملة (بكرة + كتلة)**:\nمن معادلة انحفاظ الطاقة $m g h = \\frac{1}{2} m v^2 + \\frac{1}{2} J_\\Delta \\left(\\frac{v}{R}\\right)^2$ نستنتج العبارة الحرفية للسرعة:\n$$v = \\sqrt{\\frac{2 m g h}{m + \\frac{J_\\Delta}{R^2}}}$$\nوفي حالة أسطوانة مصمتة تتدحرج على مستوٍ مائل ($J_\\Delta = \\frac{1}{2}m R^2$) يكون $E_{c,\\text{tot}} = \\frac{3}{4}m v^2$ ومنه $v = \\sqrt{\\frac{4}{3} g h}$.'
		]
	}
};

export const PHYSICS_LESSONS_2AS_MATH_T1: PhysicsInteractiveLessonData[] = [
	adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T1[0], '2as_math', 't1_qualitative_energy_conservation'),
	adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T1[1], '2as_math', 't1_work_translational_kinetic_energy'),
	rotationalLessonMath,
	{
		...adaptPhysicsLessonForTrack(PHYSICS_LESSONS_2AS_TM_T1[3], '2as_math', 't1_potential_energy_mechanical'),
		order: 4
	},
	{
		...adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T1[3], '2as_math', 't1_conductivity_molar_concentration'),
		order: 5
	},
	{
		...adaptPhysicsLessonForTrack(PHYSICS_LESSONS_2AS_TM_T1[5], '2as_math', 't1_internal_energy_citizenship'),
		order: 6
	}
];
