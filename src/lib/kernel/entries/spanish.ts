import { assembleSpanishExam, type SpanishExamVariant } from '../../server/assemblers/exam-spanish';
import type { SpanishTrackId } from '../../modules/SpanishTemplates/types';
import type { SubjectAssembleRequest, UnifiedExamPaper } from '../types';

export function assemble(req: SubjectAssembleRequest): UnifiedExamPaper {
	const grade = req.trackId as SpanishTrackId;
	const docType = req.docType === 'test' ? 'test' : 'exam';
	const cleanSeed = Math.abs(Math.floor(req.seed)) || 1;
	const variant: SpanishExamVariant =
		req.variant === 'bac_mock' && grade === '3as_le'
			? 'bac_mock'
			: docType === 'test' || req.variant === 'supervised_test'
				? 'supervised_test'
				: 'trimester_exam';

	const assembled = assembleSpanishExam({
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
		id: assembled.id,
		grade: assembled.grade,
		trimesterId: assembled.trimesterId,
		docType: assembled.docType,
		variant: assembled.variant,
		templateId: assembled.templateId,
		totalPoints: assembled.totalPoints,
		seed: assembled.seed,
		examDoc: assembled.examDoc
	};
}
