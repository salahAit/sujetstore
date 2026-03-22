<script lang="ts">
	import type { ExerciseBlock, ContentBlock } from '$lib/modules/SujetBuilder/types';
	import BlockEditor from './BlockEditor.svelte';
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
		Tag
	} from 'lucide-svelte';

	let {
		exercises = $bindable(),
		onchange
	}: {
		exercises: ExerciseBlock[];
		onchange?: () => void;
	} = $props();

	function addExercise() {
		exercises = [
			...exercises,
			{
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

<div class="space-y-4">
	<div class="flex items-center justify-between border-b border-border pb-2">
		<h3 class="text-lg font-bold text-foreground">✏️ التمارين</h3>
		<button
			class="flex items-center gap-1.5 rounded-xl bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
			onclick={addExercise}
		>
			<Plus size={16} />
			تمرين جديد
		</button>
	</div>

	{#each exercises as exercise, ei}
		<div class="rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-md">
			<!-- Exercise Header -->
			<div class="mb-3 flex items-center justify-between">
				<div class="flex items-center gap-3">
					<GripVertical size={16} class="cursor-grab text-muted-foreground" />
					<input
						type="text"
						class="w-40 rounded-lg border-0 bg-transparent px-1 py-0 text-sm font-bold text-foreground focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
						value={exercise.num || `التمرين ${ordinals[ei] ?? ei + 1}`}
						oninput={(e) => { exercise.num = (e.target as HTMLInputElement).value; onchange?.(); }}
						placeholder="اسم التمرين..."
					/>
				</div>
				<div class="flex items-center gap-2">
					<label for="sb-points-{ei}" class="text-xs text-muted-foreground">النقاط:</label>
					<input
						id="sb-points-{ei}"
						type="number"
						min="1"
						max="20"
						class="w-16 rounded-lg border border-border bg-background px-2 py-1 text-center text-sm text-foreground focus:border-primary focus:outline-none"
						bind:value={exercise.points}
						oninput={() => onchange?.()}
					/>
					<button
						class="rounded-lg p-1.5 text-muted-foreground hover:bg-red-500/10 hover:text-red-500"
						onclick={() => removeExercise(ei)}
						title="حذف التمرين"
					>
						<Trash2 size={14} />
					</button>
				</div>
			</div>

			<!-- Instruction (optional) -->
			<div class="mb-3">
				<label for="sb-instr-{ei}" class="mb-1 block text-xs text-muted-foreground">نص الوضعية / التعليمة (اختياري)</label>
				<textarea
					id="sb-instr-{ei}"
					class="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
					rows="2"
					placeholder="مثال: بمناسبة شهر رمضان المبارك، ساهمت جمعية خيرية في توزيع قفف الإفطار..."
					bind:value={exercise.instruction}
					oninput={() => onchange?.()}
				></textarea>
			</div>

			<!-- Content Blocks -->
			<div class="space-y-2">
				{#each exercise.content as block, bi}
					<BlockEditor
						bind:block={exercises[ei].content[bi]}
						onremove={() => removeBlock(ei, bi)}
						{onchange}
					/>
				{/each}
			</div>

			<!-- Add Block Buttons -->
			<div class="mt-3 border-t border-border pt-3">
				<p class="mb-2 text-xs text-muted-foreground">إضافة كتلة:</p>
				<div class="flex flex-wrap gap-2">
					<button
						class="flex items-center gap-1 rounded-lg border border-dashed border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
						onclick={() => addBlock(ei, 'text')}
					>
						<Type size={12} /> نص
					</button>
					<button
						class="flex items-center gap-1 rounded-lg border border-dashed border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
						onclick={() => addBlock(ei, 'math')}
					>
						<FunctionSquare size={12} /> معادلة
					</button>
					<button
						class="flex items-center gap-1 rounded-lg border border-dashed border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
						onclick={() => addBlock(ei, 'table')}
					>
						<Table2 size={12} /> جدول
					</button>
					<button
						class="flex items-center gap-1 rounded-lg border border-dashed border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
						onclick={() => addBlock(ei, 'image')}
					>
						<ImageIcon size={12} /> صورة
					</button>
					<button
						class="flex items-center gap-1 rounded-lg border border-dashed border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-emerald-500 hover:text-emerald-500"
						onclick={() => addBlock(ei, 'true_false')}
					>
						<CheckCircle size={12} /> صح/خطأ
					</button>
					<button
						class="flex items-center gap-1 rounded-lg border border-dashed border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-violet-500 hover:text-violet-500"
						onclick={() => addBlock(ei, 'multiple_choice')}
					>
						<ListChecks size={12} /> اختيار متعدد
					</button>
					<button
						class="flex items-center gap-1 rounded-lg border border-dashed border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-amber-500 hover:text-amber-500"
						onclick={() => addBlock(ei, 'diagram_flow')}
					>
						<GitBranch size={12} /> مخطط تدفقي
					</button>
					<button
						class="flex items-center gap-1 rounded-lg border border-dashed border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-cyan-500 hover:text-cyan-500"
						onclick={() => addBlock(ei, 'labeling')}
					>
						<Tag size={12} /> تسميات
					</button>
				</div>
			</div>
		</div>
	{/each}

	{#if exercises.length === 0}
		<div class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-12 text-center">
			<p class="mb-3 text-muted-foreground">لا توجد تمارين بعد</p>
			<button
				class="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
				onclick={addExercise}
			>
				<Plus size={16} />
				إضافة أول تمرين
			</button>
		</div>
	{/if}
</div>
