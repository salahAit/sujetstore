<script lang="ts">
	type JsonLdSchema = Record<string, unknown> | Record<string, unknown>[];

	let { schema }: { schema: JsonLdSchema } = $props();

	const SCRIPT_OPEN = '<script type="application/ld+json">';
	const SCRIPT_CLOSE = '<' + '/script>';

	function serializeJsonLd(value: JsonLdSchema): string {
		const raw = JSON.stringify(value);
		if (!raw) return '';
		return raw
			.replace(/</g, '\\u003c')
			.replace(/>/g, '\\u003e')
			.replace(/&/g, '\\u0026')
			.replace(/\u2028/g, '\\u2028')
			.replace(/\u2029/g, '\\u2029');
	}

	let safeJson = $derived(schema ? serializeJsonLd(schema) : '');
</script>

<svelte:head>
	{#if safeJson}
		{@html `${SCRIPT_OPEN}${safeJson}${SCRIPT_CLOSE}`}
	{/if}
</svelte:head>
