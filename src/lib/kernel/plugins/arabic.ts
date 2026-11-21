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

export const arabicPlugin: SubjectPlugin = {
	id: 'arabic',
	nameAr: 'اللغة العربية',
	direction: 'rtl',
	supportedVariants: SUPPORTED_VARIANTS,

	resolveTrack(yearId, subjectId, streamId) {
		if (subjectId === 'ARB-B' && BASIC_GRADES.has(yearId)) return yearId;
		if (yearId === '1as') {
			if (subjectId === 'ARB-SCI') return '1as_tcst';
			if (subjectId === 'ARB-LP') return '1as_tcl';
		}
		if (yearId === '2as' || yearId === '3as') {
			if (subjectId === 'ARB-LP') return `${yearId}_lp`;
			if (subjectId === 'ARB-LE') return `${yearId}_le`;
			if (subjectId === 'ARB-SCI') {
				const s = (streamId || '').toUpperCase();
				if (s === 'TM') return `${yearId}_tm`;
				if (s === 'MATH') return `${yearId}_math`;
				if (s === 'GE') return `${yearId}_ge`;
				return `${yearId}_se`;
			}
		}
		return null;
	},

	async assemble(req) {
		const mod = await loadSubjectAssembler('arabic');
		return mod.assemble(req);
	},

	getStats() {
		return getPluginManifestStats('arabic', { tracks: 23, lessons: 312, templates: 300 });
	}
};
