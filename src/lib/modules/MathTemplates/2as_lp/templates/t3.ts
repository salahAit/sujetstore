import type { ParameterizedTemplate } from '../../types';
import { adaptTemplateForTrack } from '../../types';
import { SHARED_TEMPLATES_2AS_LIT_T3 } from '../../secondary_shared_2as_lit/templates/t3';

/**
 * 2AS LP (آداب وفلسفة) Parameterized Templates - Trimester 3
 * Stream: Lettres et Philosophie (LP) | YearSubjectId: 760 | Coefficient: 2
 */
export const [
	tpl2asLpT3DerivativeTangent,
	tpl2asLpT3DerivativePolyHomographic,
	tpl2asLpT3CubicVariationTable,
	tpl2asLpT3LocalExtremaOptimization,
	tpl2asLpT3HomographicStudyGraph,
	tpl2asLpT3ProblemFullCubicStudy
] = SHARED_TEMPLATES_2AS_LIT_T3.map((tpl) => adaptTemplateForTrack(tpl, '2as_lp'));

export const TEMPLATES_2AS_LP_T3: ParameterizedTemplate[] = [
	tpl2asLpT3DerivativeTangent,
	tpl2asLpT3DerivativePolyHomographic,
	tpl2asLpT3CubicVariationTable,
	tpl2asLpT3LocalExtremaOptimization,
	tpl2asLpT3HomographicStudyGraph,
	tpl2asLpT3ProblemFullCubicStudy
];
