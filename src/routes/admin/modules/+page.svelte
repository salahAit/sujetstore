<script lang="ts">
	import { enhance } from '$app/forms';
	import {
		Blocks,
		CheckCircle2,
		ShieldAlert,
		Lock,
		RefreshCw,
		Settings2,
		ChevronDown,
		ChevronUp,
		Link2,
		Radio,
		Route,
		Power,
		Save
	} from 'lucide-svelte';
	import type { ModuleCategory, ModuleTier } from '#lib/platform/types';

	let { data, form } = $props();

	let expandedConfigIds = $state<Record<string, boolean>>({});
	let configDrafts = $state<Record<string, string>>({});
	let configErrors = $state<Record<string, string | null>>({});

	const CATEGORY_META: Record<ModuleCategory, { label: string; badgeClass: string }> = {
		core: { label: 'النواة والنظام الأساسي', badgeClass: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30' },
		learning: { label: 'التعلم التفاعلي والفيديو', badgeClass: 'bg-blue-500/15 text-blue-500 border-blue-500/30' },
		assessment: { label: 'التقييم والتمارين التفاعلية', badgeClass: 'bg-violet-500/15 text-violet-500 border-violet-500/30' },
		authoring: { label: 'التأليف والطباعة (Sujet & Typst)', badgeClass: 'bg-amber-500/15 text-amber-500 border-amber-500/30' },
		engagement: { label: 'التحفيز والنقاط (Gamification)', badgeClass: 'bg-pink-500/15 text-pink-500 border-pink-500/30' },
		tools: { label: 'أدوات التلميذ المساندة', badgeClass: 'bg-cyan-500/15 text-cyan-500 border-cyan-500/30' },
		commerce: { label: 'الحسابات والاشتراكات', badgeClass: 'bg-orange-500/15 text-orange-500 border-orange-500/30' }
	};

	const TIER_META: Record<ModuleTier, { label: string; cls: string }> = {
		core: { label: 'أساسي Core', cls: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' },
		essential: { label: 'ضروري Essential', cls: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30' },
		optional: { label: 'اختياري Optional', cls: 'bg-muted text-muted-foreground border-border' }
	};

	function toggleConfigEditor(moduleId: string, currentJson: string) {
		const willOpen = !expandedConfigIds[moduleId];
		expandedConfigIds = { ...expandedConfigIds, [moduleId]: willOpen };
		if (willOpen && configDrafts[moduleId] === undefined) {
			configDrafts = { ...configDrafts, [moduleId]: currentJson };
		}
	}

	function validateDraft(moduleId: string, value: string) {
		configDrafts = { ...configDrafts, [moduleId]: value };
		try {
			const parsed = JSON.parse(value || '{}');
			if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
				configErrors = { ...configErrors, [moduleId]: 'يجب أن يكون الجذر كائن JSON ({...})' };
			} else {
				configErrors = { ...configErrors, [moduleId]: null };
			}
		} catch {
			configErrors = { ...configErrors, [moduleId]: 'خطأ في صيغة JSON' };
		}
	}

	function formatDraft(moduleId: string) {
		const raw = configDrafts[moduleId] ?? '{}';
		try {
			const parsed = JSON.parse(raw);
			configDrafts = { ...configDrafts, [moduleId]: JSON.stringify(parsed, null, 2) };
			configErrors = { ...configErrors, [moduleId]: null };
		} catch {
			configErrors = { ...configErrors, [moduleId]: 'لا يمكن تنسيق JSON غير صالح' };
		}
	}
</script>

<svelte:head>
	<title>إدارة وحدات المنصة — SujetStore Admin</title>
</svelte:head>

<div class="mx-auto max-w-6xl space-y-6 p-2 sm:p-4">
	<!-- Header -->
	<div class="flex flex-wrap items-start justify-between gap-4">
		<div>
			<h1 class="flex items-center gap-2.5 text-2xl font-extrabold">
				<Blocks class="text-primary" size={28} />
				مركز وحدات المنصة (Feature Module Kernel)
			</h1>
			<p class="text-muted-foreground mt-1 text-sm">
				فعّل أو عطّل ميزات المنصة لحظياً مع حماية تلقائية للاعتماديات الإلزامية وتعديل إعدادات كل وحدة بصيغة JSON.
			</p>
		</div>

		<div class="flex flex-wrap items-center gap-2">
			<span class="bg-card border-border rounded-xl border px-3 py-1.5 text-xs font-bold">
				المجموع: {data.stats.total}
			</span>
			<span class="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
				مفعّلة: {data.stats.enabled}
			</span>
			{#if data.stats.disabled > 0}
				<span class="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
					معطّلة: {data.stats.disabled}
				</span>
			{/if}

			{#if data.canManage}
				<form method="POST" action="?/sync" use:enhance>
					<button
						type="submit"
						class="bg-card border-border hover:bg-muted inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition"
					>
						<RefreshCw size={14} />
						مزامنة مع قاعدة البيانات
					</button>
				</form>
			{/if}
		</div>
	</div>

	<!-- Feedback banner -->
	{#if form?.success}
		<div
			class="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-sm font-bold text-emerald-600 dark:text-emerald-400"
		>
			<CheckCircle2 size={18} class="shrink-0" />
			<span>{form.message}</span>
		</div>
	{:else if form?.error}
		<div
			class="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-sm font-bold text-red-600 dark:text-red-400"
		>
			<ShieldAlert size={18} class="shrink-0" />
			<span>{form.error}</span>
		</div>
	{/if}

	<!-- Grouped Modules -->
	{#each data.grouped as group}
		{@const catMeta = CATEGORY_META[group.category]}
		<section class="space-y-3">
			<div class="flex items-center gap-2.5">
				<span class="rounded-lg border px-2.5 py-1 text-xs font-extrabold {catMeta.badgeClass}">
					{catMeta.label}
				</span>
				<span class="text-muted-foreground text-xs font-semibold">({group.items.length})</span>
			</div>

			<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
				{#each group.items as item (item.manifest.id)}
					{@const m = item.manifest}
					{@const st = item.state}
					{@const tierMeta = TIER_META[m.tier]}
					{@const isToggleLocked =
						!data.canManage ||
						(st.enabled && !item.canDisable) ||
						(!st.enabled && item.disabledHardDependencies.length > 0)}
					{@const isExpanded = Boolean(expandedConfigIds[m.id])}
					{@const draftValue = configDrafts[m.id] ?? st.configJson}
					{@const draftError = configErrors[m.id]}

					<div
						class="bg-card flex flex-col justify-between rounded-2xl border p-5 shadow-sm transition-all {st.enabled
							? 'border-border'
							: 'border-amber-500/30 opacity-85'}"
					>
						<div class="space-y-3">
							<!-- Top Row: Title + Toggle -->
							<div class="flex items-start justify-between gap-3">
								<div class="min-w-0 flex-1">
									<div class="flex flex-wrap items-center gap-2">
										<h2 class="text-base font-extrabold">{m.nameAr}</h2>
										<span class="rounded-full border px-2 py-0.5 text-[11px] font-bold {tierMeta.cls}">
											{tierMeta.label}
										</span>
										<span
											class="bg-muted text-muted-foreground rounded-md px-1.5 py-0.5 font-mono text-[11px]"
											dir="ltr"
										>
											{m.id} v{st.version}
										</span>
									</div>
									<p class="text-muted-foreground mt-1.5 text-xs leading-relaxed">
										{m.descriptionAr}
									</p>
								</div>

								<!-- Toggle Form -->
								<form method="POST" action="?/toggle" use:enhance class="shrink-0">
									<input type="hidden" name="moduleId" value={m.id} />
									<input type="hidden" name="enabled" value={st.enabled ? 'false' : 'true'} />
									<button
										type="submit"
										disabled={isToggleLocked}
										title={st.enabled
											? (item.disableBlockReason ?? 'تعطيل هذه الوحدة')
											: item.disabledHardDependencies.length > 0
												? `يتطلب تفعيل: ${item.disabledHardDependencies.join('، ')}`
												: 'تفعيل هذه الوحدة'}
										class="inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-extrabold transition {st.enabled
											? isToggleLocked
												? 'cursor-not-allowed border-emerald-500/20 bg-emerald-500/10 text-emerald-600 opacity-75 dark:text-emerald-400'
												: 'border-emerald-500/40 bg-emerald-500/15 text-emerald-600 hover:bg-red-500/15 hover:text-red-500 hover:border-red-500/40 dark:text-emerald-400'
											: isToggleLocked
												? 'cursor-not-allowed border-border bg-muted text-muted-foreground opacity-60'
												: 'border-amber-500/40 bg-amber-500/15 text-amber-600 hover:bg-emerald-500/15 hover:text-emerald-600 hover:border-emerald-500/40 dark:text-amber-400'}"
									>
										{#if isToggleLocked && st.enabled}
											<Lock size={14} />
											مفعّلة
										{:else}
											<Power size={14} />
											{st.enabled ? 'مفعّلة' : 'معطّلة'}
										{/if}
									</button>
								</form>
							</div>

							<!-- Lock / Dependency Notice -->
							{#if st.enabled && !item.canDisable && item.disableBlockReason}
								<div class="bg-muted/60 text-muted-foreground flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold">
									<Lock size={12} class="shrink-0" />
									<span>{item.disableBlockReason}</span>
								</div>
							{:else if !st.enabled && item.disabledHardDependencies.length > 0}
								<div class="flex items-center gap-1.5 rounded-lg bg-amber-500/10 px-2.5 py-1.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
									<ShieldAlert size={12} class="shrink-0" />
									<span>
										لتفعيلها يجب تفعيل:
										{item.disabledHardDependencies.map((d) => data.nameMap[d] || d).join('، ')}
									</span>
								</div>
							{/if}

							<!-- Dependencies & Events Badges -->
							<div class="flex flex-wrap gap-1.5 text-[11px]">
								{#each m.hardDependencies as dep}
									<span
										class="inline-flex items-center gap-1 rounded-lg border border-blue-500/25 bg-blue-500/10 px-2 py-0.5 font-semibold text-blue-600 dark:text-blue-400"
										title="اعتماد إلزامي (Hard Dependency)"
									>
										<Link2 size={11} />
										{data.nameMap[dep] || dep}
									</span>
								{/each}
								{#each m.softDependencies as soft}
									<span
										class="border-border bg-muted/60 text-muted-foreground inline-flex items-center gap-1 rounded-lg border border-dashed px-2 py-0.5 font-medium"
										title="اعتماد اختياري عبر الأحداث (Soft Dependency)"
									>
										<Radio size={11} />
										{data.nameMap[soft] || soft}
									</span>
								{/each}
							</div>

							<!-- Route Prefixes -->
							{#if m.routePrefixes.length > 0}
								<div class="flex flex-wrap items-center gap-1 pt-1">
									<Route size={12} class="text-muted-foreground shrink-0" />
									{#each m.routePrefixes as prefix}
										<span
											class="bg-background border-border text-muted-foreground rounded-md border px-1.5 py-0.5 font-mono text-[10px]"
											dir="ltr"
										>
											{prefix}
										</span>
									{/each}
								</div>
							{/if}
						</div>

						<!-- Footer: JSON Config Accordion -->
						<div class="border-border mt-4 border-t pt-3">
							<button
								type="button"
								onclick={() => toggleConfigEditor(m.id, st.configJson)}
								class="text-muted-foreground hover:text-foreground flex w-full items-center justify-between text-xs font-bold transition"
							>
								<span class="inline-flex items-center gap-1.5">
									<Settings2 size={14} />
									إعدادات الوحدة (JSON Config)
								</span>
								{#if isExpanded}
									<ChevronUp size={15} />
								{:else}
									<ChevronDown size={15} />
								{/if}
							</button>

							{#if isExpanded}
								<form method="POST" action="?/saveConfig" use:enhance class="mt-3 space-y-2.5">
									<input type="hidden" name="moduleId" value={m.id} />
									<textarea
										name="configJson"
										rows="5"
										dir="ltr"
										value={draftValue}
										oninput={(e) => validateDraft(m.id, e.currentTarget.value)}
										class="bg-background border-border focus:border-primary w-full rounded-xl border p-3 font-mono text-xs outline-none"
									></textarea>
									{#if draftError}
										<p class="text-xs font-bold text-red-500">{draftError}</p>
									{/if}
									<div class="flex items-center justify-between gap-2">
										<button
											type="button"
											onclick={() => formatDraft(m.id)}
											class="border-border hover:bg-muted rounded-lg border px-2.5 py-1.5 text-[11px] font-bold transition"
										>
											تنسيق JSON
										</button>
										{#if data.canManage}
											<button
												type="submit"
												disabled={Boolean(draftError)}
												class="bg-primary text-primary-foreground inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition hover:opacity-90 disabled:opacity-50"
											>
												<Save size={13} />
												حفظ الإعدادات
											</button>
										{/if}
									</div>
								</form>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/each}
</div>
