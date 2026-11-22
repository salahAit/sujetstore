import type { TrimesterId } from '../SujetBuilder/types';
import {
	ALL_ITALIAN_TRACK_IDS,
	ITALIAN_GRADE_METADATA,
	type ItalianInteractiveLessonData,
	type ItalianParameterizedTemplate,
	type ItalianTrackId
} from './types';
import { ITALIAN_TEMPLATES_BY_GRADE, SeededRng, getItalianTemplatesFor } from './runtime';

import { LESSONS_2AS_LE_T1 } from './2as_le/lessons/t1';
import { LESSONS_2AS_LE_T2 } from './2as_le/lessons/t2';
import { LESSONS_2AS_LE_T3 } from './2as_le/lessons/t3';
import { LESSONS_3AS_LE_T1 } from './3as_le/lessons/t1';
import { LESSONS_3AS_LE_T2 } from './3as_le/lessons/t2';
import { LESSONS_3AS_LE_T3 } from './3as_le/lessons/t3';

export const ITALIAN_LESSONS_BY_GRADE: Record<
	ItalianTrackId,
	Record<TrimesterId, ItalianInteractiveLessonData[]>
> = {
	'2as_le': { t1: LESSONS_2AS_LE_T1, t2: LESSONS_2AS_LE_T2, t3: LESSONS_2AS_LE_T3 },
	'3as_le': { t1: LESSONS_3AS_LE_T1, t2: LESSONS_3AS_LE_T2, t3: LESSONS_3AS_LE_T3 }
};

export const ALL_ITALIAN_LESSONS: ItalianInteractiveLessonData[] = ALL_ITALIAN_TRACK_IDS.flatMap(
	(g) => [
		...ITALIAN_LESSONS_BY_GRADE[g].t1,
		...ITALIAN_LESSONS_BY_GRADE[g].t2,
		...ITALIAN_LESSONS_BY_GRADE[g].t3
	]
);

export const ALL_ITALIAN_TEMPLATES: ItalianParameterizedTemplate[] = ALL_ITALIAN_TRACK_IDS.flatMap(
	(g) => [
		...ITALIAN_TEMPLATES_BY_GRADE[g].t1,
		...ITALIAN_TEMPLATES_BY_GRADE[g].t2,
		...ITALIAN_TEMPLATES_BY_GRADE[g].t3
	]
);

export function getItalianLessonsFor(
	grade: ItalianTrackId,
	trimesterId?: TrimesterId
): ItalianInteractiveLessonData[] {
	const byTrim = ITALIAN_LESSONS_BY_GRADE[grade];
	if (!byTrim) return [];
	if (trimesterId) return byTrim[trimesterId] ?? [];
	return [...byTrim.t1, ...byTrim.t2, ...byTrim.t3];
}

export {
	ALL_ITALIAN_TRACK_IDS,
	ITALIAN_GRADE_METADATA,
	ITALIAN_TEMPLATES_BY_GRADE,
	SeededRng,
	getItalianTemplatesFor
};
export * from './types';
export * from './italian-helpers';
export * from './svg-italian';
