import { assembleSciencesPrimaryExam, type SciencesPrimaryVariant } from '../../server/assemblers/exam-sciences-primary';
import { assembleSciencesMiddleExam, type SciencesMiddleVariant } from '../../server/assemblers/exam-sciences-middle';
import { assembleSciencesSecondaryExam, type SciencesSecondaryVariant } from '../../server/assemblers/exam-sciences-secondary';
import type { SciencesTrackId } from '../../modules/SciencesTemplates/types';
import type { SubjectAssembleRequest, UnifiedExamPaper } from '../types';

export function assemble(req: SubjectAssembleRequest): UnifiedExamPaper {
	const grade = req.trackId as SciencesTrackId;
	switch (grade) {
		case '1ap':
		case '2ap':
		case '3ap':
		case '4ap':
		case '5ap': {
			let variant: SciencesPrimaryVariant;
			if (grade === '5ap' && req.variant === 'competency_eval') {
				variant = 'competency_eval';
			} else if (req.docType === 'test' || req.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assembleSciencesPrimaryExam({
				grade,
				trimesterId: req.trimesterId,
				seed: req.seed,
				docType: req.docType,
				variant,
				difficulty: req.difficulty,
				academicYear: req.academicYear,
				schoolName: req.schoolName
			});
		}
		case '1am':
		case '2am':
		case '3am':
		case '4am': {
			let variant: SciencesMiddleVariant;
			if (grade === '4am' && req.variant === 'bem_mock') {
				variant = 'bem_mock';
			} else if (req.docType === 'test' || req.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assembleSciencesMiddleExam({
				grade,
				trimesterId: req.trimesterId,
				seed: req.seed,
				docType: req.docType,
				variant,
				difficulty: req.difficulty,
				academicYear: req.academicYear,
				schoolName: req.schoolName
			});
		}
		case '1as_tcst':
		case '2as_se':
		case '2as_math':
		case '3as_se':
		case '3as_math': {
			let variant: SciencesSecondaryVariant;
			if (req.variant === 'bac_mock' && grade.startsWith('3as_')) {
				variant = 'bac_mock';
			} else if (req.docType === 'test' || req.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assembleSciencesSecondaryExam({
				grade,
				trimesterId: req.trimesterId,
				seed: req.seed,
				docType: req.docType,
				variant,
				difficulty: req.difficulty,
				academicYear: req.academicYear,
				schoolName: req.schoolName
			});
		}
		default:
			throw new Error(`Unsupported sciences track: ${String(grade)}`);
	}
}
