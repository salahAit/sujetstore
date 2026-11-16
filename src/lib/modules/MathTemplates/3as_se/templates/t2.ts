import { adaptTemplateForTrack, type ParameterizedTemplate } from '../../types';
import { SHARED_TEMPLATES_3AS_T2 } from '../../secondary_shared_3as/templates/t2';

export const TEMPLATES_3AS_SE_T2: ParameterizedTemplate[] = SHARED_TEMPLATES_3AS_T2.map((t) =>
	adaptTemplateForTrack(t, '3as_se')
);
