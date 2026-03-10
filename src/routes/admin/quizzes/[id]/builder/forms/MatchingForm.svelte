<script lang="ts">
	import { Plus, Trash2 } from 'lucide-svelte';

	let { data = $bindable() } = $props();

	if (!data.pairs) data.pairs = [];

	function addPair() {
		data.pairs = [...data.pairs, { id: crypto.randomUUID(), left: '', right: '' }];
	}

	function removePair(idx: number) {
		data.pairs = data.pairs.filter((_: any, i: number) => i !== idx);
	}
</script>

<div class="space-y-4">
	<p class="mb-4 text-sm text-white/50">
		أضف أزواج الربط. سيتم عرض القائمة اليمنى بشكل عشوائي للطالب.
	</p>

	<div class="space-y-3">
		{#each data.pairs as pair, i}
			<div class="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3">
				<div
					class="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-blue-500/10 text-sm font-bold text-blue-400"
				>
					{i + 1}
				</div>

				<!-- Left Side -->
				<input
					type="text"
					bind:value={pair.left}
					placeholder="القائمة أ (ثابتة)"
					class="w-1/2 rounded-lg border border-white/10 bg-black/20 p-2 text-sm outline-none focus:border-blue-500"
				/>

				<div class="truncate px-2 text-white/30">↔️</div>

				<!-- Right Side -->
				<input
					type="text"
					bind:value={pair.right}
					placeholder="القائمة ب (تظهر مشوشة)"
					class="w-1/2 rounded-lg border border-white/10 bg-black/20 p-2 text-sm outline-none focus:border-blue-500"
				/>

				<button
					onclick={() => removePair(i)}
					class="ml-2 rounded-lg p-2 text-white/30 transition-colors hover:bg-red-500/10 hover:text-red-400"
				>
					<Trash2 size={16} />
				</button>
			</div>
		{/each}
	</div>

	<button
		onclick={addPair}
		class="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-blue-500/30 bg-blue-500/5 px-4 py-2 text-sm font-semibold text-blue-400 transition-colors hover:bg-blue-500/10"
	>
		<Plus size={16} /> إضافة زوج جديد
	</button>
</div>
