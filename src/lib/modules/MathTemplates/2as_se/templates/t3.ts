import type { ParameterizedTemplate } from '../../types';
import { adaptTemplateForTrack } from '../../types';
import { SHARED_TEMPLATES_2AS_T3 } from '../../secondary_shared_2as/templates/t3';

/**
 * 2AS SE (Sciences Expérimentales) Parameterized Templates - Trimester 3
 * Stream: Sciences Expérimentales (SE) | YearSubjectId: 672 | Coefficient: 5
 *
 * 6 High-yield Parametric Exercise Templates aligned with Algerian MEN Curriculum & ONEC BAC Format:
 * 1. Numerical Sequences: Generation, monotonicity and bounded sequences
 * 2. Arithmetic Sequences: Common difference, general term, arithmetic mean & sum formula
 * 3. Geometric Sequences: Auxiliary geometric sequence, partial sum & convergence
 * 4. Space Geometry: Space vectors, coplanarity and collinearity
 * 5. Analytic Space Geometry: Sphere surface equation, plane distance and intersection
 * 6. BAC Comprehensive Problem: Rational function with attached recursive sequence and economic model
 */

export const [
	tpl2asSeT3SequencesMonotonicity,
	tpl2asSeT3ArithmeticSum,
	tpl2asSeT3GeometricConvergence,
	tpl2asSeT3SpaceVectorsCoplanarity,
	tpl2asSeT3SpaceSphereDistance,
	tpl2asSeT3ProblemSynthesis
] = SHARED_TEMPLATES_2AS_T3.map((tpl) => adaptTemplateForTrack(tpl, '2as_se'));

export const TEMPLATES_2AS_SE_T3: ParameterizedTemplate[] = [
	tpl2asSeT3SequencesMonotonicity,
	tpl2asSeT3ArithmeticSum,
	tpl2asSeT3GeometricConvergence,
	tpl2asSeT3SpaceVectorsCoplanarity,
	tpl2asSeT3SpaceSphereDistance,
	tpl2asSeT3ProblemSynthesis
];
