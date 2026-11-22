import type { InteractiveLessonData } from '../../types';
import { adaptLessonForTrack } from '../../types';
import { SHARED_LESSONS_3AS_LIT_T1 } from '../../secondary_shared_3as_lit/lessons/t1';

export const LESSONS_3AS_LE_T1: InteractiveLessonData[] = SHARED_LESSONS_3AS_LIT_T1.map((lesson) =>
	adaptLessonForTrack(lesson, '3as_le')
);
