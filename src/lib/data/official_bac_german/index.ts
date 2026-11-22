import { OFFICIAL_BAC_GERMAN_PAPERS } from './papers';
import type { GermanBacAcademicYear, OfficialGermanBacPaperSpec } from './types';

export { OFFICIAL_BAC_GERMAN_PAPERS };
export {
	buildOfficialGermanBacMetadata,
	buildOfficialGermanBacPaper,
	type BuildOfficialGermanBacPaperOptions,
	type GermanBacAcademicYear,
	type GermanBacStreamId,
	type GermanBacSubjectId,
	type GermanBacTrackId,
	type GermanBacYearSubjectId,
	type OfficialGermanBacPaperSpec
} from './types';

export const ALL_OFFICIAL_BAC_GERMAN_PAPERS: OfficialGermanBacPaperSpec[] =
	OFFICIAL_BAC_GERMAN_PAPERS;

export function getOfficialGermanBacPaperBySlug(
	slug: string
): OfficialGermanBacPaperSpec | undefined {
	return ALL_OFFICIAL_BAC_GERMAN_PAPERS.find((paper) => paper.slug === slug);
}

export function getOfficialGermanBacPapersByYear(
	academicYear: GermanBacAcademicYear
): OfficialGermanBacPaperSpec[] {
	return ALL_OFFICIAL_BAC_GERMAN_PAPERS.filter((paper) => paper.academicYear === academicYear);
}
