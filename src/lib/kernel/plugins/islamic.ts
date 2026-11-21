import { getPluginManifestStats, loadSubjectAssembler } from '../plugin-loader';
import type { SubjectPlugin } from '../types';

const BASIC_GRADES: ReadonlySet<string> = new Set([
	'1ap', '2ap', '3ap', '4ap', '5ap', '1am', '2am', '3am', '4am'
]);

const SUPPORTED_VARIANTS = [
	'trimester_exam',
	'supervised_test',
	'competency_eval',
	'bem_mock',
	'bac_mock'
] as const;

export const islamicPlugin: SubjectPlugin = {
	id: 'islamic',
	nameAr: 'التربية الإسلامية والعلوم الإسلامية',
	direction: 'rtl',
	supportedVariants: SUPPORTED_VARIANTS,

	resolveTrack(yearId, subjectId, streamId) {
		if (subjectId === 'ISL-B' && BASIC_GRADES.has(yearId)) return yearId;
		if (subjectId === 'ISL-ALL') {
			const s = (streamId || '').toUpperCase();
			if (yearId === '1as') return s === 'TCL' ? '1as_tcl' : '1as_tcst';
			if (yearId === '2as' || yearId === '3as') {
				if (s === 'TM') return `${yearId}_tm`;
				if (s === 'MATH') return `${yearId}_math`;
				if (s === 'GE') return `${yearId}_ge`;
				if (s === 'LP') return `${yearId}_lp`;
				if (s === 'LE') return `${yearId}_le`;
				return `${yearId}_se`;
			}
		}
		return null;
	},

	async assemble(req) {
		const mod = await loadSubjectAssembler('islamic');
		return mod.assemble(req);
	},

	getStats() {
		return getPluginManifestStats('islamic', { tracks: 23, lessons: 441, templates: 438 });
	}
};
