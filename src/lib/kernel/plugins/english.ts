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

export const englishPlugin: SubjectPlugin = {
	id: 'english',
	nameAr: 'اللغة الإنجليزية',
	direction: 'ltr',
	supportedVariants: SUPPORTED_VARIANTS,

	resolveTrack(yearId, subjectId, streamId) {
		if (subjectId === 'ENG-B' && BASIC_GRADES.has(yearId)) return yearId;
		if (subjectId === 'ENG-SEC') {
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
		const mod = await loadSubjectAssembler('english');
		return mod.assemble(req);
	},

	getStats() {
		return getPluginManifestStats('english', { tracks: 21, lessons: 285, templates: 285 });
	}
};
