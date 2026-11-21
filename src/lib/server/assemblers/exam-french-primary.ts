import {
	FRENCH_GRADE_METADATA,
	SeededRng,
	getFrenchTemplatesFor
} from '../../modules/FrenchTemplates/runtime';
import type {
	Difficulty,
	FrenchExamRole,
	FrenchGeneratedExerciseInstance,
	FrenchParameterizedTemplate,
	FrenchPrimaryTrackId
} from '../../modules/FrenchTemplates/runtime';
import type {
	ExamDocument,
	ExamMetadata,
	ExamType,
	ExerciseBlock,
	TrimesterId
} from '../../modules/SujetBuilder/types';
import { drawDistinctSeed, scaleExercisePoints } from './shared';

export type FrenchPrimaryVariant = 'trimester_exam' | 'supervised_test' | 'competency_eval';

export interface AssembledFrenchPrimaryPaper {
	id: string;
	grade: FrenchPrimaryTrackId;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: FrenchPrimaryVariant;
	templateId: 'french/primary';
	totalPoints: 10;
	seed: number;
	examDoc: ExamDocument;
	exerciseInstances: FrenchGeneratedExerciseInstance[];
}

export interface AssembleFrenchPrimaryOptions {
	grade: FrenchPrimaryTrackId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	difficulty?: Difficulty;
	variant?: FrenchPrimaryVariant;
	academicYear?: string;
	schoolName?: string;
}

const VALID_PRIMARY_GRADES: readonly FrenchPrimaryTrackId[] = ['3ap', '4ap', '5ap'];
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

export function assembleFrenchPrimaryExam(
	opts: AssembleFrenchPrimaryOptions
): AssembledFrenchPrimaryPaper {
	const { grade, trimesterId } = opts;
	if (!VALID_PRIMARY_GRADES.includes(grade)) {
		throw new Error(`Invalid primary French track: ${String(grade)}`);
	}
	if (!ALL_TRIMESTERS.includes(trimesterId)) {
		throw new Error(`Invalid trimesterId for ${grade}: ${String(trimesterId)}`);
	}

	const cleanSeed = Number.isFinite(opts.seed) ? Math.trunc(opts.seed) : 1;
	const variant: FrenchPrimaryVariant =
		grade === '5ap' && opts.variant === 'competency_eval'
			? 'competency_eval'
			: opts.docType === 'test' || opts.variant === 'supervised_test'
				? 'supervised_test'
				: 'trimester_exam';
	const docType: ExamType = variant === 'supervised_test' ? 'test' : 'exam';
	const difficulty: Difficulty = opts.difficulty ?? 'medium';
	const academicYear = opts.academicYear?.trim() || '2025 / 2026';

	const rng = new SeededRng(cleanSeed);
	const gradeMeta = FRENCH_GRADE_METADATA[grade];

	const customDocTitle =
		variant === 'competency_eval'
			? 'Évaluation des Acquis du Cycle Primaire — Langue Française (5AP)'
			: docType === 'test'
				? `Évaluation du ${TERM_NAMES_FR[trimesterId]} — Langue Française`
				: `Composition du ${TERM_NAMES_FR[trimesterId]} — Langue Française`;

	const metadata: ExamMetadata = {
		levelId: 'primaire',
		yearId: gradeMeta.yearId,
		yearName: gradeMeta.yearNameFr,
		subjectId: gradeMeta.subjectId,
		subjectName: 'Langue Française',
		trimesterId,
		trimesterName:
			variant === 'competency_eval'
				? 'Évaluation des Acquis (Fin de Cycle)'
				: TERM_NAMES_FR[trimesterId],
		docType,
		academicYear,
		duration: docType === 'test' ? '45 min' : gradeMeta.examDurationFr,
		siteUrl: 'https://sujetstore.com',
		customDocTitle
	};

	const rawPool =
		variant === 'competency_eval'
			? ALL_TRIMESTERS.flatMap((tid) => getFrenchTemplatesFor(grade, tid))
			: getFrenchTemplatesFor(grade, trimesterId);
	if (rawPool.length === 0) {
		throw new Error(`Empty primary French template pool for ${grade} ${trimesterId}`);
	}

	const usedIds = new Set<string>();
	const usedSeeds = new Set<number>();
	const exerciseInstances: FrenchGeneratedExerciseInstance[] = [];
	const exercises: ExerciseBlock[] = [];

	const plan: Array<{ role: FrenchExamRole; points: number; customTitle: string }> =
		variant === 'supervised_test'
			? [
					{ role: 'comprehension', points: 4, customTitle: 'I. Compréhension de l’écrit' },
					{ role: 'text_exploration', points: 3, customTitle: 'II. Fonctionnement de la langue (A)' },
					{ role: 'text_exploration', points: 3, customTitle: 'III. Vocabulaire et Orthographe (B)' }
				]
			: variant === 'competency_eval'
				? [
						{ role: 'comprehension', points: 4, customTitle: 'Compétence 1 : Compréhension de l’écrit' },
						{ role: 'text_exploration', points: 3, customTitle: 'Compétence 2 : Ressources linguistiques' },
						{ role: 'written_expression', points: 3, customTitle: 'Compétence 3 : Production écrite' }
					]
				: [
						{ role: 'comprehension', points: 4, customTitle: 'I. Compréhension de l’écrit' },
						{ role: 'text_exploration', points: 3, customTitle: 'II. Fonctionnement de la langue' },
						{ role: 'written_expression', points: 3, customTitle: 'III. Production écrite' }
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
		templateId: 'french/primary',
		totalPoints: 10,
		seed: cleanSeed,
		examDoc,
		exerciseInstances
	};
}
