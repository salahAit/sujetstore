import type { InteractiveLessonData } from '../../../types';
import { renderLessonIllustration } from '../../../../VisualAssets/illustrations-registry';
import lesson_1ap_t2_numbers_10_to_19_decomp from './lesson_1ap_t2_numbers_10_to_19_decomp.json';
import lesson_1ap_t2_numbers_20_to_39 from './lesson_1ap_t2_numbers_20_to_39.json';
import lesson_1ap_t2_add_sub_small_numbers_to_39 from './lesson_1ap_t2_add_sub_small_numbers_to_39.json';
import lesson_1ap_t2_plane_shapes from './lesson_1ap_t2_plane_shapes.json';
import lesson_1ap_t2_solids_familiar from './lesson_1ap_t2_solids_familiar.json';
import lesson_1ap_t2_time_telling_hour_half from './lesson_1ap_t2_time_telling_hour_half.json';
import lesson_1ap_t2_integration from './lesson_1ap_t2_integration.json';

export const LESSONS_1AP_T2: InteractiveLessonData[] = [
	{
		...(lesson_1ap_t2_numbers_10_to_19_decomp as InteractiveLessonData),
		summary: {
			...(lesson_1ap_t2_numbers_10_to_19_decomp as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_02_colored_pencils_bundles')
		}
	},
	{
		...(lesson_1ap_t2_numbers_20_to_39 as InteractiveLessonData),
		summary: {
			...(lesson_1ap_t2_numbers_20_to_39 as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_02_colored_pencils_bundles')
		}
	},
	{
		...(lesson_1ap_t2_add_sub_small_numbers_to_39 as InteractiveLessonData),
		summary: {
			...(lesson_1ap_t2_add_sub_small_numbers_to_39 as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_01_apple_baskets')
		}
	},
	lesson_1ap_t2_plane_shapes as InteractiveLessonData,
	{
		...(lesson_1ap_t2_solids_familiar as InteractiveLessonData),
		discover: {
			...(lesson_1ap_t2_solids_familiar as InteractiveLessonData).discover,
			svg: renderLessonIllustration('pri_math_06_3d_geometric_solids')
		}
	},
	{
		...(lesson_1ap_t2_time_telling_hour_half as InteractiveLessonData),
		summary: {
			...(lesson_1ap_t2_time_telling_hour_half as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_05_analog_clock_ticks')
		}
	},
	lesson_1ap_t2_integration as InteractiveLessonData
];
