<script lang="ts">
	import type { ContentBlock } from '$lib/modules/SujetBuilder/types';
	import { Type, FunctionSquare, Table2, ImageIcon, Trash2, Upload, Loader2, Plus, CheckCircle, ListChecks, GitBranch, Tag, GripVertical, Copy, ArrowRightLeft, Code2, AlignLeft, AlignCenter, AlignRight, Grid3x3, Minus, Square, PaintBucket, Maximize2, Minimize2 } from 'lucide-svelte';
	import MathPalette from './MathPalette.svelte';

	let {
		block = $bindable(),
		onremove,
		onchange,
		onduplicate,
		showGrip = true
	}: {
		block: ContentBlock;
		onremove?: () => void;
		onchange?: () => void;
		onduplicate?: () => void;
		showGrip?: boolean;
	} = $props();

	const blockTypeLabels: Record<string, string> = {
		text: 'نص',
		math: 'معادلة',
		table: 'جدول',
		image: 'صورة',
		true_false: 'صح/خطأ',
		multiple_choice: 'اختيار متعدد',
		diagram_flow: 'مخطط تدفقي',
		labeling: 'تسميات',
		typst_raw: 'Typst حر'
	};

	const blockTypeIcons: Record<string, any> = {
		text: Type,
		math: FunctionSquare,
		table: Table2,
		image: ImageIcon,
		true_false: CheckCircle,
		multiple_choice: ListChecks,
		diagram_flow: GitBranch,
		labeling: Tag,
		typst_raw: Code2
	};

	// Image upload state
	let uploading = $state(false);
	let dragOver = $state(false);
	const uploadId = `img-upload-${Math.random().toString(36).slice(2, 9)}`;

	// Input refs for MathPalette
	let textInputRef: HTMLTextAreaElement | null = $state(null);
	let mathInputRef: HTMLInputElement | null = $state(null);
	let typstRawRef: HTMLTextAreaElement | null = $state(null);

	// Autocomplete state
	let showAutocomplete = $state(false);
	let autocompleteItems = $state<{ label: string; template: string }[]>([]);
	let autocompletePos = $state({ top: 0, left: 0 });
	let selectedAutocompleteIndex = $state(0);

	const autocompleteDict: { trigger: string; label: string; template: string }[] = [
		{ trigger: 'fr', label: 'كسر frac(a, b)', template: 'frac(, )' },
		{ trigger: 'sq', label: 'جذر sqrt(x)', template: 'sqrt()' },
		{ trigger: 'ro', label: 'جذر نوني root(n, x)', template: 'root(, )' },
		{ trigger: 'su', label: 'مجموع sum', template: 'sum_(i=1)^(n) ' },
		{ trigger: 'pr', label: 'جداء product', template: 'product_(i=1)^(n) ' },
		{ trigger: 'in', label: 'تكامل integral', template: 'integral_(a)^(b) ' },
		{ trigger: 'li', label: 'نهاية lim', template: 'lim_(x arrow 0) ' },
		{ trigger: 'ma', label: 'مصفوفة mat(...)', template: 'mat(, ; , )' },
		{ trigger: 'ca', label: 'حالات cases(...)', template: 'cases( = , = )' },
		{ trigger: 'bi', label: 'تركيبة binom(n,k)', template: 'binom(, )' },
		{ trigger: 'ab', label: 'قيمة مطلقة abs(x)', template: 'abs()' },
		{ trigger: 've', label: 'متجه vec(x)', template: 'vec()' },
		{ trigger: 'ov', label: 'خط علوي overline', template: 'overline()' },
		{ trigger: 'al', label: 'alpha α', template: 'alpha' },
		{ trigger: 'be', label: 'beta β', template: 'beta' },
		{ trigger: 'de', label: 'delta δ', template: 'delta' },
		{ trigger: 'th', label: 'theta θ', template: 'theta' },
		{ trigger: 'pi', label: 'pi π', template: 'pi' },
		{ trigger: 'pa', label: 'توازي parallel', template: 'parallel' },
		{ trigger: 'pe', label: 'تعامد perp', template: 'perp' },
		{ trigger: 'an', label: 'زاوية angle', template: 'angle' },
		{ trigger: 'ar', label: 'سهم arrow.r', template: 'arrow.r' },
		{ trigger: 'ti', label: 'ضرب times', template: 'times' },
		{ trigger: 'di', label: 'قسمة div', template: 'div' },
	];

	function handleMathKeydown(e: KeyboardEvent, inputEl: HTMLInputElement | HTMLTextAreaElement | null) {
		if (!inputEl) return;

		if (showAutocomplete) {
			if (e.key === 'ArrowDown') {
				e.preventDefault();
				selectedAutocompleteIndex = Math.min(selectedAutocompleteIndex + 1, autocompleteItems.length - 1);
				return;
			}
			if (e.key === 'ArrowUp') {
				e.preventDefault();
				selectedAutocompleteIndex = Math.max(selectedAutocompleteIndex - 1, 0);
				return;
			}
			if (e.key === 'Enter' || e.key === 'Tab') {
				if (autocompleteItems.length > 0) {
					e.preventDefault();
					applyAutocomplete(autocompleteItems[selectedAutocompleteIndex]);
					return;
				}
			}
			if (e.key === 'Escape') {
				showAutocomplete = false;
				return;
			}
		}
	}

	function handleMathInput(inputEl: HTMLInputElement | HTMLTextAreaElement | null) {
		if (!inputEl) return;
		onchange?.();

		const cursorPos = inputEl.selectionStart || 0;
		const text = (block as any).content || '';
		
		// Get the last 2 chars before cursor
		const beforeCursor = text.substring(Math.max(0, cursorPos - 2), cursorPos).toLowerCase();
		
		if (beforeCursor.length >= 2) {
			const matches = autocompleteDict.filter(d => d.trigger === beforeCursor);
			if (matches.length > 0) {
				autocompleteItems = matches;
				selectedAutocompleteIndex = 0;
				showAutocomplete = true;
				return;
			}
		}
		showAutocomplete = false;
	}

	function applyAutocomplete(item: { label: string; template: string }) {
		if (block.type !== 'math' && block.type !== 'typst_raw') return;
		const inputEl = block.type === 'math' ? mathInputRef : typstRawRef;
		if (!inputEl) return;

		const cursorPos = inputEl.selectionStart || 0;
		const text = block.content;
		// Replace the 2-char trigger with the template
		const before = text.substring(0, cursorPos - 2);
		const after = text.substring(cursorPos);
		block.content = before + item.template + after;
		showAutocomplete = false;
		onchange?.();

		setTimeout(() => {
			inputEl.focus();
			// Place cursor inside parentheses if applicable
			const parenPos = item.template.indexOf('(');
			const newPos = parenPos >= 0 ? before.length + parenPos + 1 : before.length + item.template.length;
			inputEl.setSelectionRange(newPos, newPos);
		}, 0);
	}

	// Block type conversion
	function convertBlock(toType: 'text' | 'math' | 'typst_raw') {
		const content = (block as any).content || '';
		if (toType === 'text') {
			(block as any).type = 'text';
			(block as any).content = content;
		} else if (toType === 'math') {
			(block as any).type = 'math';
			(block as any).content = content.replace(/\$/g, '');
			(block as any).display = true;
		} else if (toType === 'typst_raw') {
			(block as any).type = 'typst_raw';
			(block as any).content = content;
		}
		onchange?.();
	}

	// Image upload
	async function uploadFile(file: File) {
		if (block.type !== 'image') return;
		uploading = true;
		try {
			const formData = new FormData();
			formData.append('file', file);
			const res = await fetch('/api/upload-image', { method: 'POST', body: formData });
			const data = await res.json();
			if (data.success) {
				block.src = data.url;
				onchange?.();
			} else {
				alert(data.error || 'فشل في رفع الصورة');
			}
		} catch {
			alert('خطأ في الاتصال');
		} finally {
			uploading = false;
		}
	}

	function handleFilePick(e: Event) {
		const input = e.target as HTMLInputElement;
		if (input.files?.[0]) uploadFile(input.files[0]);
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		dragOver = false;
		if (e.dataTransfer?.files?.[0]) uploadFile(e.dataTransfer.files[0]);
	}

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		dragOver = true;
	}

	function triggerFilePicker() {
		document.getElementById(uploadId)?.click();
	}

	// True/False helpers
	function addTFItem() {
		if (block.type === 'true_false') {
			block.items = [...block.items, { q: '', a: '', mark: '01' }];
			onchange?.();
		}
	}

	function removeTFItem(i: number) {
		if (block.type === 'true_false') {
			block.items = block.items.filter((_, idx) => idx !== i);
			onchange?.();
		}
	}

	// MCQ helpers
	function addMCQGroup() {
		if (block.type === 'multiple_choice') {
			block.groups = [...block.groups, { header: '', options: ['', '', ''], correct: '', mark: '01' }];
			onchange?.();
		}
	}

	function removeMCQGroup(i: number) {
		if (block.type === 'multiple_choice') {
			block.groups = block.groups.filter((_, idx) => idx !== i);
			onchange?.();
		}
	}

	function addMCQOption(gi: number) {
		if (block.type === 'multiple_choice') {
			block.groups[gi].options = [...block.groups[gi].options, ''];
			onchange?.();
		}
	}

	// Labeling helpers
	function addLabel() {
		if (block.type === 'labeling') {
			block.labels = [...block.labels, ''];
			onchange?.();
		}
	}

	function removeLabel(i: number) {
		if (block.type === 'labeling') {
			block.labels = block.labels.filter((_, idx) => idx !== i);
			onchange?.();
		}
	}

	// Table helpers
	function addTableColumn() {
		if (block.type === 'table') {
			block.headers = [...block.headers, ''];
			block.cells = [...block.cells, ''];
			if (block.rows) {
				block.rows = block.rows.map(row => [...row, '']);
			}
			onchange?.();
		}
	}

	function removeTableColumn(ci: number) {
		if (block.type === 'table') {
			block.headers = block.headers.filter((_, i) => i !== ci);
			block.cells = block.cells.filter((_, i) => i !== ci);
			if (block.rows) {
				block.rows = block.rows.map(row => row.filter((_, i) => i !== ci));
			}
			onchange?.();
		}
	}

	function addTableRow() {
		if (block.type === 'table') {
			if (!block.rows) {
				// Convert existing cells to rows format
				block.rows = [block.cells.map(c => typeof c === 'string' ? c : c.content)];
			}
			block.rows = [...block.rows, block.headers.map(() => '')];
			onchange?.();
		}
	}

	function removeTableRow(ri: number) {
		if (block.type === 'table' && block.rows) {
			block.rows = block.rows.filter((_, i) => i !== ri);
			if (block.rows.length === 0) {
				block.rows = undefined;
				block.cells = block.headers.map(() => '');
			}
			onchange?.();
		}
	}

	// Text formatting helpers
	function insertFormatting(prefix: string, suffix: string = '') {
		if (block.type !== 'text' || !textInputRef) return;
		
		const textarea = textInputRef;
		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const text = block.content;
		const selectedText = text.substring(start, end);
		
		const before = text.substring(0, start);
		const after = text.substring(end);
		
		let textToInsert = selectedText;
		if (prefix === '- ' && !selectedText) textToInsert = 'عنصر';
		else if (!selectedText && prefix !== '- ') textToInsert = 'نص';
		
		block.content = before + prefix + textToInsert + suffix + after;
		onchange?.();
		
		setTimeout(() => {
			if (textarea) {
				textarea.focus();
				textarea.setSelectionRange(
					start + prefix.length,
					start + prefix.length + textToInsert.length
				);
			}
		}, 0);
	}

	// Determine if block can be converted
	let canConvert = $derived(block.type === 'text' || block.type === 'math' || block.type === 'typst_raw');
	let showConvertMenu = $state(false);

	// Advanced Table Helpers
	function ensureCellObject(ri: number | 'header' | 'cells', ci: number) {
		if (block.type !== 'table') return null;
		
		let cellArray: any[];
		if (ri === 'header') cellArray = block.headers;
		else if (ri === 'cells') cellArray = block.cells;
		else {
			if (!block.rows) return null;
			cellArray = block.rows[ri];
		}
		
		if (typeof cellArray[ci] === 'string') {
			cellArray[ci] = { content: cellArray[ci] };
		}
		return cellArray[ci] as { content: string; colspan?: number; rowspan?: number; bold?: boolean };
	}

	function getTableGrid() {
		if (block.type !== 'table') return [];
		return [block.headers, ...(block.rows && block.rows.length > 0 ? block.rows : [block.cells])];
	}

	function isGridCellCovered(grid: any[][], ri: number, ci: number) {
		let covered = false;
		for (let r = 0; r <= ri; r++) {
			for (let c = 0; c <= ci; c++) {
				if (r === ri && c === ci) continue; // don't check self
				const cell = grid[r][c];
				const rs = typeof cell === 'object' && cell !== null ? (cell.rowspan || 1) : 1;
				const cs = typeof cell === 'object' && cell !== null ? (cell.colspan || 1) : 1;
				if (r + rs > ri && c + cs > ci) {
					covered = true;
					break;
				}
			}
			if (covered) break;
		}
		return covered;
	}

	function changeColspan(ri: number | 'header' | 'cells', ci: number, delta: number) {
		if (block.type !== 'table') return;
		const cell = ensureCellObject(ri, ci);
		if (!cell) return;
		
		const currentSpan = cell.colspan || 1;
		const newSpan = Math.max(1, currentSpan + delta);
		
		if (newSpan > 1) {
			const maxCols = block.headers.length;
			if (ci + newSpan > maxCols) return;
		}
		
		cell.colspan = newSpan;
		onchange?.();
	}

	function changeRowspan(ri: number | 'header' | 'cells', ci: number, delta: number) {
		if (block.type !== 'table') return;
		const cell = ensureCellObject(ri, ci);
		if (!cell) return;
		
		const currentSpan = cell.rowspan || 1;
		const newSpan = Math.max(1, currentSpan + delta);
		
		const grid = getTableGrid();
		let realRi = 0;
		if (ri === 'header') realRi = 0;
		else if (ri === 'cells') realRi = 1;
		else realRi = ri + 1;
		
		if (newSpan > 1) {
			if (realRi + newSpan > grid.length) return; // Cannot span past table bottom
		}
		
		cell.rowspan = newSpan;
		onchange?.();
	}

	function toggleCellBold(ri: number | 'header' | 'cells', ci: number) {
		if (block.type !== 'table') return;
		const cell = ensureCellObject(ri, ci);
		if (!cell) return;
		cell.bold = !cell.bold;
		onchange?.();
	}
	
	function getCellContentRef(ri: number | 'header' | 'cells', ci: number): string {
		if (block.type !== 'table') return '';
		
		let cellArray: any[];
		if (ri === 'header') cellArray = block.headers;
		else if (ri === 'cells') cellArray = block.cells;
		else {
			if (!block.rows) return '';
			cellArray = block.rows[ri];
		}
		
		const c = cellArray[ci];
		return typeof c === 'string' ? c : (c?.content || '');
	}
	
	function updateCellContent(ri: number | 'header' | 'cells', ci: number, val: string) {
		if (block.type !== 'table') return;
		
		let cellArray: any[];
		if (ri === 'header') cellArray = block.headers;
		else if (ri === 'cells') cellArray = block.cells;
		else {
			if (!block.rows) return;
			cellArray = block.rows[ri];
		}

		if (typeof cellArray[ci] === 'string') {
			cellArray[ci] = val;
		} else {
			cellArray[ci].content = val;
		}
		onchange?.();
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="group relative rounded-xl border border-border bg-card/50 p-3 transition-all hover:border-primary/30">
	<!-- Block Header -->
	<div class="mb-2 flex items-center justify-between">
		<div class="flex items-center gap-1.5">
			{#if showGrip}
				<div class="cursor-grab active:cursor-grabbing text-muted-foreground/50 hover:text-muted-foreground transition-colors" data-grip>
					<GripVertical size={14} />
				</div>
			{/if}
			<span class="flex items-center gap-1.5 rounded-lg bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
				{#if blockTypeIcons[block.type]}
					{@const IconComponent = blockTypeIcons[block.type]}
					<IconComponent size={12} />
				{/if}
				{blockTypeLabels[block.type] ?? block.type}
			</span>
		</div>
		<div class="flex items-center gap-0.5">
			<!-- Convert button -->
			{#if canConvert}
				<div class="relative">
					<button
						class="rounded-md p-1 text-muted-foreground opacity-0 transition-all hover:bg-blue-500/10 hover:text-blue-500 group-hover:opacity-100"
						onclick={() => showConvertMenu = !showConvertMenu}
						title="تحويل نوع الكتلة"
					>
						<ArrowRightLeft size={13} />
					</button>
					{#if showConvertMenu}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<div class="fixed inset-0 z-40" onclick={() => showConvertMenu = false}></div>
						<div class="absolute left-0 top-full z-50 mt-1 flex flex-col gap-0.5 rounded-lg border border-border bg-card p-1 shadow-lg min-w-[100px]">
							{#if block.type !== 'text'}
								<button class="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs hover:bg-muted text-start" onclick={() => { convertBlock('text'); showConvertMenu = false; }}>
									<Type size={12} /> نص
								</button>
							{/if}
							{#if block.type !== 'math'}
								<button class="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs hover:bg-muted text-start" onclick={() => { convertBlock('math'); showConvertMenu = false; }}>
									<FunctionSquare size={12} /> معادلة
								</button>
							{/if}
							{#if block.type !== 'typst_raw'}
								<button class="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs hover:bg-muted text-start" onclick={() => { convertBlock('typst_raw'); showConvertMenu = false; }}>
									<Code2 size={12} /> Typst حر
								</button>
							{/if}
						</div>
					{/if}
				</div>
			{/if}
			<!-- Duplicate button -->
			{#if onduplicate}
				<button
					class="rounded-md p-1 text-muted-foreground opacity-0 transition-all hover:bg-primary/10 hover:text-primary group-hover:opacity-100"
					onclick={onduplicate}
					title="تكرار الكتلة"
				>
					<Copy size={13} />
				</button>
			{/if}
			<!-- Remove button -->
			<button
				class="rounded-md p-1 text-muted-foreground opacity-0 transition-all hover:bg-red-500/10 hover:text-red-500 group-hover:opacity-100"
				onclick={onremove}
				title="حذف الكتلة"
			>
				<Trash2 size={13} />
			</button>
		</div>
	</div>

	<!-- ════════════ TEXT ════════════ -->
	{#if block.type === 'text'}
		<div class="space-y-2">
			<!-- Formatting Toolbar -->
			<div class="flex flex-wrap items-center gap-1.5 rounded-t-lg border-x border-t border-border bg-muted/30 px-2 py-1.5 shadow-sm">
				<button 
					class="rounded bg-background px-2.5 py-1 text-xs font-bold text-foreground shadow-sm transition-colors hover:bg-muted hover:text-primary border border-border/50" 
					onclick={() => insertFormatting('*', '*')}
					title="غامق"
				> B </button>
				<button 
					class="rounded bg-background px-2.5 py-1 text-xs font-bold tracking-widest text-foreground underline decoration-2 shadow-sm transition-colors hover:bg-muted hover:text-primary border border-border/50" 
					onclick={() => insertFormatting('_', '_')}
					title="تسطير"
				> U </button>
				
				<div class="w-px h-4 bg-border/80 mx-1"></div>
				
				<button 
					class="flex items-center gap-1.5 rounded bg-background px-2 py-1 text-xs font-bold text-foreground shadow-sm transition-colors hover:bg-muted hover:text-primary border border-border/50" 
					onclick={() => insertFormatting('- ')}
					title="قائمة نقطية"
				>
					<span class="text-[10px] text-muted-foreground mr-0.5">●</span> قائمة
				</button>
				
				<div class="w-px h-4 bg-border/80 mx-1"></div>
				
				<button 
					class="flex items-center gap-1 rounded bg-background px-2 py-1 text-xs font-mono font-bold text-foreground shadow-sm transition-colors hover:bg-muted hover:text-primary border border-border/50" 
					onclick={() => insertFormatting('$ ', ' $')}
					title="رياضيات مدمجة"
				>
					<span class="text-[10px] text-blue-500 mr-0.5">$</span> معادلة
				</button>
			</div>
			
			<textarea
				bind:this={textInputRef}
				class="w-full resize-y rounded-b-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[80px]"
				placeholder="اكتب النص هنا... (استخدم $...$ لإدراج رموز رياضية)"
				bind:value={block.content}
				oninput={() => onchange?.()}
			></textarea>
			<MathPalette bind:value={block.content} inputRef={textInputRef} {onchange} isTextMode={true} />
			<div class="grid grid-cols-2 gap-2">
				<input
					type="text"
					class="rounded-lg border border-blue-200 bg-blue-50 px-2 py-1 text-xs text-blue-700 focus:border-blue-400 focus:outline-none dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
					placeholder="الإجابة (للحل النموذجي)"
					bind:value={block.answer}
					oninput={() => onchange?.()}
				/>
				<input
					type="text"
					class="rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-xs text-red-700 focus:border-red-400 focus:outline-none dark:border-red-800 dark:bg-red-900/30 dark:text-red-300"
					placeholder="النقاط (مثال: 02)"
					bind:value={block.mark}
					oninput={() => onchange?.()}
				/>
			</div>
		</div>

	<!-- ════════════ MATH ════════════ -->
	{:else if block.type === 'math'}
		<div class="space-y-2 relative">
			<input
				bind:this={mathInputRef}
				type="text"
				class="w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
				placeholder="مثال: frac(a, b) + sqrt(x^2 + y^2)"
				bind:value={block.content}
				oninput={() => handleMathInput(mathInputRef)}
				onkeydown={(e) => handleMathKeydown(e, mathInputRef)}
				onfocus={() => { showAutocomplete = false; }}
			/>
			<!-- Autocomplete Dropdown -->
			{#if showAutocomplete && autocompleteItems.length > 0}
				<div class="absolute left-0 right-0 top-[42px] z-50 rounded-lg border border-primary/30 bg-card shadow-xl overflow-hidden">
					{#each autocompleteItems as item, i}
						<button
							class="flex w-full items-center gap-2 px-3 py-2 text-xs text-start transition-colors {i === selectedAutocompleteIndex ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-foreground'}"
							onmousedown={(e) => { e.preventDefault(); applyAutocomplete(item); }}
						>
							<span class="font-mono text-primary/70 bg-primary/5 rounded px-1.5 py-0.5">{item.template}</span>
							<span class="text-muted-foreground">{item.label}</span>
						</button>
					{/each}
				</div>
			{/if}
			<MathPalette bind:value={block.content} inputRef={mathInputRef} {onchange} isTextMode={false} />
			<label class="flex items-center gap-2 text-xs text-muted-foreground">
				<input type="checkbox" bind:checked={block.display} onchange={() => onchange?.()} class="rounded" />
				عرض مركزي (Display mode)
			</label>
		</div>

	<!-- ════════════ TYPST RAW ════════════ -->
	{:else if block.type === 'typst_raw'}
		<div class="space-y-2 relative">
			<div class="rounded-lg overflow-hidden border border-border">
				<div class="flex items-center gap-2 bg-zinc-800 px-3 py-1.5 text-[10px] font-bold text-zinc-400">
					<Code2 size={12} />
					<span>Typst Markup</span>
					<span class="mr-auto text-zinc-500">اكتب أي كود Typst هنا</span>
				</div>
				<textarea
					bind:this={typstRawRef}
					class="w-full resize-y bg-zinc-900 px-3 py-2 font-mono text-sm text-green-300 focus:outline-none min-h-[100px] placeholder:text-zinc-600"
					placeholder={'مثال:\n#align(center)[\n  $ sum_(i=1)^n i = frac(n(n+1), 2) $\n]'}
					bind:value={block.content}
					oninput={() => handleMathInput(typstRawRef)}
					onkeydown={(e) => handleMathKeydown(e, typstRawRef)}
					spellcheck="false"
				></textarea>
			</div>
			<!-- Autocomplete Dropdown -->
			{#if showAutocomplete && autocompleteItems.length > 0}
				<div class="absolute left-0 right-0 z-50 rounded-lg border border-primary/30 bg-card shadow-xl overflow-hidden" style="top: calc(100% - 60px);">
					{#each autocompleteItems as item, i}
						<button
							class="flex w-full items-center gap-2 px-3 py-2 text-xs text-start transition-colors {i === selectedAutocompleteIndex ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-foreground'}"
							onmousedown={(e) => { e.preventDefault(); applyAutocomplete(item); }}
						>
							<span class="font-mono text-primary/70 bg-primary/5 rounded px-1.5 py-0.5">{item.template}</span>
							<span class="text-muted-foreground">{item.label}</span>
						</button>
					{/each}
				</div>
			{/if}
			<MathPalette bind:value={block.content} inputRef={typstRawRef} {onchange} isTextMode={false} />
			<div class="grid grid-cols-2 gap-2">
				<input
					type="text"
					class="rounded-lg border border-blue-200 bg-blue-50 px-2 py-1 text-xs text-blue-700 focus:border-blue-400 focus:outline-none dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
					placeholder="الإجابة (للحل النموذجي)"
					bind:value={block.answer}
					oninput={() => onchange?.()}
				/>
				<input
					type="text"
					class="rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-xs text-red-700 focus:border-red-400 focus:outline-none dark:border-red-800 dark:bg-red-900/30 dark:text-red-300"
					placeholder="النقاط (مثال: 02)"
					bind:value={block.mark}
					oninput={() => onchange?.()}
				/>
			</div>
		</div>

	<!-- ════════════ TABLE ════════════ -->
	{:else if block.type === 'table'}
		<div class="space-y-2 overflow-x-auto">
			<!-- Table Customization Toolbar -->
			<div class="flex flex-wrap items-center gap-2 rounded-t-lg border-x border-t border-border bg-muted/30 px-3 py-2 shadow-sm min-w-max">
				<!-- Alignment -->
				<div class="flex items-center rounded-md border border-border/50 bg-background overflow-hidden">
					<button type="button" class="px-3 py-1.5 hover:bg-muted {block.align === 'right' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}" onclick={() => { block.align = 'right'; onchange?.(); }} title="طبيعي (يمين)"><AlignRight size={16} /></button>
					<div class="w-px h-4 bg-border"></div>
					<button type="button" class="px-3 py-1.5 hover:bg-muted {block.align !== 'left' && block.align !== 'right' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}" onclick={() => { block.align = 'center'; onchange?.(); }} title="توسيط"><AlignCenter size={16} /></button>
					<div class="w-px h-4 bg-border"></div>
					<button type="button" class="px-3 py-1.5 hover:bg-muted {block.align === 'left' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}" onclick={() => { block.align = 'left'; onchange?.(); }} title="محاذاة لليسار"><AlignLeft size={16} /></button>
				</div>

				<!-- Borders -->
				<div class="flex items-center rounded-md border border-border/50 bg-background overflow-hidden">
					<button type="button" class="px-3 py-1.5 flex items-center gap-1.5 text-xs font-medium hover:bg-muted {block.borders !== 'none' && block.borders !== 'horizontal' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}" onclick={() => { block.borders = 'grid'; onchange?.(); }} title="جدول شبكي"><Grid3x3 size={16} /> شبكي</button>
					<div class="w-px h-4 bg-border"></div>
					<button type="button" class="px-3 py-1.5 flex items-center gap-1.5 text-xs font-medium hover:bg-muted {block.borders === 'horizontal' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}" onclick={() => { block.borders = 'horizontal'; onchange?.(); }} title="خطوط أفقية فقط"><Minus size={16} /> أفقي</button>
					<div class="w-px h-4 bg-border"></div>
					<button type="button" class="px-3 py-1.5 flex items-center gap-1.5 text-xs font-medium hover:bg-muted {block.borders === 'none' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}" onclick={() => { block.borders = 'none'; onchange?.(); }} title="بدون حدود"><Square size={16} /> فارغ</button>
				</div>

				<!-- Header BG -->
				<button 
					type="button"
					class="flex items-center gap-1.5 rounded-md border border-border/50 px-3 py-1.5 text-xs font-medium transition-colors {block.headerBackground ? 'bg-primary/10 text-primary border-primary/20' : 'bg-background text-muted-foreground hover:bg-muted'}"
					onclick={() => { block.headerBackground = !block.headerBackground; onchange?.(); }}
					title="تظليل الترويسة"
				>
					<PaintBucket size={16} /> تظليل الترويسة
				</button>

				<!-- Width -->
				<button 
					type="button"
					class="flex items-center gap-1.5 rounded-md border border-border/50 px-3 py-1.5 text-xs font-medium transition-colors {block.width === 'auto' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-background text-muted-foreground hover:bg-muted'}"
					onclick={() => { block.width = block.width === 'auto' ? 'full' : 'auto'; onchange?.(); }}
					title="توسيع أو تقليص العرض"
				>
					{#if block.width === 'auto'}
						<Minimize2 size={16} /> تلقائي
					{:else}
						<Maximize2 size={16} /> عرض كامل
					{/if}
				</button>
			</div>

			<!-- Table Content -->
			<div class="w-full overflow-x-auto border-x border-b border-border/50 rounded-b-lg p-2 bg-gradient-to-b from-muted/10 to-transparent">
				<table class="border-collapse {block.width === 'auto' ? 'w-max mx-auto' : 'w-full'}" 
					style="text-align: {block.align === 'right' ? 'right' : block.align === 'left' ? 'left' : 'center'};">
					<thead>
						<tr>
							{#each block.headers as h, ci}
								{@const cellObj = (typeof h === 'object' && h !== null ? h : {}) as any}
								{#if !isGridCellCovered(getTableGrid(), 0, ci)}
									<th colspan={cellObj.colspan || 1} rowspan={cellObj.rowspan || 1}
										class="relative group/th border px-1 py-0 focus-within:ring-1 focus-within:ring-primary focus-within:z-10 bg-background transition-colors
											{block.borders === 'none' ? 'border-transparent' : block.borders === 'horizontal' ? 'border-r-transparent border-l-transparent border-y-border' : 'border-border'}
											{block.headerBackground ? '!bg-muted/50' : ''}">
										
										<!-- Toolbar on focus -->
										<div class="absolute -top-[52px] left-1/2 -translate-x-1/2 hidden group-focus-within/th:flex items-center gap-1 rounded-md bg-popover text-popover-foreground shadow-lg border border-border p-1 z-20 whitespace-nowrap">
											<button type="button" class="p-1.5 hover:bg-muted rounded {cellObj.bold ? 'text-primary' : ''}" onclick={() => toggleCellBold('header', ci)} title="عريض"><strong class="font-serif text-sm">B</strong></button>
											<div class="flex flex-col gap-0.5 border-r border-border pr-1">
												<div class="flex items-center gap-0.5" title="دمج وتقسيم أفقي">
													<div class="flex items-center justify-center bg-muted/50 rounded w-12 h-5">
														<button type="button" class="flex-1 font-mono hover:bg-muted/80 rounded text-[10px] h-full" onclick={() => changeColspan('header', ci, 1)}>+</button>
														<span class="flex-1 text-[10px] text-center font-medium leading-none">{cellObj.colspan || 1}</span>
														<button type="button" class="flex-1 font-mono hover:bg-muted/80 rounded text-[10px] h-full" onclick={() => changeColspan('header', ci, -1)}>-</button>
													</div>
													<Grid3x3 size={10} class="text-muted-foreground/50 rotate-90" />
												</div>
												<div class="flex items-center gap-0.5" title="دمج وتقسيم عمودي">
													<div class="flex items-center justify-center bg-muted/50 rounded w-12 h-5">
														<button type="button" class="flex-1 font-mono hover:bg-muted/80 rounded text-[10px] h-full" onclick={() => changeRowspan('header', ci, 1)}>+</button>
														<span class="flex-1 text-[10px] text-center font-medium leading-none">{cellObj.rowspan || 1}</span>
														<button type="button" class="flex-1 font-mono hover:bg-muted/80 rounded text-[10px] h-full" onclick={() => changeRowspan('header', ci, -1)}>-</button>
													</div>
													<Grid3x3 size={10} class="text-muted-foreground/50" />
												</div>
											</div>
										</div>

										<input type="text"
												class="w-full bg-transparent px-2 py-1.5 text-sm focus:outline-none transition-all placeholder:font-normal {cellObj.bold ? 'font-bold' : 'font-semibold text-muted-foreground'}"
												style="text-align: inherit;"
												placeholder="عنوان {ci + 1}"
												value={getCellContentRef('header', ci)}
												oninput={(e) => updateCellContent('header', ci, (e.target as HTMLInputElement).value)} />
												
										{#if block.headers.length > 1}
											<button type="button" class="absolute -top-1.5 -right-1.5 rounded-full bg-red-500 text-white w-4 h-4 flex items-center justify-center text-[10px] opacity-0 group-hover/th:opacity-100 transition-opacity shadow-sm hover:scale-110" onclick={() => removeTableColumn(ci)} title="حذف العمود">×</button>
										{/if}
									</th>
								{/if}
							{/each}
							<th class="w-8 border-none p-1">
								<button type="button" class="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 border border-dashed border-border rounded transition-colors" onclick={addTableColumn} title="إضافة عمود">+</button>
							</th>
						</tr>
					</thead>
					<tbody>
						{#if block.rows && block.rows.length > 0}
							{#each block.rows as row, ri}
								<tr class="group/tr">
									{#each row as cell, ci}
										{@const cellObj = (typeof cell === 'object' && cell !== null ? cell : {}) as any}
										{#if !isGridCellCovered(getTableGrid(), ri + 1, ci)}
											<td colspan={cellObj.colspan || 1} rowspan={cellObj.rowspan || 1}
												class="relative group/td border px-1 py-0 focus-within:ring-1 focus-within:ring-primary focus-within:z-10 bg-background transition-colors
														{block.borders === 'none' ? 'border-transparent' : block.borders === 'horizontal' ? 'border-r-transparent border-l-transparent border-y-border' : 'border-border'}">
												
												<!-- Toolbar on focus -->
												<div class="absolute -top-[52px] left-1/2 -translate-x-1/2 hidden group-focus-within/td:flex items-center gap-1 rounded-md bg-popover text-popover-foreground shadow-lg border border-border p-1 z-20 whitespace-nowrap">
													<button type="button" class="p-1.5 hover:bg-muted rounded {cellObj.bold ? 'text-primary' : ''}" onclick={() => toggleCellBold(ri, ci)} title="عريض"><strong class="font-serif text-sm">B</strong></button>
													<div class="flex flex-col gap-0.5 border-r border-border pr-1">
														<div class="flex items-center gap-0.5" title="دمج وتقسيم أفقي">
															<div class="flex items-center justify-center bg-muted/50 rounded w-12 h-5">
																<button type="button" class="flex-1 font-mono hover:bg-muted/80 rounded text-[10px] h-full" onclick={() => changeColspan(ri, ci, 1)}>+</button>
																<span class="flex-1 text-[10px] text-center font-medium leading-none">{cellObj.colspan || 1}</span>
																<button type="button" class="flex-1 font-mono hover:bg-muted/80 rounded text-[10px] h-full" onclick={() => changeColspan(ri, ci, -1)}>-</button>
															</div>
															<Grid3x3 size={10} class="text-muted-foreground/50 rotate-90" />
														</div>
														<div class="flex items-center gap-0.5" title="دمج وتقسيم عمودي">
															<div class="flex items-center justify-center bg-muted/50 rounded w-12 h-5">
																<button type="button" class="flex-1 font-mono hover:bg-muted/80 rounded text-[10px] h-full" onclick={() => changeRowspan(ri, ci, 1)}>+</button>
																<span class="flex-1 text-[10px] text-center font-medium leading-none">{cellObj.rowspan || 1}</span>
																<button type="button" class="flex-1 font-mono hover:bg-muted/80 rounded text-[10px] h-full" onclick={() => changeRowspan(ri, ci, -1)}>-</button>
															</div>
															<Grid3x3 size={10} class="text-muted-foreground/50" />
														</div>
													</div>
												</div>

												<input type="text"
														class="w-full bg-transparent px-2 py-1.5 text-sm focus:outline-none transition-all placeholder:font-normal placeholder:text-muted-foreground/40 {cellObj.bold ? 'font-bold' : 'font-normal text-foreground'}"
														style="text-align: inherit;"
														placeholder="..."
														value={getCellContentRef(ri, ci)}
														oninput={(e) => updateCellContent(ri, ci, (e.target as HTMLInputElement).value)} />
											</td>
										{/if}
									{/each}
									<td class="w-8 border-none p-1 opacity-0 group-hover/tr:opacity-100 transition-opacity">
										<button type="button" class="text-muted-foreground hover:text-red-500 hover:bg-red-500/10 p-1.5 rounded transition-colors" onclick={() => removeTableRow(ri)} title="حذف الصف"><Trash2 size={12} /></button>
									</td>
								</tr>
							{/each}
						{:else}
							<!-- Legacy single row -->
							<tr class="group/tr">
								{#each block.cells as cell, ci}
									{@const cellObj = (typeof cell === 'object' && cell !== null ? cell : {}) as any}
									{#if !isGridCellCovered(getTableGrid(), 1, ci)}
										<td colspan={cellObj.colspan || 1} rowspan={cellObj.rowspan || 1}
											class="relative group/td border px-1 py-0 focus-within:ring-1 focus-within:ring-primary focus-within:z-10 bg-background transition-colors
													{block.borders === 'none' ? 'border-transparent' : block.borders === 'horizontal' ? 'border-r-transparent border-l-transparent border-y-border' : 'border-border'}">
											
											<!-- Toolbar on focus -->
											<div class="absolute -top-[52px] left-1/2 -translate-x-1/2 hidden group-focus-within/td:flex items-center gap-1 rounded-md bg-popover text-popover-foreground shadow-lg border border-border p-1 z-20 whitespace-nowrap">
												<button type="button" class="p-1.5 hover:bg-muted rounded {cellObj.bold ? 'text-primary' : ''}" onclick={() => toggleCellBold('cells', ci)} title="عريض"><strong class="font-serif text-sm">B</strong></button>
												<div class="flex flex-col gap-0.5 border-r border-border pr-1">
													<div class="flex items-center gap-0.5" title="دمج وتقسيم أفقي">
														<div class="flex items-center justify-center bg-muted/50 rounded w-12 h-5">
															<button type="button" class="flex-1 font-mono hover:bg-muted/80 rounded text-[10px] h-full" onclick={() => changeColspan('cells', ci, 1)}>+</button>
															<span class="flex-1 text-[10px] text-center font-medium leading-none">{cellObj.colspan || 1}</span>
															<button type="button" class="flex-1 font-mono hover:bg-muted/80 rounded text-[10px] h-full" onclick={() => changeColspan('cells', ci, -1)}>-</button>
														</div>
														<Grid3x3 size={10} class="text-muted-foreground/50 rotate-90" />
													</div>
													<div class="flex items-center gap-0.5" title="دمج وتقسيم عمودي">
														<div class="flex items-center justify-center bg-muted/50 rounded w-12 h-5">
															<button type="button" class="flex-1 font-mono hover:bg-muted/80 rounded text-[10px] h-full" onclick={() => changeRowspan('cells', ci, 1)}>+</button>
															<span class="flex-1 text-[10px] text-center font-medium leading-none">{cellObj.rowspan || 1}</span>
															<button type="button" class="flex-1 font-mono hover:bg-muted/80 rounded text-[10px] h-full" onclick={() => changeRowspan('cells', ci, -1)}>-</button>
														</div>
														<Grid3x3 size={10} class="text-muted-foreground/50" />
													</div>
												</div>
											</div>

											<input type="text"
													class="w-full bg-transparent px-2 py-1.5 text-sm focus:outline-none transition-all placeholder:font-normal placeholder:text-muted-foreground/40 {cellObj.bold ? 'font-bold' : 'font-normal text-foreground'}"
													style="text-align: inherit;"
													placeholder="..."
													value={getCellContentRef('cells', ci)}
													oninput={(e) => updateCellContent('cells', ci, (e.target as HTMLInputElement).value)} />
										</td>
									{/if}
								{/each}
								<td class="w-8 border-none p-1"></td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>

			<button type="button" class="flex w-full items-center justify-center gap-1 rounded-lg border border-dashed border-border py-1.5 text-xs text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors" onclick={addTableRow}>
				<Plus size={12} /> إضافة صف
			</button>
		</div>

	<!-- ════════════ IMAGE ════════════ -->
	{:else if block.type === 'image'}
		<div class="space-y-2">
			{#if block.src}
				<div class="relative overflow-hidden rounded-lg border border-border">
					<img src={block.src} alt={block.caption || 'صورة التمرين'} class="max-h-48 w-full object-contain bg-muted" />
					<button
						class="absolute top-2 left-2 rounded-lg bg-red-500/90 p-1.5 text-white hover:bg-red-600"
						onclick={() => { if (block.type === 'image') { block.src = ''; onchange?.(); } }}
						title="إزالة الصورة"
					>
						<Trash2 size={12} />
					</button>
				</div>
			{:else}
				<div
					class="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-6 transition-all
						{dragOver ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-border hover:border-primary/50'}"
					ondrop={handleDrop}
					ondragover={handleDragOver}
					ondragleave={() => (dragOver = false)}
					onclick={triggerFilePicker}
					onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') triggerFilePicker(); }}
					role="button"
					tabindex="0"
				>
					{#if uploading}
						<Loader2 size={24} class="animate-spin text-primary" />
						<p class="text-xs text-muted-foreground">جاري رفع الصورة...</p>
					{:else}
						<Upload size={24} class="text-muted-foreground" />
						<p class="text-xs text-muted-foreground">اسحب وأفلت الصورة هنا أو انقر للاختيار</p>
						<p class="text-[10px] text-muted-foreground/60">PNG, JPEG, WebP, SVG — حد أقصى 5MB</p>
					{/if}
				</div>
				<input
					type="file"
					accept="image/png,image/jpeg,image/webp,image/svg+xml"
					class="hidden"
					id={uploadId}
					onchange={handleFilePick}
				/>
				<div class="flex items-center gap-2">
					<span class="text-xs text-muted-foreground whitespace-nowrap">أو رابط:</span>
					<input
						type="text"
						class="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
						placeholder="https://example.com/image.png"
						bind:value={block.src}
						oninput={() => onchange?.()}
					/>
				</div>
			{/if}
			<input
				type="text"
				class="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
				placeholder="عنوان الصورة (اختياري)"
				bind:value={block.caption}
				oninput={() => onchange?.()}
			/>
		</div>

	<!-- ════════════ TRUE/FALSE ════════════ -->
	{:else if block.type === 'true_false'}
		<div class="space-y-3">
			{#each block.items as item, i}
				<div class="rounded-lg border border-emerald-200 bg-emerald-50/50 p-2 dark:border-emerald-800 dark:bg-emerald-900/10">
					<div class="mb-1 flex items-center justify-between">
						<span class="text-xs font-medium text-emerald-700 dark:text-emerald-400">العبارة {i + 1}</span>
						<button class="text-muted-foreground hover:text-red-500" onclick={() => removeTFItem(i)}><Trash2 size={12} /></button>
					</div>
					<input type="text" class="mb-1 w-full rounded border border-border bg-background px-2 py-1 text-sm focus:border-primary focus:outline-none" placeholder="العبارة..." bind:value={block.items[i].q} oninput={() => onchange?.()} />
					<div class="grid grid-cols-3 gap-2">
						<select class="rounded border border-border bg-background px-2 py-1 text-xs focus:outline-none" bind:value={block.items[i].a} onchange={() => onchange?.()}>
							<option value="">الجواب</option>
							<option value="صحيح">صحيح</option>
							<option value="خاطئ">خاطئ</option>
						</select>
						<input type="text" class="rounded border border-border bg-background px-2 py-1 text-xs focus:outline-none" placeholder="التصحيح" bind:value={block.items[i].c} oninput={() => onchange?.()} />
						<input type="text" class="rounded border border-red-200 bg-red-50 px-2 py-1 text-xs text-red-700 focus:outline-none dark:border-red-800 dark:bg-red-900/30 dark:text-red-300" placeholder="النقاط" bind:value={block.items[i].mark} oninput={() => onchange?.()} />
					</div>
				</div>
			{/each}
			<button class="flex w-full items-center justify-center gap-1 rounded-lg border border-dashed border-emerald-300 py-1.5 text-xs text-emerald-600 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-400" onclick={addTFItem}>
				<Plus size={12} /> إضافة عبارة
			</button>
		</div>

	<!-- ════════════ MULTIPLE CHOICE ════════════ -->
	{:else if block.type === 'multiple_choice'}
		<div class="space-y-3">
			{#each block.groups as group, gi}
				<div class="rounded-lg border border-violet-200 bg-violet-50/50 p-2 dark:border-violet-800 dark:bg-violet-900/10">
					<div class="mb-1 flex items-center justify-between">
						<span class="text-xs font-medium text-violet-700 dark:text-violet-400">المجموعة {gi + 1}</span>
						<button class="text-muted-foreground hover:text-red-500" onclick={() => removeMCQGroup(gi)}><Trash2 size={12} /></button>
					</div>
					<input type="text" class="mb-2 w-full rounded border border-border bg-background px-2 py-1 text-sm focus:border-primary focus:outline-none" placeholder="عنوان السؤال..." bind:value={block.groups[gi].header} oninput={() => onchange?.()} />
					<div class="space-y-1">
						{#each group.options as _, oi}
							<div class="flex items-center gap-2">
								<input
									type="radio"
									name="mcq-{gi}-correct"
									value={group.options[oi]}
									checked={group.correct === group.options[oi] && group.options[oi] !== ''}
									onchange={() => { block.groups[gi].correct = group.options[oi]; onchange?.(); }}
									class="accent-violet-500"
								/>
								<input type="text" class="flex-1 rounded border border-border bg-background px-2 py-1 text-xs focus:outline-none" placeholder="الخيار {oi + 1}" bind:value={block.groups[gi].options[oi]} oninput={() => onchange?.()} />
							</div>
						{/each}
					</div>
					<div class="mt-2 flex gap-2">
						<button class="rounded border border-dashed border-violet-300 px-2 py-0.5 text-[10px] text-violet-600 hover:bg-violet-100 dark:border-violet-700 dark:text-violet-400" onclick={() => addMCQOption(gi)}>
							+ خيار
						</button>
						<input type="text" class="w-16 rounded border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] text-red-700 focus:outline-none dark:border-red-800 dark:bg-red-900/30 dark:text-red-300" placeholder="النقاط" bind:value={block.groups[gi].mark} oninput={() => onchange?.()} />
					</div>
				</div>
			{/each}
			<button class="flex w-full items-center justify-center gap-1 rounded-lg border border-dashed border-violet-300 py-1.5 text-xs text-violet-600 hover:bg-violet-50 dark:border-violet-700 dark:text-violet-400" onclick={addMCQGroup}>
				<Plus size={12} /> إضافة مجموعة
			</button>
		</div>

	<!-- ════════════ DIAGRAM FLOW ════════════ -->
	{:else if block.type === 'diagram_flow'}
		<div class="space-y-2">
			<p class="text-xs text-muted-foreground">مخطط: مدخل ← عملية ← مخرج</p>
			<div class="flex items-center gap-2">
				<div class="flex-1">
					<label class="text-[10px] text-amber-600">المدخل</label>
					<input type="text" class="w-full rounded border border-amber-200 bg-amber-50 px-2 py-1 text-xs focus:outline-none dark:border-amber-800 dark:bg-amber-900/20" placeholder="المدخل" bind:value={block.flow[2]} oninput={() => onchange?.()} />
				</div>
				<span class="mt-4 text-lg text-muted-foreground">←</span>
				<div class="flex-1">
					<label class="text-[10px] text-blue-600">العملية</label>
					<input type="text" class="w-full rounded border border-blue-300 bg-blue-50 px-2 py-1 text-xs font-bold focus:outline-none dark:border-blue-800 dark:bg-blue-900/20" placeholder="العملية" bind:value={block.flow[1]} oninput={() => onchange?.()} />
				</div>
				<span class="mt-4 text-lg text-muted-foreground">←</span>
				<div class="flex-1">
					<label class="text-[10px] text-amber-600">المخرج</label>
					<input type="text" class="w-full rounded border border-amber-200 bg-amber-50 px-2 py-1 text-xs focus:outline-none dark:border-amber-800 dark:bg-amber-900/20" placeholder="المخرج" bind:value={block.flow[0]} oninput={() => onchange?.()} />
				</div>
			</div>
			<input type="text" class="w-20 rounded border border-red-200 bg-red-50 px-2 py-1 text-xs text-red-700 focus:outline-none dark:border-red-800 dark:bg-red-900/30 dark:text-red-300" placeholder="النقاط" bind:value={block.mark} oninput={() => onchange?.()} />
		</div>

	<!-- ════════════ LABELING ════════════ -->
	{:else if block.type === 'labeling'}
		<div class="space-y-2">
			<p class="text-xs text-muted-foreground">التسميات / ملء الفراغات</p>
			<div class="grid grid-cols-2 gap-2">
				{#each block.labels as _, i}
					<div class="flex items-center gap-1">
						<input type="text" class="flex-1 rounded border border-cyan-200 bg-cyan-50 px-2 py-1 text-xs focus:outline-none dark:border-cyan-800 dark:bg-cyan-900/20" placeholder="التسمية {i + 1}" bind:value={block.labels[i]} oninput={() => onchange?.()} />
						<button class="text-muted-foreground hover:text-red-500" onclick={() => removeLabel(i)}><Trash2 size={10} /></button>
					</div>
				{/each}
			</div>
			<div class="flex items-center gap-2">
				<button class="flex items-center gap-1 rounded border border-dashed border-cyan-300 px-2 py-1 text-[10px] text-cyan-600 hover:bg-cyan-50 dark:border-cyan-700 dark:text-cyan-400" onclick={addLabel}>
					<Plus size={10} /> تسمية
				</button>
				<input type="text" class="w-20 rounded border border-red-200 bg-red-50 px-2 py-1 text-xs text-red-700 focus:outline-none dark:border-red-800 dark:bg-red-900/30 dark:text-red-300" placeholder="النقاط" bind:value={block.mark} oninput={() => onchange?.()} />
			</div>
		</div>
	{/if}
</div>
