import type { ExerciseBlock, LevelId, TrimesterId } from '../SujetBuilder/types';

export type SecondaryTrackId =
	| '1as_tcst'
	| '1as_tcl'
	| '2as_se'
	| '2as_tm'
	| '2as_math'
	| '2as_ge'
	| '2as_lp'
	| '2as_le'
	| '3as_se'
	| '3as_tm'
	| '3as_math'
	| '3as_ge'
	| '3as_lp'
	| '3as_le';

export type GradeId =
	| '1ap'
	| '2ap'
	| '3ap'
	| '4ap'
	| '5ap'
	| '1am'
	| '2am'
	| '3am'
	| '4am'
	| SecondaryTrackId;

export type PipelineYearSubjectId =
	| 581
	| 586
	| 591
	| 598
	| 606
	| 614
	| 624
	| 634
	| 644
	| 654
	| 664
	| 672
	| 692
	| 712
	| 738
	| 760
	| 776
	| 682
	| 702
	| 725
	| 749
	| 768
	| 787;

export type Difficulty = 'easy' | 'medium' | 'hard';
export type MathDomain =
	| 'numeric'
	| 'geometry'
	| 'measurement'
	| 'proportionality'
	| 'integration'
	| 'analysis'
	| 'algebra'
	| 'complex'
	| 'probability'
	| 'arithmetic_z';

export interface GradeMeta {
	grade: GradeId;
	levelId: LevelId;
	yearId: string;
	yearName: string;
	subjectId: 'MAT-B' | 'MAT-SE' | 'MAT-TM' | 'MAT-MATH' | 'MAT-GE' | 'MAT-LIT';
	subjectName: 'الرياضيات';
	yearSubjectId: PipelineYearSubjectId;
	streamId?: 'TCST' | 'TCL' | 'SE' | 'TM' | 'MATH' | 'GE' | 'LP' | 'LE';
	streamNameAr?: string;
	coefficient?: number;
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
	},
	'1as_tcst': {
		grade: '1as_tcst',
		levelId: 'secondaire',
		yearId: '1as',
		yearName: 'السنة الأولى ثانوي — جذع مشترك علوم وتكنولوجيا',
		subjectId: 'MAT-SE',
		subjectName: 'الرياضيات',
		yearSubjectId: 654,
		streamId: 'TCST',
		streamNameAr: 'جذع مشترك علوم وتكنولوجيا',
		coefficient: 5
	},
	'1as_tcl': {
		grade: '1as_tcl',
		levelId: 'secondaire',
		yearId: '1as',
		yearName: 'السنة الأولى ثانوي — جذع مشترك آداب',
		subjectId: 'MAT-LIT',
		subjectName: 'الرياضيات',
		yearSubjectId: 664,
		streamId: 'TCL',
		streamNameAr: 'جذع مشترك آداب',
		coefficient: 2
	},
	'2as_se': {
		grade: '2as_se',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — علوم تجريبية',
		subjectId: 'MAT-SE',
		subjectName: 'الرياضيات',
		yearSubjectId: 672,
		streamId: 'SE',
		streamNameAr: 'علوم تجريبية',
		coefficient: 5
	},
	'2as_tm': {
		grade: '2as_tm',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — تقني رياضي',
		subjectId: 'MAT-TM',
		subjectName: 'الرياضيات',
		yearSubjectId: 712,
		streamId: 'TM',
		streamNameAr: 'تقني رياضي',
		coefficient: 6
	},
	'2as_math': {
		grade: '2as_math',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — رياضيات',
		subjectId: 'MAT-MATH',
		subjectName: 'الرياضيات',
		yearSubjectId: 692,
		streamId: 'MATH',
		streamNameAr: 'رياضيات',
		coefficient: 7
	},
	'2as_ge': {
		grade: '2as_ge',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — تسيير واقتصاد',
		subjectId: 'MAT-GE',
		subjectName: 'الرياضيات',
		yearSubjectId: 738,
		streamId: 'GE',
		streamNameAr: 'تسيير واقتصاد',
		coefficient: 5
	},
	'2as_lp': {
		grade: '2as_lp',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — آداب وفلسفة',
		subjectId: 'MAT-LIT',
		subjectName: 'الرياضيات',
		yearSubjectId: 760,
		streamId: 'LP',
		streamNameAr: 'آداب وفلسفة',
		coefficient: 2
	},
	'2as_le': {
		grade: '2as_le',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — لغات أجنبية',
		subjectId: 'MAT-LIT',
		subjectName: 'الرياضيات',
		yearSubjectId: 776,
		streamId: 'LE',
		streamNameAr: 'لغات أجنبية',
		coefficient: 2
	},
	'3as_se': {
		grade: '3as_se',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — علوم تجريبية (BAC)',
		subjectId: 'MAT-SE',
		subjectName: 'الرياضيات',
		yearSubjectId: 682,
		streamId: 'SE',
		streamNameAr: 'علوم تجريبية',
		coefficient: 5
	},
	'3as_tm': {
		grade: '3as_tm',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — تقني رياضي (BAC)',
		subjectId: 'MAT-TM',
		subjectName: 'الرياضيات',
		yearSubjectId: 725,
		streamId: 'TM',
		streamNameAr: 'تقني رياضي',
		coefficient: 6
	},
	'3as_math': {
		grade: '3as_math',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — رياضيات (BAC)',
		subjectId: 'MAT-MATH',
		subjectName: 'الرياضيات',
		yearSubjectId: 702,
		streamId: 'MATH',
		streamNameAr: 'رياضيات',
		coefficient: 7
	},
	'3as_ge': {
		grade: '3as_ge',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — تسيير واقتصاد (BAC)',
		subjectId: 'MAT-GE',
		subjectName: 'الرياضيات',
		yearSubjectId: 749,
		streamId: 'GE',
		streamNameAr: 'تسيير واقتصاد',
		coefficient: 5
	},
	'3as_lp': {
		grade: '3as_lp',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — آداب وفلسفة (BAC)',
		subjectId: 'MAT-LIT',
		subjectName: 'الرياضيات',
		yearSubjectId: 768,
		streamId: 'LP',
		streamNameAr: 'آداب وفلسفة',
		coefficient: 2
	},
	'3as_le': {
		grade: '3as_le',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — لغات أجنبية (BAC)',
		subjectId: 'MAT-LIT',
		subjectName: 'الرياضيات',
		yearSubjectId: 787,
		streamId: 'LE',
		streamNameAr: 'لغات أجنبية',
		coefficient: 2
	}
};

export const SECONDARY_TRACK_IDS: readonly SecondaryTrackId[] = [
	'1as_tcst',
	'1as_tcl',
	'2as_se',
	'2as_tm',
	'2as_math',
	'2as_ge',
	'2as_lp',
	'2as_le',
	'3as_se',
	'3as_tm',
	'3as_math',
	'3as_ge',
	'3as_lp',
	'3as_le'
];

export const ALL_GRADE_IDS: readonly GradeId[] = [
	'1ap',
	'2ap',
	'3ap',
	'4ap',
	'5ap',
	'1am',
	'2am',
	'3am',
	'4am',
	...SECONDARY_TRACK_IDS
];

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

/**
 * Adapts a shared 2AS/3AS interactive lesson definition to a specific target track
 * with guaranteed unique id, slug, grade, and yearSubjectId.
 */
export function adaptLessonForTrack(
	base: InteractiveLessonData,
	targetGrade: SecondaryTrackId,
	idSuffix?: string
): InteractiveLessonData {
	const meta = GRADE_METADATA[targetGrade];
	const suffixMatch = base.id.match(/^lesson_[a-z0-9_]+_(t[123]_[a-z0-9_]+)$/);
	const tail = idSuffix || (suffixMatch ? suffixMatch[1] : `${base.trimesterId}_${base.slug}`);
	const cleanTail = tail.replace(/^t[123]_/, `${base.trimesterId}_`);
	const newId = `lesson_${targetGrade}_${cleanTail}`;
	const slugTail = base.slug.replace(
		/^(1as_tcst|1as_tcl|2as_se|2as_tm|2as_math|2as_ge|2as_lp|2as_le|3as_se|3as_tm|3as_math|3as_ge|3as_lp|3as_le|2as_shared_lit|3as_shared_lit|2as_shared|3as_shared|2as-shared-lit|3as-shared-lit|2as-shared|3as-shared)-/,
		''
	);
	return {
		...base,
		id: newId,
		slug: `${targetGrade.replace('_', '-')}-${slugTail}`,
		grade: targetGrade,
		yearSubjectId: meta.yearSubjectId
	};
}

/**
 * Adapts a shared 2AS/3AS parameterized template to a specific target track
 * with track-scoped templateId, grade, and curriculumLessonId.
 */
export function adaptTemplateForTrack(
	base: ParameterizedTemplate,
	targetGrade: SecondaryTrackId
): ParameterizedTemplate {
	const newId = base.id.replace(
		/^tpl_(2as_shared_lit|3as_shared_lit|2as_shared|3as_shared|1as_tcst|1as_tcl|2as_se|2as_tm|2as_math|2as_ge|2as_lp|2as_le|3as_se|3as_tm|3as_math|3as_ge|3as_lp|3as_le)_/,
		`tpl_${targetGrade}_`
	);
	const resolvedId = newId === base.id ? `tpl_${targetGrade}_${base.trimesterId}_${base.id}` : newId;
	const adaptedLessonId = base.curriculumLessonId
		? base.curriculumLessonId.replace(
				/^lesson_(2as_shared_lit|3as_shared_lit|2as_shared|3as_shared|1as_tcst|1as_tcl|2as_se|2as_tm|2as_math|2as_ge|2as_lp|2as_le|3as_se|3as_tm|3as_math|3as_ge|3as_lp|3as_le)_/,
				`lesson_${targetGrade}_`
			)
		: undefined;
	return {
		...base,
		id: resolvedId,
		grade: targetGrade,
		curriculumLessonId: adaptedLessonId,
		generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
			const out = base.generate(seed, difficulty);
			return {
				...out,
				templateId: resolvedId,
				grade: targetGrade
			};
		}
	};
}
