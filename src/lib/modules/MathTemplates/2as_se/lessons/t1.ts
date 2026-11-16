import type { InteractiveLessonData } from '../../types';
import { adaptLessonForTrack } from '../../types';
import { SHARED_LESSONS_2AS_T1 } from '../../secondary_shared_2as/lessons/t1';

/**
 * 2AS SE (Sciences Expérimentales) Interactive Lessons - Trimester 1
 * Stream: Sciences Expérimentales (SE) | YearSubjectId: 672 | Coefficient: 5
 *
 * 7 Interactive lessons fully aligned with Algerian MEN Curriculum & ONEC BAC format:
 * 1. Functions: Operations, Composition, Decomposition & Symmetries
 * 2. Polynomials: Degree 2 & 3, Discriminant, Factoring & Roots
 * 3. Derivability: Rate of Change, Tangent Line & Local Linear Approximation
 * 4. Differentiation Rules: Monotonicity, Extrema & Optimization Problems
 * 5. Finite Probability: Tree Diagrams, Equiprobability, Random Variable & Dispersion
 * 6. Barycenter in Plane: Two & Three Weighted Points, Associativity & Coordinates
 * 7. Barycenter Applications: Collinearity, Concurrence & Geometric Loci
 */
export const LESSONS_2AS_SE_T1: InteractiveLessonData[] = SHARED_LESSONS_2AS_T1.map((lesson) => {
	const tail = lesson.id.replace(/^lesson_[a-z0-9_]+_(t1_.+)$/, '$1');
	const adapted = adaptLessonForTrack(lesson, '2as_se', tail);
	return {
		...adapted,
		slug: adapted.slug.replace(/^2as-se-2as-se-/, '2as-se-')
	};
});
