import type { ExamDocument, TemplateId } from '../../modules/SujetBuilder/types';

export type SciencesBacTrackId = '3as_se' | '3as_math';

export interface OfficialSciencesBacPaperSpec {
	slug: string;
	grade: SciencesBacTrackId;
	yearSubjectId: 684 | 704;
	subjectId: 'SCI-SE' | 'SCI-MATH';
	streamId: 'SE' | 'MATH';
	streamNameAr: 'علوم تجريبية' | 'رياضيات';
	academicYear: '2023' | '2024' | '2025';
	sessionAr: string;
	coefficient: 6 | 2;
	duration: '04 ساعات و30 دقيقة' | '02 ساعة و30 دقيقة';
	templateId: Extract<TemplateId, 'secondary/bac_official'>;
	titleAr: string;
	themesAr: string[];
	sourcePdfRelPath: string;
	sourceSolutionPdfRelPath: string;
	examDoc: ExamDocument;
}
