import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { usersSqlite } from '#lib/server/db';
import { saveValidatedUpload } from '#lib/server/uploads';

const PLAN_PRICES: Record<number, number> = {
	30: 500,
	90: 1200,
	365: 3500
};

export const load: PageServerLoad = async ({ parent, url }) => {
	const { studentUser } = await parent();
	const orders = usersSqlite
		.query('SELECT * FROM payment_orders WHERE user_id = ? ORDER BY id DESC LIMIT 20')
		.all(studentUser.id);

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

		const tx = usersSqlite.transaction(() => {
			const voucher = usersSqlite
				.query('SELECT * FROM voucher_codes WHERE UPPER(code) = ? LIMIT 1')
				.get(code) as any;

			if (!voucher) throw new Error('كود القسيمة غير موجود أو غير صحيح');
			if (!voucher.is_active) throw new Error('هذا الكود موقوف حالياً');
			if (Number(voucher.used_count) >= Number(voucher.max_uses)) {
				throw new Error('تم استنفاد عدد مرات استخدام هذا الكود');
			}
			if (voucher.expires_at && Date.parse(voucher.expires_at) <= Date.now()) {
				throw new Error('انتهت صلاحية هذا الكود');
			}

			const alreadyUsed = usersSqlite
				.query('SELECT id FROM voucher_redemptions WHERE voucher_id = ? AND user_id = ? LIMIT 1')
				.get(voucher.id, locals.user!.id);
			if (alreadyUsed) {
				throw new Error('لقد قمت بتفعيل هذا الكود على حسابك من قبل');
			}

			usersSqlite
				.query('UPDATE voucher_codes SET used_count = used_count + 1 WHERE id = ?')
				.run(voucher.id);
			usersSqlite
				.query("INSERT INTO voucher_redemptions (voucher_id, user_id, redeemed_at) VALUES (?, ?, datetime('now'))")
				.run(voucher.id, locals.user!.id);

			const userRow = usersSqlite
				.query('SELECT subscription_expires_at FROM users WHERE id = ?')
				.get(locals.user!.id) as { subscription_expires_at: string | null } | null;

			const curExp = userRow?.subscription_expires_at ? Date.parse(userRow.subscription_expires_at) : 0;
			const baseMs = Number.isFinite(curExp) && curExp > Date.now() ? curExp : Date.now();
			resultDays = Number(voucher.plan_days || 30);
			resultExpiry = new Date(baseMs + resultDays * 86400_000).toISOString();

			usersSqlite
				.query(
					"UPDATE users SET subscription_tier = 'premium', subscription_expires_at = ?, updated_at = datetime('now') WHERE id = ?"
				)
				.run(resultExpiry, locals.user!.id);
		});

		try {
			tx();
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

			usersSqlite
				.query(
					"INSERT INTO payment_orders (user_id, provider, amount_dzd, plan_days, status, receipt_url, created_at) VALUES (?, 'ccp_receipt', ?, ?, 'pending', ?, datetime('now'))"
				)
				.run(locals.user.id, amountDzd, planDays, saved.url);

			return { receiptUploaded: true };
		} catch (e: any) {
			return fail(400, { error: e.message });
		}
	}
};
