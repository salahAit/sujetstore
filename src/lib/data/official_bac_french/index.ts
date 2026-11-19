import { OFFICIAL_BAC_FRENCH_SCI_PAPERS } from './3as_sci';
import { OFFICIAL_BAC_FRENCH_LP_PAPERS } from './3as_lp';
import { OFFICIAL_BAC_FRENCH_LE_PAPERS } from './3as_le';
import type { FrenchBacTrackId, OfficialFrenchBacPaperSpec } from './types';

export { OFFICIAL_BAC_FRENCH_SCI_PAPERS, OFFICIAL_BAC_FRENCH_LP_PAPERS, OFFICIAL_BAC_FRENCH_LE_PAPERS };
export type {
	FrenchBacStreamId,
	FrenchBacSubjectId,
	FrenchBacTrackId,
	FrenchBacYearSubjectId,
	OfficialFrenchBacPaperSpec
} from './types';

export const ALL_OFFICIAL_BAC_FRENCH_PAPERS: OfficialFrenchBacPaperSpec[] = [
	...OFFICIAL_BAC_FRENCH_SCI_PAPERS,
	...OFFICIAL_BAC_FRENCH_LP_PAPERS,
	...OFFICIAL_BAC_FRENCH_LE_PAPERS
];

export function getOfficialFrenchBacPapersByTrack(
	track: FrenchBacTrackId
): OfficialFrenchBacPaperSpec[] {
	return ALL_OFFICIAL_BAC_FRENCH_PAPERS.filter((paper) => paper.grade === track);
}

export function getOfficialFrenchBacPaperBySlug(
	slug: string
): OfficialFrenchBacPaperSpec | undefined {
	return ALL_OFFICIAL_BAC_FRENCH_PAPERS.find((paper) => paper.slug === slug);
}
