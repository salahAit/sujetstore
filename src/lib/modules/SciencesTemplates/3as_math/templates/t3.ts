import {
	adaptSciencesTemplateForTrack,
	type Difficulty,
	type SciencesParameterizedTemplate
} from '../../types';
import { createSharedSciencesTemplates3asT2 } from '../../secondary_shared_3as/templates/t2';
import { createSharedSciencesTemplates3asDomain1T3 } from '../../secondary_shared_3as/templates/t3';

function retargetToT3(
	tpl: SciencesParameterizedTemplate,
	curriculumLessonId: string
): SciencesParameterizedTemplate {
	const adapted = adaptSciencesTemplateForTrack(tpl, '3as_math');
	const newId = adapted.id.replace(/_t[123]_/, '_t3_');
	return {
		...adapted,
		id: newId,
		trimesterId: 't3',
		curriculumLessonId,
		generate(seed: number, difficulty: Difficulty = 'medium') {
			const out = adapted.generate(seed, difficulty);
			return { ...out, templateId: newId, trimesterId: 't3' };
		}
	};
}

const sharedT2Math = createSharedSciencesTemplates3asT2('3as_math');
const sharedDomain1T3 = createSharedSciencesTemplates3asDomain1T3('3as_math');

/**
 * 3AS MATH (Mathématiques — رياضيات) Parameterized Templates — Trimester 3 (5 templates)
 * Strictly Domain 1 — Unit 5 (Neurobiology) + Cross-Unit Domain 1 BAC MATH Synthesis.
 * ZERO Bioenergetics and ZERO Plate Tectonics!
 * Official BAC MATH 2-exercise ONEC structure: 2 recall (8 pts) + 3 scientific_approach (12 pts).
 */
export const SCIENCES_TEMPLATES_3AS_MATH_T3: SciencesParameterizedTemplate[] = [
	// 1. Recall (8 pts): Synapse Ultrastructure & Membrane Channels in Neurobiology
	retargetToT3(sharedT2Math[3], 'sci_lesson_3as_math_t3_synapse_integration_toxins'),
	// 2. Recall (8 pts): Functional Unity & Structural Complementarity across all 5 Units of Domain 1
	adaptSciencesTemplateForTrack(sharedDomain1T3[0], '3as_math'),
	// 3. Scientific Approach (12 pts): Neurotoxins, Drugs & Pesticides on Synaptic Transmission
	retargetToT3(sharedT2Math[5], 'sci_lesson_3as_math_t3_neurotoxins_pharmacology'),
	// 4. Scientific Approach (12 pts): Genetic Ion Channelopathy (Units 1 + 2 + 5)
	adaptSciencesTemplateForTrack(sharedDomain1T3[1], '3as_math'),
	// 5. Scientific Approach (12 pts): Myasthenia Gravis & Neostigmine (Units 4 + 3 + 5)
	adaptSciencesTemplateForTrack(sharedDomain1T3[2], '3as_math')
];
