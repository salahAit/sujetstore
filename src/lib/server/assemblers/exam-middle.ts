import { GRADE_METADATA, SeededRng, getTemplatesFor } from '../../modules/MathTemplates/runtime';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate
} from '../../modules/MathTemplates/runtime';
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
	TRIMESTER_NAMES,
	buildPart2RubricTable,
	drawDistinctSeed,
	scaleExercisePoints
} from './shared';

export type MiddleGrade = '1am' | '2am' | '3am' | '4am';
export type MiddleVariant = 'trimester_exam' | 'supervised_test' | 'bem_mock';

export interface AssembledMiddlePaper {
	id: string;
	grade: MiddleGrade;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: MiddleVariant;
	templateId: 'middle/exam' | 'middle/quiz';
	totalPoints: 20;
	seed: number;
	examDoc: ExamDocument;
	exerciseInstances: GeneratedExerciseInstance[];
}

export interface AssembleMiddleOptions {
	grade: MiddleGrade;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	difficulty?: Difficulty;
	variant?: MiddleVariant;
	academicYear?: string;
	schoolName?: string;
}

const VALID_MIDDLE_GRADES: readonly MiddleGrade[] = ['1am', '2am', '3am', '4am'];
const ALL_TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];
const TEST_POINT_DISTRIBUTION = [7, 7, 6] as const;
const PART1_POINTS_PER_EXERCISE = 3;
const PART2_POINTS = 8;
const PART1_INSTRUCTION_PREFIX = 'الجزء الأول (12 نقطة) — ';
const PART2_CUSTOM_TITLE = 'الجزء الثاني — الوضعية الإدماجية';
const BEM_MOCK_DOC_TITLE = 'امتحان تجريبي لشهادة التعليم المتوسط (BEM)';
const BEM_MOCK_TRIMESTER_NAME = 'دورة تجريبية لشهادة التعليم المتوسط';

function isPrimaryDomain(t: ParameterizedTemplate): boolean {
	return t.domain === 'numeric' || t.domain === 'proportionality';
}

function isSecondaryDomain(t: ParameterizedTemplate): boolean {
	return t.domain === 'geometry' || t.domain === 'measurement';
}

function isIntegrationTemplate(t: ParameterizedTemplate): boolean {
	return t.isIntegration === true || t.domain === 'integration';
}

function orderPrimaryBeforeSecondary(
	templates: readonly ParameterizedTemplate[]
): ParameterizedTemplate[] {
	const primary = templates.filter(isPrimaryDomain);
	const secondary = templates.filter(isSecondaryDomain);
	const other = templates.filter((t) => !isPrimaryDomain(t) && !isSecondaryDomain(t));
	return [...primary, ...secondary, ...other];
}

function selectNonIntegrationTemplates(
	nonIntegration: ParameterizedTemplate[],
	count: 3 | 4,
	grade: MiddleGrade,
	trimesterId: TrimesterId,
	rng: SeededRng
): ParameterizedTemplate[] {
	if (nonIntegration.length < count) {
		throw new Error(
			`Insufficient non-integration ${grade.toUpperCase()} (${trimesterId}) templates: needed ${count}, found ${nonIntegration.length}`
		);
	}

	const primary = rng.shuffle(nonIntegration.filter(isPrimaryDomain));
	const secondary = rng.shuffle(nonIntegration.filter(isSecondaryDomain));
	const picked: ParameterizedTemplate[] = [];
	const pickedIds = new Set<string>();

	const addTemplate = (t: ParameterizedTemplate | undefined) => {
		if (t && !pickedIds.has(t.id)) {
			picked.push(t);
			pickedIds.add(t.id);
		}
	};

	if (count === 3) {
		addTemplate(primary[0]);
		addTemplate(secondary[0]);
	} else {
		addTemplate(primary[0]);
		addTemplate(primary[1]);
		addTemplate(secondary[0]);
		addTemplate(secondary[1]);
	}

	if (picked.length < count) {
		const remaining = rng.shuffle(nonIntegration.filter((t) => !pickedIds.has(t.id)));
		for (const candidate of remaining) {
			if (picked.length >= count) break;
			addTemplate(candidate);
		}
	}

	return orderPrimaryBeforeSecondary(picked);
}

/**
 * Selects 4 distinct non-integration 4AM templates across all 3 trimesters,
 * enforcing a 2 primary + 2 secondary domain split and coverage of t1, t2, t3.
 */
function selectBemMockPart1Templates(rng: SeededRng): ParameterizedTemplate[] {
	const pool = ALL_TRIMESTERS.flatMap((tid) =>
		getTemplatesFor('4am', tid).filter((t) => !isIntegrationTemplate(t))
	);
	const primaryPool = pool.filter(isPrimaryDomain);
	const secondaryPool = pool.filter(isSecondaryDomain);

	const primaryPairs: [ParameterizedTemplate, ParameterizedTemplate][] = [];
	for (let i = 0; i < primaryPool.length; i++) {
		for (let j = i + 1; j < primaryPool.length; j++) {
			if (primaryPool[i].id !== primaryPool[j].id) {
				primaryPairs.push([primaryPool[i], primaryPool[j]]);
			}
		}
	}

	const secondaryPairs: [ParameterizedTemplate, ParameterizedTemplate][] = [];
	for (let i = 0; i < secondaryPool.length; i++) {
		for (let j = i + 1; j < secondaryPool.length; j++) {
			if (secondaryPool[i].id !== secondaryPool[j].id) {
				secondaryPairs.push([secondaryPool[i], secondaryPool[j]]);
			}
		}
	}

	const balancedTuples: [
		ParameterizedTemplate,
		ParameterizedTemplate,
		ParameterizedTemplate,
		ParameterizedTemplate
	][] = [];

	for (const [p1, p2] of primaryPairs) {
		for (const [s1, s2] of secondaryPairs) {
			const coveredTrimesters = new Set<TrimesterId>([
				p1.trimesterId,
				p2.trimesterId,
				s1.trimesterId,
				s2.trimesterId
			]);
			if (coveredTrimesters.size === ALL_TRIMESTERS.length) {
				balancedTuples.push([p1, p2, s1, s2]);
			}
		}
	}

	if (balancedTuples.length > 0) {
		const [p1, p2, s1, s2] = rng.pick(balancedTuples);
		return [...rng.shuffle([p1, p2]), ...rng.shuffle([s1, s2])];
	}

	return selectNonIntegrationTemplates(pool, 4, '4am', 't3', rng);
}

function selectIntegrationTemplate(
	grade: MiddleGrade,
	trimesterId: TrimesterId,
	variant: MiddleVariant,
	rng: SeededRng
): ParameterizedTemplate {
	if (variant === 'bem_mock') {
		const t3Pool = getTemplatesFor('4am', 't3').filter(isIntegrationTemplate);
		if (t3Pool.length > 0) {
			return rng.pick(t3Pool);
		}
		const fallbackPool = ALL_TRIMESTERS.flatMap((tid) =>
			getTemplatesFor('4am', tid).filter(isIntegrationTemplate)
		);
		if (fallbackPool.length === 0) {
			throw new Error('No integration template found for 4AM BEM mock');
		}
		return rng.pick(fallbackPool);
	}

	const integrationPool = getTemplatesFor(grade, trimesterId).filter(isIntegrationTemplate);
	if (integrationPool.length === 0) {
		throw new Error(`No integration template found for ${grade.toUpperCase()} trimester ${trimesterId}`);
	}
	return rng.pick(integrationPool);
}

function resolveMode(
	grade: MiddleGrade,
	opts: AssembleMiddleOptions
): {
	variant: MiddleVariant;
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
 * Mathematics supervised test (`فرض محروس`), official trimester exam (`اختبار فصلي`),
 * or 4AM BEM mock exam scaled to 20 points for Interactive Quiz and Typst PDF export.
 */
export function assembleMiddleExam(opts: AssembleMiddleOptions): AssembledMiddlePaper {
	const { grade, trimesterId } = opts;

	if (!VALID_MIDDLE_GRADES.includes(grade)) {
		throw new Error(`Invalid middle school grade: ${String(grade)}`);
	}
	if (!ALL_TRIMESTERS.includes(trimesterId)) {
		throw new Error(
			`Invalid trimesterId for ${grade.toUpperCase()} exam assembly: ${String(trimesterId)}`
		);
	}

	const cleanSeed = Number.isFinite(opts.seed) ? Math.trunc(opts.seed) : 1;
	const { variant, docType, templateId } = resolveMode(grade, opts);
	const difficulty: Difficulty = opts.difficulty ?? 'medium';
	const academicYear = opts.academicYear?.trim() || '2025 / 2026';
	const schoolName = opts.schoolName?.trim() || undefined;

	const rng = new SeededRng(cleanSeed);
	const gradeMeta = GRADE_METADATA[grade];

	const metadata: ExamMetadata = {
		levelId: gradeMeta.levelId,
		yearId: gradeMeta.yearId,
		yearName: gradeMeta.yearName,
		subjectId: gradeMeta.subjectId,
		subjectName: gradeMeta.subjectName,
		trimesterId,
		trimesterName:
			variant === 'bem_mock' ? BEM_MOCK_TRIMESTER_NAME : TRIMESTER_NAMES[trimesterId],
		docType,
		academicYear,
		duration: docType === 'test' ? 'ساعة واحدة' : 'ساعتان',
		...(schoolName ? { schoolName } : {}),
		siteUrl: 'sujetstore.com',
		...(variant === 'bem_mock' ? { customDocTitle: BEM_MOCK_DOC_TITLE } : {})
	};

	const usedSeeds = new Set<number>();
	const exerciseInstances: GeneratedExerciseInstance[] = [];
	const exercises: ExerciseBlock[] = [];

	if (docType === 'test') {
		const nonIntegration = getTemplatesFor(grade, trimesterId).filter(
			(t) => !isIntegrationTemplate(t)
		);
		const selected = selectNonIntegrationTemplates(
			nonIntegration,
			3,
			grade,
			trimesterId,
			rng
		);

		selected.forEach((tmpl, idx) => {
			const exSeed = drawDistinctSeed(rng, usedSeeds);
			const inst = tmpl.generate(exSeed, difficulty);

			const scaledBlock = scaleExercisePoints(inst.sujetExercise, TEST_POINT_DISTRIBUTION[idx]);
			delete scaledBlock.customTitle;
			scaledBlock.id = `ex_test_${idx + 1}_${inst.templateId}`;
			scaledBlock.num = TEST_THREE_ORDINALS[idx];

			exerciseInstances.push({
				...inst,
				sujetExercise: scaledBlock
			});
			exercises.push(scaledBlock);
		});
	} else {
		const part1Templates =
			variant === 'bem_mock'
				? selectBemMockPart1Templates(rng)
				: selectNonIntegrationTemplates(
						getTemplatesFor(grade, trimesterId).filter((t) => !isIntegrationTemplate(t)),
						4,
						grade,
						trimesterId,
						rng
					);

		part1Templates.forEach((tmpl, idx) => {
			const exSeed = drawDistinctSeed(rng, usedSeeds);
			const inst = tmpl.generate(exSeed, difficulty);

			const scaledBlock = scaleExercisePoints(inst.sujetExercise, PART1_POINTS_PER_EXERCISE);
			delete scaledBlock.customTitle;
			scaledBlock.id = `ex_part1_${idx + 1}_${inst.templateId}`;
			scaledBlock.num = PART1_FOUR_ORDINALS[idx];
			const baseInstruction = scaledBlock.instruction?.trim() || 'أجب عن الأسئلة التالية بدقة:';
			scaledBlock.instruction =
				idx === 0 ? `${PART1_INSTRUCTION_PREFIX}${baseInstruction}` : baseInstruction;

			exerciseInstances.push({
				...inst,
				sujetExercise: scaledBlock
			});
			exercises.push(scaledBlock);
		});

		const integrationTmpl = selectIntegrationTemplate(grade, trimesterId, variant, rng);
		const intSeed = drawDistinctSeed(rng, usedSeeds);
		const intInst = integrationTmpl.generate(intSeed, difficulty);

		const part2Block = scaleExercisePoints(intInst.sujetExercise, PART2_POINTS);
		delete part2Block.num;
		part2Block.id = `ex_part2_${intInst.templateId}`;
		part2Block.customTitle = PART2_CUSTOM_TITLE;
		part2Block.points = PART2_POINTS;
		if (!Array.isArray(part2Block.content)) {
			part2Block.content = [];
		}
		part2Block.content.push(buildPart2RubricTable());

		exerciseInstances.push({
			...intInst,
			sujetExercise: part2Block
		});
		exercises.push(part2Block);
	}

	return {
		id: `${grade}_${trimesterId}_${variant}_${difficulty}_${cleanSeed}`,
		grade,
		trimesterId,
		docType,
		variant,
		templateId,
		totalPoints: 20,
		seed: cleanSeed,
		examDoc: {
			metadata,
			exercises
		},
		exerciseInstances
	};
}
