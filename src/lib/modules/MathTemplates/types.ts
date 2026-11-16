import type { ExerciseBlock, LevelId, TrimesterId } from '../SujetBuilder/types';

export type GradeId = '1ap' | '2ap' | '3ap' | '4ap' | '5ap' | '1am' | '2am' | '3am' | '4am';
export type PipelineYearSubjectId = 581 | 586 | 591 | 598 | 606 | 614 | 624 | 634 | 644;
export type Difficulty = 'easy' | 'medium' | 'hard';
export type MathDomain = 'numeric' | 'geometry' | 'measurement' | 'proportionality' | 'integration';

export interface GradeMeta {
	grade: GradeId;
	levelId: LevelId;
	yearId: string;
	yearName: string;
	subjectId: 'MAT-B';
	subjectName: 'الرياضيات';
	yearSubjectId: PipelineYearSubjectId;
}

export const GRADE_METADATA: Record<GradeId, GradeMeta> = {
	'1ap': {
		grade: '1ap',
		levelId: 'primaire',
		yearId: '1ap',
		yearName: 'السنة الأولى ابتدائي',
		subjectId: 'MAT-B',
		subjectName: 'الرياضيات',
		yearSubjectId: 581
	},
	'2ap': {
		grade: '2ap',
		levelId: 'primaire',
		yearId: '2ap',
		yearName: 'السنة الثانية ابتدائي',
		subjectId: 'MAT-B',
		subjectName: 'الرياضيات',
		yearSubjectId: 586
	},
	'3ap': {
		grade: '3ap',
		levelId: 'primaire',
		yearId: '3ap',
		yearName: 'السنة الثالثة ابتدائي',
		subjectId: 'MAT-B',
		subjectName: 'الرياضيات',
		yearSubjectId: 591
	},
	'4ap': {
		grade: '4ap',
		levelId: 'primaire',
		yearId: '4ap',
		yearName: 'السنة الرابعة ابتدائي',
		subjectId: 'MAT-B',
		subjectName: 'الرياضيات',
		yearSubjectId: 598
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
	'1am': {
		grade: '1am',
		levelId: 'moyen',
		yearId: '1am',
		yearName: 'السنة الأولى متوسط',
		subjectId: 'MAT-B',
		subjectName: 'الرياضيات',
		yearSubjectId: 614
	},
	'2am': {
		grade: '2am',
		levelId: 'moyen',
		yearId: '2am',
		yearName: 'السنة الثانية متوسط',
		subjectId: 'MAT-B',
		subjectName: 'الرياضيات',
		yearSubjectId: 624
	},
	'3am': {
		grade: '3am',
		levelId: 'moyen',
		yearId: '3am',
		yearName: 'السنة الثالثة متوسط',
		subjectId: 'MAT-B',
		subjectName: 'الرياضيات',
		yearSubjectId: 634
	},
	'4am': {
		grade: '4am',
		levelId: 'moyen',
		yearId: '4am',
		yearName: 'السنة الرابعة متوسط (BEM)',
		subjectId: 'MAT-B',
		subjectName: 'الرياضيات',
		yearSubjectId: 644
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
	yearSubjectId: PipelineYearSubjectId;
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
