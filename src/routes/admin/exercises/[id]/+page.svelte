<script lang="ts">
	import { 
		ArrowRight, Save, Trash2, Plus, Type, FunctionSquare, 
		Table2, ImageIcon, CheckCircle, ListChecks, GitBranch, Tag,
		ChevronLeft, Loader2, FileText, Database, Download
	} from 'lucide-svelte';
	import { page } from '$app/state';
	import BlockEditor from '$lib/modules/SujetBuilder/components/BlockEditor.svelte';
	import type { ContentBlock } from '$lib/modules/SujetBuilder/types';
	
	let { data } = $props<{ data: any }>();

	// Form State
	let title = $state(data.exercise?.title || 'تمرين جديد');
	let points = $state(data.exercise?.points || 5);
	let trimesterId = $state(data.exercise?.trimesterId || '');
	let unit = $state(data.exercise?.unit || '');
	
	// Content State (JSON)
	let content = $state<ContentBlock[]>(
		data.exercise?.content ? 
		(typeof data.exercise.content === 'string' ? JSON.parse(data.exercise.content) : data.exercise.content) 
		: [{ type: 'text', content: '' }]
	);

	// Classification State
	let selectedLevel = $state('');
	let selectedYear = $state('');
	let selectedStream = $state('');
	let selectedYearSubjectId = $state(data.exercise?.yearSubjectId?.toString() || '');

	// Initialization of classification from existing data
	$effect(() => {
		if (data.exercise && data.metadata.yearSubjects) {
			const ys = data.metadata.yearSubjects.find((y: any) => y.id === data.exercise.yearSubjectId);
			if (ys) {
				selectedYear = ys.yearId;
				const year = data.metadata.years.find((y: any) => y.id === ys.yearId);
				if (year) {
					selectedLevel = year.levelId;
					// Infer stream if possible (optional: get first stream that matches this subject and year)
					if (year.levelId === 'secondaire') {
						const matchingStream = data.metadata.streamSubjects.find((ss: any) => ss.subjectId === ys.subjectId && (ss.yearId === ys.yearId || ss.yearId === null));
						if (matchingStream) selectedStream = matchingStream.streamId;
					}
				}
			}
		}
	});

	let needsStream = $derived(selectedLevel === 'secondaire');

	// Derived lists for filters
	let filteredYears = $derived(
		selectedLevel 
			? data.metadata.years.filter((y: any) => y.levelId === selectedLevel) 
			: []
	);

	let filteredStreams = $derived.by(() => {
		if (!needsStream || !selectedYear) return [];
		const yearStreamIds = data.metadata.streamSubjects
			.filter((ss: any) => ss.yearId === selectedYear || ss.yearId === null)
			.map((ss: any) => ss.streamId);
		return data.metadata.streams.filter((s: any) => yearStreamIds.includes(s.id));
	});

	let filteredYearSubjects = $derived.by(() => {
		if (!selectedYear) return [];
		
		let streamId = needsStream ? selectedStream : 'GEN';
		let validSubjectIds: string[] | null = null;
		
		if (needsStream && streamId) {
			validSubjectIds = data.metadata.streamSubjects
				.filter((ss: any) => ss.streamId === streamId && (ss.yearId === selectedYear || ss.yearId === null))
				.map((ss: any) => ss.subjectId);
		} else if (!needsStream) {
			validSubjectIds = data.metadata.streamSubjects
				.filter((ss: any) => ss.streamId === 'GEN' && (ss.yearId === selectedYear || ss.yearId === null))
				.map((ss: any) => ss.subjectId);
		}

		return data.metadata.yearSubjects.filter((ys: any) => {
			if (ys.yearId !== selectedYear) return false;
			if (validSubjectIds && !validSubjectIds.includes(ys.subjectId)) return false;
			return true;
		});
	});

	// Block management
	function addBlock(type: string) {
		let newBlock: any;
		switch (type) {
			case 'text': newBlock = { type: 'text', content: '' }; break;
			case 'math': newBlock = { type: 'math', content: '', display: true }; break;
			case 'table': newBlock = { type: 'table', headers: ['', ''], cells: ['', ''] }; break;
			case 'image': newBlock = { type: 'image', src: '' }; break;
			case 'true_false': newBlock = { type: 'true_false', items: [{ q: '', a: '', mark: '01' }] }; break;
			case 'multiple_choice': newBlock = { type: 'multiple_choice', groups: [{ header: '', options: ['', '', ''], correct: '', mark: '01' }] }; break;
			case 'diagram_flow': newBlock = { type: 'diagram_flow', flow: ['', '', ''], mark: '01' }; break;
			case 'labeling': newBlock = { type: 'labeling', labels: ['', '', ''], mark: '01' }; break;
		}
		content = [...content, newBlock];
	}

	function removeBlock(index: number) {
		content = content.filter((_, i) => i !== index);
	}

	let isSaving = $state(false);
	let saveForm: HTMLFormElement;

	function handleSubmit(e: Event) {
		if (!selectedYearSubjectId) {
			alert('يرجى تحديد السنة والمادة.');
			e.preventDefault();
			return;
		}
		isSaving = true;
	}

	function exportExercise() {
		const exerciseData = {
			title,
			points,
			yearSubjectId: Number(selectedYearSubjectId),
			trimesterId,
			unit,
			content
		};
		const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify([exerciseData], null, 2));
		const downloadAnchorNode = document.createElement('a');
		downloadAnchorNode.setAttribute("href", dataStr);
		const filename = `exercise_${title.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'new'}.json`;
		downloadAnchorNode.setAttribute("download", filename);
		document.body.appendChild(downloadAnchorNode);
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	}
</script>

<svelte:head>
	<title>{data.exercise ? 'تعديل تمرين' : 'إضافة تمرين جديد'} - بنك التمارين</title>
</svelte:head>

<!-- Top Navigation Bar -->
<div class="mb-6 flex items-center justify-between">
	<div class="flex items-center gap-4">
		<a 
			href="/admin/exercises" 
			class="bg-card border-border hover:bg-muted flex h-10 w-10 items-center justify-center rounded-xl border transition-colors shadow-sm"
			title="العودة للقائمة"
		>
			<ArrowRight size={20} />
		</a>
		<div>
			<h1 class="text-2xl font-bold">{data.exercise ? 'تعديل تمرين' : 'إضافة تمرين جديد للبنك'}</h1>
			<p class="text-muted-foreground text-xs">قم بإعداد التمرين بتصنيف دقيق ليتم استخدامه لاحقاً في منشئ المواضيع</p>
		</div>
	</div>
	<div class="flex items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
		<button 
			type="button"
			class="flex items-center gap-2 rounded-xl bg-card border border-border px-4 py-2.5 font-bold text-foreground shadow-sm transition-all hover:bg-muted"
			onclick={exportExercise}
			title="تصدير التمرين (JSON)"
		>
			<Download size={18} class="text-muted-foreground" />
			<span class="hidden sm:inline">تصدير JSON</span>
		</button>

		<button 
			form="exercise-form"
			class="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 font-bold text-primary-foreground shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
			disabled={isSaving}
		>
			{#if isSaving}
				<Loader2 size={18} class="animate-spin" />
				جاري الحفظ...
			{:else}
				<Save size={18} />
				حفظ التمرين
			{/if}
		</button>
	</div>
</div>

{#if page.url.searchParams.get('success')}
	<div class="mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-600 font-bold text-center animate-in fade-in slide-in-from-top-2">
		تم حفظ التمرين بنجاح في البنك!
	</div>
{/if}

<form 
	id="exercise-form"
	action="?/save" 
	method="POST" 
	class="grid grid-cols-1 gap-6 lg:grid-cols-4"
	onsubmit={handleSubmit}
	bind:this={saveForm}
>
	<!-- Hidden field for JSON content -->
	<input type="hidden" name="content" value={JSON.stringify(content)} />

	<!-- Main Editor Area -->
	<div class="space-y-6 lg:col-span-3">
		<!-- Title Section -->
		<div class="bg-card border-border rounded-2xl border p-6 shadow-sm">
			<label for="title" class="mb-2 block text-sm font-bold">عنوان التمرين (يظهر في الموضوع)</label>
			<input 
				id="title"
				name="title"
				type="text" 
				bind:value={title}
				placeholder="مثال: التمرين الأول، الوضعية الإدماجية..."
				class="bg-background border-border w-full rounded-xl border px-4 py-3 text-lg font-bold focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
				required
			/>
		</div>

		<!-- Content Blocks -->
		<div class="bg-card border-border rounded-2xl border p-6 shadow-sm">
			<div class="mb-6 flex items-center justify-between border-b border-border pb-4">
				<h3 class="flex items-center gap-2 text-lg font-bold">
					<FileText size={20} class="text-primary" />
					محتوى التمرين
				</h3>
				<span class="text-muted-foreground text-xs uppercase tracking-wider font-medium">Blocks Editor</span>
			</div>

			<div class="space-y-4">
				{#each content as block, i (i)}
					<div class="relative animate-in fade-in slide-in-from-bottom-2 duration-200">
						<BlockEditor 
							bind:block={content[i]} 
							onremove={() => removeBlock(i)}
						/>
					</div>
				{/each}

				{#if content.length === 0}
					<div class="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border py-12 text-muted-foreground">
						<Plus size={32} class="mb-2 opacity-20" />
						<p>أضف كتلة محتوى لتبدأ</p>
					</div>
				{/if}
			</div>

			<!-- Quick Add Bar -->
			<div class="mt-8 border-t border-border pt-6">
				<p class="mb-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">إضافة كتلة محتوى جديدة</p>
				<div class="flex flex-wrap gap-3">
					<button type="button" class="group flex flex-col items-center gap-2 transition-all hover:scale-105" onclick={() => addBlock('text')}>
						<div class="bg-muted group-hover:bg-primary/10 group-hover:text-primary flex h-12 w-12 items-center justify-center rounded-2xl transition-colors">
							<Type size={20} />
						</div>
						<span class="text-[10px] font-bold">نص</span>
					</button>
					<button type="button" class="group flex flex-col items-center gap-2 transition-all hover:scale-105" onclick={() => addBlock('math')}>
						<div class="bg-muted group-hover:bg-primary/10 group-hover:text-primary flex h-12 w-12 items-center justify-center rounded-2xl transition-colors">
							<FunctionSquare size={20} />
						</div>
						<span class="text-[10px] font-bold">معادلة</span>
					</button>
					<button type="button" class="group flex flex-col items-center gap-2 transition-all hover:scale-105" onclick={() => addBlock('table')}>
						<div class="bg-muted group-hover:bg-primary/10 group-hover:text-primary flex h-12 w-12 items-center justify-center rounded-2xl transition-colors">
							<Table2 size={20} />
						</div>
						<span class="text-[10px] font-bold">جدول</span>
					</button>
					<button type="button" class="group flex flex-col items-center gap-2 transition-all hover:scale-105" onclick={() => addBlock('image')}>
						<div class="bg-muted group-hover:bg-primary/10 group-hover:text-primary flex h-12 w-12 items-center justify-center rounded-2xl transition-colors">
							<ImageIcon size={20} />
						</div>
						<span class="text-[10px] font-bold">صورة</span>
					</button>
					<button type="button" class="group flex flex-col items-center gap-2 transition-all hover:scale-105" onclick={() => addBlock('true_false')}>
						<div class="bg-muted group-hover:bg-emerald-500/10 group-hover:text-emerald-500 flex h-12 w-12 items-center justify-center rounded-2xl transition-colors">
							<CheckCircle size={20} />
						</div>
						<span class="text-[10px] font-bold">صح/خطأ</span>
					</button>
					<button type="button" class="group flex flex-col items-center gap-2 transition-all hover:scale-105" onclick={() => addBlock('multiple_choice')}>
						<div class="bg-muted group-hover:bg-violet-500/10 group-hover:text-violet-500 flex h-12 w-12 items-center justify-center rounded-2xl transition-colors">
							<ListChecks size={20} />
						</div>
						<span class="text-[10px] font-bold">MCQ</span>
					</button>
					<button type="button" class="group flex flex-col items-center gap-2 transition-all hover:scale-105" onclick={() => addBlock('diagram_flow')}>
						<div class="bg-muted group-hover:bg-amber-500/10 group-hover:text-amber-500 flex h-12 w-12 items-center justify-center rounded-2xl transition-colors">
							<GitBranch size={20} />
						</div>
						<span class="text-[10px] font-bold">مخطط</span>
					</button>
					<button type="button" class="group flex flex-col items-center gap-2 transition-all hover:scale-105" onclick={() => addBlock('labeling')}>
						<div class="bg-muted group-hover:bg-cyan-500/10 group-hover:text-cyan-500 flex h-12 w-12 items-center justify-center rounded-2xl transition-colors">
							<Tag size={20} />
						</div>
						<span class="text-[10px] font-bold">تسميات</span>
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Sidebar Controls Area -->
	<div class="space-y-6 lg:col-span-1">
		<!-- Classification Section -->
		<div class="bg-card border-border sticky top-6 space-y-6 rounded-2xl border p-6 shadow-sm">
			<h3 class="flex items-center gap-2 font-bold mb-4">
				<Database size={18} class="text-primary" />
				التصنيف والبيانات
			</h3>

			<!-- Points -->
			<div class="space-y-2">
				<label class="text-sm font-medium">عدد النقاط (المقترح)</label>
				<div class="flex items-center gap-3">
					<input 
						name="points"
						type="number" 
						min="1" 
						max="20"
						bind:value={points}
						class="bg-background border-border w-full rounded-xl border px-3 py-2 text-center text-lg font-bold focus:outline-none focus:ring-1 focus:ring-primary"
					/>
					<span class="font-bold text-muted-foreground">ن</span>
				</div>
			</div>

			<hr class="border-border" />

			<!-- Level -->
			<div class="space-y-2">
				<label class="text-xs font-bold text-muted-foreground">الطور التعليمي</label>
				<select
					bind:value={selectedLevel}
					class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
				>
					<option value="">اختر الطور...</option>
					{#each data.metadata.levels as level}
						<option value={level.id}>{level.nameAr}</option>
					{/each}
				</select>
			</div>

			<!-- Year -->
			{#if selectedLevel}
				<div class="space-y-2">
					<label class="text-xs font-bold text-muted-foreground">المستوى / السنة الدراسية</label>
					<select
						bind:value={selectedYear}
						class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
					>
						<option value="">اختر المستوى...</option>
						{#each filteredYears as year}
							<option value={year.id}>{year.nameAr}</option>
						{/each}
					</select>
				</div>
			{/if}

			<!-- Stream -->
			{#if needsStream && selectedYear}
				<div class="space-y-2">
					<label class="text-xs font-bold text-muted-foreground">الشعبة / التخصص</label>
					<select
						bind:value={selectedStream}
						class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
					>
						<option value="">اختر الشعبة...</option>
						{#each filteredStreams as stream}
							<option value={stream.id}>{stream.nameAr}</option>
						{/each}
					</select>
				</div>
			{/if}

			<!-- Subject -->
			{#if selectedYear && (!needsStream || selectedStream)}
				<div class="space-y-2">
					<label class="text-xs font-bold text-muted-foreground">المادة</label>
					<select
						name="yearSubjectId"
						bind:value={selectedYearSubjectId}
						class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary font-bold"
						required
					>
						<option value="">اختر المادة...</option>
						{#each filteredYearSubjects as ys}
							<option value={ys.id.toString()}>{ys.subjectName}</option>
						{/each}
					</select>
				</div>
			{/if}

			<hr class="border-border" />

			<!-- Trimester -->
			<div class="space-y-2">
				<label class="text-xs font-bold text-muted-foreground">الفصل الدراسي</label>
				<select
					name="trimesterId"
					bind:value={trimesterId}
					class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
				>
					<option value="">غير محدد (عام)</option>
					{#each data.metadata.trimesters as t}
						<option value={t.id}>{t.nameAr}</option>
					{/each}
				</select>
			</div>

			<!-- Unit -->
			<div class="space-y-2">
				<label class="text-xs font-bold text-muted-foreground">الوحدة الدراسية / المحور</label>
				<input 
					name="unit"
					type="text" 
					bind:value={unit}
					placeholder="مثال: الميكانيك"
					class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
				/>
			</div>
		</div>
	</div>
</form>

<style>
	:global(.font-cairo) {
		font-family: 'Cairo', sans-serif;
	}
</style>
