<script lang="ts">
	import { onMount } from 'svelte';
	import { Loader2, AlertCircle, ZoomIn, ZoomOut, Maximize, WifiOff, Check, RefreshCw } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import type { ExamDocument } from '$lib/modules/SujetBuilder/types';

	let {
		document: examDocument,
		isSolution = false,
		loading = $bindable(false),
		error = $bindable(''),
		onPdfReady
	}: {
		document?: ExamDocument;
		isSolution?: boolean;
		loading?: boolean;
		error?: string;
		onPdfReady?: (pdfData: Uint8Array) => void;
	} = $props();

	let svgPages = $state<string[]>([]);
	let scale = $state(1.5);
	let visiblePage = $state(1);
	let scrollContainer: HTMLDivElement | null = $state(null);
	let engineStatus = $state<'idle' | 'loading-wasm' | 'loading-templates' | 'ready' | 'compiling' | 'error'>('idle');
	let engineProgress = $state('');
	let isOfflineReady = $state(false);
	let compileCount = $state(0);

	// Engine module (dynamically imported, client-side only)
	let engineModule: typeof import('$lib/modules/SujetBuilder/typstWasmEngine') | null = null;

	let numPages = $derived(svgPages.length);

	// Track which page is visible during scroll
	$effect(() => {
		if (!scrollContainer || svgPages.length === 0) return;
		const pages = scrollContainer.querySelectorAll('[data-page]');
		if (pages.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						const pageNum = parseInt((entry.target as HTMLElement).dataset.page || '1');
						visiblePage = pageNum;
					}
				}
			},
			{ root: scrollContainer, threshold: 0.5 }
		);

		pages.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});

	// Initialize engine on mount
	onMount(async () => {
		try {
			engineStatus = 'loading-wasm';
			engineProgress = 'جاري تحميل محرك Typst...';

			engineModule = await import('$lib/modules/SujetBuilder/typstWasmEngine');
			await engineModule.initTypstEngine();

			engineStatus = 'loading-templates';
			engineProgress = 'جاري تحميل القوالب...';

			await engineModule.loadTemplateFiles();

			engineStatus = 'ready';
			isOfflineReady = true;
			engineProgress = '';
		} catch (err: any) {
			console.error('Engine init failed:', err);
			engineStatus = 'error';
			error = `فشل تهيئة المحرك: ${err.message}`;
		}
	});

	// Debounced compile trigger
	let compileTimeout: ReturnType<typeof setTimeout>;
	
	// Watch isSolution changes to auto-recompile
	$effect(() => {
		// Just reading isSolution to create dependency
		const _sol = isSolution;
		// Only recompile if we already have results
		if (engineStatus === 'ready' && svgPages.length > 0) {
			scheduleCompile();
		}
	});

	function scheduleCompile() {
		clearTimeout(compileTimeout);
		compileTimeout = setTimeout(() => compile(), 500);
	}

	// Expose compile for parent to call
	export function triggerCompile() {
		if (engineStatus === 'ready') {
			scheduleCompile();
		}
	}

	async function compile() {
		if (!engineModule || !examDocument || engineStatus === 'compiling') return;
		if (!examDocument.metadata?.yearId) return;

		loading = true;
		error = '';
		engineStatus = 'compiling';

		try {
			const result = await engineModule.compileToSvg(examDocument, isSolution);

			if (result.success && result.svgPages) {
				svgPages = result.svgPages;
				compileCount++;
			} else {
				error = result.error || 'خطأ غير معروف';
			}
		} catch (err: any) {
			error = err.message || 'خطأ في الترجمة';
		} finally {
			loading = false;
			engineStatus = 'ready';
		}
	}

	function zoom(delta: number) {
		scale = Math.max(0.2, Math.min(4.0, scale + delta));
	}

	function resetZoom() {
		scale = 1.1;
	}
</script>

<div class="relative flex h-full flex-col overflow-hidden bg-slate-100/30">
	<!-- Top Controls -->
	{#if numPages > 0 && engineStatus !== 'compiling'}
		<div class="z-20 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-2 backdrop-blur-sm shadow-sm">
			<div class="flex items-center gap-1">
				<Button variant="ghost" size="icon-sm" onclick={() => zoom(-0.25)} class="h-8 w-8 text-slate-600 hover:bg-slate-200">
					<ZoomOut size={16} />
				</Button>
				<span class="min-w-[45pt] text-center text-xs font-bold text-slate-500">{Math.round(scale * 100)}%</span>
				<Button variant="ghost" size="icon-sm" onclick={() => zoom(0.25)} class="h-8 w-8 text-slate-600 hover:bg-slate-200">
					<ZoomIn size={16} />
				</Button>
				<Button variant="ghost" size="icon-sm" onclick={resetZoom} class="h-8 w-8 text-slate-400 hover:bg-slate-200">
					<Maximize size={14} />
				</Button>
				<div class="w-px h-4 bg-slate-200 mx-1"></div>
				<Button variant="ghost" size="icon-sm" onclick={compile} class="h-8 w-8 text-slate-500 hover:bg-slate-200 hover:text-primary" title="إعادة الترجمة">
					<RefreshCw size={14} />
				</Button>
			</div>
			<div class="flex items-center gap-2">
				{#if isOfflineReady}
					<span class="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-600 border border-green-200">
						<Check size={10} /> محلي
					</span>
				{/if}
				<span class="text-xs font-bold text-slate-600">{visiblePage}/{numPages}</span>
			</div>
		</div>
	{/if}

	<!-- SVG Content Area -->
	<div class="flex-1 overflow-auto p-4 md:p-8 flex flex-col items-center gap-6 custom-scrollbar" bind:this={scrollContainer}>
		{#if engineStatus === 'loading-wasm' || engineStatus === 'loading-templates'}
			<div class="flex flex-1 flex-col items-center justify-center gap-4 text-muted-foreground pt-32">
				<Loader2 size={40} class="animate-spin text-primary" />
				<div class="text-center">
					<p class="text-sm font-bold">{engineProgress}</p>
					<p class="text-xs text-muted-foreground/70 mt-1">
						{#if engineStatus === 'loading-wasm'}
							يتم تحميل المحرك لأول مرة فقط (~15MB)
						{:else}
							سيتم تخزين القوالب محلياً للعمل بدون اتصال
						{/if}
					</p>
				</div>
			</div>
		{:else if engineStatus === 'compiling' || loading}
			<div class="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground pt-32">
				<Loader2 size={36} class="animate-spin text-primary" />
				<p class="text-sm font-medium">جاري الترجمة المحلية...</p>
			</div>
		{:else if error}
			<div class="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center pt-32">
				<AlertCircle size={32} class="text-red-500" />
				<p class="text-sm font-medium text-red-500">خطأ في الترجمة</p>
				<p class="max-w-sm text-xs text-muted-foreground whitespace-pre-wrap" dir="ltr">{error}</p>
				<Button variant="outline" size="sm" onclick={compile} class="mt-2">
					إعادة المحاولة
				</Button>
			</div>
		{:else if svgPages.length > 0}
			{#each svgPages as page, i}
				<div class="svg-page-container relative shadow-2xl rounded-sm border border-slate-200 bg-white" data-page={i + 1} style="width: {80 * scale}%; max-width: 1000px;">
					<img
						src="data:image/svg+xml;base64,{page}"
						alt="صفحة {i + 1}"
						class="w-full h-auto block select-none pointer-events-none"
					/>
				</div>
			{/each}
		{:else if engineStatus === 'ready'}
			<div class="flex flex-1 flex-col items-center justify-center gap-4 text-muted-foreground pt-32">
				<div class="text-6xl opacity-10">🎨</div>
				<p class="text-sm font-bold opacity-40">المحرك جاهز — اضغط على الزر لمعاينة الموضوع</p>
				<Button variant="outline" size="sm" onclick={compile} class="gap-1.5">
					<RefreshCw size={14} /> ترجمة الموضوع
				</Button>
			</div>
		{:else if engineStatus === 'error'}
			<div class="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground pt-32">
				<WifiOff size={32} class="text-red-400" />
				<p class="text-sm font-bold text-red-400">تعذر تحميل المحرك</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 8px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: #cbd5e1;
		border-radius: 10px;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb:hover {
		background: #94a3b8;
	}
</style>
