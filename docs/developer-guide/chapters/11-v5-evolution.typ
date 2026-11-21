#import "../theme.typ": *

= تطويرات الإصدار الخامس (v5.0 Platform Evolution)

يغطي هذا الفصل المنظومات الست المضافة في الإصدار الخامس `v5.0` لتعزيز الحماية ضد السحب الآلي، تجربة الهاتف أولاً، تعدد اللغات، التحكم المركزي في الطباعة، نواة الإضافات الوظيفية، الفيديو التفاعلي، خدمة Rust الجانبية، وتطبيقات Android وDesktop.

== قفل الموقع الفوري والرقابة الأمنية (`/admin/site-lock`)

- تُخزّن إعدادات القفل في جدول `platform_settings` في PostgreSQL 17 (`site_lock_config`) بكاش ذاكرة `5s` وإبطال فوري عبر `src/lib/server/site-lock.ts`.
- الأوضاع المدعومة: `live` (مفتوح) | `relaunch` (صفحة تحديث شامل وحجب `HTTP 503` للزوار والـ PDF والـ API و`sitemap.xml`) | `app_only` (متاح لتطبيق Android والمدير فقط).
- يتجاوز المدير (`superadmin` / `admin`) القفل بالكامل بعد الدخول من `/admin/login` مع شريط علوي تحذيري واضح.

== إخفاء أسماء PDF، الروابط الموقّعة، ورصد الزوار (`/admin/analytics`)

- لكل وثيقة في `documents` معرّف عشوائي فريد `public_token` (`3,299/3,299` مغطاة).
- تُقدّم الملفات عبر `/api/media/[token]/[kind]?exp=...&sig=...` الموقّع بـ `HMAC-SHA256` في `src/lib/server/media-signing.ts` مع حصص يومية وساعية (`media_download_logs`: `25/ساعة` للزائر، `60/يوم` للمجاني، `150/يوم` لـ `Pro`).
- عند ضبط `STRICT_OPAQUE_MEDIA=1` تُحجب المسارات التخميمية القديمة `/documents/*.pdf` و`/generated/*.pdf` بـ `403` عن غير الإداريين.
- يسجّل `src/lib/server/telemetry.ts` جميع العمليات بآلية غير مانعة في `activity_audit_logs` مع تحليل الجهاز ونظام التشغيل والمتصفح والموقع الجغرافي (`GeoIP` + `CF-IPCountry`) وعرضها في `/admin/analytics`.

== Mobile-First وتعدد اللغات (`AR / FR / EN`)

- أُعيد تصميم شريط التنقل عبر `TopNavbar.svelte` (نصوص قصيرة رشيقة + مبدّل `LanguageSwitcher.svelte`) مع شريط تنقل سفلي للهاتف `MobileBottomNav.svelte` (5 تبويبات مريحة للإبهام).
- نظام الترجمة `src/lib/i18n/` بـ Svelte 5 Runes (`196` مفتاحاً متطابقاً 100% بين `ar` و`fr` و`en`) + ترجمة SSR عبر كوكي `site_lang` في `hooks.server.ts` + دالة `i18n.pick(row, 'name')` للاستفادة من الأعمدة الثلاثية في `content.db`.
- استُبعد عمود `content` من استعلام قائمة المادة في `[level]/[year]/[subject]/+page.server.ts` لتقليص الحمولة من `1.31 MB` إلى `~18 KB` (−98.6%).

== استوديو الطباعة المركزي (`/admin/print-studio`) وإعادة البناء في RAM

- ملفات التنسيق الهرمية في `typst_style_profiles` (`src/lib/server/print-style.ts`): عام ← لغة ← طور ← سنة ← مادة ← نوع وثيقة، مع رفع خطوط `.ttf/.otf` وشعارات مخصصة، ومعاينة SVG حية في `< 450ms`.
- محرك إعادة البناء المتوازي في `/dev/shm/sujetstore-typst-ram` (`src/lib/server/typst-batch-ram.ts`) يدعم اختيار `1–12` نواة `vCPU` (الافتراضي `10`)، دون كتابة مؤقتة على القرص الصلب، ويرفع مباشرة إلى RustFS.

== نواة الإضافات الوظيفية (`src/lib/platform/`) واستوديو الفيديو (`video-studio`)

- 11 وحدة وظيفية مسجّلة في `PlatformModuleRegistry` (`curriculum-core`، `users-billing`، `quiz-engine`، `sujet-builder`، `print-studio`، `lesson-editor`، `smart-generator`، `gamification`، `remediation`، `simulator`، `video-studio`) مع فحص الدوائر `DFS`، وحراسة مسارات تلقائية في `hooks.server.ts`، ولوحة `/admin/modules`، وناقل أحداث `PlatformEventBus`.
- وحدة استوديو الفيديو (`/admin/videos`، `/videos/[slug]`، `InteractiveVideoPlayer.svelte`) تدعم #strong[YouTube] و#strong[Cloudflare Stream] مع تفريغ نصي متزامن `.vtt`/`.srt` مفهرس في `search_fts` (`?t=<sec>`) وأسئلة توقّف تفاعلية (`cue_points`) مرتبطة بـ `user_mistakes` وXP.

== خدمة Rust الجانبية وتطبيقات Android وDesktop

- خدمة Rust `1.100.0` في `services/rust-media-worker/` (`sujetstore-rust-worker.service` على `127.0.0.1:9020`، حجم تنفيذي `1.5 MB`): ختم مائي سفلي وبصمة Metadata لـ PDF بـ `lopdf` في `~9ms`، ومحلل تفريغ نصي عربي فائق السرعة.
- طبقة `/api/v1/{catalog,subjects/[id],auth/session,student/sync}` تدعم `Bearer Token` (`api_tokens`) و`Cookie`.
- تطبيق Android حقيقي موقّع في `clients/mobile-capacitor/` (مبني بـ `/opt/android-sdk` `android-35` وJava 17؛ المخرجات في `/var/lib/sujetstore-infra/releases/`: `sujetstore-v1.0.0-release.apk` بحجم `1.9 MB` و`sujetstore-v1.0.0-release.aab` بحجم `2.6 MB` متاح عبر `/app/sujetstore.apk`)، وهيكل Desktop بـ *Tauri v2* في `clients/desktop-tauri/`.
