import type { ParameterizedTemplate } from '../../types';
import { adaptTemplateForTrack } from '../../types';
import { SHARED_TEMPLATES_2AS_LIT_T1 } from '../../secondary_shared_2as_lit/templates/t1';

/**
 * 2AS LP (آداب وفلسفة) Parameterized Templates - Trimester 1
 * Stream: Lettres et Philosophie (LP) | YearSubjectId: 760 | Coefficient: 2
 */
export const [
	tpl2asLpT1PercentageEvolution,
	tpl2asLpT1SuccessiveReverseCoef,
	tpl2asLpT1EconomicIndex,
	tpl2asLpT1VarianceStdSeries,
	tpl2asLpT1QuartilesBoxplot,
	tpl2asLpT1ProblemStatsIndices
] = SHARED_TEMPLATES_2AS_LIT_T1.map((tpl) => adaptTemplateForTrack(tpl, '2as_lp'));

export const TEMPLATES_2AS_LP_T1: ParameterizedTemplate[] = [
	tpl2asLpT1PercentageEvolution,
	tpl2asLpT1SuccessiveReverseCoef,
	tpl2asLpT1EconomicIndex,
	tpl2asLpT1VarianceStdSeries,
	tpl2asLpT1QuartilesBoxplot,
	tpl2asLpT1ProblemStatsIndices
];
