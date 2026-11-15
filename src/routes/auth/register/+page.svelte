<script lang="ts">
	import { enhance } from '$app/forms';
	import { UserPlus, Mail, Lock, User, GraduationCap, MapPin, Loader2, ArrowLeft } from 'lucide-svelte';

	let { data, form }: { data: any; form: any } = $props();
	let isSubmitting = $state(false);
	let selectedYearId = $state('4am');
	let selectedYear = $derived(data.years.find((y: any) => y.id === selectedYearId));
</script>

<svelte:head>
	<title>إنشاء حساب طالب - SujetStore</title>
</svelte:head>

<div class="mx-auto max-w-lg px-4 py-10 sm:px-6">
	<div class="bg-card rounded-3xl border p-6 shadow-xl sm:p-8">
		<div class="mb-6 text-center">
			<div
				class="bg-primary/10 text-primary mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl"
			>
				<UserPlus size={28} />
			</div>
			<h1 class="text-2xl font-extrabold">إنشاء حساب طالب مجاني</h1>
			<p class="text-muted-foreground mt-1 text-sm">
				سجّل لحفظ نقاطك، مراجعة دفتر أخطائك، وتوليد فروض واختبارات مخصصة
			</p>
		</div>

		{#if form?.error}
			<div class="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm font-semibold text-red-500">
				{form.error}
			</div>
		{/if}

		<form
			method="POST"
			use:enhance={() => {
				isSubmitting = true;
				return async ({ update }) => {
					await update();
					isSubmitting = false;
				};
			}}
			class="space-y-4"
		>
			<input type="hidden" name="next" value={data.next} />

			<div>
				<label for="reg-name" class="mb-1.5 block text-sm font-bold">الاسم الكامل</label>
				<div class="relative">
					<User size={16} class="text-muted-foreground absolute top-3.5 right-3.5" />
					<input
						id="reg-name"
						name="name"
						type="text"
						required
						value={form?.name ?? ''}
						placeholder="مثال: أمين بن علي"
						class="bg-background w-full rounded-xl border py-2.5 pr-10 pl-3 text-sm outline-none focus:border-blue-500"
					/>
				</div>
			</div>

			<div>
				<label for="reg-email" class="mb-1.5 block text-sm font-bold">البريد الإلكتروني</label>
				<div class="relative">
					<Mail size={16} class="text-muted-foreground absolute top-3.5 right-3.5" />
					<input
						id="reg-email"
						name="email"
						type="email"
						required
						dir="ltr"
						value={form?.email ?? ''}
						placeholder="student@example.com"
						class="bg-background w-full rounded-xl border py-2.5 pr-10 pl-3 text-left text-sm outline-none focus:border-blue-500"
					/>
				</div>
			</div>

			<div>
				<label for="reg-password" class="mb-1.5 block text-sm font-bold">كلمة المرور</label>
				<div class="relative">
					<Lock size={16} class="text-muted-foreground absolute top-3.5 right-3.5" />
					<input
						id="reg-password"
						name="password"
						type="password"
						required
						minlength="6"
						dir="ltr"
						placeholder="••••••••"
						class="bg-background w-full rounded-xl border py-2.5 pr-10 pl-3 text-left text-sm outline-none focus:border-blue-500"
					/>
				</div>
				<p class="text-muted-foreground mt-1 text-xs">6 أحرف على الأقل</p>
			</div>

			<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
				<div>
					<label for="reg-year" class="mb-1.5 flex items-center gap-1 text-sm font-bold">
						<GraduationCap size={15} /> السنة الدراسية
					</label>
					<select
						id="reg-year"
						name="yearId"
						bind:value={selectedYearId}
						class="bg-background w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
					>
						{#each data.years as yr}
							<option value={yr.id}>{yr.name_ar} ({yr.level_name})</option>
						{/each}
					</select>
				</div>

				<div>
					<label for="reg-wilaya" class="mb-1.5 flex items-center gap-1 text-sm font-bold">
						<MapPin size={15} /> الولاية
					</label>
					<select
						id="reg-wilaya"
						name="wilaya"
						class="bg-background w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
					>
						<option value="">اختياري</option>
						{#each data.wilayas as w}
							<option value={`${w.code} - ${w.nameAr}`}>{w.code} - {w.nameAr}</option>
						{/each}
					</select>
				</div>
			</div>

			{#if selectedYear?.level_id === 'secondaire'}
				<div>
					<label for="reg-stream" class="mb-1.5 block text-sm font-bold">الشعبة</label>
					<select
						id="reg-stream"
						name="streamId"
						class="bg-background w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
					>
						<option value="">اختر الشعبة...</option>
						{#each data.streams as st}
							<option value={st.id}>{st.name_ar}</option>
						{/each}
					</select>
				</div>
			{/if}

			<button
				type="submit"
				disabled={isSubmitting}
				class="bg-primary text-primary-foreground flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold shadow-lg transition-all hover:opacity-95 disabled:opacity-50"
			>
				{#if isSubmitting}
					<Loader2 size={18} class="animate-spin" />
					جاري إنشاء الحساب...
				{:else}
					<UserPlus size={18} />
					إنشاء الحساب والبدء الآن
				{/if}
			</button>
		</form>

		<div class="mt-6 border-t pt-4 text-center text-sm">
			<span class="text-muted-foreground">لديك حساب بالفعل؟</span>
			<a
				href={`/auth/login?next=${encodeURIComponent(data.next)}`}
				class="text-primary mr-1 inline-flex items-center gap-1 font-bold hover:underline"
			>
				تسجيل الدخول <ArrowLeft size={14} />
			</a>
		</div>
	</div>
</div>
