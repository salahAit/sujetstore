#import "../theme.typ": *

= محرك الطباعة Typst والمولّد الذكي (Typst & GeneratorEngine)

يُنتج SujetStore ملفات PDF مطبعية عالية الدقة للمواضيع الرسمية والحلول النموذجية باستخدام *Typst `0.15.1` CLI* دون أي تبعيات ثقيلة (مثل Chromium أو LaTeX)، مما يسمح بتوليد موضوع كامل في حدود `0.8s – 2.2s` فقط، أو `0.86ms` من الكاش.

== بنية قوالب Typst (`src/lib/modules/SujetBuilder/typst/`)

#dev-table(
  columns: (2fr, 3fr),
  headers: ("القالب / الوحدة", "المسؤولية والمزايا الخاصة"),
  [`main.typ`], [نقطة الدخول الموحّدة: يستقبل معاملات `template-id` و`data-file` و`is-solution` ويوجه البناء للقالب المطلوب.],
  [`common/exercises.typ`], [تصيير كتل التمارين والجداول وصناديق الإجابة مع معالجة ذكية للنقاط المتصلة عبر `#repeat(gap: 1.8pt)[.]` لمنع تجاوز حدود الجداول.],
  [`common/arabic_poetry.typ`], [محرك محاذاة الشعر العمودي العربي باستخدام *التطويل (الكشيدة `ـ`)* وتوزيعها خطياً على الشطرين (الصدر والعجز) بترقيم `1-` مطابق لمواضيع البكالوريا الرسمية.],
  [`templates/primary/`, `middle/`, `secondary/`], [قوالب RTL الرسمية للأطوار الثلاثة، تشمل تقييم المكتسبات (`5AP`) ومحاكاة BEM وBAC.],
  [`templates/english/exam.typ`], [قالب LTR مخصّص للغة الإنجليزية بهوية SujetStore (`logo.png` + `qrcode.png` + ترويسة إنجليزية) مع دعم كامل لتنسيق النقاط المتجاوبة.],
  [`templates/french/exam.typ`], [قالب LTR مخصّص للغة الفرنسية بجميع مستوياتها (`3AP–3AS` + `Évaluation des Acquis` + `BEM` + `BAC`) مع تعطيل تقسيم الكلمات (`justify: false`) في الترويسة.],
)

== قواعد تعقيم المدخلات في `src/lib/server/typst.ts`

قبل إرسال أي كائن JSON إلى Typst، يمرّ عبر `sanitizeTypstDocument(examDoc)`:
- تحويل صيغ LaTeX الشائعة داخل معادلات الرياضيات (`\frac`, `\sqrt`, `\times`, `\mathbb`, `\vec`...) إلى صيغة Typst الأصلية مع حماية النصوص المقتبسة (مثل الوحدات والرموز الكيميائية).
- تهريب `//` داخل النص النثري حتى لا يفسّرها Typst كتعليق برمجي (مثال: الرموز الوراثية `HbA//HbS`).
- تحويل Markdown bold (`**نص**`) إلى `#strong[نص]` بشكل آمن للنص العربي.
- تحويل مسارات الصور النسبية `/generated/...` تلقائياً إلى `/data/media/generated/...` كي تُقرأ داخل جذر `--root .`.
- استبدال أي سلسلة نقطية بطول 12 نقطة أو أكثر داخل الجداول والفقرات بـ `#repeat(gap: 1.8pt)[.]` لملء المساحة المتاحة ديناميكياً دون خروج عن إطار الجدول.

== محرك المولّد الإنتاجي المحصّن (`src/lib/kernel/generator-engine.ts`)

تتولى الفئة `GeneratorEngine` حماية الخادم من الضغط العالي وتكرار العمل عند استخدام `/student/generator` أو `/api/generator`:

#dev-table(
  columns: (1.6fr, 3.4fr),
  headers: ("الآلية", "التنفيذ والسلوك الموثّق"),
  [طابور التزامن المحدود \ (`MAX_CONCURRENT_TYPST = 4`)], [صف FIFO يقيّد عدد عمليات `typst` الجارية في وقت واحد إلى 4 عمال كحد أقصى؛ أي طلب إضافي ينتظر دوره بسلاسة مع ضمان تحرير الخانة في `finally` حتى عند حدوث خطأ.],
  [كاش البذور الحتمي \ (`computeExamCacheKey`)], [يحسب بصمة `SHA-256` (16 محرفاً سداسياً) من `(pluginId, trackId, trimesterId, docType, variant, difficulty, seed, academicYear, schoolName, topicNumber)`. إذا وُجد زوج `gen-<key>.pdf` و`gen-<key>-sol.pdf` بعمر `< 24h` يُعاد فوراً خلال `< 1ms` دون استدعاء Typst.],
  [إزالة تكرار الطلبات المتزامنة \ (`inFlightMap`)], [إذا طلب عدة طلاب نفس البذرة في نفس اللحظة، تُنفّذ عملية تجميع واحدة فقط ويتشارك الجميع نتيجتها فور انتهائها (`cached: true`).],
  [التجميع الذري \ (`compilePairAtomically`)], [يُكتب الناتج في ملف مؤقت `.tmp-gen-*.pdf` ثم يُنقل بـ `rename()` ذرياً بعد نجاح التجميع، لمنع تقديم ملفات ناقصة.],
  [التنظيف التلقائي (`24h TTL`)], [مؤقت خلفي غير مانع (`unref`) كل 30 دقيقة + فحص دوري عند الطلب، يحذف فقط ملفات `gen-*.pdf` المنتهية الصلاحية ويحافظ على المرفوعات الإدارية الأخرى داخل `data/uploads/sujet/`.],
)

```ts
// نموذج استدعاء المولّد من src/routes/api/generator/+server.ts
const assembled = subjectRegistry.assembleForYearSubject(
  ys.yearId, ys.subjectId, ys.streamId,
  { trimesterId, docType, variant, difficulty, seed, academicYear, schoolName }
);
const compiled = await generatorEngine.compileExamWithQueueAndCache(
  assembled.paper,
  { pluginId: assembled.plugin.id, trackId: assembled.trackId, trimesterId, docType, variant, difficulty, seed }
);
// يرجع: { success, pdfUrl, solutionUrl, cached, ... }
```
