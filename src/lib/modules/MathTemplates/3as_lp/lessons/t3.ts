import type { InteractiveLessonData } from '../../types';
import { adaptLessonForTrack } from '../../types';
import { SHARED_LESSONS_3AS_LIT_T3 } from '../../secondary_shared_3as_lit/lessons/t3';

export const LESSONS_3AS_LP_T3: InteractiveLessonData[] = SHARED_LESSONS_3AS_LIT_T3.map((lesson) =>
	adaptLessonForTrack(lesson, '3as_lp')
);
