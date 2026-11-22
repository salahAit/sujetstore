import { existsSync } from 'node:fs';
import { join } from 'node:path';
import {
	ALL_SPANISH_LESSONS,
	ALL_SPANISH_TEMPLATES,
	ALL_SPANISH_TRACK_IDS,
	SPANISH_DOCTRINAL_AND_CONTENT_BLOCKLIST,
	getSpanishTemplatesFor,
	type SpanishTrackId
} from '../src/lib/modules/SpanishTemplates';
import { ALL_OFFICIAL_BAC_SPANISH_PAPERS } from '../src/lib/data/official_bac_spanish';
import type { ContentBlock, ExerciseBlock, TrimesterId } from '../src/lib/modules/SujetBuilder/types';
import { assembleSpanishExam } from '../src/lib/server/assemblers/exam-spanish';
import { getMediaRoot } from '../src/lib/server/storage';

const TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];
const MEDIA_ROOT = getMediaRoot();

interface Violation {
	scope: string;
	detail: string;
}

const violations: Violation[] = [];

function addViolation(scope: string, detail: string): void {
	violations.push({ scope, detail });
}

function checkText(text: unknown, scope: string): void {
	if (typeof text !== 'string' || text.length === 0) return;
	for (const rule of SPANISH_DOCTRINAL_AND_CONTENT_BLOCKLIST) {
		if (rule.pattern.test(text)) {
			addViolation(scope, `${rule.reason} -> ${text.slice(0, 80)}`);
		}
	}
}

function checkMediaUrl(url: unknown, scope: string, expectedExt?: '.webp' | '.jpg' | '.svg'): void {
	if (typeof url !== 'string' || !url.trim()) {
		addViolation(scope, 'Missing or empty image/SVG URL');
		return;
	}
	const clean = url.split('#')[0].split('?')[0].trim();
	if (expectedExt && !clean.toLowerCase().endsWith(expectedExt)) {
		addViolation(scope, `Expected ${expectedExt} asset URL, got: ${clean}`);
	}
	if (clean.startsWith('/documents/') || clean.startsWith('/generated/')) {
		const diskPath = join(MEDIA_ROOT, clean.slice(1));
		if (!existsSync(diskPath)) {
			addViolation(scope, `Asset missing on disk: ${diskPath} (from ${clean})`);
		}
	}
}

function walkBlocks(
	blocks: ContentBlock[],
	scope: string
): { markSum: number; hasAnswer: boolean } {
	let markSum = 0;
	let hasAnswer = false;

	for (let i = 0; i < blocks.length; i++) {
		const b = blocks[i];
		const bScope = `${scope}.block[${i}](${b.type})`;

		if (b.type === 'text' || b.type === 'typst_raw') {
			if (b.type === 'text') checkText(b.content, bScope);
			if (b.answer) {
				checkText(b.answer, `${bScope}.answer`);
				if (b.answer.trim().length > 0) hasAnswer = true;
			}
			if (b.type === 'typst_raw' && b.webMeta?.paragraphs) {
				for (const p of b.webMeta.paragraphs) checkText(p, `${bScope}.webMeta`);
			}
			if (b.mark !== undefined && b.mark !== '') {
				const n = Number(String(b.mark).replace(',', '.'));
				if (!Number.isFinite(n) || n < 0) addViolation(bScope, `Invalid mark: ${b.mark}`);
				else markSum += n;
			}
		} else if (b.type === 'true_false') {
			for (const item of b.items ?? []) {
				checkText(item.q, `${bScope}.q`);
				checkText(item.a, `${bScope}.a`);
				checkText(item.c, `${bScope}.c`);
				if (item.a && item.a.trim().length > 0) hasAnswer = true;
				const n = Number(String(item.mark ?? '0').replace(',', '.'));
				if (!Number.isFinite(n) || n <= 0) addViolation(bScope, `Invalid TF mark: ${item.mark}`);
				else markSum += n;
			}
		} else if (b.type === 'multiple_choice') {
			for (const grp of b.groups ?? []) {
				checkText(grp.header, `${bScope}.header`);
				for (const opt of grp.options ?? []) checkText(opt, `${bScope}.opt`);
				checkText(grp.correct, `${bScope}.correct`);
				if (grp.correct && grp.correct.trim().length > 0) hasAnswer = true;
				if (grp.mark !== undefined && grp.mark !== '') {
					const n = Number(String(grp.mark).replace(',', '.'));
					if (!Number.isFinite(n) || n <= 0) addViolation(bScope, `Invalid QCM mark: ${grp.mark}`);
					else markSum += n;
				}
			}
		} else if (b.type === 'table') {
			for (const h of b.headers ?? []) {
				checkText(typeof h === 'string' ? h : h.content, `${bScope}.header`);
			}
			for (const row of b.rows ?? []) {
				for (const cell of row) {
					if (typeof cell === 'string') {
						checkText(cell, `${bScope}.cell`);
					} else {
						checkText(cell.content, `${bScope}.cell`);
						if (cell.answer) {
							checkText(cell.answer, `${bScope}.cell.answer`);
							if (cell.answer.trim().length > 0) hasAnswer = true;
						}
						if (cell.mark !== undefined && cell.mark !== '') {
							const n = Number(String(cell.mark).replace(',', '.'));
							if (!Number.isFinite(n) || n < 0) addViolation(bScope, `Invalid cell mark: ${cell.mark}`);
							else markSum += n;
						}
					}
				}
			}
		} else if (b.type === 'illustrated_figure') {
			checkText(b.title, `${bScope}.title`);
			checkText(b.caption, `${bScope}.caption`);
			if (Array.isArray(b.pins) && b.pins.length > 0) {
				addViolation(bScope, `Overlay pins forbidden for Spanish (found ${b.pins.length} pins)`);
			}
			if (b.src.includes('/documents/illustrations/spanish/')) {
				checkMediaUrl(b.src, `${bScope}.src`, '.jpg');
			} else {
				checkMediaUrl(b.src, `${bScope}.src`);
			}
			for (const leg of b.legend ?? []) {
				checkText(leg.label, `${bScope}.legend`);
				if (leg.label && leg.label.trim().length > 0 && b.legendMode === 'quiz') {
					hasAnswer = true;
				}
				if (leg.mark !== undefined && leg.mark !== '') {
					const n = Number(String(leg.mark).replace(',', '.'));
					if (!Number.isFinite(n) || n < 0) addViolation(bScope, `Invalid legend mark: ${leg.mark}`);
					else markSum += n;
				}
			}
		} else if (b.type === 'image') {
			checkText(b.caption, `${bScope}.caption`);
			checkMediaUrl(b.src, `${bScope}.src`);
		} else if (b.type === 'image_grid') {
			for (const it of b.items ?? []) {
				checkText(it.label, `${bScope}.item.label`);
				checkText(it.answer, `${bScope}.item.answer`);
				checkMediaUrl(it.src, `${bScope}.item.src`);
				if (it.answer && it.answer.trim().length > 0) hasAnswer = true;
				if (it.mark !== undefined && it.mark !== '') {
					const n = Number(String(it.mark).replace(',', '.'));
					if (!Number.isFinite(n) || n < 0) addViolation(bScope, `Invalid grid mark: ${it.mark}`);
					else markSum += n;
				}
			}
		} else if (b.type === 'columns' && Array.isArray(b.children)) {
			const childRes = walkBlocks(b.children, `${bScope}.columns`);
			markSum += childRes.markSum;
			if (childRes.hasAnswer) hasAnswer = true;
		}
	}

	return { markSum, hasAnswer };
}

function checkExercise(ex: ExerciseBlock, scope: string, expectedPts?: number): number {
	checkText(ex.customTitle, `${scope}.customTitle`);
	checkText(ex.instruction, `${scope}.instruction`);
	const exPts = Number(String(ex.points).replace(',', '.'));
	const res = walkBlocks(ex.content, scope);

	if (Math.abs(res.markSum - exPts) > 0.01) {
		addViolation(scope, `Sub-block marks sum (${res.markSum}) != exercise.points (${exPts})`);
	}
	if (expectedPts !== undefined && Math.abs(exPts - expectedPts) > 0.01) {
		addViolation(scope, `Exercise points (${exPts}) != expected ONEC points (${expectedPts})`);
	}
	if (!res.hasAnswer) {
		addViolation(scope, 'Exercise has zero solution answers');
	}
	return exPts;
}

function checkVisualString(raw: unknown, scope: string): void {
	if (typeof raw !== 'string' || !raw.trim()) return;
	const trimmed = raw.trim();
	if (trimmed.startsWith('{')) {
		try {
			const parsed = JSON.parse(trimmed) as {
				kind?: string;
				src?: string;
				pins?: unknown[];
				title?: string;
				legend?: Array<{ num: string; label: string }>;
			};
			if (parsed.kind === 'illustrated') {
				checkText(parsed.title, `${scope}.title`);
				if (Array.isArray(parsed.pins) && parsed.pins.length > 0) {
					addViolation(scope, `Lesson visual has ${parsed.pins.length} overlay pins (must be 0)`);
				}
				if (parsed.src?.includes('/documents/illustrations/spanish/')) {
					checkMediaUrl(parsed.src, `${scope}.src`, '.webp');
				} else {
					checkMediaUrl(parsed.src, `${scope}.src`);
				}
				for (const item of parsed.legend ?? []) checkText(item.label, `${scope}.legend`);
			}
		} catch (e) {
			addViolation(scope, `Malformed JSON visual: ${(e as Error).message}`);
		}
		return;
	}
	if (trimmed.startsWith('/')) {
		checkMediaUrl(trimmed, scope);
	}
}

function main() {
	console.log('[audit-spanish-content] Auditing lessons, templates, papers & Official BAC archive...');

	const seenLessonSlugs = new Set<string>();
	for (const lesson of ALL_SPANISH_LESSONS) {
		const scope = `lesson:${lesson.id}`;
		if (seenLessonSlugs.has(lesson.slug)) {
			addViolation(scope, `Duplicate lesson slug: ${lesson.slug}`);
		}
		seenLessonSlugs.add(lesson.slug);
		checkText(lesson.titleAr, `${scope}.titleAr`);
		checkText(lesson.sequenceTitleAr, `${scope}.sequenceTitleAr`);
		checkText(lesson.discover.scenarioAr, `${scope}.discover.scenarioAr`);
		checkVisualString(lesson.discover.svg, `${scope}.discover.svg`);
		checkVisualString(lesson.summary.visualSvg, `${scope}.summary.visualSvg`);
		checkText(lesson.summary.visualCaptionAr, `${scope}.summary.visualCaptionAr`);
		checkText(lesson.summary.watchOutAr, `${scope}.summary.watchOutAr`);

		for (const o of lesson.objectives) checkText(o, `${scope}.objective`);
		for (const kw of lesson.keywordsAr ?? []) checkText(kw, `${scope}.keyword`);
		for (const r of lesson.summary.rulesAr) checkText(r, `${scope}.rule`);
		for (const st of lesson.discover.steps) {
			checkText(st.titleAr, `${scope}.step.title`);
			checkText(st.promptAr, `${scope}.step.prompt`);
			checkText(st.explanationAr, `${scope}.step.explanation`);
		}
		for (const pq of lesson.practice) {
			checkText(pq.promptAr, `${scope}.practice.prompt`);
			checkText(pq.explanationAr, `${scope}.practice.explanation`);
			if (!pq.options || pq.options.length < 2) {
				addViolation(scope, `Practice question ${pq.id} has < 2 options`);
			}
		}
	}

	for (const grade of ALL_SPANISH_TRACK_IDS) {
		for (const trim of TRIMESTERS) {
			const pool = getSpanishTemplatesFor(grade, trim);
			if (pool.length === 0) {
				addViolation(`templates:${grade}:${trim}`, 'Empty template pool');
			}
			for (const tpl of pool) {
				const diffs: Array<'easy' | 'medium' | 'hard'> = ['easy', 'medium', 'hard'];
				for (let s = 1; s <= 3; s++) {
					const inst = tpl.generate(s, diffs[s - 1]);
					const scope = `tpl:${tpl.id}:seed${s}`;
					checkExercise(inst.sujetExercise, scope);
					checkText(inst.finalAnswer, `${scope}.finalAnswer`);
					checkText(inst.quizQuestion.questionText, `${scope}.quiz`);
					checkText(inst.quizQuestion.explanation, `${scope}.quiz.exp`);
				}
			}
		}
	}

	let assembledChecked = 0;
	const checkPaper = (
		grade: SpanishTrackId,
		trimesterId: TrimesterId,
		docType: 'exam' | 'test',
		variant: 'trimester_exam' | 'supervised_test' | 'bac_mock',
		topicNumber?: 1 | 2
	) => {
		const expectedArr = docType === 'test' ? [10, 10] : [7, 7, 6];
		const paper = assembleSpanishExam({
			grade,
			trimesterId,
			seed: 42 + (topicNumber ?? 0),
			docType,
			variant,
			topicNumber
		});
		assembledChecked++;
		const scope = `assemble:${grade}:${trimesterId}:${docType}:${variant}`;
		if (paper.examDoc.exercises.length !== expectedArr.length) {
			addViolation(
				scope,
				`Expected ${expectedArr.length} exercises, got ${paper.examDoc.exercises.length}`
			);
			return;
		}
		let sum = 0;
		for (let i = 0; i < expectedArr.length; i++) {
			sum += checkExercise(paper.examDoc.exercises[i], `${scope}.ex${i + 1}`, expectedArr[i]);
		}
		if (Math.abs(sum - 20) > 0.01) {
			addViolation(scope, `Assembled total ${sum} != 20`);
		}
	};

	for (const grade of ALL_SPANISH_TRACK_IDS) {
		for (const trim of TRIMESTERS) {
			checkPaper(grade, trim, 'exam', 'trimester_exam');
			checkPaper(grade, trim, 'test', 'supervised_test');
		}
	}
	checkPaper('3as_le', 't3', 'exam', 'bac_mock', 1);
	checkPaper('3as_le', 't3', 'exam', 'bac_mock', 2);

	if (ALL_OFFICIAL_BAC_SPANISH_PAPERS.length !== 6) {
		addViolation('official_bac', `Expected 6 official Spanish BAC papers, got ${ALL_OFFICIAL_BAC_SPANISH_PAPERS.length}`);
	}
	for (const paper of ALL_OFFICIAL_BAC_SPANISH_PAPERS) {
		const scope = `bac:${paper.slug}`;
		const expectedPts = [7, 7, 6];
		if (paper.examDoc.exercises.length !== 3) {
			addViolation(scope, `Expected 3 parts, got ${paper.examDoc.exercises.length}`);
			continue;
		}
		let sum = 0;
		for (let i = 0; i < 3; i++) {
			sum += checkExercise(paper.examDoc.exercises[i], `${scope}.ex${i + 1}`, expectedPts[i]);
		}
		if (Math.abs(sum - 20) > 0.01) {
			addViolation(scope, `Total BAC marks (${sum}) != 20`);
		}
	}

	console.log(
		JSON.stringify(
			{
				tracks: ALL_SPANISH_TRACK_IDS.length,
				lessons: ALL_SPANISH_LESSONS.length,
				templates: ALL_SPANISH_TEMPLATES.length,
				assembledChecked,
				officialBacPapers: ALL_OFFICIAL_BAC_SPANISH_PAPERS.length,
				violationCount: violations.length,
				sampleViolations: violations.slice(0, 20)
			},
			null,
			2
		)
	);

	if (violations.length > 0) {
		process.exit(1);
	}
}

main();
