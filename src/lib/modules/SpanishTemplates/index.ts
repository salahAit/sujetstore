import type { TrimesterId } from '../SujetBuilder/types';
import {
	ALL_SPANISH_TRACK_IDS,
	SPANISH_GRADE_METADATA,
	type SpanishInteractiveLessonData,
	type SpanishParameterizedTemplate,
	type SpanishTrackId
} from './types';
import { SPANISH_TEMPLATES_BY_GRADE, SeededRng, getSpanishTemplatesFor } from './runtime';

import { LESSONS_2AS_LE_T1 } from './2as_le/lessons/t1';
import { LESSONS_2AS_LE_T2 } from './2as_le/lessons/t2';
import { LESSONS_2AS_LE_T3 } from './2as_le/lessons/t3';
import { LESSONS_3AS_LE_T1 } from './3as_le/lessons/t1';
import { LESSONS_3AS_LE_T2 } from './3as_le/lessons/t2';
import { LESSONS_3AS_LE_T3 } from './3as_le/lessons/t3';

export const SPANISH_LESSONS_BY_GRADE: Record<
	SpanishTrackId,
	Record<TrimesterId, SpanishInteractiveLessonData[]>
> = {
	'2as_le': { t1: LESSONS_2AS_LE_T1, t2: LESSONS_2AS_LE_T2, t3: LESSONS_2AS_LE_T3 },
	'3as_le': { t1: LESSONS_3AS_LE_T1, t2: LESSONS_3AS_LE_T2, t3: LESSONS_3AS_LE_T3 }
};

export const ALL_SPANISH_LESSONS: SpanishInteractiveLessonData[] = ALL_SPANISH_TRACK_IDS.flatMap(
	(g) => [
		...SPANISH_LESSONS_BY_GRADE[g].t1,
		...SPANISH_LESSONS_BY_GRADE[g].t2,
		...SPANISH_LESSONS_BY_GRADE[g].t3
	]
);

export const ALL_SPANISH_TEMPLATES: SpanishParameterizedTemplate[] = ALL_SPANISH_TRACK_IDS.flatMap(
	(g) => [
		...SPANISH_TEMPLATES_BY_GRADE[g].t1,
		...SPANISH_TEMPLATES_BY_GRADE[g].t2,
		...SPANISH_TEMPLATES_BY_GRADE[g].t3
	]
);

export function getSpanishLessonsFor(
	grade: SpanishTrackId,
	trimesterId?: TrimesterId
): SpanishInteractiveLessonData[] {
	const byTrim = SPANISH_LESSONS_BY_GRADE[grade];
	if (!byTrim) return [];
	if (trimesterId) return byTrim[trimesterId] ?? [];
	return [...byTrim.t1, ...byTrim.t2, ...byTrim.t3];
}

export {
	ALL_SPANISH_TRACK_IDS,
	SPANISH_GRADE_METADATA,
	SPANISH_TEMPLATES_BY_GRADE,
	SeededRng,
	getSpanishTemplatesFor
};
export * from './types';
export * from './spanish-helpers';
export * from './svg-spanish';
