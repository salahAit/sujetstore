import {
	PHYSICS_GRADE_METADATA,
	SeededRng,
	getPhysicsTemplatesFor
} from '../../modules/PhysicsTemplates';
import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsMiddleTrackId,
	PhysicsParameterizedTemplate
} from '../../modules/PhysicsTemplates';
import type {
	ExamDocument,
	ExamMetadata,
	ExamType,
	ExerciseBlock,
	TrimesterId
} from '../../modules/SujetBuilder/types';
import {
	TEST_TWO_ORDINALS,
	TRIMESTER_NAMES,
	buildPhysicsPart2RubricTable,
	drawDistinctSeed,
	scaleExercisePoints
} from './shared';

export type PhysicsMiddleVariant = 'trimester_exam' | 'supervised_test' | 'bem_mock';

export interface AssembledPhysicsMiddlePaper {
	id: string;
	grade: PhysicsMiddleTrackId;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: PhysicsMiddleVariant;
	templateId: 'middle/exam' | 'middle/quiz';
	totalPoints: 20;
	seed: number;
	examDoc: ExamDocument;
	exerciseInstances: PhysicsGeneratedExerciseInstance[];
}

export interface AssemblePhysicsMiddleOptions {
	grade: PhysicsMiddleTrackId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	difficulty?: Difficulty;
	variant?: PhysicsMiddleVariant;
	academicYear?: string;
	schoolName?: string;
}

const VALID_MIDDLE_GRADES: readonly PhysicsMiddleTrackId[] = ['1am', '2am', '3am', '4am'];
const ALL_TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];
const PART1_POINTS = [6, 6] as const;
const TEST_POINTS = [10, 10] as const;
const PART2_POINTS = 8;
const PART1_INSTRUCTION_PREFIX = 'الجزء الأول (12 نقطة) — ';
const PART2_CUSTOM_TITLE = 'الجزء الثاني — الوضعية الإدماجية';
const BEM_MOCK_DOC_TITLE = 'امتحان تجريبي لشهادة التعليم المتوسط (BEM)';
const BEM_MOCK_TRIMESTER_NAME = 'دورة تجريبية لشهادة التعليم المتوسط';

function isIntegrationTemplate(t: PhysicsParameterizedTemplate): boolean {
	return t.isIntegration === true || t.domain === 'integration';
}

function pickDistinctDomainPair(
	pool: PhysicsParameterizedTemplate[],
	rng: SeededRng
): [PhysicsParameterizedTemplate, PhysicsParameterizedTemplate] {
	if (pool.length < 2) {
		throw new Error(`Expected at least 2 non-integration Physics templates, found ${pool.length}`);
	}
	const shuffled = rng.shuffle([...pool]);
	const first = shuffled[0];
	const diffDomain = shuffled.find((t) => t.id !== first.id && t.domain !== first.domain);
	const second = diffDomain ?? shuffled.find((t) => t.id !== first.id)!;
	return [first, second];
}

function selectBemPart1Pair(rng: SeededRng): [PhysicsParameterizedTemplate, PhysicsParameterizedTemplate] {
	const t1Pool = getPhysicsTemplatesFor('4am', 't1').filter((t) => !isIntegrationTemplate(t));
	const t2Pool = getPhysicsTemplatesFor('4am', 't2').filter((t) => !isIntegrationTemplate(t));
	const t3Pool = getPhysicsTemplatesFor('4am', 't3').filter((t) => !isIntegrationTemplate(t));
	const candidates: [PhysicsParameterizedTemplate, PhysicsParameterizedTemplate][] = [];
	const allCombos: [PhysicsParameterizedTemplate[], PhysicsParameterizedTemplate[]][] = [
		[t1Pool, t2Pool],
		[t1Pool, t3Pool],
		[t2Pool, t3Pool]
	];
	for (const [aPool, bPool] of allCombos) {
		for (const a of aPool) {
			for (const b of bPool) {
				if (a.domain !== b.domain) candidates.push([a, b]);
			}
		}
	}
	if (candidates.length > 0) return rng.pick(candidates);
	return pickDistinctDomainPair([...t1Pool, ...t2Pool, ...t3Pool], rng);
}

function selectIntegration(
	grade: PhysicsMiddleTrackId,
	trimesterId: TrimesterId,
	variant: PhysicsMiddleVariant,
	rng: SeededRng
): PhysicsParameterizedTemplate {
	if (variant === 'bem_mock') {
		const t3Int = getPhysicsTemplatesFor('4am', 't3').filter(isIntegrationTemplate);
		const t2Int = getPhysicsTemplatesFor('4am', 't2').filter(isIntegrationTemplate);
		const t1Int = getPhysicsTemplatesFor('4am', 't1').filter(isIntegrationTemplate);
		const pool = [...t3Int, ...t2Int, ...t1Int];
		if (pool.length === 0) throw new Error('No 4AM Physics integration template found for BEM mock');
		return rng.pick(pool);
	}
	const pool = getPhysicsTemplatesFor(grade, trimesterId).filter(isIntegrationTemplate);
	if (pool.length === 0) {
		throw new Error(`No Physics integration template found for ${grade} ${trimesterId}`);
	}
	return rng.pick(pool);
}

function resolveMode(
	grade: PhysicsMiddleTrackId,
	opts: AssemblePhysicsMiddleOptions
): {
	variant: PhysicsMiddleVariant;
	docType: ExamType;
	templateId: 'middle/exam' | 'middle/quiz';
} {
	if (opts.variant === 'bem_mock') {
		return {
			variant: grade === '4am' ? 'bem_mock' : 'trimester_exam',
			docType: 'exam',
			templateId: 'middle/exam'
		};
	}
	if (opts.docType === 'test' || opts.variant === 'supervised_test') {
		return {
			variant: 'supervised_test',
			docType: 'test',
			templateId: 'middle/quiz'
		};
	}
	return {
		variant: 'trimester_exam',
		docType: 'exam',
		templateId: 'middle/exam'
	};
}

/**
 * Assemble a complete, deterministic Algerian Gen-2 Middle School (1AM–4AM)
 * Physics & Technology supervised test (`فرض محروس`: 10 + 10), trimester exam (`اختبار`: 12 [6+6] + 8),
 * or 4AM BEM mock exam scaled to 20 points.
 */
export function assemblePhysicsMiddleExam(
	opts: AssemblePhysicsMiddleOptions
): AssembledPhysicsMiddlePaper {
	const { grade, trimesterId } = opts;
	if (!VALID_MIDDLE_GRADES.includes(grade)) {
		throw new Error(`Invalid middle physics grade: ${String(grade)}`);
	}
	if (!ALL_TRIMESTERS.includes(trimesterId)) {
		throw new Error(`Invalid trimesterId for ${grade}: ${String(trimesterId)}`);
	}

	const cleanSeed = Number.isFinite(opts.seed) ? Math.trunc(opts.seed) : 1;
	const { variant, docType, templateId } = resolveMode(grade, opts);
	const difficulty: Difficulty = opts.difficulty ?? 'medium';
	const academicYear = opts.academicYear?.trim() || '2025 / 2026';
	const schoolName = opts.schoolName?.trim() || undefined;

	const rng = new SeededRng(cleanSeed);
	const gradeMeta = PHYSICS_GRADE_METADATA[grade];

	const metadata: ExamMetadata = {
		levelId: gradeMeta.levelId,
		yearId: gradeMeta.yearId,
		yearName: gradeMeta.yearName,
		subjectId: gradeMeta.subjectId,
		subjectName: gradeMeta.subjectName,
		trimesterId,
		trimesterName: variant === 'bem_mock' ? BEM_MOCK_TRIMESTER_NAME : TRIMESTER_NAMES[trimesterId],
		docType,
		academicYear,
		duration: docType === 'test' ? 'ساعة واحدة' : 'ساعة ونصف (1 سا و 30 د)',
		...(schoolName ? { schoolName } : {}),
		siteUrl: 'sujetstore.com',
		...(variant === 'bem_mock' ? { customDocTitle: BEM_MOCK_DOC_TITLE } : {})
	};

	const usedSeeds = new Set<number>();
	const exerciseInstances: PhysicsGeneratedExerciseInstance[] = [];
	const exercises: ExerciseBlock[] = [];

	if (docType === 'test') {
		const nonInt = getPhysicsTemplatesFor(grade, trimesterId).filter((t) => !isIntegrationTemplate(t));
		const pair = pickDistinctDomainPair(nonInt, rng);
		pair.forEach((tmpl, idx) => {
			const exSeed = drawDistinctSeed(rng, usedSeeds);
			const inst = tmpl.generate(exSeed, difficulty);
			const scaled = scaleExercisePoints(inst.sujetExercise, TEST_POINTS[idx]);
			delete scaled.customTitle;
			scaled.id = `phy_test_${idx + 1}_${inst.templateId}`;
			scaled.num = TEST_TWO_ORDINALS[idx];
			exerciseInstances.push(inst);
			exercises.push(scaled);
		});
	} else {
		const part1Pair =
			variant === 'bem_mock'
				? selectBemPart1Pair(rng)
				: pickDistinctDomainPair(
						getPhysicsTemplatesFor(grade, trimesterId).filter((t) => !isIntegrationTemplate(t)),
						rng
					);

		part1Pair.forEach((tmpl, idx) => {
			const exSeed = drawDistinctSeed(rng, usedSeeds);
			const inst = tmpl.generate(exSeed, difficulty);
			const scaled = scaleExercisePoints(inst.sujetExercise, PART1_POINTS[idx]);
			delete scaled.customTitle;
			scaled.id = `phy_p1_${idx + 1}_${inst.templateId}`;
			scaled.num = TEST_TWO_ORDINALS[idx];
			const instr = scaled.instruction ?? '';
			if (idx === 0 && !instr.startsWith(PART1_INSTRUCTION_PREFIX)) {
				scaled.instruction = `${PART1_INSTRUCTION_PREFIX}${instr}`;
			}
			exerciseInstances.push(inst);
			exercises.push(scaled);
		});

		const intTmpl = selectIntegration(grade, trimesterId, variant, rng);
		const intSeed = drawDistinctSeed(rng, usedSeeds);
		const intInst = intTmpl.generate(intSeed, difficulty);
		const scaledInt = scaleExercisePoints(intInst.sujetExercise, PART2_POINTS);
		scaledInt.id = `phy_p2_${intInst.templateId}`;
		scaledInt.customTitle = PART2_CUSTOM_TITLE;
		scaledInt.content = [...scaledInt.content, buildPhysicsPart2RubricTable()];
		exerciseInstances.push(intInst);
		exercises.push(scaledInt);
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
