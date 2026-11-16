import type { InteractiveLessonData } from '../../types';
import { adaptLessonForTrack } from '../../types';
import { SHARED_LESSONS_3AS_T1 } from '../../secondary_shared_3as/lessons/t1';

const PROTECTED_KEYS = new Set([
	'id',
	'slug',
	'grade',
	'yearSubjectId',
	'trimesterId',
	'sequenceId',
	'sequenceTitleAr',
	'order',
	'domain',
	'titleAr',
	'objectives',
	'keywordsAr',
	'svg',
	'visualSvg'
]);

function polishSeT1Text(text: string): string {
	return text
		.replace(
			/ويُمنع منعاً باتاً استعمال قاعدة لوبيتال في البكالوريا\./g,
			'ويجب الاعتماد حصراً على النهايات المرجعية والتزايد المقارن المقررة في المنهاج الرسمي.'
		)
		.replace(/المسألة الإدماجية النموذجية/g, 'المسألة الشاملة النموذجية');
}

function polishLessonContent<T>(obj: T): T {
	if (typeof obj === 'string') {
		return polishSeT1Text(obj) as unknown as T;
	}
	if (Array.isArray(obj)) {
		return obj.map((item) => polishLessonContent(item)) as unknown as T;
	}
	if (obj && typeof obj === 'object') {
		const out: Record<string, unknown> = {};
		for (const [key, val] of Object.entries(obj)) {
			out[key] = PROTECTED_KEYS.has(key) ? val : polishLessonContent(val);
		}
		return out as T;
	}
	return obj;
}

/**
 * 3AS SE (Sciences Expérimentales — علوم تجريبية) Interactive Lessons — Trimester 1
 * Grade: '3as_se' | YearSubjectId: 682 | Stream: SE | Coefficient: 5
 *
 * 7 BAC-caliber interactive lessons strictly aligned 1-to-1 with `3as_se_curriculum_map.json` (T1):
 * 1. lesson_3as_se_t1_continuity_ivt_derivability
 * 2. lesson_3as_se_t1_exponential_functions
 * 3. lesson_3as_se_t1_logarithmic_functions_diff_eq
 * 4. lesson_3as_se_t1_limits_asymptotes_comparative_growth
 * 5. lesson_3as_se_t1_comprehensive_function_study_parametric
 * 6. lesson_3as_se_t1_numerical_sequences_induction
 * 7. lesson_3as_se_t1_integration
 *
 * Strict stream isolation: ZERO Z-arithmetic / congruences / Bézout / Gauss / Direct Similitudes.
 */
export const LESSONS_3AS_SE_T1: InteractiveLessonData[] = SHARED_LESSONS_3AS_T1.map((lesson) => {
	const tail = lesson.id.replace(/^lesson_(?:3as_se|3as_shared)_/, '');
	const adapted = adaptLessonForTrack(lesson, '3as_se', tail);
	const polished = polishLessonContent(adapted);
	return {
		...polished,
		slug: polished.slug.replace(/^3as-se-3as[-_]se-/, '3as-se-')
	};
});
