import type {
	ExamDocument,
	ExamType,
	TemplateId,
	TrimesterId
} from '../modules/SujetBuilder/types';

export type SubjectIdKey =
	| 'math'
	| 'physics'
	| 'sciences'
	| 'arabic'
	| 'english'
	| 'french'
	| 'islamic'
	| 'history'
	| 'spanish'
	| (string & {});

export type ExamVariant =
	| 'trimester_exam'
	| 'supervised_test'
	| 'cinq_mock'
	| 'competency_eval'
	| 'bem_mock'
	| 'bac_mock';

export type ExamDifficulty = 'easy' | 'medium' | 'hard';

export interface UnifiedExamPaper {
	id: string;
	grade: string;
	trimesterId: TrimesterId;
	docType: ExamType;
	variant: string;
	templateId: TemplateId;
	totalPoints: number;
	seed: number;
	examDoc: ExamDocument;
	exerciseInstances?: unknown[];
}

export interface SubjectAssembleRequest {
	trackId: string;
	trimesterId: TrimesterId;
	seed: number;
	docType?: 'exam' | 'test';
	variant?: ExamVariant;
	difficulty?: ExamDifficulty;
	academicYear?: string;
	schoolName?: string;
	topicNumber?: 1 | 2;
}

export interface SubjectPluginStats {
	tracks: number;
	lessons: number;
	templates: number;
}

export interface SubjectPlugin {
	id: SubjectIdKey;
	nameAr: string;
	direction: 'rtl' | 'ltr';
	supportedVariants: readonly string[];
	resolveTrack(yearId: string, subjectId: string, streamId?: string | null): string | null;
	assemble(req: SubjectAssembleRequest): Promise<UnifiedExamPaper> | UnifiedExamPaper;
	getStats(): SubjectPluginStats;
}

export interface ResolvedSubjectTrack {
	plugin: SubjectPlugin;
	trackId: string;
}

export interface AssembledSubjectResult extends ResolvedSubjectTrack {
	paper: UnifiedExamPaper;
}

export interface KernelSubjectSummary {
	id: SubjectIdKey;
	nameAr: string;
	direction: 'rtl' | 'ltr';
	supportedVariants: readonly string[];
	stats: SubjectPluginStats;
}

export interface KernelSummary {
	pluginCount: number;
	tracks: number;
	lessons: number;
	templates: number;
	subjects: KernelSubjectSummary[];
}

export interface GeneratorCacheKeyInput {
	pluginId: string;
	trackId: string;
	trimesterId: TrimesterId;
	docType: 'exam' | 'test';
	variant?: string;
	difficulty?: string;
	seed: number;
	academicYear?: string;
	schoolName?: string;
	topicNumber?: 1 | 2;
}

export interface CompiledExamResult {
	success: boolean;
	cacheKey: string;
	fileId: string;
	subjectPath: string;
	solutionPath: string;
	pdfUrl: string;
	solutionUrl: string;
	solutionCompiled: boolean;
	cached: boolean;
	error?: string;
}

export interface GeneratorMetrics {
	maxConcurrent: number;
	activeJobs: number;
	queuedJobs: number;
	inFlightRequests: number;
	cacheHits: number;
	cacheMisses: number;
	totalCompiled: number;
	totalCleanedFiles: number;
	lastCleanupAt: number | null;
}
