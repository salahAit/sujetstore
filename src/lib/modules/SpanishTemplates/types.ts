import type { ExerciseBlock, LevelId, TrimesterId } from '../SujetBuilder/types';
import type {
	Difficulty,
	LessonDiscoverStep,
	LessonPracticeQuestion,
	QuizQuestionPayload
} from '../MathTemplates/types';

export type { Difficulty, LessonDiscoverStep, LessonPracticeQuestion, QuizQuestionPayload };

/** In Algeria, Spanish (`LAN-SPA`) is taught in 2AS and 3AS Foreign Languages (`LE`). */
export type SpanishTrackId = '2as_le' | '3as_le';

export type SpanishYearSubjectId =
	| 782 // 2as LAN-SPA LE
	| 793; // 3as LAN-SPA LE (BAC)

export type SpanishDomain =
	| 'comprension_lectora'
	| 'lexico_morfologia'
	| 'gramatica_sintaxis'
	| 'conjugacion_modos'
	| 'cultura_civilizacion'
	| 'expresion_escrita';

/**
 * Official Algerian Spanish ONEC exam structural roles (20 pts):
 * - Exam / BAC (`7 + 7 + 6 = 20 pts`):
 *   `comprehension` (7 pts) + `linguistic_competence` (7 pts) + `written_expression` (6 pts)
 * - Supervised Test (`10 + 10 = 20 pts`):
 *   `comprehension` (10 pts) + `linguistic_competence` (10 pts)
 */
export type SpanishExamRole =
	| 'comprehension'
	| 'linguistic_competence'
	| 'written_expression';

export interface SpanishGradeMeta {
	grade: SpanishTrackId;
	levelId: LevelId;
	yearId: '2as' | '3as';
	yearNameAr: string;
	yearNameEs: string;
	subjectId: 'LAN-SPA';
	subjectNameAr: 'اللغة الإسبانية';
	subjectNameEs: 'Lengua Española';
	yearSubjectId: SpanishYearSubjectId;
	streamId: 'LE';
	streamNameAr: 'لغات أجنبية';
	streamNameEs: 'Lenguas Extranjeras';
	coefficient: 4;
	examDurationEs: string;
	pointsSplit: readonly [7, 7, 6];
}

export const SPANISH_GRADE_METADATA: Record<SpanishTrackId, SpanishGradeMeta> = {
	'2as_le': {
		grade: '2as_le',
		levelId: 'secondaire',
		yearId: '2as',
		yearNameAr: 'السنة الثانية ثانوي — لغات أجنبية',
		yearNameEs: '2º Año de Secundaria (2AS)',
		subjectId: 'LAN-SPA',
		subjectNameAr: 'اللغة الإسبانية',
		subjectNameEs: 'Lengua Española',
		yearSubjectId: 782,
		streamId: 'LE',
		streamNameAr: 'لغات أجنبية',
		streamNameEs: 'Lenguas Extranjeras',
		coefficient: 4,
		examDurationEs: '02 h 00',
		pointsSplit: [7, 7, 6]
	},
	'3as_le': {
		grade: '3as_le',
		levelId: 'secondaire',
		yearId: '3as',
		yearNameAr: 'السنة الثالثة ثانوي — لغات أجنبية (BAC)',
		yearNameEs: '3º Año de Secundaria (3AS / BAC)',
		subjectId: 'LAN-SPA',
		subjectNameAr: 'اللغة الإسبانية',
		subjectNameEs: 'Lengua Española',
		yearSubjectId: 793,
		streamId: 'LE',
		streamNameAr: 'لغات أجنبية',
		streamNameEs: 'Lenguas Extranjeras',
		coefficient: 4,
		examDurationEs: '03 h 00',
		pointsSplit: [7, 7, 6]
	}
};

export const ALL_SPANISH_TRACK_IDS: readonly SpanishTrackId[] = ['2as_le', '3as_le'];

export interface SpanishInteractiveLessonData {
	id: string;
	slug: string;
	grade: SpanishTrackId;
	yearSubjectId: SpanishYearSubjectId;
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

export interface SpanishGeneratedExerciseInstance {
	templateId: string;
	seed: number;
	grade: SpanishTrackId;
	trimesterId: TrimesterId;
	difficulty: Difficulty;
	domain: SpanishDomain;
	examRole: SpanishExamRole;
	titleAr: string;
	quizQuestion: QuizQuestionPayload;
	sujetExercise: ExerciseBlock;
	hints: [string, string, string];
	solutionStepsAr: string[];
	finalAnswer: string;
}

export interface SpanishParameterizedTemplate {
	id: string;
	grade: SpanishTrackId;
	trimesterId: TrimesterId;
	domain: SpanishDomain;
	examRole: SpanishExamRole;
	titleAr: string;
	curriculumLessonId?: string;
	defaultPoints: number;
	isIntegration?: boolean;
	generate(seed: number, difficulty?: Difficulty): SpanishGeneratedExerciseInstance;
}
