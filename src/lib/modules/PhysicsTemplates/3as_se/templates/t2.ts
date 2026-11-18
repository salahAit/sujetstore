import { adaptPhysicsTemplateForTrack, type PhysicsParameterizedTemplate } from '../../types';
import { createSharedPhysicsTemplates3asT2 } from '../../secondary_shared_3as/templates/t2';

export const PHYSICS_TEMPLATES_3AS_SE_T2: PhysicsParameterizedTemplate[] =
	createSharedPhysicsTemplates3asT2('3as_se').map((tpl) =>
		adaptPhysicsTemplateForTrack(tpl, '3as_se')
	);
