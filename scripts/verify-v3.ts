import { Database } from 'bun:sqlite';
import { existsSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
import { createSession } from '#lib/server/auth';

const PORT = 4179;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const TEST_EMAIL = 'verify-student@sujetstore.local';

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
		headers['Cookie'] = cookieHdr;
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

async function waitForServer(timeoutMs = 15000) {
	const start = Date.now();
	while (Date.now() - start < timeoutMs) {
		try {
			const r = await fetch(`${BASE_URL}/`);
			if (r.status === 200) return;
		} catch {
			// Server still starting
		}
		await Bun.sleep(200);
	}
	throw new Error('Timed out waiting for built production server to respond on ' + BASE_URL);
}

async function main() {
	const env = { ...process.env } as Record<string, string>;
	delete env.CHARGILY_SECRET_KEY;
	env.PORT = String(PORT);
	env.ORIGIN = BASE_URL;

	const serverProc = Bun.spawn(['bun', 'build/index.js'], {
		cwd: process.cwd(),
		env,
		stdout: 'pipe',
		stderr: 'pipe'
	});

	let testFingerprint: string | undefined;
	let adminSessionId: string | undefined;
	const generatedPdfPaths: string[] = [];

	const usersDb = new Database('data/users.db');
	const contentDb = new Database('data/content.db');
	const initialVoucherRow = usersDb
		.query("SELECT used_count FROM voucher_codes WHERE UPPER(code) = 'MOYEN-FREE-30'")
		.get() as { used_count: number } | null;

	try {
		await waitForServer();
		console.log('✅ Server booted on', BASE_URL);

		// 1. Security Guards (unauthenticated)
		{
			const rAdminApi = await httpReq('/api/admin/quizzes');
			assert.equal(rAdminApi.status, 401, 'Unauth GET /api/admin/quizzes must return 401');

			const rGenPdf = await httpReq('/api/generate-pdf', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({})
			});
			assert.equal(rGenPdf.status, 401, 'Unauth POST /api/generate-pdf must return 401');

			const rUploadImg = await httpReq('/api/upload-image', {
				method: 'POST',
				body: new FormData()
			});
			assert.equal(rUploadImg.status, 401, 'Unauth POST /api/upload-image must return 401');

			const rBuildStatic = await httpReq('/api/admin/build-static', { method: 'POST' });
			assert.equal(rBuildStatic.status, 401, 'Unauth POST /api/admin/build-static must return 401');

			const rAdminPage = await httpReq('/admin');
			assert.equal(rAdminPage.status, 302, 'Unauth GET /admin must return 302');
			assert.ok(
				rAdminPage.headers.get('location')?.includes('/admin/login'),
				'GET /admin redirect target must be /admin/login'
			);

			const rStudentPage = await httpReq('/student');
			assert.equal(rStudentPage.status, 302, 'Unauth GET /student must return 302');
			assert.ok(
				rStudentPage.headers.get('location')?.includes('/auth/login?next=%2Fstudent'),
				'GET /student redirect target must include /auth/login?next=%2Fstudent'
			);
			console.log('✅ 1. Security guards passed (401/302)');
		}

		// 2. Visibility Filtering
		{
			const rHome = await httpReq('/');
			assert.equal(rHome.status, 200);
			const homeHtml = await rHome.text();
			assert.ok(homeHtml.includes('التعليم المتوسط'), 'Home page must show التعليم المتوسط');
			assert.ok(!homeHtml.includes('href="/primaire"'), 'Home page must NOT link to hidden /primaire');
			assert.ok(!homeHtml.includes('href="/secondaire"'), 'Home page must NOT link to hidden /secondaire');

			const rPrim = await httpReq('/primaire');
			assert.equal(rPrim.status, 404, 'Hidden level /primaire must return 404');

			const rSec = await httpReq('/secondaire');
			assert.equal(rSec.status, 404, 'Hidden level /secondaire must return 404');

			const rMath = await httpReq('/moyen/1am/mat-b');
			assert.equal(rMath.status, 200, 'Published /moyen/1am/mat-b must return 200');

			const rHiddenSubj = await httpReq('/moyen/1am/arb');
			assert.equal(rHiddenSubj.status, 404, 'Hidden subject /moyen/1am/arb must return 404');

			const rHiddenPhy = await httpReq('/moyen/1am/phy-m');
			assert.equal(rHiddenPhy.status, 404, 'Hidden subject /moyen/1am/phy-m must return 404');
			console.log('✅ 2. Visibility filtering passed (moyen math ONLY visible)');
		}

		// 3. Anonymous 3-Tier Gating & Server-Side Quiz Grading
		const studentJar = new CookieJar();
		{
			const rTeaser = await httpReq('/moyen/3am/mat-b/3am-math-t2-exam-registered', { jar: studentJar });
			assert.equal(rTeaser.status, 200);
			const teaserHtml = await rTeaser.text();
			assert.ok(
				!teaserHtml.includes('/documents/moyen/3am-math-t2-exam-1.pdf'),
				'Anonymous user must NOT receive registered PDF URL'
			);

			const rRegSubmit = await httpReq('/api/quizzes/34/submit', {
				method: 'POST',
				jar: studentJar,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ answers: { 213: { selectedIndexes: [0] }, 214: { value: true } } })
			});
			assert.equal(rRegSubmit.status, 403);
			const regErr = (await rRegSubmit.json()) as any;
			assert.equal(regErr.lockReason, 'auth_required');

			const rPremSubmit = await httpReq('/api/quizzes/35/submit', {
				method: 'POST',
				jar: studentJar,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ answers: { 215: { value: 12 }, 216: { selectedIndexes: [0] } } })
			});
			assert.equal(rPremSubmit.status, 403);
			const premErr = (await rPremSubmit.json()) as any;
			assert.equal(premErr.lockReason, 'premium_required');

			// Public quiz 25: send 3 correct + 1 wrong, PLUS spoofed score: 999
			const rPubSubmit = await httpReq('/api/quizzes/25/submit', {
				method: 'POST',
				jar: studentJar,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					score: 999,
					percentage: 100,
					timeTaken: 45,
					answers: {
						146: { selectedIndexes: [1] },
						147: { selectedIndexes: [0] },
						148: { value: true },
						149: { text: 'خطأ' }
					}
				})
			});
			assert.equal(rPubSubmit.status, 200);
			const pubJson = (await rPubSubmit.json()) as any;
			assert.equal(pubJson.score, 6, 'Server must compute score=6 ignoring spoofed 999');
			assert.equal(pubJson.totalPoints, 8);
			assert.equal(pubJson.percentage, 75);
			assert.ok(pubJson.xpEarned > 0, 'Quiz submission must award XP > 0');

			testFingerprint = studentJar.get('sujet_fp');
			assert.ok(testFingerprint, 'Anonymous submit must establish sujet_fp cookie');
			console.log('✅ 3. Tier gating + tamper-proof server grading passed');
		}

		// 4. Student Registration + Anonymous Progress Migration + Mistake Notebook
		{
			const rRegPage = await httpReq('/auth/register', { jar: studentJar });
			assert.equal(rRegPage.status, 200, 'GET /auth/register must return 200 cleanly');

			const rSimPage = await httpReq('/simulator', { jar: studentJar });
			assert.equal(rSimPage.status, 200, 'GET /simulator must return 200 cleanly');

			const fd = new FormData();
			fd.set('name', 'طالب التحقق الآلي');
			fd.set('email', TEST_EMAIL);
			fd.set('password', 'TestPass123!');
			fd.set('yearId', '4am');
			fd.set('wilaya', '16 - الجزائر');

			const rRegister = await httpReq('/auth/register', {
				method: 'POST',
				jar: studentJar,
				body: fd
			});
			if (rRegister.status === 200) {
				const regJson = (await rRegister.json()) as any;
				assert.equal(regJson.type, 'redirect', 'POST /auth/register action JSON must be redirect');
				assert.equal(regJson.status, 302);
				assert.equal(regJson.location, '/student');
			} else {
				assert.equal(rRegister.status, 302, 'POST /auth/register must redirect with session cookie');
			}
			assert.ok(studentJar.get('sujet_session'), 'Registration must set sujet_session cookie');

			const rStudentDash = await httpReq('/student', { jar: studentJar });
			assert.equal(rStudentDash.status, 200, 'Authenticated GET /student must return 200');
			const dashHtml = await rStudentDash.text();
			assert.ok(dashHtml.includes('75%') || dashHtml.includes('نقطة'), 'Student portal must display migrated attempt/XP');

			const rMistakes = await httpReq('/student/mistakes', { jar: studentJar });
			assert.equal(rMistakes.status, 200, 'Authenticated GET /student/mistakes must return 200');
			const mistakesHtml = await rMistakes.text();
			assert.ok(
				mistakesHtml.includes('حل: س + ص = 10'),
				'Mistake notebook must display wrong question 212'
			);

			const rRegDoc = await httpReq('/moyen/3am/mat-b/3am-math-t2-exam-registered', { jar: studentJar });
			assert.equal(rRegDoc.status, 200);
			const regDocHtml = await rRegDoc.text();
			assert.ok(
				regDocHtml.includes('/documents/moyen/3am-math-t2-exam-1.pdf'),
				'Registered student must now see registered PDF URL'
			);

			const rRegQuizAfter = await httpReq('/api/quizzes/34/submit', {
				method: 'POST',
				jar: studentJar,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ answers: { 213: { selectedIndexes: [0] }, 214: { value: true } } })
			});
			assert.equal(rRegQuizAfter.status, 200, 'Registered student must be able to submit registered quiz 34');

			const rPremQuizBeforeVoucher = await httpReq('/api/quizzes/35/submit', {
				method: 'POST',
				jar: studentJar,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ answers: { 215: { value: 12 }, 216: { selectedIndexes: [0] } } })
			});
			assert.equal(rPremQuizBeforeVoucher.status, 403, 'Free student must still get 403 on premium quiz 35');
			console.log('✅ 4. Registration + progress migration + mistake notebook + registered unlock passed');
		}

		// 5. Chargily Fallback & Voucher Activation (MOYEN-FREE-30)
		{
			const rChargily = await httpReq('/api/payments/chargily', {
				method: 'POST',
				jar: studentJar,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ plan: 'monthly' })
			});
			assert.equal(rChargily.status, 503);
			const chJson = (await rChargily.json()) as any;
			assert.equal(chJson.configured, false);

			const fdVoucher = new FormData();
			fdVoucher.set('code', 'MOYEN-FREE-30');
			const rActivate = await httpReq('/student/activate?/redeemVoucher', {
				method: 'POST',
				jar: studentJar,
				headers: { Accept: 'application/json' },
				body: fdVoucher
			});
			assert.equal(rActivate.status, 200);
			const actJson = (await rActivate.json()) as any;
			assert.equal(actJson.type, 'success', 'Voucher activation action must return SvelteKit success');

			const rPremDoc = await httpReq('/moyen/4am/mat-b/4am-bem-math-pro-1', { jar: studentJar });
			assert.equal(rPremDoc.status, 200);
			const premDocHtml = await rPremDoc.text();
			assert.ok(
				premDocHtml.includes('/documents/moyen/4am-math-bem-1.pdf'),
				'Premium student must now receive 4am BEM PDF URL'
			);

			const rPremQuizAfter = await httpReq('/api/quizzes/35/submit', {
				method: 'POST',
				jar: studentJar,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ answers: { 215: { value: 12 }, 216: { selectedIndexes: [0] } } })
			});
			assert.equal(rPremQuizAfter.status, 200, 'Premium student must be able to submit premium quiz 35');
			const premQuizJson = (await rPremQuizAfter.json()) as any;
			assert.equal(premQuizJson.percentage, 100);
			console.log('✅ 5. Chargily fallback (503) + Voucher activation + Premium unlock passed');
		}

		// 6. Smart Generator (Quiz + Typst PDF compilation)
		{
			const rGenQuiz = await httpReq('/api/generator', {
				method: 'POST',
				jar: studentJar,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ mode: 'quiz', yearSubjectId: 614, count: 3 })
			});
			assert.equal(rGenQuiz.status, 200);
			const genQuizJson = (await rGenQuiz.json()) as any;
			assert.ok(Array.isArray(genQuizJson.questions) && genQuizJson.questions.length > 0);

			const rGenPdf = await httpReq('/api/generator', {
				method: 'POST',
				jar: studentJar,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					mode: 'pdf',
					yearSubjectId: 614,
					trimesterId: 't3',
					docType: 'exam',
					exerciseCount: 2
				})
			});
			assert.equal(rGenPdf.status, 200);
			const genPdfJson = (await rGenPdf.json()) as any;
			assert.ok(genPdfJson.pdfUrl?.startsWith('/uploads/sujet/gen-'), 'Must return safe /uploads/sujet/gen-*.pdf URL');

			const pdfFileName = genPdfJson.pdfUrl.replace('/uploads/sujet/', '');
			generatedPdfPaths.push(resolve('data/uploads/sujet', pdfFileName));
			if (genPdfJson.solutionUrl && genPdfJson.solutionUrl !== genPdfJson.pdfUrl) {
				const solFileName = genPdfJson.solutionUrl.replace('/uploads/sujet/', '');
				generatedPdfPaths.push(resolve('data/uploads/sujet', solFileName));
			}

			const rPdfFetch = await httpReq(genPdfJson.pdfUrl, { jar: studentJar });
			assert.equal(rPdfFetch.status, 200, 'Generated PDF must be downloadable via /uploads/[...path]');
			const pdfBytes = new Uint8Array(await rPdfFetch.arrayBuffer());
			const header = new TextDecoder().decode(pdfBytes.slice(0, 5));
			assert.equal(header, '%PDF-', 'Generated Typst artifact must have valid %PDF- signature');
			console.log('✅ 6. Smart Generator (Quiz + Typst PDF) passed');
		}

		// 7. Superadmin Live Visibility Toggle + Restore
		{
			const adminSession = await createSession(22);
			adminSessionId = adminSession.id;
			const adminCookie = `sujet_session=${adminSession.id}`;

			const rShow = await httpReq('/api/admin/visibility', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Cookie: adminCookie
				},
				body: JSON.stringify({ targetType: 'level', id: 'primaire', visibility: 'coming_soon' })
			});
			assert.equal(rShow.status, 200);

			const rPrimOpen = await httpReq('/primaire');
			assert.equal(rPrimOpen.status, 200, 'Level set to coming_soon must return 200');

			const rRestore = await httpReq('/api/admin/visibility', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Cookie: adminCookie
				},
				body: JSON.stringify({ targetType: 'level', id: 'primaire', visibility: 'hidden' })
			});
			assert.equal(rRestore.status, 200);

			const rPrimClosed = await httpReq('/primaire');
			assert.equal(rPrimClosed.status, 404, 'Level restored to hidden must return 404');
			console.log('✅ 7. Live Admin visibility toggle & restore passed');
		}
	} finally {
		serverProc.kill();
		await serverProc.exited.catch(() => {});

		// Clean up all temporary test DB rows & generated PDFs
		const testUser = usersDb
			.query('SELECT id FROM users WHERE email = ? LIMIT 1')
			.get(TEST_EMAIL) as { id: number } | null;

		if (testUser) {
			usersDb.query('DELETE FROM quiz_attempts WHERE user_id = ?').run(testUser.id);
			usersDb.query('DELETE FROM user_points WHERE user_id = ?').run(testUser.id);
			usersDb.query('DELETE FROM user_badges WHERE user_id = ?').run(testUser.id);
			usersDb.query('DELETE FROM user_mistakes WHERE user_id = ?').run(testUser.id);
			usersDb.query('DELETE FROM payment_orders WHERE user_id = ?').run(testUser.id);
			usersDb.query('DELETE FROM voucher_redemptions WHERE user_id = ?').run(testUser.id);
			usersDb.query('DELETE FROM sessions WHERE user_id = ?').run(testUser.id);
			usersDb.query('DELETE FROM users WHERE id = ?').run(testUser.id);
		}

		if (testFingerprint) {
			usersDb.query('DELETE FROM quiz_attempts WHERE fingerprint = ?').run(testFingerprint);
			usersDb.query('DELETE FROM user_points WHERE fingerprint = ?').run(testFingerprint);
			usersDb.query('DELETE FROM user_badges WHERE fingerprint = ?').run(testFingerprint);
			usersDb.query('DELETE FROM user_mistakes WHERE fingerprint = ?').run(testFingerprint);
		}

		if (adminSessionId) {
			usersDb.query('DELETE FROM sessions WHERE id = ?').run(adminSessionId);
		}

		if (initialVoucherRow) {
			usersDb
				.query("UPDATE voucher_codes SET used_count = ? WHERE UPPER(code) = 'MOYEN-FREE-30'")
				.run(initialVoucherRow.used_count);
		}

		contentDb.query("UPDATE education_levels SET visibility = 'hidden' WHERE id IN ('primaire', 'secondaire')").run();
		contentDb.query("UPDATE education_levels SET visibility = 'published' WHERE id = 'moyen'").run();

		for (const fp of generatedPdfPaths) {
			if (existsSync(fp)) unlinkSync(fp);
		}

		// Assert invariants on default visibility
		const visLevels = contentDb
			.query('SELECT id, visibility FROM education_levels ORDER BY "order"')
			.all() as Array<{ id: string; visibility: string }>;
		const pubYs = contentDb
			.query("SELECT id FROM year_subjects WHERE visibility = 'published' ORDER BY id")
			.all() as Array<{ id: number }>;

		assert.deepEqual(
			visLevels,
			[
				{ id: 'primaire', visibility: 'hidden' },
				{ id: 'moyen', visibility: 'published' },
				{ id: 'secondaire', visibility: 'hidden' }
			],
			'Visibility invariant on education_levels violated!'
		);
		assert.deepEqual(
			pubYs.map((r) => r.id),
			[614, 624, 634, 644],
			'Visibility invariant on year_subjects (moyen MAT-B only) violated!'
		);

		usersDb.close();
		contentDb.close();
		console.log('✅ 8. Cleanup & visibility invariants verified clean');
	}
}

main().catch((err) => {
	console.error('❌ Verification failed:', err);
	process.exit(1);
});
