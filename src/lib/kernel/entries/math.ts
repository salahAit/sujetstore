import { assemblePrimaryLowerExam } from '../../server/assemblers/exam-primary-lower';
import { assemblePrimaryUpperExam, type PrimaryUpperVariant } from '../../server/assemblers/exam-primary-upper';
import { assembleMiddleExam, type MiddleVariant } from '../../server/assemblers/exam-middle';
import { assembleSecondaryExam, type SecondaryVariant } from '../../server/assemblers/exam-secondary';
import type { GradeId } from '../../modules/MathTemplates/types';
import type { SubjectAssembleRequest, UnifiedExamPaper } from '../types';

export function assemble(req: SubjectAssembleRequest): UnifiedExamPaper {
	const grade = req.trackId as GradeId;
	switch (grade) {
		case '1ap':
		case '2ap':
			return assemblePrimaryLowerExam({
				grade,
				trimesterId: req.trimesterId,
				seed: req.seed,
				docType: req.docType === 'test' || req.variant === 'supervised_test' ? 'test' : 'exam',
				difficulty: req.difficulty,
				academicYear: req.academicYear,
				schoolName: req.schoolName
			});
		case '3ap':
		case '4ap':
		case '5ap': {
			let variant: PrimaryUpperVariant;
			if (grade === '5ap' && (req.variant === 'cinq_mock' || req.variant === 'competency_eval')) {
				variant = req.variant;
			} else if (req.docType === 'test' || req.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assemblePrimaryUpperExam({
				grade,
				trimesterId: req.trimesterId,
				seed: req.seed,
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
			let variant: MiddleVariant;
			if (grade === '4am' && req.variant === 'bem_mock') {
				variant = 'bem_mock';
			} else if (req.docType === 'test' || req.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assembleMiddleExam({
				grade,
				trimesterId: req.trimesterId,
				seed: req.seed,
				variant,
				difficulty: req.difficulty,
				academicYear: req.academicYear,
				schoolName: req.schoolName
			});
		}
		case '1as_tcst':
		case '1as_tcl':
		case '2as_se':
		case '2as_tm':
		case '2as_math':
		case '2as_ge':
		case '2as_lp':
		case '2as_le':
		case '3as_se':
		case '3as_tm':
		case '3as_math':
		case '3as_ge':
		case '3as_lp':
		case '3as_le': {
			let variant: SecondaryVariant;
			if (req.variant === 'bac_mock' && grade.startsWith('3as_')) {
				variant = 'bac_mock';
			} else if (req.docType === 'test' || req.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assembleSecondaryExam({
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
			throw new Error(`Unsupported math track: ${String(grade)}`);
	}
}
