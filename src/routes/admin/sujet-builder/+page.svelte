<script lang="ts">
	import type { PageData } from './$types';
	import type { ExamMetadata, ExerciseBlock, TemplateId, ExamType, TrimesterId, LevelId } from '$lib/modules/SujetBuilder/types';
	import MetadataPanel from '$lib/modules/SujetBuilder/components/MetadataPanel.svelte';
	import ExerciseEditor from '$lib/modules/SujetBuilder/components/ExerciseEditor.svelte';
	import PdfPreview from '$lib/modules/SujetBuilder/components/PdfPreview.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight, Eye, Download, RotateCcw, PanelLeft, Columns, PanelRight, ExternalLink, FileText } from 'lucide-svelte';

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
	let isPreviewSolution = $state(false);

	// Layout state
	let splitPercent = $state(50);
	let isDragging = $state(false);
	let editorCollapsed = $state(false);
	let previewCollapsed = $state(false);

	// Template ID
	let activeTemplate = $derived.by<TemplateId>(() => {
		const level = metadata.levelId;
		const type = metadata.docType;
		if (level === 'primaire') return 'primary/taqweem';
		if (level === 'moyen') return type === 'exam' ? 'middle/exam' : 'middle/quiz';
		return type === 'exam' ? 'secondary/exam' : 'secondary/quiz';
	});

	// Stats
	let totalScore = $derived(exercises.reduce((sum, ex) => {
		let pt = typeof ex.points === 'string' ? parseFloat(ex.points) : ex.points;
		return sum + (isNaN(pt) ? 0 : pt);
	}, 0));

	let publishing = $state(false);

	async function publishDocument(isPublished: boolean) {
		if (!isMetadataComplete) {
			alert('يرجى استكمال جميع بيانات الموضوع (المستوى، السنة، المادة...)');
			return;
		}
		if (exercises.length === 0) {
			alert('يجب إضافة تمرين واحد على الأقل.');
			return;
		}

		publishing = true;
		
		const title = `موضوع ${metadata.docType === 'exam' ? 'اختبار' : 'فرض'} ${metadata.trimesterName} في مادة ${metadata.subjectName}`;

		try {
			const res = await fetch('/api/sujet-builder/publish', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					templateId: activeTemplate,
					document: {
						metadata: $state.snapshot(metadata),
						exercises: $state.snapshot(exercises)
					},
					isPublished,
					title
				})
			});
			const data = await res.json();
			if (data.success) {
				alert(isPublished ? 'تم نشر الموضوع بنجاح للحفظ والعرض للطلاب!' : 'تم حفظ المسودة بنجاح في قاعدة البيانات.');
			} else {
				alert('حدث خطأ: ' + (data.error || 'غير معروف'));
			}
		} catch (err) {
			console.error(err);
			alert('خطأ في الاتصال بالخادم!');
		} finally {
			publishing = false;
		}
	}

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
					},
					isSolution: isPreviewSolution
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
			previewCollapsed = true;
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
	<header class="flex flex-col md:flex-row items-center justify-between border-b border-border bg-card px-4 py-2 gap-3 md:gap-0">
		<div class="flex w-full md:w-auto items-center justify-between md:justify-start gap-3">
			<Button variant="outline" size="sm" href="/admin" class="shrink-0 gap-1.5 px-3 text-muted-foreground hover:bg-primary/10 hover:text-primary border-transparent hover:border-border bg-muted">
				<ArrowRight size={16} />
				<span class="hidden sm:inline">لوحة التحكم</span>
			</Button>
			<h1 class="text-base md:text-lg font-bold text-foreground truncate">منشئ المواضيع</h1>
		</div>
		
		<div class="flex w-full md:w-auto items-center justify-between md:justify-end gap-2 text-xs text-muted-foreground overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
			<div class="flex items-center gap-2 shrink-0">
				<span class="rounded-lg bg-muted px-2 py-1.5 border border-border/50">التمارين: <strong class="text-foreground">{exercises.length}</strong></span>
				<span class="rounded-lg bg-primary/10 px-2 py-1.5 border border-primary/20">المجموع: <strong class="text-primary">{totalScore} نقطة</strong></span>
			</div>
			
			<div class="flex items-center gap-3 shrink-0">
				{#if isMetadataComplete}
					<Button variant="outline" size="sm" onclick={reset} class="gap-1 px-2.5 text-muted-foreground shadow-sm transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-500" title="إعادة تعيين">
						<RotateCcw size={14} /> <span class="hidden sm:inline">إعادة تعيين</span>
					</Button>
				{/if}
				
				<!-- Layout Controls (Segmented Control) -->
				<div class="hidden md:flex items-center rounded-lg border border-border bg-muted/40 p-0.5 shadow-sm">
					<Button 
						variant="ghost" size="icon-sm"
						onclick={() => { previewCollapsed = true; editorCollapsed = false; }}
						class="rounded-md transition-all {previewCollapsed ? 'bg-background text-primary shadow-sm ring-1 ring-border/50 hover:bg-background hover:text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-background/20'}"
						title="المحرر فقط"
					>
						<PanelLeft size={16} />
					</Button>
					<Button 
						variant="ghost" size="icon-sm"
						onclick={() => { previewCollapsed = false; editorCollapsed = false; }}
						class="rounded-md transition-all {!previewCollapsed && !editorCollapsed ? 'bg-background text-primary shadow-sm ring-1 ring-border/50 hover:bg-background hover:text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-background/20'}"
						title="عرض مزدوج"
					>
						<Columns size={16} />
					</Button>
					<Button 
						variant="ghost" size="icon-sm"
						onclick={() => { previewCollapsed = false; editorCollapsed = true; }}
						class="rounded-md transition-all {editorCollapsed ? 'bg-background text-primary shadow-sm ring-1 ring-border/50 hover:bg-background hover:text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-background/20'}"
						title="المعاينة فقط"
					>
						<PanelRight size={16} />
					</Button>
				</div>
			</div>
		</div>
	</header>

	<!-- ═══ SPLIT PANE ═══ -->
	<div class="relative flex flex-1 flex-col lg:flex-row overflow-hidden" class:cursor-col-resize={isDragging} class:select-none={isDragging}>
		<!-- LEFT: EDITOR -->
		<div class="overflow-y-auto lg:h-full transition-all duration-200 {editorCollapsed ? 'hidden lg:hidden' : 'flex-1 lg:flex-none'}" style="lg:width: {editorCollapsed ? 0 : (previewCollapsed ? 100 : splitPercent)}%;">

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
					<ExerciseEditor bind:exercises {metadata} />
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

		<!-- DIVIDER (draggable - only visibly active on large screens) -->
		{#if !editorCollapsed && !previewCollapsed}
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<div
				class="hidden lg:flex group relative z-10 w-2 cursor-col-resize items-center justify-center bg-border transition-colors hover:bg-primary/30"
				onmousedown={startDrag}
			>
				<div class="h-8 w-1 rounded-full bg-muted-foreground/30 transition-colors group-hover:bg-primary"></div>
			</div>
			<!-- Mobile divider -->
			<div class="lg:hidden h-2 w-full bg-border md:bg-muted/50"></div>
		{/if}

		<!-- RIGHT: PREVIEW -->
		<div class="flex flex-col overflow-hidden transition-all duration-200 {previewCollapsed ? 'hidden lg:hidden' : 'flex-1 lg:flex-none shrink-0'}" style="lg:width: {previewCollapsed ? 0 : (editorCollapsed ? 100 : 100 - splitPercent)}%;">

			<!-- Preview Header -->
			<div class="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-4 py-2">
				<div class="flex items-center gap-2">
					<div class="flex items-center gap-1.5 text-primary">
						<Eye size={16} />
						<h3 class="text-sm font-bold text-foreground hidden sm:inline">معاينة الموضوع</h3>
					</div>
					<div class="flex items-center overflow-hidden rounded-lg border border-border bg-muted/50 p-0.5">
						<button 
							onclick={() => { isPreviewSolution = false; generatePdf(); }}
							class="px-3 py-1 text-[11px] font-bold transition-all {!isPreviewSolution ? 'bg-blue-600 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-background/20'}"
						>
							الموضوع
						</button>
						<button 
							onclick={() => { isPreviewSolution = true; generatePdf(); }}
							class="px-3 py-1 text-[11px] font-bold transition-all {isPreviewSolution ? 'bg-green-600 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-background/20'}"
						>
							التصحيح
						</button>
					</div>
				</div>
				<div class="flex items-center gap-2">
					{#if isMetadataComplete}
						<Button
							onclick={generatePdf}
							disabled={pdfLoading}
							size="sm"
							class="gap-1.5 px-3 text-xs font-medium shadow-sm"
						>
							<Eye size={14} />
							<span class="hidden lg:inline">{pdfLoading ? 'جاري التوليد...' : 'توليد الموضوع'}</span>
							<span class="lg:hidden">{pdfLoading ? '...' : 'توليد'}</span>
						</Button>
						
						{#if pdfBase64}
							<div class="flex items-center rounded-lg border border-border bg-muted/40 p-0.5">
								<Button variant="ghost" size="sm" onclick={downloadPdf} class="gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-background hover:text-primary shadow-sm h-7" title="تحميل PDF">
									<Download size={14} /> <span class="hidden 2xl:inline">تحميل</span>
								</Button>
								<div class="h-4 w-px bg-border mx-0.5"></div>
								<Button variant="ghost" size="sm" onclick={openPopup} class="gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-background hover:text-primary shadow-sm h-7" title="فتح المعاينة في بطاقة مستقلة">
									<ExternalLink size={14} /> <span class="hidden 2xl:inline">نافذة منبثقة</span>
								</Button>
							</div>
						{/if}
					{/if}
					
					<!-- Mobile-only view toggle -->
					<div class="md:hidden flex items-center rounded-lg border border-border bg-muted/40 p-0.5 shadow-sm">
						<Button 
							variant="ghost" size="icon-sm"
							onclick={() => { previewCollapsed = true; editorCollapsed = false; }}
							class="rounded-md transition-all {previewCollapsed ? 'bg-background text-primary shadow-sm ring-1 ring-border/50 hover:bg-background hover:text-primary' : 'text-muted-foreground hover:text-foreground'}"
							title="العودة للمحرر"
						>
							<PanelLeft size={16} />
						</Button>
					</div>
				</div>
			</div>
			<!-- Preview Content -->

			<div class="relative flex-1 overflow-auto bg-muted/30 p-4">
				<!-- Overlay to prevent iframe from swallowing mouse events during drag -->
				{#if isDragging}
					<div class="absolute inset-0 z-50"></div>
				{/if}
				<PdfPreview {pdfBase64} loading={pdfLoading} error={pdfError} />
			</div>
		</div>
	</div>
</div>
