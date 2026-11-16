import type { ParameterizedTemplate } from '../../types';
import { adaptTemplateForTrack } from '../../types';
import { SHARED_TEMPLATES_2AS_T2 } from '../../secondary_shared_2as/templates/t2';

/**
 * 2AS SE (Sciences Expérimentales) Parameterized Templates - Trimester 2
 * Stream: Sciences Expérimentales (SE) | YearSubjectId: 672 | Coefficient: 5
 *
 * 6 High-yield Parametric Exercise Templates aligned with Algerian MEN Curriculum & ONEC BAC Format:
 * 1. Limits & Asymptotes: Rational functions, infinite limits and horizontal/vertical asymptotes
 * 2. Indeterminate Forms: Removal, oblique asymptotes and relative position
 * 3. Oriented Angles & Trigonometry: Radian measure, trigonometric circle and basic trig equations
 * 4. Homothety in Plane: Center, ratio, coordinate formula and area magnification factor
 * 5. Scalar Product in Plane: Orthogonality, normal vector line equations and Al-Kashi theorem
 * 6. BAC Comprehensive Problem: Rational function study, oblique asymptote and economic optimization
 */

export const [
	tpl2asSeT2LimitsAsymptotes,
	tpl2asSeT2ObliqueAsymptotePos,
	tpl2asSeT2OrientedAnglesTrigEq,
	tpl2asSeT2HomothetyRatio,
	tpl2asSeT2ScalarProductCircleAlkashi,
	tpl2asSeT2ProblemSynthesis
] = SHARED_TEMPLATES_2AS_T2.map((tpl) => adaptTemplateForTrack(tpl, '2as_se'));

export const TEMPLATES_2AS_SE_T2: ParameterizedTemplate[] = [
	tpl2asSeT2LimitsAsymptotes,
	tpl2asSeT2ObliqueAsymptotePos,
	tpl2asSeT2OrientedAnglesTrigEq,
	tpl2asSeT2HomothetyRatio,
	tpl2asSeT2ScalarProductCircleAlkashi,
	tpl2asSeT2ProblemSynthesis
];
