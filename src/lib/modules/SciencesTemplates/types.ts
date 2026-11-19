import type { ExerciseBlock, LevelId, TrimesterId } from '../SujetBuilder/types';
import type {
	Difficulty,
	LessonDiscoverStep,
	LessonPracticeQuestion,
	QuizQuestionPayload
} from '../MathTemplates/types';

export type { Difficulty, LessonDiscoverStep, LessonPracticeQuestion, QuizQuestionPayload };

export type SciencesPrimaryTrackId = '1ap' | '2ap' | '3ap' | '4ap' | '5ap';
export type SciencesMiddleTrackId = '1am' | '2am' | '3am' | '4am';
export type SciencesSecondaryTrackId = '1as_tcst' | '2as_se' | '2as_math' | '3as_se' | '3as_math';

export type SciencesTrackId =
	| SciencesPrimaryTrackId
	| SciencesMiddleTrackId
	| SciencesSecondaryTrackId;

export type SciencesYearSubjectId =
	| 797 // 1ap SCI-B (التربية العلمية والتكنولوجية)
	| 798 // 2ap SCI-B (التربية العلمية والتكنولوجية)
	| 595 // 3ap SCI-B
	| 602 // 4ap SCI-B
	| 610 // 5ap SCI-B
	| 617 // 1am SCI-B
	| 627 // 2am SCI-B
	| 637 // 3am SCI-B
	| 647 // 4am SCI-B (BEM)
	| 656 // 1as SCI-SE TCST
	| 674 // 2as SCI-SE SE
	| 694 // 2as SCI-MATH MATH
	| 684 // 3as SCI-SE SE (BAC)
	| 704; // 3as SCI-MATH MATH (BAC)

export type SciencesDomain =
	| 'human_body'
	| 'nutrition_digestion'
	| 'plant_biology'
	| 'ecology_environment'
	| 'matter_tech_primary'
	| 'geology_earth'
	| 'reproduction_genetics'
	| 'nervous_regulation'
	| 'hormonal_regulation'
	| 'cell_molecular'
	| 'protein_synthesis'
	| 'protein_structure'
	| 'enzymology'
	| 'immunology'
	| 'neurobiology'
	| 'bioenergetics'
	| 'plate_tectonics'
	| 'integration';

export interface SciencesGradeMeta {
	grade: SciencesTrackId;
	levelId: LevelId;
	yearId: string;
	yearName: string;
	subjectId: 'SCI-B' | 'SCI-SE' | 'SCI-MATH';
	subjectName: 'التربية العلمية والتكنولوجية' | 'علوم الطبيعة والحياة';
	yearSubjectId: SciencesYearSubjectId;
	streamId?: 'TCST' | 'SE' | 'MATH';
	streamNameAr?: string;
	coefficient?: number;
}

export const SCIENCES_GRADE_METADATA: Record<SciencesTrackId, SciencesGradeMeta> = {
	'1ap': {
		grade: '1ap',
		levelId: 'primaire',
		yearId: '1ap',
		yearName: 'السنة الأولى ابتدائي',
		subjectId: 'SCI-B',
		subjectName: 'التربية العلمية والتكنولوجية',
		yearSubjectId: 797,
		coefficient: 1
	},
	'2ap': {
		grade: '2ap',
		levelId: 'primaire',
		yearId: '2ap',
		yearName: 'السنة الثانية ابتدائي',
		subjectId: 'SCI-B',
		subjectName: 'التربية العلمية والتكنولوجية',
		yearSubjectId: 798,
		coefficient: 1
	},
	'3ap': {
		grade: '3ap',
		levelId: 'primaire',
		yearId: '3ap',
		yearName: 'السنة الثالثة ابتدائي',
		subjectId: 'SCI-B',
		subjectName: 'التربية العلمية والتكنولوجية',
		yearSubjectId: 595,
		coefficient: 1
	},
	'4ap': {
		grade: '4ap',
		levelId: 'primaire',
		yearId: '4ap',
		yearName: 'السنة الرابعة ابتدائي',
		subjectId: 'SCI-B',
		subjectName: 'التربية العلمية والتكنولوجية',
		yearSubjectId: 602,
		coefficient: 1
	},
	'5ap': {
		grade: '5ap',
		levelId: 'primaire',
		yearId: '5ap',
		yearName: 'السنة الخامسة ابتدائي',
		subjectId: 'SCI-B',
		subjectName: 'التربية العلمية والتكنولوجية',
		yearSubjectId: 610,
		coefficient: 1
	},
	'1am': {
		grade: '1am',
		levelId: 'moyen',
		yearId: '1am',
		yearName: 'السنة الأولى متوسط',
		subjectId: 'SCI-B',
		subjectName: 'علوم الطبيعة والحياة',
		yearSubjectId: 617,
		coefficient: 1
	},
	'2am': {
		grade: '2am',
		levelId: 'moyen',
		yearId: '2am',
		yearName: 'السنة الثانية متوسط',
		subjectId: 'SCI-B',
		subjectName: 'علوم الطبيعة والحياة',
		yearSubjectId: 627,
		coefficient: 1
	},
	'3am': {
		grade: '3am',
		levelId: 'moyen',
		yearId: '3am',
		yearName: 'السنة الثالثة متوسط',
		subjectId: 'SCI-B',
		subjectName: 'علوم الطبيعة والحياة',
		yearSubjectId: 637,
		coefficient: 2
	},
	'4am': {
		grade: '4am',
		levelId: 'moyen',
		yearId: '4am',
		yearName: 'السنة الرابعة متوسط (BEM)',
		subjectId: 'SCI-B',
		subjectName: 'علوم الطبيعة والحياة',
		yearSubjectId: 647,
		coefficient: 2
	},
	'1as_tcst': {
		grade: '1as_tcst',
		levelId: 'secondaire',
		yearId: '1as',
		yearName: 'السنة الأولى ثانوي — جذع مشترك علوم وتكنولوجيا',
		subjectId: 'SCI-SE',
		subjectName: 'علوم الطبيعة والحياة',
		yearSubjectId: 656,
		streamId: 'TCST',
		streamNameAr: 'جذع مشترك علوم وتكنولوجيا',
		coefficient: 4
	},
	'2as_se': {
		grade: '2as_se',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — علوم تجريبية',
		subjectId: 'SCI-SE',
		subjectName: 'علوم الطبيعة والحياة',
		yearSubjectId: 674,
		streamId: 'SE',
		streamNameAr: 'علوم تجريبية',
		coefficient: 6
	},
	'2as_math': {
		grade: '2as_math',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — رياضيات',
		subjectId: 'SCI-MATH',
		subjectName: 'علوم الطبيعة والحياة',
		yearSubjectId: 694,
		streamId: 'MATH',
		streamNameAr: 'رياضيات',
		coefficient: 2
	},
	'3as_se': {
		grade: '3as_se',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — علوم تجريبية (BAC)',
		subjectId: 'SCI-SE',
		subjectName: 'علوم الطبيعة والحياة',
		yearSubjectId: 684,
		streamId: 'SE',
		streamNameAr: 'علوم تجريبية',
		coefficient: 6
	},
	'3as_math': {
		grade: '3as_math',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — رياضيات (BAC)',
		subjectId: 'SCI-MATH',
		subjectName: 'علوم الطبيعة والحياة',
		yearSubjectId: 704,
		streamId: 'MATH',
		streamNameAr: 'رياضيات',
		coefficient: 2
	}
};

export const SCIENCES_PRIMARY_TRACK_IDS: readonly SciencesPrimaryTrackId[] = [
	'1ap',
	'2ap',
	'3ap',
	'4ap',
	'5ap'
];

export const SCIENCES_MIDDLE_TRACK_IDS: readonly SciencesMiddleTrackId[] = [
	'1am',
	'2am',
	'3am',
	'4am'
];

export const SCIENCES_SECONDARY_TRACK_IDS: readonly SciencesSecondaryTrackId[] = [
	'1as_tcst',
	'2as_se',
	'2as_math',
	'3as_se',
	'3as_math'
];

export const ALL_SCIENCES_TRACK_IDS: readonly SciencesTrackId[] = [
	...SCIENCES_PRIMARY_TRACK_IDS,
	...SCIENCES_MIDDLE_TRACK_IDS,
	...SCIENCES_SECONDARY_TRACK_IDS
];

export interface SciencesInteractiveLessonData {
	id: string;
	slug: string;
	grade: SciencesTrackId;
	yearSubjectId: SciencesYearSubjectId;
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

export interface SciencesGeneratedExerciseInstance {
	templateId: string;
	seed: number;
	grade: SciencesTrackId;
	trimesterId: TrimesterId;
	difficulty: Difficulty;
	domain: SciencesDomain;
	titleAr: string;
	/** ONEC exercise role: recall (5 pts), reasoning (7 pts), scientific_approach (8/12 pts), or integration (8 pts BEM) */
	onecRole?: 'recall' | 'reasoning' | 'scientific_approach' | 'integration';
	quizQuestion: QuizQuestionPayload;
	sujetExercise: ExerciseBlock;
	hints: [string, string, string];
	solutionStepsAr: string[];
	finalAnswer: string;
}

export interface SciencesParameterizedTemplate {
	id: string;
	grade: SciencesTrackId;
	trimesterId: TrimesterId;
	domain: SciencesDomain;
	titleAr: string;
	curriculumLessonId?: string;
	defaultPoints: number;
	isIntegration?: boolean;
	onecRole?: 'recall' | 'reasoning' | 'scientific_approach' | 'integration';
	generate(seed: number, difficulty?: Difficulty): SciencesGeneratedExerciseInstance;
}

export function adaptSciencesLessonForTrack(
	base: SciencesInteractiveLessonData,
	targetGrade: SciencesSecondaryTrackId,
	idSuffix?: string
): SciencesInteractiveLessonData {
	const meta = SCIENCES_GRADE_METADATA[targetGrade];
	const suffixMatch = base.id.match(/^sci_lesson_[a-z0-9_]+_(t[123]_[a-z0-9_]+)$/);
	const tail = idSuffix || (suffixMatch ? suffixMatch[1] : `${base.trimesterId}_${base.slug}`);
	const cleanTail = tail.replace(/^t[123]_/, `${base.trimesterId}_`);
	const newId = `sci_lesson_${targetGrade}_${cleanTail}`;
	const slugTail = base.slug.replace(
		/^(1as_tcst|2as_se|2as_math|3as_se|3as_math|2as_shared|3as_shared|sci-)-/,
		''
	);
	return {
		...base,
		id: newId,
		slug: `sci-${targetGrade.replace('_', '-')}-${slugTail}`,
		grade: targetGrade,
		yearSubjectId: meta.yearSubjectId
	};
}

export function adaptSciencesTemplateForTrack(
	base: SciencesParameterizedTemplate,
	targetGrade: SciencesSecondaryTrackId
): SciencesParameterizedTemplate {
	const newId = base.id.replace(
		/^sci_tpl_(2as_shared|3as_shared|2as_se|2as_math|3as_se|3as_math)_/,
		`sci_tpl_${targetGrade}_`
	);
	const resolvedId =
		newId === base.id ? `sci_tpl_${targetGrade}_${base.trimesterId}_${base.id}` : newId;
	const adaptedLessonId = base.curriculumLessonId
		? base.curriculumLessonId.replace(
				/^sci_lesson_(2as_shared|3as_shared|2as_se|2as_math|3as_se|3as_math)_/,
				`sci_lesson_${targetGrade}_`
			)
		: undefined;
	return {
		...base,
		id: resolvedId,
		grade: targetGrade,
		curriculumLessonId: adaptedLessonId,
		generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
			const out = base.generate(seed, difficulty);
			return {
				...out,
				templateId: resolvedId,
				grade: targetGrade
			};
		}
	};
}
