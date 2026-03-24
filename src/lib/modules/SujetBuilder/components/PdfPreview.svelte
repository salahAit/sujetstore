<script lang="ts">
	import { onMount } from 'svelte';
	import { Loader2, AlertCircle, Printer, Download, ZoomIn, ZoomOut, Maximize } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	let {
		svgPages = [],
		pdfBase64 = '',
		loading = false,
		error = ''
	}: {
		svgPages?: string[];
		pdfBase64?: string;
		loading?: boolean;
		error?: string;
	} = $props();

	let scale = $state(1.5);
	let visiblePage = $state(1);
	let scrollContainer: HTMLDivElement | null = $state(null);

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

	function zoom(delta: number) {
		scale = Math.max(0.2, Math.min(4.0, scale + delta));
	}

	function resetZoom() {
		scale = 1.1;
	}

	function downloadPdf() {
		if (!pdfBase64) return;
		const link = document.createElement('a');
		link.href = `data:application/pdf;base64,${pdfBase64}`;
		link.download = `sujetstore-exam.pdf`;
		link.click();
	}

	function printPdf() {
		if (!pdfBase64) return;
		const iframe = document.createElement('iframe');
		iframe.style.display = 'none';
		iframe.src = `data:application/pdf;base64,${pdfBase64}`;
		document.body.appendChild(iframe);
		iframe.onload = () => {
			iframe.contentWindow?.focus();
			iframe.contentWindow?.print();
			setTimeout(() => document.body.removeChild(iframe), 1000);
		};
	}
</script>

<div class="relative flex h-full flex-col overflow-hidden bg-slate-100/30">
	<!-- Top Controls (Zoom) -->
	{#if numPages > 0 && !loading}
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
			</div>

			<span class="text-xs font-bold text-slate-600">{visiblePage}/{numPages}</span>
		</div>
	{/if}

	<!-- SVG Content Area (Continuous Scroll) -->
	<div class="flex-1 overflow-auto p-4 md:p-8 flex flex-col items-center gap-6 custom-scrollbar" bind:this={scrollContainer}>
		{#if loading}
			<div class="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground pt-32">
				<Loader2 size={36} class="animate-spin text-primary" />
				<p class="text-sm font-medium">جاري معالجة المعاينة بنظام SVG الحديث...</p>
			</div>
		{:else if error}
			<div class="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center pt-32">
				<AlertCircle size={32} class="text-red-500" />
				<p class="text-sm font-medium text-red-500">خطأ في التوليد</p>
				<p class="max-w-sm text-xs text-muted-foreground">{error}</p>
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
		{:else}
			<div class="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground pt-32">
				<div class="text-6xl opacity-10">🎨</div>
				<p class="text-sm font-bold opacity-40">اضغط "توليد الموضوع" لمعاينة النتيجة بأعلى دقة</p>
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
