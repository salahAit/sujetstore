<script lang="ts">
	let { data = $bindable() }: any = $props();

	if (!data) data = { imageUrl: '', labels: [] };

	function addLabel() {
		data.labels = [...(data.labels || []), { text: '', correctX: 50, correctY: 50 }];
	}

	function removeLabel(i: number) {
		data.labels = data.labels.filter((_: any, idx: number) => idx !== i);
	}
</script>

<div class="space-y-4">
	<div class="space-y-2">
		<span class="text-sm font-semibold text-foreground/80">رابط الصورة/الرسم التخطيطي</span>
		<input bind:value={data.imageUrl} placeholder="https://..." dir="ltr"
			class="w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
	</div>

	<div class="space-y-2">
		<div class="flex items-center justify-between">
			<span class="text-sm font-semibold text-foreground/80">التسميات</span>
			<button onclick={addLabel} class="rounded-lg bg-blue-600 px-3 py-1 text-xs font-bold text-foreground">+ إضافة تسمية</button>
		</div>
		{#each (data.labels || []) as label, i}
			<div class="flex flex-wrap gap-2 items-center rounded-lg border border-border bg-card text-card-foreground shadow-sm p-2">
				<input bind:value={label.text} placeholder="تسمية" class="flex-1 min-w-[100px] rounded-lg border border-border bg-background p-1.5 text-xs outline-none" />
				<span class="text-xs text-muted-foreground">X%:</span>
				<input type="number" bind:value={label.correctX} min="0" max="100" class="w-16 rounded-lg border border-border bg-background p-1.5 text-xs outline-none" />
				<span class="text-xs text-muted-foreground">Y%:</span>
				<input type="number" bind:value={label.correctY} min="0" max="100" class="w-16 rounded-lg border border-border bg-background p-1.5 text-xs outline-none" />
				<button onclick={() => removeLabel(i)} class="text-red-400 hover:text-red-300 text-xs">🗑</button>
			</div>
		{/each}
	</div>
</div>
