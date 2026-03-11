<script lang="ts">
	import { User } from 'lucide-svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>تسجيل الدخول - لوحة التحكم</title>
</svelte:head>

<div class="font-cairo bg-background text-foreground flex min-h-screen items-center justify-center px-4">
	<div class="w-full max-w-md">
		<div class="mb-8 text-center">
			<div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center">
				<img src="/logo.webp" alt="SujetStore Logo" class="h-full w-full drop-shadow-xl" />
			</div>
			<h1 class="text-3xl font-bold">لوحة التحكم</h1>
			<p class="text-muted-foreground mt-2 text-sm">أدخل بيانات الاعتماد للمتابعة</p>
		</div>

		<div class="bg-backgroundard text-card-foreground border-border rounded-2xl border p-8 shadow-2xl">
			<form method="POST" class="space-y-5">
				<div>
					<label for="username" class="mb-2 block text-sm font-medium">اسم المستخدم</label>
					<input
						type="text"
						id="username"
						name="username"
						required
						dir="ltr"
						class="bg-background border-input text-foreground focus:ring-ring w-full rounded-xl border px-4 py-3 transition-colors focus:ring-1 focus:outline-none"
						placeholder="admin"
					/>
				</div>

				<div>
					<label for="password" class="mb-2 block text-sm font-medium">كلمة المرور</label>
					<input
						type="password"
						id="password"
						name="password"
						required
						dir="ltr"
						class="bg-background border-input text-foreground focus:ring-ring w-full rounded-xl border px-4 py-3 transition-colors focus:ring-1 focus:outline-none"
						placeholder="••••••••"
					/>
				</div>

				{#if form?.error}
					<div
						class="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-500"
					>
						{form.message}
					</div>
				{/if}

				<button
					type="submit"
					class="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-xl py-3 font-bold shadow-lg transition-all hover:scale-[1.02]"
				>
					تسجيل الدخول
				</button>
			</form>
		</div>

		<div class="text-muted-foreground mt-8 text-center text-sm">
			&copy; {new Date().getFullYear()} SujetStore. جميع الحقوق محفوظة.
		</div>
	</div>
</div>
