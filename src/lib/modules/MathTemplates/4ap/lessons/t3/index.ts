import type { InteractiveLessonData } from '../../../types';
import { renderLessonIllustration } from '../../../../VisualAssets/illustrations-registry';
import lesson_4ap_t3_decimal_add_sub from './lesson_4ap_t3_decimal_add_sub.json';
import lesson_4ap_t3_decimal_mul_div_10_100_1000 from './lesson_4ap_t3_decimal_mul_div_10_100_1000.json';
import lesson_4ap_t3_simple_proportionality from './lesson_4ap_t3_simple_proportionality.json';
import lesson_4ap_t3_perimeter_area_square_rectangle from './lesson_4ap_t3_perimeter_area_square_rectangle.json';
import lesson_4ap_t3_durations_calculation from './lesson_4ap_t3_durations_calculation.json';
import lesson_4ap_t3_solids_nets_cube_cuboid from './lesson_4ap_t3_solids_nets_cube_cuboid.json';
import lesson_4ap_t3_integration from './lesson_4ap_t3_integration.json';

export const LESSONS_4AP_T3: InteractiveLessonData[] = [
	lesson_4ap_t3_decimal_add_sub as InteractiveLessonData,
	{
		...(lesson_4ap_t3_decimal_mul_div_10_100_1000 as InteractiveLessonData),
		summary: {
			...(lesson_4ap_t3_decimal_mul_div_10_100_1000 as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_07_measuring_vessels_liter')
		}
	},
	lesson_4ap_t3_simple_proportionality as InteractiveLessonData,
	lesson_4ap_t3_perimeter_area_square_rectangle as InteractiveLessonData,
	{
		...(lesson_4ap_t3_durations_calculation as InteractiveLessonData),
		summary: {
			...(lesson_4ap_t3_durations_calculation as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_05_analog_clock_ticks')
		}
	},
	{
		...(lesson_4ap_t3_solids_nets_cube_cuboid as InteractiveLessonData),
		discover: {
			...(lesson_4ap_t3_solids_nets_cube_cuboid as InteractiveLessonData).discover,
			svg: renderLessonIllustration('pri_math_06_3d_geometric_solids')
		}
	},
	lesson_4ap_t3_integration as InteractiveLessonData
];
