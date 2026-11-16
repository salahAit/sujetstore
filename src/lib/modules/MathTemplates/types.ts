import type { ExerciseBlock, LevelId, TrimesterId } from '../SujetBuilder/types';

export type GradeId = '2ap' | '5ap' | '2am';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type MathDomain = 'numeric' | 'geometry' | 'measurement' | 'proportionality' | 'integration';

export interface GradeMeta {
	grade: GradeId;
	levelId: LevelId;
	yearId: string;
	yearName: string;
	subjectId: 'MAT-B';
	subjectName: 'الرياضيات';
	yearSubjectId: 586 | 606 | 624;
}

export const GRADE_METADATA: Record<GradeId, GradeMeta> = {
	'2ap': {
		grade: '2ap',
		levelId: 'primaire',
		yearId: '2ap',
		yearName: 'السنة الثانية ابتدائي',
		subjectId: 'MAT-B',
		subjectName: 'الرياضيات',
		yearSubjectId: 586
	},
	'5ap': {
		grade: '5ap',
		levelId: 'primaire',
		yearId: '5ap',
		yearName: 'السنة الخامسة ابتدائي',
		subjectId: 'MAT-B',
		subjectName: 'الرياضيات',
		yearSubjectId: 606
	},
	'2am': {
		grade: '2am',
		levelId: 'moyen',
		yearId: '2am',
		yearName: 'السنة الثانية متوسط',
		subjectId: 'MAT-B',
		subjectName: 'الرياضيات',
		yearSubjectId: 624
	}
};

export interface LessonDiscoverStep {
	promptAr: string;
	hintAr: string;
	expectedInput?: string;
	revealAr: string;
}

export interface LessonPracticeQuestion {
	questionAr: string;
	svg?: string;
	options: string[];
	correctIndex: number;
	diagnosticFeedback: string[];
	explanationAr: string;
}

export interface InteractiveLessonData {
	id: string;
	slug: string;
	grade: GradeId;
	yearSubjectId: 586 | 606 | 624;
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

export interface QuizQuestionPayload {
	type:
		| 'mcq'
		| 'true_false'
		| 'ordering'
		| 'drag_drop'
		| 'matching'
		| 'fill_blank'
		| 'short_answer'
		| 'cloze'
		| 'calculated'
		| 'matrix';
	questionText: string;
	questionTextAr?: string;
	imageUrl?: string | null;
	imageCaption?: string | null;
	questionData: Record<string, any>;
	explanation: string;
}

export interface GeneratedExerciseInstance {
	templateId: string;
	seed: number;
	grade: GradeId;
	trimesterId: TrimesterId;
	difficulty: Difficulty;
	domain: MathDomain;
	titleAr: string;
	quizQuestion: QuizQuestionPayload;
	sujetExercise: ExerciseBlock;
	hints: [string, string, string];
	solutionStepsAr: string[];
	finalAnswer: string;
}

export interface ParameterizedTemplate {
	id: string;
	grade: GradeId;
	trimesterId: TrimesterId;
	domain: MathDomain;
	titleAr: string;
	curriculumLessonId?: string;
	defaultPoints: number;
	isIntegration?: boolean;
	generate(seed: number, difficulty?: Difficulty): GeneratedExerciseInstance;
}
