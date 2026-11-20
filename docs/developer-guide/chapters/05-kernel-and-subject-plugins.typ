#import "../theme.typ": *

= معمارية النواة والإضافات (Core Kernel & Subject Plugins)

لتفادي تضخّم الشروط المتداخلة (`if/else`) عند التوسع إلى مواد جديدة (التاريخ والجغرافيا، العلوم الإسلامية، الفلسفة...)، نُظّمت طبقة المناهج والمولّد في الإصدار 4.0 وفق نمط *النواة والإضافات (Kernel + Plugins)* داخل `src/lib/kernel/`.

== مكوّنات النواة (`src/lib/kernel/`)

#dev-table(
  columns: (1.7fr, 3.3fr),
  headers: ("الملف", "الدور والمسؤولية"),
  [`types.ts`], [العقود الموحّدة: `SubjectPlugin`، `UnifiedExamPaper`، `SubjectAssembleRequest`، `SubjectPluginStats`، `KernelSummary`، `CompiledExamResult`.],
  [`registry.ts`], [صنف `SubjectRegistry` لتسجيل الإضافات وحلّ المسار تلقائياً (`resolveForYearSubject`) وتجميع ورقة الامتحان (`assembleForYearSubject`) وإنتاج ملخص الإحصاءات (`getKernelSummary`).],
  [`generator-engine.ts`], [محرك التوليد الإنتاجي المحصّن (طابور 4 عمال Typst + كاش بذور SHA-256 + تنظيف تلقائي بعد 24 ساعة).],
  [`plugins/*.ts`], [6 إضافات مستقلة تغلّف المجمّعات والقوالب القائمة دون تكرار أي محتوى منهاجي.],
  [`index.ts`], [يسجّل الإضافات الست تلقائياً في `subjectRegistry` ويصدّر النواة كاملة.],
)

== الإضافات الست المسجّلة حالياً

#dev-table(
  columns: (1fr, 1.3fr, 0.7fr, 0.8fr, 0.9fr, 0.9fr),
  headers: ("المعرّف", "المادة", "الاتجاه", "المسارات", "الدروس", "القوالب"),
  [`math`], [الرياضيات], [`rtl`], [16], [336], [288],
  [`physics`], [العلوم الفيزيائية], [`rtl`], [11], [155], [214],
  [`sciences`], [علوم الطبيعة والحياة], [`rtl`], [14], [177], [231],
  [`arabic`], [اللغة العربية], [`rtl`], [23], [312], [300],
  [`english`], [اللغة الإنجليزية], [`ltr`], [21], [285], [285],
  [`french`], [اللغة الفرنسية], [`ltr`], [21], [309], [315],
  [*المجموع*], [*6 مواد*], [—], [*106*], [*1,574*], [*1,633*],
)

== عقد الإضافة (`SubjectPlugin` Interface)

```ts
export interface SubjectPlugin {
  readonly id: SubjectIdKey;          // 'math' | 'physics' | ... | 'history'
  readonly nameAr: string;
  readonly direction: 'rtl' | 'ltr';
  readonly supportedVariants: readonly ExamVariant[];

  resolveTrack(
    yearId: string,
    subjectId: string,
    streamId?: string | null
  ): string | null;

  assemble(req: SubjectAssembleRequest): UnifiedExamPaper;
  getStats(): SubjectPluginStats;
}
```

== دليل عملي: كيف تضيف مادة سابعة (مثال: التاريخ والجغرافيا)؟

تسمح معمارية النواة بإضافة مادة كاملة في 7 خطوات معيارية دون تعديل منطق `/api/generator` الأساسي:

+ *إنشاء وحدة القوالب والدروس:* أنشئ مجلداً `src/lib/modules/HistoryGeoTemplates/` يضم `types.ts` (تعريف المسارات و`yearSubjectId` المقابلة من `content.db`)، ملفات الدروس التفاعلية (`lessons/t1..t3.ts`)، وقوالب التمارين (`templates/t1..t3.ts`).
+ *إضافة مجمّع الامتحانات:* أضف دالة `assembleHistoryGeoExam(req)` في `src/lib/server/exam-assembler.ts` (أو داخل ملف مستقل مستورد منه) تُرجع كائناً متوافقاً مع `UnifiedExamPaper` وتحدد `templateId` المناسب (`primary/exam`, `middle/exam`, `secondary/exam`, `secondary/bac_mock`, إلخ).
+ *إنشاء إضافة النواة:* أضف المعرّف الجديد إلى `SubjectIdKey` في `src/lib/kernel/types.ts`، ثم أنشئ `src/lib/kernel/plugins/history.ts` يطبّق `SubjectPlugin` وسجّله بسطر واحد في `src/lib/kernel/index.ts`:
  ```ts
  subjectRegistry.register(historyPlugin);
  ```
+ *بذر المحتوى في `content.db`:* أنشئ `scripts/seed-history-pipeline.ts` لبذر الدروس التفاعلية (`documents` بنوع `lesson`) وبنك الأسئلة (`questions` + `quizzes`) و`bank_exercises`، وتفعيل `visibility = 'published'` للمسارات المستهدفة.
+ *توليد عيّنات PDF وأرشيف البكالوريا ومزامنتها مع RustFS:*
  ```bash
  bun run scripts/generate-history-sample-exams.ts
  bun run scripts/build-official-history-bac-archive.ts
  bun run scripts/sync-media-to-rustfs.ts
  ```
+ *تحديث فهرس البحث الفوري:*
  ```bash
  bun run scripts/build-search-index.ts
  ```
+ *التحقق الشامل E2E:* أنشئ `scripts/verify-history-pipeline.ts` على غرار `verify-arabic-pipeline.ts` للتحقق من جميع المسارات (SSR، ترتيب الفروض قبل الاختبارات، الدروس، المولّد الذكي، التصحيح 100%، وبث ملفات البكالوريا عبر RustFS HTTP)، ثم شغّل `bun run check && bun run build`.

#callout("التحقق من الهوية البصرية قبل النشر", kind: "tip")[
  للمواد غير العربية (`LTR`) استخدم القالب المخصص بالاتجاه اليساري مع ترويسة SujetStore والشعار ورمز QR. وللمواد العربية استخدم قوالب RTL وتأكد دائماً عبر `pdffonts` من غياب خط `FreeMono` تماماً عن جميع ملفات PDF الناتجة.
]
