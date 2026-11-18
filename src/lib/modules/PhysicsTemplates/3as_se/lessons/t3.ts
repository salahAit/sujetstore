import type { PhysicsInteractiveLessonData } from '../../types';
import { adaptPhysicsLessonForTrack } from '../../types';
import { SHARED_PHYSICS_LESSONS_3AS_T3 } from '../../secondary_shared_3as/lessons/t3';

/**
 * 3AS SE (Sciences Expérimentales — علوم تجريبية) Interactive Lessons — Trimester 3
 * Grade: '3as_se' | YearSubjectId: 683 | Stream: SE | Coefficient: 5
 * Units 5 & 6 (Nuclear physics & Spontaneous evolution / Esterification) + ONEC SE Integration.
 * Strict stream isolation: ZERO Unit 7 oscillations and ZERO Galvanic cells.
 */
export const PHYSICS_LESSONS_3AS_SE_T3: PhysicsInteractiveLessonData[] =
	SHARED_PHYSICS_LESSONS_3AS_T3.map((lesson) => {
		const adapted = adaptPhysicsLessonForTrack(lesson, '3as_se');
		return {
			...adapted,
			slug: adapted.slug.replace(/^phy-3as-se-phy-3as-shared-/, 'phy-3as-se-')
		};
	});
