#import "../theme.typ": *

= النظرة العامة والمعمارية التقنية (Overview & Stack)

تُعدّ منصة *SujetStore* (الإصدار الرابع `v4.0`) نظاماً تعليمياً جزائرياً متكاملاً يخدم الأطوار الثلاثة (*الابتدائي، المتوسط، والثانوي بجميع شعبه*) وفق المنهاج الدراسي الوطني، مع تركيز هندسي صارم على الأداء الفائق، استقلالية البنية التحتية، قابلية التوسع لإضافة مواد جديدة، والموثوقية المحاسبية في الاشتراكات المدفوعة.

#callout("تنبيه أمني وتنظيمي — وثيقة داخلية فقط", kind: "warn")[
  هذا الدليل مخصّص لفريق التطوير ومُودَع داخل المسار `docs/developer-guide/` في مستودع Git فقط. يُمنع منعاً باتاً نقل هذه الملفات أو ملف PDF الناتج عنها إلى `static/` أو ربطها بأي مسار داخل `src/routes/`. كما أن سكربت النشر `deploy.sh` يستثني مجلدي `docs/` و`book/` تلقائياً لضمان عدم ظهورها إطلاقاً على الموقع العام.
]

== أرقام الإنتاج الموثّقة (الإصدار 4.0)

#kpi-grid((
  (value: "6 مواد", label: "إضافات نواة (Plugins)"),
  (value: "106", label: "مساراً دراسياً منشوراً"),
  (value: "1,574", label: "درساً تفاعلياً"),
  (value: "3,299", label: "وثيقة منشورة"),
))

#kpi-grid((
  (value: "1,002", label: "تمرين ومحاكي تفاعلي"),
  (value: "8,218", label: "سؤالاً في بنك الأسئلة"),
  (value: "23,885", label: "ملف وسائط في RustFS"),
  (value: "2,713", label: "رابطاً في Sitemap"),
))

== الحزمة التقنية الكاملة (Tech Stack)

#dev-table(
  columns: (1.2fr, 1.4fr, 2.8fr),
  headers: ("الطبقة", "التقنية / الإصدار", "المسؤولية الهندسية"),
  [بيئة التشغيل], [`Bun 1.4.4`], [تشغيل التطبيق، قراءة SQLite عبر `bun:sqlite`، الاتصال الأصلي بـ PostgreSQL عبر `Bun.SQL`، وبث ملفات S3 عبر `Bun.S3Client`.],
  [إطار العمل], [`SvelteKit 3.2` + `Svelte 5.57`], [توجيه Full-Stack باستخدام Runes (`$props`, `$state`, `$derived`) مع `@sveltejs/adapter-bun` وVite `8` وTailwind CSS `v4`.],
  [قاعدة المحتوى], [`SQLite` (`data/content.db`)], [تخزين المنهاج، الوثائق، الدروس التفاعلية، القوالب، بنك الأسئلة، وفهرس البحث `search_fts` (`FTS5`) بزمن استجابة `< 1ms`.],
  [قاعدة المستخدمين], [`PostgreSQL 17`], [حاوية `sujetstore-postgres` (`127.0.0.1:5436`) لحسابات التلاميذ، الجلسات، الاشتراكات، Chargily، القسائم، وسجل التدقيق `billing_audit_logs`.],
  [تخزين الكائنات], [`RustFS S3`], [حاوية `sujetstore-rustfs` (`127.0.0.1:9010/9011`) لتخزين ملفات PDF وSVG خارج `static/` مع نسخة مرآة محلية في `MEDIA_ROOT`.],
  [معمارية المواد], [`src/lib/kernel/`], [سجل موحّد (`SubjectRegistry`) لـ 6 إضافات مواد مستقلة + `GeneratorEngine` بطابور Typst محدود وكاش حتمي بالبذرة.],
  [محرك الطباعة PDF], [`Typst 0.15.1 CLI`], [توليد فروض واختبارات عربية RTL (مع كشيدة الشعر العمودي) وفرنسية/إنجليزية LTR مع حلول نموذجية ورسومات SVG.],
  [العمل أوفلاين], [`Service Worker (15 KB)`], [غلاف تطبيق خفيف + حزم انتقائية قابلة للتحميل حسب المادة عبر `OfflinePackButton.svelte`.],
  [البنية والإنتاج], [`Docker` + `systemd` + `Caddy`], [عزل الخدمات، إنهاء HTTPS، ضغط `zstd/gzip`، وترويسات كاش مضبوطة على `127.0.0.1:3015`.],
)

== خريطة شجرة المستودع (Repository Map)

```text
sujetstore/
├── src/
│   ├── hooks.server.ts                 # المصادقة، الحماية، Rate Limit، وترويسات Cache-Control/Vary
│   ├── service-worker.ts               # Service Worker خفيف (15 KB) + بروتوكول CACHE_GRADE_PACK
│   ├── lib/
│   │   ├── kernel/                     # النواة المركزية (types, registry, generator-engine, 6 plugins)
│   │   ├── components/                 # مكونات Svelte 5 المشتركة (SeoJsonLd، OfflinePackButton، ...)
│   │   ├── modules/                    # وحدات المناهج (*Templates للـ 6 مواد) + InteractiveLesson + SujetBuilder
│   │   └── server/
│   │       ├── db/                     # schema.ts (SQLite) + schema-pg.ts + users-pg.ts + index.ts
│   │       ├── storage.ts              # عميل RustFS S3 + بث محمي حسب access_tier + Presigned URLs
│   │       ├── remediation.ts          # محرك تحليل نقاط الضعف وربطها بالدروس التفاعلية
│   │       ├── typst.ts                # تعقيم النصوص والرياضيات وتجميع PDF عبر Typst CLI
│   │       ├── auth.ts                 # مصادقة Argon2id + جلسات PostgreSQL + أدوار RBAC
│   │       ├── gamification.ts         # نقاط XP، السلاسل اليومية (FOR UPDATE)، والشارات الثماني
│   │       ├── quiz-grading.ts         # تصحيح خادم حتمي للأنواع الـ 14 (بدون eval)
│   │       ├── uploads.ts              # فحص Magic Bytes ومنع SVG في المرفوعات
│   │       └── visibility.ts           # التحكم في ظهور الأطوار/المواد وطبقات الوصول
│   └── routes/                         # المسارات العامة، /student/*، /admin/*، /api/*، /documents/*، /generated/*
├── scripts/                            # سكربتات البذر، الفهرسة FTS5، الترحيل إلى PG، المزامنة، واختبارات E2E
├── pipeline/                           # مراجع المناهج الرسمية ومخططات التوليد
├── data/                               # غير متتبّع جزئياً: content.db، media -> /var/lib/sujetstore-media، uploads/
├── static/                             # أصول خفيفة فقط (~8 MB): الأيقونات، الشعارات، والخطوط الأساسية
├── docs/developer-guide/               # [داخلي فقط] هذا الدليل التقني بـ Typst
├── ARCHITECTURE.md                     # الملخص المعماري v4.0
├── README.md                           # بطاقة التعريف والتشغيل السريع
└── .env.example                        # قالب متغيرات البيئة (بدون أسرار)
```
