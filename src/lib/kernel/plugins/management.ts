import { getPluginManifestStats, loadSubjectAssembler } from '../plugin-loader';
import type { SubjectPlugin } from '../types';

const SUPPORTED_VARIANTS = ['trimester_exam', 'supervised_test', 'bac_mock'] as const;

export const managementPlugin: SubjectPlugin = {
	id: 'management',
	nameAr: 'التسيير والاقتصاد والقانون',
	direction: 'rtl',
	supportedVariants: SUPPORTED_VARIANTS,

	resolveTrack(yearId, subjectId, streamId) {
		const st = (streamId || '').toUpperCase();
		if (st && st !== 'GE') return null;
		if (yearId !== '2as' && yearId !== '3as') return null;
		if (subjectId === 'ACC-FIN') return `${yearId}_acc`;
		if (subjectId === 'ECO-MAN') return `${yearId}_eco`;
		if (subjectId === 'LAW') return `${yearId}_law`;
		return null;
	},

	async assemble(req) {
		const mod = await loadSubjectAssembler('management');
		return mod.assemble(req);
	},

	getStats() {
		return getPluginManifestStats('management', { tracks: 6, lessons: 72, templates: 90 });
	}
};
