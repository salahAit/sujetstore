import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import * as contentSchema from './schema-content';
import * as userSchema from './schema';

// ============================================
// DATABASE CONNECTIONS
// ============================================

// Content Database (Read-Only in public routes, Read-Write in admin)
const contentDb = new Database('data/content.db');
contentDb.exec('PRAGMA journal_mode = WAL');
contentDb.exec('PRAGMA busy_timeout = 5000');
contentDb.exec('PRAGMA foreign_keys = ON');

// Users Database (Read-Write)
const usersDb = new Database('data/users.db');
usersDb.exec('PRAGMA journal_mode = WAL');
usersDb.exec('PRAGMA busy_timeout = 5000');
usersDb.exec('PRAGMA synchronous = NORMAL');
usersDb.exec('PRAGMA foreign_keys = ON');

export const contentSqlite = contentDb;
export const usersSqlite = usersDb;
export const contentDatabase = drizzle(contentDb, { schema: contentSchema });
export const usersDatabase = drizzle(usersDb, { schema: userSchema });

// Re-export schemas
export { contentSchema, userSchema };
