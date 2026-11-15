<script lang="ts">
	import { enhance } from '$app/forms';
	import { Ticket, Plus, Power, Trash2, CheckCircle2, XCircle, Receipt, Copy, Check } from 'lucide-svelte';

	let { data, form }: { data: any; form: any } = $props();
	let copiedCode = $state<string | null>(null);

	function copyCode(code: string) {
		navigator.clipboard.writeText(code);
		copiedCode = code;
		setTimeout(() => (copiedCode = null), 1500);
	}
</script>

<svelte:head>
	<title>إدارة الاشتراكات والقسائم - الإدارة</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h1 class="text-2xl font-extrabold">الاشتراكات وقسائم التفعيل (Vouchers & Orders)</h1>
		<p class="text-muted-foreground mt-1 text-sm">
			أنشئ دفعات أكواد التفعيل الفوري وراجع وصولات الدفع اليدوية (CCP / BaridiMob).
		</p>
	</div>

	{#if form?.error}
		<div class="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm font-bold text-red-500">
			{form.error}
		</div>
	{/if}

	{#if form?.generated}
		<div class="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
			<p class="mb-2 text-sm font-extrabold text-emerald-500">
				تم توليد {form.generated.length} كود بنجاح:
			</p>
			<div class="flex flex-wrap gap-2" dir="ltr">
				{#each form.generated as code}
					<code class="bg-card rounded-lg border px-2.5 py-1 font-mono text-xs font-bold">{code}</code>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Generate Batch Form -->
	<form
		method="POST"
		action="?/generateBatch"
		use:enhance
		class="bg-card rounded-2xl border p-5 shadow-sm"
	>
		<h2 class="mb-4 flex items-center gap-2 text-base font-extrabold">
			<Plus size={18} class="text-primary" /> توليد قسائم جديدة
		</h2>
		<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
			<div>
				<label for="v-prefix" class="mb-1 block text-xs font-bold">البادئة (Prefix)</label>
				<input
					id="v-prefix"
					name="prefix"
					type="text"
					value="SUJET-"
					dir="ltr"
					class="bg-background w-full rounded-xl border px-3 py-2 text-sm font-mono uppercase"
				/>
			</div>
			<div>
				<label for="v-qty" class="mb-1 block text-xs font-bold">العدد</label>
				<input
					id="v-qty"
					name="quantity"
					type="number"
					min="1"
					max="50"
					value="5"
					dir="ltr"
					class="bg-background w-full rounded-xl border px-3 py-2 text-sm"
				/>
			</div>
			<div>
				<label for="v-days" class="mb-1 block text-xs font-bold">مدة الاشتراك (يوم)</label>
				<select
					id="v-days"
					name="planDays"
					class="bg-background w-full rounded-xl border px-3 py-2 text-sm"
				>
					<option value="30">30 يوماً (شهري)</option>
					<option value="90">90 يوماً (فصلي)</option>
					<option value="365">365 يوماً (سنوي)</option>
				</select>
			</div>
			<div>
				<label for="v-uses" class="mb-1 block text-xs font-bold">أقصى استخدامات</label>
				<input
					id="v-uses"
					name="maxUses"
					type="number"
					min="1"
					max="1000"
					value="1"
					dir="ltr"
					class="bg-background w-full rounded-xl border px-3 py-2 text-sm"
				/>
			</div>
			<div class="flex items-end">
				<button
					type="submit"
					class="bg-primary text-primary-foreground w-full rounded-xl py-2.5 text-sm font-bold shadow transition hover:opacity-95"
				>
					توليد الآن
				</button>
			</div>
		</div>
	</form>

	<!-- Voucher Codes Table -->
	<div class="bg-card overflow-hidden rounded-2xl border shadow-sm">
		<div class="border-b p-4">
			<h2 class="flex items-center gap-2 text-base font-extrabold">
				<Ticket size={18} class="text-amber-500" /> الأكواد المتوفرة ({data.vouchers.length})
			</h2>
		</div>
		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead class="bg-muted/50 text-xs">
					<tr>
						<th class="p-3 text-right font-bold">الكود</th>
						<th class="p-3 text-center font-bold">المدة</th>
						<th class="p-3 text-center font-bold">الاستخدام</th>
						<th class="p-3 text-center font-bold">الحالة</th>
						<th class="p-3 text-center font-bold">إجراءات</th>
					</tr>
				</thead>
				<tbody class="divide-y">
					{#each data.vouchers as v}
						<tr>
							<td class="p-3">
								<div class="flex items-center gap-2">
									<code class="rounded bg-muted px-2 py-0.5 font-mono text-xs font-bold" dir="ltr">
										{v.code}
									</code>
									<button
										onclick={() => copyCode(v.code)}
										class="text-muted-foreground hover:text-foreground"
										title="نسخ"
									>
										{#if copiedCode === v.code}
											<Check size={14} class="text-emerald-500" />
										{:else}
											<Copy size={14} />
										{/if}
									</button>
								</div>
							</td>
							<td class="p-3 text-center font-semibold">{v.plan_days} يوم</td>
							<td class="p-3 text-center font-mono text-xs">{v.used_count} / {v.max_uses}</td>
							<td class="p-3 text-center">
								<span
									class="rounded-full px-2.5 py-0.5 text-xs font-bold {v.is_active
										? 'bg-emerald-500/15 text-emerald-500'
										: 'bg-muted text-muted-foreground'}"
								>
									{v.is_active ? 'مفعّل' : 'موقوف'}
								</span>
							</td>
							<td class="p-3">
								<div class="flex items-center justify-center gap-2">
									<form method="POST" action="?/toggleActive" use:enhance>
										<input type="hidden" name="id" value={v.id} />
										<button
											type="submit"
											class="rounded-lg border p-1.5 hover:bg-accent"
											title="تفعيل/إيقاف"
										>
											<Power size={14} />
										</button>
									</form>
									<form method="POST" action="?/delete" use:enhance>
										<input type="hidden" name="id" value={v.id} />
										<button
											type="submit"
											class="rounded-lg border p-1.5 text-red-500 hover:bg-red-500/10"
											title="حذف"
										>
											<Trash2 size={14} />
										</button>
									</form>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- Payment Orders / CCP Receipts -->
	<div class="bg-card overflow-hidden rounded-2xl border shadow-sm">
		<div class="border-b p-4">
			<h2 class="flex items-center gap-2 text-base font-extrabold">
				<Receipt size={18} class="text-emerald-500" /> طلبات الدفع والوصولات ({data.orders.length})
			</h2>
		</div>
		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead class="bg-muted/50 text-xs">
					<tr>
						<th class="p-3 text-right font-bold">الطالب</th>
						<th class="p-3 text-center font-bold">الوسيلة</th>
						<th class="p-3 text-center font-bold">المبلغ</th>
						<th class="p-3 text-center font-bold">المدة</th>
						<th class="p-3 text-center font-bold">الوصل</th>
						<th class="p-3 text-center font-bold">الحالة</th>
						<th class="p-3 text-center font-bold">قرار</th>
					</tr>
				</thead>
				<tbody class="divide-y">
					{#each data.orders as ord}
						<tr>
							<td class="p-3">
								<p class="font-bold">{ord.user_name}</p>
								<p class="text-muted-foreground text-xs" dir="ltr">{ord.user_email}</p>
							</td>
							<td class="p-3 text-center text-xs font-bold">{ord.provider}</td>
							<td class="p-3 text-center font-bold">{ord.amount_dzd} د.ج</td>
							<td class="p-3 text-center">{ord.plan_days} يوم</td>
							<td class="p-3 text-center">
								{#if ord.receipt_url}
									<a
										href={ord.receipt_url}
										target="_blank"
										class="text-primary text-xs font-bold underline"
									>
										عرض الوصل
									</a>
								{:else}
									—
								{/if}
							</td>
							<td class="p-3 text-center text-xs font-bold">
								<span
									class="rounded-full px-2.5 py-0.5 {ord.status === 'paid'
										? 'bg-emerald-500/15 text-emerald-500'
										: ord.status === 'pending'
											? 'bg-amber-500/15 text-amber-500'
											: 'bg-red-500/15 text-red-500'}"
								>
									{ord.status === 'paid' ? 'مدفوع' : ord.status === 'pending' ? 'قيد المراجعة' : 'مرفوض'}
								</span>
							</td>
							<td class="p-3">
								{#if ord.status === 'pending'}
									<div class="flex justify-center gap-2">
										<form method="POST" action="?/approveOrder" use:enhance>
											<input type="hidden" name="orderId" value={ord.id} />
											<button
												type="submit"
												class="rounded-lg bg-emerald-600 p-1.5 text-white hover:bg-emerald-700"
												title="تأكيد وتفعيل الاشتراك"
											>
												<CheckCircle2 size={14} />
											</button>
										</form>
										<form method="POST" action="?/rejectOrder" use:enhance>
											<input type="hidden" name="orderId" value={ord.id} />
											<button
												type="submit"
												class="rounded-lg bg-red-600 p-1.5 text-white hover:bg-red-700"
												title="رفض"
											>
												<XCircle size={14} />
											</button>
										</form>
									</div>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
