import { getPluginManifestStats, loadSubjectAssembler } from '../plugin-loader';
import type { SubjectPlugin } from '../types';

const BASIC_GRADES: ReadonlySet<string> = new Set([
	'1ap', '2ap', '3ap', '4ap', '5ap', '1am', '2am', '3am', '4am'
]);

const SUPPORTED_VARIANTS = [
	'trimester_exam',
	'supervised_test',
	'cinq_mock',
	'competency_eval',
	'bem_mock',
	'bac_mock'
] as const;

export const mathPlugin: SubjectPlugin = {
	id: 'math',
	nameAr: 'الرياضيات',
	direction: 'rtl',
	supportedVariants: SUPPORTED_VARIANTS,

	resolveTrack(yearId, subjectId, streamId) {
		if (subjectId === 'MAT-B' && BASIC_GRADES.has(yearId)) return yearId;
		if (yearId === '1as' && subjectId === 'MAT-SE') {
			if (!streamId || streamId === 'TCST' || streamId === 'tcst' || streamId === 'GEN') {
				return '1as_tcst';
			}
		}
		if (yearId === '2as' || yearId === '3as') {
			if (subjectId === 'MAT-SE') return `${yearId}_se`;
			if (subjectId === 'MAT-TM') return `${yearId}_tm`;
			if (subjectId === 'MAT-MATH') return `${yearId}_math`;
		}
		return null;
	},

	async assemble(req) {
		const mod = await loadSubjectAssembler('math');
		return mod.assemble(req);
	},

	getStats() {
		return getPluginManifestStats('math', { tracks: 16, lessons: 336, templates: 288 });
	}
};
