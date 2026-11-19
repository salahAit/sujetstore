import type { TrimesterId } from '../SujetBuilder/types';
import type {
	SciencesInteractiveLessonData,
	SciencesParameterizedTemplate,
	SciencesTrackId
} from './types';

import { SCIENCES_LESSONS_1AP_T1 } from './1ap/lessons/t1';
import { SCIENCES_LESSONS_1AP_T2 } from './1ap/lessons/t2';
import { SCIENCES_LESSONS_1AP_T3 } from './1ap/lessons/t3';
import { SCIENCES_LESSONS_2AP_T1 } from './2ap/lessons/t1';
import { SCIENCES_LESSONS_2AP_T2 } from './2ap/lessons/t2';
import { SCIENCES_LESSONS_2AP_T3 } from './2ap/lessons/t3';
import { SCIENCES_LESSONS_3AP_T1 } from './3ap/lessons/t1';
import { SCIENCES_LESSONS_3AP_T2 } from './3ap/lessons/t2';
import { SCIENCES_LESSONS_3AP_T3 } from './3ap/lessons/t3';
import { SCIENCES_LESSONS_4AP_T1 } from './4ap/lessons/t1';
import { SCIENCES_LESSONS_4AP_T2 } from './4ap/lessons/t2';
import { SCIENCES_LESSONS_4AP_T3 } from './4ap/lessons/t3';
import { SCIENCES_LESSONS_5AP_T1 } from './5ap/lessons/t1';
import { SCIENCES_LESSONS_5AP_T2 } from './5ap/lessons/t2';
import { SCIENCES_LESSONS_5AP_T3 } from './5ap/lessons/t3';
import { SCIENCES_LESSONS_1AM_T1 } from './1am/lessons/t1';
import { SCIENCES_LESSONS_1AM_T2 } from './1am/lessons/t2';
import { SCIENCES_LESSONS_1AM_T3 } from './1am/lessons/t3';
import { SCIENCES_LESSONS_2AM_T1 } from './2am/lessons/t1';
import { SCIENCES_LESSONS_2AM_T2 } from './2am/lessons/t2';
import { SCIENCES_LESSONS_2AM_T3 } from './2am/lessons/t3';
import { SCIENCES_LESSONS_3AM_T1 } from './3am/lessons/t1';
import { SCIENCES_LESSONS_3AM_T2 } from './3am/lessons/t2';
import { SCIENCES_LESSONS_3AM_T3 } from './3am/lessons/t3';
import { SCIENCES_LESSONS_4AM_T1 } from './4am/lessons/t1';
import { SCIENCES_LESSONS_4AM_T2 } from './4am/lessons/t2';
import { SCIENCES_LESSONS_4AM_T3 } from './4am/lessons/t3';
import { SCIENCES_LESSONS_1AS_TCST_T1 } from './1as_tcst/lessons/t1';
import { SCIENCES_LESSONS_1AS_TCST_T2 } from './1as_tcst/lessons/t2';
import { SCIENCES_LESSONS_1AS_TCST_T3 } from './1as_tcst/lessons/t3';
import { SCIENCES_LESSONS_2AS_SE_T1 } from './2as_se/lessons/t1';
import { SCIENCES_LESSONS_2AS_SE_T2 } from './2as_se/lessons/t2';
import { SCIENCES_LESSONS_2AS_SE_T3 } from './2as_se/lessons/t3';
import { SCIENCES_LESSONS_2AS_MATH_T1 } from './2as_math/lessons/t1';
import { SCIENCES_LESSONS_2AS_MATH_T2 } from './2as_math/lessons/t2';
import { SCIENCES_LESSONS_2AS_MATH_T3 } from './2as_math/lessons/t3';
import { SCIENCES_LESSONS_3AS_SE_T1 } from './3as_se/lessons/t1';
import { SCIENCES_LESSONS_3AS_SE_T2 } from './3as_se/lessons/t2';
import { SCIENCES_LESSONS_3AS_SE_T3 } from './3as_se/lessons/t3';
import { SCIENCES_LESSONS_3AS_MATH_T1 } from './3as_math/lessons/t1';
import { SCIENCES_LESSONS_3AS_MATH_T2 } from './3as_math/lessons/t2';
import { SCIENCES_LESSONS_3AS_MATH_T3 } from './3as_math/lessons/t3';

import { SCIENCES_TEMPLATES_1AP_T1 } from './1ap/templates/t1';
import { SCIENCES_TEMPLATES_1AP_T2 } from './1ap/templates/t2';
import { SCIENCES_TEMPLATES_1AP_T3 } from './1ap/templates/t3';
import { SCIENCES_TEMPLATES_2AP_T1 } from './2ap/templates/t1';
import { SCIENCES_TEMPLATES_2AP_T2 } from './2ap/templates/t2';
import { SCIENCES_TEMPLATES_2AP_T3 } from './2ap/templates/t3';
import { SCIENCES_TEMPLATES_3AP_T1 } from './3ap/templates/t1';
import { SCIENCES_TEMPLATES_3AP_T2 } from './3ap/templates/t2';
import { SCIENCES_TEMPLATES_3AP_T3 } from './3ap/templates/t3';
import { SCIENCES_TEMPLATES_4AP_T1 } from './4ap/templates/t1';
import { SCIENCES_TEMPLATES_4AP_T2 } from './4ap/templates/t2';
import { SCIENCES_TEMPLATES_4AP_T3 } from './4ap/templates/t3';
import { SCIENCES_TEMPLATES_5AP_T1 } from './5ap/templates/t1';
import { SCIENCES_TEMPLATES_5AP_T2 } from './5ap/templates/t2';
import { SCIENCES_TEMPLATES_5AP_T3 } from './5ap/templates/t3';
import { SCIENCES_TEMPLATES_1AM_T1 } from './1am/templates/t1';
import { SCIENCES_TEMPLATES_1AM_T2 } from './1am/templates/t2';
import { SCIENCES_TEMPLATES_1AM_T3 } from './1am/templates/t3';
import { SCIENCES_TEMPLATES_2AM_T1 } from './2am/templates/t1';
import { SCIENCES_TEMPLATES_2AM_T2 } from './2am/templates/t2';
import { SCIENCES_TEMPLATES_2AM_T3 } from './2am/templates/t3';
import { SCIENCES_TEMPLATES_3AM_T1 } from './3am/templates/t1';
import { SCIENCES_TEMPLATES_3AM_T2 } from './3am/templates/t2';
import { SCIENCES_TEMPLATES_3AM_T3 } from './3am/templates/t3';
import { SCIENCES_TEMPLATES_4AM_T1 } from './4am/templates/t1';
import { SCIENCES_TEMPLATES_4AM_T2 } from './4am/templates/t2';
import { SCIENCES_TEMPLATES_4AM_T3 } from './4am/templates/t3';
import { SCIENCES_TEMPLATES_1AS_TCST_T1 } from './1as_tcst/templates/t1';
import { SCIENCES_TEMPLATES_1AS_TCST_T2 } from './1as_tcst/templates/t2';
import { SCIENCES_TEMPLATES_1AS_TCST_T3 } from './1as_tcst/templates/t3';
import { SCIENCES_TEMPLATES_2AS_SE_T1 } from './2as_se/templates/t1';
import { SCIENCES_TEMPLATES_2AS_SE_T2 } from './2as_se/templates/t2';
import { SCIENCES_TEMPLATES_2AS_SE_T3 } from './2as_se/templates/t3';
import { SCIENCES_TEMPLATES_2AS_MATH_T1 } from './2as_math/templates/t1';
import { SCIENCES_TEMPLATES_2AS_MATH_T2 } from './2as_math/templates/t2';
import { SCIENCES_TEMPLATES_2AS_MATH_T3 } from './2as_math/templates/t3';
import { SCIENCES_TEMPLATES_3AS_SE_T1 } from './3as_se/templates/t1';
import { SCIENCES_TEMPLATES_3AS_SE_T2 } from './3as_se/templates/t2';
import { SCIENCES_TEMPLATES_3AS_SE_T3 } from './3as_se/templates/t3';
import { SCIENCES_TEMPLATES_3AS_MATH_T1 } from './3as_math/templates/t1';
import { SCIENCES_TEMPLATES_3AS_MATH_T2 } from './3as_math/templates/t2';
import { SCIENCES_TEMPLATES_3AS_MATH_T3 } from './3as_math/templates/t3';

export * from './types';
export * from './bio-helpers';
export * from './svg-sciences';
export { SeededRng } from '../MathTemplates/rng';

export const SCIENCES_LESSONS_BY_GRADE: Record<
	SciencesTrackId,
	Record<TrimesterId, SciencesInteractiveLessonData[]>
> = {
	'1ap': { t1: SCIENCES_LESSONS_1AP_T1, t2: SCIENCES_LESSONS_1AP_T2, t3: SCIENCES_LESSONS_1AP_T3 },
	'2ap': { t1: SCIENCES_LESSONS_2AP_T1, t2: SCIENCES_LESSONS_2AP_T2, t3: SCIENCES_LESSONS_2AP_T3 },
	'3ap': { t1: SCIENCES_LESSONS_3AP_T1, t2: SCIENCES_LESSONS_3AP_T2, t3: SCIENCES_LESSONS_3AP_T3 },
	'4ap': { t1: SCIENCES_LESSONS_4AP_T1, t2: SCIENCES_LESSONS_4AP_T2, t3: SCIENCES_LESSONS_4AP_T3 },
	'5ap': { t1: SCIENCES_LESSONS_5AP_T1, t2: SCIENCES_LESSONS_5AP_T2, t3: SCIENCES_LESSONS_5AP_T3 },
	'1am': { t1: SCIENCES_LESSONS_1AM_T1, t2: SCIENCES_LESSONS_1AM_T2, t3: SCIENCES_LESSONS_1AM_T3 },
	'2am': { t1: SCIENCES_LESSONS_2AM_T1, t2: SCIENCES_LESSONS_2AM_T2, t3: SCIENCES_LESSONS_2AM_T3 },
	'3am': { t1: SCIENCES_LESSONS_3AM_T1, t2: SCIENCES_LESSONS_3AM_T2, t3: SCIENCES_LESSONS_3AM_T3 },
	'4am': { t1: SCIENCES_LESSONS_4AM_T1, t2: SCIENCES_LESSONS_4AM_T2, t3: SCIENCES_LESSONS_4AM_T3 },
	'1as_tcst': {
		t1: SCIENCES_LESSONS_1AS_TCST_T1,
		t2: SCIENCES_LESSONS_1AS_TCST_T2,
		t3: SCIENCES_LESSONS_1AS_TCST_T3
	},
	'2as_se': {
		t1: SCIENCES_LESSONS_2AS_SE_T1,
		t2: SCIENCES_LESSONS_2AS_SE_T2,
		t3: SCIENCES_LESSONS_2AS_SE_T3
	},
	'2as_math': {
		t1: SCIENCES_LESSONS_2AS_MATH_T1,
		t2: SCIENCES_LESSONS_2AS_MATH_T2,
		t3: SCIENCES_LESSONS_2AS_MATH_T3
	},
	'3as_se': {
		t1: SCIENCES_LESSONS_3AS_SE_T1,
		t2: SCIENCES_LESSONS_3AS_SE_T2,
		t3: SCIENCES_LESSONS_3AS_SE_T3
	},
	'3as_math': {
		t1: SCIENCES_LESSONS_3AS_MATH_T1,
		t2: SCIENCES_LESSONS_3AS_MATH_T2,
		t3: SCIENCES_LESSONS_3AS_MATH_T3
	}
};

export const SCIENCES_TEMPLATES_BY_GRADE: Record<
	SciencesTrackId,
	Record<TrimesterId, SciencesParameterizedTemplate[]>
> = {
	'1ap': {
		t1: SCIENCES_TEMPLATES_1AP_T1,
		t2: SCIENCES_TEMPLATES_1AP_T2,
		t3: SCIENCES_TEMPLATES_1AP_T3
	},
	'2ap': {
		t1: SCIENCES_TEMPLATES_2AP_T1,
		t2: SCIENCES_TEMPLATES_2AP_T2,
		t3: SCIENCES_TEMPLATES_2AP_T3
	},
	'3ap': {
		t1: SCIENCES_TEMPLATES_3AP_T1,
		t2: SCIENCES_TEMPLATES_3AP_T2,
		t3: SCIENCES_TEMPLATES_3AP_T3
	},
	'4ap': {
		t1: SCIENCES_TEMPLATES_4AP_T1,
		t2: SCIENCES_TEMPLATES_4AP_T2,
		t3: SCIENCES_TEMPLATES_4AP_T3
	},
	'5ap': {
		t1: SCIENCES_TEMPLATES_5AP_T1,
		t2: SCIENCES_TEMPLATES_5AP_T2,
		t3: SCIENCES_TEMPLATES_5AP_T3
	},
	'1am': {
		t1: SCIENCES_TEMPLATES_1AM_T1,
		t2: SCIENCES_TEMPLATES_1AM_T2,
		t3: SCIENCES_TEMPLATES_1AM_T3
	},
	'2am': {
		t1: SCIENCES_TEMPLATES_2AM_T1,
		t2: SCIENCES_TEMPLATES_2AM_T2,
		t3: SCIENCES_TEMPLATES_2AM_T3
	},
	'3am': {
		t1: SCIENCES_TEMPLATES_3AM_T1,
		t2: SCIENCES_TEMPLATES_3AM_T2,
		t3: SCIENCES_TEMPLATES_3AM_T3
	},
	'4am': {
		t1: SCIENCES_TEMPLATES_4AM_T1,
		t2: SCIENCES_TEMPLATES_4AM_T2,
		t3: SCIENCES_TEMPLATES_4AM_T3
	},
	'1as_tcst': {
		t1: SCIENCES_TEMPLATES_1AS_TCST_T1,
		t2: SCIENCES_TEMPLATES_1AS_TCST_T2,
		t3: SCIENCES_TEMPLATES_1AS_TCST_T3
	},
	'2as_se': {
		t1: SCIENCES_TEMPLATES_2AS_SE_T1,
		t2: SCIENCES_TEMPLATES_2AS_SE_T2,
		t3: SCIENCES_TEMPLATES_2AS_SE_T3
	},
	'2as_math': {
		t1: SCIENCES_TEMPLATES_2AS_MATH_T1,
		t2: SCIENCES_TEMPLATES_2AS_MATH_T2,
		t3: SCIENCES_TEMPLATES_2AS_MATH_T3
	},
	'3as_se': {
		t1: SCIENCES_TEMPLATES_3AS_SE_T1,
		t2: SCIENCES_TEMPLATES_3AS_SE_T2,
		t3: SCIENCES_TEMPLATES_3AS_SE_T3
	},
	'3as_math': {
		t1: SCIENCES_TEMPLATES_3AS_MATH_T1,
		t2: SCIENCES_TEMPLATES_3AS_MATH_T2,
		t3: SCIENCES_TEMPLATES_3AS_MATH_T3
	}
};

export const ALL_SCIENCES_LESSONS: SciencesInteractiveLessonData[] = Object.values(
	SCIENCES_LESSONS_BY_GRADE
).flatMap((byTrim) => [...byTrim.t1, ...byTrim.t2, ...byTrim.t3]);

export const ALL_SCIENCES_TEMPLATES: SciencesParameterizedTemplate[] = Object.values(
	SCIENCES_TEMPLATES_BY_GRADE
).flatMap((byTrim) => [...byTrim.t1, ...byTrim.t2, ...byTrim.t3]);

export function getSciencesLessonsFor(
	grade: SciencesTrackId,
	trimesterId?: TrimesterId
): SciencesInteractiveLessonData[] {
	const byTrim = SCIENCES_LESSONS_BY_GRADE[grade];
	if (!byTrim) return [];
	if (trimesterId) return byTrim[trimesterId] ?? [];
	return [...byTrim.t1, ...byTrim.t2, ...byTrim.t3];
}

export function getSciencesTemplatesFor(
	grade: SciencesTrackId,
	trimesterId?: TrimesterId
): SciencesParameterizedTemplate[] {
	const byTrim = SCIENCES_TEMPLATES_BY_GRADE[grade];
	if (!byTrim) return [];
	if (trimesterId) return byTrim[trimesterId] ?? [];
	return [...byTrim.t1, ...byTrim.t2, ...byTrim.t3];
}

export function getSciencesLessonById(id: string): SciencesInteractiveLessonData | undefined {
	return ALL_SCIENCES_LESSONS.find((l) => l.id === id);
}

export function getSciencesTemplateById(id: string): SciencesParameterizedTemplate | undefined {
	return ALL_SCIENCES_TEMPLATES.find((t) => t.id === id);
}
