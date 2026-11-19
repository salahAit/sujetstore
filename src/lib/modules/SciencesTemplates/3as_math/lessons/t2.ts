import { adaptSciencesLessonForTrack, type SciencesInteractiveLessonData } from '../../types';
import { SHARED_SCIENCES_LESSONS_3AS_T1 } from '../../secondary_shared_3as/lessons/t1';
import { SHARED_SCIENCES_LESSONS_3AS_T2 } from '../../secondary_shared_3as/lessons/t2';

/**
 * 3AS MATH (Mathématiques — رياضيات) Interactive Lessons — Trimester 2 (4 lessons)
 * Grade: '3as_math' | YearSubjectId: 704 | SubjectId: 'SCI-MATH' | Coefficient: 2
 * Official BAC MATH Program: STRICTLY Domain 1 (التخصص الوظيفي للبروتينات).
 * T2 covers Units 3 & 4: Enzymology (Specificity, Kinetics, pH/Temp, Inhibition)
 *                      + Immunology (Self/CMH/Humoral Antibodies, Cellular LTc, Cooperation IL-2 & HIV).
 */
export const SCIENCES_LESSONS_3AS_MATH_T2: SciencesInteractiveLessonData[] = [
	adaptSciencesLessonForTrack(
		{
			...SHARED_SCIENCES_LESSONS_3AS_T1[3],
			trimesterId: 't2',
			sequenceId: 'seq3',
			order: 1
		},
		'3as_math'
	),
	adaptSciencesLessonForTrack(
		{
			...SHARED_SCIENCES_LESSONS_3AS_T1[4],
			trimesterId: 't2',
			sequenceId: 'seq3',
			order: 2
		},
		'3as_math'
	),
	adaptSciencesLessonForTrack(
		{
			...SHARED_SCIENCES_LESSONS_3AS_T2[1],
			trimesterId: 't2',
			sequenceId: 'seq4',
			order: 3,
			titleAr: 'الدفاع عن الذات (1): نظام الذات (CMH/ABO) والاستجابة المناعية الخلطية والأجسام المضادة'
		},
		'3as_math'
	),
	adaptSciencesLessonForTrack(
		{
			...SHARED_SCIENCES_LESSONS_3AS_T2[2],
			trimesterId: 't2',
			sequenceId: 'seq4',
			order: 4
		},
		'3as_math'
	)
];
