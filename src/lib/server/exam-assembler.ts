import {
	assemblePrimaryLowerExam,
	type AssembledPrimaryLowerPaper
} from './assemblers/exam-primary-lower';
import {
	assemblePrimaryUpperExam,
	type AssembledPrimaryUpperPaper,
	type PrimaryUpperVariant
} from './assemblers/exam-primary-upper';
import {
	assembleMiddleExam,
	type AssembledMiddlePaper,
	type MiddleVariant
} from './assemblers/exam-middle';
import {
	assembleSecondaryExam,
	type AssembledSecondaryPaper,
	type SecondaryVariant
} from './assemblers/exam-secondary';
import { compileTypstPdf } from './typst';
import {
	SECONDARY_TRACK_IDS,
	type Difficulty,
	type GradeId,
	type SecondaryTrackId
} from '../modules/MathTemplates/types';
import type { TrimesterId } from '../modules/SujetBuilder/types';

export type UnifiedAssembledExam =
	| AssembledPrimaryLowerPaper
	| AssembledPrimaryUpperPaper
	| AssembledMiddlePaper
	| AssembledSecondaryPaper;

export interface AssembleExamOptions {
	grade: GradeId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	variant?:
		| 'trimester_exam'
		| 'supervised_test'
		| 'cinq_mock'
		| 'competency_eval'
		| 'bem_mock'
		| 'bac_mock';
	difficulty?: Difficulty;
	academicYear?: string;
	schoolName?: string;
}

const PIPELINE_GRADES: ReadonlySet<string> = new Set<GradeId>([
	'1ap',
	'2ap',
	'3ap',
	'4ap',
	'5ap',
	'1am',
	'2am',
	'3am',
	'4am'
]);

export function yearSubjectToGrade(
	yearId: string,
	subjectId: string,
	streamId?: string | null
): GradeId | null {
	if (subjectId === 'MAT-B' && PIPELINE_GRADES.has(yearId)) {
		return yearId as GradeId;
	}

	if (yearId === '1as' && subjectId === 'MAT-SE') {
		if (!streamId || streamId === 'TCST' || streamId === 'tcst' || streamId === 'GEN') {
			return '1as_tcst';
		}
	}

	if (yearId === '2as') {
		if (subjectId === 'MAT-SE') return '2as_se';
		if (subjectId === 'MAT-TM') return '2as_tm';
		if (subjectId === 'MAT-MATH') return '2as_math';
	}

	if (yearId === '3as') {
		if (subjectId === 'MAT-SE') return '3as_se';
		if (subjectId === 'MAT-TM') return '3as_tm';
		if (subjectId === 'MAT-MATH') return '3as_math';
	}

	return null;
}

export function assembleExam(opts: AssembleExamOptions): UnifiedAssembledExam {
	switch (opts.grade) {
		case '1ap':
		case '2ap':
			return assemblePrimaryLowerExam({
				grade: opts.grade,
				trimesterId: opts.trimesterId,
				seed: opts.seed,
				docType: opts.docType === 'test' || opts.variant === 'supervised_test' ? 'test' : 'exam',
				difficulty: opts.difficulty,
				academicYear: opts.academicYear,
				schoolName: opts.schoolName
			});
		case '3ap':
		case '4ap':
		case '5ap': {
			let variant: PrimaryUpperVariant;
			if (
				opts.grade === '5ap' &&
				(opts.variant === 'cinq_mock' || opts.variant === 'competency_eval')
			) {
				variant = opts.variant;
			} else if (opts.docType === 'test' || opts.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assemblePrimaryUpperExam({
				grade: opts.grade,
				trimesterId: opts.trimesterId,
				seed: opts.seed,
				variant,
				difficulty: opts.difficulty,
				academicYear: opts.academicYear,
				schoolName: opts.schoolName
			});
		}
		case '1am':
		case '2am':
		case '3am':
		case '4am': {
			let variant: MiddleVariant;
			if (opts.grade === '4am' && opts.variant === 'bem_mock') {
				variant = 'bem_mock';
			} else if (opts.docType === 'test' || opts.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assembleMiddleExam({
				grade: opts.grade,
				trimesterId: opts.trimesterId,
				seed: opts.seed,
				variant,
				difficulty: opts.difficulty,
				academicYear: opts.academicYear,
				schoolName: opts.schoolName
			});
		}
		case '1as_tcst':
		case '2as_se':
		case '2as_tm':
		case '2as_math':
		case '3as_se':
		case '3as_tm':
		case '3as_math': {
			let variant: SecondaryVariant;
			if (opts.variant === 'bac_mock' && opts.grade.startsWith('3as_')) {
				variant = 'bac_mock';
			} else if (opts.docType === 'test' || opts.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assembleSecondaryExam({
				grade: opts.grade,
				trimesterId: opts.trimesterId,
				seed: opts.seed,
				docType: opts.docType,
				variant,
				difficulty: opts.difficulty,
				academicYear: opts.academicYear,
				schoolName: opts.schoolName
			});
		}
		default: {
			const _exhaustive: never = opts.grade;
			throw new Error(`Unsupported grade: ${String(_exhaustive)}`);
		}
	}
}

export async function compileAssembledExamPdf(
	paper: UnifiedAssembledExam,
	paths: { subjectOutPath: string; solutionOutPath: string }
) {
	const [subjectResult, solutionResult] = await Promise.all([
		compileTypstPdf({
			examDoc: paper.examDoc as unknown as Record<string, any>,
			outputPath: paths.subjectOutPath,
			templateId: paper.templateId,
			isSolution: false
		}),
		compileTypstPdf({
			examDoc: paper.examDoc as unknown as Record<string, any>,
			outputPath: paths.solutionOutPath,
			templateId: paper.templateId,
			isSolution: true
		})
	]);
	return { subjectResult, solutionResult };
}
