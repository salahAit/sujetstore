import type { ExamDocument, TemplateId } from '../../modules/SujetBuilder/types';
import type { ManagementSubjectId, ManagementTrackId, ManagementYearSubjectId } from '../../modules/ManagementTemplates/types';
import { OFFICIAL_BAC_ACC_FIN_PAPERS } from './acc_fin';
import { OFFICIAL_BAC_ECO_MAN_PAPERS } from './eco_man';
import { OFFICIAL_BAC_LAW_PAPERS } from './law';

export type ManagementBacAcademicYear = '2023' | '2024' | '2025';

export type ManagementBacSubjectId = ManagementSubjectId;

export type ManagementBacTrackId = Extract<ManagementTrackId, '3as_acc' | '3as_eco' | '3as_law'>;

export type ManagementBacYearSubjectId = Extract<ManagementYearSubjectId, 755 | 756 | 757>;

export type ManagementBacDuration = '04 ساعات و30 دقيقة' | '03 ساعات' | '02 ساعات';

export interface OfficialManagementBacPaperSpec {
	slug: string;
	grade: ManagementBacTrackId;
	yearSubjectId: ManagementBacYearSubjectId;
	subjectId: ManagementBacSubjectId;
	subjectNameAr: string;
	streamId: 'GE';
	streamNameAr: 'تسيير واقتصاد';
	academicYear: ManagementBacAcademicYear;
	topicNumber: 1 | 2;
	sessionAr: string;
	coefficient: 6 | 5 | 2;
	duration: ManagementBacDuration;
	pointsSplit: readonly [6, 6, 8];
	templateId: Extract<TemplateId, 'secondary/bac_official'>;
	titleAr: string;
	themesAr: string[];
	examDoc: ExamDocument;
}

export {
	OFFICIAL_BAC_ACC_FIN_PAPERS,
	OFFICIAL_BAC_ECO_MAN_PAPERS,
	OFFICIAL_BAC_LAW_PAPERS
};

/** All 18 Official BAC Management (`تسيير واقتصاد`) papers (2023–2025, ACC-FIN, ECO-MAN, LAW). */
export const ALL_OFFICIAL_BAC_MANAGEMENT_PAPERS: OfficialManagementBacPaperSpec[] = [
	...OFFICIAL_BAC_ACC_FIN_PAPERS,
	...OFFICIAL_BAC_ECO_MAN_PAPERS,
	...OFFICIAL_BAC_LAW_PAPERS
];

export function getOfficialManagementBacPaperBySlug(
	slug: string
): OfficialManagementBacPaperSpec | undefined {
	return ALL_OFFICIAL_BAC_MANAGEMENT_PAPERS.find((paper) => paper.slug === slug);
}

export function getOfficialManagementBacPapersBySubject(
	subjectId: ManagementBacSubjectId
): OfficialManagementBacPaperSpec[] {
	return ALL_OFFICIAL_BAC_MANAGEMENT_PAPERS.filter((paper) => paper.subjectId === subjectId);
}

export function getOfficialManagementBacPapersByYear(
	academicYear: ManagementBacAcademicYear
): OfficialManagementBacPaperSpec[] {
	return ALL_OFFICIAL_BAC_MANAGEMENT_PAPERS.filter((paper) => paper.academicYear === academicYear);
}
