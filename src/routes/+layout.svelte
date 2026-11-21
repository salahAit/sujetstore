<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { BookOpen, Bookmark, BarChart3, Calculator } from 'lucide-svelte';
	import DynamicIcon from '#lib/components/DynamicIcon.svelte';
	import TopNavbar from '#lib/components/TopNavbar.svelte';
	import MobileBottomNav from '#lib/components/MobileBottomNav.svelte';
	import { i18n } from '#lib/i18n/i18n.svelte';
	import { page } from '$app/state';

	let { data, children } = $props();

	let isSujetBuilder = $derived(page.url.pathname.startsWith('/admin/sujet-builder'));
	let levels = $derived<any[]>(data?.levels || []);
	let dynamicBase = $derived((data?.siteSettings?.dynamic_portal_url || '').replace(/\/$/, ''));
	let isStaff = $derived(
		data?.user ? ['superadmin', 'admin', 'editor'].includes(data.user.role) : false
	);

	$effect(() => {
		if (data?.locale) {
			i18n.hydrate(data.locale);
		}
	});

	function handleGlobalDragStart(e: DragEvent) {
		const target = e.target as HTMLElement | null;
		if (target?.closest?.('[draggable="true"]')) return;
		e.preventDefault();
	}
</script>

<svelte:window ondragstart={handleGlobalDragStart} />

<ModeWatcher />

{#if !isSujetBuilder}
	{#if data?.siteLockActive && isStaff}
		<div class="bg-amber-500 px-3 py-1.5 text-center text-xs font-extrabold text-slate-950">
			<span>🔒 الموقع مغلق حالياً عن الجمهور (وضع الحماية/التحديث) — أنت تتصفح بصلاحية المدير.</span>
			<a href="/admin/site-lock" class="ms-2 underline underline-offset-2">إدارة القفل</a>
		</div>
	{/if}
	<TopNavbar
		{levels}
		user={data?.user}
		{isStaff}
		isStaticBuild={data?.isStaticBuild}
		{dynamicBase}
	/>
{/if}

{#if isSujetBuilder}
	{@render children()}
{:else}
	<main class="min-h-screen flex-1">
		{@render children()}
	</main>
{/if}

{#if !isSujetBuilder}
	<footer class="bg-background/50 border-t border-black/5 py-10 dark:border-white/10">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
				<div>
					<div class="mb-3 flex items-center gap-3 text-xl font-bold" dir="ltr">
						<img src="/logo.webp" alt="SujetStore Logo" class="text-primary h-8 w-8" />
						<span class="gradient-text text-2xl">SujetStore</span>
					</div>
					<p class="text-muted-foreground text-sm leading-relaxed">
						{i18n.t('home.footerTagline')}
					</p>
				</div>

				<div>
					<h3 class="mb-3 text-base font-bold">{i18n.t('home.availableLevels')}</h3>
					<ul class="text-muted-foreground space-y-2 text-sm">
						{#each levels as lvl}
							<li>
								<a href="/{lvl.slug}" class="hover:text-primary flex items-center gap-2 transition-colors">
									<DynamicIcon name={lvl.icon} size={16} />
									<span>{i18n.pick(lvl, 'name')}</span>
									{#if lvl.visibility === 'coming_soon'}
										<span class="text-[10px] text-amber-500">({i18n.t('nav.comingSoon')})</span>
									{/if}
								</a>
							</li>
						{/each}
						<li>
							<a href="/simulator" class="flex items-center gap-2 transition-colors hover:text-emerald-500">
								<Calculator size={16} /> {i18n.t('nav.simulatorFull')}
							</a>
						</li>
					</ul>
				</div>

				<div>
					<h3 class="mb-3 text-base font-bold">{i18n.t('home.importantLinks')}</h3>
					<ul class="text-muted-foreground space-y-2 text-sm">
						<li>
							<a href="/bookmarks" class="flex items-center gap-2 transition-colors hover:text-amber-400">
								<Bookmark size={16} /> {i18n.t('nav.bookmarks')}
							</a>
						</li>
						<li>
							<a href="/progress" class="flex items-center gap-2 transition-colors hover:text-blue-400">
								<BarChart3 size={16} /> {i18n.t('nav.progress')}
							</a>
						</li>
						<li>
							<a href={`${dynamicBase}/student`} class="flex items-center gap-2 transition-colors hover:text-primary">
								<BookOpen size={16} /> {i18n.t('home.studentPortalLink')}
							</a>
						</li>
						<li><a href="/about" class="hover:text-foreground transition-colors">{i18n.t('nav.about')}</a></li>
					</ul>
				</div>
			</div>

			<div class="text-muted-foreground mt-8 border-t border-black/5 pt-6 text-center text-xs dark:border-white/5">
				<p>© 2026 SujetStore — {i18n.t('home.heroBadge')}</p>
			</div>
		</div>
	</footer>

	<MobileBottomNav {levels} user={data?.user} {isStaff} {dynamicBase} />
{/if}
