import type { InteractiveLessonData } from '../../types';
import { adaptLessonForTrack } from '../../types';
import { SHARED_LESSONS_3AS_LIT_T2 } from '../../secondary_shared_3as_lit/lessons/t2';

export const LESSONS_3AS_LE_T2: InteractiveLessonData[] = SHARED_LESSONS_3AS_LIT_T2.map((lesson) =>
	adaptLessonForTrack(lesson, '3as_le')
);
