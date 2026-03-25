<script lang="ts">
	import type { ExerciseBlock, ContentBlock } from '$lib/modules/SujetBuilder/types';
	import type { ExamMetadata } from '$lib/modules/SujetBuilder/types';
	import BlockEditor from './BlockEditor.svelte';
	import { dndzone } from 'svelte-dnd-action';
	import {
		Plus,
		Trash2,
		GripVertical,
		Type,
		FunctionSquare,
		Table2,
		ImageIcon,
		CheckCircle,
		ListChecks,
		GitBranch,
		Tag,
		Save,
		Download,
		X,
		Loader2,
		Pencil,
		Maximize2,
		Minimize2,
		ChevronDown,
		ChevronUp,
		ArrowUp,
		ArrowDown
	} from 'lucide-svelte';

	let {
		exercises = $bindable(),
		metadata,
		onchange
	}: {
		exercises: ExerciseBlock[];
		metadata: ExamMetadata;
		onchange?: () => void;
	} = $props();

	const flipDurationMs = 250;

	function generateId() {
		return Math.random().toString(36).substring(2, 9);
	}

	// Ensure all initial exercises have an ID for dnd-action
	$effect(() => {
		let modified = false;
		const updated = exercises.map(ex => {
			if (!ex.id) {
				modified = true;
				return { ...ex, id: generateId() };
			}
			return ex;
		});
		if (modified) {
			exercises = updated;
		}
	});

	function handleDndConsider(e: CustomEvent<any>) {
		exercises = e.detail.items;
	}

	function handleDndFinalize(e: CustomEvent<any>) {
		exercises = e.detail.items;
		onchange?.();
	}

	// Bank State
	let isImportModalOpen = $state(false);
	let bankExercises: any[] = $state([]);
	let loadingBank = $state(false);
	let savingStates = $state<Record<number, boolean>>({});

	// UI State
	let expandedExerciseId = $state<string | null>(null);
	let collapsedExercises = $state<Set<string>>(new Set());

	function toggleCollapse(id: string) {
		const newSet = new Set(collapsedExercises);
		if (newSet.has(id)) newSet.delete(id);
		else newSet.add(id);
		collapsedExercises = newSet;
	}

	function moveExercise(index: number, direction: 'up' | 'down') {
		if (direction === 'up' && index > 0) {
			const temp = exercises[index];
			exercises[index] = exercises[index - 1];
			exercises[index - 1] = temp;
			exercises = [...exercises];
			onchange?.();
		} else if (direction === 'down' && index < exercises.length - 1) {
			const temp = exercises[index];
			exercises[index] = exercises[index + 1];
			exercises[index + 1] = temp;
			exercises = [...exercises];
			onchange?.();
		}
	}

	async function fetchBankExercises() {
		if (!metadata.yearId || !metadata.subjectId) return;
		loadingBank = true;
		try {
			const res = await fetch(`/api/sujet-builder/bank?yearId=${metadata.yearId}&subjectId=${metadata.subjectId}&streamId=${metadata.streamId || ''}`);
			if (res.ok) {
				const data = await res.json();
				bankExercises = data.exercises || [];
			}
		} catch (e) {
			console.error('Failed to fetch bank exercises:', e);
		} finally {
			loadingBank = false;
		}
	}

	function openImportModal() {
		isImportModalOpen = true;
		fetchBankExercises();
	}

	function importExercise(bankEx: any) {
		const parsedContent = typeof bankEx.content === 'string' ? JSON.parse(bankEx.content) : bankEx.content;
		exercises = [
			...exercises,
			{
				id: generateId(),
				points: bankEx.points || 4,
				instruction: '', 
				content: parsedContent,
				num: bankEx.title
			}
		];
		isImportModalOpen = false;
		onchange?.();
	}

	async function saveToBank(exercise: ExerciseBlock, index: number) {
		if (!metadata.yearId || !metadata.subjectId) {
			alert('يرجى تحديد السنة والمادة أولاً.');
			return;
		}
		const title = exercise.num || `التمرين ${ordinals[index] ?? index + 1}`;
		savingStates[index] = true;
		try {
			const res = await fetch('/api/sujet-builder/bank', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					yearId: metadata.yearId,
					subjectId: metadata.subjectId,
					streamId: metadata.streamId,
					title: title,
					content: exercise.content,
					points: exercise.points,
					tags: ''
				})
			});
			if (res.ok) {
				alert('تم حفظ التمرين في بنك التمارين بنجاح!');
			} else {
				alert('حدث خطأ أثناء حفظ التمرين.');
			}
		} catch (e) {
			console.error(e);
			alert('حدث خطأ أثناء الاتصال بالخادم.');
		} finally {
			savingStates[index] = false;
		}
	}

	function addExercise() {
		exercises = [
			...exercises,
			{
				id: Date.now().toString(),
				points: 4,
				instruction: '',
				content: [{ type: 'text', content: '' }]
			}
		];
		onchange?.();
	}

	function removeExercise(index: number) {
		exercises = exercises.filter((_, i) => i !== index);
		onchange?.();
	}

	function addBlock(exerciseIndex: number, type: ContentBlock['type']) {
		let newBlock: ContentBlock;
		switch (type) {
			case 'text':
				newBlock = { type: 'text', content: '' };
				break;
			case 'math':
				newBlock = { type: 'math', content: '', display: true };
				break;
			case 'table':
				newBlock = { type: 'table', headers: ['', ''], cells: ['', ''] };
				break;
			case 'image':
				newBlock = { type: 'image', src: '' };
				break;
			case 'true_false':
				newBlock = { type: 'true_false', items: [{ q: '', a: '', mark: '01' }] };
				break;
			case 'multiple_choice':
				newBlock = {
					type: 'multiple_choice',
					groups: [{ header: '', options: ['', '', ''], correct: '', mark: '01' }]
				};
				break;
			case 'diagram_flow':
				newBlock = { type: 'diagram_flow', flow: ['', '', ''], mark: '01' };
				break;
			case 'labeling':
				newBlock = { type: 'labeling', labels: ['', '', ''], mark: '01' };
				break;
			default:
				return;
		}
		exercises[exerciseIndex].content = [...exercises[exerciseIndex].content, newBlock];
		onchange?.();
	}

	function removeBlock(exerciseIndex: number, blockIndex: number) {
		exercises[exerciseIndex].content = exercises[exerciseIndex].content.filter(
			(_, i) => i !== blockIndex
		);
		onchange?.();
	}

	const ordinals = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن'];
</script>

<div class="flex items-center justify-between border-b border-border pb-2 mb-4">
	<div class="flex items-center gap-2 text-primary">
		<Pencil size={18} />
		<h3 class="text-lg font-bold text-foreground">التمارين</h3>
	</div>
	<div class="flex items-center gap-2">
		<button
			class="flex items-center gap-1.5 rounded-xl bg-muted px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted-foreground/10"
			onclick={openImportModal}
			title="استيراد تمرين جاهز من البنك"
		>
			<Download size={16} />
			استيراد من البنك
		</button>
		<button
			class="flex items-center gap-1.5 rounded-xl bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
			onclick={addExercise}
		>
			<Plus size={16} />
			تمرين جديد
		</button>
	</div>
</div>

<div 
	class="space-y-4 min-h-[100px]"
	use:dndzone={{ items: exercises, flipDurationMs }}
	onconsider={handleDndConsider}
	onfinalize={handleDndFinalize}
>

	{#each exercises as exercise, ei (exercise.id)}
		<div class="transition-all {expandedExerciseId === exercise.id ? 'fixed inset-0 z-50 flex flex-col bg-muted/30 p-4 md:p-8 backdrop-blur-sm' : ''}">
			<!-- Full-screen backdrop click to close -->
			{#if expandedExerciseId === exercise.id}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="absolute inset-0 bg-black/40 backdrop-blur-sm" onclick={() => expandedExerciseId = null}></div>
			{/if}

			<div class="relative z-10 flex flex-col rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md {expandedExerciseId === exercise.id ? 'mx-auto w-full max-w-5xl flex-1 overflow-hidden shadow-2xl' : ''}">
				<!-- Exercise Header -->
				<div class="flex items-center justify-between border-b border-border/50 bg-muted/10 p-3">
					<div class="flex items-center gap-2 flex-1">
						{#if !expandedExerciseId}
							<div class="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground hover:bg-muted p-2 rounded-lg transition-colors" title="اسحب لإعادة الترتيب">
								<GripVertical size={18} />
							</div>
						{/if}
						<button
							class="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted"
							onclick={() => toggleCollapse(exercise.id!)}
							title={collapsedExercises.has(exercise.id!) ? 'توسيع التمرين' : 'طي التمرين'}
						>
							{#if collapsedExercises.has(exercise.id!)}
								<ChevronDown size={18} />
							{:else}
								<ChevronUp size={18} />
							{/if}
						</button>
						<input
							type="text"
							class="flex-1 min-w-[120px] rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-base font-bold text-foreground transition-colors focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary hover:border-border/50 hover:bg-muted/30"
							value={exercise.num || `التمرين ${ordinals[exercises.indexOf(exercise)] ?? exercises.indexOf(exercise) + 1}`}
							oninput={(e) => { exercise.num = (e.target as HTMLInputElement).value; onchange?.(); }}
							placeholder="اسم التمرين..."
						/>
					</div>
					
					<div class="flex items-center gap-1.5 shrink-0 bg-background/50 rounded-lg p-1 border border-border/50">
						{#if !expandedExerciseId}
							<!-- Move UP/DOWN -->
							<div class="flex items-center border-l border-border/50 pl-1 ml-1">
								<button
									class="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent"
									onclick={() => moveExercise(exercises.indexOf(exercise), 'up')}
									disabled={exercises.indexOf(exercise) === 0}
									title="نقل لأعلى"
								>
									<ArrowUp size={16} />
								</button>
								<button
									class="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent"
									onclick={() => moveExercise(exercises.indexOf(exercise), 'down')}
									disabled={exercises.indexOf(exercise) === exercises.length - 1}
									title="نقل لأسفل"
								>
									<ArrowDown size={16} />
								</button>
							</div>
						{/if}

						<label for="sb-points-{ei}" class="text-xs font-medium text-muted-foreground px-1 hidden sm:inline">النقاط:</label>
						<input
							id="sb-points-{ei}"
							type="number"
							min="1"
							max="20"
							class="w-14 rounded-md border border-border bg-background px-2 py-1 text-center text-sm font-bold text-primary focus:border-primary focus:outline-none shadow-sm"
							bind:value={exercise.points}
							oninput={() => onchange?.()}
						/>
						
						<div class="h-5 w-px bg-border/80 mx-1"></div>
						
						<!-- Actions -->
						<button
							class="rounded-md p-1.5 text-blue-500 transition-colors hover:bg-blue-500/10"
							onclick={() => saveToBank(exercise, exercises.indexOf(exercise))}
							title="حفظ هذا التمرين في البنك"
							disabled={savingStates[ei]}
						>
							{#if savingStates[ei]}
								<Loader2 size={18} class="animate-spin" />
							{:else}
								<Save size={18} />
							{/if}
						</button>
						<button
							class="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
							onclick={() => expandedExerciseId = expandedExerciseId === exercise.id ? null : exercise.id!}
							title={expandedExerciseId === exercise.id ? 'تصغير' : 'تكبير ملء الشاشة'}
						>
							{#if expandedExerciseId === exercise.id}
								<Minimize2 size={18} />
							{:else}
								<Maximize2 size={18} />
							{/if}
						</button>
						<button
							class="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500"
							onclick={() => {
								if (expandedExerciseId === exercise.id) expandedExerciseId = null;
								removeExercise(exercises.indexOf(exercise));
							}}
							title="حذف التمرين"
						>
							<Trash2 size={18} />
						</button>
					</div>
				</div>

				<!-- Exercise Body (Collapsible) -->
				{#if !collapsedExercises.has(exercise.id!) || expandedExerciseId === exercise.id}
					<div class="flex-1 overflow-y-auto p-4 {expandedExerciseId === exercise.id ? 'bg-background' : ''}">
			
			<!-- Instruction (optional) -->
			<div class="mb-5">
				<label for="sb-instr-{ei}" class="mb-1.5 block text-xs font-bold text-muted-foreground uppercase tracking-wider">نص الوضعية / التعليمة (اختياري)</label>
				<textarea
					id="sb-instr-{ei}"
					class="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
					rows="2"
					placeholder="مثال: بمناسبة شهر رمضان المبارك، ساهمت جمعية خيرية في توزيع قفف الإفطار..."
					bind:value={exercise.instruction}
					oninput={() => onchange?.()}
				></textarea>
			</div>

			<!-- Content Blocks -->
			<div class="space-y-4">
				{#each exercise.content as block, bi}
					<BlockEditor
						bind:block={exercises[exercises.indexOf(exercise)].content[bi]}
						onremove={() => removeBlock(exercises.indexOf(exercise), bi)}
						{onchange}
					/>
				{/each}
			</div>

			<!-- Add Block Buttons -->
			<div class="mt-4 border-t border-border/60 pt-4">
				<p class="mb-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">إضافة كتلة جديدة</p>
				<div class="flex flex-wrap gap-2">
					<button
						class="flex items-center gap-1.5 rounded-xl bg-muted/50 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary border border-border/50 shadow-sm"
						onclick={() => addBlock(exercises.indexOf(exercise), 'text')}
					>
						<Type size={16} /> نص
					</button>
					<button
						class="flex items-center gap-1.5 rounded-xl bg-muted/50 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary border border-border/50 shadow-sm"
						onclick={() => addBlock(exercises.indexOf(exercise), 'math')}
					>
						<FunctionSquare size={16} /> معادلة
					</button>
					<button
						class="flex items-center gap-1.5 rounded-xl bg-muted/50 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary border border-border/50 shadow-sm"
						onclick={() => addBlock(exercises.indexOf(exercise), 'table')}
					>
						<Table2 size={16} /> جدول
					</button>
					<button
						class="flex items-center gap-1.5 rounded-xl bg-muted/50 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary border border-border/50 shadow-sm"
						onclick={() => addBlock(exercises.indexOf(exercise), 'image')}
					>
						<ImageIcon size={16} /> صورة
					</button>
					
					<div class="w-px bg-border/60 mx-1"></div>
					
					<button
						class="flex items-center gap-1.5 rounded-xl bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-400 transition-colors hover:bg-emerald-500/20 border border-emerald-500/20 shadow-sm"
						onclick={() => addBlock(exercises.indexOf(exercise), 'true_false')}
					>
						<CheckCircle size={16} /> صح/خطأ
					</button>
					<button
						class="flex items-center gap-1.5 rounded-xl bg-violet-500/10 px-3 py-2 text-sm font-medium text-violet-700 dark:text-violet-400 transition-colors hover:bg-violet-500/20 border border-violet-500/20 shadow-sm"
						onclick={() => addBlock(exercises.indexOf(exercise), 'multiple_choice')}
					>
						<ListChecks size={16} /> اختيار متعدد
					</button>
					<button
						class="flex items-center gap-1.5 rounded-xl bg-amber-500/10 px-3 py-2 text-sm font-medium text-amber-700 dark:text-amber-400 transition-colors hover:bg-amber-500/20 border border-amber-500/20 shadow-sm"
						onclick={() => addBlock(exercises.indexOf(exercise), 'diagram_flow')}
					>
						<GitBranch size={16} /> مخطط تدفقي
					</button>
					<button
						class="flex items-center gap-1.5 rounded-xl bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-700 dark:text-cyan-400 transition-colors hover:bg-cyan-500/20 border border-cyan-500/20 shadow-sm"
						onclick={() => addBlock(exercises.indexOf(exercise), 'labeling')}
					>
						<Tag size={16} /> تسميات
					</button>
				</div>
			</div> <!-- End of Add Block Buttons -->
					</div> <!-- End of flex-1 overflow-y-auto -->
				{/if} <!-- End of collapsible body -->
		</div>
		</div>
	{/each}

	{#if exercises.length === 0}
		<div class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-12 text-center">
			<p class="mb-3 text-muted-foreground">لا توجد تمارين بعد</p>
			<div class="flex items-center gap-3">
				<button
					class="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
					onclick={addExercise}
				>
					<Plus size={16} />
					إضافة أول تمرين
				</button>
				<button
					class="flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
					onclick={openImportModal}
				>
					<Download size={16} />
					استيراد جاهز
				</button>
			</div>
		</div>
	{/if}
</div>

<!-- Import Modal overlay -->
{#if isImportModalOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
		<div class="w-full max-w-2xl overflow-hidden rounded-2xl bg-card shadow-xl animate-in zoom-in-95 duration-200" dir="rtl">
			<div class="flex items-center justify-between border-b border-border bg-muted/30 px-6 py-4">
				<div class="flex items-center gap-2 text-primary">
					<Download size={20} />
					<h2 class="text-xl font-bold">بنك التمارين</h2>
				</div>
				<button class="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted" onclick={() => (isImportModalOpen = false)}>
					<X size={20} />
				</button>
			</div>
			
			<div class="p-6 h-[60vh] overflow-y-auto">
				{#if loadingBank}
					<div class="flex flex-col items-center justify-center h-40 gap-3 text-muted-foreground">
						<Loader2 size={32} class="animate-spin text-primary" />
						<p>جاري تحميل بنك التمارين...</p>
					</div>
				{:else if bankExercises.length === 0}
					<div class="flex flex-col items-center justify-center h-40 gap-3 text-center border-2 border-dashed border-border rounded-xl">
						<p class="text-muted-foreground font-medium">لا توجد تمارين محفوظة مسبقاً لهذه المادة.</p>
						<p class="text-sm text-muted-foreground/70">قم بإنشاء تمرين جديد ثم اضغط على زر الحفظ (💾) لإضافته للبنك.</p>
					</div>
				{:else}
					<div class="grid gap-3">
						{#each bankExercises as bx}
							<button 
								class="flex items-center justify-between rounded-xl border border-border p-4 text-start transition-all hover:border-primary hover:shadow-sm"
								onclick={() => importExercise(bx)}
							>
								<div>
									<h4 class="font-bold text-foreground">{bx.title}</h4>
									<p class="text-xs text-muted-foreground mt-1">
										تاريخ الحفظ: {new Date(bx.createdAt).toLocaleDateString('ar-DZ')}
									</p>
								</div>
								<div class="flex gap-2 items-center">
									<span class="rounded bg-primary/10 px-2 py-1 text-xs font-bold text-primary">{bx.points} نقاط</span>
									<span class="text-primary opacity-0 transition-opacity hover:opacity-100 group-hover:opacity-100">+ إدراج</span>
								</div>
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
