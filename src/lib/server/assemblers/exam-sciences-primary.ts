import {
	SCIENCES_GRADE_METADATA,
	SeededRng,
	getSciencesTemplatesFor
} from '../../modules/SciencesTemplates/runtime';
import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate,
	SciencesPrimaryTrackId
} from '../../modules/SciencesTemplates/runtime';
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

export type SciencesPrimaryVariant =
	| 'trimester_exam'
	| 'supervised_test'
	| 'competency_eval';

export interface AssembledSciencesPrimaryPaper {
	id: string;
	grade: SciencesPrimaryTrackId;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: SciencesPrimaryVariant;
	templateId: 'primary/taqweem';
	totalPoints: 10;
	seed: number;
	examDoc: ExamDocument;
	exerciseInstances: SciencesGeneratedExerciseInstance[];
}

export interface AssembleSciencesPrimaryOptions {
	grade: SciencesPrimaryTrackId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	difficulty?: Difficulty;
	variant?: SciencesPrimaryVariant;
	academicYear?: string;
	schoolName?: string;
}

const VALID_PRIMARY_GRADES: readonly SciencesPrimaryTrackId[] = [
	'1ap',
	'2ap',
	'3ap',
	'4ap',
	'5ap'
];
const ALL_TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];

function isIntegrationTemplate(t: SciencesParameterizedTemplate): boolean {
	return t.isIntegration === true || t.domain === 'integration' || t.onecRole === 'integration';
}

function pickDistinctTemplates(
	pool: SciencesParameterizedTemplate[],
	count: number,
	rng: SeededRng
): SciencesParameterizedTemplate[] {
	if (pool.length === 0) {
		throw new Error('Empty primary sciences template pool');
	}
	const shuffled = rng.shuffle([...pool]);
	const picked: SciencesParameterizedTemplate[] = [];
	const used = new Set<string>();
	for (const t of shuffled) {
		if (picked.length >= count) break;
		if (!used.has(t.id)) {
			picked.push(t);
			used.add(t.id);
		}
	}
	let i = 0;
	while (picked.length < count) {
		picked.push(shuffled[i % shuffled.length]);
		i++;
	}
	return picked;
}

export function assembleSciencesPrimaryExam(
	opts: AssembleSciencesPrimaryOptions
): AssembledSciencesPrimaryPaper {
	const { grade, trimesterId } = opts;
	if (!VALID_PRIMARY_GRADES.includes(grade)) {
		throw new Error(`Invalid primary sciences track: ${String(grade)}`);
	}
	if (!ALL_TRIMESTERS.includes(trimesterId)) {
		throw new Error(`Invalid trimesterId for ${grade}: ${String(trimesterId)}`);
	}

	const cleanSeed = Number.isFinite(opts.seed) ? Math.trunc(opts.seed) : 1;
	const variant: SciencesPrimaryVariant =
		grade === '5ap' && opts.variant === 'competency_eval'
			? 'competency_eval'
			: opts.docType === 'test' || opts.variant === 'supervised_test'
				? 'supervised_test'
				: 'trimester_exam';
	const docType: ExamType = variant === 'supervised_test' ? 'test' : 'exam';
	const difficulty: Difficulty = opts.difficulty ?? 'medium';
	const academicYear = opts.academicYear?.trim() || '2025 / 2026';
	const schoolName = opts.schoolName?.trim() || 'مدرسة ابتدائية نموذجية — منصة SujetStore';

	const rng = new SeededRng(cleanSeed);
	const gradeMeta = SCIENCES_GRADE_METADATA[grade];
	const isLowerPrimary = grade === '1ap' || grade === '2ap';

	const duration =
		docType === 'test'
			? '45 دقيقة'
			: isLowerPrimary
				? '45 دقيقة'
				: grade === '5ap'
					? '01 ساعة و30 دقيقة'
					: '01 ساعة';

	const metadata: ExamMetadata = {
		levelId: 'primaire',
		yearId: gradeMeta.yearId,
		yearName: gradeMeta.yearName,
		subjectId: gradeMeta.subjectId,
		subjectName: gradeMeta.subjectName,
		trimesterId,
		trimesterName:
			variant === 'competency_eval'
				? 'تقييم مكتسبات مرحلة التعليم الابتدائي'
				: TRIMESTER_NAMES[trimesterId],
		docType,
		academicYear,
		duration,
		schoolName,
		siteUrl: 'https://sujetstore.com',
		...(variant === 'competency_eval'
			? { customDocTitle: 'تقييم المكتسبات في مادة التربية العلمية والتكنولوجية' }
			: {})
	};

	const rawPool =
		variant === 'competency_eval'
			? ALL_TRIMESTERS.flatMap((tid) => getSciencesTemplatesFor(grade, tid))
			: getSciencesTemplatesFor(grade, trimesterId);

	const nonInt = rawPool.filter((t) => !isIntegrationTemplate(t));
	const intPool = rawPool.filter(isIntegrationTemplate);
	const usedSeeds = new Set<number>();
	const exerciseInstances: SciencesGeneratedExerciseInstance[] = [];
	const exercises: ExerciseBlock[] = [];

	if (variant === 'supervised_test') {
		// 3 concise primary exercises: 3 + 3 + 4 = 10 pts
		const pts = [3, 3, 4] as const;
		const chosen = pickDistinctTemplates(nonInt.length >= 3 ? nonInt : rawPool, 3, rng);
		chosen.forEach((tmpl, idx) => {
			const inst = tmpl.generate(drawDistinctSeed(rng, usedSeeds), difficulty);
			const scaled = scaleExercisePoints(inst.sujetExercise, pts[idx]);
			delete scaled.customTitle;
			scaled.id = `sci_prim_test_${idx + 1}_${inst.templateId}`;
			scaled.num = TEST_THREE_ORDINALS[idx];
			exerciseInstances.push(inst);
			exercises.push(scaled);
		});
	} else if ((grade === '4ap' || grade === '5ap') && intPool.length > 0) {
		// 3 exercises (2 + 2 + 2 = 6 pts) + 1 Integration / Competency Situation (4 pts) = 10 pts
		const regular = pickDistinctTemplates(nonInt.length >= 3 ? nonInt : rawPool, 3, rng);
		const integ = rng.pick(intPool);
		const pts = [2, 2, 2, 4] as const;
		[...regular, integ].forEach((tmpl, idx) => {
			const inst = tmpl.generate(drawDistinctSeed(rng, usedSeeds), difficulty);
			const scaled = scaleExercisePoints(inst.sujetExercise, pts[idx]);
			scaled.id = `sci_prim_ex_${idx + 1}_${inst.templateId}`;
			scaled.num = PART1_FOUR_ORDINALS[idx];
			if (idx === 3) {
				scaled.customTitle =
					variant === 'competency_eval'
						? 'تقييم المكتسبات — الوضعية الإدماجية'
						: 'الوضعية الإدماجية';
			} else {
				delete scaled.customTitle;
			}
			exerciseInstances.push(inst);
			exercises.push(scaled);
		});
	} else {
		// 1AP, 2AP, 3AP: 4 crisp exercises (2.5 + 2.5 + 2.5 + 2.5 = 10 pts)
		const pts = [2.5, 2.5, 2.5, 2.5] as const;
		const chosen = pickDistinctTemplates(nonInt.length >= 4 ? nonInt : rawPool, 4, rng);
		chosen.forEach((tmpl, idx) => {
			const inst = tmpl.generate(drawDistinctSeed(rng, usedSeeds), difficulty);
			const scaled = scaleExercisePoints(inst.sujetExercise, pts[idx]);
			delete scaled.customTitle;
			scaled.id = `sci_prim_ex_${idx + 1}_${inst.templateId}`;
			scaled.num = PART1_FOUR_ORDINALS[idx];
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
		templateId: 'primary/taqweem',
		totalPoints: 10,
		seed: cleanSeed,
		examDoc: { metadata, exercises },
		exerciseInstances
	};
}
