import {
	SCIENCES_GRADE_METADATA,
	SeededRng,
	getSciencesTemplatesFor
} from '../../modules/SciencesTemplates/runtime';
import type {
	Difficulty,
	SciencesDomain,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate,
	SciencesSecondaryTrackId
} from '../../modules/SciencesTemplates/runtime';
import type {
	ExamDocument,
	ExamMetadata,
	ExamType,
	ExerciseBlock,
	TrimesterId
} from '../../modules/SujetBuilder/types';
import {
	TEST_THREE_ORDINALS,
	TEST_TWO_ORDINALS,
	TRIMESTER_NAMES,
	drawDistinctSeed,
	scaleExercisePoints
} from './shared';

export type SciencesSecondaryVariant = 'trimester_exam' | 'supervised_test' | 'bac_mock';

export interface AssembledSciencesSecondaryPaper {
	id: string;
	grade: SciencesSecondaryTrackId;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: SciencesSecondaryVariant;
	templateId: 'secondary/lycee_exam' | 'secondary/bac_official';
	totalPoints: 20;
	seed: number;
	examDoc: ExamDocument;
	exerciseInstances: SciencesGeneratedExerciseInstance[];
}

export interface AssembleSciencesSecondaryOptions {
	grade: SciencesSecondaryTrackId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	difficulty?: Difficulty;
	variant?: SciencesSecondaryVariant;
	academicYear?: string;
	schoolName?: string;
	topicNumber?: 1 | 2;
}

const VALID_SECONDARY_GRADES: readonly SciencesSecondaryTrackId[] = [
	'1as_tcst',
	'2as_se',
	'2as_math',
	'3as_se',
	'3as_math'
];
const ALL_TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];
const BAC_ELIGIBLE_GRADES: readonly SciencesSecondaryTrackId[] = ['3as_se', '3as_math'];

// Official ONEC Algerian Natural Sciences point distributions:
// - SE / 1AS TCST: 5 (Recall + Scientific Text) + 7 (Reasoning) + 8 (Scientific Approach + Flowchart) = 20
// - MATH (2AS & 3AS): 8 (Recall/Reasoning) + 12 (Scientific Approach + Flowchart) = 20
const TEST_POINTS = [8, 12] as const;
const EXAM_3_POINTS_SE = [5, 7, 8] as const;
const EXAM_2_POINTS_MATH = [8, 12] as const;

const BAC_MOCK_DOC_TITLE = 'بكالوريا تجريبية للتعليم الثانوي';
const BAC_MOCK_SESSION_NAME = 'دورة تجريبية تحضيرية لشهادة البكالوريا';

function isBacGrade(grade: SciencesSecondaryTrackId): boolean {
	return BAC_ELIGIBLE_GRADES.includes(grade);
}

function isAllowedForSciencesTrack(
	t: SciencesParameterizedTemplate,
	track: SciencesSecondaryTrackId
): boolean {
	// Official ONEC rule: 3AS MATH is strictly restricted to Domain 1 (Protein Functional Specialization)
	if (track === '3as_math' && (t.domain === 'bioenergetics' || t.domain === 'plate_tectonics')) {
		return false;
	}
	return true;
}

function resolveSecondaryDuration(
	grade: SciencesSecondaryTrackId,
	variant: SciencesSecondaryVariant
): string {
	if (variant === 'supervised_test') {
		return grade === '3as_se' || grade === '2as_se' ? '01 ساعة و30 دقيقة' : '01 ساعة';
	}
	switch (grade) {
		case '1as_tcst':
			return '02 ساعة';
		case '2as_se':
			return '02 ساعة و30 دقيقة';
		case '2as_math':
			return '02 ساعة';
		case '3as_se':
			return '04 ساعات و30 دقيقة';
		case '3as_math':
			return '02 ساعة و30 دقيقة';
	}
}

function pickByRoleOrBalanced(
	pool: SciencesParameterizedTemplate[],
	preferredRoles: Array<'recall' | 'reasoning' | 'scientific_approach' | 'integration'>,
	rng: SeededRng
): SciencesParameterizedTemplate[] {
	const picked: SciencesParameterizedTemplate[] = [];
	const usedIds = new Set<string>();
	const usedDomains = new Set<SciencesDomain>();

	for (const role of preferredRoles) {
		const exactDiffDomain = pool.filter(
			(t) => t.onecRole === role && !usedIds.has(t.id) && !usedDomains.has(t.domain)
		);
		const exactAny = pool.filter((t) => t.onecRole === role && !usedIds.has(t.id));
		const diffDomainAny = pool.filter((t) => !usedIds.has(t.id) && !usedDomains.has(t.domain));
		const rem = pool.filter((t) => !usedIds.has(t.id));
		const bucket =
			exactDiffDomain.length > 0
				? exactDiffDomain
				: exactAny.length > 0
					? exactAny
					: diffDomainAny.length > 0
						? diffDomainAny
						: rem.length > 0
							? rem
							: pool;
		const chosen = rng.pick(bucket);
		picked.push(chosen);
		usedIds.add(chosen.id);
		usedDomains.add(chosen.domain);
	}
	return picked;
}

/**
 * Assemble a complete, deterministic Algerian Secondary Natural Sciences paper:
 * - `1as_tcst`, `2as_se`, `3as_se`: ONEC 3-exercise layout (`5 + 7 + 8 = 20 pts`, 4h30 for 3AS SE)
 * - `2as_math`, `3as_math`: ONEC 2-exercise MATH layout (`8 + 12 = 20 pts`, 2h30 for 3AS MATH, Domain 1 only)
 */
export function assembleSciencesSecondaryExam(
	opts: AssembleSciencesSecondaryOptions
): AssembledSciencesSecondaryPaper {
	const { grade, trimesterId } = opts;
	if (!VALID_SECONDARY_GRADES.includes(grade)) {
		throw new Error(`Invalid secondary sciences track: ${String(grade)}`);
	}
	if (!ALL_TRIMESTERS.includes(trimesterId)) {
		throw new Error(`Invalid trimesterId for ${grade}: ${String(trimesterId)}`);
	}

	const cleanSeed = Number.isFinite(opts.seed) ? Math.trunc(opts.seed) : 1;
	const variant: SciencesSecondaryVariant =
		opts.variant === 'bac_mock' && isBacGrade(grade)
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
	const gradeMeta = SCIENCES_GRADE_METADATA[grade];

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
		trimesterName: variant === 'bac_mock' ? BAC_MOCK_SESSION_NAME : TRIMESTER_NAMES[trimesterId],
		docType,
		academicYear,
		duration: resolveSecondaryDuration(grade, variant),
		schoolName,
		siteUrl: 'https://sujetstore.com',
		...(variant === 'bac_mock'
			? {
					customDocTitle: BAC_MOCK_DOC_TITLE,
					examSessionAr: BAC_MOCK_SESSION_NAME,
					topicNumber: opts.topicNumber ?? 1
				}
			: {})
	};

	const rawPool =
		variant === 'bac_mock'
			? ALL_TRIMESTERS.flatMap((tid) => getSciencesTemplatesFor(grade, tid))
			: getSciencesTemplatesFor(grade, trimesterId);
	const allowedPool = rawPool.filter((t) => isAllowedForSciencesTrack(t, grade));
	if (allowedPool.length < 2) {
		throw new Error(`Not enough Sciences templates for ${grade}/${trimesterId} (${allowedPool.length})`);
	}

	const usedSeeds = new Set<number>();
	const exerciseInstances: SciencesGeneratedExerciseInstance[] = [];
	const exercises: ExerciseBlock[] = [];

	const isMathStream = grade === '2as_math' || grade === '3as_math';

	if (variant === 'supervised_test' || isMathStream) {
		const pts = variant === 'supervised_test' ? TEST_POINTS : EXAM_2_POINTS_MATH;
		const chosen = pickByRoleOrBalanced(allowedPool, ['recall', 'scientific_approach'], rng);
		chosen.forEach((tmpl, idx) => {
			const inst = tmpl.generate(drawDistinctSeed(rng, usedSeeds), difficulty);
			const scaled = scaleExercisePoints(inst.sujetExercise, pts[idx]);
			scaled.id = `sci_sec_2ex_${idx + 1}_${inst.templateId}`;
			scaled.num = TEST_TWO_ORDINALS[idx];
			if (isMathStream && variant !== 'supervised_test') {
				scaled.customTitle =
					idx === 0
						? 'التمرين الأول — استرجاع منظم للمعارف وتطبيق الاستدلال'
						: 'التمرين الثاني — ممارسة المسعى العلمي';
			} else {
				delete scaled.customTitle;
			}
			exerciseInstances.push(inst);
			exercises.push(scaled);
		});
	} else {
		// 1AS TCST, 2AS SE, 3AS SE: ONEC 3-Exercise Structure (5 + 7 + 8 = 20 pts)
		const chosen = pickByRoleOrBalanced(
			allowedPool,
			['recall', 'reasoning', 'scientific_approach'],
			rng
		);
		const titles = [
			'التمرين الأول — استرجاع منظم للمعارف',
			'التمرين الثاني — تطبيق الاستدلال العلمي',
			'التمرين الثالث — ممارسة المسعى العلمي'
		] as const;

		chosen.forEach((tmpl, idx) => {
			const inst = tmpl.generate(drawDistinctSeed(rng, usedSeeds), difficulty);
			const scaled = scaleExercisePoints(inst.sujetExercise, EXAM_3_POINTS_SE[idx]);
			scaled.id = `sci_sec_3ex_${idx + 1}_${inst.templateId}`;
			scaled.num = TEST_THREE_ORDINALS[idx];
			scaled.customTitle = titles[idx];
			exerciseInstances.push(inst);
			exercises.push(scaled);
		});
	}

	return {
		id: `sci_paper_${grade}_${trimesterId}_${variant}_s${cleanSeed}`,
		grade,
		trimesterId,
		docType,
		variant,
		templateId,
		totalPoints: 20,
		seed: cleanSeed,
		examDoc: { metadata, exercises },
		exerciseInstances
	};
}
