import { getPluginManifestStats, loadSubjectAssembler } from '../plugin-loader';
import type { SubjectPlugin } from '../types';

const MIDDLE_GRADES: ReadonlySet<string> = new Set(['1am', '2am', '3am', '4am']);

const SUPPORTED_VARIANTS = [
	'trimester_exam',
	'supervised_test',
	'bem_mock',
	'bac_mock'
] as const;

export const physicsPlugin: SubjectPlugin = {
	id: 'physics',
	nameAr: 'العلوم الفيزيائية',
	direction: 'rtl',
	supportedVariants: SUPPORTED_VARIANTS,

	resolveTrack(yearId, subjectId, streamId) {
		if (subjectId === 'PHY-B' && MIDDLE_GRADES.has(yearId)) return yearId;
		if (yearId === '1as' && subjectId === 'PHY-SE') {
			if (!streamId || streamId === 'TCST' || streamId === 'tcst' || streamId === 'GEN') {
				return '1as_tcst';
			}
		}
		if (yearId === '1as' && subjectId === 'PHY-LIT') {
			if (!streamId || streamId === 'TCL' || streamId === 'tcl' || streamId === 'GEN') {
				return '1as_tcl';
			}
		}
		if (yearId === '2as' || yearId === '3as') {
			if (subjectId === 'PHY-SE') return `${yearId}_se`;
			if (subjectId === 'PHY-MTM') {
				if (streamId === 'TM') return `${yearId}_tm`;
				if (streamId === 'MATH') return `${yearId}_math`;
			}
		}
		return null;
	},

	async assemble(req) {
		const mod = await loadSubjectAssembler('physics');
		return mod.assemble(req);
	},

	getStats() {
		return getPluginManifestStats('physics', { tracks: 12, lessons: 167, templates: 229 });
	}
};
