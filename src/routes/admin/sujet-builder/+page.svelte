<script lang="ts">
	import type { PageData } from './$types';
	import type { ExamMetadata, ExerciseBlock, TemplateId, ExamType, TrimesterId, LevelId } from '$lib/modules/SujetBuilder/types';
	import MetadataPanel from '$lib/modules/SujetBuilder/components/MetadataPanel.svelte';
	import ExerciseEditor from '$lib/modules/SujetBuilder/components/ExerciseEditor.svelte';
	import PdfPreview from '$lib/modules/SujetBuilder/components/PdfPreview.svelte';
	import { ArrowRight, Eye, Download, RotateCcw, Maximize2, Minimize2, ExternalLink, FileText } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	// Editor state
	let metadata = $state<ExamMetadata>({
		levelId: 'moyen' as LevelId,
		yearId: '',
		yearName: '',
		subjectId: '',
		subjectName: '',
		trimesterId: 't1' as TrimesterId,
		trimesterName: 'الفصل الأول',
		docType: 'test' as ExamType,
		academicYear: '2024/2025',
		duration: '1 سا',
		siteUrl: 'sujetstore.com'
	});

	let isMetadataComplete = $derived(!!metadata.levelId && !!metadata.yearId && !!metadata.subjectId);

	let exercises = $state<ExerciseBlock[]>([
		{
			points: 6,
			instruction: '',
			content: [{ type: 'text', content: '' }]
		}
	]);

	// PDF state
	let pdfBase64 = $state('');
	let pdfLoading = $state(false);
	let pdfError = $state('');

	// Layout state
	let splitPercent = $state(50);
	let isDragging = $state(false);
	let editorCollapsed = $state(false);

	// Template ID
	let activeTemplate = $derived.by<TemplateId>(() => {
		const level = metadata.levelId;
		const type = metadata.docType;
		if (level === 'primaire') return 'primary/taqweem';
		if (level === 'moyen') return type === 'exam' ? 'middle/exam' : 'middle/quiz';
		return type === 'exam' ? 'secondary/exam' : 'secondary/quiz';
	});

	// Stats
	let totalPoints = $derived(exercises.reduce((sum, ex) => sum + Number(ex.points || 0), 0));

	// Generate PDF
	async function generatePdf() {
		pdfLoading = true;
		pdfError = '';
		try {
			const res = await fetch('/api/generate-pdf', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					templateId: activeTemplate,
					document: {
						metadata: $state.snapshot(metadata),
						exercises: $state.snapshot(exercises)
					}
				})
			});
			const result = await res.json();
			if (result.success) {
				pdfBase64 = result.pdfBase64;
			} else {
				pdfError = result.error || 'فشل في توليد الملف';
			}
		} catch (e: any) {
			pdfError = e.message || 'خطأ في الاتصال';
		} finally {
			pdfLoading = false;
		}
	}

	// Download PDF
	function downloadPdf() {
		if (!pdfBase64) return;
		const link = document.createElement('a');
		link.href = `data:application/pdf;base64,${pdfBase64}`;
		link.download = `sujet-${metadata.subjectName || 'exam'}-${metadata.yearName || ''}.pdf`;
		link.click();
	}

	// Open preview in popup window
	function openPopup() {
		if (!pdfBase64) return;
		const popup = window.open('', '_blank', 'width=800,height=1000');
		if (popup) {
			popup.document.write(`<html><head><title>معاينة الموضوع</title></head><body style="margin:0"><iframe src="data:application/pdf;base64,${pdfBase64}" style="width:100%;height:100%;border:none"></iframe></body></html>`);
		}
	}

	// Reset
	function reset() {
		exercises = [{ points: 4, instruction: '', content: [{ type: 'text', content: '' }] }];
		pdfBase64 = '';
		pdfError = '';
	}

	// Resizable split handler
	function startDrag(e: MouseEvent) {
		isDragging = true;
		const startX = e.clientX;
		const startPercent = splitPercent;
		const containerWidth = (e.target as HTMLElement).parentElement?.parentElement?.offsetWidth || window.innerWidth;

		function onMove(ev: MouseEvent) {
			// In RTL, the primary pane (editor) is on the right.
			// Dragging LEFT (smaller clientX) should INCREASE the editor's width.
			const delta = startX - ev.clientX;
			const newPercent = startPercent + (delta / containerWidth) * 100;
			splitPercent = Math.max(25, Math.min(75, newPercent));
		}

		function onUp() {
			isDragging = false;
			window.removeEventListener('mousemove', onMove);
			window.removeEventListener('mouseup', onUp);
		}

		window.addEventListener('mousemove', onMove);
		window.addEventListener('mouseup', onUp);
	}
</script>

<div class="flex h-screen flex-col">
	<!-- ═══ TOP BAR ═══ -->
	<header class="flex items-center justify-between border-b border-border bg-card px-4 py-2">
		<div class="flex items-center gap-3">
			<a href="/admin" class="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
				<ArrowRight size={16} />
				لوحة التحكم
			</a>
			<h1 class="text-lg font-bold text-foreground">منشئ المواضيع</h1>
		</div>
		<div class="flex items-center gap-3 text-xs text-muted-foreground">
			<span class="rounded-lg bg-muted px-2 py-1">التمارين: <strong class="text-foreground">{exercises.length}</strong></span>
			<span class="rounded-lg bg-muted px-2 py-1">المجموع: <strong class="text-primary">{totalPoints} نقطة</strong></span>
			{#if isMetadataComplete}
				<button onclick={reset} class="flex items-center gap-1 rounded-lg bg-muted px-2.5 py-1.5 text-muted-foreground hover:bg-red-500/10 hover:text-red-500" title="إعادة تعيين">
					<RotateCcw size={14} /> إعادة تعيين
				</button>
			{/if}
		</div>
	</header>

	<!-- ═══ SPLIT PANE ═══ -->
	<div class="relative flex flex-1 overflow-hidden" class:cursor-col-resize={isDragging} class:select-none={isDragging}>
		<!-- LEFT: EDITOR -->
		<div class="overflow-y-auto" style="width: {editorCollapsed ? 0 : splitPercent}%; {editorCollapsed ? 'display:none' : ''}">
			<div class="space-y-4 p-4">
				<MetadataPanel
					levels={data.levels}
					years={data.years}
					streams={data.streams}
					subjects={data.subjects}
					streamSubjects={data.streamSubjects}
					trimesters={data.trimesters}
					bind:metadata
				/>
				
				{#if isMetadataComplete}
					<ExerciseEditor bind:exercises />
				{:else}
					<div class="mt-8 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-amber-500/40 bg-amber-500/10 py-16 text-center shadow-sm">
						<div class="mb-4 rounded-full bg-amber-500/20 p-4 text-amber-600 dark:text-amber-400">
							<FileText size={36} />
						</div>
						<h3 class="mb-3 text-xl font-bold text-amber-700 dark:text-amber-400">ابدأ بتحديد معلومات الموضوع</h3>
						<p class="max-w-md text-sm font-medium leading-relaxed text-amber-700/80 dark:text-amber-400/80">
							يرجى اختيار <strong>المرحلة التعليمية</strong>، <strong>السنة الدراسية</strong>، و<strong>المادة</strong> من اللوحة العلوية لتفعيل محرر التمارين والبدء في بناء موضوعك.
						</p>
					</div>
				{/if}
			</div>
		</div>

		<!-- DIVIDER (draggable) -->
		{#if !editorCollapsed}
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<div
				class="group relative z-10 flex w-2 cursor-col-resize items-center justify-center bg-border transition-colors hover:bg-primary/30"
				onmousedown={startDrag}
			>
				<div class="h-8 w-1 rounded-full bg-muted-foreground/30 transition-colors group-hover:bg-primary"></div>
			</div>
		{/if}

		<!-- RIGHT: PREVIEW -->
		<div class="flex flex-1 flex-col overflow-hidden">
			<!-- Preview Header -->
			<div class="flex items-center justify-between border-b border-border bg-card px-4 py-2">
				<div class="flex items-center gap-2">
					<h3 class="text-sm font-bold text-foreground">📄 معاينة الموضوع</h3>
				</div>
				<div class="flex items-center gap-2">
					{#if isMetadataComplete}
						<button
							onclick={generatePdf}
							disabled={pdfLoading}
							class="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
						>
							<Eye size={14} />
							{pdfLoading ? 'جاري التوليد...' : 'توليد الموضوع'}
						</button>
						{#if pdfBase64}
							<button onclick={downloadPdf} class="flex items-center gap-1 rounded-lg bg-muted px-2.5 py-1.5 text-xs text-muted-foreground hover:text-primary" title="تحميل PDF">
								<Download size={14} /> تحميل
							</button>
							<button onclick={openPopup} class="flex items-center gap-1 rounded-lg bg-muted px-2.5 py-1.5 text-xs text-muted-foreground hover:text-primary" title="فتح في نافذة">
								<ExternalLink size={14} /> نافذة
							</button>
						{/if}
					{/if}
					<button
						onclick={() => (editorCollapsed = !editorCollapsed)}
						class="rounded-lg bg-muted p-1.5 text-muted-foreground hover:text-primary"
						title={editorCollapsed ? 'إظهار المحرر' : 'تكبير المعاينة'}
					>
						{#if editorCollapsed}
							<Minimize2 size={14} />
						{:else}
							<Maximize2 size={14} />
						{/if}
					</button>
				</div>
			</div>
			<!-- Preview Content -->
			<div class="flex-1 overflow-auto bg-muted/30 p-4">
				<PdfPreview {pdfBase64} loading={pdfLoading} error={pdfError} />
			</div>
		</div>
	</div>
</div>
