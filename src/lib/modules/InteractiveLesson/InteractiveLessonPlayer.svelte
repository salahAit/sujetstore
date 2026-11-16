<script lang="ts">
	import {
		AlertTriangle,
		ArrowLeft,
		ArrowRight,
		BookOpen,
		Brain,
		CheckCircle,
		Compass,
		Eye,
		Layers,
		Lightbulb,
		RotateCcw,
		Sparkles,
		Tag,
		Target,
		Trophy,
		Unlock,
		XCircle
	} from 'lucide-svelte';
	import MathRenderer from '#lib/modules/QuizBuilder/components/shared/MathRenderer.svelte';
	import type { InteractiveLessonData } from '#lib/modules/MathTemplates/types';

	let { lesson }: { lesson: InteractiveLessonData } = $props();

	type SectionTab = 'discover' | 'summary' | 'practice' | 'all';
	type VisualAsset =
		| { kind: 'inline'; html: string }
		| { kind: 'img'; src: string }
		| null;

	const gradeLabels: Record<string, string> = {
		'2ap': 'السنة الثانية ابتدائي',
		'5ap': 'السنة الخامسة ابتدائي',
		'2am': 'السنة الثانية متوسط'
	};

	const trimesterLabels: Record<string, string> = {
		t1: 'الفصل الأول',
		t2: 'الفصل الثاني',
		t3: 'الفصل الثالث'
	};

	const optionLetters = ['أ', 'ب', 'ج', 'د'];

	let activeSection = $state<SectionTab>('discover');

	// Discover section state
	let unlockedSteps = $state(1);
	let shownHints = $state<Record<number, boolean>>({});
	let revealedSteps = $state<Record<number, boolean>>({});
	let stepInputs = $state<Record<number, string>>({});
	let stepCheckStatus = $state<Record<number, 'empty' | 'correct' | 'incorrect'>>({});

	// Practice section state
	let selectedOptions = $state<Record<number, number>>({});
	let firstAttemptOptions = $state<Record<number, number>>({});
	let shownExplanations = $state<Record<number, boolean>>({});

	let trackedLessonId = $state<string | null>(null);

	function resetAllState() {
		activeSection = 'discover';
		unlockedSteps = 1;
		shownHints = {};
		revealedSteps = {};
		stepInputs = {};
		stepCheckStatus = {};
		selectedOptions = {};
		firstAttemptOptions = {};
		shownExplanations = {};
	}

	$effect(() => {
		const currentId = lesson?.id ?? null;
		if (trackedLessonId !== null && trackedLessonId !== currentId) {
			resetAllState();
		}
		trackedLessonId = currentId;
	});

	let objectives = $derived(lesson?.objectives ?? []);
	let keywords = $derived(lesson?.keywordsAr ?? []);
	let steps = $derived(lesson?.discover?.steps ?? []);
	let rules = $derived(lesson?.summary?.rulesAr ?? []);
	let examples = $derived(lesson?.summary?.examples ?? []);
	let practiceList = $derived(lesson?.practice ?? []);

	let visibleStepsCount = $derived(
		steps.length === 0 ? 0 : Math.min(steps.length, Math.max(1, unlockedSteps))
	);
	let revealedCount = $derived(steps.filter((_, i) => Boolean(revealedSteps[i])).length);
	let discoverCompleted = $derived(steps.length > 0 && revealedCount === steps.length);

	let attemptedCount = $derived(
		practiceList.filter((_, i) => firstAttemptOptions[i] !== undefined).length
	);
	let allAttempted = $derived(practiceList.length > 0 && attemptedCount === practiceList.length);
	let firstTryScore = $derived(
		practiceList.filter((q, i) => firstAttemptOptions[i] === q.correctIndex).length
	);
	let resolvedScore = $derived(
		practiceList.filter((q, i) => selectedOptions[i] === q.correctIndex).length
	);

	let discoverVisual = $derived(parseSafeVisual(lesson?.discover?.svg));
	let summaryVisual = $derived(parseSafeVisual(lesson?.summary?.visualSvg));

	function parseSafeVisual(raw?: string | null): VisualAsset {
		if (!raw || typeof raw !== 'string') return null;
		const trimmed = raw.trim();
		if (!trimmed) return null;

		if (/^(\/[^/]|https?:\/\/|data:image\/(png|jpeg|webp|svg\+xml))/i.test(trimmed)) {
			return { kind: 'img', src: trimmed };
		}

		const match = trimmed.match(/<svg[\s\S]*<\/svg>/i);
		if (!match) return null;

		const sanitized = match[0]
			.replace(/<script[\s\S]*?<\/script>/gi, '')
			.replace(/<script[^>]*\/>/gi, '')
			.replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, '')
			.replace(/<(iframe|object|embed|link|meta)[^>]*>[\s\S]*?<\/\1>/gi, '')
			.replace(/<(iframe|object|embed|link|meta)[^>]*\/?>/gi, '')
			.replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
			.replace(
				/\s(href|xlink:href|src)\s*=\s*(?:"\s*(?:javascript:|data:text\/html)[^"]*"|'\s*(?:javascript:|data:text\/html)[^']*')/gi,
				''
			);

		return { kind: 'inline', html: sanitized };
	}

	function normalizeInput(value: string): string {
		const easternDigits = '٠١٢٣٤٥٦٧٨٩';
		let out = value.trim();
		for (let i = 0; i < 10; i++) {
			out = out.replaceAll(easternDigits[i], String(i));
		}
		out = out
			.replaceAll('٫', '.')
			.replaceAll('،', ',')
			.replace(/\$/g, '')
			.replace(/\s+/g, ' ')
			.trim()
			.toLowerCase();

		if (/^[+-]?\d+,\d+$/.test(out)) {
			out = out.replace(',', '.');
		}
		out = out.replace(/\s*([=+\-*/×÷<>])\s*/g, '$1');
		return out;
	}

	function toggleHint(stepIdx: number) {
		shownHints = { ...shownHints, [stepIdx]: !shownHints[stepIdx] };
	}

	function revealStep(stepIdx: number) {
		revealedSteps = { ...revealedSteps, [stepIdx]: true };
		unlockedSteps = Math.max(unlockedSteps, Math.min(steps.length, stepIdx + 2));
	}

	function checkStepInput(stepIdx: number) {
		const step = steps[stepIdx];
		if (!step?.expectedInput) return;
		const raw = stepInputs[stepIdx] ?? '';
		if (!raw.trim()) {
			stepCheckStatus = { ...stepCheckStatus, [stepIdx]: 'empty' };
			return;
		}
		const isMatch = normalizeInput(raw) === normalizeInput(step.expectedInput);
		stepCheckStatus = { ...stepCheckStatus, [stepIdx]: isMatch ? 'correct' : 'incorrect' };
		if (isMatch) {
			revealStep(stepIdx);
		}
	}

	function revealAllSteps() {
		const nextRevealed: Record<number, boolean> = {};
		for (let i = 0; i < steps.length; i++) {
			nextRevealed[i] = true;
		}
		revealedSteps = nextRevealed;
		unlockedSteps = steps.length;
	}

	function resetDiscover() {
		unlockedSteps = 1;
		shownHints = {};
		revealedSteps = {};
		stepInputs = {};
		stepCheckStatus = {};
	}

	function selectPracticeOption(qIdx: number, optIdx: number) {
		const q = practiceList[qIdx];
		if (!q) return;
		if (selectedOptions[qIdx] === q.correctIndex) return;

		selectedOptions = { ...selectedOptions, [qIdx]: optIdx };
		if (firstAttemptOptions[qIdx] === undefined) {
			firstAttemptOptions = { ...firstAttemptOptions, [qIdx]: optIdx };
		}
	}

	function toggleExplanation(qIdx: number) {
		shownExplanations = { ...shownExplanations, [qIdx]: !shownExplanations[qIdx] };
	}

	function resetPractice() {
		selectedOptions = {};
		firstAttemptOptions = {};
		shownExplanations = {};
	}
</script>

{#snippet visualFigure(asset: VisualAsset, altText: string, caption?: string)}
	{#if asset}
		<div class="my-4 flex flex-col items-center">
			<div
				class="border-border max-w-full overflow-x-auto rounded-xl border bg-white p-3 text-slate-900 shadow-xs sm:p-4 dark:border-white/15"
			>
				{#if asset.kind === 'inline'}
					<div class="lesson-svg mx-auto flex justify-center">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html asset.html}
					</div>
				{:else}
					<img
						src={asset.src}
						alt={altText}
						class="mx-auto max-h-80 max-w-full object-contain"
					/>
				{/if}
			</div>
			{#if caption}
				<div class="text-muted-foreground mt-2 max-w-2xl text-center text-xs font-medium sm:text-sm">
					<MathRenderer content={caption} />
				</div>
			{/if}
		</div>
	{/if}
{/snippet}

<div class="lesson-player space-y-5 text-right" dir="rtl">
	<!-- Lesson Header Card -->
	<header class="bg-card border-border rounded-2xl border p-4 shadow-sm sm:p-6">
		<div class="mb-3 flex flex-wrap items-center gap-2">
			{#if lesson.grade}
				<span
					class="rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-xs font-bold text-blue-600 dark:text-blue-400"
				>
					{gradeLabels[lesson.grade] || lesson.grade}
				</span>
			{/if}
			{#if lesson.trimesterId}
				<span
					class="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400"
				>
					{trimesterLabels[lesson.trimesterId] || lesson.trimesterId}
				</span>
			{/if}
			{#if lesson.sequenceTitleAr}
				<span
					class="border-border bg-muted text-muted-foreground rounded-full border px-2.5 py-0.5 text-xs font-semibold"
				>
					{lesson.sequenceTitleAr}
				</span>
			{/if}
		</div>

		<h2 class="text-card-foreground text-xl font-extrabold leading-snug sm:text-2xl">
			{lesson.titleAr}
		</h2>

		{#if objectives.length > 0}
			<div class="mt-4 space-y-2">
				<div class="text-muted-foreground flex items-center gap-1.5 text-xs font-bold">
					<Target size={15} class="text-blue-500" />
					<span>أهداف التعلم:</span>
				</div>
				<div class="flex flex-wrap gap-2">
					{#each objectives as obj}
						<span
							class="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300"
						>
							<CheckCircle size={14} class="shrink-0 text-emerald-500" />
							<span class="lesson-inline-math"><MathRenderer content={obj} /></span>
						</span>
					{/each}
				</div>
			</div>
		{/if}

		{#if keywords.length > 0}
			<div class="border-border mt-4 flex flex-wrap items-center gap-2 border-t pt-3">
				<span class="text-muted-foreground inline-flex items-center gap-1 text-xs font-bold">
					<Tag size={13} />
					الكلمات المفتاحية:
				</span>
				{#each keywords as kw}
					<span
						class="border-border bg-muted text-muted-foreground rounded-lg border px-2.5 py-0.5 text-xs font-medium"
					>
						{kw}
					</span>
				{/each}
			</div>
		{/if}
	</header>

	<!-- Interactive Stage Navigation Tabs -->
	<nav
		aria-label="مراحل الدرس التفاعلي"
		class="bg-card border-border flex flex-wrap items-center justify-between gap-2 rounded-2xl border p-2 shadow-sm"
	>
		<div class="grid w-full grid-cols-2 gap-1.5 sm:flex sm:w-auto sm:flex-1 sm:flex-wrap">
			<button
				type="button"
				onclick={() => (activeSection = 'discover')}
				class="flex items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-bold transition sm:text-sm {activeSection ===
				'discover'
					? 'bg-blue-600 text-white shadow-sm'
					: 'text-muted-foreground hover:bg-muted hover:text-foreground'}"
			>
				<Compass size={16} />
				<span>1. أكتشف</span>
				{#if discoverCompleted}
					<CheckCircle
						size={14}
						class={activeSection === 'discover' ? 'text-white' : 'text-emerald-500'}
					/>
				{/if}
			</button>

			<button
				type="button"
				onclick={() => (activeSection = 'summary')}
				class="flex items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-bold transition sm:text-sm {activeSection ===
				'summary'
					? 'bg-blue-600 text-white shadow-sm'
					: 'text-muted-foreground hover:bg-muted hover:text-foreground'}"
			>
				<BookOpen size={16} />
				<span>2. أفهم وأتذكر</span>
			</button>

			<button
				type="button"
				onclick={() => (activeSection = 'practice')}
				class="flex items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-bold transition sm:text-sm {activeSection ===
				'practice'
					? 'bg-blue-600 text-white shadow-sm'
					: 'text-muted-foreground hover:bg-muted hover:text-foreground'}"
			>
				<Brain size={16} />
				<span>3. أتمرن الآن</span>
				{#if allAttempted}
					<span
						dir="ltr"
						class="rounded-full px-1.5 py-0.5 text-[11px] font-extrabold {activeSection ===
						'practice'
							? 'bg-white/20 text-white'
							: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'}"
					>
						{firstTryScore}/{practiceList.length}
					</span>
				{/if}
			</button>

			<button
				type="button"
				onclick={() => (activeSection = 'all')}
				class="flex items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-bold transition sm:text-sm {activeSection ===
				'all'
					? 'bg-slate-800 text-white shadow-sm dark:bg-slate-200 dark:text-slate-900'
					: 'text-muted-foreground hover:bg-muted hover:text-foreground'}"
			>
				<Layers size={16} />
				<span>عرض الكل</span>
			</button>
		</div>
	</nav>

	<!-- SECTION 1: أكتشف (وضعية الانطلاق التفاعلية) -->
	{#if activeSection === 'discover' || activeSection === 'all'}
		<section class="bg-card border-border space-y-5 rounded-2xl border p-4 shadow-sm sm:p-6">
			<div class="border-border flex flex-wrap items-center justify-between gap-2 border-b pb-3">
				<div class="flex items-center gap-2.5">
					<span
						class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400"
					>
						<Sparkles size={19} />
					</span>
					<div>
						<h3 class="text-card-foreground text-base font-extrabold sm:text-lg">
							أكتشف (وضعية الانطلاق التفاعلية)
						</h3>
						<p class="text-muted-foreground text-xs">
							تدرّج في خطوات النشاط لاكتشاف القاعدة بنفسك
						</p>
					</div>
				</div>

				{#if steps.length > 0}
					<div class="flex flex-wrap items-center gap-2">
						<span
							class="border-border bg-muted text-muted-foreground rounded-full border px-3 py-1 text-xs font-bold"
						>
							تم كشف {revealedCount} من {steps.length}
						</span>
						{#if !discoverCompleted}
							<button
								type="button"
								onclick={revealAllSteps}
								class="border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-semibold transition"
							>
								<Unlock size={13} />
								فتح الكل
							</button>
						{:else}
							<button
								type="button"
								onclick={resetDiscover}
								class="border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-semibold transition"
							>
								<RotateCcw size={13} />
								إعادة
							</button>
						{/if}
					</div>
				{/if}
			</div>

			<!-- Scenario -->
			<div class="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 sm:p-5">
				<div class="mb-2 text-xs font-extrabold text-blue-600 dark:text-blue-400">
					وضعية الانطلاق
				</div>
				<div class="text-foreground text-sm leading-relaxed sm:text-base">
					<MathRenderer content={lesson.discover?.scenarioAr ?? ''} />
				</div>
				{@render visualFigure(discoverVisual, 'شكل توضيحي لوضعية الانطلاق')}
			</div>

			<!-- Sequential Steps -->
			{#if steps.length > 0}
				<div class="space-y-4">
					{#each steps.slice(0, visibleStepsCount) as step, stepIdx}
						{@const isRevealed = Boolean(revealedSteps[stepIdx])}
						{@const hasHint = Boolean(shownHints[stepIdx])}
						{@const checkState = stepCheckStatus[stepIdx]}
						<div
							class="rounded-xl border p-4 transition-all {isRevealed
								? 'border-emerald-500/40 bg-emerald-500/5'
								: 'border-blue-500/30 bg-muted/30'}"
						>
							<div class="mb-2 flex flex-wrap items-center justify-between gap-2">
								<span
									class="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold {isRevealed
										? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
										: 'bg-blue-500/15 text-blue-700 dark:text-blue-300'}"
								>
									الخطوة {stepIdx + 1} من {steps.length}
								</span>
								{#if isRevealed}
									<span
										class="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400"
									>
										<CheckCircle size={14} />
										تم الاكتشاف
									</span>
								{/if}
							</div>

							<div class="text-foreground text-sm font-semibold leading-relaxed sm:text-base">
								<MathRenderer content={step.promptAr} />
							</div>

							<!-- Optional student input/check -->
							{#if step.expectedInput}
								<div class="mt-3 space-y-2">
									<div class="flex flex-wrap items-center gap-2">
										<input
											type="text"
											bind:value={stepInputs[stepIdx]}
											placeholder="اكتب إجابتك هنا للمحاولة..."
											onkeydown={(e) => e.key === 'Enter' && checkStepInput(stepIdx)}
											class="border-border bg-background text-foreground min-w-[180px] flex-1 rounded-xl border px-3.5 py-2 text-sm outline-none transition focus:border-blue-500"
										/>
										<button
											type="button"
											onclick={() => checkStepInput(stepIdx)}
											class="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-blue-700 sm:text-sm"
										>
											تحقق
										</button>
									</div>

									{#if checkState === 'empty'}
										<p class="text-xs font-medium text-amber-600 dark:text-amber-400">
											أدخل محاولتك أولاً ثم اضغط على «تحقق».
										</p>
									{:else if checkState === 'correct'}
										<p
											class="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400"
										>
											<CheckCircle size={14} />
											أحسنت! إجابة صحيحة.
										</p>
									{:else if checkState === 'incorrect'}
										<p class="text-xs font-medium text-amber-600 dark:text-amber-400">
											حاول مرة أخرى، أو استعن بالتلميح أو اضغط على «اكشف الاستنتاج».
										</p>
									{/if}
								</div>
							{/if}

							<!-- Step controls -->
							<div class="mt-3 flex flex-wrap items-center gap-2">
								{#if step.hintAr}
									<button
										type="button"
										onclick={() => toggleHint(stepIdx)}
										class="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/35 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-700 transition hover:bg-amber-500/20 dark:text-amber-300"
									>
										<Lightbulb size={14} />
										{hasHint ? 'إخفاء التلميح' : 'إظهار التلميح'}
									</button>
								{/if}

								{#if !isRevealed}
									<button
										type="button"
										onclick={() => revealStep(stepIdx)}
										class="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-700"
									>
										<Eye size={14} />
										اكشف الاستنتاج
									</button>
								{/if}
							</div>

							<!-- Hint box -->
							{#if hasHint && step.hintAr}
								<div
									class="mt-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm"
								>
									<div class="mb-1 text-xs font-extrabold text-amber-700 dark:text-amber-300">
										تلميح:
									</div>
									<div class="text-foreground leading-relaxed">
										<MathRenderer content={step.hintAr} />
									</div>
								</div>
							{/if}

							<!-- Reveal box -->
							{#if isRevealed}
								<div
									class="mt-3 rounded-xl border border-emerald-500/35 bg-emerald-500/10 p-3 text-sm"
								>
									<div class="mb-1 text-xs font-extrabold text-emerald-700 dark:text-emerald-300">
										الاستنتاج:
									</div>
									<div class="text-foreground leading-relaxed font-medium">
										<MathRenderer content={step.revealAr} />
									</div>
								</div>
							{/if}
						</div>
					{/each}

					{#if visibleStepsCount < steps.length}
						<div
							class="border-border bg-muted/40 text-muted-foreground rounded-xl border border-dashed px-4 py-3 text-center text-xs font-medium"
						>
							اكشف استنتاج الخطوة الحالية لفتح الخطوة التالية (متبقٍ {steps.length -
								visibleStepsCount}
							{steps.length - visibleStepsCount === 1 ? 'خطوة' : 'خطوات'})
						</div>
					{/if}
				</div>
			{/if}

			{#if activeSection === 'discover'}
				<div class="border-border flex justify-end border-t pt-4">
					<button
						type="button"
						onclick={() => (activeSection = 'summary')}
						class="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700 sm:text-sm"
					>
						<span>الانتقال إلى: أفهم وأتذكر</span>
						<ArrowLeft size={16} />
					</button>
				</div>
			{/if}
		</section>
	{/if}

	<!-- SECTION 2: أفهم وأتذكر (الحوصلة البصرية) -->
	{#if activeSection === 'summary' || activeSection === 'all'}
		<section class="bg-card border-border space-y-5 rounded-2xl border p-4 shadow-sm sm:p-6">
			<div class="border-border flex items-center gap-2.5 border-b pb-3">
				<span
					class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
				>
					<BookOpen size={19} />
				</span>
				<div>
					<h3 class="text-card-foreground text-base font-extrabold sm:text-lg">
						أفهم وأتذكر (الحوصلة البصرية)
					</h3>
					<p class="text-muted-foreground text-xs">
						خلاصة القواعد الأساسية والأمثلة المحلولة
					</p>
				</div>
			</div>

			<!-- Rules -->
			{#if rules.length > 0}
				<div class="space-y-2.5">
					<h4 class="text-card-foreground text-sm font-extrabold">القواعد الأساسية</h4>
					<div class="space-y-2.5">
						{#each rules as rule, rIdx}
							<div
								class="flex items-start gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-3.5"
							>
								<span
									class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-extrabold text-white"
								>
									{rIdx + 1}
								</span>
								<div class="text-foreground flex-1 text-sm leading-relaxed sm:text-base">
									<MathRenderer content={rule} />
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Visual SVG + Caption -->
			{#if summaryVisual}
				{@render visualFigure(
					summaryVisual,
					'الحوصلة البصرية للدرس',
					lesson.summary?.visualCaptionAr
				)}
			{:else if lesson.summary?.visualCaptionAr}
				<div class="border-border bg-muted/40 rounded-xl border p-3.5 text-center text-sm">
					<MathRenderer content={lesson.summary.visualCaptionAr} />
				</div>
			{/if}

			<!-- Examples Cards -->
			{#if examples.length > 0}
				<div class="space-y-3">
					<h4 class="text-card-foreground text-sm font-extrabold">أمثلة محلولة</h4>
					<div
						class="grid grid-cols-1 gap-4 {examples.length > 1 ? 'md:grid-cols-2' : ''}"
					>
						{#each examples as example, exIdx}
							<div
								class="border-border bg-muted/30 flex flex-col justify-between space-y-3 rounded-xl border p-4"
							>
								<div class="space-y-2">
									<span
										class="inline-block rounded-lg bg-blue-500/15 px-2.5 py-0.5 text-xs font-extrabold text-blue-600 dark:text-blue-400"
									>
										مثال {exIdx + 1}
									</span>
									<div class="border-border bg-background rounded-lg border p-3 text-sm">
										<div class="text-muted-foreground mb-1 text-xs font-bold">المعطيات:</div>
										<div class="text-foreground leading-relaxed font-medium">
											<MathRenderer content={example.problemAr} />
										</div>
									</div>
								</div>
								<div
									class="rounded-lg border border-emerald-500/25 bg-emerald-500/10 p-3 text-sm"
								>
									<div class="mb-1 text-xs font-extrabold text-emerald-700 dark:text-emerald-300">
										الحل النموذجي:
									</div>
									<div class="text-foreground leading-relaxed">
										<MathRenderer content={example.solutionAr} />
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Watch Out Warning Callout -->
			{#if lesson.summary?.watchOutAr}
				<div
					class="flex items-start gap-3 rounded-xl border-2 border-amber-500/40 bg-amber-500/10 p-4"
				>
					<AlertTriangle size={20} class="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
					<div class="flex-1 space-y-1">
						<div class="text-xs font-extrabold text-amber-700 sm:text-sm dark:text-amber-300">
							انتبه! خطأ شائع يجب تجنبه
						</div>
						<div class="text-foreground text-sm leading-relaxed">
							<MathRenderer content={lesson.summary.watchOutAr} />
						</div>
					</div>
				</div>
			{/if}

			{#if activeSection === 'summary'}
				<div class="border-border flex flex-wrap items-center justify-between gap-2 border-t pt-4">
					<button
						type="button"
						onclick={() => (activeSection = 'discover')}
						class="border-border bg-muted hover:bg-muted/80 text-foreground inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition sm:text-sm"
					>
						<ArrowRight size={16} />
						<span>السابق: أكتشف</span>
					</button>
					<button
						type="button"
						onclick={() => (activeSection = 'practice')}
						class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700 sm:text-sm"
					>
						<span>الانتقال إلى: أتمرن الآن</span>
						<ArrowLeft size={16} />
					</button>
				</div>
			{/if}
		</section>
	{/if}

	<!-- SECTION 3: أتمرن الآن (تطبيق فوري موجه) -->
	{#if activeSection === 'practice' || activeSection === 'all'}
		<section class="bg-card border-border space-y-5 rounded-2xl border p-4 shadow-sm sm:p-6">
			<div class="border-border flex flex-wrap items-center justify-between gap-2 border-b pb-3">
				<div class="flex items-center gap-2.5">
					<span
						class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400"
					>
						<Brain size={19} />
					</span>
					<div>
						<h3 class="text-card-foreground text-base font-extrabold sm:text-lg">
							أتمرن الآن (تطبيق فوري موجه)
						</h3>
						<p class="text-muted-foreground text-xs">
							اختر الإجابة الصحيحة لتحصل على تغذية راجعة فورية
						</p>
					</div>
				</div>

				<div class="flex items-center gap-2">
					<span
						dir="ltr"
						class="border-border bg-muted text-muted-foreground rounded-full border px-3 py-1 text-xs font-bold"
					>
						{attemptedCount} / {practiceList.length}
					</span>
					{#if attemptedCount > 0}
						<button
							type="button"
							onclick={resetPractice}
							class="border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-semibold transition"
						>
							<RotateCcw size={13} />
							إعادة التمرين
						</button>
					{/if}
				</div>
			</div>

			<div class="space-y-5">
				{#each practiceList as question, qIdx}
					{@const selected = selectedOptions[qIdx]}
					{@const hasSelected = selected !== undefined}
					{@const isCorrect = hasSelected && selected === question.correctIndex}
					{@const qVisual = parseSafeVisual(question.svg)}
					<article
						class="border-border bg-muted/20 space-y-4 rounded-2xl border p-4 sm:p-5"
					>
						<div class="flex flex-wrap items-center justify-between gap-2">
							<span
								class="rounded-lg bg-purple-500/15 px-2.5 py-1 text-xs font-extrabold text-purple-700 dark:text-purple-300"
							>
								السؤال {qIdx + 1} من {practiceList.length}
							</span>
							{#if isCorrect}
								<span
									class="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400"
								>
									<CheckCircle size={15} />
									إجابة صحيحة
								</span>
							{:else if hasSelected}
								<span
									class="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400"
								>
									<XCircle size={15} />
									راجع الملاحظة وحاول مجدداً
								</span>
							{/if}
						</div>

						<div class="text-foreground text-sm font-bold leading-relaxed sm:text-base">
							<MathRenderer content={question.questionAr} />
						</div>

						{#if qVisual}
							{@render visualFigure(qVisual, `رسم توضيحي للسؤال ${qIdx + 1}`)}
						{/if}

						<!-- Options -->
						<div class="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
							{#each question.options as optText, optIdx}
								{@const isThisSelected = selected === optIdx}
								{@const isThisCorrect = isThisSelected && optIdx === question.correctIndex}
								{@const isThisWrong = isThisSelected && optIdx !== question.correctIndex}
								<button
									type="button"
									disabled={isCorrect}
									aria-pressed={isThisSelected}
									onclick={() => selectPracticeOption(qIdx, optIdx)}
									class="flex items-start gap-3 rounded-xl border-2 p-3.5 text-right transition-all {isThisCorrect
										? 'border-emerald-500 bg-emerald-500/10 shadow-xs'
										: isThisWrong
											? 'border-rose-500 bg-rose-500/10 shadow-xs'
											: isCorrect
												? 'border-border bg-background/40 opacity-60'
												: 'border-border bg-card hover:border-blue-500/50 hover:bg-blue-500/5'}"
								>
									<span
										class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold {isThisCorrect
											? 'bg-emerald-600 text-white'
											: isThisWrong
												? 'bg-rose-600 text-white'
												: 'bg-muted text-muted-foreground'}"
									>
										{optionLetters[optIdx] || optIdx + 1}
									</span>
									<div class="text-foreground flex-1 pt-0.5 text-sm font-medium">
										<MathRenderer content={optText} inline />
									</div>
									{#if isThisCorrect}
										<CheckCircle size={18} class="mt-0.5 shrink-0 text-emerald-600" />
									{:else if isThisWrong}
										<XCircle size={18} class="mt-0.5 shrink-0 text-rose-600" />
									{/if}
								</button>
							{/each}
						</div>

						<!-- Instant Diagnostic / Success Feedback -->
						{#if hasSelected}
							{#if isCorrect}
								<div
									class="rounded-xl border border-emerald-500/35 bg-emerald-500/10 p-3.5 text-sm"
								>
									<div
										class="mb-1 flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 dark:text-emerald-300"
									>
										<CheckCircle size={15} />
										{firstAttemptOptions[qIdx] === question.correctIndex
											? 'أحسنت! إجابة صحيحة.'
											: 'أحسنت! توصلت إلى الإجابة الصحيحة.'}
									</div>
									<div class="text-foreground leading-relaxed">
										<MathRenderer content={question.explanationAr} />
									</div>
								</div>
							{:else}
								<div class="space-y-2">
									<div
										class="rounded-xl border border-rose-500/35 bg-rose-500/10 p-3.5 text-sm"
									>
										<div
											class="mb-1 flex items-center gap-1.5 text-xs font-extrabold text-rose-700 dark:text-rose-300"
										>
											<AlertTriangle size={15} />
											ملاحظة تشخيصية:
										</div>
										<div class="text-foreground leading-relaxed">
											<MathRenderer
												content={question.diagnosticFeedback?.[selected] ||
													'إجابة غير صحيحة، راجع القاعدة وحاول اختيار الإجابة الصحيحة.'}
											/>
										</div>
										<div class="mt-2.5 flex flex-wrap items-center justify-between gap-2">
											<span class="text-muted-foreground text-xs">
												يمكنك اختيار إجابة أخرى للمحاولة مباشرة.
											</span>
											<button
												type="button"
												onclick={() => toggleExplanation(qIdx)}
												class="text-xs font-bold text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
											>
												{shownExplanations[qIdx] ? 'إخفاء الشرح' : 'عرض الشرح الكامل'}
											</button>
										</div>
									</div>

									{#if shownExplanations[qIdx]}
										<div
											class="rounded-xl border border-blue-500/30 bg-blue-500/10 p-3.5 text-sm"
										>
											<div class="mb-1 text-xs font-extrabold text-blue-700 dark:text-blue-300">
												التفسير الصحيح:
											</div>
											<div class="text-foreground leading-relaxed">
												<MathRenderer content={question.explanationAr} />
											</div>
										</div>
									{/if}
								</div>
							{/if}
						{/if}
					</article>
				{/each}
			</div>

			<!-- Final Score Summary -->
			{#if allAttempted}
				<div
					class="rounded-2xl border-2 p-5 text-center sm:p-6 {firstTryScore ===
					practiceList.length
						? 'border-emerald-500/40 bg-emerald-500/10'
						: 'border-blue-500/35 bg-blue-500/10'}"
				>
					<div
						class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl {firstTryScore ===
						practiceList.length
							? 'bg-emerald-600 text-white'
							: 'bg-blue-600 text-white'}"
					>
						<Trophy size={24} />
					</div>

					<h4 class="text-card-foreground text-lg font-extrabold">
						النتيجة النهائية:
						<span dir="ltr" class="mx-1 inline-block">
							{firstTryScore} / {practiceList.length}
						</span>
					</h4>

					<p class="text-muted-foreground mx-auto mt-1.5 max-w-lg text-sm leading-relaxed">
						{#if firstTryScore === practiceList.length}
							ممتاز! أجبت عن جميع الأسئلة بشكل صحيح من المحاولة الأولى.
						{:else if firstTryScore >= Math.ceil(practiceList.length / 2)}
							عمل جيد! راجع الملاحظات التشخيصية للأسئلة التي تعثّرت فيها وأعد المحاولة لتحقيق العلامة الكاملة.
						{:else}
							بداية مشجعة! راجع فقرة «أفهم وأتذكر» بتركيز ثم أعد التمرين لتثبيت فهمك.
						{/if}
					</p>

					{#if firstTryScore !== resolvedScore}
						<p class="text-muted-foreground mt-1 text-xs">
							تم احتساب النتيجة بناءً على محاولتك الأولى لكل سؤال (الإجابات المصحّحة حالياً:
							<span dir="ltr">{resolvedScore} / {practiceList.length}</span>).
						</p>
					{/if}

					<div class="mt-4 flex justify-center">
						<button
							type="button"
							onclick={resetPractice}
							class="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
						>
							<RotateCcw size={16} />
							إعادة التمرين
						</button>
					</div>
				</div>
			{/if}

			{#if activeSection === 'practice'}
				<div class="border-border flex justify-start border-t pt-4">
					<button
						type="button"
						onclick={() => (activeSection = 'summary')}
						class="border-border bg-muted hover:bg-muted/80 text-foreground inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition sm:text-sm"
					>
						<ArrowRight size={16} />
						<span>العودة إلى: أفهم وأتذكر</span>
					</button>
				</div>
			{/if}
		</section>
	{/if}
</div>

<style>
	.lesson-player :global(.katex) {
		direction: ltr;
		unicode-bidi: isolate;
	}

	.lesson-inline-math :global(p) {
		display: inline;
		margin: 0;
	}

	.lesson-svg :global(svg) {
		max-width: 100%;
		height: auto;
		display: block;
	}
</style>
