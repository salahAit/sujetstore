import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { pgAll, pgGet, pgRun, pgTx } from '#lib/server/db';
import { saveValidatedUpload } from '#lib/server/uploads';

const PG_NOW_EXPR = "to_char(NOW() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS')";

const PLAN_PRICES: Record<number, number> = {
	30: 500,
	90: 1200,
	365: 3500
};

export const load: PageServerLoad = async ({ parent, url }) => {
	const { studentUser } = await parent();
	const orders = await pgAll(
		'SELECT * FROM payment_orders WHERE user_id = $1 ORDER BY id DESC LIMIT 20',
		[studentUser.id]
	);

	return {
		orders,
		paymentStatus: url.searchParams.get('status')
	};
};

export const actions: Actions = {
	redeemVoucher: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { error: 'يرجى تسجيل الدخول أولاً' });
		const fd = await request.formData();
		const code = ((fd.get('code') as string | null) || '').trim().toUpperCase();
		if (!code || code.length < 4) {
			return fail(400, { error: 'يرجى إدخال كود قسيمة صحيح' });
		}

		let resultDays = 0;
		let resultExpiry = '';

		try {
			await pgTx(async (tx) => {
				// Atomic PostgreSQL row-level lock prevents concurrent double-redemption race conditions
				const voucher = await pgGet<any>(
					'SELECT * FROM voucher_codes WHERE UPPER(code) = $1 FOR UPDATE',
					[code],
					tx
				);

				if (!voucher) throw new Error('كود القسيمة غير موجود أو غير صحيح');
				if (!voucher.is_active) throw new Error('هذا الكود موقوف حالياً');
				if (Number(voucher.used_count) >= Number(voucher.max_uses)) {
					throw new Error('تم استنفاد عدد مرات استخدام هذا الكود');
				}
				if (voucher.expires_at && Date.parse(voucher.expires_at) <= Date.now()) {
					throw new Error('انتهت صلاحية هذا الكود');
				}

				const alreadyUsed = await pgGet<{ id: number }>(
					'SELECT id FROM voucher_redemptions WHERE voucher_id = $1 AND user_id = $2 LIMIT 1',
					[voucher.id, locals.user!.id],
					tx
				);
				if (alreadyUsed) {
					throw new Error('لقد قمت بتفعيل هذا الكود على حسابك من قبل');
				}

				await pgRun(
					'UPDATE voucher_codes SET used_count = used_count + 1 WHERE id = $1',
					[voucher.id],
					tx
				);
				await pgRun(
					`INSERT INTO voucher_redemptions (voucher_id, user_id, redeemed_at)
					 VALUES ($1, $2, ${PG_NOW_EXPR})`,
					[voucher.id, locals.user!.id],
					tx
				);

				const userRow = await pgGet<{ subscription_expires_at: string | null }>(
					'SELECT subscription_expires_at FROM users WHERE id = $1 FOR UPDATE',
					[locals.user!.id],
					tx
				);

				const curExp = userRow?.subscription_expires_at
					? Date.parse(userRow.subscription_expires_at)
					: 0;
				const baseMs = Number.isFinite(curExp) && curExp > Date.now() ? curExp : Date.now();
				resultDays = Number(voucher.plan_days || 30);
				resultExpiry = new Date(baseMs + resultDays * 86400_000).toISOString();

				await pgRun(
					`UPDATE users
					 SET subscription_tier = 'premium', subscription_expires_at = $1, updated_at = ${PG_NOW_EXPR}
					 WHERE id = $2`,
					[resultExpiry, locals.user!.id],
					tx
				);

				await pgRun(
					`INSERT INTO billing_audit_logs (order_id, user_id, event_type, provider, external_id, amount_dzd, status, payload, created_at)
					 VALUES (NULL, $1, 'voucher.redeemed', 'voucher', $2, 0, 'redeemed', $3, ${PG_NOW_EXPR})`,
					[
						locals.user!.id,
						voucher.code,
						JSON.stringify({
							voucherId: voucher.id,
							planDays: resultDays,
							newExpiry: resultExpiry,
							usedCount: Number(voucher.used_count) + 1,
							maxUses: voucher.max_uses
						})
					],
					tx
				);
			});

			return { redeemed: true, planDays: resultDays, newExpiry: resultExpiry };
		} catch (e: any) {
			return fail(400, { error: e.message });
		}
	},

	submitReceipt: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { error: 'يرجى تسجيل الدخول أولاً' });
		const fd = await request.formData();
		const planDays = Number(fd.get('planDays') || 30);
		const amountDzd = PLAN_PRICES[planDays];
		if (!amountDzd) {
			return fail(400, { error: 'الباقة المختارة غير صالحة' });
		}

		const receiptFile = fd.get('receipt');
		if (!(receiptFile instanceof File)) {
			return fail(400, { error: 'يرجى إرفاق صورة وصل الدفع (PNG/JPEG/WebP)' });
		}

		try {
			const saved = await saveValidatedUpload({
				file: receiptFile,
				kind: 'receipts',
				accept: 'image',
				maxBytes: 5 * 1024 * 1024
			});

			await pgTx(async (tx) => {
				const inserted = await pgGet<{ id: number }>(
					`INSERT INTO payment_orders (user_id, provider, amount_dzd, plan_days, status, receipt_url, created_at)
					 VALUES ($1, 'ccp_receipt', $2, $3, 'pending', $4, ${PG_NOW_EXPR})
					 RETURNING id`,
					[locals.user!.id, amountDzd, planDays, saved.url],
					tx
				);

				await pgRun(
					`INSERT INTO billing_audit_logs (order_id, user_id, event_type, provider, external_id, amount_dzd, status, payload, created_at)
					 VALUES ($1, $2, 'receipt.submitted', 'ccp_receipt', $3, $4, 'pending', $5, ${PG_NOW_EXPR})`,
					[
						inserted?.id ?? null,
						locals.user!.id,
						saved.url,
						amountDzd,
						JSON.stringify({ planDays, receiptUrl: saved.url })
					],
					tx
				);
			});

			return { receiptUploaded: true };
		} catch (e: any) {
			return fail(400, { error: e.message });
		}
	}
};
