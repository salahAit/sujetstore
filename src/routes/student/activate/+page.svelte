<script lang="ts">
	import { enhance } from '$app/forms';
	import { Ticket, CreditCard, UploadCloud, CheckCircle2, Crown, Loader2, AlertCircle } from 'lucide-svelte';

	let { data, form }: { data: any; form: any } = $props();

	let selectedPlan = $state<'monthly' | 'quarterly' | 'annual'>('monthly');
	let chargilyLoading = $state(false);
	let chargilyError = $state<string | null>(null);

	const plans = [
		{ id: 'monthly' as const, days: 30, price: 500, label: 'باقة شهر واحد', badge: '' },
		{ id: 'quarterly' as const, days: 90, price: 1200, label: 'باقة فصل دراسي (3 أشهر)', badge: 'الأكثر اختياراً' },
		{ id: 'annual' as const, days: 365, price: 3500, label: 'باقة السنة الكاملة', badge: 'أفضل توفير' }
	];

	async function startChargilyCheckout() {
		chargilyLoading = true;
		chargilyError = null;
		try {
			const res = await fetch('/api/payments/chargily', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ plan: selectedPlan })
			});
			const out = await res.json();
			if (!res.ok || !out.checkoutUrl) {
				chargilyError = out.error || 'تعذر بدء عملية الدفع الإلكتروني';
				return;
			}
			window.location.href = out.checkoutUrl;
		} catch {
			chargilyError = 'تعذر الاتصال ببوابة الدفع';
		} finally {
			chargilyLoading = false;
		}
	}
</script>

<svelte:head>
	<title>تفعيل الاشتراك والقسائم - SujetStore</title>
</svelte:head>

<div class="space-y-6">
	<!-- Current Plan Banner -->
	<div class="bg-card rounded-2xl border p-6 shadow-sm">
		<div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
			<div class="flex items-center gap-3">
				<div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-500">
					<Crown size={26} />
				</div>
				<div>
					<h2 class="text-lg font-extrabold">
						{data.isPremium ? 'أنت مشترك حالياً في SujetStore Pro' : 'باقة العضوية الحالية: مجاني'}
					</h2>
					<p class="text-muted-foreground text-xs">
						{#if data.isPremium && data.studentUser.subscriptionExpiresAt}
							ينتهي الاشتراك في: {new Date(data.studentUser.subscriptionExpiresAt).toLocaleDateString('ar-DZ')}
						{:else if data.isPremium}
							صلاحية دائمة / إدارية
						{:else}
							اشترك الآن لفتح مواضيع BEM والاختبارات الحصرية وميزة المولّد الذكي غير المحدود
						{/if}
					</p>
				</div>
			</div>
		</div>
	</div>

	{#if form?.error}
		<div class="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm font-bold text-red-500">
			<AlertCircle size={18} />
			<span>{form.error}</span>
		</div>
	{/if}

	{#if form?.redeemed}
		<div class="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm font-bold text-emerald-500">
			<CheckCircle2 size={20} />
			<span>تم تفعيل قسيمتك بنجاح (+{form.planDays} يوماً)! جميع المحتويات الاحترافية مفتوحة الآن.</span>
		</div>
	{/if}

	{#if form?.receiptUploaded}
		<div class="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm font-bold text-emerald-500">
			<CheckCircle2 size={20} />
			<span>تم استلام وصل الدفع بنجاح! ستتم مراجعته وتفعيل اشتراكك من طرف الإدارة.</span>
		</div>
	{/if}

	{#if data.paymentStatus === 'success'}
		<div class="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm font-bold text-emerald-500">
			شكراً لك! إذا تم تأكيد الدفع من Chargily، فسيُفعّل اشتراكك تلقائياً خلال ثوانٍ.
		</div>
	{/if}

	<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
		<!-- 1. Instant Voucher Redemption -->
		<div class="bg-card rounded-2xl border p-6 shadow-sm">
			<h3 class="mb-2 flex items-center gap-2 text-base font-extrabold">
				<Ticket size={19} class="text-amber-500" /> التفعيل الفوري عبر كود القسيمة (Voucher)
			</h3>
			<p class="text-muted-foreground mb-4 text-xs leading-relaxed">
				إذا اشتريت بطاقة أو كود تفعيل من المكتبات المعتمدة أو عبر الواتساب/تلغرام، أدخله هنا للتفعيل الفوري:
			</p>
			<form method="POST" action="?/redeemVoucher" use:enhance class="flex gap-2">
				<input
					name="code"
					type="text"
					required
					dir="ltr"
					placeholder="MOYEN-FREE-30"
					class="bg-background flex-1 rounded-xl border px-4 py-2.5 font-mono text-sm uppercase outline-none focus:border-amber-500"
				/>
				<button
					type="submit"
					class="rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-white shadow transition hover:bg-amber-600"
				>
					تفعيل
				</button>
			</form>
		</div>

		<!-- 2. Electronic Payment (Chargily EDAHABIA / CIB) -->
		<div class="bg-card rounded-2xl border p-6 shadow-sm">
			<h3 class="mb-2 flex items-center gap-2 text-base font-extrabold">
				<CreditCard size={19} class="text-emerald-500" /> الدفع الإلكتروني (الذهبية / CIB)
			</h3>
			<p class="text-muted-foreground mb-4 text-xs">
				اختر الباقة المناسبة واضغط للدفع الآمن عبر Chargily Pay:
			</p>
			<div class="mb-4 grid grid-cols-3 gap-2">
				{#each plans as p}
					<button
						type="button"
						onclick={() => (selectedPlan = p.id)}
						class="rounded-xl border p-2.5 text-center transition {selectedPlan === p.id
							? 'border-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500'
							: 'hover:bg-accent'}"
					>
						<p class="text-xs font-extrabold">{p.days} يوم</p>
						<p class="mt-0.5 text-sm font-black text-emerald-500">{p.price} د.ج</p>
					</button>
				{/each}
			</div>
			{#if chargilyError}
				<p class="mb-3 rounded-lg bg-amber-500/10 p-2.5 text-xs font-semibold text-amber-500">
					{chargilyError}
				</p>
			{/if}
			<button
				type="button"
				onclick={startChargilyCheckout}
				disabled={chargilyLoading}
				class="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-bold text-white shadow transition hover:bg-emerald-700 disabled:opacity-50"
			>
				{#if chargilyLoading}
					<Loader2 size={16} class="animate-spin" /> جاري التحويل لبوابة الدفع...
				{:else}
					<CreditCard size={16} /> الدفع ببطاقة الذهبية / CIB
				{/if}
			</button>
		</div>
	</div>

	<!-- 3. CCP / BaridiMob Manual Receipt Upload -->
	<div class="bg-card rounded-2xl border p-6 shadow-sm">
		<h3 class="mb-2 flex items-center gap-2 text-base font-extrabold">
			<UploadCloud size={19} class="text-blue-500" /> التحويل عبر بريدي موب (BaridiMob) أو CCP
		</h3>
		<p class="text-muted-foreground mb-4 text-xs">
			ارفع صورة وصل التحويل ليتم تفعيل اشتراكك من طرف الإدارة في أقرب وقت:
		</p>
		<form
			method="POST"
			action="?/submitReceipt"
			enctype="multipart/form-data"
			use:enhance
			class="flex flex-col gap-3 sm:flex-row sm:items-end"
		>
			<div>
				<label for="rec-plan" class="mb-1 block text-xs font-bold">الباقة المدفوعة</label>
				<select
					id="rec-plan"
					name="planDays"
					class="bg-background rounded-xl border px-3 py-2.5 text-sm"
				>
					<option value="30">30 يوماً — 500 د.ج</option>
					<option value="90">90 يوماً — 1200 د.ج</option>
					<option value="365">365 يوماً — 3500 د.ج</option>
				</select>
			</div>
			<div class="flex-1">
				<label for="rec-file" class="mb-1 block text-xs font-bold">صورة وصل الدفع</label>
				<input
					id="rec-file"
					name="receipt"
					type="file"
					required
					accept="image/png,image/jpeg,image/webp"
					class="bg-background w-full rounded-xl border px-3 py-2 text-xs"
				/>
			</div>
			<button
				type="submit"
				class="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow transition hover:bg-blue-700"
			>
				إرسال الوصل
			</button>
		</form>
	</div>

	{#if data.orders.length > 0}
		<div class="bg-card rounded-2xl border p-5 shadow-sm">
			<h3 class="mb-3 text-sm font-extrabold">سجل طلباتي</h3>
			<div class="space-y-2 text-xs">
				{#each data.orders as ord}
					<div class="bg-muted/30 flex items-center justify-between rounded-xl border p-3">
						<span class="font-bold">{ord.provider} · {ord.plan_days} يوم ({ord.amount_dzd} د.ج)</span>
						<span
							class="rounded-full px-2.5 py-0.5 font-bold {ord.status === 'paid'
								? 'bg-emerald-500/15 text-emerald-500'
								: ord.status === 'pending'
									? 'bg-amber-500/15 text-amber-500'
									: 'bg-red-500/15 text-red-500'}"
						>
							{ord.status === 'paid' ? 'مؤكد' : ord.status === 'pending' ? 'قيد المراجعة' : 'ملغى'}
						</span>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
