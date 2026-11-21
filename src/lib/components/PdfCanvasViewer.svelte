<script lang="ts">
	import { ZoomIn, ZoomOut, RotateCcw, Loader2, AlertCircle, RefreshCw } from 'lucide-svelte';

	interface Props {
		url: string;
		title?: string;
		class?: string;
	}

	let { url, title = 'قارئ الوثيقة', class: className = '' }: Props = $props();

	let manifestLoading = $state(true);
	let errorMsg = $state<string | null>(null);
	// Start immediately with Page 1 at t=0ms — ZERO 2-RTT waterfall!
	let pages = $state<number[]>([1]);
	let loadedPages = $state<Record<number, boolean>>({});
	let zoom = $state(100);
	let reloadNonce = $state(0);

	function appendQuery(base: string, param: string): string {
		const clean = base.split('#')[0];
		return clean.includes('?') ? `${clean}&${param}` : `${clean}?${param}`;
	}

	let pageUrls = $derived(
		url
			? pages.map((p) => ({
					num: p,
					src: appendQuery(url, reloadNonce > 0 ? `page=${p}&r=${reloadNonce}` : `page=${p}`)
				}))
			: []
	);

	let activeReq = 0;

	async function loadPagesManifest(targetUrl: string) {
		const reqId = ++activeReq;
		manifestLoading = true;
		errorMsg = null;
		pages = [1];
		loadedPages = {};

		try {
			const res = await fetch(appendQuery(targetUrl, 'render=pages'), {
				credentials: 'include'
			});
			if (!res.ok) {
				throw new Error(
					res.status === 403
						? 'انتهت صلاحية رابط العرض أو غير مصرح به — أعد فتح الموضوع'
						: res.status === 429
							? 'تم تجاوز حد المشاهدات المؤقت، يرجى الانتظار قليلاً'
							: `تعذر عرض الملف (HTTP ${res.status})`
				);
			}
			const payload = (await res.json()) as { pageCount?: number; pages?: number[] };
			if (reqId !== activeReq) return;
			const list = Array.isArray(payload.pages)
				? payload.pages
				: Array.from({ length: payload.pageCount || 0 }, (_, i) => i + 1);
			if (list.length === 0) {
				throw new Error('لم يتم العثور على صفحات للعرض');
			}
			pages = list;
			manifestLoading = false;
		} catch (err: any) {
			if (reqId !== activeReq) return;
			manifestLoading = false;
			errorMsg = err?.message || 'حدث خطأ أثناء عرض الموضوع';
		}
	}

	$effect(() => {
		const u = url;
		const _n = reloadNonce;
		if (typeof window === 'undefined' || !u) return;
		zoom = 100;
		loadPagesManifest(u);
	});

	function setZoom(next: number) {
		zoom = Math.max(70, Math.min(200, next));
	}

	function markLoaded(pageNum: number) {
		loadedPages = { ...loadedPages, [pageNum]: true };
	}
</script>

<div
	class="relative flex h-full w-full flex-col overflow-hidden bg-zinc-200 dark:bg-zinc-900 {className}"
	aria-label={title}
>
	<!-- Ultra-Light Compact Toolbar -->
	<div
		class="z-10 flex shrink-0 items-center justify-between gap-2 border-b border-black/10 bg-zinc-100/95 px-3 py-1.5 text-xs text-zinc-700 backdrop-blur dark:border-white/10 dark:bg-zinc-950/95 dark:text-zinc-200"
	>
		<div class="flex items-center gap-1.5 font-bold">
			{#if !manifestLoading && pages.length > 0}
				<span class="rounded-md bg-black/5 px-2 py-0.5 dark:bg-white/10">
					{pages.length === 1 ? 'صفحة واحدة' : pages.length === 2 ? 'صفحتان' : `${pages.length} صفحات`}
				</span>
			{:else if manifestLoading}
				<span class="text-muted-foreground inline-flex items-center gap-1.5">
					<Loader2 size={12} class="animate-spin" /> جاري فتح الموضوع...
				</span>
			{/if}
		</div>

		<div class="flex items-center gap-1" dir="ltr">
			<button
				type="button"
				onclick={() => setZoom(zoom - 20)}
				disabled={zoom <= 70}
				class="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-white/80 transition hover:bg-white disabled:opacity-40 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/15"
				title="تصغير"
				aria-label="تصغير"
			>
				<ZoomOut size={15} />
			</button>
			<span class="min-w-[42px] text-center font-mono text-[11px] font-bold">{zoom}%</span>
			<button
				type="button"
				onclick={() => setZoom(zoom + 20)}
				disabled={zoom >= 200}
				class="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-white/80 transition hover:bg-white disabled:opacity-40 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/15"
				title="تكبير"
				aria-label="تكبير"
			>
				<ZoomIn size={15} />
			</button>
			{#if zoom !== 100}
				<button
					type="button"
					onclick={() => setZoom(100)}
					class="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-white/80 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/15"
					title="ملاءمة العرض"
					aria-label="ملاءمة العرض"
				>
					<RotateCcw size={14} />
				</button>
			{/if}
		</div>
	</div>

	<!-- Instant Parallel Native Image Scroller (Zero PDF.js, Zero 2-RTT Waterfall, Crisp Poppler Fonts) -->
	<div class="relative flex-1 overflow-auto p-2.5 pb-20 sm:p-4">
		{#if errorMsg}
			<div class="flex h-full min-h-[260px] flex-col items-center justify-center gap-3 px-4 text-center">
				<AlertCircle size={34} class="text-red-500" />
				<p class="max-w-md text-sm font-bold text-zinc-800 dark:text-zinc-100">{errorMsg}</p>
				<button
					type="button"
					onclick={() => (reloadNonce += 1)}
					class="bg-primary text-primary-foreground inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold shadow"
				>
					<RefreshCw size={14} /> إعادة المحاولة
				</button>
			</div>
		{:else}
			<div
				class="mx-auto space-y-3 transition-all duration-150"
				style="width: {zoom}%; max-width: {zoom > 100 ? 'none' : '860px'};"
			>
				{#each pageUrls as p (p.src)}
					{@const isReady = Boolean(loadedPages[p.num])}
					<div
						class="relative overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black/10 {!isReady
							? 'aspect-[210/297]'
							: ''}"
					>
						{#if !isReady}
							<div
								class="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-zinc-50 text-zinc-500"
							>
								<Loader2 size={24} class="text-primary animate-spin" />
								<span class="text-xs font-bold">جاري تحميل الصفحة {p.num}...</span>
							</div>
						{/if}
						<img
							src={p.src}
							alt="{title} — صفحة {p.num}"
							loading={p.num <= 3 ? 'eager' : 'lazy'}
							fetchpriority={p.num === 1 ? 'high' : 'auto'}
							decoding="async"
							onload={() => markLoaded(p.num)}
							class="block h-auto w-full select-none transition-opacity duration-150 {isReady
								? 'opacity-100'
								: 'opacity-0'}"
						/>
						<span
							class="pointer-events-none absolute bottom-2 left-2 rounded-md bg-black/55 px-2 py-0.5 text-[10px] font-bold text-white"
						>
							{p.num} / {pages.length}
						</span>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
