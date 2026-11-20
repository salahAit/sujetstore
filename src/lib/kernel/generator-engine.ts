import { createHash, randomUUID } from 'crypto';
import { mkdir, readdir, rename, rm, stat, unlink } from 'fs/promises';
import { join, resolve } from 'path';
import { compileTypstPdf } from '../server/typst';
import type {
	CompiledExamResult,
	GeneratorCacheKeyInput,
	GeneratorMetrics,
	UnifiedExamPaper
} from './types';

export const MAX_CONCURRENT_TYPST = 4;
export const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
export const CLEANUP_INTERVAL_MS = 30 * 60 * 1000;
const ORPHAN_TMP_TTL_MS = 60 * 60 * 1000;

const GENERATED_PDF_PATTERN = /^gen-[a-zA-Z0-9_-]+(?:-sol)?\.pdf$/;
const TEMP_GENERATED_PDF_PATTERN = /^\.tmp-gen-[a-zA-Z0-9_-]+(?:-sol)?\.pdf$/;

export type TypstCompileOptions = Parameters<typeof compileTypstPdf>[0];
export type TypstCompileResult = Awaited<ReturnType<typeof compileTypstPdf>>;
export type TypstCompilerFn = (options: TypstCompileOptions) => Promise<TypstCompileResult>;

export interface GeneratorEngineOptions {
	maxConcurrent?: number;
	cacheDir?: string;
	publicUrlPrefix?: string;
	ttlMs?: number;
	cleanupIntervalMs?: number;
	compiler?: TypstCompilerFn;
	enableBackgroundCleanupTimer?: boolean;
}

/**
 * Deterministic short SHA-256 cache key derived from generation parameters.
 */
export function computeExamCacheKey(input: GeneratorCacheKeyInput): string {
	const canonical: Array<string | number> = [
		input.pluginId,
		input.trackId,
		input.trimesterId,
		input.docType,
		input.variant ?? '',
		input.difficulty ?? 'medium',
		input.seed
	];

	if (input.academicYear || input.schoolName || input.topicNumber !== undefined) {
		canonical.push(input.academicYear ?? '', input.schoolName ?? '', input.topicNumber ?? '');
	}

	return createHash('sha256').update(JSON.stringify(canonical)).digest('hex').slice(0, 16);
}

export class GeneratorEngine {
	private readonly maxConcurrent: number;
	private readonly cacheDir: string;
	private readonly publicUrlPrefix: string;
	private readonly ttlMs: number;
	private readonly cleanupIntervalMs: number;
	private readonly compiler: TypstCompilerFn;

	private activeJobs = 0;
	private readonly waitQueue: Array<() => void> = [];
	private readonly inFlightMap = new Map<string, Promise<CompiledExamResult>>();

	private cacheHits = 0;
	private cacheMisses = 0;
	private totalCompiled = 0;
	private totalCleanedFiles = 0;
	private lastCleanupAt: number | null = null;
	private cleanupRunning = false;
	private cleanupTimer: ReturnType<typeof setInterval> | null = null;

	constructor(options: GeneratorEngineOptions = {}) {
		this.maxConcurrent = Math.max(1, options.maxConcurrent ?? MAX_CONCURRENT_TYPST);
		this.cacheDir = options.cacheDir ?? resolve('data/uploads/sujet');
		this.publicUrlPrefix = (options.publicUrlPrefix ?? '/uploads/sujet').replace(/\/+$/, '');
		this.ttlMs = options.ttlMs ?? CACHE_TTL_MS;
		this.cleanupIntervalMs = options.cleanupIntervalMs ?? CLEANUP_INTERVAL_MS;
		this.compiler = options.compiler ?? compileTypstPdf;

		if (options.enableBackgroundCleanupTimer !== false) {
			this.startCleanupTimer();
		}
	}

	private startCleanupTimer(): void {
		if (this.cleanupTimer) return;
		this.cleanupTimer = setInterval(() => {
			void this.cleanupExpiredFiles().catch(() => {});
		}, this.cleanupIntervalMs);
		if (typeof this.cleanupTimer.unref === 'function') {
			this.cleanupTimer.unref();
		}
	}

	stopCleanupTimer(): void {
		if (this.cleanupTimer) {
			clearInterval(this.cleanupTimer);
			this.cleanupTimer = null;
		}
	}

	private acquireSlot(): Promise<void> {
		if (this.activeJobs < this.maxConcurrent) {
			this.activeJobs++;
			return Promise.resolve();
		}
		return new Promise<void>((resolveWait) => {
			this.waitQueue.push(resolveWait);
		});
	}

	private releaseSlot(): void {
		const next = this.waitQueue.shift();
		if (next) {
			// Hand the active slot directly to the next FIFO waiter.
			next();
		} else {
			this.activeJobs = Math.max(0, this.activeJobs - 1);
		}
	}

	/**
	 * Run a single Typst compile invocation through the bounded FIFO concurrency queue.
	 */
	async runQueuedTypstCompile(options: TypstCompileOptions): Promise<TypstCompileResult> {
		await this.acquireSlot();
		try {
			const result = await this.compiler(options);
			if (result.success) {
				this.totalCompiled++;
			}
			return result;
		} finally {
			this.releaseSlot();
		}
	}

	private async isCacheEntryFresh(
		subjectPath: string,
		solutionPath: string,
		now = Date.now()
	): Promise<boolean> {
		try {
			const [subStat, solStat] = await Promise.all([stat(subjectPath), stat(solutionPath)]);
			if (subStat.size <= 0 || solStat.size <= 0) {
				return false;
			}
			return now - subStat.mtimeMs < this.ttlMs && now - solStat.mtimeMs < this.ttlMs;
		} catch {
			return false;
		}
	}

	private maybeTriggerThrottledCleanup(): void {
		if (this.cleanupRunning) return;
		const now = Date.now();
		if (this.lastCleanupAt === null || now - this.lastCleanupAt >= this.cleanupIntervalMs) {
			void this.cleanupExpiredFiles(now).catch(() => {});
		}
	}

	/**
	 * Prune temporary `gen-*.pdf` files older than the 24h TTL from the cache directory.
	 */
	async cleanupExpiredFiles(now = Date.now()): Promise<number> {
		if (this.cleanupRunning) return 0;
		this.cleanupRunning = true;
		let deletedCount = 0;

		try {
			const entries = await readdir(this.cacheDir).catch(() => [] as string[]);
			const orphanTmpTtl = Math.min(this.ttlMs, ORPHAN_TMP_TTL_MS);

			for (const name of entries) {
				const isGenPdf = GENERATED_PDF_PATTERN.test(name);
				const isTempPdf = !isGenPdf && TEMP_GENERATED_PDF_PATTERN.test(name);
				if (!isGenPdf && !isTempPdf) continue;

				const fullPath = join(this.cacheDir, name);
				try {
					const st = await stat(fullPath);
					const maxAge = isTempPdf ? orphanTmpTtl : this.ttlMs;
					if (now - st.mtimeMs > maxAge) {
						await unlink(fullPath);
						deletedCount++;
					}
				} catch {
					// Ignore files deleted concurrently by another worker/request.
				}
			}

			this.totalCleanedFiles += deletedCount;
			this.lastCleanupAt = now;
			return deletedCount;
		} finally {
			this.cleanupRunning = false;
		}
	}

	/**
	 * Compile an assembled exam paper (subject + solution) using:
	 * 1. In-flight deduplication (`inFlightMap`)
	 * 2. Deterministic SHA-256 disk cache with 24h TTL
	 * 3. Bounded concurrency Typst queue (`MAX_CONCURRENT_TYPST = 4`)
	 * 4. Atomic temp-file write + rename and throttled 24h cleanup
	 */
	async compileExamWithQueueAndCache(
		paper: UnifiedExamPaper,
		cacheKeyInput: GeneratorCacheKeyInput
	): Promise<CompiledExamResult> {
		this.maybeTriggerThrottledCleanup();

		const normalizedKeyInput: GeneratorCacheKeyInput = {
			...cacheKeyInput,
			variant: cacheKeyInput.variant ?? paper.variant,
			difficulty: cacheKeyInput.difficulty ?? 'medium'
		};

		const cacheKey = computeExamCacheKey(normalizedKeyInput);
		const fileId = `gen-${cacheKey}`;
		const subjectPath = join(this.cacheDir, `${fileId}.pdf`);
		const solutionPath = join(this.cacheDir, `${fileId}-sol.pdf`);
		const pdfUrl = `${this.publicUrlPrefix}/${fileId}.pdf`;
		const solutionUrl = `${this.publicUrlPrefix}/${fileId}-sol.pdf`;

		// 1. Fast path: deduplicate against an identical in-flight compilation.
		const existingInFlight = this.inFlightMap.get(cacheKey);
		if (existingInFlight) {
			const shared = await existingInFlight;
			if (shared.success) {
				this.cacheHits++;
				return { ...shared, cached: true };
			}
			return shared;
		}

		// 2. Deterministic disk cache check (< 2ms, zero CPU).
		if (await this.isCacheEntryFresh(subjectPath, solutionPath)) {
			this.cacheHits++;
			return {
				success: true,
				cacheKey,
				fileId,
				subjectPath,
				solutionPath,
				pdfUrl,
				solutionUrl,
				solutionCompiled: true,
				cached: true
			};
		}

		// Re-check inFlightMap after awaiting stat() so concurrent misses share one compile.
		const racedInFlight = this.inFlightMap.get(cacheKey);
		if (racedInFlight) {
			const shared = await racedInFlight;
			if (shared.success) {
				this.cacheHits++;
				return { ...shared, cached: true };
			}
			return shared;
		}

		// 3. Cache miss: queue subject + solution Typst compilation and track inFlightMap.
		this.cacheMisses++;
		const compilePromise = this.compilePairAtomically(paper, {
			cacheKey,
			fileId,
			subjectPath,
			solutionPath,
			pdfUrl,
			solutionUrl
		});

		this.inFlightMap.set(cacheKey, compilePromise);
		try {
			return await compilePromise;
		} finally {
			this.inFlightMap.delete(cacheKey);
		}
	}

	private async compilePairAtomically(
		paper: UnifiedExamPaper,
		target: {
			cacheKey: string;
			fileId: string;
			subjectPath: string;
			solutionPath: string;
			pdfUrl: string;
			solutionUrl: string;
		}
	): Promise<CompiledExamResult> {
		await mkdir(this.cacheDir, { recursive: true });

		const runId = randomUUID().slice(0, 8);
		const tmpSubjectPath = join(this.cacheDir, `.tmp-${target.fileId}-${runId}.pdf`);
		const tmpSolutionPath = join(this.cacheDir, `.tmp-${target.fileId}-${runId}-sol.pdf`);

		try {
			const examDoc = paper.examDoc as unknown as Record<string, any>;
			const [subjectResult, solutionResult] = await Promise.all([
				this.runQueuedTypstCompile({
					examDoc,
					outputPath: tmpSubjectPath,
					templateId: paper.templateId,
					isSolution: false
				}),
				this.runQueuedTypstCompile({
					examDoc,
					outputPath: tmpSolutionPath,
					templateId: paper.templateId,
					isSolution: true
				})
			]);

			if (!subjectResult.success) {
				await Promise.all([
					rm(tmpSubjectPath, { force: true }).catch(() => {}),
					rm(tmpSolutionPath, { force: true }).catch(() => {})
				]);
				return {
					success: false,
					cacheKey: target.cacheKey,
					fileId: target.fileId,
					subjectPath: target.subjectPath,
					solutionPath: target.solutionPath,
					pdfUrl: target.pdfUrl,
					solutionUrl: target.pdfUrl,
					solutionCompiled: false,
					cached: false,
					error: subjectResult.error
				};
			}

			await rename(tmpSubjectPath, target.subjectPath);

			if (solutionResult.success) {
				await rename(tmpSolutionPath, target.solutionPath);
			} else {
				await rm(tmpSolutionPath, { force: true }).catch(() => {});
			}

			return {
				success: true,
				cacheKey: target.cacheKey,
				fileId: target.fileId,
				subjectPath: target.subjectPath,
				solutionPath: target.solutionPath,
				pdfUrl: target.pdfUrl,
				solutionUrl: solutionResult.success ? target.solutionUrl : target.pdfUrl,
				solutionCompiled: solutionResult.success,
				cached: false
			};
		} catch (err) {
			await Promise.all([
				rm(tmpSubjectPath, { force: true }).catch(() => {}),
				rm(tmpSolutionPath, { force: true }).catch(() => {})
			]);
			throw err;
		}
	}

	getGeneratorMetrics(): GeneratorMetrics {
		return {
			maxConcurrent: this.maxConcurrent,
			activeJobs: this.activeJobs,
			queuedJobs: this.waitQueue.length,
			inFlightRequests: this.inFlightMap.size,
			cacheHits: this.cacheHits,
			cacheMisses: this.cacheMisses,
			totalCompiled: this.totalCompiled,
			totalCleanedFiles: this.totalCleanedFiles,
			lastCleanupAt: this.lastCleanupAt
		};
	}
}

export const generatorEngine = new GeneratorEngine();

export function compileExamWithQueueAndCache(
	paper: UnifiedExamPaper,
	cacheKeyInput: GeneratorCacheKeyInput
): Promise<CompiledExamResult> {
	return generatorEngine.compileExamWithQueueAndCache(paper, cacheKeyInput);
}

export function runQueuedTypstCompile(options: TypstCompileOptions): Promise<TypstCompileResult> {
	return generatorEngine.runQueuedTypstCompile(options);
}

export function getGeneratorMetrics(): GeneratorMetrics {
	return generatorEngine.getGeneratorMetrics();
}

export function cleanupExpiredGeneratedPdfs(now?: number): Promise<number> {
	return generatorEngine.cleanupExpiredFiles(now);
}
