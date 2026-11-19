import type { SciencesInteractiveLessonData } from '../../types';
import { adaptSciencesLessonForTrack } from '../../types';
import { SHARED_SCIENCES_LESSONS_2AS_T2 } from '../../secondary_shared_2as/lessons/t2';

/**
 * 2AS MATH (شعبة الرياضيات — معامل 2) Interactive Lessons — Trimester 2
 * YearSubjectId: 694 | Subject: SCI-MATH
 *
 * Official focused MATH syllabus (4 core lessons):
 * 1. وحدة الكائنات الحية: فوق بنية الخلية بالمجهر الإلكتروني (حقيقيات وبدائيات النوى)
 * 2. التركيب الكيميائي للـ ADN، نموذج واطسون وكريك وتماثله
 * 3. الانقسام المنصف والتنوع البيولوجي (الاختلاط بين الصبغي وداخل الصبغي)
 * 4. آلية تضاعف الـ ADN نصف المحافظ خلال الطور البيني
 */
export const SCIENCES_LESSONS_2AS_MATH_T2: SciencesInteractiveLessonData[] = [
	adaptSciencesLessonForTrack(SHARED_SCIENCES_LESSONS_2AS_T2[0], '2as_math'),
	adaptSciencesLessonForTrack(SHARED_SCIENCES_LESSONS_2AS_T2[1], '2as_math'),
	adaptSciencesLessonForTrack(SHARED_SCIENCES_LESSONS_2AS_T2[2], '2as_math'),
	adaptSciencesLessonForTrack(SHARED_SCIENCES_LESSONS_2AS_T2[3], '2as_math')
];
