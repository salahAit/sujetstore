<script lang="ts">
	import { Copy, Check, Facebook, Send, MessageCircle, Share2 } from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	let {
		isOpen = $bindable(false),
		url = '',
		title = 'شارك هذا التمرين'
	} = $props<{
		isOpen: boolean;
		url: string;
		title?: string;
	}>();

	let copied = $state(false);

	const shareOptions = $derived([
		{
			name: 'واتساب',
			icon: MessageCircle,
			color: 'bg-[#25D366] text-white hover:bg-[#25D366]/90',
			link: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + '\n\n' + url)}`
		},
		{
			name: 'فيسبوك',
			icon: Facebook,
			color: 'bg-[#1877F2] text-white hover:bg-[#1877F2]/90',
			link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
		},
		{
			name: 'تليجرام',
			icon: Send,
			color: 'bg-[#0088cc] text-white hover:bg-[#0088cc]/90',
			link: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
		},
		{
			name: 'إكس (تويتر)',
			icon: Share2,
			color:
				'bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90',
			link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
		}
	]);

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(url);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	}
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Content class="w-[95vw] rounded-3xl sm:max-w-md" dir="rtl">
		<Dialog.Header>
			<div
				class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400"
			>
				<Share2 size={32} />
			</div>
			<Dialog.Title class="text-center text-xl font-extrabold">{title}</Dialog.Title>
			<Dialog.Description class="mt-1 text-center">
				اختر المنصة التي تود المشاركة عبرها
			</Dialog.Description>
		</Dialog.Header>

		<!-- Share Grid -->
		<div class="mt-6 grid grid-cols-4 gap-4">
			{#each shareOptions as option}
				<a
					href={option.link}
					target="_blank"
					rel="noopener noreferrer"
					class="flex flex-col items-center gap-2 transition-transform hover:scale-110 active:scale-95"
				>
					<div
						class="flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg transition-colors {option.color}"
					>
						<option.icon size={22} />
					</div>
					<span class="text-foreground text-xs font-medium">{option.name}</span>
				</a>
			{/each}
		</div>

		<!-- Link Copy Section -->
		<div class="mt-6 border-t pt-6 text-right">
			<label
				for="share-url"
				class="text-muted-foreground mb-2 block text-xs font-bold tracking-wider uppercase"
			>
				أو انسخ الرابط المباشر
			</label>
			<div class="flex items-center gap-2">
				<div
					class="bg-secondary flex-1 overflow-hidden rounded-lg border px-3 py-2 text-left"
					dir="ltr"
				>
					<p id="share-url" class="text-foreground truncate text-sm font-medium opacity-80">
						{url}
					</p>
				</div>
				<Button
					size="sm"
					variant={copied ? 'default' : 'secondary'}
					class="h-10 min-w-[5rem] gap-2 rounded-lg {copied
						? 'bg-emerald-500 text-white hover:bg-emerald-600'
						: ''}"
					onclick={copyToClipboard}
				>
					{#if copied}
						<Check size={16} />
						تم!
					{:else}
						<Copy size={16} />
						نسخ
					{/if}
				</Button>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
