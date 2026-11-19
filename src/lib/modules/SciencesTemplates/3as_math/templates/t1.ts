import { adaptSciencesTemplateForTrack, type SciencesParameterizedTemplate } from '../../types';
import {
	createMathElectrophoresisDiagnosisTemplate,
	createSharedSciencesTemplates3asT1
} from '../../secondary_shared_3as/templates/t1';

const sharedT1Math = createSharedSciencesTemplates3asT1('3as_math');

/**
 * 3AS MATH (Mathématiques — رياضيات) Parameterized Templates — Trimester 1 (5 templates)
 * Strictly Domain 1 — Units 1 & 2 (Protein Synthesis & Protein Structure).
 * Official BAC MATH 2-exercise ONEC structure: 2 recall (8 pts) + 3 scientific_approach (12 pts).
 */
export const SCIENCES_TEMPLATES_3AS_MATH_T1: SciencesParameterizedTemplate[] = [
	// 1. Recall (8 pts): Ribosome, Translation & Structured Text
	adaptSciencesTemplateForTrack(sharedT1Math[0], '3as_math'),
	// 2. Recall (8 pts): 3D Structure, Amphotericity & Electrophoresis
	adaptSciencesTemplateForTrack(sharedT1Math[3], '3as_math'),
	// 3. Scientific Approach (12 pts): Antibiotic Inhibition of Protein Synthesis
	adaptSciencesTemplateForTrack(sharedT1Math[2], '3as_math'),
	// 4. Scientific Approach (12 pts): Genetic Mutations, Anfinsen & Loss of Function
	adaptSciencesTemplateForTrack(sharedT1Math[1], '3as_math'),
	// 5. Scientific Approach (12 pts): Electrophoresis + Genetic Code Clinical Diagnosis
	adaptSciencesTemplateForTrack(createMathElectrophoresisDiagnosisTemplate('3as_math'), '3as_math')
];
