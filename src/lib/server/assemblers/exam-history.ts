import type { ExamVariant } from '../../kernel/types';
import { HISTORY_TEMPLATES_BY_GRADE } from '../../modules/HistoryGeoTemplates/runtime';
import {
	HISTORY_GRADE_METADATA,
	type Difficulty,
	type HistoryGeneratedExerciseInstance,
	type HistoryOnecRole,
	type HistoryParameterizedTemplate,
	type HistoryTrackId
} from '../../modules/HistoryGeoTemplates/types';
import { SeededRng } from '../../modules/MathTemplates/rng';
import type {
	ExamDocument,
	ExamMetadata,
	ExamType,
	ExerciseBlock,
	TemplateId,
	TrimesterId
} from '../../modules/SujetBuilder/types';
import { TRIMESTER_NAMES, drawDistinctSeed } from './shared';

function collectHistoryMarkHolders(blocks: any[]): Array<{ get: () => number; set: (v: string) => void }> {
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

function scaleHistoryExercisePoints(exercise: ExerciseBlock, targetPoints: number): ExerciseBlock {
	const cloned = JSON.parse(JSON.stringify(exercise)) as ExerciseBlock;
	cloned.points = targetPoints;
	const holders = collectHistoryMarkHolders(cloned.content ?? []);
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

export type HistoryExamVariant = ExamVariant;

export interface AssembleHistoryOptions {
	grade: HistoryTrackId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: ExamType;
	variant?: HistoryExamVariant;
	difficulty?: Difficulty;
	academicYear?: string;
	schoolName?: string;
	topicNumber?: 1 | 2;
}

export interface AssembledHistoryPaper {
	examDoc: ExamDocument;
	templateId: TemplateId;
	exercises: HistoryGeneratedExerciseInstance[];
	totalPoints: number;
}

const HISTORY_BASIC_SET = new Set<string>(['3ap', '4ap', '5ap', '1am', '2am', '3am', '4am']);

/**
 * Resolves any (yearId, subjectId, streamId) database tuple into a canonical HistoryTrackId.
 */
export function yearSubjectToHistoryTrack(
	yearId: string,
	subjectId: string,
	streamId?: string | null
): HistoryTrackId | null {
	if (subjectId === 'HIS-B' && HISTORY_BASIC_SET.has(yearId)) {
		return yearId as HistoryTrackId;
	}
	const st = (streamId || '').toUpperCase();
	if (subjectId === 'HIS-SCI') {
		if (yearId === '1as') return '1as_tcst';
		if (yearId === '2as') {
			if (st === 'MATH') return '2as_math';
			if (st === 'TM') return '2as_tm';
			return '2as_se';
		}
		if (yearId === '3as') {
			if (st === 'MATH') return '3as_math';
			if (st === 'TM') return '3as_tm';
			return '3as_se';
		}
	}
	if (subjectId === 'HIS-GE') {
		if (yearId === '2as') return '2as_ge';
		if (yearId === '3as') return '3as_ge';
	}
	if (subjectId === 'HIS-LP') {
		if (yearId === '1as') return '1as_tcl';
		if (yearId === '2as') return '2as_lp';
		if (yearId === '3as') return '3as_lp';
	}
	if (subjectId === 'HIS-LE') {
		if (yearId === '2as') return '2as_le';
		if (yearId === '3as') return '3as_le';
	}
	return null;
}

function isAllowedForTrack(tpl: HistoryParameterizedTemplate, grade: HistoryTrackId): boolean {
	if (!tpl.allowedStreams || tpl.allowedStreams.length === 0) return true;
	const streamCat = HISTORY_GRADE_METADATA[grade].streamCategory;
	return Boolean(streamCat && tpl.allowedStreams.includes(streamCat));
}

function pickByRole(
	primaryPool: HistoryParameterizedTemplate[],
	fallbackPool: HistoryParameterizedTemplate[],
	role: HistoryOnecRole,
	usedIds: Set<string>,
	rng: SeededRng
): HistoryParameterizedTemplate {
	const unusedPrimary = primaryPool.filter((t) => t.onecRole === role && !usedIds.has(t.id));
	if (unusedPrimary.length > 0) return rng.pick(unusedPrimary);

	const unusedFallback = fallbackPool.filter((t) => t.onecRole === role && !usedIds.has(t.id));
	if (unusedFallback.length > 0) return rng.pick(unusedFallback);

	const anyPrimary = primaryPool.filter((t) => t.onecRole === role);
	if (anyPrimary.length > 0) return rng.pick(anyPrimary);

	const anyFallback = fallbackPool.filter((t) => t.onecRole === role);
	if (anyFallback.length > 0) return rng.pick(anyFallback);

	// Last-resort resilience fallback if role pool was empty
	const remaining = primaryPool.filter((t) => !usedIds.has(t.id));
	if (remaining.length > 0) return rng.pick(remaining);
	return rng.pick(fallbackPool);
}

/**
 * Deterministic ONEC History & Geography Exam/Test Paper Assembler covering:
 * - Primary 3AP–5AP (`5 + 5 = 10` pts, including `competency_eval`)
 * - Middle 1AM–4AM BEM (`9 + 4 + 4 + 3 = 20` pts exam, `12 + 8 = 20` pts test)
 * - Secondary 1AS–3AS BAC (`6 + 4 + 6 + 4 = 20` pts exam, `10 + 10 = 20` pts test)
 */
export function assembleHistoryPaper(opts: AssembleHistoryOptions): AssembledHistoryPaper {
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

	const meta = HISTORY_GRADE_METADATA[grade];
	if (!meta) {
		throw new Error(`Unsupported History-Geo grade track: ${grade}`);
	}

	const isTest = rawDocType === 'test' || variant === 'supervised_test';
	const docType: ExamType = isTest ? 'test' : 'exam';
	const isCompetencyEval = meta.levelId === 'primaire' && variant === 'competency_eval';
	const isBemMock = meta.grade === '4am' && variant === 'bem_mock';
	const isBacMock = meta.grade.startsWith('3as_') && variant === 'bac_mock';

	let templateId: TemplateId;
	if (meta.levelId === 'primaire') {
		templateId = 'primary/taqweem';
	} else if (meta.levelId === 'moyen') {
		templateId = isTest ? 'middle/quiz' : 'middle/exam';
	} else {
		templateId = isBacMock
			? 'secondary/bac_official'
			: isTest
				? 'secondary/quiz'
				: 'secondary/lycee_exam';
	}

	const customDocTitle = isCompetencyEval
		? 'نموذج امتحان تقييم المكتسبات'
		: isBemMock
			? 'امتحان تجريبي لشهادة التعليم المتوسط'
			: isBacMock
				? 'امتحان بكالوريا تجريبية للتعليم الثانوي'
				: undefined;

	const cleanSeed = Math.abs(Math.floor(seed)) || 1;
	const rng = new SeededRng(cleanSeed);
	const byTrim = HISTORY_TEMPLATES_BY_GRADE[grade];

	const rawTrimesterPool = (byTrim[trimesterId] ?? []).filter((t) => isAllowedForTrack(t, grade));
	const allStreamPool = [...byTrim.t1, ...byTrim.t2, ...byTrim.t3].filter((t) =>
		isAllowedForTrack(t, grade)
	);

	const primaryPool =
		isCompetencyEval || isBemMock || isBacMock
			? allStreamPool
			: rawTrimesterPool.length > 0
				? rawTrimesterPool
				: allStreamPool;

	if (primaryPool.length === 0) {
		throw new Error(`No History-Geo templates found for ${grade} ${trimesterId}`);
	}

	interface SlotSpec {
		role: HistoryOnecRole;
		points: number;
		customTitle: string;
		difficulty: Difficulty;
	}

	let slots: SlotSpec[];
	if (meta.levelId === 'primaire') {
		const diff: Difficulty = isCompetencyEval ? 'hard' : difficulty;
		slots = [
			{ role: 'pri_history', points: 5, customTitle: 'أولاً: مادة التاريخ', difficulty: diff },
			{ role: 'pri_geography', points: 5, customTitle: 'ثانياً: مادة الجغرافيا', difficulty: diff }
		];
	} else if (meta.levelId === 'moyen') {
		if (isTest) {
			slots = [
				{ role: 'mid_hist_p1', points: 12, customTitle: 'أولاً: مادة التاريخ', difficulty },
				{ role: 'mid_geo_p1', points: 8, customTitle: 'ثانياً: مادة الجغرافيا', difficulty }
			];
		} else {
			const partDiff: Difficulty = isBemMock ? 'hard' : difficulty;
			slots = [
				{
					role: 'mid_hist_p1',
					points: 9,
					customTitle: 'أولاً: مادة التاريخ — الجزء الأول',
					difficulty: partDiff
				},
				{
					role: 'mid_hist_int',
					points: 4,
					customTitle: 'مادة التاريخ — الوضعية الإدماجية',
					difficulty: partDiff
				},
				{
					role: 'mid_geo_p1',
					points: 4,
					customTitle: 'ثانياً: مادة الجغرافيا — الجزء الأول',
					difficulty: partDiff
				},
				{
					role: 'mid_geo_int',
					points: 3,
					customTitle: 'مادة الجغرافيا — الوضعية الإدماجية',
					difficulty: partDiff
				}
			];
		}
	} else {
		if (isTest) {
			slots = [
				{ role: 'sec_hist_p1', points: 10, customTitle: 'أولاً: مادة التاريخ', difficulty },
				{ role: 'sec_geo_p1', points: 10, customTitle: 'ثانياً: مادة الجغرافيا', difficulty }
			];
		} else {
			const bacDiff: Difficulty = isBacMock ? 'hard' : difficulty;
			slots = [
				{
					role: 'sec_hist_p1',
					points: 6,
					customTitle: 'أولاً: مادة التاريخ — الجزء الأول',
					difficulty: bacDiff
				},
				{
					role: 'sec_hist_p2',
					points: 4,
					customTitle: 'مادة التاريخ — الجزء الثاني',
					difficulty: bacDiff
				},
				{
					role: 'sec_geo_p1',
					points: 6,
					customTitle: 'ثانياً: مادة الجغرافيا — الجزء الأول',
					difficulty: bacDiff
				},
				{
					role: 'sec_geo_p2',
					points: 4,
					customTitle: 'مادة الجغرافيا — الجزء الثاني',
					difficulty: bacDiff
				}
			];
		}
	}

	const usedIds = new Set<string>();
	const usedSeeds = new Set<number>();
	const instances: HistoryGeneratedExerciseInstance[] = [];
	const sujetExercises: ExerciseBlock[] = [];

	for (let i = 0; i < slots.length; i++) {
		const slot = slots[i];
		const tpl = pickByRole(primaryPool, allStreamPool, slot.role, usedIds, rng);
		usedIds.add(tpl.id);
		const exSeed = drawDistinctSeed(rng, usedSeeds);
		const inst = tpl.generate(exSeed, slot.difficulty);
		const scaled = scaleHistoryExercisePoints(inst.sujetExercise, slot.points);

		instances.push({
			...inst,
			sujetExercise: {
				...scaled,
				customTitle: scaled.customTitle || slot.customTitle
			}
		});
		sujetExercises.push({
			...scaled,
			id: `his_ex_${i + 1}_${tpl.id}`,
			num: '',
			customTitle: slot.customTitle
		});
	}

	const trimesterLabel = isCompetencyEval
		? 'تقييم المكتسبات (نهاية الطور الابتدائي)'
		: isBemMock
			? 'مراجعة شاملة (BEM)'
			: isBacMock
				? 'بكالوريا تجريبية شاملة (BAC)'
				: TRIMESTER_NAMES[trimesterId];

	const metadata: ExamMetadata = {
		levelId: meta.levelId,
		yearId: meta.yearId,
		yearName: meta.yearName,
		...(meta.streamId ? { streamId: meta.streamId } : {}),
		...(meta.streamNameAr ? { streamName: meta.streamNameAr } : {}),
		subjectId: meta.subjectId,
		subjectName: meta.subjectName,
		trimesterId,
		trimesterName: trimesterLabel,
		docType,
		academicYear,
		duration: isTest ? (meta.levelId === 'secondaire' ? '01 ساعة' : '45 دقيقة') : meta.examDuration,
		schoolName,
		siteUrl: 'https://sujetstore.com',
		font: 'Arabic Transparent',
		...(customDocTitle ? { customDocTitle } : {}),
		coefficient: meta.coefficient,
		...(isBacMock ? { examSessionAr: 'دورة تجريبية — جميع الوحدات', topicNumber: topicNumber ?? 1 } : {}),
		...(topicNumber && !isBacMock ? { topicNumber } : {})
	};

	const totalPoints = slots.reduce((s, x) => s + x.points, 0);

	return {
		examDoc: {
			metadata,
			exercises: sujetExercises
		},
		templateId,
		exercises: instances,
		totalPoints
	};
}
