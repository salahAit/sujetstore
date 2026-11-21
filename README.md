# منصة SujetStore التعليمية — v5.0

**منصة تعليمية جزائرية شاملة ومفتوحة الأداء للمنهاج الدراسي الوطني** (*الابتدائي، المتوسط، والثانوي بجميع شعبه*) — فروض واختبارات بصيغة PDF عالية الدقة، دروس تفاعلية، استوديو فيديو بتفريغ متزامن وأسئلة مدمجة، محاكيات شهادات، بنك أسئلة ذكي، ومراجعة علاجية تكيفية، بواجهة **Mobile-First** متعددة اللغات (**العربية / الفرنسية / الإنجليزية**) وتطبيقات **Android** و**Desktop**.

> **الموقع المباشر:** https://sujetstore.com

---

## أرقام المنصة الحالية (إنتاج v4.0)

| المؤشر | القيمة الموثّقة |
| :--- | :---: |
| المواد المفعّلة في النواة (Kernel Plugins) | **6 مواد** (الرياضيات، الفيزياء، العلوم، العربية، الإنجليزية، الفرنسية) |
| المسارات التعليمية المنشورة (`year_subjects`) | **106 مسارات** (ابتدائي `1AP–5AP`، متوسط `1AM–4AM`، ثانوي `1AS–3AS` بـ 9 شعب) |
| الدروس التفاعلية المنشورة | **1,574 درساً تفاعلياً** (اكتشاف، ملخص قواعد، تطبيقات فورية) |
| الوثائق المنشورة (فروض، اختبارات، دروس) | **3,299 وثيقة** منها **78 موضوعاً رسمياً للبكالوريا** |
| التمارين والاختبارات التفاعلية (`quizzes`) | **1,002 تمرين/محاكي** |
| بنك الأسئلة (`questions`) | **8,218 سؤالاً** (14 نوعاً تفاعلياً بتصحيح حتمي في الخادم) |
| بنك قوالب المولّد الذكي | **1,633 قالباً** (`1,645` تمريناً في `bank_exercises`) |
| فهرس البحث الفوري (`SQLite FTS5`) | **4,301 مورداً مفهرساً** (زمن استجابة `< 2ms`) |
| ملفات الوسائط المخزنة في RustFS S3 | **23,885 ملفاً** (PDF + SVG، بإجمالي `~590 MB`) |
| روابط خريطة الموقع الديناميكية (`/sitemap.xml`) | **2,713 رابطاً** |

---

## المعمارية والتقنيات المستخدمة (Tech Stack)

| الطبقة | التقنية | الدور المعماري |
| :--- | :--- | :--- |
| **بيئة التشغيل** | **Bun `1.4.4`** | تشغيل الخادم، `bun:sqlite` للمحتوى، `Bun.SQL` لـ PostgreSQL، و`S3Client` الأصلي لـ RustFS |
| **إطار العمل والواجهة** | **SvelteKit `3.2` + Svelte `5.57` (Runes)** | SSR سريع + تخزين مؤقت ذكي (`Cache-Control` + `Vary: Cookie`) + Vite `8` + Tailwind CSS `v4` |
| **قاعدة المحتوى (Read-Heavy)** | **SQLite (`data/content.db` + `FTS5`)** | تخزين المنهاج، الدروس، القوالب، وبنك الأسئلة مع فهرس بحث فوري `unicode61` |
| **قاعدة المستخدمين والفوترة** | **PostgreSQL `17`** (`sujetstore-postgres`) | المستخدمون، الجلسات، الاشتراكات المدفوعة، Chargily، القسائم، `billing_audit_logs` مع أقفال `FOR UPDATE` |
| **تخزين الكائنات (Object Storage)** | **RustFS S3** (`sujetstore-rustfs`) | تخزين ملفات PDF والرسومات SVG خارج `static/` مع بث محمي بطبقات الوصول ونسخة محلية `MEDIA_ROOT` |
| **معمارية المواد والمولّد الذكي** | **Core Kernel + 6 Plugins (`src/lib/kernel/`)** | تسجيل موحّد للمواد + `GeneratorEngine` (طابور 4 عمال Typst، كاش بذور SHA-256، تنظيف 24h) |
| **محرك الطباعة PDF** | **Typst `0.15.1` CLI** | تصيير فروض واختبارات رسمية عربية (مع كشيدة الشعر العمودي) وفرنسية/إنجليزية LTR بجودة مطبعية |
| **العمل دون إنترنت (PWA)** | **Slim Service Worker (`15 KB`)** | تخزين الغلاف الأساسي فقط + حزم انتقائية لكل مادة عبر `OfflinePackButton.svelte` |
| **البنية التحتية والنشر** | **Docker + systemd + Caddy** | إنهاء HTTPS تلقائي، ضغط zstd/gzip، وترويسات كاش مضبوطة |

---

## المزايا الرئيسية

1. **التصفح الهرمي السريع والفلترة الدقيقة:**
   - أطوار ← سنوات ← شعب ← مواد ← فصول دراسية (`t1` / `t2` / `t3`) مع ترتيب بيداغوجي (فروض قبل الاختبارات).
   - فلترة سياقية حسب النوع، المصدر (**رسمي / مقترح**)، السنة الدراسية، وتوفّر الحل النموذجي.
2. **الدروس التفاعلية وبنك التمارين (14 نوع سؤال):**
   - واجهة درس تفاعلي بـ 3 مراحل (استكشاف، ملخص، تمرين تطبيقي) وتصحيح خادم حتمي (`src/lib/server/quiz-grading.ts`).
3. **المولّد الذكي للامتحانات والاختبارات (`/student/generator`):**
   - توليد فروض، اختبارات فصلية، امتحانات تقييم المكتسبات (`5AP`)، ومواضيع محاكاة BEM وBAC بصيغة PDF مع الحل النموذجي، مع كاش حتمي بالبذرة (`< 1ms` عند التكرار).
4. **دفتر الأخطاء وخطة المراجعة العلاجية الذكية (`/student/mistakes`):**
   - تحليل تلقائي لنقاط الضعف وربطها بالدرس التفاعلي المناسب («راجع الدرس في دقيقتين») مع إطلاق جلسة علاجية مركّزة من 5 أسئلة.
5. **الحزم الانتقائية للدراسة دون إنترنت (Selective Offline Packs):**
   - إمكانية حفظ دروس ووثائق مادة معينة محلياً في المتصفح عبر زر `حفظ المادة للدراسة دون إنترنت` دون إثقال ذاكرة الهاتف.
6. **حاسبة المعدل ومحاكاة BEM / BAC (`/simulator`):**
   - حساب المعدلات الفصلية ومحاكاة الشهادات وفق معاملات المنهاج الجزائري.
7. **الاشتراكات والفوترة الآمنة (`/student/activate`، `/admin/vouchers`):**
   - دعم القسائم، وصولات بريدي موب/CCP، وبوابة Chargily Pay v2 مع توقيع `HMAC-SHA256` ومعاملات `SELECT ... FOR UPDATE` وسجل تدقيق `billing_audit_logs`.
8. **البحث الفوري (`FTS5`) وتحسين محركات البحث (SEO):**
   - بحث فوري يدعم التطبيع العربي وإزالة التشكيل، خريطة موقع `/sitemap.xml`، `/robots.txt`، وبيانات مهيكلة `JSON-LD`.

---

## التشغيل السريع للمطورين (Quick Start)

### المتطلبات الأساسية
- **Bun** `>= 1.4`
- **Docker** (لتشغيل حاويتي `sujetstore-postgres` و`sujetstore-rustfs`)
- **Typst** `>= 0.15` (لتوليد ملفات PDF ودليل المطور)

### خطوات التشغيل المحلي

```bash
# 1. تثبيت الاعتماديات
bun install

# 2. إعداد متغيرات البيئة (عدّل القيم حسب بيئتك ولا ترفع .env أبداً)
cp .env.example .env

# 3. التأكد من ربط مجلد الوسائط المحلي لقراءة رسومات SVG داخل Typst
ln -sfn "${MEDIA_ROOT:-/var/lib/sujetstore-media}" data/media

# 4. تهيئة قاعدة PostgreSQL وترحيل بيانات المستخدمين (إن وُجدت نسخة SQLite)
bun run scripts/migrate-users-to-pg.ts

# 5. بناء فهرس البحث الفوري FTS5 داخل data/content.db
bun run scripts/build-search-index.ts

# 6. تشغيل خادم التطوير
bun run dev
```

---

## الأوامر الأساسية

```bash
bun run dev                             # تشغيل خادم التطوير
bun run check                           # فحص TypeScript وSvelte (svelte-check)
bun run build                           # بناء نسخة الإنتاج (build/)
bun run scripts/build-search-index.ts   # إعادة بناء فهرس البحث FTS5
bun run scripts/sync-media-to-rustfs.ts # مزامنة ملفات PDF/SVG إلى RustFS وMEDIA_ROOT
bun run scripts/migrate-users-to-pg.ts  # ترحيل/فحص تطابق PostgreSQL 17
bun run docs:dev-guide                  # تجميع دليل المطور الشامل بصيغة PDF عبر Typst

# اختبارات التحقق الشاملة (E2E)
bun run scripts/verify-french-pipeline.ts
bun run scripts/verify-english-pipeline.ts
bun run scripts/verify-arabic-pipeline.ts
```

---

## هيكل المشروع (Overview)

```text
sujetstore/
├── src/
│   ├── hooks.server.ts                 # المصادقة، الحماية، Rate Limit، وترويسات الكاش الذكي
│   ├── service-worker.ts               # Service Worker خفيف (15 KB) + حزم أوفلاين انتقائية
│   ├── lib/
│   │   ├── kernel/                     # نواة المواد (SubjectRegistry + 6 Plugins + GeneratorEngine)
│   │   ├── components/                 # مكونات Svelte 5 (SeoJsonLd، OfflinePackButton، إلخ)
│   │   ├── modules/                    # *Templates (6 مواد)، InteractiveLesson، SujetBuilder (Typst)
│   │   └── server/
│   │       ├── db/                     # SQLite content.db + PostgreSQL 17 (schema-pg، users-pg)
│   │       ├── storage.ts              # عميل RustFS S3 + الحماية بطبقات الوصول + Presigned URLs
│   │       ├── remediation.ts          # محرك تحليل نقاط الضعف والمراجعة العلاجية
│   │       ├── typst.ts                # تعقيم وتجميع ملفات Typst PDF
│   │       └── auth.ts / gamification.ts / quiz-grading.ts / visibility.ts
│   └── routes/                         # المسارات العامة، /student/*، /admin/*، /api/*، /documents/*، /generated/*
├── scripts/                            # سكربتات البذر، الفهرسة، المزامنة، الترحيل، واختبارات E2E
├── docs/developer-guide/               # 🔒 دليل المطور الكامل بـ Typst (داخلي للمستودع فقط — لا يُنشر في الموقع)
├── ARCHITECTURE.md                     # الملخص المعماري المحدّث (v4.0)
└── .env.example                        # قالب متغيرات البيئة بدون أسرار
```

---

## التوثيق الداخلي للمطورين (لا يظهر في الموقع)

يوجد الدليل الكامل للمطورين بصيغة **Typst** داخل المستودع فقط (خارج `static/` و`src/routes/` ومستثنى من النشر):

- **المصدر الرئيسي:** `docs/developer-guide/main.typ` (10 فصول تقنية مفصّلة تشمل كيفية إضافة مادة سابعة، المعمارية المزدوجة، RustFS، Typst، FTS5، API، والنشر والنسخ الاحتياطي).
- **النسخة المجمّعة PDF:** `docs/developer-guide/SujetStore-Developer-Guide-v4.pdf`
- **إعادة التجميع:** `bun run docs:dev-guide`

---

© 2026 منصة **SujetStore** — بُنيت بعناية لخدمة التعليم في الجزائر.
