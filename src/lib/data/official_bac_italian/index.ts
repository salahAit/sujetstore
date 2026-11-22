import { OFFICIAL_BAC_ITALIAN_PAPERS } from './papers';
import type { ItalianBacAcademicYear, OfficialItalianBacPaperSpec } from './types';

export { OFFICIAL_BAC_ITALIAN_PAPERS };
export {
	buildOfficialItalianBacMetadata,
	buildOfficialItalianBacPaper,
	type BuildOfficialItalianBacPaperOptions,
	type ItalianBacAcademicYear,
	type ItalianBacStreamId,
	type ItalianBacSubjectId,
	type ItalianBacTrackId,
	type ItalianBacYearSubjectId,
	type OfficialItalianBacPaperSpec
} from './types';

export const ALL_OFFICIAL_BAC_ITALIAN_PAPERS: OfficialItalianBacPaperSpec[] =
	OFFICIAL_BAC_ITALIAN_PAPERS;

export function getOfficialItalianBacPaperBySlug(
	slug: string
): OfficialItalianBacPaperSpec | undefined {
	return ALL_OFFICIAL_BAC_ITALIAN_PAPERS.find((paper) => paper.slug === slug);
}

export function getOfficialItalianBacPapersByYear(
	academicYear: ItalianBacAcademicYear
): OfficialItalianBacPaperSpec[] {
	return ALL_OFFICIAL_BAC_ITALIAN_PAPERS.filter((paper) => paper.academicYear === academicYear);
}
