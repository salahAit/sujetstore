import { assembleEnglishPrimaryExam, type EnglishPrimaryVariant } from '../../server/assemblers/exam-english-primary';
import { assembleEnglishMiddleExam, type EnglishMiddleVariant } from '../../server/assemblers/exam-english-middle';
import { assembleEnglishSecondaryExam, type EnglishSecondaryVariant } from '../../server/assemblers/exam-english-secondary';
import type { EnglishTrackId } from '../../modules/EnglishTemplates/types';
import type { SubjectAssembleRequest, UnifiedExamPaper } from '../types';

export function assemble(req: SubjectAssembleRequest): UnifiedExamPaper {
	const grade = req.trackId as EnglishTrackId;
	switch (grade) {
		case '3ap':
		case '4ap':
		case '5ap': {
			let variant: EnglishPrimaryVariant;
			if (grade === '5ap' && req.variant === 'competency_eval') {
				variant = 'competency_eval';
			} else if (req.docType === 'test' || req.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assembleEnglishPrimaryExam({
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
			let variant: EnglishMiddleVariant;
			if (grade === '4am' && req.variant === 'bem_mock') {
				variant = 'bem_mock';
			} else if (req.docType === 'test' || req.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assembleEnglishMiddleExam({
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
			let variant: EnglishSecondaryVariant;
			if (req.variant === 'bac_mock' && grade.startsWith('3as_')) {
				variant = 'bac_mock';
			} else if (req.docType === 'test' || req.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assembleEnglishSecondaryExam({
				grade,
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
		default:
			throw new Error(`Unsupported english track: ${String(grade)}`);
	}
}
