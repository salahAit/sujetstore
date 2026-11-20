# الوثيقة المعمارية لمنصة SujetStore (الإصدار 4.0)

**الإصدار:** 4.0 (Hybrid Dual-DB + RustFS S3 + Core Kernel & Plugins + SvelteKit 3 Smart Edge Caching)  
**الهدف:** تقديم منصة تعليمية جزائرية فائقة السرعة تجمع بين الأداء الفوري للمحتوى القرائي الثابت (`SQLite + FTS5 + HTTP Caching`)، والموثوقية المحاسبية الكاملة لحسابات المستخدمين والاشتراكات (`PostgreSQL 17`)، وتخزين كائنات معزول (`RustFS S3`)، ونواة معيارية قابلة للتوسع لإضافة مواد جديدة بسهولة.

---

## 1. المخطط العام للنظام (System Topology)

```text
                       المتصفح / تطبيق الويب (PWA - 15 KB SW)
                                        │
                                  HTTPS (HTTP/2)
                                        ▼
                 ┌──────────────────────────────────────────────┐
                 │  Caddy Reverse Proxy (zstd/gzip + TLS)       │
                 │  • /_app/immutable/*  -> immutable (1 year)  │
                 │  • /service-worker.js -> no-cache            │
                 └──────────────────────┬───────────────────────┘
                                        │ 127.0.0.1:3015
                                        ▼
                 ┌──────────────────────────────────────────────┐
                 │  SujetStore App (Bun 1.4.4 + SvelteKit 3.2)  │
                 │  • hooks.server.ts: Auth + RateLimit + Cache │
                 │  • Core Kernel (src/lib/kernel/): 6 Plugins  │
                 │  • GeneratorEngine: Typst Queue (max 4) +    │
                 │    SHA-256 Seed Cache (< 1ms) + 24h Cleanup  │
                 │  • Adaptive Remediation Engine               │
                 └───────┬──────────────────┬───────────────────┘
                         │                  │                  │
        Read-Only / FTS5 │   ACID + Tx Lock │   S3 Streaming   │
                         ▼                  ▼                  ▼
        ┌───────────────────┐  ┌─────────────────────┐  ┌──────────────────────┐
        │ data/content.db   │  │ PostgreSQL 17       │  │ RustFS S3            │
        │ (bun:sqlite WAL)  │  │ (127.0.0.1:5436)    │  │ (127.0.0.1:9010)     │
        │ • 106 tracks      │  │ • 26 tables         │  │ • 23,885 PDF & SVG   │
        │ • 3,299 docs      │  │ • users / sessions  │  │ • bucket:            │
        │ • 1,002 quizzes   │  │ • Chargily / Vouch. │  │   sujetstore-media   │
        │ • 8,218 questions │  │ • billing_audit_logs│  │ • fallback mirror:   │
        │ • search_fts      │  │ • FOR UPDATE locks  │  │   /var/lib/sujetstore│
        └───────────────────┘  └─────────────────────┘  └──────────────────────┘
```

---

## 2. الركائز المعمارية الخمس في الإصدار 4.0

### 1) استراتيجية قواعد البيانات المزدوجة الهجينة (Hybrid Dual-DB)
- **قاعدة المحتوى (`data/content.db` عبر `bun:sqlite`):**
  - مخصّصة للبيانات القرائية الكثيفة: الهيكلة التعليمية (`education_levels`, `years`, `streams`, `year_subjects`)، الوثائق والدروس التفاعلية (`documents`)، الاختبارات وبنك الأسئلة (`quizzes`, `questions`, `bank_exercises`)، وفهرس البحث الفوري (`search_fts`).
  - تستفيد من سرعة القراءة المحلية دون زمن شبكي (`< 1ms`).
- **قاعدة المستخدمين والاشتراكات (`sujetstore_users` عبر PostgreSQL 17 + `Bun.SQL`):**
  - تدير الحسابات، الجلسات، محاولات التمارين، التلعيب (`user_points`, `user_badges`)، دفتر الأخطاء (`user_mistakes`)، القسائم (`voucher_codes`, `voucher_redemptions`)، وطلبات الدفع (`payment_orders`).
  - تضم جدول تدقيق مالي غير قابل للتعديل **`billing_audit_logs`** مع معاملات ذرية وأقفال `SELECT ... FOR UPDATE` لمنع التفعيل المكرر في Webhooks بوابة Chargily وتفعيل القسائم.
  - معرّفة في `src/lib/server/db/schema-pg.ts` و`src/lib/server/db/users-pg.ts`، مع إبقاء `data/users.db` في الإنتاج كنسخة احتياطية باردة.

### 2) تخزين الكائنات RustFS S3 وتقليص الحزمة
- نُقلت جميع ملفات PDF والرسومات SVG (**23,885 ملفاً، ~590 MB**) خارج `static/` إلى حاوية `sujetstore-rustfs` ومجلد مرآة محلي `/var/lib/sujetstore-media` (مربوط رمزياً عند `data/media` لتصيير رسومات Typst داخل `--root`).
- تُقدّم الملفات عبر `src/lib/server/storage.ts` ومسارات `/documents/[...path]` و`/generated/[...path]` التي تتحقق من `documents.access_tier` (`public` / `registered` / `premium`) وتدعم روابط S3 الموقّعة مؤقتاً (`getPresignedMediaUrl`).
- نتيجة ذلك: انخفض حجم `static/` من `652 MB` إلى `8.0 MB`، وحجم `build/` من `735 MB` إلى `83 MB`، و`service-worker.js` من `1.55 MB` إلى `15 KB`.

### 3) معمارية النواة والإضافات (Core Kernel + 6 Subject Plugins) وتحصين المولّد الذكي
- تقع النواة في `src/lib/kernel/` (`types.ts`, `registry.ts`, `generator-engine.ts`, `index.ts`) مع 6 إضافات مستقلة في `src/lib/kernel/plugins/`: `math`, `physics`, `sciences`, `arabic`, `english`, `french`.
- `GeneratorEngine` يوفّر:
  - **طابور تزامن Typst** (`MAX_CONCURRENT_TYPST = 4`) لمنع استنزاف المعالج والذاكرة.
  - **كاش حتمي بالبذرة (`SHA-256`)** بصلاحية 24 ساعة مع دمج الطلبات المتزامنة (`inFlightMap`) — زمن الإصابة `< 1ms`.
  - **تنظيف تلقائي** لملفات `gen-*.pdf` المنتهية داخل `data/uploads/sujet/`.

### 4) البحث الفوري FTS5 وتحسين محركات البحث وذاكرة التخزين المؤقت في SvelteKit 3
- جدول افتراضي `search_fts` داخل `content.db` بـ `tokenize = "unicode61 remove_diacritics 2"` وتطبيع عربي مخصص (`scripts/build-search-index.ts`) يفهرس 4,301 مورداً بترتيب `bm25`.
- خريطة موقع ديناميكية `/sitemap.xml` (**2,713 رابطاً**)، `/robots.txt` ديناميكي، ومكوّن `SeoJsonLd.svelte` (`EducationalOrganization`, `WebSite`, `Course`, `LearningResource`, `BreadcrumbList`).
- ترويسات تخزين مؤقت ذكية في `src/hooks.server.ts`:
  - الصفحات العامة غير المسجّلة: `Cache-Control: public, max-age=60, s-maxage=3600, stale-while-revalidate=86400` + `Vary: Cookie`.
  - الجلسات المصادق عليها ومسارات `/student` و`/admin` و`/auth`: `Cache-Control: private, no-store`.

### 5) المراجعة العلاجية التكيفية والحزم الانتقائية دون إنترنت
- **محرك المراجعة التكيفية (`src/lib/server/remediation.ts`):** يجمّع الأخطاء غير المحلولة في `user_mistakes` حسب المادة والمحور والفصل، ويطابقها بأقرب درس تفاعلي منشور ليقترح «راجع الدرس في دقيقتين» وجلسة علاجية مركّزة من 5 أسئلة في `/student/mistakes`.
- **الحزم الانتقائية دون إنترنت (`OfflinePackButton.svelte` + `service-worker.ts`):** يتيح للتلميذ تخزين دروس ووثائق مادة واحدة في المتصفح عبر رسائل `CACHE_GRADE_PACK` و`CLEAR_GRADE_PACK` مع مؤشر تقدم فوري وحفظ حالة الحزمة.

---

## 3. المرجع التقني المفصّل للمطورين

للتفاصيل البرمجية الكاملة، أمثلة الكود، طريقة إضافة مادة سابعة، وخطوات التشغيل والطوارئ، راجع الدليل التقني الداخلي المكتوب بـ Typst (غير منشور على الموقع):
- `docs/developer-guide/main.typ`
- `docs/developer-guide/SujetStore-Developer-Guide-v4.pdf`
