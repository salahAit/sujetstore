#import "../theme.typ": *

= مرجع المسارات ونقاط النهاية (Routes & API Reference)

يقدّم هذا الفصل خريطة مرجعية سريعة لجميع مسارات الواجهة ونقاط نهاية REST API المعتمدة في الإصدار 4.0.

== مسارات الواجهة العامة وبوابة التلميذ والإدارة

#dev-table(
  columns: (2.1fr, 1fr, 2.1fr),
  headers: ("المسار", "الحماية", "الوصف"),
  [`/` , `/about` , `/simulator`], [عام + كاش], [الصفحة الرئيسية، عن المنصة، وحاسبة المعدل ومحاكي BEM/BAC.],
  [`/[level]` , `/[level]/[year]`], [عام + كاش], [عرض السنوات والشعب والمواد حسب حالة `visibility`.],
  [`/[level]/[year]/[subject]`], [عام + كاش], [صفحة المادة (تبويبات الفصول، فلاتر الرسمي/المقترح، زر `OfflinePackButton`، `Course` JSON-LD).],
  [`/[level]/[year]/[subject]/[docSlug]`], [حسب `access_tier`], [قارئ PDF المدمج أو مشغّل الدرس التفاعلي (`InteractiveLessonPlayer`) + `LearningResource` JSON-LD.],
  [`/quizzes` , `/quizzes/[slug]`], [عام / مسجّل], [دليل التمارين التفاعلية ومشغّل الاختبار بتصحيح خادم.],
  [`/auth/login` , `/auth/register` , `/auth/logout`], [خاص `no-store`], [تسجيل الدخول، إنشاء الحساب، ترحيل التقدم المجهول، والخروج.],
  [`/student` , `/student/generator`], [مسجّل], [لوحة التلميذ والمولّد الذكي للفروض والاختبارات (PDF + تمارين).],
  [`/student/mistakes`], [مسجّل], [دفتر الأخطاء وخطة المراجعة العلاجية الذكية.],
  [`/student/activate`], [مسجّل], [تفعيل القسائم الذرية، رفع وصل بريدي موب/CCP، والدفع عبر Chargily.],
  [`/admin/*`], [طاقم (`staff`)], [لوحة الإدارة الكاملة (المناهج، الوثائق، بنك الأسئلة، SujetBuilder، الظهور، القسائم، الإشعارات، المستخدمون).],
)

== نقاط نهاية الوسائط وSEO

#dev-table(
  columns: (2.2fr, 0.7fr, 2.3fr),
  headers: ("نقطة النهاية", "الطريقة", "الوظيفة"),
  [`/documents/[...path]`], [`GET`], [بث مواضيع الفروض والاختبارات من RustFS S3 (مع فحص `access_tier` وترويسة `X-Storage-Backend`).],
  [`/generated/[...path]`], [`GET`], [بث أرشيف البكالوريا الرسمي ورسومات SVG من RustFS S3 / `MEDIA_ROOT`.],
  [`/uploads/[...path]`], [`GET`], [تقديم المرفوعات الإدارية وملفات المولّد المؤقتة (`gen-*.pdf`) من `data/uploads/`.],
  [`/sitemap.xml`], [`GET`], [خريطة الموقع الديناميكية (2,713 رابطاً).],
  [`/robots.txt`], [`GET`], [توجيهات الزحف لمحركات البحث مع رابط `sitemap.xml`.],
)

== نقاط نهاية واجهة البرمجة (REST APIs)

#dev-table(
  columns: (2.3fr, 0.9fr, 2.0fr),
  headers: ("المسار", "الطرق", "الوصف وقاعدة البيانات"),
  [`/api/search?q=...`], [`GET`], [بحث فوري بـ `SQLite FTS5` مرتّب بـ `bm25` مع كاش `max-age=120`.],
  [`/api/generator`], [`POST`], [توليد PDF (عبر `subjectRegistry` + `generatorEngine`) أو توليد/تصحيح اختبار تفاعلي (`mode: pdf | quiz | grade`).],
  [`/api/quizzes/[id]/submit`], [`POST`], [تصحيح محاولة تمرين في الخادم وحفظها في PostgreSQL 17 + منح نقاط XP وشارات.],
  [`/api/student/mistakes`], [`GET/POST`], [إدارة دفتر الأخطاء، تصحيح الجلسات العلاجية (`retrySubmit`)، وتعليم الأخطاء كمحلولة (`PG`).],
  [`/api/payments/chargily`], [`POST`], [إنشاء جلسة دفع Chargily Pay v2 وتسجيل `payment_orders` و`billing_audit_logs` (`PG`).],
  [`/api/payments/chargily/webhook`], [`POST`], [التحقق من توقيع `HMAC-SHA256` وتفعيل الاشتراك داخل معاملة `FOR UPDATE` (`PG`).],
  [`/api/bookmarks`], [`GET/POST`], [حفظ وقراءة المفضلة السحابية للمستخدم في PostgreSQL 17.],
  [`/api/gamification`], [`GET`], [الشارات الثماني ولوحة الصدارة العالمية من PostgreSQL 17.],
  [`/api/notifications`], [`GET`], [قائمة الإشعارات العامة النشطة من PostgreSQL 17.],
  [`/api/comments` , `/api/ratings` , `/api/stats`], [`GET/POST`], [التعليقات، التقييمات، وتتبع المشاهدات والتحميلات (`PG`).],
  [`/api/stats/dashboard`], [`GET`], [إحصاءات لوحة القيادة لآخر 7 أيام من PostgreSQL 17.],
  [`/api/admin/*` , `/api/sujet-builder/*`], [`CRUD`], [واجهات إدارة بنك الأسئلة، التمارين، التحليلات، الظهور، ومنشئ المواضيع (محمية بصلاحيات `staff`).],
  [`/api/generate-pdf`], [`POST`], [معاينة PDF/SVG الفورية لمحرر SujetBuilder الإداري عبر `data/tmp-typst/` (`staff` فقط).],
)
