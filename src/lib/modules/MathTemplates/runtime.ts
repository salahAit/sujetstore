import type { GradeId, ParameterizedTemplate } from './types';
import type { TrimesterId } from '../SujetBuilder/types';

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
import { TEMPLATES_1AS_TCST_T1 } from './1as_tcst/templates/t1';
import { TEMPLATES_1AS_TCST_T2 } from './1as_tcst/templates/t2';
import { TEMPLATES_1AS_TCST_T3 } from './1as_tcst/templates/t3';
import { TEMPLATES_2AS_SE_T1 } from './2as_se/templates/t1';
import { TEMPLATES_2AS_SE_T2 } from './2as_se/templates/t2';
import { TEMPLATES_2AS_SE_T3 } from './2as_se/templates/t3';
import { TEMPLATES_2AS_TM_T1 } from './2as_tm/templates/t1';
import { TEMPLATES_2AS_TM_T2 } from './2as_tm/templates/t2';
import { TEMPLATES_2AS_TM_T3 } from './2as_tm/templates/t3';
import { TEMPLATES_2AS_MATH_T1 } from './2as_math/templates/t1';
import { TEMPLATES_2AS_MATH_T2 } from './2as_math/templates/t2';
import { TEMPLATES_2AS_MATH_T3 } from './2as_math/templates/t3';
import { TEMPLATES_3AS_SE_T1 } from './3as_se/templates/t1';
import { TEMPLATES_3AS_SE_T2 } from './3as_se/templates/t2';
import { TEMPLATES_3AS_SE_T3 } from './3as_se/templates/t3';
import { TEMPLATES_3AS_TM_T1 } from './3as_tm/templates/t1';
import { TEMPLATES_3AS_TM_T2 } from './3as_tm/templates/t2';
import { TEMPLATES_3AS_TM_T3 } from './3as_tm/templates/t3';
import { TEMPLATES_3AS_MATH_T1 } from './3as_math/templates/t1';
import { TEMPLATES_3AS_MATH_T2 } from './3as_math/templates/t2';
import { TEMPLATES_3AS_MATH_T3 } from './3as_math/templates/t3';

export * from './types';
export * from './rng';

export const TEMPLATES_BY_GRADE: Record<GradeId, Record<TrimesterId, ParameterizedTemplate[]>> = {
	'1ap': { t1: TEMPLATES_1AP_T1, t2: TEMPLATES_1AP_T2, t3: TEMPLATES_1AP_T3 },
	'2ap': { t1: TEMPLATES_2AP_T1, t2: TEMPLATES_2AP_T2, t3: TEMPLATES_2AP_T3 },
	'3ap': { t1: TEMPLATES_3AP_T1, t2: TEMPLATES_3AP_T2, t3: TEMPLATES_3AP_T3 },
	'4ap': { t1: TEMPLATES_4AP_T1, t2: TEMPLATES_4AP_T2, t3: TEMPLATES_4AP_T3 },
	'5ap': { t1: TEMPLATES_5AP_T1, t2: TEMPLATES_5AP_T2, t3: TEMPLATES_5AP_T3 },
	'1am': { t1: TEMPLATES_1AM_T1, t2: TEMPLATES_1AM_T2, t3: TEMPLATES_1AM_T3 },
	'2am': { t1: TEMPLATES_2AM_T1, t2: TEMPLATES_2AM_T2, t3: TEMPLATES_2AM_T3 },
	'3am': { t1: TEMPLATES_3AM_T1, t2: TEMPLATES_3AM_T2, t3: TEMPLATES_3AM_T3 },
	'4am': { t1: TEMPLATES_4AM_T1, t2: TEMPLATES_4AM_T2, t3: TEMPLATES_4AM_T3 },
	'1as_tcst': { t1: TEMPLATES_1AS_TCST_T1, t2: TEMPLATES_1AS_TCST_T2, t3: TEMPLATES_1AS_TCST_T3 },
	'2as_se': { t1: TEMPLATES_2AS_SE_T1, t2: TEMPLATES_2AS_SE_T2, t3: TEMPLATES_2AS_SE_T3 },
	'2as_tm': { t1: TEMPLATES_2AS_TM_T1, t2: TEMPLATES_2AS_TM_T2, t3: TEMPLATES_2AS_TM_T3 },
	'2as_math': { t1: TEMPLATES_2AS_MATH_T1, t2: TEMPLATES_2AS_MATH_T2, t3: TEMPLATES_2AS_MATH_T3 },
	'3as_se': { t1: TEMPLATES_3AS_SE_T1, t2: TEMPLATES_3AS_SE_T2, t3: TEMPLATES_3AS_SE_T3 },
	'3as_tm': { t1: TEMPLATES_3AS_TM_T1, t2: TEMPLATES_3AS_TM_T2, t3: TEMPLATES_3AS_TM_T3 },
	'3as_math': { t1: TEMPLATES_3AS_MATH_T1, t2: TEMPLATES_3AS_MATH_T2, t3: TEMPLATES_3AS_MATH_T3 }
};

export function getTemplatesFor(grade: GradeId, trimesterId: TrimesterId): ParameterizedTemplate[] {
	return TEMPLATES_BY_GRADE[grade]?.[trimesterId] ?? [];
}
