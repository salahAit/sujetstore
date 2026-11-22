import { assembleHistoryPaper, type HistoryExamVariant } from '../../server/assemblers/exam-history';
import type { HistoryTrackId } from '../../modules/HistoryGeoTemplates/types';
import type { SubjectAssembleRequest, UnifiedExamPaper } from '../types';

export function assemble(req: SubjectAssembleRequest): UnifiedExamPaper {
	const grade = req.trackId as HistoryTrackId;
	const docType = req.docType === 'test' ? 'test' : 'exam';
	const cleanSeed = Math.abs(Math.floor(req.seed)) || 1;
	const variant: HistoryExamVariant =
		req.variant === 'competency_eval' ||
		req.variant === 'bem_mock' ||
		req.variant === 'bac_mock' ||
		req.variant === 'supervised_test'
			? req.variant
			: docType === 'test'
				? 'supervised_test'
				: 'trimester_exam';

	const assembled = assembleHistoryPaper({
		grade,
		trimesterId: req.trimesterId,
		seed: cleanSeed,
		docType,
		variant,
		difficulty: req.difficulty,
		academicYear: req.academicYear,
		schoolName: req.schoolName,
		topicNumber: req.topicNumber
	});

	return {
		id: `his-${grade}-${req.trimesterId}-${variant}-${cleanSeed}`,
		grade,
		trimesterId: req.trimesterId,
		docType,
		variant,
		templateId: assembled.templateId,
		totalPoints: assembled.totalPoints,
		seed: cleanSeed,
		examDoc: assembled.examDoc
	};
}
