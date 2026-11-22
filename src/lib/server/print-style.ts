import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { contentSqlite } from './db';

export type HeaderLayout = 'classic_ministry' | 'modern_sujetstore' | 'minimal';

export type StyleScopeType = 'global' | 'language' | 'level' | 'year' | 'subject' | 'doc_type';

export interface TypstStyleConfig {
	bodyFont: string;
	headingFont: string;
	ltrBodyFont: string;
	ltrHeadingFont: string;
	bodySizePt: number;
	headingSizePt: number;
	tableFontSizePt: number;
	lineLeadingEm: number;
	marginMm: number;
	headerLayout: HeaderLayout;
	showLogo: boolean;
	logoPath: string;
	logoWidthMm: number;
	showQr: boolean;
	qrUrl: string;
	accentColor: string;
	headerArRight: string;
	headerArLeft: string;
	headerFrLeft: string;
	headerEnLeft: string;
	footerAr: string;
	footerFr: string;
	footerEn: string;
	showBorder: boolean;
}

export interface TypstStyleProfileRecord {
	id: number;
	scopeType: StyleScopeType;
	scopeValue: string;
	labelAr: string;
	config: Partial<TypstStyleConfig>;
	isActive: boolean;
	updatedAt: string;
}

export interface PrintStyleContext {
	language?: 'ar' | 'fr' | 'en' | 'es' | 'de' | 'it';
	levelId?: string;
	yearId?: string;
	subjectId?: string;
	docType?: string;
}

export const DEFAULT_TYPST_STYLE: TypstStyleConfig = {
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
	logoPath: '/logo.png',
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
	footerEn: 'SujetStore.com — Best of luck to all students',
	showBorder: false
};

const VALID_SCOPE_TYPES = new Set<StyleScopeType>([
	'global',
	'language',
	'level',
	'year',
	'subject',
	'doc_type'
]);

const VALID_HEADER_LAYOUTS = new Set<HeaderLayout>([
	'classic_ministry',
	'modern_sujetstore',
	'minimal'
]);

const SCOPE_ORDER: Record<StyleScopeType, number> = {
	global: 0,
	language: 1,
	level: 2,
	year: 3,
	subject: 4,
	doc_type: 5
};

const CURATED_FONTS: readonly string[] = [
	'Arabic Transparent',
	'Noto Naskh Arabic',
	'Noto Kufi Arabic',
	'Noto Sans Arabic',
	'Amiri',
	'Harmattan',
	'Lateef',
	'KFGQPC Uthman Taha Naskh',
	'EB Garamond',
	'Montserrat',
	'Arial',
	'Libertinus Serif',
	'DejaVu Sans',
	'DejaVu Serif',
	'New Computer Modern'
];

const CACHE_TTL_MS = 5000;
let _profilesCache: { expiresAt: number; byKey: Map<string, Partial<TypstStyleConfig>> } | null =
	null;
let _tableEnsured = false;

function ensureStyleProfilesTable(): void {
	if (_tableEnsured) return;
	contentSqlite.exec(`
		CREATE TABLE IF NOT EXISTS typst_style_profiles (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			scope_type TEXT NOT NULL,
			scope_value TEXT NOT NULL,
			label_ar TEXT NOT NULL,
			config_json TEXT NOT NULL,
			is_active INTEGER NOT NULL DEFAULT 1,
			updated_at TEXT NOT NULL DEFAULT (datetime('now')),
			UNIQUE(scope_type, scope_value)
		)
	`);
	_tableEnsured = true;
}

function clampNumber(value: unknown, min: number, max: number): number | undefined {
	if (value === undefined || value === null || value === '') return undefined;
	const n = typeof value === 'number' ? value : Number(value);
	if (!Number.isFinite(n)) return undefined;
	return Math.round(Math.min(max, Math.max(min, n)) * 100) / 100;
}

function cleanString(value: unknown, maxLen = 160): string | undefined {
	if (typeof value !== 'string') return undefined;
	const trimmed = value.replace(/[\r\n\0]+/g, ' ').trim();
	if (!trimmed) return '';
	return trimmed.slice(0, maxLen);
}

function cleanHexColor(value: unknown): string | undefined {
	if (typeof value !== 'string') return undefined;
	const trimmed = value.trim();
	const match = /^#?([0-9a-fA-F]{6})$/.exec(trimmed);
	if (!match) return undefined;
	return `#${match[1].toUpperCase()}`;
}

function cleanLogoPath(value: unknown): string | undefined {
	if (typeof value !== 'string') return undefined;
	const trimmed = value.trim();
	if (!trimmed) return undefined;
	if (!trimmed.startsWith('/') || trimmed.includes('..') || trimmed.includes('\\') || trimmed.includes('\0')) {
		return undefined;
	}
	if (!/\.(png|webp|jpe?g)$/i.test(trimmed)) return undefined;
	return trimmed.slice(0, 200);
}

function cleanBoolean(value: unknown): boolean | undefined {
	if (typeof value === 'boolean') return value;
	if (value === 'true' || value === '1' || value === 1) return true;
	if (value === 'false' || value === '0' || value === 0) return false;
	return undefined;
}

/**
 * Sanitizes an untrusted partial style configuration, keeping only valid defined fields.
 */
export function sanitizePartialStyleConfig(raw: unknown): Partial<TypstStyleConfig> {
	if (!raw || typeof raw !== 'object') return {};
	const src = raw as Record<string, unknown>;
	const out: Partial<TypstStyleConfig> = {};

	const bodyFont = cleanString(src.bodyFont, 80);
	if (bodyFont) out.bodyFont = bodyFont;

	const headingFont = cleanString(src.headingFont, 80);
	if (headingFont) out.headingFont = headingFont;

	const ltrBodyFont = cleanString(src.ltrBodyFont, 80);
	if (ltrBodyFont) out.ltrBodyFont = ltrBodyFont;

	const ltrHeadingFont = cleanString(src.ltrHeadingFont, 80);
	if (ltrHeadingFont) out.ltrHeadingFont = ltrHeadingFont;

	const bodySizePt = clampNumber(src.bodySizePt, 8, 24);
	if (bodySizePt !== undefined) out.bodySizePt = bodySizePt;

	const headingSizePt = clampNumber(src.headingSizePt, 9, 28);
	if (headingSizePt !== undefined) out.headingSizePt = headingSizePt;

	const tableFontSizePt = clampNumber(src.tableFontSizePt, 7, 20);
	if (tableFontSizePt !== undefined) out.tableFontSizePt = tableFontSizePt;

	const lineLeadingEm = clampNumber(src.lineLeadingEm, 0.45, 1.8);
	if (lineLeadingEm !== undefined) out.lineLeadingEm = lineLeadingEm;

	const marginMm = clampNumber(src.marginMm, 6, 30);
	if (marginMm !== undefined) out.marginMm = marginMm;

	if (typeof src.headerLayout === 'string' && VALID_HEADER_LAYOUTS.has(src.headerLayout as HeaderLayout)) {
		out.headerLayout = src.headerLayout as HeaderLayout;
	}

	const showLogo = cleanBoolean(src.showLogo);
	if (showLogo !== undefined) out.showLogo = showLogo;

	const logoPath = cleanLogoPath(src.logoPath);
	if (logoPath !== undefined) out.logoPath = logoPath;

	const logoWidthMm = clampNumber(src.logoWidthMm, 8, 40);
	if (logoWidthMm !== undefined) out.logoWidthMm = logoWidthMm;

	const showQr = cleanBoolean(src.showQr);
	if (showQr !== undefined) out.showQr = showQr;

	const qrUrl = cleanString(src.qrUrl, 240);
	if (qrUrl !== undefined && qrUrl.length > 0) out.qrUrl = qrUrl;

	const accentColor = cleanHexColor(src.accentColor);
	if (accentColor !== undefined) out.accentColor = accentColor;

	const headerArRight = cleanString(src.headerArRight, 180);
	if (headerArRight !== undefined) out.headerArRight = headerArRight;

	const headerArLeft = cleanString(src.headerArLeft, 180);
	if (headerArLeft !== undefined) out.headerArLeft = headerArLeft;

	const headerFrLeft = cleanString(src.headerFrLeft, 180);
	if (headerFrLeft !== undefined) out.headerFrLeft = headerFrLeft;

	const headerEnLeft = cleanString(src.headerEnLeft, 180);
	if (headerEnLeft !== undefined) out.headerEnLeft = headerEnLeft;

	const footerAr = cleanString(src.footerAr, 220);
	if (footerAr !== undefined) out.footerAr = footerAr;

	const footerFr = cleanString(src.footerFr, 220);
	if (footerFr !== undefined) out.footerFr = footerFr;

	const footerEn = cleanString(src.footerEn, 220);
	if (footerEn !== undefined) out.footerEn = footerEn;

	const showBorder = cleanBoolean(src.showBorder);
	if (showBorder !== undefined) out.showBorder = showBorder;

	return out;
}

/**
 * Produces a complete, validated TypstStyleConfig merged over DEFAULT_TYPST_STYLE.
 */
export function normalizeStyleConfig(raw: unknown): TypstStyleConfig {
	return {
		...DEFAULT_TYPST_STYLE,
		...sanitizePartialStyleConfig(raw)
	};
}

interface RawProfileRow {
	id: number;
	scope_type: string;
	scope_value: string;
	label_ar: string;
	config_json: string;
	is_active: number;
	updated_at: string;
}

function parseProfileRow(row: RawProfileRow): TypstStyleProfileRecord {
	let parsed: unknown = {};
	try {
		parsed = JSON.parse(row.config_json);
	} catch {
		parsed = {};
	}
	const scopeType: StyleScopeType = VALID_SCOPE_TYPES.has(row.scope_type as StyleScopeType)
		? (row.scope_type as StyleScopeType)
		: 'global';

	return {
		id: row.id,
		scopeType,
		scopeValue: row.scope_value,
		labelAr: row.label_ar,
		config: sanitizePartialStyleConfig(parsed),
		isActive: row.is_active === 1,
		updatedAt: row.updated_at
	};
}

export function invalidatePrintStyleCache(): void {
	_profilesCache = null;
}

function loadActiveProfilesMap(): Map<string, Partial<TypstStyleConfig>> {
	const now = Date.now();
	if (_profilesCache && _profilesCache.expiresAt > now) {
		return _profilesCache.byKey;
	}

	ensureStyleProfilesTable();
	const rows = contentSqlite
		.query(
			`SELECT id, scope_type, scope_value, label_ar, config_json, is_active, updated_at
			 FROM typst_style_profiles
			 WHERE is_active = 1`
		)
		.all() as RawProfileRow[];

	const byKey = new Map<string, Partial<TypstStyleConfig>>();
	for (const row of rows) {
		const rec = parseProfileRow(row);
		byKey.set(`${rec.scopeType}:${rec.scopeValue}`, rec.config);
	}

	_profilesCache = {
		expiresAt: now + CACHE_TTL_MS,
		byKey
	};
	return byKey;
}

export function listStyleProfiles(): TypstStyleProfileRecord[] {
	ensureStyleProfilesTable();
	const rows = contentSqlite
		.query(
			`SELECT id, scope_type, scope_value, label_ar, config_json, is_active, updated_at
			 FROM typst_style_profiles
			 ORDER BY id ASC`
		)
		.all() as RawProfileRow[];

	return rows
		.map(parseProfileRow)
		.sort((a, b) => {
			const orderDiff = SCOPE_ORDER[a.scopeType] - SCOPE_ORDER[b.scopeType];
			if (orderDiff !== 0) return orderDiff;
			return a.scopeValue.localeCompare(b.scopeValue);
		});
}

export function upsertStyleProfile(input: {
	scopeType: StyleScopeType;
	scopeValue: string;
	labelAr: string;
	config: Partial<TypstStyleConfig>;
	isActive?: boolean;
}): TypstStyleProfileRecord {
	ensureStyleProfilesTable();

	if (!VALID_SCOPE_TYPES.has(input.scopeType)) {
		throw new Error(`Invalid scopeType: ${String(input.scopeType)}`);
	}
	const scopeValue = input.scopeType === 'global' ? 'default' : input.scopeValue.trim();
	if (!scopeValue || scopeValue.length > 80) {
		throw new Error('قيمة النطاق غير صالحة');
	}
	const labelAr = (input.labelAr || `${input.scopeType}:${scopeValue}`).trim().slice(0, 140);
	const sanitized = sanitizePartialStyleConfig(input.config);
	const configToStore =
		input.scopeType === 'global' && scopeValue === 'default'
			? { ...DEFAULT_TYPST_STYLE, ...sanitized }
			: sanitized;
	const isActiveInt = input.isActive === false ? 0 : 1;

	contentSqlite
		.query(
			`INSERT INTO typst_style_profiles (scope_type, scope_value, label_ar, config_json, is_active, updated_at)
			 VALUES (?, ?, ?, ?, ?, datetime('now'))
			 ON CONFLICT(scope_type, scope_value)
			 DO UPDATE SET
			   label_ar = excluded.label_ar,
			   config_json = excluded.config_json,
			   is_active = excluded.is_active,
			   updated_at = datetime('now')`
		)
		.run(input.scopeType, scopeValue, labelAr, JSON.stringify(configToStore), isActiveInt);

	invalidatePrintStyleCache();

	const row = contentSqlite
		.query(
			`SELECT id, scope_type, scope_value, label_ar, config_json, is_active, updated_at
			 FROM typst_style_profiles
			 WHERE scope_type = ? AND scope_value = ?
			 LIMIT 1`
		)
		.get(input.scopeType, scopeValue) as RawProfileRow;

	return parseProfileRow(row);
}

export function deleteStyleProfile(id: number): { deleted: boolean; reason?: string } {
	ensureStyleProfilesTable();
	const existing = contentSqlite
		.query(`SELECT id, scope_type, scope_value FROM typst_style_profiles WHERE id = ? LIMIT 1`)
		.get(id) as { id: number; scope_type: string; scope_value: string } | null;

	if (!existing) {
		return { deleted: false, reason: 'الملف غير موجود' };
	}
	if (existing.scope_type === 'global' && existing.scope_value === 'default') {
		return { deleted: false, reason: 'لا يمكن حذف ملف الإعداد العام الافتراضي' };
	}

	contentSqlite.query(`DELETE FROM typst_style_profiles WHERE id = ?`).run(id);
	invalidatePrintStyleCache();
	return { deleted: true };
}

/**
 * Resolves the effective TypstStyleConfig by merging active profiles from broadest to most specific:
 * DEFAULT_TYPST_STYLE -> global:default -> language:<lang> -> level:<levelId> -> year:<yearId> -> subject:<subjectId> -> doc_type:<docType>
 */
export function resolveEffectivePrintStyle(ctx: PrintStyleContext = {}): TypstStyleConfig {
	const activeMap = loadActiveProfilesMap();
	const merged: TypstStyleConfig = { ...DEFAULT_TYPST_STYLE };

	const keys: string[] = ['global:default'];
	if (ctx.language) keys.push(`language:${ctx.language}`);
	if (ctx.levelId) keys.push(`level:${ctx.levelId}`);
	if (ctx.yearId) keys.push(`year:${ctx.yearId}`);
	if (ctx.subjectId) keys.push(`subject:${ctx.subjectId}`);
	if (ctx.docType) keys.push(`doc_type:${ctx.docType}`);

	for (const key of keys) {
		const layer = activeMap.get(key);
		if (!layer) continue;
		for (const [k, v] of Object.entries(layer)) {
			if (v !== undefined) {
				(merged as unknown as Record<string, unknown>)[k] = v;
			}
		}
	}

	return merged;
}

/**
 * Extracts the font family name (OpenType `name` table nameID 16 preferred, falling back to nameID 1).
 */
export function extractFontFamilyNameFromBuffer(buf: Buffer): string | null {
	if (buf.length < 12) return null;
	const numTables = buf.readUInt16BE(4);
	if (numTables === 0 || 12 + numTables * 16 > buf.length) return null;

	let nameOffset = 0;
	let nameLength = 0;
	for (let i = 0; i < numTables; i++) {
		const entryOffset = 12 + i * 16;
		const tag = buf.subarray(entryOffset, entryOffset + 4).toString('ascii');
		if (tag === 'name') {
			nameOffset = buf.readUInt32BE(entryOffset + 8);
			nameLength = buf.readUInt32BE(entryOffset + 12);
			break;
		}
	}

	if (!nameOffset || nameOffset + 6 > buf.length || nameOffset + nameLength > buf.length) {
		return null;
	}

	const count = buf.readUInt16BE(nameOffset + 2);
	const stringOffset = nameOffset + buf.readUInt16BE(nameOffset + 4);
	if (stringOffset > buf.length) return null;

	let preferredFamily: string | null = null;
	let basicFamily: string | null = null;

	for (let i = 0; i < count; i++) {
		const recOffset = nameOffset + 6 + i * 12;
		if (recOffset + 12 > buf.length) break;

		const platformId = buf.readUInt16BE(recOffset);
		const nameId = buf.readUInt16BE(recOffset + 6);
		if (nameId !== 1 && nameId !== 16) continue;

		const length = buf.readUInt16BE(recOffset + 8);
		const offset = buf.readUInt16BE(recOffset + 10);
		const start = stringOffset + offset;
		const end = start + length;
		if (start < 0 || end > buf.length || length <= 0) continue;

		let decoded = '';
		if (platformId === 3 || platformId === 0) {
			// UTF-16BE
			const chars: number[] = [];
			for (let p = start; p + 1 < end; p += 2) {
				chars.push(buf.readUInt16BE(p));
			}
			decoded = String.fromCharCode(...chars);
		} else if (platformId === 1) {
			decoded = buf.subarray(start, end).toString('latin1');
		}

		const cleaned = decoded.replace(/\0/g, '').trim();
		if (!cleaned) continue;

		if (nameId === 16) {
			if (!preferredFamily || platformId === 3) preferredFamily = cleaned;
		} else if (nameId === 1) {
			if (!basicFamily || platformId === 3) basicFamily = cleaned;
		}
	}

	return preferredFamily || basicFamily;
}

/**
 * Lists all available print fonts by combining curated installed Arabic/Latin fonts
 * with any custom `.ttf` / `.otf` fonts present in `static/fonts/`.
 */
export function listAvailableFonts(): string[] {
	const found = new Set<string>(CURATED_FONTS);
	const fontsDir = resolve('static/fonts');

	if (existsSync(fontsDir)) {
		try {
			const entries = readdirSync(fontsDir);
			for (const entry of entries) {
				const ext = extname(entry).toLowerCase();
				if (ext !== '.ttf' && ext !== '.otf') continue;
				const fullPath = join(fontsDir, entry);
				try {
					const buf = readFileSync(fullPath);
					const family = extractFontFamilyNameFromBuffer(buf);
					if (family && family !== 'STIX Two Math') {
						found.add(family);
					}
				} catch {
					// Fallback to cleaned filename stem if font header unreadable
					const stem = entry.slice(0, -ext.length).replace(/[_-]+/g, ' ').trim();
					if (stem) found.add(stem);
				}
			}
		} catch {
			// Ignore directory read errors
		}
	}

	return Array.from(found);
}

/**
 * Scans `static/logo*` and `static/images/print/*` and returns web-accessible logo paths.
 */
export function listAvailableLogos(): string[] {
	const logos: string[] = [];
	const seen = new Set<string>();
	const allowedExts = new Set(['.png', '.webp', '.jpg', '.jpeg']);

	const staticDir = resolve('static');
	if (existsSync(staticDir)) {
		try {
			for (const entry of readdirSync(staticDir)) {
				if (!entry.toLowerCase().startsWith('logo')) continue;
				const ext = extname(entry).toLowerCase();
				if (!allowedExts.has(ext)) continue;
				const webPath = `/${entry}`;
				if (!seen.has(webPath)) {
					seen.add(webPath);
					logos.push(webPath);
				}
			}
		} catch {
			// Ignore
		}
	}

	const printImagesDir = resolve('static/images/print');
	if (existsSync(printImagesDir)) {
		try {
			for (const entry of readdirSync(printImagesDir)) {
				const ext = extname(entry).toLowerCase();
				if (!allowedExts.has(ext)) continue;
				const webPath = `/images/print/${entry}`;
				if (!seen.has(webPath)) {
					seen.add(webPath);
					logos.push(webPath);
				}
			}
		} catch {
			// Ignore
		}
	}

	return logos.sort((a, b) => {
		if (a === '/logo.png') return -1;
		if (b === '/logo.png') return 1;
		return a.localeCompare(b);
	});
}
