<script lang="ts">
	import { enhance } from '$app/forms';
	import { Lock, Unlock, ShieldAlert, Smartphone, CheckCircle2, LogOut } from 'lucide-svelte';

	let { data, form } = $props();
	let mode = $state<'live' | 'relaunch' | 'app_only'>('live');
	let initialized = $state(false);

	$effect(() => {
		if (!initialized && data?.config?.mode) {
			mode = data.config.mode;
			initialized = true;
		}
	});
</script>

<svelte:head>
	<title>قفل الموقع والتحكم في الوصول — SujetStore Admin</title>
</svelte:head>

<div class="mx-auto max-w-4xl space-y-6 p-4 sm:p-6">
	<div class="flex flex-wrap items-center justify-between gap-4">
		<div>
			<h1 class="flex items-center gap-2.5 text-2xl font-extrabold">
				{#if data.config.mode === 'live'}
					<Unlock class="text-emerald-500" size={26} />
				{:else}
					<Lock class="text-amber-500" size={26} />
				{/if}
				قفل الموقع والتحكم في النشر
			</h1>
			<p class="text-muted-foreground mt-1 text-sm">
				اقفل الموقع لحظياً عن الجمهور والسكربتات (يحجب كل PDF وAPI بـ HTTP 503) مع بقاء تصفحك كمدير مفتوحاً 100%.
			</p>
		</div>
		<div class="flex items-center gap-2 text-xs font-bold">
			<span class="bg-card border-border rounded-xl border px-3 py-1.5">
				الحسابات: {data.stats.usersCount}
			</span>
			<span class="bg-card border-border rounded-xl border px-3 py-1.5">
				الجلسات النشطة: {data.stats.sessionsCount}
			</span>
		</div>
	</div>

	{#if form?.success}
		<div class="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-sm font-bold text-emerald-500">
			<CheckCircle2 size={18} />
			{form.message}
		</div>
	{:else if form?.error}
		<div class="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-sm font-bold text-red-500">
			<ShieldAlert size={18} />
			{form.error}
		</div>
	{/if}

	<form method="POST" action="?/save" use:enhance class="bg-card border-border space-y-6 rounded-2xl border p-5 shadow-sm">
		<div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
			<label
				class="cursor-pointer rounded-xl border p-4 transition {mode === 'live'
					? 'border-emerald-500 bg-emerald-500/10'
					: 'border-border hover:bg-muted/40'}"
			>
				<input type="radio" name="mode" value="live" bind:group={mode} class="sr-only" />
				<div class="flex items-center gap-2 font-bold text-emerald-500">
					<Unlock size={18} /> مفتوح للجميع (Live)
				</div>
				<p class="text-muted-foreground mt-1 text-xs">
					الموقع مفتوح بشكل طبيعي للزوار ومحركات البحث.
				</p>
			</label>

			<label
				class="cursor-pointer rounded-xl border p-4 transition {mode === 'relaunch'
					? 'border-amber-500 bg-amber-500/10'
					: 'border-border hover:bg-muted/40'}"
			>
				<input type="radio" name="mode" value="relaunch" bind:group={mode} class="sr-only" />
				<div class="flex items-center gap-2 font-bold text-amber-500">
					<Lock size={18} /> قفل — إعادة نشر قريباً
				</div>
				<p class="text-muted-foreground mt-1 text-xs">
					يحجب كل المواضيع وPDF وAPI عن الزوار ويعرض صفحة التحديث القادم (معاينة المدير مفتوحة).
				</p>
			</label>

			<label
				class="cursor-pointer rounded-xl border p-4 transition {mode === 'app_only'
					? 'border-blue-500 bg-blue-500/10'
					: 'border-border hover:bg-muted/40'}"
			>
				<input type="radio" name="mode" value="app_only" bind:group={mode} class="sr-only" />
				<div class="flex items-center gap-2 font-bold text-blue-500">
					<Smartphone size={18} /> تطبيق الهاتف فقط (App Only)
				</div>
				<p class="text-muted-foreground mt-1 text-xs">
					يعرض صفحة تحميل تطبيق Android لمتصفحات الويب بينما يعمل التطبيق والمدير بشكل كامل.
				</p>
			</label>
		</div>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<label for="titleAr" class="mb-1.5 block text-xs font-bold">العنوان (العربية)</label>
				<input id="titleAr" name="titleAr" value={data.config.titleAr} class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm" />
			</div>
			<div>
				<label for="launchDate" class="mb-1.5 block text-xs font-bold">تاريخ الإطلاق المرتقب (اختياري)</label>
				<input id="launchDate" name="launchDate" value={data.config.launchDate} placeholder="مثال: 01 ديسمبر 2026" class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm" />
			</div>
			<div class="md:col-span-2">
				<label for="messageAr" class="mb-1.5 block text-xs font-bold">الرسالة للزوار (العربية)</label>
				<textarea id="messageAr" name="messageAr" rows="2" class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm">{data.config.messageAr}</textarea>
			</div>
			<div>
				<label for="titleFr" class="mb-1.5 block text-xs font-bold" dir="ltr">Title (Français)</label>
				<input id="titleFr" name="titleFr" dir="ltr" value={data.config.titleFr} class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm" />
			</div>
			<div>
				<label for="titleEn" class="mb-1.5 block text-xs font-bold" dir="ltr">Title (English)</label>
				<input id="titleEn" name="titleEn" dir="ltr" value={data.config.titleEn} class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm" />
			</div>
			<div>
				<label for="messageFr" class="mb-1.5 block text-xs font-bold" dir="ltr">Message (Français)</label>
				<textarea id="messageFr" name="messageFr" dir="ltr" rows="2" class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm">{data.config.messageFr}</textarea>
			</div>
			<div>
				<label for="messageEn" class="mb-1.5 block text-xs font-bold" dir="ltr">Message (English)</label>
				<textarea id="messageEn" name="messageEn" dir="ltr" rows="2" class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm">{data.config.messageEn}</textarea>
			</div>
			<div class="md:col-span-2">
				<label for="apkDownloadUrl" class="mb-1.5 block text-xs font-bold">رابط تحميل تطبيق APK (لوضع التطبيق فقط)</label>
				<input id="apkDownloadUrl" name="apkDownloadUrl" dir="ltr" value={data.config.apkDownloadUrl} placeholder="/app/sujetstore.apk" class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm" />
			</div>
		</div>

		<div class="flex flex-wrap items-center justify-between gap-3 pt-2">
			<button
				type="submit"
				class="bg-primary text-primary-foreground rounded-xl px-6 py-2.5 text-sm font-extrabold shadow-sm transition hover:opacity-90"
			>
				حفظ وتطبيق فوري
			</button>
		</div>
	</form>

	<form method="POST" action="?/terminateSessions" use:enhance class="bg-card border-border flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-5">
		<div>
			<h2 class="text-sm font-bold text-red-500">إجراء أمني طارئ: إنهاء جلسات غير الإداريين</h2>
			<p class="text-muted-foreground text-xs">يُسجّل خروج جميع الحسابات العادية فوراً مع الإبقاء على جلسة المدير العام.</p>
		</div>
		<button type="submit" class="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-500/20">
			<LogOut size={15} /> إنهاء الجلسات الآن
		</button>
	</form>
</div>
