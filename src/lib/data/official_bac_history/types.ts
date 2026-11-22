import type {
	ExamDocument,
	ExamMetadata,
	ExerciseBlock,
	TemplateId
} from '../../modules/SujetBuilder/types';

export type HistoryBacStreamGroup = 'sci' | 'ge' | 'lp' | 'le';

export type HistoryBacTrackId = '3as_se' | '3as_math' | '3as_tm' | '3as_ge' | '3as_lp' | '3as_le';

export type HistoryBacStreamId = 'SE' | 'MATH' | 'TM' | 'GE' | 'LP' | 'LE';

export type HistoryBacSubjectId = 'HIS-SCI' | 'HIS-GE' | 'HIS-LP' | 'HIS-LE';

export type HistoryBacYearSubjectId = 687 | 707 | 729 | 752 | 771 | 790;

export type HistoryBacDuration = '03 ساعات' | '03 ساعات و30 دقيقة';

export type HistoryBacAcademicYear = '2023' | '2024' | '2025';

export interface OfficialHistoryBacPaperSpec {
	/** Canonical slug, e.g. `bac-2023-his-sci-t1` (24 distinct PDFs across 4 stream groups) */
	slug: string;
	streamGroup: HistoryBacStreamGroup;
	subjectId: HistoryBacSubjectId;
	academicYear: HistoryBacAcademicYear;
	topicNumber: 1 | 2;
	sessionAr: string;
	coefficient: 2 | 4;
	duration: HistoryBacDuration;
	templateId: Extract<TemplateId, 'secondary/bac_official'>;
	titleAr: string;
	themesAr: string[];
	examDoc: ExamDocument;
}

export interface OfficialHistoryBacTrackBinding {
	grade: HistoryBacTrackId;
	yearSubjectId: HistoryBacYearSubjectId;
	streamGroup: HistoryBacStreamGroup;
	streamId: HistoryBacStreamId;
	streamNameAr:
		| 'علوم تجريبية'
		| 'رياضيات'
		| 'تقني رياضي'
		| 'تسيير واقتصاد'
		| 'آداب وفلسفة'
		| 'لغات أجنبية';
	subjectId: HistoryBacSubjectId;
	coefficient: 2 | 4;
	duration: HistoryBacDuration;
}

export interface OfficialHistoryBacDbBinding extends OfficialHistoryBacTrackBinding {
	/** Unique DB document slug for this stream track, e.g. `bac-2023-his-sci-t1-3as-se` */
	bindingSlug: string;
	/** Canonical PDF paper slug, e.g. `bac-2023-his-sci-t1` */
	paperSlug: string;
	academicYear: HistoryBacAcademicYear;
	topicNumber: 1 | 2;
	sessionAr: string;
	templateId: Extract<TemplateId, 'secondary/bac_official'>;
	titleAr: string;
	themesAr: string[];
	examDoc: ExamDocument;
}

interface StreamGroupProfile {
	subjectId: HistoryBacSubjectId;
	streamId: string;
	streamName: string;
	titleStreamLabel: string;
	coefficient: 2 | 4;
	duration: HistoryBacDuration;
}

export const HISTORY_BAC_STREAM_PROFILES: Record<HistoryBacStreamGroup, StreamGroupProfile> = {
	sci: {
		subjectId: 'HIS-SCI',
		streamId: 'SCI',
		streamName: 'علوم تجريبية / رياضيات / تقني رياضي',
		titleStreamLabel: 'الشعب العلمية والتقنية (علوم تجريبية / رياضيات / تقني رياضي)',
		coefficient: 2,
		duration: '03 ساعات'
	},
	ge: {
		subjectId: 'HIS-GE',
		streamId: 'GE',
		streamName: 'تسيير واقتصاد',
		titleStreamLabel: 'شعبة تسيير واقتصاد',
		coefficient: 4,
		duration: '03 ساعات و30 دقيقة'
	},
	lp: {
		subjectId: 'HIS-LP',
		streamId: 'LP',
		streamName: 'آداب وفلسفة',
		titleStreamLabel: 'شعبة آداب وفلسفة',
		coefficient: 4,
		duration: '03 ساعات و30 دقيقة'
	},
	le: {
		subjectId: 'HIS-LE',
		streamId: 'LE',
		streamName: 'لغات أجنبية',
		titleStreamLabel: 'شعبة لغات أجنبية',
		coefficient: 2,
		duration: '03 ساعات'
	}
};

export const HISTORY_BAC_TRACK_BINDINGS: readonly OfficialHistoryBacTrackBinding[] = [
	{
		grade: '3as_se',
		yearSubjectId: 687,
		streamGroup: 'sci',
		streamId: 'SE',
		streamNameAr: 'علوم تجريبية',
		subjectId: 'HIS-SCI',
		coefficient: 2,
		duration: '03 ساعات'
	},
	{
		grade: '3as_math',
		yearSubjectId: 707,
		streamGroup: 'sci',
		streamId: 'MATH',
		streamNameAr: 'رياضيات',
		subjectId: 'HIS-SCI',
		coefficient: 2,
		duration: '03 ساعات'
	},
	{
		grade: '3as_tm',
		yearSubjectId: 729,
		streamGroup: 'sci',
		streamId: 'TM',
		streamNameAr: 'تقني رياضي',
		subjectId: 'HIS-SCI',
		coefficient: 2,
		duration: '03 ساعات'
	},
	{
		grade: '3as_ge',
		yearSubjectId: 752,
		streamGroup: 'ge',
		streamId: 'GE',
		streamNameAr: 'تسيير واقتصاد',
		subjectId: 'HIS-GE',
		coefficient: 4,
		duration: '03 ساعات و30 دقيقة'
	},
	{
		grade: '3as_lp',
		yearSubjectId: 771,
		streamGroup: 'lp',
		streamId: 'LP',
		streamNameAr: 'آداب وفلسفة',
		subjectId: 'HIS-LP',
		coefficient: 4,
		duration: '03 ساعات و30 دقيقة'
	},
	{
		grade: '3as_le',
		yearSubjectId: 790,
		streamGroup: 'le',
		streamId: 'LE',
		streamNameAr: 'لغات أجنبية',
		subjectId: 'HIS-LE',
		coefficient: 2,
		duration: '03 ساعات'
	}
];

export function buildOfficialHistoryBacPaper(opts: {
	slug: string;
	streamGroup: HistoryBacStreamGroup;
	academicYear: HistoryBacAcademicYear;
	topicNumber: 1 | 2;
	themesAr: string[];
	exercises: [ExerciseBlock, ExerciseBlock, ExerciseBlock, ExerciseBlock];
}): OfficialHistoryBacPaperSpec {
	const profile = HISTORY_BAC_STREAM_PROFILES[opts.streamGroup];
	const sessionAr = `دورة جوان ${opts.academicYear}`;
	const topicLabel = opts.topicNumber === 1 ? 'الموضوع الأول' : 'الموضوع الثاني';

	const metadata: ExamMetadata = {
		levelId: 'secondaire',
		yearId: '3as',
		yearName: 'السنة الثالثة ثانوي',
		streamId: profile.streamId,
		streamName: profile.streamName,
		subjectId: profile.subjectId,
		subjectName: 'التاريخ والجغرافيا',
		trimesterId: 't3',
		trimesterName: sessionAr,
		docType: 'exam',
		academicYear: opts.academicYear,
		duration: profile.duration,
		schoolName: 'منصة SujetStore التعليمية',
		siteUrl: 'https://sujetstore.com',
		font: 'Arabic Transparent',
		customDocTitle: 'امتحان بكالوريا التعليم الثانوي',
		coefficient: profile.coefficient,
		examSessionAr: sessionAr,
		topicNumber: opts.topicNumber
	};

	const examDoc: ExamDocument = {
		metadata,
		exercises: opts.exercises
	};

	return {
		slug: opts.slug,
		streamGroup: opts.streamGroup,
		subjectId: profile.subjectId,
		academicYear: opts.academicYear,
		topicNumber: opts.topicNumber,
		sessionAr,
		coefficient: profile.coefficient,
		duration: profile.duration,
		templateId: 'secondary/bac_official',
		titleAr: `بكالوريا رسمية في التاريخ والجغرافيا — ${profile.titleStreamLabel} (${sessionAr} - ${topicLabel})`,
		themesAr: opts.themesAr,
		examDoc
	};
}
