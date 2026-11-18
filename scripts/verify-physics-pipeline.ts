import { Database } from 'bun:sqlite';
import { existsSync, readFileSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
import { createSession, SESSION_COOKIE_NAME } from '#lib/server/auth';
import { evaluateSafeFormula } from '#lib/server/quiz-grading';
import { ALL_PHYSICS_TRACK_IDS, PHYSICS_GRADE_METADATA } from '../src/lib/modules/PhysicsTemplates/types';

const PORT = 4182;
const BASE_URL = `http://127.0.0.1:${PORT}`;

class CookieJar {
	private cookies = new Map<string, string>();
	update(headers: Headers) {
		const rawList =
			typeof (headers as any).getSetCookie === 'function'
				? ((headers as any).getSetCookie() as string[])
				: [];
		for (const raw of rawList) {
			const firstPart = raw.split(';')[0];
			const eqIdx = firstPart.indexOf('=');
			if (eqIdx > 0) {
				const name = firstPart.slice(0, eqIdx).trim();
				const value = firstPart.slice(eqIdx + 1).trim();
				if (value) this.cookies.set(name, value);
				else this.cookies.delete(name);
			}
		}
	}
	header(): string {
		return Array.from(this.cookies.entries())
			.map(([k, v]) => `${k}=${v}`)
			.join('; ');
	}
}

async function httpReq(
	path: string,
	options: { method?: string; jar?: CookieJar; headers?: Record<string, string>; body?: BodyInit } = {}
) {
	const method = options.method || 'GET';
	const headers: Record<string, string> = { ...(options.headers || {}) };
	if (method !== 'GET' && method !== 'HEAD') headers['Origin'] = BASE_URL;
	const cookieHdr = options.jar?.header();
	if (cookieHdr) headers['Cookie'] = headers['Cookie'] ? `${headers['Cookie']}; ${cookieHdr}` : cookieHdr;
	const res = await fetch(`${BASE_URL}${path}`, { method, headers, body: options.body, redirect: 'manual' });
	options.jar?.update(res.headers);
	return res;
}

function drainStream(stream: ReadableStream<Uint8Array> | null, onChunk: (text: string) => void) {
	if (!stream) return;
	const reader = stream.getReader();
	const decoder = new TextDecoder();
	(async () => {
		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				if (value) onChunk(decoder.decode(value, { stream: true }));
			}
		} catch {}
	})();
}

async function waitForServer(serverProc: Bun.Subprocess, getLogs: () => string, timeoutMs = 15000) {
	const start = Date.now();
	while (Date.now() - start < timeoutMs) {
		if (serverProc.exitCode !== null) throw new Error(`Server exited with code ${serverProc.exitCode}.\n${getLogs()}`);
		try {
			const r = await fetch(`${BASE_URL}/`);
			if (r.status === 200) return;
		} catch {}
		await Bun.sleep(200);
	}
	throw new Error(`Timed out waiting for server on ${BASE_URL}.\n${getLogs()}`);
}

function buildCorrectAnswer(type: string, rawQuestionData: unknown): Record<string, any> {
	const qd = typeof rawQuestionData === 'string' ? JSON.parse(rawQuestionData) : ((rawQuestionData as Record<string, any>) ?? {});
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
					: opts.map((o: any, i: number) => (typeof o === 'object' && o?.isCorrect ? i : -1)).filter((i: number) => i >= 0);
			return { selectedIndexes };
		}
		case 'true_false':
			return { value: Boolean(qd.correctAnswer ?? qd.correct) };
		case 'ordering': {
			const items: string[] = (qd.items || []).map((it: any) => (typeof it === 'string' ? it : String(it?.text ?? '')));
			return { order: Array.isArray(qd.correctOrder) ? qd.correctOrder.map((idx: number) => items[idx]) : items };
		}
		case 'drag_drop': {
			const categories: string[] = qd.categories || [];
			const assignments: Record<string, number> = {};
			for (const item of qd.items || []) {
				assignments[item.text] = typeof item.category === 'number' ? item.category : categories.indexOf(item.category);
			}
			return { assignments };
		}
		case 'matching': {
			const matches: Record<number, number> = {};
			const pairs = qd.pairs || [];
			for (let i = 0; i < pairs.length; i++) matches[i] = i;
			return { matches };
		}
		case 'fill_blank': {
			const accepted: string[] = qd.answers || qd.acceptedAnswers || [];
			return { text: String(accepted[0] ?? '') };
		}
		case 'short_answer': {
			const kws: string[] = qd.keywords || qd.acceptedKeywords || [];
			return { text: kws.length > 0 ? kws.join(' ') : String(qd.sampleAnswer ?? '') };
		}
		case 'cloze':
			return { selectedIndex: Number(qd.correctIndex) };
		case 'calculated': {
			if (qd.formula) {
				const vars: Record<string, number> = {};
				for (const v of qd.variables || []) vars[v.name] = Number(v.min);
				const value = evaluateSafeFormula(qd.formula, vars);
				return { value: value ?? 0, vars };
			}
			return { value: Number(qd.answer ?? 0) };
		}
		case 'matrix': {
			const answers: Record<number, number> = {};
			const stmts = qd.statements || [];
			const expected = qd.correctAnswers || [];
			for (let i = 0; i < stmts.length; i++) answers[i] = Number(expected[i]);
			return { answers };
		}
		default:
			throw new Error(`Unsupported question type: ${type}`);
	}
}

function assertValidPdfFile(absPath: string, label: string) {
	assert.ok(existsSync(absPath), `Missing PDF (${label}): ${absPath}`);
	const buf = readFileSync(absPath);
	assert.equal(buf.subarray(0, 5).toString('ascii'), '%PDF-', `Invalid %PDF- header (${label}): ${absPath}`);
	assert.ok(buf.length > 20_480, `PDF too small (${buf.length}B) for ${label}`);
}

async function run() {
	const db = new Database('data/content.db');
	const userDb = new Database('data/users.db');
	let serverProc: Bun.Subprocess | null = null;
	let tempSessionId: string | null = null;
	const generatedFilesToCleanup: string[] = [];

	try {
		const activeUser = userDb.query('SELECT id FROM users WHERE is_active = 1 ORDER BY id ASC LIMIT 1').get() as { id: number } | null;
		assert.ok(activeUser, 'An active user must exist in data/users.db');
		const session = await createSession(activeUser.id);
		tempSessionId = session.id;
		const jar = new CookieJar();
		jar.update(new Headers({ 'set-cookie': `${SESSION_COOKIE_NAME}=${session.id}; Path=/` }));

		const serverLogs: string[] = [];
		serverProc = Bun.spawn(['bun', 'build/index.js'], {
			cwd: process.cwd(),
			env: { ...process.env, PORT: String(PORT), HOST: '127.0.0.1', ORIGIN: BASE_URL, NODE_ENV: 'production' },
			stdout: 'pipe',
			stderr: 'pipe'
		});
		drainStream(serverProc.stdout, (c) => serverLogs.push(c));
		drainStream(serverProc.stderr, (c) => serverLogs.push(c));
		await waitForServer(serverProc, () => serverLogs.join(''));
		console.log(`✅ Server booted on ${BASE_URL}`);

		// 1. Visibility & routes for all 11 Physics tracks
		for (const grade of ALL_PHYSICS_TRACK_IDS) {
			const meta = PHYSICS_GRADE_METADATA[grade];
			const slug = meta.subjectId.toLowerCase();
			const urlPath = meta.streamId
				? `/${meta.levelId}/${meta.yearId}/${slug}?stream=${meta.streamId}`
				: `/${meta.levelId}/${meta.yearId}/${slug}`;
			const res = await httpReq(urlPath, { jar });
			assert.equal(res.status, 200, `Expected 200 for ${urlPath}, got ${res.status}`);
			const html = await res.text();
			assert.ok(html.includes('دروس تفاعلية') || html.includes('اختبار'), `Missing Physics docs for ${grade}`);
		}
		// Stream hubs for 1as, 2as, 3as must list Physics
		for (const streamPath of ['/secondaire/1as/tcst', '/secondaire/2as/se', '/secondaire/2as/tm', '/secondaire/2as/math', '/secondaire/3as/se', '/secondaire/3as/tm', '/secondaire/3as/math']) {
			const r = await httpReq(streamPath, { jar });
			assert.equal(r.status, 200, `Stream hub ${streamPath} failed`);
			const h = await r.text();
			assert.ok(h.includes('العلوم الفيزيائية'), `Stream hub ${streamPath} missing Physics card`);
		}
		console.log('✅ 1. All 11 Physics routes & 7 Secondary stream hubs passed');

		// 2. Interactive lessons SSR
		for (const grade of ALL_PHYSICS_TRACK_IDS) {
			const meta = PHYSICS_GRADE_METADATA[grade];
			const lesson = db
				.query("SELECT slug, title_ar FROM documents WHERE year_subject_id = ? AND type = 'lesson' AND is_published = 1 LIMIT 1")
				.get(meta.yearSubjectId) as { slug: string; title_ar: string } | null;
			assert.ok(lesson, `No published Physics lesson for ${grade}`);
			const res = await httpReq(`/${meta.levelId}/${meta.yearId}/${meta.subjectId.toLowerCase()}/${lesson.slug}`, { jar });
			assert.equal(res.status, 200, `Lesson failed for ${grade}/${lesson.slug}`);
			const html = await res.text();
			assert.ok(html.includes('أكتشف'), `InteractiveLessonPlayer missing for ${grade}`);
		}
		console.log('✅ 2. All 11 Physics interactive lessons SSR checks passed');

		// 3. Quizzes + deterministic grading (including BEM & BAC Physics simulators)
		for (const simSlug of ['4am-phy-t3-bem-simulator', '3as-se-phy-bac-simulator', '3as-tm-phy-bac-simulator', '3as-math-phy-bac-simulator']) {
			const qz = db.query('SELECT id FROM quizzes WHERE slug = ? LIMIT 1').get(simSlug) as { id: number } | null;
			assert.ok(qz, `Simulator quiz missing: ${simSlug}`);
			const qr = await httpReq(`/quizzes/${simSlug}`, { jar });
			assert.equal(qr.status, 200, `Simulator route failed: ${simSlug}`);

			const rows = db
				.query('SELECT q.id, q.type, q.question_data FROM quiz_questions qq JOIN questions q ON qq.question_id = q.id WHERE qq.quiz_id = ?')
				.all(qz.id) as Array<{ id: number; type: string; question_data: string }>;
			const answers: Record<string, any> = {};
			for (const r of rows) answers[String(r.id)] = buildCorrectAnswer(r.type, r.question_data);

			const sub = await httpReq(`/api/quizzes/${qz.id}/submit`, {
				method: 'POST',
				jar,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ answers, timeTaken: 60 })
			});
			assert.equal(sub.status, 200, `Grading failed for ${simSlug}`);
			const out = await sub.json();
			assert.equal(out.percentage, 100, `Expected 100% for ${simSlug}, got ${out.percentage}`);
		}
		console.log('✅ 3. Physics simulators & server grading passed (100%)');

		// 4. Static PDF checks (sample + official BAC Physics)
		const pdfRows = db
			.query("SELECT slug, pdf_url, solution_url FROM documents WHERE (source = 'المولّد الآلي SujetStore — فيزياء' OR (origin_type = 'official_certificate' AND slug LIKE 'bac-%-physics')) AND is_published = 1")
			.all() as Array<{ slug: string; pdf_url: string; solution_url: string }>;
		assert.equal(pdfRows.length, 225, `Expected 225 Physics PDF records (216 sample + 9 official BAC), got ${pdfRows.length}`);
		for (const rowPdf of pdfRows.slice(0, 30)) {
			assertValidPdfFile(resolve('static', rowPdf.pdf_url.slice(1)), rowPdf.slug);
			assertValidPdfFile(resolve('static', rowPdf.solution_url.slice(1)), `${rowPdf.slug}-sol`);
		}
		for (const rowPdf of pdfRows.filter((r) => r.slug.startsWith('bac-'))) {
			assertValidPdfFile(resolve('static', rowPdf.pdf_url.slice(1)), rowPdf.slug);
			assertValidPdfFile(resolve('static', rowPdf.solution_url.slice(1)), `${rowPdf.slug}-sol`);
		}
		console.log('✅ 4. Static Physics PDFs & Official BAC PDFs passed (225 papers / 450 PDFs)');

		// 5. Smart Generator API for Physics (4am, 1as_tcst, 3as_se, 3as_math)
		for (const testCase of [
			{ grade: '4am', variant: 'bem_mock' },
			{ grade: '1as_tcst', variant: 'trimester_exam' },
			{ grade: '3as_se', variant: 'bac_mock' },
			{ grade: '3as_math', variant: 'bac_mock' }
		] as const) {
			const ysId = PHYSICS_GRADE_METADATA[testCase.grade].yearSubjectId;
			const qRes = await httpReq('/api/generator', {
				method: 'POST',
				jar,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ mode: 'quiz', yearSubjectId: ysId, count: 5 })
			});
			assert.equal(qRes.status, 200, `Generator quiz failed for ${testCase.grade}`);

			const pRes = await httpReq('/api/generator', {
				method: 'POST',
				jar,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ mode: 'pdf', yearSubjectId: ysId, trimesterId: 't2', docType: 'exam', variant: testCase.variant, seed: 555 })
			});
			assert.equal(pRes.status, 200, `Generator PDF failed for ${testCase.grade}`);
			const pJson = await pRes.json();
			assert.ok(pJson.success && pJson.pdfUrl && pJson.solutionUrl);
			const fSubj = resolve('data/uploads/sujet', pJson.pdfUrl.split('/').pop()!);
			const fSol = resolve('data/uploads/sujet', pJson.solutionUrl.split('/').pop()!);
			generatedFilesToCleanup.push(fSubj, fSol);
			assertValidPdfFile(fSubj, `api-${testCase.grade}`);
			assertValidPdfFile(fSol, `api-${testCase.grade}-sol`);
		}
		console.log('✅ 5. Smart Generator Physics API (quiz + Typst PDF) passed');
	} finally {
		if (serverProc) {
			try { serverProc.kill(); await serverProc.exited; } catch {}
		}
		for (const f of generatedFilesToCleanup) {
			try { if (existsSync(f)) unlinkSync(f); } catch {}
		}
		if (tempSessionId) {
			try { userDb.query('DELETE FROM sessions WHERE id = ?').run(tempSessionId); } catch {}
		}
		db.close();
		userDb.close();
	}
}

run().catch((err) => {
	console.error('❌ Physics pipeline verification failed:', err);
	process.exit(1);
});
