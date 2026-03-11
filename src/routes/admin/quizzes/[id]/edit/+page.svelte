<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Save, AlertCircle, ArrowRight, Brain } from 'lucide-svelte';
	import { onMount, tick } from 'svelte';

	let quizId = $derived(page.params.id);

	let title = $state('');
	let titleAr = $state('');
	let description = $state('');
	let difficulty = $state('medium');
	let timeLimit = $state(0);
	let passingScore = $state(60);
	let isPremium = $state(false);
	let isPublished = $state(false);

	let loadingData = $state(true);
	let saving = $state(false);
	let error = $state('');

	onMount(async () => {
		try {
			const res = await fetch(`/api/admin/quizzes/${quizId}`);
			if (res.ok) {
				const data = await res.json();
				title = data.title || '';
				titleAr = data.titleAr || '';
				description = data.description || '';
				difficulty = data.difficulty || 'medium';
				timeLimit = data.timeLimit || 0;
				passingScore = data.passingScore || 60;
				isPremium = data.isPremium || false;
				isPublished = data.isPublished || false;
			} else {
				error = 'التمرين غير موجود';
			}
		} catch (e: any) {
			error = 'حدث خطأ في جلب البيانات';
		} finally {
			loadingData = false;
		}
	});

	async function save() {
		if (!title || !titleAr) {
			error = 'الرجاء ملء جميع الحقول المطلوبة (العنوان، العنوان العربي)';
			return;
		}

		saving = true;
		error = '';

		try {
			const res = await fetch(`/api/admin/quizzes/${quizId}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					title,
					titleAr,
					description,
					difficulty,
					timeLimit,
					passingScore,
					isPremium,
					isPublished
				})
			});

			if (res.ok) {
				alert('تم الحفظ بنجاح');
				goto('/admin/quizzes');
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
		<div class="flex items-center gap-4">
			<a href="/admin/quizzes" class="text-muted-foreground transition-colors hover:text-white">
				<ArrowRight size={24} />
			</a>
			<h1 class="text-2xl font-bold">تعديل التمرين: {titleAr || 'جاري التحميل...'}</h1>
		</div>
		<a
			href={`/admin/quizzes/${quizId}/builder`}
			class="flex items-center gap-2 rounded-xl bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-400 transition-colors hover:bg-blue-500/20"
		>
			<Brain size={18} /> إدارة الأسئلة
		</a>
	</div>

	{#if error}
		<div class="flex items-center gap-2 rounded-lg bg-red-500/10 p-4 text-red-400">
			<AlertCircle size={20} />
			{error}
		</div>
	{/if}

	{#if loadingData}
		<div class="flex h-32 items-center justify-center">
			<div
				class="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"
			></div>
		</div>
	{:else}
		<div class="space-y-6 rounded-2xl border border-border bg-card text-card-foreground shadow-sm p-6 shadow-sm">
			<!-- Titles (YearSubject cannot be easily changed after creation without huge refactor, kept disabled/hidden here for simplicity) -->
			<div class="grid gap-6 sm:grid-cols-2">
				<div class="space-y-2 text-right">
					<label class="text-sm font-semibold text-foreground/80">العنوان (عربي) *</label>
					<input
						type="text"
						bind:value={titleAr}
						class="w-full rounded-xl border border-border bg-background p-3 text-right text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
					/>
				</div>
				<div class="space-y-2 text-left">
					<label class="text-sm font-semibold text-foreground/80">* Title (FR/EN)</label>
					<input
						type="text"
						bind:value={title}
						dir="ltr"
						class="w-full rounded-xl border border-border bg-background p-3 text-left text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
					/>
				</div>
			</div>

			<!-- Description -->
			<div class="space-y-2 text-right">
				<label class="text-sm font-semibold text-foreground/80">الوصف</label>
				<textarea
					bind:value={description}
					rows="3"
					class="w-full resize-none rounded-xl border border-border bg-background p-3 text-right text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
				></textarea>
			</div>

			<!-- Settings Grid -->
			<div class="grid gap-6 sm:grid-cols-3">
				<div class="space-y-2 text-right">
					<label class="text-sm font-semibold text-foreground/80">مستوى الصعوبة</label>
					<select
						bind:value={difficulty}
						class="w-full rounded-xl border border-border bg-background p-3 text-right text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
					>
						<option value="easy">سهل</option>
						<option value="medium">متوسط</option>
						<option value="hard">صعب</option>
					</select>
				</div>
				<div class="space-y-2 text-right">
					<label class="text-sm font-semibold text-foreground/80">الوقت المخصص (بالثواني)</label>
					<input
						type="number"
						bind:value={timeLimit}
						min="0"
						class="w-full rounded-xl border border-border bg-background p-3 text-right text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
					/>
					<p class="text-xs text-foreground/40">استخدم 0 لوقت غير محدود</p>
				</div>
				<div class="space-y-2 text-right">
					<label class="text-sm font-semibold text-foreground/80">نسبة النجاح (%)</label>
					<input
						type="number"
						bind:value={passingScore}
						min="0"
						max="100"
						class="w-full rounded-xl border border-border bg-background p-3 text-right text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
					/>
				</div>
			</div>

			<!-- Toggles -->
			<div class="flex items-center gap-6 rounded-xl border border-border bg-background p-4">
				<label class="flex cursor-pointer items-center gap-3">
					<input
						type="checkbox"
						bind:checked={isPremium}
						class="h-5 w-5 rounded border-border accent-amber-500"
					/>
					<span class="font-semibold text-foreground/80">محتوى مدفوع (Premium)</span>
				</label>
				<label class="flex cursor-pointer items-center gap-3">
					<input
						type="checkbox"
						bind:checked={isPublished}
						class="h-5 w-5 rounded border-border accent-emerald-500"
					/>
					<span class="font-semibold text-foreground/80">مباشر (Published)</span>
				</label>
			</div>

			<div class="flex justify-end pt-4">
				<button
					onclick={save}
					disabled={saving || loadingData}
					class="flex items-center gap-2 rounded-xl bg-purple-600 px-8 py-3 font-bold text-foreground shadow-lg transition-all hover:bg-purple-700 disabled:opacity-50"
				>
					{#if saving}
						<div
							class="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"
						></div>
						جاري الحفظ...
					{:else}
						<Save size={18} /> حفظ التعديلات
					{/if}
				</button>
			</div>
		</div>
	{/if}
</div>
