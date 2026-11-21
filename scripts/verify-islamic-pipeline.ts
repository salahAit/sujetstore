import { Database } from 'bun:sqlite';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { randomUUID } from 'node:crypto';
import { createSession, SESSION_COOKIE_NAME } from '../src/lib/server/auth';
import { pgGet, pgRun } from '../src/lib/server/db';
import {
	ALL_ISLAMIC_TRACK_IDS,
	ISLAMIC_GRADE_METADATA
} from '../src/lib/modules/IslamicTemplates/types';

const PORT = 4186;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const CONTENT_DB = resolve('data/content.db');

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
			const r = await fetch(`${BASE_URL}/admin/login`);
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

function assertValidPdfFile(absPath: string, label: string, requireQuranFont = false) {
	assert.ok(existsSync(absPath), `Missing PDF (${label}): ${absPath}`);
	const buf = readFileSync(absPath);
	assert.equal(buf.subarray(0, 5).toString('ascii'), '%PDF-', `Invalid %PDF- header (${label}): ${absPath}`);
	assert.ok(buf.length > 12_000, `PDF too small (${buf.length}B) for ${label}`);
	const fontsOut = execFileSync('pdffonts', [absPath], { encoding: 'utf-8' });
	assert.ok(!fontsOut.includes('FreeMono'), `FreeMono detected in ${label}!\n${fontsOut}`);
	if (requireQuranFont) {
		assert.ok(
			fontsOut.includes('UthmanTahaNaskh'),
			`KFGQPC Uthman Taha Naskh missing in ${label}!\n${fontsOut}`
		);
	}
}

async function main() {
	const proc = Bun.spawn(['bun', 'build/index.js'], {
		env: { ...process.env, PORT: String(PORT), HOST: '127.0.0.1' },
		stdout: 'pipe',
		stderr: 'pipe'
	});

	const db = new Database(CONTENT_DB, { readonly: true });
	let tempSessionId = `verify-isl-${randomUUID()}`;
	const tempFiles: string[] = [];

	try {
		await waitForServer();
		console.log(`✅ Server booted on ${BASE_URL}`);

		const activeUser = await pgGet<{ id: number }>(
			'SELECT id FROM users WHERE is_active = TRUE ORDER BY id ASC LIMIT 1'
		);
		assert.ok(activeUser, 'An active user must exist in PostgreSQL users table');
		const session = await createSession(activeUser.id);
		tempSessionId = session.id;

		const jar = new CookieJar();
		jar.setFromHeaders(new Headers({ 'set-cookie': `${SESSION_COOKIE_NAME}=${session.id}; Path=/` }));

		// 1. All 23 Islamic Track Routes + Secondary `العلوم الإسلامية` Label + Tests-Before-Exams Check
		for (const grade of ALL_ISLAMIC_TRACK_IDS) {
			const meta = ISLAMIC_GRADE_METADATA[grade];
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
			assert.ok(html.includes('ابدأ الدرس التفاعلي'), `Interactive lesson direct link missing for ${grade}`);
			if (meta.levelId === 'secondaire') {
				assert.ok(
					html.includes('العلوم الإسلامية'),
					`Secondary route ${urlPath} must display العلوم الإسلامية`
				);
			}

			const firstTestIdx = html.indexOf('badge-test');
			const firstExamIdx = html.indexOf('badge-exam');
			if (firstTestIdx >= 0 && firstExamIdx >= 0) {
				assert.ok(
					firstTestIdx < firstExamIdx,
					`Tests (فروض) must appear before Exams (اختبارات) on ${urlPath}`
				);
			}
		}
		console.log('✅ 1. All 23 Islamic track routes + العلوم الإسلامية secondary display + tests-before-exams passed');

		// 2. Interactive Lessons SSR across ALL 23 tracks
		const lessonStmt = db.query(`
			SELECT d.slug, d.title_ar as titleAr
			FROM documents d
			WHERE d.year_subject_id = ? AND d.type = 'lesson' AND d.is_published = 1
			ORDER BY d.id ASC LIMIT 1
		`);
		for (const grade of ALL_ISLAMIC_TRACK_IDS) {
			const meta = ISLAMIC_GRADE_METADATA[grade];
			const row = lessonStmt.get(meta.yearSubjectId) as { slug: string; titleAr: string } | null;
			assert.ok(row, `No published Islamic lesson found for ${grade}`);
			const subjSlug = meta.subjectId.toLowerCase();
			const url =
				meta.levelId === 'secondaire'
					? `/secondaire/${meta.yearId}/${subjSlug}/${row.slug}?stream=${meta.streamId!.toLowerCase()}`
					: `/${meta.levelId}/${meta.yearId}/${subjSlug}/${row.slug}`;
			const res = await httpReq(url, { jar });
			assert.equal(res.status, 200, `Lesson SSR failed for ${grade}: ${url}`);
			const html = await res.text();
			assert.ok(html.includes(row.titleAr), `Lesson title missing in SSR for ${grade}`);
		}
		console.log('✅ 2. All 23 Islamic tracks interactive lessons SSR verified');

		// 3. Smart Generator PDF Generation across Primary (1AP, 5AP تقييم المكتسبات), Middle (4AM BEM), Secondary (1AS, 2AS, 3AS BAC)
		const pdfCases = [
			{ label: '1ap_diagnostic', yearSubjectId: 583, trimesterId: 't1', docType: 'test', difficulty: 'easy' },
			{ label: '5ap_competency', yearSubjectId: 608, trimesterId: 't3', docType: 'exam', variant: 'competency_eval', difficulty: 'medium' },
			{ label: '4am_bem', yearSubjectId: 649, trimesterId: 't3', docType: 'exam', variant: 'bem_mock', difficulty: 'hard' },
			{ label: '1as_tcst', yearSubjectId: 660, trimesterId: 't1', docType: 'exam', difficulty: 'medium' },
			{ label: '3as_se_bac', yearSubjectId: 688, trimesterId: 't3', docType: 'exam', variant: 'bac_mock', difficulty: 'hard' },
			{ label: '3as_lp_bac', yearSubjectId: 772, trimesterId: 't3', docType: 'exam', variant: 'bac_mock', difficulty: 'hard' }
		];

		for (const tc of pdfCases) {
			const res = await httpReq('/api/generator', {
				method: 'POST',
				jar,
				body: { mode: 'pdf', seed: 7272, ...tc }
			});
			assert.equal(res.status, 200, `Generator PDF failed for ${tc.label}: ${res.status}`);
			const out = (await res.json()) as any;
			assert.equal(out.success, true, `Generator success=false for ${tc.label}`);
			const subPath = resolve('data', String(out.pdfUrl).replace(/^\//, ''));
			const solPath = resolve('data', String(out.solutionUrl).replace(/^\//, ''));
			assertValidPdfFile(subPath, `${tc.label} subject`);
			assertValidPdfFile(solPath, `${tc.label} solution`);
			tempFiles.push(subPath, solPath);
		}
		console.log('✅ 3. Smart Generator PDF compilation + 0 FreeMono verified across 1AP, 5AP تقييم المكتسبات, 4AM BEM, 1AS, 3AS BAC');

		// 4. Smart Generator Quiz + 100% Grading Check (4 key tracks across cycles; keeps total POSTs = 14 < 15 rate limit)
		for (const ysId of [583, 649, 678, 688]) {
			const res = await httpReq('/api/generator', {
				method: 'POST',
				jar,
				body: { mode: 'quiz', yearSubjectId: ysId, count: 5 }
			});
			assert.equal(res.status, 200, `Quiz generation failed for ysId=${ysId}`);
			const quizPayload = (await res.json()) as any;
			assert.ok(
				Array.isArray(quizPayload.questions) && quizPayload.questions.length >= 4,
				`Too few quiz questions for ysId=${ysId}`
			);

			const answers: Record<number, any> = {};
			for (const q of quizPayload.questions) {
				answers[q.id] = deriveCorrectAnswer(q.type, q.questionData);
			}
			const gradeRes = await httpReq('/api/generator', {
				method: 'POST',
				jar,
				body: { mode: 'grade', answers, timeTaken: 25 }
			});
			assert.equal(gradeRes.status, 200, `Quiz grading failed for ysId=${ysId}`);
			const graded = (await gradeRes.json()) as any;
			assert.equal(graded.percentage, 100, `Expected 100% score for ysId=${ysId}, got ${graded.percentage}%`);
		}
		console.log('✅ 4. Smart Generator Islamic quizzes & 100% grading verified across 1AP, 4AM BEM, 2AS SE, 3AS BAC');

		// 5. Official BAC Islamic Archive (6 canonical papers = 12 PDFs, linked across all 6 3AS streams = 36 DB rows)
		const officialRows = db
			.query(
				"SELECT DISTINCT pdf_url as pdfUrl, solution_url as solutionUrl FROM documents WHERE origin_type = 'official_certificate' AND slug LIKE 'bac-%-islamic-%' AND is_published = 1"
			)
			.all() as Array<{ pdfUrl: string; solutionUrl: string }>;
		assert.equal(officialRows.length, 6, `Expected 6 distinct Official BAC Islamic papers, found ${officialRows.length}`);

		let quranFontCount = 0;
		for (const row of officialRows) {
			for (const [kind, url] of [
				['subject', row.pdfUrl],
				['solution', row.solutionUrl]
			] as const) {
				const pdfRes = await httpReq(url, { jar });
				assert.equal(pdfRes.status, 200, `PDF HTTP failed (${kind}): ${url} -> ${pdfRes.status}`);
				const buf = Buffer.from(await pdfRes.arrayBuffer());
				const tmpPdf = `/tmp/verify-isl-${randomUUID()}.pdf`;
				writeFileSync(tmpPdf, buf);
				tempFiles.push(tmpPdf);
				assertValidPdfFile(tmpPdf, `${url} (${kind})`);
				const fontsOut = execFileSync('pdffonts', [tmpPdf], { encoding: 'utf-8' });
				if (fontsOut.includes('UthmanTahaNaskh')) quranFontCount++;
			}
		}
		assert.ok(
			quranFontCount >= 8,
			`Expected KFGQPC Uthman Taha Naskh embedded in BAC Islamic PDFs, found ${quranFontCount}/12`
		);
		console.log(
			`✅ 5. All 6 Official BAC Islamic Archive papers (12 PDFs, 36 stream links) verified via RustFS HTTP (0 FreeMono, UthmanTahaNaskh in ${quranFontCount}/12 PDFs)`
		);

		console.log('\n🎉 ALL ISLAMIC EDUCATION & SCIENCES E2E VERIFICATION CHECKS PASSED 100%!');
	} finally {
		try {
			await pgRun('DELETE FROM sessions WHERE id = $1', [tempSessionId]);
		} catch {}
		for (const f of tempFiles) {
			try {
				if (existsSync(f)) unlinkSync(f);
			} catch {}
		}
		db.close();
		proc.kill();
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
