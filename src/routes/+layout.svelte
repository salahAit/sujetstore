<script lang="ts">
	import '../app.css';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import { Sun, Moon } from 'lucide-svelte';
	import { page } from '$app/stores';

	let { children } = $props();

	let isMobileMenuOpen = $state(false);
</script>

<ModeWatcher />

<!-- Navbar -->
<nav class="bg-background/80 sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-3 text-xl font-bold" dir="ltr">
				<span class="text-3xl">📚</span>
				<span class="gradient-text text-2xl">DzLearn</span>
			</a>

			<!-- Navigation Links -->
			<div class="hidden items-center gap-6 md:flex">
				<a
					href="/primaire"
					class="text-muted-foreground font-semibold transition-colors hover:text-emerald-400 {$page.url.pathname.startsWith(
						'/primaire'
					)
						? 'text-emerald-400'
						: ''}"
				>
					🎒 ابتدائي
				</a>
				<a
					href="/moyen"
					class="text-muted-foreground font-semibold transition-colors hover:text-blue-400 {$page.url.pathname.startsWith(
						'/moyen'
					)
						? 'text-blue-400'
						: ''}"
				>
					📚 متوسط
				</a>
				<a
					href="/secondaire"
					class="text-muted-foreground font-semibold transition-colors hover:text-purple-400 {$page.url.pathname.startsWith(
						'/secondaire'
					)
						? 'text-purple-400'
						: ''}"
				>
					🎓 ثانوي
				</a>

				<!-- Theme Toggle -->
				<button
					onclick={toggleMode}
					class="text-muted-foreground rounded-lg p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
					title="تغيير المظهر"
					aria-label="تغيير المظهر"
				>
					<span class="block dark:hidden"><Moon size={20} /></span>
					<span class="hidden dark:block"><Sun size={20} /></span>
				</button>
			</div>

			<!-- Mobile menu button and theme toggle -->
			<div class="flex items-center gap-2 md:hidden">
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
					class="text-muted-foreground hover:text-foreground rounded-lg p-2 transition-colors hover:bg-white/5 md:hidden {isMobileMenuOpen
						? 'text-foreground bg-white/5'
						: ''}"
					onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
					title="القائمة"
					aria-label="القائمة"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						{#if isMobileMenuOpen}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						{:else}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						{/if}
					</svg>
				</button>
			</div>
		</div>

		<!-- Mobile Menu -->
		{#if isMobileMenuOpen}
			<div
				class="animate-in slide-in-from-top-4 fade-in mt-1 space-y-2 border-t border-white/10 py-4 duration-200 md:hidden dark:border-white/5"
			>
				<a
					href="/primaire"
					class="text-muted-foreground flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition-colors hover:bg-emerald-500/10 hover:text-emerald-500 dark:hover:text-emerald-400 {$page.url.pathname.startsWith(
						'/primaire'
					)
						? 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400'
						: ''}"
					onclick={() => (isMobileMenuOpen = false)}
				>
					🎒 التعليم الابتدائي
				</a>
				<a
					href="/moyen"
					class="text-muted-foreground flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition-colors hover:bg-blue-500/10 hover:text-blue-500 dark:hover:text-blue-400 {$page.url.pathname.startsWith(
						'/moyen'
					)
						? 'bg-blue-500/10 text-blue-500 dark:text-blue-400'
						: ''}"
					onclick={() => (isMobileMenuOpen = false)}
				>
					📚 التعليم المتوسط
				</a>
				<a
					href="/secondaire"
					class="text-muted-foreground flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition-colors hover:bg-purple-500/10 hover:text-purple-500 dark:hover:text-purple-400 {$page.url.pathname.startsWith(
						'/secondaire'
					)
						? 'bg-purple-500/10 text-purple-500 dark:text-purple-400'
						: ''}"
					onclick={() => (isMobileMenuOpen = false)}
				>
					🎓 التعليم الثانوي
				</a>
			</div>
		{/if}
	</div>
</nav>

<!-- Main Content -->
<main class="min-h-screen flex-1">
	{@render children()}
</main>

<!-- Footer -->
<footer class="bg-background/50 border-t border-white/10 py-12">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			<!-- Brand -->
			<div>
				<div class="mb-4 flex items-center gap-3 text-xl font-bold">
					<span class="text-3xl">📚</span>
					<span class="gradient-text text-2xl">DzLearn</span>
				</div>
				<p class="text-muted-foreground text-sm leading-relaxed">
					بنك الفروض والاختبارات الجزائرية. دروس، ملخصات، فروض واختبارات لجميع المراحل التعليمية وفق
					المنهاج الوطني.
				</p>
			</div>

			<!-- Quick Links -->
			<div>
				<h3 class="mb-4 text-lg font-bold">المراحل التعليمية</h3>
				<ul class="text-muted-foreground space-y-2 text-sm">
					<li>
						<a href="/primaire" class="transition-colors hover:text-emerald-400"
							>🎒 التعليم الابتدائي</a
						>
					</li>
					<li>
						<a href="/moyen" class="transition-colors hover:text-blue-400">📚 التعليم المتوسط</a>
					</li>
					<li>
						<a href="/secondaire" class="transition-colors hover:text-purple-400"
							>🎓 التعليم الثانوي</a
						>
					</li>
				</ul>
			</div>

			<!-- Info -->
			<div>
				<h3 class="mb-4 text-lg font-bold">حول الموقع</h3>
				<ul class="text-muted-foreground space-y-2 text-sm">
					<li><a href="/about" class="hover:text-foreground transition-colors">من نحن</a></li>
					<li>
						<p>المحتوى متوافق مع المنهاج الدراسي الجزائري</p>
					</li>
				</ul>
			</div>
		</div>

		<div class="text-muted-foreground mt-8 border-t border-white/5 pt-8 text-center text-sm">
			<p>© {new Date().getFullYear()} DzLearn - جميع الحقوق محفوظة</p>
		</div>
	</div>
</footer>
