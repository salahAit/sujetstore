import { adaptSciencesTemplateForTrack, type SciencesParameterizedTemplate } from '../../types';
import { createSharedSciencesTemplates3asT2 } from '../../secondary_shared_3as/templates/t2';

/**
 * 3AS SE (Sciences Expérimentales — علوم تجريبية) Parameterized Templates — Trimester 2 (6 templates)
 * Official BAC SE ONEC roles: 2 recall (5 pts) + 2 reasoning (7 pts) + 2 scientific_approach (8 pts).
 */
export const SCIENCES_TEMPLATES_3AS_SE_T2: SciencesParameterizedTemplate[] =
	createSharedSciencesTemplates3asT2('3as_se').map((tpl) =>
		adaptSciencesTemplateForTrack(tpl, '3as_se')
	);
