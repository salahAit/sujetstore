import type { ExamVariant } from '../../kernel/types';
import {
	ALL_MANAGEMENT_TRACK_IDS,
	MANAGEMENT_GRADE_METADATA,
	type Difficulty,
	type ManagementGeneratedExerciseInstance,
	type ManagementParameterizedTemplate,
	type ManagementTrackId
} from '../../modules/ManagementTemplates/types';
import { getManagementTemplatesFor } from '../../modules/ManagementTemplates/runtime';
import { SeededRng } from '../../modules/MathTemplates/rng';
import type {
	ExamDocument,
	ExamMetadata,
	ExamType,
	ExerciseBlock,
	TemplateId,
	TrimesterId
} from '../../modules/SujetBuilder/types';
import { TEST_THREE_ORDINALS, TEST_TWO_ORDINALS, TRIMESTER_NAMES, drawDistinctSeed } from './shared';

function collectManagementMarkHolders(
	blocks: any[]
): Array<{ get: () => number; set: (v: string) => void }> {
	const holders: Array<{ get: () => number; set: (v: string) => void }> = [];
	const pushField = (obj: any, key = 'mark') => {
		if (!obj || typeof obj !== 'object') return;
		const raw = obj[key];
		if (raw === undefined || raw === null || raw === '') return;
		const num = Number(String(raw).replace(',', '.'));
		if (!Number.isFinite(num) || num <= 0) return;
		holders.push({
			get: () => Number(String(obj[key]).replace(',', '.')),
			set: (v: string) => {
				obj[key] = v;
			}
		});
	};

	const walk = (b: any) => {
		if (!b || typeof b !== 'object') return;
		if (b.type === 'text' || b.type === 'typst_raw') {
			pushField(b);
		} else if (b.type === 'true_false' && Array.isArray(b.items)) {
			for (const it of b.items) pushField(it);
		} else if (b.type === 'multiple_choice' && Array.isArray(b.groups)) {
			for (const g of b.groups) pushField(g);
		} else if (b.type === 'table') {
			for (const row of b.rows ?? []) {
				if (!Array.isArray(row)) continue;
				for (const cell of row) pushField(cell);
			}
			for (const cell of b.cells ?? []) pushField(cell);
		} else if (b.type === 'illustrated_figure' && Array.isArray(b.legend)) {
			for (const leg of b.legend) pushField(leg);
		} else if (b.type === 'image_grid' && Array.isArray(b.items)) {
			for (const it of b.items) pushField(it);
		} else if (b.type === 'columns' && Array.isArray(b.children)) {
			for (const child of b.children) walk(child);
		}
	};

	for (const block of blocks) walk(block);
	return holders;
}

function formatQuarterMark(quarters: number): string {
	const val = quarters / 4;
	return Number.isInteger(val) ? String(val) : String(Number(val.toFixed(2)));
}

function scaleManagementExercisePoints(
	exercise: ExerciseBlock,
	targetPoints: number
): ExerciseBlock {
	const cloned = JSON.parse(JSON.stringify(exercise)) as ExerciseBlock;
	cloned.points = targetPoints;
	const holders = collectManagementMarkHolders(cloned.content ?? []);
	if (holders.length === 0) return cloned;

	const currentTotal = holders.reduce((s, h) => s + h.get(), 0);
	if (currentTotal <= 0 || Math.abs(currentTotal - targetPoints) < 1e-6) return cloned;

	const targetQuarters = Math.round(targetPoints * 4);
	const allocs = holders.map((h, idx) => {
		const exact = (h.get() / currentTotal) * targetQuarters;
		const floor = Math.floor(exact);
		return { idx, h, floor, rem: exact - floor };
	});
	let remaining = targetQuarters - allocs.reduce((s, a) => s + a.floor, 0);
	for (const item of [...allocs].sort((a, b) => b.rem - a.rem || a.idx - b.idx)) {
		if (remaining <= 0) break;
		item.floor += 1;
		remaining -= 1;
	}
	for (const item of allocs) {
		item.h.set(formatQuarterMark(item.floor));
	}
	return cloned;
}

export type ManagementExamVariant = ExamVariant;

export interface AssembleManagementOptions {
	grade: ManagementTrackId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: ExamType;
	variant?: ManagementExamVariant;
	difficulty?: Difficulty;
	academicYear?: string;
	schoolName?: string;
	topicNumber?: 1 | 2;
}

export interface AssembledManagementPaper {
	examDoc: ExamDocument;
	templateId: TemplateId;
	exercises: ManagementGeneratedExerciseInstance[];
	totalPoints: number;
}

export function yearSubjectToManagementTrack(
	yearId: string,
	subjectId: string,
	streamId?: string | null
): ManagementTrackId | null {
	const st = (streamId || '').toUpperCase();
	if (st && st !== 'GE') return null;
	if (yearId !== '2as' && yearId !== '3as') return null;

	if (subjectId === 'ACC-FIN') return `${yearId}_acc` as ManagementTrackId;
	if (subjectId === 'ECO-MAN') return `${yearId}_eco` as ManagementTrackId;
	if (subjectId === 'LAW') return `${yearId}_law` as ManagementTrackId;
	return null;
}

const ALL_TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];
const EXAM_3_POINTS = [6, 6, 8] as const;
const TEST_2_POINTS = [10, 10] as const;

export function assembleManagementPaper(
	opts: AssembleManagementOptions
): AssembledManagementPaper {
	const {
		grade,
		trimesterId,
		seed,
		docType: rawDocType = 'exam',
		variant = 'trimester_exam',
		difficulty = rawDocType === 'test' || variant === 'supervised_test' ? 'easy' : 'medium',
		academicYear = '2025 / 2026',
		schoolName = 'منصة SujetStore التعليمية',
		topicNumber
	} = opts;

	if (!(ALL_MANAGEMENT_TRACK_IDS as readonly string[]).includes(grade)) {
		throw new Error(`Unsupported Management track: ${String(grade)}`);
	}
	const meta = MANAGEMENT_GRADE_METADATA[grade];

	const isTest = rawDocType === 'test' || variant === 'supervised_test';
	const docType: ExamType = isTest ? 'test' : 'exam';
	const isBacMock = meta.yearId === '3as' && variant === 'bac_mock';

	const templateId: TemplateId = isBacMock
		? 'secondary/bac_official'
		: isTest
			? 'secondary/quiz'
			: 'secondary/lycee_exam';

	const customDocTitle = isBacMock
		? 'بكالوريا تجريبية للتعليم الثانوي'
		: undefined;
	const examSessionAr = isBacMock ? 'دورة تجريبية تحضيرية لشهادة البكالوريا' : undefined;

	const duration = isTest
		? meta.yearId === '3as'
			? '01 ساعة و30 دقيقة'
			: '01 ساعة'
		: isBacMock && meta.bacDuration
			? meta.bacDuration
			: meta.examDuration;

	const cleanSeed = Math.abs(Math.floor(seed)) || 1;
	const rng = new SeededRng(cleanSeed);

	const rawTrimPool = getManagementTemplatesFor(grade, trimesterId);
	const fullPool = ALL_TRIMESTERS.flatMap((t) => getManagementTemplatesFor(grade, t));
	const primaryPool = isBacMock ? fullPool : rawTrimPool.length >= 3 ? rawTrimPool : fullPool;

	if (primaryPool.length < 2) {
		throw new Error(`Insufficient Management templates for ${grade} (${trimesterId})`);
	}

	const usedSeeds = new Set<number>();
	const pickedInstances: ManagementGeneratedExerciseInstance[] = [];
	const exerciseBlocks: ExerciseBlock[] = [];

	if (isTest) {
		const nonInt = rng.shuffle(primaryPool.filter((t) => !t.isIntegration));
		const source = nonInt.length >= 2 ? nonInt : rng.shuffle(primaryPool);
		const pair = source.slice(0, 2);

		pair.forEach((tmpl, idx) => {
			const exSeed = drawDistinctSeed(rng, usedSeeds);
			const inst = tmpl.generate(exSeed, difficulty);
			const scaled = scaleManagementExercisePoints(inst.sujetExercise, TEST_2_POINTS[idx]);
			delete scaled.customTitle;
			scaled.id = `mgt_test_${idx + 1}_${inst.templateId}`;
			scaled.num = TEST_TWO_ORDINALS[idx];
			pickedInstances.push({ ...inst, sujetExercise: scaled });
			exerciseBlocks.push(scaled);
		});
	} else {
		const intPool = rng.shuffle(primaryPool.filter((t) => t.isIntegration));
		const nonIntPool = rng.shuffle(primaryPool.filter((t) => !t.isIntegration));

		const picked: ManagementParameterizedTemplate[] = [];
		const usedIds = new Set<string>();
		const partDiff: Difficulty = isBacMock ? 'hard' : difficulty;

		for (const cand of nonIntPool) {
			if (picked.length >= 2) break;
			if (!usedIds.has(cand.id)) {
				picked.push(cand);
				usedIds.add(cand.id);
			}
		}
		if (picked.length < 2) {
			for (const cand of rng.shuffle(fullPool)) {
				if (picked.length >= 2) break;
				if (!usedIds.has(cand.id)) {
					picked.push(cand);
					usedIds.add(cand.id);
				}
			}
		}

		const finalCand =
			intPool.find((t) => !usedIds.has(t.id)) ??
			fullPool.find((t) => t.isIntegration && !usedIds.has(t.id)) ??
			rng.pick(fullPool.filter((t) => !usedIds.has(t.id)) || fullPool);
		picked.push(finalCand);

		picked.forEach((tmpl, idx) => {
			const exSeed = drawDistinctSeed(rng, usedSeeds);
			const inst = tmpl.generate(exSeed, partDiff);
			const scaled = scaleManagementExercisePoints(inst.sujetExercise, EXAM_3_POINTS[idx]);
			scaled.id = `mgt_ex_${idx + 1}_${inst.templateId}`;
			scaled.num = TEST_THREE_ORDINALS[idx];
			if (idx === 0) scaled.customTitle = 'الجزء الأول';
			else if (idx === 1) scaled.customTitle = 'الجزء الثاني';
			else scaled.customTitle = 'الجزء الثالث — الوضعية الإدماجية الشاملة';
			pickedInstances.push({ ...inst, sujetExercise: scaled });
			exerciseBlocks.push(scaled);
		});
	}

	const metadata: ExamMetadata = {
		levelId: meta.levelId,
		yearId: meta.yearId,
		yearName: meta.yearName,
		streamId: meta.streamId,
		streamName: meta.streamNameAr,
		subjectId: meta.subjectId,
		subjectName: meta.subjectName,
		coefficient: meta.coefficient,
		trimesterId,
		trimesterName: isBacMock ? examSessionAr! : TRIMESTER_NAMES[trimesterId],
		docType,
		academicYear,
		duration,
		schoolName,
		siteUrl: 'https://sujetstore.com',
		...(customDocTitle
			? {
					customDocTitle,
					examSessionAr,
					topicNumber: topicNumber ?? 1
				}
			: {})
	};

	return {
		examDoc: {
			metadata,
			exercises: exerciseBlocks
		},
		templateId,
		exercises: pickedInstances,
		totalPoints: 20
	};
}
