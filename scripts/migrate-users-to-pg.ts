import { Database } from 'bun:sqlite';
import { usersSql, pgAll, pgGet, pgRun, pgTx } from '../src/lib/server/db/users-pg';

const SQLITE_PATH = process.env.SQLITE_USERS_DB_PATH || '/var/www/sujetstore/data/users.db';

const PG_UTC_NOW = "to_char(NOW() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS')";

function toBool(val: unknown): boolean {
	if (typeof val === 'boolean') return val;
	if (typeof val === 'number') return val !== 0;
	if (typeof val === 'string') {
		const lower = val.trim().toLowerCase();
		return lower === '1' || lower === 'true' || lower === 't';
	}
	return false;
}

const DDL_STATEMENTS: string[] = [
	`CREATE TABLE IF NOT EXISTS users (
		id SERIAL PRIMARY KEY,
		username TEXT UNIQUE,
		email TEXT NOT NULL UNIQUE,
		password_hash TEXT NOT NULL,
		name TEXT NOT NULL,
		role TEXT NOT NULL DEFAULT 'student',
		avatar TEXT,
		is_active BOOLEAN NOT NULL DEFAULT TRUE,
		teacher_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
		year_id TEXT,
		stream_id TEXT,
		wilaya TEXT,
		subscription_tier TEXT NOT NULL DEFAULT 'free',
		subscription_expires_at TEXT,
		streak_days INTEGER NOT NULL DEFAULT 0,
		last_active_date TEXT,
		created_at TEXT NOT NULL DEFAULT (${PG_UTC_NOW}),
		updated_at TEXT
	)`,
	`CREATE UNIQUE INDEX IF NOT EXISTS users_username_unique ON users(username)`,
	`CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique ON users(email)`,

	`CREATE TABLE IF NOT EXISTS sessions (
		id TEXT PRIMARY KEY,
		user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
		expires_at TEXT NOT NULL,
		created_at TEXT NOT NULL DEFAULT (${PG_UTC_NOW})
	)`,
	`CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id)`,

	`CREATE TABLE IF NOT EXISTS comments (
		id SERIAL PRIMARY KEY,
		document_id INTEGER NOT NULL,
		user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
		author_name TEXT NOT NULL,
		content TEXT NOT NULL,
		created_at TEXT NOT NULL DEFAULT (${PG_UTC_NOW})
	)`,
	`CREATE INDEX IF NOT EXISTS idx_comments_doc ON comments(document_id)`,

	`CREATE TABLE IF NOT EXISTS ratings (
		id SERIAL PRIMARY KEY,
		document_id INTEGER NOT NULL,
		user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
		fingerprint TEXT NOT NULL,
		rating INTEGER NOT NULL,
		created_at TEXT NOT NULL DEFAULT (${PG_UTC_NOW})
	)`,
	`CREATE UNIQUE INDEX IF NOT EXISTS idx_ratings_unique ON ratings(document_id, fingerprint)`,

	`CREATE TABLE IF NOT EXISTS view_stats (
		id SERIAL PRIMARY KEY,
		document_id INTEGER NOT NULL,
		date TEXT NOT NULL,
		views INTEGER NOT NULL DEFAULT 0,
		downloads INTEGER NOT NULL DEFAULT 0
	)`,
	`CREATE INDEX IF NOT EXISTS idx_view_stats_doc_date ON view_stats(document_id, date)`,

	`CREATE TABLE IF NOT EXISTS notifications (
		id SERIAL PRIMARY KEY,
		title TEXT NOT NULL,
		body TEXT,
		type TEXT NOT NULL DEFAULT 'announcement',
		document_id INTEGER,
		created_at TEXT NOT NULL DEFAULT (${PG_UTC_NOW})
	)`,

	`CREATE TABLE IF NOT EXISTS quiz_attempts (
		id SERIAL PRIMARY KEY,
		quiz_id INTEGER NOT NULL,
		user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
		fingerprint TEXT NOT NULL,
		score INTEGER DEFAULT 0,
		total_points INTEGER DEFAULT 0,
		percentage DOUBLE PRECISION DEFAULT 0,
		time_taken INTEGER DEFAULT 0,
		completed_at TEXT,
		created_at TEXT NOT NULL DEFAULT (${PG_UTC_NOW})
	)`,
	`CREATE INDEX IF NOT EXISTS idx_attempts_quiz ON quiz_attempts(quiz_id)`,
	`CREATE INDEX IF NOT EXISTS idx_attempts_user ON quiz_attempts(user_id)`,

	`CREATE TABLE IF NOT EXISTS attempt_answers (
		id SERIAL PRIMARY KEY,
		attempt_id INTEGER NOT NULL REFERENCES quiz_attempts(id) ON DELETE CASCADE,
		question_id INTEGER NOT NULL,
		answer TEXT NOT NULL,
		is_correct INTEGER NOT NULL DEFAULT 0,
		points_earned INTEGER NOT NULL DEFAULT 0
	)`,
	`CREATE INDEX IF NOT EXISTS idx_attempt_answers_attempt ON attempt_answers(attempt_id)`,

	`CREATE TABLE IF NOT EXISTS badge_definitions (
		id SERIAL PRIMARY KEY,
		slug TEXT NOT NULL UNIQUE,
		name TEXT NOT NULL,
		name_ar TEXT NOT NULL,
		description TEXT,
		icon TEXT NOT NULL,
		color TEXT DEFAULT '#3b82f6',
		condition TEXT NOT NULL,
		points INTEGER DEFAULT 10,
		created_at TEXT NOT NULL DEFAULT (${PG_UTC_NOW})
	)`,

	`CREATE TABLE IF NOT EXISTS user_badges (
		id SERIAL PRIMARY KEY,
		user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
		fingerprint TEXT NOT NULL,
		badge_id INTEGER NOT NULL REFERENCES badge_definitions(id) ON DELETE CASCADE,
		earned_at TEXT NOT NULL DEFAULT (${PG_UTC_NOW})
	)`,
	`CREATE INDEX IF NOT EXISTS idx_badges_user ON user_badges(user_id)`,

	`CREATE TABLE IF NOT EXISTS user_points (
		id SERIAL PRIMARY KEY,
		user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
		fingerprint TEXT NOT NULL,
		points INTEGER NOT NULL,
		reason TEXT NOT NULL,
		quiz_id INTEGER,
		earned_at TEXT NOT NULL DEFAULT (${PG_UTC_NOW})
	)`,
	`CREATE INDEX IF NOT EXISTS idx_points_user ON user_points(user_id)`,

	`CREATE TABLE IF NOT EXISTS user_bookmarks (
		id SERIAL PRIMARY KEY,
		user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
		item_type TEXT NOT NULL,
		item_id INTEGER NOT NULL,
		created_at TEXT NOT NULL DEFAULT (${PG_UTC_NOW})
	)`,
	`CREATE UNIQUE INDEX IF NOT EXISTS idx_bookmarks_unique ON user_bookmarks(user_id, item_type, item_id)`,

	`CREATE TABLE IF NOT EXISTS user_mistakes (
		id SERIAL PRIMARY KEY,
		user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
		fingerprint TEXT,
		question_id INTEGER NOT NULL,
		quiz_id INTEGER,
		wrong_count INTEGER NOT NULL DEFAULT 1,
		last_attempt_at TEXT NOT NULL DEFAULT (${PG_UTC_NOW}),
		resolved BOOLEAN NOT NULL DEFAULT FALSE
	)`,
	`CREATE INDEX IF NOT EXISTS idx_mistakes_user ON user_mistakes(user_id, resolved)`,
	`CREATE INDEX IF NOT EXISTS idx_mistakes_fp ON user_mistakes(fingerprint, resolved)`,

	`CREATE TABLE IF NOT EXISTS voucher_codes (
		id SERIAL PRIMARY KEY,
		code TEXT NOT NULL UNIQUE,
		plan_days INTEGER NOT NULL DEFAULT 30,
		max_uses INTEGER NOT NULL DEFAULT 1,
		used_count INTEGER NOT NULL DEFAULT 0,
		is_active BOOLEAN NOT NULL DEFAULT TRUE,
		created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
		expires_at TEXT,
		created_at TEXT NOT NULL DEFAULT (${PG_UTC_NOW})
	)`,

	`CREATE TABLE IF NOT EXISTS voucher_redemptions (
		id SERIAL PRIMARY KEY,
		voucher_id INTEGER NOT NULL REFERENCES voucher_codes(id) ON DELETE CASCADE,
		user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
		redeemed_at TEXT NOT NULL DEFAULT (${PG_UTC_NOW})
	)`,
	`CREATE UNIQUE INDEX IF NOT EXISTS idx_redemption_unique ON voucher_redemptions(voucher_id, user_id)`,

	`CREATE TABLE IF NOT EXISTS payment_orders (
		id SERIAL PRIMARY KEY,
		user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
		provider TEXT NOT NULL,
		amount_dzd INTEGER NOT NULL,
		plan_days INTEGER NOT NULL DEFAULT 30,
		status TEXT NOT NULL DEFAULT 'pending',
		checkout_id TEXT,
		receipt_url TEXT,
		metadata TEXT,
		created_at TEXT NOT NULL DEFAULT (${PG_UTC_NOW}),
		updated_at TEXT
	)`,
	`CREATE INDEX IF NOT EXISTS idx_payment_orders_checkout ON payment_orders(checkout_id)`,
	`CREATE INDEX IF NOT EXISTS idx_payment_orders_user ON payment_orders(user_id)`,

	`CREATE TABLE IF NOT EXISTS billing_audit_logs (
		id SERIAL PRIMARY KEY,
		order_id INTEGER REFERENCES payment_orders(id) ON DELETE SET NULL,
		user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
		event_type TEXT NOT NULL,
		provider TEXT NOT NULL,
		external_id TEXT,
		amount_dzd INTEGER NOT NULL DEFAULT 0,
		status TEXT NOT NULL,
		payload TEXT,
		created_at TEXT NOT NULL DEFAULT (${PG_UTC_NOW})
	)`,
	`CREATE INDEX IF NOT EXISTS idx_billing_audit_order ON billing_audit_logs(order_id)`,
	`CREATE INDEX IF NOT EXISTS idx_billing_audit_user ON billing_audit_logs(user_id)`,
	`CREATE INDEX IF NOT EXISTS idx_billing_audit_external ON billing_audit_logs(external_id)`,

	// Legacy LMS tables preserved from users.db
	`CREATE TABLE IF NOT EXISTS tracks (
		id SERIAL PRIMARY KEY,
		name TEXT NOT NULL,
		description TEXT,
		icon TEXT,
		color TEXT,
		"order" INTEGER NOT NULL DEFAULT 0,
		is_published BOOLEAN NOT NULL DEFAULT FALSE
	)`,

	`CREATE TABLE IF NOT EXISTS lessons (
		id SERIAL PRIMARY KEY,
		track_id INTEGER NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
		title TEXT NOT NULL,
		description TEXT,
		instructor TEXT,
		thumbnail TEXT,
		level TEXT DEFAULT 'beginner',
		"order" INTEGER NOT NULL DEFAULT 0,
		is_published BOOLEAN NOT NULL DEFAULT FALSE
	)`,

	`CREATE TABLE IF NOT EXISTS video_sessions (
		id SERIAL PRIMARY KEY,
		lesson_id INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
		title TEXT NOT NULL,
		youtube_url TEXT,
		duration TEXT,
		transcript TEXT,
		summary TEXT,
		pdf_url TEXT,
		"order" INTEGER NOT NULL DEFAULT 0
	)`,

	`CREATE TABLE IF NOT EXISTS questions (
		id SERIAL PRIMARY KEY,
		session_id INTEGER NOT NULL REFERENCES video_sessions(id) ON DELETE CASCADE,
		question_text TEXT NOT NULL,
		options TEXT NOT NULL,
		correct_answer INTEGER NOT NULL,
		points INTEGER NOT NULL DEFAULT 10,
		"order" INTEGER NOT NULL DEFAULT 0
	)`,

	`CREATE TABLE IF NOT EXISTS lesson_progress (
		id SERIAL PRIMARY KEY,
		user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
		lesson_id TEXT NOT NULL,
		watched_seconds INTEGER NOT NULL DEFAULT 0,
		video_completed BOOLEAN NOT NULL DEFAULT FALSE,
		quiz_passed BOOLEAN NOT NULL DEFAULT FALSE,
		quiz_score INTEGER DEFAULT 0,
		completed_at TEXT,
		updated_at TEXT NOT NULL DEFAULT (${PG_UTC_NOW}),
		last_video_id TEXT,
		completed_video_ids_json TEXT DEFAULT '[]'
	)`,

	`CREATE TABLE IF NOT EXISTS exam_results (
		id SERIAL PRIMARY KEY,
		user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
		score INTEGER NOT NULL,
		total_questions INTEGER NOT NULL,
		completed_at TEXT NOT NULL DEFAULT (${PG_UTC_NOW}),
		lesson_id TEXT NOT NULL,
		passed BOOLEAN NOT NULL DEFAULT FALSE
	)`,

	`CREATE TABLE IF NOT EXISTS exam_overrides (
		id SERIAL PRIMARY KEY,
		user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
		lesson_id TEXT NOT NULL,
		extra_attempts INTEGER NOT NULL DEFAULT 0,
		granted_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
		created_at TEXT NOT NULL DEFAULT (${PG_UTC_NOW}),
		updated_at TEXT
	)`,

	`CREATE TABLE IF NOT EXISTS student_grades (
		id SERIAL PRIMARY KEY,
		student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
		lesson_id TEXT NOT NULL,
		graded_by INTEGER NOT NULL REFERENCES users(id) ON DELETE NO ACTION,
		score INTEGER NOT NULL,
		max_score INTEGER NOT NULL DEFAULT 100,
		feedback TEXT,
		created_at TEXT NOT NULL DEFAULT (${PG_UTC_NOW}),
		updated_at TEXT
	)`,

	`CREATE TABLE IF NOT EXISTS transcript_edits (
		id SERIAL PRIMARY KEY,
		video_id INTEGER NOT NULL REFERENCES video_sessions(id) ON DELETE CASCADE,
		edited_by INTEGER NOT NULL REFERENCES users(id) ON DELETE NO ACTION,
		original_text TEXT,
		edited_text TEXT NOT NULL,
		edit_type TEXT NOT NULL,
		status TEXT NOT NULL DEFAULT 'pending',
		reviewed_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
		created_at TEXT NOT NULL DEFAULT (${PG_UTC_NOW}),
		updated_at TEXT
	)`
];

const SERIAL_TABLES = [
	'users',
	'comments',
	'ratings',
	'view_stats',
	'notifications',
	'quiz_attempts',
	'attempt_answers',
	'badge_definitions',
	'user_badges',
	'user_points',
	'user_bookmarks',
	'user_mistakes',
	'voucher_codes',
	'voucher_redemptions',
	'payment_orders',
	'billing_audit_logs',
	'tracks',
	'lessons',
	'video_sessions',
	'questions',
	'lesson_progress',
	'exam_results',
	'exam_overrides',
	'student_grades',
	'transcript_edits'
];

const VERIFIED_TABLES = [
	'users',
	'sessions',
	'comments',
	'ratings',
	'view_stats',
	'notifications',
	'quiz_attempts',
	'attempt_answers',
	'badge_definitions',
	'user_badges',
	'user_points',
	'user_bookmarks',
	'user_mistakes',
	'voucher_codes',
	'voucher_redemptions',
	'payment_orders',
	'tracks',
	'lessons',
	'video_sessions',
	'questions',
	'lesson_progress',
	'exam_results',
	'exam_overrides',
	'student_grades',
	'transcript_edits'
];

async function main() {
	console.log(`Source SQLite DB: ${SQLITE_PATH}`);
	const sqlite = new Database(SQLITE_PATH, { readonly: true });

	try {
		// 1. Create schema idempotently
		console.log('1/4 Creating PostgreSQL tables & indexes idempotently...');
		for (const ddl of DDL_STATEMENTS) {
			await pgRun(ddl);
		}
		console.log(`    Applied ${DDL_STATEMENTS.length} DDL statements.`);

		// 2. Copy all rows inside a single PostgreSQL transaction
		console.log('2/4 Copying rows from SQLite to PostgreSQL...');
		await pgTx(async (tx) => {
			// --- users (pass 1: teacher_id = NULL, pass 2: restore teacher_id) ---
			const usersRows = sqlite.query('SELECT * FROM users ORDER BY id').all() as any[];
			for (const r of usersRows) {
				await pgRun(
					`INSERT INTO users (
						id, username, email, password_hash, name, role, avatar, is_active,
						teacher_id, year_id, stream_id, wilaya, subscription_tier,
						subscription_expires_at, streak_days, last_active_date, created_at, updated_at
					) VALUES (
						$1, $2, $3, $4, $5, $6, $7, $8,
						NULL, $9, $10, $11, $12,
						$13, $14, $15, $16, $17
					) ON CONFLICT (id) DO NOTHING`,
					[
						r.id,
						r.username ?? null,
						r.email,
						r.password_hash,
						r.name,
						r.role ?? 'student',
						r.avatar ?? null,
						toBool(r.is_active),
						r.year_id ?? null,
						r.stream_id ?? null,
						r.wilaya ?? null,
						r.subscription_tier ?? 'free',
						r.subscription_expires_at ?? null,
						Number(r.streak_days ?? 0),
						r.last_active_date ?? null,
						r.created_at ?? new Date().toISOString(),
						r.updated_at ?? null
					],
					tx
				);
			}
			for (const r of usersRows) {
				if (r.teacher_id != null) {
					await pgRun(
						'UPDATE users SET teacher_id = $1 WHERE id = $2 AND teacher_id IS NULL',
						[r.teacher_id, r.id],
						tx
					);
				}
			}

			// --- sessions ---
			for (const r of sqlite.query('SELECT * FROM sessions').all() as any[]) {
				await pgRun(
					`INSERT INTO sessions (id, user_id, expires_at, created_at)
					 VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING`,
					[r.id, r.user_id, r.expires_at, r.created_at ?? new Date().toISOString()],
					tx
				);
			}

			// --- badge_definitions ---
			for (const r of sqlite.query('SELECT * FROM badge_definitions ORDER BY id').all() as any[]) {
				await pgRun(
					`INSERT INTO badge_definitions (id, slug, name, name_ar, description, icon, color, condition, points, created_at)
					 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ON CONFLICT (id) DO NOTHING`,
					[
						r.id,
						r.slug,
						r.name,
						r.name_ar,
						r.description ?? null,
						r.icon,
						r.color ?? '#3b82f6',
						r.condition,
						r.points ?? 10,
						r.created_at ?? new Date().toISOString()
					],
					tx
				);
			}

			// --- comments ---
			for (const r of sqlite.query('SELECT * FROM comments ORDER BY id').all() as any[]) {
				await pgRun(
					`INSERT INTO comments (id, document_id, user_id, author_name, content, created_at)
					 VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO NOTHING`,
					[r.id, r.document_id, r.user_id ?? null, r.author_name, r.content, r.created_at],
					tx
				);
			}

			// --- ratings ---
			for (const r of sqlite.query('SELECT * FROM ratings ORDER BY id').all() as any[]) {
				await pgRun(
					`INSERT INTO ratings (id, document_id, user_id, fingerprint, rating, created_at)
					 VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO NOTHING`,
					[r.id, r.document_id, r.user_id ?? null, r.fingerprint, r.rating, r.created_at],
					tx
				);
			}

			// --- view_stats ---
			for (const r of sqlite.query('SELECT * FROM view_stats ORDER BY id').all() as any[]) {
				await pgRun(
					`INSERT INTO view_stats (id, document_id, date, views, downloads)
					 VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING`,
					[r.id, r.document_id, r.date, Number(r.views ?? 0), Number(r.downloads ?? 0)],
					tx
				);
			}

			// --- notifications ---
			for (const r of sqlite.query('SELECT * FROM notifications ORDER BY id').all() as any[]) {
				await pgRun(
					`INSERT INTO notifications (id, title, body, type, document_id, created_at)
					 VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO NOTHING`,
					[r.id, r.title, r.body ?? null, r.type ?? 'announcement', r.document_id ?? null, r.created_at],
					tx
				);
			}

			// --- quiz_attempts ---
			for (const r of sqlite.query('SELECT * FROM quiz_attempts ORDER BY id').all() as any[]) {
				await pgRun(
					`INSERT INTO quiz_attempts (id, quiz_id, user_id, fingerprint, score, total_points, percentage, time_taken, completed_at, created_at)
					 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ON CONFLICT (id) DO NOTHING`,
					[
						r.id,
						r.quiz_id,
						r.user_id ?? null,
						r.fingerprint,
						r.score ?? 0,
						r.total_points ?? 0,
						r.percentage ?? 0,
						r.time_taken ?? 0,
						r.completed_at ?? null,
						r.created_at
					],
					tx
				);
			}

			// --- attempt_answers ---
			for (const r of sqlite.query('SELECT * FROM attempt_answers ORDER BY id').all() as any[]) {
				await pgRun(
					`INSERT INTO attempt_answers (id, attempt_id, question_id, answer, is_correct, points_earned)
					 VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO NOTHING`,
					[
						r.id,
						r.attempt_id,
						r.question_id,
						r.answer,
						Number(r.is_correct ?? 0),
						Number(r.points_earned ?? 0)
					],
					tx
				);
			}

			// --- user_badges ---
			for (const r of sqlite.query('SELECT * FROM user_badges ORDER BY id').all() as any[]) {
				await pgRun(
					`INSERT INTO user_badges (id, user_id, fingerprint, badge_id, earned_at)
					 VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING`,
					[r.id, r.user_id ?? null, r.fingerprint, r.badge_id, r.earned_at ?? new Date().toISOString()],
					tx
				);
			}

			// --- user_points ---
			for (const r of sqlite.query('SELECT * FROM user_points ORDER BY id').all() as any[]) {
				await pgRun(
					`INSERT INTO user_points (id, user_id, fingerprint, points, reason, quiz_id, earned_at)
					 VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (id) DO NOTHING`,
					[
						r.id,
						r.user_id ?? null,
						r.fingerprint,
						r.points,
						r.reason,
						r.quiz_id ?? null,
						r.earned_at ?? new Date().toISOString()
					],
					tx
				);
			}

			// --- user_bookmarks ---
			for (const r of sqlite.query('SELECT * FROM user_bookmarks ORDER BY id').all() as any[]) {
				await pgRun(
					`INSERT INTO user_bookmarks (id, user_id, item_type, item_id, created_at)
					 VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING`,
					[r.id, r.user_id, r.item_type, r.item_id, r.created_at],
					tx
				);
			}

			// --- user_mistakes ---
			for (const r of sqlite.query('SELECT * FROM user_mistakes ORDER BY id').all() as any[]) {
				await pgRun(
					`INSERT INTO user_mistakes (id, user_id, fingerprint, question_id, quiz_id, wrong_count, last_attempt_at, resolved)
					 VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT (id) DO NOTHING`,
					[
						r.id,
						r.user_id ?? null,
						r.fingerprint ?? null,
						r.question_id,
						r.quiz_id ?? null,
						Number(r.wrong_count ?? 1),
						r.last_attempt_at,
						toBool(r.resolved)
					],
					tx
				);
			}

			// --- voucher_codes ---
			for (const r of sqlite.query('SELECT * FROM voucher_codes ORDER BY id').all() as any[]) {
				await pgRun(
					`INSERT INTO voucher_codes (id, code, plan_days, max_uses, used_count, is_active, created_by, expires_at, created_at)
					 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT (id) DO NOTHING`,
					[
						r.id,
						r.code,
						Number(r.plan_days ?? 30),
						Number(r.max_uses ?? 1),
						Number(r.used_count ?? 0),
						toBool(r.is_active),
						r.created_by ?? null,
						r.expires_at ?? null,
						r.created_at
					],
					tx
				);
			}

			// --- voucher_redemptions ---
			for (const r of sqlite.query('SELECT * FROM voucher_redemptions ORDER BY id').all() as any[]) {
				await pgRun(
					`INSERT INTO voucher_redemptions (id, voucher_id, user_id, redeemed_at)
					 VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING`,
					[r.id, r.voucher_id, r.user_id, r.redeemed_at],
					tx
				);
			}

			// --- payment_orders ---
			for (const r of sqlite.query('SELECT * FROM payment_orders ORDER BY id').all() as any[]) {
				await pgRun(
					`INSERT INTO payment_orders (id, user_id, provider, amount_dzd, plan_days, status, checkout_id, receipt_url, metadata, created_at, updated_at)
					 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ON CONFLICT (id) DO NOTHING`,
					[
						r.id,
						r.user_id,
						r.provider,
						r.amount_dzd,
						Number(r.plan_days ?? 30),
						r.status ?? 'pending',
						r.checkout_id ?? null,
						r.receipt_url ?? null,
						r.metadata ?? null,
						r.created_at,
						r.updated_at ?? null
					],
					tx
				);
			}

			// --- tracks ---
			for (const r of sqlite.query('SELECT * FROM tracks ORDER BY id').all() as any[]) {
				await pgRun(
					`INSERT INTO tracks (id, name, description, icon, color, "order", is_published)
					 VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (id) DO NOTHING`,
					[r.id, r.name, r.description ?? null, r.icon ?? null, r.color ?? null, Number(r.order ?? 0), toBool(r.is_published)],
					tx
				);
			}

			// --- lessons ---
			for (const r of sqlite.query('SELECT * FROM lessons ORDER BY id').all() as any[]) {
				await pgRun(
					`INSERT INTO lessons (id, track_id, title, description, instructor, thumbnail, level, "order", is_published)
					 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT (id) DO NOTHING`,
					[
						r.id,
						r.track_id,
						r.title,
						r.description ?? null,
						r.instructor ?? null,
						r.thumbnail ?? null,
						r.level ?? 'beginner',
						Number(r.order ?? 0),
						toBool(r.is_published)
					],
					tx
				);
			}

			// --- video_sessions ---
			for (const r of sqlite.query('SELECT * FROM video_sessions ORDER BY id').all() as any[]) {
				await pgRun(
					`INSERT INTO video_sessions (id, lesson_id, title, youtube_url, duration, transcript, summary, pdf_url, "order")
					 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT (id) DO NOTHING`,
					[
						r.id,
						r.lesson_id,
						r.title,
						r.youtube_url ?? null,
						r.duration ?? null,
						r.transcript ?? null,
						r.summary ?? null,
						r.pdf_url ?? null,
						Number(r.order ?? 0)
					],
					tx
				);
			}

			// --- questions ---
			for (const r of sqlite.query('SELECT * FROM questions ORDER BY id').all() as any[]) {
				await pgRun(
					`INSERT INTO questions (id, session_id, question_text, options, correct_answer, points, "order")
					 VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (id) DO NOTHING`,
					[r.id, r.session_id, r.question_text, r.options, r.correct_answer, Number(r.points ?? 10), Number(r.order ?? 0)],
					tx
				);
			}

			// --- lesson_progress ---
			for (const r of sqlite.query('SELECT * FROM lesson_progress ORDER BY id').all() as any[]) {
				await pgRun(
					`INSERT INTO lesson_progress (id, user_id, lesson_id, watched_seconds, video_completed, quiz_passed, quiz_score, completed_at, updated_at, last_video_id, completed_video_ids_json)
					 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ON CONFLICT (id) DO NOTHING`,
					[
						r.id,
						r.user_id,
						r.lesson_id,
						Number(r.watched_seconds ?? 0),
						toBool(r.video_completed),
						toBool(r.quiz_passed),
						r.quiz_score ?? 0,
						r.completed_at ?? null,
						r.updated_at,
						r.last_video_id ?? null,
						r.completed_video_ids_json ?? '[]'
					],
					tx
				);
			}

			// --- exam_results ---
			for (const r of sqlite.query('SELECT * FROM exam_results ORDER BY id').all() as any[]) {
				await pgRun(
					`INSERT INTO exam_results (id, user_id, score, total_questions, completed_at, lesson_id, passed)
					 VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (id) DO NOTHING`,
					[r.id, r.user_id, r.score, r.total_questions, r.completed_at, r.lesson_id, toBool(r.passed)],
					tx
				);
			}

			// --- exam_overrides ---
			for (const r of sqlite.query('SELECT * FROM exam_overrides ORDER BY id').all() as any[]) {
				await pgRun(
					`INSERT INTO exam_overrides (id, user_id, lesson_id, extra_attempts, granted_by, created_at, updated_at)
					 VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (id) DO NOTHING`,
					[
						r.id,
						r.user_id,
						r.lesson_id,
						Number(r.extra_attempts ?? 0),
						r.granted_by ?? null,
						r.created_at,
						r.updated_at ?? null
					],
					tx
				);
			}

			// --- student_grades ---
			for (const r of sqlite.query('SELECT * FROM student_grades ORDER BY id').all() as any[]) {
				await pgRun(
					`INSERT INTO student_grades (id, student_id, lesson_id, graded_by, score, max_score, feedback, created_at, updated_at)
					 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT (id) DO NOTHING`,
					[
						r.id,
						r.student_id,
						r.lesson_id,
						r.graded_by,
						r.score,
						Number(r.max_score ?? 100),
						r.feedback ?? null,
						r.created_at,
						r.updated_at ?? null
					],
					tx
				);
			}

			// --- transcript_edits ---
			for (const r of sqlite.query('SELECT * FROM transcript_edits ORDER BY id').all() as any[]) {
				await pgRun(
					`INSERT INTO transcript_edits (id, video_id, edited_by, original_text, edited_text, edit_type, status, reviewed_by, created_at, updated_at)
					 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ON CONFLICT (id) DO NOTHING`,
					[
						r.id,
						r.video_id,
						r.edited_by,
						r.original_text ?? null,
						r.edited_text,
						r.edit_type,
						r.status ?? 'pending',
						r.reviewed_by ?? null,
						r.created_at,
						r.updated_at ?? null
					],
					tx
				);
			}
		});

		// 3. Reset all PostgreSQL serial sequences
		console.log('3/4 Resetting PostgreSQL serial sequences...');
		for (const table of SERIAL_TABLES) {
			await pgRun(
				`SELECT setval(
					pg_get_serial_sequence('public.${table}', 'id'),
					COALESCE((SELECT MAX(id) FROM "${table}"), 1),
					(SELECT COUNT(*) > 0 FROM "${table}")
				)`
			);
		}

		// 4. Verify row-count parity for every table
		console.log('4/4 Verifying row-count parity (SQLite vs PostgreSQL)...');
		const mismatches: string[] = [];
		let pgUsersCount = 0;

		console.log('\nTable                    | SQLite | PostgreSQL | Status');
		console.log('-------------------------+--------+------------+-------');
		for (const table of VERIFIED_TABLES) {
			const sqRow = sqlite.query(`SELECT COUNT(*) as c FROM "${table}"`).get() as { c: number };
			const pgRow = await pgGet<{ c: number }>(`SELECT COUNT(*)::int as c FROM "${table}"`);
			const sqCount = Number(sqRow?.c ?? 0);
			const pgCount = Number(pgRow?.c ?? 0);
			if (table === 'users') pgUsersCount = pgCount;
			const ok = sqCount === pgCount;
			if (!ok) mismatches.push(`${table}: sqlite=${sqCount} != pg=${pgCount}`);
			console.log(
				`${table.padEnd(24)} | ${String(sqCount).padStart(6)} | ${String(pgCount).padStart(10)} | ${ok ? 'OK' : 'MISMATCH'}`
			);
		}

		const auditRow = await pgGet<{ c: number }>('SELECT COUNT(*)::int as c FROM billing_audit_logs');
		console.log(
			`${'billing_audit_logs'.padEnd(24)} | ${'N/A'.padStart(6)} | ${String(auditRow?.c ?? 0).padStart(10)} | NEW`
		);

		if (mismatches.length > 0) {
			throw new Error(`Row-count parity check failed:\n${mismatches.join('\n')}`);
		}
		if (pgUsersCount !== 21) {
			throw new Error(`Expected 21 users in PostgreSQL, got ${pgUsersCount}`);
		}

		const allPgTables = await pgAll<{ tablename: string }>(
			"SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename"
		);
		console.log(`\n✅ Migration complete! Total PostgreSQL tables: ${allPgTables.length}. Users verified: ${pgUsersCount}.`);
	} finally {
		sqlite.close();
		await usersSql.close();
	}
}

main().catch((err) => {
	console.error('❌ Migration failed:', err);
	process.exit(1);
});
