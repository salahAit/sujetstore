import type { ParameterizedTemplate } from '../../types';
import { adaptTemplateForTrack } from '../../types';
import { SHARED_TEMPLATES_2AS_LIT_T2 } from '../../secondary_shared_2as_lit/templates/t2';

/**
 * 2AS LE (لغات أجنبية) Parameterized Templates - Trimester 2
 * Stream: Langues Étrangères (LE) | YearSubjectId: 776 | Coefficient: 2
 */
export const [
	tpl2asLeT2SequenceTermsMonotonicity,
	tpl2asLeT2ArithmeticSequence,
	tpl2asLeT2GeometricSequence,
	tpl2asLeT2HalalSavingsProduction,
	tpl2asLeT2ProbabilityUrnEvents,
	tpl2asLeT2ProblemSequencesProb
] = SHARED_TEMPLATES_2AS_LIT_T2.map((tpl) => adaptTemplateForTrack(tpl, '2as_le'));

export const TEMPLATES_2AS_LE_T2: ParameterizedTemplate[] = [
	tpl2asLeT2SequenceTermsMonotonicity,
	tpl2asLeT2ArithmeticSequence,
	tpl2asLeT2GeometricSequence,
	tpl2asLeT2HalalSavingsProduction,
	tpl2asLeT2ProbabilityUrnEvents,
	tpl2asLeT2ProblemSequencesProb
];
