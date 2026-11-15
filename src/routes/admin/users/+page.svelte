<script lang="ts">
	import { enhance } from '$app/forms';
	import { Users, UserPlus, KeyRound, Search, CheckCircle2, AlertCircle } from 'lucide-svelte';

	let { data, form }: { data: any; form: any } = $props();
	let resetUserId = $state<number | null>(null);
</script>

<svelte:head>
	<title>إدارة المستخدمين والصلاحيات - الإدارة</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h1 class="text-2xl font-extrabold">إدارة المستخدمين والصلاحيات (Superadmin)</h1>
		<p class="text-muted-foreground mt-1 text-sm">
			إنشاء حسابات المشرفين والمحرّرين والطلبة، وتعديل الأدوار والاشتراكات وإعادة تعيين كلمات المرور.
		</p>
	</div>

	{#if form?.error}
		<div class="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm font-bold text-red-500">
			<AlertCircle size={18} />
			<span>{form.error}</span>
		</div>
	{/if}

	{#if form?.userCreated || form?.userUpdated || form?.passwordReset}
		<div class="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm font-bold text-emerald-500">
			<CheckCircle2 size={18} />
			<span>
				{#if form.userCreated}تم إنشاء المستخدم بنجاح.
				{:else if form.passwordReset}تم تحديث كلمة المرور بنجاح.
				{:else}تم حفظ التعديلات بنجاح.
				{/if}
			</span>
		</div>
	{/if}

	<!-- Create User -->
	<form method="POST" action="?/createUser" use:enhance class="bg-card space-y-3 rounded-2xl border p-5 shadow-sm">
		<h2 class="flex items-center gap-2 text-base font-extrabold">
			<UserPlus size={18} class="text-primary" /> إضافة مستخدم جديد
		</h2>
		<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
			<input name="name" type="text" required placeholder="الاسم الكامل" class="bg-background rounded-xl border px-3 py-2 text-sm" />
			<input name="email" type="email" required dir="ltr" placeholder="user@example.com" class="bg-background rounded-xl border px-3 py-2 text-left text-sm" />
			<input name="password" type="password" required minlength="6" dir="ltr" placeholder="كلمة المرور (6+)" class="bg-background rounded-xl border px-3 py-2 text-left text-sm" />
			<select name="role" class="bg-background rounded-xl border px-3 py-2 text-sm">
				<option value="student">طالب (student)</option>
				<option value="editor">محرّر (editor)</option>
				<option value="admin">مدير محتوى (admin)</option>
				<option value="superadmin">مدير عام (superadmin)</option>
			</select>
			<div class="flex gap-2">
				<select name="subscriptionTier" class="bg-background flex-1 rounded-xl border px-2 py-2 text-sm">
					<option value="free">مجاني</option>
					<option value="premium">Pro</option>
				</select>
				<button type="submit" class="bg-primary text-primary-foreground rounded-xl px-4 py-2 text-sm font-bold">
					إضافة
				</button>
			</div>
		</div>
	</form>

	<!-- Filter -->
	<form method="GET" class="flex flex-wrap gap-2">
		<div class="relative flex-1 min-w-[200px]">
			<Search size={15} class="text-muted-foreground absolute top-3 right-3" />
			<input
				name="q"
				type="text"
				value={data.q}
				placeholder="ابحث بالاسم أو البريد..."
				class="bg-card w-full rounded-xl border py-2 pr-9 pl-3 text-sm"
			/>
		</div>
		<select name="role" value={data.roleFilter} class="bg-card rounded-xl border px-3 py-2 text-sm">
			<option value="">كل الأدوار</option>
			<option value="superadmin">superadmin</option>
			<option value="admin">admin</option>
			<option value="editor">editor</option>
			<option value="student">student</option>
		</select>
		<button type="submit" class="bg-primary text-primary-foreground rounded-xl px-5 py-2 text-sm font-bold">
			تصفية
		</button>
	</form>

	<!-- Users Table -->
	<div class="bg-card overflow-hidden rounded-2xl border shadow-sm">
		<div class="border-b p-4">
			<h2 class="flex items-center gap-2 text-base font-extrabold">
				<Users size={18} class="text-blue-500" /> قائمة الحسابات ({data.users.length})
			</h2>
		</div>

		<div class="divide-y">
			{#each data.users as u}
				<div class="flex flex-col justify-between gap-3 p-4 lg:flex-row lg:items-center">
					<div>
						<div class="flex flex-wrap items-center gap-2">
							<span class="font-extrabold">{u.name}</span>
							{#if u.id === data.currentUserId}
								<span class="rounded bg-blue-500/15 px-2 py-0.5 text-[10px] font-bold text-blue-500">أنت</span>
							{/if}
							{#if !u.is_active}
								<span class="rounded bg-red-500/15 px-2 py-0.5 text-[10px] font-bold text-red-500">موقوف</span>
							{/if}
						</div>
						<p class="text-muted-foreground text-xs" dir="ltr">{u.email}</p>
					</div>

					<form method="POST" action="?/updateUser" use:enhance class="flex flex-wrap items-center gap-2 text-xs">
						<input type="hidden" name="id" value={u.id} />
						<select name="role" value={u.role} class="bg-background rounded-lg border px-2.5 py-1.5 font-bold">
							<option value="student">طالب</option>
							<option value="editor">محرّر</option>
							<option value="admin">مدير محتوى</option>
							<option value="superadmin">مدير عام</option>
						</select>
						<select name="subscriptionTier" value={u.subscription_tier} class="bg-background rounded-lg border px-2.5 py-1.5 font-bold">
							<option value="free">مجاني</option>
							<option value="premium">Pro</option>
						</select>
						<input
							name="subscriptionExpiresAt"
							type="date"
							value={u.subscription_expires_at ? u.subscription_expires_at.slice(0, 10) : ''}
							class="bg-background rounded-lg border px-2 py-1.5"
							title="تاريخ انتهاء Pro"
						/>
						<select name="isActive" value={u.is_active ? '1' : '0'} class="bg-background rounded-lg border px-2.5 py-1.5 font-bold">
							<option value="1">نشط</option>
							<option value="0">معطل</option>
						</select>
						<button type="submit" class="bg-primary text-primary-foreground rounded-lg px-3 py-1.5 font-bold">
							حفظ
						</button>
						<button
							type="button"
							onclick={() => (resetUserId = resetUserId === u.id ? null : u.id)}
							class="rounded-lg border p-1.5 hover:bg-accent"
							title="تغيير كلمة المرور"
						>
							<KeyRound size={14} />
						</button>
					</form>
				</div>

				{#if resetUserId === u.id}
					<form method="POST" action="?/resetPassword" use:enhance class="bg-muted/30 flex items-center gap-2 border-t px-4 py-2.5 text-xs">
						<input type="hidden" name="id" value={u.id} />
						<span class="font-bold">كلمة المرور الجديدة لـ {u.name}:</span>
						<input
							name="newPassword"
							type="password"
							required
							minlength="6"
							dir="ltr"
							placeholder="6 أحرف على الأقل"
							class="bg-background rounded-lg border px-3 py-1.5 text-left"
						/>
						<button type="submit" class="rounded-lg bg-amber-600 px-3 py-1.5 font-bold text-white">
							تعيين
						</button>
					</form>
				{/if}
			{/each}
		</div>
	</div>
</div>
