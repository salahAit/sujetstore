<script lang="ts">
	import {
		Printer,
		Download,
		Maximize2,
		Minimize2,
		Share2,
		FileText,
		FileEdit,
		CheckCircle,
		Star,
		MessageCircle,
		Send,
		Lock,
		ArrowRight,
		LogIn,
		Sparkles
	} from 'lucide-svelte';
	import { onMount } from 'svelte';
	import InteractiveLessonPlayer from '#lib/modules/InteractiveLesson/InteractiveLessonPlayer.svelte';
	import SeoJsonLd from '#lib/components/SeoJsonLd.svelte';
	import SmartExamReader from '#lib/components/SmartExamReader.svelte';
	import type { InteractiveLessonData } from '#lib/modules/MathTemplates/types';

	let { data }: { data: any } = $props();

	let activeTab = $state<'exam' | 'solution'>('exam');
	let lessonViewMode = $state<'interactive' | 'pdf'>('interactive');
	let isFullscreen = $state(false);

	let doc = $derived(data.document);
	let subject = $derived(data.subject);
	let year = $derived(data.year);
	let level = $derived(data.level);
	let relatedDocs = $derived(data.relatedDocs || []);
	let accessCheck = $derived(data.accessCheck || { allowed: true, tier: 'public', dynamicPortalUrl: '' });
	let dynamicBase = $derived(accessCheck.dynamicPortalUrl || '');

	function parseInteractiveLesson(rawDoc: any): InteractiveLessonData | null {
		if (!rawDoc || rawDoc.type !== 'lesson' || !rawDoc.content) return null;
		try {
			const parsed =
				typeof rawDoc.content === 'string' ? JSON.parse(rawDoc.content) : rawDoc.content;
			if (
				parsed &&
				typeof parsed === 'object' &&
				parsed.discover &&
				typeof parsed.discover === 'object' &&
				Array.isArray(parsed.discover.steps) &&
				parsed.summary &&
				typeof parsed.summary === 'object' &&
				Array.isArray(parsed.summary.rulesAr) &&
				Array.isArray(parsed.practice)
			) {
				return parsed as InteractiveLessonData;
			}
		} catch {
			return null;
		}
		return null;
	}

	let parsedLesson = $derived(parseInteractiveLesson(doc));
	let showInteractiveLesson = $derived(
		Boolean(parsedLesson && accessCheck.allowed && (!doc.pdfUrl || lessonViewMode === 'interactive'))
	);

	let lastDocId = $state<number | string | null>(null);
	$effect(() => {
		const currentDocId = doc?.id ?? null;
		if (lastDocId !== null && lastDocId !== currentDocId) {
			lessonViewMode = 'interactive';
			activeTab = 'exam';
		}
		lastDocId = currentDocId;
	});

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

	function trackDownload() {
		fetch('/api/stats', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ docId: doc.id, action: 'download' })
		}).catch(() => {});
	}

	async function shareDoc() {
		const url = window.location.href;
		const title = doc.titleAr || doc.title;
		if (navigator.share) {
			try {
				await navigator.share({ title, url });
			} catch {}
		} else {
			await navigator.clipboard.writeText(url);
		}
	}

	// === Ratings ===
	let avgRating = $state(0);
	let totalRatings = $state(0);
	let userRating = $state(0);
	let hoverRating = $state(0);

	async function loadRating() {
		try {
			const res = await fetch(`/api/ratings?docId=${doc.id}`);
			if (!res.ok) return;
			const payload = await res.json();
			avgRating = payload.average || 0;
			totalRatings = payload.total || 0;
		} catch {}
	}

	async function submitRating(value: number) {
		userRating = value;
		try {
			await fetch('/api/ratings', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ docId: doc.id, rating: value })
			});
			await loadRating();
		} catch {}
	}

	// === Comments ===
	let comments = $state<any[]>([]);
	let commentAuthor = $state('');
	let commentText = $state('');
	let posting = $state(false);

	async function loadComments() {
		try {
			const res = await fetch(`/api/comments?docId=${doc.id}`);
			if (!res.ok) return;
			const payload = await res.json();
			comments = payload.comments || [];
		} catch {}
	}

	async function postComment() {
		if (!commentAuthor.trim() || !commentText.trim()) return;
		posting = true;
		try {
			await fetch('/api/comments', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					docId: doc.id,
					authorName: commentAuthor.trim(),
					content: commentText.trim()
				})
			});
			commentText = '';
			await loadComments();
		} finally {
			posting = false;
		}
	}

	function timeAgo(dateStr: string): string {
		const d = new Date(dateStr);
		const now = Date.now();
		const diff = Math.floor((now - d.getTime()) / 1000);
		if (diff < 60) return 'الآن';
		if (diff < 3600) return `منذ ${Math.floor(diff / 60)} د`;
		if (diff < 86400) return `منذ ${Math.floor(diff / 3600)} س`;
		return `منذ ${Math.floor(diff / 86400)} ي`;
	}

	let docJsonLd = $derived.by(() => {
		const origin = 'https://sujetstore.com';
		const docUrl = `${origin}/${level.slug}/${year.slug}/${subject.slug}/${doc.slug}`;
		return [
			{
				'@context': 'https://schema.org',
				'@type': 'BreadcrumbList',
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: 'الرئيسية', item: origin },
					{ '@type': 'ListItem', position: 2, name: level.nameAr, item: `${origin}/${level.slug}` },
					{ '@type': 'ListItem', position: 3, name: year.nameAr, item: `${origin}/${level.slug}/${year.slug}` },
					{ '@type': 'ListItem', position: 4, name: subject.nameAr, item: `${origin}/${level.slug}/${year.slug}/${subject.slug}` },
					{ '@type': 'ListItem', position: 5, name: doc.titleAr || doc.title, item: docUrl }
				]
			},
			{
				'@context': 'https://schema.org',
				'@type': 'LearningResource',
				name: doc.titleAr || doc.title,
				description: `${doc.titleAr || doc.title} | ${subject.nameAr} - ${year.nameAr}`,
				url: docUrl,
				educationalLevel: `${level.nameAr} — ${year.nameAr}`,
				learningResourceType: typeLabels[doc.type] || doc.type,
				isAccessibleForFree: !doc.accessTier || doc.accessTier === 'public' || doc.accessTier === 'free',
				provider: {
					'@type': 'EducationalOrganization',
					name: 'SujetStore',
					sameAs: origin
				}
			}
		];
	});

	onMount(() => {
		fetch('/api/stats', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ docId: doc.id, action: 'view' })
		}).catch(() => {});

		loadRating();
		loadComments();
	});
</script>

<SeoJsonLd schema={docJsonLd} />

<svelte:head>
	<title>{doc.titleAr || doc.title} - SujetStore</title>
	<meta property="og:title" content="{doc.titleAr || doc.title} - SujetStore" />
	<meta
		property="og:description"
		content="{doc.titleAr || doc.title} | {subject.nameAr} - {year.nameAr}"
	/>
	<meta property="og:type" content="article" />
</svelte:head>

<!-- Breadcrumb & Header -->
<div class="border-b border-black/5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
	<div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
		<nav class="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
			<a href="/" class="hover:text-foreground transition-colors">الرئيسية</a>
			<span class="opacity-50">/</span>
			<a href="/{level.slug}" class="hover:text-foreground transition-colors">{level.nameAr}</a>
			<span class="opacity-50">/</span>
			<a href="/{level.slug}/{year.slug}" class="hover:text-foreground transition-colors">{year.nameAr}</a>
			<span class="opacity-50">/</span>
			<a
				href="/{level.slug}/{year.slug}/{subject.slug}"
				class="hover:text-foreground transition-colors">{subject.nameAr}</a
			>
			<span class="opacity-50">/</span>
			<span class="text-foreground max-w-[220px] truncate font-semibold">{doc.titleAr || doc.title}</span>
		</nav>

		<a
			href="/{level.slug}/{year.slug}/{subject.slug}"
			class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs font-bold"
		>
			<ArrowRight size={15} />
			العودة إلى المادة
		</a>
	</div>
</div>

<!-- Document Viewer Section -->
<section class="mx-auto max-w-6xl px-4 py-6 sm:px-6">
	<div
		class={isFullscreen
			? 'bg-background/95 fixed inset-0 z-50 flex flex-col p-2 backdrop-blur-sm sm:p-6'
			: 'bg-card border-border flex flex-col overflow-hidden rounded-2xl border shadow-lg'}
	>
		<!-- Toolbar -->
		<div
			class="border-border bg-muted/40 flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3"
		>
			<div class="flex min-w-0 flex-wrap items-center gap-2">
				<h1 class="truncate text-base font-extrabold sm:text-lg">
					{doc.titleAr || doc.title}
				</h1>
				<span class="badge-{doc.type} rounded-full border px-2 py-0.5 text-xs font-semibold">
					{typeLabels[doc.type] || doc.type}
				</span>
				{#if doc.accessTier === 'premium'}
					<span class="rounded-full border border-amber-500/30 bg-amber-500/15 px-2.5 py-0.5 text-xs font-bold text-amber-500">
						مشترك مميز
					</span>
				{:else if doc.accessTier === 'registered'}
					<span class="rounded-full border border-blue-500/30 bg-blue-500/15 px-2.5 py-0.5 text-xs font-bold text-blue-500">
						للمسجلين
					</span>
				{:else}
					<span class="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-xs font-bold text-emerald-500">
						مجاني
					</span>
				{/if}
			</div>

			<div class="flex flex-wrap items-center gap-2">
				{#if accessCheck.allowed}
					{#if parsedLesson && doc.pdfUrl}
						<div class="border-border bg-background flex items-center rounded-xl border p-1">
							<button
								onclick={() => (lessonViewMode = 'interactive')}
								class="rounded-lg px-3 py-1 text-xs font-bold transition {lessonViewMode === 'interactive'
									? 'bg-blue-600 text-white'
									: 'text-muted-foreground hover:text-foreground'}"
							>
								الدرس التفاعلي
							</button>
							<button
								onclick={() => (lessonViewMode = 'pdf')}
								class="rounded-lg px-3 py-1 text-xs font-bold transition {lessonViewMode === 'pdf'
									? 'bg-blue-600 text-white'
									: 'text-muted-foreground hover:text-foreground'}"
							>
								نسخة PDF للطباعة
							</button>
						</div>
					{/if}

					{#if doc.hasSolution && doc.solutionUrl && (!parsedLesson || lessonViewMode === 'pdf')}
						<div class="border-border bg-background flex items-center rounded-xl border p-1">
							<button
								onclick={() => (activeTab = 'exam')}
								class="rounded-lg px-3 py-1 text-xs font-bold transition {activeTab === 'exam'
									? 'bg-primary text-primary-foreground'
									: 'text-muted-foreground hover:text-foreground'}"
							>
								الموضوع
							</button>
							<button
								onclick={() => (activeTab = 'solution')}
								class="rounded-lg px-3 py-1 text-xs font-bold transition {activeTab === 'solution'
									? 'bg-emerald-600 text-white'
									: 'text-muted-foreground hover:text-foreground'}"
							>
								الحل
							</button>
						</div>
					{/if}

					{#if activeTab === 'exam' && doc.pdfUrl}
						<button
							onclick={() => printDoc(doc.pdfUrl)}
							class="border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 flex h-9 w-9 items-center justify-center rounded-lg border transition"
							title="طباعة الموضوع"
						>
							<Printer size={18} />
						</button>
						<a
							href={doc.pdfUrl + (doc.pdfUrl.includes('?') ? '&download=1' : '?download=1')}
							download
							target="_blank"
							onclick={trackDownload}
							class="bg-primary text-primary-foreground flex h-9 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold shadow-sm transition hover:opacity-90"
						>
							<Download size={16} /> <span class="hidden sm:inline">تحميل الموضوع</span>
						</a>
					{:else if activeTab === 'solution' && doc.solutionUrl}
						<button
							onclick={() => printDoc(doc.solutionUrl)}
							class="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 transition hover:bg-emerald-500/20"
							title="طباعة التصحيح"
						>
							<Printer size={18} />
						</button>
						<a
							href={doc.solutionUrl + (doc.solutionUrl.includes('?') ? '&download=1' : '?download=1')}
							download
							target="_blank"
							onclick={trackDownload}
							class="flex h-9 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
						>
							<Download size={16} /> <span class="hidden sm:inline">تحميل الحل</span>
						</a>
					{/if}

					<button
						onclick={() => (isFullscreen = !isFullscreen)}
						class="border-border bg-background hover:bg-muted flex h-9 w-9 items-center justify-center rounded-lg border transition"
						title={isFullscreen ? 'تصغير العرض' : 'ملء الشاشة'}
					>
						{#if isFullscreen}
							<Minimize2 size={17} />
						{:else}
							<Maximize2 size={17} />
						{/if}
					</button>
				{/if}

				<button
					onclick={shareDoc}
					class="border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 flex h-9 w-9 items-center justify-center rounded-lg border transition"
					title="مشاركة"
				>
					<Share2 size={17} />
				</button>
			</div>
		</div>

		<!-- Body -->
		{#if !accessCheck.allowed}
			<div class="flex min-h-[420px] flex-col items-center justify-center p-8 text-center">
				<div
					class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl {accessCheck.reason === 'premium_required'
						? 'bg-amber-500/15 text-amber-500'
						: 'bg-blue-500/15 text-blue-500'}"
				>
					<Lock size={32} />
				</div>

				{#if accessCheck.reason === 'premium_required'}
					<h2 class="mb-2 text-2xl font-extrabold">محتوى مخصص للمشتركين المميزين</h2>
					<p class="text-muted-foreground mb-6 max-w-md text-sm leading-relaxed">
						هذا الموضوع وتصحيحه النموذجي متاح لأصحاب الاشتراك المميز (أو عبر كود التفعيل). اشترك الآن للاستفادة من جميع المواضيع والاختبارات الحصرية.
					</p>
					<div class="flex flex-wrap justify-center gap-3">
						<a
							href={`${dynamicBase}/student/activate`}
							class="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-white shadow transition hover:bg-amber-600"
						>
							<Sparkles size={17} />
							تفعيل الاشتراك أو كود البطاقة
						</a>
						<a
							href={`${dynamicBase}/auth/login`}
							class="border-border bg-muted inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold transition hover:opacity-80"
						>
							<LogIn size={17} />
							تسجيل الدخول
						</a>
					</div>
				{:else}
					<h2 class="mb-2 text-2xl font-extrabold">محتوى متاح مجاناً للتلاميذ المسجلين</h2>
					<p class="text-muted-foreground mb-6 max-w-md text-sm leading-relaxed">
						أنشئ حساباً مجانياً خلال ثوانٍ أو سجل الدخول لفتح وتحميل هذا الموضوع وحفظ تقدمك ونتائجك.
					</p>
					<div class="flex flex-wrap justify-center gap-3">
						<a
							href={`${dynamicBase}/auth/register`}
							class="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold shadow transition hover:opacity-90"
						>
							إنشاء حساب مجاني
						</a>
						<a
							href={`${dynamicBase}/auth/login`}
							class="border-border bg-muted inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold transition hover:opacity-80"
						>
							<LogIn size={17} />
							لدي حساب بالفعل
						</a>
					</div>
				{/if}
			</div>
		{:else if showInteractiveLesson && parsedLesson}
			<div
				class={isFullscreen
					? 'bg-background flex-1 overflow-y-auto p-4 sm:p-6'
					: 'bg-background/40 p-4 sm:p-6'}
			>
				{#key parsedLesson.id}
					<InteractiveLessonPlayer lesson={parsedLesson} />
				{/key}
			</div>
		{:else}
			<div class="relative w-full overflow-hidden bg-white {isFullscreen ? 'flex-1' : 'h-[80vh] min-h-[540px]'}">
				{#if doc.pdfUrl}
					<SmartExamReader
						subjectUrl={doc.pdfUrl}
						solutionUrl={doc.solutionUrl}
						bind:mode={activeTab}
						title={doc.titleAr || doc.title}
					/>
					{#if doc.hasSolution && doc.solutionUrl}
						<div
							class="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-zinc-900/90 p-1 shadow-2xl backdrop-blur-md"
						>
							<button
								type="button"
								onclick={() => (activeTab = 'exam')}
								class="rounded-full px-4 py-1.5 text-xs font-bold transition-all {activeTab === 'exam'
									? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
									: 'text-white/75 hover:bg-white/10 hover:text-white'}"
							>
								الموضوع
							</button>
							<button
								type="button"
								onclick={() => (activeTab = 'solution')}
								class="rounded-full px-4 py-1.5 text-xs font-bold transition-all {activeTab === 'solution'
									? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
									: 'text-white/75 hover:bg-white/10 hover:text-white'}"
							>
								الحل
							</button>
						</div>
					{/if}
				{:else}
					<div class="flex h-full w-full items-center justify-center text-zinc-500">
						لا يوجد ملف لعرضه بصيغة PDF
					</div>
				{/if}
			</div>
		{/if}
	</div>
</section>

<!-- Related Documents -->
{#if relatedDocs.length > 0}
	<section class="py-6">
		<div class="mx-auto max-w-6xl px-4 sm:px-6">
			<h3 class="mb-4 text-lg font-bold">وثائق ذات صلة</h3>
			<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{#each relatedDocs as rdoc}
					<a
						href="/{level.slug}/{year.slug}/{subject.slug}/{rdoc.slug}"
						class="bg-card border-border flex items-center gap-3 rounded-xl border p-3 transition-all hover:bg-muted/50"
					>
						<div class="text-muted-foreground bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
							{#if rdoc.type === 'test'}
								<FileEdit size={18} />
							{:else}
								<FileText size={18} />
							{/if}
						</div>
						<div class="min-w-0 flex-1">
							<p class="truncate text-sm font-bold">{rdoc.titleAr || rdoc.title}</p>
							<div class="mt-0.5 flex items-center gap-1.5">
								<span class="badge-{rdoc.type} rounded border px-1.5 py-0.5 text-[10px]">
									{typeLabels[rdoc.type] || rdoc.type}
								</span>
								{#if rdoc.accessTier !== 'public'}
									<Lock size={11} class="text-amber-500" />
								{/if}
							</div>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Ratings & Comments Section -->
<section class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
	<div class="bg-card border-border mb-8 rounded-2xl border p-6 shadow-sm">
		<h3 class="mb-4 flex items-center gap-2 text-lg font-bold">
			<Star size={20} class="text-yellow-500" /> قيّم هذه الوثيقة
		</h3>
		<div class="flex items-center gap-4">
			<div class="flex gap-1">
				{#each [1, 2, 3, 4, 5] as star}
					<button
						onclick={() => submitRating(star)}
						onmouseenter={() => (hoverRating = star)}
						onmouseleave={() => (hoverRating = 0)}
						class="transition-transform hover:scale-110"
					>
						<Star
							size={28}
							class="{(hoverRating || userRating || avgRating) >= star
								? 'fill-yellow-400 text-yellow-400'
								: 'text-muted-foreground'} transition-colors"
						/>
					</button>
				{/each}
			</div>
			<span class="text-muted-foreground text-sm">
				{avgRating.toFixed(1)} / 5 ({totalRatings} تقييم)
			</span>
		</div>
	</div>

	<div class="bg-card border-border rounded-2xl border p-6 shadow-sm">
		<h3 class="mb-6 flex items-center gap-2 text-lg font-bold">
			<MessageCircle size={20} class="text-blue-500" /> التعليقات ({comments.length})
		</h3>

		<div class="border-border mb-6 space-y-3 border-b pb-6">
			<input
				bind:value={commentAuthor}
				type="text"
				placeholder="اسمك..."
				class="bg-muted border-border w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-500"
				maxlength="50"
			/>
			<div class="flex gap-2">
				<input
					bind:value={commentText}
					type="text"
					placeholder="أضف تعليقاً..."
					class="bg-muted border-border flex-1 rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-500"
					maxlength="1000"
					onkeydown={(e) => e.key === 'Enter' && postComment()}
				/>
				<button
					onclick={postComment}
					disabled={posting || !commentAuthor.trim() || !commentText.trim()}
					class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
				>
					<Send size={16} />
				</button>
			</div>
		</div>

		{#if comments.length === 0}
			<p class="text-muted-foreground py-8 text-center text-sm">
				لا توجد تعليقات بعد. كن أول من يعلّق!
			</p>
		{:else}
			<div class="space-y-4">
				{#each comments as c}
					<div class="border-border border-b pb-4 last:border-0 last:pb-0">
						<div class="flex items-center justify-between">
							<span class="text-sm font-bold text-blue-500">{c.authorName}</span>
							<span class="text-muted-foreground text-[11px]">{timeAgo(c.createdAt)}</span>
						</div>
						<p class="text-muted-foreground mt-1 text-sm leading-relaxed">{c.content}</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>
