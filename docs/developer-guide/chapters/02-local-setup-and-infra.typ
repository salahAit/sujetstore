#import "../theme.typ": *

= إعداد بيئة التطوير والبنية التحتية (Setup & Infrastructure)

يشرح هذا الفصل كيفية تجهيز بيئة تطوير محلية أو خادم تجريبي مطابق تماماً لبيئة الإنتاج دون التأثير على أي خدمات أخرى تعمل على نفس الجهاز.

== المتطلبات الأساسية (Prerequisites)

#dev-table(
  columns: (1.3fr, 1.1fr, 2.6fr),
  headers: ("الأداة", "الإصدار الأدنى", "الغرض"),
  [`Bun`], [`>= 1.4.4`], [بيئة التشغيل، إدارة الحزم، `bun:sqlite`، `Bun.SQL`، و`Bun.S3Client`.],
  [`Docker & Compose`], [`>= 24.x`], [تشغيل حاويتي `sujetstore-postgres` و`sujetstore-rustfs` بشكل معزول.],
  [`Typst CLI`], [`>= 0.15.1`], [تجميع مواضيع الفروض والاختبارات وتجميع هذا الدليل المصدري.],
  [`poppler-utils`], [اختياري (للاختبار)], [`pdffonts` و`pdftoppm` للتحقق من الخطوط والمعاينة البصرية لملفات PDF.],
)

== البنية التحتية المعزولة في Docker

تعمل الخدمات المساندة لمنصة SujetStore في مكدس Docker مستقل في `/var/lib/sujetstore-infra/` ومربوط حصرياً بـ `127.0.0.1` حتى لا تكون مكشوفة على الإنترنت العام:

#dev-table(
  columns: (1.5fr, 1.3fr, 1.4fr, 1.6fr),
  headers: ("الحاوية", "الصورة", "المنفذ المحلي", "الوظيفة"),
  [`sujetstore-postgres`], [`postgres:17-alpine`], [`127.0.0.1:5436`], [قاعدة بيانات `sujetstore_users` للمستخدمين والفوترة.],
  [`sujetstore-rustfs`], [`rustfs/rustfs:latest`], [`127.0.0.1:9010` (API) \ `127.0.0.1:9011` (UI)], [تخزين كائنات متوافق مع S3 لحاوية `sujetstore-media`.],
)

#callout("قواعد عزل المنافذ على الخادم", kind: "warn")[
  يستضيف الخادم الإنتاجي خدمات أخرى مستقلة (مثل `rased-postgis` على المنفذ `5433` و`meet-postgresql` على `5435`). لذلك يجب الالتزام الصارم بالمنفذ `5436` لـ PostgreSQL والمنفذين `9010/9011` لـ RustFS والمنفذ `3015` لتطبيق SujetStore، وعدم المساس بأي حاوية أخرى.
]

== متغيرات البيئة (`.env`)

انسخ القالب الجاهز `.env.example` إلى `.env` (ملف `.env` مدرج في `.gitignore` ويجب ألا يُرفع إلى Git أبداً):

```bash
cp .env.example .env
chmod 600 .env
```

#dev-table(
  columns: (1.5fr, 2.2fr, 1.6fr),
  headers: ("المتغير", "مثال / القيمة", "الوصف"),
  [`DATABASE_URL`], [`postgres://sujetstore:PASS@127.0.0.1:5436/sujetstore_users`], [سلسلة الاتصال بقاعدة PostgreSQL 17.],
  [`RUSTFS_ENDPOINT`], [`http://127.0.0.1:9010`], [عنوان نقطة نهاية S3 API لحاوية RustFS.],
  [`RUSTFS_BUCKET`], [`sujetstore-media`], [اسم الـ Bucket المخزن فيه ملفات PDF وSVG.],
  [`RUSTFS_ACCESS_KEY`], [`sujetstore`], [مفتاح الوصول لـ RustFS S3.],
  [`RUSTFS_SECRET_KEY`], [`<secret>`], [المفتاح السري لـ RustFS S3 (يُحفظ بصلاحية `600`).],
  [`RUSTFS_REGION`], [`us-east-1`], [المنطقة الافتراضية لتوقيع S3v4.],
  [`MEDIA_ROOT`], [`/var/lib/sujetstore-media`], [مجلد المرآة المحلية الاحتياطية ومصدر رسومات SVG لـ Typst.],
  [`CHARGILY_API_KEY`], [`test_sk_...` أو `live_sk_...`], [مفتاح Chargily Pay v2 (اختياري محلياً).],
  [`CHARGILY_SECRET_KEY`], [`<webhook_secret>`], [مفتاح التحقق من توقيع `HMAC-SHA256` في Webhook.],
  [`ORIGIN` / `PORT`], [`https://sujetstore.com` / `3015`], [عنوان الأصل ومنفذ التشغيل لـ `@sveltejs/adapter-bun`.],
)

== خطوات التشغيل المحلي لأول مرة

```bash
# 1. تثبيت حزم المشروع
bun install

# 2. إنشاء الرابط الرمزي للوسائط المحلية حتى يتمكن Typst (--root .) من قراءة SVG
ln -sfn "${MEDIA_ROOT:-/var/lib/sujetstore-media}" data/media

# 3. إنشاء جداول PostgreSQL 17 (والتحقق من التطابق عند الترحيل من SQLite)
set -a && source .env && set +a
bun run scripts/migrate-users-to-pg.ts

# 4. بناء فهرس البحث الفوري FTS5 داخل data/content.db
bun run scripts/build-search-index.ts

# 5. فحص الأنواع والقوالب (يجب أن يرجع 0 أخطاء و0 تحذيرات)
bun run check

# 6. تشغيل خادم التطوير
bun run dev
```

== إعدادات Vite وBun الخارجية

في `vite.config.ts` تم استبعاد `'bun'` و`'bun:sqlite'` من `optimizeDeps.exclude` ومن `build.rolldownOptions.external` لأن `users-pg.ts` و`storage.ts` يستوردان `SQL` و`S3Client` مباشرة من وحدة `'bun'` المدمجة في بيئة التشغيل. لا تُزل هذه الإعدادات وإلا سيفشل البناء الإنتاجي.
