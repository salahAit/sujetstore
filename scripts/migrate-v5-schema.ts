import { Database } from 'bun:sqlite';
import { randomBytes } from 'node:crypto';
import { resolve } from 'node:path';
import { usersSql } from '../src/lib/server/db/users-pg';

const CONTENT_DB_PATH = resolve('data/content.db');

async function migrateSqliteContent() {
	const db = new Database(CONTENT_DB_PATH);
	db.exec('PRAGMA journal_mode = WAL;');

	// 1. Add public_token column to documents if missing
	const cols = db.query('PRAGMA table_info(documents)').all() as Array<{ name: string }>;
	if (!cols.some((c) => c.name === 'public_token')) {
		db.exec('ALTER TABLE documents ADD COLUMN public_token TEXT;');
		console.log('Added documents.public_token column');
	}
	db.exec('CREATE UNIQUE INDEX IF NOT EXISTS idx_docs_public_token ON documents(public_token);');
	db.exec(
		'CREATE INDEX IF NOT EXISTS idx_docs_ys_pub_trim ON documents(year_subject_id, is_published, trimester_id, type);'
	);

	// Backfill public_token for all documents missing one
	const missingRows = db
		.query("SELECT id FROM documents WHERE public_token IS NULL OR public_token = ''")
		.all() as Array<{ id: number }>;

	if (missingRows.length > 0) {
		const updateStmt = db.prepare('UPDATE documents SET public_token = ? WHERE id = ?');
		const tx = db.transaction(() => {
			for (const r of missingRows) {
				const token = randomBytes(16).toString('base64url');
				updateStmt.run(token, r.id);
			}
		});
		tx();
		console.log(`Backfilled public_token for ${missingRows.length} documents`);
	}

	// 2. Typst Style Profiles table
	db.exec(`
		CREATE TABLE IF NOT EXISTS typst_style_profiles (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			scope_type TEXT NOT NULL,
			scope_value TEXT NOT NULL,
			label_ar TEXT NOT NULL,
			config_json TEXT NOT NULL,
			is_active INTEGER NOT NULL DEFAULT 1,
			updated_at TEXT NOT NULL DEFAULT (datetime('now')),
			UNIQUE(scope_type, scope_value)
		);
	`);

	// Seed default global style profile if absent
	const defaultGlobalStyle = JSON.stringify({
		bodyFont: 'Arabic Transparent',
		headingFont: 'Arabic Transparent',
		ltrBodyFont: 'EB Garamond',
		ltrHeadingFont: 'Montserrat',
		bodySizePt: 11,
		headingSizePt: 13.5,
		tableFontSizePt: 10,
		lineLeadingEm: 0.72,
		marginMm: 14,
		headerLayout: 'classic_ministry',
		showLogo: true,
		logoWidthMm: 16,
		showQr: true,
		qrUrl: 'https://sujetstore.com',
		accentColor: '#064E3B',
		headerArRight: 'الجمهورية الجزائرية الديمقراطية الشعبية',
		headerArLeft: 'منصة SujetStore التعليمية',
		headerFrLeft: 'Plateforme éducative algérienne',
		headerEnLeft: 'Algerian Educational Platform',
		footerAr: 'منصة SujetStore — بالتوفيق لجميع التلاميذ',
		footerFr: 'SujetStore.com — Bonne chance à tous les élèves',
		footerEn: 'SujetStore.com — Best of luck to all students'
	});

	db.prepare(
		`INSERT OR IGNORE INTO typst_style_profiles (scope_type, scope_value, label_ar, config_json, is_active)
		 VALUES ('global', 'default', 'الإعداد العام الافتراضي لجميع المواضيع', ?, 1)`
	).run(defaultGlobalStyle);

	// 3. Interactive Video Studio tables
	db.exec(`
		CREATE TABLE IF NOT EXISTS videos (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			year_subject_id INTEGER NOT NULL REFERENCES year_subjects(id),
			trimester_id TEXT REFERENCES trimesters(id),
			lesson_id INTEGER REFERENCES documents(id) ON DELETE SET NULL,
			slug TEXT NOT NULL UNIQUE,
			title TEXT NOT NULL,
			title_ar TEXT NOT NULL,
			description TEXT,
			provider TEXT NOT NULL DEFAULT 'youtube',
			external_id TEXT NOT NULL,
			embed_url TEXT NOT NULL,
			duration_sec INTEGER NOT NULL DEFAULT 0,
			thumbnail_url TEXT,
			access_tier TEXT NOT NULL DEFAULT 'public',
			is_published INTEGER NOT NULL DEFAULT 1,
			created_at TEXT NOT NULL DEFAULT (datetime('now')),
			updated_at TEXT
		);
		CREATE INDEX IF NOT EXISTS idx_videos_ys_pub ON videos(year_subject_id, is_published);

		CREATE TABLE IF NOT EXISTS video_transcript_segments (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			video_id INTEGER NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
			seq_index INTEGER NOT NULL,
			start_sec INTEGER NOT NULL,
			end_sec INTEGER NOT NULL,
			text_ar TEXT NOT NULL,
			text_normalized TEXT NOT NULL
		);
		CREATE INDEX IF NOT EXISTS idx_vts_video_seq ON video_transcript_segments(video_id, seq_index);

		CREATE TABLE IF NOT EXISTS video_cue_questions (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			video_id INTEGER NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
			trigger_sec INTEGER NOT NULL,
			question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
			is_mandatory INTEGER NOT NULL DEFAULT 0,
			pause_video INTEGER NOT NULL DEFAULT 1
		);
		CREATE INDEX IF NOT EXISTS idx_vcq_video_time ON video_cue_questions(video_id, trigger_sec);
	`);

	const totalTokens = db
		.query("SELECT COUNT(*) as c FROM documents WHERE public_token IS NOT NULL AND public_token != ''")
		.get() as { c: number };
	const totalDocs = db.query('SELECT COUNT(*) as c FROM documents').get() as { c: number };
	db.close();
	console.log(`✅ SQLite content.db v5 migration complete (${totalTokens.c}/${totalDocs.c} docs have public_token)`);
}

async function migratePostgres() {
	const ddls = [
		`CREATE TABLE IF NOT EXISTS platform_settings (
			key TEXT PRIMARY KEY,
			value TEXT NOT NULL,
			updated_at TEXT NOT NULL DEFAULT (to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS'))
		)`,
		`CREATE TABLE IF NOT EXISTS platform_modules (
			module_id TEXT PRIMARY KEY,
			version TEXT NOT NULL,
			tier TEXT NOT NULL DEFAULT 'optional',
			category TEXT NOT NULL DEFAULT 'learning',
			enabled BOOLEAN NOT NULL DEFAULT TRUE,
			config_json TEXT NOT NULL DEFAULT '{}',
			updated_at TEXT NOT NULL DEFAULT (to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS'))
		)`,
		`CREATE TABLE IF NOT EXISTS media_download_logs (
			id SERIAL PRIMARY KEY,
			user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
			ip_hash TEXT NOT NULL,
			document_id INTEGER NOT NULL,
			kind TEXT NOT NULL DEFAULT 'subject',
			created_at TEXT NOT NULL DEFAULT (to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS'))
		)`,
		`CREATE INDEX IF NOT EXISTS idx_media_dl_user_time ON media_download_logs(user_id, created_at)`,
		`CREATE INDEX IF NOT EXISTS idx_media_dl_ip_time ON media_download_logs(ip_hash, created_at)`,
		`CREATE TABLE IF NOT EXISTS activity_audit_logs (
			id SERIAL PRIMARY KEY,
			user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
			user_email TEXT,
			user_role TEXT,
			event_type TEXT NOT NULL,
			path TEXT NOT NULL,
			resource_id TEXT,
			ip_address TEXT NOT NULL,
			country_code TEXT,
			country_name TEXT,
			region_city TEXT,
			device_type TEXT NOT NULL DEFAULT 'desktop',
			os_name TEXT NOT NULL DEFAULT 'Unknown',
			browser_name TEXT NOT NULL DEFAULT 'Unknown',
			user_agent TEXT,
			status_code INTEGER NOT NULL DEFAULT 200,
			created_at TEXT NOT NULL DEFAULT (to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS'))
		)`,
		`CREATE INDEX IF NOT EXISTS idx_audit_created ON activity_audit_logs(created_at)`,
		`CREATE INDEX IF NOT EXISTS idx_audit_user ON activity_audit_logs(user_id, created_at)`,
		`CREATE INDEX IF NOT EXISTS idx_audit_event ON activity_audit_logs(event_type, created_at)`,
		`CREATE TABLE IF NOT EXISTS video_watch_progress (
			id SERIAL PRIMARY KEY,
			user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
			video_id INTEGER NOT NULL,
			last_position_sec INTEGER NOT NULL DEFAULT 0,
			completed BOOLEAN NOT NULL DEFAULT FALSE,
			answered_cues_json TEXT NOT NULL DEFAULT '[]',
			updated_at TEXT NOT NULL DEFAULT (to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS')),
			UNIQUE(user_id, video_id)
		)`,
		`CREATE TABLE IF NOT EXISTS api_tokens (
			id SERIAL PRIMARY KEY,
			user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
			token_hash TEXT NOT NULL UNIQUE,
			label TEXT NOT NULL DEFAULT 'mobile-client',
			expires_at TEXT NOT NULL,
			last_used_at TEXT,
			created_at TEXT NOT NULL DEFAULT (to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS'))
		)`,
		`CREATE INDEX IF NOT EXISTS idx_api_tokens_user ON api_tokens(user_id)`
	];

	for (const ddl of ddls) {
		await usersSql.unsafe(ddl);
	}
	console.log('✅ PostgreSQL 17 v5 schema migration complete (6 new tables + indexes)');
}

async function main() {
	await migrateSqliteContent();
	await migratePostgres();
}

main()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error('❌ v5 schema migration failed:', err);
		process.exit(1);
	});
