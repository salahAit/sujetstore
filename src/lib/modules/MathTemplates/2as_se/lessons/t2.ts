import type { InteractiveLessonData } from '../../types';
import { adaptLessonForTrack } from '../../types';
import { SHARED_LESSONS_2AS_T2 } from '../../secondary_shared_2as/lessons/t2';

function polishText(text: string): string {
	return text
		.replace(
			/\\cos x = \\cos \\alpha \\iff x = \\alpha \+ 2k\\pi \\quad \\text\{أو\} \\quad x = -\\alpha \+ 2k\\pi \\quad \(k \\in \\mathbb\{Z\}\)/g,
			'\\cos x = \\cos \\alpha \\iff x = \\alpha + 2k\\pi \\quad \\lor \\quad x = -\\alpha + 2k\\pi \\quad (k \\in \\mathbb{Z})'
		)
		.replace(
			/\\sin x = \\sin \\alpha \\iff x = \\alpha \+ 2k\\pi \\quad \\text\{أو\} \\quad x = \\pi - \\alpha \+ 2k\\pi \\quad \(k \\in \\mathbb\{Z\}\)/g,
			'\\sin x = \\sin \\alpha \\iff x = \\alpha + 2k\\pi \\quad \\lor \\quad x = \\pi - \\alpha + 2k\\pi \\quad (k \\in \\mathbb{Z})'
		)
		.replace(
			/\\text\{مساحة\}\(A'B'C'\) = k\^2 \\times \\text\{مساحة\}\(ABC\) = \(-3\)\^2 \\times 10 = 9 \\times 10 = 90 \\text\{ cm\}\^2/g,
			'\\mathcal{A}(A\'B\'C\') = k^2 \\times \\mathcal{A}(ABC) = (-3)^2 \\times 10 = 9 \\times 10 = 90\\text{ cm}^2'
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
 * 2AS SE (Sciences Expérimentales) Interactive Lessons - Trimester 2
 * Stream: Sciences Expérimentales (SE) | YearSubjectId: 672 | Coefficient: 5
 *
 * 7 Interactive lessons fully aligned with Algerian MEN Curriculum & ONEC BAC format:
 * 1. Limits & Asymptotes: Horizontal & Vertical Behavior of Rational Functions
 * 2. Indeterminate Forms & Removal: Oblique Asymptotes & Relative Position
 * 3. Oriented Angles & Trigonometric Circle: Radians & Principal Measures
 * 4. Trigonometry: Addition & Double-Angle Formulas, Equations & Inequalities
 * 5. Homothety in Plane: Center, Ratio, Geometric Properties & Constructions
 * 6. Scalar Product in Plane: Analytic Form, Line & Circle Equations
 * 7. Scalar Product Applications: Al-Kashi, Median Theorem & Point Sets
 */
export const LESSONS_2AS_SE_T2: InteractiveLessonData[] = SHARED_LESSONS_2AS_T2.map((lesson) => {
	const tail = lesson.id.replace(/^lesson_[a-z0-9_]+_(t2_.+)$/, '$1');
	const adapted = adaptLessonForTrack(lesson, '2as_se', tail);
	const polished = polishDeep(adapted);
	return {
		...polished,
		slug: polished.slug.replace(/^2as-se-2as-se-/, '2as-se-')
	};
});
