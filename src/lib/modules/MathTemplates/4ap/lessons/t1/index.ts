import type { InteractiveLessonData } from '../../../types';
import { renderLessonIllustration } from '../../../../VisualAssets/illustrations-registry';
import lesson_4ap_t1_numbers_to_999999 from './lesson_4ap_t1_numbers_to_999999.json';
import lesson_4ap_t1_addition_subtraction_large from './lesson_4ap_t1_addition_subtraction_large.json';
import lesson_4ap_t1_metric_units_length_mass_capacity from './lesson_4ap_t1_metric_units_length_mass_capacity.json';
import lesson_4ap_t1_parallel_perpendicular_lines from './lesson_4ap_t1_parallel_perpendicular_lines.json';
import lesson_4ap_t1_polygons_quadrilaterals from './lesson_4ap_t1_polygons_quadrilaterals.json';
import lesson_4ap_t1_tables_and_graphs from './lesson_4ap_t1_tables_and_graphs.json';
import lesson_4ap_t1_integration from './lesson_4ap_t1_integration.json';

export const LESSONS_4AP_T1: InteractiveLessonData[] = [
	lesson_4ap_t1_numbers_to_999999 as InteractiveLessonData,
	lesson_4ap_t1_addition_subtraction_large as InteractiveLessonData,
	{
		...(lesson_4ap_t1_metric_units_length_mass_capacity as InteractiveLessonData),
		summary: {
			...(lesson_4ap_t1_metric_units_length_mass_capacity as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_07_measuring_vessels_liter')
		}
	},
	{
		...(lesson_4ap_t1_parallel_perpendicular_lines as InteractiveLessonData),
		summary: {
			...(lesson_4ap_t1_parallel_perpendicular_lines as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_08_geometry_tools_set')
		}
	},
	lesson_4ap_t1_polygons_quadrilaterals as InteractiveLessonData,
	lesson_4ap_t1_tables_and_graphs as InteractiveLessonData,
	lesson_4ap_t1_integration as InteractiveLessonData
];
