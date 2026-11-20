#import "../theme.typ": *

= البحث الفوري FTS5، تحسين محركات البحث (SEO)، والتخزين المؤقت

صُمّم SujetStore v4.0 ليقدّم تجربة بحث لحظية وأرشفة مثالية في محركات البحث مع سرعة استجابة تضاهي المواقع الثابتة دون الحاجة للانتقال إلى إطار عمل منفصل مثل Astro.

== البحث الفوري بـ SQLite FTS5

=== بناء الفهرس (`scripts/build-search-index.ts`)

ينشئ السكربت جدولاً افتراضياً `search_fts` داخل `data/content.db` باستخدام محرك `FTS5` ومحلل `unicode61 remove_diacritics 2`:
- يتحقق أولاً من تفعيل `ENABLE_FTS5` في محرك SQLite.
- يفهرس *4,301 مورداً* (*3,299 وثيقة منشورة* + *1,002 تمرين تفاعلي منشور*) في حوالي `1.4s`.
- يستخرج كلمات البحث المفتاحية من ملفات الدروس التفاعلية (`keywordsAr`, `sequenceTitleAr`, `domain`)، ويضيف مرادفات فرنسية وعربية للشهادات (`Baccalauréat`, `BEM`, `تقييم المكتسبات`)، وعموداً مخصّصاً للنص العربي المطبّع (حذف التشكيل والتطويل وتوحيد `[أإآٱ] -> ا`، `ى -> ي`، `ة -> ه`).
- يختم العملية بـ `INSERT INTO search_fts(search_fts) VALUES ('optimize')` لضغط الشجرة.

=== واجهة البحث (`src/routes/api/search/+server.ts`)

- تعقّم استعلام المستخدم وتحذف المحارف الخاصة بـ FTS5 (`" * : ^ ( ) -`) لمنع أي استثناء نحوي عند إدخال رموز عشوائية أو كلمات مفتاحية مثل `AND OR NOT NEAR`.
- تطبّق البحث البادئي (`"token"*`) وترتّب النتائج بوزن `bm25(search_fts, ...)`، مع سقوط تلقائي آمن إلى `LIKE` في حال عدم وجود جدول `search_fts`.
- تُضيف ترويسة `Cache-Control: public, max-age=120, s-maxage=600`.
- زمن الاستجابة الموثّق: `0.22ms` إلى `1.48ms` للاستعلامات العربية والفرنسية والإنجليزية.

== تحسين محركات البحث (Dynamic SEO)

#dev-table(
  columns: (1.9fr, 3.1fr),
  headers: ("الملف / المسار", "الوظيفة والمواصفات"),
  [`src/routes/sitemap.xml/+server.ts`], [يولّد خريطة موقع XML صالحة ديناميكياً لـ *2,713 رابطاً* (4 صفحات أساسية، 3 أطوار، 12 سنة، 14 شعبة، 106 مسارات مواد مع معامل `?stream=` مرمّز بـ `&amp;`، 1,574 درساً تفاعلياً، 1,000 تمرين عام) بكاش `max-age=3600, s-maxage=86400`.],
  [`src/routes/robots.txt/+server.ts`], [يسمح بأرشفة المحتوى التعليمي العام، ويمنع `/admin` و`/api` و`/auth` و`/student`، ويشير إلى `https://sujetstore.com/sitemap.xml` (أُزيل `static/robots.txt` القديم لمنع التعارض).],
  [`src/lib/components/SeoJsonLd.svelte`], [مكوّن Svelte 5 آمن يحقن `application/ld+json` داخل `<svelte:head>` مع تهريب `<`, `>`, `&`, `\u2028`, `\u2029`. مدمج في الصفحة الرئيسية (`EducationalOrganization` + `WebSite`)، وصفحات المواد (`Course` + `BreadcrumbList`)، وصفحات الوثائق والدروس (`LearningResource` + `BreadcrumbList`).],
)

== التخزين المؤقت الذكي في SvelteKit 3 (`src/hooks.server.ts`)

بدلاً من تجميد الموقع بالكامل في ملفات ثابتة تفقد التخصيص، يطبّق `src/hooks.server.ts` سياسة كاش HTTP دقيقة على جميع استجابات `GET / HEAD` من نوع `text/html`:

#dev-table(
  columns: (1.7fr, 3.3fr),
  headers: ("حالة الطلب", "ترويسات HTTP المطبّقة"),
  [زائر غير مسجّل لصفحة عامة \ (الرئيسية، طور، سنة، مادة، درس، محاكي)], [`Cache-Control: public, max-age=60, s-maxage=3600, stale-while-revalidate=86400` \ `Vary: Cookie` (لضمان عدم تسرّب نسخة مستخدم مسجّل إلى زائر آخر).],
  [مستخدم مسجّل أو مسار خاص \ (`/student/*`, `/admin/*`, `/auth/*`, `/bookmarks`, `/progress`, أو وجود `Set-Cookie`)], [`Cache-Control: private, no-store` — منع تام للتخزين المؤقت المشترك.],
)

#callout("تكامل Caddy مع الكاش", kind: "tip")[
  في `/etc/caddy/conf.d/sujetstore.caddy` تُمنح ملفات `/_app/immutable/*` والأصول الثابتة (خطوط، صور، CSS) ترويسة `public, max-age=31536000, immutable`، بينما يُستثنى `/service-worker.js` صراحةً بترويسة `no-cache, must-revalidate`، ويُترك لخادم SvelteKit التحكم الكامل في ترويسات صفحات HTML وملفات PDF المحمية.
]
