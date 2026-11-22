import type {
	ExamDocument,
	ExamMetadata,
	ExerciseBlock,
	TemplateId
} from '../../modules/SujetBuilder/types';

export type ItalianBacTrackId = '3as_le';
export type ItalianBacYearSubjectId = 795;
export type ItalianBacSubjectId = 'LAN-ITA';
export type ItalianBacStreamId = 'LE';
export type ItalianBacAcademicYear = '2023' | '2024' | '2025';

export interface OfficialItalianBacPaperSpec {
	slug: string;
	grade: ItalianBacTrackId;
	yearSubjectId: ItalianBacYearSubjectId;
	subjectId: ItalianBacSubjectId;
	streamId: ItalianBacStreamId;
	streamNameAr: 'لغات أجنبية';
	streamNameIt: 'Lingue Straniere';
	academicYear: ItalianBacAcademicYear;
	topicNumber: 1 | 2;
	sessionIt: string;
	sessionAr: string;
	coefficient: 4;
	duration: '03 h 00';
	pointsSplit: readonly [7, 7, 6];
	ambitoIt: string;
	titleIt: string;
	titleAr: string;
	themesIt: string[];
	themesAr: string[];
	templateId: Extract<TemplateId, 'italian/bac_official'>;
	examDoc: ExamDocument;
}

export interface BuildOfficialItalianBacPaperOptions {
	slug: string;
	academicYear: ItalianBacAcademicYear;
	topicNumber: 1 | 2;
	ambitoIt: string;
	titleTopicIt: string;
	titleTopicAr: string;
	themesIt: string[];
	themesAr: string[];
	exercises: [ExerciseBlock, ExerciseBlock, ExerciseBlock];
}

/**
 * Builds standard 3AS Lingue Straniere (BAC) ExamMetadata for Italian (`LAN-ITA`).
 */
export function buildOfficialItalianBacMetadata(
	academicYear: ItalianBacAcademicYear,
	topicNumber: 1 | 2
): ExamMetadata {
	const sessionIt = `Giugno ${academicYear}`;
	return {
		levelId: 'secondaire',
		yearId: '3as',
		yearName: '3º Anno di Scuola Secondaria (3AS / BAC)',
		streamId: 'LE',
		streamName: 'Lingue Straniere',
		subjectId: 'LAN-ITA',
		subjectName: 'Lingua Italiana',
		trimesterId: 't3',
		trimesterName: 'Sessione di allenamento BAC',
		docType: 'exam',
		academicYear,
		duration: '03 h 00',
		coefficient: 4,
		examSessionAr: sessionIt,
		topicNumber,
		font: 'Arial',
		customDocTitle: 'Simulazione d’Esame di Maturità (BAC) — Lingua Italiana',
		siteUrl: 'https://sujetstore.com'
	};
}

/**
 * Constructs a complete Official Italian BAC paper record (`7 + 7 + 6 = 20 punti`).
 */
export function buildOfficialItalianBacPaper(
	opts: BuildOfficialItalianBacPaperOptions
): OfficialItalianBacPaperSpec {
	const sessionIt = `Giugno ${opts.academicYear}`;
	const sessionAr = `دورة جوان ${opts.academicYear}`;
	const topicLabelAr = opts.topicNumber === 1 ? 'الموضوع الأول' : 'الموضوع الثاني';

	const examDoc: ExamDocument = {
		metadata: buildOfficialItalianBacMetadata(opts.academicYear, opts.topicNumber),
		exercises: opts.exercises
	};

	return {
		slug: opts.slug,
		grade: '3as_le',
		yearSubjectId: 795,
		subjectId: 'LAN-ITA',
		streamId: 'LE',
		streamNameAr: 'لغات أجنبية',
		streamNameIt: 'Lingue Straniere',
		academicYear: opts.academicYear,
		topicNumber: opts.topicNumber,
		sessionIt,
		sessionAr,
		coefficient: 4,
		duration: '03 h 00',
		pointsSplit: [7, 7, 6] as const,
		ambitoIt: opts.ambitoIt,
		titleIt: `Simulazione d’Esame di Maturità (BAC) in Italiano — Lingue Straniere (${sessionIt} — Traccia ${opts.topicNumber}: ${opts.titleTopicIt})`,
		titleAr: `موضوع بكالوريا تدريبي في اللغة الإيطالية — شعبة لغات أجنبية (${sessionAr} — ${topicLabelAr}: ${opts.titleTopicAr})`,
		themesIt: opts.themesIt,
		themesAr: opts.themesAr,
		templateId: 'italian/bac_official',
		examDoc
	};
}
