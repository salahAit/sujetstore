import type { TrimesterId } from '../SujetBuilder/types';
import {
	ALL_GERMAN_TRACK_IDS,
	GERMAN_GRADE_METADATA,
	type GermanInteractiveLessonData,
	type GermanParameterizedTemplate,
	type GermanTrackId
} from './types';
import { GERMAN_TEMPLATES_BY_GRADE, SeededRng, getGermanTemplatesFor } from './runtime';

import { LESSONS_2AS_LE_T1 } from './2as_le/lessons/t1';
import { LESSONS_2AS_LE_T2 } from './2as_le/lessons/t2';
import { LESSONS_2AS_LE_T3 } from './2as_le/lessons/t3';
import { LESSONS_3AS_LE_T1 } from './3as_le/lessons/t1';
import { LESSONS_3AS_LE_T2 } from './3as_le/lessons/t2';
import { LESSONS_3AS_LE_T3 } from './3as_le/lessons/t3';

export const GERMAN_LESSONS_BY_GRADE: Record<
	GermanTrackId,
	Record<TrimesterId, GermanInteractiveLessonData[]>
> = {
	'2as_le': { t1: LESSONS_2AS_LE_T1, t2: LESSONS_2AS_LE_T2, t3: LESSONS_2AS_LE_T3 },
	'3as_le': { t1: LESSONS_3AS_LE_T1, t2: LESSONS_3AS_LE_T2, t3: LESSONS_3AS_LE_T3 }
};

export const ALL_GERMAN_LESSONS: GermanInteractiveLessonData[] = ALL_GERMAN_TRACK_IDS.flatMap(
	(g) => [
		...GERMAN_LESSONS_BY_GRADE[g].t1,
		...GERMAN_LESSONS_BY_GRADE[g].t2,
		...GERMAN_LESSONS_BY_GRADE[g].t3
	]
);

export const ALL_GERMAN_TEMPLATES: GermanParameterizedTemplate[] = ALL_GERMAN_TRACK_IDS.flatMap(
	(g) => [
		...GERMAN_TEMPLATES_BY_GRADE[g].t1,
		...GERMAN_TEMPLATES_BY_GRADE[g].t2,
		...GERMAN_TEMPLATES_BY_GRADE[g].t3
	]
);

export function getGermanLessonsFor(
	grade: GermanTrackId,
	trimesterId?: TrimesterId
): GermanInteractiveLessonData[] {
	const byTrim = GERMAN_LESSONS_BY_GRADE[grade];
	if (!byTrim) return [];
	if (trimesterId) return byTrim[trimesterId] ?? [];
	return [...byTrim.t1, ...byTrim.t2, ...byTrim.t3];
}

export {
	ALL_GERMAN_TRACK_IDS,
	GERMAN_GRADE_METADATA,
	GERMAN_TEMPLATES_BY_GRADE,
	SeededRng,
	getGermanTemplatesFor
};
export * from './types';
export * from './german-helpers';
export * from './svg-german';
