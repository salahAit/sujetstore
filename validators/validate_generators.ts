#!/usr/bin/env bun
/**
 * Comprehensive verification harness for SujetStore MathTemplates:
 * - Check 1: All 63 Interactive Lessons (ALL_LESSONS)
 * - Check 2: All 54 Parameterized Templates (ALL_TEMPLATES) across seeds 1..100 (5,400 runs)
 * - Check 3: Determinism across repeated runs at (seed=42, difficulty='medium')
 * - Check 4: Cleanup of newly created SVG assets in static/generated/math-svg/
 */

import { existsSync, readdirSync, readFileSync, unlinkSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { Marked } from 'marked';
import markedKatex from 'marked-katex-extension';
import type { ContentBlock, TableCell, TrimesterId } from '../src/lib/modules/SujetBuilder/types';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	InteractiveLessonData,
	ParameterizedTemplate,
	QuizQuestionPayload
} from '../src/lib/modules/MathTemplates/types';

const REPO_ROOT = resolve(import.meta.dir, '..');
// Ensure relative paths inside svg-helpers.ts (resolve('static/generated/math-svg')) target REPO_ROOT.
process.chdir(REPO_ROOT);

const SVG_DIR = resolve(REPO_ROOT, 'static/generated/math-svg');

const { ALL_LESSONS, ALL_TEMPLATES } = await import('../src/lib/modules/MathTemplates/index');
const { evaluateSafeFormula, gradeQuestion } = await import('../src/lib/server/quiz-grading');

const GRADES = ['2ap', '5ap', '2am'] as const;
const TRIMESTERS: readonly TrimesterId[] = ['t1', 't2', 't3'];
const DIFFICULTIES: readonly Difficulty[] = ['easy', 'medium', 'hard'];

const EASTERN_DIGITS_RE = /[\u0660-\u0669\u06F0-\u06F9]/;
const RAW_LATEX_IN_TYPST_RE = /\\(?:frac|times|div)(?![a-zA-Z])|\\sqrt\{/;
const MAX_DIAGNOSTICS = 30;

const katexChecker = new Marked(
	markedKatex({
		throwOnError: false,
		output: 'html',
		nonStandard: true,
		strict: 'ignore'
	})
);

function checkKatexRenderError(text: unknown, label: string, issues: string[]): void {
	if (typeof text !== 'string' || !text.includes('$')) return;
	const html = katexChecker.parseInline(text) as string;
	if (html.includes('katex-error')) {
		issues.push(`KaTeX render error in ${label}: ${text.slice(0, 100)}`);
	}
}

interface ValidationFailure {
	check: 'lessons' | 'templates_meta' | 'templates_sweep' | 'determinism';
	target: string;
	seed?: number;
	difficulty?: Difficulty;
	reason: string;
}

const allFailures: ValidationFailure[] = [];

function recordFailure(failure: ValidationFailure): void {
	allFailures.push(failure);
}

function countUnescapedDollars(text: string): number {
	const matches = text.match(/(?<!\\)\$/g);
	return matches ? matches.length : 0;
}

function findNonFiniteNumber(val: unknown, path = ''): string | null {
	if (typeof val === 'number') {
		if (Number.isNaN(val) || !Number.isFinite(val)) {
			return `${path || 'root'}=${String(val)}`;
		}
		return null;
	}
	if (Array.isArray(val)) {
		for (let i = 0; i < val.length; i++) {
			const hit = findNonFiniteNumber(val[i], `${path}[${i}]`);
			if (hit) return hit;
		}
		return null;
	}
	if (val && typeof val === 'object') {
		for (const [k, v] of Object.entries(val)) {
			const hit = findNonFiniteNumber(v, path ? `${path}.${k}` : k);
			if (hit) return hit;
		}
	}
	return null;
}

function getOptionText(opt: unknown): string {
	return typeof opt === 'string' ? opt : String((opt as { text?: unknown } | null)?.text ?? '');
}

function buildSyntheticAnswers(
	q: QuizQuestionPayload
): { rightAns: Record<string, unknown>; wrongAns: Record<string, unknown>; error?: string } {
	const qd = q.questionData ?? {};

	switch (q.type) {
		case 'mcq': {
			const opts: unknown[] = Array.isArray(qd.options) ? qd.options : [];
			const explicit =
				qd.correctIndexes ??
				qd.correctIndices ??
				(qd.correctIndex !== undefined && qd.correctIndex !== null ? [Number(qd.correctIndex)] : undefined);
			const expected: number[] =
				Array.isArray(explicit) && explicit.length > 0
					? explicit.map(Number)
					: opts
							.map((o, i) => (typeof o === 'object' && o !== null && (o as { isCorrect?: boolean }).isCorrect ? i : -1))
							.filter((i) => i >= 0);
			const wrongIdx = opts.findIndex((_, i) => !expected.includes(i));
			return {
				rightAns: { selectedIndexes: expected },
				wrongAns: { selectedIndexes: wrongIdx >= 0 ? [wrongIdx] : [] }
			};
		}

		case 'true_false': {
			const expected = Boolean(qd.correctAnswer ?? qd.correct);
			return {
				rightAns: { value: expected },
				wrongAns: { value: !expected }
			};
		}

		case 'ordering': {
			const items: unknown[] = Array.isArray(qd.items) ? qd.items : [];
			const labels = items.map((it) => getOptionText(it));
			const rightIndices: number[] = Array.isArray(qd.correctOrder)
				? qd.correctOrder.map(Number)
				: items.map((_, i) => i);
			const wrongIndices = [...rightIndices];
			let swapped = false;
			for (let i = 0; i < wrongIndices.length && !swapped; i++) {
				for (let j = i + 1; j < wrongIndices.length; j++) {
					if (labels[wrongIndices[i]] !== labels[wrongIndices[j]]) {
						[wrongIndices[i], wrongIndices[j]] = [wrongIndices[j], wrongIndices[i]];
						swapped = true;
						break;
					}
				}
			}
			return {
				rightAns: { order: rightIndices },
				wrongAns: swapped ? { order: wrongIndices } : { order: [] }
			};
		}

		case 'drag_drop': {
			const items: { text: string; category: number | string }[] = Array.isArray(qd.items) ? qd.items : [];
			const categories: string[] = Array.isArray(qd.categories) ? qd.categories : [];
			const assignments: Record<string, number> = {};
			for (const item of items) {
				const catIdx = typeof item.category === 'number' ? item.category : categories.indexOf(item.category);
				assignments[item.text] = catIdx;
			}
			const wrongAssignments = { ...assignments };
			if (items.length > 0) {
				const first = items[0];
				const rightIdx = assignments[first.text];
				wrongAssignments[first.text] = (rightIdx + 1) % Math.max(2, categories.length);
			}
			return {
				rightAns: { assignments },
				wrongAns: { assignments: wrongAssignments }
			};
		}

		case 'matching': {
			const pairs: unknown[] = Array.isArray(qd.pairs) ? qd.pairs : [];
			const matches = Object.fromEntries(pairs.map((_, i) => [i, i]));
			const wrongMatches =
				pairs.length >= 2 ? { ...matches, 0: 1, 1: 0 } : { 0: 1 };
			return {
				rightAns: { matches },
				wrongAns: { matches: wrongMatches }
			};
		}

		case 'fill_blank': {
			const accepted: string[] = qd.answers || qd.acceptedAnswers || [];
			const firstValid = accepted.find((a) => String(a).trim().length > 0);
			return {
				rightAns: { text: firstValid !== undefined ? String(firstValid) : '' },
				wrongAns: { text: '__INVALID_FILL_BLANK_VALUE_999999__' }
			};
		}

		case 'short_answer': {
			const kws: string[] = qd.keywords || qd.acceptedKeywords || [];
			return {
				rightAns: { text: kws.map(String).join(' ') },
				wrongAns: { text: '__INVALID_SHORT_ANSWER_999999__' }
			};
		}

		case 'cloze': {
			const idx = Number(qd.correctIndex);
			const optsCount = Array.isArray(qd.options) ? qd.options.length : 2;
			const wrongIdx = (idx + 1) % Math.max(2, optsCount);
			return {
				rightAns: { selectedIndex: idx },
				wrongAns: { selectedIndex: wrongIdx }
			};
		}

		case 'calculated': {
			const tol = Math.max(0, Number(qd.tolerance ?? 0));
			if (qd.formula) {
				const declVars: { name: string; min: number; max: number }[] = Array.isArray(qd.variables)
					? qd.variables
					: [];
				const vars: Record<string, number> = {};
				for (const v of declVars) {
					const lo = Number(v.min);
					const hi = Number(v.max);
					vars[v.name] = Math.floor((lo + hi) / 2);
				}
				const evaluated = evaluateSafeFormula(String(qd.formula), vars);
				if (evaluated === null) {
					return {
						rightAns: { value: Number.NaN, vars },
						wrongAns: { value: 0, vars },
						error: `evaluateSafeFormula failed for formula "${String(qd.formula)}"`
					};
				}
				return {
					rightAns: { value: evaluated, vars },
					wrongAns: { value: evaluated + tol + 100, vars }
				};
			}
			const ansNum = qd.answer !== undefined && qd.answer !== null ? Number(qd.answer) : Number.NaN;
			if (!Number.isFinite(ansNum)) {
				return {
					rightAns: { value: Number.NaN },
					wrongAns: { value: 0 },
					error: `calculated question has invalid answer: ${String(qd.answer)}`
				};
			}
			return {
				rightAns: { value: ansNum },
				wrongAns: { value: ansNum + tol + 100 }
			};
		}

		case 'matrix': {
			const stmts: unknown[] = Array.isArray(qd.statements) ? qd.statements : [];
			const cols: unknown[] = Array.isArray(qd.columns) ? qd.columns : [];
			const expected: number[] = Array.isArray(qd.correctAnswers) ? qd.correctAnswers.map(Number) : [];
			const answers = Object.fromEntries(stmts.map((_, i) => [i, expected[i]]));
			const wrongAnswers = { ...answers };
			if (stmts.length > 0) {
				wrongAnswers[0] = (expected[0] + 1) % Math.max(2, cols.length);
			}
			return {
				rightAns: { answers },
				wrongAns: { answers: wrongAnswers }
			};
		}

		default:
			return {
				rightAns: {},
				wrongAns: {},
				error: `Unsupported quizQuestion.type "${String(q.type)}"`
			};
	}
}

function checkRawLatex(text: unknown, label: string, issues: string[]): void {
	if (typeof text !== 'string') return;
	const m = text.match(RAW_LATEX_IN_TYPST_RE);
	if (m) {
		issues.push(`Raw LaTeX "${m[0]}" found in Typst ${label}`);
	}
}

function checkSvgAssetRef(refPath: unknown, label: string, issues: string[]): void {
	if (typeof refPath !== 'string') return;
	const marker = 'math-svg/';
	const idx = refPath.indexOf(marker);
	if (idx === -1) return;
	const rel = refPath.slice(idx + marker.length).split('?')[0].replace(/^\/+/, '');
	const absPath = resolve(SVG_DIR, rel);
	if (!existsSync(absPath)) {
		issues.push(`Missing SVG asset referenced at ${label}: ${refPath} (expected ${absPath})`);
		return;
	}
	const svgText = readFileSync(absPath, 'utf-8');
	if (!svgText.includes('viewBox=')) {
		issues.push(`SVG asset missing viewBox= at ${label}: ${refPath}`);
	}
}

function inspectTableCell(cell: string | TableCell, label: string, issues: string[]): void {
	if (typeof cell === 'string') {
		checkRawLatex(cell, label, issues);
	} else if (cell && typeof cell === 'object') {
		checkRawLatex(cell.content, `${label}.content`, issues);
		checkRawLatex(cell.answer, `${label}.answer`, issues);
	}
}

function inspectContentBlock(block: ContentBlock, path: string, issues: string[]): void {
	switch (block.type) {
		case 'text':
			checkRawLatex(block.content, `${path}(text.content)`, issues);
			checkRawLatex(block.answer, `${path}(text.answer)`, issues);
			break;
		case 'math':
			checkRawLatex(block.content, `${path}(math.content)`, issues);
			break;
		case 'typst_raw':
			checkRawLatex(block.content, `${path}(typst_raw.content)`, issues);
			checkRawLatex(block.answer, `${path}(typst_raw.answer)`, issues);
			break;
		case 'table':
			(block.headers || []).forEach((h, i) => inspectTableCell(h, `${path}.headers[${i}]`, issues));
			(block.cells || []).forEach((c, i) => inspectTableCell(c, `${path}.cells[${i}]`, issues));
			(block.rows || []).forEach((row, r) =>
				row.forEach((c, cIdx) => inspectTableCell(c, `${path}.rows[${r}][${cIdx}]`, issues))
			);
			break;
		case 'image': {
			const ref = block.src ?? (block as unknown as { path?: string }).path;
			checkSvgAssetRef(ref, `${path}(image)`, issues);
			break;
		}
		case 'image_grid':
			(block.items || []).forEach((it, i) => {
				const ref = it.src ?? (it as unknown as { path?: string }).path;
				checkSvgAssetRef(ref, `${path}.items[${i}]`, issues);
				checkRawLatex(it.label, `${path}.items[${i}].label`, issues);
				checkRawLatex(it.answer, `${path}.items[${i}].answer`, issues);
			});
			break;
		case 'true_false':
			(block.items || []).forEach((it, i) => {
				checkRawLatex(it.q, `${path}.items[${i}].q`, issues);
				checkRawLatex(it.a, `${path}.items[${i}].a`, issues);
				checkRawLatex(it.c, `${path}.items[${i}].c`, issues);
			});
			break;
		case 'multiple_choice':
			(block.groups || []).forEach((g, i) => {
				checkRawLatex(g.header, `${path}.groups[${i}].header`, issues);
				(g.options || []).forEach((opt, oi) =>
					checkRawLatex(opt, `${path}.groups[${i}].options[${oi}]`, issues)
				);
				checkRawLatex(g.correct, `${path}.groups[${i}].correct`, issues);
			});
			break;
		case 'diagram_flow':
			(block.flow || []).forEach((f, i) => checkRawLatex(f, `${path}.flow[${i}]`, issues));
			break;
		case 'labeling':
			(block.labels || []).forEach((l, i) => checkRawLatex(l, `${path}.labels[${i}]`, issues));
			break;
		case 'columns':
			(block.children || []).forEach((child, i) =>
				inspectContentBlock(child, `${path}.columns[${i}]`, issues)
			);
			break;
	}
}

function check2apStandaloneLargeInteger(text: string): string | null {
	const cleaned = text
		.replace(/#[0-9a-fA-F]{3,8}\b/g, '')
		.replace(/\b\d+px\b/g, '')
		.replace(/(?<!\d)(?:2024|2025|2026)(?!\d)/g, '');
	const match = cleaned.match(/(?<!\d)\d{4,}(?!\d)/);
	return match ? match[0] : null;
}

function validateLessons(): {
	total: number;
	byGrade: Record<string, number>;
	passed: number;
	failed: number;
} {
	const byGrade: Record<string, number> = { '2ap': 0, '5ap': 0, '2am': 0 };
	const byGradeTrim = new Map<string, number>();

	if (ALL_LESSONS.length !== 63) {
		recordFailure({
			check: 'lessons',
			target: 'ALL_LESSONS',
			reason: `Expected 63 lessons, found ${ALL_LESSONS.length}`
		});
	}

	const seenIds = new Set<string>();
	const seenSlugs = new Set<string>();
	let failedLessons = 0;

	for (const lesson of ALL_LESSONS as InteractiveLessonData[]) {
		const lessonFailures: string[] = [];
		const target = lesson?.id || lesson?.slug || '<unknown-lesson>';

		byGrade[lesson.grade] = (byGrade[lesson.grade] || 0) + 1;
		const gtKey = `${lesson.grade}:${lesson.trimesterId}`;
		byGradeTrim.set(gtKey, (byGradeTrim.get(gtKey) || 0) + 1);

		if (!lesson.id || typeof lesson.id !== 'string') {
			lessonFailures.push('Missing or non-string id');
		} else if (seenIds.has(lesson.id)) {
			lessonFailures.push(`Duplicate lesson id: ${lesson.id}`);
		} else {
			seenIds.add(lesson.id);
		}

		if (!lesson.slug || typeof lesson.slug !== 'string') {
			lessonFailures.push('Missing or non-string slug');
		} else if (seenSlugs.has(lesson.slug)) {
			lessonFailures.push(`Duplicate lesson slug: ${lesson.slug}`);
		} else {
			seenSlugs.add(lesson.slug);
		}

		if (typeof lesson.titleAr !== 'string' || lesson.titleAr.trim().length === 0) {
			lessonFailures.push('Empty titleAr');
		}
		if (!Array.isArray(lesson.objectives) || lesson.objectives.length < 2) {
			lessonFailures.push(`objectives.length < 2 (${lesson.objectives?.length ?? 0})`);
		}
		if (!Array.isArray(lesson.discover?.steps) || lesson.discover.steps.length < 2) {
			lessonFailures.push(`discover.steps.length < 2 (${lesson.discover?.steps?.length ?? 0})`);
		}
		if (!Array.isArray(lesson.summary?.rulesAr) || lesson.summary.rulesAr.length < 2) {
			lessonFailures.push(`summary.rulesAr.length < 2 (${lesson.summary?.rulesAr?.length ?? 0})`);
		}

		const visualSvg = lesson.summary?.visualSvg;
		if (typeof visualSvg !== 'string' || !visualSvg.includes('<svg') || !visualSvg.includes('viewBox=')) {
			lessonFailures.push('summary.visualSvg missing <svg or viewBox=');
		}

		if (!Array.isArray(lesson.practice) || lesson.practice.length !== 3) {
			lessonFailures.push(`practice.length !== 3 (${lesson.practice?.length ?? 0})`);
		} else {
			lesson.practice.forEach((pq, qi) => {
				if (!Array.isArray(pq.options) || pq.options.length !== 4) {
					lessonFailures.push(`practice[${qi}].options.length !== 4 (${pq.options?.length ?? 0})`);
				} else if (new Set(pq.options).size !== 4) {
					lessonFailures.push(`practice[${qi}].options are not 4 distinct values`);
				}
				if (!Number.isInteger(pq.correctIndex) || pq.correctIndex < 0 || pq.correctIndex > 3) {
					lessonFailures.push(`practice[${qi}].correctIndex invalid (${String(pq.correctIndex)})`);
				}
				if (
					!Array.isArray(pq.diagnosticFeedback) ||
					pq.diagnosticFeedback.length !== 4 ||
					pq.diagnosticFeedback.some((df) => typeof df !== 'string' || df.trim().length === 0)
				) {
					lessonFailures.push(`practice[${qi}] must have 4 non-empty diagnosticFeedback strings`);
				}
			});
		}

		const proseStrings: [string, unknown][] = [
			['titleAr', lesson.titleAr],
			['sequenceTitleAr', lesson.sequenceTitleAr],
			['discover.scenarioAr', lesson.discover?.scenarioAr],
			['summary.visualCaptionAr', lesson.summary?.visualCaptionAr],
			['summary.watchOutAr', lesson.summary?.watchOutAr]
		];
		(lesson.objectives || []).forEach((s, i) => proseStrings.push([`objectives[${i}]`, s]));
		(lesson.keywordsAr || []).forEach((s, i) => proseStrings.push([`keywordsAr[${i}]`, s]));
		(lesson.discover?.steps || []).forEach((st, i) => {
			proseStrings.push([`discover.steps[${i}].promptAr`, st.promptAr]);
			proseStrings.push([`discover.steps[${i}].hintAr`, st.hintAr]);
			proseStrings.push([`discover.steps[${i}].expectedInput`, st.expectedInput]);
			proseStrings.push([`discover.steps[${i}].revealAr`, st.revealAr]);
		});
		(lesson.summary?.rulesAr || []).forEach((s, i) => proseStrings.push([`summary.rulesAr[${i}]`, s]));
		(lesson.summary?.examples || []).forEach((ex, i) => {
			proseStrings.push([`summary.examples[${i}].problemAr`, ex.problemAr]);
			proseStrings.push([`summary.examples[${i}].solutionAr`, ex.solutionAr]);
		});
		(lesson.practice || []).forEach((pq, i) => {
			proseStrings.push([`practice[${i}].questionAr`, pq.questionAr]);
			proseStrings.push([`practice[${i}].explanationAr`, pq.explanationAr]);
			(pq.options || []).forEach((opt, oi) => proseStrings.push([`practice[${i}].options[${oi}]`, opt]));
			(pq.diagnosticFeedback || []).forEach((df, di) =>
				proseStrings.push([`practice[${i}].diagnosticFeedback[${di}]`, df])
			);
		});

		for (const [field, val] of proseStrings) {
			if (typeof val === 'string' && countUnescapedDollars(val) % 2 !== 0) {
				lessonFailures.push(`Unbalanced $ delimiter in ${field}: ${val.slice(0, 80)}`);
			}
			checkKatexRenderError(val, field, lessonFailures);
		}

		const serialized = JSON.stringify(lesson);
		if (EASTERN_DIGITS_RE.test(serialized)) {
			lessonFailures.push('Contains Eastern Arabic-Indic digits');
		}

		if (lessonFailures.length > 0) {
			failedLessons++;
			for (const reason of lessonFailures) {
				recordFailure({ check: 'lessons', target, reason });
			}
		}
	}

	for (const g of GRADES) {
		if ((byGrade[g] || 0) !== 21) {
			recordFailure({
				check: 'lessons',
				target: `grade:${g}`,
				reason: `Expected 21 lessons for ${g}, found ${byGrade[g] || 0}`
			});
		}
		for (const t of TRIMESTERS) {
			const c = byGradeTrim.get(`${g}:${t}`) || 0;
			if (c !== 7) {
				recordFailure({
					check: 'lessons',
					target: `${g}:${t}`,
					reason: `Expected 7 lessons for (${g}, ${t}), found ${c}`
				});
			}
		}
	}

	return {
		total: ALL_LESSONS.length,
		byGrade,
		passed: ALL_LESSONS.length - failedLessons,
		failed: failedLessons
	};
}

function validateTemplateMetadata(): { total: number; byGrade: Record<string, number> } {
	const byGrade: Record<string, number> = { '2ap': 0, '5ap': 0, '2am': 0 };
	const byGroup = new Map<string, { total: number; integration: number; nonIntegration: number }>();
	const seenIds = new Set<string>();

	if (ALL_TEMPLATES.length !== 54) {
		recordFailure({
			check: 'templates_meta',
			target: 'ALL_TEMPLATES',
			reason: `Expected 54 templates, found ${ALL_TEMPLATES.length}`
		});
	}

	for (const tpl of ALL_TEMPLATES as ParameterizedTemplate[]) {
		if (!tpl.id || seenIds.has(tpl.id)) {
			recordFailure({
				check: 'templates_meta',
				target: tpl?.id || '<unknown>',
				reason: `Missing or duplicate template id: ${tpl?.id}`
			});
		} else {
			seenIds.add(tpl.id);
		}

		byGrade[tpl.grade] = (byGrade[tpl.grade] || 0) + 1;
		const key = `${tpl.grade}:${tpl.trimesterId}`;
		const grp = byGroup.get(key) || { total: 0, integration: 0, nonIntegration: 0 };
		grp.total++;
		if (tpl.isIntegration === true) {
			grp.integration++;
		} else {
			grp.nonIntegration++;
		}
		byGroup.set(key, grp);
	}

	for (const g of GRADES) {
		if ((byGrade[g] || 0) !== 18) {
			recordFailure({
				check: 'templates_meta',
				target: `grade:${g}`,
				reason: `Expected 18 templates for ${g}, found ${byGrade[g] || 0}`
			});
		}
		for (const t of TRIMESTERS) {
			const grp = byGroup.get(`${g}:${t}`) || { total: 0, integration: 0, nonIntegration: 0 };
			if (grp.total !== 6) {
				recordFailure({
					check: 'templates_meta',
					target: `${g}:${t}`,
					reason: `Expected 6 templates for (${g}, ${t}), found ${grp.total}`
				});
			}
			if (grp.integration < 1) {
				recordFailure({
					check: 'templates_meta',
					target: `${g}:${t}`,
					reason: `Expected >= 1 integration template (isIntegration === true) for (${g}, ${t}), found ${grp.integration}`
				});
			}
			if (grp.nonIntegration < 4) {
				recordFailure({
					check: 'templates_meta',
					target: `${g}:${t}`,
					reason: `Expected >= 4 non-integration templates for (${g}, ${t}), found ${grp.nonIntegration}`
				});
			}
		}
	}

	return { total: ALL_TEMPLATES.length, byGrade };
}

function validateTemplatesSweep(): {
	totalRuns: number;
	passedRuns: number;
	failedRuns: number;
	failingTemplates: string[];
} {
	const failingTemplateSet = new Set<string>();
	let totalRuns = 0;
	let failedRuns = 0;

	for (const tpl of ALL_TEMPLATES as ParameterizedTemplate[]) {
		for (let seed = 1; seed <= 100; seed++) {
			totalRuns++;
			const difficulty = DIFFICULTIES[(seed - 1) % 3];
			const runIssues: string[] = [];

			let inst: GeneratedExerciseInstance;
			try {
				inst = tpl.generate(seed, difficulty);
			} catch (err) {
				failedRuns++;
				failingTemplateSet.add(tpl.id);
				recordFailure({
					check: 'templates_sweep',
					target: tpl.id,
					seed,
					difficulty,
					reason: `generate() threw: ${err instanceof Error ? err.message : String(err)}`
				});
				continue;
			}

			// 1. Key fields & serialization leaks
			const nonFiniteHit = findNonFiniteNumber(inst);
			if (nonFiniteHit) {
				runIssues.push(`Non-finite numeric value at ${nonFiniteHit}`);
			}

			const serialized = JSON.stringify(inst);
			if (serialized.includes('NaN')) runIssues.push('JSON contains "NaN"');
			if (serialized.includes('Infinity')) runIssues.push('JSON contains "Infinity"');
			if (serialized.includes('undefined')) runIssues.push('JSON contains "undefined"');
			if (EASTERN_DIGITS_RE.test(serialized)) {
				runIssues.push('JSON contains Eastern Arabic-Indic digits');
			}

			if (!inst.templateId || !inst.titleAr?.trim()) {
				runIssues.push('Missing templateId or titleAr');
			}
			if (
				!Array.isArray(inst.hints) ||
				inst.hints.length !== 3 ||
				inst.hints.some((h) => typeof h !== 'string' || h.trim().length === 0)
			) {
				runIssues.push('hints must have 3 non-empty trimmed strings');
			}
			if (
				!Array.isArray(inst.solutionStepsAr) ||
				inst.solutionStepsAr.length < 2 ||
				inst.solutionStepsAr.some((s) => typeof s !== 'string' || s.trim().length === 0)
			) {
				runIssues.push('solutionStepsAr must have >= 2 non-empty strings');
			}
			if (typeof inst.finalAnswer !== 'string' || inst.finalAnswer.trim().length === 0) {
				runIssues.push('finalAnswer must be a non-empty string');
			}

			// 2. QuizQuestion checks + grading engine verification
			const q = inst.quizQuestion;
			if (!q || typeof q !== 'object' || !q.questionText?.trim() || !q.explanation?.trim() || !q.questionData) {
				runIssues.push('quizQuestion missing required fields (questionText/explanation/questionData)');
			} else {
				if (q.type === 'mcq') {
					const opts: unknown[] = Array.isArray(q.questionData.options) ? q.questionData.options : [];
					const optTexts = opts.map(getOptionText);
					if (opts.length < 2) {
						runIssues.push(`mcq options.length < 2 (${opts.length})`);
					}
					if (optTexts.some((t) => t.trim().length === 0)) {
						runIssues.push('mcq contains empty option text');
					}
					if (new Set(optTexts).size !== opts.length) {
						runIssues.push(`mcq options are not unique: ${JSON.stringify(optTexts)}`);
					}
				}

				const { rightAns, wrongAns, error } = buildSyntheticAnswers(q);
				if (error) {
					runIssues.push(error);
				} else {
					const gradable = {
						id: seed,
						questionId: seed,
						type: q.type,
						points: tpl.defaultPoints || 1,
						questionData: q.questionData,
						explanation: q.explanation
					};
					const rightRes = gradeQuestion(gradable, rightAns);
					if (!rightRes.correct) {
						runIssues.push(
							`gradeQuestion(rightAns) returned false for type=${q.type}; rightAns=${JSON.stringify(rightAns)}, questionData=${JSON.stringify(q.questionData)}`
						);
					}
					const wrongRes = gradeQuestion(gradable, wrongAns);
					if (wrongRes.correct) {
						runIssues.push(
							`gradeQuestion(wrongAns) returned true for type=${q.type}; wrongAns=${JSON.stringify(wrongAns)}, questionData=${JSON.stringify(q.questionData)}`
						);
					}
				}

				if (q.imageUrl) {
					checkSvgAssetRef(q.imageUrl, 'quizQuestion.imageUrl', runIssues);
				}

				checkKatexRenderError(q.questionText, 'quizQuestion.questionText', runIssues);
				checkKatexRenderError(q.questionTextAr, 'quizQuestion.questionTextAr', runIssues);
				checkKatexRenderError(q.explanation, 'quizQuestion.explanation', runIssues);
				if (Array.isArray(q.questionData.options)) {
					q.questionData.options.forEach((opt: unknown, oi: number) =>
						checkKatexRenderError(getOptionText(opt), `quizQuestion.options[${oi}]`, runIssues)
					);
				}
				if (Array.isArray(q.questionData.items)) {
					q.questionData.items.forEach((it: unknown, ii: number) =>
						checkKatexRenderError(getOptionText(it), `quizQuestion.items[${ii}]`, runIssues)
					);
				}
				if (Array.isArray(q.questionData.pairs)) {
					q.questionData.pairs.forEach((pair: { left?: unknown; right?: unknown }, pi: number) => {
						checkKatexRenderError(pair?.left, `quizQuestion.pairs[${pi}].left`, runIssues);
						checkKatexRenderError(pair?.right, `quizQuestion.pairs[${pi}].right`, runIssues);
					});
				}
				inst.hints.forEach((h, hi) => checkKatexRenderError(h, `hints[${hi}]`, runIssues));
				inst.solutionStepsAr.forEach((st, si) =>
					checkKatexRenderError(st, `solutionStepsAr[${si}]`, runIssues)
				);
			}

			// 3. Recursive sujetExercise checks (Typst LaTeX leaks & SVG assets)
			const ex = inst.sujetExercise;
			if (!ex || typeof ex !== 'object' || !Array.isArray(ex.content) || ex.content.length === 0) {
				runIssues.push('sujetExercise missing or empty content array');
			} else {
				checkRawLatex(ex.instruction, 'sujetExercise.instruction', runIssues);
				ex.content.forEach((blk, idx) =>
					inspectContentBlock(blk, `sujetExercise.content[${idx}]`, runIssues)
				);
			}

			// 4. Pedagogical guardrails
			if (tpl.grade === '2ap') {
				const fieldsToCheck: [string, string][] = [
					['quizQuestion.questionText', q?.questionText ?? ''],
					['finalAnswer', inst.finalAnswer ?? ''],
					['sujetExercise.instruction', ex?.instruction ?? '']
				];
				for (const [label, txt] of fieldsToCheck) {
					const bigNum = check2apStandaloneLargeInteger(txt);
					if (bigNum) {
						runIssues.push(`2AP guardrail: integer >= 1000 ("${bigNum}") found in ${label}`);
					}
				}
				if (/^-\d/.test((inst.finalAnswer ?? '').trim())) {
					runIssues.push(`2AP guardrail: negative finalAnswer "${inst.finalAnswer}"`);
				}
			} else if (tpl.grade === '5ap') {
				if (/^-\d/.test((inst.finalAnswer ?? '').trim())) {
					runIssues.push(`5AP guardrail: negative finalAnswer "${inst.finalAnswer}"`);
				}
			}

			if (runIssues.length > 0) {
				failedRuns++;
				failingTemplateSet.add(tpl.id);
				for (const reason of runIssues) {
					recordFailure({
						check: 'templates_sweep',
						target: tpl.id,
						seed,
						difficulty,
						reason
					});
				}
			}
		}
	}

	return {
		totalRuns,
		passedRuns: totalRuns - failedRuns,
		failedRuns,
		failingTemplates: Array.from(failingTemplateSet)
	};
}

function validateDeterminism(): { checked: number; passed: number; failed: number } {
	let failed = 0;
	for (const tpl of ALL_TEMPLATES as ParameterizedTemplate[]) {
		try {
			const a = tpl.generate(42, 'medium');
			const b = tpl.generate(42, 'medium');
			if (JSON.stringify(a) !== JSON.stringify(b)) {
				failed++;
				recordFailure({
					check: 'determinism',
					target: tpl.id,
					seed: 42,
					difficulty: 'medium',
					reason: 'Non-deterministic output between consecutive calls to generate(42, "medium")'
				});
			}
		} catch (err) {
			failed++;
			recordFailure({
				check: 'determinism',
				target: tpl.id,
				seed: 42,
				difficulty: 'medium',
				reason: `generate(42, "medium") threw: ${err instanceof Error ? err.message : String(err)}`
			});
		}
	}
	return {
		checked: ALL_TEMPLATES.length,
		passed: ALL_TEMPLATES.length - failed,
		failed
	};
}

function main(): number {
	const initialSvgSnapshot = existsSync(SVG_DIR)
		? new Set<string>(readdirSync(SVG_DIR))
		: new Set<string>();

	let lessonsSummary: ReturnType<typeof validateLessons> | null = null;
	let templatesMeta: ReturnType<typeof validateTemplateMetadata> | null = null;
	let sweepSummary: ReturnType<typeof validateTemplatesSweep> | null = null;
	let determinismSummary: ReturnType<typeof validateDeterminism> | null = null;
	let deletedSvgCount = 0;
	let remainingSvgCount = initialSvgSnapshot.size;

	try {
		lessonsSummary = validateLessons();
		templatesMeta = validateTemplateMetadata();
		sweepSummary = validateTemplatesSweep();
		determinismSummary = validateDeterminism();
	} finally {
		if (existsSync(SVG_DIR)) {
			const afterEntries = readdirSync(SVG_DIR);
			for (const entry of afterEntries) {
				if (!initialSvgSnapshot.has(entry)) {
					unlinkSync(join(SVG_DIR, entry));
					deletedSvgCount++;
				}
			}
			remainingSvgCount = readdirSync(SVG_DIR).length;
		}
	}

	const countsByCheck: Record<string, number> = {};
	const failuresByTarget: Record<string, { check: string; count: number; sampleReasons: string[] }> = {};
	for (const f of allFailures) {
		countsByCheck[f.check] = (countsByCheck[f.check] || 0) + 1;
		const entry = failuresByTarget[f.target] ?? { check: f.check, count: 0, sampleReasons: [] };
		entry.count++;
		if (entry.sampleReasons.length < 5 && !entry.sampleReasons.includes(f.reason)) {
			entry.sampleReasons.push(f.reason);
		}
		failuresByTarget[f.target] = entry;
	}

	const report = {
		ok: allFailures.length === 0,
		lessons: lessonsSummary,
		templates: {
			...(templatesMeta ?? {}),
			...(sweepSummary ?? {})
		},
		determinism: determinismSummary,
		svgCleanup: {
			initialCount: initialSvgSnapshot.size,
			deletedCount: deletedSvgCount,
			remainingCount: remainingSvgCount
		},
		totalFailures: allFailures.length,
		failureCountsByCheck: countsByCheck,
		failuresByTarget,
		failuresSample: allFailures.slice(0, MAX_DIAGNOSTICS)
	};

	console.log(JSON.stringify(report, null, 2));
	return allFailures.length === 0 ? 0 : 1;
}

process.exit(main());
