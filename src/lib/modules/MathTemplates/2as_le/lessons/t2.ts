import type { InteractiveLessonData } from '../../types';
import { adaptLessonForTrack } from '../../types';
import { SHARED_LESSONS_2AS_LIT_T2 } from '../../secondary_shared_2as_lit/lessons/t2';

/**
 * 2AS LE (لغات أجنبية) Interactive Lessons - Trimester 2
 * Stream: Langues Étrangères (LE) | YearSubjectId: 776 | Coefficient: 2
 */
export const LESSONS_2AS_LE_T2: InteractiveLessonData[] = SHARED_LESSONS_2AS_LIT_T2.map((lesson) =>
	adaptLessonForTrack(lesson, '2as_le')
);
