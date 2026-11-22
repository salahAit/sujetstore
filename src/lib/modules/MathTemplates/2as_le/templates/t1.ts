import type { ParameterizedTemplate } from '../../types';
import { adaptTemplateForTrack } from '../../types';
import { SHARED_TEMPLATES_2AS_LIT_T1 } from '../../secondary_shared_2as_lit/templates/t1';

/**
 * 2AS LE (لغات أجنبية) Parameterized Templates - Trimester 1
 * Stream: Langues Étrangères (LE) | YearSubjectId: 776 | Coefficient: 2
 */
export const [
	tpl2asLeT1PercentageEvolution,
	tpl2asLeT1SuccessiveReverseCoef,
	tpl2asLeT1EconomicIndex,
	tpl2asLeT1VarianceStdSeries,
	tpl2asLeT1QuartilesBoxplot,
	tpl2asLeT1ProblemStatsIndices
] = SHARED_TEMPLATES_2AS_LIT_T1.map((tpl) => adaptTemplateForTrack(tpl, '2as_le'));

export const TEMPLATES_2AS_LE_T1: ParameterizedTemplate[] = [
	tpl2asLeT1PercentageEvolution,
	tpl2asLeT1SuccessiveReverseCoef,
	tpl2asLeT1EconomicIndex,
	tpl2asLeT1VarianceStdSeries,
	tpl2asLeT1QuartilesBoxplot,
	tpl2asLeT1ProblemStatsIndices
];
