import type { PhysicsInteractiveLessonData } from '../../types';
import { adaptPhysicsLessonForTrack } from '../../types';
import { SHARED_LESSONS_2AS_T1 } from '../../secondary_shared_2as/lessons/t1';
import { SHARED_LESSONS_2AS_T2 } from '../../secondary_shared_2as/lessons/t2';

/**
 * 2AS SE (Sciences Expérimentales) Interactive Lessons - Trimester 2
 * Stream: SE | YearSubjectId: 673 | Coefficient: 5
 *
 * 6 Lessons aligned with 2as_se_curriculum_map.json (T2):
 * 1. Energy & Citizenship (Renewable Energies & Storage)
 * 2. Acid-Base Titration (Bronsted)
 * 3. Redox Reactions & Titration
 * 4. Magnetic Field & Superposition
 * 5. Laplace Electromagnetic Force
 * 6. Electricity in Daily Life (Distribution & Safety)
 */

const energyCitizenshipT2 = (() => {
	const adapted = adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T1[5], '2as_se', 't2_energy_citizenship');
	return {
		...adapted,
		id: 'phy_lesson_2as_se_t2_energy_citizenship',
		slug: 'phy-2as-se-t2-energy-citizenship',
		trimesterId: 't2' as const,
		sequenceId: 'seq3',
		sequenceTitleAr: 'الطاقة والمواطنة والمعايرة الكيميائية (الوحدتان 6 و 7)',
		order: 1
	};
})();

export const PHYSICS_LESSONS_2AS_SE_T2: PhysicsInteractiveLessonData[] = [
	energyCitizenshipT2,
	{
		...adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T2[0], '2as_se', 't2_acid_base_titration'),
		order: 2,
		sequenceId: 'seq3',
		sequenceTitleAr: 'الطاقة والمواطنة والمعايرة الكيميائية (الوحدتان 6 و 7)'
	},
	{
		...adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T2[1], '2as_se', 't2_redox_titration'),
		order: 3,
		sequenceId: 'seq3',
		sequenceTitleAr: 'الطاقة والمواطنة والمعايرة الكيميائية (الوحدتان 6 و 7)'
	},
	{
		...adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T2[2], '2as_se', 't2_magnetic_field_vectors'),
		order: 4,
		sequenceId: 'seq4',
		sequenceTitleAr: 'الظواهر المغناطيسية والكهرومغناطيسية (الوحدات 8 و 9 و 10)'
	},
	{
		...adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T2[3], '2as_se', 't2_laplace_electromagnetic_force'),
		order: 5,
		sequenceId: 'seq4',
		sequenceTitleAr: 'الظواهر المغناطيسية والكهرومغناطيسية (الوحدات 8 و 9 و 10)'
	},
	{
		...adaptPhysicsLessonForTrack(SHARED_LESSONS_2AS_T2[4], '2as_se', 't2_electricity_daily_life'),
		order: 6,
		sequenceId: 'seq4',
		sequenceTitleAr: 'الظواهر المغناطيسية والكهرومغناطيسية (الوحدات 8 و 9 و 10)'
	}
];
