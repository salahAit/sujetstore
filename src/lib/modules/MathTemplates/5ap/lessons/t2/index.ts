import type { InteractiveLessonData } from '../../../types';
import { renderLessonIllustration } from '../../../../VisualAssets/illustrations-registry';
import lesson1 from './lesson_5ap_t2_euclidean_division.json';
import lesson2 from './lesson_5ap_t2_decimal_add_sub_problems.json';
import lesson3 from './lesson_5ap_t2_decimal_number_line_compare_decompose.json';
import lesson4 from './lesson_5ap_t2_decimal_mul_div_10_100_1000_natural.json';
import lesson5 from './lesson_5ap_t2_proportionality_linearity_unit_rate.json';
import lesson6 from './lesson_5ap_t2_symmetry_plane_shapes_triangles.json';
import lesson7 from './lesson_5ap_t2_perimeter_and_area_squares_rectangles.json';

export const LESSONS_5AP_T2: InteractiveLessonData[] = [
	lesson1 as unknown as InteractiveLessonData,
	lesson2 as unknown as InteractiveLessonData,
	lesson3 as unknown as InteractiveLessonData,
	{
		...(lesson4 as unknown as InteractiveLessonData),
		summary: {
			...(lesson4 as unknown as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_07_measuring_vessels_liter')
		}
	},
	lesson5 as unknown as InteractiveLessonData,
	lesson6 as unknown as InteractiveLessonData,
	lesson7 as unknown as InteractiveLessonData
];
