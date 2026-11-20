#import "../theme.typ": *

= استراتيجية قواعد البيانات المزدوجة (Dual-DB Architecture)

يعتمد SujetStore v4.0 على *معمارية هجينة بقاعدتي بيانات متخصصتين* بدلاً من إجبار محرك واحد على أداء وظيفتين متناقضتين:

- *القراءة المكثّفة للمناهج (`data/content.db` — SQLite):* بيانات مرجعية نادرة التعديل تُقرأ آلاف المرات في الثانية عبر `bun:sqlite` داخل نفس العملية (`< 1ms` دون أي شبكة).
- *الكتابة التزامنية والفوترة (`sujetstore_users` — PostgreSQL 17):* حسابات المستخدمين، الجلسات، محاولات التمارين، القسائم، والاشتراكات المدفوعة التي تتطلب معاملات `ACID` وأقفال صفوف حقيقية `SELECT ... FOR UPDATE`.

== نقطة الدخول الموحّدة (`src/lib/server/db/index.ts`)

يصدّر الملف `src/lib/server/db/index.ts` واجهتين منفصلتين وواضحتين:

```ts
// 1) قاعدة المحتوى (SQLite — Read-Heavy + FTS5)
export { contentSqlite, contentDatabase, contentSchema };

// 2) قاعدة المستخدمين والاشتراكات (PostgreSQL 17 — Bun native SQL + Drizzle)
export {
  usersSql,        // عميل Bun.SQL الخام
  usersPgDb,       // عميل Drizzle ORM (drizzle-orm/bun-sql)
  usersDatabase,   // اسم مستعار متوافق يشير إلى usersPgDb
  pgSchema,        // مخطط Drizzle PG (26 جدولاً)
  userSchema,      // اسم مستعار لـ pgSchema
  pgAll,           // استعلام متعدد الصفوف: pgAll<T>(sql, params)
  pgGet,           // استعلام صف واحد أو null: pgGet<T>(sql, params)
  pgRun,           // تنفيذ INSERT/UPDATE/DELETE
  pgTx             // معاملة حقيقية BEGIN ... COMMIT / ROLLBACK تدعم FOR UPDATE
};
```

#callout("قاعدة ذهبية للمطورين — ممنوع استخدام usersSqlite", kind: "warn")[
  تمت إزالة جميع الإشارات إلى `usersSqlite` بالكامل من مجلد `src/`. أي استعلام يخص المستخدمين، الجلسات، النقاط، الأخطاء، المفضلة، القسائم، أو الدفع يجب أن يكون غير متزامن (`async/await`) ويستخدم `usersPgDb` أو `pgAll` / `pgGet` / `pgRun` / `pgTx` مع معاملات PostgreSQL المرقّمة (`$1, $2, ...`) والقيم المنطقية `TRUE / FALSE` بدلاً من `1 / 0`.
]

== قاعدة المحتوى (`data/content.db`)

مخططها معرّف في `src/lib/server/db/schema.ts` وتضم الجداول الأساسية التالية:

#dev-table(
  columns: (1.5fr, 3.5fr),
  headers: ("الجدول", "الدور"),
  [`education_levels`, `years`, `streams`, `level_streams`], [الهرم الدراسي الجزائري (ابتدائي، متوسط، ثانوي + الشعب الـ 9) مع عمود `visibility` (`published` / `coming_soon` / `hidden`).],
  [`subjects`, `year_subjects`, `stream_subjects`], [ربط المواد بالسنوات والشعب مع المعامل (`coefficient`) وحالة النشر (106 مسارات منشورة).],
  [`documents`], [جميع الوثائق المنشورة (3,299 وثيقة): فروض (`test`)، اختبارات (`exam`)، دروس تفاعلية JSON (`lesson`)، مواضيع بكالوريا رسمية (`origin_type = 'official_certificate'`)، وطبقات الوصول (`access_tier`).],
  [`quizzes`, `questions`, `quiz_questions`, `question_categories`], [التمارين والمحاكيات التفاعلية (1,002 تمريناً و8,218 سؤالاً بـ 14 نوعاً).],
  [`bank_exercises`], [بنك التمارين القالبية للمولّد الذكي (`1,645` تمريناً).],
  [`search_fts`], [جدول `FTS5` افتراضي (`unicode61 remove_diacritics 2`) يفهرس 4,301 مورداً (الوثائق + التمارين).],
)

== قاعدة المستخدمين والاشتراكات (PostgreSQL 17 — 26 جدولاً)

مخططها معرّف في `src/lib/server/db/schema-pg.ts` وعميل الاتصال في `src/lib/server/db/users-pg.ts` (مع تحميل احتياطي تلقائي لملف `.env` عند تشغيل السكربتات من سطر الأوامر).

#dev-table(
  columns: (1.5fr, 3.5fr),
  headers: ("المجموعة", "الجداول المهاجرة (26 جدولاً)"),
  [الهوية والصلاحيات], [`users` (تشفير Argon2id، أدوار `superadmin`/`admin`/`editor`/`student`، `subscription_expires_at`)، `sessions`.],
  [الفوترة والتدقيق], [`payment_orders`، `voucher_codes`، `voucher_redemptions`، وجدول *`billing_audit_logs`* غير القابل للتعديل لتوثيق كل عملية دفع أو تفعيل قسيمة أو Webhook.],
  [التمارين والتلعيب], [`quiz_attempts`، `attempt_answers`، `user_points`، `badge_definitions`، `user_badges`، `user_mistakes`، `user_bookmarks`.],
  [التفاعل والإحصاء], [`comments`، `ratings`، `view_stats`، `notifications`.],
  [جداول التوافق الموروثة], [`tracks`، `lessons`، `video_sessions`، `questions`، `lesson_progress`، `exam_results`، `exam_overrides`، `student_grades`، `transcript_edits`.],
)

== نموذج المعاملات الذرية وأقفال الفوترة (`FOR UPDATE`)

لمنع التفعيل المزدوج عند وصول إشعاري Webhook متزامنين من Chargily أو عند محاولة استخدام نفس القسيمة من جهازين في اللحظة نفسها، تُنفّذ كل عملية مالية داخل `pgTx` مع قفل صف حصري:

```ts
await pgTx(async (tx) => {
  // قفل الصف حصرياً لمنع سباق التزامن (Race Condition)
  const [order] = await tx`
    SELECT * FROM payment_orders WHERE checkout_id = ${checkoutId} FOR UPDATE
  `;
  if (!order || order.status === 'paid') {
    await tx`
      INSERT INTO billing_audit_logs (order_id, event_type, provider, external_id, status, payload)
      VALUES (${order?.id ?? null}, 'webhook.duplicate_ignored', 'chargily', ${checkoutId}, 'ignored', ${rawPayload})
    `;
    return;
  }
  // تحديث الطلب + تمديد subscription_expires_at + كتابة سجل checkout.paid في billing_audit_logs
});
```

== سكربت الترحيل وفحص التطابق (`scripts/migrate-users-to-pg.ts`)

السكربت *متكرّر التشغيل بأمان (Idempotent)*: ينشئ الجداول والفهارس (46 تعليمة DDL)، ينسخ البيانات على مرحلتين لدعم المرجع الذاتي `users.teacher_id`، يعيد ضبط تسلسلات `SERIAL` عبر `setval`، ثم يجري فحص تطابق صارم لعدد الصفوف بين `users.db` وPostgreSQL ويفشل فوراً عند أي تفاوت. تبقى نسخة `/var/www/sujetstore/data/users.db` محفوظة كنسخة احتياطية باردة غير معدّلة.
