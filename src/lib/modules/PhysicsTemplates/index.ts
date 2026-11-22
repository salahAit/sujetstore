import type { TrimesterId } from '../SujetBuilder/types';
import type {
	PhysicsInteractiveLessonData,
	PhysicsParameterizedTemplate,
	PhysicsTrackId
} from './types';

import { PHYSICS_LESSONS_1AM_T1 } from './1am/lessons/t1';
import { PHYSICS_LESSONS_1AM_T2 } from './1am/lessons/t2';
import { PHYSICS_LESSONS_1AM_T3 } from './1am/lessons/t3';
import { PHYSICS_LESSONS_2AM_T1 } from './2am/lessons/t1';
import { PHYSICS_LESSONS_2AM_T2 } from './2am/lessons/t2';
import { PHYSICS_LESSONS_2AM_T3 } from './2am/lessons/t3';
import { PHYSICS_LESSONS_3AM_T1 } from './3am/lessons/t1';
import { PHYSICS_LESSONS_3AM_T2 } from './3am/lessons/t2';
import { PHYSICS_LESSONS_3AM_T3 } from './3am/lessons/t3';
import { PHYSICS_LESSONS_4AM_T1 } from './4am/lessons/t1';
import { PHYSICS_LESSONS_4AM_T2 } from './4am/lessons/t2';
import { PHYSICS_LESSONS_4AM_T3 } from './4am/lessons/t3';
import { PHYSICS_LESSONS_1AS_TCST_T1 } from './1as_tcst/lessons/t1';
import { PHYSICS_LESSONS_1AS_TCST_T2 } from './1as_tcst/lessons/t2';
import { PHYSICS_LESSONS_1AS_TCST_T3 } from './1as_tcst/lessons/t3';
import { PHYSICS_LESSONS_1AS_TCL_T1 } from './1as_tcl/lessons/t1';
import { PHYSICS_LESSONS_1AS_TCL_T2 } from './1as_tcl/lessons/t2';
import { PHYSICS_LESSONS_1AS_TCL_T3 } from './1as_tcl/lessons/t3';
import { PHYSICS_LESSONS_2AS_SE_T1 } from './2as_se/lessons/t1';
import { PHYSICS_LESSONS_2AS_SE_T2 } from './2as_se/lessons/t2';
import { PHYSICS_LESSONS_2AS_SE_T3 } from './2as_se/lessons/t3';
import { PHYSICS_LESSONS_2AS_TM_T1 } from './2as_tm/lessons/t1';
import { PHYSICS_LESSONS_2AS_TM_T2 } from './2as_tm/lessons/t2';
import { PHYSICS_LESSONS_2AS_TM_T3 } from './2as_tm/lessons/t3';
import { PHYSICS_LESSONS_2AS_MATH_T1 } from './2as_math/lessons/t1';
import { PHYSICS_LESSONS_2AS_MATH_T2 } from './2as_math/lessons/t2';
import { PHYSICS_LESSONS_2AS_MATH_T3 } from './2as_math/lessons/t3';
import { PHYSICS_LESSONS_3AS_SE_T1 } from './3as_se/lessons/t1';
import { PHYSICS_LESSONS_3AS_SE_T2 } from './3as_se/lessons/t2';
import { PHYSICS_LESSONS_3AS_SE_T3 } from './3as_se/lessons/t3';
import { PHYSICS_LESSONS_3AS_TM_T1 } from './3as_tm/lessons/t1';
import { PHYSICS_LESSONS_3AS_TM_T2 } from './3as_tm/lessons/t2';
import { PHYSICS_LESSONS_3AS_TM_T3 } from './3as_tm/lessons/t3';
import { PHYSICS_LESSONS_3AS_MATH_T1 } from './3as_math/lessons/t1';
import { PHYSICS_LESSONS_3AS_MATH_T2 } from './3as_math/lessons/t2';
import { PHYSICS_LESSONS_3AS_MATH_T3 } from './3as_math/lessons/t3';

import { PHYSICS_TEMPLATES_1AM_T1 } from './1am/templates/t1';
import { PHYSICS_TEMPLATES_1AM_T2 } from './1am/templates/t2';
import { PHYSICS_TEMPLATES_1AM_T3 } from './1am/templates/t3';
import { PHYSICS_TEMPLATES_2AM_T1 } from './2am/templates/t1';
import { PHYSICS_TEMPLATES_2AM_T2 } from './2am/templates/t2';
import { PHYSICS_TEMPLATES_2AM_T3 } from './2am/templates/t3';
import { PHYSICS_TEMPLATES_3AM_T1 } from './3am/templates/t1';
import { PHYSICS_TEMPLATES_3AM_T2 } from './3am/templates/t2';
import { PHYSICS_TEMPLATES_3AM_T3 } from './3am/templates/t3';
import { PHYSICS_TEMPLATES_4AM_T1 } from './4am/templates/t1';
import { PHYSICS_TEMPLATES_4AM_T2 } from './4am/templates/t2';
import { PHYSICS_TEMPLATES_4AM_T3 } from './4am/templates/t3';
import { PHYSICS_TEMPLATES_1AS_TCST_T1 } from './1as_tcst/templates/t1';
import { PHYSICS_TEMPLATES_1AS_TCST_T2 } from './1as_tcst/templates/t2';
import { PHYSICS_TEMPLATES_1AS_TCST_T3 } from './1as_tcst/templates/t3';
import { PHYSICS_TEMPLATES_1AS_TCL_T1 } from './1as_tcl/templates/t1';
import { PHYSICS_TEMPLATES_1AS_TCL_T2 } from './1as_tcl/templates/t2';
import { PHYSICS_TEMPLATES_1AS_TCL_T3 } from './1as_tcl/templates/t3';
import { PHYSICS_TEMPLATES_2AS_SE_T1 } from './2as_se/templates/t1';
import { PHYSICS_TEMPLATES_2AS_SE_T2 } from './2as_se/templates/t2';
import { PHYSICS_TEMPLATES_2AS_SE_T3 } from './2as_se/templates/t3';
import { PHYSICS_TEMPLATES_2AS_TM_T1 } from './2as_tm/templates/t1';
import { PHYSICS_TEMPLATES_2AS_TM_T2 } from './2as_tm/templates/t2';
import { PHYSICS_TEMPLATES_2AS_TM_T3 } from './2as_tm/templates/t3';
import { PHYSICS_TEMPLATES_2AS_MATH_T1 } from './2as_math/templates/t1';
import { PHYSICS_TEMPLATES_2AS_MATH_T2 } from './2as_math/templates/t2';
import { PHYSICS_TEMPLATES_2AS_MATH_T3 } from './2as_math/templates/t3';
import { PHYSICS_TEMPLATES_3AS_SE_T1 } from './3as_se/templates/t1';
import { PHYSICS_TEMPLATES_3AS_SE_T2 } from './3as_se/templates/t2';
import { PHYSICS_TEMPLATES_3AS_SE_T3 } from './3as_se/templates/t3';
import { PHYSICS_TEMPLATES_3AS_TM_T1 } from './3as_tm/templates/t1';
import { PHYSICS_TEMPLATES_3AS_TM_T2 } from './3as_tm/templates/t2';
import { PHYSICS_TEMPLATES_3AS_TM_T3 } from './3as_tm/templates/t3';
import { PHYSICS_TEMPLATES_3AS_MATH_T1 } from './3as_math/templates/t1';
import { PHYSICS_TEMPLATES_3AS_MATH_T2 } from './3as_math/templates/t2';
import { PHYSICS_TEMPLATES_3AS_MATH_T3 } from './3as_math/templates/t3';

export * from './types';
export * from './chem-helpers';
export * from './svg-physics';
export { SeededRng } from '../MathTemplates/rng';

export const PHYSICS_LESSONS_BY_GRADE: Record<
	PhysicsTrackId,
	Record<TrimesterId, PhysicsInteractiveLessonData[]>
> = {
	'1am': { t1: PHYSICS_LESSONS_1AM_T1, t2: PHYSICS_LESSONS_1AM_T2, t3: PHYSICS_LESSONS_1AM_T3 },
	'2am': { t1: PHYSICS_LESSONS_2AM_T1, t2: PHYSICS_LESSONS_2AM_T2, t3: PHYSICS_LESSONS_2AM_T3 },
	'3am': { t1: PHYSICS_LESSONS_3AM_T1, t2: PHYSICS_LESSONS_3AM_T2, t3: PHYSICS_LESSONS_3AM_T3 },
	'4am': { t1: PHYSICS_LESSONS_4AM_T1, t2: PHYSICS_LESSONS_4AM_T2, t3: PHYSICS_LESSONS_4AM_T3 },
	'1as_tcst': {
		t1: PHYSICS_LESSONS_1AS_TCST_T1,
		t2: PHYSICS_LESSONS_1AS_TCST_T2,
		t3: PHYSICS_LESSONS_1AS_TCST_T3
	},
	'1as_tcl': {
		t1: PHYSICS_LESSONS_1AS_TCL_T1,
		t2: PHYSICS_LESSONS_1AS_TCL_T2,
		t3: PHYSICS_LESSONS_1AS_TCL_T3
	},
	'2as_se': {
		t1: PHYSICS_LESSONS_2AS_SE_T1,
		t2: PHYSICS_LESSONS_2AS_SE_T2,
		t3: PHYSICS_LESSONS_2AS_SE_T3
	},
	'2as_tm': {
		t1: PHYSICS_LESSONS_2AS_TM_T1,
		t2: PHYSICS_LESSONS_2AS_TM_T2,
		t3: PHYSICS_LESSONS_2AS_TM_T3
	},
	'2as_math': {
		t1: PHYSICS_LESSONS_2AS_MATH_T1,
		t2: PHYSICS_LESSONS_2AS_MATH_T2,
		t3: PHYSICS_LESSONS_2AS_MATH_T3
	},
	'3as_se': {
		t1: PHYSICS_LESSONS_3AS_SE_T1,
		t2: PHYSICS_LESSONS_3AS_SE_T2,
		t3: PHYSICS_LESSONS_3AS_SE_T3
	},
	'3as_tm': {
		t1: PHYSICS_LESSONS_3AS_TM_T1,
		t2: PHYSICS_LESSONS_3AS_TM_T2,
		t3: PHYSICS_LESSONS_3AS_TM_T3
	},
	'3as_math': {
		t1: PHYSICS_LESSONS_3AS_MATH_T1,
		t2: PHYSICS_LESSONS_3AS_MATH_T2,
		t3: PHYSICS_LESSONS_3AS_MATH_T3
	}
};

export const PHYSICS_TEMPLATES_BY_GRADE: Record<
	PhysicsTrackId,
	Record<TrimesterId, PhysicsParameterizedTemplate[]>
> = {
	'1am': {
		t1: PHYSICS_TEMPLATES_1AM_T1,
		t2: PHYSICS_TEMPLATES_1AM_T2,
		t3: PHYSICS_TEMPLATES_1AM_T3
	},
	'2am': {
		t1: PHYSICS_TEMPLATES_2AM_T1,
		t2: PHYSICS_TEMPLATES_2AM_T2,
		t3: PHYSICS_TEMPLATES_2AM_T3
	},
	'3am': {
		t1: PHYSICS_TEMPLATES_3AM_T1,
		t2: PHYSICS_TEMPLATES_3AM_T2,
		t3: PHYSICS_TEMPLATES_3AM_T3
	},
	'4am': {
		t1: PHYSICS_TEMPLATES_4AM_T1,
		t2: PHYSICS_TEMPLATES_4AM_T2,
		t3: PHYSICS_TEMPLATES_4AM_T3
	},
	'1as_tcst': {
		t1: PHYSICS_TEMPLATES_1AS_TCST_T1,
		t2: PHYSICS_TEMPLATES_1AS_TCST_T2,
		t3: PHYSICS_TEMPLATES_1AS_TCST_T3
	},
	'1as_tcl': {
		t1: PHYSICS_TEMPLATES_1AS_TCL_T1,
		t2: PHYSICS_TEMPLATES_1AS_TCL_T2,
		t3: PHYSICS_TEMPLATES_1AS_TCL_T3
	},
	'2as_se': {
		t1: PHYSICS_TEMPLATES_2AS_SE_T1,
		t2: PHYSICS_TEMPLATES_2AS_SE_T2,
		t3: PHYSICS_TEMPLATES_2AS_SE_T3
	},
	'2as_tm': {
		t1: PHYSICS_TEMPLATES_2AS_TM_T1,
		t2: PHYSICS_TEMPLATES_2AS_TM_T2,
		t3: PHYSICS_TEMPLATES_2AS_TM_T3
	},
	'2as_math': {
		t1: PHYSICS_TEMPLATES_2AS_MATH_T1,
		t2: PHYSICS_TEMPLATES_2AS_MATH_T2,
		t3: PHYSICS_TEMPLATES_2AS_MATH_T3
	},
	'3as_se': {
		t1: PHYSICS_TEMPLATES_3AS_SE_T1,
		t2: PHYSICS_TEMPLATES_3AS_SE_T2,
		t3: PHYSICS_TEMPLATES_3AS_SE_T3
	},
	'3as_tm': {
		t1: PHYSICS_TEMPLATES_3AS_TM_T1,
		t2: PHYSICS_TEMPLATES_3AS_TM_T2,
		t3: PHYSICS_TEMPLATES_3AS_TM_T3
	},
	'3as_math': {
		t1: PHYSICS_TEMPLATES_3AS_MATH_T1,
		t2: PHYSICS_TEMPLATES_3AS_MATH_T2,
		t3: PHYSICS_TEMPLATES_3AS_MATH_T3
	}
};

export const ALL_PHYSICS_LESSONS: PhysicsInteractiveLessonData[] = Object.values(
	PHYSICS_LESSONS_BY_GRADE
).flatMap((byTrim) => [...byTrim.t1, ...byTrim.t2, ...byTrim.t3]);

export const ALL_PHYSICS_TEMPLATES: PhysicsParameterizedTemplate[] = Object.values(
	PHYSICS_TEMPLATES_BY_GRADE
).flatMap((byTrim) => [...byTrim.t1, ...byTrim.t2, ...byTrim.t3]);

export function getPhysicsLessonsFor(
	grade: PhysicsTrackId,
	trimesterId?: TrimesterId
): PhysicsInteractiveLessonData[] {
	const byTrim = PHYSICS_LESSONS_BY_GRADE[grade];
	if (!byTrim) return [];
	if (trimesterId) return byTrim[trimesterId] ?? [];
	return [...byTrim.t1, ...byTrim.t2, ...byTrim.t3];
}

export function getPhysicsTemplatesFor(
	grade: PhysicsTrackId,
	trimesterId?: TrimesterId
): PhysicsParameterizedTemplate[] {
	const byTrim = PHYSICS_TEMPLATES_BY_GRADE[grade];
	if (!byTrim) return [];
	if (trimesterId) return byTrim[trimesterId] ?? [];
	return [...byTrim.t1, ...byTrim.t2, ...byTrim.t3];
}

export function getPhysicsLessonById(id: string): PhysicsInteractiveLessonData | undefined {
	return ALL_PHYSICS_LESSONS.find((l) => l.id === id);
}

export function getPhysicsTemplateById(id: string): PhysicsParameterizedTemplate | undefined {
	return ALL_PHYSICS_TEMPLATES.find((t) => t.id === id);
}
