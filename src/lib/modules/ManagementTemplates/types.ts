import type { ExerciseBlock, LevelId, TrimesterId } from '../SujetBuilder/types';
import type {
	Difficulty,
	LessonDiscoverStep,
	LessonPracticeQuestion,
	QuizQuestionPayload
} from '../MathTemplates/types';

export type { Difficulty, LessonDiscoverStep, LessonPracticeQuestion, QuizQuestionPayload };

export type ManagementTrackId =
	| '2as_acc'
	| '3as_acc'
	| '2as_eco'
	| '3as_eco'
	| '2as_law'
	| '3as_law';

export type ManagementSubjectId = 'ACC-FIN' | 'ECO-MAN' | 'LAW';

export type ManagementYearSubjectId =
	| 744 // 2as ACC-FIN GE
	| 755 // 3as ACC-FIN GE (BAC)
	| 745 // 2as ECO-MAN GE
	| 756 // 3as ECO-MAN GE (BAC)
	| 746 // 2as LAW GE
	| 757; // 3as LAW GE (BAC)

export type ManagementDomain =
	| 'acc_basics'
	| 'acc_operations'
	| 'acc_year_end'
	| 'acc_financial_statements'
	| 'acc_cost_analysis'
	| 'eco_micro'
	| 'eco_macro'
	| 'eco_trade_money'
	| 'man_functions'
	| 'man_leadership_control'
	| 'law_intro_rights'
	| 'law_contracts_commerce'
	| 'law_labor'
	| 'law_public_finance'
	| 'integration';

export interface ManagementGradeMeta {
	grade: ManagementTrackId;
	levelId: LevelId;
	yearId: '2as' | '3as';
	yearName: string;
	subjectId: ManagementSubjectId;
	subjectName: string;
	yearSubjectId: ManagementYearSubjectId;
	streamId: 'GE';
	streamNameAr: 'تسيير واقتصاد';
	coefficient: number;
	examDuration: string;
	bacDuration?: string;
}

export const MANAGEMENT_GRADE_METADATA: Record<ManagementTrackId, ManagementGradeMeta> = {
	'2as_acc': {
		grade: '2as_acc',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — تسيير واقتصاد',
		subjectId: 'ACC-FIN',
		subjectName: 'التسيير المحاسبي والمالي',
		yearSubjectId: 744,
		streamId: 'GE',
		streamNameAr: 'تسيير واقتصاد',
		coefficient: 5,
		examDuration: '03 ساعات'
	},
	'3as_acc': {
		grade: '3as_acc',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — تسيير واقتصاد (BAC)',
		subjectId: 'ACC-FIN',
		subjectName: 'التسيير المحاسبي والمالي',
		yearSubjectId: 755,
		streamId: 'GE',
		streamNameAr: 'تسيير واقتصاد',
		coefficient: 6,
		examDuration: '03 ساعات و30 دقيقة',
		bacDuration: '04 ساعات و30 دقيقة'
	},
	'2as_eco': {
		grade: '2as_eco',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — تسيير واقتصاد',
		subjectId: 'ECO-MAN',
		subjectName: 'الاقتصاد والمناجمنت',
		yearSubjectId: 745,
		streamId: 'GE',
		streamNameAr: 'تسيير واقتصاد',
		coefficient: 4,
		examDuration: '02 ساعات و30 دقيقة'
	},
	'3as_eco': {
		grade: '3as_eco',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — تسيير واقتصاد (BAC)',
		subjectId: 'ECO-MAN',
		subjectName: 'الاقتصاد والمناجمنت',
		yearSubjectId: 756,
		streamId: 'GE',
		streamNameAr: 'تسيير واقتصاد',
		coefficient: 5,
		examDuration: '03 ساعات',
		bacDuration: '03 ساعات'
	},
	'2as_law': {
		grade: '2as_law',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — تسيير واقتصاد',
		subjectId: 'LAW',
		subjectName: 'القانون',
		yearSubjectId: 746,
		streamId: 'GE',
		streamNameAr: 'تسيير واقتصاد',
		coefficient: 2,
		examDuration: '02 ساعات'
	},
	'3as_law': {
		grade: '3as_law',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — تسيير واقتصاد (BAC)',
		subjectId: 'LAW',
		subjectName: 'القانون',
		yearSubjectId: 757,
		streamId: 'GE',
		streamNameAr: 'تسيير واقتصاد',
		coefficient: 2,
		examDuration: '02 ساعات',
		bacDuration: '02 ساعات'
	}
};

export const ALL_MANAGEMENT_TRACK_IDS: readonly ManagementTrackId[] = [
	'2as_acc',
	'3as_acc',
	'2as_eco',
	'3as_eco',
	'2as_law',
	'3as_law'
];

export interface ManagementInteractiveLessonData {
	id: string;
	slug: string;
	grade: ManagementTrackId;
	yearSubjectId: ManagementYearSubjectId;
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
		imageUrl?: string;
		imageCaption?: string;
		steps: LessonDiscoverStep[];
	};
	summary: {
		rulesAr: string[];
		visualSvg?: string;
		imageUrl?: string;
		visualCaptionAr?: string;
		examples: { problemAr: string; solutionAr: string }[];
		watchOutAr?: string;
	};
	practice: LessonPracticeQuestion[];
}

export interface ManagementGeneratedExerciseInstance {
	templateId: string;
	seed: number;
	grade: ManagementTrackId;
	trimesterId: TrimesterId;
	difficulty: Difficulty;
	domain: ManagementDomain;
	titleAr: string;
	quizQuestion: QuizQuestionPayload;
	sujetExercise: ExerciseBlock;
	hints: [string, string, string];
	solutionStepsAr: string[];
	finalAnswer: string;
}

export interface ManagementParameterizedTemplate {
	id: string;
	grade: ManagementTrackId;
	trimesterId: TrimesterId;
	domain: ManagementDomain;
	titleAr: string;
	curriculumLessonId?: string;
	defaultPoints: number;
	isIntegration?: boolean;
	generate(seed: number, difficulty?: Difficulty): ManagementGeneratedExerciseInstance;
}
