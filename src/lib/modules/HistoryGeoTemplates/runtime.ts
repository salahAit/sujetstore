import type { TrimesterId } from '../SujetBuilder/types';
import {
	ALL_HISTORY_TRACK_IDS,
	HISTORY_GRADE_METADATA,
	type HistoryGradeMeta,
	type HistoryParameterizedTemplate,
	type HistorySecondaryTrackId,
	type HistoryTrackId,
	adaptHistoryTemplateForTrack
} from './types';

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

import { TEMPLATES_1AS_T1 } from './secondary_1as/templates/t1';
import { TEMPLATES_1AS_T2 } from './secondary_1as/templates/t2';
import { TEMPLATES_1AS_T3 } from './secondary_1as/templates/t3';
import { TEMPLATES_2AS_T1 } from './secondary_2as/templates/t1';
import { TEMPLATES_2AS_T2 } from './secondary_2as/templates/t2';
import { TEMPLATES_2AS_T3 } from './secondary_2as/templates/t3';
import { TEMPLATES_3AS_T1 } from './secondary_3as/templates/t1';
import { TEMPLATES_3AS_T2 } from './secondary_3as/templates/t2';
import { TEMPLATES_3AS_T3 } from './secondary_3as/templates/t3';

function buildAdaptedTrackTemplates(
	t1: HistoryParameterizedTemplate[],
	t2: HistoryParameterizedTemplate[],
	t3: HistoryParameterizedTemplate[],
	grade: HistorySecondaryTrackId
): Record<TrimesterId, HistoryParameterizedTemplate[]> {
	return {
		t1: t1.map((t) => adaptHistoryTemplateForTrack(t, grade)),
		t2: t2.map((t) => adaptHistoryTemplateForTrack(t, grade)),
		t3: t3.map((t) => adaptHistoryTemplateForTrack(t, grade))
	};
}

export const HISTORY_TEMPLATES_BY_GRADE: Record<
	HistoryTrackId,
	Record<TrimesterId, HistoryParameterizedTemplate[]>
> = {
	'3ap': { t1: TEMPLATES_3AP_T1, t2: TEMPLATES_3AP_T2, t3: TEMPLATES_3AP_T3 },
	'4ap': { t1: TEMPLATES_4AP_T1, t2: TEMPLATES_4AP_T2, t3: TEMPLATES_4AP_T3 },
	'5ap': { t1: TEMPLATES_5AP_T1, t2: TEMPLATES_5AP_T2, t3: TEMPLATES_5AP_T3 },
	'1am': { t1: TEMPLATES_1AM_T1, t2: TEMPLATES_1AM_T2, t3: TEMPLATES_1AM_T3 },
	'2am': { t1: TEMPLATES_2AM_T1, t2: TEMPLATES_2AM_T2, t3: TEMPLATES_2AM_T3 },
	'3am': { t1: TEMPLATES_3AM_T1, t2: TEMPLATES_3AM_T2, t3: TEMPLATES_3AM_T3 },
	'4am': { t1: TEMPLATES_4AM_T1, t2: TEMPLATES_4AM_T2, t3: TEMPLATES_4AM_T3 },
	'1as_tcst': buildAdaptedTrackTemplates(TEMPLATES_1AS_T1, TEMPLATES_1AS_T2, TEMPLATES_1AS_T3, '1as_tcst'),
	'1as_tcl': buildAdaptedTrackTemplates(TEMPLATES_1AS_T1, TEMPLATES_1AS_T2, TEMPLATES_1AS_T3, '1as_tcl'),
	'2as_se': buildAdaptedTrackTemplates(TEMPLATES_2AS_T1, TEMPLATES_2AS_T2, TEMPLATES_2AS_T3, '2as_se'),
	'2as_tm': buildAdaptedTrackTemplates(TEMPLATES_2AS_T1, TEMPLATES_2AS_T2, TEMPLATES_2AS_T3, '2as_tm'),
	'2as_math': buildAdaptedTrackTemplates(TEMPLATES_2AS_T1, TEMPLATES_2AS_T2, TEMPLATES_2AS_T3, '2as_math'),
	'2as_ge': buildAdaptedTrackTemplates(TEMPLATES_2AS_T1, TEMPLATES_2AS_T2, TEMPLATES_2AS_T3, '2as_ge'),
	'2as_lp': buildAdaptedTrackTemplates(TEMPLATES_2AS_T1, TEMPLATES_2AS_T2, TEMPLATES_2AS_T3, '2as_lp'),
	'2as_le': buildAdaptedTrackTemplates(TEMPLATES_2AS_T1, TEMPLATES_2AS_T2, TEMPLATES_2AS_T3, '2as_le'),
	'3as_se': buildAdaptedTrackTemplates(TEMPLATES_3AS_T1, TEMPLATES_3AS_T2, TEMPLATES_3AS_T3, '3as_se'),
	'3as_tm': buildAdaptedTrackTemplates(TEMPLATES_3AS_T1, TEMPLATES_3AS_T2, TEMPLATES_3AS_T3, '3as_tm'),
	'3as_math': buildAdaptedTrackTemplates(TEMPLATES_3AS_T1, TEMPLATES_3AS_T2, TEMPLATES_3AS_T3, '3as_math'),
	'3as_ge': buildAdaptedTrackTemplates(TEMPLATES_3AS_T1, TEMPLATES_3AS_T2, TEMPLATES_3AS_T3, '3as_ge'),
	'3as_lp': buildAdaptedTrackTemplates(TEMPLATES_3AS_T1, TEMPLATES_3AS_T2, TEMPLATES_3AS_T3, '3as_lp'),
	'3as_le': buildAdaptedTrackTemplates(TEMPLATES_3AS_T1, TEMPLATES_3AS_T2, TEMPLATES_3AS_T3, '3as_le')
};

export function getHistoryTemplatesFor(
	grade: HistoryTrackId,
	trimesterId?: TrimesterId
): HistoryParameterizedTemplate[] {
	const byTrim = HISTORY_TEMPLATES_BY_GRADE[grade];
	if (!byTrim) return [];
	if (trimesterId) return byTrim[trimesterId] ?? [];
	return [...byTrim.t1, ...byTrim.t2, ...byTrim.t3];
}

export {
	ALL_HISTORY_TRACK_IDS,
	HISTORY_GRADE_METADATA,
	type HistoryGradeMeta,
	type HistoryParameterizedTemplate,
	type HistoryTrackId
};
