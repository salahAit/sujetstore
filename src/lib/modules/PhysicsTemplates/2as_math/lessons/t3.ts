import type { PhysicsInteractiveLessonData } from '../../types';
import { adaptPhysicsLessonForTrack } from '../../types';
import { PHYSICS_LESSONS_2AS_TM_T3 } from '../../2as_tm/lessons/t3';

/**
 * 2AS MATH Interactive Lessons - Trimester 3
 * Stream: Mathématiques (MATH) | YearSubjectId: 693 | Coefficient: 6
 *
 * 3 Lessons aligned with 2as_math_curriculum_map.json (T3).
 */
export const PHYSICS_LESSONS_2AS_MATH_T3: PhysicsInteractiveLessonData[] = [
	adaptPhysicsLessonForTrack(PHYSICS_LESSONS_2AS_TM_T3[0], '2as_math', 't3_organic_hydrocarbons_functional'),
	adaptPhysicsLessonForTrack(PHYSICS_LESSONS_2AS_TM_T3[1], '2as_math', 't3_thin_lenses_formula'),
	{
		...adaptPhysicsLessonForTrack(PHYSICS_LESSONS_2AS_TM_T3[2], '2as_math', 't3_integration'),
		titleAr: 'إدماج وحصيلة السنة الثانية ثانوي (2AS MATH) والتحضير لـ 3AS',
		objectives: [
			'حل مواضيع اختبار شاملة بمقاييس شعبة رياضيات تدمج الطاقة الدورانية والتحريض والتيار المتناوب والعدسات والمعايرة بصياغة رياضية دقيقة'
		],
		keywordsAr: ['إدماج', 'اختبار 2AS MATH', 'الحركة الدورانية', 'التحريض الكهرومغناطيسي']
	}
];
