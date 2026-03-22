<script lang="ts">
	let {
		value = $bindable(),
		inputRef,
		onchange,
		isTextMode = false
	}: {
		value: string;
		inputRef?: HTMLInputElement | HTMLTextAreaElement | null;
		onchange?: () => void;
		isTextMode?: boolean;
	} = $props();

	const commonSymbols = [
		{ label: 'كسر', template: 'frac(a, b)' },
		{ label: 'جذر', template: 'sqrt(x)' },
		{ label: 'قوة', template: 'x^y' },
		{ label: 'زاوية', template: 'angle A B C' },
		{ label: 'توازي', template: 'parallel' },
		{ label: 'تعامد', template: 'perp' },
		{ label: '×', template: 'times' },
		{ label: '÷', template: 'div' },
		{ label: 'درجة °', template: 'deg' },
		{ label: 'مثلث', template: 'Delta' }
	];

	function insertSymbol(template: string) {
		const finalText = isTextMode ? `$${template}$` : template;

		if (inputRef) {
			const start = inputRef.selectionStart || 0;
			const end = inputRef.selectionEnd || 0;
			value = value.substring(0, start) + finalText + value.substring(end);
			onchange?.();
			
			// Focus and cursor placement
			setTimeout(() => {
				inputRef.focus();
				const newPos = start + finalText.length;
				inputRef.setSelectionRange(newPos, newPos);
			}, 0);
		} else {
			value += finalText;
			onchange?.();
		}
	}
</script>

<div class="flex flex-wrap gap-1.5 border-t border-dashed border-border/50 pt-2 mt-2">
	<span class="text-[10px] text-muted-foreground mr-1 self-center">رموز رياضية:</span>
	{#each commonSymbols as sym}
		<button
			type="button"
			class="rounded border border-border bg-muted/30 px-2 py-0.5 text-[11px] font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
			onclick={() => insertSymbol(sym.template)}
			title={sym.template}
		>
			{sym.label}
		</button>
	{/each}
</div>
