import type { ParameterizedTemplate } from '../../types';
import { adaptTemplateForTrack } from '../../types';
import { SHARED_TEMPLATES_2AS_LIT_T3 } from '../../secondary_shared_2as_lit/templates/t3';

/**
 * 2AS LE (لغات أجنبية) Parameterized Templates - Trimester 3
 * Stream: Langues Étrangères (LE) | YearSubjectId: 776 | Coefficient: 2
 */
export const [
	tpl2asLeT3DerivativeTangent,
	tpl2asLeT3DerivativePolyHomographic,
	tpl2asLeT3CubicVariationTable,
	tpl2asLeT3LocalExtremaOptimization,
	tpl2asLeT3HomographicStudyGraph,
	tpl2asLeT3ProblemFullCubicStudy
] = SHARED_TEMPLATES_2AS_LIT_T3.map((tpl) => adaptTemplateForTrack(tpl, '2as_le'));

export const TEMPLATES_2AS_LE_T3: ParameterizedTemplate[] = [
	tpl2asLeT3DerivativeTangent,
	tpl2asLeT3DerivativePolyHomographic,
	tpl2asLeT3CubicVariationTable,
	tpl2asLeT3LocalExtremaOptimization,
	tpl2asLeT3HomographicStudyGraph,
	tpl2asLeT3ProblemFullCubicStudy
];
