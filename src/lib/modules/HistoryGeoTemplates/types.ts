import type { ExerciseBlock, LevelId, TrimesterId } from '../SujetBuilder/types';
import type {
	Difficulty,
	LessonDiscoverStep,
	LessonPracticeQuestion,
	QuizQuestionPayload
} from '../MathTemplates/types';

export type { Difficulty, LessonDiscoverStep, LessonPracticeQuestion, QuizQuestionPayload };

export type HistoryPrimaryTrackId = '3ap' | '4ap' | '5ap';
export type HistoryMiddleTrackId = '1am' | '2am' | '3am' | '4am';
export type HistorySecondaryTrackId =
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

export type HistoryTrackId =
	| HistoryPrimaryTrackId
	| HistoryMiddleTrackId
	| HistorySecondaryTrackId;

/** Canonical non-duplicated curriculum pools (10 pools mapped onto all 21 tracks). */
export type HistoryCanonicalGradeId =
	| '3ap'
	| '4ap'
	| '5ap'
	| '1am'
	| '2am'
	| '3am'
	| '4am'
	| '1as'
	| '2as'
	| '3as';

export type HistoryStreamCategory = 'sci' | 'ge' | 'lp' | 'le';

export type HistoryYearSubjectId =
	| 596 // 3ap HIS-B
	| 603 // 4ap HIS-B
	| 611 // 5ap HIS-B
	| 620 // 1am HIS-B
	| 630 // 2am HIS-B
	| 640 // 3am HIS-B
	| 650 // 4am HIS-B (BEM)
	| 659 // 1as HIS-SCI TCST
	| 667 // 1as HIS-LP TCL
	| 677 // 2as HIS-SCI SE
	| 697 // 2as HIS-SCI MATH
	| 716 // 2as HIS-SCI TM
	| 741 // 2as HIS-GE GE
	| 763 // 2as HIS-LP LP
	| 779 // 2as HIS-LE LE
	| 687 // 3as HIS-SCI SE (BAC)
	| 707 // 3as HIS-SCI MATH (BAC)
	| 729 // 3as HIS-SCI TM (BAC)
	| 752 // 3as HIS-GE GE (BAC)
	| 771 // 3as HIS-LP LP (BAC)
	| 790; // 3as HIS-LE LE (BAC)

export type HistoryDomain =
	| 'hist_ancient'
	| 'hist_islamic'
	| 'hist_ottoman'
	| 'hist_colonial_resistance'
	| 'hist_november_revolution'
	| 'hist_cold_war'
	| 'hist_decolonization'
	| 'geo_tools_relief'
	| 'geo_algeria'
	| 'geo_population_hazards'
	| 'geo_global_economy'
	| 'geo_major_powers';

/**
 * ONEC History & Geography exam structural roles:
 * - Primary (10 pts = 5 + 5):
 *   `pri_history` (5 pts) | `pri_geography` (5 pts)
 * - Middle / BEM (20 pts = 9 + 4 + 4 + 3):
 *   `mid_hist_p1` (9 pts) | `mid_hist_int` (4 pts) | `mid_geo_p1` (4 pts) | `mid_geo_int` (3 pts)
 * - Secondary / BAC (20 pts = 6 + 4 + 6 + 4):
 *   `sec_hist_p1` (6 pts) | `sec_hist_p2` (4 pts) | `sec_geo_p1` (6 pts) | `sec_geo_p2` (4 pts)
 */
export type HistoryOnecRole =
	| 'pri_history'
	| 'pri_geography'
	| 'mid_hist_p1'
	| 'mid_hist_int'
	| 'mid_geo_p1'
	| 'mid_geo_int'
	| 'sec_hist_p1'
	| 'sec_hist_p2'
	| 'sec_geo_p1'
	| 'sec_geo_p2';

export type HistoryExamProfile =
	| 'primary_3_4'
	| 'primary_5ap'
	| 'middle'
	| 'sec_1as_2as'
	| 'sec_3as_bac';

export interface HistoryGradeMeta {
	grade: HistoryTrackId;
	canonicalGrade: HistoryCanonicalGradeId;
	levelId: LevelId;
	yearId: string;
	yearName: string;
	subjectId: 'HIS-B' | 'HIS-SCI' | 'HIS-GE' | 'HIS-LP' | 'HIS-LE';
	subjectName: 'التاريخ والجغرافيا';
	yearSubjectId: HistoryYearSubjectId;
	streamId?: 'TCST' | 'TCL' | 'SE' | 'TM' | 'MATH' | 'GE' | 'LP' | 'LE';
	streamCategory?: HistoryStreamCategory;
	streamNameAr?: string;
	coefficient: number;
	examDuration: string;
	examProfile: HistoryExamProfile;
}

export const HISTORY_GRADE_METADATA: Record<HistoryTrackId, HistoryGradeMeta> = {
	'3ap': {
		grade: '3ap',
		canonicalGrade: '3ap',
		levelId: 'primaire',
		yearId: '3ap',
		yearName: 'السنة الثالثة ابتدائي',
		subjectId: 'HIS-B',
		subjectName: 'التاريخ والجغرافيا',
		yearSubjectId: 596,
		coefficient: 1,
		examDuration: '45 دقيقة',
		examProfile: 'primary_3_4'
	},
	'4ap': {
		grade: '4ap',
		canonicalGrade: '4ap',
		levelId: 'primaire',
		yearId: '4ap',
		yearName: 'السنة الرابعة ابتدائي',
		subjectId: 'HIS-B',
		subjectName: 'التاريخ والجغرافيا',
		yearSubjectId: 603,
		coefficient: 1,
		examDuration: '45 دقيقة',
		examProfile: 'primary_3_4'
	},
	'5ap': {
		grade: '5ap',
		canonicalGrade: '5ap',
		levelId: 'primaire',
		yearId: '5ap',
		yearName: 'السنة الخامسة ابتدائي',
		subjectId: 'HIS-B',
		subjectName: 'التاريخ والجغرافيا',
		yearSubjectId: 611,
		coefficient: 1,
		examDuration: '45 دقيقة',
		examProfile: 'primary_5ap'
	},
	'1am': {
		grade: '1am',
		canonicalGrade: '1am',
		levelId: 'moyen',
		yearId: '1am',
		yearName: 'السنة الأولى متوسط',
		subjectId: 'HIS-B',
		subjectName: 'التاريخ والجغرافيا',
		yearSubjectId: 620,
		coefficient: 2,
		examDuration: '01 ساعة و30 دقيقة',
		examProfile: 'middle'
	},
	'2am': {
		grade: '2am',
		canonicalGrade: '2am',
		levelId: 'moyen',
		yearId: '2am',
		yearName: 'السنة الثانية متوسط',
		subjectId: 'HIS-B',
		subjectName: 'التاريخ والجغرافيا',
		yearSubjectId: 630,
		coefficient: 2,
		examDuration: '01 ساعة و30 دقيقة',
		examProfile: 'middle'
	},
	'3am': {
		grade: '3am',
		canonicalGrade: '3am',
		levelId: 'moyen',
		yearId: '3am',
		yearName: 'السنة الثالثة متوسط',
		subjectId: 'HIS-B',
		subjectName: 'التاريخ والجغرافيا',
		yearSubjectId: 640,
		coefficient: 2,
		examDuration: '01 ساعة و30 دقيقة',
		examProfile: 'middle'
	},
	'4am': {
		grade: '4am',
		canonicalGrade: '4am',
		levelId: 'moyen',
		yearId: '4am',
		yearName: 'السنة الرابعة متوسط (BEM)',
		subjectId: 'HIS-B',
		subjectName: 'التاريخ والجغرافيا',
		yearSubjectId: 650,
		coefficient: 3,
		examDuration: '01 ساعة و30 دقيقة',
		examProfile: 'middle'
	},
	'1as_tcst': {
		grade: '1as_tcst',
		canonicalGrade: '1as',
		levelId: 'secondaire',
		yearId: '1as',
		yearName: 'السنة الأولى ثانوي — جذع مشترك علوم وتكنولوجيا',
		subjectId: 'HIS-SCI',
		subjectName: 'التاريخ والجغرافيا',
		yearSubjectId: 659,
		streamId: 'TCST',
		streamCategory: 'sci',
		streamNameAr: 'جذع مشترك علوم وتكنولوجيا',
		coefficient: 2,
		examDuration: '02 ساعتان',
		examProfile: 'sec_1as_2as'
	},
	'1as_tcl': {
		grade: '1as_tcl',
		canonicalGrade: '1as',
		levelId: 'secondaire',
		yearId: '1as',
		yearName: 'السنة الأولى ثانوي — جذع مشترك آداب',
		subjectId: 'HIS-LP',
		subjectName: 'التاريخ والجغرافيا',
		yearSubjectId: 667,
		streamId: 'TCL',
		streamCategory: 'lp',
		streamNameAr: 'جذع مشترك آداب',
		coefficient: 3,
		examDuration: '02 ساعتان و30 دقيقة',
		examProfile: 'sec_1as_2as'
	},
	'2as_se': {
		grade: '2as_se',
		canonicalGrade: '2as',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — علوم تجريبية',
		subjectId: 'HIS-SCI',
		subjectName: 'التاريخ والجغرافيا',
		yearSubjectId: 677,
		streamId: 'SE',
		streamCategory: 'sci',
		streamNameAr: 'علوم تجريبية',
		coefficient: 2,
		examDuration: '02 ساعتان',
		examProfile: 'sec_1as_2as'
	},
	'2as_math': {
		grade: '2as_math',
		canonicalGrade: '2as',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — رياضيات',
		subjectId: 'HIS-SCI',
		subjectName: 'التاريخ والجغرافيا',
		yearSubjectId: 697,
		streamId: 'MATH',
		streamCategory: 'sci',
		streamNameAr: 'رياضيات',
		coefficient: 2,
		examDuration: '02 ساعتان',
		examProfile: 'sec_1as_2as'
	},
	'2as_tm': {
		grade: '2as_tm',
		canonicalGrade: '2as',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — تقني رياضي',
		subjectId: 'HIS-SCI',
		subjectName: 'التاريخ والجغرافيا',
		yearSubjectId: 716,
		streamId: 'TM',
		streamCategory: 'sci',
		streamNameAr: 'تقني رياضي',
		coefficient: 2,
		examDuration: '02 ساعتان',
		examProfile: 'sec_1as_2as'
	},
	'2as_ge': {
		grade: '2as_ge',
		canonicalGrade: '2as',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — تسيير واقتصاد',
		subjectId: 'HIS-GE',
		subjectName: 'التاريخ والجغرافيا',
		yearSubjectId: 741,
		streamId: 'GE',
		streamCategory: 'ge',
		streamNameAr: 'تسيير واقتصاد',
		coefficient: 4,
		examDuration: '02 ساعتان و30 دقيقة',
		examProfile: 'sec_1as_2as'
	},
	'2as_lp': {
		grade: '2as_lp',
		canonicalGrade: '2as',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — آداب وفلسفة',
		subjectId: 'HIS-LP',
		subjectName: 'التاريخ والجغرافيا',
		yearSubjectId: 763,
		streamId: 'LP',
		streamCategory: 'lp',
		streamNameAr: 'آداب وفلسفة',
		coefficient: 4,
		examDuration: '03 ساعات',
		examProfile: 'sec_1as_2as'
	},
	'2as_le': {
		grade: '2as_le',
		canonicalGrade: '2as',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — لغات أجنبية',
		subjectId: 'HIS-LE',
		subjectName: 'التاريخ والجغرافيا',
		yearSubjectId: 779,
		streamId: 'LE',
		streamCategory: 'le',
		streamNameAr: 'لغات أجنبية',
		coefficient: 2,
		examDuration: '02 ساعتان',
		examProfile: 'sec_1as_2as'
	},
	'3as_se': {
		grade: '3as_se',
		canonicalGrade: '3as',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — علوم تجريبية (BAC)',
		subjectId: 'HIS-SCI',
		subjectName: 'التاريخ والجغرافيا',
		yearSubjectId: 687,
		streamId: 'SE',
		streamCategory: 'sci',
		streamNameAr: 'علوم تجريبية',
		coefficient: 2,
		examDuration: '03 ساعات',
		examProfile: 'sec_3as_bac'
	},
	'3as_math': {
		grade: '3as_math',
		canonicalGrade: '3as',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — رياضيات (BAC)',
		subjectId: 'HIS-SCI',
		subjectName: 'التاريخ والجغرافيا',
		yearSubjectId: 707,
		streamId: 'MATH',
		streamCategory: 'sci',
		streamNameAr: 'رياضيات',
		coefficient: 2,
		examDuration: '03 ساعات',
		examProfile: 'sec_3as_bac'
	},
	'3as_tm': {
		grade: '3as_tm',
		canonicalGrade: '3as',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — تقني رياضي (BAC)',
		subjectId: 'HIS-SCI',
		subjectName: 'التاريخ والجغرافيا',
		yearSubjectId: 729,
		streamId: 'TM',
		streamCategory: 'sci',
		streamNameAr: 'تقني رياضي',
		coefficient: 2,
		examDuration: '03 ساعات',
		examProfile: 'sec_3as_bac'
	},
	'3as_ge': {
		grade: '3as_ge',
		canonicalGrade: '3as',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — تسيير واقتصاد (BAC)',
		subjectId: 'HIS-GE',
		subjectName: 'التاريخ والجغرافيا',
		yearSubjectId: 752,
		streamId: 'GE',
		streamCategory: 'ge',
		streamNameAr: 'تسيير واقتصاد',
		coefficient: 4,
		examDuration: '03 ساعات و30 دقيقة',
		examProfile: 'sec_3as_bac'
	},
	'3as_lp': {
		grade: '3as_lp',
		canonicalGrade: '3as',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — آداب وفلسفة (BAC)',
		subjectId: 'HIS-LP',
		subjectName: 'التاريخ والجغرافيا',
		yearSubjectId: 771,
		streamId: 'LP',
		streamCategory: 'lp',
		streamNameAr: 'آداب وفلسفة',
		coefficient: 4,
		examDuration: '03 ساعات و30 دقيقة',
		examProfile: 'sec_3as_bac'
	},
	'3as_le': {
		grade: '3as_le',
		canonicalGrade: '3as',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — لغات أجنبية (BAC)',
		subjectId: 'HIS-LE',
		subjectName: 'التاريخ والجغرافيا',
		yearSubjectId: 790,
		streamId: 'LE',
		streamCategory: 'le',
		streamNameAr: 'لغات أجنبية',
		coefficient: 2,
		examDuration: '03 ساعات',
		examProfile: 'sec_3as_bac'
	}
};

export const HISTORY_PRIMARY_TRACK_IDS: readonly HistoryPrimaryTrackId[] = ['3ap', '4ap', '5ap'];
export const HISTORY_MIDDLE_TRACK_IDS: readonly HistoryMiddleTrackId[] = ['1am', '2am', '3am', '4am'];
export const HISTORY_SECONDARY_TRACK_IDS: readonly HistorySecondaryTrackId[] = [
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

export const ALL_HISTORY_TRACK_IDS: readonly HistoryTrackId[] = [
	...HISTORY_PRIMARY_TRACK_IDS,
	...HISTORY_MIDDLE_TRACK_IDS,
	...HISTORY_SECONDARY_TRACK_IDS
];

export interface HistoryInteractiveLessonData {
	id: string;
	slug: string;
	grade: HistoryTrackId;
	yearSubjectId: HistoryYearSubjectId;
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

export interface HistoryGeneratedExerciseInstance {
	templateId: string;
	seed: number;
	grade: HistoryTrackId;
	trimesterId: TrimesterId;
	difficulty: Difficulty;
	domain: HistoryDomain;
	titleAr: string;
	onecRole?: HistoryOnecRole;
	quizQuestion: QuizQuestionPayload;
	sujetExercise: ExerciseBlock;
	hints: [string, string, string];
	solutionStepsAr: string[];
	finalAnswer: string;
}

export interface HistoryParameterizedTemplate {
	id: string;
	grade: HistoryTrackId;
	trimesterId: TrimesterId;
	domain: HistoryDomain;
	titleAr: string;
	curriculumLessonId?: string;
	defaultPoints: number;
	isIntegration?: boolean;
	onecRole?: HistoryOnecRole;
	/** Restrict stream-specific topics (e.g. Cold War Crises only for LP/GE in 3AS BAC). */
	allowedStreams?: readonly HistoryStreamCategory[];
	generate(seed: number, difficulty?: Difficulty): HistoryGeneratedExerciseInstance;
}

export function adaptHistoryLessonForTrack(
	base: HistoryInteractiveLessonData,
	targetGrade: HistorySecondaryTrackId
): HistoryInteractiveLessonData {
	const meta = HISTORY_GRADE_METADATA[targetGrade];
	const suffixMatch = base.id.match(/^his_lesson_[a-z0-9_]+_(t[123]_[a-z0-9_]+)$/);
	const tail = suffixMatch
		? suffixMatch[1]
		: `${base.trimesterId}_${base.slug.replace(/[^a-z0-9]+/gi, '_')}`;
	const newId = `his_lesson_${targetGrade}_${tail}`;
	const slugTail = base.slug.replace(
		/^(?:his-)?(?:1as|2as|3as)(?:-(?:tcst|tcl|se|tm|math|ge|lp|le|sci|all))?-/,
		''
	);
	return {
		...base,
		id: newId,
		slug: `his-${targetGrade.replace('_', '-')}-${slugTail}`,
		grade: targetGrade,
		yearSubjectId: meta.yearSubjectId
	};
}

export function adaptHistoryTemplateForTrack(
	base: HistoryParameterizedTemplate,
	targetGrade: HistorySecondaryTrackId
): HistoryParameterizedTemplate {
	const newId = base.id.replace(
		/^his_tpl_(?:1as|2as|3as)(?:_(?:tcst|tcl|se|tm|math|ge|lp|le|sci|all))?_/,
		`his_tpl_${targetGrade}_`
	);
	const resolvedId =
		newId === base.id ? `his_tpl_${targetGrade}_${base.trimesterId}_${base.id}` : newId;
	const adaptedLessonId = base.curriculumLessonId
		? base.curriculumLessonId.replace(
				/^his_lesson_(?:1as|2as|3as)(?:_(?:tcst|tcl|se|tm|math|ge|lp|le|sci|all))?_/,
				`his_lesson_${targetGrade}_`
			)
		: undefined;

	return {
		...base,
		id: resolvedId,
		grade: targetGrade,
		curriculumLessonId: adaptedLessonId,
		generate(seed: number, difficulty: Difficulty = 'medium'): HistoryGeneratedExerciseInstance {
			const out = base.generate(seed, difficulty);
			return {
				...out,
				templateId: resolvedId,
				grade: targetGrade
			};
		}
	};
}
