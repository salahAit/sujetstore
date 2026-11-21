import type { InteractiveLessonData } from '../../../types';
import { renderLessonIllustration } from '../../../../VisualAssets/illustrations-registry';
import lesson_1ap_t3_numbers_40_to_69 from './lesson_1ap_t3_numbers_40_to_69.json';
import lesson_1ap_t3_numbers_70_to_99 from './lesson_1ap_t3_numbers_70_to_99.json';
import lesson_1ap_t3_grid_location_navigation from './lesson_1ap_t3_grid_location_navigation.json';
import lesson_1ap_t3_algerian_coins_da from './lesson_1ap_t3_algerian_coins_da.json';
import lesson_1ap_t3_mental_math_doubles_complements from './lesson_1ap_t3_mental_math_doubles_complements.json';
import lesson_1ap_t3_add_sub_within_99 from './lesson_1ap_t3_add_sub_within_99.json';
import lesson_1ap_t3_integration from './lesson_1ap_t3_integration.json';

export const LESSONS_1AP_T3: InteractiveLessonData[] = [
	{
		...(lesson_1ap_t3_numbers_40_to_69 as InteractiveLessonData),
		summary: {
			...(lesson_1ap_t3_numbers_40_to_69 as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_02_colored_pencils_bundles')
		}
	},
	lesson_1ap_t3_numbers_70_to_99 as InteractiveLessonData,
	lesson_1ap_t3_grid_location_navigation as InteractiveLessonData,
	lesson_1ap_t3_algerian_coins_da as InteractiveLessonData,
	lesson_1ap_t3_mental_math_doubles_complements as InteractiveLessonData,
	lesson_1ap_t3_add_sub_within_99 as InteractiveLessonData,
	lesson_1ap_t3_integration as InteractiveLessonData
];
