import {
	ARABIC_GRADE_METADATA,
	SeededRng,
	getArabicTemplatesFor
} from '../../modules/ArabicTemplates/runtime';
import type {
	ArabicGeneratedExerciseInstance,
	ArabicMiddleTrackId,
	ArabicParameterizedTemplate,
	Difficulty
} from '../../modules/ArabicTemplates/runtime';
import type {
	ExamDocument,
	ExamMetadata,
	ExamType,
	ExerciseBlock,
	TrimesterId
} from '../../modules/SujetBuilder/types';
import { TRIMESTER_NAMES, drawDistinctSeed, scaleExercisePoints } from './shared';

export type ArabicMiddleVariant = 'trimester_exam' | 'supervised_test' | 'bem_mock';

export interface AssembledArabicMiddlePaper {
	id: string;
	grade: ArabicMiddleTrackId;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: ArabicMiddleVariant;
	templateId: 'middle/exam' | 'middle/quiz';
	totalPoints: 20;
	seed: number;
	examDoc: ExamDocument;
	exerciseInstances: ArabicGeneratedExerciseInstance[];
}

export interface AssembleArabicMiddleOptions {
	grade: ArabicMiddleTrackId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	difficulty?: Difficulty;
	variant?: ArabicMiddleVariant;
	academicYear?: string;
	schoolName?: string;
}

const VALID_MIDDLE_GRADES: readonly ArabicMiddleTrackId[] = ['1am', '2am', '3am', '4am'];
const ALL_TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];

function pickByRole(
	pool: ArabicParameterizedTemplate[],
	role: NonNullable<ArabicParameterizedTemplate['onecRole']>,
	rng: SeededRng,
	excludeIds: Set<string>
): ArabicParameterizedTemplate {
	const exact = pool.filter((t) => t.onecRole === role && !excludeIds.has(t.id));
	if (exact.length > 0) return rng.pick(exact);
	const anyRole = pool.filter((t) => t.onecRole === role);
	if (anyRole.length > 0) return rng.pick(anyRole);
	const unused = pool.filter((t) => !excludeIds.has(t.id));
	return rng.pick(unused.length > 0 ? unused : pool);
}

/**
 * Assemble an authentic Algerian Middle School / BEM Arabic paper (`1am`–`4am`, 20 pts total):
 * - Exam & 4AM BEM Mock (`02 ساعة`, coeff 5 in 4AM):
 *   الوضعية الجزئية الأولى (12ن = 6ن بناء فكري + 6ن بناء لغوي) + الوضعية الجزئية الثانية/الإدماجية (8ن) = 20 نقطة!
 * - Supervised Test (`فرض محروس`, `01 ساعة`):
 *   البناء الفكري (10ن) + البناء اللغوي (10ن) = 20 نقطة!
 */
export function assembleArabicMiddleExam(
	opts: AssembleArabicMiddleOptions
): AssembledArabicMiddlePaper {
	const { grade, trimesterId } = opts;
	if (!VALID_MIDDLE_GRADES.includes(grade)) {
		throw new Error(`Invalid middle Arabic track: ${String(grade)}`);
	}
	if (!ALL_TRIMESTERS.includes(trimesterId)) {
		throw new Error(`Invalid trimesterId for ${grade}: ${String(trimesterId)}`);
	}

	const cleanSeed = Number.isFinite(opts.seed) ? Math.trunc(opts.seed) : 1;
	const variant: ArabicMiddleVariant =
		opts.variant === 'bem_mock' && grade === '4am'
			? 'bem_mock'
			: opts.docType === 'test' || opts.variant === 'supervised_test'
				? 'supervised_test'
				: 'trimester_exam';
	const docType: ExamType = variant === 'supervised_test' ? 'test' : 'exam';
	const templateId: 'middle/exam' | 'middle/quiz' =
		variant === 'supervised_test' ? 'middle/quiz' : 'middle/exam';
	const difficulty: Difficulty = opts.difficulty ?? 'medium';
	const academicYear = opts.academicYear?.trim() || '2025 / 2026';
	const schoolName = opts.schoolName?.trim() || 'متوسطة جزائرية نموذجية — منصة SujetStore';

	const rng = new SeededRng(cleanSeed);
	const gradeMeta = ARABIC_GRADE_METADATA[grade];

	const metadata: ExamMetadata = {
		levelId: 'moyen',
		yearId: gradeMeta.yearId,
		yearName: gradeMeta.yearName,
		subjectId: gradeMeta.subjectId,
		subjectName: gradeMeta.subjectName,
		coefficient: gradeMeta.coefficient,
		trimesterId,
		trimesterName:
			variant === 'bem_mock'
				? 'دورة تجريبية لشهادة التعليم المتوسط'
				: TRIMESTER_NAMES[trimesterId],
		docType,
		academicYear,
		duration: variant === 'supervised_test' ? '01 ساعة' : '02 ساعة',
		schoolName,
		siteUrl: 'https://sujetstore.com',
		font: 'Arabic Transparent',
		...(variant === 'bem_mock'
			? { customDocTitle: 'امتحان تجريبي لشهادة التعليم المتوسط (BEM)' }
			: {})
	};

	const rawPool =
		variant === 'bem_mock'
			? ALL_TRIMESTERS.flatMap((tid) => getArabicTemplatesFor('4am', tid))
			: getArabicTemplatesFor(grade, trimesterId);
	if (rawPool.length === 0) {
		throw new Error(`Empty middle Arabic template pool for ${grade} ${trimesterId}`);
	}

	const usedIds = new Set<string>();
	const usedSeeds = new Set<number>();
	const exerciseInstances: ArabicGeneratedExerciseInstance[] = [];
	const exercises: ExerciseBlock[] = [];

	const plan: Array<{
		role: NonNullable<ArabicParameterizedTemplate['onecRole']>;
		points: number;
		customTitle: string;
	}> =
		variant === 'supervised_test'
			? [
					{ role: 'intellectual_building', points: 10, customTitle: 'أولاً: البناء الفكري' },
					{ role: 'linguistic_building', points: 10, customTitle: 'ثانياً: البناء اللغوي' }
				]
			: [
					{
						role: 'intellectual_building',
						points: 6,
						customTitle: 'الوضعية الجزئية الأولى — أ/ البناء الفكري'
					},
					{
						role: 'linguistic_building',
						points: 6,
						customTitle: 'الوضعية الجزئية الأولى — ب/ البناء اللغوي'
					},
					{
						role: 'integration',
						points: 8,
						customTitle: 'الوضعية الجزئية الثانية — الوضعية الإدماجية'
					}
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

	const paperId = `arb-${grade}-${trimesterId}-${variant}-${cleanSeed}`;
	const examDoc: ExamDocument = {
		metadata,
		exercises
	};

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
