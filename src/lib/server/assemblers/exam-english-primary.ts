import {
	ENGLISH_GRADE_METADATA,
	SeededRng,
	getEnglishTemplatesFor
} from '../../modules/EnglishTemplates/runtime';
import type {
	Difficulty,
	EnglishExamRole,
	EnglishGeneratedExerciseInstance,
	EnglishParameterizedTemplate,
	EnglishPrimaryTrackId
} from '../../modules/EnglishTemplates/runtime';
import type {
	ExamDocument,
	ExamMetadata,
	ExamType,
	ExerciseBlock,
	TrimesterId
} from '../../modules/SujetBuilder/types';
import { drawDistinctSeed, scaleExercisePoints } from './shared';

export type EnglishPrimaryVariant = 'trimester_exam' | 'supervised_test' | 'competency_eval';

export interface AssembledEnglishPrimaryPaper {
	id: string;
	grade: EnglishPrimaryTrackId;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: EnglishPrimaryVariant;
	templateId: 'english/primary';
	totalPoints: 10;
	seed: number;
	examDoc: ExamDocument;
	exerciseInstances: EnglishGeneratedExerciseInstance[];
}

export interface AssembleEnglishPrimaryOptions {
	grade: EnglishPrimaryTrackId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	difficulty?: Difficulty;
	variant?: EnglishPrimaryVariant;
	academicYear?: string;
	schoolName?: string;
}

const VALID_PRIMARY_GRADES: readonly EnglishPrimaryTrackId[] = ['3ap', '4ap', '5ap'];
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

export function assembleEnglishPrimaryExam(
	opts: AssembleEnglishPrimaryOptions
): AssembledEnglishPrimaryPaper {
	const { grade, trimesterId } = opts;
	if (!VALID_PRIMARY_GRADES.includes(grade)) {
		throw new Error(`Invalid primary English track: ${String(grade)}`);
	}
	if (!ALL_TRIMESTERS.includes(trimesterId)) {
		throw new Error(`Invalid trimesterId for ${grade}: ${String(trimesterId)}`);
	}

	const cleanSeed = Number.isFinite(opts.seed) ? Math.trunc(opts.seed) : 1;
	const variant: EnglishPrimaryVariant =
		grade === '5ap' && opts.variant === 'competency_eval'
			? 'competency_eval'
			: opts.docType === 'test' || opts.variant === 'supervised_test'
				? 'supervised_test'
				: 'trimester_exam';
	const docType: ExamType = variant === 'supervised_test' ? 'test' : 'exam';
	const difficulty: Difficulty = opts.difficulty ?? 'medium';
	const academicYear = opts.academicYear?.trim() || '2025 / 2026';

	const rng = new SeededRng(cleanSeed);
	const gradeMeta = ENGLISH_GRADE_METADATA[grade];

	const customDocTitle =
		variant === 'competency_eval'
			? 'Primary Competency Evaluation — English Language (5PS)'
			: docType === 'test'
				? `${TERM_NAMES_EN[trimesterId]} Test — English Language`
				: `${TERM_NAMES_EN[trimesterId]} Examination — English Language`;

	const metadata: ExamMetadata = {
		levelId: 'primaire',
		yearId: gradeMeta.yearId,
		yearName: gradeMeta.yearNameEn,
		subjectId: gradeMeta.subjectId,
		subjectName: 'English Language',
		trimesterId,
		trimesterName:
			variant === 'competency_eval'
				? 'End of Primary Competency Evaluation'
				: TERM_NAMES_EN[trimesterId],
		docType,
		academicYear,
		duration: docType === 'test' ? '45 Minutes' : gradeMeta.examDurationEn,
		siteUrl: 'https://sujetstore.com',
		customDocTitle
	};

	const rawPool =
		variant === 'competency_eval'
			? ALL_TRIMESTERS.flatMap((tid) => getEnglishTemplatesFor(grade, tid))
			: getEnglishTemplatesFor(grade, trimesterId);
	if (rawPool.length === 0) {
		throw new Error(`Empty primary English template pool for ${grade} ${trimesterId}`);
	}

	const usedIds = new Set<string>();
	const usedSeeds = new Set<number>();
	const exerciseInstances: EnglishGeneratedExerciseInstance[] = [];
	const exercises: ExerciseBlock[] = [];

	const plan: Array<{ role: EnglishExamRole; points: number; customTitle: string }> =
		variant === 'supervised_test'
			? [
					{ role: 'comprehension', points: 4, customTitle: 'Part One: Reading Comprehension' },
					{ role: 'text_exploration', points: 3, customTitle: 'Part Two: Mastery of Language (A)' },
					{ role: 'text_exploration', points: 3, customTitle: 'Part Three: Vocabulary & Phonics (B)' }
				]
			: variant === 'competency_eval'
				? [
						{ role: 'comprehension', points: 4, customTitle: 'Competency 1: Reading Comprehension' },
						{ role: 'text_exploration', points: 3, customTitle: 'Competency 2: Linguistic Mastery' },
						{ role: 'written_expression', points: 3, customTitle: 'Competency 3: Written Production' }
					]
				: [
						{ role: 'comprehension', points: 4, customTitle: 'Part One: Reading Comprehension' },
						{ role: 'text_exploration', points: 3, customTitle: 'Part Two: Mastery of Language' },
						{ role: 'written_expression', points: 3, customTitle: 'Part Three: Written Production' }
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
		templateId: 'english/primary',
		totalPoints: 10,
		seed: cleanSeed,
		examDoc,
		exerciseInstances
	};
}
