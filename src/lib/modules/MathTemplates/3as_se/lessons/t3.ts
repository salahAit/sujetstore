import type { InteractiveLessonData } from '../../types';
import { adaptLessonForTrack } from '../../types';
import { SHARED_LESSONS_3AS_T3 } from '../../secondary_shared_3as/lessons/t3';

/**
 * 3AS SE (Sciences Expérimentales — علوم تجريبية) Interactive Lessons — Trimester 3
 * Grade: '3as_se' | YearSubjectId: 682 | Stream: SE | Coefficient: 5
 *
 * 7 BAC-caliber interactive lessons strictly aligned 1-to-1 with `3as_se_curriculum_map.json` (T3):
 * 1. lesson_3as_se_t3_definite_integral_mean_value
 * 2. lesson_3as_se_t3_integration_by_parts_areas_volumes
 * 3. lesson_3as_se_t3_space_vectors_coordinates_sphere
 * 4. lesson_3as_se_t3_space_scalar_product_planes_distance
 * 5. lesson_3as_se_t3_space_lines_parametric_representations
 * 6. lesson_3as_se_t3_space_relative_positions_intersections
 * 7. lesson_3as_se_t3_integration
 *
 * Strict stream isolation: ZERO Z-arithmetic / congruences / Bézout / Gauss / Direct Similitudes.
 */
export const LESSONS_3AS_SE_T3: InteractiveLessonData[] = SHARED_LESSONS_3AS_T3.map((lesson) => {
	const tail = lesson.id.replace(/^lesson_(?:3as_se|3as_shared)_/, '');
	const adapted = adaptLessonForTrack(lesson, '3as_se', tail);
	return {
		...adapted,
		slug: adapted.slug.replace(/^3as-se-3as[-_]se-/, '3as-se-')
	};
});
