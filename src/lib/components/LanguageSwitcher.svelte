<script lang="ts">
	import { Globe, Check, ChevronDown } from 'lucide-svelte';
	import { invalidateAll } from '$app/navigation';
	import { i18n, type Locale } from '#lib/i18n/i18n.svelte';

	interface Props {
		variant?: 'dropdown' | 'segmented';
		class?: string;
	}

	let { variant = 'dropdown', class: className = '' }: Props = $props();

	let open = $state(false);

	const options: { code: Locale; short: string; label: string }[] = [
		{ code: 'ar', short: 'AR', label: 'العربية' },
		{ code: 'fr', short: 'FR', label: 'Français' },
		{ code: 'en', short: 'EN', label: 'English' }
	];

	let current = $derived(options.find((o) => o.code === i18n.locale) ?? options[0]);

	function selectLocale(code: Locale) {
		i18n.setLocale(code);
		open = false;
		invalidateAll().catch(() => {});
	}

	function handleKeydown(e: KeyboardEvent) {
		if (open && e.key === 'Escape') {
			open = false;
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if variant === 'segmented'}
	<div
		class="grid grid-cols-3 gap-1 rounded-xl border border-black/10 bg-black/5 p-1 dark:border-white/10 dark:bg-white/5 {className}"
		role="group"
		aria-label={i18n.t('nav.language')}
	>
		{#each options as opt}
			{@const active = i18n.locale === opt.code}
			<button
				type="button"
				onclick={() => selectLocale(opt.code)}
				class="flex min-h-11 items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-bold transition-all {active
					? 'bg-primary text-white shadow-sm'
					: 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'}"
				aria-pressed={active}
			>
				<span>{opt.label}</span>
			</button>
		{/each}
	</div>
{:else}
	<div class="relative {className}">
		<button
			type="button"
			onclick={() => (open = !open)}
			class="text-muted-foreground hover:text-foreground inline-flex min-h-11 min-w-11 items-center justify-center gap-1 rounded-xl border border-black/8 bg-black/4 px-2 text-xs font-extrabold tracking-wide transition-colors hover:bg-black/8 lg:min-h-9 lg:min-w-0 lg:px-2.5 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
			aria-label={i18n.t('nav.language')}
			aria-expanded={open}
			aria-haspopup="menu"
			title={i18n.t('nav.language')}
		>
			<Globe size={15} class="shrink-0 opacity-80" />
			<span>{current.short}</span>
			<ChevronDown
				size={13}
				class="hidden shrink-0 opacity-70 transition-transform duration-150 sm:block {open
					? 'rotate-180'
					: ''}"
			/>
		</button>

		{#if open}
			<button
				type="button"
				aria-label={i18n.t('common.close')}
				class="fixed inset-0 z-40 cursor-default bg-transparent"
				onclick={() => (open = false)}
			></button>

			<div
				role="menu"
				class="bg-card absolute end-0 top-[calc(100%+0.375rem)] z-50 w-40 overflow-hidden rounded-2xl border border-black/10 p-1 shadow-xl dark:border-white/15"
			>
				{#each options as opt}
					{@const active = i18n.locale === opt.code}
					<button
						type="button"
						role="menuitemradio"
						aria-checked={active}
						onclick={() => selectLocale(opt.code)}
						class="flex min-h-11 w-full items-center justify-between gap-2 rounded-xl px-3 text-sm font-semibold transition-colors {active
							? 'bg-primary/12 text-primary'
							: 'text-foreground hover:bg-black/5 dark:hover:bg-white/5'}"
					>
						<span class="flex items-center gap-2">
							<span
								class="inline-flex w-6 justify-center rounded-md bg-black/5 py-0.5 font-mono text-[10px] font-extrabold dark:bg-white/10"
							>
								{opt.short}
							</span>
							<span>{opt.label}</span>
						</span>
						{#if active}
							<Check size={15} class="text-primary shrink-0" />
						{/if}
					</button>
				{/each}
			</div>
		{/if}
	</div>
{/if}
