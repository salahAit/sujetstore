<script lang="ts">
	import { onMount } from 'svelte';
	import {
		CloudDownload,
		CheckCircle2,
		RefreshCw,
		Trash2,
		Loader2,
		AlertCircle
	} from 'lucide-svelte';

	interface Props {
		packId: string;
		label?: string;
		urls: string[];
		compact?: boolean;
		class?: string;
	}

	interface SavedPackRecord {
		packId: string;
		cachedCount: number;
		totalCount: number;
		urls: string[];
		savedAt: string;
		via: 'sw' | 'cache-api';
	}

	const FALLBACK_CACHE_NAME = 'sujetstore-offline-packs';
	const SW_PACK_CACHE_NAME = 'sujetstore-offline-packs-v1';
	const STORAGE_KEY_PREFIX = 'sujetstore:offline-pack:';
	const SW_ACK_TIMEOUT_MS = 5000;
	const SW_STALL_TIMEOUT_MS = 25000;
	const FALLBACK_CONCURRENCY = 3;

	let {
		packId,
		label = 'حفظ للدراسة دون إنترنت',
		urls = [],
		compact = false,
		class: className = ''
	}: Props = $props();

	let status = $state<'idle' | 'caching' | 'saved' | 'error'>('idle');
	let progressDone = $state(0);
	let progressTotal = $state(0);
	let cachedCount = $state(0);
	let savedAt = $state<string | null>(null);
	let errorMessage = $state<string | null>(null);
	let isSupported = $state(true);
	let isRemoving = $state(false);

	let activeRunId = 0;
	let swResponded = false;
	let fallbackActive = false;
	let ackTimer: ReturnType<typeof setTimeout> | null = null;
	let stallTimer: ReturnType<typeof setTimeout> | null = null;

	let cleanUrls = $derived.by(() => {
		const out: string[] = [];
		const seen = new Set<string>();
		for (const raw of urls || []) {
			if (typeof raw !== 'string') continue;
			const trimmed = raw.trim();
			if (!trimmed || seen.has(trimmed)) continue;
			seen.add(trimmed);
			out.push(trimmed);
		}
		return out;
	});

	let progressPct = $derived(
		progressTotal > 0 ? Math.min(100, Math.round((progressDone / progressTotal) * 100)) : 0
	);

	function storageKey(id: string): string {
		return `${STORAGE_KEY_PREFIX}${id}`;
	}

	function clearTimers() {
		if (ackTimer) {
			clearTimeout(ackTimer);
			ackTimer = null;
		}
		if (stallTimer) {
			clearTimeout(stallTimer);
			stallTimer = null;
		}
	}

	function readSavedRecord(id: string): SavedPackRecord | null {
		if (typeof window === 'undefined' || !id) return null;
		try {
			const raw = window.localStorage.getItem(storageKey(id));
			if (!raw) return null;
			const parsed = JSON.parse(raw) as SavedPackRecord;
			if (parsed && parsed.packId === id && typeof parsed.cachedCount === 'number') {
				return parsed;
			}
		} catch {
			// Ignore storage errors in private browsing
		}
		return null;
	}

	function persistSavedRecord(record: SavedPackRecord) {
		if (typeof window === 'undefined') return;
		try {
			window.localStorage.setItem(storageKey(record.packId), JSON.stringify(record));
		} catch {
			// Ignore quota / private browsing errors
		}
	}

	function deleteSavedRecord(id: string) {
		if (typeof window === 'undefined' || !id) return;
		try {
			window.localStorage.removeItem(storageKey(id));
		} catch {
			// Ignore storage errors
		}
	}

	function syncFromStorage(id: string) {
		clearTimers();
		activeRunId += 1;
		swResponded = false;
		fallbackActive = false;
		errorMessage = null;

		const record = readSavedRecord(id);
		if (record && record.cachedCount > 0) {
			status = 'saved';
			cachedCount = record.cachedCount;
			progressDone = record.cachedCount;
			progressTotal = record.totalCount || record.cachedCount;
			savedAt = record.savedAt || null;
		} else {
			status = 'idle';
			cachedCount = 0;
			progressDone = 0;
			progressTotal = 0;
			savedAt = null;
		}
	}

	async function cacheDirectlyViaCacheApi(targetUrls: string[], runId: number, targetPackId: string) {
		fallbackActive = true;
		clearTimers();

		if (typeof window === 'undefined' || !('caches' in window)) {
			if (runId !== activeRunId) return;
			status = 'error';
			errorMessage = 'المتصفح لا يدعم التخزين دون إنترنت';
			return;
		}

		try {
			const [fallbackCache, swPackCache] = await Promise.all([
				window.caches.open(FALLBACK_CACHE_NAME),
				window.caches.open(SW_PACK_CACHE_NAME)
			]);
			let done = 0;
			let saved = 0;
			const total = targetUrls.length;
			let cursor = 0;

			progressDone = 0;
			progressTotal = total;

			async function worker() {
				while (cursor < total) {
					if (runId !== activeRunId) return;
					const idx = cursor++;
					const url = targetUrls[idx];
					try {
						const res = await fetch(url, { credentials: 'same-origin' });
						if (res.ok) {
							await Promise.all([
								fallbackCache.put(url, res.clone()),
								swPackCache.put(url, res.clone())
							]);
							saved += 1;
						}
					} catch {
						// Continue caching remaining URLs even if one fails
					} finally {
						done += 1;
						if (runId === activeRunId) {
							progressDone = done;
						}
					}
				}
			}

			const workers = Array.from(
				{ length: Math.min(FALLBACK_CONCURRENCY, Math.max(1, total)) },
				() => worker()
			);
			await Promise.all(workers);

			if (runId !== activeRunId) return;

			if (saved > 0) {
				const now = new Date().toISOString();
				persistSavedRecord({
					packId: targetPackId,
					cachedCount: saved,
					totalCount: total,
					urls: targetUrls,
					savedAt: now,
					via: 'cache-api'
				});
				cachedCount = saved;
				savedAt = now;
				status = 'saved';
			} else {
				status = 'error';
				errorMessage = 'تعذر حفظ الصفحات، تحقق من اتصالك بالإنترنت';
			}
		} catch {
			if (runId !== activeRunId) return;
			status = 'error';
			errorMessage = 'حدث خطأ أثناء الحفظ للعمل دون إنترنت';
		} finally {
			if (runId === activeRunId) {
				fallbackActive = false;
			}
		}
	}

	function startCaching() {
		if (status === 'caching' || isRemoving) return;

		const targetUrls = cleanUrls;
		const targetPackId = packId;
		if (!targetPackId || targetUrls.length === 0) return;

		clearTimers();
		activeRunId += 1;
		const runId = activeRunId;
		swResponded = false;
		fallbackActive = false;
		errorMessage = null;
		status = 'caching';
		progressDone = 0;
		progressTotal = targetUrls.length;

		const hasSw = typeof navigator !== 'undefined' && 'serviceWorker' in navigator;
		const controller = hasSw ? navigator.serviceWorker.controller : null;

		if (controller) {
			try {
				controller.postMessage({
					type: 'CACHE_GRADE_PACK',
					packId: targetPackId,
					urls: targetUrls
				});

				// If the active Service Worker doesn't acknowledge quickly (e.g. old SW or not yet wired),
				// seamlessly fall back to direct Cache Storage API so offline caching always works.
				ackTimer = setTimeout(() => {
					if (runId === activeRunId && !swResponded && !fallbackActive) {
						cacheDirectlyViaCacheApi(targetUrls, runId, targetPackId);
					}
				}, SW_ACK_TIMEOUT_MS);
				return;
			} catch {
				// Fall through to direct Cache API
			}
		}

		cacheDirectlyViaCacheApi(targetUrls, runId, targetPackId);
	}

	async function removePack() {
		if (isRemoving || status === 'caching') return;
		isRemoving = true;
		clearTimers();
		activeRunId += 1;

		const targetPackId = packId;
		const stored = readSavedRecord(targetPackId);
		const urlsToDelete = [...new Set([...(stored?.urls ?? []), ...cleanUrls])];

		try {
			if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator && navigator.serviceWorker.controller) {
				try {
					navigator.serviceWorker.controller.postMessage({
						type: 'CLEAR_GRADE_PACK',
						packId: targetPackId,
						urls: urlsToDelete
					});
				} catch {
					// Non-fatal
				}
			}

			if (typeof window !== 'undefined' && 'caches' in window && urlsToDelete.length > 0) {
				try {
					const [fallbackCache, swPackCache] = await Promise.all([
						window.caches.open(FALLBACK_CACHE_NAME),
						window.caches.open(SW_PACK_CACHE_NAME)
					]);
					await Promise.all(
						urlsToDelete.flatMap((u) => [
							fallbackCache.delete(u).catch(() => false),
							swPackCache.delete(u).catch(() => false)
						])
					);
				} catch {
					// Non-fatal
				}
			}

			deleteSavedRecord(targetPackId);
			status = 'idle';
			cachedCount = 0;
			progressDone = 0;
			progressTotal = 0;
			savedAt = null;
			errorMessage = null;
		} finally {
			isRemoving = false;
		}
	}

	function handleSwMessage(event: MessageEvent) {
		const msg = event.data;
		if (!msg || typeof msg !== 'object' || msg.packId !== packId) return;
		if (fallbackActive) return;

		if (msg.type === 'CACHE_GRADE_PACK_PROGRESS') {
			swResponded = true;
			if (ackTimer) {
				clearTimeout(ackTimer);
				ackTimer = null;
			}
			if (stallTimer) clearTimeout(stallTimer);
			const runId = activeRunId;
			const targetPackId = packId;
			const targetUrls = cleanUrls;
			stallTimer = setTimeout(() => {
				if (runId === activeRunId && status === 'caching' && !fallbackActive) {
					cacheDirectlyViaCacheApi(targetUrls, runId, targetPackId);
				}
			}, SW_STALL_TIMEOUT_MS);

			status = 'caching';
			progressDone = Math.max(0, Number(msg.done ?? 0));
			progressTotal = Math.max(progressDone, Number(msg.total ?? cleanUrls.length));
			return;
		}

		if (msg.type === 'CACHE_GRADE_PACK_COMPLETE') {
			swResponded = true;
			clearTimers();
			const count = Math.max(0, Number(msg.cachedCount ?? cleanUrls.length));
			const total = Math.max(count, progressTotal || cleanUrls.length);

			if (count > 0) {
				const now = new Date().toISOString();
				persistSavedRecord({
					packId,
					cachedCount: count,
					totalCount: total,
					urls: cleanUrls,
					savedAt: now,
					via: 'sw'
				});
				cachedCount = count;
				progressDone = count;
				progressTotal = total;
				savedAt = now;
				status = 'saved';
				errorMessage = null;
			} else {
				status = 'error';
				errorMessage = 'تعذر حفظ الصفحات، تحقق من اتصالك بالإنترنت';
			}
			return;
		}

		if (msg.type === 'CACHE_GRADE_PACK_ERROR') {
			swResponded = true;
			clearTimers();
			status = 'error';
			errorMessage = typeof msg.error === 'string' && msg.error ? msg.error : 'تعذر حفظ الحزمة دون إنترنت';
		}
	}

	$effect(() => {
		const currentId = packId;
		syncFromStorage(currentId);
	});

	onMount(() => {
		isSupported =
			typeof window !== 'undefined' &&
			(('serviceWorker' in navigator && Boolean(navigator.serviceWorker)) || 'caches' in window);

		if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
			navigator.serviceWorker.addEventListener('message', handleSwMessage);
		}

		return () => {
			clearTimers();
			if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
				navigator.serviceWorker.removeEventListener('message', handleSwMessage);
			}
		};
	});
</script>

{#if isSupported}
	<div class="inline-flex flex-wrap items-center gap-1.5 {className}" dir="rtl">
		{#if status === 'caching'}
			<div
				role="status"
				aria-live="polite"
				class="inline-flex flex-col gap-1 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-2 text-xs font-extrabold text-indigo-700 backdrop-blur-md dark:border-indigo-400/30 dark:bg-indigo-500/15 dark:text-indigo-300"
			>
				<div class="flex items-center gap-2">
					<Loader2 size={14} class="shrink-0 animate-spin" />
					<span>جاري الحفظ... {progressDone}/{progressTotal || cleanUrls.length}</span>
				</div>
				<div class="h-1.5 w-full min-w-36 overflow-hidden rounded-full bg-indigo-500/20">
					<div
						class="h-full rounded-full bg-gradient-to-l from-indigo-500 to-sky-500 transition-all duration-300"
						style="width: {progressPct}%"
					></div>
				</div>
			</div>
		{:else if status === 'saved'}
			<div
				class="inline-flex items-center overflow-hidden rounded-xl border border-emerald-500/35 bg-emerald-500/10 text-xs font-extrabold text-emerald-700 shadow-sm backdrop-blur-md dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-300"
				title={savedAt ? `تم الحفظ (${cachedCount} صفحة)` : 'محفوظ للدراسة دون إنترنت'}
			>
				<span class="inline-flex items-center gap-1.5 px-3 py-2">
					<CheckCircle2 size={14} class="shrink-0" />
					<span>محفوظ أوفلاين ✓</span>
					{#if !compact && cachedCount > 0}
						<span
							class="rounded-md bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-extrabold text-emerald-800 dark:text-emerald-200"
						>
							{cachedCount}
						</span>
					{/if}
				</span>

				<button
					type="button"
					onclick={startCaching}
					disabled={cleanUrls.length === 0 || isRemoving}
					title="تحديث الحزمة المحفوظة"
					aria-label="تحديث الحزمة المحفوظة"
					class="border-r border-emerald-500/25 px-2.5 py-2 transition hover:bg-emerald-500/20 disabled:opacity-40"
				>
					<RefreshCw size={13} />
				</button>

				<button
					type="button"
					onclick={removePack}
					disabled={isRemoving}
					title="حذف الحزمة من الجهاز"
					aria-label="حذف الحزمة من الجهاز"
					class="border-r border-emerald-500/25 px-2.5 py-2 text-rose-600 transition hover:bg-rose-500/15 dark:text-rose-400"
				>
					<Trash2 size={13} />
				</button>
			</div>
		{:else if status === 'error'}
			<div
				role="alert"
				class="inline-flex flex-wrap items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-bold text-rose-700 dark:text-rose-300"
			>
				<span class="inline-flex items-center gap-1.5">
					<AlertCircle size={14} class="shrink-0" />
					<span>{errorMessage || 'تعذر الحفظ دون إنترنت'}</span>
				</span>
				<button
					type="button"
					onclick={startCaching}
					class="rounded-lg bg-rose-600 px-2.5 py-1 text-[11px] font-extrabold text-white transition hover:bg-rose-700"
				>
					إعادة المحاولة
				</button>
			</div>
		{:else}
			<button
				type="button"
				onclick={startCaching}
				disabled={cleanUrls.length === 0}
				class="inline-flex items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-2 text-xs font-extrabold text-indigo-700 shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-indigo-600 hover:text-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 dark:border-indigo-400/30 dark:bg-indigo-500/15 dark:text-indigo-300 dark:hover:bg-indigo-500 dark:hover:text-white"
			>
				<CloudDownload size={15} class="shrink-0" />
				<span>{label}</span>
				{#if !compact && cleanUrls.length > 0}
					<span
						class="rounded-md bg-indigo-500/15 px-1.5 py-0.5 text-[10px] font-extrabold opacity-90"
					>
						{cleanUrls.length}
					</span>
				{/if}
			</button>
		{/if}
	</div>
{/if}
