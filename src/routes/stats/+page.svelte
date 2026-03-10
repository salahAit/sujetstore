<script lang="ts">
	import { onMount } from 'svelte';
	import { Eye, Download, MessageCircle, Star, FileText, TrendingUp } from 'lucide-svelte';

	let stats = $state<any>(null);
	let loading = $state(true);

	onMount(async () => {
		try {
			const res = await fetch('/api/stats/dashboard');
			stats = await res.json();
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	});

	function formatNumber(n: number): string {
		if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
		if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
		return String(n);
	}
</script>

<svelte:head>
	<title>إحصائيات المنصة - SujetStore</title>
	<meta
		name="description"
		content="إحصائيات منصة SujetStore: عدد الزيارات، التحميلات، والوثائق الأكثر شعبية."
	/>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
	<div class="mb-10 text-center">
		<h1 class="flex items-center justify-center gap-3 text-3xl font-extrabold sm:text-4xl">
			<TrendingUp size={32} class="text-blue-500" /> إحصائيات المنصة
		</h1>
		<p class="text-muted-foreground mt-3 text-lg">
			نظرة شاملة على استخدام المنصة والمحتوى الأكثر شعبية
		</p>
	</div>

	{#if loading}
		<div class="flex justify-center py-20">
			<div
				class="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
			></div>
		</div>
	{:else if stats}
		<!-- Summary Cards -->
		<div class="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
			<div class="bg-card rounded-2xl border p-5 text-center shadow-sm">
				<div
					class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-500"
				>
					<Eye size={24} />
				</div>
				<p class="text-2xl font-bold">{formatNumber(stats.totals.views)}</p>
				<p class="text-muted-foreground text-sm">زيارة</p>
			</div>
			<div class="bg-card rounded-2xl border p-5 text-center shadow-sm">
				<div
					class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500"
				>
					<Download size={24} />
				</div>
				<p class="text-2xl font-bold">{formatNumber(stats.totals.downloads)}</p>
				<p class="text-muted-foreground text-sm">تحميل</p>
			</div>
			<div class="bg-card rounded-2xl border p-5 text-center shadow-sm">
				<div
					class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-500"
				>
					<MessageCircle size={24} />
				</div>
				<p class="text-2xl font-bold">{formatNumber(stats.totals.comments)}</p>
				<p class="text-muted-foreground text-sm">تعليق</p>
			</div>
			<div class="bg-card rounded-2xl border p-5 text-center shadow-sm">
				<div
					class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500"
				>
					<Star size={24} />
				</div>
				<p class="text-2xl font-bold">{formatNumber(stats.totals.ratings)}</p>
				<p class="text-muted-foreground text-sm">تقييم</p>
			</div>
			<div class="bg-card rounded-2xl border p-5 text-center shadow-sm">
				<div
					class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10 text-purple-500"
				>
					<FileText size={24} />
				</div>
				<p class="text-2xl font-bold">{formatNumber(stats.totals.documents)}</p>
				<p class="text-muted-foreground text-sm">وثيقة</p>
			</div>
		</div>

		<!-- 7-Day Chart -->
		{#if stats.last7Days.length > 0}
			<section class="mb-12">
				<h2 class="mb-6 text-xl font-bold">الزيارات في آخر 7 أيام</h2>
				<div class="bg-card rounded-2xl border p-6 shadow-sm">
					<div class="flex items-end justify-between gap-2" style="height: 200px;">
						{#each stats.last7Days as day}
							{@const maxViews = Math.max(...stats.last7Days.map((d) => d.views || 0), 1)}
							<div class="flex flex-1 flex-col items-center gap-2">
								<div
									class="w-full rounded-t-lg bg-linear-to-t from-blue-600 to-blue-400 transition-all duration-500"
									style="height: {Math.max(((day.views || 0) / maxViews) * 160, 4)}px"
								></div>
								<span class="text-muted-foreground text-[10px]">
									{new Date(day.date).toLocaleDateString('ar-DZ', { weekday: 'short' })}
								</span>
								<span class="text-xs font-semibold">{day.views || 0}</span>
							</div>
						{/each}
					</div>
				</div>
			</section>
		{/if}

		<!-- Top Documents -->
		{#if stats.topDocs.length > 0}
			<section>
				<h2 class="mb-6 text-xl font-bold">الوثائق الأكثر مشاهدة</h2>
				<div class="space-y-3">
					{#each stats.topDocs as doc, i}
						{@const maxV = stats.topDocs[0]?.views || 1}
						<div class="bg-card flex items-center gap-4 rounded-xl border p-4 shadow-sm">
							<span
								class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-bold text-blue-500"
							>
								{i + 1}
							</span>
							<div class="min-w-0 flex-1">
								<p class="truncate font-bold">{doc.titleAr || doc.title}</p>
								<div class="text-muted-foreground mt-1 flex items-center gap-4 text-xs">
									<span class="flex items-center gap-1"><Eye size={12} /> {doc.views}</span>
									<span class="flex items-center gap-1"><Download size={12} /> {doc.downloads}</span
									>
								</div>
							</div>
							<div class="bg-muted hidden h-2 w-32 overflow-hidden rounded-full sm:block">
								<div
									class="h-full rounded-full bg-blue-500 transition-all"
									style="width: {(doc.views / maxV) * 100}%"
								></div>
							</div>
						</div>
					{/each}
				</div>
			</section>
		{/if}
	{/if}
</div>
