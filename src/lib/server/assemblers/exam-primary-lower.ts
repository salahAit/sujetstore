import { GRADE_METADATA, SeededRng, getTemplatesFor } from '../../modules/MathTemplates';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	MathDomain
} from '../../modules/MathTemplates/types';
import type {
	ExamDocument,
	ExamMetadata,
	ExamType,
	ExerciseBlock,
	TrimesterId
} from '../../modules/SujetBuilder/types';
import {
	PART1_FOUR_ORDINALS,
	TEST_TWO_ORDINALS,
	TRIMESTER_NAMES,
	drawDistinctSeed,
	scaleExercisePoints,
	selectDomainBalancedTemplates
} from './shared';

export type PrimaryLowerGrade = '1ap' | '2ap';

export interface AssembledPrimaryLowerPaper {
	id: string;
	grade: PrimaryLowerGrade;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: 'trimester_exam' | 'supervised_test';
	templateId: 'primary/taqweem';
	totalPoints: 10;
	seed: number;
	examDoc: ExamDocument;
	exerciseInstances: GeneratedExerciseInstance[];
}

export interface AssemblePrimaryLowerOptions {
	grade: PrimaryLowerGrade;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	difficulty?: Difficulty;
	academicYear?: string;
	schoolName?: string;
}

const PRIMARY_LOWER_DOMAINS: readonly MathDomain[] = [
	'numeric',
	'measurement',
	'geometry',
	'proportionality'
];
const EXAM_1AP_ORDINALS = ['الأول', 'الثاني', 'الثالث'] as const;
const INTEGRATION_TITLE = 'الوضعية الإدماجية';
const INTEGRATION_POINTS = 4;

/**
 * Deterministic assembler for lower-primary Algerian Gen-2 Mathematics
 * supervised tests (`فرض محروس`) and trimester exams (`اختبار فصلي`)
 * for `1ap` and `2ap`, scaled to 10 points total.
 */
export function assemblePrimaryLowerExam(
	opts: AssemblePrimaryLowerOptions
): AssembledPrimaryLowerPaper {
	const { grade, trimesterId } = opts;
	if (grade !== '1ap' && grade !== '2ap') {
		throw new Error(`Unsupported grade for lower-primary exam assembly: ${String(grade)}`);
	}
	if (trimesterId !== 't1' && trimesterId !== 't2' && trimesterId !== 't3') {
		throw new Error(`Invalid trimesterId for ${grade} exam assembly: ${String(trimesterId)}`);
	}

	const cleanSeed = Number.isFinite(opts.seed) ? Math.trunc(opts.seed) : 1;
	const docType: ExamType = opts.docType === 'test' ? 'test' : 'exam';
	const isTest = docType === 'test';
	const variant: 'trimester_exam' | 'supervised_test' = isTest
		? 'supervised_test'
		: 'trimester_exam';
	const difficulty: Difficulty = opts.difficulty ?? 'medium';
	const academicYear = opts.academicYear?.trim() || '2025 / 2026';
	const schoolName = opts.schoolName?.trim() || undefined;
	const duration = isTest || grade === '1ap' ? '45 دقيقة' : 'ساعة واحدة';

	const rng = new SeededRng(cleanSeed);
	const allTemplates = getTemplatesFor(grade, trimesterId);
	const nonIntegration = allTemplates.filter(
		(t) => !t.isIntegration && t.domain !== 'integration'
	);
	const integrationPool = allTemplates.filter(
		(t) => t.isIntegration === true || t.domain === 'integration'
	);

	if (integrationPool.length === 0) {
		throw new Error(`No integration template found for ${grade} trimester ${trimesterId}`);
	}

	const regularConfig = isTest
		? { count: 2, points: 3, ordinals: TEST_TWO_ORDINALS as readonly string[] }
		: grade === '1ap'
			? { count: 3, points: 2, ordinals: EXAM_1AP_ORDINALS as readonly string[] }
			: { count: 4, points: 1.5, ordinals: PART1_FOUR_ORDINALS as readonly string[] };

	const usedSeeds = new Set<number>();
	const exerciseInstances: GeneratedExerciseInstance[] = [];
	const exercises: ExerciseBlock[] = [];

	const selectedRegular = selectDomainBalancedTemplates(
		nonIntegration,
		regularConfig.count,
		PRIMARY_LOWER_DOMAINS,
		rng
	);

	selectedRegular.forEach((tmpl, idx) => {
		const exSeed = drawDistinctSeed(rng, usedSeeds);
		const inst = tmpl.generate(exSeed, difficulty);
		const scaledBlock = scaleExercisePoints(inst.sujetExercise, regularConfig.points);
		delete scaledBlock.customTitle;
		scaledBlock.id = `ex_${isTest ? 'test' : 'exam'}_${idx + 1}_${inst.templateId}`;
		scaledBlock.num = regularConfig.ordinals[idx];

		exerciseInstances.push({
			...inst,
			sujetExercise: scaledBlock
		});
		exercises.push(scaledBlock);
	});

	const integrationTmpl = rng.pick(integrationPool);
	const intSeed = drawDistinctSeed(rng, usedSeeds);
	const intInst = integrationTmpl.generate(intSeed, difficulty);
	const scaledIntegration = scaleExercisePoints(intInst.sujetExercise, INTEGRATION_POINTS);
	delete scaledIntegration.num;
	scaledIntegration.id = `ex_integration_${intInst.templateId}`;
	scaledIntegration.customTitle = INTEGRATION_TITLE;

	exerciseInstances.push({
		...intInst,
		sujetExercise: scaledIntegration
	});
	exercises.push(scaledIntegration);

	const gradeMeta = GRADE_METADATA[grade];
	const metadata: ExamMetadata = {
		levelId: gradeMeta.levelId,
		yearId: gradeMeta.yearId,
		yearName: gradeMeta.yearName,
		subjectId: gradeMeta.subjectId,
		subjectName: gradeMeta.subjectName,
		trimesterId,
		trimesterName: TRIMESTER_NAMES[trimesterId],
		docType,
		academicYear,
		duration,
		...(schoolName ? { schoolName } : {}),
		siteUrl: 'sujetstore.com'
	};

	return {
		id: `${grade}_${trimesterId}_${docType}_${difficulty}_${cleanSeed}`,
		grade,
		trimesterId,
		docType,
		variant,
		templateId: 'primary/taqweem',
		totalPoints: 10,
		seed: cleanSeed,
		examDoc: {
			metadata,
			exercises
		},
		exerciseInstances
	};
}
