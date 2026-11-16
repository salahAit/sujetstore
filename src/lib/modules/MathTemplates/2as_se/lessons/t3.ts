import type { InteractiveLessonData } from '../../types';
import { adaptLessonForTrack } from '../../types';
import { SHARED_LESSONS_2AS_T3 } from '../../secondary_shared_2as/lessons/t3';

function polishText(text: string): string {
	return text
		.replace(
			/S = \\frac\{\\text\{عدد الحدود\}\}\{2\} \\times \(\\text\{الحد الأول\} \+ \\text\{الحد الأخير\}\)/g,
			'S = \\frac{n - p + 1}{2} (u_p + u_n)'
		)
		.replace(
			/S = \\frac\{\\text\{عدد الحدود\}\}\{2\} \\times \(\\text\{الحد الأول\} \+ \\text\{الحد الأخير\}\) = \\frac\{n - p \+ 1\}\{2\} \\times \(u_p \+ u_n\)/g,
			'S = \\frac{n - p + 1}{2} (u_p + u_n)'
		)
		.replace(/u_3 = 11 \\quad \\text\{و\} \\quad u_7 = 23/g, 'u_3 = 11, \\quad u_7 = 23')
		.replace(
			/a \+ b \+ c = 36 \\quad \\text\{و\} \\quad a \\times c = 108/g,
			'a + b + c = 36, \\quad a \\times c = 108'
		)
		.replace(/a = 12 - r \\quad \\text\{و\} \\quad c = 12 \+ r/g, 'a = 12 - r, \\quad c = 12 + r')
		.replace(
			/S = \\text\{الحد الأول\} \\times \\frac\{1 - q\^\{\\text\{عدد الحدود\}\}\}\{1 - q\}/g,
			'S = u_p \\times \\frac{1 - q^{n - p + 1}}{1 - q}'
		)
		.replace(
			/S = \\text\{الحد الأول للمجموع\} \\times \\frac\{1 - q\^\{\\text\{عدد الحدود\}\}\}\{1 - q\}/g,
			'S = u_p \\times \\frac{1 - q^{n - p + 1}}{1 - q}'
		)
		.replace(/v_2 = 18 \\quad \\text\{و\} \\quad v_5 = 486/g, 'v_2 = 18, \\quad v_5 = 486')
		.replace(
			/\\Delta \\parallel d_1 \\quad \\text\{و\} \\quad \\Delta \\parallel d_2/g,
			'\\Delta \\parallel d_1, \\quad \\Delta \\parallel d_2'
		);
}

function polishDeep<T>(obj: T): T {
	if (typeof obj === 'string') {
		return polishText(obj) as unknown as T;
	} else if (Array.isArray(obj)) {
		return obj.map(polishDeep) as unknown as T;
	} else if (obj && typeof obj === 'object') {
		const res: Record<string, any> = {};
		for (const [k, v] of Object.entries(obj)) {
			if (k === 'svg' || k === 'visualSvg') {
				res[k] = v;
			} else {
				res[k] = polishDeep(v);
			}
		}
		return res as T;
	}
	return obj;
}

/**
 * 2AS SE (Sciences Expérimentales) Interactive Lessons - Trimester 3
 * Stream: Sciences Expérimentales (SE) | YearSubjectId: 672 | Coefficient: 5
 *
 * 7 Interactive lessons fully aligned with Algerian MEN Curriculum & ONEC BAC format:
 * 1. Numerical Sequences: Explicit Generation, Recurrence & Monotonicity
 * 2. Arithmetic Sequences: Common Difference, General Term, Arithmetic Mean & Sum
 * 3. Geometric Sequences: Common Ratio, General Term, Geometric Mean, Sum & Convergence
 * 4. Space Geometry: Canonical Solids, Isometric Perspective, Surface Areas & Volumes
 * 5. Lines & Planes in Space: Relative Positions, Parallelism & Orthogonality
 * 6. Plane Sections of Solids & Vector Calculus in Space: Coplanarity & Collinearity
 * 7. Analytic Space Geometry: Coordinate Frames, Line & Plane Equations & Sphere Surface
 */
export const LESSONS_2AS_SE_T3: InteractiveLessonData[] = SHARED_LESSONS_2AS_T3.map((lesson) => {
	const tail = lesson.id.replace(/^lesson_[a-z0-9_]+_(t3_.+)$/, '$1');
	const adapted = adaptLessonForTrack(lesson, '2as_se', tail);
	const polished = polishDeep(adapted);
	return {
		...polished,
		slug: polished.slug.replace(/^2as-se-2as-se-/, '2as-se-')
	};
});
