#!/usr/bin/env bun
/**
 * scripts/rebuild-illustrated-pdfs.ts
 * Rebuilds all Primary School (1AP-5AP across all 6 subjects) and Middle/Secondary
 * Natural Sciences (1AM-4AM BEM + 1AS-3AS BAC) PDFs in /dev/shm RAM across 10 workers,
 * syncing directly to RustFS S3 + MEDIA_ROOT and bumping `documents.updated_at`.
 */

import {
	startScopedBatchRebuild,
	waitForRebuildJob,
	type BatchRebuildScope
} from '../src/lib/server/typst-batch-ram';

const SCOPES: Array<{ label: string; scope: BatchRebuildScope }> = [
	{ label: 'Primary 1AP-5AP (All 6 Subjects)', scope: { levelId: 'primaire' } },
	{ label: 'Middle 1AM-4AM BEM Sciences (SCI-B)', scope: { levelId: 'moyen', subjectId: 'SCI-B' } },
	{ label: 'Secondary 1AS Sciences (SCI-B)', scope: { levelId: 'secondaire', subjectId: 'SCI-B' } },
	{ label: 'Secondary 2AS/3AS BAC Sciences (SCI-SE)', scope: { subjectId: 'SCI-SE' } },
	{ label: 'Secondary 2AS/3AS BAC Sciences (SCI-MATH)', scope: { subjectId: 'SCI-MATH' } }
];

async function main() {
	const t0 = performance.now();
	let grandCompleted = 0;
	let grandFailed = 0;
	let grandPdfs = 0;

	for (const item of SCOPES) {
		const started = startScopedBatchRebuild({ scope: item.scope, workers: 10 });
		console.log(
			`[rebuild-illustrated] Starting "${item.label}": ${started.totalTargets} docs (${started.workers} workers)...`
		);
		if (started.totalTargets === 0) continue;
		const done = await waitForRebuildJob(started.jobId);
		if (!done) {
			throw new Error(`Job ${started.jobId} disappeared`);
		}
		console.log(
			`  -> ${done.status.toUpperCase()}: completed=${done.completed}, failed=${done.failed}, pdfs=${done.pdfsCompiled}, rate=${done.pdfsPerSec} PDF/s (${(done.elapsedMs / 1000).toFixed(1)}s)`
		);
		if (done.failed > 0) {
			console.error('  Failure logs:', done.recentLogs.slice(-10).join('\n  '));
		}
		grandCompleted += done.completed;
		grandFailed += done.failed;
		grandPdfs += done.pdfsCompiled;
	}

	const totalSec = ((performance.now() - t0) / 1000).toFixed(1);
	console.log(
		`\n[rebuild-illustrated] SUMMARY: docs=${grandCompleted}, failed=${grandFailed}, totalPdfs=${grandPdfs} in ${totalSec}s`
	);
	if (grandFailed > 0) {
		process.exit(1);
	}
}

main().catch((err) => {
	console.error('[rebuild-illustrated] ERROR:', err);
	process.exit(1);
});
