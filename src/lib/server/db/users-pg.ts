import { SQL, type TransactionSQL } from 'bun';
import { drizzle } from 'drizzle-orm/bun-sql';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import * as pgSchema from './schema-pg';

function resolveDatabaseUrl(): string {
	if (process.env.DATABASE_URL) {
		return process.env.DATABASE_URL;
	}

	// Fallback: load DATABASE_URL from .env if launched without Bun's automatic .env loader
	const candidates = [resolve(process.cwd(), '.env'), '/var/www/sujetstore/.env'];
	for (const envPath of candidates) {
		if (!existsSync(envPath)) continue;
		const content = readFileSync(envPath, 'utf-8');
		for (const rawLine of content.split(/\r?\n/)) {
			const line = rawLine.trim();
			if (!line || line.startsWith('#')) continue;
			const eqIdx = line.indexOf('=');
			if (eqIdx === -1) continue;
			const key = line.slice(0, eqIdx).trim();
			if (key !== 'DATABASE_URL') continue;
			let val = line.slice(eqIdx + 1).trim();
			if (
				(val.startsWith('"') && val.endsWith('"')) ||
				(val.startsWith("'") && val.endsWith("'"))
			) {
				val = val.slice(1, -1);
			}
			if (val) {
				process.env.DATABASE_URL = val;
				return val;
			}
		}
	}

	throw new Error('DATABASE_URL is not configured for PostgreSQL users database.');
}

/**
 * Convert unquoted `?` placeholders to PostgreSQL `$1, $2, ...` when `$n` placeholders are not already used.
 */
function normalizePlaceholders(sqlText: string, params: unknown[]): string {
	if (params.length === 0 || /\$\d+/.test(sqlText) || !sqlText.includes('?')) {
		return sqlText;
	}

	let out = '';
	let idx = 0;
	let inSingle = false;
	let inDouble = false;

	for (let i = 0; i < sqlText.length; i++) {
		const ch = sqlText[i];
		if (ch === "'" && !inDouble) {
			inSingle = !inSingle;
			out += ch;
		} else if (ch === '"' && !inSingle) {
			inDouble = !inDouble;
			out += ch;
		} else if (ch === '?' && !inSingle && !inDouble) {
			idx += 1;
			out += `$${idx}`;
		} else {
			out += ch;
		}
	}

	return out;
}

const databaseUrl = resolveDatabaseUrl();

export const usersSql = new SQL(databaseUrl);
export const usersPgDb = drizzle({ client: usersSql, schema: pgSchema });

export async function pgAll<T = any>(
	sqlText: string,
	params: any[] = [],
	client: SQL = usersSql
): Promise<T[]> {
	const query = normalizePlaceholders(sqlText, params);
	const res = await client.unsafe<T>(query, params);
	return Array.from(res as unknown as Iterable<T>);
}

export async function pgGet<T = any>(
	sqlText: string,
	params: any[] = [],
	client: SQL = usersSql
): Promise<T | null> {
	const rows = await pgAll<T>(sqlText, params, client);
	return rows.length > 0 ? rows[0] : null;
}

export async function pgRun(
	sqlText: string,
	params: any[] = [],
	client: SQL = usersSql
): Promise<{ count: number; rows: any[] }> {
	const query = normalizePlaceholders(sqlText, params);
	const res = (await client.unsafe(query, params)) as any;
	const rows = Array.isArray(res) ? Array.from(res) : [];
	const count =
		typeof res?.count === 'number'
			? res.count
			: typeof res?.affectedRows === 'number'
				? res.affectedRows
				: rows.length;
	return { count, rows };
}

export async function pgTx<T>(fn: (tx: TransactionSQL) => Promise<T>): Promise<T> {
	return await usersSql.begin(async (tx) => {
		return await fn(tx);
	});
}

export { pgSchema };
export type { TransactionSQL };
