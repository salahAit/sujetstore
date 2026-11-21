import {
	ALL_ISLAMIC_TRACK_IDS,
	ISLAMIC_GRADE_METADATA,
	SeededRng,
	getIslamicTemplatesFor,
	type Difficulty,
	type IslamicGeneratedExerciseInstance,
	type IslamicParameterizedTemplate,
	type IslamicTrackId
} from '../../modules/IslamicTemplates/runtime';
import type {
	ExamDocument,
	ExamMetadata,
	ExamType,
	ExerciseBlock,
	TemplateId,
	TrimesterId
} from '../../modules/SujetBuilder/types';
import { TRIMESTER_NAMES, drawDistinctSeed, scaleExercisePoints } from './shared';

export type IslamicExamVariant =
	| 'trimester_exam'
	| 'supervised_test'
	| 'competency_eval'
	| 'bem_mock'
	| 'bac_mock';

export interface AssembledIslamicPaper {
	id: string;
	grade: IslamicTrackId;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: IslamicExamVariant;
	templateId: TemplateId;
	totalPoints: 10 | 20;
	seed: number;
	examDoc: ExamDocument;
	exerciseInstances: IslamicGeneratedExerciseInstance[];
}

export interface AssembleIslamicOptions {
	grade: IslamicTrackId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	variant?: IslamicExamVariant;
	difficulty?: Difficulty;
	academicYear?: string;
	schoolName?: string;
	topicNumber?: 1 | 2;
}

const ALL_TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];

function pickByRole(
	pool: IslamicParameterizedTemplate[],
	role: NonNullable<IslamicParameterizedTemplate['onecRole']>,
	rng: SeededRng,
	excludeIds: Set<string>
): IslamicParameterizedTemplate {
	const exact = pool.filter((t) => t.onecRole === role && !excludeIds.has(t.id));
	if (exact.length > 0) return rng.pick(exact);
	const anyRole = pool.filter((t) => t.onecRole === role);
	if (anyRole.length > 0) return rng.pick(anyRole);
	const unused = pool.filter((t) => !excludeIds.has(t.id));
	return rng.pick(unused.length > 0 ? unused : pool);
}

/**
 * Assemble an authentic Algerian Islamic Education (`التربية الإسلامية`) or
 * Islamic Sciences (`العلوم الإسلامية`) exam/test across all 23 tracks:
 * - Primary (`1ap`–`5ap`, 10 pts): 3 + 3 + 4 = 10 pts (supports 5AP `competency_eval`)
 * - Middle (`1am`–`4am BEM`, 20 pts): Exam/BEM 6 + 6 + 8 = 20 pts; Test 10 + 10 = 20 pts
 * - Secondary (`1as`–`3as BAC`, 20 pts): Part 1 (12 pts) + Part 2 (08 pts) = 20 pts (coeff 2, 2h30 BAC)
 */
export function assembleIslamicPaper(opts: AssembleIslamicOptions): AssembledIslamicPaper {
	const { grade, trimesterId } = opts;
	if (!ALL_ISLAMIC_TRACK_IDS.includes(grade)) {
		throw new Error(`Invalid Islamic track: ${String(grade)}`);
	}
	if (!ALL_TRIMESTERS.includes(trimesterId)) {
		throw new Error(`Invalid trimesterId for ${grade}: ${String(trimesterId)}`);
	}

	const cleanSeed = Number.isFinite(opts.seed) ? Math.trunc(opts.seed) : 1;
	const meta = ISLAMIC_GRADE_METADATA[grade];
	const difficulty: Difficulty = opts.difficulty ?? 'medium';
	const academicYear = opts.academicYear?.trim() || '2025 / 2026';

	let variant: IslamicExamVariant;
	if (grade === '5ap' && opts.variant === 'competency_eval') {
		variant = 'competency_eval';
	} else if (grade === '4am' && opts.variant === 'bem_mock') {
		variant = 'bem_mock';
	} else if (grade.startsWith('3as_') && opts.variant === 'bac_mock') {
		variant = 'bac_mock';
	} else if (opts.docType === 'test' || opts.variant === 'supervised_test') {
		variant = 'supervised_test';
	} else {
		variant = 'trimester_exam';
	}

	const docType: ExamType = variant === 'supervised_test' ? 'test' : 'exam';
	const totalPoints: 10 | 20 = meta.levelId === 'primaire' ? 10 : 20;

	let templateId: TemplateId;
	if (meta.levelId === 'primaire') {
		templateId = 'primary/taqweem';
	} else if (meta.levelId === 'moyen') {
		templateId = variant === 'supervised_test' ? 'middle/quiz' : 'middle/exam';
	} else {
		templateId = variant === 'bac_mock' ? 'secondary/bac_official' : 'secondary/lycee_exam';
	}

	const schoolName =
		opts.schoolName?.trim() ||
		(meta.levelId === 'primaire'
			? 'مدرسة ابتدائية نموذجية — منصة SujetStore'
			: meta.levelId === 'moyen'
				? 'متوسطة جزائرية نموذجية — منصة SujetStore'
				: 'ثانوية جزائرية نموذجية — منصة SujetStore');

	const duration =
		variant === 'supervised_test'
			? meta.levelId === 'primaire'
				? '30 دقيقة'
				: '01 ساعة'
			: meta.examDuration;

	const customDocTitle =
		variant === 'competency_eval'
			? 'امتحان تقييم المكتسبات في التربية الإسلامية'
			: variant === 'bem_mock'
				? 'امتحان تجريبي لشهادة التعليم المتوسط (BEM)'
				: variant === 'bac_mock'
					? 'بكالوريا تجريبية للتعليم الثانوي'
					: grade === '1ap'
						? docType === 'test'
							? 'تقويم تشخيصي وتكويني'
							: 'تقييم مرحلي وتكويني'
						: undefined;

	const trimesterName =
		variant === 'competency_eval'
			? 'تقييم مكتسبات مرحلة التعليم الابتدائي'
			: variant === 'bem_mock'
				? 'دورة تجريبية لشهادة التعليم المتوسط'
				: variant === 'bac_mock'
					? 'دورة تجريبية تحضيرية لشهادة البكالوريا'
					: TRIMESTER_NAMES[trimesterId];

	const metadata: ExamMetadata = {
		levelId: meta.levelId,
		yearId: meta.yearId,
		yearName: meta.yearName,
		...(meta.streamId ? { streamId: meta.streamId, streamName: meta.streamNameAr } : {}),
		subjectId: meta.subjectId,
		subjectName: meta.subjectName,
		coefficient: meta.coefficient,
		trimesterId,
		trimesterName,
		docType,
		academicYear,
		duration,
		schoolName,
		siteUrl: 'https://sujetstore.com',
		font: 'Arabic Transparent',
		...(customDocTitle ? { customDocTitle } : {}),
		...(variant === 'bac_mock'
			? {
					examSessionAr: 'دورة تجريبية تحضيرية — 2026',
					topicNumber: opts.topicNumber ?? 1
				}
			: {})
	};

	const rawPool =
		variant === 'competency_eval' || variant === 'bem_mock' || variant === 'bac_mock'
			? ALL_TRIMESTERS.flatMap((tid) => getIslamicTemplatesFor(grade, tid))
			: getIslamicTemplatesFor(grade, trimesterId);

	if (rawPool.length === 0) {
		throw new Error(`Empty Islamic template pool for ${grade} ${trimesterId}`);
	}

	const rng = new SeededRng(cleanSeed);
	const usedIds = new Set<string>();
	const usedSeeds = new Set<number>();
	const exerciseInstances: IslamicGeneratedExerciseInstance[] = [];
	const exercises: ExerciseBlock[] = [];

	type SlotPlan = Array<{
		role: NonNullable<IslamicParameterizedTemplate['onecRole']>;
		points: number;
		customTitle: string;
	}>;

	let plan: SlotPlan;
	if (meta.levelId === 'primaire') {
		plan =
			variant === 'supervised_test'
				? [
						{ role: 'part1_knowledge', points: 4, customTitle: 'التمرين الأول: القرآن الكريم والعقيدة' },
						{ role: 'part2_application', points: 3, customTitle: 'التمرين الثاني: العبادات والأخلاق' },
						{ role: 'part2_application', points: 3, customTitle: 'التمرين الثالث: السيرة والتطبيقات' }
					]
				: variant === 'competency_eval'
					? [
							{ role: 'part1_knowledge', points: 3, customTitle: 'الكفاءة الأولى: تلاوة السند الشرعي وفهمه' },
							{ role: 'part2_application', points: 3, customTitle: 'الكفاءة الثانية: توظيف الأحكام الشرعية والعبادات' },
							{ role: 'integration', points: 4, customTitle: 'الكفاءة الثالثة: الوضعية الإدماجية القيمية' }
						]
					: [
							{ role: 'part1_knowledge', points: 3, customTitle: 'التمرين الأول: القرآن الكريم والعقيدة' },
							{ role: 'part2_application', points: 3, customTitle: 'التمرين الثاني: العبادات والسيرة والأخلاق' },
							{ role: 'integration', points: 4, customTitle: 'الوضعية الإدماجية' }
						];
	} else if (meta.levelId === 'moyen') {
		plan =
			variant === 'supervised_test'
				? [
						{ role: 'part1_knowledge', points: 10, customTitle: 'الوضعية الأولى: القرآن الكريم والحديث والعقيدة' },
						{ role: 'part2_application', points: 10, customTitle: 'الوضعية الثانية: الفقه والسيرة والأخلاق' }
					]
				: [
						{ role: 'part1_knowledge', points: 6, customTitle: 'الجزء الأول — الوضعية الأولى' },
						{ role: 'part2_application', points: 6, customTitle: 'الجزء الأول — الوضعية الثانية' },
						{ role: 'integration', points: 8, customTitle: 'الجزء الثاني — الوضعية الإدماجية' }
					];
	} else {
		// Secondary 1AS / 2AS / 3AS BAC: authentic 12 + 8 = 20 structure
		plan = [
			{ role: 'bac_part1', points: 12, customTitle: 'الجزء الأول' },
			{ role: 'bac_part2', points: 8, customTitle: 'الجزء الثاني' }
		];
	}

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

	const paperId = `isl-${grade}-${trimesterId}-${variant}-${cleanSeed}`;
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
		totalPoints,
		seed: cleanSeed,
		examDoc,
		exerciseInstances
	};
}
