import {
	ENGLISH_GRADE_METADATA,
	SeededRng,
	getEnglishTemplatesFor
} from '../../modules/EnglishTemplates';
import type {
	Difficulty,
	EnglishExamRole,
	EnglishGeneratedExerciseInstance,
	EnglishMiddleTrackId,
	EnglishParameterizedTemplate
} from '../../modules/EnglishTemplates';
import type {
	ExamDocument,
	ExamMetadata,
	ExamType,
	ExerciseBlock,
	TrimesterId
} from '../../modules/SujetBuilder/types';
import { drawDistinctSeed, scaleExercisePoints } from './shared';

export type EnglishMiddleVariant = 'trimester_exam' | 'supervised_test' | 'bem_mock';

export interface AssembledEnglishMiddlePaper {
	id: string;
	grade: EnglishMiddleTrackId;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: EnglishMiddleVariant;
	templateId: 'english/middle';
	totalPoints: 20;
	seed: number;
	examDoc: ExamDocument;
	exerciseInstances: EnglishGeneratedExerciseInstance[];
}

export interface AssembleEnglishMiddleOptions {
	grade: EnglishMiddleTrackId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	difficulty?: Difficulty;
	variant?: EnglishMiddleVariant;
	academicYear?: string;
	schoolName?: string;
}

const VALID_MIDDLE_GRADES: readonly EnglishMiddleTrackId[] = ['1am', '2am', '3am', '4am'];
const ALL_TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];
const TERM_NAMES_EN: Record<TrimesterId, string> = {
	t1: 'First Term',
	t2: 'Second Term',
	t3: 'Third Term'
};

function pickByRole(
	pool: EnglishParameterizedTemplate[],
	role: EnglishExamRole,
	rng: SeededRng,
	excludeIds: Set<string>
): EnglishParameterizedTemplate {
	const exact = pool.filter((t) => t.examRole === role && !excludeIds.has(t.id));
	if (exact.length > 0) return rng.pick(exact);
	const anyRole = pool.filter((t) => t.examRole === role);
	if (anyRole.length > 0) return rng.pick(anyRole);
	const unused = pool.filter((t) => !excludeIds.has(t.id));
	return rng.pick(unused.length > 0 ? unused : pool);
}

/**
 * Assemble an authentic Algerian Middle School / BEM English paper (`1am`–`4am`, 20 pts total):
 * - Exam & 4AM BEM Mock (`01 Hour 30 Min`):
 *   Part One (14 pts) = Reading Comprehension (7 pts) + Mastery of Language (7 pts)
 *   Part Two (06 pts) = Situation of Integration / Written Expression (6 pts)
 * - Supervised Test (`01 Hour`):
 *   Reading Comprehension (10 pts) + Mastery of Language (10 pts) = 20 pts
 */
export function assembleEnglishMiddleExam(
	opts: AssembleEnglishMiddleOptions
): AssembledEnglishMiddlePaper {
	const { grade, trimesterId } = opts;
	if (!VALID_MIDDLE_GRADES.includes(grade)) {
		throw new Error(`Invalid middle English track: ${String(grade)}`);
	}
	if (!ALL_TRIMESTERS.includes(trimesterId)) {
		throw new Error(`Invalid trimesterId for ${grade}: ${String(trimesterId)}`);
	}

	const cleanSeed = Number.isFinite(opts.seed) ? Math.trunc(opts.seed) : 1;
	const variant: EnglishMiddleVariant =
		opts.variant === 'bem_mock' && grade === '4am'
			? 'bem_mock'
			: opts.docType === 'test' || opts.variant === 'supervised_test'
				? 'supervised_test'
				: 'trimester_exam';
	const docType: ExamType = variant === 'supervised_test' ? 'test' : 'exam';
	const difficulty: Difficulty = opts.difficulty ?? 'medium';
	const academicYear = opts.academicYear?.trim() || '2025 / 2026';

	const rng = new SeededRng(cleanSeed);
	const gradeMeta = ENGLISH_GRADE_METADATA[grade];

	const customDocTitle =
		variant === 'bem_mock'
			? 'BEM Mock Examination — English Language'
			: docType === 'test'
				? `${TERM_NAMES_EN[trimesterId]} Test — English Language`
				: `${TERM_NAMES_EN[trimesterId]} Examination — English Language`;

	const metadata: ExamMetadata = {
		levelId: 'moyen',
		yearId: gradeMeta.yearId,
		yearName: gradeMeta.yearNameEn,
		subjectId: gradeMeta.subjectId,
		subjectName: 'English Language',
		coefficient: gradeMeta.coefficient,
		trimesterId,
		trimesterName: variant === 'bem_mock' ? 'BEM Practice Session' : TERM_NAMES_EN[trimesterId],
		docType,
		academicYear,
		duration: variant === 'supervised_test' ? '01 Hour' : gradeMeta.examDurationEn,
		siteUrl: 'https://sujetstore.com',
		customDocTitle
	};

	const rawPool =
		variant === 'bem_mock'
			? ALL_TRIMESTERS.flatMap((tid) => getEnglishTemplatesFor('4am', tid))
			: getEnglishTemplatesFor(grade, trimesterId);
	if (rawPool.length === 0) {
		throw new Error(`Empty middle English template pool for ${grade} ${trimesterId}`);
	}

	const usedIds = new Set<string>();
	const usedSeeds = new Set<number>();
	const exerciseInstances: EnglishGeneratedExerciseInstance[] = [];
	const exercises: ExerciseBlock[] = [];

	const plan: Array<{ role: EnglishExamRole; points: number; customTitle: string }> =
		variant === 'supervised_test'
			? [
					{ role: 'comprehension', points: 10, customTitle: 'Part One: Reading Comprehension' },
					{ role: 'text_exploration', points: 10, customTitle: 'Part Two: Mastery of Language' }
				]
			: [
					{ role: 'comprehension', points: 7, customTitle: 'Part One — A/ Reading Comprehension' },
					{ role: 'text_exploration', points: 7, customTitle: 'Part One — B/ Mastery of Language' },
					{ role: 'written_expression', points: 6, customTitle: 'Part Two: Situation of Integration' }
				];

	for (const slot of plan) {
		const tpl = pickByRole(rawPool, slot.role, rng, usedIds);
		usedIds.add(tpl.id);
		const exSeed = drawDistinctSeed(rng, usedSeeds);
		const inst = tpl.generate(exSeed, difficulty);
		exerciseInstances.push(inst);

		const scaled = scaleExercisePoints(inst.sujetExercise, slot.points);
		scaled.customTitle = slot.customTitle;
		exercises.push(scaled);
	}

	const paperId = `eng-${grade}-${trimesterId}-${variant}-${cleanSeed}`;
	const examDoc: ExamDocument = { metadata, exercises };

	return {
		id: paperId,
		grade,
		trimesterId,
		docType,
		variant,
		templateId: 'english/middle',
		totalPoints: 20,
		seed: cleanSeed,
		examDoc,
		exerciseInstances
	};
}
