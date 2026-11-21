import { randomBytes } from 'node:crypto';
import { pgTx, usersSql } from '../src/lib/server/db/users-pg';
import { hashPassword } from '../src/lib/server/auth';

/**
 * Phase 0 Urgent Cleanup & Admin Recovery Script:
 * 1. Deletes all legacy/test accounts (preserving ONLY admin@sujetstore.com).
 * 2. Resets admin@sujetstore.com password with Argon2id and terminates all old sessions.
 * 3. Enables Site Lock in 'relaunch' mode (blocks all public PDFs/APIs/pages with HTTP 503
 *    while allowing full superadmin preview after login at /admin/login).
 */
async function main() {
	const rawPw =
		process.env.ADMIN_NEW_PASSWORD?.trim() ||
		`Sj!${randomBytes(12).toString('base64url')}9#`;
	const passwordHash = await hashPassword(rawPw);

	const result = await pgTx(async (tx) => {
		const [admin] = await tx`
			SELECT id, email, username, role FROM users
			WHERE LOWER(email) = 'admin@sujetstore.com'
			LIMIT 1
		`;
		if (!admin) {
			throw new Error('Superadmin account admin@sujetstore.com not found!');
		}

		// Clear self-referencing teacher_id & FK tables that have NO ACTION constraints before deleting users
		await tx`UPDATE users SET teacher_id = NULL WHERE id != ${admin.id}`;
		await tx`DELETE FROM student_grades WHERE student_id != ${admin.id} OR graded_by != ${admin.id}`;
		await tx`DELETE FROM transcript_edits WHERE edited_by != ${admin.id}`;
		await tx`DELETE FROM voucher_redemptions WHERE user_id != ${admin.id}`;
		await tx`DELETE FROM payment_orders WHERE user_id != ${admin.id}`;
		await tx`DELETE FROM user_mistakes WHERE user_id != ${admin.id}`;
		await tx`DELETE FROM user_bookmarks WHERE user_id != ${admin.id}`;
		await tx`DELETE FROM user_badges WHERE user_id != ${admin.id}`;
		await tx`DELETE FROM user_points WHERE user_id != ${admin.id}`;
		await tx`DELETE FROM quiz_attempts WHERE user_id != ${admin.id}`;
		await tx`DELETE FROM sessions`;

		const deletedUsers = await tx`
			DELETE FROM users WHERE id != ${admin.id} RETURNING id, email
		`;

		await tx`
			UPDATE users
			SET password_hash = ${passwordHash},
			    is_active = TRUE,
			    role = 'superadmin',
			    updated_at = to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS')
			WHERE id = ${admin.id}
		`;

		// Enable immediate Site Lock ('relaunch') to protect all PDFs and content from scrapers
		const lockPayload = JSON.stringify({
			mode: 'relaunch',
			titleAr: 'المنصة في تحديث شامل — سنعود قريباً بحلّة جديدة',
			titleFr: 'Mise à jour majeure en cours — Retour très bientôt',
			titleEn: 'Major Upgrade in Progress — Coming Back Soon',
			messageAr:
				'نعمل حالياً على ترقية البنية التقنية لمنصة SujetStore وتأمين المحتوى وإضافة مزايا ذكية جديدة لخدمة التلاميذ والأساتذة بأعلى جودة.',
			messageFr:
				'Nous améliorons actuellement la plateforme SujetStore avec de nouvelles fonctionnalités interactives, une sécurité renforcée et des performances accrues.',
			messageEn:
				'We are currently upgrading SujetStore with enhanced security, faster performance, and brand new interactive learning tools.',
			launchDate: '',
			apkDownloadUrl: ''
		});

		await tx`
			INSERT INTO platform_settings (key, value, updated_at)
			VALUES ('site_lock_config', ${lockPayload}, to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS'))
			ON CONFLICT (key) DO UPDATE
			SET value = EXCLUDED.value,
			    updated_at = EXCLUDED.updated_at
		`;

		const [remaining] = await tx`SELECT COUNT(*)::int AS c FROM users`;
		return {
			adminId: admin.id,
			adminEmail: admin.email,
			deletedCount: deletedUsers.length,
			remainingUsers: remaining.c
		};
	});

	console.log('✅ Phase 0 cleanup & admin recovery completed:');
	console.log(JSON.stringify(result, null, 2));
	console.log(`\n🔐 NEW SUPERADMIN CREDENTIALS (store safely & change from /admin/users anytime):`);
	console.log(`   Login URL: https://sujetstore.com/admin/login`);
	console.log(`   Email:     admin@sujetstore.com`);
	console.log(`   Password:  ${rawPw}\n`);
}

main()
	.then(async () => {
		await usersSql.close();
		process.exit(0);
	})
	.catch((err) => {
		console.error('❌ Cleanup failed:', err);
		process.exit(1);
	});
