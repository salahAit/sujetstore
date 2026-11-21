import type { InteractiveLessonData } from '../../../types';
import { renderLessonIllustration } from '../../../../VisualAssets/illustrations-registry';
import lesson1 from './lesson_5ap_t3_division_two_digit_exact_decimal.json';
import lesson2 from './lesson_5ap_t3_decimal_relations_fractions_place_value.json';
import lesson3 from './lesson_5ap_t3_percentages_charts_scale_speed.json';
import lesson4 from './lesson_5ap_t3_quadrilaterals_circle_construction.json';
import lesson5 from './lesson_5ap_t3_solid_geometry_cube_prism.json';
import lesson6 from './lesson_5ap_t3_mass_capacity_decimal_measures.json';
import lesson7 from './lesson_5ap_t3_time_durations_calculations.json';

export const LESSONS_5AP_T3: InteractiveLessonData[] = [
	lesson1 as InteractiveLessonData,
	lesson2 as InteractiveLessonData,
	lesson3 as InteractiveLessonData,
	lesson4 as InteractiveLessonData,
	{
		...(lesson5 as InteractiveLessonData),
		discover: {
			...(lesson5 as InteractiveLessonData).discover,
			svg: renderLessonIllustration('pri_math_06_3d_geometric_solids')
		}
	},
	{
		...(lesson6 as InteractiveLessonData),
		summary: {
			...(lesson6 as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_07_measuring_vessels_liter')
		}
	},
	{
		...(lesson7 as InteractiveLessonData),
		summary: {
			...(lesson7 as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_05_analog_clock_ticks')
		}
	}
];
