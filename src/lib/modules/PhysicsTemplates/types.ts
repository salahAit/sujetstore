import type { ExerciseBlock, LevelId, TrimesterId } from '../SujetBuilder/types';
import type {
	Difficulty,
	LessonDiscoverStep,
	LessonPracticeQuestion,
	QuizQuestionPayload
} from '../MathTemplates/types';

export type { Difficulty, LessonDiscoverStep, LessonPracticeQuestion, QuizQuestionPayload };

export type PhysicsMiddleTrackId = '1am' | '2am' | '3am' | '4am';

export type PhysicsSecondaryTrackId =
	| '1as_tcst'
	| '2as_se'
	| '2as_tm'
	| '2as_math'
	| '3as_se'
	| '3as_tm'
	| '3as_math';

export type PhysicsTrackId = PhysicsMiddleTrackId | PhysicsSecondaryTrackId;

export type PhysicsYearSubjectId =
	| 618 // 1am PHY-B
	| 628 // 2am PHY-B
	| 638 // 3am PHY-B
	| 648 // 4am PHY-B
	| 655 // 1as PHY-SE TCST
	| 673 // 2as PHY-SE SE
	| 713 // 2as PHY-MTM TM
	| 693 // 2as PHY-MTM MATH
	| 683 // 3as PHY-SE SE
	| 726 // 3as PHY-MTM TM
	| 703; // 3as PHY-MTM MATH

export type PhysicsDomain =
	| 'electricity'
	| 'matter'
	| 'optics'
	| 'mechanics'
	| 'energy'
	| 'electromagnetism'
	| 'waves_ac'
	| 'kinetics_eq'
	| 'nuclear'
	| 'organic_chem'
	| 'oscillations'
	| 'integration';

export interface PhysicsGradeMeta {
	grade: PhysicsTrackId;
	levelId: LevelId;
	yearId: string;
	yearName: string;
	subjectId: 'PHY-B' | 'PHY-SE' | 'PHY-MTM';
	subjectName: 'العلوم الفيزيائية والتكنولوجيا' | 'العلوم الفيزيائية';
	yearSubjectId: PhysicsYearSubjectId;
	streamId?: 'TCST' | 'SE' | 'TM' | 'MATH';
	streamNameAr?: string;
	coefficient?: number;
}

export const PHYSICS_GRADE_METADATA: Record<PhysicsTrackId, PhysicsGradeMeta> = {
	'1am': {
		grade: '1am',
		levelId: 'moyen',
		yearId: '1am',
		yearName: 'السنة الأولى متوسط',
		subjectId: 'PHY-B',
		subjectName: 'العلوم الفيزيائية والتكنولوجيا',
		yearSubjectId: 618
	},
	'2am': {
		grade: '2am',
		levelId: 'moyen',
		yearId: '2am',
		yearName: 'السنة الثانية متوسط',
		subjectId: 'PHY-B',
		subjectName: 'العلوم الفيزيائية والتكنولوجيا',
		yearSubjectId: 628
	},
	'3am': {
		grade: '3am',
		levelId: 'moyen',
		yearId: '3am',
		yearName: 'السنة الثالثة متوسط',
		subjectId: 'PHY-B',
		subjectName: 'العلوم الفيزيائية والتكنولوجيا',
		yearSubjectId: 638
	},
	'4am': {
		grade: '4am',
		levelId: 'moyen',
		yearId: '4am',
		yearName: 'السنة الرابعة متوسط (BEM)',
		subjectId: 'PHY-B',
		subjectName: 'العلوم الفيزيائية والتكنولوجيا',
		yearSubjectId: 648
	},
	'1as_tcst': {
		grade: '1as_tcst',
		levelId: 'secondaire',
		yearId: '1as',
		yearName: 'السنة الأولى ثانوي — جذع مشترك علوم وتكنولوجيا',
		subjectId: 'PHY-SE',
		subjectName: 'العلوم الفيزيائية',
		yearSubjectId: 655,
		streamId: 'TCST',
		streamNameAr: 'جذع مشترك علوم وتكنولوجيا',
		coefficient: 4
	},
	'2as_se': {
		grade: '2as_se',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — علوم تجريبية',
		subjectId: 'PHY-SE',
		subjectName: 'العلوم الفيزيائية',
		yearSubjectId: 673,
		streamId: 'SE',
		streamNameAr: 'علوم تجريبية',
		coefficient: 5
	},
	'2as_tm': {
		grade: '2as_tm',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — تقني رياضي',
		subjectId: 'PHY-MTM',
		subjectName: 'العلوم الفيزيائية',
		yearSubjectId: 713,
		streamId: 'TM',
		streamNameAr: 'تقني رياضي',
		coefficient: 5
	},
	'2as_math': {
		grade: '2as_math',
		levelId: 'secondaire',
		yearId: '2as',
		yearName: 'السنة الثانية ثانوي — رياضيات',
		subjectId: 'PHY-MTM',
		subjectName: 'العلوم الفيزيائية',
		yearSubjectId: 693,
		streamId: 'MATH',
		streamNameAr: 'رياضيات',
		coefficient: 6
	},
	'3as_se': {
		grade: '3as_se',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — علوم تجريبية (BAC)',
		subjectId: 'PHY-SE',
		subjectName: 'العلوم الفيزيائية',
		yearSubjectId: 683,
		streamId: 'SE',
		streamNameAr: 'علوم تجريبية',
		coefficient: 5
	},
	'3as_tm': {
		grade: '3as_tm',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — تقني رياضي (BAC)',
		subjectId: 'PHY-MTM',
		subjectName: 'العلوم الفيزيائية',
		yearSubjectId: 726,
		streamId: 'TM',
		streamNameAr: 'تقني رياضي',
		coefficient: 5
	},
	'3as_math': {
		grade: '3as_math',
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي — رياضيات (BAC)',
		subjectId: 'PHY-MTM',
		subjectName: 'العلوم الفيزيائية',
		yearSubjectId: 703,
		streamId: 'MATH',
		streamNameAr: 'رياضيات',
		coefficient: 6
	}
};

export const PHYSICS_MIDDLE_TRACK_IDS: readonly PhysicsMiddleTrackId[] = [
	'1am',
	'2am',
	'3am',
	'4am'
];

export const PHYSICS_SECONDARY_TRACK_IDS: readonly PhysicsSecondaryTrackId[] = [
	'1as_tcst',
	'2as_se',
	'2as_tm',
	'2as_math',
	'3as_se',
	'3as_tm',
	'3as_math'
];

export const ALL_PHYSICS_TRACK_IDS: readonly PhysicsTrackId[] = [
	...PHYSICS_MIDDLE_TRACK_IDS,
	...PHYSICS_SECONDARY_TRACK_IDS
];

export interface PhysicsInteractiveLessonData {
	id: string;
	slug: string;
	grade: PhysicsTrackId;
	yearSubjectId: PhysicsYearSubjectId;
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

export interface PhysicsGeneratedExerciseInstance {
	templateId: string;
	seed: number;
	grade: PhysicsTrackId;
	trimesterId: TrimesterId;
	difficulty: Difficulty;
	domain: PhysicsDomain;
	titleAr: string;
	quizQuestion: QuizQuestionPayload;
	sujetExercise: ExerciseBlock;
	hints: [string, string, string];
	solutionStepsAr: string[];
	finalAnswer: string;
}

export interface PhysicsParameterizedTemplate {
	id: string;
	grade: PhysicsTrackId;
	trimesterId: TrimesterId;
	domain: PhysicsDomain;
	titleAr: string;
	curriculumLessonId?: string;
	defaultPoints: number;
	isIntegration?: boolean;
	isExperimental?: boolean;
	generate(seed: number, difficulty?: Difficulty): PhysicsGeneratedExerciseInstance;
}

export function adaptPhysicsLessonForTrack(
	base: PhysicsInteractiveLessonData,
	targetGrade: PhysicsSecondaryTrackId,
	idSuffix?: string
): PhysicsInteractiveLessonData {
	const meta = PHYSICS_GRADE_METADATA[targetGrade];
	const suffixMatch = base.id.match(/^phy_lesson_[a-z0-9_]+_(t[123]_[a-z0-9_]+)$/);
	const tail = idSuffix || (suffixMatch ? suffixMatch[1] : `${base.trimesterId}_${base.slug}`);
	const cleanTail = tail.replace(/^t[123]_/, `${base.trimesterId}_`);
	const newId = `phy_lesson_${targetGrade}_${cleanTail}`;
	const slugTail = base.slug.replace(
		/^(1as_tcst|2as_se|2as_tm|2as_math|3as_se|3as_tm|3as_math|2as_shared|3as_shared|phy-)-/,
		''
	);
	return {
		...base,
		id: newId,
		slug: `phy-${targetGrade.replace('_', '-')}-${slugTail}`,
		grade: targetGrade,
		yearSubjectId: meta.yearSubjectId
	};
}

export function adaptPhysicsTemplateForTrack(
	base: PhysicsParameterizedTemplate,
	targetGrade: PhysicsSecondaryTrackId
): PhysicsParameterizedTemplate {
	const newId = base.id.replace(
		/^phy_tpl_(2as_shared|3as_shared|2as_se|2as_tm|2as_math|3as_se|3as_tm|3as_math)_/,
		`phy_tpl_${targetGrade}_`
	);
	const resolvedId =
		newId === base.id ? `phy_tpl_${targetGrade}_${base.trimesterId}_${base.id}` : newId;
	const adaptedLessonId = base.curriculumLessonId
		? base.curriculumLessonId.replace(
				/^phy_lesson_(2as_shared|3as_shared|2as_se|2as_tm|2as_math|3as_se|3as_tm|3as_math)_/,
				`phy_lesson_${targetGrade}_`
			)
		: undefined;
	return {
		...base,
		id: resolvedId,
		grade: targetGrade,
		curriculumLessonId: adaptedLessonId,
		generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
			const out = base.generate(seed, difficulty);
			return {
				...out,
				templateId: resolvedId,
				grade: targetGrade
			};
		}
	};
}
