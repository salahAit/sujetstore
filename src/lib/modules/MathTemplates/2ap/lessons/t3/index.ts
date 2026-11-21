import type { InteractiveLessonData } from '../../../types';
import { renderLessonIllustration } from '../../../../VisualAssets/illustrations-registry';

import lessonSubtractionWithBorrow from './lesson_2ap_t3_subtraction_with_borrow.json';
import lessonMassAndBarChart from './lesson_2ap_t3_mass_and_bar_chart.json';
import lessonGridEnlargementSymmetry from './lesson_2ap_t3_grid_enlargement_symmetry.json';
import lessonMultiplicationIntroTables from './lesson_2ap_t3_multiplication_intro_tables.json';
import lessonMultiplicationTens2Digit from './lesson_2ap_t3_multiplication_tens_2digit.json';
import lessonSolidsCubeCuboid from './lesson_2ap_t3_solids_cube_cuboid.json';
import lessonIntegration from './lesson_2ap_t3_integration.json';

export const LESSONS_2AP_T3: InteractiveLessonData[] = [
	lessonSubtractionWithBorrow as InteractiveLessonData,
	{
		...(lessonMassAndBarChart as InteractiveLessonData),
		summary: {
			...(lessonMassAndBarChart as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_04_two_pan_balance')
		}
	},
	lessonGridEnlargementSymmetry as InteractiveLessonData,
	lessonMultiplicationIntroTables as InteractiveLessonData,
	lessonMultiplicationTens2Digit as InteractiveLessonData,
	{
		...(lessonSolidsCubeCuboid as InteractiveLessonData),
		discover: {
			...(lessonSolidsCubeCuboid as InteractiveLessonData).discover,
			svg: renderLessonIllustration('pri_math_06_3d_geometric_solids')
		}
	},
	lessonIntegration as InteractiveLessonData
];
