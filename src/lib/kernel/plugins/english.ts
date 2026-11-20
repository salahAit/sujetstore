import {
	ALL_ENGLISH_LESSONS,
	ALL_ENGLISH_TEMPLATES,
	ALL_ENGLISH_TRACK_IDS,
	type EnglishTrackId
} from '../../modules/EnglishTemplates';
import {
	assembleEnglishExam,
	yearSubjectToEnglishTrack,
	type AssembleEnglishExamOptions
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

export const englishPlugin: SubjectPlugin = {
	id: 'english',
	nameAr: 'اللغة الإنجليزية',
	direction: 'ltr',
	supportedVariants: SUPPORTED_VARIANTS,

	resolveTrack(yearId, subjectId, streamId) {
		return yearSubjectToEnglishTrack(yearId, subjectId, streamId);
	},

	assemble(req) {
		const variant =
			req.variant && SUPPORTED_VARIANT_SET.has(req.variant)
				? (req.variant as AssembleEnglishExamOptions['variant'])
				: undefined;

		return assembleEnglishExam({
			grade: req.trackId as EnglishTrackId,
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
			tracks: ALL_ENGLISH_TRACK_IDS.length,
			lessons: ALL_ENGLISH_LESSONS.length,
			templates: ALL_ENGLISH_TEMPLATES.length
		};
	}
};
