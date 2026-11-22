import type { TrimesterId } from '../SujetBuilder/types';
import type {
	ManagementInteractiveLessonData,
	ManagementParameterizedTemplate,
	ManagementTrackId
} from './types';

import { LESSONS_2AS_ACC_T1 } from './2as_acc/lessons/t1';
import { LESSONS_2AS_ACC_T2 } from './2as_acc/lessons/t2';
import { LESSONS_2AS_ACC_T3 } from './2as_acc/lessons/t3';
import { LESSONS_3AS_ACC_T1 } from './3as_acc/lessons/t1';
import { LESSONS_3AS_ACC_T2 } from './3as_acc/lessons/t2';
import { LESSONS_3AS_ACC_T3 } from './3as_acc/lessons/t3';
import { LESSONS_2AS_ECO_T1 } from './2as_eco/lessons/t1';
import { LESSONS_2AS_ECO_T2 } from './2as_eco/lessons/t2';
import { LESSONS_2AS_ECO_T3 } from './2as_eco/lessons/t3';
import { LESSONS_3AS_ECO_T1 } from './3as_eco/lessons/t1';
import { LESSONS_3AS_ECO_T2 } from './3as_eco/lessons/t2';
import { LESSONS_3AS_ECO_T3 } from './3as_eco/lessons/t3';
import { LESSONS_2AS_LAW_T1 } from './2as_law/lessons/t1';
import { LESSONS_2AS_LAW_T2 } from './2as_law/lessons/t2';
import { LESSONS_2AS_LAW_T3 } from './2as_law/lessons/t3';
import { LESSONS_3AS_LAW_T1 } from './3as_law/lessons/t1';
import { LESSONS_3AS_LAW_T2 } from './3as_law/lessons/t2';
import { LESSONS_3AS_LAW_T3 } from './3as_law/lessons/t3';

import { MANAGEMENT_TEMPLATES_BY_GRADE, getManagementTemplatesFor } from './runtime';

export * from './types';
export * from './management-helpers';
export { MANAGEMENT_TEMPLATES_BY_GRADE, getManagementTemplatesFor };
export { SeededRng } from '../MathTemplates/rng';

export const MANAGEMENT_LESSONS_BY_GRADE: Record<
	ManagementTrackId,
	Record<TrimesterId, ManagementInteractiveLessonData[]>
> = {
	'2as_acc': { t1: LESSONS_2AS_ACC_T1, t2: LESSONS_2AS_ACC_T2, t3: LESSONS_2AS_ACC_T3 },
	'3as_acc': { t1: LESSONS_3AS_ACC_T1, t2: LESSONS_3AS_ACC_T2, t3: LESSONS_3AS_ACC_T3 },
	'2as_eco': { t1: LESSONS_2AS_ECO_T1, t2: LESSONS_2AS_ECO_T2, t3: LESSONS_2AS_ECO_T3 },
	'3as_eco': { t1: LESSONS_3AS_ECO_T1, t2: LESSONS_3AS_ECO_T2, t3: LESSONS_3AS_ECO_T3 },
	'2as_law': { t1: LESSONS_2AS_LAW_T1, t2: LESSONS_2AS_LAW_T2, t3: LESSONS_2AS_LAW_T3 },
	'3as_law': { t1: LESSONS_3AS_LAW_T1, t2: LESSONS_3AS_LAW_T2, t3: LESSONS_3AS_LAW_T3 }
};

export const ALL_MANAGEMENT_LESSONS: ManagementInteractiveLessonData[] = Object.values(
	MANAGEMENT_LESSONS_BY_GRADE
).flatMap((byTrim) => [...byTrim.t1, ...byTrim.t2, ...byTrim.t3]);

export const ALL_MANAGEMENT_TEMPLATES: ManagementParameterizedTemplate[] = Object.values(
	MANAGEMENT_TEMPLATES_BY_GRADE
).flatMap((byTrim) => [...byTrim.t1, ...byTrim.t2, ...byTrim.t3]);

export function getManagementLessonsFor(
	grade: ManagementTrackId,
	trimesterId?: TrimesterId
): ManagementInteractiveLessonData[] {
	const byTrim = MANAGEMENT_LESSONS_BY_GRADE[grade];
	if (!byTrim) return [];
	if (trimesterId) return byTrim[trimesterId] ?? [];
	return [...byTrim.t1, ...byTrim.t2, ...byTrim.t3];
}
