import { OFFICIAL_BAC_ENGLISH_SCI_PAPERS } from './3as_sci';
import { OFFICIAL_BAC_ENGLISH_LP_PAPERS } from './3as_lp';
import { OFFICIAL_BAC_ENGLISH_LE_PAPERS } from './3as_le';
import type { EnglishBacTrackId, OfficialEnglishBacPaperSpec } from './types';

export { OFFICIAL_BAC_ENGLISH_SCI_PAPERS, OFFICIAL_BAC_ENGLISH_LP_PAPERS, OFFICIAL_BAC_ENGLISH_LE_PAPERS };
export type {
	EnglishBacStreamId,
	EnglishBacSubjectId,
	EnglishBacTrackId,
	EnglishBacYearSubjectId,
	OfficialEnglishBacPaperSpec
} from './types';

export const ALL_OFFICIAL_BAC_ENGLISH_PAPERS: OfficialEnglishBacPaperSpec[] = [
	...OFFICIAL_BAC_ENGLISH_SCI_PAPERS,
	...OFFICIAL_BAC_ENGLISH_LP_PAPERS,
	...OFFICIAL_BAC_ENGLISH_LE_PAPERS
];

export function getOfficialEnglishBacPapersByTrack(
	track: EnglishBacTrackId
): OfficialEnglishBacPaperSpec[] {
	return ALL_OFFICIAL_BAC_ENGLISH_PAPERS.filter((paper) => paper.grade === track);
}
