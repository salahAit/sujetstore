import type { SciencesInteractiveLessonData } from '../../types';
import { adaptSciencesLessonForTrack } from '../../types';
import { SHARED_SCIENCES_LESSONS_2AS_T1 } from '../../secondary_shared_2as/lessons/t1';

/**
 * 2AS MATH (شعبة الرياضيات — معامل 2) Interactive Lessons — Trimester 1
 * YearSubjectId: 694 | Subject: SCI-MATH
 *
 * Official lightened/focused MATH syllabus (4 core lessons):
 * 1. التنظيم العصبي: المنعكس العضلي والقوس الانعكاسية
 * 2. النقل المشبكي الكيميائي، التثبيط المتبادل والإدماج العصبي
 * 3. التنظيم الهرموني: تحلون الدم، البنكرياس (الأنسولين والغلوكاغون)
 * 4. حلقة التنظيم الذاتي لتحلون الدم والداء السكري
 * (Note: التنسيق العصبي الهرموني للدورة المبيضية وتحت السرير/النخامية is exclusive to 2AS SE)
 */
export const SCIENCES_LESSONS_2AS_MATH_T1: SciencesInteractiveLessonData[] = [
	adaptSciencesLessonForTrack(SHARED_SCIENCES_LESSONS_2AS_T1[0], '2as_math'),
	adaptSciencesLessonForTrack(SHARED_SCIENCES_LESSONS_2AS_T1[1], '2as_math'),
	adaptSciencesLessonForTrack(SHARED_SCIENCES_LESSONS_2AS_T1[2], '2as_math'),
	adaptSciencesLessonForTrack(SHARED_SCIENCES_LESSONS_2AS_T1[3], '2as_math')
];
