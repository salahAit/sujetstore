import type { ParameterizedTemplate } from '../../types';
import { adaptTemplateForTrack } from '../../types';
import { SHARED_TEMPLATES_2AS_T1 } from '../../secondary_shared_2as/templates/t1';

/**
 * 2AS SE (Sciences Expérimentales) Parameterized Templates - Trimester 1
 * Stream: Sciences Expérimentales (SE) | YearSubjectId: 672 | Coefficient: 5
 *
 * 6 High-yield Parametric Exercise Templates aligned with Algerian MEN Curriculum & ONEC BAC Format:
 * 1. Functions: Composition, domain determination and center of symmetry
 * 2. Polynomials: Cubic polynomials, apparent roots, Horner factoring & inequalities
 * 3. Derivability: Rate of change, tangent equation and local linear approximation
 * 4. Finite Probability: Tree diagrams, discrete random variable, expectation & variance
 * 5. Barycenter in Plane: Two and three weighted points, associative property & loci
 * 6. BAC Comprehensive Problem: Function analysis, variation table and economic optimization
 */

export const [
	tpl2asSeT1CompositionDomainSymmetry,
	tpl2asSeT1PolynomialCubicRoots,
	tpl2asSeT1DerivativeTangentApprox,
	tpl2asSeT1FiniteRandomVariable,
	tpl2asSeT1BarycenterLoci,
	tpl2asSeT1ProblemSynthesis
] = SHARED_TEMPLATES_2AS_T1.map((tpl) => adaptTemplateForTrack(tpl, '2as_se'));

export const TEMPLATES_2AS_SE_T1: ParameterizedTemplate[] = [
	tpl2asSeT1CompositionDomainSymmetry,
	tpl2asSeT1PolynomialCubicRoots,
	tpl2asSeT1DerivativeTangentApprox,
	tpl2asSeT1FiniteRandomVariable,
	tpl2asSeT1BarycenterLoci,
	tpl2asSeT1ProblemSynthesis
];
