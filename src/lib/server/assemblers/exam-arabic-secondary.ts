import {
	ARABIC_GRADE_METADATA,
	ARABIC_SECONDARY_TRACK_IDS,
	SeededRng,
	getArabicTemplatesFor
} from '../../modules/ArabicTemplates';
import type {
	ArabicGeneratedExerciseInstance,
	ArabicParameterizedTemplate,
	ArabicSecondaryTrackId,
	Difficulty
} from '../../modules/ArabicTemplates';
import type {
	ExamDocument,
	ExamMetadata,
	ExamType,
	ExerciseBlock,
	TrimesterId
} from '../../modules/SujetBuilder/types';
import { TRIMESTER_NAMES, drawDistinctSeed, scaleExercisePoints } from './shared';

export type ArabicSecondaryVariant = 'trimester_exam' | 'supervised_test' | 'bac_mock';

export interface AssembledArabicSecondaryPaper {
	id: string;
	grade: ArabicSecondaryTrackId;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: ArabicSecondaryVariant;
	templateId: 'secondary/lycee_exam' | 'secondary/bac_official';
	totalPoints: 20;
	seed: number;
	examDoc: ExamDocument;
	exerciseInstances: ArabicGeneratedExerciseInstance[];
}

export interface AssembleArabicSecondaryOptions {
	grade: ArabicSecondaryTrackId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	difficulty?: Difficulty;
	variant?: ArabicSecondaryVariant;
	academicYear?: string;
	schoolName?: string;
	topicNumber?: 1 | 2;
}

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
 * Assemble an authentic Algerian Secondary / BAC Arabic paper (`1as`, `2as`, `3as`, all 14 tracks):
 * - Scientific & Management (`ARB-SCI`: `1as_tcst`, `2as_{se,tm,math,ge}`, `3as_{se,tm,math,ge}`):
 *   البناء الفكري (12ن) + البناء اللغوي (08ن) = 20 نقطة (بدون التقييم النقدي!).
 * - Literature & Philosophy (`ARB-LP`: `1as_tcl`, `2as_lp`, `3as_lp`) & Foreign Languages (`ARB-LE`: `2as_le`, `3as_le`):
 *   Exam & BAC Mock: البناء الفكري (10ن) + البناء اللغوي (06ن) + التقييم النقدي (04ن) = 20 نقطة!
 *   Supervised Test (1h): البناء الفكري (12ن) + البناء اللغوي (08ن) = 20 نقطة.
 */
export function assembleArabicSecondaryExam(
	opts: AssembleArabicSecondaryOptions
): AssembledArabicSecondaryPaper {
	const { grade, trimesterId } = opts;
	if (!ARABIC_SECONDARY_TRACK_IDS.includes(grade)) {
		throw new Error(`Invalid secondary Arabic track: ${String(grade)}`);
	}
	if (!ALL_TRIMESTERS.includes(trimesterId)) {
		throw new Error(`Invalid trimesterId for ${grade}: ${String(trimesterId)}`);
	}

	const cleanSeed = Number.isFinite(opts.seed) ? Math.trunc(opts.seed) : 1;
	const isBacTrack = grade.startsWith('3as_');
	const variant: ArabicSecondaryVariant =
		opts.variant === 'bac_mock' && isBacTrack
			? 'bac_mock'
			: opts.docType === 'test' || opts.variant === 'supervised_test'
				? 'supervised_test'
				: 'trimester_exam';
	const docType: ExamType = variant === 'supervised_test' ? 'test' : 'exam';
	const templateId: 'secondary/lycee_exam' | 'secondary/bac_official' =
		variant === 'bac_mock' ? 'secondary/bac_official' : 'secondary/lycee_exam';
	const difficulty: Difficulty = opts.difficulty ?? 'medium';
	const academicYear = opts.academicYear?.trim() || '2025 / 2026';
	const schoolName = opts.schoolName?.trim() || 'ثانوية جزائرية نموذجية — منصة SujetStore';

	const rng = new SeededRng(cleanSeed);
	const gradeMeta = ARABIC_GRADE_METADATA[grade];

	const duration = variant === 'supervised_test' ? '01 ساعة' : gradeMeta.examDuration;

	const metadata: ExamMetadata = {
		levelId: 'secondaire',
		yearId: gradeMeta.yearId,
		yearName: gradeMeta.yearName,
		streamId: gradeMeta.streamId,
		streamName: gradeMeta.streamNameAr,
		subjectId: gradeMeta.subjectId,
		subjectName: gradeMeta.subjectName,
		coefficient: gradeMeta.coefficient,
		trimesterId,
		trimesterName:
			variant === 'bac_mock'
				? 'دورة تجريبية تحضيرية لشهادة البكالوريا'
				: TRIMESTER_NAMES[trimesterId],
		docType,
		academicYear,
		duration,
		schoolName,
		siteUrl: 'https://sujetstore.com',
		font: 'Arabic Transparent',
		...(variant === 'bac_mock'
			? {
					customDocTitle: 'بكالوريا تجريبية للتعليم الثانوي',
					examSessionAr: 'دورة تجريبية تحضيرية — 2026',
					topicNumber: opts.topicNumber ?? 1
				}
			: {})
	};

	const rawPool =
		variant === 'bac_mock'
			? ALL_TRIMESTERS.flatMap((tid) => getArabicTemplatesFor(grade, tid))
			: getArabicTemplatesFor(grade, trimesterId);
	if (rawPool.length === 0) {
		throw new Error(`Empty secondary Arabic template pool for ${grade} ${trimesterId}`);
	}

	const usedIds = new Set<string>();
	const usedSeeds = new Set<number>();
	const exerciseInstances: ArabicGeneratedExerciseInstance[] = [];
	const exercises: ExerciseBlock[] = [];

	const includeCriticalEval = gradeMeta.hasCriticalEvaluation && variant !== 'supervised_test';

	const plan: Array<{
		role: NonNullable<ArabicParameterizedTemplate['onecRole']>;
		points: number;
		customTitle: string;
	}> = includeCriticalEval
		? [
				{ role: 'intellectual_building', points: 10, customTitle: 'أولاً: البناء الفكري' },
				{ role: 'linguistic_building', points: 6, customTitle: 'ثانياً: البناء اللغوي' },
				{ role: 'critical_evaluation', points: 4, customTitle: 'ثالثاً: التقييم النقدي' }
			]
		: [
				{ role: 'intellectual_building', points: 12, customTitle: 'أولاً: البناء الفكري' },
				{ role: 'linguistic_building', points: 8, customTitle: 'ثانياً: البناء اللغوي' }
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
