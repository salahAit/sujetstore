import type { ParameterizedTemplate } from '../../types';
import { adaptTemplateForTrack } from '../../types';
import { SHARED_TEMPLATES_3AS_LIT_T1 } from '../../secondary_shared_3as_lit/templates/t1';

export const TEMPLATES_3AS_LP_T1: ParameterizedTemplate[] = SHARED_TEMPLATES_3AS_LIT_T1.map((tpl) =>
	adaptTemplateForTrack(tpl, '3as_lp')
);
