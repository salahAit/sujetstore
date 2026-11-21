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

export const sciencesPlugin: SubjectPlugin = {
	id: 'sciences',
	nameAr: 'علوم الطبيعة والحياة',
	direction: 'rtl',
	supportedVariants: SUPPORTED_VARIANTS,

	resolveTrack(yearId, subjectId, streamId) {
		if (subjectId === 'SCI-B' && BASIC_GRADES.has(yearId)) return yearId;
		if (yearId === '1as' && subjectId === 'SCI-SE') {
			if (!streamId || streamId === 'TCST' || streamId === 'tcst' || streamId === 'GEN') {
				return '1as_tcst';
			}
		}
		if (yearId === '2as' || yearId === '3as') {
			if (subjectId === 'SCI-SE') return `${yearId}_se`;
			if (subjectId === 'SCI-MATH') return `${yearId}_math`;
		}
		return null;
	},

	async assemble(req) {
		const mod = await loadSubjectAssembler('sciences');
		return mod.assemble(req);
	},

	getStats() {
		return getPluginManifestStats('sciences', { tracks: 14, lessons: 177, templates: 231 });
	}
};
