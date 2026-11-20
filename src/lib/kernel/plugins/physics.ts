import {
	ALL_PHYSICS_LESSONS,
	ALL_PHYSICS_TEMPLATES,
	PHYSICS_LESSONS_BY_GRADE,
	type PhysicsTrackId
} from '../../modules/PhysicsTemplates';
import {
	assemblePhysicsExam,
	yearSubjectToPhysicsTrack,
	type AssemblePhysicsExamOptions
} from '../../server/exam-assembler';
import type { SubjectPlugin } from '../types';

const SUPPORTED_VARIANTS = [
	'trimester_exam',
	'supervised_test',
	'bem_mock',
	'bac_mock'
] as const;

const SUPPORTED_VARIANT_SET: ReadonlySet<string> = new Set(SUPPORTED_VARIANTS);

export const physicsPlugin: SubjectPlugin = {
	id: 'physics',
	nameAr: 'العلوم الفيزيائية',
	direction: 'rtl',
	supportedVariants: SUPPORTED_VARIANTS,

	resolveTrack(yearId, subjectId, streamId) {
		return yearSubjectToPhysicsTrack(yearId, subjectId, streamId);
	},

	assemble(req) {
		const variant =
			req.variant && SUPPORTED_VARIANT_SET.has(req.variant)
				? (req.variant as AssemblePhysicsExamOptions['variant'])
				: undefined;

		return assemblePhysicsExam({
			grade: req.trackId as PhysicsTrackId,
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
			tracks: Object.keys(PHYSICS_LESSONS_BY_GRADE).length,
			lessons: ALL_PHYSICS_LESSONS.length,
			templates: ALL_PHYSICS_TEMPLATES.length
		};
	}
};
