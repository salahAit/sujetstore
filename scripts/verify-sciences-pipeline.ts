import { Database } from 'bun:sqlite';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';
import { randomUUID } from 'node:crypto';
import { createSession, SESSION_COOKIE_NAME } from '../src/lib/server/auth';
import {
	ALL_SCIENCES_TRACK_IDS,
	SCIENCES_GRADE_METADATA
} from '../src/lib/modules/SciencesTemplates/types';

const PORT = 4183;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const CONTENT_DB = resolve('data/content.db');
const USERS_DB = resolve('data/users.db');

class CookieJar {
	private map = new Map<string, string>();
	setFromHeaders(headers: Headers) {
		const raw =
			typeof (headers as any).getSetCookie === 'function'
				? ((headers as any).getSetCookie() as string[])
				: headers.get('set-cookie')
					? [headers.get('set-cookie')!]
					: [];
		for (const item of raw) {
			const [pair] = item.split(';');
			const eq = pair.indexOf('=');
			if (eq > 0) this.map.set(pair.slice(0, eq).trim(), pair.slice(eq + 1).trim());
		}
	}
	header(): string {
		return [...this.map.entries()].map(([k, v]) => `${k}=${v}`).join('; ');
	}
}

async function httpReq(
	path: string,
	opts: { method?: string; body?: unknown; jar?: CookieJar } = {}
): Promise<Response> {
	const headers: Record<string, string> = {};
	if (opts.jar?.header()) headers.cookie = opts.jar.header();
	if (opts.body !== undefined) headers['content-type'] = 'application/json';
	const res = await fetch(`${BASE_URL}${path}`, {
		method: opts.method ?? 'GET',
		headers,
		body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
		redirect: 'manual'
	});
	opts.jar?.setFromHeaders(res.headers);
	return res;
}

async function waitForServer(timeoutMs = 15000): Promise<void> {
	const start = Date.now();
	while (Date.now() - start < timeoutMs) {
		try {
			const r = await fetch(`${BASE_URL}/`);
			if (r.status === 200) return;
		} catch {}
		await new Promise((r) => setTimeout(r, 250));
	}
	throw new Error(`Server did not boot on ${BASE_URL} within ${timeoutMs}ms`);
}

function deriveCorrectAnswer(type: string, qd: any): Record<string, any> {
	switch (type) {
		case 'mcq': {
			const opts = Array.isArray(qd.options) ? qd.options : [];
			const explicit =
				qd.correctIndexes ??
				qd.correctIndices ??
				(qd.correctIndex !== undefined && qd.correctIndex !== null ? [Number(qd.correctIndex)] : undefined);
			const selectedIndexes =
				Array.isArray(explicit) && explicit.length > 0
					? explicit.map(Number)
					: opts
							.map((o: any, i: number) => (typeof o === 'object' && o?.isCorrect ? i : -1))
							.filter((i: number) => i >= 0);
			return { selectedIndexes };
		}
		case 'true_false':
			return { value: Boolean(qd.correctAnswer ?? qd.correct) };
		case 'ordering': {
			const items: string[] = (qd.items || []).map((it: any) =>
				typeof it === 'string' ? it : String(it?.text ?? '')
			);
			return {
				order: Array.isArray(qd.correctOrder) ? qd.correctOrder.map((idx: number) => items[idx]) : items
			};
		}
		case 'matching': {
			const matches: Record<number, number> = {};
			const pairs = qd.pairs || [];
			for (let i = 0; i < pairs.length; i++) matches[i] = i;
			return { matches };
		}
		case 'fill_blank': {
			const accepted: string[] = qd.answers || qd.acceptedAnswers || [];
			if (accepted.length > 0) return { text: String(accepted[0]) };
			if (Array.isArray(qd.blanks) && qd.blanks.length > 0) {
				return { text: String(qd.blanks[0]?.acceptedAnswers?.[0] ?? qd.blanks[0]?.answer ?? '') };
			}
			return { text: '' };
		}
		case 'calculated':
			return { value: Number(qd.answer ?? 0) };
		default:
			return {};
	}
}

function assertValidPdfFile(absPath: string, label: string) {
	assert.ok(existsSync(absPath), `Missing PDF (${label}): ${absPath}`);
	const buf = readFileSync(absPath);
	assert.equal(buf.subarray(0, 5).toString('ascii'), '%PDF-', `Invalid %PDF- header (${label}): ${absPath}`);
	assert.ok(buf.length > 15_000, `PDF too small (${buf.length}B) for ${label}`);
}

async function main() {
	const proc = Bun.spawn(['bun', 'build/index.js'], {
		env: { ...process.env, PORT: String(PORT), HOST: '127.0.0.1' },
		stdout: 'pipe',
		stderr: 'pipe'
	});

	const usersDb = new Database(USERS_DB);
	const db = new Database(CONTENT_DB, { readonly: true });
	let tempSessionId = `verify-sci-${randomUUID()}`;
	const tempUploadFiles: string[] = [];

	try {
		await waitForServer();
		console.log(`✅ Server booted on ${BASE_URL}`);

		const activeUser = usersDb.query('SELECT id FROM users WHERE is_active = 1 ORDER BY id ASC LIMIT 1').get() as { id: number } | null;
		assert.ok(activeUser, 'An active user must exist in data/users.db');
		const session = await createSession(activeUser.id);
		tempSessionId = session.id;

		const jar = new CookieJar();
		jar.setFromHeaders(new Headers({ 'set-cookie': `${SESSION_COOKIE_NAME}=${session.id}; Path=/` }));

		// 1. All 14 Natural Sciences Track Routes + Secondary Stream Hubs
		for (const grade of ALL_SCIENCES_TRACK_IDS) {
			const meta = SCIENCES_GRADE_METADATA[grade];
			const subjSlug = meta.subjectId.toLowerCase();
			const urlPath =
				meta.levelId === 'primaire'
					? `/primaire/${meta.yearId}/${subjSlug}`
					: meta.levelId === 'moyen'
						? `/moyen/${meta.yearId}/${subjSlug}`
						: `/secondaire/${meta.yearId}/${subjSlug}?stream=${meta.streamId!.toLowerCase()}`;
			const res = await httpReq(urlPath, { jar });
			assert.equal(res.status, 200, `Expected 200 for ${urlPath}, got ${res.status}`);
			const html = await res.text();
			assert.ok(html.includes('دروس تفاعلية') || html.includes('اختبار'), `Missing Sciences docs for ${grade}`);
			if (meta.levelId === 'primaire') {
				assert.ok(html.includes('التربية العلمية والتكنولوجية'), `Primary ${grade} should display التربية العلمية والتكنولوجية`);
			}
		}

		for (const streamPath of ['/secondaire/1as/tcst', '/secondaire/2as/se', '/secondaire/2as/math', '/secondaire/3as/se', '/secondaire/3as/math']) {
			const r = await httpReq(streamPath, { jar });
			assert.equal(r.status, 200, `Stream hub ${streamPath} failed`);
			const h = await r.text();
			assert.ok(h.includes('العلوم الطبيعية') || h.includes('علوم الطبيعة'), `Stream hub ${streamPath} missing Natural Sciences card`);
		}
		console.log('✅ 1. All 14 Natural Sciences routes (5 Primary + 4 Middle + 5 Secondary) & stream hubs passed');

		// 2. Interactive Lessons SSR
		for (const grade of ALL_SCIENCES_TRACK_IDS) {
			const meta = SCIENCES_GRADE_METADATA[grade];
			const lesson = db
				.query("SELECT slug, title_ar FROM documents WHERE year_subject_id = ? AND type = 'lesson' AND is_published = 1 LIMIT 1")
				.get(meta.yearSubjectId) as { slug: string; title_ar: string } | null;
			assert.ok(lesson, `No published Sciences lesson for ${grade}`);
			const res = await httpReq(`/${meta.levelId}/${meta.yearId}/${meta.subjectId.toLowerCase()}/${lesson.slug}`, { jar });
			assert.equal(res.status, 200, `Lesson failed for ${grade}/${lesson.slug}`);
			const html = await res.text();
			assert.ok(html.includes('أكتشف'), `InteractiveLessonPlayer missing for ${grade}`);
		}
		console.log('✅ 2. All 14 Natural Sciences interactive lessons SSR checks passed');

		// 3. Quiz Simulators & Deterministic Server Grading
		for (const slug of [
			'5ap-sci-t3-competency-simulator',
			'4am-sci-t3-bem-simulator',
			'3as-se-sci-bac-simulator',
			'3as-math-sci-bac-simulator'
		]) {
			const qz = db.query('SELECT id FROM quizzes WHERE slug = ?').get(slug) as { id: number } | null;
			assert.ok(qz, `Simulator quiz missing: ${slug}`);
			const pageRes = await httpReq(`/quizzes/${slug}`, { jar });
			assert.equal(pageRes.status, 200, `Quiz page failed for ${slug}`);

			const qs = db
				.query(
					`SELECT q.id, q.type, q.question_data, qq.points
					 FROM quiz_questions qq JOIN questions q ON q.id = qq.question_id
					 WHERE qq.quiz_id = ? ORDER BY qq."order"`
				)
				.all(qz.id) as Array<{ id: number; type: string; question_data: string; points: number }>;
			assert.ok(qs.length >= 10, `Expected >= 10 questions for ${slug}, got ${qs.length}`);

			const answers: Record<string, unknown> = {};
			for (const q of qs) answers[String(q.id)] = deriveCorrectAnswer(q.type, JSON.parse(q.question_data));

			const gradeRes = await httpReq(`/api/quizzes/${qz.id}/submit`, {
				method: 'POST',
				jar,
				body: { answers, timeSpent: 120 }
			});
			assert.equal(gradeRes.status, 200, `Grading failed for ${slug}`);
			const graded = (await gradeRes.json()) as any;
			assert.equal(graded.percentage, 100, `Expected 100% deterministic score on ${slug}, got ${graded.percentage}%`);
		}
		console.log('✅ 3. Natural Sciences simulators & server grading passed (100%)');

		// 4. Static Generated Sample PDFs & Official BAC Sciences PDFs
		const genManifest = JSON.parse(
			readFileSync(resolve('pipeline/generated_exams_sciences/generated_sciences_manifest.json'), 'utf-8')
		) as { items: Array<{ slug: string; pdfUrl: string; solutionUrl: string }> };
		const bacManifest = JSON.parse(
			readFileSync(resolve('pipeline/official_bac_sciences/official_bac_sciences_manifest.json'), 'utf-8')
		) as { items: Array<{ slug: string; pdfUrl: string; solutionUrl: string }> };

		assert.ok(genManifest.items.length >= 260, `Expected >= 260 generated Sciences papers, got ${genManifest.items.length}`);
		assert.equal(bacManifest.items.length, 6, `Expected 6 Official BAC Sciences papers, got ${bacManifest.items.length}`);

		for (const item of [...genManifest.items, ...bacManifest.items]) {
			assertValidPdfFile(resolve('static', item.pdfUrl.replace(/^\//, '')), `${item.slug} subject`);
			assertValidPdfFile(resolve('static', item.solutionUrl.replace(/^\//, '')), `${item.slug} solution`);
		}
		console.log(`✅ 4. Static Sciences PDFs & Official BAC PDFs passed (${genManifest.items.length + bacManifest.items.length} papers / ${(genManifest.items.length + bacManifest.items.length) * 2} PDFs)`);

		// 5. Smart Generator API (Quiz + PDF for 1ap, 4am BEM, 3as_se BAC, 3as_math BAC)
		for (const testCase of [
			{ grade: '1ap' as const, trimesterId: 't1', variant: 'trimester_exam' },
			{ grade: '5ap' as const, trimesterId: 't3', variant: 'competency_eval' },
			{ grade: '4am' as const, trimesterId: 't3', variant: 'bem_mock' },
			{ grade: '3as_se' as const, trimesterId: 't1', variant: 'bac_mock' },
			{ grade: '3as_math' as const, trimesterId: 't2', variant: 'bac_mock' }
		]) {
			const ysId = SCIENCES_GRADE_METADATA[testCase.grade].yearSubjectId;
			const qRes = await httpReq('/api/generator', {
				method: 'POST',
				jar,
				body: { mode: 'quiz', yearSubjectId: ysId, difficulty: 'all', count: 4 }
			});
			assert.equal(qRes.status, 200, `Generator quiz failed for ${testCase.grade}`);
			const qData = (await qRes.json()) as any;
			assert.ok(Array.isArray(qData.questions) && qData.questions.length === 4);

			const pRes = await httpReq('/api/generator', {
				method: 'POST',
				jar,
				body: {
					mode: 'pdf',
					yearSubjectId: ysId,
					trimesterId: testCase.trimesterId,
					docType: 'exam',
					variant: testCase.variant,
					difficulty: 'medium',
					seed: 8888
				}
			});
			assert.equal(pRes.status, 200, `Generator PDF failed for ${testCase.grade}`);
			const pData = (await pRes.json()) as any;
			assert.equal(pData.success, true);
			const subAbs = resolve('data', pData.pdfUrl.replace(/^\//, ''));
			const solAbs = resolve('data', pData.solutionUrl.replace(/^\//, ''));
			assertValidPdfFile(subAbs, `gen ${testCase.grade} sub`);
			assertValidPdfFile(solAbs, `gen ${testCase.grade} sol`);
			tempUploadFiles.push(subAbs, solAbs);
		}
		console.log('✅ 5. Smart Generator Natural Sciences API (quiz + Typst PDF) passed');
	} finally {
		try {
			usersDb.query('DELETE FROM sessions WHERE id = ?').run(tempSessionId);
		} catch {}
		for (const f of tempUploadFiles) {
			try {
				if (existsSync(f)) unlinkSync(f);
			} catch {}
		}
		usersDb.close();
		db.close();
		proc.kill();
	}
}

main().catch((err) => {
	console.error('❌ Natural Sciences Pipeline Verification FAILED:', err);
	process.exit(1);
});
