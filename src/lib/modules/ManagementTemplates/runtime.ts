import type { TrimesterId } from '../SujetBuilder/types';
import type { ManagementParameterizedTemplate, ManagementTrackId } from './types';

import { TEMPLATES_2AS_ACC_T1 } from './2as_acc/templates/t1';
import { TEMPLATES_2AS_ACC_T2 } from './2as_acc/templates/t2';
import { TEMPLATES_2AS_ACC_T3 } from './2as_acc/templates/t3';
import { TEMPLATES_3AS_ACC_T1 } from './3as_acc/templates/t1';
import { TEMPLATES_3AS_ACC_T2 } from './3as_acc/templates/t2';
import { TEMPLATES_3AS_ACC_T3 } from './3as_acc/templates/t3';
import { TEMPLATES_2AS_ECO_T1 } from './2as_eco/templates/t1';
import { TEMPLATES_2AS_ECO_T2 } from './2as_eco/templates/t2';
import { TEMPLATES_2AS_ECO_T3 } from './2as_eco/templates/t3';
import { TEMPLATES_3AS_ECO_T1 } from './3as_eco/templates/t1';
import { TEMPLATES_3AS_ECO_T2 } from './3as_eco/templates/t2';
import { TEMPLATES_3AS_ECO_T3 } from './3as_eco/templates/t3';
import { TEMPLATES_2AS_LAW_T1 } from './2as_law/templates/t1';
import { TEMPLATES_2AS_LAW_T2 } from './2as_law/templates/t2';
import { TEMPLATES_2AS_LAW_T3 } from './2as_law/templates/t3';
import { TEMPLATES_3AS_LAW_T1 } from './3as_law/templates/t1';
import { TEMPLATES_3AS_LAW_T2 } from './3as_law/templates/t2';
import { TEMPLATES_3AS_LAW_T3 } from './3as_law/templates/t3';

export * from './types';
export * from './management-helpers';
export { SeededRng } from '../MathTemplates/rng';

export const MANAGEMENT_TEMPLATES_BY_GRADE: Record<
	ManagementTrackId,
	Record<TrimesterId, ManagementParameterizedTemplate[]>
> = {
	'2as_acc': { t1: TEMPLATES_2AS_ACC_T1, t2: TEMPLATES_2AS_ACC_T2, t3: TEMPLATES_2AS_ACC_T3 },
	'3as_acc': { t1: TEMPLATES_3AS_ACC_T1, t2: TEMPLATES_3AS_ACC_T2, t3: TEMPLATES_3AS_ACC_T3 },
	'2as_eco': { t1: TEMPLATES_2AS_ECO_T1, t2: TEMPLATES_2AS_ECO_T2, t3: TEMPLATES_2AS_ECO_T3 },
	'3as_eco': { t1: TEMPLATES_3AS_ECO_T1, t2: TEMPLATES_3AS_ECO_T2, t3: TEMPLATES_3AS_ECO_T3 },
	'2as_law': { t1: TEMPLATES_2AS_LAW_T1, t2: TEMPLATES_2AS_LAW_T2, t3: TEMPLATES_2AS_LAW_T3 },
	'3as_law': { t1: TEMPLATES_3AS_LAW_T1, t2: TEMPLATES_3AS_LAW_T2, t3: TEMPLATES_3AS_LAW_T3 }
};

export function getManagementTemplatesFor(
	grade: ManagementTrackId,
	trimesterId?: TrimesterId
): ManagementParameterizedTemplate[] {
	const byTrim = MANAGEMENT_TEMPLATES_BY_GRADE[grade];
	if (!byTrim) return [];
	if (trimesterId) return byTrim[trimesterId] ?? [];
	return [...byTrim.t1, ...byTrim.t2, ...byTrim.t3];
}
