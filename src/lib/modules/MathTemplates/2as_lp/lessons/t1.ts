import type { InteractiveLessonData } from '../../types';
import { adaptLessonForTrack } from '../../types';
import { SHARED_LESSONS_2AS_LIT_T1 } from '../../secondary_shared_2as_lit/lessons/t1';

/**
 * 2AS LP (آداب وفلسفة) Interactive Lessons - Trimester 1
 * Stream: Lettres et Philosophie (LP) | YearSubjectId: 760 | Coefficient: 2
 */
export const LESSONS_2AS_LP_T1: InteractiveLessonData[] = SHARED_LESSONS_2AS_LIT_T1.map((lesson) =>
	adaptLessonForTrack(lesson, '2as_lp')
);
