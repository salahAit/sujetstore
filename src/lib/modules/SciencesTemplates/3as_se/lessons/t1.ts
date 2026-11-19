import { adaptSciencesLessonForTrack, type SciencesInteractiveLessonData } from '../../types';
import { SHARED_SCIENCES_LESSONS_3AS_T1 } from '../../secondary_shared_3as/lessons/t1';

/**
 * 3AS SE (Sciences Expérimentales — علوم تجريبية) Interactive Lessons — Trimester 1
 * Grade: '3as_se' | YearSubjectId: 684 | SubjectId: 'SCI-SE' | Coefficient: 6
 * Domain 1 — Units 1, 2, 3 (Protein Synthesis, Protein 3D Structure & Amphotericity, Enzymology).
 */
export const SCIENCES_LESSONS_3AS_SE_T1: SciencesInteractiveLessonData[] =
	SHARED_SCIENCES_LESSONS_3AS_T1.map((lesson) => adaptSciencesLessonForTrack(lesson, '3as_se'));
