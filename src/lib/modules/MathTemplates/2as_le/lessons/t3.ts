import type { InteractiveLessonData } from '../../types';
import { adaptLessonForTrack } from '../../types';
import { SHARED_LESSONS_2AS_LIT_T3 } from '../../secondary_shared_2as_lit/lessons/t3';

/**
 * 2AS LE (لغات أجنبية) Interactive Lessons - Trimester 3
 * Stream: Langues Étrangères (LE) | YearSubjectId: 776 | Coefficient: 2
 */
export const LESSONS_2AS_LE_T3: InteractiveLessonData[] = SHARED_LESSONS_2AS_LIT_T3.map((lesson) =>
	adaptLessonForTrack(lesson, '2as_le')
);
