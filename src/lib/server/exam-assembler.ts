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
import {
	assemblePhysicsMiddleExam,
	type AssembledPhysicsMiddlePaper,
	type PhysicsMiddleVariant
} from './assemblers/exam-physics-middle';
import {
	assemblePhysicsSecondaryExam,
	type AssembledPhysicsSecondaryPaper,
	type PhysicsSecondaryVariant
} from './assemblers/exam-physics-secondary';
import {
	assembleSciencesPrimaryExam,
	type AssembledSciencesPrimaryPaper,
	type SciencesPrimaryVariant
} from './assemblers/exam-sciences-primary';
import {
	assembleSciencesMiddleExam,
	type AssembledSciencesMiddlePaper,
	type SciencesMiddleVariant
} from './assemblers/exam-sciences-middle';
import {
	assembleSciencesSecondaryExam,
	type AssembledSciencesSecondaryPaper,
	type SciencesSecondaryVariant
} from './assemblers/exam-sciences-secondary';
import {
	assembleArabicPrimaryExam,
	type AssembledArabicPrimaryPaper,
	type ArabicPrimaryVariant
} from './assemblers/exam-arabic-primary';
import {
	assembleArabicMiddleExam,
	type AssembledArabicMiddlePaper,
	type ArabicMiddleVariant
} from './assemblers/exam-arabic-middle';
import {
	assembleArabicSecondaryExam,
	type AssembledArabicSecondaryPaper,
	type ArabicSecondaryVariant
} from './assemblers/exam-arabic-secondary';
import {
	assembleEnglishPrimaryExam,
	type AssembledEnglishPrimaryPaper,
	type EnglishPrimaryVariant
} from './assemblers/exam-english-primary';
import {
	assembleEnglishMiddleExam,
	type AssembledEnglishMiddlePaper,
	type EnglishMiddleVariant
} from './assemblers/exam-english-middle';
import {
	assembleEnglishSecondaryExam,
	type AssembledEnglishSecondaryPaper,
	type EnglishSecondaryVariant
} from './assemblers/exam-english-secondary';
import {
	assembleFrenchPrimaryExam,
	type AssembledFrenchPrimaryPaper,
	type FrenchPrimaryVariant
} from './assemblers/exam-french-primary';
import {
	assembleFrenchMiddleExam,
	type AssembledFrenchMiddlePaper,
	type FrenchMiddleVariant
} from './assemblers/exam-french-middle';
import {
	assembleFrenchSecondaryExam,
	type AssembledFrenchSecondaryPaper,
	type FrenchSecondaryVariant
} from './assemblers/exam-french-secondary';
import {
	assembleIslamicPaper,
	type AssembledIslamicPaper,
	type AssembleIslamicOptions,
	type IslamicExamVariant
} from './assemblers/exam-islamic';
import {
	assembleHistoryPaper,
	yearSubjectToHistoryTrack,
	type AssembledHistoryPaper,
	type AssembleHistoryOptions,
	type HistoryExamVariant
} from './assemblers/exam-history';
import {
	assembleSpanishExam,
	yearSubjectToSpanishTrack,
	type AssembledSpanishPaper,
	type AssembleSpanishOptions,
	type SpanishExamVariant
} from './assemblers/exam-spanish';
import {
	assembleGermanExam,
	yearSubjectToGermanTrack,
	type AssembledGermanPaper,
	type AssembleGermanOptions,
	type GermanExamVariant
} from './assemblers/exam-german';
import {
	assembleItalianExam,
	yearSubjectToItalianTrack,
	type AssembledItalianPaper,
	type AssembleItalianOptions,
	type ItalianExamVariant
} from './assemblers/exam-italian';
import { compileTypstPdf } from './typst';
import {
	SECONDARY_TRACK_IDS,
	type Difficulty,
	type GradeId,
	type SecondaryTrackId
} from '../modules/MathTemplates/types';
import type { PhysicsTrackId } from '../modules/PhysicsTemplates/types';
import type { SciencesTrackId } from '../modules/SciencesTemplates/types';
import type { ArabicTrackId } from '../modules/ArabicTemplates/types';
import type { EnglishTrackId } from '../modules/EnglishTemplates/types';
import type { FrenchTrackId } from '../modules/FrenchTemplates/types';
import type { IslamicTrackId } from '../modules/IslamicTemplates/types';
import type { TrimesterId } from '../modules/SujetBuilder/types';

export type UnifiedAssembledExam =
	| AssembledPrimaryLowerPaper
	| AssembledPrimaryUpperPaper
	| AssembledMiddlePaper
	| AssembledSecondaryPaper;

export type UnifiedAssembledPhysicsExam =
	| AssembledPhysicsMiddlePaper
	| AssembledPhysicsSecondaryPaper;

export type UnifiedAssembledSciencesExam =
	| AssembledSciencesPrimaryPaper
	| AssembledSciencesMiddlePaper
	| AssembledSciencesSecondaryPaper;

export type UnifiedAssembledArabicExam =
	| AssembledArabicPrimaryPaper
	| AssembledArabicMiddlePaper
	| AssembledArabicSecondaryPaper;

export type UnifiedAssembledEnglishExam =
	| AssembledEnglishPrimaryPaper
	| AssembledEnglishMiddlePaper
	| AssembledEnglishSecondaryPaper;

export type UnifiedAssembledFrenchExam =
	| AssembledFrenchPrimaryPaper
	| AssembledFrenchMiddlePaper
	| AssembledFrenchSecondaryPaper;

export type UnifiedAssembledIslamicExam = AssembledIslamicPaper;

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
	paper:
		| UnifiedAssembledExam
		| UnifiedAssembledPhysicsExam
		| UnifiedAssembledSciencesExam
		| UnifiedAssembledArabicExam
		| UnifiedAssembledEnglishExam
		| UnifiedAssembledFrenchExam
		| UnifiedAssembledIslamicExam,
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

const PHYSICS_MIDDLE_SET: ReadonlySet<string> = new Set(['1am', '2am', '3am', '4am']);

export function yearSubjectToPhysicsTrack(
	yearId: string,
	subjectId: string,
	streamId?: string | null
): PhysicsTrackId | null {
	if (subjectId === 'PHY-B' && PHYSICS_MIDDLE_SET.has(yearId)) {
		return yearId as PhysicsTrackId;
	}
	if (yearId === '1as' && subjectId === 'PHY-SE') {
		if (!streamId || streamId === 'TCST' || streamId === 'tcst' || streamId === 'GEN') {
			return '1as_tcst';
		}
	}
	if (yearId === '2as') {
		if (subjectId === 'PHY-SE') return '2as_se';
		if (subjectId === 'PHY-MTM') {
			if (streamId === 'TM') return '2as_tm';
			if (streamId === 'MATH') return '2as_math';
		}
	}
	if (yearId === '3as') {
		if (subjectId === 'PHY-SE') return '3as_se';
		if (subjectId === 'PHY-MTM') {
			if (streamId === 'TM') return '3as_tm';
			if (streamId === 'MATH') return '3as_math';
		}
	}
	return null;
}

export interface AssemblePhysicsExamOptions {
	grade: PhysicsTrackId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	variant?: 'trimester_exam' | 'supervised_test' | 'bem_mock' | 'bac_mock';
	difficulty?: Difficulty;
	academicYear?: string;
	schoolName?: string;
}

export function assemblePhysicsExam(
	opts: AssemblePhysicsExamOptions
): UnifiedAssembledPhysicsExam {
	switch (opts.grade) {
		case '1am':
		case '2am':
		case '3am':
		case '4am': {
			let variant: PhysicsMiddleVariant;
			if (opts.grade === '4am' && opts.variant === 'bem_mock') {
				variant = 'bem_mock';
			} else if (opts.docType === 'test' || opts.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assemblePhysicsMiddleExam({
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
		case '1as_tcst':
		case '2as_se':
		case '2as_tm':
		case '2as_math':
		case '3as_se':
		case '3as_tm':
		case '3as_math': {
			let variant: PhysicsSecondaryVariant;
			if (opts.variant === 'bac_mock' && opts.grade.startsWith('3as_')) {
				variant = 'bac_mock';
			} else if (opts.docType === 'test' || opts.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assemblePhysicsSecondaryExam({
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
	}
}

const SCIENCES_PRIMARY_SET: ReadonlySet<string> = new Set(['1ap', '2ap', '3ap', '4ap', '5ap']);
const SCIENCES_MIDDLE_SET: ReadonlySet<string> = new Set(['1am', '2am', '3am', '4am']);

export function yearSubjectToSciencesTrack(
	yearId: string,
	subjectId: string,
	streamId?: string | null
): SciencesTrackId | null {
	if (subjectId === 'SCI-B' && SCIENCES_PRIMARY_SET.has(yearId)) {
		return yearId as SciencesTrackId;
	}
	if (subjectId === 'SCI-B' && SCIENCES_MIDDLE_SET.has(yearId)) {
		return yearId as SciencesTrackId;
	}
	if (yearId === '1as' && subjectId === 'SCI-SE') {
		if (!streamId || streamId === 'TCST' || streamId === 'tcst' || streamId === 'GEN') {
			return '1as_tcst';
		}
	}
	if (yearId === '2as') {
		if (subjectId === 'SCI-SE') return '2as_se';
		if (subjectId === 'SCI-MATH') return '2as_math';
	}
	if (yearId === '3as') {
		if (subjectId === 'SCI-SE') return '3as_se';
		if (subjectId === 'SCI-MATH') return '3as_math';
	}
	return null;
}

export interface AssembleSciencesExamOptions {
	grade: SciencesTrackId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	variant?: 'trimester_exam' | 'supervised_test' | 'competency_eval' | 'bem_mock' | 'bac_mock';
	difficulty?: Difficulty;
	academicYear?: string;
	schoolName?: string;
}

export function assembleSciencesExam(
	opts: AssembleSciencesExamOptions
): UnifiedAssembledSciencesExam {
	switch (opts.grade) {
		case '1ap':
		case '2ap':
		case '3ap':
		case '4ap':
		case '5ap': {
			let variant: SciencesPrimaryVariant;
			if (opts.grade === '5ap' && opts.variant === 'competency_eval') {
				variant = 'competency_eval';
			} else if (opts.docType === 'test' || opts.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assembleSciencesPrimaryExam({
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
		case '1am':
		case '2am':
		case '3am':
		case '4am': {
			let variant: SciencesMiddleVariant;
			if (opts.grade === '4am' && opts.variant === 'bem_mock') {
				variant = 'bem_mock';
			} else if (opts.docType === 'test' || opts.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assembleSciencesMiddleExam({
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
		case '1as_tcst':
		case '2as_se':
		case '2as_math':
		case '3as_se':
		case '3as_math': {
			let variant: SciencesSecondaryVariant;
			if (opts.variant === 'bac_mock' && opts.grade.startsWith('3as_')) {
				variant = 'bac_mock';
			} else if (opts.docType === 'test' || opts.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assembleSciencesSecondaryExam({
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
	}
}

const ARABIC_PRIMARY_SET: ReadonlySet<string> = new Set(['1ap', '2ap', '3ap', '4ap', '5ap']);
const ARABIC_MIDDLE_SET: ReadonlySet<string> = new Set(['1am', '2am', '3am', '4am']);

export function yearSubjectToArabicTrack(
	yearId: string,
	subjectId: string,
	streamId?: string | null
): ArabicTrackId | null {
	if (subjectId === 'ARB-B' && ARABIC_PRIMARY_SET.has(yearId)) {
		return yearId as ArabicTrackId;
	}
	if (subjectId === 'ARB-B' && ARABIC_MIDDLE_SET.has(yearId)) {
		return yearId as ArabicTrackId;
	}
	if (yearId === '1as') {
		if (subjectId === 'ARB-SCI') return '1as_tcst';
		if (subjectId === 'ARB-LP') return '1as_tcl';
	}
	if (yearId === '2as') {
		if (subjectId === 'ARB-LP') return '2as_lp';
		if (subjectId === 'ARB-LE') return '2as_le';
		if (subjectId === 'ARB-SCI') {
			const s = (streamId || '').toUpperCase();
			if (s === 'TM') return '2as_tm';
			if (s === 'MATH') return '2as_math';
			if (s === 'GE') return '2as_ge';
			return '2as_se';
		}
	}
	if (yearId === '3as') {
		if (subjectId === 'ARB-LP') return '3as_lp';
		if (subjectId === 'ARB-LE') return '3as_le';
		if (subjectId === 'ARB-SCI') {
			const s = (streamId || '').toUpperCase();
			if (s === 'TM') return '3as_tm';
			if (s === 'MATH') return '3as_math';
			if (s === 'GE') return '3as_ge';
			return '3as_se';
		}
	}
	return null;
}

export interface AssembleArabicExamOptions {
	grade: ArabicTrackId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	variant?: 'trimester_exam' | 'supervised_test' | 'competency_eval' | 'bem_mock' | 'bac_mock';
	difficulty?: Difficulty;
	academicYear?: string;
	schoolName?: string;
	topicNumber?: 1 | 2;
}

export function assembleArabicExam(opts: AssembleArabicExamOptions): UnifiedAssembledArabicExam {
	switch (opts.grade) {
		case '1ap':
		case '2ap':
		case '3ap':
		case '4ap':
		case '5ap': {
			let variant: ArabicPrimaryVariant;
			if (opts.grade === '5ap' && opts.variant === 'competency_eval') {
				variant = 'competency_eval';
			} else if (opts.docType === 'test' || opts.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assembleArabicPrimaryExam({
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
		case '1am':
		case '2am':
		case '3am':
		case '4am': {
			let variant: ArabicMiddleVariant;
			if (opts.grade === '4am' && opts.variant === 'bem_mock') {
				variant = 'bem_mock';
			} else if (opts.docType === 'test' || opts.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assembleArabicMiddleExam({
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
			let variant: ArabicSecondaryVariant;
			if (opts.variant === 'bac_mock' && opts.grade.startsWith('3as_')) {
				variant = 'bac_mock';
			} else if (opts.docType === 'test' || opts.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assembleArabicSecondaryExam({
				grade: opts.grade,
				trimesterId: opts.trimesterId,
				seed: opts.seed,
				docType: opts.docType,
				variant,
				difficulty: opts.difficulty,
				academicYear: opts.academicYear,
				schoolName: opts.schoolName,
				topicNumber: opts.topicNumber
			});
		}
	}
}

const ENGLISH_PRIMARY_SET: ReadonlySet<string> = new Set(['3ap', '4ap', '5ap']);
const ENGLISH_MIDDLE_SET: ReadonlySet<string> = new Set(['1am', '2am', '3am', '4am']);

export function yearSubjectToEnglishTrack(
	yearId: string,
	subjectId: string,
	streamId?: string | null
): EnglishTrackId | null {
	if (subjectId === 'ENG-B' && ENGLISH_PRIMARY_SET.has(yearId)) {
		return yearId as EnglishTrackId;
	}
	if (subjectId === 'ENG-B' && ENGLISH_MIDDLE_SET.has(yearId)) {
		return yearId as EnglishTrackId;
	}
	if (subjectId === 'ENG-SEC') {
		const s = (streamId || '').toUpperCase();
		if (yearId === '1as') {
			return s === 'TCL' ? '1as_tcl' : '1as_tcst';
		}
		if (yearId === '2as') {
			if (s === 'TM') return '2as_tm';
			if (s === 'MATH') return '2as_math';
			if (s === 'GE') return '2as_ge';
			if (s === 'LP') return '2as_lp';
			if (s === 'LE') return '2as_le';
			return '2as_se';
		}
		if (yearId === '3as') {
			if (s === 'TM') return '3as_tm';
			if (s === 'MATH') return '3as_math';
			if (s === 'GE') return '3as_ge';
			if (s === 'LP') return '3as_lp';
			if (s === 'LE') return '3as_le';
			return '3as_se';
		}
	}
	return null;
}

export interface AssembleEnglishExamOptions {
	grade: EnglishTrackId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	variant?: 'trimester_exam' | 'supervised_test' | 'competency_eval' | 'bem_mock' | 'bac_mock';
	difficulty?: Difficulty;
	academicYear?: string;
	schoolName?: string;
	topicNumber?: 1 | 2;
}

export function assembleEnglishExam(opts: AssembleEnglishExamOptions): UnifiedAssembledEnglishExam {
	switch (opts.grade) {
		case '3ap':
		case '4ap':
		case '5ap': {
			let variant: EnglishPrimaryVariant;
			if (opts.grade === '5ap' && opts.variant === 'competency_eval') {
				variant = 'competency_eval';
			} else if (opts.docType === 'test' || opts.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assembleEnglishPrimaryExam({
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
		case '1am':
		case '2am':
		case '3am':
		case '4am': {
			let variant: EnglishMiddleVariant;
			if (opts.grade === '4am' && opts.variant === 'bem_mock') {
				variant = 'bem_mock';
			} else if (opts.docType === 'test' || opts.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assembleEnglishMiddleExam({
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
			if (opts.variant === 'bac_mock' && opts.grade.startsWith('3as_')) {
				variant = 'bac_mock';
			} else if (opts.docType === 'test' || opts.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assembleEnglishSecondaryExam({
				grade: opts.grade,
				trimesterId: opts.trimesterId,
				seed: opts.seed,
				docType: opts.docType,
				variant,
				difficulty: opts.difficulty,
				academicYear: opts.academicYear,
				schoolName: opts.schoolName,
				topicNumber: opts.topicNumber
			});
		}
	}
}

const FRENCH_PRIMARY_SET: ReadonlySet<string> = new Set(['3ap', '4ap', '5ap']);
const FRENCH_MIDDLE_SET: ReadonlySet<string> = new Set(['1am', '2am', '3am', '4am']);

export function yearSubjectToFrenchTrack(
	yearId: string,
	subjectId: string,
	streamId?: string | null
): FrenchTrackId | null {
	if (subjectId === 'FRE-B' && FRENCH_PRIMARY_SET.has(yearId)) {
		return yearId as FrenchTrackId;
	}
	if (subjectId === 'FRE-B' && FRENCH_MIDDLE_SET.has(yearId)) {
		return yearId as FrenchTrackId;
	}
	if (subjectId === 'FRE-SEC') {
		const s = (streamId || '').toUpperCase();
		if (yearId === '1as') {
			return s === 'TCL' ? '1as_tcl' : '1as_tcst';
		}
		if (yearId === '2as') {
			if (s === 'TM') return '2as_tm';
			if (s === 'MATH') return '2as_math';
			if (s === 'GE') return '2as_ge';
			if (s === 'LP') return '2as_lp';
			if (s === 'LE') return '2as_le';
			return '2as_se';
		}
		if (yearId === '3as') {
			if (s === 'TM') return '3as_tm';
			if (s === 'MATH') return '3as_math';
			if (s === 'GE') return '3as_ge';
			if (s === 'LP') return '3as_lp';
			if (s === 'LE') return '3as_le';
			return '3as_se';
		}
	}
	return null;
}

export interface AssembleFrenchExamOptions {
	grade: FrenchTrackId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	variant?: 'trimester_exam' | 'supervised_test' | 'competency_eval' | 'bem_mock' | 'bac_mock';
	difficulty?: Difficulty;
	academicYear?: string;
	schoolName?: string;
	topicNumber?: 1 | 2;
}

export function assembleFrenchExam(opts: AssembleFrenchExamOptions): UnifiedAssembledFrenchExam {
	switch (opts.grade) {
		case '3ap':
		case '4ap':
		case '5ap': {
			let variant: FrenchPrimaryVariant;
			if (opts.grade === '5ap' && opts.variant === 'competency_eval') {
				variant = 'competency_eval';
			} else if (opts.docType === 'test' || opts.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assembleFrenchPrimaryExam({
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
		case '1am':
		case '2am':
		case '3am':
		case '4am': {
			let variant: FrenchMiddleVariant;
			if (opts.grade === '4am' && opts.variant === 'bem_mock') {
				variant = 'bem_mock';
			} else if (opts.docType === 'test' || opts.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assembleFrenchMiddleExam({
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
			let variant: FrenchSecondaryVariant;
			if (opts.variant === 'bac_mock' && opts.grade.startsWith('3as_')) {
				variant = 'bac_mock';
			} else if (opts.docType === 'test' || opts.variant === 'supervised_test') {
				variant = 'supervised_test';
			} else {
				variant = 'trimester_exam';
			}
			return assembleFrenchSecondaryExam({
				grade: opts.grade,
				trimesterId: opts.trimesterId,
				seed: opts.seed,
				docType: opts.docType,
				variant,
				difficulty: opts.difficulty,
				academicYear: opts.academicYear,
				schoolName: opts.schoolName,
				topicNumber: opts.topicNumber
			});
		}
	}
}

const ISLAMIC_BASIC_SET: ReadonlySet<string> = new Set([
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

export function yearSubjectToIslamicTrack(
	yearId: string,
	subjectId: string,
	streamId?: string | null
): IslamicTrackId | null {
	if (subjectId === 'ISL-B' && ISLAMIC_BASIC_SET.has(yearId)) {
		return yearId as IslamicTrackId;
	}
	if (subjectId === 'ISL-ALL') {
		const s = (streamId || '').toUpperCase();
		if (yearId === '1as') {
			return s === 'TCL' ? '1as_tcl' : '1as_tcst';
		}
		if (yearId === '2as') {
			if (s === 'TM') return '2as_tm';
			if (s === 'MATH') return '2as_math';
			if (s === 'GE') return '2as_ge';
			if (s === 'LP') return '2as_lp';
			if (s === 'LE') return '2as_le';
			return '2as_se';
		}
		if (yearId === '3as') {
			if (s === 'TM') return '3as_tm';
			if (s === 'MATH') return '3as_math';
			if (s === 'GE') return '3as_ge';
			if (s === 'LP') return '3as_lp';
			if (s === 'LE') return '3as_le';
			return '3as_se';
		}
	}
	return null;
}

export type AssembleIslamicExamOptions = AssembleIslamicOptions;
export type { IslamicExamVariant };

export function assembleIslamicExam(
	opts: AssembleIslamicExamOptions
): UnifiedAssembledIslamicExam {
	return assembleIslamicPaper(opts);
}

export type UnifiedAssembledHistoryExam = AssembledHistoryPaper;
export type AssembleHistoryExamOptions = AssembleHistoryOptions;
export type { HistoryExamVariant };
export { yearSubjectToHistoryTrack };

export function assembleHistoryExam(
	opts: AssembleHistoryExamOptions
): UnifiedAssembledHistoryExam {
	return assembleHistoryPaper(opts);
}

export type UnifiedAssembledSpanishExam = AssembledSpanishPaper;
export type AssembleSpanishExamOptions = AssembleSpanishOptions;
export type { SpanishExamVariant };
export { assembleSpanishExam, yearSubjectToSpanishTrack };

export type UnifiedAssembledGermanExam = AssembledGermanPaper;
export type AssembleGermanExamOptions = AssembleGermanOptions;
export type { GermanExamVariant };
export { assembleGermanExam, yearSubjectToGermanTrack };

export type UnifiedAssembledItalianExam = AssembledItalianPaper;
export type AssembleItalianExamOptions = AssembleItalianOptions;
export type { ItalianExamVariant };
export { assembleItalianExam, yearSubjectToItalianTrack };
