export type ModuleTier = 'core' | 'essential' | 'optional';

export type ModuleCategory =
	| 'core'
	| 'learning'
	| 'assessment'
	| 'authoring'
	| 'engagement'
	| 'tools'
	| 'commerce';

export interface PlatformNavItem {
	id: string;
	labelAr: string;
	labelFr?: string;
	href: string;
	icon: string;
	order?: number;
	exact?: boolean;
	allowedRoles?: Array<'superadmin' | 'admin' | 'editor' | 'student'>;
	badgeKey?: string;
}

export interface PlatformEventMap {
	'quiz.submitted': {
		userId: number | null;
		fingerprint?: string;
		quizId: number;
		attemptId?: number;
		score: number;
		totalPoints: number;
		percentage: number;
	};
	'video.cue_answered': {
		userId: number | null;
		fingerprint?: string;
		videoId: number;
		cueId: number;
		questionId: number;
		isCorrect: boolean;
		xpEarned: number;
	};
	'document.downloaded': {
		userId: number | null;
		documentId: number;
		kind?: string;
		ipHash?: string;
	};
	'subscription.activated': {
		userId: number;
		provider: string;
		planDays: number;
		expiresAt: string;
		orderId?: number | null;
	};
	'module.toggled': {
		moduleId: string;
		enabled: boolean;
		actorUserId?: number | null;
		timestamp: string;
	};
}

export type PlatformEventName = keyof PlatformEventMap;

export interface PlatformModuleEvents {
	publishes?: PlatformEventName[];
	subscribes?: PlatformEventName[];
}

export interface PlatformModuleManifest {
	id: string;
	version: string;
	tier: ModuleTier;
	category: ModuleCategory;
	nameAr: string;
	nameFr?: string;
	descriptionAr: string;
	icon: string;
	/** Public, student, admin, or API route prefixes owned/guarded by this module */
	routePrefixes: string[];
	/** Blocking dependencies: must be enabled for this module to run; prevents disabling targets while active */
	hardDependencies: string[];
	/** Event-based optional dependencies: never block disabling, degrade gracefully */
	softDependencies: string[];
	/** Admin sidebar items contributed by this module when enabled */
	adminNav?: PlatformNavItem[];
	/** Student portal navigation items contributed by this module when enabled */
	studentNav?: PlatformNavItem[];
	/** Pub/Sub domain events published or consumed by this module */
	events?: PlatformModuleEvents;
	/** Default JSON configuration merged with persisted config_json */
	defaultConfig?: Record<string, unknown>;
	/** Optional database tables owned by this module */
	ownedTables?: string[];
}

export interface StoredPlatformModule {
	moduleId: string;
	version: string;
	tier: ModuleTier;
	category: ModuleCategory;
	enabled: boolean;
	config: Record<string, unknown>;
	configJson: string;
	updatedAt: string;
}

export interface PlatformModuleView {
	manifest: PlatformModuleManifest;
	state: StoredPlatformModule;
	canDisable: boolean;
	disableBlockReason: string | null;
	blockingDependents: string[];
	disabledHardDependencies: string[];
}
