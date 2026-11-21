import type { InteractiveLessonData } from '../../../types';
import { renderLessonIllustration } from '../../../../VisualAssets/illustrations-registry';
import lesson_3ap_t1_numbers_to_9999 from './lesson_3ap_t1_numbers_to_9999.json';
import lesson_3ap_t1_add_sub_regrouping from './lesson_3ap_t1_add_sub_regrouping.json';
import lesson_3ap_t1_lengths_m_cm_mm from './lesson_3ap_t1_lengths_m_cm_mm.json';
import lesson_3ap_t1_alignment_segment_midpoint from './lesson_3ap_t1_alignment_segment_midpoint.json';
import lesson_3ap_t1_right_angle_set_square from './lesson_3ap_t1_right_angle_set_square.json';
import lesson_3ap_t1_bar_charts_and_tables from './lesson_3ap_t1_bar_charts_and_tables.json';
import lesson_3ap_t1_integration from './lesson_3ap_t1_integration.json';

export const LESSONS_3AP_T1: InteractiveLessonData[] = [
	{
		...(lesson_3ap_t1_numbers_to_9999 as InteractiveLessonData),
		summary: {
			...(lesson_3ap_t1_numbers_to_9999 as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_03_base_ten_blocks')
		}
	},
	lesson_3ap_t1_add_sub_regrouping as InteractiveLessonData,
	lesson_3ap_t1_lengths_m_cm_mm as InteractiveLessonData,
	lesson_3ap_t1_alignment_segment_midpoint as InteractiveLessonData,
	{
		...(lesson_3ap_t1_right_angle_set_square as InteractiveLessonData),
		summary: {
			...(lesson_3ap_t1_right_angle_set_square as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_08_geometry_tools_set')
		}
	},
	lesson_3ap_t1_bar_charts_and_tables as InteractiveLessonData,
	lesson_3ap_t1_integration as InteractiveLessonData
];
