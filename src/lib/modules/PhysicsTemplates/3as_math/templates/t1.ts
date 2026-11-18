import { adaptPhysicsTemplateForTrack, type PhysicsParameterizedTemplate } from '../../types';
import { createSharedPhysicsTemplates3asT1 } from '../../secondary_shared_3as/templates/t1';

export const PHYSICS_TEMPLATES_3AS_MATH_T1: PhysicsParameterizedTemplate[] =
	createSharedPhysicsTemplates3asT1('3as_math').map((tpl) =>
		adaptPhysicsTemplateForTrack(tpl, '3as_math')
	);
