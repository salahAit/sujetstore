<script lang="ts">
	import { enhance } from '$app/forms';
	import { LogIn, Mail, Lock, Loader2, ArrowLeft } from 'lucide-svelte';

	let { data, form }: { data: any; form: any } = $props();
	let isSubmitting = $state(false);
</script>

<svelte:head>
	<title>تسجيل الدخول - SujetStore</title>
</svelte:head>

<div class="mx-auto max-w-md px-4 py-12 sm:px-6">
	<div class="bg-card rounded-3xl border p-6 shadow-xl sm:p-8">
		<div class="mb-6 text-center">
			<div
				class="bg-primary/10 text-primary mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl"
			>
				<LogIn size={28} />
			</div>
			<h1 class="text-2xl font-extrabold">تسجيل الدخول</h1>
			<p class="text-muted-foreground mt-1 text-sm">أدخل حسابك لمتابعة تقدمك ومراجعة أخطائك</p>
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
				<label for="login-id" class="mb-1.5 block text-sm font-bold"
					>البريد الإلكتروني أو اسم المستخدم</label
				>
				<div class="relative">
					<Mail size={16} class="text-muted-foreground absolute top-3.5 right-3.5" />
					<input
						id="login-id"
						name="identifier"
						type="text"
						required
						dir="ltr"
						value={form?.identifier ?? ''}
						placeholder="student@example.com"
						class="bg-background w-full rounded-xl border py-2.5 pr-10 pl-3 text-left text-sm outline-none focus:border-blue-500"
					/>
				</div>
			</div>

			<div>
				<label for="login-pass" class="mb-1.5 block text-sm font-bold">كلمة المرور</label>
				<div class="relative">
					<Lock size={16} class="text-muted-foreground absolute top-3.5 right-3.5" />
					<input
						id="login-pass"
						name="password"
						type="password"
						required
						dir="ltr"
						placeholder="••••••••"
						class="bg-background w-full rounded-xl border py-2.5 pr-10 pl-3 text-left text-sm outline-none focus:border-blue-500"
					/>
				</div>
			</div>

			<button
				type="submit"
				disabled={isSubmitting}
				class="bg-primary text-primary-foreground flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold shadow-lg transition-all hover:opacity-95 disabled:opacity-50"
			>
				{#if isSubmitting}
					<Loader2 size={18} class="animate-spin" />
					جاري الدخول...
				{:else}
					<LogIn size={18} />
					دخول إلى حسابي
				{/if}
			</button>
		</form>

		<div class="mt-6 border-t pt-4 text-center text-sm">
			<span class="text-muted-foreground">طالب جديد في SujetStore؟</span>
			<a
				href={`/auth/register?next=${encodeURIComponent(data.next)}`}
				class="text-primary mr-1 inline-flex items-center gap-1 font-bold hover:underline"
			>
				أنشئ حساباً مجانياً <ArrowLeft size={14} />
			</a>
		</div>
	</div>
</div>
