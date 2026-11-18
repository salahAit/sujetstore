import { adaptPhysicsTemplateForTrack, type PhysicsParameterizedTemplate } from '../../types';
import { createSharedPhysicsTemplates3asT3 } from '../../secondary_shared_3as/templates/t3';

export const PHYSICS_TEMPLATES_3AS_SE_T3: PhysicsParameterizedTemplate[] =
	createSharedPhysicsTemplates3asT3('3as_se').map((tpl) =>
		adaptPhysicsTemplateForTrack(tpl, '3as_se')
	);
