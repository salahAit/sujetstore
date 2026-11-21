import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import type { SubjectAssembleRequest, SubjectPluginStats, UnifiedExamPaper } from './types';

export interface SubjectAssemblerModule {
	assemble(req: SubjectAssembleRequest): UnifiedExamPaper;
}

interface CachedModule {
	mtimeMs: number;
	mod: SubjectAssemblerModule;
}

const moduleCache = new Map<string, CachedModule>();
const inflightLoads = new Map<string, Promise<SubjectAssemblerModule>>();

interface ManifestEntry {
	id: string;
	tracks: number;
	lessons: number;
	templates: number;
	sizeBytes: number;
	builtAt: string;
}

let cachedManifest: { mtimeMs: number; data: Record<string, ManifestEntry> } | null = null;

function getPluginsDir(): string {
	return resolve(process.cwd(), 'plugins/subjects');
}

export function getPluginManifestStats(
	id: string,
	fallback: SubjectPluginStats
): SubjectPluginStats {
	const manifestPath = resolve(getPluginsDir(), 'manifest.json');
	if (!existsSync(manifestPath)) return fallback;
	try {
		const mtimeMs = statSync(manifestPath).mtimeMs;
		if (!cachedManifest || cachedManifest.mtimeMs !== mtimeMs) {
			const parsed = JSON.parse(readFileSync(manifestPath, 'utf-8')) as {
				subjects?: Record<string, ManifestEntry>;
			};
			cachedManifest = { mtimeMs, data: parsed.subjects || {} };
		}
		const entry = cachedManifest.data[id];
		if (entry) {
			return {
				tracks: entry.tracks,
				lessons: entry.lessons,
				templates: entry.templates
			};
		}
	} catch {
		// Fall back cleanly if manifest is momentarily being rewritten
	}
	return fallback;
}

/**
 * Dynamically loads an external compiled subject plugin bundle from `plugins/subjects/<id>.js`
 * (with automatic mtime-based hot-reload when a single subject is rebuilt on disk!).
 * Falls back cleanly to `src/lib/kernel/entries/<id>.ts` in Bun dev/script environments.
 */
export async function loadSubjectAssembler(id: string): Promise<SubjectAssemblerModule> {
	const safeId = id.replace(/[^a-z0-9_-]/gi, '');
	const compiledPath = resolve(getPluginsDir(), `${safeId}.js`);
	const targetPath = existsSync(compiledPath)
		? compiledPath
		: resolve(process.cwd(), 'src/lib/kernel/entries', `${safeId}.ts`);

	if (!existsSync(targetPath)) {
		throw new Error(`Subject plugin bundle not found for "${safeId}" (${compiledPath})`);
	}

	const mtimeMs = statSync(targetPath).mtimeMs;
	const cached = moduleCache.get(safeId);
	if (cached && cached.mtimeMs === mtimeMs) {
		return cached.mod;
	}

	const inflightKey = `${safeId}:${mtimeMs}`;
	const existing = inflightLoads.get(inflightKey);
	if (existing) return existing;

	const loadPromise = (async () => {
		const fileUrl = `${pathToFileURL(targetPath).href}?v=${Math.trunc(mtimeMs)}`;
		const mod = (await import(/* @vite-ignore */ fileUrl)) as Partial<SubjectAssemblerModule>;
		if (typeof mod.assemble !== 'function') {
			throw new Error(`Subject plugin "${safeId}" does not export assemble(req)`);
		}
		const typed = mod as SubjectAssemblerModule;
		moduleCache.set(safeId, { mtimeMs, mod: typed });
		return typed;
	})();

	inflightLoads.set(inflightKey, loadPromise);
	try {
		return await loadPromise;
	} finally {
		inflightLoads.delete(inflightKey);
	}
}
