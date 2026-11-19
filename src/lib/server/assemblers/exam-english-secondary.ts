import {
	ENGLISH_GRADE_METADATA,
	ENGLISH_SECONDARY_TRACK_IDS,
	SeededRng,
	getEnglishTemplatesFor
} from '../../modules/EnglishTemplates';
import type {
	Difficulty,
	EnglishExamRole,
	EnglishGeneratedExerciseInstance,
	EnglishParameterizedTemplate,
	EnglishSecondaryTrackId
} from '../../modules/EnglishTemplates';
import type {
	ExamDocument,
	ExamMetadata,
	ExamType,
	ExerciseBlock,
	TrimesterId
} from '../../modules/SujetBuilder/types';
import { drawDistinctSeed, scaleExercisePoints } from './shared';

export type EnglishSecondaryVariant = 'trimester_exam' | 'supervised_test' | 'bac_mock';

export interface AssembledEnglishSecondaryPaper {
	id: string;
	grade: EnglishSecondaryTrackId;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: EnglishSecondaryVariant;
	templateId: 'english/secondary' | 'english/bac_official';
	totalPoints: 20;
	seed: number;
	examDoc: ExamDocument;
	exerciseInstances: EnglishGeneratedExerciseInstance[];
}

export interface AssembleEnglishSecondaryOptions {
	grade: EnglishSecondaryTrackId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	difficulty?: Difficulty;
	variant?: EnglishSecondaryVariant;
	academicYear?: string;
	schoolName?: string;
	topicNumber?: 1 | 2;
}

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
 * Assemble an authentic Algerian Secondary / BAC English paper across all 14 streams:
 * - Scientific & Management (`8 + 7 + 5 = 20 pts`, 2h30 in 3AS, coeff 2)
 * - Literature & Philosophy (`7 + 8 + 5 = 20 pts`, 2h30 in 3AS, coeff 3)
 * - Foreign Languages (`7 + 7 + 6 = 20 pts`, 3h30 in 3AS, coeff 5)
 * - Supervised Tests (`01 Hour`): Comprehension (10 pts) + Text Exploration (10 pts) = 20 pts
 */
export function assembleEnglishSecondaryExam(
	opts: AssembleEnglishSecondaryOptions
): AssembledEnglishSecondaryPaper {
	const { grade, trimesterId } = opts;
	if (!ENGLISH_SECONDARY_TRACK_IDS.includes(grade)) {
		throw new Error(`Invalid secondary English track: ${String(grade)}`);
	}
	if (!ALL_TRIMESTERS.includes(trimesterId)) {
		throw new Error(`Invalid trimesterId for ${grade}: ${String(trimesterId)}`);
	}

	const cleanSeed = Number.isFinite(opts.seed) ? Math.trunc(opts.seed) : 1;
	const isBacTrack = grade.startsWith('3as_');
	const variant: EnglishSecondaryVariant =
		opts.variant === 'bac_mock' && isBacTrack
			? 'bac_mock'
			: opts.docType === 'test' || opts.variant === 'supervised_test'
				? 'supervised_test'
				: 'trimester_exam';
	const docType: ExamType = variant === 'supervised_test' ? 'test' : 'exam';
	const templateId: 'english/secondary' | 'english/bac_official' =
		variant === 'bac_mock' ? 'english/bac_official' : 'english/secondary';
	const difficulty: Difficulty = opts.difficulty ?? 'medium';
	const academicYear = opts.academicYear?.trim() || '2025 / 2026';

	const rng = new SeededRng(cleanSeed);
	const gradeMeta = ENGLISH_GRADE_METADATA[grade];
	const [compPts, expPts, writPts] = gradeMeta.pointsSplit;

	const customDocTitle =
		variant === 'bac_mock'
			? 'Baccalaureate Mock Examination — English Language'
			: docType === 'test'
				? `${TERM_NAMES_EN[trimesterId]} Test — English Language`
				: `${TERM_NAMES_EN[trimesterId]} Examination — English Language`;

	const metadata: ExamMetadata = {
		levelId: 'secondaire',
		yearId: gradeMeta.yearId,
		yearName: gradeMeta.yearNameEn,
		streamId: gradeMeta.streamId,
		streamName: gradeMeta.streamNameEn,
		subjectId: gradeMeta.subjectId,
		subjectName: 'English Language',
		coefficient: gradeMeta.coefficient,
		trimesterId,
		trimesterName: variant === 'bac_mock' ? 'BAC Practice Session' : TERM_NAMES_EN[trimesterId],
		docType,
		academicYear,
		duration: variant === 'supervised_test' ? '01 Hour' : gradeMeta.examDurationEn,
		siteUrl: 'https://sujetstore.com',
		customDocTitle,
		...(variant === 'bac_mock'
			? { examSessionAr: 'Practice Session 2026', topicNumber: opts.topicNumber ?? 1 }
			: {})
	};

	const rawPool =
		variant === 'bac_mock'
			? ALL_TRIMESTERS.flatMap((tid) => getEnglishTemplatesFor(grade, tid))
			: getEnglishTemplatesFor(grade, trimesterId);
	if (rawPool.length === 0) {
		throw new Error(`Empty secondary English template pool for ${grade} ${trimesterId}`);
	}

	const usedIds = new Set<string>();
	const usedSeeds = new Set<number>();
	const exerciseInstances: EnglishGeneratedExerciseInstance[] = [];
	const exercises: ExerciseBlock[] = [];

	const plan: Array<{ role: EnglishExamRole; points: number; customTitle: string }> =
		variant === 'supervised_test'
			? [
					{ role: 'comprehension', points: 10, customTitle: 'Part One: Reading — A/ Comprehension' },
					{ role: 'text_exploration', points: 10, customTitle: 'Part One: Reading — B/ Text Exploration' }
				]
			: [
					{ role: 'comprehension', points: compPts, customTitle: 'Part One: Reading — A/ Comprehension' },
					{ role: 'text_exploration', points: expPts, customTitle: 'Part One: Reading — B/ Text Exploration' },
					{ role: 'written_expression', points: writPts, customTitle: 'Part Two: Written Expression' }
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
		templateId,
		totalPoints: 20,
		seed: cleanSeed,
		examDoc,
		exerciseInstances
	};
}
