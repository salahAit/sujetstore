import type { PhysicsInteractiveLessonData } from '../../types';
import { adaptPhysicsLessonForTrack } from '../../types';
import { SHARED_LESSONS_2AS_T1 } from '../../secondary_shared_2as/lessons/t1';

/**
 * 2AS SE (Sciences Expérimentales) Interactive Lessons - Trimester 1
 * Stream: SE | YearSubjectId: 673 | Coefficient: 5
 *
 * 5 Lessons aligned with 2as_se_curriculum_map.json (T1):
 * 1. Qualitative Energy Conservation & Energy Balance
 * 2. Work & Translational Kinetic Energy
 * 3. Potential (Gravitational & Elastic) & Mechanical Energy
 * 4. Conductivity & Molar Concentration (Kohlrausch)
 * 5. Internal Energy, Heat Transfer & Calorimetry
 */
export const PHYSICS_LESSONS_2AS_SE_T1: PhysicsInteractiveLessonData[] = [
	adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T1[0], '2as_se', 't1_qualitative_energy_conservation'),
	adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T1[1], '2as_se', 't1_work_translational_kinetic_energy'),
	adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T1[2], '2as_se', 't1_potential_energy_mechanical'),
	adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T1[3], '2as_se', 't1_conductivity_molar_concentration'),
	adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T1[4], '2as_se', 't1_internal_energy_calorimetry')
].map((l) => ({
	...l,
	slug: l.slug.replace(/^phy-2as-se-/, 'phy-2as-se-')
}));
