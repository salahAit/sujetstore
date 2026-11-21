import {
	ARABIC_GRADE_METADATA,
	SeededRng,
	getArabicTemplatesFor
} from '../../modules/ArabicTemplates/runtime';
import type {
	ArabicGeneratedExerciseInstance,
	ArabicParameterizedTemplate,
	ArabicPrimaryTrackId,
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

export type ArabicPrimaryVariant = 'trimester_exam' | 'supervised_test' | 'competency_eval';

export interface AssembledArabicPrimaryPaper {
	id: string;
	grade: ArabicPrimaryTrackId;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: ArabicPrimaryVariant;
	templateId: 'primary/taqweem';
	totalPoints: 10;
	seed: number;
	examDoc: ExamDocument;
	exerciseInstances: ArabicGeneratedExerciseInstance[];
}

export interface AssembleArabicPrimaryOptions {
	grade: ArabicPrimaryTrackId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	difficulty?: Difficulty;
	variant?: ArabicPrimaryVariant;
	academicYear?: string;
	schoolName?: string;
}

const VALID_PRIMARY_GRADES: readonly ArabicPrimaryTrackId[] = ['1ap', '2ap', '3ap', '4ap', '5ap'];
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
 * Assemble an authentic Algerian Primary Arabic paper (`1ap`–`5ap`, 10 pts total):
 * - `1ap`: respects the 2024/2025 Ministry reform with friendly diagnostic/formative assessment headers (`التقييم التشخيصي والتكويني`).
 * - `5ap` `competency_eval`: official 2024–2025 `امتحان تقييم المكتسبات` (فهم المكتوب + المحمول الفكري واللغوي + الإنتاج الكتابي).
 */
export function assembleArabicPrimaryExam(
	opts: AssembleArabicPrimaryOptions
): AssembledArabicPrimaryPaper {
	const { grade, trimesterId } = opts;
	if (!VALID_PRIMARY_GRADES.includes(grade)) {
		throw new Error(`Invalid primary Arabic track: ${String(grade)}`);
	}
	if (!ALL_TRIMESTERS.includes(trimesterId)) {
		throw new Error(`Invalid trimesterId for ${grade}: ${String(trimesterId)}`);
	}

	const cleanSeed = Number.isFinite(opts.seed) ? Math.trunc(opts.seed) : 1;
	const variant: ArabicPrimaryVariant =
		grade === '5ap' && opts.variant === 'competency_eval'
			? 'competency_eval'
			: opts.docType === 'test' || opts.variant === 'supervised_test'
				? 'supervised_test'
				: 'trimester_exam';
	const docType: ExamType = variant === 'supervised_test' ? 'test' : 'exam';
	const difficulty: Difficulty = opts.difficulty ?? 'medium';
	const academicYear = opts.academicYear?.trim() || '2025 / 2026';
	const schoolName = opts.schoolName?.trim() || 'مدرسة ابتدائية نموذجية — منصة SujetStore';

	const rng = new SeededRng(cleanSeed);
	const gradeMeta = ARABIC_GRADE_METADATA[grade];

	const customDocTitle =
		variant === 'competency_eval'
			? 'امتحان تقييم المكتسبات (فهم المكتوب والإنتاج الكتابي)'
			: grade === '1ap'
				? docType === 'test'
					? 'تقويم تشخيصي وتكويني'
					: 'تقييم مرحلي وتكويني'
				: undefined;

	const duration =
		docType === 'test'
			? '45 دقيقة'
			: grade === '1ap' || grade === '2ap'
				? '45 دقيقة'
				: grade === '3ap'
					? '01 ساعة'
					: '01 ساعة و30 دقيقة';

	const metadata: ExamMetadata = {
		levelId: 'primaire',
		yearId: gradeMeta.yearId,
		yearName: gradeMeta.yearName,
		subjectId: gradeMeta.subjectId,
		subjectName: gradeMeta.subjectName,
		trimesterId,
		trimesterName:
			variant === 'competency_eval'
				? 'تقييم مكتسبات مرحلة التعليم الابتدائي'
				: TRIMESTER_NAMES[trimesterId],
		docType,
		academicYear,
		duration,
		schoolName,
		siteUrl: 'https://sujetstore.com',
		font: 'Arabic Transparent',
		...(customDocTitle ? { customDocTitle } : {})
	};

	const rawPool =
		variant === 'competency_eval'
			? ALL_TRIMESTERS.flatMap((tid) => getArabicTemplatesFor(grade, tid))
			: getArabicTemplatesFor(grade, trimesterId);
	if (rawPool.length === 0) {
		throw new Error(`Empty Arabic template pool for ${grade} ${trimesterId}`);
	}

	const usedIds = new Set<string>();
	const usedSeeds = new Set<number>();
	const exerciseInstances: ArabicGeneratedExerciseInstance[] = [];
	const exercises: ExerciseBlock[] = [];

	// Primary Arabic 10-point distribution:
	// - Exam / 5AP Competency Eval: Intellectual (3) + Linguistic (3) + Written Production/Integration (4) = 10
	// - Test (تقويم مرحلي): Intellectual (4) + Linguistic 1 (3) + Linguistic 2 (3) = 10
	const plan: Array<{
		role: NonNullable<ArabicParameterizedTemplate['onecRole']>;
		points: number;
		customTitle: string;
	}> =
		variant === 'supervised_test'
			? [
					{ role: 'intellectual_building', points: 4, customTitle: 'أولاً: السند وأسئلة الفهم' },
					{ role: 'linguistic_building', points: 3, customTitle: 'ثانياً: أسئلة اللغة والقواعد' },
					{ role: 'linguistic_building', points: 3, customTitle: 'ثالثاً: الصرف والإملاء' }
				]
			: variant === 'competency_eval'
				? [
						{
							role: 'intellectual_building',
							points: 3,
							customTitle: 'الكفاءة الأولى: فهم المكتوب والمحمول الفكري'
						},
						{
							role: 'linguistic_building',
							points: 3,
							customTitle: 'الكفاءة الثانية: المحمول اللغوي والقواعد'
						},
						{
							role: 'integration',
							points: 4,
							customTitle: 'الكفاءة الثالثة: الإنتاج الكتابي (الوضعية الإدماجية)'
						}
					]
				: [
						{ role: 'intellectual_building', points: 3, customTitle: 'أولاً: أسئلة الفهم (البناء الفكري)' },
						{ role: 'linguistic_building', points: 3, customTitle: 'ثانياً: أسئلة اللغة (البناء اللغوي)' },
						{ role: 'integration', points: 4, customTitle: 'ثالثاً: الوضعية الإدماجية (الإنتاج الكتابي)' }
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
		templateId: 'primary/taqweem',
		totalPoints: 10,
		seed: cleanSeed,
		examDoc,
		exerciseInstances
	};
}
