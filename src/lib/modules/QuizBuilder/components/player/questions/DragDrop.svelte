<script lang="ts">
	import { X } from 'lucide-svelte';
	let { data, onAnswer }: { data: any; onAnswer: (answer: any) => void } = $props();
	let categories: string[] = $derived(data.categories || []);
	let items: { text: string; category: number }[] = $derived(data.items || []);

	let assignments = $state<Record<string, number | null>>({});
	let dragItem = $state<string | null>(null);
	let selectedItem = $state<string | null>(null);

	// Initialize
	$effect(() => {
		const init: Record<string, number | null> = {};
		items.forEach((item) => (init[item.text] = null));
		assignments = init;
	});

	function startDrag(text: string) {
		dragItem = text;
	}

	function selectItem(text: string) {
		selectedItem = selectedItem === text ? null : text;
	}

	function drop(categoryIndex: number) {
		const itemText = dragItem || selectedItem;
		if (itemText) {
			assignments = { ...assignments, [itemText]: categoryIndex };
			dragItem = null;
			selectedItem = null;
			onAnswer({ assignments: { ...assignments } });
		}
	}

	function allowDrop(e: DragEvent) {
		e.preventDefault();
	}

	let unassigned = $derived(
		items.filter((item) => assignments[item.text] === null || assignments[item.text] === undefined)
	);
</script>

<div class="space-y-8">
	<div class="flex items-center justify-between border-b border-border pb-2">
		<p class="text-muted-foreground text-sm font-medium">اسحب العناصر إلى الفئة المناسبة (أو انقر للتحديد ثم انقر لإسقاط)</p>
	</div>

	<!-- Unassigned items -->
	<div class="flex flex-wrap items-center gap-3 min-h-[60px] p-2 rounded-2xl bg-muted/30 border border-border/50">
		{#each unassigned as item}
			<button
				type="button"
				draggable="true"
				ondragstart={() => startDrag(item.text)}
				onclick={() => selectItem(item.text)}
				class="relative cursor-grab select-none rounded-xl border border-border border-b-4 bg-card px-5 py-2.5 text-sm font-bold text-card-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md active:translate-y-[2px] active:border-b-2 active:shadow-sm active:cursor-grabbing {selectedItem === item.text ? 'border-primary border-b-primary bg-primary/5 text-primary shadow-md ring-2 ring-primary/20 ring-offset-1' : ''}"
			>
				{item.text}
			</button>
		{/each}
		{#if unassigned.length === 0}
			<div class="w-full flex items-center justify-center p-4">
				<p class="text-emerald-600 dark:text-emerald-400 font-bold text-sm bg-emerald-500/10 px-4 py-2 rounded-lg border border-emerald-500/20">✓ تم تصنيف جميع العناصر بنجاح</p>
			</div>
		{/if}
	</div>

	<!-- Category Drop Zones -->
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-{categories.length}">
		{#each categories as cat, ci}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<div class="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all {selectedItem ? 'ring-2 ring-primary/40 ring-offset-1' : ''}">
				<!-- Category Header (Solid) -->
				<div class="border-b border-border bg-muted/50 px-4 py-3 text-center">
					<h4 class="text-base font-extrabold text-foreground">{cat}</h4>
				</div>
				
				<!-- Drop Area (Dashed internally if empty, solid background if items exist) -->
				<div
					tabindex="0"
					role="region"
					ondragover={allowDrop}
					ondrop={() => drop(ci)}
					onclick={() => drop(ci)}
					onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') drop(ci); }}
					class="flex flex-1 flex-col gap-3 p-4 transition-colors {selectedItem ? 'cursor-pointer hover:bg-primary/5' : 'bg-background'}"
				>
					<!-- Assigned Items -->
					<div class="flex flex-wrap gap-2">
						{#each items.filter((item) => assignments[item.text] === ci) as assigned}
							<div
								class="group relative flex select-none items-center gap-2 rounded-xl border border-border border-b-[3px] bg-card px-3 py-2 text-sm font-bold shadow-sm transition-all hover:border-destructive/40"
							>
								<span class="text-foreground">{assigned.text}</span>
								<button
									type="button"
									class="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-destructive hover:text-white"
									onclick={(e) => {
										e.stopPropagation();
										assignments = { ...assignments, [assigned.text]: null };
										onAnswer({ assignments: { ...assignments } });
									}}
									title="إزالة"
								>
									<X size={12} strokeWidth={3} />
								</button>
							</div>
						{/each}
					</div>

					<!-- Dashed Empty Zone Indicator -->
					{#if items.filter((item) => assignments[item.text] === ci).length === 0}
						<div
							class="flex min-h-[100px] flex-1 items-center justify-center rounded-xl border-2 border-dashed border-border/60 bg-muted/20 text-sm font-semibold text-muted-foreground/50 transition-colors {selectedItem ? 'border-primary/40 bg-primary/5 text-primary/70' : ''}"
						>
							اسحب عنصراً هنا...
						</div>
					{:else if selectedItem}
						<div class="mt-2 flex h-12 w-full items-center justify-center rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 text-xs font-bold text-primary/70">
							أفلت العنصر هنا
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
