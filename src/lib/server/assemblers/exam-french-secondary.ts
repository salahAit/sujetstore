import {
	FRENCH_GRADE_METADATA,
	FRENCH_SECONDARY_TRACK_IDS,
	SeededRng,
	getFrenchTemplatesFor
} from '../../modules/FrenchTemplates';
import type {
	Difficulty,
	FrenchExamRole,
	FrenchGeneratedExerciseInstance,
	FrenchParameterizedTemplate,
	FrenchSecondaryTrackId
} from '../../modules/FrenchTemplates';
import type {
	ExamDocument,
	ExamMetadata,
	ExamType,
	ExerciseBlock,
	TrimesterId
} from '../../modules/SujetBuilder/types';
import { drawDistinctSeed, scaleExercisePoints } from './shared';

export type FrenchSecondaryVariant = 'trimester_exam' | 'supervised_test' | 'bac_mock';

export interface AssembledFrenchSecondaryPaper {
	id: string;
	grade: FrenchSecondaryTrackId;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: FrenchSecondaryVariant;
	templateId: 'french/secondary' | 'french/bac_official';
	totalPoints: 20;
	seed: number;
	examDoc: ExamDocument;
	exerciseInstances: FrenchGeneratedExerciseInstance[];
}

export interface AssembleFrenchSecondaryOptions {
	grade: FrenchSecondaryTrackId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	difficulty?: Difficulty;
	variant?: FrenchSecondaryVariant;
	academicYear?: string;
	schoolName?: string;
	topicNumber?: 1 | 2;
}

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
 * Assemble an authentic Algerian Secondary / BAC French paper across all 14 streams:
 * - Scientific & Management (`7 + 7 [=14] + 6 = 20 pts`, 02 h 30 in 3AS, coeff 2)
 * - Literature & Philosophy (`7 + 6 [=13] + 7 = 20 pts`, 02 h 30 in 3AS, coeff 3)
 * - Foreign Languages (`6 + 6 [=12] + 8 = 20 pts`, 03 h 30 in 3AS, coeff 5)
 * - Supervised Tests (`01 h 00`): Compréhension (10 pts) + Fonctionnement de la langue (10 pts) = 20 pts
 */
export function assembleFrenchSecondaryExam(
	opts: AssembleFrenchSecondaryOptions
): AssembledFrenchSecondaryPaper {
	const { grade, trimesterId } = opts;
	if (!FRENCH_SECONDARY_TRACK_IDS.includes(grade)) {
		throw new Error(`Invalid secondary French track: ${String(grade)}`);
	}
	if (!ALL_TRIMESTERS.includes(trimesterId)) {
		throw new Error(`Invalid trimesterId for ${grade}: ${String(trimesterId)}`);
	}

	const cleanSeed = Number.isFinite(opts.seed) ? Math.trunc(opts.seed) : 1;
	const isBacTrack = grade.startsWith('3as_');
	const variant: FrenchSecondaryVariant =
		opts.variant === 'bac_mock' && isBacTrack
			? 'bac_mock'
			: opts.docType === 'test' || opts.variant === 'supervised_test'
				? 'supervised_test'
				: 'trimester_exam';
	const docType: ExamType = variant === 'supervised_test' ? 'test' : 'exam';
	const templateId: 'french/secondary' | 'french/bac_official' =
		variant === 'bac_mock' ? 'french/bac_official' : 'french/secondary';
	const difficulty: Difficulty = opts.difficulty ?? 'medium';
	const academicYear = opts.academicYear?.trim() || '2025 / 2026';

	const rng = new SeededRng(cleanSeed);
	const gradeMeta = FRENCH_GRADE_METADATA[grade];
	const [compPts, expPts, writPts] = gradeMeta.pointsSplit;

	const customDocTitle =
		variant === 'bac_mock'
			? 'Examen blanc du Baccalauréat — Langue Française'
			: docType === 'test'
				? `Devoir surveillé du ${TERM_NAMES_FR[trimesterId]} — Langue Française`
				: `Composition du ${TERM_NAMES_FR[trimesterId]} — Langue Française`;

	const metadata: ExamMetadata = {
		levelId: 'secondaire',
		yearId: gradeMeta.yearId,
		yearName: gradeMeta.yearNameFr,
		streamId: gradeMeta.streamId,
		streamName: gradeMeta.streamNameFr,
		subjectId: gradeMeta.subjectId,
		subjectName: 'Langue Française',
		coefficient: gradeMeta.coefficient,
		trimesterId,
		trimesterName: variant === 'bac_mock' ? 'Session d’entraînement BAC' : TERM_NAMES_FR[trimesterId],
		docType,
		academicYear,
		duration: variant === 'supervised_test' ? '01 h 00' : gradeMeta.examDurationFr,
		siteUrl: 'https://sujetstore.com',
		customDocTitle,
		...(variant === 'bac_mock'
			? { examSessionAr: 'Session 2026', topicNumber: opts.topicNumber ?? 1 }
			: {})
	};

	const rawPool =
		variant === 'bac_mock'
			? ALL_TRIMESTERS.flatMap((tid) => getFrenchTemplatesFor(grade, tid))
			: getFrenchTemplatesFor(grade, trimesterId);
	if (rawPool.length === 0) {
		throw new Error(`Empty secondary French template pool for ${grade} ${trimesterId}`);
	}

	const usedIds = new Set<string>();
	const usedSeeds = new Set<number>();
	const exerciseInstances: FrenchGeneratedExerciseInstance[] = [];
	const exercises: ExerciseBlock[] = [];

	const plan: Array<{ role: FrenchExamRole; points: number; customTitle: string }> =
		variant === 'supervised_test'
			? [
					{ role: 'comprehension', points: 10, customTitle: 'I. Compréhension de l’écrit — A / Analyse du texte' },
					{ role: 'text_exploration', points: 10, customTitle: 'I. Compréhension de l’écrit — B / Fonctionnement de la langue' }
				]
			: [
					{ role: 'comprehension', points: compPts, customTitle: 'I. Compréhension de l’écrit — A / Analyse du texte' },
					{ role: 'text_exploration', points: expPts, customTitle: 'I. Compréhension de l’écrit — B / Fonctionnement de la langue' },
					{ role: 'written_expression', points: writPts, customTitle: 'II. Production écrite' }
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
		templateId,
		totalPoints: 20,
		seed: cleanSeed,
		examDoc,
		exerciseInstances
	};
}
