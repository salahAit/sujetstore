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

	let rawSentence = $derived(String(data?.sentence || ''));
	let parts = $derived(rawSentence.split('___'));
	// Pure mathematical equations (no Arabic prose outside $...$) must flow Left-to-Right!
	let isMathSentence = $derived(
		!/[\u0600-\u06FF]/.test(rawSentence.replace(/\$[^$]*\$/g, ''))
	);
	let answer = $state<string>(untrack(() => initialAnswer?.text ?? ''));

	function handleInput() {
		onAnswer({ text: answer.trim() });
	}
</script>

<div class="space-y-6">
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
					<input
						bind:value={answer}
						oninput={handleInput}
						dir="auto"
						type="text"
						class="mx-1 inline-flex h-10 w-28 shrink-0 rounded-xl border-2 border-dashed border-blue-500/45 bg-blue-500/10 px-3 text-center text-base font-bold text-blue-600 transition-colors outline-none focus:border-blue-500 focus:bg-blue-500/20 sm:w-36 dark:text-blue-300"
						placeholder="؟"
						aria-label="أكمل الفراغ"
					/>
				{/if}
			{/each}
		</div>
	</div>
</div>
