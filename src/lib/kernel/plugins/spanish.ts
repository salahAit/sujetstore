import { getPluginManifestStats, loadSubjectAssembler } from '../plugin-loader';
import type { SubjectPlugin } from '../types';

const SUPPORTED_VARIANTS = ['trimester_exam', 'supervised_test', 'bac_mock'] as const;

export function resolveSpanishTrack(
	yearId: string,
	subjectId: string,
	streamId?: string | null
): string | null {
	if (subjectId !== 'LAN-SPA') return null;
	const st = (streamId || '').toUpperCase();
	if (st && st !== 'LE') return null;
	if (yearId === '2as') return '2as_le';
	if (yearId === '3as') return '3as_le';
	return null;
}

export const spanishPlugin: SubjectPlugin = {
	id: 'spanish',
	nameAr: 'اللغة الإسبانية',
	direction: 'ltr',
	supportedVariants: SUPPORTED_VARIANTS,
	resolveTrack(yearId, subjectId, streamId) {
		return resolveSpanishTrack(yearId, subjectId, streamId);
	},
	async assemble(req) {
		const mod = await loadSubjectAssembler('spanish');
		return mod.assemble(req);
	},
	getStats() {
		return getPluginManifestStats('spanish', { tracks: 2, lessons: 24, templates: 36 });
	}
};
