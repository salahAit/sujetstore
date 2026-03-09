<script lang="ts">
	import { Printer, Download, FileText, CheckCircle, Calendar, GraduationCap } from 'lucide-svelte';
	let { data }: { data: any } = $props();

	let activeTab = $state('exam'); // 'exam' or 'solution'
	let isFullscreen = $state(false);

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

	function printDoc(url: string) {
		const iframe = document.createElement('iframe');
		iframe.style.display = 'none';
		iframe.src = url;
		document.body.appendChild(iframe);

		iframe.onload = () => {
			setTimeout(() => {
				iframe.contentWindow?.print();
			}, 500);
		};
	}
</script>

<svelte:head>
	<title>{doc.titleAr || doc.title} - DzLearn</title>
</svelte:head>

<!-- Breadcrumb -->
<div class="border-b border-white/10 bg-white/[0.02]">
	<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
		<nav class="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
			<a href="/" class="hover:text-foreground transition-colors">الرئيسية</a>
			<span class="opacity-50">/</span>
			<a href="/{level.slug}" class="hover:text-foreground transition-colors">{level.nameAr}</a>
			<span class="opacity-50">/</span>
			<a href="/{level.slug}/{year.slug}" class="hover:text-foreground transition-colors"
				>{year.nameAr}</a
			>
			<span class="opacity-50">/</span>
			<a
				href="/{level.slug}/{year.slug}/{subject.slug}"
				class="hover:text-foreground transition-colors">{subject.nameAr}</a
			>
			<span class="opacity-50">/</span>
			<span
				class="text-foreground max-w-[200px] truncate font-semibold sm:max-w-md"
				title={doc.titleAr || doc.title}
			>
				{doc.titleAr || doc.title}
			</span>
		</nav>
	</div>
</div>

<main
	class="mx-auto flex h-full min-h-[calc(100vh-140px)] max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8"
>
	<div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
		<div>
			<h1 class="mb-2 text-2xl font-bold md:text-3xl">{doc.titleAr || doc.title}</h1>
			<div class="text-muted-foreground flex items-center gap-3 text-sm">
				<span class="badge-{doc.type} rounded-full border px-2 py-0.5"
					>{typeLabels[doc.type] || doc.type}</span
				>
				{#if doc.year}<span class="flex items-center gap-1"><Calendar size={14} /> {doc.year}</span
					>{/if}
				{#if doc.source}<span class="flex items-center gap-1"
						><GraduationCap size={14} /> {doc.source}</span
					>{/if}
			</div>
		</div>

		<!-- Action Buttons -->
		<div class="flex items-center gap-2">
			{#if doc.pdfUrl}
				<div class="flex gap-1">
					<button
						onclick={(e) => {
							e.preventDefault();
							printDoc(doc.pdfUrl);
						}}
						class="border-primary/30 bg-primary/10 text-primary hover:bg-primary/30 flex items-center justify-center rounded-lg border p-2 transition-colors"
						title="طباعة الموضوع"
					>
						<Printer size={20} />
					</button>
					<a
						href={doc.pdfUrl}
						download
						target="_blank"
						class="bg-primary/20 hover:bg-primary/30 text-primary border-primary/30 flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors"
					>
						<Download size={18} /> تحميل {doc.hasSolution ? 'الموضوع' : 'الملف'}
					</a>
				</div>
			{/if}
			{#if doc.hasSolution && doc.solutionUrl}
				<div class="flex gap-1">
					<button
						onclick={(e) => {
							e.preventDefault();
							printDoc(doc.solutionUrl);
						}}
						class="flex items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2 text-emerald-500 transition-colors hover:bg-emerald-500/30 dark:text-emerald-400"
						title="طباعة التصحيح"
					>
						<Printer size={20} />
					</button>
					<a
						href={doc.solutionUrl}
						download
						target="_blank"
						class="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/30"
					>
						<Download size={18} /> تحميل التصحيح
					</a>
				</div>
			{/if}
		</div>
	</div>

	<!-- Viewer Area -->
	<div
		class="glass-card mx-auto flex w-full max-w-5xl flex-1 flex-col overflow-hidden rounded-xl border border-white/10 bg-black/5 p-0 dark:bg-white/5"
	>
		<!-- Tabs & Controls -->
		<div
			class="flex items-center justify-between border-b border-white/10 bg-black/10 p-2 dark:bg-black/20"
		>
			<div class="flex w-full max-w-md gap-2">
				{#if doc.hasSolution && doc.solutionUrl}
					<button
						onclick={() => (activeTab = 'exam')}
						class="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all {activeTab ===
						'exam'
							? 'bg-primary text-primary-foreground shadow-sm'
							: 'text-muted-foreground hover:bg-white/10'}"
					>
						<FileText size={18} /> الموضوع
					</button>
					<button
						onclick={() => (activeTab = 'solution')}
						class="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all {activeTab ===
						'solution'
							? 'bg-emerald-500 text-white shadow-sm'
							: 'text-muted-foreground hover:bg-white/10'}"
					>
						<CheckCircle size={18} /> التصحيح النموذجي
					</button>
				{:else}
					<span class="text-foreground flex items-center gap-2 px-4 py-2 font-bold"
						><FileText size={18} /> الوثيقة</span
					>
				{/if}
			</div>

			{#if doc.pdfUrl || doc.solutionUrl}
				<button
					onclick={() => (isFullscreen = true)}
					class="text-muted-foreground hover:text-foreground ml-2 hidden shrink-0 items-center justify-center rounded-lg p-2 transition-colors hover:bg-white/10 sm:flex"
					title="تكبير الشاشة (Fullscreen)"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path d="M8 3H5a2 2 0 0 0-2 2v3" /><path d="M21 8V5a2 2 0 0 0-2-2h-3" /><path
							d="M3 16v3a2 2 0 0 0 2 2h3"
						/><path d="M16 21h3a2 2 0 0 0 2-2v-3" /></svg
					>
				</button>
			{/if}
		</div>

		<!-- PDF iframe -->
		<div class="relative min-h-[60vh] w-full flex-1 overflow-hidden rounded-b-xl bg-white">
			{#if doc.pdfUrl && activeTab === 'exam'}
				<iframe
					src={doc.pdfUrl + '#toolbar=0&view=FitH'}
					title="عارض الوثيقة"
					class="absolute inset-0 h-full w-full border-0"
				></iframe>
			{:else if doc.solutionUrl && activeTab === 'solution'}
				<iframe
					src={doc.solutionUrl + '#toolbar=0&view=FitH'}
					title="عارض الحل"
					class="absolute inset-0 h-full w-full border-0"
				></iframe>
			{:else}
				<div class="flex h-full w-full items-center justify-center text-black/50">
					لا يوجد ملف لعرضه بصيغة PDF
				</div>
			{/if}

			<!-- Mobile Fullscreen Floating Button -->
			{#if doc.pdfUrl || doc.solutionUrl}
				<button
					onclick={() => (isFullscreen = true)}
					class="bg-primary text-primary-foreground absolute bottom-4 left-4 z-10 flex items-center justify-center rounded-full p-3 shadow-lg transition-transform hover:scale-105 active:scale-95 sm:hidden"
					title="تكبير الشاشة"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path d="M8 3H5a2 2 0 0 0-2 2v3" /><path d="M21 8V5a2 2 0 0 0-2-2h-3" /><path
							d="M3 16v3a2 2 0 0 0 2 2h3"
						/><path d="M16 21h3a2 2 0 0 0 2-2v-3" /></svg
					>
				</button>
			{/if}
		</div>
	</div>
</main>

<!-- Fullscreen Modal -->
{#if isFullscreen && (doc.pdfUrl || doc.solutionUrl)}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="bg-background/95 fixed inset-0 z-50 flex flex-col backdrop-blur-sm sm:p-4 md:p-8"
		onclick={(e) => {
			if (e.target === e.currentTarget) isFullscreen = false;
		}}
	>
		<div
			class="mx-auto flex w-full max-w-5xl items-center justify-between border border-white/10 bg-black/10 px-4 py-3 sm:rounded-t-xl dark:bg-white/5"
		>
			<div class="flexitems-center text-foreground/90 gap-3 truncate">
				<h2
					class="inline-block max-w-[200px] truncate align-middle text-sm font-bold sm:max-w-md sm:text-lg"
				>
					{doc.titleAr || doc.title}
				</h2>
				<span
					class="badge-{doc.type} mx-2 inline-block rounded-full border px-2 py-0.5 align-middle text-xs"
				>
					{activeTab === 'exam' ? 'الموضوع' : 'التصحيح'}
				</span>
			</div>

			<div class="flex items-center gap-2">
				{#if activeTab === 'exam' && doc.pdfUrl}
					<button
						onclick={(e) => {
							e.preventDefault();
							printDoc(doc.pdfUrl);
						}}
						class="border-primary/30 bg-primary/10 text-primary hover:bg-primary/30 flex h-9 w-9 items-center justify-center rounded-lg border transition-colors"
						title="طباعة الموضوع"
					>
						<Printer size={18} />
					</button>
					<a
						href={doc.pdfUrl}
						download
						target="_blank"
						class="text-primary hover:bg-primary hover:text-primary-foreground bg-primary/20 flex h-9 items-center justify-center rounded-lg px-3 text-sm font-semibold transition-colors"
						title="تحميل الموضوع"
						><Download size={16} /> <span class="hidden sm:mr-1 sm:inline">تحميل</span></a
					>
				{/if}
				{#if activeTab === 'solution' && doc.solutionUrl}
					<button
						onclick={(e) => {
							e.preventDefault();
							printDoc(doc.solutionUrl);
						}}
						class="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 transition-colors hover:bg-emerald-500/30 dark:text-emerald-400"
						title="طباعة التصحيح"
					>
						<Printer size={18} />
					</button>
					<a
						href={doc.solutionUrl}
						download
						target="_blank"
						class="flex h-9 items-center justify-center rounded-lg bg-emerald-500/20 px-3 text-sm font-semibold text-emerald-500 transition-colors hover:bg-emerald-500 hover:text-white"
						title="تحميل التصحيح"
						><Download size={16} /> <span class="hidden sm:mr-1 sm:inline">تحميل</span></a
					>
				{/if}

				<button
					onclick={() => (isFullscreen = false)}
					class="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 transition-colors hover:bg-red-500 hover:text-white"
					title="إغلاق الشاشة الكاملة"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
					>
				</button>
			</div>
		</div>

		<div
			class="relative mx-auto w-full max-w-5xl flex-1 overflow-hidden border-x border-b border-white/10 bg-white shadow-2xl sm:rounded-b-xl"
		>
			{#if activeTab === 'exam' && doc.pdfUrl}
				<iframe
					src={doc.pdfUrl + '#toolbar=0&view=FitH'}
					title="قارئ الوثيقة"
					class="absolute inset-0 h-full w-full border-0"
				></iframe>
			{:else if activeTab === 'solution' && doc.solutionUrl}
				<iframe
					src={doc.solutionUrl + '#toolbar=0&view=FitH'}
					title="قارئ الوثيقة"
					class="absolute inset-0 h-full w-full border-0"
				></iframe>
			{/if}
		</div>

		<!-- Mobile/Desktop Toggle inside Fullscreen -->
		{#if doc.hasSolution && doc.solutionUrl}
			<div
				class="absolute bottom-6 left-1/2 z-[60] flex -translate-x-1/2 items-center rounded-full border border-white/10 bg-black/80 p-1.5 shadow-2xl backdrop-blur-md"
			>
				<button
					onclick={() => (activeTab = 'exam')}
					class="rounded-full px-4 py-2 text-sm font-bold transition-all {activeTab === 'exam'
						? 'bg-primary text-primary-foreground shadow-sm'
						: 'text-white/70 hover:bg-white/10 hover:text-white'}"
				>
					الموضوع
				</button>
				<button
					onclick={() => (activeTab = 'solution')}
					class="rounded-full px-4 py-2 text-sm font-bold transition-all {activeTab === 'solution'
						? 'bg-emerald-500 text-white shadow-sm'
						: 'text-white/70 hover:bg-white/10 hover:text-white'}"
				>
					التصحيح
				</button>
			</div>
		{/if}
	</div>
{/if}
