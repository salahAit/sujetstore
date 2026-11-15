<script lang="ts">
	import { page } from '$app/state';
	import QuizPlayer from '#lib/modules/QuizBuilder/components/player/QuizPlayer.svelte';
	import ShareModal from '#lib/components/ShareModal.svelte';
	import { Lock, LogIn, UserPlus, Sparkles, AlertTriangle, ArrowRight } from 'lucide-svelte';

	let { data } = $props();
	let quiz = $derived(data.quiz);
	let questions = $derived(data.questions || []);

	let isShareModalOpen = $state(false);

	let maxReached = $derived(
		Boolean(quiz.maxAttempts && quiz.maxAttempts > 0 && data.attemptsUsed >= quiz.maxAttempts)
	);

	async function handleSubmit(payload: any) {
		try {
			const res = await fetch(`/api/quizzes/${quiz.id}/submit`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});
			return await res.json();
		} catch (err) {
			console.error('Failed to submit quiz attempt:', err);
			return { error: 'تعذر حفظ النتيجة على الخادم' };
		}
	}

	let nextQuery = $derived(`?next=${encodeURIComponent(`/quizzes/${quiz.slug}`)}`);
	let portalBase = $derived(data.dynamicPortalUrl || '');
</script>

<svelte:head>
	<title>{quiz.titleAr || quiz.title} - SujetStore</title>
</svelte:head>

{#if data.isLocked}
	<div class="mx-auto max-w-2xl px-4 py-12 sm:px-6">
		<div class="bg-card rounded-3xl border border-amber-500/30 p-8 text-center shadow-xl">
			<div
				class="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-500"
			>
				<Lock size={38} />
			</div>
			<p class="text-muted-foreground mb-2 text-xs font-semibold">
				{data.level.nameAr} · {data.year.nameAr} · {data.subject.nameAr}
			</p>
			<h1 class="mb-3 text-2xl font-extrabold">{quiz.titleAr || quiz.title}</h1>

			{#if data.lockReason === 'premium_required'}
				<p class="text-muted-foreground mx-auto mb-6 max-w-md text-sm leading-relaxed">
					هذا التمرين التفاعلي مخصّص لمشتركي <span class="font-bold text-amber-500">SujetStore Pro</span>. فعّل اشتراكك أو أدخل كود القسيمة للوصول الفوري مع تتبع الأخطاء والنقاط.
				</p>
				<div class="flex flex-wrap items-center justify-center gap-3">
					<a
						href={`${portalBase}/student/activate`}
						class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-amber-500 to-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/25 transition-all hover:-translate-y-0.5"
					>
						<Sparkles size={18} />
						تفعيل الاشتراك / كود قسيمة
					</a>
					{#if !data.user}
						<a
							href={`${portalBase}/auth/login${nextQuery}`}
							class="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold transition-colors hover:bg-black/5 dark:hover:bg-white/5"
						>
							<LogIn size={18} />
							تسجيل الدخول
						</a>
					{/if}
				</div>
			{:else}
				<p class="text-muted-foreground mx-auto mb-6 max-w-md text-sm leading-relaxed">
					هذا التمرين مجاني بالكامل ولكنه متاح للأعضاء المسجّلين لحفظ نتائجك، سجل نقاطك (XP)، ودفتر أخطائك الشخصي.
				</p>
				<div class="flex flex-wrap items-center justify-center gap-3">
					<a
						href={`${portalBase}/auth/register${nextQuery}`}
						class="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold shadow-lg transition-all hover:-translate-y-0.5"
					>
						<UserPlus size={18} />
						إنشاء حساب مجاني
					</a>
					<a
						href={`${portalBase}/auth/login${nextQuery}`}
						class="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold transition-colors hover:bg-black/5 dark:hover:bg-white/5"
					>
						<LogIn size={18} />
						لدي حساب — دخول
					</a>
				</div>
			{/if}

			<div class="mt-8 border-t pt-4">
				<a
					href={`/${data.level.slug}/${data.year.slug}/${data.subject.slug}`}
					class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs font-semibold"
				>
					<ArrowRight size={14} /> العودة إلى {data.subject.nameAr}
				</a>
			</div>
		</div>
	</div>
{:else}
	{#if maxReached}
		<div class="mx-auto max-w-3xl px-4 pt-6 sm:px-6">
			<div
				class="flex items-center gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-600 dark:text-amber-300"
			>
				<AlertTriangle size={20} class="shrink-0" />
				<span>
					لقد استنفدت الحد الأقصى للمحاولات المسجّلة ({quiz.maxAttempts} محاولات). يمكنك مراجعة المادة أو التدرّب في وضع التدريب إذا كان متاحاً.
				</span>
			</div>
		</div>
	{/if}

	<QuizPlayer
		{quiz}
		rawQuestions={questions}
		examDisabled={maxReached}
		onSubmit={handleSubmit}
		onShare={() => (isShareModalOpen = true)}
	/>

	<ShareModal bind:isOpen={isShareModalOpen} title={quiz.titleAr || quiz.title} url={page.url.href} />
{/if}
