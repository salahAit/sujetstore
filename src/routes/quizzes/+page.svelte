<script lang="ts">
	import { Brain, Clock, Star, Lock, Sparkles } from 'lucide-svelte';
	import DynamicIcon from '$lib/components/DynamicIcon.svelte';

	let { data }: { data: any } = $props();

	const difficultyLabels: Record<string, { label: string; color: string }> = {
		easy: { label: 'سهل', color: 'text-emerald-600 dark:text-emerald-400' },
		medium: { label: 'متوسط', color: 'text-amber-600 dark:text-amber-400' },
		hard: { label: 'صعب', color: 'text-red-600 dark:text-red-400' }
	};
	let filterLevel = $state('');
	let filterYear = $state('');
	let filterStream = $state('');
	let filterSubject = $state('');
	let searchQuery = $state('');

	let needsStream = $derived(filterLevel === 'secondaire');

	function handleLevelChange() {
		filterYear = '';
		filterStream = '';
		filterSubject = '';
	}

	function handleYearChange() {
		filterStream = '';
		filterSubject = '';
	}

	function handleStreamChange() {
		filterSubject = '';
	}

	let filteredYears = $derived(
		filterLevel
			? data.metadata.years.filter((y: any) => y.levelId === filterLevel)
			: data.metadata.years
	);

	let filteredStreams = $derived.by(() => {
		if (!needsStream || !filterYear) return [];
		const yearStreamIds = data.metadata.streamSubjects
			.filter((ss: any) => ss.yearId === filterYear || ss.yearId === null)
			.map((ss: any) => ss.streamId);
		return data.metadata.streams.filter((s: any) => yearStreamIds.includes(s.id));
	});

	let filteredSubjects = $derived.by(() => {
		let validSubjectIds: string[] | null = null;
		if (filterYear) {
			let streamId = needsStream ? filterStream : 'GEN';
			if (needsStream && streamId) {
				validSubjectIds = data.metadata.streamSubjects
					.filter((ss: any) => ss.streamId === streamId && (ss.yearId === filterYear || ss.yearId === null))
					.map((ss: any) => ss.subjectId);
			} else if (!needsStream) {
				validSubjectIds = data.metadata.streamSubjects
					.filter((ss: any) => ss.streamId === 'GEN' && (ss.yearId === filterYear || ss.yearId === null))
					.map((ss: any) => ss.subjectId);
			}
		}

		return data.metadata.subjects.filter((s: any) => {
			if (validSubjectIds && !validSubjectIds.includes(s.id)) return false;
			return true;
		});
	});

	let filteredQuizzes = $derived(
		data.quizzes.filter((row: any) => {
			const { quiz, subject, year, level } = row;

			if (searchQuery) {
				const query = searchQuery.toLowerCase();
				if (
					!quiz.title.toLowerCase().includes(query) &&
					!(quiz.titleAr || '').toLowerCase().includes(query) &&
					!(quiz.description || '').toLowerCase().includes(query)
				) {
					return false;
				}
			}

			if (filterLevel && level.id !== filterLevel) return false;
			if (filterYear && year.id !== filterYear) return false;
			if (filterSubject && subject.id !== filterSubject) return false;

			if (filterStream && needsStream) {
				const hasStream = data.metadata.streamSubjects.some(
					(ss: any) =>
						ss.streamId === filterStream &&
						ss.subjectId === subject.id &&
						(ss.yearId === year.id || ss.yearId === null)
				);
				if (!hasStream) return false;
			}

			return true;
		})
	);
</script>

<svelte:head>
	<title>التمارين التفاعلية - SujetStore</title>
	<meta
		name="description"
		content="تمارين تفاعلية متنوعة: اختيار متعدد، صحيح/خطأ، ترتيب، سحب وإفلات، ربط، ملء فراغات والمزيد!"
	/>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
	<div class="mb-10 text-center">
		<h1 class="flex items-center justify-center gap-3 text-3xl font-extrabold sm:text-4xl">
			<Brain size={36} class="text-purple-500" /> التمارين التفاعلية
		</h1>
		<p class="text-muted-foreground mt-3 text-lg">اختبر معلوماتك مع تمارين تفاعلية متنوعة ومسلية</p>
	</div>

	<!-- Filters -->
	<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 bg-card border-border rounded-2xl border p-4 shadow-sm">
		<div class="lg:col-span-1">
			<label for="searchQuery" class="mb-1 block text-xs font-bold text-muted-foreground">بحث</label>
			<input type="text" id="searchQuery" bind:value={searchQuery} placeholder="ابحث عن تمرين..." class="bg-background border-input text-foreground focus:ring-ring w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1" />
		</div>

		<div>
			<label for="filterLevel" class="mb-1 block text-xs font-bold text-muted-foreground">الطور التعليمي</label>
			<select id="filterLevel" bind:value={filterLevel} onchange={handleLevelChange} class="bg-background border-input text-foreground focus:ring-ring [&>option]:bg-background w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1">
				<option value="">جميع الأطوار</option>
				{#each data.metadata.levels as level}
					<option value={level.id}>{level.nameAr}</option>
				{/each}
			</select>
		</div>

		<div>
			<label for="filterYear" class="mb-1 block text-xs font-bold text-muted-foreground">المستوى / السنة</label>
			<select id="filterYear" bind:value={filterYear} onchange={handleYearChange} disabled={!filterLevel} class="bg-background border-input text-foreground focus:ring-ring [&>option]:bg-background w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 disabled:opacity-50">
				<option value="">جميع المستويات...</option>
				{#each filteredYears as year}
					<option value={year.id}>{year.nameAr}</option>
				{/each}
			</select>
		</div>

		<div>
			<label for="filterStream" class="mb-1 block text-xs font-bold text-muted-foreground">الشعبة</label>
			<select id="filterStream" bind:value={filterStream} onchange={handleStreamChange} disabled={!needsStream || !filterYear} class="bg-background border-input text-foreground focus:ring-ring [&>option]:bg-background w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 disabled:opacity-50">
				<option value="">جميع الشعب...</option>
				{#each filteredStreams as stream}
					<option value={stream.id}>{stream.nameAr}</option>
				{/each}
			</select>
		</div>

		<div>
			<label for="filterSubject" class="mb-1 block text-xs font-bold text-muted-foreground">المادة</label>
			<select id="filterSubject" bind:value={filterSubject} class="bg-background border-input text-foreground focus:ring-ring [&>option]:bg-background w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1">
				<option value="">جميع المواد</option>
				{#each filteredSubjects as subject}
					<option value={subject.id}>{subject.nameAr}</option>
				{/each}
			</select>
		</div>
	</div>

	{#if filteredQuizzes.length === 0}
		<div class="py-20 text-center">
			<Sparkles size={48} class="mx-auto mb-4 text-purple-500 opacity-50" />
			<p class="text-muted-foreground text-lg">لا توجد تمارين تطابق بحثك</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each filteredQuizzes as row}
				{@const quiz = row.quiz}
				{@const diff = difficultyLabels[quiz.difficulty || 'medium']}
				<a
					href={quiz.isPremium ? '#' : `/quizzes/${quiz.slug}`}
					class="bg-card group relative overflow-hidden rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg {quiz.isPremium
						? 'opacity-80'
						: ''}"
				>
					{#if quiz.isPremium}
						<div
							class="absolute top-0 left-0 flex items-center gap-1 rounded-br-xl bg-amber-500 px-3 py-1 text-xs font-bold text-black"
						>
							<Lock size={12} /> مدفوع
						</div>
					{/if}

					<div class="mb-4 flex items-center gap-3">
						<div
							class="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400"
						>
							<DynamicIcon name={row.subject.icon || 'BookOpen'} size={24} />
						</div>
						<div>
							<p class="text-muted-foreground text-xs">{row.subject.name_ar}</p>
							<p class="text-muted-foreground text-xs">{row.year.name_ar}</p>
						</div>
					</div>

					<h3
						class="mb-2 text-lg font-bold transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-400"
					>
						{quiz.titleAr || quiz.title}
					</h3>

					{#if quiz.description}
						<p class="text-muted-foreground mb-4 line-clamp-2 text-sm">{quiz.description}</p>
					{/if}

					<div class="text-muted-foreground flex items-center gap-4 text-xs">
						<span class="flex items-center gap-1">
							<Brain size={14} />
							{quiz.questionCount} سؤال
						</span>
						<span class="flex items-center gap-1 {diff.color}">
							<Star size={14} />
							{diff.label}
						</span>
						{#if quiz.timeLimit && quiz.timeLimit > 0}
							<span class="flex items-center gap-1">
								<Clock size={14} />
								{Math.floor(quiz.timeLimit / 60)} دقيقة
							</span>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
