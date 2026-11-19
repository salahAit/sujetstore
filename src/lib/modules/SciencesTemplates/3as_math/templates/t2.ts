import {
	adaptSciencesTemplateForTrack,
	type Difficulty,
	type SciencesParameterizedTemplate
} from '../../types';
import { createSharedSciencesTemplates3asT1 } from '../../secondary_shared_3as/templates/t1';
import { createSharedSciencesTemplates3asT2 } from '../../secondary_shared_3as/templates/t2';

function retargetToT2(
	tpl: SciencesParameterizedTemplate,
	curriculumLessonId: string
): SciencesParameterizedTemplate {
	const adapted = adaptSciencesTemplateForTrack(tpl, '3as_math');
	const newId = adapted.id.replace(/_t[123]_/, '_t2_');
	return {
		...adapted,
		id: newId,
		trimesterId: 't2',
		curriculumLessonId,
		generate(seed: number, difficulty: Difficulty = 'medium') {
			const out = adapted.generate(seed, difficulty);
			return { ...out, templateId: newId, trimesterId: 't2' };
		}
	};
}

const sharedT1Math = createSharedSciencesTemplates3asT1('3as_math');
const sharedT2Math = createSharedSciencesTemplates3asT2('3as_math');

/**
 * 3AS MATH (Mathématiques — رياضيات) Parameterized Templates — Trimester 2 (5 templates)
 * Strictly Domain 1 — Units 3 & 4 (Enzymology & Immunology).
 * Official BAC MATH 2-exercise ONEC structure: 2 recall (8 pts) + 3 scientific_approach (12 pts).
 */
export const SCIENCES_TEMPLATES_3AS_MATH_T2: SciencesParameterizedTemplate[] = [
	// 1. Recall (8 pts): Enzyme Specificity, Kinetics & pH/Temp Factors
	retargetToT2(sharedT1Math[4], 'sci_lesson_3as_math_t2_enzyme_specificity_kinetics'),
	// 2. Recall (8 pts): Antibody Structure, Immune Complex & Ouchterlony
	adaptSciencesTemplateForTrack(sharedT2Math[0], '3as_math'),
	// 3. Scientific Approach (12 pts): Drug Enzyme Inhibitors (Competitive & Non-competitive)
	retargetToT2(sharedT1Math[5], 'sci_lesson_3as_math_t2_enzyme_ph_temp_inhibition'),
	// 4. Scientific Approach (12 pts): Immune Cooperation (LT4/IL-2) & HIV Targeting
	adaptSciencesTemplateForTrack(sharedT2Math[1], '3as_math'),
	// 5. Scientific Approach (12 pts): Cancer Immunotherapy (Monoclonal Antibodies & LTc)
	adaptSciencesTemplateForTrack(sharedT2Math[2], '3as_math')
];
