import {
	ALL_FRENCH_LESSONS,
	ALL_FRENCH_TEMPLATES,
	ALL_FRENCH_TRACK_IDS,
	type FrenchTrackId
} from '../../modules/FrenchTemplates';
import {
	assembleFrenchExam,
	yearSubjectToFrenchTrack,
	type AssembleFrenchExamOptions
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

export const frenchPlugin: SubjectPlugin = {
	id: 'french',
	nameAr: 'اللغة الفرنسية',
	direction: 'ltr',
	supportedVariants: SUPPORTED_VARIANTS,

	resolveTrack(yearId, subjectId, streamId) {
		return yearSubjectToFrenchTrack(yearId, subjectId, streamId);
	},

	assemble(req) {
		const variant =
			req.variant && SUPPORTED_VARIANT_SET.has(req.variant)
				? (req.variant as AssembleFrenchExamOptions['variant'])
				: undefined;

		return assembleFrenchExam({
			grade: req.trackId as FrenchTrackId,
			trimesterId: req.trimesterId,
			seed: req.seed,
			docType: req.docType,
			variant,
			difficulty: req.difficulty,
			academicYear: req.academicYear,
			schoolName: req.schoolName,
			topicNumber: req.topicNumber
		});
	},

	getStats() {
		return {
			tracks: ALL_FRENCH_TRACK_IDS.length,
			lessons: ALL_FRENCH_LESSONS.length,
			templates: ALL_FRENCH_TEMPLATES.length
		};
	}
};
