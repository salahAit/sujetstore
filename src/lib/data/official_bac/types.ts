import type { ExamDocument } from '../../modules/SujetBuilder/types';

export type BacArchiveTrackId = '3as_se' | '3as_tm' | '3as_math';

export interface OfficialBacPaperRecord {
	slug: string;
	grade: BacArchiveTrackId;
	yearSubjectId: 682 | 725 | 702;
	streamId: 'SE' | 'TM' | 'MATH';
	streamNameAr: string;
	academicYear: '2023' | '2024' | '2025';
	sessionAr: string;
	coefficient: 5 | 6 | 7;
	duration: string;
	titleAr: string;
	sourcePdfRelPath: string;
	sourceSolutionPdfRelPath: string;
	examDoc: ExamDocument;
}
