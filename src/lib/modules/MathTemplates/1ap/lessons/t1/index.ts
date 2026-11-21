import type { InteractiveLessonData } from '../../../types';
import { renderLessonIllustration } from '../../../../VisualAssets/illustrations-registry';
import lesson_1ap_t1_spatial_positioning from './lesson_1ap_t1_spatial_positioning.json';
import lesson_1ap_t1_numbers_0_to_5 from './lesson_1ap_t1_numbers_0_to_5.json';
import lesson_1ap_t1_compare_quantities from './lesson_1ap_t1_compare_quantities.json';
import lesson_1ap_t1_numbers_6_to_9 from './lesson_1ap_t1_numbers_6_to_9.json';
import lesson_1ap_t1_compare_lengths_direct from './lesson_1ap_t1_compare_lengths_direct.json';
import lesson_1ap_t1_addition_symbols_to_9 from './lesson_1ap_t1_addition_symbols_to_9.json';
import lesson_1ap_t1_integration from './lesson_1ap_t1_integration.json';

export const LESSONS_1AP_T1: InteractiveLessonData[] = [
	lesson_1ap_t1_spatial_positioning as InteractiveLessonData,
	lesson_1ap_t1_numbers_0_to_5 as InteractiveLessonData,
	{
		...(lesson_1ap_t1_compare_quantities as InteractiveLessonData),
		summary: {
			...(lesson_1ap_t1_compare_quantities as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_01_apple_baskets')
		}
	},
	lesson_1ap_t1_numbers_6_to_9 as InteractiveLessonData,
	lesson_1ap_t1_compare_lengths_direct as InteractiveLessonData,
	{
		...(lesson_1ap_t1_addition_symbols_to_9 as InteractiveLessonData),
		summary: {
			...(lesson_1ap_t1_addition_symbols_to_9 as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_01_apple_baskets')
		}
	},
	lesson_1ap_t1_integration as InteractiveLessonData
];
