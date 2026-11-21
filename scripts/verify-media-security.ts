import assert from 'node:assert/strict';
import type { RequestEvent } from '@sveltejs/kit';
import { contentSqlite, pgGet, pgRun, usersSql } from '#lib/server/db';
import {
	buildMediaActorKey,
	checkAndRecordMediaQuota,
	hashMediaIp,
	signMediaUrl,
	verifyMediaSignature
} from '#lib/server/media-signing';
import { parseUserAgent, recordAuditEvent, resolveGeoForIp } from '#lib/server/telemetry';

async function main() {
	console.log('=== Phase 1 Media Security & Telemetry Verification ===');

	// 1. Verify all 3,299 documents in data/content.db have unique non-empty public_token
	const stats = contentSqlite
		.query(
			`SELECT
				COUNT(*) AS total,
				COUNT(CASE WHEN public_token IS NOT NULL AND TRIM(public_token) != '' THEN 1 END) AS with_token,
				COUNT(DISTINCT public_token) AS unique_tokens
			 FROM documents`
		)
		.get() as { total: number; with_token: number; unique_tokens: number };

	console.log(
		`[1/5] Documents public_token check: total=${stats.total}, with_token=${stats.with_token}, unique=${stats.unique_tokens}`
	);
	assert.ok(stats.total >= 3299, `Expected >= 3299 documents, got ${stats.total}`);
	assert.equal(stats.with_token, stats.total, 'Some documents are missing public_token');
	assert.equal(stats.unique_tokens, stats.total, 'Duplicate public_token values found');

	// 2. Test signMediaUrl + verifyMediaSignature (valid, expired, tampered, wrong actor, wrong kind)
	const sampleDoc = contentSqlite
		.query(`SELECT id, public_token FROM documents WHERE public_token IS NOT NULL LIMIT 1`)
		.get() as { id: number; public_token: string };
	assert.ok(sampleDoc?.public_token, 'Expected at least one document with public_token');

	const actorA = buildMediaActorKey(null, '41.105.12.34');
	const actorB = buildMediaActorKey(null, '41.105.12.99');
	const actorUser = buildMediaActorKey(42, '41.105.12.34');

	assert.notEqual(actorA, actorB, 'Different IPs must yield different actor keys');
	assert.notEqual(actorA, actorUser, 'Authenticated user key must differ from guest IP key');
	assert.ok(!actorA.includes('41.105'), 'Raw IP must never appear inside actorKey');

	const signed = signMediaUrl({
		token: sampleDoc.public_token,
		kind: 'subject',
		actorKey: actorA,
		ttlSeconds: 600
	});
	const parsedSigned = new URL(signed, 'https://sujetstore.dz');
	const exp = parsedSigned.searchParams.get('exp');
	const sig = parsedSigned.searchParams.get('sig');

	assert.ok(
		parsedSigned.pathname === `/api/media/${sampleDoc.public_token}/subject`,
		`Unexpected signed URL path: ${parsedSigned.pathname}`
	);

	// Valid signature
	const validRes = verifyMediaSignature(sampleDoc.public_token, 'subject', exp, sig, actorA);
	assert.equal(validRes.valid, true, 'Expected valid signature to pass');

	// Expired signature
	const expiredUrl = signMediaUrl({
		token: sampleDoc.public_token,
		kind: 'subject',
		actorKey: actorA,
		ttlSeconds: -10
	});
	const expiredParsed = new URL(expiredUrl, 'https://sujetstore.dz');
	const expiredRes = verifyMediaSignature(
		sampleDoc.public_token,
		'subject',
		expiredParsed.searchParams.get('exp'),
		expiredParsed.searchParams.get('sig'),
		actorA
	);
	assert.equal(expiredRes.valid, false, 'Expired signature must fail');
	assert.equal(expiredRes.reason, 'expired', `Expected reason=expired, got ${expiredRes.reason}`);

	// Tampered signature
	const tamperedSig = sig ? `${sig.slice(0, -2)}AA` : 'invalid';
	const tamperedRes = verifyMediaSignature(
		sampleDoc.public_token,
		'subject',
		exp,
		tamperedSig === sig ? `${sig.slice(0, -2)}BB` : tamperedSig,
		actorA
	);
	assert.equal(tamperedRes.valid, false, 'Tampered signature must fail');

	// Wrong actor
	const wrongActorRes = verifyMediaSignature(sampleDoc.public_token, 'subject', exp, sig, actorB);
	assert.equal(wrongActorRes.valid, false, 'Signature bound to different actor must fail');

	// Wrong kind
	const wrongKindRes = verifyMediaSignature(sampleDoc.public_token, 'solution', exp, sig, actorA);
	assert.equal(wrongKindRes.valid, false, 'Signature bound to subject must fail for solution');

	console.log('[2/5] HMAC media signing & constant-time verification checks passed');

	// 3. Test parseUserAgent across all key clients & resolveGeoForIp
	const uaCases: Array<{
		label: string;
		ua: string;
		deviceType: 'desktop' | 'mobile' | 'tablet' | 'bot';
		osName: string;
		browserName: string;
	}> = [
		{
			label: 'Android Chrome',
			ua: 'Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36',
			deviceType: 'mobile',
			osName: 'Android',
			browserName: 'Chrome'
		},
		{
			label: 'Desktop Firefox',
			ua: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0',
			deviceType: 'desktop',
			osName: 'Linux',
			browserName: 'Firefox'
		},
		{
			label: 'iOS Safari',
			ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
			deviceType: 'mobile',
			osName: 'iOS',
			browserName: 'Safari'
		},
		{
			label: 'curl bot',
			ua: 'curl/8.5.0',
			deviceType: 'bot',
			osName: 'Bot',
			browserName: 'curl'
		},
		{
			label: 'SujetStoreAndroidApp',
			ua: 'SujetStoreAndroidApp/2.1.0 (Android 14; Mobile)',
			deviceType: 'mobile',
			osName: 'Android',
			browserName: 'SujetStoreAndroidApp'
		},
		{
			label: 'SujetStoreDesktopApp',
			ua: 'SujetStoreDesktopApp/1.0.0 (Windows NT 10.0; Win64; x64)',
			deviceType: 'desktop',
			osName: 'Windows',
			browserName: 'SujetStoreDesktopApp'
		}
	];

	for (const tc of uaCases) {
		const parsed = parseUserAgent(tc.ua);
		assert.deepEqual(
			parsed,
			{ deviceType: tc.deviceType, osName: tc.osName, browserName: tc.browserName },
			`UA parse mismatch for ${tc.label}: got ${JSON.stringify(parsed)}`
		);
	}

	const cfGeo = resolveGeoForIp(
		'41.105.12.34',
		new Headers({ 'cf-ipcountry': 'DZ', 'cf-ipcity': 'Algiers', 'cf-region': 'Algiers' })
	);
	assert.equal(cfGeo.countryCode, 'DZ');
	assert.equal(cfGeo.countryName, 'Algeria');
	assert.equal(cfGeo.regionCity, 'Algiers');

	const localGeo = resolveGeoForIp('127.0.0.1', new Headers());
	assert.equal(localGeo.countryName, 'Local / Server');

	console.log('[3/5] User-Agent & GeoIP parsing checks passed');

	// 4. Test recordAuditEvent fire-and-forget insert + PostgreSQL verification + cleanup
	const testResourceId = `verify-phase1-${Date.now()}`;
	const mockEvent = {
		request: new Request('https://sujetstore.dz/api/media/test/subject', {
			headers: {
				'user-agent': 'SujetStoreAndroidApp/2.1.0 (Android 14; Mobile)',
				'cf-ipcountry': 'DZ',
				'cf-ipcity': 'Oran',
				'x-forwarded-for': '41.105.55.77'
			}
		}),
		url: new URL('https://sujetstore.dz/api/media/test/subject'),
		locals: { user: null, session: null },
		getClientAddress: () => '41.105.55.77'
	} as unknown as RequestEvent;

	recordAuditEvent({
		event: mockEvent,
		eventType: 'pdf_view',
		statusCode: 200,
		resourceId: testResourceId
	});

	// Poll briefly (max 2s) for async fire-and-forget PG write
	let auditRow: {
		id: number;
		event_type: string;
		country_code: string;
		region_city: string;
		device_type: string;
		os_name: string;
		browser_name: string;
	} | null = null;

	for (let i = 0; i < 20; i++) {
		auditRow = await pgGet(
			`SELECT id, event_type, country_code, region_city, device_type, os_name, browser_name
			 FROM activity_audit_logs
			 WHERE resource_id = $1
			 LIMIT 1`,
			[testResourceId]
		);
		if (auditRow) break;
		await Bun.sleep(100);
	}

	assert.ok(auditRow, 'Expected recordAuditEvent row to be inserted into activity_audit_logs');
	assert.equal(auditRow.event_type, 'pdf_view');
	assert.equal(auditRow.country_code, 'DZ');
	assert.equal(auditRow.region_city, 'Oran');
	assert.equal(auditRow.device_type, 'mobile');
	assert.equal(auditRow.os_name, 'Android');
	assert.equal(auditRow.browser_name, 'SujetStoreAndroidApp');

	await pgRun(`DELETE FROM activity_audit_logs WHERE id = $1`, [auditRow.id]);
	console.log('[4/5] PostgreSQL activity_audit_logs insert & cleanup passed');

	// 5. Test checkAndRecordMediaQuota + cleanup
	const testGuestIp = `198.51.100.${Math.floor(Math.random() * 200) + 1}`;
	const testIpHash = hashMediaIp(testGuestIp);
	const quota = await checkAndRecordMediaQuota({
		userId: null,
		isPremium: false,
		isStaff: false,
		ip: testGuestIp,
		documentId: sampleDoc.id,
		kind: 'subject'
	});
	assert.equal(quota.allowed, true, 'First guest download should be allowed');
	assert.equal(quota.limit, 25);
	assert.equal(quota.remaining, 24);

	await pgRun(`DELETE FROM media_download_logs WHERE ip_hash = $1 AND document_id = $2`, [
		testIpHash,
		sampleDoc.id
	]);
	console.log('[5/5] PostgreSQL media_download_logs quota check & cleanup passed');

	console.log('ALL PHASE 1 VERIFICATION CHECKS PASSED!');
}

main()
	.catch((err) => {
		console.error('VERIFICATION FAILED:', err);
		process.exitCode = 1;
	})
	.finally(async () => {
		try {
			await usersSql.close();
		} catch {
			// ignore
		}
	});
