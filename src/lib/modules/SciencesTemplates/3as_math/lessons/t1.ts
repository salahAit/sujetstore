import { adaptSciencesLessonForTrack, type SciencesInteractiveLessonData } from '../../types';
import {
	SHARED_SCIENCES_LESSON_3AS_FOLDING_MUTATIONS,
	SHARED_SCIENCES_LESSONS_3AS_T1
} from '../../secondary_shared_3as/lessons/t1';

/**
 * 3AS MATH (Mathématiques — رياضيات) Interactive Lessons — Trimester 1 (4 lessons)
 * Grade: '3as_math' | YearSubjectId: 704 | SubjectId: 'SCI-MATH' | Coefficient: 2
 * Official BAC MATH Program: STRICTLY Domain 1 (التخصص الوظيفي للبروتينات).
 * T1 covers Units 1 & 2: Protein Synthesis (Transcription, Translation, Antibiotics)
 *                      + Protein Structure (3D levels, Amphoteric/Electrophoresis, Anfinsen & Mutations).
 */
export const SCIENCES_LESSONS_3AS_MATH_T1: SciencesInteractiveLessonData[] = [
	adaptSciencesLessonForTrack({ ...SHARED_SCIENCES_LESSONS_3AS_T1[0], order: 1 }, '3as_math'),
	adaptSciencesLessonForTrack({ ...SHARED_SCIENCES_LESSONS_3AS_T1[1], order: 2 }, '3as_math'),
	adaptSciencesLessonForTrack({ ...SHARED_SCIENCES_LESSONS_3AS_T1[2], order: 3 }, '3as_math'),
	adaptSciencesLessonForTrack({ ...SHARED_SCIENCES_LESSON_3AS_FOLDING_MUTATIONS, order: 4 }, '3as_math')
];
