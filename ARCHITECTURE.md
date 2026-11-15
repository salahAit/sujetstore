# 📘 الوثيقة المعمارية لمنصة SujetStore (الإصدار 3.0)

**الإصدار:** 3.0 (Zero-Runtime Static Public + Dynamic Student Portal)  
**الهدف:** تقديم منصة تعليمية جزائرية فائقة السرعة تفصل بين **الموقع العام الثابت** (بدون خادم runtime أو قاعدة بيانات للجمهور) و**الخادم التفاعلي المستقل** للمتعلمين المسجلين والمشتركين والإدارة.

---

## 1. مكدس التكنولوجيا (Tech Stack)

| المكون | التقنية / الإصدار | الدور المعماري |
| :--- | :--- | :--- |
| **Runtime** | Bun `1.4.4` | تشغيل الخادم، إدارة العمليات، وتنفيذ SQLite الأصلي عبر `bun:sqlite` |
| **Framework** | SvelteKit `3.2` + `@sveltejs/adapter-bun` | التوجيه الهجين (SSR/API للخادم الديناميكي + تصدير ثابت للموقع العام) |
| **UI & Styling** | Svelte `5.57` (Runes) + Vite `8` + Tailwind CSS `v4.3` | واجهة تفاعلية RTL بالكامل (`$props()`, `$state()`, `$derived()`) |
| **ORM & Data** | Drizzle ORM `0.45` (`bun:sqlite`) | إدارة قاعدتي البيانات بوضع `WAL` |
| **PDF Engine** | Typst `0.15.1` CLI (`src/lib/server/typst.ts`) | توليد مواضيع الفروض والاختبارات والحلول بصيغة PDF عربياً |
| **Proxy & Ops** | Caddy + systemd (`deploy.sh`) | إنهاء HTTPS وإدارة الخادم الديناميكي في الإنتاج |

---

## 2. طوبولوجيا النشر المزدوجة (Split Deployment Architecture)

تم تصميم المنصة لتعمل بطريقتين متكاملتين حسب طبيعة الترافيك:

```text
                الزوار والجمهور (أغلبية الترافيك)
                             │
                             ▼
      ┌──────────────────────────────────────────────┐
      │   1) الموقع العام الثابت (build-static/)     │
      │      Zero-Runtime · Zero-Database (CDN)      │
      │  • HTML + __data.json للصفحات المنشورة فقط   │
      │  • /static-api/search-index.json (بحث محلي)   │
      │  • /static-api/notifications.json            │
      │  • ملفات public المنشورة فقط + sitemap.xml    │
      └──────────────────────┬───────────────────────┘
                             │ تحويل المسجلين/المشتركين
                             │ عبر dynamic_portal_url
                             ▼
      ┌──────────────────────────────────────────────┐
      │   2) الخادم التفاعلي المستقل (build/index.js) │
      │        Bun + SvelteKit 3 + Dual SQLite        │
      │  • حسابات التلاميذ (/student/*, /auth/*)     │
      │  • تصحيح التمارين التفاعلية + Gamification   │
      │  • المولّد الذكي Typst PDF (/student/generator) │
      │  • الاشتراكات والدفع (/student/activate)      │
      │  • لوحة التحكم والإدارة (/admin/*)            │
      └──────────────────────────────────────────────┘
```

### آلية التوليد الثابت (`build-static/`)
- يتم تشغيله عبر `bun run build:static` أو من لوحة التحكم `POST /api/admin/build-static` (المسؤولون فقط).
- يعتمد على `src/lib/server/static-exporter.ts` و`scripts/build-static.ts` مع ضبط `SUJET_STATIC_BUILD=1` والترويسة الداخلية `x-sujet-static-export: 1`.
- يستبعد تماماً المستويات والمواد المخفية (`hidden`)، كما يحجب روابط ومحتوى وملفات PDF الخاصة بفئتي `registered` و`premium` (تظهر كصفحات تشويق مقفولة تحيل للبوابة التفاعلية `dynamic_portal_url`)، ولا ينسخ مجلدات `wasm/` أو `generated/`.

---

## 3. استراتيجية قواعد البيانات المزدوجة

| القاعدة | المسار | وضع التشغيل | أبرز الجداول |
| :--- | :--- | :--- | :--- |
| **المحتوى** | `data/content.db` | قراءة في المسارات العامة، كتابة في `/admin` | `education_levels`, `years`, `streams`, `level_streams`, `subjects`, `stream_subjects`, `year_subjects`, `documents`, `quizzes`, `questions`, `quiz_questions`, `bank_exercises`, `site_settings` |
| **المستخدمين والتقدم** | `data/users.db` | `WAL` + `busy_timeout = 5000` | `users`, `sessions`, `quiz_attempts`, `attempt_answers`, `user_points`, `user_badges`, `badge_definitions`, `user_bookmarks`, `user_mistakes`, `voucher_codes`, `voucher_redemptions`, `payment_orders`, `notifications`, `comments`, `ratings`, `view_stats` |

---

## 4. التحكم في الظهور ونموذج الصلاحيات ثلاثي الطبقات

### أ. التحكم التدريجي في الظهور (`src/lib/server/visibility.ts`)
- لكل طور (`education_levels`)، سنة (`years`)، شعبة (`level_streams`)، ومادة (`year_subjects` / `stream_subjects`) حالة ظهور مستقلة: `published` | `coming_soon` | `hidden`.
- **الوضع الافتراضي المفعّل:** الطور المتوسط (`moyen`: `1am`–`4am`) لمادة الرياضيات (`MAT-B`) فقط في حالة `published`، بينما الطور الابتدائي والثانوي وبقية المواد في حالة `hidden` ويمكن فتح أي مادة أو طور لحظياً من `/admin/visibility`.

### ب. طبقات الوصول للمحتوى (`access_tier`)
1. `public`: متاح مجاناً للجميع (في الموقع الثابت والديناميكي، وتشمل ملفات PDF الخاصة به في `build-static/`).
2. `registered`: يتطلب حساب تلميذ مجاني مسجّل (`locals.user`).
3. `premium`: يتطلب اشتراكاً سارياً (`isEffectivePremium(user)`).

---

## 5. الوحدات والمزايا الرئيسية في الإصدار 3.0

1. **بوابة التلميذ ودفتر الأخطاء (`/student`, `/student/mistakes`):**
   - لوحة متابعة شاملة للنقاط (XP)، السلسلة اليومية (Streak)، الشارات، المحاولات، والمفضلة.
   - ترحيل تلقائي لإنجازات الزائر المجهول (`sujet_fp`) إلى حسابه عند التسجيل أو الدخول (`migrateAnonymousProgressToUser`).
   - تسجيل الأسئلة الخاطئة في `user_mistakes` وإتاحتها للمراجعة التفاعلية الفورية حتى يتقنها التلميذ (`resolved = 1`).
2. **محرك تصحيح التمارين التفاعلية في الخادم (`src/lib/server/quiz-grading.ts`):**
   - تصحيح حتمي في الخادم لجميع أنواع الأسئلة الـ 14 (بما فيها الأسئلة الحسابية عبر محلل آمن بدون `eval` أو `Function` على الخادم) ومنع التلاعب بالعلامات من المتصفح.
3. **المولّد الذكي للتمارين والاختبارات (`/student/generator`, `/api/generator`):**
   - توليد تمارين تفاعلية مخصّصة من بنك الأسئلة حسب المادة والصعوبة والعدد، أو تجميع فرض/اختبار من بنك التمارين وتصييره إلى ملفات PDF باللغة العربية والحلول النموذجية عبر Typst.
4. **حاسبة المعدل ومحاكاة BEM وBAC (`/simulator`):**
   - حساب المعدل الفصلي (صيغة التقويم المستمر + الفرض + الاختبار)، مع حساب العلامة المطلوبة في الاختبار لبلوغ هدف معين، ومحاكاة معدلات شهادة التعليم المتوسط (BEM) وشهادة البكالوريا (BAC — 5 شعب) بمعاملات المنهاج الجزائري.
5. **نظام الاشتراكات والقسائم وبوابة الدفع (`/student/activate`, `/admin/vouchers`):**
   - تفعيل فوري عبر أكواد القسائم (معاملات ذرية في SQLite)، رفع وصل بريدي موب/CCP للمراجعة الإدارية، وتكامل Chargily Pay v2 عبر `/api/payments/chargily` وويب هوك موثق بـ `HMAC-SHA256` (`/api/payments/chargily/webhook`).
6. **الإشعارات وإدارة المستخدمين والصلاحيات (`/admin/notifications`, `/admin/users`):**
   - أدوار متدرجة: `superadmin`, `admin`, `editor`, `student`.
   - حماية `/api/*` و`/admin/*` و`/student/*` في `src/hooks.server.ts` مع تشفير Argon2id، تحديد المعدل (`src/lib/server/rate-limit.ts`)، وفحص Magic Bytes للمرفوعات وحفظها خارج `static/` داخل `data/uploads/` وتقديمها عبر `src/routes/uploads/[...path]/+server.ts`.

---

## 6. الأوامر الأساسية

```bash
bun run dev                  # خادم التطوير المحلي
bun run check                # فحص الأنواع وقوالب Svelte (svelte-check)
bun run db:migrate           # تطبيق ترقيات قواعد البيانات والبذور الأولية v3
bun run build:static         # بناء الإنتاج (build/) وتوليد الموقع العام الثابت (build-static/)
bun run scripts/verify-v3.ts # اختبار التحقق الشامل End-to-End على خادم الإنتاج المبني
```
