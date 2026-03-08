<script lang="ts">
	let { data }: { data: any } = $props();

	let activeTab = $state('exam'); // 'exam' or 'solution'

	let doc = $derived(data.document);
	let level = $derived(data.level);
	let year = $derived(data.year);
	let subject = $derived(data.subject);

	const typeLabels: Record<string, string> = {
		exam: 'اختبار',
		test: 'فرض',
		lesson: 'درس',
		summary: 'ملخص',
		exercise: 'تمرين',
		solution: 'حل'
	};
</script>

<svelte:head>
	<title>{doc.title_ar || doc.title} - DzLearn</title>
</svelte:head>

<!-- Breadcrumb -->
<div class="border-b border-white/10 bg-white/[0.02]">
	<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
		<nav class="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
			<a href="/" class="hover:text-foreground transition-colors">الرئيسية</a>
			<span class="opacity-50">/</span>
			<a href="/{level.slug}" class="hover:text-foreground transition-colors">{level.name_ar}</a>
			<span class="opacity-50">/</span>
			<a href="/{level.slug}/{year.slug}" class="hover:text-foreground transition-colors"
				>{year.name_ar}</a
			>
			<span class="opacity-50">/</span>
			<a
				href="/{level.slug}/{year.slug}/{subject.slug}"
				class="hover:text-foreground transition-colors">{subject.name_ar}</a
			>
			<span class="opacity-50">/</span>
			<span
				class="text-foreground max-w-[200px] truncate font-semibold sm:max-w-md"
				title={doc.title_ar || doc.title}
			>
				{doc.title_ar || doc.title}
			</span>
		</nav>
	</div>
</div>

<main
	class="mx-auto flex h-full min-h-[calc(100vh-140px)] max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8"
>
	<div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
		<div>
			<h1 class="mb-2 text-2xl font-bold md:text-3xl">{doc.title_ar || doc.title}</h1>
			<div class="text-muted-foreground flex items-center gap-3 text-sm">
				<span class="badge-{doc.type} rounded-full border px-2 py-0.5"
					>{typeLabels[doc.type] || doc.type}</span
				>
				{#if doc.academic_year}<span>📅 {doc.academic_year}</span>{/if}
				{#if doc.source}<span>📝 {doc.source}</span>{/if}
			</div>
		</div>

		<!-- Downloads -->
		<div class="flex items-center gap-2">
			{#if doc.pdf_url}
				<a
					href={doc.pdf_url}
					download
					target="_blank"
					class="bg-primary/20 hover:bg-primary/30 text-primary border-primary/30 flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors"
				>
					📥 تحميل {doc.has_solution ? 'الموضوع' : 'الملف'}
				</a>
			{/if}
			{#if doc.has_solution && doc.solution_url}
				<a
					href={doc.solution_url}
					download
					target="_blank"
					class="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/30"
				>
					📥 تحميل التصحيح ✅
				</a>
			{/if}
		</div>
	</div>

	<!-- Viewer Area -->
	<div
		class="glass-card mx-auto flex w-full max-w-5xl flex-1 flex-col overflow-hidden rounded-xl border border-white/10 bg-black/5 p-0 dark:bg-white/5"
	>
		<!-- Tabs -->
		{#if doc.has_solution && doc.solution_url}
			<div class="flex gap-2 border-b border-white/10 bg-black/10 p-2 dark:bg-black/20">
				<button
					onclick={() => (activeTab = 'exam')}
					class="flex-1 rounded-lg px-4 py-2 text-sm font-bold transition-all {activeTab === 'exam'
						? 'bg-primary text-primary-foreground shadow-sm'
						: 'text-muted-foreground hover:bg-white/10'}"
				>
					📄 الموضوع
				</button>
				<button
					onclick={() => (activeTab = 'solution')}
					class="flex-1 rounded-lg px-4 py-2 text-sm font-bold transition-all {activeTab ===
					'solution'
						? 'bg-emerald-500 text-white shadow-sm'
						: 'text-muted-foreground hover:bg-white/10'}"
				>
					✅ التصحيح النموذجي
				</button>
			</div>
		{/if}

		<!-- PDF iframe -->
		<div class="relative min-h-[60vh] w-full flex-1 overflow-hidden rounded-b-xl bg-white">
			{#if doc.pdf_url && activeTab === 'exam'}
				<iframe
					src={doc.pdf_url}
					title="عارض الوثيقة"
					class="absolute inset-0 h-full w-full border-0"
				></iframe>
			{:else if doc.solution_url && activeTab === 'solution'}
				<iframe
					src={doc.solution_url}
					title="عارض الحل"
					class="absolute inset-0 h-full w-full border-0"
				></iframe>
			{:else}
				<div class="flex h-full w-full items-center justify-center text-black/50">
					لا يوجد ملف لعرضه بصيغة PDF
				</div>
			{/if}
		</div>
	</div>
</main>
