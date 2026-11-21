import type { InteractiveLessonData } from '../../../types';
import { renderLessonIllustration } from '../../../../VisualAssets/illustrations-registry';
import lesson_4ap_t2_multiplication_2digit from './lesson_4ap_t2_multiplication_2digit.json';
import lesson_4ap_t2_multiples_euclidean_division from './lesson_4ap_t2_multiples_euclidean_division.json';
import lesson_4ap_t2_simple_fractions from './lesson_4ap_t2_simple_fractions.json';
import lesson_4ap_t2_decimal_fractions_decimals_intro from './lesson_4ap_t2_decimal_fractions_decimals_intro.json';
import lesson_4ap_t2_angles_classification from './lesson_4ap_t2_angles_classification.json';
import lesson_4ap_t2_circle_and_triangles from './lesson_4ap_t2_circle_and_triangles.json';
import lesson_4ap_t2_integration from './lesson_4ap_t2_integration.json';

export const LESSONS_4AP_T2: InteractiveLessonData[] = [
	lesson_4ap_t2_multiplication_2digit as InteractiveLessonData,
	lesson_4ap_t2_multiples_euclidean_division as InteractiveLessonData,
	lesson_4ap_t2_simple_fractions as InteractiveLessonData,
	lesson_4ap_t2_decimal_fractions_decimals_intro as InteractiveLessonData,
	lesson_4ap_t2_angles_classification as InteractiveLessonData,
	{
		...(lesson_4ap_t2_circle_and_triangles as InteractiveLessonData),
		summary: {
			...(lesson_4ap_t2_circle_and_triangles as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_08_geometry_tools_set')
		}
	},
	{
		...(lesson_4ap_t2_integration as InteractiveLessonData),
		summary: {
			...(lesson_4ap_t2_integration as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_04_two_pan_balance')
		}
	}
];
