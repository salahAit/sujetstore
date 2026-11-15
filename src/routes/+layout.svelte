<script lang="ts">
	import '../app.css';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import {
		Sun,
		Moon,
		BookOpen,
		Bookmark,
		BarChart3,
		Brain,
		Trophy,
		Calculator,
		User,
		LogIn,
		Shield
	} from 'lucide-svelte';
	import DynamicIcon from '#lib/components/DynamicIcon.svelte';
	import SearchBar from '#lib/components/SearchBar.svelte';
	import NotificationBell from '#lib/components/NotificationBell.svelte';
	import PWAInstallButton from '#lib/components/PWAInstallButton.svelte';
	import { page } from '$app/state';

	let { data, children } = $props();

	let isMobileMenuOpen = $state(false);
	let isSujetBuilder = $derived(page.url.pathname.startsWith('/admin/sujet-builder'));
	let levels = $derived<any[]>(data?.levels || []);
	let dynamicBase = $derived((data?.siteSettings?.dynamic_portal_url || '').replace(/\/$/, ''));
	let isStaff = $derived(
		data?.user ? ['superadmin', 'admin', 'editor'].includes(data.user.role) : false
	);
</script>

<ModeWatcher />

{#if !isSujetBuilder}
	<nav
		class="bg-background/80 sticky top-0 z-50 border-b border-black/5 backdrop-blur-xl dark:border-white/10"
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between gap-3">
				<div class="flex items-center gap-3">
					<a href="/" class="flex items-center gap-3 text-xl font-bold" dir="ltr">
						<img src="/logo.webp" alt="SujetStore Logo" class="h-8 w-8" />
						<span class="gradient-text text-2xl">SujetStore</span>
					</a>
					<PWAInstallButton />
				</div>

				<!-- Desktop Navigation -->
				<div class="hidden items-center gap-4 lg:flex">
					{#each levels as lvl}
						<a
							href="/{lvl.slug}"
							class="text-muted-foreground hover:text-primary flex items-center gap-1.5 text-sm font-semibold transition-colors {page.url.pathname.startsWith(
								'/' + lvl.slug
							)
								? 'text-primary'
								: ''}"
						>
							<DynamicIcon name={lvl.icon} size={17} />
							<span>{lvl.name_ar}</span>
							{#if lvl.visibility === 'coming_soon'}
								<span class="rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] text-amber-500">قريباً</span>
							{/if}
						</a>
					{/each}

					<a
						href="/quizzes"
						class="text-muted-foreground flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-fuchsia-400 {page.url.pathname.startsWith(
							'/quizzes'
						)
							? 'text-fuchsia-400'
							: ''}"
					>
						<Brain size={17} /> تمارين
					</a>

					<a
						href="/simulator"
						class="text-muted-foreground flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-emerald-500 {page.url.pathname.startsWith(
							'/simulator'
						)
							? 'text-emerald-500'
							: ''}"
					>
						<Calculator size={17} /> المعدل والمحاكي
					</a>

					<a
						href="/achievements"
						class="text-muted-foreground flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-amber-400 {page.url.pathname.startsWith(
							'/achievements'
						)
							? 'text-amber-400'
							: ''}"
					>
						<Trophy size={17} /> إنجازاتي
					</a>

					<SearchBar staticMode={data?.isStaticBuild} />
					<NotificationBell staticMode={data?.isStaticBuild} />

					{#if data?.user}
						<a
							href={`${dynamicBase}${isStaff ? '/admin' : '/student'}`}
							class="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition"
						>
							{#if isStaff}
								<Shield size={15} />
							{:else}
								<User size={15} />
							{/if}
							<span class="max-w-[90px] truncate">{data.user.name}</span>
						</a>
					{:else}
						<a
							href={`${dynamicBase}/auth/login`}
							class="bg-primary text-primary-foreground inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold shadow-sm transition hover:opacity-90"
						>
							<LogIn size={15} />
							دخول / حساب مجاني
						</a>
					{/if}

					<button
						onclick={toggleMode}
						class="text-muted-foreground rounded-lg p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
						title="تغيير المظهر"
						aria-label="تغيير المظهر"
					>
						<span class="block dark:hidden"><Moon size={19} /></span>
						<span class="hidden dark:block"><Sun size={19} /></span>
					</button>
				</div>

				<!-- Mobile Actions -->
				<div class="flex items-center gap-2 lg:hidden">
					<SearchBar staticMode={data?.isStaticBuild} />
					<NotificationBell staticMode={data?.isStaticBuild} />
					<button
						onclick={toggleMode}
						class="text-muted-foreground rounded-lg p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
						title="تغيير المظهر"
						aria-label="تغيير المظهر"
					>
						<span class="block dark:hidden"><Moon size={20} /></span>
						<span class="hidden dark:block"><Sun size={20} /></span>
					</button>
					<button
						class="text-muted-foreground hover:text-foreground rounded-lg p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/5 {isMobileMenuOpen
							? 'text-foreground bg-black/5 dark:bg-white/5'
							: ''}"
						onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
						title="القائمة"
						aria-label="القائمة"
					>
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							{#if isMobileMenuOpen}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							{:else}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
							{/if}
						</svg>
					</button>
				</div>
			</div>

			<!-- Mobile Menu -->
			{#if isMobileMenuOpen}
				<div
					class="animate-in slide-in-from-top-4 fade-in mt-1 space-y-2 border-t border-black/5 py-4 duration-200 lg:hidden dark:border-white/5"
				>
					{#each levels as lvl}
						<a
							href="/{lvl.slug}"
							class="text-muted-foreground hover:bg-primary/10 hover:text-primary flex items-center justify-between rounded-xl px-4 py-3 font-semibold transition-colors {page.url.pathname.startsWith(
								'/' + lvl.slug
							)
								? 'bg-primary/10 text-primary'
								: ''}"
							onclick={() => (isMobileMenuOpen = false)}
						>
							<span class="flex items-center gap-3">
								<DynamicIcon name={lvl.icon} size={20} />
								{lvl.name_ar}
							</span>
							{#if lvl.visibility === 'coming_soon'}
								<span class="rounded bg-amber-500/15 px-2 py-0.5 text-xs text-amber-500">قريباً</span>
							{/if}
						</a>
					{/each}

					<a
						href="/quizzes"
						class="text-muted-foreground flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition-colors hover:bg-fuchsia-500/10 hover:text-fuchsia-500 {page.url.pathname.startsWith(
							'/quizzes'
						)
							? 'bg-fuchsia-500/10 text-fuchsia-500'
							: ''}"
						onclick={() => (isMobileMenuOpen = false)}
					>
						<Brain size={20} /> تمارين
					</a>
					<a
						href="/simulator"
						class="text-muted-foreground flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition-colors hover:bg-emerald-500/10 hover:text-emerald-500 {page.url.pathname.startsWith(
							'/simulator'
						)
							? 'bg-emerald-500/10 text-emerald-500'
							: ''}"
						onclick={() => (isMobileMenuOpen = false)}
					>
						<Calculator size={20} /> حاسبة المعدل والمحاكي
					</a>
					<a
						href="/achievements"
						class="text-muted-foreground flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition-colors hover:bg-amber-500/10 hover:text-amber-500 {page.url.pathname.startsWith(
							'/achievements'
						)
							? 'bg-amber-500/10 text-amber-500'
							: ''}"
						onclick={() => (isMobileMenuOpen = false)}
					>
						<Trophy size={20} /> الإنجازات
					</a>

					<div class="pt-2">
						{#if data?.user}
							<a
								href={`${dynamicBase}${isStaff ? '/admin' : '/student'}`}
								class="bg-primary text-primary-foreground flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold"
								onclick={() => (isMobileMenuOpen = false)}
							>
								<User size={18} />
								{isStaff ? 'لوحة الإدارة' : `فضاء التلميذ (${data.user.name})`}
							</a>
						{:else}
							<a
								href={`${dynamicBase}/auth/login`}
								class="bg-primary text-primary-foreground flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold"
								onclick={() => (isMobileMenuOpen = false)}
							>
								<LogIn size={18} /> تسجيل الدخول / حساب جديد
							</a>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	</nav>
{/if}

{#if isSujetBuilder}
	{@render children()}
{:else}
	<main class="min-h-screen flex-1">
		{@render children()}
	</main>
{/if}

{#if !isSujetBuilder}
	<footer class="bg-background/50 border-t border-black/5 py-12 dark:border-white/10">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
				<div>
					<div class="mb-4 flex items-center gap-3 text-xl font-bold">
						<img src="/logo.webp" alt="SujetStore Logo" class="text-primary h-8 w-8" />
						<span class="gradient-text text-2xl">SujetStore</span>
					</div>
					<p class="text-muted-foreground text-sm leading-relaxed">
						بنك الفروض والاختبارات الجزائرية. دروس، ملخصات، فروض واختبارات وتمارين تفاعلية وفق المنهاج الدراسي الوطني.
					</p>
				</div>

				<div>
					<h3 class="mb-4 text-lg font-bold">الأطوار المتاحة</h3>
					<ul class="text-muted-foreground space-y-2 text-sm">
						{#each levels as lvl}
							<li>
								<a href="/{lvl.slug}" class="hover:text-primary flex items-center gap-2 transition-colors">
									<DynamicIcon name={lvl.icon} size={16} />
									<span>{lvl.name_ar}</span>
									{#if lvl.visibility === 'coming_soon'}
										<span class="text-[10px] text-amber-500">(قريباً)</span>
									{/if}
								</a>
							</li>
						{/each}
						<li>
							<a href="/simulator" class="flex items-center gap-2 transition-colors hover:text-emerald-500">
								<Calculator size={16} /> حاسبة المعدل ومحاكي الشهادات
							</a>
						</li>
					</ul>
				</div>

				<div>
					<h3 class="mb-4 text-lg font-bold">روابط مهمة</h3>
					<ul class="text-muted-foreground space-y-2 text-sm">
						<li>
							<a href="/bookmarks" class="flex items-center gap-2 transition-colors hover:text-amber-400">
								<Bookmark size={16} /> المفضلة
							</a>
						</li>
						<li>
							<a href="/progress" class="flex items-center gap-2 transition-colors hover:text-blue-400">
								<BarChart3 size={16} /> تقدمي
							</a>
						</li>
						<li>
							<a href={`${dynamicBase}/student`} class="flex items-center gap-2 transition-colors hover:text-primary">
								<BookOpen size={16} /> بوابة التلميذ والاشتراكات
							</a>
						</li>
						<li><a href="/about" class="hover:text-foreground transition-colors">من نحن</a></li>
					</ul>
				</div>
			</div>

			<div class="text-muted-foreground mt-8 border-t border-black/5 pt-8 text-center text-sm dark:border-white/10">
				© {new Date().getFullYear()} SujetStore - جميع الحقوق محفوظة
			</div>
		</div>
	</footer>
{/if}
