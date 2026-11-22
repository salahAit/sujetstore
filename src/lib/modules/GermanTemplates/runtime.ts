import type { TrimesterId } from '../SujetBuilder/types';
import { SeededRng } from '../MathTemplates/rng';
import {
	ALL_GERMAN_TRACK_IDS,
	GERMAN_GRADE_METADATA,
	type GermanGradeMeta,
	type GermanParameterizedTemplate,
	type GermanTrackId
} from './types';

import { TEMPLATES_2AS_LE_T1 } from './2as_le/templates/t1';
import { TEMPLATES_2AS_LE_T2 } from './2as_le/templates/t2';
import { TEMPLATES_2AS_LE_T3 } from './2as_le/templates/t3';
import { TEMPLATES_3AS_LE_T1 } from './3as_le/templates/t1';
import { TEMPLATES_3AS_LE_T2 } from './3as_le/templates/t2';
import { TEMPLATES_3AS_LE_T3 } from './3as_le/templates/t3';

export const GERMAN_TEMPLATES_BY_GRADE: Record<
	GermanTrackId,
	Record<TrimesterId, GermanParameterizedTemplate[]>
> = {
	'2as_le': { t1: TEMPLATES_2AS_LE_T1, t2: TEMPLATES_2AS_LE_T2, t3: TEMPLATES_2AS_LE_T3 },
	'3as_le': { t1: TEMPLATES_3AS_LE_T1, t2: TEMPLATES_3AS_LE_T2, t3: TEMPLATES_3AS_LE_T3 }
};

export function getGermanTemplatesFor(
	grade: GermanTrackId,
	trimesterId?: TrimesterId
): GermanParameterizedTemplate[] {
	const byTrim = GERMAN_TEMPLATES_BY_GRADE[grade];
	if (!byTrim) return [];
	if (trimesterId) return byTrim[trimesterId] ?? [];
	return [...byTrim.t1, ...byTrim.t2, ...byTrim.t3];
}

export {
	ALL_GERMAN_TRACK_IDS,
	GERMAN_GRADE_METADATA,
	SeededRng,
	type GermanGradeMeta,
	type GermanParameterizedTemplate,
	type GermanTrackId
};
export * from './types';
