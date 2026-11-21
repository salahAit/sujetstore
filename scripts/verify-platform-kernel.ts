import {
	ALL_PLATFORM_MODULES,
	PlatformModuleRegistry,
	platformEvents,
	platformRegistry,
	invalidatePlatformModuleCache,
	type PlatformModuleManifest
} from '#lib/platform';
import { pgAll } from '#lib/server/db';

function assert(condition: unknown, message: string): asserts condition {
	if (!condition) {
		throw new Error(`ASSERTION FAILED: ${message}`);
	}
}

async function assertRejects(fn: () => Promise<unknown>, label: string): Promise<string> {
	try {
		await fn();
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		console.log(`  [PASS] ${label} -> rejected cleanly: "${msg}"`);
		return msg;
	}
	throw new Error(`ASSERTION FAILED: Expected rejection for: ${label}`);
}

function makeDummyManifest(
	id: string,
	hardDependencies: string[] = []
): PlatformModuleManifest {
	return {
		id,
		version: '1.0.0',
		tier: 'optional',
		category: 'tools',
		nameAr: id,
		descriptionAr: `Test module ${id}`,
		icon: 'Box',
		routePrefixes: [`/${id}`],
		hardDependencies,
		softDependencies: []
	};
}

async function run() {
	console.log('=== SujetStore Platform Feature Module Kernel Verification ===\n');

	// 1. Validate registered count & DFS dependency validation
	console.log('1) Validating 11 platform module manifests & DFS cycle detector...');
	assert(
		ALL_PLATFORM_MODULES.length === 11,
		`Expected 11 modules, got ${ALL_PLATFORM_MODULES.length}`
	);
	platformRegistry.validateDependencies();
	console.log('  [PASS] Production registry (11 modules) has valid acyclic dependencies.');

	// Test missing hardDependency detection
	const missingDepRegistry = new PlatformModuleRegistry({ useGlobalCache: false });
	missingDepRegistry.register(makeDummyManifest('orphan-mod', ['non-existent-core']));
	let missingCaught = false;
	try {
		missingDepRegistry.validateDependencies();
	} catch (err) {
		missingCaught = true;
		console.log(
			`  [PASS] Missing hardDependency caught: "${err instanceof Error ? err.message : err}"`
		);
	}
	assert(missingCaught, 'Missing hard dependency should throw');

	// Test DFS cyclic hardDependency detection
	const cyclicRegistry = new PlatformModuleRegistry({ useGlobalCache: false });
	cyclicRegistry.register(makeDummyManifest('mod-a', ['mod-b']));
	cyclicRegistry.register(makeDummyManifest('mod-b', ['mod-c']));
	cyclicRegistry.register(makeDummyManifest('mod-c', ['mod-a']));
	let cycleCaught = false;
	try {
		cyclicRegistry.validateDependencies();
	} catch (err) {
		cycleCaught = true;
		console.log(
			`  [PASS] Cyclic hardDependency caught via DFS: "${err instanceof Error ? err.message : err}"`
		);
	}
	assert(cycleCaught, 'Cyclic hard dependency should throw');

	// 2. Sync with PostgreSQL platform_modules
	console.log('\n2) Syncing manifests with PostgreSQL platform_modules...');
	await platformRegistry.syncWithDatabase();
	const rows = await pgAll<{ module_id: string; enabled: boolean }>(
		'SELECT module_id, enabled FROM platform_modules ORDER BY module_id'
	);
	assert(rows.length >= 11, `Expected >= 11 rows in platform_modules, got ${rows.length}`);
	console.log(`  [PASS] Synced ${rows.length} modules into PostgreSQL platform_modules.`);

	// 3. Reject disabling core module (`curriculum-core`)
	console.log('\n3) Verifying core & hard-dependency protection...');
	await assertRejects(
		() => platformRegistry.setModuleEnabled('curriculum-core', false),
		"Disabling core module 'curriculum-core'"
	);

	// Reject disabling `quiz-engine` while active dependents (`video-studio`, `smart-generator`, `remediation`) are enabled
	await assertRejects(
		() => platformRegistry.setModuleEnabled('quiz-engine', false),
		"Disabling 'quiz-engine' with enabled hard dependents"
	);

	// 4. Disable and re-enable optional module (`simulator`) and test route guarding
	console.log('\n4) Testing disable -> re-enable lifecycle on optional module (simulator)...');
	const initialSimEnabled = await platformRegistry.isModuleEnabled('simulator');
	try {
		await platformRegistry.setModuleEnabled('simulator', false);
		assert(
			(await platformRegistry.isModuleEnabled('simulator')) === false,
			'simulator should be disabled'
		);
		assert(
			(await platformRegistry.isRouteEnabled('/simulator')) === false,
			"isRouteEnabled('/simulator') should be false while simulator is disabled"
		);
		assert(
			(await platformRegistry.isRouteEnabled('/simulator/bac')) === false,
			"isRouteEnabled('/simulator/bac') should be false while simulator is disabled"
		);
		assert(
			(await platformRegistry.isRouteEnabled('/admin/modules')) === true,
			"isRouteEnabled('/admin/modules') must always remain true"
		);
		console.log("  [PASS] Disabled 'simulator': isRouteEnabled('/simulator') === false");

		await platformRegistry.setModuleEnabled('simulator', true);
		invalidatePlatformModuleCache();
		assert(
			(await platformRegistry.isModuleEnabled('simulator')) === true,
			'simulator should be re-enabled'
		);
		assert(
			(await platformRegistry.isRouteEnabled('/simulator')) === true,
			"isRouteEnabled('/simulator') should flip back to true"
		);
		console.log("  [PASS] Re-enabled 'simulator': isRouteEnabled('/simulator') === true");
	} finally {
		if ((await platformRegistry.isModuleEnabled('simulator')) !== initialSimEnabled) {
			await platformRegistry.setModuleEnabled('simulator', initialSimEnabled);
		}
	}

	// 5. Verify navigation helpers
	console.log('\n5) Checking navigation aggregation...');
	const adminNav = await platformRegistry.getEnabledAdminNav('superadmin');
	const editorNav = await platformRegistry.getEnabledAdminNav('editor');
	const studentNav = await platformRegistry.getEnabledStudentNav();
	assert(
		adminNav.some((n) => n.href === '/admin/videos'),
		'Admin nav should include /admin/videos when video-studio is enabled'
	);
	assert(
		adminNav.some((n) => n.href === '/admin/users') &&
			!editorNav.some((n) => n.href === '/admin/users'),
		'Role-restricted nav (/admin/users) should appear for superadmin only'
	);
	assert(
		studentNav.some((n) => n.href === '/simulator'),
		'Student nav should include /simulator when simulator is enabled'
	);
	console.log(
		`  [PASS] Admin nav (${adminNav.length} items for superadmin, ${editorNav.length} for editor), Student nav (${studentNav.length} items).`
	);

	// 6. Verify PlatformEventBus isolated subscriber error handling & `video.cue_answered`
	console.log('\n6) Verifying PlatformEventBus emit & subscriber error isolation...');
	let goodSubscriberReceived = false;
	const unsubBad = platformEvents.on(
		'video.cue_answered',
		async () => {
			throw new Error('Simulated optional module failure');
		},
		'test.failing-subscriber'
	);
	const unsubGood = platformEvents.on(
		'video.cue_answered',
		async (payload) => {
			if (payload.videoId === 42 && payload.cueId === 7 && payload.isCorrect) {
				goodSubscriberReceived = true;
			}
		},
		'test.healthy-subscriber'
	);

	try {
		const summary = await platformEvents.emit('video.cue_answered', {
			userId: 1,
			videoId: 42,
			cueId: 7,
			questionId: 101,
			isCorrect: true,
			xpEarned: 5
		});
		assert(goodSubscriberReceived, 'Healthy subscriber must receive video.cue_answered');
		assert(summary.failed === 1, `Expected 1 isolated failure, got ${summary.failed}`);
		assert(summary.delivered >= 1, `Expected >= 1 delivered listener, got ${summary.delivered}`);
		console.log(
			`  [PASS] Event 'video.cue_answered' delivered=${summary.delivered}, isolatedFailed=${summary.failed}.`
		);
	} finally {
		unsubBad();
		unsubGood();
	}

	console.log('\nALL PLATFORM KERNEL CHECKS PASSED!');
	process.exit(0);
}

run().catch((err) => {
	console.error('\nVERIFICATION FAILED:', err);
	process.exit(1);
});
