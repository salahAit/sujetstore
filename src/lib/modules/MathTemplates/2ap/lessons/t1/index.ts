import type { InteractiveLessonData } from '../../../types';
import { renderLessonIllustration } from '../../../../VisualAssets/illustrations-registry';
import lesson_2ap_t1_numbers_0_29 from './lesson_2ap_t1_numbers_0_29.json';
import lesson_2ap_t1_space_table_grid from './lesson_2ap_t1_space_table_grid.json';
import lesson_2ap_t1_add_sub_problems_29 from './lesson_2ap_t1_add_sub_problems_29.json';
import lesson_2ap_t1_numbers_to_99 from './lesson_2ap_t1_numbers_to_99.json';
import lesson_2ap_t1_alignment_lengths_polygons from './lesson_2ap_t1_alignment_lengths_polygons.json';
import lesson_2ap_t1_addition_no_carry_double_half from './lesson_2ap_t1_addition_no_carry_double_half.json';
import lesson_2ap_t1_integration from './lesson_2ap_t1_integration.json';

export const LESSONS_2AP_T1: InteractiveLessonData[] = [
	lesson_2ap_t1_numbers_0_29 as InteractiveLessonData,
	lesson_2ap_t1_space_table_grid as InteractiveLessonData,
	lesson_2ap_t1_add_sub_problems_29 as InteractiveLessonData,
	{
		...(lesson_2ap_t1_numbers_to_99 as InteractiveLessonData),
		summary: {
			...(lesson_2ap_t1_numbers_to_99 as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_02_colored_pencils_bundles')
		}
	},
	{
		...(lesson_2ap_t1_alignment_lengths_polygons as InteractiveLessonData),
		summary: {
			...(lesson_2ap_t1_alignment_lengths_polygons as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_08_geometry_tools_set')
		}
	},
	{
		...(lesson_2ap_t1_addition_no_carry_double_half as InteractiveLessonData),
		summary: {
			...(lesson_2ap_t1_addition_no_carry_double_half as InteractiveLessonData).summary,
			visualSvg: renderLessonIllustration('pri_math_03_base_ten_blocks')
		}
	},
	lesson_2ap_t1_integration as InteractiveLessonData
];
