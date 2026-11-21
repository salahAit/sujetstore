import { getTemplatesFor, GRADE_METADATA, SeededRng } from '../../modules/MathTemplates/runtime';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	MathDomain,
	ParameterizedTemplate
} from '../../modules/MathTemplates/types';
import type {
	ExamDocument,
	ExamMetadata,
	ExamType,
	ExerciseBlock,
	TrimesterId
} from '../../modules/SujetBuilder/types';
import {
	drawDistinctSeed,
	PART1_FOUR_ORDINALS,
	scaleExercisePoints,
	selectDomainBalancedTemplates,
	TEST_TWO_ORDINALS,
	TRIMESTER_NAMES
} from './shared';

export type PrimaryUpperGrade = '3ap' | '4ap' | '5ap';
export type PrimaryUpperVariant =
	| 'trimester_exam'
	| 'supervised_test'
	| 'cinq_mock'
	| 'competency_eval';

export interface AssembledPrimaryUpperPaper {
	id: string;
	grade: PrimaryUpperGrade;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: PrimaryUpperVariant;
	templateId: 'primary/taqweem';
	totalPoints: 10;
	seed: number;
	examDoc: ExamDocument;
	exerciseInstances: GeneratedExerciseInstance[];
}

export interface AssemblePrimaryUpperOptions {
	grade: PrimaryUpperGrade;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	difficulty?: Difficulty;
	variant?: PrimaryUpperVariant;
	academicYear?: string;
	schoolName?: string;
}

const SUPPORTED_GRADES: ReadonlySet<string> = new Set<PrimaryUpperGrade>(['3ap', '4ap', '5ap']);
const ALL_TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];
const PRIMARY_UPPER_DOMAINS: readonly MathDomain[] = [
	'numeric',
	'geometry',
	'measurement',
	'proportionality'
];

const TEST_REGULAR_POINTS = 3;
const EXAM_PART1_POINTS = 1.5;
const INTEGRATION_POINTS = 4;
const TOTAL_PRIMARY_POINTS = 10 as const;

const CINQ_INTEGRATION_TEMPLATE_ID = 'tpl_5ap_t3_integration_cinq';
const INTEGRATION_TITLE = 'الوضعية الإدماجية';
const COMPETENCY_EVAL_INTEGRATION_TITLE = 'تقييم المكتسبات — الوضعية الإدماجية';
const CINQ_DOC_TITLE = 'امتحان تجريبي لنهاية مرحلة التعليم الابتدائي (Cinq)';
const COMPETENCY_EVAL_DOC_TITLE = 'تقييم المكتسبات في مادة الرياضيات';
const CINQ_TRIMESTER_LABEL = 'تجريبي لنهاية مرحلة التعليم الابتدائي';
const COMPETENCY_EVAL_TRIMESTER_LABEL = 'تقييم مكتسبات مرحلة التعليم الابتدائي';

function isIntegrationTemplate(t: ParameterizedTemplate): boolean {
	return t.isIntegration === true || t.domain === 'integration';
}

function resolveVariantAndDocType(
	grade: PrimaryUpperGrade,
	requestedVariant?: PrimaryUpperVariant,
	requestedDocType?: ExamType
): { docType: ExamType; variant: PrimaryUpperVariant } {
	if (
		grade === '5ap' &&
		(requestedVariant === 'cinq_mock' || requestedVariant === 'competency_eval')
	) {
		return { docType: 'exam', variant: requestedVariant };
	}

	if (requestedDocType === 'test' || requestedVariant === 'supervised_test') {
		return { docType: 'test', variant: 'supervised_test' };
	}

	return { docType: 'exam', variant: 'trimester_exam' };
}

function resolveDuration(grade: PrimaryUpperGrade, docType: ExamType): string {
	if (docType === 'test') {
		return '45 دقيقة';
	}
	return grade === '5ap' ? 'ساعة ونصف' : 'ساعة وربع';
}

function resolveHeaderLabels(
	variant: PrimaryUpperVariant,
	trimesterId: TrimesterId
): { trimesterName: string; customDocTitle?: string } {
	if (variant === 'cinq_mock') {
		return {
			trimesterName: CINQ_TRIMESTER_LABEL,
			customDocTitle: CINQ_DOC_TITLE
		};
	}
	if (variant === 'competency_eval') {
		return {
			trimesterName: COMPETENCY_EVAL_TRIMESTER_LABEL,
			customDocTitle: COMPETENCY_EVAL_DOC_TITLE
		};
	}
	return {
		trimesterName: TRIMESTER_NAMES[trimesterId]
	};
}

/**
 * Selects 4 balanced non-integration templates across all three 5AP trimesters,
 * covering numeric, measurement, proportionality, and geometry while maximizing
 * representation of t1, t2, and t3.
 */
function pickComprehensiveNonIntegration(rng: SeededRng): ParameterizedTemplate[] {
	const pool = ALL_TRIMESTERS.flatMap((tid) =>
		getTemplatesFor('5ap', tid).filter((t) => !isIntegrationTemplate(t))
	);

	const byDomain: Record<
		'numeric' | 'measurement' | 'proportionality' | 'geometry',
		ParameterizedTemplate[]
	> = {
		numeric: pool.filter((t) => t.domain === 'numeric'),
		measurement: pool.filter((t) => t.domain === 'measurement'),
		proportionality: pool.filter((t) => t.domain === 'proportionality'),
		geometry: pool.filter((t) => t.domain === 'geometry')
	};

	for (const [domain, list] of Object.entries(byDomain)) {
		if (list.length === 0) {
			throw new Error(`Missing 5AP non-integration templates for domain "${domain}"`);
		}
	}

	const balancedTuples: ParameterizedTemplate[][] = [];
	for (const n of byDomain.numeric) {
		for (const m of byDomain.measurement) {
			for (const p of byDomain.proportionality) {
				for (const g of byDomain.geometry) {
					const coveredTrimesters = new Set<TrimesterId>([
						n.trimesterId,
						m.trimesterId,
						p.trimesterId,
						g.trimesterId
					]);
					if (coveredTrimesters.size === ALL_TRIMESTERS.length) {
						balancedTuples.push([n, m, p, g]);
					}
				}
			}
		}
	}

	const chosenTuple =
		balancedTuples.length > 0
			? rng.pick(balancedTuples)
			: [
					rng.pick(byDomain.numeric),
					rng.pick(byDomain.measurement),
					rng.pick(byDomain.proportionality),
					rng.pick(byDomain.geometry)
				];

	return rng.shuffle(chosenTuple);
}

function pickCinqIntegrationTemplate(rng: SeededRng): ParameterizedTemplate {
	const candidates = getTemplatesFor('5ap', 't3').filter(isIntegrationTemplate);
	if (candidates.length === 0) {
		throw new Error('No integration template registered for 5ap/t3');
	}
	const cinqTpl = candidates.find((t) => t.id === CINQ_INTEGRATION_TEMPLATE_ID);
	return cinqTpl ?? rng.pick(candidates);
}

function buildRegularExerciseInstance(
	template: ParameterizedTemplate,
	seed: number,
	difficulty: Difficulty,
	targetPoints: number,
	ordinal: string,
	exerciseId: string
): GeneratedExerciseInstance {
	const raw = template.generate(seed, difficulty);
	const sujetExercise: ExerciseBlock = scaleExercisePoints(raw.sujetExercise, targetPoints);
	delete sujetExercise.customTitle;
	sujetExercise.id = exerciseId;
	sujetExercise.num = ordinal;

	return {
		...raw,
		sujetExercise
	};
}

function buildIntegrationExerciseInstance(
	template: ParameterizedTemplate,
	seed: number,
	difficulty: Difficulty,
	customTitle: string,
	exerciseId: string
): GeneratedExerciseInstance {
	const raw = template.generate(seed, difficulty);
	const sujetExercise: ExerciseBlock = scaleExercisePoints(raw.sujetExercise, INTEGRATION_POINTS);
	delete sujetExercise.num;
	sujetExercise.id = exerciseId;
	sujetExercise.customTitle = customTitle;

	return {
		...raw,
		sujetExercise
	};
}

/**
 * Deterministically assembles an Algerian Gen-2 upper-primary (3AP, 4AP, 5AP)
 * supervised test (`supervised_test`, 2 exercises x 3 pts + integration 4 pts = 10 pts)
 * or exam (`trimester_exam`, `cinq_mock`, `competency_eval`, 4 exercises x 1.5 pts + integration 4 pts = 10 pts).
 */
export function assemblePrimaryUpperExam(
	opts: AssemblePrimaryUpperOptions
): AssembledPrimaryUpperPaper {
	const { grade, trimesterId } = opts;

	if (!SUPPORTED_GRADES.has(grade)) {
		throw new Error(`Unsupported grade for primary-upper assembly: ${String(grade)}`);
	}
	if (!Object.prototype.hasOwnProperty.call(TRIMESTER_NAMES, trimesterId)) {
		throw new Error(`Invalid trimesterId for primary-upper assembly: ${String(trimesterId)}`);
	}

	const cleanSeed = Number.isFinite(opts.seed) ? Math.trunc(opts.seed) : 1;
	const normalizedSeed = (Math.floor(cleanSeed) >>> 0) || 1;
	const difficulty: Difficulty = opts.difficulty ?? 'medium';
	const { docType, variant } = resolveVariantAndDocType(grade, opts.variant, opts.docType);
	const id = `exam-${grade}-${variant}-${trimesterId}-${difficulty}-${normalizedSeed}`;

	const rng = new SeededRng(cleanSeed);
	const usedSeeds = new Set<number>();

	const isComprehensive5ap =
		grade === '5ap' && (variant === 'cinq_mock' || variant === 'competency_eval');

	let part1Templates: ParameterizedTemplate[];
	let integrationTemplate: ParameterizedTemplate;

	if (isComprehensive5ap) {
		part1Templates = pickComprehensiveNonIntegration(rng);
		integrationTemplate = pickCinqIntegrationTemplate(rng);
	} else {
		const trimesterTemplates = getTemplatesFor(grade, trimesterId);
		const nonIntegrationPool = trimesterTemplates.filter((t) => !isIntegrationTemplate(t));
		const integrationPool = trimesterTemplates.filter(isIntegrationTemplate);

		if (integrationPool.length === 0) {
			throw new Error(`No integration template registered for ${grade}/${trimesterId}`);
		}

		const regularCount = docType === 'test' ? 2 : 4;
		part1Templates = selectDomainBalancedTemplates(
			nonIntegrationPool,
			regularCount,
			PRIMARY_UPPER_DOMAINS,
			rng
		);
		integrationTemplate = rng.pick(integrationPool);
	}

	const regularTargetPoints = docType === 'test' ? TEST_REGULAR_POINTS : EXAM_PART1_POINTS;
	const regularOrdinals = docType === 'test' ? TEST_TWO_ORDINALS : PART1_FOUR_ORDINALS;

	const exerciseInstances: GeneratedExerciseInstance[] = part1Templates.map((tpl, idx) =>
		buildRegularExerciseInstance(
			tpl,
			drawDistinctSeed(rng, usedSeeds),
			difficulty,
			regularTargetPoints,
			regularOrdinals[idx],
			`${id}-ex-${idx + 1}`
		)
	);

	const integrationTitle =
		variant === 'competency_eval' ? COMPETENCY_EVAL_INTEGRATION_TITLE : INTEGRATION_TITLE;

	exerciseInstances.push(
		buildIntegrationExerciseInstance(
			integrationTemplate,
			drawDistinctSeed(rng, usedSeeds),
			difficulty,
			integrationTitle,
			`${id}-ex-${part1Templates.length + 1}`
		)
	);

	const gradeMeta = GRADE_METADATA[grade];
	const schoolName = opts.schoolName?.trim();
	const academicYear = opts.academicYear?.trim() || '2025 / 2026';
	const { trimesterName, customDocTitle } = resolveHeaderLabels(variant, trimesterId);

	const metadata: ExamMetadata = {
		levelId: gradeMeta.levelId,
		yearId: gradeMeta.yearId,
		yearName: gradeMeta.yearName,
		subjectId: gradeMeta.subjectId,
		subjectName: gradeMeta.subjectName,
		trimesterId,
		trimesterName,
		docType,
		academicYear,
		duration: resolveDuration(grade, docType),
		...(schoolName ? { schoolName } : {}),
		...(customDocTitle ? { customDocTitle } : {}),
		siteUrl: 'sujetstore.com'
	};

	const examDoc: ExamDocument = {
		metadata,
		exercises: exerciseInstances.map((inst) => inst.sujetExercise)
	};

	return {
		id,
		grade,
		trimesterId,
		docType,
		variant,
		templateId: 'primary/taqweem',
		totalPoints: TOTAL_PRIMARY_POINTS,
		seed: cleanSeed,
		examDoc,
		exerciseInstances
	};
}
