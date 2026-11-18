import type { PhysicsInteractiveLessonData } from '../../types';
import { adaptPhysicsLessonForTrack } from '../../types';
import { SHARED_PHYSICS_LESSONS_3AS_T1 } from '../../secondary_shared_3as/lessons/t1';

/**
 * 3AS SE (Sciences Expérimentales — علوم تجريبية) Interactive Lessons — Trimester 1
 * Grade: '3as_se' | YearSubjectId: 683 | Stream: SE | Coefficient: 5
 * Units 1 & 2 (Chemical kinetics & Newtonian mechanics / Kepler / Vertical fall).
 */
export const PHYSICS_LESSONS_3AS_SE_T1: PhysicsInteractiveLessonData[] =
	SHARED_PHYSICS_LESSONS_3AS_T1.map((lesson) => {
		const adapted = adaptPhysicsLessonForTrack(lesson, '3as_se');
		return {
			...adapted,
			slug: adapted.slug.replace(/^phy-3as-se-phy-3as-shared-/, 'phy-3as-se-')
		};
	});
