import {
	ALL_LESSONS,
	ALL_TEMPLATES,
	LESSONS_BY_GRADE,
	type GradeId
} from '../../modules/MathTemplates';
import {
	assembleExam,
	yearSubjectToGrade,
	type AssembleExamOptions
} from '../../server/exam-assembler';
import type { SubjectPlugin } from '../types';

const SUPPORTED_VARIANTS = [
	'trimester_exam',
	'supervised_test',
	'cinq_mock',
	'competency_eval',
	'bem_mock',
	'bac_mock'
] as const;

const SUPPORTED_VARIANT_SET: ReadonlySet<string> = new Set(SUPPORTED_VARIANTS);

export const mathPlugin: SubjectPlugin = {
	id: 'math',
	nameAr: 'الرياضيات',
	direction: 'rtl',
	supportedVariants: SUPPORTED_VARIANTS,

	resolveTrack(yearId, subjectId, streamId) {
		return yearSubjectToGrade(yearId, subjectId, streamId);
	},

	assemble(req) {
		const variant =
			req.variant && SUPPORTED_VARIANT_SET.has(req.variant)
				? (req.variant as AssembleExamOptions['variant'])
				: undefined;

		return assembleExam({
			grade: req.trackId as GradeId,
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
			tracks: Object.keys(LESSONS_BY_GRADE).length,
			lessons: ALL_LESSONS.length,
			templates: ALL_TEMPLATES.length
		};
	}
};
