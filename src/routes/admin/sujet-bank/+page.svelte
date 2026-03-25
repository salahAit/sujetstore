<script lang="ts">
	import { FilePlus2, Trash2, Edit, FileText, ExternalLink, Eye, Search, Filter } from 'lucide-svelte';
	import ConfirmModal from '$lib/components/ConfirmModal.svelte';
	import Pagination from '$lib/admin/components/Pagination.svelte';
	import type { ActionData } from './$types';

	let { data } = $props<{ data: any }>();

	// Search and Filter state
	let searchQuery = $state('');
	let filterType = $state('all');
    let currentPage = $state(1);
	let pageSize = $state(10);

	let filteredSubjects = $derived(data.subjects.filter((s: any) => {
		const matchesSearch = (s.titleAr || s.title || '').includes(searchQuery);
		const matchesType = filterType === 'all' || s.type === filterType;
		return matchesSearch && matchesType;
	}));

	let paginatedSubjects = $derived(
		filteredSubjects.slice((currentPage - 1) * pageSize, currentPage * pageSize)
	);

	let isDeleteModalOpen = $state(false);
	let deletingId = $state<number | null>(null);
	let deleteFormElement: HTMLFormElement;

	const typeLabels: Record<string, string> = {
		exam: 'اختبار',
		test: 'فرض',
		lesson: 'درس',
		summary: 'ملخص',
		exercise: 'تمرين',
		solution: 'حل'
	};

	function getYearSubjectLabel(id: number) {
		const ys = data.yearSubjects.find((y: any) => y.id === id);
		if (!ys) return 'غير معروف';
		return ys.streamAr
			? `${ys.yearAr} - ${ys.streamAr} - ${ys.subjectAr}`
			: `${ys.yearAr} - ${ys.subjectAr}`;
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
	<title>بنك المواضيع المنشأة - لوحة التحكم</title>
</svelte:head>

<div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
	<div>
		<h1 class="text-3xl font-bold flex items-center gap-3">
            <FilePlus2 size={32} class="text-purple-500" />
            بنك المواضيع المنشأة
        </h1>
		<p class="text-muted-foreground mt-2 text-sm">إدارة المواضيع التي تم بناؤها باستخدام السوجي بلدر</p>
	</div>
	<a
		href="/admin/sujet-builder"
		class="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 font-bold text-foreground shadow-lg transition-all hover:scale-105 hover:bg-purple-700"
	>
		<FilePlus2 size={20} />
		إنشاء موضوع جديد
	</a>
</div>

<!-- Filters -->
<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
	<div class="relative">
		<Search class="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground" size={18} />
		<input
			type="text"
			bind:value={searchQuery}
			placeholder="ابحث في عنوان الموضوع..."
			class="bg-background border-input text-foreground focus:ring-ring w-full rounded-xl border py-2.5 pr-12 pl-4 focus:outline-none focus:ring-1"
		/>
	</div>
	<div class="flex items-center gap-4">
		<select
			bind:value={filterType}
			class="bg-background border-input text-foreground focus:ring-ring [&>option]:bg-background w-full rounded-xl border px-3 py-2.5 focus:outline-none focus:ring-1"
		>
			<option value="all">كل الأنواع</option>
			<option value="exam">اختبارات</option>
			<option value="test">فروض</option>
		</select>
	</div>
</div>

<div class="bg-card text-card-foreground border-border overflow-hidden rounded-2xl border shadow-sm">
	<div class="overflow-x-auto">
		<table class="w-full text-right text-sm">
			<thead class="border-b border-border bg-muted/50 text-xs text-muted-foreground">
				<tr>
					<th class="px-6 py-4 font-medium tracking-wider uppercase">ID</th>
					<th class="px-6 py-4 font-medium tracking-wider uppercase">العنوان</th>
					<th class="px-6 py-4 font-medium tracking-wider uppercase">السنة والمادة</th>
					<th class="px-6 py-4 font-medium tracking-wider uppercase">النوع</th>
					<th class="px-6 py-4 font-medium tracking-wider uppercase">تاريخ الإنشاء</th>
					<th class="px-6 py-4 text-center font-medium tracking-wider uppercase">إجراءات</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-border">
				{#each paginatedSubjects as doc}
					<tr class="transition-colors hover:bg-muted/50">
						<td class="text-muted-foreground px-6 py-4 font-medium whitespace-nowrap" dir="ltr">{doc.id}</td>
						<td class="max-w-[250px] truncate px-6 py-4 font-bold" title={doc.titleAr || doc.title}>
							{doc.titleAr || doc.title}
						</td>
						<td class="text-muted-foreground px-6 py-4 text-xs whitespace-nowrap">
							{getYearSubjectLabel(doc.yearSubjectId)}
						</td>
						<td class="px-6 py-4 whitespace-nowrap">
							<span class="rounded-full border px-2 py-1 text-xs badge-{doc.type}">
								{typeLabels[doc.type] || doc.type}
							</span>
						</td>
						<td class="text-muted-foreground px-6 py-4 text-xs whitespace-nowrap">
							{new Date(doc.createdAt).toLocaleDateString('ar-DZ')}
						</td>
						<td class="px-6 py-4 whitespace-nowrap">
							<div class="flex justify-center gap-3">
								<a
									href={`/admin/sujet-builder?edit=${doc.id}`}
									class="text-purple-500 transition-colors hover:text-purple-400 p-2 rounded-lg bg-purple-500/10"
									title="تعديل في المنشئ"
								>
									<Edit size={18} />
								</a>
								<a
									href={`/admin/sujet-builder?clone=${doc.id}`}
									class="text-teal-500 transition-colors hover:text-teal-400 p-2 rounded-lg bg-teal-500/10"
									title="إنشاء نسخة"
								>
									<FilePlus2 size={18} />
								</a>
								{#if doc.pdfUrl}
									<a
										href={doc.pdfUrl}
										target="_blank"
										class="text-blue-500 transition-colors hover:text-blue-400 p-2 rounded-lg bg-blue-500/10"
										title="معاينة PDF"
									>
										<FileText size={18} />
									</a>
								{/if}
								<form
									action="/admin/documents?/delete"
									method="POST"
									onsubmit={(e) => {
										e.preventDefault();
										confirmDelete(doc.id, e.currentTarget);
									}}
								>
									<input type="hidden" name="id" value={doc.id} />
									<button
										type="submit"
										class="text-red-500 transition-colors hover:text-red-400 p-2 rounded-lg bg-red-500/10"
										title="حذف"
									>
										<Trash2 size={18} />
									</button>
								</form>
							</div>
						</td>
					</tr>
				{/each}

				{#if paginatedSubjects.length === 0}
					<tr>
						<td colspan="6" class="px-6 py-12 text-center text-muted-foreground">
							<div class="flex flex-col items-center gap-3">
                                <FileText size={48} class="opacity-20" />
                                <p>لا توجد مواضيع منشأة في البنك حالياً</p>
                            </div>
						</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
	{#if filteredSubjects.length > 0}
		<Pagination totalItems={filteredSubjects.length} bind:pageSize bind:currentPage />
	{/if}
</div>

<ConfirmModal
	bind:isOpen={isDeleteModalOpen}
	onConfirm={performDelete}
	title="تأكيد الحذف"
	message="هل أنت متأكد من رغبتك في حذف هذا الموضوع؟ سيؤدي ذلك لمسح الملفات المرتبطة به نهائياً."
/>
