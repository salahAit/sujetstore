import { SubjectRegistry } from './registry';
import { mathPlugin } from './plugins/math';
import { physicsPlugin } from './plugins/physics';
import { sciencesPlugin } from './plugins/sciences';
import { arabicPlugin } from './plugins/arabic';
import { englishPlugin } from './plugins/english';
import { frenchPlugin } from './plugins/french';
import { islamicPlugin } from './plugins/islamic';

export const subjectRegistry = new SubjectRegistry();

subjectRegistry.register(mathPlugin);
subjectRegistry.register(physicsPlugin);
subjectRegistry.register(sciencesPlugin);
subjectRegistry.register(arabicPlugin);
subjectRegistry.register(englishPlugin);
subjectRegistry.register(frenchPlugin);
subjectRegistry.register(islamicPlugin);

export { SubjectRegistry } from './registry';
export {
	mathPlugin,
	physicsPlugin,
	sciencesPlugin,
	arabicPlugin,
	englishPlugin,
	frenchPlugin,
	islamicPlugin
};
export {
	CACHE_TTL_MS,
	CLEANUP_INTERVAL_MS,
	GeneratorEngine,
	MAX_CONCURRENT_TYPST,
	cleanupExpiredGeneratedPdfs,
	compileExamWithQueueAndCache,
	computeExamCacheKey,
	generatorEngine,
	getGeneratorMetrics,
	runQueuedTypstCompile,
	type GeneratorEngineOptions,
	type TypstCompileOptions,
	type TypstCompileResult,
	type TypstCompilerFn
} from './generator-engine';
export * from './types';
