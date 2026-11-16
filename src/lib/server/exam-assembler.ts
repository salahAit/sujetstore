import { assemble2apExam, type AssembledExamPaper as Assembled2apPaper } from './assemblers/exam-2ap';
import {
	assemble5apExam,
	type AssembledExamPaper as Assembled5apPaper,
	type Exam5apVariant
} from './assemblers/exam-5ap';
import { assemble2amExam, type AssembledExamPaper as Assembled2amPaper } from './assemblers/exam-2am';
import { compileTypstPdf } from './typst';
import type { Difficulty, GradeId } from '../modules/MathTemplates/types';
import type { TrimesterId } from '../modules/SujetBuilder/types';

export type UnifiedAssembledExam = Assembled2apPaper | Assembled5apPaper | Assembled2amPaper;

export interface AssembleExamOptions {
	grade: GradeId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	variant?: 'trimester_exam' | 'supervised_test' | 'cinq_mock' | 'competency_eval';
	difficulty?: Difficulty;
	academicYear?: string;
	schoolName?: string;
}

export function yearSubjectToGrade(yearId: string, subjectId: string): GradeId | null {
	if (subjectId === 'MAT-B' && (yearId === '2ap' || yearId === '5ap' || yearId === '2am')) {
		return yearId as GradeId;
	}
	return null;
}

export function assembleExam(opts: AssembleExamOptions): UnifiedAssembledExam {
	switch (opts.grade) {
		case '2ap':
			return assemble2apExam({
				trimesterId: opts.trimesterId,
				seed: opts.seed,
				difficulty: opts.difficulty,
				academicYear: opts.academicYear,
				schoolName: opts.schoolName
			});
		case '5ap': {
			const variant: Exam5apVariant =
				opts.variant === 'cinq_mock' || opts.variant === 'competency_eval'
					? opts.variant
					: 'trimester_exam';
			return assemble5apExam({
				trimesterId: opts.trimesterId,
				seed: opts.seed,
				difficulty: opts.difficulty,
				variant,
				academicYear: opts.academicYear,
				schoolName: opts.schoolName
			});
		}
		case '2am':
			return assemble2amExam({
				trimesterId: opts.trimesterId,
				seed: opts.seed,
				docType: opts.docType === 'test' || opts.variant === 'supervised_test' ? 'test' : 'exam',
				difficulty: opts.difficulty,
				academicYear: opts.academicYear,
				schoolName: opts.schoolName
			});
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
