import type { ExerciseBlock, LevelId, TrimesterId } from '../SujetBuilder/types';
import type {
	Difficulty,
	LessonDiscoverStep,
	LessonPracticeQuestion,
	QuizQuestionPayload
} from '../MathTemplates/types';

export type { Difficulty, LessonDiscoverStep, LessonPracticeQuestion, QuizQuestionPayload };

/** In Algeria, Italian (`LAN-ITA`) is taught in 2AS and 3AS Foreign Languages (`LE`). */
export type ItalianTrackId = '2as_le' | '3as_le';

export type ItalianYearSubjectId =
	| 784 // 2as LAN-ITA LE
	| 795; // 3as LAN-ITA LE (BAC)

export type ItalianDomain =
	| 'comprensione_testo'
	| 'lessico_morfologia'
	| 'grammatica_sintassi'
	| 'coniugazione_modi'
	| 'cultura_civilta'
	| 'produzione_scritta';

/**
 * Official Algerian Italian ONEC exam structural roles (20 punti):
 * - Exam / BAC (`7 + 7 + 6 = 20 punti`):
 *   `comprehension` (7 pti) + `linguistic_competence` (7 pti) + `written_expression` (6 pti)
 * - Supervised Test (`10 + 10 = 20 punti`):
 *   `comprehension` (10 pti) + `linguistic_competence` (10 pti)
 */
export type ItalianExamRole =
	| 'comprehension'
	| 'linguistic_competence'
	| 'written_expression';

export interface ItalianGradeMeta {
	grade: ItalianTrackId;
	levelId: LevelId;
	yearId: '2as' | '3as';
	yearNameAr: string;
	yearNameIt: string;
	subjectId: 'LAN-ITA';
	subjectNameAr: 'اللغة الإيطالية';
	subjectNameIt: 'Lingua Italiana';
	yearSubjectId: ItalianYearSubjectId;
	streamId: 'LE';
	streamNameAr: 'لغات أجنبية';
	streamNameIt: 'Lingue Straniere';
	coefficient: 4;
	examDurationIt: string;
	pointsSplit: readonly [7, 7, 6];
}

export const ITALIAN_GRADE_METADATA: Record<ItalianTrackId, ItalianGradeMeta> = {
	'2as_le': {
		grade: '2as_le',
		levelId: 'secondaire',
		yearId: '2as',
		yearNameAr: 'السنة الثانية ثانوي — لغات أجنبية',
		yearNameIt: '2º Anno di Scuola Secondaria (2AS)',
		subjectId: 'LAN-ITA',
		subjectNameAr: 'اللغة الإيطالية',
		subjectNameIt: 'Lingua Italiana',
		yearSubjectId: 784,
		streamId: 'LE',
		streamNameAr: 'لغات أجنبية',
		streamNameIt: 'Lingue Straniere',
		coefficient: 4,
		examDurationIt: '02 h 00',
		pointsSplit: [7, 7, 6]
	},
	'3as_le': {
		grade: '3as_le',
		levelId: 'secondaire',
		yearId: '3as',
		yearNameAr: 'السنة الثالثة ثانوي — لغات أجنبية (BAC)',
		yearNameIt: '3º Anno di Scuola Secondaria (3AS / BAC)',
		subjectId: 'LAN-ITA',
		subjectNameAr: 'اللغة الإيطالية',
		subjectNameIt: 'Lingua Italiana',
		yearSubjectId: 795,
		streamId: 'LE',
		streamNameAr: 'لغات أجنبية',
		streamNameIt: 'Lingue Straniere',
		coefficient: 4,
		examDurationIt: '03 h 00',
		pointsSplit: [7, 7, 6]
	}
};

export const ALL_ITALIAN_TRACK_IDS: readonly ItalianTrackId[] = ['2as_le', '3as_le'];

export interface ItalianInteractiveLessonData {
	id: string;
	slug: string;
	grade: ItalianTrackId;
	yearSubjectId: ItalianYearSubjectId;
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

export interface ItalianGeneratedExerciseInstance {
	templateId: string;
	seed: number;
	grade: ItalianTrackId;
	trimesterId: TrimesterId;
	difficulty: Difficulty;
	domain: ItalianDomain;
	examRole: ItalianExamRole;
	titleAr: string;
	quizQuestion: QuizQuestionPayload;
	sujetExercise: ExerciseBlock;
	hints: [string, string, string];
	solutionStepsAr: string[];
	finalAnswer: string;
}

export interface ItalianParameterizedTemplate {
	id: string;
	grade: ItalianTrackId;
	trimesterId: TrimesterId;
	domain: ItalianDomain;
	examRole: ItalianExamRole;
	titleAr: string;
	curriculumLessonId?: string;
	defaultPoints: number;
	isIntegration?: boolean;
	generate(seed: number, difficulty?: Difficulty): ItalianGeneratedExerciseInstance;
}
