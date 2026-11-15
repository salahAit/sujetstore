import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { usersSqlite } from '#lib/server/db';

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
	const plan = PLANS[String(body.plan || 'monthly')];
	if (!plan) {
		return json({ error: 'الباقة المختارة غير صالحة' }, { status: 400 });
	}

	const secretKey = process.env.CHARGILY_SECRET_KEY;
	const mode = process.env.CHARGILY_MODE === 'live' ? 'live' : 'test';

	const info = usersSqlite
		.query(
			"INSERT INTO payment_orders (user_id, provider, amount_dzd, plan_days, status, created_at) VALUES (?, 'chargily', ?, ?, 'pending', datetime('now'))"
		)
		.run(locals.user.id, plan.amountDzd, plan.days);
	const orderId = Number(info.lastInsertRowid);

	if (!secretKey) {
		usersSqlite
			.query("UPDATE payment_orders SET status = 'canceled', metadata = 'chargily_not_configured' WHERE id = ?")
			.run(orderId);
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
		mode === 'live' ? 'https://pay.chargily.net/api/v2/checkouts' : 'https://pay.chargily.net/test/api/v2/checkouts';

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
		usersSqlite
			.query("UPDATE payment_orders SET status = 'failed', metadata = ? WHERE id = ?")
			.run(errText.slice(0, 500), orderId);
		return json({ error: 'تعذر إنشاء جلسة الدفع لدى Chargily' }, { status: 502 });
	}

	const data = (await res.json()) as { id: string; checkout_url: string };
	usersSqlite
		.query('UPDATE payment_orders SET checkout_id = ? WHERE id = ?')
		.run(data.id, orderId);

	return json({
		configured: true,
		orderId,
		checkoutUrl: data.checkout_url
	});
};
