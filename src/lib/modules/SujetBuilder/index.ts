// ============================================
// SujetBuilder Module — Public API
// Standalone, portable exam PDF generator
// ============================================

// Types & Interfaces
export * from './types';

// Components
export { default as MetadataPanel } from './components/MetadataPanel.svelte';
export { default as ExerciseEditor } from './components/ExerciseEditor.svelte';
export { default as BlockEditor } from './components/BlockEditor.svelte';
export { default as PdfPreview } from './components/PdfPreview.svelte';

// Constants
export const SUJET_BUILDER_VERSION = '1.0.0';
export const TEMPLATE_IDS = [
	'primary/taqweem',
	'middle/quiz',
	'middle/exam',
	'middle/quiz_solution',
	'secondary/quiz',
	'secondary/exam'
] as const;
