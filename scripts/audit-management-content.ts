import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { ALL_OFFICIAL_BAC_MANAGEMENT_PAPERS } from '../src/lib/data/official_bac_management';
import {
	ALL_MANAGEMENT_LESSONS,
	ALL_MANAGEMENT_TEMPLATES,
	MANAGEMENT_CONTENT_BLOCKLIST
} from '../src/lib/modules/ManagementTemplates';
import { getMediaRoot } from '../src/lib/server/storage';

const MEDIA_ROOT = getMediaRoot();

interface Violation {
	scope: string;
	reason: string;
}

const violations: Violation[] = [];

function checkString(val: unknown, scope: string) {
	if (typeof val !== 'string') return;
	for (const rule of MANAGEMENT_CONTENT_BLOCKLIST) {
		if (rule.pattern.test(val)) {
			violations.push({ scope, reason: `${rule.reason} -> "${val.slice(0, 80)}"` });
		}
	}
}

function scanDeep(obj: unknown, scope: string) {
	if (typeof obj === 'string') {
		checkString(obj, scope);
		return;
	}
	if (Array.isArray(obj)) {
		for (let i = 0; i < obj.length; i++) scanDeep(obj[i], `${scope}[${i}]`);
		return;
	}
	if (obj && typeof obj === 'object') {
		const rec = obj as Record<string, unknown>;
		if (rec.type === 'illustrated_figure' && Array.isArray(rec.pins) && rec.pins.length > 0) {
			violations.push({
				scope,
				reason: `Forbidden overlay pins (${rec.pins.length}) on illustrated_figure`
			});
		}
		if (typeof rec.src === 'string' && rec.src.startsWith('/documents/illustrations/')) {
			const rel = rec.src.split('#')[0].replace(/^\/+/, '');
			if (!existsSync(join(MEDIA_ROOT, rel))) {
				violations.push({ scope, reason: `Missing media file on disk: ${rel}` });
			}
		}
		for (const [k, v] of Object.entries(rec)) {
			scanDeep(v, `${scope}.${k}`);
		}
	}
}

const lessonIds = new Set<string>();
const lessonSlugs = new Set<string>();

for (const lesson of ALL_MANAGEMENT_LESSONS) {
	if (lessonIds.has(lesson.id)) {
		violations.push({ scope: lesson.id, reason: 'Duplicate lesson id' });
	}
	lessonIds.add(lesson.id);
	if (lessonSlugs.has(lesson.slug)) {
		violations.push({ scope: lesson.slug, reason: 'Duplicate lesson slug' });
	}
	lessonSlugs.add(lesson.slug);
	scanDeep(lesson, `lesson:${lesson.id}`);
}

const templateIds = new Set<string>();
for (const tpl of ALL_MANAGEMENT_TEMPLATES) {
	if (templateIds.has(tpl.id)) {
		violations.push({ scope: tpl.id, reason: 'Duplicate template id' });
	}
	templateIds.add(tpl.id);
	if (tpl.curriculumLessonId && !lessonIds.has(tpl.curriculumLessonId)) {
		violations.push({
			scope: tpl.id,
			reason: `Missing curriculumLessonId ${tpl.curriculumLessonId}`
		});
	}
	for (const seed of [101, 202, 303]) {
		for (const diff of ['easy', 'medium', 'hard'] as const) {
			const inst = tpl.generate(seed, diff);
			scanDeep(inst, `tpl:${tpl.id}:s${seed}:${diff}`);
		}
	}
}

for (const bac of ALL_OFFICIAL_BAC_MANAGEMENT_PAPERS) {
	const exercises = bac.examDoc.exercises ?? [];
	if (exercises.length !== 3) {
		violations.push({ scope: bac.slug, reason: `Expected 3 parts, found ${exercises.length}` });
	}
	const pts = exercises.reduce((s, e) => s + Number(e.points), 0);
	if (Math.abs(pts - 20) > 1e-6) {
		violations.push({ scope: bac.slug, reason: `Total points ${pts} != 20` });
	}
	scanDeep(bac.examDoc, `bac:${bac.slug}`);
}

console.log(
	JSON.stringify(
		{
			lessons: ALL_MANAGEMENT_LESSONS.length,
			templates: ALL_MANAGEMENT_TEMPLATES.length,
			officialBacPapers: ALL_OFFICIAL_BAC_MANAGEMENT_PAPERS.length,
			violationCount: violations.length,
			violations: violations.slice(0, 20)
		},
		null,
		2
	)
);

if (violations.length > 0) process.exit(1);
