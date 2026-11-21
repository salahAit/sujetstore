import { spawn } from 'node:child_process';
import { createHash, randomUUID } from 'node:crypto';
import { existsSync, mkdirSync } from 'node:fs';
import { readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const RAM_CACHE_ROOT = existsSync('/dev/shm')
	? '/dev/shm/sujetstore-pdf-pages'
	: '/tmp/sujetstore-pdf-pages';

const MAX_CONCURRENT_RENDER = 6;
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours in RAM
const MAX_CACHED_DOCS = 250;

let activeRenders = 0;
const waitQueue: Array<() => void> = [];
const inFlight = new Map<string, Promise<number>>();
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

async function maybePruneRamCache(): Promise<void> {
	const now = Date.now();
	if (now - lastPruneAt < 5 * 60 * 1000) return;
	lastPruneAt = now;
	try {
		ensureCacheRoot();
		const entries = await readdir(RAM_CACHE_ROOT, { withFileTypes: true });
		const dirs: Array<{ name: string; mtimeMs: number }> = [];
		for (const e of entries) {
			if (!e.isDirectory()) continue;
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

async function countExistingPages(docDir: string): Promise<number> {
	if (!existsSync(docDir)) return 0;
	try {
		const files = await readdir(docDir);
		const jpgs = files.filter((f) => /^p-\d+\.jpg$/.test(f));
		return jpgs.length;
	} catch {
		return 0;
	}
}

function runPdftoppm(pdfPath: string, outPrefix: string, dpi = 165): Promise<void> {
	return new Promise((resolve, reject) => {
		const proc = spawn(
			'pdftoppm',
			['-jpeg', '-jpegopt', 'quality=86', '-r', String(dpi), pdfPath, outPrefix],
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
 * Renders all pages of a PDF into crisp JPEG images inside /dev/shm RAM cache
 * using Poppler (100% native Arabic/Latin font accuracy, zero client-side PDF.js bloat).
 */
export async function ensurePdfPagesRendered(cacheKey: string, pdfBytes: Uint8Array): Promise<number> {
	ensureCacheRoot();
	void maybePruneRamCache();

	const hash = hashCacheKey(cacheKey);
	const docDir = join(RAM_CACHE_ROOT, hash);

	const cachedCount = await countExistingPages(docDir);
	if (cachedCount > 0) {
		return cachedCount;
	}

	const running = inFlight.get(hash);
	if (running) {
		return running;
	}

	const promise = (async () => {
		await acquireSlot();
		const tmpDir = join(RAM_CACHE_ROOT, `.tmp-${hash}-${randomUUID().slice(0, 8)}`);
		try {
			// Double-check after acquiring slot
			const again = await countExistingPages(docDir);
			if (again > 0) return again;

			mkdirSync(tmpDir, { recursive: true });
			const tmpPdf = join(tmpDir, 'source.pdf');
			await writeFile(tmpPdf, pdfBytes);

			await runPdftoppm(tmpPdf, join(tmpDir, 'raw'), 165);
			await rm(tmpPdf, { force: true }).catch(() => {});

			const generated = (await readdir(tmpDir))
				.filter((f) => /^raw-\d+\.jpg$/.test(f))
				.sort((a, b) => {
					const na = parseInt(a.match(/\d+/)?.[0] || '0', 10);
					const nb = parseInt(b.match(/\d+/)?.[0] || '0', 10);
					return na - nb;
				});

			if (generated.length === 0) {
				throw new Error('لم ينتج pdftoppm أي صفحات صالحة');
			}

			mkdirSync(docDir, { recursive: true });
			for (let i = 0; i < generated.length; i++) {
				const bytes = await readFile(join(tmpDir, generated[i]));
				await writeFile(join(docDir, `p-${i + 1}.jpg`), bytes);
			}
			return generated.length;
		} finally {
			releaseSlot();
			await rm(tmpDir, { recursive: true, force: true }).catch(() => {});
		}
	})();

	inFlight.set(hash, promise);
	try {
		return await promise;
	} finally {
		inFlight.delete(hash);
	}
}

export async function getRenderedPdfPage(
	cacheKey: string,
	pdfBytes: Uint8Array,
	pageNumber: number
): Promise<{ bytes: Uint8Array; pageCount: number } | null> {
	const pageCount = await ensurePdfPagesRendered(cacheKey, pdfBytes);
	if (!Number.isInteger(pageNumber) || pageNumber < 1 || pageNumber > pageCount) {
		return null;
	}
	const hash = hashCacheKey(cacheKey);
	const pagePath = join(RAM_CACHE_ROOT, hash, `p-${pageNumber}.jpg`);
	if (!existsSync(pagePath)) return null;
	const buf = await readFile(pagePath);
	return { bytes: new Uint8Array(buf), pageCount };
}
