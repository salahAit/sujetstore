import type { PhysicsInteractiveLessonData } from '../../types';
import { adaptPhysicsLessonForTrack } from '../../types';
import { PHYSICS_LESSONS_2AS_TM_T2 } from '../../2as_tm/lessons/t2';

/**
 * 2AS MATH Interactive Lessons - Trimester 2
 * Stream: Mathématiques (MATH) | YearSubjectId: 693 | Coefficient: 6
 *
 * 5 Lessons aligned with 2as_math_curriculum_map.json (T2),
 * highlighting analytical derivations for Faraday induction & sinusoidal AC.
 */

const faradayMath: PhysicsInteractiveLessonData = {
	...PHYSICS_LESSONS_2AS_TM_T2[2],
	id: 'phy_lesson_2as_math_t2_electromagnetic_induction_faraday',
	slug: 'phy-2as-math-t2-electromagnetic-induction-faraday',
	grade: '2as_math',
	yearSubjectId: 693,
	summary: {
		...PHYSICS_LESSONS_2AS_TM_T2[2].summary,
		rulesAr: [
			...PHYSICS_LESSONS_2AS_TM_T2[2].summary.rulesAr,
			'**الصياغة التحليلية لتغير التدفق $B(t)$ أو $\\alpha(t) = \\omega t$**:\n- إذا تغير الحقل خطياً بدلالة الزمن بميل $a = \\frac{\\Delta B}{\\Delta t}$، فإن $e = -N S \\cos\\alpha \\cdot \\frac{\\Delta B}{\\Delta t}$ (ثابتة على المجال الزمني).\n- عند دوران إطار بسرعة زاوية ثابتة $\\omega$: $\\Phi(t) = N B S \\cos(\\omega t)$ وتُعطى القوة المحركة اللحظية بمشتقة التدفق $e(t) = -\\frac{d\\Phi}{dt} = N B S \\omega \\sin(\\omega t)$.'
		]
	}
};

const acMath: PhysicsInteractiveLessonData = {
	...PHYSICS_LESSONS_2AS_TM_T2[3],
	id: 'phy_lesson_2as_math_t2_ac_voltages_transformers',
	slug: 'phy-2as-math-t2-ac-voltages-transformers',
	grade: '2as_math',
	yearSubjectId: 693,
	summary: {
		...PHYSICS_LESSONS_2AS_TM_T2[3].summary,
		rulesAr: [
			...PHYSICS_LESSONS_2AS_TM_T2[3].summary.rulesAr,
			'**الدراسة المثلثية للتوتر الجيبي**:\n$$u(t) = U_{\\max} \\sin\\left(\\frac{2\\pi}{T} t + \\varphi\\right)$$\nتُحقق القيمة المنتجة $U_{\\text{eff}} = \\frac{U_{\\max}}{\\sqrt{2}}$ تكافؤ الطاقة الحرارية المبددة بمفعول جول خلال دور كامل.'
		]
	}
};

export const PHYSICS_LESSONS_2AS_MATH_T2: PhysicsInteractiveLessonData[] = [
	adaptPhysicsLessonForTrack(PHYSICS_LESSONS_2AS_TM_T2[0], '2as_math', 't2_acid_base_redox_titration'),
	adaptPhysicsLessonForTrack(PHYSICS_LESSONS_2AS_TM_T2[1], '2as_math', 't2_magnetic_field_laplace'),
	faradayMath,
	acMath,
	adaptPhysicsLessonForTrack(PHYSICS_LESSONS_2AS_TM_T2[4], '2as_math', 't2_ac_dc_rectification')
];
