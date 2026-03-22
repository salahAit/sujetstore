<script lang="ts">
	import type { ContentBlock } from '$lib/modules/SujetBuilder/types';
	import { Type, FunctionSquare, Table2, ImageIcon, Trash2, Upload, Loader2, Plus, CheckCircle, ListChecks, GitBranch, Tag } from 'lucide-svelte';

	let {
		block = $bindable(),
		onremove,
		onchange
	}: {
		block: ContentBlock;
		onremove?: () => void;
		onchange?: () => void;
	} = $props();

	const blockTypeLabels: Record<string, string> = {
		text: 'نص',
		math: 'معادلة',
		table: 'جدول',
		image: 'صورة',
		true_false: 'صح/خطأ',
		multiple_choice: 'اختيار متعدد',
		diagram_flow: 'مخطط تدفقي',
		labeling: 'تسميات'
	};

	const blockTypeIcons: Record<string, any> = {
		text: Type,
		math: FunctionSquare,
		table: Table2,
		image: ImageIcon,
		true_false: CheckCircle,
		multiple_choice: ListChecks,
		diagram_flow: GitBranch,
		labeling: Tag
	};

	// Image upload state
	let uploading = $state(false);
	let dragOver = $state(false);
	const uploadId = `img-upload-${Math.random().toString(36).slice(2, 9)}`;

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
			onchange?.();
		}
	}
</script>

<div class="group relative rounded-xl border border-border bg-card/50 p-3 transition-all hover:border-primary/30">
	<!-- Block Type Badge + Remove -->
	<div class="mb-2 flex items-center justify-between">
		<span class="flex items-center gap-1.5 rounded-lg bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
			{#if blockTypeIcons[block.type]}
				<svelte:component this={blockTypeIcons[block.type]} size={12} />
			{/if}
			{blockTypeLabels[block.type] ?? block.type}
		</span>
		<button
			class="text-muted-foreground opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
			onclick={onremove}
			title="حذف الكتلة"
		>
			<Trash2 size={14} />
		</button>
	</div>

	<!-- ════════════ TEXT ════════════ -->
	{#if block.type === 'text'}
		<div class="space-y-2">
			<textarea
				class="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
				rows="2"
				placeholder="اكتب النص هنا..."
				bind:value={block.content}
				oninput={() => onchange?.()}
			></textarea>
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
		<div class="space-y-2">
			<input
				type="text"
				class="w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
				placeholder="a^2 + b^2 = c^2"
				bind:value={block.content}
				oninput={() => onchange?.()}
			/>
			<label class="flex items-center gap-2 text-xs text-muted-foreground">
				<input type="checkbox" bind:checked={block.display} onchange={() => onchange?.()} class="rounded" />
				عرض مركزي (Display mode)
			</label>
		</div>

	<!-- ════════════ TABLE ════════════ -->
	{:else if block.type === 'table'}
		<div class="space-y-2 overflow-x-auto">
			<div class="flex items-center gap-1">
				{#each block.headers as _, i}
					<input
						type="text"
						class="min-w-[80px] flex-1 rounded border border-border bg-muted px-2 py-1.5 text-center text-xs font-bold text-foreground focus:border-primary focus:outline-none"
						placeholder="عنوان {i + 1}"
						bind:value={block.headers[i]}
						oninput={() => onchange?.()}
					/>
				{/each}
				<button
					class="rounded-lg border border-dashed border-border p-1.5 text-muted-foreground hover:border-primary hover:text-primary"
					onclick={addTableColumn}
					title="إضافة عمود"
				>+</button>
			</div>
			<div class="flex items-center gap-1">
				{#each block.cells as _, ci}
					{#if typeof block.cells[ci] === 'string'}
						<input
							type="text"
							class="min-w-[80px] flex-1 rounded border border-border bg-background px-2 py-1.5 text-center text-xs text-foreground focus:border-primary focus:outline-none"
							placeholder="..."
							bind:value={block.cells[ci]}
							oninput={() => onchange?.()}
						/>
					{/if}
				{/each}
			</div>
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
