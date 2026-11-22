import type { ParameterizedTemplate } from '../../types';
import { adaptTemplateForTrack } from '../../types';
import { SHARED_TEMPLATES_2AS_LIT_T2 } from '../../secondary_shared_2as_lit/templates/t2';

/**
 * 2AS LP (آداب وفلسفة) Parameterized Templates - Trimester 2
 * Stream: Lettres et Philosophie (LP) | YearSubjectId: 760 | Coefficient: 2
 */
export const [
	tpl2asLpT2SequenceTermsMonotonicity,
	tpl2asLpT2ArithmeticSequence,
	tpl2asLpT2GeometricSequence,
	tpl2asLpT2HalalSavingsProduction,
	tpl2asLpT2ProbabilityUrnEvents,
	tpl2asLpT2ProblemSequencesProb
] = SHARED_TEMPLATES_2AS_LIT_T2.map((tpl) => adaptTemplateForTrack(tpl, '2as_lp'));

export const TEMPLATES_2AS_LP_T2: ParameterizedTemplate[] = [
	tpl2asLpT2SequenceTermsMonotonicity,
	tpl2asLpT2ArithmeticSequence,
	tpl2asLpT2GeometricSequence,
	tpl2asLpT2HalalSavingsProduction,
	tpl2asLpT2ProbabilityUrnEvents,
	tpl2asLpT2ProblemSequencesProb
];
