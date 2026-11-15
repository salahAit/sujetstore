import { Database } from 'bun:sqlite';
import { readFile } from 'fs/promises';
import { join, resolve } from 'path';
import { compileTypstPdf } from '../src/lib/server/typst';

const ROOT = resolve('.');

function hasColumn(db: Database, table: string, column: string): boolean {
	const cols = db.query(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>;
	return cols.some((c) => c.name === column);
}

function addColumnIfMissing(db: Database, table: string, column: string, definition: string) {
	if (!hasColumn(db, table, column)) {
		db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
		console.log(`  + Added column ${table}.${column}`);
	}
}

async function migrateContentDb() {
	console.log('=== Migrating data/content.db ===');
	const db = new Database(join(ROOT, 'data/content.db'));
	db.exec('PRAGMA journal_mode = WAL');
	db.exec('PRAGMA busy_timeout = 5000');
	db.exec('PRAGMA foreign_keys = ON');

	// 1. Add visibility & accessTier columns
	for (const tbl of ['education_levels', 'years', 'level_streams', 'stream_subjects', 'year_subjects']) {
		addColumnIfMissing(db, tbl, 'visibility', "TEXT NOT NULL DEFAULT 'published'");
	}
	for (const tbl of ['documents', 'quizzes']) {
		addColumnIfMissing(db, tbl, 'access_tier', "TEXT NOT NULL DEFAULT 'public'");
	}

	// 2. Create site_settings & indexes
	db.exec(`
		CREATE TABLE IF NOT EXISTS site_settings (
			key TEXT PRIMARY KEY,
			value TEXT NOT NULL,
			updated_at TEXT DEFAULT (datetime('now'))
		);
		CREATE INDEX IF NOT EXISTS idx_docs_ys_pub ON documents(year_subject_id, is_published);
		CREATE INDEX IF NOT EXISTS idx_quizzes_ys_pub ON quizzes(year_subject_id, is_published);
		CREATE INDEX IF NOT EXISTS idx_ys_year_sub ON year_subjects(year_id, subject_id);
		CREATE INDEX IF NOT EXISTS idx_ss_stream_sub ON stream_subjects(stream_id, subject_id);
	`);

	// 3. Configure initial visibility: ONLY Middle School (moyen, 1am-4am) -> Mathematics (MAT-B) published!
	db.exec('BEGIN');
	try {
		db.exec("UPDATE education_levels SET visibility = CASE WHEN id = 'moyen' THEN 'published' ELSE 'hidden' END");
		db.exec(
			"UPDATE years SET visibility = CASE WHEN id IN ('1am', '2am', '3am', '4am') THEN 'published' ELSE 'hidden' END"
		);
		db.exec(
			"UPDATE level_streams SET visibility = CASE WHEN year_id IN ('1am', '2am', '3am', '4am') THEN 'published' ELSE 'hidden' END"
		);
		db.exec(
			"UPDATE stream_subjects SET visibility = CASE WHEN subject_id = 'MAT-B' AND (year_id IS NULL OR year_id IN ('1am', '2am', '3am', '4am')) THEN 'published' ELSE 'hidden' END"
		);
		db.exec(
			"UPDATE year_subjects SET visibility = CASE WHEN year_id IN ('1am', '2am', '3am', '4am') AND subject_id = 'MAT-B' THEN 'published' ELSE 'hidden' END"
		);

		// Sync access_tier from legacy is_premium
		db.exec("UPDATE quizzes SET access_tier = 'premium' WHERE is_premium = 1 AND access_tier = 'public'");

		// Fix misplaced seeded quiz #25 (middle-algebra-quiz points to ARB-B instead of MAT-B)
		const ys1amMat = db
			.query("SELECT id FROM year_subjects WHERE year_id = '1am' AND subject_id = 'MAT-B' LIMIT 1")
			.get() as { id: number } | null;
		if (ys1amMat) {
			db.query('UPDATE quizzes SET year_subject_id = ? WHERE id = 25').run(ys1amMat.id);
		}

		// Seed site_settings cleanly
		const settings: Array<[string, string]> = [
			['static_public_mode', 'false'],
			['active_site_title', 'SujetStore — بنك المواضيع والاختبارات التعليمية'],
			['public_portal_url', ''],
			['dynamic_portal_url', ''],
			['premium_monthly_price_dzd', '500'],
			['premium_quarterly_price_dzd', '1200']
		];
		const upsertSetting = db.query(
			`INSERT INTO site_settings (key, value, updated_at) VALUES (?, ?, datetime('now'))
			 ON CONFLICT(key) DO NOTHING`
		);
		for (const [k, v] of settings) {
			upsertSetting.run(k, v);
		}
		db.exec('COMMIT');
		console.log('  + Visibility configured: ONLY moyen (1am-4am) MAT-B = published; all others = hidden.');
	} catch (err) {
		db.exec('ROLLBACK');
		throw err;
	}

	// 4. Ensure Middle School Math has real compiled Typst PDFs across public/registered/premium tiers if documents table is empty
	const docCount = (db.query('SELECT COUNT(*) as n FROM documents').get() as { n: number }).n;
	if (docCount === 0) {
		console.log('  + Compiling starter Middle School Math Typst PDFs into static/documents/moyen/...');
		const exam1Raw = await readFile(join(ROOT, 'math_1am_t3/exam_1.json'), 'utf-8');
		const exam1Doc = JSON.parse(exam1Raw);

		const docSpecs = [
			{
				yearId: '1am',
				yearName: 'الأولى متوسط',
				trimesterId: 't3',
				trimesterName: 'الفصل الثالث',
				docType: 'exam' as const,
				title: 'اختبار الفصل الثالث في الرياضيات - 1 متوسط (نموذج 1)',
				slug: '1am-math-t3-exam-1',
				fileBase: '1am-math-t3-exam-1',
				accessTier: 'public' as const,
				difficulty: 'medium',
				examDoc: exam1Doc
			},
			{
				yearId: '2am',
				yearName: 'الثانية متوسط',
				trimesterId: 't1',
				trimesterName: 'الفصل الأول',
				docType: 'test' as const,
				title: 'فرض الفصل الأول في الرياضيات - 2 متوسط (سلسلة العمليات)',
				slug: '2am-math-t1-test-1',
				fileBase: '2am-math-t1-test-1',
				accessTier: 'public' as const,
				difficulty: 'easy',
				examDoc: {
					metadata: {
						levelId: 'moyen',
						yearId: '2am',
						yearName: 'الثانية متوسط',
						subjectId: 'MAT-B',
						subjectName: 'الرياضيات',
						trimesterId: 't1',
						trimesterName: 'الفصل الأول',
						docType: 'test',
						academicYear: '2025 / 2026',
						duration: 'ساعة واحدة',
						siteUrl: 'SujetStore.com'
					},
					exercises: [
						{
							num: 'التمرين الأول',
							points: 8,
							instruction: 'احسب العبارات التالية مع إبراز مراحل الحساب:',
							content: [
								{ type: 'math', content: 'A = 25 - 12 + 8', display: true, answer: '$A = 13 + 8 = 21$' },
								{ type: 'math', content: 'B = 4 times (15 - 3) + 6 / 2', display: true, answer: '$B = 4 times 12 + 3 = 48 + 3 = 51$' }
							]
						},
						{
							num: 'التمرين الثاني',
							points: 12,
							instruction: 'أنشئ قطعة مستقيم $[AB]$ طولها $6$ cm ثم أنشئ محورها $(Delta)$ الذي يقطعها في $O$.',
							content: [
								{ type: 'text', content: '1) ما هو طول القطعة $[OA]$؟ علل إجابتك.', answer: '$OA = 3$ cm لأن $(Delta)$ يمر بمنتصف $[AB]$.' },
								{ type: 'text', content: '2) عين نقطة $M$ من $(Delta)$. ما نوع المثلث $AMB$؟', answer: 'المثلث $AMB$ متساوي الساقين رأسه $M$ لأن $MA = MB$.' }
							]
						}
					]
				}
			},
			{
				yearId: '3am',
				yearName: 'الثالثة متوسط',
				trimesterId: 't2',
				trimesterName: 'الفصل الثاني',
				docType: 'exam' as const,
				title: 'موضوع مقترح بقوة مع الحل - القوى والحساب الحرفي (3 متوسط)',
				slug: '3am-math-t2-exam-registered',
				fileBase: '3am-math-t2-exam-1',
				accessTier: 'registered' as const,
				difficulty: 'medium',
				examDoc: {
					metadata: {
						levelId: 'moyen',
						yearId: '3am',
						yearName: 'الثالثة متوسط',
						subjectId: 'MAT-B',
						subjectName: 'الرياضيات',
						trimesterId: 't2',
						trimesterName: 'الفصل الثاني',
						docType: 'exam',
						academicYear: '2025 / 2026',
						duration: 'ساعتان',
						siteUrl: 'SujetStore.com'
					},
					exercises: [
						{
							num: 'التمرين الأول',
							points: 6,
							instruction: 'اكتب على شكل قوة للعدد $10$ ثم أعط الكتابة العلمية للعدد $C$:',
							content: [
								{ type: 'math', content: 'C = 0.0045 times 10^5', display: true, answer: '$C = 4.5 times 10^2$' }
							]
						},
						{
							num: 'التمرين الثاني',
							points: 7,
							instruction: 'انشر وبسط العبارة الجبرية الآتية:',
							content: [
								{ type: 'math', content: 'E = (2x + 3)(x - 4) + 5x', display: true, answer: '$E = 2x^2 - 8x + 3x - 12 + 5x = 2x^2 - 12$' }
							]
						}
					]
				}
			},
			{
				yearId: '4am',
				yearName: 'الرابعة متوسط',
				trimesterId: 't3',
				trimesterName: 'الفصل الثالث',
				docType: 'exam' as const,
				title: 'نموذج تجريبي لشهادة التعليم المتوسط BEM مع التصحيح النموذجي',
				slug: '4am-bem-math-pro-1',
				fileBase: '4am-math-bem-1',
				accessTier: 'premium' as const,
				difficulty: 'hard',
				examDoc: {
					metadata: {
						levelId: 'moyen',
						yearId: '4am',
						yearName: 'الرابعة متوسط',
						subjectId: 'MAT-B',
						subjectName: 'الرياضيات',
						trimesterId: 't3',
						trimesterName: 'الفصل الثالث',
						docType: 'exam',
						academicYear: '2025 / 2026',
						duration: 'ساعتان',
						siteUrl: 'SujetStore.com'
					},
					exercises: [
						{
							num: 'التمرين الأول (BEM)',
							points: 6,
							instruction: 'ليكن العددان $A = sqrt(108) - sqrt(48) + 2 sqrt(3)$ و $B = 24 / 18$:',
							content: [
								{ type: 'text', content: '1) احسب $PGCD(24, 18)$ ثم اختزل الكسر $B$.', answer: '$PGCD(24, 18) = 6$ ومنه $B = 4/3$.' },
								{ type: 'text', content: '2) اكتب $A$ على الشكل $a sqrt(3)$.', answer: '$A = 6 sqrt(3) - 4 sqrt(3) + 2 sqrt(3) = 4 sqrt(3)$.' }
							]
						},
						{
							num: 'التمرين الثاني',
							points: 6,
							instruction: 'لتكن العبارة $E = (3x - 2)^2 - 16$:',
							content: [
								{ type: 'text', content: '1) حلل العبارة $E$ إلى جداء عاملين.', answer: '$E = (3x - 2 - 4)(3x - 2 + 4) = (3x - 6)(3x + 2)$.' },
								{ type: 'text', content: '2) حل المعادلة $E = 0$.', answer: 'إما $3x - 6 = 0 => x = 2$ أو $3x + 2 = 0 => x = -2/3$.' }
							]
						}
					]
				}
			}
		];

		const insertDoc = db.query(`
			INSERT INTO documents (
				year_subject_id, trimester_id, title, title_ar, slug, type, content,
				pdf_url, solution_url, file_size, source, academic_year, has_solution,
				difficulty, download_count, access_tier, is_published
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'SujetStore رسمي', '2025 / 2026', ?, ?, 0, ?, 1)
		`);
		const insertBankEx = db.query(`
			INSERT INTO bank_exercises (year_subject_id, document_id, trimester_id, title, content, points, unit)
			VALUES (?, ?, ?, ?, ?, ?, ?)
		`);

		for (const spec of docSpecs) {
			const ysRow = db
				.query("SELECT id FROM year_subjects WHERE year_id = ? AND subject_id = 'MAT-B' LIMIT 1")
				.get(spec.yearId) as { id: number } | null;
			if (!ysRow) continue;

			const pdfPath = join(ROOT, 'static/documents/moyen', `${spec.fileBase}.pdf`);
			const solPath = join(ROOT, 'static/documents/moyen', `${spec.fileBase}-solution.pdf`);

			const subjRes = await compileTypstPdf({
				examDoc: spec.examDoc,
				outputPath: pdfPath,
				templateId: 'middle/exam',
				isSolution: false
			});
			const solRes = await compileTypstPdf({
				examDoc: spec.examDoc,
				outputPath: solPath,
				templateId: 'middle/exam',
				isSolution: true
			});

			if (!subjRes.success) {
				console.warn(`  ! Warning compiling ${spec.fileBase}.pdf: ${subjRes.error}`);
			} else {
				console.log(`  + Compiled ${spec.fileBase}.pdf (${subjRes.size} bytes), solution: ${solRes.success}`);
			}

			const info = insertDoc.run(
				ysRow.id,
				spec.trimesterId,
				spec.title,
				spec.title,
				spec.slug,
				spec.docType,
				JSON.stringify(spec.examDoc),
				subjRes.success ? `/documents/moyen/${spec.fileBase}.pdf` : null,
				solRes.success ? `/documents/moyen/${spec.fileBase}-solution.pdf` : null,
				subjRes.size ?? 0,
				solRes.success ? 1 : 0,
				spec.difficulty,
				spec.accessTier
			);
			const newDocId = Number(info.lastInsertRowid);

			const exList = spec.examDoc.exercises || [];
			for (let i = 0; i < exList.length; i++) {
				const ex = exList[i];
				insertBankEx.run(
					ysRow.id,
					newDocId,
					spec.trimesterId,
					`${ex.num || `تمرين ${i + 1}`} — ${spec.yearName}`,
					JSON.stringify(ex.content || ex.blocks || []),
					Number(ex.points) || 5,
					'الرياضيات'
				);
			}
		}
	}

	// 5. Ensure Middle School Math has interactive quizzes across public, registered, and premium tiers
	const middelMathQuizRows = db
		.query(
			`SELECT q.id, q.slug FROM quizzes q
			 JOIN year_subjects ys ON ys.id = q.year_subject_id
			 WHERE ys.year_id IN ('1am', '2am', '3am', '4am') AND ys.subject_id = 'MAT-B'`
		)
		.all() as Array<{ id: number; slug: string }>;

	if (middelMathQuizRows.length < 3) {
		const ys4am = db
			.query("SELECT id FROM year_subjects WHERE year_id = '4am' AND subject_id = 'MAT-B' LIMIT 1")
			.get() as { id: number } | null;
		const ys3am = db
			.query("SELECT id FROM year_subjects WHERE year_id = '3am' AND subject_id = 'MAT-B' LIMIT 1")
			.get() as { id: number } | null;

		const insertQuiz = db.query(`
			INSERT INTO quizzes (
				year_subject_id, trimester_id, title, title_ar, slug, description,
				difficulty, time_limit, question_count, passing_score, shuffle_options,
				show_answers, access_tier, is_premium, is_published
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 60, 1, 1, ?, ?, 1)
			ON CONFLICT(slug) DO NOTHING
		`);
		const insertCategory = db.query(`
			INSERT INTO question_categories (name, description, year_subject_id)
			VALUES (?, ?, ?)
		`);
		const findCategory = db.query(`
			SELECT id FROM question_categories WHERE year_subject_id = ? LIMIT 1
		`);
		const getOrCreateCategory = (ysId: number, name: string): number => {
			const existing = findCategory.get(ysId) as { id: number } | null;
			if (existing) return existing.id;
			const inserted = insertCategory.run(name, 'بنك أسئلة الرياضيات للطور المتوسط', ysId);
			return Number(inserted.lastInsertRowid);
		};

		const insertQuestion = db.query(`
			INSERT INTO questions (category_id, type, difficulty, question_text, question_text_ar, question_data, explanation)
			VALUES (?, ?, ?, ?, ?, ?, ?)
		`);
		const linkQQ = db.query(`INSERT INTO quiz_questions (quiz_id, question_id, points, "order") VALUES (?, ?, ?, ?)`);

		if (ys3am) {
			const res = insertQuiz.run(
				ys3am.id,
				't2',
				'الحساب الحرفي والقوى — 3 متوسط',
				'الحساب الحرفي والقوى — 3 متوسط',
				'3am-math-powers-registered',
				'تمرين تفاعلي مخصص للمسجلين لقياس الفهم وحفظ الأخطاء والنقاط.',
				'medium',
				600,
				2,
				'registered',
				0
			);
			const qzId = Number(res.lastInsertRowid);
			if (qzId > 0) {
				const catId = getOrCreateCategory(ys3am.id, 'القوى والحساب الحرفي — 3 متوسط');
				const q1 = Number(
					insertQuestion.run(
						catId,
						'mcq',
						'medium',
						'ما هي الكتابة العلمية للعدد 0.0052 ؟',
						'ما هي الكتابة العلمية للعدد 0.0052 ؟',
						JSON.stringify({
							options: ['5.2 × 10⁻³', '52 × 10⁻⁴', '0.52 × 10⁻²', '5.2 × 10³'],
							correctIndex: 0
						}),
						'في الكتابة العلمية يكون الرقم قبل الفاصلة غير معدوم ومحصور بين 1 و 9.'
					).lastInsertRowid
				);
				const q2 = Number(
					insertQuestion.run(
						catId,
						'true_false',
						'easy',
						'قوة العدد (10⁻² × 10⁵) تساوي 10³.',
						'قوة العدد (10⁻² × 10⁵) تساوي 10³.',
						JSON.stringify({ correct: true }),
						'نجمع الأسس: -2 + 5 = 3.'
					).lastInsertRowid
				);
				linkQQ.run(qzId, q1, 2, 0);
				linkQQ.run(qzId, q2, 1, 1);
			}
		}

		if (ys4am) {
			const res = insertQuiz.run(
				ys4am.id,
				't3',
				'تحضير مكثف لشهادة BEM — الجذور والمعادلات',
				'تحضير مكثف لشهادة BEM — الجذور والمعادلات',
				'4am-bem-roots-premium',
				'تحدي شامل للمشتركين المميزين يحاكي أسئلة شهادة التعليم المتوسط مع الشرح المفصل.',
				'hard',
				900,
				2,
				'premium',
				1
			);
			const qzId = Number(res.lastInsertRowid);
			if (qzId > 0) {
				const catId = getOrCreateCategory(ys4am.id, 'الجذور والمعادلات — 4 متوسط');
				const q1 = Number(
					insertQuestion.run(
						catId,
						'calculated',
						'hard',
						'احسب القاسم المشترك الأكبر للعددين 48 و 36: PGCD(48, 36) = ؟',
						'احسب القاسم المشترك الأكبر للعددين 48 و 36: PGCD(48, 36) = ؟',
						JSON.stringify({ answer: 12, tolerance: 0 }),
						'باستعمال خوارزمية إقليدس: 48 = 36×1 + 12 ثم 36 = 12×3 + 0، إذن PGCD = 12.'
					).lastInsertRowid
				);
				const q2 = Number(
					insertQuestion.run(
						catId,
						'mcq',
						'medium',
						'تبسيط العبارة √50 + √18 يساوي:',
						'تبسيط العبارة √50 + √18 يساوي:',
						JSON.stringify({
							options: ['8√2', '√68', '15√2', '4√2'],
							correctIndex: 0
						}),
						'√50 = 5√2 و √18 = 3√2، والمجموع يساوي 8√2.'
					).lastInsertRowid
				);
				linkQQ.run(qzId, q1, 3, 0);
				linkQQ.run(qzId, q2, 2, 1);
			}
		}
	}

	db.close();
}

function migrateUsersDb() {
	console.log('=== Migrating data/users.db ===');
	const db = new Database(join(ROOT, 'data/users.db'));
	db.exec('PRAGMA journal_mode = WAL');
	db.exec('PRAGMA busy_timeout = 5000');
	db.exec('PRAGMA foreign_keys = ON');

	// 1. Evolve users & engagement tables
	addColumnIfMissing(db, 'users', 'year_id', 'TEXT');
	addColumnIfMissing(db, 'users', 'stream_id', 'TEXT');
	addColumnIfMissing(db, 'users', 'wilaya', 'TEXT');
	addColumnIfMissing(db, 'users', 'subscription_tier', "TEXT NOT NULL DEFAULT 'free'");
	addColumnIfMissing(db, 'users', 'subscription_expires_at', 'TEXT');
	addColumnIfMissing(db, 'users', 'streak_days', 'INTEGER NOT NULL DEFAULT 0');
	addColumnIfMissing(db, 'users', 'last_active_date', 'TEXT');

	for (const tbl of ['comments', 'ratings', 'quiz_attempts', 'user_badges', 'user_points']) {
		addColumnIfMissing(db, tbl, 'user_id', 'INTEGER REFERENCES users(id) ON DELETE SET NULL');
	}

	// 2. Create new tables
	db.exec(`
		CREATE TABLE IF NOT EXISTS user_bookmarks (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
			item_type TEXT NOT NULL,
			item_id INTEGER NOT NULL,
			created_at TEXT NOT NULL DEFAULT (datetime('now'))
		);
		CREATE UNIQUE INDEX IF NOT EXISTS idx_bookmarks_unique ON user_bookmarks(user_id, item_type, item_id);

		CREATE TABLE IF NOT EXISTS user_mistakes (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
			fingerprint TEXT,
			question_id INTEGER NOT NULL,
			quiz_id INTEGER,
			wrong_count INTEGER NOT NULL DEFAULT 1,
			last_attempt_at TEXT NOT NULL DEFAULT (datetime('now')),
			resolved INTEGER NOT NULL DEFAULT 0
		);
		CREATE INDEX IF NOT EXISTS idx_mistakes_user ON user_mistakes(user_id, resolved);
		CREATE INDEX IF NOT EXISTS idx_mistakes_fp ON user_mistakes(fingerprint, resolved);

		CREATE TABLE IF NOT EXISTS voucher_codes (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			code TEXT NOT NULL UNIQUE,
			plan_days INTEGER NOT NULL DEFAULT 30,
			max_uses INTEGER NOT NULL DEFAULT 1,
			used_count INTEGER NOT NULL DEFAULT 0,
			is_active INTEGER NOT NULL DEFAULT 1,
			created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
			expires_at TEXT,
			created_at TEXT NOT NULL DEFAULT (datetime('now'))
		);

		CREATE TABLE IF NOT EXISTS voucher_redemptions (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			voucher_id INTEGER NOT NULL REFERENCES voucher_codes(id) ON DELETE CASCADE,
			user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
			redeemed_at TEXT NOT NULL DEFAULT (datetime('now'))
		);
		CREATE UNIQUE INDEX IF NOT EXISTS idx_redemption_unique ON voucher_redemptions(voucher_id, user_id);

		CREATE TABLE IF NOT EXISTS payment_orders (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
			provider TEXT NOT NULL,
			amount_dzd INTEGER NOT NULL,
			plan_days INTEGER NOT NULL DEFAULT 30,
			status TEXT NOT NULL DEFAULT 'pending',
			checkout_id TEXT,
			receipt_url TEXT,
			metadata TEXT,
			created_at TEXT NOT NULL DEFAULT (datetime('now')),
			updated_at TEXT
		);

		CREATE INDEX IF NOT EXISTS idx_attempts_user ON quiz_attempts(user_id);
		CREATE INDEX IF NOT EXISTS idx_points_user ON user_points(user_id);
		CREATE INDEX IF NOT EXISTS idx_badges_user ON user_badges(user_id);
	`);

	// 3. Upgrade primary admin to superadmin & normalize legacy 'user' role to 'student'
	db.exec("UPDATE users SET role = 'superadmin' WHERE email = 'admin@sujetstore.com'");
	const superadminCount = (db.query("SELECT COUNT(*) as n FROM users WHERE role = 'superadmin'").get() as { n: number }).n;
	if (superadminCount === 0) {
		db.exec("UPDATE users SET role = 'superadmin' WHERE id = (SELECT id FROM users WHERE role = 'admin' ORDER BY id LIMIT 1)");
	}
	db.exec("UPDATE users SET role = 'student' WHERE role = 'user'");

	// 4. Seed Arabic voucher codes & notifications if empty
	const voucherCount = (db.query('SELECT COUNT(*) as n FROM voucher_codes').get() as { n: number }).n;
	if (voucherCount === 0) {
		const insVoucher = db.query(
			`INSERT INTO voucher_codes (code, plan_days, max_uses, is_active) VALUES (?, ?, ?, 1)`
		);
		insVoucher.run('MOYEN-FREE-30', 30, 100);
		insVoucher.run('BEM-PRO-90', 90, 50);
		insVoucher.run('SUJET-VIP-365', 365, 25);
		console.log('  + Seeded 3 initial voucher codes.');
	}

	const notifCount = (db.query('SELECT COUNT(*) as n FROM notifications').get() as { n: number }).n;
	if (notifCount === 0) {
		const insNotif = db.query(`INSERT INTO notifications (title, body, type) VALUES (?, ?, ?)`);
		insNotif.run(
			'افتتاح قسم الرياضيات للطور المتوسط',
			'تم نشر مواضيع وفروض واختبارات الرياضيات لجميع سنوات التعليم المتوسط مع حلول نموذجية وتصحيح فوري.',
			'announcement'
		);
		insNotif.run(
			'انطلاق منصة التلميذ الذكية وحاسبة المعدل',
			'سجل مجاناً لتتبع تقدمك وحفظ أخطائك واستعمال محاكي شهادة التعليم المتوسط وحساب المعدل الفصلي.',
			'update'
		);
		console.log('  + Seeded 2 Arabic welcome notifications.');
	}

	db.close();
}

async function main() {
	await migrateContentDb();
	migrateUsersDb();
	console.log('Migration v3 completed successfully.');
}

main().catch((err) => {
	console.error('Migration failed:', err);
	process.exit(1);
});
