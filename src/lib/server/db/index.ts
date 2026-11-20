import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import * as contentSchema from './schema-content';
import {
	usersSql,
	usersPgDb,
	pgSchema,
	pgAll,
	pgGet,
	pgRun,
	pgTx,
	type TransactionSQL
} from './users-pg';

// ============================================
// DATABASE CONNECTIONS
// ============================================

// Content Database (bun:sqlite — Read-Only in public routes, Read-Write in admin)
const contentDb = new Database('data/content.db');
contentDb.exec('PRAGMA journal_mode = WAL');
contentDb.exec('PRAGMA busy_timeout = 5000');
contentDb.exec('PRAGMA foreign_keys = ON');

export const contentSqlite = contentDb;
export const contentDatabase = drizzle(contentDb, { schema: contentSchema });

// Users, Auth, Billing, Gamification & Analytics Database (PostgreSQL 17 via bun:sql)
export { usersSql, usersPgDb, pgSchema, pgAll, pgGet, pgRun, pgTx };
export type { TransactionSQL };

export const usersDatabase = usersPgDb;
export const userSchema = pgSchema;

// Re-export content schema
export { contentSchema };
