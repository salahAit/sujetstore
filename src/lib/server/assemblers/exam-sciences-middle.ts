import {
	SCIENCES_GRADE_METADATA,
	SeededRng,
	getSciencesTemplatesFor
} from '../../modules/SciencesTemplates';
import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesMiddleTrackId,
	SciencesParameterizedTemplate
} from '../../modules/SciencesTemplates';
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
	buildSciencesPart2RubricTable,
	drawDistinctSeed,
	scaleExercisePoints
} from './shared';

export type SciencesMiddleVariant = 'trimester_exam' | 'supervised_test' | 'bem_mock';

export interface AssembledSciencesMiddlePaper {
	id: string;
	grade: SciencesMiddleTrackId;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: SciencesMiddleVariant;
	templateId: 'middle/exam' | 'middle/quiz';
	totalPoints: 20;
	seed: number;
	examDoc: ExamDocument;
	exerciseInstances: SciencesGeneratedExerciseInstance[];
}

export interface AssembleSciencesMiddleOptions {
	grade: SciencesMiddleTrackId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	difficulty?: Difficulty;
	variant?: SciencesMiddleVariant;
	academicYear?: string;
	schoolName?: string;
}

const VALID_MIDDLE_GRADES: readonly SciencesMiddleTrackId[] = ['1am', '2am', '3am', '4am'];
const ALL_TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];
const PART1_POINTS = [6, 6] as const;
const TEST_POINTS = [10, 10] as const;
const PART2_POINTS = 8;
const PART1_INSTRUCTION_PREFIX = 'الجزء الأول (12 نقطة) — ';
const PART2_CUSTOM_TITLE = 'الجزء الثاني — الوضعية الإدماجية';
const BEM_MOCK_DOC_TITLE = 'امتحان تجريبي لشهادة التعليم المتوسط (BEM)';
const BEM_MOCK_TRIMESTER_NAME = 'دورة تجريبية لشهادة التعليم المتوسط';

function isIntegrationTemplate(t: SciencesParameterizedTemplate): boolean {
	return t.isIntegration === true || t.domain === 'integration' || t.onecRole === 'integration';
}

function pickDistinctDomainPair(
	pool: SciencesParameterizedTemplate[],
	rng: SeededRng
): [SciencesParameterizedTemplate, SciencesParameterizedTemplate] {
	if (pool.length < 2) {
		throw new Error(`Expected at least 2 non-integration Sciences templates, found ${pool.length}`);
	}
	const shuffled = rng.shuffle([...pool]);
	const first = shuffled[0];
	const diffDomain = shuffled.find((t) => t.id !== first.id && t.domain !== first.domain);
	const second = diffDomain ?? shuffled.find((t) => t.id !== first.id)!;
	return [first, second];
}

function selectBemPart1Pair(
	rng: SeededRng
): [SciencesParameterizedTemplate, SciencesParameterizedTemplate] {
	const t1Pool = getSciencesTemplatesFor('4am', 't1').filter((t) => !isIntegrationTemplate(t));
	const t2Pool = getSciencesTemplatesFor('4am', 't2').filter((t) => !isIntegrationTemplate(t));
	const t3Pool = getSciencesTemplatesFor('4am', 't3').filter((t) => !isIntegrationTemplate(t));
	const candidates: [SciencesParameterizedTemplate, SciencesParameterizedTemplate][] = [];
	const allCombos: [SciencesParameterizedTemplate[], SciencesParameterizedTemplate[]][] = [
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
	grade: SciencesMiddleTrackId,
	trimesterId: TrimesterId,
	variant: SciencesMiddleVariant,
	rng: SeededRng
): SciencesParameterizedTemplate {
	if (variant === 'bem_mock') {
		const pool = ALL_TRIMESTERS.flatMap((tid) =>
			getSciencesTemplatesFor('4am', tid).filter(isIntegrationTemplate)
		);
		if (pool.length === 0) throw new Error('No 4AM Sciences integration template found for BEM mock');
		return rng.pick(pool);
	}
	const pool = getSciencesTemplatesFor(grade, trimesterId).filter(isIntegrationTemplate);
	if (pool.length > 0) return rng.pick(pool);
	const fallback = getSciencesTemplatesFor(grade, trimesterId);
	return rng.pick(fallback);
}

export function assembleSciencesMiddleExam(
	opts: AssembleSciencesMiddleOptions
): AssembledSciencesMiddlePaper {
	const { grade, trimesterId } = opts;
	if (!VALID_MIDDLE_GRADES.includes(grade)) {
		throw new Error(`Invalid middle sciences track: ${String(grade)}`);
	}
	if (!ALL_TRIMESTERS.includes(trimesterId)) {
		throw new Error(`Invalid trimesterId for ${grade}: ${String(trimesterId)}`);
	}

	const cleanSeed = Number.isFinite(opts.seed) ? Math.trunc(opts.seed) : 1;
	const variant: SciencesMiddleVariant =
		opts.variant === 'bem_mock' && grade === '4am'
			? 'bem_mock'
			: opts.docType === 'test' || opts.variant === 'supervised_test'
				? 'supervised_test'
				: 'trimester_exam';
	const docType: ExamType = variant === 'supervised_test' ? 'test' : 'exam';
	const templateId: 'middle/exam' | 'middle/quiz' =
		variant === 'supervised_test' ? 'middle/quiz' : 'middle/exam';
	const difficulty: Difficulty = opts.difficulty ?? 'medium';
	const academicYear = opts.academicYear?.trim() || '2025 / 2026';
	const schoolName = opts.schoolName?.trim() || 'متوسطة جزائرية نموذجية — منصة SujetStore';

	const rng = new SeededRng(cleanSeed);
	const gradeMeta = SCIENCES_GRADE_METADATA[grade];

	const metadata: ExamMetadata = {
		levelId: 'moyen',
		yearId: gradeMeta.yearId,
		yearName: gradeMeta.yearName,
		subjectId: gradeMeta.subjectId,
		subjectName: gradeMeta.subjectName,
		coefficient: gradeMeta.coefficient,
		trimesterId,
		trimesterName:
			variant === 'bem_mock' ? BEM_MOCK_TRIMESTER_NAME : TRIMESTER_NAMES[trimesterId],
		docType,
		academicYear,
		duration: variant === 'supervised_test' ? '01 ساعة' : '01 ساعة و30 دقيقة',
		schoolName,
		siteUrl: 'https://sujetstore.com',
		...(variant === 'bem_mock' ? { customDocTitle: BEM_MOCK_DOC_TITLE } : {})
	};

	const usedSeeds = new Set<number>();
	const exerciseInstances: SciencesGeneratedExerciseInstance[] = [];
	const exercises: ExerciseBlock[] = [];

	if (variant === 'supervised_test') {
		const nonInt = getSciencesTemplatesFor(grade, trimesterId).filter(
			(t) => !isIntegrationTemplate(t)
		);
		const pair = pickDistinctDomainPair(nonInt, rng);
		pair.forEach((tmpl, idx) => {
			const inst = tmpl.generate(drawDistinctSeed(rng, usedSeeds), difficulty);
			const scaled = scaleExercisePoints(inst.sujetExercise, TEST_POINTS[idx]);
			delete scaled.customTitle;
			scaled.id = `sci_mid_test_${idx + 1}_${inst.templateId}`;
			scaled.num = TEST_TWO_ORDINALS[idx];
			exerciseInstances.push(inst);
			exercises.push(scaled);
		});
	} else {
		const pair =
			variant === 'bem_mock'
				? selectBemPart1Pair(rng)
				: pickDistinctDomainPair(
						getSciencesTemplatesFor(grade, trimesterId).filter((t) => !isIntegrationTemplate(t)),
						rng
					);

		pair.forEach((tmpl, idx) => {
			const inst = tmpl.generate(drawDistinctSeed(rng, usedSeeds), difficulty);
			const scaled = scaleExercisePoints(inst.sujetExercise, PART1_POINTS[idx]);
			delete scaled.customTitle;
			scaled.id = `sci_mid_p1_${idx + 1}_${inst.templateId}`;
			scaled.num = TEST_TWO_ORDINALS[idx];
			if (idx === 0) {
				scaled.instruction = `${PART1_INSTRUCTION_PREFIX}${scaled.instruction}`;
			}
			exerciseInstances.push(inst);
			exercises.push(scaled);
		});

		const integTmpl = selectIntegration(grade, trimesterId, variant, rng);
		const integInst = integTmpl.generate(drawDistinctSeed(rng, usedSeeds), difficulty);
		const scaledInteg = scaleExercisePoints(integInst.sujetExercise, PART2_POINTS);
		scaledInteg.id = `sci_mid_p2_${integInst.templateId}`;
		scaledInteg.num = 'الثالث';
		scaledInteg.customTitle = PART2_CUSTOM_TITLE;
		if (variant === 'bem_mock') {
			scaledInteg.content = [...scaledInteg.content, buildSciencesPart2RubricTable()];
		}
		exerciseInstances.push(integInst);
		exercises.push(scaledInteg);
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
