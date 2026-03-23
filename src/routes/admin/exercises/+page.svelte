<script lang="ts">
	import { Plus, Trash2, Edit, Search, Filter, BookOpen, Calendar, Database, FileText, Upload, Loader2 } from 'lucide-svelte';
	import ConfirmModal from '$lib/components/ConfirmModal.svelte';
	import Pagination from '$lib/admin/components/Pagination.svelte';
	
	let { data } = $props<{ data: any }>();
	
	import { enhance } from '$app/forms';

	// Import State
	let isImporting = $state(false);
	let importFormElement = $state<HTMLFormElement | null>(null);
	let importFileInput = $state<HTMLInputElement | null>(null);
	let importData = $state('');

	function handleImportFile(event: Event) {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			importData = e.target?.result as string;
			if (importData && importFormElement) {
				setTimeout(() => importFormElement!.requestSubmit(), 50);
			}
			if (importFileInput) importFileInput.value = '';
		};
		reader.readAsText(file);
	}

	// Filter state
	let searchUnit = $state('');
	let selectedLevel = $state('');
	let selectedYear = $state('');
	let selectedSubject = $state('');
	let selectedTrimester = $state('');

	// Derived lists for filters
	let filteredYears = $derived(
		selectedLevel 
			? data.metadata.years.filter((y: any) => y.levelId === selectedLevel) 
			: data.metadata.years
	);

	let filteredYearSubjects = $derived(
		selectedYear 
			? data.metadata.yearSubjects.filter((ys: any) => ys.yearId === selectedYear) 
			: data.metadata.yearSubjects
	);

	// Filtering logic
	let filteredExercises = $derived(
		data.exercises.filter((ex: any) => {
			const matchesUnit = !searchUnit || ex.unit?.toLowerCase().includes(searchUnit.toLowerCase()) || ex.title.toLowerCase().includes(searchUnit.toLowerCase());
			const matchesLevel = !selectedLevel || ex.levelName === data.metadata.levels.find((l: any) => l.id === selectedLevel)?.nameAr;
			const matchesYear = !selectedYear || ex.yearName === data.metadata.years.find((y: any) => y.id === selectedYear)?.nameAr;
			const matchesSubject = !selectedSubject || ex.yearSubjectId === Number(selectedSubject);
			const matchesTrimester = !selectedTrimester || ex.trimesterId === selectedTrimester;
			
			return matchesUnit && matchesLevel && matchesYear && matchesSubject && matchesTrimester;
		})
	);

	// Pagination state
	let currentPage = $state(1);
	let pageSize = $state(10);
	let paginatedExercises = $derived(
		filteredExercises.slice((currentPage - 1) * pageSize, currentPage * pageSize)
	);

	// Modals
	let isDeleteModalOpen = $state(false);
	let deletingId = $state<number | null>(null);
	let deleteFormElement: HTMLFormElement;

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

	// Reset filters
	function resetFilters() {
		searchUnit = '';
		selectedLevel = '';
		selectedYear = '';
		selectedSubject = '';
		selectedTrimester = '';
	}
</script>

<svelte:head>
	<title>بنك التمارين المطبوعة - لوحة التحكم</title>
</svelte:head>

<!-- Header & Stats -->
<div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
	<div>
		<h1 class="text-3xl font-bold">بنك التمارين المطبوعة</h1>
		<p class="text-muted-foreground mt-2 text-sm">إدارة التمارين القابلة للطباعة وتصنيفها حسب الوحدات والفصول</p>
	</div>
	<div class="flex flex-wrap items-center gap-2 mt-4 sm:mt-0">
		<!-- Import Form -->
		<form
			bind:this={importFormElement}
			action="?/import"
			method="POST"
			use:enhance={() => {
				isImporting = true;
				return async ({ result, update }) => {
					isImporting = false;
					if (result.type === 'success') {
						alert(result.data?.message || 'تم الاستيراد بنجاح');
					} else if (result.type === 'failure') {
						alert(result.data?.message || 'خطأ في الاستيراد');
					}
					await update();
				};
			}}
		>
			<input type="hidden" name="exercisesData" bind:value={importData} />
			<input type="file" accept=".json" class="hidden" bind:this={importFileInput} onchange={handleImportFile} />
			<button
				type="button"
				onclick={() => importFileInput?.click()}
				disabled={isImporting}
				class="bg-card text-foreground border-border hover:bg-muted flex flex-1 sm:flex-none justify-center items-center gap-2 rounded-xl border px-4 py-2 font-bold transition-all disabled:opacity-50"
			>
				{#if isImporting}
					<Loader2 size={20} class="animate-spin" />
					جاري الاستيراد...
				{:else}
					<Upload size={20} />
					استيراد من JSON
				{/if}
			</button>
		</form>

		<a
			href="/admin/exercises/new"
			class="flex flex-1 sm:flex-none justify-center items-center gap-2 rounded-xl bg-primary px-4 py-2 font-bold text-primary-foreground transition-all hover:scale-105"
		>
			<Plus size={20} />
			إضافة تمرين جديد
		</a>
	</div>
</div>

<!-- Stats Cards -->
<div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
	<div class="bg-card border-border rounded-2xl border p-4 shadow-sm">
		<div class="flex items-center gap-3 text-muted-foreground">
			<Database size={18} />
			<span class="text-sm font-medium">إجمالي التمارين</span>
		</div>
		<p class="mt-2 text-2xl font-bold">{data.exercises.length}</p>
	</div>
	<div class="bg-card border-border rounded-2xl border p-4 shadow-sm">
		<div class="flex items-center gap-3 text-emerald-500">
			<FileText size={18} />
			<span class="text-sm font-medium">تمارين اليوم</span>
		</div>
		<p class="mt-2 text-2xl font-bold">0</p>
	</div>
	<!-- Add more stats if needed -->
</div>

<!-- Advanced Filters -->
<div class="bg-card border-border mb-8 rounded-2xl border p-6 shadow-sm">
	<div class="mb-4 flex items-center gap-2 font-bold">
		<Filter size={18} />
		تصفية النتائج
	</div>
	
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
		<!-- Search -->
		<div class="space-y-1">
			<label class="text-muted-foreground text-xs font-medium">البحث (العنوان/الوحدة)</label>
			<div class="relative">
				<Search class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
				<input
					type="text"
					bind:value={searchUnit}
					placeholder="ابحث هنا..."
					class="bg-background border-border w-full rounded-xl border py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
				/>
			</div>
		</div>

		<!-- Level -->
		<div class="space-y-1">
			<label class="text-muted-foreground text-xs font-medium">الطور التعليمي</label>
			<select
				bind:value={selectedLevel}
				class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
			>
				<option value="">كل الأطوار</option>
				{#each data.metadata.levels as level}
					<option value={level.id}>{level.nameAr}</option>
				{/each}
			</select>
		</div>

		<!-- Year -->
		<div class="space-y-1">
			<label class="text-muted-foreground text-xs font-medium">السنة الدراسية</label>
			<select
				bind:value={selectedYear}
				class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
			>
				<option value="">كل السنوات</option>
				{#each filteredYears as year}
					<option value={year.id}>{year.nameAr}</option>
				{/each}
			</select>
		</div>

		<!-- Subject -->
		<div class="space-y-1">
			<label class="text-muted-foreground text-xs font-medium">المادة</label>
			<select
				bind:value={selectedSubject}
				class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
			>
				<option value="">كل المواد</option>
				{#each filteredYearSubjects as ys}
					<option value={ys.id}>{ys.subjectName}</option>
				{/each}
			</select>
		</div>

		<!-- Trimester -->
		<div class="space-y-1">
			<label class="text-muted-foreground text-xs font-medium">الفصل</label>
			<select
				bind:value={selectedTrimester}
				class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
			>
				<option value="">كل الفصول</option>
				{#each data.metadata.trimesters as t}
					<option value={t.id}>{t.nameAr}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="mt-4 flex justify-end">
		<button
			onclick={resetFilters}
			class="text-muted-foreground hover:text-foreground text-xs font-medium underline underline-offset-4"
		>
			إعادة تعيين الفلاتر
		</button>
	</div>
</div>

<!-- Table -->
<div class="bg-card border-border overflow-hidden rounded-2xl border shadow-sm">
	<div class="overflow-x-auto">
		<table class="w-full text-right text-sm">
			<thead class="border-b border-border bg-muted/50 text-xs text-muted-foreground">
				<tr>
					<th class="px-6 py-4 font-medium tracking-wider uppercase">العنوان</th>
					<th class="px-6 py-4 font-medium tracking-wider uppercase">المادة</th>
					<th class="px-6 py-4 font-medium tracking-wider uppercase">المستوى</th>
					<th class="px-6 py-4 font-medium tracking-wider uppercase">الوحدة</th>
					<th class="px-6 py-4 font-medium tracking-wider uppercase">النقاط</th>
					<th class="px-6 py-4 font-medium tracking-wider uppercase">التاريخ</th>
					<th class="px-6 py-4 text-center font-medium tracking-wider uppercase">إجراءات</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-border">
				{#each paginatedExercises as ex}
					<tr class="transition-colors hover:bg-muted/50">
						<td class="px-6 py-4">
							<div class="flex flex-col">
								<span class="font-bold text-foreground">{ex.title}</span>
								<span class="text-muted-foreground text-[10px]">#{ex.id}</span>
							</div>
						</td>
						<td class="px-6 py-4">
							<div class="flex items-center gap-2">
								<div class="h-2 w-2 rounded-full bg-primary/40"></div>
								{ex.subjectName}
							</div>
						</td>
						<td class="px-6 py-4 text-muted-foreground">
							{ex.levelName} - {ex.yearName}
						</td>
						<td class="px-6 py-4">
							<span class="bg-muted text-muted-foreground rounded-lg px-2 py-1 text-xs">
								{ex.unit || 'عام'}
							</span>
						</td>
						<td class="px-6 py-4 font-bold">{ex.points}ن</td>
						<td class="px-6 py-4 text-xs text-muted-foreground">
							{new Date(ex.createdAt).toLocaleDateString('ar-DZ')}
						</td>
						<td class="px-6 py-4">
							<div class="flex justify-center gap-3">
								<a
									href="/admin/exercises/{ex.id}"
									class="text-primary transition-colors hover:opacity-80"
									title="تعديل"
								>
									<Edit size={18} />
								</a>
								<form
									action="?/delete"
									method="POST"
									onsubmit={(e) => {
										e.preventDefault();
										confirmDelete(ex.id, e.currentTarget);
									}}
								>
									<input type="hidden" name="id" value={ex.id} />
									<button
										type="submit"
										class="text-red-500 transition-colors hover:opacity-80"
										title="حذف"
									>
										<Trash2 size={18} />
									</button>
								</form>
							</div>
						</td>
					</tr>
				{/each}

				{#if paginatedExercises.length === 0}
					<tr>
						<td colspan="7" class="px-6 py-12 text-center text-muted-foreground">
							<div class="flex flex-col items-center gap-2">
								<Database size={40} class="opacity-20" />
								<p>لا توجد تمارين تطابق خيارات البحث</p>
							</div>
						</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
	{#if filteredExercises.length > 0}
		<div class="border-t border-border p-4">
			<Pagination totalItems={filteredExercises.length} bind:pageSize bind:currentPage />
		</div>
	{/if}
</div>

<ConfirmModal
	bind:isOpen={isDeleteModalOpen}
	onConfirm={performDelete}
	title="تأكيد الحذف"
	message="هل أنت متأكد من رغبتك في حذف هذا التمرين من البنك؟"
/>
