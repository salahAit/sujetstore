<script lang="ts">
	import type {
		ExamMetadata,
		LevelId,
		ExamType,
		TrimesterId
	} from '$lib/modules/SujetBuilder/types';
	import { ChevronDown } from 'lucide-svelte';

	type LevelRow = { id: string; nameAr: string; slug: string; order: number };
	type YearRow = { id: string; levelId: string; nameAr: string; stream: string | null };
	type StreamRow = { id: string; nameAr: string };
	type SubjectRow = { id: string; nameAr: string; examGroup: string | null };
	type StreamSubjectRow = { streamId: string; subjectId: string; yearId: string | null };
	type TrimesterRow = { id: string; nameAr: string };

	let {
		levels,
		years,
		streams,
		subjects,
		streamSubjects,
		trimesters,
		metadata = $bindable(),
		onchange
	}: {
		levels: LevelRow[];
		years: YearRow[];
		streams: StreamRow[];
		subjects: SubjectRow[];
		streamSubjects: StreamSubjectRow[];
		trimesters: TrimesterRow[];
		metadata: ExamMetadata;
		onchange?: () => void;
	} = $props();

	// Derived filtered options
	let filteredYears = $derived(years.filter((y) => y.levelId === metadata.levelId));
	let selectedYear = $derived(years.find((y) => y.id === metadata.yearId));
	let needsStream = $derived(metadata.levelId === 'secondaire');

	// Streams available for the selected year
	let filteredStreams = $derived.by(() => {
		if (!needsStream) return [];
		const yearStreamIds = streamSubjects
			.filter((ss) => ss.yearId === metadata.yearId || ss.yearId === null)
			.map((ss) => ss.streamId);
		return streams.filter((s) => yearStreamIds.includes(s.id));
	});

	// Subjects available for the current selection
	let filteredSubjects = $derived.by(() => {
		const streamId = needsStream ? metadata.streamId : 'GEN';
		if (!streamId) return [];
		const subjectIds = streamSubjects
			.filter(
				(ss) =>
					ss.streamId === streamId &&
					(ss.yearId === metadata.yearId || ss.yearId === null)
			)
			.map((ss) => ss.subjectId);
		return subjects.filter((s) => subjectIds.includes(s.id));
	});

	function handleLevelChange(e: Event) {
		const value = (e.target as HTMLSelectElement).value as LevelId;
		metadata.levelId = value;
		metadata.yearId = '';
		metadata.streamId = undefined;
		metadata.streamName = undefined;
		metadata.subjectId = '';
		metadata.subjectName = '';
		onchange?.();
	}

	function handleYearChange(e: Event) {
		const value = (e.target as HTMLSelectElement).value;
		const year = years.find((y) => y.id === value);
		metadata.yearId = value;
		metadata.yearName = year?.nameAr ?? '';
		metadata.streamId = undefined;
		metadata.streamName = undefined;
		metadata.subjectId = '';
		metadata.subjectName = '';
		onchange?.();
	}

	function handleStreamChange(e: Event) {
		const value = (e.target as HTMLSelectElement).value;
		const stream = streams.find((s) => s.id === value);
		metadata.streamId = value;
		metadata.streamName = stream?.nameAr ?? '';
		metadata.subjectId = '';
		metadata.subjectName = '';
		onchange?.();
	}

	function handleSubjectChange(e: Event) {
		const value = (e.target as HTMLSelectElement).value;
		const subject = subjects.find((s) => s.id === value);
		metadata.subjectId = value;
		metadata.subjectName = subject?.nameAr ?? '';
		onchange?.();
	}

	const examTypes: { value: ExamType; label: string }[] = [
		{ value: 'test', label: 'فرض' },
		{ value: 'exam', label: 'اختبار' }
	];

	import { ClipboardList } from 'lucide-svelte';
</script>

<div class="space-y-3">
	<div class="flex items-center gap-1.5 border-b border-border pb-1.5 text-primary">
		<ClipboardList size={16} />
		<h3 class="text-sm font-bold text-foreground">معلومات الموضوع</h3>
	</div>

	<div class="grid grid-cols-2 gap-3">
		<!-- Level -->
		<div class="col-span-2 sm:col-span-1">
			<label for="sb-level" class="mb-1 block text-xs font-medium text-muted-foreground">الطور</label>
			<div class="relative">
				<select
					id="sb-level"
					class="w-full appearance-none rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
					value={metadata.levelId}
					onchange={handleLevelChange}
				>
					<option value="">اختر الطور...</option>
					{#each levels as level}
						<option value={level.id}>{level.nameAr}</option>
					{/each}
				</select>
				<ChevronDown size={14} class="pointer-events-none absolute left-2.5 top-2.5 text-muted-foreground" />
			</div>
		</div>

		<!-- Year -->
		{#if metadata.levelId}
			<div class="col-span-2 sm:col-span-1">
				<label for="sb-year" class="mb-1 block text-xs font-medium text-muted-foreground">السنة</label>
				<div class="relative">
					<select
						id="sb-year"
						class="w-full appearance-none rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
						value={metadata.yearId}
						onchange={handleYearChange}
					>
						<option value="">اختر السنة...</option>
						{#each filteredYears as year}
							<option value={year.id}>{year.nameAr}</option>
						{/each}
					</select>
					<ChevronDown size={14} class="pointer-events-none absolute left-2.5 top-2.5 text-muted-foreground" />
				</div>
			</div>
		{/if}

		<!-- Stream (secondary only) -->
		{#if needsStream && metadata.yearId}
			<div class="col-span-2 sm:col-span-1">
				<label for="sb-stream" class="mb-1 block text-xs font-medium text-muted-foreground">الشعبة</label>
				<div class="relative">
					<select
						id="sb-stream"
						class="w-full appearance-none rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
						value={metadata.streamId ?? ''}
						onchange={handleStreamChange}
					>
						<option value="">اختر الشعبة...</option>
						{#each filteredStreams as stream}
							<option value={stream.id}>{stream.nameAr}</option>
						{/each}
					</select>
					<ChevronDown size={14} class="pointer-events-none absolute left-2.5 top-2.5 text-muted-foreground" />
				</div>
			</div>
		{/if}

		<!-- Subject -->
		{#if metadata.yearId && (!needsStream || metadata.streamId)}
			<div class="col-span-2 {needsStream && metadata.yearId ? 'sm:col-span-1' : ''}">
				<label for="sb-subject" class="mb-1 block text-xs font-medium text-muted-foreground">المادة</label>
				<div class="relative">
					<select
						id="sb-subject"
						class="w-full appearance-none rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
						value={metadata.subjectId}
						onchange={handleSubjectChange}
					>
						<option value="">اختر المادة...</option>
						{#each filteredSubjects as subject}
							<option value={subject.id}>{subject.nameAr}</option>
						{/each}
					</select>
					<ChevronDown size={14} class="pointer-events-none absolute left-2.5 top-2.5 text-muted-foreground" />
				</div>
			</div>
		{/if}
	</div>

	<hr class="border-border my-2" />

	<!-- Exam Type & Trimester -->
	<div class="grid grid-cols-2 gap-3">
		<div>
			<label for="sb-examtype" class="mb-1 block text-xs font-medium text-muted-foreground">التصنيف</label>
			<select
				id="sb-examtype"
				class="w-full appearance-none rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
				bind:value={metadata.docType}
				onchange={() => onchange?.()}
			>
				{#each examTypes as type}
					<option value={type.value}>{type.label}</option>
				{/each}
			</select>
		</div>
		<div>
			<label for="sb-trimester" class="mb-1 block text-xs font-medium text-muted-foreground">الفصل</label>
			<select
				id="sb-trimester"
				class="w-full appearance-none rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
				bind:value={metadata.trimesterId}
				onchange={(e) => {
					const t = trimesters.find((t) => t.id === metadata.trimesterId);
					metadata.trimesterName = t?.nameAr ?? '';
					onchange?.();
				}}
			>
				{#each trimesters as trimester}
					<option value={trimester.id}>{trimester.nameAr}</option>
				{/each}
			</select>
		</div>

		<!-- Duration & Academic Year -->
		<div>
			<label for="sb-duration" class="mb-1 block text-xs font-medium text-muted-foreground">المدة</label>
			<input
				id="sb-duration"
				type="text"
				class="w-full rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
				placeholder="1 سا 30 د"
				bind:value={metadata.duration}
				oninput={() => onchange?.()}
			/>
		</div>
		<div>
			<label for="sb-acadyear" class="mb-1 block text-xs font-medium text-muted-foreground">السنة الدراسية</label>
			<input
				id="sb-acadyear"
				type="text"
				class="w-full rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
				placeholder="2024/2025"
				bind:value={metadata.academicYear}
				oninput={() => onchange?.()}
			/>
		</div>
	</div>
</div>
