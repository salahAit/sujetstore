import { assembleIslamicPaper, type IslamicExamVariant } from '../../server/assemblers/exam-islamic';
import type { IslamicTrackId } from '../../modules/IslamicTemplates/types';
import type { SubjectAssembleRequest, UnifiedExamPaper } from '../types';

const SUPPORTED: ReadonlySet<string> = new Set([
	'trimester_exam',
	'supervised_test',
	'competency_eval',
	'bem_mock',
	'bac_mock'
]);

export function assemble(req: SubjectAssembleRequest): UnifiedExamPaper {
	const variant =
		req.variant && SUPPORTED.has(req.variant) ? (req.variant as IslamicExamVariant) : undefined;
	return assembleIslamicPaper({
		grade: req.trackId as IslamicTrackId,
		trimesterId: req.trimesterId,
		seed: req.seed,
		docType: req.docType,
		variant,
		difficulty: req.difficulty,
		academicYear: req.academicYear,
		schoolName: req.schoolName,
		topicNumber: req.topicNumber
	});
}
