import { pgAll, pgRun } from '#lib/server/db';
import { platformEvents, type PlatformEventBus } from './event-bus';
import type {
	ModuleCategory,
	ModuleTier,
	PlatformModuleManifest,
	PlatformModuleView,
	PlatformNavItem,
	StoredPlatformModule
} from './types';

const CACHE_TTL_MS = 15_000;
const PG_NOW_EXPR = "to_char(NOW() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS')";

const NEVER_BLOCKED_ROUTES = ['/admin/modules', '/admin/login', '/admin/logout'];

interface DbPlatformModuleRow {
	module_id: string;
	version: string;
	tier: string;
	category: string;
	enabled: boolean;
	config_json: string;
	updated_at: string;
}

interface SnapshotCache {
	snapshot: Map<string, StoredPlatformModule>;
	loadedAt: number;
}

let globalSnapshotCache: SnapshotCache | null = null;

export function invalidatePlatformModuleCache(): void {
	globalSnapshotCache = null;
}

function normalizePath(pathname: string): string {
	if (!pathname) return '/';
	const clean = pathname.split('?')[0].split('#')[0];
	if (clean.length > 1 && clean.endsWith('/')) {
		return clean.slice(0, -1);
	}
	return clean;
}

function matchesPrefix(pathname: string, prefix: string): boolean {
	const p = normalizePath(pathname);
	const pref = normalizePath(prefix);
	if (pref === '/') return true;
	return p === pref || p.startsWith(`${pref}/`);
}

function safeParseConfig(raw: string | null | undefined, fallback: Record<string, unknown> = {}): Record<string, unknown> {
	if (!raw) return { ...fallback };
	try {
		const parsed = JSON.parse(raw);
		if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
			return { ...fallback, ...parsed };
		}
	} catch {
		// fall back to defaults
	}
	return { ...fallback };
}

function normalizeTier(tier: string | undefined, fallback: ModuleTier = 'optional'): ModuleTier {
	if (tier === 'core' || tier === 'essential' || tier === 'optional') return tier;
	return fallback;
}

function normalizeCategory(category: string | undefined, fallback: ModuleCategory = 'learning'): ModuleCategory {
	const valid: ModuleCategory[] = [
		'core',
		'learning',
		'assessment',
		'authoring',
		'engagement',
		'tools',
		'commerce'
	];
	if (category && valid.includes(category as ModuleCategory)) {
		return category as ModuleCategory;
	}
	return fallback;
}

export class PlatformModuleRegistry {
	private manifests = new Map<string, PlatformModuleManifest>();
	private localCache: SnapshotCache | null = null;
	private useGlobalCache: boolean;
	private eventBus: PlatformEventBus;

	constructor(options?: { useGlobalCache?: boolean; eventBus?: PlatformEventBus }) {
		this.useGlobalCache = options?.useGlobalCache ?? true;
		this.eventBus = options?.eventBus ?? platformEvents;
	}

	private getCache(): SnapshotCache | null {
		return this.useGlobalCache ? globalSnapshotCache : this.localCache;
	}

	private setCache(cache: SnapshotCache | null): void {
		if (this.useGlobalCache) {
			globalSnapshotCache = cache;
		} else {
			this.localCache = cache;
		}
	}

	register(manifest: PlatformModuleManifest): this {
		if (this.manifests.has(manifest.id)) {
			throw new Error(`Platform module '${manifest.id}' is already registered.`);
		}
		this.manifests.set(manifest.id, manifest);
		return this;
	}

	get(id: string): PlatformModuleManifest | undefined {
		return this.manifests.get(id);
	}

	list(): PlatformModuleManifest[] {
		return Array.from(this.manifests.values());
	}

	/**
	 * Validates all module dependencies:
	 * 1. Ensures every declared hardDependency exists in the registry and no self-dependencies exist.
	 * 2. Runs a DFS 3-color cycle detector across hardDependencies.
	 */
	validateDependencies(): void {
		const ids = new Set(this.manifests.keys());

		for (const [id, manifest] of this.manifests.entries()) {
			for (const dep of manifest.hardDependencies) {
				if (dep === id) {
					throw new Error(`Module '${id}' cannot declare itself as a hard dependency.`);
				}
				if (!ids.has(dep)) {
					throw new Error(`Module '${id}' depends on missing hard dependency '${dep}'.`);
				}
			}
			for (const softDep of manifest.softDependencies) {
				if (softDep === id) {
					throw new Error(`Module '${id}' cannot declare itself as a soft dependency.`);
				}
			}
		}

		const state = new Map<string, 'visiting' | 'visited'>();
		const stack: string[] = [];

		const dfs = (node: string) => {
			state.set(node, 'visiting');
			stack.push(node);

			const manifest = this.manifests.get(node);
			if (manifest) {
				for (const dep of manifest.hardDependencies) {
					const depState = state.get(dep);
					if (depState === 'visiting') {
						const cyclePath = [...stack.slice(stack.indexOf(dep)), dep].join(' -> ');
						throw new Error(`Cyclic hard dependency detected: ${cyclePath}`);
					}
					if (!depState) {
						dfs(dep);
					}
				}
			}

			stack.pop();
			state.set(node, 'visited');
		};

		for (const id of this.manifests.keys()) {
			if (!state.has(id)) {
				dfs(id);
			}
		}
	}

	/**
	 * Idempotently upserts all registered manifests into PostgreSQL `platform_modules`.
	 * Existing `enabled` flags and `config_json` customizations are preserved.
	 */
	async syncWithDatabase(): Promise<void> {
		this.validateDependencies();

		for (const manifest of this.manifests.values()) {
			const defaultConfigJson = JSON.stringify(manifest.defaultConfig ?? {});
			await pgRun(
				`INSERT INTO platform_modules (module_id, version, tier, category, enabled, config_json, updated_at)
				 VALUES ($1, $2, $3, $4, TRUE, $5, ${PG_NOW_EXPR})
				 ON CONFLICT (module_id) DO UPDATE
				 SET version = EXCLUDED.version,
				     tier = EXCLUDED.tier,
				     category = EXCLUDED.category,
				     enabled = CASE WHEN EXCLUDED.tier = 'core' THEN TRUE ELSE platform_modules.enabled END,
				     updated_at = ${PG_NOW_EXPR}`,
				[manifest.id, manifest.version, manifest.tier, manifest.category, defaultConfigJson]
			);
		}

		this.setCache(null);
	}

	/**
	 * Returns a map of all registered modules merged with PostgreSQL state.
	 * Uses a 15-second in-memory TTL cache unless `forceRefresh` is true.
	 */
	async getSnapshot(forceRefresh = false): Promise<Map<string, StoredPlatformModule>> {
		const now = Date.now();
		const cached = this.getCache();
		if (!forceRefresh && cached && now - cached.loadedAt < CACHE_TTL_MS) {
			return cached.snapshot;
		}

		const dbMap = new Map<string, DbPlatformModuleRow>();
		try {
			const rows = await pgAll<DbPlatformModuleRow>(
				'SELECT module_id, version, tier, category, enabled, config_json, updated_at FROM platform_modules'
			);
			for (const row of rows) {
				dbMap.set(row.module_id, row);
			}
		} catch (err) {
			// Fail open to manifest defaults if DB is momentarily unavailable during boot
			console.error('[PlatformModuleRegistry] Failed to read platform_modules:', err);
		}

		const snapshot = new Map<string, StoredPlatformModule>();
		const fallbackNow = new Date().toISOString().slice(0, 19).replace('T', ' ');

		for (const manifest of this.manifests.values()) {
			const row = dbMap.get(manifest.id);
			const defaultCfg = manifest.defaultConfig ?? {};
			const mergedConfig = safeParseConfig(row?.config_json, defaultCfg);
			const enabled = manifest.tier === 'core' ? true : row ? Boolean(row.enabled) : true;

			snapshot.set(manifest.id, {
				moduleId: manifest.id,
				version: row?.version ?? manifest.version,
				tier: normalizeTier(row?.tier, manifest.tier),
				category: normalizeCategory(row?.category, manifest.category),
				enabled,
				config: mergedConfig,
				configJson: JSON.stringify(mergedConfig, null, 2),
				updatedAt: row?.updated_at ?? fallbackNow
			});
		}

		this.setCache({ snapshot, loadedAt: now });
		return snapshot;
	}

	async isModuleEnabled(id: string): Promise<boolean> {
		const manifest = this.manifests.get(id);
		if (!manifest) return false;
		if (manifest.tier === 'core') return true;
		const snapshot = await this.getSnapshot();
		return snapshot.get(id)?.enabled ?? true;
	}

	/**
	 * Checks whether a URL pathname is allowed under the current enabled modules.
	 * Returns `false` if any disabled module owns a matching routePrefix.
	 */
	async isRouteEnabled(pathname: string): Promise<boolean> {
		const clean = normalizePath(pathname);
		for (const safePrefix of NEVER_BLOCKED_ROUTES) {
			if (matchesPrefix(clean, safePrefix)) {
				return true;
			}
		}

		const snapshot = await this.getSnapshot();
		for (const manifest of this.manifests.values()) {
			if (manifest.tier === 'core') continue;
			const state = snapshot.get(manifest.id);
			if (state && !state.enabled) {
				for (const prefix of manifest.routePrefixes) {
					if (matchesPrefix(clean, prefix)) {
						return false;
					}
				}
			}
		}
		return true;
	}

	/**
	 * Enables or disables a platform module in PostgreSQL.
	 * Enforces:
	 * - Core modules can NEVER be disabled.
	 * - A module CANNOT be disabled while any enabled module declares it in `hardDependencies`.
	 * - A module CANNOT be enabled while any of its own `hardDependencies` is disabled.
	 */
	async setModuleEnabled(
		id: string,
		enabled: boolean,
		actorUserId: number | null = null
	): Promise<StoredPlatformModule> {
		const manifest = this.manifests.get(id);
		if (!manifest) {
			throw new Error(`الوحدة غير موجودة: '${id}'`);
		}

		const snapshot = await this.getSnapshot(true);

		if (!enabled) {
			if (manifest.tier === 'core') {
				throw new Error(`لا يمكن تعطيل الوحدة الأساسية '${manifest.nameAr}' (${id}).`);
			}

			const blockingDependents: PlatformModuleManifest[] = [];
			for (const other of this.manifests.values()) {
				if (other.id === id) continue;
				const otherState = snapshot.get(other.id);
				if (otherState?.enabled && other.hardDependencies.includes(id)) {
					blockingDependents.push(other);
				}
			}

			if (blockingDependents.length > 0) {
				const names = blockingDependents.map((m) => `${m.nameAr} (${m.id})`).join('، ');
				throw new Error(
					`لا يمكن تعطيل '${manifest.nameAr}' لأن الوحدات المفعّلة التالية تعتمد عليها إلزامياً: ${names}`
				);
			}
		} else {
			const disabledHardDeps: PlatformModuleManifest[] = [];
			for (const depId of manifest.hardDependencies) {
				const depState = snapshot.get(depId);
				const depManifest = this.manifests.get(depId);
				if (depManifest && depState && !depState.enabled) {
					disabledHardDeps.push(depManifest);
				}
			}

			if (disabledHardDeps.length > 0) {
				const names = disabledHardDeps.map((m) => `${m.nameAr} (${m.id})`).join('، ');
				throw new Error(
					`يجب تفعيل الوحدات المطلوبة أولاً قبل تفعيل '${manifest.nameAr}': ${names}`
				);
			}
		}

		const defaultConfigJson = JSON.stringify(manifest.defaultConfig ?? {});
		await pgRun(
			`INSERT INTO platform_modules (module_id, version, tier, category, enabled, config_json, updated_at)
			 VALUES ($1, $2, $3, $4, $5, $6, ${PG_NOW_EXPR})
			 ON CONFLICT (module_id) DO UPDATE
			 SET enabled = EXCLUDED.enabled,
			     version = EXCLUDED.version,
			     tier = EXCLUDED.tier,
			     category = EXCLUDED.category,
			     updated_at = ${PG_NOW_EXPR}`,
			[manifest.id, manifest.version, manifest.tier, manifest.category, enabled, defaultConfigJson]
		);

		this.setCache(null);
		const fresh = await this.getSnapshot(true);
		const updated = fresh.get(id)!;

		await this.eventBus.emit('module.toggled', {
			moduleId: id,
			enabled,
			actorUserId,
			timestamp: new Date().toISOString()
		});

		return updated;
	}

	async updateModuleConfig(
		id: string,
		config: Record<string, unknown>
	): Promise<StoredPlatformModule> {
		const manifest = this.manifests.get(id);
		if (!manifest) {
			throw new Error(`الوحدة غير موجودة: '${id}'`);
		}
		if (!config || typeof config !== 'object' || Array.isArray(config)) {
			throw new Error('يجب أن تكون إعدادات الوحدة بصيغة كائن JSON صالح.');
		}

		const serialized = JSON.stringify(config);
		await pgRun(
			`INSERT INTO platform_modules (module_id, version, tier, category, enabled, config_json, updated_at)
			 VALUES ($1, $2, $3, $4, TRUE, $5, ${PG_NOW_EXPR})
			 ON CONFLICT (module_id) DO UPDATE
			 SET config_json = EXCLUDED.config_json,
			     updated_at = ${PG_NOW_EXPR}`,
			[manifest.id, manifest.version, manifest.tier, manifest.category, serialized]
		);

		this.setCache(null);
		const fresh = await this.getSnapshot(true);
		return fresh.get(id)!;
	}

	async getModuleConfig<T extends Record<string, unknown> = Record<string, unknown>>(
		id: string
	): Promise<T> {
		const snapshot = await this.getSnapshot();
		return (snapshot.get(id)?.config ?? {}) as T;
	}

	async getEnabledAdminNav(role?: string | null): Promise<PlatformNavItem[]> {
		const snapshot = await this.getSnapshot();
		const items: PlatformNavItem[] = [];

		for (const manifest of this.manifests.values()) {
			const state = snapshot.get(manifest.id);
			if (!state?.enabled || !manifest.adminNav) continue;
			for (const nav of manifest.adminNav) {
				if (nav.allowedRoles && nav.allowedRoles.length > 0) {
					if (!role || !nav.allowedRoles.includes(role as any)) {
						continue;
					}
				}
				items.push(nav);
			}
		}

		return items.sort((a, b) => (a.order ?? 100) - (b.order ?? 100));
	}

	async getEnabledStudentNav(): Promise<PlatformNavItem[]> {
		const snapshot = await this.getSnapshot();
		const items: PlatformNavItem[] = [];

		for (const manifest of this.manifests.values()) {
			const state = snapshot.get(manifest.id);
			if (!state?.enabled || !manifest.studentNav) continue;
			items.push(...manifest.studentNav);
		}

		return items.sort((a, b) => (a.order ?? 100) - (b.order ?? 100));
	}

	/** Rich state view for the Admin Module Hub UI (`/admin/modules`). */
	async getModulesView(forceRefresh = false): Promise<PlatformModuleView[]> {
		const snapshot = await this.getSnapshot(forceRefresh);
		const views: PlatformModuleView[] = [];

		for (const manifest of this.manifests.values()) {
			const state = snapshot.get(manifest.id)!;
			const blockingDependents: string[] = [];

			for (const other of this.manifests.values()) {
				if (other.id === manifest.id) continue;
				const otherState = snapshot.get(other.id);
				if (otherState?.enabled && other.hardDependencies.includes(manifest.id)) {
					blockingDependents.push(other.id);
				}
			}

			const disabledHardDependencies = manifest.hardDependencies.filter((depId) => {
				const depState = snapshot.get(depId);
				return depState ? !depState.enabled : false;
			});

			let canDisable = true;
			let disableBlockReason: string | null = null;

			if (manifest.tier === 'core') {
				canDisable = false;
				disableBlockReason = 'وحدة نظام أساسية لا يمكن تعطيلها';
			} else if (blockingDependents.length > 0) {
				canDisable = false;
				disableBlockReason = `مطلوبة حالياً من طرف: ${blockingDependents.join('، ')}`;
			}

			views.push({
				manifest,
				state,
				canDisable,
				disableBlockReason,
				blockingDependents,
				disabledHardDependencies
			});
		}

		return views;
	}
}
