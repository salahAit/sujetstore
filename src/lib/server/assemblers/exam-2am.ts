import { GRADE_METADATA, getTemplatesFor, SeededRng } from '../../modules/MathTemplates';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate
} from '../../modules/MathTemplates';
import type {
	ContentBlock,
	ExamDocument,
	ExamMetadata,
	ExamType,
	ExerciseBlock,
	TableBlock,
	TableCell,
	TrimesterId
} from '../../modules/SujetBuilder/types';

export interface AssembledExamPaper {
	id: string;
	grade: '2am';
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: 'trimester_exam' | 'supervised_test';
	templateId: 'middle/exam' | 'middle/quiz';
	totalPoints: 20;
	seed: number;
	examDoc: ExamDocument;
	exerciseInstances: GeneratedExerciseInstance[];
}

export interface Assemble2amExamOptions {
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	difficulty?: Difficulty;
	academicYear?: string;
	schoolName?: string;
}

const TRIMESTER_NAMES: Record<TrimesterId, string> = {
	t1: 'الفصل الأول',
	t2: 'الفصل الثاني',
	t3: 'الفصل الثالث'
};

const TEST_ORDINALS = ['الأول', 'الثاني', 'الثالث'] as const;
const EXAM_PART1_ORDINALS = ['الأول', 'الثاني', 'الثالث', 'الرابع'] as const;
const TEST_POINT_DISTRIBUTION = [7, 7, 6] as const;

function isGroupPrimary(t: ParameterizedTemplate): boolean {
	return t.domain === 'numeric' || t.domain === 'proportionality';
}

function isGroupSecondary(t: ParameterizedTemplate): boolean {
	return t.domain === 'geometry' || t.domain === 'measurement';
}

function cloneExerciseBlock(ex: ExerciseBlock): ExerciseBlock {
	return JSON.parse(JSON.stringify(ex)) as ExerciseBlock;
}

interface MarkHolder {
	mark?: string;
}

function collectMarkHolders(blocks: ContentBlock[], out: MarkHolder[]): void {
	for (const block of blocks) {
		if (!block || typeof block !== 'object') continue;

		if (
			(block.type === 'text' ||
				block.type === 'typst_raw' ||
				block.type === 'diagram_flow' ||
				block.type === 'labeling') &&
			block.mark
		) {
			out.push(block);
		} else if (block.type === 'true_false' && Array.isArray(block.items)) {
			for (const item of block.items) {
				if (item.mark) out.push(item);
			}
		} else if (block.type === 'multiple_choice' && Array.isArray(block.groups)) {
			for (const group of block.groups) {
				if (group.mark) out.push(group);
			}
		} else if (block.type === 'image_grid' && Array.isArray(block.items)) {
			for (const item of block.items) {
				if (item.mark) out.push(item);
			}
		} else if (block.type === 'table') {
			const scanCells = (cells: (string | TableCell)[] | undefined) => {
				if (!Array.isArray(cells)) return;
				for (const cell of cells) {
					if (cell && typeof cell === 'object' && cell.mark) {
						out.push(cell);
					}
				}
			};
			scanCells(block.headers);
			scanCells(block.cells);
			if (Array.isArray(block.rows)) {
				for (const row of block.rows) {
					scanCells(row);
				}
			}
		} else if (block.type === 'columns' && Array.isArray(block.children)) {
			collectMarkHolders(block.children, out);
		}
	}
}

function formatMark(quarterPoints: number): string {
	const value = quarterPoints / 4;
	return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)));
}

/**
 * Scales an ExerciseBlock's total points and proportionally adjusts sub-marks
 * (in 0.25 pt increments via Hamilton largest-remainder rounding) so solution
 * marks sum exactly to `targetPoints`.
 */
function scaleExercisePoints(ex: ExerciseBlock, targetPoints: number): ExerciseBlock {
	const cloned = cloneExerciseBlock(ex);
	const origPoints = Number(cloned.points);
	cloned.points = targetPoints;

	if (!Number.isFinite(origPoints) || origPoints === targetPoints) {
		return cloned;
	}

	const holders: MarkHolder[] = [];
	collectMarkHolders(cloned.content, holders);

	const numericHolders = holders.filter((h) => {
		const n = Number(h.mark);
		return typeof h.mark === 'string' && h.mark.trim() !== '' && Number.isFinite(n) && n > 0;
	});

	if (numericHolders.length === 0) {
		return cloned;
	}

	const totalOrigMarks = numericHolders.reduce((sum, h) => sum + Number(h.mark), 0);
	if (totalOrigMarks <= 0) {
		return cloned;
	}

	const targetQuarters = Math.round(targetPoints * 4);
	const allocations = numericHolders.map((h, idx) => {
		const exact = (Number(h.mark) / totalOrigMarks) * targetQuarters;
		const floor = Math.floor(exact);
		return {
			idx,
			holder: h,
			floor,
			remainder: exact - floor
		};
	});

	const assignedSum = allocations.reduce((sum, a) => sum + a.floor, 0);
	let remaining = targetQuarters - assignedSum;

	const byRemainder = [...allocations].sort((a, b) => {
		if (Math.abs(b.remainder - a.remainder) > 1e-9) {
			return b.remainder - a.remainder;
		}
		return a.idx - b.idx;
	});

	for (const item of byRemainder) {
		if (remaining <= 0) break;
		item.floor += 1;
		remaining -= 1;
	}

	for (const item of allocations) {
		item.holder.mark = formatMark(item.floor);
	}

	return cloned;
}

function selectNonIntegrationTemplates(
	nonIntegration: ParameterizedTemplate[],
	count: 3 | 4,
	rng: SeededRng
): ParameterizedTemplate[] {
	if (nonIntegration.length < count) {
		throw new Error(
			`Insufficient non-integration 2AM templates: needed ${count}, found ${nonIntegration.length}`
		);
	}

	const primary = rng.shuffle(nonIntegration.filter(isGroupPrimary));
	const secondary = rng.shuffle(nonIntegration.filter(isGroupSecondary));
	const picked: ParameterizedTemplate[] = [];
	const pickedIds = new Set<string>();

	const addTemplate = (t: ParameterizedTemplate | undefined) => {
		if (t && !pickedIds.has(t.id)) {
			picked.push(t);
			pickedIds.add(t.id);
		}
	};

	if (count === 3) {
		// Supervised test: guarantee coverage across both primary (numeric/proportionality)
		// and secondary (geometry/measurement) domains, then pick 1 more randomly.
		addTemplate(primary[0]);
		addTemplate(secondary[0]);
	} else {
		// Official exam Part 1: aim for balanced 2 + 2 domain split across the 4 exercises.
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

	// Keep official Algerian exam ordering: numeric/proportionality first, then geometry/measurement.
	const primaryPicked = picked.filter(isGroupPrimary);
	const secondaryPicked = picked.filter(isGroupSecondary);
	const otherPicked = picked.filter((t) => !isGroupPrimary(t) && !isGroupSecondary(t));
	return [...primaryPicked, ...secondaryPicked, ...otherPicked];
}

function drawDistinctSeed(rng: SeededRng, used: Set<number>): number {
	let candidate = rng.int(1000, 999999);
	while (used.has(candidate)) {
		candidate = rng.int(1000, 999999);
	}
	used.add(candidate);
	return candidate;
}

function buildPart2RubricTable(): TableBlock {
	return {
		type: 'table',
		headers: ['المعيار', 'مؤشرات التقييم', 'العلامة'],
		cells: [],
		rows: [
			[
				'م1: الوجاهة (التفسير السليم للوضعية)',
				'فهم السند واختيار الأدوات والعمليات الرياضية المناسبة',
				'3'
			],
			[
				'م2: الاستعمال السليم لأدوات المادة',
				'تطبيق القواعد الحسابية والهندسية وإجراء العمليات بدقة',
				'3'
			],
			[
				'م3: الانسجام وتسلسل الإجابة',
				'تناسق خطوات الحل ووحدات القياس ومنطقية النتائج',
				'1'
			],
			[
				'م4: الإتقان وتنظيم الورقة',
				'نظافة الورقة، تنظيم العرض، وضوح التبرير والإنشاء',
				'1'
			]
		],
		align: 'center',
		borders: 'grid',
		headerBackground: true,
		width: 'full'
	};
}

/**
 * Assemble a complete, deterministic Algerian Gen-2 2AM Mathematics
 * supervised test (`فرض محروس`) or official trimester exam (`اختبار فصلي`)
 * scaled to 20 points and ready for both Interactive Quiz and Typst PDF export.
 */
export function assemble2amExam(opts: Assemble2amExamOptions): AssembledExamPaper {
	const { trimesterId } = opts;
	if (!TRIMESTER_NAMES[trimesterId]) {
		throw new Error(`Invalid trimesterId for 2AM exam assembly: ${String(trimesterId)}`);
	}

	const cleanSeed = Number.isFinite(opts.seed) ? Math.trunc(opts.seed) : 1;
	const docType: ExamType = opts.docType === 'test' ? 'test' : 'exam';
	const difficulty: Difficulty = opts.difficulty ?? 'medium';
	const academicYear = opts.academicYear?.trim() || '2025 / 2026';
	const schoolName = opts.schoolName?.trim() || undefined;

	const rng = new SeededRng(cleanSeed);
	const allTemplates = getTemplatesFor('2am', trimesterId);
	const nonIntegration = allTemplates.filter(
		(t) => !t.isIntegration && t.domain !== 'integration'
	);
	const integrationPool = allTemplates.filter(
		(t) => t.isIntegration === true || t.domain === 'integration'
	);

	const gradeMeta = GRADE_METADATA['2am'];
	const isTest = docType === 'test';
	const templateId: 'middle/exam' | 'middle/quiz' = isTest ? 'middle/quiz' : 'middle/exam';
	const variant: 'trimester_exam' | 'supervised_test' = isTest
		? 'supervised_test'
		: 'trimester_exam';

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
		duration: isTest ? 'ساعة واحدة' : 'ساعتان',
		...(schoolName ? { schoolName } : {}),
		siteUrl: 'sujetstore.com'
	};

	const usedSeeds = new Set<number>();
	const exerciseInstances: GeneratedExerciseInstance[] = [];
	const exercises: ExerciseBlock[] = [];

	if (isTest) {
		const selected = selectNonIntegrationTemplates(nonIntegration, 3, rng);
		selected.forEach((tmpl, idx) => {
			const exSeed = drawDistinctSeed(rng, usedSeeds);
			const inst = tmpl.generate(exSeed, difficulty);
			exerciseInstances.push(inst);

			const scaled = scaleExercisePoints(inst.sujetExercise, TEST_POINT_DISTRIBUTION[idx]);
			delete scaled.customTitle;
			scaled.id = `ex_test_${idx + 1}_${inst.templateId}`;
			scaled.num = TEST_ORDINALS[idx];
			exercises.push(scaled);
		});
	} else {
		if (integrationPool.length === 0) {
			throw new Error(`No integration template found for 2AM trimester ${trimesterId}`);
		}

		// Part 1: 4 independent exercises x 3 pts = 12 pts
		const part1Templates = selectNonIntegrationTemplates(nonIntegration, 4, rng);
		part1Templates.forEach((tmpl, idx) => {
			const exSeed = drawDistinctSeed(rng, usedSeeds);
			const inst = tmpl.generate(exSeed, difficulty);
			exerciseInstances.push(inst);

			const exBlock = scaleExercisePoints(inst.sujetExercise, 3);
			delete exBlock.customTitle;
			exBlock.id = `ex_part1_${idx + 1}_${inst.templateId}`;
			exBlock.num = EXAM_PART1_ORDINALS[idx];
			const baseInstruction = exBlock.instruction?.trim() || 'أجب عن الأسئلة التالية بدقة:';
			exBlock.instruction =
				idx === 0 ? `الجزء الأول (12 نقطة) — ${baseInstruction}` : baseInstruction;
			exercises.push(exBlock);
		});

		// Part 2: Integration Situation (8 pts) + official 4-criteria rubric table
		const integrationTmpl = rng.pick(integrationPool);
		const intSeed = drawDistinctSeed(rng, usedSeeds);
		const intInst = integrationTmpl.generate(intSeed, difficulty);
		exerciseInstances.push(intInst);

		const part2Block = scaleExercisePoints(intInst.sujetExercise, 8);
		delete part2Block.num;
		part2Block.id = `ex_part2_${intInst.templateId}`;
		part2Block.customTitle = 'الجزء الثاني — الوضعية الإدماجية';
		part2Block.points = 8;
		part2Block.content.push(buildPart2RubricTable());
		exercises.push(part2Block);
	}

	return {
		id: `2am_${trimesterId}_${docType}_${difficulty}_${cleanSeed}`,
		grade: '2am',
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
