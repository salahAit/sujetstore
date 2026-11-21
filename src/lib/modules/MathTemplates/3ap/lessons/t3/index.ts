import type { InteractiveLessonData } from '../../../types';
import { renderLessonIllustration } from '../../../../VisualAssets/illustrations-registry';
import lesson_3ap_t3_division_equal_sharing from './lesson_3ap_t3_division_equal_sharing.json';
import lesson_3ap_t3_arithmetic_relations_calculator from './lesson_3ap_t3_arithmetic_relations_calculator.json';
import lesson_3ap_t3_time_durations from './lesson_3ap_t3_time_durations.json';
import lesson_3ap_t3_perimeter_square_rectangle from './lesson_3ap_t3_perimeter_square_rectangle.json';
import lesson_3ap_t3_axial_symmetry_grid from './lesson_3ap_t3_axial_symmetry_grid.json';
import lesson_3ap_t3_solids from './lesson_3ap_t3_solids.json';
import lesson_3ap_t3_integration from './lesson_3ap_t3_integration.json';

export const LESSONS_3AP_T3: InteractiveLessonData[] = [
	lesson_3ap_t3_division_equal_sharing as InteractiveLessonData,
	lesson_3ap_t3_arithmetic_relations_calculator as InteractiveLessonData,
	{
		...(lesson_3ap_t3_time_durations as InteractiveLessonData),
		summary: {
			...(lesson_3ap_t3_time_durations as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_05_analog_clock_ticks')
		}
	},
	lesson_3ap_t3_perimeter_square_rectangle as InteractiveLessonData,
	lesson_3ap_t3_axial_symmetry_grid as InteractiveLessonData,
	{
		...(lesson_3ap_t3_solids as InteractiveLessonData),
		discover: {
			...(lesson_3ap_t3_solids as InteractiveLessonData).discover,
			svg: renderLessonIllustration('pri_math_06_3d_geometric_solids')
		}
	},
	lesson_3ap_t3_integration as InteractiveLessonData
];
