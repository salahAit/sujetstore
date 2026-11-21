import type { TrimesterId } from '../SujetBuilder/types';
import {
	adaptFrenchTemplateForTrack,
	type FrenchParameterizedTemplate,
	type FrenchTrackId
} from './types';
import { SeededRng } from '../MathTemplates/rng';

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
import { TEMPLATES_1AS_TCL_T1 } from './1as_tcl/templates/t1';
import { TEMPLATES_1AS_TCL_T2 } from './1as_tcl/templates/t2';
import { TEMPLATES_1AS_TCL_T3 } from './1as_tcl/templates/t3';
import { TEMPLATES_2AS_SCI_T1 } from './secondary_2as_sci/templates/t1';
import { TEMPLATES_2AS_SCI_T2 } from './secondary_2as_sci/templates/t2';
import { TEMPLATES_2AS_SCI_T3 } from './secondary_2as_sci/templates/t3';
import { TEMPLATES_2AS_LP_T1 } from './2as_lp/templates/t1';
import { TEMPLATES_2AS_LP_T2 } from './2as_lp/templates/t2';
import { TEMPLATES_2AS_LP_T3 } from './2as_lp/templates/t3';
import { TEMPLATES_2AS_LE_T1 } from './2as_le/templates/t1';
import { TEMPLATES_2AS_LE_T2 } from './2as_le/templates/t2';
import { TEMPLATES_2AS_LE_T3 } from './2as_le/templates/t3';
import { TEMPLATES_3AS_SCI_T1 } from './secondary_3as_sci/templates/t1';
import { TEMPLATES_3AS_SCI_T2 } from './secondary_3as_sci/templates/t2';
import { TEMPLATES_3AS_SCI_T3 } from './secondary_3as_sci/templates/t3';
import { TEMPLATES_3AS_LP_T1 } from './3as_lp/templates/t1';
import { TEMPLATES_3AS_LP_T2 } from './3as_lp/templates/t2';
import { TEMPLATES_3AS_LP_T3 } from './3as_lp/templates/t3';
import { TEMPLATES_3AS_LE_T1 } from './3as_le/templates/t1';
import { TEMPLATES_3AS_LE_T2 } from './3as_le/templates/t2';
import { TEMPLATES_3AS_LE_T3 } from './3as_le/templates/t3';

export * from './types';
export { SeededRng };

function buildAdaptedTrackTemplates(
	t1: FrenchParameterizedTemplate[],
	t2: FrenchParameterizedTemplate[],
	t3: FrenchParameterizedTemplate[],
	target: '2as_se' | '2as_tm' | '2as_math' | '2as_ge' | '3as_se' | '3as_tm' | '3as_math' | '3as_ge'
): Record<TrimesterId, FrenchParameterizedTemplate[]> {
	return {
		t1: t1.map((t) => adaptFrenchTemplateForTrack(t, target)),
		t2: t2.map((t) => adaptFrenchTemplateForTrack(t, target)),
		t3: t3.map((t) => adaptFrenchTemplateForTrack(t, target))
	};
}

export const FRENCH_TEMPLATES_BY_GRADE: Record<
	FrenchTrackId,
	Record<TrimesterId, FrenchParameterizedTemplate[]>
> = {
	'3ap': { t1: TEMPLATES_3AP_T1, t2: TEMPLATES_3AP_T2, t3: TEMPLATES_3AP_T3 },
	'4ap': { t1: TEMPLATES_4AP_T1, t2: TEMPLATES_4AP_T2, t3: TEMPLATES_4AP_T3 },
	'5ap': { t1: TEMPLATES_5AP_T1, t2: TEMPLATES_5AP_T2, t3: TEMPLATES_5AP_T3 },
	'1am': { t1: TEMPLATES_1AM_T1, t2: TEMPLATES_1AM_T2, t3: TEMPLATES_1AM_T3 },
	'2am': { t1: TEMPLATES_2AM_T1, t2: TEMPLATES_2AM_T2, t3: TEMPLATES_2AM_T3 },
	'3am': { t1: TEMPLATES_3AM_T1, t2: TEMPLATES_3AM_T2, t3: TEMPLATES_3AM_T3 },
	'4am': { t1: TEMPLATES_4AM_T1, t2: TEMPLATES_4AM_T2, t3: TEMPLATES_4AM_T3 },
	'1as_tcst': { t1: TEMPLATES_1AS_TCST_T1, t2: TEMPLATES_1AS_TCST_T2, t3: TEMPLATES_1AS_TCST_T3 },
	'1as_tcl': { t1: TEMPLATES_1AS_TCL_T1, t2: TEMPLATES_1AS_TCL_T2, t3: TEMPLATES_1AS_TCL_T3 },
	'2as_se': buildAdaptedTrackTemplates(TEMPLATES_2AS_SCI_T1, TEMPLATES_2AS_SCI_T2, TEMPLATES_2AS_SCI_T3, '2as_se'),
	'2as_tm': buildAdaptedTrackTemplates(TEMPLATES_2AS_SCI_T1, TEMPLATES_2AS_SCI_T2, TEMPLATES_2AS_SCI_T3, '2as_tm'),
	'2as_math': buildAdaptedTrackTemplates(TEMPLATES_2AS_SCI_T1, TEMPLATES_2AS_SCI_T2, TEMPLATES_2AS_SCI_T3, '2as_math'),
	'2as_ge': buildAdaptedTrackTemplates(TEMPLATES_2AS_SCI_T1, TEMPLATES_2AS_SCI_T2, TEMPLATES_2AS_SCI_T3, '2as_ge'),
	'2as_lp': { t1: TEMPLATES_2AS_LP_T1, t2: TEMPLATES_2AS_LP_T2, t3: TEMPLATES_2AS_LP_T3 },
	'2as_le': { t1: TEMPLATES_2AS_LE_T1, t2: TEMPLATES_2AS_LE_T2, t3: TEMPLATES_2AS_LE_T3 },
	'3as_se': buildAdaptedTrackTemplates(TEMPLATES_3AS_SCI_T1, TEMPLATES_3AS_SCI_T2, TEMPLATES_3AS_SCI_T3, '3as_se'),
	'3as_tm': buildAdaptedTrackTemplates(TEMPLATES_3AS_SCI_T1, TEMPLATES_3AS_SCI_T2, TEMPLATES_3AS_SCI_T3, '3as_tm'),
	'3as_math': buildAdaptedTrackTemplates(TEMPLATES_3AS_SCI_T1, TEMPLATES_3AS_SCI_T2, TEMPLATES_3AS_SCI_T3, '3as_math'),
	'3as_ge': buildAdaptedTrackTemplates(TEMPLATES_3AS_SCI_T1, TEMPLATES_3AS_SCI_T2, TEMPLATES_3AS_SCI_T3, '3as_ge'),
	'3as_lp': { t1: TEMPLATES_3AS_LP_T1, t2: TEMPLATES_3AS_LP_T2, t3: TEMPLATES_3AS_LP_T3 },
	'3as_le': { t1: TEMPLATES_3AS_LE_T1, t2: TEMPLATES_3AS_LE_T2, t3: TEMPLATES_3AS_LE_T3 }
};

export function getFrenchTemplatesFor(
	grade: FrenchTrackId,
	trimesterId?: TrimesterId
): FrenchParameterizedTemplate[] {
	const byTrim = FRENCH_TEMPLATES_BY_GRADE[grade];
	if (!byTrim) return [];
	if (trimesterId) return byTrim[trimesterId] ?? [];
	return [...byTrim.t1, ...byTrim.t2, ...byTrim.t3];
}
