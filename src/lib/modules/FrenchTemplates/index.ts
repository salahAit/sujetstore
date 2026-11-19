import type { TrimesterId } from '../SujetBuilder/types';
import {
	ALL_FRENCH_TRACK_IDS,
	FRENCH_GRADE_METADATA,
	FRENCH_MIDDLE_TRACK_IDS,
	FRENCH_PRIMARY_TRACK_IDS,
	FRENCH_SECONDARY_TRACK_IDS,
	adaptFrenchLessonForTrack,
	adaptFrenchTemplateForTrack,
	type FrenchInteractiveLessonData,
	type FrenchParameterizedTemplate,
	type FrenchTrackId
} from './types';
import { SeededRng } from '../MathTemplates/rng';

// Primary (3AP - 5AP)
import { LESSONS_3AP_T1 } from './3ap/lessons/t1';
import { LESSONS_3AP_T2 } from './3ap/lessons/t2';
import { LESSONS_3AP_T3 } from './3ap/lessons/t3';
import { TEMPLATES_3AP_T1 } from './3ap/templates/t1';
import { TEMPLATES_3AP_T2 } from './3ap/templates/t2';
import { TEMPLATES_3AP_T3 } from './3ap/templates/t3';

import { LESSONS_4AP_T1 } from './4ap/lessons/t1';
import { LESSONS_4AP_T2 } from './4ap/lessons/t2';
import { LESSONS_4AP_T3 } from './4ap/lessons/t3';
import { TEMPLATES_4AP_T1 } from './4ap/templates/t1';
import { TEMPLATES_4AP_T2 } from './4ap/templates/t2';
import { TEMPLATES_4AP_T3 } from './4ap/templates/t3';

import { LESSONS_5AP_T1 } from './5ap/lessons/t1';
import { LESSONS_5AP_T2 } from './5ap/lessons/t2';
import { LESSONS_5AP_T3 } from './5ap/lessons/t3';
import { TEMPLATES_5AP_T1 } from './5ap/templates/t1';
import { TEMPLATES_5AP_T2 } from './5ap/templates/t2';
import { TEMPLATES_5AP_T3 } from './5ap/templates/t3';

// Middle (1AM - 4AM BEM)
import { LESSONS_1AM_T1 } from './1am/lessons/t1';
import { LESSONS_1AM_T2 } from './1am/lessons/t2';
import { LESSONS_1AM_T3 } from './1am/lessons/t3';
import { TEMPLATES_1AM_T1 } from './1am/templates/t1';
import { TEMPLATES_1AM_T2 } from './1am/templates/t2';
import { TEMPLATES_1AM_T3 } from './1am/templates/t3';

import { LESSONS_2AM_T1 } from './2am/lessons/t1';
import { LESSONS_2AM_T2 } from './2am/lessons/t2';
import { LESSONS_2AM_T3 } from './2am/lessons/t3';
import { TEMPLATES_2AM_T1 } from './2am/templates/t1';
import { TEMPLATES_2AM_T2 } from './2am/templates/t2';
import { TEMPLATES_2AM_T3 } from './2am/templates/t3';

import { LESSONS_3AM_T1 } from './3am/lessons/t1';
import { LESSONS_3AM_T2 } from './3am/lessons/t2';
import { LESSONS_3AM_T3 } from './3am/lessons/t3';
import { TEMPLATES_3AM_T1 } from './3am/templates/t1';
import { TEMPLATES_3AM_T2 } from './3am/templates/t2';
import { TEMPLATES_3AM_T3 } from './3am/templates/t3';

import { LESSONS_4AM_T1 } from './4am/lessons/t1';
import { LESSONS_4AM_T2 } from './4am/lessons/t2';
import { LESSONS_4AM_T3 } from './4am/lessons/t3';
import { TEMPLATES_4AM_T1 } from './4am/templates/t1';
import { TEMPLATES_4AM_T2 } from './4am/templates/t2';
import { TEMPLATES_4AM_T3 } from './4am/templates/t3';

// Secondary 1AS (TCST & TCL)
import { LESSONS_1AS_TCST_T1 } from './1as_tcst/lessons/t1';
import { LESSONS_1AS_TCST_T2 } from './1as_tcst/lessons/t2';
import { LESSONS_1AS_TCST_T3 } from './1as_tcst/lessons/t3';
import { TEMPLATES_1AS_TCST_T1 } from './1as_tcst/templates/t1';
import { TEMPLATES_1AS_TCST_T2 } from './1as_tcst/templates/t2';
import { TEMPLATES_1AS_TCST_T3 } from './1as_tcst/templates/t3';

import { LESSONS_1AS_TCL_T1 } from './1as_tcl/lessons/t1';
import { LESSONS_1AS_TCL_T2 } from './1as_tcl/lessons/t2';
import { LESSONS_1AS_TCL_T3 } from './1as_tcl/lessons/t3';
import { TEMPLATES_1AS_TCL_T1 } from './1as_tcl/templates/t1';
import { TEMPLATES_1AS_TCL_T2 } from './1as_tcl/templates/t2';
import { TEMPLATES_1AS_TCL_T3 } from './1as_tcl/templates/t3';

// Secondary 2AS (Scientific/Management Shared + LP + LE)
import { LESSONS_2AS_SCI_T1 } from './secondary_2as_sci/lessons/t1';
import { LESSONS_2AS_SCI_T2 } from './secondary_2as_sci/lessons/t2';
import { LESSONS_2AS_SCI_T3 } from './secondary_2as_sci/lessons/t3';
import { TEMPLATES_2AS_SCI_T1 } from './secondary_2as_sci/templates/t1';
import { TEMPLATES_2AS_SCI_T2 } from './secondary_2as_sci/templates/t2';
import { TEMPLATES_2AS_SCI_T3 } from './secondary_2as_sci/templates/t3';

import { LESSONS_2AS_LP_T1 } from './2as_lp/lessons/t1';
import { LESSONS_2AS_LP_T2 } from './2as_lp/lessons/t2';
import { LESSONS_2AS_LP_T3 } from './2as_lp/lessons/t3';
import { TEMPLATES_2AS_LP_T1 } from './2as_lp/templates/t1';
import { TEMPLATES_2AS_LP_T2 } from './2as_lp/templates/t2';
import { TEMPLATES_2AS_LP_T3 } from './2as_lp/templates/t3';

import { LESSONS_2AS_LE_T1 } from './2as_le/lessons/t1';
import { LESSONS_2AS_LE_T2 } from './2as_le/lessons/t2';
import { LESSONS_2AS_LE_T3 } from './2as_le/lessons/t3';
import { TEMPLATES_2AS_LE_T1 } from './2as_le/templates/t1';
import { TEMPLATES_2AS_LE_T2 } from './2as_le/templates/t2';
import { TEMPLATES_2AS_LE_T3 } from './2as_le/templates/t3';

// Secondary 3AS BAC (Scientific/Management Shared + LP + LE)
import { LESSONS_3AS_SCI_T1 } from './secondary_3as_sci/lessons/t1';
import { LESSONS_3AS_SCI_T2 } from './secondary_3as_sci/lessons/t2';
import { LESSONS_3AS_SCI_T3 } from './secondary_3as_sci/lessons/t3';
import { TEMPLATES_3AS_SCI_T1 } from './secondary_3as_sci/templates/t1';
import { TEMPLATES_3AS_SCI_T2 } from './secondary_3as_sci/templates/t2';
import { TEMPLATES_3AS_SCI_T3 } from './secondary_3as_sci/templates/t3';

import { LESSONS_3AS_LP_T1 } from './3as_lp/lessons/t1';
import { LESSONS_3AS_LP_T2 } from './3as_lp/lessons/t2';
import { LESSONS_3AS_LP_T3 } from './3as_lp/lessons/t3';
import { TEMPLATES_3AS_LP_T1 } from './3as_lp/templates/t1';
import { TEMPLATES_3AS_LP_T2 } from './3as_lp/templates/t2';
import { TEMPLATES_3AS_LP_T3 } from './3as_lp/templates/t3';

import { LESSONS_3AS_LE_T1 } from './3as_le/lessons/t1';
import { LESSONS_3AS_LE_T2 } from './3as_le/lessons/t2';
import { LESSONS_3AS_LE_T3 } from './3as_le/lessons/t3';
import { TEMPLATES_3AS_LE_T1 } from './3as_le/templates/t1';
import { TEMPLATES_3AS_LE_T2 } from './3as_le/templates/t2';
import { TEMPLATES_3AS_LE_T3 } from './3as_le/templates/t3';

export * from './types';
export * from './french-helpers';
export * from './svg-french';
export { SeededRng };

function buildAdaptedTrackLessons(
	t1: FrenchInteractiveLessonData[],
	t2: FrenchInteractiveLessonData[],
	t3: FrenchInteractiveLessonData[],
	target: '2as_se' | '2as_tm' | '2as_math' | '2as_ge' | '3as_se' | '3as_tm' | '3as_math' | '3as_ge'
): Record<TrimesterId, FrenchInteractiveLessonData[]> {
	return {
		t1: t1.map((l) => adaptFrenchLessonForTrack(l, target)),
		t2: t2.map((l) => adaptFrenchLessonForTrack(l, target)),
		t3: t3.map((l) => adaptFrenchLessonForTrack(l, target))
	};
}

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

export const FRENCH_LESSONS_BY_GRADE: Record<
	FrenchTrackId,
	Record<TrimesterId, FrenchInteractiveLessonData[]>
> = {
	'3ap': { t1: LESSONS_3AP_T1, t2: LESSONS_3AP_T2, t3: LESSONS_3AP_T3 },
	'4ap': { t1: LESSONS_4AP_T1, t2: LESSONS_4AP_T2, t3: LESSONS_4AP_T3 },
	'5ap': { t1: LESSONS_5AP_T1, t2: LESSONS_5AP_T2, t3: LESSONS_5AP_T3 },
	'1am': { t1: LESSONS_1AM_T1, t2: LESSONS_1AM_T2, t3: LESSONS_1AM_T3 },
	'2am': { t1: LESSONS_2AM_T1, t2: LESSONS_2AM_T2, t3: LESSONS_2AM_T3 },
	'3am': { t1: LESSONS_3AM_T1, t2: LESSONS_3AM_T2, t3: LESSONS_3AM_T3 },
	'4am': { t1: LESSONS_4AM_T1, t2: LESSONS_4AM_T2, t3: LESSONS_4AM_T3 },
	'1as_tcst': { t1: LESSONS_1AS_TCST_T1, t2: LESSONS_1AS_TCST_T2, t3: LESSONS_1AS_TCST_T3 },
	'1as_tcl': { t1: LESSONS_1AS_TCL_T1, t2: LESSONS_1AS_TCL_T2, t3: LESSONS_1AS_TCL_T3 },
	'2as_se': buildAdaptedTrackLessons(LESSONS_2AS_SCI_T1, LESSONS_2AS_SCI_T2, LESSONS_2AS_SCI_T3, '2as_se'),
	'2as_tm': buildAdaptedTrackLessons(LESSONS_2AS_SCI_T1, LESSONS_2AS_SCI_T2, LESSONS_2AS_SCI_T3, '2as_tm'),
	'2as_math': buildAdaptedTrackLessons(LESSONS_2AS_SCI_T1, LESSONS_2AS_SCI_T2, LESSONS_2AS_SCI_T3, '2as_math'),
	'2as_ge': buildAdaptedTrackLessons(LESSONS_2AS_SCI_T1, LESSONS_2AS_SCI_T2, LESSONS_2AS_SCI_T3, '2as_ge'),
	'2as_lp': { t1: LESSONS_2AS_LP_T1, t2: LESSONS_2AS_LP_T2, t3: LESSONS_2AS_LP_T3 },
	'2as_le': { t1: LESSONS_2AS_LE_T1, t2: LESSONS_2AS_LE_T2, t3: LESSONS_2AS_LE_T3 },
	'3as_se': buildAdaptedTrackLessons(LESSONS_3AS_SCI_T1, LESSONS_3AS_SCI_T2, LESSONS_3AS_SCI_T3, '3as_se'),
	'3as_tm': buildAdaptedTrackLessons(LESSONS_3AS_SCI_T1, LESSONS_3AS_SCI_T2, LESSONS_3AS_SCI_T3, '3as_tm'),
	'3as_math': buildAdaptedTrackLessons(LESSONS_3AS_SCI_T1, LESSONS_3AS_SCI_T2, LESSONS_3AS_SCI_T3, '3as_math'),
	'3as_ge': buildAdaptedTrackLessons(LESSONS_3AS_SCI_T1, LESSONS_3AS_SCI_T2, LESSONS_3AS_SCI_T3, '3as_ge'),
	'3as_lp': { t1: LESSONS_3AS_LP_T1, t2: LESSONS_3AS_LP_T2, t3: LESSONS_3AS_LP_T3 },
	'3as_le': { t1: LESSONS_3AS_LE_T1, t2: LESSONS_3AS_LE_T2, t3: LESSONS_3AS_LE_T3 }
};

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

export const ALL_FRENCH_LESSONS: FrenchInteractiveLessonData[] = ALL_FRENCH_TRACK_IDS.flatMap(
	(g) => [
		...FRENCH_LESSONS_BY_GRADE[g].t1,
		...FRENCH_LESSONS_BY_GRADE[g].t2,
		...FRENCH_LESSONS_BY_GRADE[g].t3
	]
);

export const ALL_FRENCH_TEMPLATES: FrenchParameterizedTemplate[] = ALL_FRENCH_TRACK_IDS.flatMap(
	(g) => [
		...FRENCH_TEMPLATES_BY_GRADE[g].t1,
		...FRENCH_TEMPLATES_BY_GRADE[g].t2,
		...FRENCH_TEMPLATES_BY_GRADE[g].t3
	]
);

export function getFrenchLessonsFor(
	grade: FrenchTrackId,
	trimesterId?: TrimesterId
): FrenchInteractiveLessonData[] {
	const byTrim = FRENCH_LESSONS_BY_GRADE[grade];
	if (!byTrim) return [];
	if (trimesterId) return byTrim[trimesterId] ?? [];
	return [...byTrim.t1, ...byTrim.t2, ...byTrim.t3];
}

export function getFrenchTemplatesFor(
	grade: FrenchTrackId,
	trimesterId?: TrimesterId
): FrenchParameterizedTemplate[] {
	const byTrim = FRENCH_TEMPLATES_BY_GRADE[grade];
	if (!byTrim) return [];
	if (trimesterId) return byTrim[trimesterId] ?? [];
	return [...byTrim.t1, ...byTrim.t2, ...byTrim.t3];
}

export {
	ALL_FRENCH_TRACK_IDS,
	FRENCH_GRADE_METADATA,
	FRENCH_PRIMARY_TRACK_IDS,
	FRENCH_MIDDLE_TRACK_IDS,
	FRENCH_SECONDARY_TRACK_IDS
};
