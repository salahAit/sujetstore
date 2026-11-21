import { PlatformEventBus, platformEvents } from './event-bus';
import { PlatformModuleRegistry, invalidatePlatformModuleCache } from './registry';
import { curriculumCoreModule } from './modules/curriculum-core';
import { usersBillingModule } from './modules/users-billing';
import { quizEngineModule } from './modules/quiz-engine';
import { sujetBuilderModule } from './modules/sujet-builder';
import { printStudioModule } from './modules/print-studio';
import { lessonEditorModule } from './modules/lesson-editor';
import { smartGeneratorModule } from './modules/smart-generator';
import { gamificationModule } from './modules/gamification';
import { remediationModule } from './modules/remediation';
import { simulatorModule } from './modules/simulator';
import { videoStudioModule } from './modules/video-studio';
import type { PlatformModuleManifest } from './types';

export const ALL_PLATFORM_MODULES: readonly PlatformModuleManifest[] = [
	curriculumCoreModule,
	usersBillingModule,
	quizEngineModule,
	sujetBuilderModule,
	printStudioModule,
	lessonEditorModule,
	smartGeneratorModule,
	gamificationModule,
	remediationModule,
	simulatorModule,
	videoStudioModule
] as const;

export const platformRegistry = new PlatformModuleRegistry({
	useGlobalCache: true,
	eventBus: platformEvents
});

for (const manifest of ALL_PLATFORM_MODULES) {
	platformRegistry.register(manifest);
}

// Validate module dependency graph immediately on load
platformRegistry.validateDependencies();

// Wire default platform-level event listeners (all isolated inside EventBus error boundaries)
platformEvents.on(
	'module.toggled',
	({ moduleId, enabled }) => {
		invalidatePlatformModuleCache();
		if (process.env.NODE_ENV !== 'test') {
			console.info(`[Platform] Module '${moduleId}' ${enabled ? 'enabled' : 'disabled'}.`);
		}
	},
	'kernel.cache-sync'
);

platformEvents.on(
	'video.cue_answered',
	async (payload) => {
		const gamificationOn = await platformRegistry.isModuleEnabled('gamification');
		if (!gamificationOn) return;
		if (payload.isCorrect && payload.xpEarned > 0 && process.env.NODE_ENV !== 'test') {
			console.debug(
				`[Platform:gamification] Video #${payload.videoId} cue #${payload.cueId} awarded +${payload.xpEarned} XP.`
			);
		}
	},
	'gamification.video-cue-observer'
);

platformEvents.on(
	'video.cue_answered',
	async (payload) => {
		const remediationOn = await platformRegistry.isModuleEnabled('remediation');
		if (!remediationOn) return;
		if (!payload.isCorrect && process.env.NODE_ENV !== 'test') {
			console.debug(
				`[Platform:remediation] Recorded video cue mistake for question #${payload.questionId}.`
			);
		}
	},
	'remediation.video-cue-observer'
);

export {
	PlatformEventBus,
	PlatformModuleRegistry,
	platformEvents,
	invalidatePlatformModuleCache,
	curriculumCoreModule,
	usersBillingModule,
	quizEngineModule,
	sujetBuilderModule,
	printStudioModule,
	lessonEditorModule,
	smartGeneratorModule,
	gamificationModule,
	remediationModule,
	simulatorModule,
	videoStudioModule
};

export * from './types';
export type { PlatformEventHandler, EmitSummary } from './event-bus';
