import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { pgGet, pgRun } from '#lib/server/db';

const PG_NOW_EXPR = "to_char(NOW() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS')";

const PLANS: Record<string, { days: number; amountDzd: number; label: string }> = {
	monthly: { days: 30, amountDzd: 500, label: 'اشتراك SujetStore Pro — شهر واحد' },
	quarterly: { days: 90, amountDzd: 1200, label: 'اشتراك SujetStore Pro — 3 أشهر' },
	annual: { days: 365, amountDzd: 3500, label: 'اشتراك SujetStore Pro — سنة كاملة' }
};

export const POST: RequestHandler = async ({ locals, request, url }) => {
	if (!locals.user) {
		return json({ error: 'يرجى تسجيل الدخول للمتابعة' }, { status: 401 });
	}

	const body = await request.json();
	const planKey = String(body.plan || 'monthly');
	const plan = PLANS[planKey];
	if (!plan) {
		return json({ error: 'الباقة المختارة غير صالحة' }, { status: 400 });
	}

	const secretKey = process.env.CHARGILY_SECRET_KEY;
	const mode = process.env.CHARGILY_MODE === 'live' ? 'live' : 'test';

	const inserted = await pgGet<{ id: number }>(
		`INSERT INTO payment_orders (user_id, provider, amount_dzd, plan_days, status, created_at)
		 VALUES ($1, 'chargily', $2, $3, 'pending', ${PG_NOW_EXPR})
		 RETURNING id`,
		[locals.user.id, plan.amountDzd, plan.days]
	);
	const orderId = Number(inserted?.id);

	if (!secretKey) {
		await pgRun(
			`UPDATE payment_orders SET status = 'canceled', metadata = 'chargily_not_configured', updated_at = ${PG_NOW_EXPR} WHERE id = $1`,
			[orderId]
		);
		await pgRun(
			`INSERT INTO billing_audit_logs (order_id, user_id, event_type, provider, external_id, amount_dzd, status, payload, created_at)
			 VALUES ($1, $2, 'checkout.canceled', 'chargily', NULL, $3, 'canceled', $4, ${PG_NOW_EXPR})`,
			[
				orderId,
				locals.user.id,
				plan.amountDzd,
				JSON.stringify({ reason: 'chargily_not_configured', plan: planKey, planDays: plan.days })
			]
		);
		return json(
			{
				configured: false,
				error:
					'بوابة الدفع الإلكتروني Chargily غير مفعّلة حالياً في إعدادات الخادم. يمكنك التفعيل الفوري عبر كود القسيمة أو رفع وصل بريدي موب / CCP.'
			},
			{ status: 503 }
		);
	}

	const apiBase =
		mode === 'live'
			? 'https://pay.chargily.net/api/v2/checkouts'
			: 'https://pay.chargily.net/test/api/v2/checkouts';

	const origin = url.origin;
	const res = await fetch(apiBase, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${secretKey}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			amount: plan.amountDzd,
			currency: 'dzd',
			description: plan.label,
			success_url: `${origin}/student/activate?status=success`,
			failure_url: `${origin}/student/activate?status=failed`,
			webhook_endpoint: `${origin}/api/payments/chargily/webhook`,
			metadata: {
				orderId: String(orderId),
				userId: String(locals.user.id),
				planDays: String(plan.days)
			}
		})
	});

	if (!res.ok) {
		const errText = await res.text();
		await pgRun(
			`UPDATE payment_orders SET status = 'failed', metadata = $1, updated_at = ${PG_NOW_EXPR} WHERE id = $2`,
			[errText.slice(0, 500), orderId]
		);
		await pgRun(
			`INSERT INTO billing_audit_logs (order_id, user_id, event_type, provider, external_id, amount_dzd, status, payload, created_at)
			 VALUES ($1, $2, 'checkout.failed', 'chargily', NULL, $3, 'failed', $4, ${PG_NOW_EXPR})`,
			[
				orderId,
				locals.user.id,
				plan.amountDzd,
				JSON.stringify({ httpStatus: res.status, error: errText.slice(0, 500), mode, plan: planKey })
			]
		);
		return json({ error: 'تعذر إنشاء جلسة الدفع لدى Chargily' }, { status: 502 });
	}

	const data = (await res.json()) as { id: string; checkout_url: string };
	await pgRun(
		`UPDATE payment_orders SET checkout_id = $1, updated_at = ${PG_NOW_EXPR} WHERE id = $2`,
		[data.id, orderId]
	);
	await pgRun(
		`INSERT INTO billing_audit_logs (order_id, user_id, event_type, provider, external_id, amount_dzd, status, payload, created_at)
		 VALUES ($1, $2, 'checkout.created', 'chargily', $3, $4, 'pending', $5, ${PG_NOW_EXPR})`,
		[
			orderId,
			locals.user.id,
			data.id,
			plan.amountDzd,
			JSON.stringify({ mode, plan: planKey, planDays: plan.days, checkoutUrl: data.checkout_url })
		]
	);

	return json({
		configured: true,
		orderId,
		checkoutUrl: data.checkout_url
	});
};
