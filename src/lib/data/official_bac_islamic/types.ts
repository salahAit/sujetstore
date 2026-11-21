import type { ExamDocument, TemplateId } from '../../modules/SujetBuilder/types';

export type IslamicBacTrackId = '3as_se' | '3as_tm' | '3as_math' | '3as_ge' | '3as_lp' | '3as_le';

export type IslamicBacStreamId = 'SE' | 'TM' | 'MATH' | 'GE' | 'LP' | 'LE';

export type IslamicBacYearSubjectId = 688 | 708 | 730 | 753 | 772 | 791;

/**
 * Canonical BAC Islamic Sciences paper specification (unified across ALL 6 BAC streams in Algeria:
 * SE, MATH, TM, GE, LP, LE — Coefficient 2, Duration 02h30, Part 1 = 12 pts, Part 2 = 08 pts).
 */
export interface OfficialIslamicBacPaperSpec {
	/** Canonical slug, e.g. `bac-2025-s1-islamic` (PDFs compiled once and shared across all 6 3AS streams) */
	slug: string;
	academicYear: '2023' | '2024' | '2025';
	topicNumber: 1 | 2;
	sessionAr: string;
	coefficient: 2;
	duration: '02 ساعة و30 دقيقة';
	templateId: Extract<TemplateId, 'secondary/bac_official'>;
	titleAr: string;
	themesAr: string[];
	examDoc: ExamDocument;
}
