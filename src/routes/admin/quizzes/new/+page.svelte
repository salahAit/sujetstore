<script lang="ts">
	import { goto } from '$app/navigation';
	import { Save, AlertCircle } from 'lucide-svelte';
	let { data }: { data: any } = $props();

	let title = $state('');
	let titleAr = $state('');
	let description = $state('');
	let difficulty = $state('medium');
	let timeLimit = $state(0);
	let passingScore = $state(60);
	let accessTier = $state<'public' | 'registered' | 'premium'>('public');
	let shuffleOptions = $state(true);
	let showAnswers = $state(true);
	let maxAttempts = $state(0);
	let isPublished = $state(false);

	let yearSubjectId = $state(0);
	let trimesterId = $state<string | undefined>(undefined);

	// Form options
	let yearSubjects = $derived<any[]>(data.yearSubjects || []);
	let trimesters = $derived<any[]>(data.trimesters || []);
	$effect(() => {
		if (!yearSubjectId && yearSubjects[0]?.id) {
			yearSubjectId = yearSubjects[0].id;
		}
	});
	let saving = $state(false);
	let error = $state('');

	async function save() {
		if (!title || !titleAr || !yearSubjectId) {
			error = 'الرجاء ملء جميع الحقول المطلوبة (العنوان، العنوان العربي، المادة)';
			return;
		}

		saving = true;
		error = '';

		try {
			const res = await fetch('/api/admin/quizzes', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					title,
					titleAr,
					description,
					difficulty,
					timeLimit,
					passingScore,
					accessTier,
					isPremium: accessTier === 'premium',
					shuffleOptions,
					showAnswers,
					maxAttempts,
					isPublished,
					yearSubjectId,
					trimesterId
				})
			});

			if (res.ok) {
				const data = await res.json();
				goto(`/admin/quizzes/${data.quiz.id}/builder`);
			} else {
				const data = await res.json();
				error = data.error || 'حدث خطأ أثناء الحفظ';
			}
		} catch (e: any) {
			error = e.message;
		} finally {
			saving = false;
		}
	}
</script>

<div class="mx-auto max-w-3xl space-y-6">
	<div class="flex items-center justify-between border-b border-border pb-4">
		<h1 class="text-2xl font-bold">إضافة تمرين تفاعلي جديد</h1>
	</div>

	{#if error}
		<div class="flex items-center gap-2 rounded-lg bg-red-500/10 p-4 text-red-400">
			<AlertCircle size={20} />
			{error}
		</div>
	{/if}

	<div class="space-y-6 rounded-2xl border border-border bg-card text-card-foreground shadow-sm p-6 shadow-sm">
		<!-- Titles -->
		<div class="grid gap-6 sm:grid-cols-2">
			<div class="space-y-2 text-right">
				<label for="new-quiz-title-ar" class="text-sm font-semibold text-foreground/80">العنوان (عربي) *</label>
				<input
					id="new-quiz-title-ar"
					type="text"
					bind:value={titleAr}
					placeholder="مثال: تمرين في الرياضيات الفصل الأول"
					class="w-full rounded-xl border border-border bg-background p-3 text-right text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
				/>
			</div>
			<div class="space-y-2 text-left">
				<label for="new-quiz-title" class="text-sm font-semibold text-foreground/80">* Title (FR/EN)</label>
				<input
					id="new-quiz-title"
					type="text"
					bind:value={title}
					dir="ltr"
					placeholder="Ex: Math Quiz Trimester 1"
					class="w-full rounded-xl border border-border bg-background p-3 text-left text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
				/>
			</div>
		</div>

		<!-- Linkage -->
		<div class="grid gap-6 sm:grid-cols-2">
			<div class="space-y-2 text-right">
				<label for="new-quiz-ys" class="text-sm font-semibold text-foreground/80">المادة / القسم *</label>
				<select
					id="new-quiz-ys"
					bind:value={yearSubjectId}
					class="w-full rounded-xl border border-border bg-background p-3 text-right text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
				>
					{#each yearSubjects as ys}
						<option value={ys.id}>
							{ys.streamAr ? `${ys.yearAr} - ${ys.streamAr} - ${ys.subjectAr}` : `${ys.yearAr} - ${ys.subjectAr}`}
						</option>
					{/each}
				</select>
			</div>
			<div class="space-y-2 text-right">
				<label for="new-quiz-trimester" class="text-sm font-semibold text-foreground/80">الفصل (اختياري)</label>
				<select
					id="new-quiz-trimester"
					bind:value={trimesterId}
					class="w-full rounded-xl border border-border bg-background p-3 text-right text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
				>
					<option value={undefined}>عام (بدون فصل)</option>
					{#each trimesters as t}
						<option value={t.id}>{t.name_ar}</option>
					{/each}
				</select>
			</div>
		</div>

		<!-- Description -->
		<div class="space-y-2 text-right">
			<label for="new-quiz-desc" class="text-sm font-semibold text-foreground/80">الوصف</label>
			<textarea
				id="new-quiz-desc"
				bind:value={description}
				rows="3"
				placeholder="وصف محتوى التمرين..."
				class="w-full resize-none rounded-xl border border-border bg-background p-3 text-right text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
			></textarea>
		</div>

		<!-- Settings Grid -->
		<div class="grid gap-6 sm:grid-cols-3">
			<div class="space-y-2 text-right">
				<label for="difficulty" class="text-sm font-semibold text-foreground/80">مستوى الصعوبة</label>
				<select
					id="difficulty"
					bind:value={difficulty}
					class="w-full rounded-xl border border-border bg-background p-3 text-right text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
				>
					<option value="easy">سهل</option>
					<option value="medium">متوسط</option>
					<option value="hard">صعب</option>
				</select>
			</div>
			<div class="space-y-2 text-right">
				<label for="timeLimit" class="text-sm font-semibold text-foreground/80">الوقت المخصص (بالثواني)</label>
				<input
					id="timeLimit"
					type="number"
					bind:value={timeLimit}
					min="0"
					placeholder="0 = مفتوح"
					class="w-full rounded-xl border border-border bg-background p-3 text-right text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
				/>
				<p class="text-xs text-foreground/40">استخدم 0 لوقت غير محدود</p>
			</div>
			<div class="space-y-2 text-right">
				<label for="passingScore" class="text-sm font-semibold text-foreground/80">نسبة النجاح (%)</label>
				<input
					id="passingScore"
					type="number"
					bind:value={passingScore}
					min="0"
					max="100"
					class="w-full rounded-xl border border-border bg-background p-3 text-right text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
				/>
			</div>
		</div>

		<!-- Access Tier & Toggles -->
		<div class="grid grid-cols-1 gap-4 rounded-xl border border-border bg-background p-4 sm:grid-cols-2">
			<div class="space-y-2 text-right">
				<label for="new-quiz-tier" class="text-sm font-semibold text-foreground/80">مستوى الوصول</label>
				<select
					id="new-quiz-tier"
					bind:value={accessTier}
					class="w-full rounded-xl border border-border bg-card p-2.5 text-sm outline-none focus:border-primary"
				>
					<option value="public">مجاني للجميع (عام)</option>
					<option value="registered">للمسجلين فقط (حساب مجاني)</option>
					<option value="premium">للمشتركين المميزين (Premium)</option>
				</select>
			</div>
			<div class="space-y-2 text-right">
				<label for="new-quiz-attempts" class="text-sm font-semibold text-foreground/80">الحد الأقصى للمحاولات (0 = غير محدود)</label>
				<input
					id="new-quiz-attempts"
					type="number"
					min="0"
					bind:value={maxAttempts}
					class="w-full rounded-xl border border-border bg-card p-2.5 text-sm outline-none focus:border-primary"
				/>
			</div>
			<label class="flex cursor-pointer items-center gap-3">
				<input
					type="checkbox"
					bind:checked={shuffleOptions}
					class="h-5 w-5 rounded border-border accent-blue-500"
				/>
				<span class="font-semibold text-foreground/80">خلط ترتيب الخيارات عشوائياً</span>
			</label>
			<label class="flex cursor-pointer items-center gap-3">
				<input
					type="checkbox"
					bind:checked={showAnswers}
					class="h-5 w-5 rounded border-border accent-blue-500"
				/>
				<span class="font-semibold text-foreground/80">عرض التصحيح والشرح بعد الإرسال</span>
			</label>
			<label class="flex cursor-pointer items-center gap-3 sm:col-span-2">
				<input
					type="checkbox"
					bind:checked={isPublished}
					class="h-5 w-5 rounded border-border accent-emerald-500"
				/>
				<span class="font-semibold text-foreground/80">مباشر ومنشور للطلاب (Published)</span>
			</label>
		</div>

		<div class="flex justify-end pt-4">
			<button
				onclick={save}
				disabled={saving}
				class="flex items-center gap-2 rounded-xl bg-purple-600 px-8 py-3 font-bold text-foreground shadow-lg transition-all hover:bg-purple-700 disabled:opacity-50"
			>
				{#if saving}
					<div
						class="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"
					></div>
					جاري الحفظ...
				{:else}
					<Save size={18} /> حفظ واختيار الأسئلة
				{/if}
			</button>
		</div>
	</div>
</div>
