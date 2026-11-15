<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Eye, EyeOff, Clock, Rocket, Sparkles, Globe, CheckCircle2, AlertCircle, Layers } from 'lucide-svelte';

	let { data }: { data: any } = $props();

	let busyKey = $state<string | null>(null);
	let buildingStatic = $state(false);
	let staticResult = $state<any>(null);
	let statusBanner = $state<{ ok: boolean; text: string } | null>(null);

	let dynamicPortalUrl = $state('');
	let publicPortalUrl = $state('');

	$effect(() => {
		dynamicPortalUrl = data.settings?.dynamic_portal_url ?? '';
		publicPortalUrl = data.settings?.public_portal_url ?? '';
	});

	const visMeta: Record<string, { label: string; cls: string }> = {
		published: { label: 'منشور', cls: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30' },
		coming_soon: { label: 'قريباً', cls: 'bg-amber-500/15 text-amber-500 border-amber-500/30' },
		hidden: { label: 'مخفي', cls: 'bg-muted text-muted-foreground border-border' }
	};

	async function setNodeVisibility(targetType: string, id: string | number, visibility: string) {
		const key = `${targetType}:${id}`;
		busyKey = key;
		statusBanner = null;
		try {
			const res = await fetch('/api/admin/visibility', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ targetType, id, visibility })
			});
			const out = await res.json();
			if (!res.ok) throw new Error(out.error || 'فشل التحديث');
			await invalidateAll();
			statusBanner = { ok: true, text: 'تم تحديث حالة الظهور بنجاح.' };
		} catch (err: any) {
			statusBanner = { ok: false, text: err.message };
		} finally {
			busyKey = null;
		}
	}

	async function runPreset(preset: string, levelId?: string) {
		busyKey = `preset:${preset}:${levelId ?? ''}`;
		statusBanner = null;
		try {
			const res = await fetch('/api/admin/visibility', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ preset, levelId })
			});
			const out = await res.json();
			if (!res.ok) throw new Error(out.error || 'فشل تطبيق الإعداد');
			await invalidateAll();
			statusBanner = { ok: true, text: 'تم تطبيق قالب النشر المحدد بنجاح.' };
		} catch (err: any) {
			statusBanner = { ok: false, text: err.message };
		} finally {
			busyKey = null;
		}
	}

	async function saveSetting(settingKey: string, settingValue: string) {
		busyKey = `setting:${settingKey}`;
		statusBanner = null;
		try {
			const res = await fetch('/api/admin/visibility', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ settingKey, settingValue })
			});
			const out = await res.json();
			if (!res.ok) throw new Error(out.error || 'فشل الحفظ');
			await invalidateAll();
			statusBanner = { ok: true, text: 'تم حفظ إعداد البوابة.' };
		} catch (err: any) {
			statusBanner = { ok: false, text: err.message };
		} finally {
			busyKey = null;
		}
	}

	async function triggerStaticBuild() {
		buildingStatic = true;
		staticResult = null;
		statusBanner = null;
		try {
			const res = await fetch('/api/admin/build-static', { method: 'POST' });
			const out = await res.json();
			if (!res.ok || !out.success) throw new Error(out.error || 'فشل التوليد الثابت');
			staticResult = out;
			statusBanner = {
				ok: true,
				text: `تم توليد الموقع الثابت بدون قاعدة بيانات في ${out.outputDir} (${out.pagesCount} صفحة).`
			};
		} catch (err: any) {
			statusBanner = { ok: false, text: err.message };
		} finally {
			buildingStatic = false;
		}
	}
</script>

<svelte:head>
	<title>التحكم في الظهور والنشر الثابت - SujetStore</title>
</svelte:head>

<div class="space-y-8">
	<div class="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
		<div>
			<h1 class="flex items-center gap-2 text-3xl font-extrabold">
				<Layers class="text-primary" size={28} />
				التحكم في الظهور والنشر التدريجي
			</h1>
			<p class="text-muted-foreground mt-1 text-sm">
				اختر الأطوار والسنوات والمواد الظاهرة للجمهور، ثم ولّد نسخة الموقع العام الثابتة (Zero-Runtime).
			</p>
		</div>

		<div class="flex flex-wrap gap-2">
			<button
				onclick={() => runPreset('moyen_math_only')}
				disabled={busyKey !== null}
				class="inline-flex items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-600 transition hover:bg-blue-500/20 dark:text-blue-400"
			>
				<Sparkles size={16} />
				رياضيات المتوسط فقط
			</button>

			<button
				onclick={triggerStaticBuild}
				disabled={buildingStatic}
				class="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold shadow transition hover:opacity-90 disabled:opacity-50"
			>
				<Rocket size={16} />
				{buildingStatic ? 'جاري التوليد...' : 'توليد الموقع العام الثابت (build-static)'}
			</button>
		</div>
	</div>

	{#if statusBanner}
		<div
			class="flex items-center gap-3 rounded-xl border p-4 text-sm font-bold {statusBanner.ok
				? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
				: 'border-red-500/30 bg-red-500/10 text-red-500'}"
		>
			{#if statusBanner.ok}
				<CheckCircle2 size={18} />
			{:else}
				<AlertCircle size={18} />
			{/if}
			<span>{statusBanner.text}</span>
		</div>
	{/if}

	{#if staticResult}
		<div class="bg-card border-border rounded-2xl border p-5 text-sm shadow-sm">
			<div class="font-bold text-emerald-500">نتيجة آخر بناء للموقع العام الثابت:</div>
			<div class="text-muted-foreground mt-2 flex flex-wrap gap-6">
				<span>عدد الصفحات: <strong class="text-foreground">{staticResult.pagesCount}</strong></span>
				<span>الملفات المنسوخة: <strong class="text-foreground">{staticResult.assetsCount}</strong></span>
				<span>المسار: <code dir="ltr" class="bg-muted rounded px-2 py-0.5">{staticResult.outputDir}</code></span>
			</div>
		</div>
	{/if}

	<!-- Summary cards -->
	<div class="grid grid-cols-2 gap-4 sm:grid-cols-5">
		<div class="bg-card border-border rounded-2xl border p-4 text-center">
			<div class="text-2xl font-extrabold text-emerald-500">{data.summary?.pubLevels ?? 0}</div>
			<div class="text-muted-foreground text-xs">أطوار منشورة</div>
		</div>
		<div class="bg-card border-border rounded-2xl border p-4 text-center">
			<div class="text-2xl font-extrabold text-blue-500">{data.summary?.pubYears ?? 0}</div>
			<div class="text-muted-foreground text-xs">سنوات منشورة</div>
		</div>
		<div class="bg-card border-border rounded-2xl border p-4 text-center">
			<div class="text-2xl font-extrabold text-purple-500">{data.summary?.pubSubjects ?? 0}</div>
			<div class="text-muted-foreground text-xs">مواد منشورة</div>
		</div>
		<div class="bg-card border-border rounded-2xl border p-4 text-center">
			<div class="text-2xl font-extrabold text-orange-500">{data.summary?.pubDocs ?? 0}</div>
			<div class="text-muted-foreground text-xs">وثائق منشورة</div>
		</div>
		<div class="bg-card border-border rounded-2xl border p-4 text-center">
			<div class="text-2xl font-extrabold text-pink-500">{data.summary?.pubQuizzes ?? 0}</div>
			<div class="text-muted-foreground text-xs">تمارين تفاعلية</div>
		</div>
	</div>

	<!-- Split Architecture Portal URLs -->
	<div class="bg-card border-border rounded-2xl border p-6 shadow-sm">
		<h2 class="mb-3 flex items-center gap-2 text-lg font-bold">
			<Globe size={18} class="text-primary" />
			إعدادات فصل الخادم التفاعلي عن الموقع الثابت
		</h2>
		<p class="text-muted-foreground mb-4 text-xs">
			عند نشر الموقع العام كملفات ثابتة على CDN، وجّه أزرار التسجيل والدفع والتمارين المدفوعة إلى رابط الخادم التفاعلي (مثل
			<code dir="ltr">https://app.sujetstore.com</code>). اتركه فارغاً في وضع الخادم الواحد.
		</p>
		<div class="grid gap-4 md:grid-cols-2">
			<div class="flex gap-2">
				<input
					type="url"
					dir="ltr"
					bind:value={dynamicPortalUrl}
					placeholder="https://app.sujetstore.com"
					class="border-input bg-background flex-1 rounded-xl border px-3 py-2 text-sm"
				/>
				<button
					onclick={() => saveSetting('dynamic_portal_url', dynamicPortalUrl)}
					class="bg-primary text-primary-foreground rounded-xl px-4 py-2 text-sm font-bold"
				>
					حفظ رابط التطبيق
				</button>
			</div>
			<div class="flex gap-2">
				<input
					type="url"
					dir="ltr"
					bind:value={publicPortalUrl}
					placeholder="https://sujetstore.com"
					class="border-input bg-background flex-1 rounded-xl border px-3 py-2 text-sm"
				/>
				<button
					onclick={() => saveSetting('public_portal_url', publicPortalUrl)}
					class="border-border bg-muted rounded-xl border px-4 py-2 text-sm font-bold"
				>
					حفظ الرابط العام
				</button>
			</div>
		</div>
	</div>

	<!-- Hierarchical Tree -->
	<div class="space-y-6">
		{#each data.tree as level}
			<div class="bg-card border-border overflow-hidden rounded-2xl border shadow-sm">
				<!-- Level Header -->
				<div class="border-border bg-muted/40 flex flex-wrap items-center justify-between gap-4 border-b p-5">
					<div class="flex items-center gap-3">
						<span class="text-2xl">{level.icon || '📚'}</span>
						<div>
							<h2 class="text-xl font-extrabold">{level.nameAr}</h2>
							<span class="text-muted-foreground text-xs" dir="ltr">/{level.slug}</span>
						</div>
						<span class="rounded-full border px-2.5 py-0.5 text-xs font-bold {visMeta[level.visibility]?.cls}">
							{visMeta[level.visibility]?.label || level.visibility}
						</span>
					</div>

					<div class="flex flex-wrap items-center gap-2">
						{#each [
							{ val: 'published', label: 'نشر الطور', Icon: Eye },
							{ val: 'coming_soon', label: 'قريباً', Icon: Clock },
							{ val: 'hidden', label: 'إخفاء الطور', Icon: EyeOff }
						] as opt}
							<button
								onclick={() => setNodeVisibility('level', level.id, opt.val)}
								disabled={busyKey === `level:${level.id}`}
								class="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold transition {level.visibility === opt.val
									? 'border-primary bg-primary text-primary-foreground'
									: 'border-border bg-background hover:bg-muted'}"
							>
								<opt.Icon size={14} />
								{opt.label}
							</button>
						{/each}
						<button
							onclick={() => runPreset('publish_level', level.id)}
							class="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg border px-3 py-1.5 text-xs font-bold hover:bg-emerald-500/20"
						>
							نشر كل سنوات ومواد الطور
						</button>
					</div>
				</div>

				<!-- Years -->
				<div class="divide-y divide-border">
					{#each level.years as yr}
						<div class="p-5">
							<div class="mb-3 flex flex-wrap items-center justify-between gap-3">
								<div class="flex items-center gap-2">
									<h3 class="text-base font-bold">{yr.nameAr}</h3>
									<span class="text-muted-foreground text-xs" dir="ltr">({yr.id})</span>
									<span class="rounded-full border px-2 py-0.5 text-[11px] font-bold {visMeta[yr.visibility]?.cls}">
										{visMeta[yr.visibility]?.label}
									</span>
								</div>
								<div class="flex items-center gap-1.5">
									{#each ['published', 'coming_soon', 'hidden'] as v}
										<button
											onclick={() => setNodeVisibility('year', yr.id, v)}
											disabled={busyKey === `year:${yr.id}`}
											class="rounded-md border px-2.5 py-1 text-xs font-semibold transition {yr.visibility === v
												? 'border-primary bg-primary/15 text-primary'
												: 'border-border bg-background text-muted-foreground hover:bg-muted'}"
										>
											{visMeta[v].label}
										</button>
									{/each}
								</div>
							</div>

							<!-- Subjects Grid -->
							<div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
								{#each yr.subjects as ys}
									<div
										class="flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-xs transition {ys.visibility === 'published'
											? 'border-emerald-500/30 bg-emerald-500/5'
											: 'border-border bg-background/60'}"
									>
										<div class="min-w-0">
											<div class="truncate font-bold">{ys.subject_name}</div>
											<div class="text-muted-foreground text-[11px]">
												{#if ys.stream_name}{ys.stream_name} · {/if}
												{ys.pub_docs} وثيقة · {ys.pub_quizzes} تمرين
											</div>
										</div>
										<div class="flex shrink-0 gap-1">
											<button
												onclick={() => setNodeVisibility('year_subject', ys.id, 'published')}
												title="نشر"
												class="rounded px-2 py-1 text-[11px] font-bold {ys.visibility === 'published'
													? 'bg-emerald-600 text-white'
													: 'bg-muted text-muted-foreground hover:bg-muted/80'}"
											>
												نشر
											</button>
											<button
												onclick={() => setNodeVisibility('year_subject', ys.id, 'hidden')}
												title="إخفاء"
												class="rounded px-2 py-1 text-[11px] font-bold {ys.visibility === 'hidden'
													? 'bg-zinc-600 text-white'
													: 'bg-muted text-muted-foreground hover:bg-muted/80'}"
											>
												إخفاء
											</button>
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
