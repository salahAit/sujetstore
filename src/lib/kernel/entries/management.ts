import {
	assembleManagementPaper,
	type ManagementExamVariant
} from '../../server/assemblers/exam-management';
import type { ManagementTrackId } from '../../modules/ManagementTemplates/types';
import type { SubjectAssembleRequest, UnifiedExamPaper } from '../types';

export function assemble(req: SubjectAssembleRequest): UnifiedExamPaper {
	const grade = req.trackId as ManagementTrackId;
	let variant: ManagementExamVariant;
	if (req.variant === 'bac_mock' && grade.startsWith('3as_')) {
		variant = 'bac_mock';
	} else if (req.docType === 'test' || req.variant === 'supervised_test') {
		variant = 'supervised_test';
	} else {
		variant = 'trimester_exam';
	}

	const paper = assembleManagementPaper({
		grade,
		trimesterId: req.trimesterId,
		seed: req.seed,
		docType: req.docType === 'test' || variant === 'supervised_test' ? 'test' : 'exam',
		variant,
		difficulty: req.difficulty,
		academicYear: req.academicYear,
		schoolName: req.schoolName,
		topicNumber: req.topicNumber
	});

	return {
		id: `management_${grade}_${req.trimesterId}_${variant}_s${req.seed}`,
		grade,
		trimesterId: req.trimesterId,
		docType: req.docType === 'test' || variant === 'supervised_test' ? 'test' : 'exam',
		variant,
		templateId: paper.templateId,
		totalPoints: paper.totalPoints,
		seed: req.seed,
		examDoc: paper.examDoc,
		exerciseInstances: paper.exercises
	};
}
