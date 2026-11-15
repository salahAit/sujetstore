<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import QuizPlayer from '#lib/modules/QuizBuilder/components/player/QuizPlayer.svelte';
	import { CheckCircle2, RotateCcw, BookMarked, AlertCircle, Play, ArrowRight } from 'lucide-svelte';

	let { data }: { data: any } = $props();
	let filterResolved = $state<'unresolved' | 'all'>('unresolved');
	let retryMode = $state(false);
	let busyId = $state<number | null>(null);

	let unresolved = $derived(data.mistakes.filter((m: any) => !m.resolved));
	let visibleMistakes = $derived(filterResolved === 'unresolved' ? unresolved : data.mistakes);

	let retryQuiz = $derived({
		id: 0,
		title: 'مراجعة الأخطاء',
		titleAr: `جلسة تصحيح الأخطاء (${unresolved.length} سؤال)`,
		description: 'أعد حل الأسئلة التي أخطأت فيها سابقاً ليتم شطبها تلقائياً من دفتر الأخطاء.',
		timeLimit: 0,
		passingScore: 60,
		shuffleOptions: false,
		practiceMode: true,
		showAnswers: true
	});

	let retryQuestions = $derived(
		unresolved.map((m: any, idx: number) => ({
			id: m.question.id,
			questionId: m.question.id,
			points: 1,
			order: idx + 1,
			type: m.question.type,
			difficulty: m.question.difficulty,
			questionText: m.question.questionText,
			questionTextAr: m.question.questionTextAr,
			imageUrl: m.question.imageUrl,
			imageCaption: m.question.imageCaption,
			questionData: m.question.questionData,
			explanation: m.question.explanation
		}))
	);

	async function markResolved(questionId: number) {
		busyId = questionId;
		try {
			const res = await fetch('/api/student/mistakes', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ action: 'resolve', questionId })
			});
			if (res.ok) await invalidateAll();
		} finally {
			busyId = null;
		}
	}

	async function handleRetrySubmit(payload: any) {
		try {
			const res = await fetch('/api/student/mistakes', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ action: 'retrySubmit', answers: payload.answers })
			});
			const out = await res.json();
			await invalidateAll();
			return out;
		} catch {
			return { error: 'تعذر إرسال الإجابات' };
		}
	}
</script>

<svelte:head>
	<title>دفتر الأخطاء والمراجعة - SujetStore</title>
</svelte:head>

{#if retryMode}
	<div class="mb-4">
		<button
			onclick={() => (retryMode = false)}
			class="bg-card inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold hover:bg-accent"
		>
			<ArrowRight size={16} /> العودة إلى قائمة دفتر الأخطاء
		</button>
	</div>
	<QuizPlayer quiz={retryQuiz} rawQuestions={retryQuestions} onSubmit={handleRetrySubmit} />
{:else}
	<div class="space-y-5">
		<div class="bg-card flex flex-col justify-between gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center">
			<div>
				<h2 class="flex items-center gap-2 text-lg font-extrabold">
					<BookMarked size={20} class="text-rose-500" /> دفتر الأخطاء التلقائي
				</h2>
				<p class="text-muted-foreground mt-1 text-xs">
					تُسجّل هنا كل الأسئلة التي أخطأت فيها أثناء التمارين التفاعلية لتراجعها وتعيد حلها حتى تتقنها.
				</p>
			</div>

			<div class="flex flex-wrap items-center gap-2">
				<div class="bg-muted flex rounded-xl p-1 text-xs font-bold">
					<button
						onclick={() => (filterResolved = 'unresolved')}
						class="rounded-lg px-3 py-1.5 transition {filterResolved === 'unresolved'
							? 'bg-background shadow'
							: 'text-muted-foreground'}"
					>
						للمراجعة ({unresolved.length})
					</button>
					<button
						onclick={() => (filterResolved = 'all')}
						class="rounded-lg px-3 py-1.5 transition {filterResolved === 'all'
							? 'bg-background shadow'
							: 'text-muted-foreground'}"
					>
						الكل ({data.mistakes.length})
					</button>
				</div>

				{#if unresolved.length > 0}
					<button
						onclick={() => (retryMode = true)}
						class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow transition hover:bg-rose-700"
					>
						<Play size={14} /> تمرّن على أخطائي الآن
					</button>
				{/if}
			</div>
		</div>

		{#if visibleMistakes.length === 0}
			<div class="bg-card rounded-2xl border py-14 text-center">
				<CheckCircle2 size={44} class="mx-auto mb-3 text-emerald-500" />
				<p class="text-base font-extrabold">ممتاز! لا توجد أخطاء غير محلولة حالياً.</p>
				<p class="text-muted-foreground mt-1 text-xs">واصل التدرّب في التمارين التفاعلية للمحافظة على مستواك.</p>
			</div>
		{:else}
			<div class="space-y-3">
				{#each visibleMistakes as item}
					<div class="bg-card rounded-2xl border p-4 shadow-sm">
						<div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
							<div class="space-y-1.5">
								<div class="flex flex-wrap items-center gap-2 text-xs">
									{#if item.question.yearName}
										<span class="rounded bg-blue-500/10 px-2 py-0.5 font-bold text-blue-500">
											{item.question.yearName} · {item.question.subjectName}
										</span>
									{/if}
									<span class="rounded bg-rose-500/10 px-2 py-0.5 font-bold text-rose-500">
										<AlertCircle size={11} class="inline" /> أخطأت {item.wrong_count} مرة
									</span>
									{#if item.resolved}
										<span class="rounded bg-emerald-500/15 px-2 py-0.5 font-bold text-emerald-500">
											تم الإتقان ✓
										</span>
									{/if}
								</div>
								<p class="text-sm font-bold leading-relaxed">
									{item.question.questionTextAr || item.question.questionText}
								</p>
								{#if item.question.explanation}
									<p class="rounded-lg bg-amber-500/10 p-2 text-xs text-amber-600 dark:text-amber-300">
										💡 {item.question.explanation}
									</p>
								{/if}
							</div>

							{#if !item.resolved}
								<button
									onclick={() => markResolved(item.question.id)}
									disabled={busyId === item.question.id}
									class="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-600 transition hover:bg-emerald-500 hover:text-white disabled:opacity-50"
								>
									<RotateCcw size={13} /> تحديد كمُراجع
								</button>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}
