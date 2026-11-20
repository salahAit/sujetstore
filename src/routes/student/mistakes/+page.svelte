<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import QuizPlayer from '#lib/modules/QuizBuilder/components/player/QuizPlayer.svelte';
	import MathRenderer from '#lib/modules/QuizBuilder/components/shared/MathRenderer.svelte';
	import {
		CheckCircle2,
		RotateCcw,
		BookMarked,
		AlertCircle,
		Play,
		ArrowRight,
		Sparkles,
		BookOpen,
		Target,
		Clock,
		Eye,
		EyeOff,
		Flame,
		ExternalLink
	} from 'lucide-svelte';

	let { data }: { data: any } = $props();

	let filterResolved = $state<'unresolved' | 'all'>('unresolved');
	let busyId = $state<number | null>(null);
	let revealedAnswers = $state<Record<number, boolean>>({});

	// Active inline QuizPlayer session (snapshotted so invalidateAll() doesn't mutate an open result screen)
	let activeSession = $state<{
		key: string;
		kind: 'all' | 'area';
		quiz: any;
		questions: any[];
		area?: any;
	} | null>(null);

	let mistakes = $derived(Array.isArray(data?.mistakes) ? data.mistakes : []);
	let weaknessAreas = $derived(Array.isArray(data?.weaknessAreas) ? data.weaknessAreas : []);
	let enrichedByQuestionId = $derived(
		data?.enrichedByQuestionId && typeof data.enrichedByQuestionId === 'object'
			? (data.enrichedByQuestionId as Record<number, any>)
			: {}
	);

	let unresolved = $derived(mistakes.filter((m: any) => !m.resolved));
	let visibleMistakes = $derived(filterResolved === 'unresolved' ? unresolved : mistakes);

	let totalWeakWrongCount = $derived(
		weaknessAreas.reduce((sum: number, area: any) => sum + Number(area.totalWrongCount || 0), 0)
	);

	function formatQuestionCountAr(count: number): string {
		if (count === 1) return 'سؤال واحد';
		if (count === 2) return 'سؤالان';
		if (count >= 3 && count <= 10) return `${count} أسئلة`;
		return `${count} سؤالاً`;
	}

	function formatErrorCountAr(count: number): string {
		if (count === 1) return 'خطأ واحد';
		if (count === 2) return 'خطآن';
		if (count >= 3 && count <= 10) return `${count} أخطاء`;
		return `${count} خطأ`;
	}

	function toPlayerQuestion(q: any, order: number) {
		return {
			id: q.id,
			questionId: q.questionId ?? q.id,
			points: q.points ?? 1,
			order,
			type: q.type,
			difficulty: q.difficulty ?? null,
			questionText: q.questionText,
			questionTextAr: q.questionTextAr ?? null,
			imageUrl: q.imageUrl ?? null,
			imageCaption: q.imageCaption ?? null,
			questionData: q.questionData ?? {},
			explanation: q.explanation ?? null
		};
	}

	function resolveAreaQuestions(area: any): any[] {
		if (Array.isArray(area?.remediationQuestions) && area.remediationQuestions.length > 0) {
			return area.remediationQuestions.map((q: any, idx: number) => toPlayerQuestion(q, idx + 1));
		}

		const ids: number[] = Array.isArray(area?.remediationQuestionIds)
			? area.remediationQuestionIds.map(Number)
			: [];
		if (ids.length === 0) return [];

		const byQid = new Map<number, any>();
		for (const m of mistakes) {
			const q = m?.question;
			if (q?.id) byQid.set(Number(q.id), q);
		}

		const resolved: any[] = [];
		for (const qid of ids) {
			const q = byQid.get(qid);
			if (q) resolved.push(toPlayerQuestion(q, resolved.length + 1));
		}
		return resolved;
	}

	function getAreaQuestionCount(area: any): number {
		if (Array.isArray(area?.remediationQuestions) && area.remediationQuestions.length > 0) {
			return area.remediationQuestions.length;
		}
		if (Array.isArray(area?.remediationQuestionIds)) {
			return area.remediationQuestionIds.length;
		}
		return 0;
	}

	function startAllRetry() {
		if (unresolved.length === 0) return;
		const questions = unresolved.map((m: any, idx: number) => toPlayerQuestion(m.question, idx + 1));
		activeSession = {
			key: `all-${Date.now()}`,
			kind: 'all',
			quiz: {
				id: 0,
				title: 'مراجعة الأخطاء',
				titleAr: `جلسة تصحيح الأخطاء (${formatQuestionCountAr(questions.length)})`,
				description: 'أعد حل الأسئلة التي أخطأت فيها سابقاً ليتم شطبها تلقائياً من دفتر الأخطاء.',
				timeLimit: 0,
				passingScore: 60,
				shuffleOptions: false,
				practiceMode: true,
				showAnswers: true
			},
			questions
		};
	}

	function startAreaRemediation(area: any) {
		const questions = resolveAreaQuestions(area);
		if (questions.length === 0) return;

		const streamPart = area.streamName ? ` — ${area.streamName}` : '';
		const trimPart = area.trimesterName ? ` (${area.trimesterName})` : '';

		activeSession = {
			key: `area-${area.key}-${Date.now()}`,
			kind: 'area',
			area,
			quiz: {
				id: 0,
				title: `جلسة علاجية — ${area.subjectName}`,
				titleAr: `جلسة علاجية مركّزة: ${area.subjectName}${trimPart}`,
				description: `${area.yearName}${streamPart} • أعد إتقان هذه الأسئلة (${formatQuestionCountAr(questions.length)}) لشطبها تلقائياً من نقاط ضعفك.`,
				timeLimit: 0,
				passingScore: 60,
				shuffleOptions: false,
				practiceMode: true,
				showAnswers: true
			},
			questions
		};
	}

	function closeSession() {
		activeSession = null;
	}

	function toggleRevealAnswer(questionId: number) {
		revealedAnswers = {
			...revealedAnswers,
			[questionId]: !revealedAnswers[questionId]
		};
	}

	function getCorrectAnswerDisplay(question: any): string {
		const qd = question?.questionData;
		if (!qd || typeof qd !== 'object') return '';
		switch (question.type) {
			case 'mcq': {
				const opts = qd.options || [];
				if (Array.isArray(qd.correctIndexes) && qd.correctIndexes.length > 0) {
					return qd.correctIndexes
						.map((origIdx: number) => {
							const match = opts.find((o: any, idx: number) =>
								typeof o === 'object' ? (o.originalIndex ?? idx) === origIdx : idx === origIdx
							);
							return typeof match === 'string' ? match : match?.text;
						})
						.filter(Boolean)
						.join(' ، ');
				}
				return opts
					.filter((o: any) => typeof o === 'object' && o.isCorrect)
					.map((o: any) => o.text)
					.join(' ، ');
			}
			case 'true_false':
				return qd.correctAnswer ? 'صحيح ✓' : 'خطأ ✗';
			case 'fill_blank':
				return (qd.answers || qd.acceptedAnswers || []).join(' أو ');
			case 'ordering':
				return (qd.correctOrder || []).map((i: number) => qd.items?.[i]).filter(Boolean).join(' ← ');
			case 'short_answer':
				return (qd.keywords || qd.acceptedKeywords || []).join(' ، ');
			case 'cloze':
				return qd.options?.[qd.correctIndex] || '';
			case 'sentence_reorder':
				return (qd.correctOrder || []).map((i: number) => qd.words?.[i]).filter(Boolean).join(' ');
			case 'matching':
				return (qd.pairs || []).map((p: any) => `${p.left} ↔ ${p.right}`).join(' | ');
			case 'drag_drop':
				return (qd.items || []).map((item: any) => `${item.text} ← ${item.category}`).join(' | ');
			case 'matrix':
				return (qd.statements || [])
					.map((s: string, i: number) => `${s}: ${qd.columns?.[qd.correctAnswers?.[i]] ?? ''}`)
					.join(' | ');
			case 'hotspot':
				return qd.zones?.[qd.correctZone]?.label || (qd.correctZone !== undefined ? `المنطقة ${qd.correctZone + 1}` : '');
			case 'drag_to_image':
				return (qd.labels || []).map((l: any) => l.text).join(' ، ');
			case 'essay':
				return qd.keywords?.length ? `الكلمات المفتاحية: ${qd.keywords.join('، ')}` : '';
			default:
				return '';
		}
	}

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

	async function handleSessionSubmit(payload: any) {
		try {
			const res = await fetch('/api/student/mistakes', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ action: 'retrySubmit', answers: payload.answers })
			});
			if (res.ok) {
				const out = await res.json();
				await invalidateAll();
				return out;
			}
		} catch {
			// Fallback to /api/generator grading endpoint below
		}

		try {
			const fallbackRes = await fetch('/api/generator', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					mode: 'grade',
					answers: payload.answers,
					timeTaken: payload.timeTaken ?? 0
				})
			});
			const out = await fallbackRes.json();
			await invalidateAll();
			return out;
		} catch {
			return { error: 'تعذر إرسال الإجابات، يرجى المحاولة لاحقاً' };
		}
	}
</script>

<svelte:head>
	<title>دفتر الأخطاء والمراجعة العلاجية - SujetStore</title>
</svelte:head>

{#if activeSession}
	<div class="space-y-4">
		<div
			class="bg-card flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4 shadow-sm"
		>
			<button
				onclick={closeSession}
				class="bg-background hover:bg-accent inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold transition"
			>
				<ArrowRight size={16} />
				العودة إلى خطة المراجعة ودفتر الأخطاء
			</button>

			{#if activeSession.kind === 'area' && activeSession.area?.recommendedLesson?.url}
				<a
					href={activeSession.area.recommendedLesson.url}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-600 transition hover:bg-emerald-500 hover:text-white dark:text-emerald-300"
				>
					<BookOpen size={15} />
					راجع الدرس في دقيقتين
					<ExternalLink size={12} />
				</a>
			{/if}
		</div>

		{#key activeSession.key}
			<QuizPlayer
				quiz={activeSession.quiz}
				rawQuestions={activeSession.questions}
				onSubmit={handleSessionSubmit}
			/>
		{/key}
	</div>
{:else}
	<div class="space-y-6">
		<!-- Adaptive Weakness Remediation Plan -->
		{#if weaknessAreas.length > 0}
			<section
				aria-labelledby="remediation-plan-heading"
				class="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/[0.07] via-card to-rose-500/[0.06] p-5 shadow-sm backdrop-blur-xl sm:p-6 dark:border-indigo-400/20 dark:from-indigo-500/[0.12] dark:via-slate-900/80 dark:to-rose-500/[0.10]"
			>
				<div class="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
					<div class="flex items-start gap-3.5">
						<div
							class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-rose-500 text-white shadow-md shadow-indigo-500/20"
						>
							<Sparkles size={21} />
						</div>
						<div>
							<div class="flex flex-wrap items-center gap-2">
								<h2 id="remediation-plan-heading" class="text-lg font-extrabold tracking-tight sm:text-xl">
									خطة المراجعة العلاجية الذكية
								</h2>
								<span
									class="inline-flex items-center gap-1 rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-[11px] font-extrabold text-indigo-600 dark:text-indigo-300"
								>
									<Target size={12} />
									{weaknessAreas.length} محاور ذات أولوية
								</span>
							</div>
							<p class="text-muted-foreground mt-1 text-xs leading-relaxed sm:text-sm">
								رتّبنا لك نقاط الضعف حسب تكرار الأخطاء: راجع الدرس المركّز في دقيقتين ثم خض جلسة علاجية قصيرة لشطبها نهائياً.
							</p>
						</div>
					</div>

					{#if totalWeakWrongCount > 0}
						<div
							class="inline-flex shrink-0 items-center gap-2 self-start rounded-2xl border border-rose-500/25 bg-rose-500/10 px-3.5 py-2 text-xs font-extrabold text-rose-600 sm:self-center dark:text-rose-300"
						>
							<Flame size={15} />
							<span>إجمالي الأخطاء المتكررة: {totalWeakWrongCount}</span>
						</div>
					{/if}
				</div>

				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					{#each weaknessAreas as area, idx (area.key)}
						{@const qCount = getAreaQuestionCount(area)}
						{@const lessonUrl = area.recommendedLesson?.url ?? area.recommendedLesson?.lessonUrl ?? null}
						{@const lessonTitle = area.recommendedLesson?.titleAr ?? area.recommendedLesson?.lessonTitle ?? null}
						<article
							class="group relative flex flex-col justify-between gap-4 rounded-2xl border border-black/10 bg-white/75 p-4 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-indigo-500/35 hover:shadow-md dark:border-white/10 dark:bg-slate-900/65 dark:hover:border-indigo-400/35"
						>
							<div class="space-y-3">
								<!-- Badges row -->
								<div class="flex flex-wrap items-center justify-between gap-2">
									<div class="flex flex-wrap items-center gap-1.5">
										{#if idx === 0}
											<span
												class="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-rose-600 to-orange-500 px-2.5 py-1 text-[11px] font-extrabold text-white shadow-sm"
											>
												<Flame size={11} /> أولوية قصوى
											</span>
										{:else}
											<span
												class="bg-muted text-muted-foreground inline-flex items-center rounded-lg px-2 py-1 text-[11px] font-extrabold"
											>
												أولوية #{idx + 1}
											</span>
										{/if}

										{#if area.trimesterName}
											<span
												class="rounded-lg bg-indigo-500/10 px-2.5 py-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-300"
											>
												{area.trimesterName}
											</span>
										{/if}
									</div>

									<span
										class="inline-flex items-center gap-1 rounded-full border border-rose-500/25 bg-rose-500/10 px-2.5 py-1 text-[11px] font-extrabold text-rose-600 dark:text-rose-300"
									>
										<AlertCircle size={12} />
										{formatErrorCountAr(area.totalWrongCount)}
										<span class="opacity-65">·</span>
										{formatQuestionCountAr(area.mistakeCount)}
									</span>
								</div>

								<!-- Subject & Year heading -->
								<div>
									<h3 class="text-base font-extrabold leading-snug">
										{area.subjectName}
									</h3>
									<p class="text-muted-foreground mt-0.5 text-xs font-semibold">
										{area.yearName}
										{#if area.streamName}
											<span> · {area.streamName}</span>
										{/if}
									</p>
								</div>

								<!-- Recommended lesson callout -->
								{#if lessonTitle}
									<div
										class="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] px-3 py-2.5 dark:bg-emerald-500/10"
									>
										<div class="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
											<Clock size={12} />
											<span>الدرس التفاعلي المقترح للمراجعة السريعة:</span>
										</div>
										<p class="mt-1 line-clamp-2 text-xs font-extrabold leading-relaxed text-foreground">
											{lessonTitle}
										</p>
									</div>
								{/if}
							</div>

							<!-- Action buttons -->
							<div class="flex flex-wrap items-center gap-2 pt-1">
								{#if lessonUrl}
									<a
										href={lessonUrl}
										class="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-3.5 py-2.5 text-xs font-extrabold text-emerald-700 transition hover:bg-emerald-600 hover:text-white dark:text-emerald-300 dark:hover:bg-emerald-500 dark:hover:text-white"
									>
										<BookOpen size={14} />
										<span>راجع الدرس في دقيقتين</span>
									</a>
								{/if}

								<button
									type="button"
									onclick={() => startAreaRemediation(area)}
									disabled={qCount === 0}
									class="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3.5 py-2.5 text-xs font-extrabold text-white shadow-sm shadow-indigo-600/20 transition hover:from-indigo-700 hover:to-violet-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
								>
									<Play size={13} />
									<span>جلسة علاجية ({formatQuestionCountAr(qCount)})</span>
								</button>
							</div>
						</article>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Existing Mistake Notebook Header & Controls -->
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
						type="button"
						onclick={() => (filterResolved = 'unresolved')}
						class="rounded-lg px-3 py-1.5 transition {filterResolved === 'unresolved'
							? 'bg-background shadow'
							: 'text-muted-foreground'}"
					>
						للمراجعة ({unresolved.length})
					</button>
					<button
						type="button"
						onclick={() => (filterResolved = 'all')}
						class="rounded-lg px-3 py-1.5 transition {filterResolved === 'all'
							? 'bg-background shadow'
							: 'text-muted-foreground'}"
					>
						الكل ({mistakes.length})
					</button>
				</div>

				{#if unresolved.length > 0}
					<button
						type="button"
						onclick={startAllRetry}
						class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow transition hover:bg-rose-700"
					>
						<Play size={14} /> تمرّن على أخطائي الآن
					</button>
				{/if}
			</div>
		</div>

		<!-- Mistake Cards List -->
		{#if visibleMistakes.length === 0}
			<div class="bg-card rounded-2xl border py-14 text-center">
				<CheckCircle2 size={44} class="mx-auto mb-3 text-emerald-500" />
				<p class="text-base font-extrabold">ممتاز! لا توجد أخطاء غير محلولة حالياً.</p>
				<p class="text-muted-foreground mt-1 text-xs">واصل التدرّب في التمارين التفاعلية للمحافظة على مستواك.</p>
			</div>
		{:else}
			<div class="space-y-3">
				{#each visibleMistakes as item (item.id ?? item.question?.id)}
					{@const q = item.question}
					{@const isRevealed = Boolean(revealedAnswers[q.id])}
					{@const correctAns = getCorrectAnswerDisplay(q)}
					{@const meta = enrichedByQuestionId[q.id]}
					{@const itemLessonUrl = item.lessonUrl ?? meta?.lessonUrl ?? null}
					<div class="bg-card rounded-2xl border p-4 shadow-sm transition hover:border-primary/25">
						<div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
							<div class="min-w-0 flex-1 space-y-2">
								<div class="flex flex-wrap items-center gap-2 text-xs">
									{#if q.yearName || q.subjectName}
										<span class="rounded-lg bg-blue-500/10 px-2.5 py-0.5 font-bold text-blue-600 dark:text-blue-400">
											{q.yearName || ''}{q.yearName && q.subjectName ? ' · ' : ''}{q.subjectName || ''}
										</span>
									{/if}
									{#if meta?.trimesterName}
										<span class="rounded-lg bg-indigo-500/10 px-2 py-0.5 font-bold text-indigo-600 dark:text-indigo-300">
											{meta.trimesterName}
										</span>
									{/if}
									<span class="rounded-lg bg-rose-500/10 px-2.5 py-0.5 font-bold text-rose-600 dark:text-rose-400">
										<AlertCircle size={11} class="inline" /> أخطأت {item.wrong_count ?? item.wrongCount ?? 1} مرة
									</span>
									{#if item.resolved}
										<span class="rounded-lg bg-emerald-500/15 px-2.5 py-0.5 font-bold text-emerald-600 dark:text-emerald-400">
											تم الإتقان ✓
										</span>
									{/if}
								</div>

								<div class="text-sm font-bold leading-relaxed">
									<MathRenderer content={q.questionTextAr || q.questionText} inline={true} />
								</div>

								{#if isRevealed}
									<div class="space-y-2 pt-1">
										{#if correctAns}
											<div
												class="rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-300"
											>
												<span class="ml-1 font-extrabold">الإجابة الصحيحة:</span>
												<MathRenderer content={correctAns} inline={true} />
											</div>
										{/if}
										{#if q.explanation}
											<div
												class="rounded-xl border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-xs leading-relaxed text-amber-700 dark:text-amber-300"
											>
												<span class="ml-1 font-extrabold">💡 الشرح:</span>
												<MathRenderer content={q.explanation} inline={true} />
											</div>
										{/if}
									</div>
								{/if}
							</div>

							<div class="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-stretch">
								{#if correctAns || q.explanation}
									<button
										type="button"
										onclick={() => toggleRevealAnswer(q.id)}
										class="bg-muted hover:bg-accent inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition"
									>
										{#if isRevealed}
											<EyeOff size={13} /> إخفاء الإجابة
										{:else}
											<Eye size={13} /> إظهار الإجابة
										{/if}
									</button>
								{/if}

								{#if itemLessonUrl}
									<a
										href={itemLessonUrl}
										class="inline-flex items-center justify-center gap-1.5 rounded-xl border border-indigo-500/25 bg-indigo-500/10 px-3 py-2 text-xs font-bold text-indigo-600 transition hover:bg-indigo-600 hover:text-white dark:text-indigo-300"
									>
										<BookOpen size={13} /> مراجعة الدرس
									</a>
								{/if}

								{#if !item.resolved}
									<button
										type="button"
										onclick={() => markResolved(q.id)}
										disabled={busyId === q.id}
										class="inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-600 transition hover:bg-emerald-500 hover:text-white disabled:opacity-50 dark:text-emerald-400"
									>
										<RotateCcw size={13} /> تحديد كمُراجع
									</button>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}
