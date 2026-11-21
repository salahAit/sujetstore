import {
	pgTable,
	serial,
	integer,
	text,
	boolean,
	doublePrecision,
	index,
	uniqueIndex,
	type AnyPgColumn
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// UTC timestamp text matching SQLite's datetime('now') format ('YYYY-MM-DD HH:MM:SS')
const PG_UTC_NOW = sql`to_char(NOW() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS')`;

// ============================================
// USERS & AUTHENTICATION (PostgreSQL 17)
// ============================================

export const users = pgTable(
	'users',
	{
		id: serial('id').primaryKey(),
		username: text('username').unique(),
		email: text('email').notNull().unique(),
		passwordHash: text('password_hash').notNull(),
		name: text('name').notNull(),
		role: text('role', { enum: ['superadmin', 'admin', 'editor', 'student'] })
			.default('student')
			.notNull(),
		avatar: text('avatar'),
		isActive: boolean('is_active').default(true).notNull(),
		teacherId: integer('teacher_id').references((): AnyPgColumn => users.id, { onDelete: 'set null' }),
		yearId: text('year_id'),
		streamId: text('stream_id'),
		wilaya: text('wilaya'),
		subscriptionTier: text('subscription_tier', { enum: ['free', 'premium'] })
			.default('free')
			.notNull(),
		subscriptionExpiresAt: text('subscription_expires_at'),
		streakDays: integer('streak_days').default(0).notNull(),
		lastActiveDate: text('last_active_date'),
		createdAt: text('created_at').default(PG_UTC_NOW).notNull(),
		updatedAt: text('updated_at')
	},
	(table) => [
		uniqueIndex('users_username_unique').on(table.username),
		uniqueIndex('users_email_unique').on(table.email)
	]
);

export const sessions = pgTable(
	'sessions',
	{
		id: text('id').primaryKey(),
		userId: integer('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		expiresAt: text('expires_at').notNull(),
		createdAt: text('created_at').default(PG_UTC_NOW).notNull()
	},
	(table) => [index('idx_sessions_user').on(table.userId)]
);

// ============================================
// COMMENTS, RATINGS, VIEW STATS, NOTIFICATIONS
// ============================================

export const comments = pgTable(
	'comments',
	{
		id: serial('id').primaryKey(),
		documentId: integer('document_id').notNull(),
		userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
		authorName: text('author_name').notNull(),
		content: text('content').notNull(),
		createdAt: text('created_at').default(PG_UTC_NOW).notNull()
	},
	(table) => [index('idx_comments_doc').on(table.documentId)]
);

export const ratings = pgTable(
	'ratings',
	{
		id: serial('id').primaryKey(),
		documentId: integer('document_id').notNull(),
		userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
		fingerprint: text('fingerprint').notNull(),
		rating: integer('rating').notNull(),
		createdAt: text('created_at').default(PG_UTC_NOW).notNull()
	},
	(table) => [uniqueIndex('idx_ratings_unique').on(table.documentId, table.fingerprint)]
);

export const viewStats = pgTable(
	'view_stats',
	{
		id: serial('id').primaryKey(),
		documentId: integer('document_id').notNull(),
		date: text('date').notNull(), // YYYY-MM-DD
		views: integer('views').default(0).notNull(),
		downloads: integer('downloads').default(0).notNull()
	},
	(table) => [index('idx_view_stats_doc_date').on(table.documentId, table.date)]
);

export const notifications = pgTable('notifications', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	body: text('body'),
	type: text('type', { enum: ['new_doc', 'announcement', 'update'] })
		.default('announcement')
		.notNull(),
	documentId: integer('document_id'),
	createdAt: text('created_at').default(PG_UTC_NOW).notNull()
});

// ============================================
// QUIZZES & ATTEMPTS
// ============================================

export const quizAttempts = pgTable(
	'quiz_attempts',
	{
		id: serial('id').primaryKey(),
		quizId: integer('quiz_id').notNull(),
		userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
		fingerprint: text('fingerprint').notNull(),
		score: integer('score').default(0),
		totalPoints: integer('total_points').default(0),
		percentage: doublePrecision('percentage').default(0),
		timeTaken: integer('time_taken').default(0),
		completedAt: text('completed_at'),
		createdAt: text('created_at').default(PG_UTC_NOW).notNull()
	},
	(table) => [
		index('idx_attempts_quiz').on(table.quizId),
		index('idx_attempts_user').on(table.userId)
	]
);

export const attemptAnswers = pgTable(
	'attempt_answers',
	{
		id: serial('id').primaryKey(),
		attemptId: integer('attempt_id')
			.references(() => quizAttempts.id, { onDelete: 'cascade' })
			.notNull(),
		questionId: integer('question_id').notNull(),
		answer: text('answer').notNull(), // JSON
		isCorrect: integer('is_correct').default(0).notNull(),
		pointsEarned: integer('points_earned').default(0).notNull()
	},
	(table) => [index('idx_attempt_answers_attempt').on(table.attemptId)]
);

// ============================================
// GAMIFICATION
// ============================================

export const badgeDefinitions = pgTable('badge_definitions', {
	id: serial('id').primaryKey(),
	slug: text('slug').notNull().unique(),
	name: text('name').notNull(),
	nameAr: text('name_ar').notNull(),
	description: text('description'),
	icon: text('icon').notNull(),
	color: text('color').default('#3b82f6'),
	condition: text('condition').notNull(), // JSON
	points: integer('points').default(10),
	createdAt: text('created_at').default(PG_UTC_NOW).notNull()
});

export const userBadges = pgTable(
	'user_badges',
	{
		id: serial('id').primaryKey(),
		userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
		fingerprint: text('fingerprint').notNull(),
		badgeId: integer('badge_id')
			.references(() => badgeDefinitions.id, { onDelete: 'cascade' })
			.notNull(),
		earnedAt: text('earned_at').default(PG_UTC_NOW).notNull()
	},
	(table) => [index('idx_badges_user').on(table.userId)]
);

export const userPoints = pgTable(
	'user_points',
	{
		id: serial('id').primaryKey(),
		userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
		fingerprint: text('fingerprint').notNull(),
		points: integer('points').notNull(),
		reason: text('reason').notNull(),
		quizId: integer('quiz_id'),
		earnedAt: text('earned_at').default(PG_UTC_NOW).notNull()
	},
	(table) => [index('idx_points_user').on(table.userId)]
);

// ============================================
// STUDENT BOOKMARKS & MISTAKE NOTEBOOK
// ============================================

export const userBookmarks = pgTable(
	'user_bookmarks',
	{
		id: serial('id').primaryKey(),
		userId: integer('user_id')
			.references(() => users.id, { onDelete: 'cascade' })
			.notNull(),
		itemType: text('item_type', { enum: ['document', 'quiz'] }).notNull(),
		itemId: integer('item_id').notNull(),
		createdAt: text('created_at').default(PG_UTC_NOW).notNull()
	},
	(table) => [uniqueIndex('idx_bookmarks_unique').on(table.userId, table.itemType, table.itemId)]
);

export const userMistakes = pgTable(
	'user_mistakes',
	{
		id: serial('id').primaryKey(),
		userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
		fingerprint: text('fingerprint'),
		questionId: integer('question_id').notNull(),
		quizId: integer('quiz_id'),
		wrongCount: integer('wrong_count').default(1).notNull(),
		lastAttemptAt: text('last_attempt_at').default(PG_UTC_NOW).notNull(),
		resolved: boolean('resolved').default(false).notNull()
	},
	(table) => [
		index('idx_mistakes_user').on(table.userId, table.resolved),
		index('idx_mistakes_fp').on(table.fingerprint, table.resolved)
	]
);

// ============================================
// VOUCHERS, SUBSCRIPTION PAYMENTS & BILLING AUDIT
// ============================================

export const voucherCodes = pgTable('voucher_codes', {
	id: serial('id').primaryKey(),
	code: text('code').notNull().unique(),
	planDays: integer('plan_days').default(30).notNull(),
	maxUses: integer('max_uses').default(1).notNull(),
	usedCount: integer('used_count').default(0).notNull(),
	isActive: boolean('is_active').default(true).notNull(),
	createdBy: integer('created_by').references(() => users.id, { onDelete: 'set null' }),
	expiresAt: text('expires_at'),
	createdAt: text('created_at').default(PG_UTC_NOW).notNull()
});

export const voucherRedemptions = pgTable(
	'voucher_redemptions',
	{
		id: serial('id').primaryKey(),
		voucherId: integer('voucher_id')
			.references(() => voucherCodes.id, { onDelete: 'cascade' })
			.notNull(),
		userId: integer('user_id')
			.references(() => users.id, { onDelete: 'cascade' })
			.notNull(),
		redeemedAt: text('redeemed_at').default(PG_UTC_NOW).notNull()
	},
	(table) => [uniqueIndex('idx_redemption_unique').on(table.voucherId, table.userId)]
);

export const paymentOrders = pgTable(
	'payment_orders',
	{
		id: serial('id').primaryKey(),
		userId: integer('user_id')
			.references(() => users.id, { onDelete: 'cascade' })
			.notNull(),
		provider: text('provider', { enum: ['chargily', 'ccp_receipt', 'manual'] }).notNull(),
		amountDzd: integer('amount_dzd').notNull(),
		planDays: integer('plan_days').default(30).notNull(),
		status: text('status', { enum: ['pending', 'paid', 'failed', 'canceled'] })
			.default('pending')
			.notNull(),
		checkoutId: text('checkout_id'),
		receiptUrl: text('receipt_url'),
		metadata: text('metadata'),
		createdAt: text('created_at').default(PG_UTC_NOW).notNull(),
		updatedAt: text('updated_at')
	},
	(table) => [
		index('idx_payment_orders_checkout').on(table.checkoutId),
		index('idx_payment_orders_user').on(table.userId)
	]
);

// Immutable financial & subscription event ledger
export const billingAuditLogs = pgTable(
	'billing_audit_logs',
	{
		id: serial('id').primaryKey(),
		orderId: integer('order_id').references(() => paymentOrders.id, { onDelete: 'set null' }),
		userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
		eventType: text('event_type').notNull(),
		provider: text('provider').notNull(),
		externalId: text('external_id'),
		amountDzd: integer('amount_dzd').default(0).notNull(),
		status: text('status').notNull(),
		payload: text('payload'),
		createdAt: text('created_at').default(PG_UTC_NOW).notNull()
	},
	(table) => [
		index('idx_billing_audit_order').on(table.orderId),
		index('idx_billing_audit_user').on(table.userId),
		index('idx_billing_audit_external').on(table.externalId)
	]
);

// ============================================
// LEGACY LMS TABLES (Preserved from users.db)
// ============================================

export const tracks = pgTable('tracks', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	icon: text('icon'),
	color: text('color'),
	order: integer('order').default(0).notNull(),
	isPublished: boolean('is_published').default(false).notNull()
});

export const lessons = pgTable('lessons', {
	id: serial('id').primaryKey(),
	trackId: integer('track_id')
		.references(() => tracks.id, { onDelete: 'cascade' })
		.notNull(),
	title: text('title').notNull(),
	description: text('description'),
	instructor: text('instructor'),
	thumbnail: text('thumbnail'),
	level: text('level').default('beginner'),
	order: integer('order').default(0).notNull(),
	isPublished: boolean('is_published').default(false).notNull()
});

export const videoSessions = pgTable('video_sessions', {
	id: serial('id').primaryKey(),
	lessonId: integer('lesson_id')
		.references(() => lessons.id, { onDelete: 'cascade' })
		.notNull(),
	title: text('title').notNull(),
	youtubeUrl: text('youtube_url'),
	duration: text('duration'),
	transcript: text('transcript'),
	summary: text('summary'),
	pdfUrl: text('pdf_url'),
	order: integer('order').default(0).notNull()
});

export const questions = pgTable('questions', {
	id: serial('id').primaryKey(),
	sessionId: integer('session_id')
		.references(() => videoSessions.id, { onDelete: 'cascade' })
		.notNull(),
	questionText: text('question_text').notNull(),
	options: text('options').notNull(),
	correctAnswer: integer('correct_answer').notNull(),
	points: integer('points').default(10).notNull(),
	order: integer('order').default(0).notNull()
});

export const lessonProgress = pgTable('lesson_progress', {
	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.references(() => users.id, { onDelete: 'cascade' })
		.notNull(),
	lessonId: text('lesson_id').notNull(),
	watchedSeconds: integer('watched_seconds').default(0).notNull(),
	videoCompleted: boolean('video_completed').default(false).notNull(),
	quizPassed: boolean('quiz_passed').default(false).notNull(),
	quizScore: integer('quiz_score').default(0),
	completedAt: text('completed_at'),
	updatedAt: text('updated_at').default(PG_UTC_NOW).notNull(),
	lastVideoId: text('last_video_id'),
	completedVideoIdsJson: text('completed_video_ids_json').default('[]')
});

export const examResults = pgTable('exam_results', {
	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.references(() => users.id, { onDelete: 'cascade' })
		.notNull(),
	score: integer('score').notNull(),
	totalQuestions: integer('total_questions').notNull(),
	completedAt: text('completed_at').default(PG_UTC_NOW).notNull(),
	lessonId: text('lesson_id').notNull(),
	passed: boolean('passed').default(false).notNull()
});

export const examOverrides = pgTable('exam_overrides', {
	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.references(() => users.id, { onDelete: 'cascade' })
		.notNull(),
	lessonId: text('lesson_id').notNull(),
	extraAttempts: integer('extra_attempts').default(0).notNull(),
	grantedBy: integer('granted_by').references(() => users.id, { onDelete: 'set null' }),
	createdAt: text('created_at').default(PG_UTC_NOW).notNull(),
	updatedAt: text('updated_at')
});

export const studentGrades = pgTable('student_grades', {
	id: serial('id').primaryKey(),
	studentId: integer('student_id')
		.references(() => users.id, { onDelete: 'cascade' })
		.notNull(),
	lessonId: text('lesson_id').notNull(),
	gradedBy: integer('graded_by')
		.references(() => users.id, { onDelete: 'no action' })
		.notNull(),
	score: integer('score').notNull(),
	maxScore: integer('max_score').default(100).notNull(),
	feedback: text('feedback'),
	createdAt: text('created_at').default(PG_UTC_NOW).notNull(),
	updatedAt: text('updated_at')
});

export const transcriptEdits = pgTable('transcript_edits', {
	id: serial('id').primaryKey(),
	videoId: integer('video_id')
		.references(() => videoSessions.id, { onDelete: 'cascade' })
		.notNull(),
	editedBy: integer('edited_by')
		.references(() => users.id, { onDelete: 'no action' })
		.notNull(),
	originalText: text('original_text'),
	editedText: text('edited_text').notNull(),
	editType: text('edit_type').notNull(),
	status: text('status').default('pending').notNull(),
	reviewedBy: integer('reviewed_by').references(() => users.id, { onDelete: 'set null' }),
	createdAt: text('created_at').default(PG_UTC_NOW).notNull(),
	updatedAt: text('updated_at')
});

// ============================================
// V5.0 PLATFORM SETTINGS, MODULES, SECURITY & TELEMETRY
// ============================================

export const platformSettings = pgTable('platform_settings', {
	key: text('key').primaryKey(),
	value: text('value').notNull(),
	updatedAt: text('updated_at').default(PG_UTC_NOW).notNull()
});

export const platformModules = pgTable('platform_modules', {
	moduleId: text('module_id').primaryKey(),
	version: text('version').notNull(),
	tier: text('tier').default('optional').notNull(),
	category: text('category').default('learning').notNull(),
	enabled: boolean('enabled').default(true).notNull(),
	configJson: text('config_json').default('{}').notNull(),
	updatedAt: text('updated_at').default(PG_UTC_NOW).notNull()
});

export const mediaDownloadLogs = pgTable(
	'media_download_logs',
	{
		id: serial('id').primaryKey(),
		userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
		ipHash: text('ip_hash').notNull(),
		documentId: integer('document_id').notNull(),
		kind: text('kind').default('subject').notNull(),
		createdAt: text('created_at').default(PG_UTC_NOW).notNull()
	},
	(table) => ({
		userCreatedIdx: index('idx_media_dl_user_time').on(table.userId, table.createdAt),
		ipCreatedIdx: index('idx_media_dl_ip_time').on(table.ipHash, table.createdAt)
	})
);

export const activityAuditLogs = pgTable(
	'activity_audit_logs',
	{
		id: serial('id').primaryKey(),
		userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
		userEmail: text('user_email'),
		userRole: text('user_role'),
		eventType: text('event_type').notNull(),
		path: text('path').notNull(),
		resourceId: text('resource_id'),
		ipAddress: text('ip_address').notNull(),
		countryCode: text('country_code'),
		countryName: text('country_name'),
		regionCity: text('region_city'),
		deviceType: text('device_type').default('desktop').notNull(),
		osName: text('os_name').default('Unknown').notNull(),
		browserName: text('browser_name').default('Unknown').notNull(),
		userAgent: text('user_agent'),
		statusCode: integer('status_code').default(200).notNull(),
		createdAt: text('created_at').default(PG_UTC_NOW).notNull()
	},
	(table) => ({
		createdIdx: index('idx_audit_created').on(table.createdAt),
		userIdx: index('idx_audit_user').on(table.userId, table.createdAt),
		eventIdx: index('idx_audit_event').on(table.eventType, table.createdAt)
	})
);

export const videoWatchProgress = pgTable(
	'video_watch_progress',
	{
		id: serial('id').primaryKey(),
		userId: integer('user_id')
			.references(() => users.id, { onDelete: 'cascade' })
			.notNull(),
		videoId: integer('video_id').notNull(),
		lastPositionSec: integer('last_position_sec').default(0).notNull(),
		completed: boolean('completed').default(false).notNull(),
		answeredCuesJson: text('answered_cues_json').default('[]').notNull(),
		updatedAt: text('updated_at').default(PG_UTC_NOW).notNull()
	},
	(table) => ({
		userVideoIdx: index('idx_video_progress_user_vid').on(table.userId, table.videoId)
	})
);

export const apiTokens = pgTable(
	'api_tokens',
	{
		id: serial('id').primaryKey(),
		userId: integer('user_id')
			.references(() => users.id, { onDelete: 'cascade' })
			.notNull(),
		tokenHash: text('token_hash').notNull().unique(),
		label: text('label').default('mobile-client').notNull(),
		expiresAt: text('expires_at').notNull(),
		lastUsedAt: text('last_used_at'),
		createdAt: text('created_at').default(PG_UTC_NOW).notNull()
	},
	(table) => ({
		userIdx: index('idx_api_tokens_user').on(table.userId)
	})
);

// ============================================
// TYPE EXPORTS
// ============================================

export type Role = 'superadmin' | 'admin' | 'editor' | 'student';
export type SubscriptionTier = 'free' | 'premium';
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;

export type Rating = typeof ratings.$inferSelect;
export type NewRating = typeof ratings.$inferInsert;

export type ViewStat = typeof viewStats.$inferSelect;
export type NewViewStat = typeof viewStats.$inferInsert;

export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;

export type QuizAttempt = typeof quizAttempts.$inferSelect;
export type NewQuizAttempt = typeof quizAttempts.$inferInsert;

export type AttemptAnswer = typeof attemptAnswers.$inferSelect;
export type NewAttemptAnswer = typeof attemptAnswers.$inferInsert;

export type BadgeDefinition = typeof badgeDefinitions.$inferSelect;
export type UserBadge = typeof userBadges.$inferSelect;
export type UserPoint = typeof userPoints.$inferSelect;

export type UserBookmark = typeof userBookmarks.$inferSelect;
export type NewUserBookmark = typeof userBookmarks.$inferInsert;

export type UserMistake = typeof userMistakes.$inferSelect;
export type NewUserMistake = typeof userMistakes.$inferInsert;

export type VoucherCode = typeof voucherCodes.$inferSelect;
export type NewVoucherCode = typeof voucherCodes.$inferInsert;

export type VoucherRedemption = typeof voucherRedemptions.$inferSelect;
export type PaymentOrder = typeof paymentOrders.$inferSelect;
export type NewPaymentOrder = typeof paymentOrders.$inferInsert;
export type BillingAuditLog = typeof billingAuditLogs.$inferSelect;
export type NewBillingAuditLog = typeof billingAuditLogs.$inferInsert;
