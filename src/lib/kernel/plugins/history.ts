import { getPluginManifestStats, loadSubjectAssembler } from '../plugin-loader';
import type { SubjectAssembleRequest, SubjectPlugin, SubjectPluginStats, UnifiedExamPaper } from '../types';

const BASIC_GRADES = new Set(['3ap', '4ap', '5ap', '1am', '2am', '3am', '4am']);

const SUPPORTED_VARIANTS = [
	'trimester_exam',
	'supervised_test',
	'competency_eval',
	'bem_mock',
	'bac_mock'
] as const;

export function resolveHistoryTrack(
	yearId: string,
	subjectId: string,
	streamId?: string | null
): string | null {
	if (subjectId === 'HIS-B' && BASIC_GRADES.has(yearId)) return yearId;
	const st = (streamId || '').toUpperCase();
	if (subjectId === 'HIS-SCI') {
		if (yearId === '1as') return '1as_tcst';
		if (yearId === '2as') {
			return st === 'MATH' ? '2as_math' : st === 'TM' ? '2as_tm' : '2as_se';
		}
		if (yearId === '3as') {
			return st === 'MATH' ? '3as_math' : st === 'TM' ? '3as_tm' : '3as_se';
		}
	}
	if (subjectId === 'HIS-GE') {
		if (yearId === '2as') return '2as_ge';
		if (yearId === '3as') return '3as_ge';
	}
	if (subjectId === 'HIS-LP') {
		if (yearId === '1as') return '1as_tcl';
		if (yearId === '2as') return '2as_lp';
		if (yearId === '3as') return '3as_lp';
	}
	if (subjectId === 'HIS-LE') {
		if (yearId === '2as') return '2as_le';
		if (yearId === '3as') return '3as_le';
	}
	return null;
}

export const historyPlugin: SubjectPlugin = {
	id: 'history',
	nameAr: 'التاريخ والجغرافيا',
	direction: 'rtl',
	supportedVariants: SUPPORTED_VARIANTS,
	resolveTrack(yearId: string, subjectId: string, streamId?: string | null): string | null {
		return resolveHistoryTrack(yearId, subjectId, streamId);
	},
	async assemble(req: SubjectAssembleRequest): Promise<UnifiedExamPaper> {
		const mod = await loadSubjectAssembler('history');
		return mod.assemble(req);
	},
	getStats(): SubjectPluginStats {
		return getPluginManifestStats('history', { tracks: 21, lessons: 189, templates: 384 });
	}
};
