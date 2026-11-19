import { adaptSciencesLessonForTrack, type SciencesInteractiveLessonData } from '../../types';
import { SHARED_SCIENCES_LESSONS_3AS_T2 } from '../../secondary_shared_3as/lessons/t2';

/**
 * 3AS SE (Sciences Expérimentales — علوم تجريبية) Interactive Lessons — Trimester 2
 * Grade: '3as_se' | YearSubjectId: 684 | SubjectId: 'SCI-SE' | Coefficient: 6
 * Domain 1 — Units 4 & 5 (Immunology: Self/Non-self, Humoral, Cellular, HIV; Neurobiology: Potentials, Synapse, Toxins).
 */
export const SCIENCES_LESSONS_3AS_SE_T2: SciencesInteractiveLessonData[] =
	SHARED_SCIENCES_LESSONS_3AS_T2.map((lesson) => adaptSciencesLessonForTrack(lesson, '3as_se'));
