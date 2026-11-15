import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { usersSqlite } from '#lib/server/db';
import { randomBytes } from 'crypto';

export const load: PageServerLoad = async () => {
	const vouchers = usersSqlite
		.query(
			`
		SELECT v.*, u.name as creator_name
		FROM voucher_codes v
		LEFT JOIN users u ON v.created_by = u.id
		ORDER BY v.id DESC
		LIMIT 100
	`
		)
		.all();

	const orders = usersSqlite
		.query(
			`
		SELECT p.*, u.name as user_name, u.email as user_email
		FROM payment_orders p
		JOIN users u ON p.user_id = u.id
		ORDER BY p.id DESC
		LIMIT 50
	`
		)
		.all();

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
		const tx = usersSqlite.transaction(() => {
			const stmt = usersSqlite.query(
				'INSERT INTO voucher_codes (code, plan_days, max_uses, used_count, is_active, created_by, expires_at) VALUES (?, ?, ?, 0, 1, ?, ?)'
			);
			for (let i = 0; i < quantity; i++) {
				const token = randomBytes(4).toString('hex').toUpperCase();
				const code = `${prefix}${token}`;
				stmt.run(code, planDays, maxUses, locals.user!.id, expiresAt);
				createdCodes.push(code);
			}
		});
		tx();

		return { generated: createdCodes };
	},

	toggleActive: async ({ request }) => {
		const fd = await request.formData();
		const id = Number(fd.get('id'));
		if (!id) return fail(400, { error: 'معرف القسيمة مفقود' });

		usersSqlite
			.query('UPDATE voucher_codes SET is_active = CASE WHEN is_active = 1 THEN 0 ELSE 1 END WHERE id = ?')
			.run(id);
		return { success: true };
	},

	delete: async ({ request, locals }) => {
		if (locals.user?.role === 'editor') {
			return fail(403, { error: 'المحرّر لا يملك صلاحية حذف القسائم' });
		}
		const fd = await request.formData();
		const id = Number(fd.get('id'));
		if (!id) return fail(400, { error: 'معرف القسيمة مفقود' });
		usersSqlite.query('DELETE FROM voucher_codes WHERE id = ?').run(id);
		return { success: true };
	},

	approveOrder: async ({ request }) => {
		const fd = await request.formData();
		const orderId = Number(fd.get('orderId'));
		if (!orderId) return fail(400, { error: 'معرف الطلب مفقود' });

		const tx = usersSqlite.transaction(() => {
			const order = usersSqlite
				.query('SELECT * FROM payment_orders WHERE id = ? LIMIT 1')
				.get(orderId) as any;
			if (!order) throw new Error('الطلب غير موجود');
			if (order.status === 'paid') return;

			usersSqlite
				.query("UPDATE payment_orders SET status = 'paid', updated_at = datetime('now') WHERE id = ?")
				.run(orderId);

			const user = usersSqlite
				.query('SELECT subscription_expires_at FROM users WHERE id = ?')
				.get(order.user_id) as { subscription_expires_at: string | null } | null;

			const curExp = user?.subscription_expires_at ? Date.parse(user.subscription_expires_at) : 0;
			const baseMs = Number.isFinite(curExp) && curExp > Date.now() ? curExp : Date.now();
			const nextExpiry = new Date(baseMs + Number(order.plan_days || 30) * 86400_000).toISOString();

			usersSqlite
				.query(
					"UPDATE users SET subscription_tier = 'premium', subscription_expires_at = ?, updated_at = datetime('now') WHERE id = ?"
				)
				.run(nextExpiry, order.user_id);
		});

		try {
			tx();
			return { orderApproved: true };
		} catch (e: any) {
			return fail(400, { error: e.message });
		}
	},

	rejectOrder: async ({ request }) => {
		const fd = await request.formData();
		const orderId = Number(fd.get('orderId'));
		if (!orderId) return fail(400, { error: 'معرف الطلب مفقود' });
		usersSqlite
			.query("UPDATE payment_orders SET status = 'failed', updated_at = datetime('now') WHERE id = ?")
			.run(orderId);
		return { orderRejected: true };
	}
};
