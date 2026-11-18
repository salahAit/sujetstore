import type { PhysicsInteractiveLessonData } from '../../types';
import { adaptPhysicsLessonForTrack } from '../../types';
import { SHARED_PHYSICS_LESSONS_3AS_T2 } from '../../secondary_shared_3as/lessons/t2';

/**
 * 3AS SE (Sciences Expérimentales — علوم تجريبية) Interactive Lessons — Trimester 2
 * Grade: '3as_se' | YearSubjectId: 683 | Stream: SE | Coefficient: 5
 * Units 2 (cont.), 3 & 4 (Projectile/Inclined Plane, RC, RL, pH Equilibrium & Titration).
 */
export const PHYSICS_LESSONS_3AS_SE_T2: PhysicsInteractiveLessonData[] =
	SHARED_PHYSICS_LESSONS_3AS_T2.map((lesson) => {
		const adapted = adaptPhysicsLessonForTrack(lesson, '3as_se');
		return {
			...adapted,
			slug: adapted.slug.replace(/^phy-3as-se-phy-3as-shared-/, 'phy-3as-se-')
		};
	});
