import type { ExamDocument, TemplateId } from '../../modules/SujetBuilder/types';

export type FrenchBacTrackId = '3as_se' | '3as_tm' | '3as_math' | '3as_ge' | '3as_lp' | '3as_le';

export type FrenchBacSubjectId = 'FRE-SEC';

export type FrenchBacStreamId = 'SE' | 'TM' | 'MATH' | 'GE' | 'LP' | 'LE';

export type FrenchBacYearSubjectId = 685 | 705 | 727 | 750 | 769 | 788;

export interface OfficialFrenchBacPaperSpec {
	slug: string;
	grade: FrenchBacTrackId;
	yearSubjectId: FrenchBacYearSubjectId;
	subjectId: FrenchBacSubjectId;
	streamId: FrenchBacStreamId;
	streamNameAr:
		| 'علوم تجريبية'
		| 'تقني رياضي'
		| 'رياضيات'
		| 'تسيير واقتصاد'
		| 'آداب وفلسفة'
		| 'لغات أجنبية';
	streamNameFr:
		| 'Sciences Expérimentales'
		| 'Techniques Mathématiques'
		| 'Mathématiques'
		| 'Gestion et Économie'
		| 'Lettres et Philosophie'
		| 'Langues Étrangères';
	academicYear: '2023' | '2024' | '2025';
	sessionFr: string;
	sessionAr: string;
	coefficient: 2 | 3 | 5;
	duration: '02 h 30' | '03 h 30';
	pointsSplit: readonly [number, number, number];
	unitThemeFr: string;
	titleFr: string;
	titleAr: string;
	themesFr: string[];
	themesAr: string[];
	templateId: Extract<TemplateId, 'french/bac_official'>;
	examDoc: ExamDocument;
}
