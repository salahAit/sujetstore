#import "../theme.typ": *

= تخزين RustFS S3 وService Worker وحزم أوفلاين (Storage & PWA)

قبل الإصدار 4.0، كانت ملفات PDF ورسومات SVG مخزنة داخل `static/documents` و`static/generated` (حوالي `644 MB` و23,885 ملفاً)، مما أدى إلى تضخّم مجلد `build/` إلى `735 MB` وملف `service-worker.js` إلى `1.55 MB`. يحل الإصدار 4.0 هذه المشكلة جذرياً بفصل التخزين في *RustFS S3*.

== معمارية طبقة التخزين (`src/lib/server/storage.ts`)

تعتمد المنصة على عميل `S3Client` الأصلي المدمج في Bun 1.4.4 دون أي حزم خارجية ثقيلة (`aws-sdk` غير مطلوب):

#dev-table(
  columns: (1.7fr, 3.3fr),
  headers: ("الدالة / المسار", "الوظيفة والسلوك"),
  [`putMediaObject(key, data, mime)`], [يحفظ الملف في المرآة المحلية `MEDIA_ROOT` ويرفعه بالتوازي إلى حاوية RustFS (`sujetstore-media`).],
  [`getMediaObject(key)`], [يقرأ من RustFS S3 أولاً (مع ترويسة `X-Storage-Backend: rustfs-s3`)، وعند تعذر الاتصال يسقط بسلاسة إلى المرآة المحلية `/var/lib/sujetstore-media` (`local-media`).],
  [`getPresignedMediaUrl(key, ttlSec)`], [يولّد رابط S3 موقّعاً مؤقتاً للوصول المباشر المحدود زمنياً.],
  [`serveProtectedMedia(event, prefix)`], [يتحقق من `sanitizeObjectKey` (منع `..` وحقن المسارات)، ثم يفحص عمود `access_tier` في `content.db` ويطبّق صلاحيات `public` / `registered` / `premium` قبل بث الملف.],
  [`/documents/[...path]/+server.ts`], [نقطة بث جميع مواضيع الفروض والاختبارات (العيّنات المولّدة والمستندات المرفوعة).],
  [`/generated/[...path]/+server.ts`], [نقطة بث مواضيع البكالوريا الرسمية ورسومات SVG الخاصة بالرياضيات والفيزياء والعلوم واللغات.],
)

== ترويسات الكاش حسب طبقة الوصول

- *المحتوى المجاني (`public` / `free`):*
  `Cache-Control: public, max-age=86400, stale-while-revalidate=604800`
- *المحتوى المسجّل أو المدفوع (`registered` / `premium`):*
  `Cache-Control: private, no-store` — يُمنع تماماً تخزينه في أي كاش وسيط أو مشترك، ويُعاد `401` أو `403` لغير المصرح لهم.

== مزامنة ملفات الوسائط بعد توليد محتوى جديد

كلما أعاد مطور توليد مواضيع عيّنات أو بكالوريا عبر سكربتات `scripts/generate-*-sample-exams.ts` أو `scripts/build-official-*-bac-archive.ts`:

```bash
set -a && source .env && set +a
bun run scripts/sync-media-to-rustfs.ts
```

يقوم السكربت برفع الملفات بالتوازي (16 عاملاً متزامناً) إلى RustFS وتحديث `/var/lib/sujetstore-media`.

== حل مسارات SVG داخل Typst (`data/media`)

بما أن `typst compile --root .` يمنع قراءة أي ملف خارج الجذر `.`، أنشأنا رابطاً رمزياً في كل من بيئة التطوير والإنتاج:
`data/media -> /var/lib/sujetstore-media`.

وتعمل جميع دوال توليد SVG الست (`svg-helpers.ts`, `svg-physics.ts`, `svg-sciences-core.ts`, `svg-arabic.ts`, `svg-english.ts`, `svg-french.ts`) على الكتابة مباشرة داخل `MEDIA_ROOT/generated/<subject>-svg/`، بينما يحوّل `sanitizeImagePath` في `src/lib/server/typst.ts` أي مسار `/generated/...` تلقائياً إلى `/data/media/generated/...` عند التجميع.

== Service Worker الخفيف (`15 KB`) والحزم الانتقائية دون إنترنت

أُعيدت كتابة `src/service-worker.ts` لحذف مصفوفة `assets` العملاقة، والاحتفاظ فقط بملفات `build` الأساسية (`/_app/immutable/*`) في كاش غلاف التطبيق (`sujetstore-shell-<version>`). كما تم ضبط Caddy (`/etc/caddy/conf.d/sujetstore.caddy`) لتقديم `/service-worker.js` بترويسة `Cache-Control: no-cache, must-revalidate` كي يستلم المتصفح التحديثات فوراً.

=== بروتوكول الحزم الانتقائية (`OfflinePackButton.svelte`)

يظهر المكوّن `src/lib/components/OfflinePackButton.svelte` داخل صفحة كل مادة (`src/routes/[level]/[year]/[subject]/+page.svelte`)، ويجمع حتى 20 درساً تفاعلياً و20 ملف PDF مجانياً للمادة المختارة ويتواصل مع `service-worker.ts` عبر الرسائل التالية:

```ts
// 1. طلب حفظ حزمة مادة معينة
navigator.serviceWorker.controller.postMessage({
  type: 'CACHE_GRADE_PACK',
  packId: 'secondaire-3as-arb-se',
  urls: ['/secondaire/3as/arb-se', '/documents/...pdf', ...]
});

// 2. استلام التقدم والإتمام من Service Worker
// { type: 'CACHE_GRADE_PACK_PROGRESS', packId, completed, total }
// { type: 'CACHE_GRADE_PACK_COMPLETE', packId, cachedCount, totalCount }

// 3. حذف الحزمة لتحرير ذاكرة الجهاز
navigator.serviceWorker.controller.postMessage({
  type: 'CLEAR_GRADE_PACK', packId, urls
});
```

وفي حال لم يكن الـ Service Worker مفعّلاً بعد (أو لم يرد خلال 5 ثوانٍ)، يسقط المكوّن تلقائياً إلى `window.caches` مباشرة لضمان نجاح الحفظ في جميع المتصفحات.
