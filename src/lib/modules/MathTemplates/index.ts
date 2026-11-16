import type { GradeId, InteractiveLessonData, ParameterizedTemplate } from './types';
import type { TrimesterId } from '../SujetBuilder/types';

import { LESSONS_1AP_T1 } from './1ap/lessons/t1';
import { LESSONS_1AP_T2 } from './1ap/lessons/t2';
import { LESSONS_1AP_T3 } from './1ap/lessons/t3';
import { LESSONS_2AP_T1 } from './2ap/lessons/t1';
import { LESSONS_2AP_T2 } from './2ap/lessons/t2';
import { LESSONS_2AP_T3 } from './2ap/lessons/t3';
import { LESSONS_3AP_T1 } from './3ap/lessons/t1';
import { LESSONS_3AP_T2 } from './3ap/lessons/t2';
import { LESSONS_3AP_T3 } from './3ap/lessons/t3';
import { LESSONS_4AP_T1 } from './4ap/lessons/t1';
import { LESSONS_4AP_T2 } from './4ap/lessons/t2';
import { LESSONS_4AP_T3 } from './4ap/lessons/t3';
import { LESSONS_5AP_T1 } from './5ap/lessons/t1';
import { LESSONS_5AP_T2 } from './5ap/lessons/t2';
import { LESSONS_5AP_T3 } from './5ap/lessons/t3';
import { LESSONS_1AM_T1 } from './1am/lessons/t1';
import { LESSONS_1AM_T2 } from './1am/lessons/t2';
import { LESSONS_1AM_T3 } from './1am/lessons/t3';
import { LESSONS_2AM_T1 } from './2am/lessons/t1';
import { LESSONS_2AM_T2 } from './2am/lessons/t2';
import { LESSONS_2AM_T3 } from './2am/lessons/t3';
import { LESSONS_3AM_T1 } from './3am/lessons/t1';
import { LESSONS_3AM_T2 } from './3am/lessons/t2';
import { LESSONS_3AM_T3 } from './3am/lessons/t3';
import { LESSONS_4AM_T1 } from './4am/lessons/t1';
import { LESSONS_4AM_T2 } from './4am/lessons/t2';
import { LESSONS_4AM_T3 } from './4am/lessons/t3';

import { TEMPLATES_1AP_T1 } from './1ap/templates/t1';
import { TEMPLATES_1AP_T2 } from './1ap/templates/t2';
import { TEMPLATES_1AP_T3 } from './1ap/templates/t3';
import { TEMPLATES_2AP_T1 } from './2ap/templates/t1';
import { TEMPLATES_2AP_T2 } from './2ap/templates/t2';
import { TEMPLATES_2AP_T3 } from './2ap/templates/t3';
import { TEMPLATES_3AP_T1 } from './3ap/templates/t1';
import { TEMPLATES_3AP_T2 } from './3ap/templates/t2';
import { TEMPLATES_3AP_T3 } from './3ap/templates/t3';
import { TEMPLATES_4AP_T1 } from './4ap/templates/t1';
import { TEMPLATES_4AP_T2 } from './4ap/templates/t2';
import { TEMPLATES_4AP_T3 } from './4ap/templates/t3';
import { TEMPLATES_5AP_T1 } from './5ap/templates/t1';
import { TEMPLATES_5AP_T2 } from './5ap/templates/t2';
import { TEMPLATES_5AP_T3 } from './5ap/templates/t3';
import { TEMPLATES_1AM_T1 } from './1am/templates/t1';
import { TEMPLATES_1AM_T2 } from './1am/templates/t2';
import { TEMPLATES_1AM_T3 } from './1am/templates/t3';
import { TEMPLATES_2AM_T1 } from './2am/templates/t1';
import { TEMPLATES_2AM_T2 } from './2am/templates/t2';
import { TEMPLATES_2AM_T3 } from './2am/templates/t3';
import { TEMPLATES_3AM_T1 } from './3am/templates/t1';
import { TEMPLATES_3AM_T2 } from './3am/templates/t2';
import { TEMPLATES_3AM_T3 } from './3am/templates/t3';
import { TEMPLATES_4AM_T1 } from './4am/templates/t1';
import { TEMPLATES_4AM_T2 } from './4am/templates/t2';
import { TEMPLATES_4AM_T3 } from './4am/templates/t3';

export * from './types';
export * from './rng';
export * from './svg-helpers';

export const LESSONS_BY_GRADE: Record<GradeId, Record<TrimesterId, InteractiveLessonData[]>> = {
	'1ap': { t1: LESSONS_1AP_T1, t2: LESSONS_1AP_T2, t3: LESSONS_1AP_T3 },
	'2ap': { t1: LESSONS_2AP_T1, t2: LESSONS_2AP_T2, t3: LESSONS_2AP_T3 },
	'3ap': { t1: LESSONS_3AP_T1, t2: LESSONS_3AP_T2, t3: LESSONS_3AP_T3 },
	'4ap': { t1: LESSONS_4AP_T1, t2: LESSONS_4AP_T2, t3: LESSONS_4AP_T3 },
	'5ap': { t1: LESSONS_5AP_T1, t2: LESSONS_5AP_T2, t3: LESSONS_5AP_T3 },
	'1am': { t1: LESSONS_1AM_T1, t2: LESSONS_1AM_T2, t3: LESSONS_1AM_T3 },
	'2am': { t1: LESSONS_2AM_T1, t2: LESSONS_2AM_T2, t3: LESSONS_2AM_T3 },
	'3am': { t1: LESSONS_3AM_T1, t2: LESSONS_3AM_T2, t3: LESSONS_3AM_T3 },
	'4am': { t1: LESSONS_4AM_T1, t2: LESSONS_4AM_T2, t3: LESSONS_4AM_T3 }
};

export const ALL_LESSONS: InteractiveLessonData[] = [
	...LESSONS_1AP_T1,
	...LESSONS_1AP_T2,
	...LESSONS_1AP_T3,
	...LESSONS_2AP_T1,
	...LESSONS_2AP_T2,
	...LESSONS_2AP_T3,
	...LESSONS_3AP_T1,
	...LESSONS_3AP_T2,
	...LESSONS_3AP_T3,
	...LESSONS_4AP_T1,
	...LESSONS_4AP_T2,
	...LESSONS_4AP_T3,
	...LESSONS_5AP_T1,
	...LESSONS_5AP_T2,
	...LESSONS_5AP_T3,
	...LESSONS_1AM_T1,
	...LESSONS_1AM_T2,
	...LESSONS_1AM_T3,
	...LESSONS_2AM_T1,
	...LESSONS_2AM_T2,
	...LESSONS_2AM_T3,
	...LESSONS_3AM_T1,
	...LESSONS_3AM_T2,
	...LESSONS_3AM_T3,
	...LESSONS_4AM_T1,
	...LESSONS_4AM_T2,
	...LESSONS_4AM_T3
];

export const TEMPLATES_BY_GRADE: Record<GradeId, Record<TrimesterId, ParameterizedTemplate[]>> = {
	'1ap': { t1: TEMPLATES_1AP_T1, t2: TEMPLATES_1AP_T2, t3: TEMPLATES_1AP_T3 },
	'2ap': { t1: TEMPLATES_2AP_T1, t2: TEMPLATES_2AP_T2, t3: TEMPLATES_2AP_T3 },
	'3ap': { t1: TEMPLATES_3AP_T1, t2: TEMPLATES_3AP_T2, t3: TEMPLATES_3AP_T3 },
	'4ap': { t1: TEMPLATES_4AP_T1, t2: TEMPLATES_4AP_T2, t3: TEMPLATES_4AP_T3 },
	'5ap': { t1: TEMPLATES_5AP_T1, t2: TEMPLATES_5AP_T2, t3: TEMPLATES_5AP_T3 },
	'1am': { t1: TEMPLATES_1AM_T1, t2: TEMPLATES_1AM_T2, t3: TEMPLATES_1AM_T3 },
	'2am': { t1: TEMPLATES_2AM_T1, t2: TEMPLATES_2AM_T2, t3: TEMPLATES_2AM_T3 },
	'3am': { t1: TEMPLATES_3AM_T1, t2: TEMPLATES_3AM_T2, t3: TEMPLATES_3AM_T3 },
	'4am': { t1: TEMPLATES_4AM_T1, t2: TEMPLATES_4AM_T2, t3: TEMPLATES_4AM_T3 }
};

export const ALL_TEMPLATES: ParameterizedTemplate[] = [
	...TEMPLATES_1AP_T1,
	...TEMPLATES_1AP_T2,
	...TEMPLATES_1AP_T3,
	...TEMPLATES_2AP_T1,
	...TEMPLATES_2AP_T2,
	...TEMPLATES_2AP_T3,
	...TEMPLATES_3AP_T1,
	...TEMPLATES_3AP_T2,
	...TEMPLATES_3AP_T3,
	...TEMPLATES_4AP_T1,
	...TEMPLATES_4AP_T2,
	...TEMPLATES_4AP_T3,
	...TEMPLATES_5AP_T1,
	...TEMPLATES_5AP_T2,
	...TEMPLATES_5AP_T3,
	...TEMPLATES_1AM_T1,
	...TEMPLATES_1AM_T2,
	...TEMPLATES_1AM_T3,
	...TEMPLATES_2AM_T1,
	...TEMPLATES_2AM_T2,
	...TEMPLATES_2AM_T3,
	...TEMPLATES_3AM_T1,
	...TEMPLATES_3AM_T2,
	...TEMPLATES_3AM_T3,
	...TEMPLATES_4AM_T1,
	...TEMPLATES_4AM_T2,
	...TEMPLATES_4AM_T3
];

export function getTemplatesFor(grade: GradeId, trimesterId: TrimesterId): ParameterizedTemplate[] {
	return TEMPLATES_BY_GRADE[grade]?.[trimesterId] ?? [];
}

export function getLessonsFor(grade: GradeId, trimesterId: TrimesterId): InteractiveLessonData[] {
	return LESSONS_BY_GRADE[grade]?.[trimesterId] ?? [];
}
