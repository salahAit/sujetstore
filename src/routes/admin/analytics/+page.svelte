<script lang="ts">
	import type { PageData } from './$types';
	import {
		Activity,
		Users,
		Globe,
		MapPin,
		FileText,
		ShieldAlert,
		Monitor,
		Smartphone,
		Tablet,
		Bot,
		Filter,
		X,
		Clock,
		Cpu,
		Compass,
		UserCheck,
		ArrowLeft
	} from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	const hasActiveFilters = $derived(
		Boolean(data.filters.userId || data.filters.eventType || data.filters.device)
	);

	const maxCountryCount = $derived(
		Math.max(1, ...data.topCountries.map((c) => c.count))
	);
	const maxCityCount = $derived(
		Math.max(1, ...data.topCities.map((c) => c.count))
	);
	const maxDeviceCount = $derived(
		Math.max(1, ...data.deviceBreakdown.map((d) => d.count))
	);
	const maxOsCount = $derived(
		Math.max(1, ...data.osBreakdown.map((o) => o.count))
	);
	const maxBrowserCount = $derived(
		Math.max(1, ...data.browserBreakdown.map((b) => b.count))
	);

	function buildFilterUrl(overrides: {
		days?: number;
		userId?: number | null;
		eventType?: string;
		device?: string;
	}): string {
		const params = new URLSearchParams();
		const nextDays = overrides.days ?? data.filters.days;
		const nextUserId =
			overrides.userId !== undefined ? overrides.userId : data.filters.userId;
		const nextEventType =
			overrides.eventType !== undefined ? overrides.eventType : data.filters.eventType;
		const nextDevice =
			overrides.device !== undefined ? overrides.device : data.filters.device;

		params.set('days', String(nextDays));
		if (nextUserId) params.set('userId', String(nextUserId));
		if (nextEventType) params.set('eventType', nextEventType);
		if (nextDevice) params.set('device', nextDevice);
		return `/admin/analytics?${params.toString()}`;
	}

	function eventBadgeClass(eventType: string): string {
		if (eventType.startsWith('blocked_')) {
			return 'border-red-500/30 bg-red-500/10 text-red-500';
		}
		if (eventType === 'pdf_download') {
			return 'border-indigo-500/30 bg-indigo-500/10 text-indigo-500';
		}
		if (eventType === 'pdf_view') {
			return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500';
		}
		if (eventType.includes('login') || eventType.includes('auth')) {
			return 'border-amber-500/30 bg-amber-500/10 text-amber-500';
		}
		return 'border-blue-500/30 bg-blue-500/10 text-blue-500';
	}

	function eventLabel(eventType: string): string {
		const map: Record<string, string> = {
			pdf_view: 'عرض PDF',
			pdf_download: 'تحميل PDF',
			blocked_invalid_sig: 'توقيع مرفوض',
			blocked_quota: 'تجاوز الحصة',
			blocked_tier: 'محجوب (اشتراك)',
			media_not_found: 'ملف غير موجود',
			page_view: 'زيارة صفحة',
			login_success: 'تسجيل دخول',
			login_failed: 'دخول فاشل'
		};
		return map[eventType] || eventType;
	}

	function deviceLabel(device: string): string {
		const map: Record<string, string> = {
			desktop: 'حاسوب',
			mobile: 'هاتف',
			tablet: 'لوحي',
			bot: 'بوت / سكربت'
		};
		return map[device] || device;
	}

	function statusBadgeClass(status: number): string {
		if (status >= 200 && status < 300) return 'bg-emerald-500/15 text-emerald-500';
		if (status >= 300 && status < 400) return 'bg-blue-500/15 text-blue-500';
		if (status === 429) return 'bg-amber-500/15 text-amber-500';
		return 'bg-red-500/15 text-red-500';
	}

	function roleLabel(role: string | null): string {
		if (role === 'superadmin') return 'مدير عام';
		if (role === 'admin') return 'مدير';
		if (role === 'editor') return 'محرر';
		if (role === 'student') return 'طالب';
		return 'زائر';
	}
</script>

<svelte:head>
	<title>تحليلات الزوار والأمان — SujetStore Admin</title>
</svelte:head>

<div class="mx-auto max-w-7xl space-y-6">
	<!-- Header & Timeframe Selector -->
	<div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
		<div>
			<h1 class="flex items-center gap-2.5 text-2xl font-extrabold sm:text-3xl">
				<Activity size={28} class="text-primary" />
				تحليلات الزوار وأمان الملفات
			</h1>
			<p class="text-muted-foreground mt-1 text-sm">
				تتبع لحظي للزوار والمستخدمين المسجلين، التوزيع الجغرافي، الأجهزة، ومراقبة تحميلات PDF والمحاولات المحجوبة.
			</p>
		</div>

		<div class="flex flex-wrap items-center gap-2">
			<div class="bg-card border-border inline-flex rounded-xl border p-1 shadow-sm">
				{#each [
					{ d: 1, label: '24 ساعة' },
					{ d: 7, label: '7 أيام' },
					{ d: 30, label: '30 يوماً' }
				] as period}
					<a
						href={buildFilterUrl({ days: period.d })}
						class="rounded-lg px-3 py-1.5 text-xs font-bold transition {data.filters.days ===
						period.d
							? 'bg-primary text-primary-foreground shadow-sm'
							: 'text-muted-foreground hover:text-foreground'}"
					>
						{period.label}
					</a>
				{/each}
			</div>

			<a
				href="/admin"
				class="bg-card border-border text-card-foreground hover:bg-muted inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold shadow-sm transition"
			>
				<ArrowLeft size={14} /> العودة
			</a>
		</div>
	</div>

	<!-- Filter Bar -->
	<form
		method="GET"
		action="/admin/analytics"
		class="bg-card border-border flex flex-wrap items-center gap-3 rounded-2xl border p-4 shadow-sm"
	>
		<input type="hidden" name="days" value={data.filters.days} />
		{#if data.filters.userId}
			<input type="hidden" name="userId" value={data.filters.userId} />
		{/if}

		<div class="text-muted-foreground flex items-center gap-1.5 text-xs font-bold">
			<Filter size={15} /> تصفية السجلات:
		</div>

		<select
			name="eventType"
			value={data.filters.eventType}
			class="bg-background border-border rounded-xl border px-3 py-1.5 text-xs font-semibold"
		>
			<option value="">كل أنواع الأحداث</option>
			{#each data.eventTypeOptions as ev}
				<option value={ev.label}>{eventLabel(ev.label)} ({ev.count})</option>
			{/each}
		</select>

		<select
			name="device"
			value={data.filters.device}
			class="bg-background border-border rounded-xl border px-3 py-1.5 text-xs font-semibold"
		>
			<option value="">كل الأجهزة</option>
			<option value="mobile">هاتف (Mobile)</option>
			<option value="desktop">حاسوب (Desktop)</option>
			<option value="tablet">لوحي (Tablet)</option>
			<option value="bot">بوت / سكربت (Bot)</option>
		</select>

		<button
			type="submit"
			class="bg-primary text-primary-foreground rounded-xl px-4 py-1.5 text-xs font-bold transition hover:opacity-90"
		>
			تطبيق
		</button>

		{#if hasActiveFilters}
			<a
				href="/admin/analytics?days={data.filters.days}"
				class="inline-flex items-center gap-1 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-500 transition hover:bg-red-500/20"
			>
				<X size={13} /> مسح التصفية
			</a>
		{/if}
	</form>

	<!-- Active Selected User Banner -->
	{#if data.filters.userId}
		<div
			class="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-sm"
		>
			<div class="flex items-center gap-2 font-bold text-blue-500">
				<UserCheck size={18} />
				<span>
					عرض نشاط المستخدم:
					{data.selectedUser
						? `${data.selectedUser.name} (${data.selectedUser.email})`
						: `#${data.filters.userId}`}
				</span>
			</div>
			<a
				href={buildFilterUrl({ userId: null })}
				class="inline-flex items-center gap-1 rounded-lg bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-500 hover:bg-blue-500/30"
			>
				<X size={13} /> عرض جميع المستخدمين
			</a>
		</div>
	{/if}

	<!-- KPI Cards -->
	<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
		<div class="bg-card border-border rounded-2xl border p-4 shadow-sm">
			<div class="flex items-center gap-3">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
					<Activity size={20} />
				</div>
				<div class="min-w-0">
					<p class="truncate text-2xl font-extrabold">{data.kpis.totalEvents.toLocaleString()}</p>
					<p class="text-muted-foreground text-xs">إجمالي الأحداث</p>
				</div>
			</div>
		</div>

		<div class="bg-card border-border rounded-2xl border p-4 shadow-sm">
			<div class="flex items-center gap-3">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
					<Globe size={20} />
				</div>
				<div class="min-w-0">
					<p class="truncate text-2xl font-extrabold">{data.kpis.uniqueIps.toLocaleString()}</p>
					<p class="text-muted-foreground text-xs">عناوين IP فريدة</p>
				</div>
			</div>
		</div>

		<div class="bg-card border-border rounded-2xl border p-4 shadow-sm">
			<div class="flex items-center gap-3">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
					<Users size={20} />
				</div>
				<div class="min-w-0">
					<p class="truncate text-2xl font-extrabold">{data.kpis.activeUsers.toLocaleString()}</p>
					<p class="text-muted-foreground text-xs">مستخدمون مسجلون</p>
				</div>
			</div>
		</div>

		<div class="bg-card border-border rounded-2xl border p-4 shadow-sm">
			<div class="flex items-center gap-3">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
					<FileText size={20} />
				</div>
				<div class="min-w-0">
					<p class="truncate text-2xl font-extrabold">{data.kpis.pdfEvents.toLocaleString()}</p>
					<p class="text-muted-foreground text-xs">
						PDF ({data.kpis.mediaDownloads.toLocaleString()} حصة مسجلة)
					</p>
				</div>
			</div>
		</div>

		<div class="bg-card border-border col-span-2 rounded-2xl border p-4 shadow-sm sm:col-span-1">
			<div class="flex items-center gap-3">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
					<ShieldAlert size={20} />
				</div>
				<div class="min-w-0">
					<p class="truncate text-2xl font-extrabold">{data.kpis.blockedAttempts.toLocaleString()}</p>
					<p class="text-muted-foreground text-xs">محاولات محجوبة</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Geo Breakdown & Device/OS/Browser Breakdown -->
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
		<!-- Geo Breakdown -->
		<div class="bg-card border-border space-y-5 rounded-2xl border p-5 shadow-sm">
			<div class="flex items-center justify-between">
				<h2 class="flex items-center gap-2 text-base font-extrabold">
					<Globe size={18} class="text-cyan-500" />
					التوزيع الجغرافي (الدول والولايات)
				</h2>
				<span class="text-muted-foreground text-xs">آخر {data.filters.days} أيام</span>
			</div>

			<!-- Countries -->
			<div class="space-y-2.5">
				<h3 class="text-muted-foreground text-xs font-bold">أعلى الدول</h3>
				{#if data.topCountries.length === 0}
					<p class="text-muted-foreground py-3 text-center text-xs">لا توجد بيانات جغرافية بعد</p>
				{:else}
					{#each data.topCountries as row}
						<div class="space-y-1">
							<div class="flex items-center justify-between text-xs">
								<span class="font-bold">
									<span class="bg-muted mr-1 inline-block rounded px-1.5 py-0.5 font-mono text-[10px]">
										{row.country_code}
									</span>
									{row.country_name}
								</span>
								<span class="text-muted-foreground">
									<strong class="text-foreground">{row.count}</strong> حدث · {row.unique_ips} IP
								</span>
							</div>
							<div class="bg-muted h-2 overflow-hidden rounded-full">
								<div
									class="h-full rounded-full bg-gradient-to-l from-cyan-500 to-blue-500"
									style="width: {Math.max(4, Math.round((row.count / maxCountryCount) * 100))}%"
								></div>
							</div>
						</div>
					{/each}
				{/if}
			</div>

			<!-- Cities / Wilayas -->
			<div class="border-border space-y-2.5 border-t pt-4">
				<h3 class="text-muted-foreground flex items-center gap-1.5 text-xs font-bold">
					<MapPin size={13} /> أعلى الولايات والمدن
				</h3>
				{#if data.topCities.length === 0}
					<p class="text-muted-foreground py-3 text-center text-xs">لا توجد مدن مسجلة بعد</p>
				{:else}
					<div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
						{#each data.topCities as city}
							<div class="bg-muted/40 border-border rounded-xl border px-3 py-2">
								<div class="flex items-center justify-between gap-2 text-xs">
									<span class="truncate font-bold">{city.region_city}</span>
									<span class="text-primary shrink-0 font-extrabold">{city.count}</span>
								</div>
								<div class="text-muted-foreground mt-1 flex items-center justify-between text-[11px]">
									<span class="truncate">{city.country_name}</span>
									<span>{city.unique_ips} IP</span>
								</div>
								<div class="bg-muted mt-1.5 h-1.5 overflow-hidden rounded-full">
									<div
										class="h-full rounded-full bg-emerald-500"
										style="width: {Math.max(6, Math.round((city.count / maxCityCount) * 100))}%"
									></div>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<!-- Device / OS / Browser Breakdown -->
		<div class="bg-card border-border space-y-5 rounded-2xl border p-5 shadow-sm">
			<h2 class="flex items-center gap-2 text-base font-extrabold">
				<Cpu size={18} class="text-purple-500" />
				الأجهزة وأنظمة التشغيل والمتصفحات
			</h2>

			<!-- Devices -->
			<div class="space-y-2.5">
				<h3 class="text-muted-foreground text-xs font-bold">نوع الجهاز (انقر للتصفية)</h3>
				{#if data.deviceBreakdown.length === 0}
					<p class="text-muted-foreground py-2 text-center text-xs">لا توجد بيانات بعد</p>
				{:else}
					<div class="grid grid-cols-2 gap-2.5">
						{#each data.deviceBreakdown as dev}
							<a
								href={buildFilterUrl({
									device: data.filters.device === dev.label ? '' : dev.label
								})}
								class="rounded-xl border p-3 transition {data.filters.device === dev.label
									? 'border-primary bg-primary/10'
									: 'border-border bg-muted/30 hover:bg-muted/60'}"
							>
								<div class="flex items-center justify-between">
									<span class="flex items-center gap-1.5 text-xs font-bold">
										{#if dev.label === 'mobile'}
											<Smartphone size={15} class="text-emerald-500" />
										{:else if dev.label === 'tablet'}
											<Tablet size={15} class="text-amber-500" />
										{:else if dev.label === 'bot'}
											<Bot size={15} class="text-red-500" />
										{:else}
											<Monitor size={15} class="text-blue-500" />
										{/if}
										{deviceLabel(dev.label)}
									</span>
									<span class="text-sm font-extrabold">{dev.count}</span>
								</div>
								<div class="bg-muted mt-2 h-1.5 overflow-hidden rounded-full">
									<div
										class="bg-primary h-full rounded-full"
										style="width: {Math.max(5, Math.round((dev.count / maxDeviceCount) * 100))}%"
									></div>
								</div>
							</a>
						{/each}
					</div>
				{/if}
			</div>

			<!-- OS & Browser side-by-side -->
			<div class="border-border grid grid-cols-1 gap-4 border-t pt-4 sm:grid-cols-2">
				<div class="space-y-2">
					<h3 class="text-muted-foreground flex items-center gap-1.5 text-xs font-bold">
						<Cpu size={13} /> أنظمة التشغيل
					</h3>
					{#if data.osBreakdown.length === 0}
						<p class="text-muted-foreground text-xs">لا توجد بيانات</p>
					{:else}
						{#each data.osBreakdown as os}
							<div class="space-y-1">
								<div class="flex items-center justify-between text-xs">
									<span class="font-semibold">{os.label}</span>
									<span class="text-muted-foreground font-mono">{os.count}</span>
								</div>
								<div class="bg-muted h-1.5 overflow-hidden rounded-full">
									<div
										class="h-full rounded-full bg-purple-500"
										style="width: {Math.max(5, Math.round((os.count / maxOsCount) * 100))}%"
									></div>
								</div>
							</div>
						{/each}
					{/if}
				</div>

				<div class="space-y-2">
					<h3 class="text-muted-foreground flex items-center gap-1.5 text-xs font-bold">
						<Compass size={13} /> المتصفحات والتطبيقات
					</h3>
					{#if data.browserBreakdown.length === 0}
						<p class="text-muted-foreground text-xs">لا توجد بيانات</p>
					{:else}
						{#each data.browserBreakdown as br}
							<div class="space-y-1">
								<div class="flex items-center justify-between text-xs">
									<span class="truncate font-semibold">{br.label}</span>
									<span class="text-muted-foreground font-mono">{br.count}</span>
								</div>
								<div class="bg-muted h-1.5 overflow-hidden rounded-full">
									<div
										class="h-full rounded-full bg-indigo-500"
										style="width: {Math.max(5, Math.round((br.count / maxBrowserCount) * 100))}%"
									></div>
								</div>
							</div>
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</div>

	<!-- Registered Users Activity Summary -->
	<div class="bg-card border-border overflow-hidden rounded-2xl border shadow-sm">
		<div class="border-border flex flex-wrap items-center justify-between gap-2 border-b p-4">
			<div>
				<h2 class="flex items-center gap-2 text-base font-extrabold">
					<Users size={18} class="text-purple-500" />
					نشاط المستخدمين المسجلين ({data.registeredUsers.length})
				</h2>
				<p class="text-muted-foreground text-xs">
					انقر على أي مستخدم لتصفية السجل التفصيلي أدناه وعرض تحركاته فقط.
				</p>
			</div>
		</div>

		{#if data.registeredUsers.length === 0}
			<div class="text-muted-foreground p-8 text-center text-sm">
				لا يوجد نشاط لمستخدمين مسجلين خلال هذه الفترة.
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead class="bg-muted/50 text-muted-foreground text-xs">
						<tr>
							<th class="px-4 py-3 text-right font-bold">المستخدم</th>
							<th class="px-4 py-3 text-center font-bold">الدور / الباقة</th>
							<th class="px-4 py-3 text-center font-bold">الأحداث</th>
							<th class="px-4 py-3 text-center font-bold">PDF</th>
							<th class="px-4 py-3 text-center font-bold">محجوب</th>
							<th class="px-4 py-3 text-center font-bold">آخر موقع</th>
							<th class="px-4 py-3 text-center font-bold">آخر ظهور</th>
						</tr>
					</thead>
					<tbody class="divide-border divide-y">
						{#each data.registeredUsers as u}
							{@const isSelected = data.filters.userId === u.user_id}
							<tr
								class="transition {isSelected
									? 'bg-primary/10'
									: 'hover:bg-muted/40'}"
							>
								<td class="px-4 py-3">
									<a
										href={buildFilterUrl({ userId: isSelected ? null : u.user_id })}
										class="group block"
									>
										<div class="group-hover:text-primary font-bold transition">
											{u.user_name}
										</div>
										<div class="text-muted-foreground text-xs" dir="ltr">
											{u.user_email || `#${u.user_id}`}
										</div>
									</a>
								</td>
								<td class="px-4 py-3 text-center">
									<div class="inline-flex flex-wrap items-center justify-center gap-1">
										<span class="bg-muted rounded-md px-2 py-0.5 text-[11px] font-bold">
											{roleLabel(u.user_role)}
										</span>
										{#if u.subscription_tier === 'premium'}
											<span class="rounded-md bg-amber-500/15 px-2 py-0.5 text-[11px] font-bold text-amber-500">
												Pro
											</span>
										{/if}
									</div>
								</td>
								<td class="px-4 py-3 text-center font-extrabold">{u.total_events}</td>
								<td class="px-4 py-3 text-center font-bold text-emerald-500">{u.pdf_events}</td>
								<td class="px-4 py-3 text-center font-bold {u.blocked_events > 0 ? 'text-red-500' : 'text-muted-foreground'}">
									{u.blocked_events}
								</td>
								<td class="text-muted-foreground px-4 py-3 text-center text-xs">
									{u.last_city}
								</td>
								<td class="text-muted-foreground px-4 py-3 text-center font-mono text-xs" dir="ltr">
									{u.last_seen}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>

	<!-- Recent 100 Detailed Audit Events -->
	<div class="bg-card border-border overflow-hidden rounded-2xl border shadow-sm">
		<div class="border-border flex flex-wrap items-center justify-between gap-2 border-b p-4">
			<h2 class="flex items-center gap-2 text-base font-extrabold">
				<Clock size={18} class="text-blue-500" />
				آخر 100 حدث تفصيلي ({data.recentEvents.length})
			</h2>
			<span class="text-muted-foreground text-xs">التوقيت بصيغة UTC</span>
		</div>

		{#if data.recentEvents.length === 0}
			<div class="text-muted-foreground p-10 text-center text-sm">
				لا توجد سجلات تطابق عوامل التصفية الحالية.
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-xs">
					<thead class="bg-muted/50 text-muted-foreground">
						<tr>
							<th class="px-3 py-3 text-right font-bold">التوقيت</th>
							<th class="px-3 py-3 text-right font-bold">المستخدم / الزائر</th>
							<th class="px-3 py-3 text-center font-bold">الحدث</th>
							<th class="px-3 py-3 text-right font-bold">المسار / المورد</th>
							<th class="px-3 py-3 text-right font-bold">الموقع</th>
							<th class="px-3 py-3 text-right font-bold">الجهاز والنظام</th>
							<th class="px-3 py-3 text-center font-bold">IP</th>
							<th class="px-3 py-3 text-center font-bold">الحالة</th>
						</tr>
					</thead>
					<tbody class="divide-border divide-y">
						{#each data.recentEvents as ev}
							<tr class="hover:bg-muted/30 transition">
								<td class="text-muted-foreground whitespace-nowrap px-3 py-2.5 font-mono" dir="ltr">
									{ev.created_at}
								</td>
								<td class="px-3 py-2.5">
									{#if ev.user_id}
										<a
											href={buildFilterUrl({ userId: ev.user_id })}
											class="hover:text-primary block font-bold transition"
										>
											{ev.user_name || ev.user_email || `#${ev.user_id}`}
										</a>
										{#if ev.user_email}
											<span class="text-muted-foreground text-[11px]" dir="ltr">
												{ev.user_email}
											</span>
										{/if}
									{:else}
										<span class="bg-muted text-muted-foreground rounded px-2 py-0.5 font-semibold">
											زائر (Guest)
										</span>
									{/if}
								</td>
								<td class="whitespace-nowrap px-3 py-2.5 text-center">
									<span
										class="inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold {eventBadgeClass(
											ev.event_type
										)}"
									>
										{eventLabel(ev.event_type)}
									</span>
								</td>
								<td class="max-w-[240px] px-3 py-2.5">
									<div class="truncate font-mono text-[11px]" dir="ltr" title={ev.path}>
										{ev.path}
									</div>
									{#if ev.resource_id}
										<div class="text-muted-foreground truncate font-mono text-[10px]" dir="ltr">
											ref: {ev.resource_id}
										</div>
									{/if}
								</td>
								<td class="whitespace-nowrap px-3 py-2.5">
									<div class="font-semibold">{ev.region_city || 'Unknown'}</div>
									<div class="text-muted-foreground text-[11px]">
										{ev.country_name || 'Unknown'}
										{#if ev.country_code}
											({ev.country_code})
										{/if}
									</div>
								</td>
								<td class="whitespace-nowrap px-3 py-2.5">
									<div class="flex items-center gap-1.5 font-semibold">
										{#if ev.device_type === 'mobile'}
											<Smartphone size={13} class="text-emerald-500" />
										{:else if ev.device_type === 'tablet'}
											<Tablet size={13} class="text-amber-500" />
										{:else if ev.device_type === 'bot'}
											<Bot size={13} class="text-red-500" />
										{:else}
											<Monitor size={13} class="text-blue-500" />
										{/if}
										<span>{ev.os_name}</span>
										<span class="text-muted-foreground">·</span>
										<span>{ev.browser_name}</span>
									</div>
								</td>
								<td class="text-muted-foreground whitespace-nowrap px-3 py-2.5 text-center font-mono" dir="ltr">
									{ev.ip_address}
								</td>
								<td class="whitespace-nowrap px-3 py-2.5 text-center">
									<span
										class="rounded-md px-2 py-0.5 font-mono text-[11px] font-bold {statusBadgeClass(
											ev.status_code
										)}"
									>
										{ev.status_code}
									</span>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>
