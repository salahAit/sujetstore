// ============================================================================
// Shared Client/Server Types for SmartExamReader (Reflowable Native Mobile View)
// ============================================================================

export interface WebTableCell {
	content: string;
	answer?: string;
	mark?: string;
	colspan?: number;
	rowspan?: number;
	bold?: boolean;
}

export interface WebPin {
	num: string;
	xPct: number;
	yPct: number;
	color: string;
}

export interface WebLegendItem {
	num: string;
	label: string;
	mark?: string;
}

export type WebBlock =
	| {
			type: 'text';
			content: string;
			answer?: string;
			mark?: string;
	  }
	| {
			type: 'math';
			latex: string;
			display: boolean;
	  }
	| {
			type: 'table';
			headers: WebTableCell[];
			rows: WebTableCell[][];
			align?: 'left' | 'center' | 'right';
	  }
	| {
			type: 'true_false';
			items: Array<{ q: string; a: string; c?: string; mark?: string }>;
	  }
	| {
			type: 'multiple_choice';
			groups: Array<{ header: string; options: string[]; correct: string; mark?: string }>;
	  }
	| {
			type: 'diagram_flow';
			flow: [string, string, string];
			mark?: string;
	  }
	| {
			type: 'labeling';
			labels: string[];
			mark?: string;
	  }
	| {
			type: 'figure';
			src: string;
			title?: string;
			caption?: string;
			pins: WebPin[];
			legend: WebLegendItem[];
			legendMode: 'labeled' | 'quiz';
	  }
	| {
			type: 'image_grid';
			columns: number;
			items: Array<{ src: string; label: string; answer?: string; mark?: string }>;
	  }
	| {
			type: 'quran_box';
			label: string;
			verses: string;
			surah: string;
			ayahRange?: string;
			vocabulary: Array<{ word: string; meaning: string }>;
			answer?: string;
			mark?: string;
	  }
	| {
			type: 'hadith_box';
			label: string;
			narrator: string;
			text: string;
			source: string;
			vocabulary: Array<{ word: string; meaning: string }>;
			answer?: string;
			mark?: string;
	  }
	| {
			type: 'arabic_poem';
			title?: string;
			numbered: boolean;
			verses: Array<[string, string]>;
			author?: string;
			source?: string;
			vocabulary: Array<{ word: string; meaning: string }>;
	  }
	| {
			type: 'passage_box';
			lang: 'ar' | 'fr' | 'en' | 'es' | 'de';
			title?: string;
			paragraphs: string[];
			numberedParagraphs?: boolean;
			author?: string;
			source?: string;
			vocabulary?: Array<{ word: string; meaning: string }>;
	  }
	| {
			type: 'columns';
			widths?: string[];
			children: WebBlock[];
	  };

export interface WebExercise {
	index: number;
	heading: string;
	points: string;
	instruction?: string;
	blocks: WebBlock[];
	hasSolution: boolean;
}

export interface WebExamMetadata {
	dir: 'rtl' | 'ltr';
	lang: 'ar' | 'fr' | 'en' | 'es' | 'de';
	levelId: string;
	yearId: string;
	yearName: string;
	streamName?: string;
	subjectId: string;
	subjectName: string;
	trimesterName: string;
	docType: 'exam' | 'test';
	docTitle: string;
	academicYear: string;
	duration: string;
	coefficient?: number;
	examSessionAr?: string;
	topicNumber?: number;
	totalPoints: number;
}

export interface WebExamPayload {
	version: 1;
	metadata: WebExamMetadata;
	exercises: WebExercise[];
	hasAnySolution: boolean;
}
