import {
	GRADE_METADATA,
	SECONDARY_TRACK_IDS,
	SeededRng,
	getTemplatesFor
} from '../../modules/MathTemplates';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate,
	SecondaryTrackId
} from '../../modules/MathTemplates';
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
	drawDistinctSeed,
	scaleExercisePoints
} from './shared';

export type SecondaryVariant = 'trimester_exam' | 'supervised_test' | 'bac_mock';

export interface AssembledSecondaryPaper {
	id: string;
	grade: SecondaryTrackId;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: SecondaryVariant;
	templateId: 'secondary/lycee_exam' | 'secondary/bac_official';
	totalPoints: 20;
	seed: number;
	examDoc: ExamDocument;
	exerciseInstances: GeneratedExerciseInstance[];
}

export interface AssembleSecondaryOptions {
	grade: SecondaryTrackId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	difficulty?: Difficulty;
	variant?: SecondaryVariant;
	academicYear?: string;
	schoolName?: string;
	topicNumber?: 1 | 2;
}

const ALL_TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];
const BAC_ELIGIBLE_GRADES: readonly SecondaryTrackId[] = ['3as_se', '3as_tm', '3as_math'];

const TEST_POINT_DISTRIBUTION = [6, 6, 8] as const;
const EXAM_POINT_DISTRIBUTION = [4, 4, 5, 7] as const;

const TEST_COMPREHENSIVE_TITLE = 'التمرين الثالث: المسألة الشاملة';
const EXAM_COMPREHENSIVE_TITLE = 'التمرين الرابع: المسألة الشاملة';

const BAC_MOCK_DOC_TITLE = 'بكالوريا تجريبية للتعليم الثانوي';
const BAC_MOCK_SESSION_NAME = 'دورة تجريبية تحضيرية لشهادة البكالوريا';

function isBacGrade(grade: SecondaryTrackId): boolean {
	return BAC_ELIGIBLE_GRADES.includes(grade);
}

function isIntegrationTemplate(t: ParameterizedTemplate): boolean {
	return t.isIntegration === true || t.domain === 'integration';
}

function isAllowedForTrack(template: ParameterizedTemplate, track: SecondaryTrackId): boolean {
	const isSeTrack = track === '1as_tcst' || track === '2as_se' || track === '3as_se';
	if (isSeTrack && template.domain === 'arithmetic_z') {
		return false;
	}
	return true;
}

function resolveSecondaryDuration(grade: SecondaryTrackId, variant: SecondaryVariant): string {
	if (variant === 'supervised_test') {
		return isBacGrade(grade) ? '01 ساعة و30 دقيقة' : '01 ساعة';
	}

	switch (grade) {
		case '1as_tcst':
			return '02 ساعة';
		case '2as_se':
			return '02 ساعة و30 دقيقة';
		case '2as_tm':
		case '2as_math':
			return '03 ساعات';
		case '3as_se':
			return '03 ساعات و30 دقيقة';
		case '3as_tm':
			return variant === 'bac_mock' ? '04 ساعات و30 دقيقة' : '04 ساعات';
		case '3as_math':
			return '04 ساعات و30 دقيقة';
	}
}

function resolveMode(
	grade: SecondaryTrackId,
	opts: AssembleSecondaryOptions
): {
	variant: SecondaryVariant;
	docType: ExamType;
	templateId: 'secondary/lycee_exam' | 'secondary/bac_official';
} {
	if (opts.variant === 'bac_mock') {
		if (isBacGrade(grade)) {
			return {
				variant: 'bac_mock',
				docType: 'exam',
				templateId: 'secondary/bac_official'
			};
		}
		// Non-3AS fallback cleanly to trimester_exam
		return {
			variant: 'trimester_exam',
			docType: 'exam',
			templateId: 'secondary/lycee_exam'
		};
	}

	if (opts.docType === 'test' || opts.variant === 'supervised_test') {
		return {
			variant: 'supervised_test',
			docType: 'test',
			templateId: 'secondary/lycee_exam'
		};
	}

	return {
		variant: 'trimester_exam',
		docType: 'exam',
		templateId: 'secondary/lycee_exam'
	};
}

function selectDiverseTemplates(
	pool: ParameterizedTemplate[],
	count: number,
	rng: SeededRng
): ParameterizedTemplate[] {
	if (pool.length < count) {
		throw new Error(`Insufficient templates: needed ${count}, found ${pool.length}`);
	}

	const uniqueMap = new Map<string, ParameterizedTemplate>();
	for (const tmpl of pool) {
		if (!uniqueMap.has(tmpl.id)) {
			uniqueMap.set(tmpl.id, tmpl);
		}
	}
	const uniquePool = Array.from(uniqueMap.values());

	if (uniquePool.length < count) {
		throw new Error(`Insufficient unique templates: needed ${count}, found ${uniquePool.length}`);
	}

	const byDomain = new Map<string, ParameterizedTemplate[]>();
	for (const tmpl of uniquePool) {
		const list = byDomain.get(tmpl.domain) ?? [];
		list.push(tmpl);
		byDomain.set(tmpl.domain, list);
	}

	for (const [domain, list] of byDomain.entries()) {
		byDomain.set(domain, rng.shuffle(list));
	}

	const picked: ParameterizedTemplate[] = [];
	const pickedIds = new Set<string>();

	const domains = rng.shuffle(Array.from(byDomain.keys()));
	for (const d of domains) {
		if (picked.length >= count) break;
		const candidate = byDomain.get(d)?.find((t) => !pickedIds.has(t.id));
		if (candidate) {
			picked.push(candidate);
			pickedIds.add(candidate.id);
		}
	}

	if (picked.length < count) {
		const remaining = rng.shuffle(uniquePool.filter((t) => !pickedIds.has(t.id)));
		for (const cand of remaining) {
			if (picked.length >= count) break;
			picked.push(cand);
			pickedIds.add(cand.id);
		}
	}

	return picked;
}

function selectTestTemplates(
	pool: ParameterizedTemplate[],
	grade: SecondaryTrackId,
	trimesterId: TrimesterId,
	rng: SeededRng
): [ParameterizedTemplate, ParameterizedTemplate, ParameterizedTemplate] {
	if (pool.length < 3) {
		throw new Error(
			`Insufficient ${grade.toUpperCase()} (${trimesterId}) templates for supervised test: needed 3, found ${pool.length}`
		);
	}

	const integrationTemplates = pool.filter(isIntegrationTemplate);
	const nonIntegrationTemplates = pool.filter((t) => !isIntegrationTemplate(t));

	if (integrationTemplates.length > 0 && nonIntegrationTemplates.length >= 2) {
		const domainTemplates = selectDiverseTemplates(nonIntegrationTemplates, 2, rng);
		const integrationTemplate = rng.pick(integrationTemplates);
		return [domainTemplates[0], domainTemplates[1], integrationTemplate];
	}

	const selected = selectDiverseTemplates(pool, 3, rng);
	const intIdx = selected.findIndex(isIntegrationTemplate);
	if (intIdx !== -1 && intIdx !== 2) {
		const [intTmpl] = selected.splice(intIdx, 1);
		selected.push(intTmpl);
	}
	return [selected[0], selected[1], selected[2]];
}

function selectExamTemplates(
	pool: ParameterizedTemplate[],
	grade: SecondaryTrackId,
	trimesterId: TrimesterId,
	rng: SeededRng
): [
	ParameterizedTemplate,
	ParameterizedTemplate,
	ParameterizedTemplate,
	ParameterizedTemplate
] {
	if (pool.length < 4) {
		throw new Error(
			`Insufficient ${grade.toUpperCase()} (${trimesterId}) templates for exam: needed 4, found ${pool.length}`
		);
	}

	const integrationTemplates = pool.filter(isIntegrationTemplate);
	const nonIntegrationTemplates = pool.filter((t) => !isIntegrationTemplate(t));

	if (integrationTemplates.length > 0 && nonIntegrationTemplates.length >= 3) {
		const domainTemplates = selectDiverseTemplates(nonIntegrationTemplates, 3, rng);
		const integrationTemplate = rng.pick(integrationTemplates);
		return [domainTemplates[0], domainTemplates[1], domainTemplates[2], integrationTemplate];
	}

	const selected = selectDiverseTemplates(pool, 4, rng);
	const intIdx = selected.findIndex(isIntegrationTemplate);
	if (intIdx !== -1 && intIdx !== 3) {
		const [intTmpl] = selected.splice(intIdx, 1);
		selected.push(intTmpl);
	} else if (intIdx === -1) {
		const analysisIdx = selected.findIndex((t) => t.domain === 'analysis');
		if (analysisIdx !== -1 && analysisIdx !== 3) {
			const [analysisTmpl] = selected.splice(analysisIdx, 1);
			selected.push(analysisTmpl);
		}
	}
	return [selected[0], selected[1], selected[2], selected[3]];
}

function selectBacMockTemplates(
	grade: SecondaryTrackId,
	rng: SeededRng
): [
	ParameterizedTemplate,
	ParameterizedTemplate,
	ParameterizedTemplate,
	ParameterizedTemplate
] {
	const pool = ALL_TRIMESTERS.flatMap((tid) => getTemplatesFor(grade, tid)).filter((t) =>
		isAllowedForTrack(t, grade)
	);

	if (pool.length < 4) {
		throw new Error(
			`Insufficient ${grade.toUpperCase()} templates for BAC mock: needed 4, found ${pool.length}`
		);
	}

	const integrationTemplates = pool.filter(isIntegrationTemplate);
	const nonIntegrationTemplates = pool.filter((t) => !isIntegrationTemplate(t));

	if (integrationTemplates.length > 0 && nonIntegrationTemplates.length >= 3) {
		const domainTemplates = selectDiverseTemplates(nonIntegrationTemplates, 3, rng);
		const integrationTemplate = rng.pick(integrationTemplates);
		return [domainTemplates[0], domainTemplates[1], domainTemplates[2], integrationTemplate];
	}

	const selected = selectDiverseTemplates(pool, 4, rng);
	const intIdx = selected.findIndex(isIntegrationTemplate);
	if (intIdx !== -1 && intIdx !== 3) {
		const [intTmpl] = selected.splice(intIdx, 1);
		selected.push(intTmpl);
	} else if (intIdx === -1) {
		const analysisIdx = selected.findIndex((t) => t.domain === 'analysis');
		if (analysisIdx !== -1 && analysisIdx !== 3) {
			const [analysisTmpl] = selected.splice(analysisIdx, 1);
			selected.push(analysisTmpl);
		}
	}
	return [selected[0], selected[1], selected[2], selected[3]];
}

/**
 * Assemble a complete, deterministic Algerian Secondary School (1AS - 3AS)
 * Mathematics supervised test (`فرض محروس`), lycee trimester exam (`اختبار فصلي`),
 * or 3AS official Baccalauréat mock exam (`بكالوريا تجريبية`) scaled strictly to 20 points.
 */
export function assembleSecondaryExam(opts: AssembleSecondaryOptions): AssembledSecondaryPaper {
	const { grade, trimesterId } = opts;

	if (!(SECONDARY_TRACK_IDS as readonly string[]).includes(grade)) {
		throw new Error(`Invalid secondary school track: ${String(grade)}`);
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
		streamId: gradeMeta.streamId,
		streamName: gradeMeta.streamNameAr,
		subjectId: gradeMeta.subjectId,
		subjectName: gradeMeta.subjectName,
		coefficient: gradeMeta.coefficient,
		trimesterId,
		trimesterName:
			variant === 'bac_mock' ? BAC_MOCK_SESSION_NAME : TRIMESTER_NAMES[trimesterId],
		docType,
		academicYear,
		duration: resolveSecondaryDuration(grade, variant),
		...(schoolName ? { schoolName } : {}),
		siteUrl: 'sujetstore.com',
		...(variant === 'bac_mock'
			? {
					customDocTitle: BAC_MOCK_DOC_TITLE,
					examSessionAr: BAC_MOCK_SESSION_NAME,
					topicNumber: opts.topicNumber ?? 1
				}
			: opts.topicNumber
				? { topicNumber: opts.topicNumber }
				: {})
	};

	const usedSeeds = new Set<number>();
	const exerciseInstances: GeneratedExerciseInstance[] = [];
	const exercises: ExerciseBlock[] = [];

	const pool = getTemplatesFor(grade, trimesterId).filter((t) => isAllowedForTrack(t, grade));

	if (docType === 'test') {
		const selected = selectTestTemplates(pool, grade, trimesterId, rng);

		selected.forEach((tmpl, idx) => {
			const exSeed = drawDistinctSeed(rng, usedSeeds);
			const inst = tmpl.generate(exSeed, difficulty);
			const targetPts = TEST_POINT_DISTRIBUTION[idx];
			const scaledBlock = scaleExercisePoints(inst.sujetExercise, targetPts);

			scaledBlock.id = `ex_test_${idx + 1}_${inst.templateId}`;
			if (idx === 2) {
				delete scaledBlock.num;
				scaledBlock.customTitle = TEST_COMPREHENSIVE_TITLE;
			} else {
				delete scaledBlock.customTitle;
				scaledBlock.num = TEST_THREE_ORDINALS[idx];
			}

			exerciseInstances.push({
				...inst,
				sujetExercise: scaledBlock
			});
			exercises.push(scaledBlock);
		});
	} else {
		const selected =
			variant === 'bac_mock'
				? selectBacMockTemplates(grade, rng)
				: selectExamTemplates(pool, grade, trimesterId, rng);

		const idPrefix = variant === 'bac_mock' ? 'bac' : 'exam';

		selected.forEach((tmpl, idx) => {
			const exSeed = drawDistinctSeed(rng, usedSeeds);
			const inst = tmpl.generate(exSeed, difficulty);
			const targetPts = EXAM_POINT_DISTRIBUTION[idx];
			const scaledBlock = scaleExercisePoints(inst.sujetExercise, targetPts);

			scaledBlock.id = `ex_${idPrefix}_${idx + 1}_${inst.templateId}`;
			if (idx === 3) {
				delete scaledBlock.num;
				scaledBlock.customTitle = EXAM_COMPREHENSIVE_TITLE;
			} else {
				delete scaledBlock.customTitle;
				scaledBlock.num = PART1_FOUR_ORDINALS[idx];
			}

			exerciseInstances.push({
				...inst,
				sujetExercise: scaledBlock
			});
			exercises.push(scaledBlock);
		});
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
