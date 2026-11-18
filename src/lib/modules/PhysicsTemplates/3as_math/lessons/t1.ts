import type { PhysicsInteractiveLessonData } from '../../types';
import { adaptPhysicsLessonForTrack } from '../../types';
import { SHARED_PHYSICS_LESSONS_3AS_T1 } from '../../secondary_shared_3as/lessons/t1';

/**
 * 3AS MATH (Mathématiques — رياضيات) Interactive Lessons — Trimester 1
 * Grade: '3as_math' | YearSubjectId: 703 | Stream: MATH | Coefficient: 6
 */
export const PHYSICS_LESSONS_3AS_MATH_T1: PhysicsInteractiveLessonData[] =
	SHARED_PHYSICS_LESSONS_3AS_T1.map((lesson) => {
		const adapted = adaptPhysicsLessonForTrack(lesson, '3as_math');
		return {
			...adapted,
			slug: adapted.slug.replace(/^phy-3as-math-phy-3as-shared-/, 'phy-3as-math-')
		};
	});
