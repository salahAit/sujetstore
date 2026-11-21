import {
	FRENCH_GRADE_METADATA,
	SeededRng,
	getFrenchTemplatesFor
} from '../../modules/FrenchTemplates/runtime';
import type {
	Difficulty,
	FrenchExamRole,
	FrenchGeneratedExerciseInstance,
	FrenchMiddleTrackId,
	FrenchParameterizedTemplate
} from '../../modules/FrenchTemplates/runtime';
import type {
	ExamDocument,
	ExamMetadata,
	ExamType,
	ExerciseBlock,
	TrimesterId
} from '../../modules/SujetBuilder/types';
import { drawDistinctSeed, scaleExercisePoints } from './shared';

export type FrenchMiddleVariant = 'trimester_exam' | 'supervised_test' | 'bem_mock';

export interface AssembledFrenchMiddlePaper {
	id: string;
	grade: FrenchMiddleTrackId;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: FrenchMiddleVariant;
	templateId: 'french/middle';
	totalPoints: 20;
	seed: number;
	examDoc: ExamDocument;
	exerciseInstances: FrenchGeneratedExerciseInstance[];
}

export interface AssembleFrenchMiddleOptions {
	grade: FrenchMiddleTrackId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	difficulty?: Difficulty;
	variant?: FrenchMiddleVariant;
	academicYear?: string;
	schoolName?: string;
}

const VALID_MIDDLE_GRADES: readonly FrenchMiddleTrackId[] = ['1am', '2am', '3am', '4am'];
const ALL_TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];
const TERM_NAMES_FR: Record<TrimesterId, string> = {
	t1: '1er Trimestre',
	t2: '2e Trimestre',
	t3: '3e Trimestre'
};

function pickByRole(
	pool: FrenchParameterizedTemplate[],
	role: FrenchExamRole,
	rng: SeededRng,
	excludeIds: Set<string>
): FrenchParameterizedTemplate {
	const exact = pool.filter((t) => t.examRole === role && !excludeIds.has(t.id));
	if (exact.length > 0) return rng.pick(exact);
	const anyRole = pool.filter((t) => t.examRole === role);
	if (anyRole.length > 0) return rng.pick(anyRole);
	const unused = pool.filter((t) => !excludeIds.has(t.id));
	return rng.pick(unused.length > 0 ? unused : pool);
}

/**
 * Assemble an authentic Algerian Middle School / BEM French paper (`1am`–`4am`, 20 pts total):
 * - Exam & 4AM BEM Mock (`01 h 30` for 1AM–3AM, `02 h 00` for 4AM BEM):
 *   I. Compréhension de l'écrit (13 pts) = Analyse du texte (7 pts) + Fonctionnement de la langue (6 pts)
 *   II. Production écrite / Situation d'intégration (7 pts)
 * - Supervised Test (`01 h 00`):
 *   Compréhension de l'écrit (10 pts) + Fonctionnement de la langue (10 pts) = 20 pts
 */
export function assembleFrenchMiddleExam(
	opts: AssembleFrenchMiddleOptions
): AssembledFrenchMiddlePaper {
	const { grade, trimesterId } = opts;
	if (!VALID_MIDDLE_GRADES.includes(grade)) {
		throw new Error(`Invalid middle French track: ${String(grade)}`);
	}
	if (!ALL_TRIMESTERS.includes(trimesterId)) {
		throw new Error(`Invalid trimesterId for ${grade}: ${String(trimesterId)}`);
	}

	const cleanSeed = Number.isFinite(opts.seed) ? Math.trunc(opts.seed) : 1;
	const variant: FrenchMiddleVariant =
		opts.variant === 'bem_mock' && grade === '4am'
			? 'bem_mock'
			: opts.docType === 'test' || opts.variant === 'supervised_test'
				? 'supervised_test'
				: 'trimester_exam';
	const docType: ExamType = variant === 'supervised_test' ? 'test' : 'exam';
	const difficulty: Difficulty = opts.difficulty ?? 'medium';
	const academicYear = opts.academicYear?.trim() || '2025 / 2026';

	const rng = new SeededRng(cleanSeed);
	const gradeMeta = FRENCH_GRADE_METADATA[grade];

	const customDocTitle =
		variant === 'bem_mock'
			? 'Examen blanc du BEM — Langue Française'
			: docType === 'test'
				? `Devoir surveillé du ${TERM_NAMES_FR[trimesterId]} — Langue Française`
				: `Composition du ${TERM_NAMES_FR[trimesterId]} — Langue Française`;

	const metadata: ExamMetadata = {
		levelId: 'moyen',
		yearId: gradeMeta.yearId,
		yearName: gradeMeta.yearNameFr,
		subjectId: gradeMeta.subjectId,
		subjectName: 'Langue Française',
		coefficient: gradeMeta.coefficient,
		trimesterId,
		trimesterName: variant === 'bem_mock' ? 'Session d’entraînement BEM' : TERM_NAMES_FR[trimesterId],
		docType,
		academicYear,
		duration: variant === 'supervised_test' ? '01 h 00' : gradeMeta.examDurationFr,
		siteUrl: 'https://sujetstore.com',
		customDocTitle
	};

	const rawPool =
		variant === 'bem_mock'
			? ALL_TRIMESTERS.flatMap((tid) => getFrenchTemplatesFor('4am', tid))
			: getFrenchTemplatesFor(grade, trimesterId);
	if (rawPool.length === 0) {
		throw new Error(`Empty middle French template pool for ${grade} ${trimesterId}`);
	}

	const usedIds = new Set<string>();
	const usedSeeds = new Set<number>();
	const exerciseInstances: FrenchGeneratedExerciseInstance[] = [];
	const exercises: ExerciseBlock[] = [];

	const plan: Array<{ role: FrenchExamRole; points: number; customTitle: string }> =
		variant === 'supervised_test'
			? [
					{ role: 'comprehension', points: 10, customTitle: 'I. Compréhension de l’écrit' },
					{ role: 'text_exploration', points: 10, customTitle: 'II. Fonctionnement de la langue' }
				]
			: [
					{ role: 'comprehension', points: 7, customTitle: 'I. Compréhension de l’écrit — A / Analyse du texte' },
					{ role: 'text_exploration', points: 6, customTitle: 'I. Compréhension de l’écrit — B / Fonctionnement de la langue' },
					{ role: 'written_expression', points: 7, customTitle: 'II. Production écrite (Situation d’intégration)' }
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

	const paperId = `fre-${grade}-${trimesterId}-${variant}-${cleanSeed}`;
	const examDoc: ExamDocument = { metadata, exercises };

	return {
		id: paperId,
		grade,
		trimesterId,
		docType,
		variant,
		templateId: 'french/middle',
		totalPoints: 20,
		seed: cleanSeed,
		examDoc,
		exerciseInstances
	};
}
