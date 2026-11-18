import type { ExamDocument } from '../../modules/SujetBuilder/types';

export type PhysicsBacTrackId = '3as_se' | '3as_tm' | '3as_math';

export interface OfficialBacPhysicsPaperRecord {
	slug: string;
	grade: PhysicsBacTrackId;
	yearSubjectId: 683 | 726 | 703;
	streamId: 'SE' | 'TM' | 'MATH';
	streamNameAr: string;
	academicYear: '2023' | '2024' | '2025';
	sessionAr: string;
	coefficient: 5 | 6;
	duration: string;
	titleAr: string;
	sourcePdfRelPath: string;
	sourceSolutionPdfRelPath: string;
	examDoc: ExamDocument;
}
