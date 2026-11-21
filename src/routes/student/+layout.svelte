<script lang="ts">
	import { page } from '$app/state';
	import {
		LayoutDashboard,
		BookMarked,
		Sparkles,
		CreditCard,
		Calculator,
		LogOut,
		Flame,
		Zap,
		Crown,
		ShieldCheck
	} from 'lucide-svelte';

	let { data, children } = $props();
	let path = $derived(page.url.pathname);

	let enabledSet = $derived(new Set<string>(data?.enabledModules || []));
	function isModOn(modId?: string): boolean {
		if (!modId || enabledSet.size === 0) return true;
		return enabledSet.has(modId);
	}

	const navItems = $derived(
		[
			{ href: '/student', label: 'لوحتي', icon: LayoutDashboard, exact: true },
			{
				href: '/student/mistakes',
				label: 'دفتر الأخطاء',
				icon: BookMarked,
				badge: data.unresolvedMistakesCount,
				mod: 'remediation'
			},
			{ href: '/student/generator', label: 'المولّد الذكي', icon: Sparkles, mod: 'smart-generator' },
			{ href: '/student/activate', label: 'الاشتراك والقسائم', icon: CreditCard },
			{ href: '/simulator', label: 'حاسبة المعدل', icon: Calculator, mod: 'simulator' }
		].filter((item) => isModOn((item as any).mod))
	);
</script>

<div class="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
	<!-- Student Header Summary -->
	<div
		class="bg-card mb-6 flex flex-col justify-between gap-4 rounded-2xl border p-5 shadow-sm sm:flex-row sm:items-center"
	>
		<div class="flex items-center gap-4">
			<div
				class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-extrabold text-white shadow-md"
			>
				{data.studentUser.name.slice(0, 1)}
			</div>
			<div>
				<div class="flex flex-wrap items-center gap-2">
					<h1 class="text-lg font-extrabold">{data.studentUser.name}</h1>
					{#if data.isPremium}
						<span
							class="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-bold text-amber-500"
						>
							<Crown size={12} /> Pro مشترك
						</span>
					{:else}
						<span
							class="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-xs font-semibold"
						>
							حساب مجاني
						</span>
					{/if}
					{#if ['superadmin', 'admin', 'editor'].includes(data.studentUser.role)}
						<a
							href="/admin"
							class="inline-flex items-center gap-1 rounded-full bg-purple-500/15 px-2.5 py-0.5 text-xs font-bold text-purple-500 hover:bg-purple-500/25"
						>
							<ShieldCheck size={12} /> لوحة الإدارة
						</a>
					{/if}
				</div>
				<p class="text-muted-foreground mt-0.5 text-xs" dir="ltr">{data.studentUser.email}</p>
			</div>
		</div>

		<div class="flex flex-wrap items-center gap-3">
			<div class="flex items-center gap-1.5 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-500">
				<Zap size={14} /> {data.totalXp} XP
			</div>
			<div class="flex items-center gap-1.5 rounded-xl border border-orange-500/20 bg-orange-500/10 px-3 py-1.5 text-xs font-bold text-orange-500">
				<Flame size={14} /> {data.studentUser.streakDays} يوم متتالي
			</div>
			<form method="POST" action="/auth/logout">
				<button
					type="submit"
					class="text-muted-foreground hover:text-destructive flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-colors hover:bg-red-500/10"
				>
					<LogOut size={14} /> خروج
				</button>
			</form>
		</div>
	</div>

	<!-- Student Navigation Tabs -->
	<div class="mb-6 flex flex-wrap gap-2">
		{#each navItems as item}
			{@const active = item.exact ? path === item.href : path.startsWith(item.href)}
			<a
				href={item.href}
				class="flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition-all {active
					? 'bg-primary text-primary-foreground border-primary shadow-md'
					: 'bg-card text-muted-foreground hover:text-foreground hover:bg-accent'}"
			>
				<item.icon size={16} />
				<span>{item.label}</span>
				{#if item.badge && item.badge > 0}
					<span class="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-extrabold text-white">
						{item.badge}
					</span>
				{/if}
			</a>
		{/each}
	</div>

	{@render children()}
</div>
