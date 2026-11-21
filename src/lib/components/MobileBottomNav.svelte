<script lang="ts">
	import {
		Home,
		Layers,
		Brain,
		Calculator,
		User,
		LogIn,
		Shield,
		X,
		ChevronLeft,
		ChevronRight,
		Bookmark,
		Trophy,
		BarChart3
	} from 'lucide-svelte';
	import { page } from '$app/state';
	import DynamicIcon from '#lib/components/DynamicIcon.svelte';
	import { i18n } from '#lib/i18n/i18n.svelte';

	interface NavUser {
		id?: string | number;
		name?: string;
		role?: string;
		[key: string]: any;
	}

	interface Props {
		levels?: any[];
		user?: NavUser | null;
		isStaff?: boolean;
		dynamicBase?: string;
	}

	let {
		levels = [],
		user = null,
		isStaff = false,
		dynamicBase = ''
	}: Props = $props();

	let levelsSheetOpen = $state(false);
	let pathname = $derived(page.url.pathname);

	let isHomeActive = $derived(pathname === '/');
	let isLevelsActive = $derived(
		levelsSheetOpen ||
			levels.some((lvl) => lvl?.slug && pathname.startsWith('/' + lvl.slug))
	);
	let isQuizzesActive = $derived(pathname.startsWith('/quizzes'));
	let isSimulatorActive = $derived(pathname.startsWith('/simulator'));
	let isAccountActive = $derived(
		pathname.startsWith('/student') ||
			pathname.startsWith('/admin') ||
			pathname.startsWith('/auth')
	);

	let accountHref = $derived(
		user ? `${dynamicBase}${isStaff ? '/admin' : '/student'}` : `${dynamicBase}/auth/login`
	);

	const fallbackLevels = [
		{ id: 'primaire', slug: 'primaire', icon: 'Backpack', name_ar: 'التعليم الابتدائي', name_fr: 'Cycle Primaire', name: 'Primary School' },
		{ id: 'moyen', slug: 'moyen', icon: 'BookOpen', name_ar: 'التعليم المتوسط', name_fr: 'Cycle Moyen', name: 'Middle School' },
		{ id: 'secondaire', slug: 'secondaire', icon: 'GraduationCap', name_ar: 'التعليم الثانوي', name_fr: 'Cycle Secondaire', name: 'Secondary School' }
	];

	let displayLevels = $derived(levels.length > 0 ? levels : fallbackLevels);

	function levelAccentClass(lvl: any): string {
		const slug = String(lvl?.slug || lvl?.id || '').toLowerCase();
		if (slug.includes('primaire') || slug.includes('primary')) {
			return 'border-emerald-500/25 bg-emerald-500/8 text-emerald-700 dark:text-emerald-300';
		}
		if (slug.includes('secondaire') || slug.includes('secondary')) {
			return 'border-violet-500/25 bg-violet-500/8 text-violet-700 dark:text-violet-300';
		}
		return 'border-blue-500/25 bg-blue-500/8 text-blue-700 dark:text-blue-300';
	}

	function closeSheet() {
		levelsSheetOpen = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (levelsSheetOpen && e.key === 'Escape') {
			levelsSheetOpen = false;
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Spacer so fixed mobile tab bar never overlaps footer content -->
<div class="h-[calc(4rem+env(safe-area-inset-bottom))] lg:hidden" aria-hidden="true"></div>

<!-- Quick 3-Level Bottom Sheet / Drawer -->
{#if levelsSheetOpen}
	<button
		type="button"
		aria-label={i18n.t('common.close')}
		class="fixed inset-0 z-50 cursor-default bg-black/55 backdrop-blur-xs lg:hidden"
		onclick={closeSheet}
	></button>

	<div
		role="dialog"
		aria-modal="true"
		aria-label={i18n.t('nav.chooseLevel')}
		class="bg-card animate-in slide-in-from-bottom-6 fade-in fixed inset-x-0 bottom-0 z-50 rounded-t-3xl border-t border-black/10 px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] shadow-2xl duration-200 lg:hidden dark:border-white/15"
	>
		<!-- Sheet Grab Handle -->
		<div class="mx-auto mb-3 h-1.5 w-10 rounded-full bg-black/15 dark:bg-white/20"></div>

		<div class="mb-3 flex items-center justify-between">
			<h2 class="text-foreground text-base font-extrabold">{i18n.t('nav.chooseLevel')}</h2>
			<button
				type="button"
				onclick={closeSheet}
				aria-label={i18n.t('common.close')}
				class="text-muted-foreground hover:text-foreground inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl transition-colors hover:bg-black/5 dark:hover:bg-white/5"
			>
				<X size={20} />
			</button>
		</div>

		<div class="space-y-2.5">
			{#each displayLevels as lvl (lvl.slug || lvl.id)}
				{@const active = pathname.startsWith('/' + lvl.slug)}
				<a
					href="/{lvl.slug}"
					onclick={closeSheet}
					class="flex min-h-15 items-center justify-between gap-3 rounded-2xl border px-4 py-3 transition-transform active:scale-[0.99] {levelAccentClass(
						lvl
					)} {active ? 'ring-primary/50 ring-2' : ''}"
				>
					<div class="flex min-w-0 items-center gap-3">
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/70 shadow-xs dark:bg-black/25"
						>
							<DynamicIcon name={lvl.icon} size={21} />
						</div>
						<div class="min-w-0">
							<div class="truncate text-sm font-extrabold">
								{i18n.pick(lvl, 'name')}
							</div>
							<div class="text-xs opacity-75">
								{i18n.shortLevelName(lvl)}
							</div>
						</div>
					</div>

					<div class="flex shrink-0 items-center gap-1.5">
						{#if lvl.visibility === 'coming_soon'}
							<span
								class="rounded-md bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300"
							>
								{i18n.t('nav.comingSoon')}
							</span>
						{/if}
						{#if i18n.isRtl}
							<ChevronLeft size={18} class="opacity-70" />
						{:else}
							<ChevronRight size={18} class="opacity-70" />
						{/if}
					</div>
				</a>
			{/each}
		</div>

		<!-- Quick Thumb Shortcuts -->
		<div class="mt-4 grid grid-cols-3 gap-2 border-t border-black/5 pt-3 dark:border-white/10">
			<a
				href="/bookmarks"
				onclick={closeSheet}
				class="text-muted-foreground hover:text-foreground flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-black/4 px-2 text-xs font-bold transition-colors dark:bg-white/5"
			>
				<Bookmark size={15} class="text-blue-500" />
				<span class="truncate">{i18n.t('nav.bookmarks')}</span>
			</a>
			<a
				href="/achievements"
				onclick={closeSheet}
				class="text-muted-foreground hover:text-foreground flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-black/4 px-2 text-xs font-bold transition-colors dark:bg-white/5"
			>
				<Trophy size={15} class="text-amber-500" />
				<span class="truncate">{i18n.t('nav.achievements')}</span>
			</a>
			<a
				href="/progress"
				onclick={closeSheet}
				class="text-muted-foreground hover:text-foreground flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-black/4 px-2 text-xs font-bold transition-colors dark:bg-white/5"
			>
				<BarChart3 size={15} class="text-emerald-500" />
				<span class="truncate">{i18n.t('nav.progress')}</span>
			</a>
		</div>
	</div>
{/if}

<!-- Fixed 5-Tab Mobile Bottom Navigation Bar -->
<nav
	aria-label={i18n.t('nav.menu')}
	class="bg-background/92 fixed inset-x-0 bottom-0 z-40 border-t border-black/8 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden dark:border-white/10"
>
	<div class="mx-auto grid max-w-lg grid-cols-5">
		<!-- 1. Home -->
		<a
			href="/"
			onclick={closeSheet}
			aria-current={isHomeActive ? 'page' : undefined}
			class="relative flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 py-1.5 transition-colors {isHomeActive
				? 'text-primary'
				: 'text-muted-foreground hover:text-foreground'}"
		>
			{#if isHomeActive}
				<span class="bg-primary absolute top-0 h-0.5 w-8 rounded-full"></span>
			{/if}
			<span
				class="flex h-7 w-11 items-center justify-center rounded-full transition-colors {isHomeActive
					? 'bg-primary/14'
					: ''}"
			>
				<Home size={20} strokeWidth={isHomeActive ? 2.4 : 2} />
			</span>
			<span class="max-w-full truncate text-[11px] leading-tight font-bold">
				{i18n.t('nav.home')}
			</span>
		</a>

		<!-- 2. Levels (opens quick 3-level sheet) -->
		<button
			type="button"
			onclick={() => (levelsSheetOpen = !levelsSheetOpen)}
			aria-expanded={levelsSheetOpen}
			aria-haspopup="dialog"
			class="relative flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 py-1.5 transition-colors {isLevelsActive
				? 'text-primary'
				: 'text-muted-foreground hover:text-foreground'}"
		>
			{#if isLevelsActive}
				<span class="bg-primary absolute top-0 h-0.5 w-8 rounded-full"></span>
			{/if}
			<span
				class="flex h-7 w-11 items-center justify-center rounded-full transition-colors {isLevelsActive
					? 'bg-primary/14'
					: ''}"
			>
				<Layers size={20} strokeWidth={isLevelsActive ? 2.4 : 2} />
			</span>
			<span class="max-w-full truncate text-[11px] leading-tight font-bold">
				{i18n.t('nav.levels')}
			</span>
		</button>

		<!-- 3. Quizzes -->
		<a
			href="/quizzes"
			onclick={closeSheet}
			aria-current={isQuizzesActive ? 'page' : undefined}
			class="relative flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 py-1.5 transition-colors {isQuizzesActive
				? 'text-fuchsia-600 dark:text-fuchsia-400'
				: 'text-muted-foreground hover:text-foreground'}"
		>
			{#if isQuizzesActive}
				<span class="absolute top-0 h-0.5 w-8 rounded-full bg-fuchsia-500"></span>
			{/if}
			<span
				class="flex h-7 w-11 items-center justify-center rounded-full transition-colors {isQuizzesActive
					? 'bg-fuchsia-500/14'
					: ''}"
			>
				<Brain size={20} strokeWidth={isQuizzesActive ? 2.4 : 2} />
			</span>
			<span class="max-w-full truncate text-[11px] leading-tight font-bold">
				{i18n.t('nav.quizzes')}
			</span>
		</a>

		<!-- 4. Simulator -->
		<a
			href="/simulator"
			onclick={closeSheet}
			aria-current={isSimulatorActive ? 'page' : undefined}
			class="relative flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 py-1.5 transition-colors {isSimulatorActive
				? 'text-emerald-600 dark:text-emerald-400'
				: 'text-muted-foreground hover:text-foreground'}"
		>
			{#if isSimulatorActive}
				<span class="absolute top-0 h-0.5 w-8 rounded-full bg-emerald-500"></span>
			{/if}
			<span
				class="flex h-7 w-11 items-center justify-center rounded-full transition-colors {isSimulatorActive
					? 'bg-emerald-500/14'
					: ''}"
			>
				<Calculator size={20} strokeWidth={isSimulatorActive ? 2.4 : 2} />
			</span>
			<span class="max-w-full truncate text-[11px] leading-tight font-bold">
				{i18n.t('nav.simulator')}
			</span>
		</a>

		<!-- 5. Account / Login -->
		<a
			href={accountHref}
			onclick={closeSheet}
			aria-current={isAccountActive ? 'page' : undefined}
			class="relative flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 py-1.5 transition-colors {isAccountActive
				? 'text-primary'
				: 'text-muted-foreground hover:text-foreground'}"
		>
			{#if isAccountActive}
				<span class="bg-primary absolute top-0 h-0.5 w-8 rounded-full"></span>
			{/if}
			<span
				class="flex h-7 w-11 items-center justify-center rounded-full transition-colors {isAccountActive
					? 'bg-primary/14'
					: ''}"
			>
				{#if user}
					{#if isStaff}
						<Shield size={20} strokeWidth={isAccountActive ? 2.4 : 2} />
					{:else}
						<User size={20} strokeWidth={isAccountActive ? 2.4 : 2} />
					{/if}
				{:else}
					<LogIn size={20} strokeWidth={isAccountActive ? 2.4 : 2} />
				{/if}
			</span>
			<span class="max-w-full truncate text-[11px] leading-tight font-bold">
				{user ? i18n.t('nav.account') : i18n.t('nav.loginShort')}
			</span>
		</a>
	</div>
</nav>
