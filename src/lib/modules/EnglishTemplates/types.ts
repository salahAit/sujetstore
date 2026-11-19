import type { ExerciseBlock, LevelId, TrimesterId } from '../SujetBuilder/types';
import type {
	Difficulty,
	LessonDiscoverStep,
	LessonPracticeQuestion,
	QuizQuestionPayload
} from '../MathTemplates/types';

export type { Difficulty, LessonDiscoverStep, LessonPracticeQuestion, QuizQuestionPayload };

/** Algeria introduced Primary English in 3AP (2022/23), 4AP (2023/24), and 5AP (2024/25) + 5AP Competency Evaluation */
export type EnglishPrimaryTrackId = '3ap' | '4ap' | '5ap';
export type EnglishMiddleTrackId = '1am' | '2am' | '3am' | '4am';
export type EnglishSecondaryTrackId =
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

export type EnglishTrackId =
	| EnglishPrimaryTrackId
	| EnglishMiddleTrackId
	| EnglishSecondaryTrackId;

export type EnglishYearSubjectId =
	| 799 // 3ap ENG-B
	| 800 // 4ap ENG-B
	| 801 // 5ap ENG-B
	| 616 // 1am ENG-B
	| 626 // 2am ENG-B
	| 636 // 3am ENG-B
	| 646 // 4am ENG-B (BEM)
	| 658 // 1as ENG-SEC TCST
	| 666 // 1as ENG-SEC TCL
	| 676 // 2as ENG-SEC SE
	| 696 // 2as ENG-SEC MATH
	| 715 // 2as ENG-SEC TM
	| 740 // 2as ENG-SEC GE
	| 762 // 2as ENG-SEC LP
	| 778 // 2as ENG-SEC LE
	| 686 // 3as ENG-SEC SE (BAC)
	| 706 // 3as ENG-SEC MATH (BAC)
	| 728 // 3as ENG-SEC TM (BAC)
	| 751 // 3as ENG-SEC GE (BAC)
	| 770 // 3as ENG-SEC LP (BAC)
	| 789; // 3as ENG-SEC LE (BAC)

export type EnglishDomain =
	| 'phonics_alphabet'
	| 'reading_comprehension'
	| 'grammar_tenses'
	| 'grammar_syntax'
	| 'vocabulary_morphology'
	| 'phonology_pronunciation'
	| 'discourse_cohesion'
	| 'written_expression';

/**
 * Algerian English exam structural roles:
 * - Primary (10 pts): comprehension (4) + mastery_language (3) + written_expression (3)
 * - Middle / BEM (20 pts): comprehension (7) + mastery_language (7) + written_expression (6)
 * - Secondary / BAC Sci & GE (20 pts): comprehension (8) + text_exploration (7) + written_expression (5)
 * - Secondary / BAC LP (20 pts): comprehension (7) + text_exploration (8) + written_expression (5)
 * - Secondary / BAC LE (20 pts): comprehension (7) + text_exploration (7) + written_expression (6)
 */
export type EnglishExamRole =
	| 'comprehension'
	| 'text_exploration'
	| 'written_expression';

export interface EnglishGradeMeta {
	grade: EnglishTrackId;
	levelId: LevelId;
	yearId: string;
	yearNameAr: string;
	yearNameEn: string;
	subjectId: 'ENG-B' | 'ENG-SEC';
	subjectNameAr: 'اللغة الإنجليزية';
	yearSubjectId: EnglishYearSubjectId;
	streamId?: 'TCST' | 'TCL' | 'SE' | 'TM' | 'MATH' | 'GE' | 'LP' | 'LE';
	streamNameAr?: string;
	streamNameEn?: string;
	coefficient: number;
	examDurationEn: string;
	pointsSplit: readonly [number, number, number]; // [Comprehension, Mastery/Exploration, Written Expression]
}

export const ENGLISH_GRADE_METADATA: Record<EnglishTrackId, EnglishGradeMeta> = {
	'3ap': {
		grade: '3ap',
		levelId: 'primaire',
		yearId: '3ap',
		yearNameAr: 'السنة الثالثة ابتدائي',
		yearNameEn: '3rd Year Primary School (3PS)',
		subjectId: 'ENG-B',
		subjectNameAr: 'اللغة الإنجليزية',
		yearSubjectId: 799,
		coefficient: 1,
		examDurationEn: '45 Minutes',
		pointsSplit: [4, 3, 3]
	},
	'4ap': {
		grade: '4ap',
		levelId: 'primaire',
		yearId: '4ap',
		yearNameAr: 'السنة الرابعة ابتدائي',
		yearNameEn: '4th Year Primary School (4PS)',
		subjectId: 'ENG-B',
		subjectNameAr: 'اللغة الإنجليزية',
		yearSubjectId: 800,
		coefficient: 1,
		examDurationEn: '45 Minutes',
		pointsSplit: [4, 3, 3]
	},
	'5ap': {
		grade: '5ap',
		levelId: 'primaire',
		yearId: '5ap',
		yearNameAr: 'السنة الخامسة ابتدائي',
		yearNameEn: '5th Year Primary School (5PS)',
		subjectId: 'ENG-B',
		subjectNameAr: 'اللغة الإنجليزية',
		yearSubjectId: 801,
		coefficient: 1,
		examDurationEn: '01 Hour',
		pointsSplit: [4, 3, 3]
	},
	'1am': {
		grade: '1am',
		levelId: 'moyen',
		yearId: '1am',
		yearNameAr: 'السنة الأولى متوسط',
		yearNameEn: '1st Year Middle School (1MS)',
		subjectId: 'ENG-B',
		subjectNameAr: 'اللغة الإنجليزية',
		yearSubjectId: 616,
		coefficient: 1,
		examDurationEn: '01 Hour 30 Min',
		pointsSplit: [7, 7, 6]
	},
	'2am': {
		grade: '2am',
		levelId: 'moyen',
		yearId: '2am',
		yearNameAr: 'السنة الثانية متوسط',
		yearNameEn: '2nd Year Middle School (2MS)',
		subjectId: 'ENG-B',
		subjectNameAr: 'اللغة الإنجليزية',
		yearSubjectId: 626,
		coefficient: 1,
		examDurationEn: '01 Hour 30 Min',
		pointsSplit: [7, 7, 6]
	},
	'3am': {
		grade: '3am',
		levelId: 'moyen',
		yearId: '3am',
		yearNameAr: 'السنة الثالثة متوسط',
		yearNameEn: '3rd Year Middle School (3MS)',
		subjectId: 'ENG-B',
		subjectNameAr: 'اللغة الإنجليزية',
		yearSubjectId: 636,
		coefficient: 1,
		examDurationEn: '01 Hour 30 Min',
		pointsSplit: [7, 7, 6]
	},
	'4am': {
		grade: '4am',
		levelId: 'moyen',
		yearId: '4am',
		yearNameAr: 'السنة الرابعة متوسط (BEM)',
		yearNameEn: '4th Year Middle School (4MS / BEM)',
		subjectId: 'ENG-B',
		subjectNameAr: 'اللغة الإنجليزية',
		yearSubjectId: 646,
		coefficient: 2,
		examDurationEn: '01 Hour 30 Min',
		pointsSplit: [7, 7, 6]
	},
	'1as_tcst': {
		grade: '1as_tcst',
		levelId: 'secondaire',
		yearId: '1as',
		yearNameAr: 'السنة الأولى ثانوي — جذع مشترك علوم وتكنولوجيا',
		yearNameEn: '1st Year Secondary School (1AS)',
		subjectId: 'ENG-SEC',
		subjectNameAr: 'اللغة الإنجليزية',
		yearSubjectId: 658,
		streamId: 'TCST',
		streamNameAr: 'جذع مشترك علوم وتكنولوجيا',
		streamNameEn: 'Scientific & Technological Stream',
		coefficient: 2,
		examDurationEn: '02 Hours',
		pointsSplit: [8, 7, 5]
	},
	'1as_tcl': {
		grade: '1as_tcl',
		levelId: 'secondaire',
		yearId: '1as',
		yearNameAr: 'السنة الأولى ثانوي — جذع مشترك آداب',
		yearNameEn: '1st Year Secondary School (1AS)',
		subjectId: 'ENG-SEC',
		subjectNameAr: 'اللغة الإنجليزية',
		yearSubjectId: 666,
		streamId: 'TCL',
		streamNameAr: 'جذع مشترك آداب',
		streamNameEn: 'Literary Stream',
		coefficient: 3,
		examDurationEn: '02 Hours',
		pointsSplit: [7, 8, 5]
	},
	'2as_se': {
		grade: '2as_se',
		levelId: 'secondaire',
		yearId: '2as',
		yearNameAr: 'السنة الثانية ثانوي — علوم تجريبية',
		yearNameEn: '2nd Year Secondary School (2AS)',
		subjectId: 'ENG-SEC',
		subjectNameAr: 'اللغة الإنجليزية',
		yearSubjectId: 676,
		streamId: 'SE',
		streamNameAr: 'علوم تجريبية',
		streamNameEn: 'Experimental Sciences',
		coefficient: 2,
		examDurationEn: '02 Hours',
		pointsSplit: [8, 7, 5]
	},
	'2as_tm': {
		grade: '2as_tm',
		levelId: 'secondaire',
		yearId: '2as',
		yearNameAr: 'السنة الثانية ثانوي — تقني رياضي',
		yearNameEn: '2nd Year Secondary School (2AS)',
		subjectId: 'ENG-SEC',
		subjectNameAr: 'اللغة الإنجليزية',
		yearSubjectId: 715,
		streamId: 'TM',
		streamNameAr: 'تقني رياضي',
		streamNameEn: 'Technical Mathematics',
		coefficient: 2,
		examDurationEn: '02 Hours',
		pointsSplit: [8, 7, 5]
	},
	'2as_math': {
		grade: '2as_math',
		levelId: 'secondaire',
		yearId: '2as',
		yearNameAr: 'السنة الثانية ثانوي — رياضيات',
		yearNameEn: '2nd Year Secondary School (2AS)',
		subjectId: 'ENG-SEC',
		subjectNameAr: 'اللغة الإنجليزية',
		yearSubjectId: 696,
		streamId: 'MATH',
		streamNameAr: 'رياضيات',
		streamNameEn: 'Mathematics',
		coefficient: 2,
		examDurationEn: '02 Hours',
		pointsSplit: [8, 7, 5]
	},
	'2as_ge': {
		grade: '2as_ge',
		levelId: 'secondaire',
		yearId: '2as',
		yearNameAr: 'السنة الثانية ثانوي — تسيير واقتصاد',
		yearNameEn: '2nd Year Secondary School (2AS)',
		subjectId: 'ENG-SEC',
		subjectNameAr: 'اللغة الإنجليزية',
		yearSubjectId: 740,
		streamId: 'GE',
		streamNameAr: 'تسيير واقتصاد',
		streamNameEn: 'Management & Economics',
		coefficient: 2,
		examDurationEn: '02 Hours',
		pointsSplit: [8, 7, 5]
	},
	'2as_lp': {
		grade: '2as_lp',
		levelId: 'secondaire',
		yearId: '2as',
		yearNameAr: 'السنة الثانية ثانوي — آداب وفلسفة',
		yearNameEn: '2nd Year Secondary School (2AS)',
		subjectId: 'ENG-SEC',
		subjectNameAr: 'اللغة الإنجليزية',
		yearSubjectId: 762,
		streamId: 'LP',
		streamNameAr: 'آداب وفلسفة',
		streamNameEn: 'Literature & Philosophy',
		coefficient: 3,
		examDurationEn: '02 Hours',
		pointsSplit: [7, 8, 5]
	},
	'2as_le': {
		grade: '2as_le',
		levelId: 'secondaire',
		yearId: '2as',
		yearNameAr: 'السنة الثانية ثانوي — لغات أجنبية',
		yearNameEn: '2nd Year Secondary School (2AS)',
		subjectId: 'ENG-SEC',
		subjectNameAr: 'اللغة الإنجليزية',
		yearSubjectId: 778,
		streamId: 'LE',
		streamNameAr: 'لغات أجنبية',
		streamNameEn: 'Foreign Languages',
		coefficient: 5,
		examDurationEn: '02 Hours 30 Min',
		pointsSplit: [7, 7, 6]
	},
	'3as_se': {
		grade: '3as_se',
		levelId: 'secondaire',
		yearId: '3as',
		yearNameAr: 'السنة الثالثة ثانوي — علوم تجريبية (BAC)',
		yearNameEn: '3rd Year Secondary School (3AS / BAC)',
		subjectId: 'ENG-SEC',
		subjectNameAr: 'اللغة الإنجليزية',
		yearSubjectId: 686,
		streamId: 'SE',
		streamNameAr: 'علوم تجريبية',
		streamNameEn: 'Experimental Sciences',
		coefficient: 2,
		examDurationEn: '02 Hours 30 Min',
		pointsSplit: [8, 7, 5]
	},
	'3as_tm': {
		grade: '3as_tm',
		levelId: 'secondaire',
		yearId: '3as',
		yearNameAr: 'السنة الثالثة ثانوي — تقني رياضي (BAC)',
		yearNameEn: '3rd Year Secondary School (3AS / BAC)',
		subjectId: 'ENG-SEC',
		subjectNameAr: 'اللغة الإنجليزية',
		yearSubjectId: 728,
		streamId: 'TM',
		streamNameAr: 'تقني رياضي',
		streamNameEn: 'Technical Mathematics',
		coefficient: 2,
		examDurationEn: '02 Hours 30 Min',
		pointsSplit: [8, 7, 5]
	},
	'3as_math': {
		grade: '3as_math',
		levelId: 'secondaire',
		yearId: '3as',
		yearNameAr: 'السنة الثالثة ثانوي — رياضيات (BAC)',
		yearNameEn: '3rd Year Secondary School (3AS / BAC)',
		subjectId: 'ENG-SEC',
		subjectNameAr: 'اللغة الإنجليزية',
		yearSubjectId: 706,
		streamId: 'MATH',
		streamNameAr: 'رياضيات',
		streamNameEn: 'Mathematics',
		coefficient: 2,
		examDurationEn: '02 Hours 30 Min',
		pointsSplit: [8, 7, 5]
	},
	'3as_ge': {
		grade: '3as_ge',
		levelId: 'secondaire',
		yearId: '3as',
		yearNameAr: 'السنة الثالثة ثانوي — تسيير واقتصاد (BAC)',
		yearNameEn: '3rd Year Secondary School (3AS / BAC)',
		subjectId: 'ENG-SEC',
		subjectNameAr: 'اللغة الإنجليزية',
		yearSubjectId: 751,
		streamId: 'GE',
		streamNameAr: 'تسيير واقتصاد',
		streamNameEn: 'Management & Economics',
		coefficient: 2,
		examDurationEn: '02 Hours 30 Min',
		pointsSplit: [8, 7, 5]
	},
	'3as_lp': {
		grade: '3as_lp',
		levelId: 'secondaire',
		yearId: '3as',
		yearNameAr: 'السنة الثالثة ثانوي — آداب وفلسفة (BAC)',
		yearNameEn: '3rd Year Secondary School (3AS / BAC)',
		subjectId: 'ENG-SEC',
		subjectNameAr: 'اللغة الإنجليزية',
		yearSubjectId: 770,
		streamId: 'LP',
		streamNameAr: 'آداب وفلسفة',
		streamNameEn: 'Literature & Philosophy',
		coefficient: 3,
		examDurationEn: '02 Hours 30 Min',
		pointsSplit: [7, 8, 5]
	},
	'3as_le': {
		grade: '3as_le',
		levelId: 'secondaire',
		yearId: '3as',
		yearNameAr: 'السنة الثالثة ثانوي — لغات أجنبية (BAC)',
		yearNameEn: '3rd Year Secondary School (3AS / BAC)',
		subjectId: 'ENG-SEC',
		subjectNameAr: 'اللغة الإنجليزية',
		yearSubjectId: 789,
		streamId: 'LE',
		streamNameAr: 'لغات أجنبية',
		streamNameEn: 'Foreign Languages',
		coefficient: 5,
		examDurationEn: '03 Hours 30 Min',
		pointsSplit: [7, 7, 6]
	}
};

export const ENGLISH_PRIMARY_TRACK_IDS: readonly EnglishPrimaryTrackId[] = ['3ap', '4ap', '5ap'];
export const ENGLISH_MIDDLE_TRACK_IDS: readonly EnglishMiddleTrackId[] = ['1am', '2am', '3am', '4am'];
export const ENGLISH_SECONDARY_TRACK_IDS: readonly EnglishSecondaryTrackId[] = [
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

export const ALL_ENGLISH_TRACK_IDS: readonly EnglishTrackId[] = [
	...ENGLISH_PRIMARY_TRACK_IDS,
	...ENGLISH_MIDDLE_TRACK_IDS,
	...ENGLISH_SECONDARY_TRACK_IDS
];

export interface EnglishInteractiveLessonData {
	id: string;
	slug: string;
	grade: EnglishTrackId;
	yearSubjectId: EnglishYearSubjectId;
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

export interface EnglishGeneratedExerciseInstance {
	templateId: string;
	seed: number;
	grade: EnglishTrackId;
	trimesterId: TrimesterId;
	difficulty: Difficulty;
	domain: EnglishDomain;
	titleAr: string;
	examRole: EnglishExamRole;
	quizQuestion: QuizQuestionPayload;
	sujetExercise: ExerciseBlock;
	hints: [string, string, string];
	solutionStepsAr: string[];
	finalAnswer: string;
}

export interface EnglishParameterizedTemplate {
	id: string;
	grade: EnglishTrackId;
	trimesterId: TrimesterId;
	domain: EnglishDomain;
	titleAr: string;
	curriculumLessonId?: string;
	defaultPoints: number;
	examRole: EnglishExamRole;
	isIntegration?: boolean;
	generate(seed: number, difficulty?: Difficulty): EnglishGeneratedExerciseInstance;
}

export function adaptEnglishLessonForTrack(
	base: EnglishInteractiveLessonData,
	targetGrade: EnglishSecondaryTrackId,
	idSuffix?: string
): EnglishInteractiveLessonData {
	const meta = ENGLISH_GRADE_METADATA[targetGrade];
	const suffixMatch = base.id.match(/^eng_lesson_[a-z0-9_]+_(t[123]_[a-z0-9_]+)$/);
	const tail = idSuffix || (suffixMatch ? suffixMatch[1] : `${base.trimesterId}_${base.slug}`);
	const cleanTail = tail.replace(/^t[123]_/, `${base.trimesterId}_`);
	const newId = `eng_lesson_${targetGrade}_${cleanTail}`;
	const slugTail = base.slug.replace(
		/^(?:eng-)?(?:1as-tcst|1as-tcl|2as-se|2as-tm|2as-math|2as-ge|2as-lp|2as-le|3as-se|3as-tm|3as-math|3as-ge|3as-lp|3as-le|2as-sci|3as-sci)-/,
		''
	);
	return {
		...base,
		id: newId,
		slug: `eng-${targetGrade.replace('_', '-')}-${slugTail}`,
		grade: targetGrade,
		yearSubjectId: meta.yearSubjectId
	};
}

export function adaptEnglishTemplateForTrack(
	base: EnglishParameterizedTemplate,
	targetGrade: EnglishSecondaryTrackId
): EnglishParameterizedTemplate {
	const newId = base.id.replace(
		/^eng_tpl_(?:2as_sci|3as_sci|2as_se|3as_se|2as_lp|3as_lp)_/,
		`eng_tpl_${targetGrade}_`
	);
	const resolvedId =
		newId === base.id ? `eng_tpl_${targetGrade}_${base.trimesterId}_${base.id}` : newId;
	const adaptedLessonId = base.curriculumLessonId
		? base.curriculumLessonId.replace(
				/^eng_lesson_(?:2as_sci|3as_sci|2as_se|3as_se|2as_lp|3as_lp)_/,
				`eng_lesson_${targetGrade}_`
			)
		: undefined;
	return {
		...base,
		id: resolvedId,
		grade: targetGrade,
		curriculumLessonId: adaptedLessonId,
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const out = base.generate(seed, difficulty);
			return {
				...out,
				templateId: resolvedId,
				grade: targetGrade
			};
		}
	};
}
