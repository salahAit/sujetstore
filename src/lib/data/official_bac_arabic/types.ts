import type { ExamDocument, TemplateId } from '../../modules/SujetBuilder/types';

export type ArabicBacTrackId = '3as_se' | '3as_tm' | '3as_math' | '3as_ge' | '3as_lp' | '3as_le';

export type ArabicBacSubjectId = 'ARB-SCI' | 'ARB-LP' | 'ARB-LE';

export type ArabicBacStreamId = 'SE' | 'TM' | 'MATH' | 'GE' | 'LP' | 'LE';

export type ArabicBacYearSubjectId = 681 | 701 | 724 | 748 | 767 | 786;

export interface OfficialArabicBacPaperSpec {
	slug: string;
	grade: ArabicBacTrackId;
	yearSubjectId: ArabicBacYearSubjectId;
	subjectId: ArabicBacSubjectId;
	streamId: ArabicBacStreamId;
	streamNameAr:
		| 'علوم تجريبية'
		| 'تقني رياضي'
		| 'رياضيات'
		| 'تسيير واقتصاد'
		| 'آداب وفلسفة'
		| 'لغات أجنبية';
	academicYear: '2023' | '2024' | '2025';
	sessionAr: string;
	coefficient: 3 | 5 | 6;
	duration: '02 ساعة و30 دقيقة' | '04 ساعات و30 دقيقة' | '04 ساعات';
	hasCriticalEvaluation: boolean;
	passageKind: 'poetry' | 'prose';
	authorAr: string;
	templateId: Extract<TemplateId, 'secondary/bac_official'>;
	titleAr: string;
	themesAr: string[];
	sourcePdfRelPath: string;
	sourceSolutionPdfRelPath: string;
	examDoc: ExamDocument;
}
