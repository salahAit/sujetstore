import { assembleItalianExam, type ItalianExamVariant } from '../../server/assemblers/exam-italian';
import type { ItalianTrackId } from '../../modules/ItalianTemplates/types';
import type { SubjectAssembleRequest, UnifiedExamPaper } from '../types';

export function assemble(req: SubjectAssembleRequest): UnifiedExamPaper {
	const grade = req.trackId as ItalianTrackId;
	const docType = req.docType === 'test' ? 'test' : 'exam';
	const cleanSeed = Math.abs(Math.floor(req.seed)) || 1;
	const variant: ItalianExamVariant =
		req.variant === 'bac_mock' && grade === '3as_le'
			? 'bac_mock'
			: docType === 'test' || req.variant === 'supervised_test'
				? 'supervised_test'
				: 'trimester_exam';

	const assembled = assembleItalianExam({
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
