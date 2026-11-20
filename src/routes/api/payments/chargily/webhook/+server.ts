import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { pgGet, pgRun, pgTx } from '#lib/server/db';
import crypto from 'crypto';

const PG_NOW_EXPR = "to_char(NOW() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS')";

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

	const eventType = String(payload?.type || 'webhook.unknown');
	const checkoutId = payload?.data?.id ? String(payload.data.id) : null;

	if (eventType === 'checkout.paid' && checkoutId) {
		await pgTx(async (tx) => {
			// Acquire row-level lock for strict payment idempotency under concurrent webhooks
			const order = await pgGet<any>(
				'SELECT * FROM payment_orders WHERE checkout_id = $1 FOR UPDATE',
				[checkoutId],
				tx
			);

			if (!order) {
				await pgRun(
					`INSERT INTO billing_audit_logs (order_id, user_id, event_type, provider, external_id, amount_dzd, status, payload, created_at)
					 VALUES (NULL, NULL, 'webhook.unmatched_order', 'chargily', $1, $2, 'ignored', $3, ${PG_NOW_EXPR})`,
					[checkoutId, Number(payload?.data?.amount || 0), rawBody.slice(0, 4000)],
					tx
				);
				return;
			}

			if (order.status === 'paid') {
				await pgRun(
					`INSERT INTO billing_audit_logs (order_id, user_id, event_type, provider, external_id, amount_dzd, status, payload, created_at)
					 VALUES ($1, $2, 'webhook.duplicate_ignored', 'chargily', $3, $4, 'paid', $5, ${PG_NOW_EXPR})`,
					[order.id, order.user_id, checkoutId, Number(order.amount_dzd || 0), rawBody.slice(0, 4000)],
					tx
				);
				return;
			}

			await pgRun(
				`UPDATE payment_orders SET status = 'paid', updated_at = ${PG_NOW_EXPR} WHERE id = $1`,
				[order.id],
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
				 VALUES ($1, $2, 'checkout.paid', 'chargily', $3, $4, 'paid', $5, ${PG_NOW_EXPR})`,
				[
					order.id,
					order.user_id,
					checkoutId,
					Number(order.amount_dzd || 0),
					JSON.stringify({ nextExpiry, planDays: order.plan_days, webhook: payload })
				],
				tx
			);
		});
	} else {
		// Log non-paid webhook events (e.g. checkout.failed, checkout.expired, checkout.canceled)
		await pgTx(async (tx) => {
			const order = checkoutId
				? await pgGet<any>(
						'SELECT * FROM payment_orders WHERE checkout_id = $1 FOR UPDATE',
						[checkoutId],
						tx
					)
				: null;

			if (order && order.status === 'pending') {
				if (eventType === 'checkout.failed' || eventType === 'checkout.expired') {
					await pgRun(
						`UPDATE payment_orders SET status = 'failed', updated_at = ${PG_NOW_EXPR} WHERE id = $1`,
						[order.id],
						tx
					);
				} else if (eventType === 'checkout.canceled') {
					await pgRun(
						`UPDATE payment_orders SET status = 'canceled', updated_at = ${PG_NOW_EXPR} WHERE id = $1`,
						[order.id],
						tx
					);
				}
			}

			await pgRun(
				`INSERT INTO billing_audit_logs (order_id, user_id, event_type, provider, external_id, amount_dzd, status, payload, created_at)
				 VALUES ($1, $2, $3, 'chargily', $4, $5, $6, $7, ${PG_NOW_EXPR})`,
				[
					order?.id ?? null,
					order?.user_id ?? null,
					eventType,
					checkoutId,
					Number(order?.amount_dzd ?? payload?.data?.amount ?? 0),
					String(payload?.data?.status || eventType),
					rawBody.slice(0, 4000)
				],
				tx
			);
		});
	}

	return json({ received: true });
};
