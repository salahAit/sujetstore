import { getPluginManifestStats, loadSubjectAssembler } from '../plugin-loader';
import type { SubjectPlugin } from '../types';

const BASIC_GRADES: ReadonlySet<string> = new Set(['3ap', '4ap', '5ap', '1am', '2am', '3am', '4am']);

const SUPPORTED_VARIANTS = [
	'trimester_exam',
	'supervised_test',
	'competency_eval',
	'bem_mock',
	'bac_mock'
] as const;

export const frenchPlugin: SubjectPlugin = {
	id: 'french',
	nameAr: 'اللغة الفرنسية',
	direction: 'ltr',
	supportedVariants: SUPPORTED_VARIANTS,

	resolveTrack(yearId, subjectId, streamId) {
		if (subjectId === 'FRE-B' && BASIC_GRADES.has(yearId)) return yearId;
		if (subjectId === 'FRE-SEC') {
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
		const mod = await loadSubjectAssembler('french');
		return mod.assemble(req);
	},

	getStats() {
		return getPluginManifestStats('french', { tracks: 21, lessons: 309, templates: 315 });
	}
};
