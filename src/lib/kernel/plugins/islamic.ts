import {
	ALL_ISLAMIC_LESSONS,
	ALL_ISLAMIC_TEMPLATES,
	ALL_ISLAMIC_TRACK_IDS,
	type IslamicTrackId
} from '../../modules/IslamicTemplates';
import {
	assembleIslamicExam,
	yearSubjectToIslamicTrack,
	type AssembleIslamicExamOptions
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

export const islamicPlugin: SubjectPlugin = {
	id: 'islamic',
	nameAr: 'التربية الإسلامية والعلوم الإسلامية',
	direction: 'rtl',
	supportedVariants: SUPPORTED_VARIANTS,

	resolveTrack(yearId, subjectId, streamId) {
		return yearSubjectToIslamicTrack(yearId, subjectId, streamId);
	},

	assemble(req) {
		const variant =
			req.variant && SUPPORTED_VARIANT_SET.has(req.variant)
				? (req.variant as AssembleIslamicExamOptions['variant'])
				: undefined;

		return assembleIslamicExam({
			grade: req.trackId as IslamicTrackId,
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
			tracks: ALL_ISLAMIC_TRACK_IDS.length,
			lessons: ALL_ISLAMIC_LESSONS.length,
			templates: ALL_ISLAMIC_TEMPLATES.length
		};
	}
};
