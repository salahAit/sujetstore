import type { ExerciseBlock, LevelId, TrimesterId } from '../SujetBuilder/types';
import type {
	Difficulty,
	LessonDiscoverStep,
	LessonPracticeQuestion,
	QuizQuestionPayload
} from '../MathTemplates/types';

export type { Difficulty, LessonDiscoverStep, LessonPracticeQuestion, QuizQuestionPayload };

/** In Algeria, French officially starts in 3AP (3AP, 4AP, 5AP + 5AP Évaluation des Acquis), followed by 1AM-4AM BEM and 1AS-3AS BAC */
export type FrenchPrimaryTrackId = '3ap' | '4ap' | '5ap';
export type FrenchMiddleTrackId = '1am' | '2am' | '3am' | '4am';
export type FrenchSecondaryTrackId =
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

export type FrenchTrackId =
	| FrenchPrimaryTrackId
	| FrenchMiddleTrackId
	| FrenchSecondaryTrackId;

/** Exact existing year_subjects.id rows in content.db (1ap=582 & 2ap=587 stay hidden per Algerian official curriculum) */
export type FrenchYearSubjectId =
	| 592 // 3ap FRE-B
	| 599 // 4ap FRE-B
	| 607 // 5ap FRE-B
	| 615 // 1am FRE-B
	| 625 // 2am FRE-B
	| 635 // 3am FRE-B
	| 645 // 4am FRE-B (BEM)
	| 657 // 1as FRE-SEC TCST
	| 665 // 1as FRE-SEC TCL
	| 675 // 2as FRE-SEC SE
	| 695 // 2as FRE-SEC MATH
	| 714 // 2as FRE-SEC TM
	| 739 // 2as FRE-SEC GE
	| 761 // 2as FRE-SEC LP
	| 777 // 2as FRE-SEC LE
	| 685 // 3as FRE-SEC SE (BAC)
	| 705 // 3as FRE-SEC MATH (BAC)
	| 727 // 3as FRE-SEC TM (BAC)
	| 750 // 3as FRE-SEC GE (BAC)
	| 769 // 3as FRE-SEC LP (BAC)
	| 788; // 3as FRE-SEC LE (BAC)

export type FrenchDomain =
	| 'phonetique_lecture'
	| 'comprehension_ecrit'
	| 'vocabulaire_lexique'
	| 'grammaire_syntaxe'
	| 'conjugaison_temps'
	| 'orthographe_accords'
	| 'discours_rhetorique'
	| 'production_ecrite';

/**
 * Official Algerian French exam structural roles:
 * - Primary (10 pts): comprehension (4) + fonctionnement_langue (3) + production_ecrite (3)
 * - Middle / BEM (20 pts): comprehension (7) + fonctionnement_langue (6) [= 13 pts Compréhension de l'écrit] + production_ecrite (7)
 * - Secondary / BAC Sci & GE (20 pts): comprehension (7) + fonctionnement_langue (7) [= 14 pts Compréhension de l'écrit] + production_ecrite (6)
 * - Secondary / BAC LP (20 pts): comprehension (7) + fonctionnement_langue (6) [= 13 pts Compréhension de l'écrit] + production_ecrite (7)
 * - Secondary / BAC LE (20 pts): comprehension (6) + fonctionnement_langue (6) [= 12 pts Compréhension de l'écrit] + production_ecrite (8)
 */
export type FrenchExamRole =
	| 'comprehension'
	| 'text_exploration'
	| 'written_expression';

export interface FrenchGradeMeta {
	grade: FrenchTrackId;
	levelId: LevelId;
	yearId: string;
	yearNameAr: string;
	yearNameFr: string;
	subjectId: 'FRE-B' | 'FRE-SEC';
	subjectNameAr: 'اللغة الفرنسية';
	yearSubjectId: FrenchYearSubjectId;
	streamId?: 'TCST' | 'TCL' | 'SE' | 'TM' | 'MATH' | 'GE' | 'LP' | 'LE';
	streamNameAr?: string;
	streamNameFr?: string;
	coefficient: number;
	examDurationFr: string;
	pointsSplit: readonly [number, number, number]; // [Compréhension, Fonctionnement de la langue, Production écrite]
}

export const FRENCH_GRADE_METADATA: Record<FrenchTrackId, FrenchGradeMeta> = {
	'3ap': {
		grade: '3ap',
		levelId: 'primaire',
		yearId: '3ap',
		yearNameAr: 'السنة الثالثة ابتدائي',
		yearNameFr: '3e Année Primaire (3AP)',
		subjectId: 'FRE-B',
		subjectNameAr: 'اللغة الفرنسية',
		yearSubjectId: 592,
		coefficient: 1,
		examDurationFr: '45 min',
		pointsSplit: [4, 3, 3]
	},
	'4ap': {
		grade: '4ap',
		levelId: 'primaire',
		yearId: '4ap',
		yearNameAr: 'السنة الرابعة ابتدائي',
		yearNameFr: '4e Année Primaire (4AP)',
		subjectId: 'FRE-B',
		subjectNameAr: 'اللغة الفرنسية',
		yearSubjectId: 599,
		coefficient: 1,
		examDurationFr: '45 min',
		pointsSplit: [4, 3, 3]
	},
	'5ap': {
		grade: '5ap',
		levelId: 'primaire',
		yearId: '5ap',
		yearNameAr: 'السنة الخامسة ابتدائي',
		yearNameFr: '5e Année Primaire (5AP)',
		subjectId: 'FRE-B',
		subjectNameAr: 'اللغة الفرنسية',
		yearSubjectId: 607,
		coefficient: 1,
		examDurationFr: '01 h 00',
		pointsSplit: [4, 3, 3]
	},
	'1am': {
		grade: '1am',
		levelId: 'moyen',
		yearId: '1am',
		yearNameAr: 'السنة الأولى متوسط',
		yearNameFr: '1re Année Moyenne (1AM)',
		subjectId: 'FRE-B',
		subjectNameAr: 'اللغة الفرنسية',
		yearSubjectId: 615,
		coefficient: 1,
		examDurationFr: '01 h 30',
		pointsSplit: [7, 6, 7]
	},
	'2am': {
		grade: '2am',
		levelId: 'moyen',
		yearId: '2am',
		yearNameAr: 'السنة الثانية متوسط',
		yearNameFr: '2e Année Moyenne (2AM)',
		subjectId: 'FRE-B',
		subjectNameAr: 'اللغة الفرنسية',
		yearSubjectId: 625,
		coefficient: 2,
		examDurationFr: '01 h 30',
		pointsSplit: [7, 6, 7]
	},
	'3am': {
		grade: '3am',
		levelId: 'moyen',
		yearId: '3am',
		yearNameAr: 'السنة الثالثة متوسط',
		yearNameFr: '3e Année Moyenne (3AM)',
		subjectId: 'FRE-B',
		subjectNameAr: 'اللغة الفرنسية',
		yearSubjectId: 635,
		coefficient: 2,
		examDurationFr: '01 h 30',
		pointsSplit: [7, 6, 7]
	},
	'4am': {
		grade: '4am',
		levelId: 'moyen',
		yearId: '4am',
		yearNameAr: 'السنة الرابعة متوسط (BEM)',
		yearNameFr: '4e Année Moyenne (4AM / BEM)',
		subjectId: 'FRE-B',
		subjectNameAr: 'اللغة الفرنسية',
		yearSubjectId: 645,
		coefficient: 3,
		examDurationFr: '02 h 00',
		pointsSplit: [7, 6, 7]
	},
	'1as_tcst': {
		grade: '1as_tcst',
		levelId: 'secondaire',
		yearId: '1as',
		yearNameAr: 'السنة الأولى ثانوي — جذع مشترك علوم وتكنولوجيا',
		yearNameFr: '1re Année Secondaire (1AS)',
		subjectId: 'FRE-SEC',
		subjectNameAr: 'اللغة الفرنسية',
		yearSubjectId: 657,
		streamId: 'TCST',
		streamNameAr: 'جذع مشترك علوم وتكنولوجيا',
		streamNameFr: 'Tronc Commun Sciences et Technologie',
		coefficient: 2,
		examDurationFr: '02 h 00',
		pointsSplit: [7, 7, 6]
	},
	'1as_tcl': {
		grade: '1as_tcl',
		levelId: 'secondaire',
		yearId: '1as',
		yearNameAr: 'السنة الأولى ثانوي — جذع مشترك آداب',
		yearNameFr: '1re Année Secondaire (1AS)',
		subjectId: 'FRE-SEC',
		subjectNameAr: 'اللغة الفرنسية',
		yearSubjectId: 665,
		streamId: 'TCL',
		streamNameAr: 'جذع مشترك آداب',
		streamNameFr: 'Tronc Commun Lettres',
		coefficient: 3,
		examDurationFr: '02 h 00',
		pointsSplit: [7, 6, 7]
	},
	'2as_se': {
		grade: '2as_se',
		levelId: 'secondaire',
		yearId: '2as',
		yearNameAr: 'السنة الثانية ثانوي — علوم تجريبية',
		yearNameFr: '2e Année Secondaire (2AS)',
		subjectId: 'FRE-SEC',
		subjectNameAr: 'اللغة الفرنسية',
		yearSubjectId: 675,
		streamId: 'SE',
		streamNameAr: 'علوم تجريبية',
		streamNameFr: 'Sciences Expérimentales',
		coefficient: 2,
		examDurationFr: '02 h 00',
		pointsSplit: [7, 7, 6]
	},
	'2as_tm': {
		grade: '2as_tm',
		levelId: 'secondaire',
		yearId: '2as',
		yearNameAr: 'السنة الثانية ثانوي — تقني رياضي',
		yearNameFr: '2e Année Secondaire (2AS)',
		subjectId: 'FRE-SEC',
		subjectNameAr: 'اللغة الفرنسية',
		yearSubjectId: 714,
		streamId: 'TM',
		streamNameAr: 'تقني رياضي',
		streamNameFr: 'Techniques Mathématiques',
		coefficient: 2,
		examDurationFr: '02 h 00',
		pointsSplit: [7, 7, 6]
	},
	'2as_math': {
		grade: '2as_math',
		levelId: 'secondaire',
		yearId: '2as',
		yearNameAr: 'السنة الثانية ثانوي — رياضيات',
		yearNameFr: '2e Année Secondaire (2AS)',
		subjectId: 'FRE-SEC',
		subjectNameAr: 'اللغة الفرنسية',
		yearSubjectId: 695,
		streamId: 'MATH',
		streamNameAr: 'رياضيات',
		streamNameFr: 'Mathématiques',
		coefficient: 2,
		examDurationFr: '02 h 00',
		pointsSplit: [7, 7, 6]
	},
	'2as_ge': {
		grade: '2as_ge',
		levelId: 'secondaire',
		yearId: '2as',
		yearNameAr: 'السنة الثانية ثانوي — تسيير واقتصاد',
		yearNameFr: '2e Année Secondaire (2AS)',
		subjectId: 'FRE-SEC',
		subjectNameAr: 'اللغة الفرنسية',
		yearSubjectId: 739,
		streamId: 'GE',
		streamNameAr: 'تسيير واقتصاد',
		streamNameFr: 'Gestion et Économie',
		coefficient: 2,
		examDurationFr: '02 h 00',
		pointsSplit: [7, 7, 6]
	},
	'2as_lp': {
		grade: '2as_lp',
		levelId: 'secondaire',
		yearId: '2as',
		yearNameAr: 'السنة الثانية ثانوي — آداب وفلسفة',
		yearNameFr: '2e Année Secondaire (2AS)',
		subjectId: 'FRE-SEC',
		subjectNameAr: 'اللغة الفرنسية',
		yearSubjectId: 761,
		streamId: 'LP',
		streamNameAr: 'آداب وفلسفة',
		streamNameFr: 'Lettres et Philosophie',
		coefficient: 3,
		examDurationFr: '02 h 00',
		pointsSplit: [7, 6, 7]
	},
	'2as_le': {
		grade: '2as_le',
		levelId: 'secondaire',
		yearId: '2as',
		yearNameAr: 'السنة الثانية ثانوي — لغات أجنبية',
		yearNameFr: '2e Année Secondaire (2AS)',
		subjectId: 'FRE-SEC',
		subjectNameAr: 'اللغة الفرنسية',
		yearSubjectId: 777,
		streamId: 'LE',
		streamNameAr: 'لغات أجنبية',
		streamNameFr: 'Langues Étrangères',
		coefficient: 5,
		examDurationFr: '02 h 30',
		pointsSplit: [6, 6, 8]
	},
	'3as_se': {
		grade: '3as_se',
		levelId: 'secondaire',
		yearId: '3as',
		yearNameAr: 'السنة الثالثة ثانوي — علوم تجريبية (BAC)',
		yearNameFr: '3e Année Secondaire (3AS / BAC)',
		subjectId: 'FRE-SEC',
		subjectNameAr: 'اللغة الفرنسية',
		yearSubjectId: 685,
		streamId: 'SE',
		streamNameAr: 'علوم تجريبية',
		streamNameFr: 'Sciences Expérimentales',
		coefficient: 2,
		examDurationFr: '02 h 30',
		pointsSplit: [7, 7, 6]
	},
	'3as_tm': {
		grade: '3as_tm',
		levelId: 'secondaire',
		yearId: '3as',
		yearNameAr: 'السنة الثالثة ثانوي — تقني رياضي (BAC)',
		yearNameFr: '3e Année Secondaire (3AS / BAC)',
		subjectId: 'FRE-SEC',
		subjectNameAr: 'اللغة الفرنسية',
		yearSubjectId: 727,
		streamId: 'TM',
		streamNameAr: 'تقني رياضي',
		streamNameFr: 'Techniques Mathématiques',
		coefficient: 2,
		examDurationFr: '02 h 30',
		pointsSplit: [7, 7, 6]
	},
	'3as_math': {
		grade: '3as_math',
		levelId: 'secondaire',
		yearId: '3as',
		yearNameAr: 'السنة الثالثة ثانوي — رياضيات (BAC)',
		yearNameFr: '3e Année Secondaire (3AS / BAC)',
		subjectId: 'FRE-SEC',
		subjectNameAr: 'اللغة الفرنسية',
		yearSubjectId: 705,
		streamId: 'MATH',
		streamNameAr: 'رياضيات',
		streamNameFr: 'Mathématiques',
		coefficient: 2,
		examDurationFr: '02 h 30',
		pointsSplit: [7, 7, 6]
	},
	'3as_ge': {
		grade: '3as_ge',
		levelId: 'secondaire',
		yearId: '3as',
		yearNameAr: 'السنة الثالثة ثانوي — تسيير واقتصاد (BAC)',
		yearNameFr: '3e Année Secondaire (3AS / BAC)',
		subjectId: 'FRE-SEC',
		subjectNameAr: 'اللغة الفرنسية',
		yearSubjectId: 750,
		streamId: 'GE',
		streamNameAr: 'تسيير واقتصاد',
		streamNameFr: 'Gestion et Économie',
		coefficient: 2,
		examDurationFr: '02 h 30',
		pointsSplit: [7, 7, 6]
	},
	'3as_lp': {
		grade: '3as_lp',
		levelId: 'secondaire',
		yearId: '3as',
		yearNameAr: 'السنة الثالثة ثانوي — آداب وفلسفة (BAC)',
		yearNameFr: '3e Année Secondaire (3AS / BAC)',
		subjectId: 'FRE-SEC',
		subjectNameAr: 'اللغة الفرنسية',
		yearSubjectId: 769,
		streamId: 'LP',
		streamNameAr: 'آداب وفلسفة',
		streamNameFr: 'Lettres et Philosophie',
		coefficient: 3,
		examDurationFr: '02 h 30',
		pointsSplit: [7, 6, 7]
	},
	'3as_le': {
		grade: '3as_le',
		levelId: 'secondaire',
		yearId: '3as',
		yearNameAr: 'السنة الثالثة ثانوي — لغات أجنبية (BAC)',
		yearNameFr: '3e Année Secondaire (3AS / BAC)',
		subjectId: 'FRE-SEC',
		subjectNameAr: 'اللغة الفرنسية',
		yearSubjectId: 788,
		streamId: 'LE',
		streamNameAr: 'لغات أجنبية',
		streamNameFr: 'Langues Étrangères',
		coefficient: 5,
		examDurationFr: '03 h 30',
		pointsSplit: [6, 6, 8]
	}
};

export const FRENCH_PRIMARY_TRACK_IDS: readonly FrenchPrimaryTrackId[] = ['3ap', '4ap', '5ap'];
export const FRENCH_MIDDLE_TRACK_IDS: readonly FrenchMiddleTrackId[] = ['1am', '2am', '3am', '4am'];
export const FRENCH_SECONDARY_TRACK_IDS: readonly FrenchSecondaryTrackId[] = [
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

export const ALL_FRENCH_TRACK_IDS: readonly FrenchTrackId[] = [
	...FRENCH_PRIMARY_TRACK_IDS,
	...FRENCH_MIDDLE_TRACK_IDS,
	...FRENCH_SECONDARY_TRACK_IDS
];

export interface FrenchInteractiveLessonData {
	id: string;
	slug: string;
	grade: FrenchTrackId;
	yearSubjectId: FrenchYearSubjectId;
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

export interface FrenchGeneratedExerciseInstance {
	templateId: string;
	seed: number;
	grade: FrenchTrackId;
	trimesterId: TrimesterId;
	difficulty: Difficulty;
	domain: FrenchDomain;
	titleAr: string;
	examRole: FrenchExamRole;
	quizQuestion: QuizQuestionPayload;
	sujetExercise: ExerciseBlock;
	hints: [string, string, string];
	solutionStepsAr: string[];
	finalAnswer: string;
}

export interface FrenchParameterizedTemplate {
	id: string;
	grade: FrenchTrackId;
	trimesterId: TrimesterId;
	domain: FrenchDomain;
	titleAr: string;
	curriculumLessonId?: string;
	defaultPoints: number;
	examRole: FrenchExamRole;
	isIntegration?: boolean;
	generate(seed: number, difficulty?: Difficulty): FrenchGeneratedExerciseInstance;
}

export function adaptFrenchLessonForTrack(
	base: FrenchInteractiveLessonData,
	targetGrade: FrenchSecondaryTrackId,
	idSuffix?: string
): FrenchInteractiveLessonData {
	const meta = FRENCH_GRADE_METADATA[targetGrade];
	const suffixMatch = base.id.match(/^fre_lesson_[a-z0-9_]+_(t[123]_[a-z0-9_]+)$/);
	const tail = idSuffix || (suffixMatch ? suffixMatch[1] : `${base.trimesterId}_${base.slug}`);
	const cleanTail = tail.replace(/^t[123]_/, `${base.trimesterId}_`);
	const newId = `fre_lesson_${targetGrade}_${cleanTail}`;
	const slugTail = base.slug.replace(
		/^(?:fre-)?(?:1as-tcst|1as-tcl|2as-se|2as-tm|2as-math|2as-ge|2as-lp|2as-le|3as-se|3as-tm|3as-math|3as-ge|3as-lp|3as-le|2as-sci|3as-sci)-/,
		''
	);
	return {
		...base,
		id: newId,
		slug: `fre-${targetGrade.replace('_', '-')}-${slugTail}`,
		grade: targetGrade,
		yearSubjectId: meta.yearSubjectId
	};
}

export function adaptFrenchTemplateForTrack(
	base: FrenchParameterizedTemplate,
	targetGrade: FrenchSecondaryTrackId
): FrenchParameterizedTemplate {
	const newId = base.id.replace(
		/^fre_tpl_(?:2as_sci|3as_sci|2as_se|3as_se|2as_lp|3as_lp)_/,
		`fre_tpl_${targetGrade}_`
	);
	const resolvedId =
		newId === base.id ? `fre_tpl_${targetGrade}_${base.trimesterId}_${base.id}` : newId;
	const adaptedLessonId = base.curriculumLessonId
		? base.curriculumLessonId.replace(
				/^fre_lesson_(?:2as_sci|3as_sci|2as_se|3as_se|2as_lp|3as_lp)_/,
				`fre_lesson_${targetGrade}_`
			)
		: undefined;
	return {
		...base,
		id: resolvedId,
		grade: targetGrade,
		curriculumLessonId: adaptedLessonId,
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const out = base.generate(seed, difficulty);
			return {
				...out,
				templateId: resolvedId,
				grade: targetGrade
			};
		}
	};
}
