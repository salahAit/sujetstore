<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { ExamMetadata, ExerciseBlock, TemplateId, ExamType, TrimesterId, LevelId } from '$lib/modules/SujetBuilder/types';
	import MetadataPanel from '$lib/modules/SujetBuilder/components/MetadataPanel.svelte';
	import ExerciseEditor from '$lib/modules/SujetBuilder/components/ExerciseEditor.svelte';
	import TypstPreview from '$lib/modules/SujetBuilder/components/TypstPreview.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight, Eye, Download, Upload, RotateCcw, PanelLeft, Columns, PanelRight, ExternalLink, FileText, Sun, Moon, Printer, Save, Copy, ChevronUp, ChevronDown } from 'lucide-svelte';
	import { toggleMode } from 'mode-watcher';

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
		siteUrl: 'sujetstore.com',
		font: 'KFGQPC Uthman Taha Naskh'
	});

	let isMetadataComplete = $derived(!!metadata.levelId && !!metadata.yearId && !!metadata.subjectId);

	let exercises = $state<ExerciseBlock[]>([
		{ 
			id: Math.random().toString(36).substring(7), 
			points: 6, 
			instruction: '', 
			content: [{ type: 'text', content: '' }] 
		} as ExerciseBlock
	]);
	let pdfBase64 = $state('');
	let isGenerating = $state(false);
	let pdfError = $state('');
	let isPreviewSolution = $state(false);

	// Reactive document for WASM preview
	let examDocument = $derived({
		metadata: $state.snapshot(metadata),
		exercises: $state.snapshot(exercises)
	});

	// Reference to TypstPreview instance
	let typstPreviewRef: any = $state(null);
	function triggerRecompile() {
		typstPreviewRef?.triggerCompile();
	}

	let windowWidth = $state(1024);
	let popupWindow: Window | null = null;
	let isPopupOpen = $state(false);

	// Layout state
	let splitPercent = $state(50);
	let isDragging = $state(false);
	let editorCollapsed = $state(false);
	let previewCollapsed = $state(false);
	let isMetadataCollapsed = $state(false);

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
	let publishStatus = $state('');
	let editingDocId = $state<number | null>(null);

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

	// Generate PDF via server (for download/publish only)
	async function generatePdfServer() {
		isGenerating = true;
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
					isSolution: isPreviewSolution,
					format: 'pdf'
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
			isGenerating = false;
		}
	}

	// Handle PDF ready from WASM
	function handlePdfReady(pdfData: Uint8Array) {
		const binary = Array.from(pdfData).map(b => String.fromCharCode(b)).join('');
		pdfBase64 = btoa(binary);
	}

	// Download PDF
	function printPdf() {
		if (!pdfBase64) return;
		
		const byteCharacters = atob(pdfBase64);
		const byteNumbers = new Array(byteCharacters.length);
		for (let i = 0; i < byteCharacters.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i);
		}
		const byteArray = new Uint8Array(byteNumbers);
		const blob = new Blob([byteArray], { type: 'application/pdf' });
		const blobUrl = URL.createObjectURL(blob);

		const iframe = document.createElement('iframe');
		iframe.style.display = 'none';
		iframe.src = blobUrl;
		document.body.appendChild(iframe);
		
		iframe.onload = () => {
			iframe.contentWindow?.focus();
			iframe.contentWindow?.print();
			setTimeout(() => {
				document.body.removeChild(iframe);
				URL.revokeObjectURL(blobUrl);
			}, 1000);
		};
	}

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
		popupWindow = window.open('', '_blank', 'width=1000,height=800');
		if (popupWindow) {
			const titleText = `${metadata.subjectName || 'موضوع'} - ${metadata.yearName || ''}`;
			const html = `
				<!DOCTYPE html>
				<html dir="rtl" lang="ar">
				<head>
					<title>${titleText} (معاينة)</title>
					${'<style>'}
						body { margin: 0; padding: 0; display: flex; flex-direction: column; height: 100vh; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f1f5f9; }
						.header { display: flex; justify-content: space-between; align-items: center; padding: 12px 24px; background: white; border-bottom: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); z-index: 10; }
						.title { font-weight: 600; font-size: 16px; color: #0f172a; margin: 0; display: flex; align-items: center; gap: 8px; }
						.title svg { color: #64748b; }
						.actions { display: flex; gap: 8px; }
						.btn { padding: 8px 16px; border-radius: 6px; border: 1px solid #cbd5e1; background: white; color: #334155; font-size: 13px; font-weight: 600; cursor: pointer; text-decoration: none; transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px; }
						.btn:hover { background: #f8fafc; color: #0f172a; border-color: #94a3b8; }
						.btn-primary { background: #0f172a; color: white; border-color: #0f172a; }
						.btn-primary:hover { background: #1e293b; color: white; border-color: #1e293b; }
						.btn-danger { background: white; color: #ef4444; border-color: #fca5a5; }
						.btn-danger:hover { background: #fef2f2; color: #dc2626; border-color: #f87171; }
						iframe { flex: 1; width: 100%; border: none; background: #cbd5e1; }
					${'</style>'}
				</head>
				<body>
					<div class="header">
						<h1 class="title">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
							معاينة الطباعة
						</h1>
						<div class="actions">
							<button class="btn btn-primary" onclick="window.print()">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V2h12v7"/><rect x="6" y="14" width="12" height="8"/></svg>
								طباعة
							</button>
							<a class="btn" href="data:application/pdf;base64,${pdfBase64}" download="sujet-${metadata.subjectName || 'exam'}.pdf">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
								تحميل PDF
							</a>
							<button class="btn btn-danger" onclick="window.close()">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
								إغلاق
							</button>
						</div>
					</div>
					<iframe src="data:application/pdf;base64,${pdfBase64}#view=FitH" type="application/pdf"></iframe>
				</body>
				</html>
			`;
			popupWindow.document.open();
			popupWindow.document.write(html);
			popupWindow.document.close();
			
			isPopupOpen = true;
			previewCollapsed = true;
			editorCollapsed = false; // ensure editor expands
			
			// Track window close
			const timer = setInterval(() => {
				if (popupWindow?.closed) {
					clearInterval(timer);
					restorePreview();
				}
			}, 500);
		}
	}

	function restorePreview() {
		isPopupOpen = false;
		previewCollapsed = false;
		if (popupWindow && !popupWindow.closed) {
			popupWindow.close();
		}
		popupWindow = null;
	}

	// Reset
	function reset() {
		exercises = [
			{ 
				id: Math.random().toString(36).substring(7), 
				points: 4, 
				instruction: '', 
				content: [{ type: 'text', content: '' }] 
			} as ExerciseBlock
		];
		pdfBase64 = '';
		pdfError = '';
	}

	// Import Export
	let fileInput = $state<HTMLInputElement | null>(null);

	function exportSubject() {
		const documentData = {
			templateId: activeTemplate,
			document: {
				metadata: $state.snapshot(metadata),
				exercises: $state.snapshot(exercises)
			}
		};
		const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(documentData, null, 2));
		const downloadAnchorNode = document.createElement('a');
		downloadAnchorNode.setAttribute("href", dataStr);
		const filename = `sujet_${metadata.yearId || 'year'}_${metadata.subjectId || 'subject'}.json`;
		downloadAnchorNode.setAttribute("download", filename);
		document.body.appendChild(downloadAnchorNode);
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	}

	function importSubject(event: Event) {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const data = JSON.parse(e.target?.result as string);
				// Handle both nested { document: { metadata, exercises } } and flat { metadata, exercises }
				const doc = data.document || data;
				
				if (doc.metadata) {
					metadata = { 
						...metadata,  // keep defaults
						...doc.metadata, 
						font: doc.metadata.font || 'KFGQPC Uthman Taha Naskh',
						siteUrl: doc.metadata.siteUrl || 'sujetstore.com'
					};
				}
				if (doc.exercises && Array.isArray(doc.exercises)) {
					exercises = doc.exercises.map((ex: any) => {
						// Normalize content blocks: add unique IDs
						const normalizedContent = (ex.content || []).map((block: any) => ({
							...block,
							id: block.id || Math.random().toString(36).substring(2, 9)
						}));

						return {
							...ex,
							id: ex.id || Math.random().toString(36).substring(2, 9),
							instruction: ex.instruction || '',
							content: normalizedContent
						};
					});
				}
				
				if (fileInput) fileInput.value = ''; // reset
				const exCount = doc.exercises?.length || 0;
				alert(`تم استيراد الموضوع بنجاح!\n${exCount} تمرين(تمارين) تم تحميلها.`);
			} catch (err: any) {
				console.error('[Import] Error:', err);
				alert(`ملف JSON غير صالح أو به خطأ في الهيكلية.\n\nالخطأ: ${err.message}`);
			}
		};
		reader.readAsText(file);
	}

	// Load existing subject if ID is provided in URL
	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		const editId = urlParams.get('edit');
		const cloneId = urlParams.get('clone');
		const loadId = editId || cloneId;

		if (loadId) {
			try {
				const res = await fetch(`/api/sujet-builder/load?id=${loadId}`);
				const result = await res.json();
				if (result.success && result.document) {
					metadata = { ...result.document.metadata, font: result.document.metadata.font || 'KFGQPC Uthman Taha Naskh' };
					exercises = (result.document.exercises || []).map((ex: any) => ({
						...ex,
						id: ex.id || Math.random().toString(36).substring(2, 9)
					}));
					// Only track the document ID for editing, not cloning
					if (editId) editingDocId = parseInt(editId);
					// WASM preview auto-compiles via reactive document
				}
			} catch (err) {
				console.error('Failed to load subject:', err);
			}
		}
	});

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

<svelte:window bind:innerWidth={windowWidth} />

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
				<!-- Publish / Save -->
				{#if isMetadataComplete && exercises.length > 0}
					<div class="flex items-center rounded-lg border border-border bg-muted/40 p-0.5 shadow-sm">
						<Button variant="ghost" size="sm" onclick={() => publishDocument(false)} disabled={publishing}
							class="gap-1 rounded-md px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-background hover:text-foreground h-7" title="حفظ كمسودة">
							<Save size={14} />
							<span class="hidden xl:inline">{publishing ? 'جاري الحفظ...' : 'حفظ'}</span>
						</Button>
						<div class="h-4 w-px bg-border mx-0.5"></div>
						<Button variant="ghost" size="sm" onclick={() => publishDocument(true)} disabled={publishing}
							class="gap-1 rounded-md px-2.5 py-1 text-xs text-green-600 transition-colors hover:bg-green-500/10 hover:text-green-500 h-7" title="نشر الموضوع مع PDF والحل">
							<Upload size={14} />
							<span class="hidden xl:inline">{publishing ? 'جاري النشر...' : 'نشر'}</span>
						</Button>
					</div>
				{/if}

				<!-- Import / Export -->
				<input type="file" accept=".json" class="hidden" bind:this={fileInput} onchange={importSubject} />
				<Button variant="outline" size="sm" onclick={() => fileInput?.click()} class="gap-1 px-2.5 text-muted-foreground shadow-sm hover:text-foreground hover:bg-muted" title="استيراد موضوع">
					<Upload size={14} /> <span class="hidden xl:inline">استيراد</span>
				</Button>
				<Button variant="outline" size="sm" onclick={exportSubject} class="gap-1 px-2.5 text-muted-foreground shadow-sm hover:text-foreground hover:bg-muted mr-1" title="تصدير موضوع">
					<Download size={14} /> <span class="hidden xl:inline">تصدير</span>
				</Button>

				{#if isMetadataComplete}
					<Button variant="outline" size="sm" onclick={reset} class="gap-1 px-2.5 text-muted-foreground shadow-sm transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-500" title="إعادة تعيين">
						<RotateCcw size={14} /> <span class="hidden sm:inline">إعادة تعيين</span>
					</Button>
				{/if}

				{#if isPopupOpen}
					<Button variant="default" size="sm" onclick={restorePreview} class="gap-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white shadow-sm border-0 mr-1 animate-pulse">
						<RotateCcw size={14} /> <span class="hidden sm:inline">إستعادة المعاينة</span>
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

				<!-- Theme Toggle -->
				<Button
					variant="ghost"
					size="icon-sm"
					onclick={toggleMode}
					class="text-muted-foreground rounded-lg p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
					title="تغيير المظهر"
				>
					<Moon size={18} class="block dark:hidden" />
					<Sun size={18} class="hidden dark:block" />
				</Button>
			</div>
		</div>
	</header>

	<!-- ═══ SPLIT PANE ═══ -->
	<div class="relative flex flex-1 flex-col lg:flex-row overflow-hidden" class:cursor-col-resize={isDragging} class:select-none={isDragging}>
		<!-- LEFT: EDITOR -->
		<div 
			class="overflow-y-auto lg:h-full transition-all duration-200 {editorCollapsed ? 'hidden lg:hidden' : 'flex-1 lg:flex-none'}" 
			style:width={windowWidth >= 1024 ? (editorCollapsed ? '0%' : (previewCollapsed || isPopupOpen ? '100%' : `${splitPercent}%`)) : '100%'}
		>

			<div class="space-y-4 p-4">
				<div class="rounded-xl border border-border bg-card shadow-sm transition-all overflow-hidden">
					<div class="flex items-center justify-between p-3 {isMetadataCollapsed ? '' : 'border-b border-border bg-muted/20'}">
						<div class="flex items-center gap-3">
							<h3 class="text-sm font-bold text-foreground">معلومات الموضوع</h3>
							{#if isMetadataCollapsed && isMetadataComplete}
								<div class="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
									<span class="rounded bg-primary/10 px-2 py-0.5 text-primary">{metadata.subjectName}</span>
									<span>•</span>
									<span>{metadata.yearName}</span>
									<span>•</span>
									<span>{metadata.trimesterName}</span>
								</div>
							{/if}
						</div>
						<button 
							class="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
							onclick={() => isMetadataCollapsed = !isMetadataCollapsed}
							title={isMetadataCollapsed ? "توسيع المعلومات" : "طي المعلومات"}
						>
							{#if isMetadataCollapsed}
								<ChevronDown size={16} />
							{:else}
								<ChevronUp size={16} />
							{/if}
						</button>
					</div>
					
					{#if !isMetadataCollapsed}
						<div class="p-1">
							<MetadataPanel
								levels={data.levels}
								years={data.years}
								streams={data.streams}
								subjects={data.subjects}
								streamSubjects={data.streamSubjects}
								trimesters={data.trimesters}
								bind:metadata
							/>
						</div>
					{/if}
				</div>
				
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
		{#if !editorCollapsed && !previewCollapsed && !isPopupOpen}
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<div
				class="hidden lg:flex group relative z-10 w-2 cursor-col-resize items-center justify-center bg-border transition-colors hover:bg-primary/30"
				onmousedown={startDrag}
				role="separator"
				aria-label="Resizer"
			>
				<div class="h-8 w-1 rounded-full bg-muted-foreground/30 transition-colors group-hover:bg-primary"></div>
			</div>
			<!-- Mobile divider -->
			<div class="lg:hidden h-2 w-full bg-border md:bg-muted/50"></div>
		{/if}

		<!-- RIGHT: PREVIEW -->
		<div 
			class="flex flex-col overflow-hidden transition-all duration-200 {previewCollapsed && !isPopupOpen ? 'hidden lg:hidden' : 'flex-1 lg:flex-none shrink-0'}" 
			style:width={windowWidth >= 1024 ? (previewCollapsed || isPopupOpen ? '0%' : (editorCollapsed ? '100%' : `${100 - splitPercent}%`)) : '100%'}
			style:display={windowWidth >= 1024 && (previewCollapsed || isPopupOpen) ? 'none' : ''}
		>

			<!-- Preview Header -->
			<div class="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-4 py-2">
				<div class="flex items-center gap-2">
					<div class="flex items-center gap-1.5 text-primary">
						<Eye size={16} />
						<h3 class="text-sm font-bold text-foreground hidden sm:inline">معاينة مباشرة</h3>
					</div>
					<div class="flex items-center overflow-hidden rounded-lg border border-border bg-muted/50 p-0.5">
						<button 
							onclick={() => { triggerRecompile(); }}
							class="px-3 py-1 text-[11px] font-bold text-muted-foreground hover:text-foreground hover:bg-background/20 border-l border-border"
							title="تحديث المعاينة بالمتغيرات الجديدة"
						>
							تحديث
						</button>
						<button 
							onclick={() => { isPreviewSolution = false; triggerRecompile(); }}
							class="px-3 py-1 text-[11px] font-bold transition-all {!isPreviewSolution ? 'bg-blue-600 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-background/20'}"
						>
							الموضوع
						</button>
						<button 
							onclick={() => { isPreviewSolution = true; triggerRecompile(); }}
							class="px-3 py-1 text-[11px] font-bold transition-all {isPreviewSolution ? 'bg-green-600 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-background/20'}"
						>
							التصحيح
						</button>
					</div>
				</div>
				<div class="flex items-center gap-2">
					
					<div class="flex items-center rounded-lg border border-border bg-muted/40 p-0.5">
						<Button variant="ghost" size="sm" onclick={async () => { await generatePdfServer(); printPdf(); }} disabled={isGenerating || !isMetadataComplete} class="gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-background hover:text-blue-600 shadow-sm h-7" title="طباعة PDF">
							<Printer size={14} /> <span class="hidden 2xl:inline">طباعة</span>
						</Button>
						<div class="h-4 w-px bg-border mx-0.5"></div>
						<Button variant="ghost" size="sm" onclick={async () => { await generatePdfServer(); downloadPdf(); }} disabled={isGenerating || !isMetadataComplete} class="gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-background hover:text-green-600 shadow-sm h-7" title="تحميل PDF">
							<Download size={14} /> <span class="hidden 2xl:inline">تحميل</span>
						</Button>
						<div class="h-4 w-px bg-border mx-0.5"></div>
						<Button variant="ghost" size="sm" onclick={async () => { await generatePdfServer(); openPopup(); }} disabled={isGenerating || !isMetadataComplete} class="gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-background hover:text-primary shadow-sm h-7" title="فتح المعاينة في بطاقة مستقلة">
							<ExternalLink size={14} /> <span class="hidden 2xl:inline">نافذة منبثقة</span>
						</Button>
					</div>
					
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

			<div class="relative flex flex-1 flex-col overflow-hidden bg-muted/10 p-2 md:p-4">
				<!-- Overlay to prevent iframe from swallowing mouse events during drag -->
				{#if isDragging}
					<div class="absolute inset-0 z-50"></div>
				{/if}
				
				{#if isPopupOpen}
					<div class="flex flex-1 flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 p-8 text-center text-primary/80 h-full w-full">
						<ExternalLink size={48} class="opacity-50" />
						<h3 class="text-xl font-bold">المعاينة مفتوحة في نافذة منبثقة</h3>
						<p class="text-sm font-medium mb-2">يمكنك المتابعة في التحرير هنا بحجم شاشة كامل.</p>
						<Button onclick={restorePreview} variant="default" size="sm" class="gap-2 shadow-sm">
							<RotateCcw size={14} /> إعادة المعاينة إلى هنا
						</Button>
					</div>
				{:else}
					<div class="flex-1 overflow-hidden relative group">
						<TypstPreview 
							bind:this={typstPreviewRef}
							document={examDocument}
							templateId={activeTemplate}
							isSolution={isPreviewSolution}
							bind:loading={isGenerating}
							bind:error={pdfError}
							onPdfReady={handlePdfReady}
						/>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
```
