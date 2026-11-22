import { OFFICIAL_BAC_HISTORY_GE_PAPERS } from './his_ge';
import { OFFICIAL_BAC_HISTORY_LE_PAPERS } from './his_le';
import { OFFICIAL_BAC_HISTORY_LP_PAPERS } from './his_lp';
import { OFFICIAL_BAC_HISTORY_SCI_PAPERS } from './his_sci';
import {
	HISTORY_BAC_STREAM_PROFILES,
	HISTORY_BAC_TRACK_BINDINGS,
	type HistoryBacStreamGroup,
	type HistoryBacTrackId,
	type OfficialHistoryBacDbBinding,
	type OfficialHistoryBacPaperSpec
} from './types';

export {
	OFFICIAL_BAC_HISTORY_SCI_PAPERS,
	OFFICIAL_BAC_HISTORY_GE_PAPERS,
	OFFICIAL_BAC_HISTORY_LP_PAPERS,
	OFFICIAL_BAC_HISTORY_LE_PAPERS,
	HISTORY_BAC_STREAM_PROFILES,
	HISTORY_BAC_TRACK_BINDINGS
};

export type {
	HistoryBacAcademicYear,
	HistoryBacDuration,
	HistoryBacStreamGroup,
	HistoryBacStreamId,
	HistoryBacSubjectId,
	HistoryBacTrackId,
	HistoryBacYearSubjectId,
	OfficialHistoryBacDbBinding,
	OfficialHistoryBacPaperSpec,
	OfficialHistoryBacTrackBinding
} from './types';

/** All 24 distinct Official BAC History & Geography papers (2023–2025) for PDF compilation. */
export const ALL_OFFICIAL_BAC_HISTORY_PAPERS: OfficialHistoryBacPaperSpec[] = [
	...OFFICIAL_BAC_HISTORY_SCI_PAPERS,
	...OFFICIAL_BAC_HISTORY_GE_PAPERS,
	...OFFICIAL_BAC_HISTORY_LP_PAPERS,
	...OFFICIAL_BAC_HISTORY_LE_PAPERS
];

const PAPERS_BY_STREAM_GROUP: Record<HistoryBacStreamGroup, readonly OfficialHistoryBacPaperSpec[]> = {
	sci: OFFICIAL_BAC_HISTORY_SCI_PAPERS,
	ge: OFFICIAL_BAC_HISTORY_GE_PAPERS,
	lp: OFFICIAL_BAC_HISTORY_LP_PAPERS,
	le: OFFICIAL_BAC_HISTORY_LE_PAPERS
};

/**
 * All 36 DB stream bindings:
 * - `his_sci` (6 papers) mapped onto `3as_se` (687), `3as_math` (707), `3as_tm` (729) = 18 bindings
 * - `his_ge` (6 papers) mapped onto `3as_ge` (752) = 6 bindings
 * - `his_lp` (6 papers) mapped onto `3as_lp` (771) = 6 bindings
 * - `his_le` (6 papers) mapped onto `3as_le` (790) = 6 bindings
 * Total = 36 bindings.
 */
export const OFFICIAL_BAC_HISTORY_DB_BINDINGS: OfficialHistoryBacDbBinding[] =
	HISTORY_BAC_TRACK_BINDINGS.flatMap((track) => {
		const trackSlugPart = track.grade.replace('_', '-');
		const papers = PAPERS_BY_STREAM_GROUP[track.streamGroup];
		return papers.map((paper) => {
			const topicLabel = paper.topicNumber === 1 ? 'الموضوع الأول' : 'الموضوع الثاني';
			return {
				...track,
				bindingSlug: `${paper.slug}-${trackSlugPart}`,
				paperSlug: paper.slug,
				academicYear: paper.academicYear,
				topicNumber: paper.topicNumber,
				sessionAr: paper.sessionAr,
				templateId: paper.templateId,
				titleAr: `بكالوريا رسمية في التاريخ والجغرافيا — شعبة ${track.streamNameAr} (${paper.sessionAr} - ${topicLabel})`,
				themesAr: paper.themesAr,
				examDoc: paper.examDoc
			};
		});
	});

/** Alias matching pipeline scripts (`audit-history-content.ts`, `seed-history-pipeline.ts`). */
export const ALL_OFFICIAL_BAC_HISTORY_DB_BINDINGS: OfficialHistoryBacDbBinding[] =
	OFFICIAL_BAC_HISTORY_DB_BINDINGS;

export function getOfficialHistoryBacPapersByStreamGroup(
	streamGroup: HistoryBacStreamGroup
): OfficialHistoryBacPaperSpec[] {
	return [...PAPERS_BY_STREAM_GROUP[streamGroup]];
}

export function getOfficialHistoryBacPaperBySlug(
	slug: string
): OfficialHistoryBacPaperSpec | undefined {
	return ALL_OFFICIAL_BAC_HISTORY_PAPERS.find((paper) => paper.slug === slug);
}

export function getOfficialHistoryBacBindingsByTrack(
	track: HistoryBacTrackId
): OfficialHistoryBacDbBinding[] {
	return OFFICIAL_BAC_HISTORY_DB_BINDINGS.filter((binding) => binding.grade === track);
}
