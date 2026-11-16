import type { InteractiveLessonData } from '../../types';
import { adaptLessonForTrack } from '../../types';
import { SHARED_LESSONS_3AS_T2 } from '../../secondary_shared_3as/lessons/t2';

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

function polishSeT2Text(text: string): string {
	return text
		.replace(/ثلاث وضعيات إدماجية مترابطة/g, 'ثلاثة تمارين نموذجية مترابطة')
		.replace(/\$\s*\\pmod\{2\\pi\}\s*\$/g, '$[2\\pi]$')
		.replace(/\$\s*\\pmod\{\\pi\}\s*\$/g, '$[\\pi]$')
		.replace(/\s*\\pmod\{2\\pi\}/g, '\\;[2\\pi]')
		.replace(/\s*\\pmod\{\\pi\}/g, '\\;[\\pi]')
		.replace(
			/توافق \$\\pi\$ بترديد \$2\\pi\$/g,
			'تساوي $\\pi + 2k\\pi$ ($k \\in \\mathbb{Z}$)'
		)
		.replace(/وبترديد \$2\\pi\$/g, 'وبالقياس $[2\\pi]$')
		.replace(/بترديد \$\\pi\$/g, 'بالقياس $[\\pi]$')
		.replace(/الخلط بين الترديد/g, 'الخلط بين القياس الدوري')
		.replace(/والترديد/g, 'والقياس الدوري');
}

function polishLessonContent<T>(obj: T): T {
	if (typeof obj === 'string') {
		return polishSeT2Text(obj) as unknown as T;
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
 * 3AS SE (Sciences Expérimentales — علوم تجريبية) Interactive Lessons — Trimester 2
 * Grade: '3as_se' | YearSubjectId: 682 | Stream: SE | Coefficient: 5
 *
 * 7 BAC-caliber interactive lessons strictly aligned 1-to-1 with `3as_se_curriculum_map.json` (T2):
 * 1. lesson_3as_se_t2_counting_combinatorics_random_variables
 * 2. lesson_3as_se_t2_conditional_probability_binomial_law
 * 3. lesson_3as_se_t2_complex_algebraic_equations
 * 4. lesson_3as_se_t2_complex_trig_exponential_loci
 * 5. lesson_3as_se_t2_complex_familiar_transformations
 * 6. lesson_3as_se_t2_primitive_functions
 * 7. lesson_3as_se_t2_integration
 *
 * Strict stream isolation: ZERO Z-arithmetic / congruences / Bézout / Gauss / Direct Similitudes.
 */
export const LESSONS_3AS_SE_T2: InteractiveLessonData[] = SHARED_LESSONS_3AS_T2.map((lesson) => {
	const tail = lesson.id.replace(/^lesson_(?:3as_se|3as_shared)_/, '');
	const adapted = adaptLessonForTrack(lesson, '3as_se', tail);
	const polished = polishLessonContent(adapted);
	return {
		...polished,
		slug: polished.slug.replace(/^3as-se-3as[-_]se-/, '3as-se-')
	};
});
