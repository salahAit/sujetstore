// ============================================
// SujetBuilder — TypeScript Interfaces
// JSON contract between SvelteKit and Typst
// ============================================

// --- Metadata (mirrors content.db schema) ---

/** Education level identifiers (education_levels.id) */
export type LevelId = 'primaire' | 'moyen' | 'secondaire';

/** Document/exam types (documents.type subset for generation) */
export type ExamType = 'exam' | 'test';

/** Trimester identifiers (trimesters.id) */
export type TrimesterId = 't1' | 't2' | 't3';

/** Template identifier */
export type TemplateId =
	| 'primary/taqweem'
	| 'middle/quiz'
	| 'middle/exam'
	| 'middle/solution'
	| 'secondary/quiz'
	| 'secondary/exam'
	| 'secondary/solution'
	| 'secondary/bac_official'
	| 'secondary/lycee_exam'
	| 'english/primary'
	| 'english/middle'
	| 'english/secondary'
	| 'english/bac_official'
	| 'french/primary'
	| 'french/middle'
	| 'french/secondary'
	| 'french/bac_official'
	| 'spanish/secondary'
	| 'spanish/bac_official'
	| 'german/secondary'
	| 'german/bac_official'
	| 'italian/secondary'
	| 'italian/bac_official';

/**
 * Exam metadata — injected into the Typst header.
 */
export interface ExamMetadata {
	levelId: LevelId;
	yearId: string;
	yearName: string;
	streamId?: string;
	streamName?: string;
	subjectId: string;
	subjectName: string;
	trimesterId: TrimesterId;
	trimesterName: string;
	docType: ExamType;
	academicYear: string;
	duration: string;
	schoolName?: string;
	siteUrl: string;
	font?: string;
	customDocTitle?: string;
	coefficient?: number;
	examSessionAr?: string;
	topicNumber?: 1 | 2;
}

// --- Content Blocks (all exercise patterns for 1AM مادة الرياضيات) ---

/** نص عادي مع إمكانية الإجابة والتنقيط */
export interface TextBlock {
	id?: string;
	type: 'text';
	content: string;
	/** Solution answer (shown in blue in solution mode) */
	answer?: string;
	/** Points for this question */
	mark?: string;
}

/** معادلة رياضية */
export interface MathBlock {
	id?: string;
	type: 'math';
	content: string;
	display?: boolean;
}

/** A cell inside the table with advanced merging and formatting options */
export interface TableCell {
	content: string;
	answer?: string;
	mark?: string;
	colspan?: number;
	rowspan?: number;
	bold?: boolean;
}

/** جدول مع خانات قابلة للتنقيط ومزايا دمج متقدمة */
export interface TableBlock {
	id?: string;
	type: 'table';
	headers: (string | TableCell)[];
	/** Cells can be simple strings or objects with content/answer/mark/colspan/bold */
	cells: (string | TableCell)[];
	/** Multi-row support: array of rows, each row is array of cell values */
	rows?: (string | TableCell)[][];
	
	// Table Customization Options
	align?: 'left' | 'center' | 'right';
	borders?: 'grid' | 'horizontal' | 'none';
	headerBackground?: boolean;
	width?: 'full' | 'auto';
}

/** صورة */
export interface ImageBlock {
	id?: string;
	type: 'image';
	src: string;
	caption?: string;
	width?: number | string;
}

/** لوحة علمية أو تعليمية مصوّرة مع دبابيس ترقيم ومفتاح بيانات متجهي */
export interface IllustratedFigureBlock {
	id?: string;
	type: 'illustrated_figure';
	src: string;
	title?: string;
	width?: number | string;
	maxHeight?: number;
	pins?: {
		num: number | string;
		xPct: number;
		yPct: number;
		color?: string;
	}[];
	legend?: {
		num: number | string;
		label: string;
		mark?: string | number;
	}[];
	legendMode?: 'labeled' | 'quiz';
	caption?: string;
}

/** صح أو خطأ مع التصحيح */
export interface TrueFalseBlock {
	id?: string;
	type: 'true_false';
	items: {
		/** السؤال */
		q: string;
		/** الجواب (صحيح/خاطئ) */
		a: string;
		/** التصحيح */
		c?: string;
		/** النقاط */
		mark: string;
	}[];
}

/** اختيار متعدد (QCM) */
export interface MultipleChoiceBlock {
	id?: string;
	type: 'multiple_choice';
	groups: {
		/** عنوان المجموعة */
		header: string;
		/** الخيارات */
		options: string[];
		/** الإجابة الصحيحة */
		correct: string;
		/** النقاط */
		mark?: string;
	}[];
}

/** مخطط تدفقي (سلسلة عمليات) */
export interface DiagramFlowBlock {
	id?: string;
	type: 'diagram_flow';
	/** 3 عناصر: [مخرج, عملية, مدخل] */
	flow: [string, string, string];
	mark?: string;
}

/** وضع تسميات / ملء فراغات */
export interface LabelingBlock {
	id?: string;
	type: 'labeling';
	labels: string[];
	mark?: string;
}

/** كتابة Typst حرة */
export interface TypstRawBlock {
	id?: string;
	type: 'typst_raw';
	content: string;
	/** Solution answer */
	answer?: string;
	/** Points */
	mark?: string;
	/** Optional structured metadata for SmartExamReader native mobile rendering */
	webMeta?: Record<string, any>;
}

/** شبكة صور مع تسميات */
export interface ImageGridBlock {
	id?: string;
	type: 'image_grid';
	columns: number;
	items: {
		src: string;
		label: string;
		answer?: string;
		mark?: string;
	}[];
}

/** كتلة أعمدة: تعرض كتل متعددة جنباً إلى جنب */
export interface ColumnsBlock {
	id?: string;
	type: 'columns';
	/** The blocks to display side by side */
	children: ContentBlock[];
	/** Optional column widths (e.g. ['1fr', '2fr']). Defaults to equal widths. */
	widths?: string[];
}

/** Union of all possible content block types */
export type ContentBlock =
	| TextBlock
	| MathBlock
	| TableBlock
	| ImageBlock
	| IllustratedFigureBlock
	| TrueFalseBlock
	| MultipleChoiceBlock
	| DiagramFlowBlock
	| LabelingBlock
	| ImageGridBlock
	| TypstRawBlock
	| ColumnsBlock;

// --- Exercise Structure ---

export interface ExerciseBlock {
	/** Unique identifier for drag and drop (svelte-dnd-action) */
	id?: string;
	/** Exercise ordinal — 'الأول', 'الثاني', etc. (auto-generated if omitted) */
	num?: string;
	/** Optional full custom heading overriding 'التمرين <num>' (e.g. 'الوضعية الإدماجية') */
	customTitle?: string;
	/** Total points for this exercise */
	points: number | string;
	/** Leading instruction before the blocks */
	instruction?: string;
	/** Ordered content blocks */
	content: ContentBlock[];
}

// --- Top-Level Document ---

export interface ExamDocument {
	metadata: ExamMetadata;
	exercises: ExerciseBlock[];
}

export interface GeneratePdfRequest {
	templateId: TemplateId;
	document: ExamDocument;
}

export interface GeneratePdfResponse {
	success: boolean;
	error?: string;
	pdfBase64?: string;
}
