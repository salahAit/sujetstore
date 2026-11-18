import type { PhysicsInteractiveLessonData } from '../../types';
import { adaptPhysicsLessonForTrack } from '../../types';
import { SHARED_PHYSICS_LESSONS_3AS_T1 } from '../../secondary_shared_3as/lessons/t1';

/**
 * 3AS TM (Technique Mathématique — تقني رياضي) Interactive Lessons — Trimester 1
 * Grade: '3as_tm' | YearSubjectId: 726 | Stream: TM | Coefficient: 5
 */
export const PHYSICS_LESSONS_3AS_TM_T1: PhysicsInteractiveLessonData[] =
	SHARED_PHYSICS_LESSONS_3AS_T1.map((lesson) => {
		const adapted = adaptPhysicsLessonForTrack(lesson, '3as_tm');
		return {
			...adapted,
			slug: adapted.slug.replace(/^phy-3as-tm-phy-3as-shared-/, 'phy-3as-tm-')
		};
	});
