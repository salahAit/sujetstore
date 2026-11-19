import type { ExerciseBlock, LevelId, TrimesterId } from '../SujetBuilder/types';
import type {
	Difficulty,
	LessonDiscoverStep,
	LessonPracticeQuestion,
	QuizQuestionPayload
} from '../MathTemplates/types';

export type { Difficulty, LessonDiscoverStep, LessonPracticeQuestion, QuizQuestionPayload };

export type ArabicPrimaryTrackId = '1ap' | '2ap' | '3ap' | '4ap' | '5ap';
export type ArabicMiddleTrackId = '1am' | '2am' | '3am' | '4am';
export type ArabicSecondaryTrackId =
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

export type ArabicTrackId =
	| ArabicPrimaryTrackId
	| ArabicMiddleTrackId
	| ArabicSecondaryTrackId;

export type ArabicYearSubjectId =
	| 580 // 1ap ARB-B
	| 585 // 2ap ARB-B
	| 590 // 3ap ARB-B
	| 597 // 4ap ARB-B
	| 605 // 5ap ARB-B
	| 613 // 1am ARB-B
	| 623 // 2am ARB-B
	| 633 // 3am ARB-B
	| 643 // 4am ARB-B (BEM)
	| 653 // 1as ARB-SCI TCST
	| 663 // 1as ARB-LP TCL
	| 671 // 2as ARB-SCI SE
	| 691 // 2as ARB-SCI MATH
	| 711 // 2as ARB-SCI TM
	| 737 // 2as ARB-SCI GE
	| 759 // 2as ARB-LP LP
	| 775 // 2as ARB-LE LE
	| 681 // 3as ARB-SCI SE (BAC)
	| 701 // 3as ARB-SCI MATH (BAC)
	| 724 // 3as ARB-SCI TM (BAC)
	| 748 // 3as ARB-SCI GE (BAC)
	| 767 // 3as ARB-LP LP (BAC)
	| 786; // 3as ARB-LE LE (BAC)

export type ArabicDomain =
	| 'phonics_reading'
	| 'reading_comprehension'
	| 'grammar_irab'
	| 'morphology_sarf'
	| 'spelling_imla'
	| 'rhetoric_balagha'
	| 'prosody_arud'
	| 'literary_criticism'
	| 'written_expression'
	| 'integration';

/**
 * ONEC Arabic exam structural roles:
 * - reading_passage: السند النصي (النثري أو الشعري)
 * - intellectual_building: البناء الفكري (12ن للشعب العلمية، 10ن للآداب واللغات، 6ن للمتوسط، 3-4ن للابتدائي)
 * - linguistic_building: البناء اللغوي (8ن للشعب العلمية، 6ن للآداب واللغات، 6ن للمتوسط، 3ن للابتدائي)
 * - critical_evaluation: التقييم النقدي (4ن لشعبتي آداب وفلسفة ولغات أجنبية فقط)
 * - integration: الوضعية الإدماجية / الإنتاج الكتابي (8ن للمتوسط، 3-4ن للابتدائي)
 */
export type ArabicOnecRole =
	| 'reading_passage'
	| 'intellectual_building'
	| 'linguistic_building'
	| 'critical_evaluation'
	| 'integration';

export type ArabicExamProfile = 'primary_early' | 'primary_mid' | 'primary_5ap' | 'middle' | 'sec_sci' | 'sec_lp' | 'sec_le';

export interface ArabicGradeMeta {
	grade: ArabicTrackId;
	levelId: LevelId;
	yearId: string;
	yearName: string;
	subjectId: 'ARB-B' | 'ARB-SCI' | 'ARB-LP' | 'ARB-LE';
	subjectName: 'اللغة العربية' | 'اللغة العربية وآدابها';
	yearSubjectId: ArabicYearSubjectId;
	streamId?: 'TCST' | 'TCL' | 'SE' | 'TM' | 'MATH' | 'GE' | 'LP' | 'LE';
	streamNameAr?: string;
	coefficient: number;
	examDuration: string;
	hasCriticalEvaluation: boolean;
	examProfile: ArabicExamProfile;
}

export const ARABIC_GRADE_METADATA: Record<ArabicTrackId, ArabicGradeMeta> = {
	'1ap': {
		grade: '1ap',
		levelId: 'primaire',
		yearId: '1ap',
		yearName: 'السنة الأولى ابتدائي',
		subjectId: 'ARB-B',
		subjectName: 'اللغة العربية',
		yearSubjectId: 580,
		coefficient: 1,
		examDuration: '45 دقيقة',
		hasCriticalEvaluation: false,
		examProfile: 'primary_early'
	},
	'2ap': {
		grade: '2ap',
		levelId: 'primaire',
		yearId: '2ap',
		yearName: 'السنة الثانية ابتدائي',
		subjectId: 'ARB-B',
		subjectName: 'اللغة العربية',
		yearSubjectId: 585,
		coefficient: 1,
		examDuration: '45 دقيقة',
		hasCriticalEvaluation: false,
		examProfile: 'primary_early'
	},
	'3ap': {
		grade: '3ap',
		levelId: 'primaire',
		yearId: '3ap',
		yearName: 'السنة الثالثة ابتدائي',
		subjectId: 'ARB-B',
		subjectName: 'اللغة العربية',
		yearSubjectId: 590,
		coefficient: 1,
		examDuration: 'ساعة واحدة',
		hasCriticalEvaluation: false,
		examProfile: 'primary_mid'
	},
	'4ap': {
		grade: '4ap',
		levelId: 'primaire',
		yearId: '4ap',
		yearName: 'السنة الرابعة ابتدائي',
		subjectId: 'ARB-B',
		subjectName: 'اللغة العربية',
		yearSubjectId: 597,
		coefficient: 1,
		examDuration: 'ساعة ونصف',
		hasCriticalEvaluation: false,
		examProfile: 'primary_mid'
	},
	'5ap': {
		grade: '5ap',
		levelId: 'primaire',
		yearId: '5ap',
		yearName: 'السنة الخامسة ابتدائي',
		subjectId: 'ARB-B',
		subjectName: 'اللغة العربية',
		yearSubjectId: 605,
		coefficient: 1,
		examDuration: 'ساعة ونصف',
		hasCriticalEvaluation: false,
		examProfile: 'primary_5ap'
	},
	'1am': {
		grade: '1am',
		levelId: 'moyen',
		yearId: '1am',
		yearName: 'السنة الأولى متوسط',
		subjectId: 'ARB-B',
		subjectName: 'اللغة العربية',
		yearSubjectId: 613,
		coefficient: 2,
		examDuration: 'ساعتان',
		hasCriticalEvaluation: false,
		examProfile: 'middle'
	},
	'2am': {
		grade: '2am',
		levelId: 'moyen',
		yearId: '2am',
		yearName: 'السنة الثانية متوسط',
		subjectId: 'ARB-B',
		subjectName: 'اللغة العربية',
		yearSubjectId: 623,
		coefficient: 2,
		examDuration: 'ساعتان',
		hasCriticalEvaluation: false,
		examProfile: 'middle'
	},
	'3am': {
		grade: '3am',
		levelId: 'moyen',
		yearId: '3am',
		yearName: 'السنة الثالثة متوسط',
		subjectId: 'ARB-B',
		subjectName: 'اللغة العربية',
		yearSubjectId: 633,
		coefficient: 3,
		examDuration: 'ساعتان',
		hasCriticalEvaluation: false,
		examProfile: 'middle'
	},
	'4am': {
		grade: '4am',
		levelId: 'moyen',
		yearId: '4am',
		yearName: 'السنة الرابعة متوسط (BEM)',
		subjectId: 'ARB-B',
		subjectName: 'اللغة العربية',
		yearSubjectId: 643,
		coefficient: 5,
		examDuration: 'ساعتان',
		hasCriticalEvaluation: false,
		examProfile: 'middle'
	},
	'1as_tcst': {
		grade: '1as_tcst',
		levelId: 'secondaire',
		yearId: '1as',
		yearName: 'السنة الأولى ثانوي — جذع مشترك علوم وتكنولوجيا',
		subjectId: 'ARB-SCI',
		subjectName: 'اللغة العربية وآدابها',
		yearSubjectId: 653,
		streamId: 'TCST',
		streamNameAr: 'جذع مشترك علوم وتكنولوجيا',
		coefficient: 3,
		examDuration: 'ساعتان',
		hasCriticalEvaluation: false,
		examProfile: 'sec_sci'
	},
	'1as_tcl': {
		grade: '1as_tcl',
		levelId: 'secondaire',
		yearId: '1as',
		yearName: 'السنة الأولى ثانوي — جذع مشترك آداب',
		subjectId: 'ARB-LP',
		subjectName: 'اللغة العربية وآدابها',
		yearSubjectId: 663,
		streamId: 'TCL',
		streamNameAr: 'جذع مشترك آداب',
		coefficient: 5,
		examDuration: 'ثلاث ساعات',
		hasCriticalEvaluation: true,
		examProfile: 'sec_lp'
	},
	'2as_se': {
		grade: '2as_se',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — علوم تجريبية',
		subjectId: 'ARB-SCI',
		subjectName: 'اللغة العربية وآدابها',
		yearSubjectId: 671,
		streamId: 'SE',
		streamNameAr: 'علوم تجريبية',
		coefficient: 2,
		examDuration: 'ساعتان',
		hasCriticalEvaluation: false,
		examProfile: 'sec_sci'
	},
	'2as_tm': {
		grade: '2as_tm',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — تقني رياضي',
		subjectId: 'ARB-SCI',
		subjectName: 'اللغة العربية وآدابها',
		yearSubjectId: 711,
		streamId: 'TM',
		streamNameAr: 'تقني رياضي',
		coefficient: 2,
		examDuration: 'ساعتان',
		hasCriticalEvaluation: false,
		examProfile: 'sec_sci'
	},
	'2as_math': {
		grade: '2as_math',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — رياضيات',
		subjectId: 'ARB-SCI',
		subjectName: 'اللغة العربية وآدابها',
		yearSubjectId: 691,
		streamId: 'MATH',
		streamNameAr: 'رياضيات',
		coefficient: 2,
		examDuration: 'ساعتان',
		hasCriticalEvaluation: false,
		examProfile: 'sec_sci'
	},
	'2as_ge': {
		grade: '2as_ge',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — تسيير واقتصاد',
		subjectId: 'ARB-SCI',
		subjectName: 'اللغة العربية وآدابها',
		yearSubjectId: 737,
		streamId: 'GE',
		streamNameAr: 'تسيير واقتصاد',
		coefficient: 2,
		examDuration: 'ساعتان',
		hasCriticalEvaluation: false,
		examProfile: 'sec_sci'
	},
	'2as_lp': {
		grade: '2as_lp',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — آداب وفلسفة',
		subjectId: 'ARB-LP',
		subjectName: 'اللغة العربية وآدابها',
		yearSubjectId: 759,
		streamId: 'LP',
		streamNameAr: 'آداب وفلسفة',
		coefficient: 5,
		examDuration: 'ثلاث ساعات ونصف',
		hasCriticalEvaluation: true,
		examProfile: 'sec_lp'
	},
	'2as_le': {
		grade: '2as_le',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — لغات أجنبية',
		subjectId: 'ARB-LE',
		subjectName: 'اللغة العربية وآدابها',
		yearSubjectId: 775,
		streamId: 'LE',
		streamNameAr: 'لغات أجنبية',
		coefficient: 4,
		examDuration: 'ثلاث ساعات',
		hasCriticalEvaluation: true,
		examProfile: 'sec_le'
	},
	'3as_se': {
		grade: '3as_se',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — علوم تجريبية (BAC)',
		subjectId: 'ARB-SCI',
		subjectName: 'اللغة العربية وآدابها',
		yearSubjectId: 681,
		streamId: 'SE',
		streamNameAr: 'علوم تجريبية',
		coefficient: 3,
		examDuration: 'ساعتان و30 دقيقة',
		hasCriticalEvaluation: false,
		examProfile: 'sec_sci'
	},
	'3as_tm': {
		grade: '3as_tm',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — تقني رياضي (BAC)',
		subjectId: 'ARB-SCI',
		subjectName: 'اللغة العربية وآدابها',
		yearSubjectId: 724,
		streamId: 'TM',
		streamNameAr: 'تقني رياضي',
		coefficient: 3,
		examDuration: 'ساعتان و30 دقيقة',
		hasCriticalEvaluation: false,
		examProfile: 'sec_sci'
	},
	'3as_math': {
		grade: '3as_math',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — رياضيات (BAC)',
		subjectId: 'ARB-SCI',
		subjectName: 'اللغة العربية وآدابها',
		yearSubjectId: 701,
		streamId: 'MATH',
		streamNameAr: 'رياضيات',
		coefficient: 3,
		examDuration: 'ساعتان و30 دقيقة',
		hasCriticalEvaluation: false,
		examProfile: 'sec_sci'
	},
	'3as_ge': {
		grade: '3as_ge',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — تسيير واقتصاد (BAC)',
		subjectId: 'ARB-SCI',
		subjectName: 'اللغة العربية وآدابها',
		yearSubjectId: 748,
		streamId: 'GE',
		streamNameAr: 'تسيير واقتصاد',
		coefficient: 3,
		examDuration: 'ساعتان و30 دقيقة',
		hasCriticalEvaluation: false,
		examProfile: 'sec_sci'
	},
	'3as_lp': {
		grade: '3as_lp',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — آداب وفلسفة (BAC)',
		subjectId: 'ARB-LP',
		subjectName: 'اللغة العربية وآدابها',
		yearSubjectId: 767,
		streamId: 'LP',
		streamNameAr: 'آداب وفلسفة',
		coefficient: 6,
		examDuration: '04 ساعات و30 دقيقة',
		hasCriticalEvaluation: true,
		examProfile: 'sec_lp'
	},
	'3as_le': {
		grade: '3as_le',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — لغات أجنبية (BAC)',
		subjectId: 'ARB-LE',
		subjectName: 'اللغة العربية وآدابها',
		yearSubjectId: 786,
		streamId: 'LE',
		streamNameAr: 'لغات أجنبية',
		coefficient: 5,
		examDuration: '04 ساعات',
		hasCriticalEvaluation: true,
		examProfile: 'sec_le'
	}
};

export const ARABIC_PRIMARY_TRACK_IDS: readonly ArabicPrimaryTrackId[] = [
	'1ap',
	'2ap',
	'3ap',
	'4ap',
	'5ap'
];

export const ARABIC_MIDDLE_TRACK_IDS: readonly ArabicMiddleTrackId[] = [
	'1am',
	'2am',
	'3am',
	'4am'
];

export const ARABIC_SECONDARY_TRACK_IDS: readonly ArabicSecondaryTrackId[] = [
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

export const ALL_ARABIC_TRACK_IDS: readonly ArabicTrackId[] = [
	...ARABIC_PRIMARY_TRACK_IDS,
	...ARABIC_MIDDLE_TRACK_IDS,
	...ARABIC_SECONDARY_TRACK_IDS
];

export interface ArabicInteractiveLessonData {
	id: string;
	slug: string;
	grade: ArabicTrackId;
	yearSubjectId: ArabicYearSubjectId;
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

export interface ArabicGeneratedExerciseInstance {
	templateId: string;
	seed: number;
	grade: ArabicTrackId;
	trimesterId: TrimesterId;
	difficulty: Difficulty;
	domain: ArabicDomain;
	titleAr: string;
	onecRole?: ArabicOnecRole;
	/** Optional exam passage text & metadata attached to comprehensive subject templates */
	passageKind?: 'prose' | 'poetry';
	quizQuestion: QuizQuestionPayload;
	sujetExercise: ExerciseBlock;
	hints: [string, string, string];
	solutionStepsAr: string[];
	finalAnswer: string;
}

export interface ArabicParameterizedTemplate {
	id: string;
	grade: ArabicTrackId;
	trimesterId: TrimesterId;
	domain: ArabicDomain;
	titleAr: string;
	curriculumLessonId?: string;
	defaultPoints: number;
	isIntegration?: boolean;
	onecRole?: ArabicOnecRole;
	/** For full-subject templates that carry a reading passage + intellectual/linguistic/critical/integration parts */
	isFullSubjectPack?: boolean;
	generate(seed: number, difficulty?: Difficulty): ArabicGeneratedExerciseInstance;
}

/**
 * Adapts a shared scientific/management Arabic lesson (e.g. 2as_se or 3as_se canonical pool)
 * into a target track (`2as_tm`, `2as_math`, `2as_ge`, `3as_tm`, `3as_math`, `3as_ge`).
 */
export function adaptArabicLessonForTrack(
	base: ArabicInteractiveLessonData,
	targetGrade: ArabicSecondaryTrackId,
	idSuffix?: string
): ArabicInteractiveLessonData {
	const meta = ARABIC_GRADE_METADATA[targetGrade];
	const suffixMatch = base.id.match(/^arb_lesson_[a-z0-9_]+_(t[123]_[a-z0-9_]+)$/);
	const tail = idSuffix || (suffixMatch ? suffixMatch[1] : `${base.trimesterId}_${base.slug}`);
	const cleanTail = tail.replace(/^t[123]_/, `${base.trimesterId}_`);
	const newId = `arb_lesson_${targetGrade}_${cleanTail}`;
	const slugTail = base.slug.replace(
		/^(?:arb-)?(?:1as-tcst|1as-tcl|2as-se|2as-tm|2as-math|2as-ge|2as-lp|2as-le|3as-se|3as-tm|3as-math|3as-ge|3as-lp|3as-le|2as-sci|3as-sci)-/,
		''
	);
	return {
		...base,
		id: newId,
		slug: `arb-${targetGrade.replace('_', '-')}-${slugTail}`,
		grade: targetGrade,
		yearSubjectId: meta.yearSubjectId
	};
}

/**
 * Adapts a shared scientific/management Arabic template into a target track.
 */
export function adaptArabicTemplateForTrack(
	base: ArabicParameterizedTemplate,
	targetGrade: ArabicSecondaryTrackId
): ArabicParameterizedTemplate {
	const newId = base.id.replace(
		/^arb_tpl_(?:2as_sci|3as_sci|2as_se|3as_se|2as_lp|3as_lp)_/,
		`arb_tpl_${targetGrade}_`
	);
	const resolvedId =
		newId === base.id ? `arb_tpl_${targetGrade}_${base.trimesterId}_${base.id}` : newId;
	const adaptedLessonId = base.curriculumLessonId
		? base.curriculumLessonId.replace(
				/^arb_lesson_(?:2as_sci|3as_sci|2as_se|3as_se|2as_lp|3as_lp)_/,
				`arb_lesson_${targetGrade}_`
			)
		: undefined;
	return {
		...base,
		id: resolvedId,
		grade: targetGrade,
		curriculumLessonId: adaptedLessonId,
		generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
			const out = base.generate(seed, difficulty);
			return {
				...out,
				templateId: resolvedId,
				grade: targetGrade
			};
		}
	};
}
