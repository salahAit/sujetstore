import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isStaffRole } from '#lib/server/auth';
import {
	countRebuildTargets,
	getRamWorkspaceRoot,
	getRebuildJobStatus,
	listRecentRebuildJobs,
	startScopedBatchRebuild,
	type BatchRebuildScope
} from '#lib/server/typst-batch-ram';

function parseScope(raw: unknown): BatchRebuildScope {
	if (!raw || typeof raw !== 'object') return { all: true };
	const obj = raw as Record<string, unknown>;
	const scope: BatchRebuildScope = {};

	if (obj.all === true || obj.all === 'true' || obj.all === '1') {
		scope.all = true;
	}
	if (
		obj.language === 'ar' ||
		obj.language === 'fr' ||
		obj.language === 'en' ||
		obj.language === 'es' ||
		obj.language === 'de' ||
		obj.language === 'it'
	) {
		scope.language = obj.language;
	}
	if (typeof obj.levelId === 'string' && obj.levelId.trim()) {
		scope.levelId = obj.levelId.trim();
	}
	if (typeof obj.yearId === 'string' && obj.yearId.trim()) {
		scope.yearId = obj.yearId.trim();
	}
	if (typeof obj.subjectId === 'string' && obj.subjectId.trim()) {
		scope.subjectId = obj.subjectId.trim();
	}
	if (obj.docType === 'exam' || obj.docType === 'test') {
		scope.docType = obj.docType;
	}
	if (obj.limit !== undefined && obj.limit !== null && obj.limit !== '') {
		const n = Number(obj.limit);
		if (Number.isFinite(n) && n > 0) {
			scope.limit = Math.floor(n);
		}
	}

	if (!scope.all && !scope.language && !scope.levelId && !scope.yearId && !scope.subjectId && !scope.docType) {
		scope.all = true;
	}
	return scope;
}

export const GET: RequestHandler = async ({ url, locals }) => {
	if (!locals.user || !isStaffRole(locals.user.role)) {
		return json({ error: 'غير مصرح' }, { status: 401 });
	}

	const jobId = url.searchParams.get('jobId')?.trim();
	if (jobId) {
		const status = getRebuildJobStatus(jobId);
		if (!status) {
			return json({ error: 'لم يتم العثور على مهمة إعادة البناء' }, { status: 404 });
		}
		return json(status);
	}

	if (url.searchParams.get('countOnly') === '1') {
		const scope = parseScope({
			all: url.searchParams.get('all'),
			language: url.searchParams.get('language'),
			levelId: url.searchParams.get('levelId'),
			yearId: url.searchParams.get('yearId'),
			subjectId: url.searchParams.get('subjectId'),
			docType: url.searchParams.get('docType'),
			limit: url.searchParams.get('limit')
		});
		return json({ totalTargets: countRebuildTargets(scope), scope });
	}

	return json({
		jobs: listRecentRebuildJobs(),
		ram: getRamWorkspaceRoot()
	});
};

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user || !isStaffRole(locals.user.role)) {
		return json({ error: 'غير مصرح' }, { status: 401 });
	}

	let body: Record<string, unknown>;
	try {
		body = (await request.json()) as Record<string, unknown>;
	} catch {
		return json({ error: 'بيانات JSON غير صالحة' }, { status: 400 });
	}

	const scope = parseScope(body.scope);
	if (body.dryRun === true) {
		return json({ ok: true, totalTargets: countRebuildTargets(scope), scope });
	}

	const workersNum = body.workers !== undefined ? Number(body.workers) : 10;
	const started = startScopedBatchRebuild({
		scope,
		workers: Number.isFinite(workersNum) ? workersNum : 10
	});

	return json({
		ok: true,
		...started
	});
};
