<script lang="ts">
	import { Marked } from 'marked';
	import markedKatex from 'marked-katex-extension';
	import 'katex/contrib/mhchem';
	import 'katex/dist/katex.min.css';

	const mathMarked = new Marked(
		markedKatex({
			throwOnError: false,
			output: 'html', // Best for SSR
			nonStandard: true,
			strict: 'ignore'
		})
	);

	let { content = '', inline = false }: { content?: string | null; inline?: boolean } = $props();

	// Render the markdown + math synchronously during SSR
	// It's safe since it's just pure string manipulation
	let renderedHtml = $derived(
		inline
			? (mathMarked.parseInline(String(content ?? '')) as string)
			: (mathMarked.parse(String(content ?? '')) as string)
	);
</script>

{#if inline}
	<span class="math-inline">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html renderedHtml}
	</span>
{:else}
	<div class="prose prose-sm md:prose-base prose-blue max-w-none dark:prose-invert">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html renderedHtml}
	</div>
{/if}

<style>
	/* Make sure the math flows naturally inline and stays LTR-isolated in RTL prose */
	:global(.katex-display) {
		margin: 1em 0;
		overflow-x: auto;
		overflow-y: hidden;
		direction: ltr;
		unicode-bidi: isolate;
	}
	:global(.katex) {
		font-size: 1.1em;
		direction: ltr;
		unicode-bidi: isolate;
		display: inline-block;
	}
</style>
