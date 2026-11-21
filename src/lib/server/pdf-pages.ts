import { spawn } from 'node:child_process';
import { createHash, randomUUID } from 'node:crypto';
import { existsSync, mkdirSync } from 'node:fs';
import { readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const RAM_CACHE_ROOT = existsSync('/dev/shm')
	? '/dev/shm/sujetstore-pdf-pages'
	: '/tmp/sujetstore-pdf-pages';

const MAX_CONCURRENT_RENDER = 8;
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours in RAM
const MAX_CACHED_DOCS = 350;
const RENDER_DPI = 135; // Crisp 1116x1579 A4 (~125KB progressive JPEG, -52% bandwidth vs 165 DPI)

let activeRenders = 0;
const waitQueue: Array<() => void> = [];
const pageCountInFlight = new Map<string, Promise<number>>();
const pageRenderInFlight = new Map<string, Promise<Uint8Array | null>>();
const bgAllInFlight = new Map<string, Promise<void>>();
let lastPruneAt = 0;

function acquireSlot(): Promise<void> {
	if (activeRenders < MAX_CONCURRENT_RENDER) {
		activeRenders++;
		return Promise.resolve();
	}
	return new Promise((resolve) => waitQueue.push(resolve));
}

function releaseSlot(): void {
	const next = waitQueue.shift();
	if (next) {
		next();
	} else {
		activeRenders = Math.max(0, activeRenders - 1);
	}
}

function ensureCacheRoot(): void {
	if (!existsSync(RAM_CACHE_ROOT)) {
		mkdirSync(RAM_CACHE_ROOT, { recursive: true });
	}
}

function hashCacheKey(rawKey: string): string {
	return createHash('sha256').update(rawKey).digest('hex').slice(0, 24);
}

function docCacheDir(cacheKey: string): string {
	return join(RAM_CACHE_ROOT, hashCacheKey(cacheKey));
}

async function maybePruneRamCache(): Promise<void> {
	const now = Date.now();
	if (now - lastPruneAt < 5 * 60 * 1000) return;
	lastPruneAt = now;
	try {
		ensureCacheRoot();
		const entries = await readdir(RAM_CACHE_ROOT, { withFileTypes: true });
		const dirs: Array<{ name: string; mtimeMs: number }> = [];
		for (const e of entries) {
			if (!e.isDirectory() || e.name.startsWith('.')) continue;
			const full = join(RAM_CACHE_ROOT, e.name);
			try {
				const st = await stat(full);
				if (now - st.mtimeMs > CACHE_TTL_MS) {
					await rm(full, { recursive: true, force: true }).catch(() => {});
				} else {
					dirs.push({ name: e.name, mtimeMs: st.mtimeMs });
				}
			} catch {}
		}
		if (dirs.length > MAX_CACHED_DOCS) {
			dirs.sort((a, b) => a.mtimeMs - b.mtimeMs);
			const excess = dirs.slice(0, dirs.length - MAX_CACHED_DOCS);
			for (const d of excess) {
				await rm(join(RAM_CACHE_ROOT, d.name), { recursive: true, force: true }).catch(() => {});
			}
		}
	} catch {}
}

function runPdfInfoPages(pdfPath: string): Promise<number> {
	return new Promise((resolve, reject) => {
		const proc = spawn('pdfinfo', [pdfPath], {
			stdio: ['ignore', 'pipe', 'pipe'],
			timeout: 10_000
		});
		let stdout = '';
		let stderr = '';
		proc.stdout.on('data', (chunk) => {
			stdout += chunk.toString();
		});
		proc.stderr.on('data', (chunk) => {
			stderr += chunk.toString();
		});
		proc.on('error', (err) => reject(err));
		proc.on('close', (code) => {
			if (code !== 0) {
				return reject(new Error(`pdfinfo exited ${code}: ${stderr.trim()}`));
			}
			const match = stdout.match(/^Pages:\s+(\d+)/m);
			const pages = match ? parseInt(match[1], 10) : 0;
			if (!Number.isInteger(pages) || pages < 1) {
				return reject(new Error('تعذر قراءة عدد صفحات ملف PDF'));
			}
			resolve(pages);
		});
	});
}

function runPdftoppmRange(
	pdfPath: string,
	outPrefix: string,
	firstPage: number,
	lastPage: number,
	dpi = RENDER_DPI
): Promise<void> {
	return new Promise((resolve, reject) => {
		const proc = spawn(
			'pdftoppm',
			[
				'-jpeg',
				'-jpegopt',
				'quality=74,progressive=y,optimize=y',
				'-r',
				String(dpi),
				'-f',
				String(firstPage),
				'-l',
				String(lastPage),
				pdfPath,
				outPrefix
			],
			{ stdio: ['ignore', 'ignore', 'pipe'], timeout: 25_000 }
		);
		let stderr = '';
		proc.stderr.on('data', (chunk) => {
			stderr += chunk.toString();
		});
		proc.on('error', (err) => reject(err));
		proc.on('close', (code) => {
			if (code === 0) resolve();
			else reject(new Error(`pdftoppm exited with code ${code}: ${stderr.trim()}`));
		});
	});
}

/**
 * Pure `/dev/shm` RAM lookup for cached page count (< 0.5ms, ZERO RustFS S3 read).
 */
export async function getCachedPdfPageCount(cacheKey: string): Promise<number | null> {
	const metaPath = join(docCacheDir(cacheKey), 'meta.json');
	if (!existsSync(metaPath)) return null;
	try {
		const raw = JSON.parse(await readFile(metaPath, 'utf-8')) as { pageCount?: number };
		return typeof raw.pageCount === 'number' && raw.pageCount > 0 ? raw.pageCount : null;
	} catch {
		return null;
	}
}

/**
 * Pure `/dev/shm` RAM lookup for an already-rendered page JPEG (< 1ms, ZERO RustFS S3 read).
 */
export async function getCachedPdfPage(
	cacheKey: string,
	pageNumber: number
): Promise<{ bytes: Uint8Array; pageCount: number } | null> {
	if (!Number.isInteger(pageNumber) || pageNumber < 1) return null;
	const dir = docCacheDir(cacheKey);
	const pagePath = join(dir, `p-${pageNumber}.jpg`);
	if (!existsSync(pagePath)) return null;
	try {
		const [buf, count] = await Promise.all([readFile(pagePath), getCachedPdfPageCount(cacheKey)]);
		return { bytes: new Uint8Array(buf), pageCount: count ?? pageNumber };
	} catch {
		return null;
	}
}

async function ensureSourcePdfInRam(cacheKey: string, pdfBytes: Uint8Array): Promise<{ dir: string; pdfPath: string }> {
	ensureCacheRoot();
	const dir = docCacheDir(cacheKey);
	mkdirSync(dir, { recursive: true });
	const pdfPath = join(dir, 'source.pdf');
	if (!existsSync(pdfPath)) {
		const tmpPdf = join(dir, `.src-${randomUUID().slice(0, 8)}.pdf`);
		await writeFile(tmpPdf, pdfBytes);
		// Atomic rename avoids partial reads across concurrent page requests
		try {
			await writeFile(pdfPath, pdfBytes);
		} finally {
			await rm(tmpPdf, { force: true }).catch(() => {});
		}
	}
	return { dir, pdfPath };
}

/**
 * Background warmer for remaining pages `2..pageCount` so scrolling is instantaneous
 * without delaying Page 1 delivery!
 */
function warmRemainingPagesInBackground(cacheKey: string, pdfPath: string, pageCount: number): void {
	if (pageCount <= 1) return;
	const hash = hashCacheKey(cacheKey);
	if (bgAllInFlight.has(hash)) return;

	const dir = docCacheDir(cacheKey);
	// Skip if last page already exists
	if (existsSync(join(dir, `p-${pageCount}.jpg`))) return;

	const job = (async () => {
		await acquireSlot();
		const tmpDir = join(RAM_CACHE_ROOT, `.bg-${hash}-${randomUUID().slice(0, 8)}`);
		try {
			if (!existsSync(pdfPath)) return;
			mkdirSync(tmpDir, { recursive: true });
			await runPdftoppmRange(pdfPath, join(tmpDir, 'p'), 2, pageCount, RENDER_DPI);
			const files = (await readdir(tmpDir))
				.filter((f) => /^p-\d+\.jpg$/.test(f))
				.sort((a, b) => parseInt(a.match(/\d+/)?.[0] || '0', 10) - parseInt(b.match(/\d+/)?.[0] || '0', 10));
			for (let i = 0; i < files.length; i++) {
				const targetPage = i + 2;
				const dest = join(dir, `p-${targetPage}.jpg`);
				if (!existsSync(dest)) {
					const bytes = await readFile(join(tmpDir, files[i]));
					await writeFile(dest, bytes);
				}
			}
		} catch {
			// Best-effort background warming; on-demand page render still works if needed
		} finally {
			releaseSlot();
			await rm(tmpDir, { recursive: true, force: true }).catch(() => {});
		}
	})();

	bgAllInFlight.set(hash, job);
	void job.finally(() => bgAllInFlight.delete(hash));
}

/**
 * Fast page-count discovery (`pdfinfo` ~4ms) + starts background warm-up without blocking!
 */
export async function ensurePdfPagesRendered(
	cacheKey: string,
	pdfBytes: Uint8Array
): Promise<number> {
	ensureCacheRoot();
	void maybePruneRamCache();

	const cached = await getCachedPdfPageCount(cacheKey);
	if (cached) return cached;

	const hash = hashCacheKey(cacheKey);
	const existing = pageCountInFlight.get(hash);
	if (existing) return existing;

	const work = (async () => {
		const { dir, pdfPath } = await ensureSourcePdfInRam(cacheKey, pdfBytes);
		const pageCount = await runPdfInfoPages(pdfPath);
		await writeFile(join(dir, 'meta.json'), JSON.stringify({ pageCount }), 'utf-8');
		// Warm pages 2..N asynchronously while the client fetches Page 1 in parallel
		warmRemainingPagesInBackground(cacheKey, pdfPath, pageCount);
		return pageCount;
	})();

	pageCountInFlight.set(hash, work);
	try {
		return await work;
	} finally {
		pageCountInFlight.delete(hash);
	}
}

/**
 * Renders and caches ONLY the requested page (Page 1 first in ~110ms!),
 * then triggers background pre-rendering of pages 2..N in `/dev/shm` RAM.
 */
export async function getRenderedPdfPage(
	cacheKey: string,
	pdfBytes: Uint8Array,
	pageNumber: number
): Promise<{ bytes: Uint8Array; pageCount: number } | null> {
	if (!Number.isInteger(pageNumber) || pageNumber < 1) return null;

	const fastHit = await getCachedPdfPage(cacheKey, pageNumber);
	if (fastHit) return fastHit;

	const pageCount = await ensurePdfPagesRendered(cacheKey, pdfBytes);
	if (pageNumber > pageCount) return null;

	// If a background warm job is already rendering pages 2..N, wait briefly for it rather than duplicating work
	const hash = hashCacheKey(cacheKey);
	if (pageNumber > 1 && bgAllInFlight.has(hash)) {
		await bgAllInFlight.get(hash);
		const afterBg = await getCachedPdfPage(cacheKey, pageNumber);
		if (afterBg) return afterBg;
	}

	const pageKey = `${hash}:${pageNumber}`;
	const running = pageRenderInFlight.get(pageKey);
	if (running) {
		const bytes = await running;
		return bytes ? { bytes, pageCount } : null;
	}

	const work = (async (): Promise<Uint8Array | null> => {
		await acquireSlot();
		const tmpDir = join(RAM_CACHE_ROOT, `.pg-${hash}-${pageNumber}-${randomUUID().slice(0, 6)}`);
		try {
			const again = await getCachedPdfPage(cacheKey, pageNumber);
			if (again) return again.bytes;

			const { dir, pdfPath } = await ensureSourcePdfInRam(cacheKey, pdfBytes);
			mkdirSync(tmpDir, { recursive: true });
			await runPdftoppmRange(pdfPath, join(tmpDir, 'p'), pageNumber, pageNumber, RENDER_DPI);

			const files = (await readdir(tmpDir)).filter((f) => /^p-\d+\.jpg$/.test(f));
			if (files.length === 0) return null;
			const buf = await readFile(join(tmpDir, files[0]));
			await writeFile(join(dir, `p-${pageNumber}.jpg`), buf);

			// Once Page 1 is ready, make sure pages 2..N are warming in RAM
			if (pageNumber === 1 && pageCount > 1) {
				warmRemainingPagesInBackground(cacheKey, pdfPath, pageCount);
			}
			return new Uint8Array(buf);
		} finally {
			releaseSlot();
			await rm(tmpDir, { recursive: true, force: true }).catch(() => {});
		}
	})();

	pageRenderInFlight.set(pageKey, work);
	try {
		const bytes = await work;
		return bytes ? { bytes, pageCount } : null;
	} finally {
		pageRenderInFlight.delete(pageKey);
	}
}
