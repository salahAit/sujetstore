import type { ParameterizedTemplate } from '../../types';
import { adaptTemplateForTrack } from '../../types';
import { SHARED_TEMPLATES_3AS_LIT_T3 } from '../../secondary_shared_3as_lit/templates/t3';

export const TEMPLATES_3AS_LE_T3: ParameterizedTemplate[] = SHARED_TEMPLATES_3AS_LIT_T3.map((tpl) =>
	adaptTemplateForTrack(tpl, '3as_le')
);
