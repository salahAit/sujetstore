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
	ExerciseBlock,
	TrimesterId
} from '../../modules/SujetBuilder/types';

export type Exam5apVariant = 'trimester_exam' | 'cinq_mock' | 'competency_eval';

export interface AssembledExamPaper {
	id: string;
	grade: '5ap';
	trimesterId: TrimesterId;
	docType: 'exam';
	variant: Exam5apVariant;
	templateId: 'primary/taqweem';
	totalPoints: 10;
	seed: number;
	examDoc: ExamDocument;
	exerciseInstances: GeneratedExerciseInstance[];
}

export interface Assemble5apExamOptions {
	trimesterId: TrimesterId;
	seed: number;
	difficulty?: Difficulty;
	variant?: Exam5apVariant;
	academicYear?: string;
	schoolName?: string;
}

const TRIMESTER_NAMES: Record<TrimesterId, string> = {
	t1: 'الفصل الأول',
	t2: 'الفصل الثاني',
	t3: 'الفصل الثالث'
};

const ALL_TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];
const PART1_DOMAINS: readonly MathDomain[] = ['numeric', 'measurement', 'proportionality', 'geometry'];
const PART1_ORDINALS = ['الأول', 'الثاني', 'الثالث', 'الرابع'] as const;
const PART1_POINTS = 1.5;
const PART2_POINTS = 4;
const EXAM_DURATION_AR = 'ساعة ونصف';
const CINQ_INTEGRATION_TEMPLATE_ID = 'tpl_5ap_t3_integration_cinq';

/**
 * Selects 4 distinct non-integration templates for a single 5AP trimester,
 * ensuring every domain available in that trimester is represented before filling remaining slots.
 */
function pickTrimesterNonIntegration(
	trimesterId: TrimesterId,
	rng: SeededRng
): ParameterizedTemplate[] {
	const pool = getTemplatesFor('5ap', trimesterId).filter((t) => !t.isIntegration);
	if (pool.length < 4) {
		throw new Error(
			`Expected at least 4 non-integration templates for 5ap/${trimesterId}, found ${pool.length}`
		);
	}

	const picked: ParameterizedTemplate[] = [];
	const pickedIds = new Set<string>();

	for (const domain of rng.shuffle(PART1_DOMAINS)) {
		if (picked.length >= 4) break;
		const candidates = pool.filter((t) => t.domain === domain && !pickedIds.has(t.id));
		if (candidates.length > 0) {
			const chosen = rng.pick(candidates);
			picked.push(chosen);
			pickedIds.add(chosen.id);
		}
	}

	if (picked.length < 4) {
		const remaining = pool.filter((t) => !pickedIds.has(t.id));
		const extra = rng.pickDistinct(remaining, 4 - picked.length);
		for (const t of extra) {
			picked.push(t);
			pickedIds.add(t.id);
		}
	}

	return rng.shuffle(picked);
}

/**
 * Selects 4 balanced non-integration templates across all three 5AP trimesters,
 * guaranteeing coverage of numeric, measurement, proportionality, and geometry
 * as well as representation of t1, t2, and t3.
 */
function pickComprehensiveNonIntegration(rng: SeededRng): ParameterizedTemplate[] {
	const pool = ALL_TRIMESTERS.flatMap((tid) =>
		getTemplatesFor('5ap', tid).filter((t) => !t.isIntegration)
	);

	const byDomain: Record<'numeric' | 'measurement' | 'proportionality' | 'geometry', ParameterizedTemplate[]> = {
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

function pickIntegrationTemplate(
	variant: Exam5apVariant,
	trimesterId: TrimesterId,
	rng: SeededRng
): ParameterizedTemplate {
	const sourceTrimester: TrimesterId = variant === 'trimester_exam' ? trimesterId : 't3';
	const candidates = getTemplatesFor('5ap', sourceTrimester).filter(
		(t) => t.isIntegration === true
	);

	if (candidates.length === 0) {
		throw new Error(`No integration template registered for 5ap/${sourceTrimester}`);
	}

	if (variant !== 'trimester_exam') {
		const cinqTpl = candidates.find((t) => t.id === CINQ_INTEGRATION_TEMPLATE_ID);
		if (cinqTpl) return cinqTpl;
	}

	return rng.pick(candidates);
}

function resolveTrimesterLabel(variant: Exam5apVariant, trimesterId: TrimesterId): string {
	if (variant === 'competency_eval') {
		return 'تقييم مكتسبات مرحلة التعليم الابتدائي';
	}
	if (variant === 'cinq_mock') {
		return 'تجريبي لنهاية مرحلة التعليم الابتدائي';
	}
	return TRIMESTER_NAMES[trimesterId];
}

/**
 * Deterministically assembles an official Algerian 5AP Mathematics exam paper (10 points total):
 * - Part 1 (6 pts): 4 exercises at 1.5 pts each
 * - Part 2 (4 pts): 1 integration situation (الوضعية الإدماجية)
 */
export function assemble5apExam(opts: Assemble5apExamOptions): AssembledExamPaper {
	const trimesterId = opts.trimesterId;
	const difficulty: Difficulty = opts.difficulty ?? 'medium';
	const variant: Exam5apVariant = opts.variant ?? 'trimester_exam';
	const rng = new SeededRng(opts.seed);
	const normalizedSeed = (Math.floor(opts.seed) >>> 0) || 1;
	const id = `exam-5ap-${variant}-${trimesterId}-${difficulty}-${normalizedSeed}`;

	const part1Templates =
		variant === 'trimester_exam'
			? pickTrimesterNonIntegration(trimesterId, rng)
			: pickComprehensiveNonIntegration(rng);
	const integrationTemplate = pickIntegrationTemplate(variant, trimesterId, rng);

	const exerciseInstances: GeneratedExerciseInstance[] = [];

	for (let i = 0; i < part1Templates.length; i++) {
		const tpl = part1Templates[i];
		const exSeed = rng.int(1, 2_000_000_000);
		const rawInst = tpl.generate(exSeed, difficulty);
		const { customTitle: _omitCustomTitle, ...restExercise } = rawInst.sujetExercise;
		const sujetExercise: ExerciseBlock = {
			...restExercise,
			id: `${id}-ex-${i + 1}`,
			num: PART1_ORDINALS[i],
			points: PART1_POINTS
		};
		exerciseInstances.push({
			...rawInst,
			sujetExercise
		});
	}

	const intSeed = rng.int(1, 2_000_000_000);
	const rawIntegration = integrationTemplate.generate(intSeed, difficulty);
	const { num: _omitNum, ...restIntegration } = rawIntegration.sujetExercise;
	const integrationTitle =
		variant === 'competency_eval' ? 'تقييم المكتسبات — الوضعية الإدماجية' : 'الوضعية الإدماجية';

	const integrationExercise: ExerciseBlock = {
		...restIntegration,
		id: `${id}-ex-5`,
		customTitle: integrationTitle,
		points: PART2_POINTS
	};
	exerciseInstances.push({
		...rawIntegration,
		sujetExercise: integrationExercise
	});

	const gradeMeta = GRADE_METADATA['5ap'];
	const schoolName = opts.schoolName?.trim();
	const metadata: ExamMetadata = {
		levelId: gradeMeta.levelId,
		yearId: gradeMeta.yearId,
		yearName: gradeMeta.yearName,
		subjectId: gradeMeta.subjectId,
		subjectName: gradeMeta.subjectName,
		trimesterId,
		trimesterName: resolveTrimesterLabel(variant, trimesterId),
		docType: 'exam',
		academicYear: opts.academicYear?.trim() || '2025 / 2026',
		duration: EXAM_DURATION_AR,
		...(schoolName ? { schoolName } : {}),
		siteUrl: 'sujetstore.com'
	};

	const examDoc: ExamDocument = {
		metadata,
		exercises: exerciseInstances.map((inst) => inst.sujetExercise)
	};

	return {
		id,
		grade: '5ap',
		trimesterId,
		docType: 'exam',
		variant,
		templateId: 'primary/taqweem',
		totalPoints: 10,
		seed: opts.seed,
		examDoc,
		exerciseInstances
	};
}
