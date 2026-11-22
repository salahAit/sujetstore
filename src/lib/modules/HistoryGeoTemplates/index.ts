import type { TrimesterId } from '../SujetBuilder/types';
import {
	ALL_HISTORY_TRACK_IDS,
	HISTORY_GRADE_METADATA,
	HISTORY_MIDDLE_TRACK_IDS,
	HISTORY_PRIMARY_TRACK_IDS,
	HISTORY_SECONDARY_TRACK_IDS,
	type HistoryInteractiveLessonData,
	type HistoryParameterizedTemplate,
	type HistorySecondaryTrackId,
	type HistoryTrackId,
	adaptHistoryLessonForTrack
} from './types';
import { HISTORY_TEMPLATES_BY_GRADE, getHistoryTemplatesFor } from './runtime';

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

import { LESSONS_1AS_T1 } from './secondary_1as/lessons/t1';
import { LESSONS_1AS_T2 } from './secondary_1as/lessons/t2';
import { LESSONS_1AS_T3 } from './secondary_1as/lessons/t3';
import { LESSONS_2AS_T1 } from './secondary_2as/lessons/t1';
import { LESSONS_2AS_T2 } from './secondary_2as/lessons/t2';
import { LESSONS_2AS_T3 } from './secondary_2as/lessons/t3';
import { LESSONS_3AS_T1 } from './secondary_3as/lessons/t1';
import { LESSONS_3AS_T2 } from './secondary_3as/lessons/t2';
import { LESSONS_3AS_T3 } from './secondary_3as/lessons/t3';

function buildAdaptedTrackLessons(
	t1: HistoryInteractiveLessonData[],
	t2: HistoryInteractiveLessonData[],
	t3: HistoryInteractiveLessonData[],
	grade: HistorySecondaryTrackId
): Record<TrimesterId, HistoryInteractiveLessonData[]> {
	return {
		t1: t1.map((l) => adaptHistoryLessonForTrack(l, grade)),
		t2: t2.map((l) => adaptHistoryLessonForTrack(l, grade)),
		t3: t3.map((l) => adaptHistoryLessonForTrack(l, grade))
	};
}

export const HISTORY_LESSONS_BY_GRADE: Record<
	HistoryTrackId,
	Record<TrimesterId, HistoryInteractiveLessonData[]>
> = {
	'3ap': { t1: LESSONS_3AP_T1, t2: LESSONS_3AP_T2, t3: LESSONS_3AP_T3 },
	'4ap': { t1: LESSONS_4AP_T1, t2: LESSONS_4AP_T2, t3: LESSONS_4AP_T3 },
	'5ap': { t1: LESSONS_5AP_T1, t2: LESSONS_5AP_T2, t3: LESSONS_5AP_T3 },
	'1am': { t1: LESSONS_1AM_T1, t2: LESSONS_1AM_T2, t3: LESSONS_1AM_T3 },
	'2am': { t1: LESSONS_2AM_T1, t2: LESSONS_2AM_T2, t3: LESSONS_2AM_T3 },
	'3am': { t1: LESSONS_3AM_T1, t2: LESSONS_3AM_T2, t3: LESSONS_3AM_T3 },
	'4am': { t1: LESSONS_4AM_T1, t2: LESSONS_4AM_T2, t3: LESSONS_4AM_T3 },
	'1as_tcst': buildAdaptedTrackLessons(LESSONS_1AS_T1, LESSONS_1AS_T2, LESSONS_1AS_T3, '1as_tcst'),
	'1as_tcl': buildAdaptedTrackLessons(LESSONS_1AS_T1, LESSONS_1AS_T2, LESSONS_1AS_T3, '1as_tcl'),
	'2as_se': buildAdaptedTrackLessons(LESSONS_2AS_T1, LESSONS_2AS_T2, LESSONS_2AS_T3, '2as_se'),
	'2as_tm': buildAdaptedTrackLessons(LESSONS_2AS_T1, LESSONS_2AS_T2, LESSONS_2AS_T3, '2as_tm'),
	'2as_math': buildAdaptedTrackLessons(LESSONS_2AS_T1, LESSONS_2AS_T2, LESSONS_2AS_T3, '2as_math'),
	'2as_ge': buildAdaptedTrackLessons(LESSONS_2AS_T1, LESSONS_2AS_T2, LESSONS_2AS_T3, '2as_ge'),
	'2as_lp': buildAdaptedTrackLessons(LESSONS_2AS_T1, LESSONS_2AS_T2, LESSONS_2AS_T3, '2as_lp'),
	'2as_le': buildAdaptedTrackLessons(LESSONS_2AS_T1, LESSONS_2AS_T2, LESSONS_2AS_T3, '2as_le'),
	'3as_se': buildAdaptedTrackLessons(LESSONS_3AS_T1, LESSONS_3AS_T2, LESSONS_3AS_T3, '3as_se'),
	'3as_tm': buildAdaptedTrackLessons(LESSONS_3AS_T1, LESSONS_3AS_T2, LESSONS_3AS_T3, '3as_tm'),
	'3as_math': buildAdaptedTrackLessons(LESSONS_3AS_T1, LESSONS_3AS_T2, LESSONS_3AS_T3, '3as_math'),
	'3as_ge': buildAdaptedTrackLessons(LESSONS_3AS_T1, LESSONS_3AS_T2, LESSONS_3AS_T3, '3as_ge'),
	'3as_lp': buildAdaptedTrackLessons(LESSONS_3AS_T1, LESSONS_3AS_T2, LESSONS_3AS_T3, '3as_lp'),
	'3as_le': buildAdaptedTrackLessons(LESSONS_3AS_T1, LESSONS_3AS_T2, LESSONS_3AS_T3, '3as_le')
};

export const ALL_HISTORY_LESSONS: HistoryInteractiveLessonData[] = ALL_HISTORY_TRACK_IDS.flatMap(
	(g) => [
		...HISTORY_LESSONS_BY_GRADE[g].t1,
		...HISTORY_LESSONS_BY_GRADE[g].t2,
		...HISTORY_LESSONS_BY_GRADE[g].t3
	]
);

export const ALL_HISTORY_TEMPLATES: HistoryParameterizedTemplate[] = ALL_HISTORY_TRACK_IDS.flatMap(
	(g) => [
		...HISTORY_TEMPLATES_BY_GRADE[g].t1,
		...HISTORY_TEMPLATES_BY_GRADE[g].t2,
		...HISTORY_TEMPLATES_BY_GRADE[g].t3
	]
);

export function getHistoryLessonsFor(
	grade: HistoryTrackId,
	trimesterId?: TrimesterId
): HistoryInteractiveLessonData[] {
	const byTrim = HISTORY_LESSONS_BY_GRADE[grade];
	if (!byTrim) return [];
	if (trimesterId) return byTrim[trimesterId] ?? [];
	return [...byTrim.t1, ...byTrim.t2, ...byTrim.t3];
}

export {
	ALL_HISTORY_TRACK_IDS,
	HISTORY_GRADE_METADATA,
	HISTORY_PRIMARY_TRACK_IDS,
	HISTORY_MIDDLE_TRACK_IDS,
	HISTORY_SECONDARY_TRACK_IDS,
	HISTORY_TEMPLATES_BY_GRADE,
	getHistoryTemplatesFor
};
export * from './types';
export * from './history-helpers';
export * from './svg-history-geo';
