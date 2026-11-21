import { GRADE_METADATA, SeededRng, getTemplatesFor } from '../../modules/MathTemplates/runtime';
import type { Difficulty, GeneratedExerciseInstance } from '../../modules/MathTemplates/types';
import type {
	ExamDocument,
	ExamMetadata,
	ExerciseBlock,
	TrimesterId
} from '../../modules/SujetBuilder/types';

export interface AssembledExamPaper {
	id: string;
	grade: '2ap';
	trimesterId: TrimesterId;
	docType: 'exam';
	variant: 'trimester_exam';
	templateId: 'primary/taqweem';
	totalPoints: 10;
	seed: number;
	examDoc: ExamDocument;
	exerciseInstances: GeneratedExerciseInstance[];
}

export interface Assemble2apExamOptions {
	trimesterId: TrimesterId;
	seed: number;
	difficulty?: Difficulty;
	academicYear?: string;
	schoolName?: string;
}

const TRIMESTER_NAMES: Record<TrimesterId, string> = {
	t1: 'الفصل الأول',
	t2: 'الفصل الثاني',
	t3: 'الفصل الثالث'
};

const REGULAR_ORDINALS = ['الأول', 'الثاني', 'الثالث', 'الرابع'] as const;
const REGULAR_POINTS = [1.5, 1.5, 1.5, 1.5] as const;
const INTEGRATION_TITLE = 'الوضعية الإدماجية';
const INTEGRATION_POINTS = 4;
const TOTAL_EXAM_POINTS = 10 as const;

/**
 * Deterministic 2AP trimester exam assembler (4 regular exercises x 1.5 pts + 1 integration x 4 pts = 10 pts).
 */
export function assemble2apExam(opts: Assemble2apExamOptions): AssembledExamPaper {
	const { trimesterId } = opts;
	if (!TRIMESTER_NAMES[trimesterId]) {
		throw new Error(`Unsupported trimesterId for 2ap exam: ${String(trimesterId)}`);
	}

	const cleanSeed = Number.isFinite(opts.seed) ? Math.trunc(opts.seed) : 1;
	const difficulty: Difficulty = opts.difficulty ?? 'medium';
	const rng = new SeededRng(cleanSeed);

	const templates = getTemplatesFor('2ap', trimesterId);
	const regularPool = templates.filter((t) => t.isIntegration !== true);
	const integrationPool = templates.filter((t) => t.isIntegration === true);

	if (regularPool.length < REGULAR_ORDINALS.length) {
		throw new Error(
			`Expected at least ${REGULAR_ORDINALS.length} non-integration templates for 2ap/${trimesterId}, found ${regularPool.length}`
		);
	}
	if (integrationPool.length === 0) {
		throw new Error(`Expected at least 1 integration template for 2ap/${trimesterId}, found none`);
	}

	const selectedRegular = rng.pickDistinct(regularPool, REGULAR_ORDINALS.length);
	const selectedIntegration = rng.pick(integrationPool);

	const exerciseInstances: GeneratedExerciseInstance[] = [];
	const exercises: ExerciseBlock[] = [];

	for (let idx = 0; idx < selectedRegular.length; idx++) {
		const template = selectedRegular[idx];
		const slotSeed = cleanSeed * 31 + idx * 17;
		const instance = template.generate(slotSeed, difficulty);
		const { customTitle: _ignoredCustomTitle, ...baseExercise } = instance.sujetExercise;
		const exerciseBlock: ExerciseBlock = {
			...baseExercise,
			id: baseExercise.id ?? `ex-${template.id}-s${slotSeed}`,
			num: REGULAR_ORDINALS[idx],
			points: REGULAR_POINTS[idx]
		};

		exerciseInstances.push({
			...instance,
			sujetExercise: exerciseBlock
		});
		exercises.push(exerciseBlock);
	}

	const integrationSlotIdx = REGULAR_ORDINALS.length;
	const integrationSeed = cleanSeed * 31 + integrationSlotIdx * 17;
	const integrationInstance = selectedIntegration.generate(integrationSeed, difficulty);
	const { num: _ignoredNum, ...baseIntegration } = integrationInstance.sujetExercise;
	const integrationBlock: ExerciseBlock = {
		...baseIntegration,
		id: baseIntegration.id ?? `ex-${selectedIntegration.id}-s${integrationSeed}`,
		customTitle: INTEGRATION_TITLE,
		points: INTEGRATION_POINTS
	};

	exerciseInstances.push({
		...integrationInstance,
		sujetExercise: integrationBlock
	});
	exercises.push(integrationBlock);

	const gradeMeta = GRADE_METADATA['2ap'];
	const schoolName = opts.schoolName?.trim();
	const metadata: ExamMetadata = {
		levelId: gradeMeta.levelId,
		yearId: gradeMeta.yearId,
		yearName: gradeMeta.yearName,
		subjectId: gradeMeta.subjectId,
		subjectName: gradeMeta.subjectName,
		trimesterId,
		trimesterName: TRIMESTER_NAMES[trimesterId],
		docType: 'exam',
		academicYear: opts.academicYear || '2025/2026',
		duration: 'ساعة واحدة',
		...(schoolName ? { schoolName } : {}),
		siteUrl: 'sujetstore.com'
	};

	return {
		id: `exam-2ap-${trimesterId}-${difficulty}-s${cleanSeed}`,
		grade: '2ap',
		trimesterId,
		docType: 'exam',
		variant: 'trimester_exam',
		templateId: 'primary/taqweem',
		totalPoints: TOTAL_EXAM_POINTS,
		seed: cleanSeed,
		examDoc: {
			metadata,
			exercises
		},
		exerciseInstances
	};
}
