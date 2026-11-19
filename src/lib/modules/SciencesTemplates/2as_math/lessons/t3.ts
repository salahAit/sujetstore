import type { SciencesInteractiveLessonData } from '../../types';
import { adaptSciencesLessonForTrack } from '../../types';
import { SHARED_SCIENCES_LESSONS_2AS_T3 } from '../../secondary_shared_2as/lessons/t3';

/**
 * 2AS MATH (شعبة الرياضيات — معامل 2) Interactive Lessons — Trimester 3
 * YearSubjectId: 694 | Subject: SCI-MATH
 *
 * Official focused MATH syllabus (3 core lessons):
 * 1. العلاقة بين النمط المورثي والظاهري والطفرات (مثال فقر الدم المنجلي)
 * 2. الصخور الرسوبية وتصنيفها ومبادئ الاستراتيغرافيا
 * 3. المستحاثات المرشدة وإعادة بناء الجغرافيا القديمة لحوض ترسيبي
 * (Note: Deep polyallelism/albinism mutations & petroleum basin cycles are exclusive to 2AS SE)
 */
export const SCIENCES_LESSONS_2AS_MATH_T3: SciencesInteractiveLessonData[] = [
	adaptSciencesLessonForTrack(SHARED_SCIENCES_LESSONS_2AS_T3[0], '2as_math'),
	adaptSciencesLessonForTrack(SHARED_SCIENCES_LESSONS_2AS_T3[1], '2as_math'),
	adaptSciencesLessonForTrack(SHARED_SCIENCES_LESSONS_2AS_T3[2], '2as_math')
];
