<script lang="ts">
	import { Loader2, AlertCircle } from 'lucide-svelte';

	let {
		pdfBase64 = $bindable(),
		loading = false,
		error = ''
	}: {
		pdfBase64: string;
		loading?: boolean;
		error?: string;
	} = $props();

	let pdfUrl = $derived(
		pdfBase64 ? `data:application/pdf;base64,${pdfBase64}` : ''
	);
</script>

<div class="flex h-full flex-col">
	{#if loading}
		<div class="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
			<Loader2 size={32} class="animate-spin text-primary" />
			<p class="text-sm">جاري توليد الموضوع...</p>
		</div>
	{:else if error}
		<div class="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
			<AlertCircle size={32} class="text-red-500" />
			<p class="text-sm font-medium text-red-500">خطأ في التوليد</p>
			<p class="max-w-sm text-xs text-muted-foreground">{error}</p>
		</div>
	{:else if pdfUrl}
		<iframe
			src={pdfUrl}
			class="h-full w-full flex-1 rounded-xl border-0"
			title="معاينة الموضوع"
		></iframe>
	{:else}
		<div class="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
			<div class="text-6xl opacity-30">📄</div>
			<p class="text-sm">اضغط "توليد الموضوع" لمعاينة النتيجة</p>
		</div>
	{/if}
</div>
