import { assemblePhysicsMiddleExam, type PhysicsMiddleVariant } from '../../server/assemblers/exam-physics-middle';
import { assemblePhysicsSecondaryExam, type PhysicsSecondaryVariant } from '../../server/assemblers/exam-physics-secondary';
import type { PhysicsTrackId } from '../../modules/PhysicsTemplates/types';
import type { SubjectAssembleRequest, UnifiedExamPaper } from '../types';

export function assemble(req: SubjectAssembleRequest): UnifiedExamPaper {
	const grade = req.trackId as PhysicsTrackId;
	switch (grade) {
		case '1am':
		case '2am':
		case '3am':
		case '4am': {
			let variant: PhysicsMiddleVariant;
			if (grade === '4am' && req.variant === 'bem_mock') {
				variant = 'bem_mock';
			} else if (req.docType === 'test' || req.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assemblePhysicsMiddleExam({
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
		case '2as_tm':
		case '2as_math':
		case '3as_se':
		case '3as_tm':
		case '3as_math': {
			let variant: PhysicsSecondaryVariant;
			if (req.variant === 'bac_mock' && grade.startsWith('3as_')) {
				variant = 'bac_mock';
			} else if (req.docType === 'test' || req.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assemblePhysicsSecondaryExam({
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
			throw new Error(`Unsupported physics track: ${String(grade)}`);
	}
}
