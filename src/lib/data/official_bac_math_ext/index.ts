import {
	OFFICIAL_BAC_GE_MATH_PAPERS,
	buildOfficialBac3asGe,
	type GeMathAcademicYear,
	type OfficialBacGeMathPaperSpec
} from './3as_ge';
import {
	ALL_OFFICIAL_BAC_LIT_MATH_BINDINGS,
	OFFICIAL_BAC_LIT_MATH_PAPERS,
	buildOfficialBac3asLit,
	type LitMathAcademicYear,
	type LitMathStreamId,
	type LitMathTrackId,
	type LitMathYearSubjectId,
	type OfficialBacLitMathBinding,
	type OfficialBacLitMathPaperSpec
} from './3as_lit';

export {
	OFFICIAL_BAC_GE_MATH_PAPERS,
	OFFICIAL_BAC_LIT_MATH_PAPERS,
	ALL_OFFICIAL_BAC_LIT_MATH_BINDINGS,
	buildOfficialBac3asGe,
	buildOfficialBac3asLit
};

export type {
	GeMathAcademicYear,
	OfficialBacGeMathPaperSpec,
	LitMathAcademicYear,
	LitMathStreamId,
	LitMathTrackId,
	LitMathYearSubjectId,
	OfficialBacLitMathBinding,
	OfficialBacLitMathPaperSpec
};

export type MathExtAcademicYear = '2023' | '2024' | '2025';
export type MathExtTrackId = '3as_ge' | '3as_lp' | '3as_le';
export type MathExtYearSubjectId = 749 | 768 | 787;

export type OfficialBacMathExtPaperSpec =
	| OfficialBacGeMathPaperSpec
	| OfficialBacLitMathPaperSpec;

export type OfficialBacMathExtDbBinding =
	| OfficialBacGeMathPaperSpec
	| OfficialBacLitMathBinding;

/**
 * All 12 canonical Official BAC Mathematics papers (2023–2025) for PDF compilation:
 * - 6 papers for `3AS GE` (`شعبة تسيير واقتصاد`)
 * - 6 canonical papers for `3AS LP / LE` (`شعبتا آداب وفلسفة + لغات أجنبية`)
 */
export const ALL_OFFICIAL_BAC_MATH_EXT_PAPERS: OfficialBacMathExtPaperSpec[] = [
	...OFFICIAL_BAC_GE_MATH_PAPERS,
	...OFFICIAL_BAC_LIT_MATH_PAPERS
];

/**
 * All 18 DB stream bindings (2023–2025 × 2 topics × 3 tracks):
 * - 6 bindings for `3as_ge` (`yearSubjectId: 749`, `MAT-GE`)
 * - 6 bindings for `3as_lp` (`yearSubjectId: 768`, `MAT-LIT`) sharing the 6 literary PDFs
 * - 6 bindings for `3as_le` (`yearSubjectId: 787`, `MAT-LIT`) sharing the 6 literary PDFs
 */
export const ALL_OFFICIAL_BAC_MATH_EXT_DB_BINDINGS: OfficialBacMathExtDbBinding[] = [
	...OFFICIAL_BAC_GE_MATH_PAPERS,
	...ALL_OFFICIAL_BAC_LIT_MATH_BINDINGS
];

export function getOfficialBacMathExtPaperBySlug(
	slug: string
): OfficialBacMathExtPaperSpec | undefined {
	return ALL_OFFICIAL_BAC_MATH_EXT_PAPERS.find((paper) => paper.slug === slug);
}

export function getOfficialBacMathExtBindingsByTrack(
	track: MathExtTrackId
): OfficialBacMathExtDbBinding[] {
	return ALL_OFFICIAL_BAC_MATH_EXT_DB_BINDINGS.filter((binding) => binding.grade === track);
}

export function getOfficialBacMathExtPapersByYear(
	academicYear: MathExtAcademicYear
): OfficialBacMathExtPaperSpec[] {
	return ALL_OFFICIAL_BAC_MATH_EXT_PAPERS.filter(
		(paper) => paper.academicYear === academicYear
	);
}
