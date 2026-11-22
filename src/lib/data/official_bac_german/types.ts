import type {
	ExamDocument,
	ExamMetadata,
	ExerciseBlock,
	TemplateId
} from '../../modules/SujetBuilder/types';

export type GermanBacTrackId = '3as_le';
export type GermanBacYearSubjectId = 794;
export type GermanBacSubjectId = 'LAN-GER';
export type GermanBacStreamId = 'LE';
export type GermanBacAcademicYear = '2023' | '2024' | '2025';

export interface OfficialGermanBacPaperSpec {
	slug: string;
	grade: GermanBacTrackId;
	yearSubjectId: GermanBacYearSubjectId;
	subjectId: GermanBacSubjectId;
	streamId: GermanBacStreamId;
	streamNameAr: 'لغات أجنبية';
	streamNameDe: 'Fremdsprachen';
	academicYear: GermanBacAcademicYear;
	topicNumber: 1 | 2;
	sessionDe: string;
	sessionAr: string;
	coefficient: 4;
	duration: '03 Std. 00';
	pointsSplit: readonly [7, 7, 6];
	themenbereichDe: string;
	titleDe: string;
	titleAr: string;
	themesDe: string[];
	themesAr: string[];
	templateId: Extract<TemplateId, 'german/bac_official'>;
	examDoc: ExamDocument;
}

export interface BuildOfficialGermanBacPaperOptions {
	slug: string;
	academicYear: GermanBacAcademicYear;
	topicNumber: 1 | 2;
	themenbereichDe: string;
	titleTopicDe: string;
	titleTopicAr: string;
	themesDe: string[];
	themesAr: string[];
	exercises: [ExerciseBlock, ExerciseBlock, ExerciseBlock];
}

/**
 * Builds standard 3AS Fremdsprachen (BAC) ExamMetadata for German (`LAN-GER`).
 */
export function buildOfficialGermanBacMetadata(
	academicYear: GermanBacAcademicYear,
	topicNumber: 1 | 2
): ExamMetadata {
	const sessionDe = `Juni ${academicYear}`;
	return {
		levelId: 'secondaire',
		yearId: '3as',
		yearName: '3. Jahr des Gymnasiums (3AS / BAC)',
		streamId: 'LE',
		streamName: 'Fremdsprachen',
		subjectId: 'LAN-GER',
		subjectName: 'Deutsch',
		trimesterId: 't3',
		trimesterName: 'BAC-Trainingssitzung',
		docType: 'exam',
		academicYear,
		duration: '03 Std. 00',
		coefficient: 4,
		examSessionAr: sessionDe,
		topicNumber,
		font: 'Arial',
		customDocTitle: 'Abitur-Probeprüfung (BAC) — Fach Deutsch',
		siteUrl: 'https://sujetstore.com'
	};
}

/**
 * Constructs a complete Official German BAC paper record (`7 + 7 + 6 = 20 Punkte`).
 */
export function buildOfficialGermanBacPaper(
	opts: BuildOfficialGermanBacPaperOptions
): OfficialGermanBacPaperSpec {
	const sessionDe = `Juni ${opts.academicYear}`;
	const sessionAr = `دورة جوان ${opts.academicYear}`;
	const topicLabelAr = opts.topicNumber === 1 ? 'الموضوع الأول' : 'الموضوع الثاني';

	const examDoc: ExamDocument = {
		metadata: buildOfficialGermanBacMetadata(opts.academicYear, opts.topicNumber),
		exercises: opts.exercises
	};

	return {
		slug: opts.slug,
		grade: '3as_le',
		yearSubjectId: 794,
		subjectId: 'LAN-GER',
		streamId: 'LE',
		streamNameAr: 'لغات أجنبية',
		streamNameDe: 'Fremdsprachen',
		academicYear: opts.academicYear,
		topicNumber: opts.topicNumber,
		sessionDe,
		sessionAr,
		coefficient: 4,
		duration: '03 Std. 00',
		pointsSplit: [7, 7, 6] as const,
		themenbereichDe: opts.themenbereichDe,
		titleDe: `Abitur-Probeprüfung (BAC) im Fach Deutsch — Fremdsprachen (${sessionDe} — Thema ${opts.topicNumber}: ${opts.titleTopicDe})`,
		titleAr: `موضوع بكالوريا تدريبي في اللغة الألمانية — شعبة لغات أجنبية (${sessionAr} — ${topicLabelAr}: ${opts.titleTopicAr})`,
		themesDe: opts.themesDe,
		themesAr: opts.themesAr,
		templateId: 'german/bac_official',
		examDoc
	};
}
