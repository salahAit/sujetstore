import { OFFICIAL_BAC_ARABIC_SCI_PAPERS } from './3as_sci';
import { OFFICIAL_BAC_ARABIC_LP_PAPERS } from './3as_lp';
import { OFFICIAL_BAC_ARABIC_LE_PAPERS } from './3as_le';
import type { ArabicBacTrackId, OfficialArabicBacPaperSpec } from './types';

export { OFFICIAL_BAC_ARABIC_SCI_PAPERS, OFFICIAL_BAC_ARABIC_LP_PAPERS, OFFICIAL_BAC_ARABIC_LE_PAPERS };
export type {
	ArabicBacStreamId,
	ArabicBacSubjectId,
	ArabicBacTrackId,
	ArabicBacYearSubjectId,
	OfficialArabicBacPaperSpec
} from './types';

export const ALL_OFFICIAL_BAC_ARABIC_PAPERS: OfficialArabicBacPaperSpec[] = [
	...OFFICIAL_BAC_ARABIC_SCI_PAPERS,
	...OFFICIAL_BAC_ARABIC_LP_PAPERS,
	...OFFICIAL_BAC_ARABIC_LE_PAPERS
];

export function getOfficialArabicBacPapersByTrack(
	track: ArabicBacTrackId
): OfficialArabicBacPaperSpec[] {
	return ALL_OFFICIAL_BAC_ARABIC_PAPERS.filter((paper) => paper.grade === track);
}
