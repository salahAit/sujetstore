<script lang="ts">
	import { Inbox, GraduationCap } from 'lucide-svelte';
	import DynamicIcon from '#lib/components/DynamicIcon.svelte';
	import { i18n } from '#lib/i18n/i18n.svelte';
	let { data }: { data: any } = $props();

	// Stream colors for visual distinction
	const streamColors: Record<string, string> = {
		TCST: '#10b981',
		TCL: '#8b5cf6',
		SE: '#3b82f6',
		MATH: '#ef4444',
		TM: '#f59e0b',
		GE: '#0d9488',
		LP: '#7c3aed',
		LE: '#ec4899'
	};

	function getStreamColor(id: string) {
		return streamColors[id] || '#6b7280';
	}

	// Stream icons
	const streamIcons: Record<string, string> = {
		TCST: 'FlaskConical',
		TCL: 'BookOpen',
		SE: 'Microscope',
		MATH: 'Calculator',
		TM: 'Wrench',
		GE: 'TrendingUp',
		LP: 'Pen',
		LE: 'Languages'
	};

	function getStreamIcon(id: string) {
		return streamIcons[id] || 'GraduationCap';
	}
</script>

<svelte:head>
	<title>{data.year.name_ar} - {data.level.name_ar} - SujetStore</title>
	<meta name="description" content="المواد الدراسية - {data.year.name_ar} - فروض واختبارات" />
</svelte:head>

<!-- Breadcrumb -->
<div class="border-b border-white/10 bg-white/[0.02]">
	<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
		<nav class="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
			<a href="/" class="hover:text-foreground transition-colors">{i18n.t('nav.home')}</a>
			<span class="opacity-50">/</span>
			<a href="/{data.level.slug}" class="hover:text-foreground transition-colors"
				>{i18n.pick(data.level, 'name')}</a
			>
			<span class="opacity-50">/</span>
			<span class="text-foreground font-semibold">{i18n.pick(data.year, 'name')}</span>
		</nav>
	</div>
</div>

<!-- Year Header -->
<section class="hero-gradient py-10 lg:py-14">
	<div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
		<div class="text-muted-foreground mb-3 inline-flex items-center gap-2 text-sm">
			<span class="flex items-center"><DynamicIcon name={data.level.icon} size={16} /></span>
			<span>{i18n.pick(data.level, 'name')}</span>
		</div>
		<h1 class="mb-2 text-3xl font-extrabold lg:text-4xl">{i18n.pick(data.year, 'name')}</h1>
		<p class="text-muted-foreground">{i18n.locale === 'ar' ? data.year.name_fr : data.year.name_ar}</p>
	</div>
</section>

{#if data.comingSoon}
	<section class="py-16">
		<div class="mx-auto max-w-xl px-4">
			<div class="glass-card rounded-2xl border p-10 text-center">
				<div class="mb-3 text-3xl font-extrabold text-amber-500">{i18n.t('nav.comingSoon')}</div>
				<p class="text-muted-foreground text-sm">
					<strong>{i18n.pick(data.year, 'name')}</strong>
				</p>
			</div>
		</div>
	</section>
{:else if data.isSecondary && data.streams.length > 0}
	<!-- Secondary: Stream Selection Cards -->
	<section class="py-12 lg:py-16">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<h2 class="mb-3 text-center text-2xl font-bold">{i18n.t('subject.selectStream')}</h2>
			<p class="text-muted-foreground mb-8 text-center text-sm">
				{i18n.t('subject.selectSubject')}
			</p>

			<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.streams as stream}
					<a
						href="/{data.level.slug}/{data.year.slug}/{stream.id.toLowerCase()}"
						class="glass-card group block border-black/5 dark:border-white/10"
					>
						<div class="flex items-center gap-4">
							<!-- Stream Icon -->
							<div
								class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl"
								style="background: {getStreamColor(stream.id)}20; border: 1px solid {getStreamColor(
									stream.id
								)}40; color: {getStreamColor(stream.id)}"
							>
								<DynamicIcon name={getStreamIcon(stream.id)} size={28} />
							</div>

							<div class="min-w-0 flex-1">
								<div class="flex items-center justify-between gap-2">
									<h3 class="group-hover:text-primary truncate text-lg font-bold transition-colors">
										{i18n.pick(stream, 'name')}
									</h3>
									<div
										class="flex items-center gap-1.5 rounded-lg bg-black/5 px-2 py-1 dark:bg-white/5"
									>
										<span class="text-sm font-bold" style="color: {getStreamColor(stream.id)}"
											>{stream.subjectCount}</span
										>
										<span class="text-muted-foreground text-[10px]">{i18n.t('simulator.subject')}</span>
									</div>
								</div>
								<p class="text-muted-foreground text-sm">{i18n.locale === 'ar' ? stream.name_fr : stream.name_ar}</p>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
{:else}
	<!-- Primary/Middle: Subject Grid -->
	<section class="py-12 lg:py-16">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<h2 class="mb-8 text-center text-2xl font-bold">{i18n.t('subject.title')}</h2>

			<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.subjects as subject}
					<a
						href="/{data.level.slug}/{data.year.slug}/{subject.slug}"
						class="glass-card group block border-black/5 dark:border-white/10"
					>
						<div class="flex items-center gap-4">
							<!-- Subject Icon -->
							<div
								class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl"
								style="background: {subject.color}20; border: 1px solid {subject.color}40; color: {subject.color}"
							>
								<DynamicIcon name={subject.icon} size={28} />
							</div>

							<div class="min-w-0 flex-1">
								<div class="flex items-center justify-between gap-2">
									<h3 class="group-hover:text-primary truncate text-lg font-bold transition-colors">
										{i18n.pick(subject, 'name')}
									</h3>
									<div
										class="flex items-center gap-1.5 rounded-lg bg-black/5 px-2 py-1 dark:bg-white/5"
									>
										<span class="text-sm font-bold" style="color: {subject.color}"
											>{subject.docCount}</span
										>
										<span class="text-muted-foreground text-[10px]">{i18n.t('doc.exam')}</span>
										{#if subject.quizCount > 0}
											<span class="text-muted-foreground">·</span>
											<span class="text-sm font-bold text-emerald-500">{subject.quizCount}</span>
											<span class="text-muted-foreground text-[10px]">{i18n.t('nav.quizzes')}</span>
										{/if}
									</div>
								</div>
								<p class="text-muted-foreground text-sm">{i18n.locale === 'ar' ? subject.name_fr : subject.name_ar}</p>
							</div>
						</div>

						{#if subject.coefficient}
							<div class="text-muted-foreground mt-3 text-xs">
								{i18n.t('subject.coefficient')}: <span class="text-foreground font-bold">{subject.coefficient}</span>
							</div>
						{/if}
					</a>
				{/each}
			</div>

			{#if data.subjects.length === 0}
				<div class="text-muted-foreground flex flex-col items-center py-16 text-center">
					<Inbox size={48} class="mb-4 opacity-50" />
					<p class="text-xl">لا توجد مواد بعد لهذه السنة</p>
				</div>
			{/if}
		</div>
	</section>
{/if}
