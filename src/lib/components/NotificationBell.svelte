<script lang="ts">
	import { Bell, X } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let notifications = $state<any[]>([]);
	let open = $state(false);
	let readIds = $state<Set<number>>(new Set());
	let unreadCount = $derived(notifications.filter((n) => !readIds.has(n.id)).length);

	onMount(() => {
		// Load read state from localStorage
		const stored = localStorage.getItem('read_notifications');
		if (stored) {
			readIds = new Set(JSON.parse(stored));
		}

		fetchNotifications();
	});

	async function fetchNotifications() {
		try {
			const res = await fetch('/api/notifications');
			const data = await res.json();
			notifications = data.notifications || [];
		} catch (e) {}
	}

	function toggle() {
		open = !open;
		if (open) {
			// Mark all as read
			notifications.forEach((n) => readIds.add(n.id));
			readIds = new Set(readIds);
			localStorage.setItem('read_notifications', JSON.stringify([...readIds]));
		}
	}

	function close() {
		open = false;
	}

	function formatDate(dateStr: string): string {
		const d = new Date(dateStr);
		return d.toLocaleDateString('ar-DZ', { month: 'short', day: 'numeric' });
	}
</script>

<div class="relative">
	<button
		onclick={toggle}
		class="text-muted-foreground relative rounded-lg p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
		title="الإشعارات"
	>
		<Bell size={20} />
		{#if unreadCount > 0}
			<span
				class="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white"
			>
				{unreadCount > 9 ? '9+' : unreadCount}
			</span>
		{/if}
	</button>

	{#if open}
		<!-- Backdrop -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="fixed inset-0 z-40" onclick={close}></div>

		<!-- Dropdown -->
		<div
			class="bg-popover absolute top-12 left-0 z-50 w-80 overflow-hidden rounded-xl border shadow-2xl sm:right-0 sm:left-auto"
		>
			<div class="flex items-center justify-between border-b px-4 py-3">
				<h3 class="text-sm font-bold">الإشعارات</h3>
				<button onclick={close} class="text-muted-foreground hover:text-foreground"
					><X size={16} /></button
				>
			</div>

			<div class="max-h-80 overflow-y-auto">
				{#if notifications.length === 0}
					<p class="text-muted-foreground px-4 py-8 text-center text-sm">لا توجد إشعارات</p>
				{:else}
					{#each notifications as notif}
						<div
							class="border-b px-4 py-3 transition-colors last:border-0 hover:bg-black/5 dark:hover:bg-white/5"
						>
							<div class="flex items-start justify-between gap-2">
								<p class="text-sm font-semibold">{notif.title}</p>
								<span class="text-muted-foreground shrink-0 text-[10px]"
									>{formatDate(notif.createdAt)}</span
								>
							</div>
							{#if notif.body}
								<p class="text-muted-foreground mt-1 text-xs leading-relaxed">{notif.body}</p>
							{/if}
						</div>
					{/each}
				{/if}
			</div>
		</div>
	{/if}
</div>
