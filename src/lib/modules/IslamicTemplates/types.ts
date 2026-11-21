import type { ExerciseBlock, LevelId, TrimesterId } from '../SujetBuilder/types';
import type {
	Difficulty,
	LessonDiscoverStep,
	LessonPracticeQuestion,
	QuizQuestionPayload
} from '../MathTemplates/types';

export type { Difficulty, LessonDiscoverStep, LessonPracticeQuestion, QuizQuestionPayload };

export type IslamicPrimaryTrackId = '1ap' | '2ap' | '3ap' | '4ap' | '5ap';
export type IslamicMiddleTrackId = '1am' | '2am' | '3am' | '4am';
export type IslamicSecondaryTrackId =
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

export type IslamicTrackId =
	| IslamicPrimaryTrackId
	| IslamicMiddleTrackId
	| IslamicSecondaryTrackId;

/** Canonical non-duplicated grade modules (12 pools mapped onto all 23 tracks). */
export type IslamicCanonicalGradeId =
	| '1ap'
	| '2ap'
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

export type IslamicYearSubjectId =
	| 583 // 1ap ISL-B
	| 588 // 2ap ISL-B
	| 593 // 3ap ISL-B
	| 600 // 4ap ISL-B
	| 608 // 5ap ISL-B
	| 619 // 1am ISL-B
	| 629 // 2am ISL-B
	| 639 // 3am ISL-B
	| 649 // 4am ISL-B (BEM)
	| 660 // 1as ISL-ALL TCST
	| 668 // 1as ISL-ALL TCL
	| 678 // 2as ISL-ALL SE
	| 698 // 2as ISL-ALL MATH
	| 717 // 2as ISL-ALL TM
	| 742 // 2as ISL-ALL GE
	| 764 // 2as ISL-ALL LP
	| 780 // 2as ISL-ALL LE
	| 688 // 3as ISL-ALL SE (BAC)
	| 708 // 3as ISL-ALL MATH (BAC)
	| 730 // 3as ISL-ALL TM (BAC)
	| 753 // 3as ISL-ALL GE (BAC)
	| 772 // 3as ISL-ALL LP (BAC)
	| 791; // 3as ISL-ALL LE (BAC)

export type IslamicDomain =
	| 'quran_tafsir'
	| 'hadith'
	| 'aqeedah'
	| 'fiqh_ibadat'
	| 'fiqh_muamalat'
	| 'usul_maqasid'
	| 'seerah'
	| 'akhlaq'
	| 'integration';

/**
 * ONEC Islamic Education & Sciences exam structural roles:
 * - part1_knowledge: الجزء الأول / الوضعية الأولى (قرآن، حديث، عقيدة) — الابتدائي (3ن) والمتوسط (6ن)
 * - part2_application: الجزء الثاني / الوضعية الثانية (فقه، سيرة، أخلاق وتطبيقات) — الابتدائي (3ن) والمتوسط (6ن)
 * - integration: الوضعية الإدماجية (الابتدائي 4ن، المتوسط/BEM 8ن)
 * - bac_part1: الجزء الأول للثانوي والبكالوريا (12 نقطة: سند قرآني/نبوي + 5 أسئلة منظمة)
 * - bac_part2: الجزء الثاني للثانوي والبكالوريا (08 نقاط: سند/حالة فقهية أو أصولية + 3–4 أسئلة تحليلية)
 */
export type IslamicOnecRole =
	| 'part1_knowledge'
	| 'part2_application'
	| 'integration'
	| 'bac_part1'
	| 'bac_part2';

export type IslamicExamProfile =
	| 'primary_early'
	| 'primary_mid'
	| 'primary_5ap'
	| 'middle'
	| 'sec_1as_2as'
	| 'sec_3as_bac';

export interface IslamicGradeMeta {
	grade: IslamicTrackId;
	canonicalGrade: IslamicCanonicalGradeId;
	levelId: LevelId;
	yearId: string;
	yearName: string;
	subjectId: 'ISL-B' | 'ISL-ALL';
	subjectName: 'التربية الإسلامية' | 'العلوم الإسلامية';
	yearSubjectId: IslamicYearSubjectId;
	streamId?: 'TCST' | 'TCL' | 'SE' | 'TM' | 'MATH' | 'GE' | 'LP' | 'LE';
	streamNameAr?: string;
	coefficient: number;
	examDuration: string;
	examProfile: IslamicExamProfile;
}

export const ISLAMIC_GRADE_METADATA: Record<IslamicTrackId, IslamicGradeMeta> = {
	'1ap': {
		grade: '1ap',
		canonicalGrade: '1ap',
		levelId: 'primaire',
		yearId: '1ap',
		yearName: 'السنة الأولى ابتدائي',
		subjectId: 'ISL-B',
		subjectName: 'التربية الإسلامية',
		yearSubjectId: 583,
		coefficient: 1,
		examDuration: '45 دقيقة',
		examProfile: 'primary_early'
	},
	'2ap': {
		grade: '2ap',
		canonicalGrade: '2ap',
		levelId: 'primaire',
		yearId: '2ap',
		yearName: 'السنة الثانية ابتدائي',
		subjectId: 'ISL-B',
		subjectName: 'التربية الإسلامية',
		yearSubjectId: 588,
		coefficient: 1,
		examDuration: '45 دقيقة',
		examProfile: 'primary_early'
	},
	'3ap': {
		grade: '3ap',
		canonicalGrade: '3ap',
		levelId: 'primaire',
		yearId: '3ap',
		yearName: 'السنة الثالثة ابتدائي',
		subjectId: 'ISL-B',
		subjectName: 'التربية الإسلامية',
		yearSubjectId: 593,
		coefficient: 1,
		examDuration: '45 دقيقة',
		examProfile: 'primary_mid'
	},
	'4ap': {
		grade: '4ap',
		canonicalGrade: '4ap',
		levelId: 'primaire',
		yearId: '4ap',
		yearName: 'السنة الرابعة ابتدائي',
		subjectId: 'ISL-B',
		subjectName: 'التربية الإسلامية',
		yearSubjectId: 600,
		coefficient: 1,
		examDuration: '45 دقيقة',
		examProfile: 'primary_mid'
	},
	'5ap': {
		grade: '5ap',
		canonicalGrade: '5ap',
		levelId: 'primaire',
		yearId: '5ap',
		yearName: 'السنة الخامسة ابتدائي',
		subjectId: 'ISL-B',
		subjectName: 'التربية الإسلامية',
		yearSubjectId: 608,
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
		subjectId: 'ISL-B',
		subjectName: 'التربية الإسلامية',
		yearSubjectId: 619,
		coefficient: 1,
		examDuration: '01 ساعة',
		examProfile: 'middle'
	},
	'2am': {
		grade: '2am',
		canonicalGrade: '2am',
		levelId: 'moyen',
		yearId: '2am',
		yearName: 'السنة الثانية متوسط',
		subjectId: 'ISL-B',
		subjectName: 'التربية الإسلامية',
		yearSubjectId: 629,
		coefficient: 1,
		examDuration: '01 ساعة',
		examProfile: 'middle'
	},
	'3am': {
		grade: '3am',
		canonicalGrade: '3am',
		levelId: 'moyen',
		yearId: '3am',
		yearName: 'السنة الثالثة متوسط',
		subjectId: 'ISL-B',
		subjectName: 'التربية الإسلامية',
		yearSubjectId: 639,
		coefficient: 1,
		examDuration: '01 ساعة',
		examProfile: 'middle'
	},
	'4am': {
		grade: '4am',
		canonicalGrade: '4am',
		levelId: 'moyen',
		yearId: '4am',
		yearName: 'السنة الرابعة متوسط (BEM)',
		subjectId: 'ISL-B',
		subjectName: 'التربية الإسلامية',
		yearSubjectId: 649,
		coefficient: 2,
		examDuration: '01 ساعة',
		examProfile: 'middle'
	},
	'1as_tcst': {
		grade: '1as_tcst',
		canonicalGrade: '1as',
		levelId: 'secondaire',
		yearId: '1as',
		yearName: 'السنة الأولى ثانوي — جذع مشترك علوم وتكنولوجيا',
		subjectId: 'ISL-ALL',
		subjectName: 'العلوم الإسلامية',
		yearSubjectId: 660,
		streamId: 'TCST',
		streamNameAr: 'جذع مشترك علوم وتكنولوجيا',
		coefficient: 2,
		examDuration: '02 ساعة',
		examProfile: 'sec_1as_2as'
	},
	'1as_tcl': {
		grade: '1as_tcl',
		canonicalGrade: '1as',
		levelId: 'secondaire',
		yearId: '1as',
		yearName: 'السنة الأولى ثانوي — جذع مشترك آداب',
		subjectId: 'ISL-ALL',
		subjectName: 'العلوم الإسلامية',
		yearSubjectId: 668,
		streamId: 'TCL',
		streamNameAr: 'جذع مشترك آداب',
		coefficient: 2,
		examDuration: '02 ساعة',
		examProfile: 'sec_1as_2as'
	},
	'2as_se': {
		grade: '2as_se',
		canonicalGrade: '2as',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — علوم تجريبية',
		subjectId: 'ISL-ALL',
		subjectName: 'العلوم الإسلامية',
		yearSubjectId: 678,
		streamId: 'SE',
		streamNameAr: 'علوم تجريبية',
		coefficient: 2,
		examDuration: '02 ساعة',
		examProfile: 'sec_1as_2as'
	},
	'2as_tm': {
		grade: '2as_tm',
		canonicalGrade: '2as',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — تقني رياضي',
		subjectId: 'ISL-ALL',
		subjectName: 'العلوم الإسلامية',
		yearSubjectId: 717,
		streamId: 'TM',
		streamNameAr: 'تقني رياضي',
		coefficient: 2,
		examDuration: '02 ساعة',
		examProfile: 'sec_1as_2as'
	},
	'2as_math': {
		grade: '2as_math',
		canonicalGrade: '2as',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — رياضيات',
		subjectId: 'ISL-ALL',
		subjectName: 'العلوم الإسلامية',
		yearSubjectId: 698,
		streamId: 'MATH',
		streamNameAr: 'رياضيات',
		coefficient: 2,
		examDuration: '02 ساعة',
		examProfile: 'sec_1as_2as'
	},
	'2as_ge': {
		grade: '2as_ge',
		canonicalGrade: '2as',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — تسيير واقتصاد',
		subjectId: 'ISL-ALL',
		subjectName: 'العلوم الإسلامية',
		yearSubjectId: 742,
		streamId: 'GE',
		streamNameAr: 'تسيير واقتصاد',
		coefficient: 2,
		examDuration: '02 ساعة',
		examProfile: 'sec_1as_2as'
	},
	'2as_lp': {
		grade: '2as_lp',
		canonicalGrade: '2as',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — آداب وفلسفة',
		subjectId: 'ISL-ALL',
		subjectName: 'العلوم الإسلامية',
		yearSubjectId: 764,
		streamId: 'LP',
		streamNameAr: 'آداب وفلسفة',
		coefficient: 2,
		examDuration: '02 ساعة',
		examProfile: 'sec_1as_2as'
	},
	'2as_le': {
		grade: '2as_le',
		canonicalGrade: '2as',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — لغات أجنبية',
		subjectId: 'ISL-ALL',
		subjectName: 'العلوم الإسلامية',
		yearSubjectId: 780,
		streamId: 'LE',
		streamNameAr: 'لغات أجنبية',
		coefficient: 2,
		examDuration: '02 ساعة',
		examProfile: 'sec_1as_2as'
	},
	'3as_se': {
		grade: '3as_se',
		canonicalGrade: '3as',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — علوم تجريبية (BAC)',
		subjectId: 'ISL-ALL',
		subjectName: 'العلوم الإسلامية',
		yearSubjectId: 688,
		streamId: 'SE',
		streamNameAr: 'علوم تجريبية',
		coefficient: 2,
		examDuration: '02 ساعة و30 دقيقة',
		examProfile: 'sec_3as_bac'
	},
	'3as_tm': {
		grade: '3as_tm',
		canonicalGrade: '3as',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — تقني رياضي (BAC)',
		subjectId: 'ISL-ALL',
		subjectName: 'العلوم الإسلامية',
		yearSubjectId: 730,
		streamId: 'TM',
		streamNameAr: 'تقني رياضي',
		coefficient: 2,
		examDuration: '02 ساعة و30 دقيقة',
		examProfile: 'sec_3as_bac'
	},
	'3as_math': {
		grade: '3as_math',
		canonicalGrade: '3as',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — رياضيات (BAC)',
		subjectId: 'ISL-ALL',
		subjectName: 'العلوم الإسلامية',
		yearSubjectId: 708,
		streamId: 'MATH',
		streamNameAr: 'رياضيات',
		coefficient: 2,
		examDuration: '02 ساعة و30 دقيقة',
		examProfile: 'sec_3as_bac'
	},
	'3as_ge': {
		grade: '3as_ge',
		canonicalGrade: '3as',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — تسيير واقتصاد (BAC)',
		subjectId: 'ISL-ALL',
		subjectName: 'العلوم الإسلامية',
		yearSubjectId: 753,
		streamId: 'GE',
		streamNameAr: 'تسيير واقتصاد',
		coefficient: 2,
		examDuration: '02 ساعة و30 دقيقة',
		examProfile: 'sec_3as_bac'
	},
	'3as_lp': {
		grade: '3as_lp',
		canonicalGrade: '3as',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — آداب وفلسفة (BAC)',
		subjectId: 'ISL-ALL',
		subjectName: 'العلوم الإسلامية',
		yearSubjectId: 772,
		streamId: 'LP',
		streamNameAr: 'آداب وفلسفة',
		coefficient: 2,
		examDuration: '02 ساعة و30 دقيقة',
		examProfile: 'sec_3as_bac'
	},
	'3as_le': {
		grade: '3as_le',
		canonicalGrade: '3as',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — لغات أجنبية (BAC)',
		subjectId: 'ISL-ALL',
		subjectName: 'العلوم الإسلامية',
		yearSubjectId: 791,
		streamId: 'LE',
		streamNameAr: 'لغات أجنبية',
		coefficient: 2,
		examDuration: '02 ساعة و30 دقيقة',
		examProfile: 'sec_3as_bac'
	}
};

export const ISLAMIC_PRIMARY_TRACK_IDS: readonly IslamicPrimaryTrackId[] = [
	'1ap',
	'2ap',
	'3ap',
	'4ap',
	'5ap'
];

export const ISLAMIC_MIDDLE_TRACK_IDS: readonly IslamicMiddleTrackId[] = [
	'1am',
	'2am',
	'3am',
	'4am'
];

export const ISLAMIC_SECONDARY_TRACK_IDS: readonly IslamicSecondaryTrackId[] = [
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

export const ALL_ISLAMIC_TRACK_IDS: readonly IslamicTrackId[] = [
	...ISLAMIC_PRIMARY_TRACK_IDS,
	...ISLAMIC_MIDDLE_TRACK_IDS,
	...ISLAMIC_SECONDARY_TRACK_IDS
];

export interface IslamicInteractiveLessonData {
	id: string;
	slug: string;
	grade: IslamicTrackId;
	yearSubjectId: IslamicYearSubjectId;
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

export interface IslamicGeneratedExerciseInstance {
	templateId: string;
	seed: number;
	grade: IslamicTrackId;
	trimesterId: TrimesterId;
	difficulty: Difficulty;
	domain: IslamicDomain;
	titleAr: string;
	onecRole?: IslamicOnecRole;
	quizQuestion: QuizQuestionPayload;
	sujetExercise: ExerciseBlock;
	hints: [string, string, string];
	solutionStepsAr: string[];
	finalAnswer: string;
}

export interface IslamicParameterizedTemplate {
	id: string;
	grade: IslamicTrackId;
	trimesterId: TrimesterId;
	domain: IslamicDomain;
	titleAr: string;
	curriculumLessonId?: string;
	defaultPoints: number;
	isIntegration?: boolean;
	onecRole?: IslamicOnecRole;
	generate(seed: number, difficulty?: Difficulty): IslamicGeneratedExerciseInstance;
}

/**
 * Projects a canonical secondary Islamic Sciences lesson (`1as`, `2as`, or `3as` unified pool)
 * onto any target secondary stream track with unique id, slug, and yearSubjectId.
 */
export function adaptIslamicLessonForTrack(
	base: IslamicInteractiveLessonData,
	targetGrade: IslamicSecondaryTrackId
): IslamicInteractiveLessonData {
	const meta = ISLAMIC_GRADE_METADATA[targetGrade];
	const suffixMatch = base.id.match(/^isl_lesson_[a-z0-9_]+_(t[123]_[a-z0-9_]+)$/);
	const tail = suffixMatch ? suffixMatch[1] : `${base.trimesterId}_${base.slug.replace(/[^a-z0-9]+/gi, '_')}`;
	const newId = `isl_lesson_${targetGrade}_${tail}`;
	const slugTail = base.slug.replace(
		/^(?:isl-)?(?:1as|2as|3as)(?:-(?:tcst|tcl|se|tm|math|ge|lp|le|all))?-/,
		''
	);
	return {
		...base,
		id: newId,
		slug: `isl-${targetGrade.replace('_', '-')}-${slugTail}`,
		grade: targetGrade,
		yearSubjectId: meta.yearSubjectId
	};
}

/**
 * Projects a canonical secondary Islamic Sciences template (`1as`, `2as`, or `3as` unified pool)
 * onto any target secondary stream track with unique templateId and lesson link.
 */
export function adaptIslamicTemplateForTrack(
	base: IslamicParameterizedTemplate,
	targetGrade: IslamicSecondaryTrackId
): IslamicParameterizedTemplate {
	const newId = base.id.replace(
		/^isl_tpl_(?:1as|2as|3as)(?:_(?:tcst|tcl|se|tm|math|ge|lp|le|all))?_/,
		`isl_tpl_${targetGrade}_`
	);
	const resolvedId =
		newId === base.id ? `isl_tpl_${targetGrade}_${base.trimesterId}_${base.id}` : newId;
	const adaptedLessonId = base.curriculumLessonId
		? base.curriculumLessonId.replace(
				/^isl_lesson_(?:1as|2as|3as)(?:_(?:tcst|tcl|se|tm|math|ge|lp|le|all))?_/,
				`isl_lesson_${targetGrade}_`
			)
		: undefined;

	return {
		...base,
		id: resolvedId,
		grade: targetGrade,
		curriculumLessonId: adaptedLessonId,
		generate(seed: number, difficulty: Difficulty = 'medium'): IslamicGeneratedExerciseInstance {
			const out = base.generate(seed, difficulty);
			return {
				...out,
				templateId: resolvedId,
				grade: targetGrade
			};
		}
	};
}
