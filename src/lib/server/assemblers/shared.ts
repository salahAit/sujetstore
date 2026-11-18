import type { MathDomain, ParameterizedTemplate } from '../../modules/MathTemplates/types';
import type { SeededRng } from '../../modules/MathTemplates/rng';
import type {
	ContentBlock,
	ExerciseBlock,
	TableBlock,
	TableCell,
	TrimesterId
} from '../../modules/SujetBuilder/types';

export const TRIMESTER_NAMES: Record<TrimesterId, string> = {
	t1: 'الفصل الأول',
	t2: 'الفصل الثاني',
	t3: 'الفصل الثالث'
};

export const PART1_FOUR_ORDINALS = ['الأول', 'الثاني', 'الثالث', 'الرابع'] as const;
export const TEST_THREE_ORDINALS = ['الأول', 'الثاني', 'الثالث'] as const;
export const TEST_TWO_ORDINALS = ['الأول', 'الثاني'] as const;

export function drawDistinctSeed(rng: SeededRng, used: Set<number>): number {
	let candidate = rng.int(1000, 999_999);
	while (used.has(candidate)) {
		candidate = rng.int(1000, 999_999);
	}
	used.add(candidate);
	return candidate;
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
				if (item?.mark) out.push(item);
			}
		} else if (block.type === 'multiple_choice' && Array.isArray(block.groups)) {
			for (const group of block.groups) {
				if (group?.mark) out.push(group);
			}
		} else if (block.type === 'image_grid' && Array.isArray(block.items)) {
			for (const item of block.items) {
				if (item?.mark) out.push(item);
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
export function scaleExercisePoints(ex: ExerciseBlock, targetPoints: number): ExerciseBlock {
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

/**
 * Picks `count` distinct non-integration templates while prioritizing coverage
 * across the given ordered math domains.
 */
export function selectDomainBalancedTemplates(
	pool: ParameterizedTemplate[],
	count: number,
	domainsOrder: readonly MathDomain[],
	rng: SeededRng
): ParameterizedTemplate[] {
	if (pool.length < count) {
		throw new Error(
			`Expected at least ${count} non-integration templates, found ${pool.length}`
		);
	}

	const picked: ParameterizedTemplate[] = [];
	const pickedIds = new Set<string>();

	for (const domain of rng.shuffle([...domainsOrder])) {
		if (picked.length >= count) break;
		const candidates = pool.filter((t) => t.domain === domain && !pickedIds.has(t.id));
		if (candidates.length > 0) {
			const chosen = rng.pick(candidates);
			picked.push(chosen);
			pickedIds.add(chosen.id);
		}
	}

	if (picked.length < count) {
		const remaining = rng.shuffle(pool.filter((t) => !pickedIds.has(t.id)));
		for (const cand of remaining) {
			if (picked.length >= count) break;
			picked.push(cand);
			pickedIds.add(cand.id);
		}
	}

	// Keep natural domain order: numeric/proportionality first, geometry/measurement second
	const rank = (d: MathDomain) => {
		const idx = domainsOrder.indexOf(d);
		return idx === -1 ? 99 : idx;
	};
	return picked.sort((a, b) => rank(a.domain) - rank(b.domain));
}

export function buildPhysicsPart2RubricTable(): TableBlock {
	return {
		type: 'table',
		headers: ['المعيار', 'مؤشرات التقييم', 'العلامة'],
		cells: [],
		rows: [
			[
				'م1: الوجاهة (التفسير السليم للوضعية)',
				'فهم السند واختيار القوانين والنماذج الفيزيائية والكيميائية المناسبة',
				'3'
			],
			[
				'م2: الاستعمال السليم لأدوات المادة',
				'التطبيق الصحيح للقوانين والتمثيل الشعاعي وموازنة المعادلات وقواعد الأمن الكهربائي',
				'3'
			],
			[
				'م3: الانسجام وتسلسل الإجابة',
				'تناسق خطوات الحل واحترام الوحدات الدولية ومنطقية النتائج',
				'1'
			],
			[
				'م4: الإتقان وتنظيم الورقة',
				'نظافة الورقة، تنظيم العرض، وضوح الرسومات والمخططات والتصريح بالنتائج',
				'1'
			]
		],
		align: 'center',
		borders: 'grid',
		headerBackground: true,
		width: 'full'
	};
}

export function buildPart2RubricTable(): TableBlock {
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
