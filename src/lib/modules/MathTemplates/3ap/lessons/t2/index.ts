import type { InteractiveLessonData } from '../../../types';
import { renderLessonIllustration } from '../../../../VisualAssets/illustrations-registry';
import lesson_3ap_t2_numbers_to_99999 from './lesson_3ap_t2_numbers_to_99999.json';
import lesson_3ap_t2_multiplication_tables_powers_10 from './lesson_3ap_t2_multiplication_tables_powers_10.json';
import lesson_3ap_t2_vertical_multiplication_1digit from './lesson_3ap_t2_vertical_multiplication_1digit.json';
import lesson_3ap_t2_mass_and_capacity from './lesson_3ap_t2_mass_and_capacity.json';
import lesson_3ap_t2_polygons_familiar_shapes from './lesson_3ap_t2_polygons_familiar_shapes.json';
import lesson_3ap_t2_circle_compass from './lesson_3ap_t2_circle_compass.json';
import lesson_3ap_t2_integration from './lesson_3ap_t2_integration.json';

export const LESSONS_3AP_T2: InteractiveLessonData[] = [
	lesson_3ap_t2_numbers_to_99999 as InteractiveLessonData,
	lesson_3ap_t2_multiplication_tables_powers_10 as InteractiveLessonData,
	lesson_3ap_t2_vertical_multiplication_1digit as InteractiveLessonData,
	{
		...(lesson_3ap_t2_mass_and_capacity as InteractiveLessonData),
		summary: {
			...(lesson_3ap_t2_mass_and_capacity as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_07_measuring_vessels_liter')
		}
	},
	lesson_3ap_t2_polygons_familiar_shapes as InteractiveLessonData,
	{
		...(lesson_3ap_t2_circle_compass as InteractiveLessonData),
		summary: {
			...(lesson_3ap_t2_circle_compass as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_08_geometry_tools_set')
		}
	},
	{
		...(lesson_3ap_t2_integration as InteractiveLessonData),
		summary: {
			...(lesson_3ap_t2_integration as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_04_two_pan_balance')
		}
	}
];
