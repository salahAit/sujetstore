<script lang="ts">
	import { onDestroy } from 'svelte';
	import { ZoomIn, ZoomOut, RotateCcw, Loader2, AlertCircle, RefreshCw } from 'lucide-svelte';

	interface Props {
		url: string;
		title?: string;
		class?: string;
	}

	let { url, title = 'قارئ الوثيقة', class: className = '' }: Props = $props();

	let containerEl = $state<HTMLDivElement | null>(null);
	let pagesHostEl = $state<HTMLDivElement | null>(null);

	let loading = $state(true);
	let errorMsg = $state<string | null>(null);
	let pageCount = $state(0);
	let renderedPages = $state(0);
	let zoom = $state(1);
	let reloadNonce = $state(0);

	let activePdfDoc: any = null;
	let renderSequence = 0;

	async function destroyPdfDoc() {
		if (activePdfDoc) {
			try {
				await activePdfDoc.destroy();
			} catch {}
			activePdfDoc = null;
		}
	}

	async function renderAllPages(pdfDoc: any, seq: number, scaleMultiplier: number) {
		if (!pagesHostEl || !containerEl) return;
		pagesHostEl.innerHTML = '';
		renderedPages = 0;

		const containerWidth = Math.max(280, (containerEl.clientWidth || 360) - 24);
		const dpr = Math.min(window.devicePixelRatio || 1, 2.5);

		for (let p = 1; p <= pdfDoc.numPages; p++) {
			if (seq !== renderSequence) return;
			const page = await pdfDoc.getPage(p);
			if (seq !== renderSequence) return;

			const baseViewport = page.getViewport({ scale: 1 });
			const fitScale = Math.min(containerWidth / baseViewport.width, 2.2);
			const cssScale = Math.max(0.45, fitScale * scaleMultiplier);
			const cssViewport = page.getViewport({ scale: cssScale });
			const renderViewport = page.getViewport({ scale: cssScale * dpr });

			const wrapper = document.createElement('div');
			wrapper.className =
				'relative mx-auto mb-3 overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black/10';
			wrapper.style.width = `${Math.floor(cssViewport.width)}px`;

			const canvas = document.createElement('canvas');
			canvas.width = Math.floor(renderViewport.width);
			canvas.height = Math.floor(renderViewport.height);
			canvas.style.width = `${Math.floor(cssViewport.width)}px`;
			canvas.style.height = `${Math.floor(cssViewport.height)}px`;
			canvas.style.display = 'block';

			const badge = document.createElement('div');
			badge.className =
				'pointer-events-none absolute bottom-2 left-2 rounded-md bg-black/55 px-2 py-0.5 text-[10px] font-bold text-white';
			badge.textContent = `${p} / ${pdfDoc.numPages}`;

			wrapper.appendChild(canvas);
			wrapper.appendChild(badge);
			pagesHostEl.appendChild(wrapper);

			const ctx = canvas.getContext('2d', { alpha: false });
			if (ctx) {
				ctx.fillStyle = '#ffffff';
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				const task = page.render({ canvasContext: ctx, viewport: renderViewport });
				await task.promise;
			}
			renderedPages = p;
		}
	}

	async function loadAndRender(targetUrl: string, currentZoom: number) {
		const seq = ++renderSequence;
		loading = true;
		errorMsg = null;
		pageCount = 0;
		renderedPages = 0;

		if (pagesHostEl) pagesHostEl.innerHTML = '';
		await destroyPdfDoc();

		try {
			const cleanUrl = targetUrl.split('#')[0];
			const res = await fetch(cleanUrl, { credentials: 'include' });
			if (!res.ok) {
				throw new Error(
					res.status === 403
						? 'انتهت صلاحية رابط العرض أو غير مصرح به — أعد فتح الموضوع'
						: res.status === 429
							? 'تم تجاوز حد المشاهدات المؤقت، يرجى الانتظار قليلاً'
							: `تعذر تحميل الملف (HTTP ${res.status})`
				);
			}
			const data = new Uint8Array(await res.arrayBuffer());
			if (seq !== renderSequence) return;

			// Use legacy ESM build so both modern and older Android WebViews work seamlessly
			const pdfjsLib: any = await import('pdfjs-dist/legacy/build/pdf.mjs');
			if (pdfjsLib.GlobalWorkerOptions) {
				pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
			}

			const loadingTask = pdfjsLib.getDocument({
				data,
				isEvalSupported: false,
				useSystemFonts: true
			});
			const pdfDoc = await loadingTask.promise;
			if (seq !== renderSequence) {
				await pdfDoc.destroy().catch(() => {});
				return;
			}

			activePdfDoc = pdfDoc;
			pageCount = pdfDoc.numPages;
			loading = false;

			await renderAllPages(pdfDoc, seq, currentZoom);
		} catch (err: any) {
			if (seq !== renderSequence) return;
			loading = false;
			errorMsg = err?.message || 'حدث خطأ أثناء عرض ملف PDF';
		}
	}

	$effect(() => {
		const u = url;
		const _nonce = reloadNonce;
		if (typeof window === 'undefined' || !u) return;
		zoom = 1;
		loadAndRender(u, 1);
	});

	async function changeZoom(next: number) {
		const clamped = Math.max(0.65, Math.min(2.25, Number(next.toFixed(2))));
		if (clamped === zoom || !activePdfDoc) return;
		zoom = clamped;
		const seq = ++renderSequence;
		await renderAllPages(activePdfDoc, seq, zoom);
	}

	onDestroy(() => {
		renderSequence++;
		destroyPdfDoc();
	});
</script>

<div
	class="relative flex h-full w-full flex-col overflow-hidden bg-zinc-200 dark:bg-zinc-900 {className}"
	aria-label={title}
>
	<!-- Compact Viewer Toolbar -->
	<div
		class="z-10 flex shrink-0 items-center justify-between gap-2 border-b border-black/10 bg-zinc-100/95 px-3 py-1.5 text-xs text-zinc-700 backdrop-blur dark:border-white/10 dark:bg-zinc-950/95 dark:text-zinc-200"
	>
		<div class="flex items-center gap-1.5 font-bold">
			{#if pageCount > 0}
				<span class="rounded-md bg-black/5 px-2 py-0.5 dark:bg-white/10">
					{renderedPages < pageCount ? `${renderedPages}/${pageCount}` : `${pageCount} صفحات`}
				</span>
			{:else if loading}
				<span class="text-muted-foreground">جاري العرض...</span>
			{/if}
		</div>

		<div class="flex items-center gap-1" dir="ltr">
			<button
				type="button"
				onclick={() => changeZoom(zoom - 0.2)}
				disabled={loading || zoom <= 0.65}
				class="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-white/80 transition hover:bg-white disabled:opacity-40 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/15"
				title="تصغير"
				aria-label="تصغير"
			>
				<ZoomOut size={15} />
			</button>
			<span class="min-w-[44px] text-center font-mono text-[11px] font-bold">
				{Math.round(zoom * 100)}%
			</span>
			<button
				type="button"
				onclick={() => changeZoom(zoom + 0.2)}
				disabled={loading || zoom >= 2.25}
				class="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-white/80 transition hover:bg-white disabled:opacity-40 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/15"
				title="تكبير"
				aria-label="تكبير"
			>
				<ZoomIn size={15} />
			</button>
			{#if zoom !== 1}
				<button
					type="button"
					onclick={() => changeZoom(1)}
					class="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-white/80 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/15"
					title="ملاءمة العرض"
					aria-label="ملاءمة العرض"
				>
					<RotateCcw size={14} />
				</button>
			{/if}
		</div>
	</div>

	<!-- Scrollable Canvas Pages Area -->
	<div bind:this={containerEl} class="relative flex-1 overflow-auto p-3 pb-20">
		{#if loading}
			<div class="flex h-full min-h-[260px] flex-col items-center justify-center gap-3 text-zinc-600 dark:text-zinc-300">
				<Loader2 size={32} class="text-primary animate-spin" />
				<p class="text-sm font-bold">جاري تحضير صفحات الموضوع...</p>
			</div>
		{:else if errorMsg}
			<div class="flex h-full min-h-[260px] flex-col items-center justify-center gap-3 px-4 text-center">
				<AlertCircle size={36} class="text-red-500" />
				<p class="max-w-md text-sm font-bold text-zinc-800 dark:text-zinc-100">{errorMsg}</p>
				<button
					type="button"
					onclick={() => (reloadNonce += 1)}
					class="bg-primary text-primary-foreground inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold shadow"
				>
					<RefreshCw size={14} /> إعادة المحاولة
				</button>
			</div>
		{/if}

		<div bind:this={pagesHostEl} class="mx-auto w-full"></div>
	</div>
</div>
