import {
	ALL_SCIENCES_LESSONS,
	ALL_SCIENCES_TEMPLATES,
	SCIENCES_LESSONS_BY_GRADE,
	type SciencesTrackId
} from '../../modules/SciencesTemplates';
import {
	assembleSciencesExam,
	yearSubjectToSciencesTrack,
	type AssembleSciencesExamOptions
} from '../../server/exam-assembler';
import type { SubjectPlugin } from '../types';

const SUPPORTED_VARIANTS = [
	'trimester_exam',
	'supervised_test',
	'competency_eval',
	'bem_mock',
	'bac_mock'
] as const;

const SUPPORTED_VARIANT_SET: ReadonlySet<string> = new Set(SUPPORTED_VARIANTS);

export const sciencesPlugin: SubjectPlugin = {
	id: 'sciences',
	nameAr: 'علوم الطبيعة والحياة',
	direction: 'rtl',
	supportedVariants: SUPPORTED_VARIANTS,

	resolveTrack(yearId, subjectId, streamId) {
		return yearSubjectToSciencesTrack(yearId, subjectId, streamId);
	},

	assemble(req) {
		const variant =
			req.variant && SUPPORTED_VARIANT_SET.has(req.variant)
				? (req.variant as AssembleSciencesExamOptions['variant'])
				: undefined;

		return assembleSciencesExam({
			grade: req.trackId as SciencesTrackId,
			trimesterId: req.trimesterId,
			seed: req.seed,
			docType: req.docType,
			variant,
			difficulty: req.difficulty,
			academicYear: req.academicYear,
			schoolName: req.schoolName
		});
	},

	getStats() {
		return {
			tracks: Object.keys(SCIENCES_LESSONS_BY_GRADE).length,
			lessons: ALL_SCIENCES_LESSONS.length,
			templates: ALL_SCIENCES_TEMPLATES.length
		};
	}
};
