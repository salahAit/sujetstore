<script lang="ts">
	import { enhance } from '$app/forms';
	import {
		Trophy,
		Clock,
		CheckCircle2,
		Bookmark,
		FileText,
		Brain,
		UserCheck,
		Crown,
		Sparkles
	} from 'lucide-svelte';

	let { data, form }: { data: any; form: any } = $props();
</script>

<svelte:head>
	<title>لوحة الطالب - SujetStore</title>
</svelte:head>

<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
	<!-- Left/Main column: Stats, Recent Attempts, Bookmarks -->
	<div class="space-y-6 lg:col-span-2">
		<!-- Quick KPIs -->
		<div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
			<div class="bg-card rounded-2xl border p-4">
				<p class="text-muted-foreground text-xs font-semibold">التمارين المنجزة</p>
				<p class="mt-1 text-2xl font-extrabold">{data.attemptsCount}</p>
			</div>
			<div class="bg-card rounded-2xl border p-4">
				<p class="text-muted-foreground text-xs font-semibold">النقاط (XP)</p>
				<p class="mt-1 text-2xl font-extrabold text-amber-500">{data.totalXp}</p>
			</div>
			<div class="bg-card rounded-2xl border p-4">
				<p class="text-muted-foreground text-xs font-semibold">الشارات المكتسبة</p>
				<p class="mt-1 text-2xl font-extrabold text-emerald-500">{data.badges.length}</p>
			</div>
			<div class="bg-card rounded-2xl border p-4">
				<p class="text-muted-foreground text-xs font-semibold">أخطاء للمراجعة</p>
				<p class="mt-1 text-2xl font-extrabold text-rose-500">{data.unresolvedMistakesCount}</p>
			</div>
		</div>

		<!-- Subscription CTA / Status -->
		<div
			class="rounded-2xl border p-5 {data.isPremium
				? 'border-amber-500/30 bg-amber-500/5'
				: 'border-blue-500/30 bg-blue-500/5'}"
		>
			<div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
				<div>
					<div class="flex items-center gap-2 font-extrabold">
						<Crown size={18} class={data.isPremium ? 'text-amber-500' : 'text-blue-500'} />
						<span>{data.isPremium ? 'اشتراك SujetStore Pro مفعّل' : 'ترقية إلى SujetStore Pro'}</span>
					</div>
					<p class="text-muted-foreground mt-1 text-xs">
						{#if data.isPremium && data.studentUser.subscriptionExpiresAt}
							صالح حتى {new Date(data.studentUser.subscriptionExpiresAt).toLocaleDateString('ar-DZ')}
						{:else if data.isPremium}
							وصول غير محدود لجميع المواضيع والتمارين الاحترافية
						{:else}
							افتح جميع مواضيع BEM والتمارين الحصرية والمولّد الذكي غير المحدود عبر قسيمة أو الدفع الإلكتروني
						{/if}
					</p>
				</div>
				<a
					href="/student/activate"
					class="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow transition hover:bg-amber-600"
				>
					<Sparkles size={14} />
					{data.isPremium ? 'تمديد الاشتراك' : 'تفعيل قسيمة / اشتراك'}
				</a>
			</div>
		</div>

		<!-- Recent Quiz Attempts -->
		<div class="bg-card rounded-2xl border p-5 shadow-sm">
			<div class="mb-4 flex items-center justify-between">
				<h2 class="flex items-center gap-2 text-base font-extrabold">
					<Trophy size={18} class="text-purple-500" /> سجل نتائج التمارين
				</h2>
				<a href="/quizzes" class="text-primary text-xs font-bold hover:underline">تصفح التمارين ←</a>
			</div>

			{#if data.attempts.length === 0}
				<p class="text-muted-foreground py-8 text-center text-sm">
					لم تكمل أي تمرين تفاعلي بعد. ابدأ تمرينك الأول واجمع نقاط XP!
				</p>
			{:else}
				<div class="space-y-3">
					{#each data.attempts as att}
						<div class="bg-muted/30 flex items-center justify-between gap-3 rounded-xl border p-3">
							<div class="min-w-0">
								{#if att.quiz}
									<a
										href={`/quizzes/${att.quiz.slug}`}
										class="hover:text-primary block truncate text-sm font-bold"
									>
										{att.quiz.title_ar || att.quiz.title}
									</a>
									<p class="text-muted-foreground mt-0.5 text-xs">
										{att.quiz.year_name} · {att.quiz.subject_name}
									</p>
								{:else}
									<p class="text-sm font-bold">تمرين #{att.quiz_id}</p>
								{/if}
							</div>
							<div class="flex shrink-0 items-center gap-3 text-left">
								<span class="text-muted-foreground flex items-center gap-1 text-xs">
									<Clock size={12} /> {att.time_taken}ث
								</span>
								<span
									class="rounded-lg px-2.5 py-1 text-xs font-extrabold {att.percentage >= 60
										? 'bg-emerald-500/15 text-emerald-500'
										: 'bg-red-500/15 text-red-500'}"
								>
									{Math.round(att.percentage)}% ({att.score}/{att.total_points})
								</span>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Bookmarks -->
		<div class="bg-card rounded-2xl border p-5 shadow-sm">
			<h2 class="mb-4 flex items-center gap-2 text-base font-extrabold">
				<Bookmark size={18} class="text-blue-500" /> مفضلتي المحفوظة
			</h2>
			{#if data.bookmarks.length === 0}
				<p class="text-muted-foreground py-6 text-center text-sm">
					لا توجد عناصر محفوظة حالياً. استخدم زر الحفظ في المواضيع لتصل إليها بسرعة.
				</p>
			{:else}
				<div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
					{#each data.bookmarks as bm}
						{@const href =
							bm.item_type === 'quiz'
								? `/quizzes/${bm.item.slug}`
								: `/${bm.item.level_slug}/${bm.item.year_slug}/${bm.item.subject_slug}/${bm.item.slug}`}
						<a
							{href}
							class="bg-muted/30 hover:border-primary/40 flex items-center gap-2.5 rounded-xl border p-3 transition-colors"
						>
							{#if bm.item_type === 'quiz'}
								<Brain size={16} class="shrink-0 text-purple-500" />
							{:else}
								<FileText size={16} class="shrink-0 text-blue-500" />
							{/if}
							<span class="truncate text-xs font-bold">{bm.item.title_ar || bm.item.title}</span>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<!-- Right column: Profile & Badges -->
	<div class="space-y-6">
		<!-- Earned Badges -->
		<div class="bg-card rounded-2xl border p-5 shadow-sm">
			<div class="mb-3 flex items-center justify-between">
				<h2 class="text-base font-extrabold">شاراتي</h2>
				<a href="/achievements" class="text-primary text-xs font-bold hover:underline">الكل</a>
			</div>
			{#if data.badges.length === 0}
				<p class="text-muted-foreground text-xs">أكمل أول تمرين لتحصل على أول شارة!</p>
			{:else}
				<div class="flex flex-wrap gap-2">
					{#each data.badges as badge}
						<span
							class="rounded-xl border px-3 py-1.5 text-xs font-bold"
							style="border-color: {badge.color}40; background-color: {badge.color}15; color: {badge.color}"
						>
							{badge.name_ar}
						</span>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Profile Edit Form -->
		<div class="bg-card rounded-2xl border p-5 shadow-sm">
			<h2 class="mb-4 flex items-center gap-2 text-base font-extrabold">
				<UserCheck size={18} class="text-emerald-500" /> إعدادات الملف الشخصي
			</h2>

			{#if form?.profileSaved}
				<div class="mb-3 flex items-center gap-2 rounded-xl bg-emerald-500/15 p-2.5 text-xs font-bold text-emerald-500">
					<CheckCircle2 size={15} /> تم حفظ البيانات بنجاح
				</div>
			{/if}
			{#if form?.error}
				<div class="mb-3 rounded-xl bg-red-500/15 p-2.5 text-xs font-bold text-red-500">
					{form.error}
				</div>
			{/if}

			<form method="POST" action="?/updateProfile" use:enhance class="space-y-3">
				<div>
					<label for="st-name" class="mb-1 block text-xs font-bold">الاسم</label>
					<input
						id="st-name"
						name="name"
						type="text"
						required
						value={data.studentUser.name}
						class="bg-background w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-blue-500"
					/>
				</div>

				<div>
					<label for="st-year" class="mb-1 block text-xs font-bold">السنة الدراسية</label>
					<select
						id="st-year"
						name="yearId"
						value={data.studentUser.yearId || ''}
						class="bg-background w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-blue-500"
					>
						<option value="">غير محدد</option>
						{#each data.years as yr}
							<option value={yr.id}>{yr.name_ar}</option>
						{/each}
					</select>
				</div>

				<div>
					<label for="st-wilaya" class="mb-1 block text-xs font-bold">الولاية</label>
					<select
						id="st-wilaya"
						name="wilaya"
						value={data.studentUser.wilaya || ''}
						class="bg-background w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-blue-500"
					>
						<option value="">غير محدد</option>
						{#each data.wilayas as w}
							<option value={`${w.code} - ${w.nameAr}`}>{w.code} - {w.nameAr}</option>
						{/each}
					</select>
				</div>

				<button
					type="submit"
					class="bg-primary text-primary-foreground w-full rounded-xl py-2.5 text-sm font-bold transition hover:opacity-95"
				>
					حفظ التعديلات
				</button>
			</form>
		</div>
	</div>
</div>
