import { adaptTemplateForTrack, type ParameterizedTemplate } from '../../types';
import { SHARED_TEMPLATES_3AS_T3 } from '../../secondary_shared_3as/templates/t3';

export const TEMPLATES_3AS_SE_T3: ParameterizedTemplate[] = SHARED_TEMPLATES_3AS_T3.map((t) =>
	adaptTemplateForTrack(t, '3as_se')
);
