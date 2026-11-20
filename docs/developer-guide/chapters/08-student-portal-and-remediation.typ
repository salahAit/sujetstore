#import "../theme.typ": *

= بوابة التلميذ، الأمان، والمراجعة العلاجية التكيفية

يغطي هذا الفصل منظومة المصادقة والحماية، محرك التمارين والتلعيب، ومحرك المراجعة العلاجية الذكية لنقاط الضعف.

== المصادقة والأدوار والأمان

- *تشفير كلمات المرور (`src/lib/server/auth.ts`):* عبر `Bun.password.hash` (خوارزمية `Argon2id`) مع دعم التحقق التوافقي من التجزئات القديمة.
- *الجلسات:* مخزنة في جدول `sessions` بقاعدة PostgreSQL 17، تُسلّم عبر كوكي `HttpOnly`, `SameSite=Lax`, `Secure` في الإنتاج مع تجديد تلقائي لصلاحية الجلسة النشطة في `src/hooks.server.ts`.
- *الأدوار (`RBAC`):* أربع رتب واضحة: `superadmin` (صلاحيات كاملة بما فيها إدارة المستخدمين `/admin/users`)، `admin` (إدارة المحتوى والقسائم والظهور)، `editor` (إنشاء وتعديل المحتوى دون صلاحية `DELETE`)، `student` (الوصول لبوابة التلميذ `/student/*` والمحتوى المسجّل أو المدفوع).
- *تحديد المعدل (`src/lib/server/rate-limit.ts`):* حماية تلقائية في `hooks.server.ts` ضد التخمين وإغراق الطلبات لمسارات الدخول والتسجيل (`20 / 10m`)، التعليقات والتقييمات (`30 / 10m`)، تسليم الاختبارات (`40 / 10m`)، وتفعيل القسائم (`15 / 10m`).
- *أمن المرفوعات (`src/lib/server/uploads.ts`):* فحص *Magic Bytes* للمحتوى الفعلي (PDF, PNG, JPEG, WebP, GIF)، منع ملفات SVG تماماً لمنع ثغرات Stored XSS، وحفظ الملفات خارج `static/` داخل `data/uploads/` مع تقديمها عبر `src/routes/uploads/[...path]/+server.ts` وترويسة `X-Content-Type-Options: nosniff`.

== محرك التمارين التفاعلية والتلعيب

- يدعم المحرك *14 نوع سؤال* (`mcq`, `true_false`, `ordering`, `drag_drop`, `matching`, `fill_blank`, `short_answer`, `dropdown`, `calculated`, `sentence_reorder`, `image_hotspot`, `drag_to_image`, `matrix`, `essay`).
- *التصحيح في الخادم فقط (`src/lib/server/quiz-grading.ts`):* يمنع أي تلاعب بالعلامات من المتصفح، ويقيّم الأسئلة الحسابية بمحلل رياضي آمن دون `eval` أو `new Function`.
- *التلعيب (`src/lib/server/gamification.ts`):* يعمل بالكامل بشكل `async` على PostgreSQL 17؛ يسجّل نقاط XP، يحدّث السلسلة اليومية (Streak) داخل `pgTx` مع `FOR UPDATE`، ويمنح الشارات الثماني تلقائياً، كما يرحّل تقدم الزائر المجهول (`sujet_fp`) إلى حسابه عند التسجيل أو الدخول عبر `migrateAnonymousProgressToUser`.

== محرك المراجعة العلاجية التكيفية (`src/lib/server/remediation.ts`)

بدلاً من الاكتفاء بقائمة أخطاء خام في دفتر الأخطاء (`/student/mistakes`)، يقوم محرك المراجعة العلاجية بالآتي:

+ *قراءة الأخطاء غير المحلولة:* يجلب `student/mistakes/+page.server.ts` أخطاء التلميذ من جدول `user_mistakes` في PostgreSQL 17 (`resolved = FALSE`).
+ *إثراء السياق المنهاجي:* يطابق `buildRemediationSummary(mistakeRows)` كل سؤال مع جدول `questions -> question_categories -> year_subjects -> subjects / years / streams` في `content.db` (مع مسار احتياطي عبر `quiz_questions -> quizzes` للأسئلة العامة).
+ *استخراج الفصل والمحور ومطابقة الدرس:* يستخلص الفصل الدراسي (`t1` / `t2` / `t3`) من وسوم التصنيف، ثم يحسب درجة التشابه اللفظي (عربي/لاتيني) مع جميع الدروس المنشورة لنفس المسار في استعلام مجمّع واحد لاختيار أفضل درس علاجي (`recommendedLesson: { lessonSlug, lessonTitle, lessonUrl }`).
+ *ترتيب الأولويات (`weaknessAreas`):* يجمّع الأخطاء حسب المادة والمحور ويرتبها تنازلياً حسب `totalWrongCount` ثم `mistakeCount`، ويجهّز حتى 5 أسئلة جاهزة للتشغيل الفوري في `QuizPlayer`.
+ *تجربة التلميذ (`src/routes/student/mistakes/+page.svelte`):* تعرض بطاقة *«خطة المراجعة العلاجية الذكية»* أعلى الصفحة، لكل نقطة ضعف زرّان مباشران:
  - *«راجع الدرس في دقيقتين»*: ينقل التلميذ مباشرة للدرس التفاعلي المرتبط بالمحور.
  - *«جلسة علاجية (N أسئلة)»*: يطلق جلسة اختبار مدمجة تقتصر على أسئلة الضعف، وعند الإجابة الصحيحة يُعلّم الخطأ كمُتقن (`resolved = TRUE`) وتُحتسب نقاط XP في PostgreSQL.
