import type {
	ExamDocument,
	ExamMetadata,
	ExerciseBlock,
	TemplateId
} from '../../modules/SujetBuilder/types';

export type SpanishBacTrackId = '3as_le';
export type SpanishBacYearSubjectId = 793;
export type SpanishBacSubjectId = 'LAN-SPA';
export type SpanishBacStreamId = 'LE';
export type SpanishBacAcademicYear = '2023' | '2024' | '2025';

export interface OfficialSpanishBacPaperSpec {
	slug: string;
	grade: SpanishBacTrackId;
	yearSubjectId: SpanishBacYearSubjectId;
	subjectId: SpanishBacSubjectId;
	streamId: SpanishBacStreamId;
	streamNameAr: 'لغات أجنبية';
	streamNameEs: 'Lenguas Extranjeras';
	academicYear: SpanishBacAcademicYear;
	topicNumber: 1 | 2;
	sessionEs: string;
	sessionAr: string;
	coefficient: 4;
	duration: '03 h 00';
	pointsSplit: readonly [7, 7, 6];
	ambitoEs: string;
	titleEs: string;
	titleAr: string;
	themesEs: string[];
	themesAr: string[];
	templateId: Extract<TemplateId, 'spanish/bac_official'>;
	examDoc: ExamDocument;
}

export interface BuildOfficialSpanishBacPaperOptions {
	slug: string;
	academicYear: SpanishBacAcademicYear;
	topicNumber: 1 | 2;
	ambitoEs: string;
	titleTopicEs: string;
	titleTopicAr: string;
	themesEs: string[];
	themesAr: string[];
	exercises: [ExerciseBlock, ExerciseBlock, ExerciseBlock];
}

export function buildOfficialSpanishBacMetadata(
	academicYear: SpanishBacAcademicYear,
	topicNumber: 1 | 2
): ExamMetadata {
	const sessionEs = `Junio ${academicYear}`;
	return {
		levelId: 'secondaire',
		yearId: '3as',
		yearName: '3º Año de Secundaria (3AS / BAC)',
		streamId: 'LE',
		streamName: 'Lenguas Extranjeras',
		subjectId: 'LAN-SPA',
		subjectName: 'Lengua Española',
		trimesterId: 't3',
		trimesterName: 'Sesión de entrenamiento BAC',
		docType: 'exam',
		academicYear,
		duration: '03 h 00',
		coefficient: 4,
		examSessionAr: sessionEs,
		topicNumber,
		font: 'Arial',
		customDocTitle: 'Examen blanco de Bachillerato — Lengua Española',
		siteUrl: 'https://sujetstore.com'
	};
}

export function buildOfficialSpanishBacPaper(
	opts: BuildOfficialSpanishBacPaperOptions
): OfficialSpanishBacPaperSpec {
	const sessionEs = `Junio ${opts.academicYear}`;
	const sessionAr = `دورة جوان ${opts.academicYear}`;
	const topicLabelAr = opts.topicNumber === 1 ? 'الموضوع الأول' : 'الموضوع الثاني';

	const examDoc: ExamDocument = {
		metadata: buildOfficialSpanishBacMetadata(opts.academicYear, opts.topicNumber),
		exercises: opts.exercises
	};

	return {
		slug: opts.slug,
		grade: '3as_le',
		yearSubjectId: 793,
		subjectId: 'LAN-SPA',
		streamId: 'LE',
		streamNameAr: 'لغات أجنبية',
		streamNameEs: 'Lenguas Extranjeras',
		academicYear: opts.academicYear,
		topicNumber: opts.topicNumber,
		sessionEs,
		sessionAr,
		coefficient: 4,
		duration: '03 h 00',
		pointsSplit: [7, 7, 6] as const,
		ambitoEs: opts.ambitoEs,
		titleEs: `Examen blanco de Bachillerato en Español — Lenguas Extranjeras (${sessionEs} — Tema ${opts.topicNumber}: ${opts.titleTopicEs})`,
		titleAr: `موضوع بكالوريا تدريبي في اللغة الإسبانية — شعبة لغات أجنبية (${sessionAr} — ${topicLabelAr}: ${opts.titleTopicAr})`,
		themesEs: opts.themesEs,
		themesAr: opts.themesAr,
		templateId: 'spanish/bac_official',
		examDoc
	};
}
