import { createHash } from 'node:crypto';

const DEFAULT_WORKER_URL = 'http://127.0.0.1:9020';
const WATERMARK_TIMEOUT_MS = 1500;
const HEALTH_TIMEOUT_MS = 1500;
const TRANSCRIPT_TIMEOUT_MS = 3000;

// Bounded in-memory LRU cache for watermarked PDFs
const LRU_MAX_ENTRIES = 32;
const LRU_MAX_BYTES = 24 * 1024 * 1024; // 24 MiB cap
const LRU_TTL_MS = 15 * 60 * 1000; // 15 minutes

interface CacheEntry {
	bytes: Uint8Array;
	workerMs: number | null;
	expiresAt: number;
}

const watermarkCache = new Map<string, CacheEntry>();
let watermarkCacheBytes = 0;

export interface RustWorkerHealth {
	ok: boolean;
	status?: string;
	service?: string;
	version?: string;
	latencyMs: number;
	error?: string;
}

export interface WatermarkPdfResult {
	bytes: Uint8Array;
	watermarked: boolean;
	cached: boolean;
	workerMs: number | null;
}

export interface ParsedTranscriptSegment {
	seqIndex: number;
	startSec: number;
	endSec: number;
	textAr: string;
	textNormalized: string;
}

export interface ParseTranscriptResult {
	segments: ParsedTranscriptSegment[];
	source: 'rust-worker' | 'ts-fallback';
}

function getWorkerBaseUrl(): string {
	const raw = process.env.RUST_WORKER_URL?.trim() || DEFAULT_WORKER_URL;
	return raw.replace(/\/+$/, '');
}

function getWorkerSecret(): string | null {
	const s = process.env.RUST_WORKER_SECRET?.trim();
	return s && s.length > 0 ? s : null;
}

function isPdfBuffer(bytes: Uint8Array): boolean {
	return (
		bytes.byteLength >= 8 &&
		bytes[0] === 0x25 && // %
		bytes[1] === 0x50 && // P
		bytes[2] === 0x44 && // D
		bytes[3] === 0x46 && // F
		bytes[4] === 0x2d // -
	);
}

function lruGet(key: string): CacheEntry | null {
	const entry = watermarkCache.get(key);
	if (!entry) return null;
	if (Date.now() >= entry.expiresAt) {
		watermarkCache.delete(key);
		watermarkCacheBytes = Math.max(0, watermarkCacheBytes - entry.bytes.byteLength);
		return null;
	}
	// Refresh recency
	watermarkCache.delete(key);
	watermarkCache.set(key, entry);
	return entry;
}

function lruSet(key: string, bytes: Uint8Array, workerMs: number | null): void {
	if (bytes.byteLength > LRU_MAX_BYTES / 2) {
		// Skip caching unusually large PDFs
		return;
	}

	const existing = watermarkCache.get(key);
	if (existing) {
		watermarkCache.delete(key);
		watermarkCacheBytes = Math.max(0, watermarkCacheBytes - existing.bytes.byteLength);
	}

	while (
		watermarkCache.size >= LRU_MAX_ENTRIES ||
		watermarkCacheBytes + bytes.byteLength > LRU_MAX_BYTES
	) {
		const oldestKey = watermarkCache.keys().next().value;
		if (oldestKey === undefined) break;
		const oldest = watermarkCache.get(oldestKey);
		watermarkCache.delete(oldestKey);
		if (oldest) {
			watermarkCacheBytes = Math.max(0, watermarkCacheBytes - oldest.bytes.byteLength);
		}
	}

	watermarkCache.set(key, {
		bytes,
		workerMs,
		expiresAt: Date.now() + LRU_TTL_MS
	});
	watermarkCacheBytes += bytes.byteLength;
}

/**
 * Checks whether the local Rust media & watermark sidecar is healthy and responsive.
 */
export async function checkRustWorkerHealth(
	timeoutMs = HEALTH_TIMEOUT_MS
): Promise<RustWorkerHealth> {
	const started = performance.now();
	try {
		const res = await fetch(`${getWorkerBaseUrl()}/health`, {
			method: 'GET',
			signal: AbortSignal.timeout(timeoutMs)
		});
		const latencyMs = Math.round(performance.now() - started);
		if (!res.ok) {
			return { ok: false, latencyMs, error: `HTTP ${res.status}` };
		}
		const payload = (await res.json()) as {
			status?: string;
			service?: string;
			version?: string;
		};
		return {
			ok: payload.status === 'ok',
			status: payload.status,
			service: payload.service,
			version: payload.version,
			latencyMs
		};
	} catch (err) {
		return {
			ok: false,
			latencyMs: Math.round(performance.now() - started),
			error: err instanceof Error ? err.message : 'Worker unreachable'
		};
	}
}

/**
 * Watermarks a PDF buffer via the Rust sidecar with a strict 1500ms timeout,
 * bounded in-memory LRU caching keyed by sha256(bytes + text + ownerHash),
 * and graceful fallback to the original PDF bytes on timeout or error.
 */
export async function watermarkPdfViaRust(
	pdfBytes: Uint8Array,
	watermarkText: string,
	ownerHash?: string
): Promise<WatermarkPdfResult> {
	const cleanText = watermarkText.replace(/[\r\n]+/g, ' ').trim() || 'SujetStore';
	const cleanOwner = ownerHash?.replace(/[\r\n]+/g, '').trim() || '';

	if (!isPdfBuffer(pdfBytes)) {
		return { bytes: pdfBytes, watermarked: false, cached: false, workerMs: null };
	}

	const cacheKey = createHash('sha256')
		.update(pdfBytes)
		.update('\0')
		.update(cleanText)
		.update('\0')
		.update(cleanOwner)
		.digest('hex');

	const hit = lruGet(cacheKey);
	if (hit) {
		return {
			bytes: hit.bytes,
			watermarked: true,
			cached: true,
			workerMs: hit.workerMs
		};
	}

	const headers: Record<string, string> = {
		'Content-Type': 'application/pdf',
		'X-Watermark-Text': cleanText
	};
	if (cleanOwner) {
		headers['X-Owner-Hash'] = cleanOwner;
	}
	const secret = getWorkerSecret();
	if (secret) {
		headers['X-Internal-Secret'] = secret;
	}

	try {
		const res = await fetch(`${getWorkerBaseUrl()}/watermark-pdf`, {
			method: 'POST',
			headers,
			body: new Uint8Array(pdfBytes),
			signal: AbortSignal.timeout(WATERMARK_TIMEOUT_MS)
		});

		if (!res.ok) {
			return { bytes: pdfBytes, watermarked: false, cached: false, workerMs: null };
		}

		const outBuf = new Uint8Array(await res.arrayBuffer());
		if (!isPdfBuffer(outBuf)) {
			return { bytes: pdfBytes, watermarked: false, cached: false, workerMs: null };
		}

		const rawMs = res.headers.get('x-watermark-ms');
		const workerMs = rawMs !== null && Number.isFinite(Number(rawMs)) ? Number(rawMs) : null;

		lruSet(cacheKey, outBuf, workerMs);

		return {
			bytes: outBuf,
			watermarked: true,
			cached: false,
			workerMs
		};
	} catch {
		// Graceful fallback to original bytes on timeout/network failure
		return { bytes: pdfBytes, watermarked: false, cached: false, workerMs: null };
	}
}

function normalizeArabicFallback(input: string): string {
	return input
		.replace(/[\u064B-\u065F\u0670\u0640]/g, '')
		.replace(/[أإآٱ]/g, 'ا')
		.replace(/ى/g, 'ي')
		.replace(/ة/g, 'ه')
		.replace(/\s+/g, ' ')
		.trim();
}

function parseTimestampSecFallback(raw: string): number | null {
	const token = raw.trim().split(/\s+/)[0];
	if (!token) return null;
	const main = token.split(/[.,]/)[0] || '';
	const parts = main.split(':').map((p) => Number(p));
	if (parts.some((n) => !Number.isFinite(n) || n < 0)) return null;
	if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
	if (parts.length === 2) return parts[0] * 60 + parts[1];
	return null;
}

function parseTranscriptFallback(raw: string): ParsedTranscriptSegment[] {
	const lines = raw.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').split('\n');
	const segments: ParsedTranscriptSegment[] = [];
	let i = 0;

	while (i < lines.length) {
		const trimmed = lines[i].trim();
		if (!trimmed || trimmed.startsWith('WEBVTT')) {
			i++;
			continue;
		}
		if (trimmed.startsWith('NOTE') || trimmed.startsWith('STYLE') || trimmed.startsWith('REGION')) {
			i++;
			while (i < lines.length && lines[i].trim()) i++;
			continue;
		}

		let timingLine: string | null = null;
		if (trimmed.includes('-->')) {
			timingLine = trimmed;
			i++;
		} else if (i + 1 < lines.length && lines[i + 1].includes('-->')) {
			timingLine = lines[i + 1].trim();
			i += 2;
		} else {
			i++;
			continue;
		}

		const [left, right] = timingLine.split('-->');
		const startSec = parseTimestampSecFallback(left || '');
		const endSec = parseTimestampSecFallback(right || '');
		if (startSec === null || endSec === null) continue;

		const textLines: string[] = [];
		while (i < lines.length && lines[i].trim() && !lines[i].includes('-->')) {
			textLines.push(lines[i].trim());
			i++;
		}

		const textAr = textLines
			.join(' ')
			.replace(/<[^>]*>/g, '')
			.replace(/\s+/g, ' ')
			.trim();
		if (!textAr) continue;

		segments.push({
			seqIndex: segments.length,
			startSec,
			endSec: Math.max(startSec, endSec),
			textAr,
			textNormalized: normalizeArabicFallback(textAr)
		});
	}

	return segments;
}

/**
 * Parses WebVTT or SRT subtitles and normalizes Arabic diacritics via the Rust sidecar,
 * with a deterministic TypeScript fallback if the sidecar is temporarily unavailable.
 */
export async function parseTranscriptViaRust(raw: string): Promise<ParseTranscriptResult> {
	if (!raw || !raw.trim()) {
		return { segments: [], source: 'ts-fallback' };
	}

	const headers: Record<string, string> = {
		'Content-Type': 'application/json'
	};
	const secret = getWorkerSecret();
	if (secret) {
		headers['X-Internal-Secret'] = secret;
	}

	try {
		const res = await fetch(`${getWorkerBaseUrl()}/parse-transcript`, {
			method: 'POST',
			headers,
			body: JSON.stringify({ raw }),
			signal: AbortSignal.timeout(TRANSCRIPT_TIMEOUT_MS)
		});

		if (res.ok) {
			const payload = (await res.json()) as { segments?: ParsedTranscriptSegment[] };
			if (Array.isArray(payload.segments)) {
				return { segments: payload.segments, source: 'rust-worker' };
			}
		}
	} catch {
		// Fall through to deterministic TypeScript parser
	}

	return {
		segments: parseTranscriptFallback(raw),
		source: 'ts-fallback'
	};
}
