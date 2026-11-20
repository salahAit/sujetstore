import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { pgAll, pgGet, pgRun, pgTx } from '#lib/server/db';
import { randomBytes } from 'crypto';

const PG_NOW_EXPR = "to_char(NOW() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS')";

export const load: PageServerLoad = async () => {
	const [vouchers, orders] = await Promise.all([
		pgAll(
			`
			SELECT v.*, u.name as creator_name
			FROM voucher_codes v
			LEFT JOIN users u ON v.created_by = u.id
			ORDER BY v.id DESC
			LIMIT 100
		`
		),
		pgAll(
			`
			SELECT p.*, u.name as user_name, u.email as user_email
			FROM payment_orders p
			JOIN users u ON p.user_id = u.id
			ORDER BY p.id DESC
			LIMIT 50
		`
		)
	]);

	return {
		vouchers,
		orders
	};
};

export const actions: Actions = {
	generateBatch: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { error: 'غير مصرح' });
		const fd = await request.formData();
		const prefixRaw = ((fd.get('prefix') as string | null) || 'SUJET-')
			.trim()
			.toUpperCase()
			.replace(/[^A-Z0-9-]/g, '');
		const prefix = prefixRaw.endsWith('-') || prefixRaw === '' ? prefixRaw : `${prefixRaw}-`;
		const quantity = Math.min(50, Math.max(1, Number(fd.get('quantity') || 1)));
		const planDays = Math.min(730, Math.max(1, Number(fd.get('planDays') || 30)));
		const maxUses = Math.min(1000, Math.max(1, Number(fd.get('maxUses') || 1)));
		const expiresAtRaw = ((fd.get('expiresAt') as string | null) || '').trim();
		const expiresAt = expiresAtRaw ? new Date(expiresAtRaw).toISOString() : null;

		const createdCodes: string[] = [];
		await pgTx(async (tx) => {
			for (let i = 0; i < quantity; i++) {
				const token = randomBytes(4).toString('hex').toUpperCase();
				const code = `${prefix}${token}`;
				await pgRun(
					`INSERT INTO voucher_codes (code, plan_days, max_uses, used_count, is_active, created_by, expires_at)
					 VALUES ($1, $2, $3, 0, TRUE, $4, $5)`,
					[code, planDays, maxUses, locals.user!.id, expiresAt],
					tx
				);
				createdCodes.push(code);
			}
		});

		return { generated: createdCodes };
	},

	toggleActive: async ({ request }) => {
		const fd = await request.formData();
		const id = Number(fd.get('id'));
		if (!id) return fail(400, { error: 'معرف القسيمة مفقود' });

		await pgRun('UPDATE voucher_codes SET is_active = NOT is_active WHERE id = $1', [id]);
		return { success: true };
	},

	delete: async ({ request, locals }) => {
		if (locals.user?.role === 'editor') {
			return fail(403, { error: 'المحرّر لا يملك صلاحية حذف القسائم' });
		}
		const fd = await request.formData();
		const id = Number(fd.get('id'));
		if (!id) return fail(400, { error: 'معرف القسيمة مفقود' });
		await pgRun('DELETE FROM voucher_codes WHERE id = $1', [id]);
		return { success: true };
	},

	approveOrder: async ({ request, locals }) => {
		const fd = await request.formData();
		const orderId = Number(fd.get('orderId'));
		if (!orderId) return fail(400, { error: 'معرف الطلب مفقود' });

		try {
			await pgTx(async (tx) => {
				const order = await pgGet<any>(
					'SELECT * FROM payment_orders WHERE id = $1 FOR UPDATE',
					[orderId],
					tx
				);
				if (!order) throw new Error('الطلب غير موجود');
				if (order.status === 'paid') return;

				await pgRun(
					`UPDATE payment_orders SET status = 'paid', updated_at = ${PG_NOW_EXPR} WHERE id = $1`,
					[orderId],
					tx
				);

				const user = await pgGet<{ subscription_expires_at: string | null }>(
					'SELECT subscription_expires_at FROM users WHERE id = $1 FOR UPDATE',
					[order.user_id],
					tx
				);

				const curExp = user?.subscription_expires_at ? Date.parse(user.subscription_expires_at) : 0;
				const baseMs = Number.isFinite(curExp) && curExp > Date.now() ? curExp : Date.now();
				const nextExpiry = new Date(baseMs + Number(order.plan_days || 30) * 86400_000).toISOString();

				await pgRun(
					`UPDATE users
					 SET subscription_tier = 'premium', subscription_expires_at = $1, updated_at = ${PG_NOW_EXPR}
					 WHERE id = $2`,
					[nextExpiry, order.user_id],
					tx
				);

				await pgRun(
					`INSERT INTO billing_audit_logs (order_id, user_id, event_type, provider, external_id, amount_dzd, status, payload, created_at)
					 VALUES ($1, $2, 'order.approved', $3, $4, $5, 'paid', $6, ${PG_NOW_EXPR})`,
					[
						order.id,
						order.user_id,
						order.provider,
						order.checkout_id ?? order.receipt_url ?? null,
						Number(order.amount_dzd || 0),
						JSON.stringify({
							approvedBy: locals.user?.id ?? null,
							planDays: order.plan_days,
							nextExpiry
						})
					],
					tx
				);
			});

			return { orderApproved: true };
		} catch (e: any) {
			return fail(400, { error: e.message });
		}
	},

	rejectOrder: async ({ request, locals }) => {
		const fd = await request.formData();
		const orderId = Number(fd.get('orderId'));
		if (!orderId) return fail(400, { error: 'معرف الطلب مفقود' });

		await pgTx(async (tx) => {
			const order = await pgGet<any>(
				'SELECT * FROM payment_orders WHERE id = $1 FOR UPDATE',
				[orderId],
				tx
			);
			if (!order) return;

			await pgRun(
				`UPDATE payment_orders SET status = 'failed', updated_at = ${PG_NOW_EXPR} WHERE id = $1`,
				[orderId],
				tx
			);

			await pgRun(
				`INSERT INTO billing_audit_logs (order_id, user_id, event_type, provider, external_id, amount_dzd, status, payload, created_at)
				 VALUES ($1, $2, 'order.rejected', $3, $4, $5, 'failed', $6, ${PG_NOW_EXPR})`,
				[
					order.id,
					order.user_id,
					order.provider,
					order.checkout_id ?? order.receipt_url ?? null,
					Number(order.amount_dzd || 0),
					JSON.stringify({ rejectedBy: locals.user?.id ?? null })
				],
				tx
			);
		});

		return { orderRejected: true };
	}
};
