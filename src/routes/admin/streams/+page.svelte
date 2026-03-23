<script lang="ts">
	import { Plus, Trash2, Edit, X, Settings } from 'lucide-svelte';
	import ConfirmModal from '$lib/components/ConfirmModal.svelte';
	import type { ActionData } from './$types';

	let { data, form } = $props<{ data: any; form: ActionData }>();

	let isCreateModalOpen = $state(false);

	let isEditModalOpen = $state(false);
	let editingItem: any = $state(null);

	let isDeleteModalOpen = $state(false);
	let deletingId = $state<string | null>(null);
	let deleteFormElement: HTMLFormElement;

	function openEdit(item: any) {
		editingItem = { ...item };
		isEditModalOpen = true;
	}

	function confirmDelete(id: string, formEl: HTMLFormElement) {
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
	<title>إدارة الشعب الدراسية - لوحة التحكم</title>
</svelte:head>

<div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
	<div>
		<h1 class="text-3xl font-bold">الشعب الدراسية</h1>
		<p class="text-muted-foreground mt-2 text-sm">إدارة الشعب والجذوع المشتركة</p>
	</div>
	<button
		onclick={() => (isCreateModalOpen = true)}
		class="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 font-bold text-white transition-all hover:scale-105 hover:bg-orange-600"
	>
		<Plus size={20} />
		إضافة شعبة
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
					<th class="px-6 py-4 font-medium tracking-wider uppercase">ID</th>
					<th class="px-6 py-4 font-medium tracking-wider uppercase">الاسم الكامل</th>
					<th class="px-6 py-4 font-medium tracking-wider uppercase">الاسم (عربي)</th>
					<th class="px-6 py-4 font-medium tracking-wider uppercase">الاسم (فرنسي)</th>
					<th class="px-6 py-4 text-center font-medium tracking-wider uppercase">إدارة المواد</th>
					<th class="px-6 py-4 text-center font-medium tracking-wider uppercase">إجراءات</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-border">
				{#each data.streams as stream}
					<tr class="transition-colors hover:bg-muted/50">
						<td class="px-6 py-4 font-medium whitespace-nowrap text-foreground/80" dir="ltr"
							>{stream.id}</td
						>
						<td class="px-6 py-4 font-bold whitespace-nowrap">{stream.name}</td>
						<td class="px-6 py-4 whitespace-nowrap">{stream.nameAr}</td>
						<td class="px-6 py-4 whitespace-nowrap" dir="ltr">{stream.nameFr}</td>
						<td class="px-6 py-4 text-center whitespace-nowrap">
							<a
								href={`/admin/streams/${stream.id}`}
								class="inline-flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
							>
								<Settings size={14} />
								المواد الدراسية
							</a>
						</td>
						<td class="flex justify-center gap-3 px-6 py-4 whitespace-nowrap">
							<button
								onclick={() => openEdit(stream)}
								class="text-primary transition-colors hover:text-primary/80"
								title="تعديل"
							>
								<Edit size={18} />
							</button>
							<form
								action="?/delete"
								method="POST"
								onsubmit={(e) => {
									e.preventDefault();
									confirmDelete(stream.id, e.currentTarget);
								}}
							>
								<input type="hidden" name="id" value={stream.id} />
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

				{#if data.streams.length === 0}
					<tr>
						<td colspan="6" class="px-6 py-8 text-center text-muted-foreground">
							لا توجد شعب دراسية بعد
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
				<h2 class="text-xl font-bold">إضافة شعبة دراسية</h2>
				<button class="text-muted-foreground hover:text-foreground" onclick={() => (isCreateModalOpen = false)}>
					<X size={20} />
				</button>
			</div>

			<form action="?/create" method="POST" class="space-y-4">
				<div>
					<label for="id" class="mb-1 block text-sm font-medium">المعرف (ID - إنجليزي)</label>
					<input
						type="text"
						id="id"
						name="id"
						required
						dir="ltr"
						class="bg-background border-input text-foreground focus:ring-ring w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-1"
						placeholder="SE"
					/>
				</div>

				<div>
					<label for="name" class="mb-1 block text-sm font-medium">الاسم الكامل</label>
					<input
						type="text"
						id="name"
						name="name"
						required
						class="bg-background border-input text-foreground focus:ring-ring w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-1"
						placeholder="علوم تجريبية"
					/>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div>
						<label for="nameAr" class="mb-1 block text-sm font-medium">الاسم (عربي قصير)</label>
						<input
							type="text"
							id="nameAr"
							name="nameAr"
							required
							class="bg-background border-input text-foreground focus:ring-ring w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-1"
							placeholder="ع ت"
						/>
					</div>
					<div>
						<label for="nameFr" class="mb-1 block text-sm font-medium">الاسم (فرنسي)</label>
						<input
							type="text"
							id="nameFr"
							name="nameFr"
							required
							dir="ltr"
							class="bg-background border-input text-foreground focus:ring-ring w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-1"
							placeholder="Sc. Exp"
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
						class="flex-1 rounded-xl bg-orange-500 py-2.5 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-orange-600"
					>
						حفظ الإضافة
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
				<h2 class="text-primary text-xl font-bold">تعديل شعبة دراسية</h2>
				<button class="text-muted-foreground hover:text-foreground" onclick={() => (isEditModalOpen = false)}>
					<X size={20} />
				</button>
			</div>

			<form action="?/update" method="POST" class="space-y-4">
				<input type="hidden" name="originalId" value={editingItem.id} />
				
				<div>
					<label for="edit_id" class="mb-1 block text-sm font-medium">المعرف (ID - إنجليزي)</label>
					<input
						type="text"
						id="edit_id"
						name="id"
						required
						dir="ltr"
						bind:value={editingItem.id}
						class="bg-background border-input text-foreground focus:ring-ring w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-1"
					/>
				</div>

				<div>
					<label for="edit_name" class="mb-1 block text-sm font-medium">الاسم الكامل</label>
					<input
						type="text"
						id="edit_name"
						name="name"
						required
						bind:value={editingItem.name}
						class="bg-background border-input text-foreground focus:ring-ring w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-1"
					/>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div>
						<label for="edit_nameAr" class="mb-1 block text-sm font-medium">الاسم (عربي قصير)</label>
						<input
							type="text"
							id="edit_nameAr"
							name="nameAr"
							required
							bind:value={editingItem.nameAr}
							class="bg-background border-input text-foreground focus:ring-ring w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-1"
						/>
					</div>
					<div>
						<label for="edit_nameFr" class="mb-1 block text-sm font-medium">الاسم (فرنسي)</label>
						<input
							type="text"
							id="edit_nameFr"
							name="nameFr"
							required
							dir="ltr"
							bind:value={editingItem.nameFr}
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
	title="تأكيد الحذف"
	message="هل أنت متأكد من رغبتك في حذف هذه الشعبة؟ سيؤدي ذلك لنتائج غير متوقعة في حال وجود دروس أو وثائق مرتبطة بها."
/>
