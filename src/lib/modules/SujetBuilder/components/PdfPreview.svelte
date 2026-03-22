<script lang="ts">
	import { Loader2, AlertCircle, Printer, Download, ZoomIn, ZoomOut, Maximize, ChevronRight, ChevronLeft } from 'lucide-svelte';
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

	let currentPage = $state(1);
	let scale = $state(1.5);

	let numPages = $derived(svgPages.length);

	function changePage(delta: number) {
		const newPage = currentPage + delta;
		if (newPage >= 1 && newPage <= numPages) {
			currentPage = newPage;
		}
	}

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
	<!-- Top Controls (Zoom & Pages) -->
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

			<div class="flex items-center gap-3">
				<Button variant="ghost" size="icon-sm" onclick={() => changePage(-1)} disabled={currentPage <= 1} class="h-8 w-8 text-slate-600 rtl:rotate-180">
					<ChevronLeft size={18} />
				</Button>
				<span class="text-xs font-bold text-slate-600">صفحة {currentPage} من {numPages}</span>
				<Button variant="ghost" size="icon-sm" onclick={() => changePage(1)} disabled={currentPage >= numPages} class="h-8 w-8 text-slate-600 rtl:rotate-180">
					<ChevronRight size={18} />
				</Button>
			</div>

		</div>
	{/if}

	<!-- SVG Content Area -->
	<div class="flex-1 overflow-auto p-4 md:p-8 flex flex-col items-center custom-scrollbar">
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
			<div class="svg-page-container relative shadow-2xl rounded-sm border border-slate-200 bg-white" style="width: {80 * scale}%; max-width: 1000px;">
				<img 
					src="data:image/svg+xml;base64,{svgPages[currentPage - 1]}" 
					alt="Page {currentPage}"
					class="w-full h-auto block select-none pointer-events-none"
				/>
			</div>
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
