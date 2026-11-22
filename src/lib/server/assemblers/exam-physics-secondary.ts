import {
	PHYSICS_GRADE_METADATA,
	SeededRng,
	getPhysicsTemplatesFor
} from '../../modules/PhysicsTemplates/runtime';
import type {
	Difficulty,
	PhysicsDomain,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate,
	PhysicsSecondaryTrackId
} from '../../modules/PhysicsTemplates/runtime';
import type {
	ExamDocument,
	ExamMetadata,
	ExamType,
	ExerciseBlock,
	TrimesterId
} from '../../modules/SujetBuilder/types';
import {
	PART1_FOUR_ORDINALS,
	TEST_THREE_ORDINALS,
	TEST_TWO_ORDINALS,
	TRIMESTER_NAMES,
	drawDistinctSeed,
	scaleExercisePoints
} from './shared';

export type PhysicsSecondaryVariant = 'trimester_exam' | 'supervised_test' | 'bac_mock';

export interface AssembledPhysicsSecondaryPaper {
	id: string;
	grade: PhysicsSecondaryTrackId;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: PhysicsSecondaryVariant;
	templateId: 'secondary/lycee_exam' | 'secondary/bac_official';
	totalPoints: 20;
	seed: number;
	examDoc: ExamDocument;
	exerciseInstances: PhysicsGeneratedExerciseInstance[];
}

export interface AssemblePhysicsSecondaryOptions {
	grade: PhysicsSecondaryTrackId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	difficulty?: Difficulty;
	variant?: PhysicsSecondaryVariant;
	academicYear?: string;
	schoolName?: string;
	topicNumber?: 1 | 2;
}

const VALID_SECONDARY_GRADES: readonly PhysicsSecondaryTrackId[] = [
	'1as_tcst',
	'1as_tcl',
	'2as_se',
	'2as_tm',
	'2as_math',
	'3as_se',
	'3as_tm',
	'3as_math'
];
const ALL_TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];
const BAC_ELIGIBLE_GRADES: readonly PhysicsSecondaryTrackId[] = ['3as_se', '3as_tm', '3as_math'];

const TEST_POINTS = [10, 10] as const;
const EXAM_3_POINTS_1AS = [6, 6, 8] as const;
const EXAM_3_POINTS_SE = [6, 7, 7] as const;
const EXAM_4_POINTS_MTM = [4, 4, 6, 6] as const;

const BAC_MOCK_DOC_TITLE = 'بكالوريا تجريبية للتعليم الثانوي';
const BAC_MOCK_SESSION_NAME = 'دورة تجريبية تحضيرية لشهادة البكالوريا';

function isBacGrade(grade: PhysicsSecondaryTrackId): boolean {
	return BAC_ELIGIBLE_GRADES.includes(grade);
}

function isAllowedForPhysicsTrack(
	t: PhysicsParameterizedTemplate,
	track: PhysicsSecondaryTrackId
): boolean {
	if (track === '3as_se' && t.domain === 'oscillations') {
		return false;
	}
	return true;
}

function resolveSecondaryDuration(
	grade: PhysicsSecondaryTrackId,
	variant: PhysicsSecondaryVariant
): string {
	if (variant === 'supervised_test') {
		return isBacGrade(grade) ? '01 ساعة و30 دقيقة' : '01 ساعة';
	}
	switch (grade) {
		case '1as_tcst':
			return '02 ساعة';
		case '1as_tcl':
			return '01 ساعة و30 دقيقة';
		case '2as_se':
			return '02 ساعة';
		case '2as_tm':
		case '2as_math':
			return '02 ساعة و30 دقيقة';
		case '3as_se':
			return '03 ساعات و30 دقيقة';
		case '3as_tm':
		case '3as_math':
			return '04 ساعات و30 دقيقة';
	}
}

function resolveMode(
	grade: PhysicsSecondaryTrackId,
	opts: AssemblePhysicsSecondaryOptions
): {
	variant: PhysicsSecondaryVariant;
	docType: ExamType;
	templateId: 'secondary/lycee_exam' | 'secondary/bac_official';
} {
	if (opts.variant === 'bac_mock') {
		if (isBacGrade(grade)) {
			return { variant: 'bac_mock', docType: 'exam', templateId: 'secondary/bac_official' };
		}
		return { variant: 'trimester_exam', docType: 'exam', templateId: 'secondary/lycee_exam' };
	}
	if (opts.docType === 'test' || opts.variant === 'supervised_test') {
		return { variant: 'supervised_test', docType: 'test', templateId: 'secondary/lycee_exam' };
	}
	return { variant: 'trimester_exam', docType: 'exam', templateId: 'secondary/lycee_exam' };
}

function pickBalancedTemplates(
	pool: PhysicsParameterizedTemplate[],
	count: number,
	rng: SeededRng
): PhysicsParameterizedTemplate[] {
	if (pool.length < count) {
		throw new Error(`Expected at least ${count} Physics templates in pool, found ${pool.length}`);
	}
	const picked: PhysicsParameterizedTemplate[] = [];
	const usedIds = new Set<string>();
	const byDomain = new Map<PhysicsDomain, PhysicsParameterizedTemplate[]>();
	for (const t of rng.shuffle([...pool])) {
		const arr = byDomain.get(t.domain) ?? [];
		arr.push(t);
		byDomain.set(t.domain, arr);
	}
	for (const domain of rng.shuffle([...byDomain.keys()])) {
		if (picked.length >= count) break;
		const cands = byDomain.get(domain) ?? [];
		const chosen = cands.find((c) => !usedIds.has(c.id));
		if (chosen) {
			picked.push(chosen);
			usedIds.add(chosen.id);
		}
	}
	for (const cand of rng.shuffle([...pool])) {
		if (picked.length >= count) break;
		if (!usedIds.has(cand.id)) {
			picked.push(cand);
			usedIds.add(cand.id);
		}
	}
	return picked;
}

function selectExperimentalFinalTemplate(
	pool: PhysicsParameterizedTemplate[],
	excludeIds: Set<string>,
	rng: SeededRng
): PhysicsParameterizedTemplate {
	const exp = pool.filter((t) => t.isExperimental && !excludeIds.has(t.id));
	if (exp.length > 0) return rng.pick(exp);
	const integ = pool.filter((t) => t.isIntegration && !excludeIds.has(t.id));
	if (integ.length > 0) return rng.pick(integ);
	const rem = pool.filter((t) => !excludeIds.has(t.id));
	if (rem.length > 0) return rng.pick(rem);
	return rng.pick(pool);
}

/**
 * Assemble a complete, deterministic Algerian Secondary Scientific Stream Physics
 * supervised test, trimester exam, or 3AS ONEC-aligned BAC mock exam:
 * - `3as_se`: 13 (6 + 7) + 7 pts experimental (`3h30`, Units 1–6 only)
 * - `3as_tm` & `3as_math`: 14 (4 + 4 + 6) + 6 pts experimental (`4h30`, Units 1–7 incl. RLC/oscillations)
 */
export function assemblePhysicsSecondaryExam(
	opts: AssemblePhysicsSecondaryOptions
): AssembledPhysicsSecondaryPaper {
	const { grade, trimesterId } = opts;
	if (!VALID_SECONDARY_GRADES.includes(grade)) {
		throw new Error(`Invalid secondary physics track: ${String(grade)}`);
	}
	if (!ALL_TRIMESTERS.includes(trimesterId)) {
		throw new Error(`Invalid trimesterId for ${grade}: ${String(trimesterId)}`);
	}

	const cleanSeed = Number.isFinite(opts.seed) ? Math.trunc(opts.seed) : 1;
	const { variant, docType, templateId } = resolveMode(grade, opts);
	const difficulty: Difficulty = opts.difficulty ?? 'medium';
	const academicYear = opts.academicYear?.trim() || '2025 / 2026';
	const schoolName = opts.schoolName?.trim() || 'ثانوية جزائرية نموذجية — منصة SujetStore';

	const rng = new SeededRng(cleanSeed);
	const gradeMeta = PHYSICS_GRADE_METADATA[grade];

	const metadata: ExamMetadata = {
		levelId: gradeMeta.levelId,
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

	const usedSeeds = new Set<number>();
	const exerciseInstances: PhysicsGeneratedExerciseInstance[] = [];
	const exercises: ExerciseBlock[] = [];

	const rawPool =
		variant === 'bac_mock'
			? ALL_TRIMESTERS.flatMap((tid) => getPhysicsTemplatesFor(grade, tid))
			: getPhysicsTemplatesFor(grade, trimesterId);
	const allowedPool = rawPool.filter((t) => isAllowedForPhysicsTrack(t, grade));

	if (variant === 'supervised_test') {
		const nonInt = allowedPool.filter((t) => !t.isIntegration);
		const pair = pickBalancedTemplates(nonInt.length >= 2 ? nonInt : allowedPool, 2, rng);
		pair.forEach((tmpl, idx) => {
			const exSeed = drawDistinctSeed(rng, usedSeeds);
			const inst = tmpl.generate(exSeed, difficulty);
			const scaled = scaleExercisePoints(inst.sujetExercise, TEST_POINTS[idx]);
			delete scaled.customTitle;
			scaled.id = `phy_sec_test_${idx + 1}_${inst.templateId}`;
			scaled.num = TEST_TWO_ORDINALS[idx];
			exerciseInstances.push(inst);
			exercises.push(scaled);
		});
	} else if (grade === '3as_tm' || grade === '3as_math') {
		// Official 3AS MATH/TM 4-exercise layout: 4 + 4 + 6 (Part 1 = 14) + 6 (Part 2 Experimental)
		let part1Pool = allowedPool.filter((t) => !t.isExperimental && !t.isIntegration);
		if (part1Pool.length < 3) {
			part1Pool = allowedPool.filter((t) => !t.isIntegration);
		}
		const part1 = pickBalancedTemplates(part1Pool.length >= 3 ? part1Pool : allowedPool, 3, rng);
		if (variant === 'bac_mock') {
			// Ensure Unit 7 (oscillations) appears in MTM BAC mock
			const hasOsc = part1.some((t) => t.domain === 'oscillations');
			if (!hasOsc) {
				const oscPool = allowedPool.filter(
					(t) => t.domain === 'oscillations' && !t.isExperimental
				);
				if (oscPool.length > 0) {
					part1[2] = rng.pick(oscPool);
				}
			}
		}
		const usedIds = new Set(part1.map((t) => t.id));
		const expTmpl = selectExperimentalFinalTemplate(allowedPool, usedIds, rng);
		const allFour = [...part1, expTmpl];

		allFour.forEach((tmpl, idx) => {
			const exSeed = drawDistinctSeed(rng, usedSeeds);
			const inst = tmpl.generate(exSeed, difficulty);
			const scaled = scaleExercisePoints(inst.sujetExercise, EXAM_4_POINTS_MTM[idx]);
			scaled.id = `phy_sec_mtm_${idx + 1}_${inst.templateId}`;
			scaled.num = PART1_FOUR_ORDINALS[idx];
			if (idx === 0) {
				scaled.instruction = `الجزء الأول (14 نقطة) — ${scaled.instruction}`;
			} else if (idx === 3) {
				scaled.customTitle = 'الجزء الثاني — التمرين التجريبي';
			} else {
				delete scaled.customTitle;
			}
			exerciseInstances.push(inst);
			exercises.push(scaled);
		});
	} else {
		// 1AS TCST/TCL, 2AS SE/TM/MATH, 3AS SE: 3-exercise layout (6+6+8 for 1AS, 6+7+7 for 2AS/3AS SE)
		const ptsDist =
			grade === '1as_tcst' || grade === '1as_tcl' ? EXAM_3_POINTS_1AS : EXAM_3_POINTS_SE;
		let part1Pool = allowedPool.filter((t) => !t.isExperimental && !t.isIntegration);
		if (part1Pool.length < 2) {
			part1Pool = allowedPool.filter((t) => !t.isIntegration);
		}
		const part1 = pickBalancedTemplates(part1Pool.length >= 2 ? part1Pool : allowedPool, 2, rng);
		const usedIds = new Set(part1.map((t) => t.id));
		const expTmpl = selectExperimentalFinalTemplate(allowedPool, usedIds, rng);
		const allThree = [...part1, expTmpl];

		allThree.forEach((tmpl, idx) => {
			const exSeed = drawDistinctSeed(rng, usedSeeds);
			const inst = tmpl.generate(exSeed, difficulty);
			const scaled = scaleExercisePoints(inst.sujetExercise, ptsDist[idx]);
			scaled.id = `phy_sec_ex_${idx + 1}_${inst.templateId}`;
			scaled.num = TEST_THREE_ORDINALS[idx];
			if (grade === '3as_se') {
				if (idx === 0) {
					scaled.instruction = `الجزء الأول (13 نقطة) — ${scaled.instruction}`;
				} else if (idx === 2) {
					scaled.customTitle = 'الجزء الثاني — التمرين التجريبي';
				} else {
					delete scaled.customTitle;
				}
			} else if (idx === 2 && (tmpl.isExperimental || tmpl.isIntegration)) {
				scaled.customTitle = 'التمرين الثالث — التمرين التجريبي والتطبيقي';
			} else {
				delete scaled.customTitle;
			}
			exerciseInstances.push(inst);
			exercises.push(scaled);
		});
	}

	return {
		id: `phy_paper_${grade}_${trimesterId}_${variant}_s${cleanSeed}`,
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
