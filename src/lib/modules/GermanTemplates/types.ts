import type { ExerciseBlock, LevelId, TrimesterId } from '../SujetBuilder/types';
import type {
	Difficulty,
	LessonDiscoverStep,
	LessonPracticeQuestion,
	QuizQuestionPayload
} from '../MathTemplates/types';

export type { Difficulty, LessonDiscoverStep, LessonPracticeQuestion, QuizQuestionPayload };

/** In Algeria, German (`LAN-GER`) is taught in 2AS and 3AS Foreign Languages (`LE`). */
export type GermanTrackId = '2as_le' | '3as_le';

export type GermanYearSubjectId =
	| 783 // 2as LAN-GER LE
	| 794; // 3as LAN-GER LE (BAC)

export type GermanDomain =
	| 'textverstaendnis'
	| 'wortschatz_wortbildung'
	| 'grammatik_syntax'
	| 'verben_zeiten'
	| 'kultur_landeskunde'
	| 'schriftlicher_ausdruck';

/**
 * Official Algerian German ONEC exam structural roles (20 Pkt.):
 * - Exam / BAC (`7 + 7 + 6 = 20 Punkte`):
 *   `comprehension` (7 Pkt.) + `linguistic_competence` (7 Pkt.) + `written_expression` (6 Pkt.)
 * - Supervised Test (`10 + 10 = 20 Punkte`):
 *   `comprehension` (10 Pkt.) + `linguistic_competence` (10 Pkt.)
 */
export type GermanExamRole =
	| 'comprehension'
	| 'linguistic_competence'
	| 'written_expression';

export interface GermanGradeMeta {
	grade: GermanTrackId;
	levelId: LevelId;
	yearId: '2as' | '3as';
	yearNameAr: string;
	yearNameDe: string;
	subjectId: 'LAN-GER';
	subjectNameAr: 'اللغة الألمانية';
	subjectNameDe: 'Deutsch';
	yearSubjectId: GermanYearSubjectId;
	streamId: 'LE';
	streamNameAr: 'لغات أجنبية';
	streamNameDe: 'Fremdsprachen';
	coefficient: 4;
	examDurationDe: string;
	pointsSplit: readonly [7, 7, 6];
}

export const GERMAN_GRADE_METADATA: Record<GermanTrackId, GermanGradeMeta> = {
	'2as_le': {
		grade: '2as_le',
		levelId: 'secondaire',
		yearId: '2as',
		yearNameAr: 'السنة الثانية ثانوي — لغات أجنبية',
		yearNameDe: '2. Jahr des Gymnasiums (2AS)',
		subjectId: 'LAN-GER',
		subjectNameAr: 'اللغة الألمانية',
		subjectNameDe: 'Deutsch',
		yearSubjectId: 783,
		streamId: 'LE',
		streamNameAr: 'لغات أجنبية',
		streamNameDe: 'Fremdsprachen',
		coefficient: 4,
		examDurationDe: '02 Std. 00',
		pointsSplit: [7, 7, 6]
	},
	'3as_le': {
		grade: '3as_le',
		levelId: 'secondaire',
		yearId: '3as',
		yearNameAr: 'السنة الثالثة ثانوي — لغات أجنبية (BAC)',
		yearNameDe: '3. Jahr des Gymnasiums (3AS / BAC)',
		subjectId: 'LAN-GER',
		subjectNameAr: 'اللغة الألمانية',
		subjectNameDe: 'Deutsch',
		yearSubjectId: 794,
		streamId: 'LE',
		streamNameAr: 'لغات أجنبية',
		streamNameDe: 'Fremdsprachen',
		coefficient: 4,
		examDurationDe: '03 Std. 00',
		pointsSplit: [7, 7, 6]
	}
};

export const ALL_GERMAN_TRACK_IDS: readonly GermanTrackId[] = ['2as_le', '3as_le'];

export interface GermanInteractiveLessonData {
	id: string;
	slug: string;
	grade: GermanTrackId;
	yearSubjectId: GermanYearSubjectId;
	trimesterId: TrimesterId;
	sequenceId: string;
	sequenceTitleAr: string;
	order: number;
	titleAr: string;
	objectives: string[];
	keywordsAr?: string[];
	discover: {
		scenarioAr: string;
		svg?: string;
		steps: LessonDiscoverStep[];
	};
	summary: {
		rulesAr: string[];
		visualSvg?: string;
		visualCaptionAr?: string;
		examples: { problemAr: string; solutionAr: string }[];
		watchOutAr?: string;
	};
	practice: LessonPracticeQuestion[];
}

export interface GermanGeneratedExerciseInstance {
	templateId: string;
	seed: number;
	grade: GermanTrackId;
	trimesterId: TrimesterId;
	difficulty: Difficulty;
	domain: GermanDomain;
	examRole: GermanExamRole;
	titleAr: string;
	quizQuestion: QuizQuestionPayload;
	sujetExercise: ExerciseBlock;
	hints: [string, string, string];
	solutionStepsAr: string[];
	finalAnswer: string;
}

export interface GermanParameterizedTemplate {
	id: string;
	grade: GermanTrackId;
	trimesterId: TrimesterId;
	domain: GermanDomain;
	examRole: GermanExamRole;
	titleAr: string;
	curriculumLessonId?: string;
	defaultPoints: number;
	isIntegration?: boolean;
	generate(seed: number, difficulty?: Difficulty): GermanGeneratedExerciseInstance;
}
