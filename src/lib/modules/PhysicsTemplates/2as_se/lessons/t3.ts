import type { PhysicsInteractiveLessonData } from '../../types';
import { adaptPhysicsLessonForTrack } from '../../types';
import { SHARED_LESSONS_2AS_T3 } from '../../secondary_shared_2as/lessons/t3';

/**
 * 2AS SE (Sciences Expérimentales) Interactive Lessons - Trimester 3
 * Stream: SE | YearSubjectId: 673 | Coefficient: 5
 *
 * 5 Lessons aligned with 2as_se_curriculum_map.json (T3):
 * 1. Organic Hydrocarbons & IUPAC Nomenclature
 * 2. Oxygenated Functional Groups
 * 3. Thin Lenses & Geometric Image Construction
 * 4. Lens Formula (Descartes), Magnification & Eye/Optical Instruments
 * 5. Annual Integration & BAC SE Prep
 */
export const PHYSICS_LESSONS_2AS_SE_T3: PhysicsInteractiveLessonData[] = [
	adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T3[0], '2as_se', 't3_organic_hydrocarbons_nomenclature'),
	adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T3[1], '2as_se', 't3_oxygenated_functional_groups'),
	adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T3[2], '2as_se', 't3_thin_lenses_images'),
	adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T3[3], '2as_se', 't3_lens_formula_optical_instruments'),
	{
		...adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T3[4], '2as_se', 't3_integration'),
		titleAr: 'إدماج وحصيلة السنة الثانية ثانوي (2AS SE) والتمهيد للبكالوريا'
	}
];
