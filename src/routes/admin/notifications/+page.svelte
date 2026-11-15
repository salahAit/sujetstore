<script lang="ts">
	import { enhance } from '$app/forms';
	import { Bell, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-svelte';

	let { data, form }: { data: any; form: any } = $props();

	const typeLabels: Record<string, string> = {
		announcement: 'إعلان عام',
		new_doc: 'موضوع جديد',
		update: 'تحديث المنصة'
	};
</script>

<svelte:head>
	<title>إدارة الإشعارات - الإدارة</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h1 class="text-2xl font-extrabold">إدارة الإشعارات والتنبيهات</h1>
		<p class="text-muted-foreground mt-1 text-sm">
			تظهر هذه الإشعارات لجميع الزوار والتلاميذ في جرس التنبيهات (وفي النسخة الثابتة كذلك).
		</p>
	</div>

	{#if form?.error}
		<div class="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm font-bold text-red-500">
			<AlertCircle size={18} />
			<span>{form.error}</span>
		</div>
	{/if}

	{#if form?.created}
		<div class="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm font-bold text-emerald-500">
			<CheckCircle2 size={18} />
			<span>تم نشر الإشعار بنجاح.</span>
		</div>
	{/if}

	<form method="POST" action="?/create" use:enhance class="bg-card space-y-4 rounded-2xl border p-5 shadow-sm">
		<h2 class="flex items-center gap-2 text-base font-extrabold">
			<Plus size={18} class="text-primary" /> إشعار جديد
		</h2>

		<div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
			<div class="sm:col-span-2">
				<label for="n-title" class="mb-1 block text-xs font-bold">العنوان</label>
				<input
					id="n-title"
					name="title"
					type="text"
					required
					placeholder="مثال: تم إضافة مواضيع الفصل الثالث للرياضيات"
					class="bg-background w-full rounded-xl border px-3 py-2 text-sm"
				/>
			</div>
			<div>
				<label for="n-type" class="mb-1 block text-xs font-bold">النوع</label>
				<select id="n-type" name="type" class="bg-background w-full rounded-xl border px-3 py-2 text-sm">
					<option value="announcement">إعلان عام</option>
					<option value="new_doc">موضوع جديد</option>
					<option value="update">تحديث المنصة</option>
				</select>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
			<div class="sm:col-span-2">
				<label for="n-body" class="mb-1 block text-xs font-bold">التفاصيل (اختياري)</label>
				<input
					id="n-body"
					name="body"
					type="text"
					placeholder="نص مختصر يظهر أسفل العنوان..."
					class="bg-background w-full rounded-xl border px-3 py-2 text-sm"
				/>
			</div>
			<div>
				<label for="n-doc" class="mb-1 block text-xs font-bold">ربط بموضوع (اختياري)</label>
				<select id="n-doc" name="documentId" class="bg-background w-full rounded-xl border px-3 py-2 text-sm">
					<option value="">بدون رابط</option>
					{#each data.documents as doc}
						<option value={doc.id}>{doc.title_ar || doc.title}</option>
					{/each}
				</select>
			</div>
		</div>

		<button
			type="submit"
			class="bg-primary text-primary-foreground rounded-xl px-6 py-2.5 text-sm font-bold shadow transition hover:opacity-95"
		>
			نشر الإشعار
		</button>
	</form>

	<div class="bg-card overflow-hidden rounded-2xl border shadow-sm">
		<div class="border-b p-4">
			<h2 class="flex items-center gap-2 text-base font-extrabold">
				<Bell size={18} class="text-amber-500" /> الإشعارات المنشورة ({data.notifications.length})
			</h2>
		</div>

		<div class="divide-y">
			{#each data.notifications as n}
				<div class="flex items-start justify-between gap-4 p-4">
					<div>
						<div class="flex items-center gap-2">
							<span class="bg-muted rounded px-2 py-0.5 text-[10px] font-bold">
								{typeLabels[n.type] || n.type}
							</span>
							<p class="text-sm font-extrabold">{n.title}</p>
						</div>
						{#if n.body}
							<p class="text-muted-foreground mt-1 text-xs">{n.body}</p>
						{/if}
					</div>
					<form method="POST" action="?/delete" use:enhance>
						<input type="hidden" name="id" value={n.id} />
						<button
							type="submit"
							class="rounded-lg border p-2 text-red-500 transition hover:bg-red-500/10"
							title="حذف"
						>
							<Trash2 size={14} />
						</button>
					</form>
				</div>
			{:else}
				<p class="text-muted-foreground py-8 text-center text-sm">لا توجد إشعارات منشورة.</p>
			{/each}
		</div>
	</div>
</div>
