<script lang="ts">
	import { toggleMode } from 'mode-watcher';
	import {
		Sun,
		Moon,
		Brain,
		Calculator,
		Trophy,
		Bookmark,
		BarChart3,
		User,
		LogIn,
		Shield,
		Menu,
		X,
		Info
	} from 'lucide-svelte';
	import { page } from '$app/state';
	import DynamicIcon from '#lib/components/DynamicIcon.svelte';
	import SearchBar from '#lib/components/SearchBar.svelte';
	import NotificationBell from '#lib/components/NotificationBell.svelte';
	import PWAInstallButton from '#lib/components/PWAInstallButton.svelte';
	import LanguageSwitcher from '#lib/components/LanguageSwitcher.svelte';
	import { i18n } from '#lib/i18n/i18n.svelte';

	interface NavUser {
		id?: string | number;
		name: string;
		email?: string;
		role?: string;
		[key: string]: any;
	}

	interface Props {
		levels?: any[];
		user?: NavUser | null;
		isStaff?: boolean;
		isStaticBuild?: boolean;
		dynamicBase?: string;
	}

	let {
		levels = [],
		user = null,
		isStaff = false,
		isStaticBuild = false,
		dynamicBase = ''
	}: Props = $props();

	let isMobileMenuOpen = $state(false);
	let pathname = $derived(page.url.pathname);
	let accountHref = $derived(
		user ? `${dynamicBase}${isStaff ? '/admin' : '/student'}` : `${dynamicBase}/auth/login`
	);

	function closeMenu() {
		isMobileMenuOpen = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (isMobileMenuOpen && e.key === 'Escape') {
			isMobileMenuOpen = false;
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<nav
	class="bg-background/85 sticky top-0 z-50 border-b border-black/5 backdrop-blur-xl dark:border-white/10"
>
	<div class="mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8">
		<div class="flex h-14 items-center justify-between gap-1.5 lg:h-16 lg:gap-3">
			<!-- Brand -->
			<div class="flex min-w-0 shrink-0 items-center gap-2">
				<a
					href="/"
					class="flex min-h-11 items-center gap-2 text-lg font-extrabold tracking-tight sm:gap-2.5 sm:text-xl"
					dir="ltr"
					onclick={closeMenu}
				>
					<img src="/logo.webp" alt="SujetStore" class="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
					<span class="gradient-text text-[17px] sm:text-xl lg:text-2xl">SujetStore</span>
				</a>
				<div class="hidden xl:block">
					<PWAInstallButton />
				</div>
			</div>

			<!-- Desktop Primary Navigation (Compact single-word items, zero wrap) -->
			<div class="hidden min-w-0 items-center gap-1 lg:flex xl:gap-1.5">
				{#each levels as lvl (lvl.slug || lvl.id)}
					{@const active = pathname.startsWith('/' + lvl.slug)}
					<a
						href="/{lvl.slug}"
						class="inline-flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-bold whitespace-nowrap transition-colors {active
							? 'bg-primary/12 text-primary'
							: 'text-muted-foreground hover:text-primary hover:bg-black/5 dark:hover:bg-white/5'}"
					>
						<DynamicIcon name={lvl.icon} size={16} class="shrink-0" />
						<span>{i18n.shortLevelName(lvl)}</span>
						{#if lvl.visibility === 'coming_soon'}
							<span
								class="rounded-md bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400"
							>
								{i18n.t('nav.comingSoon')}
							</span>
						{/if}
					</a>
				{/each}

				<a
					href="/quizzes"
					class="inline-flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-bold whitespace-nowrap transition-colors {pathname.startsWith(
						'/quizzes'
					)
						? 'bg-fuchsia-500/12 text-fuchsia-600 dark:text-fuchsia-400'
						: 'text-muted-foreground hover:bg-fuchsia-500/10 hover:text-fuchsia-600 dark:hover:text-fuchsia-400'}"
				>
					<Brain size={16} class="shrink-0" />
					<span>{i18n.t('nav.quizzes')}</span>
				</a>

				<a
					href="/simulator"
					class="inline-flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-bold whitespace-nowrap transition-colors {pathname.startsWith(
						'/simulator'
					)
						? 'bg-emerald-500/12 text-emerald-600 dark:text-emerald-400'
						: 'text-muted-foreground hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400'}"
				>
					<Calculator size={16} class="shrink-0" />
					<span>{i18n.t('nav.simulator')}</span>
				</a>

				<a
					href="/achievements"
					class="hidden items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-bold whitespace-nowrap transition-colors xl:inline-flex {pathname.startsWith(
						'/achievements'
					)
						? 'bg-amber-500/12 text-amber-600 dark:text-amber-400'
						: 'text-muted-foreground hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400'}"
				>
					<Trophy size={16} class="shrink-0" />
					<span>{i18n.t('nav.achievements')}</span>
				</a>
			</div>

			<!-- Desktop Right Utility Cluster -->
			<div class="hidden shrink-0 items-center gap-1.5 lg:flex">
				<SearchBar staticMode={isStaticBuild} />
				<LanguageSwitcher />
				<NotificationBell staticMode={isStaticBuild} />

				<button
					type="button"
					onclick={toggleMode}
					class="text-muted-foreground hover:text-foreground inline-flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-black/5 dark:hover:bg-white/5"
					title={i18n.t('nav.toggleTheme')}
					aria-label={i18n.t('nav.toggleTheme')}
				>
					<span class="block dark:hidden"><Moon size={18} /></span>
					<span class="hidden dark:block"><Sun size={18} /></span>
				</button>

				{#if user}
					<a
						href={accountHref}
						class="bg-primary/12 text-primary border-primary/20 hover:bg-primary/20 inline-flex h-9 items-center gap-1.5 rounded-xl border px-3 text-xs font-bold whitespace-nowrap transition"
					>
						{#if isStaff}
							<Shield size={15} class="shrink-0" />
						{:else}
							<User size={15} class="shrink-0" />
						{/if}
						<span class="max-w-[84px] truncate">{user.name}</span>
					</a>
				{:else}
					<a
						href={accountHref}
						class="bg-primary inline-flex h-9 items-center gap-1.5 rounded-xl px-3.5 text-xs font-bold whitespace-nowrap text-white shadow-sm transition hover:opacity-90"
					>
						<LogIn size={15} class="shrink-0" />
						<span>{i18n.t('nav.loginShort')}</span>
					</a>
				{/if}
			</div>

			<!-- Mobile Compact Actions (fits 360px cleanly with >=44px touch targets) -->
			<div class="flex shrink-0 items-center gap-0.5 lg:hidden">
				<SearchBar staticMode={isStaticBuild} />
				<LanguageSwitcher />
				<NotificationBell staticMode={isStaticBuild} />

				<button
					type="button"
					onclick={toggleMode}
					class="text-muted-foreground hover:text-foreground inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl transition-colors hover:bg-black/5 dark:hover:bg-white/5"
					title={i18n.t('nav.toggleTheme')}
					aria-label={i18n.t('nav.toggleTheme')}
				>
					<span class="block dark:hidden"><Moon size={19} /></span>
					<span class="hidden dark:block"><Sun size={19} /></span>
				</button>

				<button
					type="button"
					onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
					class="text-muted-foreground hover:text-foreground inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl transition-colors hover:bg-black/5 dark:hover:bg-white/5 {isMobileMenuOpen
						? 'text-foreground bg-black/6 dark:bg-white/10'
						: ''}"
					title={isMobileMenuOpen ? i18n.t('nav.closeMenu') : i18n.t('nav.menu')}
					aria-label={isMobileMenuOpen ? i18n.t('nav.closeMenu') : i18n.t('nav.menu')}
					aria-expanded={isMobileMenuOpen}
				>
					{#if isMobileMenuOpen}
						<X size={21} />
					{:else}
						<Menu size={21} />
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Slide-Down Drawer for Secondary Links -->
	{#if isMobileMenuOpen}
		<button
			type="button"
			aria-label={i18n.t('nav.closeMenu')}
			class="fixed inset-x-0 top-14 bottom-0 z-40 cursor-default bg-black/45 backdrop-blur-[2px] lg:hidden"
			onclick={closeMenu}
		></button>

		<div
			class="bg-background/98 animate-in slide-in-from-top-3 fade-in relative z-50 max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-t border-black/5 px-3 py-4 shadow-2xl duration-200 lg:hidden dark:border-white/10"
		>
			<div class="mx-auto max-w-lg space-y-4">
				<!-- Language Selector -->
				<LanguageSwitcher variant="segmented" />

				<!-- Education Levels -->
				{#if levels.length > 0}
					<div class="space-y-1.5">
						<p class="text-muted-foreground px-2 text-[11px] font-bold tracking-wider uppercase">
							{i18n.t('nav.levels')}
						</p>
						<div class="grid grid-cols-1 gap-1.5">
							{#each levels as lvl (lvl.slug || lvl.id)}
								{@const active = pathname.startsWith('/' + lvl.slug)}
								<a
									href="/{lvl.slug}"
									onclick={closeMenu}
									class="flex min-h-12 items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-bold transition-colors {active
										? 'bg-primary/12 text-primary'
										: 'text-foreground hover:bg-black/5 dark:hover:bg-white/5'}"
								>
									<span class="flex items-center gap-3">
										<DynamicIcon name={lvl.icon} size={19} />
										<span>{i18n.pick(lvl, 'name')}</span>
									</span>
									{#if lvl.visibility === 'coming_soon'}
										<span
											class="rounded-md bg-amber-500/15 px-2 py-0.5 text-[11px] font-bold text-amber-600 dark:text-amber-400"
										>
											{i18n.t('nav.comingSoon')}
										</span>
									{/if}
								</a>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Secondary Links -->
				<div class="space-y-1.5">
					<p class="text-muted-foreground px-2 text-[11px] font-bold tracking-wider uppercase">
						{i18n.t('nav.moreLinks')}
					</p>
					<div class="grid grid-cols-2 gap-1.5">
						<a
							href="/achievements"
							onclick={closeMenu}
							class="flex min-h-12 items-center gap-2.5 rounded-xl border border-black/5 bg-black/3 px-3 text-sm font-semibold transition-colors dark:border-white/8 dark:bg-white/4 {pathname.startsWith(
								'/achievements'
							)
								? 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400'
								: 'text-foreground hover:bg-black/6 dark:hover:bg-white/8'}"
						>
							<Trophy size={18} class="shrink-0 text-amber-500" />
							<span class="truncate">{i18n.t('nav.achievements')}</span>
						</a>

						<a
							href="/bookmarks"
							onclick={closeMenu}
							class="flex min-h-12 items-center gap-2.5 rounded-xl border border-black/5 bg-black/3 px-3 text-sm font-semibold transition-colors dark:border-white/8 dark:bg-white/4 {pathname.startsWith(
								'/bookmarks'
							)
								? 'border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400'
								: 'text-foreground hover:bg-black/6 dark:hover:bg-white/8'}"
						>
							<Bookmark size={18} class="shrink-0 text-blue-500" />
							<span class="truncate">{i18n.t('nav.bookmarks')}</span>
						</a>

						<a
							href="/progress"
							onclick={closeMenu}
							class="flex min-h-12 items-center gap-2.5 rounded-xl border border-black/5 bg-black/3 px-3 text-sm font-semibold transition-colors dark:border-white/8 dark:bg-white/4 {pathname.startsWith(
								'/progress'
							)
								? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
								: 'text-foreground hover:bg-black/6 dark:hover:bg-white/8'}"
						>
							<BarChart3 size={18} class="shrink-0 text-emerald-500" />
							<span class="truncate">{i18n.t('nav.progress')}</span>
						</a>

						<a
							href="/about"
							onclick={closeMenu}
							class="flex min-h-12 items-center gap-2.5 rounded-xl border border-black/5 bg-black/3 px-3 text-sm font-semibold transition-colors dark:border-white/8 dark:bg-white/4 {pathname.startsWith(
								'/about'
							)
								? 'border-primary/30 bg-primary/10 text-primary'
								: 'text-foreground hover:bg-black/6 dark:hover:bg-white/8'}"
						>
							<Info size={18} class="text-muted-foreground shrink-0" />
							<span class="truncate">{i18n.t('nav.about')}</span>
						</a>
					</div>
				</div>

				<!-- Install & Account CTA -->
				<div class="flex flex-col gap-2 border-t border-black/5 pt-3 dark:border-white/10">
					<div class="flex justify-center">
						<PWAInstallButton />
					</div>

					<a
						href={accountHref}
						onclick={closeMenu}
						class="bg-primary flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold text-white shadow-sm transition hover:opacity-95"
					>
						{#if user}
							{#if isStaff}
								<Shield size={18} />
								<span>{i18n.t('nav.adminPanel')}</span>
							{:else}
								<User size={18} />
								<span>{i18n.t('nav.studentSpace')} ({user.name})</span>
							{/if}
						{:else}
							<LogIn size={18} />
							<span>{i18n.t('nav.loginOrRegister')}</span>
						{/if}
					</a>
				</div>
			</div>
		</div>
	{/if}
</nav>
