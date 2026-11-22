import type { ExamVariant } from '../../kernel/types';
import {
	GERMAN_GRADE_METADATA,
	SeededRng,
	getGermanTemplatesFor,
	type Difficulty,
	type GermanExamRole,
	type GermanGeneratedExerciseInstance,
	type GermanParameterizedTemplate,
	type GermanTrackId
} from '../../modules/GermanTemplates/runtime';
import type {
	ExamDocument,
	ExamMetadata,
	ExamType,
	ExerciseBlock,
	TrimesterId
} from '../../modules/SujetBuilder/types';
import { drawDistinctSeed } from './shared';

export type GermanExamVariant = ExamVariant;

export interface AssembleGermanOptions {
	grade: GermanTrackId;
	trimesterId: TrimesterId;
	seed: number;
	docType?: ExamType;
	variant?: GermanExamVariant;
	difficulty?: Difficulty;
	academicYear?: string;
	schoolName?: string;
	topicNumber?: 1 | 2;
}

export interface AssembledGermanPaper {
	id: string;
	grade: GermanTrackId;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: GermanExamVariant;
	templateId: 'german/secondary' | 'german/bac_official';
	totalPoints: 20;
	seed: number;
	examDoc: ExamDocument;
	exerciseInstances: GermanGeneratedExerciseInstance[];
}

const ALL_TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];
const TERM_NAMES_DE: Record<TrimesterId, string> = {
	t1: '1. Trimester',
	t2: '2. Trimester',
	t3: '3. Trimester'
};

/**
 * Resolves `(yearId, subjectId, streamId)` in `data/content.db` to a canonical GermanTrackId.
 */
export function yearSubjectToGermanTrack(
	yearId: string,
	subjectId: string,
	streamId?: string | null
): GermanTrackId | null {
	if (subjectId !== 'LAN-GER') return null;
	const st = (streamId || '').toUpperCase();
	if (st && st !== 'LE') return null;
	if (yearId === '2as') return '2as_le';
	if (yearId === '3as') return '3as_le';
	return null;
}

function collectGermanMarkHolders(blocks: any[]): Array<{ get: () => number; set: (v: string) => void }> {
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

function scaleGermanExercisePoints(exercise: ExerciseBlock, targetPoints: number): ExerciseBlock {
	const cloned = JSON.parse(JSON.stringify(exercise)) as ExerciseBlock;
	cloned.points = targetPoints;
	const holders = collectGermanMarkHolders(cloned.content ?? []);
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

function pickByRole(
	pool: GermanParameterizedTemplate[],
	role: GermanExamRole,
	rng: SeededRng,
	excludeIds: Set<string>
): GermanParameterizedTemplate {
	const exact = pool.filter((t) => t.examRole === role && !excludeIds.has(t.id));
	if (exact.length > 0) return rng.pick(exact);
	const anyRole = pool.filter((t) => t.examRole === role);
	if (anyRole.length > 0) return rng.pick(anyRole);
	const unused = pool.filter((t) => !excludeIds.has(t.id));
	return rng.pick(unused.length > 0 ? unused : pool);
}

/**
 * Deterministic ONEC German Language Exam / Test Paper Assembler (2AS LE & 3AS LE BAC):
 * - Exam / BAC: Textverständnis (7) + Sprachfähigkeit (7) + Schriftlicher Ausdruck (6) = 20 Punkte
 * - Supervised Test: Textverständnis (10) + Sprachfähigkeit (10) = 20 Punkte
 */
export function assembleGermanExam(opts: AssembleGermanOptions): AssembledGermanPaper {
	const { grade, trimesterId } = opts;
	const gradeMeta = GERMAN_GRADE_METADATA[grade];
	if (!gradeMeta) {
		throw new Error(`Invalid German track: ${String(grade)}`);
	}
	if (!ALL_TRIMESTERS.includes(trimesterId)) {
		throw new Error(`Invalid trimesterId for ${grade}: ${String(trimesterId)}`);
	}

	const cleanSeed = Number.isFinite(opts.seed) ? Math.abs(Math.trunc(opts.seed)) || 1 : 1;
	const isBacTrack = grade === '3as_le';
	const variant: GermanExamVariant =
		opts.variant === 'bac_mock' && isBacTrack
			? 'bac_mock'
			: opts.docType === 'test' || opts.variant === 'supervised_test'
				? 'supervised_test'
				: 'trimester_exam';
	const docType: ExamType = variant === 'supervised_test' ? 'test' : 'exam';
	const templateId: 'german/secondary' | 'german/bac_official' =
		variant === 'bac_mock' ? 'german/bac_official' : 'german/secondary';
	const difficulty: Difficulty =
		opts.difficulty ?? (docType === 'test' ? 'easy' : variant === 'bac_mock' ? 'hard' : 'medium');
	const academicYear = opts.academicYear?.trim() || '2025 / 2026';

	const rng = new SeededRng(cleanSeed);
	const [compPts, lingPts, writPts] = gradeMeta.pointsSplit;

	const customDocTitle =
		variant === 'bac_mock'
			? 'Abitur-Probeprüfung (BAC) — Fach Deutsch'
			: docType === 'test'
				? `Klassenarbeit im ${TERM_NAMES_DE[trimesterId]} — Fach Deutsch`
				: `Trimesterprüfung (${TERM_NAMES_DE[trimesterId]}) — Fach Deutsch`;

	const metadata: ExamMetadata = {
		levelId: 'secondaire',
		yearId: gradeMeta.yearId,
		yearName: gradeMeta.yearNameDe,
		streamId: gradeMeta.streamId,
		streamName: gradeMeta.streamNameDe,
		subjectId: gradeMeta.subjectId,
		subjectName: gradeMeta.subjectNameDe,
		coefficient: gradeMeta.coefficient,
		trimesterId,
		trimesterName: variant === 'bac_mock' ? 'BAC-Trainingssitzung' : TERM_NAMES_DE[trimesterId],
		docType,
		academicYear,
		duration: variant === 'supervised_test' ? '01 Std. 00' : gradeMeta.examDurationDe,
		siteUrl: 'https://sujetstore.com',
		customDocTitle,
		...(variant === 'bac_mock'
			? { examSessionAr: 'Prüfungssitzung 2026', topicNumber: opts.topicNumber ?? 1 }
			: {})
	};

	const rawPool =
		variant === 'bac_mock'
			? ALL_TRIMESTERS.flatMap((tid) => getGermanTemplatesFor(grade, tid))
			: getGermanTemplatesFor(grade, trimesterId);
	if (rawPool.length === 0) {
		throw new Error(`Empty German template pool for ${grade} ${trimesterId}`);
	}

	const usedIds = new Set<string>();
	const usedSeeds = new Set<number>();
	const exerciseInstances: GermanGeneratedExerciseInstance[] = [];
	const exercises: ExerciseBlock[] = [];

	const plan: Array<{ role: GermanExamRole; points: number; customTitle: string }> =
		variant === 'supervised_test'
			? [
					{ role: 'comprehension', points: 10, customTitle: 'I. Textverständnis' },
					{ role: 'linguistic_competence', points: 10, customTitle: 'II. Sprachfähigkeit' }
				]
			: [
					{ role: 'comprehension', points: compPts, customTitle: 'I. Textverständnis' },
					{ role: 'linguistic_competence', points: lingPts, customTitle: 'II. Sprachfähigkeit' },
					{ role: 'written_expression', points: writPts, customTitle: 'III. Schriftlicher Ausdruck' }
				];

	for (const slot of plan) {
		const tpl = pickByRole(rawPool, slot.role, rng, usedIds);
		usedIds.add(tpl.id);
		const exSeed = drawDistinctSeed(rng, usedSeeds);
		const inst = tpl.generate(exSeed, difficulty);
		exerciseInstances.push(inst);

		const scaled = scaleGermanExercisePoints(inst.sujetExercise, slot.points);
		scaled.customTitle = slot.customTitle;
		exercises.push(scaled);
	}

	const paperId = `ger-${grade}-${trimesterId}-${variant}-${cleanSeed}`;
	const examDoc: ExamDocument = { metadata, exercises };

	return {
		id: paperId,
		grade,
		trimesterId,
		docType,
		variant,
		templateId,
		totalPoints: 20,
		seed: cleanSeed,
		examDoc,
		exerciseInstances
	};
}
