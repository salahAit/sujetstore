import type { ExamDocument, TemplateId } from '../../modules/SujetBuilder/types';

export type EnglishBacTrackId = '3as_se' | '3as_tm' | '3as_math' | '3as_ge' | '3as_lp' | '3as_le';

export type EnglishBacSubjectId = 'ENG-SEC';

export type EnglishBacStreamId = 'SE' | 'TM' | 'MATH' | 'GE' | 'LP' | 'LE';

export type EnglishBacYearSubjectId = 686 | 706 | 728 | 751 | 770 | 789;

export interface OfficialEnglishBacPaperSpec {
	slug: string;
	grade: EnglishBacTrackId;
	yearSubjectId: EnglishBacYearSubjectId;
	subjectId: EnglishBacSubjectId;
	streamId: EnglishBacStreamId;
	streamNameAr:
		| 'علوم تجريبية'
		| 'تقني رياضي'
		| 'رياضيات'
		| 'تسيير واقتصاد'
		| 'آداب وفلسفة'
		| 'لغات أجنبية';
	streamNameEn:
		| 'Experimental Sciences'
		| 'Technical Mathematics'
		| 'Mathematics'
		| 'Management & Economics'
		| 'Literature & Philosophy'
		| 'Foreign Languages';
	academicYear: '2023' | '2024' | '2025';
	sessionEn: string;
	sessionAr: string;
	coefficient: 2 | 3 | 5;
	duration: '02 Hours 30 Min' | '03 Hours 30 Min';
	pointsSplit: readonly [number, number, number];
	unitThemeEn: string;
	titleEn: string;
	titleAr: string;
	themesEn: string[];
	themesAr: string[];
	templateId: Extract<TemplateId, 'english/bac_official'>;
	examDoc: ExamDocument;
}
