<script lang="ts">
	import { page } from '$app/state';
	import {
		BookOpen,
		ChevronLeft,
		Clock,
		Lock,
		LogIn,
		PlayCircle,
		Sparkles,
		UserPlus,
		Video,
		ArrowRight
	} from 'lucide-svelte';
	import SeoJsonLd from '#lib/components/SeoJsonLd.svelte';
	import InteractiveVideoPlayer from '#lib/modules/VideoStudio/InteractiveVideoPlayer.svelte';
	import { formatTimestamp } from '#lib/modules/VideoStudio/transcript-parser';

	let { data } = $props();

	let video = $derived(data.video);
	let bc = $derived(data.breadcrumb);
	let portalBase = $derived(data.dynamicPortalUrl || '');
	let nextQuery = $derived(`?next=${encodeURIComponent(`/videos/${video.slug}`)}`);

	function toIsoDuration(sec: number): string | undefined {
		const s = Math.floor(sec || 0);
		if (s <= 0) return undefined;
		const h = Math.floor(s / 3600);
		const m = Math.floor((s % 3600) / 60);
		const rem = s % 60;
		return `PT${h > 0 ? `${h}H` : ''}${m > 0 ? `${m}M` : ''}${rem}S`;
	}

	let seoSchemas = $derived.by(() => {
		const origin = page.url.origin;
		const videoUrl = `${origin}/videos/${video.slug}`;
		const isoDur = toIsoDuration(video.durationSec);

		const videoObject: Record<string, unknown> = {
			'@context': 'https://schema.org',
			'@type': 'VideoObject',
			name: video.titleAr || video.title,
			description:
				video.description ||
				`درس فيديو تفاعلي في ${bc.subject.nameAr} — ${bc.year.nameAr} (${bc.level.nameAr})`,
			embedUrl: video.embedUrl,
			contentUrl: videoUrl,
			inLanguage: 'ar',
			uploadDate: video.createdAt ? video.createdAt.replace(' ', 'T') + 'Z' : undefined,
			...(video.thumbnailUrl ? { thumbnailUrl: [video.thumbnailUrl] } : {}),
			...(isoDur ? { duration: isoDur } : {})
		};

		const breadcrumbSchema: Record<string, unknown> = {
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: [
				{ '@type': 'ListItem', position: 1, name: 'الرئيسية', item: origin },
				{
					'@type': 'ListItem',
					position: 2,
					name: bc.level.nameAr,
					item: `${origin}/${bc.level.slug}`
				},
				{
					'@type': 'ListItem',
					position: 3,
					name: bc.year.nameAr,
					item: `${origin}/${bc.level.slug}/${bc.year.slug}`
				},
				{
					'@type': 'ListItem',
					position: 4,
					name: bc.subject.nameAr,
					item: `${origin}/${bc.level.slug}/${bc.year.slug}/${bc.subject.slug}`
				},
				{
					'@type': 'ListItem',
					position: 5,
					name: video.titleAr || video.title,
					item: videoUrl
				}
			]
		};

		return [videoObject, breadcrumbSchema];
	});

	const PROVIDER_LABELS: Record<string, string> = {
		youtube: 'YouTube',
		cloudflare_stream: 'Cloudflare Stream',
		external: 'فيديو تعليمي'
	};
</script>

<svelte:head>
	<title>{video.titleAr || video.title} — فيديو تفاعلي | SujetStore</title>
	<meta
		name="description"
		content={video.description ||
			`شاهد درس ${video.titleAr} (${bc.subject.nameAr} - ${bc.year.nameAr}) مع تفريغ نصي متزامن وأسئلة تفاعلية.`}
	/>
</svelte:head>

<SeoJsonLd schema={seoSchemas} />

<div class="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8" dir="rtl">
	<!-- Breadcrumb -->
	<nav class="text-muted-foreground flex flex-wrap items-center gap-1.5 text-xs font-semibold">
		<a href="/" class="hover:text-foreground transition">الرئيسية</a>
		<ChevronLeft size={14} />
		<a href={`/${bc.level.slug}`} class="hover:text-foreground transition">{bc.level.nameAr}</a>
		<ChevronLeft size={14} />
		<a href={`/${bc.level.slug}/${bc.year.slug}`} class="hover:text-foreground transition">
			{bc.year.nameAr}
		</a>
		<ChevronLeft size={14} />
		<a
			href={`/${bc.level.slug}/${bc.year.slug}/${bc.subject.slug}`}
			class="hover:text-foreground transition"
		>
			{bc.subject.nameAr}
		</a>
		<ChevronLeft size={14} />
		<span class="text-foreground truncate font-bold">{video.titleAr || video.title}</span>
	</nav>

	<!-- Header Banner -->
	<header class="bg-card border-border flex flex-wrap items-start justify-between gap-4 rounded-2xl border p-5 shadow-sm">
		<div class="space-y-2">
			<div class="flex flex-wrap items-center gap-2 text-xs font-bold">
				<span class="bg-primary/15 text-primary inline-flex items-center gap-1 rounded-full px-2.5 py-0.5">
					<Video size={13} />
					درس مرئي تفاعلي
				</span>
				<span class="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5">
					{bc.subject.nameAr} · {bc.year.nameAr}
				</span>
				{#if video.trimesterNameAr}
					<span class="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5">
						{video.trimesterNameAr}
					</span>
				{/if}
				{#if video.durationSec > 0}
					<span class="bg-muted text-muted-foreground inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono" dir="ltr">
						<Clock size={12} />
						{formatTimestamp(video.durationSec)}
					</span>
				{/if}
				<span class="border-border text-muted-foreground rounded-full border px-2 py-0.5 text-[11px]" dir="ltr">
					{PROVIDER_LABELS[video.provider] || video.provider}
				</span>
			</div>

			<h1 class="text-xl font-extrabold sm:text-2xl">{video.titleAr || video.title}</h1>
			{#if video.description}
				<p class="text-muted-foreground max-w-3xl text-sm leading-relaxed">{video.description}</p>
			{/if}
		</div>

		{#if data.linkedLesson}
			<a
				href={data.linkedLesson.href}
				class="bg-primary text-primary-foreground inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-extrabold shadow-md transition hover:-translate-y-0.5 hover:opacity-95"
			>
				<BookOpen size={17} />
				<span>افتح الدرس التفاعلي: {data.linkedLesson.title}</span>
			</a>
		{/if}
	</header>

	<!-- Tier Gate or Interactive Video Player -->
	{#if data.isLocked}
		<div class="mx-auto max-w-2xl py-6">
			<div class="bg-card rounded-3xl border border-amber-500/30 p-8 text-center shadow-xl">
				<div class="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-500">
					<Lock size={38} />
				</div>
				<h2 class="mb-3 text-xl font-extrabold">هذا الدرس المرئي مقفل حالياً</h2>

				{#if data.lockReason === 'premium_required'}
					<p class="text-muted-foreground mx-auto mb-6 max-w-md text-sm leading-relaxed">
						هذا الفيديو التفاعلي مخصّص لمشتركي <span class="font-bold text-amber-500">SujetStore Pro</span>. فعّل اشتراكك للاستفادة من الشرح المرئي والأسئلة المدمجة.
					</p>
					<div class="flex flex-wrap items-center justify-center gap-3">
						<a
							href={`${portalBase}/student/activate`}
							class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-amber-500 to-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5"
						>
							<Sparkles size={18} />
							تفعيل الاشتراك / كود قسيمة
						</a>
						{#if !data.isAuthenticated}
							<a
								href={`${portalBase}/auth/login${nextQuery}`}
								class="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold transition hover:bg-black/5 dark:hover:bg-white/5"
							>
								<LogIn size={18} />
								تسجيل الدخول
							</a>
						{/if}
					</div>
				{:else}
					<p class="text-muted-foreground mx-auto mb-6 max-w-md text-sm leading-relaxed">
						هذا الفيديو مجاني ومتاح للأعضاء المسجّلين لحفظ موضع مشاهدتك ونقاط الخبرة (XP) والإجابات التفاعلية.
					</p>
					<div class="flex flex-wrap items-center justify-center gap-3">
						<a
							href={`${portalBase}/auth/register${nextQuery}`}
							class="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold shadow-lg transition hover:-translate-y-0.5"
						>
							<UserPlus size={18} />
							إنشاء حساب مجاني
						</a>
						<a
							href={`${portalBase}/auth/login${nextQuery}`}
							class="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold transition hover:bg-black/5 dark:hover:bg-white/5"
						>
							<LogIn size={18} />
							تسجيل الدخول
						</a>
					</div>
				{/if}

				<div class="mt-8 border-t pt-4">
					<a
						href={`/${bc.level.slug}/${bc.year.slug}/${bc.subject.slug}`}
						class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs font-semibold"
					>
						<ArrowRight size={14} /> العودة إلى {bc.subject.nameAr}
					</a>
				</div>
			</div>
		</div>
	{:else}
		<InteractiveVideoPlayer
			{video}
			segments={data.segments}
			cueQuestions={data.cueQuestions}
			initialStartSec={data.initialStartSec}
			initialAnsweredCueIds={data.initialAnsweredCueIds}
			isAuthenticated={data.isAuthenticated}
		/>
	{/if}

	<!-- Related Videos -->
	{#if data.relatedVideos.length > 0}
		<section class="space-y-3 pt-4">
			<h2 class="flex items-center gap-2 text-lg font-extrabold">
				<PlayCircle size={20} class="text-primary" />
				فيديوهات أخرى في {bc.subject.nameAr}
			</h2>
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.relatedVideos as rv (rv.id)}
					<a
						href={`/videos/${rv.slug}`}
						class="bg-card border-border group overflow-hidden rounded-2xl border shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
					>
						<div class="bg-muted relative aspect-video overflow-hidden">
							{#if rv.thumbnailUrl}
								<img
									src={rv.thumbnailUrl}
									alt={rv.titleAr}
									class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
								/>
							{:else}
								<div class="flex h-full w-full items-center justify-center">
									<Video size={36} class="text-muted-foreground opacity-40" />
								</div>
							{/if}
							{#if rv.durationSec > 0}
								<span
									dir="ltr"
									class="absolute bottom-2 left-2 rounded-md bg-black/75 px-2 py-0.5 font-mono text-[11px] font-bold text-white"
								>
									{formatTimestamp(rv.durationSec)}
								</span>
							{/if}
						</div>
						<div class="p-3.5">
							<h3 class="group-hover:text-primary line-clamp-2 text-sm font-bold transition">
								{rv.titleAr}
							</h3>
						</div>
					</a>
				{/each}
			</div>
		</section>
	{/if}
</div>
