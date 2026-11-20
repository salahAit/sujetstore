import {
	ALL_ARABIC_LESSONS,
	ALL_ARABIC_TEMPLATES,
	ALL_ARABIC_TRACK_IDS,
	type ArabicTrackId
} from '../../modules/ArabicTemplates';
import {
	assembleArabicExam,
	yearSubjectToArabicTrack,
	type AssembleArabicExamOptions
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

export const arabicPlugin: SubjectPlugin = {
	id: 'arabic',
	nameAr: 'اللغة العربية',
	direction: 'rtl',
	supportedVariants: SUPPORTED_VARIANTS,

	resolveTrack(yearId, subjectId, streamId) {
		return yearSubjectToArabicTrack(yearId, subjectId, streamId);
	},

	assemble(req) {
		const variant =
			req.variant && SUPPORTED_VARIANT_SET.has(req.variant)
				? (req.variant as AssembleArabicExamOptions['variant'])
				: undefined;

		return assembleArabicExam({
			grade: req.trackId as ArabicTrackId,
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
			tracks: ALL_ARABIC_TRACK_IDS.length,
			lessons: ALL_ARABIC_LESSONS.length,
			templates: ALL_ARABIC_TEMPLATES.length
		};
	}
};
