import { Database } from 'bun:sqlite';
import { existsSync, readFileSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
import { createSession, SESSION_COOKIE_NAME } from '#lib/server/auth';
import { evaluateSafeFormula } from '#lib/server/quiz-grading';

const PORT = 4181;
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
				if (value) {
					this.cookies.set(name, value);
				} else {
					this.cookies.delete(name);
				}
			}
		}
	}

	get(name: string): string | undefined {
		return this.cookies.get(name);
	}

	header(): string {
		return Array.from(this.cookies.entries())
			.map(([k, v]) => `${k}=${v}`)
			.join('; ');
	}
}

async function httpReq(
	path: string,
	options: {
		method?: string;
		jar?: CookieJar;
		headers?: Record<string, string>;
		body?: BodyInit;
		redirect?: RequestRedirect;
	} = {}
) {
	const method = options.method || 'GET';
	const headers: Record<string, string> = {
		...(options.headers || {})
	};
	if (method !== 'GET' && method !== 'HEAD') {
		headers['Origin'] = BASE_URL;
	}
	const cookieHdr = options.jar?.header();
	if (cookieHdr) {
		headers['Cookie'] = headers['Cookie'] ? `${headers['Cookie']}; ${cookieHdr}` : cookieHdr;
	}

	const res = await fetch(`${BASE_URL}${path}`, {
		method,
		headers,
		body: options.body,
		redirect: options.redirect ?? 'manual'
	});

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
		} catch {
			// Stream closed on shutdown
		}
	})();
}

async function waitForServer(serverProc: Bun.Subprocess, getLogs: () => string, timeoutMs = 15000) {
	const start = Date.now();
	while (Date.now() - start < timeoutMs) {
		if (serverProc.exitCode !== null) {
			throw new Error(`Server exited prematurely with code ${serverProc.exitCode}.\n${getLogs()}`);
		}
		try {
			const r = await fetch(`${BASE_URL}/`);
			if (r.status === 200) return;
		} catch {
			// Server still starting
		}
		await Bun.sleep(200);
	}
	throw new Error(`Timed out waiting for built production server on ${BASE_URL}.\n${getLogs()}`);
}

function buildCorrectAnswer(type: string, rawQuestionData: unknown): Record<string, any> {
	const qd =
		typeof rawQuestionData === 'string'
			? JSON.parse(rawQuestionData)
			: ((rawQuestionData as Record<string, any>) ?? {});

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
			const order = Array.isArray(qd.correctOrder)
				? qd.correctOrder.map((idx: number) => items[idx])
				: items;
			return { order };
		}
		case 'drag_drop': {
			const categories: string[] = qd.categories || [];
			const assignments: Record<string, number> = {};
			for (const item of qd.items || []) {
				assignments[item.text] =
					typeof item.category === 'number' ? item.category : categories.indexOf(item.category);
			}
			return { assignments };
		}
		case 'matching': {
			const matches: Record<number, number> = {};
			const pairs = qd.pairs || [];
			for (let i = 0; i < pairs.length; i++) {
				matches[i] = i;
			}
			return { matches };
		}
		case 'fill_blank': {
			const accepted: string[] = qd.answers || qd.acceptedAnswers || [];
			return { text: String(accepted[0] ?? '') };
		}
		case 'short_answer': {
			const kws: string[] = qd.keywords || qd.acceptedKeywords || [];
			return { text: kws.join(' ') };
		}
		case 'cloze':
			return { selectedIndex: Number(qd.correctIndex) };
		case 'calculated': {
			if (qd.formula) {
				const vars: Record<string, number> = {};
				for (const v of qd.variables || []) {
					vars[v.name] = Number(v.min);
				}
				const value = evaluateSafeFormula(qd.formula, vars);
				return { value: value ?? 0, vars };
			}
			return { value: Number(qd.answer ?? 0) };
		}
		case 'matrix': {
			const answers: Record<number, number> = {};
			const stmts = qd.statements || [];
			const expected = qd.correctAnswers || [];
			for (let i = 0; i < stmts.length; i++) {
				answers[i] = Number(expected[i]);
			}
			return { answers };
		}
		default:
			throw new Error(`Unsupported question type in verifier: ${type}`);
	}
}

function assertPdfFileOnDisk(filePath: string, label: string) {
	assert.ok(existsSync(filePath), `${label} must exist on disk at ${filePath}`);
	const bytes = readFileSync(filePath);
	assert.ok(bytes.length > 500, `${label} must be non-empty (${bytes.length} bytes)`);
	const header = new TextDecoder().decode(bytes.subarray(0, 5));
	assert.equal(header, '%PDF-', `${label} must start with %PDF- magic header`);
}

async function main() {
	if (!existsSync(resolve('build/index.js'))) {
		throw new Error("build/index.js not found — run 'bun run build' before running verify-math-pipeline.ts");
	}

	const env = { ...process.env } as Record<string, string>;
	env.PORT = String(PORT);
	env.ORIGIN = BASE_URL;

	const serverProc = Bun.spawn(['bun', 'build/index.js'], {
		cwd: process.cwd(),
		env,
		stdout: 'pipe',
		stderr: 'pipe'
	});

	let serverLogs = '';
	drainStream(serverProc.stdout, (chunk) => {
		serverLogs += chunk;
	});
	drainStream(serverProc.stderr, (chunk) => {
		serverLogs += chunk;
	});

	let tempSessionId: string | undefined;
	let testFingerprint: string | undefined;
	const generatedPdfPaths: string[] = [];

	const contentDb = new Database('data/content.db');
	contentDb.exec('PRAGMA busy_timeout = 5000');
	const usersDb = new Database('data/users.db');
	usersDb.exec('PRAGMA busy_timeout = 5000; PRAGMA foreign_keys = ON');

	try {
		await waitForServer(serverProc, () => serverLogs);
		console.log('✅ Server booted on', BASE_URL);

		// 1. Visibility & Curriculum Routes
		{
			const rHome = await httpReq('/');
			assert.equal(rHome.status, 200, 'GET / must return 200');
			const homeHtml = await rHome.text();
			assert.ok(homeHtml.includes('/primaire'), 'Home page must contain /primaire link');
			assert.ok(homeHtml.includes('/moyen'), 'Home page must contain /moyen link');

			const rPrim = await httpReq('/primaire');
			assert.equal(rPrim.status, 200, 'GET /primaire must return 200');

			const r2ap = await httpReq('/primaire/2ap/mat-b');
			assert.equal(r2ap.status, 200, 'GET /primaire/2ap/mat-b must return 200');

			const r5ap = await httpReq('/primaire/5ap/mat-b');
			assert.equal(r5ap.status, 200, 'GET /primaire/5ap/mat-b must return 200');

			const r2am = await httpReq('/moyen/2am/mat-b');
			assert.equal(r2am.status, 200, 'GET /moyen/2am/mat-b must return 200');

			const rSec = await httpReq('/secondaire');
			assert.equal(rSec.status, 404, 'Hidden level GET /secondaire must return 404');
			console.log('✅ 1. Visibility & curriculum routes passed');
		}

		// 2. Interactive Lessons SSR Checks (1 published lesson per grade: 2ap, 5ap, 2am)
		{
			const lessonStmt = contentDb.query(`
				SELECT d.slug, d.title_ar as titleAr, y.slug as yearSlug, el.slug as levelSlug
				FROM documents d
				JOIN year_subjects ys ON d.year_subject_id = ys.id
				JOIN years y ON ys.year_id = y.id
				JOIN education_levels el ON y.level_id = el.id
				WHERE y.id = ? AND ys.subject_id = 'MAT-B' AND d.type = 'lesson' AND d.is_published = 1
				ORDER BY d.id ASC
				LIMIT 1
			`);

			for (const grade of ['2ap', '5ap', '2am'] as const) {
				const row = lessonStmt.get(grade) as {
					slug: string;
					titleAr: string;
					yearSlug: string;
					levelSlug: string;
				} | null;
				assert.ok(row, `Published lesson must exist in content.db for ${grade}`);

				const lessonUrl = `/${row.levelSlug}/${row.yearSlug}/mat-b/${row.slug}`;
				const rLesson = await httpReq(lessonUrl);
				assert.equal(rLesson.status, 200, `GET ${lessonUrl} must return 200`);
				const html = await rLesson.text();
				assert.ok(html.includes(row.titleAr), `${lessonUrl} must include lesson title "${row.titleAr}"`);
				assert.ok(html.includes('1. أكتشف'), `${lessonUrl} must include stage marker "1. أكتشف"`);
				assert.ok(html.includes('2. أفهم وأتذكر'), `${lessonUrl} must include stage marker "2. أفهم وأتذكر"`);
				assert.ok(html.includes('3. أتمرن الآن'), `${lessonUrl} must include stage marker "3. أتمرن الآن"`);
			}
			console.log('✅ 2. Interactive lessons SSR checks passed (2ap, 5ap, 2am)');
		}

		// 3. Quizzes Pages & Deterministic Server-Side Grading
		{
			const rQuizzesIndex = await httpReq('/quizzes');
			assert.equal(rQuizzesIndex.status, 200, 'GET /quizzes must return 200');

			const quizSlugs = [
				'2ap-math-t1-interactive-quiz',
				'5ap-math-t2-interactive-quiz',
				'2am-math-t3-interactive-quiz'
			];
			for (const slug of quizSlugs) {
				const rQuizPage = await httpReq(`/quizzes/${slug}`);
				assert.equal(rQuizPage.status, 200, `GET /quizzes/${slug} must return 200`);
			}

			const quizRow = contentDb
				.query("SELECT id FROM quizzes WHERE slug = '2ap-math-t1-interactive-quiz' LIMIT 1")
				.get() as { id: number } | null;
			assert.ok(quizRow, 'Quiz 2ap-math-t1-interactive-quiz must exist in content.db');

			const rawQuestions = contentDb
				.query(
					`
					SELECT qq.id, qq.question_id as questionId, qq.points, q.type, q.question_data as questionData
					FROM quiz_questions qq
					JOIN questions q ON qq.question_id = q.id
					WHERE qq.quiz_id = ?
					ORDER BY qq."order"
				`
				)
				.all(quizRow.id) as Array<{
				id: number;
				questionId: number;
				points: number;
				type: string;
				questionData: string;
			}>;
			assert.ok(rawQuestions.length > 1, 'Quiz must have linked questions');

			// Answer all except the last question correctly; omit the last to verify deterministic partial score
			const answers: Record<number, any> = {};
			let expectedScore = 0;
			let expectedTotal = 0;
			for (let i = 0; i < rawQuestions.length; i++) {
				const rq = rawQuestions[i];
				const pts = rq.points || 1;
				expectedTotal += pts;
				if (i < rawQuestions.length - 1) {
					answers[rq.id] = buildCorrectAnswer(rq.type, rq.questionData);
					expectedScore += pts;
				}
			}
			const expectedPct = Math.round((expectedScore / expectedTotal) * 100);

			const quizJar = new CookieJar();
			const rSubmit = await httpReq(`/api/quizzes/${quizRow.id}/submit`, {
				method: 'POST',
				jar: quizJar,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					score: 999,
					percentage: 100,
					timeTaken: 60,
					answers
				})
			});
			testFingerprint = quizJar.get('sujet_fp');
			assert.equal(rSubmit.status, 200, `POST /api/quizzes/${quizRow.id}/submit must return 200`);
			const submitJson = (await rSubmit.json()) as any;
			assert.equal(submitJson.success, true, 'Quiz submit must return success=true');
			assert.equal(
				submitJson.score,
				expectedScore,
				`Server must deterministically grade score=${expectedScore} ignoring spoofed 999`
			);
			assert.equal(submitJson.totalPoints, expectedTotal);
			assert.equal(submitJson.percentage, expectedPct);
			assert.equal(submitJson.gradedDetails?.length, rawQuestions.length);
			console.log('✅ 3. Quizzes routes & deterministic server grading passed');
		}

		// 4. Static Generated Sample PDFs
		{
			const samplePdfUrls = [
				'/documents/generated_samples/2ap/2ap-math-t1-exam-sample-1.pdf',
				'/documents/generated_samples/2ap/2ap-math-t1-exam-sample-1-sol.pdf',
				'/documents/generated_samples/5ap/5ap-math-t1-exam-sample-1.pdf',
				'/documents/generated_samples/5ap/5ap-math-t1-exam-sample-1-sol.pdf',
				'/documents/generated_samples/2am/2am-math-t1-exam-sample-1.pdf',
				'/documents/generated_samples/2am/2am-math-t1-exam-sample-1-sol.pdf'
			];

			for (const pdfUrl of samplePdfUrls) {
				const rPdf = await httpReq(pdfUrl);
				assert.equal(rPdf.status, 200, `GET ${pdfUrl} must return 200`);
				const bytes = new Uint8Array(await rPdf.arrayBuffer());
				const header = new TextDecoder().decode(bytes.slice(0, 5));
				assert.equal(header, '%PDF-', `${pdfUrl} must have valid %PDF- magic header`);
			}
			console.log('✅ 4. Static sample PDFs checks passed (2ap, 5ap, 2am + solutions)');
		}

		// 5. Smart Generator API (mode: 'quiz' & mode: 'pdf' across 2ap=586, 5ap=606, 2am=624)
		{
			const activeUser = usersDb
				.query('SELECT id FROM users WHERE is_active = 1 ORDER BY id ASC LIMIT 1')
				.get() as { id: number } | null;
			assert.ok(activeUser, 'An active user must exist in data/users.db to create a temporary session');

			const session = await createSession(activeUser.id);
			tempSessionId = session.id;
			const sessionCookie = `${SESSION_COOKIE_NAME}=${session.id}`;

			const quizCases = [
				{ grade: '2ap', yearSubjectId: 586 },
				{ grade: '5ap', yearSubjectId: 606 },
				{ grade: '2am', yearSubjectId: 624 }
			];

			for (const tc of quizCases) {
				const rGenQuiz = await httpReq('/api/generator', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Cookie: sessionCookie
					},
					body: JSON.stringify({ mode: 'quiz', yearSubjectId: tc.yearSubjectId, count: 4 })
				});
				assert.equal(
					rGenQuiz.status,
					200,
					`POST /api/generator (mode=quiz, ${tc.grade}/${tc.yearSubjectId}) must return 200`
				);
				const genQuizJson = (await rGenQuiz.json()) as any;
				assert.ok(
					Array.isArray(genQuizJson.questions) && genQuizJson.questions.length > 0,
					`Generated quiz for ${tc.grade} must contain questions`
				);
			}

			const pdfCases: Array<{
				grade: string;
				yearSubjectId: number;
				trimesterId: 't1' | 't2' | 't3';
				docType: 'test' | 'exam';
			}> = [
				{ grade: '2ap', yearSubjectId: 586, trimesterId: 't1', docType: 'exam' },
				{ grade: '5ap', yearSubjectId: 606, trimesterId: 't2', docType: 'exam' },
				{ grade: '2am', yearSubjectId: 624, trimesterId: 't1', docType: 'test' },
				{ grade: '2am', yearSubjectId: 624, trimesterId: 't3', docType: 'exam' }
			];

			for (const tc of pdfCases) {
				const rGenPdf = await httpReq('/api/generator', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Cookie: sessionCookie
					},
					body: JSON.stringify({
						mode: 'pdf',
						yearSubjectId: tc.yearSubjectId,
						trimesterId: tc.trimesterId,
						docType: tc.docType,
						exerciseCount: 2
					})
				});
				assert.equal(
					rGenPdf.status,
					200,
					`POST /api/generator (mode=pdf, ${tc.grade}/${tc.yearSubjectId}, ${tc.docType}) must return 200`
				);
				const genPdfJson = (await rGenPdf.json()) as any;
				assert.ok(
					typeof genPdfJson.pdfUrl === 'string' && genPdfJson.pdfUrl.startsWith('/uploads/sujet/gen-'),
					`Generator must return /uploads/sujet/gen-*.pdf URL for ${tc.grade} ${tc.docType}`
				);
				assert.ok(
					typeof genPdfJson.solutionUrl === 'string' &&
						genPdfJson.solutionUrl.startsWith('/uploads/sujet/gen-') &&
						genPdfJson.solutionUrl !== genPdfJson.pdfUrl,
					`Generator must return distinct compiled solution PDF URL for ${tc.grade} ${tc.docType}`
				);

				const pdfDiskPath = resolve('data/uploads/sujet', genPdfJson.pdfUrl.replace('/uploads/sujet/', ''));
				const solDiskPath = resolve(
					'data/uploads/sujet',
					genPdfJson.solutionUrl.replace('/uploads/sujet/', '')
				);
				generatedPdfPaths.push(pdfDiskPath, solDiskPath);

				assertPdfFileOnDisk(pdfDiskPath, `Generated subject PDF (${tc.grade} ${tc.docType})`);
				assertPdfFileOnDisk(solDiskPath, `Generated solution PDF (${tc.grade} ${tc.docType})`);
			}

			console.log('✅ 5. Smart Generator API (quiz + PDF compilation for 2ap, 5ap, 2am) passed');
		}
	} finally {
		serverProc.kill();
		await serverProc.exited.catch(() => {});

		if (tempSessionId) {
			usersDb.query('DELETE FROM sessions WHERE id = ?').run(tempSessionId);
		}

		if (testFingerprint) {
			usersDb
				.query(
					'DELETE FROM attempt_answers WHERE attempt_id IN (SELECT id FROM quiz_attempts WHERE user_id IS NULL AND fingerprint = ?)'
				)
				.run(testFingerprint);
			usersDb.query('DELETE FROM quiz_attempts WHERE user_id IS NULL AND fingerprint = ?').run(testFingerprint);
			usersDb.query('DELETE FROM user_points WHERE user_id IS NULL AND fingerprint = ?').run(testFingerprint);
			usersDb.query('DELETE FROM user_badges WHERE user_id IS NULL AND fingerprint = ?').run(testFingerprint);
			usersDb.query('DELETE FROM user_mistakes WHERE user_id IS NULL AND fingerprint = ?').run(testFingerprint);
		}

		for (const fp of generatedPdfPaths) {
			if (existsSync(fp)) unlinkSync(fp);
		}

		usersDb.close();
		contentDb.close();
		console.log('✅ Cleanup completed (server stopped, temp session & files removed)');
	}
}

main().catch((err) => {
	console.error('❌ Verification failed:', err);
	process.exit(1);
});
