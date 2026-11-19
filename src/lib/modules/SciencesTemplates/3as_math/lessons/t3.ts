import { adaptSciencesLessonForTrack, type SciencesInteractiveLessonData } from '../../types';
import { SHARED_SCIENCES_LESSONS_3AS_T2 } from '../../secondary_shared_3as/lessons/t2';
import { SHARED_SCIENCES_LESSONS_3AS_DOMAIN1_T3 } from '../../secondary_shared_3as/lessons/t3';

/**
 * 3AS MATH (Mathématiques — رياضيات) Interactive Lessons — Trimester 3 (4 lessons)
 * Grade: '3as_math' | YearSubjectId: 704 | SubjectId: 'SCI-MATH' | Coefficient: 2
 * Official BAC MATH Program: STRICTLY Domain 1 (ZERO Bioenergetics, ZERO Plate Tectonics!).
 * T3 covers Unit 5 (Neurobiology: Resting/Action Potential, Synapse/Integration, Neurotoxins)
 *         + Comprehensive Domain 1 BAC MATH Synthesis (8 + 12 pts ONEC structure).
 */
export const SCIENCES_LESSONS_3AS_MATH_T3: SciencesInteractiveLessonData[] = [
	adaptSciencesLessonForTrack(
		{
			...SHARED_SCIENCES_LESSONS_3AS_T2[3],
			trimesterId: 't3',
			sequenceId: 'seq5',
			order: 1
		},
		'3as_math'
	),
	adaptSciencesLessonForTrack(
		{
			...SHARED_SCIENCES_LESSONS_3AS_T2[4],
			trimesterId: 't3',
			sequenceId: 'seq5',
			order: 2
		},
		'3as_math'
	),
	adaptSciencesLessonForTrack(
		{
			...SHARED_SCIENCES_LESSONS_3AS_DOMAIN1_T3[0],
			trimesterId: 't3',
			sequenceId: 'seq5',
			order: 3
		},
		'3as_math'
	),
	adaptSciencesLessonForTrack(
		{
			...SHARED_SCIENCES_LESSONS_3AS_DOMAIN1_T3[1],
			trimesterId: 't3',
			sequenceId: 'seq6',
			order: 4
		},
		'3as_math'
	)
];
