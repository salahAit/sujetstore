<script lang="ts">
	import { Plus, Trash2, Edit, X, ArrowRight } from 'lucide-svelte';
	import ConfirmModal from '$lib/components/ConfirmModal.svelte';
	import type { ActionData } from './$types';

	let { data, form } = $props<{ data: any; form: ActionData }>();

	let isCreateModalOpen = $state(false);

	let isEditModalOpen = $state(false);
	let editingItem: any = $state(null);

	let isDeleteModalOpen = $state(false);
	let deletingId = $state<number | null>(null);
	let deleteFormElement: HTMLFormElement;

	function openEdit(item: any) {
		editingItem = { ...item };
		isEditModalOpen = true;
	}

	function confirmDelete(id: number, formEl: HTMLFormElement) {
		deletingId = id;
		deleteFormElement = formEl;
		isDeleteModalOpen = true;
	}

	function performDelete() {
		if (deleteFormElement) {
			deleteFormElement.submit();
		}
	}
</script>

<svelte:head>
	<title>مواد الشعبة ({data.stream.nameAr}) - لوحة التحكم</title>
</svelte:head>

<div class="mb-4">
    <a href="/admin/streams" class="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowRight size={16} class="ml-1" />
        العودة للشعب الدراسية
    </a>
</div>

<div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
	<div>
		<h1 class="text-3xl font-bold">مواد الشعبة: <span class="text-primary">{data.stream.nameAr}</span></h1>
		<p class="text-muted-foreground mt-2 text-sm">إدارة المواد المرتبطة بهذه الشعبة ومعاملاتها</p>
	</div>
	<button
		onclick={() => (isCreateModalOpen = true)}
		class="flex items-center gap-2 rounded-xl bg-purple-500 px-4 py-2 font-bold text-white transition-all hover:scale-105 hover:bg-purple-600"
	>
		<Plus size={20} />
		ربط مادة جديدة
	</button>
</div>

{#if form?.error}
	<div
		class="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-center text-sm font-bold text-red-500"
	>
		{form.message}
	</div>
{/if}

{#if form?.success}
	<div
		class="mb-6 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4 text-center text-sm font-bold text-emerald-500"
	>
		تمت العملية بنجاح!
	</div>
{/if}

<div class="bg-card text-card-foreground border-border overflow-hidden rounded-2xl border shadow-sm">
	<div class="overflow-x-auto">
		<table class="w-full text-right text-sm">
			<thead class="border-b border-border bg-muted/50 text-xs text-muted-foreground">
				<tr>
					<th class="px-6 py-4 font-medium tracking-wider uppercase">ترتيب</th>
					<th class="px-6 py-4 font-medium tracking-wider uppercase">المادة الدراسية</th>
					<th class="px-6 py-4 font-medium tracking-wider uppercase">المعامل</th>
					<th class="px-6 py-4 font-medium tracking-wider uppercase">السنة الدراسية (مخصص)</th>
					<th class="px-6 py-4 text-center font-medium tracking-wider uppercase">إجراءات</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-border">
				{#each data.linkedSubjects.sort((a,b) => a.order - b.order) as subject}
					<tr class="transition-colors hover:bg-muted/50">
						<td class="px-6 py-4 font-medium whitespace-nowrap text-foreground/80" dir="ltr"
							>{subject.order}</td
						>
						<td class="px-6 py-4 font-bold whitespace-nowrap">
                            <div class="flex flex-col">
                                <span>{subject.subjectNameAr}</span>
                                <span class="text-xs text-muted-foreground" dir="ltr">{subject.subjectId}</span>
                            </div>
                        </td>
						<td class="px-6 py-4 whitespace-nowrap">{subject.coefficient || '-'}</td>
						<td class="px-6 py-4 whitespace-nowrap">
                            {#if subject.yearId}
                                <span class="bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs">
                                    {subject.yearNameAr || subject.yearId}
                                </span>
                            {:else}
                                <span class="text-muted-foreground text-xs">عام (لجميع السنوات)</span>
                            {/if}
                        </td>
						<td class="flex justify-center gap-3 px-6 py-4 whitespace-nowrap">
							<button
								onclick={() => openEdit(subject)}
								class="text-primary transition-colors hover:text-primary/80"
								title="تعديل"
							>
								<Edit size={18} />
							</button>
							<form
								action="?/removeSubject"
								method="POST"
								onsubmit={(e) => {
									e.preventDefault();
									confirmDelete(subject.id, e.currentTarget);
								}}
							>
								<input type="hidden" name="id" value={subject.id} />
								<button
									type="submit"
									class="text-red-600 dark:text-red-400 transition-colors hover:opacity-80"
									title="حذف"
								>
									<Trash2 size={18} />
								</button>
							</form>
						</td>
					</tr>
				{/each}

				{#if data.linkedSubjects.length === 0}
					<tr>
						<td colspan="5" class="px-6 py-8 text-center text-muted-foreground">
							لم يتم ربط أية مواد بهذه الشعبة بعد
						</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
</div>

<!-- Create Modal -->
{#if isCreateModalOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
		onclick={(e) => {
			if (e.target === e.currentTarget) isCreateModalOpen = false;
		}}
	>
		<div
			class="bg-card text-card-foreground border-border max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border p-6 shadow-2xl"
		>
			<div class="mb-6 flex items-center justify-between">
				<h2 class="text-xl font-bold">ربط مادة دراسية</h2>
				<button class="text-muted-foreground hover:text-foreground" onclick={() => (isCreateModalOpen = false)}>
					<X size={20} />
				</button>
			</div>

			<form action="?/addSubject" method="POST" class="space-y-4">
				
                <div>
                    <label for="subjectId" class="mb-1 block text-sm font-medium">المادة الدراسية</label>
                    <select
                        id="subjectId"
                        name="subjectId"
                        required
                        class="bg-background border-input text-foreground focus:ring-ring [&>option]:bg-background w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-1"
                    >
                        <option value="">-- اختر المادة --</option>
                        {#each data.allSubjects as subject}
                            <option value={subject.id}>{subject.nameAr} ({subject.id})</option>
                        {/each}
                    </select>
                </div>

                <div>
                    <label for="yearId" class="mb-1 block text-sm font-medium">السنة الدراسية (مخصص)</label>
                    <select
                        id="yearId"
                        name="yearId"
                        class="bg-background border-input text-foreground focus:ring-ring [&>option]:bg-background w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-1"
                    >
                        <option value="">تمامه (لجميع المستويات في هذه الشعبة)</option>
                        {#each data.allYears as year}
                            <option value={year.id}>{year.nameAr}</option>
                        {/each}
                    </select>
                </div>

				<div class="grid grid-cols-2 gap-4">
					<div>
						<label for="coefficient" class="mb-1 block text-sm font-medium">المعامل</label>
						<input
							type="number"
							id="coefficient"
							name="coefficient"
							min="1"
                            max="20"
							class="bg-background border-input text-foreground focus:ring-ring w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-1"
							placeholder="اختياري"
						/>
					</div>
					<div>
						<label for="order" class="mb-1 block text-sm font-medium">الترتيب</label>
						<input
							type="number"
							id="order"
							name="order"
							value="0"
							class="bg-background border-input text-foreground focus:ring-ring w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-1"
						/>
					</div>
				</div>

				<div class="mt-8 flex gap-3">
					<button
						type="button"
						onclick={() => (isCreateModalOpen = false)}
						class="bg-secondary text-secondary-foreground hover:bg-secondary/80 flex-1 rounded-xl border-transparent py-2.5 font-bold transition-colors"
					>
						إلغاء
					</button>
					<button
						type="submit"
						class="flex-1 rounded-xl bg-purple-500 py-2.5 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-purple-600"
					>
						تأكيد الربط
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<!-- Edit Modal -->
{#if isEditModalOpen && editingItem}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
		onclick={(e) => {
			if (e.target === e.currentTarget) isEditModalOpen = false;
		}}
	>
		<div
			class="bg-card text-card-foreground border-border max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border p-6 shadow-2xl"
		>
			<div class="mb-6 flex items-center justify-between">
				<h2 class="text-primary text-xl font-bold">تعديل ربط المادة</h2>
				<button class="text-muted-foreground hover:text-foreground" onclick={() => (isEditModalOpen = false)}>
					<X size={20} />
				</button>
			</div>

			<form action="?/updateSubject" method="POST" class="space-y-4">
				<input type="hidden" name="id" value={editingItem.id} />
				
				<div>
                    <label for="edit_subjectId" class="mb-1 block text-sm font-medium">المادة الدراسية</label>
                    <select
                        id="edit_subjectId"
                        name="subjectId"
                        required
                        bind:value={editingItem.subjectId}
                        class="bg-background border-input text-foreground focus:ring-ring [&>option]:bg-background w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-1"
                    >
                        {#each data.allSubjects as subject}
                            <option value={subject.id}>{subject.nameAr} ({subject.id})</option>
                        {/each}
                    </select>
                </div>

                <div>
                    <label for="edit_yearId" class="mb-1 block text-sm font-medium">السنة الدراسية (مخصص)</label>
                    <select
                        id="edit_yearId"
                        name="yearId"
                        bind:value={editingItem.yearId}
                        class="bg-background border-input text-foreground focus:ring-ring [&>option]:bg-background w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-1"
                    >
                        <option value="">تمامه (لجميع المستويات في هذه الشعبة)</option>
                        {#each data.allYears as year}
                            <option value={year.id}>{year.nameAr}</option>
                        {/each}
                    </select>
                </div>

				<div class="grid grid-cols-2 gap-4">
					<div>
						<label for="edit_coefficient" class="mb-1 block text-sm font-medium">المعامل</label>
						<input
							type="number"
							id="edit_coefficient"
							name="coefficient"
							min="1"
                            max="20"
                            bind:value={editingItem.coefficient}
							class="bg-background border-input text-foreground focus:ring-ring w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-1"
						/>
					</div>
					<div>
						<label for="edit_order" class="mb-1 block text-sm font-medium">الترتيب</label>
						<input
							type="number"
							id="edit_order"
							name="order"
                            bind:value={editingItem.order}
							class="bg-background border-input text-foreground focus:ring-ring w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-1"
						/>
					</div>
				</div>

				<div class="mt-8 flex gap-3">
					<button
						type="button"
						onclick={() => (isEditModalOpen = false)}
						class="bg-secondary text-secondary-foreground hover:bg-secondary/80 flex-1 rounded-xl border-transparent py-2.5 font-bold transition-colors"
					>
						إلغاء
					</button>
					<button
						type="submit"
						class="flex-1 rounded-xl bg-blue-500 py-2.5 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-blue-600"
					>
						حفظ التعديلات
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<ConfirmModal
	bind:isOpen={isDeleteModalOpen}
	onConfirm={performDelete}
	title="إلغاء الربط"
	message="هل أنت متأكد من رغبتك في إزالة هذه المادة من الشعبة؟ لن تُحذف المادة نفسها بل سيتم فك ارتباطها පමණ."
/>
