<script lang="ts">
	import { untrack } from 'svelte';
	import MathRenderer from '../../shared/MathRenderer.svelte';

	let {
		data,
		initialAnswer = null,
		onAnswer
	}: {
		data: any;
		initialAnswer?: any;
		onAnswer: (answer: any) => void;
	} = $props();

	let selected = $state<number | null>(
		untrack(() =>
			typeof initialAnswer?.selectedIndex === 'number' ? initialAnswer.selectedIndex : null
		)
	);

	let rawSentence = $derived(String(data?.sentence || ''));
	let parts = $derived(rawSentence.split('___'));
	let isMathSentence = $derived(
		!/[\u0600-\u06FF]/.test(rawSentence.replace(/\$[^$]*\$/g, ''))
	);
	let options: string[] = $derived(data?.options || []);

	function select(index: number) {
		selected = index;
		onAnswer({ selectedIndex: index });
	}
</script>

<div class="space-y-6">
	<!-- Sentence with gap -->
	<div
		class="border-border bg-secondary/30 rounded-2xl border-2 p-5 sm:p-6 dark:border-white/10 dark:bg-white/5"
	>
		<div
			class="flex flex-wrap items-center gap-2 text-lg leading-relaxed font-semibold {isMathSentence
				? 'justify-center'
				: 'justify-start'}"
			dir={isMathSentence ? 'ltr' : 'rtl'}
		>
			{#each parts as part, i}
				{#if part.trim()}
					<span class="inline-flex items-center">
						<MathRenderer content={part.trim()} inline />
					</span>
				{/if}
				{#if i < parts.length - 1}
					<span
						class="mx-1 inline-flex min-h-9 min-w-[84px] items-center justify-center rounded-xl border-2 border-dashed px-3 py-1 text-center {selected !==
						null
							? 'border-blue-500 bg-blue-500/15 text-blue-600 dark:text-blue-300'
							: 'text-muted-foreground border-border dark:border-white/20'}"
					>
						{#if selected !== null && options[selected] !== undefined}
							<MathRenderer content={options[selected]} inline />
						{:else}
							؟
						{/if}
					</span>
				{/if}
			{/each}
		</div>
	</div>

	<!-- Options -->
	<div class="flex flex-wrap justify-center gap-3">
		{#each options as option, i}
			<button
				type="button"
				onclick={() => select(i)}
				class="rounded-xl border-2 px-5 py-2.5 font-semibold transition-all duration-200 {selected ===
				i
					? 'border-blue-500 bg-blue-500/15 text-blue-600 shadow-md dark:text-blue-300'
					: 'border-border bg-secondary hover:border-blue-500/30 hover:bg-blue-500/5 dark:border-white/10 dark:bg-white/5'}"
			>
				<MathRenderer content={option} inline />
			</button>
		{/each}
	</div>
</div>
