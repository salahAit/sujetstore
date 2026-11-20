#import "../theme.typ": *

= الاختبار، النشر الإنتاجي، وإجراءات الطوارئ (Ops & Runbooks)

يوفّر هذا الفصل الإجراءات المعيارية للتحقق قبل النشر، خطوات الرفع للإنتاج، والنسخ الاحتياطي واستعادة البيانات عند الطوارئ.

== اختبارات التحقق الشاملة (Verification & E2E)

قبل أي رفع إلى الإنتاج، يجب اجتياز فحص الأنواع والبناء واختبارات E2E بنجاح تام:

```bash
set -a && source .env && set +a

# 1. فحص TypeScript وقوالب Svelte 5 (الهدف: 0 أخطاء و0 تحذيرات)
bun run check

# 2. بناء نسخة الإنتاج والتأكد من صغر حجم الحزمة وService Worker
bun run build
du -sh static/ build/
ls -lh build/client/service-worker.js   # يجب أن يكون < 25 KB

# 3. اختبارات التحقق الشاملة End-to-End (تختبر SSR + PG + RustFS + Typst + Quiz Grading)
bun run scripts/verify-french-pipeline.ts
bun run scripts/verify-english-pipeline.ts
bun run scripts/verify-arabic-pipeline.ts

# 4. فحوصات سلامة المحتوى (0 حظر منهجي / 0 علامات غريبة)
bun run scripts/audit-french-content.ts
bun run scripts/audit-english-content.ts
bun run scripts/audit-arabic-content.ts
```

== إجراء النشر الإنتاجي على الخادم (`/var/www/sujetstore`)

#callout("تذكير حاسم — حماية الوثائق والأسرار", kind: "warn")[
  لا تنسخ أبداً مجلد `docs/` أو `book/` إلى `static/` ولا تجعله متاحاً عبر HTTP. ولا ترفع ملف `.env` إلى Git أبداً.
]

```bash
cd /home/salah/admin-anty/sujetstore

# 1. مزامنة الملفات المبنية والكود والأصول الخفيفة (دون docs/ ودون data/*.db)
rsync -a --delete build/   /var/www/sujetstore/build/
rsync -a --delete src/     /var/www/sujetstore/src/
rsync -a --delete static/  /var/www/sujetstore/static/
rsync -a --delete scripts/ /var/www/sujetstore/scripts/
cp package.json vite.config.ts tsconfig.json /var/www/sujetstore/
ln -sfn /var/lib/sujetstore-media /var/www/sujetstore/data/media

# 2. في حال تحديث content.db فقط: إيقاف قصير واستبدال ذري للملف
systemctl stop sujetstore.service
cp data/content.db /var/www/sujetstore/data/content.db.new
rm -f /var/www/sujetstore/data/content.db-wal /var/www/sujetstore/data/content.db-shm
mv /var/www/sujetstore/data/content.db.new /var/www/sujetstore/data/content.db
systemctl start sujetstore.service
sleep 4
systemctl is-active sujetstore.service
```

=== التحقق الحي بعد النشر (Live Smoke Checklist)

```bash
curl -sSI https://sujetstore.com/ | grep -iE "^HTTP/|^cache-control:|^vary:"
curl -sSI https://sujetstore.com/service-worker.js | grep -iE "^HTTP/|^cache-control:|^content-length:"
curl -sSI https://sujetstore.com/sitemap.xml | grep -iE "^HTTP/|^content-type:"
curl -sSI "https://sujetstore.com/generated/official-bac-arabic/bac-2025-3as-se-arabic.pdf" \
  | grep -iE "^HTTP/|^x-storage-backend:"
curl -sS  https://sujetstore.com/api/gamification | head -c 120
```

== النسخ الاحتياطي والاستعادة (Backup & Restore Runbooks)

#dev-table(
  columns: (1.5fr, 3.5fr),
  headers: ("الأصل الحرج", "أمر النسخ الاحتياطي الموصى به"),
  [PostgreSQL 17 \ (`sujetstore_users`)], [`docker exec sujetstore-postgres pg_dump -U sujetstore -Fc sujetstore_users > /var/backups/sujetstore_pg_$(date +%F).dump` \ للاستعادة: `docker exec -i sujetstore-postgres pg_restore -U sujetstore -d sujetstore_users --clean < backup.dump`],
  [قاعدة المحتوى \ (`content.db`)], [`sqlite3 /var/www/sujetstore/data/content.db ".backup '/var/backups/content_$(date +%F).db'"` \ (أو عبر Git snapshot في `sujetstore-math-pipeline-prep/database_snapshot/content.db`).],
  [ملفات RustFS و`MEDIA_ROOT`], [المرآة المحلية `/var/lib/sujetstore-media` تحوي نسخة كاملة ومطابقة لجميع ملفات RustFS الـ 23,885. وفي حال إعادة إنشاء حاوية RustFS، يكفي تشغيل `bun run scripts/sync-media-to-rustfs.ts` لإعادة رفع كل الملفات تلقائياً.],
  [إعدادات الأسرار], [حفظ نسخة مشفرة من `/var/lib/sujetstore-infra/.env` في خزنة كلمات مرور آمنة خارج المستودع.],
)

== استكشاف الأعطال السريع (Troubleshooting)

#dev-table(
  columns: (1.6fr, 1.5fr, 1.9fr),
  headers: ("العرض / المشكلة", "السبب المحتمل", "الحل السريع"),
  [فشل الاتصال بـ PostgreSQL], [توقّف حاوية `sujetstore-postgres` أو غياب `EnvironmentFile` في `systemd`.], [تحقق بـ `docker ps` وتأكد من وجود `EnvironmentFile=-/var/www/sujetstore/.env` في `/etc/systemd/system/sujetstore.service`.],
  [ملف PDF يُرجع `local-media` بدل `rustfs-s3`], [توقف حاوية `sujetstore-rustfs` أو ملف جديد لم يُزامن بعد.], [شغّل `docker compose -f /var/lib/sujetstore-infra/docker-compose.yml up -d` ثم `bun run scripts/sync-media-to-rustfs.ts`.],
  [فشل Typst في قراءة رسم SVG], [غياب الرابط الرمزي `data/media` داخل جذر التطبيق.], [نفّذ `ln -sfn /var/lib/sujetstore-media /var/www/sujetstore/data/media`.],
  [البحث لا يجد درساً جديداً], [لم يُعد بناء فهرس `search_fts` بعد البذر.], [نفّذ `bun run scripts/build-search-index.ts` ثم استبدل `content.db`.],
  [المتصفح لا يحدّث Service Worker], [كاش قديم في متصفح العميل.], [تأكّد أن `/service-worker.js` يُرجع `Cache-Control: no-cache, must-revalidate` من Caddy.],
)

== إعادة تجميع هذا الدليل

عند أي تعديل هندسي مستقبلي، حدّث الفصل المعني داخل `docs/developer-guide/chapters/` وأعد التجميع عبر:

```bash
bun run docs:dev-guide
```
