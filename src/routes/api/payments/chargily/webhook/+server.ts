import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { usersSqlite } from '#lib/server/db';
import crypto from 'crypto';

export const POST: RequestHandler = async ({ request }) => {
	const secretKey = process.env.CHARGILY_SECRET_KEY;
	if (!secretKey) {
		return json({ error: 'Chargily is not configured' }, { status: 503 });
	}

	const signature = request.headers.get('signature') || '';
	const rawBody = await request.text();

	const expectedHmac = crypto.createHmac('sha256', secretKey).update(rawBody).digest('hex');
	const sigBuf = Buffer.from(signature, 'utf8');
	const expBuf = Buffer.from(expectedHmac, 'utf8');

	if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
		return json({ error: 'Invalid webhook signature' }, { status: 403 });
	}

	let payload: any;
	try {
		payload = JSON.parse(rawBody);
	} catch {
		return json({ error: 'Invalid JSON' }, { status: 400 });
	}

	if (payload?.type === 'checkout.paid' && payload?.data?.id) {
		const checkoutId = String(payload.data.id);
		const tx = usersSqlite.transaction(() => {
			const order = usersSqlite
				.query('SELECT * FROM payment_orders WHERE checkout_id = ? LIMIT 1')
				.get(checkoutId) as any;
			if (!order || order.status === 'paid') return;

			usersSqlite
				.query("UPDATE payment_orders SET status = 'paid', updated_at = datetime('now') WHERE id = ?")
				.run(order.id);

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
		tx();
	}

	return json({ received: true });
};
