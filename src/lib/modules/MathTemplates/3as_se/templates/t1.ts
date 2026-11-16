import { adaptTemplateForTrack, type ParameterizedTemplate } from '../../types';
import { SHARED_TEMPLATES_3AS_T1 } from '../../secondary_shared_3as/templates/t1';

export const TEMPLATES_3AS_SE_T1: ParameterizedTemplate[] = SHARED_TEMPLATES_3AS_T1.map((t) =>
	adaptTemplateForTrack(t, '3as_se')
);
