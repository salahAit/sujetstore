import { OFFICIAL_BAC_SPANISH_PAPERS } from './papers';
import type { OfficialSpanishBacPaperSpec, SpanishBacAcademicYear } from './types';

export { OFFICIAL_BAC_SPANISH_PAPERS };
export {
	buildOfficialSpanishBacMetadata,
	buildOfficialSpanishBacPaper,
	type BuildOfficialSpanishBacPaperOptions,
	type OfficialSpanishBacPaperSpec,
	type SpanishBacAcademicYear,
	type SpanishBacStreamId,
	type SpanishBacSubjectId,
	type SpanishBacTrackId,
	type SpanishBacYearSubjectId
} from './types';

export const ALL_OFFICIAL_BAC_SPANISH_PAPERS: OfficialSpanishBacPaperSpec[] =
	OFFICIAL_BAC_SPANISH_PAPERS;

export function getOfficialSpanishBacPaperBySlug(
	slug: string
): OfficialSpanishBacPaperSpec | undefined {
	return ALL_OFFICIAL_BAC_SPANISH_PAPERS.find((paper) => paper.slug === slug);
}

export function getOfficialSpanishBacPapersByYear(
	academicYear: SpanishBacAcademicYear
): OfficialSpanishBacPaperSpec[] {
	return ALL_OFFICIAL_BAC_SPANISH_PAPERS.filter((paper) => paper.academicYear === academicYear);
}
